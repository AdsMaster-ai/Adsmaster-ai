"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [resetSent,  setResetSent]  = useState(false);
  const [showReset,  setShowReset]  = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showPass,   setShowPass]   = useState(false);
  const [resetLoad,  setResetLoad]  = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/campaign-creator");
    });
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) return setError("Please enter your email and password.");
    setLoading(true);
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;
      router.replace("/campaign-creator");
    } catch (err: any) {
      setError(err.message === "Invalid login credentials"
        ? "Incorrect email or password. Please try again."
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/campaign-creator`,
        scopes: ["email", "profile", "openid"].join(" "),
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
  };

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
        .lg-card  { animation: slideUp .5s cubic-bezier(.22,1,.36,1) both; }
        .lg-panel { animation: slideUp .35s cubic-bezier(.22,1,.36,1) both; }
        .lg-input { transition: border-color .2s, box-shadow .2s; }
        .lg-input:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.2) !important;
          outline: none;
        }
        .lg-btn { transition: transform .15s, box-shadow .15s, opacity .15s; }
        .lg-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(99,102,241,0.55) !important; }
        .lg-btn:active:not(:disabled) { transform: translateY(0); }
        .lg-goog { transition: background .2s, border-color .2s; }
        .lg-goog:hover { background: rgba(255,255,255,0.09) !important; border-color: rgba(255,255,255,0.2) !important; }
        .lg-link { transition: color .15s; cursor: pointer; }
        .lg-link:hover { color: #a5b4fc !important; }
        .lg-back { transition: background .2s, color .2s; }
        .lg-back:hover { background: rgba(255,255,255,0.07) !important; }
      `}</style>

      <div style={S.page}>
        <div style={S.glowTL} />
        <div style={S.glowBR} />
        <div style={S.dotGrid} />

        <div className="lg-card" style={S.card}>

          {/* Logo */}
          <div style={S.logoRow}>
            <div style={S.logoMark}>
              <img src="/icon.png" alt="AdsMaster AI"
                style={{ width: "26px", height: "26px", objectFit: "contain" }}
                onError={e => { e.currentTarget.style.display = "none"; }} />
            </div>
            <span style={S.logoText}>AdsMaster AI</span>
          </div>

          {/* LOGIN */}
          {!showReset && (
            <div className="lg-panel">
              <h1 style={S.title}>Welcome back</h1>
              <p style={S.subtitle}>Sign in to your account to continue</p>
          
                        {error && <div style={S.errorBox}>⚠️ {error}</div>}

              <Field label="Email address" type="email" value={email}
                onChange={setEmail} placeholder="you@company.com" onKeyDown={onKeyDown} />

              <Field label="Password" type={showPass ? "text" : "password"}
                value={password} onChange={setPassword}
                placeholder="Enter your password" onKeyDown={onKeyDown}
                right={<EyeBtn show={showPass} onToggle={() => setShowPass(v => !v)} />} />

              <div style={{ textAlign: "right", marginTop: "-6px", marginBottom: "22px" }}>
                <span className="lg-link" style={S.forgotLink}
                  onClick={() => { setError(""); setShowReset(true); }}>
                  Forgot password?
                </span>
              </div>

              <button className="lg-btn"
                style={{ ...S.primaryBtn, opacity: loading ? 0.65 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                onClick={handleLogin} disabled={loading}>
                {loading
                  ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <Spinner /> Signing in…
                    </span>
                  : "Sign In →"}
              </button>

              <p style={S.footerText}>
                Don't have an account?{" "}
                <span className="lg-link" style={S.link} onClick={() => router.push("/signup")}>
                  Create one free
                </span>
              </p>
            </div>
          )}

          {/* FORGOT PASSWORD */}
          {showReset && (
            <div className="lg-panel">
              {!resetSent ? (
                <>
                  <div style={{ fontSize: "40px", textAlign: "center", marginBottom: "16px" }}>🔑</div>
                  <h1 style={S.title}>Reset password</h1>
                  <p style={S.subtitle}>We'll send a reset link to your email.</p>

                  {error && <div style={S.errorBox}>⚠️ {error}</div>}

                  <Field label="Email address" type="email" value={resetEmail}
                    onChange={setResetEmail} placeholder="you@company.com" onKeyDown={onKeyDown} />

                  <button className="lg-btn"
                    style={{ ...S.primaryBtn, opacity: resetLoad ? 0.65 : 1, cursor: resetLoad ? "not-allowed" : "pointer" }}
                    onClick={handleReset} disabled={resetLoad}>
                    {resetLoad
                      ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                          <Spinner /> Sending…
                        </span>
                      : "Send Reset Link"}
                  </button>

                  <button className="lg-back" style={S.backBtn}
                    onClick={() => { setError(""); setShowReset(false); }}>
                    ← Back to Sign In
                  </button>
                </>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>✉️</div>
                  <h1 style={{ ...S.title, marginBottom: "10px" }}>Check your inbox</h1>
                  <p style={{ ...S.subtitle, marginBottom: "24px", lineHeight: "1.7" }}>
                    Reset link sent to <strong style={{ color: "#a5b4fc" }}>{resetEmail}</strong>
                  </p>
                  <div style={S.successBox}>✅ Reset link sent successfully</div>
                  <button className="lg-back" style={{ ...S.backBtn, textAlign: "center" }}
                    onClick={() => { setShowReset(false); setResetSent(false); setResetEmail(""); }}>
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

function Field({ label, type, value, onChange, placeholder, right, onKeyDown }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  right?: React.ReactNode; onKeyDown?: (e: React.KeyboardEvent) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={S.label}>{label}</label>
      <div style={{ position: "relative" }}>
        <input className="lg-input" type={type} value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
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
  logoRow: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "11px", marginBottom: "32px",
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
  title: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: "24px", fontWeight: 800, color: "#fff",
    letterSpacing: "-0.5px", marginBottom: "6px", textAlign: "center",
  },
  subtitle: { color: "rgba(255,255,255,0.32)", fontSize: "14px", marginBottom: "28px", textAlign: "center" },
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
  errorBox: {
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)",
    borderRadius: "12px", padding: "12px 16px", color: "#fca5a5",
    fontSize: "13.5px", marginBottom: "20px",
  },
  successBox: {
    background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.22)",
    borderRadius: "12px", padding: "12px 16px", color: "#86efac",
    fontSize: "13.5px", marginBottom: "20px", textAlign: "center",
  },
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
  forgotLink: { color: "#6366f1", cursor: "pointer", fontSize: "13px", fontWeight: 500 },
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
    cursor: "pointer", width: "100%",
  },
  footerText: { color: "rgba(255,255,255,0.25)", fontSize: "13.5px", textAlign: "center" },
  link: { color: "#818cf8", textDecoration: "underline", textDecorationColor: "rgba(129,140,248,0.3)" },
};