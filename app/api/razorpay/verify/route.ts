import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // later: verify signature (for now simple)
  return NextResponse.json({ success: true });
}