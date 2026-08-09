import { contactFormSchema } from "@/lib/validations/contact";

const validValues = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  reason: "opportunity" as const,
  message: "I'd love to chat about a role on your team.",
  company: "",
};

describe("contactFormSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactFormSchema.safeParse(validValues);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactFormSchema.safeParse({ ...validValues, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactFormSchema.safeParse({ ...validValues, message: "hi" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing/invalid reason", () => {
    const result = contactFormSchema.safeParse({ ...validValues, reason: "not-a-reason" });
    expect(result.success).toBe(false);
  });

  it("rejects a filled-in honeypot field", () => {
    const result = contactFormSchema.safeParse({ ...validValues, company: "Acme Bots Inc." });
    expect(result.success).toBe(false);
  });

  it("rejects a name that is too short", () => {
    const result = contactFormSchema.safeParse({ ...validValues, name: "A" });
    expect(result.success).toBe(false);
  });
});
