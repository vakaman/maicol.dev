import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const indexFile = path.join(distDir, "index.html");
const notFoundFile = path.join(distDir, "404.html");
const cnameFile = path.join(distDir, "CNAME");
const noJekyllFile = path.join(distDir, ".nojekyll");
const sitemapFile = path.join(distDir, "sitemap.xml");
const siteUrl = "https://maicol.dev";
const defaultImage = `${siteUrl}/favicon.ico`;

const homeMetadata = {
  "pt-br": {
    description:
      "Portfólio de Maicol K. Oliveira com experiência em backend, infraestrutura, redes, AWS, testes de unidade, automação e sistemas distribuídos para plataformas escaláveis.",
    htmlLang: "pt-BR",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        description:
          "Portfólio de Maicol K. Oliveira com experiência em backend, infraestrutura, redes, AWS, testes de unidade, automação e sistemas distribuídos para plataformas escaláveis.",
        inLanguage: "pt-BR",
        name: "maicol.dev",
        url: `${siteUrl}/pt-br`,
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        jobTitle: "Desenvolvedor Backend e Engenheiro de Infraestrutura",
        name: "Maicol K. Oliveira",
        sameAs: [
          "https://github.com/vakaman",
          "https://www.linkedin.com/in/maicolkaiseroliveira",
          "https://blog.maicol.dev",
        ],
        url: siteUrl,
      },
    ],
    title: "Backend, Infraestrutura e Sistemas Distribuídos",
    url: `${siteUrl}/pt-br`,
  },
  "us-en": {
    description:
      "Portfolio of Maicol K. Oliveira covering backend engineering, infrastructure, networking, AWS, unit testing, automation, and distributed systems for scalable platforms.",
    htmlLang: "en",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        description:
          "Portfolio of Maicol K. Oliveira covering backend engineering, infrastructure, networking, AWS, unit testing, automation, and distributed systems for scalable platforms.",
        inLanguage: "en",
        name: "maicol.dev",
        url: siteUrl,
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        jobTitle: "Backend Developer and Infrastructure Engineer",
        name: "Maicol K. Oliveira",
        sameAs: [
          "https://github.com/vakaman",
          "https://www.linkedin.com/in/maicolkaiseroliveira",
          "https://blog.maicol.dev",
        ],
        url: siteUrl,
      },
    ],
    title: "Backend Infrastructure and Distributed Systems",
    url: siteUrl,
  },
};

