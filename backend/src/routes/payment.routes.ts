import { Router } from "express";
import { startStkPush, handlePaymentCallback, getPaymentStatus } from "../controllers/payment.controller";

import { validate } from "../middleware/validation.middleware";
import { stkPushSchema } from "../validators/payment.validator";

const router = Router();

router.post("/stkpush", validate(stkPushSchema), startStkPush);
router.post("/callback", handlePaymentCallback);
router.get("/status/:checkoutRequestId", getPaymentStatus);

export default router;
