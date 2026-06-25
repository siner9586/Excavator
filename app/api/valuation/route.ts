import { NextRequest } from 'next/server'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { calculateValuation } from '@/lib/valuation'
import { valuationSchema } from '@/lib/validators'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const parsed = valuationSchema.safeParse(payload)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '估价参数错误')

    const result = calculateValuation(parsed.data)
    const record = await prisma.valuationRecord.create({
      data: {
        ...parsed.data,
        valuationMin: result.valuationMin,
        valuationMax: result.valuationMax,
        suggestedListingPrice: result.suggestedListingPrice,
        suggestedDealPrice: result.suggestedDealPrice,
        riskNotes: result.riskNotes.join('；'),
      },
    })

    return ok({ result, recordId: record.id }, '估价已生成')
  } catch (error) {
    console.error(error)
    return fail('生成估价失败', 500)
  }
}
