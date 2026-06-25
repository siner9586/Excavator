import { AdminDataTable } from '@/components/admin/AdminDataTable'
import { AdminShell } from '@/components/admin/AdminShell'
import { formatDateTime } from '@/lib/format'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminInspectionsPage() {
  const orders = await prisma.inspectionOrder.findMany({
    include: { machine: true },
    orderBy: { createdAt: 'desc' },
    take: 120,
  })

  return (
    <AdminShell title="验机订单">
      <AdminDataTable>
        <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">客户</th>
            <th className="px-4 py-3">车源</th>
            <th className="px-4 py-3">地址</th>
            <th className="px-4 py-3">期望时间</th>
            <th className="px-4 py-3">状态</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {orders.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3">{item.requesterName} / {item.requesterPhone}</td>
              <td className="px-4 py-3">{item.machine?.title || '-'}</td>
              <td className="px-4 py-3">{item.province}{item.city}{item.address}</td>
              <td className="px-4 py-3">{formatDateTime(item.preferredTime)}</td>
              <td className="px-4 py-3">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </AdminDataTable>
    </AdminShell>
  )
}
