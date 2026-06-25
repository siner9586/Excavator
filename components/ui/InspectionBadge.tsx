import { inspectionStatusLabels } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function InspectionBadge({ status, className }: { status: string; className?: string }) {
  const active = status === 'INSPECTED' || status === 'CERTIFIED'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1',
        active
          ? 'bg-blue-50 text-blue-800 ring-blue-200'
          : 'bg-zinc-100 text-zinc-700 ring-zinc-200',
        className,
      )}
    >
      {inspectionStatusLabels[status] ?? status}
    </span>
  )
}
