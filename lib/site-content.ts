export type Stat = { id: string; value: string; label: string }
export type Service = { id: string; title: string; description: string }
export type Certification = {
  id: string
  name: string
  detail: string
  /** Logo image as a public path, blob URL, or data URL. Empty = icon fallback. */
  logo: string
}

export type SiteContent = {
  brandName: string
  tagline: string
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

  adminPassword: string
}

export const CONTENT_BLOB_PATH = 'hardan/site-content.json'

export const DEFAULT_CONTENT: SiteContent = {
  brandName: 'Hardan',
  tagline: 'Consulting',
  brandLogo: '/images/hardan-emblem.png',

  heroEyebrow: 'Environmental & Social Assessment',
  heroTitle: 'Science-based solutions for sustainable development.',
  heroSubtitle:
    'Hardan Consulting Limited delivers advanced, science-based environmental and social solutions across governments, development finance, energy, infrastructure, mining, and manufacturing, combining technical expertise with regulatory knowledge.',
  heroCta: 'Contact us',

  consultantName: 'Hardan Consulting Limited',
  consultantTitle: 'Environmental & Social Assessment Firm',
  consultantBio:
    'We are an Environmental and Social assessment firm providing advanced, science-based, and sustainable environmental and social solutions to clients across governments, development finance institutions, energy, telecommunication, power, infrastructure, water resources, agriculture, mining, and manufacturing industries. We combine technical expertise with regulatory knowledge to support organizations in meeting compliance obligations while enhancing their environmental and social performance.',
  consultantPortrait: '/images/about-team.png',
  credentials: [
    'Compliance: high-quality environmental and social services for governments and industry',
    'Risk management: impact assessment, mitigation planning, and monitoring',
    'Partnership: long-term client relationships that foster innovation and knowledge sharing',
    'Sustainability: climate adaptation and mitigation at local, regional, and national levels',
    'Inclusion: community participation and gender-sensitive project planning',
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
      detail:
        'National Environmental Standards and Regulations Enforcement Agency, our regulatory compliance partner',
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

export function normalizeContent(raw: unknown): SiteContent {
  if (!raw || typeof raw !== 'object') return DEFAULT_CONTENT
  const parsed = raw as Record<string, unknown>

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
  }
}

export function supabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export function getRequestPassword(request: Request) {
  return (
    request.headers.get('x-admin-password') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    ''
  )
}
