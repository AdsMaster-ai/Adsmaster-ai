export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        ,::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#07070f}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .pp-wrap{animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both}
        .pp-sec{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both}
        .pp-card:hover{transform:translateY(-2px);transition:all .2s ease}
        .pp-contact:hover{background:rgba(99,102,241,.12)!important;border-color:rgba(99,102,241,.4)!important}
        a{color:#818cf8;text-decoration:underline;text-underline-offset:3px}
        a:hover{color:#c7d2fe}
        @media(max-width:680px){
          .pp-plan-grid{grid-template-columns:1fr!important}
          .pp-sec-body{padding-left:0!important}
          .pp-hero{padding:48px 0 40px!important}
        }
      `}</style>

      <div style={{
        minHeight:"100vh",
        background:"radial-gradient(ellipse 110% 60% at 50% -5%,#1a1040 0%,#07070f 55%)",
        fontFamily:"'DM Sans',sans-serif",
        color:"rgba(255,255,255,.72)",
        lineHeight:"1.7",
        WebkitFontSmoothing:"antialiased",
        position:"relative",
        overflow:"hidden",
      }}>

        {/* Glows */}
        <div style={{position:"fixed",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,.1) 0%,transparent 65%)",top:"-200px",left:"-150px",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"fixed",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.08) 0%,transparent 65%)",bottom:"-150px",right:"-100px",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"fixed",inset:"0",backgroundImage:"radial-gradient(rgba(255,255,255,.022) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none",zIndex:0}}/>

        {/* Content */}
        <div className="pp-wrap" style={{position:"relative",zIndex:1,maxWidth:"860px",margin:"0 auto",padding:"0 20px 80px"}}>

          {/* ── HERO ── */}
          <div className="pp-hero" style={{textAlign:"center",padding:"72px 20px 56px",borderBottom:"1px solid rgba(255,255,255,.07)",marginBottom:"56px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"28px"}}>
              <div style={{width:"40px",height:"40px",borderRadius:"12px",background:"linear-gradient(135deg,#6366f1,#4338ca)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(99,102,241,.45)",overflow:"hidden"}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon.png" alt="AdsMaster AI" width={26} height={26} style={{objectFit:"contain"}}/>
              </div>
              <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"18px",fontWeight:700,letterSpacing:"-.3px",background:"linear-gradient(90deg,#e0e7ff,#a5b4fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AdsMaster AI</span>
            </div>
            <div style={{display:"inline-block",background:"rgba(99,102,241,.12)",border:"1px solid rgba(99,102,241,.25)",borderRadius:"20px",padding:"4px 14px",fontSize:"10px",fontWeight:700,letterSpacing:"1.5px",color:"#818cf8",textTransform:"uppercase",marginBottom:"20px"}}>Legal Document</div>
            <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(32px,5vw,52px)",fontWeight:800,color:"#fff",letterSpacing:"-1px",lineHeight:1.1,marginBottom:"14px"}}>Privacy Policy</h1>
            <p style={{fontSize:"16px",color:"rgba(255,255,255,.4)",marginBottom:"28px"}}>AdsMaster AI — <a href="https://www.adsmaster.in">www.adsmaster.in</a></p>
            <div style={{display:"inline-flex",gap:"20px",flexWrap:"wrap" as const,justifyContent:"center",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"14px",padding:"14px 28px",fontSize:"13px",color:"rgba(255,255,255,.4)"}}>
              <span>📅 Last Updated: June 1, 2025</span>
              <span style={{color:"rgba(255,255,255,.1)"}}>|</span>
              <span>✅ Effective: June 1, 2025</span>
            </div>
          </div>

          {/* Intro */}
          <div className="pp-sec" style={{background:"rgba(99,102,241,.06)",border:"1px solid rgba(99,102,241,.15)",borderRadius:"20px",padding:"28px 32px",marginBottom:"40px",fontSize:"15px",lineHeight:"1.8"}}>
            Welcome to <strong style={{color:"#c7d2fe"}}>AdsMaster AI</strong>. This Privacy Policy explains how we collect, use, and protect your information when you use our platform at <a href="https://www.adsmaster.in">www.adsmaster.in</a>. By using our service, you agree to the practices described below.
          </div>

          {/* Section 1 */}
          <Sec n="1" title="Information We Collect">
            <Sub>1.1 Information You Provide</Sub>
            <PPList items={[
              <><B>Account Information</B> — Name, email address, password</>,
              <><B>Payment Information</B> — Billing details via our secure payment processor (we do not store card numbers)</>,
              <><B>Google Account Data</B> — Via Google OAuth: name, email, profile picture, and Google Ads account access as permitted by you</>,
              <><B>Communications</B> — Emails or messages you send us</>,
            ]}/>
            <Sub>1.2 Automatically Collected</Sub>
            <PPList items={[
              "IP address, browser type, OS, pages visited, timestamps",
              "Device information and unique identifiers",
              "Usage data — features used, session duration",
            ]}/>
            <Note color="rgba(34,197,94,.05)" border="rgba(34,197,94,.2)">
              🍪 <strong style={{color:"#86efac"}}>Cookie Notice:</strong> AdsMaster does not currently use tracking or advertising cookies. Only strictly necessary session cookies for authentication may be used.
            </Note>
          </Sec>

          {/* Section 2 */}
          <Sec n="2" title="How We Use Your Information">
            <PPList items={[
              "To provide, operate, and improve our services",
              "To process your subscription and manage your account",
              "To connect with and manage your Google Ads account as authorised",
              "To send transactional emails (receipts, security alerts, updates)",
              "To respond to support requests",
              "To detect and prevent fraud or abuse",
              "To comply with legal obligations",
            ]}/>
          </Sec>

          {/* Section 3 */}
          <Sec n="3" title="Google OAuth & Limited Use Policy">
            <p style={{marginBottom:"16px",lineHeight:"1.8"}}>AdsMaster AI's use of information from Google APIs complies with the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including Limited Use requirements.</p>
            <PPList items={[
              "We only request Google data scopes necessary for our services",
              "We do not sell your Google user data to any third parties",
              "We do not use Google data for advertising purposes unrelated to your own campaigns",
              "We do not allow humans to read your Google data without your consent except for security or legal reasons",
              <span>You can revoke access anytime at <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a></span>,
            ]}/>
            <Sub>Data Access by Plan</Sub>
            <div className="pp-plan-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px",marginTop:"12px"}}>
              {[
                {name:"Free",       price:"₹0 — forever",      bg:"rgba(255,255,255,.04)", bd:"rgba(255,255,255,.08)", perms:["Profile & Email","1 Active Campaign"]},
                {name:"Starter",    price:"₹999 / month",       bg:"rgba(99,102,241,.08)",  bd:"rgba(99,102,241,.3)",   perms:["Profile & Email","Google Ads Access","5 Active Campaigns","Analytics (read)"]},
                {name:"Growth",     price:"₹1,999 / month",     bg:"rgba(245,158,11,.06)",  bd:"rgba(245,158,11,.3)",   perms:["Profile & Email","Google Ads Access","20 Active Campaigns","Analytics (read)","Drive (read)"]},
              ].map(({name,price,bg,bd,perms})=>(
                <div key={name} className="pp-card" style={{background:bg,border:`1px solid ${bd}`,borderRadius:"14px",padding:"16px"}}>
                  <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:"15px",color:"#fff",marginBottom:"2px"}}>{name}</div>
                  <div style={{fontSize:"12px",color:"rgba(255,255,255,.35)",marginBottom:"12px"}}>{price}</div>
                  {perms.map(p=>(
                    <div key={p} style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11.5px",color:"rgba(255,255,255,.5)",marginBottom:"5px"}}>
                      <span style={{color:"#6ee7b7",fontSize:"10px"}}>✓</span>{p}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Sec>

          {/* Section 4 */}
          <Sec n="4" title="Sharing Your Information">
            <p style={{marginBottom:"14px",lineHeight:"1.8"}}>We do not sell or rent your personal data. We may share data only with:</p>
            <PPList items={[
              <><B>Service Providers</B> — Hosting, payment processing, email delivery under data agreements</>,
              <><B>Legal Requirements</B> — When required by law or governmental authority</>,
              <><B>Business Transfers</B> — In connection with a merger or acquisition, with prior notice to you</>,
            ]}/>
          </Sec>

          {/* Section 5 */}
          <Sec n="5" title="Data Retention">
            <p style={{lineHeight:"1.8"}}>We retain your data as long as your account is active. After account deletion, personal data is permanently deleted within <strong style={{color:"#c7d2fe"}}>30 days</strong>, except where legally required to retain.</p>
          </Sec>

          {/* Section 6 */}
          <Sec n="6" title="Data Security">
            <p style={{marginBottom:"16px",lineHeight:"1.8"}}>We use SSL/TLS encryption, secure servers, and strict access controls to protect your data. No internet transmission is 100% secure, but we follow industry best practices.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"10px"}}>
              {["🔒 SSL/TLS Encryption","🛡️ Secure Servers","🔑 Access Controls","📋 Regular Audits"].map(f=>(
                <div key={f} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"12px",padding:"12px 14px",fontSize:"12.5px",color:"rgba(255,255,255,.5)",display:"flex",alignItems:"center",gap:"8px"}}>{f}</div>
              ))}
            </div>
          </Sec>

          {/* Section 7 */}
          <Sec n="7" title="Your Rights">
            <PPList items={[
              "Access, correct, or delete your personal data",
              "Request data portability",
              "Withdraw consent at any time",
              "Lodge a complaint with a supervisory authority (GDPR users)",
            ]}/>
            <Note color="rgba(99,102,241,.07)" border="rgba(99,102,241,.2)">
              ✉️ To exercise any of these rights, email us at <a href="mailto:adsmaster0@zohomail.in">adsmaster0@zohomail.in</a>
            </Note>
          </Sec>

          {/* Section 8 */}
          <Sec n="8" title="GDPR & CCPA Compliance">
            <PPList items={[
              "We comply with the EU General Data Protection Regulation (GDPR)",
              "We comply with the California Consumer Privacy Act (CCPA)",
              "You may request a copy of all data we hold about you",
              "We do not sell personal information as defined under CCPA",
            ]}/>
          </Sec>

          {/* Section 9 */}
          <Sec n="9" title="Changes to This Policy">
            <p style={{lineHeight:"1.8"}}>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our platform. Continued use after changes constitutes acceptance.</p>
          </Sec>

          {/* Section 10 */}
          <Sec n="10" title="Contact Us">
            <p style={{marginBottom:"16px",lineHeight:"1.8"}}>If you have any questions about this Privacy Policy, please reach out:</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"12px"}}>
              {[
                {icon:"📧",label:"Email",val:"adsmaster0@zohomail.in",href:"mailto:adsmaster0@zohomail.in"},
                {icon:"🌐",label:"Website",val:"www.adsmaster.in",href:"https://www.adsmaster.in"},
              ].map(({icon,label,val,href})=>(
                <a key={label} href={href} className="pp-contact" style={{display:"flex",alignItems:"center",gap:"12px",background:"rgba(99,102,241,.07)",border:"1px solid rgba(99,102,241,.2)",borderRadius:"14px",padding:"16px",textDecoration:"none",transition:"all .2s"}}>
                  <span style={{fontSize:"20px"}}>{icon}</span>
                  <div>
                    <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"1px",color:"rgba(255,255,255,.35)",textTransform:"uppercase" as const,marginBottom:"2px"}}>{label}</div>
                    <div style={{fontSize:"13px",fontWeight:600,color:"#a5b4fc"}}>{val}</div>
                  </div>
                </a>
              ))}
            </div>
          </Sec>

          {/* Footer */}
          <div style={{marginTop:"60px",paddingTop:"32px",borderTop:"1px solid rgba(255,255,255,.06)",textAlign:"center",color:"rgba(255,255,255,.2)",fontSize:"13px",lineHeight:"1.8"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"8px"}}>
              <div style={{width:"28px",height:"28px",borderRadius:"8px",background:"linear-gradient(135deg,#6366f1,#4338ca)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon.png" alt="" width={18} height={18} style={{objectFit:"contain"}}/>
              </div>
              <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:"14px",color:"rgba(255,255,255,.4)"}}>AdsMaster AI</span>
            </div>
            <p>© 2025 AdsMaster AI — All Rights Reserved</p>
            <p style={{marginTop:"6px"}}>
              <a href="/legal/terms" style={{color:"rgba(255,255,255,.3)",textDecoration:"none"}}>Terms of Service</a>
              <span style={{margin:"0 12px",color:"rgba(255,255,255,.1)"}}>|</span>
              <a href="/legal/privacy-policy" style={{color:"rgba(255,255,255,.3)",textDecoration:"none"}}>Privacy Policy</a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
// ─── Helper components ────────────────────────────────────────────

function Sec({n,title,children}:{n:string;title:string;children:React.ReactNode}){
  return(
    <div className="pp-sec" style={{marginBottom:"36px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"14px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,255,255,.06)",marginBottom:"22px"}}>
        <div style={{width:"36px",height:"36px",borderRadius:"10px",flexShrink:0,background:"linear-gradient(135deg,rgba(99,102,241,.3),rgba(99,102,241,.1))",border:"1px solid rgba(99,102,241,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"14px",color:"#a5b4fc"}}>{n}</div>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"20px",fontWeight:700,color:"#fff",letterSpacing:"-.3px"}}>{title}</h2>
      </div>
      <div className="pp-sec-body" style={{paddingLeft:"50px"}}>{children}</div>
    </div>
  );
}

function Sub({children}:{children:React.ReactNode}){
  return <h3 style={{fontSize:"11px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase" as const,color:"#6366f1",margin:"20px 0 10px"}}>{children}</h3>;
}

function B({children}:{children:React.ReactNode}){
  return <strong style={{color:"#c7d2fe"}}>{children}</strong>;
}

function PPList({items}:{items:React.ReactNode[]}){
  return(
    <ul style={{listStyle:"none",marginBottom:"16px"}}>
      {items.map((item,i)=>(
        <li key={i} style={{display:"flex",alignItems:"flex-start",gap:"10px",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.04)",fontSize:"14.5px",lineHeight:"1.7",color:"rgba(255,255,255,.65)"}}>
          <span style={{width:"18px",height:"18px",borderRadius:"5px",flexShrink:0,marginTop:"2px",background:"rgba(99,102,241,.2)",border:"1px solid rgba(99,102,241,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",color:"#818cf8",fontWeight:700}}>✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Note({color,border,children}:{color:string;border:string;children:React.ReactNode}){
  return(
    <div style={{display:"flex",gap:"12px",alignItems:"flex-start",background:color,border:`1px solid ${border}`,borderRadius:"14px",padding:"16px",fontSize:"13.5px",lineHeight:"1.7",color:"rgba(255,255,255,.55)",marginTop:"16px"}}>
      {children}
    </div>
  );
}