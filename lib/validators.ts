import { z } from 'zod'

export const phoneSchema = z
  .string()
  .min(6, '请输入有效手机号')
  .max(30, '手机号过长')
  .regex(/^[0-9+\-\s]+$/, '手机号只能包含数字、空格、+ 或 -')

export const machineCreateSchema = z.object({
  title: z.string().min(2).max(80).optional(),
  brand: z.string().min(1),
  model: z.string().min(1),
  tonnage: z.coerce.number().positive(),
  year: z.coerce.number().int().min(1990).max(new Date().getFullYear() + 1),
  workingHours: z.coerce.number().int().min(0).max(50000),
  price: z.coerce.number().positive(),
  province: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(2),
  description: z.string().min(10).max(2000),
  sellerName: z.string().min(1).max(30),
  sellerPhone: phoneSchema,
  sellerType: z.enum(['PERSONAL', 'MERCHANT', 'PLATFORM']).default('PERSONAL'),
  ownershipStatus: z.enum(['UNKNOWN', 'PARTIAL', 'VERIFIED']).default('UNKNOWN'),
  inspectionStatus: z.enum(['NONE', 'BOOKED', 'INSPECTED', 'CERTIFIED']).default('NONE'),
  tradeMode: z.enum(['P2P', 'CONSIGNMENT', 'PLATFORM_OWNED']).default('P2P'),
  isUrgent: z.coerce.boolean().default(false),
  isCertified: z.coerce.boolean().default(false),
  isMainstreamModel: z.coerce.boolean().default(true),
  mainImage: z.string().url().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
  acceptInspection: z.coerce.boolean().optional(),
  acceptEscrow: z.coerce.boolean().optional(),
})

export const machineFilterSchema = z.object({
  keyword: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minYear: z.coerce.number().int().optional(),
  maxYear: z.coerce.number().int().optional(),
  minHours: z.coerce.number().int().optional(),
  maxHours: z.coerce.number().int().optional(),
  minTonnage: z.coerce.number().optional(),
  maxTonnage: z.coerce.number().optional(),
  certified: z.coerce.boolean().optional(),
  urgent: z.coerce.boolean().optional(),
  status: z.enum(['PENDING_REVIEW', 'APPROVED', 'REJECTED', 'CERTIFIED', 'SOLD', 'HIDDEN']).optional(),
  sellerType: z.enum(['PERSONAL', 'MERCHANT', 'PLATFORM']).optional(),
  tradeMode: z.enum(['P2P', 'CONSIGNMENT', 'PLATFORM_OWNED']).optional(),
  inspectionStatus: z.enum(['NONE', 'BOOKED', 'INSPECTED', 'CERTIFIED']).optional(),
})

export const inquirySchema = z.object({
  machineId: z.string().min(1),
  name: z.string().min(1).max(30),
  phone: phoneSchema,
  message: z.string().max(500).optional().or(z.literal('')),
  type: z.enum(['PRICE_INQUIRY', 'VIEW_APPOINTMENT', 'TRADE_SERVICE']).default('PRICE_INQUIRY'),
})

export const buyRequestSchema = z.object({
  name: z.string().min(1).max(30),
  phone: phoneSchema,
  budgetMin: z.coerce.number().positive(),
  budgetMax: z.coerce.number().positive(),
  preferredBrands: z.string().min(1),
  tonnageMin: z.coerce.number().positive(),
  tonnageMax: z.coerce.number().positive(),
  province: z.string().min(1),
  city: z.string().min(1),
  usage: z.string().min(2).max(500),
  expectedYear: z.coerce.number().int().min(1990).optional().or(z.literal('')),
  maxWorkingHours: z.coerce.number().int().min(0).optional().or(z.literal('')),
  needInspection: z.coerce.boolean().default(true),
  needLogistics: z.coerce.boolean().default(false),
  needFinance: z.coerce.boolean().default(false),
  note: z.string().max(800).optional().or(z.literal('')),
})

export const inspectionOrderSchema = z.object({
  machineId: z.string().optional().or(z.literal('')),
  requesterName: z.string().min(1).max(30),
  requesterPhone: phoneSchema,
  province: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(2),
  preferredTime: z.string().optional().or(z.literal('')),
  note: z.string().max(800).optional().or(z.literal('')),
})

export const valuationSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  tonnage: z.coerce.number().positive(),
  year: z.coerce.number().int().min(1990).max(new Date().getFullYear() + 1),
  workingHours: z.coerce.number().int().min(0).max(50000),
  province: z.string().min(1),
  conditionGrade: z.enum(['A', 'B', 'C', 'D', 'E']),
  isMainstreamModel: z.coerce.boolean().default(true),
})

export const logisticsLeadSchema = z.object({
  name: z.string().min(1).max(30),
  phone: phoneSchema,
  fromProvince: z.string().min(1),
  fromCity: z.string().min(1),
  toProvince: z.string().min(1),
  toCity: z.string().min(1),
  machineInfo: z.string().min(2).max(500),
  needInsurance: z.coerce.boolean().default(false),
  needFinance: z.coerce.boolean().default(false),
  note: z.string().max(800).optional().or(z.literal('')),
})

export const merchantApplicationSchema = z.object({
  companyName: z.string().min(2).max(80),
  contactName: z.string().min(1).max(30),
  phone: phoneSchema,
  businessType: z.string().min(1).max(80),
  province: z.string().min(1),
  city: z.string().min(1),
  description: z.string().min(10).max(1200),
  hasOfflineYard: z.coerce.boolean().default(false),
  canProvideInspection: z.coerce.boolean().default(false),
  canProvideRepair: z.coerce.boolean().default(false),
  canProvideLogistics: z.coerce.boolean().default(false),
  canProvideFinance: z.coerce.boolean().default(false),
})

export const adminMachinePatchSchema = z.object({
  status: z.enum(['PENDING_REVIEW', 'APPROVED', 'REJECTED', 'CERTIFIED', 'SOLD', 'HIDDEN']).optional(),
  isCertified: z.coerce.boolean().optional(),
  isUrgent: z.coerce.boolean().optional(),
  ownershipStatus: z.enum(['UNKNOWN', 'PARTIAL', 'VERIFIED']).optional(),
  inspectionStatus: z.enum(['NONE', 'BOOKED', 'INSPECTED', 'CERTIFIED']).optional(),
})
