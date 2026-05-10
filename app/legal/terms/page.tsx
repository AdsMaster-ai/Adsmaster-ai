export default function TermsOfService() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        ,::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#07070f}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .tw{animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both}
        .ts{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both}
        .tc:hover{transform:translateY(-2px)}
        .tct:hover{background:rgba(99,102,241,.12)!important;border-color:rgba(99,102,241,.4)!important}
        a{color:#818cf8;text-decoration:underline;text-underline-offset:3px}
        a:hover{color:#c7d2fe}
        @media(max-width:680px){
          .tpg{grid-template-columns:1fr!important}
          .tsb{padding-left:0!important}
          .th{padding:48px 0 40px!important}
        }
      `}</style>

      <div style={{minHeight:"100vh",background:"radial-gradient(ellipse 110% 60% at 50% -5%,#1a1040 0%,#07070f 55%)",fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,.72)",lineHeight:"1.7",position:"relative",overflow:"hidden"}}>

        <div style={{position:"fixed",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,.1) 0%,transparent 65%)",top:"-200px",left:"-150px",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"fixed",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.08) 0%,transparent 65%)",bottom:"-150px",right:"-100px",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"fixed",inset:"0",backgroundImage:"radial-gradient(rgba(255,255,255,.022) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none",zIndex:0}}/>

        <div className="tw" style={{position:"relative",zIndex:1,maxWidth:"860px",margin:"0 auto",padding:"0 20px 80px"}}>

          {/* HERO */}
          <div className="th" style={{textAlign:"center",padding:"72px 20px 56px",borderBottom:"1px solid rgba(255,255,255,.07)",marginBottom:"56px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"28px"}}>
              <div style={{width:"40px",height:"40px",borderRadius:"12px",background:"linear-gradient(135deg,#6366f1,#4338ca)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(99,102,241,.45)",overflow:"hidden"}}>
                <img src="/icon.png" alt="AdsMaster AI" width={26} height={26} style={{objectFit:"contain"}} onError={(e:any)=>{e.target.style.display="none"}}/>
              </div>
              <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"18px",fontWeight:700,background:"linear-gradient(90deg,#e0e7ff,#a5b4fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AdsMaster AI</span>
            </div>
            <div style={{display:"inline-block",background:"rgba(99,102,241,.12)",border:"1px solid rgba(99,102,241,.25)",borderRadius:"20px",padding:"4px 14px",fontSize:"10px",fontWeight:700,letterSpacing:"1.5px",color:"#818cf8",textTransform:"uppercase",marginBottom:"20px"}}>Legal Document</div>
            <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(32px,5vw,52px)",fontWeight:800,color:"#fff",letterSpacing:"-1px",lineHeight:1.1,marginBottom:"14px"}}>Terms of Service</h1>
            <p style={{fontSize:"16px",color:"rgba(255,255,255,.4)",marginBottom:"28px"}}>AdsMaster AI — <a href="https://www.adsmaster.in">www.adsmaster.in</a></p>
            <div style={{display:"inline-flex",gap:"20px",flexWrap:"wrap" as const,justifyContent:"center",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"14px",padding:"14px 28px",fontSize:"13px",color:"rgba(255,255,255,.4)"}}>
              <span>📅 Last Updated: June 1, 2025</span>
              <span style={{color:"rgba(255,255,255,.1)"}}>|</span>
              <span>✅ Effective: June 1, 2025</span>
            </div>
          </div>

          {/* INTRO */}
          <div className="ts" style={{background:"rgba(99,102,241,.06)",border:"1px solid rgba(99,102,241,.15)",borderRadius:"20px",padding:"28px 32px",marginBottom:"40px",fontSize:"15px",lineHeight:"1.8"}}>
            Please read these Terms of Service (<strong style={{color:"#c7d2fe"}}>"Terms"</strong>) carefully before using <a href="https://www.adsmaster.in">www.adsmaster.in</a> operated by <strong style={{color:"#c7d2fe"}}>AdsMaster AI</strong>. By accessing or using our service, you agree to be bound by these Terms.
          </div>

          <S n="1" t="Acceptance of Terms">
            <p>By creating an account or using AdsMaster AI's services, you confirm that you are at least <strong style={{color:"#c7d2fe"}}>18 years old</strong>, have read and understood these Terms, and agree to be legally bound by them.</p>
          </S>

          <S n="2" t="Description of Service">
            <p>AdsMaster AI is a Google Ads management platform that connects to your Google Ads account via OAuth 2.0 to help you manage, optimise, and analyse your advertising campaigns. Features vary by subscription plan.</p>
          </S>

          {/* SECTION 3 — PRICING */}
          <S n="3" t="Subscription Plans & Pricing">

            {/* 3 Plan Cards — exact from screenshot */}
            <div className="tpg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px",marginBottom:"24px"}}>

              {/* FREE */}
              <div className="tc" style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"18px",padding:"20px",display:"flex",flexDirection:"column" as const,transition:"transform .2s"}}>
                <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"1.5px",color:"rgba(255,255,255,.3)",textTransform:"uppercase" as const,marginBottom:"8px"}}>FREE</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"36px",color:"#fff",letterSpacing:"-2px",lineHeight:1}}>₹0</div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,.3)",marginBottom:"16px",marginTop:"4px"}}>forever</div>
                <div style={{fontSize:"12px",color:"rgba(255,255,255,.35)",marginBottom:"12px"}}>Start exploring AI ads</div>
                <div style={{flex:1,display:"flex",flexDirection:"column" as const,gap:"7px"}}>
                  {["1 Active Campaign","5 Keywords per Campaign","Basic Ad Copy Editor","Basic 7-Day Analytics","Location Targeting","Community Support"].map(f=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:"7px",fontSize:"12px",color:"rgba(255,255,255,.5)"}}>
                      <span style={{color:"#6ee7b7",fontSize:"10px",flexShrink:0}}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <button style={{marginTop:"16px",width:"100%",padding:"11px",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",borderRadius:"10px",fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:"13px",cursor:"pointer"}}>Start Free</button>
              </div>

              {/* STARTER */}
              <div className="tc" style={{background:"rgba(99,102,241,.1)",border:"1px solid rgba(99,102,241,.4)",borderRadius:"18px",padding:"20px",display:"flex",flexDirection:"column" as const,transition:"transform .2s",boxShadow:"0 0 40px rgba(99,102,241,.15)"}}>
                <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"1.5px",color:"#818cf8",textTransform:"uppercase" as const,marginBottom:"8px"}}>STARTER</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"36px",color:"#fff",letterSpacing:"-2px",lineHeight:1}}>₹999</div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,.4)",marginBottom:"4px",marginTop:"4px"}}>per month</div>
                <div style={{fontSize:"12px",color:"rgba(255,255,255,.35)",marginBottom:"12px"}}>For growing businesses</div>
                <div style={{flex:1,display:"flex",flexDirection:"column" as const,gap:"7px"}}>
                  {["5 Active Campaigns","50 Keywords per Campaign","AI Headline Generator (15/mo)","AI Description Writer (15/mo)","Smart Keyword Suggestions","Ad Scheduling & Device Targeting","30-Day Analytics Dashboard","Email Support (48hr)","Location + Age Targeting"].map(f=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:"7px",fontSize:"12px",color:"rgba(255,255,255,.6)"}}>
                      <span style={{color:"#6ee7b7",fontSize:"10px",flexShrink:0}}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <button style={{marginTop:"16px",width:"100%",padding:"11px",background:"linear-gradient(135deg,#6366f1,#7c3aed)",border:"none",color:"#fff",borderRadius:"10px",fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:"13px",cursor:"pointer",boxShadow:"0 4px 16px rgba(99,102,241,.4)"}}>Get Starter</button>
              </div>
              {/* GROWTH */}
              <div className="tc" style={{background:"rgba(245,158,11,.07)",border:"1px solid rgba(245,158,11,.35)",borderRadius:"18px",padding:"20px",display:"flex",flexDirection:"column" as const,transition:"transform .2s"}}>
                <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"1.5px",color:"#fbbf24",textTransform:"uppercase" as const,marginBottom:"8px"}}>GROWTH</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"36px",color:"#fff",letterSpacing:"-2px",lineHeight:1}}>₹1,999</div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,.4)",marginBottom:"4px",marginTop:"4px"}}>per month</div>
                <div style={{fontSize:"12px",color:"rgba(255,255,255,.35)",marginBottom:"12px"}}>For serious advertisers</div>
                <div style={{flex:1,display:"flex",flexDirection:"column" as const,gap:"7px"}}>
                  {["20 Active Campaigns","Unlimited Keywords","AI Headline Generator (Unlimited)","AI Description Writer (Unlimited)","AI Negative Keyword Optimizer","Full Audience Targeting Suite","Call & WhatsApp Integration","AI Budget Optimizer","Priority Email Support (24hr)"].map(f=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:"7px",fontSize:"12px",color:"rgba(255,255,255,.6)"}}>
                      <span style={{color:"#fbbf24",fontSize:"10px",flexShrink:0}}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <button style={{marginTop:"16px",width:"100%",padding:"11px",background:"linear-gradient(135deg,#f59e0b,#ef4444)",border:"none",color:"#fff",borderRadius:"10px",fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:"13px",cursor:"pointer"}}>Get Growth</button>
              </div>

            </div>

            <p style={{fontSize:"13px",color:"rgba(255,255,255,.3)",fontStyle:"italic",marginBottom:"16px"}}>All prices are in Indian Rupees (INR). Subscriptions auto-renew unless cancelled before the renewal date.</p>

            {/* Comparison Table */}
            <div style={{overflowX:"auto" as const,borderRadius:"14px",border:"1px solid rgba(255,255,255,.06)"}}>
              <table style={{width:"100%",borderCollapse:"collapse" as const,fontSize:"13.5px"}}>
                <thead>
                  <tr style={{background:"rgba(99,102,241,.12)"}}>
                    {["Plan","Price","Billing","Campaigns","Keywords"].map(h=>(
                      <th key={h} style={{padding:"13px 16px",textAlign:"left" as const,color:"#a5b4fc",fontWeight:700,fontSize:"11px",letterSpacing:"0.5px",borderBottom:"1px solid rgba(99,102,241,.2)"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {plan:"Free",    price:"₹0",      billing:"Forever", camp:"1",  kw:"5 / campaign"},
                    {plan:"Starter", price:"₹999/mo", billing:"Monthly", camp:"5",  kw:"50 / campaign"},
                    {plan:"Growth",  price:"₹1,999/mo",billing:"Monthly",camp:"20", kw:"Unlimited"},
                  ].map(({plan,price,billing,camp,kw},i)=>(
                    <tr key={plan} style={{background:i%2===0?"rgba(255,255,255,.02)":"transparent"}}>
                      <td style={{padding:"13px 16px",borderBottom:"1px solid rgba(255,255,255,.04)",color:"#e2e8f0",fontWeight:600}}>{plan}</td>
                      <td style={{padding:"13px 16px",borderBottom:"1px solid rgba(255,255,255,.04)",color:"rgba(255,255,255,.6)"}}>{price}</td>
                      <td style={{padding:"13px 16px",borderBottom:"1px solid rgba(255,255,255,.04)",color:"rgba(255,255,255,.6)"}}>{billing}</td>
                      <td style={{padding:"13px 16px",borderBottom:"1px solid rgba(255,255,255,.04)",color:"rgba(255,255,255,.6)"}}>{camp}</td>
                      <td style={{padding:"13px 16px",borderBottom:"1px solid rgba(255,255,255,.04)",color:"rgba(255,255,255,.6)"}}>{kw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </S>

          <S n="4" t="Payment & Billing">
            <L items={[
              "All payments are processed securely via Razorpay",
              "Subscriptions automatically renew at the end of each billing period",
              "You may cancel your subscription at any time from account settings",
              "Cancellation takes effect at the end of the current billing period",
              "We reserve the right to change pricing with 30 days advance notice",
            ]}/>
          </S>

          <S n="5" t="No Refund Policy">
            <div style={{display:"flex",gap:"14px",alignItems:"flex-start",background:"rgba(239,68,68,.07)",border:"1px solid rgba(239,68,68,.25)",borderRadius:"16px",padding:"20px"}}>
              <span style={{fontSize:"22px",flexShrink:0}}>⚠️</span>
              <div>
                <p style={{fontWeight:700,color:"#fca5a5",marginBottom:"8px",fontSize:"15px"}}>All subscription payments are non-refundable.</p>
                <p style={{fontSize:"13.5px",color:"rgba(255,100,100,.7)",lineHeight:"1.7"}}>Once a subscription plan is purchased, no refunds will be issued for any reason, including unused service period or accidental purchase. You will retain full access for the entire paid duration.</p>
              </div>
            </div>
          </S>

          <S n="6" t="Acceptable Use">
            <p style={{marginBottom:"14px"}}>You agree <strong style={{color:"#c7d2fe"}}>NOT</strong> to:</p>
            <L items={[
              "Use the service for any unlawful purpose or in violation of Google's policies",
              "Reverse engineer, decompile, or disassemble our software",
              "Transmit malicious code, viruses, or harmful data",
              "Resell or sublicense our service without written permission",
              "Attempt to gain unauthorised access to our systems",
            ]}/>
          </S>

          <S n="7" t="Google Ads Integration">
            <L items={[
              "You must have a valid, active Google Ads account to use core features",
              "You grant AdsMaster AI read/write access to manage your campaigns",
              "You remain solely responsible for your Google Ads spend and budget",
              "AdsMaster AI does not guarantee specific ad performance or results",
              "You can revoke Google Ads access at any time via Google account settings",
            ]}/>
          </S>

          <S n="8" t="Intellectual Property">
            <p>All content, features, and functionality of AdsMaster AI — including software, text, graphics, and logos — are owned by AdsMaster AI and protected by applicable intellectual property laws. You may not copy, modify, or distribute our content without prior written consent.</p>
          </S>

          <S n="9" t="Termination">
            <p style={{marginBottom:"14px"}}>We may suspend or terminate your account immediately, without notice, if:</p>
            <L items={[
              "You breach any provision of these Terms",
              "We are required to do so by law",
              "We reasonably believe your use poses security or legal risks",
            ]}/>
          </S>

          <S n="10" t="Limitation of Liability">
            <p>AdsMaster AI shall not be liable for any indirect, incidental, special, or consequential damages. Our total liability to you shall not exceed the amount paid by you in the <strong style={{color:"#c7d2fe"}}>last 3 months</strong> of service.</p>
          </S>

          <S n="11" t="Disclaimer of Warranties">
            <p>The service is provided <strong style={{color:"#c7d2fe"}}>"as is"</strong> and <strong style={{color:"#c7d2fe"}}>"as available"</strong> without warranties of any kind. We do not warrant that the service will be uninterrupted, error-free, or produce specific advertising results.</p>
          </S>

          <S n="12" t="Privacy Policy">
            <p>Your use of AdsMaster AI is also governed by our <a href="/legal/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference.</p>
          </S>

          <S n="13" t="Governing Law">
            <p>These Terms are governed by the laws of <strong style={{color:"#c7d2fe"}}>India</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>
          </S>

          <S n="14" t="Changes to Terms">
            <p>We reserve the right to modify these Terms at any time. We will notify you of significant changes via email or a notice on our platform. Continued use after changes constitutes acceptance.</p>
          </S>

          <S n="15" t="Contact Us">
            <p style={{marginBottom:"16px"}}>If you have any questions about these Terms, please reach out:</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"12px"}}>
              {[
                {icon:"📧",label:"Email",val:"adsmaster0@zohomail.in",href:"mailto:adsmaster0@zohomail.in"},
                {icon:"🌐",label:"Website",val:"www.adsmaster.in",href:"https://www.adsmaster.in"},
              ].map(({icon,label,val,href})=>(
                <a key={label} href={href} className="tct" style={{display:"flex",alignItems:"center",gap:"12px",background:"rgba(99,102,241,.07)",border:"1px solid rgba(99,102,241,.2)",borderRadius:"14px",padding:"16px",textDecoration:"none",transition:"all .2s"}}>
                  <span style={{fontSize:"20px"}}>{icon}</span>
                  <div>
                    <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"1px",color:"rgba(255,255,255,.35)",textTransform:"uppercase" as const,marginBottom:"2px"}}>{label}</div>
                    <div style={{fontSize:"13px",fontWeight:600,color:"#a5b4fc"}}>{val}</div>
                  </div>
                </a>
              ))}
            </div>
          </S>

          {/* Footer */}
          <div style={{marginTop:"60px",paddingTop:"32px",borderTop:"1px solid rgba(255,255,255,.06)",textAlign:"center",color:"rgba(255,255,255,.2)",fontSize:"13px",lineHeight:"1.8"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"8px"}}>
              <div style={{width:"28px",height:"28px",borderRadius:"8px",background:"linear-gradient(135deg,#6366f1,#4338ca)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                <img src="/icon.png" alt="" width={18} height={18} style={{objectFit:"contain"}} onError={(e:any)=>{e.target.style.display="none"}}/>
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

function S({n,t,children}:{n:string;t:string;children:React.ReactNode}){
  return(
    <div className="ts" style={{marginBottom:"36px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"14px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,255,255,.06)",marginBottom:"22px"}}>
        <div style={{width:"36px",height:"36px",borderRadius:"10px",flexShrink:0,background:"linear-gradient(135deg,rgba(99,102,241,.3),rgba(99,102,241,.1))",border:"1px solid rgba(99,102,241,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"14px",color:"#a5b4fc"}}>{n}</div>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"20px",fontWeight:700,color:"#fff",letterSpacing:"-.3px"}}>{t}</h2>
      </div>
      <div className="tsb" style={{paddingLeft:"50px"}}>{children}</div>
    </div>
  );
}

function L({items}:{items:React.ReactNode[]}){
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