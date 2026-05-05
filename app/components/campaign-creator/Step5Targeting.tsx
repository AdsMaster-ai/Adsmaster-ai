'use client';

import { useState } from 'react';

export default function Step5Targeting({ data, updateData, nextStep, prevStep }: any) {

  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const ageRanges = data.ageRanges || [];
  const scheduleDays = data.scheduleDays || [];

  const toggleArrayItem = (field: string, item: string, currentArray: string[]) => {
    if (currentArray.includes(item)) {
      updateData({ [field]: currentArray.filter((i: string) => i !== item) });
    } else {
      updateData({ [field]: [...currentArray, item] });
    }
  };

  // ── Wrapper & Background ──────────────────────────────────────
  const wrapperStyle: React.CSSProperties = {
    position: 'relative', minHeight: '100vh',
    background: 'linear-gradient(135deg, #060b18 0%, #0d1428 40%, #090f1f 100%)',
    fontFamily: "'Sora', 'Nunito', sans-serif", overflow: 'hidden',
  };

  const auroraStyle: React.CSSProperties = {
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
    background: `
      radial-gradient(ellipse 70% 50% at 15% 20%, rgba(244,114,182,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 55% 40% at 85% 15%, rgba(192,132,252,0.07) 0%, transparent 55%),
      radial-gradient(ellipse 50% 55% at 50% 90%, rgba(56,189,248,0.05) 0%, transparent 60%)
    `,
  };

  const gridOverlay: React.CSSProperties = {
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: `linear-gradient(rgba(244,114,182,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(244,114,182,0.025) 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
  };

  const outerCard: React.CSSProperties = {
    position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.75rem',
    background: 'rgba(13,20,40,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(244,114,182,0.12)',
    boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
    margin: '0 auto',  maxWidth: '100%',
  };

  const sectionCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)', borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', backdropFilter: 'blur(8px)',
  };

  const dot = (color: string): React.CSSProperties => ({
    width: '6px', height: '6px', borderRadius: '50%',
    background: color, boxShadow: `0 0 6px ${color}, flexShrink: 0`,
  });

  const labelRow = (color: string, title: string, sub?: string) => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: sub ? '4px' : 0 }}>
        <span style={dot(color)} />
        <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{title}</span>
      </div>
      {sub && <p style={{ margin: 0, fontSize: '0.72rem', color: '#374151', paddingLeft: '13px' }}>{sub}</p>}
    </div>
  );

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(15,22,44,0.8)',
    border: '1px solid rgba(244,114,182,0.15)', borderRadius: '12px',
    padding: '13px 16px', color: '#e2e8f0', outline: 'none',
    fontSize: '0.88rem', fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  };

  // ── Age Pill ──────────────────────────────────────────────────
  const agePill = (age: string) => {
    const sel = ageRanges.includes(age);
    return (
      <div
        key={age}
        onClick={() => toggleArrayItem('ageRanges', age, ageRanges)}
        style={{
          padding: '9px 22px', borderRadius: '99px', cursor: 'pointer',
          fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.02em',
          border: `1px solid ${sel ? '#f472b6' : 'rgba(255,255,255,0.08)'}`,
          background: sel
            ? 'linear-gradient(135deg, rgba(244,114,182,0.2), rgba(192,132,252,0.15))'
            : 'rgba(255,255,255,0.02)',
          color: sel ? '#f9a8d4' : '#475569',
          boxShadow: sel ? '0 0 14px rgba(244,114,182,0.25)' : 'none',
          transition: 'all 0.2s ease',
          userSelect: 'none' as const,
        }}
      >
        {age}
      </div>
    );
  };

  // ── Device Card ───────────────────────────────────────────────
  const devices = [
    { id: 'mobile', icon: '📱', label: 'Mobile Only', accent: '#38bdf8' },
    { id: 'desktop', icon: '💻', label: 'Desktop Only', accent: '#c084fc' },
    { id: 'both', icon: '📲', label: 'Both', accent: '#4ade80' },
  ];

  const deviceCard = ({ id, icon, label, accent }: typeof devices[0]) => {
    const sel = data.device === id;
    return (
      <div
        key={id}
        onClick={() => updateData({ device: id })}
        style={{
          flex: 1, minWidth: '120px', padding: '16px 12px', borderRadius: '14px',
          cursor: 'pointer', textAlign: 'center', border: `1px solid ${sel ? accent : 'rgba(255,255,255,0.06)'}`,
          background: sel ? `linear-gradient(135deg, ${accent}18, ${accent}08)` : 'rgba(255,255,255,0.02)',
          color: sel ? accent : '#475569', fontWeight: '700', fontSize: '0.85rem',
          boxShadow: sel ? `0 0 16px ${accent}28` : 'none',
          transition: 'all 0.22s ease', userSelect: 'none' as const,
          position: 'relative' as const,
        }}
      >
        {sel && (
          <div style={{
            position: 'absolute', top: '8px', right: '8px',
            width: '16px', height: '16px', borderRadius: '50%',
            background: accent, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '9px', color: '#000', fontWeight: '900',
          }}>✓</div>
        )}
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{icon}</div>
        <div>{label}</div>
      </div>
    );
  };

  // ── Day Pill ──────────────────────────────────────────────────
  const dayPill = (day: string) => {
    const sel = scheduleDays.includes(day);
    return (
      <div
        key={day}
        onClick={() => toggleArrayItem('scheduleDays', day, scheduleDays)}
        style={{
          padding: '9px 16px', borderRadius: '10px', cursor: 'pointer',
          fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.04em',
          border: `1px solid ${sel ? '#818cf8' : 'rgba(255,255,255,0.07)'}`,
          background: sel
            ? 'linear-gradient(135deg, rgba(129,140,248,0.2), rgba(192,132,252,0.12))'
            : 'rgba(255,255,255,0.02)',
          color: sel ? '#a5b4fc' : '#475569',
          boxShadow: sel ? '0 0 12px rgba(129,140,248,0.22)' : 'none',
          transition: 'all 0.2s ease', userSelect: 'none' as const,
        }}
      >
        {day}
      </div>
    );
  };

  // ── Language Card ─────────────────────────────────────────────
  const langs = [
    { id: 'hindi', label: 'हिंदी', sub: 'Hindi', accent: '#f59e0b' },
    { id: 'english', label: 'EN', sub: 'English', accent: '#38bdf8' },
    { id: 'both', label: 'हिंदी+EN', sub: 'Both', accent: '#4ade80' },
  ];

  const langCard = ({ id, label, sub, accent }: typeof langs[0]) => {
    const sel = data.language === id;
    return (
      <div
        key={id}
        onClick={() => updateData({ language: id })}
        style={{
          flex: 1, minWidth: '100px', padding: '14px 10px', borderRadius: '14px',
          cursor: 'pointer', textAlign: 'center', border: `1px solid ${sel ? accent : 'rgba(255,255,255,0.06)'}`,
          background: sel ? `linear-gradient(135deg, ${accent}18, ${accent}08)` : 'rgba(255,255,255,0.02)',
          boxShadow: sel ? `0 0 16px ${accent}28` : 'none',
          transition: 'all 0.22s ease', userSelect: 'none' as const, position: 'relative' as const,
        }}
      >
        {sel && (
          <div style={{
            position: 'absolute', top: '8px', right: '8px',
            width: '16px', height: '16px', borderRadius: '50%',
            background: accent, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '9px', color: '#000', fontWeight: '900',
          }}>✓</div>
        )}
        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: sel ? accent : '#475569', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '0.72rem', color: sel ? `${accent}99` : '#374151', fontWeight: '600' }}>{sub}</div>
      </div>
    );
  };

  return (
    <div style={wrapperStyle}>
      <div style={auroraStyle} />
      <div style={gridOverlay} />

      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 1.5rem' }}>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.2)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '18px',
            fontSize: '0.7rem', fontWeight: '600', color: '#f472b6', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f472b6', boxShadow: '0 0 8px #f472b6', display: 'inline-block' }} />
            Step 5 — Audience Targeting
          </div>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #f472b6 40%, #c084fc 80%, #818cf8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            margin: '0 0 8px 0', letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>
            Apne Perfect Customer Tak Pahuncho
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Age, device, schedule aur language ke hisaab se audience target karo
          </p>
        </div>

        {/* Main Card */}
        <div style={outerCard}>

          {/* Progress bar */}
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden', margin: '-2.5rem -2.5rem 0', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
            <div style={{
              height: '100%', width: '85%',
              background: 'linear-gradient(90deg, #f472b6, #c084fc, #818cf8)',
              boxShadow: '0 0 12px rgba(244,114,182,0.6)', borderRadius: '99px',
            }} />
          </div>

          {/* ── Age Range ── */}
          <div style={sectionCard}>
            {labelRow('#f472b6', 'Age Range', 'Multiple select kar sakte ho')}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['18-24', '25-34', '35-44', '45-54', '55+'].map(agePill)}
            </div>
            {ageRanges.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: '#374151' }}>Selected:</span>
                {ageRanges.map((a: string) => (
                  <span key={a} style={{ fontSize: '0.72rem', color: '#f9a8d4', background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.2)', borderRadius: '6px', padding: '2px 8px', fontWeight: '600' }}>{a}</span>
                ))}
              </div>
            )}
          </div>

          {/* ── Device Targeting ── */}
          <div style={sectionCard}>
            {labelRow('#38bdf8', 'Device Targeting', 'Kahan ads dikhane hain?')}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {devices.map(deviceCard)}
            </div>
          </div>

          {/* ── Ad Schedule ── */}
          <div style={sectionCard}>
            {labelRow('#818cf8', 'Ad Schedule — Days', 'Kin dinon mein ads chalane hain?')}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(dayPill)}
            </div>

            {/* Quick Presets */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {[
                { label: 'Weekdays', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
                { label: 'Weekend', days: ['Sat', 'Sun'] },
                { label: 'All Days', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
              ].map(({ label, days }) => (
                <button
                  key={label}
                  onClick={() => updateData({ scheduleDays: days })}
                  style={{
                    background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)',
                    borderRadius: '8px', padding: '5px 14px', color: '#818cf8',
                    fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.2s ease',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Time Row */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span style={dot('#34d399')} />
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Start Time</span>
                </div>
                <input type="time" value={data.adStartTime || ''} onChange={(e) => updateData({ adStartTime: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ flex: 1, minWidth: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span style={dot('#f87171')} />
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>End Time</span>
                </div>
                <input type="time" value={data.adEndTime || ''} onChange={(e) => updateData({ adEndTime: e.target.value })} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* ── Language ── */}
          <div style={sectionCard}>
            {labelRow('#f59e0b', 'Language', 'Kis language mein ads dikhane hain?')}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {langs.map(langCard)}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(244,114,182,0.2), rgba(192,132,252,0.2), transparent)' }} />

          {/* ── Navigation ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={prevStep}
              onMouseEnter={() => setHoveredBtn('back')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                background: hoveredBtn === 'back' ? 'rgba(255,255,255,0.05)' : 'none',
                border: '1px solid rgba(255,255,255,0.08)', color: '#64748b',
                cursor: 'pointer', padding: '12px 24px', fontSize: '0.88rem',
                fontFamily: 'inherit', fontWeight: '600', borderRadius: '10px',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s ease', letterSpacing: '0.02em',
              }}
            >
              ← Back
            </button>

            <button
              onClick={nextStep}
              onMouseEnter={() => setHoveredBtn('next')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                background: 'linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #818cf8 100%)',
                color: '#fff', fontWeight: '700', padding: '14px 44px',
                borderRadius: '12px', border: 'none', cursor: 'pointer',
                fontSize: '0.9rem', fontFamily: 'inherit', letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: hoveredBtn === 'next'
                  ? '0 0 0 1px rgba(244,114,182,0.4), 0 12px 32px rgba(244,114,182,0.4)'
                  : '0 0 0 1px rgba(244,114,182,0.25), 0 8px 24px rgba(244,114,182,0.2)',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              Next Step →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}





