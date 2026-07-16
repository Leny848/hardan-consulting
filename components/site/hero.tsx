'use client'

import { ArrowRight } from 'lucide-react'
import { BrandLogo } from '@/components/site/brand-logo'
import { useContent } from '@/components/content-provider'

export function Hero() {
  const { content } = useContent()

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-landscape.png"
          alt=""
          aria-hidden="true"
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-[oklch(0.2_0.11_155/0.97)]" />
        <div
          aria-hidden="true"
          className="hero-aura absolute -left-1/4 top-1/4 size-[70vmax] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.16_145_/_0.45)_0%,transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="hero-aura absolute -right-1/4 bottom-0 size-[55vmax] rounded-full bg-[radial-gradient(circle,oklch(0.5_0.14_160_/_0.35)_0%,transparent_65%)] [animation-delay:-4s]"
        />
      </div>

      <div className="premium-container flex flex-col items-start pb-16 pt-24 sm:pb-20 sm:pt-28 md:pb-28 md:pt-32">
        <BrandLogo
          alt={`${content.brandName} ${content.tagline}`}
          className="mb-6 sm:mb-8"
          imgClassName="h-11 sm:h-12 md:h-14"
          onDark
        />

        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/80 sm:text-xs">
          {content.heroEyebrow}
        </span>

        <h1 className="mt-3 max-w-3xl text-balance font-serif text-[1.75rem] font-semibold leading-[1.08] text-primary-foreground sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
          {content.heroTitle}
        </h1>

        <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-primary-foreground/88 sm:mt-6 sm:text-base md:text-lg">
          {content.heroSubtitle}
        </p>

        <div className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform active:scale-[0.98] sm:w-auto sm:px-7 hover:-translate-y-0.5"
          >
            {content.heroCta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/35 bg-primary-foreground/5 px-6 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-colors active:scale-[0.98] sm:w-auto sm:px-7 hover:bg-primary-foreground/12"
          >
            Our core services
          </a>
        </div>
      </div>
    </section>
  )
}
