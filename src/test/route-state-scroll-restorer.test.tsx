import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import RouteStateScrollRestorer from "@/components/RouteStateScrollRestorer";

describe("route state scroll restorer", () => {
  it("scrolls to a section when scrollToSection is present in navigation state", async () => {
    const scrollIntoView = vi.fn();
    const target = document.createElement("section");
    target.id = "journey";
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/",
            state: {
              scrollToSection: "journey",
            },
          },
        ]}
      >
        <RouteStateScrollRestorer />
      </MemoryRouter>,
    );

    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });

    document.body.removeChild(target);
  });
});
