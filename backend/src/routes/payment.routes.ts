import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { startStkPush, handlePaymentCallback, getPaymentStatus } from "../controllers/payment.controller";

import { validate } from "../middleware/validation.middleware";
import { stkPushSchema } from "../validators/payment.validator";

const router = Router();

router.post("/stkpush", authenticate, validate(stkPushSchema), startStkPush);
router.post("/callback", handlePaymentCallback);
router.get("/status/:checkoutRequestId", authenticate, getPaymentStatus);

export default router;
