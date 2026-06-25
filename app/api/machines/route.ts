import { NextRequest } from 'next/server'
import type { Prisma } from '@prisma/client'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { machineCreateSchema, machineFilterSchema } from '@/lib/validators'

export const dynamic = 'force-dynamic'

function cleanString(value?: string) {
  return value && value.trim() !== '' ? value.trim() : undefined
}

export async function GET(request: NextRequest) {
  try {
    const query = Object.fromEntries(request.nextUrl.searchParams.entries())
    const parsed = machineFilterSchema.safeParse(query)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '筛选参数错误')

    const input = parsed.data
    const where: Prisma.MachineWhereInput = {}
    const keyword = cleanString(input.keyword)

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { brand: { contains: keyword, mode: 'insensitive' } },
        { model: { contains: keyword, mode: 'insensitive' } },
        { province: { contains: keyword, mode: 'insensitive' } },
        { city: { contains: keyword, mode: 'insensitive' } },
      ]
    }

    if (input.brand) where.brand = input.brand
    if (input.model) where.model = { contains: input.model, mode: 'insensitive' }
    if (input.province) where.province = input.province
    if (input.city) where.city = input.city
    if (input.certified !== undefined) where.isCertified = input.certified
    if (input.urgent !== undefined) where.isUrgent = input.urgent
    if (input.status) where.status = input.status
    if (input.sellerType) where.sellerType = input.sellerType
    if (input.tradeMode) where.tradeMode = input.tradeMode
    if (input.inspectionStatus) where.inspectionStatus = input.inspectionStatus

    where.price = {
      gte: input.minPrice,
      lte: input.maxPrice,
    }
    where.year = {
      gte: input.minYear,
      lte: input.maxYear,
    }
    where.workingHours = {
      gte: input.minHours,
      lte: input.maxHours,
    }
    where.tonnage = {
      gte: input.minTonnage,
      lte: input.maxTonnage,
    }

    if (!input.status) {
      where.status = { in: ['APPROVED', 'CERTIFIED'] }
    }

    const machines = await prisma.machine.findMany({
      where,
      include: {
        photos: { orderBy: { sortOrder: 'asc' }, take: 3 },
        spec: true,
        inspectionReports: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: [{ isCertified: 'desc' }, { isUrgent: 'desc' }, { createdAt: 'desc' }],
      take: 80,
    })

    return ok(machines)
  } catch (error) {
    console.error(error)
    return fail('获取车源失败', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const parsed = machineCreateSchema.safeParse(payload)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '车源参数错误')

    const input = parsed.data
    const title = input.title || `${input.brand} ${input.model} ${input.tonnage} 吨二手挖掘机`
    const machine = await prisma.machine.create({
      data: {
        title,
        brand: input.brand,
        model: input.model,
        tonnage: input.tonnage,
        year: input.year,
        workingHours: input.workingHours,
        price: input.price,
        province: input.province,
        city: input.city,
        address: input.address,
        description: input.description,
        sellerName: input.sellerName,
        sellerPhone: input.sellerPhone,
        sellerType: input.sellerType,
        ownershipStatus: input.ownershipStatus,
        inspectionStatus: input.acceptInspection ? 'BOOKED' : input.inspectionStatus,
        tradeMode: input.acceptEscrow ? 'CONSIGNMENT' : input.tradeMode,
        status: 'PENDING_REVIEW',
        isUrgent: input.isUrgent,
        isCertified: false,
        isMainstreamModel: input.isMainstreamModel,
        mainImage: cleanString(input.mainImage),
        videoUrl: cleanString(input.videoUrl),
      },
    })

    return ok(machine, '车源已提交，等待平台审核')
  } catch (error) {
    console.error(error)
    return fail('创建车源失败', 500)
  }
}
