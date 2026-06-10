// ─── PERSONAL ─────────────────────────────────────────────────────────────

export const personal = {
  name: 'Bobbili Vijaya Chandu',
  shortName: 'Chandu',
  role: 'Software Development Engineer',
  tagline: 'Building things that scale.',
  taglineAccent: 'scale.',
  subTagline: 'TypeScript · Go · React · Microservices',
  location: 'Hyderabad, India',
  email: 'chandubobbili12@gmail.com',
  github: 'https://github.com/ChanduBobbili',
  linkedin: 'https://linkedin.com/in/chandu-bobbili-15863319b',
  currentRole: 'Senior SDE @ Deepta AI',
  openTo: 'Full-time · Remote · Relocation',
  education: 'B.Tech CSE, JNTUGV (2019–2023)',
  stats: [
    { value: '3+', label: 'Years' },
    // { value: '4', label: 'Companies' },
    { value: '1', label: 'OSS Lib' },
    { value: '3', label: 'Articles' },
  ],
  about: `SDE based in Hyderabad with 3+ years building scalable systems — from real-time analytics platforms handling live production traffic, to open-source component libraries and Go CLI tools used by other developers. I care about clean architecture, measurable impact, and writing code that doesn't rot.`,
  missionStats: [
    { label: 'Systems Deployed', value: '6+' },
    { label: 'npm Downloads / wk', value: '~1k' },
    { label: 'Lighthouse Score Δ', value: '54 → 97' },
    // { label: 'Test Coverage', value: '~90%' },
  ],
}

// ─── WORK EXPERIENCE ──────────────────────────────────────────────────────

export type ExperienceProject = {
  name: string
  description: string
  stack: string[]
  bullets: string[]
  accent: string
}

