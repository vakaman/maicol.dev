export const JOURNEY_NAVIGATION_LOADING_ID = "journey-navigation";
const APP_LOADING_EVENT_NAME = "app-loading-indicator";

export type AppLoadingEventDetail =
  | {
      action: "show";
      delayMs?: number;
      id: string;
      label: string;
    }
  | {
      action: "hide";
      id: string;
    };

export function dispatchAppLoadingIndicator(detail: AppLoadingEventDetail) {
  window.dispatchEvent(new CustomEvent<AppLoadingEventDetail>(APP_LOADING_EVENT_NAME, { detail }));
}

export function showJourneyNavigationLoader() {
  dispatchAppLoadingIndicator({
    action: "show",
    delayMs: 140,
    id: JOURNEY_NAVIGATION_LOADING_ID,
    label: "loading journey detail",
  });
}

export function hideJourneyNavigationLoader() {
  dispatchAppLoadingIndicator({
    action: "hide",
    id: JOURNEY_NAVIGATION_LOADING_ID,
  });
}

export function getAppLoadingEventName() {
  return APP_LOADING_EVENT_NAME;
}
