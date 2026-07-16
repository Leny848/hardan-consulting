'use client'

import { BadgeCheck } from 'lucide-react'
import { useContent } from '@/components/content-provider'

export function Certifications() {
  const { content } = useContent()

  if (!content.certifications.length) return null

  return (
    <section id="certifications" className="section-band section-pad">
      <div className="premium-container">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            Regulatory recognition
          </span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Certifications & regulatory bodies
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Registered and recognised by Nigeria&apos;s leading environmental regulators — ensuring
            every project meets national compliance standards.
          </p>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-2">
          {content.certifications.map((cert) => (
            <li
              key={cert.id}
              className="group flex flex-col items-center rounded-2xl border border-border/70 bg-card/90 p-8 text-center shadow-sm shadow-primary/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:flex-row sm:items-center sm:text-left"
            >
              <div className="mb-6 flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-white p-3 shadow-inner sm:mb-0 sm:mr-6">
                {cert.logo ? (
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-xl font-semibold text-foreground">{cert.name}</h3>
                <p className="mt-3 flex items-start justify-center gap-2 text-sm leading-relaxed text-muted-foreground sm:justify-start">
                  <BadgeCheck
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{cert.detail}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
