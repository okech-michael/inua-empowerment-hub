import { getSupabaseClient } from "../config/supabase.config.js";
import { withTimeout } from "../utils/with-timeout.js";

export const createAuditLog = async (payload: {
  action: string;
  performed_by?: string | null;
  ip_address?: string | null;
  payload?: Record<string, unknown>;
}) => {
  const supabase = getSupabaseClient();
  const result = await withTimeout(
    (async () => {
      return supabase.from("audit_logs").insert([payload]).select().single();
    })(),
    2000,
    "Supabase audit insert timed out",
  );
  const { data, error } = result;
  if (error) throw error;
  return data;
};
