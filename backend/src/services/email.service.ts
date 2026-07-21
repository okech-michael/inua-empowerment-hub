import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

const emailProvider = process.env.EMAIL_PROVIDER ?? "sendgrid";
const emailFrom = process.env.EMAIL_FROM ?? "no-reply@yourdomain.com";
const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (emailProvider === "sendgrid" && !sendgridApiKey) {
  throw new Error("SENDGRID_API_KEY must be defined for SendGrid provider");
}

sgMail.setApiKey(sendgridApiKey ?? "");

const createSmtpTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const secure = process.env.SMTP_SECURE === "true";

  if (!host || !user || !password) {
    throw new Error("SMTP configuration must be defined for SMTP provider");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass: password },
  });
};

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) => {
  if (emailProvider === "sendgrid") {
    return sgMail.send({
      to,
      from: emailFrom,
      subject,
      html,
      text,
    });
  }

  const transporter = createSmtpTransporter();
  return transporter.sendMail({
    from: emailFrom,
    to,
    subject,
    html,
    text,
  });
};

export const sendDonationReceipt = async ({
  email,
  fullname,
  amount,
}: {
  email: string;
  fullname: string;
  amount: number;
}) => {
  const subject = "Thank you for your donation to INUA VIJANA";
  const html = `<p>Dear ${fullname},</p><p>Thank you for your generous donation of <strong>$${amount}</strong> to INUA VIJANA. We appreciate your support and will put these funds to work supporting youth leadership programs across Africa.</p><p>Warm regards,<br/>INUA VIJANA Team</p>`;
  const text = `Dear ${fullname},\n\nThank you for your generous donation of $${amount} to INUA VIJANA. We appreciate your support and will put these funds to work supporting youth leadership programs across Africa.\n\nWarm regards,\nINUA VIJANA Team`;

  return sendEmail({ to: email, subject, html, text });
};
