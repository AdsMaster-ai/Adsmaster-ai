'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { supabase } from './../lib/supabaseClient'

export default function HomePage() {
  const router = useRouter()

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) router.push('/campaign-creator')
  })
}, [router])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f5f3ff,#ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '2rem' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, color: 'white', margin: '0 auto 16px' }}>AM</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '10px', letterSpacing: '-0.02em' }}>AdsMaster</h1>
        <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '28px', lineHeight: 1.6 }}>Smart ads creation, launch & optimization platform</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <a href="/login" style={{ padding: '12px 28px', background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '11px', color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>Login</a>
          <a href="/signup" style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '11px', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}>Get Started Free →</a>
        </div>
      </div>
    </div>
  )
}
