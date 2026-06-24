# 跨领域综合案例四：AI Native 数据看板

> 本案例串联 **AI 工程化（E09）+ Node.js/BFF（E10）+ 数据与状态管理（A05）+ 系统架构（A01）+ 业务洞察（L01）** 五个领域，展示如何从零设计一个基于自然语言的数据看板系统。

---

## 一、业务背景与目标

### 1.1 项目背景

某电商公司的运营团队每天需要查看大量数据报表，但现有的 BI 工具学习成本高、报表配置繁琐。业务方希望：

- 运营人员用自然语言描述需求，系统自动生成数据看板。
- 例如："查看过去 30 天手机类目的销售额趋势和 Top 10 商品"。

### 1.2 业务 KPI

| 指标 | 基线 | 目标 |
|------|------|------|
| 运营配置一个看板的平均时间 | 2 小时 | < 5 分钟 |
| 看板需求响应周期 | 3-5 天 | < 1 天 |
| 自然语言生成准确率 | - | > 85% |
| 用户满意度 | 60% | > 85% |

### 1.3 技术目标

- 理解用户自然语言意图，转换为数据查询和图表配置。
- 支持柱状图、折线图、饼图、表格等常见图表。
- 降低幻觉，确保生成看板的数据口径正确。
- 支持用户反馈闭环，持续优化模型效果。

---

## 二、系统架构设计

### 2.1 整体架构

```
用户输入自然语言
    │
    ▼
┌─────────────────┐
│  意图理解层      │  语义解析、实体抽取、槽位填充
└────────┬────────┘
         ▼
┌─────────────────┐
│  Schema 生成层   │  生成图表配置 + 数据查询 DSL
└────────┬────────┘
         ▼
┌─────────────────┐
│  数据查询层      │  BFF 聚合数据、调用 MCP Server 查询数据库
└────────┬────────┘
         ▼
┌─────────────────┐
│  渲染层          │  前端根据 Schema 渲染图表和看板
└─────────────────┘
```

### 2.2 关键模块

| 模块 | 技术 | 职责 |
|------|------|------|
| 前端交互 | React + TypeScript | 自然语言输入、看板渲染、反馈收集 |
| 意图理解 | LLM + Few-shot Prompt | 解析用户意图，抽取时间范围、指标、维度 |
| Schema 生成 | Zod + JSON Schema | 生成结构化图表配置 |
| BFF | NestJS + Node.js | 接口聚合、数据脱敏、鉴权 |
| 数据层 | MCP Server + ClickHouse/MySQL | 通过 MCP 协议查询企业数据 |
| 评估 | RAGAS + Promptfoo | 评估意图理解准确率和 Schema 正确率 |

---

## 三、核心链路设计

### 3.1 自然语言 → Schema

**示例输入**：

```
"过去 30 天手机类目的销售额趋势和 Top 10 商品"
```

**LLM 输出（结构化 JSON）**：

```json
{
  "title": "手机类目销售分析",
  "timeRange": { "type": "last_n_days", "value": 30 },
  "filters": [
    { "field": "category", "operator": "equals", "value": "手机" }
  ],
  "charts": [
    {
      "type": "line",
      "title": "销售额趋势",
      "xAxis": "date",
      "yAxis": "gmv"
    },
    {
      "type": "table",
      "title": "Top 10 商品",
      "columns": ["商品名称", "销售额", "销量"],
      "sort": { "field": "gmv", "order": "desc" },
      "limit": 10
    }
  ]
}
```

### 3.2 Schema → 数据查询

BFF 根据 Schema 生成数据查询 DSL，通过 MCP Server 查询数据库：

```typescript
// BFF 层
const query = buildQuery(schema);
const result = await mcpClient.callTool('queryAnalytics', {
  sql: query.sql,
  params: query.params
});
```

### 3.3 数据 → 渲染

前端根据 Schema 和数据渲染图表：

```tsx
function Dashboard({ schema, data }) {
  return (
    <div>
      <h2>{schema.title}</h2>
      {schema.charts.map(chart => {
        if (chart.type === 'line') return <LineChart data={data[chart.title]} />;
        if (chart.type === 'table') return <DataTable data={data[chart.title]} />;
        return null;
      })}
    </div>
  );
}
```

