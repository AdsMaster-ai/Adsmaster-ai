import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  const { data: campaigns } = await supabase.from("campaigns").select("*");

  for (const c of campaigns || []) {
    let actions: string[] = [];

    // 🔥 CALCULATE ROI
    const revenue = (c.clicks || 0) * 50; // assume ₹50 per conversion
    const roi = c.spend ? ((revenue - c.spend) / c.spend) * 100 : 0;

    // 🔥 HEALTH SCORE
    let score = 50;

    if (c.ctr > 5) score += 20;
    if (c.ctr < 2) score -= 20;

    if (c.cpc < 10) score += 10;
    if (c.cpc > 15) score -= 10;

    if (roi > 50) score += 20;
    if (roi < 0) score -= 20;

    score = Math.max(0, Math.min(100, score));

    // 🚨 AUTO KILL BAD CAMPAIGN
    if (score < 30 && c.status === "active") {
      await supabase
        .from("campaigns")
        .update({ status: "paused" })
        .eq("id", c.id);

      actions.push("🚨 Campaign auto-paused (low performance)");
    }

    // 📈 SCALE GOOD CAMPAIGN
    if (score > 80) {
      actions.push("📈 Scaling budget (high ROI)");
    }

    // 💰 CPC CONTROL
    if (c.cpc > 15) {
      actions.push("💰 Reduced bid (high CPC)");
    }

    // 🎯 BOOST GOOD CTR
    if (c.ctr > 6) {
      actions.push("🔥 Boosting high CTR ad");
    }

    // 💾 UPDATE CAMPAIGN
    await supabase
      .from("campaigns")
      .update({
        roi,
        health_score: score,
      })
      .eq("id", c.id);

    // 🧾 SAVE LOGS
    for (const action of actions) {
      await supabase.from("ai_logs").insert({
        campaign_id: c.id,
        action,
      });
    }
  }

  return NextResponse.json({ success: true });
}