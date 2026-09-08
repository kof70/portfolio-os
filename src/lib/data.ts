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
  /** Paragraphes structurés pour "À propos" (intro, focus, atout) - si présents, affichés à la place du bio en bloc */
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
// - community      : Community - UNIQUEMENT des events (PyDevs, PyDay, PyCon).
// - opensource     : Projets ou events open source (repos publics, workshops).
// - hackathon      : Participations à des hackathons.
// - entreprise     : Projets dont je suis CEO/managementnaire (Rekap, Titan, etc.).
//

export const personalInfo: PersonalInfo = {
  name: "DJAKPA Koffi Tepe Venougne",
  title: "Lead Backend Engineer · DevSecOps · Laravel · Nest.js · Node.js | Human AI Ambassador | Co-founder of Python Togo & ETH Lome | Rekap",
  subtitle: "Lead Backend · DevSecOps · Fintech & Mobile Money · Media & production",
  location: "📍 Lome, Togo",
  avatar: "/assets/profile2.png",
  bio: "Lead Backend Engineer and DevSecOps. Lead backend at alonu group in Nest.js - I designed the alonu.shop API (a platform connecting people with verified local artisans in Togo) and moved every group product onto a hardened self-hosted infrastructure (Coolify, Docker, CI/CD, WireGuard). Fintech is my main focus: I built the backend that orchestrates a microfinance core-banking system (SOAP PERFECTWS) and the BCEAO PI-SPI instant-payment rails, and I integrate mobile money (PayGate, FeexPay or FedaPay depending on the product) into most of the products I ship. Human AI Ambassador, co-founder of Python Togo and ETH Lome, production lead at Rekap, author of the Coolify MCP Server.",
  aboutParagraphs: [
    "I am a Lead Backend Engineer and DevSecOps practitioner based in Lome, Togo, working mainly on backend systems and infrastructure.",
    "As lead backend at alonu group, I designed the API and backend architecture for alonu.shop - a platform connecting people with verified local artisans in Togo - and migrated every group product onto a new hardened self-hosted infrastructure (Coolify, Docker, CI/CD, private WireGuard mesh).",
    "Fintech is my main focus. I built the backend that orchestrates a microfinance core-banking system (SOAP PERFECTWS) and the BCEAO PI-SPI instant-payment rails, and I integrate mobile money - PayGate, FeexPay or FedaPay depending on the product - across the artisan platform, mobile apps, the chamber of trades, voting and ticketing platforms. Accounting and payroll modules ship in the BTP ERP and the ministry budget system.",
    "My scope also includes mobile development (React Native), web frontend delivery (mostly Next.js + TypeScript), and media production through Rekap, the media company I co-founded.",
    "On the community side, I co-founded Python Togo and ETH Lome. I also build open-source tooling, including the Coolify MCP Server.",
  ],
  bioShort:
    "Lead Backend · DevSecOps · Fintech & Mobile Money · Human AI Ambassador · Co-founder of Python Togo & ETH Lome.",
  available: true,
};

