// backend/sendEmail.js
import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // o tu proveedor SMTP
    auth: {
      user: 'garciaf.chema@gmail.com',
      pass: 'pzea qtsi lwmx hcvs' // No uses tu contraseña normal, usa una App Password si usas Gmail
    }
  });

  const mailOptions = {
    from: '"GuessWhere" <garciaf.chema@gmail.com>',
    to: email,
    subject: 'Código de verificación',
    text: `Tu código de verificación es: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;
