import { AdminDataTable } from '@/components/admin/AdminDataTable'
import { AdminShell } from '@/components/admin/AdminShell'
import { formatDateTime, formatTonnage, formatWan } from '@/lib/format'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminBuyRequestsPage() {
  const requests = await prisma.buyRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 120 })

  return (
    <AdminShell title="求购需求">
      <AdminDataTable>
        <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">客户</th>
            <th className="px-4 py-3">预算</th>
            <th className="px-4 py-3">品牌</th>
            <th className="px-4 py-3">吨位</th>
            <th className="px-4 py-3">地区</th>
            <th className="px-4 py-3">需求</th>
            <th className="px-4 py-3">时间</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {requests.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3">{item.name} / {item.phone}</td>
              <td className="px-4 py-3">{formatWan(item.budgetMin)} - {formatWan(item.budgetMax)}</td>
              <td className="px-4 py-3">{item.preferredBrands}</td>
              <td className="px-4 py-3">{formatTonnage(item.tonnageMin)} - {formatTonnage(item.tonnageMax)}</td>
              <td className="px-4 py-3">{item.province}{item.city}</td>
              <td className="px-4 py-3">{item.needInspection ? '验机 ' : ''}{item.needLogistics ? '物流 ' : ''}{item.needFinance ? '金融' : ''}</td>
              <td className="px-4 py-3">{formatDateTime(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </AdminDataTable>
    </AdminShell>
  )
}
