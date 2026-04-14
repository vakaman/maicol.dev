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
      <div className="max-w-6xl mx-auto flex min-h-14 items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={handleBrandClick}
          className="shrink-0 text-left font-heading text-xs font-bold tracking-[0.24em] text-foreground sm:text-sm"
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
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden rounded-sm border border-border/80 bg-card/70 p-2 text-muted-foreground transition-colors hover:text-primary"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b border-border bg-background/95 px-4 py-4 backdrop-blur-md sm:px-6"
        >
          <div className="space-y-2">
          {content.navbar.links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavLinkClick(link.href)}
              className="block w-full rounded-sm border border-border/60 bg-card/50 px-3 py-3 text-left font-mono text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              {link.label}
            </button>
          ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            <span className="w-full font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {content.navbar.localeLabel}
            </span>
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