const journeyEntries = [
  {
    id: "maxper-informatica",
    year: "2005",
    "pt-br": {
      description:
        "Primeiro contato mais profundo com tecnologia, ajudando em treinamentos e aulas em troca de aprendizado e mais tempo no computador.",
      title: "Maxper Informática",
      typeLabel: "profissional",
    },
    "us-en": {
      description:
        "A deeper first contact with technology, helping with training sessions and classes in exchange for learning and more time on the computer.",
      title: "Maxper Informática",
      typeLabel: "professional",
    },
  },
  {
    id: "gp-informatica",
    year: "2006",
    "pt-br": {
      description:
        "Experiência como instrutor de informática ensinando crianças, adultos e idosos, com foco em didática, atenção e engajamento.",
      title: "GP Informática",
      typeLabel: "profissional",
    },
    "us-en": {
      description:
        "Experience as a computer instructor teaching children, adults, and seniors, with a strong focus on communication, attention, and engagement.",
      title: "GP Informática",
      typeLabel: "professional",
    },
  },
  {
    id: "lc-telecom",
    year: "2011",
    "pt-br": {
      description:
        "Primeira experiência profissional com suporte técnico, vendas e criação de um sistema HTML com POST e GET para agendamentos operacionais.",
      title: "L&C Telecom",
      typeLabel: "profissional",
    },
    "us-en": {
      description:
        "First professional experience with technical support, sales, and the creation of an HTML system using POST and GET for operational scheduling.",
      title: "L&C Telecom",
      typeLabel: "professional",
    },
  },
  {
    id: "masternet-inicio",
    year: "2012",
    "pt-br": {
      description:
        "Início da carreira unindo ERP em PHP, automação, operação de rede de ISP e administração de infraestrutura crítica.",
      title: "Masternet Telecom",
      typeLabel: "profissional",
    },
    "us-en": {
      description:
        "Career starting point across PHP ERP work, automation, ISP network operations, and critical infrastructure administration.",
      title: "Masternet Telecom",
      typeLabel: "professional",
    },
  },
  {
    id: "dump-devops",
    year: "2019",
    "pt-br": {
      description:
        "Consolidação como engenheiro sênior em backend e DevOps, com Laravel, Lumen, Docker, scraping e automação.",
      title: "Dump Tecnologia",
      typeLabel: "profissional",
    },
    "us-en": {
      description:
        "Consolidation as a senior backend and DevOps engineer with Laravel, Lumen, Docker, scraping, and automation.",
      title: "Dump Tecnologia",
      typeLabel: "professional",
    },
  },
  {
    id: "engenharia-software",
    year: "2021",
    "pt-br": {
      description:
        "Formação acadêmica e trilha contínua de certificações para fortalecer arquitetura, qualidade e visão sistêmica.",
      title: "Engenharia de Software",
      typeLabel: "pessoal",
    },
    "us-en": {
      description:
        "Academic foundation and continuous certification path to strengthen architecture, quality, and systems thinking.",
      title: "Software Engineering",
      typeLabel: "personal",
    },
  },
  {
    id: "deliver-c6",
    year: "2022",
    "pt-br": {
      description:
        "Atuação em arquitetura PHP, TEF, testes unitários, UML, EKS e serviços AWS em contexto financeiro.",
      title: "Deliver IT + C6 Bank",
      typeLabel: "profissional",
    },
    "us-en": {
      description:
        "Work on PHP architecture, electronic funds transfer flows, unit testing, UML, EKS, and AWS services in a financial context.",
      title: "Deliver IT + C6 Bank",
      typeLabel: "professional",
    },
  },
  {
    id: "sympla-senior",
    year: "2023",
    "pt-br": {
      description:
        "Atuação multi-times em acesso, arquitetura, blockchain e data intelligence com foco em escala e eventos.",
      title: "Sympla | Senior Software Engineer",
      typeLabel: "profissional",
    },
    "us-en": {
      description:
        "Cross-team work in access, architecture, blockchain, and data intelligence with scale and event-driven systems.",
      title: "Sympla | Senior Software Engineer",
      typeLabel: "professional",
    },
  },
  {
    id: "sympla-specialist",
    year: "2025",
    "pt-br": {
      description:
        "Maior foco em plataforma, Keycloak, KrakenD, corrotinas e desenvolvimento assistido por IA com ganho real de produtividade.",
      title: "Sympla | Backend Specialist",
      typeLabel: "profissional",
    },
    "us-en": {
      description:
        "Stronger focus on platform decisions, Keycloak, KrakenD, coroutines, and AI-assisted development with measurable gains.",
      title: "Sympla | Backend Specialist",
      typeLabel: "professional",
    },
  },
];

