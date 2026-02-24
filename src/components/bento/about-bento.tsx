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
  noteTitle?: string;
}

export const AboutBento: React.FC<AboutBentoProps> = ({
  className,
  photoSrc = "/assets/moisansbg.png",
  name = "DJAKPA Koffi Tepe Venougne",
  title = "Network Engineer & Full-Stack Developer",
  description = "Passionate about technology innovation. Co-founder of PyDevs Togo, I build solutions at the intersection of network infrastructure and web/mobile development.",
  noteTitle = "Info",
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
      <NoteCard title={noteTitle} content={description} />
    </BentoGrid>
  );
};

export default AboutBento;
