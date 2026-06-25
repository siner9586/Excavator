import type { UserRole } from '@prisma/client'

export type MockUser = {
  id: string
  name: string
  role: UserRole
}

export function getMockUser(): MockUser {
  return {
    id: 'mock-admin',
    name: '平台运营',
    role: 'ADMIN',
  }
}

export function assertAdmin() {
  const user = getMockUser()
  return user.role === 'ADMIN' || user.role === 'OPERATOR'
}
