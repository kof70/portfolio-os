"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlitchNameProps {
  fullName: string;
  className?: string;
  pseudoClassName?: string;
  nameClassName?: string;
}

// Les styles de glitch qui alternent à chaque transition (un par glitch, pas tous en même temps)
const GLITCH_VARIANTS = [
  // 1) Kof simple — décalé rouge/cyan
  {
    text: "Kof",
    color: "#fff",
    shadow: "3px 0 #ff00ff, -3px 0 #00ffff, 0 0 16px rgba(0,255,255,0.5)",
    transform: "skewX(-3deg)",
  },
  // 2) Kof zalgo — hiéroglyphes
  {
    text: "K\u0337\u0321o\u0336\u0322f\u0337\u031B",
    color: "#e0fff0",
    shadow: "2px 1px #ff00ff, -2px -1px #00ffff, 0 0 12px rgba(0,255,255,0.4)",
    transform: "none",
  },
  // 3) Kof simple — décalé inversé
  {
    text: "Kof",
    color: "#00ffff",
    shadow: "-3px 0 #ff00ff, 0 0 20px rgba(255,0,255,0.5)",
    transform: "skewX(4deg)",
  },
  // 4) Kof zalgo variante 2
  {
    text: "K\u0337\u0361o\u0336\u035Cf\u0337\u0345",
    color: "#ff80ff",
    shadow: "0 0 16px #00ffff, 2px 0 #ff00ff",
    transform: "translate(0, -1px)",
  },
] as const;

export const GlitchName: React.FC<GlitchNameProps> = ({
  fullName,
  className,
  pseudoClassName = "text-2xl",
  nameClassName = "text-2xl",
}) => {
  const [phase, setPhase] = React.useState<
    "pseudo" | "glitchIn" | "fadeOut" | "name"
  >("pseudo");
  // Compteur qui avance de 1 à chaque glitch → on fait le tour des variants
  const variantRef = React.useRef(0);
  const [variantIdx, setVariantIdx] = React.useState(0);

  React.useEffect(() => {
    const randPseudo = () => (5 + Math.random() * 20) * 1000;
    const randName = () => (3 + Math.random() * 12) * 1000;
    const GLITCH_VISIBLE = 1200;
    const FADE_OUT = 400;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      timers.push(setTimeout(() => { if (!cancelled) fn(); }, ms));
    };

    const nextVariant = () => {
      variantRef.current = (variantRef.current + 1) % GLITCH_VARIANTS.length;
      setVariantIdx(variantRef.current);
    };

    const startCycle = () => {
      if (cancelled) return;
      setPhase("pseudo");
      t(() => {
        nextVariant();
        setPhase("glitchIn");
        t(() => {
          setPhase("fadeOut");
          t(() => {
            setPhase("name");
            t(() => {
              nextVariant();
              setPhase("glitchIn");
              t(() => {
                setPhase("fadeOut");
                t(() => startCycle(), FADE_OUT);
              }, GLITCH_VISIBLE);
            }, randName());
          }, FADE_OUT);
        }, GLITCH_VISIBLE);
      }, randPseudo());
    };

    startCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  const isGlitch = phase === "glitchIn";
  const showCorrupted = phase === "glitchIn" || phase === "fadeOut";
  const variant = GLITCH_VARIANTS[variantIdx];

  return (
    <div className={cn("grid", className)} style={{ gridTemplate: "1fr / 1fr" }}>
      {/* Pseudo "Kof" / glitch */}
      <span
        className={cn(
          "font-mono font-black tracking-wider [grid-area:1/1] transition-all",
          pseudoClassName,
          phase === "pseudo" && "opacity-100 text-white duration-500",
          phase === "glitchIn" && "opacity-100 duration-200",
          phase === "fadeOut" && "opacity-0 blur-sm duration-400",
          phase === "name" && "opacity-0 pointer-events-none duration-300",
        )}
        style={{
          textShadow:
            phase === "pseudo"
              ? "2px 0 #ff00ff, -2px 0 #00ffff, 0 0 8px rgba(0,255,255,0.3)"
              : "none",
        }}
      >
        {showCorrupted ? (
          <span
            className="inline-block"
            style={{
              color: isGlitch ? variant.color : "#fff",
              textShadow: isGlitch ? variant.shadow : "none",
              transform: isGlitch ? variant.transform : "none",
            }}
          >
            {variant.text}
          </span>
        ) : (
          <>
            <span className="text-cyan-400">{"<"}</span>
            Kof
            <span className="text-cyan-400">{" />"}</span>
          </>
        )}
      </span>

      {/* Nom complet */}
      <span
        className={cn(
          "font-bold text-white [grid-area:1/1] transition-all",
          nameClassName,
          phase === "name"
            ? "opacity-100 translate-y-0 duration-700"
            : "opacity-0 translate-y-4 pointer-events-none duration-300",
        )}
      >
        {fullName}
      </span>
    </div>
  );
};

export default GlitchName;
