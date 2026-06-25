'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SubmitButton({
  loading,
  children,
  className,
}: {
  loading?: boolean
  children: string
  className?: string
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  )
}
