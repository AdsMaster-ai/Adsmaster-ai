// adsmaster-ai/app/api/ads/campaigns/route.ts
// GET  → returns live campaigns from Ads API
// DELETE → disconnects account (clears cookies)

import { NextRequest, NextResponse } from "next/server";
import { cookies }                   from "next/headers";


const CUSTOMER_ID = process.env.ADS_CUSTOMER_ID ?? "2357727388";

// ── GET /api/ads/campaigns ────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const jar          = await cookies();
    const refreshToken = jar.get("ads_refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Not authenticated. Connect your Ads account first." },
        { status: 401 }
      );
    }

    // Allow overriding customerId via ?customerId=xxx
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId") ?? CUSTOMER_ID;

    // Get fresh access token
    const accessToken = await refreshAccessToken(refreshToken);

    // Fetch campaigns
    const campaigns = await fetchCampaigns(accessToken, customerId);

    return NextResponse.json({
      ok:              true,
      customerId,
      fetchedAt:       new Date().toISOString(),
      totalCampaigns:  campaigns.length,
      campaigns,
    });

  } catch (err: any) {
    console.error("[ads/campaigns GET]", err.message);
    return NextResponse.json(
      { error: err.message ?? "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

// ── DELETE /api/ads/campaigns → disconnect ────────────────────

export async function DELETE() {
  try {
    const jar = await cookies();
    jar.delete("ads_refresh_token");
    jar.delete("ads_account");
    return NextResponse.json({ ok: true, message: "Disconnected successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}