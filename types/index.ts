import type { IconType } from "react-icons";

export type NavItem = {
  label: string;
  href: string;
};

export type Tagline = string;

export type Skill = {
  name: string;
  icon: IconType;
  level: string;
  levelWidthClass: string;
};

export type Project = {
  name: string;
  slug: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
  size: "large" | "small";
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};
