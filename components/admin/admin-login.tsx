'use client'

import { useState, type FormEvent } from 'react'
import { Lock } from 'lucide-react'
import { BrandLogo } from '@/components/site/brand-logo'
import { useContent } from '@/components/content-provider'

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const { content, hydrated } = useContent()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const password = content.adminPassword || 'hardan2024'
    if (value === password) {
      sessionStorage.setItem('hardan-admin-session', 'active')
      onSuccess()
    } else {
      setError(true)
    }
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-secondary/50 px-4">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-secondary/50 px-4 py-8">
      <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-card/95 p-6 shadow-xl shadow-primary/10 backdrop-blur-md sm:p-8">
        <div className="flex flex-col items-center text-center">
          <BrandLogo className="mb-5" />
          <h1 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">Admin Access</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Enter your password to manage site content.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4 sm:mt-8">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type="password"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  setError(false)
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-input bg-background py-3 pl-9 pr-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 sm:py-2.5 sm:text-sm"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">
                Incorrect password. Try <span className="font-mono">hardan2024</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors active:scale-[0.98] hover:bg-primary/90"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
