'use client'

import type { ValuationResult } from '@/lib/valuation'
import { formatWan } from '@/lib/format'

export function ValuationResultCard({ result }: { result: ValuationResult | null }) {
  if (!result) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600">
        填写设备信息后生成估值区间、建议挂牌价、建议成交价和风险提示。
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-brand-line bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ['估值下限', formatWan(result.valuationMin)],
          ['估值上限', formatWan(result.valuationMax)],
          ['建议挂牌价', formatWan(result.suggestedListingPrice)],
          ['建议成交价', formatWan(result.suggestedDealPrice)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">{label}</div>
            <div className="mt-1 text-xl font-semibold text-zinc-950">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-zinc-950">主要影响因素</h3>
        <ul className="mt-2 grid gap-2 text-sm text-zinc-700">
          {result.factors.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-zinc-950">风险提示</h3>
        <ul className="mt-2 grid gap-2 text-sm text-zinc-700">
          {result.riskNotes.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
