"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [showPass,   setShowPass]   = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [showReset,  setShowReset]  = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent,  setResetSent]  = useState(false);
  const [resetLoad,  setResetLoad]  = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/campaign-creator");
    });
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) return setError("Please enter your email and password.");
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;
      router.replace("/campaign-creator");
    } catch (e: any) {
      setError(e.message === "Invalid login credentials"
        ? "Incorrect email or password. Please try again."
        : e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setError("");
    if (!resetEmail) return setError("Please enter your email address.");
    setResetLoad(true);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) throw err;
      setResetSent(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setResetLoad(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") showReset ? handleReset() : handleLogin();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        ,::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::placeholder{color:rgba(255,255,255,0.2)!important}
        input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #0a0a18 inset!important;-webkit-text-fill-color:#fff!important}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
        .card{animation:fadeUp .55s cubic-bezier(.22,1,.36,1) both}
        .panel{animation:fadeUp .35s cubic-bezier(.22,1,.36,1) both}
        .inp{transition:border-color .2s,box-shadow .2s}
        .inp:focus{border-color:#6366f1!important;box-shadow:0 0 0 3px rgba(99,102,241,.22)!important;outline:none}
        .pbtn{transition:transform .15s,box-shadow .15s}
        .pbtn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 14px 40px rgba(99,102,241,.6)!important}
        .pbtn:active:not(:disabled){transform:translateY(0)}
        .lnk{transition:color .15s;cursor:pointer}
        .lnk:hover{color:#c7d2fe!important}
        .sbtn{transition:background .2s,color .2s}
        .sbtn:hover{background:rgba(255,255,255,.07)!important;color:rgba(255,255,255,.7)!important}
      `}</style>

      <div style={p.page}>
        <div style={p.g1}/><div style={p.g2}/><div style={p.g3}/>
        <div style={p.dots}/>

        <div className="card" style={p.card}>

          {/* Logo */}
          <div style={p.logo}>
            <div style={p.mark}>
              <img src="/icon.png" alt="AdsMaster AI"
                style={{width:"26px",height:"26px",objectFit:"contain"}}
                onError={e=>{e.currentTarget.style.display="none"}}/>
            </div>
            <span style={p.brand}>AdsMaster AI</span>
          </div>

          {/* ─── LOGIN ─── */}
          {!showReset && (
            <div className="panel">
              <div style={p.badge}>SECURE LOGIN</div>
              <h1 style={p.h1}>Welcome back</h1>
              <p style={p.sub}>Sign in to your account to continue</p>

              {error && <div style={p.err}>⚠️ {error}</div>}

              <label style={p.lbl}>Email address</label>
              <div style={{position:"relative",marginBottom:"14px"}}>
                <input className="inp" type="email" value={email}
                  placeholder="you@company.com"
                  onChange={e=>setEmail(e.target.value)} onKeyDown={onKey}
                  style={{...p.inp,borderColor:error?"rgba(239,68,68,.4)":"rgba(255,255,255,.08)"}}/>
                <span style={p.iico}>✉️</span>
              </div>

              <label style={p.lbl}>Password</label>
              <div style={{position:"relative",marginBottom:"8px"}}>
                <input className="inp" type={showPass?"text":"password"} value={password}
                  placeholder="Enter your password"
                  onChange={e=>setPassword(e.target.value)} onKeyDown={onKey}
                  style={{...p.inp,paddingRight:"44px",borderColor:error?"rgba(239,68,68,.4)":"rgba(255,255,255,.08)"}}/>
                <button type="button" onClick={()=>setShowPass(v=>!v)} style={p.eye}>
                  {showPass
                    ?<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    :<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                </button>
              </div>

              <div style={{textAlign:"right",marginBottom:"24px"}}>
                <span className="lnk" style={p.forgot}
                  onClick={()=>{setError("");setShowReset(true)}}>
                  Forgot password?
                </span>
              </div>

              <button className="pbtn" style={{...p.btn,opacity:loading?.65:1,cursor:loading?"not-allowed":"pointer"}}
                onClick={handleLogin} disabled={loading}>
                {loading
                  ?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}><Spin/>Signing in…</span>
                  :"Sign In →"}
              </button>

              <div style={p.divLine}/>

              <p style={p.foot}>
                Don't have an account?{" "}
                <span className="lnk" style={p.lnk} onClick={()=>router.push("/signup")}>
                  Create one free
                </span>
              </p>
            </div>
          )}

          {/* ─── RESET PASSWORD ─── */}
          {showReset && (
            <div className="panel">
              {!resetSent ? (
                <>
                  <div style={{fontSize:"44px",textAlign:"center",marginBottom:"14px",animation:"pulse 2s infinite"}}>🔐</div>
                  <h1 style={p.h1}>Reset password</h1>
                  <p style={p.sub}>Enter your email — we'll send a reset link instantly.</p>

                  {error && <div style={p.err}>⚠️ {error}</div>}

                  <label style={p.lbl}>Email address</label>
                  <div style={{position:"relative",marginBottom:"24px"}}>
                    <input className="inp" type="email" value={resetEmail}
                      placeholder="you@company.com"
                      onChange={e=>setResetEmail(e.target.value)} onKeyDown={onKey}
                      style={{...p.inp,borderColor:"rgba(255,255,255,.08)"}}/>
                    <span style={p.iico}>✉️</span>
                  </div>

                  <button className="pbtn" style={{...p.btn,opacity:resetLoad?.65:1,cursor:resetLoad?"not-allowed":"pointer"}}
                    onClick={handleReset} disabled={resetLoad}>
                    {resetLoad
                      ?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}><Spin/>Sending…</span>
                      :"Send Reset Link"}
                  </button>

                  <button className="sbtn" style={p.back}
                    onClick={()=>{setError("");setShowReset(false)}}>
                    ← Back to Sign In
                  </button>
                </>
              ):(
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:"52px",marginBottom:"16px"}}>✉️</div>
                  <h1 style={{...p.h1,marginBottom:"10px"}}>Check your inbox</h1>
                  <p style={{...p.sub,marginBottom:"24px",lineHeight:"1.8"}}>
                    We sent a reset link to<br/>
                    <strong style={{color:"#a5b4fc"}}>{resetEmail}</strong>
                  </p>
                  <div style={p.success}>✅ Reset link sent successfully</div>
                  <button className="sbtn" style={{...p.back,width:"100%",textAlign:"center"}}
                    onClick={()=>{setShowReset(false);setResetSent(false);setResetEmail("")}}>
                    ← Back to Sign In
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

function Spin() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{animation:"spin .8s linear infinite"}}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>;
}

const p: Record<string, React.CSSProperties> = {
  page:{minHeight:"100vh",background:"radial-gradient(ellipse 100% 80% at 50% -10%,#1e1050 0%,#060612 60%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 16px",fontFamily:"'DM Sans',sans-serif",position:"relative",overflow:"hidden"},
  g1:{position:"absolute",width:"700px",height:"700px",borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 60%)",top:"-300px",left:"-200px",pointerEvents:"none"},
  g2:{position:"absolute",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.1) 0%,transparent 65%)",bottom:"-200px",right:"-150px",pointerEvents:"none"},
  g3:{position:"absolute",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle,rgba(236,72,153,.06) 0%,transparent 70%)",top:"40%",right:"10%",pointerEvents:"none"},
  dots:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(255,255,255,.028) 1px,transparent 1px)",backgroundSize:"30px 30px"},
  card:{background:"rgba(8,8,20,.95)",backdropFilter:"blur(32px)",WebkitBackdropFilter:"blur(32px)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"32px",padding:"48px 44px",width:"100%",maxWidth:"450px",boxShadow:"0 60px 120px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.08)",position:"relative",zIndex:1},
  logo:{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"36px"},
  mark:{width:"44px",height:"44px",borderRadius:"14px",background:"linear-gradient(135deg,#6366f1,#4338ca)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 24px rgba(99,102,241,.5)",overflow:"hidden"},
  brand:{fontSize:"20px",fontWeight:700,letterSpacing:"-0.3px",fontFamily:"'Bricolage Grotesque',sans-serif",background:"linear-gradient(90deg,#e0e7ff,#a5b4fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  badge:{display:"inline-block",background:"rgba(99,102,241,.12)",border:"1px solid rgba(99,102,241,.25)",borderRadius:"20px",padding:"4px 12px",fontSize:"10px",fontWeight:700,letterSpacing:"1.5px",color:"#818cf8",marginBottom:"16px"},
  h1:{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"26px",fontWeight:800,color:"#fff",letterSpacing:"-0.5px",marginBottom:"6px"},
  sub:{color:"rgba(255,255,255,.3)",fontSize:"14px",marginBottom:"28px",lineHeight:"1.6"},
  err:{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.25)",borderRadius:"12px",padding:"12px 16px",color:"#fca5a5",fontSize:"13.5px",marginBottom:"20px"},
  success:{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.25)",borderRadius:"12px",padding:"12px 16px",color:"#86efac",fontSize:"13.5px",marginBottom:"20px",textAlign:"center"},
  lbl:{display:"block",color:"rgba(255,255,255,.38)",fontSize:"11.5px",fontWeight:700,letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:"8px"},
  inp:{width:"100%",padding:"13px 44px 13px 16px",background:"rgba(255,255,255,.04)",border:"1px solid",borderRadius:"14px",color:"#fff",fontSize:"14.5px",outline:"none",fontFamily:"'DM Sans',sans-serif"},
  iico:{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,.2)",fontSize:"15px",pointerEvents:"none"},
  eye:{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.28)",padding:0,display:"flex",alignItems:"center"},
  forgot:{color:"#6366f1",fontSize:"13px",fontWeight:600},
  btn:{width:"100%",padding:"15px",background:"linear-gradient(135deg,#6366f1 0%,#7c3aed 100%)",color:"#fff",border:"none",borderRadius:"14px",fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:"16px",cursor:"pointer",boxShadow:"0 6px 28px rgba(99,102,241,.45)",marginBottom:"20px",letterSpacing:"0.2px"},
  divLine:{height:"1px",background:"rgba(255,255,255,.06)",marginBottom:"20px"},
  foot:{color:"rgba(255,255,255,.25)",fontSize:"14px",textAlign:"center"},
  lnk:{color:"#818cf8",textDecoration:"underline",textDecorationColor:"rgba(129,140,248,.3)"},
  back:{display:"block",width:"100%",padding:"13px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"14px",color:"rgba(255,255,255,.35)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"14px",cursor:"pointer",marginTop:"8px",textAlign:"center"},
};