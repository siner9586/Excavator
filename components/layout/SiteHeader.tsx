import Link from 'next/link'
import { ShieldCheck, Menu } from 'lucide-react'
import { APP_NAME } from '@/lib/constants'

const navItems = [
  ['车源', '/machines'],
  ['卖车', '/sell'],
  ['求购', '/buy-request'],
  ['验机', '/inspection'],
  ['估价', '/valuation'],
  ['严选', '/certified'],
  ['商家', '/merchants'],
  ['后台', '/admin'],
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-yellow text-brand-black">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-normal text-brand-black">{APP_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/sell"
            className="hidden rounded-md bg-brand-yellow px-4 py-2 text-sm font-semibold text-brand-black hover:bg-amber-400 sm:inline-flex"
          >
            发布车源
          </Link>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-line lg:hidden" aria-label="打开导航">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="border-t border-brand-line px-4 py-2 lg:hidden">
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-zinc-700">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
