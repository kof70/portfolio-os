import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { TopBar } from "@/components/desktop/top-bar";
import { BottomBar } from "@/components/desktop/bottom-bar";
import { WindowProvider } from "@/components/desktop/viewer";
import { WindowManager } from "@/components/desktop/viewer";
import { AppWrapper } from "@/components/app-wrapper";

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
    <html lang="fr" className="h-full overflow-hidden">
      <body
        className={`${inter.className} antialiased relative h-full flex flex-col items-center bg-[#141414] overflow-hidden`}
      >
        <WindowProvider>
          <AppWrapper>
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
            <WindowManager />
          </AppWrapper>
        </WindowProvider>
      </body>
    </html>
  );
}
