import { Router } from "express";
import { createDonation, getAllDonations, getDonationById } from "../controllers/donation.controller";

import { validate } from "../middleware/validation.middleware";
import { donationSchema } from "../validators/donation.validator";

const router = Router();

router.post("/", validate(donationSchema), createDonation);
router.get("/", getAllDonations);
router.get("/:id", getDonationById);

export default router;
