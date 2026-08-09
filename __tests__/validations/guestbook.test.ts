import { guestbookFormSchema } from "@/lib/validations/guestbook";

const validValues = {
  name: "Grace Hopper",
  message: "Great to see this portfolio — love the guestbook idea!",
  company: "",
};

describe("guestbookFormSchema", () => {
  it("accepts a valid submission", () => {
    expect(guestbookFormSchema.safeParse(validValues).success).toBe(true);
  });

  it("rejects a message over 280 characters", () => {
    const result = guestbookFormSchema.safeParse({
      ...validValues,
      message: "a".repeat(281),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty name", () => {
    const result = guestbookFormSchema.safeParse({ ...validValues, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a filled-in honeypot field", () => {
    const result = guestbookFormSchema.safeParse({ ...validValues, company: "Spammer LLC" });
    expect(result.success).toBe(false);
  });
});
