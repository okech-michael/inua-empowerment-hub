import type { RequestHandler } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { createDonationRecord, getDonations, getDonationByIdRecord } from "../services/donation.service";
import { donationSchema } from "../validators/donation.validator";

export const createDonation: RequestHandler = async (req, res) => {
  const validation = donationSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ success: false, message: "Invalid donation data", error: validation.error.flatten() });
  }

  const userId = (req as AuthRequest).user?.id ?? null;
  const donation = await createDonationRecord({
    user_id: userId,
    ...validation.data,
    checkout_request_id: null,
    merchant_request_id: null,
    status: "PENDING",
    transaction_reference: null,
  });

  return res.status(201).json({ success: true, data: donation });
};

export const getAllDonations: RequestHandler = async (_req, res) => {
  const donations = await getDonations();
  return res.json({ success: true, data: donations });
};

export const getDonationById: RequestHandler = async (req, res) => {
  const donation = await getDonationByIdRecord(req.params.id);
  if (!donation) {
    return res.status(404).json({ success: false, message: "Donation not found" });
  }

  const userId = (req as AuthRequest).user?.id;
  if (donation.user_id && donation.user_id !== userId && (req as AuthRequest).user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  return res.json({ success: true, data: donation });
};
