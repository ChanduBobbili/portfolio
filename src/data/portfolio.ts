// ─── PERSONAL ─────────────────────────────────────────────────────────────

export type AboutSegment = { text: string; highlight?: boolean }

export const personal = {
  name: 'Bobbili Vijaya Chandu',
  shortName: 'Chandu',
  role: 'Software Development Engineer',
  tagline: 'Building things that scale.',
  taglineAccent: 'scale.',
  subTagline: 'TypeScript · Go · React · Microservices',
  location: 'Hyderabad, India',
  email: 'chandubobbili12@gmail.com',
  whatsapp: '916305974480',
  github: 'https://github.com/ChanduBobbili',
  linkedin: 'https://linkedin.com/in/chandu-bobbili-15863319b',
  resume: 'https://drive.google.com/file/d/1zhpAwC_QXOsiDV4zdq7Dbn0GF-DPsMKa/view?usp=drivesdk',
  currentRole: 'Senior SDE @ Deepta AI',
  openTo: 'Full-time · Remote · Relocation',
  education: 'B.Tech CSE, JNTUGV (2019–2023)',
  about: [
    {
      text: "I'm an SDE who measures success in business outcomes, not just shipped features. At Deepta AI I've helped platforms handle ",
    },
    { text: '1M+ events/sec', highlight: true },
    { text: ', onboard ' },
    { text: '20,000 students', highlight: true },
    { text: ' across ' },
    { text: '4 universities', highlight: true },
    { text: ', and process ' },
    { text: '4,000 fee renewals', highlight: true },
    { text: ' — while cutting per-applicant handling from ' },
    { text: '15 to 8 hours', highlight: true },
    { text: '. Earlier at Apxor, a dashboard migration (' },
    { text: 'Lighthouse 54 → 97', highlight: true },
    { text: ') directly retained ' },
    { text: '5+ accounts', highlight: true },
    { text: ' that were ready to leave.' },
  ] satisfies AboutSegment[],
  missionStats: [
    { label: 'Events/sec, load-tested', value: '1M+' },
    { label: 'Students enrolled via platform', value: '20K' },
    { label: 'Accounts retained after perf fix', value: '5+' },
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
  companyLogo?: string
  location: string
  period: string
  current: boolean
  projects: ExperienceProject[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Deepta AI Private Limited',
    companyUrl: 'https://deeptaai.com',
    companyLogo:
      'https://res.cloudinary.com/dtay6zw4c/image/upload/f_auto,q_auto:best/Deepta_Log_hmsreb.png',
    location: 'Hyderabad, India',
    period: '08/2025 – Present',
    current: true,
    projects: [
      {
        name: 'Klaritics — SaaS Data Analytics Platform',
        accent: 'cyan',
        description:
          'A warehouse-native SaaS product analytics platform where events are ingested via a custom SDK or API, covering funnels, retention curves, user paths, cohorts, and real-time dashboards.',
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
          'Load-tested at 1M+ events/sec with real-time Kafka ingestion and a ClickHouse-backed analytics layer covering funnels, retention curves, user paths, cohorts, and live dashboards.',
          'Analytics frontend serving live production traffic, using React, Vite, TanStack, Tailwind CSS, and Zustand.',
          'Go microservices on Kubernetes (GKE) with MongoDB, Redis distributed caching, and Kafka pub/sub pipelines that significantly reduced database load.',
        ],
      },
      {
        name: 'Application Management System',
        accent: 'purple',
        description:
          'A multi-university student application platform used by 4 universities, covering lead generation through admission with a student portal, authority dashboard, and embeddable SDK for third-party sites.',
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
          'Generated 50,000+ leads and enrolled 20,000 students for a Winter 2025 batch across 4 universities, while cutting application processing time from 15 to 8 hours per applicant.',
          "Handled 4,000 students' fee renewals for the previous batch across the same multi-university platform.",
          'Resolved cross-origin tracking restrictions on university-hosted portals via a BFF reverse proxy that converted third-party cookies into first-party cookies.',
          'Concurrent payment processing and lead ingestion across institutions using Go goroutines and channels, with JWT auth and full GCP GKE deployment via Docker and GitHub Actions.',
        ],
      },
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Apxor Technology Solutions Pvt Ltd',
    companyUrl: 'https://apxor.com',
    companyLogo:
      'https://res.cloudinary.com/dtay6zw4c/image/upload/f_auto,q_auto:best/apxor_bebuqj.png',
    location: 'Hyderabad, India',
    period: '09/2024 – 07/2025',
    current: false,
    projects: [
      {
        name: 'Hearzap — Hearing Aid Clinic Management System',
        accent: 'purple',
        description:
          'An internal full-stack web application for Hearzap clinic staff, covering patient walk-in through appointments, hearing tests, product recommendations, sale orders, and dealer/client CRM.',
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
          'Unified end-to-end clinic operations in one system — appointments, hearing tests, product recommendations, sale orders, warehouse management, and Hearzap↔Client and Hearzap↔Dealer CRM workflows.',
          'Reached ~90% unit test coverage via Vitest with E2E coverage via Playwright, on a React + TypeScript frontend using TanStack, Zustand, and Immer.',
          'Scalable Go microservices architecture with each module (appointments, client management, store, hearing test) as a dedicated service with its own PostgreSQL database.',
        ],
      },
    ],
  },
  {
    role: 'Associate Web Developer',
    company: 'Apxor Technology Solutions Pvt Ltd',
    companyUrl: 'https://apxor.com',
    companyLogo:
      'https://res.cloudinary.com/dtay6zw4c/image/upload/f_auto,q_auto:best/apxor_bebuqj.png',
    location: 'Hyderabad, India',
    period: '07/2023 – 08/2024',
    current: false,
    projects: [
      {
        name: 'Apxor Dashboard — CRA → Vite Migration',
        accent: 'cyan',
        description:
          "Migration of Apxor's legacy Create React App dashboard to a modern Vite-based stack, including the Stories feature and FAB shipped to production.",
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
          'Raised Lighthouse score from 54 → 97 and reduced INP and blocking time from ~500ms to negligible via lazy loading, caching, and image optimisation on the Vite + TypeScript + Tailwind CSS + Shadcn UI stack.',
          'Retained 5+ customer accounts that were at risk of churning — directly attributed to the performance fix.',
          'Shipped the Stories feature (social-media-style) and FAB to production with measurably improved user engagement.',
        ],
      },
      {
        name: 'Apxor Company Website',
        accent: 'green',
        description:
          "Apxor's public-facing marketing website on Webflow, with multi-tool analytics instrumentation across Google Analytics, GTM, Mixpanel, and the Apxor SDK.",
        stack: ['Webflow', 'Google Analytics', 'Google Tag Manager', 'Mixpanel', 'Apxor SDK'],
        bullets: [
          'Insight reports from traffic and performance analytics that directly informed product and design decisions.',
          'Responsive Webflow site maintained across all breakpoints with a full analytics stack (Google Analytics, GTM, Mixpanel, Apxor SDK) instrumented for user behaviour tracking.',
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
      'Open-source React component library with TypeScript-first architecture, tree-shaking support, CSS variable theming with Tailwind-ready customisation, and full WAI-ARIA accessibility compliance.',
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'WAI-ARIA', 'Monorepo'],
    links: {
      live: 'https://zenithui.chandubobbili.dev',
      github: 'https://github.com/ChanduBobbili/ZenithUi',
    },
    featured: true,
    stats: [
      { label: 'npm downloads', value: 'https://img.shields.io/npm/dw/@zenithui/day-picker.png' },
      {
        label: 'GitHub stars',
        value: 'https://img.shields.io/github/stars/ChanduBobbili/ZenithUI.png?style=flat',
      },
      {
        label: 'License',
        value: 'https://img.shields.io/github/license/ChanduBobbili/ZenithUI.png',
      },
    ],
  },
  {
    title: 'changesetgoo',
    subtitle: 'Go CLI for Semantic Versioning & Changelog Management',
    tag: 'Open Source · CLI',
    accent: 'cyan',
    description:
      'Lightweight Go CLI for semantic versioning and changelog management — inspired by the JavaScript Changesets tool, shipped as a single binary with no Node.js runtime; supports add, version, tag, and publish workflows.',
    stack: ['Go', 'CLI', 'Semantic Versioning', 'Git'],
    links: {
      github: 'https://github.com/ChanduBobbili/changesetgoo',
    },
    featured: true,
    stats: [
      {
        label: 'GitHub stars',
        value: 'https://img.shields.io/github/stars/ChanduBobbili/changesetgoo.png?style=flat',
      },
      {
        label: 'License',
        value: 'https://img.shields.io/github/license/ChanduBobbili/changesetgoo.png',
      },
      {
        label: 'Go Reference',
        value: 'https://pkg.go.dev/badge/github.com/ChanduBobbili/changesetgoo.svg',
      },
      {
        label: 'Go Report Card',
        value: 'https://goreportcard.com/badge/github.com/ChanduBobbili/changesetgoo',
      },
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
  {
    category: 'Frontend',
    accent: 'purple',
    items: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'Webflow',
      'TanStack',
      'Zustand',
      'Shadcn UI',
      'Vitest',
      'Playwright',
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
