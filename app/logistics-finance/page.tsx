import { Banknote, Container, ShieldCheck, ShipWheel, Truck, Umbrella } from 'lucide-react'
import { FormSection } from '@/components/forms/FormSection'
import { LogisticsLeadForm } from '@/components/forms/LogisticsLeadForm'

const services = [
  [Truck, '板车运输', '按吨位、宽度、高度和里程匹配运输资源。'],
  [Container, '跨省运输', '跨省交付关注通行、装卸、保险和到场验收。'],
  [Umbrella, '运输保险', '为在途损失、装卸风险和重大事故预留保险对接。'],
  [ShieldCheck, '设备保险', '为后续商业险、设备险和施工风险险预留入口。'],
  [Banknote, '分期购机', '收集买家预算、首付和期限需求，交由合作机构评估。'],
  [Banknote, '融资租赁', '面向企业客户的设备融资租赁线索收集。'],
  [Banknote, '设备抵押融资', '仅收集抵押融资意向，不做平台自营放贷。'],
  [ShipWheel, '出口运输预留', '为后续出口订舱、报关、拖车和海外交付预留流程。'],
]

export default function LogisticsFinancePage() {
  return (
    <main className="bg-zinc-50">
      <section className="container-page py-8">
        <p className="text-sm font-semibold text-brand-steel">Logistics & Finance Leads</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">物流金融线索</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          平台 MVP 阶段只收集运输、保险和金融需求并对接合作方，平台不自行放贷，不承诺审批结果，也不直接调度运输。
        </p>
      </section>
      <section className="container-page grid gap-5 pb-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map(([Icon, title, description]) => (
          <div key={title as string} className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
            <Icon className="h-6 w-6 text-brand-steel" aria-hidden="true" />
            <h2 className="mt-3 text-base font-semibold text-zinc-950">{title as string}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{description as string}</p>
          </div>
        ))}
      </section>
      <section className="container-page pb-12">
        <FormSection title="提交物流金融需求">
          <LogisticsLeadForm />
        </FormSection>
      </section>
    </main>
  )
}
