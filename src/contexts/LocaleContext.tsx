import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { getSiteContent, type SiteContent } from "@/content/siteContent";

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
    return "pt-br";
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY);
  if (storedLocale === "pt-br" || storedLocale === "us-en") {
    return storedLocale;
  }

  return window.navigator.language.toLowerCase().startsWith("pt") ? "pt-br" : "us-en";
}

function getDocumentLang(locale: Locale): string {
  return locale === "pt-br" ? "pt-BR" : "en-US";
}

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(() => getBrowserLocale());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = getDocumentLang(locale);
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
