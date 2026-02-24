"use client";

import * as React from "react";
import { useLanguage } from "@/hooks/use-language";
import {
  contactLinks as baseContactLinks,
  education as baseEducation,
  events as baseEvents,
  experiences as baseExperiences,
  interests as baseInterests,
  personalInfo as basePersonalInfo,
  projects as baseProjects,
  skills as baseSkills,
  type Event,
  type Experience,
  type PersonalInfo,
  type Project,
  type Education,
  type Skill,
  type ContactLink,
} from "@/lib/data";

type LocalizedPair = { fr: string; en: string };

const PERSONAL_COPY: {
  title: LocalizedPair;
  subtitle: LocalizedPair;
  bio: LocalizedPair;
  bioShort: LocalizedPair;
  aboutParagraphs: { fr: string[]; en: string[] };
} = {
  title: {
    fr: "Backend · DevOps · Nest.js · Node.js | Human AI Ambassador | Co-fondateur de Python Togo & ETH Lome | Rekap",
    en: "Backend · DevOps · Nest.js · Node.js | Human AI Ambassador | Co-founder of Python Togo & ETH Lome | Rekap",
  },
  subtitle: {
    fr: "Backend & Full-Stack · DevOps · Média & production",
    en: "Backend & Full-Stack · DevOps · Media & production",
  },
  bio: {
    fr: "Développeur backend et DevOps orienté architecture, déploiement (Coolify, Docker) et fiabilité en production. Backend principal de alonu.tech, co-fondateur de Python Togo et ETH Lome, Human AI Ambassador, et auteur du Coolify MCP Server.",
    en: "Backend and DevOps developer focused on architecture, deployment (Coolify, Docker), and production reliability. Main backend engineer for alonu.tech, co-founder of Python Togo and ETH Lome, Human AI Ambassador, and author of the Coolify MCP Server.",
  },
  bioShort: {
    fr: "Backend · DevOps · Développeur logiciel · Human AI Ambassador · Co-fondateur Python Togo & ETH Lome.",
    en: "Backend · DevOps · Software Developer · Human AI Ambassador · Co-founder of Python Togo & ETH Lome.",
  },
  aboutParagraphs: {
    fr: [
      "Je suis développeur backend, full-stack et DevOps basé à Lome, Togo. Je travaille principalement comme backend engineer et architecte d'infrastructure.",
      "Mon coeur de métier est de concevoir des API robustes, d'orchestrer les déploiements (Coolify, Docker, CI/CD) et de livrer des systèmes fiables en Nest.js et Node.js.",
      "J'interviens aussi sur le mobile (React Native), le frontend web (Next.js + TypeScript) et la production média avec Rekap.",
      "Côté communauté, j'ai co-fondé Python Togo et ETH Lome. Je contribue aussi à l'open source avec le Coolify MCP Server.",
      "J'aime relier produit, design et contraintes techniques pour livrer des solutions durables et utiles.",
    ],
    en: [
      "I am a backend, full-stack, and DevOps developer based in Lome, Togo. I work primarily as a backend engineer and infrastructure architect.",
      "My core focus is building robust APIs, orchestrating deployments (Coolify, Docker, CI/CD), and shipping reliable systems in Nest.js and Node.js.",
      "I also work on mobile (React Native), web frontend (Next.js + TypeScript), and media production with Rekap.",
      "On the community side, I co-founded Python Togo and ETH Lome. I also contribute to open source with the Coolify MCP Server.",
      "I like connecting product, design, and technical constraints to deliver practical and durable solutions.",
    ],
  },
};

