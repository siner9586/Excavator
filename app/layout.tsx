import type { Metadata } from 'next'
import './globals.css'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { APP_EN_NAME, APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${APP_NAME} | ${APP_EN_NAME}`,
  description: '面向个人机主、施工队、设备商和租赁公司的二手挖掘机可信交易平台。',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
