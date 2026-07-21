import { supabase } from "../config/supabase.config";

export const createAuditLog = async (payload: {
  action: string;
  performed_by?: string | null;
  ip_address?: string | null;
  payload?: Record<string, unknown>;
}) => {
  const { data, error } = await supabase.from("audit_logs").insert([payload]).select().single();
  if (error) throw error;
  return data;
};
