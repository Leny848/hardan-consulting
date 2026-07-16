'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type Stat = { id: string; value: string; label: string }
export type Service = { id: string; title: string; description: string }
export type Certification = {
  id: string
  name: string
  detail: string
  /** Logo image as a data URL or public path. Empty = icon fallback. */
  logo: string
}

export type SiteContent = {
  brandName: string
  tagline: string
  /** Company logo — public path or data URL */
  brandLogo: string

  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroCta: string

  consultantName: string
  consultantTitle: string
  consultantBio: string
  consultantPortrait: string
  credentials: string[]

  stats: Stat[]
  services: Service[]
  certifications: Certification[]

  locationLat: number
  locationLng: number
  locationLabel: string
  locationAddress: string

  contactEmail: string
  contactPhone: string
  contactAddress: string
  contactHours: string

  /** Simple client-side gate for the admin panel (demo only). */
  adminPassword: string
}

/* -------------------------------------------------------------------------- */
/*  Defaults                                                                  */
/* -------------------------------------------------------------------------- */

export const DEFAULT_CONTENT: SiteContent = {
  brandName: 'Hardan',
  tagline: 'Consulting',
  brandLogo: '/images/hardan-emblem.png',

  heroEyebrow: 'Environmental & Social Assessment',
  heroTitle: 'Science-based solutions for sustainable development.',
  heroSubtitle:
    'Hardan Consulting Limited delivers advanced, science-based environmental and social solutions across governments, development finance, energy, infrastructure, mining, and manufacturing — combining technical expertise with regulatory knowledge.',
  heroCta: 'Contact us',

  consultantName: 'Hardan Consulting Limited',
  consultantTitle: 'Environmental & Social Assessment Firm',
  consultantBio:
    'We are an Environmental and Social assessment firm providing advanced, science-based, and sustainable environmental and social solutions to clients across governments, development finance institutions, energy, telecommunication, power, infrastructure, water resources, agriculture, mining, and manufacturing industries. We combine technical expertise with regulatory knowledge to support organizations in meeting compliance obligations while enhancing their environmental and social performance.',
  consultantPortrait: '/images/about-team.png',
  credentials: [
    'Compliance — high-quality environmental and social services for governments and industry',
    'Risk management — impact assessment, mitigation planning, and monitoring',
    'Partnership — long-term client relationships that foster innovation and knowledge sharing',
    'Sustainability — climate adaptation and mitigation at local, regional, and national levels',
    'Inclusion — community participation and gender-sensitive project planning',
  ],

  stats: [
    { id: 's1', value: '19', label: 'Core services' },
    { id: 's2', value: 'FMEnv', label: 'ESMP approvals' },
    { id: 's3', value: 'NESREA', label: 'Regulatory partner' },
    { id: 's4', value: 'Abuja', label: 'Headquarters' },
  ],

  services: [
    {
      id: 'sv1',
      title: 'Environmental Assessment and Reporting',
      description: 'Comprehensive environmental assessments and reporting for regulatory submission.',
    },
    {
      id: 'sv2',
      title: 'Environmental Policy & Regulatory Compliance Advisory',
      description: 'Navigate FMEnv and NESREA requirements with expert policy and compliance guidance.',
    },
    {
      id: 'sv3',
      title: 'Environmental Baseline Study',
      description: 'Establish pre-project environmental conditions with rigorous baseline data collection.',
    },
    {
      id: 'sv4',
      title: 'Environmental Sensitivity Index Mapping',
      description: 'Map sensitive receptors and ecological features to inform project planning.',
    },
    {
      id: 'sv5',
      title: 'Water Assessment',
      description: 'Surface water, groundwater, and sediment sampling and analysis.',
    },
    {
      id: 'sv6',
      title: 'Compliance Monitoring and Audits',
      description: 'Ongoing compliance monitoring, audits, and regulatory reporting.',
    },
    {
      id: 'sv7',
      title: 'Flood Risk Assessment',
      description: 'Flood hazard mapping and risk assessment for infrastructure and development projects.',
    },
    {
      id: 'sv8',
      title: 'Biodiversity Assessment and Reporting',
      description: 'Ecological surveys and biodiversity impact documentation.',
    },
    {
      id: 'sv9',
      title: 'Catchment Management Plan',
      description: 'Integrated water catchment planning and management strategies.',
    },
    {
      id: 'sv10',
      title: 'ESG / Sustainability Reporting',
      description: 'Environmental, social, and governance reporting for investors and regulators.',
    },
    {
      id: 'sv11',
      title: 'Climate Change Advisory',
      description: 'Climate adaptation and mitigation strategies at local, regional, and national levels.',
    },
    {
      id: 'sv12',
      title: 'Waste Management',
      description: 'Waste characterisation, management plans, and disposal compliance.',
    },
    {
      id: 'sv13',
      title: 'HSE Capacity Building & Training',
      description: 'Capacity building and training in health, safety, and environment.',
    },
    {
      id: 'sv14',
      title: 'Social Impact Assessment (SIA) & RAPs',
      description: 'Social impact assessments and resettlement action plans for affected communities.',
    },
    {
      id: 'sv15',
      title: 'Gender Assessment & Social Inclusion Frameworks',
      description: 'Gender-sensitive planning and social inclusion frameworks for inclusive development.',
    },
    {
      id: 'sv16',
      title: 'Gender Based Violence (GBV) Mapping',
      description: 'GBV risk mapping and mitigation strategies in project areas.',
    },
    {
      id: 'sv17',
      title: 'Grievance Redress Mechanism',
      description: 'Design and implementation of community grievance redress systems.',
    },
    {
      id: 'sv18',
      title: 'Prevention of Sexual Exploitation and Abuse (PSEA)',
      description: 'PSEA frameworks and safeguarding for development projects.',
    },
    {
      id: 'sv19',
      title: 'Social Governance Capacity Building',
      description: 'Training and capacity building in social governance and stakeholder engagement.',
    },
  ],

  certifications: [
    {
      id: 'c1',
      name: 'Federal Ministry of Environment (FMEnv)',
      detail: 'Registered for ESMP development, screening, and environmental compliance approvals',
      logo: '/images/certifications/fmenv.png',
    },
    {
      id: 'c2',
      name: 'NESREA',
      detail: 'National Environmental Standards and Regulations Enforcement Agency — regulatory compliance partner',
      logo: '/images/certifications/nesrea.png',
    },
  ],

  locationLat: 9.0469,
  locationLng: 7.5304,
  locationLabel: 'Hardan Consulting Limited',
  locationAddress: '22 Gnassingbe Eyadema Str, Asokoro, Abuja, Nigeria',

  contactEmail: 'hardanconsulting@hotmail.com',
  contactPhone: '+234 706 383 8610',
  contactAddress: '22 Gnassingbe Eyadema Str, Asokoro, Abuja, Nigeria',
  contactHours: 'Mon–Fri, 9:00–17:00',

  adminPassword: 'hardan2024',
}