const homeShellContent = {
  "pt-br": {
    contactTitle: "Contato e Links",
    experiencesTitle: "Áreas de Atuação",
    heading: "Backend, Infraestrutura e Sistemas Distribuídos",
    intro: [
      "Maicol K. Oliveira é um desenvolvedor backend e engenheiro de infraestrutura com atuação em sistemas escaláveis, plataformas em nuvem, redes, automação e entrega de software confiável.",
      "Este portfólio destaca experiência com Kotlin, PHP, Python, Java, JavaScript, AWS, sistemas distribuídos, engenharia de plataforma, testes de unidade e observabilidade em projetos profissionais.",
    ],
    journeyTitle: "Jornada Profissional",
    experienceParagraph:
      "A atuação cobre arquitetura backend, APIs, processamento assíncrono, identidade e acesso, infraestrutura em nuvem, observabilidade, automação e práticas de qualidade para ambientes de produção.",
    experienceItems: [
      "Engenharia backend com Kotlin, PHP, Python, Java e JavaScript.",
      "Sistemas distribuídos com mensageria, fluxos assíncronos e integrações resilientes.",
      "AWS, Kubernetes, Terraform, Docker, redes, DNS e operação de infraestrutura.",
      "Testes de unidade, arquitetura, automação e observabilidade.",
    ],
    journeyParagraphs: [
      "A jornada reúne ensino, operação de ISP, engenharia backend, trabalho em plataforma e aprendizado contínuo. Começou com suporte técnico e redes, evoluiu para ERP e automação e depois avançou para sistemas distribuídos, serviços AWS, fluxos de identidade e qualidade de software.",
      "Esses marcos mostram como a vivência prática em infraestrutura moldou uma base forte em backend, com atenção a confiabilidade, manutenção, testes de unidade e entrega em produção.",
      "Cada etapa adiciona contexto sobre decisões de arquitetura, suporte em produção, desenho de integrações e evolução de plataforma, ajudando buscadores e visitantes a entenderem a profundidade da experiência.",
    ],
    contactParagraph:
      'Perfis externos e publicações estão disponíveis no <a href="https://github.com/vakaman" rel="noopener noreferrer" target="_blank">GitHub</a>, <a href="https://www.linkedin.com/in/maicolkaiseroliveira" rel="noopener noreferrer" target="_blank">LinkedIn</a> e no <a href="https://blog.maicol.dev" rel="noopener noreferrer" target="_blank">blog</a>.',
    nav: {
      blog: "blog",
      contact: "contato",
      experiences: "experiências",
      journey: "jornada",
    },
  },
  "us-en": {
    contactTitle: "Contact and Links",
    experiencesTitle: "Areas of Expertise",
    heading: "Backend Infrastructure and Distributed Systems",
    intro: [
      "Maicol K. Oliveira is a backend developer and infrastructure engineer focused on scalable systems, cloud platforms, networking, automation, and reliable software delivery.",
      "This portfolio highlights experience with Kotlin, PHP, Python, Java, JavaScript, AWS, distributed systems, platform engineering, unit testing, and observability across professional projects.",
    ],
    journeyTitle: "Professional Journey",
    experienceParagraph:
      "The work spans backend architecture, APIs, asynchronous processing, identity and access, cloud infrastructure, observability, automation, and engineering quality practices for production systems.",
    experienceItems: [
      "Backend engineering with Kotlin, PHP, Python, Java, and JavaScript.",
      "Distributed systems with messaging, asynchronous workflows, and resilient integrations.",
      "AWS, Kubernetes, Terraform, Docker, networking, DNS, and infrastructure operations.",
      "Unit testing, architecture refinement, automation, and observability.",
    ],
    journeyParagraphs: [
      "The journey combines teaching, ISP operations, backend engineering, platform work, and continuous learning. It started with technical support and networking, evolved through ERP and automation, and later expanded into distributed systems, AWS services, identity flows, and software quality.",
      "These milestones explain how practical infrastructure work shaped a strong backend mindset, with attention to reliability, maintainability, unit testing, and delivery in real production environments.",
      "Each step adds context around architecture decisions, production support, integration design, and platform evolution, helping search engines and visitors understand the depth of experience behind backend, infrastructure, and distributed systems work.",
    ],
    contactParagraph:
      'External profiles and publications are available on <a href="https://github.com/vakaman" rel="noopener noreferrer" target="_blank">GitHub</a>, <a href="https://www.linkedin.com/in/maicolkaiseroliveira" rel="noopener noreferrer" target="_blank">LinkedIn</a>, and the <a href="https://blog.maicol.dev" rel="noopener noreferrer" target="_blank">blog</a>.',
    nav: {
      blog: "blog",
      contact: "contact",
      experiences: "experiences",
      journey: "journey",
    },
  },
};

function getLocalizedPath(locale, pathname) {
  if (locale === "pt-br") {
    return pathname === "/" ? "/pt-br" : `/pt-br${pathname}`;
  }

  return pathname;
}

