import { Building2, ClipboardCheck, HardHat, Truck } from 'lucide-react'
import { FormSection } from '@/components/forms/FormSection'
import { MerchantApplicationForm } from '@/components/forms/MerchantApplicationForm'

export default function MerchantsPage() {
  return (
    <main className="bg-zinc-50">
      <section className="container-page py-8">
        <p className="text-sm font-semibold text-brand-steel">Merchant Onboarding</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">商家入驻</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          设备商、租赁公司、维修厂、验机服务商、物流和金融合作方可提交入驻申请，后台统一审核。
        </p>
      </section>
      <section className="container-page grid gap-5 pb-8 md:grid-cols-4">
        {[
          [Building2, '设备商车源'],
          [HardHat, '维修整备'],
          [ClipboardCheck, '验机服务'],
          [Truck, '物流金融合作'],
        ].map(([Icon, title]) => (
          <div key={title as string} className="rounded-lg border border-brand-line bg-white p-5 shadow-sm">
            <Icon className="h-6 w-6 text-brand-steel" aria-hidden="true" />
            <h2 className="mt-3 text-base font-semibold text-zinc-950">{title as string}</h2>
          </div>
        ))}
      </section>
      <section className="container-page pb-12">
        <FormSection title="入驻申请">
          <MerchantApplicationForm />
        </FormSection>
      </section>
    </main>
  )
}
