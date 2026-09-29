'use client'

import { buttonClass, Field, fieldClass, FormStatus, ModalHeading } from '@/components/modals/FormParts'
import { Modal } from '@/components/modals/Modal'
import { useFormSubmit } from '@/components/modals/useFormSubmit'
import { cn } from '@/lib/utils/cn'
import type { ContactModalContent } from '@/types/content'

type ContactModalProps = {
  data: ContactModalContent
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Enquiry form: name and email side by side, then subject and message. */
export function ContactModal({ data, open, onOpenChange }: ContactModalProps) {
  // TODO: POST to /api/contact once the enquiry inbox / CRM is confirmed.
  const { state, onSubmit, reset } = useFormSubmit(async () => {})
  const { fields } = data

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

      <form onSubmit={onSubmit} className="mt-5 grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field id="contact-name" label={fields.name.label}>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder={fields.name.placeholder}
            className={cn(fieldClass, 'h-13')}
          />
        </Field>

        <Field id="contact-email" label={fields.email.label}>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={fields.email.placeholder}
            className={cn(fieldClass, 'h-13')}
          />
        </Field>

        <Field id="contact-subject" label={fields.subject.label} className="sm:col-span-2">
          <input
            id="contact-subject"
            name="subject"
            required
            placeholder={fields.subject.placeholder}
            className={cn(fieldClass, 'h-13')}
          />
        </Field>

        <Field id="contact-message" label={fields.message.label} className="sm:col-span-2">
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder={fields.message.placeholder}
            className={cn(fieldClass, 'h-28 resize-none py-3.5')}
          />
        </Field>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:col-span-2">
          <button type="submit" disabled={state === 'submitting'} className={cn(buttonClass, 'h-13 w-45')}>
            {state === 'submitting' ? data.submitting : data.submit}
          </button>
          {state === 'idle' || state === 'submitting' ? (
            <p className="text-sm text-stone">{data.note}</p>
          ) : (
            <FormStatus>{state === 'done' ? data.success : data.error}</FormStatus>
          )}
        </div>
      </form>
    </Modal>
  )
}
