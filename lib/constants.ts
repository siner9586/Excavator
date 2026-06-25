export const APP_NAME = '重机严选'
export const APP_EN_NAME = 'Excavator Marketplace'

export const brands = [
  '三一',
  '徐工',
  '中联重科',
  '柳工',
  '小松',
  '卡特彼勒',
  '日立',
  '斗山',
  '现代',
  '沃尔沃',
]

export const provinces = ['安徽', '山东', '河南', '江苏', '湖南', '湖北', '广东', '四川']

export const cityMap: Record<string, string[]> = {
  安徽: ['合肥', '六安'],
  山东: ['济宁', '临沂'],
  河南: ['郑州'],
  江苏: ['徐州'],
  湖南: ['长沙'],
  湖北: ['武汉'],
  广东: ['佛山'],
  四川: ['成都'],
}

export const inspectionLevels = [
  {
    grade: 'A',
    title: '车况优秀',
    description: '无重大维修，核心系统正常，适合高强度连续施工。',
  },
  {
    grade: 'B',
    title: '正常使用',
    description: '正常使用痕迹，少量维修，不影响施工。',
  },
  {
    grade: 'C',
    title: '明显磨损',
    description: '存在明显磨损，需要保养或小修后稳定使用。',
  },
  {
    grade: 'D',
    title: '较大维修',
    description: '存在较大维修记录，适合低价工地使用。',
  },
  {
    grade: 'E',
    title: '重大风险',
    description: '事故机、重大故障机、拆件或维修后使用。',
  },
]

export const inspectionItems = [
  '发动机启动、烟色、漏油和异响',
  '液压泵压力、动作协调和油温',
  '大小臂、铲斗、销轴和结构件裂纹',
  '底盘四轮一带磨损',
  '电路系统、仪表和传感器',
  '回转系统间隙和制动',
  '驾驶室、空调和安全件',
  '出厂铭牌、发动机号和车架号',
  '权属资料、发票和抵押风险',
  '试机动作、复合动作和施工负载',
]

export const p2pTradeSteps = [
  '卖家发布设备',
  '平台初审资料',
  '买家搜索询价',
  '预约验机',
  '出具报告和估价',
  '签署合同',
  '支付定金',
  '物流交付',
  '买家确认',
  '平台放款',
  '争议期结束',
]

export const certifiedTradeSteps = [
  '平台评估',
  '权属审查',
  '整备维修',
  '标准拍摄',
  '上架严选',
  '买家订金',
  '交付',
  '售后跟踪',
]

export const guideArticles = [
  '买二手挖机如何判断小时数造假',
  '如何识别事故机和翻新机',
  '二手挖掘机交易为什么要做权属审核',
  '三一 215 和小松 200 如何选择',
  '20 万预算能买什么挖机',
  '跨省购买二手挖掘机如何运输',
  '为什么建议使用担保交易流程',
  '平台严选车源和个人车源有什么区别',
  '工程公司批量处置设备如何定价',
  '二手挖机液压系统常见风险',
]

export const machineStatusLabels: Record<string, string> = {
  PENDING_REVIEW: '待审核',
  APPROVED: '已通过',
  REJECTED: '已拒绝',
  CERTIFIED: '认证车源',
  SOLD: '已成交',
  HIDDEN: '已隐藏',
}

export const ownershipLabels: Record<string, string> = {
  UNKNOWN: '权属未知',
  PARTIAL: '资料部分',
  VERIFIED: '权属核验',
}

export const inspectionStatusLabels: Record<string, string> = {
  NONE: '未验机',
  BOOKED: '已预约',
  INSPECTED: '已验机',
  CERTIFIED: '认证验机',
}

export const sellerTypeLabels: Record<string, string> = {
  PERSONAL: '个人机主',
  MERCHANT: '设备商',
  PLATFORM: '平台严选',
}

export const tradeModeLabels: Record<string, string> = {
  P2P: 'P2P',
  CONSIGNMENT: '平台寄售',
  PLATFORM_OWNED: '平台自营',
}
