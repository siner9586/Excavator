import type { Prisma } from '@prisma/client'
import { MachineCard } from '@/components/machines/MachineCard'
import { MachineFilter } from '@/components/machines/MachineFilter'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

type SearchParams = Record<string, string | string[] | undefined>

function first(params: SearchParams, key: string) {
  const value = params[key]
  return Array.isArray(value) ? value[0] : value
}

function numberParam(params: SearchParams, key: string) {
  const value = first(params, key)
  if (!value) return undefined
  const next = Number(value)
  return Number.isFinite(next) ? next : undefined
}

async function getMachines(params: SearchParams) {
  const where: Prisma.MachineWhereInput = {
    status: { in: ['APPROVED', 'CERTIFIED'] },
  }
  const keyword = first(params, 'keyword')
  if (keyword) {
    where.OR = [
      { title: { contains: keyword, mode: 'insensitive' } },
      { brand: { contains: keyword, mode: 'insensitive' } },
      { model: { contains: keyword, mode: 'insensitive' } },
      { province: { contains: keyword, mode: 'insensitive' } },
      { city: { contains: keyword, mode: 'insensitive' } },
    ]
  }
  const brand = first(params, 'brand')
  const province = first(params, 'province')
  const certified = first(params, 'certified')
  const urgent = first(params, 'urgent')
  if (brand) where.brand = brand
  if (province) where.province = province
  if (certified === 'true') where.isCertified = true
  if (certified === 'false') where.isCertified = false
  if (urgent === 'true') where.isUrgent = true
  where.price = { gte: numberParam(params, 'minPrice'), lte: numberParam(params, 'maxPrice') }
  where.year = { gte: numberParam(params, 'minYear'), lte: numberParam(params, 'maxYear') }

  return prisma.machine.findMany({
    where,
    orderBy: [{ isCertified: 'desc' }, { isUrgent: 'desc' }, { createdAt: 'desc' }],
    take: 80,
  })
}

export default async function MachinesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  let machines: Awaited<ReturnType<typeof getMachines>> = []
  let error = false

  try {
    machines = await getMachines(params)
  } catch (caught) {
    console.error(caught)
    error = true
  }

  return (
    <main className="bg-zinc-50">
      <section className="border-b border-brand-line bg-white">
        <div className="container-page py-8">
          <p className="text-sm font-semibold text-brand-steel">Machine Listings</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">二手挖掘机车源</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            支持按品牌、地区、价格、年份、认证和急售筛选。公开列表默认只展示已通过或认证车源。
          </p>
        </div>
      </section>
      <section className="container-page py-6">
        <MachineFilter searchParams={params} />
        {error ? (
          <div className="mt-6">
            <ErrorState description="请检查数据库连接或稍后重试。" />
          </div>
        ) : machines.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {machines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState title="没有匹配车源" description="可以放宽品牌、地区或价格条件，或提交买家求购让运营匹配。" />
          </div>
        )}
      </section>
    </main>
  )
}
