"use client";

import * as React from "react";
import { Search, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BADGE_LABELS,
  contactLinks,
  events,
  experiences,
  personalInfo,
  projects,
  skills,
  type BadgeType,
} from "@/lib/data";
import { useWindowActions } from "./viewer/window-context";
import { ProjectsView } from "./viewer/views/projects-view";
import { AboutView } from "./viewer/views/about-view";
import { ContactView } from "./viewer/views/contact-view";
import { CVView } from "./viewer/views/cv-view";
import { CategoryView } from "./viewer/views/category-view";
import { AnimatePresence, motion } from "motion/react";

interface DockSearchPopoverProps {
  open: boolean;
  onClose: () => void;
  anchorRect: DOMRect | null;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "action" | "project" | "skill" | "experience" | "event" | "contact";
  externalHref?: string;
  onSelect: () => void;
  searchable: string;
}

const RESULT_TYPE_LABEL: Record<SearchResult["type"], string> = {
  action: "Action",
  project: "Projet",
  skill: "Compétence",
  experience: "Expérience",
  event: "Événement",
  contact: "Contact",
};

export function DockSearchPopover({
  open,
  onClose,
  anchorRect,
}: DockSearchPopoverProps) {
  const { openWindow } = useWindowActions();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [open]);

  const openProjects = React.useCallback(
    (initialProjectId?: string) => {
      openWindow({
        id: "projects",
        title: "Projets",
        content: <ProjectsView initialProjectId={initialProjectId} />,
        position: { x: 100, y: 50 },
        size: { width: 900, height: 600 },
        minSize: { width: 600, height: 400 },
        isMinimized: false,
        isMaximized: false,
      });
      onClose();
    },
    [onClose, openWindow],
  );

  const openAbout = React.useCallback(() => {
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
    onClose();
  }, [onClose, openWindow]);

  const openContact = React.useCallback(() => {
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
    onClose();
  }, [onClose, openWindow]);

  const openCv = React.useCallback(() => {
    openWindow({
      id: "cv",
      title: "Mon CV",
      content: <CVView />,
      position: { x: 180, y: 80 },
      size: { width: 800, height: 700 },
      minSize: { width: 500, height: 500 },
      isMinimized: false,
      isMaximized: false,
    });
    onClose();
  }, [onClose, openWindow]);

  const openCategory = React.useCallback(
    (badge: BadgeType) => {
      openWindow({
        id: `category-${badge}`,
        title: BADGE_LABELS[badge],
        content: <CategoryView badge={badge} title={BADGE_LABELS[badge]} />,
        position: { x: 160, y: 100 },
        size: { width: 800, height: 600 },
        minSize: { width: 500, height: 400 },
        isMinimized: false,
        isMaximized: false,
      });
      onClose();
    },
    [onClose, openWindow],
  );

  const baseResults = React.useMemo<SearchResult[]>(() => {
    const quickActions: SearchResult[] = [
      {
        id: "action-projects",
        title: "Ouvrir Projets",
        description: "Voir tous les projets",
        type: "action",
        onSelect: () => openProjects(),
        searchable: "ouvrir projets portfolio app",
      },
      {
        id: "action-about",
        title: "Ouvrir À propos",
        description: "Bio, parcours, positionnement",
        type: "action",
        onSelect: openAbout,
        searchable: "ouvrir a propos bio presentation",
      },
      {
        id: "action-contact",
        title: "Ouvrir Contact",
        description: "Coordonnées et liens",
        type: "action",
        onSelect: openContact,
        searchable: "ouvrir contact email linkedin github whatsapp",
      },
      {
        id: "action-cv",
        title: "Ouvrir CV",
        description: "Expériences, formation et parcours",
        type: "action",
        onSelect: openCv,
        searchable: "ouvrir cv experiences formation",
      },
    ];

    const projectResults: SearchResult[] = projects.map((project) => ({
      id: `project-${project.id}`,
      title: project.title,
      description: project.description,
      type: "project",
      onSelect: () => openProjects(project.id),
      searchable: `${project.title} ${project.description} ${project.tags.join(" ")}`,
    }));

    const skillResults: SearchResult[] = skills.map((skill) => ({
      id: `skill-${skill.name}`,
      title: skill.name,
      description: `Compétence ${skill.category}`,
      type: "skill",
      onSelect: openAbout,
      searchable: `${skill.name} ${skill.category} competence tech`,
    }));

    const experienceResults: SearchResult[] = experiences.map((experience) => ({
      id: `experience-${experience.id}`,
      title: `${experience.title} — ${experience.company}`,
      description: experience.period,
      type: "experience",
      onSelect: openCv,
      searchable: `${experience.title} ${experience.company} ${experience.period} ${experience.description}`,
    }));

    const eventResults: SearchResult[] = events.map((event) => {
      const badge = event.badge;
      return {
        id: `event-${event.id}`,
        title: event.title,
        description: event.date,
        type: "event" as const,
        onSelect: badge ? () => openCategory(badge) : openAbout,
        searchable: `${event.title} ${event.date} ${event.description} ${event.tags.join(" ")}`,
      };
    });

    const contactResults: SearchResult[] = contactLinks.map((contact) => ({
      id: `contact-${contact.id}`,
      title: contact.label,
      description: contact.value,
      type: "contact",
      externalHref: contact.href,
      onSelect: () => {
        window.open(contact.href, "_blank", "noopener,noreferrer");
        onClose();
      },
      searchable: `${contact.label} ${contact.value} ${contact.id}`,
    }));

    const profileResult: SearchResult = {
      id: "profile",
      title: personalInfo.name,
      description: personalInfo.bioShort,
      type: "action",
      onSelect: openAbout,
      searchable: `${personalInfo.name} ${personalInfo.title} ${personalInfo.bio}`,
    };

    return [
      ...quickActions,
      profileResult,
      ...projectResults,
      ...skillResults,
      ...experienceResults,
      ...eventResults,
      ...contactResults,
    ];
  }, [onClose, openAbout, openCategory, openContact, openCv, openProjects]);

  const normalizedQuery = query.trim().toLowerCase();
  const results = React.useMemo(() => {
    if (!normalizedQuery) return baseResults.slice(0, 14);
    return baseResults
      .filter((item) => item.searchable.toLowerCase().includes(normalizedQuery))
      .slice(0, 24);
  }, [baseResults, normalizedQuery]);

  const style: React.CSSProperties = React.useMemo(() => {
    if (!anchorRect) return {};
    const bottomPx =
      typeof window !== "undefined" ? window.innerHeight - anchorRect.top + 10 : 0;
    return {
      position: "fixed",
      left: anchorRect.left + anchorRect.width / 2,
      bottom: bottomPx,
      transform: "translateX(-50%)",
      zIndex: 9999,
    };
  }, [anchorRect]);

  return (
    <AnimatePresence>
      {open && anchorRect && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          style={style}
          className={cn(
            "w-[min(92vw,600px)] rounded-2xl border border-white/15",
            "bg-black/75 backdrop-blur-2xl shadow-2xl shadow-black/60",
            "overflow-hidden",
          )}
        >
          <div className="p-3 border-b border-white/10">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/30 px-3 py-2.5">
              <Search className="size-4 text-white/60" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher: projet, techno, expérience, contact..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-2 max-h-[52vh] overflow-y-auto space-y-1.5">
            {results.length === 0 ? (
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
                Aucun résultat pour “{query}”.
              </div>
            ) : (
              results.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={result.onSelect}
                  className="w-full text-left rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-sm leading-tight text-white">
                        {result.title}
                      </p>
                      <p className="text-xs text-white/65 mt-1 line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wide text-white/45">
                        {RESULT_TYPE_LABEL[result.type]}
                      </span>
                      {result.externalHref && (
                        <ExternalLink className="size-3.5 text-white/45" />
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

