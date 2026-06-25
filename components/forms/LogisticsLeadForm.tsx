'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { provinces } from '@/lib/constants'
import { SubmitButton } from './SubmitButton'

type LogisticsLeadValues = {
  name: string
  phone: string
  fromProvince: string
  fromCity: string
  toProvince: string
  toCity: string
  machineInfo: string
  needInsurance: boolean
  needFinance: boolean
  note?: string
}

export function LogisticsLeadForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { register, handleSubmit, reset } = useForm<LogisticsLeadValues>({
    defaultValues: { fromProvince: '安徽', toProvince: '山东' },
  })

  async function onSubmit(values: LogisticsLeadValues) {
    setLoading(true)
    setMessage('')
    const response = await fetch('/api/logistics-leads', {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          出发省份
          <select {...register('fromProvince')} className="rounded-md border-zinc-300">
            {provinces.map((province) => (
              <option key={province}>{province}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          出发城市
          <input {...register('fromCity', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          到达省份
          <select {...register('toProvince')} className="rounded-md border-zinc-300">
            {provinces.map((province) => (
              <option key={province}>{province}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          到达城市
          <input {...register('toCity', { required: true })} className="rounded-md border-zinc-300" />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        设备信息
        <input {...register('machineInfo', { required: true })} placeholder="品牌型号、吨位、尺寸、是否带破碎锤" className="rounded-md border-zinc-300" />
      </label>
      <label className="grid gap-1 text-sm">
        备注
        <textarea {...register('note')} rows={3} className="rounded-md border-zinc-300" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
          <input type="checkbox" {...register('needInsurance')} /> 需要运输保险
        </label>
        <label className="flex items-center gap-2 rounded-md border border-brand-line p-3 text-sm">
          <input type="checkbox" {...register('needFinance')} /> 需要金融方案
        </label>
      </div>
      <SubmitButton loading={loading}>提交需求</SubmitButton>
      {message ? <p className="text-sm font-medium text-zinc-700">{message}</p> : null}
    </form>
  )
}
