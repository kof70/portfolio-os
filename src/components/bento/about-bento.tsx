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
  photoSrc = "/assets/photo.jpg",
  name = "Tchandikou U. Shalom",
  title = "Développeur Full Stack",
  description = "Passionné par le développement web et les nouvelles technologies. Je crée des applications modernes et performantes avec une attention particulière à l'expérience utilisateur et au design.",
}) => {
  return (
    <BentoGrid className={className}>
      {/* Photo Card - 2x2 */}
      <PhotoCard src={photoSrc} name={name} title={title} />

      {/* Note Card - 2x2 */}
      <NoteCard title="À propos" content={description} />
    </BentoGrid>
  );
};

export default AboutBento;
