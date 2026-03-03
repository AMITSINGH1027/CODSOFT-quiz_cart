const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  await resend.emails.send({
from: "QuizCart <singhamit39062@gmail.com>",
to: options.to,
    subject: options.subject,
    text: options.text,
  });
};

module.exports = sendEmail;