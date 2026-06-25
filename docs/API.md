# API

所有 API 使用统一响应结构。

成功：

```json
{ "success": true, "data": {}, "message": "ok" }
```

失败：

```json
{ "success": false, "error": "错误原因" }
```

## Endpoints

- `GET /api/machines`：车源筛选，支持关键词、品牌、地区、价格、年份、小时数、吨位、认证、急售、状态、卖家类型、交易模式、验机状态。
- `POST /api/machines`：创建车源，默认 `PENDING_REVIEW` 和 `isCertified=false`。
- `GET /api/machines/[id]`：车源详情，包含图片、参数、权属、验机报告。
- `POST /api/inquiries`：创建询价。
- `POST /api/buy-requests`：创建求购。
- `POST /api/inspections`：创建验机预约。
- `POST /api/valuation`：计算估价并写入记录。
- `POST /api/logistics-leads`：创建物流金融线索。
- `POST /api/merchant-applications`：创建商家申请。
- `GET /api/admin/stats`：后台统计。
- `PATCH /api/admin/machines/[id]`：审核更新车源并写入 AuditLog。

所有写接口使用 zod 校验。
