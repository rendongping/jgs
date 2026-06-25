# 前端架构师知识库标签体系

> 本文档统一规定本知识库的标签词表，用于 AI 推荐、知识图谱构建和学习数据分析。

---

## 使用说明

- 标签应优先从本词表中选取。
- 每篇学习文档建议标注 5-10 个标签。
- 每道客观题/面试题建议标注 1-3 个标签。
- 新增标签需同步更新本文件，避免同义多词。

---

## Level 01 基础层

### F01 JavaScript

`js`, `event-loop`, `closure`, `prototype`, `this`, `async`, `promise`, `v8`, `es-next`, `memory-management`

### F02 TypeScript

`typescript`, `type-system`, `generics`, `type-inference`, `type-guards`, `structural-typing`, `covariance`, `contravariance`, `tsconfig`

### F03 Browser

`browser`, `rendering`, `dom`, `cssom`, `reflow`, `repaint`, `composite`, `event-propagation`, `storage`, `cache`, `web-vitals`

### F04 Network

`http`, `https`, `tcp`, `udp`, `dns`, `cdn`, `websocket`, `rest`, `graphql`, `http2`, `http3`, `webrtc`

### F05 Security

`security`, `xss`, `csrf`, `csp`, `cors`, `oauth`, `mitm`, `supply-chain`, `webauthn`, `encryption`

### F06 HTML/CSS 工程化（新增）

`html`, `css`, `semantic-html`, `bem`, `atomic-css`, `responsive-design`, `container-queries`, `css-variables`, `css-performance`, `modern-css`

### F07 Web 无障碍（新增）

`a11y`, `wcag`, `aria`, `keyboard-navigation`, `screen-reader`, `color-contrast`, `focus-management`, `inclusive-design`

### F08 数据结构与算法（新增）

`algorithms`, `data-structures`, `complexity-analysis`, `big-o`, `leetcode`, `lru`, `tree`, `graph`, `dynamic-programming`

### F09 设计模式与软件工程基础（新增）

`design-patterns`, `solid`, `refactoring`, `software-engineering`, `hoc`, `composition`, `observer`, `strategy`

---

## Level 02 工程化层

### E01 Build Tools

`webpack`, `vite`, `rollup`, `esbuild`, `rspack`, `tree-shaking`, `code-splitting`, `hmr`, `module-federation`, `bundler`

### E02 Monorepo

`monorepo`, `pnpm-workspace`, `turborepo`, `nx`, `rush`, `dependency-management`, `remote-cache`, `changesets`

### E03 CI/CD

`ci-cd`, `github-actions`, `gitlab-ci`, `jenkins`, `docker`, `pipeline`, `deployment`, `canary-release`, `devsecops`

### E04 Code Quality

`eslint`, `prettier`, `husky`, `jest`, `vitest`, `cypress`, `playwright`, `unit-test`, `e2e-test`, `mutation-testing`, `codemod`

### E05 Design System

`design-system`, `design-tokens`, `storybook`, `component-library`, `css-in-js`, `atomic-css`, `a11y`, `theming`, `multi-brand`

### E06 React

`react`, `hooks`, `fiber`, `virtual-dom`, `concurrent-features`, `server-components`, `react-compiler`, `state-management`

### E07 Vue

`vue`, `reactivity`, `composition-api`, `virtual-dom`, `vapor-mode`, `vue-router`, `pinia`

### E08 Cross Platform

`cross-platform`, `react-native`, `flutter`, `mini-program`, `electron`, `taro`, `uniapp`, `harmonyos`, `arkts`, `kmp`

### E09 AI Engineering

`ai-engineering`, `llm`, `prompt-engineering`, `rag`, `agent`, `mcp`, `structured-output`, `function-calling`, `vibe-coding`, `edge-ai`

### E10 Node.js / BFF

`nodejs`, `bff`, `nestjs`, `express`, `fastify`, `trpc`, `grpc`, `message-queue`, `orm`, `serverless`, `observability`

### E11 Git 工作流与版本控制（新增）

`git`, `version-control`, `branching-strategy`, `code-review`, `git-flow`, `trunk-based`, `changesets`, `large-repo`

### E12 Developer Experience（新增）

`dx`, `developer-experience`, `scaffold`, `local-dev`, `ide`, `documentation-engineering`, `inner-loop`, `developer-productivity`

### E13 前端部署与运维（SRE）（新增）

