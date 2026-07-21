import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { getDashboardStats, getReports } from "../controllers/admin.controller";

const router = Router();

router.get("/dashboard", authenticate, authorize(["admin"]), getDashboardStats);
router.get("/reports", authenticate, authorize(["admin"]), getReports);

export default router;
