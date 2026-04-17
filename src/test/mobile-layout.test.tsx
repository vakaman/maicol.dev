import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import Index from "@/pages/Index";
import { LocaleProvider } from "@/contexts/LocaleContext";

function renderIndex() {
  return render(
    <MemoryRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <LocaleProvider>
        <Index />
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe("mobile layout", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      value: "pt-BR",
    });
  });

  it("uses mobile-first spacing and typography on the landing sections", () => {
    renderIndex();

    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("text-2xl", "sm:text-4xl", "md:text-6xl");
    expect(document.getElementById("experiences")).toHaveClass("px-4", "py-20", "sm:px-6");
    expect(document.getElementById("journey")).toHaveClass("px-4", "py-20", "sm:px-6");
    expect(document.getElementById("contact")).toHaveClass("px-4", "py-20", "sm:px-6");
    expect(screen.getByText("Email").closest("div.grid")).toHaveClass("grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3");
  });

  it("opens and closes the mobile navigation menu during section navigation", () => {
    renderIndex();

    const menuButton = screen.getByRole("button", { name: /open navigation menu/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);

    const mobileNavigation = document.getElementById("mobile-navigation");

    expect(mobileNavigation).toBeInTheDocument();
    expect(within(mobileNavigation!).getByRole("button", { name: "experiences" })).toBeInTheDocument();
    expect(within(mobileNavigation!).getByTestId("mobile-locale-pt-br")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close navigation menu/i })).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(within(mobileNavigation!).getByRole("button", { name: "experiences" }));

    expect(screen.queryByTestId("mobile-locale-pt-br")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open navigation menu/i })).toHaveAttribute("aria-expanded", "false");
  });
});
