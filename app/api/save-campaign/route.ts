import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase
    .from('campaigns')
    .insert([{
      ...body,
      impressions: 0,
      clicks: 0,
      spend: 0,
      status: 'Active',
      created_at: new Date()
    }]);

  return NextResponse.json({ success: !error, data });
}

export async function PATCH(req: Request) {
    const { id, status } = await req.json();
    const { error } = await supabase
      .from('campaigns')
      .update({ status })
      .eq('id', id);
    return NextResponse.json({ success: !error });
}