import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSiteContent, type SiteContent } from "@/content/siteContent";
import { DEFAULT_LOCALE, getHtmlLang, getLocalizedPath, resolveLocaleFromPathname } from "@/lib/locale-routing";

export type Locale = "pt-br" | "us-en";

interface LocaleContextValue {
  content: SiteContent;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const STORAGE_KEY = "maicol.dev.locale";

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

function getBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY);
  if (storedLocale === "pt-br" || storedLocale === "us-en") {
    return storedLocale;
  }

  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const [locale, setLocaleState] = useState<Locale>(() => getBrowserLocale());

  useEffect(() => {
    const pathnameLocale = resolveLocaleFromPathname(location.pathname);
    setLocaleState(pathnameLocale);
  }, [location.pathname]);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);

    const nextPath = getLocalizedPath(nextLocale, location.pathname);
    navigate(
      {
        hash: location.hash,
        pathname: nextPath,
        search: location.search,
      },
      { replace: true },
    );
  }

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = getHtmlLang(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{
        content: getSiteContent(locale),
        locale,
        setLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
