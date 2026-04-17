/// <reference types="vite/client" />

interface Window {
  __markBootAppReady?: () => void;
  __markBootStylesReady?: () => void;
}
