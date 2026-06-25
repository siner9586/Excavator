'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitButton } from './SubmitButton'

type InquiryFormValues = {
  machineId: string
  name: string
  phone: string
  message?: string
  type: 'PRICE_INQUIRY' | 'VIEW_APPOINTMENT' | 'TRADE_SERVICE'
}

export function InquiryForm({ machineId }: { machineId: string }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { register, handleSubmit, reset } = useForm<InquiryFormValues>({
    defaultValues: { machineId, type: 'PRICE_INQUIRY' },
  })

  async function onSubmit(values: InquiryFormValues) {
    setLoading(true)
    setMessage('')
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const result = (await response.json()) as { success: boolean; message?: string; error?: string }
    setLoading(false)
    setMessage(result.success ? result.message || '提交成功' : result.error || '提交失败')
    if (result.success) reset({ machineId, type: 'PRICE_INQUIRY' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('machineId')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          姓名
          <input {...register('name', { required: true })} className="rounded-md border-zinc-300" />
        </label>
        <label className="grid gap-1 text-sm">
          手机号
          <input {...register('phone', { required: true })} className="rounded-md border-zinc-300" />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        需求类型
        <select {...register('type')} className="rounded-md border-zinc-300">
          <option value="PRICE_INQUIRY">询价</option>
          <option value="VIEW_APPOINTMENT">预约看车</option>
          <option value="TRADE_SERVICE">交易服务</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        留言
        <textarea {...register('message')} rows={3} className="rounded-md border-zinc-300" />
      </label>
      <SubmitButton loading={loading}>提交询价</SubmitButton>
      {message ? <p className="text-sm font-medium text-zinc-700">{message}</p> : null}
    </form>
  )
}
