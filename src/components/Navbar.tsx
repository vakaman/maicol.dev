import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/locale-routing";

const Navbar = () => {
  const { content, locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = stripLocalePrefix(location.pathname) === "/";

  function scrollToSection(sectionId: string) {
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleNavLinkClick(href: string) {
    if (!href.startsWith("#")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    const sectionId = href.slice(1);
    setOpen(false);

    if (isHomePage) {
      scrollToSection(sectionId);
      return;
    }

    navigate(getLocalizedPath(locale, "/"), {
      state: {
        scrollToSection: sectionId,
      },
    });
  }

  function handleBrandClick() {
    setOpen(false);

    if (isHomePage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    navigate(getLocalizedPath(locale, "/"));
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBrandClick}
          className="font-heading font-bold text-foreground text-sm tracking-wider"
        >
          <span className="text-primary">{">"}</span> {content.navbar.brand}
        </button>
        <div className="hidden md:flex items-center gap-8">
          {content.navbar.links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavLinkClick(link.href)}
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider"
            >
              {link.label}
            </button>
          ))}
          <div
            className="flex items-center gap-1 rounded-sm border border-border bg-card/70 p-1"
            aria-label={content.navbar.localeLabel}
          >
            <button
              type="button"
              data-testid="locale-pt-br"
              onClick={() => setLocale("pt-br")}
              className={`px-2 py-1 font-mono text-[11px] transition-colors ${
                locale === "pt-br" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              PT-BR
            </button>
            <button
              type="button"
              data-testid="locale-us-en"
              onClick={() => setLocale("us-en")}
              className={`px-2 py-1 font-mono text-[11px] transition-colors ${
                locale === "us-en" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              US-EN
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden text-muted-foreground hover:text-primary transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 space-y-3">
          {content.navbar.links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavLinkClick(link.href)}
              className="block font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <span className="font-mono text-xs text-muted-foreground">{content.navbar.localeLabel}</span>
            <button
              type="button"
              data-testid="mobile-locale-pt-br"
              onClick={() => {
                setLocale("pt-br");
                setOpen(false);
              }}
              className={`px-2 py-1 font-mono text-xs border rounded-sm ${
                locale === "pt-br" ? "border-primary/50 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              PT-BR
            </button>
            <button
              type="button"
              data-testid="mobile-locale-us-en"
              onClick={() => {
                setLocale("us-en");
                setOpen(false);
              }}
              className={`px-2 py-1 font-mono text-xs border rounded-sm ${
                locale === "us-en" ? "border-primary/50 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              US-EN
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
