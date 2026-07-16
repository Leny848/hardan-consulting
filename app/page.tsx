import { About } from '@/components/site/about'
import { Certifications } from '@/components/site/certifications'
import { Contact } from '@/components/site/contact'
import { Gallery } from '@/components/site/gallery'
import { Hero } from '@/components/site/hero'
import { LocationMap } from '@/components/site/location-map'
import { Services } from '@/components/site/services'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { Stats } from '@/components/site/stats'
import { Values } from '@/components/site/values'
import { WorkExperience } from '@/components/site/work-experience'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <About />
        <Values />
        <Services />
        <WorkExperience />
        <Gallery />
        <Certifications />
        <LocationMap />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
