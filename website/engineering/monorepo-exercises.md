# Monorepo 练习册

> 本练习册基于《Monorepo 学习文档》编写，涵盖 Monorepo vs Polyrepo、pnpm workspace、Turborepo、Nx、Rush、依赖管理、版本发布、构建缓存、任务调度等核心知识点。每题均附答案与解析，难度由浅入深。

---

## 一、选择题

### 第 1 题
以下哪一项不是 Monorepo 的优势？

A. 代码共享方便  
B. 原子化提交  
C. 仓库体积小  
D. 统一规范

::: details 查看答案与解析
**答案：C**

**解析：** Monorepo 的劣势之一正是仓库体积大、git 操作可能变慢。代码共享方便、原子化提交、统一规范都是其优势。
:::

---

### 第 2 题
pnpm workspace 中，用于声明哪些目录属于 workspace 的配置文件是？

A. `package.json`  
B. `pnpm-workspace.yaml`  
C. `turbo.json`  
D. `nx.json`

::: details 查看答案与解析
**答案：B**

**解析：** `pnpm-workspace.yaml` 是 pnpm workspace 的配置文件，通过 `packages` 字段声明哪些目录属于 workspace。
:::

---

### 第 3 题
Turborepo 的口号"Never run the same command twice"主要体现了什么能力？

A. 自动发布  
B. 构建缓存  
C. 权限控制  
D. 依赖安装

::: details 查看答案与解析
**答案：B**

**解析：** Turborepo 的核心优势是构建缓存和任务并行。如果输入文件没有变化，Turborepo 会直接复用上一次的构建产物，避免重复执行。
:::

---

### 第 4 题
在 Monorepo 中，`workspace:*` 协议的作用是？

A. 安装最新版本的 npm 包  
B. 引用同一个 workspace 下的内部包  
C. 锁定所有依赖版本  
D. 声明全局脚本

::: details 查看答案与解析
**答案：B**

**解析：** `workspace:*` 表示引用同一个 workspace 下的内部包，发布到 npm 时会自动替换为具体版本号。
:::

---

### 第 5 题
以下哪种工具最适合超大型 Monorepo，并对依赖版本和发布流程有严格控制？

A. pnpm workspace  
B. Turborepo  
C. Nx  
D. Rush

::: details 查看答案与解析
**答案：D**

**解析：** Rush 是微软开源的 Monorepo 解决方案，强调可扩展和严格，适合超大型仓库，对依赖版本、批量发布、变更日志有严格控制。
:::

---

## 二、填空题

### 第 6 题
Polyrepo 模式下，公共组件或工具库通常需要先发布到 ________，其他项目再安装使用。

::: details 查看答案与解析
**答案：npm（或包管理器/私有仓库）**

**解析：** Polyrepo 中各项目独立，代码复用困难，公共库需要先发布到 npm 等包仓库，其他项目才能安装引用。
:::

---

### 第 7 题
在 Turborepo 的 `turbo.json` 中，`dependsOn: ["^build"]` 里的 `^` 符号表示 ________。

::: details 查看答案与解析
**答案：上游依赖 / 依赖包的 build 任务**

**解析：** `^` 表示当前包的 build 任务依赖其所依赖的其他包的 build 任务，即先构建上游依赖。
:::

---

### 第 8 题
Changesets 中，版本变更类型包括 major、minor、________。

::: details 查看答案与解析
**答案：patch**

**解析：** Changesets 用 major/minor/patch 表示破坏性变更、新功能、补丁修复。
:::

---

### 第 9 题
pnpm 通过严格的依赖隔离，有效避免了 ________ 问题。

::: details 查看答案与解析
**答案：幽灵依赖（Phantom Dependencies）**

**解析：** 幽灵依赖指某个包未声明依赖却能使用上层 node_modules 中的依赖。pnpm 的严格依赖隔离让包只能访问自己声明的依赖，从而避免该问题。
:::

---

### 第 10 题
TypeScript 项目引用中，子包的 `tsconfig.json` 需要设置 `composite: ________` 以启用项目引用。

::: details 查看答案与解析
**答案：true**

**解析：** 启用 TypeScript Project References 时，被引用的子包需要在 `compilerOptions` 中设置 `composite: true`。
:::

---

## 三、代码分析题

