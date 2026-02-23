"use client";

import * as React from "react";
import { BentoGrid } from "./bento-grid";
import { PhotoCard } from "./photo-card";
import { NoteCard } from "./note-card";

interface AboutBentoProps {
  className?: string;
  photoSrc?: string;
  name?: string;
  title?: string;
  description?: string;
}

export const AboutBento: React.FC<AboutBentoProps> = ({
  className,
  photoSrc = "/assets/moisansbg.png",
  name = "DJAKPA Koffi Tepe Venougne",
  title = "Ingénieur Réseaux & Développeur Full Stack",
  description = "Passionné par l'innovation technologique. Co-fondateur PyDevs Togo, je crée des solutions à l'intersection des infrastructures réseau et du développement web/mobile.",
}) => {
  return (
    <BentoGrid className={className}>
      {/* Photo Card - 2x2 */}
      <PhotoCard
        src={photoSrc}
        name={name}
        title={title}
        description={description}
      />

      {/* Note Card - 2x2 */}
      <NoteCard title="En bref" content={description} />
    </BentoGrid>
  );
};

export default AboutBento;
