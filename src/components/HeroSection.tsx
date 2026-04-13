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
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="relative z-10 text-center max-w-4xl">
        <div className="mb-4 font-mono text-sm text-muted-foreground tracking-widest uppercase">
          <span className="text-primary">$</span> {content.hero.command}
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-foreground">
          {content.hero.heading}
        </h1>
        <p className="text-xl md:text-2xl font-mono text-muted-foreground mb-8 min-h-[2em]">
          {displayText}
          <span className="animate-terminal-blink text-primary">_</span>
        </p>
        <div className="flex flex-wrap gap-3 justify-center font-mono text-sm">
          {content.hero.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 border border-primary/30 text-primary/80 rounded-sm bg-primary/5 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/10 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_18px_hsl(120,100%,40%,0.18)]"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-12">
          <button
            type="button"
            onClick={handleScrollToExperiences}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
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
