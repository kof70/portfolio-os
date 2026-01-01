"use client";
import { AboutBento } from "@/components/bento";
import { ContextMenu, useContextMenu } from "@/components/desktop/context-menu";
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
import { WallpaperPicker } from "@/components/desktop/wallpaper-picker";
import Background from "@/components/shared/background";
import { useDesktopStorage } from "@/hooks/use-desktop-storage-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { personalInfo } from "@/lib/data";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { openWindow } = useWindows();
  const { openContextMenu } = useContextMenu();
  const {
    wallpaper,
    wallpaperMobile,
    setWallpaper,
    resetAllPositions,
    saveItemPosition,
    getItemPosition,
    isLoaded,
  } = useDesktopStorage();

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isWallpaperPickerOpen, setIsWallpaperPickerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { isMobile } = useIsMobile();

  // Handlers pour ouvrir les fenêtres
  const handleOpenProjects = useCallback(() => {
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
  }, [openWindow]);

  const handleOpenAbout = useCallback(() => {
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
  }, [openWindow]);

  const handleOpenContact = useCallback(() => {
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
  }, [openWindow]);

  const handleOpenCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/assets/cv.pdf";
    link.download = "Tchandikou_Uja_Shalom.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Handler pour le clic droit sur le bureau
  const handleDesktopContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      // Ne pas ouvrir le menu si on clique sur un élément
      const target = e.target as HTMLElement;
      if (target.closest("[data-draggable-item]")) {
        return;
      }
      openContextMenu({ x: e.clientX, y: e.clientY }, "desktop");
    },
    [openContextMenu],
  );

  // Handler pour le clic droit sur un fichier/dossier
  const handleItemContextMenu = useCallback(
    (
      e: React.MouseEvent | React.TouchEvent,
      itemId: string,
      type: "folder" | "file",
    ) => {
      e.preventDefault();
      e.stopPropagation();

      // Obtenir les coordonnées selon le type d'événement
      let clientX: number;
      let clientY: number;

      if ("touches" in e) {
        // TouchEvent
        clientX = e.touches[0]?.clientX || 0;
        clientY = e.touches[0]?.clientY || 0;
      } else {
        // MouseEvent
        clientX = e.clientX;
        clientY = e.clientY;
      }

      openContextMenu({ x: clientX, y: clientY }, type, itemId);
    },
    [openContextMenu],
  );

  // Callbacks pour le menu contextuel
  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleChangeWallpaper = useCallback(() => {
    setIsWallpaperPickerOpen(true);
  }, []);

  const handleResetPositions = useCallback(() => {
    resetAllPositions();
    setRefreshKey((prev) => prev + 1);
  }, [resetAllPositions]);

  const handleContextMenuOpen = useCallback(
    (targetId: string) => {
      switch (targetId) {
        case "folder-projects":
          handleOpenProjects();
          break;
        case "folder-about":
          handleOpenAbout();
          break;
        case "folder-contact":
          handleOpenContact();
          break;
        case "file-cv":
          handleOpenCV();
          break;
      }
    },
    [handleOpenProjects, handleOpenAbout, handleOpenContact, handleOpenCV],
  );

  const handleDownload = useCallback((targetId: string) => {
    if (targetId === "file-cv") {
      const link = document.createElement("a");
      link.href = "/assets/cv.pdf";
      link.download = "Tchandikou_Uja_Shalom.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  // Handler pour la sauvegarde des positions
  const handlePositionChange = useCallback(
    (id: string, position: { row: number; col: number }) => {
      saveItemPosition(id, position);
    },
    [saveItemPosition],
  );

  // Récupérer la position initiale (depuis le storage ou par défaut)
  const getInitialPosition = useCallback(
    (id: string, defaultPos: { row: number; col: number }) => {
      if (!isLoaded) return defaultPos;
      const savedPos = getItemPosition(id);
      return savedPos || defaultPos;
    },
    [isLoaded, getItemPosition],
  );

  // Positions par défaut - différentes pour mobile et desktop
  const defaultPositions = {
    projects: { row: 0, col: 0 },
    about: { row: isMobile ? 1 : 1, col: isMobile ? 0 : 0 },
    contact: { row: isMobile ? 0 : 2, col: isMobile ? 1 : 0 },
    cv: { row: isMobile ? 1 : 3, col: isMobile ? 1 : 0 },
  };

  // Grille config selon le device
  const gridConfig = {
    rows: isMobile ? 4 : 6,
    cols: isMobile ? 2 : 6,
    cellSize: isMobile ? 85 : 110,
    gap: isMobile ? 4 : 8,
    padding: isMobile ? 12 : 16,
  };

  return (
    <>
      {/* Background dynamique */}
      <Background wallpaper={wallpaper} wallpaperMobile={wallpaperMobile} />

      <main
        className={cn(
          "w-full h-full relative flex overflow-hidden",
          isMobile ? "flex-col" : "flex-row",
        )}
        onContextMenu={handleDesktopContextMenu}
      >
        {/* Mobile: Bento en haut */}
        {isMobile && (
          <div className="w-full pt-12 pb-4 px-4 shrink-0 flex items-center justify-center">
            <AboutBento
              photoSrc="/assets/p4-1.png"
              name="Tchandikou U. Shalom"
              title={personalInfo.title}
              description={personalInfo.bioShort}
              className="max-w-[280px]"
            />
          </div>
        )}

        {/* Desktop Grid - À GAUCHE sur desktop, en bas sur mobile */}
        <div className={cn(isMobile ? "flex-1 w-full" : "flex-1 h-full")}>
          <DesktopGrid
            key={refreshKey}
            rows={gridConfig.rows}
            cols={gridConfig.cols}
            cellSize={gridConfig.cellSize}
            gap={gridConfig.gap}
            padding={gridConfig.padding}
          >
            {/* Dossier Projets */}
            <DraggableItem
              id="folder-projects"
              initialPosition={getInitialPosition(
                "folder-projects",
                defaultPositions.projects,
              )}
              onDoubleClick={handleOpenProjects}
              onClick={() => setSelectedFile("projects")}
              onContextMenu={(e) =>
                handleItemContextMenu(e, "folder-projects", "folder")
              }
              onPositionChange={handlePositionChange}
              isSelected={selectedFile === "projects"}
            >
              <ProjectFile name="Projets" />
            </DraggableItem>

            {/* Dossier À propos */}
            <DraggableItem
              id="folder-about"
              initialPosition={getInitialPosition(
                "folder-about",
                defaultPositions.about,
              )}
              onDoubleClick={handleOpenAbout}
              onClick={() => setSelectedFile("about")}
              onContextMenu={(e) =>
                handleItemContextMenu(e, "folder-about", "folder")
              }
              onPositionChange={handlePositionChange}
              isSelected={selectedFile === "about"}
            >
              <AboutFile name="À propos" />
            </DraggableItem>

            {/* Dossier Contact */}
            <DraggableItem
              id="folder-contact"
              initialPosition={getInitialPosition(
                "folder-contact",
                defaultPositions.contact,
              )}
              onDoubleClick={handleOpenContact}
              onClick={() => setSelectedFile("contact")}
              onContextMenu={(e) =>
                handleItemContextMenu(e, "folder-contact", "folder")
              }
              onPositionChange={handlePositionChange}
              isSelected={selectedFile === "contact"}
            >
              <ContactFile name="Contact" />
            </DraggableItem>

            {/* Fichier CV */}
            <DraggableItem
              id="file-cv"
              initialPosition={getInitialPosition(
                "file-cv",
                defaultPositions.cv,
              )}
              onClick={() => setSelectedFile("cv")}
              onContextMenu={(e) => handleItemContextMenu(e, "file-cv", "file")}
              onPositionChange={handlePositionChange}
              isSelected={selectedFile === "cv"}
              onDoubleClick={handleOpenCV}
            >
              <FilePDF name="Mon CV" />
            </DraggableItem>
          </DesktopGrid>
        </div>

        {/* Desktop: Bento à DROITE */}
        {!isMobile && (
          <div className="h-full flex-1 flex items-center justify-center">
            <AboutBento
              photoSrc="/assets/p4-1.png"
              name="Tchandikou U. Shalom"
              title={personalInfo.title}
              description={personalInfo.bioShort}
              className="grid-cols-2"
            />
          </div>
        )}

        {/* Context Menu */}
        <ContextMenu
          onRefresh={handleRefresh}
          onChangeWallpaper={handleChangeWallpaper}
          onResetPositions={handleResetPositions}
          onOpen={handleContextMenuOpen}
          onDownload={handleDownload}
        />

        {/* Wallpaper Picker */}
        <WallpaperPicker
          isOpen={isWallpaperPickerOpen}
          onClose={() => setIsWallpaperPickerOpen(false)}
          currentWallpaper={wallpaper}
          onSelect={setWallpaper}
        />
      </main>
    </>
  );
}
