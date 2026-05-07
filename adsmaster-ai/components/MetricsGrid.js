"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// ── Animated counter ──────────────────────────────────────
function AnimatedNumber({ target, format }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!target || target === 0) { setCurrent(0); return; }
    let start = null;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);

  if (format === "inr")     return `₹${Math.floor(current).toLocaleString("en-IN")}`;
  if (format === "percent") return `${current.toFixed(2)}%`;
  return Math.floor(current).toLocaleString("en-IN");
}

// ── Main Component ────────────────────────────────────────
export default function MetricsGrid() {
  const [metrics, setMetrics]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => { loadMetrics(); }, []);

  async function loadMetrics() {
    try {
      setLoading(true);

      // ✅ Auth session se real user ka data fetch karo
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Not logged in");
        return;
      }

      // ✅ Sirf is user ki campaigns — no Math.random()
      const { data: campaigns, error: dbError } = await supabase
        .from("campaigns")
        .select("clicks, impressions, conversions, spend, budget, status")
        .eq("user_id", session.user.id)
        .neq("status", "deleted");

      if (dbError) throw dbError;

      const active = campaigns || [];

      // ✅ Real numbers sirf DB se
      const totalClicks       = active.reduce((a, c) => a + Number(c.clicks       || 0), 0);
      const totalImpressions  = active.reduce((a, c) => a + Number(c.impressions  || 0), 0);
      const totalConversions  = active.reduce((a, c) => a + Number(c.conversions  || 0), 0);
      const totalCost         = active.reduce((a, c) => a + Number(c.spend        || 0), 0);
      const totalBudget       = active.reduce((a, c) => a + Number(c.budget       || 0), 0);

      const ctr       = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
      const cpc       = totalClicks      > 0 ? totalCost / totalClicks               : 0;
      const dailySpend = totalBudget; // daily budget sum
      const cpa       = totalConversions > 0 ? totalCost / totalConversions          : 0;

      setMetrics([
        { id: "clicks",      label: "Clicks",      value: totalClicks,      format: "number",  icon: "👆", color: "#00D4FF", bg: "rgba(0,212,255,0.08)",    border: "rgba(0,212,255,0.25)"    },
        { id: "impressions", label: "Impressions", value: totalImpressions, format: "number",  icon: "👁️", color: "#A78BFA", bg: "rgba(167,139,250,0.08)",   border: "rgba(167,139,250,0.25)"  },
        { id: "ctr",         label: "CTR",         value: ctr,             format: "percent", icon: "📊", color: "#34D399", bg: "rgba(52,211,153,0.08)",    border: "rgba(52,211,153,0.25)"   },
        { id: "cpc",         label: "CPC",         value: cpc,             format: "inr",     icon: "💰", color: "#F59E0B", bg: "rgba(245,158,11,0.08)",    border: "rgba(245,158,11,0.25)"   },
        { id: "conversions", label: "Conversions", value: totalConversions, format: "number",  icon: "🎯", color: "#F472B6", bg: "rgba(244,114,182,0.08)",   border: "rgba(244,114,182,0.25)"  },
        { id: "cost",        label: "Total Spend", value: totalCost,       format: "inr",     icon: "🏦", color: "#FB923C", bg: "rgba(251,146,60,0.08)",    border: "rgba(251,146,60,0.25)"   },
        { id: "budget",      label: "Daily Budget",value: dailySpend,      format: "inr",     icon: "📈", color: "#38BDF8", bg: "rgba(56,189,248,0.08)",    border: "rgba(56,189,248,0.25)"   },
        { id: "cpa",         label: "CPA",         value: cpa,             format: "inr",     icon: "⚡", color: "#4ADE80", bg: "rgba(74,222,128,0.08)",    border: "rgba(74,222,128,0.25)"   },
      ]);

    } catch (err) {
      console.error("MetricsGrid error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Loading State ─────────────────────────────────────
  if (loading) return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", width: "100%"
    }}>
      {Array(8).fill(0).map((_, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px", padding: "20px 22px", height: "110px",
          animation: "pulse 1.5s ease infinite"
        }} />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );

  // ── Error State ───────────────────────────────────────
  if (error) return (
    <div style={{
      padding: "20px", background: "rgba(248,113,113,0.08)",
      border: "1px solid rgba(248,113,113,0.25)", borderRadius: "16px",
      color: "#F87171", fontSize: "14px"
    }}>
      ⚠️ Metrics load nahi hue: {error}
    </div>
  );

  // ── Main Grid ─────────────────────────────────────────
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", width: "100%"
    }}>
      {metrics.map((m, i) => (
        <div
          key={m.id}
          style={{
            background: m.bg, border: `1px solid ${m.border}`,
            borderRadius: "16px", padding: "20px 22px",
            position: "relative", overflow: "hidden",
            backdropFilter: "blur(12px)",
            animation: `fadeSlideUp 0.5s ease ${i * 0.07}s both`,
            cursor: "default",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = `0 12px 32px ${m.bg}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Glow */}
          <div style={{
            position: "absolute", top: -20, right: -20,
            width: 80, height: 80, background: m.color,
            borderRadius: "50%", opacity: 0.12, filter: "blur(20px)",
          }} />

          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{
                fontSize: 11, color: "#94A3B8", letterSpacing: "0.08em",
                textTransform: "uppercase", fontWeight: 600, marginBottom: 8
              }}>
                {m.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#F1F5F9", letterSpacing: "-0.03em" }}>
                <AnimatedNumber target={m.value} format={m.format} />
              </div>
            </div>

            <div style={{
              width: 40, height: 40, borderRadius: "10px",
              background: `${m.color}18`, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 18, border: `1px solid ${m.color}30`,
            }}>
              {m.icon}
            </div>
          </div>

          {/* No fake change % — real campaigns ke liye abhi N/A */}
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              fontSize: 11, color: "#475569",
              background: "rgba(255,255,255,0.05)",
              padding: "2px 8px", borderRadius: 20,
            }}>
              {m.value === 0 ? "No data yet" : "Live data"}
            </span>
          </div>

          {/* Bottom line */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${m.color}00, ${m.color}, ${m.color}00)`,
            opacity: 0.6,
          }} />
        </div>
      ))}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}