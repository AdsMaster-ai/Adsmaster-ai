"use client";

import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .dash-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 64px;
          background: rgba(8, 9, 18, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ─── LEFT: Back + Logo ─── */
        .dash-nav-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          padding: 7px 13px;
          cursor: pointer;
          color: rgba(255,255,255,0.65);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }

        .btn-back:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.9);
          transform: translateX(-2px);
        }

        .btn-back svg {
          width: 14px;
          height: 14px;
          stroke: currentColor;
          transition: transform 0.2s;
        }

        .btn-back:hover svg {
          transform: translateX(-2px);
        }

        .nav-divider {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.08);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #00f0a0 0%, #0070f3 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(0, 240, 160, 0.3);
          flex-shrink: 0;
        }

        .logo-icon svg {
          width: 20px;
          height: 20px;
          fill: #fff;
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.3px;
          color: #ffffff;
          line-height: 1;
        }

        .logo-text span {
          background: linear-gradient(90deg, #00f0a0, #0070f3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ─── CENTER: Dashboard Label ─── */
        .dash-nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dash-label {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.01em;
        }

        .dash-pill {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00f0a0;
          background: rgba(0,240,160,0.1);
          border: 1px solid rgba(0,240,160,0.2);
          border-radius: 100px;
          padding: 2px 8px;
        }

        /* ─── RIGHT: New Campaign + User ─── */
        .dash-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-new-campaign {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #00f0a0 0%, #0070f3 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          padding: 9px 18px;
          cursor: pointer;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 18px rgba(0, 112, 243, 0.3);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-new-campaign:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(0, 112, 243, 0.45);
          filter: brightness(1.08);
        }

        .btn-new-campaign svg {
          width: 15px;
          height: 15px;
        }

        .user-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 6px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .user-badge:hover {
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.07);
        }

        .user-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00f0a0, #0070f3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
        }

        .user-name {
          font-size: 12.5px;
          color: rgba(255,255,255,0.75);
          font-weight: 500;
        }

        .online-dot {
          position: absolute;
          bottom: 5px;
          left: 28px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00f0a0;
          border: 2px solid #080912;
          box-shadow: 0 0 6px rgba(0,240,160,0.7);
        }
      `}</style>

      <nav className="dash-nav">
        {/* Left: Back + Logo */}
        <div className="dash-nav-left">
          <button
            className="btn-back"
            onClick={() => router.push("/")}
            title="Go to Home Page"
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
          </button>

          <div className="nav-divider" />




       <div className="nav-logo" onClick={() => router.push("/")}>
  <span style={{
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.3rem',
    letterSpacing: '-0.03em',
    background: 'linear-gradient(135deg, #22d3ee, #818cf8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }}>
    AdsMaster
  </span>
</div>
        </div>





        {/* Center: Dashboard Label */}
        <div className="dash-nav-center">
          <span className="dash-label">Dashboard</span>
          <span className="dash-pill">Live</span>
        </div>

        {/* Right: New Campaign + User */}
        <div className="dash-nav-right">
          <button
            className="btn-new-campaign"
            onClick={() => router.push("/campaign-creator")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Campaign
          </button>

          <div className="user-badge">
            <div className="user-avatar">B</div>
            <div className="online-dot" />
            <span className="user-name">budgetbridgetaxi</span>
          </div>
        </div>
      </nav>
    </>
  );
}