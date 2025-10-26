const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
  };

  // Add HTML if provided, otherwise use text
  if (html) {
    mailOptions.html = html;
    mailOptions.text = text; // Fallback for email clients that don't support HTML
  } else {
    mailOptions.text = text;
  }

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
