"use client";

import Sidebar from "../../components/Sidebar";
import { supabase } from "../../lib/supabaseClient";

export default function SettingsPage() {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "30px", width: "100%" }}>
        <h1 style={{ color: "#00f3ff" }}>Settings</h1>

        <button onClick={logout} style={btn}>
          Logout
        </button>
      </div>
    </div>
  );
}

const btn = {
  marginTop: "20px",
  padding: "12px 20px",
  background: "red",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
};