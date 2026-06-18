# 前端架构师术语表

> 统一汇总本知识库中出现的关键术语，按领域分类，方便快速查阅。

---

## 通用术语

| 术语 | 英文 | 解释 |
|------|------|------|
| 架构师 | Architect | 负责系统设计、技术选型、技术战略的技术负责人 |
| 技术债 | Technical Debt | 为短期目标采取非最优方案而积累的长期成本 |
| 可观测性 | Observability | 通过外部输出理解系统内部状态的能力 |
| SLO | Service Level Objective | 服务等级目标 |
| SLA | Service Level Agreement | 服务等级协议 |
| ADR | Architecture Decision Record | 架构决策记录 |
| POC | Proof of Concept | 概念验证 |
| Trade-off | Trade-off | 权衡，技术选型中不可避免的取舍 |

---

## Level 01 基础层

### F01 JavaScript

| 术语 | 解释 |
|------|------|
| 事件循环 | Event Loop，JavaScript 异步任务的调度机制 |
| 闭包 | Closure，函数记住其词法作用域的能力 |
| 原型链 | Prototype Chain，对象属性查找的链式机制 |
| this 绑定 | this 在函数调用时的指向规则 |
| 微任务 | Microtask，Promise.then 等优先级高于宏任务的任务 |
| 宏任务 | Macrotask，setTimeout、I/O 等任务 |
| V8 | Google 开发的 JavaScript 引擎 |

### F02 TypeScript

| 术语 | 解释 |
|------|------|
| 泛型 | Generic，支持类型参数化的类型系统特性 |
| 类型体操 | 用 TypeScript 类型系统编写复杂类型逻辑 |
| 类型收窄 | Type Narrowing，缩小变量类型的过程 |
| 结构类型 | Structural Typing，基于结构而非名义的类型兼容 |
| 逆变/协变 | Variance，类型参数在复合类型中的传递方向 |

### F03 Browser

| 术语 | 解释 |
|------|------|
| DOM | Document Object Model，文档对象模型 |
| CSSOM | CSS Object Model，CSS 对象模型 |
| Render Tree | 渲染树，DOM 和 CSSOM 合成后的结果 |
| 重排 | Reflow，元素几何属性变化导致的重新计算布局 |
| 重绘 | Repaint，元素外观变化但不影响布局 |
| 合成层 | Composite Layer，GPU 独立渲染的图层 |
| 事件冒泡/捕获 | 事件在 DOM 中传播的两种方式 |

### F04 Network

| 术语 | 解释 |
|------|------|
| HTTP | 超文本传输协议 |
| TCP | 传输控制协议，面向连接的可靠传输 |
| UDP | 用户数据报协议，无连接的快速传输 |
| DNS | 域名系统，域名到 IP 的解析服务 |
| CDN | 内容分发网络 |
| WebSocket | 全双工通信协议 |
| RESTful | 基于 HTTP 的 API 设计风格 |
| GraphQL | Facebook 提出的查询语言 |

### F05 Security

| 术语 | 解释 |
|------|------|
| XSS | 跨站脚本攻击 |
| CSRF | 跨站请求伪造 |
| CSP | Content Security Policy，内容安全策略 |
| MITM | 中间人攻击 |
| OAuth 2.0 | 授权框架 |
| CORS | 跨域资源共享 |

---

## Level 02 工程化层

### E01 Build Tools

| 术语 | 解释 |
|------|------|
| Webpack | 模块打包工具 |
| Vite | 基于 ES Module 的快速构建工具 |
| Rollup | 适合库打包的构建工具 |
| esbuild | 基于 Go 的高速打包器 |
| Rspack | 基于 Rust 的 Webpack 兼容打包器 |
| Tree Shaking | 移除未使用代码的优化技术 |
| Code Splitting | 代码分割，按需加载 |

### E02 Monorepo

| 术语 | 解释 |
|------|------|
| Monorepo | 单个仓库管理多个项目 |
| Workspace | 工作区，Monorepo 中的子包管理 |
| pnpm workspace | pnpm 的 Monorepo 方案 |
| Nx | 企业级 Monorepo 工具 |
| Turborepo | Vercel 提供的 Monorepo 构建缓存工具 |
| Affected | 只构建受代码变更影响的项目 |

### E03 CI/CD

| 术语 | 解释 |
|------|------|
| CI | Continuous Integration，持续集成 |
| CD | Continuous Delivery/Deployment，持续交付/部署 |
| Pipeline | 流水线，自动化的构建发布流程 |
| GitHub Actions | GitHub 的 CI/CD 服务 |
| Docker | 容器化平台 |
| Artifact | 构建产物 |

### E04 Code Quality

| 术语 | 解释 |
|------|------|
| ESLint | JavaScript/TypeScript 静态分析工具 |
| Prettier | 代码格式化工具 |
| Husky | Git hooks 工具 |
| lint-staged | 只对暂存区文件运行 lint |
| Unit Test | 单元测试 |
| E2E Test | 端到端测试 |
| Mutation Testing | 变异测试 |

### E05 Design System

