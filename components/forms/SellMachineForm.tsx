'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { brands, provinces } from '@/lib/constants'
import { SubmitButton } from './SubmitButton'

type SellMachineFormValues = {
  brand: string
  model: string
  tonnage: number
  year: number
  workingHours: number
  price: number
  province: string
  city: string
  address: string
  description: string
  mainImage: string
  videoUrl: string
  sellerName: string
  sellerPhone: string
  sellerType: string
  ownershipStatus: string
  acceptInspection: boolean
  acceptEscrow: boolean
  isUrgent: boolean
}

export function SellMachineForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { register, handleSubmit, reset } = useForm<SellMachineFormValues>({
    defaultValues: {
      brand: '三一',
      province: '安徽',
      sellerType: 'PERSONAL',
      ownershipStatus: 'UNKNOWN',
      acceptInspection: true,
      acceptEscrow: true,
    },
  })

  async function onSubmit(values: SellMachineFormValues) {
    setLoading(true)
    setMessage('')
    const response = await fetch('/api/machines', {
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
      <div className="grid gap-4 md:grid-cols-3">
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
          <input {...register('model', { required: true })} placeholder="SY215C" className="rounded-md border-zinc-300" />
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
          期望价格（万）
          <input type="number" step="0.1" {...register('price', { valueAsNumber: true, required: true })} className="rounded-md border-zinc-300" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-1 text-sm">
          省份
          <select {...register('province')} className="rounded-md border-zinc-300">
            {provinces.map((province) => (
              <option key={province}>{province}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          城市
          <input {...register('city', { required: true })} placeholder="合肥" className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          详细地址
          <input {...register('address', { required: true })} placeholder="停车场或设备所在地" className="rounded-md border-zinc-300" />
        </label>
      </div>

      <label className="grid gap-1 text-sm">
        设备描述
        <textarea {...register('description', { required: true })} rows={4} placeholder="说明工况、保养、维修、权属、是否可试机" className="rounded-md border-zinc-300" />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          主图 URL
          <input {...register('mainImage')} placeholder="https://..." className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          视频 URL
          <input {...register('videoUrl')} placeholder="https://..." className="rounded-md border-zinc-300" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="grid gap-1 text-sm">
          卖家姓名
          <input {...register('sellerName', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          卖家手机号
          <input {...register('sellerPhone', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          卖家类型
          <select {...register('sellerType')} className="rounded-md border-zinc-300">
            <option value="PERSONAL">个人机主</option>
            <option value="MERCHANT">设备商</option>
            <option value="PLATFORM">平台严选</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          权属状态
          <select {...register('ownershipStatus')} className="rounded-md border-zinc-300">
            <option value="UNKNOWN">权属未知</option>
            <option value="PARTIAL">资料部分</option>
            <option value="VERIFIED">权属核验</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
          <input type="checkbox" {...register('acceptInspection')} /> 接受验机
        </label>
        <label className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
          <input type="checkbox" {...register('acceptEscrow')} /> 接受担保交易
        </label>
        <label className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
          <input type="checkbox" {...register('isUrgent')} /> 急售
        </label>
      </div>

      <SubmitButton loading={loading}>提交车源</SubmitButton>
      {message ? <p className="text-sm font-medium text-zinc-700">{message}</p> : null}
    </form>
  )
}
