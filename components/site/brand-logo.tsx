'use client'

import { cn } from '@/lib/utils'

type BrandLogoProps = {
  src?: string
  alt?: string
  className?: string
  imgClassName?: string
  onDark?: boolean
  variant?: 'full' | 'emblem'
}

const EMBLEM = '/images/hardan-emblem.png'

function isCustomImage(src?: string) {
  if (!src) return false
  if (src.startsWith('data:image/')) return true
  if (src.startsWith('http://') || src.startsWith('https://')) return true
  if (src.startsWith('/images/') && !src.includes('hardan-emblem') && !src.includes('hardan-logo')) {
    return true
  }
  return false
}

/**
 * Default: transparent globe+leaf emblem + Fraunces wordmark.
 * Custom uploads (blob URLs / data URLs) render as the full uploaded image.
 */
export function BrandLogo({
  src,
  alt,
  className,
  imgClassName,
  onDark = false,
  variant = 'full',
}: BrandLogoProps) {
  if (isCustomImage(src)) {
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
  const emblemSrc = src?.includes('hardan-emblem') || src?.includes('hardan-logo') ? src : EMBLEM

  return (
    <span className={cn('inline-flex shrink-0 items-center gap-2.5 sm:gap-3', className)}>
      <img
        src={emblemSrc || EMBLEM}
        alt=""
        aria-hidden="true"
        className={cn(
          'h-9 w-auto shrink-0 object-contain sm:h-10',
          variant === 'emblem' && 'h-8 sm:h-9',
          imgClassName,
        )}
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
