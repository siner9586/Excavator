export function TradeTimeline({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-zinc-950">{title}</h3>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 rounded-lg border border-brand-line bg-white p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-xs font-semibold text-brand-black">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-zinc-800">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
