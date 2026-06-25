import { NextRequest } from 'next/server'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { buyRequestSchema } from '@/lib/validators'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const parsed = buyRequestSchema.safeParse(payload)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '求购参数错误')

    const input = parsed.data
    const buyRequest = await prisma.buyRequest.create({
      data: {
        name: input.name,
        phone: input.phone,
        budgetMin: input.budgetMin,
        budgetMax: input.budgetMax,
        preferredBrands: input.preferredBrands,
        tonnageMin: input.tonnageMin,
        tonnageMax: input.tonnageMax,
        province: input.province,
        city: input.city,
        usage: input.usage,
        expectedYear: input.expectedYear === '' ? undefined : input.expectedYear,
        maxWorkingHours: input.maxWorkingHours === '' ? undefined : input.maxWorkingHours,
        needInspection: input.needInspection,
        needLogistics: input.needLogistics,
        needFinance: input.needFinance,
        note: input.note || undefined,
      },
    })

    return ok(buyRequest, '求购需求已提交')
  } catch (error) {
    console.error(error)
    return fail('提交求购失败', 500)
  }
}
