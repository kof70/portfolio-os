import { AppWrapper } from "@/components/app-wrapper";
import { BottomBar } from "@/components/desktop/bottom-bar";
import { TopBar } from "@/components/desktop/top-bar";
import { WindowManager, WindowProvider } from "@/components/desktop/viewer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Tchandikou U. Shalom",
  description:
    "Portfolio de Tchandikou U. Shalom - Développeur Web | Front-End | React",
  keywords: [
    "Tchandikou U. Shalom",
    "Portfolio",
    "Développeur Front-End",
    "Developpeur Web",
  ],
  authors: [{ name: "Tchandikou U. Shalom", url: "https://cianus.dev" }],
  openGraph: {
    title: "Tchandikou U. Shalom - Portfolio",
    description:
      "Découvrez le portfolio de Tchandikou U. Shalom, développeur web spécialisé en développement front-end avec React.",
    url: "https://cianus.dev",
    siteName: "Tchandikou U. Shalom Portfolio",
    images: [
      {
        url: "https://cianus.dev/assets/p1.jpeg",
        width: 1200,
        height: 630,
        alt: "Tchandikou U. Shalom Portfolio",
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
      >
        <WindowProvider>
          <AppWrapper>
            <div className="w-full h-full bg-[url('/assets/bg-3.jpg')] bg-cover absolute top-0 left-0 -z-10"></div>
            <TopBar />
            <main className="h-full w-full">{children}</main>
            <BottomBar />
            <WindowManager />
          </AppWrapper>
        </WindowProvider>
      </body>
    </html>
  );
}
