"use client";
import { useState, useEffect } from "react";

const suggestions = [
  {
    id: 1,
    type: "keyword",
    icon: "🔑",
    title: "Add High-Intent Keywords",
    campaign: "Lead Gen - Delhi NCR",
    description: "AI found 8 new high-intent keywords with 2.4x better conversion potential",
    impact: "+34% conversions",
    impactColor: "#4ADE80",
    detail: [
      { kw: "plumber near me delhi", vol: "High", cpc: "₹12.4", intent: "High" },
      { kw: "best plumber south delhi", vol: "Med", cpc: "₹9.8", intent: "Very High" },
      { kw: "emergency plumber delhi", vol: "Med", cpc: "₹18.2", intent: "Very High" },
      { kw: "plumber home service delhi", vol: "High", cpc: "₹11.5", intent: "High" },
    ],
    effort: "High Impact",
    effortColor: "#4ADE80",
    confidence: 94,
  },
  {
    id: 2,
    type: "headline",
    icon: "✍️",
    title: "Optimize Ad Headlines",
    campaign: "Website Traffic - Mumbai",
    description: "3 headline variants are underperforming. AI suggests better CTR-optimized copies",
    impact: "+18% CTR",
    impactColor: "#00D4FF",
    detail: [
      { from: "Best Services in Mumbai", to: "Top-Rated Service | Book Today", type: "Replace" },
      { from: "Call Us Now for Help", to: "Free Consultation — Call Now", type: "Replace" },
      { from: "Quality You Can Trust", to: "4.9★ Rated — 2000+ Happy Clients", type: "Replace" },
    ],
    effort: "Quick Win",
    effortColor: "#00D4FF",
    confidence: 88,
  },
  {
    id: 3,
    type: "bid",
    icon: "💰",
    title: "Adjust Bids Intelligently",
    campaign: "High Intent Keywords - Chennai",
    description: "5 keywords are underbidding. Increase bids to capture top positions and more conversions",
    impact: "+22% impressions",
    impactColor: "#A78BFA",
    detail: [
      { kw: "ac service chennai", current: "₹14", suggested: "₹19", change: "+36%" },
      { kw: "ac repair home visit", current: "₹11", suggested: "₹16", change: "+45%" },
      { kw: "split ac repair", current: "₹9", suggested: "₹13", change: "+44%" },
    ],
    effort: "Medium",
    effortColor: "#F59E0B",
    confidence: 91,
  },
  {
    id: 4,
    type: "audience",
    icon: "🎯",
    title: "Refine Target Audience",
    campaign: "Call Campaign - Bangalore",
    description: "Wasting 28% budget on age 18–24. Focus on 30–55 age group for 2.1x better call rate",
    impact: "-28% wasted spend",
    impactColor: "#F472B6",
    detail: [
      { segment: "Age 18–24", action: "Exclude", reason: "0.2% conv. rate — too low" },
      { segment: "Age 30–55", action: "Boost +20%", reason: "3.1% conv. rate — top performer" },
      { segment: "Homeowners", action: "Target", reason: "2.4x higher call intent" },
    ],
    effort: "High Impact",
    effortColor: "#4ADE80",
    confidence: 96,
  },
];

