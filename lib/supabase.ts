import { createClient } from "@supabase/supabase-js"

// Vite ka import.meta.env hata kar Next.js ka process.env use karein
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── DATABASE FUNCTIONS ───────────────────────────────────────────────────────

export async function saveCampaign(data: Record<string, unknown>) {
  const { data: result, error } = await supabase
    .from("campaigns")
    .insert({
      website_url:     data.websiteUrl,
      campaign_goal:   data.campaignGoal,
      business_type:   data.businessType,
      target_city:     data.targetCity,
      daily_budget:    data.dailyBudget,
      campaign_name:   data.campaignName,
      headlines:       data.headlines,      // jsonb array
      descriptions:    data.descriptions,   // jsonb array
      display_url:     data.displayUrl,
      final_url:       data.finalUrl,
      goal_config:     data.goalConfig,     // jsonb
      keywords:        data.keywords,       // jsonb array
      neg_keywords:    data.negKeywords,    // jsonb array
      targeting:       data.targeting,      // jsonb
      status:          "live",
      created_at:      new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getCampaigns() {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateCampaignStatus(id: string, status: "live" | "paused" | "deleted") {
  const { error } = await supabase
    .from("campaigns")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}