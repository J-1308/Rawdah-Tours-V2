import Link from 'next/link'

import { gutter, Logo } from '@/app/_site/shell'
import { NoticePage } from '@/components/notice-page'
import { ButtonLink, WhatsAppButton } from '@/components/ui'

export default function NotFound() {
  return (
    <>
      <div className={`bg-ink py-4 ${gutter}`}>
        <Link href="/" aria-label="Rawdah Tours, home" className="inline-block">
          <Logo className="h-11 w-auto" />
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
