/**
 * Email Templates for College Predictor
 * Beautiful, modern, and responsive HTML email templates
 */

// Base email styles - reusable across all templates
const baseStyles = `
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
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .email-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    padding: 40px 30px;
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
    padding: 40px 30px;
  }
  .welcome-text {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }
  .otp-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    margin: 30px 0;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  .otp-label {
    color: #ffffff;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 15px;
    opacity: 0.9;
  }
  .otp-code {
    font-size: 42px;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: 8px;
    margin: 10px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .otp-expiry {
    color: #ffffff;
    font-size: 13px;
    margin-top: 15px;
    opacity: 0.85;
  }
  .info-box {
    background-color: #f8f9fa;
    border-left: 4px solid #667eea;
    padding: 20px;
    border-radius: 8px;
    margin: 25px 0;
  }
  .info-box p {
    margin: 0;
    font-size: 14px;
    color: #555;
  }
  .button {
    display: inline-block;
    padding: 14px 35px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin: 20px 0;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    transition: transform 0.2s;
  }
  .button:hover {
    transform: translateY(-2px);
  }
  .email-footer {
    background-color: #f8f9fa;
    padding: 30px;
    text-align: center;
    border-top: 1px solid #e0e0e0;
  }
  .email-footer p {
    margin: 5px 0;
    font-size: 13px;
    color: #666;
  }
  .social-links {
    margin: 20px 0;
  }
  .social-links a {
    display: inline-block;
    margin: 0 10px;
    color: #667eea;
    text-decoration: none;
  }
  .divider {
    height: 1px;
    background: linear-gradient(to right, transparent, #ddd, transparent);
    margin: 25px 0;
  }
  @media only screen and (max-width: 600px) {
    .email-container {
      margin: 10px;
      border-radius: 8px;
    }
    .email-header, .email-body, .email-footer {
      padding: 25px 20px;
    }
    .otp-code {
      font-size: 36px;
      letter-spacing: 6px;
    }
  }
`;

/**
 * Registration OTP Email Template
 */
const getRegistrationOTPTemplate = (username, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - College Predictor</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>🎓 Welcome to CollegePredictor!</h1>
          <p>You're one step away from unlocking your future</p>
        </div>
        
        <div class="email-body">
          <p class="welcome-text">Hi ${username || 'there'},</p>
          
          <p>Thank you for registering with <strong>CollegePredictor</strong>! We're excited to help you find your perfect college match.</p>
          
          <p>To complete your registration and verify your email address, please use the OTP code below:</p>
          
          <div class="otp-container">
            <div class="otp-label">Your Verification Code</div>
            <div class="otp-code">${otp}</div>
            <div class="otp-expiry">⏰ Valid for 10 minutes</div>
          </div>
          
          <div class="info-box">
            <p><strong>🔒 Security Tip:</strong> Never share this OTP with anyone. Our team will never ask for your verification code.</p>
          </div>
          
          <div class="divider"></div>
          
          <p><strong>What's Next?</strong></p>
          <ul style="color: #555; line-height: 1.8;">
            <li>Enter this OTP in the verification screen</li>
            <li>Complete your profile setup</li>
            <li>Start predicting your dream colleges!</li>
          </ul>
          
          <p style="margin-top: 25px;">If you didn't create an account with us, please ignore this email or <a href="mailto:collegespredictor@gmail.com" style="color: #667eea; text-decoration: none;">contact our support team</a>.</p>
        </div>
        
        <div class="email-footer">
          <p style="font-weight: 600; color: #333; margin-bottom: 15px;">CollegePredictor Team</p>
          <p>Helping students find their perfect college match</p>
          <p style="margin-top: 15px;">
            <a href="mailto:collegespredictor@gmail.com" style="color: #667eea; text-decoration: none;">📧 collegespredictor@gmail.com</a>
          </p>
          <div class="divider"></div>
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} CollegePredictor. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Forgot Password OTP Email Template
 */
const getForgotPasswordOTPTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - College Predictor</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>🔐 Password Reset Request</h1>
          <p>CollegePredictor Account Security</p>
        </div>
        
        <div class="email-body">
          <p class="welcome-text">Hello,</p>
          
          <p>We received a request to reset your password for your <strong>CollegePredictor</strong> account.</p>
          
          <p>To proceed with resetting your password, please use the OTP code below:</p>
          
          <div class="otp-container">
            <div class="otp-label">Password Reset Code</div>
            <div class="otp-code">${otp}</div>
            <div class="otp-expiry">⏰ Valid for 10 minutes</div>
          </div>
          
          <div class="info-box">
            <p><strong>⚠️ Important:</strong> If you didn't request a password reset, please ignore this email. Your account is safe and no changes have been made.</p>
          </div>
          
          <div class="divider"></div>
          
          <p><strong>How to Reset Your Password:</strong></p>
          <ol style="color: #555; line-height: 1.8;">
            <li>Go to the password reset page</li>
            <li>Enter this OTP code</li>
            <li>Create a new strong password</li>
            <li>Confirm your new password</li>
          </ol>
          
          <div class="divider"></div>
          
          <p style="margin-top: 25px;"><strong>🔒 Security Reminder:</strong></p>
          <ul style="color: #555; line-height: 1.8; font-size: 14px;">
            <li>Use a strong password with at least 8 characters</li>
            <li>Include uppercase letters, numbers, and special characters</li>
            <li>Don't reuse passwords from other accounts</li>
            <li>Never share your password with anyone</li>
          </ul>
          
          <p style="margin-top: 25px;">If you need assistance, please <a href="mailto:collegespredictor@gmail.com" style="color: #667eea; text-decoration: none;">contact our support team</a>.</p>
        </div>
        
        <div class="email-footer">
          <p style="font-weight: 600; color: #333; margin-bottom: 15px;">CollegePredictor Security Team</p>
          <p>Protecting your account and data</p>
          <p style="margin-top: 15px;">
            <a href="mailto:collegespredictor@gmail.com" style="color: #667eea; text-decoration: none;">📧 collegespredictor@gmail.com</a>
          </p>
          <div class="divider"></div>
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} CollegePredictor. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Welcome Email Template (After Successful Verification)
 */
