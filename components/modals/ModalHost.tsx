'use client'

import { useEffect, useState } from 'react'

import { ContactModal } from '@/components/modals/ContactModal'
import { NewsletterModal } from '@/components/modals/NewsletterModal'
import type { ModalId, SiteModals } from '@/types/content'

function modalFromHash(hash: string, modals: SiteModals): ModalId | null {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  return id in modals ? (id as ModalId) : null
}

/**
 * Opens the site's modals from plain links, so triggers stay server-rendered
 * and editors can point any CMS link at one: `#contact` or `#newsletter`, with
 * or without a path in front. Arriving on a URL with that hash opens it too.
 *
 * No element carries these ids, so a deep link never scrolls the page first.
 */
export function ModalHost({ modals }: { modals: SiteModals }) {
  const [active, setActive] = useState<ModalId | null>(null)

  useEffect(() => {
    const fromLocation = () => {
      const id = modalFromHash(window.location.hash, modals)
      if (id) setActive(id)
    }
    fromLocation()

    // Capture phase, ahead of next/link's own handler, which would otherwise
    // push the hash without opening anything.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.('a[href]')
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === '_blank') return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return

      const id = modalFromHash(url.hash, modals)
      if (!id) return

      event.preventDefault()
      event.stopPropagation()
      setActive(id)
    }

    document.addEventListener('click', onClick, true)
    window.addEventListener('hashchange', fromLocation)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('hashchange', fromLocation)
    }
  }, [modals])

  const close = (open: boolean) => {
    if (open) return
    setActive(null)
    // Drop a deep-linked `#contact` so a refresh does not reopen it.
    if (modalFromHash(window.location.hash, modals)) {
      history.replaceState(history.state, '', window.location.pathname + window.location.search)
    }
  }

  return (
    <>
      <NewsletterModal data={modals.newsletter} open={active === 'newsletter'} onOpenChange={close} />
      <ContactModal data={modals.contact} open={active === 'contact'} onOpenChange={close} />
    </>
  )
}
