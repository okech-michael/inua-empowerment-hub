import { supabase } from "../config/supabase.config";

const darajaConsumerKey = process.env.DARAJA_CONSUMER_KEY;
const darajaConsumerSecret = process.env.DARAJA_CONSUMER_SECRET;
const darajaShortcode = process.env.DARAJA_SHORTCODE;
const darajaPasskey = process.env.DARAJA_PASSKEY;
const darajaCallbackUrl = process.env.DARAJA_CALLBACK_URL;

const isDarajaConfigured = Boolean(darajaConsumerKey && darajaConsumerSecret && darajaShortcode && darajaPasskey && darajaCallbackUrl);

const getDarajaToken = async () => {
  const credentials = Buffer.from(`${darajaConsumerKey}:${darajaConsumerSecret}`).toString("base64");
  const response = await fetch("https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to generate Daraja access token");
  }

  const data = await response.json();
  return data.access_token as string;
};

const getTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}${hour}${minute}${second}`;
};

export const initiateStkPush = async (phone: string, amount: number, accountReference: string, transactionDesc: string) => {
  if (!isDarajaConfigured) {
    throw new Error("M-Pesa configuration is incomplete. Please set the Daraja environment variables.");
  }

  const token = await getDarajaToken();
  const timestamp = getTimestamp();
  const password = Buffer.from(`${darajaShortcode}${darajaPasskey}${timestamp}`).toString("base64");

  const response = await fetch("https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: darajaShortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: darajaShortcode,
      PhoneNumber: phone,
      CallBackURL: darajaCallbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`STK push request failed: ${errorText}`);
  }

  return response.json();
};

export const createTransactionRecord = async (payload: {
  donation_id: string;
  mpesa_receipt?: string | null;
  amount: number;
  phone: string;
  result_code: number;
  result_description: string;
  callback_payload: Record<string, unknown>;
}) => {
  const { data, error } = await supabase.from("transactions").insert([payload]).select().single();
  if (error) throw error;
  return data;
};
