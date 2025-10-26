const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');

// @route   POST /api/contact
// @desc    Send contact form email
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide name, email, and message' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Create formatted HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .email-header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .email-body {
            padding: 30px;
          }
          .info-row {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
          }
          .info-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .info-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #667eea;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .info-value {
            font-size: 16px;
            color: #333;
            word-wrap: break-word;
          }
          .message-box {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            margin-top: 10px;
          }
          .email-footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .timestamp {
            color: #999;
            font-size: 12px;
            margin-top: 5px;
          }
          @media only screen and (max-width: 600px) {
            .email-container {
              margin: 10px;
            }
            .email-header, .email-body, .email-footer {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>📬 New Contact Form Submission</h1>
            <p>College Predictor Contact Form</p>
          </div>
          
          <div class="email-body">
            <div class="info-row">
              <div class="info-label">👤 Full Name</div>
              <div class="info-value">${name}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">📧 Email Address</div>
              <div class="info-value">
                <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
              </div>
            </div>
            
            ${phone ? `
            <div class="info-row">
              <div class="info-label">📱 Phone Number</div>
              <div class="info-value">${phone}</div>
            </div>
            ` : ''}
            
            <div class="info-row">
              <div class="info-label">💬 Message</div>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="timestamp">
              ⏰ Received on: ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          
          <div class="email-footer">
            <p style="margin: 0;">This message was sent from the College Predictor contact form.</p>
            <p style="margin: 5px 0 0 0;">Please respond to the sender at their provided email address.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const textContent = `
New Contact Form Submission - College Predictor

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
Received on: ${new Date().toLocaleString()}
    `;

    // Send email to collegespredictor@gmail.com
    await sendEmail(
      'collegespredictor@gmail.com',
      `New Contact Form: ${name}`,
      textContent,
      htmlContent
    );

    res.status(200).json({ 
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later or contact us directly at collegespredictor@gmail.com' 
    });
  }
});

module.exports = router;
