import type { RequestHandler } from "express";
import { createDonationRecord, getDonations, getDonationByIdRecord } from "../services/donation.service.js";
import { donationSchema } from "../validators/donation.validator.js";

export const createDonation: RequestHandler = async (req, res) => {
  const validation = donationSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ success: false, message: "Invalid donation data", error: validation.error.flatten() });
  }

  try {
    const donation = await createDonationRecord({
      user_id: null,
      ...validation.data,
      checkout_request_id: null,
      merchant_request_id: null,
      status: "PENDING",
      transaction_reference: null,
    });

    return res.status(201).json({ success: true, data: donation });
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "Donation could not be recorded at the moment.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAllDonations: RequestHandler = async (_req, res) => {
  try {
    const donations = await getDonations();
    return res.json({ success: true, data: donations });
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "Unable to load donations at the moment.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getDonationById: RequestHandler = async (req, res) => {
  try {
    const donation = await getDonationByIdRecord(req.params.id);
    if (!donation) {
      return res.status(404).json({ success: false, message: "Donation not found" });
    }

    return res.json({ success: true, data: donation });
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "Unable to load the donation record.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
