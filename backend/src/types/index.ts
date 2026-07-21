export interface UserRecord {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
}

export interface DonationRecord {
  id: string;
  donor_name: string;
  phone: string;
  amount: number;
  project: string | null;
  message: string | null;
  payment_method: string;
  checkout_request_id: string | null;
  merchant_request_id: string | null;
  status: string;
  transaction_reference: string | null;
  created_at: string;
  updated_at: string;
}

export interface TransactionRecord {
  id: string;
  donation_id: string;
  mpesa_receipt: string | null;
  amount: number;
  phone: string;
  result_code: number;
  result_description: string;
  callback_payload: Record<string, unknown>;
  created_at: string;
}
