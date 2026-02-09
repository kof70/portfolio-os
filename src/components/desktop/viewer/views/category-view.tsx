"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  useWindowViewport,
  WindowViewportProvider,
} from "../use-window-viewport";
import { Icons } from "@/components/icons";
import {
  type BadgeType,
  BADGE_LABELS,
  BADGE_ICONS,
  getProjectsByBadge,
  getEventsByBadge,
  type Project,
} from "@/lib/data";
import { SectionHeader } from "@/components/shared/info-card";

interface CategoryViewProps {
  badge: BadgeType;
  title: string;
  className?: string;
}

const ProjectCard: React.FC<{
  project: Project;
  isCompact?: boolean;
}> = ({ project, isCompact = false }) => {
  const previewUrl = project.liveUrl || project.githubUrl;
  const isGitHubOnly = !project.liveUrl && !!project.githubUrl;
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "bg-white/5 rounded-xl border border-white/10 hover:border-white/20",
        "transition-all duration-300",
      )}
    >
      <div className={cn("relative overflow-hidden bg-white", isCompact ? "h-28" : "h-36")}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover"
          />
        ) : previewUrl ? (
          <>
            <iframe
              src={previewUrl}
              title={`Aperçu : ${project.title}`}
              className="absolute inset-0 w-full h-full border-0 pointer-events-none scale-[0.3] origin-top-left"
              style={{ width: "333.33%", height: "333.33%" }}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
            {isGitHubOnly && (
              <div
                className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/90 pointer-events-none"
                aria-hidden
              >
                <p className="text-white text-sm text-center px-2 font-medium">
                  Aperçu non disponible pour ce lien
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    <div className={cn("p-3", isCompact && "p-2")}>
      <h3 className="text-white font-semibold text-sm line-clamp-1">
        {project.title}
      </h3>
      <p className="text-white/60 text-xs line-clamp-2 mt-0.5">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1 mt-2">
        {project.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
  );
};

const CategoryViewContent: React.FC<CategoryViewProps> = ({
  badge,
  title,
  className,
}) => {
  const { isXs, isSmUp, isMdUp } = useWindowViewport();
  const badgeProjects = getProjectsByBadge(badge);
  const badgeEvents = getEventsByBadge(badge);
  const Icon = Icons[BADGE_ICONS[badge]];

  return (
    <div
      className={cn(
        "h-full bg-neutral-900/50 overflow-auto",
        isSmUp ? "p-6" : "p-4",
        className,
      )}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header avec icône */}
        <div className="flex items-center gap-4 mb-8">
          {Icon && (
            <div className="rounded-xl bg-white/10 p-3">
              <Icon className="size-10 text-white" />
            </div>
          )}
          <div>
            <h1
              className={cn(
                "text-white font-bold",
                isSmUp ? "text-2xl" : "text-xl",
              )}
            >
              {title}
            </h1>
            <p className="text-white/60 text-sm mt-0.5">
              {BADGE_LABELS[badge]}
            </p>
          </div>
        </div>

        {/* Projets */}
        {badgeProjects.length > 0 && (
          <section className="mb-8">
            <SectionHeader
              title="Projets"
              emoji="📁"
              size={isSmUp ? "md" : "sm"}
            />
            <div
              className={cn(
                "grid gap-4",
                isMdUp ? "grid-cols-2" : "grid-cols-1",
              )}
            >
              {badgeProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isCompact={isXs}
                />
              ))}
            </div>
          </section>
        )}

        {/* Événements */}
        {badgeEvents.length > 0 && (
          <section>
            <SectionHeader
              title="Événements"
              emoji="📅"
              size={isSmUp ? "md" : "sm"}
            />
            <div className="space-y-4">
              {badgeEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white/5 rounded-xl border border-white/10 p-4 hover:border-white/20 transition-colors"
                >
                  <div className="flex gap-4">
                    {event.image && (
                      <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold">
                        {event.url ? (
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-white/90 transition-colors"
                          >
                            {event.title}
                          </a>
                        ) : (
                          event.title
                        )}
                      </h3>
                      <p className="text-white/50 text-sm">{event.date}</p>
                      <p className="text-white/70 text-sm mt-1 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2 items-center">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                        {event.url && (
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/70 hover:text-white underline"
                          >
                            Voir l&apos;événement →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {badgeProjects.length === 0 && badgeEvents.length === 0 && (
          <p className="text-white/50 text-center py-12">
            Aucun projet ou événement dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </div>
  );
};

export const CategoryView: React.FC<CategoryViewProps> = (props) => {
  return (
    <WindowViewportProvider>
      <CategoryViewContent {...props} />
    </WindowViewportProvider>
  );
};

export default CategoryView;
