import { useLocale } from "@/contexts/LocaleContext";

const ContactSection = () => {
  const { content } = useLocale();

  return (
    <section id="contact" className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-sm text-primary tracking-wider">
            {content.contact.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-foreground">
            {content.contact.title}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg">
            {content.contact.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.contact.items.map((contact) => (
            <a
              key={contact.slug}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_hsl(120,100%,40%,0.06)]"
            >
              <contact.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-heading font-medium text-foreground">
                  {contact.label}
                </div>
                <div className="text-xs font-mono text-muted-foreground truncate">
                  {contact.username}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
