import 'dotenv/config'
import { PrismaClient, type Machine } from '@prisma/client'
import { calculateValuation } from '../lib/valuation'

const prisma = new PrismaClient()

const brands = ['三一', '徐工', '中联重科', '柳工', '小松', '卡特彼勒', '日立', '斗山', '现代', '沃尔沃']
const regions = [
  ['安徽', '合肥'],
  ['安徽', '六安'],
  ['山东', '济宁'],
  ['山东', '临沂'],
  ['河南', '郑州'],
  ['江苏', '徐州'],
  ['湖南', '长沙'],
  ['湖北', '武汉'],
  ['广东', '佛山'],
  ['四川', '成都'],
]

const imageUrls = [
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581093458791-9d09c85a94f5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1566936737687-8f392a237b8b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1200&q=80',
]

type MachineSeedInput = [string, string, number, number, number, string, string, number]

const requiredMachines: MachineSeedInput[] = [
  ['三一', 'SY215C', 21.5, 2021, 4200, '安徽', '合肥', 26.8],
  ['小松', 'PC200-8', 20, 2018, 7800, '山东', '济宁', 21.5],
  ['卡特彼勒', '320D', 20, 2017, 8500, '河南', '郑州', 24.8],
  ['徐工', 'XE215DA', 21.5, 2022, 3100, '江苏', '徐州', 29.6],
  ['日立', 'ZX200-5A', 20, 2019, 6500, '湖南', '长沙', 23.6],
  ['沃尔沃', 'EC210B', 21, 2018, 7200, '湖北', '武汉', 22.8],
  ['斗山', 'DX225LC', 22.5, 2020, 5100, '山东', '临沂', 20.8],
  ['柳工', 'CLG920E', 20, 2021, 3900, '安徽', '六安', 19.8],
]

function machineModel(brand: string, index: number) {
  const models: Record<string, string[]> = {
    三一: ['SY75C', 'SY135C', 'SY215C', 'SY305H'],
    徐工: ['XE75DA', 'XE135D', 'XE215DA', 'XE335DK'],
    中联重科: ['ZE75E', 'ZE135E', 'ZE215E', 'ZE335E'],
    柳工: ['CLG906E', 'CLG915E', 'CLG920E', 'CLG936E'],
    小松: ['PC60-8', 'PC130-8', 'PC200-8', 'PC360-8'],
    卡特彼勒: ['307E', '313D2', '320D', '336D2'],
    日立: ['ZX70-5A', 'ZX130-5A', 'ZX200-5A', 'ZX350H'],
    斗山: ['DX60-9C', 'DX150LC', 'DX225LC', 'DX380LC'],
    现代: ['R60VS', 'R150VS', 'R215VS', 'R335LC'],
    沃尔沃: ['EC60D', 'EC140B', 'EC210B', 'EC360B'],
  }
  return models[brand][index % 4]
}

