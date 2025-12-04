"use client";

import { Folder } from "@/components/desktop/folder";
import { DesktopGrid } from "@/components/desktop/desktop-grid";
import { DraggableItem } from "@/components/desktop/draggable-item";

export default function Home() {
  return (
    <main className="w-full h-full relative">
      <DesktopGrid rows={6} cols={12} cellSize={90} gap={12} padding={16}>
        {/* Dossier Projets */}
        <DraggableItem
          id="folder-projects"
          initialPosition={{ row: 0, col: 0 }}
        >
          <Folder name="Projets" />
        </DraggableItem>

        {/* Dossier À propos */}
        <DraggableItem id="folder-about" initialPosition={{ row: 1, col: 0 }}>
          <Folder name="À propos" />
        </DraggableItem>

        {/* Dossier Compétences */}
        <DraggableItem id="folder-skills" initialPosition={{ row: 2, col: 0 }}>
          <Folder name="Compétences" />
        </DraggableItem>

        {/* Dossier Contact */}
        <DraggableItem id="folder-contact" initialPosition={{ row: 3, col: 0 }}>
          <Folder name="Contact" />
        </DraggableItem>
      </DesktopGrid>
    </main>
  );
}
