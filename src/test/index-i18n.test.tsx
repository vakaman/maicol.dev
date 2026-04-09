import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Index from "@/pages/Index";

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
        <LocationProbe />
      </LocaleProvider>
    </MemoryRouter>,
  );
}

function LocationProbe() {
  const location = useLocation();

  return <span data-testid="location-pathname">{location.pathname}</span>;
}

describe("index i18n", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      value: "pt-BR",
    });
  });

  it("renders in english by default", () => {
    renderIndex();

    expect(screen.getByText("Areas of Expertise")).toBeInTheDocument();
    expect(screen.getByText("My Journey")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
  });

  it("switches all section copy to portuguese", () => {
    renderIndex();

    fireEvent.click(screen.getByTestId("locale-pt-br"));

    expect(screen.getByText("Áreas de Atuação")).toBeInTheDocument();
    expect(screen.getByText("Minha Jornada")).toBeInTheDocument();
    expect(screen.getByText("Vamos Conectar")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(screen.getByTestId("location-pathname")).toHaveTextContent("/pt-br");
  });
});