// Du plus récent au plus ancien
export const projects: Project[] = [
  // Company
  {
    id: "16",
    title: "Titan",
    description:
      "Agent IA créé dans le cadre du hackathon Digital Ocean sur Devpost. Project en cours - creation d'agents IA.",
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
  // IA / Agents
  {
    id: "18",
    title: "Kekeli - Agent IA anti-hallucination (data africaine)",
    description:
      "Agent conversationnel (Google ADK + Gemini) répondant uniquement à partir de données officielles vérifiées, réponses ancrées par un RAG (corpus Vertex AI de 1 624 indicateurs sur 34 tables) : ~74 000 lignes, 80+ sources africaines (IMF, WHO, FAO, World Bank, UNICEF, NASA…) via pipeline Fivetran → BigQuery synchronisé toutes les 6h, 54 pays. Frontend Next.js (chat streaming SSE), Firebase Auth/Firestore, fallback Claude Opus via Vertex AI. Créé pour le Google Cloud Rapid Agent Hackathon (Fivetran Track).",
    tags: ["IA", "Agent", "RAG", "Google ADK", "Gemini", "BigQuery", "Fivetran", "Next.js"],
    liveUrl: "https://kekeli.alonu.shop",
    category: "web",
    badge: "hackathon",
  },
  // Fintech · Mobile Money · Comptabilité
  {
    id: "20",
    title: "API Microfinance - orchestration core banking (PERFECTWS) ↔ PI-SPI (BCEAO)",
    description:
      "Backend Nest.js qui orchestre le core banking d'une microfinance (webservice SOAP PERFECTWS) et le paiement instantané PI-SPI de la BCEAO : un dépôt ou retrait déclenche l'opération PI-SPI puis l'écriture côté PERFECTWS, avec rapprochement. Wallet, transferts, gestion d'alias, OAuth2, 31 endpoints PI-SPI, webhooks entrants signés HMAC-SHA256. Sécurité et tests de bout en bout en sandbox.",
    tags: ["Nest.js", "TypeScript", "Backend", "PI-SPI", "BCEAO", "PERFECTWS", "SOAP", "DevSecOps"],
    category: "web",
  },
  {
    id: "26",
    title: "VotelyTG - Vote payant, billetterie & inscriptions",
    description:
      "Plateforme événementielle togolaise en production, plus de 7 000 utilisateurs : vote en ligne payant, billetterie et inscriptions pour concours et events. Dashboard organisateur, commissions configurables par événement, paiement mobile money via FeexPay et FedaPay (Flooz, Mixx/T-Money, opérateurs UEMOA sans redirection) et reversements aux organisateurs. Next.js.",
    tags: ["Next.js", "TypeScript", "FeexPay", "FedaPay", "Mobile Money", "Prisma"],
    liveUrl: "https://votelytg.com",
    category: "web",
  },
  {
    id: "27",
    title: "Génie des Pages - Plateforme de vote en ligne",
    description:
      "Plateforme de vote en ligne payant : candidats, jury, transactions de vote, dons, sponsors, tickets de support. Next.js + Supabase (auth, storage) + Prisma, paiement mobile money via FedaPay, deployment Docker. En production.",
    tags: ["Next.js", "Supabase", "Prisma", "Mobile Money", "FedaPay", "Docker"],
    liveUrl: "https://geniedespages.com/",
    category: "web",
  },
  {
    id: "11",
    title: "Afrique Informatique - Facturation & Comptabilité (Laravel)",
    description:
      "Application de gestion développée en Laravel 12 pour afriqueinformatique.net : dashboard d'administration, facturation (devis, factures, workflow d'approbation), suivi comptable, bases clients/produits. Project en collaboration. En production sur facturel.afriqueinformatique.net.",
    tags: ["Laravel", "PHP", "MySQL", "Facturation", "Comptabilité"],
    liveUrl: "https://facturel.afriqueinformatique.net/",
    category: "web",
  },
  // Web / Backend
  {
    id: "14",
    title: "alonu.shop - Backend & Infrastructure (alonu group)",
    description:
      "Backend et infrastructure de alonu, plateforme de mise en relation avec des artisans locaux vérifiés au Togo : artisans, devis, commandes, produits, messagerie. Intégration du paiement mobile money via PayGate pour l'achat et la livraison sur la plateforme, plus financement/microfinance et parrainage. Architecture Nest.js, conception de l'API, sécurité applicative (DevSecOps), migration/deployment de l'ensemble des produits du groupe sur une infrastructure self-hosted - Coolify, Docker, CI/CD, maillage réseau privé WireGuard. Monitoring et exploitation en production.",
    tags: ["Nest.js", "TypeScript", "Backend", "API", "Mobile Money", "DevSecOps", "Coolify", "WireGuard"],
    liveUrl: "https://alonu.shop",
    category: "web",
  },
  {
    id: "32",
    title: "MikroTik Manager - Plateforme de gestion réseau",
    description:
      "Plateforme self-hosted de management d'infrastructure MikroTik (routeurs, switches, points d'accès Wi-Fi) : dashboard, monitoring hardware et trafic (NetFlow), topologie réseau, firewall, VPN WireGuard (peers, clés, tunnels site-à-site), hotspot avec génération de vouchers PDF, 2FA, backups, panneau SaaS + marketplace. Plateforme conçue et développée par mes soins. Node.js/Express/TypeScript, InfluxDB, Redis, BullMQ, Docker.",
    tags: ["Node.js", "TypeScript", "WireGuard", "InfluxDB", "Redis", "BullMQ", "Docker", "MikroTik"],
    liveUrl: "https://techzone.africa/",
    category: "network",
  },
  {
    id: "21",
    title: "Backend Chambre des Métiers (Togo)",
    description:
      "Backend Nest.js d'une plateforme de management pour une Chambre des Métiers : annuaire des artisans, cartes professionnelles, certificats, formations (CFA, apprentissage), cotisations, finances chambre/artisan, paiement mobile money, ventes au guichet, génération de PDF officiels, endpoints service-à-service avec alonu group. 25+ modules.",
    tags: ["Nest.js", "TypeScript", "Backend", "PostgreSQL", "Mobile Money", "PDF"],
    liveUrl: "https://crm.alonu.shop/",
    category: "web",
  },
  {
    id: "22",
    title: "Système de Gestion Budgétaire - Ministère de l'Aménagement du Territoire (Togo)",
    description:
      "Plateforme full-stack (Nest.js + PostgreSQL/Prisma, front Next.js) pour le Ministère de l'Aménagement du Territoire, du Développement et de la Consolidation Constitutionnelle : soumission et suivi de projects par direction, lignes et sections budgétaires, décaissements, missions, génération de documents officiels PDF/Excel (en-tête République Togolaise), RBAC, module d'archivage physique (Direction/Salle/Rangée/Classeur/Fichier, audit logs, i18n FR/EN/ES) que j'ai migré de Laravel vers Nest.js, tâches de trésorerie type Kanban. En production.",
    tags: ["Nest.js", "Next.js", "PostgreSQL", "Prisma", "RBAC", "Comptabilité"],
    liveUrl: "https://budget-ministere.coolify.alonu.shop",
    category: "web",
  },
  {
    id: "34",
    title: "Accompagnement à la déclaration d'association civile - MAT (Togo)",
    description:
      "Application full-stack Next.js (PostgreSQL, Prisma, NextAuth) pour le Ministère de l'Aménagement du Territoire : les accompagnateurs affectés à une commune aident les usagers à monter leur dossier de déclaration d'association civile (pièces, uploads, suivi), une gérante revoit les dossiers et valide seule le dépôt physique. Synchronisation des communes (GeoData), invitations agents par email (SMTP), audit. Réutilise les modules d'archivage et de gestion de projet du système budgétaire ministériel.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "NextAuth", "Gov Togo", "Multi-mairie"],
    liveUrl: "https://association.coolify.alonu.shop",
    category: "web",
  },
  {
    id: "23",
    title: "Gestion BTP - ERP chantiers (comptabilité & paie)",
    description:
      "Application complète pour entreprise de BTP : chantiers, devis, factures, paie, pointages, stock, comptabilité et exports PDF/Excel, cartographie Leaflet. Next.js / React, PostgreSQL, Docker, tests Vitest & Playwright. v3, en production.",
    tags: ["Next.js", "React", "PostgreSQL", "Comptabilité", "Paie", "Docker"],
    liveUrl: "https://btp.coolify.sesachat.com",
    category: "web",
  },
  {
    id: "24",
    title: "GoldenDays B2B - API",
    description:
      "Design and development puis deployment de l'API de la plateforme B2B GoldenDays : catalogue, comptes professionnels, commandes. Nest.js, Docker, Coolify.",
    tags: ["Nest.js", "API", "Backend", "Docker", "Coolify"],
    liveUrl: "https://goldendays-b2b.alonu.shop",
    category: "web",
  },
  {
    id: "25",
    title: "Plateforme E-learning - API CMS & LMS",
    description:
      "API CMS et LMS pour une plateforme d'e-learning : cours, modules, progression, contenu éditorial. Nest.js + TypeScript. Frontend en cours.",
    tags: ["Nest.js", "TypeScript", "API", "LMS", "CMS"],
    liveUrl: "https://learning-api.coolify.alonu.shop",
    category: "web",
  },
  {
    id: "28",
    title: "dbla - Plateforme de boutiques multi-tenant",
    description:
      "Plateforme multi-tenant : chaque commerçant dispose de sa boutique en ligne (URL par slug, sous-domaine), back-office d'administration centralisé, management produits et images, paiement mobile money via FedaPay (webhooks). Next.js + Prisma/PostgreSQL, Docker.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Multi-tenant", "FedaPay", "Docker"],
    liveUrl: "https://d-bla.com",
    category: "web",
  },
  {
    id: "33",
    title: "WOOO - Réseau social de classement local",
    description:
      "Application mobile React Native / Expo (iOS & Android) : chaque utilisateur publie photos et vidéos, un algorithme classe les profils par ville, pays et zone selon l'engagement réel (likes, interactions, croissance). App + back-office d'administration, backend Supabase.",
    tags: ["React Native", "Expo", "Supabase", "Mobile", "Social"],
    category: "mobile",
  },
  {
    id: "13",
    title: "API Vente & Location de voitures",
    description:
      "Conception et développement de l'API d'un projet de vente et location de voitures, en production sur dealautotg.com, sur la stack VotelyTG : paiement mobile money via FedaPay.",
    tags: ["API", "Backend", "Nest.js", "FedaPay", "VotelyTG"],
    liveUrl: "https://dealautotg.com/",
    category: "web",
  },
  {
    id: "12",
    title: "Gnonel.com",
    description:
      "Application web développée en Laravel 11, liée aux marchés publics.",
    tags: ["Laravel", "PHP", "Marchés publics"],
    liveUrl: "https://gnonel.com",
    category: "web",
  },
  {
    id: "10",
    title: "SES & CGSP - Application de gestion pour agences de sécurité",
    description:
      "Application de gestion d'agence de sécurité et de nettoyage (clients, agents, lieux d'affectation, créneaux, pointage, notifications, administration), déployée pour plusieurs clients : SES (sesachat.com) et CGSP (cgsp.gestion.com). Backend, sécurité applicative et DevOps ; deployment et monitoring (Coolify, Docker).",
    tags: ["Backend", "DevOps", "Security", "Coolify", "Docker"],
    liveUrl: "https://sesachat.com/",
    category: "web",
  },
  {
    id: "17",
    title: "SES Mobile - Management operations (Supabase)",
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
    title: "Cheffe Citronnelle - Mobile app",
    description:
      "Mobile app React Native pour Cheffe Citronnelle, la maison des délices à Lome. orders, tracking, home delivery et paiement mobile money.",
    tags: ["React Native", "Mobile", "Mobile Money", "Delivery", "Lome"],
    liveUrl: "https://cheffecitronnelle.com/",
    category: "mobile",
  },
  // Open Source
  {
    id: "30",
    title: "biopass - Authentification faciale (alternative à Howdy)",
    description:
      "Contribution open source à biopass (TickLabVN) : authentification faciale pour Linux (PAM), détection anti-spoofing par capteur IR, calibrage des seuils. Alternative à Howdy.",
    tags: ["Open Source", "Linux", "PAM", "Biométrie", "Anti-spoofing"],
    githubUrl: "https://github.com/kof70/biopass",
    category: "web",
    badge: "opensource",
  },
  {
    id: "31",
    title: "Aidoku - Sources manga françaises",
    description:
      "Contribution aux sources françaises installables dans l'app Aidoku (fork) : correction du parsing MangasOrigines (détection du viewer, réglage viewer par défaut) et maintenance d'autres sources.",
    tags: ["Open Source", "Aidoku", "Scraping", "Manga"],
    githubUrl: "https://github.com/kof70/aidoku-french-sources",
    liveUrl: "https://kof70.github.io/aidoku-french-sources/",
    category: "web",
    badge: "opensource",
  },
  {
    id: "8",
    title: "VoirDrama Stremio Addon",
    description:
      "Addon Stremio (catalog + metadata + streams) basé sur le scraping de voirdrama.org. Films et séries - personal use.",
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
    title: "Drive - Local Collaborative Workspace",
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
    title: "Infrastructure réseau - Université de Lomé (UL)",
    description:
      "Conception et déploiement du réseau campus de l'Université de Lomé (UL) : points d'accès Wi-Fi haute densité pour les amphithéâtres et les bibliothèques, load balancing et QoS.",
    image: "/assets/CHUul.jpg",
    tags: ["Haute Densité", "Load Balancing", "QoS"],
    category: "network",
  },
  {
    id: "2",
    title: "Infrastructure réseau - CHU de Kégué (Lomé)",
    description:
      "Installation et configuration du réseau du Centre Hospitalier Universitaire (CHU) de Kégué à Lomé : redondance des liens et sécurisation des données médicales (VLAN, routage, firewall).",
    image: "/assets/kegueulrich.jpg",
    tags: ["Routing", "VLAN", "Security"],
    category: "network",
  },
  {
    id: "1",
    title: "Infrastructure réseau - CHU Sylvanus Olympio (Tokoin, Lomé)",
    description:
      "Déploiement du réseau du Centre Hospitalier Universitaire (CHU) Sylvanus Olympio, quartier Tokoin à Lomé : câblage structuré Cat6 et points d'accès Wi-Fi pour couvrir l'ensemble des services.",
    image: "/assets/tokoin.jpg",
    tags: ["Cisco", "Cat6 cabling", "Wi-Fi 6"],
    category: "network",
  },
];

