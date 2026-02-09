import { AppWrapper } from "@/components/app-wrapper";
import { BottomBar } from "@/components/desktop/bottom-bar";
import { ContextMenuProvider } from "@/components/desktop/context-menu";
import { TopBar } from "@/components/desktop/top-bar";
import { WindowManager, WindowProvider } from "@/components/desktop/viewer";
import DynamicBackground from "@/components/shared/dynamic-background";
import { DesktopStorageProvider } from "@/hooks/use-desktop-storage-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
});

// ---------------------------------------------------------------------------
// SEO — Métadonnées complètes
// ---------------------------------------------------------------------------

const SITE_URL = "https://kof.dev"; // Remplacer par le vrai domaine une fois déployé
const SITE_NAME = "Kof — DJAKPA Koffi Tepe Venougne";
const DESCRIPTION =
  "Portfolio de DJAKPA Koffi (Kof) — Développeur Backend & DevOps, Nest.js, Node.js, React Native, Docker, Coolify. Co-fondateur Python Togo & ETH Lomé. Human AI Ambassador. Basé à Lomé, Togo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kof — DJAKPA Koffi Tepe Venougne | Backend · DevOps · Full Stack",
    template: "%s | Kof Portfolio",
  },
  description: DESCRIPTION,
  keywords: [
    // Identité
    "Kof",
    "DJAKPA Koffi",
    "DJAKPA Koffi Tepe Venougne",
    "Kof70",
    "kof developer",
    "kof togo",
    "kof dev",
    // Métiers
    "Développeur Backend",
    "Développeur Full Stack",
    "DevOps",
    "Ingénieur Réseaux",
    "Développeur Nest.js",
    "Développeur Node.js",
    "Développeur React Native",
    "Software Engineer Togo",
    "Backend Developer Africa",
    // Technologies
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Docker",
    "Coolify",
    "Expo",
    "React",
    "Node.js",
    "Nest.js",
    "React Native",
    "MCP Server",
    "CI/CD",
    // Projets & Open Source
    "Coolify MCP Server",
    "alonu.tech",
    "Rekap",
    "Titan AI",
    "Cheffe Citronnelle",
    "VoirDrama Stremio",
    // Communautés
    "Python Togo",
    "PyDevs Togo",
    "ETH Lomé",
    "Human AI Ambassador",
    "Africa Blockchain Community",
    "OnlyDust",
    // Géo
    "Lomé",
    "Togo",
    "Développeur Togo",
    "Freelance Togo",
    "Tech Togo",
    "Portfolio Togo",
    // Événements
    "Hackathon Digital Ocean",
    "Hackathon Kiro",
    "Robotique Togo",
    "PyCon",
    "PyDay",
  ],
  authors: [
    { name: "DJAKPA Koffi Tepe Venougne", url: "https://github.com/kof70" },
  ],
  creator: "DJAKPA Koffi Tepe Venougne",
  publisher: "DJAKPA Koffi Tepe Venougne",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Kof — DJAKPA Koffi Tepe Venougne | Backend · DevOps · Full Stack",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    // L'image OG est générée automatiquement par opengraph-image.tsx
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kof — DJAKPA Koffi | Backend · DevOps · Full Stack",
    description: DESCRIPTION,
    // L'image Twitter est générée automatiquement par twitter-image.tsx
    creator: "@kof70",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full overflow-hidden">
      <head>
        {/* JSON-LD : Person + WebSite — référencement structuré */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: SITE_NAME,
                  description: DESCRIPTION,
                  inLanguage: "fr-FR",
                },
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  name: "DJAKPA Koffi Tepe Venougne",
                  alternateName: ["Kof", "Kof70"],
                  url: SITE_URL,
                  image: `${SITE_URL}/assets/profile2.png`,
                  jobTitle: [
                    "Développeur Backend",
                    "DevOps Engineer",
                    "Développeur Full Stack",
                  ],
                  description:
                    "Développeur Backend & DevOps basé à Lomé, Togo. Nest.js, Node.js, Docker, Coolify. Co-fondateur Python Togo & ETH Lomé. Human AI Ambassador.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lomé",
                    addressCountry: "TG",
                  },
                  sameAs: [
                    "https://github.com/kof70",
                    "https://www.linkedin.com/in/djakpa-koffi-t%C3%A9p%C3%A9-v%C3%A9nougn%C3%A9-0a23a7251/",
                  ],
                  knowsAbout: [
                    "Backend Development",
                    "DevOps",
                    "Nest.js",
                    "Node.js",
                    "React Native",
                    "Docker",
                    "Coolify",
                    "Next.js",
                    "TypeScript",
                    "Network Engineering",
                    "MCP Server",
                  ],
                  memberOf: [
                    { "@type": "Organization", name: "Python Togo" },
                    { "@type": "Organization", name: "ETH Lomé" },
                    { "@type": "Organization", name: "Rekap" },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased relative h-full flex flex-col items-center bg-black overflow-hidden`}
        suppressHydrationWarning
      >
        <DesktopStorageProvider>
          <ContextMenuProvider>
            <WindowProvider>
              <AppWrapper>
                <DynamicBackground />
                <TopBar />
                <main className="flex-1 w-full overflow-hidden">
                  {children}
                </main>
                <BottomBar />
                <WindowManager />
              </AppWrapper>
            </WindowProvider>
          </ContextMenuProvider>
        </DesktopStorageProvider>
      </body>
    </html>
  );
}
