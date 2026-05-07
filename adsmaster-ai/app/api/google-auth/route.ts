import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/google-callback`;

  const scope = encodeURIComponent(
    "openid email profile https://www.googleapis.com/auth/adwords"
  );

  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `access_type=offline&` +
    `prompt=consent&` +
    `scope=${scope}`;

  return NextResponse.redirect(authUrl);
}