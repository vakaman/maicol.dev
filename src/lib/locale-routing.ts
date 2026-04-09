import type { Locale } from "@/contexts/LocaleContext";

export const DEFAULT_LOCALE: Locale = "us-en";
export const PT_BR_LOCALE: Locale = "pt-br";

function normalizePathname(pathname: string): string {
  if (!pathname) {
    return "/";
  }

  const normalized = pathname.replace(/\/{2,}/g, "/");
  return normalized.endsWith("/") && normalized !== "/" ? normalized.slice(0, -1) : normalized;
}

export function resolveLocaleFromPathname(pathname: string): Locale {
  return normalizePathname(pathname).startsWith("/pt-br") ? PT_BR_LOCALE : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = normalizePathname(pathname);

  if (normalized === "/pt-br") {
    return "/";
  }

  if (normalized.startsWith("/pt-br/")) {
    return normalized.slice("/pt-br".length) || "/";
  }

  return normalized;
}

export function getLocalizedPath(locale: Locale, pathname: string): string {
  const pathWithoutLocale = stripLocalePrefix(pathname);

  if (locale === PT_BR_LOCALE) {
    return pathWithoutLocale === "/" ? "/pt-br" : `/pt-br${pathWithoutLocale}`;
  }

  return pathWithoutLocale;
}

export function getHtmlLang(locale: Locale): string {
  return locale === PT_BR_LOCALE ? "pt-BR" : "en";
}
