import { type IconName } from "@/components/icons";

// =============================================================================
// TYPES
// =============================================================================

/** Badge pour type de projet / événement (reco, communauté, open source, hackathon, entreprise) */
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
// - recommendation : Recommandations clients, projets sous NDA, invitations.
// - community      : Communauté — UNIQUEMENT des événements (PyDevs, PyDay, PyCon).
// - opensource     : Projets ou événements open source (repos publics, workshops).
// - hackathon      : Participations à des hackathons.
// - entreprise     : Projets dont je suis CEO/gestionnaire (Rekap, Titan, etc.).
//

export const personalInfo: PersonalInfo = {
  name: "DJAKPA Koffi Tepe Venougne",
  title: "Backend · DevOps · Nest.js · Node.js | Human AI Ambassador | Co-fondateur Python Togo & ETH Lomé | Rekap",
  subtitle: "Backend & Full-Stack · DevOps · Média & production",
  location: "📍 Lomé, Togo",
  avatar: "/assets/profile2.png",
  bio: "Développeur backend et DevOps : architecture, déploiement (Coolify, Docker), surveillance. Backend d'alonu.tech réalisé en Nest.js, avec une majorité de projets web développés en Next.js + TypeScript. Human AI Ambassador pour une IA au service du développement durable en Afrique. Co-fondateur de Python Togo et ETH Lomé, responsable production chez Rekap. Auteur du Coolify MCP Server (18+ étoiles GitHub, ~15k vues Reddit). Participation au hackathon Digital Ocean sur la création d'agents IA.",
  aboutParagraphs: [
    "Développeur backend, full-stack et DevOps basé à Lomé, Togo. Je me définirais avant tout comme un développeur backend et un architecte d'infrastructure. Mon cœur de métier : concevoir des API robustes, mettre en place le déploiement (Coolify, Docker, CI/CD) et construire des architectures backend solides en Nest.js et Node.js.",
    "J'ai un spectre bien plus large que le seul backend : développement mobile (React Native — j'ai livré l'application de Cheffe Citronnelle), frontend web (majoritairement en Next.js + TypeScript, dont ce portfolio), et production audiovisuelle avec Rekap, le média que j'ai co-fondé. Je fais souvent le pont entre le produit, le design et l'infrastructure technique — comprendre les besoins visuels des designers comme les contraintes structurelles du backend pour livrer un produit final cohérent.",
    "Côté communauté, je suis co-fondateur de Python Togo et d'ETH Lomé, deux initiatives qui structurent l'écosystème tech togolais. Avec Rekap, nous avons couvert plus de 20 événements concrets : Africa Blockchain Community, OnlyDust (Togo & Bénin), le reportage GRIT pour des médias locaux, Linked Africa au Bénin, et bien d'autres. J'y gère la partie administrative, les partenariats et la négociation.",
    "Au fil de mon parcours, j'ai eu l'opportunité de travailler sur des projets variés : startups, entreprises locales, communautés open source, hackathons internationaux et initiatives panafricaines. Auteur du Coolify MCP Server (18+ étoiles GitHub, ~15k vues Reddit), participant au hackathon Digital Ocean sur les agents IA avec Titan. Human AI Ambassador pour une IA au service du développement durable en Afrique.",
    "Au-delà du code, ce qui me motive c'est de faire le lien entre technique et produit : comprendre les besoins métier, concevoir l'infrastructure adaptée et livrer des solutions pérennes. Tout le monde dans la tech togolaise me connaît sous le pseudo de Kof — et c'est sous ce nom que je continue à construire, coder et connecter.",
  ],
  bioShort:
    "Backend · DevOps · Développeur logiciel · Human AI Ambassador · Co-fondateur Python Togo & ETH Lomé.",
  available: true,
};

