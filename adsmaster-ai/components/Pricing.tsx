"use client";

import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "Forever",
    tagline: "Start exploring AI ads",
    color: "#9ca3af",
    gradient: "linear-gradient(135deg,#111827 0%,#1f2937 100%)",
    border: "rgba(156,163,175,0.25)",
    glow: "rgba(156,163,175,0.15)",
    button: "Start Free",
    features: [
      "1 Active Campaign",
      "5 Keywords per Campaign",
      "Basic Ad Generator",
      "7-Day Analytics",
      "Community Support",
    ],
  },

  {
    name: "Starter",
    price: "₹999/mo",
    period: "Monthly",
    tagline: "Perfect for small businesses",
    color: "#00e5a0",
    gradient: "linear-gradient(135deg,#052e2b 0%,#071b25 100%)",
    border: "rgba(0,229,160,0.25)",
    glow: "rgba(0,229,160,0.18)",
    button: "Get Starter",
    badge: "Popular",
    features: [
      "5 Active Campaigns",
      "50 Keywords per Campaign",
      "AI Headline Generator",
      "AI Description Writer",
      "30-Day Analytics",
      "Email Support",
    ],
  },

  {
    name: "Professional",
    price: "₹2,499/mo",
    period: "Monthly",
    tagline: "For growing advertisers",
    color: "#38bdf8",
    gradient: "linear-gradient(135deg,#0c1b2a 0%,#07111c 100%)",
    border: "rgba(56,189,248,0.25)",
    glow: "rgba(56,189,248,0.18)",
    button: "Get Professional",
    badge: "Best Value",
    features: [
      "20 Active Campaigns",
      "Unlimited Keywords",
      "Unlimited AI Headlines",
      "Unlimited AI Descriptions",
      "AI Budget Optimizer",
      "Priority Support",
    ],
  },

  {
    name: "Enterprise",
    price: "₹4,999/mo",
    period: "Monthly",
    tagline: "For teams & agencies",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg,#2a1805 0%,#1c1207 100%)",
    border: "rgba(245,158,11,0.25)",
    glow: "rgba(245,158,11,0.18)",
    button: "Get Enterprise",
    features: [
      "Unlimited Campaigns",
      "Unlimited AI Ads",
      "Team Access",
      "Advanced Analytics",
      "Dedicated Support",
      "Enterprise Integrations",
    ],
  },
];

export default function PricingPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        padding: "80px 20px",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "70px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(0,229,160,0.1)",
              border: "1px solid rgba(0,229,160,0.25)",
              color: "#00e5a0",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "25px",
            }}
          >
            AdsMaster AI Pricing
          </div>

          <h1
            style={{
              fontSize: "clamp(38px,6vw,72px)",
              fontWeight: 900,
              marginBottom: "20px",
              lineHeight: 1.05,
            }}
          >
            Scale Your Ads With{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#00e5a0 0%,#38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Power
            </span>
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "rgba(255,255,255,0.55)",
              fontSize: "17px",
              lineHeight: 1.7,
            }}
          >
            Start free and scale to enterprise-grade AI ad automation with
            powerful campaign management tools.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))",
            gap: "24px",
          }}
        >
          {plans.map((plan, index) => {
            const active = hovered === index;

            return (
              <div
                key={plan.name}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  borderRadius: "28px",
                  padding: "1px",
                  background: active
                    ? `linear-gradient(135deg, ${plan.color}, transparent)`
                    : `linear-gradient(135deg, ${plan.border}, transparent)`,
                  transition: "0.35s ease",
                  transform: active ? "translateY(-10px)" : "translateY(0px)",
                  boxShadow: active
                    ? `0 20px 70px ${plan.glow}`
                    : "0 10px 40px rgba(0,0,0,0.35)",
                }}
              >
                {plan.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-13px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background:
                        `linear-gradient(135deg,#00e5a0,#38bdf8)`,
                      color: "#04120f",
                      padding: "7px 18px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "1px",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div
                  style={{
                    background: plan.gradient,
                    borderRadius: "28px",
                    padding: "36px 28px",
                    height: "100%",
                    border: `1px solid ${plan.border}`,
                  }}
                >
                  <div
                    style={{
                      color: plan.color,
                      fontSize: "13px",
                      fontWeight: 800,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "15px",
                    }}
                  >
                    {plan.name}
                  </div>

                  <div
                    style={{
                      fontSize: "54px",
                      fontWeight: 900,
                      marginBottom: "8px",
                    }}
                  >
                    {plan.price}
                  </div>

                  <div
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: "12px",
                    }}
                  >
                    {plan.period}
                  </div>

                  <p
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "14px",
                      marginBottom: "28px",
                      lineHeight: 1.6,
                    }}
                  >
                    {plan.tagline}
                  </p>

                  <div
                    style={{
                      height: "1px",
                      background: "rgba(255,255,255,0.08)",
                      marginBottom: "24px",
                    }}
                  />

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "10px 0",
                          color: "rgba(255,255,255,0.82)",
                          fontSize: "14px",
                          borderBottom:
                            i !== plan.features.length - 1
                              ? "1px solid rgba(255,255,255,0.05)"
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: `${plan.color}20`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: plan.color,
                            fontSize: "12px",
                            fontWeight: 900,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>

                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    style={{
                      width: "100%",
                      marginTop: "32px",
                      padding: "15px",
                      borderRadius: "14px",
                      border: "none",
                      background: `linear-gradient(135deg, ${plan.color}, ${plan.color}99)`,
                      color: "#04120f",
                      fontWeight: 800,
                      fontSize: "15px",
                      cursor: "pointer",
                      transition: "0.25s ease",
                    }}
                  >
                    {plan.button}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
            color: "rgba(255,255,255,0.35)",
            fontSize: "14px",
          }}
        >
          All plans include GST • Cancel anytime • No hidden charges
        </div>
      </div>
    </div>
  );
}