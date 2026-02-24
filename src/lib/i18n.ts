import type { Language } from "@/hooks/use-language";

const copy = {
  fr: {
    projects: "Projets",
    about: "À propos",
    contact: "Contact",
    myResume: "Mon CV",
    recommendation: "Recommandation",
    recommendations: "Recommandations",
    community: "Communauté",
    openSource: "Open Source",
    hackathon: "Hackathon",
    company: "Entreprise",
    available: "Disponible",
    aboutMe: "À propos de moi",
    interests: "Centres d'intérêt",
    contactMe: "Contactez-moi",
    contactIntro:
      "Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter !",
    findMeOn: "Retrouvez-moi sur",
    myProjects: "Mes projets",
    projectsIntro: "Découvrez quelques-uns de mes projets récents",
    searchPlaceholder:
      "Rechercher : projet, techno, expérience, contact...",
    searchNoResult: "Aucun résultat pour",
    searchGlobal:
      "Recherche globale : projets, compétences, expériences, événements, contacts.",
    openProjects: "Ouvrir Projets",
    openAbout: "Ouvrir À propos",
    openContact: "Ouvrir Contact",
    openCV: "Ouvrir CV",
    viewAllProjects: "Voir tous les projets",
    contactDetails: "Coordonnées et liens",
    cvSummary: "Expériences, formation et parcours",
    openSearch: "Ouvrir la recherche",
    viewCV: "Voir le CV",
    download: "Télécharger",
    events: "Événements",
    viewEvent: "Voir l'événement",
    noProjectsInCategory:
      "Aucun projet ou événement dans cette catégorie pour le moment.",
    findMe: "Retrouvez-moi sur",
    profileBlurb:
      "Je construis l'infrastructure, les communautés et les médias qui font avancer la tech au Togo. 18+ ⭐ GitHub · 15k+ vues Reddit · 20+ événements couverts · 2 communautés co-fondées.",
    timeline: "Chronologie",
    welcome: "Bienvenue",
    loadingInit: "Initialisation...",
    loadingResources: "Chargement des ressources...",
    loadingUi: "Préparation de l'interface...",
    loadingReady: "Presque prêt...",
    previewUnavailable: "Aperçu indisponible pour ce lien",
    atGlance: "En bref",
    launcher: "Lanceur",
    integrationApi: "Intégration API",
    education: "Éducation",
    event: "Événement",
    code: "Code",
    live: "Démo",
  },
  en: {
    projects: "Projects",
    about: "About",
    contact: "Contact",
    myResume: "My Resume",
    recommendation: "Recommendation",
    recommendations: "Recommendations",
    community: "Community",
    openSource: "Open Source",
    hackathon: "Hackathon",
    company: "Company",
    available: "Available",
    aboutMe: "About me",
    interests: "Interests",
    contactMe: "Contact Me",
    contactIntro:
      "Have a project in mind? Feel free to reach out and let's discuss it.",
    findMeOn: "Find me on",
    myProjects: "My Projects",
    projectsIntro: "Explore some of my recent projects",
    searchPlaceholder: "Search: project, tech, experience, contact...",
    searchNoResult: "No results for",
    searchGlobal:
      "Global search: projects, skills, experiences, events, contacts.",
    openProjects: "Open Projects",
    openAbout: "Open About",
    openContact: "Open Contact",
    openCV: "Open CV",
    viewAllProjects: "View all projects",
    contactDetails: "Contact details and links",
    cvSummary: "Experience, education, and background",
    openSearch: "Open search",
    viewCV: "View resume",
    download: "Download",
    events: "Events",
    viewEvent: "View event",
    noProjectsInCategory: "No projects or events in this category yet.",
    findMe: "Find me on",
    profileBlurb:
      "I build infrastructure, communities, and media that move tech forward in Togo. 18+ GitHub stars · 15k+ Reddit views · 20+ events covered · 2 communities co-founded.",
    timeline: "Timeline",
    welcome: "Welcome",
    loadingInit: "Initializing...",
    loadingResources: "Loading resources...",
    loadingUi: "Preparing interface...",
    loadingReady: "Almost ready...",
    previewUnavailable: "Preview not available for this link",
    atGlance: "At a Glance",
    launcher: "Launcher",
    integrationApi: "API Integration",
    education: "Education",
    event: "Event",
    code: "Code",
    live: "Live",
  },
} as const;

export type CopyKey = keyof (typeof copy)["fr"];

export function t(language: Language, key: CopyKey): string {
  return copy[language][key];
}

export function badgeLabel(
  language: Language,
  badge: "recommendation" | "community" | "opensource" | "hackathon" | "entreprise",
): string {
  if (badge === "recommendation") return t(language, "recommendations");
  if (badge === "community") return t(language, "community");
  if (badge === "opensource") return t(language, "openSource");
  if (badge === "hackathon") return t(language, "hackathon");
  return t(language, "company");
}
