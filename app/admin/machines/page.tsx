import { AdminMachineTable, type AdminMachineRow } from '@/components/admin/AdminMachineTable'
import { AdminShell } from '@/components/admin/AdminShell'
import { prisma } from '@/lib/prisma'
import { assessMachineRisk } from '@/lib/risk'
import { calculateValuation } from '@/lib/valuation'

export const dynamic = 'force-dynamic'

export default async function AdminMachinesPage() {
  const machines = await prisma.machine.findMany({
    include: { spec: true },
    orderBy: { createdAt: 'desc' },
    take: 120,
  })

  const rows: AdminMachineRow[] = machines.map((machine) => {
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
    const risk = assessMachineRisk(machine, valuation)
    return {
      id: machine.id,
      title: machine.title,
      brand: machine.brand,
      model: machine.model,
      price: machine.price,
      province: machine.province,
      city: machine.city,
      status: machine.status,
      isCertified: machine.isCertified,
      isUrgent: machine.isUrgent,
      ownershipStatus: machine.ownershipStatus,
      inspectionStatus: machine.inspectionStatus,
      riskLevel: risk.riskLevel,
      riskScore: risk.riskScore,
    }
  })

  return (
    <AdminShell title="车源审核">
      <AdminMachineTable machines={rows} />
    </AdminShell>
  )
}