### 第 11 题
分析以下 `pnpm-workspace.yaml` 配置，说明该 Monorepo 包含哪些 workspace 包？

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - '!**/test/**'
```

::: details 查看答案与解析
**答案与解析：**

该配置声明：

- `packages/*` 下的所有目录均为 workspace 包；
- `apps/*` 下的所有目录均为 workspace 包；
- `!**/test/**` 表示排除所有 `test` 目录，即使它们位于 `packages/` 或 `apps/` 下也不会被识别为 workspace 包。
:::

---

### 第 12 题
分析以下 `turbo.json` 配置，说明任务之间的依赖关系。

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
```

::: details 查看答案与解析
**答案与解析：**

- `build` 任务依赖其上游依赖包的 `build` 任务，输出目录为 `dist/**` 和 `.next/**`。
- `test` 任务依赖当前包的 `build` 任务完成后才能执行。
- `lint` 任务无依赖，可独立并行执行。
:::

---

### 第 13 题
分析以下 `package.json` 中的依赖声明，说明 `@myorg/utils` 是如何被引用的。

```json
{
  "dependencies": {
    "@myorg/utils": "workspace:*"
  }
}
```

::: details 查看答案与解析
**答案与解析：**

`workspace:*` 表示引用同一个 workspace 下的 `@myorg/utils` 包，而不是从 npm 下载。发布到 npm 时，工具会自动把 `workspace:*` 替换为 `@myorg/utils` 的实际版本号，确保外部用户能正确安装。
:::

---

### 第 14 题
分析以下 TypeScript 项目引用配置，说明 `packages/app` 与 `packages/utils` 的关系。

```json
// packages/utils/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  }
}

// packages/app/tsconfig.json
{
  "references": [
    { "path": "../utils" }
  ]
}
```

::: details 查看答案与解析
**答案与解析：**

`packages/app` 通过 `references` 引用了 `packages/utils`。TypeScript 会建立两者之间的编译依赖关系：

- `utils` 是 `app` 的依赖项目；
- 编译 `app` 时会先确保 `utils` 已编译；
- 使用 Project References 可避免全量类型检查，加速大型 Monorepo 的编译。
:::

---

### 第 15 题
分析以下 `nx.json` 配置，说明 `targetDefaults` 的作用。

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

::: details 查看答案与解析
**答案与解析：**

`targetDefaults` 为 Nx 中的目标（target）定义默认配置。这里表示所有子包的 `build` 目标默认依赖其依赖包的 `build` 目标。这样配置一次即可生效，无需在每个子包的 project.json 中重复声明。
:::

---

## 四、实践题

### 第 16 题
请为一个小型 Monorepo 设计目录结构，包含一个共享工具包 `utils`、一个组件库 `ui` 和一个应用 `app`，并写出 `pnpm-workspace.yaml` 和根目录 `package.json` 的核心配置。

::: details 查看答案与解析
**参考答案：**

目录结构：

```
my-monorepo/
├── package.json
├── pnpm-workspace.yaml
├── packages/
│   ├── utils/
│   │   ├── package.json
│   │   └── src/index.js
│   └── ui/
│       ├── package.json
│       └── src/Button.jsx
└── apps/
    └── app/
        ├── package.json
        └── src/main.js
```

`pnpm-workspace.yaml`：

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

根目录 `package.json`：

```json
{
  "name": "my-monorepo",
  "private": true,
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^8.0.0"
  }
}
```

**解析：**

- 根目录通常设置为 `private: true`，防止误发布。
- 通用开发依赖放在根目录，运行时依赖放在各子包。
- `pnpm-workspace.yaml` 声明 workspace 范围。
:::

---

### 第 17 题
请写出 Turborepo 的 `turbo.json` 配置，要求：

1. `build` 任务依赖上游 `build`；
2. `test` 任务依赖当前包的 `build`；
3. `lint` 无依赖；
4. `build` 输出 `dist/` 目录。

::: details 查看答案与解析
**参考答案：**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
```

**解析：**

- `dependsOn: ["^build"]` 保证依赖包先构建；
- `dependsOn: ["build"]` 保证当前包构建完成后再测试；
- `lint` 无依赖，可独立并行执行。
:::

---

### 第 18 题
请描述如何使用 Changesets 管理 Monorepo 版本发布，写出主要命令及流程。

::: details 查看答案与解析
**参考答案：**

主要流程：

1. 开发者在提交代码后运行：

```bash
pnpm changeset
```

选择变更的包和变更类型（major/minor/patch），生成一个 changeset 文件。

2. 合并到主分支后，运行：

```bash
pnpm changeset version
```

自动 bump 版本号、生成 changelog。

3. 最后发布：

```bash
pnpm changeset publish
```

将包发布到 npm。

**解析：**

Changesets 通过显式声明变更，使版本升级和 changelog 生成自动化、可追溯，是现代 Monorepo 版本管理的事实标准。
:::

---

### 第 19 题
请写出一个 `CODEOWNERS` 文件示例，指定 `packages/ui` 由 `@team-ui` 负责，`packages/api` 由 `@team-backend` 负责。

::: details 查看答案与解析
**参考答案：**

```
/packages/ui @team-ui
/packages/api @team-backend
```

**解析：**

`CODEOWNERS` 文件用于指定目录或文件的负责人。当这些目录的代码发生变更时，对应团队会自动成为 PR Reviewer，便于权限治理和代码审查。
:::

---

### 第 20 题
某 Monorepo 中，A 包依赖 B 包，B 包又依赖 A 包，导致构建失败。请分析原因并给出解决方案。

::: details 查看答案与解析
**答案与解析：**

**原因：** A 包与 B 包之间存在循环依赖，会导致构建顺序无法确定，或运行时出现未初始化模块的问题。

**解决方案：**

1. **重新审视职责边界**：将 A、B 包中互相依赖的逻辑抽离到独立的 C 包中。
2. **使用依赖注入或事件机制**：通过运行时注入或事件总线解耦 A、B 包之间的直接依赖。
3. **合并包**：如果 A、B 包职责高度相关，可考虑合并为一个包。

循环依赖是 Monorepo 设计中常见的问题，关键在于保持包的单一职责和清晰的依赖方向。
:::

---

## 参考答案速查表

| 题号 | 题型 | 答案 |
|------|------|------|
| 1 | 选择 | C |
| 2 | 选择 | B |
| 3 | 选择 | B |
| 4 | 选择 | B |
| 5 | 选择 | D |
| 6 | 填空 | npm |
| 7 | 填空 | 上游依赖 / 依赖包的 build |
| 8 | 填空 | patch |
| 9 | 填空 | 幽灵依赖 |
| 10 | 填空 | true |
| 11-15 | 代码分析 | 见解析 |
| 16-20 | 实践 | 见参考答案 |

---

> **领域编号**：E02 Monorepo  
> **最后更新**：2026-06-18
