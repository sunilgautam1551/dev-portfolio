import { z } from "zod";

export const guestbookFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(40, "Name is too long"),
  message: z.string().trim().min(2, "Say something").max(280, "Keep it under 280 characters"),
  // Honeypot: real users never fill this in; bots that auto-fill every field will.
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type GuestbookFormValues = z.infer<typeof guestbookFormSchema>;
