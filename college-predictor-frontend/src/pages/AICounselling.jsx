import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { counsellingAPI } from '../services/api';

export default function AICounselling() {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
  };

  useEffect(() => {
    // Only scroll if messages container exists and has messages
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages.length]); // Only trigger on message count change

  // Load sessions on component mount
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoadingSessions(true);
      const data = await counsellingAPI.getSessions();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadSession = async (sessionId) => {
    try {
      const data = await counsellingAPI.getSession(sessionId);
      setCurrentSession(data.session);
      setMessages(data.session.conversations || []);
    } catch (error) {
      toast.error('Failed to load session');
    }
  };

  const startNewSession = () => {
    setCurrentSession(null);
    setMessages([]);
    setInputMessage('');
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) {
      toast.warning('Please enter a message');
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to UI immediately
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      console.log('[AI Counselling Frontend] Sending message:', { 
        messageLength: userMessage.length, 
        sessionId: currentSession?._id 
      });
      
      const data = await counsellingAPI.sendMessage({
        message: userMessage,
        sessionId: currentSession?._id,
      });

      console.log('[AI Counselling Frontend] Response received:', data);

      // Add AI response to messages
      const aiMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Update current session
      if (!currentSession) {
        setCurrentSession({ _id: data.sessionId });
        loadSessions(); // Refresh session list
      }
    } catch (error) {
      console.error('[AI Counselling Frontend] Error:', error);
      
      // Show detailed error message
      let errorMessage = 'Failed to get response';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.error) {
        errorMessage = error.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        autoClose: 5000,
      });
      
      // Remove the user message if failed
      setMessages((prev) => prev.slice(0, -1));
      setInputMessage(userMessage); // Restore the message
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (sessionId) => {
    setSessionToDelete(sessionId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!sessionToDelete) return;

    try {
      await counsellingAPI.deleteSession(sessionToDelete);
      toast.success('Session deleted successfully');
      loadSessions();
      if (currentSession?._id === sessionToDelete) {
        startNewSession();
      }
    } catch (error) {
      toast.error('Failed to delete session');
    } finally {
      setShowDeleteModal(false);
      setSessionToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Career Counselling
          </h1>
          <p className="text-lg text-gray-600">
            Get personalized guidance for your college and career choices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Session History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Sessions</h2>
                <button
                  onClick={startNewSession}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  + New
                </button>
              </div>

              {loadingSessions ? (
                <div className="text-center py-8 text-gray-500">
                  Loading sessions...
                </div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No previous sessions
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {sessions.map((session) => (
                    <div
                      key={session._id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentSession?._id === session._id
                          ? 'bg-blue-100 border-blue-300 border'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div
                        onClick={() => loadSession(session._id)}
                        className="flex-1"
                      >
                        <h3 className="font-medium text-sm text-gray-800 line-clamp-1">
                          {session.sessionTitle}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {session.messageCount} messages
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(session.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session._id);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md flex flex-col h-[700px]">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">
                  {currentSession ? 'Counselling Session' : 'Start New Session'}
                </h2>
                <p className="text-sm text-blue-100 mt-1">
                  Ask me anything about colleges, branches, or career guidance
                </p>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ scrollBehavior: 'auto' }}>
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Welcome to AI Counselling
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Start a conversation by asking about college selection, career
                      options, or any guidance you need for your future.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      <button
                        onClick={() =>
                          setInputMessage(
                            'Which branch should I choose?'
                          )
                        }
                        className="text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-gray-700 transition-colors"
                      >
                        💡 Which branch should I choose?
                      </button>
                      <button
                        onClick={() =>
                          setInputMessage(
                            'What are the career prospects in Computer Science?'
                          )
                        }
                        className="text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm text-gray-700 transition-colors"
                      >
                        🎯 Career prospects in CS?
                      </button>
                      <button
                        onClick={() =>
                          setInputMessage(
                            'Which college is better - COEP or PICT for CSE?'
                          )
                        }
                        className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm text-gray-700 transition-colors"
                      >
                        🏛️ COEP vs PICT comparison?
                      </button>
                      <button
                        onClick={() =>
                          setInputMessage(
                            'How does CAP round work for MHT-CET?'
                          )
                        }
                        className="text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm text-gray-700 transition-colors"
                      >
                        📚 CAP rounds process?
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            msg.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {msg.role === 'assistant' && (
                              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                AI
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="text-sm whitespace-pre-wrap">
                                {msg.content}
                              </p>
                              <p
                                className={`text-xs mt-2 ${
                                  msg.role === 'user'
                                    ? 'text-blue-200'
                                    : 'text-gray-500'
                                }`}
                              >
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              AI
                            </div>
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Area */}
              <form onSubmit={sendMessage} className="border-t p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about colleges, careers, or guidance..."
                    disabled={isLoading}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Session?
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to delete this counselling session? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSessionToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
