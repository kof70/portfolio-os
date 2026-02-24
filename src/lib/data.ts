import { type IconName } from "@/components/icons";

// =============================================================================
// TYPES
// =============================================================================

/** Badge pour type de project / événement (reco, communauté, open source, hackathon, entreprise) */
export type BadgeType =
  | "recommendation"
  | "community"
  | "opensource"
  | "hackathon"
  | "entreprise";

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: "web" | "mobile" | "network";
  /** Icône de type : recommandation, communauté/entreprise, open source, hackathon */
  badge?: BadgeType;
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
  category: "frontend" | "backend" | "tools" | "network" | "mobile" | "other";
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
  /** Sous-titre du rôle (ex. "Front-end & MEAN Stack developer") */
  subtitle?: string;
  /** Slogan accrocheur (ex. "Bridging the Gap Between Design and Code") */
  tagline?: string;
  location: string;
  avatar: string;
  bio: string;
  /** Paragraphes structurés pour "À propos" (intro, focus, atout) — si présents, affichés à la place du bio en bloc */
  aboutParagraphs?: string[];
  bioShort: string;
  available: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  tags: string[];
  highlight?: boolean;
  /** Lien vers la page de l'événement */
  url?: string;
  /** Icône de type : recommandation, communauté, open source, hackathon */
  badge?: BadgeType;
}

// =============================================================================
// DATA
// =============================================================================
//
// Règles des badges (où doit apparaître chaque type de contenu) :
//
// - recommendation : Recommendations clients, projects sous NDA, invitations.
// - community      : Community — UNIQUEMENT des events (PyDevs, PyDay, PyCon).
// - opensource     : Projets ou events open source (repos publics, workshops).
// - hackathon      : Participations à des hackathons.
// - entreprise     : Projets dont je suis CEO/managementnaire (Rekap, Titan, etc.).
//

export const personalInfo: PersonalInfo = {
  name: "DJAKPA Koffi Tepe Venougne",
  title: "Backend · DevOps · Nest.js · Node.js | Human AI Ambassador | Co-founder of Python Togo & ETH Lome | Rekap",
  subtitle: "Backend & Full-Stack · DevOps · Media & production",
  location: "📍 Lome, Togo",
  avatar: "/assets/profile2.png",
  bio: "Backend and DevOps developer focused on architecture, deployment (Coolify, Docker), and monitoring. Main backend engineer for alonu.tech in Nest.js, with most web products built in Next.js + TypeScript. Human AI Ambassador for practical and sustainable AI in Africa. Co-founder of Python Togo and ETH Lome, production lead at Rekap, and author of the Coolify MCP Server.",
  aboutParagraphs: [
    "I am a backend, full-stack, and DevOps developer based in Lome, Togo. I work primarily as a backend engineer and infrastructure architect.",
    "My core work is building robust APIs, setting up production deployment with Coolify, Docker, and CI/CD, and shipping reliable backend systems with Nest.js and Node.js.",
    "My scope also includes mobile development (React Native), web frontend delivery (mostly Next.js + TypeScript), and media production through Rekap, the media company I co-founded.",
    "On the community side, I co-founded Python Togo and ETH Lome. I also build open-source tooling, including the Coolify MCP Server.",
    "I focus on connecting product needs, design expectations, and technical constraints to deliver software that is practical and durable.",
  ],
  bioShort:
    "Backend · DevOps · Software Developer · Human AI Ambassador · Co-founder of Python Togo & ETH Lome.",
  available: true,
};

