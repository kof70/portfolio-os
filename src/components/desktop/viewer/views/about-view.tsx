"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  useWindowViewport,
  WindowViewportProvider,
} from "../use-window-viewport";
import {
  ExperienceCard,
  EducationCard,
  SectionHeader,
} from "@/components/shared/info-card";
import { personalInfo, experiences, education, interests } from "@/lib/data";

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
              isSmUp ? "size-44" : "size-36",
            )}
          >
            <Image
              src={personalInfo.avatar}
              alt={personalInfo.name}
              fill
              className="object-cover object-top"
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
              {personalInfo.name}
            </h1>
            <p
              className={cn(
                "text-white/70 mb-3",
                isSmUp ? "text-lg" : "text-base",
              )}
            >
              {personalInfo.title}
            </p>
            <div
              className={cn(
                "flex items-center gap-3",
                isMdUp ? "justify-start" : "justify-center",
              )}
            >
              {personalInfo.available && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Disponible
                </span>
              )}
              <span className="text-white/40 text-sm">
                {personalInfo.location}
              </span>
            </div>
          </div>
        </div>

        {/* À propos */}
        <section className="mb-8">
          <SectionHeader
            title="À propos de moi"
            emoji="👋"
            size={isSmUp ? "md" : "sm"}
          />
          <div className="bg-white/5 rounded-xl border border-white/10 p-5">
            <p className="text-white/70 leading-relaxed">{personalInfo.bio}</p>
          </div>
        </section>

        {/* Expérience */}
        <section className="mb-8">
          <SectionHeader
            title="Expérience"
            emoji="💼"
            size={isSmUp ? "md" : "sm"}
          />
          <div className="space-y-4">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                title={exp.title}
                company={exp.company}
                period={exp.period}
                description={exp.description}
                isMdUp={isMdUp}
              />
            ))}
          </div>
        </section>

        {/* Formation */}
        <section className="mb-8">
          <SectionHeader
            title="Formation"
            emoji="🎓"
            size={isSmUp ? "md" : "sm"}
          />
          <div className="space-y-4">
            {education.map((edu) => (
              <EducationCard
                key={edu.id}
                degree={edu.degree}
                school={edu.school}
                period={edu.period}
                isMdUp={isMdUp}
              />
            ))}
          </div>
        </section>

        {/* Centres d'intérêt */}
        <section>
          <SectionHeader
            title="Centres d'intérêt"
            emoji="✨"
            size={isSmUp ? "md" : "sm"}
          />
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors"
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

export const AboutView: React.FC<AboutViewProps> = ({ className }) => {
  return (
    <WindowViewportProvider>
      <AboutViewContent className={className} />
    </WindowViewportProvider>
  );
};

export default AboutView;
