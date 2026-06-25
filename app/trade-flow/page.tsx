import { TradeTimeline } from '@/components/marketing/TradeTimeline'
import { certifiedTradeSteps, p2pTradeSteps } from '@/lib/constants'

export default function TradeFlowPage() {
  return (
    <main className="bg-zinc-50">
      <section className="border-b border-brand-line bg-white">
        <div className="container-page py-8">
          <p className="text-sm font-semibold text-brand-steel">Trade Workflow</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">二手挖掘机交易流程</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            MVP 预留担保交易、合同、定金、物流和放款状态，不实现真实支付扣款和电子签署。
          </p>
        </div>
      </section>
      <section className="container-page space-y-10 py-8">
        <div className="rounded-lg border border-brand-line bg-white p-6 shadow-sm">
          <TradeTimeline title="P2P 点对点交易" steps={p2pTradeSteps} />
        </div>
        <div className="rounded-lg border border-brand-line bg-white p-6 shadow-sm">
          <TradeTimeline title="平台寄售 / 平台严选" steps={certifiedTradeSteps} />
        </div>
        <div className="rounded-lg border border-brand-line bg-white p-5 text-sm leading-6 text-zinc-700 shadow-sm">
          支付服务只做担保流程和订单状态预留；电子合同只做流程、记录和接口预留；平台自营模式仅预留交易模式，不在 MVP 中做真实库存资金流。
        </div>
      </section>
    </main>
  )
}
