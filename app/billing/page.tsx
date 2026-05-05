"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function BillingPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const user = await supabase.auth.getUser();

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.data.user?.id)
      .single();

    setProfile(data);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "30px", width: "100%" }}>
        <h1 style={{ color: "#00f3ff" }}>Billing & Plans</h1>

        {profile && (
          <div style={card}>
            <p>Plan: {profile.plan}</p>
            <p>Campaign Limit: {profile.campaign_limit}</p>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <button style={btn}>Upgrade ₹499</button>
          <button style={btn}>Upgrade ₹999</button>
        </div>
      </div>
    </div>
  );
}

const card = {
  padding: "20px",
  background: "#0a0a0a",
  borderRadius: "10px",
};

const btn = {
  marginTop: "10px",
  marginRight: "10px",
  padding: "12px 20px",
  background: "#00f3ff",
  border: "none",
  borderRadius: "8px",
};