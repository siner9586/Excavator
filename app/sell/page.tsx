import { FormSection } from '@/components/forms/FormSection'
import { SellMachineForm } from '@/components/forms/SellMachineForm'

export default function SellPage() {
  return (
    <main className="bg-zinc-50">
      <section className="container-page py-8">
        <p className="text-sm font-semibold text-brand-steel">Seller Portal</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">发布二手挖掘机</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          提交后默认进入待审核状态。平台会检查图片、参数、权属资料和价格异常，再决定是否公开展示。
        </p>
      </section>
      <section className="container-page pb-12">
        <FormSection title="车源信息" description="文件上传先使用 URL 字段，后续可接入对象存储。">
          <SellMachineForm />
        </FormSection>
      </section>
    </main>
  )
}
