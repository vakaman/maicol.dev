import { useEffect, useRef, useState } from "react";
import { type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { getLocalizedPath } from "@/lib/locale-routing";

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  summary: string;
  type: "professional" | "personal";
  typeLabel: string;
}

const TimelineSection = () => {
  const { content, locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const entryRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visibleEntries, setVisibleEntries] = useState<Record<string, boolean>>({});

  function handleReadMore(event: MouseEvent<HTMLAnchorElement>, entryId: string) {
    event.preventDefault();
    navigate(getLocalizedPath(locale, `/journey/${entryId}`), {
      state: {
        returnTo: {
          entryId,
                    pathname: `${location.pathname}${location.search}${location.hash}`,
                    scrollY: window.scrollY,
                  },
                },
    });
  }

  useEffect(() => {
    setVisibleEntries({});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const id = entry.target.getAttribute("data-entry-id");
          if (!id) {
            return;
          }

          setVisibleEntries((current) => {
            if (current[id]) {
              return current;
            }

            return {
              ...current,
              [id]: true,
            };
          });

          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.35,
      },
    );

    entryRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [content.journey.entries]);

  return (
    <section id="journey" className="relative z-10 py-24 px-6 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-sm text-primary tracking-wider">
            {content.journey.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-foreground">
            {content.journey.title}
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
            {content.journey.description}
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

          {content.journey.entries.map((entry, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = Boolean(visibleEntries[entry.id]);

            return (
              <div
                key={entry.id}
                id={`journey-entry-${entry.id}`}
                ref={(element) => {
                  entryRefs.current[index] = element;
                }}
                data-entry-id={entry.id}
                data-visible={isVisible ? "true" : "false"}
                className={`relative flex items-start mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                {/* Dot */}
                <div className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_hsl(120,100%,40%,0.6)] -translate-x-1/2 mt-6 z-10 transition-all duration-700 ${isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <span className="font-mono text-xs text-primary tracking-wider">
                    {entry.year}
                  </span>
                  <span
                    className={`ml-2 text-xs font-mono px-2 py-0.5 rounded-sm ${
                      entry.type === "professional"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {entry.typeLabel}
                  </span>
                  <h3 className="text-lg font-heading font-semibold text-foreground mt-2">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {entry.summary}
                  </p>
                  <Link
                    to={getLocalizedPath(locale, `/journey/${entry.id}`)}
                    onClick={(event) => handleReadMore(event, entry.id)}
                    className="inline-flex items-center gap-1 mt-3 text-sm font-mono text-primary/70 hover:text-primary transition-colors group"
                  >
                    {content.journey.readMore}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
