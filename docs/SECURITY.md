# Security

## 密钥管理

- `.env` 不提交。
- Vercel 环境变量在项目设置或 MCP/CLI 中配置。
- GitHub Actions 使用 secrets，不硬编码 token。

## MVP 安全边界

- mock-auth 仅用于演示。
- 表单使用 zod 校验。
- API 使用统一错误响应。
- 文件上传暂用 URL 字段，避免处理不可信二进制文件。

## 后续增强

- Auth.js
- RBAC
- 审计日志查询
- 速率限制
- CSRF/Origin 检查
- 对象存储安全上传
- 后台操作二次确认
