import * as nodemailer from 'nodemailer';

export async function sendConfirmationEmail(to: string, productName: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.warn('SMTP configuration is missing. Skipping confirmation email.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: SMTP_FROM,
    to,
    subject: `You're on the waitlist for ${productName}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank you for joining the waitlist!</h2>
        <p>Hi there,</p>
        <p>You're officially on the waitlist for <strong>${productName}</strong>. We're thrilled to have you on board!</p>
        <p>We'll be in touch as soon as we have more updates to share.</p>
        <br/>
        <p>Best regards,</p>
        <p>The ${productName} Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}
