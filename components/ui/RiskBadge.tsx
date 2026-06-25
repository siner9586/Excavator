import type { RiskLevel } from '@/lib/risk'
import { cn } from '@/lib/utils'

const labelMap: Record<RiskLevel, string> = {
  LOW: '低风险',
  MEDIUM: '中风险',
  HIGH: '高风险',
}

const toneMap: Record<RiskLevel, string> = {
  LOW: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  MEDIUM: 'bg-amber-50 text-amber-800 ring-amber-200',
  HIGH: 'bg-rose-50 text-rose-800 ring-rose-200',
}

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1', toneMap[level], className)}
    >
      {labelMap[level]}
    </span>
  )
}