| 术语 | 解释 |
|------|------|
| Design Token | 设计令牌，如颜色、字体、间距等原子化设计变量 |
| Storybook | UI 组件开发和文档工具 |
| Atomic CSS | 原子化 CSS |
| CSS in JS | 在 JS 中写 CSS 的方案 |
| A11y | Accessibility，可访问性 |

### E06 React / E07 Vue

| 术语 | 解释 |
|------|------|
| 虚拟 DOM | Virtual DOM，内存中的 DOM 表示 |
| Diff 算法 | 比较新旧虚拟 DOM 差异的算法 |
| 响应式系统 | 数据变化自动驱动 UI 更新的机制 |
| Hooks | React 的函数组件状态逻辑复用机制 |
| Composition API | Vue 3 的组合式 API |
| 调度机制 | Scheduler，协调任务优先级的机制 |

### E08 Cross Platform

| 术语 | 解释 |
|------|------|
| React Native | 用 React 开发原生应用的框架 |
| Flutter | Google 的跨端 UI 框架 |
| Taro | 京东的跨端开发框架 |
| UniApp | DCloud 的跨端开发框架 |
| Electron | 桌面应用开发框架 |
| 小程序 | 微信/支付宝等超级 App 内的轻应用 |

### E09 AI Engineering

| 术语 | 解释 |
|------|------|
| LLM | Large Language Model，大语言模型 |
| Prompt | 给模型的输入指令 |
| RAG | Retrieval-Augmented Generation，检索增强生成 |
| Agent | 能感知、决策、执行任务的智能体 |
| Embedding | 将文本转化为向量的技术 |
| Function Calling | 模型调用外部函数的能力 |
| Token | 大模型处理文本的最小单位 |

### E10 Node.js / BFF

| 术语 | 解释 |
|------|------|
| Node.js | JavaScript 服务端运行时 |
| BFF | Backend for Frontend，面向前端的后端 |
| SSR | Server-Side Rendering，服务端渲染 |
| SSG | Static Site Generation，静态站点生成 |
| ISR | Incremental Static Regeneration，增量静态再生 |
| Serverless | 无服务器计算 |
| Edge Function | 运行在边缘节点的函数 |

---

## Level 03 架构层

### A01 System Architecture

| 术语 | 解释 |
|------|------|
| MVC | Model-View-Controller，模型-视图-控制器 |
| MVVM | Model-View-ViewModel，模型-视图-视图模型 |
| BFF | Backend for Frontend |
| DDD | Domain-Driven Design，领域驱动设计 |
| 防腐层 | Anti-Corruption Layer，隔离外部模型变化的层 |
| 限界上下文 | Bounded Context，DDD 中的业务边界 |

### A02 Micro Frontend

| 术语 | 解释 |
|------|------|
| 微前端 | 将前端应用拆分为可独立部署的子应用 |
| qiankun | 阿里开源的微前端框架 |
| single-spa | 微前端框架 |
| Module Federation | Webpack 5 的模块共享能力 |
| Web Components | 浏览器原生组件标准 |

### A03 Performance

| 术语 | 解释 |
|------|------|
| LCP | Largest Contentful Paint |
| INP | Interaction to Next Paint |
| CLS | Cumulative Layout Shift |
| FCP | First Contentful Paint |
| TTFB | Time to First Byte |
| 懒加载 | Lazy Loading |
| 预加载 | Preload/Prefetch |

### A04 Quality

| 术语 | 解释 |
|------|------|
| 单元测试 | Unit Test |
| 集成测试 | Integration Test |
| E2E 测试 | End-to-End Test |
| Code Review | 代码审查 |
| 灰度发布 | 逐步放量发布 |
| 回归测试 | Regression Test |

### A05 Data & State

| 术语 | 解释 |
|------|------|
| 服务端状态 | 来自服务端的数据状态 |
| 客户端状态 | 前端本地管理的状态 |
| 乐观更新 | Optimistic Update |
| 缓存失效 | Cache Invalidation |
| 最终一致性 | Eventual Consistency |
| CRDT | Conflict-free Replicated Data Type |

### A06 Observability

| 术语 | 解释 |
|------|------|
| Logs | 日志 |
| Metrics | 指标 |
| Traces | 追踪 |
| SLO/SLA | 服务等级目标/协议 |
| Error Budget | 错误预算 |
| MTTD | Mean Time To Detect |
| MTTR | Mean Time To Repair |

---

## Level 04 领导力层

### L01 Business

| 术语 | 解释 |
|------|------|
| 业务价值 | Business Value，技术对业务的贡献 |
| ROI | Return on Investment，投资回报率 |
| 用户旅程 | User Journey |
| 转化率 | Conversion Rate |

### L02 Team

| 术语 | 解释 |
|------|------|
| Code Review | 代码评审 |
| 技术分享 | Tech Talk |
| 导师制 | Mentorship |
| 梯队建设 | Team Ladder |

### L03 Strategy

| 术语 | 解释 |
|------|------|
| 技术路线图 | Technology Roadmap |
| 技术雷达 | Technology Radar |
| 创新技术评估 | Innovation Assessment |
| 组织级体系 | Organization-level System |

---

> **最后更新**：2026-06-18
