import { useLocale } from "@/contexts/LocaleContext";

const Footer = () => (
  <FooterContent />
);

const FooterContent = () => {
  const { content } = useLocale();

  return (
    <footer className="relative z-10 border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
        <span>© {new Date().getFullYear()} - {content.footer.rights}</span>
        <span className="text-primary/40">{content.footer.builtWith}</span>
      </div>
    </footer>
  );
};

export default Footer;
