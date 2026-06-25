import { AdminDataTable } from '@/components/admin/AdminDataTable'
import { AdminShell } from '@/components/admin/AdminShell'
import { RiskBadge } from '@/components/ui/RiskBadge'
import { prisma } from '@/lib/prisma'
import { assessMachineRisk } from '@/lib/risk'
import { calculateValuation } from '@/lib/valuation'

export const dynamic = 'force-dynamic'

export default async function AdminRiskPage() {
  const machines = await prisma.machine.findMany({
    include: { spec: true },
    orderBy: { createdAt: 'desc' },
    take: 160,
  })

  const rows = machines
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
    .sort((a, b) => b.risk.riskScore - a.risk.riskScore)

  return (
    <AdminShell title="风控中心">
      <AdminDataTable>
        <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">设备标题</th>
            <th className="px-4 py-3">风险等级</th>
            <th className="px-4 py-3">风险分数</th>
            <th className="px-4 py-3">风险标签</th>
            <th className="px-4 py-3">风险摘要</th>
            <th className="px-4 py-3">建议动作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {rows.map(({ machine, risk }) => (
            <tr key={machine.id}>
              <td className="px-4 py-3 font-medium text-zinc-950">{machine.title}</td>
              <td className="px-4 py-3"><RiskBadge level={risk.riskLevel} /></td>
              <td className="px-4 py-3">{risk.riskScore}</td>
              <td className="px-4 py-3">{risk.riskTags.join('、') || '-'}</td>
              <td className="px-4 py-3">{risk.riskSummary}</td>
              <td className="px-4 py-3">{risk.suggestedAction}</td>
            </tr>
          ))}
        </tbody>
      </AdminDataTable>
    </AdminShell>
  )
}
