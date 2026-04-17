import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);

requestAnimationFrame(() => {
  document.documentElement.dataset.appReady = "true";
  window.__markBootAppReady?.();
});
