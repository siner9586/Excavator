import { BadgeCheck, Clock, Inbox, ShieldAlert, ShoppingCart, Truck, Users } from 'lucide-react'
import { AdminDataTable } from '@/components/admin/AdminDataTable'
import { AdminShell } from '@/components/admin/AdminShell'
import { AdminStatCard } from '@/components/admin/AdminStatCard'
import { RiskBadge } from '@/components/ui/RiskBadge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { formatDateTime, formatWan } from '@/lib/format'
import { prisma } from '@/lib/prisma'
import { assessMachineRisk } from '@/lib/risk'
import { calculateValuation } from '@/lib/valuation'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const [
    totalMachines,
    pendingMachines,
    approvedMachines,
    certifiedMachines,
    urgentMachines,
    soldMachines,
    inquiryCount,
    buyRequestCount,
    inspectionCount,
    merchantCount,
    recentInquiries,
    recentBuyRequests,
    pendingList,
    riskMachines,
  ] = await Promise.all([
    prisma.machine.count(),
    prisma.machine.count({ where: { status: 'PENDING_REVIEW' } }),
    prisma.machine.count({ where: { status: 'APPROVED' } }),
    prisma.machine.count({ where: { isCertified: true } }),
    prisma.machine.count({ where: { isUrgent: true } }),
    prisma.machine.count({ where: { status: 'SOLD' } }),
    prisma.inquiry.count(),
    prisma.buyRequest.count(),
    prisma.inspectionOrder.count(),
    prisma.merchantApplication.count(),
    prisma.inquiry.findMany({ include: { machine: true }, orderBy: { createdAt: 'desc' }, take: 6 }),
    prisma.buyRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
    prisma.machine.findMany({ where: { status: 'PENDING_REVIEW' }, orderBy: { createdAt: 'desc' }, take: 6 }),
    prisma.machine.findMany({ include: { spec: true }, orderBy: { createdAt: 'desc' }, take: 60 }),
  ])

  const riskSummary = riskMachines
    .map((machine) => {
      const valuation = calculateValuation({
        brand: machine.brand,
        model: machine.model,
        tonnage: machine.tonnage,
        year: machine.year,
        workingHours: machine.workingHours,
        province: machine.province,
        conditionGrade: machine.isCertified ? 'B' : 'C',
        isMainstreamModel: machine.isMainstreamModel,
      })
      return { machine, risk: assessMachineRisk(machine, valuation) }
    })
    .filter((item) => item.risk.riskLevel !== 'LOW')
    .slice(0, 6)

  return (
    <AdminShell title="运营看板">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard title="总车源数" value={totalMachines} icon={ShoppingCart} />
        <AdminStatCard title="待审核车源" value={pendingMachines} icon={Clock} />
        <AdminStatCard title="已通过车源" value={approvedMachines} icon={BadgeCheck} />
        <AdminStatCard title="认证车源" value={certifiedMachines} icon={BadgeCheck} />
        <AdminStatCard title="急售车源" value={urgentMachines} icon={ShieldAlert} />
        <AdminStatCard title="已售车源" value={soldMachines} icon={ShoppingCart} />
        <AdminStatCard title="询价数" value={inquiryCount} icon={Inbox} />
        <AdminStatCard title="求购数" value={buyRequestCount} icon={Users} />
        <AdminStatCard title="验机预约数" value={inspectionCount} icon={Truck} />
        <AdminStatCard title="商家申请数" value={merchantCount} icon={Users} />
        <AdminStatCard title="高风险车源数" value={riskSummary.filter((item) => item.risk.riskLevel === 'HIGH').length} icon={ShieldAlert} />
        <AdminStatCard title="今日新增线索" value="见 API" icon={Inbox} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-950">最近询价</h2>
          <AdminDataTable>
            <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3">客户</th>
                <th className="px-4 py-3">车源</th>
                <th className="px-4 py-3">时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {recentInquiries.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{item.name} / {item.phone}</td>
                  <td className="px-4 py-3">{item.machine.title}</td>
                  <td className="px-4 py-3">{formatDateTime(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </AdminDataTable>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-950">最近求购</h2>
          <AdminDataTable>
            <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3">客户</th>
                <th className="px-4 py-3">预算</th>
                <th className="px-4 py-3">地区</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {recentBuyRequests.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{item.name} / {item.phone}</td>
                  <td className="px-4 py-3">{formatWan(item.budgetMin)} - {formatWan(item.budgetMax)}</td>
                  <td className="px-4 py-3">{item.province}{item.city}</td>
                </tr>
              ))}
            </tbody>
          </AdminDataTable>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-950">待审核车源</h2>
          <AdminDataTable>
            <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3">车源</th>
                <th className="px-4 py-3">价格</th>
                <th className="px-4 py-3">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {pendingList.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{formatWan(item.price)}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </AdminDataTable>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-950">风控摘要</h2>
          <AdminDataTable>
            <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3">车源</th>
                <th className="px-4 py-3">等级</th>
                <th className="px-4 py-3">建议</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {riskSummary.map(({ machine, risk }) => (
                <tr key={machine.id}>
                  <td className="px-4 py-3">{machine.title}</td>
                  <td className="px-4 py-3"><RiskBadge level={risk.riskLevel} /></td>
                  <td className="px-4 py-3">{risk.suggestedAction}</td>
                </tr>
              ))}
            </tbody>
          </AdminDataTable>
        </section>
      </div>
    </AdminShell>
  )
}
