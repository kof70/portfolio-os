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

export default function Home() {
  const { openWindow } = useWindows();

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
  };

  return (
    <main className="w-full h-full relative flex">
      {/* Desktop Grid - Gauche */}
      <div className="flex-2 h-full">
        <DesktopGrid rows={6} cols={6} cellSize={110} gap={12} padding={16}>
          {/* Dossier Projets */}
          <DraggableItem
            id="folder-projects"
            initialPosition={{ row: 0, col: 0 }}
            onDoubleClick={handleOpenProjects}
          >
            <ProjectFile name="Projets" />
          </DraggableItem>

          {/* Dossier À propos */}
          <DraggableItem
            id="folder-about"
            initialPosition={{ row: 1, col: 0 }}
            onDoubleClick={handleOpenAbout}
          >
            <AboutFile name="À propos" />
          </DraggableItem>

          {/* Dossier Contact */}
          <DraggableItem
            id="folder-contact"
            initialPosition={{ row: 2, col: 0 }}
            onDoubleClick={handleOpenContact}
          >
            <ContactFile name="Contact" />
          </DraggableItem>

          {/* Fichier CV */}
          <DraggableItem id="file-cv" initialPosition={{ row: 3, col: 0 }}>
            <FilePDF name="Mon CV" />
          </DraggableItem>
        </DesktopGrid>
      </div>

      {/* Bento Grid - Droite */}
      <div className="h-full flex items-center justify-center">
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
