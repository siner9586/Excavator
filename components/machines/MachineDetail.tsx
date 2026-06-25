import type { Machine, MachinePhoto, MachineSpec, OwnershipDoc, InspectionReport } from '@prisma/client'
import Image from 'next/image'
import { RiskBadge } from '@/components/ui/RiskBadge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { InspectionBadge } from '@/components/ui/InspectionBadge'
import { PriceTag } from '@/components/ui/PriceTag'
import { ownershipLabels, sellerTypeLabels, tradeModeLabels } from '@/lib/constants'
import { formatDate, formatHours, formatTonnage, formatWan } from '@/lib/format'
import type { RiskResult } from '@/lib/risk'
import type { ValuationResult } from '@/lib/valuation'

type DetailMachine = Machine & {
  photos: MachinePhoto[]
  spec: MachineSpec | null
  ownershipDocs: OwnershipDoc[]
  inspectionReports: InspectionReport[]
}

export function MachineDetail({
  machine,
  valuation,
  risk,
}: {
  machine: DetailMachine
  valuation: ValuationResult
  risk: RiskResult
}) {
  const images = [machine.mainImage, ...machine.photos.map((photo) => photo.url)].filter(Boolean) as string[]
  const latestReport = machine.inspectionReports[0]

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_380px]">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-lg border border-brand-line bg-white shadow-sm">
          <div className="relative aspect-[16/10] bg-zinc-100">
            {images[0] ? (
              <Image src={images[0]} alt={machine.title} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-500">暂无图片</div>
            )}
          </div>
          {images.length > 1 ? (
            <div className="grid grid-cols-4 gap-2 p-3">
              {images.slice(1, 5).map((image) => (
                <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image src={image} alt={machine.title} fill sizes="25vw" className="object-cover" />
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <section className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-950">基本参数</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['品牌', machine.brand],
              ['型号', machine.model],
              ['吨位', formatTonnage(machine.tonnage)],
              ['年份', `${machine.year} 年`],
              ['小时数', formatHours(machine.workingHours)],
              ['地区', `${machine.province}${machine.city}`],
              ['权属', ownershipLabels[machine.ownershipStatus]],
              ['卖家类型', sellerTypeLabels[machine.sellerType]],
              ['交易模式', tradeModeLabels[machine.tradeMode]],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md bg-zinc-50 p-3">
                <dt className="text-xs text-zinc-500">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-zinc-900">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-950">设备参数</h2>
          {machine.spec ? (
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ['发动机', machine.spec.engine],
                ['液压泵', machine.spec.hydraulicPump],
                ['铲斗容量', machine.spec.bucketCapacity ? `${machine.spec.bucketCapacity} m³` : '-'],
                ['整机重量', machine.spec.operatingWeight ? `${machine.spec.operatingWeight} 吨` : '-'],
                ['产地', machine.spec.origin],
                ['车架号', machine.spec.serialNumber],
                ['发动机号', machine.spec.engineNumber],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-zinc-100 py-3 text-sm">
                  <dt className="text-zinc-500">{label}</dt>
                  <dd className="text-right font-medium text-zinc-900">{value || '-'}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-3 text-sm text-zinc-600">卖家暂未补充设备参数，建议验机前要求补齐铭牌和核心总成信息。</p>
          )}
        </section>

        <section className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-950">验机报告摘要</h2>
          {latestReport ? (
            <div className="mt-4 grid gap-4 md:grid-cols-[120px_1fr]">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-brand-yellow text-4xl font-semibold text-brand-black">
                {latestReport.grade}
              </div>
              <div>
                <p className="text-sm leading-6 text-zinc-700">{latestReport.riskSummary}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-600 sm:grid-cols-5">
                  <span>发动机 {latestReport.engineScore}</span>
                  <span>液压 {latestReport.hydraulicScore}</span>
                  <span>底盘 {latestReport.chassisScore}</span>
                  <span>电气 {latestReport.electricScore}</span>
                  <span>外观 {latestReport.appearanceScore}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-zinc-600">暂无验机报告，建议预约平台验机后再进入定金和交付环节。</p>
          )}
        </section>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <section className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={machine.status} />
            <InspectionBadge status={machine.inspectionStatus} />
            <RiskBadge level={risk.riskLevel} />
          </div>
          <h1 className="mt-4 text-2xl font-semibold leading-tight text-zinc-950">{machine.title}</h1>
          <div className="mt-4">
            <PriceTag value={machine.price} />
            <p className="mt-1 text-sm text-zinc-500">挂牌价，单位万元</p>
          </div>
          <div className="mt-5 rounded-md bg-zinc-50 p-4">
            <div className="text-sm font-semibold text-zinc-950">规则参考价</div>
            <p className="mt-2 text-sm text-zinc-700">
              {formatWan(valuation.valuationMin)} - {formatWan(valuation.valuationMax)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">建议挂牌 {formatWan(valuation.suggestedListingPrice)}，建议成交 {formatWan(valuation.suggestedDealPrice)}</p>
          </div>
          <div className="mt-5 rounded-md bg-rose-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-rose-950">风控分 {risk.riskScore}</span>
              <RiskBadge level={risk.riskLevel} />
            </div>
            <p className="mt-2 text-sm leading-6 text-rose-900">{risk.riskSummary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {risk.riskTags.slice(0, 5).map((tag) => (
                <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-xs text-rose-800 ring-1 ring-rose-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">卖家</dt>
              <dd className="font-medium text-zinc-900">{machine.sellerName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">电话</dt>
              <dd className="font-medium text-zinc-900">{machine.sellerPhone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">更新时间</dt>
              <dd className="font-medium text-zinc-900">{formatDate(machine.updatedAt)}</dd>
            </div>
          </dl>
        </section>
      </aside>
    </div>
  )
}
