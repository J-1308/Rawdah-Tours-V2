type IconProps = { className?: string; title?: string }

function svgProps(className?: string, title?: string) {
  return {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': title ? undefined : true,
    role: title ? 'img' : undefined,
  }
}

/** Speech bubble, used for WhatsApp links (the label always says WhatsApp). */
export function ChatIcon({ className = 'size-[1.15em]', title }: IconProps) {
  return (
    <svg {...svgProps(className, title)}>
      {title ? <title>{title}</title> : null}
      <path d="M20 11.6c0 4.2-3.6 7.4-8 7.4-1.1 0-2.2-.2-3.1-.6L4 20l1.4-4.1C4.5 14.7 4 13.2 4 11.6 4 7.4 7.6 4.2 12 4.2s8 3.2 8 7.4Z" />
    </svg>
  )
}

export function MenuIcon({ className = 'size-6' }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  )
}

export function CloseIcon({ className = 'size-6' }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function PlusIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

/** Marks a link that leaves the site. */
export function ExternalIcon({ className = 'size-[0.9em]' }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M14 5h5v5M19 5l-8 8M17 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4" />
    </svg>
  )
}

export function PhoneIcon({ className = 'size-[1.1em]' }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M6.6 3.8 9 3.5l1.6 4-2 1.3a10.6 10.6 0 0 0 6.6 6.6l1.3-2 4 1.6-.3 2.4c-.1.9-.9 1.6-1.8 1.6C10.1 19 5 13.9 5 5.6c0-.9.7-1.7 1.6-1.8Z" />
    </svg>
  )
}

export function MailIcon({ className = 'size-[1.1em]' }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function InstagramIcon({ className = 'size-[1.1em]' }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.9" cy="7.1" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}
