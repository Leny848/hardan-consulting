import { cn } from '@/lib/utils'

type HardanLogoMarkProps = {
  theme?: 'light' | 'dark'
  className?: string
}

/**
 * Vector emblem — globe (Americas) with lime-green leaf curving along the right edge,
 * matching the original Hardan Consulting logo artwork.
 */
export function HardanLogoMark({ theme = 'dark', className }: HardanLogoMarkProps) {
  const textColor = theme === 'light' ? '#ffffff' : '#1a4d32'
  const uid = theme === 'light' ? 'logo-light' : 'logo-dark'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 56"
      fill="none"
      role="img"
      aria-label="Hardan Consulting"
      className={cn('h-full w-auto', className)}
    >
      <defs>
        <clipPath id={`${uid}-globe`}>
          <circle cx="28" cy="28" r="24" />
        </clipPath>
      </defs>

      {/* Globe base */}
      <circle cx="28" cy="28" r="24" fill="#1a4d32" stroke="#7bc63a" strokeWidth="1.5" />

      {/* Americas silhouette */}
      <g clipPath={`url(#${uid}-globe)`} fill="#0d2e1c">
        <path d="M14 10c-1.5 4-2 9-1 14 .8 4.5 3.5 8.5 7 10.5-2.5-6-1.5-12.5 1.5-18.5.8-1.5 1.5-3 2-4.5H14z" />
        <path d="M20 8c.8 3.5.2 7.5-1 11-1.8 5.5-.8 12 2.5 17 2.8-4.5 4.5-9.5 4.5-14.5 0-4.5-1.8-8.5-4-10.5h-2z" />
        <path d="M27 12c1.8 4.5 2.5 9.5 1.5 14.5-1 4.5-3 8.5-5.5 10.5 2-6 1.5-12.5-1-18 .8-2 1.5-4 2.5-5.5 1-.2 1.8-.3 2.5-.5z" />
        <path d="M32 18c1.2 3 1.8 6.5 1.2 10-.8 4-2.8 7.5-5 9.5 1.5-4.5 1.2-9.5-.5-13.5.5-2 1.2-4 2.3-6z" />
      </g>

      {/* Lime-green leaf curving along right side of globe */}
      <path
        d="M40 6 C52 10, 56 22, 52 34 C49 42, 42 48, 36 50 C44 42, 48 30, 46 18 C45 12, 43 8, 40 6 Z"
        fill="#8fd44a"
      />
      <path
        d="M42 12 C48 18, 50 26, 47 34 C45 39, 41 43, 37 45 C42 38, 44 28, 42 20 C41 16, 41 14, 42 12 Z"
        fill="#a8e06a"
        opacity="0.6"
      />
      <path
        d="M44 14 C46 22, 45 30, 41 38"
        stroke="#5a9e2a"
        strokeWidth="1"
        fill="none"
      />

      {/* Wordmark */}
      <text
        x="62"
        y="21"
        fontFamily="var(--font-fraunces), Georgia, 'Times New Roman', serif"
        fontSize="16.5"
        fontWeight="600"
        letterSpacing="0.08em"
        fill={textColor}
      >
        HARDAN
      </text>
      <text
        x="62"
        y="40"
        fontFamily="var(--font-fraunces), Georgia, 'Times New Roman', serif"
        fontSize="12.5"
        fontWeight="600"
        letterSpacing="0.12em"
        fill={textColor}
      >
        CONSULTING
      </text>
    </svg>
  )
}
