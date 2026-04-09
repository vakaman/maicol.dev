import { BookText, Cloud, Github, Globe, Instagram, Linkedin, Mail, Network, Server, Shield, Terminal, Trophy, Twitter, Workflow, type LucideIcon } from "lucide-react";
import { getMarkdownParagraphs } from "@/lib/content";
import type { Locale } from "@/contexts/LocaleContext";
import { messages } from "@/i18n/messages";
import type { JourneyType } from "@/i18n/locales/types";

export interface NavLinkContent {
  external?: boolean;
  href: string;
  label: string;
}

export interface ExperienceItemContent {
  description: string;
  icon: LucideIcon;
  slug: string;
  tags: string[];
  title: string;
}

export interface TimelineEntryContent {
  detail: string[];
  id: string;
  skills: string[];
  summary: string;
  title: string;
  type: JourneyType;
  typeLabel: string;
  year: string;
}

export interface ContactItemContent {
  href: string;
  icon: LucideIcon;
  label: string;
  slug: string;
  username: string;
}

export interface SiteContent {
  common: {
    back: string;
  };
  contact: {
    description: string;
    eyebrow: string;
    items: ContactItemContent[];
    title: string;
  };
  footer: {
    builtWith: string;
    rights: string;
  };
  hero: {
    command: string;
    cta: string;
    name: string;
    role: string;
    skills: string[];
  };
  journey: {
    eyebrow: string;
    entries: TimelineEntryContent[];
    notFound: string;
    readMore: string;
    skillsHeading: string;
    title: string;
  };
  navbar: {
    brand: string;
    links: NavLinkContent[];
    localeLabel: string;
  };
  experiences: {
    eyebrow: string;
    items: ExperienceItemContent[];
    title: string;
  };
}

const experienceDefinitions = [
  { icon: Terminal, slug: "backend_specialist" },
  { icon: Workflow, slug: "distributed_systems" },
  { icon: Shield, slug: "identity_and_access" },
  { icon: Cloud, slug: "cloud_and_platform" },
  { icon: Network, slug: "network_and_infrastructure" },
  { icon: Server, slug: "agentic_engineering" },
  { icon: Globe, slug: "api_and_integrations" },
  { icon: Shield, slug: "testing_and_quality" },
  { icon: Server, slug: "automation_and_observability" },
] as const;

const timelineDefinitions = [
  { id: "masternet-inicio", type: "professional", year: "2012" },
  { id: "dump-devops", type: "professional", year: "2019" },
  { id: "engenharia-software", type: "personal", year: "2021" },
  { id: "deliver-c6", type: "professional", year: "2022" },
  { id: "sympla-senior", type: "professional", year: "2023" },
  { id: "sympla-specialist", type: "professional", year: "2025" },
] as const;

const contactDefinitions = [
  {
    href: "https://github.com/vakaman",
    icon: Github,
    slug: "github",
    username: "vakaman",
  },
  {
    href: "https://www.linkedin.com/in/maicolkaiseroliveira",
    icon: Linkedin,
    slug: "linkedin",
    username: "maicolkaiseroliveira",
  },
  {
    href: "mailto:eu@maicol.dev",
    icon: Mail,
    slug: "email",
    username: "eu@maicol.dev",
  },
  {
    href: "https://stackoverflow.com/users/22402101/maicol-kaiser-oliveira",
    icon: Trophy,
    slug: "stackoverflow",
    username: "maicol-kaiser-oliveira",
  },
  {
    href: "https://www.instagram.com/maicolvk",
    icon: Instagram,
    slug: "instagram",
    username: "@maicolvk",
  },
  {
    href: "https://twitter.com/maicolvaka",
    icon: Twitter,
    slug: "x",
    username: "@maicolvaka",
  },
  {
    href: "https://blog.maicol.dev",
    icon: BookText,
    slug: "blog",
    username: "blog.maicol.dev",
  },
] as const;

export function getSiteContent(locale: Locale): SiteContent {
  const copy = messages[locale];

  return {
    common: {
      back: copy.common.back,
    },
    navbar: {
      brand: copy.navbar.brand,
      links: [
        {
          href: "#experiences",
          label: copy.navbar.menu.experiences,
        },
        {
          href: "#journey",
          label: copy.navbar.menu.journey,
        },
        {
          href: "#contact",
          label: copy.navbar.menu.contact,
        },
        {
          external: true,
          href: "https://blog.maicol.dev",
          label: copy.navbar.menu.blog,
        },
      ],
      localeLabel: copy.navbar.localeLabel,
    },
    hero: {
      command: copy.hero.command,
      cta: copy.hero.cta,
      name: copy.hero.name,
      role: copy.hero.role,
      skills: copy.hero.skills,
    },
    experiences: {
      eyebrow: copy.experiences.eyebrow,
      items: experienceDefinitions.map((item) => ({
        description: copy.experiences.items[item.slug].description,
        icon: item.icon,
        slug: item.slug,
        tags: copy.experiences.items[item.slug].tags,
        title: copy.experiences.items[item.slug].title,
      })),
      title: copy.experiences.title,
    },
    journey: {
      eyebrow: copy.journey.eyebrow,
      entries: timelineDefinitions.map((item) => ({
        detail: getMarkdownParagraphs(`journey/${item.id}/detail/${locale}.md`),
        id: item.id,
        skills: copy.journey.entries[item.id].skills,
        summary: copy.journey.entries[item.id].summary,
        title: copy.journey.entries[item.id].title,
        type: item.type,
        typeLabel: copy.journey.typeLabel[item.type],
        year: item.year,
      })),
      notFound: copy.journey.notFound,
      readMore: copy.journey.readMore,
      skillsHeading: copy.journey.skillsHeading,
      title: copy.journey.title,
    },
    contact: {
      description: copy.contact.description,
      eyebrow: copy.contact.eyebrow,
      items: contactDefinitions.map((item) => ({
        href: item.href,
        icon: item.icon,
        label: copy.contact.items[item.slug].label,
        slug: item.slug,
        username: item.username,
      })),
      title: copy.contact.title,
    },
    footer: {
      builtWith: copy.footer.builtWith,
      rights: copy.footer.rights,
    },
  };
}

export function getJourneyEntry(locale: Locale, id: string) {
  return getSiteContent(locale).journey.entries.find((entry) => entry.id === id);
}

export function getDefaultSiteTitle(): string {
  return messages["pt-br"].navbar.brand;
}
