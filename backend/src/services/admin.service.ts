import { supabase } from "../config/supabase.config";

export const getDashboardStatsService = async () => {
  const [{ count: totalDonations }, { data: successData }, { data: failedData }, { data: pendingData }] = await Promise.all([
    supabase.from("donations").select("id", { count: "exact" }),
    supabase.from("donations").select("id", { count: "exact" }).eq("status", "SUCCESS"),
    supabase.from("donations").select("id", { count: "exact" }).eq("status", "FAILED"),
    supabase.from("donations").select("id", { count: "exact" }).eq("status", "PENDING"),
  ]);

  const { data: recentDonations } = await supabase.from("donations").select("*").order("created_at", { ascending: false }).limit(10);
  const monthlyTotals = await supabase.rpc("monthly_donation_totals");

  return {
    totalDonations: totalDonations ?? 0,
    successfulPayments: successData?.length ?? 0,
    failedPayments: failedData?.length ?? 0,
    pendingPayments: pendingData?.length ?? 0,
    recentDonations: recentDonations ?? [],
    monthlyTotals: monthlyTotals ?? [],
  };
};

export const getReportsService = async (params: { search?: string; page?: number; pageSize?: number; sortBy?: string; sortOrder?: string }) => {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;
  const offset = (page - 1) * pageSize;
  const query = supabase.from("donations").select("*", { count: "exact" });

  if (params.search) {
    query.ilike("donor_name", `%${params.search}%`).or(`phone.ilike.%${params.search}%`).or(`payment_method.ilike.%${params.search}%`);
  }

  if (params.sortBy) {
    query.order(params.sortBy, { ascending: params.sortOrder !== "desc" });
  } else {
    query.order("created_at", { ascending: false });
  }

  const { data, error, count } = await query.range(offset, offset + pageSize - 1);
  if (error) throw error;

  return { data: data ?? [], total: count ?? 0, page, pageSize };
};
