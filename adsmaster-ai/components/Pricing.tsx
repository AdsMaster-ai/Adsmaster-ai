"use client";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "Forever",
    description: "Start exploring AI ads",
    color: "#9ca3af",
    button: "Start Free",
    badge: "",
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
    description: "Perfect for small businesses",
    color: "#00e5a0",
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
    description: "For growing advertisers",
    color: "#38bdf8",
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
    description: "For teams & agencies",
    color: "#f59e0b",
    button: "Get Enterprise",
    badge: "",
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
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#111827 0%,#050816 45%,#020617 100%)",
        padding: "90px 20px",
        fontFamily: "Inter, sans-serif",
        color: "white",
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
            background: "rgba(0,229,160,0.12)",
            border: "1px solid rgba(0,229,160,0.25)",
            color: "#00e5a0",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "2px",
            marginBottom: "24px",
            textTransform: "uppercase",
          }}
        >
          AdsMaster AI Pricing
        </div>

        <h1
          style={{
            fontSize: "clamp(42px,7vw,72px)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: "20px",
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
            maxWidth: "680px",
            margin: "0 auto",
            color: "rgba(255,255,255,0.6)",
            fontSize: "17px",
            lineHeight: 1.7,
          }}
        >
          Powerful AI advertising tools for startups, businesses, and agencies.
          Launch, optimize and scale campaigns faster than ever.
        </p>
      </div>

      {/* Pricing Grid */}
      <div
        style={{
          maxWidth: "1350px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "28px",
          alignItems: "stretch",
        }}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              borderRadius: "28px",
              padding: "1px",
              background: `linear-gradient(135deg, ${plan.color}55, transparent)`,
              boxShadow: `0 15px 50px ${plan.color}20`,
              transition: "0.35s ease",
            }}
          >
            {/* Badge */}
            {plan.badge && (
              <div
                style={{
                  position: "absolute",
                  top: "-13px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background:
                    "linear-gradient(135deg,#00e5a0,#38bdf8)",
                  color: "#02120f",
                  padding: "7px 18px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  zIndex: 10,
                }}
              >
                {plan.badge}
              </div>
            )}

            {/* Card */}
            <div
              style={{
                background: "rgba(10,15,25,0.96)",
                backdropFilter: "blur(14px)",
                borderRadius: "28px",
                padding: "38px 30px",
                border: `1px solid ${plan.color}30`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Plan Name */}
              <div
                style={{
                  color: plan.color,
                  fontWeight: 800,
                  fontSize: "13px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                {plan.name}
              </div>

              {/* Price */}
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: 900,
                  lineHeight: 1,
                  marginBottom: "10px",
                }}
              >
                {plan.price}
              </div>

              <div
                style={{
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "14px",
                  fontSize: "14px",
                }}
              >
                {plan.period}
              </div>

              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  marginBottom: "28px",
                }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.08)",
                  marginBottom: "26px",
                }}
              />

              {/* Features */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  flexGrow: 1,
                }}
              >
                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "rgba(255,255,255,0.88)",
                      fontSize: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: `${plan.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: plan.color,
                        fontWeight: 800,
                        fontSize: "12px",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </div>

                    {feature}
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                style={{
                  marginTop: "34px",
                  width: "100%",
                  padding: "16px",
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
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: "65px",
          color: "rgba(255,255,255,0.35)",
          fontSize: "14px",
        }}
      >
        All plans include GST • Cancel anytime • No hidden charges
      </div>
    </div>
  );
}