function buildAlternates(pathname) {
  const englishPath = getLocalizedPath("us-en", pathname);
  return [
    { hrefLang: "en", url: `${siteUrl}${englishPath === "/" ? "" : englishPath}` },
    { hrefLang: "pt-BR", url: `${siteUrl}${getLocalizedPath("pt-br", pathname)}` },
    { hrefLang: "x-default", url: `${siteUrl}${englishPath === "/" ? "" : englishPath}` },
  ];
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHomeShell(locale) {
  const content = homeShellContent[locale];
  const journeyLinks = journeyEntries
    .map((entry) => {
      const localizedEntry = entry[locale];
      return `<li><a href="${getLocalizedPath(locale, `/journey/${entry.id}`)}">${escapeHtml(localizedEntry.title)}</a></li>`;
    })
    .join("\n            ");

  const experienceItems = content.experienceItems
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("\n            ");

  return `
      <main>
        <header>
          <nav aria-label="Primary">
            <a href="#experiences">${escapeHtml(content.nav.experiences)}</a>
            <a href="#journey">${escapeHtml(content.nav.journey)}</a>
            <a href="#contact">${escapeHtml(content.nav.contact)}</a>
            <a href="https://blog.maicol.dev" rel="noopener noreferrer" target="_blank">${escapeHtml(content.nav.blog)}</a>
          </nav>
          <h1>${escapeHtml(content.heading)}</h1>
          <p>${escapeHtml(content.intro[0])}</p>
          <p>${escapeHtml(content.intro[1])}</p>
        </header>

        <section id="experiences">
          <h2>${escapeHtml(content.experiencesTitle)}</h2>
          <p>${escapeHtml(content.experienceParagraph)}</p>
          <ul>
            ${experienceItems}
          </ul>
        </section>

        <section id="journey">
          <h2>${escapeHtml(content.journeyTitle)}</h2>
          <p>${escapeHtml(content.journeyParagraphs[0])}</p>
          <p>${escapeHtml(content.journeyParagraphs[1])}</p>
          <p>${escapeHtml(content.journeyParagraphs[2])}</p>
          <ul>
            ${journeyLinks}
          </ul>
        </section>

        <section id="contact">
          <h2>${escapeHtml(content.contactTitle)}</h2>
          <p>${content.contactParagraph}</p>
        </section>
      </main>
  `.trim();
}

function buildJourneyShell(locale, entry) {
  const localizedEntry = entry[locale];
  const backHref = getLocalizedPath(locale, "/");
  const sectionTitle = locale === "pt-br" ? "Resumo da jornada" : "Journey summary";
  const skillsTitle = locale === "pt-br" ? "Relevância para backend e infraestrutura" : "Why it matters for backend and infrastructure";
  const closingParagraph =
    locale === "pt-br"
      ? "Esse marco reforça uma trajetória orientada a backend, infraestrutura, redes, automação, testes de unidade e sistemas distribuídos, conectando experiência prática com evolução contínua."
      : "This milestone reinforces a journey focused on backend engineering, infrastructure, networking, automation, unit testing, and distributed systems, connecting hands-on work with continuous growth.";

  return `
      <main>
        <nav aria-label="Breadcrumb">
          <a href="${backHref}">maicol.dev</a>
        </nav>
        <article>
          <header>
            <p>${escapeHtml(entry.year)} · ${escapeHtml(localizedEntry.typeLabel)}</p>
            <h1>${escapeHtml(localizedEntry.title)}</h1>
          </header>

          <section>
            <h2>${escapeHtml(sectionTitle)}</h2>
            <p>${escapeHtml(localizedEntry.description)}</p>
            <p>${escapeHtml(closingParagraph)}</p>
          </section>

          <section>
            <h2>${escapeHtml(skillsTitle)}</h2>
            <p>${escapeHtml(closingParagraph)}</p>
          </section>

          <p><a href="${backHref}">${locale === "pt-br" ? "Voltar para a home" : "Back to home"}</a></p>
        </article>
      </main>
  `.trim();
}

function injectMetadata(html, metadata) {
  const alternateLinks = metadata.alternates
    .map((alternate) => `<link rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.url}" />`)
    .join("\n    ");
  const jsonLd = JSON.stringify(metadata.jsonLd, null, 2);

  return html
    .replace(/<html lang="[^"]+">/, `<html lang="${metadata.htmlLang}">`)
    .replace(/<title>.*<\/title>/, `<title>${metadata.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${metadata.description}" />`)
    .replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="index,follow" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${metadata.url}" />`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*" \/>\s*<link rel="alternate" hreflang="pt-BR" href="[^"]*" \/>\s*<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/, alternateLinks)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${metadata.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${metadata.description}" />`)
    .replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${metadata.ogType}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${metadata.url}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${defaultImage}" />`)
    .replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${metadata.htmlLang}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${metadata.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${metadata.description}" />`)
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
    );
}

