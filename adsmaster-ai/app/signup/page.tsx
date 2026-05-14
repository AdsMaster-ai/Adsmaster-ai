"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

const PERMISSIONS = [
  {
    id: "profile_data",
    icon: "👤",
    title: "Profile & Identity",
    desc: "Your name, email and account details to personalise your experience.",
    required: true,
  },
  {
    id: "google_ads",
    icon: "🎯",
    title: "Google Ads Account",
    desc: "Read & manage your Google Ads campaigns so our AI can optimise them.",
    required: true,
  },
  {
    id: "google_analytics",
    icon: "📈",
    title: "Google Analytics",
    desc: "View traffic, conversions and performance data for your campaigns.",
    required: false,
  },
  {
    id: "google_drive",
    icon: "📁",
    title: "Google Drive (Read-only)",
    desc: "Access creative assets like images and documents for your ads.",
    required: false,
  },
  {
    id: "email_updates",
    icon: "📧",
    title: "Product Emails",
    desc: "Receive tips, feature updates and important account notifications.",
    required: false,
  },
  {
    id: "ai_personalization",
    icon: "✨",
    title: "AI Personalisation",
    desc: "Let our AI learn from your usage to give smarter recommendations.",
    required: false,
  },
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep]       = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

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
    profile_data:       true,
    google_ads:         true,
    google_analytics:   false,
    google_drive:       false,
    email_updates:      false,
    ai_personalization: false,
  });

  // Already logged in → go to campaign-creator
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

  // ── Final signup ────────────────────────────────────────────────
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

      // Instant session (Supabase email confirm OFF) → campaign-creator
      if (data.session) {
        router.replace("/campaign-creator");
      } else {
        // Email confirm ON → verify page
        router.replace("/signup/verify?email=" + encodeURIComponent(email));
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  // ── Google OAuth ─────────────────────────────────────────────────
  

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
        .su-card { animation: slideUp .5s cubic-bezier(.22,1,.36,1) both; }
        .su-step { animation: slideUp .35s cubic-bezier(.22,1,.36,1) both; }
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
        .su-goog { transition: background .2s, border-color .2s; }
        .su-goog:hover { background: rgba(255,255,255,0.09) !important; border-color: rgba(255,255,255,0.2) !important; }
        .perm-card { transition: border-color .2s, background .2s; }
        .perm-card:hover:not(.perm-req) { border-color: rgba(99,102,241,0.45) !important; }
        .back-btn:hover { background: rgba(255,255,255,0.07) !important; color: rgba(255,255,255,0.65) !important; }
      `}</style>

      <div style={S.page}>
        <div style={S.glowTL} />
        <div style={S.glowBR} />
        <div style={S.dotGrid} />

        <div className="su-card" style={S.card}>

          {/* Logo */}
          <div style={S.logoRow}>
            <div style={S.logoMark}>
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path d="M6 24L13 9L20 19L25 13" stroke="white" strokeWidth="2.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="25" cy="13" r="3" fill="#a5f3fc"/>
              </svg>
            </div>
            <span style={S.logoText}>AdsMaster AI</span>
          </div>

          {/* Step indicators */}
          <div style={S.stepRow}>
            {[
              { n: 1, label: "Account" },
              { n: 2, label: "Business" },
              { n: 3, label: "Permissions" },
            ].map(({ n, label }, i) => (
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
                  }}>
                    {label}
                  </span>
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
          {error && (
            <div style={S.errorBox}>
              <span>⚠️</span> {error}
            </div>
          )}

          {/* ══ STEP 1 ══ */}
          {step === 1 && (
            <div className="su-step">
              <h1 style={S.title}>Create your account</h1>
              <p style={S.subtitle}>Start free — no credit card required</p>

              

              <div style={S.orRow}>
                <div style={S.orLine} />
                <span style={S.orText}>or sign up with email</span>
                <div style={S.orLine} />
              </div>

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

          {/* ══ STEP 2 ══ */}
          {step === 2 && (
            <div className="su-step">
              <h1 style={S.title}>About your business</h1>
              <p style={S.subtitle}>Help us personalise your workspace</p>

              <Field label="Full name" type="text" value={fullName}
                onChange={setFullName} placeholder="e.g. Alex Johnson" />
              <Field label="Phone number" type="tel" value={phone}
                onChange={setPhone} placeholder="+1 555 000 0000  (optional)" />
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

          {/* ══ STEP 3 ══ */}
          {step === 3 && (
            <div className="su-step">
              <h1 style={S.title}>Data & permissions</h1>
              <p style={S.subtitle}>
                Choose what you allow. Required permissions power core features.
              </p>

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
                      }}
                    >
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
                  style={{
                    ...S.primaryBtn, flex: 1, marginBottom: 0,
                    opacity: loading ? 0.65 : 1,
                    cursor:  loading ? "not-allowed" : "pointer",
                  }}
                  onClick={handleSignup}
                  disabled={loading}
                >
                  {loading
                    ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
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

// ─── Tiny components ──────────────────────────────────────────────

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
        ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      }
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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
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
    boxShadow: "0 4px 20px rgba(99,102,241,0.45)",
  },
  logoText: {
    fontSize: "19px", fontWeight: 700, letterSpacing: "-0.3px",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    background: "linear-gradient(90deg, #c7d2fe, #818cf8)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  stepRow: {
    display: "flex", alignItems: "flex-start",
    marginBottom: "12px",
  },
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
    fontSize: "13.5px", display: "flex", gap: "8px",
    marginBottom: "20px", lineHeight: "1.5",
  },
  title: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: "24px", fontWeight: 800, color: "#fff",
    letterSpacing: "-0.5px", marginBottom: "6px",
  },
  subtitle: { color: "rgba(255,255,255,0.32)", fontSize: "14px", marginBottom: "24px" },
  googleBtn: {
    width: "100%", padding: "13px 18px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px", color: "#e2e8f0",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14.5px",
    cursor: "pointer", display: "flex", alignItems: "center",
    justifyContent: "center", gap: "10px", marginBottom: "20px",
  },
  orRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" },
  orLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" },
  orText: { color: "rgba(255,255,255,0.2)", fontSize: "12px", whiteSpace: "nowrap" },
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
    color: "rgba(255,255,255,0.28)", padding: 0,
    display: "flex", alignItems: "center",
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
    cursor: "pointer", transition: "all .2s",
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



// "use client";
// import { useState } from "react";
// import { supabase } from "../../lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1); // Step 1: Basic, Step 2: Details
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Form fields
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [agreeTerms, setAgreeTerms] = useState(false);

//   const handleStep1 = () => {
//     setError("");
//     if (!email || !password || !confirmPassword) {
//       setError("Sab fields bharo"); return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords match nahi kar rahe"); return;
//     }
//     if (password.length < 6) {
//       setError("Password kam se kam 6 characters ka hona chahiye"); return;
//     }
//     setStep(2);
//   };

//   const handleSignup = async () => {
//     setError("");
//     if (!fullName || !phone || !businessName) {
//       setError("Sab details bharo"); return;
//     }
//     if (!agreeTerms) {
//       setError("Terms & Privacy Policy accept karo"); return;
//     }
//     setLoading(true);
//     try {
//       const { data, error: signupError } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: { full_name: fullName },
//           emailRedirectTo: `${window.location.origin}/`,
//         },
//       });
//       if (signupError) throw signupError;

//       // Save extra details to profiles table
//       if (data.user) {
//         await supabase.from("profiles").upsert({
//           id: data.user.id,
//           email,
//           full_name: fullName,
//           phone,
//           business_name: businessName,
//         });
//       }
//       setSuccess("✅ Confirmation email bheja gaya! Apna email check karo.");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         {/* Header */}
//         <div style={styles.header}>
//           <div style={styles.logoRow}>
//             <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
//               <rect width="32" height="32" rx="8" fill="#6366f1" />
//               <path d="M8 22L14 10L20 18L24 14" stroke="white" strokeWidth="2.5"
//                 strokeLinecap="round" strokeLinejoin="round" />
//               <circle cx="24" cy="14" r="2.5" fill="#a5f3fc" />
//             </svg>
//             <span style={styles.logoText}>AdsMaster AI</span>
//           </div>
//           <h2 style={styles.title}>Account Banao</h2>
//           <p style={styles.subtitle}>
//             {step === 1 ? "Apni login details daalo" : "Business ki details daalo"}
//           </p>
//           {/* Step indicator */}
//           <div style={styles.stepRow}>
//             <div style={{ ...styles.stepDot, background: "#6366f1" }} />
//             <div style={{
//               ...styles.stepLine,
//               background: step === 2 ? "#6366f1" : "rgba(99,102,241,0.2)"
//             }} />
//             <div style={{
//               ...styles.stepDot,
//               background: step === 2 ? "#6366f1" : "rgba(99,102,241,0.2)"
//             }} />
//           </div>
//         </div>

//         {error && <div style={styles.errorBox}>{error}</div>}
//         {success && <div style={styles.successBox}>{success}</div>}

//         {!success && (
//           <>
//             {step === 1 ? (
//               <>
//                 <Input label="Email Address" type="email" value={email}
//                   onChange={setEmail} placeholder="aap@example.com" />
//                 <Input label="Password" type="password" value={password}
//                   onChange={setPassword} placeholder="Min 6 characters" />
//                 <Input label="Confirm Password" type="password" value={confirmPassword}
//                   onChange={setConfirmPassword} placeholder="Password dobara daalo" />

//                 <button style={styles.btn} onClick={handleStep1}>
//                   Aage Badho →
//                 </button>

//                 <div style={styles.dividerRow}>
//                   <div style={styles.dividerLine} />
//                   <span style={styles.dividerText}>ya</span>
//                   <div style={styles.dividerLine} />
//                 </div>

//                 <button style={styles.googleBtn} onClick={handleGoogle}>
//                   <GoogleIcon />
//                   Google se Sign Up karo
//                 </button>

//                 <p style={styles.bottomText}>
//                   Pehle se account hai?{" "}
//                   <span style={styles.link} onClick={() => router.push("/login")}>
//                     Login karo
//                   </span>
//                 </p>
//               </>
//             ) : (
//               <>
//                 {/* Permission notice */}
//                 <div style={styles.permissionBox}>
//                   <div style={styles.permissionTitle}>📋 Hum in cheezon ka access maangenge:</div>
//                   <div style={styles.permissionItem}>✅ Aapka naam aur email</div>
//                   <div style={styles.permissionItem}>✅ Google Ads account (ads manage karne ke liye)</div>
//                   <div style={styles.permissionItem}>✅ Google Analytics (performance dekhne ke liye)</div>
//                   <div style={styles.permissionNote}>
//                     🔒 Aapka data secure hai. Hum kabhi share nahi karte.
//                   </div>
//                 </div>

//                 <Input label="Pura Naam" type="text" value={fullName}
//                   onChange={setFullName} placeholder="Jaise: Rahul Sharma" />
//                 <Input label="Phone Number" type="tel" value={phone}
//                   onChange={setPhone} placeholder="+91 98765 43210" />
//                 <Input label="Business ka Naam" type="text" value={businessName}
//                   onChange={setBusinessName} placeholder="Jaise: My Shop Pvt Ltd" />

//                 {/* Terms checkbox */}
//                 <div style={styles.checkRow} onClick={() => setAgreeTerms(!agreeTerms)}>
//                   <div style={{
//                     ...styles.checkbox,
//                     background: agreeTerms ? "#6366f1" : "transparent",
//                     borderColor: agreeTerms ? "#6366f1" : "rgba(99,102,241,0.4)",
//                   }}>
//                     {agreeTerms && <span style={{ color: "white", fontSize: "11px" }}>✓</span>}
//                   </div>
//                   <span style={styles.checkText}>
//                     Main{" "}
//                     <span style={styles.link}>Terms of Service</span>
//                     {" "}aur{" "}
//                     <span style={styles.link}>Privacy Policy</span>
//                     {" "}se agree karta/karti hoon
//                   </span>
//                 </div>

//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <button style={styles.backBtn} onClick={() => setStep(1)}>
//                     ← Wapas
//                   </button>
//                   <button
//                     style={{ ...styles.btn, flex: 1, opacity: loading ? 0.7 : 1 }}
//                     onClick={handleSignup}
//                     disabled={loading}
//                   >
//                     {loading ? "Account ban raha hai..." : "Account Banao ✓"}
//                   </button>
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// // Reusable input
// function Input({ label, type, value, onChange, placeholder }: any) {
//   const [focused, setFocused] = useState(false);
//   return (
//     <div style={{ marginBottom: "16px" }}>
//       <label style={styles.label}>{label}</label>
//       <input
//         type={type}
//         value={value}
//         placeholder={placeholder}
//         onChange={(e) => onChange(e.target.value)}
//         onFocus={() => setFocused(true)}
//         onBlur={() => setFocused(false)}
//         style={{
//           ...styles.input,
//           borderColor: focused ? "#6366f1" : "rgba(99,102,241,0.25)",
//           boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
//         }}
//       />
//     </div>
//   );
// }

// const GoogleIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
//     <path d="M14.5 8.16c0-.5-.04-.87-.13-1.25H8v2.27h3.7c-.08.63-.5 1.58-1.44 2.22l2.33 1.8c1.36-1.26 2.15-3.1 2.15-5.04z" fill="#4285F4" />
//     <path d="M8 15c1.85 0 3.4-.6 4.54-1.64l-2.33-1.8c-.6.41-1.4.7-2.21.7-1.7 0-3.13-1.12-3.64-2.66L1.9 11.4C3.03 13.64 5.35 15 8 15z" fill="#34A853" />
//     <path d="M4.36 10.6A4.44 4.44 0 0 1 4.1 9c0-.56.1-1.1.26-1.6L2.04 5.7A7.51 7.51 0 0 0 1.2 9c0 1.2.29 2.34.8 3.3l2.36-1.7z" fill="#FBBC05" />
//     <path d="M8 3.74c1.2 0 2.01.52 2.47.95l1.8-1.76C11.4 1.89 9.85 1.2 8 1.2 5.35 1.2 3.03 2.56 1.9 4.8l2.46 1.9C4.87 5.08 6.3 3.74 8 3.74z" fill="#EA4335" />
//   </svg>
// );

// const styles: Record<string, React.CSSProperties> = {
//   page: {
//     minHeight: "100vh",
//     background: "radial-gradient(ellipse at top, #0d0d1f 0%, #07070f 70%)",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     padding: "20px", fontFamily: "'Sora', 'DM Sans', sans-serif",
//   },
//   card: {
//     background: "rgba(15, 15, 28, 0.95)",
//     border: "1px solid rgba(99,102,241,0.2)",
//     borderRadius: "20px",
//     padding: "36px 32px",
//     width: "100%", maxWidth: "420px",
//     boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08)",
//   },
//   header: { textAlign: "center", marginBottom: "28px" },
//   logoRow: {
//     display: "flex", alignItems: "center", justifyContent: "center",
//     gap: "10px", marginBottom: "16px",
//   },
//   logoText: {
//     fontSize: "20px", fontWeight: 700, letterSpacing: "-0.4px",
//     background: "linear-gradient(90deg, #a5b4fc, #6366f1, #38bdf8)",
//     WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//   },
//   title: { color: "white", fontSize: "22px", fontWeight: 700, marginBottom: "6px" },
//   subtitle: { color: "#64748b", fontSize: "14px" },
//   stepRow: {
//     display: "flex", alignItems: "center", justifyContent: "center",
//     gap: "0", marginTop: "16px",
//   },
//   stepDot: { width: "10px", height: "10px", borderRadius: "50%", transition: "background 0.3s" },
//   stepLine: { width: "60px", height: "2px", transition: "background 0.3s" },
//   errorBox: {
//     background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
//     borderRadius: "10px", padding: "12px 14px", color: "#fca5a5",
//     fontSize: "13px", marginBottom: "16px",
//   },
//   successBox: {
//     background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
//     borderRadius: "10px", padding: "12px 14px", color: "#86efac",
//     fontSize: "13px", marginBottom: "16px",
//   },
//   permissionBox: {
//     background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)",
//     borderRadius: "12px", padding: "14px", marginBottom: "20px",
//   },
//   permissionTitle: { color: "#a5b4fc", fontSize: "13px", fontWeight: 600, marginBottom: "8px" },
//   permissionItem: { color: "#94a3b8", fontSize: "12.5px", marginBottom: "4px" },
//   permissionNote: {
//     color: "#64748b", fontSize: "11.5px", marginTop: "8px",
//     paddingTop: "8px", borderTop: "1px solid rgba(99,102,241,0.15)",
//   },
//   label: { display: "block", color: "#94a3b8", fontSize: "13px", marginBottom: "6px", fontWeight: 500 },
//   input: {
//     width: "100%", padding: "11px 14px",
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(99,102,241,0.25)",
//     borderRadius: "10px", color: "white",
//     fontSize: "14px", outline: "none",
//     transition: "all 0.2s ease", boxSizing: "border-box",
//   },
//   btn: {
//     width: "100%", padding: "13px",
//     background: "linear-gradient(135deg, #6366f1, #4f46e5)",
//     color: "white", border: "none", borderRadius: "10px",
//     cursor: "pointer", fontWeight: 700, fontSize: "15px",
//     fontFamily: "'Sora', sans-serif",
//     boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
//     transition: "all 0.2s ease", marginBottom: "14px",
//   },
//   backBtn: {
//     padding: "13px 18px",
//     background: "rgba(99,102,241,0.1)",
//     color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)",
//     borderRadius: "10px", cursor: "pointer",
//     fontWeight: 600, fontSize: "14px",
//     fontFamily: "'Sora', sans-serif",
//     marginBottom: "14px",
//   },
//   googleBtn: {
//     width: "100%", padding: "12px",
//     background: "rgba(255,255,255,0.05)",
//     color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)",
//     borderRadius: "10px", cursor: "pointer",
//     fontWeight: 600, fontSize: "14px",
//     fontFamily: "'Sora', sans-serif",
//     display: "flex", alignItems: "center",
//     justifyContent: "center", gap: "10px",
//     marginBottom: "16px", transition: "all 0.2s ease",
//   },
//   dividerRow: {
//     display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px",
//   },
//   dividerLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" },
//   dividerText: { color: "#475569", fontSize: "12px" },
//   checkRow: {
//     display: "flex", alignItems: "flex-start", gap: "10px",
//     cursor: "pointer", marginBottom: "20px",
//   },
//   checkbox: {
//     width: "18px", height: "18px", borderRadius: "5px",
//     border: "1.5px solid rgba(99,102,241,0.4)",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     flexShrink: 0, marginTop: "1px", transition: "all 0.2s ease",
//   },
//   checkText: { color: "#64748b", fontSize: "12.5px", lineHeight: "1.5" },
//   link: { color: "#6366f1", cursor: "pointer" },
//   bottomText: { color: "#475569", fontSize: "13px", textAlign: "center" },
// };