// Du plus récent au plus ancien
export const projects: Project[] = [
  // Company
  {
    id: "16",
    title: "Titan",
    description:
      "Agent IA créé dans le cadre du hackathon Digital Ocean sur Devpost. Project en cours — creation d'agents IA.",
    tags: ["IA", "Agent", "Hackathon", "Digital Ocean", "Devpost"],
    category: "web",
    badge: "entreprise",
  },
  {
    id: "15",
    title: "Rekap",
    description:
      "Media dédié à la couverture audiovisuelle des events tech et culturels. Nous avons assuré le média pour Africa Blockchain Community et OnlyDust (Togo, Bénin), reportage GRIT pour des médias locaux, couverture Linked Africa au Bénin, et plus d'une vingtaine d'autres projects concrets. Je gère la partie administrative, les partenariats et la négociation. Courtes vidéos, photos, podcasts.",
    tags: ["Media", "Audiovisual", "Tech", "Africa Blockchain", "OnlyDust", "CEO"],
    category: "web",
    badge: "entreprise",
  },
  // Web / Backend
  {
    id: "14",
    title: "alonu.tech — Backend",
    description:
      "Backend complet de la plateforme alonu.tech réalisé en Nest.js : architecture, API, security et deployment.",
    tags: ["Nest.js", "TypeScript", "Backend", "API", "DevOps"],
    liveUrl: "https://alonu.tech",
    category: "web",
  },
  {
    id: "13",
    title: "API Vente & Location de voitures",
    description:
      "Design and development de l'API d'un project de vente et location de voitures. Release planned soon.",
    tags: ["API", "Backend", "Nest.js"],
    category: "web",
  },
  {
    id: "12",
    title: "Gnonel.com",
    description:
      "Project web gnonel.com.",
    tags: ["Web", "Projet"],
    category: "web",
  },
  {
    id: "11",
    title: "Afrique Informatique — Dashboard",
    description:
      "Dashboard de management pour afriqueinformatique.net. Project en collaboration (novembre).",
    tags: ["Dashboard", "Management", "Web"],
    category: "web",
  },
  {
    id: "10",
    title: "SES & CGSP — Management applications",
    description:
      "Management applications (SES, CGSP) : backend, security et DevOps. Deployment et monitoring (Coolify, Docker).",
    tags: ["Backend", "DevOps", "Security", "Coolify", "Docker"],
    liveUrl: "https://sesachat.com/",
    category: "web",
  },
  {
    id: "17",
    title: "SES Mobile — Management operations (Supabase)",
    description:
      "Mobile app built for the company SES avec backend Supabase. Management complète de l'agence de security et nettoyage: clients, agents, locations, shifts, attendance, notifications et administration operations.",
    tags: [
      "React Native",
      "Supabase",
      "Mobile",
      "Backend",
      "Pointage",
      "Notifications",
    ],
    category: "mobile",
  },
  {
    id: "9",
    title: "Cheffe Citronnelle — Mobile app",
    description:
      "Mobile app React Native pour Cheffe Citronnelle, la maison des délices à Lome. orders, tracking, home delivery.",
    tags: ["React Native", "Mobile", "Delivery", "Lome"],
    liveUrl: "https://cheffecitronnelle.com/",
    category: "mobile",
  },
  // Open Source
  {
    id: "8",
    title: "VoirDrama Stremio Addon",
    description:
      "Addon Stremio (catalog + metadata + streams) basé sur le scraping de voirdrama.org. Films et séries — personal use.",
    tags: ["Stremio", "Node.js", "Scraping", "Streaming"],
    githubUrl: "https://github.com/kof70/voirdrama-stremio-addon",
    category: "web",
    badge: "opensource",
  },
  {
    id: "7",
    title: "Coolify MCP Server",
    description:
      "MCP Server (Model Context Protocol) pour l'API Coolify. Control your self-hosted PaaS from Claude, Kiro, or any MCP-compatible assistant. ~18 étoiles GitHub, ~15k vues sur Reddit.",
    tags: ["MCP", "Coolify", "TypeScript", "DevOps", "API"],
    githubUrl: "https://github.com/kof70/coolify-mcp-server",
    category: "web",
    badge: "opensource",
  },
  {
    id: "6",
    title: "Drive — Local Collaborative Workspace",
    description:
      "Local cross-platform collaborative workspace with no Internet dependency. Canvas visuel, real-time synchronization via WebSocket, drag & drop, multi-user. Développé et soumis au hackathon Kiro Halloween.",
    tags: ["React", "WebSocket", "TypeScript", "Vite", "Collaboration", "Kiro Halloween"],
    githubUrl: "https://github.com/kof70/drive",
    category: "web",
    badge: "opensource",
  },
  {
    id: "5",
    title: "Gitpath",
    description:
      "GitHub Contribution Designer : design contribution patterns that match the GitHub grid. prebuilt shapes, image import, commit scheduler. Créé dans le cadre du Gitpath Project à Lome.",
    tags: ["GitHub", "Open Source", "Tools", "Contributions"],
    githubUrl: "https://github.com",
    liveUrl: "https://gitpath.vercel.app/",
    category: "web",
    badge: "opensource",
  },
  {
    id: "4",
    title: "StartUpHub",
    description:
      "Open-source platform connecting startups and investors. Une solution innovante pour faciliter le financement des jeunes entreprises.",
    image: "/assets/startuphub.png",
    tags: ["React", "Supabase", "Vite", "PostgreSQL"],
    githubUrl: "https://github.com/MyStaartUp/StartUpHub",
    liveUrl: "https://mystartuphub.vercel.app/",
    category: "web",
    badge: "opensource",
  },
  // Network
  {
    id: "3",
    title: "Network Infrastructure UL",
    description:
      "Design and implementation du réseau campus avec deployment de points d'accès haute densité pour les amphithéâtres et bibliothèques.",
    image: "/assets/CHUul.jpg",
    tags: ["Haute Densité", "Load Balancing", "QoS"],
    category: "network",
  },
  {
    id: "2",
    title: "Network Infrastructure CHU Kégué",
    description:
      "Installation et configuration du réseau hospitalier incluant la mise en place d'un système de redondance et la sécurisation des données médicales.",
    image: "/assets/kegueulrich.jpg",
    tags: ["Routing", "VLAN", "Security"],
    category: "network",
  },
  {
    id: "1",
    title: "Network Infrastructure CHU Tokoin",
    description:
      "Deployment complet du réseau avec câblage structuré et configuration des points d'accès Wi-Fi pour une couverture optimale de l'établissement hospitalier.",
    image: "/assets/tokoin.jpg",
    tags: ["Cisco", "Cat6 cabling", "Wi-Fi 6"],
    category: "network",
  },
];

