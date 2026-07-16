'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BrandLogo } from '@/components/site/brand-logo'
import { useContent } from '@/components/content-provider'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Values', href: '#values' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader() {
  const { content } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-border/60 bg-background/92 shadow-sm shadow-primary/5 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="premium-container flex items-center justify-between gap-3 py-3 sm:py-3.5">
        <a href="#top" className="min-w-0 shrink" onClick={() => setOpen(false)}>
          <BrandLogo
            alt={`${content.brandName} ${content.tagline}`}
            onDark={!scrolled && !open}
          />
        </a>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'whitespace-nowrap text-[13px] font-medium transition-colors xl:text-sm',
                scrolled
                  ? 'text-foreground/75 hover:text-primary'
                  : 'text-primary-foreground/88 hover:text-primary-foreground',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={cn(
              'hidden rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:inline-block sm:px-5 sm:py-2.5 sm:text-sm',
              scrolled
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-accent text-accent-foreground hover:bg-accent/90',
            )}
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'flex size-10 items-center justify-center rounded-xl border transition-colors lg:hidden',
              scrolled || open
                ? 'border-border/60 text-foreground hover:bg-secondary'
                : 'border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10',
            )}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/98 backdrop-blur-xl lg:hidden">
          <nav
            className="premium-container flex max-h-[calc(100dvh-4.5rem)] flex-col gap-0.5 overflow-y-auto py-3 pb-6"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3.5 text-[15px] font-medium text-foreground/85 active:bg-secondary hover:bg-secondary/80 hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-primary px-5 py-3.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Get in touch
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
