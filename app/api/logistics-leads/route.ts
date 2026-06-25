import { NextRequest } from 'next/server'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logisticsLeadSchema } from '@/lib/validators'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const parsed = logisticsLeadSchema.safeParse(payload)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '物流金融线索参数错误')

    const lead = await prisma.logisticsLead.create({ data: parsed.data })
    return ok(lead, '物流金融需求已提交')
  } catch (error) {
    console.error(error)
    return fail('提交物流金融需求失败', 500)
  }
}
