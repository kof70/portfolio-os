"use client";
import { AboutBento } from "@/components/bento";
import { ContextMenu, useContextMenu } from "@/components/desktop/context-menu";
import { DesktopGrid } from "@/components/desktop/desktop-grid";
import { DraggableItem } from "@/components/desktop/draggable-item";
import { AboutFile } from "@/components/desktop/files/about-file";
import { CategoryFile } from "@/components/desktop/files/category-file";
import { ContactFile } from "@/components/desktop/files/contact-file";
import FilePDF from "@/components/desktop/files/file-pdf";
import { ProjectFile } from "@/components/desktop/files/project-file";
import {
  AboutView,
  CategoryView,
  ContactView,
  CVView,
  ProjectsView,
  useWindowActions,
} from "@/components/desktop/viewer";
import { useDesktopStorage } from "@/hooks/use-desktop-storage-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePortfolioContent } from "@/lib/use-portfolio-content";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/i18n";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { openWindow } = useWindowActions();
  const { openContextMenu } = useContextMenu();
  const {
    resetAllPositions,
    saveItemPosition,
    getItemPosition,
    isLoaded,
    openWallpaperPicker,
  } = useDesktopStorage();

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const { isMobile } = useIsMobile();
  const { language } = useLanguage();
  const { personalInfo } = usePortfolioContent();
  const isShortMobile = isMobile && viewportHeight > 0 && viewportHeight < 760;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncViewportHeight = () => setViewportHeight(window.innerHeight);
    syncViewportHeight();
    window.addEventListener("resize", syncViewportHeight);
    return () => window.removeEventListener("resize", syncViewportHeight);
  }, []);

  // Handlers pour ouvrir les fenêtres
  const handleOpenProjects = useCallback(() => {
    openWindow({
      id: "projects",
      title: t(language, "projects"),
      content: <ProjectsView />,
      position: { x: 100, y: 50 },
      size: { width: 900, height: 600 },
      minSize: { width: 600, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  }, [language, openWindow]);

  const handleOpenAbout = useCallback(() => {
    openWindow({
      id: "about",
      title: t(language, "about"),
      content: <AboutView />,
      position: { x: 150, y: 80 },
      size: { width: 800, height: 600 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  }, [language, openWindow]);

  const handleOpenContact = useCallback(() => {
    openWindow({
      id: "contact",
      title: t(language, "contact"),
      content: <ContactView />,
      position: { x: 200, y: 100 },
      size: { width: 850, height: 550 },
      minSize: { width: 600, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  }, [language, openWindow]);

  const handleOpenRecommendation = useCallback(() => {
    openWindow({
      id: "category-recommendation",
      title: t(language, "recommendations"),
      content: <CategoryView badge="recommendation" title={t(language, "recommendations")} />,
      position: { x: 120, y: 60 },
      size: { width: 800, height: 600 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  }, [language, openWindow]);

  const handleOpenCommunity = useCallback(() => {
    openWindow({
      id: "category-community",
      title: t(language, "community"),
      content: <CategoryView badge="community" title={t(language, "community")} />,
      position: { x: 140, y: 80 },
      size: { width: 800, height: 600 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  }, [language, openWindow]);

  const handleOpenOpensource = useCallback(() => {
    openWindow({
      id: "category-opensource",
      title: t(language, "openSource"),
      content: <CategoryView badge="opensource" title={t(language, "openSource")} />,
      position: { x: 160, y: 100 },
      size: { width: 800, height: 600 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  }, [language, openWindow]);

  const handleOpenHackathon = useCallback(() => {
    openWindow({
      id: "category-hackathon",
      title: t(language, "hackathon"),
      content: <CategoryView badge="hackathon" title={t(language, "hackathon")} />,
      position: { x: 180, y: 120 },
      size: { width: 800, height: 600 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  }, [language, openWindow]);

  const handleOpenCompany = useCallback(() => {
    openWindow({
      id: "category-entreprise",
      title: t(language, "company"),
      content: <CategoryView badge="entreprise" title={t(language, "company")} />,
      position: { x: 160, y: 100 },
      size: { width: 800, height: 600 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  }, [language, openWindow]);

  const handleOpenCV = useCallback(() => {
    openWindow({
      id: "cv",
      title: t(language, "myResume"),
      content: <CVView />,
      position: { x: 180, y: 80 },
      size: { width: 800, height: 700 },
      minSize: { width: 500, height: 500 },
      isMinimized: false,
      isMaximized: false,
    });
    setSelectedFile(null);
  }, [language, openWindow]);

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
    openWallpaperPicker();
  }, [openWallpaperPicker]);

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
        case "folder-recommendation":
          handleOpenRecommendation();
          break;
        case "folder-community":
          handleOpenCommunity();
          break;
        case "folder-opensource":
          handleOpenOpensource();
          break;
        case "folder-hackathon":
          handleOpenHackathon();
          break;
        case "file-cv":
          handleOpenCV();
          break;
      }
    },
    [
      handleOpenProjects,
      handleOpenAbout,
      handleOpenContact,
      handleOpenRecommendation,
      handleOpenCommunity,
      handleOpenOpensource,
      handleOpenHackathon,
      handleOpenCompany,
      handleOpenCV,
    ],
  );

  const handleDownload = useCallback(
    (targetId: string) => {
      if (targetId === "file-cv") {
        handleOpenCV();
      }
    },
    [handleOpenCV],
  );

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
    projects: { row: isMobile ? (isShortMobile ? 1 : 2) : 0, col: isMobile ? 0 : 0 },
    about: { row: isMobile ? (isShortMobile ? 1 : 2) : 1, col: isMobile ? 1 : 0 },
    contact: { row: isMobile ? (isShortMobile ? 1 : 2) : 2, col: isMobile ? 2 : 0 },
    cv: { row: isMobile ? (isShortMobile ? 2 : 3) : 3, col: isMobile ? 0 : 0 },
    recommendation: { row: isMobile ? (isShortMobile ? 2 : 3) : 0, col: isMobile ? 1 : 1 },
    community: { row: isMobile ? (isShortMobile ? 2 : 3) : 1, col: isMobile ? 2 : 1 },
    opensource: { row: isMobile ? (isShortMobile ? 3 : 4) : 2, col: isMobile ? 0 : 1 },
    hackathon: { row: isMobile ? (isShortMobile ? 3 : 4) : 3, col: isMobile ? 1 : 1 },
    entreprise: { row: isMobile ? (isShortMobile ? 3 : 4) : 1, col: isMobile ? 2 : 2 },
  };

  // Grille config selon le device
  const gridConfig = {
    rows: isMobile ? (isShortMobile ? 4 : 5) : 6,
    cols: isMobile ? 3 : 6,
    cellSize: isMobile ? (isShortMobile ? 60 : 66) : 110,
    gap: isMobile ? (isShortMobile ? 8 : 12) : 8,
    padding: isMobile ? 10 : 16,
  };

  return (
    <main
      className={cn(
        "w-full h-full relative flex overflow-hidden",
        isMobile ? "flex-col" : "flex-row",
      )}
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Mobile: Bento en haut */}
      {isMobile && (
        <div
          className="absolute top-0 left-0 right-0 z-20 px-3 flex items-center justify-center pointer-events-auto"
          style={{
            paddingTop: `calc(env(safe-area-inset-top, 0px) + ${isShortMobile ? 58 : 42}px)`,
          }}
        >
          <AboutBento
            photoSrc="/assets/moisansbg.png"
            name={personalInfo.name}
            title={personalInfo.title}
            description={t(language, "profileBlurb")}
            noteTitle={t(language, "atGlance")}
            className={isShortMobile ? "max-w-[300px]" : "max-w-[320px]"}
          />
        </div>
      )}

      {/* Desktop Grid - À GAUCHE sur desktop, en bas sur mobile */}
      <div
        className={cn(
          isMobile
            ? cn(
                "flex-1 w-full",
                isShortMobile
                  ? "pt-[278px] pb-[calc(90px+var(--safe-area-inset-bottom))]"
                  : "pt-[220px] pb-[calc(104px+var(--safe-area-inset-bottom))]",
              )
            : "flex-1 h-full",
        )}
      >
        <DesktopGrid
          key={refreshKey}
          rows={gridConfig.rows}
          cols={gridConfig.cols}
          cellSize={gridConfig.cellSize}
          gap={gridConfig.gap}
          padding={gridConfig.padding}
          className={cn(
            isMobile ? (isShortMobile ? "max-w-[212px] mx-auto" : "max-w-[242px] mx-auto") : "",
          )}
        >
          {/* Dossier Projects */}
          <DraggableItem
            id="folder-projects"
            initialPosition={getInitialPosition(
              "folder-projects",
              defaultPositions.projects,
            )}
            onDoubleClick={handleOpenProjects}
            onClick={() =>
              isMobile ? handleOpenProjects() : setSelectedFile("projects")
            }
            onContextMenu={(e) =>
              handleItemContextMenu(e, "folder-projects", "folder")
            }
            onPositionChange={handlePositionChange}
            isSelected={selectedFile === "projects"}
          >
            <ProjectFile name={t(language, "projects")} />
          </DraggableItem>

          {/* Dossier About */}
          <DraggableItem
            id="folder-about"
            initialPosition={getInitialPosition(
              "folder-about",
              defaultPositions.about,
            )}
            onDoubleClick={handleOpenAbout}
            onClick={() => (isMobile ? handleOpenAbout() : setSelectedFile("about"))}
            onContextMenu={(e) =>
              handleItemContextMenu(e, "folder-about", "folder")
            }
            onPositionChange={handlePositionChange}
            isSelected={selectedFile === "about"}
          >
            <AboutFile name={t(language, "about")} />
          </DraggableItem>

          {/* Dossier Contact */}
          <DraggableItem
            id="folder-contact"
            initialPosition={getInitialPosition(
              "folder-contact",
              defaultPositions.contact,
            )}
            onDoubleClick={handleOpenContact}
            onClick={() =>
              isMobile ? handleOpenContact() : setSelectedFile("contact")
            }
            onContextMenu={(e) =>
              handleItemContextMenu(e, "folder-contact", "folder")
            }
            onPositionChange={handlePositionChange}
            isSelected={selectedFile === "contact"}
          >
            <ContactFile name={t(language, "contact")} />
          </DraggableItem>

          {/* Fichier CV */}
          <DraggableItem
            id="file-cv"
            initialPosition={getInitialPosition("file-cv", defaultPositions.cv)}
            onClick={() => (isMobile ? handleOpenCV() : setSelectedFile("cv"))}
            onContextMenu={(e) => handleItemContextMenu(e, "file-cv", "file")}
            onPositionChange={handlePositionChange}
            isSelected={selectedFile === "cv"}
            onDoubleClick={handleOpenCV}
          >
            <FilePDF name={t(language, "myResume")} variant="cv" />
          </DraggableItem>

          {/* Recommendations */}
          <DraggableItem
            id="folder-recommendation"
            initialPosition={getInitialPosition(
              "folder-recommendation",
              defaultPositions.recommendation,
            )}
            onDoubleClick={handleOpenRecommendation}
            onClick={() =>
              isMobile
                ? handleOpenRecommendation()
                : setSelectedFile("recommendation")
            }
            onContextMenu={(e) =>
              handleItemContextMenu(e, "folder-recommendation", "folder")
            }
            onPositionChange={handlePositionChange}
            isSelected={selectedFile === "recommendation"}
          >
            <CategoryFile type="recommendation" name={t(language, "recommendations")} />
          </DraggableItem>

          {/* Community / Company */}
          <DraggableItem
            id="folder-community"
            initialPosition={getInitialPosition(
              "folder-community",
              defaultPositions.community,
            )}
            onDoubleClick={handleOpenCommunity}
            onClick={() =>
              isMobile ? handleOpenCommunity() : setSelectedFile("community")
            }
            onContextMenu={(e) =>
              handleItemContextMenu(e, "folder-community", "folder")
            }
            onPositionChange={handlePositionChange}
            isSelected={selectedFile === "community"}
          >
            <CategoryFile type="community" name={t(language, "community")} />
          </DraggableItem>

          {/* Open Source */}
          <DraggableItem
            id="folder-opensource"
            initialPosition={getInitialPosition(
              "folder-opensource",
              defaultPositions.opensource,
            )}
            onDoubleClick={handleOpenOpensource}
            onClick={() =>
              isMobile ? handleOpenOpensource() : setSelectedFile("opensource")
            }
            onContextMenu={(e) =>
              handleItemContextMenu(e, "folder-opensource", "folder")
            }
            onPositionChange={handlePositionChange}
            isSelected={selectedFile === "opensource"}
          >
            <CategoryFile type="opensource" name={t(language, "openSource")} />
          </DraggableItem>

          {/* Hackathon */}
          <DraggableItem
            id="folder-hackathon"
            initialPosition={getInitialPosition(
              "folder-hackathon",
              defaultPositions.hackathon,
            )}
            onDoubleClick={handleOpenHackathon}
            onClick={() =>
              isMobile ? handleOpenHackathon() : setSelectedFile("hackathon")
            }
            onContextMenu={(e) =>
              handleItemContextMenu(e, "folder-hackathon", "folder")
            }
            onPositionChange={handlePositionChange}
            isSelected={selectedFile === "hackathon"}
          >
            <CategoryFile type="hackathon" name={t(language, "hackathon")} />
          </DraggableItem>

          {/* Company (CEO / gestionnaire) */}
          <DraggableItem
            id="folder-entreprise"
            initialPosition={getInitialPosition(
              "folder-entreprise",
              defaultPositions.entreprise,
            )}
            onDoubleClick={handleOpenCompany}
            onClick={() =>
              isMobile ? handleOpenCompany() : setSelectedFile("entreprise")
            }
            onContextMenu={(e) =>
              handleItemContextMenu(e, "folder-entreprise", "folder")
            }
            onPositionChange={handlePositionChange}
            isSelected={selectedFile === "entreprise"}
          >
            <CategoryFile type="entreprise" name={t(language, "company")} />
          </DraggableItem>
        </DesktopGrid>
      </div>

      {/* Desktop: Bento à DROITE */}
      {!isMobile && (
        <div className="h-full flex-1 flex items-center justify-center">
          <AboutBento
            photoSrc="/assets/moisansbg.png"
            name={personalInfo.name}
            title={personalInfo.title}
            description={t(language, "profileBlurb")}
            noteTitle={t(language, "atGlance")}
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

    </main>
  );
}
