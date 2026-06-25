import { NextResponse } from 'next/server'

export function ok<T>(data: T, message = 'ok') {
  return NextResponse.json({
    success: true,
    data,
    message,
  })
}

export function fail(error: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status },
  )
}
