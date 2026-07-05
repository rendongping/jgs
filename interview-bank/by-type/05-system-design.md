# 系统设计题

> 本文件按题型收录 **系统设计题** 相关前端面试题索引。
> 共收录 **399** 道题（基础 4 / 进阶 22 / 深入 55 / 架构 318）。
> 每道题都附带完整参考答案与评分维度，点击链接可查看原文。

## 基础题（4 道）{#basic}

### 开发者体验与工程效能（1 道）

- [FB-21-SD-B-001 如何设计团队级 Prettier 与编辑器配置一致性方案](../by-domain/21-dx.md#FB-21-SD-B-001)

### 部署与 SRE（1 道）

- [FB-22-SD-B-001 如何设计前端应用的 CI/CD 镜像构建系统，兼顾构建速度与产物一致性？](../by-domain/22-deployment-sre.md#FB-22-SD-B-001)

### 包管理与供应链安全（1 道）

- [FB-23-SD-B-001 如何设计企业内部 npm 代理 Registry，实现跨项目依赖去重与统一缓存？](../by-domain/23-package-supply-chain.md#FB-23-SD-B-001)

### 实时与协同（1 道）

- [FB-32-SD-B-001 如何设计 WebSocket 重连机制？](../by-domain/32-real-time.md#FB-32-SD-B-001)

## 进阶题（22 道）{#advanced}

### 可访问性（a11y）（1 道）

- [FB-07-SD-A-001 如何设计一个可访问的模态对话框？](../by-domain/07-a11y.md#FB-07-SD-A-001)

### Vue（1 道）

- [FB-16-SD-A-001 如何设计 Vue 项目的权限路由系统？](../by-domain/16-vue.md#FB-16-SD-A-001)

### AI 工程化（1 道）

- [FB-18-SD-A-001 设计一个 AI 客服系统的前端架构。](../by-domain/18-ai-engineering.md#FB-18-SD-A-001)

### Node.js / BFF（2 道）

- [FB-19-SD-A-001 如何设计一个支持高并发的 BFF 服务？](../by-domain/19-node-bff.md#FB-19-SD-A-001)
- [FB-19-SD-A-002 如何设计一个前后端共享类型的 Monorepo 方案？](../by-domain/19-node-bff.md#FB-19-SD-A-002)

### 开发者体验与工程效能（1 道）

- [FB-21-SD-A-001 如何为内部组件库设计可观测性方案，以度量组件使用与性能](../by-domain/21-dx.md#FB-21-SD-A-001)

### 部署与 SRE（2 道）

- [FB-22-SD-A-001 如何设计支持 Docker 的前端构建加速系统，解决 node_modules 与构建缓存问题？](../by-domain/22-deployment-sre.md#FB-22-SD-A-001)
- [FB-22-SD-A-002 如何设计前端错误监控体系？](../by-domain/22-deployment-sre.md#FB-22-SD-A-002)

### 包管理与供应链安全（1 道）

- [FB-23-SD-A-001 在组件库/插件平台中，如何设计 peerDependencies 机制以避免多版本 React/Vue 冲突？](../by-domain/23-package-supply-chain.md#FB-23-SD-A-001)

### 前端运维与监控（1 道）

- [FB-24-SD-A-002 如何设计一个前端 RUM SDK？](../by-domain/24-frontend-operations.md#FB-24-SD-A-002)

### 系统架构设计（2 道）

- [FB-25-SD-A-002 设计一个支持多终端接入的 BFF 层](../by-domain/25-system-architecture.md#FB-25-SD-A-002)
- [FB-25-SD-A-012 设计一个前端实时协同编辑系统的架构](../by-domain/25-system-architecture.md#FB-25-SD-A-012)

### 数据与状态管理（2 道）

- [FB-29-SD-A-001 如何设计一个大型列表页的状态管理？](../by-domain/29-data-state.md#FB-29-SD-A-001)
- [FB-29-SD-A-002 如何设计一个支持乐观更新的全局状态方案？](../by-domain/29-data-state.md#FB-29-SD-A-002)

### 可观测性（2 道）

- [FB-30-SD-A-001 设计一个前端监控体系。](../by-domain/30-observability.md#FB-30-SD-A-001)
- [FB-30-SD-A-002 如何设计一个高可用的前端发布流程？](../by-domain/30-observability.md#FB-30-SD-A-002)

### 安全架构（1 道）

- [FB-31-SD-A-001 如何设计一个隐私合规的前端应用？](../by-domain/31-security-architecture.md#FB-31-SD-A-001)

### 国际化（1 道）

- [FB-33-SD-A-001 如何设计一个可扩展的翻译工作流？](../by-domain/33-internationalization.md#FB-33-SD-A-001)

### 可视化与图形（2 道）

- [FB-34-SD-A-001 设计一个实时数据可视化大屏，需要关注哪些方面？](../by-domain/34-visualization-graphics.md#FB-34-SD-A-001)
- [FB-34-SD-A-002 如何设计一个可扩展的图表库？](../by-domain/34-visualization-graphics.md#FB-34-SD-A-002)

### 前端数据工程（1 道）

- [FB-36-SD-A-001 如何设计一个科学的 AB 实验？](../by-domain/36-data-engineering.md#FB-36-SD-A-001)

### 招聘（1 道）

- [FB-42-SD-A-001 如何设计一份好的代码作业？](../by-domain/42-hiring.md#FB-42-SD-A-001)

## 深入题（55 道）{#proficient}

### JavaScript（2 道）

- [FB-01-SD-P-001 设计一个支持取消的 Promise，并解释实现原理。](../by-domain/01-javascript.md#FB-01-SD-P-001)
- [FB-01-SD-P-002 如何设计一个高可靠的前端埋点 SDK？从错误监控、性能采集、数据上报等角度分析。](../by-domain/01-javascript.md#FB-01-SD-P-002)

### TypeScript（1 道）

- [FB-02-SD-P-001 如何设计一个类型安全的前端 API 请求层？](../by-domain/02-typescript.md#FB-02-SD-P-001)

### Browser（1 道）

- [FB-03-SD-P-001 如何设计一个高性能的虚拟列表（Virtual List）？](../by-domain/03-browser.md#FB-03-SD-P-001)

### 计算机网络（1 道）

- [FB-04-SD-P-001 如何设计一个高可用的前端网络请求层？](../by-domain/04-network.md#FB-04-SD-P-001)

### Monorepo（2 道）

- [FB-11-SD-P-001 如何设计 Monorepo 的模块边界规则？](../by-domain/11-monorepo.md#FB-11-SD-P-001)
- [FB-11-SD-P-019 如何设计 Monorepo 下的包级权限模型？](../by-domain/11-monorepo.md#FB-11-SD-P-019)

### CI/CD（5 道）

- [FB-12-SD-P-002 如何设计一个完整的前端 CI/CD 平台？](../by-domain/12-ci-cd.md#FB-12-SD-P-002)
- [FB-12-SD-P-018 如何优化大型前端 Monorepo 的 CI/CD 效率？](../by-domain/12-ci-cd.md#FB-12-SD-P-018)
- [FB-12-SD-P-020 如何设计前端私有 npm Registry 与 CI 集成方案？](../by-domain/12-ci-cd.md#FB-12-SD-P-020)
- [FB-12-SD-P-023 如何为大型前端团队设计 CI/CD 自助平台？](../by-domain/12-ci-cd.md#FB-12-SD-P-023)
- [FB-12-SD-P-025 如何设计跨云 CI/CD 架构？](../by-domain/12-ci-cd.md#FB-12-SD-P-025)

### 设计系统与组件库（1 道）

- [FB-14-SD-P-001 如何从 0 到 1 设计一个企业级组件库？](../by-domain/14-design-system.md#FB-14-SD-P-001)

### 跨端技术（1 道）

- [FB-17-SD-P-052 如何设计一个跨端组件库？](../by-domain/17-cross-platform.md#FB-17-SD-P-052)

### AI 工程化（7 道）

- [FB-18-SD-P-017 如何设计一个前端 RAG 客服系统？](../by-domain/18-ai-engineering.md#FB-18-SD-P-017)
- [FB-18-SD-P-018 如何设计一个支持多模态输入的 AI 创作工作台？](../by-domain/18-ai-engineering.md#FB-18-SD-P-018)
- [FB-18-SD-P-019 如何设计一个实时协作的 AI 编程助手？](../by-domain/18-ai-engineering.md#FB-18-SD-P-019)
- [FB-18-SD-P-054 设计一个支持多模态输入的前端 AI 交互系统](../by-domain/18-ai-engineering.md#FB-18-SD-P-054)
- [FB-18-SD-P-055 如何设计一个支持多模型切换的 AI 应用层？](../by-domain/18-ai-engineering.md#FB-18-SD-P-055)
- [FB-18-SD-P-056 设计一个支持 Agent 工作流的前端交互框架。](../by-domain/18-ai-engineering.md#FB-18-SD-P-056)
- [FB-18-SD-P-057 设计一个 LLM 可观测性方案，前端需要关注哪些指标？](../by-domain/18-ai-engineering.md#FB-18-SD-P-057)

### Node.js / BFF（1 道）

- [FB-19-SD-P-001 如何设计一个 Node.js 微服务或 BFF 的日志与链路追踪方案？](../by-domain/19-node-bff.md#FB-19-SD-P-001)

### 开发者体验与工程效能（6 道）

- [FB-21-SD-P-017 如何设计一个内部开发者门户（Internal Developer Portal）？核心模块和衡量指标是什么？](../by-domain/21-dx.md#FB-21-SD-P-017)
- [FB-21-SD-P-048 如何设计一个前端工程化度量平台？](../by-domain/21-dx.md#FB-21-SD-P-048)
- [FB-21-SD-P-052 如何设计一个可插拔的前端 CLI 工具？](../by-domain/21-dx.md#FB-21-SD-P-052)
- [FB-21-SD-P-056 如何设计一个前端错误追踪与诊断平台？](../by-domain/21-dx.md#FB-21-SD-P-056)
- [FB-21-SD-P-079 如何设计一个前端运行时性能监控与诊断平台？](../by-domain/21-dx.md#FB-21-SD-P-079)
- [FB-21-SD-P-080 如何设计可在 Storybook 文档中实时格式化示例代码的 Prettier Playground 组件](../by-domain/21-dx.md#FB-21-SD-P-080)

### 部署与 SRE（1 道）

- [FB-22-SD-P-001 如何设计一个 SSR 前端应用的部署策略系统，支持灰度、回滚与降级？](../by-domain/22-deployment-sre.md#FB-22-SD-P-001)

### 包管理与供应链安全（1 道）

- [FB-23-SD-P-001 如何为 yarn 项目设计 SBOM（软件物料清单）生成与合规审计系统？](../by-domain/23-package-supply-chain.md#FB-23-SD-P-001)

### 前端运维与监控（1 道）

- [FB-24-SD-P-001 如何设计一个前端可观测性平台？](../by-domain/24-frontend-operations.md#FB-24-SD-P-001)

### 系统架构设计（4 道）

- [FB-25-SD-P-001 设计一个低代码/搭建平台的前端架构](../by-domain/25-system-architecture.md#FB-25-SD-P-001)
- [FB-25-SD-P-008 设计一个金融级前端安全收银台架构](../by-domain/25-system-architecture.md#FB-25-SD-P-008)
- [FB-25-SD-P-009 设计一个电商系统的前端状态管理方案，说明如何组织状态。](../by-domain/25-system-architecture.md#FB-25-SD-P-009)
- [FB-25-SD-P-010 如何设计一个可扩展的前端组件库？](../by-domain/25-system-architecture.md#FB-25-SD-P-010)

### 微前端（3 道）

- [FB-26-SD-P-018 微前端下全局状态应该如何设计？单一 Store 还是各自 Store + 事件同步？](../by-domain/26-micro-frontend.md#FB-26-SD-P-018)
- [FB-26-SD-P-019 微前端路由协调的深入问题有哪些？如何解决？](../by-domain/26-micro-frontend.md#FB-26-SD-P-019)
- [FB-26-SD-P-020 如果微前端子应用需要共享状态，你会如何设计？](../by-domain/26-micro-frontend.md#FB-26-SD-P-020)

### 质量保障（1 道）

- [FB-28-SD-P-001 如何设计一个高效的 Code Review 流程？](../by-domain/28-quality.md#FB-28-SD-P-001)

### 数据与状态管理（2 道）

- [FB-29-SD-P-001 设计一个支持离线编辑的协同文档应用的数据层。](../by-domain/29-data-state.md#FB-29-SD-P-001)
- [FB-29-SD-P-002 如何设计一个大型前端应用的状态管理架构？](../by-domain/29-data-state.md#FB-29-SD-P-002)

### 可观测性（3 道）

- [FB-30-SD-P-017 设计一个前端全链路可观测平台](../by-domain/30-observability.md#FB-30-SD-P-017)
- [FB-30-SD-P-018 如何设计前端全链路追踪方案？](../by-domain/30-observability.md#FB-30-SD-P-018)
- [FB-30-SD-P-019 如何设计前端性能预算和告警体系？](../by-domain/30-observability.md#FB-30-SD-P-019)

### 国际化（1 道）

- [FB-33-SD-P-001 如何设计大规模多语言前端平台？](../by-domain/33-internationalization.md#FB-33-SD-P-001)

### 技术战略（2 道）

- [FB-39-SD-P-001 请设计一套前端技术选型决策框架。](../by-domain/39-strategy.md#FB-39-SD-P-001)
- [FB-39-SD-P-004 请设计一个前端中台的演进路线与治理机制。](../by-domain/39-strategy.md#FB-39-SD-P-004)

### 项目管理（1 道）

- [FB-41-SD-P-002 设计一个前端技术项目的治理框架（Governance Framework）。](../by-domain/41-project-management.md#FB-41-SD-P-002)

### 招聘（2 道）

- [FB-42-SD-P-017 如何设计一套可扩展的面试官认证体系？](../by-domain/42-hiring.md#FB-42-SD-P-017)
- [FB-42-SD-P-021 如何设计技术面试题库与分级体系？](../by-domain/42-hiring.md#FB-42-SD-P-021)

### 技术品牌与布道（1 道）

- [FB-43-SD-P-001 设计一个“前端团队技术影响力度量体系”。](../by-domain/43-tech-branding.md#FB-43-SD-P-001)

### 技术治理与合规（2 道）

- [FB-44-SD-P-001 设计一个前端技术治理平台。](../by-domain/44-tech-governance.md#FB-44-SD-P-001)
- [FB-44-SD-P-002 如何设计前端灾备与业务连续性方案？](../by-domain/44-tech-governance.md#FB-44-SD-P-002)

### 低代码（1 道）

- [FB-52-SD-P-002 如何设计一个低代码页面渲染引擎？](../by-domain/52-low-code.md#FB-52-SD-P-002)

### 行业特化（1 道）

- [FB-56-SD-P-001 设计一个支持多行业的低代码平台前端架构](../by-domain/56-industry.md#FB-56-SD-P-001)

## 架构题（318 道）{#architect}

### JavaScript（3 道）

- [FB-01-SD-R-001 如何设计一个前端代码执行沙箱？](../by-domain/01-javascript.md#FB-01-SD-R-001)
- [FB-01-SD-R-002 如何设计一个前端脚本加载器？](../by-domain/01-javascript.md#FB-01-SD-R-002)
- [FB-01-SD-R-003 如何设计一个前端错误监控 SDK？](../by-domain/01-javascript.md#FB-01-SD-R-003)

### TypeScript（4 道）

- [FB-02-SD-R-001 如何为大型前端项目设计类型系统架构？](../by-domain/02-typescript.md#FB-02-SD-R-001)
- [FB-02-SD-R-002 如何设计类型安全的 API Client？](../by-domain/02-typescript.md#FB-02-SD-R-002)
- [FB-02-SD-R-003 如何在企业级应用中合理使用 Decorators？](../by-domain/02-typescript.md#FB-02-SD-R-003)
- [FB-02-SD-R-004 TypeScript Compiler API 可以做什么？请设计一个应用场景。](../by-domain/02-typescript.md#FB-02-SD-R-004)

### Browser（10 道）

- [FB-03-SD-R-001 设计一个大型 SPA 的首屏性能优化体系。](../by-domain/03-browser.md#FB-03-SD-R-001)
- [FB-03-SD-R-002 如何设计浏览器端的安全架构以防御 XSS、CSRF、点击劫持和数据窃取？](../by-domain/03-browser.md#FB-03-SD-R-002)
- [FB-03-SD-R-003 设计一个基于 Service Worker 的前端缓存与离线可用架构。](../by-domain/03-browser.md#FB-03-SD-R-003)
- [FB-03-SD-R-004 针对高交互 Web 应用，如何设计 60fps 动画与输入响应保障方案？](../by-domain/03-browser.md#FB-03-SD-R-004)
- [FB-03-SD-R-005 如何设计跨窗口/跨 Tab 的前端状态同步方案？](../by-domain/03-browser.md#FB-03-SD-R-005)
- [FB-03-SD-R-006 设计一个浏览器端前端监控与可观测性体系。](../by-domain/03-browser.md#FB-03-SD-R-006)
- [FB-03-SD-R-007 如何设计浏览器端资源加载策略以平衡性能与实时性？](../by-domain/03-browser.md#FB-03-SD-R-007)
- [FB-03-SD-R-008 针对微前端架构，浏览器端隔离方案如何设计？](../by-domain/03-browser.md#FB-03-SD-R-008)
- [FB-03-SD-R-009 设计一个浏览器端内存优化与防泄漏方案。](../by-domain/03-browser.md#FB-03-SD-R-009)
- [FB-03-SD-R-010 如何设计一个多环境、多角色的前端权限与安全模型？](../by-domain/03-browser.md#FB-03-SD-R-010)

### 计算机网络（2 道）

- [FB-04-SD-R-001 如何设计一个面向全球用户的 CDN + 多活静态资源分发架构？](../by-domain/04-network.md#FB-04-SD-R-001)
- [FB-04-SD-R-002 如何设计一个前端 API 网关 / BFF 层？](../by-domain/04-network.md#FB-04-SD-R-002)

### Web 安全（4 道）

- [FB-05-SD-R-001 如何为大型企业级前端应用设计一套完整的安全体系？](../by-domain/05-security.md#FB-05-SD-R-001)
- [FB-05-SD-R-002 如何设计一个企业级 SSO/OIDC 认证架构？](../by-domain/05-security.md#FB-05-SD-R-002)
- [FB-05-SD-R-003 如何为大型站点设计和分阶段部署 CSP？](../by-domain/05-security.md#FB-05-SD-R-003)
- [FB-05-SD-R-004 如何从前端视角设计一个安全的 API Gateway？](../by-domain/05-security.md#FB-05-SD-R-004)

### HTML/CSS（2 道）

- [FB-06-SD-R-001 设计一个企业级组件库的 CSS 架构。](../by-domain/06-html-css.md#FB-06-SD-R-001)
- [FB-06-SD-R-002 设计一个跨团队的 Design Token 体系。](../by-domain/06-html-css.md#FB-06-SD-R-002)

### 可访问性（a11y）（3 道）

- [FB-07-SD-R-001 如何为大型企业级前端制定可访问性治理策略？](../by-domain/07-a11y.md#FB-07-SD-R-001)
- [FB-07-SD-R-002 如何设计一个可访问的组件库 / 设计系统？](../by-domain/07-a11y.md#FB-07-SD-R-002)
- [FB-07-SD-R-003 面向全球用户的产品的国际化（i18n）与无障碍如何协同设计？](../by-domain/07-a11y.md#FB-07-SD-R-003)

### 设计模式（2 道）

- [FB-09-SD-R-001 设计一个前端跨页面/跨 iframe 的事件总线。](../by-domain/09-design-patterns.md#FB-09-SD-R-001)
- [FB-09-SD-R-002 设计一个前端权限控制系统。](../by-domain/09-design-patterns.md#FB-09-SD-R-002)

### 构建工具（6 道）

- [FB-10-SD-R-001 设计一个企业级前端构建体系。](../by-domain/10-build-tools.md#FB-10-SD-R-001)
- [FB-10-SD-R-002 设计一个前端产物发布与回滚系统。](../by-domain/10-build-tools.md#FB-10-SD-R-002)
- [FB-10-SD-R-003 设计一个前端组件库/Monorepo 的构建与发布流程。](../by-domain/10-build-tools.md#FB-10-SD-R-003)
- [FB-10-SD-R-004 设计一个企业级前端构建产物质量门禁体系](../by-domain/10-build-tools.md#FB-10-SD-R-004)
- [FB-10-SD-R-005 设计一个支持多构建工具统一配置的前端工程平台](../by-domain/10-build-tools.md#FB-10-SD-R-005)
- [FB-10-SD-R-007 设计一个企业级 Monorepo 构建平台。](../by-domain/10-build-tools.md#FB-10-SD-R-007)

### Monorepo（17 道）

- [FB-11-SD-R-001 设计一个大型前端 Monorepo 的整体架构。](../by-domain/11-monorepo.md#FB-11-SD-R-001)
- [FB-11-SD-R-002 如何从 Multirepo 迁移到 Monorepo？](../by-domain/11-monorepo.md#FB-11-SD-R-002)
- [FB-11-SD-R-003 设计 Monorepo 下的 CI/CD 流水线。](../by-domain/11-monorepo.md#FB-11-SD-R-003)
- [FB-11-SD-R-004 Monorepo 下如何平衡代码共享与包独立发布？](../by-domain/11-monorepo.md#FB-11-SD-R-004)
- [FB-11-SD-R-005 设计一个跨团队 Monorepo 的代码所有权与评审策略。](../by-domain/11-monorepo.md#FB-11-SD-R-005)
- [FB-11-SD-R-006 如何设计 Monorepo 下的渐进式迁移与拆分策略？](../by-domain/11-monorepo.md#FB-11-SD-R-006)
- [FB-11-SD-R-007 设计一个支持微前端聚合的 Monorepo 架构。](../by-domain/11-monorepo.md#FB-11-SD-R-007)
- [FB-11-SD-R-008 如何设计 Monorepo 的依赖治理与自动化审计体系？](../by-domain/11-monorepo.md#FB-11-SD-R-008)
- [FB-11-SD-R-009 设计支持多语言（前端 + Node + Python）的 Monorepo 架构。](../by-domain/11-monorepo.md#FB-11-SD-R-009)
- [FB-11-SD-R-010 设计一个 Monorepo 下的共享服务与 API 治理方案。](../by-domain/11-monorepo.md#FB-11-SD-R-010)
- [FB-11-SD-R-011 设计 Monorepo 下的文档站点与开发者门户。](../by-domain/11-monorepo.md#FB-11-SD-R-011)
- [FB-11-SD-R-012 如何设计一个支持领域驱动设计（DDD）的 Monorepo 分层架构？](../by-domain/11-monorepo.md#FB-11-SD-R-012)
- [FB-11-SD-R-014 如何设计 Monorepo 下的 release train 发布模式？](../by-domain/11-monorepo.md#FB-11-SD-R-014)
- [FB-11-SD-R-016 如何设计 Monorepo 的安全供应链体系？](../by-domain/11-monorepo.md#FB-11-SD-R-016)
- [FB-11-SD-R-017 如何设计 Monorepo 的构建可观测性体系？](../by-domain/11-monorepo.md#FB-11-SD-R-017)
- [FB-11-SD-R-019 如何设计 Monorepo 下的 AI Coding 辅助策略？](../by-domain/11-monorepo.md#FB-11-SD-R-019)
- [FB-11-SD-R-020 如何制定 Monorepo 的长期演进路线图？](../by-domain/11-monorepo.md#FB-11-SD-R-020)

### CI/CD（18 道）

- [FB-12-SD-R-001 如何设计基于 GitOps 的前端持续交付系统？](../by-domain/12-ci-cd.md#FB-12-SD-R-001)
- [FB-12-SD-R-002 如何设计零停机全球前端部署方案？](../by-domain/12-ci-cd.md#FB-12-SD-R-002)
- [FB-12-SD-R-003 如何为微前端（Micro-Frontend）设计 CI/CD 流水线？](../by-domain/12-ci-cd.md#FB-12-SD-R-003)
- [FB-12-SD-R-005 如何设计企业级前端制品管理与发布火车？](../by-domain/12-ci-cd.md#FB-12-SD-R-005)
- [FB-12-SD-R-007 如何设计支持多租户、多区域的前端 CI/CD 平台？](../by-domain/12-ci-cd.md#FB-12-SD-R-007)
- [FB-12-SD-R-008 如何在 CI/CD 中落地 DevSecOps？](../by-domain/12-ci-cd.md#FB-12-SD-R-008)
- [FB-12-SD-R-009 如何设计发布编排系统，实现自动灰度、观测与回滚？](../by-domain/12-ci-cd.md#FB-12-SD-R-009)
- [FB-12-SD-R-010 如何设计前端制品的不可变性与全链路可追溯架构？](../by-domain/12-ci-cd.md#FB-12-SD-R-010)
- [FB-12-SD-R-011 如何进行企业级 CI/CD 治理，实现模板化与度量驱动？](../by-domain/12-ci-cd.md#FB-12-SD-R-011)
- [FB-12-SD-R-012 如何设计面向 Serverless 与边缘计算的 CI/CD 架构？](../by-domain/12-ci-cd.md#FB-12-SD-R-012)
- [FB-12-SD-R-013 大型 Monorepo 下如何协调 CI/CD、发布火车与版本兼容？](../by-domain/12-ci-cd.md#FB-12-SD-R-013)
- [FB-12-SD-R-014 如何设计 CI/CD 系统的灾难恢复与业务连续性方案？](../by-domain/12-ci-cd.md#FB-12-SD-R-014)
- [FB-12-SD-R-016 如何设计面向 AIOps 的智能 CI/CD 平台？](../by-domain/12-ci-cd.md#FB-12-SD-R-016)
- [FB-12-SD-R-018 如何设计前端制品的零信任安全架构？](../by-domain/12-ci-cd.md#FB-12-SD-R-018)
- [FB-12-SD-R-019 如何构建企业级 CI/CD 平台度量体系？](../by-domain/12-ci-cd.md#FB-12-SD-R-019)
- [FB-12-SD-R-021 如何设计 CI/CD 中的混沌工程实践？](../by-domain/12-ci-cd.md#FB-12-SD-R-021)
- [FB-12-SD-R-022 如何设计前端全链路可观测与发布联动？](../by-domain/12-ci-cd.md#FB-12-SD-R-022)
- [FB-12-SD-R-024 如何设计下一代云原生前端交付平台？](../by-domain/12-ci-cd.md#FB-12-SD-R-024)

### 代码质量与测试（19 道）

- [FB-13-SD-R-001 如何为大型前端项目设计一套完整的测试策略？](../by-domain/13-code-quality.md#FB-13-SD-R-001)
- [FB-13-SD-R-002 Monorepo 中的测试策略与单仓库有什么不同？](../by-domain/13-code-quality.md#FB-13-SD-R-002)
- [FB-13-SD-R-003 如何建立一个可观测的前端质量度量体系？](../by-domain/13-code-quality.md#FB-13-SD-R-003)
- [FB-13-SD-R-004 如何理解测试金字塔与 Testing Trophy？前端应该如何取舍？](../by-domain/13-code-quality.md#FB-13-SD-R-004)
- [FB-13-SD-R-005 微前端架构下如何做好测试？](../by-domain/13-code-quality.md#FB-13-SD-R-005)
- [FB-13-SD-R-006 如何为大型前端项目设计分层测试架构？](../by-domain/13-code-quality.md#FB-13-SD-R-006)
- [FB-13-SD-R-007 如何评估并提升团队测试成熟度？](../by-domain/13-code-quality.md#FB-13-SD-R-007)
- [FB-13-SD-R-008 如何设计前端“测试即文档”体系？](../by-domain/13-code-quality.md#FB-13-SD-R-008)
- [FB-13-SD-R-009 如何在大型组织中建立共享测试服务与平台？](../by-domain/13-code-quality.md#FB-13-SD-R-009)
- [FB-13-SD-R-010 如何设计前端混沌测试与故障演练方案？](../by-domain/13-code-quality.md#FB-13-SD-R-010)
- [FB-13-SD-R-011 AI 辅助编码下，前端测试策略应如何演进？](../by-domain/13-code-quality.md#FB-13-SD-R-011)
- [FB-13-SD-R-012 如何为前端组件库设计测试策略？](../by-domain/13-code-quality.md#FB-13-SD-R-012)
- [FB-13-SD-R-013 跨团队前端项目如何统一质量标准与门禁？](../by-domain/13-code-quality.md#FB-13-SD-R-013)
- [FB-13-SD-R-014 如何为大型前端项目设计自动化回归测试体系？](../by-domain/13-code-quality.md#FB-13-SD-R-014)
- [FB-13-SD-R-015 如何设计前端测试数据管理体系？](../by-domain/13-code-quality.md#FB-13-SD-R-015)
- [FB-13-SD-R-016 如何在前端落地契约测试与 API 版本治理？](../by-domain/13-code-quality.md#FB-13-SD-R-016)
- [FB-13-SD-R-017 如何设计前端灰度发布与线上质量验证机制？](../by-domain/13-code-quality.md#FB-13-SD-R-017)
- [FB-13-SD-R-018 如何设计前端全链路可观测的质量保障体系？](../by-domain/13-code-quality.md#FB-13-SD-R-018)
- [FB-13-SD-R-019 如何为前端低代码平台设计测试策略？](../by-domain/13-code-quality.md#FB-13-SD-R-019)

### 设计系统与组件库（14 道）

- [FB-14-SD-R-001 如何设计一个跨框架（React/Vue/Svelte）的组件库？](../by-domain/14-design-system.md#FB-14-SD-R-001)
- [FB-14-SD-R-002 如何设计一套 DesignOps 与设计系统平台？](../by-domain/14-design-system.md#FB-14-SD-R-002)
- [FB-14-SD-R-003 如何建设组件库的文档与开发者生态？](../by-domain/14-design-system.md#FB-14-SD-R-003)
- [FB-14-SD-R-004 如何构建组件库的视觉回归测试体系？](../by-domain/14-design-system.md#FB-14-SD-R-004)
- [FB-14-SD-R-005 如何设计支持多品牌的设计系统主题架构？](../by-domain/14-design-system.md#FB-14-SD-R-005)
- [FB-14-SD-R-006 如何治理与度量大型组件库的健康度？](../by-domain/14-design-system.md#FB-14-SD-R-006)
- [FB-14-SD-R-007 如何保障设计与研发实现的一致性？](../by-domain/14-design-system.md#FB-14-SD-R-007)
- [FB-14-SD-R-008 如何构建组件库的可访问性工程化体系？](../by-domain/14-design-system.md#FB-14-SD-R-008)
- [FB-14-SD-R-009 如何设计一个企业级设计系统平台（Design System Platform）？](../by-domain/14-design-system.md#FB-14-SD-R-009)
- [FB-14-SD-R-010 如何构建跨团队的组件库贡献与 Review 流程？](../by-domain/14-design-system.md#FB-14-SD-R-010)
- [FB-14-SD-R-011 如何设计支持 AI 辅助的组件库生成与维护流程？](../by-domain/14-design-system.md#FB-14-SD-R-011)
- [FB-14-SD-R-012 如何设计组件库的长期演进与 Deprecation 战略？](../by-domain/14-design-system.md#FB-14-SD-R-012)
- [FB-14-SD-R-013 如何保障组件库在微前端架构下的样式与行为隔离？](../by-domain/14-design-system.md#FB-14-SD-R-013)
- [FB-14-SD-R-014 如何设计一套组件库的语义化版本自动化与变更管理？](../by-domain/14-design-system.md#FB-14-SD-R-014)

### React（13 道）

- [FB-15-SD-R-027 大型 React 项目中如何选择状态管理方案？](../by-domain/15-react.md#FB-15-SD-R-027)
- [FB-15-SD-R-028 如何系统地对 React 应用做性能优化？](../by-domain/15-react.md#FB-15-SD-R-028)
- [FB-15-SD-R-029 微前端架构下使用 React 有哪些关键考虑点？](../by-domain/15-react.md#FB-15-SD-R-029)
- [FB-15-SD-R-030 如何设计一个高质量的 React 组件库？](../by-domain/15-react.md#FB-15-SD-R-030)
- [FB-15-SD-R-057 如何设计一个大型 React 前端工程体系？](../by-domain/15-react.md#FB-15-SD-R-057)
- [FB-15-SD-R-058 如何设计一个 React SSR/SSG 架构？](../by-domain/15-react.md#FB-15-SD-R-058)
- [FB-15-SD-R-059 React 应用如何与微服务后端集成？](../by-domain/15-react.md#FB-15-SD-R-059)
- [FB-15-SD-R-060 大型 React 项目的路由设计应注意什么？](../by-domain/15-react.md#FB-15-SD-R-060)
- [FB-15-SD-R-061 如何设计 React 组件库的 Monorepo 架构？](../by-domain/15-react.md#FB-15-SD-R-061)
- [FB-15-SD-R-062 React 项目中 TypeScript 架构规范应如何制定？](../by-domain/15-react.md#FB-15-SD-R-062)
- [FB-15-SD-R-063 如何设计一个基于 React 的 AI 应用前端架构？](../by-domain/15-react.md#FB-15-SD-R-063)
- [FB-15-SD-R-064 React 跨平台方案如何选型？](../by-domain/15-react.md#FB-15-SD-R-064)
- [FB-15-SD-R-065 React 项目的可观测性体系如何设计？](../by-domain/15-react.md#FB-15-SD-R-065)

### Vue（15 道）

- [FB-16-SD-R-026 如何设计一个大型的 Vue 前端应用架构？](../by-domain/16-vue.md#FB-16-SD-R-026)
- [FB-16-SD-R-027 如何设计一个高质量的 Vue 组件库？](../by-domain/16-vue.md#FB-16-SD-R-027)
- [FB-16-SD-R-028 微前端架构下使用 Vue 有哪些关键考虑点？](../by-domain/16-vue.md#FB-16-SD-R-028)
- [FB-16-SD-R-029 Vue 2 项目如何迁移到 Vue 3？](../by-domain/16-vue.md#FB-16-SD-R-029)
- [FB-16-SD-R-030 Vue 配合 TypeScript 有哪些最佳实践和挑战？](../by-domain/16-vue.md#FB-16-SD-R-030)
- [FB-16-SD-R-031 如何基于 Vue 设计一个低代码表单引擎？](../by-domain/16-vue.md#FB-16-SD-R-031)
- [FB-16-SD-R-032 如何设计 Vue 中后台管理系统的模块架构？](../by-domain/16-vue.md#FB-16-SD-R-032)
- [FB-16-SD-R-033 Vue 应用全球化（i18n）架构如何设计？](../by-domain/16-vue.md#FB-16-SD-R-033)
- [FB-16-SD-R-034 Vue 前端监控与错误追踪体系如何建设？](../by-domain/16-vue.md#FB-16-SD-R-034)
- [FB-16-SD-R-035 Vue 3 + TypeScript + Monorepo 企业级工程架构如何设计？](../by-domain/16-vue.md#FB-16-SD-R-035)
- [FB-16-SD-R-036 Vue 项目 CI/CD 与自动化发布流程如何设计？](../by-domain/16-vue.md#FB-16-SD-R-036)
- [FB-16-SD-R-037 如何基于 Vue 设计一个可扩展的插件系统？](../by-domain/16-vue.md#FB-16-SD-R-037)
- [FB-16-SD-R-038 Vue 服务端渲染（SSR）架构如何设计？](../by-domain/16-vue.md#FB-16-SD-R-038)
- [FB-16-SD-R-039 Vue 中实现设计系统与主题定制的架构方案是什么？](../by-domain/16-vue.md#FB-16-SD-R-039)
- [FB-16-SD-R-040 Vue 应用从 0 到 1 的技术选型与演进路线如何规划？](../by-domain/16-vue.md#FB-16-SD-R-040)

### 跨端技术（16 道）

- [FB-17-SD-R-024 如何设计一个大型跨端应用的架构？](../by-domain/17-cross-platform.md#FB-17-SD-R-024)
- [FB-17-SD-R-025 跨端应用的数据层和状态共享如何设计？](../by-domain/17-cross-platform.md#FB-17-SD-R-025)
- [FB-17-SD-R-026 如何设计一个跨端组件库？](../by-domain/17-cross-platform.md#FB-17-SD-R-026)
- [FB-17-SD-R-027 跨端应用的性能监控和错误处理如何设计？](../by-domain/17-cross-platform.md#FB-17-SD-R-027)
- [FB-17-SD-R-028 跨端应用的 CI/CD 和热更新策略如何设计？](../by-domain/17-cross-platform.md#FB-17-SD-R-028)
- [FB-17-SD-R-029 如何将一个原生或 H5 项目迁移到跨端框架？](../by-domain/17-cross-platform.md#FB-17-SD-R-029)
- [FB-17-SD-R-030 设计一个从 URL 到小程序/H5/App 任意页面打开的通用跳转系统。](../by-domain/17-cross-platform.md#FB-17-SD-R-030)
- [FB-17-SD-R-057 如何设计跨端微前端架构？](../by-domain/17-cross-platform.md#FB-17-SD-R-057)
- [FB-17-SD-R-058 如何构建跨端统一设计系统？](../by-domain/17-cross-platform.md#FB-17-SD-R-058)
- [FB-17-SD-R-059 如何设计跨端应用的灰度发布和热更新平台？](../by-domain/17-cross-platform.md#FB-17-SD-R-059)
- [FB-17-SD-R-060 如何设计跨端应用的监控告警体系？](../by-domain/17-cross-platform.md#FB-17-SD-R-060)
- [FB-17-SD-R-061 跨端技术选型应该建立怎样的决策框架？](../by-domain/17-cross-platform.md#FB-17-SD-R-061)
- [FB-17-SD-R-062 跨端应用的国际化与本地化架构如何设计？](../by-domain/17-cross-platform.md#FB-17-SD-R-062)
- [FB-17-SD-R-063 跨端应用如何与原生应用形成混合架构？](../by-domain/17-cross-platform.md#FB-17-SD-R-063)
- [FB-17-SD-R-064 跨端应用如何建立性能度量体系和性能基线？](../by-domain/17-cross-platform.md#FB-17-SD-R-064)
- [FB-17-SD-R-065 跨端应用的长期演进和技术债务如何治理？](../by-domain/17-cross-platform.md#FB-17-SD-R-065)

### AI 工程化（8 道）

- [FB-18-SD-R-025 如何设计一个前端 AI Copilot 的架构？](../by-domain/18-ai-engineering.md#FB-18-SD-R-025)
- [FB-18-SD-R-026 如何设计一个企业级 AI 中台？](../by-domain/18-ai-engineering.md#FB-18-SD-R-026)
- [FB-18-SD-R-031 如何设计一个多租户 AI SaaS 平台？](../by-domain/18-ai-engineering.md#FB-18-SD-R-031)
- [FB-18-SD-R-032 如何设计一个前端智能体的插件化生态？](../by-domain/18-ai-engineering.md#FB-18-SD-R-032)
- [FB-18-SD-R-033 如何设计一个多模态 AI 中台？](../by-domain/18-ai-engineering.md#FB-18-SD-R-033)
- [FB-18-SD-R-034 如何设计一个面向金融行业的可信 AI 前端架构？](../by-domain/18-ai-engineering.md#FB-18-SD-R-034)
- [FB-18-SD-R-060 设计一个低延迟实时 AI 协作编辑器前端](../by-domain/18-ai-engineering.md#FB-18-SD-R-060)
- [FB-18-SD-R-066 设计一个可插拔的多模型适配层](../by-domain/18-ai-engineering.md#FB-18-SD-R-066)

### Node.js / BFF（15 道）

- [FB-19-SD-R-024 如何设计一个高并发、高可用的 BFF 网关？](../by-domain/19-node-bff.md#FB-19-SD-R-024)
- [FB-19-SD-R-025 如何设计一个基于 Node.js 的微服务架构？](../by-domain/19-node-bff.md#FB-19-SD-R-025)
- [FB-19-SD-R-026 Serverless / Edge 场景下，BFF 应该如何设计？](../by-domain/19-node-bff.md#FB-19-SD-R-026)
- [FB-19-SD-R-027 如何为 Node.js 服务设计一套完整的可观测性体系？](../by-domain/19-node-bff.md#FB-19-SD-R-027)
- [FB-19-SD-R-028 BFF 如何进行分层与领域聚合设计？](../by-domain/19-node-bff.md#FB-19-SD-R-028)
- [FB-19-SD-R-029 Deno、Bun 与 Node.js 相比各有什么优劣？如何选型？](../by-domain/19-node-bff.md#FB-19-SD-R-029)
- [FB-19-SD-R-057 如何设计一个多租户、可水平扩展的 BFF 平台？](../by-domain/19-node-bff.md#FB-19-SD-R-057)
- [FB-19-SD-R-058 如何为 Node.js BFF 设计完整的可观测性体系？](../by-domain/19-node-bff.md#FB-19-SD-R-058)
- [FB-19-SD-R-059 如何为 BFF 设计统一的 API 版本治理与兼容性策略？](../by-domain/19-node-bff.md#FB-19-SD-R-059)
- [FB-19-SD-R-060 如何设计一个支持多端（Web/H5/小程序/App）的 BFF 数据聚合网关？](../by-domain/19-node-bff.md#FB-19-SD-R-060)
- [FB-19-SD-R-061 Node.js 服务在 Kubernetes 中如何做到优雅关闭、弹性伸缩与成本优化？](../by-domain/19-node-bff.md#FB-19-SD-R-061)
- [FB-19-SD-R-062 如何设计基于事件驱动与 CQRS 的 BFF 数据同步架构？](../by-domain/19-node-bff.md#FB-19-SD-R-062)
- [FB-19-SD-R-063 BFF 层如何与 API 网关、Service Mesh、鉴权中心协同工作？](../by-domain/19-node-bff.md#FB-19-SD-R-063)
- [FB-19-SD-R-064 设计一个支持 Serverless / Edge 部署的 BFF 框架需要考虑哪些因素？](../by-domain/19-node-bff.md#FB-19-SD-R-064)
- [FB-19-SD-R-065 单体 BFF 如何演进为领域驱动的微前端 + 微服务协同架构？](../by-domain/19-node-bff.md#FB-19-SD-R-065)

### Git 工作流与变更管理（6 道）

- [FB-20-SD-R-025 如何为千人规模的前端团队设计 Git 分支策略？](../by-domain/20-git-workflow.md#FB-20-SD-R-025)
- [FB-20-SD-R-026 Monorepo 和 Polyrepo 如何选型？](../by-domain/20-git-workflow.md#FB-20-SD-R-026)
- [FB-20-SD-R-028 如何治理大规模 Git 仓库的性能和可维护性？](../by-domain/20-git-workflow.md#FB-20-SD-R-028)
- [FB-20-SD-R-058 如何为全球多地域团队设计 Git 工作流？](../by-domain/20-git-workflow.md#FB-20-SD-R-058)
- [FB-20-SD-R-060 多产品线的统一代码仓应该如何治理？](../by-domain/20-git-workflow.md#FB-20-SD-R-060)
- [FB-20-SD-R-063 微前端仓库应该如何拆分或统一管理？](../by-domain/20-git-workflow.md#FB-20-SD-R-063)

### 开发者体验与工程效能（13 道）

- [FB-21-SD-R-024 为百人前端团队设计一个平台工程（Platform Engineering）体系，关键能力、组织形式和度量指标是什么？](../by-domain/21-dx.md#FB-21-SD-R-024)
- [FB-21-SD-R-025 如何设计一套可扩展的脚手架生态，支持多业务线、多技术栈？](../by-domain/21-dx.md#FB-21-SD-R-025)
- [FB-21-SD-R-027 设计一个 Monorepo 构建缓存和分布式任务调度方案（remote cache + task graph）。](../by-domain/21-dx.md#FB-21-SD-R-027)
- [FB-21-SD-R-029 设计一个前端组件/文档/示例一体化的内部工具链。](../by-domain/21-dx.md#FB-21-SD-R-029)
- [FB-21-SD-R-057 如何设计一个支持多云部署的前端发布平台？](../by-domain/21-dx.md#FB-21-SD-R-057)
- [FB-21-SD-R-059 如何设计一个前端资产（组件/页面）复用平台？](../by-domain/21-dx.md#FB-21-SD-R-059)
- [FB-21-SD-R-061 如何设计一个前端研发效能数据中台？](../by-domain/21-dx.md#FB-21-SD-R-061)
- [FB-21-SD-R-063 如何设计一个低代码搭建平台的开发者体验？](../by-domain/21-dx.md#FB-21-SD-R-063)
- [FB-21-SD-R-065 如何设计一个全球化的前端研发协同平台？](../by-domain/21-dx.md#FB-21-SD-R-065)
- [FB-21-SD-R-085 设计一个面向多 BU 的前端研效中台，核心模块和运营策略是什么？](../by-domain/21-dx.md#FB-21-SD-R-085)
- [FB-21-SD-R-087 设计一个支持 A/B 实验和灰度发布的前端发布与回滚平台。](../by-domain/21-dx.md#FB-21-SD-R-087)
- [FB-21-SD-R-089 设计一个前端工程化的“即服务”（DXaaS）平台。](../by-domain/21-dx.md#FB-21-SD-R-089)
- [FB-21-SD-R-090 设计一个面向大型前端 Monorepo 的 Storybook 文档系统](../by-domain/21-dx.md#FB-21-SD-R-090)

### 部署与 SRE（6 道）

- [FB-22-SD-R-025 设计一个高可用的前端部署平台](../by-domain/22-deployment-sre.md#FB-22-SD-R-025)
- [FB-22-SD-R-026 设计全球化多区域部署架构](../by-domain/22-deployment-sre.md#FB-22-SD-R-026)
- [FB-22-SD-R-027 设计零停机前端发布架构](../by-domain/22-deployment-sre.md#FB-22-SD-R-027)
- [FB-22-SD-R-029 前端灾备与多活架构设计](../by-domain/22-deployment-sre.md#FB-22-SD-R-029)
- [FB-22-SD-R-031 SSR/SSG/CDN 混合部署架构](../by-domain/22-deployment-sre.md#FB-22-SD-R-031)
- [FB-22-SD-R-032 如何设计一个支持多区域部署的 SSG 前端系统，兼顾数据合规与访问延迟？](../by-domain/22-deployment-sre.md#FB-22-SD-R-032)

### 包管理与供应链安全（5 道）

- [FB-23-SD-R-024 如何设计企业级前端依赖治理体系？](../by-domain/23-package-supply-chain.md#FB-23-SD-R-024)
- [FB-23-SD-R-025 如何设计前端供应链安全防御体系？](../by-domain/23-package-supply-chain.md#FB-23-SD-R-025)
- [FB-23-SD-R-027 如何设计 lockfile 安全审计与自动化修复平台？](../by-domain/23-package-supply-chain.md#FB-23-SD-R-027)
- [FB-23-SD-R-030 如何设计前端构建产物的 SBOM 与可追溯体系？](../by-domain/23-package-supply-chain.md#FB-23-SD-R-030)
- [FB-23-SD-R-031 设计一个企业级前端依赖管理平台](../by-domain/23-package-supply-chain.md#FB-23-SD-R-031)

### 前端运维与监控（4 道）

- [FB-24-SD-R-001 如何设计前端 on-call 与告警升级系统？](../by-domain/24-frontend-operations.md#FB-24-SD-R-001)
- [FB-24-SD-R-003 如何设计全球化的前端可观测性与成本优化架构？](../by-domain/24-frontend-operations.md#FB-24-SD-R-003)
- [FB-24-SD-R-004 如何设计多 CDN 监控与自动切换？](../by-domain/24-frontend-operations.md#FB-24-SD-R-004)
- [FB-24-SD-R-006 如何设计从前端到后端的全链路 Trace？](../by-domain/24-frontend-operations.md#FB-24-SD-R-006)

### 系统架构设计（7 道）

- [FB-25-SD-R-001 设计一个组织级前端架构治理体系](../by-domain/25-system-architecture.md#FB-25-SD-R-001)
- [FB-25-SD-R-007 设计一个跨团队共享的前端能力平台](../by-domain/25-system-architecture.md#FB-25-SD-R-007)
- [FB-25-SD-R-008 设计一个全球化多端统一前端架构](../by-domain/25-system-architecture.md#FB-25-SD-R-008)
- [FB-25-SD-R-009 设计一个前端智能化研发平台架构](../by-domain/25-system-architecture.md#FB-25-SD-R-009)
- [FB-25-SD-R-010 设计一个高可用的大促前端保障体系](../by-domain/25-system-architecture.md#FB-25-SD-R-010)
- [FB-25-SD-R-011 假设你要从零设计一个日活千万级的内容社区前端架构，你会关注哪些关键点？](../by-domain/25-system-architecture.md#FB-25-SD-R-011)
- [FB-25-SD-R-012 你如何评价一个前端架构设计的好坏？](../by-domain/25-system-architecture.md#FB-25-SD-R-012)

### 微前端（3 道）

- [FB-26-SD-R-024 从巨石应用迁移到微前端的策略和步骤是什么？](../by-domain/26-micro-frontend.md#FB-26-SD-R-024)
- [FB-26-SD-R-025 设计一个企业级微前端平台，需要包含哪些核心模块？](../by-domain/26-micro-frontend.md#FB-26-SD-R-025)
- [FB-26-SD-R-026 设计一个支持 10 个团队同时开发的微前端平台，你会做哪些关键决策？](../by-domain/26-micro-frontend.md#FB-26-SD-R-026)

### 性能工程（5 道）

- [FB-27-SD-R-001 如何设计一个前端性能监控与告警系统？](../by-domain/27-performance.md#FB-27-SD-R-001)
- [FB-27-SD-R-002 如何设计性能预算（Performance Budget）和 CI 门禁系统？](../by-domain/27-performance.md#FB-27-SD-R-002)
- [FB-27-SD-R-003 如何为大型前端项目建立性能基线（Performance Baseline）？](../by-domain/27-performance.md#FB-27-SD-R-003)
- [FB-27-SD-R-006 如何设计一个前端性能可视化大盘（Performance Dashboard）？](../by-domain/27-performance.md#FB-27-SD-R-006)
- [FB-27-SD-R-007 设计一个面向百万级 DAU 的内容平台的性能优化体系。](../by-domain/27-performance.md#FB-27-SD-R-007)

### 质量保障（6 道）

- [FB-28-SD-R-025 如何为一家中型互联网公司设计前端质量保障体系？](../by-domain/28-quality.md#FB-28-SD-R-025)
- [FB-28-SD-R-026 微前端或 Monorepo 场景下如何制定测试策略？](../by-domain/28-quality.md#FB-28-SD-R-026)
- [FB-28-SD-R-028 如何架构大规模 E2E 测试的并行与稳定性？](../by-domain/28-quality.md#FB-28-SD-R-028)
- [FB-28-SD-R-031 如何设计一套生产环境发布策略？](../by-domain/28-quality.md#FB-28-SD-R-031)
- [FB-28-SD-R-032 如何构建韧性工程质量体系？](../by-domain/28-quality.md#FB-28-SD-R-032)
- [FB-28-SD-R-033 设计一个前端质量保障平台，你会包含哪些模块？](../by-domain/28-quality.md#FB-28-SD-R-033)

### 数据与状态管理（4 道）

- [FB-29-SD-R-025 如何设计一个前端数据层抽象层，支持多数据源切换和缓存？](../by-domain/29-data-state.md#FB-29-SD-R-025)
- [FB-29-SD-R-026 如何为大型 SPA 设计状态管理架构？](../by-domain/29-data-state.md#FB-29-SD-R-026)
- [FB-29-SD-R-030 设计一个支持离线优先的协作编辑状态同步系统](../by-domain/29-data-state.md#FB-29-SD-R-030)
- [FB-29-SD-R-031 如何设计前端 URL 状态管理方案？](../by-domain/29-data-state.md#FB-29-SD-R-031)

### 可观测性（4 道）

- [FB-30-SD-R-025 设计一个前端 RUM 指标体系与 Dashboard](../by-domain/30-observability.md#FB-30-SD-R-025)
- [FB-30-SD-R-026 如何从零构建前端 SRE 值班（on-call）与事故响应机制？](../by-domain/30-observability.md#FB-30-SD-R-026)
- [FB-30-SD-R-028 设计一个支持多租户、多环境的前端埋点与可观测中台](../by-domain/30-observability.md#FB-30-SD-R-028)
- [FB-30-SD-R-031 设计一个前端灰度发布/回滚的可观测性方案](../by-domain/30-observability.md#FB-30-SD-R-031)

### 安全架构（3 道）

- [FB-31-SD-R-001 如何为大型企业设计前端安全架构？](../by-domain/31-security-architecture.md#FB-31-SD-R-001)
- [FB-31-SD-R-002 微前端场景下如何做好安全隔离？](../by-domain/31-security-architecture.md#FB-31-SD-R-002)
- [FB-31-SD-R-003 前后端安全边界应该如何划分？](../by-domain/31-security-architecture.md#FB-31-SD-R-003)

### 实时与协同（6 道）

- [FB-32-SD-R-001 如何设计一个实时协同文档系统？](../by-domain/32-real-time.md#FB-32-SD-R-001)
- [FB-32-SD-R-002 如何设计一个实时聊天系统？](../by-domain/32-real-time.md#FB-32-SD-R-002)
- [FB-32-SD-R-003 如何设计一个实时视频会议系统？](../by-domain/32-real-time.md#FB-32-SD-R-003)
- [FB-32-SD-R-004 实时系统与离线同步如何结合？](../by-domain/32-real-time.md#FB-32-SD-R-004)
- [FB-32-SD-R-005 如何设计一个实时协同白板？](../by-domain/32-real-time.md#FB-32-SD-R-005)
- [FB-32-SD-R-006 实时系统的监控与降级策略如何设计？](../by-domain/32-real-time.md#FB-32-SD-R-006)

### 国际化（4 道）

- [FB-33-SD-R-001 如何设计全球化前端架构？](../by-domain/33-internationalization.md#FB-33-SD-R-001)
- [FB-33-SD-R-002 如何设计一条翻译流水线？](../by-domain/33-internationalization.md#FB-33-SD-R-002)
- [FB-33-SD-R-003 如何设计国际化组件库？](../by-domain/33-internationalization.md#FB-33-SD-R-003)
- [FB-33-SD-R-004 多语言内容管理系统（CMS）如何设计？](../by-domain/33-internationalization.md#FB-33-SD-R-004)

### 可视化与图形（4 道）

- [FB-34-SD-R-024 设计一个 BI 可视化平台的前端架构](../by-domain/34-visualization-graphics.md#FB-34-SD-R-024)
- [FB-34-SD-R-025 设计一个 3D 数字孪生大屏的渲染架构](../by-domain/34-visualization-graphics.md#FB-34-SD-R-025)
- [FB-34-SD-R-026 如何设计一个可扩展的可视化组件库？](../by-domain/34-visualization-graphics.md#FB-34-SD-R-026)
- [FB-34-SD-R-028 游戏图形中的场景图、ECS、渲染循环、LOD 对前端可视化架构有何启发？](../by-domain/34-visualization-graphics.md#FB-34-SD-R-028)

### Serverless/Edge（4 道）

- [FB-35-SD-R-001 如何设计一个 Serverless 前端架构？](../by-domain/35-serverless-edge.md#FB-35-SD-R-001)
- [FB-35-SD-R-002 如何设计一个 Edge 网关？](../by-domain/35-serverless-edge.md#FB-35-SD-R-002)
- [FB-35-SD-R-003 Serverless 与容器/传统服务器如何取舍？](../by-domain/35-serverless-edge.md#FB-35-SD-R-003)
- [FB-35-SD-R-004 如何设计边缘与中心协同架构？](../by-domain/35-serverless-edge.md#FB-35-SD-R-004)

### 前端数据工程（6 道）

- [FB-36-SD-R-001 如何设计一个前端数据平台？](../by-domain/36-data-engineering.md#FB-36-SD-R-001)
- [FB-36-SD-R-002 如何设计一个埋点与采集系统？](../by-domain/36-data-engineering.md#FB-36-SD-R-002)
- [FB-36-SD-R-003 如何设计一个用户行为分析系统？](../by-domain/36-data-engineering.md#FB-36-SD-R-003)
- [FB-36-SD-R-004 如何设计一个 A/B 实验平台？](../by-domain/36-data-engineering.md#FB-36-SD-R-004)
- [FB-36-SD-R-005 如何设计一个数据质量监控体系？](../by-domain/36-data-engineering.md#FB-36-SD-R-005)
- [FB-36-SD-R-006 如何设计一个实时数据看板？](../by-domain/36-data-engineering.md#FB-36-SD-R-006)

### 业务洞察（4 道）

- [FB-37-SD-R-001 如何设计一个可支撑多业务线（B2B、B2C、SaaS）的前端商业化中台架构？](../by-domain/37-business.md#FB-37-SD-R-001)
- [FB-37-SD-R-002 设计一套前端埋点与业务指标度量体系，覆盖 GMV、ARPU、LTV、CAC 等核心指标。](../by-domain/37-business.md#FB-37-SD-R-002)
- [FB-37-SD-R-004 设计一个支持快速试错与灰度发布的增长实验工程平台。](../by-domain/37-business.md#FB-37-SD-R-004)
- [FB-37-SD-R-006 设计一个面向 SaaS 产品的多租户、可配置、可定价的前端交付架构。](../by-domain/37-business.md#FB-37-SD-R-006)

### 团队领导力（2 道）

- [FB-38-SD-R-001 为一家 500 人前端组织设计分层技术治理与团队架构](../by-domain/38-team.md#FB-38-SD-R-001)
- [FB-38-SD-R-005 设计一个面向全球远程团队的技术文化与协作基础设施蓝图](../by-domain/38-team.md#FB-38-SD-R-005)

### 技术战略（2 道）

- [FB-39-SD-R-001 请设计一个 3 年前端技术战略，支撑业务从 0 到 100 的规模化增长。](../by-domain/39-strategy.md#FB-39-SD-R-001)
- [FB-39-SD-R-003 如何设计 AI 时代的前端技术战略？](../by-domain/39-strategy.md#FB-39-SD-R-003)

### 沟通表达（3 道）

- [FB-40-SD-R-002 设计一个技术方案评审与决策流程](../by-domain/40-communication.md#FB-40-SD-R-002)
- [FB-40-SD-R-004 设计一套危机沟通预案](../by-domain/40-communication.md#FB-40-SD-R-004)
- [FB-40-SD-R-007 设计一个跨部门重大技术项目的治理与沟通框架](../by-domain/40-communication.md#FB-40-SD-R-007)

### 项目管理（2 道）

- [FB-41-SD-R-001 如何设计一个支持多业务线的前端项目组合管理（Portfolio）体系？](../by-domain/41-project-management.md#FB-41-SD-R-001)
- [FB-41-SD-R-003 设计一个大型前端项目的技术风险管理与灾备方案。](../by-domain/41-project-management.md#FB-41-SD-R-003)

### 招聘（3 道）

- [FB-42-SD-R-025 如何设计一个企业级招聘中台？](../by-domain/42-hiring.md#FB-42-SD-R-025)
- [FB-42-SD-R-027 如何设计全球化/远程团队的人才招聘体系？](../by-domain/42-hiring.md#FB-42-SD-R-027)
- [FB-42-SD-R-029 如何设计 AI 辅助招聘系统？需要注意哪些伦理问题？](../by-domain/42-hiring.md#FB-42-SD-R-029)

### 技术品牌与布道（2 道）

- [FB-43-SD-R-001 设计一个公司级技术品牌中台：整合博客、公众号、开源、社区、内部分享。](../by-domain/43-tech-branding.md#FB-43-SD-R-001)
- [FB-43-SD-R-003 设计一个“技术布道师团队”的编制、目标、考核与资源协作机制。](../by-domain/43-tech-branding.md#FB-43-SD-R-003)

### 技术治理与合规（3 道）

- [FB-44-SD-R-001 设计一个企业级前端合规体系。](../by-domain/44-tech-governance.md#FB-44-SD-R-001)
- [FB-44-SD-R-002 如何设计跨团队技术治理组织与运作机制？](../by-domain/44-tech-governance.md#FB-44-SD-R-002)
- [FB-44-SD-R-003 设计一个前端安全合规左移体系。](../by-domain/44-tech-governance.md#FB-44-SD-R-003)

### 小程序（3 道）

- [FB-45-SD-R-001 如何设计一个跨端小程序框架（如 Taro / UniApp 的思路）？](../by-domain/45-mini-program.md#FB-45-SD-R-001)
- [FB-45-SD-R-003 如何构建小程序的监控、埋点与灰度发布体系？](../by-domain/45-mini-program.md#FB-45-SD-R-003)
- [FB-45-SD-R-007 如何设计一个多平台小程序容器架构？](../by-domain/45-mini-program.md#FB-45-SD-R-007)

### 鸿蒙 ArkTS / HarmonyOS（5 道）

- [FB-46-SD-R-025 如何设计一个鸿蒙多端协同的阅读应用？](../by-domain/46-harmonyos.md#FB-46-SD-R-025)
- [FB-46-SD-R-026 一个鸿蒙应用从 0 到 1，你会如何做技术选型？](../by-domain/46-harmonyos.md#FB-46-SD-R-026)
- [FB-46-SD-R-027 如何设计鸿蒙卡片与原子化服务的整体架构？](../by-domain/46-harmonyos.md#FB-46-SD-R-027)
- [FB-46-SD-R-028 将现有跨平台应用迁移到鸿蒙，你会如何制定策略？](../by-domain/46-harmonyos.md#FB-46-SD-R-028)
- [FB-46-SD-R-031 设计一个面向企业内部的鸿蒙办公协同平台架构。](../by-domain/46-harmonyos.md#FB-46-SD-R-031)

### Flutter（4 道）

- [FB-47-SD-R-001 如何设计一个可维护、可扩展的 Flutter 大型应用架构？](../by-domain/47-flutter.md#FB-47-SD-R-001)
- [FB-47-SD-R-003 Flutter 国际化（i18n）和无障碍（a11y）应该如何架构？](../by-domain/47-flutter.md#FB-47-SD-R-003)
- [FB-47-SD-R-006 Flutter 大规模应用中，状态管理应该如何分层与治理？](../by-domain/47-flutter.md#FB-47-SD-R-006)
- [FB-47-SD-R-007 如何开发一个 Flutter 插件？Federated Plugin 和 PlatformView 分别解决什么问题？](../by-domain/47-flutter.md#FB-47-SD-R-007)

### Electron（3 道）

- [FB-48-SD-R-001 如何设计一个大型 Electron 桌面应用的整体架构？](../by-domain/48-electron.md#FB-48-SD-R-001)
- [FB-48-SD-R-002 如何设计一个安全的 Electron 应用架构？](../by-domain/48-electron.md#FB-48-SD-R-002)
- [FB-48-SD-R-003 如何设计 Electron 的自动更新与灰度分发策略？](../by-domain/48-electron.md#FB-48-SD-R-003)

### WebAssembly（1 道）

- [FB-49-SD-R-006 设计一个跨语言的“WASM 插件平台”，支持前端动态加载第三方扩展](../by-domain/49-webassembly.md#FB-49-SD-R-006)

### WebGPU / 图形学（2 道）

- [FB-50-SD-R-024 如何设计一个基于 WebGPU 的轻量级渲染引擎？](../by-domain/50-webgpu-graphics.md#FB-50-SD-R-024)
- [FB-50-SD-R-028 如何设计 Three.js 与自研 WebGPU 引擎的集成架构？](../by-domain/50-webgpu-graphics.md#FB-50-SD-R-028)

### 多媒体（Multimedia）（5 道）

- [FB-51-SD-R-025 设计一个支持 HLS/DASH/WebRTC 的多协议播放器架构](../by-domain/51-multimedia.md#FB-51-SD-R-025)
- [FB-51-SD-R-026 设计一个低延迟直播系统的前端方案](../by-domain/51-multimedia.md#FB-51-SD-R-026)
- [FB-51-SD-R-027 设计一个浏览器端音视频剪辑工具的技术架构](../by-domain/51-multimedia.md#FB-51-SD-R-027)
- [FB-51-SD-R-029 设计一个支持 DRM 的商业视频播放器安全架构](../by-domain/51-multimedia.md#FB-51-SD-R-029)
- [FB-51-SD-R-030 如何评估和监控一个多媒体前端平台的质量？](../by-domain/51-multimedia.md#FB-51-SD-R-030)

### 低代码（5 道）

- [FB-52-SD-R-001 如何设计一个企业级低代码平台的整体架构？](../by-domain/52-low-code.md#FB-52-SD-R-001)
- [FB-52-SD-R-002 低代码平台如何与企业现有业务系统集成？](../by-domain/52-low-code.md#FB-52-SD-R-002)
- [FB-52-SD-R-003 如何建立低代码平台的平台化治理体系？](../by-domain/52-low-code.md#FB-52-SD-R-003)
- [FB-52-SD-R-005 如何设计 AI 辅助搭建能力？](../by-domain/52-low-code.md#FB-52-SD-R-005)
- [FB-52-SD-R-007 如何设计低代码平台的扩展性与插件化架构？](../by-domain/52-low-code.md#FB-52-SD-R-007)

### 计算机基础（5 道）

- [FB-53-SD-R-001 如何设计一个短链服务？](../by-domain/53-computer-science.md#FB-53-SD-R-001)
- [FB-53-SD-R-002 从系统架构角度如何设计一个秒杀系统？](../by-domain/53-computer-science.md#FB-53-SD-R-002)
- [FB-53-SD-R-003 如何设计一个实时排行榜？](../by-domain/53-computer-science.md#FB-53-SD-R-003)
- [FB-53-SD-R-004 高并发下的限流与降级策略如何设计？](../by-domain/53-computer-science.md#FB-53-SD-R-004)
- [FB-53-SD-R-005 分布式一致性基础有哪些？](../by-domain/53-computer-science.md#FB-53-SD-R-005)

### 行业特化（3 道）

- [FB-56-SD-R-001 设计一个全球化多行业适配的前端中台](../by-domain/56-industry.md#FB-56-SD-R-001)
- [FB-56-SD-R-003 设计一个行业级组件库/设计系统](../by-domain/56-industry.md#FB-56-SD-R-003)
- [FB-56-SD-R-006 设计一个跨行业数据可视化平台](../by-domain/56-industry.md#FB-56-SD-R-006)

