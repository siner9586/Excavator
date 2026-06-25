import { GuideCard } from '@/components/marketing/GuideCard'
import { guideArticles } from '@/lib/constants'

export default function GuidesPage() {
  return (
    <main className="bg-zinc-50">
      <section className="border-b border-brand-line bg-white">
        <div className="container-page py-8">
          <p className="text-sm font-semibold text-brand-steel">Trading Guides</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">二手挖机交易避坑指南</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            围绕小时数、事故机、权属、物流、担保交易和批量处置，沉淀平台运营知识库。
          </p>
        </div>
      </section>
      <section className="container-page grid gap-5 py-8 md:grid-cols-2 lg:grid-cols-3">
        {guideArticles.map((title, index) => (
          <GuideCard key={title} title={title} index={index} />
        ))}
      </section>
    </main>
  )
}
