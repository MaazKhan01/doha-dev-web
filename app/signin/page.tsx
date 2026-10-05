import Image from 'next/image'

import { SignInForm } from '@/components/auth/SignInForm'
import { safeNext } from '@/lib/auth/session'

/** The temporary preview gate. `proxy.ts` sends every signed-out page request here. */
export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams

  return (
    <main className="container-page grid min-h-dvh place-items-center py-12">
      <div className="flex w-full max-w-[28rem] flex-col items-center gap-10">
        <Image
          src="/logo.svg"
          alt="Qatar Olympic Committee — Doha, aspiring to welcome the Olympic and Paralympic Games"
          width={341}
          height={102}
          priority
          className="h-auto w-[clamp(12rem,60vw,18rem)]"
        />
        <SignInForm next={safeNext(next)} />
      </div>
    </main>
  )
}
