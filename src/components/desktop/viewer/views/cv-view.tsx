"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  useWindowViewport,
  WindowViewportProvider,
} from "../use-window-viewport";
import { Button } from "@/components/ui/button";
import {
  type Experience,
  type Education,
  type Event,
} from "@/lib/data";
import { usePortfolioContent } from "@/lib/use-portfolio-content";
import { Icons } from "@/components/icons";
import { GlitchName } from "@/components/shared/glitch-name";
import { Eye, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useIsMobile } from "@/hooks/use-mobile";
import { t } from "@/lib/i18n";

const CV_BY_LANGUAGE: Record<"fr" | "en", { url: string; downloadName: string }> =
  {
    fr: {
      url: "/assets/djakpa-koffi-cv.pdf",
      downloadName: "Djakpa Koffi CV.pdf",
    },
    en: {
      url: "/assets/djakpa-koffi-cv-en.pdf",
      downloadName: "Djakpa Koffi CV (EN).pdf",
    },
  };

// ---------------------------------------------------------------------------
// Types & helpers
// ---------------------------------------------------------------------------

type TimelineItemType = "experience" | "education" | "event";

interface TimelineItem {
  id: string;
  type: TimelineItemType;
  periodLabel: string;
  year: number;
  month: number;
  title: string;
  subtitle: string;
  description: string;
}

const MONTHS: Record<string, number> = {
  janv: 1, jan: 1, janvier: 1,
  fev: 2, fév: 2, févr: 2, février: 2,
  mars: 3, mar: 3,
  avr: 4, avril: 4,
  mai: 5,
  juin: 6, jun: 6,
  juil: 7, jul: 7, juillet: 7,
  août: 8, aout: 8, aug: 8,
  sept: 9, sep: 9, septembre: 9,
  oct: 10, octobre: 10,
  nov: 11, novembre: 11,
  déc: 12, dec: 12, décembre: 12,
};

function parseDate(str: string): [number, number] {
  const yearMatch = str.match(/\b(20\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : 0;
  const lower = str.toLowerCase();
  for (const [key, m] of Object.entries(MONTHS)) {
    if (lower.includes(key)) return [year, m];
  }
  return [year, 0];
}

function buildItems(
  experiences: Experience[],
  education: Education[],
  events: Event[],
): TimelineItem[] {
  const items: TimelineItem[] = [];

  for (const exp of experiences) {
    const [y, m] = parseDate(exp.period);
    items.push({
      id: `exp-${exp.id}`,
      type: "experience",
      periodLabel: exp.period,
      year: y,
      month: m,
      title: exp.title,
      subtitle: exp.company,
      description: exp.description,
    });
  }
  for (const edu of education) {
    const [y, m] = parseDate(edu.period);
    items.push({
      id: `edu-${edu.id}`,
      type: "education",
      periodLabel: edu.period,
      year: y,
      month: m,
      title: edu.degree,
      subtitle: edu.school,
      description: "",
    });
  }
  for (const ev of events) {
    const [y, m] = parseDate(ev.date);
    items.push({
      id: `ev-${ev.id}`,
      type: "event",
      periodLabel: ev.date,
      year: y,
      month: m,
      title: ev.title,
      subtitle: "",
      description: ev.description,
    });
  }

  // Du plus ancien au plus récent
  items.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return (a.month || 1) - (b.month || 1);
  });

  return items;
}

// ---------------------------------------------------------------------------
// Style
// ---------------------------------------------------------------------------

const COLORS = [
  "#14b8a6", // teal
  "#eab308", // amber
  "#f97316", // orange
  "#3b82f6", // blue
  "#a855f7", // violet
  "#ec4899", // pink
] as const;

// ---------------------------------------------------------------------------
// Card (left or right)
// ---------------------------------------------------------------------------

const TimelineCard: React.FC<{
  item: TimelineItem;
  typeLabels: Record<TimelineItemType, string>;
  color: string;
  align: "left" | "right";
  compact?: boolean;
}> = ({ item, typeLabels, color, align, compact }) => (
  <div
    className={cn(
      "rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm",
      compact ? "p-3" : "p-4",
      align === "left" ? "text-right" : "text-left",
    )}
  >
    <div
      className={cn(
        "flex items-center gap-2 mb-1 flex-wrap",
        align === "left" ? "justify-end" : "justify-start",
      )}
    >
      <span className="text-xs font-semibold" style={{ color }}>
        {item.periodLabel}
      </span>
      <span className="text-white/35 text-[10px] uppercase tracking-wider font-medium">
        {typeLabels[item.type]}
      </span>
    </div>
    <h3
      className={cn(
        "text-white font-semibold mb-0.5",
        compact ? "text-xs" : "text-sm",
      )}
    >
      {item.title}
    </h3>
    {item.subtitle ? (
      <p className="text-white/60 text-xs mb-1">{item.subtitle}</p>
    ) : null}
    {item.description ? (
      <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
        {item.description}
      </p>
    ) : null}
  </div>
);


// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const CVTimelineContent: React.FC<{ className?: string }> = ({ className }) => {
  const { isSmUp } = useWindowViewport();
  const { isMobile } = useIsMobile();
  const { language } = useLanguage();
  const { personalInfo, experiences, education, events } = usePortfolioContent();
  const items = React.useMemo(
    () => buildItems(experiences, education, events),
    [experiences, education, events],
  );
  const typeLabels = React.useMemo<Record<TimelineItemType, string>>(
    () => ({
      experience: "Exp.",
      education: t(language, "education"),
      event: t(language, "event"),
    }),
    [language],
  );
  const [showPdf, setShowPdf] = React.useState(false);
  const cvAsset = CV_BY_LANGUAGE[language];

  // iOS/Chrome mobile can't scroll a PDF embedded in an <iframe> (it renders the
  // first page only), so on mobile we open the PDF in a real browser tab where
  // the native viewer handles it; the inline iframe stays a desktop affordance.
  const openPdfTab = React.useCallback(() => {
    window.open(cvAsset.url, "_blank", "noopener,noreferrer");
  }, [cvAsset.url]);

  const handleViewCv = React.useCallback(() => {
    if (isMobile) {
      openPdfTab();
      return;
    }
    setShowPdf((v) => !v);
  }, [isMobile, openPdfTab]);

  const handleDownload = React.useCallback(() => {
    if (isMobile) {
      openPdfTab();
      return;
    }
    const link = document.createElement("a");
    link.href = cvAsset.url;
    link.download = cvAsset.downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [isMobile, openPdfTab, cvAsset.downloadName, cvAsset.url]);

  // Identifier les changements d'année pour placer des marqueurs
  const yearMarkers = React.useMemo(() => {
    const set = new Set<number>();
    let seen = 0;
    items.forEach((item, index) => {
      if (item.year > 0 && item.year !== seen) {
        set.add(index);
        seen = item.year;
      }
    });
    return set;
  }, [items]);

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-neutral-900/50 overflow-hidden",
        className,
      )}
    >
      {/* Barre haute */}
      <div
        className={cn(
          "shrink-0 flex items-center justify-between gap-4 border-b border-white/10 bg-black/20",
          isSmUp ? "px-4 py-3" : "px-3 py-2",
        )}
      >
        <h2 className="text-white font-semibold text-sm md:text-base">
          {t(language, "myResume")}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleViewCv}
            variant="default"
            size={isSmUp ? "default" : "sm"}
            className="shrink-0 gap-2 bg-white/10 text-white hover:bg-white/20 border border-white/20"
          >
            {showPdf && !isMobile ? (
              <>
                <ArrowLeft className="size-4" />
                {t(language, "timeline")}
              </>
            ) : (
              <>
                <Eye className="size-4" />
                {t(language, "viewCV")}
              </>
            )}
          </Button>
          <Button
            onClick={handleDownload}
            variant="default"
            size={isSmUp ? "default" : "sm"}
            className="shrink-0 bg-white text-black hover:bg-white/90 gap-2"
          >
            <Icons.download className="size-4" />
            {t(language, "download")}
          </Button>
        </div>
      </div>

      {/* Vue PDF - desktop uniquement (iframe non scrollable sur iOS) */}
      {showPdf && !isMobile && (
        <div className="flex-1 min-h-0 p-2">
          <iframe
            src={`${cvAsset.url}#toolbar=1&navpanes=1`}
            title={t(language, "myResume")}
            className="w-full h-full rounded-lg border border-white/10 bg-white"
          />
        </div>
      )}

      {/* Frise chronologique */}
      {(!showPdf || isMobile) && <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch]"
      >
        <div className={cn("mx-auto py-6", isSmUp ? "max-w-4xl px-4" : "px-2")}>

          {/* Introduction - présentation avant la frise */}
          <div className={cn("mb-8 text-center max-w-2xl mx-auto", isSmUp ? "px-4" : "px-2")}>
            <GlitchName
              fullName={personalInfo.name}
              pseudoClassName={isSmUp ? "text-4xl" : "text-3xl"}
              nameClassName={isSmUp ? "text-2xl" : "text-xl"}
              className="min-h-[48px] place-items-center"
            />
            <div className="mb-3" />
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">
              {personalInfo.subtitle}
            </p>
            <div className="space-y-3 text-white/65 text-sm leading-relaxed">
              {language === "fr" ? (
                <>
                  <p>
                    Lead Backend Engineer et DevSecOps basé à Lomé, Togo. Je travaille principalement sur les systèmes backend, la fintech (mobile money, orchestration PERFECTWS / PI-SPI) et l&apos;infrastructure.
                  </p>
                  <p>
                    Mon périmètre est plus large : mobile (React Native), frontend web et production audiovisuelle avec Rekap. Je relie produit, design et infrastructure technique pour livrer des produits solides.
                  </p>
                  <p>
                    Mon parcours couvre des projets variés : startups, entreprises locales, communautés open source, hackathons internationaux et initiatives panafricaines.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Lead Backend Engineer and DevSecOps based in Lome, Togo. I work mainly on backend systems, fintech (mobile money, PERFECTWS / PI-SPI orchestration), and infrastructure.
                  </p>
                  <p>
                    My scope is broader: mobile development (React Native), web frontend, and audiovisual production with Rekap. I bridge product, design, and technical infrastructure to deliver solid products.
                  </p>
                  <p>
                    My journey spans a wide range of projects: startups, local companies, open-source communities, international hackathons, and pan-African initiatives.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Séparateur vers la frise */}
          <div className="flex justify-center mb-6">
            <div className="w-1 h-10 bg-white/30 rounded-full" />
          </div>
          {items.map((item, index) => {
            const color = COLORS[index % COLORS.length];
            const isLeft = index % 2 === 0;
            const showYear = yearMarkers.has(index);

            return (
              <React.Fragment key={item.id}>
                {/* Marqueur année (quand l'année change) */}
                {showYear && (
                  <div className="grid grid-cols-[1fr_56px_1fr] gap-0 mb-1">
                    <div />
                    <div className="flex items-center justify-center relative">
                      <div className="absolute top-0 bottom-0 w-1 bg-white/30 rounded-full" aria-hidden />
                      <span className="relative z-10 bg-white/15 border border-white/25 rounded-md px-3 py-1.5 text-white font-bold text-xs">
                        {item.year}
                      </span>
                    </div>
                    <div />
                  </div>
                )}

                {/* Ligne de contenu : [gauche | axe (barre + cercle) | droite] */}
                <div className="grid grid-cols-[1fr_56px_1fr] gap-0 mb-4">
                  {/* Colonne gauche */}
                  <div className={cn("flex items-center min-h-[80px]", isLeft ? "justify-end" : "")}>
                    {isLeft && (
                      <div className="flex items-center gap-0 w-full justify-end">
                        <TimelineCard
                          item={item}
                          typeLabels={typeLabels}
                          color={color}
                          align="left"
                          compact={!isSmUp}
                        />
                        <div
                          className="h-0.5 shrink-0 rounded"
                          style={{
                            backgroundColor: color,
                            width: isSmUp ? 32 : 16,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Axe central : grande ligne blanche + barre colorée greffée + cercle */}
                  <div className="flex flex-col items-center justify-center relative">
                    {/* Grande ligne blanche centrale */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white/30 rounded-full"
                      aria-hidden
                    />
                    {/* Barre colorée greffée sur la ligne */}
                    <div
                      className="w-3 rounded-sm z-10 my-1"
                      style={{
                        backgroundColor: color,
                        height: isSmUp ? 44 : 30,
                      }}
                    />
                    {/* Cercle connecteur */}
                    <div
                      className="size-5 rounded-full border-[3px] border-white/50 z-10 shrink-0 shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  {/* Colonne droite */}
                  <div className={cn("flex items-center min-h-[80px]", !isLeft ? "justify-start" : "")}>
                    {!isLeft && (
                      <div className="flex items-center gap-0 w-full justify-start">
                        <div
                          className="h-0.5 shrink-0 rounded"
                          style={{
                            backgroundColor: color,
                            width: isSmUp ? 32 : 16,
                          }}
                        />
                        <TimelineCard
                          item={item}
                          typeLabels={typeLabels}
                          color={color}
                          align="right"
                          compact={!isSmUp}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* Fin de la frise */}
          <div className="grid grid-cols-[1fr_56px_1fr] gap-0">
            <div />
            <div className="flex items-center justify-center relative py-2">
              <div className="absolute top-0 h-1/2 w-1 bg-white/30 rounded-full" aria-hidden />
              <div className="relative z-10 w-4 h-4 rounded-full bg-white/25 border-2 border-white/40" />
            </div>
            <div />
          </div>
        </div>
      </div>}
    </div>
  );
};

export const CVView: React.FC<{ className?: string }> = ({ className }) => (
  <WindowViewportProvider>
    <CVTimelineContent className={className} />
  </WindowViewportProvider>
);

export default CVView;
