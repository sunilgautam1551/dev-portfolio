import type {
  AchievementEntry,
  CaseStudy,
  EducationEntry,
  EngineeringPillar,
  ExperienceEntry,
  HomeSkillGroup,
  Identity,
  NavSection,
  ProjectEntry,
  SecondaryProject,
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
  github: "https://github.com/sunilgautam1551",
};

export const tagline =
  "I architect and build scalable frontend systems that power complex products, with a focus on performance, maintainability, and exceptional user experiences.";

export const heroTechTags = ["React", "TypeScript", "Next.js", "Frontend Architecture"];

export const heroStats = [
  "6 Years",
  "Enterprise SaaS",
  "Real-Time Systems",
  "Data-Intensive Interfaces",
  "Performance & Architecture",
];

export const summary = `I'm a Senior Frontend Engineer with 6 years of experience building scalable, high-performance SaaS and enterprise web applications using React.js, Next.js, TypeScript, and modern frontend architectures. My expertise spans frontend architecture, design systems, performance optimization, accessibility (WCAG 2.2), and enterprise-grade UI engineering. I have a proven track record of leading frontend initiatives, mentoring developers, and delivering scalable platforms with real-time workflows and high-volume data visualization.`;

export const engineeringPillars: EngineeringPillar[] = [
  {
    title: "Frontend Architecture",
    description:
      "Component-driven React + Next.js App Router foundations and shared design systems — built so legacy and modern UI can coexist mid-migration, not just greenfield builds. Micro-frontend strategies keep large product surfaces independently shippable.",
    icon: "Boxes",
  },
  {
    title: "Performance",
    description:
      "Profile first, then fix what's actually slow: route-based code splitting, lazy loading, memoization, virtualization for high-traffic workflows, and asset optimization — trimmed until the render path and bundle graph are measurably leaner.",
    icon: "Gauge",
  },
  {
    title: "Enterprise UI & Data",
    description:
      "High-density dashboards, real-time asset-tracking maps, and large data grids built with Ag-Grid, Highcharts, and Leaflet — with marker clustering and rendering optimizations so thousands of live data points stay smooth and legible.",
    icon: "LayoutGrid",
  },
  {
    title: "Security & Auth",
    description:
      "Enterprise-grade authentication and authorization with Keycloak, Okta, and NextAuth — modeling fine-grained RBAC/ABAC access control so every role sees exactly the modules it should, nothing more.",
    icon: "ShieldCheck",
  },
];

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
    items: ["Keycloak", "Okta", "NextAuth", "Docusaurus", "Decap CMS"],
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

/**
 * Condensed view of the same skill set for the homepage — the full
 * `skillGroups` list above stays comprehensive for ATS parsing on /resume,
 * but a portfolio page reads better with a handful of high-signal groups
 * plus a lightweight catch-all rather than every keyword boxed and labeled.
 */
export const homeSkillGroups: HomeSkillGroup[] = [
  {
    title: "Core",
    icon: "Code2",
    items: [
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "Next.js",
      "React Testing Library",
      "Jest",
      "Redux/Toolkit",
    ],
  },
  {
    title: "Architecture",
    icon: "Boxes",
    items: [
      "Frontend Architecture",
      "Design Systems",
      "Component-Driven Development",
      "Micro-Frontends",
    ],
  },
  {
    title: "Enterprise UI",
    icon: "LayoutGrid",
    items: [
      "Material UI",
      "Ag-Grid",
      "Highcharts",
      "Leaflet",
      "ShadCN UI",
      "Tailwind CSS",
      "SCSS/SASS",
    ],
  },
  {
    title: "Backend",
    icon: "Database",
    items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Prisma", "GraphQL"],
  },
];

export const alsoWorkedWith = [
  "Redux Toolkit",
  "TanStack Query",
  "Material React Table",
  "Jest",
  "Prisma",
  "React Testing Library",
  "Enzyme",
  "OpenLayers",
  "TanStack Table",
  "WCAG 2.2 Accessibility",
  "Keycloak",
  "Okta",
  "NextAuth",
  "RBAC/ABAC",
  "Docusaurus",
  "Decap CMS",
  "GitLab CI/CD",
  "Docker",
  "Figma",
  "Agile/Scrum",
];

