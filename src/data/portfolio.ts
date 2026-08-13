/**
 * Central portfolio configuration.
 * Replace the PLACEHOLDER values with real information — no component edits needed.
 */

export const profile = {
  name: "Aryan Singh",
  role: "Frontend Developer",
  shortName: "ARYAN / DEV",
  tagline: "Building modern, interactive and responsive digital experiences.",
  about: [
    "I'm Aryan Singh, a Frontend Developer passionate about building modern, responsive and interactive web experiences.",
    "I enjoy transforming ideas and designs into clean, functional and engaging digital products — with a focus on UI detail, motion and performance.",
  ],
  location: "Delhi NCR",
  availability: "Open to frontend roles",
  email: "aryansinghgro@gmail.com",
  resumePath: "/resume.pdf",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/aryansinghgro-bit", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aryansinghgro-bit", icon: "linkedin" },
  { label: "Email", href: "mailto:aryansinghgro@gmail.com", icon: "mail" },
] as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;

export type SkillCategory = {
  category: string;
  hint: string;
  skills: string[];
};

export const skillGroups: SkillCategory[] = [
  {
    category: "Frontend",
    hint: "Interfaces & interaction",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Programming",
    hint: "Languages & fundamentals",
    skills: ["Java", "C++", "Python"],
  },
  { category: "Mobile", hint: "Cross-platform apps", skills: ["React Native"] },
  {
    category: "Backend / APIs",
    hint: "Data & integration",
    skills: ["REST APIs", "API Integration"],
  },
  { category: "Database", hint: "Persistence & queries", skills: ["SQL"] },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  featured?: boolean;
};
export const projects = [
  {
    id: "01",
    title: "Fake News Detection System",
    description:
      "A full-stack machine learning application that analyzes news headlines and article content and predicts whether the content is likely to be real or fake.",
    technologies: [
      "React",
      "Flask",
      "Python",
      "Scikit-learn",
      "Machine Learning",
    ],
    image: "/images/projects/fake-news.png",
    live: "https://fakenewsdetectionsyst.netlify.app/",
    github: "https://github.com/aryansinghgro-bit/fake-news-detection-",
    featured: true,
  },

  {
    id: "02",
    title: "3d Portfolio Website",
    description:
      "A visually striking 3D portfolio website showcasing my work and skills.",
    technologies: [
      "React",
      "Three.js",
      "Next.js",
      "Tailwind CSS",
    ],
    image: "/images/projects/3d-portfolio.png",
    live: "#",
    github: "https://github.com/aryansinghgro-bit/3d-portfolio",
    featured: true,
  },
];
export const expertise = [
  {
    title: "Frontend Development",
    description: "Component-driven interfaces built with React and modern tooling.",
  },
  {
    title: "UI Development",
    description: "Translating design into pixel-accurate, reusable interface systems.",
  },
  {
    title: "Responsive Design",
    description: "Layouts that hold up from 360px phones to ultrawide displays.",
  },
  {
    title: "API Integration",
    description: "Consuming REST APIs with predictable loading, empty and error states.",
  },
  {
    title: "React Development",
    description: "State, hooks, composition and render-performance aware patterns.",
  },
  {
    title: "Modern CSS",
    description: "Tailwind, design tokens, fluid type, container-aware layouts.",
  },
  {
    title: "Interactive Web Experiences",
    description: "Scroll-driven motion, 3D scenes and micro-interactions with intent.",
  },
];

export const education = [
  {
    period: "2023 — 2027",
    degree: "B.Tech in Computer Science",
    institution: "ITS Engineering College",
    areas: ["Computer Science", "Programming", "Web Development", "Software Development"],
  },
];

/** Nodes for the lightweight 3D technology graph. */
export const techGraph = {
  nodes: [
    { id: "html", label: "HTML", position: [0, -1.7, 0] as const },
    { id: "css", label: "CSS", position: [-2.1, -0.2, 0.5] as const },
    { id: "js", label: "JavaScript", position: [0, 0.3, -0.4] as const },
    { id: "react", label: "React", position: [0, 2, 0.2] as const },
    { id: "next", label: "Next.js", position: [2.1, -0.2, 0.5] as const },
    { id: "tw", label: "Tailwind", position: [1.5, 1.5, -0.9] as const },
  ],
  edges: [
    ["html", "css"],
    ["html", "js"],
    ["css", "react"],
    ["js", "react"],
    ["js", "next"],
    ["react", "next"],
    ["react", "tw"],
  ] as const,
};
