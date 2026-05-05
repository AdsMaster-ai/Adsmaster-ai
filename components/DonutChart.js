"use client";
import { useState, useEffect } from "react";
import { getCampaigns } from "../lib/supabase";

function DonutSVG({ data, size = 180, animated }) {
  const radius = 68;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!animated) return;

    let raf;
    let start = null;
    const duration = 1000;

    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  let offset = 0;

  const segments = data.map((d) => {
    const dashArray = ((d.pct / 100) * circumference) * progress;

    const seg = {
      ...d,
      dashArray: `${dashArray} ${circumference - dashArray}`,
      dashOffset: -(offset / 100) * circumference * progress,
    };

    offset += d.pct;
    return seg;
  });

  const total = data.reduce((a, d) => a + d.value, 0);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={20} />

      {segments.map((s, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={s.color}
          strokeWidth={20}
          strokeDasharray={s.dashArray}
          strokeDashoffset={s.dashOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 6px ${s.color}60)` }}
        />
      ))}

      <circle cx={cx} cy={cy} r={50} fill="rgba(10,15,30,0.95)" />
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#F1F5F9" fontSize="11" fontWeight="700">
        TOTAL
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#F1F5F9" fontSize="13" fontWeight="800">
        ₹{(total / 100000).toFixed(2)}L
      </text>
    </svg>
  );
}

export default function DonutChart() {
  const [tab, setTab] = useState("spend");
  const [hoveredBar, setHoveredBar] = useState(null);
  const [animated, setAnimated] = useState(false);
  const [data, setData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 200);
    loadDonutData();
  }, []);

  async function loadDonutData() {
    try {
      const campaigns = await getCampaigns();
      const active = campaigns.filter((c) => c.status !== "deleted");

      let search = 0;
      let callOnly = 0;
      let display = 0;
      let leadGen = 0;

      active.forEach((c) => {
        const budget = Number(c.budget || c.daily_budget || 0);

        if (c.goal === "calls" || c.campaign_goal === "calls") callOnly += budget;
        else if (c.goal === "leads" || c.campaign_goal === "leads") leadGen += budget;
        else if (c.business_type === "display") display += budget;
        else search += budget;
      });

      const total = search + callOnly + display + leadGen || 1;

      setData([
        { label: "Search Ads", value: search, color: "#00D4FF", pct: Math.round((search / total) * 100) },
        { label: "Call-Only", value: callOnly, color: "#4ADE80", pct: Math.round((callOnly / total) * 100) },
        { label: "Display", value: display, color: "#A78BFA", pct: Math.round((display / total) * 100) },
        { label: "Lead Gen", value: leadGen, color: "#F59E0B", pct: Math.round((leadGen / total) * 100) },
      ]);

      const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({
        day: d,
        spend: Math.floor((total / 7) * (0.7 + Math.random() * 0.6)),
        clicks: Math.floor((total / 10) * (0.7 + Math.random() * 0.6)),
      }));

      setWeeklyData(week);
    } catch (err) {
      console.log(err);
    }
  }

  const maxSpend = weeklyData.length ? Math.max(...weeklyData.map((d) => d.spend)) : 1;
  const maxClicks = weeklyData.length ? Math.max(...weeklyData.map((d) => d.clicks)) : 1;

  return (
    <div style={{
      background: "rgba(15,20,40,0.6)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "24px",
      backdropFilter: "blur(16px)",
    }}>
      <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#F1F5F9" }}>
        Spend Distribution
      </h3>

      <p style={{ margin: "0 0 20px", fontSize: 12, color: "#64748B" }}>
        Budget allocation by campaign type
      </p>

      <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 24 }}>
        <DonutSVG data={data} animated={animated} />

        <div style={{ flex: 1 }}>
          {data.map((d, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 10px",
              borderRadius: 10,
              marginBottom: 6,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: d.color,
                  boxShadow: `0 0 6px ${d.color}60`,
                }} />
                <span style={{ fontSize: 12, color: "#CBD5E1", fontWeight: 500 }}>{d.label}</span>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: d.color }}>
                  ₹{(d.value / 1000).toFixed(1)}K
                </div>
                <div style={{ fontSize: 10, color: "#64748B" }}>{d.pct}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8" }}>This Week</span>

          <div style={{ display: "flex", gap: 6 }}>
            {["spend", "clicks"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: tab === t ? "1px solid rgba(0,212,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  background: tab === t ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.04)",
                  color: tab === t ? "#00D4FF" : "#64748B",
                }}
              >
                {t === "spend" ? "Spend" : "Clicks"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80 }}>
          {weeklyData.map((d, i) => {
            const val = tab === "spend" ? d.spend : d.clicks;
            const max = tab === "spend" ? maxSpend : maxClicks;
            const pct = (val / max) * 100;
            const isHovered = hoveredBar === i;

            return (
              <div
                key={i}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {isHovered && (
                  <div style={{
                    position: "absolute",
                    background: "rgba(15,20,40,0.95)",
                    border: "1px solid rgba(0,212,255,0.3)",
                    borderRadius: 6,
                    padding: "4px 8px",
                    fontSize: 10,
                    color: "#00D4FF",
                    fontWeight: 700,
                    transform: "translateY(-24px)",
                  }}>
                    {tab === "spend" ? `₹${(val / 1000).toFixed(1)}K` : val.toLocaleString()}
                  </div>
                )}

                <div style={{
                  width: "100%",
                  height: `${pct}%`,
                  minHeight: 4,
                  borderRadius: "4px 4px 0 0",
                  background: isHovered
                    ? "linear-gradient(180deg, #00D4FF, #0099CC)"
                    : "linear-gradient(180deg, rgba(0,212,255,0.6), rgba(0,212,255,0.2))",
                }} />

                <span style={{ fontSize: 9, color: "#64748B", fontWeight: 600 }}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}