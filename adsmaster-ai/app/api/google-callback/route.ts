import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      console.log("NO CODE RETURNED");
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?google=failed`);
    }

    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/google-callback`;

    // ================= TOKEN EXCHANGE =================
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    console.log("TOKEN DATA:", tokenData);

    if (!tokenData.access_token) {
      console.log("TOKEN FAILED");
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?google=tokenfailed`);
    }

    const access_token = tokenData.access_token;
    const refresh_token = tokenData.refresh_token || "";

    // ================= GOOGLE PROFILE =================
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const profile = await profileRes.json();
    console.log("PROFILE:", profile);

    // ================= GOOGLE ADS CID FETCH =================
    let customer_id = "0000000000";

    try {
      const adsRes = await fetch(
        "https://googleads.googleapis.com/v16/customers:listAccessibleCustomers",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
          },
        }
      );

      const adsData = await adsRes.json();
      console.log("ADS DATA:", adsData);

      if (adsData.resourceNames && adsData.resourceNames.length > 0) {
        customer_id = adsData.resourceNames[0].split("/")[1];
      }
    } catch (adsErr) {
      console.log("ADS FETCH FAILED:", adsErr);
    }

    // ================= SUPABASE SAVE =================
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // pehle old connected rows disable
    await supabase
      .from("google_ads_tokens")
      .update({ connected: false })
      .eq("connected", true);

    const { error: saveError } = await supabase
      .from("google_ads_tokens")
      .insert({
        google_email: profile.email || "",
        google_name: profile.name || "",
        google_picture: profile.picture || "",
        access_token,
        refresh_token,
        customer_id,
        scope: tokenData.scope || "",
        token_type: tokenData.token_type || "",
        expires_in: tokenData.expires_in || 0,
        connected: true,
        sync_status: "connected",
        developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
      });

    if (saveError) {
      console.log("SUPABASE SAVE ERROR:", saveError);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?google=dberror`);
    }

    console.log("GOOGLE ADS CONNECT SUCCESS");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?google=success`);

  } catch (err) {
    console.log("GOOGLE CALLBACK FATAL:", err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?google=fatal`);
  }
}