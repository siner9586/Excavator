import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function GuideCard({ title, index }: { title: string; index: number }) {
  return (
    <article className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold text-brand-steel">交易避坑 #{String(index + 1).padStart(2, '0')}</div>
      <h2 className="mt-3 text-base font-semibold leading-6 text-zinc-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        从车况、权属、价格和交付四个角度拆解常见风险，帮助买卖双方把交易节点留痕。
      </p>
      <Link href="/inspection" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-zinc-950">
        查看验机标准 <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  )
}
