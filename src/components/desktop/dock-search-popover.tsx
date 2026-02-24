"use client";

import * as React from "react";
import { Search, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type BadgeType,
} from "@/lib/data";
import { usePortfolioContent } from "@/lib/use-portfolio-content";
import { useWindowActions } from "./viewer/window-context";
import { ProjectsView } from "./viewer/views/projects-view";
import { AboutView } from "./viewer/views/about-view";
import { ContactView } from "./viewer/views/contact-view";
import { CVView } from "./viewer/views/cv-view";
import { CategoryView } from "./viewer/views/category-view";
import { AnimatePresence, motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { createPortal } from "react-dom";
import { useLanguage } from "@/hooks/use-language";
import { badgeLabel, t } from "@/lib/i18n";

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

export function DockSearchPopover({
  open,
  onClose,
  anchorRect,
}: DockSearchPopoverProps) {
  const { isMobile } = useIsMobile();
  const { language } = useLanguage();
  const { contactLinks, events, experiences, personalInfo, projects, skills } =
    usePortfolioContent();
  const resultTypeLabel: Record<SearchResult["type"], string> = React.useMemo(
    () =>
      language === "fr"
        ? {
            action: "Action",
            project: "Projet",
            skill: "Compétence",
            experience: "Expérience",
            event: "Événement",
            contact: "Contact",
          }
        : {
            action: "Action",
            project: "Project",
            skill: "Skill",
            experience: "Experience",
            event: "Event",
            contact: "Contact",
          },
    [language],
  );
  const { openWindow } = useWindowActions();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
        title: t(language, "projects"),
        content: <ProjectsView initialProjectId={initialProjectId} />,
        position: { x: 100, y: 50 },
        size: { width: 900, height: 600 },
        minSize: { width: 600, height: 400 },
        isMinimized: false,
        isMaximized: false,
      });
      onClose();
    },
    [language, onClose, openWindow],
  );

  const openAbout = React.useCallback(() => {
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
    onClose();
  }, [language, onClose, openWindow]);

  const openContact = React.useCallback(() => {
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
    onClose();
  }, [language, onClose, openWindow]);

  const openCv = React.useCallback(() => {
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
    onClose();
  }, [language, onClose, openWindow]);

  const openCategory = React.useCallback(
    (badge: BadgeType) => {
      openWindow({
        id: `category-${badge}`,
        title: badgeLabel(language, badge),
        content: <CategoryView badge={badge} title={badgeLabel(language, badge)} />,
        position: { x: 160, y: 100 },
        size: { width: 800, height: 600 },
        minSize: { width: 500, height: 400 },
        isMinimized: false,
        isMaximized: false,
      });
      onClose();
    },
    [language, onClose, openWindow],
  );

  const baseResults = React.useMemo<SearchResult[]>(() => {
    const quickActions: SearchResult[] = [
      {
        id: "action-projects",
        title: t(language, "openProjects"),
        description: t(language, "viewAllProjects"),
        type: "action",
        onSelect: () => openProjects(),
        searchable: "ouvrir projets portfolio app",
      },
      {
        id: "action-about",
        title: t(language, "openAbout"),
        description:
          language === "fr"
            ? "Bio, parcours, positionnement"
            : "Bio, background, positioning",
        type: "action",
        onSelect: openAbout,
        searchable: "ouvrir a propos bio presentation",
      },
      {
        id: "action-contact",
        title: t(language, "openContact"),
        description: t(language, "contactDetails"),
        type: "action",
        onSelect: openContact,
        searchable: "ouvrir contact email linkedin github whatsapp",
      },
      {
        id: "action-cv",
        title: t(language, "openCV"),
        description: t(language, "cvSummary"),
        type: "action",
        onSelect: openCv,
        searchable: "open cv resume experience education",
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
      description: `Skill ${skill.category}`,
      type: "skill",
      onSelect: openAbout,
      searchable: `${skill.name} ${skill.category} skill tech`,
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
  }, [
    language,
    onClose,
    openAbout,
    openCategory,
    openContact,
    openCv,
    openProjects,
    projects,
    skills,
    experiences,
    events,
    contactLinks,
    personalInfo,
  ]);

  const normalizedQuery = query.trim().toLowerCase();
  const results = React.useMemo(() => {
    if (!normalizedQuery) return baseResults.slice(0, isMobile ? 10 : 14);
    return baseResults
      .filter((item) => item.searchable.toLowerCase().includes(normalizedQuery))
      .slice(0, isMobile ? 14 : 24);
  }, [baseResults, normalizedQuery, isMobile]);

  const containerStyle: React.CSSProperties = React.useMemo(() => {
    if (isMobile) {
      const bottomPx =
        typeof window !== "undefined"
          ? 80 + Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-bottom") || "0")
          : 80;
      return {
        position: "fixed",
        left: "50%",
        bottom: bottomPx,
        zIndex: 9999,
      };
    }
    if (!anchorRect) return {};
    const bottomPx =
      typeof window !== "undefined" ? window.innerHeight - anchorRect.top + 10 : 0;
    return {
      position: "fixed",
      left: anchorRect.left + anchorRect.width / 2,
      bottom: bottomPx,
      zIndex: 9999,
    };
  }, [anchorRect, isMobile]);

  const content = (
    <AnimatePresence>
      {open && (isMobile || anchorRect) && (
        <div style={containerStyle} className="left-1/2 -translate-x-1/2">
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className={cn(
              isMobile ? "w-[min(90vw,360px)]" : "w-[min(94vw,600px)]",
              "rounded-2xl border border-white/15",
              "bg-black/75 backdrop-blur-2xl shadow-2xl shadow-black/60",
              "overflow-hidden",
            )}
          >
            <div className={cn("border-b border-white/10", isMobile ? "p-2.5" : "p-3")}>
              <div
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/30",
                  isMobile ? "px-2.5 py-2" : "px-3 py-2.5",
                )}
              >
                <Search className="size-4 text-white/60" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t(language, "searchPlaceholder")}
                  className={cn(
                    "w-full bg-transparent text-white placeholder:text-white/50 focus:outline-none",
                    isMobile ? "text-xs" : "text-sm",
                  )}
                />
              </div>
            </div>

            <div
              className={cn(
                "p-2 overflow-y-auto space-y-1.5",
                isMobile ? "max-h-[45vh]" : "max-h-[52vh]",
              )}
            >
              {results.length === 0 ? (
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
                  {t(language, "searchNoResult")} “{query}”.
                </div>
              ) : (
                results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={result.onSelect}
                    className={cn(
                      "w-full text-left rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors",
                      isMobile ? "p-2.5" : "p-3",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className={cn("font-medium leading-tight text-white", isMobile ? "text-xs" : "text-sm")}>
                          {result.title}
                        </p>
                        <p className="text-xs text-white/65 mt-1 line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wide text-white/45">
                          {resultTypeLabel[result.type]}
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
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}