// Du plus récent au plus ancien
export const experiences: Experience[] = [
  {
    id: "12",
    title: "Tester freelance",
    company: "Testerworks & GitHub",
    period: "2024 - Present",
    description:
      "Tests logiciels en freelance sur Testerworks et via GitHub. Contrats réalisés : MI snap Dev App (vérification de passeports et cartes d'identité pour fiabilité et authenticité), et d'autres applications.",
  },
  {
    id: "11",
    title: "Developer Full-Stack → Backend & DevOps",
    company: "alonu.tech",
    period: "Oct. 2025 - Present",
    description:
      "Oct.-Nov. : frontend mobile (app React Native Cheffe Citronnelle) et version web du site alonu.tech. Dec. : migration vers le backend & DevOps — conception de l'API, architecture back, deployment de toutes les applications sur une nouvelle infrastructure (Coolify, Docker, Nest.js). Jan. terminé, nouveau project en cours.",
  },
  {
    id: "10",
    title: "Developer mobile",
    company: "SES, Lome",
    period: "Oct. - Nov. 2025",
    description:
      "Designed and delivered de l'application mobile SES avec backend Supabase. Management complète: clients, agents de security, lieux d'affectation, créneaux, pointage, notifications et management administrative pour les activités de security et nettoyage.",
  },
  {
    id: "9",
    title: "Co-founder & Responsable production",
    company: "Rekap, Lome",
    period: "Jun. 2025 - Present",
    description:
      "Media sur des events tech et culturels : couverture Africa Blockchain Community et OnlyDust (Togo, Bénin), reportage GRIT pour des médias locaux, tournage Linked Africa au Bénin, plus de 20 projects concrets réalisés. Management administrative, partenariats et négociation. Production de courtes vidéos, photos et podcasts.",
  },
  {
    id: "8",
    title: "Semi-finalist",
    company: "Competition D-clic entrepreneuriat, Lome",
    period: "Apr. 2025",
    description:
      "Semi-finalist du concours D-clic avec le project Mayeutic.",
  },
  {
    id: "7",
    title: "Developer",
    company: "Gitpath Project, Lome",
    period: "Mar. 2025",
    description:
      "Création et deployment de Gitpath, un outil pour optimiser la grille de contributions GitHub.",
  },
  {
    id: "6",
    title: "Assistant web app trainer",
    company: "UNIPOD Togo, Lome",
    period: "Jan. - Apr. 2025",
    description:
      "Planification, développement et animation de supports de cours pour plus de 80 apprenants.",
  },
  {
    id: "5",
    title: "Co-founder",
    company: "ETH Lome (communauté Ethereum)",
    period: "Jan. 2025 - Present",
    description:
      "Organisation du satellite Devcon au Togo sous ma supervision.",
  },
  {
    id: "4",
    title: "Speaker & Organisateur",
    company: "Git & GitHub Fundamentals Event, Lome",
    period: "Dec. 2024",
    description:
      "Organisation et intervention sur les fondamentaux Git & GitHub.",
  },
  {
    id: "3",
    title: "Co-founder & Co-organisateur PyCon Togo",
    company: "Python Togo",
    period: "Nov. 2024 - Present",
    description:
      "Développement et animation de la communauté des developers Python au Togo. Organisation d'events techniques et d'ateliers de formation. Coaching des membres pour encourager le partage de connaissances et l'innovation.",
  },
  {
    id: "2",
    title: "Network technician",
    company: "SOS Smart Group, Lome",
    period: "Aug. 2023 - Dec. 2024",
    description:
      "Deployment et maintenance de réseaux informatiques. Participation au deployment réseau au CHU Tokoin, CHU Sylvanus Olympio et CHU Université. Installation d'antennes Wi-Fi et câblage structuré pour une connectivité stable et performante.",
  },
  {
    id: "1",
    title: "Human AI Ambassador",
    company: "Human AI Initiative, Africa",
    period: "Jun. 2024 - Present",
    description:
      "Awareness and advocacy à l'artificial intelligence pour un développement durable en Afrique. Organisation de conférences et d'events éducatifs. Participation à des projects innovants en IA et technologie.",
  },
];

