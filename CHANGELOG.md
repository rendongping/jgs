# 变更日志

> 本文件记录前端架构师知识库的所有重大变更，采用 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 格式和 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### Added
- 网站能力自评表新增四层能力雷达图（ECharts）。
- 网站能力自评表新增评估数据导入/导出功能。
- 网站面试题卡片支持 Base64 编码传输，提升复杂答案渲染稳定性。
- 网站自定义组件补充无障碍属性（`aria-label`、`aria-expanded`、`aria-pressed` 等）。
- 文档写作规范新增网站组件无障碍（a11y）章节。
- E09 AI 工程化学习文档新增 MCP、Vibe Coding、结构化输出、多模态与 Edge AI、LLM 可观测性与评估框架等前沿内容。
- E09 AI 工程化练习册新增 4 道深入练习题，面试题新增 7 题。
- A01 系统架构学习文档新增现代前端架构模式：微内核、插件化、低代码/搭建、Server-Driven UI、事件驱动/CQRS、六边形/整洁架构、Monorepo 组织方案、架构模式选型决策树。
- A01 系统架构练习册新增 3 道深入练习题，面试题新增 4 题。
- E08 跨端技术学习文档新增鸿蒙 ArkTS/ArkUI、车载 HMI/穿戴/TV、Kotlin Multiplatform、小程序 Skyline/GL、Capacitor/Tauri 等前沿内容。
- E08 跨端技术练习册新增 3 道深入练习题，面试题新增 5 题。
- E10 Node.js/BFF 学习文档新增 Deno/Bun、NestJS 企业级特性、tRPC/gRPC/GraphQL Federation、消息队列、数据库 ORM、可观测性等深度内容。
- E10 Node.js/BFF 练习册新增 3 道深入练习题，面试题新增 5 题。
- 深化 3 个现有综合案例：从 URL 到页面可交互、大型中后台系统、技术选型，补充业务 KPI、优化前后对比、架构决策会议纪要、可下载资源、组织与成本维度。
- 新增 2 个跨领域综合案例：AI Native 数据看板、跨端电商平台架构演进。
- 为工具模板补充 5 个已填写示例：ADR（2 个）、技术债登记册、性能优化 SOP、Code Review 记录。
- 基础层与工程化层细节深化：Promise/A+、Iterator/Error Cause、TS `satisfies`/装饰器/Branded Type、Web Vitals/INP/Passkeys、DoH/DoT/WebRTC、供应链安全/WebAuthn、Biome/Oxc/Codemod、React 19/Server Actions、Vue 3.4+/Vapor Mode。

### Fixed
- 统一网站首页源码仓库链接指向 `https://github.com/rendongping/jgs`。

### Added
- 建立文档写作规范（`docs/STYLE-GUIDE.md`）。
- 建立贡献指南（`docs/CONTRIBUTING.md`）。
- 建立领域编号体系，覆盖全部 24 个领域。
- 所有现有领域目录添加编号前缀（如 `javascript` → `F01-javascript`）。
- 新增四个核心缺失领域目录及完整三件套：
  - E09 AI 工程化 / AI Native 前端
  - E10 Node.js / BFF 服务端
  - A05 数据与状态管理
  - A06 可观测性与稳定性工程
- 更新 `README.md` 和 `前端架构师进阶规划.md` 以反映新的编号体系和新增领域。
- 为现有 20 个领域的 `01-学习文档.md` 补充 TL;DR、领域编号和最后更新时间。
- 新增工具箱模板目录 `templates/`，包含：
  - ADR 模板
  - 技术选型评分卡
  - Code Review 清单
  - 性能优化 SOP
  - 技术债登记册
- 新增跨领域综合案例目录 `docs/case-studies/`，包含：
  - 从输入 URL 到页面可交互
  - 设计一个大型中后台系统
  - 一次完整的技术选型
- 新增学习路径目录 `docs/learning-path/`，包含：
  - 全局知识依赖图（Mermaid）
  - 前端架构师能力自评表
  - 四条职业学习路线（业务型 / 工程型 / 平台型 / 管理型）
- 新增技术雷达 `docs/tech-radar.md`。
- 新增精选资源总览 `docs/resources.md`。
- 新增 GitHub 贡献模板：
  - Issue 模板：新增领域建议、内容错误反馈、功能建议
  - PR 模板
- 为 24 个领域练习册补充完整参考答案。
- 抽查并提升 24 个领域面试题答案质量，核心领域答案深度显著增强。
- 为 24 个领域学习文档标注建议学习时长和前置知识。
- 新增术语表 `docs/glossary.md`。
- 新增通关项目实战手册 `docs/project-handbook.md`。
- 新增架构师工作流与面试模拟 `docs/architect-workflow.md`。
- 新增文档规范检查脚本 `scripts/lint-docs.sh`。

### Fixed
- 修正 `前端架构师进阶规划.md` 中 `n- 技术培训、分享与梯队建设` 的格式错误。

---

## [1.0.0] - 2026-06-17

### Added
- 初始版本发布。
- 建立“前端架构师能力金字塔”四层模型：
  - Level 01：语言基础 / 浏览器 / 网络 / 安全
  - Level 02：工程化 / 框架原理 / 跨端技术
  - Level 03：系统架构 / 性能工程 / 质量保障
  - Level 04：业务洞察 / 团队领导力 / 技术战略
- 覆盖 20 个知识领域，每个领域包含学习文档、练习册、面试题三件套。
- 提供总体进阶规划（`前端架构师进阶规划.md`）和索引文件（`README.md`）。

---

> 未来计划：
> - 批次二：为每个领域增加 TL;DR、工具箱模板、跨领域综合案例、面试题参考答案。
> - 批次三：绘制知识依赖图、设计能力自评表、优化学习路线。
> - 批次四：建立技术雷达、精选外部资源、完善贡献机制。
