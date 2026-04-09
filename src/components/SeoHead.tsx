import { useEffect } from "react";
import type { PageMetadata } from "@/lib/seo";

interface SeoHeadProps {
  metadata: PageMetadata;
}

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function ensureLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

const SeoHead = ({ metadata }: SeoHeadProps) => {
  useEffect(() => {
    document.title = metadata.title;
    document.documentElement.lang = metadata.htmlLang;

    ensureMeta('meta[name="description"]', { content: metadata.description, name: "description" });
    ensureMeta('meta[name="robots"]', { content: "index,follow", name: "robots" });
    ensureMeta('meta[property="og:title"]', { content: metadata.title, property: "og:title" });
    ensureMeta('meta[property="og:description"]', { content: metadata.description, property: "og:description" });
    ensureMeta('meta[property="og:type"]', { content: metadata.ogType, property: "og:type" });
    ensureMeta('meta[property="og:url"]', { content: metadata.url, property: "og:url" });
    ensureMeta('meta[property="og:image"]', { content: metadata.ogImage, property: "og:image" });
    ensureMeta('meta[property="og:site_name"]', { content: "maicol.dev", property: "og:site_name" });
    ensureMeta('meta[property="og:locale"]', { content: metadata.htmlLang, property: "og:locale" });
    ensureMeta('meta[name="twitter:card"]', { content: "summary_large_image", name: "twitter:card" });
    ensureMeta('meta[name="twitter:title"]', { content: metadata.title, name: "twitter:title" });
    ensureMeta('meta[name="twitter:description"]', { content: metadata.description, name: "twitter:description" });
    ensureMeta('meta[name="twitter:image"]', { content: metadata.ogImage, name: "twitter:image" });
    ensureLink('link[rel="canonical"]', { href: metadata.canonical, rel: "canonical" });

    document.head.querySelectorAll('link[rel="alternate"][data-seo-managed="true"]').forEach((element) => {
      element.remove();
    });

    metadata.alternates.forEach((alternate) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.href = alternate.href;
      link.hreflang = alternate.hrefLang;
      link.dataset.seoManaged = "true";
      document.head.appendChild(link);
    });

    let jsonLdElement = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-seo-managed="true"]');
    if (!jsonLdElement) {
      jsonLdElement = document.createElement("script");
      jsonLdElement.type = "application/ld+json";
      jsonLdElement.dataset.seoManaged = "true";
      document.head.appendChild(jsonLdElement);
    }

    jsonLdElement.textContent = JSON.stringify(metadata.jsonLd);
  }, [metadata]);

  return null;
};

export default SeoHead;
