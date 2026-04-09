import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Index from "@/pages/Index";

function renderIndex() {
  return render(
    <LocaleProvider>
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Index />
      </MemoryRouter>
    </LocaleProvider>,
  );
}

describe("index i18n", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      value: "pt-BR",
    });
  });

  it("renders in portuguese by default for pt-BR browsers", () => {
    renderIndex();

    expect(screen.getByText("Áreas de Atuação")).toBeInTheDocument();
    expect(screen.getByText("Minha Jornada")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("switches all section copy to english", () => {
    renderIndex();

    fireEvent.click(screen.getByTestId("locale-us-en"));

    expect(screen.getByText("Areas of Expertise")).toBeInTheDocument();
    expect(screen.getByText("My Journey")).toBeInTheDocument();
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en-US");
  });
});
