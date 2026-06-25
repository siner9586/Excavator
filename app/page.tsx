import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BadgeCheck, ClipboardCheck, FileSearch, Landmark, ShieldCheck, Truck } from 'lucide-react'
import { HeroSearch } from '@/components/marketing/HeroSearch'
import { GuideCard } from '@/components/marketing/GuideCard'
import { TradeTimeline } from '@/components/marketing/TradeTimeline'
import { TrustFeatureCard } from '@/components/marketing/TrustFeatureCard'
import { MachineCard } from '@/components/machines/MachineCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { guideArticles, p2pTradeSteps } from '@/lib/constants'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getHomeData() {
  const [total, certifiedCount, urgentCount, approvedCount, featured, certified, urgent] = await Promise.all([
    prisma.machine.count(),
    prisma.machine.count({ where: { isCertified: true } }),
    prisma.machine.count({ where: { isUrgent: true } }),
    prisma.machine.count({ where: { status: { in: ['APPROVED', 'CERTIFIED'] } } }),
    prisma.machine.findMany({
      where: { status: { in: ['APPROVED', 'CERTIFIED'] } },
      orderBy: [{ isCertified: 'desc' }, { createdAt: 'desc' }],
      take: 6,
    }),
    prisma.machine.findMany({
      where: {
        isCertified: true,
        inspectionStatus: { in: ['INSPECTED', 'CERTIFIED'] },
        ownershipStatus: 'VERIFIED',
        status: { in: ['APPROVED', 'CERTIFIED'] },
      },
      take: 4,
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.machine.findMany({
      where: { isUrgent: true, status: { in: ['APPROVED', 'CERTIFIED'] } },
      take: 4,
      orderBy: { updatedAt: 'desc' },
    }),
  ])
  return { total, certifiedCount, urgentCount, approvedCount, featured, certified, urgent }
}

export default async function HomePage() {
  const data = await getHomeData()

  return (
    <main className="bg-zinc-50">
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=80"
          alt="工程机械施工现场"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-zinc-950/45" />
        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-brand-yellow">Excavator Marketplace</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              买卖二手挖掘机，从真实车源和专业验机开始
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-100 sm:text-lg">
              覆盖个人机主、施工队、设备商和租赁公司，提供真实车源、权属核验、专业验机、行情估价和担保交易流程支持。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/machines" className="rounded-md bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-black hover:bg-amber-400">
                我要买车
              </Link>
              <Link href="/sell" className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-100">
                我要卖车
              </Link>
              <Link href="/inspection" className="rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                预约验机
              </Link>
            </div>
            <HeroSearch />
          </div>
        </div>
      </section>

      <section className="border-b border-brand-line bg-white">
        <div className="container-page grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['平台车源', data.total],
            ['可交易车源', data.approvedCount],
            ['认证车源', data.certifiedCount],
            ['急售车源', data.urgentCount],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-brand-line p-5">
              <div className="text-sm text-zinc-500">{label}</div>
              <div className="mt-2 text-3xl font-semibold text-zinc-950">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand-steel">Featured Machines</p>
            <h2 className="mt-1 text-2xl font-semibold text-zinc-950">热门车源</h2>
          </div>
          <Link href="/machines" className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-950">
            全部车源 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {data.featured.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{data.featured.map((machine) => <MachineCard key={machine.id} machine={machine} />)}</div>
        ) : (
          <EmptyState title="暂无车源" description="完成 seed 后这里会展示热门车源。" />
        )}
      </section>

      <section className="bg-white py-10">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-950">认证车源</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {data.certified.length ? data.certified.map((machine) => <MachineCard key={machine.id} machine={machine} />) : <EmptyState title="暂无认证车源" />}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-zinc-950">急售专区</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {data.urgent.length ? data.urgent.map((machine) => <MachineCard key={machine.id} machine={machine} />) : <EmptyState title="暂无急售车源" />}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-5 py-10 md:grid-cols-3">
        {[
          ['买家求购', '告诉平台预算、吨位、地区和工况，由运营匹配车源。', '/buy-request'],
          ['验机服务', '发动机、液压、底盘、电气、权属资料全流程检查。', '/inspection'],
          ['行情估价', '基于品牌、吨位、年份、小时数、地区和车况生成参考价。', '/valuation'],
        ].map(([title, desc, href]) => (
          <Link key={href} href={href} className="rounded-lg border border-brand-line bg-white p-6 shadow-sm hover:shadow-subtle">
            <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-zinc-950">
              进入 <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>

      <section className="bg-white py-10">
        <div className="container-page">
          <h2 className="text-2xl font-semibold text-zinc-950">交易闭环时间线</h2>
          <div className="mt-5">
            <TradeTimeline title="P2P 点对点交易" steps={p2pTradeSteps} />
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <h2 className="text-2xl font-semibold text-zinc-950">可信能力</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <TrustFeatureCard icon={FileSearch} title="真实车源审核" description="上架前检查图片、设备参数、联系方式和权属资料，异常车源进入人工复核。" />
          <TrustFeatureCard icon={ClipboardCheck} title="专业验机体系" description="五级车况评级和十项核心检查，把车况结果转化为可交易的信任凭证。" />
          <TrustFeatureCard icon={ShieldCheck} title="交易风控闭环" description="价格异常、权属缺失、验机状态不一致等风险在后台集中展示。" />
          <TrustFeatureCard icon={Truck} title="物流线索对接" description="跨省板车运输、保险和交付节点留痕，MVP 阶段仅收集需求并对接合作方。" />
          <TrustFeatureCard icon={Landmark} title="金融入口预留" description="分期购机、融资租赁、抵押融资只做线索，不由平台自行放贷。" />
          <TrustFeatureCard icon={BadgeCheck} title="平台严选模式" description="为寄售、自营、批量处置和未来出口服务预留标准化流程。" />
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold text-zinc-950">避坑指南</h2>
            <Link href="/guides" className="text-sm font-semibold text-zinc-950">查看全部</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guideArticles.slice(0, 6).map((title, index) => (
              <GuideCard key={title} title={title} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="rounded-lg bg-brand-black p-8 text-white sm:p-10">
          <h2 className="text-2xl font-semibold">设备商、租赁公司和工程公司可以申请入驻</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-200">
            支持设备商车源、平台寄售、批量处置、维修验机、物流金融服务商入驻，后台统一审核和线索分发。
          </p>
          <Link href="/merchants" className="mt-6 inline-flex rounded-md bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-black hover:bg-amber-400">
            申请商家入驻
          </Link>
        </div>
      </section>
    </main>
  )
}
