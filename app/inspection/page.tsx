import { ClipboardCheck, Gauge, ShieldAlert, Wrench } from 'lucide-react'
import { FormSection } from '@/components/forms/FormSection'
import { InspectionOrderForm } from '@/components/forms/InspectionOrderForm'
import { inspectionItems, inspectionLevels } from '@/lib/constants'

export default function InspectionPage() {
  return (
    <main className="bg-zinc-50">
      <section className="border-b border-brand-line bg-white">
        <div className="container-page py-8">
          <p className="text-sm font-semibold text-brand-steel">Inspection Service</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">专业验机服务</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            二手挖掘机交易的最大风险来自车况不透明、维修记录缺失和权属信息不完整。平台用标准化验机把设备状态转化为可审核、可留痕的报告。
          </p>
        </div>
      </section>
      <section className="container-page grid gap-5 py-8 md:grid-cols-4">
        {[
          [ShieldAlert, '识别事故和翻新风险'],
          [Gauge, '核验小时数和核心系统'],
          [Wrench, '判断维修和整备成本'],
          [ClipboardCheck, '形成交易报告留痕'],
        ].map(([Icon, title]) => (
          <div key={title as string} className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
            <Icon className="h-6 w-6 text-brand-steel" aria-hidden="true" />
            <h2 className="mt-3 text-base font-semibold text-zinc-950">{title as string}</h2>
          </div>
        ))}
      </section>
      <section className="container-page py-4">
        <h2 className="text-2xl font-semibold text-zinc-950">五级验机体系</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-5">
          {inspectionLevels.map((level) => (
            <div key={level.grade} className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-yellow text-2xl font-semibold text-brand-black">{level.grade}</div>
              <h3 className="mt-4 text-base font-semibold text-zinc-950">{level.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{level.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-page grid gap-6 py-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold text-zinc-950">十大验机项目</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {inspectionItems.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-md bg-zinc-50 p-3 text-sm text-zinc-700">
                <span className="font-semibold text-brand-steel">{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md bg-blue-50 p-4 text-sm leading-6 text-blue-950">
            示例报告会包含等级、五大系统评分、价格参考区间、重大风险摘要和报告 URL。MVP 阶段报告以记录和链接预留为主。
          </div>
          <div className="mt-4 rounded-md bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
            服务边界：验机报告不等同于质量担保，不替代交易合同，不承诺未来故障零发生。报告用于辅助买卖双方做价格、维修和交付决策。
          </div>
        </div>
        <FormSection title="预约验机">
          <InspectionOrderForm />
        </FormSection>
      </section>
    </main>
  )
}
