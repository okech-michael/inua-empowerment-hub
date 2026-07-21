import { z } from "zod";

export const stkPushSchema = z.object({
  donationId: z.string().uuid(),
});
