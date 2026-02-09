import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Kof — DJAKPA Koffi Tepe Venougne — Backend · DevOps · Full Stack — Lomé, Togo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1f 100%)",
          fontFamily: "Inter, sans-serif",
          padding: "60px",
        }}
      >
        {/* Accent cercle décoratif */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Pseudo */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: 600,
            color: "#818cf8",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          KOF
        </div>

        {/* Nom complet */}
        <div
          style={{
            display: "flex",
            fontSize: "52px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          DJAKPA Koffi Tepe Venougne
        </div>

        {/* Titre */}
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            fontWeight: 500,
            color: "#a5b4fc",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          Backend · DevOps · Full Stack · React Native
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            "Nest.js",
            "Docker",
            "Coolify",
            "TypeScript",
            "Next.js",
            "React Native",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e0e7ff",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "40px",
            fontSize: "16px",
            color: "#6b7280",
          }}
        >
          <span>Co-fondateur Python Togo & ETH Lomé</span>
          <span>·</span>
          <span>Human AI Ambassador</span>
          <span>·</span>
          <span>Lomé, Togo</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