export type ExperienceEntry = {
  role: string
  company: string
  companyUrl?: string
  location: string
  period: string
  current: boolean
  projects: ExperienceProject[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Deepta AI Private Limited',
    location: 'Hyderabad, India',
    period: '08/2025 – Present',
    current: true,
    projects: [
      {
        name: 'Klaritics — SaaS Data Analytics Platform',
        accent: 'cyan',
        description:
          'A warehouse-native SaaS product analytics platform where events are tracked via a custom SDK or API. Built the full analytics layer from scratch — funnels, retention curves, user paths, insight widgets, cohorts, and real-time dashboards serving live production traffic.',
        stack: [
          'React',
          'TypeScript',
          'Vite',
          'TanStack',
          'Zustand',
          'Tailwind CSS',
          'Go',
          'Kafka',
          'ClickHouse',
          'MongoDB',
          'Redis',
          'Docker',
          'Kubernetes (GKE)',
        ],
        bullets: [
          'Engineered a full-stack SaaS data analytics platform with real-time Kafka event ingestion and ClickHouse-backed analytics covering funnels, retention curves, user paths, cohorts, and real-time dashboards serving live production traffic.',
          'Built the analytics frontend with React, TypeScript, Vite, TanStack, Tailwind CSS, and Zustand; architected the backend on Go microservices with MongoDB, Redis, Docker, and Kubernetes (GKE).',
          'Designed pub/sub event pipelines using Kafka for async inter-service communication; implemented Redis for distributed caching and session management, significantly reducing database load.',
        ],
      },
      {
        name: 'Application Management System',
        accent: 'purple',
        description:
          'A multi-university student application platform used by 4 universities — covering the entire lifecycle from lead generation to admission. Features dynamic form/course/fee configuration, two dedicated frontends (student portal + authority dashboard), and an embeddable SDK for third-party sites.',
        stack: [
          'React',
          'TypeScript',
          'Go',
          'Goroutines',
          'Channels',
          'PostgreSQL',
          'Redis',
          'Kafka',
          'Docker',
          'Kubernetes (GKE)',
          'JWT',
        ],
        bullets: [
          'Architected a high-scale university student application platform used by 4 universities — lead generation (API, CSV, IVR, Facebook Ads, embeddable widgets), application submission with FlexiPay/loan payments, document upload, and admission tracking.',
          'Built two frontend applications (student portal + authority dashboard) and an embeddable SDK for rendering dynamically configured forms and widgets on third-party university and partner websites.',
          'Engineered a BFF reverse proxy to convert third-party cookies into first-party cookies, resolving cross-origin tracking restrictions in modern browsers on university-hosted student portals.',
          'Leveraged Go goroutines and channels for concurrent payment processing and lead ingestion across multiple institutions simultaneously.',
          'Built JWT-based auth with refresh/access token rotation; deployed all services on GCP GKE from scratch via Docker, Kubernetes, and GitHub Actions CI/CD.',
        ],
      },
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Apxor Technology Solutions Pvt Ltd',
    location: 'Hyderabad, India',
    period: '09/2024 – 07/2025',
    current: false,
    projects: [
      {
        name: 'Hearzap — Hearing Aid Clinic Management System',
        accent: 'purple',
        description:
          'An internal full-stack web application for Hearzap employees managing the complete hearing aid clinic workflow — from patient walk-in and appointment booking to hearing tests, product recommendations, sale orders, and CRM for both Hearzap↔Client and Hearzap↔Dealer relationships.',
        stack: [
          'React',
          'TypeScript',
          'TanStack',
          'Zustand',
          'Immer',
          'Vitest',
          'Playwright',
          'Go',
          'PostgreSQL',
          'Docker',
          'Kubernetes (GKE)',
        ],
        bullets: [
          'Built Hearzap — an internal clinic management system covering patient appointments, hearing tests, product recommendations, sale orders, warehouse operations, and CRM for Hearzap↔Client and Hearzap↔Dealer workflows.',
          'Implemented ReactJS + TypeScript frontend with TanStack (routing, data fetching, forms), Zustand, and Immer; achieved ~90% unit test coverage via Vitest with E2E coverage via Playwright.',
          'Developed and maintained scalable Go CRUD APIs within a microservices architecture — each module (appointments, client management, store, hearing test) as a dedicated service with its own PostgreSQL database.',
        ],
      },
    ],
  },
  {
    role: 'Associate Web Developer',
    company: 'Apxor Technology Solutions Pvt Ltd',
    location: 'Hyderabad, India',
    period: '07/2023 – 08/2024',
    current: false,
    projects: [
      {
        name: 'Apxor Dashboard — CRA → Vite Migration',
        accent: 'cyan',
        description:
          "Led the migration of Apxor's legacy Create React App dashboard to a modern Vite-based stack. Started by designing the new Stories feature UI in Figma, then drove the full codebase modernisation — achieving an 80% Lighthouse score improvement.",
        stack: [
          'Vite',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Shadcn UI',
          'TanStack',
          'Zustand',
          'Figma',
        ],
        bullets: [
          'Designed the Stories feature in Figma, then led the full migration of the legacy CRA dashboard to Vite — modernising to TypeScript, Tailwind CSS, Shadcn UI, TanStack, and Zustand.',
          'Achieved Lighthouse score improvement from 54 → 97 (80% improvement); reduced INP and blocking time from ~500ms to negligible via lazy loading, caching, and image optimisation.',
          'Shipped the Stories feature (resembling social media stories) and FAB (Floating Action Button) to production with measurably improved user engagement metrics.',
        ],
      },
      {
        name: 'Apxor Company Website',
        accent: 'green',
        description:
          "Maintained and enhanced Apxor's public-facing marketing website on Webflow. Implemented a multi-tool analytics stack, monitored user behaviour, and generated insight reports that informed product and design decisions.",
        stack: ['Webflow', 'Google Analytics', 'Google Tag Manager', 'Mixpanel', 'Apxor SDK'],
        bullets: [
          "Maintained Apxor's Webflow website across all breakpoints; instrumented a multi-tool analytics stack (Google Analytics, GTM, Mixpanel, Apxor SDK) to track user behaviour.",
          'Generated insight reports from traffic and performance analytics that directly informed product and design decisions.',
        ],
      },
    ],
  },
]

// ─── PROJECTS ─────────────────────────────────────────────────────────────

export type Project = {
  title: string
  subtitle: string
  tag: string
  accent: string
  description: string
  stack: string[]
  links: {
    live?: string
    github?: string
  }
  featured: boolean
  stats?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    title: 'ZenithUI',
    subtitle: 'Open-Source React Component Library',
    tag: 'Open Source',
    accent: 'green',
    description:
      'Published and maintained an open-source React component library with TypeScript-first architecture, tree-shaking support, CSS variable theming with Tailwind-ready customisation, and full WAI-ARIA accessibility compliance. Ships 13+ components as tree-shakeable scoped packages.',
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'WAI-ARIA', 'Monorepo'],
    links: {
      live: 'https://zenithui.chandubobbili.dev',
      github: 'https://github.com/ChanduBobbili/ZenithUi',
    },
    featured: true,
    stats: [
      { label: 'Weekly npm downloads', value: '~1k' },
      { label: 'GitHub stars', value: '7' },
      { label: 'Components', value: '13+' },
    ],
  },
  {
    title: 'changesetgoo',
    subtitle: 'Go CLI for Semantic Versioning & Changelog Management',
    tag: 'Open Source · CLI',
    accent: 'cyan',
    description:
      'A lightweight Go-based CLI for managing semantic versioning and changelogs — inspired by the JavaScript Changesets tool, but shipped as a single Go binary with no Node.js runtime required. Supports add, version, tag, and publish workflows.',
    stack: ['Go', 'CLI', 'Semantic Versioning', 'Git'],
    links: {
      github: 'https://github.com/ChanduBobbili/changesetgoo',
    },
    featured: true,
    stats: [
      { label: 'GitHub stars', value: '2' },
      { label: 'License', value: 'MIT' },
    ],
  },
]

