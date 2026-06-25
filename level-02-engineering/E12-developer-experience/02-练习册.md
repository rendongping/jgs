# Developer Experience 练习册

> 通过练习掌握开发者体验的评估、工具链设计、脚手架与文档工程。

---

## 难度分级

- 🟢 基础：理解概念，能识别 DX 问题。
- 🟡 进阶：能应用工具优化本地开发体验。
- 🔴 深入：能设计团队级 DX 体系和度量机制。

---

## 一、选择题

### 第 1 题（🟢）

DX 中的"内循环"主要指什么？

A. CI/CD 流水线  
B. 开发者日常编码到提交的反馈循环  
C. 代码评审流程  
D. 生产环境监控

### 第 2 题（🟢）

以下哪个指标最能反映本地开发反馈速度？

A. 代码行数  
B. HMR 时间  
C. 团队人数  
D. 发布次数

### 第 3 题（🟡）

以下哪个工具最适合生成组件文档？

A. VitePress  
B. Storybook  
C. TypeDoc  
D. Docusaurus

### 第 4 题（🟡）

为了保证团队 Node 版本一致，以下哪种做法最推荐？

A. 在 README 中写明版本号  
B. 使用 .nvmrc 和 engines 字段，并结合 volta/fnm  
C. 依赖开发者自觉安装  
D. 不限制版本

### 第 5 题（🟡）

以下哪项不属于 DX 的核心维度？

A. 认知负荷  
B. 反馈速度  
C. 代码复杂度  
D. 可发现性

### 第 6 题（🔴）

在 Monorepo 中，以下哪种方式最能优化本地开发构建速度？

A. 每次全量构建  
B. 使用 affected 检测 + 远程缓存  
C. 删除测试  
D. 减少包数量

---

## 二、代码分析题

### 第 7 题（🟡）

分析以下报错信息的问题，并给出改进建议：

```
Error: fail
    at build (/project/scripts/build.js:12:5)
```

### 第 8 题（🟡）

以下是一个项目的 package.json scripts，分析其 DX 问题：

```json
{
  "scripts": {
    "start": "webpack-dev-server",
    "test": "jest",
    "build": "webpack"
  }
}
```

### 第 9 题（🔴）

某团队新成员入职后，平均需要 3 天才能跑通本地开发环境。请分析可能的原因并给出改进方案。

---

## 三、设计/开放题

### 第 10 题（🟡）

设计一个前端项目的 README 模板，要求新成员能在 10 分钟内完成环境搭建并运行项目。

### 第 11 题（🔴）

为团队设计一套 DX 度量体系，包括：
- 需要度量哪些指标
- 如何收集数据
- 如何根据数据持续改进

### 第 12 题（🔴）

设计一个企业级前端脚手架 CLI，要求：
- 支持创建 React/Vue 项目
- 支持选择是否使用 TypeScript、测试、CI/CD
- 能自动配置 ESLint、Prettier、Husky
- 生成项目后可直接运行

---

## 参考答案

### 第 1 题

**答案：B**

内循环指开发者日常最高频的工作流：编码 → 保存 → 构建 → 测试 → 调试 → 提交。

### 第 2 题

**答案：B**

HMR（Hot Module Replacement）时间直接反映保存代码后看到效果的反馈速度。

### 第 3 题

**答案：B**

Storybook 是专门用于组件文档和交互式测试的工具。TypeDoc 更适合 API 文档，VitePress/Docusaurus 适合项目文档站点。

### 第 4 题

**答案：B**

通过 `.nvmrc`、`package.json` 的 `engines` 字段，结合 `volta` 或 `fnm`，可以自动固定和切换 Node 版本。

### 第 5 题

**答案：C**

DX 的核心维度包括认知负荷、反馈速度、可靠性、可发现性、自动化、愉悦感。代码复杂度是影响 DX 的因素，但不是 DX 本身的维度。

### 第 6 题

**答案：B**

