import { describe, expect, it } from "vitest";
import { getSiteContent } from "@/content/siteContent";

describe("site content", () => {
  it("loads portuguese content from typed locale dictionaries", () => {
    const content = getSiteContent("pt-br");

    expect(content.navbar.links[0]?.label).toBe("experiências");
    expect(content.navbar.links[3]).toMatchObject({
      external: true,
      href: "https://blog.maicol.dev",
      label: "blog",
    });
    expect(content.experiences.title).toBe("Áreas de Atuação");
    expect(content.hero.name).toBe("");
    expect(content.hero.skills).toContain("Corrotinas");
    expect(content.experiences.items).toHaveLength(9);
    expect(content.journey.entries[0]?.title).toBe("Masternet Telecom");
    expect(content.contact.items.some((item) => item.slug === "website")).toBe(false);
    expect(content.contact.items.some((item) => item.slug === "github")).toBe(true);
  });

  it("loads english content from typed locale dictionaries", () => {
    const content = getSiteContent("us-en");

    expect(content.navbar.links[1]?.label).toBe("journey");
    expect(content.navbar.links[3]).toMatchObject({
      external: true,
      href: "https://blog.maicol.dev",
      label: "blog",
    });
    expect(content.experiences.title).toBe("Areas of Expertise");
    expect(content.hero.name).toBe("");
    expect(content.hero.skills).toContain("Coroutines");
    expect(content.experiences.items).toHaveLength(9);
    expect(content.journey.entries[0]?.title).toBe("Masternet Telecom");
    expect(content.contact.items.some((item) => item.slug === "website")).toBe(false);
    expect(content.contact.items.some((item) => item.slug === "blog")).toBe(true);
  });
});
