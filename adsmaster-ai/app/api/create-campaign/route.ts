import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("Saving campaign:", body); // 👈 debug

  const { data, error } = await supabase
    .from("campaigns")
    .insert([{
      ...body,
      created_at: new Date().toISOString(),
      status: "active",
    }])
    .select();

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ success: true, data });
}