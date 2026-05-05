'use client';
// components/Step6Launch.tsx  (ya .jsx — jo aapke paas hai)
// ──────────────────────────────────────────────────────────
// Fixed: API route call karta hai, direct Supabase nahi
// ──────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "../../../lib/supabaseClient";

export default function Step6Launch({ data, prevStep }: any) {
  const router = useRouter();
  const [isLaunching, setIsLaunching] = useState(false);
  const [status, setStatus]           = useState<string | null>(null);
  const [isError, setIsError]         = useState(false);
  const [mounted, setMounted]         = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // ── Launch Handler ─────────────────────────────────────
  const handleLaunch = async () => {
    setIsLaunching(true);
    setIsError(false);
    setStatus('🚀 Saving & Syncing with Google Ads...');

    const { data : {session } } = await supabase.auth.getSession();
    if(!session){
      setIsError(true);
      setStatus(`❌ Please log in to your account before launching the campaign.`);
      setIsLaunching(false);
      return;
    }

    try {
        const res = await fetch('/api/launch-campaign', {
        method:  'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
},
        body: JSON.stringify({
          campaign_name:         data.campaignName    || 'Unnamed Campaign',
          website_url:           data.websiteUrl,
          goal:                  data.goal,
          business_type:         data.businessType,
          budget:                Number(data.dailyBudget) || 0,
          target_city:           data.targetCity,
          display_url:           data.displayUrl,
          final_url:             data.finalUrl,
          headlines:             data.headlines             || [],
          descriptions:          data.descriptions          || [],
          keywords:              data.keywords              || [],
          negative_keywords:     data.negativeKeywords      || [],
          age_ranges:            data.ageRanges             || [],
          device_targeting:      data.device || data.callDevice,
          schedule_days:         data.scheduleDays          || [],
          ad_start_time:         data.adStartTime,
          ad_end_time:           data.adEndTime,
          language:              data.language,
          lead_fields:           data.leadFields            || [],
          custom_lead_questions: data.customLeadQuestions,
          thank_you_message:     data.thankYouMessage,
          leads_email:           data.leadsEmail,
          phone_number:          data.phoneNumber || data.extensionPhoneNumber,
          call_timing:           data.callTiming,
          call_start_time:       data.startTime,
          call_end_time:         data.endTime,
          call_conversion_type:  data.callConversionType,
          call_reporting:        data.callReporting ?? true,
          whatsapp_number:       data.whatsappNumber,
          whatsapp_message:      data.whatsappMessage,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      // Success
      const isTestFallback = result.google_sync_status === 'test_fallback';
      setStatus(
        isTestFallback
          ? `✅ Campaign Saved! (Test Account: ${result.google_campaign_id})`
          : `✅ Launched! Google Ads ID: ${result.google_campaign_id}`
      );

      // Redirect to dashboard after 2.2s
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh(); // Force dashboard to refetch
      }, 2200);

    } catch (err: any) {
      console.error(err);
      setIsError(true);
      setStatus(`❌ ${err.message}`);
      setIsLaunching(false);
    }
  };

  // ── Ad Preview Values ──────────────────────────────────
  const previewHeadlines = data.headlines?.filter(Boolean).slice(0, 3).join(' | ')
    || 'Your High Converting Headline | Book Now';
  const previewDesc = data.descriptions?.filter(Boolean).slice(0, 2).join(' ')
    || 'We provide the best services in your city. Contact us today.';
  const previewUrl = data.displayUrl
    || data.websiteUrl?.replace(/^https?:\/\//, '')
    || 'www.yourwebsite.com/offer';

  // ── Render ─────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        :root {
          --gold: #c9a84c; --gold-light: #e8c96a;
          --gold-dim: rgba(201,168,76,0.18); --gold-glow: rgba(201,168,76,0.35);
          --surface: #0d1017; --surface-2: #13181f; --surface-3: #191f28;
          --border: rgba(201,168,76,0.12); --border-hover: rgba(201,168,76,0.3);
          --text-primary: #f0ede8; --text-secondary: #8a8f9a; --text-muted: #4a5060;
          --green: #22c97a; --blue: #4da8f7; --pink: #f06292; --purple: #a78bfa;
          --font-display: 'Syne', sans-serif; --font-body: 'DM Sans', sans-serif;
        }

        .s6-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .s6-root {
          font-family: var(--font-body); background: var(--surface);
          min-height: 100vh; padding: 3rem 2.5rem;
          color: var(--text-primary); position: relative; overflow: hidden;
        }
        .s6-root::before {
          content: ''; position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none; z-index: 0;
        }
        .s6-root::after {
          content: ''; position: fixed; top: -30%; left: 50%;
          transform: translateX(-50%); width: 800px; height: 500px;
          background: radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .s6-content {
          position: relative; z-index: 1; max-width: 1300px;
          margin: 0 auto; display: flex; flex-direction: column; gap: 2.5rem;
        }
        .s6-header {
          text-align: center; opacity: 0; transform: translateY(-20px);
          animation: fadeSlideDown 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
        }
        .s6-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-display); font-size: 0.7rem; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: var(--gold);
          background: var(--gold-dim); border: 1px solid var(--border);
          padding: 6px 18px; border-radius: 100px; margin-bottom: 1.5rem;
        }
        .s6-eyebrow::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); box-shadow: 0 0 8px var(--gold);
          animation: pulse-dot 1.8s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
        .s6-title {
          font-family: var(--font-display); font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 800; letter-spacing: -2px; line-height: 1.05; color: var(--text-primary);
        }
        .s6-title span {
          background: linear-gradient(135deg, var(--gold-light), var(--gold), #a0722a);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .s6-subtitle {
          color: var(--text-secondary); font-size: 1rem; font-weight: 300;
          margin-top: 14px; letter-spacing: 0.3px; line-height: 1.6;
        }
        .s6-divider {
          display: flex; align-items: center; gap: 16px;
          opacity: 0; animation: fadeIn 0.5s ease 0.3s forwards;
        }
        .s6-divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); }
        .s6-divider-label {
          font-family: var(--font-display); font-size: 0.65rem; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase; color: var(--text-muted);
        }
        .s6-ad-preview {
          background: var(--surface-2); border: 1px solid var(--border); border-radius: 20px;
          padding: 2.5rem; position: relative; overflow: hidden;
          opacity: 0; animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s forwards;
        }
        .s6-ad-preview::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
          border-radius: 20px 20px 0 0;
        }
        .s6-ad-badge {
          font-family: var(--font-display); font-size: 0.62rem; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold);
          margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px;
        }
        .s6-ad-badge::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .s6-google-mockup { background: #202124; border-radius: 12px; padding: 1.8rem 2rem; border: 1px solid #2d3038; }
        .s6-ad-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .s6-ad-tag { font-size: 0.7rem; font-weight: 700; color: #202124; background: #e8c96a; padding: 2px 7px; border-radius: 3px; }
        .s6-ad-url { color: #bdc1c6; font-size: 0.875rem; }
        .s6-ad-headline { color: #8ab4f8; font-size: 1.35rem; font-weight: 400; line-height: 1.4; display: block; margin-bottom: 10px; }
        .s6-ad-desc { color: #bdc1c6; font-size: 0.9rem; line-height: 1.65; }
        .s6-call-ext { margin-top: 16px; padding-top: 16px; border-top: 1px solid #2d3038; }
        .s6-call-link { color: #8ab4f8; font-size: 0.9rem; display: flex; align-items: center; gap: 7px; }
        .s6-cards {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
          opacity: 0; animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s forwards;
        }
        @media (max-width: 900px) { .s6-cards { grid-template-columns: 1fr; } }
        .s6-card {
          background: var(--surface-2); border: 1px solid var(--border); border-radius: 20px;
          padding: 2rem; position: relative; overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .s6-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
        .s6-card-gold { border-top: 2px solid var(--gold); }
        .s6-card-blue { border-top: 2px solid var(--blue); }
        .s6-card-green { border-top: 2px solid var(--green); }
        .s6-card-title {
          font-family: var(--font-display); font-size: 0.68rem; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 1.5rem;
          padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .s6-card-title-gold { color: var(--gold); }
        .s6-card-title-blue { color: var(--blue); }
        .s6-card-title-green { color: var(--green); }
        .s6-row {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,0.04); gap: 12px;
        }
        .s6-row:last-child { border-bottom: none; padding-bottom: 0; }
        .s6-label { color: var(--text-secondary); font-size: 0.82rem; white-space: nowrap; flex-shrink: 0; }
        .s6-value { color: var(--text-primary); font-size: 0.88rem; font-weight: 600; text-align: right; line-height: 1.4; word-break: break-word; }
        .s6-value-gold { color: var(--gold-light); }
        .s6-value-green { color: var(--green); }
        .s6-value-blue { color: var(--blue); }
        .s6-value-purple { color: var(--purple); }
        .s6-value-upper { text-transform: uppercase; letter-spacing: 0.8px; font-size: 0.78rem; }
        .s6-value-price { font-size: 1.05rem; font-family: var(--font-display); }
        .s6-launch-wrap { opacity: 0; animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.75s forwards; }
        .s6-launch-box {
          background: var(--surface-2); border: 1px solid var(--border); border-radius: 24px;
          padding: 3rem; text-align: center; position: relative; overflow: hidden;
        }
        .s6-launch-box::before {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 200px;
          background: radial-gradient(ellipse at 50% 120%, rgba(34,201,122,0.08), transparent 70%);
          pointer-events: none;
        }
        .s6-launch-btn {
          position: relative; width: 100%; max-width: 560px;
          font-family: var(--font-display); font-size: 1.15rem; font-weight: 800;
          letter-spacing: 3px; text-transform: uppercase; padding: 22px 40px;
          border-radius: 16px; border: none; cursor: pointer;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1); overflow: hidden; isolation: isolate;
        }
        .s6-launch-btn-active {
          background: linear-gradient(135deg, #1a9e5c, #22c97a, #1a9e5c);
          background-size: 200% 200%; animation: gradShift 3s ease infinite;
          color: #fff; box-shadow: 0 0 0 1px rgba(34,201,122,0.3), 0 10px 40px rgba(34,201,122,0.3);
        }
        @keyframes gradShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .s6-launch-btn-active:hover { transform: translateY(-3px); box-shadow: 0 0 0 1px rgba(34,201,122,0.5), 0 20px 60px rgba(34,201,122,0.4); }
        .s6-launch-btn-loading { background: var(--surface-3); color: var(--text-muted); cursor: not-allowed; border: 1px solid var(--border); }
        .s6-launch-btn-label { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .s6-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.2); border-top-color: rgba(255,255,255,0.6); border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .s6-status { margin-top: 2rem; padding: 1.2rem 2rem; border-radius: 14px; font-size: 1rem; font-weight: 600; animation: fadeIn 0.4s ease; }
        .s6-status-success { background: rgba(34,201,122,0.08); border: 1px solid rgba(34,201,122,0.25); color: #22c97a; }
        .s6-status-error { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); color: #f87171; }
        .s6-launch-meta { margin-top: 1.5rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
        .s6-meta-item { display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: var(--text-muted); }
        .s6-meta-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); box-shadow: 0 0 6px var(--green); }
        .s6-back { text-align: center; opacity: 0; animation: fadeIn 0.5s ease 0.9s forwards; }
        .s6-back-btn {
          background: none; border: none; color: var(--text-muted); cursor: pointer;
          font-family: var(--font-body); font-size: 0.9rem; padding: 10px 24px;
          border-radius: 8px; transition: color 0.2s ease, background 0.2s ease;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .s6-back-btn:hover { color: var(--text-primary); background: rgba(255,255,255,0.04); }
        @keyframes fadeSlideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div className="s6-root">
        <div className="s6-content">

          {/* Header */}
          <div className="s6-header">
            <div className="s6-eyebrow">Step 6 — Final Review</div>
            <h2 className="s6-title">Review &amp; <span>Launch</span></h2>
            <p className="s6-subtitle">Verify every detail below. Once confirmed, deploy your campaign live to the dashboard.</p>
          </div>

          <div className="s6-divider">
            <div className="s6-divider-line" />
            <span className="s6-divider-label">Ad Preview</span>
            <div className="s6-divider-line" />
          </div>

          {/* Google Ad Preview */}
          <div className="s6-ad-preview">
            <div className="s6-ad-badge">Live Google Search Ad Preview</div>
            <div className="s6-google-mockup">
              <div className="s6-ad-row">
                <span className="s6-ad-tag">Ad</span>
                <span className="s6-ad-url">https://{previewUrl}</span>
              </div>
              <a href="#" className="s6-ad-headline">{previewHeadlines}</a>
              <p className="s6-ad-desc">{previewDesc}</p>
              {(data.goal === 'calls' || data.extensionPhoneNumber) && (
                <div className="s6-call-ext">
                  <span className="s6-call-link">📞 {data.phoneNumber || data.extensionPhoneNumber || '+91 9876543210'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="s6-divider">
            <div className="s6-divider-line" />
            <span className="s6-divider-label">Campaign Details</span>
            <div className="s6-divider-line" />
          </div>

          {/* 3 Detail Cards */}
          <div className="s6-cards">

            {/* Card 1: Foundation */}
            <div className="s6-card s6-card-gold">
              <h4 className="s6-card-title s6-card-title-gold">Foundation Details</h4>
              <div className="s6-row"><span className="s6-label">Campaign</span><span className="s6-value">{data.campaignName || 'Not Set'}</span></div>
              <div className="s6-row"><span className="s6-label">Goal Focus</span><span className="s6-value s6-value-green s6-value-upper">{data.goal || 'Not Set'}</span></div>
              <div className="s6-row"><span className="s6-label">Daily Budget</span><span className="s6-value s6-value-gold s6-value-price">₹{data.dailyBudget || '0'}</span></div>
              <div className="s6-row"><span className="s6-label">Business</span><span className="s6-value" style={{ textTransform: 'capitalize' }}>{data.businessType || 'Not Set'}</span></div>
              <div className="s6-row"><span className="s6-label">Location</span><span className="s6-value">{data.targetCity || 'All India'}</span></div>
            </div>
            {/* Card 2: Targeting */}
            <div className="s6-card s6-card-blue">
              <h4 className="s6-card-title s6-card-title-blue">Audience & Targeting</h4>
              <div className="s6-row"><span className="s6-label">Age Range</span><span className="s6-value">{data.ageRanges?.length ? data.ageRanges.join(', ') : 'All Ages'}</span></div>
              <div className="s6-row"><span className="s6-label">Device</span><span className="s6-value" style={{ textTransform: 'capitalize' }}>{data.device || 'All Devices'}</span></div>
              <div className="s6-row"><span className="s6-label">Schedule</span><span className="s6-value">{data.scheduleDays?.length ? data.scheduleDays.join(', ') : 'All Days'}</span></div>
              <div className="s6-row"><span className="s6-label">Ad Timing</span><span className="s6-value">{data.adStartTime || '12:00 AM'} – {data.adEndTime || '11:59 PM'}</span></div>
              <div className="s6-row"><span className="s6-label">Keywords</span><span className="s6-value s6-value-purple">{data.keywords?.length || 0} Target · {data.negativeKeywords?.length || 0} Neg</span></div>
            </div>

            {/* Card 3: Goal Specifics */}
            <div className="s6-card s6-card-green">
              <h4 className="s6-card-title s6-card-title-green">Goal Configuration</h4>
              {data.goal === 'leads' && (
                <>
                  <div className="s6-row"><span className="s6-label">Lead Fields</span><span className="s6-value">{data.leadFields?.join(' · ') || 'Name · Phone · City'}</span></div>
                  <div className="s6-row"><span className="s6-label">Receive At</span><span className="s6-value s6-value-blue">{data.leadsEmail || 'Not Provided'}</span></div>
                </>
              )}
              {(data.goal === 'calls' || data.extensionPhoneNumber) && (
                <>
                  <div className="s6-row"><span className="s6-label">Call Number</span><span className="s6-value s6-value-blue">{data.phoneNumber || data.extensionPhoneNumber}</span></div>
                  <div className="s6-row"><span className="s6-label">Call Timing</span><span className="s6-value" style={{ textTransform: 'capitalize' }}>{data.callTiming || '24/7'}</span></div>
                  <div className="s6-row"><span className="s6-label">Reporting</span><span className={`s6-value ${data.callReporting !== false ? 's6-value-green' : ''}`} style={data.callReporting === false ? { color: '#f87171' } : {}}>{data.callReporting !== false ? 'Enabled' : 'Disabled'}</span></div>
                </>
              )}
              {data.goal === 'messages' && (
                <>
                  <div className="s6-row"><span className="s6-label">WhatsApp</span><span className="s6-value s6-value-green">{data.whatsappNumber || 'Not Provided'}</span></div>
                  <div className="s6-row"><span className="s6-label">Auto-Reply</span><span className="s6-value">{data.whatsappMessage ? 'Custom Set' : 'Default'}</span></div>
                </>
              )}
              {!['leads', 'calls', 'messages'].includes(data.goal) && !data.extensionPhoneNumber && (
                <div className="s6-row"><span className="s6-label">Status</span><span className="s6-value s6-value-green">Ready to Deploy</span></div>
              )}
            </div>

          </div>

          <div className="s6-divider">
            <div className="s6-divider-line" />
            <span className="s6-divider-label">Deploy</span>
            <div className="s6-divider-line" />
          </div>

          {/* Launch Button */}
          <div className="s6-launch-wrap">
            <div className="s6-launch-box">
              <button
                onClick={handleLaunch}
                disabled={isLaunching}
                className={`s6-launch-btn ${isLaunching ? 's6-launch-btn-loading' : 's6-launch-btn-active'}`}
              >
                <span className="s6-launch-btn-label">
                  {isLaunching
                    ? <><div className="s6-spinner" /> DEPLOYING TO DASHBOARD...</>
                    : <>🚀 LAUNCH CAMPAIGN NOW</>
                  }
                </span>
              </button>

              {status && (
                <div className={`s6-status ${isError ? 's6-status-error' : 's6-status-success'}`}>
                  {status}
                </div>
              )}

              <div className="s6-launch-meta">
                <div className="s6-meta-item"><div className="s6-meta-dot" /> Saved to database</div>
                <div className="s6-meta-item"><div className="s6-meta-dot" /> Google Ads synced</div>
                <div className="s6-meta-item"><div className="s6-meta-dot" /> Dashboard live</div>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="s6-back">
            <button onClick={prevStep} className="s6-back-btn">← Go back and edit</button>
          </div>

        </div>
      </div>
    </>
  );
}





// 'use client';

// import { useState, useEffect } from 'react';
// import { supabase } from '../../../lib/supabase';

// export default function Step6Launch({ data, prevStep }: any) {
//   const [isLaunching, setIsLaunching] = useState(false);
//   const [status, setStatus] = useState<string | null>(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

// const handleLaunch = async () => {
//   setIsLaunching(true);
//   setStatus('🚀 Saving Campaign, Syncing Google Connection & Deploying...');

//   try {
//     // demo google campaign id generate
//     const demoGoogleCampaignId = `DEMO-${Date.now().toString().slice(-6)}`;

//     const { error } = await supabase
//       .from('campaigns')
//       .insert([{
//         campaign_name: data.campaignName || 'Unnamed Campaign',
//         website_url: data.websiteUrl,
//         goal: data.goal,
//         business_type: data.businessType,
//         budget: data.dailyBudget,
//         target_city: data.targetCity,
//         display_url: data.displayUrl,
//         final_url: data.finalUrl,
//         headlines: data.headlines || [],
//         descriptions: data.descriptions || [],
//         keywords: data.keywords || [],
//         negative_keywords: data.negativeKeywords || [],
//         age_ranges: data.ageRanges || [],
//         device_targeting: data.device || data.callDevice,
//         schedule_days: data.scheduleDays || [],
//         ad_start_time: data.adStartTime,
//         ad_end_time: data.adEndTime,
//         language: data.language,

//         lead_fields: data.leadFields || [],
//         custom_lead_questions: data.customLeadQuestions,
//         thank_you_message: data.thankYouMessage,
//         leads_email: data.leadsEmail,

//         phone_number: data.phoneNumber || data.extensionPhoneNumber,
//         call_timing: data.callTiming,
//         call_start_time: data.startTime,
//         call_end_time: data.endTime,
//         call_conversion_type: data.callConversionType,
//         call_reporting: data.callReporting !== undefined ? data.callReporting : true,

//         whatsapp_number: data.whatsappNumber,
//         whatsapp_message: data.whatsappMessage,

//         // reviewer demo sync fields
//         google_connected: true,
//         google_sync_status: 'connected',
//         google_campaign_id: demoGoogleCampaignId,
//         launch_mode: 'basic_access_demo',

//         status: 'live',
//         created_at: new Date().toISOString()
//       }]);

//     if (error) throw error;

//     setStatus('✅ Campaign Successfully Deployed & Google Ads Sync Queued...');
//     setTimeout(() => {
//       window.location.href = '/dashboard';
//     }, 2200);

//   } catch (error: any) {
//     console.error(error);
//     setStatus(`❌ Error: ${error.message}`);
//     setIsLaunching(false);
//   }
// };


//   const previewHeadlines = data.headlines && data.headlines[0]
//     ? data.headlines.slice(0, 3).filter(Boolean).join(' | ')
//     : 'Your High Converting Headline | Book Now';
//   const previewDesc = data.descriptions && data.descriptions[0]
//     ? data.descriptions.slice(0, 2).filter(Boolean).join(' ')
//     : 'We provide the best services in your city. Contact us today for special offers and guaranteed satisfaction.';
//   const previewUrl = data.displayUrl || data.websiteUrl?.replace(/^https?:\/\//, '') || 'www.yourwebsite.com/offer';

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

//         :root {
//           --gold: #c9a84c;
//           --gold-light: #e8c96a;
//           --gold-dim: rgba(201,168,76,0.18);
//           --gold-glow: rgba(201,168,76,0.35);
//           --surface: #0d1017;
//           --surface-2: #13181f;
//           --surface-3: #191f28;
//           --border: rgba(201,168,76,0.12);
//           --border-hover: rgba(201,168,76,0.3);
//           --text-primary: #f0ede8;
//           --text-secondary: #8a8f9a;
//           --text-muted: #4a5060;
//           --green: #22c97a;
//           --blue: #4da8f7;
//           --pink: #f06292;
//           --purple: #a78bfa;
//           --font-display: 'Syne', sans-serif;
//           --font-body: 'DM Sans', sans-serif;
//         }

//         .s6-root * { box-sizing: border-box; margin: 0; padding: 0; }

//         .s6-root {
//           font-family: var(--font-body);
//           background: var(--surface);
//           min-height: 100vh;
//           padding: 3rem 2.5rem;
//           color: var(--text-primary);
//           position: relative;
//           overflow: hidden;
//         }

//         /* === BACKGROUND NOISE + GRID === */
//         .s6-root::before {
//           content: '';
//           position: fixed;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
//           background-size: 48px 48px;
//           pointer-events: none;
//           z-index: 0;
//         }

//         .s6-root::after {
//           content: '';
//           position: fixed;
//           top: -30%;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 800px;
//           height: 500px;
//           background: radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%);
//           pointer-events: none;
//           z-index: 0;
//         }

//         .s6-content {
//           position: relative;
//           z-index: 1;
//           max-width: 1300px;
//           margin: 0 auto;
//           display: flex;
//           flex-direction: column;
//           gap: 2.5rem;
//         }

//         /* === HEADER === */
//         .s6-header {
//           text-align: center;
//           opacity: 0;
//           transform: translateY(-20px);
//           animation: fadeSlideDown 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
//         }

//         .s6-eyebrow {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           font-family: var(--font-display);
//           font-size: 0.7rem;
//           font-weight: 700;
//           letter-spacing: 3px;
//           text-transform: uppercase;
//           color: var(--gold);
//           background: var(--gold-dim);
//           border: 1px solid var(--border);
//           padding: 6px 18px;
//           border-radius: 100px;
//           margin-bottom: 1.5rem;
//         }

//         .s6-eyebrow::before {
//           content: '';
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: var(--gold);
//           box-shadow: 0 0 8px var(--gold);
//           animation: pulse-dot 1.8s ease-in-out infinite;
//         }

//         @keyframes pulse-dot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(0.7); }
//         }

//         .s6-title {
//           font-family: var(--font-display);
//           font-size: clamp(2.8rem, 5vw, 4.2rem);
//           font-weight: 800;
//           letter-spacing: -2px;
//           line-height: 1.05;
//           color: var(--text-primary);
//         }

//         .s6-title span {
//           background: linear-gradient(135deg, var(--gold-light), var(--gold), #a0722a);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .s6-subtitle {
//           color: var(--text-secondary);
//           font-size: 1rem;
//           font-weight: 300;
//           margin-top: 14px;
//           letter-spacing: 0.3px;
//           line-height: 1.6;
//         }

//         /* === STEP DIVIDER === */
//         .s6-divider {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           opacity: 0;
//           animation: fadeIn 0.5s ease 0.3s forwards;
//         }

//         .s6-divider-line {
//           flex: 1;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, var(--border), transparent);
//         }

//         .s6-divider-label {
//           font-family: var(--font-display);
//           font-size: 0.65rem;
//           font-weight: 700;
//           letter-spacing: 2.5px;
//           text-transform: uppercase;
//           color: var(--text-muted);
//         }

//         /* === AD PREVIEW === */
//         .s6-ad-preview {
//           background: var(--surface-2);
//           border: 1px solid var(--border);
//           border-radius: 20px;
//           padding: 2.5rem;
//           position: relative;
//           overflow: hidden;
//           opacity: 0;
//           animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s forwards;
//         }

//         .s6-ad-preview::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 3px;
//           background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
//           border-radius: 20px 20px 0 0;
//         }

//         .s6-ad-badge {
//           font-family: var(--font-display);
//           font-size: 0.62rem;
//           font-weight: 700;
//           letter-spacing: 2.5px;
//           text-transform: uppercase;
//           color: var(--gold);
//           margin-bottom: 1.5rem;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .s6-ad-badge::after {
//           content: '';
//           flex: 1;
//           height: 1px;
//           background: var(--border);
//         }

//         .s6-google-mockup {
//           background: #202124;
//           border-radius: 12px;
//           padding: 1.8rem 2rem;
//           border: 1px solid #2d3038;
//         }

//         .s6-ad-row {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 8px;
//         }

//         .s6-ad-tag {
//           font-size: 0.7rem;
//           font-weight: 700;
//           color: #202124;
//           background: #e8c96a;
//           padding: 2px 7px;
//           border-radius: 3px;
//           letter-spacing: 0.5px;
//         }

//         .s6-ad-url {
//           color: #bdc1c6;
//           font-size: 0.875rem;
//           font-family: var(--font-body);
//         }

//         .s6-ad-headline {
//           color: #8ab4f8;
//           font-size: 1.35rem;
//           font-weight: 400;
//           line-height: 1.4;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 10px;
//           font-family: var(--font-body);
//         }

//         .s6-ad-desc {
//           color: #bdc1c6;
//           font-size: 0.9rem;
//           line-height: 1.65;
//           font-family: var(--font-body);
//         }

//         .s6-call-ext {
//           margin-top: 16px;
//           padding-top: 16px;
//           border-top: 1px solid #2d3038;
//           display: flex;
//           gap: 16px;
//         }

//         .s6-call-link {
//           color: #8ab4f8;
//           font-size: 0.9rem;
//           display: flex;
//           align-items: center;
//           gap: 7px;
//         }

//         /* === CARDS GRID === */
//         .s6-cards {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 1.5rem;
//           opacity: 0;
//           animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s forwards;
//         }

//         @media (max-width: 900px) {
//           .s6-cards { grid-template-columns: 1fr; }
//         }

//         .s6-card {
//           background: var(--surface-2);
//           border: 1px solid var(--border);
//           border-radius: 20px;
//           padding: 2rem;
//           position: relative;
//           overflow: hidden;
//           transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
//         }

//         .s6-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 20px 50px rgba(0,0,0,0.4);
//         }

//         .s6-card-gold { border-top: 2px solid var(--gold); }
//         .s6-card-gold:hover { border-color: var(--gold-light); box-shadow: 0 20px 50px rgba(201,168,76,0.1); }

//         .s6-card-blue { border-top: 2px solid var(--blue); }
//         .s6-card-blue:hover { border-color: #7bc3ff; box-shadow: 0 20px 50px rgba(77,168,247,0.1); }

//         .s6-card-green { border-top: 2px solid var(--green); }
//         .s6-card-green:hover { border-color: #4ade80; box-shadow: 0 20px 50px rgba(34,201,122,0.1); }

//         .s6-card-glow-gold::after {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 60px;
//           background: linear-gradient(to bottom, rgba(201,168,76,0.07), transparent);
//           pointer-events: none;
//           border-radius: 20px 20px 0 0;
//         }

//         .s6-card-glow-blue::after {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 60px;
//           background: linear-gradient(to bottom, rgba(77,168,247,0.07), transparent);
//           pointer-events: none;
//           border-radius: 20px 20px 0 0;
//         }

//         .s6-card-glow-green::after {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 60px;
//           background: linear-gradient(to bottom, rgba(34,201,122,0.07), transparent);
//           pointer-events: none;
//           border-radius: 20px 20px 0 0;
//         }

//         .s6-card-title {
//           font-family: var(--font-display);
//           font-size: 0.68rem;
//           font-weight: 700;
//           letter-spacing: 2.5px;
//           text-transform: uppercase;
//           margin-bottom: 1.5rem;
//           padding-bottom: 1rem;
//           border-bottom: 1px solid rgba(255,255,255,0.05);
//         }

//         .s6-card-title-gold { color: var(--gold); }
//         .s6-card-title-blue { color: var(--blue); }
//         .s6-card-title-green { color: var(--green); }

//         .s6-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           padding: 11px 0;
//           border-bottom: 1px solid rgba(255,255,255,0.04);
//           gap: 12px;
//         }

//         .s6-row:last-child { border-bottom: none; padding-bottom: 0; }

//         .s6-label {
//           color: var(--text-secondary);
//           font-size: 0.82rem;
//           font-weight: 400;
//           white-space: nowrap;
//           flex-shrink: 0;
//         }

//         .s6-value {
//           color: var(--text-primary);
//           font-size: 0.88rem;
//           font-weight: 600;
//           text-align: right;
//           line-height: 1.4;
//           word-break: break-word;
//         }

//         .s6-value-gold { color: var(--gold-light); }
//         .s6-value-green { color: var(--green); }
//         .s6-value-blue { color: var(--blue); }
//         .s6-value-purple { color: var(--purple); }
//         .s6-value-upper { text-transform: uppercase; letter-spacing: 0.8px; font-size: 0.78rem; }
//         .s6-value-price { font-size: 1.05rem; font-family: var(--font-display); }

//         /* === LAUNCH SECTION === */
//         .s6-launch-wrap {
//           opacity: 0;
//           animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.75s forwards;
//         }

//         .s6-launch-box {
//           background: var(--surface-2);
//           border: 1px solid var(--border);
//           border-radius: 24px;
//           padding: 3rem;
//           text-align: center;
//           position: relative;
//           overflow: hidden;
//         }

//         .s6-launch-box::before {
//           content: '';
//           position: absolute;
//           bottom: 0; left: 0; right: 0;
//           height: 200px;
//           background: radial-gradient(ellipse at 50% 120%, rgba(34,201,122,0.08), transparent 70%);
//           pointer-events: none;
//         }

//         .s6-launch-btn {
//           position: relative;
//           width: 100%;
//           max-width: 560px;
//           font-family: var(--font-display);
//           font-size: 1.15rem;
//           font-weight: 800;
//           letter-spacing: 3px;
//           text-transform: uppercase;
//           padding: 22px 40px;
//           border-radius: 16px;
//           border: none;
//           cursor: pointer;
//           transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
//           overflow: hidden;
//           isolation: isolate;
//         }

//         .s6-launch-btn-active {
//           background: linear-gradient(135deg, #1a9e5c, #22c97a, #1a9e5c);
//           background-size: 200% 200%;
//           animation: gradShift 3s ease infinite;
//           color: #fff;
//           box-shadow:
//             0 0 0 1px rgba(34,201,122,0.3),
//             0 10px 40px rgba(34,201,122,0.3),
//             0 1px 0 rgba(255,255,255,0.1) inset;
//         }

//         @keyframes gradShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         .s6-launch-btn-active::before {
//           content: '';
//           position: absolute;
//           top: 0; left: -100%;
//           width: 100%; height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
//           transition: left 0.5s ease;
//         }

//         .s6-launch-btn-active:hover::before {
//           left: 100%;
//         }

//         .s6-launch-btn-active:hover {
//           transform: translateY(-3px);
//           box-shadow:
//             0 0 0 1px rgba(34,201,122,0.5),
//             0 20px 60px rgba(34,201,122,0.4),
//             0 1px 0 rgba(255,255,255,0.15) inset;
//         }

//         .s6-launch-btn-loading {
//           background: var(--surface-3);
//           color: var(--text-muted);
//           cursor: not-allowed;
//           box-shadow: none;
//           border: 1px solid var(--border);
//         }

//         .s6-launch-btn-label {
//           position: relative;
//           z-index: 1;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//         }

//         .s6-spinner {
//           width: 18px; height: 18px;
//           border: 2px solid rgba(255,255,255,0.2);
//           border-top-color: rgba(255,255,255,0.6);
//           border-radius: 50%;
//           animation: spin 0.7s linear infinite;
//           flex-shrink: 0;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         .s6-status {
//           margin-top: 2rem;
//           padding: 1.2rem 2rem;
//           border-radius: 14px;
//           font-size: 1rem;
//           font-weight: 600;
//           letter-spacing: 0.3px;
//           animation: fadeIn 0.4s ease;
//         }

//         .s6-status-success {
//           background: rgba(34,201,122,0.08);
//           border: 1px solid rgba(34,201,122,0.25);
//           color: #22c97a;
//         }

//         .s6-status-error {
//           background: rgba(239,68,68,0.08);
//           border: 1px solid rgba(239,68,68,0.25);
//           color: #f87171;
//         }

//         .s6-launch-meta {
//           margin-top: 1.5rem;
//           display: flex;
//           justify-content: center;
//           gap: 2rem;
//           flex-wrap: wrap;
//         }

//         .s6-meta-item {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 0.78rem;
//           color: var(--text-muted);
//           letter-spacing: 0.3px;
//         }

//         .s6-meta-dot {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: var(--green);
//           box-shadow: 0 0 6px var(--green);
//         }

//         /* === BACK BUTTON === */
//         .s6-back {
//           text-align: center;
//           opacity: 0;
//           animation: fadeIn 0.5s ease 0.9s forwards;
//         }

//         .s6-back-btn {
//           background: none;
//           border: none;
//           color: var(--text-muted);
//           cursor: pointer;
//           font-family: var(--font-body);
//           font-size: 0.9rem;
//           font-weight: 400;
//           padding: 10px 24px;
//           border-radius: 8px;
//           transition: color 0.2s ease, background 0.2s ease;
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .s6-back-btn:hover {
//           color: var(--text-primary);
//           background: rgba(255,255,255,0.04);
//         }

//         /* === ANIMATIONS === */
//         @keyframes fadeSlideDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//       `}</style>

//       <div className="s6-root">
//         <div className="s6-content">
// {/* ─── HEADER ─── */}
//           <div className="s6-header">
//             <div className="s6-eyebrow">Step 6 — Final Review</div>
//             <h2 className="s6-title">
//               Review &amp; <span>Launch</span>
//             </h2>
//             <p className="s6-subtitle">
//               Verify every detail below. Once confirmed, deploy your campaign live to the dashboard.
//             </p>
//           </div>

//           <div className="s6-divider">
//             <div className="s6-divider-line" />
//             <span className="s6-divider-label">Ad Preview</span>
//             <div className="s6-divider-line" />
//           </div>

//           {/* ─── GOOGLE AD PREVIEW ─── */}
//           <div className="s6-ad-preview">
//             <div className="s6-ad-badge">Live Google Search Ad Preview</div>

//             <div className="s6-google-mockup">
//               <div className="s6-ad-row">
//                 <span className="s6-ad-tag">Ad</span>
//                 <span className="s6-ad-url">https://{previewUrl}</span>
//               </div>

//               <a href="#" className="s6-ad-headline">{previewHeadlines}</a>
//               <p className="s6-ad-desc">{previewDesc}</p>

//               {(data.goal === 'calls' || data.extensionPhoneNumber) && (
//                 <div className="s6-call-ext">
//                   <span className="s6-call-link">
//                     📞 {data.phoneNumber || data.extensionPhoneNumber || '+91 9876543210'}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="s6-divider">
//             <div className="s6-divider-line" />
//             <span className="s6-divider-label">Campaign Details</span>
//             <div className="s6-divider-line" />
//           </div>

//           {/* ─── 3 DETAIL CARDS ─── */}
//           <div className="s6-cards">

//             {/* Card 1: Foundation */}
//             <div className="s6-card s6-card-gold s6-card-glow-gold">
//               <h4 className="s6-card-title s6-card-title-gold">Foundation Details</h4>
//               <div className="s6-row">
//                 <span className="s6-label">Campaign</span>
//                 <span className="s6-value">{data.campaignName || 'Not Set'}</span>
//               </div>
//               <div className="s6-row">
//                 <span className="s6-label">Goal Focus</span>
//                 <span className="s6-value s6-value-green s6-value-upper">{data.goal || 'Not Set'}</span>
//               </div>
//               <div className="s6-row">
//                 <span className="s6-label">Daily Budget</span>
//                 <span className="s6-value s6-value-gold s6-value-price">₹{data.dailyBudget || '0'}</span>
//               </div>
//               <div className="s6-row">
//                 <span className="s6-label">Business</span>
//                 <span className="s6-value" style={{ textTransform: 'capitalize' }}>{data.businessType || 'Not Set'}</span>
//               </div>
//               <div className="s6-row">
//                 <span className="s6-label">Location</span>
//                 <span className="s6-value">{data.targetCity || 'All India'}</span>
//               </div>
//             </div>

//             {/* Card 2: Targeting */}
//             <div className="s6-card s6-card-blue s6-card-glow-blue">
//               <h4 className="s6-card-title s6-card-title-blue">Audience & Targeting</h4>
//               <div className="s6-row">
//                 <span className="s6-label">Age Range</span>
//                 <span className="s6-value">{data.ageRanges?.length ? data.ageRanges.join(', ') : 'All Ages'}</span>
//               </div>
//               <div className="s6-row">
//                 <span className="s6-label">Device</span>
//                 <span className="s6-value" style={{ textTransform: 'capitalize' }}>{data.device || 'All Devices'}</span>
//               </div>
//               <div className="s6-row">
//                 <span className="s6-label">Schedule</span>
//                 <span className="s6-value">{data.scheduleDays?.length ? data.scheduleDays.join(', ') : 'All Days'}</span>
//               </div>
//               <div className="s6-row">
//                 <span className="s6-label">Ad Timing</span>
//                 <span className="s6-value">{data.adStartTime || '12:00 AM'} – {data.adEndTime || '11:59 PM'}</span>
//               </div>
//               <div className="s6-row">
//                 <span className="s6-label">Keywords</span>
//                 <span className="s6-value s6-value-purple">{data.keywords?.length || 0} Target &nbsp;·&nbsp; {data.negativeKeywords?.length || 0} Neg</span>
//               </div>
//             </div>

//             {/* Card 3: Goal Specifics */}
//             <div className="s6-card s6-card-green s6-card-glow-green">
//               <h4 className="s6-card-title s6-card-title-green">Goal Configuration</h4>

//               {data.goal === 'leads' && (
//                 <>
//                   <div className="s6-row">
//                     <span className="s6-label">Lead Fields</span>
//                     <span className="s6-value">{data.leadFields?.join(' · ') || 'Name · Phone · City'}</span>
//                   </div>
//                   <div className="s6-row">
//                     <span className="s6-label">Receive At</span>
//                     <span className="s6-value s6-value-blue">{data.leadsEmail || 'Not Provided'}</span>
//                   </div>
//                 </>
//               )}

//               {(data.goal === 'calls' || data.extensionPhoneNumber) && (
//                 <>
//                   <div className="s6-row">
//                     <span className="s6-label">Call Number</span>
//                     <span className="s6-value s6-value-blue">{data.phoneNumber || data.extensionPhoneNumber}</span>
//                   </div>
//                   <div className="s6-row">
//                     <span className="s6-label">Call Timing</span>
//                     <span className="s6-value" style={{ textTransform: 'capitalize' }}>{data.callTiming || '24/7'}</span>
//                   </div>
//                   <div className="s6-row">
//                     <span className="s6-label">Reporting</span>
//                     <span className={`s6-value ${data.callReporting !== false ? 's6-value-green' : ''}`}
//                       style={data.callReporting === false ? { color: '#f87171' } : {}}>
//                       {data.callReporting !== false ? 'Enabled' : 'Disabled'}
//                     </span>
//                   </div>
//                 </>
//               )}

//               {data.goal === 'messages' && (
//                 <>
//                   <div className="s6-row">
//                     <span className="s6-label">WhatsApp</span>
//                     <span className="s6-value s6-value-green">{data.whatsappNumber || 'Not Provided'}</span>
//                   </div>
//                   <div className="s6-row">
//                     <span className="s6-label">Auto-Reply</span>
//                     <span className="s6-value">{data.whatsappMessage ? 'Custom Set' : 'Default'}</span>
//                   </div>
//                 </>
//               )}

//               {/* Fallback if no goal specifics matched */}
//               {!['leads','calls','messages'].includes(data.goal) && !data.extensionPhoneNumber && (
//                 <div className="s6-row">
//                   <span className="s6-label">Status</span>
//                   <span className="s6-value s6-value-green">Ready to Deploy</span>
//                 </div>
//               )}
//             </div>

//           </div>

//           <div className="s6-divider">
//             <div className="s6-divider-line" />
//             <span className="s6-divider-label">Deploy</span>
//             <div className="s6-divider-line" />
//           </div>

//           {/* ─── LAUNCH BUTTON ─── */}
//           <div className="s6-launch-wrap">
//             <div className="s6-launch-box">
//               <button
//                 onClick={handleLaunch}
//                 disabled={isLaunching}
//                 className={`s6-launch-btn ${isLaunching ? 's6-launch-btn-loading' : 's6-launch-btn-active'}`}
//               >
//                 <span className="s6-launch-btn-label">
//                   {isLaunching ? (
//                     <><div className="s6-spinner" /> DEPLOYING TO DASHBOARD...</>
//                   ) : (
//                     <>🚀 LAUNCH CAMPAIGN NOW</>
//                   )}
//                 </span>
//               </button>

//               {status && (
//                 <div className={`s6-status ${status.includes('Error') ? 's6-status-error' : 's6-status-success'}`}>
//                   {status}
//                 </div>
//               )}

//               <div className="s6-launch-meta">
//                 <div className="s6-meta-item"><div className="s6-meta-dot" /> Instant deployment</div>
//                 <div className="s6-meta-item"><div className="s6-meta-dot" /> Saved to database</div>
//                 <div className="s6-meta-item"><div className="s6-meta-dot" /> Dashboard redirect</div>
//               </div>
//             </div>
//           </div>

//           {/* ─── BACK ─── */}
//           <div className="s6-back">
//             <button onClick={prevStep} className="s6-back-btn">
//               ← Go back and edit
//             </button>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }



