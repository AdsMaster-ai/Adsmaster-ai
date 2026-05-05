"use client";
import { useState } from "react";
import Link from "next/link";

const footerLinks = {
  Company: [
       { label: "About", href: "/legal/about" },
      { label: "FAQs", href: "/legal/faqs" },
       { label: "Contact US", href: "/legal/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms & Conditions", href: "/legal/terms" },
    { label: "Refund Policy", href: "/legal/refund" },
    { label: "Google API Disclosure", href: "/legal/google" },

  ]
};

const socials = [
  { label: "Twitter / X", href: "#", icon: "𝕏" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Instagram", href: "#", icon: "IG" },
];

function FooterLink({ children, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: hov ? "#c7d2fe" : "#64748b",
        fontSize: 14,
        textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        lineHeight: 1,
        padding: "7px 0",
        transition: "color 0.2s, transform 0.2s",
        transform: hov ? "translateX(4px)" : "translateX(0)",
        letterSpacing: "0.01em",
      }}
    >
      <span style={{
        display: "inline-block",
        width: 4, height: 4,
        borderRadius: "50%",
        background: hov ? "#818cf8" : "#1e293b",
        transition: "background 0.2s",
        flexShrink: 0,
      }} />
      {children}
    </Link>
  );
}

function SocialBtn({ icon, label, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      title={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 38, height: 38,
        borderRadius: 10,
        border: hov ? "1px solid rgba(129,140,248,.5)" : "1px solid rgba(255,255,255,.08)",
        background: hov ? "rgba(99,102,241,.15)" : "rgba(255,255,255,.03)",
        color: hov ? "#c7d2fe" : "#475569",
        fontSize: 13, fontWeight: 700,
        textDecoration: "none",
        transition: "all 0.2s",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        fontFamily: "serif",
        cursor: "pointer",
      }}
    >{icon}</a>
  );
}

export default function Footer() {
  return (
    <footer style={{
      position: "relative",
      background: "#050810",
      borderTop: "1px solid rgba(99,102,241,.15)",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 600, height: 1,
        background: "linear-gradient(90deg,transparent,rgba(129,140,248,.6),transparent)",
        pointerEvents: "none",
      }} />

      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(99,102,241,.04) 1px,transparent 1px)," +
          "linear-gradient(90deg,rgba(99,102,241,.04) 1px,transparent 1px)",
        backgroundSize: "52px 52px",
      }} />

      {/* Bottom-left glow blob */}
      <div style={{
        position: "absolute", bottom: -80, left: -60,
        width: 380, height: 280,
        background: "radial-gradient(ellipse,rgba(99,102,241,.13) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Bottom-right glow blob */}
      <div style={{
        position: "absolute", bottom: -60, right: -40,
        width: 320, height: 240,
        background: "radial-gradient(ellipse,rgba(168,85,247,.1) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{
        position: "relative",
        maxWidth: 1120,
        margin: "0 auto",
        padding: "72px 32px 0",
        display: "grid",
        gridTemplateColumns: "2.2fr 1fr 1fr",
        gap: "48px 60px",
      }}>

        {/* ── BRAND COL ── */}
        <div>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "linear-gradient(135deg,#6366f1,#a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20,
              boxShadow: "0 0 20px rgba(99,102,241,.4)",
            }}>🚀</div>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 22, fontWeight: 800,
              background: "linear-gradient(90deg,#818cf8,#c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-.01em",
            }}>AdsMaster AI</span>
          </div>

          <p style={{
            color: "#475569", fontSize: 14, lineHeight: 1.75,
            maxWidth: 310, margin: "0 0 28px",
          }}>
            AI-powered ads creation, launch & optimization platform built for modern marketers who move fast.
          </p>

          {/* Glow divider */}
          <div style={{
            height: 1, width: 100,
            background: "linear-gradient(90deg,#6366f1,#a855f7,transparent)",
            borderRadius: 10,
            marginBottom: 28,
          }} />

          {/* Socials */}
          <div style={{ display: "flex", gap: 10 }}>
            {socials.map((s) => (
              <SocialBtn key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* ── LINK COLS ── */}
        {Object.entries(footerLinks).map(([title, items]) => (
          <div key={title}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 20,
            }}>
              <span style={{
                display: "inline-block", width: 3, height: 14,
                background: "linear-gradient(180deg,#6366f1,#a855f7)",
                borderRadius: 4,
              }} />
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 13, fontWeight: 700,
                color: "#e2e8f0",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>{title}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item, i) => (
  <FooterLink key={i} href={item.href}>
    {item.label}
  </FooterLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        position: "relative",
        maxWidth: 1120, margin: "48px auto 0",
        padding: "20px 32px 28px",
        borderTop: "1px solid rgba(255,255,255,.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <p style={{ color: "#1e293b", fontSize: 13, margin: 0 }}>
          <span style={{ color: "#334155" }}>© 2026</span>
          {" "}
          <span style={{
            background: "linear-gradient(90deg,#6366f1,#a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 600,
          }}>AdsMaster AI</span>
          {" "}
          <span style={{ color: "#1e293b" }}>— All rights reserved. Built for Growth 🚀</span>
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 8px #22c55e",
            animation: "pulse 2s infinite",
          }} />
          <span style={{ color: "#334155", fontSize: 12 }}>All systems operational</span>
        </div>
      </div>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.5;transform:scale(1.3)}
        }
      `}</style>
    </footer>
  );
}