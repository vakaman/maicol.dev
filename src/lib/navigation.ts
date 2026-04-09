import type { NavigateFunction } from "react-router-dom";

export interface BackNavigationState {
  returnTo?: {
    entryId?: string;
    pathname: string;
    scrollY: number;
  };
}

export function navigateToPreviousContext(
  navigate: NavigateFunction,
  state?: BackNavigationState | null,
  fallbackPath = "/",
) {
  if (state?.returnTo) {
    navigate(state.returnTo.pathname, {
      state: {
        restoreEntryId: state.returnTo.entryId,
        restoreScrollY: state.returnTo.scrollY,
      },
    });

    return;
  }

  if (window.history.state?.idx > 0) {
    navigate(-1);
    return;
  }

  navigate(fallbackPath);
}
