'use client';
import { useState } from 'react';

export default function Step3Goals({ data, updateData, nextStep, prevStep }: any) {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const callReporting = data.callReporting !== undefined ? data.callReporting : true;

  // ── Styles ────────────────────────────────────────────────────
  const wrap: React.CSSProperties = {
    position: 'relative', minHeight: '100vh',
    background: 'linear-gradient(135deg, #060b18 0%, #0d1428 40%, #090f1f 100%)',
    fontFamily: "'DM Sans', sans-serif", overflow: 'hidden',
  };
  const aurora: React.CSSProperties = {
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
    background: `
      radial-gradient(ellipse 70% 50% at 20% 20%, rgba(34,211,238,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 15%, rgba(129,140,248,0.07) 0%, transparent 55%),
      radial-gradient(ellipse 50% 55% at 50% 90%, rgba(16,185,129,0.05) 0%, transparent 60%)
    `,
  };
  const grid: React.CSSProperties = {
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: `linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
  };
  const card: React.CSSProperties = {
    position: 'relative', zIndex: 1,
    background: 'rgba(13,20,40,0.75)', backdropFilter: 'blur(20px)',
    padding: '2.5rem', borderRadius: '24px',
    border: '1px solid rgba(34,211,238,0.12)',
    boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 64px rgba(0,0,0,0.5)',
    display: 'flex', flexDirection: 'column', gap: '1.5rem',
  };
  const sCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)', borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem',
  };
  const lbl: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '7px',
    fontSize: '0.68rem', fontWeight: '700', color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.6rem',
  };
  const inp: React.CSSProperties = {
    width: '100%', background: 'rgba(15,22,44,0.8)',
    border: '1px solid rgba(34,211,238,0.15)', borderRadius: '12px',
    padding: '13px 16px', color: '#e2e8f0', outline: 'none',
    boxSizing: 'border-box', fontSize: '0.88rem', fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
  };
  const dot = (c: string): React.CSSProperties => ({
    width: '6px', height: '6px', borderRadius: '50%',
    background: c, boxShadow: `0 0 6px ${c}`, flexShrink: 0,
  });

  // Toggle
  const togStyle = (on: boolean): React.CSSProperties => ({
    width: '46px', height: '26px', flexShrink: 0,
    background: on ? 'linear-gradient(135deg,#10b981,#059669)' : 'rgba(255,255,255,0.06)',
    borderRadius: '99px', position: 'relative', cursor: 'pointer',
    border: on ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.1)',
    boxShadow: on ? '0 0 12px rgba(16,185,129,0.3)' : 'none', transition: 'all 0.3s ease',
  });
  const togCircle = (on: boolean): React.CSSProperties => ({
    width: '18px', height: '18px', background: '#fff', borderRadius: '50%',
    position: 'absolute', top: '3px', left: on ? '24px' : '3px',
    transition: 'left 0.28s ease', boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
  });

  // Section heading
  const SHead = ({ color, icon, text }: any) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0, background: `${color}18`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{icon}</div>
      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', background: `linear-gradient(135deg,${color},${color}99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{text}</h3>
    </div>
  );

  // Toggle row
  const TogRow = ({ label, sub, on, toggle }: any) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'rgba(15,22,44,0.6)', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div>
        <span style={{ display: 'block', color: '#e2e8f0', fontWeight: '600', fontSize: '0.88rem', marginBottom: '3px' }}>{label}</span>
        {sub && <span style={{ fontSize: '0.72rem', color: '#4b5563' }}>{sub}</span>}
      </div>
      <div onClick={toggle} style={togStyle(on)}><div style={togCircle(on)} /></div>
    </div>
  );

  // Shared call fields
  const CallFields = ({ phoneKey }: { phoneKey: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={lbl}>
          <span style={dot('#22d3ee')} />Phone Number
          {phoneKey === 'extensionPhoneNumber' && <span style={{ color: '#475569', fontSize: '0.65rem', marginLeft: '4px', textTransform: 'none', letterSpacing: 0 }}>(Optional)</span>}
          {phoneKey === 'phoneNumber' && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem', pointerEvents: 'none' }}>📞</span>
          <input type="tel" value={data[phoneKey] || ''} onChange={e => updateData({ [phoneKey]: e.target.value })}
            placeholder="+91 98765 43210" style={{ ...inp, paddingLeft: '42px' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px,1fr))', gap: '1rem' }}>
        <div>
          <label style={lbl}><span style={dot('#818cf8')} />Call Timing</label>
          <select value={data.callTiming || '24/7'} onChange={e => updateData({ callTiming: e.target.value })}
            style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
            <option value="24/7">24/7 Available</option>
            <option value="business_hours">Business Hours Only</option>
          </select>
        </div>
        <div>
          <label style={lbl}><span style={dot('#f472b6')} />Conversion Type</label>
          <select value={data.callConversionType || 'all'} onChange={e => updateData({ callConversionType: e.target.value })}
            style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
            <option value="all">All Calls</option>
            <option value="gt_30">Calls &gt; 30 sec</option>
            <option value="gt_60">Calls &gt; 60 sec</option>
          </select>
        </div>
        <div>
          <label style={lbl}><span style={dot('#eab308')} />Target Device</label>
          <select value={data.callDevice || 'mobile'} onChange={e => updateData({ callDevice: e.target.value })}
            style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
            <option value="mobile">Mobile Only</option>
            <option value="all">All Devices</option>
          </select>
        </div>
      </div>

      {data.callTiming === 'business_hours' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={lbl}><span style={dot('#22d3ee')} />Start Time</label>
            <input type="time" value={data.startTime || '09:00'} onChange={e => updateData({ startTime: e.target.value })} style={inp} />
          </div>
          <div>
            <label style={lbl}><span style={dot('#f472b6')} />End Time</label>
            <input type="time" value={data.endTime || '18:00'} onChange={e => updateData({ endTime: e.target.value })} style={inp} />
          </div>
        </div>
      )}

      <TogRow
        label="Call Reporting"
        sub="Track call duration, caller area code & call status"
        on={callReporting}
        toggle={() => updateData({ callReporting: !callReporting })}
      />
    </div>
  );

  // Can proceed
  const canGo = () => {
    if (!data.goal) return false;
    if (data.goal === 'calls')    return !!(data.phoneNumber);
    if (data.goal === 'messages') return !!(data.whatsappNumber);
    if (data.goal === 'traffic')  return !!(data.finalUrl);
    return true; // leads — all optional
  };

  return (
    <div style={wrap}>
      <div style={aurora} /><div style={grid} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        input[type=time]::-webkit-calendar-picker-indicator { filter: invert(0.4); }
        select option { background: #0d1428; color: #e2e8f0; }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: '99px', padding: '6px 16px', marginBottom: '1rem', fontSize: '0.68rem', fontWeight: '700', color: '#22d3ee', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 8px #22d3ee', display: 'inline-block' }} />
            Step 3 of 6 — Goal Configuration
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: '800', background: 'linear-gradient(135deg,#e2e8f0 0%,#22d3ee 40%,#818cf8 80%,#c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Configure Your Campaign Goal
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Set up detailed settings based on your campaign objective</p>
        </div>

        <div style={card}>
          {/* Progress bar */}
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden', margin: '-2.5rem -2.5rem 0', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
            <div style={{ height: '100%', width: '50%', background: 'linear-gradient(90deg,#22d3ee,#818cf8,#c084fc)', boxShadow: '0 0 12px rgba(34,211,238,0.6)', borderRadius: '99px' }} />
          </div>

          {/* ── NO GOAL ── */}
          {!data.goal && (
            <div style={{ ...sCard, textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 6px', fontWeight: '600' }}>No goal selected</p>
              <p style={{ color: '#374151', fontSize: '0.8rem', margin: 0 }}>Go back to Step 1 and select a campaign goal first.</p>
            </div>
          )}

          {/* ══════════════════════════════════════════ */}
          {/* ── LEADS ── */}
          {/* ══════════════════════════════════════════ */}
          {data.goal === 'leads' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Lead Form Toggle Card */}
              <div style={sCard}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: data.leadFormEnabled ? '1.5rem' : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(192,132,252,0.12)', border: '1px solid rgba(192,132,252,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>📋</div>
                    <div>
                      <div style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '0.95rem' }}>Lead Form</div>
                      <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: '2px' }}>Collect info from users — name, phone, email</div>
                    </div>
                  </div>
                  <div onClick={() => updateData({ leadFormEnabled: !data.leadFormEnabled })} style={togStyle(!!data.leadFormEnabled)}>
                    <div style={togCircle(!!data.leadFormEnabled)} />
                  </div>
                </div>

                {data.leadFormEnabled && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Fields to collect */}
                    <div>
                      <label style={lbl}><span style={dot('#c084fc')} />Select fields to collect</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                        {['Full Name', 'Phone Number', 'Email', 'City', 'Business Name', 'Message'].map(field => {
                          const sel = (data.leadFields || ['Full Name', 'Phone Number', 'City']).includes(field);
                          return (
                            <button key={field} onClick={() => {
                              const cur = data.leadFields || ['Full Name', 'Phone Number', 'City'];
                              updateData({ leadFields: sel ? cur.filter((f: string) => f !== field) : [...cur, field] });
                            }} style={{
                              padding: '7px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '600',
                              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s ease',
                              border: sel ? '1px solid rgba(192,132,252,0.5)' : '1px solid rgba(255,255,255,0.08)',
                              background: sel ? 'rgba(192,132,252,0.12)' : 'rgba(255,255,255,0.03)',
                              color: sel ? '#c084fc' : '#64748b',
                            }}>
                              {sel ? '✓ ' : ''}{field}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Thank you message */}
                    <div>
                      <label style={lbl}><span style={dot('#4ade80')} />Thank You Message <span style={{ color: '#475569', fontSize: '0.65rem', textTransform: 'none', letterSpacing: 0, marginLeft: '4px' }}>(shown after form submit)</span></label>
                      <input type="text" value={data.thankYouMessage || ''} onChange={e => updateData({ thankYouMessage: e.target.value })}
                        placeholder="Thanks! We will contact you shortly." style={inp} />
                    </div>

                    {/* Receiver email */}
                    <div>
                      <label style={lbl}><span style={dot('#eab308')} />Receive Leads At <span style={{ color: '#475569', fontSize: '0.65rem', textTransform: 'none', letterSpacing: 0, marginLeft: '4px' }}>(optional)</span></label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>✉️</span>
                        <input type="email" value={data.leadsEmail || ''} onChange={e => updateData({ leadsEmail: e.target.value })}
                          placeholder="admin@yourbusiness.com" style={{ ...inp, paddingLeft: '42px' }} />
                      </div>
                      <p style={{ fontSize: '0.72rem', color: '#374151', marginTop: '5px' }}>ℹ️ You'll get email notification for every new lead</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Call Extension Toggle Card */}
              <div style={sCard}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: data.callExtEnabled ? '1.5rem' : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>📞</div>
                    <div>
                      <div style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '0.95rem' }}>Call Extension <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '400' }}>(Optional)</span></div>
                      <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: '2px' }}>Let users call directly from your ad — 2x better conversion</div>
                    </div>
                  </div>
                  <div onClick={() => updateData({ callExtEnabled: !data.callExtEnabled })} style={togStyle(!!data.callExtEnabled)}>
                    <div style={togCircle(!!data.callExtEnabled)} />
                  </div>
                </div>
                {data.callExtEnabled && <CallFields phoneKey="extensionPhoneNumber" />}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════ */}
          {/* ── CALLS ── */}
          {/* ══════════════════════════════════════════ */}
          {data.goal === 'calls' && (
            <div style={sCard}>
              <SHead color="#22d3ee" icon="📞" text="Call Campaign Setup" />
              <div style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: '10px', padding: '10px 14px', marginBottom: '1.25rem', fontSize: '0.78rem', color: '#22d3ee' }}>
                📱 Users will call you directly when they click your ad
              </div>
              <CallFields phoneKey="phoneNumber" />
            </div>
          )}

          {/* ══════════════════════════════════════════ */}
          {/* ── MESSAGES / WHATSAPP ── */}
          {/* ══════════════════════════════════════════ */}
          {data.goal === 'messages' && (
            <div style={sCard}>
              <SHead color="#4ade80" icon="💬" text="WhatsApp / Messages Setup" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                <div>
                  <label style={lbl}><span style={dot('#4ade80')} />WhatsApp Number <span style={{ color: '#ef4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>💬</span>
                    <input type="text" value={data.whatsappNumber || ''} onChange={e => updateData({ whatsappNumber: e.target.value })}
                      placeholder="wa.me/919876543210" style={{ ...inp, paddingLeft: '42px' }} />
                  </div>
                  <p style={{ fontSize: '0.72rem', color: '#374151', marginTop: '5px' }}>Format: wa.me/91XXXXXXXXXX — include country code</p>
                </div>

                <div>
                  <label style={lbl}><span style={dot('#34d399')} />Auto-Reply Message <span style={{ color: '#475569', fontSize: '0.65rem', textTransform: 'none', letterSpacing: 0, marginLeft: '4px' }}>(optional)</span></label>
                  <textarea value={data.whatsappMessage || ''} onChange={e => updateData({ whatsappMessage: e.target.value })}
                    placeholder="Hi! Thanks for contacting us. How can we help you today?" rows={3}
                    style={{ ...inp, resize: 'none', lineHeight: 1.6 }} />
                </div>

                <div>
                  <label style={lbl}><span style={dot('#818cf8')} />Target Device</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[
                      { val: 'mobile', label: '📱 Mobile Only', desc: 'Recommended for WhatsApp' },
                      { val: 'all',    label: '💻📱 All Devices', desc: 'Mobile + Desktop'       },
                    ].map(({ val, label, desc }) => (
                      <button key={val} onClick={() => updateData({ device: val })} style={{
                        padding: '12px', borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit',
                        textAlign: 'left', transition: 'all 0.2s ease', border: 'none',
                        background: data.device === val ? 'rgba(129,140,248,0.12)' : 'rgba(255,255,255,0.02)',
                        outline: data.device === val ? '1px solid rgba(129,140,248,0.4)' : '1px solid rgba(255,255,255,0.07)',
                      }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: data.device === val ? '#818cf8' : '#94a3b8', marginBottom: '3px' }}>{label}</div>
                        <div style={{ fontSize: '0.72rem', color: '#374151' }}>{desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════ */}
          {/* ── TRAFFIC / WEBSITE VISIT ── */}
          {/* ══════════════════════════════════════════ */}
          {data.goal === 'traffic' && (
            <div style={sCard}>
              <SHead color="#38bdf8" icon="🌐" text="Website Traffic Setup" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Landing URL */}
                <div>
                  <label style={lbl}><span style={dot('#38bdf8')} />Landing Page URL <span style={{ color: '#ef4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>🔗</span>
                    <input type="url" value={data.finalUrl || ''} onChange={e => updateData({ finalUrl: e.target.value })}
                      placeholder="https://yourwebsite.com/offer" style={{ ...inp, paddingLeft: '42px' }} />
                  </div>
                  <p style={{ fontSize: '0.72rem', color: '#374151', marginTop: '5px' }}>Users will land on this page after clicking your ad</p>
                </div>

                {/* Device */}
                <div>
                  <label style={lbl}><span style={dot('#818cf8')} />Target Device</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {[
                      { val: 'all',     icon: '💻📱', label: 'All Devices'  },
                      { val: 'mobile',  icon: '📱',    label: 'Mobile Only'  },
                      { val: 'desktop', icon: '💻',    label: 'Desktop Only' },
                    ].map(({ val, icon, label }) => (
                      <button key={val} onClick={() => updateData({ device: val })} style={{
                        padding: '14px 8px', borderRadius: '12px', cursor: 'pointer',
                        fontFamily: 'inherit', textAlign: 'center', border: 'none',
                        transition: 'all 0.2s ease',
                        background: data.device === val ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.02)',
                        outline: data.device === val ? '1px solid rgba(56,189,248,0.4)' : '1px solid rgba(255,255,255,0.07)',
                      }}>
                        <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{icon}</div>
                        <div style={{ fontSize: '0.78rem', fontWeight: '700', color: data.device === val ? '#38bdf8' : '#64748b' }}>{label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ad Schedule */}
                <div>
                  <label style={lbl}><span style={dot('#4ade80')} />Ad Schedule</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[
                      { val: 'all_day',        label: '🕐 Run 24/7',            desc: 'Maximum reach'          },
                      { val: 'business_hours', label: '🏢 Business Hours Only',  desc: 'Mon–Sat 9AM–6PM'        },
                    ].map(({ val, label, desc }) => (
                      <button key={val} onClick={() => updateData({ adSchedule: val })} style={{
                        padding: '14px', borderRadius: '12px', cursor: 'pointer',
                        fontFamily: 'inherit', textAlign: 'left', border: 'none',
                        transition: 'all 0.2s ease',
                        background: data.adSchedule === val ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.02)',
                        outline: data.adSchedule === val ? '1px solid rgba(74,222,128,0.4)' : '1px solid rgba(255,255,255,0.07)',
                      }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: data.adSchedule === val ? '#4ade80' : '#94a3b8', marginBottom: '3px' }}>{label}</div>
                        <div style={{ fontSize: '0.72rem', color: '#374151' }}>{desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info strips */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
                  {[
                    { icon: '🎯', label: 'Max Clicks',    desc: 'Auto bid strategy' },
                    { icon: '📊', label: 'Smart Bidding', desc: 'Google optimized'  },
                    { icon: '⚡', label: 'Fast Launch',   desc: 'Live in minutes'   },
                  ].map(({ icon, label, desc }) => (
                    <div key={label} style={{ background: 'rgba(56,189,248,0.04)', border: '1px solid rgba(56,189,248,0.1)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#e2e8f0', marginBottom: '3px' }}>{label}</div>
                      <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Validation Warning ── */}
          {data.goal && !canGo() && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '12px 16px', fontSize: '0.82rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚠️&nbsp;
              {data.goal === 'calls'    && 'Phone number is required for call campaign'}
              {data.goal === 'messages' && 'WhatsApp number is required'}
              {data.goal === 'traffic'  && 'Landing page URL is required'}
            </div>
          )}

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(34,211,238,0.2),rgba(129,140,248,0.2),transparent)' }} />

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={prevStep}
              onMouseEnter={() => setHoveredBtn('back')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{ background: hoveredBtn === 'back' ? 'rgba(255,255,255,0.05)' : 'none', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b', cursor: 'pointer', padding: '12px 24px', fontSize: '0.88rem', fontFamily: 'inherit', fontWeight: '600', borderRadius: '10px', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ← Back
            </button>
            <button onClick={nextStep} disabled={!canGo()}
              onMouseEnter={() => setHoveredBtn('next')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                background: canGo() ? 'linear-gradient(135deg,#22d3ee 0%,#818cf8 50%,#c084fc 100%)' : 'rgba(255,255,255,0.05)',
                color: canGo() ? '#fff' : '#374151', fontWeight: '700', padding: '14px 44px',
                borderRadius: '12px', border: 'none', cursor: canGo() ? 'pointer' : 'not-allowed',
                fontSize: '0.9rem', fontFamily: 'inherit', letterSpacing: '0.04em', textTransform: 'uppercase',
                boxShadow: canGo() ? (hoveredBtn === 'next' ? '0 0 0 1px rgba(34,211,238,0.4),0 12px 32px rgba(34,211,238,0.35)' : '0 0 0 1px rgba(34,211,238,0.25),0 8px 24px rgba(34,211,238,0.2)') : 'none',
                transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '10px',
              }}>
              Next Step →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}