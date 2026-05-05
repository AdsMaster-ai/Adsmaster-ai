"use client";

import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    tagline: "Start exploring AI ads",
    color: "#a0a0a0",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    border: "rgba(160,160,160,0.25)",
    glow: "rgba(160,160,160,0.08)",
    cta: "Start Free",
    ctaVariant: "outline",
    badge: null,
    features: [
      { text: "1 Active Campaign", included: true },
      { text: "5 Keywords per Campaign", included: true },
      { text: "Basic Ad Copy Editor", included: true },
         { text: "Basic 7-Day Analytics", included: true },
      { text: "Location Targeting", included: true },
      { text: "Community Support", included: true },
      { text: "AI Headline Generator", included: false },
      { text: "AI Description Writer", included: false },
      { text: "A/B Ad Testing", included: false },
      { text: "AI Budget Optimizer", included: false },
      { text: "Competitor Intelligence", included: false },
    ],
  },
  {
    name: "Starter",
    price: "₹999",
    period: "per month",
    tagline: "For growing businesses",
    color: "#00e5a0",
    gradient: "linear-gradient(135deg, #0d2b1f 0%, #0a1f2e 100%)",
    border: "rgba(0,229,160,0.35)",
    glow: "rgba(0,229,160,0.15)",
    cta: "Get Starter",
    ctaVariant: "teal",
    badge: "Most Popular",
    features: [
      { text: "5 Active Campaigns", included: true },
      { text: "50 Keywords per Campaign", included: true },
      { text: "AI Headline Generator (15/mo)", included: true },
      { text: "AI Description Writer (15/mo)", included: true },
      { text: "Smart Keyword Suggestions", included: true },
      { text: "Ad Scheduling & Device Targeting", included: true },
      { text: "30-Day Analytics Dashboard", included: true },
      { text: "Email Support (48hr)", included: true },
      { text: "Location + Age Targeting", included: true },
      { text: "AI Budget Optimizer", included: false },
     
    ],
  },
  {
    name: "Growth",
    price: "₹1,999",
    period: "per month",
    tagline: "For serious advertisers",
    color: "#f5a623",
    gradient: "linear-gradient(135deg, #2b1a00 0%, #1a1000 100%)",
    border: "rgba(245,166,35,0.35)",
    glow: "rgba(245,166,35,0.12)",
    cta: "Get Growth",
    ctaVariant: "gold",
    badge: "Best Value",
    features: [
      { text: "20 Active Campaigns", included: true },
      { text: "Unlimited Keywords", included: true },
      { text: "AI Headline Generator (Unlimited)", included: true },
      { text: "AI Description Writer (Unlimited)", included: true },
      { text: "AI Negative Keyword Optimizer", included: true },
      { text: "Full Audience Targeting Suite", included: true },
      { text: "Call & WhatsApp Integration", included: true },
      { text: "AI Budget Optimizer", included: true },
      { text: "Priority Email Support (24hr)", included: true },
    ],
  },
];

function getCtaStyles(variant: string) {
  switch (variant) {
    case "teal":
      return {
        background: "linear-gradient(135deg, #00e5a0, #00b8d4)",
        border: "none",
        color: "#001a10",
        fontWeight: 800,
      };
    case "gold":
      return {
        background: "linear-gradient(135deg, #f5a623, #f7491e)",
        border: "none",
        color: "#1a0a00",
        fontWeight: 800,
      };
    default:
      return {
        background: "transparent",
        border: "1.5px solid rgba(160,160,160,0.4)",
        color: "#a0a0a0",
        fontWeight: 700,
      };
  }
}

