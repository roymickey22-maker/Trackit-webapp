import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  // 1. Create transporter
  // let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
 service: "gmail", // Gmail SMTP
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // app password from Google

    },
  });

  // 2. Mail options
  const mailOptions = {
    from: `"Nit Raipur Trackit" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  // 3. Send email
  const info = await transporter.sendMail(mailOptions);
  // console.log(info)
  // console.log("Message sent:", info.messageId);

  // //  This gives you the preview link
  // console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  // console.log("Email sent:", info.response);
};
