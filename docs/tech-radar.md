# 前端技术雷达

> 本文件按 ThoughtWorks 技术雷达的“采纳 / 试验 / 评估 / 暂缓”四分法，定期跟踪前端领域技术趋势。
> 建议每半年更新一次。

---

## 雷达说明

| 象限 | 含义 | 行动建议 |
|------|------|---------|
| 采纳（Adopt） | 已经成熟，建议在新项目中默认使用 | 可以放心投入生产 |
| 试验（Trial） | 有前景，值得在低风险项目中试点 | 选择合适场景尝试 |
| 评估（Assess） | 值得关注，但尚未大规模验证 | 保持学习，小范围探索 |
| 暂缓（Hold） | 成熟度不足或已被更好的方案替代 | 不主动引入新项目 |

---

## 技术雷达（2026 年 Q2）

### 采纳 Adopt

| 技术/工具 | 领域 | 说明 |
|-----------|------|------|
| TypeScript | 语言 | 大型项目标配，类型安全显著提升可维护性 |
| React / Vue 3 | 框架 | 生态成熟，团队招聘成本低 |
| Vite | 构建工具 | 启动快、配置简单，已成为主流 |
| pnpm | 包管理 | 节省磁盘空间、依赖治理能力强 |
| TanStack Query | 数据管理 | 服务端状态管理的事实标准 |
| GitHub Actions | CI/CD | 与 GitHub 深度集成，社区生态丰富 |
| ESLint + Prettier | 代码质量 | 基础配置成熟，几乎必备 |
| Sentry | 可观测性 | 前端错误监控首选 |
| Playwright | 测试 | 跨浏览器 E2E 测试能力强 |

### 试验 Trial

| 技术/工具 | 领域 | 说明 |
|-----------|------|------|
| Rspack | 构建工具 | 基于 Rust 的 Webpack 替代品，性能提升明显 |
| Module Federation 2.0 | 微前端 | 模块共享能力增强，适合大型微前端架构 |
| Edge Function | 服务端 | Vercel / Cloudflare 边缘计算，适合轻量 BFF |
| shadcn/ui | 组件库 | 无依赖、可定制的新兴组件库方案 |
| Biome | 代码质量 | 旨在替代 ESLint + Prettier 的 Rust 工具 |
| React Server Components | 框架 | Next.js App Router 核心，需评估学习成本 |

### 评估 Assess

| 技术/工具 | 领域 | 说明 |
|-----------|------|------|
| WebAssembly | 运行时 | 适合高性能计算场景，但落地成本较高 |
| AI Native 前端框架 | AI | 如 Vercel AI SDK、LangChain.js，正在快速发展 |
| CRDT | 协作 | 离线协作编辑的基础技术，值得长期关注 |
| Partytown | 性能 | 将第三方脚本移到 Web Worker，提升主线程性能 |
| Islands Architecture | 架构 | Astro 代表的 Islands 架构，适合内容站 |
| Rust 前端工具链 | 工程化 | 越来越多工具用 Rust 重写，关注长期收益 |

### 暂缓 Hold

| 技术/工具 | 领域 | 说明 |
|-----------|------|------|
| jQuery | 框架 | 仅在遗留项目中维护，新项目不建议使用 |
| RequireJS / SeaJS | 模块 | 已被 ES Module 和现代构建工具取代 |
| Grunt / Gulp | 构建 | 现代项目优先使用 Vite / Webpack / Rspack |
| Redux 全局状态管理 | 状态 | 新项目中服务端状态优先用 TanStack Query，客户端状态优先用 Zustand |
| 自建组件库从头造轮子 | 设计系统 | 除非有强定制需求，否则优先基于成熟组件库二次封装 |

---

## 按领域分类

### 构建工具

- 采纳：Vite、pnpm
- 试验：Rspack
- 评估：Rust 工具链
- 暂缓：Grunt、Gulp

### 框架与运行时

- 采纳：React、Vue 3、TypeScript
- 试验：React Server Components
- 评估：Islands Architecture、WebAssembly
- 暂缓：jQuery

### 数据与状态

- 采纳：TanStack Query
- 试验：React Server Components
- 评估：CRDT
- 暂缓：Redux 全局状态管理（新项目中）

### AI 工程化

- 试验：Vercel AI SDK、LangChain.js
- 评估：AI Native 前端框架、AI 组件生成

### 可观测性

- 采纳：Sentry
- 试验：OpenTelemetry 前端接入
- 评估：RUM（真实用户监控）精细化

---

## 更新记录

| 日期 | 更新内容 | 更新人 |
|------|---------|--------|
| 2026-06-18 | 初始版本 | Kimi Code CLI |

---

> **最后更新**：2026-06-18
