"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [showPass,   setShowPass]   = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");

  // Forgot password
  const [showReset,  setShowReset]  = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent,  setResetSent]  = useState(false);
  const [resetLoad,  setResetLoad]  = useState(false);

  // Already logged in → campaign-creator
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/campaign-creator");
    });
  }, []);

  // ── Email login ────────────────────────────────────────────────
  const handleLogin = async () => {
    setError("");
    if (!email || !password) return setError("Please enter your email and password.");
    setLoading(true);
    try {
      const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password });
      if (loginErr) throw loginErr;
      router.replace("/campaign-creator");
    } catch (err: any) {
      setError(
        err.message === "Invalid login credentials"
          ? "Incorrect email or password. Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Google OAuth ───────────────────────────────────────────────
  const handleGoogle = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/campaign-creator`,
        scopes: [
          "email",
          "profile",
          "openid",
          "https://www.googleapis.com/auth/adwords",
          "https://www.googleapis.com/auth/analytics.readonly",
        ].join(" "),
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) setError(error.message);
  };

  // ── Password reset ─────────────────────────────────────────────
  const handleReset = async () => {
    setError("");
    if (!resetEmail) return setError("Please enter your email address.");
    setResetLoad(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setResetSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setResetLoad(false);
    }
  };

  // ── Enter key submit ───────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") showReset ? handleReset() : handleLogin();
  };

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
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .lg-card  { animation: slideUp .5s cubic-bezier(.22,1,.36,1) both; }
        .lg-panel { animation: slideUp .35s cubic-bezier(.22,1,.36,1) both; }
        .lg-input { transition: border-color .2s, box-shadow .2s; }
        .lg-input:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.2) !important;
          outline: none;
        }
        .lg-btn { transition: transform .15s, box-shadow .15s, opacity .15s; }
        .lg-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(99,102,241,0.55) !important;
        }
        .lg-btn:active:not(:disabled) { transform: translateY(0); }
        .lg-goog { transition: background .2s, border-color .2s; }
        .lg-goog:hover {
          background: rgba(255,255,255,0.09) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }
        .lg-link { transition: color .15s; }
        .lg-link:hover { color: #a5b4fc !important; }
        .lg-back { transition: background .2s, color .2s; }
        .lg-back:hover { background: rgba(255,255,255,0.07) !important; color: rgba(255,255,255,0.65) !important; }
      `}</style>

      <div style={S.page}>
        {/* Ambient glows */}
        <div style={S.glowTL} />
        <div style={S.glowBR} />
        {/* Dot grid */}
        <div style={S.dotGrid} />

        <div className="lg-card" style={S.card}>

          {/* ── Logo ── */}
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

          {/* ════════════════════════════════════
              LOGIN PANEL
          ════════════════════════════════════ */}
          {!showReset && (
            <div className="lg-panel">
              <h1 style={S.title}>Welcome back</h1>
              <p style={S.subtitle}>Sign in to your account to continue</p>

              {/* Google */}
              <button className="lg-goog" style={S.googleBtn} onClick={handleGoogle}>
                <GoogleIcon />
                Continue with Google
              </button>

              <div style={S.orRow}>
                <div style={S.orLine} />
                <span style={S.orText}>or sign in with email</span>
                <div style={S.orLine} />
              </div>

              {/* Error */}
              {error && <div style={S.errorBox}><span>⚠️</span> {error}</div>}

              {/* Email */}
              <InputField
                label="Email address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@company.com"
                onKeyDown={onKeyDown}
              />

              {/* Password */}
              <InputField
                label="Password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={setPassword}
                placeholder="Enter your password"
                onKeyDown={onKeyDown}
                right={<EyeBtn show={showPass} onToggle={() => setShowPass(v => !v)} />}
              />

              {/* Forgot password */}
              <div style={{ textAlign: "right", marginTop: "-6px", marginBottom: "22px" }}>
                <span
                  className="lg-link"
                  style={S.forgotLink}
                  onClick={() => { setError(""); setShowReset(true); }}
                >
                  Forgot password?
                </span>
              </div>

              {/* Sign in button */}
              <button
                className="lg-btn"
                style={{ ...S.primaryBtn, opacity: loading ? 0.65 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading
                  ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <Spinner /> Signing in…
                    </span>
                  : "Sign In →"
                }
              </button>

              <p style={S.footerText}>
                Don't have an account?{" "}
                <span
                  className="lg-link"
                  style={S.link}
                  onClick={() => router.push("/signup")}
                >
                  Create one free
                </span>
              </p>
            </div>
          )}

          {/* ════════════════════════════════════
              FORGOT PASSWORD PANEL
          ════════════════════════════════════ */}
          {showReset && (
            <div className="lg-panel">

              {!resetSent ? (
                <>
                  <div style={S.resetIcon}>🔑</div>
                  <h1 style={S.title}>Reset password</h1>
                  <p style={S.subtitle}>
                    Enter your email and we'll send you a reset link right away.
                  </p>

                  {error && <div style={S.errorBox}><span>⚠️</span> {error}</div>}

                  <InputField
                    label="Email address"
                    type="email"
                    value={resetEmail}
                    onChange={setResetEmail}
                    placeholder="you@company.com"
                    onKeyDown={onKeyDown}
                  />

                  <button
                    className="lg-btn"
                    style={{
                      ...S.primaryBtn,
                      opacity: resetLoad ? 0.65 : 1,
                      cursor: resetLoad ? "not-allowed" : "pointer",
                    }}
                    onClick={handleReset}
                    disabled={resetLoad}
                  >
                    {resetLoad
                      ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                          <Spinner /> Sending…
                        </span>
                      : "Send Reset Link"
                    }
                  </button>

                  <button
                    className="lg-back"
                    style={S.backBtn}
                    onClick={() => { setError(""); setShowReset(false); }}
                  >
                    ← Back to Sign In
                  </button>
                </>
              ) : (
                /* ── Success state ── */
                <div style={{ textAlign: "center", animation: "fadeIn .4s ease" }}>
                  <div style={S.successIcon}>✉️</div>
                  <h1 style={{ ...S.title, marginBottom: "10px" }}>Check your inbox</h1>
                  <p style={{ ...S.subtitle, marginBottom: "28px", lineHeight: "1.7" }}>
                    We've sent a password reset link to{" "}
                    <strong style={{ color: "#a5b4fc" }}>{resetEmail}</strong>.
                    It may take a minute to arrive.
                  </p>
                  <div style={S.successBox}>
                    ✅ Reset link sent successfully
                  </div>
                  <button
                    className="lg-back"
                    style={{ ...S.backBtn, width: "100%", textAlign: "center" }}
                    onClick={() => { setShowReset(false); setResetSent(false); setResetEmail(""); }}
                  >
                    ← Back to Sign In
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────

function InputField({
  label, type, value, onChange, placeholder, right, onKeyDown,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  right?: React.ReactNode; onKeyDown?: (e: React.KeyboardEvent) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={S.label}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          className="lg-input"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          style={{
            ...S.input,
            paddingRight: right ? "44px" : "14px",
            borderColor: focused ? "#6366f1" : "rgba(255,255,255,0.08)",
            boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.18)" : "none",
          }}
        />
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
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
        : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
      }
    </button>
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
    padding: "44px 40px", width: "100%", maxWidth: "440px",
    boxShadow: "0 48px 96px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
    position: "relative", zIndex: 1,
  },

  // Logo
  logoRow: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "11px", marginBottom: "32px",
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

  // Typography
  title: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: "24px", fontWeight: 800, color: "#fff",
    letterSpacing: "-0.5px", marginBottom: "6px", textAlign: "center",
  },
  subtitle: {
    color: "rgba(255,255,255,0.32)", fontSize: "14px",
    marginBottom: "28px", textAlign: "center",
  },

  // Google
  googleBtn: {
    width: "100%", padding: "13px 18px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px", color: "#e2e8f0",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14.5px",
    cursor: "pointer", display: "flex", alignItems: "center",
    justifyContent: "center", gap: "10px", marginBottom: "20px",
  },

  // Divider
  orRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" },
  orLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" },
  orText: { color: "rgba(255,255,255,0.2)", fontSize: "12px", whiteSpace: "nowrap" },

  // Error / Success
  errorBox: {
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)",
    borderRadius: "12px", padding: "12px 16px", color: "#fca5a5",
    fontSize: "13.5px", display: "flex", gap: "8px",
    marginBottom: "20px", lineHeight: "1.5",
  },
  successBox: {
    background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.22)",
    borderRadius: "12px", padding: "12px 16px", color: "#86efac",
    fontSize: "13.5px", marginBottom: "20px", textAlign: "center",
  },

  // Input
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

  // Forgot
  forgotLink: {
    color: "#6366f1", cursor: "pointer", fontSize: "13px", fontWeight: 500,
  },

  // Buttons
  primaryBtn: {
    width: "100%", padding: "14px",
    background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
    color: "#fff", border: "none", borderRadius: "14px",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 700, fontSize: "15.5px", cursor: "pointer",
    boxShadow: "0 4px 22px rgba(99,102,241,0.42)", marginBottom: "18px",
  },
  backBtn: {
    display: "block", padding: "12px 18px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px", color: "rgba(255,255,255,0.35)",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px",
    cursor: "pointer", textAlign: "left" as const, width: "auto",
  },

  // Footer
footerText: {
    color: "rgba(255,255,255,0.25)", fontSize: "13.5px", textAlign: "center",
  },
  link: {
    color: "#818cf8", cursor: "pointer",
    textDecoration: "underline", textDecorationColor: "rgba(129,140,248,0.3)",
  },

  // Reset icons
  resetIcon: { fontSize: "40px", textAlign: "center", marginBottom: "16px" },
  successIcon: { fontSize: "48px", textAlign: "center", marginBottom: "16px" },
};




// "use client";
// import { useState } from "react";
// import { supabase } from "../../lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [resetSent, setResetSent] = useState(false);
//   const [showReset, setShowReset] = useState(false);
//   const [resetEmail, setResetEmail] = useState("");

//   const handleLogin = async () => {
//     setError("");
//     if (!email || !password) { setError("Email aur password daalo"); return; }
//     setLoading(true);
//     try {
//       const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
//       if (loginError) throw loginError;
//       router.push("/");
//       router.refresh();
//     } catch (err: any) {
//       setError(err.message === "Invalid login credentials"
//         ? "Email ya password galat hai"
//         : err.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogle = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: `${window.location.origin}/`,
//         scopes: [
//           "email", "profile",
//           "https://www.googleapis.com/auth/adwords",
//           "https://www.googleapis.com/auth/analytics",
//           "https://www.googleapis.com/auth/analytics.readonly",
//         ].join(" "),
//       },
//     });
//   };

//   const handleReset = async () => {
//     if (!resetEmail) { setError("Email daalo"); return; }
//     const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
//       redirectTo: `${window.location.origin}/reset-password`,
//     });
//     if (error) { setError(error.message); return; }
//     setResetSent(true);
//   };

//   return (
//     <div style={styles.page}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');`}</style>
//       <div style={styles.card}>
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
//           <h2 style={styles.title}>
//             {showReset ? "Password Reset" : "Wapas Aao!"}
//           </h2>
//           <p style={styles.subtitle}>
//             {showReset
//               ? "Email pe reset link bhejenge"
//               : "Apne account mein login karo"}
//           </p>
//         </div>

//         {error && <div style={styles.errorBox}>{error}</div>}
//         {resetSent && (
//           <div style={styles.successBox}>
//             ✅ Reset link bhej diya! Email check karo.
//           </div>
//         )}

//         {!showReset ? (
//           <>
//             <FocusInput label="Email Address" type="email" value={email}
//               onChange={setEmail} placeholder="aap@example.com" />
//             <FocusInput label="Password" type="password" value={password}
//               onChange={setPassword} placeholder="Apna password daalo" />

//             <div style={{ textAlign: "right", marginBottom: "20px", marginTop: "-8px" }}>
//               <span style={styles.link} onClick={() => setShowReset(true)}>
//                 Password bhool gaye?
//               </span>
//             </div>

//             <button
//               style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
//               onClick={handleLogin}
//               disabled={loading}
//             >
//               {loading ? "Login ho raha hai..." : "Login Karo →"}
//             </button>

//             <div style={styles.dividerRow}>
//               <div style={styles.dividerLine} />
//               <span style={styles.dividerText}>ya</span>
//               <div style={styles.dividerLine} />
//             </div>

//             <button style={styles.googleBtn} onClick={handleGoogle}>
//               <GoogleIcon />
//               Google se Login karo
//             </button>

//             <p style={styles.bottomText}>
//               Account nahi hai?{" "}
//               <span style={styles.link} onClick={() => router.push("/signup")}>
//                 Sign Up karo
//               </span>
//             </p>
//           </>
//         ) : (
//           <>
//             <FocusInput label="Apna Email" type="email" value={resetEmail}
//               onChange={setResetEmail} placeholder="aap@example.com" />
//             <button style={styles.btn} onClick={handleReset}>
//               Reset Link Bhejo
//             </button>
//             <p style={styles.bottomText}>
//               <span style={styles.link} onClick={() => setShowReset(false)}>
//                 ← Wapas Login pe
//               </span>
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function FocusInput({ label, type, value, onChange, placeholder }: any) {
//   const [focused, setFocused] = useState(false);
//   return (
//     <div style={{ marginBottom: "16px" }}>
//       <label style={styles.label}>{label}</label>
//       <input
//         type={type} value={value} placeholder={placeholder}
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
//     borderRadius: "20px", padding: "36px 32px",
//     width: "100%", maxWidth: "420px",
//     boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
//   },
//   header: { textAlign: "center", marginBottom: "28px" },
//   logoRow: {
//     display: "flex", alignItems: "center",
//     justifyContent: "center", gap: "10px", marginBottom: "16px",
//   },
//   logoText: {
//     fontSize: "20px", fontWeight: 700,
//     background: "linear-gradient(90deg, #a5b4fc, #6366f1, #38bdf8)",
//     WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//   },
//   title: { color: "white", fontSize: "22px", fontWeight: 700, marginBottom: "6px" },
//   subtitle: { color: "#64748b", fontSize: "14px" },
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
//     marginBottom: "14px",
//   },
//   googleBtn: {
//     width: "100%", padding: "12px",
//     background: "rgba(255,255,255,0.05)",
//     color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)",
//     borderRadius: "10px", cursor: "pointer", fontWeight: 600,
//     fontSize: "14px", fontFamily: "'Sora', sans-serif",
//     display: "flex", alignItems: "center",
//     justifyContent: "center", gap: "10px",
//     marginBottom: "16px",
//   },
//   dividerRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" },
//   dividerLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" },
//   dividerText: { color: "#475569", fontSize: "12px" },
//   link: { color: "#6366f1", cursor: "pointer", fontSize: "13px" },
//   bottomText: { color: "#475569", fontSize: "13px", textAlign: "center" },
// };