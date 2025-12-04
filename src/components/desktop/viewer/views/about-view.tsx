"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AboutViewProps {
  className?: string;
}

export const AboutView: React.FC<AboutViewProps> = ({ className }) => {
  return (
    <div className={cn("h-full bg-neutral-900/50 p-6 overflow-auto", className)}>
      <div className="max-w-3xl mx-auto">
        {/* Header avec photo */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          {/* Photo */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
            <Image
              src="/assets/photo.jpg"
              alt="Tchandikou U. Shalom"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h1 className="text-white text-3xl font-bold mb-2">
              Tchandikou U. Shalom
            </h1>
            <p className="text-white/60 text-lg mb-3">Développeur Full Stack</p>
            <div className="flex items-center justify-center md:justify-start gap-3">
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
          <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">👋</span> À propos de moi
          </h2>
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <p className="text-white/70 leading-relaxed">
              Passionné par le développement web et les nouvelles technologies,
              je crée des applications modernes et performantes avec une
              attention particulière à l&apos;expérience utilisateur et au design.
              Toujours en quête d&apos;apprentissage et d&apos;innovation, j&apos;aime
              relever de nouveaux défis et transformer des idées en produits
              concrets.
            </p>
          </div>
        </section>

        {/* Expérience */}
        <section className="mb-8">
          <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">💼</span> Expérience
          </h2>
          <div className="space-y-4">
            <ExperienceCard
              title="Développeur Full Stack"
              company="Entreprise XYZ"
              period="2022 - Présent"
              description="Développement d'applications web modernes avec React, Next.js et Node.js."
            />
            <ExperienceCard
              title="Développeur Front-end"
              company="Startup ABC"
              period="2020 - 2022"
              description="Création d'interfaces utilisateur réactives et accessibles."
            />
          </div>
        </section>

        {/* Formation */}
        <section className="mb-8">
          <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🎓</span> Formation
          </h2>
          <div className="space-y-4">
            <EducationCard
              degree="Master en Informatique"
              school="Université XYZ"
              period="2018 - 2020"
            />
            <EducationCard
              degree="Licence en Informatique"
              school="Université ABC"
              period="2015 - 2018"
            />
          </div>
        </section>

        {/* Centres d'intérêt */}
        <section>
          <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
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
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  period,
  description,
}) => {
  return (
    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
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
}

const EducationCard: React.FC<EducationCardProps> = ({
  degree,
  school,
  period,
}) => {
  return (
    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
        <h3 className="text-white font-medium">{degree}</h3>
        <span className="text-white/40 text-sm">{period}</span>
      </div>
      <p className="text-white/60 text-sm">{school}</p>
    </div>
  );
};

export default AboutView;
