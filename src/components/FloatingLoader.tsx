type FloatingLoaderProps = {
  label: string;
  testId?: string;
};

const FloatingLoader = ({ label, testId }: FloatingLoaderProps) => (
  <div
    aria-live="polite"
    aria-label={label}
    className="pointer-events-none fixed right-4 top-20 z-50 sm:right-6 sm:top-24"
    data-testid={testId}
    role="status"
  >
    <div className="overflow-hidden rounded-md border border-primary/25 bg-black/75 px-3 py-2 shadow-[0_0_24px_rgba(0,255,102,0.12)] backdrop-blur-sm">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-primary/85">
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
        {label}
      </div>
      <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-primary/10" aria-hidden="true">
        <div className="h-full w-1/2 animate-[loading-progress_1.2s_ease-in-out_infinite] rounded-full bg-primary/80" />
      </div>
    </div>
  </div>
);

export default FloatingLoader;
