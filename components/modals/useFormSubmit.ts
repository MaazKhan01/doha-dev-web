'use client'

import { useState, type FormEvent } from 'react'

export type FormState = 'idle' | 'submitting' | 'done' | 'error'

/**
 * Submit state for a modal form. `send` receives the form's fields; it should
 * throw on failure. On success the form is cleared.
 */
export function useFormSubmit(send: (data: FormData) => Promise<void>) {
  const [state, setState] = useState<FormState>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setState('submitting')
    try {
      await send(new FormData(form))
      form.reset()
      setState('done')
    } catch (error) {
      console.error('[form] submit failed', error)
      setState('error')
    }
  }

  return { state, onSubmit, reset: () => setState('idle') }
}
