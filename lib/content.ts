import type {
  AchievementEntry,
  EducationEntry,
  ExperienceEntry,
  Identity,
  NavSection,
  ProjectEntry,
  SkillGroup,
} from "@/types/content";

export const identity: Identity = {
  name: "Sunil Gautam",
  title: "Senior Frontend Engineer",
  location: "Chandigarh, India",
  email: "sunil904gautam@gmail.com",
  phone: "+91 8837877083",
  linkedin: "https://linkedin.com/in/sunil-gautam-308937170",
  linkedinHandle: "linkedin.com/in/sunil-gautam-308937170",
};

export const tagline =
  "I build fast, accessible, high-density interfaces for enterprise SaaS — from architecture to production rollout.";

export const summary = `I'm a Senior Frontend Engineer with 5.7+ years of experience building scalable, high-performance SaaS and enterprise web applications using React.js, Next.js, TypeScript, and modern frontend architectures. My expertise spans frontend architecture, design systems, performance optimization, accessibility (WCAG 2.2), and enterprise-grade UI engineering. I have a proven track record of leading frontend initiatives, mentoring developers, and delivering scalable platforms with real-time workflows and high-volume data visualization — collaborating closely with product, backend, and DevOps teams to ship maintainable, customer-focused solutions in Agile environments.`;

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Technologies",
    items: [
      "React.js",
      "Next.js (App Router)",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "SCSS/SASS",
      "Tailwind CSS",
      "Material UI",
      "ShadCN UI",
      "Bootstrap",
    ],
  },
  {
    category: "State Management & Data Fetching",
    items: ["Redux", "Redux Toolkit", "TanStack Query", "Context API", "REST API Integration"],
  },
  {
    category: "Testing & Quality",
    items: ["Jest", "React Testing Library", "Enzyme", "ESLint", "Prettier"],
  },
  {
    category: "UI Engineering & Visualization",
    items: [
      "Ag-Grid",
      "Highcharts",
      "Chart.js",
      "Material React Table",
      "TanStack Table",
      "Leaflet",
      "OpenLayers",
      "Google Maps",
    ],
  },
  {
    category: "Frontend Architecture & Performance",
    items: [
      "Frontend Architecture",
      "Design Systems",
      "Component-Driven Development",
      "Micro-Frontends",
      "Performance Optimization",
      "Code Splitting",
      "Lazy Loading",
      "Memoization",
      "Responsive Design",
      "Cross-Browser Compatibility",
      "SEO Optimization",
      "WCAG 2.2 Accessibility",
      "RBAC/ABAC Authorization",
    ],
  },
  {
    category: "Auth & Integration",
    items: ["Keycloak", "NextAuth", "Docusaurus", "Decap CMS"],
  },
  {
    category: "Tools & Workflow",
    items: [
      "Git",
      "GitLab",
      "GitLab CI/CD",
      "Bitbucket",
      "Jira",
      "Husky",
      "Docker",
      "Postman",
      "Swagger",
      "Figma",
      "Adobe XD",
      "VS Code",
      "Visual Studio",
      "Agile/Scrum",
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Senior Software Engineer",
    company: "Dot AI",
    period: "Feb 2024 — Jul 2026",
    location: "Remote",
    highlights: [
      "Spearheaded frontend modernization initiatives for an AI-powered logistics intelligence platform, improving application scalability, consistency, and enterprise workflow usability across customer-facing modules.",
      "Architected a scalable dual-design migration strategy enabling legacy and modern UI systems to coexist, accelerating modernization without disrupting ongoing product delivery.",
      "Reduced bundle size by 30% and improved application load performance by 35% through route-based code splitting, lazy loading, rendering optimization, memoization, and asset optimization strategies.",
      "Revamped high-volume real-time map tracking infrastructure using Leaflet clustering and rendering optimization techniques to efficiently support 10k+ live asset markers with improved rendering stability.",
      "Led migration to Next.js App Router architecture and established reusable component-driven frontend foundations using Material UI and TypeScript.",
      "Introduced frontend engineering standards including reusable architecture patterns, linting, documentation practices, scalable folder structures, and testing foundations using Jest and React Testing Library.",
      "Implemented WCAG 2.2 accessibility standards and enhanced authorization workflows using ABAC models integrated with Keycloak and NextAuth.",
      "Collaborated with backend and DevOps teams to optimize API contracts, caching strategies, CI/CD workflows, and frontend-backend integration efficiency.",
      "Actively contributed to sprint planning, technical estimations, architecture discussions, and pull request reviews while mentoring developers on React architecture and frontend performance best practices.",
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "Material UI",
      "HTML5",
      "CSS3",
      "Jest",
      "React Testing Library",
      "Keycloak",
      "Leaflet",
      "Material React Table",
      "TanStack Query",
      "GitLab",
      "ESLint",
      "Prettier",
      "Husky",
    ],
  },
  {
    role: "Senior Software Developer",
    company: "Hexagon",
    period: "Sep 2021 — Jan 2024",
    location: "Hyderabad, India",
    highlights: [
      "Led development of enterprise analytics dashboards and data visualization workflows using React.js, Redux, Ag-Grid, and Highcharts for critical business insights.",
      "Delivered POCs and production-ready scalable grid and charting solutions, improving dashboard rendering performance and user interaction efficiency.",
      "Built reusable component-driven frontend architecture using React.js, TypeScript, SCSS, and Material UI to enhance maintainability and consistency.",
      "Collaborated with cross-functional teams on sprint planning, backlog refinement, estimations, and architecture discussions in Agile delivery cycles.",
      "Managed framework upgrades, dependency modernization, and third-party integrations while ensuring minimal production impact and improved stability.",
      "Contributed to REST API design discussions and optimized frontend-backend integration for efficient data handling.",
    ],
    stack: [
      "HTML5",
      "CSS3",
      "SCSS/SASS",
      "React.js",
      "Redux",
      "JavaScript",
      "TypeScript",
      "Material UI",
      "Neo4j",
      ".NET Core",
      "Jest",
      "Enzyme",
      "Kafka",
    ],
  },
  {
    role: "Software Developer",
    company: "Daffodil Software",
    period: "Jan 2021 — Sep 2021",
    location: "Chandigarh, India",
    highlights: [
      "Developed scalable React.js applications and reusable UI components with focus on maintainability, asynchronous workflows, and responsive user experiences.",
      "Optimized Node.js and Express.js APIs by restructuring endpoints and improving query efficiency, reducing redundant data fetching and improving frontend responsiveness.",
      "Built and optimized full-stack workflows using React.js, Node.js, Express.js, and MongoDB across multiple business modules.",
      "Resolved critical production issues and implemented frontend optimizations that improved application stability, functionality, and performance.",
    ],
    stack: [
      "HTML5",
      "CSS3",
      "React.js",
      "Redux",
      "JavaScript",
      "TypeScript",
      "Material UI",
      "jQuery",
      "MongoDB",
      "Node.js",
      "Express.js",
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    title: "Dot Oracle",
    org: "Dot AI",
    description:
      "An AI-powered Asset Intelligence SaaS platform integrated with IIoT hardware, enabling real-time monitoring, tracking, and management of assets — enhancing operational visibility, supply chain efficiency, safety, and decision-making across logistics and multiple industry domains.",
    highlights: [
      "Independently developed 13 of 17 core enterprise modules for a real-time AI-powered logistics and asset intelligence platform.",
      "Led a phased frontend transformation strategy enabling legacy and redesigned applications to coexist using Next.js hybrid routing, ensuring smooth migration, zero-downtime rollout, and seamless user transition.",
      "Rebuilt the new application from scratch by redesigning and developing core business modules with a scalable component-driven architecture, improving maintainability and UI consistency.",
      "Implemented secure enterprise authorization workflows using Keycloak, NextAuth, RBAC, and ABAC-based access control models.",
      "Led frontend modernization initiatives including Next.js 14 migration, Material UI v5 upgrades, reusable design system foundations, and scalable shared component architecture.",
      "Introduced frontend testing practices along with performance optimizations including API caching, lazy loading, and virtualization for high-traffic workflows.",
      "Collaborated with product, backend, DevOps, and design teams to deliver scalable SaaS platform capabilities in Agile environments.",
    ],
  },
  {
    title: "Knowledge Base / Docs Portal",
    org: "Dot AI",
    description:
      "A centralized, role-based documentation platform built for customers and internal teams to efficiently manage and maintain technical documentation.",
    highlights: [
      "Developed enterprise documentation platform using Docusaurus and React.js to centralize technical documentation workflows.",
      "Integrated Decap CMS enabling non-technical teams to manage and publish documentation independently.",
      "Implemented role-based access workflows, documentation versioning, and automated deployment pipelines using GitLab CI/CD.",
    ],
  },
];

export const achievements: AchievementEntry[] = [
  {
    title: "High-Impact Contribution Recognition",
    org: "Dot AI",
    description:
      "Demonstrated technical ownership, decisive problem-solving, and delivery excellence, later advancing into frontend leadership and guiding team initiatives.",
  },
  {
    title: '"Pat on the Back" Award (x2)',
    org: "Hexagon",
    description:
      "Awarded twice for consistently delivering exceptional results and demonstrating outstanding performance.",
  },
  {
    title: "Reward and Recognition",
    org: "Daffodil Software",
    description:
      "Recognized for rapid issue resolution, product quality improvements, and timely delivery of critical production fixes.",
  },
];

export const education: EducationEntry = {
  degree: "Bachelor's in Computer Science and Engineering",
  school: "Chandigarh University",
  period: "2017 — 2021",
  cgpa: "7.69",
};

export const navSections: NavSection[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "achievements", label: "Achievements" },
  { id: "guestbook", label: "Guestbook" },
  { id: "contact", label: "Contact" },
];
