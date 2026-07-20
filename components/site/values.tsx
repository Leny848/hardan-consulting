'use client'

import { useContent } from '@/components/content-provider'

export function Values() {
  return (
    <section id="values" className="section-pad">
      <div className="premium-container">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            What we stand for
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Our values
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Integrity, excellence, and collaboration guide every engagement, backed by a commitment to
            diversity, sustainability, and responsibility.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-4 shadow-sm shadow-primary/5 backdrop-blur-sm md:p-6">
          <img
            src="/images/values.png"
            alt="Hardan Consulting values: Integrity, Excellence, Collaboration, Diversity & Inclusion, Sustainability, Responsibility"
            className="mx-auto w-full max-w-4xl object-contain"
          />
        </div>
      </div>
    </section>
  )
}
