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
- Repository config：`vercel.json`

## Vercel 环境变量

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APP_NAME`
- `AUTH_SECRET`
- `AUTH_TRUST_HOST`

不要把真实连接串写入 GitHub。

## CLI fallback

```bash
NODE_USE_ENV_PROXY=1 vercel login
NODE_USE_ENV_PROXY=1 vercel link --yes --project excavator --scope githubcomsiner9586excavator
NODE_USE_ENV_PROXY=1 vercel env add DATABASE_URL production
NODE_USE_ENV_PROXY=1 vercel env add DIRECT_URL production
NODE_USE_ENV_PROXY=1 vercel env add NEXT_PUBLIC_APP_URL production
NODE_USE_ENV_PROXY=1 vercel env add NEXT_PUBLIC_APP_NAME production
NODE_USE_ENV_PROXY=1 vercel env add AUTH_SECRET production
NODE_USE_ENV_PROXY=1 vercel env add AUTH_TRUST_HOST production
NODE_USE_ENV_PROXY=1 vercel deploy --prod
```

如果本机设置了 `HTTP_PROXY` / `HTTPS_PROXY` / `ALL_PROXY`，Node 24 的 Vercel CLI 登录流可能不会默认使用这些代理。此时需要显式加 `NODE_USE_ENV_PROXY=1`，否则可能出现 `Client network socket disconnected before secure TLS connection was established`。

## 常见错误

- Prisma generate 找不到环境变量：确认 Vercel 已设置 `DATABASE_URL` 和 `DIRECT_URL`。
- migrate 连接池报错：确认 `DIRECT_URL` 不是 `-pooler` host。
- 构建时页面访问数据库失败：数据库连接串或 Neon 分支状态异常。
- Node 版本不匹配：Vercel 使用支持 Next 16 的 Node 版本。
