'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { useContent } from '@/components/content-provider'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const { content } = useContent()
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    // FormSubmit delivers straight to the admin Contact email — no Resend / no API route.
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(content.contactEmail)}`,
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        },
      )
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const details = [
    { icon: Mail, label: 'Email', value: content.contactEmail },
    { icon: Phone, label: 'Phone', value: content.contactPhone },
    { icon: MapPin, label: 'Address', value: content.contactAddress },
    { icon: Clock, label: 'Hours', value: content.contactHours },
  ]

  return (
    <section id="contact" className="section-pad">
      <div className="premium-container grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            Get in touch
          </span>
          <h2 className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            Let&apos;s talk about your project
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Whether you need an impact assessment, ESMP development, or ongoing advisory — send a
            message and we&apos;ll respond within one business day.
          </p>

          <ul className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-6">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-3 sm:gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11">
                  <d.icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                    {d.label}
                  </p>
                  <p className="mt-0.5 break-words text-sm font-medium text-foreground sm:text-base">
                    {d.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-5 shadow-xl shadow-primary/10 sm:p-7 md:p-9">
          {status === 'sent' ? (
            <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
              <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">
                Message sent
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Thank you for reaching out. We&apos;ll get back to you at the email you provided
                shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-semibold text-primary hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="hidden"
                name="_subject"
                value={`New enquiry from ${content.brandName} website`}
              />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" type="text" placeholder="Jane Doe" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                />
              </div>
              <Field
                label="Subject"
                name="subject"
                type="text"
                placeholder="How can we help?"
                required
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your project…"
                  className="resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-destructive">
                  Something went wrong. Please try again or email{' '}
                  <a href={`mailto:${content.contactEmail}`} className="underline">
                    {content.contactEmail}
                  </a>{' '}
                  directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}
