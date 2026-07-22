import { Router } from "express";
import { createDonation, getAllDonations, getDonationById } from "../controllers/donation.controller.js";

import { validate } from "../middleware/validation.middleware.js";
import { donationSchema } from "../validators/donation.validator.js";

const router = Router();

router.post("/", validate(donationSchema), createDonation);
router.get("/", getAllDonations);
router.get("/:id", getDonationById);

export default router;
