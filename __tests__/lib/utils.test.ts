import { cn } from "@/lib/utils";
import { getClientIp } from "@/lib/ip";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("drops falsy values", () => {
    expect(cn("text-sm", false, undefined, null, "font-bold")).toBe("text-sm font-bold");
  });
});

describe("getClientIp", () => {
  it("reads the first IP from x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.4, 10.0.0.1" });
    expect(getClientIp(headers)).toBe("203.0.113.4");
  });

  it("falls back to x-real-ip", () => {
    const headers = new Headers({ "x-real-ip": "203.0.113.9" });
    expect(getClientIp(headers)).toBe("203.0.113.9");
  });

  it("falls back to a loopback address when no headers are present", () => {
    expect(getClientIp(new Headers())).toBe("127.0.0.1");
  });
});
