import { useLocale } from "@/contexts/LocaleContext";

const ExperienceSection = () => {
  const { content } = useLocale();

  return (
    <section id="experiences" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-sm text-primary tracking-wider">
            {content.experiences.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-foreground">
            {content.experiences.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.experiences.items.map((exp, index) => (
            <div
              key={exp.slug}
              className="group relative overflow-hidden p-6 bg-card border border-border rounded-lg transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-[0_0_30px_hsl(120,100%,40%,0.12)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <exp.icon className="w-8 h-8 text-primary/60 group-hover:text-primary group-hover:drop-shadow-[0_0_10px_hsl(120,100%,40%)] transition-all duration-500 mb-4" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {exp.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed transition-colors duration-500 group-hover:text-foreground/90">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 bg-secondary text-secondary-foreground rounded-sm transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
