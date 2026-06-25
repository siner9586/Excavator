import type { ReactNode } from 'react'

export function AdminDataTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-brand-line bg-white shadow-sm">
      <table className="min-w-full divide-y divide-zinc-200 text-sm">{children}</table>
    </div>
  )
}
