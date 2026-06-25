import { NextRequest } from 'next/server'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { merchantApplicationSchema } from '@/lib/validators'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const parsed = merchantApplicationSchema.safeParse(payload)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '商家申请参数错误')

    const application = await prisma.merchantApplication.create({ data: parsed.data })
    return ok(application, '商家入驻申请已提交')
  } catch (error) {
    console.error(error)
    return fail('提交商家入驻申请失败', 500)
  }
}
