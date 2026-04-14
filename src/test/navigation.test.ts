import { describe, expect, it, vi, beforeEach } from "vitest";
import { navigateToPreviousContext } from "@/lib/navigation";

describe("navigateToPreviousContext", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("restores the previous route and scroll position when state is available", () => {
    const navigate = vi.fn();

    navigateToPreviousContext(navigate, {
      returnTo: {
        entryId: "masternet",
        pathname: "/",
        scrollY: 640,
      },
    });

    expect(navigate).toHaveBeenCalledWith("/", {
      state: {
        restoreEntryId: "masternet",
        restoreScrollY: 640,
      },
    });
  });

  it("falls back to home when there is no previous in-app context", () => {
    const navigate = vi.fn();

    navigateToPreviousContext(navigate, null);

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
