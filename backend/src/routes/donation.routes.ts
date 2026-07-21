import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { createDonation, getAllDonations, getDonationById } from "../controllers/donation.controller";

import { validate } from "../middleware/validation.middleware";
import { donationSchema } from "../validators/donation.validator";

const router = Router();

router.post("/", authenticate, validate(donationSchema), createDonation);
router.get("/", authenticate, authorize(["admin"]), getAllDonations);
router.get("/:id", authenticate, getDonationById);

export default router;
