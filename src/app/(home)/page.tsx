"use client";
import { AboutBento } from "@/components/bento";
import { DesktopGrid } from "@/components/desktop/desktop-grid";
import { DraggableItem } from "@/components/desktop/draggable-item";
import { AboutFile } from "@/components/desktop/files/about-file";
import { ContactFile } from "@/components/desktop/files/contact-file";
import FilePDF from "@/components/desktop/files/file-pdf";
import { ProjectFile } from "@/components/desktop/files/project-file";
import {
  AboutView,
  ContactView,
  ProjectsView,
  useWindows,
} from "@/components/desktop/viewer";
import { useIsMobile } from "@/hooks/use-mobile";
import { personalInfo } from "@/lib/data";
import { useState } from "react";

export default function Home() {
  const { openWindow } = useWindows();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { isMobile } = useIsMobile();

  const handleOpenProjects = () => {
    openWindow({
      id: "projects",
      title: "Projets",
      content: <ProjectsView />,
      position: { x: 100, y: 50 },
      size: { width: 900, height: 600 },
      minSize: { width: 600, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  };

  const handleOpenAbout = () => {
    openWindow({
      id: "about",
      title: "À propos",
      content: <AboutView />,
      position: { x: 150, y: 80 },
      size: { width: 800, height: 600 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  };

  const handleOpenContact = () => {
    openWindow({
      id: "contact",
      title: "Contact",
      content: <ContactView />,
      position: { x: 200, y: 100 },
      size: { width: 850, height: 550 },
      minSize: { width: 600, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  };

  const handleOpenCV = () => {
    const link = document.createElement("a");
    link.href = "/assets/cv.pdf";
    link.download = "Tchandikou_Uja_Shalom.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="w-full h-full relative flex max-md:flex-col-reverse overflow-hidden">
      {/* Desktop Grid - Gauche */}
      <div className="md:flex-2 h-full ">
        <DesktopGrid
          rows={isMobile ? 3 : 6}
          cols={isMobile ? 3 : 6}
          cellSize={isMobile ? 90 : 110}
          gap={isMobile ? 2 : 8}
          padding={isMobile ? 8 : 16}
        >
          {/* Dossier Projets */}
          <DraggableItem
            id="folder-projects"
            initialPosition={{ row: 0, col: 0 }}
            onDoubleClick={handleOpenProjects}
            onClick={() => setSelectedFile("projects")}
            isSelected={selectedFile === "projects"}
          >
            <ProjectFile name="Projets" />
          </DraggableItem>

          {/* Dossier À propos */}
          <DraggableItem
            id="folder-about"
            initialPosition={{ row: isMobile ? 0 : 1, col: isMobile ? 1 : 0 }}
            onDoubleClick={handleOpenAbout}
            onClick={() => setSelectedFile("about")}
            isSelected={selectedFile === "about"}
          >
            <AboutFile name="À propos" />
          </DraggableItem>

          {/* Dossier Contact */}
          <DraggableItem
            id="folder-contact"
            initialPosition={{ row: isMobile ? 0 : 2, col: isMobile ? 2 : 0 }}
            onDoubleClick={handleOpenContact}
            onClick={() => setSelectedFile("contact")}
            isSelected={selectedFile === "contact"}
          >
            <ContactFile name="Contact" />
          </DraggableItem>

          {/* Fichier CV */}
          <DraggableItem
            id="file-cv"
            initialPosition={{ row: isMobile ? 0 : 3, col: isMobile ? 3 : 0 }}
            onClick={() => setSelectedFile("cv")}
            isSelected={selectedFile === "cv"}
            onDoubleClick={handleOpenCV}
          >
            <FilePDF name="Mon CV" />
          </DraggableItem>
        </DesktopGrid>
      </div>

      {/* Bento Grid - Droite */}
      <div className="md:h-full max-md:pt-8  flex items-center justify-center">
        <AboutBento
          photoSrc="/assets/p4-1.png"
          name="Tchandikou U. Shalom"
          title={personalInfo.title}
          description={personalInfo.bioShort}
          className="grid-cols-2"
        />
      </div>
    </main>
  );
}
