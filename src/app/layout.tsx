import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { TopBar } from "@/components/desktop/top-bar";
import { BottomBar } from "@/components/desktop/bottom-bar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Tchandikou U. Shalom",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={`${inter.className} antialiased relative h-full flex flex-col items-center`}
      >
        <div className="w-full h-full absolute top-0 left-0 -z-10">
          <Image
            src="/assets/bg-1.jpg"
            alt="Background Image"
            fill
            className="object-cover"
          />
        </div>
        <TopBar />
        <main className="h-full w-full">{children}</main>
        <BottomBar />
      </body>
    </html>
  );
}
