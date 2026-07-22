import sgMail from "@sendgrid/mail";

const emailFrom = process.env.EMAIL_FROM ?? "no-reply@yourdomain.com";
const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

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
  if (!sendgridApiKey) {
    console.warn("SENDGRID_API_KEY not configured, email not sent to:", to);
    return { success: true, message: "Email notification skipped (SendGrid not configured)" };
  }

  return sgMail.send({
    to,
    from: emailFrom,
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
