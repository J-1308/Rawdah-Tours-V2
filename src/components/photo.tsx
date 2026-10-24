import Image from 'next/image'
import type { Photo } from '@/lib/photos'
import { cx } from './ui'

/**
 * Renders a photo slot. Stand-in photos carry a visible "Placeholder photo" tag;
 * missing photos render a labelled frame saying what's needed.
 * The parent sets the size (aspect ratio or height); this fills it.
 */
export function PhotoSlot({
  photo,
  sizes,
  priority = false,
  className,
  tone = 'light',
}: {
  photo: Photo
  sizes: string
  priority?: boolean
  className?: string
  tone?: 'light' | 'dark'
}) {
  if (!photo.src) {
    return (
      <div
        className={cx(
          'relative flex h-full w-full items-end overflow-hidden p-5',
          tone === 'light' ? 'bg-sand-soft text-dust' : 'bg-ajwa-soft text-parchment-dim',
          className,
        )}
        role="img"
        aria-label={`Photo to come: ${photo.needs}`}
      >
        <div
          className={cx('absolute inset-3 rounded-[2px] border border-dashed', tone === 'light' ? 'border-ajwa/20' : 'border-parchment/25')}
          aria-hidden
        />
        <p className="relative text-sm leading-snug">
          <span className="block font-semibold">Photo to come</span>
          {photo.needs}
        </p>
      </div>
    )
  }

  return (
    <div className={cx('relative h-full w-full overflow-hidden', tone === 'light' ? 'bg-sand-soft' : 'bg-ajwa-soft', className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: photo.position ?? '50% 50%' }}
      />
      {photo.status === 'stand-in' ? (
        <span className="absolute left-3 top-3 rounded-sm bg-ajwa/80 px-2 py-1 text-[0.75rem] font-semibold leading-none text-parchment backdrop-blur-sm">
          Placeholder photo
        </span>
      ) : null}
    </div>
  )
}
