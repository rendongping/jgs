# 包管理与供应链安全面试题

> 本题库共收录 **90** 道面试题（基础 24 / 进阶 24 / 深入 21 / 架构 21）。
> 本文件收录包管理（Package Management）与供应链安全（Supply Chain Security）相关面试题，目标题量 30 道。
> 题型覆盖：概念题、代码分析题、场景设计题、系统设计题、工程化题、安全题、性能优化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-23-CO-B-001：npm、yarn 与 pnpm 的核心区别是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：npm、yarn、pnpm、包管理器、node_modules
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 npm、yarn（Classic/Berry）与 pnpm 三家主流包管理器在依赖安装、磁盘占用、node_modules 结构等方面的核心差异。

**参考答案**：

| 维度 | npm | yarn Classic | yarn Berry（PnP/Plug'n'Play） | pnpm |
|------|-----|--------------|-------------------------------|------|
| 依赖存储 | 每个项目独立 `node_modules` | 每个项目独立，扁平化 | 全局缓存 + `.pnp.cjs` 映射 | 全局 content-addressable store |
| 结构 | 嵌套 / 部分扁平（v5+） | 扁平化 | 无 `node_modules`，以 zip 缓存 | 严格的软链 / hard link 结构 |
| 磁盘占用 | 大，重复多 | 较大 | 小 | 最小，依赖不重复 |
| 安装速度 | 一般 | 较快 | 快 | 很快 |
| lockfile | `package-lock.json` | `yarn.lock` | `yarn.lock` + `.pnp.cjs` | `pnpm-lock.yaml` |
| workspace | 支持 | 支持 | 支持 | 支持 |
| 幽灵依赖 | 容易出现 | 容易出现 | 基本杜绝 | 基本杜绝 |

- **npm**：生态最成熟，v5 引入 `package-lock.json`，v7 支持 workspaces，v9 调整 lockfile 格式。默认会尽量提升依赖，容易产生 phantom dependencies。
- **yarn Classic**：引入 lockfile 和离线缓存，扁平化 `node_modules` 提升了安装速度，但同样存在幽灵依赖问题。
- **yarn Berry**：默认 PnP 模式，不复制文件到 `node_modules`，通过 `.pnp.cjs` 直接映射到全局 zip 缓存；`nodeLinker: node-modules` 可回退传统结构。
- **pnpm**：使用全局 store 和硬链接，项目内只保留直接依赖的可见性，依赖树严格，节省磁盘、避免幽灵依赖。

最佳实践：
- 大型 Monorepo 优先考虑 pnpm + workspace。
- 需要兼容旧工具链时可选 yarn Classic 或 npm。
- 想极致去重并杜绝幽灵依赖可尝试 yarn Berry PnP。

**评分维度**：
- 能说出三种包管理器在存储/结构上的差异（40%）
- 能解释 lockfile、workspace、幽灵依赖等关键概念（30%）
- 能给出选型建议（30%）

**常见错误**：
- 认为 yarn 只是 npm 的换皮，忽略 lockfile、PnP、缓存等差异。
- 认为 pnpm 只是“快”，没理解其 content-addressable store 与 hard link 机制。
- 混淆 yarn Classic 与 yarn Berry（PnP）的 node_modules 行为。

**延伸追问**：
- 为什么 pnpm 能解决 phantom dependencies？
- yarn Berry 的 PnP 模式对 IDE、Jest、Docker 构建有什么影响？

