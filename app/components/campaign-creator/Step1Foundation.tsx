
'use client';

import { useState } from 'react';

export default function Step1Foundation({ data, updateData, nextStep }: any) {

  const [isSuggesting, setIsSuggesting] = useState(false);
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);
  const [hoveredBudget, setHoveredBudget] = useState<string | null>(null);

  const suggestBudget = () => {
    setIsSuggesting(true);
    setTimeout(() => {
      updateData({ dailyBudget: '1500' });
      setIsSuggesting(false);
    }, 1000);
  };

  const goals = [
    { id: 'leads', title: 'Leads Generate', desc: 'Form fill, enquiry', icon: '📋', accent: '#38bdf8' },
    { id: 'calls', title: 'Calls', desc: 'Direct phone calls', icon: '📞', accent: '#a78bfa' },
    { id: 'messages', title: 'Messages / WhatsApp', desc: 'Chat se contact', icon: '💬', accent: '#34d399' },
    { id: 'traffic', title: 'Website Visit', desc: 'Traffic & page views', icon: '🌐', accent: '#f472b6' }
  ];

  const budgetOptions = ['200', '500', '1000', '2000', '5000'];

  // ── Core Styles ──────────────────────────────────────────────
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
      radial-gradient(ellipse 80% 50% at 10% 20%, rgba(56,189,248,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 90% 10%, rgba(139,92,246,0.08) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 50% 90%, rgba(52,211,153,0.05) 0%, transparent 60%)
    `,
  };

  const gridOverlay: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0,
    backgroundImage: `
      linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  };

