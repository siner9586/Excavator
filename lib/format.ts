import { format } from 'date-fns'

export function formatWan(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) return '-'
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)} 万`
}

export function formatHours(value: number | null | undefined) {
  if (value === null || value === undefined) return '-'
  return `${value.toLocaleString('zh-CN')} 小时`
}

export function formatTonnage(value: number | null | undefined) {
  if (value === null || value === undefined) return '-'
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)} 吨`
}

export function formatDate(value: Date | string | null | undefined) {
  if (!value) return '-'
  return format(new Date(value), 'yyyy-MM-dd')
}

export function formatDateTime(value: Date | string | null | undefined) {
  if (!value) return '-'
  return format(new Date(value), 'yyyy-MM-dd HH:mm')
}
