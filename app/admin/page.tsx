'use client'

import { useEffect, useState } from 'react'
import { AdminEditor } from '@/components/admin/admin-editor'
import { AdminLogin } from '@/components/admin/admin-login'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Accept legacy session key from earlier builds
    const active =
      sessionStorage.getItem('hardan-admin-session') === 'active' ||
      sessionStorage.getItem('verdant-admin-session') === 'active'
    if (active) {
      sessionStorage.setItem('hardan-admin-session', 'active')
      sessionStorage.removeItem('verdant-admin-session')
    }
    setAuthed(active)
    setReady(true)
  }, [])

  function logout() {
    sessionStorage.removeItem('hardan-admin-session')
    sessionStorage.removeItem('verdant-admin-session')
    setAuthed(false)
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/40">
        <p className="text-sm text-muted-foreground">Loading admin…</p>
      </div>
    )
  }

  return authed ? (
    <AdminEditor onLogout={logout} />
  ) : (
    <AdminLogin onSuccess={() => setAuthed(true)} />
  )
}
