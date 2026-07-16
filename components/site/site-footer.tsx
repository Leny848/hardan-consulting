'use client'

import { BrandLogo } from '@/components/site/brand-logo'
import { useContent } from '@/components/content-provider'

export function SiteFooter() {
  const { content } = useContent()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/80 bg-background/90 backdrop-blur-sm">
      <div className="premium-container flex flex-col items-center gap-6 py-10 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
          <BrandLogo alt={`${content.brandName} ${content.tagline}`} />
        </div>

        <p className="max-w-xs text-sm text-muted-foreground md:max-w-none">
          &copy; {year} Hardan Consulting Limited. All rights reserved.
        </p>

        <a
          href="/admin"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Admin
        </a>
      </div>
    </footer>
  )
}
