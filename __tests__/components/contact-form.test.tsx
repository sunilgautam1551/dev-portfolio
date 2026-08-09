import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContactSection } from "@/components/sections/contact-section";

jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light", setTheme: jest.fn() }),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

// Cloudflare Turnstile ships ESM-only and isn't relevant to form validation —
// stub it out rather than teaching Jest to transform a third-party widget.
jest.mock("@/components/spam/turnstile-widget", () => ({
  TurnstileWidget: () => null,
}));

describe("ContactSection form", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("shows validation errors and does not submit when required fields are empty", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/enter your name/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/message should be at least/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits successfully once all fields are valid", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/^name$/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/^email$/i), "ada@example.com");
    await user.click(screen.getByRole("combobox", { name: /reason/i }));
    await user.click(await screen.findByRole("option", { name: /just saying hi/i }));
    await user.type(
      screen.getByLabelText(/^message$/i),
      "Just wanted to say your portfolio looks great!",
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({ method: "POST" }),
      );
    });
  });
});
