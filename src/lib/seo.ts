import type { Locale } from "@/contexts/LocaleContext";
import { getJourneyEntry } from "@/content/siteContent";
import { getLocalizedPath, getHtmlLang } from "@/lib/locale-routing";
import { siteUrl } from "../../site.config";

const SITE_NAME = "maicol.dev";
const DEFAULT_OG_IMAGE = `${siteUrl}/favicon.ico`;
const PERSON_NAME = "Maicol K. Oliveira";
const PERSON_SAME_AS = [
  "https://github.com/vakaman",
  "https://www.linkedin.com/in/maicolkaiseroliveira",
  "https://blog.maicol.dev",
];

export interface AlternateLink {
  href: string;
  hrefLang: string;
}

export interface PageMetadata {
  alternates: AlternateLink[];
  canonical: string;
  description: string;
  htmlLang: string;
  jsonLd: Array<Record<string, unknown>>;
  ogImage: string;
  ogType: "article" | "website";
  title: string;
  url: string;
}

function joinUrl(pathname: string): string {
  return `${siteUrl}${pathname === "/" ? "" : pathname}`;
}

function getHomeDescription(locale: Locale): string {
  return locale === "pt-br"
    ? "Portfólio de Maicol K. Oliveira com experiência em backend, infraestrutura, redes, AWS, testes de unidade, automação e sistemas distribuídos para plataformas escaláveis."
    : "Portfolio of Maicol K. Oliveira covering backend engineering, infrastructure, networking, AWS, unit testing, automation, and distributed systems for scalable platforms.";
}

function getHomeTitle(locale: Locale): string {
  return locale === "pt-br"
    ? "Backend, Infraestrutura e Sistemas Distribuídos"
    : "Backend Infrastructure and Distributed Systems";
}

function getAlternateLinks(pathname: string): AlternateLink[] {
  return [
    {
      href: joinUrl(getLocalizedPath("us-en", pathname)),
      hrefLang: "en",
    },
    {
      href: joinUrl(getLocalizedPath("pt-br", pathname)),
      hrefLang: "pt-BR",
    },
    {
      href: joinUrl(getLocalizedPath("us-en", pathname)),
      hrefLang: "x-default",
    },
  ];
}

function getHomeJsonLd(locale: Locale, canonical: string, description: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      description,
      inLanguage: getHtmlLang(locale),
      name: SITE_NAME,
      url: canonical,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      jobTitle: locale === "pt-br" ? "Desenvolvedor Backend e Engenheiro de Infraestrutura" : "Backend Developer and Infrastructure Engineer",
      name: PERSON_NAME,
      sameAs: PERSON_SAME_AS,
      url: siteUrl,
    },
  ];
}

function getJourneyJsonLd(locale: Locale, canonical: string, title: string, description: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          item: joinUrl(getLocalizedPath(locale, "/")),
          name: SITE_NAME,
          position: 1,
        },
        {
          "@type": "ListItem",
          item: canonical,
          name: title,
          position: 2,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      author: {
        "@type": "Person",
        name: PERSON_NAME,
        url: siteUrl,
      },
      description,
      headline: title,
      inLanguage: getHtmlLang(locale),
      isPartOf: siteUrl,
      mainEntityOfPage: canonical,
      publisher: {
        "@type": "Person",
        name: PERSON_NAME,
        url: siteUrl,
      },
    },
  ];
}

export function getHomeMetadata(locale: Locale): PageMetadata {
  const pathname = getLocalizedPath(locale, "/");
  const canonical = joinUrl(pathname);
  const description = getHomeDescription(locale);

  return {
    alternates: getAlternateLinks("/"),
    canonical,
    description,
    htmlLang: getHtmlLang(locale),
    jsonLd: getHomeJsonLd(locale, canonical, description),
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    title: getHomeTitle(locale),
    url: canonical,
  };
}

export function getJourneyMetadata(locale: Locale, journeyId: string): PageMetadata | null {
  const entry = getJourneyEntry(locale, journeyId);

  if (!entry) {
    return null;
  }

  const pathname = getLocalizedPath(locale, `/journey/${journeyId}`);
  const canonical = joinUrl(pathname);
  const title = `${entry.title} | ${SITE_NAME}`;
  const description = entry.summary;

  return {
    alternates: getAlternateLinks(`/journey/${journeyId}`),
    canonical,
    description,
    htmlLang: getHtmlLang(locale),
    jsonLd: getJourneyJsonLd(locale, canonical, entry.title, description),
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    title,
    url: canonical,
  };
}