// Du plus récent au plus ancien
export const education: Education[] = [
  {
    id: "2",
    degree: "Education Développement Full Stack",
    school: "Self-taught & Online certifications",
    period: "2021 - Present",
  },
  {
    id: "1",
    degree: "Ingénieur en Networks et Télécommunications",
    school: "Education spécialisée en infrastructure réseau",
    period: "2020 - 2023",
  },
];

export const skills: Skill[] = [
  // Frontend & Web
  { name: "React", icon: "react", level: 85, category: "frontend" },
  { name: "Next.js", icon: "nextjs", level: 80, category: "frontend" },
  { name: "TypeScript", icon: "typescript", level: 75, category: "frontend" },
  { name: "Tailwind CSS", icon: "tailwind", level: 85, category: "frontend" },
  // Backend
  { name: "Node.js", icon: "nodejs", level: 80, category: "backend" },
  // Mobile
  { name: "React Native", icon: "reactNative", level: 80, category: "mobile" },
  { name: "Expo", icon: "expo", level: 75, category: "mobile" },
  // Tools & DevOps
  { name: "Git", icon: "git", level: 90, category: "tools" },
  { name: "Docker", icon: "docker", level: 80, category: "tools" },
  { name: "Coolify", icon: "coolify", level: 85, category: "tools" },
  { name: "CI/CD & DevOps", icon: "git", level: 75, category: "tools" },
  // Networks
  { name: "Networks & Wi-Fi", icon: "wifi", level: 85, category: "network" },
];

export const contactLinks: ContactLink[] = [
  {
    id: "github",
    icon: "github",
    label: "GitHub",
    value: "github.com/kof70",
    href: "https://github.com/kof70",
    hoverColor: "hover:text-white",
  },
  {
    id: "email",
    icon: "email",
    label: "Email",
    value: "djakpakoffi7029@gmail.com",
    href: "mailto:djakpakoffi7029@gmail.com",
    hoverColor: "hover:text-red-400",
  },
  {
    id: "phone",
    icon: "whatsapp",
    label: "Phone",
    value: "+228 79 28 83 24",
    href: "tel:+22879288324",
    hoverColor: "hover:text-green-400",
  },
  {
    id: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/djakpakoffi",
    href: "https://www.linkedin.com/in/djakpakoffi",
    hoverColor: "hover:text-blue-400",
  },
  {
    id: "whatsapp",
    icon: "whatsapp",
    label: "Telegram",
    value: "t.me/Kofcodeur",
    href: "https://t.me/Kofcodeur",
    hoverColor: "hover:text-green-400",
  },
];