async function main() {
  await prisma.$transaction([
    prisma.auditLog.deleteMany(),
    prisma.tradeOrder.deleteMany(),
    prisma.inspectionReport.deleteMany(),
    prisma.inspectionOrder.deleteMany(),
    prisma.valuationRecord.deleteMany(),
    prisma.inquiry.deleteMany(),
    prisma.buyRequest.deleteMany(),
    prisma.logisticsLead.deleteMany(),
    prisma.merchantApplication.deleteMany(),
    prisma.ownershipDoc.deleteMany(),
    prisma.machineSpec.deleteMany(),
    prisma.machinePhoto.deleteMany(),
    prisma.machine.deleteMany(),
    prisma.company.deleteMany(),
    prisma.user.deleteMany(),
  ])

  await prisma.user.createMany({
    data: [
      { name: '王强', phone: '13800000001', email: 'buyer1@example.com', role: 'BUYER', verified: true },
      { name: '李伟', phone: '13800000002', email: 'seller1@example.com', role: 'SELLER', verified: true },
      { name: '张敏', phone: '13800000003', email: 'merchant1@example.com', role: 'MERCHANT', verified: true },
      { name: '赵磊', phone: '13800000004', email: 'inspector1@example.com', role: 'INSPECTOR', verified: true },
      { name: '陈浩', phone: '13800000005', email: 'admin@example.com', role: 'ADMIN', verified: true },
      { name: '刘洋', phone: '13800000006', email: 'operator@example.com', role: 'OPERATOR', verified: true },
      { name: '周鹏', phone: '13800000007', email: 'buyer2@example.com', role: 'BUYER', verified: false },
      { name: '孙杰', phone: '13800000008', email: 'seller2@example.com', role: 'SELLER', verified: false },
    ],
  })

  await prisma.company.createMany({
    data: [
      { name: '合肥重机设备有限公司', type: 'DEALER', contactName: '张敏', phone: '13900000001', province: '安徽', city: '合肥', verified: true },
      { name: '济宁工程机械市场', type: 'DEALER', contactName: '刘总', phone: '13900000002', province: '山东', city: '济宁', verified: true },
      { name: '徐州租赁设备集团', type: 'RENTAL_COMPANY', contactName: '赵总', phone: '13900000003', province: '江苏', city: '徐州', verified: true },
      { name: '长沙维保服务中心', type: 'REPAIR', contactName: '彭工', phone: '13900000004', province: '湖南', city: '长沙', verified: false },
      { name: '武汉工程物流', type: 'LOGISTICS', contactName: '孙经理', phone: '13900000005', province: '湖北', city: '武汉', verified: true },
      { name: '广东设备金融服务', type: 'FINANCE', contactName: '黄经理', phone: '13900000006', province: '广东', city: '佛山', verified: false },
    ],
  })

  const machineInputs = [...requiredMachines]
  for (let index = requiredMachines.length; index < 40; index += 1) {
    const brand = brands[index % brands.length]
    const [province, city] = regions[index % regions.length]
    const tonnage = [5.8, 7.5, 13.5, 20, 21.5, 22.5, 30.5, 36][index % 8]
    const year = 2016 + (index % 8)
    const workingHours = 2600 + index * 310
    const price = Number((tonnage * 1.05 + (year - 2016) * 1.2 - (workingHours / 10000) * 5).toFixed(1))
    machineInputs.push([brand, machineModel(brand, index), tonnage, year, workingHours, province, city, Math.max(8.8, price)])
  }

  const machines: Machine[] = []
  for (const [index, input] of machineInputs.entries()) {
    const [brand, model, tonnage, year, workingHours, province, city, price] = input
    const certified = index < 8
    const urgent = index >= 4 && index < 12
    const status = certified ? (index % 2 === 0 ? 'CERTIFIED' : 'APPROVED') : index < 34 ? 'APPROVED' : index < 38 ? 'PENDING_REVIEW' : 'REJECTED'
    const inspectionStatus = certified ? (index % 2 === 0 ? 'CERTIFIED' : 'INSPECTED') : index % 5 === 0 ? 'BOOKED' : 'NONE'
    const sellerType = index % 6 === 0 ? 'PLATFORM' : index % 3 === 0 ? 'MERCHANT' : 'PERSONAL'
    const tradeMode = sellerType === 'PLATFORM' ? 'PLATFORM_OWNED' : sellerType === 'MERCHANT' ? 'CONSIGNMENT' : 'P2P'
    const machine = await prisma.machine.create({
      data: {
        title: `${brand} ${model} ${year} 年 ${tonnage} 吨二手挖掘机`,
        brand,
        model,
        tonnage,
        year,
        workingHours,
        price,
        province,
        city,
        address: `${city}工程机械停车场 ${index + 1} 区`,
        description: `${brand} ${model} 设备在${province}${city}，主要用于土方、道路或园区施工，保养记录较完整，可现场试机，支持平台验机和交易流程留痕。`,
        sellerName: sellerType === 'PLATFORM' ? '平台严选运营' : sellerType === 'MERCHANT' ? '设备商张经理' : '个人机主李师傅',
        sellerPhone: `137${String(index + 1).padStart(8, '0')}`,
        sellerType,
        ownershipStatus: certified ? 'VERIFIED' : index % 7 === 0 ? 'UNKNOWN' : index % 4 === 0 ? 'PARTIAL' : 'VERIFIED',
        inspectionStatus,
        tradeMode,
        status,
        isUrgent: urgent,
        isCertified: certified,
        isMainstreamModel: index % 9 !== 0,
        mainImage: imageUrls[index % imageUrls.length],
        videoUrl: index % 4 === 0 ? null : `https://example.com/videos/machine-${index + 1}.mp4`,
        photos: {
          create: [
            { url: imageUrls[(index + 1) % imageUrls.length], sortOrder: 1 },
            { url: imageUrls[(index + 2) % imageUrls.length], sortOrder: 2 },
          ],
        },
        spec: {
          create: {
            engine: `${brand} 配套发动机`,
            hydraulicPump: index % 2 === 0 ? '川崎液压泵' : '原厂液压系统',
            bucketCapacity: Number((tonnage / 20).toFixed(1)),
            operatingWeight: tonnage,
            origin: index % 2 === 0 ? '国产' : '进口/合资',
            serialNumber: `EXC-${year}-${String(index + 1).padStart(4, '0')}`,
            engineNumber: `ENG-${year}-${String(index + 11).padStart(4, '0')}`,
          },
        },
        ownershipDocs: {
          create: [
            {
              docType: '购机发票/合同',
              url: `https://example.com/docs/machine-${index + 1}.pdf`,
              verified: certified || index % 3 === 0,
              note: certified ? '已核验权属资料' : '待人工复核',
            },
          ],
        },
      },
    })
    machines.push(machine)
  }

  for (let index = 0; index < 12; index += 1) {
    await prisma.inquiry.create({
      data: {
        machineId: machines[index].id,
        name: `询价客户${index + 1}`,
        phone: `136${String(index + 1).padStart(8, '0')}`,
        message: index % 2 === 0 ? '能否安排周末看车，并确认最低成交价？' : '请提供验机报告和权属资料。',
        type: index % 3 === 0 ? 'VIEW_APPOINTMENT' : index % 3 === 1 ? 'PRICE_INQUIRY' : 'TRADE_SERVICE',
        status: index % 4 === 0 ? 'CONTACTED' : 'NEW',
      },
    })
  }

  for (let index = 0; index < 10; index += 1) {
    const [province, city] = regions[index]
    await prisma.buyRequest.create({
      data: {
        name: `求购客户${index + 1}`,
        phone: `135${String(index + 1).padStart(8, '0')}`,
        budgetMin: 15 + index,
        budgetMax: 28 + index,
        preferredBrands: brands.slice(index % brands.length, (index % brands.length) + 3).join(',') || '三一,小松,徐工',
        tonnageMin: 18,
        tonnageMax: 25,
        province,
        city,
        usage: '土方施工、道路修整和工地长期使用，需要车况稳定、可验机。',
        expectedYear: 2018 + (index % 5),
        maxWorkingHours: 9000,
        needInspection: true,
        needLogistics: index % 2 === 0,
        needFinance: index % 3 === 0,
        note: '希望一周内提供可看车源。',
        status: index % 3 === 0 ? 'CONTACTED' : 'NEW',
      },
    })
  }

  const inspectionOrders = []
  for (let index = 0; index < 8; index += 1) {
    const machine = machines[index]
    const order = await prisma.inspectionOrder.create({
      data: {
        machineId: machine.id,
        requesterName: `验机客户${index + 1}`,
        requesterPhone: `134${String(index + 1).padStart(8, '0')}`,
        province: machine.province,
        city: machine.city,
        address: machine.address,
        preferredTime: new Date(Date.now() + (index + 1) * 86400000),
        note: '重点检查发动机、液压系统和权属资料。',
        status: index < 5 ? 'COMPLETED' : index === 5 ? 'INSPECTING' : 'PENDING',
      },
    })
    inspectionOrders.push(order)
  }

  for (let index = 0; index < 5; index += 1) {
    const machine = machines[index]
    const valuation = calculateValuation({
      brand: machine.brand,
      model: machine.model,
      tonnage: machine.tonnage,
      year: machine.year,
      workingHours: machine.workingHours,
      province: machine.province,
      conditionGrade: index < 2 ? 'A' : 'B',
      isMainstreamModel: machine.isMainstreamModel,
    })
    await prisma.inspectionReport.create({
      data: {
        machineId: machine.id,
        orderId: inspectionOrders[index].id,
        grade: index < 2 ? 'A' : 'B',
        engineScore: 86 + index,
        hydraulicScore: 84 + index,
        chassisScore: 82 + index,
        electricScore: 88,
        appearanceScore: 80 + index,
        riskSummary: '核心系统运转正常，存在常规磨损，未发现重大事故维修痕迹，建议按报告估值区间议价。',
        valuationMin: valuation.valuationMin,
        valuationMax: valuation.valuationMax,
        reportUrl: `https://example.com/reports/inspection-${index + 1}.pdf`,
      },
    })
    await prisma.valuationRecord.create({
      data: {
        brand: machine.brand,
        model: machine.model,
        tonnage: machine.tonnage,
        year: machine.year,
        workingHours: machine.workingHours,
        province: machine.province,
        conditionGrade: index < 2 ? 'A' : 'B',
        isMainstreamModel: machine.isMainstreamModel,
        valuationMin: valuation.valuationMin,
        valuationMax: valuation.valuationMax,
        suggestedListingPrice: valuation.suggestedListingPrice,
        suggestedDealPrice: valuation.suggestedDealPrice,
        riskNotes: valuation.riskNotes.join('；'),
      },
    })
  }

  for (let index = 0; index < 8; index += 1) {
    const [province, city] = regions[index]
    await prisma.merchantApplication.create({
      data: {
        companyName: `${city}工程机械服务${index + 1}部`,
        contactName: `商家联系人${index + 1}`,
        phone: `133${String(index + 1).padStart(8, '0')}`,
        businessType: index % 3 === 0 ? '设备商' : index % 3 === 1 ? '维修验机' : '物流金融',
        province,
        city,
        description: '拥有工程机械客户资源和线下服务能力，希望接入平台线索和车源审核体系。',
        hasOfflineYard: index % 2 === 0,
        canProvideInspection: index % 3 !== 0,
        canProvideRepair: true,
        canProvideLogistics: index % 2 === 1,
        canProvideFinance: index % 4 === 0,
        status: index < 2 ? 'CONTACTED' : 'NEW',
      },
    })
  }

  for (let index = 0; index < 5; index += 1) {
    const [fromProvince, fromCity] = regions[index]
    const [toProvince, toCity] = regions[index + 5]
    await prisma.logisticsLead.create({
      data: {
        name: `物流客户${index + 1}`,
        phone: `132${String(index + 1).padStart(8, '0')}`,
        fromProvince,
        fromCity,
        toProvince,
        toCity,
        machineInfo: `${machines[index].brand} ${machines[index].model} ${machines[index].tonnage} 吨`,
        needInsurance: true,
        needFinance: index % 2 === 0,
        note: '需确认板车报价、装卸条件和预计到达时间。',
      },
    })
  }

  for (let index = 0; index < 5; index += 1) {
    const machine = machines[index]
    await prisma.tradeOrder.create({
      data: {
        machineId: machine.id,
        buyerName: `买家${index + 1}`,
        buyerPhone: `131${String(index + 1).padStart(8, '0')}`,
        sellerName: machine.sellerName,
        sellerPhone: machine.sellerPhone,
        amount: machine.price,
        depositAmount: Number((machine.price * 0.1).toFixed(1)),
        status: ['DRAFT', 'DEPOSIT_PENDING', 'DEPOSIT_PAID', 'CONTRACT_SIGNED', 'DELIVERY_PENDING'][index] as
          | 'DRAFT'
          | 'DEPOSIT_PENDING'
          | 'DEPOSIT_PAID'
          | 'CONTRACT_SIGNED'
          | 'DELIVERY_PENDING',
      },
    })
  }

  for (let index = 0; index < 10; index += 1) {
    await prisma.auditLog.create({
      data: {
        actor: index % 2 === 0 ? '平台运营' : '系统',
        action: index % 2 === 0 ? 'REVIEW_MACHINE' : 'SEED_DATA',
        targetType: 'Machine',
        targetId: machines[index].id,
        detail: `初始化审计记录 ${index + 1}`,
      },
    })
  }

  const counts = {
    users: await prisma.user.count(),
    companies: await prisma.company.count(),
    machines: await prisma.machine.count(),
    certifiedMachines: await prisma.machine.count({ where: { isCertified: true } }),
    urgentMachines: await prisma.machine.count({ where: { isUrgent: true } }),
    inquiries: await prisma.inquiry.count(),
    buyRequests: await prisma.buyRequest.count(),
    inspectionOrders: await prisma.inspectionOrder.count(),
    inspectionReports: await prisma.inspectionReport.count(),
    merchantApplications: await prisma.merchantApplication.count(),
    logisticsLeads: await prisma.logisticsLead.count(),
    tradeOrders: await prisma.tradeOrder.count(),
    auditLogs: await prisma.auditLog.count(),
  }

  console.table(counts)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
