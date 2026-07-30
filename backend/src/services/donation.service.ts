import { randomUUID } from "node:crypto";
import { getSupabaseClient } from "../config/supabase.config.js";

const memoryDonations: Array<{
  id: string;
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
  created_at?: string;
}> = [];

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
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("donations").insert([payload]).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Supabase is not configured")) {
      const donation = {
        id: randomUUID(),
        created_at: new Date().toISOString(),
        ...payload,
      };
      memoryDonations.unshift(donation);
      return donation;
    }
    throw error;
  }
};

export const getDonations = async () => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("donations").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Supabase is not configured")) {
      return memoryDonations;
    }
    throw error;
  }
};

export const getDonationByIdRecord = async (id: string) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("donations").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Supabase is not configured")) {
      return memoryDonations.find((donation) => donation.id === id) ?? null;
    }
    throw error;
  }
};

export const updateDonationStatus = async (checkoutRequestId: string, updates: Partial<Record<string, unknown>>) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("donations")
    .update(updates)
    .eq("checkout_request_id", checkoutRequestId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateDonationById = async (donationId: string, updates: Partial<Record<string, unknown>>) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("donations")
    .update(updates)
    .eq("id", donationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getDonationByCheckoutRequestId = async (checkoutRequestId: string) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("donations").select("*").eq("checkout_request_id", checkoutRequestId).single();
  if (error) throw error;
  return data;
};
