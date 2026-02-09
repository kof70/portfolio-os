"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  useWindowViewport,
  WindowViewportProvider,
} from "../use-window-viewport";
import { Icons } from "@/components/icons";
import { projects, type Project } from "@/lib/data";

/** Retourne un extrait court du lien (sans protocole, domaine + chemin court) */
function getLinkExcerpt(url: string, maxLength = 40): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const path = u.pathname !== "/" ? u.pathname : "";
    const full = host + path;
    return full.length > maxLength ? full.slice(0, maxLength - 3) + "…" : full;
  } catch {
    return url.length > maxLength ? url.slice(0, maxLength - 3) + "…" : url;
  }
}

interface ProjectCardProps {
  project: Project;
  isCompact?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isCompact = false,
}) => {
  const linkUrl = project.liveUrl || project.githubUrl;
  const linkExcerpt = linkUrl ? getLinkExcerpt(linkUrl) : null;

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "bg-white/5 rounded-xl border border-white/10 hover:border-white/20",
        "transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5",
      )}
    >
      {/* Aperçu : image statique ou iframe de la page live (extrait de la vue réelle) */}
      <div
        className={cn(
          "relative overflow-hidden bg-white",
          isCompact ? "h-32" : "h-40",
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (project.liveUrl || project.githubUrl) ? (
          <>
            <iframe
              src={project.liveUrl || project.githubUrl}
              title={`Aperçu : ${project.title}`}
              className="absolute inset-0 w-full h-full border-0 pointer-events-none scale-[0.35] origin-top-left"
              style={{
                width: "285.71%",
                height: "285.71%",
              }}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
            {!project.liveUrl && project.githubUrl && (
              <div
                className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/90 pointer-events-none"
                aria-hidden
              >
                <p className="text-white text-sm text-center px-3 font-medium">
                  Aperçu non disponible pour ce lien
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className={cn("p-4", isCompact && "p-3")}>
        <h3
          className={cn(
            "text-white font-semibold mb-2",
            isCompact ? "text-base" : "text-lg",
          )}
        >
          {project.title}
        </h3>
        {/* Extrait / description du projet */}
        <p
          className={cn(
            "text-white/70 mb-3 line-clamp-3",
            isCompact ? "text-xs" : "text-sm",
          )}
          title={project.description}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, isCompact ? 2 : 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > (isCompact ? 2 : 3) && (
            <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/70">
              +{project.tags.length - (isCompact ? 2 : 3)}
            </span>
          )}
        </div>

        {/* Extrait du lien du projet */}
        {linkExcerpt && (
          <a
            href={linkUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/50 hover:text-white/80 text-xs truncate mb-2 transition-colors"
            title={linkUrl!}
          >
            {linkExcerpt}
          </a>
        )}

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
            >
              <Icons.github className="w-4 h-4" />
              <span className={cn(isCompact && "hidden sm:inline")}>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
            >
              <Icons.externalLink className="w-4 h-4" />
              <span className={cn(isCompact && "hidden sm:inline")}>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

interface ProjectsViewProps {
  className?: string;
}

const ProjectsViewContent: React.FC<ProjectsViewProps> = ({ className }) => {
  const { isXs, isSmUp, isMdUp, isLgUp } = useWindowViewport();

  // Determine grid columns based on window size
  const getGridCols = () => {
    if (isLgUp) return "grid-cols-3";
    if (isMdUp) return "grid-cols-2";
    return "grid-cols-1";
  };

  return (
    <div
      className={cn(
        "h-full bg-neutral-900/50 overflow-auto",
        isSmUp ? "p-6" : "p-4",
        className,
      )}
    >
      {/* Header */}
      <div className="mb-6">
        <h2
          className={cn(
            "text-white font-bold mb-2",
            isSmUp ? "text-2xl" : "text-xl",
          )}
        >
          Mes Projets
        </h2>
        <p className={cn("text-white/70", isXs ? "text-xs" : "text-sm")}>
          Découvrez quelques-uns de mes projets récents
        </p>
      </div>

      {/* Grid */}
      <div className={cn("grid gap-4", getGridCols())}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} isCompact={isXs} />
        ))}
      </div>
    </div>
  );
};

export const ProjectsView: React.FC<ProjectsViewProps> = ({ className }) => {
  return (
    <WindowViewportProvider>
      <ProjectsViewContent className={className} />
    </WindowViewportProvider>
  );
};

export default ProjectsView;
