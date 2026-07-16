'use client'

import type { ReactNode } from 'react'

export function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="glass-card p-4 sm:p-6 md:p-8">
      <div className="mb-5 sm:mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground sm:text-xl">{title}</h2>
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-4 sm:gap-5">{children}</div>
    </section>
  )
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background px-3 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 sm:py-2.5 sm:text-sm"
      />
    </label>
  )
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-none rounded-xl border border-input bg-background px-3 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 sm:py-2.5 sm:text-sm"
      />
    </label>
  )
}
