import { AlertTriangle } from 'lucide-react'

export function ErrorState({ title = '加载失败', description }: { title?: string; description?: string }) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-5 text-rose-900">
      <div className="flex items-center gap-2 font-semibold">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        {title}
      </div>
      {description ? <p className="mt-2 text-sm text-rose-800">{description}</p> : null}
    </div>
  )
}
