"use client";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import GoogleAdsConnect from "../components/GoogleAdsConnect";

// ── Icon Components ──────────────────────────────────────────────
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#6366f1" />
    <path d="M8 22L14 10L20 18L24 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="14" r="2.5" fill="#a5f3fc" />
  </svg>
);

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const icons = {
  pricing: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v6M6 7h3a1 1 0 0 1 0 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  signup: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3v4M10 5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  login: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  google: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M14.5 8.16c0-.5-.04-.87-.13-1.25H8v2.27h3.7c-.08.63-.5 1.58-1.44 2.22l2.33 1.8c1.36-1.26 2.15-3.1 2.15-5.04z" fill="#4285F4" />
      <path d="M8 15c1.85 0 3.4-.6 4.54-1.64l-2.33-1.8c-.6.41-1.4.7-2.21.7-1.7 0-3.13-1.12-3.64-2.66L1.9 11.4C3.03 13.64 5.35 15 8 15z" fill="#34A853" />
      <path d="M4.36 10.6A4.44 4.44 0 0 1 4.1 9c0-.56.1-1.1.26-1.6L2.04 5.7A7.51 7.51 0 0 0 1.2 9c0 1.2.29 2.34.8 3.3l2.36-1.7z" fill="#FBBC05" />
      <path d="M8 3.74c1.2 0 2.01.52 2.47.95l1.8-1.76C11.4 1.89 9.85 1.2 8 1.2 5.35 1.2 3.03 2.56 1.9 4.8l2.46 1.9C4.87 5.08 6.3 3.74 8 3.74z" fill="#EA4335" />
    </svg>
  ),
  logout: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 2H13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 11L3 8l3-3M3 8h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  delete: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export default function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropOpen(false);
    router.push("/");
    router.refresh();
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Pakka delete karna hai apna account? Yeh action undo nahi hoga!")) return;
    setLoadingDelete(true);
    try {
      const { error } = await supabase.rpc("delete_user");
      if (error) throw error;
      await supabase.auth.signOut();
      setUser(null);
      setDropOpen(false);
      router.push("/");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleGoogleLogin = async () => {
    setDropOpen(false);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
  };

  const handleMenuClick = (id: string) => {
    setDropOpen(false);
    if (id === "pricing") router.push("/pricing");
    else if (id === "signup") router.push("/signup");
    else if (id === "login") router.push("/login");
    else if (id === "google") handleGoogleLogin();
    else if (id === "logout") handleLogout();
    else if (id === "delete") handleDeleteAccount();
  };

  const menuItems = user
    ? [
        {
          id: "userinfo",
          label: user.email?.split("@")[0] ?? "Account",
          icon: icons.user,
          isInfo: true,
        },
        { id: "divider1" },
        { id: "pricing", label: "Pricing", icon: icons.pricing },
        { id: "divider2" },
        { id: "logout", label: "Logout", icon: icons.logout, danger: false },
        { id: "delete", label: loadingDelete ? "Deleting..." : "Delete Account", icon: icons.delete, danger: true },
      ]
    : [
        { id: "pricing", label: "Pricing", icon: icons.pricing },
        { id: "signup", label: "Sign Up", icon: icons.signup },
        { id: "login", label: "Login", icon: icons.login },
        { id: "google", label: "Login with Google", icon: icons.google },
      ];

  const s = {
    nav: {
      position: "fixed" as const,
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      background: "rgba(10, 10, 18, 0.88)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(99, 102, 241, 0.18)",
      boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
    },
    left: {
      display: "flex", alignItems: "center", gap: "10px",
      cursor: "pointer", textDecoration: "none" as const,
    },
    logoText: {
      fontFamily: "'Sora', 'DM Sans', sans-serif",
      fontWeight: 800,
      fontSize: "20px",
      letterSpacing: "-0.5px",
      background: "linear-gradient(90deg, #818cf8 0%, #6366f1 40%, #a78bfa 70%, #38bdf8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    
    right: {
      display: "flex", alignItems: "center", gap: "10px",
      position: "relative" as const,
    },
    
    // ── Dashboard Button ──
    dashboardBtn: {
      display: "flex", alignItems: "center", gap: "7px",
      padding: "8px 16px", borderRadius: "10px",
      border: "1px solid rgba(99,102,241,0.35)",
      background: hovered === "dashboard"
        ? "rgba(99,102,241,0.2)"
        : "rgba(99,102,241,0.08)",
      color: hovered === "dashboard" ? "#c7d2fe" : "#94a3b8",
      fontFamily: "'Sora', 'DM Sans', sans-serif",
      fontSize: "13.5px", fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      outline: "none",
      letterSpacing: "0.01em",
      textDecoration: "none" as const,
    },
    settingsBtn: {
      display: "flex", alignItems: "center", gap: "7px",
      padding: "8px 16px", borderRadius: "10px",
      border: "1px solid rgba(99,102,241,0.4)",
      background: dropOpen
        ? "rgba(99,102,241,0.18)"
        : hovered === "settings"
        ? "rgba(99,102,241,0.12)"
        : "rgba(99,102,241,0.07)",
      color: "#c7d2fe",
      fontFamily: "'Sora', 'DM Sans', sans-serif",
      fontSize: "14px", fontWeight: 600,
      cursor: "pointer", transition: "all 0.2s ease",
      outline: "none", letterSpacing: "0.01em",
    },
    dropdown: {
      position: "absolute" as const,
      top: "calc(100% + 10px)",
      right: 0,
      minWidth: "220px",
      background: "rgba(13, 13, 24, 0.98)",
      border: "1px solid rgba(99,102,241,0.22)",
      borderRadius: "14px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08)",
      overflow: "hidden" as const,
      transformOrigin: "top right",
      animation: "dropIn 0.2s cubic-bezier(0.16,1,0.3,1)",
      padding: "6px",
    },
    menuItem: (danger: boolean, isHovered: boolean, isInfo: boolean) => ({
      display: "flex", alignItems: "center", gap: "10px",
      padding: "10px 12px", borderRadius: "9px",
      cursor: isInfo ? "default" : "pointer",
      color: isInfo
        ? "#6366f1"
        : danger
        ? isHovered ? "#fca5a5" : "#f87171"
        : isHovered ? "#e0e7ff" : "#a1adc4",
      background: isInfo
        ? "rgba(99,102,241,0.08)"
        : danger && isHovered
        ? "rgba(239,68,68,0.12)"
        : !danger && isHovered
        ? "rgba(99,102,241,0.12)"
        : "transparent",
      fontFamily: "'Sora', 'DM Sans', sans-serif",
      fontSize: "13.5px", fontWeight: isInfo ? 600 : 500,
      transition: "all 0.15s ease",
      userSelect: "none" as const,
      marginBottom: isInfo ? "2px" : "0",
    }),
    divider: {
      height: "1px",
      background: "rgba(99,102,241,0.15)",
      margin: "4px 0",
    },
    iconBox: (danger: boolean, isHovered: boolean) => ({
      display: "flex", alignItems: "center", justifyContent: "center",
      width: "28px", height: "28px", borderRadius: "7px",
      background: danger && isHovered
        ? "rgba(239,68,68,0.18)"
        : danger
        ? "rgba(239,68,68,0.1)"
        : isHovered
        ? "rgba(99,102,241,0.2)"
        : "rgba(99,102,241,0.08)",
      flexShrink: 0 as const,
      transition: "background 0.15s ease",
    }),
    userDot: {
      width: "8px", height: "8px", borderRadius: "50%",
      background: "#22c55e",
      display: "inline-block",
      marginLeft: "4px",
      boxShadow: "0 0 6px #22c55e",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.96) translateY(-6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07070f; min-height: 100vh; }
      `}</style>

      <nav style={s.nav}>
        {/* LEFT: Logo */}
        <a href="/" style={s.left}>
          <Logo />
          <span style={{ display: "flex", alignItems: "flex-start", gap: "3px" }}>
            <span style={s.logoText}>AdsMaster</span>
                    </span>
        </a>

        {/* RIGHT: Dashboard + Settings Dropdown */}
        <div style={s.right} ref={dropRef}>
<GoogleAdsConnect />
          {/* ── Dashboard Button ── */}
          <a
            href="/dashboard"
            style={s.dashboardBtn}
            onMouseEnter={() => setHovered("dashboard")}
            onMouseLeave={() => setHovered(null)}
          >
            {icons.dashboard}
            Dashboard
          </a>

          {/* ── Settings / Account Dropdown ── */}
          <button
            style={s.settingsBtn}
            onClick={() => setDropOpen((v) => !v)}
            onMouseEnter={() => setHovered("settings")}
            onMouseLeave={() => setHovered(null)}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="2.5" stroke="#a5b4fc" strokeWidth="1.6" />
              <path
                d="M10 2.5v1.2M10 16.3v1.2M2.5 10h1.2M16.3 10h1.2M4.6 4.6l.85.85M14.55 14.55l.85.85M4.6 15.4l.85-.85M14.55 5.45l.85-.85"
                stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round"
              />
            </svg>
            {user ? (
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {user.email?.split("@")[0]}
                <span style={s.userDot} />
              </span>
            ) : (
              "Settings"
            )}
            <ChevronDown open={dropOpen} />
          </button>

          {dropOpen && (
            <div style={s.dropdown}>
              {menuItems.map((item: any) =>
                item.id.startsWith("divider") ? (
                  <div key={item.id} style={s.divider} />
                ) : (
                  <div
                    key={item.id}
                    style={s.menuItem(
                      item.danger ?? false,
                      hovered === `menu-${item.id}`,
                      item.isInfo ?? false
                    )}
                    onMouseEnter={() => !item.isInfo && setHovered(`menu-${item.id}`)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => !item.isInfo && handleMenuClick(item.id)}
                  >
                    <span style={s.iconBox(item.danger ?? false, hovered === `menu-${item.id}`)}>
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                )
              )}
            </div>
          )}
        </div>
    
              </nav>
    </>
  );
}