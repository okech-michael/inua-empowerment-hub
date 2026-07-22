import { Request, Response } from "express";
import { initiateStkPush, createTransactionRecord } from "../services/payment.service.js";
import { getDonationByCheckoutRequestId, updateDonationStatus, updateDonationById, getDonationByIdRecord } from "../services/donation.service.js";
import { stkPushSchema } from "../validators/payment.validator.js";
import { parseMpesaCallback } from "../webhooks/mpesa.callback.js";

export const startStkPush = async (req: Request, res: Response) => {
  const validation = stkPushSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ success: false, message: "Invalid STK push request", error: validation.error.flatten() });
  }

  const donation = await getDonationByIdRecord(validation.data.donationId);
  if (!donation) {
    return res.status(404).json({ success: false, message: "Donation not found" });
  }

  const stkResponse = await initiateStkPush(donation.phone, donation.amount, donation.id, `Donation ${donation.id}`);

  const checkoutRequestId = stkResponse?.CheckoutRequestID ?? null;
  const merchantRequestId = stkResponse?.MerchantRequestID ?? null;

  const updatedDonation = await updateDonationById(donation.id, {
    checkout_request_id: checkoutRequestId,
    merchant_request_id: merchantRequestId,
    status: "PENDING",
  });

  return res.json({ success: true, data: { checkoutRequestId, merchantRequestId, donation: updatedDonation } });
};

export const handlePaymentCallback = async (req: Request, res: Response) => {
  const payload = req.body;
  const callbackData = parseMpesaCallback(payload);

  const donation = await getDonationByCheckoutRequestId(callbackData.checkoutRequestId);
  if (!donation) {
    return res.status(404).json({ success: false, message: "Donation not found" });
  }

  const status = callbackData.resultCode === 0 ? "SUCCESS" : "FAILED";

  await updateDonationStatus(callbackData.checkoutRequestId, {
    status,
    transaction_reference: callbackData.mpesaReceipt,
  });

  await createTransactionRecord({
    donation_id: donation.id,
    mpesa_receipt: callbackData.mpesaReceipt,
    amount: donation.amount,
    phone: donation.phone,
    result_code: callbackData.resultCode,
    result_description: callbackData.resultDesc,
    callback_payload: callbackData.callbackPayload,
  });

  res.status(200).json({ success: true });
};

export const getPaymentStatus = async (req: Request, res: Response) => {
  const checkoutRequestId = req.params.checkoutRequestId;
  const donation = await getDonationByCheckoutRequestId(checkoutRequestId);
  if (!donation) {
    return res.status(404).json({ success: false, message: "Payment status not found" });
  }
  return res.json({ success: true, data: { status: donation.status, donation } });
};
