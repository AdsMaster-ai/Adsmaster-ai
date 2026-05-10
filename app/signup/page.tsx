"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

const PERMISSIONS = [
  { id: "profile_data",      icon: "👤", title: "Profile & Identity",        desc: "Your name and email to personalise your experience.",              required: true  },
  { id: "campaign_data",     icon: "📢", title: "Campaign Data",              desc: "Access your ad campaigns so our AI can analyse and optimise them.", required: true  },
  { id: "google_analytics",  icon: "📈", title: "Google Analytics",           desc: "View traffic and conversion data for better campaign insights.",    required: false },
  { id: "google_drive",      icon: "📁", title: "Google Drive (Read-only)",   desc: "Access creative assets like images and docs for your ads.",        required: false },
  { id: "email_updates",     icon: "📧", title: "Product Emails",             desc: "Tips, feature updates and important account notifications.",       required: false },
  { id: "ai_personalization",icon: "✨", title: "AI Personalisation",         desc: "Let our AI learn from your usage to give smarter suggestions.",    required: false },
];

export default function SignupPage() {
  const router = useRouter();
  const [step,    setStep]    = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  // Step 1
  const [email,           setEmail]           = useState("");
  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass,        setShowPass]        = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);

  // Step 2
  const [fullName,     setFullName]     = useState("");
  const [phone,        setPhone]        = useState("");
  const [businessName, setBusinessName] = useState("");

  // Step 3 permissions
  const [perms, setPerms] = useState<Record<string, boolean>>({
    profile_data: true, campaign_data: true,
    google_analytics: false, google_drive: false,
    email_updates: false, ai_personalization: false,
  });

  // Already logged in → campaign-creator
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/campaign-creator");
    });
  }, []);

  // ── Step 1 ──────────────────────────────────────────────────────
  const handleStep1 = () => {
    setError("");
    if (!email || !password || !confirmPassword)
      return setError("Please fill in all fields.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email address.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");
    setStep(2);
  };

  // ── Step 2 ──────────────────────────────────────────────────────
  const handleStep2 = () => {
    setError("");
    if (!fullName || !businessName)
      return setError("Full name and business name are required.");
    setStep(3);
  };

  // ── Final signup ─────────────────────────────────────────────────
  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: signupErr } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/campaign-creator`,
        },
      });
      if (signupErr) throw signupErr;

      if (data.user) {
        await supabase.from("profiles").upsert({
          id:                      data.user.id,
          email,
          full_name:               fullName,
          phone:                   phone || null,
          business_name:           businessName,
          permissions:             perms,
          permissions_accepted_at: new Date().toISOString(),
          plan:                    "free",
          onboarded:               false,
          created_at:              new Date().toISOString(),
        });
      }

      if (data.session) {
        router.replace("/campaign-creator");
      } else {
        router.replace("/signup/verify?email=" + encodeURIComponent(email));
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const togglePerm = (id: string, required: boolean) => {
    if (required) return;
    setPerms(p => ({ ...p, [id]: !p[id] }));
  };

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: rgba(255,255,255,0.18) !important; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #0c0c1e inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .su-card  { animation: slideUp .5s cubic-bezier(.22,1,.36,1) both; }
        .su-step  { animation: slideUp .35s cubic-bezier(.22,1,.36,1) both; }
        .su-input { transition: border-color .2s, box-shadow .2s; }
        .su-input:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.2) !important;
          outline: none;
        }
        .su-btn { transition: transform .15s, box-shadow .15s, opacity .15s; }
        .su-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(99,102,241,0.55) !important;
        }
        .su-btn:active:not(:disabled) { transform: translateY(0); }
        .perm-card { transition: border-color .2s, background .2s; }
        .perm-card:hover:not(.perm-req) { border-color: rgba(99,102,241,0.45) !important; }
        .back-btn:hover { background: rgba(255,255,255,0.07) !important; }
      `}</style>

      <div style={S.page}>
        <div style={S.glowTL} />
        <div style={S.glowBR} />
        <div style={S.dotGrid} />

        <div className="su-card" style={S.card}>

          {/* Logo */}
          <div style={S.logoRow}>
            <div style={S.logoMark}>
              <img src="/icon.png" alt="AdsMaster AI"
                style={{ width: "26px", height: "26px", objectFit: "contain" }}
                onError={e => { e.currentTarget.style.display = "none"; }} />
            </div>
            <span style={S.logoText}>AdsMaster AI</span>
          </div>

          {/* Step indicators */}
          <div style={S.stepRow}>
            {[{ n: 1, label: "Account" }, { n: 2, label: "Business" }, { n: 3, label: "Permissions" }]
              .map(({ n, label }, i) => (
              <div key={n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                  <div style={{
                    ...S.stepCircle,
                    background:  step > n ? "#6366f1" : step === n ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                    borderColor: step >= n ? "#6366f1" : "rgba(255,255,255,0.08)",
                    color:       step > n ? "#fff" : step === n ? "#a5b4fc" : "rgba(255,255,255,0.2)",
                  }}>
                    {step > n ? "✓" : n}
                  </div>
                  <span style={{
                    fontSize: "10px", fontWeight: 600, letterSpacing: "0.3px",
                    color: step === n ? "#a5b4fc" : step > n ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.18)",
                  }}>{label}</span>
                </div>
                {i < 2 && (
                  <div style={{
                    flex: 1, height: "1.5px", margin: "0 8px", marginBottom: "16px",
                    background: step > n ? "#6366f1" : "rgba(255,255,255,0.07)",
                    transition: "background .4s",
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={S.progressTrack}>
            <div style={{ ...S.progressFill, width: `${progress}%` }} />
          </div>

          {/* Error */}
          {error && <div style={S.errorBox}>⚠️ {error}</div>}

          {/* ══ STEP 1 — Account ══ */}
          {step === 1 && (
            <div className="su-step">
              <h1 style={S.title}>Create your account</h1>
              <p style={S.subtitle}>Start free — no credit card required</p>

              <Field label="Email address" type="email" value={email}
                onChange={setEmail} placeholder="you@company.com" />
              <Field label="Password" type={showPass ? "text" : "password"}
                value={password} onChange={setPassword} placeholder="Minimum 8 characters"
                right={<EyeBtn show={showPass} onToggle={() => setShowPass(v => !v)} />} />
              <Field label="Confirm password" type={showConfirm ? "text" : "password"}
                value={confirmPassword} onChange={setConfirmPassword} placeholder="Repeat your password"
                right={<EyeBtn show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />} />

              <button className="su-btn" style={S.primaryBtn} onClick={handleStep1}>
                Continue →
              </button>
              <p style={S.footerText}>
                Already have an account?{" "}
                <span style={S.link} onClick={() => router.push("/login")}>Sign in</span>
              </p>
            </div>
          )}

          {/* ══ STEP 2 — Business ══ */}
          {step === 2 && (
            <div className="su-step">
              <h1 style={S.title}>About your business</h1>
              <p style={S.subtitle}>Help us personalise your workspace</p>

              <Field label="Full name" type="text" value={fullName}
                onChange={setFullName} placeholder="e.g. Alex Johnson" />
              <Field label="Phone number" type="tel" value={phone}
                onChange={setPhone} placeholder="+1 555 000 0000 (optional)" />
              <Field label="Business name" type="text" value={businessName}
                onChange={setBusinessName} placeholder="e.g. Acme Marketing Ltd" />

              <div style={{ display: "flex", gap: "10px" }}>
                <button className="back-btn" style={S.backBtn}
                  onClick={() => { setError(""); setStep(1); }}>← Back</button>
                <button className="su-btn" style={{ ...S.primaryBtn, flex: 1, marginBottom: 0 }}
                  onClick={handleStep2}>Continue →</button>
              </div>
            </div>
          )}

          {/* ══ STEP 3 — Permissions ══ */}
          {step === 3 && (
            <div className="su-step">
              <h1 style={S.title}>Data & permissions</h1>
              <p style={S.subtitle}>Required permissions power core features. Optional ones are your choice.</p>

              <div style={S.permGrid}>
                {PERMISSIONS.map(p => {
                  const active = perms[p.id];
                  return (
                    <div key={p.id}
                      className={`perm-card${p.required ? " perm-req" : ""}`}
                      onClick={() => togglePerm(p.id, p.required)}
                      style={{
                        ...S.permCard,
                        borderColor: active ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.06)",
                        background:  active ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.025)",
                        cursor:      p.required ? "default" : "pointer",
                      }}>
                      <span style={S.permEmoji}>{p.icon}</span>
                      <div style={S.permBody}>
                        <div style={S.permTitle}>{p.title}</div>
                        <div style={S.permDesc}>{p.desc}</div>
                      </div>
                      {p.required
                        ? <span style={S.reqBadge}>Required</span>
                        : <Toggle on={active} />
                      }
                    </div>
                  );
                })}
              </div>

              <div style={S.privacyBox}>
                🛡️{" "}
                <span>
                  Your data is encrypted and <strong style={{ color: "rgba(255,255,255,0.5)" }}>never sold</strong>.
                  By creating an account you agree to our{" "}
                  <span style={S.link} onClick={() => router.push("/legal/terms")}>Terms of Service</span>
                  {" "}and{" "}
                  <span style={S.link} onClick={() => router.push("/legal/privacy")}>Privacy Policy</span>.
                  GDPR &amp; CCPA compliant.
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button className="back-btn" style={S.backBtn}
                  onClick={() => { setError(""); setStep(2); }}>← Back</button>
                <button className="su-btn"
                  style={{ ...S.primaryBtn, flex: 1, marginBottom: 0, opacity: loading ? 0.65 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                  onClick={handleSignup} disabled={loading}>
                  {loading
                    ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <Spinner /> Creating account…
                      </span>
                    : "Create Account ✓"
                  }
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// ─── Components ───────────────────────────────────────────────────

function Field({ label, type, value, onChange, placeholder, right }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; right?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={S.label}>{label}</label>
      <div style={{ position: "relative" }}>
        <input className="su-input" type={type} value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            ...S.input, paddingRight: right ? "44px" : "14px",
            borderColor: focused ? "#6366f1" : "rgba(255,255,255,0.08)",
            boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.18)" : "none",
          }} />
        {right && <div style={S.inputRight}>{right}</div>}
      </div>
    </div>
  );
}

function EyeBtn({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} style={S.eyeBtn}>
      {show
        ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
        : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>}
    </button>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{
      width: "38px", height: "22px", borderRadius: "11px", flexShrink: 0,
      background: on ? "#6366f1" : "rgba(255,255,255,0.1)",
      position: "relative", transition: "background .25s",
      boxShadow: on ? "0 0 12px rgba(99,102,241,0.4)" : "none",
    }}>
      <div style={{
        position: "absolute", width: "16px", height: "16px", borderRadius: "50%",
        background: "#fff", top: "3px", left: on ? "19px" : "3px",
        transition: "left .25s cubic-bezier(.34,1.56,.64,1)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }} />
    </div>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      style={{ animation: "spin 0.8s linear infinite" }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse 90% 70% at 50% -5%, #1c1040 0%, #07070f 65%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "24px 16px", fontFamily: "'DM Sans', sans-serif",
    position: "relative", overflow: "hidden",
  },
  glowTL: {
    position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 65%)",
    top: "-250px", left: "-200px", pointerEvents: "none",
  },
  glowBR: {
    position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)",
    bottom: "-200px", right: "-150px", pointerEvents: "none",
  },
  dotGrid: {
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
  },
  card: {
    background: "rgba(10,10,22,0.94)",
    backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
    border: "1px solid rgba(255,255,255,0.07)", borderRadius: "28px",
    padding: "44px 40px", width: "100%", maxWidth: "460px",
    boxShadow: "0 48px 96px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
    position: "relative", zIndex: 1,
  },
  logoRow: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "11px", marginBottom: "30px",
  },
  logoMark: {
    width: "40px", height: "40px", borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1, #4338ca)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 4px 20px rgba(99,102,241,0.45)", overflow: "hidden",
  },
  logoText: {
    fontSize: "19px", fontWeight: 700, letterSpacing: "-0.3px",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    background: "linear-gradient(90deg, #c7d2fe, #818cf8)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  stepRow: { display: "flex", alignItems: "flex-start", marginBottom: "12px" },
  stepCircle: {
    width: "28px", height: "28px", borderRadius: "50%",
    border: "1.5px solid", fontSize: "11px", fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all .3s",
  },
  progressTrack: {
    height: "2px", background: "rgba(255,255,255,0.05)",
    borderRadius: "2px", marginBottom: "28px", overflow: "hidden",
  },
  progressFill: {
    height: "100%", borderRadius: "2px",
    background: "linear-gradient(90deg, #6366f1, #a855f7)",
    transition: "width .5s cubic-bezier(.22,1,.36,1)",
  },
  errorBox: {
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)",
    borderRadius: "12px", padding: "12px 16px", color: "#fca5a5",
    fontSize: "13.5px", marginBottom: "20px",
  },
  title: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: "24px", fontWeight: 800, color: "#fff",
    letterSpacing: "-0.5px", marginBottom: "6px",
  },
  subtitle: { color: "rgba(255,255,255,0.32)", fontSize: "14px", marginBottom: "24px" },
  label: {
    display: "block", color: "rgba(255,255,255,0.4)",
    fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px", marginBottom: "7px",
  },
  input: {
    width: "100%", padding: "12px 14px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px", color: "#fff", fontSize: "14.5px", outline: "none",
    fontFamily: "'DM Sans', sans-serif",
  },
  inputRight: { position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)" },
  eyeBtn: {
    background: "none", border: "none", cursor: "pointer",
    color: "rgba(255,255,255,0.28)", padding: 0, display: "flex", alignItems: "center",
  },
  primaryBtn: {
    width: "100%", padding: "14px",
    background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
    color: "#fff", border: "none", borderRadius: "14px",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 700, fontSize: "15.5px", cursor: "pointer",
    boxShadow: "0 4px 22px rgba(99,102,241,0.42)", marginBottom: "16px",
  },
  backBtn: {
    padding: "13px 18px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px", color: "rgba(255,255,255,0.35)",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px",
    cursor: "pointer",
  },
  footerText: { color: "rgba(255,255,255,0.25)", fontSize: "13.5px", textAlign: "center", marginTop: "4px" },
  link: { color: "#818cf8", cursor: "pointer", textDecoration: "underline", textDecorationColor: "rgba(129,140,248,0.3)" },
  permGrid: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" },
  permCard: {
    display: "flex", alignItems: "center", gap: "13px",
    padding: "13px 15px", borderRadius: "14px", border: "1px solid",
  },
  permEmoji: { fontSize: "20px", minWidth: "24px", textAlign: "center" },
  permBody: { flex: 1 },
  permTitle: { color: "#e2e8f0", fontSize: "13px", fontWeight: 600, marginBottom: "3px" },
  permDesc: { color: "rgba(255,255,255,0.28)", fontSize: "11.5px", lineHeight: "1.5" },
  reqBadge: {
    fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.5px",
    background: "rgba(99,102,241,0.2)", color: "#a5b4fc",
    padding: "3px 9px", borderRadius: "20px", flexShrink: 0,
  },
  privacyBox: {
    background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.14)",
    borderRadius: "12px", padding: "13px 15px",
    color: "rgba(255,255,255,0.28)", fontSize: "12px",
    lineHeight: "1.7", marginBottom: "20px",
    display: "flex", gap: "10px", alignItems: "flex-start",
  },
};