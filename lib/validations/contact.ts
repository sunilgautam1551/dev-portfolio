import { z } from "zod";

export const contactReasons = ["opportunity", "collaboration", "hello"] as const;

export const contactReasonLabels: Record<(typeof contactReasons)[number], string> = {
  opportunity: "Opportunity",
  collaboration: "Collaboration",
  hello: "Just saying hi",
};

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  email: z.email("Enter a valid email address"),
  reason: z.enum(contactReasons, { message: "Select a reason" }),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message is too long"),
  // Honeypot: real users never fill this in; bots that auto-fill every field will.
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
