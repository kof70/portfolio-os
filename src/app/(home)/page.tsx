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
import { personalInfo } from "@/lib/data";
import { useState } from "react";

export default function Home() {
  const { openWindow } = useWindows();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

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
    <main className="w-full h-full relative flex overflow-hidden">
      {/* Desktop Grid - Gauche */}
      <div className="flex-2 h-full">
        <DesktopGrid rows={6} cols={6} cellSize={110} gap={12} padding={16}>
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
            initialPosition={{ row: 1, col: 0 }}
            onDoubleClick={handleOpenAbout}
            onClick={() => setSelectedFile("about")}
            isSelected={selectedFile === "about"}
          >
            <AboutFile name="À propos" />
          </DraggableItem>

          {/* Dossier Contact */}
          <DraggableItem
            id="folder-contact"
            initialPosition={{ row: 2, col: 0 }}
            onDoubleClick={handleOpenContact}
            onClick={() => setSelectedFile("contact")}
            isSelected={selectedFile === "contact"}
          >
            <ContactFile name="Contact" />
          </DraggableItem>

          {/* Fichier CV */}
          <DraggableItem
            id="file-cv"
            initialPosition={{ row: 3, col: 0 }}
            onClick={() => setSelectedFile("cv")}
            isSelected={selectedFile === "cv"}
            onDoubleClick={handleOpenCV}
          >
            <FilePDF name="Mon CV" />
          </DraggableItem>
        </DesktopGrid>
      </div>

      {/* Bento Grid - Droite */}
      <div className="h-full flex items-center justify-center">
        <AboutBento
          photoSrc="/assets/p1.jpeg"
          name="Tchandikou U. Shalom"
          title={personalInfo.title}
          description={personalInfo.bioShort}
        />
      </div>
    </main>
  );
}
