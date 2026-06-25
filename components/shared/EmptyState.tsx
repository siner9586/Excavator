import { SearchX } from 'lucide-react'

export function EmptyState({ title = '暂无数据', description }: { title?: string; description?: string }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
      <SearchX className="h-9 w-9 text-zinc-400" aria-hidden="true" />
      <h3 className="mt-3 text-base font-semibold text-zinc-900">{title}</h3>
      {description ? <p className="mt-1 max-w-md text-sm text-zinc-600">{description}</p> : null}
    </div>
  )
}
