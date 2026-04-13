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

vi.mock("mermaid", () => ({
  default: {
    initialize: mermaidInitializeMock,
    render: mermaidRenderMock,
  },
}));

const { getJourneyEntry } = await import("@/content/siteContent");

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
    window.localStorage.clear();
    window.history.replaceState(null, "", "/journey/masternet-inicio");

    mermaidInitializeMock.mockReset();
    mermaidRenderMock.mockReset();
    mermaidRenderMock.mockResolvedValue({
      svg: "<svg><title>Matrix Diagram</title><text>diagram ok</text></svg>",
    });

    vi.mocked(getJourneyEntry).mockReturnValue({
      detail: [
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
      ].join("\n"),
      id: "masternet-inicio",
      skills: ["PHP"],
      summary: "Resumo",
      title: "Masternet Telecom",
      type: "professional",
      typeLabel: "Profissional",
      year: "2012",
    });
  });

  it("renders markdown headings, separators, code blocks and mermaid diagrams", async () => {
    renderJourneyDetail();

    expect(screen.getByRole("heading", { level: 1, name: "Masternet Telecom" })).toBeInTheDocument();
    expect(screen.getByTestId("locale-pt-br")).toBeInTheDocument();
    expect(screen.getByTestId("locale-us-en")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Titulo grande" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Titulo menor" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Menor ainda" })).toBeInTheDocument();
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
    expect(screen.getByText((content) => content.includes("flowchart TD") && content.includes("A[Inicio] --> B[Fim]"))).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Preview" }));
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

  it("keeps language changes out of browser back history", async () => {
    window.history.pushState(null, "", "/");
    window.history.pushState(null, "", "/journey/masternet-inicio");

    renderJourneyDetail();

    fireEvent.click(screen.getByTestId("locale-pt-br"));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/pt-br/journey/masternet-inicio");
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
