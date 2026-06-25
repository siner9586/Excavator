import Link from 'next/link'
import { APP_EN_NAME, APP_NAME } from '@/lib/constants'

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="text-lg font-semibold text-zinc-950">{APP_NAME}</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600">
            {APP_EN_NAME} 聚焦二手挖掘机真实车源、权属核验、专业验机、行情估价和交易流程管理。MVP 阶段不提供真实放贷、支付扣款或电子合同签署。
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-950">交易服务</div>
          <div className="mt-3 grid gap-2 text-sm text-zinc-600">
            <Link href="/trade-flow">交易流程</Link>
            <Link href="/inspection">验机服务</Link>
            <Link href="/logistics-finance">物流金融</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-950">合规提示</div>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            平台估价为规则参考，成交前应完成权属核验、现场验机、合同确认和资金监管。金融服务仅收集需求并转交合作机构。
          </p>
        </div>
      </div>
    </footer>
  )
}