const getWelcomeEmailTemplate = (username) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to CollegePredictor</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>🎉 Welcome Aboard!</h1>
          <p>Your journey to finding the perfect college starts now</p>
        </div>
        
        <div class="email-body">
          <p class="welcome-text">Hi ${username},</p>
          
          <p>Congratulations! Your email has been successfully verified and your account is now active.</p>
          
          <p style="font-size: 16px; margin: 25px 0;">You now have access to all our features:</p>
          
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 25px; margin: 25px 0;">
            <div style="margin-bottom: 15px;">
              <span style="font-size: 24px;">🎯</span>
              <strong style="margin-left: 10px;">College Predictions</strong>
              <p style="margin: 8px 0 0 34px; color: #666; font-size: 14px;">Get personalized college recommendations based on your rank</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <span style="font-size: 24px;">📋</span>
              <strong style="margin-left: 10px;">My List Management</strong>
              <p style="margin: 8px 0 0 34px; color: #666; font-size: 14px;">Save and organize your favorite colleges</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <span style="font-size: 24px;">🤖</span>
              <strong style="margin-left: 10px;">AI Counselling</strong>
              <p style="margin: 8px 0 0 34px; color: #666; font-size: 14px;">Get expert guidance powered by AI</p>
            </div>
            
            <div>
              <span style="font-size: 24px;">📊</span>
              <strong style="margin-left: 10px;">Export & Analyze</strong>
              <p style="margin: 8px 0 0 34px; color: #666; font-size: 14px;">Download and share your college list</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 35px 0;">
            <a href="http://localhost:5173/dashboard" class="button">Go to Your Dashboard →</a>
          </div>
          
          <div class="info-box">
            <p><strong>💡 Quick Tip:</strong> Start by entering your rank in the "Predict" section to get personalized college recommendations!</p>
          </div>
          
          <div class="divider"></div>
          
          <p>Need help getting started? Check out our <a href="#" style="color: #667eea; text-decoration: none;">Quick Start Guide</a> or reach out to our support team.</p>
        </div>
        
        <div class="email-footer">
          <p style="font-weight: 600; color: #333; margin-bottom: 15px;">The CollegePredictor Team</p>
          <p>We're here to help you succeed!</p>
          <p style="margin-top: 15px;">
            <a href="mailto:collegespredictor@gmail.com" style="color: #667eea; text-decoration: none;">📧 collegespredictor@gmail.com</a>
          </p>
          <div class="divider"></div>
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} CollegePredictor. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Password Reset Success Email Template
 */
const getPasswordResetSuccessTemplate = (username) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Successful</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>✅ Password Reset Successful</h1>
          <p>Your account is secure</p>
        </div>
        
        <div class="email-body">
          <p class="welcome-text">Hi ${username || 'there'},</p>
          
          <p>Your password has been successfully reset for your <strong>CollegePredictor</strong> account.</p>
          
          <div style="background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border-left: 4px solid #28a745; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <p style="margin: 0; color: #155724; font-weight: 600;">✓ Your password has been changed</p>
            <p style="margin: 10px 0 0 0; color: #155724; font-size: 14px;">You can now log in with your new password</p>
          </div>
          
          <div style="text-align: center; margin: 35px 0;">
            <a href="http://localhost:5173/login" class="button">Sign In to Your Account →</a>
          </div>
          
          <div class="info-box">
            <p><strong>⚠️ Didn't make this change?</strong></p>
            <p style="margin-top: 10px;">If you didn't reset your password, please contact our support team immediately at <a href="mailto:collegespredictor@gmail.com" style="color: #667eea; text-decoration: none;">collegespredictor@gmail.com</a></p>
          </div>
          
          <div class="divider"></div>
          
          <p><strong>🔒 Account Security Tips:</strong></p>
          <ul style="color: #555; line-height: 1.8; font-size: 14px;">
            <li>Keep your password safe and don't share it</li>
            <li>Use a unique password for this account</li>
            <li>Enable two-factor authentication when available</li>
            <li>Update your password regularly</li>
          </ul>
        </div>
        
        <div class="email-footer">
          <p style="font-weight: 600; color: #333; margin-bottom: 15px;">CollegePredictor Security Team</p>
          <p>Your security is our priority</p>
          <p style="margin-top: 15px;">
            <a href="mailto:collegespredictor@gmail.com" style="color: #667eea; text-decoration: none;">📧 collegespredictor@gmail.com</a>
          </p>
          <div class="divider"></div>
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} CollegePredictor. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  getRegistrationOTPTemplate,
  getForgotPasswordOTPTemplate,
  getWelcomeEmailTemplate,
  getPasswordResetSuccessTemplate
};
