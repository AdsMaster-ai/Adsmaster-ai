import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  // Simulate evolving metrics for SaaS feel
  const mockMetrics = {
    roas: (Math.random() * 2 + 3).toFixed(1),
    clicks: campaigns?.reduce((acc, c) => acc + c.clicks, 0) || 0,
    // ... other metrics
  };

  return NextResponse.json({ campaigns, metrics: mockMetrics });
}