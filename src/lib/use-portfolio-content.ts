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
    fr: "Lead Backend Engineer · DevSecOps · Laravel · Nest.js · Node.js | Human AI Ambassador | Co-fondateur de Python Togo & ETH Lome | Rekap",
    en: "Lead Backend Engineer · DevSecOps · Laravel · Nest.js · Node.js | Human AI Ambassador | Co-founder of Python Togo & ETH Lome | Rekap",
  },
  subtitle: {
    fr: "Lead Backend · DevSecOps · Fintech & Mobile Money · Média & production",
    en: "Lead Backend · DevSecOps · Fintech & Mobile Money · Media & production",
  },
  bio: {
    fr: "Lead Backend Engineer et DevSecOps. Lead backend chez alonu group : j'ai conçu l'API de alonu.shop (mise en relation avec des artisans locaux vérifiés au Togo) et migré tous les produits du groupe vers une infrastructure self-hosted durcie (Coolify, Docker, CI/CD, WireGuard). Spécialité fintech : j'ai conçu l'orchestration entre le core banking d'une microfinance (SOAP PERFECTWS) et le paiement instantané PI-SPI de la BCEAO, et j'intègre le mobile money (PayGate, FeexPay ou FedaPay selon le produit) dans la plupart de mes produits. Human AI Ambassador, co-fondateur de Python Togo et ETH Lome, responsable production chez Rekap, auteur du Coolify MCP Server.",
    en: "Lead Backend Engineer and DevSecOps. Lead backend at alonu group in Nest.js: I designed the alonu.shop API (a platform connecting people with verified local artisans in Togo) and moved every group product onto a hardened self-hosted infrastructure (Coolify, Docker, CI/CD, WireGuard). Fintech is my main focus: I built the backend that orchestrates a microfinance core-banking system (SOAP PERFECTWS) and the BCEAO PI-SPI instant-payment rails, and I integrate mobile money (PayGate, FeexPay or FedaPay depending on the product) into most of the products I ship. Human AI Ambassador, co-founder of Python Togo and ETH Lome, production lead at Rekap, author of the Coolify MCP Server.",
  },
  bioShort: {
    fr: "Lead Backend · DevSecOps · Fintech & Mobile Money · Human AI Ambassador · Co-fondateur Python Togo & ETH Lome.",
    en: "Lead Backend · DevSecOps · Fintech & Mobile Money · Human AI Ambassador · Co-founder of Python Togo & ETH Lome.",
  },
  aboutParagraphs: {
    fr: [
      "Je suis Lead Backend Engineer et DevSecOps, basé à Lome, Togo. Je travaille principalement sur les systèmes backend et l'infrastructure.",
      "Comme lead backend chez alonu group, j'ai conçu l'API et l'architecture back de alonu.shop (mise en relation avec des artisans locaux vérifiés au Togo) et migré tous les produits du groupe vers une nouvelle infrastructure self-hosted durcie (Coolify, Docker, CI/CD, maillage privé WireGuard).",
      "La fintech est mon coeur de métier. J'ai conçu l'orchestration entre le core banking d'une microfinance (SOAP PERFECTWS) et le paiement instantané PI-SPI de la BCEAO, et j'intègre le mobile money (PayGate, FeexPay ou FedaPay selon le produit) dans la plupart de mes produits : plateforme artisans, applications mobiles, chambre des métiers, vote et billetterie. Des modules de comptabilité et de paie équipent l'ERP BTP et le système budgétaire ministériel.",
      "Mon périmètre couvre aussi le mobile (React Native), le frontend web (surtout Next.js + TypeScript) et la production média avec Rekap, la société que j'ai co-fondée.",
      "Côté communauté, j'ai co-fondé Python Togo et ETH Lome. Je maintiens aussi des outils open source, dont le Coolify MCP Server.",
    ],
    en: [
      "I am a Lead Backend Engineer and DevSecOps practitioner based in Lome, Togo, working mainly on backend systems and infrastructure.",
      "As lead backend at alonu group, I designed the API and backend architecture for alonu.shop (a platform connecting people with verified local artisans in Togo) and migrated every group product onto a new hardened self-hosted infrastructure (Coolify, Docker, CI/CD, private WireGuard mesh).",
      "Fintech is my main focus. I built the backend that orchestrates a microfinance core-banking system (SOAP PERFECTWS) and the BCEAO PI-SPI instant-payment rails, and I integrate mobile money (PayGate, FeexPay or FedaPay depending on the product) into most of the products I ship: the artisan platform, mobile apps, the chamber of trades, voting and ticketing platforms. Accounting and payroll modules ship in the BTP ERP and the ministry budget system.",
      "My scope also includes mobile development (React Native), web frontend delivery (mostly Next.js + TypeScript), and media production through Rekap, the media company I co-founded.",
      "On the community side, I co-founded Python Togo and ETH Lome. I also build open-source tooling, including the Coolify MCP Server.",
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
  "18": {
    fr: "Agent conversationnel (Google ADK + Gemini) qui répond uniquement à partir de données officielles vérifiées, ancrées par un RAG (corpus Vertex AI de 1 624 indicateurs sur 34 tables, 80+ sources africaines via Fivetran → BigQuery). Frontend Next.js. Créé pour le Google Cloud Rapid Agent Hackathon.",
    en: "Conversational agent (Google ADK + Gemini) answering only from verified official data, grounded by a RAG layer (Vertex AI corpus of 1,624 indicators across 34 tables, 80+ African sources via Fivetran → BigQuery). Next.js frontend. Built for the Google Cloud Rapid Agent Hackathon.",
  },
  "20": {
    fr: "Backend Nest.js qui orchestre le core banking d'une microfinance (SOAP PERFECTWS) et le paiement instantané PI-SPI de la BCEAO : wallet, transferts, alias, OAuth2, 31 endpoints PI-SPI, webhooks signés HMAC-SHA256.",
    en: "Nest.js backend orchestrating a microfinance core-banking system (SOAP PERFECTWS) and the BCEAO PI-SPI instant-payment rails: wallet, transfers, aliases, OAuth2, 31 PI-SPI endpoints, HMAC-SHA256 signed webhooks.",
  },
  "26": {
    fr: "Plateforme événementielle togolaise en production, 7 000+ utilisateurs : vote payant, billetterie et inscriptions, dashboard organisateur, mobile money via FeexPay et FedaPay. Next.js.",
    en: "Togolese event platform, live with 7,000+ users: paid voting, ticketing and registrations, organizer dashboard, mobile money via FeexPay and FedaPay. Next.js.",
  },
  "27": {
    fr: "Plateforme de vote en ligne payant : candidats, jury, transactions, dons, sponsors. Next.js + Supabase + Prisma, mobile money via FedaPay. En production.",
    en: "Paid online voting platform: candidates, jury, transactions, donations, sponsors. Next.js + Supabase + Prisma, mobile money via FedaPay. Live in production.",
  },
  "21": {
    fr: "Backend Nest.js d'une plateforme pour une Chambre des Métiers : annuaire artisans, cartes professionnelles, certificats, formations, cotisations, finances, mobile money, PDF officiels, endpoints service-à-service. 25+ modules.",
    en: "Nest.js backend for a Chamber of Trades platform: artisan directory, professional cards, certificates, training, dues, finances, mobile money, official PDFs, service-to-service endpoints. 25+ modules.",
  },
  "22": {
    fr: "Plateforme full-stack (Nest.js + PostgreSQL/Prisma, front Next.js) pour un ministère togolais : suivi budgétaire par direction, décaissements, documents officiels PDF/Excel, RBAC, module d'archivage physique migré de Laravel vers Nest.js. En production.",
    en: "Full-stack platform (Nest.js + PostgreSQL/Prisma, Next.js frontend) for a Togolese ministry: budget tracking per directorate, disbursements, official PDF/Excel documents, RBAC, physical archiving module migrated from Laravel to Nest.js. Live in production.",
  },
  "34": {
    fr: "Application full-stack Next.js (PostgreSQL, Prisma, NextAuth) pour le Ministère de l'Aménagement du Territoire : des accompagnateurs affectés par commune aident les usagers à monter leur dossier de déclaration d'association civile ; une gérante revoit et valide seule le dépôt physique. Synchronisation des communes (GeoData), invitations par email, audit.",
    en: "Full-stack Next.js application (PostgreSQL, Prisma, NextAuth) for the Ministry of Territorial Planning: commune-assigned case workers help citizens build their civil-association declaration file; a manager reviews and is the sole approver of the physical filing. Commune sync (GeoData), email invitations, audit trail.",
  },
  "23": {
    fr: "ERP complet pour une entreprise de BTP : chantiers, devis, factures, paie, pointages, stock, comptabilité et exports PDF/Excel, cartographie Leaflet. Next.js / React, PostgreSQL, Docker. v3, en production.",
    en: "Full ERP for a construction company: sites, quotes, invoices, payroll, timesheets, inventory, accounting and PDF/Excel exports, Leaflet mapping. Next.js / React, PostgreSQL, Docker. v3, in production.",
  },
  "24": {
    fr: "Conception, développement et déploiement de l'API de la plateforme B2B GoldenDays : catalogue, comptes professionnels, commandes. Nest.js, Docker, Coolify.",
    en: "Design, development and deployment of the GoldenDays B2B platform API: catalog, professional accounts, orders. Nest.js, Docker, Coolify.",
  },
  "25": {
    fr: "API CMS et LMS pour une plateforme d'e-learning : cours, modules, progression, contenu éditorial. Nest.js + TypeScript. Frontend en cours.",
    en: "CMS and LMS API for an e-learning platform: courses, modules, progress tracking, editorial content. Nest.js + TypeScript. Frontend in progress.",
  },
  "28": {
    fr: "Plateforme multi-tenant : chaque commerçant a sa boutique en ligne (slug, sous-domaine), back-office centralisé, gestion produits, paiement mobile money via FedaPay. Next.js + Prisma/PostgreSQL, Docker.",
    en: "Multi-tenant platform: each merchant gets an online storefront (slug, subdomain), central back-office, product management, mobile money via FedaPay. Next.js + Prisma/PostgreSQL, Docker.",
  },
  "33": {
    fr: "Application mobile React Native / Expo (iOS & Android) : publication photo/vidéo et classement des profils par ville, pays et zone selon l'engagement réel. App + back-office, backend Supabase.",
    en: "React Native / Expo mobile app (iOS & Android): photo/video posting and profile ranking by city, country and area based on real engagement. App + back-office, Supabase backend.",
  },
  "30": {
    fr: "Contribution open source à biopass (TickLabVN) : authentification faciale pour Linux (PAM), anti-spoofing par capteur IR, calibrage des seuils. Alternative à Howdy.",
    en: "Open-source contribution to biopass (TickLabVN): facial authentication for Linux (PAM), IR-sensor anti-spoofing, threshold calibration. A Howdy alternative.",
  },
  "31": {
    fr: "Contribution aux sources françaises de l'app Aidoku (fork) : correction du parsing MangasOrigines et maintenance d'autres sources.",
    en: "Contribution to the French sources for the Aidoku app (fork): fixed MangasOrigines parsing and maintained other sources.",
  },
  "32": {
    fr: "Plateforme self-hosted de gestion d'infrastructure MikroTik : dashboard, monitoring, topologie, firewall, VPN WireGuard, hotspot avec vouchers. Node.js/TypeScript, InfluxDB, Redis, Docker. Conçue et développée par mes soins.",
    en: "Self-hosted MikroTik infrastructure management platform: dashboard, monitoring, topology, firewall, WireGuard VPN, hotspot with vouchers. Node.js/TypeScript, InfluxDB, Redis, Docker. Designed and built by me.",
  },
  "14": {
    fr: "Backend et infrastructure de alonu.shop (mise en relation avec des artisans locaux vérifiés) : architecture Nest.js, conception de l'API, sécurité (DevSecOps), mobile money, et migration de tous les produits du groupe sur une infrastructure self-hosted (Coolify, Docker, CI/CD, WireGuard).",
    en: "Backend and infrastructure for alonu.shop (connecting people with verified local artisans): Nest.js architecture, API design, security (DevSecOps), mobile money, and migration of every group product onto a self-hosted infrastructure (Coolify, Docker, CI/CD, WireGuard).",
  },
  "13": {
    fr: "Conception et développement de l'API d'un projet de vente et location de voitures, en production sur dealautotg.com (stack VotelyTG), paiement mobile money via FedaPay.",
    en: "Design and development of the API for a car sales and rental project, live on dealautotg.com (VotelyTG stack), mobile money payments via FedaPay.",
  },
  "12": {
    fr: "Application web développée en Laravel 11, liée aux marchés publics.",
    en: "Laravel 11 web application related to public procurement.",
  },
  "11": {
    fr: "Application Laravel 12 pour afriqueinformatique.net : dashboard d'administration, facturation (devis, factures, approbation) et suivi comptable. En production sur facturel.afriqueinformatique.net.",
    en: "Laravel 12 application for afriqueinformatique.net: admin dashboard, invoicing (quotes, invoices, approval) and accounting tracking. Live on facturel.afriqueinformatique.net.",
  },
  "10": {
    fr: "Application de gestion d'agence de sécurité et de nettoyage (agents, affectations, pointage, notifications, administration), déployée pour SES (sesachat.com) et CGSP (cgsp.gestion.com). Backend, sécurité et DevOps (Coolify, Docker).",
    en: "Security and cleaning agency management app (agents, assignments, attendance, notifications, admin), deployed for SES (sesachat.com) and CGSP (cgsp.gestion.com). Backend, security and DevOps (Coolify, Docker).",
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
    fr: "Réseau campus de l'Université de Lomé (UL) : Wi-Fi haute densité pour les amphithéâtres et bibliothèques, load balancing, QoS.",
    en: "University of Lomé (UL) campus network: high-density Wi-Fi for lecture halls and libraries, load balancing, QoS.",
  },
  "2": {
    fr: "Réseau du CHU de Kégué (Lomé) : redondance des liens et sécurisation des données médicales (VLAN, routage, firewall).",
    en: "CHU de Kégué hospital network (Lomé): link redundancy and medical-data hardening (VLAN, routing, firewall).",
  },
  "1": {
    fr: "Réseau du CHU Sylvanus Olympio (Tokoin, Lomé) : câblage structuré Cat6 et couverture Wi-Fi de l'ensemble des services.",
    en: "CHU Sylvanus Olympio network (Tokoin, Lomé): structured Cat6 cabling and full-site Wi-Fi coverage.",
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
    title: { fr: "Lead Backend Engineer & DevSecOps", en: "Lead Backend Engineer & DevSecOps" },
    period: { fr: "Oct. 2025 - Présent", en: "Oct. 2025 - Present" },
    description: {
      fr: "Lead backend chez alonu group : conception de l'API, architecture Nest.js, sécurité applicative, et migration de tous les produits du groupe vers une infrastructure self-hosted (Coolify, Docker, CI/CD, maillage privé WireGuard). Backends fintech : core banking SOAP PERFECTWS, PI-SPI de la BCEAO, mobile money (PayGate, FeexPay ou FedaPay selon le produit).",
      en: "Lead backend at alonu group: API design, Nest.js architecture, application security, and migration of every group product onto a self-hosted infrastructure (Coolify, Docker, CI/CD, private WireGuard mesh). Fintech backends: SOAP PERFECTWS core banking, BCEAO PI-SPI, mobile money (PayGate, FeexPay or FedaPay depending on the product).",
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
    title: { fr: "Hackathon Digital Ocean - Agents IA", en: "Digital Ocean Hackathon - AI Agents" },
    date: { fr: "Janv. 2026 - En cours", en: "Jan. 2026 - Ongoing" },
    description: { fr: "Participation au hackathon Digital Ocean sur les agents IA.", en: "Participating in the Digital Ocean hackathon focused on AI agents." },
  },
  "5": {
    title: { fr: "Speaker & Organisateur Git/GitHub", en: "Speaker & Organizer - Git/GitHub" },
    date: { fr: "Déc. 2024", en: "Dec. 2024" },
    description: { fr: "Intervention technique sur Git et GitHub à Lome.", en: "Technical talk on Git and GitHub fundamentals in Lome." },
  },
  "12": {
    title: { fr: "Speaker - Product / Project Manager (TCC)", en: "Speaker - Product / Project Manager (TCC)" },
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
    title: { fr: "Finaliste - Programme entrepreneurial OIF/CUBE", en: "Finalist - OIF/CUBE Entrepreneurship Program" },
    date: { fr: "Avril 2025", en: "Apr. 2025" },
    description: { fr: "Finaliste du programme avec le projet Mayele (ensuite Rekap).", en: "Finalist with the Mayele project (later restructured into Rekap)." },
  },
  "13": {
    title: { fr: "Teknolime - Réseaux informatiques (Tsévié)", en: "Teknolime - Computer Networks (Tsevie)" },
    date: { fr: "23-25 avril 2025", en: "Apr. 23-25, 2025" },
    description: { fr: "Session réseaux pour collégiennes/lycéennes: routeur, SSID, IP, sécurité Wi-Fi.", en: "Networks session for girls: router, SSID, IP, and Wi-Fi security basics." },
  },
  "15": {
    title: { fr: "Staff - 1ère Compétition Nationale de Robotique (Togo)", en: "Staff - 1st National Robotics Competition (Togo)" },
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
