import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FormSection } from '@/components/forms/FormSection'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { InspectionOrderForm } from '@/components/forms/InspectionOrderForm'
import { LogisticsLeadForm } from '@/components/forms/LogisticsLeadForm'
import { MachineDetail } from '@/components/machines/MachineDetail'
import { MachineCard } from '@/components/machines/MachineCard'
import { calculateValuation } from '@/lib/valuation'
import { assessMachineRisk } from '@/lib/risk'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function MachineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const machine = await prisma.machine.findUnique({
    where: { id },
    include: {
      photos: { orderBy: { sortOrder: 'asc' } },
      spec: true,
      ownershipDocs: true,
      inspectionReports: { orderBy: { createdAt: 'desc' } },
    },
  })

  if (!machine) notFound()

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
  const recommendations = await prisma.machine.findMany({
    where: {
      id: { not: machine.id },
      brand: machine.brand,
      status: { in: ['APPROVED', 'CERTIFIED'] },
    },
    orderBy: { createdAt: 'desc' },
    take: 4,
  })

  return (
    <main className="bg-zinc-50">
      <section className="container-page py-8">
        <Link href="/machines" className="text-sm font-semibold text-brand-steel">
          返回车源列表
        </Link>
        <div className="mt-5">
          <MachineDetail machine={machine} valuation={valuation} risk={risk} />
        </div>
      </section>
      <section className="container-page grid gap-6 pb-10 lg:grid-cols-3">
        <FormSection title="询价和预约看车" description="线索会写入后台询价列表，运营可继续跟进。">
          <InquiryForm machineId={machine.id} />
        </FormSection>
        <FormSection title="预约第三方验机" description="验机订单会进入后台，后续可分配验机师。">
          <InspectionOrderForm machineId={machine.id} />
        </FormSection>
        <FormSection title="物流金融入口" description="MVP 阶段仅收集需求并对接合作机构，不自行放贷。">
          <LogisticsLeadForm />
        </FormSection>
      </section>
      <section className="container-page pb-12">
        <h2 className="text-2xl font-semibold text-zinc-950">同类推荐</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((item) => (
            <MachineCard key={item.id} machine={item} />
          ))}
        </div>
      </section>
    </main>
  )
}
