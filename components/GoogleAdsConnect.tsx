"use client";

import { useEffect, useState } from "react";

export default function GoogleAdsConnect() {
  const [connected, setConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [cid, setCid] = useState("");

  useEffect(() => {
    const checkConnection = async () => {
      const res = await fetch("/api/googleadsconnect");
      const data = await res.json();

      if (data.connected) {
        setConnected(true);
        setEmail(data.account.google_email || "");
        setCid(data.account.customer_id || "");
      }
    };

    checkConnection();
  }, []);

  const handleConnect = () => {
    window.location.href = "/api/google-auth";
  };

  return !connected ? (
    <button onClick={handleConnect} style={styles.btn}>
      Connect With Ads
    </button>
  ) : (
    <div style={styles.connected}>
      🟢 Connected • {email} • CID {cid}
    </div>
  );
}

const styles:any = {
  btn: {
    background: "linear-gradient(135deg,#00e5a0,#00c3ff)",
    color: "#07111f",
    border: "none",
    padding: "10px 18px",
    borderRadius: "12px",
    fontWeight: 800,
    cursor: "pointer",
  },
  connected: {
    background: "rgba(34,197,94,0.12)",
    border: "1px solid #22c55e",
    color: "#22c55e",
    padding: "10px 14px",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "12px",
  },
};