`deployment`, `sre`, `cdn`, `canary-release`, `blue-green`, `rollback`, `observability`, `reliability`, `rto`, `rpo`

### E14 前端包管理与供应链安全（新增）

`package-management`, `npm`, `pnpm`, `lockfile`, `supply-chain`, `sbom`, `dependency-audit`, `private-registry`

---

## Level 03 架构层

### A01 System Architecture

`architecture`, `mvc`, `mvp`, `mvvm`, `bff`, `ddd`, `layered-architecture`, `hexagonal-architecture`, `clean-architecture`, `microkernel`, `plugin`, `low-code`, `sdui`, `cqrs`

### A02 Micro Frontend

`micro-frontend`, `qiankun`, `single-spa`, `module-federation`, `web-components`, `isolation`, `communication`, `shared-dependencies`

### A03 Performance

`performance`, `lcp`, `inp`, `cls`, `fcp`, `ttfb`, `lazy-loading`, `preloading`, `code-splitting`, `ssr`, `ssg`, `performance-budget`

### A04 Quality

`quality`, `testing-pyramid`, `unit-test`, `integration-test`, `e2e-test`, `code-review`, `canary-release`, `contract-test`, `visual-regression`

### A05 Data & State

`data-state`, `client-state`, `server-state`, `cache-strategy`, `optimistic-update`, `offline-sync`, `crdt`, `tanstack-query`

### A06 Observability

`observability`, `logs`, `metrics`, `traces`, `sentry`, `web-vitals`, `logging`, `slo`, `sla`, `error-budget`, `opentelemetry`

### A07 前端安全架构（新增）

`security-architecture`, `threat-modeling`, `sdl`, `supply-chain-security`, `privacy-by-design`, `gdpr`, `zero-trust`, `security-audit`

### A08 实时与协同架构（新增）

`real-time`, `websocket`, `sse`, `long-polling`, `collaborative-editing`, `ot`, `crdt`, `connection-management`

### A09 国际化与本地化架构（新增）

`i18n`, `l10n`, `rtl`, `multi-language`, `localization`, `translation-workflow`, `timezone`, `currency`, `compliance`

### A10 前端可视化与图形架构（新增）

`visualization`, `svg`, `canvas`, `webgl`, `echarts`, `d3`, `deck-gl`, `large-data-rendering`, `gpu`

### A11 Serverless / Edge 架构（新增）

`serverless`, `edge`, `cloudflare-workers`, `vercel-edge`, `faas`, `cdn`, `cold-start`, `global-deployment`

### A12 前端数据工程（新增）

`data-engineering`, `tracking`, `ab-testing`, `metrics`, `north-star-metric`, `dashboard`, `funnel`, `retention`

---

## Level 04 领导力层

### L01 Business

`business`, `product-thinking`, `roi`, `requirements-analysis`, `5-whys`, `data-driven`, `cross-functional`

### L02 Team

`team-leadership`, `code-review`, `mentorship`, `growth`, `team-culture`, `technical-standard`, `knowledge-sharing`

### L03 Strategy

`strategy`, `tech-roadmap`, `technical-debt`, `innovation`, `cost-control`, `organization`, `adr`

### L04 沟通表达与影响力（新增）

`communication`, `technical-writing`, `public-speaking`, `upward-management`, `negotiation`, `conflict-resolution`, `influence`

### L05 项目管理与交付（新增）

`project-management`, `agile`, `scrum`, `okr`, `milestone`, `risk-management`, `delivery`

### L06 招聘培养与组织发展（新增）

`hiring`, `interview`, `performance-review`, `promotion`, `team-culture`, `psychological-safety`, `talent-development`

### L07 技术品牌与社区影响力（新增）

`tech-branding`, `open-source`, `community`, `tech-talk`, `blogging`, `employer-branding`, `influence`

### L08 技术治理与变革管理（新增）

`tech-governance`, `change-management`, `technical-debt`, `standards`, `architecture-review`, `komitee`, `kotter`

---

## 通用标签

`architecture`, `engineering`, `best-practice`, `anti-pattern`, `trade-off`, `interview`, `case-study`

---

## 标签命名规范

1. 使用小写字母和连字符，如 `event-loop`。
2. 中文标签仅在领域特有且英文难以表达时使用。
3. 避免同义词重复，如 `performance` 和 `perf` 只保留一个。
4. 标签应具备可聚合性，便于统计和推荐。

---

> **最后更新**：2026-06-25
