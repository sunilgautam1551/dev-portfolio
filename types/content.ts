export interface Identity {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinHandle: string;
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
