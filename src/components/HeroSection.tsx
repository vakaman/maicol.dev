import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";

const HeroSection = () => {
  const { content } = useLocale();
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const fullText = content.hero.role;

  function handleScrollToExperiences() {
    const target = document.getElementById("experiences");

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    navigate("/", {
      state: {
        scrollToSection: "experiences",
      },
    });
  }

  useEffect(() => {
    setDisplayText("");
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
      <div className="relative z-10 max-w-4xl text-center">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground sm:text-sm">
          <span className="text-primary">$</span> {content.hero.command}
        </div>
        <h1 className="mb-6 text-2xl font-heading font-bold leading-tight text-foreground sm:text-4xl md:text-6xl">
          {content.hero.heading}
        </h1>
        <p className="mb-8 min-h-[3.5rem] px-2 font-mono text-base leading-relaxed text-muted-foreground sm:min-h-[2.5em] sm:px-0 sm:text-xl md:text-2xl">
          {displayText}
          <span className="animate-terminal-blink text-primary">_</span>
        </p>
        <div className="flex flex-wrap justify-center gap-2 font-mono text-xs sm:gap-3 sm:text-sm">
          {content.hero.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-sm border border-primary/30 bg-primary/5 px-2.5 py-1 text-primary/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_18px_hsl(120,100%,40%,0.18)] sm:px-3"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-10 sm:mt-12">
          <button
            type="button"
            onClick={handleScrollToExperiences}
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <span>{content.hero.cta}</span>
            <span className="animate-bounce">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
