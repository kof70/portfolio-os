"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  useWindowViewport,
  WindowViewportProvider,
} from "../use-window-viewport";

interface AboutViewProps {
  className?: string;
}

const AboutViewContent: React.FC<AboutViewProps> = ({ className }) => {
  const { isMdUp, isSmUp } = useWindowViewport();

  return (
    <div
      className={cn(
        "h-full bg-neutral-900/50 overflow-auto",
        isSmUp ? "p-6" : "p-4",
        className,
      )}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header avec photo */}
        <div
          className={cn(
            "flex gap-6 mb-8",
            isMdUp ? "flex-row items-center" : "flex-col items-center",
          )}
        >
          {/* Photo */}
          <div
            className={cn(
              "relative rounded-full overflow-hidden border-2 border-white/20 shrink-0",
              isSmUp ? "w-32 h-32" : "w-24 h-24",
            )}
          >
            <Image
              src="/assets/p2.jpeg"
              alt="Tchandikou U. Shalom"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className={cn(isMdUp ? "text-left" : "text-center")}>
            <h1
              className={cn(
                "text-white font-bold mb-2",
                isSmUp ? "text-3xl" : "text-2xl",
              )}
            >
              Tchandikou U. Shalom
            </h1>
            <p
              className={cn(
                "text-white/60 mb-3",
                isSmUp ? "text-lg" : "text-base",
              )}
            >
              Développeur Full Stack
            </p>
            <div
              className={cn(
                "flex items-center gap-3",
                isMdUp ? "justify-start" : "justify-center",
              )}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Disponible
              </span>
              <span className="text-white/40 text-sm">📍 Localisation</span>
            </div>
          </div>
        </div>

        {/* À propos */}
        <section className="mb-8">
          <h2
            className={cn(
              "text-white font-semibold mb-4 flex items-center gap-2",
              isSmUp ? "text-xl" : "text-lg",
            )}
          >
            <span className="text-2xl">👋</span> À propos de moi
          </h2>
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <p className="text-white/70 leading-relaxed">
              Passionné par le développement web et les nouvelles technologies,
              je crée des applications modernes et performantes avec une
              attention particulière à l&apos;expérience utilisateur et au
              design. Toujours en quête d&apos;apprentissage et
              d&apos;innovation, j&apos;aime relever de nouveaux défis et
              transformer des idées en produits concrets.
            </p>
          </div>
        </section>

        {/* Expérience */}
        <section className="mb-8">
          <h2
            className={cn(
              "text-white font-semibold mb-4 flex items-center gap-2",
              isSmUp ? "text-xl" : "text-lg",
            )}
          >
            <span className="text-2xl">💼</span> Expérience
          </h2>
          <div className="space-y-4">
            <ExperienceCard
              title="Développeur Full Stack"
              company="Entreprise XYZ"
              period="2022 - Présent"
              description="Développement d'applications web modernes avec React, Next.js et Node.js."
              isMdUp={isMdUp}
            />
            <ExperienceCard
              title="Développeur Front-end"
              company="Startup ABC"
              period="2020 - 2022"
              description="Création d'interfaces utilisateur réactives et accessibles."
              isMdUp={isMdUp}
            />
          </div>
        </section>

        {/* Formation */}
        <section className="mb-8">
          <h2
            className={cn(
              "text-white font-semibold mb-4 flex items-center gap-2",
              isSmUp ? "text-xl" : "text-lg",
            )}
          >
            <span className="text-2xl">🎓</span> Formation
          </h2>
          <div className="space-y-4">
            <EducationCard
              degree="Master en Informatique"
              school="Université XYZ"
              period="2018 - 2020"
              isMdUp={isMdUp}
            />
            <EducationCard
              degree="Licence en Informatique"
              school="Université ABC"
              period="2015 - 2018"
              isMdUp={isMdUp}
            />
          </div>
        </section>

        {/* Centres d'intérêt */}
        <section>
          <h2
            className={cn(
              "text-white font-semibold mb-4 flex items-center gap-2",
              isSmUp ? "text-xl" : "text-lg",
            )}
          >
            <span className="text-2xl">✨</span> Centres d&apos;intérêt
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "🎮 Gaming",
              "📚 Lecture",
              "🎵 Musique",
              "🏋️ Sport",
              "✈️ Voyage",
              "🎬 Cinéma",
            ].map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm hover:bg-white/10 transition-colors"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  isMdUp: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  period,
  description,
  isMdUp,
}) => {
  return (
    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
      <div
        className={cn(
          "flex justify-between mb-2",
          isMdUp ? "flex-row items-center" : "flex-col",
        )}
      >
        <h3 className="text-white font-medium">{title}</h3>
        <span className="text-white/40 text-sm">{period}</span>
      </div>
      <p className="text-white/60 text-sm mb-2">{company}</p>
      <p className="text-white/50 text-sm">{description}</p>
    </div>
  );
};

interface EducationCardProps {
  degree: string;
  school: string;
  period: string;
  isMdUp: boolean;
}

const EducationCard: React.FC<EducationCardProps> = ({
  degree,
  school,
  period,
  isMdUp,
}) => {
  return (
    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
      <div
        className={cn(
          "flex justify-between mb-1",
          isMdUp ? "flex-row items-center" : "flex-col",
        )}
      >
        <h3 className="text-white font-medium">{degree}</h3>
        <span className="text-white/40 text-sm">{period}</span>
      </div>
      <p className="text-white/60 text-sm">{school}</p>
    </div>
  );
};

export const AboutView: React.FC<AboutViewProps> = ({ className }) => {
  return (
    <WindowViewportProvider>
      <AboutViewContent className={className} />
    </WindowViewportProvider>
  );
};

export default AboutView;
