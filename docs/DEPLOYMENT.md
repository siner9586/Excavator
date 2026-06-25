# Deployment

主部署方案：Vercel + Neon。

## Neon

1. 创建项目：`excavator-marketplace`
2. 创建数据库：`excavator`
3. 获取 pooled connection，写入 `DATABASE_URL`
4. 获取 direct connection，写入 `DIRECT_URL`
5. Prisma schema 使用：

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

## 本地迁移

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate --name init
pnpm prisma:seed
```

## Vercel

- Project：`excavator`
- Framework：Next.js
- Install Command：`pnpm install`
- Build Command：`pnpm build`
- Output：Next.js 默认

## Vercel 环境变量

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APP_NAME`
- `AUTH_SECRET`
- `AUTH_TRUST_HOST`

不要把真实连接串写入 GitHub。

## 常见错误

- Prisma generate 找不到环境变量：确认 Vercel 已设置 `DATABASE_URL` 和 `DIRECT_URL`。
- migrate 连接池报错：确认 `DIRECT_URL` 不是 `-pooler` host。
- 构建时页面访问数据库失败：数据库连接串或 Neon 分支状态异常。
- Node 版本不匹配：Vercel 使用支持 Next 16 的 Node 版本。
