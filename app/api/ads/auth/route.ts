// adsmaster-ai/app/api/ads/auth/route.ts
// Step 1: Redirect user to OAuth consent screen

import { NextResponse } from "next/server";
import { buildAuthUrl } from "@/lib/googleAds";

export async function GET() {
  try {
    const url = buildAuthUrl();
    return NextResponse.redirect(url);
  } catch (err: any) {
    console.error("[ads/auth]", err.message);
    return NextResponse.json(
      { error: "Check ADS_CLIENT_ID and ADS_REDIRECT_URI in .env.local" },
      { status: 500 }
    );
  }
}