// Du plus récent au plus ancien
export const projects: Project[] = [
  // Entreprise
  {
    id: "16",
    title: "Titan",
    description:
      "Agent IA créé dans le cadre du hackathon Digital Ocean sur Devpost. Projet en cours — création d'agents IA.",
    tags: ["IA", "Agent", "Hackathon", "Digital Ocean", "Devpost"],
    category: "web",
    badge: "entreprise",
  },
  {
    id: "15",
    title: "Rekap",
    description:
      "Média dédié à la couverture audiovisuelle des événements tech et culturels. Nous avons assuré le média pour Africa Blockchain Community et OnlyDust (Togo, Bénin), reportage GRIT pour des médias locaux, couverture Linked Africa au Bénin, et plus d'une vingtaine d'autres projets concrets. Je gère la partie administrative, les partenariats et la négociation. Courtes vidéos, photos, podcasts.",
    tags: ["Média", "Audiovisuel", "Tech", "Africa Blockchain", "OnlyDust", "CEO"],
    category: "web",
    badge: "entreprise",
  },
  // Web / Backend
  {
    id: "14",
    title: "alonu.tech — Backend",
    description:
      "Backend complet de la plateforme alonu.tech réalisé en Nest.js : architecture, API, sécurité et déploiement.",
    tags: ["Nest.js", "TypeScript", "Backend", "API", "DevOps"],
    liveUrl: "https://alonu.tech",
    category: "web",
  },
  {
    id: "13",
    title: "API Vente & Location de voitures",
    description:
      "Conception et développement de l'API d'un projet de vente et location de voitures. Lancement prévu prochainement.",
    tags: ["API", "Backend", "Nest.js"],
    category: "web",
  },
  {
    id: "12",
    title: "Gnonel.com",
    description:
      "Projet web gnonel.com.",
    tags: ["Web", "Projet"],
    category: "web",
  },
  {
    id: "11",
    title: "Afrique Informatique — Dashboard",
    description:
      "Dashboard de gestion pour afriqueinformatique.net. Projet en collaboration (novembre).",
    tags: ["Dashboard", "Gestion", "Web"],
    category: "web",
  },
  {
    id: "10",
    title: "SES & CGSP — Applications de gestion",
    description:
      "Applications de gestion (SES, CGSP) : backend, sécurité et DevOps. Déploiement et surveillance (Coolify, Docker).",
    tags: ["Backend", "DevOps", "Sécurité", "Coolify", "Docker"],
    liveUrl: "https://sesachat.com/",
    category: "web",
  },
  {
    id: "17",
    title: "SES Mobile — Gestion opérationnelle (Supabase)",
    description:
      "Application mobile créée pour l'entreprise SES avec backend Supabase. Gestion complète de l'agence de sécurité et nettoyage: clients, agents, lieux, créneaux, pointage, notifications et administration opérationnelle.",
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
    title: "Cheffe Citronnelle — Application mobile",
    description:
      "Application mobile React Native pour Cheffe Citronnelle, la maison des délices à Lomé. Commandes, suivi, livraison à domicile.",
    tags: ["React Native", "Mobile", "Livraison", "Lomé"],
    liveUrl: "https://cheffecitronnelle.com/",
    category: "mobile",
  },
  // Open Source
  {
    id: "8",
    title: "VoirDrama Stremio Addon",
    description:
      "Addon Stremio (catalogue + métadonnées + streams) basé sur le scraping de voirdrama.org. Films et séries — usage personnel.",
    tags: ["Stremio", "Node.js", "Scraping", "Streaming"],
    githubUrl: "https://github.com/kof70/voirdrama-stremio-addon",
    category: "web",
    badge: "opensource",
  },
  {
    id: "7",
    title: "Coolify MCP Server",
    description:
      "Serveur MCP (Model Context Protocol) pour l'API Coolify. Contrôlez votre PaaS self-hosted depuis Claude, Kiro ou tout assistant compatible MCP. ~18 étoiles GitHub, ~15k vues sur Reddit.",
    tags: ["MCP", "Coolify", "TypeScript", "DevOps", "API"],
    githubUrl: "https://github.com/kof70/coolify-mcp-server",
    category: "web",
    badge: "opensource",
  },
  {
    id: "6",
    title: "Drive — Local Collaborative Workspace",
    description:
      "Espace de travail collaboratif local, multiplateforme et sans dépendance Internet. Canvas visuel, synchronisation temps réel via WebSocket, drag & drop, multi-utilisateurs. Développé et soumis au hackathon Kiro Halloween.",
    tags: ["React", "WebSocket", "TypeScript", "Vite", "Collaboration", "Kiro Halloween"],
    githubUrl: "https://github.com/kof70/drive",
    category: "web",
    badge: "opensource",
  },
  {
    id: "5",
    title: "Gitpath",
    description:
      "GitHub Contribution Designer : créez des motifs de contributions qui ressemblent à la grille GitHub. Formes prédéfinies, import d'images, programme de commits. Créé dans le cadre du Gitpath Project à Lomé.",
    tags: ["GitHub", "Open Source", "Outils", "Contributions"],
    githubUrl: "https://github.com",
    liveUrl: "https://gitpath.vercel.app/",
    category: "web",
    badge: "opensource",
  },
  {
    id: "4",
    title: "StartUpHub",
    description:
      "Plateforme open source de mise en relation entre startups et investisseurs. Une solution innovante pour faciliter le financement des jeunes entreprises.",
    image: "/assets/startuphub.png",
    tags: ["React", "Supabase", "Vite", "PostgreSQL"],
    githubUrl: "https://github.com/MyStaartUp/StartUpHub",
    liveUrl: "https://mystartuphub.vercel.app/",
    category: "web",
    badge: "opensource",
  },
  // Réseau
  {
    id: "3",
    title: "Infrastructure Réseau UL",
    description:
      "Conception et implémentation du réseau campus avec déploiement de points d'accès haute densité pour les amphithéâtres et bibliothèques.",
    image: "/assets/CHUul.jpg",
    tags: ["Haute Densité", "Load Balancing", "QoS"],
    category: "network",
  },
  {
    id: "2",
    title: "Infrastructure Réseau CHU Kégué",
    description:
      "Installation et configuration du réseau hospitalier incluant la mise en place d'un système de redondance et la sécurisation des données médicales.",
    image: "/assets/kegueulrich.jpg",
    tags: ["Routage", "VLAN", "Sécurité"],
    category: "network",
  },
  {
    id: "1",
    title: "Infrastructure Réseau CHU Tokoin",
    description:
      "Déploiement complet du réseau avec câblage structuré et configuration des points d'accès Wi-Fi pour une couverture optimale de l'établissement hospitalier.",
    image: "/assets/tokoin.jpg",
    tags: ["Cisco", "Câblage Cat6", "Wi-Fi 6"],
    category: "network",
  },
];

