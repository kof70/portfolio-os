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

interface ProjectCardProps {
  project: Project;
  isCompact?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isCompact = false,
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "bg-white/5 rounded-xl border border-white/10 hover:border-white/20",
        "transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5",
      )}
    >
      {/* Image */}
      <div
        className={cn("relative overflow-hidden", isCompact ? "h-32" : "h-40")}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-purple-500/20 to-blue-500/20" />
        )}
        <div className="absolute  bg-linear-to-t from-black/60 to-transparent" />
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
        <p
          className={cn(
            "text-white/70 mb-3 line-clamp-2",
            isCompact ? "text-xs" : "text-sm",
          )}
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
