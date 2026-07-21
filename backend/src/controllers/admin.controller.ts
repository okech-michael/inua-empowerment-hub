import { Request, Response } from "express";
import { getDashboardStatsService, getReportsService } from "../services/admin.service";

export const getDashboardStats = async (_req: Request, res: Response) => {
  const data = await getDashboardStatsService();
  return res.json({ success: true, data });
};

export const getReports = async (req: Request, res: Response) => {
  const { search, page, pageSize, sortBy, sortOrder } = req.query;
  const data = await getReportsService({
    search: typeof search === "string" ? search : undefined,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    sortBy: typeof sortBy === "string" ? sortBy : undefined,
    sortOrder: typeof sortOrder === "string" ? sortOrder : "desc",
  });
  return res.json({ success: true, data });
};
