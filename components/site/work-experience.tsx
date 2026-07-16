'use client'

import { BadgeCheck } from 'lucide-react'

const STEPS = [
  'Studies Summary',
  'ESMP Screening',
  'Biophysical, meteorological and noise data gathering',
  'Socio-Economic & Public Health field data gathering',
  'Stakeholders Engagement',
  'Impact Assessment & Mitigation Planning',
  'Environmental and Social Action Plan',
  'Environmental and Social Risk Management',
  'ESMP Development',
  'FMEnv / WBG ESMP Approval',
]

const IMAGES = [
  '/images/work/bulka-esmp-hero.png',
  '/images/work/bulka-field-1.jpg',
  '/images/work/bulka-process.png',
  '/images/work/bulka-field-2.jpg',
  '/images/work/bulka-field-3.jpg',
  '/images/work/bulka-field-4.jpg',
]

export function WorkExperience() {
  return (
    <section id="experience" className="section-pad">
      <div className="premium-container">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            Work experiences
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Bulka Erosion &amp; Stormwater Site Rehabilitation — ESMP 2025
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            End-to-end ESMP delivery from screening and field studies through impact assessment,
            mitigation planning, and FMEnv / World Bank approval.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            {IMAGES.map((src) => (
              <div
                key={src}
                className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm"
              >
                <img src={src} alt="Bulka ESMP project" className="aspect-[4/3] w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/90 p-7 shadow-sm shadow-primary/5 backdrop-blur-sm">
            <h3 className="font-serif text-xl font-semibold text-foreground">Project scope</h3>
            <ul className="mt-6 flex flex-col gap-3">
              {STEPS.map((step) => (
                <li key={step} className="flex items-start gap-3 text-sm text-foreground">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
