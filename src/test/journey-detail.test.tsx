import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/contexts/LocaleContext";
import JourneyDetail from "@/pages/JourneyDetail";

const mermaidRenderMock = vi.fn();
const mermaidInitializeMock = vi.fn();

vi.mock("@/content/siteContent", async () => {
  const actual = await vi.importActual<typeof import("@/content/siteContent")>("@/content/siteContent");

  return {
    ...actual,
    getJourneyEntry: vi.fn(),
  };
});

vi.mock("@/lib/content", async () => {
  const actual = await vi.importActual<typeof import("@/lib/content")>("@/lib/content");

  return {
    ...actual,
    loadMarkdownContent: vi.fn(),
  };
});

vi.mock("@/lib/loading-indicator", () => ({
  hideJourneyNavigationLoader: vi.fn(),
}));

vi.mock("mermaid", () => ({
  default: {
    initialize: mermaidInitializeMock,
    render: mermaidRenderMock,
  },
}));

const { getJourneyEntry } = await import("@/content/siteContent");
const { loadMarkdownContent } = await import("@/lib/content");
const { hideJourneyNavigationLoader } = await import("@/lib/loading-indicator");

function renderJourneyDetail() {
  return render(
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <LocaleProvider>
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="/pt-br" element={<div>Página inicial</div>} />
          <Route path="/journey/:id" element={<JourneyDetail />} />
          <Route path="/pt-br/journey/:id" element={<JourneyDetail />} />
        </Routes>
      </LocaleProvider>
    </BrowserRouter>,
  );
}

describe("journey detail", () => {
  beforeEach(() => {
    vi.useRealTimers();
    window.localStorage.clear();
    window.history.replaceState(null, "", "/journey/masternet");

    mermaidInitializeMock.mockReset();
    mermaidRenderMock.mockReset();
    vi.mocked(hideJourneyNavigationLoader).mockReset();
    mermaidRenderMock.mockResolvedValue({
      svg: "<svg><title>Matrix Diagram</title><text>diagram ok</text></svg>",
    });

    vi.mocked(getJourneyEntry).mockReturnValue({
      id: "masternet",
      skills: ["PHP"],
      summary: "Resumo",
      title: "Masternet Telecom",
      type: "professional",
      typeLabel: "Profissional",
      year: "2012",
    });
    vi.mocked(loadMarkdownContent).mockResolvedValue([
      "# Titulo grande",
      "## Titulo menor",
      "### Menor ainda",
      "",
      "```mermaid",
      "flowchart TD",
      "  A[Inicio] --> B[Fim]",
      "```",
      "",
      "```php",
      "echo 'matrix';",
      "```",
      "",
      "![Arquitetura](https://example.com/matrix.png \"Fluxo principal\")",
      "",
      "---",
      "",
      "Texto final.",
    ].join("\n"));
  });

  it("scrolls to the top when the detail page opens", () => {
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: scrollTo,
      writable: true,
    });
    vi.mocked(getJourneyEntry).mockReturnValue({
      id: "masternet",
      skills: ["PHP"],
      summary: "Resumo",
      title: "Masternet Telecom",
      type: "professional",
      typeLabel: "Profissional",
      year: "2012",
    });

    renderJourneyDetail();

    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "auto",
    });
  });

  it("renders markdown headings, separators, code blocks and mermaid diagrams", async () => {
    renderJourneyDetail();

    expect(screen.getByRole("heading", { level: 1, name: "Masternet Telecom" })).toBeInTheDocument();
    expect(screen.getByTestId("locale-pt-br")).toBeInTheDocument();
    expect(screen.getByTestId("locale-us-en")).toBeInTheDocument();
    expect(await screen.findByRole("heading", { level: 2, name: "Titulo grande" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Titulo menor" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Menor ainda" })).toBeInTheDocument();
    const phpCodeBlock = document.querySelector("code[data-language='php']");
    expect(phpCodeBlock).toBeInTheDocument();
    expect(phpCodeBlock).toHaveTextContent("echo 'matrix';");
    expect(phpCodeBlock).toHaveClass("hljs", "language-php");
    expect(phpCodeBlock?.closest("pre")).toHaveClass("markdown-code-block");
    expect(screen.getByRole("img", { name: "Arquitetura" })).toHaveAttribute("src", "https://example.com/matrix.png");
    expect(screen.getByText("Fluxo principal")).toBeInTheDocument();
    expect(document.querySelector("hr")).toBeInTheDocument();
    expect(await screen.findByRole("img", { name: "Mermaid diagram" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Preview" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Code" }));
    expect(
      screen.getByText((content) => content.includes("flowchart TD") && content.includes("A[Inicio] --> B[Fim]")),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Preview" }));
    await waitFor(() => {
      expect(mermaidInitializeMock).toHaveBeenCalledWith(
        expect.objectContaining({
          securityLevel: "strict",
          startOnLoad: false,
          theme: "dark",
        }),
      );
      expect(mermaidRenderMock).toHaveBeenCalledWith(
        expect.stringMatching(/^mermaid-/),
        "flowchart TD\n  A[Inicio] --> B[Fim]",
      );
    });
    expect(hideJourneyNavigationLoader).toHaveBeenCalledTimes(1);
  });

  it("hides the strategic navigation loader after the markdown resolves", async () => {
    renderJourneyDetail();

    await screen.findByRole("heading", { level: 2, name: "Titulo grande" });

    expect(hideJourneyNavigationLoader).toHaveBeenCalledTimes(1);
  });

  it("hides the strategic navigation loader when loading fails", async () => {
    vi.mocked(loadMarkdownContent).mockRejectedValueOnce(new Error("load failed"));

    renderJourneyDetail();

    await waitFor(() => {
      expect(screen.getByText("404 - story not found")).toBeInTheDocument();
    });

    expect(hideJourneyNavigationLoader).toHaveBeenCalledTimes(1);
  });

  it("keeps language changes out of browser back history", async () => {
    window.history.pushState(null, "", "/");
    window.history.pushState(null, "", "/journey/masternet");

    renderJourneyDetail();

    await screen.findByRole("heading", { level: 2, name: "Titulo grande" });

    fireEvent.click(screen.getByTestId("locale-pt-br"));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/pt-br/journey/masternet");
    });

    act(() => {
      window.history.back();
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    await waitFor(() => {
      expect(screen.getByText("Home page")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/");
    });
  });
});