const PROJECT_COPY: Record<string, LocalizedPair> = {
  "17": {
    fr: "Application mobile SES avec backend Supabase pour la gestion opérationnelle: clients, agents, affectations, pointage, notifications et administration.",
    en: "SES mobile app with Supabase backend for operations: clients, agents, assignments, attendance, notifications, and administration.",
  },
  "16": {
    fr: "Projet d'agent IA lancé pendant le hackathon Digital Ocean sur Devpost. En cours de développement.",
    en: "AI agent project started during the Digital Ocean Devpost hackathon. Currently in development.",
  },
  "15": {
    fr: "Média dédié à la couverture audiovisuelle d'événements tech et culturels au Togo et au Bénin.",
    en: "Media initiative focused on audiovisual coverage of tech and cultural events across Togo and Benin.",
  },
  "14": {
    fr: "Backend complet de alonu.tech en Nest.js: architecture, API, sécurité et déploiement.",
    en: "Complete backend for alonu.tech in Nest.js: architecture, APIs, security, and deployment.",
  },
  "13": {
    fr: "API backend pour un projet de vente et location de voitures.",
    en: "Backend API for a car sales and rental platform.",
  },
  "12": { fr: "Projet web pour gnonel.com.", en: "Web project for gnonel.com." },
  "11": {
    fr: "Dashboard de gestion pour afriqueinformatique.net.",
    en: "Management dashboard for afriqueinformatique.net.",
  },
  "10": {
    fr: "Applications de gestion SES/CGSP: backend, sécurité, DevOps, déploiement et supervision.",
    en: "SES/CGSP management apps: backend, security, DevOps, deployment, and monitoring.",
  },
  "9": {
    fr: "Application mobile React Native pour commandes, suivi et livraison.",
    en: "React Native mobile app for ordering, tracking, and delivery.",
  },
  "8": {
    fr: "Addon Stremio (catalogue, métadonnées, streams) basé sur du scraping.",
    en: "Stremio addon (catalog, metadata, streams) powered by scraping.",
  },
  "7": {
    fr: "Serveur MCP pour l'API Coolify afin de piloter un PaaS self-hosted depuis des assistants IA.",
    en: "MCP server for the Coolify API to control self-hosted PaaS from AI assistants.",
  },
  "6": {
    fr: "Workspace collaboratif local avec synchronisation temps réel via WebSocket.",
    en: "Local collaborative workspace with real-time WebSocket synchronization.",
  },
  "5": {
    fr: "Outil de design de contributions GitHub avec formes, import d'images et scheduling de commits.",
    en: "GitHub contribution pattern designer with templates, image import, and commit scheduling.",
  },
  "4": {
    fr: "Plateforme open source de mise en relation startups / investisseurs.",
    en: "Open-source platform connecting startups and investors.",
  },
  "3": {
    fr: "Conception et déploiement d'une infrastructure réseau campus haute densité.",
    en: "Design and rollout of a high-density campus network infrastructure.",
  },
  "2": {
    fr: "Installation et sécurisation d'un réseau hospitalier avec redondance.",
    en: "Hospital network installation and hardening with redundancy.",
  },
  "1": {
    fr: "Déploiement complet réseau et Wi-Fi pour un établissement hospitalier.",
    en: "Complete network and Wi-Fi deployment for a hospital environment.",
  },
};

const EXPERIENCE_COPY: Record<string, { title: LocalizedPair; description: LocalizedPair; period?: LocalizedPair }> = {
  "12": {
    title: { fr: "Testeur freelance", en: "Freelance Tester" },
    period: { fr: "2024 - Présent", en: "2024 - Present" },
    description: {
      fr: "Tests logiciels freelance via Testerworks et GitHub sur plusieurs applications.",
      en: "Freelance software testing through Testerworks and GitHub across multiple applications.",
    },
  },
  "11": {
    title: { fr: "Développeur Full-Stack -> Backend & DevOps", en: "Full-Stack Developer -> Backend & DevOps" },
    period: { fr: "Oct. 2025 - Présent", en: "Oct. 2025 - Present" },
    description: {
      fr: "Transition vers la responsabilité backend & DevOps: API, architecture et déploiement multi-applications.",
      en: "Moved into backend and DevOps ownership: APIs, architecture, and multi-application deployment.",
    },
  },
  "10": {
    title: { fr: "Développeur mobile", en: "Mobile Developer" },
    description: {
      fr: "Conception et livraison de l'application SES Mobile avec backend Supabase.",
      en: "Designed and shipped SES Mobile with a Supabase backend.",
    },
  },
  "9": {
    title: { fr: "Co-fondateur & Responsable production", en: "Co-founder & Production Lead" },
    period: { fr: "Juin 2025 - Présent", en: "Jun. 2025 - Present" },
    description: {
      fr: "Pilotage production média, partenariats et couverture de 20+ événements.",
      en: "Led media production, partnerships, and coverage for 20+ events.",
    },
  },
  "8": {
    title: { fr: "Semi-finaliste", en: "Semi-finalist" },
    description: { fr: "Semi-finaliste D-clic avec Mayeutic.", en: "D-clic semi-finalist with Mayeutic." },
  },
  "7": {
    title: { fr: "Développeur", en: "Developer" },
    description: { fr: "Création et lancement de Gitpath.", en: "Built and launched Gitpath." },
  },
  "6": {
    title: { fr: "Assistant formateur web", en: "Assistant Web Trainer" },
    description: { fr: "Conception de supports pour 80+ apprenants.", en: "Designed training materials for 80+ learners." },
  },
  "5": {
    title: { fr: "Co-fondateur", en: "Co-founder" },
    description: { fr: "Organisation du satellite Devcon au Togo.", en: "Organized the Devcon satellite event in Togo." },
  },
  "4": {
    title: { fr: "Speaker & Organisateur", en: "Speaker & Organizer" },
    description: { fr: "Session sur les fondamentaux Git & GitHub.", en: "Delivered a session on Git & GitHub fundamentals." },
  },
  "3": {
    title: { fr: "Co-fondateur & Co-organisateur PyCon Togo", en: "Co-founder & Co-organizer, PyCon Togo" },
    period: { fr: "Nov. 2024 - Présent", en: "Nov. 2024 - Present" },
    description: { fr: "Animation de la communauté Python au Togo.", en: "Built and animated the Python community in Togo." },
  },
  "2": {
    title: { fr: "Technicien réseaux", en: "Network Technician" },
    description: { fr: "Déploiement et maintenance réseau sur plusieurs sites.", en: "Delivered network deployment and maintenance across multiple sites." },
  },
  "1": {
    title: { fr: "Human AI Ambassador", en: "Human AI Ambassador" },
    period: { fr: "Juin 2024 - Présent", en: "Jun. 2024 - Present" },
    description: { fr: "Promotion d'une IA utile au développement durable en Afrique.", en: "Promoting practical AI for sustainable development in Africa." },
  },
};

