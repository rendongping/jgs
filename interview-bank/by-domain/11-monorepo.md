# Monorepo 面试题

> 本文件收录 Monorepo 相关面试题，目标题量 80 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、工程化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#基础题)
- [进阶题](#进阶题)
- [深入题](#深入题)
- [架构题](#架构题)

---

## 基础题

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

---
## 进阶题

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

---
## 深入题

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

---
## 架构题

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

---
