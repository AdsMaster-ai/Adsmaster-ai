
'use client';

import { useState } from 'react';

export default function Step2Ads({ data, updateData, nextStep, prevStep }: any) {

  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  // ── AI Generation Functions (unchanged) ──────────────────────
  const generateCampaignName = () => {
    updateData({ campaignName: `${data.businessType ? data.businessType.toUpperCase() : 'Premium'} - High Conversion 2026` });
  };

  const generateURLs = () => {
    const base = data.websiteUrl ? data.websiteUrl.replace(/\/$/, '') : 'https://yourwebsite.com';
    const domain = base.replace(/^https?:\/\//, '').split('/')[0];
    updateData({
      displayUrl: `${domain}/special-offer`,
      finalUrl: `${base}/landing-page-offer`
    });
  };

  const generateAllHeadlines = () => {
    const biz = data.businessType ? data.businessType.replace('-', ' ') : 'Service';
    const aiHeadlines = [
      `Best ${biz} Near You`,
      `Top Rated ${biz} Experts`,
      `Book ${biz} Online Now`,
      `Affordable ${biz} Deals`,
      `Expert ${biz} Services`,
      `Fast & Reliable ${biz}`,
      `#1 ${biz} in Your City`,
      `Get a Free Quote Today`,
      `24/7 ${biz} Available`,
      `Trusted by 1000+ Clients`,
      `Premium Quality ${biz}`,
      `Call Us Now For Offers`
    ].map(h => h.substring(0, 30));
    updateData({ headlines: aiHeadlines });
  };

  const generateAllDescriptions = () => {
    const biz = data.businessType ? data.businessType.replace('-', ' ') : 'Services';
    const aiDescriptions = [
      `Looking for the best ${biz}? We provide top-notch solutions with 100% satisfaction.`,
      `Get affordable and reliable ${biz} today. Call now to book your appointment instantly!`,
      `Experience premium quality ${biz} tailored to your needs. Highly rated by our customers.`,
      `Don't settle for less. Choose our expert ${biz} for guaranteed results and 24/7 support.`
    ].map(d => d.substring(0, 90));
    updateData({ descriptions: aiDescriptions });
  };

  const currentHeadlines = data.headlines || Array(12).fill('');
  const currentDescriptions = data.descriptions || Array(4).fill('');

  // ── Styles ────────────────────────────────────────────────────
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #060b18 0%, #0d1428 40%, #090f1f 100%)',
    padding: '0',
    fontFamily: "'Sora', 'Nunito', sans-serif",
    overflow: 'hidden',
  };

  const auroraStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0,
    background: `
      radial-gradient(ellipse 70% 50% at 15% 25%, rgba(192,132,252,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 85% 15%, rgba(236,72,153,0.07) 0%, transparent 55%),
      radial-gradient(ellipse 50% 55% at 50% 85%, rgba(56,189,248,0.05) 0%, transparent 60%)
    `,
  };

  const gridOverlay: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0,
    backgroundImage: `
      linear-gradient(rgba(192,132,252,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(192,132,252,0.025) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  };

  const outerCard: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    background: 'rgba(13,20,40,0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid rgba(192,132,252,0.12)',
    boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
    margin: '0 auto',
    maxWidth: '100%',
  };

  const sectionCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '1.5rem',
    backdropFilter: 'blur(8px)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '0.5rem',
  };

  const dot = (color: string): React.CSSProperties => ({
    width: '6px', height: '6px', borderRadius: '50%',
    background: color, boxShadow: `0 0 6px ${color}, flexShrink: 0`,
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(15,22,44,0.8)',
    border: '1px solid rgba(192,132,252,0.15)',
    borderRadius: '12px',
    padding: '13px 16px',
    color: '#e2e8f0',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '0.88rem',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const sectionTitle: React.CSSProperties = {
    margin: '0 0 4px 0',
    color: '#e2e8f0',
    fontSize: '1rem',
    fontWeight: '700',
    letterSpacing: '-0.01em',
  };

  const sectionSub: React.CSSProperties = {
    margin: 0,
    color: '#4b5563',
    fontSize: '0.75rem',
    lineHeight: 1.5,
  };

  const aiBtn = (accent: string, glow: string, hoverKey: string): React.CSSProperties => ({
    background: hoveredBtn === hoverKey
      ? `linear-gradient(135deg, ${accent}22, ${glow}22)`
      : `linear-gradient(135deg, ${accent}12, ${glow}12)`,
    color: accent,
    border: `1px solid ${accent}55`,
    borderRadius: '10px',
    padding: '9px 18px',
    cursor: 'pointer',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    fontSize: '0.8rem',
    fontFamily: 'inherit',
    letterSpacing: '0.02em',
    boxShadow: hoveredBtn === hoverKey ? `0 0 18px ${accent}25` : `0 0 8px ${accent}10`,
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const,
  });

  return (
    <div style={wrapperStyle}>
      <div style={auroraStyle} />
      <div style={gridOverlay} />

      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.2)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '18px',
            fontSize: '0.7rem', fontWeight: '600', color: '#c084fc',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 8px #c084fc', display: 'inline-block' }} />
            Step 2 of 4 — Ad Copy
          </div>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #c084fc 40%, #ec4899 80%, #f472b6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>
            Ad Copy Creation
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            AI highly converting headlines aur descriptions likhega aapke ads ke liye
          </p>
        </div>

        {/* Main Card */}
        <div style={outerCard}>

          {/* Progress bar */}
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden', margin: '-2.5rem -2.5rem 0', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
            <div style={{
              height: '100%', width: '50%',
              background: 'linear-gradient(90deg, #c084fc, #ec4899)',
              boxShadow: '0 0 12px rgba(192,132,252,0.6)',
              borderRadius: '99px',
            }} />
          </div>

          {/* ── Campaign Name ── */}
          <div style={sectionCard}>
            <label style={labelStyle}>
              <span style={dot('#c084fc')} />
              Campaign Name
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={data.campaignName || ''}
                onChange={(e) => updateData({ campaignName: e.target.value })}
                placeholder="e.g., Summer Sale 2026"
                style={{ ...inputStyle, flex: 1, minWidth: '200px' }}
              />
              <button
                onClick={generateCampaignName}
                onMouseEnter={() => setHoveredBtn('name')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={aiBtn('#c084fc', '#ec4899', 'name')}
              >
                ✨ Auto Name
              </button>
            </div>
          </div>

          {/* ── Ad URLs ── */}
          <div style={sectionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={sectionTitle}>Ad URLs</h3>
                <p style={sectionSub}>Display aur final landing page URL set karo</p>
              </div>
              <button
                onClick={generateURLs}
                onMouseEnter={() => setHoveredBtn('url')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={aiBtn('#38bdf8', '#818cf8', 'url')}
              >
                ✨ Generate URLs
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>
                  <span style={dot('#38bdf8')} />
                  Display URL <span style={{ color: '#374151', fontWeight: '400', textTransform: 'none', letterSpacing: 0 }}>(Visible to users)</span>
                </label>
                <input
                  type="text"
                  value={data.displayUrl || ''}
                  onChange={(e) => updateData({ displayUrl: e.target.value })}
                  placeholder="yourwebsite.com/offer"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  <span style={dot('#a78bfa')} />
                  Final URL <span style={{ color: '#374151', fontWeight: '400', textTransform: 'none', letterSpacing: 0 }}>(Actual landing page)</span>
                </label>
                <input
                  type="url"
                  value={data.finalUrl || ''}
                  onChange={(e) => updateData({ finalUrl: e.target.value })}
                  placeholder="https://yourwebsite.com/landing"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* ── Headlines ── */}
          <div style={sectionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={sectionTitle}>Headlines</h3>
                <p style={sectionSub}>12 headlines dena — Google mix & match karega. Max <strong style={{ color: '#eab308' }}>30 chars</strong> each.</p>
              </div>
              <button
                onClick={generateAllHeadlines}
                onMouseEnter={() => setHoveredBtn('headlines')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={aiBtn('#eab308', '#f59e0b', 'headlines')}
              >
                ✨ Generate 12
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem' }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const val = currentHeadlines[i] || '';
                const atLimit = val.length === 30;
                const pct = (val.length / 30) * 100;
                return (
                  <div key={`headline-${i}`} style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute', top: '-1px', left: 0,
                      height: '2px', width: `${pct}%`,
                      background: atLimit
                        ? 'linear-gradient(90deg, #ef4444, #f87171)'
                        : 'linear-gradient(90deg, #c084fc, #38bdf8)',
                      borderRadius: '99px 99px 0 0',
                      transition: 'width 0.2s ease',
                      zIndex: 2,
                    }} />
                    <input
                      type="text"
                      maxLength={30}
                      placeholder={`Headline ${i + 1}`}
                      value={val}
                      onChange={(e) => {
                        const n = [...currentHeadlines];
                        n[i] = e.target.value;
                        updateData({ headlines: n });
                      }}
                      style={{
                        ...inputStyle,
                        paddingRight: '46px',
                        borderColor: atLimit ? 'rgba(239,68,68,0.5)' : 'rgba(192,132,252,0.15)',
                        boxShadow: atLimit ? '0 0 0 2px rgba(239,68,68,0.1)' : 'none',
                        fontSize: '0.84rem',
                      }}
                    />
                    <span style={{
                      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                      fontSize: '0.68rem', fontWeight: '700',
                      color: atLimit ? '#ef4444' : '#374151',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {val.length}/30
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Descriptions ── */}
          <div style={sectionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={sectionTitle}>Descriptions</h3>
                <p style={sectionSub}>4 detailed descriptions. Max <strong style={{ color: '#4ade80' }}>90 chars</strong> each.</p>
              </div>
              <button
                onClick={generateAllDescriptions}
                onMouseEnter={() => setHoveredBtn('desc')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={aiBtn('#4ade80', '#34d399', 'desc')}
              >
                ✨ Generate 4
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {Array.from({ length: 4 }).map((_, i) => {
                const val = currentDescriptions[i] || '';
                const atLimit = val.length === 90;
                const pct = (val.length / 90) * 100;
                return (
                  <div key={`desc-${i}`} style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute', top: '-1px', left: 0,
                      height: '2px', width: `${pct}%`,
                      background: atLimit
                        ? 'linear-gradient(90deg, #ef4444, #f87171)'
                        : 'linear-gradient(90deg, #4ade80, #38bdf8)',
                      borderRadius: '99px 99px 0 0',
                      transition: 'width 0.2s ease',
                      zIndex: 2,
                    }} />
                    <textarea
                      maxLength={90}
                      rows={2}
                      placeholder={`Description ${i + 1}`}
                      value={val}
                      onChange={(e) => {
                        const n = [...currentDescriptions];
                        n[i] = e.target.value;
                        updateData({ descriptions: n });
                      }}
                      style={{
                        ...inputStyle,
                        paddingBottom: '28px',
                        resize: 'none',
                        borderColor: atLimit ? 'rgba(239,68,68,0.5)' : 'rgba(192,132,252,0.15)',
                        boxShadow: atLimit ? '0 0 0 2px rgba(239,68,68,0.1)' : 'none',
                        lineHeight: 1.6,
                      }}
                    />
                    <div style={{
                      position: 'absolute', bottom: '10px', right: '12px',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      <div style={{
                        width: '40px', height: '3px', borderRadius: '99px',
                        background: 'rgba(255,255,255,0.06)',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%', width: `${pct}%`,
                          background: atLimit ? '#ef4444' : '#4ade80',
                          borderRadius: '99px',
                          transition: 'width 0.2s ease',
                        }} />
                      </div>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: '700',
                        color: atLimit ? '#ef4444' : '#374151',
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        {val.length}/90
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.2), rgba(236,72,153,0.2), transparent)',
          }} />

          {/* ── Navigation ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={prevStep}
              onMouseEnter={() => setHoveredBtn('back')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                background: hoveredBtn === 'back' ? 'rgba(255,255,255,0.05)' : 'none',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#64748b',
                cursor: 'pointer',
                padding: '12px 24px',
                fontSize: '0.88rem',
                fontFamily: 'inherit',
                fontWeight: '600',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em',
              }}
            >
              ← Back
            </button>
            <button
              onClick={nextStep}
              onMouseEnter={() => setHoveredBtn('next')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #ec4899 100%)',
                color: '#fff',
                fontWeight: '700',
                padding: '14px 44px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: hoveredBtn === 'next'
                  ? '0 0 0 1px rgba(192,132,252,0.4), 0 12px 32px rgba(192,132,252,0.4)'
                  : '0 0 0 1px rgba(192,132,252,0.25), 0 8px 24px rgba(192,132,252,0.25)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              Next Step <span>→</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

