# 跨领域综合案例二：设计一个大型中后台系统

> 本案例串联 **React（E06）+ 数据与状态管理（A05）+ Monorepo（E02）+ 微前端（A02）+ CI/CD（E03）+ 设计系统（E05）+ 可观测性（A06）+ 技术战略（L03）** 八个领域，通过一个 10 条业务线统一中后台的真实项目，展示大型前端系统的架构设计与落地过程。

---

## 一、业务背景与目标

### 1.1 项目背景

一家公司有 10 条业务线，每条业务线都有独立的中后台系统。现状：

- 技术栈不统一（Vue 2、Vue 3、React 都有）。
- 每个系统重复开发相同的组件（表格、表单、权限）。
- 发布互相影响，一个系统出问题可能影响全局。
- 用户体验不一致，运营人员需要学习多套系统。

### 1.2 业务 KPI（基线数据）

| 指标 | 优化前 | 业务目标 |
|------|--------|---------|
| 重复开发组件数 | 每个业务线平均 45 个 | 统一后复用率 > 80% |
| 需求交付周期 | 2 周 | 缩短至 5 天 |
| 线上故障数（月均） | 12 起 | 降至 4 起以下 |
| 新功能上线影响范围 | 全站回归 | 子应用独立发布 |
| 运营培训成本 | 每人 5 天 | 降至 1 天 |

### 1.3 架构目标

- 统一技术栈为 React + TypeScript。
- 建立共享组件库和设计系统。
- 各业务线独立开发、独立部署。
- 统一用户体验和权限体系。
- 建立完整的 CI/CD、监控和灰度发布能力。

---

## 二、架构决策会议纪要

### 2.1 关键争议

| 争议点 | 方案 A | 方案 B | 最终决策 |
|--------|--------|--------|---------|
| 技术栈统一 | 保留 Vue 2/3  legacy 系统，新业务用 React | 全部重写为 React | **方案 A**，渐进式迁移，降低风险 |
| 微前端方案 | qiankun | Module Federation | **混合**：新应用用 MF，legacy 用 qiankun 接入 |
| Monorepo vs Polyrepo | 单仓管理 | 多仓管理 | **Monorepo**，便于组件复用和统一 CI |
| 权限中心 | 每个子应用自行实现 | 基座统一权限中心 | **基座统一**，子应用通过 SDK 获取权限 |

### 2.2 决策理由

- **渐进式迁移**：全部重写成本高、风险大，先统一新业务，再逐步迁移老系统。
- **混合微前端**：legacy 系统用 qiankun 的 JS 沙箱隔离，新系统用 Module Federation 共享依赖和组件。
- **Monorepo**：10 条业务线共享组件库、工具库、类型定义，Monorepo 能显著降低版本管理成本。
- **基座权限中心**：避免每个子应用重复实现权限逻辑，统一收口更安全。

---

## 三、Monorepo 与工程化架构

### 3.1 Monorepo 结构

```
admin-platform/
├── packages/
│   ├── shared-ui/          # 共享组件库（Button、Table、Form、SearchForm）
│   ├── shared-utils/       # 共享工具函数
│   ├── shared-types/       # 共享类型定义
│   ├── auth-sdk/           # 权限 SDK
│   └── design-tokens/      # Design Token
├── apps/
│   ├── shell/              # 基座应用（菜单、路由、权限、主题）
│   ├── order-admin/        # 订单管理
│   ├── user-admin/         # 用户管理
│   ├── finance-admin/      # 财务管理
│   └── legacy-vue-admin/   # 旧 Vue 系统（通过 qiankun 接入）
├── turbo.json
└── pnpm-workspace.yaml
```

### 3.2 工具链

| 层级 | 工具 | 说明 |
|------|------|------|
| 包管理 | pnpm workspace | 高效磁盘利用、依赖隔离 |
| 构建缓存 | Turborepo | 远程缓存、任务管道 |
| 版本管理 | Changesets | 多包版本和 Changelog 管理 |
| CI/CD | GitHub Actions | PR 检查、自动发布 |
| 代码质量 | ESLint + Prettier + Husky | 提交前检查 |

### 3.3 构建与发布数据

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 全量构建时间 | 18 分钟 | 6 分钟（Turborepo 缓存命中） |
| 单应用构建时间 | 18 分钟 | 2 分钟（只构建变更应用） |
| 组件库发布周期 | 手动，易出错 | Changesets 自动化 |

---

## 四、设计系统

### 4.1 Design Token 三层结构

```json
{
  "global": {
    "color": {
      "blue-500": "#1677ff",
      "green-500": "#52c41a"
    }
  },
  "alias": {
    "color": {
      "primary": "{global.color.blue-500}",
      "success": "{global.color.green-500}"
    }
  },
  "component": {
    "button": {
      "primary-bg": "{alias.color.primary}",
      "primary-text": "#ffffff"
    }
  }
}
```

### 4.2 组件库分层

| 层级 | 组件 | 维护方 |
|------|------|--------|
| 基础组件 | Button、Input、Table、Form | 平台组 |
| 业务组件 | SearchForm、DataTable、PermissionButton | 平台组 + 业务组共建 |
| 页面模板 | 列表页、详情页、表单页 | 业务组 |

### 4.3 组件库采用率

| 阶段 | 目标 | 实际 |
|------|------|------|
| 第 1 季度 | 30% | 35% |
| 第 2 季度 | 60% | 68% |
| 第 3 季度 | 85% | 88% |

---

## 五、微前端架构

### 5.1 架构设计

```
用户访问 → 基座应用（shell）
              │
              ├── 路由匹配 → 加载对应子应用
              │
              ├── 权限校验 → 无权限则拦截
              │
              ├── 主题/语言下发 → 保证体验一致
              │
              └── 全局状态（用户、权限、通知）共享
```

### 5.2 子应用接入方式

| 子应用 | 技术栈 | 接入方式 | 原因 |
|--------|--------|---------|------|
| order-admin | React 18 | Module Federation | 新系统，共享依赖 |
| user-admin | React 18 | Module Federation | 新系统，共享依赖 |
| finance-admin | React 18 | Module Federation | 新系统，共享依赖 |
| legacy-vue-admin | Vue 2 | qiankun | 旧系统，渐进式迁移 |

### 5.3 通信方案

- **全局状态**：用户、权限、主题通过基座下发到子应用。
- **事件通信**：使用自定义事件总线，避免子应用直接依赖。
- **URL 状态**：路由参数作为跨应用通信的主要方式。

```typescript
// 子应用接收基座下发的权限
window.__MICRO_APP_BASE__.on('permissions', (perms) => {
  setPermissions(perms);
});
```

---

## 六、数据与状态管理

### 6.1 状态分层

| 状态类型 | 管理方式 | 示例 |
|----------|---------|------|
| 全局共享状态 | Zustand（基座提供） | 用户信息、权限、主题 |
| 服务端状态 | TanStack Query | 列表数据、详情数据 |
| 本地 UI 状态 | useState | 弹窗、加载、选中项 |
| URL 状态 | React Router | 筛选、分页、排序 |

### 6.2 权限数据流

```
登录 → 基座获取用户权限 → 存储在全局状态 → 子应用读取权限 → 渲染菜单和按钮
```

### 6.3 共享状态设计

```typescript
// packages/auth-sdk/src/store.ts
interface AuthState {
  user: User | null;
  permissions: Permission[];
  setUser: (user: User) => void;
  hasPermission: (code: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  permissions: [],
  setUser: (user) => set({ user, permissions: user.permissions }),
  hasPermission: (code) => get().permissions.some(p => p.code === code)
}));
```

---

## 七、CI/CD 与可观测性

### 7.1 CI/CD 流水线

```
代码提交 → Lint/Type Check → 单元测试 → 构建 → 部署测试环境 → E2E 测试 → 灰度发布 → 全量发布
```

### 7.2 灰度发布策略

- 按用户 ID 灰度：1% → 5% → 20% → 50% → 100%。
- 按业务线灰度：先灰度非核心业务线，再全量。
- 自动回滚：错误率超过 1% 自动回滚。

### 7.3 可观测性体系

| 维度 | 工具 | 指标 |
|------|------|------|
| 错误监控 | Sentry | JS 错误率、API 错误率 |
| 性能监控 | web-vitals + Lighthouse CI | LCP、INP、CLS |
| 业务埋点 | 自研埋点平台 | 页面访问、按钮点击、表单提交 |
| 日志收集 | ELK | 请求日志、错误日志 |

---

## 八、优化成果

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 需求交付周期 | 2 周 | 5 天 | ↓ 64% |
| 月均线上故障 | 12 起 | 3 起 | ↓ 75% |
| 组件复用率 | 20% | 85% | ↑ 325% |
| 全量构建时间 | 18 分钟 | 6 分钟 | ↓ 67% |
| 运营培训成本 | 5 天/人 | 1 天/人 | ↓ 80% |
| 子应用独立发布 | 否 | 是 | 发布影响范围缩小 |

---

## 九、风险、成本与组织阻力

### 9.1 主要风险

| 风险 | 缓解措施 |
|------|---------|
| legacy 系统迁移成本高 | 只迁移高频使用模块，低频模块继续用 qiankun |
| 业务线抵触统一规范 | 成立前端委员会，业务线派代表参与规范制定 |
| Monorepo 权限管理复杂 | 使用 CODEOWNERS + pnpm 工作区过滤 |
| 微前端性能问题 | 共享 React/Vue 依赖，减少重复加载 |

### 9.2 组织保障

- **前端委员会**：由各业务线前端负责人组成，负责技术选型和规范制定。
- **平台组**：负责组件库、基座、工具链的维护。
- **业务组**：负责各自子应用的业务开发。

### 9.3 如果重来一次会怎么改

- 更早引入 Changesets，避免早期组件库版本混乱。
- 在微前端接入前先做更充分的性能基准测试。
- 设计系统推广应从小范围试点开始，而不是一次性全团队推广。

---

## 十、可下载资源

- [Monorepo 目录结构图 SVG](./assets/02-monorepo-structure.svg)（待补充）
- [微前端架构图 SVG](./assets/02-micro-frontend-arch.svg)（待补充）
- [权限数据流时序图](./assets/02-auth-flow.svg)（待补充）
- [组件库 Design Token 示例](./assets/02-design-tokens.json)（待补充）

---

## 十一、总结

大型中后台系统的架构设计涉及多个领域的协同：

- 技术选型决定方向。
- Monorepo 和 CI/CD 决定工程效率。
- 设计系统决定用户体验一致性。
- 微前端决定团队协作边界。
- 状态管理决定应用可维护性。
- 可观测性决定系统稳定性。

本案例证明：**架构演进的本质是组织协作方式和技术基础设施的共同升级**。通过 9 个月的渐进式改造，该公司实现了 10 条业务线的统一中后台平台，需求交付周期缩短 64%，线上故障减少 75%。

---

> **涉及领域**：E02 Monorepo、E03 CI/CD、E05 Design System、E06 React、A02 Micro Frontend、A05 Data & State、A06 Observability、L03 Strategy  
> **最后更新**：2026-06-24
