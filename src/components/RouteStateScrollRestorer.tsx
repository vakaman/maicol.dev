import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ReturnLocationState {
  restoreEntryId?: string;
  restoreScrollY?: number;
}

const RouteStateScrollRestorer = () => {
  const location = useLocation();
  const state = location.state as ReturnLocationState | null;

  useEffect(() => {
    if (!state?.restoreEntryId && typeof state?.restoreScrollY !== "number") {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (state?.restoreEntryId) {
        const target = document.getElementById(`journey-entry-${state.restoreEntryId}`);

        if (target) {
          target.scrollIntoView({
            block: "center",
            behavior: "auto",
          });

          return;
        }
      }

      if (typeof state?.restoreScrollY !== "number") {
        return;
      }

      window.scrollTo({
        top: state.restoreScrollY,
        behavior: "auto",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.key, state?.restoreEntryId, state?.restoreScrollY]);

  return null;
};

export default RouteStateScrollRestorer;
