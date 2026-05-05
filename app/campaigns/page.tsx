"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";


export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const user = await supabase.auth.getUser();

    const { data } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", user.data.user?.id);

    setCampaigns(data || []);
  };

  const toggleStatus = async (id: string, status: string) => {
    const newStatus = status === "active" ? "paused" : "active";

    await supabase
      .from("campaigns")
      .update({ status: newStatus })
      .eq("id", id);

    fetchCampaigns();
  };

  return (
    <div style={{ display: "flex" }}>
  

      <div style={{ padding: "30px", width: "100%" }}>
        <h1 style={{ color: "#00f3ff" }}>My Campaigns</h1>

        {campaigns.map((c) => (
          <div key={c.id} style={card}>
            <h3>{c.website_url}</h3>

            <p>Status: {c.status}</p>

            <button
              onClick={() => toggleStatus(c.id, c.status)}
              style={btn}
            >
              {c.status === "active" ? "Pause" : "Resume"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const card = {
  marginTop: "15px",
  padding: "20px",
  background: "#0a0a0a",
  borderRadius: "10px",
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  background: "#bc13fe",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};