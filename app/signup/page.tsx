"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

const PERMS = [
  { id:"profile",   icon:"👤", title:"Profile & Identity",       desc:"Your name and email to personalise your experience.",              req:true  },
  { id:"campaigns", icon:"📢", title:"Campaign Data",             desc:"Access your ad data so our AI can analyse and optimise campaigns.", req:true  },
  { id:"analytics", icon:"📈", title:"Google Analytics",          desc:"Traffic and conversion data for better campaign insights.",         req:false },
  { id:"drive",     icon:"📁", title:"Google Drive (Read-only)",  desc:"Access creative assets like images for your ad campaigns.",        req:false },
  { id:"emails",    icon:"📧", title:"Product Emails",            desc:"Tips, feature updates and important account notifications.",       req:false },
  { id:"ai",        icon:"✨", title:"AI Personalisation",        desc:"Let our AI learn from your usage to give smarter suggestions.",    req:false },
];

export default function SignupPage() {
  const router = useRouter();
  const [step,    setStep]    = useState<1|2|3>(1);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showP,    setShowP]    = useState(false);
  const [showC,    setShowC]    = useState(false);

  const [name,     setName]     = useState("");
  const [phone,    setPhone]    = useState("");
  const [biz,      setBiz]      = useState("");

  const [perms, setPerms] = useState<Record<string,boolean>>({
    profile:true, campaigns:true, analytics:false, drive:false, emails:false, ai:false,
  });

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(data.session) router.replace("/campaign-creator");
    });
  },[]);

  const step1 = () => {
    setError("");
    if(!email||!password||!confirm) return setError("Please fill in all fields.");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.");
    if(password.length<8) return setError("Password must be at least 8 characters.");
    if(password!==confirm) return setError("Passwords do not match.");
    setStep(2);
  };

  const step2 = () => {
    setError("");
    if(!name||!biz) return setError("Full name and business name are required.");
    setStep(3);
  };

  const signup = async () => {
    setLoading(true); setError("");
    try {
      const {data,error:e} = await supabase.auth.signUp({
        email, password,
        options:{
          data:{full_name:name},
          emailRedirectTo:`${window.location.origin}/campaign-creator`,
        },
      });
      if(e) throw e;
      if(data.user){
        await supabase.from("profiles").upsert({
          id:data.user.id, email, full_name:name,
          phone:phone||null, business_name:biz,
          permissions:perms,
          permissions_accepted_at:new Date().toISOString(),
          plan:"free", onboarded:false,
          created_at:new Date().toISOString(),
        });
      }
      if(data.session) router.replace("/campaign-creator");
      else router.replace("/signup/verify?email="+encodeURIComponent(email));
    } catch(e:any){
      setError(e.message||"Something went wrong.");
      setStep(1);
    } finally { setLoading(false); }
  };

  const toggle = (id:string,req:boolean)=>{
    if(req) return;
    setPerms(p=>({...p,[id]:!p[id]}));
  };

  const pct = step===1?33:step===2?66:100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        ,::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::placeholder{color:rgba(255,255,255,0.2)!important}
        input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #0a0a18 inset!important;-webkit-text-fill-color:#fff!important}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .card{animation:fadeUp .55s cubic-bezier(.22,1,.36,1) both}
        .step{animation:fadeUp .35s cubic-bezier(.22,1,.36,1) both}
        .inp{transition:border-color .2s,box-shadow .2s}
        .inp:focus{border-color:#6366f1!important;box-shadow:0 0 0 3px rgba(99,102,241,.22)!important;outline:none}
        .pbtn{transition:transform .15s,box-shadow .15s}
        .pbtn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 14px 40px rgba(99,102,241,.6)!important}
        .pbtn:active:not(:disabled){transform:translateY(0)}
        .pc{transition:border-color .2s,background .2s}
        .pc:hover{border-color:rgba(99,102,241,.4)!important}
        .sbtn:hover{background:rgba(255,255,255,.07)!important;color:rgba(255,255,255,.7)!important}
      `}</style>

      <div style={s.page}>
        <div style={s.g1}/><div style={s.g2}/><div style={s.g3}/>
        <div style={s.dots}/>

        <div className="card" style={s.card}>

          {/* Logo */}
          <div style={s.logo}>
            <div style={s.mark}>
              <img src="/icon.png" alt="AdsMaster AI"
                style={{width:"26px",height:"26px",objectFit:"contain"}}
                onError={e=>{e.currentTarget.style.display="none"}}/>
            </div>
            <span style={s.brand}>AdsMaster AI</span>
          </div>

          {/* Step indicators */}
          <div style={s.steps}>
            {[{n:1,l:"Account"},{n:2,l:"Business"},{n:3,l:"Permissions"}].map(({n,l},i)=>(
              <div key={n} style={{display:"flex",alignItems:"center",flex:1}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}>
                  <div style={{
                    width:"30px",height:"30px",borderRadius:"50%",
                    border:`1.5px solid ${step>=n?"#6366f1":"rgba(255,255,255,.08)"}`,
                    background:step>n?"#6366f1":step===n?"rgba(99,102,241,.15)":"rgba(255,255,255,.04)",
                    color:step>n?"#fff":step===n?"#a5b4fc":"rgba(255,255,255,.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"11px",fontWeight:700,transition:"all .3s",
                  }}>
                    {step>n?"✓":n}
                  </div>
                  <span style={{
                    fontSize:"10px",fontWeight:600,letterSpacing:"0.3px",
                    color:step===n?"#a5b4fc":step>n?"rgba(99,102,241,.6)":"rgba(255,255,255,.18)",
                  }}>{l}</span>
                </div>
                {i<2&&<div style={{flex:1,height:"1.5px",margin:"0 8px",marginBottom:"16px",background:step>n?"#6366f1":"rgba(255,255,255,.07)",transition:"background .4s"}}/>}
              </div>
            ))}
          </div>

          {/* Progress */}
          <div style={s.ptrack}>
            <div style={{...s.pfill,width:`${pct}%`}}/>
          </div>

          {error && <div style={s.err}>⚠️ {error}</div>}

          {/* ══ STEP 1 ══ */}
          {step===1 && (
            <div className="step">
              <div style={s.badge}>NEW ACCOUNT</div>
              <h1 style={s.h1}>Create your account</h1>
              <p style={s.sub}>Start free — no credit card required</p>

              <label style={s.lbl}>Email address</label>
              <div style={{position:"relative",marginBottom:"14px"}}>
                <input className="inp" type="email" value={email} placeholder="you@company.com"
                  onChange={e=>setEmail(e.target.value)}
                  style={{...s.inp,paddingRight:"44px",borderColor:"rgba(255,255,255,.08)"}}/>
                <span style={s.ico}>✉️</span>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"24px"}}>
                <div>
                  <label style={s.lbl}>Password</label>
                  <div style={{position:"relative"}}>
                    <input className="inp" type={showP?"text":"password"} value={password}
                      placeholder="Min. 8 characters"
                      onChange={e=>setPassword(e.target.value)}
                      style={{...s.inp,paddingRight:"40px",borderColor:"rgba(255,255,255,.08)"}}/>
                    <button type="button" onClick={()=>setShowP(v=>!v)} style={s.eye}>
                      {showP?<EyeOff/>:<EyeOn/>}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={s.lbl}>Confirm</label>
                  <div style={{position:"relative"}}>
                    <input className="inp" type={showC?"text":"password"} value={confirm}
                      placeholder="Repeat"
                      onChange={e=>setConfirm(e.target.value)}
                      style={{...s.inp,paddingRight:"40px",borderColor:"rgba(255,255,255,.08)"}}/>
                    <button type="button" onClick={()=>setShowC(v=>!v)} style={s.eye}>
                      {showC?<EyeOff/>:<EyeOn/>}
                    </button>
                  </div>
                </div>
              </div>

              <button className="pbtn" style={s.btn} onClick={step1}>Continue →</button>
              <p style={s.foot}>
                Already have an account?{" "}
                <span style={s.lnk} onClick={()=>router.push("/login")}>Sign in</span>
              </p>
            </div>
          )}

          {/* ══ STEP 2 ══ */}
          {step===2 && (
            <div className="step">
              <div style={s.badge}>YOUR DETAILS</div>
              <h1 style={s.h1}>About your business</h1>
              <p style={s.sub}>Help us personalise your workspace</p>

              <label style={s.lbl}>Full name</label>
              <div style={{position:"relative",marginBottom:"14px"}}>
                <input className="inp" type="text" value={name} placeholder="e.g. Alex Johnson"
                  onChange={e=>setName(e.target.value)}
                  style={{...s.inp,paddingRight:"44px",borderColor:"rgba(255,255,255,.08)"}}/>
                <span style={s.ico}>👤</span>
              </div>

              <label style={s.lbl}>Phone number <span style={{color:"rgba(255,255,255,.2)",fontWeight:400}}>(optional)</span></label>
              <div style={{position:"relative",marginBottom:"14px"}}>
                <input className="inp" type="tel" value={phone} placeholder="+1 555 000 0000"
                  onChange={e=>setPhone(e.target.value)}
                  style={{...s.inp,paddingRight:"44px",borderColor:"rgba(255,255,255,.08)"}}/>
                <span style={s.ico}>📱</span>
              </div>

              <label style={s.lbl}>Business name</label>
              <div style={{position:"relative",marginBottom:"24px"}}>
                <input className="inp" type="text" value={biz} placeholder="e.g. Acme Marketing Ltd"
                  onChange={e=>setBiz(e.target.value)}
                  style={{...s.inp,paddingRight:"44px",borderColor:"rgba(255,255,255,.08)"}}/>
                <span style={s.ico}>🏢</span>
              </div>

              <div style={{display:"flex",gap:"10px"}}>
                <button className="sbtn" style={s.back} onClick={()=>{setError("");setStep(1)}}>← Back</button>
                <button className="pbtn" style={{...s.btn,flex:1,marginBottom:0}} onClick={step2}>Continue →</button>
              </div>
            </div>
          )}

          {/* ══ STEP 3 ══ */}
          {step===3 && (
            <div className="step">
              <div style={s.badge}>PERMISSIONS</div>
              <h1 style={s.h1}>Data & permissions</h1>
              <p style={s.sub}>Required items power core features. Optional ones are your choice.</p>

              <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"18px"}}>
                {PERMS.map(pm=>{
                  const on=perms[pm.id];
                  return (
                    <div key={pm.id} className="pc"
                      onClick={()=>toggle(pm.id,pm.req)}
                      style={{
                        display:"flex",alignItems:"center",gap:"12px",
                        padding:"12px 14px",borderRadius:"14px",
                        border:`1px solid ${on?"rgba(99,102,241,.45)":"rgba(255,255,255,.06)"}`,
                        background:on?"rgba(99,102,241,.08)":"rgba(255,255,255,.025)",
                        cursor:pm.req?"default":"pointer",
                      }}>
                      <span style={{fontSize:"18px",minWidth:"22px",textAlign:"center"}}>{pm.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{color:"#e2e8f0",fontSize:"13px",fontWeight:600,marginBottom:"2px"}}>{pm.title}</div>
                        <div style={{color:"rgba(255,255,255,.28)",fontSize:"11px",lineHeight:"1.5"}}>{pm.desc}</div>
                      </div>
                      {pm.req
                        ?<span style={{fontSize:"9px",fontWeight:700,letterSpacing:"0.5px",background:"rgba(99,102,241,.2)",color:"#a5b4fc",padding:"3px 9px",borderRadius:"20px",flexShrink:0}}>Required</span>
                        :<div style={{width:"36px",height:"20px",borderRadius:"10px",flexShrink:0,background:on?"#6366f1":"rgba(255,255,255,.1)",position:"relative",transition:"background .25s",boxShadow:on?"0 0 10px rgba(99,102,241,.4)":"none"}}>
                          <div style={{position:"absolute",width:"14px",height:"14px",borderRadius:"50%",background:"#fff",top:"3px",left:on?"19px":"3px",transition:"left .25s cubic-bezier(.34,1.56,.64,1)",boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}/>
                        </div>
                      }
                    </div>
                  );
                })}
              </div>

              <div style={s.priv}>
                🛡️{" "}
                <span>
                  Your data is encrypted and <strong style={{color:"rgba(255,255,255,.5)"}}>never sold</strong>.
                  By creating an account you agree to our{" "}
                  <span style={s.lnk} onClick={()=>router.push("/legal/terms")}>Terms of Service</span>
                  {" "}and{" "}
                  <span style={s.lnk} onClick={()=>router.push("/legal/privacy")}>Privacy Policy</span>.
                  GDPR &amp; CCPA compliant.
                </span>
              </div>

              <div style={{display:"flex",gap:"10px"}}>
                <button className="sbtn" style={s.back} onClick={()=>{setError("");setStep(2)}}>← Back</button>
                <button className="pbtn"
                  style={{...s.btn,flex:1,marginBottom:0,opacity:loading?.65:1,cursor:loading?"not-allowed":"pointer"}}
                  onClick={signup} disabled={loading}>
                  {loading
                    ?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}><Spin/>Creating…</span>
                    :"Create Account ✓"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

function EyeOn(){return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;}
function EyeOff(){return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;}
function Spin(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{animation:"spin .8s linear infinite"}}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;}

const s: Record<string, React.CSSProperties> = {
  page:{minHeight:"100vh",background:"radial-gradient(ellipse 100% 80% at 50% -10%,#1e1050 0%,#060612 60%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 16px",fontFamily:"'DM Sans',sans-serif",position:"relative",overflow:"hidden"},
  g1:{position:"absolute",width:"700px",height:"700px",borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 60%)",top:"-300px",left:"-200px",pointerEvents:"none"},
  g2:{position:"absolute",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.1) 0%,transparent 65%)",bottom:"-200px",right:"-150px",pointerEvents:"none"},
  g3:{position:"absolute",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle,rgba(236,72,153,.06) 0%,transparent 70%)",top:"40%",right:"10%",pointerEvents:"none"},
  dots:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(255,255,255,.028) 1px,transparent 1px)",backgroundSize:"30px 30px"},
  card:{background:"rgba(8,8,20,.95)",backdropFilter:"blur(32px)",WebkitBackdropFilter:"blur(32px)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"32px",padding:"44px 40px",width:"100%",maxWidth:"480px",boxShadow:"0 60px 120px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.08)",position:"relative",zIndex:1},
  logo:{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"30px"},
  mark:{width:"44px",height:"44px",borderRadius:"14px",background:"linear-gradient(135deg,#6366f1,#4338ca)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 24px rgba(99,102,241,.5)",overflow:"hidden"},
  brand:{fontSize:"20px",fontWeight:700,letterSpacing:"-0.3px",fontFamily:"'Bricolage Grotesque',sans-serif",background:"linear-gradient(90deg,#e0e7ff,#a5b4fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  steps:{display:"flex",alignItems:"flex-start",marginBottom:"12px"},
  ptrack:{height:"2px",background:"rgba(255,255,255,.05)",borderRadius:"2px",marginBottom:"28px",overflow:"hidden"},
  pfill:{height:"100%",borderRadius:"2px",background:"linear-gradient(90deg,#6366f1,#a855f7)",transition:"width .5s cubic-bezier(.22,1,.36,1)"},
  badge:{display:"inline-block",background:"rgba(99,102,241,.12)",border:"1px solid rgba(99,102,241,.25)",borderRadius:"20px",padding:"4px 12px",fontSize:"10px",fontWeight:700,letterSpacing:"1.5px",color:"#818cf8",marginBottom:"14px"},
  h1:{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"26px",fontWeight:800,color:"#fff",letterSpacing:"-0.5px",marginBottom:"6px"},
  sub:{color:"rgba(255,255,255,.3)",fontSize:"14px",marginBottom:"24px",lineHeight:"1.6"},
  err:{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.25)",borderRadius:"12px",padding:"12px 16px",color:"#fca5a5",fontSize:"13.5px",marginBottom:"20px"},
  lbl:{display:"block",color:"rgba(255,255,255,.38)",fontSize:"11px",fontWeight:700,letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:"7px"},
  inp:{width:"100%",padding:"13px 44px 13px 16px",background:"rgba(255,255,255,.04)",border:"1px solid",borderRadius:"14px",color:"#fff",fontSize:"14.5px",outline:"none",fontFamily:"'DM Sans',sans-serif"},
  ico:{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,.2)",fontSize:"14px",pointerEvents:"none"},
  eye:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.28)",padding:0,display:"flex",alignItems:"center"},
  btn:{width:"100%",padding:"15px",background:"linear-gradient(135deg,#6366f1 0%,#7c3aed 100%)",color:"#fff",border:"none",borderRadius:"14px",fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:"16px",cursor:"pointer",boxShadow:"0 6px 28px rgba(99,102,241,.45)",marginBottom:"16px",letterSpacing:"0.2px"},
  back:{padding:"13px 18px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"14px",color:"rgba(255,255,255,.35)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"14px",cursor:"pointer"},
  foot:{color:"rgba(255,255,255,.25)",fontSize:"14px",textAlign:"center",marginTop:"4px"},
  lnk:{color:"#818cf8",cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(129,140,248,.3)"},
  priv:{background:"rgba(99,102,241,.06)",border:"1px solid rgba(99,102,241,.14)",borderRadius:"12px",padding:"13px 15px",color:"rgba(255,255,255,.28)",fontSize:"12px",lineHeight:"1.7",marginBottom:"20px",display:"flex",gap:"10px",alignItems:"flex-start"},
};