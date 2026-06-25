'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ValuationResultCard } from '@/components/marketing/ValuationResultCard'
import { brands, provinces } from '@/lib/constants'
import type { ValuationResult } from '@/lib/valuation'
import { SubmitButton } from './SubmitButton'

type ValuationFormValues = {
  brand: string
  model: string
  tonnage: number
  year: number
  workingHours: number
  province: string
  conditionGrade: 'A' | 'B' | 'C' | 'D' | 'E'
  isMainstreamModel: boolean
}

export function ValuationForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ValuationResult | null>(null)
  const [message, setMessage] = useState('')
  const { register, handleSubmit } = useForm<ValuationFormValues>({
    defaultValues: {
      brand: '三一',
      model: 'SY215C',
      tonnage: 21.5,
      year: 2021,
      workingHours: 4200,
      province: '安徽',
      conditionGrade: 'B',
      isMainstreamModel: true,
    },
  })

  async function onSubmit(values: ValuationFormValues) {
    setLoading(true)
    setMessage('')
    const response = await fetch('/api/valuation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const payload = (await response.json()) as {
      success: boolean
      data?: { result: ValuationResult }
      error?: string
    }
    setLoading(false)
    if (payload.success && payload.data) {
      setResult(payload.data.result)
    } else {
      setMessage(payload.error || '估价失败')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border border-brand-line bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            品牌
            <select {...register('brand')} className="rounded-md border-zinc-300">
              {brands.map((brand) => (
                <option key={brand}>{brand}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            型号
            <input {...register('model', { required: true })} className="rounded-md border-zinc-300" />
          </label>
          <label className="grid gap-1 text-sm">
            吨位
            <input type="number" step="0.1" {...register('tonnage', { valueAsNumber: true, required: true })} className="rounded-md border-zinc-300" />
          </label>
          <label className="grid gap-1 text-sm">
            年份
            <input type="number" {...register('year', { valueAsNumber: true, required: true })} className="rounded-md border-zinc-300" />
          </label>
          <label className="grid gap-1 text-sm">
            使用小时数
            <input type="number" {...register('workingHours', { valueAsNumber: true, required: true })} className="rounded-md border-zinc-300" />
          </label>
          <label className="grid gap-1 text-sm">
            地区
            <select {...register('province')} className="rounded-md border-zinc-300">
              {provinces.map((province) => (
                <option key={province}>{province}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            车况等级
            <select {...register('conditionGrade')} className="rounded-md border-zinc-300">
              {['A', 'B', 'C', 'D', 'E'].map((grade) => (
                <option key={grade} value={grade}>
                  {grade} 级
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
            <input type="checkbox" {...register('isMainstreamModel')} /> 主流机型
          </label>
        </div>
        <SubmitButton loading={loading}>生成估价</SubmitButton>
        {message ? <p className="text-sm font-medium text-rose-700">{message}</p> : null}
      </form>
      <ValuationResultCard result={result} />
    </div>
  )
}
