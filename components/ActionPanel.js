// "use client";
// import { useState } from "react";

// const quickActions = [
//   {
//     id: "new_campaign",
//     icon: "➕",
//     label: "New Campaign",
//     desc: "Create search, call, or lead gen campaign",
//     color: "#00D4FF",
//     bg: "rgba(0,212,255,0.08)",
//   },
//   {
//     id: "bulk_edit",
//     icon: "✏️",
//     label: "Bulk Edit",
//     desc: "Edit budgets & bids for multiple campaigns",
//     color: "#A78BFA",
//     bg: "rgba(167,139,250,0.08)",
//   },
//   {
//     id: "add_keywords",
//     icon: "🔑",
//     label: "Add Keywords",
//     desc: "Add high-intent keywords to active groups",
//     color: "#34D399",
//     bg: "rgba(52,211,153,0.08)",
//   },
//   {
//     id: "pause_low",
//     icon: "⏸",
//     label: "Pause Low Performers",
//     desc: "Auto-pause campaigns below 1% CTR",
//     color: "#F59E0B",
//     bg: "rgba(245,158,11,0.08)",
//   },
//   {
//     id: "increase_budget",
//     icon: "📈",
//     label: "Boost Budget",
//     desc: "Increase budget for top-performing campaigns",
//     color: "#F472B6",
//     bg: "rgba(244,114,182,0.08)",
//   },
//   {
//     id: "export",
//     icon: "📤",
//     label: "Export Report",
//     desc: "Download CSV / PDF performance report",
//     color: "#38BDF8",
//     bg: "rgba(56,189,248,0.08)",
//   },
// ];

// const adTypes = [
//   { icon: "🌐", label: "Website Visits", desc: "Drive traffic to your site", color: "#00D4FF" },
//   { icon: "📋", label: "Lead Generation", desc: "Collect contact info from customers", color: "#A78BFA" },
//   { icon: "📞", label: "Phone Calls", desc: "Get customers to call directly", color: "#4ADE80" },
//   { icon: "💬", label: "Messages", desc: "WhatsApp / SMS inquiries", color: "#F59E0B" },
// ];

// export default function ActionPanel() {
//   const [toast, setToast] = useState(null);
//   const [showNewCampaign, setShowNewCampaign] = useState(false);
//   const [selectedAdType, setSelectedAdType] = useState(null);
//   const [campaignForm, setCampaignForm] = useState({ name: "", budget: "", keywords: "", location: "" });

//   const handleAction = (action) => {
//     if (action.id === "new_campaign") { setShowNewCampaign(true); return; }
//     setToast({ msg: `${action.label} initiated`, color: action.color });
//     setTimeout(() => setToast(null), 2500);
//   };

//   const handleCreateCampaign = () => {
//     if (!campaignForm.name || !campaignForm.budget || !selectedAdType) return;
//     setShowNewCampaign(false);
//     setToast({ msg: `✅ Campaign "${campaignForm.name}" created successfully!`, color: "#4ADE80" });
//     setTimeout(() => setToast(null), 3000);
//     setCampaignForm({ name: "", budget: "", keywords: "", location: "" });
//     setSelectedAdType(null);
//   };

//   return (
//     <>
//       <div style={{
//         background: "rgba(15,20,40,0.6)",
//         border: "1px solid rgba(255,255,255,0.08)",
//         borderRadius: "20px",
//         padding: "24px",
//         backdropFilter: "blur(16px)",
//       }}>
//         <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: "#F1F5F9" }}>
//           Quick Actions
//         </h3>
//         <p style={{ margin: "0 0 20px", fontSize: 12, color: "#64748B" }}>
//           Manage your campaigns instantly
//         </p>

//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//           {quickActions.map(action => (
//             <button
//               key={action.id}
//               onClick={() => handleAction(action)}
//               style={{
//                 background: action.bg,
//                 border: `1px solid ${action.color}25`,
//                 borderRadius: 14,
//                 padding: "14px 16px",
//                 cursor: "pointer",
//                 textAlign: "left",
//                 transition: "all 0.2s ease",
//                 position: "relative",
//                 overflow: "hidden",
//               }}
//               onMouseEnter={e => {
//                 e.currentTarget.style.border = `1px solid ${action.color}60`;
//                 e.currentTarget.style.transform = "translateY(-1px)";
//               }}
//               onMouseLeave={e => {
//                 e.currentTarget.style.border = `1px solid ${action.color}25`;
//                 e.currentTarget.style.transform = "translateY(0)";
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
//                 <span style={{ fontSize: 20, lineHeight: 1 }}>{action.icon}</span>
//                 <div>
//                   <div style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0", marginBottom: 3 }}>
//                     {action.label}
//                   </div>
//                   <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.4 }}>
//                     {action.desc}
//                   </div>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Stats Summary */}
//         <div style={{
//           marginTop: 20,
//           padding: "14px 16px",
//           background: "rgba(0,212,255,0.04)",
//           border: "1px solid rgba(0,212,255,0.12)",
//           borderRadius: 12,
//         }}>
//           <div style={{ fontSize: 11, color: "#64748B", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
//             Today's Summary
//           </div>
//           {[
//             { label: "Budget Remaining", val: "₹14,770", color: "#4ADE80" },
//             { label: "Avg. Quality Score", val: "7.8 / 10", color: "#F59E0B" },
//             { label: "Active Campaigns", val: "5 / 6", color: "#00D4FF" },
//           ].map(s => (
//             <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
//               <span style={{ fontSize: 12, color: "#94A3B8" }}>{s.label}</span>
//               <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.val}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* New Campaign Modal */}
//       {showNewCampaign && (
//         <div style={{
//           position: "fixed", inset: 0, zIndex: 1000,
//           background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           padding: 20,
//         }}>
//           <div style={{
//             background: "linear-gradient(160deg, #0F1628 0%, #0A0F1E 100%)",
//             border: "1px solid rgba(255,255,255,0.1)",
//             borderRadius: 24,
//             padding: 32,
//             width: "100%", maxWidth: 540,
//             maxHeight: "90vh", overflowY: "auto",
//             animation: "modalIn 0.3s ease",
//           }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
//               <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#F1F5F9" }}>Create New Campaign</h2>
//               <button onClick={() => setShowNewCampaign(false)} style={{
//                 background: "rgba(255,255,255,0.08)", border: "none",
//                 width: 32, height: 32, borderRadius: 8,
//                 color: "#94A3B8", cursor: "pointer", fontSize: 16,
//               }}>✕</button>
//             </div>

