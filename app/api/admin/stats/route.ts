import { startOfDay } from 'date-fns'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { assessMachineRisk } from '@/lib/risk'
import { calculateValuation } from '@/lib/valuation'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const today = startOfDay(new Date())
    const [
      totalMachines,
      pendingMachines,
      approvedMachines,
      certifiedMachines,
      urgentMachines,
      soldMachines,
      inquiries,
      buyRequests,
      inspectionOrders,
      merchantApplications,
      todayInquiries,
      todayBuyRequests,
      todayInspections,
      todayMerchantApplications,
      todayLogistics,
      machinesForRisk,
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
      prisma.inquiry.count({ where: { createdAt: { gte: today } } }),
      prisma.buyRequest.count({ where: { createdAt: { gte: today } } }),
      prisma.inspectionOrder.count({ where: { createdAt: { gte: today } } }),
      prisma.merchantApplication.count({ where: { createdAt: { gte: today } } }),
      prisma.logisticsLead.count({ where: { createdAt: { gte: today } } }),
      prisma.machine.findMany({ include: { spec: true }, take: 200, orderBy: { createdAt: 'desc' } }),
    ])

    const highRiskMachines = machinesForRisk.filter((machine) => {
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
      return assessMachineRisk(machine, valuation).riskLevel === 'HIGH'
    }).length

    return ok({
      totalMachines,
      pendingMachines,
      approvedMachines,
      certifiedMachines,
      urgentMachines,
      soldMachines,
      inquiries,
      buyRequests,
      inspectionOrders,
      merchantApplications,
      highRiskMachines,
      todayNewLeads:
        todayInquiries +
        todayBuyRequests +
        todayInspections +
        todayMerchantApplications +
        todayLogistics,
    })
  } catch (error) {
    console.error(error)
    return fail('获取后台统计失败', 500)
  }
}
