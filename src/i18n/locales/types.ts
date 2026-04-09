export type JourneyType = "professional" | "personal";

export interface LocaleMessages {
  navbar: {
    brand: string;
    localeLabel: string;
    menu: {
      blog: string;
      contact: string;
      experiences: string;
      journey: string;
    };
  };
  common: {
    back: string;
  };
  hero: {
    command: string;
    cta: string;
    name: string;
    role: string;
    skills: string[];
  };
  experiences: {
    eyebrow: string;
    title: string;
    items: Record<
      string,
      {
        description: string;
        tags: string[];
        title: string;
      }
    >;
  };
  journey: {
    eyebrow: string;
    notFound: string;
    readMore: string;
    skillsHeading: string;
    title: string;
    typeLabel: Record<JourneyType, string>;
    entries: Record<
      string,
      {
        skills: string[];
        summary: string;
        title: string;
      }
    >;
  };
  contact: {
    description: string;
    eyebrow: string;
    title: string;
    items: Record<
      string,
      {
        label: string;
      }
    >;
  };
  footer: {
    builtWith: string;
    rights: string;
  };
}
