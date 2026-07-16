'use client'

import { MapPin, Navigation } from 'lucide-react'
import { useContent } from '@/components/content-provider'
import MapInner from '@/components/site/map-inner'

export function LocationMap() {
  const { content } = useContent()

  return (
    <section id="location" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground/80">
            Find us
          </span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Where we&apos;re based
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Visit our office or reach out to arrange a site visit. We work with clients across the
            region and beyond.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">{content.locationLabel}</p>
                <p className="text-sm text-muted-foreground">{content.locationAddress}</p>
              </div>
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${content.locationLat}&mlon=${content.locationLng}#map=15/${content.locationLat}/${content.locationLng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Navigation className="size-4" aria-hidden="true" />
              Open in maps
            </a>
          </div>
        </div>

        <div className="h-80 overflow-hidden rounded-2xl border border-border shadow-lg md:h-96">
          <MapInner
            lat={content.locationLat}
            lng={content.locationLng}
            label={content.locationLabel}
            address={content.locationAddress}
          />
        </div>
      </div>
    </section>
  )
}
