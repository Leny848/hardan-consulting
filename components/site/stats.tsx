'use client'

import { useContent } from '@/components/content-provider'

export function Stats() {
  const { content } = useContent()

  return (
    <section className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14">
      <div className="premium-container">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/80 bg-border shadow-lg shadow-primary/8 sm:rounded-2xl md:grid-cols-4">
          {content.stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center gap-1 bg-card/95 px-3 py-6 text-center backdrop-blur-sm sm:px-4 sm:py-8"
            >
              <span className="font-serif text-2xl font-semibold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
                {stat.value}
              </span>
              <span className="max-w-[8rem] text-[10px] font-medium uppercase leading-snug tracking-wider text-muted-foreground sm:max-w-none sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
