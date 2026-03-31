import {
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript
} from "react-icons/si";
import { FaAws, FaInstagram, FaLinkedin } from "react-icons/fa6";

import type {
  ExperienceItem,
  NavItem,
  Project,
  Skill,
  SocialLink,
  Tagline,
  Testimonial
} from "@/types";

export const developerName = "Shubham Shah";
export const displayName = "Alex Morgan";

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export const taglineVariants: Tagline[] = [
  "React Developer",
  "Node.js Engineer",
  "Full-Stack Builder"
];

export const aboutKeywords = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "REST APIs",
  "Full-Stack",
  "Open Source"
];

export const skills: Skill[] = [
  { name: "React", icon: SiReact, level: "Expert", levelWidthClass: "w-[92%]" },
  { name: "Next.js", icon: SiNextdotjs, level: "Expert", levelWidthClass: "w-[90%]" },
  { name: "TypeScript", icon: SiTypescript, level: "Expert", levelWidthClass: "w-[93%]" },
  { name: "Node.js", icon: SiNodedotjs, level: "Advanced", levelWidthClass: "w-[88%]" },
  { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced", levelWidthClass: "w-[84%]" },
  { name: "MongoDB", icon: SiMongodb, level: "Advanced", levelWidthClass: "w-[78%]" },
  { name: "Docker", icon: SiDocker, level: "Advanced", levelWidthClass: "w-[80%]" },
  { name: "AWS", icon: FaAws, level: "Advanced", levelWidthClass: "w-[76%]" },
  { name: "Git", icon: SiGit, level: "Advanced", levelWidthClass: "w-[86%]" },
  { name: "Figma", icon: SiFigma, level: "Working fluency", levelWidthClass: "w-[70%]" }
];

export const projects: Project[] = [
  {
    name: "Atelier Commerce",
    slug: "atelier-commerce",
    description: "A luxury e-commerce platform with bespoke storefronts, headless CMS workflows, and lightning-fast checkout journeys.",
    image: "/images/project-1.svg",
    href: "https://github.com/",
    tags: ["Next.js", "Stripe", "Sanity"],
    size: "large"
  },
  {
    name: "Signal OS",
    slug: "signal-os",
    description: "An operations dashboard that unifies customer, billing, and product telemetry into one calm command center.",
    image: "/images/project-2.svg",
    href: "https://github.com/",
    tags: ["React", "Node.js", "PostgreSQL"],
    size: "large"
  },
  {
    name: "Northstar API",
    slug: "northstar-api",
    description: "A scalable backend service layer with typed contracts, resilient queues, and observability-first tooling.",
    image: "/images/project-3.svg",
    href: "https://github.com/",
    tags: ["TypeScript", "Docker", "AWS"],
    size: "small"
  },
  {
    name: "Canvas Notes",
    slug: "canvas-notes",
    description: "A collaborative productivity app focused on fast interactions, offline-first capture, and elegant microflows.",
    image: "/images/project-4.svg",
    href: "https://github.com/",
    tags: ["Next.js", "Prisma", "Framer Motion"],
    size: "small"
  },
  {
    name: "Open Source Lab",
    slug: "open-source-lab",
    description: "A curated set of developer tools and polished internal packages used to speed up product delivery across teams.",
    image: "/images/project-5.svg",
    href: "https://github.com/",
    tags: ["Monorepo", "DX", "CLI"],
    size: "small"
  }
];

export const experiences: ExperienceItem[] = [
  {
    company: "Northline Labs",
    role: "Senior Full-Stack Developer",
    period: "2023 - Present",
    points: [
      "Led the rebuild of a SaaS platform in Next.js, reducing page load times by 42% across key user flows.",
      "Designed shared UI and data patterns that helped product teams ship faster without sacrificing polish.",
      "Partnered with founders on roadmap planning, architecture decisions, and release strategy."
    ]
  },
  {
    company: "Studio Meridian",
    role: "Full-Stack Developer",
    period: "2021 - 2023",
    points: [
      "Built premium marketing and commerce experiences for agency clients in retail, wellness, and finance.",
      "Developed Node.js services and CMS integrations that supported launch-ready content pipelines.",
      "Worked closely with design teams to translate editorial visual systems into performant frontends."
    ]
  },
  {
    company: "Pixel Foundry",
    role: "Frontend Developer",
    period: "2019 - 2021",
    points: [
      "Delivered responsive product interfaces with a strong focus on accessibility, maintainability, and speed.",
      "Improved component reusability and reduced UI regressions by introducing shared patterns and QA checklists.",
      "Contributed to internal tooling and documentation that eased onboarding for new developers."
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Maya Chen",
    role: "Product Design Lead, Northline Labs",
    quote: "Shubham brings the rare mix of engineering precision and design sensitivity. The work always feels considered.",
    initials: "MC"
  },
  {
    name: "Jordan Patel",
    role: "Founder, Canvas Notes",
    quote: "He moves fast, communicates clearly, and turns messy product ideas into interfaces people genuinely enjoy using.",
    initials: "JP"
  },
  {
    name: "Elena Rossi",
    role: "Engineering Manager, Studio Meridian",
    quote: "From architecture to the final motion details, Shubham consistently raises the standard of the entire team.",
    initials: "ER"
  }
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/repos?q=owner%3A%40me",
    icon: SiGithub
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shubham-shah-65aa66373?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: FaLinkedin
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: FaInstagram
  }
];