// Events du plus récent au plus ancien
export const events: Event[] = [
  // En cours / 2025
  {
    id: "10",
    title: "Hackathon Digital Ocean — Création d'agents IA",
    date: "Jan. 2026 - En cours",
    description:
      "Participation au hackathon Digital Ocean sur Devpost, dédié à la creation d'agents IA. Project open source (Titan).",
    tags: ["Hackathon", "Digital Ocean", "Devpost", "IA", "Agents", "Open Source"],
    highlight: true,
    badge: "hackathon",
  },
  {
    id: "5",
    title: "Speaker & Organisateur Git & GitHub Fundamentals",
    date: "Dec. 2024",
    description:
      "Organisation et intervention sur les fondamentaux Git & GitHub à Lome.",
    image: "/assets/workshopgit.jpeg",
    tags: ["Education", "Git", "GitHub", "Community"],
    badge: "community",
  },
  {
    id: "12",
    title: "Speaker — Product / Project Manager (TCC Events)",
    date: "Feb. 2025",
    description:
      "Intervention sur le métier de Product / Project Manager : compétences, défis et opportunités dans l'univers Tech. Événement organisé par Tech Communities Club (TCC).",
    image: "/assets/tcc.jpg",
    tags: ["Speaker", "Product Manager", "Project Manager", "TCC", "Tech"],
    url: "https://www.tcc.hyver.org/e/wKFVOU",
    badge: "community",
  },
  {
    id: "14",
    title: "Premier Devcon satellite ETH Lome",
    date: "Jan. 2025",
    description:
      "Organisation du premier satellite Devcon au Togo par ETH Lome, sous ma supervision. Community Ethereum à Lome.",
    image: "/assets/eth-lome-devcon.png",
    tags: ["ETH Lome", "Devcon", "Ethereum", "Organisateur", "Lome"],
    badge: "community",
  },
  {
    id: "11",
    title: "Kiro Halloween",
    date: "2025",
    description:
      "Hackathon Kiro Halloween. J'y ai développé et soumis Drive — Local Collaborative Workspace (espace de travail collaboratif local en temps réel). Project open source.",
    tags: ["Hackathon", "Kiro", "Drive", "Collaboration", "Open Source"],
    badge: "hackathon",
  },
  {
    id: "8",
    title: "Amazon Hackathon",
    date: "Aug. 2025",
    description:
      "Participation à l'Amazon hackathon à Lome, Togo. Project open source.",
    tags: ["Hackathon", "Amazon", "Open Source"],
    badge: "hackathon",
  },
  {
    id: "7",
    title: "Amazon Kiro Hackathon",
    date: "Jul. 2025",
    description:
      "Participation à l'Amazon Kiro hackathon : développement d'une application de détection image par image de la source des vidéos sur les réseaux sociaux, utile pour les journalistes. Project open source.",
    tags: ["Hackathon", "Amazon", "Développement", "Open Source"],
    badge: "hackathon",
  },
  {
    id: "6",
    title: "Bolt Hackathon",
    date: "Jun. 2025",
    description:
      "Participation au Bolt hackathon à Lome, Togo. Project open source.",
    tags: ["Hackathon", "Lome", "Open Source"],
    badge: "hackathon",
  },
  {
    id: "9",
    title: "Finaliste — Accompagnement entrepreneurial OIF par CUBE (D-clic)",
    date: "Avril 2025",
    description:
      "Finaliste du programme d'accompagnement entrepreneurial de l'OIF par CUBE sur D-clic. Pitch du project Mayele, restructuré par la suite en Rekap.",
    image: "/assets/declic-mayele-rekap.png",
    tags: ["Entrepreneuriat", "D-clic", "OIF", "CUBE", "Mayele", "Rekap"],
    badge: "community",
  },
  {
    id: "13",
    title: "Teknolime — Networks informatiques (Tsévié)",
    date: "23-25 avril 2025",
    description:
      "Invité par le project Teknolime pour animer une session sur les réseaux informatiques auprès des filles du collège et lycée à Tsévié : routeur, SSID, adresse IP, sécurisation du Wi-Fi, autonomie. Initiative Filles & Tech et éducation numérique. Merci à Samira Amadou et à Teknolime.",
    image: "/assets/teknolime.jpeg",
    tags: ["Teknolime", "Networks", "FillesEtTech", "Éducation numérique", "Tsévié"],
    url: "https://www.linkedin.com/posts/djakpa-koffi_teknolime-teknolime-raezseauinformatique-ugcPost-7327489914474831873-0125",
    badge: "community",
  },
  {
    id: "15",
    title: "Staff — 1ère Compétition Nationale de Robotique au Secondaire (Togo)",
    date: "2025",
    description:
      "Membre du staff de la première compétition nationale de robotique au niveau secondaire au Togo. Organisation, encadrement des équipes et coordination logistique de cet événement pionnier pour la robotique éducative au Togo.",
    image: "/assets/ffl.jpg",
    tags: ["Robotique", "Compétition", "Éducation", "Staff", "Togo"],
    highlight: true,
    badge: "community",
  },
  // 2024
  {
    id: "1",
    title: "Co-founder & Co-organisateur PyCon Togo",
    date: "Nov. 2024 - Present",
    description:
      "Développement et animation de la communauté des developers Python au Togo. Organisation d'events techniques et d'ateliers.",
    image: "/assets/coretieam.jpg",
    tags: ["Founder", "Community", "Leadership"],
    highlight: true,
    badge: "community",
  },
  {
    id: "4",
    title: "Workshop Google",
    date: "2024",
    description:
      "Participation sur invitation spéciale de Google à un workshop exclusif sur les meilleures pratiques et les dernières technologies.",
    image: "/assets/google.jpg",
    tags: ["Google", "Workshop", "Innovation", "International"],
    badge: "community",
  },
  {
    id: "3",
    title: "PyCon Africa - Accra",
    date: "2024",
    description:
      "Participation sur invitation au sommet Python Africa à Accra, représentant la communauté Python du Togo.",
    image: "/assets/pycon.jpeg",
    tags: ["Conférence", "International", "Python"],
    badge: "community",
  },
];

