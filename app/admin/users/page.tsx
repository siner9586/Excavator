import { AdminDataTable } from '@/components/admin/AdminDataTable'
import { AdminShell } from '@/components/admin/AdminShell'
import { formatDateTime } from '@/lib/format'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 120 })

  return (
    <AdminShell title="用户">
      <AdminDataTable>
        <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">姓名</th>
            <th className="px-4 py-3">手机号</th>
            <th className="px-4 py-3">邮箱</th>
            <th className="px-4 py-3">角色</th>
            <th className="px-4 py-3">认证</th>
            <th className="px-4 py-3">创建时间</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.phone}</td>
              <td className="px-4 py-3">{user.email || '-'}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">{user.verified ? '已认证' : '未认证'}</td>
              <td className="px-4 py-3">{formatDateTime(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </AdminDataTable>
    </AdminShell>
  )
}
