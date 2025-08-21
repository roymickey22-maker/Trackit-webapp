import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  // 1. Create transporter
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // 2. Mail options
  const mailOptions = {
    from: `"Nit Raipur Trackit" <${testAccount.user}>`,
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

};
