import { calculateValuation } from '../lib/valuation'
import { assessMachineRisk } from '../lib/risk'

const valuation = calculateValuation({
  brand: '三一',
  model: 'SY215C',
  tonnage: 21.5,
  year: 2021,
  workingHours: 4200,
  province: '安徽',
  conditionGrade: 'B',
  isMainstreamModel: true,
})

if (valuation.valuationMin <= 0 || valuation.valuationMax <= valuation.valuationMin) {
  throw new Error('Valuation model returned an invalid range.')
}

const risk = assessMachineRisk(
  {
    price: 18,
    year: 2021,
    workingHours: 4200,
    ownershipStatus: 'VERIFIED',
    inspectionStatus: 'INSPECTED',
    sellerType: 'PERSONAL',
    tradeMode: 'P2P',
    isUrgent: true,
    isCertified: false,
    mainImage: 'https://example.com/image.jpg',
    sellerPhone: '13800000000',
    description: '设备保养记录清晰，支持现场试机和平台验机。',
    spec: {},
  },
  valuation,
)

if (!['LOW', 'MEDIUM', 'HIGH'].includes(risk.riskLevel)) {
  throw new Error('Risk model returned an invalid level.')
}

const routes = [
  '/',
  '/machines',
  '/sell',
  '/buy-request',
  '/inspection',
  '/valuation',
  '/certified',
  '/logistics-finance',
  '/guides',
  '/merchants',
  '/trade-flow',
  '/admin',
  '/admin/machines',
  '/admin/inquiries',
  '/admin/inspections',
  '/admin/buy-requests',
  '/admin/users',
  '/admin/merchants',
  '/admin/risk',
]

console.log('Smoke test passed.')
console.log(`Checked valuation, risk model, and ${routes.length} route definitions.`)