const cardStyle: React.CSSProperties = {
   position: 'relative',
   zIndex: 1,
   display: 'flex',
   flexDirection: 'column',
   gap: '2rem',
   background: 'rgba(13,20,40,0.7)',
   backdropFilter: 'blur(20px)',
   WebkitBackdropFilter: 'blur(20px)',
   padding: '2.5rem',
   borderRadius: '24px',
   border: '1px solid rgba(56,189,248,0.12)',
   boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
   margin: '0',
   width: '100%',
   maxWidth: '100%',
   minHeight: 'calc(100vh - 120px)',
};

  const sectionStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '1.5rem',
    backdropFilter: 'blur(8px)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '0.4rem',
  };

  const labelDotStyle = (color: string): React.CSSProperties => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: color,
    boxShadow: `0 0 6px ${color}`,
    flexShrink: 0,
  });

  const subText: React.CSSProperties = {
    fontSize: '0.72rem',
    color: '#4b5563',
    marginBottom: '12px',
    display: 'block',
    letterSpacing: '0.01em',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(15,22,44,0.8)',
    border: '1px solid rgba(56,189,248,0.15)',
    borderRadius: '12px',
    padding: '13px 16px',
    color: '#e2e8f0',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '0.88rem',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    letterSpacing: '0.01em',
  };

  const inputFocusStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: 'rgba(56,189,248,0.5)',
    boxShadow: '0 0 0 3px rgba(56,189,248,0.08)',
  };

  // ── Header ────────────────────────────────────────────────────
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '0.5rem',
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div style={wrapperStyle}>
      <div style={auroraStyle} />
      <div style={gridOverlay} />

      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '20px',
            fontSize: '0.72rem', fontWeight: '600', color: '#38bdf8', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 8px #38bdf8', display: 'inline-block' }} />
            Step 1 of 4 — Foundation
          </div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: '800',
            color: 'transparent',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #38bdf8 40%, #a78bfa 80%, #f472b6 100%)',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>
            Campaign ka Foundation Set Karo
          </h1>
        
        </div>

        {/* Main Card */}
        <div style={cardStyle}>

          {/* Progress bar at top of card */}
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden', margin: '-2.5rem -2.5rem 0', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
            <div style={{
              height: '100%', width: '25%',
              background: 'linear-gradient(90deg, #38bdf8, #a78bfa)',
              boxShadow: '0 0 12px rgba(56,189,248,0.6)',
              borderRadius: '99px',
            }} />
          </div>

          {/* ── Website URL ── */}
          <div style={sectionStyle}>
            <label style={labelStyle}>
              <span style={labelDotStyle('#38bdf8')} />
              Website URL
            </label>
            <span style={subText}>AI isi URL se aapka business samjhega aur ads optimize karega</span>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '1rem', lineHeight: 1, pointerEvents: 'none',
              }}>🔗</span>
              <input
                type="url"
                value={data.websiteUrl || ''}
                onChange={(e) => updateData({ websiteUrl: e.target.value })}
                placeholder="https://yourwebsite.com"
                style={{ ...inputStyle, paddingLeft: '42px' }}
              />
            </div>
          </div>

          {/* ── Campaign Goal ── */}
          <div style={sectionStyle}>
            <label style={labelStyle}>
              <span style={labelDotStyle('#a78bfa')} />
              Campaign Goal *
            </label>
            <span style={subText}>Aap kya achieve karna chahte hain?</span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.85rem',
              marginTop: '4px',
            }}>
              {goals.map((goal) => {
                const isSelected = data.goal === goal.id;
                const isHovered = hoveredGoal === goal.id;
                return (
                  <div
                    key={goal.id}
                    onClick={() => updateData({ goal: goal.id })}
                    onMouseEnter={() => setHoveredGoal(goal.id)}
                    onMouseLeave={() => setHoveredGoal(null)}
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, rgba(${goal.accent === '#38bdf8' ? '56,189,248' : goal.accent === '#a78bfa' ? '167,139,250' : goal.accent === '#34d399' ? '52,211,153' : '244,114,182'},0.12) 0%, rgba(${goal.accent === '#38bdf8' ? '56,189,248' : goal.accent === '#a78bfa' ? '167,139,250' : goal.accent === '#34d399' ? '52,211,153' : '244,114,182'},0.04) 100%)`
                        : isHovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                      border: isSelected
                        ? `1px solid ${goal.accent}`
                        : `1px solid rgba(255,255,255,${isHovered ? '0.1' : '0.05'})`,
                      borderRadius: '14px',
                      padding: '16px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.22s ease',
                      boxShadow: isSelected ? `0 0 20px ${goal.accent}20, inset 0 1px 0 rgba(255,255,255,0.08)` : 'none',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        width: '18px', height: '18px', borderRadius: '50%',
                        background: goal.accent,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', color: '#000', fontWeight: '800',
                      }}>✓</div>
                    )}
                    <div style={{ fontSize: '1.6rem', marginBottom: '10px', lineHeight: 1 }}>{goal.icon}</div>
                    <h3 style={{
                      margin: '0 0 5px 0', fontSize: '0.88rem', fontWeight: '700',
                      color: isSelected ? goal.accent : '#cbd5e1',
                      letterSpacing: '-0.01em',
                    }}>{goal.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4 }}>{goal.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Business Type ── */}
          <div style={sectionStyle}>
            <label style={labelStyle}>
              <span style={labelDotStyle('#34d399')} />
              Business Type
            </label>
            <span style={subText}>AI isi se industry-specific language aur targeting use karega</span>
            <div style={{ position: 'relative' }}>
              <select
                value={data.businessType || ''}
                onChange={(e) => updateData({ businessType: e.target.value })}
                style={{
                  ...inputStyle,
                  paddingRight: '36px',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  cursor: 'pointer',
                }}
              >
              <option value="">Select business type...</option>

<optgroup label="🏠 Local & Emergency Services">
  <option value="taxi">Taxi / Cab Service</option>
  <option value="plumber">Plumber</option>
  <option value="electrician">Electrician</option>
  <option value="pest-control">Pest Control Services</option>
  <option value="packers-movers">Packers & Movers</option>
  <option value="appliance-repair">AC / Appliance Repair</option>
  <option value="towing">Towing Service</option>
  <option value="carpenter">Carpenter</option>
  <option value="house-cleaning">House Cleaning Service</option>
</optgroup>

<optgroup label="🏢 Real Estate & Property">
  <option value="real-estate-broker">Real Estate Broker</option>
  <option value="property-developer">Property Builder / Developer</option>
  <option value="commercial-space">Commercial Space Rentals</option>
  <option value="pg-hostel">PG / Hostel Services</option>
  <option value="interior-designer">Interior Designer</option>
</optgroup>

<optgroup label="🍽️ Food & Hospitality">
  <option value="restaurant-cafe">Restaurant / Cafe</option>
  <option value="cloud-kitchen">Cloud Kitchen</option>
  <option value="banquet-hall">Banquet Hall / Party Venue</option>
  <option value="catering">Catering Services</option>
</optgroup>

<optgroup label="⚖️ Professional & Legal">
  <option value="lawyer">Lawyer / Advocate</option>
  <option value="ca-tax">CA / Tax Consultant</option>
  <option value="visa-immigration">Visa / Immigration Consultant</option>
  <option value="financial-advisor">Financial Advisor</option>
</optgroup>

<optgroup label="💻 Digital & Tech">
  <option value="web-dev">Website Development</option>
  <option value="digital-marketing">Digital Marketing Agency</option>
  <option value="saas">SaaS Product</option>
  <option value="it-consultancy">IT Consultancy</option>
</optgroup>

<optgroup label="🏥 Healthcare">
  <option value="clinic">General Clinic / Physician</option>
  <option value="dentist">Dentist</option>
  <option value="diagnostic-lab">Diagnostic Lab / Blood Test</option>
  <option value="physiotherapist">Physiotherapist</option>
  <option value="eye-specialist">Eye Specialist</option>
</optgroup>

<optgroup label="📚 Education">
  <option value="home-tutors">Home Tutors</option>
  <option value="coaching">Coaching Institute</option>
  <option value="coding-classes">IT / Coding Classes</option>
  <option value="ielts">IELTS / English Speaking</option>
</optgroup>

<optgroup label="🚗 Automotive">
  <option value="car-repair">Car Service / Repair</option>
  <option value="driving-school">Driving School</option>
  <option value="car-rental">Car Rental</option>
</optgroup>
              </select>
            </div>
          </div>

{/* ── Target City ── */}
<div style={sectionStyle}>
  <label style={labelStyle}>
    <span style={labelDotStyle('#f472b6')} />
    Target City / Location
  </label>
  <div style={{ position: 'relative' }}>
    <span style={{
      position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
      fontSize: '1rem', pointerEvents: 'none',
    }}>📍</span>
    <select
      value={data.targetCity === '' || !['All India','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi NCR'].includes(data.targetCity) ? 'custom' : data.targetCity}
      onChange={(e) => {
        if (e.target.value === 'custom') {
          updateData({ targetCity: '' });
        } else {
          updateData({ targetCity: e.target.value });
        }
      }}
      style={{
        ...inputStyle,
        paddingLeft: '42px',
        paddingRight: '36px',
        appearance: 'none',
        WebkitAppearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        cursor: 'pointer',
      }}
    >
      <option value="All India">🇮🇳 All India</option>
      <optgroup label="📍 States">
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
        <option value="Delhi NCR">Delhi NCR</option>
      </optgroup>
      <option value="custom">✏️ Custom — Type your city/area</option>
    </select>
  </div>

  {/* Custom input — sirf tab dikhe jab custom select ho */}
  {(data.targetCity === '' || !['All India','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi NCR'].includes(data.targetCity)) && (
    <input
      type="text"
      placeholder="✏️ Type your city or area... (e.g. Noida, Surat, Bhopal)"
      value={data.targetCity}
      onChange={(e) => updateData({ targetCity: e.target.value })}
      style={{
        ...inputStyle,
        marginTop: '10px',
        paddingLeft: '14px',
      }}
      autoFocus
    />
  )}
</div>


          {/* ── Daily Budget ── */}
          <div style={sectionStyle}>
            <label style={labelStyle}>
              <span style={labelDotStyle('#eab308')} />
              Daily Budget (₹)
            </label>

            {/* Pills */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              {budgetOptions.map(amount => {
                const isActive = data.dailyBudget === amount;
                const isHov = hoveredBudget === amount;
                return (
                  <button
                    key={amount}
                    onClick={() => updateData({ dailyBudget: amount })}
                    onMouseEnter={() => setHoveredBudget(amount)}
                    onMouseLeave={() => setHoveredBudget(null)}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #eab308, #f59e0b)'
                        : isHov ? 'rgba(234,179,8,0.1)' : 'rgba(255,255,255,0.04)',
                      color: isActive ? '#000' : isHov ? '#eab308' : '#94a3b8',
                      border: isActive ? '1px solid #eab308' : `1px solid ${isHov ? 'rgba(234,179,8,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      padding: '8px 18px',
                      borderRadius: '99px',
                      cursor: 'pointer',
                      fontWeight: isActive ? '700' : '500',
                      fontSize: '0.82rem',
                      transition: 'all 0.18s ease',
                      fontFamily: 'inherit',
                      boxShadow: isActive ? '0 0 14px rgba(234,179,8,0.35)' : 'none',
                      letterSpacing: '0.01em',
                    }}
                  >
                    ₹{amount}
                  </button>
                );
              })}
            </div>

            {/* Custom Input */}
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                color: '#eab308', fontWeight: '700', fontSize: '0.95rem', pointerEvents: 'none',
              }}>₹</span>
              <input
                type="number"
                value={data.dailyBudget || ''}
                onChange={(e) => updateData({ dailyBudget: e.target.value })}
                placeholder="Custom Amount (Min ₹100)"
                style={{ ...inputStyle, paddingLeft: '32px' }}
              />
            </div>

            {/* AI Suggestion Box */}
            <div
              onClick={suggestBudget}
              style={{
                background: isSuggesting
                  ? 'rgba(234,179,8,0.08)'
                  : 'linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(245,158,11,0.04) 100%)',
                border: '1px solid rgba(234,179,8,0.25)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#eab308',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(4px)',
                fontFamily: 'inherit',
                letterSpacing: '0.01em',
              }}
            >
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>
                {isSuggesting ? '⏳' : '💡'}
              </span>
              <span>
                {isSuggesting
                  ? 'Industry analyze ho raha hai...'
                  : 'Is industry ke liye suggested budget: ₹500 – ₹1500/day. Click to apply.'}
              </span>
              {!isSuggesting && (
                <span style={{
                  marginLeft: 'auto', fontSize: '0.7rem', fontWeight: '600',
                  background: 'rgba(234,179,8,0.15)', borderRadius: '6px',
                  padding: '3px 8px', flexShrink: 0,
                }}>APPLY</span>
              )}
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.2), rgba(139,92,246,0.2), transparent)',
          }} />

          {/* ── Next Button ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#374151' }}>
              <span style={{ color: '#ef4444' }}>*</span> Required fields
            </div>
            <button
              onClick={nextStep}
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #a78bfa 100%)',
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
                boxShadow: '0 0 0 1px rgba(56,189,248,0.3), 0 8px 24px rgba(56,189,248,0.25), 0 0 40px rgba(139,92,246,0.15)',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
              }}
            >
              <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                Next Step
                <span style={{ fontSize: '1rem' }}>→</span>
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}