// Du plus récent au plus ancien
export const experiences: Experience[] = [
  {
    id: "11",
    title: "Lead Backend Engineer & DevSecOps",
    company: "alonu group",
    period: "Oct. 2025 - Present",
    description:
      "Oct.-Nov. : frontend mobile (app React Native Cheffe Citronnelle) et version web de la plateforme alonu.shop. Dès Dec. : lead backend & DevSecOps - conception de l'API, architecture back Nest.js, sécurité applicative, et migration/deployment de tous les produits du groupe sur une nouvelle infrastructure self-hosted (Coolify, Docker, CI/CD, maillage privé WireGuard). Backends fintech : core banking SOAP, PI-SPI de la BCEAO, mobile money (PayGate, FeexPay, FedaPay).",
  },
  {
    id: "12",
    title: "Tester freelance",
    company: "Testerworks & GitHub",
    period: "2024 - Present",
    description:
      "Tests logiciels en freelance sur Testerworks et via GitHub. Contrats réalisés : MI snap Dev App (vérification de passeports et cartes d'identité pour fiabilité et authenticité), et d'autres applications.",
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
  { name: "Laravel", icon: "apiIntegration", level: 85, category: "backend" },
  { name: "Nest.js", icon: "nodejs", level: 85, category: "backend" },
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
    value: "+228 70 29 83 24",
    href: "tel:+22870298324",
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
    label: "WhatsApp",
    value: "wa.me/22870298324",
    href: "https://wa.me/22870298324",
    hoverColor: "hover:text-green-400",
  },
];

