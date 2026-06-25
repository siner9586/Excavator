import { FormSection } from '@/components/forms/FormSection'
import { BuyRequestForm } from '@/components/forms/BuyRequestForm'

export default function BuyRequestPage() {
  return (
    <main className="bg-zinc-50">
      <section className="container-page py-8">
        <p className="text-sm font-semibold text-brand-steel">Buyer Request</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">提交买家求购</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          适合施工队、项目部和租赁公司提交预算、吨位、品牌和工况需求，由运营匹配真实车源。
        </p>
      </section>
      <section className="container-page pb-12">
        <FormSection title="求购需求">
          <BuyRequestForm />
        </FormSection>
      </section>
    </main>
  )
}
