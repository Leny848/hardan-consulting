'use client'

import { BadgeCheck } from 'lucide-react'
import { useContent } from '@/components/content-provider'

export function About() {
  const { content } = useContent()

  return (
    <section id="about" className="section-pad">
      <div className="premium-container">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
        <div className="relative">
          <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-2xl border border-accent/40 md:block" />
          <div className="relative overflow-hidden rounded-2xl bg-secondary shadow-lg">
            <img
              src={content.consultantPortrait || '/images/about-team.png'}
              alt="Hardan Consulting team"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            About us
          </span>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            {content.consultantName}
          </h2>
          <p className="mt-1 text-sm font-medium text-primary">{content.consultantTitle}</p>

          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            {content.consultantBio}
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-card/90 p-7 shadow-sm shadow-primary/5">
          <h3 className="font-serif text-xl font-semibold text-foreground">Vision statement</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            To be the top sustainability consulting firm globally, promoting environmentally
            responsible and socially inclusive development for a sustainable future.
          </p>
          <img
            src="/images/vision.png"
            alt="Hardan Consulting vision"
            className="mt-6 w-full rounded-xl object-contain"
          />
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/90 p-7 shadow-sm shadow-primary/5">
          <h3 className="font-serif text-xl font-semibold text-foreground">Our goals</h3>
          <ul className="mt-6 flex flex-col gap-3">
            {content.credentials.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-foreground">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </section>
  )
}
