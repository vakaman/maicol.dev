import { type MouseEvent } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { getJourneyEntry } from "@/content/siteContent";
import { navigateToPreviousContext, type BackNavigationState } from "@/lib/navigation";

const HistoriaDetail = () => {
  const { content, locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const entry = id ? getJourneyEntry(locale, id) : undefined;
  const navigationState = location.state as BackNavigationState | null;

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    navigateToPreviousContext(navigate, navigationState);
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-muted-foreground mb-4">{content.journey.notFound}</p>
          <Link to="/" onClick={handleBack} className="text-primary font-mono text-sm hover:underline">
            {content.common.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          {content.common.back}
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <span className="font-mono text-sm text-primary">{entry.year}</span>
          <span
            className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
              entry.type === "professional"
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {entry.typeLabel}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-8">
          {entry.title}
        </h1>

        <div className="prose prose-invert max-w-none">
          {entry.detail.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
            {content.journey.skillsHeading}
          </span>
          <div className="flex flex-wrap gap-2 mt-3">
            {entry.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm font-mono border border-primary/30 text-primary/80 rounded-sm bg-primary/5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriaDetail;
