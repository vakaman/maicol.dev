import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MermaidDiagram from "@/components/MermaidDiagram";
import { LocaleProvider } from "@/contexts/LocaleContext";

const mermaidRenderMock = vi.fn();
const mermaidInitializeMock = vi.fn();

vi.mock("mermaid", () => ({
  default: {
    initialize: mermaidInitializeMock,
    render: mermaidRenderMock,
  },
}));

function renderDiagram() {
  return render(
    <MemoryRouter>
      <LocaleProvider>
        <MermaidDiagram
          chart={[
            "flowchart TD",
            "  A[Start] --> B[Zoom]",
          ].join("\n")}
        />
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe("mermaid diagram", () => {
  beforeEach(() => {
    window.localStorage.clear();
    mermaidInitializeMock.mockReset();
    mermaidRenderMock.mockReset();
    mermaidRenderMock.mockResolvedValue({
      svg: '<svg viewBox="0 0 400 200"><title>Diagram</title><text x="10" y="20">diagram ok</text></svg>',
    });
  });

  it("supports preview, code, zoom and fullscreen modes", async () => {
    renderDiagram();

    expect(await screen.findByRole("img", { name: "Mermaid diagram" })).toBeInTheDocument();
    expect(screen.getByText("1.00x")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByText("1.25x")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Code" }));
    expect(screen.getByText((content) => content.includes("flowchart TD") && content.includes("A[Start] --> B[Zoom]"))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Zoom in" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Preview" }));
    expect(await screen.findByRole("img", { name: "Mermaid diagram" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Fullscreen" }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Expanded Mermaid diagram view with preview and source code.")).toBeInTheDocument();
    expect(within(dialog).getByText("1.25x")).toBeInTheDocument();
  });

  it("clamps zoom between 0.25x and 2.00x", async () => {
    renderDiagram();

    await screen.findByRole("img", { name: "Mermaid diagram" });

    const zoomInButton = screen.getByRole("button", { name: "Zoom in" });
    const zoomOutButton = screen.getByRole("button", { name: "Zoom out" });

    for (let index = 0; index < 8; index += 1) {
      fireEvent.click(zoomOutButton);
    }

    expect(screen.getByText("0.25x")).toBeInTheDocument();
    expect(zoomOutButton).toBeDisabled();

    for (let index = 0; index < 8; index += 1) {
      fireEvent.click(zoomInButton);
    }

    expect(screen.getByText("2.00x")).toBeInTheDocument();
    expect(zoomInButton).toBeDisabled();
  });
});
