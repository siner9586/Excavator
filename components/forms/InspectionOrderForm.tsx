'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { provinces } from '@/lib/constants'
import { SubmitButton } from './SubmitButton'

type InspectionOrderValues = {
  machineId?: string
  requesterName: string
  requesterPhone: string
  province: string
  city: string
  address: string
  preferredTime?: string
  note?: string
}

export function InspectionOrderForm({ machineId }: { machineId?: string }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { register, handleSubmit, reset } = useForm<InspectionOrderValues>({
    defaultValues: { machineId, province: '安徽' },
  })

  async function onSubmit(values: InspectionOrderValues) {
    setLoading(true)
    setMessage('')
    const response = await fetch('/api/inspections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const result = (await response.json()) as { success: boolean; message?: string; error?: string }
    setLoading(false)
    setMessage(result.success ? result.message || '提交成功' : result.error || '提交失败')
    if (result.success) reset({ machineId, province: '安徽' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('machineId')} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          联系人
          <input {...register('requesterName', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          手机号
          <input {...register('requesterPhone', { required: true })} className="rounded-md border-zinc-300" />
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
        详细地址
        <input {...register('address', { required: true })} className="rounded-md border-zinc-300" />
      </label>
      <label className="grid gap-1 text-sm">
        期望时间
        <input type="datetime-local" {...register('preferredTime')} className="rounded-md border-zinc-300" />
      </label>
      <label className="grid gap-1 text-sm">
        备注
        <textarea {...register('note')} rows={3} className="rounded-md border-zinc-300" />
      </label>
      <SubmitButton loading={loading}>预约验机</SubmitButton>
      {message ? <p className="text-sm font-medium text-zinc-700">{message}</p> : null}
    </form>
  )
}
