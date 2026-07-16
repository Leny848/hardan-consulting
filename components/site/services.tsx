'use client'

import { Compass, Droplets, Leaf, ScrollText, Shield, Sprout, Users } from 'lucide-react'
import { useContent } from '@/components/content-provider'

const ICONS = [Sprout, Leaf, ScrollText, Compass, Droplets, Shield, Users]

export function Services() {
  const { content } = useContent()
  const environmental = content.services.slice(0, 13)
  const social = content.services.slice(13)

  return (
    <section id="services" className="section-pad">
      <div className="premium-container">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            What we do
          </span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Our core services
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Full environmental and social consulting — from baseline studies and regulatory
            compliance to gender inclusion, ESMP development, and FMEnv approvals.
          </p>
        </div>

        <ServiceGroup
          title="Environmental and Sustainability Services"
          services={environmental}
          offset={0}
        />
        {social.length > 0 && (
          <ServiceGroup title="Social and Gender Services" services={social} offset={13} />
        )}
      </div>
    </section>
  )
}

function ServiceGroup({
  title,
  services,
  offset,
}: {
  title: string
  services: { id: string; title: string; description: string }[]
  offset: number
}) {
  return (
    <div className="mt-14">
      <h3 className="mb-8 font-serif text-2xl font-semibold text-foreground">{title}</h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = ICONS[(offset + i) % ICONS.length]
          return (
            <article
              key={service.id}
              className="group rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm shadow-primary/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h4 className="mt-4 font-serif text-lg font-semibold text-foreground">
                {service.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
