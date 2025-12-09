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
  bioShort: string;
  available: boolean;
}

// =============================================================================
// DATA
// =============================================================================

export const personalInfo: PersonalInfo = {
  name: "Tchandikou U. Shalom",
  title: "Développeur Frontend | React | Next.js",
  location: "📍 Localisation: Togo ",
  avatar: "/assets/p1.jpeg",
  bio: "Passionné par le développement web et les nouvelles technologies, je crée des applications modernes et performantes avec une attention particulière à l'expérience utilisateur et au design. Toujours en quête d'apprentissage et d'innovation, j'aime relever de nouveaux défis et transformer des idées en produits concrets.",
  bioShort:
    "Développeur Frontend passionné par la création d'applications web modernes et performantes.",
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
    title: "Développeur Frontend",
    company: "Connect Studio",
    period: "Juin 2025 - Novembre 2025",
    description:
      "Développement d'applications web modernes avec React, Next.js et intégration d'API RESTful.",
  },
  {
    id: "2",
    title: "Développeur Frontend",
    company: "Legombo",
    period: "juin 2024 - Novembre 2024",
    description:
      "Création d'interfaces utilisateur réactives et integration API.",
  },
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Licence en Informatique (Architecture Logiciel)",
    school:
      "Ecole Supérieure de Gestion, d'Informatique et des Sciences (ESGIS)",
    period: "2022 - 2025",
  },
  {
    id: "2",
    degree: "Baccalauréat Serie D",
    school: "Lycée Moderne BAD d'ayamé (Côte d'Ivoire)",
    period: "2021 - 2022",
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
    value: "github.com/CianusDev",
    href: "https://github.com/CianusDev",
    hoverColor: "hover:text-white",
  },
  {
    id: "email",
    icon: "email",
    label: "Email",
    value: "ujashalomtchandikou@gmail.com",
    href: "mailto:ujashalomtchandikou@gmail.com",
    hoverColor: "hover:text-red-400",
  },
  {
    id: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/uja-shalom-tchandikou-680021303",
    href: "https://linkedin.com/in/uja-shalom-tchandikou-680021303",
    hoverColor: "hover:text-blue-400",
  },
  {
    id: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    value: "+228 79 64 83 98",
    href: "https://wa.me/+22879648398",
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
