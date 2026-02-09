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

export const metadata: Metadata = {
  title: "DJAKPA Koffi Tepe Venougne - Portfolio",
  description:
    "Portfolio de DJAKPA Koffi - Ingénieur Réseaux & Développeur Full Stack | PyDevs Togo",
  keywords: [
    "DJAKPA Koffi",
    "Portfolio",
    "Ingénieur Réseaux",
    "Développeur Full Stack",
    "PyDevs Togo",
  ],
  authors: [{ name: "DJAKPA Koffi Tepe Venougne", url: "https://github.com/kof70" }],
  openGraph: {
    title: "DJAKPA Koffi Tepe Venougne - Portfolio",
    description:
      "Ingénieur Réseaux et Développeur Full Stack passionné par l'innovation technologique. Co-fondateur PyDevs Togo.",
    url: "https://github.com/kof70",
    siteName: "DJAKPA Koffi - Portfolio",
    images: [
      {
        url: "/assets/profile2.png",
        width: 1200,
        height: 630,
        alt: "DJAKPA Koffi Tepe Venougne - Portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full overflow-hidden">
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
