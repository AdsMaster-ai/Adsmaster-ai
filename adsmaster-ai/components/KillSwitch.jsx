"use client";
import { useState } from "react";

export default function KillSwitch() {
  const [status, setStatus] = useState("active"); // active | confirm | stopped | resuming
  const [countdown, setCountdown] = useState(5);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  let holdInterval = null;

  const startHold = () => {
    if (status !== "active") return;
    setIsHolding(true);
    let progress = 0;
    holdInterval = setInterval(() => {
      progress += 2;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(holdInterval);
        setStatus("confirm");
        setIsHolding(false);
        setHoldProgress(0);
      }
    }, 30);
  };

  const stopHold = () => {
    clearInterval(holdInterval);
    setIsHolding(false);
    setHoldProgress(0);
  };

  const confirmKill = () => {
    setStatus("stopped");
  };

  const handleResume = () => {
    setStatus("resuming");
    let c = 5;
    setCountdown(5);
    const timer = setInterval(() => {
      c--;
      setCountdown(c);
      if (c === 0) {
        clearInterval(timer);
        setStatus("active");
        setCountdown(5);
      }
    }, 1000);
  };

  const isActive = status === "active";
  const isStopped = status === "stopped";
  const isConfirm = status === "confirm";
  const isResuming = status === "resuming";

  return (
    <div style={{
      background: isStopped
        ? "rgba(248,113,113,0.06)"
        : "rgba(15,20,40,0.6)",
      border: isStopped
        ? "1px solid rgba(248,113,113,0.3)"
        : "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "24px",
      backdropFilter: "blur(16px)",
      transition: "all 0.4s ease",
    }}>
      {/* Status indicator */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#F1F5F9" }}>
            Kill Switch
          </h3>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748B" }}>
            Emergency stop for all campaigns
          </p>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "5px 12px", borderRadius: 20,
          background: isStopped ? "rgba(248,113,113,0.15)" : "rgba(74,222,128,0.15)",
          border: `1px solid ${isStopped ? "rgba(248,113,113,0.4)" : "rgba(74,222,128,0.4)"}`,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: isStopped ? "#F87171" : "#4ADE80",
            boxShadow: `0 0 6px ${isStopped ? "#F87171" : "#4ADE80"}`,
            animation: isStopped ? "none" : "pulse 1.5s infinite",
            display: "inline-block",
          }} />
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: isStopped ? "#F87171" : "#4ADE80",
          }}>
            {isStopped ? "ALL STOPPED" : isResuming ? "RESUMING..." : "ALL RUNNING"}
          </span>
        </div>
      </div>

      {/* Campaign status pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {["Lead Gen - Delhi", "Traffic - Mumbai", "Calls - Bangalore", "Intent - Chennai", "Brand - All India"].map(name => (
          <div key={name} style={{
            fontSize: 11, padding: "4px 10px", borderRadius: 20,
            background: isStopped ? "rgba(248,113,113,0.08)" : "rgba(74,222,128,0.08)",
            border: `1px solid ${isStopped ? "rgba(248,113,113,0.2)" : "rgba(74,222,128,0.2)"}`,
            color: isStopped ? "#F87171" : "#4ADE80",
            fontWeight: 600,
          }}>
            {isStopped ? "⏸" : "▶"} {name}
          </div>
        ))}
      </div>

      {/* KILL BUTTON */}
      {isActive && (
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 12, color: "#64748B", marginBottom: 12,
            background: "rgba(255,255,255,0.04)", padding: "8px 14px", borderRadius: 8,
          }}>
            🔒 Hold button for 1.5s to activate emergency stop
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              onMouseDown={startHold}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={startHold}
              onTouchEnd={stopHold}
              style={{
                width: 120, height: 120, borderRadius: "50%",
                background: isHolding
                  ? `conic-gradient(#F87171 ${holdProgress * 3.6}deg, rgba(248,113,113,0.15) 0deg)`
                  : "rgba(248,113,113,0.15)",
                border: `2px solid ${isHolding ? "#F87171" : "rgba(248,113,113,0.4)"}`,
                cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 4,
                transition: "border-color 0.2s",
                userSelect: "none",
                boxShadow: isHolding ? "0 0 30px rgba(248,113,113,0.4)" : "0 0 20px rgba(248,113,113,0.1)",
              }}
            >
              <span style={{ fontSize: 32 }}>🛑</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#F87171", letterSpacing: "0.08em" }}>
                {isHolding ? `${Math.floor(holdProgress)}%` : "STOP ALL"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Confirm State */}
      {isConfirm && (
        <div style={{
          background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
          borderRadius: 14, padding: 20, textAlign: "center",
        }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>⚠️</div>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#F87171", marginBottom: 8 }}>
            Stop all 5 active campaigns?
          </div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 20, lineHeight: 1.6 }}>
            This will immediately pause all running campaigns. Your budget will stop spending. You can resume at any time.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStatus("active")} style={{
              flex: 1, padding: "11px", borderRadius: 10,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#94A3B8", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>Cancel</button>
            <button onClick={confirmKill} style={{
              flex: 2, padding: "11px", borderRadius: 10,
              background: "linear-gradient(135deg, #EF4444, #B91C1C)",
              border: "none", color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 4px 20px rgba(239,68,68,0.4)",
            }}>🛑 Confirm — Stop All</button>
          </div>
        </div>
      )}

      {/* Stopped State */}
      {isStopped && (
        <div style={{ textAlign: "center" }}>
          <div style={{
            background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: 12, padding: "16px", marginBottom: 16,
            fontSize: 12, color: "#F87171", lineHeight: 1.6,
          }}>
            🛑 All campaigns stopped at {new Date().toLocaleTimeString("en-IN")}<br />
            <span style={{ color: "#64748B" }}>Estimated daily savings: ₹15,229</span>
          </div>
          <button onClick={handleResume} style={{
            width: "100%", padding: "13px", borderRadius: 12,
            background: "linear-gradient(135deg, #4ADE80, #16A34A)",
            border: "none", color: "#000", fontSize: 14, fontWeight: 800, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(74,222,128,0.3)",
          }}>
            ▶ Resume All Campaigns
          </button>
        </div>
      )}

      {/* Resuming State */}
      {isResuming && (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⚡</div>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#4ADE80", marginBottom: 6 }}>
            Resuming in {countdown}s...
          </div>
          <div style={{ fontSize: 12, color: "#64748B" }}>Re-activating all campaigns</div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #4ADE80; }
          50% { opacity: 0.5; box-shadow: 0 0 12px #4ADE80; }
        }
      `}</style>
    </div>
  );
}