export const interests: string[] = [
  "🌐 Networks & Infrastructure",
  "💻 Open Source",
  "👥 Community Tech",
  "📚 Knowledge Sharing",
  "🚀 Innovation",
  "🎬 Cinéma",
  "🏀 Basketball",
  "📷 Photographie",
  "📖 Reading",
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

export const getProjectsByCategory = (category: Project["category"]) =>
  projects.filter((project) => project.category === category);

export const getEventById = (id: string) =>
  events.find((event) => event.id === id);

/** Libellés des badges pour l’affichage */
export const BADGE_LABELS: Record<BadgeType, string> = {
  recommendation: "Recommendation",
  community: "Community",
  opensource: "Open Source",
  hackathon: "Hackathon",
  entreprise: "Company",
};

/** Nom de l’icône (Icons) pour chaque badge */
export const BADGE_ICONS: Record<BadgeType, IconName> = {
  recommendation: "badgeRecommendation",
  community: "badgeCommunity",
  opensource: "badgeOpensource",
  hackathon: "badgeHackathon",
  entreprise: "badgeEntreprise",
};

export const getProjectsByBadge = (badge: BadgeType) =>
  projects.filter((p) => p.badge === badge);

export const getEventsByBadge = (badge: BadgeType) =>
  events.filter((e) => e.badge === badge);

// =============================================================================
// DOCK — Icônes techno → projects (popover au clic)
// =============================================================================

export interface DockTechProjectItem {
  title: string;
  descriptionShort: string;
  href?: string;
  projectId?: string;
}

/** Id des icônes techno du dock (custom-dock.tsx) */
export type DockTechId =
  | "postman"
  | "typescript"
  | "react"
  | "nextjs"
  | "tailwind"
  | "nodejs"
  | "git"
  | "reactnative"
  | "expo"
  | "docker"
  | "coolify";

/** Projets associés à chaque techno du dock (nom, courte description, lien) */
export const DOCK_TECH_PROJECTS: Record<DockTechId, DockTechProjectItem[]> = {
  postman: [
    {
      title: "Coolify MCP Server",
      descriptionShort: "API Coolify exposée via MCP — tests et doc Postman.",
      projectId: "7",
    },
    {
      title: "alonu.tech — Backend",
      descriptionShort: "API Nest.js — intégration et tests.",
      projectId: "14",
    },
    {
      title: "SES & CGSP",
      descriptionShort: "Management applications — APIs backend.",
      projectId: "10",
    },
  ],
  typescript: [
    {
      title: "Coolify MCP Server",
      descriptionShort: "MCP Server en TypeScript pour l’API Coolify.",
      projectId: "7",
    },
    {
      title: "Drive",
      descriptionShort: "Workspace collaboratif local — stack TypeScript + Vite.",
      projectId: "6",
    },
    {
      title: "Ce portfolio",
      descriptionShort: "Site Next.js + TypeScript.",
      href: "/",
    },
  ],
  react: [
    {
      title: "Drive",
      descriptionShort: "Canvas et sync temps réel — React + WebSocket.",
      projectId: "6",
    },
    {
      title: "StartUpHub",
      descriptionShort: "Plateforme startups / investisseurs — React + Supabase.",
      projectId: "4",
    },
    {
      title: "Ce portfolio",
      descriptionShort: "Interface bureau — React (Next.js).",
      href: "/",
    },
  ],
  nextjs: [
    {
      title: "Ce portfolio",
      descriptionShort: "Portfolio type OS / bureau — Next.js.",
      href: "/",
    },
  ],
  tailwind: [
    {
      title: "Ce portfolio",
      descriptionShort: "UI du bureau, dock et fenêtres — Tailwind CSS.",
      href: "/",
    },
  ],
  nodejs: [
    {
      title: "VoirDrama Stremio Addon",
      descriptionShort: "Addon Stremio — Node.js, scraping et streams.",
      projectId: "8",
    },
    {
      title: "alonu.tech — Backend",
      descriptionShort: "API Nest.js — Node.js.",
      projectId: "14",
    },
    {
      title: "Coolify MCP Server",
      descriptionShort: "MCP Server — runtime Node / TypeScript.",
      projectId: "7",
    },
  ],
  git: [
    {
      title: "Coolify MCP Server",
      descriptionShort: "Open source — dépôt GitHub.",
      projectId: "7",
    },
    {
      title: "Drive",
      descriptionShort: "Project hackathon Kiro — GitHub.",
      projectId: "6",
    },
    {
      title: "StartUpHub",
      descriptionShort: "Open source — GitHub.",
      projectId: "4",
    },
    {
      title: "VoirDrama Stremio Addon",
      descriptionShort: "Addon perso — GitHub.",
      projectId: "8",
    },
  ],
  reactnative: [
    {
      title: "SES Mobile",
      descriptionShort:
        "App mobile SES + backend Supabase: clients, agents, locations, shifts, attendance, notifications.",
      projectId: "17",
    },
    {
      title: "Cheffe Citronnelle",
      descriptionShort: "App mobile React Native livrée: commandes, suivi, livraison.",
      projectId: "9",
    },
  ],
  expo: [
    {
      title: "SES Mobile",
      descriptionShort:
        "Application métier mobile pour agence security/nettoyage avec backend Supabase.",
      projectId: "17",
    },
    {
      title: "Cheffe Citronnelle",
      descriptionShort: "Version Expo/React Native avec flux mobile complet.",
      projectId: "9",
    },
  ],
  docker: [
    {
      title: "SES & CGSP",
      descriptionShort:
        "Conteneurisation et deployment des apps de management avec Docker + Coolify.",
      projectId: "10",
    },
    {
      title: "Coolify MCP Server",
      descriptionShort: "Distribution et deployment — Docker.",
      projectId: "7",
    },
    {
      title: "alonu.tech",
      descriptionShort: "Infra et deployment — Docker.",
      projectId: "14",
    },
  ],
  coolify: [
    {
      title: "Coolify MCP Server",
      descriptionShort:
        "Auteur du serveur MCP Coolify: orchestration API, documentation et intégrations assistants IA.",
      projectId: "7",
    },
    {
      title: "SES & CGSP",
      descriptionShort:
        "DevOps backend: architecture, deployment et supervision via Coolify pour plusieurs apps d'entreprise.",
      projectId: "10",
    },
    {
      title: "alonu.tech — Backend",
      descriptionShort:
        "Architecture backend Nest.js et deployment en production sur l'infrastructure Coolify.",
      projectId: "14",
    },
    {
      title: "Cheffe Citronnelle — Mobile",
      descriptionShort:
        "Stack mobile (React Native) connectée au backend déployé et maintenu côté infrastructure.",
      projectId: "9",
    },
  ],
};

export const getDockTechProjects = (techId: DockTechId): DockTechProjectItem[] =>
  DOCK_TECH_PROJECTS[techId] ?? [];
