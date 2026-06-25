import { formatWan } from '@/lib/format'

export function PriceTag({ value }: { value: number }) {
  return <span className="text-xl font-semibold text-brand-black">{formatWan(value)}</span>
}
