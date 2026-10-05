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
      <div className="w-full max-w-[28rem]">
        <SignInForm next={safeNext(next)} />
      </div>
    </main>
  )
}
