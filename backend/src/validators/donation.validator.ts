import { z } from "zod";

export const donationSchema = z.object({
  donor_name: z.string().min(1),
  phone: z.string().min(10),
  amount: z.number().min(1),
  project: z.string().optional(),
  message: z.string().optional(),
  payment_method: z.string().min(1),
});
