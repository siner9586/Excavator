import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toNumber(value: FormDataEntryValue | string | number | null | undefined) {
  if (value === null || value === undefined || value === '') return undefined
  const next = Number(value)
  return Number.isFinite(next) ? next : undefined
}

export function normalizeBoolean(value: unknown) {
  return value === true || value === 'true' || value === 'on' || value === '1'
}
