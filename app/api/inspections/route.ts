import { NextRequest } from 'next/server'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { inspectionOrderSchema } from '@/lib/validators'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const parsed = inspectionOrderSchema.safeParse(payload)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '验机预约参数错误')

    const input = parsed.data
    const order = await prisma.inspectionOrder.create({
      data: {
        machineId: input.machineId || undefined,
        requesterName: input.requesterName,
        requesterPhone: input.requesterPhone,
        province: input.province,
        city: input.city,
        address: input.address,
        preferredTime: input.preferredTime ? new Date(input.preferredTime) : undefined,
        note: input.note || undefined,
      },
    })

    return ok(order, '验机预约已提交')
  } catch (error) {
    console.error(error)
    return fail('提交验机预约失败', 500)
  }
}
