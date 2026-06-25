import { brands, provinces } from '@/lib/constants'

export function MachineFilter({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const getValue = (key: string) => {
    const value = searchParams?.[key]
    return Array.isArray(value) ? value[0] : value
  }

  return (
    <form action="/machines" className="rounded-lg border border-brand-line bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-4">
        <input
          name="keyword"
          defaultValue={getValue('keyword')}
          placeholder="关键词"
          className="rounded-md border-zinc-300 text-sm focus:border-brand-yellow focus:ring-brand-yellow"
        />
        <select name="brand" defaultValue={getValue('brand') ?? ''} className="rounded-md border-zinc-300 text-sm focus:border-brand-yellow focus:ring-brand-yellow">
          <option value="">全部品牌</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select name="province" defaultValue={getValue('province') ?? ''} className="rounded-md border-zinc-300 text-sm focus:border-brand-yellow focus:ring-brand-yellow">
          <option value="">全部地区</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
        <select name="certified" defaultValue={getValue('certified') ?? ''} className="rounded-md border-zinc-300 text-sm focus:border-brand-yellow focus:ring-brand-yellow">
          <option value="">认证不限</option>
          <option value="true">只看认证</option>
          <option value="false">非认证</option>
        </select>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-6">
        <input name="minPrice" defaultValue={getValue('minPrice')} placeholder="最低价(万)" className="rounded-md border-zinc-300 text-sm focus:border-brand-yellow focus:ring-brand-yellow" />
        <input name="maxPrice" defaultValue={getValue('maxPrice')} placeholder="最高价(万)" className="rounded-md border-zinc-300 text-sm focus:border-brand-yellow focus:ring-brand-yellow" />
        <input name="minYear" defaultValue={getValue('minYear')} placeholder="最小年份" className="rounded-md border-zinc-300 text-sm focus:border-brand-yellow focus:ring-brand-yellow" />
        <input name="maxYear" defaultValue={getValue('maxYear')} placeholder="最大年份" className="rounded-md border-zinc-300 text-sm focus:border-brand-yellow focus:ring-brand-yellow" />
        <select name="urgent" defaultValue={getValue('urgent') ?? ''} className="rounded-md border-zinc-300 text-sm focus:border-brand-yellow focus:ring-brand-yellow">
          <option value="">急售不限</option>
          <option value="true">只看急售</option>
        </select>
        <button className="rounded-md bg-brand-black px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800" type="submit">
          筛选
        </button>
      </div>
    </form>
  )
}