const STORAGE_KEY = 'hardan-site-content-v2'

/* -------------------------------------------------------------------------- */
/*  Context                                                                   */
/* -------------------------------------------------------------------------- */

type ContentContextValue = {
  content: SiteContent
  hydrated: boolean
  update: (patch: Partial<SiteContent>) => void
  reset: () => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

function normalizeStored(raw: unknown): SiteContent {
  if (!raw || typeof raw !== 'object') return DEFAULT_CONTENT
  const parsed = raw as Record<string, unknown>

  // Migrate legacy "affiliations" → certifications with logo support
  let certifications = parsed.certifications
  if (!Array.isArray(certifications) && Array.isArray(parsed.affiliations)) {
    certifications = (parsed.affiliations as { id?: string; name?: string; detail?: string }[]).map(
      (a, i) => ({
        id: a.id || `mig-${i}`,
        name: a.name || 'Certification',
        detail: a.detail || '',
        logo: '',
      }),
    )
  }

  return {
    ...DEFAULT_CONTENT,
    ...parsed,
    brandLogo:
      typeof parsed.brandLogo === 'string' && parsed.brandLogo
        ? parsed.brandLogo
        : DEFAULT_CONTENT.brandLogo,
    certifications: Array.isArray(certifications)
      ? (certifications as Certification[]).map((c) => ({
          id: c.id,
          name: c.name,
          detail: c.detail,
          logo: typeof c.logo === 'string' ? c.logo : '',
        }))
      : DEFAULT_CONTENT.certifications,
  } as SiteContent
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setContent(normalizeStored(JSON.parse(raw)))
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true)
  }, [])

  const persist = useCallback((next: SiteContent) => {
    setContent(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore quota errors
    }
  }, [])

  const update = useCallback((patch: Partial<SiteContent>) => {
    setContent((prev) => {
      const next = { ...prev, ...patch }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const reset = useCallback(() => {
    persist(DEFAULT_CONTENT)
  }, [persist])

  return (
    <ContentContext.Provider value={{ content, hydrated, update, reset }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within a ContentProvider')
  return ctx
}
