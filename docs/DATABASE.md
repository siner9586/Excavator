# Database

## 数据库

- Provider：Neon Postgres
- Database：`excavator`
- ORM：Prisma 6.19.2

## Prisma Models

- User
- Company
- Machine
- MachinePhoto
- MachineSpec
- OwnershipDoc
- Inquiry
- BuyRequest
- InspectionOrder
- InspectionReport
- ValuationRecord
- TradeOrder
- LogisticsLead
- MerchantApplication
- AuditLog

## 关键索引

- `User.phone` 唯一
- `Machine.brand/model/province/city/status`
- `Machine.price/year/workingHours/tonnage`
- `Inquiry.machineId`
- `InspectionReport.machineId`
- `AuditLog.targetType/targetId`

## 连接策略

- `DATABASE_URL`：Neon pooled connection，用于应用运行。
- `DIRECT_URL`：Neon direct connection，用于 Prisma migrate。

## 迁移

```bash
pnpm prisma:migrate --name init
pnpm prisma:deploy
```

## Seed

```bash
pnpm prisma:seed
pnpm tsx scripts/seed-summary.ts
```