在 Monorepo 中，使用 affected 检测只构建变更的包，并配合远程缓存，可以显著提升本地开发构建速度。

### 第 7 题

**问题分析**：
- 错误信息"fail"没有说明失败原因。
- 没有给出解决方案。
- 堆栈信息虽然有用，但对用户不够友好。

**改进建议**：

```
[build] 构建失败：缺少环境变量 VITE_API_BASE_URL

请在项目根目录创建 .env 文件，并添加：
VITE_API_BASE_URL=https://api.example.com

更多信息请参考文档：https://example.com/docs/env
```

### 第 8 题

**问题分析**：
1. 脚本命名不一致：`start`、`test`、`build`，缺少 `dev`、`lint`、`format` 等常用脚本。
2. 没有类型检查命令。
3. 缺少 pre-commit 钩子配置。
4. 没有说明环境要求。

**改进建议**：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ci": "vitest run",
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  }
}
```

### 第 9 题

**可能原因**：
1. 缺少清晰的 README 或快速开始文档。
2. 环境依赖未明确（Node 版本、包管理器、环境变量）。
3. 需要手动配置多个外部服务（数据库、API）。
4. 缺少本地 Mock 数据。
5. 构建工具或依赖版本不兼容。

**改进方案**：
1. 编写详细的 README，包含环境要求、安装步骤、常见错误。
2. 使用 `.nvmrc` 和 `engines` 固定环境。
3. 提供 Docker Compose 或本地 Mock 服务。
4. 使用 `dotenv` 模板文件 `.env.example`。
5. 编写 onboarding 脚本，自动检查环境并安装依赖。
6. 建立新人 FAQ 和导师制度。

### 第 10 题

**README 模板要点**：

```markdown
# 项目名称

一句话描述项目价值。

## 环境要求

- Node.js >= 18
- pnpm >= 8

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 `http://localhost:5173`

## 常用命令

| 命令 | 说明 |
|------|------|
| pnpm dev | 启动开发服务器 |
| pnpm build | 生产构建 |
| pnpm test | 运行测试 |
| pnpm lint | 代码检查 |

## 项目结构

```
src/
  components/  # 组件
  pages/       # 页面
  hooks/       # 自定义 Hooks
  utils/       # 工具函数
```

## 环境变量

复制 `.env.example` 为 `.env`，并填写必要配置。

## 常见问题

参见 `FAQ.md`
```

### 第 11 题

**DX 度量体系**：

**度量指标**：
1. 内循环指标：HMR 时间、构建时间、测试时间。
2. CI 指标：PR 检查时间、成功率、恢复时间。
3. 入职指标：新成员首次提交时间、环境搭建成功率。
4. 满意度指标：定期 NPS 调研。

**数据收集**：
- 构建时间：CI 日志、本地工具埋点。
- HMR 时间：开发服务器日志。
- 满意度：季度调研。

**持续改进**：
- 设立 DX 周会，讨论 Top 痛点。
- 每个季度设定 1-2 个 DX OKR。
- 发布 DX 报告，公开度量结果。

### 第 12 题

**脚手架设计**：

```bash
my-cli create <project-name>
  ? 选择框架：React / Vue
  ? 是否使用 TypeScript？Yes / No
  ? 是否添加测试？Vitest / None
  ? 是否添加 CI/CD？GitHub Actions / None
  ? 是否添加 Husky + lint-staged？Yes / No
```

**生成内容**：
- 项目目录结构
- `package.json` 含 scripts
- `vite.config.ts`
- ESLint / Prettier 配置
- TypeScript 配置
- 测试配置
- GitHub Actions 工作流（可选）
- Husky 钩子（可选）
- README 模板

**实现方式**：
- 使用 Node.js CLI 框架（如 commander + inquirer）。
- 模板文件放在 templates/ 目录。
- 根据用户选择渲染模板。
- 生成后自动运行 `pnpm install`。

---

**标签**：`#dx` `#developer-experience` `#脚手架` `#文档工程` `#内循环`

> **最后更新**：2026-06-25
