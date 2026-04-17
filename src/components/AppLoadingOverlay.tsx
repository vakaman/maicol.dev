import { useEffect, useState } from "react";
import FloatingLoader from "@/components/FloatingLoader";
import { getAppLoadingEventName, type AppLoadingEventDetail } from "@/lib/loading-indicator";

type VisibleIndicator = {
  id: string;
  label: string;
};

const AppLoadingOverlay = () => {
  const [indicator, setIndicator] = useState<VisibleIndicator | null>(null);

  useEffect(() => {
    const timers = new Map<string, number>();

    function clearIndicatorTimer(id: string) {
      const timer = timers.get(id);
      if (timer == null) {
        return;
      }

      window.clearTimeout(timer);
      timers.delete(id);
    }

    function handleLoadingEvent(event: Event) {
      const detail = (event as CustomEvent<AppLoadingEventDetail>).detail;

      if (!detail) {
        return;
      }

      if (detail.action === "hide") {
        clearIndicatorTimer(detail.id);
        setIndicator((current) => (current?.id === detail.id ? null : current));
        return;
      }

      clearIndicatorTimer(detail.id);

      const delayMs = detail.delayMs ?? 0;
      if (delayMs <= 0) {
        setIndicator({
          id: detail.id,
          label: detail.label,
        });
        return;
      }

      const timer = window.setTimeout(() => {
        setIndicator({
          id: detail.id,
          label: detail.label,
        });
        timers.delete(detail.id);
      }, delayMs);

      timers.set(detail.id, timer);
    }

    window.addEventListener(getAppLoadingEventName(), handleLoadingEvent as EventListener);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      window.removeEventListener(getAppLoadingEventName(), handleLoadingEvent as EventListener);
    };
  }, []);

  if (!indicator) {
    return null;
  }

  return <FloatingLoader label={indicator.label} testId="app-floating-loader" />;
};

export default AppLoadingOverlay;
