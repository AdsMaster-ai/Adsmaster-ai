"use client";

import { useEffect, useState } from "react";
import { supabase } from "./../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthDropdown() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setOpen(false);
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;
    const { error } = await supabase.rpc("delete_user");
    if (error) {
      alert("Error deleting account: " + error.message);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "#6c47ff",
          color: "white",
          border: "none",
          padding: "8px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        {user ? user.email?.split("@")[0] : "Settings"} ▾
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "110%",
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: "12px",
            minWidth: "220px",
            zIndex: 1000,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            padding: "8px 0",
          }}
        >
          {!user ? (
            <>
              <DropItem
                label="Pricing"
                icon="💰"
                onClick={() => { router.push("/pricing"); setOpen(false); }}
              />
              <DropItem
                label="Sign Up"
                icon="👤"
                onClick={() => { router.push("/signup"); setOpen(false); }}
              />
              <DropItem
                label="Login"
                icon="🔑"
                onClick={() => { router.push("/login"); setOpen(false); }}
              />
              <DropItem
                label="Login with Google"
                icon="🟢"
                onClick={handleGoogleLogin}
              />
            </>
          ) : (
            <>
              <DropItem
                label="Pricing"
                icon="💰"
                onClick={() => { router.push("/pricing"); setOpen(false); }}
              />
              <div style={{ borderTop: "1px solid #333", margin: "6px 0" }} />
              <DropItem
                label="Logout"
                icon="🚪"
                onClick={handleLogout}
              />
              <DropItem
                label="Delete Account"
                icon="🗑️"
                onClick={handleDeleteAccount}
                color="#ff4444"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DropItem({
  label,
  icon,
  onClick,
  color,
}: {
  label: string;
  icon: string;
  onClick: () => void;
  color?: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px 20px",
        cursor: "pointer",
        color: color || "white",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "transparent")
      }
    >
      <span>{icon}</span>
      {label}
    </div>
  );
}