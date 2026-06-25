import type { LucideIcon } from 'lucide-react'

export function AdminStatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: number | string
  icon: LucideIcon
}) {
  return (
    <div className="rounded-lg border border-brand-line bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-zinc-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-950">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 text-brand-steel">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
