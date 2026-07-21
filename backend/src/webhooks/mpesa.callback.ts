export const parseMpesaCallback = (payload: any) => {
  const callback = payload?.Body?.stkCallback;
  if (!callback) {
    throw new Error("Invalid M-Pesa callback payload");
  }

  const metadata = callback.CallbackMetadata?.Item ?? [];
  const mpesaReceipt = metadata.find((item: any) => item.Name === "MpesaReceiptNumber")?.Value ?? null;
  const amount = metadata.find((item: any) => item.Name === "Amount")?.Value ?? null;
  const phone = metadata.find((item: any) => item.Name === "PhoneNumber")?.Value ?? null;

  return {
    checkoutRequestId: callback.CheckoutRequestID,
    resultCode: callback.ResultCode,
    resultDesc: callback.ResultDesc,
    mpesaReceipt,
    amount,
    phone,
    callbackPayload: payload,
  };
};