export default function PricingPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07090f",
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        padding: "72px 20px 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs */}
      <div style={{
        position: "fixed", top: "-300px", left: "-200px", width: "700px", height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,160,0.05) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "-300px", right: "-200px", width: "800px", height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(0,229,160,0.08)",
            border: "1px solid rgba(0,229,160,0.2)",
            borderRadius: "100px", padding: "6px 20px", marginBottom: "28px",
          }}>
            <span style={{ fontSize: "11px", color: "#00e5a0", letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase" }}>
              ⚡ AdsMaster AI Pricing
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(34px, 6vw, 62px)", fontWeight: 900, color: "#ffffff",
            margin: "0 0 18px", lineHeight: 1.05, letterSpacing: "-2px",
          }}>
            Scale Your AdsMaster Ads{" "}
            <span style={{
              background: "linear-gradient(135deg, #00e5a0 0%, #00b8d4 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              with AI
            </span>
          </h1>

          <p style={{
            fontSize: "17px", color: "rgba(255,255,255,0.4)", maxWidth: "460px",
            margin: "0 auto", lineHeight: 1.65,
          }}>
            From your first campaign to unlimited scale. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "20px",
          maxWidth: "1050px",
          margin: "0 auto",
        }}>
          {plans.map((plan, i) => {
            const isHovered = hovered === i;
            const isFeatured = i === 1;
            const ctaStyles = getCtaStyles(plan.ctaVariant);

            return (
              <div
                key={plan.name}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  padding: "1.5px",
                  background: isHovered || isFeatured
                    ? `linear-gradient(135deg, ${plan.color}88, ${plan.color}11)`
                    : `linear-gradient(135deg, ${plan.border}, transparent)`,
                  boxShadow: isHovered
                    ? `0 0 70px ${plan.glow}, 0 24px 80px rgba(0,0,0,0.6)`
                    : isFeatured
                    ? `0 0 40px ${plan.glow}, 0 16px 50px rgba(0,0,0,0.4)`
                    : "0 4px 24px rgba(0,0,0,0.3)",
                  transform: isHovered ? "translateY(-10px) scale(1.01)" : isFeatured ? "translateY(-4px)" : "none",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: "-14px", left: "50%",
                    transform: "translateX(-50%)",
                    background: plan.ctaVariant === "teal"
                      ? "linear-gradient(135deg, #00e5a0, #00b8d4)"
                      : "linear-gradient(135deg, #f5a623, #f7491e)",
                    color: "#000", fontSize: "10px", fontWeight: 800,
                    letterSpacing: "2px", textTransform: "uppercase",
                    padding: "5px 18px", borderRadius: "100px",
                    whiteSpace: "nowrap", zIndex: 10,
                  }}>
                    {plan.badge}
                  </div>
                )}

                <div style={{
                  background: plan.gradient,
                  borderRadius: "22px",
                  border: `1px solid ${plan.border}`,
                  padding: "36px 28px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Top glow line */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: `linear-gradient(90deg, transparent 0%, ${plan.color} 50%, transparent 100%)`,
                    opacity: isFeatured || isHovered ? 0.8 : 0.3,
                    transition: "opacity 0.3s ease",
                  }} />

                  {/* Plan label */}
                  <div style={{
                    fontSize: "11px", fontWeight: 800, color: plan.color,
                    letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px",
                  }}>
                    {plan.name}
                  </div>

                  {/* Price */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
                    <span style={{
                      fontSize: "clamp(40px, 7vw, 54px)", fontWeight: 900,
                      color: "#fff", lineHeight: 1, letterSpacing: "-2px",
                    }}>
                      {plan.price}
                    </span>
                  </div>

                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "8px", letterSpacing: "0.5px" }}>
                    {plan.period}
                  </div>

                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "28px" }}>
                    {plan.tagline}
                  </div>

                  {/* Divider */}
                  <div style={{
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${plan.border}, transparent)`,
                    marginBottom: "22px",
                  }} />

                  {/* Features */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px" }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "6px 0",
                        fontSize: "13.5px",
                        color: f.included ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.2)",
                        borderBottom: fi < plan.features.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      }}>
                        <span style={{
                          width: "18px", height: "18px", borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                          background: f.included ? `${plan.color}1a` : "rgba(255,255,255,0.04)",
                          fontSize: "9px", fontWeight: 900,
                          color: f.included ? plan.color : "rgba(255,255,255,0.18)",
                        }}>
                          {f.included ? "✓" : "✕"}
                        </span>
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                    transition: "all 0.2s ease",
                    ...ctaStyles,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "scale(1.03)";
                    el.style.opacity = "0.88";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "scale(1)";
                    el.style.opacity = "1";
                  }}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "13px", margin: 0 }}>
            All plans include GST · Cancel anytime · No hidden charges
          </p>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px", marginTop: "8px" }}>
            Need a custom enterprise plan?{" "}
            <span style={{ color: "#00e5a0", cursor: "pointer", textDecoration: "underline" }}>
              Contact us
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}