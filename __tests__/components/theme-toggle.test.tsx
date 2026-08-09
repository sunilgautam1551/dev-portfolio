import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeToggle } from "@/components/layout/theme-toggle";

const setTheme = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light", setTheme }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    setTheme.mockClear();
  });

  it("renders a labeled toggle button", async () => {
    render(<ThemeToggle />);
    const button = await screen.findByRole("button", { name: /switch to dark theme/i });
    expect(button).toBeInTheDocument();
  });

  it("switches to dark theme when clicked from light", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = await screen.findByRole("button", { name: /switch to dark theme/i });
    await user.click(button);
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
