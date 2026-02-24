"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  useWindowViewport,
  WindowViewportProvider,
} from "../use-window-viewport";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolioContent } from "@/lib/use-portfolio-content";
import { SectionHeader } from "@/components/shared/info-card";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/i18n";

interface ContactViewProps {
  className?: string;
}

const ContactViewContent: React.FC<ContactViewProps> = ({ className }) => {
  const { isXs, isSmUp, isMdUp } = useWindowViewport();
  const { language } = useLanguage();
  const { contactLinks } = usePortfolioContent();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  // Get icon component from Icons object
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent ? <IconComponent className="size-8 shrink-0" /> : null;
  };

  return (
    <div
      className={cn(
        "h-full bg-neutral-900/50 overflow-auto",
        isSmUp ? "p-6" : "p-4",
        className,
      )}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={cn("mb-8", isMdUp ? "text-center" : "text-left")}>
          <h1
            className={cn(
              "text-white font-bold mb-3",
              isSmUp ? "text-3xl" : "text-2xl",
            )}
          >
            {t(language, "contactMe")}
          </h1>
          <p
            className={cn(
              "text-white/70",
              isXs ? "text-xs" : "text-sm",
              isMdUp && "max-w-md mx-auto",
            )}
          >
            {t(language, "contactIntro")}
          </p>
        </div>

        <div
          className={cn("grid gap-8", isMdUp ? "grid-cols-1" : "grid-cols-1")}
        >
          {/* Contact Links */}
          <div>
            <SectionHeader
              title={t(language, "findMeOn")}
              emoji="🔗"
              size={isSmUp ? "md" : "sm"}
            />
            <div className="space-y-3 grid grid-cols-2 gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 h-20",
                    "transition-all duration-300 group",
                    isXs ? "p-3" : "p-4",
                    link.hoverColor,
                  )}
                >
                  <div className="text-white/70 group-hover:scale-110 transition-transform">
                    {getIcon(link.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">{link.label}</p>
                    <p
                      className={cn(
                        "text-white/50 truncate",
                        isXs ? "text-xs" : "text-sm",
                      )}
                    >
                      {link.value}
                    </p>
                  </div>
                  <Icons.chevronRight className="w-5 h-5 ml-auto text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          {/*<div>
            <SectionHeader
              title="Envoyez-moi un message"
              emoji="✉️"
              size={isSmUp ? "md" : "sm"}
            />

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white/5 rounded-xl border border-white/10">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <Icons.check className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-white font-medium">Message envoyé !</p>
                <p className="text-white/70 text-sm">
                  Je vous répondrai dès que possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div
                  className={cn(
                    "grid gap-4",
                    isSmUp ? "grid-cols-2" : "grid-cols-1",
                  )}
                >
                  <Input
                    type="text"
                    name="name"
                    label="Nom"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className={isXs ? "px-3 py-2 text-sm" : ""}
                  />

                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className={isXs ? "px-3 py-2 text-sm" : ""}
                  />
                </div>

                <Input
                  type="text"
                  name="subject"
                  label="Sujet"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Sujet de votre message"
                  className={isXs ? "px-3 py-2 text-sm" : ""}
                />

                <Textarea
                  name="message"
                  label="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={isXs ? 3 : 4}
                  placeholder="Votre message..."
                  className={isXs ? "px-3 py-2 text-sm" : ""}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                    isXs ? "py-2.5 text-sm" : "py-3",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Icons.spinner className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer
                      <Icons.send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC<ContactViewProps> = ({ className }) => {
  return (
    <WindowViewportProvider>
      <ContactViewContent className={className} />
    </WindowViewportProvider>
  );
};

export default ContactView;
