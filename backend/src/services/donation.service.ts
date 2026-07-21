import { supabase } from "../config/supabase.config";

export const createDonationRecord = async (payload: {
  user_id?: string | null;
  donor_name: string;
  phone: string;
  amount: number;
  project?: string;
  message?: string;
  payment_method: string;
  checkout_request_id?: string | null;
  merchant_request_id?: string | null;
  status: string;
  transaction_reference?: string | null;
}) => {
  const { data, error } = await supabase.from("donations").insert([payload]).select().single();
  if (error) throw error;
  return data;
};

export const getDonations = async () => {
  const { data, error } = await supabase.from("donations").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const getDonationByIdRecord = async (id: string) => {
  const { data, error } = await supabase.from("donations").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
};

export const updateDonationStatus = async (checkoutRequestId: string, updates: Partial<Record<string, unknown>>) => {
  const { data, error } = await supabase
    .from("donations")
    .update(updates)
    .eq("checkout_request_id", checkoutRequestId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getDonationByCheckoutRequestId = async (checkoutRequestId: string) => {
  const { data, error } = await supabase.from("donations").select("*").eq("checkout_request_id", checkoutRequestId).single();
  if (error) throw error;
  return data;
};