**相关题目**：
- [FB-23-CO-B-007 什么是幽灵依赖](#FB-23-CO-B-007)
- [FB-23-CO-A-010 node_modules 结构差异](#FB-23-CO-A-010)

**参考资源**：
- [npm Docs - About npm](https://docs.npmjs.com/about-npm)
- [pnpm Motivation](https://pnpm.io/motivation)
- [Yarn - Plug'n'Play](https://yarnpkg.com/features/pnp)

**口头回答版**：
> npm、yarn 和 pnpm 最大的区别在于怎么存依赖。npm 是每个项目一份 node_modules，v7 以后扁平化，但容易产生幽灵依赖。yarn Classic 也是传统 node_modules，但引入了 yarn.lock 和缓存。yarn Berry 默认走 PnP，不复制 node_modules，而是用一个 .pnp.cjs 映射到全局 zip 缓存。pnpm 用全局 store 加硬链接，项目里只放直接依赖，结构严格、省磁盘、没有幽灵依赖。大型 Monorepo 我一般会选 pnpm。

---

### FB-23-CO-B-002：`dependencies`、`devDependencies` 与 `peerDependencies` 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：package.json、dependencies、devDependencies、peerDependencies
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `package.json` 中 `dependencies`、`devDependencies` 与 `peerDependencies` 三者的区别、安装时机与使用场景。

**参考答案**：

- **`dependencies`**：运行时依赖，打包/部署后仍需存在。例如 `react`、`lodash`、`axios`。
- **`devDependencies`**：开发时依赖，通常不进入生产产物。例如 `webpack`、`jest`、`eslint`、`typescript`。
- **`peerDependencies`**：宿主依赖，表示“我的包需要与宿主项目共用某个依赖，请宿主自己安装”。例如 React 插件会把 `react` 声明为 peerDependency。

安装行为差异：

| 场景 | dependencies | devDependencies | peerDependencies |
|------|--------------|-----------------|------------------|
| `npm install` | 安装 | 安装 | 不自动安装（npm 7+ 默认安装，可关闭） |
| 生产包（`npm ci --production`） | 安装 | 不安装 | 安装（若声明） |
| 库发布 | 作为传递依赖 | 不传递 | 提醒宿主安装 |

`peerDependenciesMeta` 可标记可选 peer：

```json
{
  "peerDependencies": {
    "react": ">=16.8.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    }
  }
}
```

最佳实践：
- 库作者别把框架本身放进 `dependencies`，否则会造成多版本共存。
- CLI/工具可放 `devDependencies`；运行时库必须放 `dependencies`。
- 用 `peerDependencies` 表达“插件需要宿主提供某依赖”的语义。

**评分维度**：
- 能准确区分三类依赖的语义（50%）
- 能说明安装时机和传递性（30%）
- 能举例说明 peerDependencies 的使用场景（20%）

**常见错误**：
- 认为 `devDependencies` 完全不会被安装到生产环境就掉以轻心，忽略 CI 中可能的误装。
- 把 React/Vue 等宿主依赖写进库的 `dependencies`，导致多版本冲突。
- 不清楚 npm 7+ 默认安装 peerDependencies 的行为变化。

**延伸追问**：
- 如果一个库把 `react` 放进 dependencies，会发生什么？
- `optionalDependencies` 和 `peerDependenciesMeta.optional` 有什么区别？

**相关题目**：
- [FB-23-CO-B-006 peerDependencies 的作用](#FB-23-CO-B-006)
- [FB-23-CO-P-019 依赖地狱与版本冲突](#FB-23-CO-P-019)

**参考资源**：
- [npm Docs - package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [Node.js - peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies)

**口头回答版**：
> dependencies 是运行时依赖，打包后还要用；devDependencies 是开发工具，像 webpack、eslint；peerDependencies 是宿主依赖，意思是“我这是个插件，需要宿主项目自己安装 react”。如果库把 react 写进 dependencies，就可能和宿主版本冲突。npm 7 以后 peerDependencies 默认会安装，但库作者还是要正确声明。

---

### FB-23-CO-B-003：SemVer 版本号规则是什么？`^`、`~`、`*` 分别代表什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：SemVer、版本号、依赖范围、语义化版本
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 SemVer（Semantic Versioning）的版本号格式，以及 `^`、`~`、`*`、`>` 等范围符号的含义与实际匹配示例。

**参考答案**：

SemVer 格式为 `MAJOR.MINOR.PATCH`，例如 `2.3.1`：

- **MAJOR**：主版本号，做了不兼容的 API 修改时递增。
- **MINOR**：次版本号，做了向下兼容的功能新增时递增。
- **PATCH**：修订号，做了向下兼容的问题修复时递增。

常见范围符号：

| 符号 | 含义 | 示例 `2.3.1` 可匹配 |
|------|------|-------------------|
| `^2.3.1` | 兼容次要版本和补丁，允许 >= 2.3.1 < 3.0.0 | 2.3.1, 2.4.0 |
| `~2.3.1` | 只允许补丁更新，>= 2.3.1 < 2.4.0 | 2.3.2, 2.3.9 |
| `2.3.1` | 精确版本 | 仅 2.3.1 |
| `*` | 任意版本 | 任意 |
| `>=2.3.1 <3.0.0` | 显式范围 | 2.3.1, 2.9.9 |
| `^0.2.3` | 0.x 版本视为不稳定，只允许 >= 0.2.3 < 0.3.0 | 0.2.4 |
| `~0.2.3` | 0.x 时只允许 >= 0.2.3 < 0.3.0 | 0.2.4 |

注意：
- `^` 在 `0.x.x` 时等价于 `~`，因为 0.x 被视为不稳定 API。
- `~` 更保守，常用于只接受 bugfix 的场景。
- lockfile 会把实际解析版本固定下来，避免范围带来的不确定性。

最佳实践：
- 生产库推荐用 `^` 或精确版本。
- 对核心依赖可锁定精确版本，避免自动升级导致构建失败。
- 配合 lockfile 使用，既保留范围灵活性，又保证可复现构建。

**评分维度**：
- 能解释 MAJOR/MINOR/PATCH 含义（30%）
- 能区分 `^`、`~`、`*` 的匹配范围（40%）
- 能说明 0.x 版本的特殊性与最佳实践（30%）

**常见错误**：
- 认为 `^2.3.1` 会匹配到 `3.0.0`。
- 认为 `~` 和 `^` 完全一样。
- 忽视 0.x 版本下 `^` 的保守行为。

**延伸追问**：
- `package.json` 里写 `^1.2.3`，lockfile 里可能是什么版本？
- 如果某个依赖发布了不兼容的 minor 更新，如何快速回滚？

**相关题目**：
- [FB-23-CO-B-004 什么是 lockfile](#FB-23-CO-B-004)
- [FB-23-CA-P-022 依赖版本冲突分析](#FB-23-CA-P-022)

**参考资源**：
- [SemVer 官方规范](https://semver.org/lang/zh-CN/)
- [npm Docs - Semver](https://docs.npmjs.com/cli/v10/using-npm/semver)

**口头回答版**：
> SemVer 是语义化版本，格式 MAJOR.MINOR.PATCH。主版本不兼容改 API，次版本新增功能，补丁版本修 bug。`^2.3.1` 表示 >= 2.3.1 且 < 3.0.0，允许小版本和补丁；`~2.3.1` 表示 >= 2.3.1 且 < 2.4.0，只接受补丁；`*` 是任意版本。0.x 版本被认为不稳定，`^0.2.3` 其实只匹配 0.2.x。

---

### FB-23-CO-B-004：什么是 lockfile？为什么需要它？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：lockfile、package-lock.json、yarn.lock、pnpm-lock.yaml
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释包管理器生成的 lockfile 是什么，它解决了什么问题？对比 npm、yarn、pnpm 的 lockfile 文件名与关键字段。

**参考答案**：

lockfile 是包管理器在解析依赖后生成的快照文件，记录了每个依赖的精确版本、下载地址、完整性校验值（integrity）以及依赖树结构。

解决的问题：

1. **构建可复现性**：`package.json` 中的版本范围允许灵活解析，lockfile 锁定实际版本，保证不同机器、不同时间安装结果一致。
2. **避免意外破坏**：防止依赖发布不兼容的 patch/minor 更新后，团队 CI 直接拉取到新版而失败。
3. **加速安装**：lockfile 已包含解析结果，安装时无需重新计算依赖树。
4. **安全审计**：可基于 lockfile 逐包校验 integrity，发现篡改。

三种 lockfile 对比：

| 包管理器 | 文件名 | 关键字段/特性 |
|----------|--------|--------------|
| npm | `package-lock.json` | `lockfileVersion`、`packages`、`dependencies`、`resolved`、`integrity` |
| yarn Classic | `yarn.lock` | 以依赖名+版本为 key，记录 `version`、`resolved`、`integrity` |
| yarn Berry | `yarn.lock` | 包含 `resolution`、`checksum`、`languageName`、`linkType` |
| pnpm | `pnpm-lock.yaml` | YAML 格式，`specifiers`、`dependencies`、`packages`、`resolution`、`integrity` |

最佳实践：
- lockfile 必须提交到 Git。
- 不要手动修改 lockfile，应通过包管理器命令更新。
- CI 中使用 `npm ci`、`yarn install --frozen-lockfile`、`pnpm install --frozen-lockfile` 保证严格一致。

**评分维度**：
- 能说明 lockfile 的核心作用（40%）
- 能列出至少 3 个解决的问题（30%）
- 能对比不同包管理器的 lockfile（30%）

**常见错误**：
- 认为 lockfile 只是“加快安装”，忽略可复现性和安全审计价值。
- 把 lockfile 加入 `.gitignore`。
- 在 CI 中使用 `npm install` 而非 `npm ci`，导致 lockfile 被意外更新。

**延伸追问**：
- `npm ci` 和 `npm install` 对 lockfile 的处理有什么区别？
- 如果 lockfile 和 package.json 不一致，应该怎么办？

**相关题目**：
- [FB-23-CO-A-012 lockfile 安全与完整性校验](#FB-23-CO-A-012)
- [FB-23-EN-A-016 CI 缓存策略](#FB-23-EN-A-016)

**参考资源**：
- [npm Docs - package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- [pnpm - pnpm-lock.yaml](https://pnpm.io/git#lockfiles)

**口头回答版**：
> lockfile 就是依赖安装后的快照，记录了每个包的具体版本、下载地址和完整性校验。因为 package.json 里写的版本是范围，比如 `^1.2.0`，不同时间安装可能装到不同版本，lockfile 就是锁定实际版本，保证大家装出来一样。npm 叫 package-lock.json，yarn 叫 yarn.lock，pnpm 叫 pnpm-lock.yaml。lockfile 一定要提交到 Git，CI 里要用 frozen-lockfile 安装。

---

### FB-23-CO-B-005：执行 `npm install` 后，node_modules 里发生了什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：npm install、依赖解析、node_modules、安装流程
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请描述执行 `npm install` 时，包管理器从读取 `package.json` 到生成 `node_modules` 的完整流程。

**参考答案**：

以 npm 为例，安装流程大致如下：

1. **读取配置**：读取 `.npmrc`、环境变量、CLI 参数，确定 registry、代理、缓存目录等。
2. **解析 `package.json`**：收集 `dependencies`、`devDependencies`、`optionalDependencies`、`peerDependencies` 等声明。
3. **构建依赖树**：
   - 检查是否有 lockfile，有则优先按 lockfile 解析。
   - 没有 lockfile 则根据版本范围向 registry 查询可用版本。
   - 递归解析每个依赖的依赖，处理版本冲突（deduplication、hoist 等策略）。
4. **下载包**：从 registry 下载 tarball，写入本地缓存（如 `~/.npm`）。
5. **执行生命周期脚本**：按顺序运行 `preinstall`、`install`、`postinstall`、`preprepare`、`prepare`、`postprepare` 等。
6. **写入 `node_modules`**：将包解压/链接到项目 `node_modules`。
7. **生成/更新 lockfile**：如果是 `npm install`，会更新 `package-lock.json`；`npm ci` 则只按 lockfile 安装不更新。

关键命令对比：

```bash
npm install          # 解析并可能更新 lockfile
npm ci               # 严格按 lockfile 安装，清空 node_modules
npm install --package-lock-only  # 只更新 lockfile，不安装
```

安全注意：
- `postinstall` 脚本会在安装时执行任意代码，是供应链攻击常见入口。
- 可通过 `npm config set ignore-scripts true` 或 `--ignore-scripts` 临时禁用。

**评分维度**：
- 能按顺序描述安装主要阶段（40%）
- 能说明 lockfile 在解析中的作用（25%）
- 能提到生命周期脚本与安全风险（20%）
- 能区分 install 与 ci（15%）

**常见错误**：
- 只说“下载包到 node_modules”，忽略解析、缓存、生命周期脚本等阶段。
- 认为 `npm install` 和 `npm ci` 完全相同。
- 不知道 `postinstall` 脚本的安全风险。

**延伸追问**：
- `npm install` 时如何决定使用缓存还是重新下载？
- 为什么安装第三方包时会被执行恶意脚本？

**相关题目**：
- [FB-23-CO-B-004 什么是 lockfile](#FB-23-CO-B-004)
- [FB-23-SE-A-013 供应链攻击常见手段](#FB-23-SE-A-013)

**参考资源**：
- [npm Docs - npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm Docs - npm ci](https://docs.npmjs.com/cli/v10/commands/npm-ci)

**口头回答版**：
> 执行 npm install 时，先读取配置和 package.json，然后解析依赖树，有 lockfile 就按 lockfile，没有就向 registry 查版本并递归解析。接着下载包到本地缓存，执行 preinstall、install、postinstall 这些生命周期脚本，最后把包写到 node_modules 并更新 lockfile。npm ci 不同，它严格按 lockfile 装，不会更新 lockfile，而且会先清空 node_modules。要特别注意 postinstall 脚本，安装时就会执行代码，是供应链攻击的入口。

---

### FB-23-CO-B-006：`peerDependencies` 的作用是什么？什么情况下应该使用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：peerDependencies、插件、宿主依赖、版本兼容
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `peerDependencies` 的设计目的，举例说明哪些类型的包应该使用它，以及 npm 7+ 对它的行为变化。

**参考答案**：

`peerDependencies` 用于表达“我的包需要宿主项目提供某个依赖，并且希望与宿主使用同一版本”。它最典型的场景是**插件/扩展库**：

- `react-router` 需要宿主项目安装 `react`。
- `eslint-plugin-react` 需要宿主项目安装 `eslint`。
- `webpack-loader` 需要宿主项目安装 `webpack`。

如果不使用 peerDependencies，而是把 `react` 写进 `dependencies`，会导致：

1. 插件自己安装一份 `react`，与宿主版本不一致。
2. 两个 React 实例同时存在，可能引发 Hook 规则错误、Context 失效等问题。
3. 包体积无谓增大。

npm 7+ 行为变化：

- npm 7 之前：peerDependencies 不会自动安装，缺失时只报警告。
- npm 7+：默认会自动安装 peerDependencies，若版本冲突则安装失败。
- 可通过 `--legacy-peer-deps` 回退旧行为，或通过 `peerDependenciesMeta` 标记可选。

```json
{
  "peerDependencies": {
    "react": ">=16.8.0 <19.0.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    }
  }
}
```

最佳实践：
- 插件/工具库必须把宿主依赖声明为 peerDependencies。
- 对可选 peer，使用 `peerDependenciesMeta.optional`。
- 发布前用 `npm pack` 检查最终 package.json 是否正确。

**评分维度**：
- 能说明 peerDependencies 的“共用宿主依赖”语义（40%）
- 能举例说明使用场景（30%）
- 能说明 npm 7+ 的行为变化与应对（30%）

**常见错误**：
- 把 peerDependencies 当成普通 dependencies 使用。
- 不知道 npm 7+ 会自动安装 peerDependencies。
- 插件没有声明 peerDependencies，导致多版本冲突。

**延伸追问**：
- 如果两个插件对同一个 peerDependency 要求不同版本，npm 会怎么处理？
- `peerDependencies` 和 `optionalDependencies` 有什么本质区别？

**相关题目**：
- [FB-23-CO-B-002 dependencies 与 devDependencies](#FB-23-CO-B-002)
- [FB-23-CO-P-019 依赖地狱与版本冲突](#FB-23-CO-P-019)

**参考资源**：
- [npm Docs - peerDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies)
- [Node.js - peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies)

**口头回答版**：
> peerDependencies 的意思是“我这个包需要宿主项目提供某个依赖，并且希望和宿主用同一个版本”。最典型的就是插件，比如 react-router 需要宿主安装 react。如果插件把 react 写进自己的 dependencies，就会多装一份 react，导致版本冲突、Context 失效。npm 7 之前 peerDependencies 不会自动安装，只报警告；npm 7 以后默认会自动安装，有冲突会报错，可以用 --legacy-peer-deps 或者 peerDependenciesMeta.optional 来处理。

---

### FB-23-CO-B-007：什么是幽灵依赖（phantom dependencies）？它有什么危害？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：phantom-dependencies、幽灵依赖、node_modules、依赖扁平化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释什么是 phantom dependencies（幽灵依赖），说明它是如何产生的，以及会带来哪些问题。哪些包管理器可以避免？

**参考答案**：

幽灵依赖指的是：项目代码中直接 `import` 了某个包，但这个包并没有在 `package.json` 的 `dependencies`/`devDependencies` 中显式声明。它之所以能运行，是因为被其他依赖间接安装到了 `node_modules` 顶层（hoisting），从而被项目代码“蹭到”。

产生原因：

- npm/yarn Classic 为了节省磁盘和路径长度，会把共享依赖提升到 `node_modules` 顶层。
- 例如项目依赖了 `A`，`A` 又依赖了 `B`，如果 `B` 被 hoisting 到顶层，项目代码就可以 `import 'B'`，即使 `package.json` 里没有 `B`。

危害：

1. **不可移植**：换一台机器、换一个包管理器、升级某个依赖后，B 可能被放到不同位置，代码直接报错 `Cannot find module`。
2. **隐式耦合**：项目与 B 的真实版本关系不可见，难以维护。
3. **安全风险**：无法对未声明的依赖做审计、更新、许可证检查。
4. **Monorepo 问题**：子包之间互相引用幽灵依赖，破坏隔离性。

避免方案：

- **pnpm**：使用严格的依赖隔离，只有直接依赖出现在项目 `node_modules` 顶层，间接依赖只能通过 `.pnpm` 访问。
- **yarn Berry PnP**：没有传统 `node_modules`，依赖必须通过 `.pnp.cjs` 显式映射。
- **ESLint 插件**：使用 `eslint-plugin-import` 的 `no-extraneous-dependencies` 规则检测未声明依赖。

最佳实践：
- 所有被代码直接引用的包都应在 `package.json` 中显式声明。
- 在 Monorepo 中开启 pnpm 的 `strict-peer-dependencies` 与依赖隔离。

**评分维度**：
- 能解释幽灵依赖的产生机制（40%）
- 能说明至少 3 个危害（30%）
- 能指出 pnpm/yarn Berry 如何避免（30%）

**常见错误**：
- 把幽灵依赖和循环依赖混淆。
- 认为只要代码能跑就没问题。
- 不知道 pnpm 的严格依赖树如何杜绝幽灵依赖。

**延伸追问**：
- pnpm 为什么能做到没有幽灵依赖？它的 node_modules 结构长什么样？
- 如何扫描并修复项目中的幽灵依赖？

**相关题目**：
- [FB-23-CO-B-001 npm/yarn/pnpm 区别](#FB-23-CO-B-001)
- [FB-23-CO-A-010 node_modules 结构差异](#FB-23-CO-A-010)

**参考资源**：
- [pnpm - Phantom dependencies](https://pnpm.io/next/blog/2020-05-27/flat-node-modules-is-not-the-only-way)
- [Rush Stack - Phantom dependencies](https://rushstack.io/pages/advanced/phantom_deps/)

**口头回答版**：
> 幽灵依赖就是代码里直接 import 了一个包，但 package.json 里并没有声明它。它之所以能用，是因为 npm 和 yarn Classic 会把间接依赖提升到 node_modules 顶层。问题是这个包什么时候被提升、什么版本都不受你控制，换个环境可能就找不到了，也不好做安全审计。pnpm 和 yarn Berry 的 PnP 能避免这个问题，因为它们不会让间接依赖随随便便就被顶层代码引用。

---

### FB-23-CO-B-008：`npm audit` 是什么？如何用它做依赖安全审计？

**题型**：概念题 / 工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：npm audit、依赖审计、安全漏洞、CVE
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍 `npm audit` 的作用、输出解读以及修复流程。它的局限性是什么？

**参考答案**：

`npm audit` 是 npm 内置的依赖安全审计工具，它会将 lockfile 中的依赖树与 npm Security Advisory 数据库比对，列出已知漏洞（CVE），并给出严重等级（critical/high/moderate/low）和修复建议。

常用命令：

```bash
npm audit                      # 扫描所有依赖
npm audit --audit-level=high   # 只显示 high 及以上
npm audit fix                  # 自动升级补丁版本和小版本
npm audit fix --force          # 强制升级，可能破坏兼容性
npm audit --json               # 输出 JSON，便于 CI 集成
```

输出关键字段：

- `Severity`：漏洞等级（critical / high / moderate / low）。
- `Vulnerable Versions`：受影响的版本范围。
- `Patched Versions`：已修复的版本。
- `Dependency Of`：漏洞位于哪条依赖路径上。
- `Exploitability`：是否已有公开利用方式。

修复流程：

1. 运行 `npm audit` 查看漏洞报告。
2. 优先处理 critical/high 漏洞。
3. 尝试 `npm audit fix` 自动修复补丁级问题。
4. 对无法自动修复的，手动升级依赖或寻找替代方案。
5. 在 CI 中集成 `npm audit --audit-level=high` 或 `audit-ci` 等工具。

局限性：

- 只能发现已收录到 npm advisory 的漏洞，0-day 无法覆盖。
- 对开发依赖（devDependencies）的漏洞可能误报或忽略。
- 自动修复可能引入破坏性变更。
- 不分析代码实际是否调用了漏洞函数（需结合 SCA 工具）。

最佳实践：
- 将 `npm audit` 加入 CI pipeline，设置阈值阻断构建。
- 对 false positive 建立豁免清单。
- 结合 Snyk、Dependabot、OSV 等工具做更全面扫描。

**评分维度**：
- 能说明 npm audit 的基本原理和命令（40%）
- 能解读输出并给出修复流程（30%）
- 能指出局限性和替代工具（30%）

**常见错误**：
- 认为 `npm audit` 能发现所有安全问题。
- 盲目使用 `npm audit fix --force` 导致项目崩溃。
- 忽视 devDependencies 的漏洞风险。

**延伸追问**：
- 如何在 CI 中安全地使用 `npm audit`？
- 如果某个漏洞没有补丁版本，你会怎么处理？

**相关题目**：
- [FB-23-SE-A-013 供应链攻击常见手段](#FB-23-SE-A-013)
- [FB-23-SD-R-025 供应链安全防御体系](#FB-23-SD-R-025)

**参考资源**：
- [npm Docs - npm audit](https://docs.npmjs.com/cli/v10/commands/npm-audit)
- [npm Security Advisories](https://www.npmjs.com/advisories)

**口头回答版**：
> npm audit 是 npm 自带的依赖安全扫描工具，它会把 lockfile 里的依赖和 npm 的漏洞数据库比对，列出已知 CVE 漏洞和修复建议。常用命令有 npm audit、npm audit fix、npm audit --json。输出会显示漏洞等级、影响版本、依赖路径。修复时先处理 high 和 critical，尝试自动修复，不行就手动升级。但它只能发现已收录的漏洞，自动修复也可能带来破坏性变更，CI 里要结合阈值使用，也可以配合 Snyk、Dependabot。


---

## 进阶题（8 道）{#advanced}

### FB-23-CO-A-009：包管理器的依赖解析算法与 deduplication 机制是怎样的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：依赖解析、deduplication、版本冲突、依赖树
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述包管理器如何解析依赖树、处理版本冲突，以及 deduplication（去重）策略。不同包管理器在去重上有什么差异？

**参考答案**：

依赖解析算法大致流程：

1. **构建依赖图**：从 `package.json` 出发，递归读取每个包的 `package.json`，收集所有依赖及其版本范围。
2. **版本求解（Version Solving）**：对每个依赖名，找出一个或多个版本满足所有约束。常用算法包括：
   - npm/yarn Classic：基于 SAT/回溯的约束求解，尽量在满足条件的前提下复用已安装版本。
   - yarn Berry：使用 optimized constraint solver，追求最小化重复。
   - pnpm：采用“严格依赖树”，只在子树内部求解，不随意提升。
3. **去重（deduplication）**：如果多个包都依赖同一版本的 `lodash`，包管理器会尽量只保留一份，通过 hoisting 或 hard link 复用。

不同管理器差异：

| 管理器 | 去重策略 | 特点 |
|--------|---------|------|
| npm | 扁平化 + lockfile | 尽量把兼容版本提升到顶层，可能引入幽灵依赖 |
| yarn Classic | 扁平化 + 缓存 | 类似 npm，安装更快，去重效果较好 |
| yarn Berry PnP | 全局 zip 缓存 | 所有项目共享缓存，天然去重 |
| pnpm | 全局 store + hard link | 同版本只存一份，项目内通过链接复用 |

版本冲突示例：

```text
app
├── A@1.0.0 -> lodash@^4.17.0
└── B@1.0.0 -> lodash@^4.17.21
```

如果 lodash 的最新 4.x 满足两者，通常只安装一份 `lodash@4.17.21`；如果 A 要求 `lodash@^3` 而 B 要求 `lodash@^4`，则会安装两个版本。

最佳实践：
- 定期检查 `npm ls {package}` 或 `pnpm why {package}` 查看重复版本。
- 使用 `resolutions`（yarn）或 `overrides`（npm/pnpm）强制统一版本。
- 在 Monorepo 中保持子包依赖版本一致，减少冲突。

**评分维度**：
- 能描述依赖树构建与版本求解过程（35%）
- 能解释 deduplication 与 hoisting 的关系（30%）
- 能对比不同包管理器的去重策略（25%）
- 能给出排查重复依赖的命令（10%）

**常见错误**：
- 认为 deduplication 就是删除重复文件，忽略版本兼容性约束。
- 认为所有包管理器都会把相同版本放到顶层。
- 不知道 `resolutions`/`overrides` 的存在。

**延伸追问**：
- 如果 A 和 B 依赖同一库的不同 major 版本，node_modules 会怎么组织？
- pnpm 的 `shamefully-hoist` 是做什么的？

**相关题目**：
- [FB-23-CO-B-007 幽灵依赖](#FB-23-CO-B-007)
- [FB-23-CO-P-019 依赖地狱与版本冲突](#FB-23-CO-P-019)

**参考资源**：
- [npm Docs - Dedupe](https://docs.npmjs.com/cli/v10/commands/npm-dedupe)
- [yarn - Constraint](https://yarnpkg.com/features/constraints)
- [pnpm - Dependency resolution](https://pnpm.io/how-peers-are-resolved)

**口头回答版**：
> 包管理器解析依赖时，会从 package.json 出发递归读取每个包的依赖，构建依赖图，然后做版本求解，尽量找出一个满足所有版本范围的版本。如果有多个包依赖同一个兼容版本，就会做 deduplication，只装一份。npm 和 yarn Classic 是通过扁平化 hoisting 到顶层来实现；pnpm 用全局 store 加硬链接，同版本只存一次；yarn Berry PnP 用全局 zip 缓存。如果两个包依赖同一个库的不同 major 版本，就会各自保留一份。

---

### FB-23-CO-A-010：npm、yarn Classic、yarn Berry PnP 与 pnpm 的 node_modules 结构有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：node_modules、包管理器、pnpm、yarn-pnp、结构对比
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 npm、yarn Classic、yarn Berry PnP 与 pnpm 四种方案下 `node_modules` 的物理结构，分析它们对磁盘占用、幽灵依赖、构建兼容性的影响。

**参考答案**：

### npm（v5 以后）

采用**部分扁平化**结构：

```text
node_modules/
├── A/
├── B/
├── C/      <-- 被 A 依赖，也被提升上来
└── D/      <-- 被 B 依赖
```

- 尽量把兼容版本提升到顶层，减少重复。
- 子依赖仍可能嵌套在父包下（当版本冲突时）。
- 容易产生幽灵依赖。

### yarn Classic

与 npm 类似，也是**扁平化**结构，但通过全局缓存和并行安装提升速度。

```text
node_modules/
├── A/
├── B/
└── lodash/
    └── ...
```

### yarn Berry PnP

默认**没有传统 `node_modules`**：

```text
.pnp.cjs
.pnp.loader.mjs
.yarn/cache/
    ├── lodash-npm-4.17.21-...
    └── react-npm-18.2.0-...
```

- 依赖以 zip 形式存于 `.yarn/cache`。
- Node 通过 `.pnp.cjs` 中的映射表解析模块路径。
- 不存在幽灵依赖，但对部分工具链需要适配。

### pnpm

采用**严格依赖树 + 全局 store**：

```text
node_modules/
├── A -> .pnpm/A@1.0.0/node_modules/A
├── B -> .pnpm/B@1.0.0/node_modules/B
└── .pnpm/
    ├── A@1.0.0/node_modules/A
    │   └── C -> .pnpm/C@1.0.0/node_modules/C
    ├── B@1.0.0/node_modules/B
    │   └── C -> .pnpm/C@1.0.0/node_modules/C
    └── C@1.0.0/node_modules/C
```

- 顶层只有直接依赖的软链接。
- 真实文件存于 `.pnpm/{name}@{version}/node_modules/{name}`。
- 通过 hard link 指向全局 store，同版本只存一份。
- 间接依赖对顶层不可见，杜绝幽灵依赖。

对比总结：

| 维度 | npm | yarn Classic | yarn Berry PnP | pnpm |
|------|-----|--------------|----------------|------|
| 磁盘占用 | 大 | 较大 | 小 | 最小 |
| 幽灵依赖 | 易出现 | 易出现 | 无 | 无 |
| 兼容性 | 最好 | 好 | 需适配 | 较好 |
| Monorepo | 支持 | 支持 | 支持 | 优秀 |

最佳实践：
- 传统项目、IDE 兼容性要求高：npm / yarn Classic。
- 大型 Monorepo、磁盘敏感：pnpm。
- 想彻底消除 node_modules 复制：yarn Berry PnP。

**评分维度**：
- 能画出/说明四种 node_modules 结构（40%）
- 能分析对幽灵依赖的影响（25%）
- 能对比磁盘占用和兼容性（25%）
- 能给出选型建议（10%）

**常见错误**：
- 认为 pnpm 的 node_modules 和普通 npm 一样。
- 认为 yarn Berry PnP 完全不需要 node_modules，忽略 `.yarn` 目录。
- 不知道 pnpm 顶层只展示直接依赖。

**延伸追问**：
- 为什么 pnpm 能解决依赖分身（dependency duplication）问题？
- yarn Berry PnP 下如何调试 `require` 路径？

**相关题目**：
- [FB-23-CO-B-001 npm/yarn/pnpm 区别](#FB-23-CO-B-001)
- [FB-23-FS-P-017 pnpm store 原理](#FB-23-FS-P-017)

**参考资源**：
- [pnpm - How modules are resolved](https://pnpm.io/blog/2020/05/27/flat-node-modules-is-not-the-only-way)
- [Yarn - PnP Compatibility Table](https://yarnpkg.com/features/pnp#compatibility-table)

**口头回答版**：
> npm 和 yarn Classic 都是扁平化 node_modules，尽量把依赖提到顶层，容易产生幽灵依赖。yarn Berry PnP 默认没有 node_modules，依赖以 zip 形式存在 .yarn/cache，通过 .pnp.cjs 映射，没有幽灵依赖但部分工具要适配。pnpm 的 node_modules 顶层只有直接依赖的软链接，真实文件在 .pnpm 里，通过硬链接指向全局 store，同版本只存一份，既省磁盘又没有幽灵依赖。大型 Monorepo 我一般选 pnpm。

---

### FB-23-EN-A-011：Monorepo 中的 workspace 如何设计？包管理器 workspace 解决了什么问题？

**题型**：工程化题 / 场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：Monorepo、workspace、依赖管理、跨包引用
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 Monorepo 中 workspace 的概念、配置方式，以及它如何解决跨包依赖、版本统一和重复安装问题。

**参考答案**：

Workspace 允许在一个 Git 仓库中管理多个子包（package），共享一个 lockfile 和 node_modules，子包之间可以相互引用。

主流配置方式：

**npm workspace（v7+）**：

```json
{
  "workspaces": ["packages/*"]
}
```

```bash
npm install -w @scope/pkg-a lodash
npm run build -w @scope/pkg-a
```

**yarn workspace**：

```json
{
  "workspaces": ["packages/*"]
}
```

```bash
yarn workspace @scope/pkg-a add lodash
yarn workspaces run build
```

**pnpm workspace**：

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```bash
pnpm --filter @scope/pkg-a add lodash
pnpm -r run build
```

解决的问题：

1. **统一依赖版本**：所有子包共享 lockfile，避免各项目版本碎片化。
2. **跨包引用**：子包 A 可以通过 `dependencies` 引用子包 B，workspace 会创建软链接或本地映射。
3. **减少重复安装**：公共依赖只安装一份。
4. **原子化变更**：一次 PR 可修改多个相关包并统一发布。

workspace 协议示例（pnpm）：

```json
{
  "dependencies": {
    "@scope/utils": "workspace:*"
  }
}
```

发布时，`workspace:*` 会被替换为实际版本号。

最佳实践：
- 使用 `catalog:` 或统一版本管理策略减少子包版本漂移。
- 结合 Turborepo/Rush/Nx 做任务调度和缓存。
- 对私有包使用 `publishConfig` 控制发布行为。
- 开启 `strict-peer-dependencies=false` 或按需配置，避免 peer 冲突误报。

**评分维度**：
- 能说明 workspace 的核心价值（30%）
- 能写出 npm/yarn/pnpm 中至少一种配置（25%）
- 能解释跨包引用与统一版本机制（25%）
- 能提到与 Turborepo/Nx 等工具的配合（20%）

**常见错误**：
- 把 workspace 等同于简单的“多个项目放一起”。
- 子包版本各自为政，没有统一的 lockfile。
- 跨包引用时写死版本号，而不是用 `workspace:` 协议。

**延伸追问**：
- 在 workspace 中，如何优雅地管理公共依赖的版本？
- 如果子包 A 和子包 B 依赖不同版本的 lodash，workspace 会怎么处理？

**相关题目**：
- [FB-23-SC-R-026 从 0 设计 Monorepo 包管理方案](#FB-23-SC-R-026)
- [FB-23-CO-A-015 tree-shaking 与 sideEffects](#FB-23-CO-A-015)

**参考资源**：
- [pnpm - Workspaces](https://pnpm.io/workspaces)
- [npm Docs - workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [Turborepo](https://turbo.build/repo)

**口头回答版**：
> Workspace 就是在一个仓库里管理多个子包，共享一个 lockfile 和 node_modules。配置方式各管理器不同，npm 和 yarn 是在 package.json 里写 workspaces 数组，pnpm 是单独建一个 pnpm-workspace.yaml。它能统一依赖版本、让子包之间相互引用、减少重复安装。比如 pnpm 里可以用 `workspace:*` 来引用本地子包，发布时会自动替换成真实版本。大型 Monorepo 还会配合 Turborepo 或 Nx 做任务调度和缓存。

---

### FB-23-CO-A-012：lockfile 安全与完整性校验是如何工作的？

**题型**：概念题 / 安全题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：lockfile、integrity、校验、subresource-integrity、安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 lockfile 中的 `integrity` 字段是什么、如何生成、如何验证，以及它在防范供应链攻击中的作用。

**参考答案**：

`integrity` 字段是依赖 tarball 的 Subresource Integrity（SRI）哈希值，通常采用 `sha512-...` 格式。它用于校验下载的包在传输或存储过程中是否被篡改。

生成过程：

1. 包作者发布时，registry 计算 tarball 的 SHA-512 哈希。
2. 包管理器安装时把该哈希写入 lockfile。
3. 后续安装重新下载 tarball 后，计算本地哈希并与 lockfile 中的 `integrity` 比对，一致才写入 node_modules。

示例（package-lock.json）：

```json
{
  "node_modules/lodash": {
    "version": "4.17.21",
    "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
    "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
  }
}
```

安全作用：

1. **防中间人攻击**：即使 registry 或 CDN 被劫持，只要哈希不匹配就会报错。
2. **防本地缓存污染**：缓存文件被篡改时会被检测出来。
3. **防 lockfile 投毒**：如果攻击者修改 lockfile 中的 resolved URL 指向恶意包，integrity 校验会失败。

注意事项：

- `resolved` 指向私有 registry 或镜像时，必须保证镜像也返回正确的 tarball。
- 使用 `--ignore-scripts` 安装后，仍需检查 integrity 是否匹配。
- npm 的 `npm audit signatures` 可验证包的发布签名。

校验失败的处理：

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

最佳实践：
- 禁止手动修改 lockfile 中的 `integrity` 和 `resolved`。
- CI 中使用 `--frozen-lockfile`，发现不一致立即失败。
- 对内部私有包也要求 registry 提供 integrity。

**评分维度**：
- 能解释 integrity 的生成与校验流程（40%）
- 能说明 SRI 在供应链安全中的作用（30%）
- 能给出校验失败时的排查步骤（20%）
- 能提到 npm audit signatures（10%）

**常见错误**：
- 认为 integrity 只是版本号，和 semver 混淆。
- 认为 integrity 校验只发生在 npm publish 时。
- 手动修改 lockfile 后不知道如何恢复。

**延伸追问**：
- 如果 registry 返回的 tarball 哈希和 lockfile 不一致，可能是什么原因？
- npm 的 `audit signatures` 和 `integrity` 有什么区别？

**相关题目**：
- [FB-23-CO-B-004 什么是 lockfile](#FB-23-CO-B-004)
- [FB-23-SE-P-018 Sigstore 与 Provenance](#FB-23-SE-P-018)

**参考资源**：
- [W3C - Subresource Integrity](https://www.w3.org/TR/SRI/)
- [npm Docs - npm audit signatures](https://docs.npmjs.com/cli/v10/commands/npm-audit#audit-signatures)

**口头回答版**：
> lockfile 里的 integrity 是 tarball 的 sha512 哈希，用来校验下载的包有没有被篡改。安装时包管理器会重新算一遍哈希，和 lockfile 里的比对，不一致就报错。它能防中间人攻击、防缓存污染、防 lockfile 投毒。如果校验失败，可以先清缓存、删 node_modules 和 lockfile 再重装。npm 还有 audit signatures 可以验证发布签名，进一步加强安全。

---

### FB-23-SE-A-013：供应链攻击有哪些常见手段？如何防御 typosquatting 与恶意包？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：supply-chain-security、typosquatting、恶意包、依赖安全
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍前端供应链攻击的常见形式，重点说明 typosquatting（名称抢注）和恶意包的攻击原理，以及企业级防御措施。

**参考答案**：

常见供应链攻击形式：

1. **Typosquatting**：注册与流行包名称相近的包名，如 `lodash-es` 与 `loadash-es`，诱导开发者误装。
2. **Dependency confusion / Namespace confusion**：在公共 registry 注册与内部私有包同名的包，利用包管理器优先解析公共包的漏洞。
3. **Malicious package**：正常包被入侵，或在 `postinstall` 脚本中植入恶意代码。
4. **Compromised maintainer account**：维护者账号被盗，攻击者发布带后门的版本。
5. ** Protestware / Sabotage**：维护者故意在代码中加入破坏性逻辑表达抗议。

Typosquatting 防御：

- 使用私有 registry / scope，强制内部包必须使用 `@company/` scope。
- 在 CI 中校验包名拼写，使用 `npm typosquatting` 检测工具。
- 建立内部包白名单，禁止直接安装未审批包。
- 使用 lockfile 并启用 integrity 校验，避免被替换为恶意 tarball。

恶意包防御：

- **安装前**：
  - 审查包来源、作者、下载量、最近更新时间。
  - 使用 Snyk、Socket.dev、OpenSSF Scorecard 等工具做风险评估。
- **安装时**：
  - 默认 `--ignore-scripts`，CI 中禁止执行 `postinstall`。
  - 使用私有 registry 做代理和缓存，控制可安装包范围。
- **安装后**：
  - 运行 `npm audit` / `yarn npm audit` / `pnpm audit`。
  - 对 node_modules 做静态扫描，检测可疑网络调用、文件读写。
  - 限制生产环境运行时的网络/文件权限（如 seccomp、Docker 只读层）。

应急响应：

1. 发现恶意包后立即从 registry 和缓存中移除。
2. 回滚到已知安全版本。
3. 扫描构建产物和运行环境是否已被感染。
4. 复盘并加强审批流程。

**评分维度**：
- 能列举至少 4 种供应链攻击形式（30%）
- 能解释 typosquatting 和恶意包的原理（25%）
- 能从安装前/中/后三个层面给出防御措施（30%）
- 能提到应急响应流程（15%）

**常见错误**：
- 只关注运行时 XSS/CSRF，忽视依赖安装阶段的安全。
- 认为只有小厂会中招，忽略知名包被入侵的案例。
- 不在 CI 中禁用 `postinstall` 脚本。

**延伸追问**：
- 如果内部私有包名和公共包冲突，包管理器会优先装哪个？
- 你如何在团队里落地“依赖审批”流程？

**相关题目**：
- [FB-23-CO-B-008 npm audit](#FB-23-CO-B-008)
- [FB-23-SD-R-025 供应链安全防御体系](#FB-23-SD-R-025)

**参考资源**：
- [OWASP - Software Supply Chain Security](https://owasp.org/www-project-software-supply-chain-integrity/)
- [Snyk - Types of supply chain attacks](https://snyk.io/learn/software-supply-chain-security/)

**口头回答版**：
> 供应链攻击常见有几种：typosquatting 就是注册和知名包很像的名字骗你安装；dependency confusion 是在公共 registry 抢注内部私有包同名；恶意包是在 postinstall 脚本里植入后门；还有维护者账号被盗、protestware 故意破坏。防御上，安装前要审查来源、用 Snyk 等工具评分；安装时默认 --ignore-scripts，用私有 registry 控制范围；安装后跑 audit、做静态扫描。团队里还要建依赖审批和白名单机制。

---

### FB-23-PE-A-014：如何做包体积分析？有哪些常用工具和优化手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：bundle-size、tree-shaking、性能优化、包体积
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍前端项目分析依赖包体积的方法、常用工具，以及减小包体积的具体手段。

**参考答案**：

### 体积分析工具

1. **webpack-bundle-analyzer**：生成交互式 treemap，直观展示每个包占用。

```bash
npm install --save-dev webpack-bundle-analyzer
```

```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

2. **rollup-plugin-visualizer**：Rollup/Vite 项目使用。

```bash
npm install --save-dev rollup-plugin-visualizer
```

```js
import { visualizer } from 'rollup-plugin-visualizer';
export default {
  plugins: [visualizer({ open: true })],
};
```

3. **source-map-explorer**：无需构建工具配置，直接分析 source map。

```bash
npx source-map-explorer dist/**/*.js
```

4. **Import Cost（VS Code 插件）**：实时显示每个 import 的大小。
5. **bundlephobia.com**：在线查询 npm 包体积和依赖树。

### 优化手段

1. **按需引入**：

```js
// 不推荐
import _ from 'lodash';

// 推荐
import debounce from 'lodash/debounce';
```

2. **Tree-shaking**：确保包支持 ESM，构建工具开启 tree-shaking，避免引入整个库。
3. **替换重型库**：如用 `dayjs` 替代 `moment`，用 `nanoid` 替代 `uuid`。
4. **代码分割**：

```js
const Chart = React.lazy(() => import('./Chart'));
```

5. **SideEffects 配置**：在 `package.json` 中正确声明 `sideEffects: false` 或具体文件列表。
6. **依赖去重**：统一版本，避免同一库多版本打包。
7. **移除未使用依赖**：使用 `depcheck` 扫描。

```bash
npx depcheck
```

最佳实践：
- 在 CI 中集成 `bundlesize` 或 `size-limit`，对关键产物设置体积阈值。
- 定期 review 体积报告，关注新增大依赖。
- 对 UI 组件库使用子路径导入或自动按需加载插件。

**评分维度**：
- 能列举至少 3 个体积分析工具（25%）
- 能说明 tree-shaking、sideEffects、代码分割等优化手段（40%）
- 能给出按需引入和替换库的示例（20%）
- 能提到 CI 体积门禁（15%）

**常见错误**：
- 只关注业务代码体积，忽视 node_modules 占比。
- 认为 tree-shaking 自动生效，没有检查库的 ESM 支持。
- 引入整个 lodash 却只用了几个函数。

**延伸追问**：
- 为什么有些库即使支持 ESM，tree-shaking 也不生效？
- 如何设置 CI 体积告警，防止包体积无限增长？

**相关题目**：
- [FB-23-CO-A-015 tree-shaking 与 sideEffects](#FB-23-CO-A-015)
- [FB-23-CP-R-028 大前端团队包管理标准化](#FB-23-CP-R-028)

**参考资源**：
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [bundlephobia](https://bundlephobia.com/)
- [size-limit](https://github.com/ai/size-limit)

**口头回答版**：
> 分析包体积常用工具有 webpack-bundle-analyzer、rollup-plugin-visualizer、source-map-explorer，还有 bundlephobia 在线查。优化手段包括按需引入、tree-shaking、代码分割、替换重型库、正确配置 sideEffects、去重、删无用依赖。比如 lodash 不要整体 import，用哪个函数引哪个。CI 里可以接 bundlesize 或 size-limit，设置体积阈值，超过就阻断。

---

### FB-23-CO-A-015：`tree-shaking` 是什么？`sideEffects` 字段如何影响它？

**题型**：概念题 / 性能优化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：tree-shaking、sideEffects、ESM、死代码消除
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 `tree-shaking` 的原理，以及 `package.json` 中 `sideEffects` 字段对 tree-shaking 的影响。如何验证一个库是否支持 tree-shaking？

**参考答案**：

Tree-shaking 是构建工具通过**静态分析 ESM 的 import/export**，移除未被使用的代码，从而减小 bundle 体积。

实现前提：

1. 使用 ESM（`import` / `export`），而非 CommonJS（`require` / `module.exports`）。
2. 构建工具支持，如 Rollup、webpack（production mode）、Vite、esbuild。
3. 代码没有副作用，或副作用可被安全声明。

`sideEffects` 字段：

- 告诉构建工具哪些文件**有副作用**，不能随意删除。
- `false`：整个包都没有副作用，可以大胆删除未使用导出。
- 数组：列出有副作用的文件或 glob。

```json
{
  "sideEffects": false
}
```

```json
{
  "sideEffects": [
    "*.css",
    "*.less",
    "./src/polyfill.js"
  ]
}
```

如果 `sideEffects` 未声明或声明错误：

- 构建工具可能为安全起见保留所有代码，tree-shaking 失效。
- 也可能误删包含全局注册、样式注入、polyfill 的文件。

验证 tree-shaking 是否生效：

1. 使用 webpack-bundle-analyzer / rollup-plugin-visualizer 看产物。
2. 写一个最小复现：

```js
import { add } from 'my-lib';
console.log(add(1, 2));
```

如果产物中只包含 `add` 函数及相关依赖，说明生效。

最佳实践：
- 库作者发布 ESM 产物，并在 `package.json` 声明 `"module"` / `"exports"` / `"sideEffects"`。
- 避免在工具库顶层执行 `window.xx = ...` 等副作用代码。
- 样式文件通过 `sideEffects` 数组显式保留。

**评分维度**：
- 能解释 tree-shaking 基于 ESM 静态分析的原理（30%）
- 能说明 sideEffects 的 true/false/数组三种写法（30%）
- 能举例说明副作用文件应如何声明（20%）
- 能给出验证方法（20%）

**常见错误**：
- 认为 CommonJS 也能完美 tree-shaking。
- 把 `sideEffects` 写成 `sideEffect`（拼写错误）。
- 对包含全局样式/polyfill 的库错误声明 `sideEffects: false`。

**延伸追问**：
- webpack 的 `usedExports` 和 `sideEffects` 有什么区别？
- 一个库同时提供 CJS 和 ESM，构建工具会优先选哪个？

**相关题目**：
- [FB-23-PE-A-014 包体积分析](#FB-23-PE-A-014)
- [FB-23-CP-P-023 包管理器选型](#FB-23-CP-P-023)

**参考资源**：
- [webpack - Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Rollup - Tree-shaking](https://rollupjs.org/tutorial/#tree-shaking)

**口头回答版**：
> tree-shaking 就是构建工具通过静态分析 ESM 的 import/export，把没用到的代码删掉。前提是要用 ESM，代码最好没有副作用。package.json 里的 sideEffects 字段告诉构建工具哪些文件有副作用不能删。写 false 表示整个包都没副作用；写数组表示哪些文件有副作用，比如 CSS、polyfill。库作者要正确声明 sideEffects，不然要么摇不掉，要么把该保留的也删了。可以用 webpack-bundle-analyzer 验证。

---

### FB-23-EN-A-016：CI 中的依赖缓存策略如何设计？lockfile 在其中起什么作用？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：cicd、cache、lockfile、CI 缓存、安装加速
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个前端 CI pipeline 中的依赖缓存策略，说明 lockfile 如何作为缓存 key，以及如何处理缓存失效和安全更新。

**参考答案**：

### 缓存策略设计

核心思路：把包管理器缓存目录（tarball/解压产物）作为 CI cache，key 由 lockfile 哈希决定，lockfile 不变则缓存复用。

**GitHub Actions 示例（pnpm）**：

```yaml
jobs:
  build:
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
```

`actions/setup-node` 的 `cache: 'pnpm'` 会自动以 `pnpm-lock.yaml` 哈希为 key 缓存 `~/.pnpm-store`。

**自定义缓存 key 示例**：

```yaml
- uses: actions/cache@v3
  with:
    path: |
      ~/.npm
      node_modules
    key: $&#123;&#123; runner.os &#125;&#125;-node-$&#123;&#123; hashFiles('**/package-lock.json') &#125;&#125;
    restore-keys: |
      $&#123;&#123; runner.os &#125;&#125;-node-
```

### lockfile 的作用

1. **缓存 key**：lockfile 变化表示依赖改变，必须重建缓存。
2. **确定性安装**：`--frozen-lockfile` / `--immutable` 保证 CI 严格按 lockfile 安装，不自动升级。
3. **安全校验**：lockfile 中的 integrity 保证缓存 tarball 未被篡改。

### 缓存失效与安全更新

- **失效场景**：lockfile 变更、包管理器版本升级、registry 切换、Node 版本变化。
- **安全更新**：
  - 定期跑 `npm audit fix` 或 `pnpm update --interactive`，通过 PR 更新 lockfile。
  - 不允许 CI 自动修改 lockfile，避免隐式升级。
  - 对私有 registry 做缓存代理，避免公网下载失败。

### 最佳实践

1. 区分依赖缓存和构建产物缓存，避免 node_modules 过大导致缓存上传慢。
2. 对 Monorepo，可用 `turbo.json` / `nx.json` 的远程缓存进一步加速。
3. CI 中使用 `npm ci` / `pnpm install --frozen-lockfile` / `yarn install --immutable`。
4. 定期清理过期缓存，防止缓存无限增长。

**评分维度**：
- 能说明以 lockfile 为 key 的缓存设计（35%）
- 能写出 GitHub Actions 或类似 CI 配置（25%）
- 能解释 `--frozen-lockfile` 的作用（20%）
- 能提到缓存失效和安全更新策略（20%）

**常见错误**：
- 以 `package.json` 而不是 lockfile 作为缓存 key，导致缓存频繁失效或过期。
- CI 中使用 `npm install` 而非 `npm ci`，导致 lockfile 被修改。
- 缓存整个 `node_modules` 而不清理，体积越来越大。

**延伸追问**：
- 如果 lockfile 没变但安装失败，可能是哪些原因？
- Monorepo 中多个子包的 lockfile 如何设计缓存 key？

**相关题目**：
- [FB-23-CO-B-004 什么是 lockfile](#FB-23-CO-B-004)
- [FB-23-CO-A-012 lockfile 安全与完整性校验](#FB-23-CO-A-012)

**参考资源**：
- [GitHub Actions - Caching dependencies](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [pnpm - Continuous Integration](https://pnpm.io/continuous-integration)

**口头回答版**：
> CI 里缓存依赖通常是把包管理器的缓存目录作为 cache，key 用 lockfile 的哈希。这样 lockfile 没变就可以复用缓存，lockfile 变了就重新下载。CI 安装时要用 frozen-lockfile，严格按 lockfile 装，不自动升级。比如 GitHub Actions 里 setup-node 支持 cache: 'pnpm'。要注意不要以 package.json 做 key，因为 package.json 没改 lockfile 也可能变；也不要在 CI 里用 npm install，会把 lockfile 改掉。安全更新要走 PR，定期 audit fix。


---

## 深入题（7 道）{#proficient}

### FB-23-FS-P-017：pnpm 的 content-addressable store 与 hard link 机制是如何工作的？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：23 包管理与供应链安全
**标签**：pnpm、content-addressable-store、hard-link、依赖隔离
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入解释 pnpm 为什么能节省磁盘空间、避免幽灵依赖。它的全局 store、hard link 与符号链接机制分别是如何配合的？

**参考答案**：

pnpm 的核心设计是 **content-addressable store + hard link + 严格依赖树**。

### 全局 store

pnpm 把所有下载过的包按内容哈希存放到全局 store（默认 `~/.pnpm-store`）。每个包版本只保留一份真实文件，key 是 tarball 的内容哈希。

```text
~/.pnpm-store/
├── files/
│   └── xx/xxxxx...xxxx/  <-- 内容哈希目录，存真实文件
└── metadata/
    └── registry.npmjs.org/
        └── lodash/
            └── 4.17.21.json
```

### Hard link

安装时，pnpm 不会复制文件，而是在项目 `node_modules/.pnpm/{package}@{version}/node_modules/{package}` 创建指向全局 store 的 hard link。

- Hard link 不占用额外磁盘空间（同一份 inode）。
- 即使删除 store 中的某个入口，只要项目还在引用，文件内容就不会被释放。
- 不同项目、同一版本的包共享同一份物理文件。

### 符号链接（symlink）

项目顶层 `node_modules` 只展示直接依赖：

```text
node_modules/
├── A -> .pnpm/A@1.0.0/node_modules/A
└── B -> .pnpm/B@1.0.0/node_modules/B

.pnpm/
├── A@1.0.0/node_modules/A
│   └── node_modules/
│       └── C -> ../../C@1.0.0/node_modules/C
├── B@1.0.0/node_modules/B
│   └── node_modules/
│       └── C -> ../../C@1.0.0/node_modules/C
└── C@1.0.0/node_modules/C
```

- A 只能访问自己的依赖 C，不能访问 B 的依赖（除非 C 也是 A 的直接依赖）。
- 顶层代码只能 `import` 直接声明的依赖，杜绝幽灵依赖。

### 严格依赖树

每个包都有自己独立的 `node_modules`，包管理器按照 `package.json` 中声明的依赖关系精确创建链接。这与 npm/yarn Classic 的扁平化 hoisting 形成鲜明对比。

### 优势

1. **磁盘节省**：同版本全局只存一份。
2. **安装快速**：hard link 创建速度远快于复制或解压。
3. **无幽灵依赖**：顶层只有直接依赖。
4. **多版本共存**：不同版本在 `.pnpm` 中并列存在，互不影响。

### 兼容处理

部分工具（如 Jest、React Native）期望依赖被 hoisting 到顶层。pnpm 提供：

- `shamefully-hoist=true`：模拟 npm 的扁平化结构。
- `public-hoist-pattern[]=*eslint*`：把特定包提升到顶层。
- `.pnpmfile.cjs`：自定义依赖解析逻辑。

**评分维度**：
- 能解释 content-addressable store 的内容寻址思想（25%）
- 能说明 hard link 与 symlink 的分工（25%）
- 能画出/描述 pnpm 的 node_modules 结构（25%）
- 能分析严格依赖树如何避免幽灵依赖及兼容方案（25%）

**常见错误**：
- 认为 pnpm 只是把依赖压缩存一份。
- 混淆 hard link 和 symlink。
- 不知道 `shamefully-hoist` 的存在和用途。

**延伸追问**：
- 如果全局 store 损坏，pnpm 会怎么处理？
- pnpm 的 hard link 在 Windows 上有什么限制？

**相关题目**：
- [FB-23-CO-A-010 node_modules 结构差异](#FB-23-CO-A-010)
- [FB-23-CO-B-007 幽灵依赖](#FB-23-CO-B-007)

**参考资源**：
- [pnpm - How peers are resolved](https://pnpm.io/how-peers-are-resolved)
- [pnpm - Store](https://pnpm.io/cli/store)

**口头回答版**：
> pnpm 的核心是 content-addressable store 加 hard link 加严格依赖树。所有包按内容哈希存在一个全局 store 里，同一个版本只存一份。安装时通过 hard link 把文件挂到项目的 .pnpm 目录下，再通过软链接把直接依赖挂到 node_modules 顶层。这样每个包的依赖是隔离的，A 只能看到自己的依赖，顶层代码也只能 import 直接声明的包，彻底避免幽灵依赖。如果有些工具需要扁平化，可以开 shamefully-hoist。

---

### FB-23-SE-P-018：Sigstore、Provenance 与 NPM 发布签名是什么？它们如何提升供应链安全？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：23 包管理与供应链安全
**标签**：sigstore、provenance、npm-signatures、供应链安全、SLSA
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请介绍 Sigstore、npm provenance 与发布签名（publish signatures）的概念、工作原理，以及它们在前端供应链安全中的作用。

**参考答案**：

### 传统风险

过去 npm 包发布只需维护者账号密码或 token，攻击者盗取账号即可发布恶意版本，下游无法验证“这个包是否真的来自官方 CI”。

### npm Publish Signatures

npm 支持用**发布者私钥**对包进行签名。安装时可验证签名是否来自可信发布者。

```bash
npm audit signatures
```

npm 会检查 registry 返回的签名是否与包作者注册在 npm 的公钥匹配。

### Sigstore

Sigstore 是一个开源的工件签名与验证基础设施，由 Linux 基金会维护，包含：

- **Fulcio**：短期证书颁发机构（CA），基于 OIDC 身份（如 GitHub Actions、Google 账号）。
- **Rekor**：透明日志，记录所有签名事件，可审计。
- **Cosign**：签名与验证工具。

特点：

- 不需要长期维护 GPG 私钥，签名与 CI 身份绑定。
- 证书有效期短，降低私钥泄露风险。
- 所有签名事件上链，便于溯源。

### npm Provenance

npm Provenance 是 npm 与 Sigstore 合作的成果，用于证明某个包版本是在**特定的 GitHub Actions 工作流**中从**特定的 Git commit** 构建出来的。

```json
{
  "dist": {
    "attestations": {
      "provenance": {
        "url": "https://registry.npmjs.org/.../provenance"
      }
    }
  }
}
```

验证方式：

```bash
npm audit signatures
# 或在 npm 网站查看 "Provenance" 徽章
```

### 安全价值

1. **身份绑定**：包的来源不再是“某个账号”，而是“某次可信 CI 构建”。
2. **构建可追溯**：可验证构建时使用的源码 commit、工作流文件。
3. **降低账号泄露风险**：即使账号 token 泄露，无法在本地伪造 provenance。
4. **合规与审计**：满足 SLSA（Supply-chain Levels for Software Artifacts）等级要求。

### 落地建议

- 在 GitHub Actions 中启用 `npm publish --provenance`。
- CI 中运行 `npm audit signatures` 验证依赖 provenance。
- 对关键内部包也引入 Sigstore 签名或自研 provenance 机制。
- 结合 SBOM 记录构建所用依赖和来源。

**评分维度**：
- 能解释 Sigstore 三件套（Fulcio/Rekor/Cosign）的作用（30%）
- 能说明 npm provenance 与传统签名的区别（25%）
- 能描述 provenance 在 CI/CD 中的生成与验证流程（25%）
- 能分析对供应链安全的价值（20%）

**常见错误**：
- 把 provenance 等同于普通 HTTPS/TLS 安全传输。
- 认为 provenance 能防止所有恶意代码，忽略源码本身被污染的情况。
- 不知道 `npm audit signatures` 可以验证签名。

**延伸追问**：
- 如果攻击者入侵了 GitHub Actions 工作流，provenance 还有效吗？
- 企业内部如何自建类似 provenance 的可追溯体系？

**相关题目**：
- [FB-23-CO-A-012 lockfile 安全与完整性校验](#FB-23-CO-A-012)
- [FB-23-SD-R-030 构建产物 SBOM 与可追溯体系](#FB-23-SD-R-030)

**参考资源**：
- [npm Docs - Generating provenance statements](https://docs.npmjs.com/generating-provenance-statements)
- [Sigstore 官方网站](https://www.sigstore.dev/)
- [SLSA 规范](https://slsa.dev/)

**口头回答版**：
> Sigstore 是一套开源签名基础设施，包括 Fulcio 发短期证书、Rekor 记录透明日志、Cosign 做签名验证。npm Provenance 就是 npm 用 Sigstore 证明一个包是在哪个 GitHub Actions 工作流、哪个 commit 上构建出来的。这样包的来源不再是某个账号，而是可信 CI，能降低账号被盗发布恶意包的风险。验证可以用 npm audit signatures，npm 网站上也会有 Provenance 徽章。企业里对关键包也可以引入类似机制，结合 SBOM 做可追溯。

---

### FB-23-CO-P-019：什么是依赖地狱？如何解决版本冲突、循环依赖与依赖分身？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：23 包管理与供应链安全
**标签**：dependency-hell、版本冲突、circular-dependency、deduplication
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请解释“依赖地狱”的具体表现，分析版本冲突、循环依赖与依赖分身（dependency duplication）的产生原因，并给出系统性的解决方案。

**参考答案**：

### 依赖地狱的表现

1. **版本冲突**：不同依赖要求同一库的不同 major 版本，导致无法同时满足。
2. **依赖分身**：同一库多个版本被打包进产物，体积膨胀、状态分裂。
3. **循环依赖**：A 依赖 B，B 依赖 C，C 又依赖 A，导致解析异常或运行时错误。
4. **隐形依赖**：通过幽灵依赖隐式引用，维护困难。

### 版本冲突

示例：

```text
app
├── lib-a -> react@^17
└── lib-b -> react@^18
```

React 17 和 18 不能共存于同一应用，必须统一。

解决方案：

- **升级/降级依赖**：使所有依赖使用兼容版本。
- **覆盖版本**：

```json
{
  "overrides": {
    "react": "18.2.0"
  }
}
```

- **使用 resolutions**（yarn）：

```json
{
  "resolutions": {
    "react": "18.2.0"
  }
}
```

- **fork 或替换库**：如果某库长期不更新，考虑替换。

### 依赖分身

示例：

```text
app
├── lib-a -> lodash@4.17.15
└── lib-b -> lodash@4.17.21
```

两个版本兼容但都会被安装/打包。

解决方案：

- 统一版本范围，lockfile 会去重。
- 使用 `npm dedupe`、`pnpm dedupe`。
- 配置 `overrides` / `resolutions` 强制统一。
- 在 Monorepo 中用 `catalog:` 统一管理版本。

### 循环依赖

示例：

```js
// a.js
const b = require('./b');
module.exports = { a: 'A', b };

// b.js
const a = require('./a');
module.exports = { b: 'B', a };
```

Node.js 会返回未完成的 exports，可能拿到空对象或部分对象。

解决方案：

1. **重构代码**：把公共逻辑抽到第三个模块。
2. **延迟 require**：把 require 放到函数内部，避免顶层循环。
3. **ESM 的静态循环**：ESM 通过 TDZ（Temporal Dead Zone）处理循环引用，访问未完成初始化的绑定会报错。

### 系统性治理

- 建立依赖准入机制，新增依赖需审批。
- 定期跑 `npm outdated`、`pnpm outdated`。
- 使用 Dependabot/Renovate 自动提交升级 PR。
- 在 CI 中检测重复依赖（如 `bundlesize`、自定义脚本）。
- 对核心框架版本做组织级统一。

**评分维度**：
- 能解释依赖地狱的四种表现（25%）
- 能给出版本冲突和依赖分身的解决手段（30%）
- 能说明循环依赖的处理方式（25%）
- 能提出组织级治理策略（20%）

**常见错误**：
- 遇到冲突就用 `--force` 或 `--legacy-peer-deps` 绕过，不解决根本问题。
- 认为 lockfile 能自动解决所有版本冲突。
- 对循环依赖不做重构，只加延迟 require 掩盖问题。

**延伸追问**：
- `overrides` 和 `resolutions` 有什么区别？
- 如果 React 17 和 18 必须共存，微前端是不是唯一解？

**相关题目**：
- [FB-23-CO-A-009 依赖解析与 deduplication](#FB-23-CO-A-009)
- [FB-23-CA-P-022 依赖版本冲突分析](#FB-23-CA-P-022)

**参考资源**：
- [npm Docs - overrides](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides)
- [Node.js - Cycles](https://nodejs.org/api/modules.html#cycles)

**口头回答版**：
> 依赖地狱就是项目依赖关系复杂到难以维护的状态，常见表现有版本冲突、依赖分身、循环依赖、隐形依赖。版本冲突可以用 overrides 或 resolutions 强制统一版本；依赖分身要统一版本范围、跑 dedupe；循环依赖最好重构代码，把公共逻辑抽出来，或者延迟 require。组织层面要建立依赖审批、定期升级、自动 PR 和 CI 检测机制，不能光靠 lockfile。

---

### FB-23-EN-P-020：私有 Registry / Verdaccio 如何企业级部署？

**题型**：工程化题 / 系统设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：23 包管理与供应链安全
**标签**：registry、verdaccio、私有仓库、npm-proxy、企业部署
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个企业级私有 npm registry 方案，包括 Verdaccio 部署、上游代理、权限控制、高可用与 CI 集成。

**参考答案**：

### 为什么需要私有 Registry

1. 发布内部私有包，不暴露到 npm 公共 registry。
2. 做上游 npm 的缓存代理，提升安装速度和稳定性。
3. 统一管控可安装包范围，防止 dependency confusion。
4. 审计和记录所有包下载行为。

### Verdaccio 部署

Verdaccio 是轻量级私有 npm registry，支持 uplink、auth、storage 插件。

基础配置（`config.yaml`）：

```yaml
storage: ./storage
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    max_fails: 3
    timeout: 30s
packages:
  '@company/*':
    access: $authenticated
    publish: $authenticated
    unpublish: admin
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
middlewares:
  audit:
    enabled: true
logs:
  - { type: stdout, format: pretty, level: http }
```

### 权限控制

- **Scope 隔离**：内部包强制使用 `@company/` scope。
- **认证方式**：htpasswd、LDAP、GitHub OAuth、JWT。
- **发布权限**：普通开发者只读，CI/CD 账号可发布，管理员可 unpublish。
- **包白名单**：通过 Verdaccio 插件或反向代理限制可安装的公共包。

### 高可用

- **存储后端**：使用 S3/MinIO 替代本地文件存储，支持多实例共享。
- **负载均衡**：部署多个 Verdaccio 实例，前置 Nginx/HAProxy。
- **缓存预热**：CI 中常用包提前下载缓存。
- **备份策略**：定期备份 metadata 和 tarball。

### CI 集成

```bash
# .npmrc
@company:registry=https://registry.company.com/
registry=https://registry.company.com/
//registry.company.com/:_authToken=${NPM_TOKEN}
```

GitHub Actions 示例：

```yaml
- run: npm publish
  env:
    NODE_AUTH_TOKEN: $&#123;&#123; secrets.NPM_TOKEN &#125;&#125;
```

### 安全加固

1. 禁用公共 registry 直连，所有安装必须经过私有 registry。
2. 对上传的私有包做病毒扫描和源码审计。
3. 开启审计日志，记录 who/when/what。
4. 与内部 SSO 集成，定期轮换 publish token。
5. 防范 dependency confusion：私有 scope 与公共 scope 严格区分。

**评分维度**：
- 能说明私有 registry 的核心价值（20%）
- 能给出 Verdaccio 配置示例（25%）
- 能设计权限控制和高可用方案（25%）
- 能说明 CI 集成与安全加固措施（30%）

**常见错误**：
- 只部署单节点本地 Verdaccio，不做存储共享和高可用。
- 私有包不使用 scope，导致与公共包命名冲突。
- CI token 权限过大，普通开发者也能 publish。

**延伸追问**：
- 如果 Verdaccio 挂了，如何保证 CI 还能安装依赖？
- 如何防止内部开发者绕过私有 registry 直接装公共包？

**相关题目**：
- [FB-23-SE-A-013 供应链攻击常见手段](#FB-23-SE-A-013)
- [FB-23-SD-R-025 供应链安全防御体系](#FB-23-SD-R-025)

**参考资源**：
- [Verdaccio 官方文档](https://verdaccio.org/)
- [npm Docs - scopes](https://docs.npmjs.com/cli/v10/using-npm/scope)

**口头回答版**：
> 企业级私有 registry 主要用来发内部包、做 npm 缓存代理、统一管控安装范围。Verdaccio 是个轻量方案，配置里要设置 storage、auth、uplink 代理 npmjs、packages 权限。内部包最好用 @company/ scope 隔离，权限上分开发者只读、CI 可发布、管理员可删除。高可用上要用 S3 做共享存储、多实例加负载均衡。CI 里通过 .npmrc 配置 registry 和 auth token。安全上要禁用直连公共 registry、开启审计日志、定期轮换 token、防止 dependency confusion。

---

### FB-23-SE-P-021：SBOM 是什么？如何做许可证合规？

**题型**：安全题 / 工程化题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：23 包管理与供应链安全
**标签**：SBOM、license、许可证合规、软件物料清单
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请解释 SBOM（Software Bill of Materials）的概念、主流格式，以及前端项目如何进行许可证合规检查。

**参考答案**：

### SBOM 概念

SBOM 是软件物料清单，列出软件产品包含的所有组件、版本、来源、许可证、依赖关系。它类似硬件产品的 BOM 表，是供应链安全和合规审计的基础。

### 主流格式

1. **SPDX**（Software Package Data Exchange）：Linux 基金会主导，支持 tag-value、JSON、RDF、YAML。
2. **CycloneDX**：OWASP 主导，JSON/XML 格式，强调安全漏洞关联。
3. **SWID**（ISO/IEC 19770-2）：软件标识标签，常用于政府采购场景。

### 前端生成 SBOM

```bash
# npm
npm sbom --format=spdx-json --path=.

# cyclonedx-npm
npx @cyclonedx/cyclonedx-npm --output-file sbom.json

# pnpm
pnpm sbom --format=cyclonedx-json
```

示例输出（SPDX JSON 片段）：

```json
{
  "packages": [
    {
      "SPDXID": "SPDXRef-Package-lodash",
      "name": "lodash",
      "versionInfo": "4.17.21",
      "downloadLocation": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "licenseConcluded": "MIT"
    }
  ]
}
```

### 许可证合规

常见开源许可证风险：

| 类型 | 示例 | 商用风险 |
|------|------|---------|
| 宽松型 | MIT、Apache-2.0、BSD | 低，需保留版权声明 |
| Copyleft | GPL-2.0/3.0、AGPL | 高，可能要求开源衍生作品 |
| 弱 Copyleft | MPL-2.0、LGPL | 中，需按模块区分 |
| 特殊 | SSPL、Elastic-2.0 | 高，限制云服务使用 |

合规流程：

1. **扫描**：用 `license-checker`、`fossa`、`snyk`、`cyclonedx` 扫描所有依赖许可证。
2. **分类**：建立允许列表、拒绝列表、需审批列表。
3. **阻断**：CI 中拒绝高风险许可证进入产物。
4. **记录**：把 SBOM 随版本发布归档。
5. **审计**：定期复核新增依赖的许可证。

CI 示例（license-checker）：

```bash
npx license-checker --onlyAllow 'MIT;Apache-2.0;BSD-3-Clause;ISC' --json > licenses.json
```

### 与供应链安全结合

- SBOM + CVE 数据库：快速定位受影响组件。
- SBOM + Provenance：追溯每个组件的构建来源。
- 法规要求：美国 EO 14028、欧盟 CRA 要求关键软件提供 SBOM。

**评分维度**：
- 能解释 SBOM 概念和三种格式（25%）
- 能生成前端 SBOM 的命令/工具（25%）
- 能分析常见许可证风险等级（25%）
- 能设计 CI 合规检查流程（25%）

**常见错误**：
- 认为 SBOM 只是安全团队的事，和前端无关。
- 只扫描 direct dependencies，忽略 transitive dependencies。
- 认为 MIT 和 GPL 没有区别。

**延伸追问**：
- 如果某个依赖是 GPL，但只是构建工具（devDependency），是否也需要规避？
- 如何确保 SBOM 随每次发布自动更新？

**相关题目**：
- [FB-23-SE-P-018 Sigstore 与 Provenance](#FB-23-SE-P-018)
- [FB-23-SD-R-030 构建产物 SBOM 与可追溯体系](#FB-23-SD-R-030)

**参考资源**：
- [SPDX 官方](https://spdx.dev/)
- [CycloneDX 官方](https://cyclonedx.org/)
- [npm Docs - npm sbom](https://docs.npmjs.com/cli/v10/commands/npm-sbom)

**口头回答版**：
> SBOM 就是软件物料清单，列出项目用了哪些组件、什么版本、什么许可证、从哪里来。主流格式有 SPDX、CycloneDX、SWID。前端可以用 npm sbom、@cyclonedx/cyclonedx-npm 或 pnpm sbom 生成。许可证合规要区分 MIT/Apache 这些宽松的，和 GPL/AGPL 这些 copyleft 的高风险。CI 里可以用 license-checker 扫描并阻断高风险许可证。SBOM 还能和 CVE、Provenance 结合，做漏洞定位和来源追溯。

---

### FB-23-CA-P-022：分析一个依赖版本冲突场景

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：23 包管理与供应链安全
**标签**：版本冲突、peerDependencies、依赖解析、实战分析
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
某项目 `package.json` 如下：

```json
{
  "dependencies": {
    "react": "^17.0.2",
    "react-router-dom": "^5.3.0",
    "@company/ui-kit": "^1.0.0"
  }
}
```

其中 `@company/ui-kit` 的 `peerDependencies` 声明为 `react: ">=16.8.0 <18.0.0"`。现在项目想升级到 React 18，但 `react-router-dom@5` 只支持 React 17，而 `@company/ui-kit@1` 的 peer range 也不包含 18。请分析冲突并给出升级方案。

**参考答案**：

### 冲突分析

1. **React 18 与 react-router-dom@5 冲突**：`react-router-dom@5` 依赖 `react@^16 || ^17`，React 18 不在范围内。
2. **React 18 与 @company/ui-kit@1 冲突**：peer range `<18.0.0` 明确排除 18。
3. 同时存在**传递依赖版本冲突**和**peerDependencies 不兼容**。

### 升级方案

**方案 A：统一升级（推荐）**

1. 升级 `react-router-dom` 到 v6（支持 React 18）。

```bash
npm install react@18 react-dom@18 react-router-dom@6
```

2. 升级 `@company/ui-kit` 到 v2（假设已支持 React 18）。

```bash
npm install @company/ui-kit@2
```

3. 处理 `react-router-dom` v5 到 v6 的 breaking changes：
   - `Switch` 改为 `Routes`。
   - `useHistory()` 改为 `useNavigate()`。
   - `Route component={X}` 改为 `Route element={X}`。

**方案 B：渐进升级（大型项目）**

1. 先升级 `@company/ui-kit` 到支持 React 17/18 双版本的过渡版本。
2. 将 `react-router-dom` 替换为兼容 React 18 的版本，或局部使用 `BrowserRouter` 包装。
3. 如果路由代码量大，可引入兼容层或分模块迁移。

**方案 C：使用 overrides 强制统一（临时方案）**

```json
{
  "overrides": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
```

风险：

- `react-router-dom@5` 在 React 18 下可能运行异常（如 Strict Mode 行为变化）。
- `@company/ui-kit@1` 可能调用已废弃 API。
- 只适用于临时验证，不建议长期生产使用。

### 决策建议

- 小型项目：直接走方案 A，统一升级。
- 大型项目：制定分阶段升级计划，先升级无冲突依赖，再处理路由和 UI 库。
- 所有方案都需要完整回归测试，特别是 React 18 的并发特性和 Strict Mode。

**评分维度**：
- 能准确找出两个冲突点（30%）
- 能给出至少两种可行升级方案（35%）
- 能分析各方案的风险（25%）
- 能提到 React 18 相关兼容性问题（10%）

**常见错误**：
- 直接用 `--legacy-peer-deps` 忽略冲突，不解决根本问题。
- 只升级 React，不升级依赖它的库。
- 忽略 `react-router-dom` v5 到 v6 的大量 breaking changes。

**延伸追问**：
- 如果 `@company/ui-kit` 是公司内部库，你会如何协调它支持 React 18？
- React 18 的 Strict Mode 在 v17 和 v18 下对组件挂载有什么差异？

**相关题目**：
- [FB-23-CO-P-019 依赖地狱与版本冲突](#FB-23-CO-P-019)
- [FB-23-CO-A-009 依赖解析与 deduplication](#FB-23-CO-A-009)

**参考资源**：
- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [React Router v5 to v6 Migration](https://reactrouter.com/en/main/upgrading/v5)

**口头回答版**：
> 这个场景有两个冲突：react-router-dom@5 只支持 React 17，想升 18 必须升 v6；@company/ui-kit@1 的 peerDependencies 也不包含 React 18，需要升到 v2。推荐方案是统一升级 react、react-dom、react-router-dom 和 ui-kit，但要注意 react-router-dom v5 到 v6 有很多 breaking changes，比如 Switch 改 Routes、useHistory 改 useNavigate。大型项目可以分阶段升。临时可以用 overrides 强制统一，但风险很大，可能运行异常，不建议长期用。

---

### FB-23-CP-P-023：如何为一个团队选择包管理器？请给出决策矩阵。

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：23 包管理与供应链安全
**标签**：包管理器选型、pnpm、yarn、npm、决策矩阵
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
假设你要为一个 50 人规模的前端团队选择包管理器，请给出选型决策矩阵，并说明在不同场景下推荐 npm、yarn Classic、yarn Berry PnP 还是 pnpm。

**参考答案**：

### 选型维度

| 维度 | 权重 | 说明 |
|------|------|------|
| 安装速度 | 20% | CI 和本地开发效率 |
| 磁盘占用 | 15% | 多项目/Monorepo 场景 |
| 幽灵依赖控制 | 20% | 代码可维护性与安全性 |
| 生态兼容性 | 20% | 与现有工具链、IDE、CI 的适配 |
| Monorepo 支持 | 15% | workspace、过滤、远程缓存 |
| 安全特性 | 10% | audit、provenance、签名 |

### 场景推荐

| 场景 | 推荐 | 理由 |
|------|------|------|
| 小型单仓库、传统 SPA | npm / yarn Classic | 兼容性好，团队学习成本低 |
| 大型 Monorepo、组件库 | pnpm | 省磁盘、无幽灵依赖、workspace 优秀 |
| 追求极致去重、可控依赖图 | yarn Berry PnP | 无 node_modules 复制，严格可控 |
| 已有 yarn Classic 工具链 | yarn Berry + nodeLinker | 渐进迁移，保留部分兼容性 |
| 企业内部需严格审计 | pnpm + 私有 registry | 依赖隔离 + SBOM + audit |

### 50 人团队建议

推荐 **pnpm**，原因：

1. **Monorepo 友好**：workspace、`workspace:` 协议、`--filter` 过滤、依赖隔离。
2. **节省磁盘**：50 人共享同一份全局 store，尤其本地多项目开发优势明显。
3. **杜绝幽灵依赖**：新员工不容易误引未声明依赖。
4. **速度快**：hard link 安装和 CI 缓存复用都快。
5. **兼容性好**：对常见前端工具链支持良好，必要时可 `shamefully-hoist`。

### 迁移步骤

1. 评估现有 `package-lock.json` / `yarn.lock` 的依赖复杂度。
2. 选择试点项目，生成 `pnpm-lock.yaml` 并跑通 CI。
3. 处理 `postinstall`、`.npmrc`、husky 等差异。
4. 更新内部文档和脚手架模板。
5. 逐步推广到全团队，保留 npm/yarn 作为 fallback 一段时间。

### 风险控制

- 迁移初期可能遇到 `.bin` 路径、peerDependencies 警告等问题。
- 建议制定统一的 `.npmrc`、CI 脚本、IDE 配置。
- 对关键项目做全量回归测试后再切换。

**评分维度**：
- 能列出至少 5 个选型维度并合理赋权（30%）
- 能针对不同场景给出推荐并说明理由（30%）
- 能给出 50 人团队的具体推荐和迁移步骤（25%）
- 能提到风险控制（15%）

**常见错误**：
- 只看安装速度，忽略兼容性和团队学习成本。
- 盲目追求新技术，不考虑迁移风险。
- 不做试点就全团队切换。

**延伸追问**：
- 如果团队里有大量依赖 yarn Berry PnP 不兼容的工具，怎么办？
- 选型后如何确保所有人本地和 CI 使用同一版本？

**相关题目**：
- [FB-23-CO-B-001 npm/yarn/pnpm 区别](#FB-23-CO-B-001)
- [FB-23-CO-A-010 node_modules 结构差异](#FB-23-CO-A-010)

**参考资源**：
- [pnpm - Motivation](https://pnpm.io/motivation)
- [Yarn - Migration](https://yarnpkg.com/migration)

**口头回答版**：
> 选型要从安装速度、磁盘占用、幽灵依赖控制、生态兼容性、Monorepo 支持、安全特性几个维度看。小型项目 npm 或 yarn Classic 就行；大型 Monorepo 我推荐 pnpm，因为它省磁盘、没幽灵依赖、workspace 做得很好、对常见工具链兼容也不错。50 人团队我会先用试点项目验证，再逐步推广。迁移时要注意 postinstall、.npmrc、peerDependencies 的差异，关键项目要做全量回归测试。


---

## 架构题（67 道）{#architect}

### FB-23-SD-R-024：如何设计企业级前端依赖治理体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：23 包管理与供应链安全
**标签**：依赖治理、治理体系、标准化、工具链
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个企业级前端依赖治理体系，覆盖依赖准入、版本管理、安全审计、许可证合规、 Monorepo 规范、CI 集成等环节。

**参考答案**：

### 体系目标

1. **可见**：所有依赖可追溯，知道谁在用、为什么用、版本是什么。
2. **可控**：新增依赖需审批，核心框架版本统一。
3. **可信**：所有依赖经过安全扫描、许可证检查、来源验证。
4. **可持续**：定期清理、自动升级、技术债可控。

### 架构分层

```text
┌─────────────────────────────────────┐
│  治理平台（Dashboard + Policy Engine）  │
├─────────────────────────────────────┤
│  工具链层：scaffold / CLI / lint      │
├─────────────────────────────────────┤
│  私有 Registry + 缓存代理             │
├─────────────────────────────────────┤
│  CI/CD：安装 → 扫描 → 构建 → 发布     │
├─────────────────────────────────────┤
│  项目仓库：Monorepo / 多仓库           │
└─────────────────────────────────────┘
```

### 关键环节设计

**1. 依赖准入**

- 建立内部依赖白名单，新增依赖需提交 RFC。
- 评估维度：体积、维护活跃度、许可证、安全风险、社区规模。
- 使用内部脚手架限制可安装包范围。

**2. 版本管理**

- 核心框架（React/Vue/Node）由架构组统一指定版本。
- Monorepo 中使用 `catalog:` 或根 `package.json` 统一公共依赖版本。
- 使用 Dependabot/Renovate 自动提交升级 PR，但需人工合并。

**3. 安全审计**

- CI 中运行 `npm audit` / `pnpm audit` / Snyk，设置阈值阻断。
- 对关键依赖启用 provenance / signature 验证。
- 建立漏洞响应 SLA：critical 24 小时、high 7 天。

**4. 许可证合规**

- CI 中扫描所有依赖许可证，拒绝 GPL/AGPL/SSPL 等高风险许可。
- 生成 SBOM 随版本归档。

**5. Monorepo 规范**

- 统一包管理器（如 pnpm）。
- 强制 `workspace:` 协议引用本地子包。
- 子包必须声明清晰的 `peerDependencies` 和 `sideEffects`。

**6. CI 集成**

```yaml
steps:
  - install --frozen-lockfile
  - run: pnpm audit --audit-level high
  - run: pnpm license-check
  - run: pnpm run test
  - run: pnpm run build
  - run: pnpm run sbom:generate
```

### 度量指标

- 依赖总数、直接依赖数、过时依赖数。
- 漏洞数量及修复率。
- 高风险许可证数量。
- 幽灵依赖数量。
- 平均升级周期。

**评分维度**：
- 能覆盖准入、版本、安全、许可证、Monorepo、CI 六个环节（40%）
- 能画出/描述治理体系架构（25%）
- 能给出可落地的流程和工具（25%）
- 能提出度量指标（10%）

**常见错误**：
- 只关注安全审计，忽略版本管理和准入控制。
- 治理流程太复杂，导致开发者抵触。
- 没有度量指标，无法评估治理效果。

**延伸追问**：
- 如何平衡治理严格度与开发效率？
- 如果业务方坚持使用一个高风险依赖，你怎么办？

**相关题目**：
- [FB-23-SD-R-025 供应链安全防御体系](#FB-23-SD-R-025)
- [FB-23-CP-R-028 大前端团队包管理标准化](#FB-23-CP-R-028)

**参考资源**：
- [OpenSSF Scorecard](https://github.com/ossf/scorecard)
- [SLSA 框架](https://slsa.dev/)

**口头回答版**：
> 企业级依赖治理要让依赖可见、可控、可信、可持续。分层设计上，底层是项目仓库和 CI/CD，中间是私有 registry 和缓存代理，上层是治理平台和策略引擎。关键环节包括：新增依赖准入审批、核心框架版本统一、CI 安全审计与许可证检查、Monorepo 规范、SBOM 归档。度量指标有过时依赖数、漏洞修复率、高风险许可证数、幽灵依赖数等。要注意流程不能太重，否则开发者会抵触。

---

### FB-23-SD-R-025：如何设计前端供应链安全防御体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：23 包管理与供应链安全
**标签**：supply-chain-security、防御体系、零信任、纵深防御
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套覆盖开发者、CI、Registry、运行时四个层面的前端供应链安全防御体系，重点说明如何防范 typosquatting、恶意包、账号盗用和构建篡改。

**参考答案**：

### 防御纵深

```text
┌─────────────────────────────────────────┐
│  Layer 4: 运行时隔离                      │
│  最小权限、只读文件系统、网络白名单          │
├─────────────────────────────────────────┤
│  Layer 3: CI/CD 安全                      │
│  签名验证、SBOM、不可变构建、审计日志         │
├─────────────────────────────────────────┤
│  Layer 2: Registry / 依赖源               │
│  私有 registry、缓存代理、白名单、签名        │
├─────────────────────────────────────────┤
│  Layer 1: 开发者与准入                      │
│  依赖审批、IDE 插件、typosquatting 检测      │
└─────────────────────────────────────────┘
```

### Layer 1：开发者与准入

- **依赖审批**：新增依赖需提交申请，说明用途、体积、许可证、安全风险。
- **名称检查**：使用 typosquatting 检测工具，防止拼写错误安装恶意包。
- **IDE 插件**：实时提示未在允许列表中的依赖。
- **安全培训**：定期普及供应链攻击案例。

### Layer 2：Registry / 依赖源

- **私有 Registry**：所有安装必须经过公司 Verdaccio / Artifactory。
- **白名单**：只允许安装审批过的公共包。
- **缓存与签名**：缓存 tarball 并验证 integrity 和 provenance。
- **Namespace 保护**：内部包强制使用 `@company/` scope。

### Layer 3：CI/CD 安全

- **禁用脚本安装**：`pnpm install --ignore-scripts` 或 CI 环境变量。
- **lockfile 校验**：`--frozen-lockfile`，禁止 CI 修改 lockfile。
- **签名验证**：`npm audit signatures` 验证 provenance。
- **SBOM 生成**：每次构建生成并归档 SBOM。
- **不可变构建**：固定构建镜像、Node 版本、包管理器版本。

### Layer 4：运行时隔离

- 容器以非 root 运行。
- node_modules 只读，禁止运行时修改。
- 网络出口白名单，限制异常外联。
- 使用 CSP、Subresource Integrity 保护前端静态资源。

### 应急响应

1. 发现恶意包后立即从 registry、缓存、产物中移除。
2. 扫描所有项目是否受影响。
3. 回滚到安全版本并重新构建。
4. 复盘并更新防御规则。

**评分维度**：
- 能按四层/多层面设计防御体系（35%）
- 能针对 typosquatting、恶意包、账号盗用给出具体措施（30%）
- 能说明 CI/CD 中的关键安全控制点（20%）
- 能给出应急响应流程（15%）

**常见错误**：
- 只关注某一个层面（如只审计不控制 registry）。
- 认为运行时不需要隔离，只要依赖安全就行。
- 忽略开发者层面的安全教育和审批。

**延伸追问**：
- 如果攻击者通过合法的 CI 工作流注入了恶意代码，如何检测？
- 零信任架构在供应链安全中如何落地？

**相关题目**：
- [FB-23-SE-A-013 供应链攻击常见手段](#FB-23-SE-A-013)
- [FB-23-SE-P-018 Sigstore 与 Provenance](#FB-23-SE-P-018)

**参考资源**：
- [OWASP - Software Supply Chain Integrity](https://owasp.org/www-project-software-supply-chain-integrity/)
- [Google SLSA](https://slsa.dev/)

**口头回答版**：
> 供应链安全要分层防御。开发者层做依赖审批、typosquatting 检测、安全培训；Registry 层用私有 registry、白名单、缓存和签名验证；CI/CD 层禁用 postinstall、校验 lockfile、验证 provenance、生成 SBOM；运行时层做最小权限、只读 node_modules、网络白名单。应急响应发现恶意包要立刻移除、扫描、回滚、复盘。不能只在某一层做安全，要纵深防御。

---

### FB-23-SC-R-026：从 0 开始设计一个 Monorepo 包管理方案

**题型**：场景设计题 / 系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：23 包管理与供应链安全
**标签**：Monorepo、workspace、包管理方案、架构设计
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
假设公司要启动一个前端 Monorepo，包含 5 个业务应用、10 个共享包、3 个工具库。请从包管理器选择、目录结构、依赖策略、发布流程、CI 设计五个方面给出完整方案。

**参考答案**：

### 1. 包管理器选择

推荐 **pnpm**，理由：

- workspace 支持优秀，`workspace:` 协议简化本地引用。
- 严格依赖树，避免幽灵依赖，适合多子包协作。
- 全局 store 节省磁盘，CI 缓存快。
- `--filter` 支持精确构建子集。

### 2. 目录结构

```text
monorepo/
├── apps/
│   ├── app-a/
│   ├── app-b/
│   └── ...
├── packages/
│   ├── ui-kit/
│   ├── utils/
│   ├── hooks/
│   ├── api-client/
│   └── ...
├── tools/
│   ├── eslint-config/
│   ├── ts-config/
│   └── cli/
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── turbo.json
└── package.json
```

### 3. 依赖策略

- **公共运行时依赖**（如 React、lodash）统一在根 `package.json` 管理，子包用 `catalog:` 或固定版本。
- **子包之间引用**使用 `workspace:*`。
- **peerDependencies**：共享库（如 ui-kit）把 React 声明为 peer，避免多版本。
- **禁止跨子包直接引用未声明依赖**，通过 ESLint `no-extraneous-dependencies` 检测。

### 4. 发布流程

- 使用 **Changesets** 管理版本和 changelog：

```bash
pnpm changeset add     # 开发者添加变更集
pnpm changeset version # 自动 bump 版本
pnpm changeset publish # 发布到 registry
```

- 发布前跑单元测试、构建、类型检查。
- 发布后打 tag、写 release note。

### 5. CI 设计

```yaml
jobs:
  install:
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile

  lint-and-test:
    needs: install
    run: pnpm -r run lint test

  build:
    needs: install
    run: pnpm turbo run build --filter=...[HEAD^1]

  publish:
    if: github.ref == 'refs/heads/main'
    run: pnpm changeset publish
```

### 额外考虑

- **远程缓存**：接入 Turborepo Remote Cache，加速 CI 构建。
- **依赖隔离**：对 ui-kit 等共享包做独立测试，避免循环依赖。
- **文档站点**：每个共享包配套 README 和 Storybook/Demo。

**评分维度**：
- 能合理选择包管理器并说明理由（15%）
- 能设计清晰的目录结构（20%）
- 能制定依赖策略和版本管理规则（25%）
- 能设计发布流程（20%）
- 能给出 CI 方案和优化手段（20%）

**常见错误**：
- 目录结构按团队而不是按应用/包划分，导致耦合。
- 子包之间随意引用，不通过 workspace 协议。
- 没有版本管理工具，靠手动改版本号。
- CI 不做增量构建，每次都全量。

**延伸追问**：
- 如果某个共享包被 5 个应用依赖，它的 breaking change 如何协调升级？
- Turborepo 的 pipeline 和 pnpm workspace 有什么关系？

**相关题目**：
- [FB-23-EN-A-011 Monorepo workspace](#FB-23-EN-A-011)
- [FB-23-SD-R-024 企业级依赖治理](#FB-23-SD-R-024)

**参考资源**：
- [pnpm - Workspaces](https://pnpm.io/workspaces)
- [Changesets](https://github.com/changesets/changesets)
- [Turborepo](https://turbo.build/repo)

**口头回答版**：
> 我会选 pnpm 做 Monorepo 包管理器。目录分 apps、packages、tools，packages 放共享库，apps 放业务应用。依赖策略上，公共运行时依赖统一版本，子包之间用 workspace:* 引用，共享库把 React 这类宿主依赖声明为 peerDependencies。发布用 Changesets 管版本和 changelog。CI 里用 frozen-lockfile 安装，用 Turborepo 做增量构建和远程缓存。还要配 ESLint 禁止幽灵依赖，每个共享包要有独立测试和文档。

---

### FB-23-SD-R-027：如何设计 lockfile 安全审计与自动化修复平台？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：23 包管理与供应链安全
**标签**：lockfile、安全审计、自动化修复、平台设计
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个面向企业的 lockfile 安全审计与自动化修复平台，能够接入多个项目、扫描 lockfile 中的漏洞、检测异常依赖、自动生成修复 PR。

**参考答案**：

### 平台目标

- 自动发现所有项目的依赖漏洞。
- 检测 lockfile 异常（integrity 缺失、可疑 resolved URL、未声明依赖）。
- 自动生成并验证修复 PR。
- 提供可视化报表和告警。

### 系统架构

```text
┌─────────────────────────────────────────┐
│  Web Dashboard / 告警通知                 │
├─────────────────────────────────────────┤
│  API Service：项目注册、扫描调度、策略管理   │
├─────────────────────────────────────────┤
│  Scan Workers：                           │
│  - SCA 扫描（OSV/Snyk/npm advisory）       │
│  - Lockfile 结构校验                       │
│  - 许可证扫描                              │
│  - 签名验证                                │
├─────────────────────────────────────────┤
│  Data Store：漏洞库、扫描结果、SBOM         │
├─────────────────────────────────────────┤
│  Integration：GitHub/GitLab / CI / Registry│
└─────────────────────────────────────────┘
```

### 核心功能

**1. 项目接入**

- 通过 GitHub App / GitLab Webhook 自动发现仓库。
- 支持 npm/yarn/pnpm 三种 lockfile。

**2. 扫描引擎**

- 解析 lockfile，提取依赖名、版本、resolved URL、integrity。
- 对接 OSV、Snyk、npm advisory 查询 CVE。
- 检测 integrity 是否缺失或格式异常。
- 检查 resolved URL 是否来自可信 registry。

**3. 修复策略**

| 漏洞等级 | 自动修复 | 人工确认 |
|----------|---------|---------|
| critical | 自动 bump patch 版本，生成 PR | 合并前人工 review |
| high | 生成 PR，推荐升级方案 | 人工合并 |
| moderate/low | 报告，定期批量处理 | 按计划处理 |

**4. 修复验证**

- PR 触发 CI：安装 → 测试 → 构建 → 扫描验证。
- 如果修复引入 breaking change，标记为需人工处理。

**5. 异常检测**

- 新增依赖不在白名单，自动告警。
- lockfile 中 resolved URL 指向非官方 registry。
- integrity 与 registry 返回不一致。

### 关键技术点

- **增量扫描**：只扫描 lockfile diff 部分，提高效率。
- **冲突解决**：自动 rebase PR，处理 lockfile 冲突。
- **策略引擎**：支持按项目/团队配置不同阈值和白名单。
- **SBOM 关联**：把每次扫描结果与 SBOM 绑定，便于追溯。

### 落地方案

- 阶段一：接入核心项目，只做扫描和报表。
- 阶段二：加入自动 PR 能力，处理 patch 级漏洞。
- 阶段三：接入 CI 阻断和策略引擎，实现全自动化。

**评分维度**：
- 能设计清晰的平台架构（30%）
- 能说明扫描引擎和修复策略（30%）
- 能提到异常检测和验证流程（20%）
- 能给出分阶段落地方案（20%）

**常见错误**：
- 一开始就追求全自动化，忽略误报和 breaking change 风险。
- 只做漏洞扫描，不做 lockfile 结构校验。
- 没有与现有 CI/Git 流程集成。

**延伸追问**：
- 自动修复 PR 如何避免把 high 危漏洞的升级带到 production？
- 如果扫描结果误报很多，如何降低噪音？

**相关题目**：
- [FB-23-CO-B-008 npm audit](#FB-23-CO-B-008)
- [FB-23-SD-R-025 供应链安全防御体系](#FB-23-SD-R-025)

**参考资源**：
- [OSV Schema](https://ossf.github.io/osv-schema/)
- [Snyk Open Source](https://snyk.io/product/open-source-security-management/)

**口头回答版**：
> 这个平台要接 GitHub/GitLab 自动发现仓库，扫描 npm/yarn/pnpm 的 lockfile。扫描引擎要查 CVE、校验 integrity、检查 resolved URL 是否可信。对不同等级漏洞分级处理：critical 自动 bump patch 并生成 PR，high 生成 PR 等人工合并，低危定期批量处理。修复 PR 要走 CI 验证，防止引入 breaking change。还要做异常检测，比如新增未审批依赖、integrity 异常。建议分阶段落地，先做扫描报表，再做自动 PR，最后接入 CI 阻断。

---

### FB-23-CP-R-028：大前端团队如何进行包管理标准化与工具链建设？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：23 包管理与供应链安全
**标签**：包管理标准化、工具链、前端工程化、团队协作
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请为大前端团队（Web、小程序、RN、Node BFF）设计一套包管理标准化与工具链建设方案，包括统一包管理器、共享包规范、发布流程、安全与性能治理。

**参考答案**：

### 1. 统一包管理器

- 全团队使用 **pnpm**，制定统一版本（如 v8）。
- 通过 `.npmrc` 统一配置：

```ini
shamefully-hoist=false
strict-peer-dependencies=false
registry=https://registry.company.com/
```

- 开发环境使用 Corepack 锁定包管理器版本：

```json
{
  "packageManager": "pnpm@8.15.0"
}
```

### 2. 目录与命名规范

- 共享包统一使用 `@company/` scope。
- 按功能域划分：

```text
packages/
├── @company/ui-kit/        # UI 组件
├── @company/hooks/         # 通用 Hooks
├── @company/utils/         # 工具函数
├── @company/api-client/    # BFF/API
├── @company/rn-bridge/     # RN 桥接
└── @company/miniapp-sdk/   # 小程序 SDK
```

### 3. 共享包开发规范

- 必须同时输出 ESM 和 CJS（`"module"`、`"main"`、`"exports"`）。
- 声明 `sideEffects`，便于 tree-shaking。
- 共享库核心依赖声明为 `peerDependencies`。
- 必须包含 README、类型定义、单元测试。

### 4. 发布流程

- 使用 Changesets 管理版本和 changelog。
- CI 自动执行：lint → test → build → publish → tag。
- 发布后通知相关团队，更新内部文档。

### 5. 安全与性能治理

- 安全：私有 registry、依赖白名单、CI audit、provenance 验证。
- 性能：体积门禁、tree-shaking 检查、重复依赖检测。
- 治理平台：统一看板展示各项目依赖健康度。

### 6. 跨栈适配

- Web/RN/小程序共享包需注意运行环境差异，使用条件导出：

```json
{
  "exports": {
    ".": {
      "node": "./dist/index.cjs",
      "browser": "./dist/index.esm.js",
      "react-native": "./dist/index.rn.js",
      "default": "./dist/index.esm.js"
    }
  }
}
```

### 7. 工具链支持

- 内部 CLI：创建共享包、检查依赖合规、一键升级。
- IDE 插件：提示未声明依赖、包体积、许可证风险。
- 文档站点：统一展示所有共享包 API 和示例。

**评分维度**：
- 能统一包管理器并说明理由（15%）
- 能设计共享包规范和目录结构（20%）
- 能制定发布流程（20%）
- 能覆盖安全、性能、跨栈适配（30%）
- 能提到工具链和治理平台（15%）

**常见错误**：
- 每个项目各自为政，使用不同包管理器。
- 共享包输出格式不统一，导致 tree-shaking 失效。
- 忽略 RN/小程序的运行时差异。
- 没有统一的依赖审批和审计机制。

**延伸追问**：
- 如果某个业务方坚持在 RN 项目用 yarn Berry PnP，你怎么协调？
- 跨栈共享包如何做好运行时兼容性测试？

**相关题目**：
- [FB-23-SD-R-024 企业级依赖治理](#FB-23-SD-R-024)
- [FB-23-SC-R-026 从 0 设计 Monorepo](#FB-23-SC-R-026)

**参考资源**：
- [Corepack](https://nodejs.org/api/corepack.html)
- [Node.js - Conditional Exports](https://nodejs.org/api/packages.html#conditional-exports)

**口头回答版**：
> 大前端团队我会统一用 pnpm，通过 packageManager 字段和 Corepack 锁定版本。共享包统一 @company/ scope，按功能域划分，必须输出 ESM/CJS、声明 sideEffects、写 README 和测试。发布用 Changesets 管版本和 changelog。安全和性能上要走私有 registry、依赖白名单、CI audit、体积门禁、tree-shaking 检查。跨栈共享包要用条件导出区分 browser、node、react-native。还要做内部 CLI、IDE 插件和治理平台，让全团队能统一看依赖健康度。

---

### FB-23-SC-R-029：设计一个依赖漏洞应急响应流程

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：23 包管理与供应链安全
**标签**：应急响应、漏洞修复、供应链安全、SLA
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
假设团队使用的某个流行依赖被发现 critical 级别漏洞，且已有公开利用方式。请设计一个从前线告警到修复闭环的应急响应流程。

**参考答案**：

### 响应流程

```text
告警触发
   │
   ▼
漏洞确认与影响评估
   │
   ▼
临时缓解措施
   │
   ▼
修复方案制定与验证
   │
   ▼
全量修复与发布
   │
   ▼
事后复盘与改进
```

### 1. 告警触发

- 来源：Dependabot、Snyk、npm audit、内部扫描平台、社区通报。
- 建立统一告警通道：企业微信/钉钉/Slack + 邮件 + PagerDuty。

### 2. 漏洞确认与影响评估

- 确认漏洞真实性：查看 CVE、advisory、PoC、官方公告。
- 评估影响范围：
  - 哪些项目/仓库使用了该依赖？
  - 是否在生产代码路径中被调用？
  - 受影响版本范围。
- 定级：critical/high/moderate/low，对应不同 SLA。

### 3. 临时缓解措施

- 如果漏洞在 devDependency 且不影响产物，可标记延后处理。
- 如果影响运行时：
  - 在 WAF/CDN/边缘节点加规则拦截已知利用模式。
  - 回滚到安全版本。
  - 临时禁用相关功能模块。
- 如果依赖包被投毒，立即从 registry 和缓存中移除。

### 4. 修复方案制定与验证

- **自动修复**：`npm audit fix`、 Dependabot PR，适用于 patch/minor 升级。
- **手动修复**：升级 major 版本、替换依赖、自行打补丁。
- **验证**：
  - 跑全量单元测试、集成测试、E2E。
  - 检查产物体积和性能回归。
  - 在 staging 环境验证。

### 5. 全量修复与发布

- 按项目优先级分批修复：核心交易系统优先，内部工具延后。
- 发布时生成新的 lockfile 和 SBOM。
- 通知相关团队和上层业务方。

### 6. 事后复盘与改进

- 记录漏洞发现时间、修复时间、影响范围。
- 分析为什么该漏洞能进入生产（准入缺失、扫描遗漏、未升级）。
- 更新依赖白名单、扫描规则、SLA。
- 定期开展红蓝演练。

### SLA 建议

| 等级 | 确认时间 | 修复时间 |
|------|---------|---------|
| critical | 1 小时 | 24 小时 |
| high | 4 小时 | 7 天 |
| moderate | 1 天 | 30 天 |
| low | 1 周 | 90 天 |

**评分维度**：
- 能设计完整的响应流程（30%）
- 能区分不同漏洞等级和 SLA（20%）
- 能给出临时缓解和修复验证手段（25%）
- 能提到事后复盘和机制改进（25%）

**常见错误**：
- 直接升级所有依赖，不做影响评估。
- 忽略临时缓解，等修复完成才行动。
- 没有事后复盘，同样漏洞反复出现。
- 不区分 devDependency 和 production dependency。

**延伸追问**：
- 如果漏洞依赖是 transitive dependency（间接依赖），如何快速定位并修复？
- 如果官方没有补丁，你会怎么处理？

**相关题目**：
- [FB-23-CO-B-008 npm audit](#FB-23-CO-B-008)
- [FB-23-SD-R-025 供应链安全防御体系](#FB-23-SD-R-025)

**参考资源**：
- [Google SRE - Incident Management](https://sre.google/sre-book/managing-incidents/)
- [NIST - Cybersecurity Incident Response](https://csrc.nist.gov/publications/detail/sp/800-61/final)

**口头回答版**：
> 应急响应流程分六步：告警触发、确认与影响评估、临时缓解、修复验证、全量修复发布、事后复盘。收到告警后先确认漏洞真实性和影响范围，看哪些项目、哪些代码路径受影响。Critical 级要先做临时缓解，比如 WAF 拦截、回滚版本、移除恶意包。修复方案可以是自动 audit fix，也可以是手动升级或替换依赖，修复后必须跑全量测试。最后要复盘，更新白名单和扫描规则。建议 critical 24 小时、high 7 天、moderate 30 天。

---

### FB-23-SD-R-030：如何设计前端构建产物的 SBOM 与可追溯体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：23 包管理与供应链安全
**标签**：SBOM、可追溯、构建产物、供应链、签名
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套前端构建产物的 SBOM 与可追溯体系，使得任何时刻都能从线上运行的 JS/CSS 文件追溯到源码 commit、构建 CI、依赖版本和发布签名。

**参考答案**：

### 体系目标

- 每个线上产物都能对应到唯一的源码版本和构建记录。
- 每个产物都附带完整的 SBOM，列出所有依赖及来源。
- 支持快速定位漏洞影响范围、快速回滚。

### 整体架构

```text
源码仓库
   │
   ▼
CI/CD 构建
   ├── 生成产物（JS/CSS/HTML）
   ├── 生成 SBOM
   ├── 生成 Provenance Attestation
   ├── 对产物签名
   └── 上传到产物仓库
   │
   ▼
产物仓库 / CDN
   ├── 产物文件
   ├── .sbom.json
   ├── .provenance.json
   └── .signature
   │
   ▼
线上运行时
   └── 可验证签名、查询来源
```

### 关键环节

**1. SBOM 生成**

- 构建时使用 `npm sbom`、`@cyclonedx/cyclonedx-npm` 或 `pnpm sbom`。
- SBOM 包含：依赖名、版本、resolved URL、integrity、许可证、依赖关系。
- 与产物一起归档，文件名如 `app-1.2.3.sbom.json`。

**2. Provenance / Attestation**

- 在 GitHub Actions 中启用 npm provenance，记录：
  - 源码 commit SHA。
  - 工作流定义文件。
  - 构建参数和 runner 信息。
- 非 npm 产物可用 Sigstore cosign 生成 attestation。

**3. 签名**

- 使用组织私钥对产物哈希签名，或采用 Sigstore 无密钥签名。
- 签名文件随产物分发，部署时验证。

**4. 产物元数据**

```json
{
  "version": "1.2.3",
  "commit": "abc123",
  "branch": "main",
  "workflow": ".github/workflows/release.yml",
  "runId": "123456789",
  "sbom": "app-1.2.3.sbom.json",
  "provenance": "app-1.2.3.provenance.json",
  "signature": "app-1.2.3.sig"
}
```

**5. 查询与验证平台**

- 提供 Web 界面，输入产物版本或 hash 查询来源。
- 集成 CVE 数据库，一键扫描该版本 SBOM 的漏洞。
- 支持签名验证和 provenance 校验。

### 部署验证

- 部署脚本下载产物后，先验证签名和完整性。
- 如果验证失败，拒绝部署。
- 容器镜像中也保留 SBOM，方便运行时审计。

### 合规与审计

- 满足 SLSA Level 2/3 要求。
- 定期审计构建流水线和签名密钥安全。
- 密钥使用 KMS/HSM 管理，定期轮换。

**评分维度**：
- 能设计完整的可追溯架构（30%）
- 能说明 SBOM、Provenance、签名的生成方式（30%）
- 能给出产物元数据设计（20%）
- 能提到部署验证和合规要求（20%）

**常见错误**：
- 只生成 SBOM，不关联具体产物版本。
- 签名密钥管理不当，泄露后无法追溯。
- 产物部署时不做签名验证。
- 忽略运行时查询平台的建设。

**延伸追问**：
- 如果构建产物被 CDN 缓存，如何保证更新后的 SBOM 也能同步？
- 前端产物通常是公开的，签名验证怎么防止被绕过？

**相关题目**：
- [FB-23-SE-P-018 Sigstore 与 Provenance](#FB-23-SE-P-018)
- [FB-23-SE-P-021 SBOM 与许可证合规](#FB-23-SE-P-021)

**参考资源**：
- [SLSA Provenance](https://slsa.dev/provenance/v1)
- [CycloneDX - Attestations](https://cyclonedx.org/capabilities/attestations/)

**口头回答版**：
> 可追溯体系要让每个线上产物都能追溯到源码 commit、CI 构建、依赖版本和签名。构建时生成产物、SBOM、Provenance Attestation，并对产物签名，一起归档到产物仓库。SBOM 用 npm sbom 或 CycloneDX 生成，包含依赖和许可证。Provenance 用 GitHub Actions 的 npm provenance 或 Sigstore cosign，记录 commit 和工作流。部署时先验证签名和完整性。还要建一个查询平台，输入版本号就能查来源、扫漏洞。密钥要用 KMS 管理并定期轮换。

### FB-23-CO-B-009：content-addressable store 中版本号与内容哈希如何协同定位依赖？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：版本号、content-addressable-store
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
在 npm/pnpm 的 content-addressable store 中，同一个包的不同版本会以 tarball 的内容哈希作为文件名或目录名进行存储。请解释：
1. 版本号（如 `lodash@4.17.21`）与内容哈希（integrity）各自解决什么问题？
2. 安装时包管理器如何通过版本号查找到对应哈希文件？
3. 当 registry 重新发布同一版本（publish 被覆盖）时，为什么 content-addressable store 能发现异常？

**参考答案**：

### 版本号与内容哈希的分工

- **版本号（SemVer）**：解决“人类/工程语义”问题，告诉包管理器需要哪个兼容范围。`package.json` 和 lockfile 中主要用版本号描述依赖约束。
- **内容哈希（integrity）**：解决“文件真实性”问题，由 tarball 的 SHA-512/SHA-1 计算得出。只要文件内容变一个字节，哈希就会变化。

### 协同定位流程

以 pnpm 为例：

1. 解析 `package.json` 与 `pnpm-lock.yaml`，得到包名和预期版本（如 `lodash@4.17.21`）。
2. lockfile 中已记录该版本的 `resolution` 与 `integrity`（例如 `sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==`）。
3. 包管理器先到全局 store（默认 `~/.local/share/pnpm/store`）按 **内容哈希** 查找该 tarball 是否已存在；存在则通过 hard link 复用，不再下载。
4. 若 store 中没有，则从 registry 下载 tarball，计算本地哈希并与 lockfile 中的 `integrity` 比对，一致才写入 store 与 node_modules。

### 重新发布同一版本的异常检测

registry 理论上禁止覆盖已发布版本，但某些私有 registry 或误操作可能发生。content-addressable store 的校验机制会发现：

- 下载到的 tarball 哈希与 lockfile 中记录的不一致；
- 包管理器会抛出 `EINTEGRITY` 错误，提示内容被篡改或重新发布；
- 这强制团队重新确认版本来源，避免静默引入不同代码。

### 最佳实践

- lockfile 必须提交 Git，作为“版本号 → 内容哈希”的唯一可信映射。
- CI 使用 `--frozen-lockfile`，防止安装过程中解析到新内容。
- 私有 registry 应开启不可变存储（immutable storage），禁止覆盖已发布版本。

**评分维度**：
- 能区分版本号与内容哈希的职责（35%）
- 能描述从版本号到哈希文件的查找流程（35%）
- 能说明同一版本被覆盖时的异常检测机制（20%）
- 能给出 lockfile 与 CI 最佳实践（10%）

**常见错误**：
- 认为版本号本身就足以保证文件内容一致，忽略 integrity 校验。
- 把 content-addressable store 等同于普通缓存，没理解“按内容寻址”的含义。
- 不清楚 lockfile 中 integrity 字段的实际作用。
- 认为同一版本被重新发布是正常行为，不需要报警。

**延伸追问**：
- 如果 store 中已存在某个哈希文件，pnpm 如何确保项目内安装的是该版本的正确文件？
- npm 的 `package-lock.json` 与 pnpm 的 `pnpm-lock.yaml` 在 integrity 字段组织上有何差异？

**参考资源**：
- [npm Docs - package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- [pnpm - How peers are resolved](https://pnpm.io/how-peers-are-resolved)
- [W3C - Subresource Integrity](https://www.w3.org/TR/SRI/)

**口头回答版**：
> 版本号解决“我要哪个兼容版本”的问题，内容哈希解决“这个文件是不是原来的文件”的问题。包管理器解析 lockfile 拿到版本号和 integrity，先去全局 store 按哈希找文件，有就直接 hard link 复用；没有就下载并校验哈希。如果 registry 把同一个版本重新发布，文件哈希会变，安装就会报 EINTEGRITY 错误，这说明内容被篡改了。所以 lockfile 一定要提交，CI 要用 frozen-lockfile。

---

### FB-23-SC-B-001：如何为 pnpm 项目启用 npm provenance 并保证 lockfile 与构建来源可审计？

**题型**：场景设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：provenance、pnpm-lock.yaml
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
npm 自 2023 年起支持 **provenance**，允许通过 Sigstore 公开证明“某个包确实由某个 CI 工作流构建并发布”。假设团队使用 pnpm 管理依赖，并希望在发布内部/公共包时满足供应链审计要求，请说明：
1. 发布侧如何配置 pnpm + GitHub Actions 生成 provenance attestation？
2. 消费侧如何通过 `npm audit signatures` 或 registry API 验证 provenance？
3. `pnpm-lock.yaml` 应如何与 provenance 信息联动，保证下游可追溯？

**参考答案**：

### 发布侧配置

在 GitHub Actions 中发布带 provenance 的 pnpm 包，需满足：

- 使用 npm >= 9.5.0 或 pnpm >= 8.4.0。
- 仓库为 public，或 npm 已开启 private package provenance。
- CI 工作流必须具有 `id-token: write` 权限，用于向 Sigstore 请求 OIDC token。

示例 workflow：

~~~yaml
name: Publish
on:
  push:
    tags: ['v*']
permissions:
  contents: read
  id-token: write
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org
      - run: pnpm install --frozen-lockfile
      - run: pnpm publish --access public --provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
~~~

发布后，npm package 页面会展示 “Published with provenance” 徽章，并提供 Sigstore 链接。

### 消费侧验证

- `npm audit signatures`：验证包的发布签名与 provenance attestation 是否有效。
- registry API：`https://registry.npmjs.org/{pkg}/{version}` 返回的 JSON 中 `dist.attestations` 字段包含 provenance 信息。
- 企业内网可搭建 Sigstore 镜像或私有 Fulcio/Rekor 实例，验证内部包。

### lockfile 与 provenance 联动

- `pnpm-lock.yaml` 记录每个包的 `resolution`、`integrity` 与 registry URL，是“安装了什么”的静态证据。
- provenance 是“谁构建/发布的”动态证据。
- 团队应在 CI 中同时校验：
  1. `pnpm install --frozen-lockfile` 保证 lockfile 一致；
  2. `npm audit signatures` 或 `pnpm audit` 验证来源签名；
  3. 关键依赖只允许来自有 provenance 的版本，减少被恶意替换的风险。

### 最佳实践

- 公共包优先发布带 provenance 的版本。
- 内部私有 registry 参考 npm provenance 规范，要求 CI 提供 OIDC 证明。
- 在 SBOM 中记录每个依赖的 provenance URL，便于法务/安全团队审计。

**评分维度**：
- 能说明 pnpm + GitHub Actions 发布 provenance 的必要条件与配置（35%）
- 能描述消费侧验证方式（30%）
- 能解释 lockfile 与 provenance 的互补关系（25%）
- 能给出企业级审计建议（10%）

**常见错误**：
- 以为 provenance 可以替代 lockfile，忽视两者的互补性。
- 在 CI 中忘记开启 `id-token: write` 导致 provenance 生成失败。
- 认为 provenance 只适用于公共包，不了解 private provenance 的适用条件。
- 没有将签名验证纳入日常 CI，只在出事后才查。

**延伸追问**：
- 如果某个依赖没有 provenance，团队应如何评估是否允许使用？
- 私有 registry 如何复用 Sigstore 生态实现内部 provenance？

**参考资源**：
- [npm Docs - Generating provenance statements](https://docs.npmjs.com/generating-provenance-statements)
- [pnpm - Publishing with provenance](https://pnpm.io/package_json#publishconfigprovenance)
- [Sigstore - Rekor](https://docs.sigstore.dev/logging/overview/)

**口头回答版**：
> 发布侧用 pnpm publish --provenance，在 GitHub Actions 里要开 id-token: write 权限。发布后 npm 页面会有 provenance 徽章，指向 Sigstore 证明。消费侧可以用 npm audit signatures 或 registry API 验证。lockfile 记录装了什么版本和哈希，provenance 证明是谁在 CI 里构建的，两者要一起用。企业里可以在 SBOM 里把 provenance URL 记下来，方便审计。

---

### FB-23-PE-B-001：pnpm install 因版本冲突导致解析变慢，如何排查与优化？

**题型**：性能优化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：版本冲突、CVE
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
某大型 Monorepo 使用 pnpm，最近 `pnpm install` 时间从 2 分钟增长到 15 分钟。通过 `pnpm why` 发现多个核心依赖（如 `lodash`、`react`）存在多个 major 版本。请说明：
1. 哪些工具和命令可以快速定位版本冲突热点？
2. 为什么 peerDependencies 冲突会显著拖慢解析速度？
3. 在不破坏业务代码的前提下，有哪些优化手段（如 overrides、resolutions、peerDependencyRules）？

**参考答案**：

### 定位工具与命令

- `pnpm why <pkg>`：查看某个包被哪些依赖引入、分别是什么版本。
- `pnpm list --depth=10`：输出完整依赖树，定位重复版本。
- `pnpm install --reporter=append-only`：查看解析耗时分布。
- `.pnpm-debug.log` / `pnpm-lock.yaml`：分析 lockfile 中同一包出现次数。
- 自定义脚本扫描 lockfile，统计每个包的不同版本数量，找出“版本爆炸”节点。

### peerDependencies 冲突为何拖慢解析

pnpm 对 peerDependencies 的处理非常严格：

- 当多个依赖对同一个 peer 要求不同版本范围时，pnpm 需要为每种组合生成不同的“虚拟依赖包”（virtual store entries）。
- 例如 `react@18` 被 A 依赖，`react@17` 被 B 依赖，A 和 B 的子依赖又分别有自己的 peer，组合数量会指数级增长。
- 这就是常说的 “peer dependency hell”，会显著增加 lockfile 体积和解析时间。

### 优化手段

1. **统一版本**：
   - 在 Monorepo 根目录通过 `packageExtensions` 或 `peerDependencyRules` 强制统一 peer 版本。
   - 例如 pnpm 的 `.npmrc` 中设置 `strict-peer-dependencies=false` 仅作为临时降级，不能替代版本治理。

2. **使用 overrides**：
   
   ~~~json
   "pnpm": {
     "overrides": {
       "lodash": "^4.17.21",
       "react": "$react"
     }
   }
   ~~~
   
   这样可以将所有子依赖的 lodash 强制指向单一版本。

3. **逐步升级**：
   - 对无法立即升级的遗留包，使用 aliases（如 `npm:lodash@^4`）过渡。
   - 将冲突最严重的依赖列为技术债，排期统一升级。

4. **缓存与并行**：
   - 确保 CI 使用 `pnpm store` 缓存。
   - 开启 `prefer-workspace-packages`、`dedupe-peer-dependents` 等优化选项。

### 最佳实践

- 每周运行一次 `pnpm dedupe` 或 `pnpm install --resolution-only` 清理 lockfile。
- 在 PR 中监控 lockfile 行数变化，行数激增时强制 review。
- 对核心依赖（React、Vue、lodash 等）建立“单一版本策略”。

**评分维度**：
- 能列出定位版本冲突的工具命令（25%）
- 能解释 peerDependencies 冲突导致解析变慢的原理（30%）
- 能给出 overrides/peerDependencyRules 等优化方案（30%）
- 能提出 lockfile 治理与监控机制（15%）

**常见错误**：
- 只盲目加 `--force` 或 `strict-peer-dependencies=false`，不解决根本冲突。
- 认为版本冲突只影响 bundle 体积，忽视安装解析性能。
- 不清楚 `pnpm overrides` 与 yarn `resolutions` 的语法差异。
- 升级 major 版本时没有回归测试计划。

**延伸追问**：
- `pnpm.peerDependencyRules.allowedVersions` 与 `overrides` 分别在什么场景下使用？
- 如果某个依赖必须保留两个 major 版本，如何在 lockfile 层面最小化影响？

**参考资源**：
- [pnpm - pnpm.overrides](https://pnpm.io/package_json#pnpmoverrides)
- [pnpm - peerDependencyRules](https://pnpm.io/package_json#pnpmpeerdependencyrules)
- [pnpm - Dedupe](https://pnpm.io/cli/dedupe)

**口头回答版**：
> 先用 pnpm why 和 pnpm list 看版本冲突热点。peer 冲突会拖慢解析，因为 pnpm 要为不同 peer 组合生成虚拟包。优化可以用 pnpm.overrides 强制统一版本，或者用 peerDependencyRules 放宽某些 peer 限制。还要定期 dedupe，监控 lockfile 行数。核心依赖最好只保留一个 major 版本。

---

### FB-23-EN-B-001：在 pnpm 项目中如何检测并清理幽灵依赖？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：hard link、幽灵依赖
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
pnpm 通过严格依赖树和 hard link 大幅减少了幽灵依赖（phantom dependencies），但在从 npm/yarn Classic 迁移而来的项目中，代码里仍可能残留对未声明包的直接引用。请说明：
1. 为什么会出现“pnpm 项目仍有幽灵依赖”的现象？
2. 有哪些工具或脚本可以扫描出项目中的幽灵依赖？
3. 发现幽灵依赖后，修复流程是什么？如何防止回潮？

**参考答案**：

### 为什么 pnpm 项目仍可能有幽灵依赖

- **历史迁移残留**：旧项目从 npm/yarn 迁移到 pnpm 时，某些代码仍 `import` 了被间接安装的包。
- **hoisting 配置**：开启了 `shamefully-hoist=true` 或 `.npmrc` 中 `public-hoist-pattern[]=*` 会临时把依赖提到顶层。
- **工具链兼容**：某些构建工具或 IDE 插件会自行解析依赖，掩盖了未声明引用的问题。
- **Monorepo 跨包引用**：子包 A 依赖了子包 B，但 B 的某个依赖被 A 直接引用，却没有在 A 的 package.json 中声明。

### 扫描工具与方法

- **eslint-plugin-import / eslint-plugin-node**：
  - 规则 `import/no-extraneous-dependencies` 可强制要求所有 `import` 的包必须在 package.json 中声明。
  - 对 Monorepo 需要配置 `import/resolver` 识别 `workspace:` 协议。

- **depcheck / knip**：
  - 扫描未使用依赖和缺失依赖。
  - 可结合 pnpm workspace 配置，识别跨包引用问题。

- **pnpm 自身命令**：
  - `pnpm exec node -e "require('foo')"` 在项目根目录执行，可验证 foo 是否为显式依赖。
  - 结合 `--dir` 参数在子包中逐一验证。

- **CI 脚本**：
  - 在 PR 中运行 `depcheck` 并将结果上传为评论或门禁。

### 修复与防回潮

1. **补声明**：将被直接引用但未声明的包加入对应子包的 `dependencies`/`devDependencies`。
2. **移除冗余**：如果某个依赖只是被间接使用且代码未引用，从 package.json 移除。
3. **关闭 hoist**：在 `.npmrc` 中移除 `shamefully-hoist` 和过度宽松的 `public-hoist-pattern`。
4. **门禁**：
   - ESLint `no-extraneous-dependencies` 设为 error。
   - CI 中运行 `pnpm install --frozen-lockfile` + `depcheck` + 构建，任一失败即阻断。

### 最佳实践

- 迁移到 pnpm 时，先关闭 shamefully-hoist 跑一遍全量构建/测试，让幽灵依赖暴露出来。
- 对 Monorepo 子包，明确每个包的 `dependencies` 边界，禁止跨包“蹭依赖”。
- 定期（如每迭代一次）运行 depcheck 并清理结果。

**评分维度**：
- 能解释 pnpm 项目仍出现幽灵依赖的原因（25%）
- 能列举 2-3 种扫描工具及其配置要点（30%）
- 能给出修复流程与防回潮措施（30%）
- 能结合 Monorepo 场景说明（15%）

**常见错误**：
- 认为用了 pnpm 就自动杜绝幽灵依赖，忽视迁移和 hoist 配置。
- 扫描到缺失依赖后只加在根目录 package.json，没加到真正引用的子包。
- 开启 `shamefully-hoist` 作为长期方案，而不是临时过渡。
- ESLint 规则配在 warn 级别，无法阻断新代码引入幽灵依赖。

**延伸追问**：
- 如果某个包必须被 hoist 到顶层（如原生模块），应如何配置 `public-hoist-pattern`？
- depcheck 的 false positive 通常有哪些？如何消减？

**参考资源**：
- [pnpm - Phantom dependencies](https://pnpm.io/next/blog/2020-05-27/flat-node-modules-is-not-the-only-way)
- [eslint-plugin-import no-extraneous-dependencies](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md)
- [depcheck](https://github.com/depcheck/depcheck)

**口头回答版**：
> pnpm 项目也可能有幽灵依赖，比如从 npm 迁移过来的残留，或者开了 shamefully-hoist。可以用 eslint-plugin-import 的 no-extraneous-dependencies 规则、depcheck、knip 来扫描。修复就是把缺失依赖加到真正引用的子包里，移除没引用的依赖，关掉不必要的 hoist。CI 里要设门禁，防止回潮。

---

### FB-23-SE-B-001：npm install 生命周期脚本（postinstall）有哪些供应链风险？企业应如何防御？

**题型**：安全题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：安装流程、依赖树
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
`postinstall`、`preinstall`、`install` 等生命周期脚本会在 `npm install` 时自动执行，这是供应链攻击的高频入口。请说明：
1. 攻击者可能通过生命周期脚本实施哪些具体攻击？
2. 企业级防御应从哪些层面入手（CI、Registry、运行时、治理）？
3. 如何在保证开发效率的前提下，安全地使用确实需要 postinstall 的依赖（如原生模块）？

**参考答案**：

### 常见攻击形式

- **远程命令执行**：`postinstall` 中执行 `curl | sh` 或下载二阶段恶意脚本。
- **环境信息窃取**：读取 `~/.npmrc`、`.env`、SSH key、AWS credentials 并外发。
- **源码污染**：修改本地文件、在构建产物中注入后门。
- **依赖替换**：安装时动态修改 lockfile 或替换 node_modules 中其他包的内容。
- **挖矿/勒索**：借安装脚本在开发者机器或 CI  runner 上运行恶意负载。

### 企业级防御分层

1. **Registry 层**：
   - 使用私有 registry / 代理，所有包必须经过安全扫描与审批。
   - 启用 Sigstore provenance、签名验证，拒绝无来源证明的包。

2. **CI 层**：
   - 默认设置 `ignore-scripts=true` 或 `npm config set ignore-scripts true`。
   - 安装阶段与构建阶段分离：先用 `--ignore-scripts` 安装，再在受控沙箱中按需执行特定脚本。
   - CI runner 使用最小权限、无 secret 挂载、网络 egress 受限。

3. **运行时/开发机层**：
   - 开发者本地安装时也建议 `--ignore-scripts`，需要时再手动执行。
   - 使用容器或虚拟机隔离开发环境，避免敏感文件被读取。

4. **治理层**：
   - 维护“允许执行 postinstall 的包白名单”，原生模块（如 `esbuild`、`sharp`）需走审批流程。
   - 监控依赖新增/升级 PR，对新增 postinstall 脚本做人工 review。
   - 使用 `npm pack --dry-run` 或 `pnpm publish` 前检查包内 scripts 字段。

### 安全使用原生模块

- 优先选择提供预编译 binary 的包，避免本地编译。
- 对必须执行 postinstall 的包，在 CI 中显式运行：`pnpm rebuild esbuild`。
- 用 `onlyBuiltDependencies`（pnpm）或 `trustedDependencies` 精确控制哪些包可以运行安装脚本。

### 最佳实践

- 在 `.npmrc` 中配置 `ignore-scripts=true` 作为默认策略。
- 将 `npm audit`、`pnpm audit`、SCA 工具纳入 CI 门禁。
- 对关键依赖建立 SBOM，记录每个包的 scripts 与来源。

**评分维度**：
- 能列举 postinstall 相关的具体攻击形式（30%）
- 能从 Registry/CI/运行时/治理四个层面给出防御措施（40%）
- 能说明如何安全使用原生模块（20%）
- 能提出治理与审计机制（10%）

**常见错误**：
- 认为“只装官方知名包”就足够，忽视 popular package 被劫持的案例。
- 在 CI 中直接 `npm install` 而不加 `--ignore-scripts`。
- 对所有 postinstall 一刀切禁用，导致原生模块无法安装，影响开发效率。
- 没有白名单和审批流程，任何人都可以引入带脚本的依赖。

**延伸追问**：
- 如果某个依赖的 postinstall 脚本必须运行，如何在 CI 中审查其内容？
- pnpm 的 `onlyBuiltDependencies` 与 npm 的 `--ignore-scripts` 有何差异？

**参考资源**：
- [npm Docs - scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [pnpm - onlyBuiltDependencies](https://pnpm.io/package_json#pnpmonlybuiltdependencies)
- [Snyk - npm install security](https://snyk.io/blog/ten-npm-security-best-practices/)

**口头回答版**：
> postinstall 脚本会在安装时执行任意代码，风险很高。攻击者可以用它执行远程命令、窃取环境变量、修改源码。企业要在 registry 层做扫描和签名验证，CI 里默认 ignore-scripts，需要时再在沙箱里跑。开发机也建议默认 ignore-scripts。原生模块比如 esbuild 可以加入 onlyBuiltDependencies 白名单。还要监控新增依赖的 postinstall 脚本。

---

### FB-23-SD-B-001：如何设计企业内部 npm 代理 Registry，实现跨项目依赖去重与统一缓存？

**题型**：系统设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：deduplication、包管理器选型
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
某公司有 50+ 前端项目，都直接连接 npm registry，导致安装慢、重复下载、版本不一致。请设计一个企业内部 npm 代理 Registry，要求：
1. 支持全局缓存与跨项目依赖去重；
2. 支持安全扫描与黑名单/白名单策略；
3. 支持与现有 CI、pnpm/yarn/npm 工具链无缝集成。

**参考答案**：

### 总体架构

~~~
开发者 / CI
    │
    ▼
企业内部 npm 代理（Verdaccio / Nexus / Artifactory / cnpmcore）
    │
    ├── 本地元数据缓存（package.json 索引）
    ├── 本地 tarball 缓存（按 content hash 去重）
    ├── 安全扫描模块（CVE / 许可证 / 恶意行为）
    └── 审批与黑名单策略
    │
    ▼
上游 registry（npmjs / 其他私有 registry）
~~~

### 全局缓存与去重

- **content-addressable 缓存**：tarball 按 SHA-512 命名存储，同一文件只保留一份，跨项目复用。
- **元数据缓存**：缓存 registry 返回的 package manifest，设置 TTL 减少上游查询。
- **uplink 配置**：Verdaccio 中配置多个 uplink（npmjs + 内部 registry），按优先级回源。
- **离线模式**：CI 使用 `--offline` 或 registry 提供离线 tarball，保证构建不依赖外网。

### 安全与治理

- **白名单/黑名单**：
  - 新包首次下载时自动触发扫描，命中 CVE 或恶意特征的包进入黑名单，所有项目禁止安装。
  - 维护“允许自动下载包”白名单，敏感包（如访问文件系统、网络的 postinstall 脚本）需人工审批。

- **签名与 provenance**：
  - 对内部发布包要求 Sigstore provenance 或企业内部签名。
  - 拒绝无签名或签名失效的包进入缓存。

- **许可证合规**：
  - 缓存层集成 license-checker，标记 GPL/AGPL/自定义冲突许可证。
  - 与法务系统联动，未经授权许可证的包阻断下载。

### 与工具链集成

- **.npmrc / .yarnrc / .pnpmfile.cjs**：
  - 统一配置 `registry=https://npm.mycompany.com`，禁止项目级覆盖。
  - 使用 `engine-strict`、`lockfileVersion` 等约束统一工具版本。

- **CI**：
  - 默认 `--ignore-scripts` + 代理 registry。
  - 构建前校验 lockfile 中所有 resolved URL 都指向企业内部域名。

- **监控**：
  - 统计热门包下载量、缓存命中率、扫描拦截次数。
  - 异常行为（如短时间内大量下载未使用过的包）触发告警。

### 选型建议

- 中小团队：Verdaccio 轻量、插件丰富、易二次开发。
- 大型企业：Sonatype Nexus / JFrog Artifactory，支持多语言仓库与细粒度权限。
- 超大规模：基于 cnpmcore 自研，深度定制扫描与审批流程。

**评分维度**：
- 能画出代理 Registry 的整体架构（25%）
- 能说明 content-addressable 缓存与去重机制（25%）
- 能给出安全扫描、黑白名单、签名验证方案（25%）
- 能说明与 npmrc/CI/监控的集成方式（25%）

**常见错误**：
- 把代理 Registry 当成简单缓存，不做安全扫描和来源验证。
- 允许项目随意切换 registry，破坏统一治理。
- 忽略 tarball 内容校验，缓存了被篡改的包。
- 没有监控和命中率指标，无法评估缓存效果。

**延伸追问**：
- 如果代理 Registry 宕机，CI 如何保证构建不中断？
- 如何处理上游 registry 删除了某个版本，但企业内部项目仍依赖它的情况？

**参考资源**：
- [Verdaccio](https://verdaccio.org/)
- [cnpmcore](https://github.com/cnpm/cnpmcore)
- [npm Docs - .npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)

**口头回答版**：
> 企业可以搭一个 npm 代理 Registry，比如 Verdaccio 或 Nexus。它向上游回源，本地按 content hash 缓存 tarball，实现跨项目去重。还要做安全扫描、黑白名单、许可证检查，内部发布的包要求签名或 provenance。所有项目的 .npmrc 统一指向代理，CI 里校验 resolved URL 都在企业域名下，并默认 ignore-scripts。

---

### FB-23-CP-B-001：结合 package.json 规范与 lockfile 管理，谈谈依赖标准化的实践经验

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：标准化、依赖管理
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
在一个多团队、多仓库的前端组织中，依赖管理经常出现版本碎片化、lockfile 冲突、scripts 命名混乱等问题。请结合 `package.json` 规范与 lockfile 管理，谈谈你会如何推进依赖标准化。

**参考答案**：

### package.json 标准化

1. **统一字段规范**：
   - `engines` 强制 node / pnpm 版本，配合 `engine-strict=true`。
   - `packageManager` 字段声明具体版本（如 `pnpm@8.15.0`），避免不同成员使用不同管理器。
   - `type`、`sideEffects`、`exports`、`files` 统一规范，减少发布产物不一致。

2. **依赖分类清晰**：
   - 运行时依赖放 `dependencies`，构建/测试工具放 `devDependencies`。
   - 插件/组件库的宿主依赖必须放 `peerDependencies`，并配 `peerDependenciesMeta`。
   - 禁止把 `dependencies` 当“万能桶”。

3. **Scripts 命名统一**：
   - 约定 `build`、`test`、`lint`、`typecheck`、`release` 等标准命令名。
   - 使用 `npm-run-all2` / `concurrently` 组合复杂任务，避免 scripts 过长。

### lockfile 标准化

- **必须提交 Git**，并设置 `.gitattributes` 减少 diff 噪音。
- **CI 严格模式**：
  - npm：`npm ci`
  - yarn：`yarn install --frozen-lockfile`
  - pnpm：`pnpm install --frozen-lockfile`
- **更新流程**：
  - 依赖升级必须通过独立 PR，附带 `pnpm-lock.yaml` 或 `package-lock.json` 变更。
  - 使用 Renovate/Dependabot 自动提 PR，但需人工 review 并跑完全量测试。

### 组织级治理

- **共享配置包**：
  - `@company/eslint-config`、`@company/tsconfig`、`@company/prettier-config` 统一代码风格。
  - 通过 `catalog:`（pnpm v9+）统一 Monorepo 公共依赖版本。

- **依赖审批流程**：
  - 新增依赖需在内部系统登记，说明用途、许可证、体积、维护活跃度。
  - 高风险包（如带 postinstall 脚本）需安全团队审批。

- **度量和复盘**：
  - 每月统计各仓库依赖数量、重复版本数、lockfile 冲突次数。
  - 对碎片化严重的依赖制定统一升级计划。

### 最佳实践

- 制定《前端依赖管理规范》文档，并在 onboarding 中培训。
- 使用 `@manypkg/cli` 检查 Monorepo 中版本不一致和依赖类型错误。
- 禁止本地手动修改 lockfile，所有变更通过包管理器命令生成。

**评分维度**：
- 能从 package.json 字段、依赖分类、scripts 命名等角度提出规范（35%）
- 能说明 lockfile 提交、CI 严格模式、升级流程（30%）
- 能提出组织级治理手段（共享配置、审批、度量）（25%）
- 能结合自身项目经验举例（10%）

**常见错误**：
- 只发文档不落地，缺少工具和 CI 门禁。
- 允许不同仓库使用不同包管理器或版本，导致 lockfile 格式混乱。
- 把 lockfile 加入 .gitignore，导致构建不可复现。
- 依赖升级 PR 不做回归测试，直接合并。

**延伸追问**：
- 如何说服业务团队配合统一依赖升级，而不是各自为政？
- pnpm 的 `catalog:` 如何帮助 Monorepo 实现依赖版本标准化？

**参考资源**：
- [npm Docs - package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [pnpm - Catalogs](https://pnpm.io/catalogs)
- [manypkg](https://github.com/Thinkmill/manypkg)

**口头回答版**：
> 依赖标准化要从 package.json 和 lockfile 两边抓。package.json 要统一 engines、packageManager、scripts 命名，依赖分类要清晰，peerDependencies 不能乱用。lockfile 必须提交，CI 用 frozen-lockfile。组织层面要有共享的 eslint/tsconfig 配置、新增依赖审批流程，用 Renovate 自动提升级 PR。还要定期统计依赖碎片化指标，推动统一升级。

---

### FB-23-CA-B-001：分析以下 workspace 引用代码的输出与原因

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：workspace、包管理方案
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
某 pnpm Monorepo 结构如下：

~~~
packages/
  app/
    package.json  -> { "name": "@co/app", "dependencies": { "@co/lib": "workspace:*" } }
  lib/
    package.json  -> { "name": "@co/lib", "main": "index.js" }
    index.js      -> module.exports = "lib-v1"
~~~

在 `packages/app` 目录下执行：

~~~js
const lib = require("@co/lib");
console.log(lib);
~~~

请说明：
1. 输出结果是什么？
2. pnpm 在 node_modules 中如何建立 @co/lib 的链接？
3. 如果将 lib 的 package.json 改为 `"main": "src/index.ts"` 且未编译，require 会报什么错？为什么？

**参考答案**：

### 输出结果

~~~
lib-v1
~~~

### 链接机制

pnpm 在 `packages/app/node_modules/@co/lib` 创建一个 **符号链接**，指向 `packages/lib` 的真实目录。

具体结构近似：

~~~
packages/app/node_modules/
  @co/lib -> ../../../lib
~~~

因此 `require("@co/lib")` 会解析到 `packages/lib/index.js`，执行该模块得到字符串 `"lib-v1"`。

### 修改 main 后的报错

如果 `main` 改为 `"src/index.ts"`：

- Node.js 默认不认识 `.ts` 文件，会尝试按 `.js`、`.json`、`.node` 等扩展名解析。
- 最终抛出 `Error: Cannot find module 'src/index.ts'` 或 `Error: Cannot find module '@co/lib'`。
- 即使文件存在，Node 也会因无法解析 TypeScript 语法而失败。

### 正确做法

- 在 lib 包内用 tsc/esbuild/swc 编译出 `.js` 产物，`main` 指向产物入口。
- 或在 Monorepo 根目录配置 ts-node / tsx，让开发时直接运行 TypeScript。
- 对发布包，`files` 字段应只包含编译产物，避免源码泄漏。

### 最佳实践

- workspace 子包之间用 `workspace:*` 或 `workspace:^` 引用，发布时自动替换为真实版本。
- 子包 `main`/`module`/`exports` 必须指向已编译产物，不能指向 TypeScript 源码。
- 在 CI 中运行 `pnpm -r build` 确保所有子包产物已生成。

**评分维度**：
- 能正确判断输出结果（25%）
- 能解释 workspace 软链接机制（30%）
- 能分析修改 main 后的报错原因（30%）
- 能给出 Monorepo 子包入口与构建规范（15%）

**常见错误**：
- 以为 workspace 引用会复制文件，不知道用的是软链接。
- 认为 TypeScript 源码可以直接被 Node require。
- 混淆 `workspace:*` 与 `workspace:^` 的语义差异。
- 发布时未把 `main` 指向编译产物，导致消费者安装后无法运行。

**延伸追问**：
- `workspace:*` 在 `pnpm publish` 时会被替换成什么？
- 如果子包 A 和 B 同时依赖不同版本的 lodash，pnpm 的 node_modules 会怎么组织？

**参考资源**：
- [pnpm - Workspaces](https://pnpm.io/workspaces)
- [Node.js - module resolution](https://nodejs.org/api/modules.html#all-together)
- [npm Docs - package.json main](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#main)

**口头回答版**：
> 输出是 lib-v1。pnpm 会在 app 的 node_modules 里创建一个指向 packages/lib 的软链接，所以 require 会找到 lib/index.js。如果把 main 改成 src/index.ts，Node 不认识 .ts，会报 Cannot find module。正确做法是 main 指向编译后的 .js，或者用 ts-node 做开发时支持。workspace 子包之间用 workspace:* 引用，发布时自动替换成真实版本。

---

### FB-23-SS-A-001：谈谈你处理 typosquatting 或恶意包供应链事件的实践经验

**题型**：软技能题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：应急响应、typosquatting
**出现频率**：高频
**预计回答时长**：5-7 分钟

**题目描述**：
假设你所在团队发现 CI 环境中安装了一个 typosquatting 包（如将 `loadash` 误装为 `lodash`），且该包在 postinstall 脚本中尝试读取环境变量。请结合一次真实或假设的应急响应经历，说明你的处理过程与反思。

**参考答案**：

### 应急响应流程

1. **遏制影响**：
   - 立即停止相关 CI pipeline，隔离受影响的 runner/机器。
   - 回滚到上一个已知干净的 lockfile 版本，阻止恶意包继续扩散。
   - 如果已发布到生产，启动版本回滚并通知业务方。

2. **取证分析**：
   - 确定恶意包名称、版本、引入路径（是 package.json 直接依赖还是间接依赖）。
   - 分析 postinstall 脚本行为：读取了哪些文件/环境变量、是否外发网络请求。
   - 检查 CI runner 是否暴露了 NPM_TOKEN、AWS_KEY、GITHUB_TOKEN 等敏感变量。

3. **修复与清理**：
   - 从所有仓库中移除恶意包，并重新生成 lockfile。
   - 清理论坛/本地开发机 node_modules 与全局 store。
   - 轮换所有可能泄露的 token 和密码。

4. **加固与复盘**：
   - 在 CI 中启用 `--ignore-scripts` 与私有代理 registry。
   - 引入 typosquatting 检测工具（如 `snyk`、`socket.dev`）。
   - 建立依赖审批流程，新增包必须人工 review。
   - 撰写事后复盘报告，更新应急响应手册。

### 个人能力体现

- 能在压力下快速定位问题根因。
- 能协调安全、运维、业务多方资源。
- 能把单次事件转化为可复用的流程和工具改进。

### 可复用的方法论

- **假设妥协原则**：一旦发现恶意包，先假设最坏的泄露情况已经发生。
- **最小权限**：CI runner 和开发者机器都不应持有不必要的高权限 token。
- **可追溯性**：所有依赖变更都通过 PR + lockfile 记录，便于快速回滚。

**评分维度**：
- 能按遏制、取证、修复、加固四步描述应急响应（40%）
- 能体现跨团队协作与决策能力（25%）
- 能提炼出可复用的方法论（25%）
- 表达清晰、案例具体可信（10%）

**常见错误**：
- 只谈技术修复，忽略 token 轮换和通知业务方。
- 没有假设妥协，低估了数据泄露范围。
- 应急响应后没有固化流程，下次仍会重蹈覆辙。
-  blaming 个人，而不是改进系统和流程。

**延伸追问**：
- 如果恶意包已经随产物发布到 CDN，如何评估用户侧影响？
- 你们团队如何防止再次出现 typosquatting 包？

**参考资源**：
- [npm Docs - Responding to vulnerabilities](https://docs.npmjs.com/reporting-malware-in-an-npm-package)
- [Socket.dev - Supply Chain Security](https://socket.dev/)
- [Snyk - Typosquatting](https://snyk.io/blog/typosquatting-attacks/)

**口头回答版**：
> 我会先停掉受影响的 CI，回滚到干净的 lockfile，隔离 runner。然后取证：看恶意包是从哪引入的，postinstall 做了什么，有没有读到敏感 token。接着清理所有仓库和本地 node_modules，轮换 token。事后加固：CI 默认 ignore-scripts，用私有 registry 做扫描，新增依赖要审批，引入 typosquatting 检测。最后写复盘，更新应急手册。关键是先假设最坏情况已经泄露，不能存侥幸。

---

### FB-23-CO-A-016：lockfile 中的 integrity 校验与 SBOM 清单有什么核心区别？

**题型**：概念题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：校验、SBOM
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
在供应链安全语境下，`package-lock.json` / `pnpm-lock.yaml` 中的 `integrity` 字段与 SBOM（Software Bill of Materials）都用于描述依赖。请说明：
1. 两者的核心目标分别是什么？
2. 它们在信息粒度、生成时机、使用场景上有何差异？
3. 企业合规流程中应如何配合使用这两者？

**参考答案**：

### 核心目标

| 维度 | integrity 校验 | SBOM |
|------|----------------|------|
| 目标 | 验证“下载到的文件就是锁定的文件”，防篡改 | 描述“软件由哪些组件组成”，便于追溯与合规 |
| 关注点 | 文件内容真实性 | 组件清单、版本、许可证、来源 |
| 技术基础 | 密码学哈希（SHA-512/SHA-1） | 标准化格式（SPDX/CycloneDX/SWID） |

### 信息粒度与生成时机

- **integrity**：
  - 粒度到单个 tarball。
  - 在 `npm install` / `pnpm install` 时由包管理器生成或从 registry 获取。
  - 主要面向开发/构建阶段。

- **SBOM**：
  - 粒度到组件（包）及其依赖关系、许可证、作者、供应商。
  - 通常在发布/交付阶段生成，作为产物的一部分。
  - 面向法务、安全审计、客户交付。

### 使用场景差异

- **integrity 校验**：
  - CI 安装时验证 lockfile 是否被篡改。
  - 发现 registry/CDN 被劫持或缓存污染时报警。

- **SBOM**：
  - 响应安全漏洞时快速定位受影响版本。
  - 满足法规要求（如美国 EO 14028、欧盟 CRA）。
  - 许可证合规审查。

### 企业合规中的配合

1. **开发阶段**：lockfile 提供 integrity，保证构建可复现、来源可信。
2. **发布阶段**：基于 lockfile 生成 SBOM（可用 `cdxgen`、`syft`、`trivy`）。
3. **运营阶段**：
   - 将 SBOM 上传到漏洞数据库（如 OSV、CISA KEV）做持续监控。
   - 当某个组件爆出 CVE 时，通过 SBOM 快速定位哪些产品/版本受影响。
4. **审计阶段**：同时出示 lockfile 与 SBOM，证明“用了什么”以及“这些文件未被篡改”。

### 最佳实践

- lockfile 提交 Git，CI 使用 `--frozen-lockfile`。
- 每次发版自动生成 SBOM 并随产物归档。
- 对关键依赖在 SBOM 中记录 provenance 与签名信息。

**评分维度**：
- 能准确区分 integrity 与 SBOM 的核心目标（30%）
- 能从粒度、生成时机、使用场景三方面对比（35%）
- 能说明企业合规流程中如何配合使用（25%）
- 能提到 SPDX/CycloneDX 等 SBOM 标准（10%）

**常见错误**：
- 认为 integrity 可以替代 SBOM，或反之。
- 把 SBOM 当成简单的依赖列表，忽视许可证、来源、provenance 等信息。
- 只在出安全事件时才生成 SBOM，没有常态化。
- 不清楚 lockfile 中的 integrity 是 tarball 级别，而不是整个产物级别。

**延伸追问**：
- 如何从现有的 lockfile 自动生成符合 SPDX 或 CycloneDX 标准的 SBOM？
- 如果 lockfile 中的 integrity 校验通过，是否还需要单独对 SBOM 做签名？

**参考资源**：
- [W3C - Subresource Integrity](https://www.w3.org/TR/SRI/)
- [CycloneDX](https://cyclonedx.org/)
- [SPDX](https://spdx.dev/)

**口头回答版**：
> integrity 是验证文件有没有被篡改的哈希校验，SBOM 是描述软件由哪些组件组成的清单。integrity 粒度到 tarball，主要在安装构建时用；SBOM 粒度到组件，包含许可证、来源，通常在发布交付时用。企业应该把 lockfile 提交 Git，CI 校验 integrity，发版时自动生成 SBOM，漏洞爆发时靠 SBOM 快速定位影响范围。

---

### FB-23-SC-A-001：前端 CDN 资源如何引入 Subresource Integrity（SRI）并与 CI 构建流程集成？

**题型**：场景设计题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：供应链安全、subresource-integrity
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
团队使用 CDN 加载 React、lodash 等第三方库，希望防止 CDN 被劫持导致加载恶意脚本。请说明：
1. SRI 的基本原理与 `<script integrity="...">` 的使用方式；
2. 如何在 CI 中自动为 CDN 资源生成 integrity 属性？
3. 当 CDN 资源升级版本时，如何保证 SRI 值同步更新？

**参考答案**：

### SRI 基本原理

SRI（Subresource Integrity）通过为外部资源指定内容哈希，让浏览器在加载前校验文件完整性。

~~~html
<script src="https://cdn.example.com/react@18.2.0/umd/react.production.min.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
~~~

浏览器下载脚本后计算哈希，与 `integrity` 属性比对，不一致则拒绝执行。

### CI 自动生成 integrity

1. **使用官方工具**：
   - `openssl dgst -sha384 -binary < file.js | openssl base64 -A`
   - 或 `shasum -a 384 -b file.js | xxd -r -p | base64`

2. **使用 Node 脚本**：

   ~~~js
   const crypto = require("crypto");
   const fs = require("fs");
   const data = fs.readFileSync("react.production.min.js");
   const hash = crypto.createHash("sha384").update(data).digest("base64");
   console.log(`sha384-${hash}`);
   ~~~

3. **集成到构建流程**：
   - 在构建时扫描 HTML 模板中的 CDN URL，自动 fetch 并生成 integrity。
   - 将生成的 integrity 注入到最终 HTML。
   - 使用 `webpack-subresource-integrity`、`vite-plugin-sri` 等插件。

### 版本升级时的同步策略

- **lock CDN 版本**：不要写 `react@latest`，而是写死版本号如 `react@18.2.0`。
- **依赖升级 PR 必须更新 SRI**：把 CDN URL 与 integrity 放在同一配置文件中， Renovate/Dependabot 升级时一并修改。
- **构建时校验**：CI 中重新计算 integrity，与代码库中的值比对，不一致则构建失败。
- **备用源**：配置 `fallback-src` 或本地备份，当 CDN 不可用时切换。

### 注意事项

- CDN 必须支持 CORS，否则浏览器无法校验跨域资源的完整性。
- 对使用 `modulepreload` 或 `preload` 的资源也应加 integrity。
- SRI 只保证文件完整性，不保证来源可信；来源可信还需结合 CSP、HTTPS、DNS 安全。

### 最佳实践

- 所有外部脚本/样式必须加 integrity。
- 禁止在代码中写死 `latest` 或 unpinned CDN URL。
- 把 SRI 校验加入 CI 门禁和自动化测试。

**评分维度**：
- 能解释 SRI 原理与 HTML 用法（25%）
- 能给出 CI 中生成 integrity 的具体命令或脚本（30%）
- 能说明版本升级时如何保证 SRI 同步（30%）
- 能提到 CORS、CSP、fallback 等注意事项（15%）

**常见错误**：
- 使用 `crossorigin="anonymous"` 时 CDN 未开启 CORS，导致校验失败。
- CDN URL 使用 `latest`，升级后 integrity 失效。
- 只给 script 加 SRI，忽略 link rel=stylesheet 和 preload。
- 把 SRI 值硬编码后从不更新，形同虚设。

**延伸追问**：
- 如果 CDN 被劫持且同时返回了正确的 integrity 对应的恶意文件，SRI 还能防御吗？
- 如何在 SSR 框架（如 Next.js）中为动态注入的 CDN 脚本加 SRI？

**参考资源**：
- [MDN - Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [webpack-subresource-integrity](https://github.com/waysact/webpack-subresource-integrity)
- [W3C - SRI](https://www.w3.org/TR/SRI/)

**口头回答版**：
> SRI 是给外部 CDN 资源加一个 integrity 哈希，浏览器下载后校验，不一致就不执行。CI 里可以用 openssl 或 Node 脚本算 sha384-base64。最好用 webpack-subresource-integrity 或 vite-plugin-sri 自动生成。CDN URL 要写死版本号，不能写 latest，升级时 integrity 要一起更新，CI 要重新校验。CDN 还要支持 CORS，不然跨域校验会失败。

---

### FB-23-PE-A-015：前端项目依赖数量庞大时，如何优化许可证扫描的性能与准确性？

**题型**：性能优化题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：许可证合规、devDependencies
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
一个大型前端 Monorepo 有 2000+ 个依赖包，使用 `license-checker` 扫描一次需要数分钟，且经常出现 false positive（如 devDependencies 被误判）和 false negative（如嵌套依赖许可证缺失）。请说明优化方案。

**参考答案**：

### 性能优化

1. **减少扫描范围**：
   - 生产包只扫 `dependencies`，库/工具可排除 `devDependencies`（但需注意 dev 工具本身的合规要求）。
   - 使用 `--onlyAllow` / `--excludePackages` 过滤已知无风险的内部包。

2. **增量扫描**：
   - 基于 lockfile diff 判断哪些依赖发生变化，只扫描新增/升级包。
   - 缓存已扫描包的许可证结论到数据库或 JSON 文件。

3. **并行化**：
   - 将依赖树拆分为多个子树，用 worker 线程并行读取 package.json。
   - 避免递归读取 node_modules 时的同步 I/O 瓶颈。

4. **工具选型**：
   - `license-checker`：老牌但较慢。
   - `fossa-cli`、`snyk license`、`trivy`：支持缓存、增量、企业级报告。
   - `pnpm licenses list`：直接解析 lockfile，不读 node_modules，速度更快。

### 准确性优化

1. **标准化许可证字段**：
   - 优先读取 `license`（SPDX 表达式），fallback 到 `licenses` 数组。
   - 对缺失许可证的包，读取源码根目录的 LICENSE 文件并用工具（如 `spdx-expression-validate`）识别。

2. **处理 dual/licensing**：
   - 识别 `license: "(MIT OR Apache-2.0)"` 这类 SPDX 表达式。
   - 记录团队选择的许可证分支，避免每次重新判定。

3. **补充缺失信息**：
   - 对未声明许可证的包，在内部系统登记并人工确认。
   - 使用 `package.json` 的 `license` 字段强制规范内部发布包。

4. **去重与合并**：
   - 同一许可证只保留一条结论，避免重复报告。
   - 对同一包的不同版本合并处理。

### 流程集成

- **CI 门禁**：PR 阶段只扫描变更依赖，发版前全量扫描。
- **例外审批**：对特定许可证或缺失许可证建立审批流程。
- **SBOM 输出**：将扫描结果导出为 SPDX/CycloneDX，随产物交付。

### 最佳实践

- 建立“禁止许可证清单”（如 GPL-3.0、AGPL、自定义闭源）。
- 对新引入依赖在 PR 阶段就做许可证检查。
- 定期与法务对齐许可证策略，并更新工具配置。

**评分维度**：
- 能给出减少范围、增量扫描、并行化等性能优化手段（35%）
- 能提出标准化 SPDX、处理 dual license、补充缺失信息等准确性方案（35%）
- 能说明 CI 门禁、例外审批、SBOM 输出等流程集成（20%）
- 能结合 Monorepo 场景说明（10%）

**常见错误**：
- 每次都全量扫描所有 node_modules，不做增量。
- 只读 `license` 字段，不处理 `licenses` 数组或 LICENSE 文件。
- 忽略 devDependencies 的合规风险，或相反地一刀切纳入所有 dev 依赖。
- 扫描工具没有与 CI 门禁联动，问题在发版前才发现。

**延伸追问**：
- `pnpm licenses list` 与 `license-checker` 在实现原理上有何差异？
- 如何处理某个依赖的 package.json 没有 license 字段但根目录有 LICENSE 文件的情况？

**参考资源**：
- [license-checker](https://github.com/davglass/license-checker)
- [pnpm - licenses list](https://pnpm.io/cli/licenses)
- [SPDX License List](https://spdx.org/licenses/)

**口头回答版**：
> 大型项目做许可证扫描要优化性能和准确性。性能上可以减少范围、只扫新增依赖、并行化、用 pnpm licenses list 直接解析 lockfile。准确性上要标准化 SPDX 表达式、处理 dual license、补充缺失的 license 字段、合并重复项。CI 里增量检查 PR，发版前全量扫描，结果导出 SBOM。还要建立禁止许可证清单和例外审批流程。

---

### FB-23-EN-A-017：在 pnpm Monorepo 中如何落地供应链纵深防御体系？

**题型**：工程化题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：pnpm、纵深防御
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
供应链攻击可能发生在依赖引入、安装、构建、发布的任何阶段。针对一个使用 pnpm 的 Monorepo，请设计一套纵深防御体系，覆盖从 registry 到 CI 再到开发者本地的多个层面。

**参考答案**：

### 纵深防御分层

~~~
来源层：私有代理 registry + 签名/ provenance 验证
    ↓
引入层：新增依赖审批 + typosquatting 检测 + 许可证预检
    ↓
安装层：ignore-scripts + lockfile 冻结 + integrity 校验
    ↓
构建层：SBOM 生成 + 静态扫描 + 沙箱构建
    ↓
发布层：provenance + 签名 + 产物完整性校验
    ↓
运营层：漏洞监控 + 应急响应 + 定期复盘
~~~

### 各层具体措施

1. **来源层**：
   - 统一企业内部 npm 代理，禁止直接访问 npmjs。
   - 代理层验证上游 registry 签名与 provenance，缓存时做 integrity 校验。

2. **引入层**：
   - 新增依赖走审批系统，记录用途、许可证、维护状态。
   - 使用 `socket.dev` 或 `snyk` 做 typosquatting 和行为风险检测。
   - PR 中自动评论依赖变更摘要。

3. **安装层**：
   - `.npmrc` 中配置 `ignore-scripts=true`。
   - CI 使用 `pnpm install --frozen-lockfile`，integrity 不一致立即失败。
   - 使用 `onlyBuiltDependencies` 精确控制允许执行安装脚本的包。

4. **构建层**：
   - 构建产物生成 SBOM（SPDX/CycloneDX）。
   - 使用 `eslint-plugin-import` 检测幽灵依赖。
   - 在隔离容器/沙箱中运行构建，限制网络和文件系统访问。

5. **发布层**：
   - 内部包发布要求 CI provenance 或企业签名。
   - 发布产物校验 hash，与 SBOM 中的记录比对。

6. **运营层**：
   - 订阅 OSV、npm advisory、CISA KEV 等漏洞源。
   - 建立漏洞 SLA：critical 7 天、high 30 天修复。
   - 定期演练应急响应流程。

### pnpm 特有能力

- `pnpm audit`：快速发现已知 CVE。
- `pnpm licenses list`：解析 lockfile 生成许可证清单。
- `pnpm.overrides` / `peerDependencyRules`：快速修复漏洞版本。
- 严格依赖树：天然减少幽灵依赖，缩小攻击面。

### 关键指标

- 依赖审批覆盖率、--ignore-scripts 执行率、lockfile 冻结通过率。
- 漏洞修复平均时长（MTTR）、SBOM 生成率、provenance 发布率。

**评分维度**：
- 能画出纵深防御分层架构（25%）
- 能在来源、引入、安装、构建、发布、运营各层给出具体措施（45%）
- 能结合 pnpm 特性说明（20%）
- 能提出可量化的安全指标（10%）

**常见错误**：
- 只在 CI 加一道扫描，忽视源头治理和本地开发环境。
- 使用 pnpm 但开启 `shamefully-hoist`，破坏依赖隔离。
- 没有审批流程，任何人都能引入新依赖。
- 防御措施没有指标衡量，无法持续改进。

**延伸追问**：
- 如果业务方抱怨 `ignore-scripts` 导致某些原生模块无法安装，你如何平衡安全与效率？
- 私有代理 registry 如何与 Sigstore provenance 集成？

**参考资源**：
- [pnpm - Security](https://pnpm.io/security)
- [Socket.dev](https://socket.dev/)
- [OpenSSF SLSA](https://slsa.dev/)

**口头回答版**：
> 供应链纵深防御要分来源、引入、安装、构建、发布、运营六层。来源层用私有代理 registry 加签名验证；引入层新增依赖要审批，做 typosquatting 检测；安装层默认 ignore-scripts，CI 冻结 lockfile 并校验 integrity；构建层生成 SBOM，沙箱构建；发布层要 provenance 和签名；运营层监控漏洞、定 SLA、定期演练。pnpm 的严格依赖树、audit、licenses list 都是很好的能力。

---

### FB-23-SE-A-014：企业私有 npm registry（Verdaccio / Nexus）有哪些常见安全风险与加固措施？

**题型**：安全题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：私有仓库、插件
**出现频率**：中频
**预计回答时长**：5-7 分钟

**题目描述**：
企业通常使用 Verdaccio、Nexus 或 Artifactory 搭建私有 npm registry。请说明：
1. 私有 registry 可能面临哪些具体安全风险（身份认证、权限控制、上游污染、配置错误等）？
2. 针对这些风险应如何加固？
3. 如何监控和审计私有 registry 的使用情况？

**参考答案**：

### 常见安全风险

1. **弱认证或匿名发布**：
   - 未关闭匿名 publish，导致任何人都能上传恶意包。
   - 使用弱 token 或长期不轮换。

2. **权限配置错误**：
   - 内部包与普通包没有 scope 隔离。
   - 某团队 token 能覆盖其他团队的包。

3. **上游污染**：
   - 代理回源到被劫持的 npm registry 或镜像。
   - 缓存了被篡改的 tarball，后续所有项目都命中脏缓存。

4. **配置泄露**：
   - `config.yaml`、`.env` 中明文存储数据库密码或 JWT secret。
   - 错误地暴露 `/-/all` 等管理接口。

5. **日志与审计缺失**：
   - 无法追踪谁发布了哪个版本、谁下载了什么包。

### 加固措施

- **认证与授权**：
  - 关闭匿名 publish，强制使用 JWT/HTPasswd/LDAP 认证。
  - 按 scope 划分团队权限，使用最小权限原则。
  - token 定期轮换，禁止共享 publish token。

- **上游安全**：
  - 配置可信 uplink（如 npmjs 官方 registry + 企业内部 registry）。
  - 开启 integrity 校验，缓存 tarball 前比对 hash。
  - 禁止缓存未签名或无 provenance 的敏感包。

- **网络安全**：
  - registry 部署在内网或 VPN 后，限制公网访问。
  - 使用 TLS 1.2+，禁用弱密码套件。
  - 对管理接口做 IP 白名单和额外认证。

- **配置安全**：
  - secret 存于 Vault/环境变量，不落地配置文件。
  - 禁用不必要的插件和管理接口。

### 监控与审计

- 记录所有 publish、unpublish、download 事件到日志中心。
- 监控异常行为：短时间内大量下载未使用包、非工作时间发布、scope 异常变更。
- 定期导出访问日志，与安全信息和事件管理（SIEM）系统对接。
- 对发布包做自动扫描（CVE、typosquatting、恶意脚本）。

### 最佳实践

- 私有包必须使用 `@company/` scope。
- 发布前在 CI 中运行测试和扫描，禁止本地直接 publish。
- 定期备份 registry 元数据和 tarball，并做灾难恢复演练。

**评分维度**：
- 能列举私有 registry 的 3 种以上安全风险（30%）
- 能给出认证、授权、上游、网络、配置等加固措施（40%）
- 能说明监控审计方案（20%）
- 能结合具体工具（Verdaccio/Nexus）说明（10%）

**常见错误**：
- 认为私有 registry 因为不公开就一定安全，忽视内部威胁。
- 允许匿名 publish 或共享 publish token。
- 上游回源到不可信镜像，不做 integrity 校验。
- 没有日志审计，出事后无法追溯。

**延伸追问**：
- 如果私有 registry 的某包被误发布为恶意版本，如何在不影响业务的前提下快速回滚？
- Verdaccio 的 uplink 配置中，如何避免缓存上游被删除的版本？

**参考资源**：
- [Verdaccio Docs - Security](https://verdaccio.org/docs/security)
- [Nexus Repository Manager - Security](https://help.sonatype.com/repomanager3/nexus-repository-administration/security)
- [npm Docs - Creating and viewing access tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens)

**口头回答版**：
> 私有 registry 风险包括弱认证、匿名发布、权限配置错误、上游污染、配置泄露、日志缺失。加固要关匿名 publish、按 scope 分权限、token 定期轮换、上游做 integrity 校验、用 TLS、secret 不放配置文件。监控要记录 publish/download 事件，对接 SIEM，扫描恶意包。私有包用 @company scope，CI 发布，不要本地 publish。

---

### FB-23-SD-A-001：在组件库/插件平台中，如何设计 peerDependencies 机制以避免多版本 React/Vue 冲突？

**题型**：系统设计题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：架构设计、peerDependencies
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
公司维护一套基于 React 的组件库和大量业务插件，经常出现业务方反馈“两个 React 实例导致 Hook 报错”或“Context 传不下去”。请设计一套 peerDependencies 机制，要求：
1. 组件库如何声明 peerDependencies？
2. 插件如何与宿主项目共享 React 版本？
3. 当业务方必须使用不同 React 版本时，如何优雅降级或隔离？

**参考答案**：

### 组件库声明策略

- 组件库 `package.json` 不将 `react`、`react-dom` 放入 `dependencies`，而是放入 `peerDependencies`。

  ~~~json
  {
    "peerDependencies": {
      "react": ">=16.8.0 <19.0.0",
      "react-dom": ">=16.8.0 <19.0.0"
    },
    "peerDependenciesMeta": {
      "react-dom": { "optional": true }
    }
  }
  ~~~

- 用 `peerDependenciesMeta` 标记可选 peer，避免宿主未安装某个 peer 时安装失败。
- devDependencies 中仍需安装 React 用于本地开发测试，但发布时不会传递。

### 插件共享 React 版本

- 所有插件同样把 `react` 声明为 peerDependency，而不是自己安装一份。
- 业务项目统一安装一个 React 版本，组件库和插件都共用该版本。
- Monorepo 中可用 `catalog:` 统一 React 版本，避免子包各自声明不同范围。

### 多版本共存与隔离

当业务方确实需要混用不同 React 版本时，可采用：

1. **微前端隔离**：
   - 不同子应用使用不同 React 版本，通过 Module Federation / qiankun / iframe 隔离运行时。
   - 每个子应用独立安装 React，避免全局冲突。

2. **alias 方案**：
   - 在 webpack/vite 中为某个子系统配置 alias，使其引用特定版本的 React。
   - 但同一运行时下仍可能触发 Hook 规则问题，仅适用于独立渲染树。

3. **独立构建产物**：
   - 组件库发布时提供多个版本的产物（如 `dist/react18`、`dist/react19`）。
   - 业务方根据项目 React 版本选择对应入口。

### 工具与流程保障

- 使用 `@manypkg/cli` 检查 peerDependencies 版本是否一致。
- CI 中运行 `npm ls react` 或 `pnpm why react` 确保没有重复版本。
- 在文档中明确组件库支持的 React 版本矩阵。

### 最佳实践

- 组件库永远不要自行安装 React。
- 对可选 peer 明确标记 optional。
- 升级 React 大版本时，组件库先发布 beta，业务方灰度验证。

**评分维度**：
- 能正确说明组件库 peerDependencies 声明方式（25%）
- 能解释插件与宿主共享 React 版本的机制（25%）
- 能给出微前端、alias、独立产物等多版本隔离方案（30%）
- 能提出工具和流程保障（20%）

**常见错误**：
- 把 React 放进组件库的 dependencies，导致多版本共存。
- 不声明 peerDependencies，依赖业务方“自觉”安装。
- 用 alias 强行让同一运行时使用两个 React 版本，导致 Hook 错误。
- 升级 React 大版本时没有 beta 和灰度机制。

**延伸追问**：
- npm 7+ 默认安装 peerDependencies，这对组件库发布有什么影响？
- 如果插件 A 要求 React >=17，插件 B 要求 React >=18，业务项目该如何处理？

**参考资源**：
- [npm Docs - peerDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies)
- [pnpm - How peers are resolved](https://pnpm.io/how-peers-are-resolved)
- [manypkg](https://github.com/Thinkmill/manypkg)

**口头回答版**：
> 组件库不能把 React 放进 dependencies，要放 peerDependencies，并用 peerDependenciesMeta 标记可选。插件也是一样，都依赖宿主项目的 React。业务方统一装一个版本，组件库和插件共用。如果必须多版本共存，可以用微前端隔离，或者用 alias 让独立渲染树引用特定版本。CI 里要检查没有重复 React，可用 manypkg 做版本一致性校验。

---

### FB-23-CP-A-001：前端多团队如何建立依赖治理体系？

**题型**：综合开放题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：团队协作、治理体系
**出现频率**：高频
**预计回答时长**：5-7 分钟

**题目描述**：
公司有多个前端团队，各自维护独立仓库或 Monorepo，经常出现依赖版本不一致、重复造轮子、引入高风险包、lockfile 冲突频发等问题。作为技术负责人，你会如何建立一套可持续的依赖治理体系？

**参考答案**：

### 治理体系框架

~~~
规范层：依赖管理规范 + 目录/分类标准
    ↓
工具层：共享配置 + 扫描工具 + CI 门禁
    ↓
流程层：新增/升级审批 + 漏洞响应 + 定期复盘
    ↓
组织层：治理委员会 + 负责人 + 度量指标
~~~

### 规范层

- 制定《前端依赖管理规范》，明确：
  - 允许使用的包管理器及版本（如 pnpm 8.x）。
  - 依赖分类标准（dependencies / devDependencies / peerDependencies）。
  - 禁止引入的包类型（如带远程 postinstall 的未审计包）。
  - lockfile 提交、更新、冲突解决流程。

### 工具层

- **共享配置包**：
  - `@company/tsconfig`、`@company/eslint-config`、`@company/prettier-config`。
  - 统一 `.npmrc` 模板，指向企业内部 registry。

- **扫描与门禁**：
  - `depcheck` / `knip` 检测幽灵依赖和未使用依赖。
  - `pnpm audit` / `snyk` 检测 CVE。
  - `license-checker` / `pnpm licenses list` 检测许可证合规。
  - `socket.dev` 检测恶意行为和 typosquatting。

- **自动化升级**：
  - Renovate/Dependabot 统一提依赖升级 PR。
  - 对核心依赖（React、Vue、TypeScript）设置 group update，避免碎片化。

### 流程层

- **新增依赖审批**：
  - 在内部系统提交申请，说明用途、许可证、维护状态、替代方案。
  - 安全/架构团队定期 review 高风险包。

- **漏洞响应 SLA**：
  - critical：7 天修复；high：30 天；moderate：90 天。
  - 建立漏洞看板，每周例会同步进展。

- **lockfile 冲突处理**：
  - 禁止手动编辑 lockfile。
  - 冲突时由包管理器重新生成，并跑完全量测试。

### 组织层

- 成立“前端依赖治理小组”，由各团队代表组成。
- 指定每个核心依赖的 owner，负责升级决策。
- 度量指标：依赖总数、重复版本数、漏洞数量、许可证违规数、lockfile 冲突次数。

### 最佳实践

- 从“重规范轻执行”转向“工具驱动、门禁保证”。
- 每季度做一次依赖健康度复盘，清理僵尸依赖。
- 对常用功能建立内部公共库，避免各团队重复引入不同实现。

**评分维度**：
- 能构建规范、工具、流程、组织四层治理体系（35%）
- 能给出具体的扫描工具和 CI 门禁方案（30%）
- 能说明新增审批、漏洞 SLA、lockfile 处理等流程（25%）
- 能提出可量化的治理指标（10%）

**常见错误**：
- 只发规范文档，没有工具和门禁落地。
- 各团队各自为政，没有统一的 registry 和扫描策略。
- 只在出安全事件后才治理，没有常态化机制。
- 度量指标过于复杂，团队无法持续跟踪。

**延伸追问**：
- 如何说服业务团队接受“新增依赖必须审批”的流程？
- 当不同团队对同一个核心依赖版本有分歧时，治理小组应如何决策？

**参考资源**：
- [Renovate](https://docs.renovatebot.com/)
- [OpenSSF Scorecard](https://github.com/ossf/scorecard)
- [npm Docs - Security best practices](https://docs.npmjs.com/security)

**口头回答版**：
> 依赖治理要分规范、工具、流程、组织四层。规范层定包管理器、依赖分类、禁止引入的包；工具层用共享配置、depcheck、audit、license-checker、Renovate 做扫描和自动升级；流程层新增依赖要审批，漏洞要有 SLA，lockfile 冲突要工具重新生成；组织层成立治理小组，指定核心依赖 owner，定期复盘指标。关键是工具驱动，不能只发文档。

---

### FB-23-CA-A-001：分析以下 tree-shaking / sideEffects 相关代码的输出与原因

**题型**：代码分析题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：死代码消除、node_modules
**出现频率**：高频
**预计回答时长**：5-7 分钟

**题目描述**：
某组件库 `package.json` 配置如下：

~~~json
{
  "name": "@co/ui",
  "sideEffects": ["*.css", "*.less"],
  "main": "dist/index.js",
  "module": "dist/index.esm.js"
}
~~~

组件库源码：

~~~js
// src/index.js
export { Button } from "./Button";
export { Modal } from "./Modal";

// src/Button.js
import "./button.css";
console.log("Button side effect");
export const Button = () => <button>Click</button>;

// src/Modal.js
console.log("Modal side effect");
export const Modal = () => <dialog>Open</dialog>;
~~~

业务项目只使用 `import { Button } from "@co/ui"`。在 webpack 生产构建中，请分析：
1. `Modal` 是否会被 tree-shaking 移除？
2. 两条 `console.log` 是否会出现在最终产物中？为什么？
3. 如果 `sideEffects` 设为 `false`，`button.css` 是否会被打包？

**参考答案**：

### 输出结果

1. **`Modal` 导出**：如果只导入 `Button` 且 webpack 启用生产模式 + usedExports，则 `Modal` 的导出通常会被移除。
2. **`console.log`**：
   - `"Button side effect"` 大概率保留，因为 `Button.js` 中导入了 CSS 文件，而 `sideEffects` 声明 `*.css` 有副作用，整个模块被视为有副作用，无法完全移除。
   - `"Modal side effect"` 大概率被移除，因为 `Modal.js` 没有任何 side effect 声明，且 `Modal` 导出未被使用。
3. **`button.css`**：
   - `sideEffects: ["*.css", "*.less"]` 时会被打包。
   - `sideEffects: false` 时，CSS 导入可能被视为无副作用并被移除，导致样式丢失。

### 原因分析

- webpack 的 tree-shaking 基于 ES modules 静态分析和 `sideEffects` 字段。
- `sideEffects: false` 表示整个包所有模块都无副作用，webpack 可以安全移除未使用的导出和顶层表达式。
- `sideEffects: ["*.css", "*.less"]` 表示匹配这些文件的模块有副作用，导入这些文件的模块会被认为有副作用，不能被完全删除。
- `console.log` 属于顶层副作用表达式，如果模块整体被标记为有副作用，则保留；否则如果导出未被使用且模块无副作用，则移除。

### 正确写法

- 组件库的 `sideEffects` 应该精确列出真正有副作用的文件类型，如 CSS、polyfill、全局变量注册文件。
- 避免在源码顶层写无意义的 `console.log`，它们会干扰 tree-shaking。
- 对 CSS 导入，使用 `*.css` 的 sideEffects 声明，确保样式不会被误删。

### 最佳实践

- 发布库时提供 `sideEffects`、`module`、`exports` 字段，帮助 bundler 优化。
- 用 `webpack-bundle-analyzer` 验证 tree-shaking 效果。
- 对 polyfill 或全局注册文件，显式声明为有副作用。

**评分维度**：
- 能正确判断 Modal 是否被移除（25%）
- 能解释两条 console.log 的保留/移除原因（35%）
- 能说明 sideEffects 对 CSS 的影响（25%）
- 能给出库发布的最佳实践（15%）

**常见错误**：
- 认为 `sideEffects: false` 只会移除未使用导出，不知道也会移除 CSS 导入。
- 把有副作用的 polyfill 模块也放在无副作用包中，导致功能缺失。
- 在源码顶层写大量 console.log，污染业务产物。
- 不提供 `module` 字段，导致 webpack 无法对 CJS 产物做 tree-shaking。

**延伸追问**：
- `package.json` 的 `exports` 字段如何影响 tree-shaking 和产物选择？
- 如果组件库使用 barrel file（index.js 集中导出），会对 tree-shaking 产生什么影响？

**参考资源**：
- [webpack - Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [webpack - sideEffects](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)
- [rollup - Tree Shaking](https://rollupjs.org/tutorial/#tree-shaking)

**口头回答版**：
> Modal 会被移除，因为没被使用。Button 的 console.log 会保留，因为 Button.js 导入了 CSS，而 sideEffects 声明了 *.css 有副作用，整个模块不能删。Modal 的 console.log 会被移除，因为 Modal 没被用且模块没副作用。如果 sideEffects 是 false，button.css 可能也被当成无副作用移除掉，样式就丢了。所以 sideEffects 要精确声明 CSS 这些真正有副作用的文件。

---

### FB-23-EN-P-021：React/Vue 组件库作为宿主依赖项目，如何管理 package-lock.json 与 peerDependencies？

**题型**：工程化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：宿主依赖、package-lock.json
**出现频率**：低频
**预计回答时长**：7-10 分钟

**题目描述**：
团队维护一个 React 组件库，既要在本地开发时安装 React 进行测试，又要避免发布时把 React 打包进产物或作为传递依赖。请说明：
1. `peerDependencies`、`devDependencies`、`dependencies` 应如何搭配？
2. 组件库是否需要提交 `package-lock.json`？为什么？
3. 在 CI 和本地开发中，分别应使用什么安装策略？

**参考答案**：

### 依赖声明策略

组件库 `package.json` 示例：

~~~json
{
  "peerDependencies": {
    "react": ">=16.8.0 <19.0.0",
    "react-dom": ">=16.8.0 <19.0.0"
  },
  "peerDependenciesMeta": {
    "react-dom": { "optional": true }
  },
  "devDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
~~~

- **peerDependencies**：声明宿主必须提供 React，组件库与宿主共用同一版本。
- **devDependencies**：本地开发/测试使用，发布时不传递。
- **dependencies**：组件库不声明 React，避免多版本共存。

### 是否提交 package-lock.json

对于 **库项目**，通常 **不建议提交 package-lock.json**（但需提交 lockfile 的应用项目强烈建议提交）。原因：

- 库的消费方使用自己的 lockfile，组件库的 lockfile 不会被安装。
- 提交 lockfile 可能让 CI 测试环境过于固定，无法覆盖 peer 版本范围内的多种组合。
- 推荐在 CI 中通过矩阵测试覆盖多个 React 版本（如 16、17、18、19）。

例外：如果组件库包含可独立运行的示例应用或文档站点，这些应用目录可以提交各自的 lockfile。

### CI 与本地安装策略

- **本地开发**：
  - `pnpm install` 安装 devDependencies 中的 React 用于测试。
  - 使用 storybook / vitest / testing-library 做组件测试。

- **CI 测试**：
  - 运行 peer 版本矩阵：`react@16`、`react@17`、`react@18`、`react@19` 分别跑测试。
  - 对每一种组合临时覆盖 devDependencies 中的 React 版本。
  - 用 `--no-frozen-lockfile`（库项目无 lockfile），确保解析到目标版本。

- **发布前检查**：
  - `npm pack` 检查最终 package.json 是否只包含 peerDependencies 中的 React，没有 dependencies。
  - 验证产物中是否误打包了 React 代码。

### 最佳实践

- 文档中明确支持的 React 版本矩阵。
- 使用 `exports` 字段提供多个入口，避免内部路径被业务方直接引用。
- 对 breaking change 的 peer 版本升级，组件库同步发 major 版本。

**评分维度**：
- 能正确搭配 peer/dev/dependencies（35%）
- 能解释库项目不提交 package-lock.json 的原因及例外（25%）
- 能说明 CI 矩阵测试与本地安装策略（25%）
- 能给出发布前检查清单（15%）

**常见错误**：
- 把 React 放进组件库 dependencies，导致业务方多版本冲突。
- 组件库提交 package-lock.json 且 CI 严格冻结，无法覆盖多个 React 版本。
- devDependencies 中不安装 React，本地测试跑不起来。
- 发布产物中误打包了 React 代码。

**延伸追问**：
- npm 7+ 默认安装 peerDependencies，对组件库测试有什么影响？
- 如果组件库同时支持 React 和 Vue，peerDependencies 应如何声明？

**参考资源**：
- [npm Docs - peerDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies)
- [npm Docs - package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- [Semantic Versioning for TypeScript Types](https://www.semver-ts.org/)

**口头回答版**：
> 组件库要把 React 放在 peerDependencies，devDependencies 里也放一个用于本地测试，但发布时不传递。库项目一般不建议提交 package-lock.json，因为消费者用自己的 lockfile，而且库要在 CI 里矩阵测试多个 React 版本。本地用 pnpm install，CI 里对 react@16/17/18/19 分别跑测试。发布前用 npm pack 检查 package.json，确保没有误把 React 放 dependencies，也没有把 React 打进产物。

---

### FB-23-SE-P-022：如何建立第三方依赖的漏洞修复 SLA 与版本维护策略？

**题型**：安全题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：SLA、安全漏洞
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
团队使用的第三方依赖数量庞大，安全团队要求对已知 CVE 建立修复时效。请说明：
1. 如何根据漏洞等级（critical/high/moderate/low）制定 SLA？
2. 修复流程中如何权衡“立即升级”与“稳定性风险”？
3. 对长期无维护或无法升级的依赖，有哪些风险缓释手段？

**参考答案**：

### SLA 制定

参考业界实践：

| 等级 | 修复时效 | 处理要求 |
|------|---------|---------|
| critical | 7 天内 | 立即评估影响，必要时下线功能或临时屏蔽 |
| high | 30 天内 | 优先升级，安排专项 PR |
| moderate | 90 天内 | 纳入常规迭代，结合业务节奏修复 |
| low | 180 天内或接受风险 | 记录在风险登记册，定期复核 |

对面向互联网的应用应更严格；内部工具可适当放宽。

### 修复流程

1. **漏洞确认**：
   - 通过 `npm audit`、`snyk`、`OSV` 确认漏洞影响版本、依赖路径。
   - 判断项目代码是否实际调用了漏洞函数（reachable vulnerability analysis）。

2. **影响评估**：
   - 评估升级版本的 breaking change 风险。
   - 对核心依赖（React、Vue、webpack）升级需走灰度。

3. **修复方式选择**：
   - 直接升级到补丁版本（patch）：风险最低，优先。
   - 使用 `pnpm.overrides` / `npm overrides` 强制子依赖升级。
   - 临时应用补丁（patch-package）等待官方修复。
   - 如果无法修复，评估是否可移除该依赖或替换为替代方案。

4. **验证与发布**：
   - 跑完全量测试、回归测试、性能基线。
   - 灰度发布，监控错误率和关键指标。

### 风险缓释

- **依赖替换**：用维护活跃的替代库替换无维护依赖。
- **fork + 自维护**：对关键但无人维护的依赖 fork 到企业内网，自行打补丁。
- **运行时隔离**：对高风险依赖在沙箱/iframe/Web Worker 中运行，限制其能力。
- **网络层限制**：在 CI 和运行时限制依赖的网络 egress。
- **WAF/输入校验**：如果漏洞涉及输入处理，在应用层增加严格校验。

### 工具与度量

- 使用 Dependabot/Renovate/Snyk 自动生成漏洞修复 PR。
- 建立漏洞看板，按 SLA 跟踪每个 CVE 状态。
- 每月复盘 MTTR（平均修复时长）、漏洞复发率、误报率。

### 最佳实践

- 优先选择维护活跃、社区庞大的依赖。
- 对引入依赖做安全基线评估，避免使用长期未更新的包。
- 建立“依赖淘汰机制”，定期清理无人维护或重复功能的包。

**评分维度**：
- 能给出按漏洞等级的 SLA（25%）
- 能描述确认、评估、修复、验证的完整流程（30%）
- 能提出替换、fork、隔离、网络限制等缓释手段（25%）
- 能说明工具与度量指标（20%）

**常见错误**：
- 对所有 CVE 一刀切要求立即升级，忽视业务稳定性和 breaking change。
- 不判断漏洞是否可达（reachable），浪费大量时间修复不可触发的漏洞。
- 对无法升级的依赖没有风险缓释措施，只是简单记录。
- 没有 SLA 和看板，漏洞修复靠口头催促。

**延伸追问**：
- 如果官方补丁迟迟未发布，你会选择临时 fork 还是使用 patch-package？
- 如何向业务方解释某个 high 级 CVE 需要暂停功能上线来修复？

**参考资源**：
- [npm Docs - npm audit](https://docs.npmjs.com/cli/v10/commands/npm-audit)
- [OSV](https://osv.dev/)
- [Snyk - Vulnerability remediation](https://docs.snyk.io/manage-risk/prioritize-issues-for-fixing)

**口头回答版**：
> 漏洞 SLA 可以按 critical 7 天、high 30 天、moderate 90 天、low 180 天来制定。修复前先确认漏洞是否可达，评估升级版本的 breaking change。优先打补丁或 minor 升级，不行就用 overrides 强制子依赖升级，再不行就 patch-package 或 fork 自维护。对无法修复的要做隔离、网络限制或应用层校验。用 Dependabot、Snyk 自动提 PR，建立看板跟踪 MTTR。

---

### FB-23-SD-P-001：如何为 yarn 项目设计 SBOM（软件物料清单）生成与合规审计系统？

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：yarn、软件物料清单
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
团队使用 yarn Classic/Berry 管理依赖，安全团队要求每个发布产物都附带 SBOM，并支持许可证与 CVE 审计。请设计一套 SBOM 生成与合规审计系统。

**参考答案**：

### 系统目标

- 每次构建自动生成符合 SPDX 或 CycloneDX 标准的 SBOM。
- 自动识别许可证冲突、高危 CVE、未声明依赖。
- 支持 yarn Classic 与 yarn Berry 两种 lockfile 格式。

### 整体架构

~~~
yarn.lock / .pnp.cjs
    ↓
SBOM 生成器（cdxgen / syft / trivy / 自研）
    ↓
SBOM 仓库（S3/对象存储 + 数据库索引）
    ↓
合规审计引擎
  ├── 许可证检查
  ├── CVE 扫描（OSV/NVD）
  └── 策略门禁
    ↓
报告与告警（Slack/邮件/SIEM）
~~~

### SBOM 生成

- **yarn Classic**：直接解析 `yarn.lock`，结合 `node_modules` 生成组件清单。
- **yarn Berry PnP**：解析 `.pnp.cjs` 中的依赖映射，无需 `node_modules`。
- **工具选择**：
  - `cdxgen`：支持 yarn，可输出 CycloneDX。
  - `syft`：扫描文件系统或容器镜像，生成 SPDX/CycloneDX。
  - `trivy`：集 SBOM 生成与漏洞扫描于一体。

### 合规审计

- **许可证**：
  - 维护允许清单（MIT、Apache-2.0、BSD）和禁止清单（GPL-3.0、AGPL、未知许可证）。
  - 对未知许可证触发人工审批流程。

- **CVE 扫描**：
  - 将 SBOM 上传到 OSV、Snyk、Grype 等漏洞数据库。
  - 按漏洞等级和可达性排序，生成修复建议。

- **策略门禁**：
  - CI 中校验 SBOM 无禁止许可证、无 critical/high 未修复 CVE。
  - 否则阻断构建。

### 与发布流程集成

- 每次发版 CI 中执行 `cdxgen -o bom.json`。
- 将 SBOM 作为产物附件上传到制品库。
- 在内部安全平台登记版本 → SBOM 映射，便于事后追溯。

### 最佳实践

- SBOM 应包含组件名、版本、供应商、许可证、哈希、来源 URL。
- 对内部发布包也生成 SBOM，形成完整依赖链。
- 定期重新扫描历史 SBOM，发现新 CVE 时主动告警。

**评分维度**：
- 能说明 SBOM 生成系统架构（25%）
- 能处理 yarn Classic 与 yarn Berry 的差异（20%）
- 能给出许可证、CVE、策略门禁等审计方案（30%）
- 能说明与 CI 发布流程的集成（15%）
- 能提到 SPDX/CycloneDX 标准（10%）

**常见错误**：
- 只生成依赖列表，不标注许可证和来源，无法满足合规要求。
- 忽视 yarn Berry PnP 没有 node_modules 的特殊性，扫描工具无法工作。
- 只在发版时生成 SBOM，没有持续监控新漏洞。
- 没有策略门禁，审计结果无法影响发布。

**延伸追问**：
- 如果 SBOM 显示某个间接依赖许可证冲突，如何在不影响业务的情况下处理？
- yarn Berry 的 `.pnp.cjs` 与 Classic 的 `yarn.lock` 在 SBOM 生成时各有什么优劣？

**参考资源**：
- [CycloneDX](https://cyclonedx.org/)
- [cdxgen](https://github.com/CycloneDX/cdxgen)
- [syft](https://github.com/anchore/syft)

**口头回答版**：
> 设计 SBOM 系统，要在每次构建时用 cdxgen、syft 或 trivy 从 yarn.lock 或 .pnp.cjs 生成 SPDX/CycloneDX 清单。然后存到 SBOM 仓库，做许可证检查、CVE 扫描和策略门禁。CI 里发版时自动生成 SBOM，随产物一起归档。yarn Classic 直接解析 lockfile 和 node_modules，yarn Berry 要解析 .pnp.cjs。历史 SBOM 也要定期重扫新漏洞。

---

### FB-23-CP-P-024：lockfile 如何与前端工具链（CI、Docker、Renovate）协同管理？

**题型**：综合开放题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：lockfile、工具链
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
lockfile 不仅是安装快照，也是 CI 缓存、Docker 构建层缓存、自动化升级工具的关键输入。请结合实践经验，说明 lockfile 应如何与这些工具链协同管理。

**参考答案**：

### 与 CI 协同

- **严格安装**：
  - npm：`npm ci`
  - yarn：`yarn install --frozen-lockfile`
  - pnpm：`pnpm install --frozen-lockfile`
- **缓存键**：以 lockfile 哈希作为缓存键，保证 lockfile 变化时缓存失效。

  ~~~yaml
  - uses: actions/cache@v4
    with:
      path: ~/.pnpm-store
      key: ${{ runner.os }}-pnpm-${{ hashFiles('pnpm-lock.yaml') }}
  ~~~

- **变更检测**：
  - PR 中如果 lockfile 行数变化超过阈值，触发额外 review。
  - 校验 lockfile 中所有 resolved URL 来自允许域名。

### 与 Docker 协同

- **分层缓存**：
  - 单独 COPY package.json + lockfile，先执行 install，再 COPY 源码。
  - 这样依赖不变时，install 层命中缓存，构建更快。

  ~~~dockerfile
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile --prod
  COPY . .
  RUN pnpm build
  ~~~

- **安全**：
  - Docker 构建时也使用 `--ignore-scripts` 或 `onlyBuiltDependencies`。
  - 多阶段构建中，构建阶段不携带 secrets。

### 与 Renovate/Dependabot 协同

- **自动升级 PR**：
  - Renovate 读取 lockfile，生成依赖升级 PR，同时更新 lockfile。
  - 对核心依赖（React、TypeScript）设置 group，避免一天收到几十个 PR。

- **自定义规则**：
  - 禁止自动升级 major 版本，除非人工审批。
  - 对带 postinstall 脚本或高风险包设置自动 assign 给安全团队。

- **冲突处理**：
  - 配置 Renovate 自动 rebase 冲突的 PR。
  - 对长期未合并的升级 PR 做过期关闭，避免 lockfile 持续冲突。

### 最佳实践

- lockfile 变更必须和源码变更在同一 PR 中，不能单独手动改 lockfile。
- 禁止在本地用 `npm install` 更新 lockfile 后直接提交，应使用一致的包管理器命令。
- 定期运行 `pnpm dedupe` / `npm dedupe` 清理 lockfile 中重复版本。
- 对 lockfile 做 `.gitattributes` 配置，减少 review 噪音。

**评分维度**：
- 能说明 CI 中严格安装与缓存策略（30%）
- 能说明 Docker 分层缓存与安全注意事项（25%）
- 能说明 Renovate/Dependabot 的升级规则与冲突处理（25%）
- 能给出 lockfile 治理最佳实践（20%）

**常见错误**：
- CI 中使用 `npm install` 而非 `npm ci`，导致 lockfile 被意外修改。
- Docker 中先 COPY 全部源码再 install，无法利用缓存。
- Renovate 未分组，导致大量 PR 和 lockfile 冲突。
- 手动编辑 lockfile 解决冲突，引入安全风险。

**延伸追问**：
- 如果 Renovate PR 导致 lockfile 冲突，如何设计自动化的 rebase 策略？
- Docker 多阶段构建中，如何安全地运行需要 postinstall 脚本的原生模块？

**参考资源**：
- [GitHub Actions - Cache](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows)
- [Renovate Docs](https://docs.renovatebot.com/)
- [Docker - Build cache](https://docs.docker.com/build/cache/)

**口头回答版**：
> lockfile 要跟 CI、Docker、Renovate 一起管。CI 里用 npm ci 或 pnpm install --frozen-lockfile，缓存键用 lockfile 的 hash。Docker 里先 COPY package.json 和 lockfile，install 完再 COPY 源码，这样缓存命中率高。Renovate 要分组核心依赖，避免 PR 爆炸，自动 rebase 冲突。lockfile 不能手动改，要用统一包管理器命令生成，定期 dedupe。

---

### FB-23-CA-P-023：分析以下插件依赖声明代码的输出与原因

**题型**：代码分析题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：插件、dependencies
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
某 webpack loader 插件 `my-loader` 的 `package.json` 如下：

~~~json
{
  "name": "my-loader",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "webpack": "^5.0.0"
  }
}
~~~

业务项目 `app` 的 `package.json`：

~~~json
{
  "name": "app",
  "devDependencies": {
    "webpack": "^5.70.0",
    "my-loader": "^1.0.0"
  }
}
~~~

执行 `npm install`（npm 6）后，业务项目 node_modules 中 webpack 出现两个版本。请分析：
1. 为什么会出现两个 webpack 版本？
2. 正确的插件 package.json 应该怎么写？
3. npm 7+ 与 npm 6 在此场景下的行为差异是什么？

**参考答案**：

### 为什么会出现两个 webpack 版本

在 npm 6 中：

- `app` 声明 `webpack@^5.70.0`，安装到顶层 node_modules。
- `my-loader` 把 `webpack` 放在 `dependencies` 中，npm 会为其单独安装一份兼容版本。
- 如果 `my-loader` 内部安装的 `webpack@^5.0.0` 解析到与顶层不同的版本（如 5.0.0 vs 5.70.0），就会出现两个 webpack。
- webpack 这种构建工具通常不应被多个实例同时加载，会导致 loader 上下文不一致、plugin 行为异常。

### 正确的插件声明

webpack loader 应该将 webpack 声明为 **peerDependency**，而不是 dependency：

~~~json
{
  "name": "my-loader",
  "peerDependencies": {
    "webpack": "^5.0.0"
  },
  "devDependencies": {
    "webpack": "^5.0.0"
  }
}
~~~

- `peerDependencies`：表示“我作为插件需要宿主提供 webpack”。
- `devDependencies`：本地开发测试用。

### npm 6 与 npm 7+ 的差异

- **npm 6**：peerDependencies 不会自动安装，缺失时只报警告。如果宿主没装 webpack，插件会找不到 webpack。
- **npm 7+**：默认会自动安装 peerDependencies，如果版本冲突会安装失败。因此如果 `my-loader` 把 webpack 放 dependencies，npm 7 更可能直接报错。
- 无论哪个版本，插件都不应该把 webpack 放进 `dependencies`。

### 验证方法

- `npm ls webpack` 查看 webpack 版本树。
- `npm why webpack`（npm 8+）查看引入路径。
- 发布前用 `npm pack` 检查最终 package.json。

### 最佳实践

- 插件/loader 的宿主依赖必须声明为 peerDependencies。
- 在文档中明确支持的 webpack 版本范围。
- CI 中跑 `npm ls` 检查没有重复的核心依赖。

**评分维度**：
- 能解释两个 webpack 版本出现的原因（30%）
- 能给出正确的 peerDependencies 声明（30%）
- 能对比 npm 6 与 npm 7+ 的行为差异（25%）
- 能给出验证与最佳实践（15%）

**常见错误**：
- 把 webpack 等宿主依赖放进插件的 dependencies。
- 认为 npm 7 自动安装 peerDependencies 后就可以乱用 dependencies。
- 不验证 `npm ls`，导致运行时出现多版本 webpack。
- 插件文档没有明确支持的 webpack 版本。

**延伸追问**：
- 如果业务项目同时使用了两个 major 版本的 webpack，loader 插件该如何兼容？
- `peerDependenciesMeta.optional` 在什么场景下使用？

**参考资源**：
- [npm Docs - peerDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies)
- [webpack - Writing a Loader](https://webpack.js.org/contribute/writing-a-loader/)
- [Node.js - peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies)

**口头回答版**：
> 因为 my-loader 把 webpack 放进了 dependencies，npm 6 会单独给它装一份 webpack，和业务项目的 webpack 版本不同，导致两个 webpack。正确做法是把 webpack 声明为 peerDependency，devDependencies 里放一个用于本地测试。npm 6 不会自动装 peer，只报警告；npm 7+ 默认会自动装 peer，版本冲突会报错。插件永远不该把 webpack 放 dependencies。

---

### FB-23-CD-P-001：手写一个解析依赖图中某包所有引入路径的工具函数

**题型**：手写代码题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：依赖解析、依赖管理
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
给定一个简化的 lockfile 依赖图，请用 JavaScript/TypeScript 手写一个函数 `findDependencyPaths(graph, target)`，返回从根节点到目标包的所有路径。

~~~js
const graph = {
  name: "app",
  version: "1.0.0",
  dependencies: [
    { name: "A", version: "1.0.0", dependencies: [
      { name: "lodash", version: "4.17.21", dependencies: [] }
    ]},
    { name: "B", version: "1.0.0", dependencies: [
      { name: "lodash", version: "4.17.21", dependencies: [] }
    ]}
  ]
};

// 期望输出：
// [
//   ["app@1.0.0", "A@1.0.0", "lodash@4.17.21"],
//   ["app@1.0.0", "B@1.0.0", "lodash@4.17.21"]
// ]
~~~

**参考答案**：

### 实现

~~~js
function findDependencyPaths(graph, targetName) {
  const paths = [];

  function dfs(node, currentPath) {
    const label = `${node.name}@${node.version}`;
    currentPath.push(label);

    if (node.name === targetName) {
      paths.push([...currentPath]);
    } else if (Array.isArray(node.dependencies)) {
      for (const dep of node.dependencies) {
        dfs(dep, currentPath);
      }
    }

    currentPath.pop();
  }

  dfs(graph, []);

  // 过滤掉只包含根节点自身的情况（如果 targetName 等于根节点名）
  return paths.filter(p => p.some(node => node.startsWith(`${targetName}@`)));
}

const graph = {
  name: "app",
  version: "1.0.0",
  dependencies: [
    { name: "A", version: "1.0.0", dependencies: [
      { name: "lodash", version: "4.17.21", dependencies: [] }
    ]},
    { name: "B", version: "1.0.0", dependencies: [
      { name: "lodash", version: "4.17.21", dependencies: [] }
    ]}
  ]
};

console.log(findDependencyPaths(graph, "lodash"));
~~~

### 复杂度

- 时间复杂度：O(N)，N 为依赖树节点总数，每个节点访问一次。
- 空间复杂度：O(H)，H 为树高度，用于递归栈和当前路径。

### 扩展思路

- 处理循环依赖：用 Set 记录已访问节点名+版本，避免死循环。
- 处理版本差异：按 `name@version` 去重，同一包不同版本视为不同节点。
- 输出格式：可返回路径数组，也可返回依赖深度、重复次数等统计。

### 与真实工具对比

- `pnpm why <pkg>` 本质就是此类路径查找。
- `npm ls` 通过解析 lockfile 实现类似功能。
- 真实场景还需处理嵌套依赖图、peerDependencies、workspace 引用等复杂关系。

**评分维度**：
- 能写出正确的 DFS 递归或迭代实现（40%）
- 能处理路径复制与回溯（25%）
- 能分析时间/空间复杂度（15%）
- 能提到循环依赖、版本去重等扩展（20%）

**常见错误**：
- 路径没有深拷贝，导致所有路径指向同一个数组引用。
- 没有回溯 currentPath，导致路径累积错误。
- 没有处理 node.dependencies 缺失的情况。
- 递归过深时栈溢出，未考虑用迭代或限制深度。

**延伸追问**：
- 如果依赖图存在循环依赖，如何修改函数避免死循环？
- 如何在这个基础上统计某个包被引用了多少次、由哪些直接依赖引入？

**参考资源**：
- [pnpm - why](https://pnpm.io/cli/why)
- [npm Docs - npm ls](https://docs.npmjs.com/cli/v10/commands/npm-ls)
- [MDN - Recursion](https://developer.mozilla.org/en-US/docs/Glossary/Recursion)

**口头回答版**：
> 用 DFS 遍历依赖树，维护一个 currentPath，访问节点时 push，回溯时 pop。当节点名等于 target 时，把 currentPath 的拷贝加入结果。时间复杂度 O(N)，空间复杂度 O(H)。真实工具如 pnpm why 也是类似原理，只是还要处理循环依赖、peerDependencies、workspace 等复杂情况。

---

### FB-23-FS-P-018：license-checker 等工具如何扫描 node_modules 并识别许可证冲突？

**题型**：框架原理题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：许可证合规、结构对比
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
请解释许可证扫描工具（如 `license-checker`、`pnpm licenses list`、`trivy`）的基本实现原理，并说明它们如何识别许可证冲突。

**参考答案**：

### 扫描原理

1. **读取 lockfile / 依赖树**：
   - 工具首先解析 `package-lock.json`、`yarn.lock`、`pnpm-lock.yaml` 或直接遍历 `node_modules`。
   - 构建完整的依赖图，包含直接依赖和间接依赖。

2. **提取许可证信息**：
   - 读取每个包的 `package.json` 中的 `license` 或 `licenses` 字段。
   - 如果字段缺失，读取包根目录的 LICENSE、COPYING、NOTICE 文件。
   - 使用 SPDX 解析器将文本识别为标准化许可证标识（如 MIT、Apache-2.0）。

3. **标准化与分类**：
   - 将 `license: "SEE LICENSE IN LICENSE.txt"` 这类非标准值标记为未知。
   - 处理复合许可证（如 `"(MIT OR Apache-2.0)"`），按 SPDX 表达式解析。

### 识别许可证冲突

工具通过与企业策略比对来判断冲突：

- **允许清单**：MIT、Apache-2.0、BSD-2-Clause、BSD-3-Clause 等。
- **禁止清单**：GPL-3.0、AGPL-3.0、自定义闭源、未知许可证。
- **条件清单**：LGPL、MPL 等需要根据使用方式进一步评估。

冲突类型包括：

- 直接依赖使用了禁止类许可证。
- 间接依赖（transitive dependency）触发了 copyleft 条款。
- 复合许可证中所有分支都被禁止。
- 许可证声明缺失，无法判定合规性。

### 不同工具差异

| 工具 | 数据源 | 特点 |
|------|--------|------|
| license-checker | node_modules | 老牌，依赖安装后扫描 |
| pnpm licenses list | pnpm-lock.yaml | 不依赖 node_modules，速度快 |
| trivy | lockfile / 镜像 | 同时做 CVE 和许可证扫描 |
| fossa-cli | 多语言 | 企业级，支持策略配置和报告 |

### 最佳实践

- 在 CI 中集成许可证扫描，禁止类许可证阻断构建。
- 对未知许可证建立人工审批流程。
- 发布内部包时强制填写标准 SPDX 许可证字段。
- 将扫描结果导出为 SBOM 附件，便于审计。

**评分维度**：
- 能说明扫描工具读取 lockfile/package.json/LICENSE 的流程（30%）
- 能解释许可证标准化与 SPDX 表达式解析（25%）
- 能说明允许/禁止/条件清单的冲突判定逻辑（25%）
- 能对比不同工具并给出最佳实践（20%）

**常见错误**：
- 只扫描直接依赖，忽略间接依赖。
- 不处理 SPDX 复合表达式，导致误报或漏报。
- 认为 MIT/Apache 就一定安全，忽视专利、商标等其他法律问题。
- 扫描工具只在本地运行，没有集成 CI 门禁。

**延伸追问**：
- 如果某个依赖的 license 字段是 `"UNLICENSED"`，但实际仓库是 MIT，应如何处理？
- 如何处理 dual license 包，确保企业选择的许可证分支被记录？

**参考资源**：
- [license-checker](https://github.com/davglass/license-checker)
- [pnpm - licenses list](https://pnpm.io/cli/licenses)
- [SPDX](https://spdx.dev/)

**口头回答版**：
> 许可证扫描工具先解析 lockfile 或遍历 node_modules，读每个包的 package.json 里的 license 字段，缺失时读 LICENSE 文件，再用 SPDX 标准化。然后和企业策略比对，MIT/Apache 一般允许，GPL/AGPL/未知禁止，LGPL/MPL 要评估。不同工具有差异，license-checker 靠 node_modules，pnpm licenses list 直接解析 lockfile，trivy 还能同时扫 CVE。CI 要集成门禁，未知许可证要审批。

---

### FB-23-SS-P-001：如何优化大型 Monorepo 的 npm install / pnpm install 流程？

**题型**：软技能题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：安装流程、依赖隔离
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
一个包含 30+ 子包的 pnpm Monorepo，本地 `pnpm install` 经常超过 10 分钟，CI 安装也占用大量时间。请结合你的实践经验，说明安装流程的优化方案。

**参考答案**：

### 问题定位

- 使用 `pnpm install --reporter=append-only` 查看各阶段耗时。
- 使用 `pnpm why <pkg>` 检查是否存在版本冲突导致的解析膨胀。
- 分析 `pnpm-lock.yaml` 行数变化，判断是否有 peer dependency hell。
- 检查网络：是否直连 npmjs、是否命中企业代理缓存。

### 优化方案

1. **缓存优化**：
   - 开启并共享 pnpm store（`~/.local/share/pnpm/store`）。
   - CI 中缓存 store 目录，键值为 lockfile hash。
   - 使用企业私有 registry 代理，减少外网下载。

2. **解析优化**：
   - 统一公共依赖版本，使用 `pnpm.catalogs` 或 `pnpm.overrides`。
   - 解决 peerDependencies 冲突，减少虚拟包数量。
   - 定期运行 `pnpm dedupe` 清理 lockfile。

3. **安装范围优化**：
   - CI 生产构建使用 `pnpm install --prod` 跳过 devDependencies。
   - 只对变更子包安装：`pnpm --filter @scope/pkg install`。

4. **网络与并发**：
   - 配置 registry 镜像或企业代理。
   - 调整 `network-concurrency` 和 `fetch-retries`。

5. **生命周期脚本**：
   - CI 默认 `--ignore-scripts`，避免 postinstall 执行耗时/风险。
   - 对原生模块使用 `onlyBuiltDependencies` 精确控制。

### 监控指标

- 安装总时长、解析时长、下载时长、脚本执行时长。
- store 缓存命中率。
- lockfile 行数和不同版本数量。

### 最佳实践

- 本地和 CI 使用相同 pnpm 版本，避免 lockfile 格式冲突。
- 将安装时间纳入 CI 基线，超过阈值自动告警。
- 避免在 dependencies 中引入体积巨大的 dev-only 工具。
- 对不常变动的子包，考虑拆分为独立仓库或发布为 npm 包。

**评分维度**：
- 能使用工具和指标定位安装慢的原因（20%）
- 能从缓存、解析、安装范围、网络、脚本等角度提出优化（50%）
- 能结合 Monorepo 和 pnpm 特性说明（20%）
- 能给出监控指标和最佳实践（10%）

**常见错误**：
- 每次都全量安装，不做缓存。
- 允许版本冲突和 peer dependency hell 持续膨胀。
- CI 中不忽略 postinstall 脚本，既慢又有安全风险。
- 不监控安装时间，问题拖到无法忍受才处理。

**延伸追问**：
- `pnpm dedupe` 与 `pnpm install --resolution-only` 有什么区别？
- 如果某些子包很少变更，是否值得把它们拆出当前 Monorepo？

**参考资源**：
- [pnpm - install](https://pnpm.io/cli/install)
- [pnpm - dedupe](https://pnpm.io/cli/dedupe)
- [pnpm - onlyBuiltDependencies](https://pnpm.io/package_json#pnpmonlybuiltdependencies)

**口头回答版**：
> 先定位：用 reporter 看各阶段耗时，用 pnpm why 查版本冲突，看 lockfile 行数。优化方向包括：缓存 store、CI 用 lockfile hash 做缓存键；统一依赖版本，解决 peer 冲突，定期 dedupe；CI 生产构建用 --prod，只给变更子包安装；配企业代理和并发；CI 默认 ignore-scripts。还要监控安装时长、缓存命中率、lockfile 行数。

---

### FB-23-CO-P-020：node_modules 体积膨胀的原因及包管理器层面的优化原理

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：包体积、SBOM
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
现代前端项目的 node_modules 动辄上 GB，请分析体积膨胀的主要原因，并说明包管理器层面（npm/yarn/pnpm）分别如何优化磁盘占用。

**参考答案**：

### 体积膨胀原因

1. **重复安装**：
   - 每个项目独立一份 node_modules，相同依赖重复存储。
   - 同一依赖的不同版本各自保存完整副本。

2. **间接依赖爆炸**：
   - 一个直接依赖可能引入几十上百个间接依赖。
   - 依赖树深度大，每个节点都有独立的 package.json、README、测试文件等。

3. **冗余文件**：
   - 包作者未清理测试、文档、源码 map、TypeScript 声明等。
   - `.npmignore` 或 `files` 字段配置不当。

4. **原生二进制**：
   - 某些包为不同平台下载多个二进制（如 esbuild、sharp）。

### 包管理器层面优化

| 管理器 | 优化机制 | 效果 |
|--------|---------|------|
| npm | 局部扁平化、lockfile、v9 后改进 dedupe | 一般 |
| yarn Classic | 全局缓存、扁平化 | 较好 |
| yarn Berry PnP | 全局 zip 缓存、无 node_modules 复制 | 很好 |
| pnpm | 全局 content-addressable store + hard link | 最优 |

### pnpm 优化原理

- **全局 store**：所有项目的相同 tarball 只存一份。
- **hard link**：同一文件在多个项目间共享物理存储，不复制。
- **严格依赖树**：只安装声明的依赖，减少不必要的冗余。
- **虚拟 store**：`.pnpm/{name}@{version}/node_modules/{name}` 中通过链接组织依赖关系。

### 其他优化手段

- **dedupe**：`npm dedupe`、`pnpm dedupe` 减少重复版本。
- **清理**：`pnpm store prune` 删除未引用的 store 文件。
- **package.json 瘦身**：使用 `files` 字段控制发布内容。
- **依赖精简**：定期用 depcheck 清理未使用依赖。

### 最佳实践

- 大型 Monorepo 优先使用 pnpm。
- 统一核心依赖版本，避免同一库多版本共存。
- 发布内部包时精简产物，避免打包测试和源码。
- CI 中定期清理和监控 node_modules 体积。

**评分维度**：
- 能分析重复安装、间接依赖、冗余文件、原生二进制等膨胀原因（35%）
- 能对比 npm/yarn/pnpm 的磁盘优化机制（30%）
- 能解释 pnpm 的 store + hard link 原理（20%）
- 能给出 dedupe、清理、瘦身等实践建议（15%）

**常见错误**：
- 认为 node_modules 体积大只是因为依赖多，忽视重复和冗余文件。
- 把 pnpm 的 hard link 当成软链接，没理解磁盘共享机制。
- 手动删除 node_modules 中的文件来“优化”，破坏依赖完整性。
- 不控制内部包的 files 字段，发布大量无用文件。

**延伸追问**：
- 为什么 yarn Berry PnP 能显著减少磁盘占用，但对部分工具链兼容性较差？
- 在 Docker 构建中，如何利用 pnpm store 缓存进一步减小镜像体积？

**参考资源**：
- [pnpm - Motivation](https://pnpm.io/motivation)
- [Yarn - PnP](https://yarnpkg.com/features/pnp)
- [npm Docs - package.json files](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#files)

**口头回答版**：
> node_modules 体积大主要是每个项目重复安装、间接依赖爆炸、包里有很多测试文档冗余文件、还有多平台二进制。npm 和 yarn Classic 靠缓存和扁平化优化，yarn Berry PnP 用全局 zip 缓存，pnpm 用全局 store 加 hard link，同一份文件多项目共享，效果最好。还要定期 dedupe、prune store、发布包时用 files 字段瘦身、用 depcheck 清理未使用依赖。

---

### FB-23-SD-R-031：设计一个企业级前端依赖管理平台

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：依赖管理、前端工程化
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个企业级前端依赖管理平台，覆盖依赖引入、安全扫描、版本统一、发布审计等环节。要求支持 npm/yarn/pnpm 多种包管理器，并能与现有 CI/CD 流程集成。

**参考答案**：

### 平台定位

统一企业内部依赖治理入口，实现：

- 依赖引入审批
- 安全/许可证/质量扫描
- 版本统一与冲突检测
- SBOM 与发布审计

### 系统架构

~~~
前端门户（依赖搜索、审批、报表）
    ↓
API 服务（Node/Java/Go）
    ↓
扫描引擎集群
  ├── CVE 扫描（OSV/NVD/Snyk）
  ├── 许可证扫描（SPDX 解析）
  ├── 行为风险扫描（postinstall / 网络请求）
  └── 重复依赖与版本冲突检测
    ↓
元数据与 SBOM 存储（PostgreSQL + S3）
    ↓
CI/CD 插件 / CLI（npm/pnpm/yarn 集成）
~~~

### 核心模块

1. **依赖引入审批**：
   - 开发者提交申请，填写用途、替代方案、许可证、维护状态。
   - 安全/架构团队审批，高风险包需额外评估。

2. **扫描引擎**：
   - 解析 lockfile（package-lock.json / yarn.lock / pnpm-lock.yaml）。
   - 调用 OSV、Snyk、license-checker 等能力。
   - 对 postinstall 脚本做静态分析，识别危险 API（fs、net、child_process）。

3. **版本统一**：
   - 维护企业级“推荐版本清单”。
   - 检测各仓库依赖版本偏差，推送统一升级建议。
   - 支持通过 CLI 一键生成 `overrides` / `resolutions` 配置。

4. **发布审计**：
   - 每次发布生成 SBOM，记录 provenance、签名、构建来源。
   - 与制品库关联，支持按版本追溯依赖树。

### CI/CD 集成

- 提供 CLI：`company-dep scan`、`company-dep audit`、`company-dep sbom`。
- GitHub/GitLab CI 插件：PR 阶段自动扫描并评论结果。
- 与私有 registry 联动，未审批包禁止下载。

### 多包管理器支持

- 抽象 lockfile 解析器，分别实现 npm/yarn/pnpm 解析适配器。
- 统一依赖图模型，扫描引擎基于模型运行，不依赖具体管理器。

### 度量与治理

- 依赖总数、重复版本数、CVE 数量、许可证违规数。
- 各团队依赖健康度评分。
- 漏洞修复平均时长（MTTR）。

### 最佳实践

- 平台初期从轻量扫描+审批开始，逐步叠加功能。
- 扫描结果要可解释，减少误报，避免团队抵触。
- 与现有工具链（ Renovate、私有 registry、CI）深度集成，降低迁移成本。

**评分维度**：
- 能画出平台整体架构（25%）
- 能说明引入审批、扫描引擎、版本统一、发布审计四大模块（40%）
- 能说明 CI/CD 集成与多包管理器适配（20%）
- 能提出度量指标和落地策略（15%）

**常见错误**：
- 平台功能贪大求全，导致上线周期长、团队抵触。
- 扫描误报率高，开发者不再信任结果。
- 只关注扫描，没有审批和版本统一等治理闭环。
- 没有与现有 CI/CD 集成，形成新的孤岛。

**延伸追问**：
- 如何设计 lockfile 解析器抽象层，使其兼容 npm/yarn/pnpm 的差异？
- 如果扫描引擎依赖外部服务（如 Snyk API），如何保证 CI 稳定性？

**参考资源**：
- [OSV Schema](https://ossf.github.io/osv-schema/)
- [CycloneDX](https://cyclonedx.org/)
- [OpenSSF Scorecard](https://github.com/ossf/scorecard)

**口头回答版**：
> 企业级依赖管理平台要有前端门户、API、扫描引擎、元数据存储和 CI CLI。核心模块包括依赖引入审批、CVE/许可证/行为风险扫描、版本统一、发布审计和 SBOM。要抽象 lockfile 解析器兼容 npm/yarn/pnpm，CI 通过 CLI 或插件集成，PR 阶段自动扫描。度量指标包括依赖数、重复版本、CVE、MTTR 等。平台不要贪大，先从扫描和审批开始。

---

### FB-23-CP-R-029：结合 node_modules 结构与包管理器选型，谈谈实践经验

**题型**：综合开放题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：node_modules、包管理器选型
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在不同项目中，你可能遇到过 npm、yarn Classic、yarn Berry PnP、pnpm 等多种方案。请结合 `node_modules` 结构差异，谈谈包管理器选型的实践经验与决策依据。

**参考答案**：

### node_modules 结构差异回顾

| 方案 | 结构 | 幽灵依赖 | 磁盘占用 | 兼容性 |
|------|------|---------|---------|--------|
| npm v5+ | 部分扁平化 | 易出现 | 大 | 最好 |
| yarn Classic | 扁平化 | 易出现 | 较大 | 好 |
| yarn Berry PnP | 无传统 node_modules，zip 缓存 + .pnp.cjs | 无 | 小 | 需适配 |
| pnpm | 严格依赖树 + 全局 store + hard link | 无 | 最小 | 较好 |

### 选型决策依据

1. **项目规模**：
   - 小型单仓库：npm 足够，生态兼容最好。
   - 大型 Monorepo：pnpm 最优，节省磁盘、严格隔离、workspace 支持成熟。

2. **团队熟悉度**：
   - 如果团队已深度使用 yarn Classic，迁移到 Berry PnP 需要评估 IDE、Jest、Docker 等适配成本。
   - pnpm 的学习曲线相对平缓，且迁移工具成熟。

3. **工具链兼容性**：
   - 某些老旧工具或原生模块可能假设 node_modules 存在，yarn Berry PnP 需要配置 `nodeLinker: node-modules` 回退。
   - pnpm 的严格依赖树要求所有直接引用都声明，迁移初期可能需要补依赖。

4. **安全与治理需求**：
   - 对供应链安全要求高的团队，pnpm 的严格隔离和 yarn Berry PnP 的显式映射都优于传统扁平化方案。

### 实践经验

- **迁移路径**：
  - 从 npm/yarn Classic 迁移到 pnpm 时，先运行 `pnpm import` 转换 lockfile。
  - 关闭 `shamefully-hoist` 后全量跑测试，暴露幽灵依赖并补声明。

- **混合方案**：
  - 某些遗留项目可继续用 npm，新项目统一用 pnpm。
  - 通过企业内部 registry 和统一 `.npmrc` 降低多管理器带来的混乱。

- **监控**：
  - 统计安装时间、磁盘占用、lockfile 冲突次数。
  - 对 Monorepo 监控子包依赖边界，避免跨包幽灵依赖。

### 最佳实践

- 统一组织内主要项目的包管理器，减少认知成本。
- 选择包管理器时，不要只看安装速度，还要看依赖隔离、安全、Monorepo 支持。
- 迁移前做充分 POC，覆盖构建、测试、IDE、Docker 等场景。

**评分维度**：
- 能清晰对比四种方案的 node_modules 结构差异（25%）
- 能从项目规模、团队熟悉度、工具链兼容性、安全需求等角度选型（35%）
- 能结合迁移和混合方案给出实践经验（25%）
- 能提出监控指标和最佳实践（15%）

**常见错误**：
- 只看安装速度选型，忽视依赖隔离和 Monorepo 支持。
- 迁移到 pnpm 后不关闭 shamefully-hoist，继续保留幽灵依赖。
- 在大型 Monorepo 中坚持使用 npm，导致 lockfile 冲突和磁盘占用失控。
- 没有评估 IDE、Docker、原生模块等兼容性就全面推行 PnP。

**延伸追问**：
- 如果团队已使用 yarn Classic，迁移到 pnpm 还是 yarn Berry PnP 更合适？
- 在 Docker 中，pnpm 的硬链接结构需要注意什么？

**参考资源**：
- [pnpm - Motivation](https://pnpm.io/motivation)
- [Yarn - Plug'n'Play](https://yarnpkg.com/features/pnp)
- [npm Docs - About npm](https://docs.npmjs.com/about-npm)

**口头回答版**：
> npm 和 yarn Classic 是扁平化 node_modules，容易产生幽灵依赖。yarn Berry PnP 没有传统 node_modules，用 zip 缓存和 .pnp.cjs 映射。pnpm 是严格依赖树加全局 store 和 hard link，最省磁盘也没有幽灵依赖。选型看项目规模、团队熟悉度、工具链兼容性和安全需求。小型项目 npm 够，大型 Monorepo 推荐 pnpm。迁移时要先 POC，关闭 shamefully-hoist 暴露幽灵依赖，统一组织内管理器减少混乱。

---

### FB-23-CA-R-001：分析以下 semver 范围解析代码的输出与原因

**题型**：代码分析题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：semver、dependencies
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
给定如下代码：

~~~js
const semver = require("semver");

const ranges = [
  "^1.2.3",
  "~1.2.3",
  ">=1.2.3 <2.0.0",
  "^0.2.3"
];

const versions = [
  "1.2.3",
  "1.2.5",
  "1.3.0",
  "2.0.0",
  "0.2.4"
];

ranges.forEach(range => {
  const matched = versions.filter(v => semver.satisfies(v, range));
  console.log(`${range}: ${matched.join(", ")}`);
});
~~~

请写出输出结果，并解释 `^` 在 `0.x` 版本时的特殊行为。

**参考答案**：

### 输出结果

~~~
^1.2.3: 1.2.3, 1.2.5, 1.3.0
~1.2.3: 1.2.3, 1.2.5
>=1.2.3 <2.0.0: 1.2.3, 1.2.5, 1.3.0
^0.2.3: 0.2.4
~~~

### 原因分析

- `^1.2.3`：允许兼容的 minor 和 patch 更新，即 `>=1.2.3 <2.0.0`，所以匹配 1.2.3、1.2.5、1.3.0，不匹配 2.0.0。
- `~1.2.3`：只允许 patch 更新，即 `>=1.2.3 <1.3.0`，所以匹配 1.2.3、1.2.5，不匹配 1.3.0。
- `>=1.2.3 <2.0.0`：显式范围，与 `^1.2.3` 结果一致。
- `^0.2.3`：0.x 版本被视为不稳定 API，因此 `^` 的行为退化为 `~`，只匹配 `>=0.2.3 <0.3.0`，所以只有 0.2.4 匹配。

### `^` 在 0.x 时的特殊行为

SemVer 规范认为 `0.x.x` 是不稳定版本，任何 minor 更新都可能引入 breaking change。因此 npm 的 semver 实现中：

- `^0.2.3` 等价于 `~0.2.3`，即 `>=0.2.3 <0.3.0`。
- `^0.0.3` 等价于精确版本 `0.0.3`。

### 实际工程意义

- 不要对 0.x 依赖盲目使用 `^`，它不会匹配到 `0.3.0`。
- lockfile 会把实际解析版本固定下来，避免范围带来的不确定性。
- 对核心 0.x 依赖，建议锁定精确版本或显式范围。

### 最佳实践

- 生产核心依赖尽量使用 `^` 或精确版本。
- 配合 lockfile 使用，既保留灵活性又保证可复现构建。
- 升级 0.x 依赖的 minor 版本时，按 breaking change 处理。

**评分维度**：
- 能正确写出输出结果（30%）
- 能解释 ^、~、显式范围的匹配规则（35%）
- 能说明 0.x 版本下 ^ 的特殊行为（25%）
- 能给出工程实践建议（10%）

**常见错误**：
- 认为 `^1.2.3` 会匹配 `2.0.0`。
- 认为 `^0.2.3` 会匹配 `0.3.0`。
- 混淆 `~` 与 `^` 的匹配范围。
- 忽视 0.x 版本的不稳定性，按 1.x 的方式管理。

**延伸追问**：
- 如果 package.json 写 `^0.2.3`，lockfile 可能解析到什么版本？
- `semver.intersects("^1.2.3", "~1.2.0")` 的结果是 true 还是 false？

**参考资源**：
- [SemVer 官方规范](https://semver.org/lang/zh-CN/)
- [npm Docs - semver](https://docs.npmjs.com/cli/v10/using-npm/semver)
- [semver npm package](https://github.com/npm/node-semver)

**口头回答版**：
> ^1.2.3 匹配 >=1.2.3 `<2.0.0，所以是 1.2.3、1.2.5、1.3.0。~1.2.3 只匹配 patch，所以是 1.2.3、1.2.5。20>`=1.2.3 <2.0.0 和 ^1.2.3 一样。^0.2.3 特殊，0.x 被认为不稳定，^ 退化成 ~，只匹配 0.2.4。所以对 0.x 依赖不能指望 ^ 匹配到小版本升级。

---

### FB-23-CD-R-001：手写一个包管理器选型决策矩阵评分函数

**题型**：手写代码题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：决策矩阵、pnpm-lock.yaml
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请用 JavaScript/TypeScript 手写一个函数 `evaluatePackageManager(options, weights)`，根据多个维度为 npm、yarn Classic、yarn Berry PnP、pnpm 打分，并返回推荐方案。

维度包括：安装速度、磁盘占用、Monorepo 支持、供应链安全、工具链兼容性。每个维度 1-5 分。

**参考答案**：

### 实现

~~~ts
type PackageManager = "npm" | "yarn-classic" | "yarn-berry-pnp" | "pnpm";

type Scores = Record<PackageManager, Record<string, number>>;

function evaluatePackageManager(
  scores: Scores,
  weights: Record<string, number>
): { winner: PackageManager; ranked: [PackageManager, number][] } {
  const totals: Record<PackageManager, number> = {
    npm: 0,
    "yarn-classic": 0,
    "yarn-berry-pnp": 0,
    pnpm: 0,
  };

  for (const pm of Object.keys(scores) as PackageManager[]) {
    for (const [dimension, score] of Object.entries(scores[pm])) {
      const weight = weights[dimension] ?? 0;
      totals[pm] += score * weight;
    }
  }

  const ranked = (Object.entries(totals) as [PackageManager, number][])
    .sort((a, b) => b[1] - a[1]);

  return {
    winner: ranked[0][0],
    ranked,
  };
}

// 示例评分（1-5，5 最佳）
const scores: Scores = {
  npm: {
    "install-speed": 3,
    "disk-usage": 2,
    monorepo: 3,
    "supply-chain-security": 2,
    compatibility: 5,
  },
  "yarn-classic": {
    "install-speed": 4,
    "disk-usage": 3,
    monorepo: 4,
    "supply-chain-security": 3,
    compatibility: 4,
  },
  "yarn-berry-pnp": {
    "install-speed": 5,
    "disk-usage": 4,
    monorepo: 4,
    "supply-chain-security": 5,
    compatibility: 2,
  },
  pnpm: {
    "install-speed": 5,
    "disk-usage": 5,
    monorepo: 5,
    "supply-chain-security": 5,
    compatibility: 4,
  },
};

const weights = {
  "install-speed": 0.2,
  "disk-usage": 0.2,
  monorepo: 0.25,
  "supply-chain-security": 0.25,
  compatibility: 0.1,
};

const result = evaluatePackageManager(scores, weights);
console.log(result.winner); // pnpm
console.log(result.ranked);
~~~

### 复杂度

- 时间复杂度：O(M × N)，M 为包管理器数量，N 为维度数量。
- 空间复杂度：O(M)，用于存储总分和排名。

### 扩展思路

- 支持不同项目类型（Monorepo、单仓库、库项目）使用不同默认评分。
- 加入团队熟悉度、迁移成本等主观维度。
- 输出雷达图数据，便于可视化展示。

### 工程意义

包管理器选型不应只看单一指标，而应结合团队现状做加权决策。该函数可作为团队讨论的基础，而不是最终结论。

**评分维度**：
- 能写出正确的加权评分函数（40%）
- 能处理维度缺失和类型安全（20%）
- 能给出合理的默认评分示例（20%）
- 能分析复杂度并说明扩展方向（20%）

**常见错误**：
- 权重未归一化，导致总分不可比。
- 缺少对缺失维度的容错处理。
- 只给出最高分，没有输出完整排名。
- 评分函数没有考虑项目类型和团队现状。

**延伸追问**：
- 如果某些维度是布尔型（如“是否支持 workspace”），如何融入加权评分？
- 如何让这个决策矩阵支持多人投票，减少主观偏差？

**参考资源**：
- [pnpm - Motivation](https://pnpm.io/motivation)
- [Yarn - Plug'n'Play](https://yarnpkg.com/features/pnp)
- [npm Docs - About npm](https://docs.npmjs.com/about-npm)

**口头回答版**：
> 写一个加权评分函数，输入每个包管理器在各维度的得分和权重，输出总分和排名。示例里 pnpm 在安装速度、磁盘、Monorepo、安全上得分高，yarn Berry 兼容性差一些，npm 比较中庸。复杂度是 O(M×N)。实际选型还要结合团队熟悉度和迁移成本，这个函数只是讨论基础。

---

### FB-23-FS-R-001：前端构建工具链如何处理 node_modules 的 bundle size 优化？

**题型**：框架原理题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：工具链、Bundle Size
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请解释 webpack、Vite、esbuild 等构建工具在处理 `node_modules` 时，如何做 tree-shaking、代码分割和压缩，以优化最终产物的 bundle size。

**参考答案**：

### Tree-shaking

- **ES modules 静态分析**：工具通过静态分析 `import`/`export`，移除未使用的导出。
- **`sideEffects` 字段**：包作者声明哪些文件有副作用，帮助工具判断能否安全移除。
- **`package.json` 的 `module` 字段**：指向 ES modules 产物，比 CommonJS 更适合 tree-shaking。
- **barrel file 问题**：一个 `index.js` 集中导出所有模块，可能导致整棵树被引入，破坏 tree-shaking。

### 代码分割（Code Splitting）

- **vendor chunk**：将 node_modules 打包为独立的 chunk，利用浏览器缓存。

  ~~~js
  // webpack
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  }
  ~~~

- **动态导入**：`import("lodash/debounce")` 按需加载，减少首屏体积。

### 压缩与优化

- **minify**：
  - webpack 用 TerserPlugin。
  - Vite 默认用 esbuild 压缩。
  - 可配置移除 console、debugger、注释。

- **dead code elimination**：
  - 通过 `process.env.NODE_ENV === "production"` 等常量折叠，移除开发时代码。

- **依赖分析**：
  - 使用 `webpack-bundle-analyzer`、`rollup-plugin-visualizer` 分析 node_modules 占比。

### 工具差异

| 工具 | 优势 | 注意点 |
|------|------|--------|
| webpack | 生态成熟、配置灵活 | 需要正确配置 sideEffects 和 splitChunks |
| Vite | 开发时原生 ESM、构建用 rollup | 生产构建依赖预打包（dependency pre-bundling） |
| esbuild | 极快 | tree-shaking 相对保守，需配合其他工具 |

### 最佳实践

- 优先引入具体子模块（如 `lodash/debounce`）而非全量包。
- 使用 `babel-plugin-import` 或 unplugin 做组件库按需加载。
- 定期用 bundle analyzer 检查 node_modules 体积大户。
- 对大型依赖做异步加载或替换为更小的替代方案。

**评分维度**：
- 能解释 tree-shaking 的原理与 sideEffects 作用（30%）
- 能说明 vendor chunk 和动态导入等代码分割策略（25%）
- 能说明压缩、dead code elimination、依赖分析手段（25%）
- 能对比 webpack/Vite/esbuild 并给出最佳实践（20%）

**常见错误**：
- 全量引入 lodash、moment 等大库，不做按需加载。
- 组件库没有提供 ES modules 产物，导致 tree-shaking 失效。
- 代码分割配置不当，所有 node_modules 都打进一个巨大 chunk。
- 只关注压缩率，忽视首屏加载和缓存策略。

**延伸追问**：
- Vite 的 dependency pre-bundling 会对 node_modules 做什么处理？
- 如果某个依赖声明了 `sideEffects: false`，但实际有全局样式文件，会出现什么问题？

**参考资源**：
- [webpack - Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Vite - Dependency Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html)
- [rollup - Tree Shaking](https://rollupjs.org/tutorial/#tree-shaking)

**口头回答版**：
> 构建工具通过静态分析 ES modules 做 tree-shaking，配合 sideEffects 字段移除没用到的代码。代码分割可以把 node_modules 打成一个 vendor chunk 缓存，或者用动态导入按需加载。压缩用 Terser 或 esbuild，还可以做常量折叠移除开发代码。常用 webpack-bundle-analyzer 分析体积。实践上尽量按需引入子模块，组件库要提供 ESM 产物，定期分析体积大户。

---

### FB-23-SS-R-001：谈谈你在 SemVer 治理与版本发布流程方面的实践经验

**题型**：软技能题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：语义化版本、防御体系
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请结合一次实际或假设的项目经历，说明你是如何进行语义化版本（SemVer）治理的，包括版本号决策、CHANGELOG 维护、发布流程和 breaking change 沟通。

**参考答案**：

### 背景与目标

以维护企业内部组件库为例，目标是：

- 让业务方清楚每次升级的兼容性和风险。
- 避免 breaking change 导致大量业务项目故障。
- 通过自动化工具减少人工发布错误。

### SemVer 决策规则

- **PATCH**：bugfix、样式微调、文档更新。
- **MINOR**：新增组件、新增 props、新增功能，保持向下兼容。
- **MAJOR**：移除 props、修改组件默认行为、升级 peerDependencies 的 major 版本、Node 最低版本提升。

### 发布流程

1. **分支策略**：
   - 使用 `main` + `release/*` 分支。
   - 每个 PR 按类型打标签：`patch`、`minor`、`major`、`breaking`。

2. **CHANGELOG 维护**：
   - 使用 `changesets` 或 `semantic-release` 自动生成 CHANGELOG。
   - 要求 PR 作者填写 changeset，说明变更内容和升级影响。

3. **自动化发布**：
   - CI 检测到 release 分支合并后，根据 changeset 自动计算版本号。
   - 自动打 git tag、生成 GitHub Release、发布到 npm。
   - 发布带 provenance，记录构建来源。

4. **Breaking Change 沟通**：
   - 提前在 RFC 中公告，给出迁移指南和 codemod。
   - 对 major 版本提供 beta/rc 预发布版本，让业务方灰度验证。
   - 在内部文档站维护版本迁移手册。

### 治理措施

- 使用 `@manypkg/cli` 检查 Monorepo 子包版本一致性。
- 对 public API 做自动化测试，防止 patch/minor 中意外引入 breaking change。
- 建立“废弃（deprecation）周期”：先 minor 版本标记废弃，再下一个 major 移除。

### 结果与反思

- 业务方升级信心提升，patch 版本可直接自动化升级。
- major 版本发布前通过 beta 和迁移指南，降低了故障率。
- 反思：早期没有强制 changeset，导致 CHANGELOG 质量差；后期通过 CI 门禁强制要求。

**评分维度**：
- 能清晰说明 SemVer 决策规则（25%）
- 能描述分支、CHANGELOG、自动化发布流程（30%）
- 能说明 breaking change 沟通和治理措施（25%）
- 能结合案例反思改进（20%）

**常见错误**：
- 把 breaking change 放在 patch/minor 版本中发布。
- 没有维护 CHANGELOG，业务方无法判断升级风险。
- 发布 major 版本前没有 beta 和迁移指南。
- 依赖人工决定版本号，容易出错。

**延伸追问**：
- 如何防止 minor 版本中意外引入 breaking change？
- changesets 与 semantic-release 在版本管理和 CHANGELOG 生成上各有什么优劣？

**参考资源**：
- [SemVer 官方规范](https://semver.org/lang/zh-CN/)
- [changesets](https://github.com/changesets/changesets)
- [semantic-release](https://semantic-release.gitbook.io/)

**口头回答版**：
> 我维护组件库时会严格按 SemVer 发版：patch 修 bug，minor 加功能但兼容，major 做不兼容改动。用 changesets 或 semantic-release 自动生成 CHANGELOG 和版本号。PR 要打 patch/minor/major 标签。breaking change 要提前发 RFC、给迁移指南和 codemod，先发 beta/rc 让业务灰度。还要用自动化测试保护 public API，防止 minor 里意外 break。

---

### FB-23-CO-R-001：包管理器选型与 workspace 机制有什么核心区别？

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：包管理器选型、workspace
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在讨论前端工程化时，经常会提到“选哪个包管理器”和“是否用 workspace”。请说明这两个概念的核心区别，以及它们如何相互配合。

**参考答案**：

### 核心定位

| 维度 | 包管理器选型 | workspace |
|------|-------------|-----------|
| 解决的问题 | 如何安装、解析、存储依赖 | 如何在一个仓库中管理多个子包 |
| 关注点 | 安装速度、磁盘占用、依赖隔离、lockfile 格式 | 子包引用、版本统一、任务编排、原子发布 |
| 典型选项 | npm、yarn、pnpm | npm workspaces、yarn workspaces、pnpm workspace |
| 层级 | 工具层 | 仓库组织层 |

### 包管理器选型

决定因素包括：

- 安装速度与缓存机制（content-addressable store vs zip cache）。
- node_modules 结构（扁平化 vs 严格依赖树 vs PnP）。
- 幽灵依赖风险。
- Monorepo 支持（workspace 协议、过滤执行、依赖隔离）。
- 团队熟悉度与工具链兼容性。

### workspace 机制

workspace 是包管理器之上的一层组织能力：

- 一个仓库中多个子包共享一个 lockfile 和 node_modules（或共享 store）。
- 子包之间通过 `workspace:*` 或 `workspace:^` 引用。
- 支持批量运行脚本：`pnpm -r run build`、`yarn workspaces run test`。
- 配合 Turborepo/Nx 做任务调度和缓存。

### 相互配合

- 包管理器为 workspace 提供底层依赖安装和解析能力。
- workspace 依赖包管理器的 workspace 协议实现跨包引用。
- 选型时要同时考虑：这个包管理器的 workspace 能力是否满足 Monorepo 需求？

### 示例

- 选择 pnpm 作为包管理器，同时启用 pnpm workspace，是因为 pnpm 的严格依赖树和 `workspace:` 协议非常适合大型 Monorepo。
- 选择 yarn Berry PnP 可以获得极佳的安装速度和零幽灵依赖，但需要评估 IDE 和原生工具对 PnP 的兼容性。

### 最佳实践

- 不要把“用不用 workspace”当成“选哪个包管理器”的替代问题。
- 大型 Monorepo 应同时评估包管理器与 workspace 方案。
- 统一组织内使用同一套组合，减少认知和运维成本。

**评分维度**：
- 能清晰区分包管理器与 workspace 的定位（35%）
- 能分别说明两者的核心关注点（30%）
- 能说明它们如何相互配合（25%）
- 能结合实例和最佳实践（10%）

**常见错误**：
- 把 workspace 当成包管理器的一种。
- 选型时只看安装速度，不考虑 workspace 能力。
- 在 Monorepo 中使用没有 workspace 支持的包管理器版本。
- 认为启用 workspace 后就无需关注子包依赖边界。

**延伸追问**：
- pnpm workspace 的 `workspace:` 协议在发布时如何转换？
- 如果不用 workspace，只是用 `lerna` 或 `nx` 管理 Monorepo，会有什么问题？

**参考资源**：
- [pnpm - Workspaces](https://pnpm.io/workspaces)
- [npm Docs - workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [Yarn - Workspaces](https://yarnpkg.com/features/workspaces)

**口头回答版**：
> 包管理器解决怎么安装和存储依赖，比如 npm、yarn、pnpm；workspace 解决一个仓库里怎么管理多个子包，比如子包引用、版本统一、批量跑脚本。它们是不同层面的东西，但互相配合。选型时要同时看这个包管理器的 workspace 能力是否满足 Monorepo 需求。大型 Monorepo 我一般选 pnpm + pnpm workspace，因为严格依赖树和 workspace 协议都很好用。

---

### FB-23-SC-R-030：如何设计前端构建产物供应链安全方案？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：实战分析、构建产物
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
前端构建产物（JS/CSS/HTML）部署到 CDN 后，可能面临被篡改、替换或来源不可信的风险。请设计一套构建产物供应链安全方案，覆盖构建、签名、发布、验证全链路。

**参考答案**：

### 安全目标

- 构建产物可追溯：知道“哪次提交、哪个 CI 工作流、哪台机器”构建。
- 产物完整性：部署到 CDN 的文件与 CI 输出完全一致。
- 来源可信：产物由授权的 CI 工作流签名发布。

### 全链路设计

~~~
源码提交
  ↓
CI 构建（隔离沙箱、无 secrets、ignore-scripts）
  ↓
生成产物 + SBOM + 哈希清单
  ↓
CI 签名（Sigstore / 企业密钥）
  ↓
上传到 CDN / 对象存储
  ↓
HTML 中嵌入 SRI 属性
  ↓
客户端/边缘节点验证 SRI + 签名
~~~

### 关键技术

- **SRI（Subresource Integrity）**：
  - 在 HTML 中为 script/link 加 integrity 属性，浏览器校验文件内容。

- **产物签名**：
  - CI 构建完成后，用私钥对产物哈希签名，生成 `.sig` 文件。
  - 或使用 Sigstore 的 OIDC provenance，无需长期私钥。

- **SBOM 与哈希清单**：
  - 发布时生成 `manifest.json`，记录每个文件的 SHA-256/SHA-512。
  - SBOM 记录依赖来源，便于追溯。

- **不可变存储**：
  - CDN/对象存储设置版本控制和不可变策略，禁止覆盖已发布文件。
  - 每次发布使用带版本号或 commit hash 的路径。

### 验证环节

- **部署前**：在 staging 环境验证 SRI、签名、manifest 一致性。
- **边缘节点**：CDN 回源时校验源站签名。
- **客户端**：浏览器通过 SRI 阻止被篡改的脚本执行。
- **监控**：异常 integrity 失败、签名失败触发告警。

### 最佳实践

- 构建阶段与发布阶段分离，发布阶段不接触源码。
- CI 工作流使用最小权限，签名密钥短期有效。
- 发布历史归档，支持快速回滚到上一版本。
- 对内部产物也建立 provenance，形成完整证据链。

**评分维度**：
- 能画出构建产物供应链安全链路（25%）
- 能说明 SRI、签名、SBOM、不可变存储等关键技术（40%）
- 能说明部署前、边缘、客户端、监控等验证环节（25%）
- 能给出最佳实践（10%）

**常见错误**：
- 只关注源码安全，忽视构建产物被篡改的风险。
- CDN 资源没有 SRI，被替换后浏览器静默执行。
- 签名密钥长期存在 CI 中，泄露后无法追溯。
- 产物可覆盖，攻击者可以直接上传同名恶意文件。

**延伸追问**：
- 如果客户端浏览器不支持 SRI，如何降级保证安全？
- Sigstore 的 OIDC provenance 如何替代传统私钥签名？

**参考资源**：
- [MDN - Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [Sigstore](https://www.sigstore.dev/)
- [OpenSSF SLSA](https://slsa.dev/)

**口头回答版**：
> 构建产物安全要覆盖全链路：CI 在沙箱里构建，生成产物、SBOM 和哈希清单，然后签名上传到 CDN。HTML 里给 script/link 加 SRI，浏览器会校验内容。CDN 要做不可变存储，禁止覆盖。部署前和监控里都要验证签名和 integrity。签名密钥要短期有效，最好能用 Sigstore provenance。

---

### FB-23-PE-R-001：大型 Monorepo 中 npm install 变慢，如何在保证安全校验的前提下优化性能？

**题型**：性能优化题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：供应链、sigstore
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
某大型 Monorepo 有 100+ 子包，每次 `pnpm install` 需要 20 分钟，其中大量时间花在 integrity 校验和 Sigstore provenance 验证上。请说明如何在保证安全的前提下优化安装性能。

**参考答案**：

### 性能瓶颈分析

- **integrity 校验**：每个 tarball 下载后都要计算 SHA-512/SHA-384，大量小文件时开销显著。
- **provenance 验证**：每次安装都要向 Sigstore Fulcio/Rekor 请求并验证 attestation。
- **网络往返**：校验过程涉及多次 registry 和 Sigstore API 调用。
- **解析膨胀**：peerDependencies 冲突导致大量虚拟包需要单独校验。

### 优化策略

1. **缓存层**：
   - 在企业私有 registry 代理层缓存 Sigstore 验证结果，避免重复请求。
   - pnpm store 缓存已校验过的 tarball，命中 store 时跳过 integrity 校验。
   - CI 中缓存 store 目录，键值为 lockfile hash。

2. **按需校验**：
   - 开发环境可关闭 provenance 验证（`npm config set provenance false`），只在发布和关键 CI 流程开启。
   - 对已知可信的内部包跳过 Sigstore 验证，只校验公共包。

3. **批量与并行**：
   - 增加网络并发数，减少串行下载。
   - 将校验任务拆分到多个 worker，利用多核 CPU。

4. **依赖治理**：
   - 统一核心依赖版本，减少 peer 冲突和虚拟包数量。
   - 定期 `pnpm dedupe` 清理 lockfile，减少需要校验的包数量。

5. **校验降级**：
   - 对 store 中已缓存且 hash 未变的文件，仅做轻量级元数据校验。
   - 企业内网部署 Sigstore 缓存/镜像，降低外网请求延迟。

### 安全底线

- integrity 校验不能全局关闭，但可以依赖 store 缓存结果。
- provenance 验证在发布前和关键 CI 必须执行。
- 任何缓存策略都要保证缓存条目不可被篡改（缓存本身也要签名/校验）。

### 监控指标

- 安装总时长、校验阶段耗时、store 缓存命中率。
- Sigstore API 请求次数和延迟。
- lockfile 行数、重复版本数、虚拟包数量。

### 最佳实践

- 安全校验与性能不是对立的，关键是分层和缓存。
- 将 provenance 验证从“每次安装”移到“发布前审核”和“周期性审计”。
- 对 Monorepo 做依赖治理，从源头减少需要校验的包数量。

**评分维度**：
- 能分析 integrity/provenance 校验的性能瓶颈（25%）
- 能从缓存、按需校验、并行、依赖治理等角度优化（40%）
- 能守住安全底线，不牺牲关键校验（20%）
- 能提出监控指标和最佳实践（15%）

**常见错误**：
- 为了提速直接关闭所有 integrity 校验，引入供应链风险。
- 每次安装都对所有包做 provenance 验证，浪费大量时间。
- 不治理依赖冲突，导致 lockfile 和虚拟包持续膨胀。
- 缓存没有防篡改保护，反而成为攻击入口。

**延伸追问**：
- 如果 Sigstore 服务不可用，CI 应如何优雅降级？
- pnpm store 缓存的完整性如何保护，防止本地缓存被污染？

**参考资源**：
- [pnpm - Store](https://pnpm.io/cli/store)
- [Sigstore - Performance](https://docs.sigstore.dev/)
- [npm Docs - audit signatures](https://docs.npmjs.com/cli/v10/commands/npm-audit#audit-signatures)

**口头回答版**：
> 大型 Monorepo 安装慢，很多时间是 integrity 校验和 provenance 验证。优化要分层：store 缓存已校验的 tarball，命中时跳过校验；企业代理缓存 Sigstore 结果；开发环境可以关闭 provenance，只在发布 CI 开启；提高并发、多 worker 并行；治理依赖冲突减少虚拟包。但 integrity 不能全局关，缓存本身也要防篡改。

---
### FB-23-CO-B-010：npm 的语义化版本规范是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：node_modules、pnpm、lockfile、peerDependencies、依赖解析
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
npm 的语义化版本规范是什么。

**参考答案**：

版本号格式 MAJOR.MINOR.PATCH：
- MAJOR：不兼容的 API 修改。
- MINOR：向下兼容的功能新增。
- PATCH：向下兼容的问题修复。


**补充说明**：

在实际落地 npm 的语义化版本规范是什么 时，建议结合 node_modules、pnpm、lockfile 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 格式解释（50%）
- 三个字段含义（30%）
- 前缀 ^/~ 区别（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 版本号格式 MAJOR.MINOR.PATCH： - MAJOR：不兼容的 API 修改。 - MINOR：向下兼容的功能新增。 - PATCH：向下兼容的问题修复。

---

### FB-23-CO-B-011：什么是幽灵依赖？如何避免？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：node_modules、pnpm、lockfile、peerDependencies、依赖解析
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是幽灵依赖？如何避免。

**参考答案**：

幽灵依赖是指项目直接使用了未在 package.json 中声明的间接依赖。npm/yarn 的扁平化结构容易导致这个问题。pnpm 的严格 node_modules 结构可以避免。


**补充说明**：

在实际落地 幽灵依赖如何避免 时，建议结合 node_modules、pnpm、lockfile 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 定义准确（40%）
- 产生原因（30%）
- 解决方案（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 幽灵依赖是指项目直接使用了未在 package.json 中声明的间接依赖。 npm/yarn 的扁平化结构容易导致这个问题。 pnpm 的严格 node_modules 结构可以避免。

---

### FB-23-CO-B-012：lockfile 是否应该提交到版本控制？为什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：node_modules、pnpm、lockfile、peerDependencies、依赖解析
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
lockfile 是否应该提交到版本控制？为什么。

**参考答案**：

应该提交。lockfile 锁定确切版本，保证团队成员和 CI/CD 环境安装的依赖一致，避免"我本地可以跑"的问题。


**补充说明**：

在实际落地 lockfile 是否应该提交到版本控制为什么 时，建议结合 node_modules、pnpm、lockfile 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 结论（30%）
- 可复现性（40%）
- 团队协作（30%）

---

## 二、进阶题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> lockfile 锁定确切版本，保证团队成员和 CI/CD 环境安装的依赖一致，避免"我本地可以跑"的问题。

---

### FB-23-CO-A-017：如何评估是否引入一个新的 npm 包？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：node_modules、pnpm、lockfile、peerDependencies、依赖解析
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何评估是否引入一个新的 npm 包。

**参考答案**：

- 功能是否必要，是否有更轻量替代。
- 维护活跃度、issue 响应、发布频率。
- 包体积和依赖数量。
- 许可证是否合规。
- 安全记录和审计结果。


**补充说明**：

在实际落地 评估是否引入一个新的 npm 包 时，建议结合 node_modules、pnpm、lockfile 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 功能评估（25%）
- 维护活跃度（25%）
- 体积与依赖（20%）
- 许可与安全（20%）
- 团队影响（10%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 功能是否必要，是否有更轻量替代。 - 维护活跃度、issue 响应、发布频率。 - 包体积和依赖数量。 - 许可证是否合规。

---

### FB-23-SE-A-015：供应链攻击有哪些常见形式？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：23 包管理与供应链安全
**标签**：node_modules、pnpm、lockfile、peerDependencies、依赖解析
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
供应链攻击有哪些常见形式。

**参考答案**：

- 恶意包：包中植入后门或窃取代码。
- 依赖混淆：上传与内部包同名的公共包。
- 版本劫持：篡改已发布版本或 typosquatting。
- 安装脚本攻击：利用 postinstall 执行恶意命令。


**补充说明**：

在实际落地 供应链攻击有哪些常见形式 时，建议结合 node_modules、pnpm、lockfile 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 攻击类型覆盖（50%）
- 原理说明（30%）
- 防护措施（20%）

---

## 三、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 恶意包：包中植入后门或窃取代码。 - 依赖混淆：上传与内部包同名的公共包。 - 版本劫持：篡改已发布版本或 typosquatting。 - 安装脚本攻击：利用 postinstall 执行恶意命令。







### FB-23-CO-B-013：什么是 npm registry？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：npm、registry、包管理、私有仓库
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 npm registry 是什么，以及私有 registry 的作用。

**参考答案**：

npm registry 是存储和分发 npm 包的服务端仓库。执行 `npm install` 时，包管理器会从 registry 下载包。

一、公共 registry：

- npm 官方 registry：`https://registry.npmjs.org/`。
- 存储了数百万个公开包。

二、私有 registry：

1. **作用**：
   - 托管企业内部私有包。
   - 缓存公共包，加速下载。
   - 控制可安装包的来源和白名单。
   - 审计和监控依赖下载。

2. **常见工具**：
   - Verdaccio（轻量、易部署）。
   - Nexus。
   - JFrog Artifactory。
   - 云厂商私有仓库（AWS CodeArtifact、阿里云仓库）。

三、配置 registry：

```bash
npm config set registry https://registry.example.com
```

或在 `.npmrc` 中：

```ini
registry=https://registry.example.com
@scope:registry=https://registry.example.com
```

**评分维度**：
- npm registry 概念（40%）
- 私有 registry 作用（35%）
- 配置方式（15%）
- 工具举例（10%）

**常见错误**：
- 认为 npm registry 只能有一个
- 私有包直接发布到公共 registry

**口头回答版**：
> npm registry 是存储和分发 npm 包的服务端。公共 registry 是 registry.npmjs.org，私有 registry 可以托管企业包、缓存公共包、控制来源。常用 Verdaccio、Nexus、Artifactory。配置可以在 npm config 或 .npmrc 里设 registry 和 scope 的 registry。

---

### FB-23-CO-B-014：什么是 scope 包？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：npm、scope、包命名、组织
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 npm 中 scope 包的概念和作用。

**参考答案**：

scope 包是以 `@scope/name` 形式命名的包，用于将相关包分组到一个命名空间下。

一、示例：

```text
@vue/compiler-core
@babel/runtime
@company/ui-kit
```

二、作用：

1. **命名空间隔离**：
   - 避免包名冲突。
   - 同一家公司或组织的包归为一组。

2. **权限管理**：
   - npm 组织可以统一管理 scope 下包的发布权限。

3. **Registry 路由**：
   - 可以为不同 scope 配置不同 registry。

```ini
@company:registry=https://registry.example.com
```

三、与私有包关系：

- scope 包不一定是私有的，也可以是公开的。
- 私有包通常使用 scope 并付费 npm 组织账号。

四、注意事项：

1. scope 包安装时需要包含 scope：`npm install @company/ui-kit`。
2. import 时也要包含 scope：`import { Button } from '@company/ui-kit'`。

**评分维度**：
- scope 概念（30%）
- 作用（35%）
- registry 路由（15%）
- 私有包关系（10%）
- 注意事项（10%）

**常见错误**：
- 认为所有 scope 包都是私有的
- scope 和包名之间不加斜杠

**口头回答版**：
> scope 包就是 `@scope/name` 形式的包，用来命名空间隔离、避免冲突、统一管理权限。比如 `@vue/compiler-core`、`@company/ui-kit`。可以为不同 scope 配不同 registry。scope 包不一定是私有的，安装和 import 都要带 scope。

---

### FB-23-CO-B-015：npm 的 scripts 中 pre/post 钩子是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：npm、scripts、hooks、生命周期
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 npm scripts 中的 pre/post 钩子机制。

**参考答案**：

npm 在执行某个 script 时，会自动执行同名的 `pre<script>` 和 `post<script>` 脚本。

一、示例：

```json
{
  "scripts": {
    "prebuild": "npm run lint",
    "build": "webpack",
    "postbuild": "npm run compress"
  }
}
```

执行 `npm run build` 时，实际顺序：

```
prebuild → build → postbuild
```

二、常用内置钩子：

1. `preinstall` / `postinstall`
2. `prepublish` / `postpublish`
3. `preversion` / `postversion`
4. `pretest` / `posttest`

三、注意事项：

1. pre/post 钩子不需要手动调用，执行主脚本时自动触发。
2. 如果主脚本不存在，pre/post 钩子不会执行。
3. `postinstall` 是供应链攻击的常见入口，需谨慎使用。

四、pnpm 差异：

- pnpm 也支持 pre/post 钩子，但增加了 `prepare`、`prepublishOnly` 等生命周期。

**评分维度**：
- 钩子机制说明（40%）
- 示例（25%）
- 内置钩子（15%）
- 注意事项（20%）

**常见错误**：
- 手动调用 prebuild 而不是 build
- 忽略 postinstall 的安全风险

**口头回答版**：
> npm scripts 里 pre 和 post 钩子是自动执行的。比如 `prebuild`、`build`、`postbuild`，运行 `npm run build` 会按这个顺序执行。常用还有 preinstall、postinstall、pretest 这些。postinstall 是供应链攻击常见入口，要小心。

---

### FB-23-CO-B-016：什么是 bundledDependencies？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：npm、bundledDependencies、打包、依赖
**出现频率**：低频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `bundledDependencies` 的作用和使用场景。

**参考答案**：

`bundledDependencies` 是 npm 的一个字段，用于将某些依赖打包到当前包中一起发布。安装该包时，这些依赖会包含在 tarball 里，不需要再从 registry 下载。

一、示例：

```json
{
  "name": "my-cli",
  "dependencies": {
    "commander": "^9.0.0"
  },
  "bundledDependencies": ["commander"]
}
```

二、使用场景：

1. **离线安装**：
   - 目标环境无法访问外网 registry。

2. **保证依赖可用**：
   - 防止依赖被删除或版本变化导致安装失败。

3. **CLI 工具**：
   - 发布时打包关键依赖，确保用户安装即用。

三、与 dependencies 区别：

- dependencies：发布时声明依赖，安装时从 registry 下载。
- bundledDependencies：发布时把依赖打进包内，安装时直接使用包内版本。

四、注意事项：

1. 会增加包体积。
2. 被打包的依赖不能是 peerDependencies。
3. 慎用，避免过度打包。

**评分维度**：
- 概念说明（35%）
- 使用场景（30%）
- 与 dependencies 区别（20%）
- 注意事项（15%）

**常见错误**：
- 把所有依赖都 bundled
- 混淆 bundledDependencies 和 dependencies

**口头回答版**：
> bundledDependencies 是把某些依赖打包进当前包里一起发布。安装时不需要再从 registry 下载。适合离线安装、保证依赖可用、CLI 工具。会增加包体积，不能 bundle peerDependencies。

---

### FB-23-CO-B-017：什么是 optionalDependencies？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：23 包管理与供应链安全
**标签**：npm、optionalDependencies、可选依赖、平台
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `optionalDependencies` 的作用和使用场景。

**参考答案**：

`optionalDependencies` 用于声明可选依赖。这些依赖安装失败不会导致整个 `npm install` 失败。

一、使用场景：

1. **平台特定依赖**：
   - 某些包只在特定操作系统上可用，如 `fsevents` 只在 macOS 上有效。

2. **性能优化依赖**：
   - 原生模块作为可选，安装失败时回退到 JS 实现。

3. **非核心功能**：
   - 某些增强功能依赖的包，没有也不影响主功能。

二、代码中处理：

```js
try {
  const native = require('optional-native-module');
} catch (err) {
  // 使用 JS 回退实现
}
```

三、与 dependencies 区别：

| 特性 | dependencies | optionalDependencies |
|------|--------------|----------------------|
| 安装失败影响 | 整体安装失败 | 跳过，不影响整体安装 |
| 适用场景 | 核心依赖 | 可选、平台特定 |

四、注意事项：

1. optionalDependencies 中的包如果也出现在 dependencies，会按 dependencies 处理。
2. 需要在代码中处理可选依赖不存在的情况。

**评分维度**：
- 概念说明（30%）
- 使用场景（30%）
- 代码处理（15%）
- 与 dependencies 区别（15%）
- 注意事项（10%）

**常见错误**：
- 把核心依赖放到 optionalDependencies
- 代码中没有处理可选依赖缺失

**口头回答版**：
> optionalDependencies 是可选依赖，安装失败不会导致整体安装失败。常用于平台特定依赖、性能优化原生模块、非核心功能。代码里要用 try/catch 处理缺失情况。核心依赖不能放这里。

---

### FB-23-CO-A-018：如何评估 npm 包质量？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：npm、包评估、质量、供应链、选型
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在引入一个新的 npm 包前，应该从哪些方面评估它的质量。

**参考答案**：

一、维护活跃度：

1. 最近更新时间。
2. 提交频率和 issue 响应速度。
3. 版本发布频率。

二、社区与生态：

1. GitHub star/fork 数。
2. 下载量（npm trends）。
3. 是否有大公司维护或使用。

三、代码质量：

1. 是否有测试。
2. 测试覆盖率。
3. TypeScript 类型支持。
4. 代码结构是否清晰。

四、安全性：

1. npm audit 是否有漏洞。
2. Snyk 评分。
3. 依赖数量是否合理。
4. 是否有 postinstall 脚本。

五、体积与性能：

1. bundlephobia 分析包体积。
2. 是否有不必要的依赖。
3. Tree Shaking 支持。

六、许可证：

1. 许可证是否允许商业使用。
2. 是否与项目其他许可证冲突。

七、替代方案：

1. 是否有更轻量、更活跃的替代品。
2. 是否可以直接用原生 API 实现。

**评分维度**：
- 活跃度（15%）
- 社区生态（15%）
- 代码质量（15%）
- 安全性（20%）
- 体积性能（15%）
- 许可证（10%）
- 替代方案（10%）

**常见错误**：
- 只看 star 数就引入
- 忽略许可证和漏洞

**口头回答版**：
> 评估 npm 包要看维护活跃度、社区生态、代码质量、安全性、体积性能、许可证。具体可以看最近更新时间、GitHub star、下载量、测试覆盖率、npm audit、Snyk、包体积、Tree Shaking、许可证。还要比较替代方案，必要时用原生 API。

---

### FB-23-CO-A-019：什么是 npm 的 resolutions / overrides？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：npm、overrides、resolutions、依赖覆盖、版本冲突
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 npm `overrides`、Yarn `resolutions`、pnpm `pnpm.overrides` 的作用和使用场景。

**参考答案**：

这些字段用于强制覆盖依赖树中某个包的版本，解决版本冲突或安全漏洞。

一、npm overrides：

```json
{
  "overrides": {
    "lodash": "4.17.21"
  }
}
```

二、Yarn resolutions：

```json
{
  "resolutions": {
    "lodash": "4.17.21"
  }
}
```

三、pnpm overrides：

```json
{
  "pnpm": {
    "overrides": {
      "lodash": "4.17.21"
    }
  }
}
```

四、使用场景：

1. 子依赖存在安全漏洞，需要强制升级。
2. 两个依赖依赖了不同版本的包，需要统一。
3. 临时修复某个包的 bug。

五、注意事项：

1. overrides 是强制性的，可能破坏依赖兼容性。
2. 应该作为临时方案，长期应推动上游依赖升级。
3. 要记录 overrides 的原因和预计移除时间。

**评分维度**：
- 字段说明（30%）
- 示例（25%）
- 使用场景（25%）
- 注意事项（20%）

**常见错误**：
- 滥用 overrides 导致依赖关系混乱
- 不做记录，长期不清理 overrides

**口头回答版**：
> npm 用 overrides，Yarn 用 resolutions，pnpm 用 pnpm.overrides，都是强制覆盖依赖树里的包版本。常用于修复子依赖漏洞、统一版本、临时修 bug。但这是强制的，可能破坏兼容性，要作为临时方案，记录原因和移除时间。

---

### FB-23-CO-A-020：如何处理依赖版本冲突？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：依赖冲突、版本冲突、npm、SemVer、dedupe
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 npm/yarn/pnpm 中依赖版本冲突产生的原因和解决方法。

**参考答案**：

一、冲突原因：

1. 不同包依赖同一个包的不同版本。
2. 手动指定的版本范围与传递依赖不兼容。
3. 使用 workspace 时子包版本不统一。

二、查看冲突：

```bash
npm ls <package>
pnpm why <package>
yarn why <package>
```

三、解决方法：

1. **升级到兼容版本**：
   - 更新主依赖，使其使用相同版本。

2. **使用 overrides/resolutions**：
   - 强制指定一个版本。

3. **调整依赖声明**：
   - 将依赖提升到顶层或改为 peerDependencies。

4. **锁定版本**：
   - 明确写死版本号，避免范围解析。

5. **Monorepo 统一版本**：
   - 使用 pnpm catalog 或统一 workspace 版本。

四、注意事项：

1. 强制统一版本可能导致某些包行为异常。
2. 修改后要跑完整测试。
3. 记录冲突原因和解决方案。

**评分维度**：
- 冲突原因（20%）
- 查看命令（15%）
- 解决方法（45%）
- 注意事项（20%）

**常见错误**：
- 不查原因直接用 overrides
- 强制统一版本后不跑测试

**口头回答版**：
> 版本冲突是因为不同包依赖同一个包的不同版本。可以用 npm ls、pnpm why 查看。解决可以升级主依赖、用 overrides/resolutions、调整依赖声明、锁定版本、Monorepo 统一版本。强制统一版本要跑完整测试，记录原因。

---

### FB-23-CO-A-021：什么是依赖地狱？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：依赖地狱、依赖冲突、版本、钻石依赖
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释依赖地狱（Dependency Hell）的概念，以及如何避免。

**参考答案**：

依赖地狱指项目中依赖关系复杂，出现版本冲突、循环依赖、重复安装、难以维护的情况。

一、常见表现：

1. **钻石依赖问题**：
   - A 依赖 B 和 C，B 和 C 又依赖不同版本的 D。

2. **版本冲突**：
   - 多个包需要同一依赖的不同版本。

3. **循环依赖**：
   - A 依赖 B，B 依赖 C，C 又依赖 A。

4. **依赖膨胀**：
   - 项目依赖数量失控，node_modules 巨大。

二、避免方法：

1. **谨慎引入依赖**：
   - 评估是否真的需要新包。

2. **统一版本管理**：
   - 使用 catalog、resolutions、workspace 统一版本。

3. **peerDependencies**：
   - 对框架等共享依赖使用 peerDependencies。

4. **定期清理**：
   - 删除未使用依赖，更新过期依赖。

5. **可视化依赖树**：
   - 使用 `npm ls`、`dependency-cruiser` 分析。

6. **模块化设计**：
   - 减少不必要的耦合。

**评分维度**：
- 概念说明（25%）
- 常见表现（35%）
- 避免方法（40%）

**常见错误**：
- 认为依赖越多越好
- 不关注传递依赖的冲突

**口头回答版**：
> 依赖地狱就是依赖关系复杂导致版本冲突、循环依赖、node_modules 膨胀。典型是钻石依赖问题。避免要谨慎引入依赖，统一版本管理，共享依赖用 peerDependencies，定期清理，用工具可视化依赖树，模块化设计减少耦合。

---

### FB-23-CO-A-022：node_modules 体积膨胀如何治理？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：node_modules、体积、优化、包管理、清理
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 node_modules 体积膨胀的原因和治理方法。

**参考答案**：

一、膨胀原因：

1. 依赖数量多，传递依赖层级深。
2. 重复依赖多个版本。
3. 包中包含测试、文档、源码等不必要文件。
4. 开发依赖和生产依赖未分离。
5. 未使用依赖长期积累。

二、治理方法：

1. **包管理器选择**：
   - pnpm 的内容寻址存储和硬链接大幅减少磁盘占用。

2. **清理未使用依赖**：
   - 使用 `depcheck` 扫描。

3. **依赖去重**：
   - 使用 `npm dedupe` 或 pnpm 自动 dedupe。

4. **限制包体积**：
   - 使用 bundlephobia 评估。
   - 选择轻量替代方案。

5. **files 字段控制**：
   - 包作者用 `files` 字段指定发布哪些文件。

6. **定期升级和清理**：
   - 删除旧版本 lockfile 中的过期依赖。

7. **CI 监控**：
   - 监控 node_modules 体积变化趋势。

**评分维度**：
- 膨胀原因（25%）
- 治理方法（50%）
- 监控（15%）
- 包作者责任（10%）

**常见错误**：
- 不清理未使用依赖
- 所有依赖都放 dependencies

**口头回答版**：
> node_modules 膨胀是因为依赖多、传递深、重复版本、包含不必要文件、未用依赖积累。治理可以换 pnpm、用 depcheck 清理未用依赖、npm dedupe 去重、选轻量包、控制 files 字段、CI 监控体积趋势。

---

### FB-23-FS-P-019：pnpm 的 workspace 协议是什么？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：pnpm、workspace、协议、Monorepo
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 pnpm 的 `workspace:` 协议及其作用。

**参考答案**：

`workspace:` 是 pnpm 在 Monorepo 中使用的协议，用于声明某个依赖使用 workspace 内的本地包，而不是从 registry 下载。

一、示例：

```json
{
  "dependencies": {
    "@company/utils": "workspace:*"
  }
}
```

二、几种写法：

1. `workspace:*`：
   - 使用本地包的当前版本。
   - 发布时替换为实际版本号。

2. `workspace:^`：
   - 使用 `^` 范围指向本地包。

3. `workspace:~`：
   - 使用 `~` 范围指向本地包。

4. `workspace:1.0.0`：
   - 指定本地包版本。

三、作用：

1. 明确标识 Monorepo 内部依赖。
2. 避免误从 npm registry 下载同名包。
3. 发布时自动替换为真实版本号。

四、与 `link:` 区别：

- `workspace:` 是 Monorepo 语义，发布时会替换版本。
- `link:` 只是本地文件链接，不会改变 package.json。

**评分维度**：
- 协议说明（35%）
- 写法示例（25%）
- 作用（25%）
- 与 link 区别（15%）

**常见错误**：
- 把内部依赖写成普通版本号
- 认为 workspace 协议会改变发布后的依赖声明

**口头回答版**：
> pnpm 的 workspace: 协议用来声明依赖是 Monorepo 里的本地包，不是从 registry 下载。比如 `workspace:*` 用当前版本，`workspace:^` 用兼容版本。发布时会自动替换成真实版本号。和 link 不同，link 只是文件链接。

---

### FB-23-SE-P-023：私有 registry 有哪些安全风险与加固？

**题型**：安全题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：私有 registry、安全、Verdaccio、Nexus、供应链
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明企业私有 npm registry 的常见安全风险及加固措施。

**参考答案**：

一、常见安全风险：

1. **未授权访问**：
   - 任何人都能上传/下载包。

2. **依赖混淆**：
   - 攻击者上传与内部包同名的公共包，诱使开发者下载。

3. **中间人攻击**：
   - 未使用 HTTPS，包传输被篡改。

4. **配置泄露**：
   - registry 凭证泄露到 Git 或日志。

5. **恶意包上传**：
   - 内部人员或入侵者上传带后门的包。

6. **上游缓存污染**：
   - 缓存的公共包被篡改。

二、加固措施：

1. **认证授权**：
   - 强制登录，按角色分配读写权限。
   - 使用 npm token 或 OAuth。

2. **HTTPS**：
   - 全站 HTTPS，证书固定。

3. **包签名与校验**：
   - 发布时签名，安装时校验 integrity。

4. **上游代理白名单**：
   - 只代理可信 registry。
   - 开启缓存校验。

5. **审计与监控**：
   - 记录上传、下载、删除操作。
   - 异常下载告警。

6. **命名空间保护**：
   - 保留企业内部 scope，禁止外部注册同名包。

7. **漏洞扫描**：
   - 对上传的包和缓存的包做安全扫描。

**评分维度**：
- 风险识别（30%）
- 加固措施（50%）
- 审计监控（10%）
- 命名空间保护（10%）

**常见错误**：
- 私有 registry 不强制认证
- 允许任意 scope 被外部占用

**口头回答版**：
> 私有 registry 风险有未授权访问、依赖混淆、中间人攻击、凭证泄露、恶意包上传。加固要强制认证、HTTPS、包签名、上游代理白名单、审计日志、保护企业 scope、漏洞扫描。特别要防依赖混淆，避免内部包名被公共 registry 抢注。

---

### FB-23-CO-P-021：node_modules 体积优化原理

**题型**：概念题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：node_modules、pnpm、硬链接、内容寻址、优化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请从包管理器层面解释 node_modules 体积优化的原理。

**参考答案**：

一、npm/yarn Classic 的 node_modules：

1. 每个项目独立安装，依赖物理复制。
2. 相同依赖在不同项目中重复存储。
3. 依赖提升（hoisting）减少重复，但结构复杂。

二、pnpm 的优化：

1. **content-addressable store**：
   - 所有包内容按 hash 存储在全局 store。
   - 相同内容只存一份。

2. **hard link**：
   - node_modules 中的文件是全局 store 的硬链接。
   - 不占用额外磁盘空间。

3. **non-flat 结构**：
   - 使用符号链接组织依赖树。
   - 只允许显式声明的依赖被访问，避免幽灵依赖。

三、Yarn Berry PnP：

1. 不复制 node_modules。
2. 通过 `.pnp.cjs` 映射包位置。
3. 直接从缓存压缩包读取文件。

四、收益：

1. 大幅减少磁盘占用。
2. 安装速度更快。
3. 依赖关系更清晰。

**评分维度**：
- npm/yarn 传统结构（20%）
- pnpm store 和硬链接（30%）
- pnpm 非扁平结构（20%）
- Yarn PnP（15%）
- 收益（15%）

**常见错误**：
- 认为 pnpm 只是简单链接
- 不理解 content-addressable 的优势

**口头回答版**：
> 传统 npm/yarn 每个项目独立复制依赖，重复占用空间。pnpm 用 content-addressable store 按 hash 全局存储，node_modules 里用硬链接指向 store，不重复占用磁盘。non-flat 结构用符号链接组织，避免幽灵依赖。Yarn Berry PnP 不复制 node_modules，直接读缓存压缩包。

---

### FB-23-EN-P-022：lockfile 与 Renovate 协同管理

**题型**：工程化题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：lockfile、Renovate、依赖升级、自动化、CI
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何让 lockfile 与 Renovate 协同工作，实现自动化依赖升级。

**参考答案**：

一、Renovate 作用：

Renovate 是自动化依赖升级工具，会扫描仓库依赖，创建升级 PR，并更新 lockfile。

二、配置要点：

```json
{
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchPackagePatterns": ["^@types/"],
      "groupName": "type-definitions"
    },
    {
      "matchDepTypes": ["devDependencies"],
      "automerge": true
    }
  ],
  "lockFileMaintenance": { "enabled": true }
}
```

三、与 lockfile 协同：

1. Renovate 会基于 lockfile 解析当前依赖版本。
2. 升级后自动更新 package.json 和 lockfile。
3. PR 触发 CI，用 `pnpm install --frozen-lockfile` 验证。

四、升级策略：

1. patch/minor 自动合并。
2. major 升级人工 review。
3. 分组升级减少 PR 数量。
4. 锁定关键依赖版本，避免自动升级。

五、安全：

1. Renovate PR 也要跑 npm audit。
2. 对漏洞升级优先处理。
3. 保留回滚能力。

**评分维度**：
- Renovate 作用（15%）
- 配置要点（25%）
- 与 lockfile 协同（25%）
- 升级策略（20%）
- 安全（15%）

**常见错误**：
- Renovate 升级后不跑完整测试
- major 升级自动合并导致兼容性问题

**口头回答版**：
> Renovate 自动扫描依赖创建升级 PR 并更新 lockfile。配置里可以分组升级、按 patch/minor/major 设不同策略。PR 触发 CI 用 frozen-lockfile 验证。patch/minor 可自动合并，major 要人工 review。还要跑 npm audit，漏洞优先修。

---

### FB-23-CP-P-025：包管理器标准化实践经验

**题型**：综合开放题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：23 包管理与供应链安全
**标签**：包管理器、标准化、Monorepo、pnpm、工具链
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请结合 package.json 规范与 lockfile 管理，谈谈依赖标准化的实践经验。

**参考答案**：

一、统一包管理器：

1. 团队统一使用 pnpm（或 yarn/npm）。
2. `package.json` 中声明 `packageManager` 字段。
3. 启用 corepack 保证版本一致。

二、package.json 规范：

1. 必填字段：`name`、`version`、`license`、`engines`、`packageManager`。
2. 明确区分 dependencies/devDependencies/peerDependencies。
3. 使用 scope 命名内部包。
4. `files` 字段控制发布内容。

三、lockfile 管理：

1. lockfile 必须提交到 Git。
2. CI 使用 `--frozen-lockfile` 安装。
3. 禁止手动修改 lockfile。

四、依赖升级流程：

1. 使用 Renovate 自动创建升级 PR。
2. 升级 PR 必须跑 CI 和安全扫描。
3. major 升级人工审批。

五、Monorepo 规范：

1. 统一 workspace 配置。
2. 使用 `workspace:` 协议引用内部包。
3. 使用 catalog 统一管理公共依赖版本。

六、审计与监控：

1. CI 中跑 npm audit。
2. 定期检查未使用依赖。
3. 监控依赖体积变化。

**评分维度**：
- 统一包管理器（15%）
- package.json 规范（20%）
- lockfile 管理（20%）
- 升级流程（15%）
- Monorepo 规范（15%）
- 审计监控（15%）

**常见错误**：
- 团队混用 npm/yarn/pnpm
- lockfile 不提交或手动修改

**口头回答版**：
> 依赖标准化要统一包管理器，package.json 声明 packageManager，corepack 锁定版本。规范必填字段，区分 dep 类型，内部包用 scope。lockfile 必须提交，CI 用 frozen-lockfile。升级用 Renovate，major 人工审。Monorepo 用 workspace: 协议和 catalog。还要跑 audit、清未用依赖、监控体积。

---

### FB-23-SD-R-032：设计一个企业级前端依赖管理平台

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：依赖管理、平台、企业级、供应链安全、Monorepo
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个企业级前端依赖管理平台，支持依赖治理、安全审计和供应链风险管理。

**参考答案**：

一、平台架构：

```
项目接入 → 依赖分析 → 安全扫描 → 策略引擎 → 报告与告警
  ↓           ↓           ↓            ↓
SBOM 生成   漏洞库      白名单      自动修复 PR
```

二、核心能力：

1. **依赖画像**：
   - 自动分析项目依赖树。
   - 生成 SBOM（软件物料清单）。
   - 识别过期、未使用、重复依赖。

2. **安全审计**：
   - 集成 npm audit、Snyk、OSV。
   - 检测 typosquatting、恶意包。
   - 扫描 postinstall 脚本风险。

3. **策略引擎**：
   - 定义允许/禁止使用的包列表。
   - 版本范围策略。
   - 许可证合规策略。

4. **自动修复**：
   - 自动生成升级 PR。
   - 提供一键修复建议。

5. **可视化**：
   - 依赖关系图。
   - 漏洞热力图。
   - 趋势报表。

三、集成方式：

1. CLI 工具供本地扫描。
2. CI/CD 插件自动检查。
3. Web 平台展示治理大盘。

四、治理流程：

1. 新项目接入时扫描基线。
2. PR 阶段自动检查新增依赖。
3. 定期全量扫描和历史趋势对比。
4. 高危漏洞强制修复。

**评分维度**：
- 架构完整（20%）
- 核心能力（35%）
- 集成方式（15%）
- 治理流程（20%）
- 可视化（10%）

**常见错误**：
- 只做扫描不做自动修复
- 策略过于严格导致业务无法推进

**口头回答版**：
> 企业级依赖管理平台要有依赖画像、安全审计、策略引擎、自动修复、可视化。接入项目后生成 SBOM，扫描漏洞和恶意包，定义允许使用的包和许可证策略。提供 CLI、CI 插件、Web 平台。PR 阶段检查新增依赖，高危漏洞强制修复。

---

### FB-23-CP-R-030：包管理器选型实践经验

**题型**：综合开放题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：包管理器、选型、npm、yarn、pnpm、决策
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请结合 node_modules 结构与包管理器选型，谈谈实践经验。

**参考答案**：

一、三种主流包管理器对比：

| 维度 | npm | yarn | pnpm |
|------|-----|------|------|
| node_modules | 扁平/hoisted | 扁平或 PnP | non-flat + hard link |
| 磁盘占用 | 大 | 大/小（PnP） | 小 |
| 安装速度 | 中 | 快 | 很快 |
| Monorepo | workspaces | workspaces | workspaces + catalog |
| 幽灵依赖 | 易出现 | 易出现 | 不易 |

二、选型建议：

1. **新项目**：
   - 优先 pnpm，磁盘占用小、速度快、无幽灵依赖。

2. **老项目 npm**：
   - 如果没问题可以保留。
   - 遇到幽灵依赖或体积问题时迁移到 pnpm。

3. **Yarn Berry PnP**：
   - 适合对安装速度和磁盘占用要求极高，且能接受生态兼容性成本的项目。

4. **Monorepo**：
   - pnpm workspace 体验更好，catalog 管理版本方便。

三、迁移经验：

1. 先删除 node_modules 和 lockfile。
2. 用 pnpm import 导入 yarn/npm lockfile。
3. 修复幽灵依赖问题。
4. 跑完整测试验证。

四、注意事项：

1. 不要频繁切换包管理器。
2. 统一团队使用一个包管理器。
3. 关注包管理器版本差异（如 pnpm 8 和 9）。

**评分维度**：
- 对比分析（30%）
- 选型建议（30%）
- 迁移经验（20%）
- 注意事项（20%）

**常见错误**：
- 为了追求新技术频繁切换
- 不统一团队包管理器

**口头回答版**：
> npm 和 yarn 传统结构是扁平 node_modules，容易有幽灵依赖，磁盘占用大。pnpm 用 hard link 和 non-flat 结构，节省空间、没幽灵依赖。新项目优先 pnpm，老项目 npm 没问题可以留。Monorepo 用 pnpm workspace 更方便。迁移时先删 node_modules 和 lockfile，用 pnpm import，修幽灵依赖，跑全量测试。

---

### FB-23-SC-R-031：如何设计前端构建产物供应链安全方案？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：供应链安全、构建产物、SRI、SBOM、签名
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个前端构建产物的供应链安全方案。

**参考答案**：

一、构建环境安全：

1. 使用受信任的 CI/CD runner。
2. 构建镜像固定版本，定期扫描漏洞。
3. 构建过程不可变，禁止手动干预。

二、依赖安全：

1. lockfile 完整性校验。
2. CI 中校验依赖 hash。
3. 使用私有 registry，控制包来源。

三、产物签名与校验：

1. 构建完成后对产物计算 hash。
2. 使用 Sigstore/cosign 对产物签名。
3. 部署时校验签名和 hash。

四、Subresource Integrity（SRI）：

1. HTML 中引用的 JS/CSS 添加 integrity 属性。
2. 防止 CDN 或传输过程中被篡改。

```html
<script src="https://cdn.example.com/app.js"
  integrity="sha384-xxx"
  crossorigin="anonymous"></script>
```

五、SBOM 与可追溯：

1. 每次构建生成 SBOM。
2. 记录依赖来源和构建信息。
3. 与版本号关联，便于追溯。

六、部署安全：

1. 产物上传到受控存储。
2. CDN 开启 HTTPS 和版本化路径。
3. 回滚时使用签名验证的旧版本。

**评分维度**：
- 构建环境（15%）
- 依赖安全（20%）
- 签名校验（20%）
- SRI（15%）
- SBOM（15%）
- 部署安全（15%）

**常见错误**：
- 只关注依赖安全，忽略产物安全
- CDN 资源不加 SRI

**口头回答版**：
> 构建产物供应链安全要从构建环境、依赖、产物签名、SRI、SBOM、部署几方面做。用受信任的 CI runner，lockfile 校验，私有 registry。产物算 hash 并签名，HTML 引用加 SRI。生成 SBOM 记录依赖和构建信息。CDN 用 HTTPS 和版本化路径，回滚要验证签名。

---

### FB-23-CO-R-002：包管理器选型与 workspace 机制的核心区别

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：包管理器、workspace、选型、Monorepo、机制
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明包管理器选型与 workspace 机制之间的核心区别。

**参考答案**：

一、包管理器选型：

关注的是如何在项目中安装、解析、存储依赖。核心差异在于：

1. node_modules 结构（扁平 vs 非扁平）。
2. 安装速度和磁盘占用。
3. 依赖解析算法。
4. 生态兼容性。

二、workspace 机制：

关注的是如何在同一个仓库中管理多个包/项目。核心能力包括：

1. 统一管理多个子包的依赖。
2. 子包之间通过 workspace 协议相互引用。
3. 统一执行脚本（如 `pnpm -r run build`）。
4. 统一版本发布（Changesets）。

三、关系：

- workspace 是包管理器的一个功能，不同包管理器都支持 workspace，但实现有差异。
- 包管理器选型会影响 workspace 的体验（如 pnpm 的 catalog、workspace: 协议）。

四、选型建议：

- 先选包管理器，再设计 workspace 规范。
- Monorepo 场景下，pnpm workspace 通常体验更好。

**评分维度**：
- 包管理器选型关注点（30%）
- workspace 机制关注点（30%）
- 两者关系（25%）
- 选型建议（15%）

**常见错误**：
- 把 workspace 当成独立的工具，忽略包管理器差异
- 选型时只看安装速度，不看 workspace 能力

**口头回答版**：
> 包管理器选型关注安装、解析、存储依赖的方式，workspace 是管理同仓库多包的能力。workspace 是包管理器的功能，不同管理器实现不同。Monorepo 先选包管理器再设计 workspace，pnpm workspace 通常体验更好，有 catalog 和 workspace: 协议。

---

### FB-23-SD-R-033：大型 Monorepo 中 install 性能优化

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：23 包管理与供应链安全
**标签**：Monorepo、install、性能优化、pnpm、缓存
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何在保证安全校验的前提下，优化大型 Monorepo 的 install 性能。

**参考答案**：

一、包管理器选择：

1. 使用 pnpm，利用 content-addressable store 和 hard link 减少重复下载。
2. 避免使用 npm/yarn Classic 的扁平结构导致的大量 I/O。

二、缓存策略：

1. CI 中缓存 pnpm store：`~/.pnpm-store`。
2. 缓存 `node_modules/.modules.yaml`。
3. 使用远程缓存或共享存储。

三、依赖治理：

1. 统一公共依赖版本（pnpm catalog）。
2. 清理未使用依赖。
3. 避免多版本重复依赖。

四、安装优化：

1. 使用 `pnpm install --frozen-lockfile`，避免重新解析。
2. 关闭不必要的生命周期脚本：`--ignore-scripts`（需评估风险）。
3. 分阶段安装：先安装公共依赖，再按需安装子包。

五、安全校验：

1. 不跳过 integrity 校验。
2. CI 中校验 lockfile 与 package.json 一致性。
3. 对私有 registry 做 HTTPS 和签名校验。

六、监控：

1. 记录每次 install 耗时。
2. 分析慢的原因（网络、IO、依赖数量）。
3. 设置性能回归告警。

**评分维度**：
- 包管理器选择（15%）
- 缓存策略（20%）
- 依赖治理（15%）
- 安装优化（20%）
- 安全校验（15%）
- 监控（15%）

**常见错误**：
- 为了速度跳过 integrity 校验
- 不治理依赖，只增加缓存

**口头回答版**：
> 大型 Monorepo install 优化用 pnpm，缓存 store 和 modules.yaml，统一公共依赖版本，清理未用依赖。安装时用 frozen-lockfile 避免重解析，但别跳过 integrity 校验。CI 校验 lockfile 一致性，私有 registry 做 HTTPS 和签名。监控 install 耗时，发现回归及时告警。

---
