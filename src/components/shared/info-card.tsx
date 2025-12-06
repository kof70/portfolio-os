"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export interface InfoCardProps {
  /** Main title of the card */
  title: string;
  /** Subtitle (company, school, etc.) */
  subtitle?: string;
  /** Period or date range */
  period?: string;
  /** Description text */
  description?: string;
  /** Icon or emoji to display */
  icon?: React.ReactNode;
  /** Additional tags/badges */
  tags?: string[];
  /** Whether to use responsive layout based on isMdUp */
  isResponsive?: boolean;
  /** Custom class name */
  className?: string;
  /** Children for custom content */
  children?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  subtitle,
  period,
  description,
  icon,
  tags,
  isResponsive = true,
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors p-5",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {/* Header with title and period */}
      <div
        className={cn(
          "flex justify-between mb-2",
          isResponsive
            ? "flex-col md:flex-row md:items-center"
            : "flex-row items-center",
        )}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="text-white font-medium">{title}</h3>
        </div>
        {period && <span className="text-white/40 text-sm">{period}</span>}
      </div>

      {/* Subtitle */}
      {subtitle && <p className="text-white/60 text-sm mb-2">{subtitle}</p>}

      {/* Description */}
      {description && <p className="text-white/50 text-sm">{description}</p>}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Custom children */}
      {children}
    </div>
  );
};

// =============================================================================
// SPECIALIZED VARIANTS
// =============================================================================

export interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  isMdUp?: boolean;
  className?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  period,
  description,
  isMdUp = true,
  className,
}) => {
  return (
    <InfoCard
      title={title}
      subtitle={company}
      period={period}
      description={description}
      isResponsive={!isMdUp}
      className={className}
    />
  );
};

export interface EducationCardProps {
  degree: string;
  school: string;
  period: string;
  isMdUp?: boolean;
  className?: string;
}

export const EducationCard: React.FC<EducationCardProps> = ({
  degree,
  school,
  period,
  isMdUp = true,
  className,
}) => {
  return (
    <InfoCard
      title={degree}
      subtitle={school}
      period={period}
      isResponsive={!isMdUp}
      className={className}
    />
  );
};

// =============================================================================
// SECTION HEADER COMPONENT
// =============================================================================

export interface SectionHeaderProps {
  title: string;
  emoji?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  emoji,
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl",
  };

  return (
    <h2
      className={cn(
        "text-white font-semibold mb-4 flex items-center gap-2",
        sizeClasses[size],
        className,
      )}
    >
      {emoji && <span className="text-2xl">{emoji}</span>}
      {title}
    </h2>
  );
};

export default InfoCard;