// ─── SKILLS ───────────────────────────────────────────────────────────────

export const skills = [
  {
    category: 'Languages',
    accent: 'purple',
    items: ['TypeScript', 'Go', 'JavaScript (ES6+)', 'Python', 'HTML', 'CSS'],
  },
  // {
  //   category: 'Go Internals',
  //   accent: 'cyan',
  //   items: [
  //     'Goroutines',
  //     'Channels',
  //     'WaitGroup',
  //     'Mutex',
  //     'Worker Pools',
  //     'Context Cancellation',
  //     'gRPC',
  //   ],
  // },
  {
    category: 'Frontend',
    accent: 'purple',
    items: [
      'React.js',
      'Next.js',
      'TanStack',
      'Zustand',
      'Tailwind CSS',
      'Shadcn UI',
      'Vitest',
      'Playwright',
      'Webflow',
    ],
  },
  {
    category: 'Backend & Messaging',
    accent: 'cyan',
    items: [
      'Microservices',
      'REST APIs',
      'Node.js',
      'Express.js',
      'WebSockets',
      'SSE',
      'BFF Pattern',
      'Kafka',
      'gRPC',
    ],
  },
  {
    category: 'Databases',
    accent: 'green',
    items: ['PostgreSQL', 'MongoDB', 'ClickHouse', 'Redis', 'SQL'],
  },
  {
    category: 'DevOps & Cloud',
    accent: 'cyan',
    items: ['Docker', 'Kubernetes (GKE)', 'GCP', 'GitHub Actions', 'GitLab CI/CD', 'Git'],
  },
  {
    category: 'Other',
    accent: 'purple',
    items: ['System Design', 'JWT / OAuth', 'Figma', 'Web APIs', 'Data Structures & Algorithms'],
  },
]

// ─── TECHNICAL WRITING ────────────────────────────────────────────────────

export const articles = [
  {
    title: 'Mastering SEO for Next.js: A Practical Optimisation Checklist',
    summary:
      'A practical, checklist-driven guide covering metadata, Open Graph, structured data, sitemap, Core Web Vitals, and more for Next.js apps.',
    tags: ['SEO', 'Next.js', 'Frontend'],
    accent: 'purple',
    image: '/images/articles/seo.png',
    url: 'https://dev.to/chandu_bobbili_06/mastering-seo-for-nextjs-a-practical-optimization-checklist-4nld',
  },
  {
    title: 'Biome Has Entered the Chat: A New Tool to Replace ESLint and Prettier',
    summary:
      "An introduction to Biome — a fast, unified linter and formatter written in Rust — and why it's a compelling replacement for the ESLint + Prettier combo.",
    tags: ['Tooling', 'DX', 'Open Source'],
    accent: 'cyan',
    image: '/images/articles/biome.png',
    url: 'https://dev.to/chandu_bobbili_06/biome-has-entered-the-chat-a-new-tool-to-replace-eslint-and-prettier-1p8e',
  },
  {
    title: 'Say Goodbye to Changelog Chaos: Introducing changesetgoo',
    summary:
      'Introduces changesetgoo — the Go CLI for semantic versioning and changelog management — covering the problem it solves and how to use it in a real project.',
    tags: ['Open Source', 'Release Management', 'Go'],
    accent: 'green',
    image: '/images/articles/changesetgoo.png',
    url: 'https://dev.to/chandu_bobbili_06/say-goodbye-to-changelog-chaos-introducing-changesetgoo-c2j',
  },
]
