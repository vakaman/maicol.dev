import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/contexts/LocaleContext";
import TimelineSection from "@/components/TimelineSection";

type ObservedElement = Element & {
  dataset: DOMStringMap;
};

class MockIntersectionObserver {
  static instance: MockIntersectionObserver | null = null;

  private readonly callback: IntersectionObserverCallback;
  private readonly observed = new Set<Element>();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instance = this;
  }

  observe = (element: Element) => {
    this.observed.add(element);
  };

  unobserve = (element: Element) => {
    this.observed.delete(element);
  };

  disconnect = () => {
    this.observed.clear();
  };

  reveal(id: string) {
    const target = [...this.observed].find(
      (element) => (element as ObservedElement).dataset.entryId === id,
    );

    if (!target) {
      throw new Error(`Entry ${id} is not being observed`);
    }

    this.callback(
      [
        {
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: target.getBoundingClientRect(),
          isIntersecting: true,
          rootBounds: null,
          target,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}

function renderTimeline() {
  return render(
    <MemoryRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <LocaleProvider>
        <TimelineSection />
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe("timeline section", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      value: "pt-BR",
    });

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  it("reveals journey entries when they intersect the viewport", async () => {
    renderTimeline();

    const firstEntry = screen.getByText("Masternet Telecom").closest("[data-entry-id]");
    const secondEntry = screen.getByText("Dump Tecnologia").closest("[data-entry-id]");

    expect(firstEntry).toHaveAttribute("data-visible", "false");
    expect(secondEntry).toHaveAttribute("data-visible", "false");

    act(() => {
      MockIntersectionObserver.instance?.reveal("masternet-inicio");
    });

    await waitFor(() => {
      expect(firstEntry).toHaveAttribute("data-visible", "true");
    });

    expect(secondEntry).toHaveAttribute("data-visible", "false");

    act(() => {
      MockIntersectionObserver.instance?.reveal("dump-devops");
    });

    await waitFor(() => {
      expect(secondEntry).toHaveAttribute("data-visible", "true");
    });
  });
});
