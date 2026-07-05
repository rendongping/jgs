# Monorepo 面试题

> 本题库共收录 **120** 道面试题（基础 29 / 进阶 31 / 深入 31 / 架构 29）。
> 本文件收录 Monorepo 相关面试题，目标题量 80 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、工程化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（16 道）{#basic}

### FB-11-CO-B-001：什么是 Monorepo？它与 Multirepo 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：Monorepo、Multirepo、代码组织、仓库策略
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Monorepo 的概念，并说明它与 Multirepo 在代码组织、依赖管理、协作方式上的主要区别。

**参考答案**：

Monorepo（单一代码库）指将多个项目、包或服务放在同一个版本控制仓库中统一管理的策略。Multirepo 则是每个项目一个独立仓库。

主要区别：

| 维度 | Monorepo | Multirepo |
|------|----------|-----------|
| 仓库结构 | 一个仓库包含多个包 / 应用 | 每个项目一个仓库 |
| 代码共享 | 直接引用内部包，便于复用 | 通过 npm 发布后再依赖 |
| 依赖管理 | 统一 lockfile，统一版本策略 | 各项目独立管理 |
| 跨包重构 | 原子提交，一次改动多个包 | 需要跨仓库协调发布 |
| 构建工具 | 需要 workspace / 构建编排工具 | 各自独立构建 |
| 权限控制 | 粒度较粗，需配合目录权限 | 仓库级别天然隔离 |
| 适用场景 | 关联紧密的产品线、组件库、微前端 | 独立产品、开源库、跨团队 |

```text
monorepo/
├── packages/
│   ├── ui-kit/
│   ├── utils/
│   └── shared-types/
├── apps/
│   ├── web-app/
│   └── admin-app/
└── pnpm-workspace.yaml
```

**评分维度**：
- 概念准确性（40%）：能否清晰定义 Monorepo
- 对比维度完整性（40%）：是否覆盖代码共享、依赖管理、重构成本
- 适用场景（20%）：能否举例说明何时选用

**常见错误**：
- 将 Monorepo 等同于“把代码放在一个仓库”，忽略 workspace 机制
- 认为 Monorepo 一定比 Multirepo 好，忽略团队规模与产品耦合度

**延伸追问**：
- 你们团队为什么选择 Monorepo？如果让你选择，会考虑哪些因素？
- Monorepo 下如何做代码所有权（Code Ownership）划分？

**参考资源**：
- [Monorepo Explained](https://monorepo.tools/)

**口头回答版**：
> Monorepo（单一代码库）指将多个项目、包或服务放在同一个版本控制仓库中统一管理的策略。 Multirepo 则是每个项目一个独立仓库。 | 维度 | Monorepo | Multirepo | |------|----------|-----------|

---
### FB-11-CO-B-002：npm / yarn / pnpm 的 workspace 分别是什么？如何启用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：workspace、npm、yarn、pnpm、包管理
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 npm workspaces、yarn workspaces 和 pnpm workspaces 的基本概念，并分别写出它们的启用方式。

**参考答案**：

Workspace 是包管理器提供的单仓库多包管理能力，允许在根目录下管理多个子包，并在它们之间建立本地链接。

启用方式：

1. **npm workspaces**（npm 7+）：
   ```json
   {
     "name": "my-monorepo",
     "private": true,
     "workspaces": ["packages/*", "apps/*"]
   }
   ```

2. **yarn workspaces**（yarn 1.x / 2.x / 3.x / 4.x）：
   ```json
   {
     "name": "my-monorepo",
     "private": true,
     "workspaces": ["packages/*", "apps/*"]
   }
   ```
   Yarn Berry（2+）还需 `.yarnrc.yml` 配置。

3. **pnpm workspaces**：
   ```yaml
   packages:
     - 'packages/*'
     - 'apps/*'
   ```

三者都会将子包的 `node_modules/.bin` 聚合到根目录，并建立包之间的软链接，方便本地开发。

**评分维度**：
- 说清 workspace 作用（40%）
- 能写出三种配置（40%）
- 提到版本要求，如 npm 7+ / yarn 1+ / pnpm（20%）

**常见错误**：
- 忘记在根 `package.json` 加 `"private": true`，导致误发布根包
- 混淆 yarn 1.x 与 yarn Berry 的配置差异

**延伸追问**：
- 如果 `packages/foo` 依赖 `packages/bar`，workspace 会如何解析？
- npm workspace 和 pnpm workspace 在依赖安装路径上有什么不同？

**参考资源**：
- [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [yarn workspaces](https://yarnpkg.com/features/workspaces)

**口头回答版**：
> Workspace 是包管理器提供的单仓库多包管理能力，允许在根目录下管理多个子包，并在它们之间建立本地链接。 npm workspaces（npm 7+）： yarn workspaces（yarn 1.x / 2.x / 3.x / 4.x）： Yarn Berry（2+）还需 .yarnrc.yml 配置。

---

### FB-11-CO-B-003：什么是 workspace protocol（workspace:）？它的作用是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：workspace protocol、workspace:、内部包、依赖解析
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
在 pnpm / yarn Berry Monorepo 中，经常看到这样的依赖声明：`"@scope/utils": "workspace:^"`。请解释 `workspace:` protocol 的含义和作用。

**参考答案**：

`workspace:` 是一种 workspace 协议，用于声明某个依赖是仓库内部的包，而不是远程 registry 上的包。

作用：

1. **本地优先解析**：安装时优先链接到 workspace 内的本地包，而不是去 npm 下载。
2. **发布时自动替换**：发布内部包时，包管理器会自动把 `workspace:^` 替换为实际版本号，如 `^1.2.3`。
3. **避免版本漂移**：明确标识内部依赖，防止误引用外部同名包。

写法示例：

```json
{
  "dependencies": {
    "@scope/utils": "workspace:*",
    "@scope/ui": "workspace:^",
    "@scope/core": "workspace:~"
  }
}
```

- `workspace:*`：精确匹配本地版本，发布时替换为具体版本号。
- `workspace:^`：允许兼容版本，发布时替换为 `^x.y.z`。
- `workspace:~`：发布时替换为 `~x.y.z`。

**评分维度**：
- 说清 protocol 作用（50%）
- 能区分 `*`、`^`、`~` 的语义（30%）
- 提到发布时的自动替换行为（20%）

**常见错误**：
- 认为 `workspace:` 是 npm workspaces 原生支持（npm 原生不支持，需 pnpm/yarn Berry）
- 混淆 `workspace:*` 与 `workspace:^` 的发布行为

**延伸追问**：
- 如果不使用 `workspace:`，直接用 `"@scope/utils": "^1.0.0"`，会有什么问题？
- 发布时 `workspace:*` 会被替换成什么？

**参考资源**：
- [pnpm workspace protocol](https://pnpm.io/workspaces#workspace-protocol-workspace)
- [yarn workspace protocol](https://yarnpkg.com/features/workspaces#workspace-protocol-workspace)

**口头回答版**：
> workspace: 是一种 workspace 协议，用于声明某个依赖是仓库内部的包，而不是远程 registry 上的包。 本地优先解析：安装时优先链接到 workspace 内的本地包，而不是去 npm 下载。 发布时自动替换：发布内部包时，包管理器会自动把 workspace:^ 替换为实际版本号，如 ^1.2.3。 避免版本漂移：明确标识内部依赖，防止误引用外部同名包。

---

### FB-11-CO-B-004：Monorepo 中的 internal package（内部包）是什么？如何被其他包引用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：internal package、内部包、workspace、代码复用
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Monorepo 中 internal package 的含义，并说明其他子包如何引用它，以及引用时需要注意什么。

**参考答案**：

Internal package 指只在 Monorepo 内部使用的包，不发布到外部 npm registry。例如共享的 utils、types、config、ui-kit 等。

引用方式：

1. 在子包的 `package.json` 中声明依赖：
   ```json
   {
     "dependencies": {
       "@scope/utils": "workspace:*"
     }
   }
   ```

2. 通过包名直接导入：
   ```ts
   import { formatDate } from '@scope/utils';
   ```

注意事项：

- internal package 也要有完整的 `package.json`，包含 `name`、`version`、`main` / `module` / `types` / `exports`。
- 如果需要在 CI / 发布时过滤，可设置 `"private": true` 防止误发布。
- 修改 internal package 后，依赖它的包需要重新构建或重新链接。

**评分维度**：
- 说清 internal package 定义（40%）
- 能写出引用方式（30%）
- 提到 package.json 完整性和 private 字段（30%）

**常见错误**：
- 用相对路径 `../../../packages/utils` 引用内部包，破坏包边界
- 内部包不写 `main`/`types`，导致 TypeScript 无法解析

**延伸追问**：
- 内部包是否需要发布到 npm？什么情况下需要？
- 如果内部包改名，如何批量替换引用？

**口头回答版**：
> Internal package 指只在 Monorepo 内部使用的包，不发布到外部 npm registry。 例如共享的 utils、types、config、ui-kit 等。 在子包的 package.json 中声明依赖： - internal package 也要有完整的 package.json，包含 name、version、main / module / types / exports。

---
### FB-11-EN-B-001：如何初始化一个最小的 pnpm workspace Monorepo？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：pnpm、workspace、初始化、工程化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请描述从零开始搭建一个最小可用的 pnpm workspace Monorepo 的目录结构和关键配置文件。

**参考答案**：

最小结构：

```text
my-monorepo/
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── packages/
│   └── utils/
│       ├── package.json
│       ├── src/
│       │   └── index.ts
│       └── tsconfig.json
└── apps/
    └── web/
        ├── package.json
        ├── src/
        │   └── main.ts
        └── tsconfig.json
```

关键配置：

```json
// package.json
{
  "name": "my-monorepo",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "build": "pnpm -r run build",
    "test": "pnpm -r run test"
  }
}
```

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```json
// packages/utils/package.json
{
  "name": "@my-monorepo/utils",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  }
}
```

创建后执行 `pnpm install`，pnpm 会自动链接 workspace 包。

**评分维度**：
- 目录结构合理（30%）
- 配置文件正确（40%）
- 说明 pnpm install 后的链接行为（30%）

**常见错误**：
- 根 `package.json` 忘记加 `"private": true`
- `pnpm-workspace.yaml` 路径写错，导致子包未被识别

**延伸追问**：
- `pnpm -r run build` 和 `pnpm --filter @my-monorepo/utils build` 有什么区别？
- 如何限制根目录不被意外发布？

**参考资源**：
- [pnpm workspace](https://pnpm.io/workspaces)

**口头回答版**：
> 创建后执行 pnpm install，pnpm 会自动链接 workspace 包。

---

### FB-11-CO-B-005：什么是依赖提升（hoisting）？它在 workspace 中有什么优缺点？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：hoisting、依赖提升、幽灵依赖、node_modules
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释依赖提升（hoisting）的概念，并说明它在 npm / yarn workspace 中的优缺点。

**参考答案**：

依赖提升是指包管理器将多个子包共同依赖的模块尽量安装到根目录的 `node_modules`，而不是每个子包各自安装一份，以节省磁盘空间和安装时间。

例如 `apps/web` 和 `apps/admin` 都依赖 `react`，hoisting 后只会在根目录有一份 `react`。

优点：

1. 减少重复安装，节省磁盘空间。
2. 缩短 install 时间。
3. 避免同一依赖多版本并存导致的包体积膨胀。

缺点：

1. **幽灵依赖（phantom dependencies）**：子包没有声明的依赖也能被解析到，导致迁移或发布时遗漏依赖。
2. **依赖冲突**：不同子包需要同一依赖的不同版本时，提升策略可能导致版本不一致。
3. **不确定性**：依赖树的物理结构变复杂，调试路径不一致。

pnpm 默认采用严格依赖隔离（content-addressable store + hard links），不提升依赖到根 `node_modules`，从根本上避免幽灵依赖。

**评分维度**：
- 说清 hoisting 概念（40%）
- 列出优缺点（40%）
- 提到 pnpm 的非提升策略（20%）

**常见错误**：
- 认为 hoisting 是 pnpm 的默认行为
- 只讲优点，不讲幽灵依赖风险

**延伸追问**：
- 如何检测 Monorepo 中的幽灵依赖？
- pnpm 为什么不容易出现幽灵依赖？

**口头回答版**：
> 依赖提升是指包管理器将多个子包共同依赖的模块尽量安装到根目录的 node_modules，而不是每个子包各自安装一份，以节省磁盘空间和安装时间。 例如 apps/web 和 apps/admin 都依赖 react，hoisting 后只会在根目录有一份 react。 减少重复安装，节省磁盘空间。 缩短 install 时间。

---

### FB-11-CO-B-006：lockfile 在 Monorepo 中有什么作用？常见有哪些 lockfile？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：lockfile、package-lock、yarn-lock、pnpm-lock、依赖一致性
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 lockfile 在 Monorepo 中的作用，并列举常见包管理器对应的 lockfile 名称。

**参考答案**：

lockfile 用于锁定依赖的确切版本和解析后的依赖树结构，保证团队成员、CI、生产环境安装出完全一致的依赖。

在 Monorepo 中，lockfile 尤为重要：

1. **统一依赖树**：所有子包共享一个 lockfile，避免各子包版本漂移。
2. **可复现构建**：CI 与本地使用同一份 lockfile，减少“我本地可以”的问题。
3. **安全审计**：通过 lockfile 可以精确定位到每个依赖的版本。

常见 lockfile：

| 包管理器 | lockfile 名称 |
|----------|---------------|
| npm | `package-lock.json` |
| yarn 1.x | `yarn.lock` |
| yarn Berry（2+）| `yarn.lock` |
| pnpm | `pnpm-lock.yaml` |

注意事项：

- 不要把多个包管理器的 lockfile 同时提交到仓库。
- 修改依赖后应重新生成并提交 lockfile。

**评分维度**：
- 说清 lockfile 作用（50%）
- 列举三种以上 lockfile（30%）
- 提到 Monorepo 中统一依赖树的价值（20%）

**常见错误**：
- 认为 lockfile 只是重复 `package.json` 的信息
- 在仓库中同时保留 `package-lock.json` 和 `pnpm-lock.yaml`

**延伸追问**：
- lockfile 中的 resolved URL 和 integrity 字段分别有什么用？
- 如果 CI 没有 lockfile，会发生什么？

**口头回答版**：
> lockfile 用于锁定依赖的确切版本和解析后的依赖树结构，保证团队成员、CI、生产环境安装出完全一致的依赖。 在 Monorepo 中，lockfile 尤为重要： 统一依赖树：所有子包共享一个 lockfile，避免各子包版本漂移。 可复现构建：CI 与本地使用同一份 lockfile，减少“我本地可以”的问题。

---

### FB-11-CO-B-007：Monorepo 中常见的代码共享方式有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：code sharing、内部包、shared config、工具函数、组件库
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举 Monorepo 中常见的代码共享方式，并说明各自的适用场景。

**参考答案**：

常见代码共享方式：

1. **内部包（internal packages）**
   - 将通用逻辑抽成 `packages/utils`、`packages/types`、`packages/ui`。
   - 适用于可被多个应用复用的业务无关代码。

2. **共享配置包**
   - `packages/eslint-config`、`packages/tsconfig`、`packages/tailwind-config`。
   - 统一代码风格与构建配置。

3. **共享脚本 / CLI 工具**
   - `packages/scripts`、`packages/cli`。
   - 统一发布、构建、脚手架流程。

4. **目录级共享（不独立成包）**
   - 通过 alias 或 tsconfig paths 直接引用某个目录。
   - 适合快速原型，但不推荐长期维护，破坏包边界。

5. **workspace 依赖 + 构建产物共享**
   - 内部包先构建出 `dist`，应用依赖其产物。
   - 适合 TypeScript / 组件库等需要编译的场景。

最佳实践：

- 优先将可复用代码独立成包，明确 `package.json` 边界。
- 使用 `workspace:` protocol 声明内部依赖。
- 对配置类包可设置 `"private": true`。

**评分维度**：
- 列举 3 种以上共享方式（40%）
- 说明适用场景（40%）
- 提到内部包和 workspace protocol（20%）

**常见错误**：
- 所有共享代码都通过相对路径引用，导致耦合严重
- 内部包没有 `main`/`types`，消费方无法正确导入

**延伸追问**：
- 共享配置包如何被多个子包继承？
- 内部包的改动如何触发依赖它的应用的 CI？

**口头回答版**：
> 内部包（internal packages） - 将通用逻辑抽成 packages/utils、packages/types、packages/ui。 - 适用于可被多个应用复用的业务无关代码。 - packages/eslint-config、packages/tsconfig、packages/tailwind-config。

---

### FB-11-CO-B-008：Monorepo 中 root package.json 的作用是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：root package、package.json、workspace、scripts
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 Monorepo 中根目录的 package.json 通常承担哪些职责，与各个子包的 package.json 有什么区别？

**参考答案**：

根 package.json 是 Monorepo 的入口配置，主要职责：

1. **声明 workspace**：通过 `workspaces` 字段或配合 `pnpm-workspace.yaml` 关联子包。
2. **统一管理脚本**：如 `build`、`test`、`lint`、`dev` 等，使用 `pnpm -r` / `turbo run` 调用子包脚本。
3. **管理共享 devDependencies**：如 TypeScript、ESLint、Prettier、`@types/node` 等，避免每个子包重复安装。
4. **设置 `private: true`**：防止误将整个仓库作为单个包发布。
5. **配置元信息**：如 `engines`、`packageManager`（`"pnpm": "8.x.x"`）。

与子包 package.json 的区别：
- 根 package.json 代表整个仓库，通常不发布。
- 子包 package.json 描述具体包的入口、依赖、版本、发布信息。

示例：
```json
{
  "name": "@my-org/monorepo",
  "private": true,
  "packageManager": "pnpm@8.15.0",
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test"
  },
  "devDependencies": {
    "@my-org/eslint-config": "workspace:*",
    "typescript": "^5.0.0"
  }
}
```

**评分维度**：
- 说清根 package.json 的 4 个以上职责（50%）
- 能区分根与子包 package.json（30%）
- 提到 `private: true` 和 `packageManager`（20%）

**常见错误**：
- 认为根 package.json 可有可无
- 忘记加 `private: true` 导致误发布
- 把所有依赖都放到根目录，导致子包无法独立安装

**延伸追问**：
- 根 package.json 中的 scripts 如何调用子包脚本？
- 什么依赖应该放在根目录，什么应该放在子包？

**参考资源**：
- [pnpm workspace root](https://pnpm.io/workspaces)

**口头回答版**：
根 package.json 是 Monorepo 的总控配置，主要用来声明 workspace、写一些全局脚本比如 build/test、放大家共享的 devDependencies，还有一定要设 `private: true` 防止把整个仓库发出去。子包的 package.json 则只关心自己这个包的入口、依赖和版本。

---

### FB-11-CO-B-009：什么是 package.json 中的 exports 字段？在 Monorepo 中有什么用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：exports、package.json、入口、内部包
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 package.json 中 `exports` 字段的作用，并说明在 Monorepo 内部包中为什么要使用它。

**参考答案**：

`exports` 字段是 Node.js 12+ 支持的包入口声明方式，用于精确控制哪些模块可以被外部导入，以及在不同导入方式（`require` / `import`）下映射到不同文件。

作用：

1. **精确暴露入口**：替代 `main` / `module` / `types`，统一声明。
2. **条件导出**：根据 `import` / `require` / `types` / `node` / `default` 等条件返回不同文件。
3. **隐藏内部实现**：未在 `exports` 中声明的路径无法被外部导入。

在 Monorepo 中的作用：
- 控制内部包的 public API，防止消费方依赖内部实现路径。
- 支持 ESM / CJS 双模式。
- 配合 TypeScript 的 `moduleResolution: "bundler"` 或 `"NodeNext"` 解析类型。

示例：
```json
{
  "name": "@scope/utils",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./date": {
      "types": "./dist/date.d.ts",
      "import": "./dist/date.mjs"
    }
  }
}
```

**评分维度**：
- 说清 exports 基本作用（40%）
- 能说明条件导出（30%）
- 提到隐藏内部实现和 Monorepo 意义（30%）

**常见错误**：
- 仍只使用 `main`/`module`，不理解 `exports` 的优势
- `exports` 写得过于宽泛，暴露内部文件
- 忘记配置 `types` 条件，导致 TS 无法解析

**延伸追问**：
- `exports` 和 `main` 字段有什么区别？
- 如果 `exports` 没有声明 `./internal`，外部还能引用到吗？

**参考资源**：
- [Node.js exports field](https://nodejs.org/api/packages.html#exports)

**口头回答版**：
`exports` 字段就是用来精确控制一个包对外暴露哪些入口的。比如我可以只暴露根入口和 `./date` 子入口，别的路径外部都引不到。在 Monorepo 里，内部包用它可以把 public API 限制死，避免别的包乱引内部实现，也方便同时支持 ESM 和 CJS。

---

### FB-11-CO-B-010：Monorepo 中常见的目录结构有哪些约定？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：目录结构、apps、packages、约定
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举 Monorepo 中常见的目录组织方式，并说明 `apps/` 和 `packages/` 通常放什么。

**参考答案**：

常见目录结构：
```text
my-monorepo/
├── apps/          # 业务应用，可直接部署
│   ├── web/
│   └── admin/
├── packages/      # 共享库 / 内部包
│   ├── ui/
│   ├── utils/
│   ├── eslint-config/
│   └── tsconfig/
├── tools/         # 脚本、脚手架、CLI
├── docs/          # 文档站点
└── ...
```

约定：

1. **`apps/`**：存放面向用户的应用，如 web、admin、mobile-h5、desktop。通常不发布，只部署。
2. **`packages/`**：存放共享代码包，如 ui-kit、utils、types、config。可被 `apps/` 和其他 `packages/` 依赖。
3. **`tools/`**：自定义脚本、生成器、CI 辅助工具。
4. **`docs/`**：VitePress / Docusaurus 文档。

设计原则：
- 按职责分层，避免平铺所有项目。
- `packages/` 内部可按类型再分组，如 `packages/ui`、`packages/shared`、`packages/config`。
- 不要跨层反向依赖：`packages/` 不能依赖 `apps/`。

**评分维度**：
- 说清 `apps/` 和 `packages/` 的区别（40%）
- 列举 3 种以上目录（30%）
- 提到依赖方向约束（30%）

**常见错误**：
- 所有项目平铺在根目录，难以管理
- `apps/` 和 `packages/` 混用，导致发布和部署边界模糊
- `packages/` 依赖 `apps/`，破坏分层

**延伸追问**：
- 如果包数量很多，`packages/` 下面是否需要再分类？
- 业务应用之间能否互相引用？

**参考资源**：
- [Turborepo examples](https://github.com/vercel/turborepo/tree/main/examples)

**口头回答版**：
最常见的结构是 `apps/` 放业务应用，比如 web、admin、H5；`packages/` 放共享库，比如 UI 组件、工具函数、类型、ESLint 配置。另外可能还有 `tools/` 放脚本、`docs/` 放文档。核心原则是分层，`packages/` 不能依赖 `apps/`。

---

### FB-11-CO-B-011：什么是 workspace 的 nohoist 配置？什么时候用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：nohoist、hoisting、workspace、依赖提升
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Monorepo 中 `nohoist` 的概念，并说明什么场景下需要禁用依赖提升。

**参考答案**：

`nohoist` 是 yarn / pnpm 中用于禁止某些依赖被提升到根 `node_modules` 的配置。它让指定依赖保留在子包自己的 `node_modules` 中。

使用场景：

1. **原生模块或二进制工具版本敏感**：如不同子包需要不同版本的 electron、sharp、prisma。
2. **React Native / Metro 打包器**：要求某些依赖必须位于项目本地 `node_modules`。
3. **不同版本的 peer dependency**：如两个应用分别依赖 React 17 和 React 18。
4. **某些工具读取本地 node_modules 路径**：如 Jest、Webpack 的 loader 解析。

yarn 配置方式：
```json
{
  "workspaces": {
    "packages": ["packages/*", "apps/*"],
    "nohoist": ["**/react-native", "**/react-native/**"]
  }
}
```

注意：
- pnpm 默认严格隔离，一般不需要 `nohoist`。
- npm 原生没有 `nohoist`，依赖自动提升。

**评分维度**：
- 说清 nohoist 作用（40%）
- 能举出 2 个以上适用场景（40%）
- 提到 pnpm 默认不提升（20%）

**常见错误**：
- 在 pnpm 中滥用 `nohoist`
- 认为 npm workspace 支持 `nohoist`
- 用 `nohoist` 解决所有版本冲突，而不重构包边界

**延伸追问**：
- pnpm 为什么默认不需要 `nohoist`？
- 如果两个应用需要不同 React 版本，除了 `nohoist` 还有什么方案？

**口头回答版**：
`nohoist` 就是不让某些依赖被提到根目录，而是留在子包自己的 `node_modules` 里。通常用于版本敏感的原生模块、React Native、或者两个子包需要不同 React 版本的场景。pnpm 默认不提升依赖，所以一般用不到这个配置。

---

### FB-11-CO-B-012：Monorepo 中如何运行单个包的脚本？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：pnpm、filter、workspace、脚本执行
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
在 Monorepo 中，除了从子包目录下执行 `npm run build`，还可以用哪些方式运行单个包的脚本？

**参考答案**：

常见方式：

1. **pnpm `--filter`**
   ```bash
   pnpm --filter @scope/web build
   pnpm --filter ./apps/web build
   ```

2. **pnpm `-r --filter`**
   ```bash
   pnpm -r --filter @scope/utils run test
   ```

3. **进入子包目录**
   ```bash
   cd apps/web
   pnpm build
   ```

4. **使用 Turborepo**
   ```bash
   turbo run build --filter=@scope/web
   turbo run build --filter=...@scope/web  # 构建该包及其依赖
   ```

5. **Nx**
   ```bash
   nx run @scope/web:build
   ```

注意事项：
- pnpm `--filter` 支持按包名、路径、依赖关系过滤。
- turbo `--filter` 还会处理任务依赖顺序。

**评分维度**：
- 说出 3 种以上运行方式（60%）
- 能区分 pnpm filter 和 turbo filter（40%）

**常见错误**：
- 每次都要 cd 到子包目录执行
- 混淆 `pnpm --filter` 和 `turbo --filter` 的语法
- 用 `-r` 全量运行，浪费时间

**延伸追问**：
- `pnpm --filter` 支持 glob 吗？
- `turbo run build --filter=@scope/web` 和 `pnpm --filter @scope/web build` 在构建顺序上有什么不同？

**参考资源**：
- [pnpm filtering](https://pnpm.io/filtering)

**口头回答版**：
可以用 `pnpm --filter` 加包名或路径，比如 `pnpm --filter @scope/web build`；也可以进子包目录直接跑；如果用了 Turborepo，就用 `turbo run build --filter=@scope/web`，它还会自动按依赖顺序跑。Nx 的话是 `nx run @scope/web:build`。

---

### FB-11-CO-B-013：什么是 peer dependencies？在 Monorepo 中如何管理？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：peer dependencies、peerDependencies、React、版本一致性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `peerDependencies` 的含义，并说明在 Monorepo 中管理 peer dependencies 的注意事项。

**参考答案**：

`peerDependencies` 表示“宿主依赖”或“外部依赖”，即包期望由消费方提供某个依赖，而不是自己安装。常见于插件、组件库，如 React 组件库把 `react` 和 `react-dom` 声明为 `peerDependencies`。

作用：
- 避免一个项目里出现多个 React / Vue 实例。
- 让组件库使用消费方指定的框架版本。

Monorepo 管理注意事项：

1. 在根目录统一安装 peer dependencies 的开发版本：
   ```json
   {
     "devDependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0"
     }
   }
   ```

2. 子包声明 `peerDependencies` 时要给出合理版本范围：
   ```json
   {
     "peerDependencies": {
       "react": ">=17.0.0",
       "react-dom": ">=17.0.0"
     }
   }
   ```

3. pnpm 会自动安装 `peerDependencies` 到 `.pnpm` 目录，并在子包中可见。
4. 使用 `pnpm.peerDependencyRules` 处理 legacy peer deps：
   ```ini
   # .npmrc
   strict-peer-dependencies=false
   ```

**评分维度**：
- 说清 peerDependencies 含义（40%）
- 能举例说明（20%）
- 列出 3 条以上管理注意事项（40%）

**常见错误**：
- 把 peerDependencies 当成普通 dependencies
- 组件库把 react 装成 dependencies，导致多实例
- 根目录不安装开发版本，导致子包类型检查失败

**延伸追问**：
- `peerDependencies` 和 `dependencies` 有什么区别？
- 如果两个子包需要不同版本的 React，怎么处理？

**参考资源**：
- [npm peerDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies)

**口头回答版**：
`peerDependencies` 就是“由使用方提供的依赖”。比如 React 组件库会把 `react` 和 `react-dom` 设成 peerDependencies，让业务应用决定用什么版本，避免重复安装多份 React。在 Monorepo 里，通常把这些 peer 依赖的开发版本放在根目录统一装，子包里只声明范围。

---

### FB-11-EN-B-002：如何在 Monorepo 中统一 TypeScript 配置？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：TypeScript、tsconfig、共享配置、extends
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何在 Monorepo 中设计共享的 TypeScript 配置，并说明子包如何继承和覆盖。

**参考答案**：

设计方式：

1. 创建共享 tsconfig 包
   ```text
   packages/tsconfig/
   ├── package.json
   ├── base.json
   ├── node.json
   └── react.json
   ```

2. 在 package.json 中命名并发布（或设为 internal）
   ```json
   {
     "name": "@scope/tsconfig",
     "version": "1.0.0",
     "files": ["base.json", "node.json", "react.json"]
   }
   ```

3. 子包继承
   ```json
   // packages/utils/tsconfig.json
   {
     "extends": "@scope/tsconfig/base.json",
     "compilerOptions": {
       "outDir": "./dist"
     },
     "include": ["src"]
   }
   ```

4. 分类管理
   - `base.json`：通用规则（`strict`、`esModuleInterop`、`moduleResolution`）。
   - `node.json`：Node 后端包（`target`、`lib`）。
   - `react.json`：前端 React 包（`jsx`、`types`）。
   - `app.json`：应用包（`noEmit`、`jsx`）。

注意事项：
- 不要把所有配置写死，留出覆盖空间。
- 共享配置包只需包含 JSON 文件，不需要构建。
- 子包路径别名（`baseUrl` / `paths`）可在各子包单独配置。

**评分维度**：
- 说清 extends 继承机制（40%）
- 能设计分类配置（30%）
- 提到覆盖和路径别名处理（30%）

**常见错误**：
- 所有子包直接复制一份 tsconfig，无法统一升级
- 共享配置过于严格，导致子包无法覆盖
- 共享 tsconfig 包被错误地要求 build 输出

**延伸追问**：
- 如果子包需要不同的 `moduleResolution` 设置，怎么办？
- 共享 tsconfig 包本身需要编译吗？

**参考资源**：
- [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html)

**口头回答版**：
可以建一个 `@scope/tsconfig` 的内部包，里面放 `base.json`、`react.json`、`node.json` 等。子包通过 `"extends": "@scope/tsconfig/base.json"` 继承，再按需覆盖 `outDir`、`include` 这些。要注意别把配置写死，给子包留覆盖空间。

---

### FB-11-EN-B-003：如何给 Monorepo 添加一个新的 internal package？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：internal package、脚手架、workspace、初始化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请描述在已有 Monorepo 中添加一个新内部包的完整步骤。

**参考答案**：

步骤：

1. 确定包位置和命名
   - 放在 `packages/` 下，如 `packages/http-client`。
   - 使用 `@scope/http-client` 作为包名。

2. 创建 package.json
   ```json
   {
     "name": "@scope/http-client",
     "version": "1.0.0",
     "private": true,
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "exports": {
       ".": {
         "types": "./dist/index.d.ts",
         "import": "./dist/index.mjs",
         "require": "./dist/index.cjs"
       }
     },
     "scripts": {
       "build": "tsup src/index.ts",
       "test": "vitest"
     }
   }
   ```

3. 创建源码和配置
   - `src/index.ts`
   - `tsconfig.json`（继承 `@scope/tsconfig`）
   - `README.md`

4. 注册到 workspace
   - 确保 `packages/*` 匹配，或在 `pnpm-workspace.yaml` 中添加路径。

5. 安装依赖
   ```bash
   pnpm install
   ```

6. 被其他包引用
   ```bash
   pnpm --filter @scope/web add @scope/http-client@workspace:*
   ```

7. 在 CI / pipeline 中注册
   - 确保 `turbo.json` 或 `nx.json` 能识别新包的 build/test 任务。

**评分维度**：
- 步骤完整（40%）
- package.json 字段正确（30%）
- 提到 workspace 注册和依赖引用（30%）

**常见错误**：
- 忘记加 `private: true` 导致误发布
- 不写 `exports` / `main` / `types`
- 没有在 `pnpm-workspace.yaml` 中匹配路径
- 用相对路径引用新包

**延伸追问**：
- 新包的 build 产物应该放在哪里？
- 如何为新包生成 CHANGELOG？

**参考资源**：
- [pnpm workspace protocol](https://pnpm.io/workspaces#workspace-protocol-workspace)

**口头回答版**：
先在 `packages/` 下建目录，写 package.json 包括 name、version、`private: true`、main/types/exports，然后写 src 和 tsconfig。接着 `pnpm install` 让它被 workspace 识别，别的包用 `pnpm --filter xxx add @scope/xxx@workspace:*` 引用。最后确保 CI 和 turbo pipeline 里包含了这个新包的任务。

## 进阶题（17 道）{#advanced}

### FB-11-EN-A-001：如何优化 Monorepo 的依赖安装速度？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：依赖安装、install、pnpm、hoisting、cache
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
在大型 Monorepo 中，`pnpm install` 或 `npm install` 可能非常慢。请列出优化依赖安装速度的常用手段。

**参考答案**：

优化手段：

1. **选用更快的包管理器**
   - pnpm 的 content-addressable store 和 hard link 机制通常比 npm/yarn 1.x 更快、更省空间。

2. **启用包管理器缓存**
   - CI 中缓存 `~/.pnpm-store`、`~/.npm`、`.yarn/cache` 或 `node_modules/.cache`。
   - 使用 lockfile hash 作为缓存 key，保证缓存有效性。

3. **减少不必要的依赖**
   - 删除未使用的依赖（可用 `depcheck` 扫描）。
   - 避免每个子包重复安装相同依赖，统一提升到根目录（在 npm/yarn 中）。

4. **使用 `--frozen-lockfile`**
   - CI 中 `pnpm install --frozen-lockfile` 跳过解析过程，直接按 lockfile 安装。

5. **按需安装**
   - `pnpm --filter <pkg> install` 只安装指定包及其依赖，而不是全量 `-r`。

6. **私有 registry / 镜像**
   - 使用公司内网 registry 或淘宝/verdaccio 镜像，减少外网下载。

7. **monorepo 专用优化**
   - pnpm 的 `shared-workspace-lockfile=true`（默认）。
   - 避免在子包中重复声明相同版本的 peer dependencies。

**评分维度**：
- 列举 4 种以上优化手段（40%）
- 能结合 CI 场景说明（30%）
- 提到缓存策略和 frozen lockfile（30%）

**常见错误**：
- 只换包管理器，不做 CI 缓存
- 在 CI 中不带 `--frozen-lockfile`，导致每次重新解析

**延伸追问**：
- CI 缓存 key 应该怎么设计？
- pnpm store 和 node_modules 应该缓存哪一个？

**口头回答版**：
> - pnpm 的 content-addressable store 和 hard link 机制通常比 npm/yarn 1.x 更快、更省空间。 - CI 中缓存 ~/.pnpm-store、~/.npm、.yarn/cache 或 node_modules/.cache。 - 使用 lockfile hash 作为缓存 key，保证缓存有效性。 - 删除未使用的依赖（可用 depcheck 扫描）。

---

### FB-11-EN-A-002：pnpm 的依赖管理机制与 npm / yarn 有何不同？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：pnpm、npm、yarn、依赖管理、hard link、store
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 pnpm、npm 和 yarn 在依赖安装机制上的核心差异，重点说明 pnpm 为什么能节省磁盘空间并避免幽灵依赖。

**参考答案**：

核心差异：

| 维度 | npm / yarn 1.x | pnpm |
|------|----------------|------|
| 存储方式 | 复制文件到 `node_modules` | 全局 content-addressable store + hard link |
| 依赖提升 | 默认提升依赖到根目录 | 默认不提升，严格按 `package.json` 安装 |
| 幽灵依赖 | 容易出现 | 基本不会出现 |
| 同一依赖多版本 | 多份拷贝 | 同一份内容，多版本通过不同目录结构隔离 |
| `node_modules` 结构 | 扁平或嵌套 | 严格的符号链接树 |

pnpm 原理：

1. 所有包的真实文件存储在全局 store 中，按内容寻址。
2. 每个项目中的 `node_modules` 通过 hard link 指向 store，不重复复制。
3. 子包只能访问自己 `package.json` 中声明的依赖，依赖的依赖通过 `node_modules/<pkg>/node_modules` 的符号链接严格隔离。

因此：
- 磁盘空间只与唯一包内容数量相关，而不是项目数量。
- 由于没有提升，子包无法访问未声明的依赖，避免幽灵依赖。

**评分维度**：
- 说清三种包管理器差异（40%）
- 解释 pnpm store + hard link 机制（30%）
- 说明如何避免幽灵依赖（30%）

**常见错误**：
- 认为 pnpm 只是 npm 的别名
- 认为 pnpm 也默认提升依赖

**延伸追问**：
- pnpm 的 `shamefully-hoist` 是什么？什么时候用？
- pnpm 的 `node_modules` 为什么有 `.pnpm` 目录？

**参考资源**：
- [pnpm motivation](https://pnpm.io/motivation)

**口头回答版**：
> | 维度 | npm / yarn 1.x | pnpm | |------|----------------|------| | 存储方式 | 复制文件到 node_modules | 全局 content-addressable store + hard link | | 依赖提升 | 默认提升依赖到根目录 | 默认不提升，严格按 package.json 安装 |

---

### FB-11-EN-A-003：什么是幽灵依赖（phantom dependencies）？如何解决？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：phantom dependencies、幽灵依赖、hoisting、pnpm、依赖检查
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释幽灵依赖的概念，并说明在 Monorepo 中如何检测和解决幽灵依赖问题。

**参考答案**：

幽灵依赖指代码中引用了某个依赖，但该依赖并没有在当前包的 `package.json` 中声明。它通常由依赖提升（hoisting）导致：依赖被安装到根目录 `node_modules`，子包虽然没有声明，但仍能解析到。

示例：

```json
// apps/web/package.json
{
  "dependencies": {
    "react": "^18.0.0"
  }
}
```

```ts
// apps/web/src/main.ts
import lodash from 'lodash'; // lodash 未在 web 的 package.json 中声明
```

如果 `lodash` 因为其他子包的依赖被提升到了根目录，`apps/web` 本地可以运行，但单独发布或安装时会报错。

解决方法：

1. **使用 pnpm**：默认严格依赖隔离，不会出现幽灵依赖。
2. **lint 检查**：使用 `eslint-plugin-import` 的 `no-extraneous-dependencies` 规则。
3. **依赖扫描**：使用 `depcheck` 或 `knip` 检测未声明依赖和未使用依赖。
4. **构建隔离**：CI 中单独打包每个子包，验证其依赖完整性。
5. **团队规范**：要求每个子包的 `package.json` 显式声明所有直接依赖。

**评分维度**：
- 说清幽灵依赖成因（40%）
- 能举例说明（20%）
- 列出 3 种以上解决方案（40%）

**常见错误**：
- 把幽灵依赖和循环依赖混淆
- 认为有了 lockfile 就不会出现幽灵依赖

**延伸追问**：
- `depcheck` 和 `knip` 有什么区别？
- 如果必须使用 npm/yarn，如何尽量降低幽灵依赖风险？

**口头回答版**：
> 幽灵依赖指代码中引用了某个依赖，但该依赖并没有在当前包的 package.json 中声明。 它通常由依赖提升（hoisting）导致：依赖被安装到根目录 node_modules，子包虽然没有声明，但仍能解析到。 如果 lodash 因为其他子包的依赖被提升到了根目录，apps/web 本地可以运行，但单独发布或安装时会报错。 使用 pnpm：默认严格依赖隔离，不会出现幽灵依赖。

---
### FB-11-EN-A-004：Monorepo 中如何管理内部包的版本号？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：versioning、版本管理、semantic versioning、内部包、changesets
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Monorepo 中内部包的版本号应该如何管理，并比较 fixed mode 和 independent mode 的适用场景。

**参考答案**：

内部包版本管理策略：

1. **Fixed mode（固定模式）**
   - 整个仓库共享一个版本号，所有包同时 bump。
   - 典型工具：Lerna fixed mode、Rush。
   - 适用：包之间高度耦合，如组件库全家桶 `@scope/ui` `@scope/icons` `@scope/theme`。

2. **Independent mode（独立模式）**
   - 每个包根据自己的变更独立升级版本。
   - 典型工具：Lerna independent mode、Changesets。
   - 适用：包之间相对独立，如工具库、共享配置包。

3. **不发布内部包（全部 private）**
   - 内部包只用于本地共享，不发布到 registry。
   - 版本号可保持 `0.0.0` 或按变更简单递增。
   - 适用：纯内部 Monorepo，如公司内业务线。

版本号约定：

- 遵循 Semantic Versioning（MAJOR.MINOR.PATCH）。
- 使用 `workspace:*` 或 `workspace:^` 避免内部依赖版本手动维护。
- 发布前通过 `changesets` 或 `lerna version` 自动生成版本变更。

**评分维度**：
- 说清 fixed / independent 模式（40%）
- 能给出适用场景（30%）
- 提到 SemVer 和 workspace protocol（30%）

**常见错误**：
- 所有内部包都独立发版，导致版本碎片化
- 手动维护内部依赖版本号，容易遗漏

**延伸追问**：
- 如果 `@scope/ui` 和 `@scope/utils` 都升级 major，fixed mode 和 independent mode 分别如何处理？
- 内部包不发布时，版本号还有意义吗？

**口头回答版**：
> 内部包版本管理策略： Fixed mode（固定模式） - 整个仓库共享一个版本号，所有包同时 bump。 - 典型工具：Lerna fixed mode、Rush。

---

### FB-11-EN-A-005：changesets 的工作流程是什么？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：changesets、版本发布、changeset、semver、发布流程
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述使用 changesets 管理 Monorepo 版本发布的完整工作流程。

**参考答案**：

Changesets 是一个用于 Monorepo 版本管理和发布的工具，常与 pnpm / yarn 配合使用。

完整流程：

1. **开发阶段：添加 changeset**
   - 开发者完成一个会影响版本的 PR 后，运行：
     ```bash
     pnpm changeset
     ```
   - 交互式选择受影响的包和 SemVer 变更类型（patch / minor / major）。
   - 生成 `.changeset/{random-name}.md` 文件，记录变更摘要和 bump 类型。

2. **合并阶段：版本聚合**
   - PR 合并后，仓库中积累多个 `.changeset/*.md` 文件。

3. **发版阶段：版本升级**
   - 运行：
     ```bash
     pnpm changeset version
     ```
   - Changesets 读取所有 changeset 文件，自动：
     - 更新各包的 `package.json` 版本号。
     - 更新 `CHANGELOG.md`。
     - 更新依赖这些包的内部依赖版本（根据 `workspace:` 协议）。
   - 生成版本升级 PR，人工或自动合并。

4. **发布阶段：发布到 registry**
   - 运行：
     ```bash
     pnpm changeset publish
     ```
   - 发布所有版本号发生变化的包到 npm registry。

5. **清理阶段**
   - 已消费的 changeset 文件会被删除。

**评分维度**：
- 说清 changeset 文件的作用（30%）
- 能描述 version 和 publish 两个阶段（40%）
- 提到 CHANGELOG 自动生成（30%）

**常见错误**：
- 认为 `changeset version` 会发布包（实际只改版本和 CHANGELOG）
- 忘记提交 `.changeset` 文件到仓库

**延伸追问**：
- 如果两个 PR 同时添加了 changeset，合并冲突如何解决？
- changesets 如何与 CI 集成实现自动发布？

**参考资源**：
- [changesets documentation](https://github.com/changesets/changesets)

**口头回答版**：
> Changesets 是一个用于 Monorepo 版本管理和发布的工具，常与 pnpm / yarn 配合使用。 开发阶段：添加 changeset - 开发者完成一个会影响版本的 PR 后，运行： - 交互式选择受影响的包和 SemVer 变更类型（patch / minor / major）。

---

### FB-11-EN-A-006：如何配置 Turborepo 的 pipeline？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：Turborepo、pipeline、任务编排、turbo.json
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Turborepo 中 `turbo.json` 的 `pipeline` 配置作用，并给出一个典型 Monorepo 的 pipeline 示例。

**参考答案**：

Turborepo 的 `pipeline` 用于定义 Monorepo 中各任务（task）的依赖关系和执行顺序。它让 Turborepo 知道哪些任务需要在其他任务之前执行，以及哪些输入会影响缓存。

示例：

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

关键字段：

- `dependsOn`：定义任务依赖。`^build` 表示当前包的所有 workspace 依赖必须先执行 build。
- `outputs`：定义任务产物，用于缓存命中后的恢复。
- `inputs`：可选，定义哪些文件变化会触发任务重新执行，默认是该包的所有文件。
- `cache`：是否启用缓存，开发任务通常设为 `false`。
- `persistent`：标记长驻任务（如 dev server），避免阻塞其他任务。

执行命令：

```bash
turbo run build
turbo run test --filter=...@scope/web
```

**评分维度**：
- 说清 pipeline 作用（30%）
- 能写出典型配置（40%）
- 解释 `dependsOn`、`outputs`、`cache` 等关键字段（30%）

**常见错误**：
- `dependsOn` 写成 `"build"` 而不是 `"^build"`，导致依赖包未先构建
- 忘记配置 `outputs`，导致缓存无法恢复产物

**延伸追问**：
- `^build` 和 `build` 在 `dependsOn` 中有什么区别？
- 如何配置才能让 test 任务在依赖包的 build 完成后才执行？

**参考资源**：
- [Turborepo pipeline](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)

**口头回答版**：
> Turborepo 的 pipeline 用于定义 Monorepo 中各任务（task）的依赖关系和执行顺序。 它让 Turborepo 知道哪些任务需要在其他任务之前执行，以及哪些输入会影响缓存。 - dependsOn：定义任务依赖。 ^build 表示当前包的所有 workspace 依赖必须先执行 build。

---

### FB-11-SC-A-001：设计一个 Monorepo 下组件库的发布流程。

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：组件库、发布流程、changesets、Turborepo、CI/CD
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
假设你负责一个 Monorepo 下的组件库，包含 `@scope/ui`、`@scope/icons`、`@scope/theme` 三个包。请设计一套从开发到发布的完整流程。

**参考答案**：

完整流程：

1. **仓库结构**
   ```text
   packages/
   ├── ui/
   ├── icons/
   └── theme/
   ```
   三个包通过 `workspace:^` 互相依赖（如 `ui` 依赖 `icons` 和 `theme`）。

2. **开发阶段**
   - 使用 pnpm workspace + TypeScript + Storybook 开发。
   - 每个 PR 如果涉及版本变更，必须运行 `pnpm changeset` 添加 changeset。
   - CI 检查：lint、type-check、unit test、visual regression test。

3. **构建阶段**
   - `turbo.json` 配置 `build` 任务，`dependsOn: ["^build"]` 保证依赖包先构建。
   - 每个包输出 `dist/`、`esm/` 和类型声明。

4. **版本管理**
   - 使用 fixed mode 或 independent mode，取决于产品策略。
   - 通过 `changeset version` 自动生成版本号和 CHANGELOG。

5. **发布阶段**
   - CI 在 main 分支触发 `changeset publish`。
   - 只发布版本号发生变化的包。
   - 发布成功后自动打 git tag 并创建 GitHub Release。

6. **回滚策略**
   - 保留旧版本 tag，必要时可手动重新发布旧版本或打补丁。

**评分维度**：
- 流程完整性（40%）：覆盖开发、构建、版本、发布
- 工具选型合理（30%）：pnpm/changesets/turbo/CI 的搭配
- 风险与回滚考虑（30%）：测试、缓存、回滚策略

**常见错误**：
- 未在 CI 中验证依赖包构建顺序
- 未要求 PR 必须附带 changeset

**延伸追问**：
- 如果 `@scope/ui` 依赖 `@scope/icons` 的新功能，如何确保发布顺序正确？
- 发布失败 halfway 怎么办？

**口头回答版**：
> 三个包通过 workspace:^ 互相依赖（如 ui 依赖 icons 和 theme）。 - 使用 pnpm workspace + TypeScript + Storybook 开发。 - 每个 PR 如果涉及版本变更，必须运行 pnpm changeset 添加 changeset。 - CI 检查：lint、type-check、unit test、visual regression test。

---

### FB-11-EN-A-007：Monorepo 中 CI 可以做哪些优化？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo、12 CI/CD
**标签**：CI、CI optimization、Turborepo、affected、缓存、并行
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在 Monorepo 中优化 CI 流水线的主要方法，重点说明如何减少不必要的构建和测试。

**参考答案**：

优化方法：

1. **只构建变更影响的内容**
   - 使用 Turborepo 的 `--filter` 配合 Git range 只构建变更影响的内容：
     ```bash
     turbo run build test --filter=[origin/main...HEAD]
     ```
   - 或使用 Nx 的 `nx affected` 命令。
   - 只执行受代码变更影响的包及其下游依赖的任务。

2. **远程缓存（Remote Caching）**
   - Turborepo / Nx 支持将任务缓存上传到远程服务器（如 Vercel Remote Cache、Nx Cloud）。
   - 不同开发者 / CI job 可以复用已缓存结果，跳过重复构建。

3. **依赖安装缓存**
   - 缓存 pnpm store / node_modules，key 使用 lockfile hash。

4. **并行化**
   - 利用 Turborepo / Nx 的任务并行调度能力，充分使用 CI 多核资源。
   - 避免手动按顺序写死脚本。

5. **分阶段流水线**
   - PR 阶段只跑 lint、type-check、unit test。
   - 合并到 main 后再跑完整构建、e2e、发布。

6. **避免重复安装**
   - 使用 `pnpm install --frozen-lockfile`。
   - 对不需要改动的包跳过构建。

**评分维度**：
- 说出 affected / remote cache / install cache 三种核心优化（50%）
- 能结合具体工具说明（30%）
- 提到分阶段流水线（20%）

**常见错误**：
- 每次 CI 都全量构建所有包
- 缓存 key 设计不当导致缓存失效

**延伸追问**：
- Remote Cache 的安全性如何保障？
- 如果两个 PR 修改了同一个包，缓存会不会互相污染？

**口头回答版**：
> 只构建变更影响的内容 - 使用 Turborepo 的 --filter 配合 Git range 只构建变更影响的内容： - 或使用 Nx 的 nx affected 命令。 - 只执行受代码变更影响的包及其下游依赖的任务。

---

### FB-11-CO-A-001：什么是拓扑排序？在 Monorepo 构建中有什么用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：topological sort、DAG、构建顺序、依赖图
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释拓扑排序的概念，并说明 Monorepo 工具如何利用它决定构建顺序。

**参考答案**：

拓扑排序（Topological Sort）是对有向无环图（DAG）的节点进行线性排序，使得对于任意边 u → v，u 在 v 之前。如果存在环，则无法进行拓扑排序。

在 Monorepo 中：
- 每个包是图中的一个节点。
- 如果包 A 依赖包 B，则存在边 B → A，表示 B 需要先构建。
- 工具通过拓扑排序确定构建顺序，确保依赖包先产出产物。

示例：
```text
utils → ui → web
     ↘ admin
```
构建顺序：`utils` → `ui` → `web` / `admin`。

Turborepo 中通过 `dependsOn: ["^build"]` 表达这种关系。
Nx 通过 project graph 自动计算 affected 和拓扑顺序。

作用：
1. 避免消费未构建的包。
2. 最大化并行：没有依赖关系的包可以并发构建。
3. 支持增量和缓存：只有变更影响的包才重新构建。

**评分维度**：
- 说清拓扑排序定义（40%）
- 能举例说明 Monorepo 中的应用（30%）
- 提到 DAG、并行、Turborepo/Nx（30%）

**常见错误**：
- 把拓扑排序和简单按名字排序混淆
- 不理解环会导致无法拓扑排序
- 认为所有包必须串行构建

**延伸追问**：
- 如果两个包互相依赖，拓扑排序会怎么办？
- 如何可视化 Monorepo 中的依赖图？

**参考资源**：
- [Topological sorting](https://en.wikipedia.org/wiki/Topological_sorting)

**口头回答版**：
拓扑排序就是把 DAG 里的节点排个顺序，保证有依赖关系的先执行。在 Monorepo 里，每个包是一个节点，依赖关系是边，工具会算出先构建底层 utils，再构建 ui，最后构建 web 和 admin。这样能保证用到依赖时产物已经 ready，无关的包还能并行构建。

---

### FB-11-EN-A-008：如何配置 pnpm 的 catalog 功能统一管理依赖版本？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：pnpm、catalog、依赖版本、统一版本
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 pnpm catalog 功能的作用，并给出在 Monorepo 中统一管理依赖版本的配置示例。

**参考答案**：

pnpm catalog 是 pnpm 9.5+ 引入的功能，允许在根 `pnpm-workspace.yaml` 中集中声明常用依赖的版本，子包通过 `catalog:` 引用，实现版本统一和批量升级。

配置方式：

1. 根目录声明 catalog
   ```yaml
   # pnpm-workspace.yaml
   packages:
     - 'packages/*'
     - 'apps/*'

   catalog:
     react: ^18.2.0
     react-dom: ^18.2.0
     typescript: ^5.3.0

   catalogs:
     default:
       react: ^18.2.0
   ```

2. 子包引用
   ```json
   {
     "dependencies": {
       "react": "catalog:"
     }
   }
   ```

3. 发布行为
   - 发布时 `catalog:` 会被替换为实际版本号。

4. 多 catalog 组
   ```yaml
   catalogs:
     react17:
       react: ^17.0.0
     react18:
       react: ^18.0.0
   ```
   子包可指定 `react: "catalog:react17"`。

优点：
- 统一版本，避免子包版本漂移。
- 升级时只需改根目录一处。
- 保留子包 package.json 的显式依赖声明。

**评分维度**：
- 说清 catalog 作用（40%）
- 能写出配置示例（30%）
- 提到发布替换和多 catalog 组（30%）

**常见错误**：
- 把所有依赖都放进 catalog，导致过度集中
- 使用过低版本 pnpm 不支持 catalog
- 子包仍手动写版本号，catalog 形同虚设

**延伸追问**：
- catalog 和 root devDependencies 有什么区别？
- 如果不同应用需要不同 React 版本，catalog 怎么处理？

**参考资源**：
- [pnpm catalog](https://pnpm.io/catalogs)

**口头回答版**：
pnpm catalog 是 pnpm 9.5+ 的功能，可以在根目录集中声明常用依赖版本，子包在 package.json 里写 `"react": "catalog:"` 就行。这样升级时只改根目录一处，发布时也会自动替换成真实版本号。还可以分 catalog 组，比如 react17、react18，给不同子包用。

---

### FB-11-EN-A-009：如何处理 Monorepo 中不同子包的 Node.js 版本要求？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：Node.js、engines、nvm、corepack、版本管理
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
Monorepo 中不同子包可能对 Node.js 版本有不同要求。请说明如何统一和约束 Node.js 版本。

**参考答案**：

处理方式：

1. 根目录统一 engines 字段
   ```json
   {
     "engines": {
       "node": ">=18.0.0",
       "pnpm": ">=9.0.0"
     }
   }
   ```

2. 使用 `.nvmrc` / `.node-version`
   ```text
   20.11.0
   ```

3. 使用 `packageManager` 字段
   ```json
   {
     "packageManager": "pnpm@9.12.0"
   }
   ```
   配合 corepack 自动使用指定包管理器版本。

4. CI 中校验 Node 版本
   ```yaml
   - uses: actions/setup-node@v4
     with:
       node-version-file: '.nvmrc'
   ```

5. 若子包确实有不同要求：
   - 在子包 package.json 中声明 `engines`。
   - 使用 Docker / devcontainer 隔离。
   - 通过 pnpm `onlyBuiltDependencies` 控制原生模块。

6. 工具：fnm、nvm、volta、asdf 管理本地多版本。

注意事项：
- 尽量统一版本，降低维护成本。
- 版本差异过大时考虑拆分仓库或独立部署。

**评分维度**：
- 列出 4 种以上管理方式（50%）
- 能说明 `engines` / `packageManager` 作用（30%）
- 提到子包差异处理（20%）

**常见错误**：
- 不在仓库中声明 Node 版本，导致各开发者环境不一致
- 子包声明冲突的 `engines` 范围
- CI 使用与本地不同的 Node 版本

**延伸追问**：
- `packageManager` 字段和 `engines.pnpm` 有什么区别？
- 如果某个包必须用 Node 16，其他用 Node 20，怎么办？

**参考资源**：
- [corepack](https://nodejs.org/api/corepack.html)

**口头回答版**：
首先在根 package.json 用 `engines` 指定 node 和 pnpm 版本，再用 `packageManager` 配合 corepack 锁定包管理器版本。仓库里放 `.nvmrc`，CI 读取它。如果子包真有特殊需求，可以在子包 `engines` 里声明，或者用 Docker 隔离。尽量统一，不然维护成本高。

---

### FB-11-EN-A-010：如何检测和清理 Monorepo 中的未使用依赖？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：depcheck、knip、未使用依赖、依赖清理
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在 Monorepo 中如何检测各子包的未使用依赖和缺失依赖，并说明注意事项。

**参考答案**：

常用工具：

1. **depcheck**
   ```bash
   pnpm -r exec depcheck
   ```
   - 扫描每个包的 imports 和 package.json 依赖。
   - 输出 missing dependencies 和 unused dependencies。

2. **knip**
   ```bash
   npx knip
   ```
   - 支持 Monorepo，能检测未使用的文件、依赖、exports。
   - 配置更灵活，支持 workspace 感知的 ignore 规则。

3. **eslint-plugin-import**
   - 规则 `no-extraneous-dependencies`：禁止引用未声明的依赖。
   - 规则 `no-unused-modules`：检测未使用的模块导出。

4. **手动脚本**
   - 用 `pnpm why` 分析某个依赖被谁使用。
   - 用 `pnpm list -r` 查看依赖树。

注意事项：
- 某些依赖在运行时动态引入，depcheck 可能误判。
- 共享类型包、polyfill、CSS 文件容易被误判为未使用。
- 清理前要在 CI 中跑完全量测试。
- 先清理未使用依赖，再处理缺失依赖，避免引入新缺失。

CI 集成：
```json
{
  "scripts": {
    "depcheck": "pnpm -r exec depcheck"
  }
}
```

**评分维度**：
- 列举 3 种以上工具（40%）
- 能说明误判场景（30%）
- 提到 CI 集成和清理顺序（30%）

**常见错误**：
- 直接删除 depcheck 报的所有未使用依赖，导致运行时错误
- 只在根目录运行工具，忽略子包
- 不配置 ignore 规则，误删测试依赖

**延伸追问**：
- depcheck 和 knip 的检测结果差异大吗？
- 如何处理动态 import 导致的误判？

**参考资源**：
- [knip documentation](https://knip.dev/)

**口头回答版**：
常用 depcheck 或 knip 扫描每个子包的依赖。depcheck 会报 missing 和 unused，knip 更强，能识别未使用文件和 exports。还可以配 `eslint-plugin-import` 的 `no-extraneous-dependencies`。注意有些依赖是动态引入或 polyfill，容易被误判，清理前要跑测试。

---

### FB-11-EN-A-011：pnpm 的 --filter 有哪些常见用法？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：pnpm、filter、workspace、选择器
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 pnpm `--filter` 的常用语法，并举例说明如何选择特定包及其依赖关系。

**参考答案**：

常见用法：

1. **按包名选择**
   ```bash
   pnpm --filter @scope/web build
   ```

2. **按路径选择**
   ```bash
   pnpm --filter ./apps/web build
   ```

3. **选择多个包**
   ```bash
   pnpm --filter @scope/web --filter @scope/admin build
   ```

4. **选择依赖当前包的包（dependents）**
   ```bash
   pnpm --filter @scope/utils... build
   ```
   表示构建 `utils` 及其所有依赖它的包。

5. **选择当前包依赖的包（dependencies）**
   ```bash
   pnpm --filter ...@scope/web build
   ```
   表示构建 `web` 及其所有依赖。

6. **组合选择**
   ```bash
   pnpm --filter @scope/utils... --filter !@scope/admin test
   ```

7. **使用 glob**
   ```bash
   pnpm --filter './apps/*' build
   ```

8. **与 Git 范围结合（pnpm 8+）**
   ```bash
   pnpm --filter='[origin/main...HEAD]' build
   ```

注意：
- `...` 在包名前表示依赖方向：`@scope/utils...` 是下游，`...@scope/web` 是上游。
- 选择器可以组合和排除（`!`）。

**评分维度**：
- 列举 5 种以上用法（50%）
- 能区分 `...` 在前后位置的含义（30%）
- 能组合 filter 和排除（20%）

**常见错误**：
- 混淆 `@scope/utils...` 和 `...@scope/web`
- 忘记加引号导致 shell 解析 glob 失败
- 用 `--filter` 全量构建，没有利用依赖关系

**延伸追问**：
- `--filter` 和 `turbo --filter` 有什么区别？
- 如何选择某个目录下所有被修改的包？

**参考资源**：
- [pnpm filtering](https://pnpm.io/filtering)

**口头回答版**：
`pnpm --filter` 可以按包名、路径、glob 选包。关键语法是 `...` 的位置：`@scope/utils...` 表示 utils 和所有依赖它的下游包，`...@scope/web` 表示 web 和所有它依赖的上游包。还可以用 `!` 排除、组合多个选择器。

---

### FB-11-EN-A-012：如何在 Monorepo 中统一管理环境变量？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：env、环境变量、dotenv、Turborepo、共享配置
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在 Monorepo 中如何设计环境变量的管理方案，避免各子包重复定义和泄露敏感信息。

**参考答案**：

管理方案：

1. 根目录管理通用变量
   - 在根目录放置 `.env`、`.env.local`、`.env.development`、`.env.production`。
   - 使用 `dotenv-cli` 或 `turbo.json` `globalEnv` 注入。

2. `turbo.json` 声明 env
   ```json
   {
     "globalEnv": ["NODE_ENV", "API_BASE_URL"],
     "pipeline": {
       "build": {
         "env": ["API_KEY"]
       }
     }
   }
   ```
   这样 Turborepo 能识别哪些环境变量变化会导致缓存失效。

3. 子包按需继承和覆盖
   - 子包保留 `.env.example`，说明需要哪些变量。
   - 实际敏感值通过 CI / 本地 `.env.local` 注入。

4. 敏感信息管理
   - 不要把 `.env.local`、`.env.production` 提交到仓库。
   - 使用 GitHub Secrets / Vault / 1Password 在 CI 中注入。
   - 区分 build-time 和 runtime 环境变量。

5. 类型安全
   - 使用 `@t3-oss/env-nextjs` 或 zod 校验环境变量类型。
   - 在共享 types 包中定义 Env 类型。

示例目录：
```text
.env
.env.example
.env.local          # gitignored
apps/web/.env.example
packages/config/env.ts
```

**评分维度**：
- 说清分层管理（40%）
- 能写出 turbo.json env 配置（30%）
- 提到敏感信息和类型安全（30%）

**常见错误**：
- 每个子包都复制一份完整 .env
- 把生产密钥提交到仓库
- 不声明 env 导致 Turborepo 缓存不失效

**延伸追问**：
- build-time 和 runtime env 有什么区别？
- 如何防止环境变量不同导致缓存污染？

**参考资源**：
- [Turborepo environment variables](https://turbo.build/repo/docs/core-concepts/caching/environment-variable-inputs)

**口头回答版**：
环境变量可以分层管理：根目录放通用变量，子包放各自的 `.env.example`，真实值走 CI secrets 或本地 `.env.local`。Turborepo 里要在 `turbo.json` 的 `globalEnv` 或任务 `env` 里声明变量，这样变量变了缓存才会失效。敏感信息千万别提交到仓库。

---

### FB-11-EN-A-013：如何配置 Turborepo 的 remote cache？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：Turborepo、remote cache、缓存、Vercel、CI
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Turborepo remote cache 的作用，并说明如何在本地和 CI 中配置。

**参考答案**：

Remote cache 作用：
- 将任务缓存上传到远程存储，团队成员和 CI 共享。
- 避免重复构建，加速 CI 和本地开发。

配置方式：

1. Vercel Remote Cache（最简单）
   ```bash
   npx turbo login
   npx turbo link
   ```
   生成 `.turbo/config.json`：
   ```json
   {
     "teamid": "team_xxx",
     "apiurl": "https://api.vercel.com"
   }
   ```

2. 在 turbo.json 中启用
   ```json
   {
     "remoteCache": {
       "enabled": true
     }
   }
   ```

3. CI 中配置 token
   ```yaml
   - run: npx turbo run build --token=$&#123;&#123; secrets.VERCEL_TOKEN &#125;&#125;
   ```

4. 自建 remote cache
   - Turborepo 支持 S3-compatible API。
   - 配置 `TURBO_API`、`TURBO_TOKEN`、`TURBO_TEAM` 环境变量。

5. 安全
   - 使用只读 token 给开发者。
   - CI 使用写 token。
   - 定期清理或签名缓存，防止污染。

注意事项：
- 第一次配置时确保 outputs 正确，否则缓存恢复会缺文件。
- 远程缓存 key 包含输入文件 hash、env、依赖输出 hash。

**评分维度**：
- 说清 remote cache 价值（30%）
- 能配置 Vercel remote cache（30%）
- 提到安全和 CI 配置（40%）

**常见错误**：
- 不配置 outputs 就用 remote cache
- 把写 token 暴露给所有开发者
- 不同分支缓存互相污染

**延伸追问**：
- remote cache 被污染了怎么办？
- 本地如何禁用 remote cache 调试问题？

**参考资源**：
- [Turborepo remote caching](https://turbo.build/repo/docs/core-concepts/remote-caching)

**口头回答版**：
Remote cache 就是把构建缓存存到远程，让大家和 CI 都能复用。最简单是接 Vercel，跑 `turbo login` 和 `turbo link` 就行。CI 里配 `VERCEL_TOKEN`。也可以自建 S3-compatible 的缓存服务。要注意给不同角色分读写 token，避免缓存被污染。

---

### FB-11-SC-A-002：设计一个 Monorepo 下共享 hooks 包的管理方案。

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：hooks、shared package、react、内部包、发布
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
假设你们在 Monorepo 中有多个 React 应用，希望抽取共享 hooks。请设计这个 hooks 包的管理方案。

**参考答案**：

方案设计：

1. 包结构
   ```text
   packages/hooks/
   ├── package.json
   ├── tsconfig.json
   ├── src/
   │   ├── index.ts
   │   ├── useUser/
   │   ├── useDebounce/
   │   └── useLocalStorage/
   └── README.md
   ```

2. package.json
   ```json
   {
     "name": "@scope/hooks",
     "version": "1.0.0",
     "peerDependencies": {
       "react": ">=17.0.0"
     },
     "devDependencies": {
       "react": "^18.2.0",
       "@scope/tsconfig": "workspace:*"
     }
   }
   ```

3. 构建方案
   - 使用 tsup / rollup 打包成 ESM + CJS + d.ts。
   - `exports` 字段暴露子路径：
     ```json
     "exports": {
       ".": "...",
       "./useDebounce": "./dist/useDebounce.mjs"
     }
     ```

4. 测试
   - 使用 Vitest + React Testing Library。
   - 每个 hook 单独测试。

5. 文档
   - README 说明使用方式。
   - 可选 Storybook / Docusaurus 示例。

6. 发布策略
   - 若只内部使用：`private: true`，版本保持 `0.0.0` 或简单递增。
   - 若对外发布：用 changesets 管理版本。

7. 依赖约束
   - hooks 包不依赖 `apps/` 和具体业务逻辑。
   - 只依赖 React 等基础库。

**评分维度**：
- 结构合理（30%）
- 构建和导出方案完整（30%）
- 测试和文档考虑（20%）
- 依赖边界清晰（20%）

**常见错误**：
- hooks 包依赖业务类型或 apps/
- 不打包直接暴露源码，导致应用编译配置耦合
- 没有测试或文档

**延伸追问**：
- 如果 hooks 包越来越多，是否需要拆成多个包？
- 如何防止某个 hook 被多个业务方以不同方式使用而难以升级？

**口头回答版**：
可以建一个 `packages/hooks` 内部包，里面按 hook 功能分目录，用 tsup 打包出 ESM/CJS 和类型，`exports` 暴露根入口和子路径。测试用 Vitest + React Testing Library。如果只在内部用就设 private，对外发版就用 changesets。注意 hooks 包只依赖 React，不依赖业务代码。

---

### FB-11-SC-A-003：设计一个 Monorepo 中共享 types 包的演进方案。

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：types、TypeScript、共享包、内部包、版本管理
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
Monorepo 中很多子包需要共享类型定义。请设计一个共享 types 包的演进方案，兼顾类型安全和发布边界。

**参考答案**：

方案设计：

1. 包结构
   ```text
   packages/types/
   ├── package.json
   ├── tsconfig.json
   └── src/
       ├── index.ts
       ├── api.ts
       ├── user.ts
       └── app.ts
   ```

2. 类型分层
   - `core`：基础类型，如 `APIResponse`、`Pagination`。
   - `domain`：业务领域类型，如 `User`、`Order`。
   - `app`：应用配置类型。

3. package.json
   ```json
   {
     "name": "@scope/types",
     "version": "1.0.0",
     "types": "dist/index.d.ts",
     "exports": {
       ".": "./dist/index.d.ts",
       "./api": "./dist/api.d.ts"
     },
     "scripts": {
       "build": "tsc"
     }
   }
   ```

4. 演进策略
   - 新增类型：向后兼容，minor 升级。
   - 修改已有类型：需要评估影响范围，必要时 major 升级。
   - 删除类型：major 升级，并给出迁移文档。

5. 边界控制
   - types 包不依赖 `apps/`。
   - 基础 types 不依赖业务 types。
   - 使用 TypeScript project references 加速类型检查。

6. 消费方式
   ```ts
   import type { User } from '@scope/types';
   import type { ApiResponse } from '@scope/types/api';
   ```

7. 版本策略
   - 若被大量包依赖，建议使用 fixed mode 或 conservative independent。

**评分维度**：
- 结构分层清晰（30%）
- 类型演进策略合理（30%）
- 依赖边界和版本控制（20%）
- 消费方式正确（20%）

**常见错误**：
- types 包依赖 apps/ 的具体实现
- 随意删除或修改类型，导致大面积类型报错
- 不打包类型，直接引用源码

**延伸追问**：
- 如果 types 包改动很频繁，如何减少对其他包的影响？
- 类型包是否需要 runtime 产物？

**口头回答版**：
可以建 `packages/types`，里面按 core/domain/app 分层。类型变更要尽量向后兼容，新增类型走 minor，修改或删除走 major。注意 types 包不能依赖 apps/，消费方用 `import type` 引入。如果被很多包依赖，建议用 fixed mode 或保守发版。

## 深入题（17 道）{#proficient}

### FB-11-EN-P-001：Turborepo 和 Nx 的核心差异是什么？如何选择？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：Turborepo、Nx、任务编排、构建缓存、monorepo 工具
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请比较 Turborepo 和 Nx 两款 Monorepo 工具的核心差异，并说明在不同场景下如何选择。

**参考答案**：

核心差异：

| 维度 | Turborepo | Nx |
|------|-----------|-----|
| 定位 | 任务运行器 + 构建缓存 | 全功能 Monorepo 编排平台 |
| 配置方式 | `turbo.json` 定义 pipeline | `project.json` / `nx.json` + plugins |
| 语言生态 | 前端 / Node.js 为主 | 前端、Node、Python、Java、Go 等多语言 |
| 依赖图 | 基于 package.json 依赖自动推导 | 基于 AST 分析 import，可检测非 package.json 依赖 |
| 插件生态 | 较少，偏向通用任务 | 丰富，提供 React、Next.js、NestJS 等官方生成器 |
| 远程缓存 | Vercel Remote Cache | Nx Cloud |
| 迁移成本 | 低，可在现有 workspace 上叠加 | 较高，通常需要按 Nx 结构组织 |
| 适用规模 | 小到中型 Monorepo | 中到大型、跨技术栈 Monorepo |

选择建议：

- **选 Turborepo**：
  - 已有 pnpm/yarn workspace，只想加速构建和任务编排。
  - 团队规模不大，前端/Node 技术栈单一。
  - 希望快速接入，不引入过多概念。

- **选 Nx**：
  - 大型仓库，包数量多，跨语言/框架。
  - 需要代码生成器、模块边界规则、依赖图可视化。
  - 需要更精细的 affected 分析和任务并行调度。

**评分维度**：
- 比较维度完整（40%）：定位、配置、生态、依赖图
- 能给出选择建议（30%）
- 结合实际项目经验说明（30%）

**常见错误**：
- 认为 Turborepo 可以完全替代 Nx
- 忽略 Nx 的 AST 级依赖分析能力

**延伸追问**：
- 你们团队用 Turborepo 还是 Nx？为什么？
- 如果仓库有 200+ 个包，Turborepo 会遇到什么瓶颈？

**参考资源**：
- [Turborepo vs Nx](https://turbo.build/repo/docs/ja/guides/monorepos)
- [Nx vs Turborepo](https://nx.dev/concepts/more-concepts/turborepo-and-nx)

**口头回答版**：
> | 维度 | Turborepo | Nx | |------|-----------|-----| | 定位 | 任务运行器 + 构建缓存 | 全功能 Monorepo 编排平台 | | 配置方式 | turbo.json 定义 pipeline | project.json / nx.json + plugins |

---

### FB-11-EN-P-002：Nx 的 affected 命令原理是什么？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：Nx、affected、依赖图、DAG、变更检测
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Nx 中 `nx affected` 的工作原理，说明它是如何确定哪些项目需要重新构建或测试的。

**参考答案**：

`nx affected` 通过对比当前代码与基线（base）分支的差异，结合项目依赖图（Project Graph），只选择受影响的项目及其下游依赖执行任务。

工作流程：

1. **构建项目依赖图**
   - Nx 扫描 workspace 中所有项目的 `package.json`、`project.json`、源代码 import 关系，构建 DAG（有向无环图）。

2. **检测变更文件**
   - 通过 Git 对比 base 分支（如 `origin/main`）与当前分支（HEAD）：
     ```bash
     nx affected -t build --base=origin/main --head=HEAD
     ```

3. **标记受影响项目**
   - 变更文件所属的项目首先被标记为 affected。
   - 然后递归标记这些项目的下游依赖者（dependents）。

4. **过滤任务**
   - 只对 affected 项目执行指定任务（如 build、test）。
   - 通过 `--parallel` 和 `nx.json` 配置并行度和依赖顺序。

注意事项：

- 如果修改了全局配置（如 `nx.json`、`tsconfig.base.json`），通常所有项目都会受影响。
- 可以通过 `implicitDependencies` 配置非代码文件的依赖关系。

**评分维度**：
- 说清 DAG 和项目依赖图（40%）
- 解释 Git diff 基线对比（30%）
- 说明下游依赖传播（30%）

**常见错误**：
- 认为 affected 只检查文件修改时间
- 忽略全局配置变更对 affected 范围的影响

**延伸追问**：
- 如果某个包被大量应用依赖，修改它会导致全量构建吗？
- 如何排除某些文件不被 affected 检测？

**参考资源**：
- [Nx affected](https://nx.dev/ci/features/affected)

**口头回答版**：
> nx affected 通过对比当前代码与基线（base）分支的差异，结合项目依赖图（Project Graph），只选择受影响的项目及其下游依赖执行任务。 - Nx 扫描 workspace 中所有项目的 package.json、project.json、源代码 import 关系，构建 DAG（有向无环图）。 - 通过 Git 对比 base 分支（如 origin/main）与当前分支（HEAD）： - 变更文件所属的项目首先被标记为 affected。

---

### FB-11-EN-P-003：如何设计 Monorepo 的 build caching 策略？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：build caching、缓存策略、Turborepo、Nx、remote cache
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套适用于大型 Monorepo 的 build caching 策略，包括本地缓存、远程缓存、缓存 key 设计和缓存失效策略。

**参考答案**：

设计要点：

1. **缓存 key 组成**
   - 任务名称（如 `build`、`test`）。
   - 包的 source files hash。
   - 依赖包的任务输出 hash（递归）。
   - 环境变量（如 `NODE_ENV`、`CI`）。
   - 工具版本（如 `turbo` 版本、Node 版本）。

2. **本地缓存**
   - Turborepo 默认缓存到 `node_modules/.cache/turbo`。
   - Nx 默认缓存到 `.nx/cache`。
   - 本地缓存加速开发者的重复构建。

3. **远程缓存**
   - 将缓存上传到对象存储（S3、GCS）或专用服务（Vercel Remote Cache、Nx Cloud）。
   - CI 和团队成员共享缓存，避免重复计算。

4. **缓存输出产物**
   - 明确声明 `outputs`（如 `dist/**`、`.next/**`、`coverage/**`）。
   - 遗漏 outputs 会导致缓存命中但产物缺失。

5. **缓存失效策略**
   - 输入文件变化时自动失效。
   - 环境变量变化时失效。
   - 定期清理过期缓存，避免存储无限增长。

6. **安全与隔离**
   - 远程缓存需要认证和权限控制，避免恶意缓存被注入。
   - 不同分支/PR 的缓存尽量隔离，防止污染。

示例 Turborepo 配置：

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"],
      "env": ["NODE_ENV"]
    }
  }
}
```

**评分维度**：
- 缓存 key 设计合理（30%）
- 本地 + 远程缓存完整（30%）
- 缓存失效与安全考虑（40%）

**常见错误**：
- 只配置本地缓存，CI 无法共享
- outputs 遗漏导致缓存命中但产物缺失

**延伸追问**：
- 远程缓存被污染后如何清理？
- 缓存 key 中是否应该包含 lockfile hash？

**口头回答版**：
> - 任务名称（如 build、test）。 - 包的 source files hash。 - 依赖包的任务输出 hash（递归）。 - 环境变量（如 NODE_ENV、CI）。

---
### FB-11-EN-P-004：Lerna 在现代 Monorepo 中的定位是什么？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：Lerna、版本发布、changesets、Turborepo、Nx
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Lerna 的历史作用，以及在现代 Monorepo 技术栈中它的定位和使用场景。

**参考答案**：

Lerna 是早期流行的 Monorepo 工具，主要功能包括：

1. **版本管理**：fixed / independent mode 自动 bump 版本。
2. **依赖链接**：在 workspace 工具普及前，手动 symlink 内部包。
3. **批量发布**：按拓扑顺序发布多个包到 npm。
4. **脚本批量执行**：`lerna run build`、`lerna exec`。

现代定位：

- 随着 npm/yarn/pnpm workspaces 原生支持依赖链接，Lerna 的链接功能逐渐被替代。
- 随着 Changesets 的流行，Lerna 的版本发布功能也被部分替代。
- 2022 年后，Lerna 官方推荐使用 nx 作为任务运行器（`useNx: true`）。

当前适用场景：

- 已有 Lerna 仓库，迁移成本高，可继续维护。
- 需要固定模式（fixed mode）批量发版的传统组件库。
- 与 Nx 结合使用，保留 `lerna version` 和 `lerna publish`，用 Nx 做任务编排。

不推荐新项目单独使用 Lerna 做任务编排，应优先考虑 Turborepo 或 Nx。

**评分维度**：
- 说清 Lerna 核心功能（40%）
- 说明现代替代方案（30%）
- 能给出迁移或保留建议（30%）

**常见错误**：
- 认为 Lerna 仍然是现代 Monorepo 的首选工具
- 混淆 Lerna 和 workspace 工具的职责

**延伸追问**：
- 如果仓库还在用 Lerna，如何逐步迁移到 Turborepo？
- Lerna 的 fixed mode 和 Changesets 的 fixed mode 有什么区别？

**参考资源**：
- [Lerna documentation](https://lerna.js.org/)

**口头回答版**：
> Lerna 是早期流行的 Monorepo 工具，主要功能包括： 版本管理：fixed / independent mode 自动 bump 版本。 依赖链接：在 workspace 工具普及前，手动 symlink 内部包。 批量发布：按拓扑顺序发布多个包到 npm。

---

### FB-11-EN-P-005：Rush 如何解决大型 Monorepo 的依赖一致性问题？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：Rush、Microsoft、依赖一致性、rigorous、pnpm、大型 Monorepo
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Rush 的核心设计理念，以及它如何保证大型 Monorepo 中所有子包的依赖版本一致。

**参考答案**：

Rush 是微软开源的 Monorepo 管理工具，面向大型企业和大量包的仓库。

核心设计理念：

1. **严格依赖一致性**
   - 所有子包必须使用同一版本的直接依赖和间接依赖。
   - 通过 `common/config/rush/pnpm-lock.yaml` 统一管理整个仓库的依赖树。

2. **集中式配置**
   - 在 `rush.json` 中声明所有项目。
   - 在 `common-versions.json` 中统一管理允许使用的依赖版本范围。

3. **pnpm 作为底层包管理器**
   - Rush 默认使用 pnpm 安装依赖，继承其严格依赖隔离特性。

4. **Change 流程**
   - 开发者通过 `rush change` 提交变更日志，保证每个影响版本的 PR 都有记录。

5. **构建缓存与并行**
   - Rush 内置 build cache 和并行构建能力，优化大型仓库构建。

依赖一致性机制：

- Rush 会校验所有子包的 `package.json`，确保相同依赖使用统一版本。
- 不允许子包自行安装不同版本，避免版本漂移和重复依赖。
- 通过 `rush update` 统一生成 lockfile。

**评分维度**：
- 说清 Rush 核心设计（40%）
- 解释依赖一致性机制（40%）
- 提到与 pnpm 的关系（20%）

**常见错误**：
- 认为 Rush 是包管理器（实际是编排工具，底层用 pnpm）
- 把 Rush 和 Lerna 混为一谈

**延伸追问**：
- Rush 的 `rush change` 和 changesets 有什么区别？
- 什么情况下会选择 Rush 而不是 Turborepo？

**参考资源**：
- [Rush Stack](https://rushstack.io/)

**口头回答版**：
> Rush 是微软开源的 Monorepo 管理工具，面向大型企业和大量包的仓库。 - 所有子包必须使用同一版本的直接依赖和间接依赖。 - 通过 common/config/rush/pnpm-lock.yaml 统一管理整个仓库的依赖树。 - 在 rush.json 中声明所有项目。

---

### FB-11-EN-P-006：如何处理 Monorepo 中的循环依赖？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：circular dependency、循环依赖、依赖图、重构、包边界
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Monorepo 中循环依赖的成因、危害，以及检测和解决方法。

**参考答案**：

循环依赖指包 A 依赖包 B，同时包 B 也直接或间接依赖包 A，形成闭环。

成因：

1. 包边界划分不清晰，职责重叠。
2. 共享类型定义分散在多个包中。
3. 为了复用一个小函数，引入了对整个包的依赖。

危害：

1. 构建顺序无法确定，导致缓存失效或构建失败。
2. 难以单独发布某个包。
3. 增加理解成本，改动容易引发级联影响。

检测方法：

1. **工具检测**
   - `madge`：检测 JS/TS 模块级循环依赖。
   - `dpdm`：检测 package.json 级别的循环依赖。
   - Nx 项目图可视化：自动识别项目间循环依赖。
   - `eslint-plugin-import` 的 `no-cycle` 规则。

2. **CI 校验**
   - 在 CI 中运行检测脚本，发现循环依赖即阻断合并。

解决方法：

1. **提取公共包**
   - 把循环依赖双方共同依赖的内容抽成第三个包。

2. **反转依赖方向**
   - 通过依赖注入或事件机制，让底层包不依赖上层包。

3. **合并包**
   - 如果两个包高度耦合，可考虑合并为一个包。

4. **接口隔离**
   - 使用 TypeScript interface / abstract class 解耦具体实现。

**评分维度**：
- 说清循环依赖危害（30%）
- 列举检测工具（30%）
- 给出 3 种以上解决方案（40%）

**常见错误**：
- 只在运行时发现问题，不在构建时检测
- 用 hack 方式绕过循环依赖而不重构

**延伸追问**：
- TypeScript 项目如何检测类型层面的循环依赖？
- 微前端 Monorepo 中是否更容易出现循环依赖？

**口头回答版**：
> 循环依赖指包 A 依赖包 B，同时包 B 也直接或间接依赖包 A，形成闭环。 包边界划分不清晰，职责重叠。 共享类型定义分散在多个包中。 为了复用一个小函数，引入了对整个包的依赖。

---

### FB-11-EN-P-007：workspace protocol 与相对路径引用内部包有什么区别？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：workspace protocol、相对路径、内部包、依赖边界、package.json
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
在 Monorepo 中，既可以用 `"@scope/utils": "workspace:*"` 引用内部包，也可以用 `import { x } from '../../../packages/utils'` 直接引用。请比较两者的优劣。

**参考答案**：

| 维度 | workspace protocol | 相对路径引用 |
|------|-------------------|-------------|
| 包边界 | 清晰，依赖关系显式声明在 package.json | 模糊，隐式依赖 |
| 工具链支持 | 被 pnpm/yarn、Turborepo、Nx 正确识别 | 不被 Monorepo 工具识别 |
| 构建产物 | 消费内部包的构建产物（dist） | 消费源代码，增加编译耦合 |
| 发布行为 | 发布时自动替换为版本号 | 无法发布 |
| 重构成本 | 改名或移动包时，批量替换引用即可 | 相对路径容易断裂 |
| 循环依赖检测 | 可通过依赖图检测 | 难以检测 |

因此，除非是极其临时的原型，否则应始终使用 workspace protocol 引用内部包。

**评分维度**：
- 说清 workspace protocol 优势（40%）
- 能列出 4 个以上对比维度（40%）
- 给出明确推荐（20%）

**常见错误**：
- 认为相对路径引用“更简单”而忽略长期维护成本
- 在 library 代码中使用相对路径引用其他包源码

**延伸追问**：
- 如果必须用相对路径共享代码，说明什么问题？
- 如何从现有的相对路径引用迁移到 workspace protocol？

**口头回答版**：
> | 维度 | workspace protocol | 相对路径引用 | |------|-------------------|-------------| | 包边界 | 清晰，依赖关系显式声明在 package.json | 模糊，隐式依赖 | | 工具链支持 | 被 pnpm/yarn、Turborepo、Nx 正确识别 | 不被 Monorepo 工具识别 |

---

### FB-11-SC-P-001：多包版本策略：fixed mode vs independent mode

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：fixed mode、independent mode、版本策略、组件库、工具库
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
你的 Monorepo 中既有组件库（`@scope/ui`、`@scope/icons`、`@scope/theme`），也有独立工具库（`@scope/date-utils`、`@scope/http-client`）。请为不同包设计版本策略，并说明理由。

**参考答案**：

版本策略设计：

1. **组件库：fixed mode**
   - `@scope/ui`、`@scope/icons`、`@scope/theme` 通常需要一起升级、一起验证。
   - 用户安装时希望所有组件库版本一致，避免样式或 API 不兼容。
   - 使用 fixed mode，所有组件库共享一个版本号。

2. **工具库：independent mode**
   - `@scope/date-utils`、`@scope/http-client` 之间没有强耦合。
   - 各自按实际变更独立发版，减少不必要的 major bump。
   - 用户只需升级自己关心的工具库。

3. **共享类型包**
   - 如果 `@scope/types` 被组件库和工具库共同依赖，可设为 fixed mode 或独立维护。
   - 若类型变更频繁影响多个包，建议纳入 fixed mode 统一管理。

实施方式：

- 使用 Changesets 支持多个发布组（release groups）或通过 `.changeset/config.json` 配置。
- 对 fixed group 使用 `fixed` 数组：
  ```json
  {
    "fixed": [["@scope/ui", "@scope/icons", "@scope/theme"]]
  }
  ```

**评分维度**：
- 分类合理（40%）：组件库 fixed、工具库 independent
- 理由充分（30%）：从用户安装、变更频率、耦合度说明
- 能结合 changesets 配置（30%）

**常见错误**：
- 所有包都使用 independent，导致组件库版本碎片化
- 所有包都使用 fixed，导致无关工具库被强制升级

**延伸追问**：
- 如果 `@scope/ui` major 升级，但 `@scope/icons` 没有变化，fixed mode 会怎么处理？
- 如何让用户感知到不同包之间的版本兼容性？

**口头回答版**：
> 组件库：fixed mode - @scope/ui、@scope/icons、@scope/theme 通常需要一起升级、一起验证。 - 用户安装时希望所有组件库版本一致，避免样式或 API 不兼容。 - 使用 fixed mode，所有组件库共享一个版本号。

---

### FB-11-EN-P-008：深入解析 pnpm 的 content-addressable store 原理。

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：pnpm、store、content-addressable、hard link、依赖存储
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请深入解释 pnpm 如何存储和管理依赖，为什么它比传统 node_modules 更省空间。

**参考答案**：

pnpm 使用 content-addressable store + hard link + symlink 机制管理依赖。

1. **全局 store**
   - 默认位于 `~/.local/share/pnpm/store` 或 `~/Library/pnpm/store`。
   - 所有包的真实文件只存一份，按内容寻址（content-addressable）。
   - 文件路径通常基于文件内容的 hash。

2. **hard link**
   - 项目中的 `node_modules/.pnpm/<pkg>@<version>/node_modules/<pkg>` 通过 hard link 指向 store。
   - 同一文件系统内，hard link 不复制文件内容，只增加 inode 引用计数。
   - 因此 100 个项目安装同一个 lodash，磁盘上只有一份真实内容。

3. **严格的符号链接树**
   - 每个包的 `node_modules` 只包含自己声明的依赖。
   - 依赖的依赖通过 `.pnpm/<pkg>/node_modules` 中的符号链接访问。
   - 这避免了幽灵依赖。

4. **节省空间的原因**
   - 不复制文件内容。
   - 多版本共存时，共享相同内容的部分。
   - 不提升依赖，不生成冗余的扁平结构。

5. **缓存失效**
   - 当包内容变化时，store 中会新增内容条目，旧条目保留直到 gc。
   - `pnpm store prune` 可清理未被引用的内容。

示例：
```text
~/.pnpm-store/
  v3/
    files/
      00/abc123...      # 真实文件，按 hash 命名

project/
  node_modules/
    .pnpm/
      lodash@4.17.21/
        node_modules/
          lodash -> hardlink to store
```

**评分维度**：
- 说清 content-addressable store（30%）
- 解释 hard link 和 symlink 作用（30%）
- 说明为什么省空间和避免幽灵依赖（40%）

**常见错误**：
- 认为 pnpm 只是软链接到 cache
- 不理解 hard link 与 copy 的区别
- 认为 store 中可以随意删除文件

**延伸追问**：
- `pnpm store prune` 会删除什么？
- 如果 store 损坏，如何修复？

**参考资源**：
- [pnpm motivation](https://pnpm.io/motivation)

**口头回答版**：
pnpm 把所有依赖的真实文件存在一个全局 store 里，按内容 hash 命名。项目里的 node_modules 通过 hard link 指向 store 里的文件，hard link 不复制内容，所以一百个项目装同一个包也只要一份磁盘空间。然后 pnpm 用严格的符号链接树组织依赖，每个包只能访问自己声明的依赖，这样就不会出现幽灵依赖。

---

### FB-11-EN-P-009：如何在 Monorepo 中实现跨包类型检查？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：TypeScript、类型检查、project references、跨包类型
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明在大型 Monorepo 中，如何高效地进行跨包 TypeScript 类型检查，并比较 project references 和 `tsc --noEmit` 的优劣。

**参考答案**：

方案：

1. **独立类型检查（简单方案）**
   - 每个子包运行 `tsc --noEmit`。
   - 缺点：重复解析共享类型，慢；无法利用增量编译。

2. **TypeScript Project References**
   - 在 `tsconfig.json` 中配置 `references`：
     ```json
     {
       "compilerOptions": {
         "composite": true,
         "declaration": true
       },
       "references": [
         { "path": "../utils" }
       ]
     }
     ```
   - 使用 `tsc --build` 按依赖图增量编译。
   - 优点：利用增量编译、跨包类型共享、构建缓存。
   - 缺点：配置复杂，要求被引用的项目开启 `composite`。

3. **工具链集成**
   - 使用 `tsc --build` 或 `tsc -b` 编排。
   - 用 TypeScript solution-style tsconfig：
     ```text
     tsconfig.json        # solution
     tsconfig.base.json   # 共享配置
     packages/utils/tsconfig.json
     apps/web/tsconfig.json
     ```

4. **与 Monorepo 工具结合**
   - Turborepo：配置 `type-check` 任务，`dependsOn: ["^build", "^type-check"]`。
   - Nx：`@nx/js:sync` 或 type-check executor。

5. **优化策略**
   - 只检查 affected 包。
   - 在 CI 中并行运行。
   - 使用 TS 5.0+ 的 `--build --force` 和增量缓存。

**评分维度**：
- 说清 project references 机制（40%）
- 能比较独立检查和 project references（30%）
- 提到工具链集成和优化（30%）

**常见错误**：
- 每个子包单独全量 tsc，不共享增量结果
- 不开启 `composite` / `declaration`
- references 配置错误导致类型检查遗漏

**延伸追问**：
- project references 和 workspace 依赖有什么区别？
- 如何解决循环引用导致的 `tsc --build` 失败？

**参考资源**：
- [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html)

**口头回答版**：
大型 Monorepo 推荐用 TypeScript Project References。每个子包开 `composite`，通过 `references` 声明依赖别的包，然后用 `tsc --build` 增量编译。这样共享类型只需要解析一次，还能利用增量缓存。Turborepo 或 Nx 里可以配 `type-check` 任务，只检查 affected 的包。

---

### FB-11-EN-P-010：详细说明 changesets 的 fixed 与 independent 模式内部实现差异。

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：changesets、fixed mode、independent mode、版本发布、实现
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请深入分析 changesets 在 fixed mode 和 independent mode 下如何计算版本号、更新依赖和生成 CHANGELOG。

**参考答案**：

changesets 模式差异：

1. **Independent mode**
   - 每个包独立计算版本。
   - 根据影响该包的 changeset 文件，分别计算 SemVer 升级。
   - 更新该包 package.json 版本。
   - 只更新直接依赖该包的内部依赖版本。
   - CHANGELOG 按包分别生成。

2. **Fixed mode**
   - 所有包共享一个版本号（或 release group 共享版本）。
   - 收集所有 changeset，取最高 SemVer 升级作为整体 bump。
   - 例如某个包有 major changeset，整个 group 都 bump major。
   - 所有包版本号统一更新。
   - CHANGELOG 可以合并也可以按包分别生成，取决于配置。

3. **依赖更新**
   - 内部依赖使用 `workspace:*` 或 `workspace:^` 时，`changeset version` 会解析实际版本并替换。
   - 在 fixed mode 下，内部依赖版本都变为同一个新版本。
   - 在 independent mode 下，只更新有变更包的依赖者。

4. 配置
   ```json
   {
     "changelog": "@changesets/cli/changelog",
     "commit": false,
     "fixed": [["@scope/ui", "@scope/icons"]],
     "linked": [],
     "access": "restricted",
     "baseBranch": "main"
   }
   ```

5. 内部流程
   - `assemble`：读取 `.changeset/*.md`。
   - `apply`：根据 changeset 计算新版本。
   - `update package.json`：修改版本和内部依赖版本。
   - `write changelog`：调用 changelog 函数生成内容。

**评分维度**：
- 说清 fixed / independent 版本计算逻辑（40%）
- 解释依赖更新差异（30%）
- 提到配置和内部流程（30%）

**常见错误**：
- 认为 fixed mode 下每个包按自己变更独立升级
- 混淆 fixed 和 linked 配置
- 不理解 workspace protocol 在 version 阶段的替换行为

**延伸追问**：
- fixed 和 linked 有什么区别？
- 如果一个包没有变更但处于 fixed group，会被强制升级吗？

**参考资源**：
- [changesets config](https://github.com/changesets/changesets/blob/main/docs/config-file-options.md)

**口头回答版**：
Independent 模式下每个包按自己的 changeset 单独算版本。Fixed 模式下所有包共享一个版本号，取所有 changeset 里最高级别的 bump，比如有一个 major 就全体 major。更新依赖时，changesets 会把 `workspace:*` 替换成实际版本。Fixed 下内部依赖版本都统一变，independent 下只更新受影响的包。

---

### FB-11-EN-P-011：pnpm 的 patch 机制在 Monorepo 中如何使用？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：pnpm、patch、patches、依赖修复、临时修复
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 `pnpm patch` 的作用和使用流程，并说明在 Monorepo 中管理补丁的最佳实践。

**参考答案**：

`pnpm patch` 用于临时修改 `node_modules` 中的某个依赖，并将补丁持久化到仓库中，团队成员和 CI 都能应用。

使用流程：

1. 创建补丁
   ```bash
   pnpm patch <pkg>@<version>
   ```
   会生成一个临时目录，供你修改。

2. 修改代码
   - 在临时目录中修改依赖源码。
   - 测试验证修改效果。

3. 保存补丁
   ```bash
   pnpm patch-commit <临时目录路径>
   ```
   会在仓库中生成 `patches/<pkg>@<version>.patch`。

4. 应用补丁
   - `pnpm install` 时会自动应用 `patches` 目录下的补丁。
   - 在 `pnpm-lock.yaml` 中记录补丁信息。

5. Monorepo 最佳实践
   - `patches` 目录放在仓库根目录，所有子包共享。
   - 补丁文件提交到 git。
   - 记录补丁原因和上游 issue，便于后续移除。
   - 优先通过升级依赖或 fork 解决，patch 只是临时方案。
   - 子包不应各自维护补丁，避免重复和冲突。

6. 配置
   ```yaml
   # pnpm-workspace.yaml
   packages:
     - 'packages/*'
   ```
   patches 目录默认在根目录。

**评分维度**：
- 说清 patch 使用流程（40%）
- 能说明 Monorepo 中共享补丁（30%）
- 提到临时性和文档化（30%）

**常见错误**：
- 直接修改 node_modules 不保存补丁
- 子包各自保存补丁，导致冲突
- 长期依赖 patch 而不升级上游

**延伸追问**：
- patch 文件如何被 CI 应用？
- 如果依赖升级了版本，patch 会失效吗？

**参考资源**：
- [pnpm patch](https://pnpm.io/cli/patch)

**口头回答版**：
`pnpm patch` 用来给 `node_modules` 里的依赖打临时补丁。先 `pnpm patch 包名` 生成临时目录，改完再 `pnpm patch-commit` 保存成 `patches/` 下的 `.patch` 文件。`pnpm install` 会自动应用。Monorepo 里补丁要放根目录共享，提交到 git，并记录原因和上游 issue，方便以后移除。

---

### FB-11-EN-P-012：如何分析 Monorepo 中的依赖图并优化构建顺序？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：依赖图、DAG、构建顺序、Turborepo、Nx、affected
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明如何分析 Monorepo 中包与包之间的依赖关系，并基于依赖图优化构建顺序和 CI 时间。

**参考答案**：

分析依赖图的方法：

1. 工具可视化
   - Nx：`nx graph` 生成项目依赖图。
   - Turborepo：`turbo run build --graph=output.html`。
   - pnpm：`pnpm list -r` 查看层级。

2. 依赖图数据
   - 节点：workspace 包。
   - 边：package.json dependencies / devDependencies / peerDependencies。
   - 权重：构建时间、包大小、下游依赖数量。

3. 优化构建顺序
   - 按拓扑排序执行，底层先构建。
   - 无依赖的包并行构建。
   - 长路径优先：让关键路径上的包尽早开始。

4. 减少构建范围
   - 使用 affected / `--filter` 只构建变更影响的包。
   - 减少不必要的全量构建。

5. 拆分重型包
   - 如果一个包被大量下游依赖且构建慢，考虑拆分成更小的包。
   - 减少变更影响面。

6. 缓存优化
   - 为慢任务配置 `outputs` 和 `inputs`。
   - 远程缓存共享构建结果。

7. 监控
   - 记录各包构建时间。
   - 找出瓶颈包，优先优化。

示例：
```bash
nx graph
turbo run build --graph=dist/graph.html
pnpm list -r --depth=2
```

**评分维度**：
- 说清依赖图分析方法（30%）
- 能提出 3 种以上优化策略（40%）
- 提到缓存和监控（30%）

**常见错误**：
- 不分析依赖图，所有任务串行执行
- 只优化单个包构建时间，忽略依赖结构
- 过度拆分包，增加依赖图复杂度

**延伸追问**：
- 如何识别依赖图中的关键路径？
- 如果某个核心包被 50 个应用依赖，怎么优化？

**参考资源**：
- [Nx graph](https://nx.dev/features/explore-graph)

**口头回答版**：
可以用 Nx 的 `nx graph` 或 Turborepo 的 `--graph` 可视化依赖图。优化方向包括：按拓扑排序、无依赖包并行、用 affected 只构建变更影响的包、拆分构建慢的核心包、配好缓存。还要持续监控各包构建时间，找出瓶颈。

---

### FB-11-EN-P-013：如何处理 Monorepo 中大型二进制产物或 generated code 的缓存？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：缓存、二进制产物、generated code、Turborepo、outputs
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
在 Monorepo 中，某些任务会生成大量二进制产物或 generated code。请说明如何设计缓存策略，避免缓存膨胀和缓存失效。

**参考答案**：

处理策略：

1. 精确配置 inputs / outputs
   ```json
   {
     "pipeline": {
       "generate": {
         "inputs": ["src/**/*.proto"],
         "outputs": ["generated/**"]
       }
     }
   }
   ```

2. 区分生成产物和源码
   - generated code 不提交到 git。
   - 在 `.gitignore` 中排除。
   - CI 中通过任务重新生成。

3. 大型二进制产物
   - 如果产物很大，考虑不缓存，或只缓存产物索引。
   - 使用外部存储（S3、Artifactory）存放二进制产物。
   - 缓存中只存元数据或下载脚本。

4. 增量生成
   - 生成工具本身支持增量时，保留上一次 generated code 作为输入。
   - 否则每次全量生成。

5. 缓存失效策略
   - 输入文件变化时失效。
   - 生成工具版本变化时失效。
   - 环境变量变化时失效。

6. 清理机制
   - 定期清理过期的 generated code。
   - 使用 `turbo cache prune` 或自定义脚本。

7. 产物签名
   - 对 generated code 做 hash 校验，防止不一致。

**评分维度**：
- inputs/outputs 配置合理（30%）
- 大型产物处理方案（30%）
- 缓存失效和清理机制（40%）

**常见错误**：
- 把 generated code 提交到 git
- 缓存所有大型二进制产物，导致缓存体积爆炸
- inputs 配置过粗，频繁触发全量生成

**延伸追问**：
- generated code 和源码的边界在哪里？
- 如果生成产物超过 1GB，还适合放 remote cache 吗？

**口头回答版**：
对 generated code 要精确配 inputs 和 outputs，别把产物提交到 git。大型二进制产物最好不要直接放缓存，可以存 S3，缓存里只放索引或下载脚本。还要设计好缓存失效规则，比如生成工具版本变了、输入文件变了就失效，并定期清理过期缓存。

---

### FB-11-SC-P-002：多团队 Monorepo 中如何防止包依赖失控？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：依赖治理、module boundaries、包依赖、多团队
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
在一个多团队维护的大型 Monorepo 中，如何防止包之间随意依赖、循环依赖和层级混乱？

**参考答案**：

治理方案：

1. 定义依赖规则
   - `apps/` 可以依赖 `packages/`。
   - `packages/` 不能依赖 `apps/`。
   - 基础包（utils、types）不能依赖业务包。
   - UI 包不能依赖业务逻辑包。

2. 使用工具强制校验
   - Nx module boundary rules：
     ```json
     {
       "depConstraints": [
         {
           "sourceTag": "app",
           "onlyDependOnLibsWithTags": ["shared", "feature"]
         },
         {
           "sourceTag": "shared",
           "onlyDependOnLibsWithTags": ["shared"]
         }
       ]
     }
     ```

   - 自定义 ESLint / CI 脚本：
     - `eslint-plugin-boundaries` 或自定义规则。
     - 在 CI 中运行依赖图检查。

3. 代码所有权
   - CODEOWNERS 明确每个包的维护团队。
   - 跨包依赖改动需要相关团队 review。

4. 依赖评审流程
   - 新增跨包依赖需要在 PR 中说明理由。
   - 定期 dependency audit，清理不合理依赖。

5. 可视化与教育
   - 使用 Nx graph 或自定义工具展示依赖图。
   - 在新人 onboarding 中说明依赖规则。

6. 渐进式惩罚
   - 对新增违规零容忍。
   - 对历史违规逐步清理。

**评分维度**：
- 规则设计清晰（30%）
- 工具选型与配置（30%）
- 流程和文化建设（20%）
- 可视化与监控（20%）

**常见错误**：
- 只定规则，没有工具强制
- 依赖图不可见，团队不知道规则
- 一次性要求清理所有历史违规

**延伸追问**：
- 如果某个业务紧急需要破例依赖，怎么处理？
- 如何量化依赖复杂度？

**口头回答版**：
首先要定清楚依赖规则，比如 apps 能依赖 packages，packages 不能依赖 apps。然后用 Nx module boundaries 或自定义 ESLint/CI 脚本强制校验。配合 CODEOWNERS 让改动需要对应团队 review，新增跨包依赖要说明理由。还要用依赖图可视化，让规则可见，对新增违规零容忍，历史问题逐步清理。

---

### FB-11-SC-P-003：设计 Monorepo 下多包联合调试方案。

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：调试、watch mode、workspace、开发体验、hot reload
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
在 Monorepo 中，一个应用依赖多个内部包。请设计一套开发时的联合调试方案，让修改内部包后应用能实时生效。

**参考答案**：

方案：

1. workspace 软链接
   - pnpm 已经通过 workspace 协议建立本地软链接。
   - 修改 `packages/utils` 源码后，`apps/web` 引用的是本地版本。

2. 源码引用 vs 产物引用
   - 开发时直接引用源码（通过 `exports` 或 `tsconfig paths`）。
   - 构建时引用产物（`dist`）。
   - 可用 conditional exports 区分：
     ```json
     {
       "exports": {
         "development": "./src/index.ts",
         "default": "./dist/index.js"
       }
     }
     ```

3. watch mode
   - 内部包使用 `tsup --watch` / `rollup -w` 监听源码变化并重建 dist。
   - 应用使用 vite / webpack dev server 的 HMR。
   - 用 `concurrently` 同时启动多个 watch。

4. Turborepo / Nx pipeline
   - 配置 `dev` 任务 `persistent: true`。
   - 使用 `turbo run dev` 启动应用及其依赖的 watch。

5. TypeScript project references
   - 让应用类型检查能感知内部包源码变化。

6. 调试工具
   - 使用 VS Code multi-root workspace。
   - 在应用和内部包中设置 breakpoints，source map 正常映射。

7. 注意事项
   - 避免内部包构建产物和源码状态不一致。
   - watch 任务太多时可能占用大量 CPU，需要按需启动。

示例：
```bash
# 启动应用，同时 watch 其依赖
turbo run dev --filter=@scope/web...
```

**评分维度**：
- 方案覆盖链接、watch、HMR（40%）
- 能区分开发和生产引用（30%）
- 提到调试工具和性能注意（30%）

**常见错误**：
- 只构建一次产物后不再 watch
- 应用直接引用源码，生产环境却引用产物，导致行为不一致
- 不配置 source map，调试困难

**延伸追问**：
- 如果内部包很多，如何减少同时 watch 的数量？
- 如何确保开发和生产引用的是同一份逻辑？

**参考资源**：
- [Turborepo dev tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks#persistent-tasks)

**口头回答版**：
核心是利用 workspace 的本地链接，再让内部包跑 watch mode 自动重建 dist，应用 dev server 做 HMR。可以用 `exports` 的 `development` 条件在开发时直接引源码、生产时引产物。Turborepo 里配 dev 任务 `persistent: true`，用 `turbo run dev --filter=@scope/web...` 启动应用和依赖的 watch。VS Code 多根工作区也方便跨包调试。

---

### FB-11-SD-P-001：如何设计 Monorepo 的模块边界规则？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：module boundaries、依赖规则、架构、治理
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请为大型 Monorepo 设计一套模块边界规则，防止不合理的跨包依赖，并说明如何落地。

**参考答案**：

设计原则：

1. 分层架构
   ```text
   apps/         → 业务应用层
   packages/
     ├── features/   → 业务功能包
     ├── ui/         → UI 组件包
     ├── shared/     → 通用工具包
     └── config/     → 配置包
   ```

2. 依赖方向规则
   - apps 可依赖 features / ui / shared / config。
   - features 可依赖 ui / shared / config，不能依赖 apps 和其他 features。
   - ui 可依赖 shared / config，不能依赖 features / apps。
   - shared 只能依赖 config 和其他 shared。
   - config 不能依赖任何业务包。

3. 标签体系（Nx 风格）
   - 给每个包打标签：`scope:app`、`scope:feature`、`scope:ui`、`scope:shared`。
   - 用 `depConstraints` 限制标签间依赖。

4. 实施工具
   - Nx module boundaries：
     ```json
     {
       "depConstraints": [
         { "sourceTag": "scope:feature", "onlyDependOnLibsWithTags": ["scope:ui", "scope:shared", "scope:config"] },
         { "sourceTag": "scope:ui", "onlyDependOnLibsWithTags": ["scope:shared", "scope:config"] }
       ]
     }
     ```
   - 自定义 CI 脚本：解析 package.json 依赖，校验是否违反规则。
   - ESLint 插件：`eslint-plugin-boundaries`。

5. 流程保障
   - PR 中新增跨层依赖需要架构师 review。
   - 每月 dependency audit。
   - 依赖图可视化展示。

6. 例外机制
   - 建立白名单和临时例外审批流程。
   - 例外必须标注原因和清理时间。

**评分维度**：
- 分层设计合理（30%）
- 规则可执行（30%）
- 工具落地方案（20%）
- 流程和例外机制（20%）

**常见错误**：
- 规则过于复杂，团队无法遵守
- 只依赖人工 review，没有自动校验
- 没有例外机制，导致业务需求被阻塞

**延伸追问**：
- 如果团队不用 Nx，如何实现边界校验？
- 模块边界规则和微前端边界有什么关系？

**口头回答版**：
把 Monorepo 分成 apps、features、ui、shared、config 几层，规定谁可以依赖谁。比如 apps 能依赖下面所有层，features 不能依赖 apps 和其他 features。用 Nx module boundaries 或自定义 CI 脚本自动校验。PR 里新增跨层依赖需要审批，每月做依赖审计，同时保留合理的例外机制。

## 架构题（70 道）{#architect}

### FB-11-SD-R-001：设计一个大型前端 Monorepo 的整体架构。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：Monorepo、系统架构、workspace、Turborepo、Nx、目录结构
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
假设你要从零设计一个大型前端 Monorepo，支撑 10+ 业务应用、50+ 共享包、跨团队 100+ 开发者。请设计整体架构，包括目录结构、工具链、依赖管理、构建发布、治理策略。

**参考答案**：

1. **目录结构**
   ```text
   org-monorepo/
   ├── apps/                  # 业务应用
   │   ├── web-sales/
   │   ├── web-admin/
   │   └── mobile-h5/
   ├── packages/              # 共享包
   │   ├── ui/                # 组件库
   │   ├── utils/             # 工具函数
   │   ├── hooks/             # 共享 hooks
   │   ├── types/             # 共享类型
   │   ├── eslint-config/     # 共享配置
   │   └── tsconfig/          # 共享 tsconfig
   ├── tools/                 # 脚本与脚手架
   │   ├── scripts/
   │   └── create-package/
   ├── turbo.json
   ├── pnpm-workspace.yaml
   └── .github/
       └── workflows/
   ```

2. **包管理器**
   - 使用 pnpm + `pnpm-workspace.yaml`。
   - 统一 lockfile，严格依赖隔离。

3. **任务编排与缓存**
   - 使用 Turborepo（中小规模）或 Nx（大规模、需要强治理）。
   - 配置 pipeline：`lint`、`type-check`、`build`、`test`、`e2e`。
   - 启用 Remote Cache，CI 与开发共享缓存。

4. **版本与发布**
   - 使用 Changesets 管理版本和 CHANGELOG。
   - 组件库 fixed mode，工具库 independent mode。
   - CI 自动发布到私有 npm registry。

5. **代码质量与治理**
   - 统一 ESLint、Prettier、TypeScript 配置。
   - 使用 Nx module boundaries 或自定义脚本限制包间依赖方向。
   - CODEOWNERS 明确每个目录的维护者。

6. **CI/CD**
   - PR 阶段：install → lint → type-check → affected test。
   - 合并后：full build → e2e → version → publish。

7. **开发者体验**
   - 提供脚手架快速创建包和应用。
   - 文档站点（如 VitePress / Docusaurus）说明包的使用和贡献流程。

**评分维度**：
- 架构完整性（40%）：目录、工具链、CI、治理
- 可扩展性（30%）：能否支撑 100+ 开发者、50+ 包
- 治理与质量保障（30%）：依赖方向、CODEOWNERS、文档

**常见错误**：
- 目录结构过浅，所有包平铺导致难以管理
- 忽略大型仓库的权限和代码所有权设计

**延伸追问**：
- 如何防止某个业务应用意外依赖另一个业务应用的代码？
- 当包数量达到 200 个时，Turborepo 是否还够用？

**口头回答版**：
> - 使用 pnpm + pnpm-workspace.yaml。 - 统一 lockfile，严格依赖隔离。 - 使用 Turborepo（中小规模）或 Nx（大规模、需要强治理）。 - 配置 pipeline：lint、type-check、build、test、e2e。

---

### FB-11-SD-R-002：如何从 Multirepo 迁移到 Monorepo？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：Multirepo、迁移、Monorepo、历史提交、工具链
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
你们团队目前有 5 个独立仓库，决定迁移到 Monorepo。请设计迁移方案，包括代码迁移、历史提交保留、依赖整合、CI 改造和风险控制。

**参考答案**：

迁移方案：

1. **前期评估**
   - 明确迁移目标：代码共享、统一构建、原子提交、版本对齐。
   - 评估仓库耦合度，确定迁移顺序（先共享库，后业务应用）。

2. **代码迁移方式**
   - **方式 A：git subtree / git filter-repo 保留历史提交**
     - 适合需要保留每个仓库完整历史的场景。
     - 将各仓库历史合并到新 Monorepo 的不同目录。
   - **方式 B：直接拷贝当前代码**
     - 适合历史提交价值不高的场景。
     - 在 README 中记录原仓库地址。

3. **目录与包结构设计**
   - 将原仓库按 `packages/` 和 `apps/` 分类。
   - 每个原仓库作为一个 workspace 包，保留其 `package.json`。

4. **依赖整合**
   - 统一依赖版本，合并重复的 devDependencies 到根目录。
   - 将跨仓库的 npm 依赖改为 `workspace:*` 内部依赖。
   - 运行 `pnpm install` 生成统一 lockfile。

5. **工具链统一**
   - 统一构建工具（Vite / Rollup / Webpack）。
   - 统一 ESLint、Prettier、TypeScript 配置为共享配置包。
   - 引入 Turborepo / Nx 编排任务。

6. **CI/CD 改造**
   - 将各仓库的 GitHub Actions 合并为统一 workflow。
   - 使用 affected 机制减少全量构建。

7. **风险控制**
   - 分阶段迁移，先迁 1-2 个低风险仓库验证流程。
   - 保留原仓库只读一段时间，作为备份。
   - 迁移后第一周加强监控，快速修复构建和发布问题。

**评分维度**：
- 迁移步骤完整（40%）
- 历史提交处理方案（20%）
- 风险控制和分阶段策略（40%）

**常见错误**：
- 一次性迁移所有仓库，导致问题集中爆发
- 忽略历史提交对团队排查问题的重要性

**延伸追问**：
- 如果原仓库使用了不同的包管理器，如何整合？
- 迁移后如何保持各团队的发布自主权？

**口头回答版**：
> - 明确迁移目标：代码共享、统一构建、原子提交、版本对齐。 - 评估仓库耦合度，确定迁移顺序（先共享库，后业务应用）。 - 方式 A：git subtree / git filter-repo 保留历史提交 - 适合需要保留每个仓库完整历史的场景。

---

### FB-11-SD-R-003：设计 Monorepo 下的 CI/CD 流水线。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo、12 CI/CD
**标签**：CI/CD、Monorepo、Turborepo、Nx、发布流水线、自动化
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请为大型前端 Monorepo 设计一套完整的 CI/CD 流水线，要求支持 PR 校验、合并后构建、自动版本管理和安全发布。

**参考答案**：

流水线设计：

1. **PR 阶段（快速反馈）**
   ```yaml
   jobs:
     install:
       - uses: pnpm/action-setup@v2
       - run: pnpm install --frozen-lockfile
     lint:
       needs: install
       - run: turbo run lint --filter=[origin/main...HEAD]
     type-check:
       needs: install
       - run: turbo run type-check --filter=[origin/main...HEAD]
     test:
       needs: install
       - run: turbo run test --filter=[origin/main...HEAD]
   ```

2. **合并后阶段（完整验证）**
   - 全量 build。
   - e2e 测试。
   - 生成并上传构建产物。

3. **版本管理阶段**
   - 检测是否有未消费的 changeset。
   - 自动生成版本升级 PR：`pnpm changeset version`。
   - 人工或自动合并版本 PR。

4. **发布阶段**
   - 在版本 PR 合并后触发：
     ```bash
     pnpm changeset publish
     ```
   - 发布成功后创建 GitHub Release 并打 tag。

5. **安全与审计**
   - 发布前运行 `npm audit` 或 `pnpm audit`。
   - 使用 OIDC 或长期 token 结合 registry 权限控制。
   - 发布产物需经过签名或 SBOM 生成。

6. **回滚**
   - 保留历史版本的 tag 和产物。
   - 支持一键回滚到上一版本。

**评分维度**：
- 流水线阶段完整（40%）
- affected 与缓存优化（30%）
- 安全与回滚设计（30%）

**常见错误**：
- PR 阶段全量构建，反馈慢
- 版本发布没有人工复核或审计环节

**延伸追问**：
- 发布阶段如果部分包发布成功、部分失败，如何处理？
- 如何防止未授权人员发布内部包？

**口头回答版**：
> PR 阶段（快速反馈） 合并后阶段（完整验证） - 全量 build。 - 生成并上传构建产物。

---

### FB-11-SD-R-004：Monorepo 下如何平衡代码共享与包独立发布？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：代码共享、独立发布、包边界、internal package、版本管理
**出现频率**：高频
**预计回答时长**：15-20 分钟

**题目描述**：
在 Monorepo 中，过度共享会导致耦合，过度独立会增加维护成本。请设计一套原则和实践，平衡代码共享与包的独立发布能力。

**参考答案**：

设计原则：

1. **按变更频率分层**
   - 高频变更的业务代码放在 `apps/`，不发布。
   - 中频变更的共享逻辑抽象为 internal package。
   - 低频变更的基础工具 / 组件库发布到 registry。

2. **明确包边界**
   - 每个包有单一职责和清晰的 public API。
   - 使用 `exports` 字段控制对外暴露的模块，隐藏内部实现。

3. **依赖方向约束**
   - `packages/` 不能依赖 `apps/`。
   - 基础包不能依赖业务包。
   - 使用 Nx module boundaries 或自定义 CI 脚本校验。

4. **版本策略分层**
   - 对高度协同的包使用 fixed mode。
   - 对独立工具包使用 independent mode。
   - 纯 internal package 可保持 `private: true` 不发布。

5. **构建产物隔离**
   - 每个 package 独立构建出 dist，应用消费产物而非源码。
   - 避免源码级耦合，便于单独测试和发布。

6. **共享粒度控制**
   - 优先共享类型、配置、工具函数。
   - 谨慎共享 UI 组件和业务逻辑，避免强制所有应用升级。

**评分维度**：
- 分层与边界设计（40%）
- 版本策略合理（30%）
- 治理手段可行（30%）

**常见错误**：
- 所有代码都通过 internal package 共享，导致改动影响范围不可控
- 每个小函数都独立发包，版本管理爆炸

**延伸追问**：
- 如何评估一个内部包是否应该发布到 npm？
- 当共享包升级 major 时，如何平滑迁移所有应用？

**口头回答版**：
> - 高频变更的业务代码放在 apps/，不发布。 - 中频变更的共享逻辑抽象为 internal package。 - 低频变更的基础工具 / 组件库发布到 registry。 - 每个包有单一职责和清晰的 public API。

---

### FB-11-CP-R-001：比较各家 Monorepo 工具（Turborepo / Nx / Rush / Lerna / Bazel）的适用场景。

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：Turborepo、Nx、Rush、Lerna、Bazel、工具选型
**出现频率**：中频
**预计回答时长**：15-20 分钟

**题目描述**：
请比较 Turborepo、Nx、Rush、Lerna、Bazel 这几款 Monorepo 工具，分别说明它们的定位、优势和适用场景。

**参考答案**：

| 工具 | 定位 | 优势 | 适用场景 |
|------|------|------|----------|
| **Turborepo** | 任务运行器 + 远程缓存 | 接入简单、速度快、与 pnpm/yarn 配合好 | 前端/Node Monorepo，小到中型规模 |
| **Nx** | 全功能 Monorepo 平台 | 依赖图分析、插件生态、代码生成器、模块边界 | 中大型 Monorepo，多技术栈，强治理需求 |
| **Rush** | 微软企业级 Monorepo | 严格依赖一致性、change 流程、适合大型组织 | 大型企业，包数量多，需要强管控 |
| **Lerna** | 传统版本发布工具 | 历史悠久，fixed/independent 发版 |  legacy 仓库，与 Nx 结合做发布 |
| **Bazel** | 通用构建系统 | 极致增量构建、跨语言、可复现性 | 超大型仓库，多语言，Google 级规模 |

选型建议：

- 初创团队 / 前端仓库：Turborepo。
- 需要强代码生成和依赖治理：Nx。
- 大型企业、严格版本一致性：Rush。
- 已有 Lerna 且迁移成本高：保留 Lerna 发布，叠加 Nx 做任务编排。
- 超大规模、跨语言：Bazel，但学习曲线陡峭。

**评分维度**：
- 工具覆盖完整（40%）：至少比较 4 个工具
- 优劣势分析准确（30%）
- 能给出明确选型建议（30%）

**常见错误**：
- 认为某个工具适合所有场景
- 忽略 Bazel 的学习和迁移成本

**延伸追问**：
- 如果团队已经用了 Turborepo，什么信号说明应该迁移到 Nx？
- Bazel 的 BUILD 文件机制对前端开发体验有什么影响？

**口头回答版**：
> | 工具 | 定位 | 优势 | 适用场景 | |------|------|------|----------| | Turborepo | 任务运行器 + 远程缓存 | 接入简单、速度快、与 pnpm/yarn 配合好 | 前端/Node Monorepo，小到中型规模 | | Nx | 全功能 Monorepo 平台 | 依赖图分析、插件生态、代码生成器、模块边界 | 中大型 Monorepo，多技术栈，强治理需求 |

---

### FB-11-CP-R-002：Monorepo 的优劣及何时不应该使用 Monorepo？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：Monorepo、Multirepo、技术选型、组织治理、权衡
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请系统分析 Monorepo 的优势和劣势，并说明在什么情况下不应该使用 Monorepo。

**参考答案**：

优势：

1. **代码共享简单**：内部包可直接引用，降低复用成本。
2. **原子重构**：一次提交可修改多个包，保持改动一致性。
3. **统一工具链**：统一构建、测试、发布流程，降低维护成本。
4. **依赖一致性**：统一 lockfile，避免版本漂移。
5. **协作透明**：所有代码可见，便于跨团队学习和 review。

劣势：

1. **仓库规模膨胀**：Git 操作变慢，clone / pull / blame 耗时增加。
2. **权限控制困难**：难以像 Multirepo 那样天然隔离访问权限。
3. **构建复杂度上升**：需要专业工具（Turborepo/Nx）和 affected 优化。
4. **单点故障风险**：CI、发布流水线出问题影响所有项目。
5. **团队协作成本**：需要统一的代码规范和治理策略。

不适用场景：

1. **团队 / 产品高度独立**：各产品线没有共享代码需求。
2. **权限要求严格**：不同团队不能访问彼此代码（需配合 Git 子目录权限或拆分仓库）。
3. **仓库规模过大且无法拆分**：Git 性能成为瓶颈，且无法通过 sparse checkout 缓解。
4. **缺乏 Monorepo 工具链经验**：团队没有 Turborepo/Nx 运维能力。
5. **跨组织开源项目**：不同组织维护不同模块，Multirepo 更合适。

**评分维度**：
- 优劣分析全面（50%）：至少 4 个优势和 4 个劣势
- 能给出不适用场景（30%）
- 结合组织和技术因素分析（20%）

**常见错误**：
- 只讲优势，不讲劣势和成本
- 把 Monorepo 当成银弹，忽略团队规模和组织结构

**延伸追问**：
- 你们公司为什么用 / 不用 Monorepo？如果重新选择会怎么决策？
- Monorepo 的规模上限大概是多少？有哪些缓解手段？

**口头回答版**：
> 代码共享简单：内部包可直接引用，降低复用成本。 原子重构：一次提交可修改多个包，保持改动一致性。 统一工具链：统一构建、测试、发布流程，降低维护成本。 依赖一致性：统一 lockfile，避免版本漂移。

---


### FB-11-SD-R-005：设计一个跨团队 Monorepo 的代码所有权与评审策略。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：CODEOWNERS、代码所有权、跨团队、review、治理
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
在一个由多个团队共同维护的 Monorepo 中，如何划分代码所有权，并设计高效的代码评审流程？

**参考答案**：

代码所有权策略：

1. CODEOWNERS
   - 在 `.github/CODEOWNERS` 中按目录指定团队：
     ```text
     apps/web-sales     @team-sales
     apps/web-admin     @team-admin
     packages/ui        @team-design-system
     packages/utils     @team-platform
     ```
   - 可以按文件类型进一步细化。

2. 包级 ownership
   - 每个 internal package 有明确的维护团队。
   - 在 README 或 metadata 中标注 owner。
   - 使用 Nx / custom metadata 记录 owner。

3. 评审规则
   - 修改自己团队目录：1-2 名同团队 reviewer。
   - 修改跨团队包：必须包含相关团队 reviewer。
   - 修改共享基础设施（如 `turbo.json`、`pnpm-workspace.yaml`）：需要平台团队 + 相关团队 review。

4. 自动化
   - 使用 GitHub CODEOWNERS 自动分配 reviewer。
   - Danger / Probot 检查跨团队依赖是否需要额外审批。
   - CI 阻塞：缺少 required reviewer 不能合并。

5. 评审流程优化
   - 小改动快速合并（fast track）。
   - 大改动 RFC 先行。
   - 异步 review + 同步对齐会议。

6. 权限与责任
   - 团队对自己目录有主导权。
   - 共享包改动需要更广泛共识。
   - 建立 on-call 轮值处理跨团队问题。

**评分维度**：
- 所有权划分清晰（30%）
- 评审流程合理（30%）
- 自动化和权限设计（20%）
- 可扩展性和冲突处理（20%）

**常见错误**：
- 所有文件都由一个团队 review，成为瓶颈
- CODEOWNERS 过于宽泛，无法精确到包
- 缺少跨团队改动的额外审批

**延伸追问**：
- 如果一个 PR 同时影响 5 个团队，如何高效 review？
- 如何处理团队之间对共享包改动的分歧？

**口头回答版**：
用 CODEOWNERS 按目录指定团队，比如 `apps/web-sales` 归销售团队、`packages/ui` 归设计系统团队。每个内部包也要有明确 owner。评审时，改自己团队代码内部 review 就行；跨团队改动必须拉相关团队 reviewer；改基础设施要平台团队把关。可以用 GitHub 自动分配、Danger 检查，大改动先走 RFC。

---

### FB-11-SD-R-006：如何设计 Monorepo 下的渐进式迁移与拆分策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：迁移、拆分、Monorepo、Multirepo、渐进式
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
当 Monorepo 规模过大或组织结构调整时，可能需要拆分仓库。请设计一套渐进式迁移与拆分策略。

**参考答案**：

迁移/拆分策略：

1. 评估拆分时机
   - Git 操作明显变慢。
   - 团队间发布节奏冲突严重。
   - 某些产品线独立，共享需求少。
   - 合规或权限要求。

2. 确定拆分边界
   - 按业务线拆分（如电商、支付、内容）。
   - 按技术栈拆分（如前端、后端、移动端）。
   - 按发布周期拆分。
   - 优先拆分依赖最少的部分。

3. 渐进式拆分步骤
   - 阶段 1：内部包发布到私有 registry。
     - 把 `@scope/utils` 等共享包发布版本。
   - 阶段 2：目标仓库改为消费 npm 包。
     - 原 Monorepo 中的 apps 改为依赖 registry 版本。
   - 阶段 3：代码迁移。
     - 使用 `git filter-repo` 保留历史。
     - 或拷贝当前代码并归档原仓库。
   - 阶段 4：CI/CD 和权限独立。
   - 阶段 5：清理原 Monorepo 中的相关代码。

4. 保留内部依赖过渡
   - 使用 Verdaccio 等私有 registry 暂时代替 workspace 链接。
   - 同时支持 `workspace:*` 和 npm 版本切换。

5. 风险控制
   - 先选 1-2 个低风险应用试点。
   - 保留原代码只读一段时间。
   - 建立回滚机制。

6. 沟通与文档
   - 明确拆分后的责任和发布流程。
   - 更新开发者文档和 runbook。

**评分维度**：
- 拆分时机和边界判断（30%）
- 渐进式步骤合理（40%）
- 风险控制和沟通（30%）

**常见错误**：
- 一次性拆分大量代码
- 拆分后共享包版本混乱
- 忽略历史提交和审计要求

**延伸追问**：
- 拆分后如何保持跨仓库的代码共享？
- 如何决定哪些包应该继续留在 Monorepo 中？

**口头回答版**：
拆分前先评估是真的需要拆，比如 Git 太慢、团队发布冲突。然后按业务线或技术栈找边界，优先拆依赖少的。渐进式做法：先把共享包发到私有 registry，再让目标仓库消费 npm 版本而不是 workspace 链接，然后迁移代码，最后独立 CI 和权限。先试点一两个低风险应用，保留原仓库只读，方便回滚。

---

### FB-11-SD-R-007：设计一个支持微前端聚合的 Monorepo 架构。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo、A02 Micro Frontend
**标签**：微前端、Monorepo、聚合、qiankun、module federation
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个 Monorepo 架构，支撑多个微前端应用聚合到一个主框架中，兼顾独立开发、构建和部署。

**参考答案**：

架构设计：

1. 目录结构
   ```text
   apps/
   ├── shell/            # 主框架，负责加载子应用
   ├── mf-app-sales/     # 销售子应用
   ├── mf-app-admin/     # 管理子应用
   └── mf-app-h5/        # H5 子应用
   packages/
   ├── shared-ui/        # 共享 UI 组件
   ├── shared-utils/     # 工具函数
   └── shared-types/     # 共享类型
   ```

2. 技术选型
   - Module Federation 2.0：运行时共享模块。
   - qiankun / single-spa：应用级微前端容器。
   - 或 iframe 作为兜底方案。

3. 构建策略
   - 每个子应用独立构建，输出各自产物。
   - shell 聚合时通过 Module Federation 或 qiankun 加载。
   - 共享包先构建，供子应用和 shell 使用。

4. 版本与依赖一致性
   - React、Vue 等框架作为 peer dependency，由 shell 提供。
   - 共享包使用 fixed mode 或独立发布。
   - 使用 import map / external 避免重复加载。

5. 独立部署
   - 每个子应用有自己的 CI/CD pipeline。
   - 通过环境变量或配置中心决定加载哪些子应用。
   - 支持灰度发布和回滚。

6. 本地开发
   - shell dev server 代理到各子应用 dev server。
   - 或独立启动子应用，通过 URL 参数挂载到 shell。

7. 通信与状态
   - 使用事件总线、URL 参数、localStorage 等轻量通信。
   - 避免共享状态库强耦合。

**评分维度**：
- 目录结构合理（20%）
- 微前端技术选型清晰（20%）
- 构建和部署策略完整（30%）
- 依赖一致性和通信方案（30%）

**常见错误**：
- 所有微应用共享同一个构建产物
- 子应用直接依赖其他子应用
- 共享包版本不统一导致运行时冲突

**延伸追问**：
- 如果两个子应用需要不同版本的 React，怎么办？
- 如何设计微前端之间的路由？

**口头回答版**：
用 `apps/shell` 做主框架，`apps/mf-app-*` 做各个子应用，`packages/` 放共享 UI、工具、类型。技术可以选 Module Federation 或 qiankun。每个子应用独立构建部署，shell 负责聚合。React 这类框架作为 peer dependency 由 shell 提供，共享包统一管理版本。本地开发时 shell 代理到各子应用 dev server。

---

### FB-11-SD-R-008：如何设计 Monorepo 的依赖治理与自动化审计体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：依赖治理、审计、自动化、安全、依赖图
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套 Monorepo 依赖治理体系，包括依赖准入、版本管理、安全审计、过期清理和自动化报告。

**参考答案**：

体系设计：

1. 依赖准入
   - 新依赖引入需填写审批单，说明理由和替代方案。
   - 维护允许使用的依赖白名单。
   - 禁止重复引入功能相近的库。

2. 版本管理
   - 使用 catalog 统一管理常用依赖版本。
   - 使用 pnpm overrides 处理紧急版本修复。
   - 定期统一升级依赖（如每月 dependency update day）。

3. 安全审计
   - CI 中运行 `pnpm audit` / `npm audit`。
   - 集成 Snyk、Dependabot、Renovate。
   - 高危漏洞自动创建修复 PR。

4. 依赖健康度检查
   - 检测未使用依赖（knip、depcheck）。
   - 检测循环依赖（madge、dpdm、Nx graph）。
   - 检测重复依赖版本（`pnpm list -r`）。

5. 自动化报告
   - 定期生成依赖报表：漏洞数、过期依赖数、重复依赖数。
   - 使用 dashboard 展示趋势。
   - 对新增违规 PR 自动 comment。

6. 清理机制
   - 每季度清理未使用依赖。
   - 对长期未维护的依赖评估替换。

7. 组织保障
   - 平台团队负责治理体系维护。
   - 各业务团队负责自己包的依赖健康。

**评分维度**：
- 体系覆盖完整（40%）
- 自动化程度高（30%）
- 可落地性和组织保障（30%）

**常见错误**：
- 只审计不治理
- 依赖升级没有计划，集中爆发
- 没有白名单，任意引入依赖

**延伸追问**：
- 如何平衡安全升级和业务稳定性？
- 依赖治理应该由平台团队还是业务团队主导？

**口头回答版**：
依赖治理要覆盖准入、版本、安全、清理四个环节。新依赖要审批，维护白名单；用 catalog 统一版本，每月固定升级；CI 跑 audit，集成 Dependabot/Snyk；用 knip 扫未使用依赖，用 Nx graph 扫循环依赖。还要定期出报告，平台团队维护体系，业务团队负责各自包的落实。

---

### FB-11-CP-R-003：讨论 Monorepo 中"一个仓库"与"多个仓库"的决策框架。

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：Monorepo、Multirepo、决策框架、组织、技术选型
**出现频率**：中频
**预计回答时长**：15-20 分钟

**题目描述**：
请给出一个决策框架，帮助团队在 Monorepo 和 Multirepo 之间做出选择，并说明关键权衡因素。

**参考答案**：

决策框架：

1. 团队与组织因素
   - 团队是否高度协作？是否需要频繁跨项目重构？
   - 组织是否愿意共享代码和统一规范？
   - 权限要求是否严格？

2. 产品与技术因素
   - 产品之间耦合度如何？是否共享组件、类型、API？
   - 技术栈是否统一？
   - 发布节奏是否需要强一致？

3. 工具与运维能力
   - 是否有 Monorepo 工具链经验（Turborepo/Nx）？
   - 是否有 CI/CD 和缓存基础设施？
   - 是否能承受仓库规模增长带来的 Git 性能问题？

4. 决策矩阵
   | 因素 | 倾向 Monorepo | 倾向 Multirepo |
   | 高代码共享需求 | ✓ | |
   | 强权限隔离 | | ✓ |
   | 频繁原子重构 | ✓ | |
   | 独立发布节奏 | | ✓ |
   | 统一工具链 | ✓ | |
   | 超大规模/多语言 | 视工具而定 | ✓ |

5. 混合策略
   - 核心产品 Monorepo，独立开源库 Multirepo。
   - 大团队内部 Monorepo，跨组织 Multirepo。
   - 使用 git submodule / npm registry 桥接。

6. 演进视角
   - 初期可 Multirepo，快速试错。
   - 共享需求增加后迁移到 Monorepo。
   - 规模过大时再考虑拆分。

**评分维度**：
- 框架维度完整（40%）
- 能给出明确权衡（30%）
- 结合实际场景举例（30%）

**常见错误**：
- 非黑即白，不考虑混合策略
- 忽略组织因素
- 只考虑当前规模，不考虑演进

**延伸追问**：
- 你们公司目前的结构适合 Monorepo 吗？为什么？
- 如果团队坚决反对 Monorepo，你会怎么推动？

**口头回答版**：
决策框架看三点：组织上是否愿意共享代码、技术上产品耦合度和技术栈是否统一、运维上有没有 Monorepo 工具链和缓存基础设施。高共享、频繁原子重构、统一工具链倾向 Monorepo；强权限隔离、独立发布、超大规模倾向 Multirepo。实际也可以混用，比如核心产品 Monorepo，独立库 Multirepo。

---

### FB-11-SD-R-009：设计支持多语言（前端 + Node + Python）的 Monorepo 架构。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：多语言、Monorepo、Python、Node、前端、跨技术栈
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个 Monorepo 架构，同时支持前端、Node 后端和 Python 服务，并说明工具链如何协同。

**参考答案**：

架构设计：

1. 目录结构
   ```text
   org-monorepo/
   ├── apps/
   │   ├── web/          # React / Vue
   │   ├── admin/        # React
   │   └── api/          # Node.js
   ├── services/
   │   ├── ml-service/   # Python
   │   └── data-service/ # Python
   ├── packages/
   │   ├── shared-types/
   │   ├── ui/
   │   └── config/
   ├── python-packages/
   │   └── shared-py/
   └── tools/
   ```

2. 包管理器选择
   - Node/前端：pnpm workspace。
   - Python：uv / poetry / pdm workspace。
   - 或统一用 Bazel / Pants 管理多语言依赖。

3. 任务编排
   - 使用 Nx 或 Bazel，支持多语言 task graph。
   - Turborepo 更适合前端/Node，多语言需扩展。
   - 为 Python 写自定义 executor / script。

4. 共享契约
   - OpenAPI / Protocol Buffers 定义前后端接口。
   - 共享 types 包生成 TypeScript / Python 类型。
   - JSON Schema 共享配置校验。

5. CI/CD
   - 分语言 job：node-ci、python-ci。
   - 使用 affected 机制只构建变更部分。
   - 统一 artifact registry。

6. 开发环境
   - devcontainer / Dockerfile 统一环境。
   - mise / asdf 管理多语言运行时版本。

7. 依赖管理
   - 前后端内部包通过 workspace / npm 链接。
   - Python 内部包通过 editable install 或私有 PyPI。
   - 跨语言接口通过 schema 定义。

**评分维度**：
- 目录结构合理（20%）
- 多语言工具链协同（30%）
- 跨语言共享契约（30%）
- CI/CD 和开发环境（20%）

**常见错误**：
- 强行用前端工具管理 Python
- 跨语言接口没有契约定义
- 所有语言共用一个构建流程

**延伸追问**：
- 多语言 Monorepo 用 Nx 还是 Bazel 更好？
- 如何保证 TypeScript 类型和 Python 类型一致？

**口头回答版**：
可以按 `apps/` 放前端和 Node，`services/` 放 Python，`packages/` 放共享 TypeScript 包，`python-packages/` 放共享 Python 包。Node 用 pnpm，Python 用 uv/poetry。任务编排用 Nx 或 Bazel，因为它们支持多语言。前后端通过 OpenAPI 或 Protobuf 共享契约，再生成各自类型。CI 按语言分 job，用 affected 只跑变更部分。

---

### FB-11-CP-R-004：如何向管理层论证 Monorepo 的 ROI？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：ROI、Monorepo、管理沟通、成本收益
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
作为技术负责人，你需要向管理层说明引入 Monorepo 的投入产出。请给出论证思路和关键指标。

**参考答案**：

论证框架：

1. 当前痛点（成本现状）
   - 跨仓库重复代码多，维护成本高。
   - 版本不一致导致线上 bug。
   - 发布协调耗时，跨项目改动需要多次 PR。
   - 新员工熟悉多个仓库成本高。

2. Monorepo 收益
   - 代码复用：内部包直接引用，减少重复开发。
   - 原子重构：一次提交改多个包，降低协调成本。
   - 统一工具链：减少 CI/CD 和维护工具种类。
   - 依赖一致性：统一 lockfile，减少版本冲突。
   - 协作透明：代码可见，便于跨团队学习和 review。

3. 投入成本
   - 工具链迁移：Turborepo/Nx 引入和培训。
   - CI/CD 改造：affected、缓存、remote cache。
   - 组织调整：CODEOWNERS、依赖治理。
   - 一次性迁移成本。

4. 关键指标
   - 跨包重构所需 PR 数。
   - 依赖版本冲突数。
   - CI 平均构建时间。
   - 重复代码比例。
   - 新员工上手时间。
   - 发布事故数。

5. 分阶段落地
   - 先试点 1-2 个关联紧密的项目。
   - 验证指标改善后再扩大范围。
   - 设定回滚条件。

6. 风险与应对
   - 风险：Git 性能、权限、单点故障。
   - 应对：工具优化、分支策略、备份方案。

**评分维度**：
- 收益和成本分析清晰（40%）
- 关键指标可量化（30%）
- 分阶段和风险考虑（30%）

**常见错误**：
- 只讲收益不讲成本
- 指标无法量化
- 忽略组织和文化阻力

**延伸追问**：
- 如果管理层只看短期成本，你怎么说服？
- Monorepo 的回报周期一般多长？

**口头回答版**：
先摆当前痛点，比如重复代码多、版本冲突、发布协调慢。然后说 Monorepo 的收益：代码复用、原子重构、统一工具链、依赖一致。同时也要讲投入，包括工具迁移、CI 改造、组织调整。关键指标要能量化，比如 CI 构建时间、跨包改动 PR 数、依赖冲突数、发布事故数。建议先试点两个项目验证效果，再扩大。

---

### FB-11-SD-R-010：设计一个 Monorepo 下的共享服务与 API 治理方案。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：共享服务、API 治理、Monorepo、BFF、契约
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套 Monorepo 下的共享服务和 API 治理方案，确保前后端接口契约一致、版本可控、变更可追溯。

**参考答案**：

方案设计：

1. 目录结构
   ```text
   packages/
   ├── api-contracts/     # OpenAPI / Protobuf 定义
   ├── api-client/        # 基于契约生成的前端请求客户端
   ├── api-types/         # 共享类型
   └── api-mocks/         # Mock 数据
   services/
   ├── bff/               # Node BFF
   └── gateway/           # API Gateway
   ```

2. 契约定义
   - 使用 OpenAPI 3.0 / Protobuf 作为单一真相源。
   - 契约文件纳入版本控制。
   - 变更需经过 API review。

3. 代码生成
   - 后端根据契约生成路由、校验、类型。
   - 前端根据契约生成 TypeScript client 和类型。
   - Python 服务生成对应类型和客户端。

4. 版本管理
   - API 契约按 major.minor.patch 版本化。
   - 破坏性变更需升级 major 并走迁移流程。
   - 保留旧版本兼容期。

5. 变更流程
   - 改契约先提 PR，通知前后端团队。
   - CI 自动生成代码并跑契约测试。
   - 合并后触发 client 包发布。

6. 治理工具
   - 使用 Stoplight / Swagger UI 展示 API 文档。
   - 使用 Optic 或 breaking change detector 检测破坏性变更。
   - 使用 API 网关做路由和限流。

7. 监控与追溯
   - API 调用埋点。
   - 版本发布记录和 CHANGELOG。
   - 错误回滚机制。

**评分维度**：
- 契约定义和代码生成（30%）
- 版本和变更流程（30%）
- 治理工具和监控（20%）
- 跨语言/团队协同（20%）

**常见错误**：
- 契约文件散落各处，没有统一真相源
- 前后端各自手写类型，不同步
- 破坏性变更没有兼容期

**延伸追问**：
- 如果后端已经用 Java，如何让前端生成 TypeScript 类型？
- API 契约变更应该由前端还是后端主导？

**口头回答版**：
用 `packages/api-contracts` 统一放 OpenAPI 或 Protobuf 契约作为唯一真相源，前后端都根据它生成代码。契约变更要走 PR review，CI 自动生成 client 和类型并跑测试。版本按 SemVer 管理，破坏性变更要升 major 并留兼容期。再用 Stoplight 展示文档，Optic 检测破坏性变更，网关做路由和限流。

---

### FB-11-SD-R-011：设计 Monorepo 下的文档站点与开发者门户。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：文档、开发者门户、Monorepo、VitePress、Storybook
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请为大型 Monorepo 设计一个文档站点和开发者门户，帮助开发者快速了解仓库结构、使用内部包、遵循开发规范。

**参考答案**：

设计方案：

1. 文档站点结构
   ```text
   docs/
   ├── getting-started/
   ├── architecture/
   ├── packages/
   ├── guidelines/
   ├── faq/
   └── api/
   website/           # VitePress / Docusaurus 站点
   ```

2. 文档内容
   - 新手指南：环境准备、首次构建、常用命令。
   - 架构说明：目录结构、依赖规则、模块边界。
   - 包文档：每个 internal package 的 README 自动聚合。
   - 开发规范：提交规范、PR 流程、CODEOWNERS。
   - API 文档：TypeDoc / Storybook。
   - FAQ 和故障排查。

3. 自动化生成
   - 从 package.json 生成包列表和依赖图。
   - 从 turbo.json / nx.json 生成任务说明。
   - 从 TypeScript 源码生成 API 文档。
   - 从 Storybook 生成组件文档。

4. 开发者门户功能
   - 搜索功能。
   - 内部包使用示例。
   - CI 状态看板。
   - 依赖健康度仪表板。
   - RFC 和 ADR 归档。

5. 部署与更新
   - 文档站点随 main 分支自动部署。
   - PR 中要求更新相关文档。
   - 使用 CI 检查文档链接有效性。

6. 激励与治理
   - 把文档质量纳入 PR review。
   - 设立文档 owner。
   - 定期文档评审日。

**评分维度**：
- 文档结构完整（30%）
- 自动化生成能力（30%）
- 门户功能和可发现性（20%）
- 治理和更新机制（20%）

**常见错误**：
- 文档与代码不同步
- 只在根目录放一个 README
- 缺少搜索和导航

**延伸追问**：
- 如何确保每个内部包都有合格的 README？
- 文档站点的搜索应该怎么做？

**参考资源**：
- [VitePress](https://vitepress.dev/)
- [Docusaurus](https://docusaurus.io/)

**口头回答版**：
文档站点可以分新手指南、架构说明、包文档、开发规范、API 文档几个板块。用 VitePress 或 Docusaurus 搭建，部署在 main 分支更新时自动触发。要自动化生成包列表、依赖图、TypeDoc API 文档。门户里加搜索、CI 看板、依赖健康度。PR 要求同步更新文档，把文档质量纳入 review。


## 基础题（续）

### FB-11-CO-B-014：pnpm-workspace.yaml 中的 packages glob 如何匹配子包？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：pnpm-workspace.yaml、glob、workspace、子包匹配、目录结构
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `pnpm-workspace.yaml` 中 `packages` 字段的 glob 匹配规则，并举例哪些目录会被识别为 workspace 包。

**参考答案**：

`pnpm-workspace.yaml` 中的 `packages` 数组定义了哪些目录被识别为 workspace 子包，支持 glob 语法。

常见写法：

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'
  - '!**/test/**'
  - '!**/node_modules/**'
```

匹配规则：

1. `packages/*`：匹配 `packages` 下的一级子目录，每个子目录必须包含 `package.json`。
2. `apps/**`：匹配 `apps` 下任意层级子目录（慎用，可能误匹配）。
3. `!` 前缀：排除匹配，如排除测试目录或示例目录。
4. 根目录本身不会自动成为 workspace 包，除非显式配置 `.`。

示例：

```text
my-monorepo/
├── packages/
│   ├── ui/          # 匹配 packages/*
│   └── utils/       # 匹配 packages/*
├── apps/
│   ├── web/         # 匹配 apps/*
│   └── admin/       # 匹配 apps/*
└── examples/
    └── demo/        # 未配置则不匹配
```

验证匹配结果：

```bash
pnpm list -r --depth=-1
```

**评分维度**：
- 说清 glob 基本语法（40%）
- 能举例说明匹配与排除（30%）
- 知道如何验证哪些包被识别（30%）

**常见错误**：
- 用 `packages/**` 导致深层目录被误识别
- 子目录缺少 `package.json` 却期望被识别
- 忘记加排除规则，把 `node_modules` 里的包纳入 workspace

**延伸追问**：
- 如果 `packages/ui` 下还有一个 `packages/ui/internal`，会被识别为独立包吗？
- 如何在 CI 中快速检查 workspace 包列表是否正确？

**相关题目**：
- [FB-11-EN-B-001 如何初始化一个最小的 pnpm workspace Monorepo](#FB-11-EN-B-001)
- [FB-11-CO-B-010 Monorepo 中常见的目录结构有哪些约定](#FB-11-CO-B-010)

**参考资源**：
- [pnpm workspaces](https://pnpm.io/workspaces)

**口头回答版**：
`pnpm-workspace.yaml` 里的 `packages` 用 glob 告诉 pnpm 哪些目录是子包。常见写 `packages/*`、`apps/*`，只匹配一级子目录，每个子目录里必须有 `package.json`。也可以用 `!` 排除某些目录。可以用 `pnpm list -r` 检查实际匹配了哪些包。

---

### FB-11-CO-B-015：.npmrc 在 Monorepo 中通常用于配置哪些行为？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：.npmrc、npmrc、registry、peerDependencies、Monorepo
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举 `.npmrc` 在 Monorepo 中常见的配置项，并说明它们解决了什么问题。

**参考答案**：

`.npmrc` 是 npm / pnpm / yarn 的配置文件，在 Monorepo 中常用于统一包管理器行为。

常见配置：

```ini
# 使用统一 registry
registry=https://registry.npmjs.org/

# pnpm 严格 peer dependencies 检查
strict-peer-dependencies=false

# 自动安装 peer dependencies（pnpm 8 默认行为）
auto-install-peers=true

# 保存精确版本
save-exact=true

# 链接 workspace 包时使用目录而非 symlink（某些 CI 需要）
# prefer-workspace-packages=true

# 禁止在 install 时执行 postinstall 脚本（安全）
ignore-scripts=true

# hoist 模式（pnpm）
hoist=false
```

解决的问题：

1. **依赖来源一致**：统一 `registry` 防止不同开发者解析到不同镜像。
2. **peer dependencies 冲突**：通过 `strict-peer-dependencies=false` 兼容旧包。
3. **安全**：`ignore-scripts=true` 避免恶意 postinstall 脚本。
4. **版本策略**：`save-exact=true` 控制依赖保存格式。
5. **workspace 行为**：`prefer-workspace-packages=true` 优先使用本地 workspace 包。

**评分维度**：
- 列举 4 个以上常见配置（50%）
- 能说明每个配置解决的问题（30%）
- 提到安全和一致性价值（20%）

**常见错误**：
- 把 `.npmrc` 和 `.nvmrc` 混淆
- 所有配置只写在用户目录，导致团队不一致
- 随意关闭 `strict-peer-dependencies` 而不治理 peer 冲突

**延伸追问**：
- `.npmrc` 放在根目录和子包目录，优先级是怎样的？
- `ignore-scripts=true` 会带来什么副作用？

**相关题目**：
- [FB-11-CO-B-013 什么是 peer dependencies](#FB-11-CO-B-013)
- [FB-11-EN-A-009 如何处理 Monorepo 中不同子包的 Node.js 版本要求](#FB-11-EN-A-009)

**参考资源**：
- [npmrc 文档](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [pnpm .npmrc 配置](https://pnpm.io/npmrc)

**口头回答版**：
`.npmrc` 用来统一包管理器行为。Monorepo 里常见配置有统一 registry、控制 peer dependencies 严格检查、禁止 postinstall 脚本、保存精确版本等。放在仓库根目录可以保证团队一致，解决来源不一致、peer 冲突和安全问题。

---

### FB-11-EN-B-016：如何在 Monorepo 中统一 ESLint / Prettier 配置？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：ESLint、Prettier、共享配置、internal package、代码规范
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何在 Monorepo 中设计并分发统一的 ESLint 和 Prettier 配置，让各子包一致地继承和扩展。

**参考答案**：

设计方案：

1. 创建共享配置包

```text
packages/
├── eslint-config/
│   ├── package.json
│   ├── base.js
│   ├── react.js
│   └── node.js
└── prettier-config/
    ├── package.json
    └── index.json
```

2. `packages/eslint-config/package.json`

```json
{
  "name": "@scope/eslint-config",
  "version": "1.0.0",
  "main": "base.js",
  "exports": {
    ".": "./base.js",
    "./react": "./react.js",
    "./node": "./node.js"
  },
  "peerDependencies": {
    "eslint": ">=8.0.0"
  },
  "dependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "eslint-config-prettier": "^9.0.0"
  }
}
```

3. 子包继承

```js
// apps/web/.eslintrc.js
module.exports = {
  extends: ['@scope/eslint-config/react'],
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
};
```

```json
// apps/web/package.json
{
  "devDependencies": {
    "@scope/eslint-config": "workspace:*",
    "eslint": "^8.57.0"
  }
}
```

4. Prettier 共享

```json
// packages/prettier-config/index.json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

```json
// apps/web/package.json
{
  "prettier": "@scope/prettier-config"
}
```

5. 根目录脚本统一调用

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

**评分维度**：
- 共享配置包设计合理（40%）
- 能写出 extends / prettier 继承方式（30%）
- 提到 peerDependencies 和 workspace 引用（30%）

**常见错误**：
- 每个子包复制一份 ESLint 配置
- 共享配置包没有声明 peerDependencies
- Prettier 配置写在 `.prettierrc` 但不通过包名引用

**延伸追问**：
- 如果某个子包需要临时关闭一条规则，怎么做？
- ESLint flat config 模式下如何共享配置？

**相关题目**：
- [FB-11-EN-B-002 如何在 Monorepo 中统一 TypeScript 配置](#FB-11-EN-B-002)
- [FB-11-CO-B-008 Monorepo 中 root package.json 的作用是什么](#FB-11-CO-B-008)

**参考资源**：
- [ESLint Shareable Configs](https://eslint.org/docs/latest/extend/shareable-configs)
- [Prettier Sharing Configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations)

**口头回答版**：
可以建 `@scope/eslint-config` 和 `@scope/prettier-config` 两个内部包，里面分 base、react、node 等配置。子包通过 `extends: ['@scope/eslint-config/react']` 继承，Prettier 通过 `prettier: '@scope/prettier-config'` 引用。共享配置包要声明 eslint 为 peerDependencies，子包用 `workspace:*` 引用。

---

### FB-11-CO-B-017：package.json 中的 packageManager 字段有什么用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：packageManager、corepack、包管理器版本、一致性
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `package.json` 中 `packageManager` 字段的作用，并说明为什么在 Monorepo 中推荐使用它。

**参考答案**：

`packageManager` 字段用于声明项目使用的包管理器及其精确版本，例如：

```json
{
  "packageManager": "pnpm@8.15.0"
}
```

作用：

1. **版本锁定**：所有开发者、CI 使用相同版本的包管理器，避免因为 pnpm 8 和 9 的 lockfile 格式差异导致的问题。
2. **Corepack 支持**：Node.js 16.10+ 的 Corepack 会读取该字段，自动下载并使用指定版本的包管理器。
3. **减少 onboarding 成本**：新成员无需手动安装特定版本。

Monorepo 中尤为重要：

- Monorepo 通常依赖 workspace 特性，不同版本的包管理器行为差异大。
- 统一 lockfile 格式和解析行为，减少“我本地可以”的问题。
- 配合 `.nvmrc` / `.node-version` 可进一步统一 Node.js 版本。

启用 Corepack：

```bash
corepack enable
corepack prepare pnpm@8.15.0 --activate
```

**评分维度**：
- 说清 packageManager 作用（50%）
- 提到 Corepack 和版本锁定（30%）
- 说明 Monorepo 中的价值（20%）

**常见错误**：
- 只写 `"packageManager": "pnpm"` 而不指定版本
- 认为该字段只对 npm 有效
- 开了 Corepack 但团队没有统一启用

**延伸追问**：
- 如果 CI 没有 Corepack，如何确保使用正确的 pnpm 版本？
- `packageManager` 字段和 `engines.packageManager` 有什么区别？

**相关题目**：
- [FB-11-EN-B-001 如何初始化一个最小的 pnpm workspace Monorepo](#FB-11-EN-B-001)
- [FB-11-EN-A-009 如何处理 Monorepo 中不同子包的 Node.js 版本要求](#FB-11-EN-A-009)

**参考资源**：
- [Corepack](https://nodejs.org/api/corepack.html)

**口头回答版**：
`packageManager` 字段用来锁定项目用的包管理器和版本，比如 `"pnpm@8.15.0"`。Node.js 的 Corepack 会读取它自动下载对应版本。Monorepo 里特别重要，因为不同版本的 pnpm 或 yarn 对 workspace 和 lockfile 的处理可能不一样，锁定后能减少很多环境不一致的问题。

---

### FB-11-EN-B-018：如何给 Monorepo 中的 internal package 添加测试？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：internal package、测试、vitest、jest、workspace
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请描述为 Monorepo 中的 internal package 设置单元测试的完整流程，包括依赖安装、脚本配置和跨包测试策略。

**参考答案**：

1. 选择测试框架并放在根目录或共享配置包

```json
// root package.json
{
  "devDependencies": {
    "vitest": "^1.0.0"
  }
}
```

2. 在 internal package 中配置测试

```text
packages/utils/
├── package.json
├── src/
│   └── add.ts
├── tests/
│   └── add.test.ts
└── vitest.config.ts
```

```json
// packages/utils/package.json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "vitest": "workspace:*"
  }
}
```

3. 根目录统一调用

```json
{
  "scripts": {
    "test": "pnpm -r run test",
    "test:filter": "pnpm --filter @scope/utils test"
  }
}
```

4. 跨包测试策略

- 优先测试包自身的 public API，不直接测试其他包的内部实现。
- 需要集成测试时，在 `apps/` 或专门的 `tests/` 目录写端到端测试。
- 使用 `workspace:*` 引用测试工具，避免版本漂移。

5. CI 配置

```yaml
- run: pnpm install
- run: pnpm test
```

**评分维度**：
- 测试框架和目录结构合理（40%）
- 能写出根目录和子包的脚本配置（30%）
- 提到跨包测试边界和 CI（30%）

**常见错误**：
- 每个子包单独安装不同版本的测试框架
- 测试放在 `src/` 里污染源码
- 直接测试依赖包的内部实现，导致重构时测试大量失败

**延伸追问**：
- 如果 `packages/utils` 被多个应用依赖，测试覆盖率应该怎么看？
- 如何只测试受影响的包？

**相关题目**：
- [FB-11-EN-B-003 如何给 Monorepo 添加一个新的 internal package](#FB-11-EN-B-003)
- [FB-11-EN-A-013 如何配置 Turborepo 的 remote cache](#FB-11-EN-A-013)

**参考资源**：
- [Vitest Workspace](https://vitest.dev/guide/workspace.html)

**口头回答版**：
可以在根目录统一装 vitest 或 jest，子包通过 `workspace:*` 引用。每个 internal package 有自己的 `tests/` 目录和 `package.json` 里的 `test` 脚本。根目录用 `pnpm -r run test` 统一跑。测试时只测本包 public API，跨包集成测试放到应用层或单独测试目录。

---

### FB-11-CO-B-019：Monorepo 中 workspace 子包的 bin 命令是如何被使用的？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：11 Monorepo
**标签**：bin、cli、workspace、package.json、内部工具
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 Monorepo 中某个子包声明了 `bin` 字段后，其他包或根目录如何调用这个 CLI 工具。

**参考答案**：

`package.json` 的 `bin` 字段可以把一个包注册为命令行工具：

```json
// packages/cli/package.json
{
  "name": "@scope/cli",
  "version": "1.0.0",
  "bin": {
    "my-cli": "./dist/index.js"
  }
}
```

使用方式：

1. **通过依赖关系自动链接**

如果其他子包依赖了 `@scope/cli`：

```json
{
  "devDependencies": {
    "@scope/cli": "workspace:*"
  }
}
```

执行 `pnpm install` 后，`my-cli` 会出现在该子包 `node_modules/.bin/` 中，可以直接运行：

```bash
pnpm my-cli
```

2. **在根目录调用**

根 `package.json` 依赖 `@scope/cli` 后，根目录 `node_modules/.bin/my-cli` 也可用：

```bash
my-cli
# 或
pnpm exec my-cli
```

3. **在 scripts 中使用**

```json
{
  "scripts": {
    "generate": "my-cli generate"
  }
}
```

注意事项：

- `bin` 指向的文件需要有 shebang `#!/usr/bin/env node` 并且可执行。
- 如果 `bin` 只有一个入口，可以直接写字符串：`"bin": "./dist/index.js"`。

**评分维度**：
- 说清 bin 字段作用（40%）
- 能说明 workspace 包如何被链接到 .bin（30%）
- 能写出调用方式（30%）

**常见错误**：
- bin 文件没有 shebang 或没有执行权限
- 以为 bin 命令需要全局安装才能用
- 在根目录没有依赖该 CLI 包却直接调用

**延伸追问**：
- 如果一个子包依赖了两个不同版本的同名 CLI 会怎样？
- 如何在开发时直接运行未构建的 CLI 源码？

**相关题目**：
- [FB-11-CO-B-004 Monorepo 中的 internal package 是什么](#FB-11-CO-B-004)
- [FB-11-CO-B-012 Monorepo 中如何运行单个包的脚本](#FB-11-CO-B-012)

**参考资源**：
- [npm package.json bin](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bin)

**口头回答版**：
子包在 `package.json` 里用 `bin` 字段注册一个命令名和对应的入口文件，比如 `"my-cli": "./dist/index.js"`。其他包依赖它之后，pnpm 会自动在 `node_modules/.bin` 里创建链接，直接跑 `pnpm my-cli` 就行。根目录如果也依赖了，可以直接在 scripts 里用。

---

### FB-11-CO-B-020：什么是 pnpm 的 workspace-concurrency？如何配置？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：pnpm、concurrency、workspace、性能、脚本执行
**出现频率**：低频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `workspace-concurrency` 的含义，并说明在 Monorepo 中如何调整它。

**参考答案**：

`workspace-concurrency` 是 pnpm 的一个配置，控制同时运行多少个 workspace 包的脚本。例如 `pnpm -r run build` 时会并发构建多个包。

默认值通常是 CPU 核心数或 4，取决于 pnpm 版本。

配置方式：

1. `.npmrc`

```ini
workspace-concurrency=4
```

2. 命令行

```bash
pnpm -r --workspace-concurrency=2 run build
```

3. 环境变量

```bash
PNPM_WORKSPACE_CONCURRENCY=2
```

使用场景：

- **降低并发**：CI 内存有限时，减少并发避免 OOM。
- **提高并发**：本地开发机性能好时，增加并发加快构建。
- **调试**：串行执行 `workspace-concurrency=1` 方便定位问题。

注意事项：

- 该配置只影响 workspace 脚本并发，不影响单个包内的任务。
- 任务依赖顺序仍由包管理器或构建工具（如 turbo）保证。

**评分维度**：
- 说清 workspace-concurrency 作用（50%）
- 能写出配置方式（30%）
- 能举例适用场景（20%）

**常见错误**：
- 把它和 Turborepo 的 concurrency 混淆
- 在内存不足时仍使用高并发导致 CI 失败
- 认为设置为 1 会跳过依赖顺序检查

**延伸追问**：
- `pnpm -r run build` 和 `turbo run build` 在并发控制上有什么区别？
- 如果 CI 经常 OOM，应该调大还是调小这个值？

**相关题目**：
- [FB-11-EN-A-011 pnpm 的 --filter 有哪些常见用法](#FB-11-EN-A-011)
- [FB-11-EN-P-003 如何设计 Monorepo 的 build caching 策略](#FB-11-EN-P-003)

**参考资源**：
- [pnpm workspace-concurrency](https://pnpm.io/npmrc#workspace-concurrency)

**口头回答版**：
`workspace-concurrency` 控制 pnpm 同时跑多少个 workspace 包的脚本。可以在 `.npmrc` 里配，也可以命令行加 `--workspace-concurrency`。CI 内存小就调小，本地性能好可以调大。它和 turbo 的并发不是一回事。

---

### FB-11-EN-B-021：changeset 文件的作用是什么？它的基本结构是怎样的？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：changesets、版本管理、发布流程、Monorepo
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Monorepo 中 changeset 文件的作用，并描述它的基本结构和生成流程。

**参考答案**：

Changeset 是 Changesets 工具用来记录每个包即将发生的变更、升级类型和描述信息的文件。它让版本发布变得可追踪、可 review。

基本结构：

```markdown
---
"@scope/ui": minor
"@scope/utils": patch
---

Added a new Button variant and fixed the formatDate edge case.
```

字段说明：

1. **frontmatter**：YAML 格式，列出受影响的包和版本升级类型（patch / minor / major）。
2. **描述正文**：变更说明，会进入 CHANGELOG。

生成流程：

1. 开发者修改代码后运行：

```bash
pnpm changeset
```

2. 按提示选择受影响的包和升级类型。
3. 生成 `.changeset/{random-name}.md`。
4. 提交该文件进入 PR review。
5. 发布时运行 `changeset version` 自动更新版本号和 CHANGELOG。
6. 运行 `changeset publish` 发布到 registry。

作用：

- 让每次版本变更都有明确记录。
- 支持独立版本模式（independent）和固定版本模式（fixed）。
- PR 中可以直观看到哪些包会升级。

**评分维度**：
- 说清 changeset 作用（40%）
- 能写出基本结构（30%）
- 能描述生成到发布的流程（30%）

**常见错误**：
- 忘记提交 `.changeset` 文件导致发布时漏升级
- 把所有变更都写成 patch，不使用 minor/major
- 描述写得过于简单，CHANGELOG 没有价值

**延伸追问**：
- 如果一次 PR 修改了 5 个包，应该生成一个还是多个 changeset？
- changeset 文件在 CI 中如何被消费？

**相关题目**：
- [FB-11-EN-A-005 changesets 的工作流程是什么](#FB-11-EN-A-005)
- [FB-11-EN-P-010 详细说明 changesets 的 fixed 与 independent 模式内部实现差异](#FB-11-EN-P-010)

**参考资源**：
- [Changesets 文档](https://github.com/changesets/changesets)

**口头回答版**：
changeset 文件记录每个包要做什么级别的版本升级和变更说明。结构是 frontmatter 列出包名和 patch/minor/major，下面是描述。开发完跑 `pnpm changeset` 生成，提交 PR review。发布时用 `changeset version` 更新版本和 CHANGELOG，再用 `changeset publish` 发布。

---

## 进阶题（续）

### FB-11-EN-A-014：如何使用 pnpm 的 overrides 和 hooks 治理依赖版本？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：pnpm、overrides、hooks、依赖治理、版本冲突
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明 pnpm 的 `overrides` 和 `pnpm.hooks` 分别能做什么，以及在 Monorepo 中如何使用它们治理依赖版本。

**参考答案**：

`overrides` 用于强制覆盖依赖树中某个包的版本，解决子依赖版本冲突或安全漏洞。

```json
// package.json
{
  "pnpm": {
    "overrides": {
      "lodash": "^4.17.21",
      "webpack@5": "^5.90.0"
    }
  }
}
```

`pnpm.hooks` 用于在依赖生命周期中注入自定义脚本，常见用途：

```json
{
  "pnpm": {
    "hooks": {
      "preinstall": "node scripts/check-node-version.js",
      "postinstall": "node scripts/postinstall.js"
    }
  }
}
```

Monorepo 治理场景：

1. **统一高危依赖版本**：某个间接依赖出现 CVE，用 overrides 强制升级到安全版本。
2. **消除重复版本**：多个子包依赖不同版本的 `react-router`，统一到一个版本。
3. **注入环境检查**：在 install 前检查 Node.js 版本或环境变量。
4. **补丁自动应用**：配合 `pnpm patch` 在 postinstall 后执行额外修复。

注意事项：

- `overrides` 会影响整个依赖树，使用前要评估兼容性。
- `hooks` 在 CI 中可能增加 install 时间，避免做太重的事。
- 应尽量通过正常升级解决版本问题，overrides 只是兜底手段。

**评分维度**：
- 区分 overrides 和 hooks 的作用（40%）
- 能写出配置示例（30%）
- 能说明 Monorepo 治理场景和注意事项（30%）

**常见错误**：
- 把 overrides 当常规版本管理手段滥用
- hooks 里执行耗时操作拖慢 CI
- 覆盖后没有跑全量测试验证兼容性

**延伸追问**：
- `overrides` 和 `resolutions`（yarn）有什么区别？
- 如果 overrides 导致某个包行为改变，如何快速回滚？

**相关题目**：
- [FB-11-EN-A-004 Monorepo 中如何管理内部包的版本号](#FB-11-EN-A-004)
- [FB-11-EN-P-011 pnpm 的 patch 机制在 Monorepo 中如何使用](#FB-11-EN-P-011)

**参考资源**：
- [pnpm overrides](https://pnpm.io/package_json#pnpmoverrides)
- [pnpm hooks](https://pnpm.io/pnpmfile)

**口头回答版**：
`pnpm.overrides` 用来强制覆盖依赖树里某个包的版本，比如统一 lodash 版本或修复安全漏洞。`pnpm.hooks` 是在 install 前后注入脚本，比如检查 Node 版本或自动打补丁。Overrides 是兜底手段，用多了要评估兼容性；hooks 里别做太重的事，会拖慢 CI。

---

### FB-11-EN-A-015：如何配置 Turborepo generator 来创建新包？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：Turborepo、generator、脚手架、内部包、模板
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明 Turborepo generator 的作用，并描述如何配置一个用于创建新 internal package 的 generator。

**参考答案**：

Turborepo generator 是 Turborepo 提供的脚手架功能，允许通过模板快速创建新包或文件，保持 Monorepo 结构一致。

配置步骤：

1. 安装 generator 依赖

```bash
pnpm add -D @turbo/gen
```

2. 创建 generator 目录

```text
turbo/
├── generators/
│   └── package/
│       ├── config.ts
       └── templates/
           ├── package.json.hbs
           ├── tsconfig.json.hbs
           └── src/
               └── index.ts.hbs
```

3. 编写 `turbo/generators/package/config.ts`

```ts
import { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('package', {
    description: 'Create a new internal package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name (without @scope/):'
      },
      {
        type: 'list',
        name: 'type',
        message: 'Package type:',
        choices: ['utils', 'react', 'node']
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/&#123;&#123;name&#125;&#125;/package.json',
        templateFile: 'turbo/generators/package/templates/package.json.hbs'
      },
      {
        type: 'add',
        path: 'packages/&#123;&#123;name&#125;&#125;/tsconfig.json',
        templateFile: 'turbo/generators/package/templates/tsconfig.json.hbs'
      },
      {
        type: 'add',
        path: 'packages/&#123;&#123;name&#125;&#125;/src/index.ts',
        templateFile: 'turbo/generators/package/templates/src/index.ts.hbs'
      }
    ]
  });
}
```

4. 模板文件示例 `package.json.hbs`

```json
{
  "name": "@scope/&#123;&#123;name&#125;&#125;",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest run"
  },
  "devDependencies": {
    "typescript": "workspace:*"
  }
}
```

5. 执行生成

```bash
pnpm turbo gen package
```

**评分维度**：
- 说清 generator 价值（30%）
- 能写出配置结构（40%）
- 提到模板变量和标准化收益（30%）

**常见错误**：
- 模板文件里没有用 `private: true` 导致误发布
- 模板写死包名或版本，无法复用
- generator 和 custom codemod 混淆

**延伸追问**：
- generator 创建包后，还需要哪些手动步骤？
- 如何让 generator 自动注册新包到 pnpm-workspace.yaml？

**相关题目**：
- [FB-11-EN-B-003 如何给 Monorepo 添加一个新的 internal package](#FB-11-EN-B-003)
- [FB-11-EN-A-006 如何配置 Turborepo 的 pipeline](#FB-11-EN-A-006)

**参考资源**：
- [Turborepo Generators](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation)

**口头回答版**：
Turborepo generator 是用来快速生成新包或文件的脚手架。配置时在 `turbo/generators/` 下写 config.ts，定义 prompts 和 actions，用 Handlebars 模板生成 package.json、tsconfig.json、src/index.ts 等。这样可以保证每个新 internal package 结构一致。跑 `pnpm turbo gen package` 就能交互式创建。

---

### FB-11-SC-A-016：设计一个 Monorepo 下共享 icons / assets 资源包的管理方案。

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：icons、assets、资源包、tree-shaking、Monorepo
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请为 Monorepo 设计一个共享 icons 和 assets 资源包的管理方案，要求支持按需加载、避免全量引入，并方便多个应用复用。

**参考答案**：

设计方案：

1. 目录结构

```text
packages/assets/
├── package.json
├── src/
│   ├── icons/
│   │   ├── index.ts
│   │   ├── ArrowRight.tsx
│   │   └── Home.tsx
│   ├── images/
│   │   ├── index.ts
│   │   └── logo.svg
│   └── styles/
│       ├── index.ts
│       └── tokens.css
```

2. `package.json` 配置

```json
{
  "name": "@scope/assets",
  "version": "1.0.0",
  "sideEffects": ["*.css", "*.scss"],
  "exports": {
    "./icons/*": {
      "types": "./dist/icons/*.d.ts",
      "import": "./dist/icons/*.js"
    },
    "./images/*": "./dist/images/*",
    "./styles/*": "./dist/styles/*"
  }
}
```

3. 按需引入

```tsx
import { ArrowRight } from '@scope/assets/icons';
import logo from '@scope/assets/images/logo.svg';
import '@scope/assets/styles/tokens.css';
```

4. 构建优化

- 使用 SVG 组件化工具（如 SVGR）生成 React 组件。
- 配置 `sideEffects` 让打包工具正确 tree-shake。
- 使用 subpath exports 支持深路径导入，避免全量加载。

5. 版本与发布

- icons 变更频繁时，使用 independent 模式单独发版。
- 破坏性变更（如删除图标）需走 changeset major 并通知消费方。
- CI 中生成图标预览站点或 Storybook。

**评分维度**：
- 目录和导出设计合理（30%）
- 支持按需加载与 tree-shaking（30%）
- 考虑版本治理和消费体验（20%）
- 提到构建和预览工具（20%）

**常见错误**：
- 把所有图标打包成一个巨大文件
- 没有配置 sideEffects 导致样式被 tree-shake 掉
- 用相对路径引用资源，破坏包边界

**延伸追问**：
- 如果 icons 数量达到几千个，如何优化构建和加载？
- 如何确保设计师更新图标后自动同步到代码仓库？

**相关题目**：
- [FB-11-CO-B-007 Monorepo 中常见的代码共享方式有哪些](#FB-11-CO-B-007)
- [FB-11-SC-A-001 设计一个 Monorepo 下组件库的发布流程](#FB-11-SC-A-001)

**参考资源**：
- [SVGR](https://react-svgr.com/)
- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

**口头回答版**：
可以建一个 `@scope/assets` 内部包，里面分 icons、images、styles。icons 用 SVGR 转成 React 组件，package.json 配置 `sideEffects` 和 subpath exports，让消费方可以 `import { ArrowRight } from '@scope/assets/icons'` 按需引入。不要用相对路径引用。icons 变更频繁可以单独发版，CI 里生成 Storybook 预览。

---

### FB-11-EN-A-017：如何处理 Monorepo 中不同子包依赖不同框架版本的问题？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：版本冲突、React、Vue、框架版本、workspace
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
Monorepo 中 `apps/legacy` 需要 React 17，而 `apps/modern` 需要 React 18。请给出几种可行的处理方案及各自的 trade-off。

**参考答案**：

可行方案：

1. **在子包本地安装不同版本（pnpm 默认隔离）**

```json
// apps/legacy/package.json
{
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

```json
// apps/modern/package.json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

pnpm 的严格隔离会让两个版本分别存在于各自 `node_modules`，互不影响。

优点：实现简单。
缺点：磁盘占用增加；共享组件库如果声明 React 为 peer，需要同时兼容两个版本。

2. **拆分子仓库或独立 workspace**

把 legacy 应用迁出当前 Monorepo，或用单独的 pnpm workspace 管理。

优点：彻底隔离，避免版本冲突扩散。
缺点：增加跨仓库协作和代码共享成本。

3. **使用 nohoist（yarn）或 pnpm 的 public-hoist-pattern**

对必须提升到根目录的包做精确控制，但 pnpm 通常不需要 hoist。

4. **抽象共享组件为框架无关包**

把可复用逻辑抽到 `@scope/utils`，UI 层则分别在 legacy 和 modern 中维护，或组件库同时支持 React 17/18。

最佳实践：

- 优先用 pnpm 的默认隔离机制。
- 共享 UI 包声明 `peerDependencies` 兼容范围。
- 如果差异长期存在，考虑把 legacy 应用拆分出去。

**评分维度**：
- 能给出 3 种以上方案（40%）
- 分析各方案 trade-off（30%）
- 提到 peerDependencies 和组件库兼容（30%）

**常见错误**：
- 强制在根目录统一 React 版本
- 认为 Monorepo 必须所有包用同一版本
- 共享组件库把 React 写成 dependencies 导致多实例

**延伸追问**：
- 如果共享组件库要同时支持 React 17 和 18，测试矩阵怎么设计？
- 长期维护两个版本，最终如何收敛？

**相关题目**：
- [FB-11-CO-B-013 什么是 peer dependencies](#FB-11-CO-B-013)
- [FB-11-CO-B-011 什么是 workspace 的 nohoist 配置](#FB-11-CO-B-011)

**参考资源**：
- [pnpm peer dependencies](https://pnpm.io/how-peers-are-resolved)

**口头回答版**：
最常用的是利用 pnpm 的依赖隔离，让两个子包各自安装 React 17 和 18。共享组件库把 React 声明为 peerDependencies 并兼容两个版本。如果差异长期化，可以考虑把 legacy 应用拆分出去。不要强制根目录统一版本，也不要把 React 写到组件库的 dependencies 里。

---

### FB-11-EN-A-018：如何在 Monorepo 中做包体积分析？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：bundle size、包体积、分析、Monorepo、性能
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请描述在 Monorepo 中如何分析各子包和应用的产物体积，并建立体积增长的监控机制。

**参考答案**：

1. 单个应用分析

使用常见工具：

```bash
# webpack
cd apps/web
pnpm analyze
# 依赖 webpack-bundle-analyzer
```

```json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

2. 内部包体积分析

对 `packages/ui` 等库使用 rollup-plugin-visualizer 或 size-limit：

```json
// packages/ui/package.json
{
  "scripts": {
    "size": "size-limit"
  },
  "size-limit": [
    {
      "path": "dist/index.js",
      "limit": "100 kB"
    }
  ]
}
```

3. 根目录统一脚本

```json
{
  "scripts": {
    "size": "pnpm -r run size"
  }
}
```

4. 监控机制

- CI 中运行 `size-limit --why` 或 `bundlesize`。
- 在 PR 中显示体积变化报告（如 `size-limit` GitHub Action）。
- 建立基线，超过阈值自动阻止合并。
- 使用 `turbo run build` 的 outputs 配合 artifact 上传，便于对比。

5. 分析重点

- 检查是否重复引入同一库的多版本。
- 检查内部包是否全量导出导致 tree-shaking 失效。
- 检查大体积依赖是否可以替换或懒加载。

**评分维度**：
- 工具选择合理（30%）
- 能写出配置和脚本（30%）
- 监控机制和阈值设计（25%）
- 能指出常见体积问题（15%）

**常见错误**：
- 只分析应用不分析内部包
- size-limit 配置的路径和实际产物不匹配
- 没有基线对比，只看绝对体积

**延伸追问**：
- 如果某个内部包被多个应用引用，如何分配体积预算？
- 如何在 PR 里自动展示体积变化？

**相关题目**：
- [FB-11-EN-A-010 如何检测和清理 Monorepo 中的未使用依赖](#FB-11-EN-A-010)
- [FB-11-EN-P-003 如何设计 Monorepo 的 build caching 策略](#FB-11-EN-P-003)

**参考资源**：
- [size-limit](https://github.com/ai/size-limit)
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

**口头回答版**：
可以用 webpack-bundle-analyzer 分析应用，用 size-limit 分析内部包。在子包 package.json 里配 size-limit 脚本和阈值，根目录用 `pnpm -r run size` 统一跑。CI 里用 size-limit 的 GitHub Action 在 PR 里展示体积变化，超过阈值就阻止合并。重点看重复依赖、tree-shaking 是否生效、大依赖能否懒加载。

---

### FB-11-EN-A-019：如何配置 GitHub Actions 只跑 affected 的任务？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：GitHub Actions、CI、affected、Turborepo、Nx
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
在 Monorepo 中，全量跑测试和构建很慢。请说明如何配置 GitHub Actions，只运行受当前 PR 影响的包的任务。

**参考答案**：

方案一：Turborepo + `--filter`

```yaml
name: CI
on: [pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v2
      - name: Build affected
        run: pnpm turbo run build test lint --affected
```

Turbo 1.10+ 支持 `--affected`，自动对比 base branch 找出变更包及其依赖。

方案二：Nx affected

```bash
pnpm nx affected -t build test --base=origin/main --head=HEAD
```

方案三：手动计算变更包

```bash
# 获取变更文件
CHANGED=$(git diff --name-only origin/main...HEAD)
# 根据变更目录推断包
pnpm --filter [...packages] run test
```

关键配置：

1. `fetch-depth: 0` 保证有完整 git 历史。
2. 设置正确的 base branch（如 `origin/main`）。
3. 缓存 install 和 build cache（如 turbo remote cache 或 GitHub Actions cache）。
4. 对共享配置包的变更，可能需要全量跑或扩大 affected 范围。

**评分维度**：
- 能使用 turbo/nx affected（40%）
- 知道 fetch-depth 和 base branch 配置（30%）
- 提到缓存和共享配置包的特殊处理（30%）

**常见错误**：
- 没有 fetch-depth: 0 导致 affected 计算错误
- 只根据文件目录过滤，没考虑依赖传递
- 共享配置包改动时没有触发全量检查

**延伸追问**：
- 如果修改了根目录的 turbo.json，哪些包应该被纳入 affected？
- 如何保证 affected 模式下不会漏测？

**相关题目**：
- [FB-11-EN-A-006 如何配置 Turborepo 的 pipeline](#FB-11-EN-A-006)
- [FB-11-EN-P-002 Nx 的 affected 命令原理是什么](#FB-11-EN-P-002)

**参考资源**：
- [Turborepo affected](https://turbo.build/repo/docs/core-concepts/monorepos/filtering-workspaces#using---affected)

**口头回答版**：
可以用 Turborepo 的 `--affected` 或 Nx 的 `nx affected`，它们会根据当前 PR 对比 base branch 自动找出变更的包和依赖它们的包。GitHub Actions 里要配 `fetch-depth: 0` 拿到完整 git 历史，设置好 base branch。注意如果改了根目录的共享配置，可能需要扩大 affected 范围或全量跑。

---

### FB-11-CP-A-020：如何看待 Monorepo 中工具链日益碎片化的问题？

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：工具链、碎片化、治理、Monorepo、决策
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
随着 Monorepo 规模扩大，可能出现 pnpm、Turborepo、Nx、changesets、size-limit、Manypkg 等多种工具混用的情况。请谈谈你对这种碎片化的看法，以及如何治理。

**参考答案**：

观点：

1. **碎片化是规模化的自然结果**
   - 不同团队有不同偏好。
   - 不同工具解决不同问题：构建编排、版本发布、依赖治理、文档。

2. **过度碎片化会带来成本**
   - 学习曲线增加，新成员上手慢。
   - 配置分散，难以统一升级。
   - 工具间集成复杂，容易形成“胶水代码”。

3. **治理策略**
   - **统一核心工具链**：选定 1-2 个构建编排工具（如 Turborepo 或 Nx），减少并列方案。
   - **明确工具职责边界**：什么场景用什么工具，写入 RFC 或 handbook。
   - **建立工具引入流程**：新增工具需经过技术评审，评估维护成本。
   - **定期审查和下线**：移除使用率低的工具或脚本。
   - **封装内部 CLI**：把常用操作封装成 `@scope/cli`，屏蔽底层工具差异。

4. **取舍原则**
   - 不要追求单一工具解决所有问题。
   - 优先选择社区活跃、文档完善、团队熟悉的工具。
   - 在创新和稳定之间取得平衡。

**评分维度**：
- 能客观分析碎片化成因（30%）
- 能指出过度碎片化的危害（25%）
- 提出具体治理策略（30%）
- 有取舍原则和决策框架（15%）

**常见错误**：
- 一味抵制新工具，墨守成规
- 盲目追新，每个问题都引入新工具
- 没有文档化工具选择和职责边界

**延伸追问**：
- 如果两个团队分别坚持使用 Turborepo 和 Nx，你会怎么决策？
- 如何衡量一个工具是否值得引入？

**相关题目**：
- [FB-11-CP-R-001 比较各家 Monorepo 工具适用场景](#FB-11-CP-R-001)
- [FB-11-EN-P-001 Turborepo 和 Nx 的核心差异是什么](#FB-11-EN-P-001)

**参考资源**：
- [Monorepo.tools](https://monorepo.tools/)

**口头回答版**：
Monorepo 工具链碎片化是规模化的正常现象，但过度碎片化会增加学习和维护成本。治理上应该统一核心工具，比如只用一个构建编排工具；明确每个工具的适用场景；新增工具要走评审；定期下线没人用的工具。还可以封装一个内部 CLI，把常用命令统一起来，屏蔽底层差异。

---

### FB-11-EN-A-021：如何在 Monorepo 中统一管理 secrets 和敏感配置？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：secrets、环境变量、安全、Monorepo、CI
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请设计一个 Monorepo 下 secrets 和敏感配置的管理方案，兼顾本地开发、多环境部署和 CI 安全。

**参考答案**：

方案：

1. **本地开发**

- 使用 `.env` 文件，但不提交到仓库。
- 提供 `.env.example` 作为模板。
- 使用 `dotenv-cli` 或框架内置 env 加载。

```text
apps/web/
├── .env.local
├── .env.development
├── .env.production
└── .env.example
```

2. **共享配置**

- 非敏感配置放在 `packages/config` 或 `turbo.json#env` 中共享。
- 敏感配置绝不进入代码仓库。

3. **CI / 生产环境**

- 使用 GitHub Actions Secrets、GitLab CI Variables、Vault、AWS Secrets Manager 等。
- 在 CI 中注入环境变量，不写入文件。

```yaml
- name: Build
  env:
    API_KEY: $&#123;&#123; secrets.API_KEY &#125;&#125;
  run: pnpm build
```

4. **按环境隔离**

- 使用 `NODE_ENV` 或自定义 `APP_ENV` 区分 development / staging / production。
- 子包通过 `process.env.APP_ENV` 读取不同配置。

5. **审计和轮换**

- 定期轮换 secrets。
- 使用工具扫描仓库防止误提交（如 `git-secrets`、`truffleHog`）。
- 限制 secrets 的访问范围，按应用按需分配。

**评分维度**：
- 本地、CI、生产分层管理（40%）
- 安全原则（不提交 secrets）（30%）
- 环境隔离和审计机制（30%）

**常见错误**：
- 把真实 secrets 提交到 `.env` 文件
- 所有应用共享同一套 secrets，权限过宽
- 在日志或错误报告中打印 secrets

**延伸追问**：
- 如果某个 secret 被意外提交到 git 历史，应该怎么处理？
- 如何确保子包只能访问自己需要的 secrets？

**相关题目**：
- [FB-11-EN-A-012 如何在 Monorepo 中统一管理环境变量](#FB-11-EN-A-012)
- [FB-11-SD-R-008 如何设计 Monorepo 的依赖治理与自动化审计体系](#FB-11-SD-R-008)

**参考资源**：
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [HashiCorp Vault](https://www.vaultproject.io/)

**口头回答版**：
敏感配置绝不能进仓库。本地用 `.env.local` 配 `.env.example` 模板，但不提交。CI 和生产用 GitHub Secrets 或 Vault 注入。非敏感配置可以放到共享配置包。按环境用 `APP_ENV` 区分，定期轮换 secrets，并用扫描工具防止误提交。

---

### FB-11-SC-A-022：设计一个 Monorepo 下共享设计 tokens 和主题包的管理方案。

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：11 Monorepo
**标签**：design tokens、主题、CSS、Monorepo、设计系统
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请为 Monorepo 设计一个共享 design tokens 和主题包，支持多品牌、多平台（Web / Mobile / 小程序）复用。

**参考答案**：

设计方案：

1. 目录结构

```text
packages/design-tokens/
├── package.json
├── tokens/
│   ├── color.json
│   ├── spacing.json
│   ├── typography.json
│   └── border.json
├── themes/
│   ├── brand-a.json
│   └── brand-b.json
├── scripts/
│   └── build.js
└── dist/
    ├── variables.css
    ├── variables.scss
    ├── tokens.js
    └── tokens.json
```

2. Token 格式

使用 W3C Design Tokens 格式或自定义 JSON：

```json
{
  "color": {
    "primary": {
      "500": { "value": "#1677ff", "type": "color" }
    }
  }
}
```

3. 构建输出

- 使用 Style Dictionary 或 Token Studio 生成 CSS、SCSS、JS、JSON。
- 输出多个平台格式：Web CSS、React Native JS、小程序 CSS。

4. 主题切换

```css
:root {
  --color-primary-500: #1677ff;
}

[data-theme='brand-b'] {
  --color-primary-500: #722ed1;
}
```

5. 消费方式

```ts
import { tokens } from '@scope/design-tokens';
import '@scope/design-tokens/dist/variables.css';
```

6. 版本和治理

- tokens 变更需设计团队 review。
- 破坏性 token 变更走 major 版本。
- CI 中生成 token 预览和对比报告。

**评分维度**：
- Token 结构和格式设计（30%）
- 多平台输出能力（25%）
- 主题切换和消费体验（25%）
- 版本治理流程（20%）

**常见错误**：
- Token 和组件样式混在一起
- 只输出一种格式，无法服务多平台
- 主题切换依赖 JS 运行时计算，首屏闪烁

**延伸追问**：
- 如何确保设计师的 Figma 变量和代码 tokens 同步？
- 如果某个品牌要新增一种主题，改动成本有多大？

**相关题目**：
- [FB-11-SC-A-016 设计一个 Monorepo 下共享 icons / assets 资源包的管理方案](#FB-11-SC-A-016)
- [FB-11-SC-A-002 设计一个 Monorepo 下共享 hooks 包的管理方案](#FB-11-SC-A-002)

**参考资源**：
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [W3C Design Tokens](https://design-tokens.github.io/community-group/)

**口头回答版**：
可以建一个 `@scope/design-tokens` 包，用 JSON 定义 color、spacing、typography 等 token，再用 Style Dictionary 生成 CSS、SCSS、JS、JSON 等多种格式。主题通过 CSS 变量和 `data-theme` 切换。消费方既可以用 JS 对象也可以用 CSS 变量。Token 变更要设计团队 review，破坏性变更走 major。

---

## 深入题（续）

### FB-11-EN-P-014：如何实现自定义 Turborepo remote cache backend？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：Turborepo、remote cache、缓存、backend、Monorepo
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明 Turborepo remote cache 的基本原理，并描述如何实现一个自定义的 remote cache backend（例如基于公司内部对象存储）。

**参考答案**：

Turborepo remote cache 原理：

1. 每个任务（task）根据输入（源码、依赖、env）计算 hash。
2. 如果 hash 对应的产物已存在缓存，则直接下载而不是重新执行。
3. 缓存以 artifact 形式存储，通常为 tar 包。

自定义 backend 方案：

1. 实现 Remote Cache API

Turborepo 支持通过 `--api`、`--token`、`--team` 配置自定义 remote cache 服务端。需实现以下端点：

- `GET /v8/artifacts/{hash}`：下载产物。
- `PUT /v8/artifacts/{hash}`：上传产物。
- `GET /v8/artifacts/{hash}/exists`：检查缓存是否存在。

2. 服务端示例（Node.js + S3）

```ts
import express from 'express';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const app = express();
const s3 = new S3Client({ region: 'us-east-1' });
const BUCKET = 'turbo-cache';

app.get('/v8/artifacts/:hash', async (req, res) => {
  const { hash } = req.params;
  const data = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: hash }));
  data.Body?.pipe(res);
});

app.put('/v8/artifacts/:hash', express.raw({ type: '*/*', limit: '100mb' }), async (req, res) => {
  const { hash } = req.params;
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: hash, Body: req.body }));
  res.status(204).send();
});
```

3. 客户端配置

```json
{
  "turbo": {
    "remoteCache": {
      "apiUrl": "https://turbo-cache.company.com",
      "teamId": "my-team",
      "signature": true
    }
  }
}
```

4. 安全考虑

- 使用签名验证防止缓存投毒。
- 按 team / project 隔离缓存。
- 设置缓存 TTL 和清理策略。

**评分维度**：
- 说清 remote cache 基本原理（30%）
- 能描述所需 API 端点（30%）
- 能给出服务端实现思路（25%）
- 提到安全和隔离（15%）

**常见错误**：
- 忽略缓存签名导致安全风险
- 没有处理缓存淘汰和存储成本
- 把 remote cache 当成通用 artifact 仓库使用

**延伸追问**：
- 如何防止不同分支的缓存互相污染？
- 缓存命中率低时应该从哪些方面优化？

**相关题目**：
- [FB-11-EN-A-013 如何配置 Turborepo 的 remote cache](#FB-11-EN-A-013)
- [FB-11-EN-P-003 如何设计 Monorepo 的 build caching 策略](#FB-11-EN-P-003)

**参考资源**：
- [Turborepo Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Turborepo Custom Remote Cache](https://turbo.build/repo/docs/core-concepts/remote-caching#custom-remote-caches)

**口头回答版**：
Turborepo 的 remote cache 是根据任务输入算 hash，命中就直接下载产物。自定义 backend 要实现 GET/PUT artifact 和 exists 接口，可以基于 S3 或公司内部存储。服务端要做好签名验证、按 team 隔离、缓存淘汰。客户端通过 turbo.json 的 remoteCache 配置指向自定义服务。

---

### FB-11-EN-P-015：深入解析 pnpm 的 dedupe 机制。

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：pnpm、dedupe、依赖去重、lockfile、Monorepo
**出现频率**：低频
**预计回答时长**：5-10 分钟

**题目描述**：
请解释 pnpm 的 `dedupe` 机制，包括 `pnpm dedupe` 和 `pnpm install --fix-lockfile` 的区别，以及它如何解决依赖重复问题。

**参考答案**：

依赖重复问题：

Monorepo 中多个子包可能依赖同一库的不同版本，导致 lockfile 膨胀、产物变大。`dedupe` 用于在兼容范围内尽量合并版本。

`pnpm dedupe`：

- 扫描 lockfile，尝试把可以合并的依赖版本提升到同一个版本。
- 只修改 lockfile，不会重新安装所有包。
- 示例：

```bash
pnpm dedupe
pnpm dedupe lodash@^4.17.21
```

`pnpm install --fix-lockfile`：

- 重新解析并修复 lockfile 中的不一致。
- 会实际执行安装，范围比 dedupe 广。

`dedupe-peer-dependents`：

pnpm 7.23+ 支持自动去重 peer dependents，减少因 peer dependencies 导致的版本分裂。

配置方式：

```json
// package.json
{
  "pnpm": {
    "dedupe-peer-dependents": true
  }
}
```

使用建议：

- 定期运行 `pnpm dedupe` 清理 lockfile。
- 在 CI 中检查 lockfile 是否是最优去重状态。
- 注意 dedupe 可能引入行为变化，需要全量测试。

**评分维度**：
- 说清 dedupe 目的和机制（40%）
- 区分 dedupe 和 fix-lockfile（30%）
- 提到 peer dependents 去重和 CI 实践（30%）

**常见错误**：
- 认为 dedupe 会改变 package.json 中的声明版本
- dedupe 后不跑测试直接提交
- 和 `pnpm prune` 混淆

**延伸追问**：
- dedupe 后如果某个子包行为异常，如何快速定位是哪个依赖版本变化导致的？
- `dedupe-peer-dependents` 和 `auto-install-peers` 有什么关系？

**相关题目**：
- [FB-11-EN-A-002 pnpm 的依赖管理机制与 npm / yarn 有何不同](#FB-11-EN-A-002)
- [FB-11-EN-P-012 如何分析 Monorepo 中的依赖图并优化构建顺序](#FB-11-EN-P-012)

**参考资源**：
- [pnpm dedupe](https://pnpm.io/cli/dedupe)

**口头回答版**：
`pnpm dedupe` 会在兼容范围内合并 lockfile 里重复的依赖版本，减少产物体积。它只改 lockfile，不会重新安装所有东西。`pnpm install --fix-lockfile` 范围更广，会重新解析安装。pnpm 还支持 `dedupe-peer-dependents` 自动去重 peer 依赖的宿主版本。dedupe 后要跑全量测试，因为版本合并可能带来行为变化。

---

### FB-11-SC-P-016：如何设计和执行 Monorepo 的包拆分或重构？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：重构、包拆分、依赖治理、Monorepo、迁移
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
当 Monorepo 中某个包变得过于臃肿或职责混杂时，需要对其进行拆分。请设计一套安全的拆分和重构流程。

**参考答案**：

流程设计：

1. **现状分析**
   - 使用 dependency cruiser、Nx graph 或 `pnpm why` 分析包的依赖关系。
   - 识别出内聚模块和跨模块引用。

2. **目标结构定义**
   - 按职责拆分，例如 `packages/utils` → `packages/date-utils`、`packages/string-utils`、`packages/validation`。
   - 明确新包的 public API。

3. **渐进式拆分**
   - 步骤一：创建新包并迁移代码。
   - 步骤二：在原包中重新导出（re-export）新包 API，保持兼容。
   - 步骤三：逐步让消费方迁移到新包。
   - 步骤四：移除原包中的 re-export，发布 major 版本或废弃。

```ts
// packages/utils/index.ts (过渡阶段)
export * from '@scope/date-utils';
export * from '@scope/string-utils';
```

4. **CI 和测试保障**
   - 拆分前后跑全量测试。
   - 使用类型检查确保没有破坏 public API。
   - 检查 bundle size 变化。

5. **文档和沟通**
   - 写 RFC 说明拆分原因和迁移计划。
   - 更新内部文档和示例代码。
   - 通知受影响的团队。

6. **工具辅助**
   - 使用 codemod 批量替换导入路径。
   - 使用 changeset 记录破坏性变更。

**评分维度**：
- 拆分前的分析能力（25%）
- 渐进式迁移策略（30%）
- 兼容性和过渡方案（25%）
- 文档、沟通和工具辅助（20%）

**常见错误**：
- 直接删除旧包，导致所有消费方同时失败
- 拆分粒度太细，产生过多 micro-packages
- 没有 re-export 过渡期，强迫一次性迁移

**延伸追问**：
- 如何判断一个包是否需要拆分？有哪些指标？
- 拆分后原包的版本号应该怎么处理？

**相关题目**：
- [FB-11-EN-P-012 如何分析 Monorepo 中的依赖图并优化构建顺序](#FB-11-EN-P-012)
- [FB-11-SD-R-006 如何设计 Monorepo 下的渐进式迁移与拆分策略](#FB-11-SD-R-006)

**参考资源**：
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser)

**口头回答版**：
包拆分前先分析依赖图，找出内聚模块。然后按职责拆成新包，在原包里 re-export 新包 API 保持兼容。让消费方逐步迁移后再移除旧 API。整个过程要写 RFC、跑全量测试和类型检查，用 codemod 批量改导入路径，用 changeset 记录破坏性变更。

---

### FB-11-EN-P-017：如何自己实现一个 affected 检测机制？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：affected、git、依赖图、Monorepo、CI
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
如果不使用 Turborepo 或 Nx，请描述如何基于 git 和 package.json 依赖关系自己实现一个 affected 检测脚本。

**参考答案**：

实现思路：

1. 获取变更文件

```bash
git diff --name-only origin/main...HEAD
```

2. 建立包到目录的映射

读取 `pnpm-workspace.yaml` 或 `package.json#workspaces`，得到所有子包及其目录。

```js
const workspaces = ['packages/*', 'apps/*'];
// 解析 glob 得到每个包的目录和 package.json
```

3. 建立依赖图

读取每个子包的 `dependencies` / `devDependencies`，筛选出 workspace 内部依赖，构建 DAG。

```js
const graph = {
  '@scope/web': ['@scope/ui', '@scope/utils'],
  '@scope/admin': ['@scope/ui'],
  '@scope/ui': ['@scope/utils'],
  '@scope/utils': []
};
```

4. 计算受影响包

- 遍历变更文件，找到所在包。
- 从该包出发，沿依赖图反向传播，找到所有依赖它的包。

```js
function getAffected(graph, changedPackages) {
  const affected = new Set(changedPackages);
  const reverseGraph = buildReverseGraph(graph);
  const queue = [...changedPackages];
  while (queue.length) {
    const pkg = queue.shift();
    for (const consumer of reverseGraph[pkg] || []) {
      if (!affected.has(consumer)) {
        affected.add(consumer);
        queue.push(consumer);
      }
    }
  }
  return [...affected];
}
```

5. 触发对应任务

```bash
pnpm --filter @scope/web --filter @scope/admin run test
```

6. 边界处理

- 根目录配置文件（如 turbo.json、tsconfig.json）变更时，触发全量。
- 忽略 docs、.github 等非代码目录的变更。
- 处理循环依赖和重复包名。

**评分维度**：
- 能获取 git 变更文件（20%）
- 能构建包依赖图（30%）
- 能反向传播计算 affected（30%）
- 边界处理和输出任务（20%）

**常见错误**：
- 只根据文件目录过滤，没考虑依赖传递
- 没有处理根配置变更导致的全量重建
- 忽略 peerDependencies 和 workspace 软链接

**延伸追问**：
- 如何处理跨包引用但没有在 package.json 中声明的情况？
- 如果依赖图有环，你的算法会怎样？

**相关题目**：
- [FB-11-EN-A-019 如何配置 GitHub Actions 只跑 affected 的任务](#FB-11-EN-A-019)
- [FB-11-EN-P-002 Nx 的 affected 命令原理是什么](#FB-11-EN-P-002)

**参考资源**：
- [Nx Affected](https://nx.dev/features/run-tasks-using-affected)

**口头回答版**：
自己实现 affected 检测，首先要用 `git diff` 拿到变更文件，然后解析 workspace 配置得到每个包的目录，再读 package.json 构建依赖图。从变更的包出发，反向找所有依赖它的包，这些包就是 affected。根目录配置变了可以触发全量。最后用 pnpm filter 或自定义脚本跑这些包的任务。

---

### FB-11-EN-P-018：大型 Monorepo 如何优化 Git 性能？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：git、性能、Monorepo、large repo、sparse checkout
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
随着 Monorepo 规模增长，git clone、checkout、status 等操作变慢。请给出几种优化 Git 性能的工程方案。

**参考答案**：

优化方案：

1. **Partial Clone（部分克隆）**

```bash
git clone --filter=blob:none <repo>
```

只克隆当前需要的文件 blob，历史大文件按需拉取。

2. **Sparse Checkout（稀疏检出）**

```bash
git sparse-checkout init --cone
git sparse-checkout set apps/web packages/ui
```

只检出工作目录中需要的子集，减少文件数量和 I/O。

3. **Git LFS 管理大文件**

把二进制资源、设计稿、视频等大文件放到 Git LFS，避免它们进入 git 历史。

4. **Shallow Clone（浅克隆）**

CI 中不需要完整历史时：

```bash
git clone --depth=1 <repo>
```

注意 shallow clone 可能影响 affected 计算。

5. **定期垃圾回收和重构历史**

```bash
git gc --aggressive
```

对超大仓库可考虑 split-history 或迁移部分历史到归档仓库。

6. **优化 .gitignore 和文件数量**

- 避免生成大量小文件进入工作区。
- 把 generated files 放到 `.gitignore`。

7. **使用 VFS for Git / Scalar（超大仓库）**

Windows 上可用 Scalar 或 GVFS；Git 2.38+ 内置 `scalar` 命令。

**评分维度**：
- 能给出 4 种以上优化方案（50%）
- 能说明每种方案适用场景（30%）
- 提到 trade-off 如 shallow clone 影响 affected（20%）

**常见错误**：
- 一遇到慢就拆仓库，没有先尝试 git 原生优化
- 浅克隆后仍需要完整 git 历史做 affected 分析
- 大文件长期不治理，导致仓库体积膨胀

**延伸追问**：
- sparse checkout 和 Monorepo 的 workspace 有什么区别？
- 如果 git status 很慢，可能是什么原因？

**相关题目**：
- [FB-11-SD-R-002 如何从 Multirepo 迁移到 Monorepo](#FB-11-SD-R-002)
- [FB-11-SD-R-006 如何设计 Monorepo 下的渐进式迁移与拆分策略](#FB-11-SD-R-006)

**参考资源**：
- [Git Partial Clone](https://git-scm.com/docs/partial-clone)
- [Git Sparse Checkout](https://git-scm.com/docs/git-sparse-checkout)

**口头回答版**：
大型 Monorepo 可以用 partial clone 只拉需要的 blob，用 sparse checkout 只检出部分目录，用 Git LFS 管理大文件，CI 里用 shallow clone。定期 `git gc` 清理，generated files 放 .gitignore。Windows 超大仓库可以用 Scalar。注意 shallow clone 可能影响 affected 计算。

---

### FB-11-SD-P-019：如何设计 Monorepo 下的包级权限模型？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：11 Monorepo
**标签**：权限、CODEOWNERS、Monorepo、安全、治理
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在大型 Monorepo 中，不同团队负责不同包。请设计一个包级权限模型，控制谁能修改、发布和访问哪些包。

**参考答案**：

设计方案：

1. **目录级权限（CODEOWNERS）**

```text
# .github/CODEOWNERS
packages/ui        @frontend-platform-team
packages/api-client @backend-team @frontend-platform-team
apps/web           @web-team
apps/admin         @admin-team
turbo.json         @frontend-platform-team
```

- 自动分配 PR reviewer。
- 结合分支保护规则，要求 CODEOWNERS 批准才能合并。

2. **分支保护规则**

- 关键包路径修改需至少 2 名 reviewer。
- 禁止 force push 到 main。
- CI 检查通过才能合并。

3. **发布权限控制**

- 发布 token 只交给 CI，不发给个人。
- 使用 changesets 的 `snapshot` 模式控制预发布。
- 对核心包设置更严格的发布审批流程。

4. **依赖方向约束**

- 用 `dependency-cruiser` 或 ESLint 规则禁止越层依赖。
- 如 `packages/` 不能依赖 `apps/`，基础包不能被业务包反向依赖。

5. ** secrets 和 registry 隔离**

- 按团队或包分配 npm publish token。
- 内部包设置 `private: true` 防止误发布。
- 使用私有 registry 和作用域（scope）控制访问。

6. **审计与监控**

- 记录谁修改了共享配置和核心包。
- 定期 review 权限矩阵，移除离职人员。

**评分维度**：
- CODEOWNERS 和分支保护设计（30%）
- 发布和 secrets 权限控制（25%）
- 依赖方向约束（25%）
- 审计和可维护性（20%）

**常见错误**：
- 所有代码都只有一组 owner，无法反映真实责任
- 权限过宽，任何开发者都能发布核心包
- 只限制写权限，不限制依赖方向

**延伸追问**：
- 如果一个 PR 修改了多个团队的包，如何设计 review 流程？
- 如何防止某个团队意外修改共享基础设施配置？

**相关题目**：
- [FB-11-SD-R-005 设计一个跨团队 Monorepo 的代码所有权与评审策略](#FB-11-SD-R-005)
- [FB-11-SD-R-008 如何设计 Monorepo 的依赖治理与自动化审计体系](#FB-11-SD-R-008)

**参考资源**：
- [GitHub CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

**口头回答版**：
包级权限主要靠 CODEOWNERS 按目录指定负责人，配合分支保护要求 owner 批准。发布 token 只给 CI，核心包走更严审批。用工具约束依赖方向，比如 `packages/` 不能依赖 `apps/`。内部包设 `private: true`，用私有 registry 控制访问。还要定期审计权限矩阵。

---

### FB-11-EN-P-020：如何处理跨包类型导出导致的 tree-shaking 问题？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：TypeScript、tree-shaking、类型导出、Monorepo、构建
**出现频率**：低频
**预计回答时长**：5-10 分钟

**题目描述**：
在 Monorepo 中，内部包经常集中导出类型供其他包使用。请说明这种集中导出类型可能带来的 tree-shaking 问题及解决方案。

**参考答案**：

问题：

如果内部包把所有类型集中到一个入口导出：

```ts
// packages/types/src/index.ts
export * from './user';
export * from './order';
export * from './payment';
```

消费方：

```ts
import { User } from '@scope/types';
```

虽然只用到 `User`，但如果构建产物是单个 bundle，打包工具可能把整个 types 包都打包进去，尤其当类型文件中混入了运行时值或副作用时。

解决方案：

1. **分离类型包和运行时包**

```text
packages/types/      # 纯类型
packages/constants/  # 运行时值
```

2. **使用 subpath exports**

```json
{
  "exports": {
    "./user": {
      "types": "./dist/user.d.ts"
    },
    "./order": {
      "types": "./dist/order.d.ts"
    }
  }
}
```

消费方：

```ts
import type { User } from '@scope/types/user';
```

3. **类型单独导出并使用 `import type`**

```ts
export type { User } from './user';
```

`import type` 在编译后会被擦除，不会引入运行时依赖。

4. **构建配置优化**

- 使用 `tsc` 生成 d.ts，不打包成单文件。
- 如需打包，使用 rollup 并配置 `preserveModules`。
- 配置 `sideEffects: false`。

**评分维度**：
- 说清问题成因（30%）
- 能给出 3 种以上解决方案（40%）
- 提到 import type 和 subpath exports（30%）

**常见错误**：
- 类型文件里混入运行时代码
- 没有使用 `import type` 导致类型被当作值引入
- 类型包打包成单文件 bundle，破坏 tree-shaking

**延伸追问**：
- 如果类型包被多个应用引用，如何分析它对产物体积的实际影响？
- `export type` 和 `export interface` 在 tree-shaking 上有什么区别？

**相关题目**：
- [FB-11-EN-P-009 如何在 Monorepo 中实现跨包类型检查](#FB-11-EN-P-009)
- [FB-11-CO-B-009 什么是 package.json 中的 exports 字段](#FB-11-CO-B-009)

**参考资源**：
- [TypeScript import type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)

**口头回答版**：
类型集中导出可能导致打包工具把整个类型包都打进去。解决方法是类型和运行时分离、用 subpath exports 按需导入、用 `export type` 和 `import type` 避免引入运行时依赖。构建时尽量用 tsc 生成 d.ts，不要打包成单文件，配置 `sideEffects: false`。

---

### FB-11-EN-P-021：如何保证 Monorepo 中 generated files 在 CI 中的幂等性？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：11 Monorepo
**标签**：generated files、幂等性、CI、Monorepo、构建
**出现频率**：低频
**预计回答时长**：5-10 分钟

**题目描述**：
Monorepo 中常见 generated files（如 API client、图标组件、类型定义）。请说明如何保证这些生成产物在每次 CI 构建中结果一致，避免 diff 噪声。

**参考答案**：

问题：

generated files 如果每次生成结果不同，会导致：

- PR 中出现大量无意义 diff。
- 缓存命中率下降。
- 难以判断是否真的需要重新构建。

解决方案：

1. **固定生成器版本**

把 openapi-generator、prisma、svgr 等版本锁定在 `package.json` 或 Dockerfile 中。

2. **固定输入顺序**

如果生成器遍历目录，确保输入文件按稳定顺序处理：

```js
const files = await glob('src/**/*.ts');
files.sort();
```

3. **消除非确定性内容**

- 移除生成文件中的时间戳、随机 ID、绝对路径。
- 使用相对路径和稳定哈希。

4. **CI 中校验生成一致性**

```bash
pnpm generate
if [ -n "$(git status --porcelain)" ]; then
  echo "Generated files are out of date"
  exit 1
fi
```

5. **不把 generated files 提交到仓库**

如果生成速度快且稳定，可以在 `.gitignore` 中忽略，CI 和应用构建时实时生成。

6. **使用 lockfile 缓存**

把生成器的输入 checksum 存入缓存 key，只有输入变化时才重新生成。

**评分维度**：
- 能指出非确定性来源（30%）
- 给出 4 种以上解决方案（40%）
- 提到 CI 校验和缓存策略（30%）

**常见错误**：
- 生成文件里包含时间戳或绝对路径
- 提交 generated files 但不验证它们是否最新
- 每次 CI 都重新生成但不校验一致性

**延伸追问**：
- 如果 generated files 不提交，如何确保本地开发和 CI 一致？
- 生成器版本升级导致产物大量变化，如何 review？

**相关题目**：
- [FB-11-EN-P-013 如何处理 Monorepo 中大型二进制产物或 generated code 的缓存](#FB-11-EN-P-013)
- [FB-11-SD-R-010 设计一个 Monorepo 下的共享服务与 API 治理方案](#FB-11-SD-R-010)

**参考资源**：
- [OpenAPI Generator](https://openapi-generator.tech/)

**口头回答版**：
generated files 要保证幂等，首先生成器版本要锁定，输入文件要排序，生成内容里不要有时间戳、随机 ID 或绝对路径。CI 里可以跑完生成后检查 git status，如果有 diff 就报错。如果生成很快，也可以直接放 .gitignore 里实时生成。缓存 key 用输入的 checksum。

---

### FB-11-CP-P-022：如何评估和降低 Monorepo 中的“单点失败”风险？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：11 Monorepo
**标签**：单点失败、风险、Monorepo、可用性、治理
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
Monorepo 把所有代码放在一处，可能带来单点失败风险。请分析这些风险并提出降低风险的策略。

**参考答案**：

单点失败风险：

1. **构建系统故障**
   - CI 挂掉导致所有团队无法合并。
   - Remote cache 不可用导致全量构建变慢。

2. **共享依赖故障**
   - 某个内部包被大量引用，一旦引入 bug 影响全仓库。
   - 根目录配置错误导致所有子包构建失败。

3. **版本控制系统压力**
   - git 服务器或仓库损坏影响所有团队。
   - 仓库体积过大导致 clone、checkout 变慢。

4. **权限和人为错误**
   - 核心配置被误改影响全局。
   - 发布 token 泄露导致所有包被污染。

降低策略：

1. **冗余和降级**
   - 配置多个 CI runner 和 remote cache 实例。
   - CI 中支持跳过 cache 的降级模式。

2. **隔离和边界**
   - 核心共享包修改需更严格 review。
   - 按团队或服务划分目录边界，限制影响范围。

3. **快速回滚**
   - 保留可快速回滚的发布版本。
   - 使用 changesets 和标签管理版本。

4. **监控和告警**
   - 监控 CI 成功率、构建时长、缓存命中率。
   - 对核心包变更设置额外告警。

5. **备份和灾难恢复**
   - 定期备份 git 仓库。
   - 关键发布产物多副本存储。

6. **渐进式拆分**
   - 对极端耦合或独立业务，评估是否需要拆分子仓库。

**评分维度**：
- 能分析 3 类以上单点失败风险（35%）
- 提出针对性的降低策略（40%）
- 提到监控、回滚和拆分（25%）

**常见错误**：
- 认为 Monorepo 天然就是单点失败，必须拆分
- 只关注技术风险，忽略流程和权限风险
- 没有监控和告警，问题发现滞后

**延伸追问**：
- 如果 remote cache 服务宕机，CI 应该如何降级？
- 什么时候应该把 Monorepo 中的一部分拆分出去？

**相关题目**：
- [FB-11-CP-R-002 Monorepo 的优劣及何时不应该使用 Monorepo](#FB-11-CP-R-002)
- [FB-11-SD-R-008 如何设计 Monorepo 的依赖治理与自动化审计体系](#FB-11-SD-R-008)

**参考资源**：
- [Google Monorepo Best Practices](https://research.google/pubs/pub45424/)

**口头回答版**：
Monorepo 的单点失败风险包括 CI 故障、共享依赖 bug 扩散、git 系统压力、核心配置误改等。降低方法有多 CI runner 和 cache 冗余、严格的核心包 review、快速回滚机制、监控告警、定期备份 git 和产物。实在必要时可以对独立业务做渐进式拆分，但不能一有问题就拆。

---

## 架构题（续）

### FB-11-SD-R-012：如何设计一个支持领域驱动设计（DDD）的 Monorepo 分层架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：DDD、分层架构、Monorepo、领域模型、边界上下文
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请为一个大型前端 Monorepo 设计一个基于 DDD 的分层架构，明确目录结构、包边界和依赖方向。

**参考答案**：

设计原则：

1. **按边界上下文（Bounded Context）划分**

```text
packages/
├── core/                    # 通用域：utils、types、design-tokens
├── shared-kernel/           # 共享内核：跨域通用概念
├── domains/
│   ├── user/                # 用户域
│   │   ├── domain/          # 实体、值对象、领域服务
│   │   ├── application/     # use case、DTO
│   │   ├── infrastructure/  # API client、storage
│   │   └── presentation/    # UI components、hooks
│   ├── order/               # 订单域
│   └── payment/             # 支付域
├── apps/
│   ├── web/                 # 组合各域形成应用
│   └── admin/
```

2. **依赖方向约束**

- `domain` 不依赖 `application` / `infrastructure` / `presentation`。
- `application` 可依赖 `domain`，但不可依赖 `infrastructure`。
- `infrastructure` 实现 `application` 定义的接口（依赖倒置）。
- `apps/` 可以依赖各域的 `presentation`，但不可跨域直接访问 `domain`。

3. **包边界设计**

- 每个边界上下文可作为一个或多个内部包。
- 使用 `exports` 精确暴露 public API。
- 共享内核谨慎演进，变更需多方 review。

4. **防腐层（Anti-Corruption Layer）**

当外部系统或旧模块模型与当前域不一致时，引入 adapter / mapper 隔离。

5. **工具保障**

- dependency-cruiser 检查依赖方向。
- ESLint `no-restricted-imports` 禁止越层导入。
- CI 中运行架构测试。

**评分维度**：
- 目录结构和边界上下文划分（30%）
- 依赖方向清晰合理（30%）
- public API 和防腐层设计（20%）
- 工具和治理保障（20%）

**常见错误**：
- 按技术层而非业务域划分包
- domain 层直接引用 UI 或 API client
- 共享内核过度膨胀，所有包都依赖它

**延伸追问**：
- 如果两个业务域都需要同一个概念（如 Address），应该放在哪里？
- 如何在 Monorepo 中逐步引入 DDD 分层而不重写全部代码？

**相关题目**：
- [FB-11-SD-P-001 如何设计 Monorepo 的模块边界规则](#FB-11-SD-P-001)
- [FB-11-SD-R-007 设计一个支持微前端聚合的 Monorepo 架构](#FB-11-SD-R-007)

**参考资源**：
- [Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/)

**口头回答版**：
基于 DDD 的 Monorepo 按边界上下文分域，比如 user、order、payment。每个域内部再分 domain、application、infrastructure、presentation 四层。依赖方向严格向内，domain 不依赖外层。app 组合各域的 presentation 层。用 dependency-cruiser 和 ESLint 保证依赖方向，共享内核要非常谨慎。

---

### FB-11-CP-R-013：Monorepo 与平台工程（Platform Engineering）有什么关系？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：平台工程、Platform Engineering、Monorepo、开发者体验、内部平台
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请讨论 Monorepo 和平台工程之间的关系，以及如何基于 Monorepo 构建前端平台能力。

**参考答案**：

关系：

1. **Monorepo 是平台工程的重要载体**
   - 统一的代码仓库便于统一工具链、规范和基础设施。
   - 平台团队可以在 Monorepo 中沉淀模板、组件库、CLI、CI 工作流。

2. **平台工程提升 Monorepo 开发者体验**
   - 提供脚手架、文档门户、开发者工具链。
   - 通过内部平台降低 Monorepo 的复杂度，让业务团队专注于业务。

平台能力构建：

1. **统一开发者门户**
   - 包目录、依赖图、文档、RFC、ADR 集中展示。
   - 搜索和发现内部能力。

2. **标准化脚手架**
   - Turborepo generator / Nx plugin 创建应用和包。
   - 内置 CI、测试、发布配置。

3. **共享基础设施**
   - 统一的构建、测试、发布流水线。
   - Remote cache、registry、secret 管理。

4. **可观测性**
   - 构建时长、缓存命中率、依赖健康度仪表板。
   - 包使用情况和版本分布。

5. **治理自动化**
   - 自动检测越层依赖、未使用依赖、缺失 changeset。
   - CODEOWNERS 和权限矩阵自动化管理。

平衡：

- 平台团队不能成为瓶颈，应提供自助服务能力。
- 避免过度平台化导致灵活性丧失。

**评分维度**：
- 说清两者关系（30%）
- 能列出 4 个以上平台能力（35%）
- 提到开发者体验和治理平衡（20%）
- 有具体实施路径（15%）

**常见错误**：
- 把 Monorepo 和平台工程等同
- 平台团队包办一切，业务团队失去自主权
- 只建设工具，不关注 adoption 和文档

**延伸追问**：
- 平台团队如何衡量 Monorepo 平台的价值？
- 业务团队抵触统一工具链时怎么办？

**相关题目**：
- [FB-11-SD-R-011 设计 Monorepo 下的文档站点与开发者门户](#FB-11-SD-R-011)
- [FB-11-CP-R-001 比较各家 Monorepo 工具适用场景](#FB-11-CP-R-001)

**参考资源**：
- [Platform Engineering](https://platformengineering.org/)

**口头回答版**：
Monorepo 是平台工程很好的载体，因为代码集中，便于统一工具和规范。平台工程反过来降低 Monorepo 使用门槛。可以基于 Monorepo 建开发者门户、标准化脚手架、共享 CI 和 cache、做可观测性仪表板、自动治理依赖和 changeset。关键是平台团队要提供自助服务，不能成为瓶颈。

---

### FB-11-SD-R-014：如何设计 Monorepo 下的 release train 发布模式？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：release train、发布模式、Monorepo、版本管理、CI/CD
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请为大型 Monorepo 设计一个 release train 发布模式，协调多个内部包和应用的发布节奏。

**参考答案**：

Release train 模式：

按固定周期（如每周二）发车，把一段时间内合并的变更统一打包发布，而不是每个 PR 单独发布。

设计要点：

1. **发布周期和分支模型**

```text
main
├── release/2024-w01   # 每周一个 release branch
├── release/2024-w02
└── hotfix/xxx         # 紧急修复分支
```

2. **变更收集**

- PR 合并到 main 时生成 changeset。
- 发车前由 CI 自动聚合 changeset，生成 release PR。
- release PR 包含版本号变更和 CHANGELOG。

3. **依赖顺序和构建**

- 使用拓扑排序先发布底层包，再发布上层应用。
- CI 在发布前跑全量测试和集成测试。

4. **上车和下车的变更管理**

- 每个变更需标记目标 release train。
- 高风险变更可延迟到下一班车。
- 紧急修复走 hotfix 流程，不等待 release train。

5. **回滚策略**

- 发布失败时回滚到上一版本标签。
- 保留每个包的发布历史，支持按包单独回滚。

6. **通知和文档**

- 自动生成发布说明。
- 通知相关团队和 Slack 频道。
- 更新开发者门户的发布日历。

**评分维度**：
- 发布周期和分支模型设计（25%）
- 变更收集和依赖顺序（25%）
- 上车/下车和 hotfix 机制（25%）
- 回滚和通知机制（25%）

**常见错误**：
- 所有变更都强制同一班车，缺乏灵活性
- 没有 hotfix 通道，紧急问题等待太久
- release branch 和 main 长期不同步

**延伸追问**：
- release train 和 continuous deployment 如何取舍？
- 如果一班车里某个包发布失败，其他包怎么办？

**相关题目**：
- [FB-11-EN-A-005 changesets 的工作流程是什么](#FB-11-EN-A-005)
- [FB-11-SC-P-001 多包版本策略 fixed mode vs independent mode](#FB-11-SC-P-001)

**参考资源**：
- [Release Train Pattern](https://www.scaledagileframework.com/release-train/)

**口头回答版**：
release train 是按固定周期统一发版。每周从 main 切一个 release branch，CI 自动聚合 changeset 生成 release PR。发布时按依赖拓扑先底层后上层。变更可以上车或下车，紧急修复走 hotfix。发布失败要能按包回滚，并自动通知团队。

---

### FB-11-CP-R-015：如何评估 Monorepo 是否应该拆分为多个仓库？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：拆分、Multirepo、决策框架、Monorepo、治理
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请给出评估 Monorepo 是否需要拆分的决策框架，包括哪些信号说明应该拆分，哪些信号说明应该保留。

**参考答案**：

决策框架：

1. **保留 Monorepo 的信号**
   - 包之间依赖紧密，跨包重构频繁。
   - 需要统一版本和原子提交。
   - 共享基础设施和 CI 的收益大于协调成本。
   - 团队文化支持共享代码所有权。

2. **考虑拆分的信号**
   - 仓库体积导致 git 操作严重变慢，优化手段已用尽。
   - 不同业务域发布节奏和权限要求差异极大。
   - 某些包有独立的外部用户，需要独立社区治理。
   - 单点失败风险过高，且无法通过冗余和隔离降低。
   - 团队之间频繁因共享代码产生冲突。

3. **拆分策略**
   - **按域拆分**：把相对独立的业务域迁出。
   - **按层级拆分**：核心平台留 Monorepo，业务应用迁出。
   - **逐步拆分**：先用 git subtree / submodule 过渡，再完全独立。

4. **拆分成本评估**
   - 跨仓库依赖管理成本（npm 发布、版本同步）。
   - CI、测试、文档的重复建设。
   - 开发者上下文切换成本。
   - 共享代码的同步和版本对齐难度。

5. **决策流程**
   - 收集数据和痛点。
   - 成立评估小组，包含各业务域代表。
   - 试点拆分一个边界清晰的包。
   - 根据试点结果决定是否扩大拆分。

**评分维度**：
- 保留和拆分的信号分析（35%）
- 拆分策略和过渡方案（30%）
- 成本评估和决策流程（20%）
- 案例或经验（15%）

**常见错误**：
- 把拆分当作解决所有问题的万能药
- 只考虑技术因素，忽略组织和沟通成本
- 没有试点就大规模拆分

**延伸追问**：
- 拆分后如何保持跨仓库的共享配置和工具链一致？
- 如果拆出去后又发现需要频繁同步，怎么办？

**相关题目**：
- [FB-11-SD-R-002 如何从 Multirepo 迁移到 Monorepo](#FB-11-SD-R-002)
- [FB-11-CP-R-002 Monorepo 的优劣及何时不应该使用 Monorepo](#FB-11-CP-R-002)

**参考资源**：
- [Monorepo vs Multirepo](https://monorepo.tools/#monorepo-vs-multirepo)

**口头回答版**：
保留 Monorepo 的信号是包之间依赖紧、需要统一版本和原子提交、共享 CI 收益大。考虑拆分的信号是 git 性能优化到头、业务域差异大、单点失败风险高、团队冲突多。拆分可以按域或按层，先试点再扩大。要充分评估跨仓库依赖管理、CI 重复建设、共享代码同步等成本。

---

### FB-11-SD-R-016：如何设计 Monorepo 的安全供应链体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：供应链安全、SBOM、依赖审计、Monorepo、DevSecOps
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请为大型 Monorepo 设计一套安全供应链体系，覆盖依赖引入、构建、发布和运行阶段。

**参考答案**：

安全供应链体系：

1. **依赖引入阶段**
   - 使用私有 registry 并启用签名验证。
   - 引入新依赖需经过安全评审和许可证检查。
   - 使用 `pnpm audit` / Snyk / Dependabot 扫描漏洞。
   - 固定依赖版本和 lockfile，禁止 `latest`。

2. **开发阶段**
   - 代码签名和提交验证（GPG / SSH signing）。
   - 预提交钩子扫描 secrets（git-secrets、truffleHog）。
   - 依赖许可扫描，避免 GPL 等传染性许可证风险。

3. **构建阶段**
   - 使用不可变构建环境（容器化、lockfile 安装）。
   - 校验依赖完整性（lockfile integrity）。
   - 构建产物签名，记录 SBOM（Software Bill of Materials）。

4. **发布阶段**
   - publish token 最小权限，仅 CI 持有。
   - 发布前人工审批核心包。
   - 使用 provenance attestation（npm provenance）。

5. **运行阶段**
   - 运行时依赖漏洞持续监控。
   - 快速响应和补丁流程。
   - 定期轮换 secrets 和凭证。

6. **治理与审计**
   - 维护允许使用的依赖清单（allowlist）。
   - 定期审查和清理废弃依赖。
   - 建立安全事件响应流程。

**评分维度**：
- 覆盖引入、开发、构建、发布、运行阶段（35%）
- 具体工具和机制（30%）
- 治理和审计流程（20%）
- 应急响应能力（15%）

**常见错误**：
- 只关注依赖漏洞，忽略构建和发布环节
- 安全工具太多导致开发者体验差，adoption 低
- 没有 provenance 或 SBOM 记录

**延伸追问**：
- 如何平衡安全扫描严格度和 CI 速度？
- 如果发现一个依赖有漏洞但无法立即升级，怎么办？

**相关题目**：
- [FB-11-SD-R-008 如何设计 Monorepo 的依赖治理与自动化审计体系](#FB-11-SD-R-008)
- [FB-11-EN-A-021 如何在 Monorepo 中统一管理 secrets 和敏感配置](#FB-11-EN-A-021)

**参考资源**：
- [npm provenance](https://docs.npmjs.com/generating-provenance-statements)
- [SLSA](https://slsa.dev/)

**口头回答版**：
Monorepo 安全供应链要覆盖全生命周期。引入阶段用私有 registry、固定版本、扫描漏洞；开发阶段签名提交、扫描 secrets；构建阶段用不可变环境、校验 lockfile、生成 SBOM；发布阶段 token 最小权限、用 npm provenance；运行阶段持续监控和轮换凭证。还要维护依赖白名单和应急响应流程。

---

### FB-11-SD-R-017：如何设计 Monorepo 的构建可观测性体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：可观测性、构建、Monorepo、监控、CI
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请为大型 Monorepo 设计一套构建可观测性体系，帮助团队持续发现和优化构建性能问题。

**参考答案**：

可观测性体系设计：

1. **指标采集**

采集以下指标：

- 任务级别：build / test / lint 时长、缓存命中/未命中、失败率。
- 包级别：每个子包的构建时间、产物大小、依赖数量。
- CI 级别：pipeline 总时长、排队时间、成功率。
- 资源级别：CPU、内存、磁盘 I/O。

2. **日志和追踪**

- 收集 Turborepo / Nx 的 run summary（JSON）。
- 在 CI 中输出结构化日志。
- 对关键任务启用 distributed tracing。

3. **存储和展示**

- 把指标写入时序数据库（Prometheus / InfluxDB / ClickHouse）。
- 用 Grafana 搭建构建性能仪表板。
- 长期趋势分析：按周/月观察构建时长变化。

4. **告警和诊断**

- 构建时长超过基线 20% 告警。
- 缓存命中率低于阈值告警。
- 失败任务自动分类和通知。

5. **优化闭环**

- 定期生成构建性能报告。
- 识别长尾任务并优化。
- 根据数据调整并发度和缓存策略。

6. **工具示例**

```bash
# Turborepo run summary
turbo run build --summarize
```

```yaml
# CI 中上传 metrics
- run: pnpm turbo run build --summarize
- run: node scripts/upload-build-metrics.js
```

**评分维度**：
- 指标维度完整（30%）
- 日志、追踪、存储方案合理（30%）
- 告警和优化闭环（25%）
- 工具体系可落地（15%）

**常见错误**：
- 只关注总时长，不关注任务级指标
- 没有基线对比，告警阈值拍脑袋
- 数据收集后没有行动闭环

**延伸追问**：
- 如何区分构建变慢是因为代码变多还是配置退化？
- 缓存命中率低时，应该从哪些角度排查？

**相关题目**：
- [FB-11-EN-P-003 如何设计 Monorepo 的 build caching 策略](#FB-11-EN-P-003)
- [FB-11-EN-A-013 如何配置 Turborepo 的 remote cache](#FB-11-EN-A-013)

**参考资源**：
- [Turborepo Run Summary](https://turbo.build/repo/docs/reference/command-line-reference/run#--summarize)

**口头回答版**：
构建可观测性要采集任务级、包级、CI 级、资源级指标。收集 Turborepo 的 run summary，结构化日志，必要时加 tracing。指标存到时序数据库，用 Grafana 展示。设置构建时长、缓存命中率等告警，定期出报告找长尾任务优化，形成数据驱动的优化闭环。

---

### FB-11-CP-R-018：Monorepo 中如何平衡技术民主与技术治理？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：技术民主、技术治理、Monorepo、决策、架构委员会
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
在大型 Monorepo 中，既要让各业务团队有自主权，又要保证全局一致性和质量。请谈谈如何平衡技术民主与技术治理。

**参考答案**：

平衡策略：

1. **分层决策**
   - **全局规则**：仓库结构、依赖方向、CI 标准、安全基线由平台/架构团队制定。
   - **局部决策**：业务团队可在允许范围内选择框架、工具版本、代码风格细节。

2. **RFC 和 ADR 机制**
   - 影响全局的决策走 RFC（Request for Comments）。
   - 已决策事项形成 ADR（Architecture Decision Records）。
   - 重大工具引入需架构委员会审批。

3. **自治与约束结合**
   - 提供标准模板和脚手架，允许业务团队快速创建符合规范的应用和包。
   - 用自动化工具约束（lint、cruiser、CI），减少人工干预。

4. **治理委员会**
   - 由各业务域代表和平台工程师组成。
   - 定期评审全局规则，处理跨团队争议。
   - 确保决策透明，记录 rationale。

5. **反馈和调整**
   - 建立开发者满意度调查。
   - 对繁琐流程定期 review，及时简化。
   - 允许试点新工具，成功后再推广。

6. **激励一致**
   - 把代码质量、文档、迁移进度纳入团队目标。
   - 表彰在共享基础设施上有贡献的团队。

**评分维度**：
- 分层决策清晰（30%）
- RFC/ADR 和委员会机制（25%）
- 自动化约束与自治平衡（25%）
- 反馈和激励措施（20%）

**常见错误**：
- 平台团队一言堂，业务团队没有参与感
- 完全放任，导致仓库结构混乱
- 治理规则僵化，无法适应业务发展

**延伸追问**：
- 如果业务团队强烈反对某项全局规则，怎么处理？
- 如何衡量技术治理是否过度？

**相关题目**：
- [FB-11-SD-R-005 设计一个跨团队 Monorepo 的代码所有权与评审策略](#FB-11-SD-R-005)
- [FB-11-SD-R-008 如何设计 Monorepo 的依赖治理与自动化审计体系](#FB-11-SD-R-008)

**参考资源**：
- [Architecture Decision Records](https://adr.github.io/)

**口头回答版**：
要分层决策：全局规则比如仓库结构、CI、安全基线由平台定；局部技术选型给业务团队自主权。影响全局的决策走 RFC 并形成 ADR。成立由各域代表组成的治理委员会处理争议。用自动化工具约束而不是人盯人。定期收集反馈、简化流程，表彰对共享设施有贡献的团队。

---

### FB-11-SD-R-019：如何设计 Monorepo 下的 AI Coding 辅助策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：AI、Copilot、代码生成、Monorepo、开发者体验
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请为大型 Monorepo 设计一套 AI coding 辅助策略，使 AI 工具能够更好地理解仓库结构、内部包和开发规范。

**参考答案**：

策略设计：

1. **上下文增强**
   - 提供 `.cursorrules` / `.github/copilot-instructions.md` 描述仓库结构和规范。
   - 维护内部包 API 文档和示例，便于 AI 检索。
   - 使用 RAG 把 ADR、RFC、handbook 接入 AI 助手。

2. **提示工程规范**
   - 定义标准 prompt 模板，如生成新包、写测试、重构代码。
   - 提示中要求使用 workspace 引用而非相对路径。
   - 要求 AI 生成 changeset、测试和文档。

3. **AI 友好的仓库结构**
   - 目录和包名语义清晰。
   - 每个包有 README 说明用途和 public API。
   - 统一的 tsconfig、lint、测试配置，减少 AI 猜测。

4. **安全与合规**
   - 限制 AI 访问敏感代码和 secrets。
   - AI 生成代码需经过 CI 和人工 review。
   - 不允许 AI 直接提交到 main。

5. **工具集成**
   - IDE 插件统一配置 Copilot / Cursor / Cody。
   - CI 中集成 AI 代码审查助手（如 CodeRabbit）。
   - 内部 CLI 提供 `ai-review` 等命令。

6. **效果度量**
   - 跟踪 AI 生成代码的采纳率、bug 率、review 时间。
   - 定期优化 prompt 和上下文。

**评分维度**：
- 上下文增强和 RAG（30%）
- 提示工程和规范（25%）
- 安全与 review 机制（25%）
- 度量与持续优化（20%）

**常见错误**：
- 直接让 AI 生成跨包代码而不检查边界
- 忽视 AI 可能泄露 secrets 或生成不安全代码
- 没有度量 AI 辅助的实际效果

**延伸追问**：
- 如何防止 AI 在多个包之间生成重复或冲突的代码？
- AI 生成代码导致测试失败，如何快速定位？

**相关题目**：
- [FB-11-SD-R-011 设计 Monorepo 下的文档站点与开发者门户](#FB-11-SD-R-011)
- [FB-11-CP-R-013 Monorepo 与平台工程有什么关系](#FB-11-CP-R-013)

**参考资源**：
- [GitHub Copilot Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)

**口头回答版**：
AI 辅助 Monorepo 首先要增强上下文，比如用 `.cursorrules` 文件说明仓库结构，把 ADR 和包文档接入 RAG。提示工程要求 AI 用 workspace 引用、生成 changeset 和测试。仓库结构要语义清晰，每个包有 README。安全上限制 AI 访问敏感代码，AI 生成代码必须过 CI 和 review。还要度量采纳率和 bug 率，持续优化。

---

### FB-11-SD-R-020：如何制定 Monorepo 的长期演进路线图？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：11 Monorepo
**标签**：演进路线、技术规划、Monorepo、治理、战略
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请描述如何为一个已经运行多年的大型 Monorepo 制定长期演进路线图，确保其能持续支撑业务发展。

**参考答案**：

演进路线图制定：

1. **现状评估**
   - 仓库规模：包数量、代码量、依赖复杂度。
   - 痛点调研：构建时长、CI 稳定性、开发者满意度。
   - 技术债务：未使用依赖、循环依赖、老旧工具版本。

2. **愿景和目标**
   - 明确 1 年、3 年目标，如构建时间 < 10 分钟、缓存命中率 > 90%。
   - 对齐业务战略：支持多少应用、团队、发布频率。

3. **关键举措**
   - **短期（0-6 个月）**：升级工具链、清理债务、优化缓存。
   - **中期（6-18 个月）**：引入 affected 构建、remote cache、包拆分。
   - **长期（18-36 个月）**：平台化、AI 辅助、可能的领域拆分。

4. **治理和度量**
   - 定义北极星指标：构建时长、发布频率、开发者满意度、事故数。
   - 每季度 review 路线图进展。
   - 成立架构工作组推动跨团队事项。

5. **风险与预案**
   - 工具升级失败：保留回滚方案，分阶段 rollout。
   - 规模瓶颈：提前规划拆分或 partial clone。
   - 人员变动：文档化和知识沉淀。

6. **沟通和推广**
   - 把路线图公开到开发者门户。
   - 定期举办技术分享和培训。
   - 让业务团队理解技术投入的价值。

**评分维度**：
- 现状评估方法（25%）
- 短中长期规划（30%）
- 度量和治理机制（25%）
- 风险沟通和落地能力（20%）

**常见错误**：
- 只关注技术升级，不关注开发者体验和业务目标
- 路线图过于激进，没有分阶段和 rollback
- 没有度量指标，无法证明投入产出

**延伸追问**：
- 如果业务增长超预期，路线图如何调整？
- 如何向管理层争取 Monorepo 技术投入的预算？

**相关题目**：
- [FB-11-CP-R-004 如何向管理层论证 Monorepo 的 ROI](#FB-11-CP-R-004)
- [FB-11-SD-R-006 如何设计 Monorepo 下的渐进式迁移与拆分策略](#FB-11-SD-R-006)

**参考资源**：
- [Technology Radar](https://www.thoughtworks.com/radar)

**口头回答版**：
制定 Monorepo 演进路线首先要评估现状：规模、痛点、技术债务。然后定 1 年和 3 年目标，比如构建时长和缓存命中率。短期升级工具和清理债务，中期引入 affected 构建和 remote cache，长期做平台化和 AI 辅助。要定义北极星指标，每季度 review，成立工作组推动，并做好沟通和回滚预案。



### FB-11-CO-B-021：什么是 Monorepo 中的 changeset？有什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：changeset、版本管理、发布、Monorepo
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Monorepo 中 changeset 的概念，并说明它在版本发布流程中的作用。

**参考答案**：

Changeset 是对一次代码变更的元数据描述，通常包含：

- 影响的包（affected packages）。
- 变更类型（patch / minor / major）。
- 变更说明（changelog 内容）。

在 Monorepo 中，changeset 工具（如 `@changesets/cli`）帮助管理多包版本发布：

1. 开发者提交代码时同时提交一个 `.changeset/{id}.md` 文件。
2. 发布时工具汇总所有未消费的 changeset。
3. 自动计算每个包的版本升级（patch/minor/major）。
4. 自动生成 changelog 和版本号。
5. 更新 `package.json` 版本并发布到 npm。

示例：

```md
---
"@scope/utils": minor
"@scope/ui": patch
---

Added formatDate utility and fixed Button padding.
```

**评分维度**：
- 说明 changeset 的核心字段（40%）
- 说明在发布流程中的作用（40%）
- 能写简单 changeset 示例（20%）

**常见错误**：
- 把 changeset 等同于 commit message
- 认为 changeset 只记录版本号，不记录变更说明

**口头回答版**：
> changeset 就是描述一次变更对哪些包有什么影响的元数据文件。它记录 affected packages、版本升级类型和变更说明。发布时工具汇总所有 changeset，自动算出版本号、生成 changelog，然后批量发布。Monorepo 里常用 @changesets/cli 来管理。

---

### FB-11-EN-B-022：如何在 Monorepo 中配置统一的 lint 和 format？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：Monorepo、ESLint、Prettier、共享配置、代码规范
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明在 Monorepo 中如何设计统一的 ESLint、Prettier 配置，并让多个子包继承和覆盖。

**参考答案**：

一、抽成共享配置包：

```text
packages/eslint-config/
  package.json
  index.js
  react.js
  node.js
```

```js
// packages/eslint-config/index.js
module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'warn'
  }
};
```

二、子包继承：

```js
// apps/web/.eslintrc.js
module.exports = {
  extends: ['@scope/eslint-config/react'],
  rules: {
    'no-console': 'off' // 覆盖
  }
};
```

三、根目录统一脚本：

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

四、配合 lint-staged：

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

最佳实践：
- 配置包设为 `private: true`，不发布。
- 用 `peerDependencies` 声明 ESLint/Prettier 版本。
- 允许子包按自身类型（React/Node）继承不同预设。

**评分维度**：
- 说明共享配置包结构（40%）
- 说明继承和覆盖机制（30%）
- 提到根目录脚本和 lint-staged（20%）
- 提到 peerDependencies（10%）

**常见错误**：
- 每个子包复制一份完整配置
- 共享配置包没有声明 peerDependencies 导致版本冲突

**口头回答版**：
> Monorepo 里统一 lint/format 通常把配置抽成共享包，比如 `packages/eslint-config`，然后子包 `extends` 继承，需要时本地覆盖。根目录写统一的 lint/format 脚本，配合 Husky 和 lint-staged 在提交时触发。共享配置包一般不发布，用 peerDependencies 声明 ESLint 版本。

---

### FB-11-CO-B-022：什么是 pnpm 的 catalog 依赖版本管理？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：pnpm、catalog、依赖版本、Monorepo
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 pnpm 的 `catalog:` protocol 是什么，它解决了 Monorepo 中的什么问题。

**参考答案**：

`catalog:` 是 pnpm 9.5+ 引入的依赖版本统一管理协议。它允许在 `pnpm-workspace.yaml` 中定义一个依赖的版本，然后所有子包在 `package.json` 中使用 `catalog:` 引用该版本。

配置示例：

```yaml
# pnpm-workspace.yaml
catalog:
  react: ^18.2.0
  typescript: ^5.3.0
```

```json
// packages/ui/package.json
{
  "dependencies": {
    "react": "catalog:"
  }
}
```

解决的问题：

1. **版本漂移**：避免各子包对同一依赖写不同版本。
2. **升级成本**：升级时只需改 `pnpm-workspace.yaml` 一处。
3. **可维护性**：清晰看到所有子包共用哪些依赖版本。

注意：
- `catalog:` 只在 workspace 内生效，发布时会替换为实际版本。
- 可对某个 scope 或特定包定义 `catalogs` 多目录。

**评分维度**：
- 说明 catalog 是统一版本协议（40%）
- 能写出配置示例（30%）
- 说明解决的版本漂移问题（30%）

**常见错误**：
- 认为 catalog 会改变发布后的 package.json
- 与 workspace: protocol 混淆

**口头回答版**：
> pnpm 的 `catalog:` 是一种统一版本管理方式。在 `pnpm-workspace.yaml` 里定义 react、typescript 这些依赖的版本，然后各子包的 package.json 里写 `react: "catalog:"`。这样升级时只改一处，避免子包版本漂移。发布时 catalog 会替换成真实版本号。

---

### FB-11-EN-B-023：如何在 Monorepo 中统一版本发布？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：Monorepo、发布、changeset、CI/CD、npm
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请描述 Monorepo 中统一版本发布的常见流程和工具。

**参考答案**：

常见工具：@changesets/cli、semantic-release、Turborepo + Changesets、Rush。

基于 Changesets 的发布流程：

1. **开发阶段**：每次有版本影响变更时，开发者执行 `pnpm changeset`，选择 affected packages 和 bump type。
2. **提交 changeset**：将生成的 `.changeset/*.md` 随代码一起提交。
3. **CI 校验**：确保 PR 包含必要的 changeset（可用 changeset-bot）。
4. **版本聚合**：合并到 main 后，运行 `pnpm changeset version`：
   - 读取所有未消费 changeset。
   - 更新各包 `package.json` 版本。
   - 生成/更新 CHANGELOG.md。
   - 删除已消费的 changeset 文件。
5. **构建与发布**：运行 `pnpm changeset publish`：
   - 按拓扑顺序构建。
   - 发布到 npm registry。
6. **创建 Release PR/Git Tag**：自动化记录发布版本。

最佳实践：
- 发布必须由 CI 执行，避免本地发布。
- 使用 npm automation token 或 OIDC 鉴权。
- 发布前跑全量测试和类型检查。

**评分维度**：
- 说明 changeset 提交流程（30%）
- 说明 version 和 publish 阶段（40%）
- 提到 CI 自动化和安全（30%）

**常见错误**：
- 本地手动修改所有 package.json 版本
- 不生成 changelog 或版本说明

**口头回答版**：
> Monorepo 统一发布常用 Changesets。开发时每次有版本影响就 `pnpm changeset` 生成一个 md 文件，提交到仓库。合并后主分支跑 `changeset version` 自动算版本、更新 package.json、生成 changelog，然后 `changeset publish` 按拓扑顺序构建发布。发布最好在 CI 里做，用 automation token，避免本地手改版本。

---

### FB-11-CO-B-023：什么是 Monorepo 中 package 的 public API 边界？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：11 Monorepo
**标签**：Monorepo、public API、package.json、exports、封装
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Monorepo 内部包的 public API 边界是什么，为什么要控制它。

**参考答案**：

Public API 边界指一个包对外暴露的模块、类型和函数集合。通过 `package.json` 的 `exports` 字段精确控制后，外部只能访问声明的入口，无法直接引用内部实现文件。

示例：

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs"
    },
    "./internal": null
  }
}
```

控制边界的意义：

1. **防止外部依赖内部实现**：避免消费方引用临时文件导致重构困难。
2. **明确版本契约**：Breaking Change 只发生在 public API 变化时。
3. **支持重构**：内部实现可自由调整而不影响外部。
4. **Tree Shaking 友好**：精确入口有助于打包工具分析。

违规示例：

```js
// 不推荐
import { helper } from '@scope/utils/dist/internal/helper';
```

**评分维度**：
- 说明 public API 边界的含义（40%）
- 说明 exports 字段的控制作用（30%）
- 说明控制边界的好处（30%）

**常见错误**：
- 认为 package 内所有文件都可以被外部引用
- exports 配置过于宽泛，暴露内部实现

**口头回答版**：
> public API 边界就是一个包对外暴露哪些模块和函数。通过 package.json 的 exports 字段控制，比如只暴露根入口，内部路径设为 null。这样可以防止别人引用内部实现，方便后面重构，也让版本契约更清晰。不要写 `import ... from '@scope/utils/dist/internal/...'` 这种路径。

---

### FB-11-CO-A-002：Monorepo 中如何处理循环依赖？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：Monorepo、循环依赖、依赖关系、重构
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在 Monorepo 中，内部包之间可能出现循环依赖。请说明如何发现、分析和解决循环依赖问题。

**参考答案**：

一、发现循环依赖：

1. **pnpm**：`pnpm m ls --depth Infinity` 或 `pnpm why <pkg>` 查看依赖图。
2. **工具分析**：
   - `madge`：检测 JS/TS 项目循环引用。
   - `dependency-cruiser`：可视化依赖关系并检查规则。
   - `nx graph`：查看 Nx workspace 包图。
3. **CI 拦截**：在 CI 中跑依赖图检查脚本，发现循环依赖即失败。

二、循环依赖的危害：

- 构建时无法确定加载顺序。
- 增加打包体积（重复引用）。
- 类型定义互相引用导致声明文件错误。
- 单测难以独立运行。

三、解决策略：

1. **提取公共包**：把双方都依赖的代码抽到第三个包。
2. **依赖反转**：上层依赖抽象接口，下层实现接口。
3. **合并包**：如果两个包耦合过深，考虑合并。
4. **事件总线/依赖注入**：通过事件或 DI 解耦直接引用。

四、预防措施：

- 定义清晰的包职责边界。
- 禁止低级包依赖高级包。
- 使用 `dependency-cruiser` 规则自动检查。

**评分维度**：
- 提到检测工具（30%）
- 说明循环依赖危害（20%）
- 给出具体解决策略（40%）
- 提到预防措施（10%）

**常见错误**：
- 只在运行时才发现循环依赖
- 通过 hack 方式绕过加载顺序而不重构

**口头回答版**：
> Monorepo 里发现循环依赖可以用 madge、dependency-cruiser 或 nx graph 分析，CI 里跑脚本拦截。循环依赖会导致加载顺序不确定、打包变大、类型出错。解决可以抽公共包、依赖反转、合并包，或者用事件总线解耦。平时要定义清楚包职责，低级包不能依赖高级包。

---

### FB-11-SC-A-023：如何为 Monorepo 设计 CI/CD 流水线？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：Monorepo、CI/CD、Turborepo、缓存、Affected
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请为 Monorepo 设计一条高效的 CI/CD 流水线，要求只构建和测试受影响的包，并充分利用缓存。

**参考答案**：

一、受影响包分析：

使用 `--affected` 或 `turbo run build --filter=[HEAD^1]`，只构建和测试本次变更影响的包及其依赖。

二、Pipeline 阶段：

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {},
    "typecheck": {}
  }
}
```

三、缓存策略：

1. **Remote Cache**：Turborepo 或 Nx 的远程缓存，团队成员共享构建结果。
2. **CI 缓存**：缓存 `node_modules`、pnpm store、构建产物。
3. **输入输出声明**：明确每个任务的 inputs 和 outputs，避免无效缓存命中。

四、并行执行：

- 没有依赖的任务并行跑。
- 使用矩阵任务充分利用 CI runner。

五、PR 阶段：

- `turbo run lint typecheck test --filter=...[origin/main]`。
- 生成受影响包报告。

六、发布阶段：

- 合并 main 后跑全量 build。
- 使用 Changesets 自动发布受影响包。

**评分维度**：
- 使用 affected/filter 减少构建范围（30%）
- 设计 pipeline 依赖关系（25%）
- 缓存策略具体（25%）
- PR 和发布阶段区分（20%）

**常见错误**：
- 每次 CI 都全量构建所有包
- 缓存键设计不当导致命中失败或脏缓存

**口头回答版**：
> Monorepo CI/CD 要用 affected 分析只构建受影响的包。比如 Turborepo 用 `--filter=[HEAD^1]`。pipeline 里声明 build 依赖上游 build，test 依赖 build。再加上远程缓存和 CI 缓存，没改过的任务直接命中。PR 阶段跑 lint、typecheck、test，发布阶段全量 build 并用 Changesets 发布。

---

### FB-11-CP-A-021：比较 Turborepo、Nx、Rush 的适用场景

**题型**：对比题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：Turborepo、Nx、Rush、Monorepo、选型
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Turborepo、Nx、Rush 三个 Monorepo 工具的特点和适用场景。

**参考答案**：

| 维度 | Turborepo | Nx | Rush |
|------|-----------|-----|------|
| 定位 | 任务运行器 + 构建缓存 | 全功能 Monorepo 平台 | 企业级包管理 + 构建 |
| 上手成本 | 低 | 中 | 高 |
| 语言生态 | 前端优先，JS/TS | 前端优先，支持多种语言 | 企业级，.NET/Node 都支持 |
| 缓存 | 本地/远程缓存，配置简单 | 强大的本地/远程/分布式缓存 | 支持缓存，但更偏包管理 |
| 依赖管理 | 依赖外部包管理器（pnpm/yarn/npm） | 自洽 | 自带 Rush Stack，控制更严格 |
| 插件/扩展 | 较少 | 丰富的插件生态和代码生成 | 可配置但生态小 |
| 适用规模 | 中小型团队，JS/TS 项目 | 中大型团队，复杂前端工程 | 大型企业，多语言、强治理 |

选择建议：

- **Turborepo**：团队规模不大，希望快速提升构建速度，已有 pnpm workspace。
- **Nx**：需要代码生成、项目图、插件生态、统一工作流。
- **Rush**：超大企业 Monorepo，需要严格的包管理、版本策略、合并 PR 策略。

**评分维度**：
- 能列出三者核心差异（40%）
- 结合团队规模给出建议（30%）
- 说明缓存和依赖管理差异（30%）

**常见错误**：
- 认为三者完全等价，只挑一个用
- 忽略 Rush 在企业级治理的优势

**口头回答版**：
> Turborepo 更像任务调度器，上手简单，适合中小型前端项目。Nx 是功能完整的 Monorepo 平台，有代码生成、项目图和丰富插件，适合中大型前端工程。Rush 是企业级方案，包管理和版本策略更严格，适合大型多语言 Monorepo。选型看团队规模和治理需求。

---

### FB-11-EN-A-022：如何配置 Monorepo 中的依赖升级策略？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：Monorepo、依赖升级、Renovate、Dependabot、SemVer
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Monorepo 中如何安全、高效地管理依赖升级，避免多个子包版本不一致。

**参考答案**：

一、统一版本管理：

1. **catalog 协议**（pnpm）：在 `pnpm-workspace.yaml` 中统一管理公共依赖版本。
2. **共享依赖包**：把一组依赖封装成 `@scope/shared-deps`，子包只依赖这个包。

二、自动化升级工具：

1. **Renovate**：
   - 支持分组升级、自动合并 patch/minor。
   - 可配置 monorepo 分组规则，例如所有 React 生态一起升级。
2. **Dependabot**：GitHub 原生，但分组能力较弱。

Renovate 配置示例：

```json
{
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchPackagePatterns": ["^@types/", "^eslint"],
      "groupName": "dev-deps"
    }
  ]
}
```

三、升级流程：

1. 自动化工具扫描并创建升级 PR。
2. PR 触发全量 CI，跑 lint/typecheck/test。
3. 大版本升级需要人工 review 和回归测试。
4. 合并后通知各子包负责人关注影响。

四、风险控制：

- patch/minor 自动合并，major 人工审批。
- 关键依赖升级先在非核心项目试点。
- 保留 lockfile 历史版本便于回滚。

**评分维度**：
- 说明统一版本管理方式（30%）
- 说明自动化工具配置（30%）
- 说明升级流程和风险控制（40%）

**常见错误**：
- 各子包各自升级，版本碎片化
- 大版本升级直接自动合并

**口头回答版**：
> Monorepo 里升级依赖可以用 pnpm catalog 或共享依赖包统一版本。再用 Renovate 自动扫描创建 PR，按 patch/minor/major 设置不同审批策略。PR 触发全量 CI，大版本升级人工 review。避免每个子包各自升级造成版本不一致。

---

### FB-11-CO-A-003：什么是 pnpm 的 peerDependencyRules？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：pnpm、peerDependencies、peerDependencyRules、依赖解析
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 pnpm 的 `peerDependencyRules` 是做什么用的，并举一个 Monorepo 中的实际场景。

**参考答案**：

`peerDependencyRules` 是 pnpm 在 `.npmrc` 或 `package.json` 中配置的对等依赖覆盖规则，用于处理 peer dependency 警告或冲突。

常见配置项：

- `ignoreMissing`：忽略某些缺失的 peer dependency 警告。
- `allowedVersions`：允许某个 peer dependency 的版本范围。
- `allowAny`：允许任意版本。

Monorepo 场景示例：

一个 UI 库 `@scope/ui` peer 依赖 `react: ^16.8.0 || ^17.0.0 || ^18.0.0`，但测试项目想同时验证 React 17 和 18。可在 `.npmrc` 中：

```ini
# .npmrc
strict-peer-dependencies=false
```

或在 `package.json` 中：

```json
{
  "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": ["@types/react"],
      "allowedVersions": {
        "react": "17 || 18"
      }
    }
  }
}
```

注意：
- 这是包管理器层面的妥协，不能替代 peerDependency 声明。
- 应尽量少用，优先让依赖方声明正确的 peer 版本。

**评分维度**：
- 说明 peerDependencyRules 的作用（40%）
- 给出 Monorepo 实际场景（40%）
- 提到应谨慎使用（20%）

**常见错误**：
- 用 peerDependencyRules 掩盖真正的版本冲突
- 与 resolutions/overrides 混淆

**口头回答版**：
> pnpm 的 `peerDependencyRules` 用来处理 peer dependency 的警告和冲突，比如 `ignoreMissing`、`allowedVersions`。Monorepo 里如果 UI 库同时支持 React 17 和 18，测试项目可以配置 allowedVersions 避免安装冲突。但这是妥协方案，不能替代正确的 peerDependency 声明。

---

### FB-11-SC-P-017：Monorepo 中如何设计子包的测试策略？

**题型**：场景设计题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：Monorepo、测试策略、单元测试、集成测试、affected
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计 Monorepo 中不同层级包的测试策略，包括单元测试、集成测试和 E2E 测试的组织方式。

**参考答案**：

一、测试分层：

| 层级 | 适用对象 | 工具 | 执行频率 |
|------|---------|------|---------|
| 单元测试 | utils、hooks、纯函数 | Vitest/Jest | 每次提交/PR |
| 集成测试 | UI 组件、服务组合 | Vitest + Testing Library | 每次提交/PR |
| E2E 测试 | 完整应用链路 | Playwright/Cypress | PR + 夜间 |

二、组织方式：

1. **测试文件紧邻源码**：`src/utils.ts` 与 `src/utils.test.ts` 同目录。
2. **应用级 E2E 独立目录**：`apps/web/e2e/`。
3. **共享测试工具**：`packages/test-utils` 提供 mock、render wrapper。

三、Affected 测试：

- PR 阶段只跑受影响包的测试：`turbo run test --filter=...[origin/main]`。
- 受影响的包的下游依赖也要跑测试，确保兼容性。

四、CI 策略：

1. **PR**：lint -> typecheck -> affected unit/integration tests。
2. **main 合并后**：全量单元/集成测试 + E2E 抽检。
3. **夜间**：全量 E2E、性能回归测试。

五、测试环境一致性：

- 使用 `turbo run test --parallel` 并行执行无依赖任务。
- 数据库/服务依赖用 Testcontainers 或 mock 服务。
- 快照测试集中管理，避免跨包污染。

**评分维度**：
- 测试分层清晰（30%）
- 组织方式合理（25%）
- affected 测试策略（25%）
- CI 策略完整（20%）

**常见错误**：
- 所有测试都全量跑，CI 极慢
- 子包测试依赖真实外部服务，不稳定

**口头回答版**：
> Monorepo 里测试按层分：工具函数跑单元，组件跑集成，应用跑 E2E。测试文件跟源码放一起，E2E 放应用目录下。PR 用 affected 只跑受影响的包和下游依赖的测试，main 合并后跑全量，夜间跑完整 E2E。还可以抽 test-utils 共享 mock 和 render wrapper。

---

### FB-11-EN-P-022：如何优化 Monorepo 的 install 和 build 性能？

**题型**：工程化题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：Monorepo、性能优化、缓存、并行、依赖
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请从 install 和 build 两个角度，谈谈如何优化 Monorepo 的性能。

**参考答案**：

一、Install 优化：

1. **包管理器选择**：
   - pnpm：内容寻址存储、硬链接，节省磁盘和 install 时间。
2. **锁定 lockfile**：使用 `pnpm-lock.yaml`，避免重复解析。
3. **CI 缓存**：
   - 缓存 `~/.pnpm-store`。
   - 缓存 `node_modules/.modules.yaml` 或 `node_modules`（视 CI 而定）。
4. **减少依赖数量**：
   - 合并重复依赖、清理未使用依赖。
   - 用 `pnpm catalogs` 统一版本，避免多版本共存。

二、Build 优化：

1. **任务调度器**：
   - Turborepo/Nx：声明任务依赖，并行无依赖任务。
2. **远程缓存**：
   - Turborepo Remote Cache / Nx Cloud，团队共享构建结果。
3. **Affected 构建**：
   - 只构建本次变更影响的包：`turbo run build --filter=...[origin/main]`。
4. **按需构建**：
   - 纯类型包只做类型生成，不打包。
   - 大型包拆分为更细粒度子包。
5. **资源限制**：
   - 限制并发进程数，避免 OOM。
   - 对大型构建任务分片。

三、监控：

- 记录每次 CI 的 install 和 build 耗时。
- 设置性能回归告警。

**评分维度**：
- install 优化措施具体（35%）
- build 优化措施具体（35%）
- 提到缓存和 affected（20%）
- 提到性能监控（10%）

**常见错误**：
- 不缓存 pnpm store 导致每次全量下载
- 每次 CI 全量构建所有包

**口头回答版**：
> 优化 Monorepo install 用 pnpm、缓存 store、统一版本、清理无用依赖。Build 用 Turborepo 或 Nx 调度任务，加远程缓存，跑 affected 只构建受影响包。大项目限制并发避免 OOM，并监控 install/build 耗时趋势，发现回归及时告警。

---

### FB-11-SD-P-020：如何设计 Monorepo 的变更影响分析？

**题型**：系统设计题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：Monorepo、影响分析、依赖图、CI、Turborepo
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个 Monorepo 变更影响分析机制，能够自动识别一次代码变更会影响哪些包和应用。

**参考答案**：

一、数据收集：

1. **依赖图构建**：
   - 解析每个子包 `package.json` 的 dependencies/devDependencies。
   - 解析源码级 import 关系（用 `dependency-cruiser` 或 TypeScript AST）。
2. **版本控制数据**：
   - 获取当前 PR 与目标分支的 diff。
   - 识别变更的文件和目录。

二、影响范围计算：

1. **直接变更**：文件所在目录对应的包。
2. **间接影响**：依赖该包的其他包和应用。
3. **构建依赖**：如果变更影响共享构建配置，所有包都可能受影响。

三、工具实现：

- **Turborepo/Nx**：内置 `--filter=...[origin/main]` 和依赖图。
- **Nx**：提供 `affected` 命令，基于 git diff 和影响图。
- **自定义脚本**：用 `glob` + `git diff` + 依赖图算法（DFS/BFS）计算。

四、输出与集成：

1. **PR 报告**：列出受影响的包、应用和推荐执行的测试。
2. **CI 任务**：只构建和测试受影响部分。
3. **风险评分**：
   - 核心包变更影响范围大，需要更严格的 review。
   - 纯文档变更可跳过构建。

五、边界处理：

- 根目录配置变更（eslint、tsconfig）通常影响全部。
- lockfile 变更需重新 install 全量。

**评分维度**：
- 依赖图和 diff 分析思路（35%）
- 工具选择合理（25%）
- 输出和 CI 集成（25%）
- 边界情况考虑（15%）

**常见错误**：
- 只分析直接变更，忽略间接依赖
- 根目录配置变更没有触发全量构建

**口头回答版**：
> 变更影响分析要先构建包依赖图和源码 import 图，然后拿 PR diff 对比，找到直接变更的包，再用依赖图算间接影响。Turborepo、Nx 都有 affected 命令可以做。输出受影响包列表和推荐测试任务给 PR 和 CI。根目录配置变更通常影响全量，要单独处理。

---

### FB-11-CP-P-023：Monorepo 中如何处理 Breaking Change？

**题型**：综合开放题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：Monorepo、Breaking Change、SemVer、Migration、兼容性
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 Monorepo 中发布内部包时，如何管理 Breaking Change，并保证消费方平滑迁移。

**参考答案**：

一、版本策略：

- 严格遵循 SemVer，Breaking Change 必须升 major。
- 使用 Changesets 标记变更类型为 `major`。

二、变更发布流程：

1. **RFC 或 ADR**：在变更前说明变更原因、影响范围和迁移方案。
2. **Codemod**：提供自动化迁移脚本，批量替换旧 API。
3. **双版本共存**：
   - 临时允许旧 API 和新 API 共存一个版本周期。
   - 旧 API 标记 `@deprecated`。
4. **升级指南**：写清楚迁移步骤、示例代码和回滚方案。

三、消费方迁移：

1. **按包逐步升级**：不要一次性把所有消费方都升级。
2. **CI 拦截**：旧 API 使用 warning 或 lint rule 禁止新增。
3. **灰度验证**：先在边缘项目试点，确认稳定后再推广。

四、工具支持：

- `jscodeshift` 写 codemod。
- `eslint-plugin-deprecation` 标红废弃 API。
- Changesets 自动生成升级说明。

五、回滚机制：

- 保留旧版本 tag，必要时可快速降级。
- 如果迁移出现大面积问题，及时发布 patch 修复。

**评分维度**：
- SemVer 和版本策略（25%）
- 迁移方案具体（35%）
- 工具支持（20%）
- 回滚机制（20%）

**常见错误**：
- Breaking Change 只升 minor 或 patch
- 不提供迁移文档或 codemod

**口头回答版**：
> Breaking Change 必须升 major，用 Changesets 标记。变更前写 RFC，提供迁移文档和 jscodeshift 脚本。可以让新旧 API 共存一个版本，旧 API 标 deprecated。消费方逐步升级，CI 用 lint 禁止新增旧 API。保留旧版本 tag 方便回滚。

---

### FB-11-CO-P-001：Monorepo 中的版本一致性策略有哪些？

**题型**：概念题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：11 Monorepo
**标签**：Monorepo、版本策略、fixed、independent、SemVer
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Monorepo 中 Fixed Versioning 和 Independent Versioning 两种版本策略的优缺点和适用场景。

**参考答案**：

一、Fixed Versioning（固定版本）：

- 所有子包共享同一个版本号。
- 任何一个包有变更，所有包一起升级版本。
- 工具：Lerna fixed mode、Changesets 默认行为。

优点：
- 版本号简单，便于记忆和沟通。
- 发布流程简单。

缺点：
- 没有变更的包也被迫升级，changelog 有噪音。
- 不适合包之间差异大的场景。

适用：
- 内部工具库、UI 组件库等耦合紧密的 Monorepo。

二、Independent Versioning（独立版本）：

- 每个子包独立维护自己的版本号。
- 只有真正变更的包才升级。

优点：
- 版本语义精确，changelog 干净。
- 适合对外发布的独立包。

缺点：
- 版本管理复杂，依赖关系需要小心维护。
- 发布流程更复杂。

适用：
- 通用工具集合，如 lodash 分包、babel 插件集。

**评分维度**：
- 说明两种策略含义（40%）
- 优缺点对比清晰（35%）
- 适用场景正确（25%）

**常见错误**：
- 认为 Fixed Versioning 适合所有 Monorepo
- 忽略 Independent 版本下的依赖同步问题

**口头回答版**：
> Fixed Versioning 是所有包共享一个版本号，发布简单但会有没变更的包也被升级。适合内部组件库这种耦合紧的。Independent 是每个包自己维护版本，精确但复杂，适合对外发布的独立工具包集合。

---

### FB-11-SD-R-021：设计一个企业级 Monorepo 治理方案

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：11 Monorepo
**标签**：Monorepo、治理、架构、标准化、自动化
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个企业级 Monorepo 治理方案，包括目录结构、包规范、CI/CD、发布流程和权限管理。

**参考答案**：

一、目录结构：

```text
root/
  apps/           # 业务应用
  packages/       # 共享库和工具
  tools/          # 构建脚本、代码生成器
  docs/           # 文档
  scripts/        # 根目录脚本
  .github/
  pnpm-workspace.yaml
  turbo.json
```

二、包规范：

1. 每个包必须有 `package.json`、`README.md`、`CHANGELOG.md`。
2. 统一命名规则：`@company/{scope}-{name}`。
3. 通过 `exports` 字段严格控制 public API。
4. 必须声明 `repository`、`license`、`engines`。

三、CI/CD：

1. PR 阶段：affected lint/typecheck/test/build。
2. main 阶段：全量构建 + E2E + 产物分析。
3. 发布阶段：Changesets 自动 version/publish。

四、代码质量：

- 共享 ESLint/Prettier/TSConfig 配置包。
- Husky + lint-staged 提交拦截。
- 依赖图检查，禁止循环依赖。

五、权限与所有权：

- CODEOWNERS 文件分配每个目录的 owner。
- 核心包变更需要架构师 review。
- npm publish 权限通过 CI 自动化 token 控制。

六、文档与新人引导：

- 贡献指南 CONTRIBUTING.md。
- 每个包有 README 和 API 文档。
- 新包创建使用脚手架生成，保证结构一致。

七、度量与改进：

- 监控 install/build 耗时趋势。
- 定期清理无人维护的包。
- 收集开发者满意度，持续优化工具链。

**评分维度**：
- 目录结构设计合理（20%）
- 包规范完整（20%）
- CI/CD 和发布流程清晰（25%）
- 权限和质量治理（20%）
- 度量和持续改进（15%）

**常见错误**：
- 只有规范没有自动化检查
- 权限划分不清导致任何人都能发布核心包

**口头回答版**：
> 企业级 Monorepo 治理要统一目录结构，比如 apps、packages、tools。每个包统一命名、严格 exports、配 README 和 CHANGELOG。CI 分 PR、main、发布三阶段，PR 跑 affected 检查，发布用 Changesets 自动处理。用 CODEOWNERS 分权限，核心包变更要架构师 review。还要监控构建耗时，定期清理无用包。

---

### FB-11-CP-R-019：大型 Monorepo 中的权限和代码所有权如何设计？

**题型**：综合开放题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：11 Monorepo
**标签**：Monorepo、权限、CODEOWNERS、代码所有权、治理
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明大型 Monorepo 中如何设计代码所有权、权限控制和 review 策略，避免协作混乱。

**参考答案**：

一、代码所有权（CODEOWNERS）：

```text
# .github/CODEOWNERS
*                        @platform-team
/apps/web/               @web-team
/apps/admin/             @admin-team
/packages/ui/            @design-system-team
/packages/shared-utils/  @platform-team @architects
```

规则：
- 通用目录由平台团队兜底。
- 业务应用由业务团队负责。
- 共享库由专门团队或架构师共同维护。

二、权限控制：

1. **Git 分支保护**：
   - main 分支禁止直接 push。
   - 必须至少一个 owner 审批。
2. **PR 大小限制**：
   - 使用 Danger.js 或 GitHub Action 限制 PR 行数，防止超大 PR。
3. **发布权限**：
   - npm publish 由 CI 自动化执行，不授予个人 publish 权限。
   - 核心包发布需要额外的审批流程。

三、Review 策略：

- 影响多个包的核心变更需跨团队 review。
- Breaking Change 必须有升级文档和架构师审批。
- 安全相关代码由安全团队 mandatory review。

四、工具集成：

- GitHub CODEOWNERS 自动分配 reviewer。
- Danger.js / custom action 检查 PR 规范。
- Changeset-bot 确保有版本影响的 PR 包含 changeset。

五、文档与培训：

- 明确每个包的 owner 和 SLA。
- 新成员入职学习贡献指南和 review 规范。

**评分维度**：
- CODEOWNERS 使用正确（25%）
- 权限控制策略具体（25%）
- Review 策略合理（25%）
- 工具和培训考虑（25%）

**常见错误**：
- 全仓库只有一个 owner 团队
- 没有分支保护和发布审批

**口头回答版**：
> 大型 Monorepo 用 CODEOWNERS 给不同目录分配 owner，通用目录平台团队兜底，业务目录业务团队负责。main 分支要保护，PR 至少一个 owner 审批，核心包发布要架构师审批。可以 Danger.js 限制 PR 大小，Changeset-bot 检查版本变更。发布权限交给 CI，不给个人 npm publish 权限。

---

### FB-11-SC-R-001：如何设计 Monorepo 的文档和示例站点？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：11 Monorepo
**标签**：Monorepo、文档、Storybook、Docusaurus、示例
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个 Monorepo 内部的文档和示例站点方案，帮助开发者快速理解和使用各个子包。

**参考答案**：

一、文档分层：

1. **根目录文档**：项目介绍、贡献指南、架构概览、快速开始。
2. **包级文档**：每个 `packages/{name}/README.md` 说明 API 和用法。
3. **API 文档**：通过 TypeDoc 自动生成类型文档。
4. **示例文档**：`apps/docs` 或 `examples/` 提供可运行示例。

二、技术选型：

- **静态站点**：Docusaurus、VitePress、Nextra。
- **组件文档**：Storybook，支持组件交互和视觉回归。
- **API 文档**：TypeDoc、API Extractor。
- **搜索**：Algolia DocSearch。

三、自动化：

1. **文档构建纳入 CI**：每次 PR 检查文档是否能正常构建。
2. **自动部署**：main 分支合并后自动部署到内部文档站点。
3. **示例代码可执行**：examples 目录作为独立应用，CI 中跑构建验证。
4. **文档与代码同步**：API 文档从源码类型自动生成，避免手工维护。

四、内容规范：

- 每个组件/工具必须有：功能说明、使用示例、Props/API 列表、变更记录。
- 文档站点支持版本切换，便于查看历史版本用法。

五、互动与反馈：

- 文档页面支持一键跳转到源码。
- 提供问题反馈入口，收集文档改进建议。

**评分维度**：
- 文档分层清晰（30%）
- 技术选型合理（25%）
- 自动化程度高（25%）
- 内容规范和反馈机制（20%）

**常见错误**：
- 文档和源码分离，长期不同步
- 示例代码不可运行，误导使用者

**口头回答版**：
> Monorepo 文档分三层：根目录写整体介绍和贡献指南，每个包写 README，再用 Storybook 做组件文档，TypeDoc 自动生成 API 文档。示例放 examples 目录，作为独立应用跑 CI。文档站点用 Docusaurus 或 VitePress，每次 main 合并自动部署。还要让文档页面能跳转到源码，方便维护。

---

### FB-11-CO-R-001：Monorepo 与 Polyrepo 在长期演进中的取舍

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：11 Monorepo
**标签**：Monorepo、Polyrepo、架构演进、取舍
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请对比 Monorepo 和 Polyrepo 在长期演进中的优缺点，并说明什么情况下应该考虑从一种转向另一种。

**参考答案**：

一、Monorepo 优势：

1. 代码共享容易，公共库修改可原子提交。
2. 全局重构成本低，一次改动影响所有消费方。
3. 统一工具链和 CI/CD，便于治理。
4. 依赖关系清晰，便于做 affected 分析和全局优化。

二、Monorepo 劣势：

1. 规模大了后 install/build 成本高。
2. 权限和所有权管理复杂。
3. 一个包的 bug 可能影响整个仓库 CI。
4. 对工具链要求高（缓存、任务调度）。

三、Polyrepo 优势：

1. 团队自治，独立发布节奏。
2. 仓库规模小，构建快。
3. 权限清晰，团队边界明确。

四、Polyrepo 劣势：

1. 跨仓库改动需要协调多个 PR/发布。
2. 公共库升级慢，版本碎片化。
3. 工具链重复建设。

五、迁移时机：

- **Polyrepo → Monorepo**：
  - 公共代码大量重复，升级困难。
  - 需要频繁跨项目重构。
  - 团队愿意统一工具链。

- **Monorepo → Polyrepo**：
  - 仓库过大，工具链无法支撑。
  - 业务线差异大，需要完全独立演进。
  - 团队对权限和自治要求极高。

六、折中方案：

- 按业务线拆分子 Monorepo（multi-monorepo）。
- 核心公共库独立仓库，通过 npm 版本化发布。

**评分维度**：
- 优劣势分析全面（40%）
- 迁移时机判断合理（30%）
- 能提出折中方案（30%）

**常见错误**：
- 绝对化地认为 Monorepo 一定优于 Polyrepo
- 忽略团队规模和工具链成熟度

**口头回答版**：
> Monorepo 方便代码共享和全局重构，统一工具链，但规模大后构建和权限管理复杂。Polyrepo 团队自治、构建快，但公共库升级和跨项目改动麻烦。选择看团队规模、代码共享需求和工具链成熟度。折中可以按业务线拆分子 Monorepo，核心库单独仓库发布。

---

### FB-11-EN-R-001：如何设计 Monorepo 的发布火车？

**题型**：工程化题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：11 Monorepo
**标签**：Monorepo、发布火车、CI/CD、版本管理
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个 Monorepo 的发布火车机制，实现定期、可预测、低风险的版本发布。

**参考答案**：

一、发布火车概念：

发布火车（Release Train）是按固定节奏（如每周、每两周）将累积的变更打包发布。所有要上车的变更必须在发车前合并并通过验证。

二、Monorepo 发布火车设计：

1. **发布周期**：
   - 每周二固定发版，周四前截止上车。
   - 紧急 hotfix 可随时发车。

2. **发布分支**：
   - `main` 为日常开发分支。
   - `release/{date}` 为发布分支，从 main 切出后冻结非发布变更。

3. **变更收集**：
   - 通过 Changesets 统计周期内所有未消费 changeset。
   - 自动计算版本升级和生成 changelog。

4. **验证阶段**：
   - 在 release 分支跑全量测试、E2E、性能回归。
   - 生成发布候选版（RC），供业务方验证。

5. **发布执行**：
   - RC 验证通过后，合并到 `stable` 或打 tag。
   - CI 自动 publish 到 npm 并部署文档。

6. **回滚机制**：
   - 保留上一个稳定版本的 tag。
   - 如发现问题，可快速基于上一个 tag 重新发布。

三、工具支持：

- Changesets 管理版本和 changelog。
- GitHub Actions 调度发布流程。
- Slack/企业微信通知发布状态。

四、风险控制：

- 发布前必须有发布负责人审批。
- 核心包 Breaking Change 不能随常规火车发布，需单独安排迁移窗口。

**评分维度**：
- 发布周期和分支策略清晰（30%）
- 变更收集和验证流程具体（30%）
- 发布执行和回滚机制（25%）
- 风险控制和工具集成（15%）

**常见错误**：
- 发布火车没有固定节奏，变成“想发就发”
- 紧急修复和常规发布混用同一流程

**口头回答版**：
> 发布火车就是按固定周期把变更打包发布。比如每周二发版，周四截止上车。从 main 切 release 分支，用 Changesets 汇总变更、算版本、生成 changelog，然后跑全量测试和 RC 验证。通过后用 CI publish 到 npm，保留上一个稳定 tag 方便回滚。紧急 hotfix 单独发车，不要和常规火车混在一起。

---
