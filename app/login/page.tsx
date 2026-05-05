"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Email aur password daalo"); return; }
    setLoading(true);
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message === "Invalid login credentials"
        ? "Email ya password galat hai"
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
        scopes: [
          "email", "profile",
          "https://www.googleapis.com/auth/adwords",
          "https://www.googleapis.com/auth/analytics",
          "https://www.googleapis.com/auth/analytics.readonly",
        ].join(" "),
      },
    });
  };

  const handleReset = async () => {
    if (!resetEmail) { setError("Email daalo"); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) { setError(error.message); return; }
    setResetSent(true);
  };

  return (
    <div style={styles.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');`}</style>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoRow}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#6366f1" />
              <path d="M8 22L14 10L20 18L24 14" stroke="white" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="24" cy="14" r="2.5" fill="#a5f3fc" />
            </svg>
            <span style={styles.logoText}>AdsMaster AI</span>
          </div>
          <h2 style={styles.title}>
            {showReset ? "Password Reset" : "Wapas Aao!"}
          </h2>
          <p style={styles.subtitle}>
            {showReset
              ? "Email pe reset link bhejenge"
              : "Apne account mein login karo"}
          </p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}
        {resetSent && (
          <div style={styles.successBox}>
            ✅ Reset link bhej diya! Email check karo.
          </div>
        )}

        {!showReset ? (
          <>
            <FocusInput label="Email Address" type="email" value={email}
              onChange={setEmail} placeholder="aap@example.com" />
            <FocusInput label="Password" type="password" value={password}
              onChange={setPassword} placeholder="Apna password daalo" />

            <div style={{ textAlign: "right", marginBottom: "20px", marginTop: "-8px" }}>
              <span style={styles.link} onClick={() => setShowReset(true)}>
                Password bhool gaye?
              </span>
            </div>

            <button
              style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Login ho raha hai..." : "Login Karo →"}
            </button>

            <div style={styles.dividerRow}>
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>ya</span>
              <div style={styles.dividerLine} />
            </div>

            <button style={styles.googleBtn} onClick={handleGoogle}>
              <GoogleIcon />
              Google se Login karo
            </button>

            <p style={styles.bottomText}>
              Account nahi hai?{" "}
              <span style={styles.link} onClick={() => router.push("/signup")}>
                Sign Up karo
              </span>
            </p>
          </>
        ) : (
          <>
            <FocusInput label="Apna Email" type="email" value={resetEmail}
              onChange={setResetEmail} placeholder="aap@example.com" />
            <button style={styles.btn} onClick={handleReset}>
              Reset Link Bhejo
            </button>
            <p style={styles.bottomText}>
              <span style={styles.link} onClick={() => setShowReset(false)}>
                ← Wapas Login pe
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function FocusInput({ label, type, value, onChange, placeholder }: any) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={styles.label}>{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...styles.input,
          borderColor: focused ? "#6366f1" : "rgba(99,102,241,0.25)",
          boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
        }}
      />
    </div>
  );
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
    <path d="M14.5 8.16c0-.5-.04-.87-.13-1.25H8v2.27h3.7c-.08.63-.5 1.58-1.44 2.22l2.33 1.8c1.36-1.26 2.15-3.1 2.15-5.04z" fill="#4285F4" />
    <path d="M8 15c1.85 0 3.4-.6 4.54-1.64l-2.33-1.8c-.6.41-1.4.7-2.21.7-1.7 0-3.13-1.12-3.64-2.66L1.9 11.4C3.03 13.64 5.35 15 8 15z" fill="#34A853" />
    <path d="M4.36 10.6A4.44 4.44 0 0 1 4.1 9c0-.56.1-1.1.26-1.6L2.04 5.7A7.51 7.51 0 0 0 1.2 9c0 1.2.29 2.34.8 3.3l2.36-1.7z" fill="#FBBC05" />
    <path d="M8 3.74c1.2 0 2.01.52 2.47.95l1.8-1.76C11.4 1.89 9.85 1.2 8 1.2 5.35 1.2 3.03 2.56 1.9 4.8l2.46 1.9C4.87 5.08 6.3 3.74 8 3.74z" fill="#EA4335" />
  </svg>
);

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at top, #0d0d1f 0%, #07070f 70%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "20px", fontFamily: "'Sora', 'DM Sans', sans-serif",
  },
  card: {
    background: "rgba(15, 15, 28, 0.95)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "20px", padding: "36px 32px",
    width: "100%", maxWidth: "420px",
    boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
  },
  header: { textAlign: "center", marginBottom: "28px" },
  logoRow: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "10px", marginBottom: "16px",
  },
  logoText: {
    fontSize: "20px", fontWeight: 700,
    background: "linear-gradient(90deg, #a5b4fc, #6366f1, #38bdf8)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  title: { color: "white", fontSize: "22px", fontWeight: 700, marginBottom: "6px" },
  subtitle: { color: "#64748b", fontSize: "14px" },
  errorBox: {
    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "10px", padding: "12px 14px", color: "#fca5a5",
    fontSize: "13px", marginBottom: "16px",
  },
  successBox: {
    background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
    borderRadius: "10px", padding: "12px 14px", color: "#86efac",
    fontSize: "13px", marginBottom: "16px",
  },
  label: { display: "block", color: "#94a3b8", fontSize: "13px", marginBottom: "6px", fontWeight: 500 },
  input: {
    width: "100%", padding: "11px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: "10px", color: "white",
    fontSize: "14px", outline: "none",
    transition: "all 0.2s ease", boxSizing: "border-box",
  },
  btn: {
    width: "100%", padding: "13px",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "white", border: "none", borderRadius: "10px",
    cursor: "pointer", fontWeight: 700, fontSize: "15px",
    fontFamily: "'Sora', sans-serif",
    boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
    marginBottom: "14px",
  },
  googleBtn: {
    width: "100%", padding: "12px",
    background: "rgba(255,255,255,0.05)",
    color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px", cursor: "pointer", fontWeight: 600,
    fontSize: "14px", fontFamily: "'Sora', sans-serif",
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "10px",
    marginBottom: "16px",
  },
  dividerRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" },
  dividerLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" },
  dividerText: { color: "#475569", fontSize: "12px" },
  link: { color: "#6366f1", cursor: "pointer", fontSize: "13px" },
  bottomText: { color: "#475569", fontSize: "13px", textAlign: "center" },
};