//             {/* Ad Type Selector */}
//             <div style={{ marginBottom: 24 }}>
//               <label style={labelStyle}>Campaign Goal</label>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//                 {adTypes.map(t => (
//                   <button key={t.label} onClick={() => setSelectedAdType(t.label)} style={{
//                     padding: "12px 14px", borderRadius: 12, cursor: "pointer", textAlign: "left",
//                     background: selectedAdType === t.label ? `${t.color}18` : "rgba(255,255,255,0.04)",
//                     border: selectedAdType === t.label ? `1px solid ${t.color}60` : "1px solid rgba(255,255,255,0.08)",
//                     transition: "all 0.2s",
//                   }}>
//                     <span style={{ fontSize: 18 }}>{t.icon}</span>
//                     <div style={{ fontSize: 12, fontWeight: 700, color: selectedAdType === t.label ? t.color : "#E2E8F0", marginTop: 6 }}>{t.label}</div>
//                     <div style={{ fontSize: 10, color: "#64748B", marginTop: 2 }}>{t.desc}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {[
//               { key: "name", label: "Campaign Name", placeholder: "e.g. Lead Gen - Mumbai Q1" },
//               { key: "budget", label: "Daily Budget (₹)", placeholder: "e.g. 5000" },
//               { key: "keywords", label: "Target Keywords", placeholder: "e.g. best plumber mumbai, plumber near me" },
//               { key: "location", label: "Target Location", placeholder: "e.g. Mumbai, Delhi, Bangalore" },
//             ].map(field => (
//               <div key={field.key} style={{ marginBottom: 16 }}>
//                 <label style={labelStyle}>{field.label}</label>
//                 <input
//                   placeholder={field.placeholder}
//                   value={campaignForm[field.key]}
//                   onChange={e => setCampaignForm(f => ({ ...f, [field.key]: e.target.value }))}
//                   style={inputStyle}
//                 />
//               </div>
//             ))}

//             <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
//               <button onClick={() => setShowNewCampaign(false)} style={{
//                 flex: 1, padding: "13px", borderRadius: 10,
//                 background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
//                 color: "#94A3B8", fontSize: 14, fontWeight: 600, cursor: "pointer",
//               }}>Cancel</button>
//               <button onClick={handleCreateCampaign} style={{
//                 flex: 2, padding: "13px", borderRadius: 10,
//                 background: "linear-gradient(135deg, #00D4FF, #0099CC)",
//                 border: "none", color: "#000", fontSize: 14, fontWeight: 800, cursor: "pointer",
//               }}>🚀 Launch Campaign</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast */}
//       {toast && (
//         <div style={{
//           position: "fixed", bottom: 28, right: 28, zIndex: 2000,
//           background: "rgba(15,20,40,0.95)",
//           border: `1px solid ${toast.color}50`,
//           borderLeft: `3px solid ${toast.color}`,
//           padding: "14px 20px", borderRadius: 12,
//           color: toast.color, fontWeight: 700, fontSize: 14,
//           backdropFilter: "blur(16px)",
//           animation: "slideInRight 0.3s ease",
//         }}>
//           {toast.msg}
//         </div>
//       )}

//       <style>{`
//         @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
//         @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
//       `}</style>
//     </>
//   );
// }

// const labelStyle = {
//   display: "block", fontSize: 12, fontWeight: 600,
//   color: "#94A3B8", marginBottom: 8, letterSpacing: "0.04em",
// };

// const inputStyle = {
//   width: "100%", boxSizing: "border-box",
//   padding: "11px 14px", borderRadius: 10,
//   background: "rgba(255,255,255,0.05)",
//   border: "1px solid rgba(255,255,255,0.1)",
//   color: "#E2E8F0", fontSize: 13,
//   outline: "none",
//   transition: "border-color 0.2s",
// };