// Du plus récent au plus ancien
export const experiences: Experience[] = [
  {
    id: "12",
    title: "Tester freelance",
    company: "Testerworks & GitHub",
    period: "2024 - Présent",
    description:
      "Tests logiciels en freelance sur Testerworks et via GitHub. Contrats réalisés : MI snap Dev App (vérification de passeports et cartes d'identité pour fiabilité et authenticité), et d'autres applications.",
  },
  {
    id: "11",
    title: "Développeur Full-Stack → Backend & DevOps",
    company: "alonu.tech",
    period: "Oct. 2025 - Présent",
    description:
      "Oct.-Nov. : frontend mobile (app React Native Cheffe Citronnelle) et version web du site alonu.tech. Déc. : migration vers le backend & DevOps — conception de l'API, architecture back, déploiement de toutes les applications sur une nouvelle infrastructure (Coolify, Docker, Nest.js). Janv. terminé, nouveau projet en cours.",
  },
  {
    id: "10",
    title: "Développeur mobile",
    company: "SES, Lomé",
    period: "Oct. - Nov. 2025",
    description:
      "Conception et livraison de l'application mobile SES avec backend Supabase. Gestion complète: clients, agents de sécurité, lieux d'affectation, créneaux, pointage, notifications et gestion administrative pour les activités de sécurité et nettoyage.",
  },
  {
    id: "9",
    title: "Co-fondateur & Responsable production",
    company: "Rekap, Lomé",
    period: "Juin 2025 - Présent",
    description:
      "Média sur des événements tech et culturels : couverture Africa Blockchain Community et OnlyDust (Togo, Bénin), reportage GRIT pour des médias locaux, tournage Linked Africa au Bénin, plus de 20 projets concrets réalisés. Gestion administrative, partenariats et négociation. Production de courtes vidéos, photos et podcasts.",
  },
  {
    id: "8",
    title: "Semi-finaliste",
    company: "Concours D-clic entrepreneuriat, Lomé",
    period: "Avr. 2025",
    description:
      "Semi-finaliste du concours D-clic avec le projet Mayeutic.",
  },
  {
    id: "7",
    title: "Développeur",
    company: "Gitpath Project, Lomé",
    period: "Mars 2025",
    description:
      "Création et déploiement de Gitpath, un outil pour optimiser la grille de contributions GitHub.",
  },
  {
    id: "6",
    title: "Formateur assistant en développement d'applications web",
    company: "UNIPOD Togo, Lomé",
    period: "Janv. - Avr. 2025",
    description:
      "Planification, développement et animation de supports de cours pour plus de 80 apprenants.",
  },
  {
    id: "5",
    title: "Co-fondateur",
    company: "ETH Lomé (communauté Ethereum)",
    period: "Janv. 2025 - Présent",
    description:
      "Organisation du satellite Devcon au Togo sous ma supervision.",
  },
  {
    id: "4",
    title: "Speaker & Organisateur",
    company: "Git & GitHub Fundamentals Event, Lomé",
    period: "Déc. 2024",
    description:
      "Organisation et intervention sur les fondamentaux Git & GitHub.",
  },
  {
    id: "3",
    title: "Co-fondateur & Co-organisateur PyCon Togo",
    company: "Python Togo",
    period: "Nov. 2024 - Présent",
    description:
      "Développement et animation de la communauté des développeurs Python au Togo. Organisation d'événements techniques et d'ateliers de formation. Coaching des membres pour encourager le partage de connaissances et l'innovation.",
  },
  {
    id: "2",
    title: "Technicien en réseaux informatiques",
    company: "SOS Smart Group, Lomé",
    period: "Août 2023 - Déc. 2024",
    description:
      "Déploiement et maintenance de réseaux informatiques. Participation au déploiement réseau au CHU Tokoin, CHU Sylvanus Olympio et CHU Université. Installation d'antennes Wi-Fi et câblage structuré pour une connectivité stable et performante.",
  },
  {
    id: "1",
    title: "Human AI Ambassador",
    company: "Human AI Initiative, Africa",
    period: "Juin 2024 - Présent",
    description:
      "Promotion et sensibilisation à l'intelligence artificielle pour un développement durable en Afrique. Organisation de conférences et d'événements éducatifs. Participation à des projets innovants en IA et technologie.",
  },
];

