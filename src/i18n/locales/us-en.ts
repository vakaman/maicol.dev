import type { LocaleMessages } from "./types";

export const usEnMessages: LocaleMessages = {
  navbar: {
    brand: "maicol.dev",
    localeLabel: "language",
    menu: {
      blog: "blog",
      contact: "contact",
      experiences: "experiences",
      journey: "journey",
    },
  },
  common: {
    back: "back",
  },
  hero: {
    command: "whoami",
    cta: "scroll_down",
    heading: "Backend Infrastructure and Distributed Systems",
    name: "",
    role: "Backend Developer & Infrastructure Engineer",
    skills: ["Kotlin", "PHP", "Python", "Java", "JavaScript", "AWS", "K8S", "Coroutines"],
  },
  experiences: {
    description:
      "Hands-on experience across backend engineering, cloud infrastructure, networking, automation, observability, APIs, and quality practices for scalable systems.",
    eyebrow: "> skills.list()",
    title: "Areas of Expertise",
    items: {
      backend_specialist: {
        title: "Backend Specialist",
        description:
          "Development and evolution of backend systems with Kotlin, PHP, Python, Java, and JavaScript, focused on domain design, integrations, and code quality.",
        tags: ["Kotlin", "PHP", "Python", "Java", "JavaScript"],
      },
      distributed_systems: {
        title: "Distributed Systems",
        description:
          "Hands-on work with microservices, messaging, and asynchronous processing using SQS, SNS, Kafka, DMS, WebFlux, and coroutines.",
        tags: ["Coroutines", "SQS", "SNS", "Kafka", "WebFlux"],
      },
      identity_and_access: {
        title: "Identity & Access",
        description:
          "Evolution of login, registration, authentication, and authorization flows with Keycloak, OAuth 2.0, OTP, and legacy integration.",
        tags: ["Keycloak", "OAuth 2.0", "OTP", "Java", "Quarkus"],
      },
      cloud_and_platform: {
        title: "Cloud, AWS & Platform",
        description:
          "Platform operations and evolution with AWS, Kubernetes, Terraform, Lambda, Docker, Datadog, and scalable APIs.",
        tags: ["AWS", "K8S", "Terraform", "Lambda", "Docker"],
      },
      network_and_infrastructure: {
        title: "Networking & Infrastructure",
        description:
          "Strong foundation in ISP environments, switching, routing, firewall, BGP, OSPF, MPLS, DNS, GPON, and Linux administration.",
        tags: ["BGP", "OSPF", "MPLS", "DNS", "Linux"],
      },
      agentic_engineering: {
        title: "Agentic Engineering",
        description:
          "Disciplined use of AI in the delivery cycle with specs, PRDs, Rules, Skills, and a strong focus on productivity supported by unit testing.",
        tags: ["Codex", "Claude Code", "PRD", "Rules", "Unit Testing"],
      },
      api_and_integrations: {
        title: "APIs & Integrations",
        description:
          "Development of REST integrations, event-driven flows, public API evolution, and communication with legacy systems and external partners.",
        tags: ["REST", "OAuth 2.0", "SQS", "Kafka", "Legacy"],
      },
      testing_and_quality: {
        title: "Testing & Quality",
        description:
          "Consistent practice with unit testing, critical flow coverage, architecture refinement, and patterns such as SOLID, DRY, and circuit breaker.",
        tags: ["Unit Testing", "PHPUnit", "JUnit", "SOLID", "Circuit Breaker"],
      },
      automation_and_observability: {
        title: "Automation & Observability",
        description:
          "Operational automation with Ansible and CI/CD, plus monitoring through Datadog, Zabbix, Graylog, and Grafana for distributed environments.",
        tags: ["Ansible", "GitHub Actions", "Datadog", "Zabbix", "Grafana"],
      },
    },
  },
  journey: {
    description:
      "A professional journey spanning teaching, ISP operations, backend engineering, distributed systems, AWS platforms, identity, automation, and unit testing.",
    eyebrow: "> journey.history()",
    notFound: "404 - story not found",
    readMore: "read_more",
    skillsHeading: "Technologies & Skills",
    title: "My Journey",
    typeLabel: {
      personal: "personal",
      professional: "professional",
    },
    entries: {
      "maxper-informatica": {
        title: "Maxper Informática",
        summary:
          "A deeper first contact with technology, helping with training sessions and classes in exchange for learning and more time on the computer.",
        skills: ["Computer Skills", "HTML", "CSS", "Teaching", "Commitment"],
      },
      "gp-informatica": {
        title: "GP Informática",
        summary:
          "Experience as a computer instructor teaching children, adults, and seniors, with a strong focus on communication, attention, and engagement.",
        skills: ["Teaching", "Communication", "Engagement", "Computer Skills", "Empathy"],
      },
      "lc-telecom": {
        title: "L&C Telecom",
        summary:
          "Where it all started: technical support, sales, and the first HTML system using POST and GET to organize field operations.",
        skills: ["HTML", "POST", "GET", "Technical Support", "Sales"],
      },
      "masternet-inicio": {
        title: "Masternet Telecom",
        summary:
          "Career starting point across PHP ERP work, automation, ISP network operations, and critical infrastructure administration.",
        skills: ["PHP", "Python", "BGP", "OSPF", "DNS"],
      },
      "dump-devops": {
        title: "Dump Tecnologia",
        summary:
          "Consolidation as a senior backend and DevOps engineer with Laravel, Lumen, Docker, scraping, and automation.",
        skills: ["Laravel", "Lumen", "Docker", "Ansible", "Selenium"],
      },
      "engenharia-software": {
        title: "Software Engineering",
        summary:
          "Academic foundation and continuous certification path to strengthen architecture, quality, and systems thinking.",
        skills: ["Architecture", "Quality", "Certifications", "DevOps"],
      },
      "deliver-c6": {
        title: "Deliver IT + C6 Bank",
        summary:
          "Work on PHP architecture, electronic funds transfer flows, unit testing, UML, EKS, and AWS services in a financial context.",
        skills: ["Laravel", "PHPUnit", "EKS", "UML", "SQS"],
      },
      "sympla-senior": {
        title: "Sympla | Senior Software Engineer",
        summary:
          "Cross-team work in access, architecture, blockchain, and data intelligence with scale and event-driven systems.",
        skills: ["Symfony", "Kotlin", "Kafka", "DynamoDB", "Kubernetes"],
      },
      "sympla-specialist": {
        title: "Sympla | Backend Specialist",
        summary:
          "Stronger focus on platform decisions, Keycloak, KrakenD, coroutines, and AI-assisted development with measurable gains.",
        skills: ["KrakenD", "Keycloak", "Spring Boot", "Coroutines", "Agentic Coding"],
      },
    },
  },
  contact: {
    description:
      "Open to opportunities where I can contribute across backend, platform, and infrastructure. Reach out through the channels below.",
    eyebrow: "contact.connect()",
    title: "Let's Connect",
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
    rights: "All rights reserved",
  },
};
