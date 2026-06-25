import { AdminDataTable } from '@/components/admin/AdminDataTable'
import { AdminShell } from '@/components/admin/AdminShell'
import { formatDateTime } from '@/lib/format'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminMerchantsPage() {
  const merchants = await prisma.merchantApplication.findMany({
    orderBy: { createdAt: 'desc' },
    take: 120,
  })

  return (
    <AdminShell title="商家申请">
      <AdminDataTable>
        <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">公司</th>
            <th className="px-4 py-3">联系人</th>
            <th className="px-4 py-3">业务</th>
            <th className="px-4 py-3">地区</th>
            <th className="px-4 py-3">能力</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-4 py-3">时间</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {merchants.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3">{item.companyName}</td>
              <td className="px-4 py-3">{item.contactName} / {item.phone}</td>
              <td className="px-4 py-3">{item.businessType}</td>
              <td className="px-4 py-3">{item.province}{item.city}</td>
              <td className="px-4 py-3">
                {item.hasOfflineYard ? '场地 ' : ''}{item.canProvideInspection ? '验机 ' : ''}{item.canProvideRepair ? '维修 ' : ''}{item.canProvideLogistics ? '物流 ' : ''}{item.canProvideFinance ? '金融' : ''}
              </td>
              <td className="px-4 py-3">{item.status}</td>
              <td className="px-4 py-3">{formatDateTime(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </AdminDataTable>
    </AdminShell>
  )
}
