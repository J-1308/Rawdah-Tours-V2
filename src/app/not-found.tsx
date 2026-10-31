import Link from 'next/link'

import { gutter, Logo } from '@/app/_site/shell'
import { NoticePage } from '@/components/notice-page'
import { ButtonLink, WhatsAppButton } from '@/components/ui'

export default function NotFound() {
  return (
    <>
      <div className={`flex justify-center bg-canvas py-5 ${gutter}`}>
        <Link href="/" aria-label="Rawdah Tours, home" className="inline-block text-ink">
          <Logo className="logo-gold h-12" />
        </Link>
      </div>
      <NoticePage title="This page isn’t here">
        <p>The link may be old, or the page may have moved. Try the homepage, or message us if you were looking for something specific.</p>
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <WhatsAppButton variant="outline" />
        </div>
      </NoticePage>
    </>
  )
}
