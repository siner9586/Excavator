# Excavator Marketplace MVP

重机严选是面向个人机主、施工队、设备商、租赁公司和工程承包商的二手挖掘机可信交易平台 MVP。项目聚焦真实车源发布、专业验机、行情估价、买家求购、询价撮合、担保交易流程预留、物流金融线索和后台风控闭环。

## 核心功能

- 前台：首页、车源列表、车源详情、卖车、求购、验机、估价、认证车源、物流金融、指南、商家入驻、交易流程。
- 后台：运营看板、车源审核、询价线索、验机订单、求购需求、用户、商家申请、风控中心。
- API：车源、询价、求购、验机、估价、物流金融、商家申请、后台统计和审核。
- 数据：Prisma schema、Neon Postgres、可重复 seed、审计日志。
- 模型：`lib/valuation.ts` 估价规则模型，`lib/risk.ts` 风控规则模型。

## 技术栈

- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma 6.19.2 + Neon Postgres
- zod + react-hook-form
- lucide-react + clsx + tailwind-merge + date-fns
- Vercel + GitHub Actions

Prisma 版本固定在 6.19.2，是为了保留 `schema.prisma` 中 `url` 和 `directUrl` 的稳定配置方式。Prisma 7 已转向 `prisma.config.ts` 管理连接字符串，本 MVP 优先保证 Neon + Prisma migrate 可直接运行。

## 目录结构

- `app/`：Next.js 页面和 API Route Handlers
- `components/`：前台、后台、表单、机器卡片和 UI 组件
- `lib/`：Prisma、校验、估价、风控、响应、常量和格式化
- `prisma/`：schema 和 seed
- `docs/`：产品、技术、部署、运营和安全文档
- `scripts/`：环境检查、smoke test、seed summary

## 本地运行

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate --name init
pnpm prisma:seed
pnpm dev
```

打开 `http://localhost:3000`。

## 环境变量

复制 `.env.example` 为 `.env` 并填入 Neon 连接串：

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST-pooler.REGION.aws.neon.tech/DB?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST.REGION.aws.neon.tech/DB?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="重机严选"
AUTH_SECRET=""
AUTH_TRUST_HOST="true"
```

`.env` 已加入 `.gitignore`，不要提交真实连接串或密钥。

## Neon 数据库配置

1. 创建 Neon 项目 `excavator-marketplace`。
2. 创建数据库 `excavator`。
3. `DATABASE_URL` 使用 pooled connection，供应用运行。
4. `DIRECT_URL` 使用 direct connection，供 Prisma migrate。
5. 执行 `pnpm prisma:migrate --name init`。
6. 执行 `pnpm prisma:seed`。

## Vercel 部署

- Framework：Next.js
- Install Command：`pnpm install`
- Build Command：`pnpm build`
- 环境变量：`DATABASE_URL`、`DIRECT_URL`、`NEXT_PUBLIC_APP_URL`、`NEXT_PUBLIC_APP_NAME`、`AUTH_SECRET`、`AUTH_TRUST_HOST`
- Production Deploy：Vercel Git Integration 或 Vercel MCP/CLI

## GitHub 推送

```bash
git add .
git commit -m "feat: initialize excavator marketplace MVP"
git branch -M main
git push -u origin main
```

## 当前 MVP 边界

- 登录认证：mock-auth，后续接 Auth.js。
- 文件上传：URL 字段，后续接对象存储。
- 支付：仅订单状态和担保流程预留。
- 电子合同：仅流程和接口预留。
- 金融：只收集需求，不自行放贷。
- 物流：只收集线索，不真实调度。
- 估价：规则模型，后续接真实成交价。
- 搜索：数据库查询，后续接 Meilisearch/Elasticsearch。
- 后台权限：页面模拟，后续接完整 RBAC。

## 下一阶段路线图

1. 接入 Auth.js 和 RBAC。
2. 接入对象存储和图片压缩。
3. 完成车源审核工作流和线索分配。
4. 接入真实验机报告模板和 PDF 生成。
5. 引入真实成交价数据训练估价模型。
6. 接入支付、电子合同和物流合作方 API。
