'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { brands, provinces } from '@/lib/constants'
import { SubmitButton } from './SubmitButton'

type BuyRequestFormValues = {
  name: string
  phone: string
  budgetMin: number
  budgetMax: number
  preferredBrands: string
  tonnageMin: number
  tonnageMax: number
  province: string
  city: string
  usage: string
  expectedYear?: number
  maxWorkingHours?: number
  needInspection: boolean
  needLogistics: boolean
  needFinance: boolean
  note?: string
}

export function BuyRequestForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { register, handleSubmit, reset } = useForm<BuyRequestFormValues>({
    defaultValues: {
      province: '安徽',
      preferredBrands: brands.slice(0, 3).join(','),
      needInspection: true,
    },
  })

  async function onSubmit(values: BuyRequestFormValues) {
    setLoading(true)
    setMessage('')
    const response = await fetch('/api/buy-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const result = (await response.json()) as { success: boolean; message?: string; error?: string }
    setLoading(false)
    setMessage(result.success ? result.message || '提交成功' : result.error || '提交失败')
    if (result.success) reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-4">
        <label className="grid gap-1 text-sm">
          姓名
          <input {...register('name', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          手机号
          <input {...register('phone', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          预算最低（万）
          <input type="number" step="0.1" {...register('budgetMin', { valueAsNumber: true, required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          预算最高（万）
          <input type="number" step="0.1" {...register('budgetMax', { valueAsNumber: true, required: true })} className="rounded-md border-zinc-300" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <label className="grid gap-1 text-sm">
          目标品牌
          <input {...register('preferredBrands', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          吨位最低
          <input type="number" step="0.1" {...register('tonnageMin', { valueAsNumber: true, required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          吨位最高
          <input type="number" step="0.1" {...register('tonnageMax', { valueAsNumber: true, required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          期望年份
          <input type="number" {...register('expectedYear', { valueAsNumber: true })} className="rounded-md border-zinc-300" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-1 text-sm">
          所在省份
          <select {...register('province')} className="rounded-md border-zinc-300">
            {provinces.map((province) => (
              <option key={province}>{province}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          所在城市
          <input {...register('city', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          最大可接受小时数
          <input type="number" {...register('maxWorkingHours', { valueAsNumber: true })} className="rounded-md border-zinc-300" />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        使用场景
        <textarea {...register('usage', { required: true })} rows={3} className="rounded-md border-zinc-300" />
      </label>
      <label className="grid gap-1 text-sm">
        补充说明
        <textarea {...register('note')} rows={3} className="rounded-md border-zinc-300" />
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
          <input type="checkbox" {...register('needInspection')} /> 需要验机
        </label>
        <label className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
          <input type="checkbox" {...register('needLogistics')} /> 需要物流
        </label>
        <label className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
          <input type="checkbox" {...register('needFinance')} /> 需要金融
        </label>
      </div>
      <SubmitButton loading={loading}>提交求购</SubmitButton>
      {message ? <p className="text-sm font-medium text-zinc-700">{message}</p> : null}
    </form>
  )
}
