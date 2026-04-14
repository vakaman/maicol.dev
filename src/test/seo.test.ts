import { describe, expect, it } from "vitest";
import { getLocalizedPath, resolveLocaleFromPathname, stripLocalePrefix } from "@/lib/locale-routing";
import { getHomeMetadata, getJourneyMetadata } from "@/lib/seo";

describe("locale routing", () => {
  it("resolves locale-prefixed and default routes", () => {
    expect(resolveLocaleFromPathname("/")).toBe("us-en");
    expect(resolveLocaleFromPathname("/journey/masternet")).toBe("us-en");
    expect(resolveLocaleFromPathname("/pt-br")).toBe("pt-br");
    expect(resolveLocaleFromPathname("/pt-br/journey/masternet")).toBe("pt-br");
  });

  it("builds locale-aware URLs without duplicating prefixes", () => {
    expect(getLocalizedPath("us-en", "/")).toBe("/");
    expect(getLocalizedPath("pt-br", "/")).toBe("/pt-br");
    expect(getLocalizedPath("pt-br", "/journey/masternet")).toBe("/pt-br/journey/masternet");
    expect(getLocalizedPath("us-en", "/pt-br/journey/masternet")).toBe("/journey/masternet");
    expect(stripLocalePrefix("/pt-br/journey/masternet")).toBe("/journey/masternet");
  });
});

describe("seo metadata", () => {
  it("builds localized metadata for the home page", () => {
    const metadata = getHomeMetadata("pt-br");

    expect(metadata.title).toBe("Backend, Infraestrutura e Sistemas Distribuídos");
    expect(metadata.canonical).toBe("https://maicol.dev/pt-br");
    expect(metadata.description).toContain("testes de unidade");
    expect(metadata.alternates).toEqual(
      expect.arrayContaining([
        { href: "https://maicol.dev", hrefLang: "en" },
        { href: "https://maicol.dev/pt-br", hrefLang: "pt-BR" },
      ]),
    );
  });

  it("builds article metadata for journey detail pages", () => {
    const metadata = getJourneyMetadata("us-en", "masternet");

    expect(metadata).not.toBeNull();
    expect(metadata?.title).toBe("Masternet Telecom | maicol.dev");
    expect(metadata?.canonical).toBe("https://maicol.dev/journey/masternet");
    expect(metadata?.ogType).toBe("article");
    expect(metadata?.description).toContain("Career starting point");
    expect(metadata?.jsonLd[1]).toEqual(
      expect.objectContaining({
        "@type": "Article",
        headline: "Masternet Telecom",
      }),
    );
  });
});
