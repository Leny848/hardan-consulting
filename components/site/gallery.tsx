'use client'

const GALLERY = [
  { src: '/images/gallery/in-situ-assessment.jpg', title: 'Stakeholders engagement' },
  { src: '/images/gallery/stakeholders-engagement-1.jpg', title: 'In situ assessment' },
  { src: '/images/gallery/stakeholders-engagement-2.jpg', title: 'Stakeholders engagement' },
  { src: '/images/gallery/stakeholders-engagement-3.jpg', title: 'Stakeholders engagement' },
  { src: '/images/gallery/surface-water-sampling.jpg', title: 'Sediment sampling' },
  { src: '/images/gallery/sediment-sampling.jpg', title: 'Surface water sampling' },
  { src: '/images/gallery/groundwater-sampling.jpg', title: 'Soil sampling' },
  { src: '/images/gallery/soil-sampling.jpg', title: 'Groundwater sampling' },
  { src: '/images/gallery/air-quality-monitoring.jpg', title: 'Air quality monitoring' },
]

export function Gallery() {
  return (
    <section id="gallery" className="section-band section-pad">
      <div className="premium-container">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            Field work
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Our work in the field
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            From in-situ assessments and stakeholder engagement to water, soil, sediment, and air
            quality monitoring — rigorous data collection in the field.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item) => (
            <figure
              key={item.src}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-sm shadow-primary/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <img
                src={item.src}
                alt={item.title}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="border-t border-border/60 px-4 py-3 text-sm font-medium text-foreground">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
