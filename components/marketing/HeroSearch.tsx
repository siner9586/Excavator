import Link from 'next/link'
import { Search } from 'lucide-react'

export function HeroSearch() {
  return (
    <form action="/machines" className="mt-8 max-w-3xl rounded-lg border border-zinc-200 bg-white p-2 shadow-subtle">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <input
            name="keyword"
            placeholder="搜索品牌、型号、地区，例如 三一 215 合肥"
            className="h-12 w-full rounded-md border-0 pl-10 text-sm ring-0 focus:ring-2 focus:ring-brand-yellow"
          />
        </label>
        <button className="h-12 rounded-md bg-brand-black px-6 text-sm font-semibold text-white hover:bg-zinc-800" type="submit">
          搜索车源
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 px-1 pb-1 text-xs text-zinc-600">
        {['20 万以内', '三一 SY215C', '认证车源', '山东济宁'].map((item) => (
          <Link key={item} href={`/machines?keyword=${encodeURIComponent(item)}`} className="rounded-full bg-zinc-100 px-3 py-1 hover:bg-zinc-200">
            {item}
          </Link>
        ))}
      </div>
    </form>
  )
}
