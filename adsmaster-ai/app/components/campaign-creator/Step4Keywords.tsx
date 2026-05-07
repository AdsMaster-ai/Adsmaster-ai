'use client';

import { useState } from 'react';

export default function Step4Keywords({ data, updateData, nextStep, prevStep }: any) {
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const [isGeneratingNegatives, setIsGeneratingNegatives] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [matchType, setMatchType] = useState('broad');
  const [newNegative, setNewNegative] = useState('');
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const keywordsList = Array.isArray(data.keywords) ? data.keywords : [];
  const negativeList = Array.isArray(data.negativeKeywords) ? data.negativeKeywords : [];

  // ── Handlers (unchanged) ──────────────────────────────────────
  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    updateData({ keywords: [...keywordsList, { text: newKeyword.trim(), match: matchType }] });
    setNewKeyword('');
  };
  const handleRemoveKeyword = (index: number) => updateData({ keywords: keywordsList.filter((_: any, i: number) => i !== index) });
  const handleAddNegative = () => {
    if (!newNegative.trim()) return;
    updateData({ negativeKeywords: [...negativeList, newNegative.trim()] });
    setNewNegative('');
  };
  const handleRemoveNegative = (index: number) => updateData({ negativeKeywords: negativeList.filter((_: any, i: number) => i !== index) });

  const generateAIKeywords = () => {
    setIsGeneratingKeywords(true);
    setTimeout(() => {
      const biz = data.businessType ? data.businessType.replace('-', ' ') : 'services';
      updateData({ keywords: [
        { text: `best ${biz}`, match: 'broad' }, { text: `${biz} near me`, match: 'broad' },
        { text: `top rated ${biz}`, match: 'broad' }, { text: `affordable ${biz}`, match: 'broad' },
        { text: `hire ${biz} expert`, match: 'broad' }, { text: `local ${biz} company`, match: 'phrase' },
        { text: `${biz} deals and offers`, match: 'phrase' }, { text: `professional ${biz}`, match: 'phrase' },
        { text: `emergency ${biz} booking`, match: 'phrase' }, { text: `premium ${biz}`, match: 'phrase' },
        { text: `${biz}`, match: 'exact' },
        { text: `${biz} in ${data.targetCity !== 'All India' ? data.targetCity : 'my city'}`, match: 'exact' },
        { text: `book ${biz}`, match: 'exact' }, { text: `${biz} price`, match: 'exact' },
        { text: `cheap ${biz}`, match: 'exact' },
      ]});
      setIsGeneratingKeywords(false);
    }, 1500);
  };

  const generateAINegativeKeywords = () => {
    setIsGeneratingNegatives(true);
    setTimeout(() => {
      updateData({ negativeKeywords: ['free', 'jobs', 'internship', 'hiring', 'career', 'course', 'training', 'classes', 'salary', 'cheap quality'] });
      setIsGeneratingNegatives(false);
    }, 1500);
  };

  // ── Tag Styles ────────────────────────────────────────────────
  const getTagStyle = (type: string): React.CSSProperties => {
    const base: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: '600', border: '1px solid', letterSpacing: '0.01em' };
    if (type === 'broad') return { ...base, background: 'rgba(56,189,248,0.1)', color: '#38bdf8', borderColor: 'rgba(56,189,248,0.3)' };
    if (type === 'phrase') return { ...base, background: 'rgba(192,132,252,0.1)', color: '#c084fc', borderColor: 'rgba(192,132,252,0.3)' };
    if (type === 'exact') return { ...base, background: 'rgba(74,222,128,0.1)', color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)' };
    return { ...base, background: 'rgba(248,113,113,0.1)', color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' };
  };

  const formatKeywordText = (text: string, type: string) => {
    if (type === 'phrase') return `"${text}"`;
    if (type === 'exact') return `[${text}]`;
    return text;
  };

  // ── Layout Styles ─────────────────────────────────────────────
  const wrapperStyle: React.CSSProperties = {
    position: 'relative', minHeight: '100vh',
    background: 'linear-gradient(135deg, #060b18 0%, #0d1428 40%, #090f1f 100%)',
    fontFamily: "'Sora', 'Nunito', sans-serif", overflow: 'hidden',
  };

  const auroraStyle: React.CSSProperties = {
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
    background: `
      radial-gradient(ellipse 70% 50% at 10% 20%, rgba(192,132,252,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 88% 12%, rgba(236,72,153,0.07) 0%, transparent 55%),
      radial-gradient(ellipse 55% 50% at 50% 88%, rgba(56,189,248,0.05) 0%, transparent 60%)
    `,
  };

  const gridOverlay: React.CSSProperties = {
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: `linear-gradient(rgba(192,132,252,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(192,132,252,0.025) 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
  };

  const outerCard: React.CSSProperties = {
    position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.75rem',
    background: 'rgba(13,20,40,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(192,132,252,0.12)',
    boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
    margin: '0 auto',  maxWidth: '100%',
  };

  const sectionCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)', borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', backdropFilter: 'blur(8px)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '7px',
    fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem',
  };

  const dot = (color: string): React.CSSProperties => ({
    width: '6px', height: '6px', borderRadius: '50%',
    background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0,
  });

  const inputStyle: React.CSSProperties = {
    background: 'rgba(15,22,44,0.8)', border: '1px solid rgba(192,132,252,0.15)',
    borderRadius: '12px', padding: '13px 16px', color: '#e2e8f0', outline: 'none',
    fontSize: '0.88rem', fontFamily: 'inherit', transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  };

  const aiBtn = (accent: string, glow: string, key: string): React.CSSProperties => ({
    background: hoveredBtn === key ? `linear-gradient(135deg, ${accent}22, ${glow}22)` : `linear-gradient(135deg, ${accent}12, ${glow}12)`,
    color: accent, border: `1px solid ${accent}55`, borderRadius: '10px',
    padding: '9px 18px', cursor: 'pointer', fontWeight: '700',
    display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.8rem',
    fontFamily: 'inherit', letterSpacing: '0.02em', whiteSpace: 'nowrap' as const,
    boxShadow: hoveredBtn === key ? `0 0 20px ${accent}25` : `0 0 8px ${accent}10`,
    transition: 'all 0.2s ease',
  });

  const tagCloud = (isEmpty: boolean, children: React.ReactNode, emptyMsg: string) => (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '72px',
      padding: '14px', borderRadius: '12px',
      background: 'rgba(6,11,24,0.6)', border: '1px solid rgba(255,255,255,0.06)',
      alignItems: isEmpty ? 'center' : 'flex-start',
      justifyContent: isEmpty ? 'center' : 'flex-start',
    }}>
      {isEmpty
        ? <p style={{ color: '#374151', margin: 0, fontSize: '0.82rem', fontStyle: 'italic' }}>{emptyMsg}</p>
        : children}
    </div>
  );

  const matchLegend = [
    { type: 'broad', label: 'Broad', example: 'keyword' },
    { type: 'phrase', label: 'Phrase', example: '"keyword"' },
    { type: 'exact', label: 'Exact', example: '[keyword]' },
  ];

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
            fontSize: '0.7rem', fontWeight: '600', color: '#c084fc', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 8px #c084fc', display: 'inline-block' }} />
            Step 4 of 4 — Keywords
          </div>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #c084fc 35%, #ec4899 70%, #f87171 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            margin: '0 0 8px 0', letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>
            Targeting & Keywords
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Sahi keywords se most relevant audience tak ads pahuncho
          </p>
        </div>

        {/* Main Card */}
        <div style={outerCard}>

          {/* Progress Bar — 100% */}
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden', margin: '-2.5rem -2.5rem 0', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
            <div style={{
              height: '100%', width: '100%',
              background: 'linear-gradient(90deg, #38bdf8, #c084fc, #ec4899, #f87171)',
              boxShadow: '0 0 12px rgba(192,132,252,0.6)', borderRadius: '99px',
            }} />
          </div>

          {/* ── Match Type Legend ── */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {matchLegend.map(({ type, label, example }) => (
              <div key={type} style={{
                ...getTagStyle(type), borderRadius: '8px', padding: '6px 14px',
                fontSize: '0.75rem', gap: '8px',
              }}>
                <span style={{ fontWeight: '800' }}>{label}</span>
                <span style={{ opacity: 0.6, fontFamily: 'monospace' }}>{example}</span>
              </div>
            ))}
            <span style={{ fontSize: '0.72rem', color: '#374151', alignSelf: 'center', marginLeft: '4px' }}>
              — Match types ka preview
            </span>
          </div>

          {/* ── TARGET KEYWORDS ── */}
          <div style={sectionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#e2e8f0', fontSize: '1rem', fontWeight: '700', letterSpacing: '-0.01em' }}>Target Keywords</h3>
                <p style={{ margin: 0, color: '#4b5563', fontSize: '0.75rem' }}>Woh words jo log aapka business dhundhne ke liye search karte hain</p>
              </div>
              <button
                onClick={generateAIKeywords}
                disabled={isGeneratingKeywords}
                onMouseEnter={() => setHoveredBtn('keywords')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{ ...aiBtn('#c084fc', '#ec4899', 'keywords'), opacity: isGeneratingKeywords ? 0.7 : 1 }}
              >
                {isGeneratingKeywords ? (
                  <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span> Analyzing...</>
                ) : '✨ Auto-Generate 15'}
              </button>
            </div>

            {/* Add Keyword Row */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                placeholder="Keyword type karo..."
                style={{ ...inputStyle, flex: '1 1 200px' }}
              />
              <select
                value={matchType}
                onChange={(e) => setMatchType(e.target.value)}
                style={{ ...inputStyle, width: '160px', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }}
              >
                <option value="broad">Broad Match</option>
                <option value="phrase">"Phrase Match"</option>
                <option value="exact">[Exact Match]</option>
              </select>
              <button
                onClick={handleAddKeyword}
                onMouseEnter={() => setHoveredBtn('addkw')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  background: hoveredBtn === 'addkw' ? 'linear-gradient(135deg, #38bdf8, #818cf8)' : 'rgba(56,189,248,0.15)',
                  color: '#38bdf8', border: '1px solid rgba(56,189,248,0.4)',
                  borderRadius: '12px', padding: '0 22px', fontWeight: '700',
                  cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit',
                  transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                  ...(hoveredBtn === 'addkw' ? { color: '#fff', boxShadow: '0 0 16px rgba(56,189,248,0.3)' } : {}),
                }}
              >
                + Add
              </button>
            </div>

            {/* Tags Cloud */}
            {tagCloud(
              keywordsList.length === 0,
              keywordsList.map((kw: any, i: number) => (
                <div key={i} style={getTagStyle(kw.match)}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{formatKeywordText(kw.text, kw.match)}</span>
                  <button onClick={() => handleRemoveKeyword(i)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0', fontSize: '1rem', lineHeight: 1, opacity: 0.7, display: 'flex', alignItems: 'center' }}>×</button>
                </div>
              )),
              'Abhi koi keyword nahi. AI use karo ya manually add karo.'
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <span style={{
                fontSize: '0.72rem', fontWeight: '700', color: '#374151',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '99px', padding: '3px 10px',
              }}>
                {keywordsList.length} keywords
              </span>
            </div>
          </div>

          {/* ── NEGATIVE KEYWORDS ── */}
          <div style={{ ...sectionCard, borderColor: 'rgba(248,113,113,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#f87171', fontSize: '1rem', fontWeight: '700', letterSpacing: '-0.01em' }}>Negative Keywords</h3>
                <p style={{ margin: 0, color: '#4b5563', fontSize: '0.75rem' }}>In words par ads mat dikhao — e.g. "free", "jobs"</p>
              </div>
              <button
                onClick={generateAINegativeKeywords}
                disabled={isGeneratingNegatives}
                onMouseEnter={() => setHoveredBtn('negkw')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{ ...aiBtn('#f87171', '#ef4444', 'negkw'), opacity: isGeneratingNegatives ? 0.7 : 1 }}
              >
                {isGeneratingNegatives ? '⏳ Analyzing...' : '🚫 AI Suggest 10'}
              </button>
            </div>

            {/* Add Negative Row */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={newNegative}
                onChange={(e) => setNewNegative(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNegative()}
                placeholder="Negative keyword type karo..."
                style={{ ...inputStyle, flex: '1 1 200px', borderColor: 'rgba(248,113,113,0.2)' }}
              />
              <button
                onClick={handleAddNegative}
                onMouseEnter={() => setHoveredBtn('addneg')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  background: hoveredBtn === 'addneg' ? 'linear-gradient(135deg, #f87171, #ef4444)' : 'rgba(248,113,113,0.12)',
                  color: hoveredBtn === 'addneg' ? '#fff' : '#f87171',
                  border: '1px solid rgba(248,113,113,0.4)',
                  borderRadius: '12px', padding: '0 22px', fontWeight: '700',
                  cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit',
                  transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                  ...(hoveredBtn === 'addneg' ? { boxShadow: '0 0 16px rgba(248,113,113,0.3)' } : {}),
                }}
              >
                + Add
              </button>
            </div>

            {/* Negative Tags */}
            {tagCloud(
              negativeList.length === 0,
              negativeList.map((word: string, i: number) => (
                <div key={i} style={getTagStyle('negative')}>
                  <span>−</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{word}</span>
                  <button onClick={() => handleRemoveNegative(i)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0', fontSize: '1rem', lineHeight: 1, opacity: 0.7, display: 'flex', alignItems: 'center' }}>×</button>
                </div>
              )),
              'Koi negative keyword nahi. AI suggestions use karo.'
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <span style={{
                fontSize: '0.72rem', fontWeight: '700', color: '#374151',
                background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)',
                borderRadius: '99px', padding: '3px 10px',
              }}>
                {negativeList.length} negative keywords
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.2), rgba(248,113,113,0.2), transparent)' }} />

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
                background: 'linear-gradient(135deg, #c084fc 0%, #ec4899 60%, #f87171 100%)',
                color: '#fff', fontWeight: '700', padding: '14px 44px',
                borderRadius: '12px', border: 'none', cursor: 'pointer',
                fontSize: '0.9rem', fontFamily: 'inherit', letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: hoveredBtn === 'next'
                  ? '0 0 0 1px rgba(192,132,252,0.4), 0 12px 32px rgba(192,132,252,0.4)'
                  : '0 0 0 1px rgba(192,132,252,0.25), 0 8px 24px rgba(192,132,252,0.25)',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              Launch Campaign 🚀
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}





