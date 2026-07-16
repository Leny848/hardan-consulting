'use client'

import { cn } from '@/lib/utils'

type BrandLogoProps = {
  src?: string
  alt?: string
  className?: string
  imgClassName?: string
  /** White wordmark on dark hero / header over hero */
  onDark?: boolean
  /** compact = emblem only (favicon-style mark in header on very small screens optional) */
  variant?: 'full' | 'emblem'
}

const EMBLEM = '/images/hardan-emblem.png'

/**
 * HD logo: transparent globe+leaf emblem + crisp Fraunces wordmark.
 * Adapts to light and dark backgrounds without a black box.
 */
export function BrandLogo({
  src,
  alt,
  className,
  imgClassName,
  onDark = false,
  variant = 'full',
}: BrandLogoProps) {
  const useCustomUpload = src && src.startsWith('data:image/')

  if (useCustomUpload) {
    return (
      <span className={cn('inline-flex shrink-0 items-center', className)}>
        <img
          src={src}
          alt={alt || 'Hardan Consulting'}
          className={cn('h-10 w-auto max-w-[220px] object-contain', imgClassName)}
        />
      </span>
    )
  }

  const textMain = onDark ? 'text-white' : 'text-primary'
  const textSub = onDark ? 'text-white/90' : 'text-primary/85'

  return (
    <span className={cn('inline-flex shrink-0 items-center gap-2.5 sm:gap-3', className)}>
      <img
        src={EMBLEM}
        alt=""
        aria-hidden="true"
        className={cn(
          'h-9 w-auto shrink-0 object-contain sm:h-10',
          variant === 'emblem' && 'h-8 sm:h-9',
          imgClassName?.includes('h-') ? '' : '',
        )}
        style={imgClassName?.includes('h-') ? undefined : undefined}
      />
      {variant === 'full' && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-serif text-[15px] font-semibold tracking-[0.14em] sm:text-[17px]',
              textMain,
            )}
          >
            HARDAN
          </span>
          <span
            className={cn(
              'mt-0.5 font-serif text-[10px] font-semibold tracking-[0.22em] sm:text-[11px]',
              textSub,
            )}
          >
            CONSULTING
          </span>
        </span>
      )}
      <span className="sr-only">{alt || 'Hardan Consulting'}</span>
    </span>
  )
}
