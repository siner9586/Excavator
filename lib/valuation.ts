export type ValuationInput = {
  brand: string
  model: string
  tonnage: number
  year: number
  workingHours: number
  province: string
  conditionGrade: 'A' | 'B' | 'C' | 'D' | 'E'
  isMainstreamModel?: boolean
}

export type ValuationResult = {
  valuationMin: number
  valuationMax: number
  suggestedListingPrice: number
  suggestedDealPrice: number
  factors: string[]
  riskNotes: string[]
}

const brandFactors: Record<string, number> = {
  卡特彼勒: 1.12,
  卡特: 1.12,
  小松: 1.08,
  日立: 1.05,
  沃尔沃: 1.03,
  三一: 1.0,
  徐工: 0.96,
  中联重科: 0.94,
  柳工: 0.92,
  斗山: 0.9,
  现代: 0.88,
}

const conditionFactors: Record<ValuationInput['conditionGrade'], number> = {
  A: 1.1,
  B: 1.0,
  C: 0.86,
  D: 0.68,
  E: 0.45,
}

const provinceFactors: Record<string, number> = {
  山东: 1.05,
  江苏: 1.04,
  河南: 1.03,
  安徽: 1.02,
  湖南: 1.02,
  湖北: 1.01,
  广东: 1.0,
  四川: 0.98,
}

function basePriceByTonnage(tonnage: number) {
  if (tonnage < 6) return 8
  if (tonnage < 10) return 12
  if (tonnage < 18) return 18
  if (tonnage <= 25) return 28
  if (tonnage <= 35) return 42
  return 60
}

function hourFactor(hours: number) {
  if (hours < 3000) return 1.05
  if (hours <= 6000) return 1
  if (hours <= 9000) return 0.88
  if (hours <= 12000) return 0.75
  return 0.62
}

function roundWan(value: number) {
  return Math.max(0.1, Math.round(value * 10) / 10)
}

export function calculateValuation(input: ValuationInput): ValuationResult {
  const basePrice = basePriceByTonnage(input.tonnage)
  const brandFactor = brandFactors[input.brand] ?? 0.85
  const currentYear = new Date().getFullYear()
  const age = Math.max(0, currentYear - input.year)
  const depreciationFactor = Math.max(0.28, 1 - age * 0.08)
  const hoursFactor = hourFactor(input.workingHours)
  const conditionFactor = conditionFactors[input.conditionGrade]
  const regionFactor = provinceFactors[input.province] ?? 1
  const mainstreamFactor = input.isMainstreamModel === false ? 0.94 : 1.05

  const benchmark =
    basePrice *
    brandFactor *
    depreciationFactor *
    hoursFactor *
    conditionFactor *
    regionFactor *
    mainstreamFactor

  const valuationMin = roundWan(benchmark * 0.9)
  const valuationMax = roundWan(benchmark * 1.1)
  const suggestedListingPrice = roundWan(benchmark * 1.06)
  const suggestedDealPrice = roundWan(benchmark * 0.97)

  const factors = [
    `${input.tonnage} 吨级基础价约 ${basePrice} 万`,
    `${input.brand} 品牌系数 ${brandFactor.toFixed(2)}`,
    `${input.year} 年设备，折旧系数 ${depreciationFactor.toFixed(2)}`,
    `${input.workingHours} 小时，小时数系数 ${hoursFactor.toFixed(2)}`,
    `${input.conditionGrade} 级车况系数 ${conditionFactor.toFixed(2)}`,
    `${input.province} 区域流通系数 ${regionFactor.toFixed(2)}`,
    input.isMainstreamModel === false ? '非主流机型流通折价' : '主流机型流通加成',
  ]

  const riskNotes: string[] = []
  if (input.workingHours > 12000) riskNotes.push('小时数超过 12000，需重点关注发动机和液压系统寿命')
  if (age > 8) riskNotes.push('年份超过 8 年，建议核验维修记录和关键总成状态')
  if (input.conditionGrade === 'D' || input.conditionGrade === 'E') {
    riskNotes.push('车况等级偏低，适合低预算工地场景，成交前必须验机')
  }
  if (input.isMainstreamModel === false) riskNotes.push('非主流机型后续转售和配件效率可能偏弱')
  if (riskNotes.length === 0) riskNotes.push('规则估价未识别重大价格风险，仍建议结合现场验机报告确认')

  return {
    valuationMin,
    valuationMax,
    suggestedListingPrice,
    suggestedDealPrice,
    factors,
    riskNotes,
  }
}
