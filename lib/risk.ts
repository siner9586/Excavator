import type { ValuationResult } from './valuation'

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export type RiskResult = {
  riskLevel: RiskLevel
  riskScore: number
  riskTags: string[]
  riskSummary: string
  suggestedAction: string
}

export type MachineLike = {
  price: number
  year: number
  workingHours: number
  ownershipStatus?: string | null
  inspectionStatus?: string | null
  tradeMode?: string | null
  sellerType?: string | null
  isUrgent?: boolean | null
  isCertified?: boolean | null
  mainImage?: string | null
  videoUrl?: string | null
  sellerPhone?: string | null
  description?: string | null
  spec?: unknown | null
}

function addRisk(
  tags: string[],
  state: { score: number; high: boolean; medium: boolean },
  tag: string,
  score: number,
  level: RiskLevel,
) {
  tags.push(tag)
  state.score += score
  if (level === 'HIGH') state.high = true
  if (level === 'MEDIUM') state.medium = true
}

export function assessMachineRisk(machine: MachineLike, valuation?: ValuationResult): RiskResult {
  const riskTags: string[] = []
  const state = { score: 0, high: false, medium: false }
  const currentYear = new Date().getFullYear()
  const age = Math.max(0, currentYear - machine.year)

  if (valuation && machine.price < valuation.valuationMin * 0.8) {
    addRisk(riskTags, state, '价格低于估值下限 20% 以上', 28, 'HIGH')
  }

  if (valuation && machine.price > valuation.valuationMax * 1.3) {
    addRisk(riskTags, state, '价格高于估值上限 30% 以上', 14, 'MEDIUM')
  }

  if (age > 8 && machine.workingHours < 3000) {
    addRisk(riskTags, state, '老年份低小时数异常', age > 12 ? 24 : 16, age > 12 ? 'HIGH' : 'MEDIUM')
  }

  if (machine.price > 30 && !['INSPECTED', 'CERTIFIED'].includes(machine.inspectionStatus ?? '')) {
    addRisk(riskTags, state, '高价设备未验机', 26, 'HIGH')
  }

  if (machine.ownershipStatus === 'UNKNOWN') {
    addRisk(riskTags, state, '权属状态未知', 30, 'HIGH')
  }

  if (machine.ownershipStatus === 'PARTIAL') {
    addRisk(riskTags, state, '权属资料不完整', 15, 'MEDIUM')
  }

  if (!machine.mainImage) addRisk(riskTags, state, '无主图', 10, 'MEDIUM')
  if (!machine.sellerPhone) addRisk(riskTags, state, '卖家手机号缺失', 30, 'HIGH')

  if ((machine.description ?? '').trim().length < 20) {
    addRisk(riskTags, state, '设备描述过短', 12, 'MEDIUM')
  }

  if (valuation && machine.isUrgent && machine.price < valuation.valuationMin * 0.85) {
    addRisk(riskTags, state, '急售且价格显著低于估值', 24, 'HIGH')
  }

  if (machine.isCertified && !['INSPECTED', 'CERTIFIED'].includes(machine.inspectionStatus ?? '')) {
    addRisk(riskTags, state, '认证标识与验机状态不一致', 30, 'HIGH')
  }

  if (machine.tradeMode === 'PLATFORM_OWNED' && machine.sellerType !== 'PLATFORM') {
    addRisk(riskTags, state, '自营模式与卖家类型不一致', 14, 'MEDIUM')
  }

  if (machine.workingHours > 12000) {
    addRisk(riskTags, state, '高小时数设备', 10, 'MEDIUM')
  }

  if (!machine.videoUrl) addRisk(riskTags, state, '缺少视频', 3, 'LOW')
  if (!machine.spec) addRisk(riskTags, state, '缺少设备参数', 12, 'MEDIUM')

  const riskScore = Math.min(100, state.score)
  const riskLevel: RiskLevel = state.high || riskScore >= 55 ? 'HIGH' : state.medium || riskScore >= 25 ? 'MEDIUM' : 'LOW'

  const riskSummary =
    riskTags.length > 0
      ? `识别到 ${riskTags.length} 项风险：${riskTags.slice(0, 4).join('、')}${riskTags.length > 4 ? '等' : ''}。`
      : '未识别明显异常，仍建议走权属核验、验机和担保交易流程。'

  const suggestedAction =
    riskLevel === 'HIGH'
      ? '暂停自动通过，要求补充权属资料并完成平台验机后再审核。'
      : riskLevel === 'MEDIUM'
        ? '进入人工复核，重点核查价格、权属、图片视频和设备参数。'
        : '可进入常规审核流程，建议保留询价和验机提醒。'

  return {
    riskLevel,
    riskScore,
    riskTags,
    riskSummary,
    suggestedAction,
  }
}
