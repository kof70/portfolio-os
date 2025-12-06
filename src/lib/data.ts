import { type IconName } from "@/components/icons";

// =============================================================================
// TYPES
// =============================================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
}

export interface Skill {
  name: string;
  icon: IconName;
  level?: number; // 0-100
  category: "frontend" | "backend" | "tools" | "other";
}

export interface ContactLink {
  id: string;
  icon: IconName;
  label: string;
  value: string;
  href: string;
  hoverColor: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  available: boolean;
}

// =============================================================================
// DATA
// =============================================================================

export const personalInfo: PersonalInfo = {
  name: "Tchandikou U. Shalom",
  title: "Développeur Full Stack",
  location: "📍 Localisation",
  avatar: "/assets/p2.jpeg",
  bio: "Passionné par le développement web et les nouvelles technologies, je crée des applications modernes et performantes avec une attention particulière à l'expérience utilisateur et au design. Toujours en quête d'apprentissage et d'innovation, j'aime relever de nouveaux défis et transformer des idées en produits concrets.",
  available: true,
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Desktop",
    description:
      "Un portfolio interactif style macOS avec drag & drop, fenêtres et dock animé.",
    image: "/assets/bg-3.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "2",
    title: "E-Commerce App",
    description:
      "Application e-commerce complète avec panier, paiement et gestion des commandes.",
    image: "/assets/bg-1.jpg",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com",
  },
  {
    id: "3",
    title: "Chat Application",
    description:
      "Application de chat en temps réel avec WebSockets et authentification.",
    image: "/assets/macos-bg.jpg",
    tags: ["React", "Socket.io", "Express", "JWT"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Développeur Full Stack",
    company: "Entreprise XYZ",
    period: "2022 - Présent",
    description:
      "Développement d'applications web modernes avec React, Next.js et Node.js.",
  },
  {
    id: "2",
    title: "Développeur Front-end",
    company: "Startup ABC",
    period: "2020 - 2022",
    description: "Création d'interfaces utilisateur réactives et accessibles.",
  },
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Master en Informatique",
    school: "Université XYZ",
    period: "2018 - 2020",
  },
  {
    id: "2",
    degree: "Licence en Informatique",
    school: "Université ABC",
    period: "2015 - 2018",
  },
];

export const skills: Skill[] = [
  { name: "TypeScript", icon: "typescript", level: 90, category: "frontend" },
  { name: "React", icon: "react", level: 95, category: "frontend" },
  { name: "Next.js", icon: "nextjs", level: 85, category: "frontend" },
  { name: "Tailwind CSS", icon: "tailwind", level: 90, category: "frontend" },
  { name: "Node.js", icon: "nodejs", level: 80, category: "backend" },
  { name: "Git", icon: "git", level: 85, category: "tools" },
];

export const contactLinks: ContactLink[] = [
  {
    id: "github",
    icon: "github",
    label: "GitHub",
    value: "github.com/username",
    href: "https://github.com",
    hoverColor: "hover:text-white",
  },
  {
    id: "email",
    icon: "email",
    label: "Email",
    value: "contact@example.com",
    href: "mailto:contact@example.com",
    hoverColor: "hover:text-red-400",
  },
  {
    id: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/username",
    href: "https://linkedin.com",
    hoverColor: "hover:text-blue-400",
  },
  {
    id: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    value: "+33 6 XX XX XX XX",
    href: "https://wa.me/33600000000",
    hoverColor: "hover:text-green-400",
  },
];

export const interests: string[] = [
  "🎮 Gaming",
  "📚 Lecture",
  "🎵 Musique",
  "🏋️ Sport",
  "✈️ Voyage",
  "🎬 Cinéma",
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const getSkillsByCategory = (category: Skill["category"]) =>
  skills.filter((skill) => skill.category === category);

export const getProjectById = (id: string) =>
  projects.find((project) => project.id === id);

export const getExperienceById = (id: string) =>
  experiences.find((exp) => exp.id === id);
