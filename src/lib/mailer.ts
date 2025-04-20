import nodemailer from 'nodemailer';


export const sendMail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"Messenger App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email with this OTP',
    html: `<p>Your OTP is: <b>${otp}</b></p>`,
  });
};
