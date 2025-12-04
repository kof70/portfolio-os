"use client";

import { Folder } from "@/components/desktop/folder";
import { DesktopGrid } from "@/components/desktop/desktop-grid";
import { DraggableItem } from "@/components/desktop/draggable-item";
import { AboutBento } from "@/components/bento";
import FilePDF from "@/components/desktop/files/file-pdf";

export default function Home() {
  return (
    <main className="w-full h-full relative flex">
      {/* Desktop Grid - Gauche */}
      <div className="flex-2 h-full">
        <DesktopGrid rows={6} cols={6} cellSize={110} gap={12} padding={16}>
          {/* Dossier Projets */}
          <DraggableItem
            id="folder-projects"
            initialPosition={{ row: 0, col: 0 }}
          >
            <Folder name="Projets" />
          </DraggableItem>

          {/* Dossier À propos */}
          <DraggableItem
            id="folder-contributions"
            initialPosition={{ row: 1, col: 0 }}
          >
            <Folder name="Contributions" />
          </DraggableItem>
          <DraggableItem id="file-cv" initialPosition={{ row: 2, col: 0 }}>
            <FilePDF name="Mon CV" />
          </DraggableItem>
        </DesktopGrid>
      </div>

      {/* Bento Grid - Droite */}
      <div className="h-full flex items-center justify-center flex-1">
        <AboutBento
          photoSrc="/assets/p2.jpeg"
          name="Tchandikou U. Shalom"
          title="Développeur Full Stack"
          description="Passionné par le développement web et les nouvelles technologies. Je crée des applications modernes et performantes avec une attention particulière à l'expérience utilisateur et au design. Toujours en quête d'apprentissage et d'innovation."
        />
      </div>
    </main>
  );
}
