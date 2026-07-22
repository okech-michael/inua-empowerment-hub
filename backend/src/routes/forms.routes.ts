import { Router } from "express";
import { z } from "zod";
import { sendEmail } from "../services/email.service.js";

const router = Router();

const joinSchema = z.object({
  tab: z.enum(["Youth", "Organization", "Corporate"]).optional().default("Youth"),
  fullName: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  dateOfBirth: z.string().optional(),
  goals: z.string().optional(),
});

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  organization: z.string().optional(),
  message: z.string().min(1),
});

router.post("/join", async (req, res) => {
  const validation = joinSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ success: false, message: "Please complete the required fields.", error: validation.error.flatten() });
  }

  const payload = validation.data;

  try {
    await notifyTeam({
      subject: `New ${payload.tab} application from ${payload.fullName}`,
      text: [
        `Type: ${payload.tab}`,
        `Name: ${payload.fullName}`,
        `Email: ${payload.email}`,
        `Country: ${payload.country}`,
        `Date of birth: ${payload.dateOfBirth || "N/A"}`,
        `Goals: ${payload.goals || "N/A"}`,
      ].join("\n"),
      html: `<p><strong>New ${payload.tab} application</strong></p><ul><li>Name: ${payload.fullName}</li><li>Email: ${payload.email}</li><li>Country: ${payload.country}</li><li>Date of birth: ${payload.dateOfBirth || "N/A"}</li><li>Goals: ${payload.goals || "N/A"}</li></ul>`,
    });
  } catch (error) {
    console.error("Failed to send join application notification", error);
  }

  return res.status(200).json({ success: true, message: "Application submitted successfully! We'll be in touch soon." });
});

router.post("/contact", async (req, res) => {
  const validation = contactSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ success: false, message: "Please complete the required fields.", error: validation.error.flatten() });
  }

  const payload = validation.data;

  try {
    await notifyTeam({
      subject: `New contact message from ${payload.firstName} ${payload.lastName}`,
      text: [
        `Name: ${payload.firstName} ${payload.lastName}`,
        `Email: ${payload.email}`,
        `Organization: ${payload.organization || "N/A"}`,
        `Message: ${payload.message}`,
      ].join("\n"),
      html: `<p><strong>New contact message</strong></p><ul><li>Name: ${payload.firstName} ${payload.lastName}</li><li>Email: ${payload.email}</li><li>Organization: ${payload.organization || "N/A"}</li><li>Message: ${payload.message}</li></ul>`,
    });
  } catch (error) {
    console.error("Failed to send contact message notification", error);
  }

  return res.status(200).json({ success: true, message: "Message sent successfully! We'll be in touch soon." });
});

const notifyTeam = async ({ subject, text, html }: { subject: string; text: string; html: string }) => {
  const recipients = [process.env.JOIN_NOTIFICATION_EMAIL, process.env.CONTACT_NOTIFICATION_EMAIL, process.env.EMAIL_FROM].filter(Boolean);
  if (recipients.length === 0) {
    return;
  }

  await sendEmail({
    to: recipients[0] as string,
    subject,
    text,
    html,
  });
};

export default router;
