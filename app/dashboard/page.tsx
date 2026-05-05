"use client";

import { useEffect, useState } from "react";
import { supabase } from "./../../lib/supabaseClient";

import MetricsGrid from "../../components/MetricsGrid";
import CampaignTable from "../../components/CampaignTable";
import PerformanceChart from "../../components/PerformanceChart";
import DashBoardNavbar from "../../components/DashBoardNavbar";

type Campaign = {
  id: string;
  name: string;
  status: string;
};

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {

    // Google Ads connected cookie -> localStorage save
    if (document.cookie.includes("gads_connected=true")) {
      const emailMatch = document.cookie.match(/gads_email=([^;]+)/);
      const cidMatch = document.cookie.match(/gads_cid=([^;]+)/);

      localStorage.setItem("gads_connected", "true");
      localStorage.setItem("gads_email", emailMatch ? decodeURIComponent(emailMatch[1]) : "");
      localStorage.setItem("gads_cid", cidMatch ? decodeURIComponent(cidMatch[1]) : "");
    }

    fetchCampaigns();

    const channel = supabase
      .channel("realtime-campaigns")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "campaigns" },
        () => fetchCampaigns()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCampaigns = async () => {
    const { data } = await supabase.from("campaigns").select("*");
    setCampaigns(data || []);
  };

  const chartData = {
    labels: ["Active", "Paused"],
    datasets: [
      {
        data: [8, 2],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <DashBoardNavbar />

           <MetricsGrid />

      <div style={styles.row}>
        <CampaignTable campaigns={campaigns} onRefresh={fetchCampaigns} />
     



     
      </div>

      <div style={{ marginTop: "20px" }}>
        <PerformanceChart/>
      </div>

        </div>
  );
}

const styles = {
  container: {
    padding: "25px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
    marginTop:"50px",
    fontFamily: "Inter, sans-serif",
  },
  title: {
    fontSize: "30px",
    marginBottom: "20px",
    marginTop: "20px",
  },
  row: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    alignItems: "flex-start",
  },
};