import type { LocaleMessages } from "./types";

export const ptBrMessages: LocaleMessages = {
  navbar: {
    brand: "maicol.dev",
    localeLabel: "idioma",
    menu: {
      blog: "blog",
      contact: "contato",
      experiences: "experiências",
      journey: "jornada",
    },
  },
  common: {
    back: "voltar",
  },
  hero: {
    command: "whoami",
    cta: "scroll_down",
    heading: "Backend, Infraestrutura e Sistemas Distribuídos",
    name: "",
    role: "Backend Developer & Infrastructure Engineer",
    skills: ["Kotlin", "PHP", "Python", "Java", "JavaScript", "AWS", "K8S", "Corrotinas"],
  },
  experiences: {
    description:
      "Experiência prática em engenharia backend, infraestrutura em nuvem, redes, automação, observabilidade, APIs e qualidade para sistemas escaláveis.",
    eyebrow: "> skills.list()",
    title: "Áreas de Atuação",
    items: {
      backend_specialist: {
        title: "Backend Specialist",
        description:
          "Desenvolvimento e evolução de sistemas backend com Kotlin, PHP, Python, Java e JavaScript, com foco em domínio, integração e qualidade de código.",
        tags: ["Kotlin", "PHP", "Python", "Java", "JavaScript"],
      },
      distributed_systems: {
        title: "Sistemas Distribuídos",
        description:
          "Experiência com microsserviços, mensageria e processamento assíncrono usando SQS, SNS, Kafka, DMS, WebFlux e corrotinas.",
        tags: ["Corrotinas", "SQS", "SNS", "Kafka", "WebFlux"],
      },
      identity_and_access: {
        title: "Identity & Access",
        description:
          "Evolução de fluxos de login, cadastro, autenticação e autorização com Keycloak, OAuth 2.0, OTP e integração com legados.",
        tags: ["Keycloak", "OAuth 2.0", "OTP", "Java", "Quarkus"],
      },
      cloud_and_platform: {
        title: "Cloud, AWS & Plataforma",
        description:
          "Operação e evolução de plataformas com AWS, Kubernetes, Terraform, Lambda, Docker, Datadog e APIs escaláveis.",
        tags: ["AWS", "K8S", "Terraform", "Lambda", "Docker"],
      },
      network_and_infrastructure: {
        title: "Redes & Infraestrutura",
        description:
          "Base forte em provedores, switching, routing, firewall, BGP, OSPF, MPLS, DNS, GPON e administração de ambientes Linux.",
        tags: ["BGP", "OSPF", "MPLS", "DNS", "Linux"],
      },
      agentic_engineering: {
        title: "Agentic Engineering",
        description:
          "Uso disciplinado de IA no ciclo de desenvolvimento com specifications, PRDs, Rules, Skills e foco em produtividade com testes de unidade.",
        tags: ["Codex", "Claude Code", "PRD", "Rules", "Teste de unidade"],
      },
      api_and_integrations: {
        title: "APIs & Integrações",
        description:
          "Desenvolvimento de integrações REST, fluxos orientados a eventos, evolução de APIs públicas e comunicação com sistemas legados e parceiros.",
        tags: ["REST", "OAuth 2.0", "SQS", "Kafka", "Legacy"],
      },
      testing_and_quality: {
        title: "Testes & Qualidade",
        description:
          "Prática constante com testes de unidade, cobertura de fluxos críticos, refino de arquitetura e aplicação de padrões como SOLID, DRY e circuit breaker.",
        tags: ["Teste de unidade", "PHPUnit", "JUnit", "SOLID", "Circuit Breaker"],
      },
      automation_and_observability: {
        title: "Automação & Observabilidade",
        description:
          "Automação operacional com Ansible e CI/CD, além de monitoração com Datadog, Zabbix, Graylog e Grafana para ambientes distribuídos.",
        tags: ["Ansible", "GitHub Actions", "Datadog", "Zabbix", "Grafana"],
      },
    },
  },
  journey: {
    description:
      "Uma jornada profissional entre ensino, operação de ISP, engenharia backend, sistemas distribuídos, plataformas AWS, identidade, automação e testes de unidade.",
    eyebrow: "> journey.history()",
    notFound: "404 - história não encontrada",
    readMore: "ler_mais",
    skillsHeading: "Tecnologias & Habilidades",
    title: "Minha Jornada",
    typeLabel: {
      personal: "pessoal",
      professional: "profissional",
    },
    entries: {
      "maxper-informatica": {
        title: "Maxper Informática",
        summary:
          "Primeiro contato mais profundo com tecnologia, ajudando em treinamentos e aulas em troca de aprendizado e mais tempo no computador.",
        skills: ["Informática", "HTML", "CSS", "Didática", "Compromisso"],
      },
      "gp-informatica": {
        title: "GP Informática",
        summary:
          "Experiência como instrutor de informática ensinando crianças, adultos e idosos, com foco em didática, atenção e engajamento.",
        skills: ["Didática", "Comunicação", "Ensino", "Engajamento", "Informática"],
      },
      "lc-telecom": {
        title: "L&C Telecom",
        summary:
          "Onde tudo começou: suporte técnico, vendas e o primeiro sistema em HTML com POST e GET para organizar a operação.",
        skills: ["HTML", "POST", "GET", "Suporte Técnico", "Vendas"],
      },
      "masternet-inicio": {
        title: "Masternet Telecom",
        summary:
          "Início da carreira unindo ERP em PHP, automação, operação de rede de ISP e administração de infraestrutura crítica.",
        skills: ["PHP", "Python", "BGP", "OSPF", "DNS"],
      },
      "dump-devops": {
        title: "Dump Tecnologia",
        summary:
          "Consolidação como engenheiro sênior em backend e DevOps, com Laravel, Lumen, Docker, scraping e automação.",
        skills: ["Laravel", "Lumen", "Docker", "Ansible", "Selenium"],
      },
      "engenharia-software": {
        title: "Engenharia de Software",
        summary:
          "Formação acadêmica e trilha contínua de certificações para fortalecer arquitetura, qualidade e visão sistêmica.",
        skills: ["Arquitetura", "Qualidade", "Certificações", "DevOps"],
      },
      "deliver-c6": {
        title: "Deliver IT + C6 Bank",
        summary:
          "Atuação em arquitetura PHP, TEF, testes unitários, UML, EKS e serviços AWS em contexto financeiro.",
        skills: ["Laravel", "PHPUnit", "EKS", "UML", "SQS"],
      },
      "sympla-senior": {
        title: "Sympla | Senior Software Engineer",
        summary:
          "Atuação multi-times em acesso, arquitetura, blockchain e data intelligence com foco em escala e eventos.",
        skills: ["Symfony", "Kotlin", "Kafka", "DynamoDB", "Kubernetes"],
      },
      "sympla-specialist": {
        title: "Sympla | Backend Specialist",
        summary:
          "Maior foco em plataforma, Keycloak, KrakenD, corrotinas e desenvolvimento assistido por IA com ganho real de produtividade.",
        skills: ["KrakenD", "Keycloak", "Spring Boot", "Corrotinas", "Agentic Coding"],
      },
    },
  },
  contact: {
    description:
      "Aberto a oportunidades onde eu possa contribuir com backend, plataforma e infraestrutura. Fale comigo pelos canais abaixo.",
    eyebrow: "contact.connect()",
    title: "Vamos Conectar",
    items: {
      email: { label: "Email" },
      github: { label: "GitHub" },
      blog: { label: "Blog" },
      instagram: { label: "Instagram" },
      linkedin: { label: "LinkedIn" },
      stackoverflow: { label: "Stack Overflow" },
      x: { label: "X" },
    },
  },
  footer: {
    builtWith: "built_with_passion",
    rights: "Todos os direitos reservados",
  },
};
