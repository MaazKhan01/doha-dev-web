'use client'

import { buttonClass, fieldClass, FormStatus, ModalHeading } from '@/components/modals/FormParts'
import { Modal } from '@/components/modals/Modal'
import { useFormSubmit } from '@/components/modals/useFormSubmit'
import { cn } from '@/lib/utils/cn'
import type { NewsletterModalContent } from '@/types/content'

type NewsletterModalProps = {
  data: NewsletterModalContent
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Newsletter sign-up: email, submit and a required consent box. */
export function NewsletterModal({ data, open, onOpenChange }: NewsletterModalProps) {
  // TODO: POST to /api/newsletter once the email provider is confirmed.
  const { state, onSubmit, reset } = useFormSubmit(
    async () => {},
    () => onOpenChange(false),
  )

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) reset()
      }}
      closeLabel={data.close}
    >
      <ModalHeading eyebrow={data.eyebrow} heading={data.heading} body={data.body} />

      <form onSubmit={onSubmit} className="mt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <label htmlFor="newsletter-email" className="sr-only">
            {data.emailLabel}
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={data.emailPlaceholder}
            // Grows only in the row layout; in the stacked one a 0 basis would collapse it.
            className={cn(fieldClass, 'h-14 min-w-0 sm:flex-1')}
          />
          <button type="submit" disabled={state === 'submitting'} className={cn(buttonClass, 'h-14 sm:w-38')}>
            {state === 'submitting' ? data.submitting : data.submit}
          </button>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-2.5 text-sm leading-snug">
          <span className="relative mt-px grid size-[1.0625rem] shrink-0 place-items-center">
            <input
              type="checkbox"
              name="consent"
              required
              className="peer size-full cursor-pointer appearance-none rounded-[3px] border border-ink bg-white transition-colors duration-200 checked:border-flame checked:bg-flame"
            />
            <svg
              aria-hidden
              viewBox="0 0 12 12"
              className="pointer-events-none absolute size-2.5 text-sand opacity-0 peer-checked:opacity-100"
            >
              <path d="M2 6.5 4.8 9 10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>{data.consent}</span>
        </label>

        <FormStatus className="not-empty:mt-4">
          {state === 'done' ? data.success : state === 'error' ? data.error : null}
        </FormStatus>
      </form>
    </Modal>
  )
}
