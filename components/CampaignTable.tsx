"use client";
import { useState } from "react";
import { supabase, updateCampaignStatus } from "../lib/supabase";

const STATUS_CFG: Record<string, any> = {
  live:    { label: "Live",    dot: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)"   },
  active:  { label: "Active",  dot: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)"   },
  paused:  { label: "Paused",  dot: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.25)"  },
  ended:   { label: "Ended",   dot: "#ef4444", bg: "rgba(239,68,68,0.10)",   border: "rgba(239,68,68,0.2)"    },
  deleted: { label: "Deleted", dot: "#6b7280", bg: "rgba(107,114,128,0.10)", border: "rgba(107,114,128,0.2)"  },
  draft:   { label: "Draft",   dot: "#94a3b8", bg: "rgba(148,163,184,0.10)", border: "rgba(148,163,184,0.2)"  },
};

const GOAL_ICON: Record<string, string> = {
  leads: "📋", calls: "📞", messages: "💬", traffic: "🌐", sales: "💰",
};

export default function CampaignTable({ campaigns = [], onRefresh }: { campaigns: any[]; onRefresh?: () => void }) {
  const [filter, setFilter]     = useState("all");
  const [sortCol, setSortCol]   = useState("created_at");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("desc");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deleteId, setDeleteId]   = useState<string | null>(null);
  const [expanded, setExpanded]   = useState<string | null>(null);

  // Filter + Sort
  const filtered = campaigns
    .filter(c => {
      if (filter === "all")    return c.status !== "deleted";
      if (filter === "active") return ["live","active"].includes(c.status);
      return c.status === filter;
    })
    .sort((a, b) => {
      const av = a[sortCol] ?? 0;
      const bv = b[sortCol] ?? 0;
      return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("desc"); }
  };

  const toggleStatus = async (c: any) => {
    setLoadingId(c.id);
    try {
      const newStatus = ["live","active"].includes(c.status) ? "paused" : "live";
      await updateCampaignStatus(c.id, newStatus);
      onRefresh?.();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setLoadingId(deleteId);
    setDeleteId(null);
    try {
      await updateCampaignStatus(deleteId, "deleted");
      onRefresh?.();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const counts = {
    all:    campaigns.filter(c => c.status !== "deleted").length,
    active: campaigns.filter(c => ["live","active"].includes(c.status)).length,
    paused: campaigns.filter(c => c.status === "paused").length,
    ended:  campaigns.filter(c => c.status === "ended").length,
  };

  const SortIcon = ({ col }: { col: string }) => (
    <span style={{ fontSize: "9px", marginLeft: "4px", color: sortCol === col ? "#22d3ee" : "#374151" }}>
      {sortCol === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  return (
    <div style={{ width: "100%", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9" }}>Campaign List</h2>
          <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: "#475569" }}>
            {counts.active} active · {counts.all} total
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {[
            { key: "all",    label: "All",    n: counts.all    },
            { key: "active", label: "Active", n: counts.active },
            { key: "paused", label: "Paused", n: counts.paused },
            { key: "ended",  label: "Ended",  n: counts.ended  },
          ].map(({ key, label, n }) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              padding: "6px 14px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "600",
              cursor: "pointer", fontFamily: "inherit",
              border: filter === key ? "1px solid rgba(34,211,238,0.4)" : "1px solid rgba(255,255,255,0.07)",
              background: filter === key ? "rgba(34,211,238,0.1)" : "rgba(255,255,255,0.03)",
              color: filter === key ? "#22d3ee" : "#64748b", transition: "all 0.2s ease",
            }}>
              {label} <span style={{ opacity: 0.5, fontSize: "0.7rem" }}>({n})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { label: "Campaign",    col: "campaign_name" },
                { label: "Status",      col: "status"        },
                { label: "Goal",        col: "goal"          },
                { label: "Budget",      col: "budget"        },
                { label: "Spend",       col: "spend"         },
                { label: "Clicks",      col: "clicks"        },
                { label: "CTR",         col: null            },
                { label: "Impressions", col: "impressions"   },
                { label: "Actions",     col: null            },
              ].map(({ label, col }) => (
                <th key={label} onClick={() => col && handleSort(col)} style={{
                  padding: "12px 16px", textAlign: "left", whiteSpace: "nowrap",
                  fontSize: "0.65rem", fontWeight: "700", color: "#64748b",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  cursor: col ? "pointer" : "default", userSelect: "none",
                }}>
                  {label}{col && <SortIcon col={col} />}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: "3rem", textAlign: "center", color: "#374151", fontSize: "0.88rem" }}>
                  No campaigns found
                </td>
              </tr>
            ) : filtered.map((c, i) => {
              const st       = STATUS_CFG[c.status] || STATUS_CFG.draft;
              const isActive = ["live","active"].includes(c.status);
              const ctr      = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : "0.00";
              const spendPct = c.budget > 0 ? Math.min(Math.round((c.spend / c.budget) * 100), 100) : 0;
              const loading  = loadingId === c.id;
              const isOpen   = expanded === c.id;

              return (
                <>
                  <tr key={c.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                      transition: "background 0.15s ease", cursor: "pointer",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(34,211,238,0.03)")}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent")}
                  >
                    {/* Campaign Name */}
                    <td style={{ padding: "14px 16px", minWidth: "180px" }} onClick={() => setExpanded(isOpen ? null : c.id)}>
                      <div style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "0.88rem", marginBottom: "3px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "0.7rem", color: "#22d3ee" }}>{isOpen ? "▼" : "▶️"}</span>
                        {c.campaign_name || "Unnamed Campaign"}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#475569" }}>
                        {c.target_city || "All India"} · {c.business_type || "—"}
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: "700", background: st.bg, color: st.dot, border: `1px solid ${st.border}`, display: "inline-flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: st.dot, display: "inline-block" }} />
                        {st.label}
                      </span>
                    </td>

                    {/* Goal */}
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "0.82rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                        {GOAL_ICON[c.goal] || "🎯"} {c.goal || "—"}
                      </span>
                    </td>

                    {/* Budget */}
                    <td style={{ padding: "14px 16px", color: "#e2e8f0", fontSize: "0.85rem", fontWeight: "600", whiteSpace: "nowrap" }}>
                      ₹{Number(c.budget || 0).toLocaleString("en-IN")}
                    </td>

                    {/* Spend + bar */}
                    <td style={{ padding: "14px 16px", minWidth: "130px" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: "600", color: spendPct > 80 ? "#f59e0b" : "#e2e8f0", marginBottom: "5px", whiteSpace: "nowrap" }}>
                        ₹{Number(c.spend || 0).toLocaleString("en-IN")}
                        <span style={{ fontSize: "0.68rem", color: "#475569", fontWeight: "400", marginLeft: "4px" }}>({spendPct}%)</span>
                      </div>
                      <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${spendPct}%`, borderRadius: "99px", background: spendPct > 80 ? "#f59e0b" : "linear-gradient(90deg,#22d3ee,#818cf8)", transition: "width 0.4s ease" }} />
                      </div>
                    </td>

                    {/* Clicks */}
                    <td style={{ padding: "14px 16px", color: "#22d3ee", fontSize: "0.85rem", fontWeight: "600" }}>
                      {Number(c.clicks || 0).toLocaleString("en-IN")}
                    </td>

                    {/* CTR */}
                    <td style={{ padding: "14px 16px", color: "#a78bfa", fontSize: "0.85rem", fontWeight: "600" }}>
                      {ctr}%
                    </td>

                    {/* Impressions */}
                    <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "0.85rem" }}>
                      {Number(c.impressions || 0).toLocaleString("en-IN")}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={e => { e.stopPropagation(); toggleStatus(c); }} disabled={loading}
                          style={{ padding: "6px 12px", borderRadius: "8px", fontSize: "0.73rem", fontWeight: "700", cursor: loading ? "wait" : "pointer", fontFamily: "inherit", border: "none", transition: "all 0.2s ease", whiteSpace: "nowrap", background: isActive ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)", color: isActive ? "#f59e0b" : "#22c55e", opacity: loading ? 0.5 : 1 }}>
                          {loading ? "..." : isActive ? "⏸️ Pause" : "▶️ Resume"}
                        </button>
                        <button onClick={e => { e.stopPropagation(); setDeleteId(c.id); }} disabled={loading}
                          style={{ padding: "6px 10px", borderRadius: "8px", fontSize: "0.73rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", border: "none", background: "rgba(239,68,68,0.12)", color: "#ef4444", opacity: loading ? 0.5 : 1 }}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Detail Row */}
                  {isOpen && (
                    <tr key={`${c.id}-detail`} style={{ background: "rgba(34,211,238,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <td colSpan={9} style={{ padding: "1.25rem 1.5rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: "1rem" }}>
                          {[
                            { label: "Campaign Name",  val: c.campaign_name  || "—"      },
                            { label: "Website URL",    val: c.website_url    || "—"      },
                            { label: "Business Type",  val: c.business_type  || "—"      },
                            { label: "Target City",    val: c.target_city    || "All India" },
                            { label: "Daily Budget",   val: `₹${Number(c.budget||0).toLocaleString("en-IN")}` },
                            { label: "Google Camp. ID",val: c.google_campaign_id || "—"  },
                            { label: "Sync Status",    val: c.google_sync_status || "—"  },
                            { label: "Created",        val: c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN") : "—" },
                          ].map(({ label, val }) => (
                            <div key={label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
                              <div style={{ fontSize: "0.65rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px", fontWeight: "700" }}>{label}</div>
                              <div style={{ fontSize: "0.82rem", color: "#e2e8f0", fontWeight: "600", wordBreak: "break-all" }}>{val}</div>
                            </div>
                          ))}

                          {/* Keywords */}
                          {c.keywords?.length > 0 && (
                            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)", gridColumn: "span 2" }}>
                              <div style={{ fontSize: "0.65rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontWeight: "700" }}>Keywords</div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                {c.keywords.map((kw: string, ki: number) => (
                                  <span key={ki} style={{ padding: "3px 10px", borderRadius: "99px", fontSize: "0.75rem", background: "rgba(34,211,238,0.1)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.2)" }}>{kw}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirm Dialog */}
      {deleteId && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#0d1428", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "20px", padding: "2rem", maxWidth: "380px", width: "90%", boxShadow: "0 24px 64px rgba(0,0,0,0.6)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🗑️</div>
            <h3 style={{ color: "#f1f5f9", margin: "0 0 0.5rem", fontSize: "1.1rem", fontWeight: "700" }}>Delete Campaign?</h3>
            <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0 0 1.5rem", lineHeight: 1.6 }}>This action cannot be undone. Campaign will be permanently deleted.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: "12px", borderRadius: "10px", fontFamily: "inherit", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#94a3b8", cursor: "pointer", fontWeight: "600", fontSize: "0.88rem" }}>Cancel</button>
              <button onClick={confirmDelete} style={{ flex: 1, padding: "12px", borderRadius: "10px", fontFamily: "inherit", border: "none", background: "rgba(239,68,68,0.8)", color: "#fff", cursor: "pointer", fontWeight: "700", fontSize: "0.88rem" }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}