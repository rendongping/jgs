# 工程化题

> 本文件按题型收录 **工程化题** 相关前端面试题索引。
> 共收录 **250** 道题（基础 48 / 进阶 99 / 深入 79 / 架构 24）。
> 每道题都附带完整参考答案与评分维度，点击链接可查看原文。

## 基础题（48 道）{#basic}

### 计算机网络（1 道）

- [FB-04-EN-B-001 CDN 的原理是什么？有什么作用？](../by-domain/04-network.md#FB-04-EN-B-001)

### 构建工具（2 道）

- [FB-10-EN-B-001 前端项目如何根据环境选择不同的构建配置？](../by-domain/10-build-tools.md#FB-10-EN-B-001)
- [FB-10-EN-B-019 前端构建脚本中如何管理多环境（dev/test/prod）配置？](../by-domain/10-build-tools.md#FB-10-EN-B-019)

### Monorepo（6 道）

- [FB-11-EN-B-001 如何初始化一个最小的 pnpm workspace Monorepo？](../by-domain/11-monorepo.md#FB-11-EN-B-001)
- [FB-11-EN-B-002 如何在 Monorepo 中统一 TypeScript 配置？](../by-domain/11-monorepo.md#FB-11-EN-B-002)
- [FB-11-EN-B-003 如何给 Monorepo 添加一个新的 internal package？](../by-domain/11-monorepo.md#FB-11-EN-B-003)
- [FB-11-EN-B-016 如何在 Monorepo 中统一 ESLint / Prettier 配置？](../by-domain/11-monorepo.md#FB-11-EN-B-016)
- [FB-11-EN-B-018 如何给 Monorepo 中的 internal package 添加测试？](../by-domain/11-monorepo.md#FB-11-EN-B-018)
- [FB-11-EN-B-021 changeset 文件的作用是什么？它的基本结构是怎样的？](../by-domain/11-monorepo.md#FB-11-EN-B-021)

### CI/CD（14 道）

- [FB-12-EN-B-002 什么是 Pipeline as Code？它有什么好处？](../by-domain/12-ci-cd.md#FB-12-EN-B-002)
- [FB-12-EN-B-003 GitHub Actions 的核心概念有哪些？](../by-domain/12-ci-cd.md#FB-12-EN-B-003)
- [FB-12-EN-B-004 GitLab CI 的核心概念有哪些？](../by-domain/12-ci-cd.md#FB-12-EN-B-004)
- [FB-12-EN-B-005 Jenkins Pipeline 的核心概念有哪些？](../by-domain/12-ci-cd.md#FB-12-EN-B-005)
- [FB-12-EN-B-007 Docker 在前端 CI/CD 中通常扮演什么角色？](../by-domain/12-ci-cd.md#FB-12-EN-B-007)
- [FB-12-EN-B-009 前端 CI/CD 中如何设计依赖与构建缓存策略？](../by-domain/12-ci-cd.md#FB-12-EN-B-009)
- [FB-12-EN-B-011 CI/CD 中的 Matrix Build 有什么作用？前端如何应用？](../by-domain/12-ci-cd.md#FB-12-EN-B-011)
- [FB-12-EN-B-013 CI/CD 中 lockfile 的作用是什么？出现冲突时如何处理？](../by-domain/12-ci-cd.md#FB-12-EN-B-013)
- [FB-12-EN-B-014 前端项目在 CI/CD 中如何安全地注入环境变量？](../by-domain/12-ci-cd.md#FB-12-EN-B-014)
- [FB-12-EN-B-016 如何在 CI/CD 中安全地实现自动化依赖更新？](../by-domain/12-ci-cd.md#FB-12-EN-B-016)
- [FB-12-EN-B-018 Git Hooks 是什么？如何与 CI/CD 配合？](../by-domain/12-ci-cd.md#FB-12-EN-B-018)
- [FB-12-EN-B-020 什么是 Self-Hosted Runner？什么时候应该使用？](../by-domain/12-ci-cd.md#FB-12-EN-B-020)
- [FB-12-EN-B-022 CI/CD 中的并行（Parallelism）与并发（Concurrency）有什么区别？](../by-domain/12-ci-cd.md#FB-12-EN-B-022)
- [FB-12-EN-B-024 CI/CD 中的通知机制应该如何设计？](../by-domain/12-ci-cd.md#FB-12-EN-B-024)

### 代码质量与测试（3 道）

- [FB-13-EN-B-001 ESLint 的 extends、plugins、rules、presets 有什么区别？](../by-domain/13-code-quality.md#FB-13-EN-B-001)
- [FB-13-EN-B-002 如何用 npm scripts 一键运行 lint、format 与测试？](../by-domain/13-code-quality.md#FB-13-EN-B-002)
- [FB-13-EN-B-003 .editorconfig 与 Prettier 有什么区别？](../by-domain/13-code-quality.md#FB-13-EN-B-003)

### Vue（1 道）

- [FB-16-EN-B-001 Vue CLI 和 Vite 创建项目有什么区别？](../by-domain/16-vue.md#FB-16-EN-B-001)

### AI 工程化（1 道）

- [FB-18-EN-B-037 前端接入大模型 API 时有哪些常见工程化问题？](../by-domain/18-ai-engineering.md#FB-18-EN-B-037)

### Git 工作流与变更管理（1 道）

- [FB-20-EN-B-001 描述 Git Flow 的主要分支和流程。](../by-domain/20-git-workflow.md#FB-20-EN-B-001)

### 开发者体验与工程效能（11 道）

- [FB-21-EN-B-002 前端脚手架通常要解决哪些问题？举例说明 create-vite 或 create-next-app 的设计目标。](../by-domain/21-dx.md#FB-21-EN-B-002)
- [FB-21-EN-B-005 Git Hooks 最常见的两个场景是什么？简述 pre-commit 和 commit-msg 的作用。](../by-domain/21-dx.md#FB-21-EN-B-005)
- [FB-21-EN-B-006 TypeScript 项目中为什么要拆分 tsconfig.json？常见拆分策略是什么？](../by-domain/21-dx.md#FB-21-EN-B-006)
- [FB-21-EN-B-032 package.json 中的 scripts 设计应遵循哪些原则？](../by-domain/21-dx.md#FB-21-EN-B-032)
- [FB-21-EN-B-034 .editorconfig 的作用是什么？前端项目中通常如何配置？](../by-domain/21-dx.md#FB-21-EN-B-034)
- [FB-21-EN-B-036 前端项目的 README 应该包含哪些关键信息？](../by-domain/21-dx.md#FB-21-EN-B-036)
- [FB-21-EN-B-038 CI/CD 的基本概念是什么？它如何影响开发者体验？](../by-domain/21-dx.md#FB-21-EN-B-038)
- [FB-21-EN-B-067 前端项目中的 .gitignore 应该忽略哪些文件？忽略不当会有什么风险？](../by-domain/21-dx.md#FB-21-EN-B-067)
- [FB-21-EN-B-069 如何为前端项目选择合适的包管理器？](../by-domain/21-dx.md#FB-21-EN-B-069)
- [FB-21-EN-B-071 前端项目中的环境变量有哪些安全注意事项？](../by-domain/21-dx.md#FB-21-EN-B-071)
- [FB-21-EN-B-072 如何通过 ESLint 配置与错误信息优化提升开发者体验](../by-domain/21-dx.md#FB-21-EN-B-072)

### 部署与 SRE（4 道）

- [FB-22-EN-B-005 前端构建产物如何做版本化管理？](../by-domain/22-deployment-sre.md#FB-22-EN-B-005)
- [FB-22-EN-B-006 如何在 CI/CD 中落地前端静态资源的 HTTP 缓存策略，避免用户加载到旧版本？](../by-domain/22-deployment-sre.md#FB-22-EN-B-006)
- [FB-22-EN-B-007 前端部署为什么要给 JS/CSS 加 hash？](../by-domain/22-deployment-sre.md#FB-22-EN-B-007)
- [FB-22-EN-B-008 什么是 CDN？前端如何利用 CDN？](../by-domain/22-deployment-sre.md#FB-22-EN-B-008)

### 包管理与供应链安全（1 道）

- [FB-23-EN-B-001 在 pnpm 项目中如何检测并清理幽灵依赖？](../by-domain/23-package-supply-chain.md#FB-23-EN-B-001)

### 前端运维与监控（1 道）

- [FB-24-EN-B-007 CDN 与缓存监控需要关注哪些指标？](../by-domain/24-frontend-operations.md#FB-24-EN-B-007)

### 系统架构设计（2 道）

- [FB-25-EN-B-003 Monorepo 是什么？与 Multirepo 相比有什么优劣？](../by-domain/25-system-architecture.md#FB-25-EN-B-003)
- [FB-25-EN-B-015 如何分析前端构建产物并制定优化策略？](../by-domain/25-system-architecture.md#FB-25-EN-B-015)

## 进阶题（99 道）{#advanced}

### HTML/CSS（1 道）

- [FB-06-EN-A-001 什么是 CSS 工程化？前端项目中为什么需要 CSS 工程化？](../by-domain/06-html-css.md#FB-06-EN-A-001)

### 构建工具（3 道）

- [FB-10-EN-A-001 如何设计前端构建的缓存策略？](../by-domain/10-build-tools.md#FB-10-EN-A-001)
- [FB-10-EN-A-002 Monorepo 中如何设计构建任务依赖和缓存？](../by-domain/10-build-tools.md#FB-10-EN-A-002)
- [FB-10-EN-A-016 如何在前端构建流程中集成 Lint、Type Check 和 Test？](../by-domain/10-build-tools.md#FB-10-EN-A-016)

### Monorepo（19 道）

- [FB-11-EN-A-001 如何优化 Monorepo 的依赖安装速度？](../by-domain/11-monorepo.md#FB-11-EN-A-001)
- [FB-11-EN-A-002 pnpm 的依赖管理机制与 npm / yarn 有何不同？](../by-domain/11-monorepo.md#FB-11-EN-A-002)
- [FB-11-EN-A-003 什么是幽灵依赖（phantom dependencies）？如何解决？](../by-domain/11-monorepo.md#FB-11-EN-A-003)
- [FB-11-EN-A-004 Monorepo 中如何管理内部包的版本号？](../by-domain/11-monorepo.md#FB-11-EN-A-004)
- [FB-11-EN-A-005 changesets 的工作流程是什么？](../by-domain/11-monorepo.md#FB-11-EN-A-005)
- [FB-11-EN-A-006 如何配置 Turborepo 的 pipeline？](../by-domain/11-monorepo.md#FB-11-EN-A-006)
- [FB-11-EN-A-007 Monorepo 中 CI 可以做哪些优化？](../by-domain/11-monorepo.md#FB-11-EN-A-007)
- [FB-11-EN-A-008 如何配置 pnpm 的 catalog 功能统一管理依赖版本？](../by-domain/11-monorepo.md#FB-11-EN-A-008)
- [FB-11-EN-A-009 如何处理 Monorepo 中不同子包的 Node.js 版本要求？](../by-domain/11-monorepo.md#FB-11-EN-A-009)
- [FB-11-EN-A-010 如何检测和清理 Monorepo 中的未使用依赖？](../by-domain/11-monorepo.md#FB-11-EN-A-010)
- [FB-11-EN-A-011 pnpm 的 --filter 有哪些常见用法？](../by-domain/11-monorepo.md#FB-11-EN-A-011)
- [FB-11-EN-A-012 如何在 Monorepo 中统一管理环境变量？](../by-domain/11-monorepo.md#FB-11-EN-A-012)
- [FB-11-EN-A-013 如何配置 Turborepo 的 remote cache？](../by-domain/11-monorepo.md#FB-11-EN-A-013)
- [FB-11-EN-A-014 如何使用 pnpm 的 overrides 和 hooks 治理依赖版本？](../by-domain/11-monorepo.md#FB-11-EN-A-014)
- [FB-11-EN-A-015 如何配置 Turborepo generator 来创建新包？](../by-domain/11-monorepo.md#FB-11-EN-A-015)
- [FB-11-EN-A-017 如何处理 Monorepo 中不同子包依赖不同框架版本的问题？](../by-domain/11-monorepo.md#FB-11-EN-A-017)
- [FB-11-EN-A-018 如何在 Monorepo 中做包体积分析？](../by-domain/11-monorepo.md#FB-11-EN-A-018)
- [FB-11-EN-A-019 如何配置 GitHub Actions 只跑 affected 的任务？](../by-domain/11-monorepo.md#FB-11-EN-A-019)
- [FB-11-EN-A-021 如何在 Monorepo 中统一管理 secrets 和敏感配置？](../by-domain/11-monorepo.md#FB-11-EN-A-021)

### CI/CD（21 道）

- [FB-12-EN-A-001 如何在 GitHub Actions 中为前端 Monorepo 设计一条合理的 CI/CD 流水线？](../by-domain/12-ci-cd.md#FB-12-EN-A-001)
- [FB-12-EN-A-002 如何为前端项目设计一条完整的 GitLab CI 流水线？](../by-domain/12-ci-cd.md#FB-12-EN-A-002)
- [FB-12-EN-A-003 如何为前端项目配置 Jenkins 多分支流水线（Multibranch Pipeline）？](../by-domain/12-ci-cd.md#FB-12-EN-A-003)
- [FB-12-EN-A-004 几种常见的部署策略有什么区别？](../by-domain/12-ci-cd.md#FB-12-EN-A-004)
- [FB-12-EN-A-005 蓝绿部署的原理是什么？前端项目做蓝绿部署需要注意什么？](../by-domain/12-ci-cd.md#FB-12-EN-A-005)
- [FB-12-EN-A-006 金丝雀发布（Canary Release）的原理是什么？如何实现和观测？](../by-domain/12-ci-cd.md#FB-12-EN-A-006)
- [FB-12-EN-A-007 特性开关（Feature Flags）如何与 CI/CD 结合？](../by-domain/12-ci-cd.md#FB-12-EN-A-007)
- [FB-12-EN-A-008 CI/CD 中的 Secrets 管理有哪些最佳实践？](../by-domain/12-ci-cd.md#FB-12-EN-A-008)
- [FB-12-EN-A-009 GitHub Actions 的 concurrency 与 cancel-in-progress 有什么作用？](../by-domain/12-ci-cd.md#FB-12-EN-A-009)
- [FB-12-EN-A-010 自托管 Runner 与云托管 Runner 各有什么优劣？如何选择？](../by-domain/12-ci-cd.md#FB-12-EN-A-010)
- [FB-12-EN-A-011 如何在 CI/CD 中并行化和分片运行 E2E 测试？](../by-domain/12-ci-cd.md#FB-12-EN-A-011)
- [FB-12-EN-A-012 如何在 CI/CD 中集成 Lighthouse CI 与性能预算？](../by-domain/12-ci-cd.md#FB-12-EN-A-012)
- [FB-12-EN-A-013 如何在 CI/CD 中监控和控制 Bundle Size？](../by-domain/12-ci-cd.md#FB-12-EN-A-013)
- [FB-12-EN-A-014 如何设计前端项目部署到 CDN/OSS 的 CI/CD 流水线？](../by-domain/12-ci-cd.md#FB-12-EN-A-014)
- [FB-12-EN-A-015 Merge Queue 在 CI/CD 中解决了什么问题？](../by-domain/12-ci-cd.md#FB-12-EN-A-015)
- [FB-12-EN-A-016 如何为每个 PR 自动创建和销毁预览环境？](../by-domain/12-ci-cd.md#FB-12-EN-A-016)
- [FB-12-EN-A-017 如何在 CI/CD 中集成可视化回归测试？](../by-domain/12-ci-cd.md#FB-12-EN-A-017)
- [FB-12-EN-A-019 如何在 GitLab CI 中实现 DAG（有向无环图）编排？](../by-domain/12-ci-cd.md#FB-12-EN-A-019)
- [FB-12-EN-A-022 GitHub Actions 的 Reusable Workflow 与 Composite Action 有什么区别？](../by-domain/12-ci-cd.md#FB-12-EN-A-022)
- [FB-12-EN-A-024 如何在 CI 中集成 Lighthouse CI？](../by-domain/12-ci-cd.md#FB-12-EN-A-024)
- [FB-12-EN-A-026 如何在 CI 中实现前端依赖的安全审计？](../by-domain/12-ci-cd.md#FB-12-EN-A-026)

### 代码质量与测试（4 道）

- [FB-13-EN-A-001 如何配置 lint-staged + Husky 实现提交前只检查本次修改？](../by-domain/13-code-quality.md#FB-13-EN-A-001)
- [FB-13-EN-A-002 如何在前端项目中引入 commitlint + Conventional Commits？](../by-domain/13-code-quality.md#FB-13-EN-A-002)
- [FB-13-EN-A-003 如何在 CI 中并行运行测试以缩短反馈时间？](../by-domain/13-code-quality.md#FB-13-EN-A-003)
- [FB-13-EN-A-010 Biome / Oxc 与传统 ESLint + Prettier 相比有什么优势和局限？](../by-domain/13-code-quality.md#FB-13-EN-A-010)

### Vue（1 道）

- [FB-16-EN-A-001 Vue 项目中 ESLint、Prettier 和 Vitest 如何集成？](../by-domain/16-vue.md#FB-16-EN-A-001)

### 跨端技术（1 道）

- [FB-17-EN-A-043 跨端项目如何使用 Monorepo 组织代码？](../by-domain/17-cross-platform.md#FB-17-EN-A-043)

### AI 工程化（3 道）

- [FB-18-EN-A-016 什么是 Vibe Coding？前端如何落地 AI 辅助编码？](../by-domain/18-ai-engineering.md#FB-18-EN-A-016)
- [FB-18-EN-A-017 如何管理前端项目中的 Prompt 版本与热更新？](../by-domain/18-ai-engineering.md#FB-18-EN-A-017)
- [FB-18-EN-A-045 如何管理前端 AI 应用的 Prompt 版本？](../by-domain/18-ai-engineering.md#FB-18-EN-A-045)

### Node.js / BFF（1 道）

- [FB-19-EN-A-047 Node.js 项目中的代码质量工具链应如何配置？](../by-domain/19-node-bff.md#FB-19-EN-A-047)

### Git 工作流与变更管理（6 道）

- [FB-20-EN-A-010 什么是 Conventional Commits？它能带来哪些自动化收益？](../by-domain/20-git-workflow.md#FB-20-EN-A-010)
- [FB-20-EN-A-011 Git Hooks 是什么？常见钩子有哪些？](../by-domain/20-git-workflow.md#FB-20-EN-A-011)
- [FB-20-EN-A-014 Pull Request / Merge Request 的代码审查流程如何设计？](../by-domain/20-git-workflow.md#FB-20-EN-A-014)
- [FB-20-EN-A-042 git worktree 有什么用？](../by-domain/20-git-workflow.md#FB-20-EN-A-042)
- [FB-20-EN-A-046 Monorepo 中如何锁定依赖变更与源码变更的一致性？](../by-domain/20-git-workflow.md#FB-20-EN-A-046)
- [FB-20-EN-A-047 如何为一个团队选择合适的 Git 工作流？](../by-domain/20-git-workflow.md#FB-20-EN-A-047)

### 开发者体验与工程效能（13 道）

- [FB-21-EN-A-009 如何设计一个团队级项目模板（boilerplate）？需要包含哪些核心文件和配置？](../by-domain/21-dx.md#FB-21-EN-A-009)
- [FB-21-EN-A-010 如何利用 pnpm workspace + Turborepo 提升 Monorepo 的构建和安装速度？](../by-domain/21-dx.md#FB-21-EN-A-010)
- [FB-21-EN-A-012 如何配置 Git Hooks 自动化代码检查？请给出 .lintstagedrc 和 Husky 的示例。](../by-domain/21-dx.md#FB-21-EN-A-012)
- [FB-21-EN-A-013 TypeScript 项目中 compilerOptions 的关键项如何取舍？](../by-domain/21-dx.md#FB-21-EN-A-013)
- [FB-21-EN-A-015 如何度量 CI pipeline 的反馈速度？有哪些常见瓶颈和优化手段？](../by-domain/21-dx.md#FB-21-EN-A-015)
- [FB-21-EN-A-039 如何设计前端项目的错误监控与告警体系？](../by-domain/21-dx.md#FB-21-EN-A-039)
- [FB-21-EN-A-042 如何实现前端组件库文档的自动化生成？](../by-domain/21-dx.md#FB-21-EN-A-042)
- [FB-21-EN-A-044 如何实现前端项目的自动升级提醒？](../by-domain/21-dx.md#FB-21-EN-A-044)
- [FB-21-EN-A-046 前端项目中的环境变量管理有哪些最佳实践？](../by-domain/21-dx.md#FB-21-EN-A-046)
- [FB-21-EN-A-073 如何为前端项目设计分层测试策略？](../by-domain/21-dx.md#FB-21-EN-A-073)
- [FB-21-EN-A-076 如何设计前端项目的依赖升级和废弃策略？](../by-domain/21-dx.md#FB-21-EN-A-076)
- [FB-21-EN-A-078 如何实现前端工程配置的共享和版本管理？](../by-domain/21-dx.md#FB-21-EN-A-078)
- [FB-21-EN-A-079 在 pnpm Monorepo 中落地 Vite 需要解决哪些依赖链接与别名配置问题](../by-domain/21-dx.md#FB-21-EN-A-079)

### 部署与 SRE（3 道）

- [FB-22-EN-A-009 设计一个前端静态资源部署流程](../by-domain/22-deployment-sre.md#FB-22-EN-A-009)
- [FB-22-EN-A-012 前端如何实现自动回滚？](../by-domain/22-deployment-sre.md#FB-22-EN-A-012)
- [FB-22-EN-A-013 如何在 Kubernetes Ingress 中落地前端应用的 Incident Response 与故障隔离机制？](../by-domain/22-deployment-sre.md#FB-22-EN-A-013)

### 包管理与供应链安全（3 道）

- [FB-23-EN-A-011 Monorepo 中的 workspace 如何设计？包管理器 workspace 解决了什么问题？](../by-domain/23-package-supply-chain.md#FB-23-EN-A-011)
- [FB-23-EN-A-016 CI 中的依赖缓存策略如何设计？lockfile 在其中起什么作用？](../by-domain/23-package-supply-chain.md#FB-23-EN-A-016)
- [FB-23-EN-A-017 在 pnpm Monorepo 中如何落地供应链纵深防御体系？](../by-domain/23-package-supply-chain.md#FB-23-EN-A-017)

### 前端运维与监控（2 道）

- [FB-24-EN-A-003 如何设计前端日志采集方案？](../by-domain/24-frontend-operations.md#FB-24-EN-A-003)
- [FB-24-EN-A-006 前端灰度发布与回滚的监控要点有哪些？](../by-domain/24-frontend-operations.md#FB-24-EN-A-006)

### 系统架构设计（2 道）

- [FB-25-EN-A-004 Monorepo 中如何设计包依赖关系、版本策略和发布流程？](../by-domain/25-system-architecture.md#FB-25-EN-A-004)
- [FB-25-EN-A-014 前端如何实现自动化回归与架构守护？](../by-domain/25-system-architecture.md#FB-25-EN-A-014)

### 微前端（1 道）

- [FB-26-EN-A-014 微前端如何实现子应用独立部署？公共路径和资源加载要注意什么？](../by-domain/26-micro-frontend.md#FB-26-EN-A-014)

### 性能工程（1 道）

- [FB-27-EN-A-007 如何使用 Lighthouse 进行性能诊断和优化闭环？](../by-domain/27-performance.md#FB-27-EN-A-007)

### 质量保障（1 道）

- [FB-28-EN-A-015 如何设计一条 CI 中的质量流水线？](../by-domain/28-quality.md#FB-28-EN-A-015)

### 可观测性（1 道）

- [FB-30-EN-A-012 如何设计一个前端日志采集 SDK？](../by-domain/30-observability.md#FB-30-EN-A-012)

### 国际化（1 道）

- [FB-33-EN-A-001 全球化部署需要考虑哪些合规问题？](../by-domain/33-internationalization.md#FB-33-EN-A-001)

### 可视化与图形（1 道）

- [FB-34-EN-A-016 可视化工程架构中，如何分离组件、数据、样式与渲染器？](../by-domain/34-visualization-graphics.md#FB-34-EN-A-016)

### 技术战略（1 道）

- [FB-39-EN-A-004 如何建立技术债的识别、评估与偿还机制？](../by-domain/39-strategy.md#FB-39-EN-A-004)

### 项目管理（1 道）

- [FB-41-EN-A-007 前端项目常用哪些度量指标评估进度与健康度？](../by-domain/41-project-management.md#FB-41-EN-A-007)

### 招聘（1 道）

- [FB-42-EN-A-014 如何设计校招培养体系？](../by-domain/42-hiring.md#FB-42-EN-A-014)

### 技术治理与合规（1 道）

- [FB-44-EN-A-001 如何通过 CI/CD 流水线实现技术治理的自动化？](../by-domain/44-tech-governance.md#FB-44-EN-A-001)

### 鸿蒙 ArkTS / HarmonyOS（1 道）

- [FB-46-EN-A-016 鸿蒙工程化中有哪些模块化方案？如何选择 HAR、HSP、Feature HAP？](../by-domain/46-harmonyos.md#FB-46-EN-A-016)

### Electron（2 道）

- [FB-48-EN-A-007 Electron 打包与代码签名的流程是什么？](../by-domain/48-electron.md#FB-48-EN-A-007)
- [FB-48-EN-A-008 Electron 应用如何制定测试策略？](../by-domain/48-electron.md#FB-48-EN-A-008)

### WebAssembly（1 道）

- [FB-49-EN-A-006 Emscripten 是什么？它的胶水代码（glue code）做了什么？](../by-domain/49-webassembly.md#FB-49-EN-A-006)

### 低代码（1 道）

- [FB-52-EN-A-007 低代码平台的组件物料如何做版本管理？](../by-domain/52-low-code.md#FB-52-EN-A-007)

### 行业特化（1 道）

- [FB-56-EN-A-006 跨行业迁移时如何评估技术栈复用性？](../by-domain/56-industry.md#FB-56-EN-A-006)

## 深入题（79 道）{#proficient}

### 构建工具（1 道）

- [FB-10-EN-P-018 前端项目如何治理依赖版本、Lockfile 和 Changelog？](../by-domain/10-build-tools.md#FB-10-EN-P-018)

### Monorepo（19 道）

- [FB-11-EN-P-001 Turborepo 和 Nx 的核心差异是什么？如何选择？](../by-domain/11-monorepo.md#FB-11-EN-P-001)
- [FB-11-EN-P-002 Nx 的 affected 命令原理是什么？](../by-domain/11-monorepo.md#FB-11-EN-P-002)
- [FB-11-EN-P-003 如何设计 Monorepo 的 build caching 策略？](../by-domain/11-monorepo.md#FB-11-EN-P-003)
- [FB-11-EN-P-004 Lerna 在现代 Monorepo 中的定位是什么？](../by-domain/11-monorepo.md#FB-11-EN-P-004)
- [FB-11-EN-P-005 Rush 如何解决大型 Monorepo 的依赖一致性问题？](../by-domain/11-monorepo.md#FB-11-EN-P-005)
- [FB-11-EN-P-006 如何处理 Monorepo 中的循环依赖？](../by-domain/11-monorepo.md#FB-11-EN-P-006)
- [FB-11-EN-P-007 workspace protocol 与相对路径引用内部包有什么区别？](../by-domain/11-monorepo.md#FB-11-EN-P-007)
- [FB-11-EN-P-008 深入解析 pnpm 的 content-addressable store 原理。](../by-domain/11-monorepo.md#FB-11-EN-P-008)
- [FB-11-EN-P-009 如何在 Monorepo 中实现跨包类型检查？](../by-domain/11-monorepo.md#FB-11-EN-P-009)
- [FB-11-EN-P-010 详细说明 changesets 的 fixed 与 independent 模式内部实现差异。](../by-domain/11-monorepo.md#FB-11-EN-P-010)
- [FB-11-EN-P-011 pnpm 的 patch 机制在 Monorepo 中如何使用？](../by-domain/11-monorepo.md#FB-11-EN-P-011)
- [FB-11-EN-P-012 如何分析 Monorepo 中的依赖图并优化构建顺序？](../by-domain/11-monorepo.md#FB-11-EN-P-012)
- [FB-11-EN-P-013 如何处理 Monorepo 中大型二进制产物或 generated code 的缓存？](../by-domain/11-monorepo.md#FB-11-EN-P-013)
- [FB-11-EN-P-014 如何实现自定义 Turborepo remote cache backend？](../by-domain/11-monorepo.md#FB-11-EN-P-014)
- [FB-11-EN-P-015 深入解析 pnpm 的 dedupe 机制。](../by-domain/11-monorepo.md#FB-11-EN-P-015)
- [FB-11-EN-P-017 如何自己实现一个 affected 检测机制？](../by-domain/11-monorepo.md#FB-11-EN-P-017)
- [FB-11-EN-P-018 大型 Monorepo 如何优化 Git 性能？](../by-domain/11-monorepo.md#FB-11-EN-P-018)
- [FB-11-EN-P-020 如何处理跨包类型导出导致的 tree-shaking 问题？](../by-domain/11-monorepo.md#FB-11-EN-P-020)
- [FB-11-EN-P-021 如何保证 Monorepo 中 generated files 在 CI 中的幂等性？](../by-domain/11-monorepo.md#FB-11-EN-P-021)

### CI/CD（20 道）

- [FB-12-EN-P-001 如何设计一套环境晋升（Environment Promotion）策略？](../by-domain/12-ci-cd.md#FB-12-EN-P-001)
- [FB-12-EN-P-003 如何优化前端 CI/CD 构建流水线的性能？](../by-domain/12-ci-cd.md#FB-12-EN-P-003)
- [FB-12-EN-P-004 如何优化前端 Docker 构建与镜像体积？](../by-domain/12-ci-cd.md#FB-12-EN-P-004)
- [FB-12-EN-P-005 如何在 CI/CD 中设置有效的质量门禁（Quality Gates）？](../by-domain/12-ci-cd.md#FB-12-EN-P-005)
- [FB-12-EN-P-006 CI/CD 中的回滚策略有哪些？如何设计快速回滚？](../by-domain/12-ci-cd.md#FB-12-EN-P-006)
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全？](../by-domain/12-ci-cd.md#FB-12-EN-P-007)
- [FB-12-EN-P-008 GitHub Actions 的 Reusable Workflow 与 Composite Action 有什么区别？](../by-domain/12-ci-cd.md#FB-12-EN-P-008)
- [FB-12-EN-P-009 CI/CD 中如何识别和治理 Flaky Test？](../by-domain/12-ci-cd.md#FB-12-EN-P-009)
- [FB-12-EN-P-010 如何防止 Pipeline as Code 被恶意 PR 篡改或滥用？](../by-domain/12-ci-cd.md#FB-12-EN-P-010)
- [FB-12-EN-P-011 如何在 CI/CD 中实现动态测试环境（Ephemeral Environment）？](../by-domain/12-ci-cd.md#FB-12-EN-P-011)
- [FB-12-EN-P-012 如何在大型团队统一和治理 npm/yarn/pnpm 在 CI 中的使用？](../by-domain/12-ci-cd.md#FB-12-EN-P-012)
- [FB-12-EN-P-013 如何在 CI/CD 中安全管理和上传 Source Map？](../by-domain/12-ci-cd.md#FB-12-EN-P-013)
- [FB-12-EN-P-014 如何为 Monorepo 设计自动化版本发布和 Changelog 生成？](../by-domain/12-ci-cd.md#FB-12-EN-P-014)
- [FB-12-EN-P-015 如何在 CI/CD 中使用 OIDC 实现云厂商免密登录？](../by-domain/12-ci-cd.md#FB-12-EN-P-015)
- [FB-12-EN-P-016 如何构建 CI/CD 流水线的可观测性体系？](../by-domain/12-ci-cd.md#FB-12-EN-P-016)
- [FB-12-EN-P-017 SSR 或边缘渲染项目的 CI/CD 有哪些特殊考虑？](../by-domain/12-ci-cd.md#FB-12-EN-P-017)
- [FB-12-EN-P-019 如何识别和治理 CI 中的 Flaky Test？](../by-domain/12-ci-cd.md#FB-12-EN-P-019)
- [FB-12-EN-P-022 如何设计基于 Changesets 的自动化版本发布？](../by-domain/12-ci-cd.md#FB-12-EN-P-022)
- [FB-12-EN-P-024 如何在 CI 中实现前端视觉回归测试？](../by-domain/12-ci-cd.md#FB-12-EN-P-024)
- [FB-12-EN-P-026 如何在 CI/CD 中实现精细化权限与审批？](../by-domain/12-ci-cd.md#FB-12-EN-P-026)

### 代码质量与测试（4 道）

- [FB-13-EN-P-001 如何在 CI/CD 流程中设计前端测试流水线？](../by-domain/13-code-quality.md#FB-13-EN-P-001)
- [FB-13-EN-P-002 如何在 CI/CD 中实现前端测试失败自动分类与告警？](../by-domain/13-code-quality.md#FB-13-EN-P-002)
- [FB-13-EN-P-003 如何在 Monorepo 中设计增量测试策略？](../by-domain/13-code-quality.md#FB-13-EN-P-003)
- [FB-13-EN-P-004 如何在 CI/CD 中实现测试失败自动重试与 flaky 标记？](../by-domain/13-code-quality.md#FB-13-EN-P-004)

### Vue（1 道）

- [FB-16-EN-P-001 如何使用 Vite 构建一个支持 Tree Shaking 的 Vue 组件库？](../by-domain/16-vue.md#FB-16-EN-P-001)

### AI 工程化（3 道）

- [FB-18-EN-P-022 LLM 应用有哪些缓存策略？](../by-domain/18-ai-engineering.md#FB-18-EN-P-022)
- [FB-18-EN-P-023 如何构建前端 AI 组件库与 Prompt 市场？](../by-domain/18-ai-engineering.md#FB-18-EN-P-023)
- [FB-18-EN-P-055 如何为 LLM 应用设计语义缓存层？](../by-domain/18-ai-engineering.md#FB-18-EN-P-055)

### Git 工作流与变更管理（5 道）

- [FB-20-EN-P-017 Monorepo 中如何使用 Changesets 管理版本和发布？](../by-domain/20-git-workflow.md#FB-20-EN-P-017)
- [FB-20-EN-P-022 Git 如何与 CI/CD 流水线集成？](../by-domain/20-git-workflow.md#FB-20-EN-P-022)
- [FB-20-EN-P-049 partial clone 和 sparse checkout 能解决什么问题？](../by-domain/20-git-workflow.md#FB-20-EN-P-049)
- [FB-20-EN-P-053 Git 工作流如何与 npm/yarn/pnpm 变更联动？](../by-domain/20-git-workflow.md#FB-20-EN-P-053)
- [FB-20-EN-P-057 如何设计 Git 操作的原子性和可回滚脚本？](../by-domain/20-git-workflow.md#FB-20-EN-P-057)

### 开发者体验与工程效能（8 道）

- [FB-21-EN-P-018 代码生成（Code Generation）在前端工程中的应用场景和边界是什么？](../by-domain/21-dx.md#FB-21-EN-P-018)
- [FB-21-EN-P-019 Dev Container 如何解决本地开发环境一致性？给出一个 .devcontainer/devcontainer.json 配置示例。](../by-domain/21-dx.md#FB-21-EN-P-019)
- [FB-21-EN-P-022 远程开发环境（Remote Development）在大型前端项目中的优势和落地挑战是什么？](../by-domain/21-dx.md#FB-21-EN-P-022)
- [FB-21-EN-P-049 Monorepo 中如何实现版本发布自动化？](../by-domain/21-dx.md#FB-21-EN-P-049)
- [FB-21-EN-P-054 如何实现前端依赖的安全扫描与自动化修复？](../by-domain/21-dx.md#FB-21-EN-P-054)
- [FB-21-EN-P-080 大型前端项目如何设计模块联邦或微前端的构建协同？](../by-domain/21-dx.md#FB-21-EN-P-080)
- [FB-21-EN-P-084 如何设计前端资产的发现与复用机制？](../by-domain/21-dx.md#FB-21-EN-P-084)
- [FB-21-EN-P-085 如何在组件库文档站点中落地 Design Token 以实现代码与设计同步](../by-domain/21-dx.md#FB-21-EN-P-085)

### 部署与 SRE（4 道）

- [FB-22-EN-P-017 如何用容器化方式部署前端应用？](../by-domain/22-deployment-sre.md#FB-22-EN-P-017)
- [FB-22-EN-P-018 Kubernetes 基础与前端无状态服务部署](../by-domain/22-deployment-sre.md#FB-22-EN-P-018)
- [FB-22-EN-P-024 前端 Monorepo 多包部署策略](../by-domain/22-deployment-sre.md#FB-22-EN-P-024)
- [FB-22-EN-P-025 如何在 DevOps 流程中落地前端 HTTPS 全链路安全与证书自动化管理？](../by-domain/22-deployment-sre.md#FB-22-EN-P-025)

### 包管理与供应链安全（2 道）

- [FB-23-EN-P-020 私有 Registry / Verdaccio 如何企业级部署？](../by-domain/23-package-supply-chain.md#FB-23-EN-P-020)
- [FB-23-EN-P-021 React/Vue 组件库作为宿主依赖项目，如何管理 package-lock.json 与 peerDependencies？](../by-domain/23-package-supply-chain.md#FB-23-EN-P-021)

### 前端运维与监控（1 道）

- [FB-24-EN-P-005 前端版本管理与缓存失效如何设计？](../by-domain/24-frontend-operations.md#FB-24-EN-P-005)

### 系统架构设计（2 道）

- [FB-25-EN-P-007 描述一个前端架构从单体应用到微前端再到模块化架构的演进过程](../by-domain/25-system-architecture.md#FB-25-EN-P-007)
- [FB-25-EN-P-015 Monorepo 中的构建性能优化与远程缓存架构](../by-domain/25-system-architecture.md#FB-25-EN-P-015)

### 微前端（1 道）

- [FB-26-EN-P-021 微前端公共依赖版本冲突如何解决？](../by-domain/26-micro-frontend.md#FB-26-EN-P-021)

### 性能工程（1 道）

- [FB-27-EN-P-006 Service Worker 有哪些缓存策略？如何选择？](../by-domain/27-performance.md#FB-27-EN-P-006)

### 质量保障（1 道）

- [FB-28-EN-P-024 如何设计质量门禁？](../by-domain/28-quality.md#FB-28-EN-P-024)

### 可观测性（2 道）

- [FB-30-EN-P-023 日志脱敏与合规（PII/敏感信息）在前端如何处理？](../by-domain/30-observability.md#FB-30-EN-P-023)
- [FB-30-EN-P-024 如何构建前端稳定性保障体系？](../by-domain/30-observability.md#FB-30-EN-P-024)

### 技术战略（1 道）

- [FB-39-EN-P-003 如何在高速迭代中管理技术债，避免系统崩溃？](../by-domain/39-strategy.md#FB-39-EN-P-003)

### 项目管理（1 道）

- [FB-41-EN-P-007 如何建立前端工程效能指标体系？请给出指标分层与采集方式。](../by-domain/41-project-management.md#FB-41-EN-P-007)

### WebAssembly（1 道）

- [FB-49-EN-P-006 如何调试 WebAssembly？有哪些工具和方法？](../by-domain/49-webassembly.md#FB-49-EN-P-006)

### 低代码（1 道）

- [FB-52-EN-P-007 低代码平台的多人协作与实时同步如何实现？](../by-domain/52-low-code.md#FB-52-EN-P-007)

## 架构题（24 道）{#architect}

### TypeScript（1 道）

- [FB-02-EN-R-001 Monorepo 中 TypeScript 配置应该如何设计？](../by-domain/02-typescript.md#FB-02-EN-R-001)

### HTML/CSS（2 道）

- [FB-06-EN-R-001 如何在大型前端项目中管理 CSS？](../by-domain/06-html-css.md#FB-06-EN-R-001)
- [FB-06-EN-R-002 在 Monorepo 中如何组织样式代码和防止样式污染？](../by-domain/06-html-css.md#FB-06-EN-R-002)

### 构建工具（3 道）

- [FB-10-EN-R-001 CI/CD 中的构建优化与并行化策略。](../by-domain/10-build-tools.md#FB-10-EN-R-001)
- [FB-10-EN-R-002 如何设计前端构建的标准化流水线？](../by-domain/10-build-tools.md#FB-10-EN-R-002)
- [FB-10-EN-R-009 如何构建前端产物安全与供应链安全体系？](../by-domain/10-build-tools.md#FB-10-EN-R-009)

### AI 工程化（6 道）

- [FB-18-EN-R-028 如何建设 LLM 应用的可观测性体系？](../by-domain/18-ai-engineering.md#FB-18-EN-R-028)
- [FB-18-EN-R-032 AI 工程化如何做 CI/CD、模型版本管理与合规治理？](../by-domain/18-ai-engineering.md#FB-18-EN-R-032)
- [FB-18-EN-R-033 如何设计支持百万人同时在线的 AI 流式服务？](../by-domain/18-ai-engineering.md#FB-18-EN-R-033)
- [FB-18-EN-R-034 如何设计 LLM 应用的异地多活与灾备架构？](../by-domain/18-ai-engineering.md#FB-18-EN-R-034)
- [FB-18-EN-R-062 如何建设企业级 AI 工程化的标准前端组件与平台能力？](../by-domain/18-ai-engineering.md#FB-18-EN-R-062)
- [FB-18-EN-R-067 如何从治理角度保障企业 AI 工程化可持续发展？](../by-domain/18-ai-engineering.md#FB-18-EN-R-067)

### Node.js / BFF（1 道）

- [FB-19-EN-R-030 Node.js 服务如何做容器化部署与 CI/CD？](../by-domain/19-node-bff.md#FB-19-EN-R-030)

### Git 工作流与变更管理（5 道）

- [FB-20-EN-R-027 如何构建 Git 工作流中的自动化质量门禁？](../by-domain/20-git-workflow.md#FB-20-EN-R-027)
- [FB-20-EN-R-030 Git 灾难恢复和备份策略应该如何设计？](../by-domain/20-git-workflow.md#FB-20-EN-R-030)
- [FB-20-EN-R-059 Git 工作流如何与 DORA 指标联动？](../by-domain/20-git-workflow.md#FB-20-EN-R-059)
- [FB-20-EN-R-062 GitOps 如何与 Git 工作流结合？](../by-domain/20-git-workflow.md#FB-20-EN-R-062)
- [FB-20-EN-R-065 AI 辅助代码生成场景下，如何治理 Git 提交和审查？](../by-domain/20-git-workflow.md#FB-20-EN-R-065)

### 系统架构设计（1 道）

- [FB-25-EN-R-002 谈谈你对“前端工程化”的理解，它在前端架构中处于什么位置？](../by-domain/25-system-architecture.md#FB-25-EN-R-002)

### 微前端（1 道）

- [FB-26-EN-R-028 微前端团队的 CI/CD 与仓库组织策略应该如何设计？](../by-domain/26-micro-frontend.md#FB-26-EN-R-028)

### 可视化与图形（1 道）

- [FB-34-EN-R-029 大型可视化应用的构建、CI/CD、产物优化与多版本兼容策略如何设计？](../by-domain/34-visualization-graphics.md#FB-34-EN-R-029)

### 小程序（1 道）

- [FB-45-EN-R-002 小程序团队的工程化建设和 Monorepo 多包管理方案是什么？](../by-domain/45-mini-program.md#FB-45-EN-R-002)

### Flutter（1 道）

- [FB-47-EN-R-005 Flutter 项目的工程化与 CI/CD 应该如何设计？](../by-domain/47-flutter.md#FB-47-EN-R-005)

### Electron（1 道）

- [FB-48-EN-R-006 如何设计 Electron 的 CI/CD、签名、公证与自动发布流水线？](../by-domain/48-electron.md#FB-48-EN-R-006)

