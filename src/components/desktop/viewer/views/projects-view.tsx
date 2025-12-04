"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// Données de démonstration - Tu pourras les remplacer par tes vrais projets
const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Desktop",
    description:
      "Un portfolio interactif style macOS avec drag & drop, fenêtres et dock animé.",
    image: "/assets/bg-3.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "2",
    title: "E-Commerce App",
    description:
      "Application e-commerce complète avec panier, paiement et gestion des commandes.",
    image: "/assets/bg-1.jpg",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com",
  },
  {
    id: "3",
    title: "Chat Application",
    description:
      "Application de chat en temps réel avec WebSockets et authentification.",
    image: "/assets/macos-bg.jpg",
    tags: ["React", "Socket.io", "Express", "JWT"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className={cn(
        "group relative bg-white/5 rounded-xl overflow-hidden",
        "border border-white/10 hover:border-white/20",
        "transition-all duration-300 hover:scale-[1.02]"
      )}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/70">
              +{project.tags.length - 3}
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
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>Live</span>
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

export const ProjectsView: React.FC<ProjectsViewProps> = ({ className }) => {
  return (
    <div className={cn("h-full bg-neutral-900/50 p-6", className)}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white text-2xl font-bold mb-2">Mes Projets</h2>
        <p className="text-white/60 text-sm">
          Découvrez quelques-uns de mes projets récents
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