const EVENT_COPY: Record<string, { title: LocalizedPair; date?: LocalizedPair; description: LocalizedPair }> = {
  "10": {
    title: { fr: "Hackathon Digital Ocean — Agents IA", en: "Digital Ocean Hackathon — AI Agents" },
    date: { fr: "Janv. 2026 - En cours", en: "Jan. 2026 - Ongoing" },
    description: { fr: "Participation au hackathon Digital Ocean sur les agents IA.", en: "Participating in the Digital Ocean hackathon focused on AI agents." },
  },
  "5": {
    title: { fr: "Speaker & Organisateur Git/GitHub", en: "Speaker & Organizer — Git/GitHub" },
    date: { fr: "Déc. 2024", en: "Dec. 2024" },
    description: { fr: "Intervention technique sur Git et GitHub à Lome.", en: "Technical talk on Git and GitHub fundamentals in Lome." },
  },
  "12": {
    title: { fr: "Speaker — Product / Project Manager (TCC)", en: "Speaker — Product / Project Manager (TCC)" },
    date: { fr: "Fév. 2025", en: "Feb. 2025" },
    description: { fr: "Intervention sur les compétences et opportunités du rôle PM.", en: "Talk about PM skills, challenges, and opportunities." },
  },
  "14": {
    title: { fr: "Premier Devcon satellite ETH Lome", en: "First ETH Lome Devcon Satellite" },
    date: { fr: "Janv. 2025", en: "Jan. 2025" },
    description: { fr: "Organisation du premier satellite Devcon au Togo.", en: "Organized the first Devcon satellite event in Togo." },
  },
  "11": {
    title: { fr: "Kiro Halloween", en: "Kiro Halloween" },
    description: { fr: "Soumission du projet Drive pendant le hackathon.", en: "Submitted the Drive project during the hackathon." },
  },
  "8": {
    title: { fr: "Amazon Hackathon", en: "Amazon Hackathon" },
    date: { fr: "Août 2025", en: "Aug. 2025" },
    description: { fr: "Participation avec un projet open source.", en: "Participation with an open-source project." },
  },
  "7": {
    title: { fr: "Amazon Kiro Hackathon", en: "Amazon Kiro Hackathon" },
    date: { fr: "Juillet 2025", en: "Jul. 2025" },
    description: { fr: "Développement d'un outil d'analyse frame-by-frame pour vidéos sociales.", en: "Built a frame-by-frame source analysis tool for social videos." },
  },
  "6": {
    title: { fr: "Bolt Hackathon", en: "Bolt Hackathon" },
    date: { fr: "Juin 2025", en: "Jun. 2025" },
    description: { fr: "Participation avec un projet open source.", en: "Participation with an open-source project." },
  },
  "9": {
    title: { fr: "Finaliste — Programme entrepreneurial OIF/CUBE", en: "Finalist — OIF/CUBE Entrepreneurship Program" },
    date: { fr: "Avril 2025", en: "Apr. 2025" },
    description: { fr: "Finaliste du programme avec le projet Mayele (ensuite Rekap).", en: "Finalist with the Mayele project (later restructured into Rekap)." },
  },
  "13": {
    title: { fr: "Teknolime — Réseaux informatiques (Tsévié)", en: "Teknolime — Computer Networks (Tsevie)" },
    date: { fr: "23-25 avril 2025", en: "Apr. 23-25, 2025" },
    description: { fr: "Session réseaux pour collégiennes/lycéennes: routeur, SSID, IP, sécurité Wi-Fi.", en: "Networks session for girls: router, SSID, IP, and Wi-Fi security basics." },
  },
  "15": {
    title: { fr: "Staff — 1ère Compétition Nationale de Robotique (Togo)", en: "Staff — 1st National Robotics Competition (Togo)" },
    description: { fr: "Membre du staff et coordination logistique de l'événement.", en: "Staff member supporting event logistics and coordination." },
  },
  "1": {
    title: { fr: "Co-fondateur & Co-organisateur PyCon Togo", en: "Co-founder & Co-organizer, PyCon Togo" },
    date: { fr: "Nov. 2024 - Présent", en: "Nov. 2024 - Present" },
    description: { fr: "Structuration et animation de la communauté Python au Togo.", en: "Built and animated the Python community in Togo." },
  },
  "4": {
    title: { fr: "Workshop Google", en: "Google Workshop" },
    description: { fr: "Participation sur invitation à un workshop Google.", en: "Invited participant in an exclusive Google workshop." },
  },
  "3": {
    title: { fr: "PyCon Africa - Accra", en: "PyCon Africa - Accra" },
    description: { fr: "Participation en représentation de la communauté Python Togo.", en: "Attended as a representative of the Python Togo community." },
  },
};

