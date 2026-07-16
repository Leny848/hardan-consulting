'use client'

import { useRef, useState, type ChangeEvent } from 'react'
import { ExternalLink, LogOut, Plus, RotateCcw, Trash2, Upload } from 'lucide-react'
import {
  useContent,
  type Certification,
  type Service,
  type Stat,
} from '@/components/content-provider'
import { Section, TextArea, TextInput } from '@/components/admin/fields'
import { BrandLogo } from '@/components/site/brand-logo'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function AdminEditor({ onLogout }: { onLogout: () => void }) {
  const { content, update, reset } = useContent()
  const [saved, setSaved] = useState(false)
  const portraitRef = useRef<HTMLInputElement>(null)
  const brandLogoRef = useRef<HTMLInputElement>(null)
  const logoRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function flash() {
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  function set<K extends keyof typeof content>(key: K, value: (typeof content)[K]) {
    update({ [key]: value })
    flash()
  }

  async function handlePortrait(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    set('consultantPortrait', await readAsDataUrl(file))
    e.target.value = ''
  }

  async function handleBrandLogo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    set('brandLogo', await readAsDataUrl(file))
    e.target.value = ''
  }

  async function handleLogo(id: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await readAsDataUrl(file)
    set(
      'certifications',
      content.certifications.map((c) => (c.id === id ? { ...c, logo: dataUrl } : c)),
    )
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-secondary/40 pb-8">
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="premium-container flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
          <div className="min-w-0">
            <h1 className="font-serif text-lg font-semibold text-foreground sm:text-xl">Content Manager</h1>
            <p className="text-xs text-muted-foreground">
              {saved ? 'Changes saved automatically ✓' : 'Edits save automatically to this browser'}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 xs:flex-row sm:w-auto sm:items-center">
            <a
              href="/"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:flex-none sm:py-2"
            >
              <ExternalLink className="size-4 shrink-0" /> View site
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex-none sm:py-2"
            >
              <LogOut className="size-4 shrink-0" /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="premium-container flex flex-col gap-5 py-5 sm:gap-6 sm:py-8">
        <Section title="Brand" description="Your business name, tagline, and logo.">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-2">
              <BrandLogo className="rounded-xl border border-border/60 bg-background/80 px-4 py-3" />
              <input
                ref={brandLogoRef}
                type="file"
                accept="image/*"
                onChange={handleBrandLogo}
                className="hidden"
              />
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => brandLogoRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <Upload className="size-3.5" /> Change logo
                </button>
                <button
                  type="button"
                  onClick={() => set('brandLogo', '/images/hardan-emblem.png')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-destructive hover:text-destructive"
                >
                  Reset logo
                </button>
              </div>
            </div>
            <div className="grid flex-1 gap-5 sm:grid-cols-2">
              <TextInput label="Brand name" value={content.brandName} onChange={(v) => set('brandName', v)} />
              <TextInput label="Tagline" value={content.tagline} onChange={(v) => set('tagline', v)} />
            </div>
          </div>
        </Section>

        <Section title="Hero section" description="The headline area at the top of the site.">
          <TextInput label="Eyebrow" value={content.heroEyebrow} onChange={(v) => set('heroEyebrow', v)} />
          <TextInput label="Title" value={content.heroTitle} onChange={(v) => set('heroTitle', v)} />
          <TextArea label="Subtitle" value={content.heroSubtitle} onChange={(v) => set('heroSubtitle', v)} />
          <TextInput label="Button text" value={content.heroCta} onChange={(v) => set('heroCta', v)} />
        </Section>

        <Section title="Numbers" description="The key statistics displayed under the hero.">
          <div className="flex flex-col gap-4">
            {content.stats.map((stat, i) => (
              <div key={stat.id} className="flex items-end gap-3 rounded-lg border border-border p-3">
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <TextInput
                    label="Value"
                    value={stat.value}
                    onChange={(v) => {
                      const next = [...content.stats]
                      next[i] = { ...stat, value: v }
                      set('stats', next)
                    }}
                  />
                  <TextInput
                    label="Label"
                    value={stat.label}
                    onChange={(v) => {
                      const next = [...content.stats]
                      next[i] = { ...stat, label: v }
                      set('stats', next)
                    }}
                  />
                </div>
                <RemoveButton
                  onClick={() => set('stats', content.stats.filter((s) => s.id !== stat.id))}
                />
              </div>
            ))}
          </div>
          <AddButton
            label="Add number"
            onClick={() =>
              set('stats', [...content.stats, { id: uid(), value: '0', label: 'New metric' } as Stat])
            }
          />
        </Section>

        <Section
          title="Your photo & profile"
          description="Change your portrait, name, title, bio and credentials."
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-2">
              <img
                src={content.consultantPortrait || '/images/consultant-portrait.png'}
                alt="Portrait preview"
                className="size-28 rounded-xl object-cover"
              />
              <input
                ref={portraitRef}
                type="file"
                accept="image/*"
                onChange={handlePortrait}
                className="hidden"
              />
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => portraitRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <Upload className="size-3.5" /> Change photo
                </button>
                <button
                  type="button"
                  onClick={() => set('consultantPortrait', '/images/consultant-portrait.png')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-destructive hover:text-destructive"
                >
                  Reset photo
                </button>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <TextInput
                label="Name"
                value={content.consultantName}
                onChange={(v) => set('consultantName', v)}
              />
              <TextInput
                label="Title"
                value={content.consultantTitle}
                onChange={(v) => set('consultantTitle', v)}
              />
            </div>
          </div>
          <TextArea
            label="Biography"
            value={content.consultantBio}
            onChange={(v) => set('consultantBio', v)}
            rows={5}
          />
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-foreground">Credentials</span>
            {content.credentials.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={c}
                  onChange={(e) => {
                    const next = [...content.credentials]
                    next[i] = e.target.value
                    set('credentials', next)
                  }}
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <RemoveButton
                  onClick={() => set('credentials', content.credentials.filter((_, idx) => idx !== i))}
                />
              </div>
            ))}
            <AddButton
              label="Add credential"
              onClick={() => set('credentials', [...content.credentials, 'New credential'])}
            />
          </div>
        </Section>

        <Section title="Services" description="The services you offer.">
          {content.services.map((sv, i) => (
            <div key={sv.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <div className="flex flex-1 flex-col gap-3">
                <TextInput
                  label="Title"
                  value={sv.title}
                  onChange={(v) => {
                    const next = [...content.services]
                    next[i] = { ...sv, title: v }
                    set('services', next)
                  }}
                />
                <TextArea
                  label="Description"
                  value={sv.description}
                  rows={2}
                  onChange={(v) => {
                    const next = [...content.services]
                    next[i] = { ...sv, description: v }
                    set('services', next)
                  }}
                />
              </div>
              <RemoveButton
                onClick={() => set('services', content.services.filter((s) => s.id !== sv.id))}
              />
            </div>
          ))}
          <AddButton
            label="Add service"
            onClick={() =>
              set('services', [
                ...content.services,
                { id: uid(), title: 'New service', description: 'Description' } as Service,
              ])
            }
          />
        </Section>

        <Section
          title="Certifications & regulatory bodies"
          description="Add, edit or remove certifications. Upload a logo for each (or leave blank for the default icon)."
        >
          {content.certifications.map((cert, i) => (
            <div key={cert.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-16 items-center justify-center overflow-hidden rounded-xl bg-secondary">
                  {cert.logo ? (
                    <img src={cert.logo} alt="" className="size-full object-contain p-1" />
                  ) : (
                    <span className="text-[10px] text-muted-foreground">No logo</span>
                  )}
                </div>
                <input
                  ref={(el) => {
                    logoRefs.current[cert.id] = el
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogo(cert.id, e)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => logoRefs.current[cert.id]?.click()}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <Upload className="size-3" /> {cert.logo ? 'Change' : 'Logo'}
                </button>
                {cert.logo ? (
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        'certifications',
                        content.certifications.map((c) =>
                          c.id === cert.id ? { ...c, logo: '' } : c,
                        ),
                      )
                    }
                    className="text-[11px] font-medium text-muted-foreground hover:text-destructive"
                  >
                    Remove logo
                  </button>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <TextInput
                  label="Name"
                  value={cert.name}
                  onChange={(v) => {
                    const next = [...content.certifications]
                    next[i] = { ...cert, name: v }
                    set('certifications', next)
                  }}
                />
                <TextInput
                  label="Detail"
                  value={cert.detail}
                  onChange={(v) => {
                    const next = [...content.certifications]
                    next[i] = { ...cert, detail: v }
                    set('certifications', next)
                  }}
                />
              </div>
              <RemoveButton
                onClick={() =>
                  set(
                    'certifications',
                    content.certifications.filter((x) => x.id !== cert.id),
                  )
                }
              />
            </div>
          ))}
          <AddButton
            label="Add certification"
            onClick={() =>
              set('certifications', [
                ...content.certifications,
                {
                  id: uid(),
                  name: 'New certification',
                  detail: 'Accreditation detail',
                  logo: '',
                } as Certification,
              ])
            }
          />
        </Section>

        <Section
          title="Map location"
          description="Set the coordinates shown on the map. Tip: right-click a spot in Google Maps to copy its latitude, longitude."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput
              label="Latitude"
              type="number"
              value={String(content.locationLat)}
              onChange={(v) => set('locationLat', parseFloat(v) || 0)}
            />
            <TextInput
              label="Longitude"
              type="number"
              value={String(content.locationLng)}
              onChange={(v) => set('locationLng', parseFloat(v) || 0)}
            />
          </div>
          <TextInput
            label="Location label"
            value={content.locationLabel}
            onChange={(v) => set('locationLabel', v)}
          />
          <TextInput
            label="Address"
            value={content.locationAddress}
            onChange={(v) => set('locationAddress', v)}
          />
        </Section>

        <Section
          title="Contact details"
          description="Shown on the site. The email also receives every contact-form message via FormSubmit (no Resend / no backend)."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput
              label="Email (receives messages)"
              type="email"
              value={content.contactEmail}
              onChange={(v) => set('contactEmail', v)}
            />
            <TextInput
              label="Phone"
              value={content.contactPhone}
              onChange={(v) => set('contactPhone', v)}
            />
            <TextInput
              label="Address"
              value={content.contactAddress}
              onChange={(v) => set('contactAddress', v)}
            />
            <TextInput
              label="Hours"
              value={content.contactHours}
              onChange={(v) => set('contactHours', v)}
            />
          </div>
        </Section>

        <Section title="Admin password" description="Change the password used to access this panel.">
          <TextInput
            label="Password"
            value={content.adminPassword}
            onChange={(v) => set('adminPassword', v)}
          />
        </Section>

        <button
          type="button"
          onClick={() => {
            if (confirm('Reset all content to the original defaults?')) {
              reset()
              flash()
            }
          }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-destructive/40 px-5 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <RotateCcw className="size-4" /> Reset to defaults
        </button>
      </div>
    </div>
  )
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove"
      className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
    >
      <Trash2 className="size-4" />
    </button>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
    >
      <Plus className="size-4" /> {label}
    </button>
  )
}
