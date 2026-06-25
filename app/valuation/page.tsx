import { ValuationForm } from '@/components/forms/ValuationForm'

export default function ValuationPage() {
  return (
    <main className="bg-zinc-50">
      <section className="container-page py-8">
        <p className="text-sm font-semibold text-brand-steel">Valuation Model</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">二手挖掘机行情估价</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          估价模型基于品牌、吨位、年份折旧、小时数、车况等级、地区流通性和主流机型系数计算，结果会写入估价记录。
        </p>
      </section>
      <section className="container-page pb-12">
        <ValuationForm />
      </section>
    </main>
  )
}