const EDUCATION_COPY: Record<string, { degree: LocalizedPair; school?: LocalizedPair; period?: LocalizedPair }> = {
  "2": {
    degree: { fr: "Formation Développement Full Stack", en: "Full-Stack Development Training" },
    school: { fr: "Autodidacte & certifications en ligne", en: "Self-taught & online certifications" },
    period: { fr: "2021 - Présent", en: "2021 - Present" },
  },
  "1": {
    degree: { fr: "Ingénierie Réseaux & Télécommunications", en: "Network and Telecommunications Engineering" },
    school: { fr: "Formation spécialisée en infrastructure réseau", en: "Specialized training in network infrastructure" },
  },
};

const INTERESTS_COPY: { fr: string[]; en: string[] } = {
  fr: [
    "🌐 Réseaux & Infrastructure",
    "💻 Open Source",
    "👥 Communauté Tech",
    "📚 Partage de connaissances",
    "🚀 Innovation",
    "🎬 Cinéma",
    "🏀 Basketball",
    "📷 Photographie",
    "📖 Lecture",
  ],
  en: [
    "🌐 Networks & Infrastructure",
    "💻 Open Source",
    "👥 Tech Community",
    "📚 Knowledge Sharing",
    "🚀 Innovation",
    "🎬 Cinema",
    "🏀 Basketball",
    "📷 Photography",
    "📖 Reading",
  ],
};

function pick(language: "fr" | "en", pair: LocalizedPair) {
  return pair[language];
}

export function usePortfolioContent() {
  const { language } = useLanguage();

  const personalInfo = React.useMemo<PersonalInfo>(
    () => ({
      ...basePersonalInfo,
      title: pick(language, PERSONAL_COPY.title),
      subtitle: pick(language, PERSONAL_COPY.subtitle),
      bio: pick(language, PERSONAL_COPY.bio),
      bioShort: pick(language, PERSONAL_COPY.bioShort),
      aboutParagraphs: PERSONAL_COPY.aboutParagraphs[language],
    }),
    [language],
  );

  const projects = React.useMemo<Project[]>(
    () =>
      baseProjects.map((project) => {
        const translated = PROJECT_COPY[project.id];
        if (!translated) return project;
        return {
          ...project,
          description: pick(language, translated),
        };
      }),
    [language],
  );

  const experiences = React.useMemo<Experience[]>(
    () =>
      baseExperiences.map((experience) => {
        const translated = EXPERIENCE_COPY[experience.id];
        if (!translated) return experience;
        return {
          ...experience,
          title: pick(language, translated.title),
          period: translated.period ? pick(language, translated.period) : experience.period,
          description: pick(language, translated.description),
        };
      }),
    [language],
  );

  const events = React.useMemo<Event[]>(
    () =>
      baseEvents.map((event) => {
        const translated = EVENT_COPY[event.id];
        if (!translated) return event;
        return {
          ...event,
          title: pick(language, translated.title),
          date: translated.date ? pick(language, translated.date) : event.date,
          description: pick(language, translated.description),
        };
      }),
    [language],
  );

  const education = React.useMemo<Education[]>(
    () =>
      baseEducation.map((item) => {
        const translated = EDUCATION_COPY[item.id];
        if (!translated) return item;
        return {
          ...item,
          degree: pick(language, translated.degree),
          school: translated.school ? pick(language, translated.school) : item.school,
          period: translated.period ? pick(language, translated.period) : item.period,
        };
      }),
    [language],
  );

  const skills = React.useMemo<Skill[]>(() => baseSkills, []);
  const contactLinks = React.useMemo<ContactLink[]>(
    () =>
      baseContactLinks.map((link) => {
        if (link.id !== "phone") return link;
        return { ...link, label: language === "fr" ? "Téléphone" : "Phone" };
      }),
    [language],
  );
  const interests = React.useMemo<string[]>(
    () => INTERESTS_COPY[language] ?? baseInterests,
    [language],
  );

  return {
    language,
    personalInfo,
    projects,
    experiences,
    education,
    events,
    skills,
    contactLinks,
    interests,
  };
}
