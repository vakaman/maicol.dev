import { useLocale } from "@/contexts/LocaleContext";

const ContactSection = () => {
  const { content } = useLocale();

  return (
    <section id="contact" className="relative z-10 scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <span className="font-mono text-sm text-primary tracking-wider">
            {content.contact.eyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-heading font-bold text-foreground sm:text-3xl md:text-4xl">
            {content.contact.title}
          </h2>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
            {content.contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.contact.items.map((contact) => (
            <a
              key={contact.slug}
              href={contact.href}
              download={contact.download ? true : undefined}
              target={contact.download ? undefined : "_blank"}
              rel={contact.download ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(120,100%,40%,0.06)]"
            >
              <contact.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-heading font-medium text-foreground">
                  {contact.label}
                </div>
                <div className="break-all text-xs font-mono text-muted-foreground sm:truncate">
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
