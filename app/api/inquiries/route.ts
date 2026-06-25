import { NextRequest } from 'next/server'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { inquirySchema } from '@/lib/validators'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const parsed = inquirySchema.safeParse(payload)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '询价参数错误')

    const inquiry = await prisma.inquiry.create({
      data: {
        machineId: parsed.data.machineId,
        name: parsed.data.name,
        phone: parsed.data.phone,
        message: parsed.data.message || undefined,
        type: parsed.data.type,
      },
    })

    return ok(inquiry, '询价已提交')
  } catch (error) {
    console.error(error)
    return fail('提交询价失败', 500)
  }
}
