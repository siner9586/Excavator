import Link from 'next/link'
import type { ReactNode } from 'react'
import { BarChart3, ClipboardList, Factory, Gauge, HardHat, Inbox, ShieldAlert, Users } from 'lucide-react'

const navItems = [
  { href: '/admin', label: '运营看板', icon: BarChart3 },
  { href: '/admin/machines', label: '车源审核', icon: HardHat },
  { href: '/admin/inquiries', label: '询价线索', icon: Inbox },
  { href: '/admin/buy-requests', label: '求购需求', icon: ClipboardList },
  { href: '/admin/inspections', label: '验机订单', icon: Gauge },
  { href: '/admin/users', label: '用户', icon: Users },
  { href: '/admin/merchants', label: '商家申请', icon: Factory },
  { href: '/admin/risk', label: '风控中心', icon: ShieldAlert },
]

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-lg border border-brand-line bg-white p-3 shadow-sm lg:sticky lg:top-24 lg:self-start">
          <div className="px-3 py-2 text-sm font-semibold text-zinc-950">重机严选后台</div>
          <nav className="mt-2 grid gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>
        <main>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-brand-steel">Operations Console</p>
              <h1 className="mt-1 text-2xl font-semibold text-zinc-950">{title}</h1>
            </div>
            <Link href="/" className="rounded-md border border-brand-line bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100">
              返回前台
            </Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
