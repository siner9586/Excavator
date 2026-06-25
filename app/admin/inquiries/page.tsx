import { AdminDataTable } from '@/components/admin/AdminDataTable'
import { AdminShell } from '@/components/admin/AdminShell'
import { formatDateTime } from '@/lib/format'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    include: { machine: true },
    orderBy: { createdAt: 'desc' },
    take: 120,
  })

  return (
    <AdminShell title="询价线索">
      <AdminDataTable>
        <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">客户</th>
            <th className="px-4 py-3">类型</th>
            <th className="px-4 py-3">车源</th>
            <th className="px-4 py-3">留言</th>
            <th className="px-4 py-3">时间</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {inquiries.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3">{item.name} / {item.phone}</td>
              <td className="px-4 py-3">{item.type}</td>
              <td className="px-4 py-3">{item.machine.title}</td>
              <td className="px-4 py-3">{item.message || '-'}</td>
              <td className="px-4 py-3">{formatDateTime(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </AdminDataTable>
    </AdminShell>
  )
}
