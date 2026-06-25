import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const counts = {
    users: await prisma.user.count(),
    companies: await prisma.company.count(),
    machines: await prisma.machine.count(),
    certifiedMachines: await prisma.machine.count({ where: { isCertified: true } }),
    urgentMachines: await prisma.machine.count({ where: { isUrgent: true } }),
    inquiries: await prisma.inquiry.count(),
    buyRequests: await prisma.buyRequest.count(),
    inspectionOrders: await prisma.inspectionOrder.count(),
    inspectionReports: await prisma.inspectionReport.count(),
    merchantApplications: await prisma.merchantApplication.count(),
    logisticsLeads: await prisma.logisticsLead.count(),
    tradeOrders: await prisma.tradeOrder.count(),
    auditLogs: await prisma.auditLog.count(),
  }
  console.table(counts)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
