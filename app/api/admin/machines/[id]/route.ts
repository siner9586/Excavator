import { NextRequest } from 'next/server'
import { fail, ok } from '@/lib/api-response'
import { getMockUser } from '@/lib/mock-auth'
import { prisma } from '@/lib/prisma'
import { adminMachinePatchSchema } from '@/lib/validators'

export const dynamic = 'force-dynamic'

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const payload = await request.json()
    const parsed = adminMachinePatchSchema.safeParse(payload)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '审核参数错误')

    const user = getMockUser()
    const machine = await prisma.machine.update({
      where: { id },
      data: parsed.data,
    })

    await prisma.auditLog.create({
      data: {
        actor: user.name,
        action: 'UPDATE_MACHINE_REVIEW',
        targetType: 'Machine',
        targetId: id,
        detail: JSON.stringify(parsed.data),
      },
    })

    return ok(machine, '车源审核状态已更新')
  } catch (error) {
    console.error(error)
    return fail('更新车源失败', 500)
  }
}
