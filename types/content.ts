export interface Identity {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinHandle: string;
  github: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectEntry {
  title: string;
  org: string;
  description: string;
  highlights: string[];
}


export interface EngineeringPillar {
  title: string;
  description: string;
  icon: string;
}

export interface CaseStudyResult {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  org: string;
  tagline: string;
  challenge: string;
  role: string;
  stack: string[];
  problems: string[];
  results: CaseStudyResult[];
  visual: "dashboard" | "analytics" | "docs";
}

export interface SecondaryProject {
  title: string;
  org: string;
  description: string;
}

export interface HomeSkillGroup {
  title: string;
  icon: string;
  items: string[];
}

export interface AchievementEntry {
  title: string;
  org: string;
  description: string;
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  cgpa: string;
}

export interface NavSection {
  id: string;
  label: string;
}