export const experience: ExperienceEntry[] = [
  {
    role: "Senior Software Engineer",
    company: "Dot AI",
    period: "Feb 2024 — Jul 2026",
    location: "Remote",
    highlights: [
      "Reduced bundle size by 30% and improved application load performance by 35% through route-based code splitting, lazy loading, rendering optimization, memoization, and asset optimization strategies.",
      "Revamped high-volume real-time map tracking infrastructure using Leaflet clustering and rendering optimization techniques to efficiently support 10k+ live asset markers with improved rendering stability.",
      "Architected a scalable dual-design migration strategy enabling legacy and modern UI systems to coexist, accelerating modernization without disrupting ongoing product delivery.",
      "Led migration to Next.js App Router architecture and established reusable component-driven frontend foundations using Material UI and TypeScript.",
      "Spearheaded frontend modernization initiatives for an AI-powered logistics intelligence platform, improving application scalability, consistency, and enterprise workflow usability across customer-facing modules.",
      "Introduced frontend engineering standards including reusable architecture patterns, linting, documentation practices, scalable folder structures, and testing foundations using Jest and React Testing Library.",
      "Implemented WCAG 2.2 accessibility standards and enhanced authorization workflows using ABAC models integrated with Keycloak, Okta, and NextAuth.",
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
      "Okta",
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
      "Took scalable grid and charting solutions from early prototypes to production, improving dashboard rendering performance and user interaction efficiency.",
      "Led development of enterprise analytics dashboards and data visualization workflows using React.js, Redux, Ag-Grid, and Highcharts for critical business insights.",
      "Built reusable component-driven frontend architecture using React.js, TypeScript, SCSS, and Material UI to enhance maintainability and consistency.",
      "Managed framework upgrades, dependency modernization, and third-party integrations while ensuring minimal production impact and improved stability.",
      "Collaborated with cross-functional teams on sprint planning, backlog refinement, estimations, and architecture discussions in Agile delivery cycles.",
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
      "Implemented secure enterprise authorization workflows using Keycloak, Okta, NextAuth, RBAC, and ABAC-based access control models.",
      "Led frontend modernization initiatives including Next.js 14 migration, Material UI v5 upgrades, reusable design system foundations, and scalable shared component architecture.",
      "Introduced frontend testing practices along with performance optimizations including API caching, lazy loading, and virtualization for high-traffic workflows.",
      "Collaborated with product, backend, DevOps, and design teams to deliver scalable SaaS platform capabilities in Agile environments.",
      "Owned technical estimation, architecture reviews, and pull request reviews as the senior frontend voice on the team, while mentoring engineers on React architecture and performance best practices.",
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

/**
 * Two deep case studies instead of a shallow project list — this is what
 * the homepage "Work" section actually renders. `projects` above stays
 * intact for the comprehensive /resume rendering.
 *
 * No screenshots or live links: the underlying products are confidential.
 * The `visual` key selects an illustrative, generic UI mockup (built from
 * scratch, not the real product) that demonstrates the kind of interface
 * described rather than depicting it literally.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "dot-oracle",
    title: "Dot Oracle",
    org: "Dot AI",
    tagline: "AI-powered Asset Intelligence Platform",
    challenge:
      "A logistics and asset-intelligence SaaS platform needed a frontend that could handle real-time IIoT data and 10K+ live map markers, while migrating off a legacy UI without disrupting active enterprise customers.",
    role: "Frontend architecture, independent module development, technical mentorship, and migration strategy",
    stack: [
      "Next.Js",
      "React.Js",
      "TypeScript",
      "JavaScript",
      "Material UI",
      "Redux Toolkit",
      "Leaflet",
      "Keycloak",
      "NextAuth",
      "TanStack Query",
      "Material React Table",
      "React Testing Library",
      "Jest"
    ],
    problems: [
      "Real-time data at scale — 10K+ live asset markers without rendering slowdown",
      "Legacy → modern UI migration with zero downtime for active customers",
      "Enterprise authorization across modules (Keycloak, Okta, RBAC/ABAC)",
      "A consistent design system across 17 core modules",
      "Owning technical estimation and architecture reviews as the senior frontend voice on the team",
      "Mentoring engineers on React architecture and performance best practices",
    ],
    results: [
      { value: "13/17", label: "core modules built independently" },
      { value: "30%", label: "smaller bundle size" },
      { value: "35%", label: "faster load performance" },
      { value: "10K+", label: "live markers rendered smoothly" },
    ],
    visual: "dashboard",
  },
  {
    id: "docs-portal",
    title: "Knowledge Base / Docs Portal",
    org: "Dot AI",
    tagline: "Centralized documentation platform for customers & internal teams",
    challenge:
      "Technical documentation for customers and internal teams lived across scattered, inconsistent formats. The platform needed a single, role-based home where engineers could write in Markdown while non-technical teammates could still edit and publish content confidently — without waiting on a developer for every change.",
    role: "Frontend architecture, CMS integration, and deployment pipeline",
    stack: ["Docusaurus", "React", "Decap CMS", "GitLab CI/CD", "Markdown", "RBAC"],
    problems: [
      "Centralizing scattered technical docs into one consistent, searchable platform",
      "Giving non-technical teammates a safe, guided way to edit and publish content",
      "Separating customer-facing documentation from internal-only content by role",
      "Keeping every deployed version in sync with source control, automatically",
    ],
    results: [
      { value: "Docusaurus + React", label: "unified documentation platform" },
      { value: "Decap CMS", label: "non-technical content editing enabled" },
      { value: "Role-based access", label: "customer vs. internal doc separation" },
      { value: "GitLab CI/CD", label: "automated, versioned deployments" },
    ],
    visual: "docs",
  },
];

/**
 * No secondary/"also built" projects right now — both real projects have
 * full case studies above. Keep this exported (empty) so the section can
 * come back without touching component code if a third project shows up.
 */
export const secondaryProjects: SecondaryProject[] = [];

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
      "Recognized for successfully delivering critical features on time, demonstrating strong ownership, execution, and a consistent focus on meeting key delivery commitments.",
  },
  {
    title: "Zero-Downtime Platform Migration",
    org: "Dot AI",
    description:
      "Architected and led a phased migration strategy that let legacy and modern UI systems coexist, so the transition never disrupted active enterprise customers.",
  },
  {
    title: "Engineering Mentorship",
    org: "Dot AI",
    description:
      "Actively mentors engineers on React architecture and performance best practices while driving sprint planning, technical estimation, and architecture reviews.",
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
  { id: "engineering", label: "Engineering" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "guestbook", label: "Guestbook" },
  { id: "contact", label: "Contact" },
];
