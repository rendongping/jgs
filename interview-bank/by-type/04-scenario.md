# 场景设计题

> 本文件按题型收录 **场景设计题** 相关前端面试题索引。
> 共收录 **274** 道题（基础 15 / 进阶 108 / 深入 94 / 架构 57）。
> 每道题都附带完整参考答案与评分维度，点击链接可查看原文。

## 基础题（15 道）{#basic}

### JavaScript（1 道）

- [FB-01-SC-B-001 解释一下闭包，并举一个实际应用场景。](../by-domain/01-javascript.md#FB-01-SC-B-001)

### 计算机网络（1 道）

- [FB-04-SC-B-001 TCP 和 UDP 有什么区别？各适用于什么场景？](../by-domain/04-network.md#FB-04-SC-B-001)

### Vue（1 道）

- [FB-16-SC-B-001 如何封装一个可复用的 Vue Button 组件？](../by-domain/16-vue.md#FB-16-SC-B-001)

### AI 工程化（2 道）

- [FB-18-SC-B-036 如何为技术文档站点设计 AI 问答助手？](../by-domain/18-ai-engineering.md#FB-18-SC-B-036)
- [FB-18-SC-B-037 生产环境中，前端为什么不建议直接调用大模型 API？](../by-domain/18-ai-engineering.md#FB-18-SC-B-037)

### Node.js / BFF（1 道）

- [FB-19-SC-B-001 生产环境为什么不建议前端直接调用后端通用服务？](../by-domain/19-node-bff.md#FB-19-SC-B-001)

### Git 工作流与变更管理（1 道）

- [FB-20-SC-B-001 解释 git merge 和 git rebase 的区别及适用场景。](../by-domain/20-git-workflow.md#FB-20-SC-B-001)

### 开发者体验与工程效能（1 道）

- [FB-21-SC-B-001 如何为前端构建流水线设计可观测性方案以持续优化构建性能](../by-domain/21-dx.md#FB-21-SC-B-001)

### 部署与 SRE（1 道）

- [FB-22-SC-B-001 电商大促期间前端静态资源带宽突增，如何设计 CDN 带宽应急方案？](../by-domain/22-deployment-sre.md#FB-22-SC-B-001)

### 包管理与供应链安全（1 道）

- [FB-23-SC-B-001 如何为 pnpm 项目启用 npm provenance 并保证 lockfile 与构建来源可审计？](../by-domain/23-package-supply-chain.md#FB-23-SC-B-001)

### 实时与协同（1 道）

- [FB-32-SC-B-001 WebSocket 和 SSE 有什么区别？分别适用什么场景？](../by-domain/32-real-time.md#FB-32-SC-B-001)

### Serverless/Edge（1 道）

- [FB-35-SC-B-001 Edge 计算适合哪些前端场景？](../by-domain/35-serverless-edge.md#FB-35-SC-B-001)

### 团队领导力（1 道）

- [FB-38-SC-B-006 两位 senior 因技术方案争执不下，作为 TL 你怎么介入？](../by-domain/38-team.md#FB-38-SC-B-006)

### 招聘（1 道）

- [FB-42-SC-B-007 面试官在面试中常犯的偏见有哪些？如何避免？](../by-domain/42-hiring.md#FB-42-SC-B-007)

### 低代码（1 道）

- [FB-52-SC-B-008 如何设计一个低代码表单设计器？](../by-domain/52-low-code.md#FB-52-SC-B-008)

## 进阶题（108 道）{#advanced}

### TypeScript（1 道）

- [FB-02-SC-A-001 如何用 TypeScript 设计一个可辨识联合（Discriminated Union）处理业务状态？](../by-domain/02-typescript.md#FB-02-SC-A-001)

### Browser（1 道）

- [FB-03-SC-A-001 如何设计一个支持离线访问的 Web 应用缓存策略？](../by-domain/03-browser.md#FB-03-SC-A-001)

### 计算机网络（1 道）

- [FB-04-SC-A-001 网络请求失败时，如何设计重试与降级策略？](../by-domain/04-network.md#FB-04-SC-A-001)

### Web 安全（1 道）

- [FB-05-SC-A-001 如何安全地实现一个富文本编辑器？](../by-domain/05-security.md#FB-05-SC-A-001)

### HTML/CSS（2 道）

- [FB-06-SC-A-001 设计一个响应式导航栏。](../by-domain/06-html-css.md#FB-06-SC-A-001)
- [FB-06-SC-A-002 解释一下容器查询（Container Query）及其使用场景。](../by-domain/06-html-css.md#FB-06-SC-A-002)

### 可访问性（a11y）（1 道）

- [FB-07-SC-A-001 设计一个带错误提示的可访问表单。](../by-domain/07-a11y.md#FB-07-SC-A-001)

### Monorepo（5 道）

- [FB-11-SC-A-001 设计一个 Monorepo 下组件库的发布流程。](../by-domain/11-monorepo.md#FB-11-SC-A-001)
- [FB-11-SC-A-002 设计一个 Monorepo 下共享 hooks 包的管理方案。](../by-domain/11-monorepo.md#FB-11-SC-A-002)
- [FB-11-SC-A-003 设计一个 Monorepo 中共享 types 包的演进方案。](../by-domain/11-monorepo.md#FB-11-SC-A-003)
- [FB-11-SC-A-016 设计一个 Monorepo 下共享 icons / assets 资源包的管理方案。](../by-domain/11-monorepo.md#FB-11-SC-A-016)
- [FB-11-SC-A-022 设计一个 Monorepo 下共享设计 tokens 和主题包的管理方案。](../by-domain/11-monorepo.md#FB-11-SC-A-022)

### CI/CD（2 道）

- [FB-12-SC-A-018 如何设计前端项目的多环境配置管理？](../by-domain/12-ci-cd.md#FB-12-SC-A-018)
- [FB-12-SC-A-023 如何为前端组件库设计发布流水线？](../by-domain/12-ci-cd.md#FB-12-SC-A-023)

### 代码质量与测试（4 道）

- [FB-13-SC-A-001 如何为一个包含 API 调用的表单组件设计集成测试？](../by-domain/13-code-quality.md#FB-13-SC-A-001)
- [FB-13-SC-A-002 如何测试一个上传文件组件？](../by-domain/13-code-quality.md#FB-13-SC-A-002)
- [FB-13-SC-A-003 如何为一个带防抖的搜索输入框设计测试？](../by-domain/13-code-quality.md#FB-13-SC-A-003)
- [FB-13-SC-A-004 如何为一个使用 localStorage 的自定义 Hook 设计测试？](../by-domain/13-code-quality.md#FB-13-SC-A-004)

### 设计系统与组件库（16 道）

- [FB-14-SC-A-001 如何基于 Design Token 实现多主题切换？](../by-domain/14-design-system.md#FB-14-SC-A-001)
- [FB-14-SC-A-002 设计一个组件库的深色模式（Dark Mode）方案时需要考虑哪些问题？](../by-domain/14-design-system.md#FB-14-SC-A-002)
- [FB-14-SC-A-003 如何提高组件库的可组合性（Composability）？](../by-domain/14-design-system.md#FB-14-SC-A-003)
- [FB-14-SC-A-004 设计一个通用 Modal 组件时，API 应该如何设计？](../by-domain/14-design-system.md#FB-14-SC-A-004)
- [FB-14-SC-A-005 如何为组件库设计一致且可访问的键盘导航？](../by-domain/14-design-system.md#FB-14-SC-A-005)
- [FB-14-SC-A-006 如何设计支持响应式的组件？](../by-domain/14-design-system.md#FB-14-SC-A-006)
- [FB-14-SC-A-007 如何建立高效的 design-dev handoff（设计-研发交付）流程？](../by-domain/14-design-system.md#FB-14-SC-A-007)
- [FB-14-SC-A-008 如何设计一个支持多尺寸变体的 Button 组件？](../by-domain/14-design-system.md#FB-14-SC-A-008)
- [FB-14-SC-A-009 设计一个通用 Form 组件时，如何统一校验与错误提示？](../by-domain/14-design-system.md#FB-14-SC-A-009)
- [FB-14-SC-A-010 如何为组件库设计一套图标按需加载方案？](../by-domain/14-design-system.md#FB-14-SC-A-010)
- [FB-14-SC-A-011 设计一个可复用的 Table 组件需要考虑哪些扩展点？](../by-domain/14-design-system.md#FB-14-SC-A-011)
- [FB-14-SC-A-012 如何在组件库中实现平滑的动画与过渡效果？](../by-domain/14-design-system.md#FB-14-SC-A-012)
- [FB-14-SC-A-013 如何设计一个通用 Notification/Toast 组件？](../by-domain/14-design-system.md#FB-14-SC-A-013)
- [FB-14-SC-A-014 如何为组件库设计一致的间距与布局系统？](../by-domain/14-design-system.md#FB-14-SC-A-014)
- [FB-14-SC-A-015 组件库如何与 TypeScript 类型系统深度结合？](../by-domain/14-design-system.md#FB-14-SC-A-015)
- [FB-14-SC-A-016 如何设计组件库的按需加载（Tree Shaking + 按需引入）？](../by-domain/14-design-system.md#FB-14-SC-A-016)

### Vue（1 道）

- [FB-16-SC-A-001 如何设计一个带搜索和筛选的商品列表组件？](../by-domain/16-vue.md#FB-16-SC-A-001)

### 跨端技术（2 道）

- [FB-17-SC-A-015 跨端技术选型时应该考虑哪些因素？](../by-domain/17-cross-platform.md#FB-17-SC-A-015)
- [FB-17-SC-A-042 跨端应用的登录态如何同步和保持一致？](../by-domain/17-cross-platform.md#FB-17-SC-A-042)

### AI 工程化（2 道）

- [FB-18-SC-A-001 如何为前端团队设计一个 AI 代码审查助手？](../by-domain/18-ai-engineering.md#FB-18-SC-A-001)
- [FB-18-SC-A-044 设计一个智能表单填充功能](../by-domain/18-ai-engineering.md#FB-18-SC-A-044)

### Git 工作流与变更管理（4 道）

- [FB-20-SC-A-012 遇到 Git 冲突时，你的解决流程是什么？如何预防冲突？](../by-domain/20-git-workflow.md#FB-20-SC-A-012)
- [FB-20-SC-A-041 代码审查中发现敏感信息已提交到仓库，如何处理？](../by-domain/20-git-workflow.md#FB-20-SC-A-041)
- [FB-20-SC-A-044 线上发现缺陷，如何回滚已合并到 main 的提交？](../by-domain/20-git-workflow.md#FB-20-SC-A-044)
- [FB-20-SC-A-048 多人协作时，如何优雅地处理 rebase 后的冲突？](../by-domain/20-git-workflow.md#FB-20-SC-A-048)

### 开发者体验与工程效能（7 道）

- [FB-21-SC-A-014 团队里不同成员使用 VS Code / WebStorm，如何保证编辑器配置和扩展一致？](../by-domain/21-dx.md#FB-21-SC-A-014)
- [FB-21-SC-A-040 新工具引入团队时，如何制定推广策略？](../by-domain/21-dx.md#FB-21-SC-A-040)
- [FB-21-SC-A-043 跨团队协作时，如何管理 API 文档以提升 DX？](../by-domain/21-dx.md#FB-21-SC-A-043)
- [FB-21-SC-A-047 如何设计一个有效的内部技术分享机制？](../by-domain/21-dx.md#FB-21-SC-A-047)
- [FB-21-SC-A-072 新成员入职第一周配不好环境，如何设计一键 onboarding 方案？](../by-domain/21-dx.md#FB-21-SC-A-072)
- [FB-21-SC-A-077 多个业务线共用组件库但需求冲突，如何设计治理机制？](../by-domain/21-dx.md#FB-21-SC-A-077)
- [FB-21-SC-A-078 在 Vite 项目中需要支持 Babel 插件时，如何设计集成方案而不显著牺牲构建速度](../by-domain/21-dx.md#FB-21-SC-A-078)

### 部署与 SRE（3 道）

- [FB-22-SC-A-010 蓝绿部署在前端如何实现？有哪些风险？](../by-domain/22-deployment-sre.md#FB-22-SC-A-010)
- [FB-22-SC-A-011 如何设计前端金丝雀发布方案？](../by-domain/22-deployment-sre.md#FB-22-SC-A-011)
- [FB-22-SC-A-012 基于 OSS 托管前端静态资源，如何设计多环境、多版本的发布架构？](../by-domain/22-deployment-sre.md#FB-22-SC-A-012)

### 包管理与供应链安全（1 道）

- [FB-23-SC-A-001 前端 CDN 资源如何引入 Subresource Integrity（SRI）并与 CI 构建流程集成？](../by-domain/23-package-supply-chain.md#FB-23-SC-A-001)

### 前端运维与监控（3 道）

- [FB-24-SC-A-001 如何在项目中接入 Sentry 并设置性能监控？](../by-domain/24-frontend-operations.md#FB-24-SC-A-001)
- [FB-24-SC-A-005 如何设计前端告警策略，避免告警疲劳？](../by-domain/24-frontend-operations.md#FB-24-SC-A-005)
- [FB-24-SC-A-007 前端服务降级有哪些常见策略？](../by-domain/24-frontend-operations.md#FB-24-SC-A-007)

### 系统架构设计（4 道）

- [FB-25-SC-A-001 你负责一个大型中后台系统，如何进行模块拆分和分层？](../by-domain/25-system-architecture.md#FB-25-SC-A-001)
- [FB-25-SC-A-009 设计一个前端配置中心（Feature Flag）系统](../by-domain/25-system-architecture.md#FB-25-SC-A-009)
- [FB-25-SC-A-010 设计一个前端埋点与监控 SDK 架构](../by-domain/25-system-architecture.md#FB-25-SC-A-010)
- [FB-25-SC-A-011 如何设计一个支持多租户的前端应用？](../by-domain/25-system-architecture.md#FB-25-SC-A-011)

### 微前端（1 道）

- [FB-26-SC-A-013 设计一个子应用间通信方案，比较不同通信方式的适用场景。](../by-domain/26-micro-frontend.md#FB-26-SC-A-013)

### 性能工程（2 道）

- [FB-27-SC-A-006 预加载（preload）、预取（prefetch）、预连接（preconnect）有什么区别？如何在一个电商详情页中使用它们？](../by-domain/27-performance.md#FB-27-SC-A-006)
- [FB-27-SC-A-007 节流和防抖有什么区别？分别适用什么场景？](../by-domain/27-performance.md#FB-27-SC-A-007)

### 可观测性（3 道）

- [FB-30-SC-A-009 如果一个页面白屏，如何利用可观测性数据定位根因？](../by-domain/30-observability.md#FB-30-SC-A-009)
- [FB-30-SC-A-014 如何处理前端高频埋点/性能数据上报不阻塞业务？](../by-domain/30-observability.md#FB-30-SC-A-014)
- [FB-30-SC-A-015 遇到线上故障，你的处理流程是什么？](../by-domain/30-observability.md#FB-30-SC-A-015)

### 可视化与图形（1 道）

- [FB-34-SC-A-010 一个 10 万数据点的散点图在 SVG/Canvas 中卡顿，你会从哪些层面优化？](../by-domain/34-visualization-graphics.md#FB-34-SC-A-010)

### 业务洞察（4 道）

- [FB-37-SC-A-001 如何为 B2B SaaS 产品的“试用转付费”设计前端数据埋点与指标看板？](../by-domain/37-business.md#FB-37-SC-A-001)
- [FB-37-SC-A-003 需求优先级排序常见框架有哪些？如何应用于前端排期？](../by-domain/37-business.md#FB-37-SC-A-003)
- [FB-37-SC-A-005 如果电商大促页面转化率低于预期，前端应从哪些维度排查？](../by-domain/37-business.md#FB-37-SC-A-005)
- [FB-37-SC-A-008 成本效益分析中，如何量化前端性能优化带来的业务价值？](../by-domain/37-business.md#FB-37-SC-A-008)

### 团队领导力（5 道）

- [FB-38-SC-A-001 如何从 0 到 1 组建一支高效的前端团队？](../by-domain/38-team.md#FB-38-SC-A-001)
- [FB-38-SC-A-003 1on1 中下属只谈业务不谈个人，如何引导深入沟通？](../by-domain/38-team.md#FB-38-SC-A-003)
- [FB-38-SC-A-004 跨职能协作中前端团队与产品、后端、测试经常冲突，如何建立协作机制？](../by-domain/38-team.md#FB-38-SC-A-004)
- [FB-38-SC-A-006 团队士气低落时，有哪些可操作的提振动作？](../by-domain/38-team.md#FB-38-SC-A-006)
- [FB-38-SC-A-007 远程 / hybrid 团队中如何保证信息透明与沟通效率？](../by-domain/38-team.md#FB-38-SC-A-007)

### 技术战略（3 道）

- [FB-39-SC-A-001 如何为前端团队制定一份可落地的年度技术规划？](../by-domain/39-strategy.md#FB-39-SC-A-001)
- [FB-39-SC-A-003 面对一个创新型前端项目，如何设计孵化流程？](../by-domain/39-strategy.md#FB-39-SC-A-003)
- [FB-39-SC-A-005 如何判断一个业务领域是否值得做中台/平台化？](../by-domain/39-strategy.md#FB-39-SC-A-005)

### 沟通表达（6 道）

- [FB-40-SC-A-001 产品提出不可能完成的 deadline，你如何沟通？](../by-domain/40-communication.md#FB-40-SC-A-001)
- [FB-40-SC-A-002 两位 senior 对技术方案意见冲突，你如何协调？](../by-domain/40-communication.md#FB-40-SC-A-002)
- [FB-40-SC-A-003 如何向非技术人员解释技术风险？](../by-domain/40-communication.md#FB-40-SC-A-003)
- [FB-40-SC-A-004 如何推动团队采纳一项有争议的技术决策？](../by-domain/40-communication.md#FB-40-SC-A-004)
- [FB-40-SC-A-005 前后端接口责任边界不清，怎么处理？](../by-domain/40-communication.md#FB-40-SC-A-005)
- [FB-40-SC-A-008 项目延期，如何同步业务和老板？](../by-domain/40-communication.md#FB-40-SC-A-008)

### 项目管理（4 道）

- [FB-41-SC-A-001 需求方频繁变更需求，作为前端负责人你如何应对？](../by-domain/41-project-management.md#FB-41-SC-A-001)
- [FB-41-SC-A-002 项目进度落后两周，你将如何制定追赶计划？](../by-domain/41-project-management.md#FB-41-SC-A-002)
- [FB-41-SC-A-003 前端项目上线后出现严重线上 Bug，如何进行应急响应与根因分析？](../by-domain/41-project-management.md#FB-41-SC-A-003)
- [FB-41-SC-A-008 团队成员能力参差不齐，如何分配任务并保证交付质量？](../by-domain/41-project-management.md#FB-41-SC-A-008)

### 招聘（3 道）

- [FB-42-SC-A-009 如何为一个新业务设计完整的面试流程？](../by-domain/42-hiring.md#FB-42-SC-A-009)
- [FB-42-SC-A-012 如何识别简历中的“水分”和过度包装？](../by-domain/42-hiring.md#FB-42-SC-A-012)
- [FB-42-SC-A-016 如何设计多元包容的招聘策略？](../by-domain/42-hiring.md#FB-42-SC-A-016)

### 技术品牌与布道（4 道）

- [FB-43-SC-A-001 如何从 0 到 1 运营一个团队技术公众号或博客？](../by-domain/43-tech-branding.md#FB-43-SC-A-001)
- [FB-43-SC-A-002 如何在公司内部组织一场高质量的技术分享会？](../by-domain/43-tech-branding.md#FB-43-SC-A-002)
- [FB-43-SC-A-005 如何设计一套内部技术分享激励机制，让大家愿意分享？](../by-domain/43-tech-branding.md#FB-43-SC-A-005)
- [FB-43-SC-A-007 技术大会演讲的选题和提案（CFP）如何准备更容易被选中？](../by-domain/43-tech-branding.md#FB-43-SC-A-007)

### 技术治理与合规（5 道）

- [FB-44-SC-A-001 如何在前端团队落地一套代码规范并保证执行？](../by-domain/44-tech-governance.md#FB-44-SC-A-001)
- [FB-44-SC-A-002 如何识别和量化前端技术债？](../by-domain/44-tech-governance.md#FB-44-SC-A-002)
- [FB-44-SC-A-003 设计一个前端架构评审 checklist。](../by-domain/44-tech-governance.md#FB-44-SC-A-003)
- [FB-44-SC-A-004 前端如何应对安全合规审计？](../by-domain/44-tech-governance.md#FB-44-SC-A-004)
- [FB-44-SC-A-005 如何建立前端数据分类分级与访问控制机制？](../by-domain/44-tech-governance.md#FB-44-SC-A-005)

### Electron（1 道）

- [FB-48-SC-A-004 如何实现 Electron 多窗口管理与状态同步？](../by-domain/48-electron.md#FB-48-SC-A-004)

### 低代码（1 道）

- [FB-52-SC-A-005 如何实现低代码表单中的字段联动？](../by-domain/52-low-code.md#FB-52-SC-A-005)

### 简历与面试技巧（1 道）

- [FB-55-SC-A-013 不同面试轮次（HR 面、技术面、交叉面、总监面）分别应如何准备？](../by-domain/55-resume-interview.md#FB-55-SC-A-013)

### 行业特化（3 道）

- [FB-56-SC-A-002 电商大促场景下前端稳定性保障要点有哪些？](../by-domain/56-industry.md#FB-56-SC-A-002)
- [FB-56-SC-A-003 金融行业前端如何应对监管与合规要求？](../by-domain/56-industry.md#FB-56-SC-A-003)
- [FB-56-SC-A-004 toB 产品如何做好权限设计与数据隔离？](../by-domain/56-industry.md#FB-56-SC-A-004)

## 深入题（94 道）{#proficient}

### JavaScript（1 道）

- [FB-01-SC-P-001 什么是 Error Cause？在实际项目中如何构建分层的错误处理体系？](../by-domain/01-javascript.md#FB-01-SC-P-001)

### TypeScript（2 道）

- [FB-02-SC-P-001 解释 declare、namespace、module 的区别与使用场景。](../by-domain/02-typescript.md#FB-02-SC-P-001)
- [FB-02-SC-P-002 TypeScript 编译配置 strict: true 会开启哪些检查？实际项目中如何取舍？](../by-domain/02-typescript.md#FB-02-SC-P-002)

### Browser（2 道）

- [FB-03-SC-P-001 设计一个浏览器端图片懒加载与占位方案。](../by-domain/03-browser.md#FB-03-SC-P-001)
- [FB-03-SC-P-002 浏览器的内存泄漏常见场景有哪些？如何排查？](../by-domain/03-browser.md#FB-03-SC-P-002)

### 计算机网络（3 道）

- [FB-04-SC-P-001 如何设计一个支持高并发的 WebSocket 聊天室？](../by-domain/04-network.md#FB-04-SC-P-001)
- [FB-04-SC-P-002 如何设计 RESTful API 的幂等性、版本控制与分页？](../by-domain/04-network.md#FB-04-SC-P-002)
- [FB-04-SC-P-003 区分以下 HTTP 状态码的使用场景：200、201、204、301、302、400、401、403、404、429、500、502、503、504。](../by-domain/04-network.md#FB-04-SC-P-003)

### Web 安全（1 道）

- [FB-05-SC-P-001 在 SPA 中实现 OAuth 2.0 + PKCE，请描述安全细节。](../by-domain/05-security.md#FB-05-SC-P-001)

### HTML/CSS（1 道）

- [FB-06-SC-P-001 设计一个企业级多主题切换系统。](../by-domain/06-html-css.md#FB-06-SC-P-001)

### 可访问性（a11y）（1 道）

- [FB-07-SC-P-001 如何为一个复杂的自定义组件（如 Autocomplete）设计无障碍方案？](../by-domain/07-a11y.md#FB-07-SC-P-001)

### 设计模式（1 道）

- [FB-09-SC-P-001 如何设计一个可扩展的电商促销计算引擎？](../by-domain/09-design-patterns.md#FB-09-SC-P-001)

### 构建工具（4 道）

- [FB-10-SC-P-001 在微前端项目中，构建工具应该如何配合设计？](../by-domain/10-build-tools.md#FB-10-SC-P-001)
- [FB-10-SC-P-002 构建工具如何配合微前端实现独立部署与共享依赖？](../by-domain/10-build-tools.md#FB-10-SC-P-002)
- [FB-10-SC-P-003 如何在构建阶段实现国际化资源的分包和按需加载？](../by-domain/10-build-tools.md#FB-10-SC-P-003)
- [FB-10-SC-P-019 微前端多技术栈项目的构建隔离与共享依赖如何设计？](../by-domain/10-build-tools.md#FB-10-SC-P-019)

### Monorepo（4 道）

- [FB-11-SC-P-001 多包版本策略：fixed mode vs independent mode](../by-domain/11-monorepo.md#FB-11-SC-P-001)
- [FB-11-SC-P-002 多团队 Monorepo 中如何防止包依赖失控？](../by-domain/11-monorepo.md#FB-11-SC-P-002)
- [FB-11-SC-P-003 设计 Monorepo 下多包联合调试方案。](../by-domain/11-monorepo.md#FB-11-SC-P-003)
- [FB-11-SC-P-016 如何设计和执行 Monorepo 的包拆分或重构？](../by-domain/11-monorepo.md#FB-11-SC-P-016)

### 代码质量与测试（5 道）

- [FB-13-SC-P-001 测试不稳定（Flaky Test）有哪些常见原因？如何解决？](../by-domain/13-code-quality.md#FB-13-SC-P-001)
- [FB-13-SC-P-002 E2E 测试中如何设计可维护的页面对象（POM）？](../by-domain/13-code-quality.md#FB-13-SC-P-002)
- [FB-13-SC-P-003 如何设计一个前端 Mock 平台供多个团队使用？](../by-domain/13-code-quality.md#FB-13-SC-P-003)
- [FB-13-SC-P-004 如何为一个多步骤表单 Wizard 设计 E2E 测试？](../by-domain/13-code-quality.md#FB-13-SC-P-004)
- [FB-13-SC-P-005 如何为一个基于 WebSocket 的实时消息列表设计测试？](../by-domain/13-code-quality.md#FB-13-SC-P-005)

### 设计系统与组件库（10 道）

- [FB-14-SC-P-001 组件库出现破坏性变更（Breaking Change）时应如何处理？](../by-domain/14-design-system.md#FB-14-SC-P-001)
- [FB-14-SC-P-002 如何设计可扩展的主题系统，支持业务线二次定制？](../by-domain/14-design-system.md#FB-14-SC-P-002)
- [FB-14-SC-P-003 组件库大版本升级时，如何制定迁移方案？](../by-domain/14-design-system.md#FB-14-SC-P-003)
- [FB-14-SC-P-004 组件库的性能优化有哪些手段？](../by-domain/14-design-system.md#FB-14-SC-P-004)
- [FB-14-SC-P-005 如何设计一个支持动态表单的 Form Engine？](../by-domain/14-design-system.md#FB-14-SC-P-005)
- [FB-14-SC-P-006 组件库如何做 API 兼容与废弃治理？](../by-domain/14-design-system.md#FB-14-SC-P-006)
- [FB-14-SC-P-007 如何设计支持国际化的组件库？](../by-domain/14-design-system.md#FB-14-SC-P-007)
- [FB-14-SC-P-008 组件库与低代码平台如何结合？](../by-domain/14-design-system.md#FB-14-SC-P-008)
- [FB-14-SC-P-009 如何设计组件库的插件与扩展机制？](../by-domain/14-design-system.md#FB-14-SC-P-009)
- [FB-14-SC-P-010 大型组件库如何做版本灰度与 AB 实验？](../by-domain/14-design-system.md#FB-14-SC-P-010)

### Vue（1 道）

- [FB-16-SC-P-001 如何设计一个可拖拽排序的 Vue 列表组件？](../by-domain/16-vue.md#FB-16-SC-P-001)

### 跨端技术（4 道）

- [FB-17-SC-P-021 跨端应用如何做好路由管理和深层链接（Deep Link）？](../by-domain/17-cross-platform.md#FB-17-SC-P-021)
- [FB-17-SC-P-022 如何为 React Native / Flutter / Electron 开发原生模块？](../by-domain/17-cross-platform.md#FB-17-SC-P-022)
- [FB-17-SC-P-023 跨端应用如何适配不同屏幕尺寸、安全区和暗黑模式？](../by-domain/17-cross-platform.md#FB-17-SC-P-023)
- [FB-17-SC-P-055 跨端应用中的音视频播放方案如何设计？](../by-domain/17-cross-platform.md#FB-17-SC-P-055)

### AI 工程化（1 道）

- [FB-18-SC-P-053 设计一个前端 AI Copilot 的意图识别模块](../by-domain/18-ai-engineering.md#FB-18-SC-P-053)

### Node.js / BFF（5 道）

- [FB-19-SC-P-051 BFF 层如何对下游微服务进行统一超时、重试、降级与缓存？](../by-domain/19-node-bff.md#FB-19-SC-P-051)
- [FB-19-SC-P-054 如何设计 BFF 层的统一错误码与响应结构？](../by-domain/19-node-bff.md#FB-19-SC-P-054)
- [FB-19-SC-P-055 Deno 和 Bun 与 Node.js 相比各有什么优缺点？什么场景下会选择它们？](../by-domain/19-node-bff.md#FB-19-SC-P-055)
- [FB-19-SC-P-056 tRPC 和 gRPC 各适用于什么场景？在 BFF 中如何选择？](../by-domain/19-node-bff.md#FB-19-SC-P-056)
- [FB-19-SC-P-057 在 BFF 中使用消息队列有哪些典型场景？如何保证消息不丢失？](../by-domain/19-node-bff.md#FB-19-SC-P-057)

### 开发者体验与工程效能（1 道）

- [FB-21-SC-P-023 如何为新成员设计高效的 onboarding 流程？请给出 30-60-90 天计划框架。](../by-domain/21-dx.md#FB-21-SC-P-023)

### 部署与 SRE（2 道）

- [FB-22-SC-P-019 Serverless 与边缘部署如何落地前端 SSR/SSG？](../by-domain/22-deployment-sre.md#FB-22-SC-P-019)
- [FB-22-SC-P-020 大规模前端缓存失效策略有哪些？](../by-domain/22-deployment-sre.md#FB-22-SC-P-020)

### 系统架构设计（5 道）

- [FB-25-SC-P-002 设计一个 SDUI（Server-Driven UI）系统](../by-domain/25-system-architecture.md#FB-25-SC-P-002)
- [FB-25-SC-P-005 设计一个插件化的前端应用，支持第三方扩展](../by-domain/25-system-architecture.md#FB-25-SC-P-005)
- [FB-25-SC-P-009 设计一个支持百万级数据的表格前端架构](../by-domain/25-system-architecture.md#FB-25-SC-P-009)
- [FB-25-SC-P-010 设计一个前端国际化架构](../by-domain/25-system-architecture.md#FB-25-SC-P-010)
- [FB-25-SC-P-011 设计一个前端权限架构（RBAC/ABAC）](../by-domain/25-system-architecture.md#FB-25-SC-P-011)

### 微前端（1 道）

- [FB-26-SC-P-022 如何对微前端子应用做灰度发布？](../by-domain/26-micro-frontend.md#FB-26-SC-P-022)

### 质量保障（4 道）

- [FB-28-SC-P-021 灰度发布中如何保障前端质量？](../by-domain/28-quality.md#FB-28-SC-P-021)
- [FB-28-SC-P-022 蓝绿部署与金丝雀部署有什么区别？前端如何选择？](../by-domain/28-quality.md#FB-28-SC-P-022)
- [FB-28-SC-P-023 故障演练与混沌工程在前端如何落地？](../by-domain/28-quality.md#FB-28-SC-P-023)
- [FB-28-SC-P-024 线上出现 Bug 后，除了修复，你还应该做什么？](../by-domain/28-quality.md#FB-28-SC-P-024)

### 数据与状态管理（1 道）

- [FB-29-SC-P-001 Redux Toolkit、Zustand、Jotai、Recoil 的适用场景分别是什么？](../by-domain/29-data-state.md#FB-29-SC-P-001)

### 可观测性（2 道）

- [FB-30-SC-P-020 告警策略如何设计？如何解决告警风暴与降噪？](../by-domain/30-observability.md#FB-30-SC-P-020)
- [FB-30-SC-P-022 如何在微前端/跨端场景下统一可观测性？](../by-domain/30-observability.md#FB-30-SC-P-022)

### 可视化与图形（1 道）

- [FB-34-SC-P-021 实时数据流驱动的可视化大屏每秒新增数千点，如何保证不丢帧？](../by-domain/34-visualization-graphics.md#FB-34-SC-P-021)

### 业务洞察（2 道）

- [FB-37-SC-P-002 设计一个支持 A/B 实验的前端实验平台，需要哪些核心模块？](../by-domain/37-business.md#FB-37-SC-P-002)
- [FB-37-SC-P-005 如何构建面向业务指标的实时数据看板？前端在数据采集与展示上的关键设计是什么？](../by-domain/37-business.md#FB-37-SC-P-005)

### 团队领导力（3 道）

- [FB-38-SC-P-001 设计一套可量化的前端团队绩效评估体系](../by-domain/38-team.md#FB-38-SC-P-001)
- [FB-38-SC-P-003 如何搭建人才梯队与继任计划，降低关键岗位单点风险？](../by-domain/38-team.md#FB-38-SC-P-003)
- [FB-38-SC-P-004 在裁员或低绩效淘汰场景下，如何合法合规并维护团队信任？](../by-domain/38-team.md#FB-38-SC-P-004)

### 技术战略（3 道）

- [FB-39-SC-P-002 如何评估一个新技术是否值得引入生产环境？](../by-domain/39-strategy.md#FB-39-SC-P-002)
- [FB-39-SC-P-006 如何制定企业的开源战略并规避法律与供应链风险？](../by-domain/39-strategy.md#FB-39-SC-P-006)
- [FB-39-SC-P-007 当核心技术人员离职或关键供应商停止维护时，如何保障技术连续性？](../by-domain/39-strategy.md#FB-39-SC-P-007)

### 沟通表达（5 道）

- [FB-40-SC-P-001 如何准备一场高质量的技术宣讲/分享？](../by-domain/40-communication.md#FB-40-SC-P-001)
- [FB-40-SC-P-002 跨文化团队出现沟通误解，你如何排查与修复？](../by-domain/40-communication.md#FB-40-SC-P-002)
- [FB-40-SC-P-003 如何在资源有限时说服管理层投入技术基建？](../by-domain/40-communication.md#FB-40-SC-P-003)
- [FB-40-SC-P-004 线上事故后，如何组织复盘并撰写事故报告？](../by-domain/40-communication.md#FB-40-SC-P-004)
- [FB-40-SC-P-006 团队内部出现“谁来做这个脏活”的推诿，你如何推动解决？](../by-domain/40-communication.md#FB-40-SC-P-006)

### 项目管理（2 道）

- [FB-41-SC-P-003 多项目并行时，如何识别资源冲突并制定优先级策略？](../by-domain/41-project-management.md#FB-41-SC-P-003)
- [FB-41-SC-P-005 前端项目如何制定并管理项目预算与 ROI？](../by-domain/41-project-management.md#FB-41-SC-P-005)

### 招聘（2 道）

- [FB-42-SC-P-020 背调与定薪的流程和关键注意点有哪些？](../by-domain/42-hiring.md#FB-42-SC-P-020)
- [FB-42-SC-P-024 如何在雇主品牌建设中落地技术招聘？](../by-domain/42-hiring.md#FB-42-SC-P-024)

### 技术品牌与布道（3 道）

- [FB-43-SC-P-002 开源项目从“没人用”到“有人用、有人贡献”的冷启动策略有哪些？](../by-domain/43-tech-branding.md#FB-43-SC-P-002)
- [FB-43-SC-P-004 如何打造一支“技术明星团队”，既出业务结果又出行业影响力？](../by-domain/43-tech-branding.md#FB-43-SC-P-004)
- [FB-43-SC-P-005 技术布道的内容如何从“自嗨”变成“对用户/开发者真正有价值”？](../by-domain/43-tech-branding.md#FB-43-SC-P-005)

### 技术治理与合规（4 道）

- [FB-44-SC-P-001 如何建立前端开源合规治理体系？](../by-domain/44-tech-governance.md#FB-44-SC-P-001)
- [FB-44-SC-P-002 如何设计和实施前端 IT 内控？](../by-domain/44-tech-governance.md#FB-44-SC-P-002)
- [FB-44-SC-P-003 如何处理历史遗留系统的数据治理与隐私合规？](../by-domain/44-tech-governance.md#FB-44-SC-P-003)
- [FB-44-SC-P-004 如何设计前端审计与风控日志体系？](../by-domain/44-tech-governance.md#FB-44-SC-P-004)

### 小程序（1 道）

- [FB-45-SC-P-007 小程序全局状态管理有哪些方案？如何选择？](../by-domain/45-mini-program.md#FB-45-SC-P-007)

### Flutter（1 道）

- [FB-47-SC-P-003 在现有原生 App 中嵌入 Flutter（Add-to-App）有哪些技术方案和挑战？](../by-domain/47-flutter.md#FB-47-SC-P-003)

### Electron（1 道）

- [FB-48-SC-P-007 Electron 跨平台兼容性如何处理？](../by-domain/48-electron.md#FB-48-SC-P-007)

### 多媒体（Multimedia）（1 道）

- [FB-51-SC-P-022 如何实现一个支持多音轨切换的视频播放器？](../by-domain/51-multimedia.md#FB-51-SC-P-022)

### 低代码（1 道）

- [FB-52-SC-P-005 如何设计一个低代码流程设计器？](../by-domain/52-low-code.md#FB-52-SC-P-005)

### 行业特化（2 道）

- [FB-56-SC-P-004 电商实时数据大屏的技术方案](../by-domain/56-industry.md#FB-56-SC-P-004)
- [FB-56-SC-P-006 toB 复杂业务表单配置化方案](../by-domain/56-industry.md#FB-56-SC-P-006)

## 架构题（57 道）{#architect}

### JavaScript（1 道）

- [FB-01-SC-R-001 在低代码平台中，如何安全执行用户自定义的 JavaScript 逻辑？](../by-domain/01-javascript.md#FB-01-SC-R-001)

### TypeScript（1 道）

- [FB-02-SC-R-001 如何制定一个从 JavaScript 迁移到 TypeScript 的方案？](../by-domain/02-typescript.md#FB-02-SC-R-001)

### Web 安全（2 道）

- [FB-05-SC-R-001 如何设计"零信任"视角下的前端安全架构？](../by-domain/05-security.md#FB-05-SC-R-001)
- [FB-05-SC-R-002 如何安全地集成第三方脚本、iframe 和广告？](../by-domain/05-security.md#FB-05-SC-R-002)

### HTML/CSS（1 道）

- [FB-06-SC-R-001 如何设计一个支持 RTL、暗黑模式、多尺寸的主题系统？](../by-domain/06-html-css.md#FB-06-SC-R-001)

### 数据结构与算法（5 道）

- [FB-08-SC-R-001 设计一个前端 LRU 缓存。](../by-domain/08-algorithms.md#FB-08-SC-R-001)
- [FB-08-SC-R-002 设计一个前端请求去重/合并系统。](../by-domain/08-algorithms.md#FB-08-SC-R-002)
- [FB-08-SC-R-003 设计一个前端任务调度器。](../by-domain/08-algorithms.md#FB-08-SC-R-003)
- [FB-08-SC-R-004 设计一个虚拟列表的算法方案。](../by-domain/08-algorithms.md#FB-08-SC-R-004)
- [FB-08-SC-R-005 设计一个 Undo/Redo 系统。](../by-domain/08-algorithms.md#FB-08-SC-R-005)

### 设计模式（2 道）

- [FB-09-SC-R-001 在设计大型前端组件库时，你会如何运用设计模式？](../by-domain/09-design-patterns.md#FB-09-SC-R-001)
- [FB-09-SC-R-002 如何将一个继承过深的组件体系重构为组合式架构？](../by-domain/09-design-patterns.md#FB-09-SC-R-002)

### 构建工具（4 道）

- [FB-10-SC-R-001 设计一个支持多环境、多团队的前端构建平台。](../by-domain/10-build-tools.md#FB-10-SC-R-001)
- [FB-10-SC-R-002 设计一个支持 A/B 测试的前端构建与发布方案](../by-domain/10-build-tools.md#FB-10-SC-R-002)
- [FB-10-SC-R-003 设计一个前端依赖治理与构建安全审计流程](../by-domain/10-build-tools.md#FB-10-SC-R-003)
- [FB-10-SC-R-010 多仓库/多团队统一构建规范与治理机制如何设计？](../by-domain/10-build-tools.md#FB-10-SC-R-010)

### 设计系统与组件库（4 道）

- [FB-14-SC-R-001 从 0 到 1 建设组件库，如何进行技术选型？](../by-domain/14-design-system.md#FB-14-SC-R-001)
- [FB-14-SC-R-002 如何从业务组件沉淀到通用组件库？](../by-domain/14-design-system.md#FB-14-SC-R-002)
- [FB-14-SC-R-003 如何平衡组件库的一致性与业务灵活性？](../by-domain/14-design-system.md#FB-14-SC-R-003)
- [FB-14-SC-R-004 组件库团队如何与产品、设计、业务团队协作？](../by-domain/14-design-system.md#FB-14-SC-R-004)

### AI 工程化（4 道）

- [FB-18-SC-R-029 如何设计一个 Agent 系统？对比 ReAct 和 Plan-and-Execute](../by-domain/18-ai-engineering.md#FB-18-SC-R-029)
- [FB-18-SC-R-030 如何设计一个面向复杂表单的 AI 自动填充 Agent？](../by-domain/18-ai-engineering.md#FB-18-SC-R-030)
- [FB-18-SC-R-031 如何设计一个支持多人协作的 AI 白板系统？](../by-domain/18-ai-engineering.md#FB-18-SC-R-031)
- [FB-18-SC-R-061 设计一个跨端 AI Agent 系统](../by-domain/18-ai-engineering.md#FB-18-SC-R-061)

### 开发者体验与工程效能（1 道）

- [FB-21-SC-R-001 如何为前端团队设计基于 GitHub Actions 与 Docker 的云端开发/CI 一体化环境](../by-domain/21-dx.md#FB-21-SC-R-001)

### 部署与 SRE（1 道）

- [FB-22-SC-R-001 在 Kubernetes 容器化场景下，如何为前端服务设计 Error Budget 与发布节奏？](../by-domain/22-deployment-sre.md#FB-22-SC-R-001)

### 包管理与供应链安全（3 道）

- [FB-23-SC-R-026 从 0 开始设计一个 Monorepo 包管理方案](../by-domain/23-package-supply-chain.md#FB-23-SC-R-026)
- [FB-23-SC-R-029 设计一个依赖漏洞应急响应流程](../by-domain/23-package-supply-chain.md#FB-23-SC-R-029)
- [FB-23-SC-R-030 如何设计前端构建产物供应链安全方案？](../by-domain/23-package-supply-chain.md#FB-23-SC-R-030)

### 系统架构设计（3 道）

- [FB-25-SC-R-003 设计一个大型电商活动搭建平台的前端架构](../by-domain/25-system-architecture.md#FB-25-SC-R-003)
- [FB-25-SC-R-011 设计一个跨团队协作的组件共建与治理体系](../by-domain/25-system-architecture.md#FB-25-SC-R-011)
- [FB-25-SC-R-012 如果你发现一个项目的架构严重影响了业务发展，但重写成本极高，你会怎么做？](../by-domain/25-system-architecture.md#FB-25-SC-R-012)

### 微前端（2 道）

- [FB-26-SC-R-001 微前端和 Monorepo 各适合什么场景？可以同时使用吗？](../by-domain/26-micro-frontend.md#FB-26-SC-R-001)
- [FB-26-SC-R-002 如果未来浏览器原生支持更强大的应用隔离机制，微前端框架会消失吗？](../by-domain/26-micro-frontend.md#FB-26-SC-R-002)

### 性能工程（1 道）

- [FB-27-SC-R-005 如何设计 CDN 缓存与边缘计算架构来优化前端性能？](../by-domain/27-performance.md#FB-27-SC-R-005)

### 质量保障（1 道）

- [FB-28-SC-R-002 如果团队完全没有测试，你会如何推动测试落地？](../by-domain/28-quality.md#FB-28-SC-R-002)

### 数据与状态管理（2 道）

- [FB-29-SC-R-027 设计一个高并发的购物车状态管理方案](../by-domain/29-data-state.md#FB-29-SC-R-027)
- [FB-29-SC-R-028 如何设计多端状态同步方案（Web、小程序、App）？](../by-domain/29-data-state.md#FB-29-SC-R-028)

### 可观测性（1 道）

- [FB-30-SC-R-029 如何在大型前端工程中平衡监控覆盖度与性能开销？](../by-domain/30-observability.md#FB-30-SC-R-029)

### 团队领导力（2 道）

- [FB-38-SC-R-003 业务扩张期，如何通过团队结构升级支撑多产品线并行？](../by-domain/38-team.md#FB-38-SC-R-003)
- [FB-38-SC-R-007 两个子团队各自为政、重复造轮子，如何打破壁垒建立共享平台？](../by-domain/38-team.md#FB-38-SC-R-007)

### 技术战略（1 道）

- [FB-39-SC-R-005 技术战略落地失败时，如何进行复盘与调整？](../by-domain/39-strategy.md#FB-39-SC-R-005)

### 项目管理（1 道）

- [FB-41-SC-R-005 项目交付后，如何量化前端项目对业务的实际价值？](../by-domain/41-project-management.md#FB-41-SC-R-005)

### 技术品牌与布道（1 道）

- [FB-43-SC-R-005 如果公司决定 All-in 开源，前端团队应该如何制定 3 年技术品牌路线图？](../by-domain/43-tech-branding.md#FB-43-SC-R-005)

### 技术治理与合规（1 道）

- [FB-44-SC-R-001 发生安全合规事件时，前端团队应如何应急响应？](../by-domain/44-tech-governance.md#FB-44-SC-R-001)

### 小程序（2 道）

- [FB-45-SC-R-004 小程序 SEO / 搜索优化和内容索引方案如何设计？](../by-domain/45-mini-program.md#FB-45-SC-R-004)
- [FB-45-SC-R-005 如何设计小程序的用户留存、分享裂变和运营增长方案？](../by-domain/45-mini-program.md#FB-45-SC-R-005)

### Flutter（1 道）

- [FB-47-SC-R-004 Flutter Web 和桌面端（Windows/macOS/Linux）支持有哪些关键考虑？](../by-domain/47-flutter.md#FB-47-SC-R-004)

### Electron（1 道）

- [FB-48-SC-R-005 如何设计多窗口/多标签 Electron 应用的状态共享方案？](../by-domain/48-electron.md#FB-48-SC-R-005)

### WebAssembly（5 道）

- [FB-49-SC-R-001 如何设计一个前端图像处理系统，引入 WebAssembly 进行计算加速？](../by-domain/49-webassembly.md#FB-49-SC-R-001)
- [FB-49-SC-R-002 设计一个浏览器端视频编解码方案，WebAssembly 扮演什么角色？](../by-domain/49-webassembly.md#FB-49-SC-R-002)
- [FB-49-SC-R-003 如何在大型前端项目中组织 WASM 模块的构建、加载与版本管理？](../by-domain/49-webassembly.md#FB-49-SC-R-003)
- [FB-49-SC-R-004 WebAssembly 在游戏引擎/WebGL 渲染管线中如何落地？](../by-domain/49-webassembly.md#FB-49-SC-R-004)
- [FB-49-SC-R-005 AI/ML 模型前端推理方案中，WASM 与 WebGPU/WebGL 如何协作？](../by-domain/49-webassembly.md#FB-49-SC-R-005)

### WebGPU / 图形学（2 道）

- [FB-50-SC-R-025 如何优化一个包含百万级对象的大型 3D 场景？](../by-domain/50-webgpu-graphics.md#FB-50-SC-R-025)
- [FB-50-SC-R-030 如何为一个跨平台 3D 可视化产品选择 WebGPU 与 Native 图形方案？](../by-domain/50-webgpu-graphics.md#FB-50-SC-R-030)

### 多媒体（Multimedia）（1 道）

- [FB-51-SC-R-028 如何实现跨浏览器的统一媒体录制方案？](../by-domain/51-multimedia.md#FB-51-SC-R-028)