// Events du plus récent au plus ancien
export const events: Event[] = [
  // En cours / 2025
  {
    id: "10",
    title: "Hackathon Digital Ocean - Création d'agents IA",
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
    title: "Speaker - Product / Project Manager (TCC Events)",
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
      "Hackathon Kiro Halloween. J'y ai développé et soumis Drive - Local Collaborative Workspace (espace de travail collaboratif local en temps réel). Project open source.",
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
    title: "Finaliste - Accompagnement entrepreneurial OIF par CUBE (D-clic)",
    date: "Avril 2025",
    description:
      "Finaliste du programme d'accompagnement entrepreneurial de l'OIF par CUBE sur D-clic. Pitch du project Mayele, restructuré par la suite en Rekap.",
    image: "/assets/declic-mayele-rekap.png",
    tags: ["Entrepreneuriat", "D-clic", "OIF", "CUBE", "Mayele", "Rekap"],
    badge: "community",
  },
  {
    id: "13",
    title: "Teknolime - Networks informatiques (Tsévié)",
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
    title: "Staff - 1ère Compétition Nationale de Robotique au Secondaire (Togo)",
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
// DOCK - Icônes techno → projects (popover au clic)
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
      descriptionShort: "API Coolify exposée via MCP - tests et doc Postman.",
      projectId: "7",
    },
    {
      title: "alonu.shop - Backend",
      descriptionShort: "API Nest.js - intégration et tests.",
      projectId: "14",
    },
    {
      title: "SES & CGSP",
      descriptionShort: "Management applications - APIs backend.",
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
      descriptionShort: "Workspace collaboratif local - stack TypeScript + Vite.",
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
      descriptionShort: "Canvas et sync temps réel - React + WebSocket.",
      projectId: "6",
    },
    {
      title: "StartUpHub",
      descriptionShort: "Plateforme startups / investisseurs - React + Supabase.",
      projectId: "4",
    },
    {
      title: "Ce portfolio",
      descriptionShort: "Interface bureau - React (Next.js).",
      href: "/",
    },
  ],
  nextjs: [
    {
      title: "Ce portfolio",
      descriptionShort: "Portfolio type OS / bureau - Next.js.",
      href: "/",
    },
  ],
  tailwind: [
    {
      title: "Ce portfolio",
      descriptionShort: "UI du bureau, dock et fenêtres - Tailwind CSS.",
      href: "/",
    },
  ],
  nodejs: [
    {
      title: "VoirDrama Stremio Addon",
      descriptionShort: "Addon Stremio - Node.js, scraping et streams.",
      projectId: "8",
    },
    {
      title: "alonu.shop - Backend",
      descriptionShort: "API Nest.js - Node.js.",
      projectId: "14",
    },
    {
      title: "Coolify MCP Server",
      descriptionShort: "MCP Server - runtime Node / TypeScript.",
      projectId: "7",
    },
  ],
  git: [
    {
      title: "Coolify MCP Server",
      descriptionShort: "Open source - dépôt GitHub.",
      projectId: "7",
    },
    {
      title: "Drive",
      descriptionShort: "Project hackathon Kiro - GitHub.",
      projectId: "6",
    },
    {
      title: "StartUpHub",
      descriptionShort: "Open source - GitHub.",
      projectId: "4",
    },
    {
      title: "VoirDrama Stremio Addon",
      descriptionShort: "Addon perso - GitHub.",
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
      descriptionShort: "Distribution et deployment - Docker.",
      projectId: "7",
    },
    {
      title: "alonu.shop",
      descriptionShort: "Infra et deployment - Docker.",
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
      title: "alonu.shop - Backend",
      descriptionShort:
        "Architecture backend Nest.js et deployment en production sur l'infrastructure Coolify.",
      projectId: "14",
    },
    {
      title: "Cheffe Citronnelle - Mobile",
      descriptionShort:
        "Stack mobile (React Native) connectée au backend déployé et maintenu côté infrastructure.",
      projectId: "9",
    },
  ],
};

export const getDockTechProjects = (techId: DockTechId): DockTechProjectItem[] =>
  DOCK_TECH_PROJECTS[techId] ?? [];