function injectSeoShell(html, shell) {
  return html.replace(
    /<!-- SEO_SHELL_START -->[\s\S]*?<!-- SEO_SHELL_END -->/,
    `<!-- SEO_SHELL_START -->\n      ${shell.replace(/\n/g, "\n      ")}\n      <!-- SEO_SHELL_END -->`,
  );
}

async function writeRouteHtml(routePath, metadata, shell, baseHtml) {
  const relativeRoute = routePath === "/" ? "" : routePath.replace(/^\//, "");
  const outputDir = relativeRoute ? path.join(distDir, relativeRoute) : distDir;
  const localizedHtml = injectSeoShell(injectMetadata(baseHtml, metadata), shell);

  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "index.html"), localizedHtml);
}

function buildHomeRoute(locale) {
  const metadata = homeMetadata[locale];

  return {
    alternates: buildAlternates("/"),
    ...metadata,
    ogType: "website",
    routePath: getLocalizedPath(locale, "/"),
    shell: buildHomeShell(locale),
  };
}

function buildJourneyRoute(locale, entry) {
  const pathname = `/journey/${entry.id}`;
  const localizedPath = getLocalizedPath(locale, pathname);
  const localizedEntry = entry[locale];

  return {
    alternates: buildAlternates(pathname),
    description: localizedEntry.description,
    htmlLang: locale === "pt-br" ? "pt-BR" : "en",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            item: `${siteUrl}${getLocalizedPath(locale, "/") === "/" ? "" : getLocalizedPath(locale, "/")}`,
            name: "maicol.dev",
            position: 1,
          },
          {
            "@type": "ListItem",
            item: `${siteUrl}${localizedPath}`,
            name: localizedEntry.title,
            position: 2,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        author: {
          "@type": "Person",
          name: "Maicol K. Oliveira",
          url: siteUrl,
        },
        description: localizedEntry.description,
        headline: localizedEntry.title,
        inLanguage: locale === "pt-br" ? "pt-BR" : "en",
        mainEntityOfPage: `${siteUrl}${localizedPath}`,
      },
    ],
    ogType: "article",
    routePath: localizedPath,
    shell: buildJourneyShell(locale, entry),
    title: `${localizedEntry.title} | maicol.dev`,
    url: `${siteUrl}${localizedPath}`,
  };
}

await mkdir(distDir, { recursive: true });
const baseHtml = await readFile(indexFile, "utf-8");

await copyFile(indexFile, notFoundFile);
await writeFile(noJekyllFile, "");

const routes = [
  buildHomeRoute("us-en"),
  buildHomeRoute("pt-br"),
  ...journeyEntries.flatMap((entry) => [buildJourneyRoute("us-en", entry), buildJourneyRoute("pt-br", entry)]),
];

for (const route of routes) {
  await writeRouteHtml(route.routePath, route, route.shell, baseHtml);
}

const sitemapEntries = routes
  .map((route) => `  <url>\n    <loc>${route.url}</loc>\n  </url>`)
  .join("\n");

await writeFile(
  sitemapFile,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
);

try {
  await access(path.resolve("public", "CNAME"));
} catch {
  await writeFile(cnameFile, "maicol.dev\n");
}
