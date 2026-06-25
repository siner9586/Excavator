'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { provinces } from '@/lib/constants'
import { SubmitButton } from './SubmitButton'

type MerchantApplicationValues = {
  companyName: string
  businessType: string
  contactName: string
  phone: string
  province: string
  city: string
  description: string
  hasOfflineYard: boolean
  canProvideInspection: boolean
  canProvideRepair: boolean
  canProvideLogistics: boolean
  canProvideFinance: boolean
}

export function MerchantApplicationForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { register, handleSubmit, reset } = useForm<MerchantApplicationValues>({
    defaultValues: { province: '安徽', businessType: '设备商' },
  })

  async function onSubmit(values: MerchantApplicationValues) {
    setLoading(true)
    setMessage('')
    const response = await fetch('/api/merchant-applications', {
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
          公司名称
          <input {...register('companyName', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          业务类型
          <input {...register('businessType', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          联系人
          <input {...register('contactName', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          手机号
          <input {...register('phone', { required: true })} className="rounded-md border-zinc-300" />
        </label>
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
          <input {...register('city', { required: true })} className="rounded-md border-zinc-300" />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        业务介绍
        <textarea {...register('description', { required: true })} rows={4} className="rounded-md border-zinc-300" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ['hasOfflineYard', '有线下场地'],
          ['canProvideInspection', '能提供验机'],
          ['canProvideRepair', '能提供维修'],
          ['canProvideLogistics', '能提供物流'],
          ['canProvideFinance', '能提供金融'],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
            <input type="checkbox" {...register(key as keyof MerchantApplicationValues)} /> {label}
          </label>
        ))}
      </div>
      <SubmitButton loading={loading}>提交入驻申请</SubmitButton>
      {message ? <p className="text-sm font-medium text-zinc-700">{message}</p> : null}
    </form>
  )
}
