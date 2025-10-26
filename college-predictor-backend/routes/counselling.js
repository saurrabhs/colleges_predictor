const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../middleware/auth");
const Counselling = require("../models/Counselling");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

// System prompt for the AI counsellor
const SYSTEM_PROMPT = `You are a friendly and expert MHT-CET counsellor for Maharashtra engineering admissions. You help students with college and branch selection through CAP (Centralized Admission Process).

IMPORTANT INSTRUCTIONS:
1. Keep responses SHORT and CONCISE (2-4 sentences max unless asked for details)
2. Be conversational and natural - talk like a helpful friend, not a formal advisor
3. Focus ONLY on MHT-CET, Maharashtra colleges, and CAP rounds - NOT JEE or other exams
4. REMEMBER previous conversation - don't ask questions student already answered
5. Build on previous responses - refer back to what student told you
6. Ask 1-2 simple follow-up questions to understand student better (interests, rank range, city preference)
7. Give practical, actionable advice specific to their situation
8. Use simple language - avoid long paragraphs and jargon
9. For branch selection, ask about their interests (coding, machines, design, etc.) before recommending
10. Be encouraging and positive

SPECIAL INSTRUCTION - COLLEGE LIST REQUESTS:
When students ask for college lists based on their percentile/rank (e.g., "Which colleges can I get at 70 percentile?", "Give me college list for 85 percentile", "What colleges are possible with my rank?"):
- DO NOT provide a list of colleges
- Instead, tell them: "To see personalized college predictions based on your percentile, please use our 'Predict Colleges' feature on the website. It will show you all possible colleges with branches and cutoffs based on historical data. I'm here to help you choose between options or understand branches better!"
- Guide them to use the prediction tool rather than listing colleges yourself

CONVERSATION MEMORY:
- If student already told you their rank/percentile, DON'T ask again
- If student already mentioned interests, DON'T ask again - just recommend based on that
- If student already said location preference, DON'T ask again
- Reference what they previously said (e.g., "Based on your 85 percentile you mentioned...")
- Avoid repetitive questions - track what student already shared

KEY TOPICS YOU HELP WITH:
- Branch selection based on interests and future goals
- Comparing specific colleges (e.g., COEP vs PICT)
- Understanding CAP rounds and cutoffs
- Career prospects of different engineering branches
- Guidance on which branch suits their interests
- Placement records and campus life questions

TOPICS TO REDIRECT:
- College list predictions → Redirect to "Predict Colleges" feature
- "Which colleges can I get?" → Redirect to prediction tool

IMPORTANT:
- Always mention MHT-CET/CET, NOT JEE
- Keep answers brief unless specifically asked for detailed explanation
- Be friendly and conversational, not robotic
- Ask NEW questions to personalize guidance - don't repeat questions

Example good response:
"Hey! I'd love to help you choose the right branch. First, tell me - what subjects or activities do you enjoy? Are you into coding/tech, building things, or maybe something else? Also, what's your approximate CET percentile range?"

Example bad response:
"Thank you for reaching out. As an expert counsellor, I would like to gather comprehensive information about your academic background, JEE rank, budget constraints, location preferences, and career aspirations to provide you with detailed guidance..."

Example for college list request:
Student: "Which colleges can I get at 75 percentile?"
Good Response: "To see personalized college predictions for your 75 percentile, please use our 'Predict Colleges' feature on the website! It will show you all possible colleges with branches based on historical cutoffs. Once you see the options, I can help you choose the best one for your interests. What field are you interested in - coding, core engineering, or something else?"

Remember: Be brief, friendly, MHT-CET focused, and REMEMBER what student already told you!`;

