import { MachineCard } from '@/components/machines/MachineCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function CertifiedPage() {
  const machines = await prisma.machine.findMany({
    where: {
      isCertified: true,
      inspectionStatus: { in: ['INSPECTED', 'CERTIFIED'] },
      ownershipStatus: 'VERIFIED',
      status: { in: ['APPROVED', 'CERTIFIED'] },
    },
    orderBy: [{ updatedAt: 'desc' }],
    take: 80,
  })

  return (
    <main className="bg-zinc-50">
      <section className="border-b border-brand-line bg-white">
        <div className="container-page py-8">
          <p className="text-sm font-semibold text-brand-steel">Certified Machines</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">平台认证车源</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            认证车源需同时满足已认证、已验机或认证验机、权属核验、审核通过或认证状态。
          </p>
        </div>
      </section>
      <section className="container-page py-8">
        {machines.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {machines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        ) : (
          <EmptyState title="暂无认证车源" />
        )}
      </section>
    </main>
  )
}