export default function AIOptimizer() {
  const [activeModal, setActiveModal] = useState(null);
  const [approved, setApproved] = useState([]);
  const [scanning, setScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) { clearInterval(interval); setScanning(false); return 100; }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = (id) => {
    setApproved(a => [...a, id]);
    setActiveModal(null);
    const s = suggestions.find(s => s.id === id);
    setToast({ msg: `✅ Applied: ${s.title}`, color: "#4ADE80" });
    setTimeout(() => setToast(null), 3000);
  };

  const pending = suggestions.filter(s => !approved.includes(s.id));

  return (
    <>
      <div style={{
        background: "rgba(15,20,40,0.6)",
        border: "1px solid rgba(167,139,250,0.2)",
        borderRadius: "20px",
        overflow: "hidden",
        backdropFilter: "blur(16px)",
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          background: "linear-gradient(135deg, rgba(167,139,250,0.1), rgba(0,212,255,0.05))",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>🤖</div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#F1F5F9" }}>
                  AI Optimizer
                </h3>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#A78BFA" }}>
                  {scanning ? "Scanning campaigns..." : `${pending.length} optimizations ready`}
                </p>
              </div>
            </div>
            <div style={{
              padding: "4px 12px", borderRadius: 20,
              background: scanning ? "rgba(245,158,11,0.15)" : "rgba(74,222,128,0.15)",
              border: `1px solid ${scanning ? "rgba(245,158,11,0.4)" : "rgba(74,222,128,0.4)"}`,
              fontSize: 11, fontWeight: 700,
              color: scanning ? "#F59E0B" : "#4ADE80",
            }}>
              {scanning ? `⚡ Analyzing ${scanProgress}%` : "✓ Analysis Complete"}
            </div>
          </div>

          {scanning && (
            <div style={{ marginTop: 14 }}>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  width: `${scanProgress}%`,
                  background: "linear-gradient(90deg, #A78BFA, #00D4FF)",
                  transition: "width 0.1s linear",
                }} />
              </div>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 6 }}>
                Analyzing keywords · headlines · bids · audiences...
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div style={{ padding: "16px" }}>
          {!scanning && pending.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
              <div style={{ color: "#4ADE80", fontWeight: 700, fontSize: 15 }}>All optimizations applied!</div>
              <div style={{ color: "#64748B", fontSize: 12, marginTop: 6 }}>Your campaigns are fully optimized.</div>
            </div>
          )}

          {pending.map(s => (
            <SuggestionCard key={s.id} s={s} onAction={() => setActiveModal(s)} />
          ))}

          {approved.length > 0 && (
            <div style={{
              padding: "10px 14px", borderRadius: 10, marginTop: 8,
              background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)",
              fontSize: 12, color: "#4ADE80",
            }}>
              ✅ {approved.length} optimization{approved.length > 1 ? "s" : ""} applied
            </div>
          )}
        </div>
      </div>

      {/* Approval Modal */}
      {activeModal && (
        <ApprovalModal
          s={activeModal}
          onApprove={() => handleApprove(activeModal.id)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {toast && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
          zIndex: 9999,
          background: "rgba(15,20,40,0.95)",
          border: `1px solid ${toast.color}50`,
          borderLeft: `3px solid ${toast.color}`,
          padding: "14px 24px", borderRadius: 12,
          color: toast.color, fontWeight: 700, fontSize: 14,
          backdropFilter: "blur(16px)",
          animation: "toastIn 0.3s ease",
        }}>
          {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
      `}</style>
    </>
  );
}

function SuggestionCard({ s, onAction }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14, padding: "16px",
      marginBottom: 10, transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(167,139,250,0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)"; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", gap: 10, flex: 1 }}>
          <span style={{ fontSize: 22, lineHeight: 1, marginTop: 2 }}>{s.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 13 }}>{s.title}</div>
            <div style={{ fontSize: 11, color: "#64748B", marginTop: 3 }}>{s.campaign}</div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 6, lineHeight: 1.5 }}>{s.description}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
                background: `${s.impactColor}18`, color: s.impactColor,
                border: `1px solid ${s.impactColor}30`,
              }}>{s.impact}</span>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20,
                background: `${s.effortColor}10`, color: s.effortColor,
              }}>{s.effort}</span>
              <span style={{ fontSize: 11, color: "#64748B" }}>
                🎯 {s.confidence}% confidence
              </span>
            </div>
          </div>
        </div>
        <button onClick={onAction} style={{
          padding: "8px 16px", borderRadius: 10,
          background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
          border: "none", color: "#fff",
          fontSize: 12, fontWeight: 700, cursor: "pointer",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          Review →
        </button>
      </div>
    </div>
  );
}

function ApprovalModal({ s, onApprove, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        background: "linear-gradient(160deg, #0F1628, #0A0F1E)",
        border: "1px solid rgba(167,139,250,0.3)",
        borderRadius: 24, padding: 32,
        width: "100%", maxWidth: 560,
        maxHeight: "85vh", overflowY: "auto",
        animation: "modalIn 0.3s ease",
        boxShadow: "0 0 60px rgba(124,58,237,0.2)",
      }}>
        {/* Modal Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#F1F5F9" }}>{s.title}</h2>
              <div style={{ fontSize: 12, color: "#A78BFA", marginTop: 2 }}>{s.campaign}</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.08)", border: "none",
            width: 32, height: 32, borderRadius: 8,
            color: "#94A3B8", cursor: "pointer", fontSize: 16,
          }}>✕</button>
        </div>

        <div style={{
          background: "rgba(167,139,250,0.08)",
          border: "1px solid rgba(167,139,250,0.2)",
          borderRadius: 10, padding: "12px 16px", marginBottom: 20, marginTop: 16,
          fontSize: 13, color: "#C4B5FD", lineHeight: 1.6,
        }}>
          🤖 {s.description}
        </div>

        {/* Detail Section */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Proposed Changes
          </div>
          {s.type === "keyword" && s.detail.map((d, i) => (
            <div key={i} style={detailRowStyle}>
              <span style={{ color: "#E2E8F0", fontWeight: 600, fontSize: 13 }}>{d.kw}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <Badge color="#00D4FF">{d.intent} Intent</Badge>
                <Badge color="#4ADE80">{d.cpc} CPC</Badge>
                <Badge color="#A78BFA">{d.vol} Vol</Badge>
              </div>
            </div>
          ))}
          {s.type === "headline" && s.detail.map((d, i) => (
            <div key={i} style={{ ...detailRowStyle, flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
              <div style={{ fontSize: 11, color: "#F87171", textDecoration: "line-through" }}>✗ {d.from}</div>
              <div style={{ fontSize: 12, color: "#4ADE80", fontWeight: 600 }}>✓ {d.to}</div>
            </div>
          ))}
          {s.type === "bid" && s.detail.map((d, i) => (
            <div key={i} style={detailRowStyle}>
              <span style={{ color: "#E2E8F0", fontSize: 13 }}>{d.kw}</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: "#64748B", fontSize: 12 }}>{d.current}</span>
                <span style={{ color: "#64748B" }}>→</span>
                <span style={{ color: "#4ADE80", fontWeight: 700 }}>{d.suggested}</span>
                <Badge color="#F59E0B">{d.change}</Badge>
              </div>
            </div>
          ))}
          {s.type === "audience" && s.detail.map((d, i) => (
            <div key={i} style={detailRowStyle}>
              <div>
                <div style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600 }}>{d.segment}</div>
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{d.reason}</div>
              </div>
              <Badge color={d.action.includes("Exclude") ? "#F87171" : "#4ADE80"}>{d.action}</Badge>
            </div>
          ))}
        </div>

        {/* Expected Impact */}
        <div style={{
          background: `${s.impactColor}0D`, border: `1px solid ${s.impactColor}30`,
          borderRadius: 12, padding: "14px 16px", marginBottom: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#64748B" }}>Expected Impact</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.impactColor, marginTop: 4 }}>{s.impact}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#64748B" }}>AI Confidence</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#A78BFA", marginTop: 4 }}>{s.confidence}%</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "13px", borderRadius: 10,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#94A3B8", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>Skip for Now</button>
          <button onClick={onApprove} style={{
            flex: 2, padding: "13px", borderRadius: 10,
            background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
            border: "none", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
          }}>
            ✅ Approve & Apply Changes
          </button>
        </div>
      </div>
      <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
    </div>
  );
}

function Badge({ color, children }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
      background: `${color}18`, color: color, border: `1px solid ${color}30`,
    }}>{children}</span>
  );
}

const detailRowStyle = {
  display: "flex", justifyContent: "space-between", alignItems: "center",
  padding: "10px 14px", borderRadius: 10, marginBottom: 6,
  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
  gap: 12, flexWrap: "wrap",
};



