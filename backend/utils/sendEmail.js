module.exports = sendEmail;

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: options.to,
      subject: options.subject,
      text: options.text,
    });

    console.log("✅ Email sent successfully:", response);
  } catch (error) {
    console.error("❌ FULL RESEND ERROR:");
    console.error(error);
    console.error("Error message:", error.message);
    console.error("Error response:", error.response?.data);
    throw error;
  }
};

module.exports = sendEmail;