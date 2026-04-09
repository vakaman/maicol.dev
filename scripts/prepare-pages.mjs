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
      "Portfólio de backend, infraestrutura, redes, AWS e sistemas distribuídos de Maicol K. Oliveira.",
    htmlLang: "pt-BR",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        description:
          "Portfólio de backend, infraestrutura, redes, AWS e sistemas distribuídos de Maicol K. Oliveira.",
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
    title: "maicol.dev | Backend, Infraestrutura e Sistemas Distribuídos",
    url: `${siteUrl}/pt-br`,
  },
  "us-en": {
    description:
      "Portfolio of backend engineering, infrastructure, networking, AWS, and distributed systems by Maicol K. Oliveira.",
    htmlLang: "en",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        description:
          "Portfolio of backend engineering, infrastructure, networking, AWS, and distributed systems by Maicol K. Oliveira.",
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
    title: "maicol.dev | Backend, Infrastructure, and Distributed Systems",
    url: siteUrl,
  },
};

const journeyEntries = [
  {
    id: "masternet-inicio",
    "pt-br": {
      description:
        "Início da carreira unindo ERP em PHP, automação, operação de rede de ISP e administração de infraestrutura crítica.",
      title: "Masternet Telecom",
    },
    "us-en": {
      description:
        "Career starting point across PHP ERP work, automation, ISP network operations, and critical infrastructure administration.",
      title: "Masternet Telecom",
    },
  },
  {
    id: "dump-devops",
    "pt-br": {
      description:
        "Consolidação como engenheiro sênior em backend e DevOps, com Laravel, Lumen, Docker, scraping e automação.",
      title: "Dump Tecnologia",
    },
    "us-en": {
      description:
        "Consolidation as a senior backend and DevOps engineer with Laravel, Lumen, Docker, scraping, and automation.",
      title: "Dump Tecnologia",
    },
  },
  {
    id: "engenharia-software",
    "pt-br": {
      description:
        "Formação acadêmica e trilha contínua de certificações para fortalecer arquitetura, qualidade e visão sistêmica.",
      title: "Engenharia de Software",
    },
    "us-en": {
      description:
        "Academic foundation and continuous certification path to strengthen architecture, quality, and systems thinking.",
      title: "Software Engineering",
    },
  },
  {
    id: "deliver-c6",
    "pt-br": {
      description:
        "Atuação em arquitetura PHP, TEF, testes unitários, UML, EKS e serviços AWS em contexto financeiro.",
      title: "Deliver IT + C6 Bank",
    },
    "us-en": {
      description:
        "Work on PHP architecture, electronic funds transfer flows, unit testing, UML, EKS, and AWS services in a financial context.",
      title: "Deliver IT + C6 Bank",
    },
  },
  {
    id: "sympla-senior",
    "pt-br": {
      description:
        "Atuação multi-times em acesso, arquitetura, blockchain e data intelligence com foco em escala e eventos.",
      title: "Sympla | Senior Software Engineer",
    },
    "us-en": {
      description:
        "Cross-team work in access, architecture, blockchain, and data intelligence with scale and event-driven systems.",
      title: "Sympla | Senior Software Engineer",
    },
  },
  {
    id: "sympla-specialist",
    "pt-br": {
      description:
        "Maior foco em plataforma, Keycloak, KrakenD, corrotinas e desenvolvimento assistido por IA com ganho real de produtividade.",
      title: "Sympla | Backend Specialist",
    },
    "us-en": {
      description:
        "Stronger focus on platform decisions, Keycloak, KrakenD, coroutines, and AI-assisted development with measurable gains.",
      title: "Sympla | Backend Specialist",
    },
  },
];

function getLocalizedPath(locale, pathname) {
  if (locale === "pt-br") {
    return pathname === "/" ? "/pt-br" : `/pt-br${pathname}`;
  }

  return pathname;
}

function buildAlternates(pathname) {
  return [
    { hrefLang: "en", url: `${siteUrl}${getLocalizedPath("us-en", pathname) === "/" ? "" : getLocalizedPath("us-en", pathname)}` },
    { hrefLang: "pt-BR", url: `${siteUrl}${getLocalizedPath("pt-br", pathname)}` },
    { hrefLang: "x-default", url: `${siteUrl}${getLocalizedPath("us-en", pathname) === "/" ? "" : getLocalizedPath("us-en", pathname)}` },
  ];
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

async function writeRouteHtml(routePath, metadata, baseHtml) {
  const relativeRoute = routePath === "/" ? "" : routePath.replace(/^\//, "");
  const outputDir = relativeRoute ? path.join(distDir, relativeRoute) : distDir;

  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "index.html"), injectMetadata(baseHtml, metadata));
}

function buildHomeRoute(locale) {
  const metadata = homeMetadata[locale];

  return {
    alternates: buildAlternates("/"),
    ...metadata,
    ogType: "website",
    routePath: getLocalizedPath(locale, "/"),
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
  await writeRouteHtml(route.routePath, route, baseHtml);
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
