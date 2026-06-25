import Link from 'next/link'
import Image from 'next/image'
import type { Machine } from '@prisma/client'
import { MapPin } from 'lucide-react'
import { InspectionBadge } from '@/components/ui/InspectionBadge'
import { PriceTag } from '@/components/ui/PriceTag'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ownershipLabels, sellerTypeLabels } from '@/lib/constants'
import { formatHours, formatTonnage } from '@/lib/format'

type MachineCardProps = {
  machine: Machine
}

export function MachineCard({ machine }: MachineCardProps) {
  return (
    <Link href={`/machines/${machine.id}`} className="group overflow-hidden rounded-lg border border-brand-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-subtle">
      <div className="relative aspect-[4/3] bg-zinc-100">
        {machine.mainImage ? (
          <Image
            src={machine.mainImage}
            alt={machine.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">暂无主图</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {machine.isCertified ? <StatusBadge status="CERTIFIED" /> : <StatusBadge status={machine.status} />}
          {machine.isUrgent ? <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-200">急售</span> : null}
          <InspectionBadge status={machine.inspectionStatus} />
        </div>
        <h3 className="mt-3 line-clamp-2 min-h-12 text-base font-semibold leading-6 text-zinc-950">{machine.title}</h3>
        <div className="mt-3 flex items-end justify-between gap-3">
          <PriceTag value={machine.price} />
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {machine.province}{machine.city}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-md bg-zinc-50 p-3 text-xs text-zinc-700">
          <span>{machine.year} 年</span>
          <span>{formatHours(machine.workingHours)}</span>
          <span>{formatTonnage(machine.tonnage)}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600">
          <span>{ownershipLabels[machine.ownershipStatus]}</span>
          <span>{sellerTypeLabels[machine.sellerType]}</span>
        </div>
      </div>
    </Link>
  )
}
