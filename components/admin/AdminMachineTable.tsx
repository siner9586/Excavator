'use client'

import { useState } from 'react'
import { RiskBadge } from '@/components/ui/RiskBadge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { RiskLevel } from '@/lib/risk'

export type AdminMachineRow = {
  id: string
  title: string
  brand: string
  model: string
  price: number
  province: string
  city: string
  status: string
  isCertified: boolean
  isUrgent: boolean
  ownershipStatus: string
  inspectionStatus: string
  riskLevel: RiskLevel
  riskScore: number
}

export function AdminMachineTable({ machines }: { machines: AdminMachineRow[] }) {
  const [rows, setRows] = useState(machines)
  const [savingId, setSavingId] = useState<string | null>(null)

  async function patchMachine(id: string, patch: Partial<AdminMachineRow>) {
    setSavingId(id)
    const response = await fetch(`/api/admin/machines/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    if (response.ok) {
      setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)))
    }
    setSavingId(null)
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-brand-line bg-white shadow-sm">
      <table className="min-w-[1080px] divide-y divide-zinc-200 text-sm">
        <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">车源</th>
            <th className="px-4 py-3">价格</th>
            <th className="px-4 py-3">地区</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-4 py-3">风控</th>
            <th className="px-4 py-3">认证</th>
            <th className="px-4 py-3">急售</th>
            <th className="px-4 py-3">权属</th>
            <th className="px-4 py-3">验机</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {rows.map((machine) => (
            <tr key={machine.id}>
              <td className="px-4 py-3">
                <div className="font-medium text-zinc-950">{machine.title}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {machine.brand} / {machine.model}
                </div>
              </td>
              <td className="px-4 py-3 font-medium">{machine.price.toFixed(1)} 万</td>
              <td className="px-4 py-3">
                {machine.province}{machine.city}
              </td>
              <td className="px-4 py-3">
                <select
                  value={machine.status}
                  disabled={savingId === machine.id}
                  onChange={(event) => patchMachine(machine.id, { status: event.target.value })}
                  className="w-32 rounded-md border-zinc-300 text-xs"
                >
                  {['PENDING_REVIEW', 'APPROVED', 'REJECTED', 'CERTIFIED', 'SOLD', 'HIDDEN'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <div className="mt-2">
                  <StatusBadge status={machine.status} />
                </div>
              </td>
              <td className="px-4 py-3">
                <RiskBadge level={machine.riskLevel} />
                <div className="mt-1 text-xs text-zinc-500">{machine.riskScore} 分</div>
              </td>
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={machine.isCertified}
                  disabled={savingId === machine.id}
                  onChange={(event) => patchMachine(machine.id, { isCertified: event.target.checked })}
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={machine.isUrgent}
                  disabled={savingId === machine.id}
                  onChange={(event) => patchMachine(machine.id, { isUrgent: event.target.checked })}
                />
              </td>
              <td className="px-4 py-3">
                <select
                  value={machine.ownershipStatus}
                  disabled={savingId === machine.id}
                  onChange={(event) => patchMachine(machine.id, { ownershipStatus: event.target.value })}
                  className="w-32 rounded-md border-zinc-300 text-xs"
                >
                  {['UNKNOWN', 'PARTIAL', 'VERIFIED'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3">
                <select
                  value={machine.inspectionStatus}
                  disabled={savingId === machine.id}
                  onChange={(event) => patchMachine(machine.id, { inspectionStatus: event.target.value })}
                  className="w-32 rounded-md border-zinc-300 text-xs"
                >
                  {['NONE', 'BOOKED', 'INSPECTED', 'CERTIFIED'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