// ✅ Send message to AI counsellor
router.post("/chat", auth, async (req, res) => {
  const { message, sessionId } = req.body;
  const userId = req.user.userId;

  console.log("[AI Counselling] Received chat request:", { userId, messageLength: message?.length, sessionId });
  console.log("[AI Counselling] Gemini API Key:", GEMINI_API_KEY ? "Present (" + GEMINI_API_KEY.length + " chars)" : "MISSING!");

  try {
    if (!message || message.trim() === "") {
      console.log("[AI Counselling] Error: Empty message");
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    if (!GEMINI_API_KEY) {
      console.error("[AI Counselling] CRITICAL: Gemini API key is missing!");
      return res.status(500).json({ error: "AI service not configured. Please contact administrator." });
    }

    // Find or create counselling session
    let session;
    if (sessionId) {
      session = await Counselling.findOne({ _id: sessionId, userId });
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
    } else {
      // Create new session
      session = new Counselling({
        userId,
        conversations: [],
        sessionTitle: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
      });
    }

    // Add user message to conversation
    session.conversations.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    // Prepare conversation history for Gemini API
    // Gemini format: alternate user/model messages
    const conversationHistory = session.conversations
      .slice(-10) // Keep last 10 messages for memory (5 exchanges)
      .map((conv) => ({
        role: conv.role === "assistant" ? "model" : "user",
        parts: [{ text: conv.content }],
      }));

    // Build request with conversation history
    const requestContents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      ...conversationHistory,
    ];

    let aiResponse;

    // Call Gemini API
    console.log("[AI Counselling] Calling Gemini API...");
    console.log("[AI Counselling] Messages count:", conversationHistory.length);
    console.log("[AI Counselling] Total contents sent:", requestContents.length);
    
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: requestContents,
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    console.log("[AI Counselling] ✅ Gemini API response received");
    
    // Extract response from Gemini API
    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      aiResponse = response.data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format from Gemini API");
    }

    // Add AI response to conversation
    session.conversations.push({
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    });

    await session.save();

    res.json({
      message: "Response received",
      response: aiResponse,
      sessionId: session._id,
      conversationCount: session.conversations.length,
    });
  } catch (err) {
    console.error("[AI Counselling] ❌ Error occurred:");
    console.error("[AI Counselling] Error type:", err.name);
    console.error("[AI Counselling] Error message:", err.message);
    console.error("[AI Counselling] Status code:", err.response?.status);
    console.error("[AI Counselling] Response data:", err.response?.data);
    console.error("[AI Counselling] Full error:", err.toString());
    
    // Specific error handling for Gemini API
    let errorMessage = "Failed to get counselling response";
    let statusCode = 500;
    
    if (err.code === 'ECONNREFUSED') {
      errorMessage = "Cannot connect to AI service. Please check your internet connection.";
    } else if (err.code === 'ETIMEDOUT' || err.message.includes('timeout')) {
      errorMessage = "AI service timeout. Please try again.";
    } else if (err.response?.status === 400) {
      errorMessage = "Invalid request to Gemini API. Please try again.";
      console.error("[AI Counselling] Gemini API returned 400 - Bad Request");
    } else if (err.response?.status === 403) {
      errorMessage = "Gemini API key is invalid or doesn't have permission. Please check your API key.";
      console.error("[AI Counselling] CRITICAL: Invalid Gemini API key!");
    } else if (err.response?.status === 429) {
      errorMessage = "Gemini API rate limit exceeded. Please try again in a few moments.";
      console.error("[AI Counselling] Gemini API rate limit hit!");
    } else if (err.response?.status === 500) {
      errorMessage = "Gemini API is experiencing issues. Please try again later.";
    } else if (err.response?.data?.error) {
      const errorData = err.response.data.error;
      errorMessage = errorData.message || errorData.status || "Gemini API error occurred";
      console.error("[AI Counselling] Gemini API error:", errorData);
    } else if (err.message.includes('Invalid response format')) {
      errorMessage = "Received unexpected response from AI. Please try again.";
    }
    
    res.status(statusCode).json({
      error: errorMessage,
      details: err.response?.data || err.message,
    });
  }
});

// ✅ Get all counselling sessions for a user
router.get("/sessions", auth, async (req, res) => {
  const userId = req.user.userId;

  try {
    const sessions = await Counselling.find({ userId })
      .sort({ updatedAt: -1 })
      .select("sessionTitle createdAt updatedAt conversations");

    const sessionsWithPreview = sessions.map((session) => ({
      _id: session._id,
      sessionTitle: session.sessionTitle,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      messageCount: session.conversations.length,
      lastMessage:
        session.conversations.length > 0
          ? session.conversations[session.conversations.length - 1].content.substring(0, 100)
          : "",
    }));

    res.json({
      message: "Sessions fetched successfully",
      sessions: sessionsWithPreview,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// ✅ Get a specific counselling session
router.get("/sessions/:sessionId", auth, async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.userId;

  try {
    const session = await Counselling.findOne({ _id: sessionId, userId });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({
      message: "Session fetched successfully",
      session,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch session" });
  }
});

// ✅ Delete a counselling session
router.delete("/sessions/:sessionId", auth, async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.userId;

  try {
    const session = await Counselling.findOneAndDelete({
      _id: sessionId,
      userId,
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete session" });
  }
});

// ✅ Clear all conversations in a session
router.delete("/sessions/:sessionId/clear", auth, async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.userId;

  try {
    const session = await Counselling.findOne({ _id: sessionId, userId });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.conversations = [];
    await session.save();

    res.json({ message: "Conversations cleared successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clear conversations" });
  }
});

module.exports = router;
