'use client'

import { useState, type FormEvent } from 'react'

export type FormState = 'idle' | 'submitting' | 'done' | 'error'

/**
 * Submit state for a modal form. `send` receives the form's fields; it should
 * throw on failure. On success the form is cleared and `onSuccess` runs — the
 * modals use it to close. On failure the form stays open with its error line.
 */
export function useFormSubmit(send: (data: FormData) => Promise<void>, onSuccess?: () => void) {
  const [state, setState] = useState<FormState>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setState('submitting')
    try {
      await send(new FormData(form))
      form.reset()
      // A form that closes on success starts fresh next time it opens.
      setState(onSuccess ? 'idle' : 'done')
      onSuccess?.()
    } catch (error) {
      console.error('[form] submit failed', error)
      setState('error')
    }
  }

  return { state, onSubmit, reset: () => setState('idle') }
}
