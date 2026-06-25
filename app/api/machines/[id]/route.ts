import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const machine = await prisma.machine.findUnique({
      where: { id },
      include: {
        photos: { orderBy: { sortOrder: 'asc' } },
        spec: true,
        ownershipDocs: true,
        inspectionReports: { orderBy: { createdAt: 'desc' } },
        inquiries: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    })

    if (!machine) return fail('车源不存在', 404)
    return ok(machine)
  } catch (error) {
    console.error(error)
    return fail('获取车源详情失败', 500)
  }
}
