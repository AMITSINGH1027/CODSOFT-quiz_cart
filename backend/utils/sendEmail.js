const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(options) {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: options.to,
      subject: options.subject,
      text: options.text,
    });

    console.log("✅ Email sent successfully:", response);
  } catch (error) {
    console.error("❌ Resend Error:", error);
    throw error;
  }
}

module.exports = sendEmail;