---

## 四、MCP 与数据连接

### 4.1 为什么用 MCP？

- 数据查询需要连接多个数据源（订单库、商品库、用户库）。
- 不同数据源由不同团队维护，接口不统一。
- MCP 提供标准化协议，让 AI 应用能动态发现和调用数据工具。

### 4.2 MCP Server 示例

```typescript
// analytics-mcp-server.ts
const server = new MCPServer({
  name: 'analytics-server',
  resources: {
    '/schemas/orders': { description: '订单表结构' }
  },
  tools: {
    queryAnalytics: {
      description: '执行分析查询',
      parameters: z.object({ sql: z.string(), params: z.array(z.any()) }),
      handler: async ({ sql, params }) => {
        // 权限校验、SQL 审计、只读限制
        return await readonlyQuery(sql, params);
      }
    }
  }
});
```

### 4.3 安全防护

- **SQL 注入防护**：只允许预定义字段查询，禁止任意 SQL。
- **权限隔离**：不同角色可查看的数据范围不同。
- **审计日志**：记录每次自然语言查询和数据访问。

---

## 五、幻觉治理与评估

### 5.1 幻觉来源

- 模型误解用户意图（如把"销售额"理解成"销量"）。
- 模型生成的 Schema 不符合数据结构。
- 数据口径不一致（如"销售额"是否包含退款）。

### 5.2 治理措施

| 措施 | 说明 |
|------|------|
| 数据字典 | 给模型提供字段含义、枚举值、计算公式 |
| Few-shot 示例 | 提供常见问题的标准 Schema |
| Schema 校验 | 用 Zod 校验模型输出 |
| 人工确认 | 复杂查询先生成预览，用户确认后再执行 |
| 反馈闭环 | 用户对生成结果点赞/点踩，用于模型微调 |

### 5.3 评估指标

| 指标 | 目标 |
|------|------|
| 意图理解准确率 | > 90% |
| Schema 格式正确率 | > 95% |
| 数据口径正确率 | > 85% |
| 用户满意度 | > 85% |

---

## 六、架构决策与风险

### 6.1 关键决策

| 决策点 | 选择 | 理由 |
|--------|------|------|
| 模型选择 | GPT-4o + 本地小模型兜底 | 复杂意图用 GPT-4o，简单意图用本地模型降本 |
| 结构化输出 | Zod + JSON Schema | 保证前端可稳定渲染 |
| 数据连接 | MCP Server | 标准化多数据源接入 |
| 前端渲染 | Schema-driven UI | 灵活支持多种图表 |

### 6.2 风险与缓解

| 风险 | 缓解措施 |
|------|---------|
| 模型幻觉导致错误数据 | 数据字典 + 人工确认 + 反馈闭环 |
| 数据安全 | MCP 权限隔离 + 审计日志 |
| 成本高 | 本地小模型兜底 + 缓存常见查询 |
| 用户不信任 AI | 展示查询过程和数据来源 |

---

## 七、项目成果

| 指标 | 结果 |
|------|------|
| 看板配置时间 | 从 2 小时降至 3 分钟 |
| 看板需求响应周期 | 从 3-5 天降至 < 1 天 |
| 自然语言生成准确率 | 87% |
| 用户满意度 | 88% |

---

## 八、总结

AI Native 数据看板是前端架构师设计"人与 AI 协作系统"的典型场景。关键经验：

- **结构化输出是核心**：让 LLM 输出可解析、可校验、可渲染的 Schema。
- **MCP 让 AI 能连接企业数据**：通过标准化协议降低多数据源接入成本。
- **幻觉治理不能靠模型 alone**：需要数据字典、校验、人工确认、反馈闭环共同作用。
- **业务价值是最终衡量标准**：看板配置时间从 2 小时降到 3 分钟，才是真正的成功。

---

> **涉及领域**：E09 AI 工程化、E10 Node.js/BFF、A05 数据与状态管理、A01 系统架构、L01 业务洞察  
> **最后更新**：2026-06-24
