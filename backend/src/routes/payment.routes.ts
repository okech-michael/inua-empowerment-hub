import { Router } from "express";
import { startStkPush, handlePaymentCallback, getPaymentStatus } from "../controllers/payment.controller.js";

import { validate } from "../middleware/validation.middleware.js";
import { stkPushSchema } from "../validators/payment.validator.js";

const router = Router();

router.post("/stkpush", validate(stkPushSchema), startStkPush);
router.post("/callback", handlePaymentCallback);
router.get("/status/:checkoutRequestId", getPaymentStatus);

export default router;