// Du plus récent au plus ancien
export const education: Education[] = [
  {
    id: "2",
    degree: "Formation Développement Full Stack",
    school: "Autodidacte & Certifications en ligne",
    period: "2021 - Présent",
  },
  {
    id: "1",
    degree: "Ingénieur en Réseaux et Télécommunications",
    school: "Formation spécialisée en infrastructure réseau",
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
  // Outils & DevOps
  { name: "Git", icon: "git", level: 90, category: "tools" },
  { name: "Docker", icon: "docker", level: 80, category: "tools" },
  { name: "Coolify", icon: "coolify", level: 85, category: "tools" },
  { name: "CI/CD & DevOps", icon: "git", level: 75, category: "tools" },
  // Réseaux
  { name: "Réseaux & Wi-Fi", icon: "wifi", level: 85, category: "network" },
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
    label: "Téléphone",
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

// Événements du plus récent au plus ancien
export const events: Event[] = [
  // En cours / 2025
  {
    id: "10",
    title: "Hackathon Digital Ocean — Création d'agents IA",
    date: "Janv. 2026 - En cours",
    description:
      "Participation au hackathon Digital Ocean sur Devpost, dédié à la création d'agents IA. Projet open source (Titan).",
    tags: ["Hackathon", "Digital Ocean", "Devpost", "IA", "Agents", "Open Source"],
    highlight: true,
    badge: "hackathon",
  },
  {
    id: "5",
    title: "Speaker & Organisateur Git & GitHub Fundamentals",
    date: "Déc. 2024",
    description:
      "Organisation et intervention sur les fondamentaux Git & GitHub à Lomé.",
    image: "/assets/workshopgit.jpeg",
    tags: ["Formation", "Git", "GitHub", "Communauté"],
    badge: "community",
  },
  {
    id: "12",
    title: "Speaker — Product / Project Manager (TCC Events)",
    date: "Fév. 2025",
    description:
      "Intervention sur le métier de Product / Project Manager : compétences, défis et opportunités dans l'univers Tech. Événement organisé par Tech Communities Club (TCC).",
    image: "/assets/tcc.jpg",
    tags: ["Speaker", "Product Manager", "Project Manager", "TCC", "Tech"],
    url: "https://www.tcc.hyver.org/e/wKFVOU",
    badge: "community",
  },
  {
    id: "14",
    title: "Premier Devcon satellite ETH Lomé",
    date: "Janv. 2025",
    description:
      "Organisation du premier satellite Devcon au Togo par ETH Lomé, sous ma supervision. Communauté Ethereum à Lomé.",
    image: "/assets/eth-lome-devcon.png",
    tags: ["ETH Lomé", "Devcon", "Ethereum", "Organisateur", "Lomé"],
    badge: "community",
  },
  {
    id: "11",
    title: "Kiro Halloween",
    date: "2025",
    description:
      "Hackathon Kiro Halloween. J'y ai développé et soumis Drive — Local Collaborative Workspace (espace de travail collaboratif local en temps réel). Projet open source.",
    tags: ["Hackathon", "Kiro", "Drive", "Collaboration", "Open Source"],
    badge: "hackathon",
  },
  {
    id: "8",
    title: "Amazon Hackathon",
    date: "Août 2025",
    description:
      "Participation à l'Amazon hackathon à Lomé, Togo. Projet open source.",
    tags: ["Hackathon", "Amazon", "Open Source"],
    badge: "hackathon",
  },
  {
    id: "7",
    title: "Amazon Kiro Hackathon",
    date: "Juillet 2025",
    description:
      "Participation à l'Amazon Kiro hackathon : développement d'une application de détection image par image de la source des vidéos sur les réseaux sociaux, utile pour les journalistes. Projet open source.",
    tags: ["Hackathon", "Amazon", "Développement", "Open Source"],
    badge: "hackathon",
  },
  {
    id: "6",
    title: "Bolt Hackathon",
    date: "Juin 2025",
    description:
      "Participation au Bolt hackathon à Lomé, Togo. Projet open source.",
    tags: ["Hackathon", "Lomé", "Open Source"],
    badge: "hackathon",
  },
  {
    id: "9",
    title: "Finaliste — Accompagnement entrepreneurial OIF par CUBE (D-clic)",
    date: "Avril 2025",
    description:
      "Finaliste du programme d'accompagnement entrepreneurial de l'OIF par CUBE sur D-clic. Pitch du projet Mayele, restructuré par la suite en Rekap.",
    image: "/assets/declic-mayele-rekap.png",
    tags: ["Entrepreneuriat", "D-clic", "OIF", "CUBE", "Mayele", "Rekap"],
    badge: "community",
  },
  {
    id: "13",
    title: "Teknolime — Réseaux informatiques (Tsévié)",
    date: "23-25 avril 2025",
    description:
      "Invité par le projet Teknolime pour animer une session sur les réseaux informatiques auprès des filles du collège et lycée à Tsévié : routeur, SSID, adresse IP, sécurisation du Wi-Fi, autonomie. Initiative Filles & Tech et éducation numérique. Merci à Samira Amadou et à Teknolime.",
    image: "/assets/teknolime.jpeg",
    tags: ["Teknolime", "Réseaux", "FillesEtTech", "Éducation numérique", "Tsévié"],
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
    title: "Co-fondateur & Co-organisateur PyCon Togo",
    date: "Nov. 2024 - Présent",
    description:
      "Développement et animation de la communauté des développeurs Python au Togo. Organisation d'événements techniques et d'ateliers.",
    image: "/assets/coretieam.jpg",
    tags: ["Fondateur", "Communauté", "Leadership"],
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
  "🌐 Réseaux & Infrastructure",
  "💻 Open Source",
  "👥 Communauté Tech",
  "📚 Partage de connaissances",
  "🚀 Innovation",
  "🎬 Cinéma",
  "🏀 Basketball",
  "📷 Photographie",
  "📖 Lecture",
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
  recommendation: "Recommandation",
  community: "Communauté",
  opensource: "Open Source",
  hackathon: "Hackathon",
  entreprise: "Entreprise",
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
// DOCK — Icônes techno → projets (popover au clic)
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
      descriptionShort: "Applications de gestion — APIs backend.",
      projectId: "10",
    },
  ],
  typescript: [
    {
      title: "Coolify MCP Server",
      descriptionShort: "Serveur MCP en TypeScript pour l’API Coolify.",
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
      descriptionShort: "Serveur MCP — runtime Node / TypeScript.",
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
      descriptionShort: "Projet hackathon Kiro — GitHub.",
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
        "App mobile SES + backend Supabase: clients, agents, lieux, créneaux, pointage, notifications.",
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
        "Application métier mobile pour agence sécurité/nettoyage avec backend Supabase.",
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
        "Conteneurisation et déploiement des apps de gestion avec Docker + Coolify.",
      projectId: "10",
    },
    {
      title: "Coolify MCP Server",
      descriptionShort: "Distribution et déploiement — Docker.",
      projectId: "7",
    },
    {
      title: "alonu.tech",
      descriptionShort: "Infra et déploiement — Docker.",
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
        "DevOps backend: architecture, déploiement et supervision via Coolify pour plusieurs apps d'entreprise.",
      projectId: "10",
    },
    {
      title: "alonu.tech — Backend",
      descriptionShort:
        "Architecture backend Nest.js et déploiement en production sur l'infrastructure Coolify.",
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
