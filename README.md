# Chandu Bobbili — Portfolio

Personal portfolio website for **Bobbili Vijaya Chandu (Chandu)**, a Software Engineer based in Hyderabad, India.

**Live:** [chandubobbili.dev](https://chandubobbili.dev) *(when deployed)*

---

## About

Software Engineer with 3+ years of experience building scalable web applications, microservices, and data-driven systems. I specialize in **TypeScript**, **Go**, and **React**, with a strong focus on real-time analytics platforms, open-source component libraries, and end-to-end engineering from architecture to production.

Currently **Senior Software Engineer @ Deepta AI**, where I've built products like **Klaritics** (SaaS product analytics) and a multi-university **Application Management System** handling lead generation, payments, and admissions at scale.

Open to **full-time roles**, **remote work**, and **relocation**.

**Contact**

- Email: [chandubobbili12@gmail.com](mailto:chandubobbili12@gmail.com)
- GitHub: [github.com/ChanduBobbili](https://github.com/ChanduBobbili)
- LinkedIn: [linkedin.com/in/chandu-bobbili-15863319b](https://linkedin.com/in/chandu-bobbili-15863319b)

---

## Skills

### Languages
TypeScript · Go · JavaScript (ES6+) · Python · HTML · CSS

### Go
Goroutines · Channels · WaitGroup · Mutex · Worker Pools · Context Cancellation · gRPC

### Frontend
React.js · Next.js · TanStack · Zustand · Tailwind CSS · Shadcn UI · Vitest · Playwright · Webflow

### Backend & Messaging
Microservices · REST APIs · Node.js · Express.js · WebSockets · SSE · BFF Pattern · Kafka · gRPC

### Databases
PostgreSQL · MongoDB · ClickHouse · Redis · SQL

### DevOps & Cloud
Docker · Kubernetes (GKE) · GCP · GitHub Actions · GitLab CI/CD · Git

### Other
System Design · JWT / OAuth · Figma · Web APIs · Data Structures & Algorithms

---

## Tech Stack (this project)

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Theme | next-themes (dark / light) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Geist Sans + Geist Mono |
| UI | @zenithui/fab |

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

---

## Project Structure

```
src/
├── app/              # Layout, page, global styles
├── components/
│   ├── layout/       # Navbar, Footer, ThemeProvider
│   ├── sections/     # Hero, About, Projects, Work, Skills, Writing, Contact
│   └── ui/           # ThemeToggle, ResumeDialog, ResumeFab, SocialIcons
├── data/
│   └── portfolio.ts  # All portfolio content (typed)
├── hooks/
│   └── useScrollSpy.ts
└── lib/
    └── utils.ts
```

Content reference for updates: [`PORTFOLIO_CONTENT.md`](./PORTFOLIO_CONTENT.md)

---

## Deploy

Deploy to [Vercel](https://vercel.com) — framework preset: **Next.js**, install command: `pnpm install`, build command: `pnpm build`.

---

## License

Private — personal portfolio project.
