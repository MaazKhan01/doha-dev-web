import type { ReactNode } from 'react'

import { Modal } from '@/components/modals/Modal'
import { cn } from '@/lib/utils/cn'

export { buttonClass, fieldClass } from '@/components/ui/formStyles'

/** Orange eyebrow, display heading and intro copy that open both modals. */
export function ModalHeading({
  eyebrow,
  heading,
  body,
}: {
  eyebrow: string
  heading: string[]
  body: string
}) {
  return (
    <>
      <p className="text-[0.9375rem] font-bold text-flame uppercase">{eyebrow}</p>
      <Modal.Title className="type-display mt-1.5 pe-10 text-[clamp(2rem,5vw,2.875rem)]">
        {heading.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </Modal.Title>
      <p className="mt-5 text-base leading-normal sm:text-lg">{body}</p>
    </>
  )
}

/** 13px bold label over its control. */
export function Field({
  id,
  label,
  children,
  className,
}: {
  id: string
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-[0.8125rem] font-bold uppercase">
        {label}
      </label>
      {children}
    </div>
  )
}

/**
 * Polite live region for a form's outcome. Always in the DOM so screen readers
 * announce the change, but takes no space until there is something to say.
 */
export function FormStatus({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p aria-live="polite" className={cn('text-sm text-muted', className)}>
      {children}
    </p>
  )
}
