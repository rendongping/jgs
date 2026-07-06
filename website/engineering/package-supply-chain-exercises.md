# 前端包管理与供应链安全练习册

> 通过练习掌握包管理原理、依赖治理和供应链安全防护。

---

## 难度分级

- 基础：理解概念。
- 进阶：能审计和治理依赖。
- 深入：能设计供应链安全体系。

---

## 一、选择题（共 25 题）

### 第 1 题（🟢）

pnpm 相比 npm/yarn 的主要优势是？

A. 安装速度更快、磁盘占用更小
B. 支持更多包
C. 不生成 lockfile
D. 不需要 node_modules

### 第 2 题（🟢）

lockfile 的主要作用是？

A. 加速安装
B. 保证构建可复现
C. 减少包体积
D. 自动修复漏洞

### 第 3 题（🟢）

以下哪种攻击属于供应链攻击？

A. XSS
B. CSRF
C. 依赖混淆
D. SQL 注入

### 第 4 题（🟢）

`^1.2.3` 允许更新的版本范围是？

A. >=1.2.3 <2.0.0
B. >=1.2.3 <1.3.0
C. >=1.0.0 <2.0.0
D. 只能 1.2.3

### 第 5 题（🟡）

SBOM 的主要用途是？

A. 加速构建
B. 记录软件物料清单，支持审计和漏洞响应
C. 替代 lockfile
D. 自动升级依赖


### 第 6 题（🟢）

以下哪个选项正确描述了 peerDependencies 的作用？

A. 声明运行时必需的插件依赖，由宿主环境提供
B. 声明构建时必需的依赖
C. 声明可选依赖，安装失败不报错
D. 声明仅在测试环境中使用的依赖

### 第 7 题（🟢）

`npm audit fix` 命令的作用是？

A. 删除所有有漏洞的依赖
B. 自动修复可修复的漏洞，升级到兼容的安全版本
C. 生成漏洞报告但不做任何修改
D. 替换 package.json 中的所有依赖版本

### 第 8 题（🟢）

npx 命令的特性中，以下哪项是正确的？

A. 无需安装即可运行 npm 包，运行后自动清理临时安装
B. 只能运行通过 npm install -g 全局安装的包
C. 运行速度比直接调用 node_modules/.bin 中的命令更慢
D. 必须配合 npx 配置文件使用

### 第 9 题（🟢）

`package-lock.json` 中 `lockfileVersion: 2` 相比 `lockfileVersion: 1` 的主要改进是？

A. 支持 ESM 模块
B. 支持包完整性哈希验证（integrity 字段）和 monorepo workspace 兼容性
C. 体积更小
D. 加密安全性更高

### 第 10 题（🟡）

pnpm 的 `node_modules` 结构中，`.pnpm` 目录的作用是？

A. 存储所有包的扁平化列表
B. 通过硬链接和软链接管理所有包的不同版本，实现节省空间和严格隔离
C. 存储项目的配置文件
D. 缓存下载的包压缩文件

### 第 11 题（🟡）

`package.json` 中的 `overrides` 字段（npm）或 `resolutions` 字段（yarn）的作用是？

A. 覆盖项目中所有依赖的版本，强制使用指定版本，解决版本冲突
B. 删除所有过时依赖
C. 添加新的开发依赖
D. 修改包名

### 第 12 题（🟡）

workspace 协议（如 `"@my/lib": "workspace:*"`）的作用是？

A. 从 npm registry 安装该包
B. 从 monorepo 工作区中链接本地包，无需发布即可引用
C. 从 GitHub 仓库安装最新代码
D. 在工作区中创建同名新包

### 第 13 题（🟡）

以下哪种场景最容易被依赖混淆攻击利用？

A. 项目使用 scoped packages（`@scope/pkg`）的私有包
B. 项目直接依赖了与内部私有包同名的包，且 registry 优先级配置不当
C. 项目使用 pnpm 管理依赖
D. 项目使用 lockfile 锁定版本

### 第 14 题（🟡）

`npm ls` 命令的主要作用是？

A. 列出项目中的所有文件和目录
B. 以树形结构展示当前项目的完整依赖关系
C. 列出所有可运行的 npm script
D. 删除当前项目的 node_modules

### 第 15 题（🟡）

关于 `npm ci` 命令，以下哪项描述是正确的？

A. 相比 `npm install`，`npm ci` 会重新计算依赖树并更新 lockfile
B. `npm ci` 严格按照 lockfile 安装，删除现有 node_modules，不更新 lockfile
C. `npm ci` 是 `npm install` 的别名
D. `npm ci` 只安装生产依赖


### 第 16 题（🟡）

npm 的 `package-lock.json` 与 yarn 的 `yarn.lock` 在格式上的根本区别是什么？

A. `package-lock.json` 使用 JSON 格式、嵌套结构；`yarn.lock` 使用扁平的类 YAML 文本格式
B. 两者均使用相同的 JSON 格式，仅文件名不同
C. `yarn.lock` 是二进制文件，`package-lock.json` 是文本文件
D. `package-lock.json` 由 yarn 生成，`yarn.lock` 由 npm 生成

### 第 17 题（🟡）

什么是"幽灵依赖"（phantom dependency / ghost dependency）？

A. 已在 package.json 中声明但在任何源文件中未导入的依赖
B. 未在项目的 package.json 中声明，但由于 npm 的依赖提升（hoisting）机制，仍可以在代码中导入的传递依赖
C. 仅存在于 lockfile 中但从未实际安装的依赖
D. 安装时显示弃用警告的过时包

### 第 18 题（🟡）

Snyk 和 Socket.dev 属于哪一类工具？它们的主要功能是什么？

A. 打包工具——优化生产构建的包体积
B. 供应链安全工具——扫描依赖的已知漏洞、恶意代码、许可证合规性和维护者信誉
C. 包发布工具——帮助发布包到 npm registry
D. 性能分析工具——测量打包加载时间

### 第 19 题（🟢）

关于开源许可证，以下哪项描述是正确的？

A. MIT：宽松许可，允许在专有软件中自由使用。GPL：著佐权（copyleft），要求衍生作品必须以 GPL 发布。Apache 2.0：宽松许可，包含明确的专利授权条款
B. 三种许可证都要求衍生作品开源
C. GPL 许可的代码可以在专有软件中使用而无需任何义务
D. MIT 要求所有衍生作品必须以 MIT 许可发布

### 第 20 题（🟡）

什么是软件组成分析（Software Composition Analysis, SCA）？

A. 分析软件组件在运行时的交互行为
B. 自动识别代码库中的开源组件、映射其版本、检查已知漏洞并评估许可证合规性
C. 一种用于组合微服务的编程语言
D. 替代 Webpack 的构建工具

### 第 21 题（🟡）

在 CI/CD 流水线中，推荐使用 `npm ci` 而非 `npm install`，主要原因是什么？

A. `npm ci` 会自动更新依赖到最新版本
B. `npm ci` 严格遵循 lockfile 安装、删除现有 node_modules、绝不修改 lockfile，确保构建的确定性
C. `npm ci` 会跳过 lockfile 直接解析 package.json
D. `npm ci` 只安装生产依赖，忽略开发依赖

### 第 22 题（🟡）

在 pnpm monorepo 中使用 `workspace:^1.2.3` 协议声明依赖时，发布到 npm registry 后会发生什么？

A. 发布时 `workspace:^1.2.3` 会被自动替换为实际版本号（如 `^1.2.3`）
B. `workspace:^1.2.3` 作为文字保留，安装时从 workspace 查找
C. 发布操作会失败，因为 workspace 协议不能发布
D. 发布后 pnpm 会自动创建同名的 npm 包

### 第 23 题（🟡）

当项目中一个间接依赖存在严重安全漏洞，但依赖它的直接依赖已不再维护时，以下哪种方案最有效？

A. 放弃修复，接受风险
B. 寻找替代所有使用该间接依赖的直接依赖，逐一替换
C. 使用 `overrides`（npm）或 `resolutions`（yarn）强制将间接依赖升级到安全版本
D. 删除 lockfile 和 node_modules 后重新安装

### 第 24 题（🟡）

以下哪种场景最容易遭受依赖混淆（dependency confusion）攻击？

A. 项目内部包使用 scoped 命名（如 `@company/pkg`）并且正确配置了 scoped registry
B. 项目直接依赖了一个与内部私有包同名的公有包，且 registry 搜索顺序配置不当——npm 优先查找公共 registry
C. 项目使用 pnpm 管理依赖
D. 项目使用 lockfile 锁定所有依赖版本

### 第 25 题（🟢）

关于 `npm audit fix` 的行为，以下哪项描述是正确的？

A. 始终将依赖升级到最新版本，无论是否有 breaking changes
B. 自动修复可修复的漏洞，将依赖升级到在 semver 范围内兼容的安全版本
C. 删除所有存在漏洞的包
D. 完全重写 package.json 中的所有依赖版本


---

## 二、场景分析题（共 13 题）

### 第 26 题（🟡）

`npm audit` 报告某个间接依赖存在高危漏洞，但直接依赖已停止维护。你会如何处理？

### 第 27 题（🟡）

团队发现安装的包名与内部包同名但来自公共 registry，可能是什么问题？如何防范？

### 第 28 题（🔴）

设计一个依赖审批流程，确保团队引入新包前经过评估。

### 第 29 题（🟡）

项目有 A、B 两个直接依赖，A 依赖 lodash@4.0.0，B 依赖 lodash@3.0.0，构建时出现版本冲突。分析可能的问题和解决方案。

### 第 30 题（🟡）

CI 构建时出现 "Module not found: Package 'left-pad' not found" 错误，但本地开发环境运行正常。分析可能的原因和解决方案。

### 第 31 题（🟡）

`npm audit` 扫描出 50 个 low 级别漏洞和 8 个 moderate 级别漏洞。如何制定合理的修复策略？

### 第 32 题（🔴）

团队决定将项目从 npm 迁移到 pnpm，请设计迁移方案和风险控制措施。

### 第 33 题（🔴）

安全团队收到 CNVD 通告，一个核心直接依赖（react-dom v18.2.0）存在零日漏洞。设计应急响应流程。


### 第 34 题（🟡）

一个团队负责一个包含 20 个独立包的 monorepo 项目，这些包之间有复杂的依赖关系。团队在不同平台上开发，CI 对安装速度和磁盘占用有较高要求。请评估应选择哪种包管理器，并说明理由。

### 第 35 题（🟡）

CI 流水线在执行 `npm ci` 时持续报错："The package-lock.json was generated for a different package.json than the current one." 团队遵循 trunk-based 开发工作流，多人同时修改依赖。请分析根因并设计完整的修复方案。

### 第 36 题（🔴）

安全监控系统告警：一个曾被广泛使用的 npm 包的最新版本包含混淆代码，会窃取 CI 环境变量并外传。该包作为传递依赖存在于多个内部项目的依赖树中已超过一年。请制定完整的应急响应计划。

### 第 37 题（🟡）

团队在 SaaS 产品中使用的一个核心开源 UI 组件库宣布将许可证从 MIT 变更为专有许可（proprietary）。新版本 v3.0 起将要求商业付费，而 v2.x 保持 MIT。你的产品当前使用 v2.x。请分析影响并推荐应对方案。

### 第 38 题（🔴）

一位开发者在 PR 中提议引入一个新的 npm 包用于 URL 解析。该包本身只有约 50 行代码，但引入了 200 多个传递依赖，总计超过 15MB。该开发者认为它提供了更便捷的 API。请从供应链安全角度对其进行评估并给出建议。


---

## 三、设计/开放题（共 7 题）

### 第 39 题（🟡）

对比 npm、yarn、pnpm 的 node_modules 结构差异，说明为什么 pnpm 能避免幽灵依赖。

### 第 40 题（🔴）

设计一套企业级依赖安全治理方案，覆盖引入、审计、更新、应急响应。

### 第 41 题（🔴）

在 Monorepo 中如何管理公共依赖版本，避免版本冲突和重复安装？

### 第 42 题（🔴）

设计一个私有 npm registry 的选型和部署方案，包括安全保障和备份策略。

### 第 43 题（🔴）

设计一个 SBOM 生成管道，在 CI/CD 中自动生成和管理软件物料清单。


### 第 44 题（🔴）

请设计一个企业级私有 npm registry 架构。要求涵盖：私有包托管与版本管理、公共 npm registry 代理与缓存、安全扫描（漏洞与恶意代码）集成、多团队权限与认证管理、CI/CD 无缝集成、高可用部署与灾难恢复。

### 第 45 题（🔴）

请设计一个企业级依赖防火墙/代理系统，部署在开发网络边界，用于在包到达开发者机器之前自动检测和拦截恶意包。要求涵盖：架构设计（包请求拦截、缓存代理、扫描引擎）、策略引擎（包名黑/白名单、许可证过滤、漏洞阈值）、恶意包检测机制（域名仿冒、混淆代码、行为分析、信誉评分）、CI/CD 集成与审计日志。


---

## 参考答案

### 第 1 题（🟢）

::: details 查看答案与解析
**答案：A**

pnpm 通过硬链接（hard link）将包存储在全局 store 中，再通过软链接（symlink）映射到项目的 node_modules 中。这种方案相比 npm/yarn 的扁平化或拷贝方案，减少了磁盘占用并加快了安装速度。同时，pnpm 还支持严格模式的 node_modules 结构，使得只有 package.json 中声明的直接依赖可以被导入。

**关键数据**：相同依赖集合下，pnpm 的磁盘占用通常比 npm 少 30%~50%，安装速度快 2~3 倍。
:::

### 第 2 题（🟢）

::: details 查看答案与解析
**答案：B**

lockfile（package-lock.json / yarn.lock / pnpm-lock.yaml）记录了依赖树中每个包的确切版本号、完整性哈希和解析来源。提交到版本控制后，所有开发环境和 CI/CD 环境都会安装完全相同的依赖版本，从而保证构建的可复现性（reproducible builds）。

**常见误区**：lockfile 不加速安装（虽然可以跳过分辨率计算），不减少包体积，也不自动修复漏洞。
:::

### 第 3 题（🟢）

::: details 查看答案与解析
**答案：C**

依赖混淆（dependency confusion）攻击是指攻击者在公共 registry（如 npmjs.com）上传一个与组织内部私有包同名的包。如果开发者的 registry 配置中公共 registry 优先级高于私有 registry，npm install 会从公共 registry 下载恶意包，从而导致敏感信息泄露或代码执行。

**其他选项**：XSS 是前端安全攻击，CSRF 是 Web 安全攻击，SQL 注入是后端安全攻击，它们不属于供应链攻击范畴。
:::

### 第 4 题（🟢）

::: details 查看答案与解析
**答案：A**

npm semver（语义化版本）规范中：
- `^1.2.3` 表示允许 PATCH 和 MINOR 级别更新，即 >=1.2.3 且 <2.0.0
- `~1.2.3` 表示只允许 PATCH 级别更新，即 >=1.2.3 且 <1.3.0
- `1.2.3` 表示锁定确切版本
- `*` 表示任意版本

**记忆技巧**：`^` 宽松（caret = 可升级到左侧非零版本的上限），`~` 严格（tilde = 只升级最后一位）。
:::

### 第 5 题（🟡）

::: details 查看答案与解析
**答案：B**

SBOM（Software Bill of Materials，软件物料清单）是一份详细的、机器可读的软件组件清单，包含所有直接和间接依赖的名称、版本、来源和许可证信息。它类似于食品包装上的成分表。

**主要应用场景**：
1. **漏洞响应**：当发现新漏洞时，通过 SBOM 快速定位受影响组件
2. **合规审计**：验证许可证合规性（如 GPL 兼容性）
3. **供应链透明度**：了解使用了哪些第三方组件及其依赖关系
:::


### 第 6 题（🟢）

::: details 查看答案与解析
**答案：A**

peerDependencies 的典型场景是**插件架构**：如 React 组件库需要宿主应用提供 React 运行时。如果使用 dependencies 声明，会导致 React 被安装两遍，产生多实例冲突。peerDependencies 通知包管理器："这个包需要宿主环境自行安装并提供指定版本的依赖"。

**npm v7+ 行为变化**：npm v7 开始会自动安装 peerDependencies，不再是仅给出 warning。
:::

### 第 7 题（🟢）

::: details 查看答案与解析
**答案：B**

`npm audit fix` 的工作原理：先执行安全审计，识别有漏洞的依赖及其修复版本，然后自动执行 `npm install` 将受影响的包升级到包含修复的兼容版本。

**注意事项**：
- `npm audit fix --force` 会进行 major 升级（可能导致 breaking changes）
- 不是所有漏洞都有修复版本（需要手动处理）
- 升级后应运行测试套件确保兼容性
:::

### 第 8 题（🟢）

::: details 查看答案与解析
**答案：A**

npx（Node Package Execute）是 npm 5.2+ 自带的包执行工具。核心能力是在不全局安装包的情况下，临时下载并执行该包的最新版本，执行后自动清理。

**典型用法**：
- `npx create-react-app my-app` — 无需全局安装脚手架
- `npx http-server` — 临时启动静态服务器
- `npx --package @scope/pkg <cmd>` — 指定作用域包
:::

### 第 9 题（🟢）

::: details 查看答案与解析
**答案：B**

npm v7 开始使用 lockfileVersion 2，相比 v1 有以下改进：
1. **完整性字段**：每个包条目包含 `integrity`（subresource integrity hash），确保下载内容未被篡改
2. **Monorepo 支持**：更好地支持 npm workspaces，正确处理 workspace 中的包依赖
3. **一致性提升**：所有包使用相同的解析逻辑，减少跨平台差异

lockfileVersion 3（npm v9+）进一步优化了性能，减少了文件体积。
:::

### 第 10 题（🟡）

::: details 查看答案与解析
**答案：B**

pnpm 的 `.pnpm` 目录是其核心实现机制：

1. **全局 store**：所有包的实际文件存储在全局 store（`~/.pnpm-store`）中，通过硬链接映射到 `.pnpm` 目录
2. **嵌套结构**：`.pnpm` 目录下按 `包名@版本` 组织，每个版本独立存放
3. **软链接映射**：直接依赖通过软链接从 `.pnpm/pkg@version/node_modules/pkg` 链接到顶层的 `node_modules/pkg`
4. **严格隔离**：间接依赖不会暴露在顶层 node_modules 中，只能通过其父包的 node_modules 访问

**效果**：节省磁盘 + 防止幽灵依赖 + 支持同一包多版本共存。
:::

### 第 11 题（🟡）

::: details 查看答案与解析
**答案：A**

`overrides`（npm）/ `resolutions`（yarn）字段允许开发者强制覆盖依赖树中某个包的版本：

**适用场景**：
1. 某个间接依赖存在漏洞，直接依赖作者未及时更新
2. 需要统一项目中某个包的多版本共存
3. 临时使用 fork 版本修复 bug

**npm overrides 语法示例**：
```json
{
  "overrides": {
    "lodash": "4.17.21",
    "react": "$react"
  }
}
```

**注意事项**：overrides 是强制性的，可能导致直接依赖不兼容，使用后必须充分测试。
:::

### 第 12 题（🟡）

::: details 查看答案与解析
**答案：B**

workspace 协议（`workspace:*` / `workspace:^` / `workspace:~`）是 pnpm/yarn/npm workspaces 提供的内部包引用机制。

**工作原理**：
- 在 monorepo 开发阶段，`workspace:*` 指向本地工作区中的对应包
- 发布时，`*` 会被替换为实际版本号（`pnpm publish -r` 自动处理）
- 这避免了本地开发时需要手动 `npm link` 或反复发布测试版本

**版本修饰符**：
- `workspace:*` — 锁定本地最新版本
- `workspace:^1.2.3` — 允许 minor/patch 更新
- `workspace:~1.2.3` — 只允许 patch 更新
:::

### 第 13 题（🟡）

::: details 查看答案与解析
**答案：B**

依赖混淆攻击（dependency confusion）的核心条件是：

1. **内部私有包**：组织使用了未在公共 registry 注册的内部包名
2. **配置缺陷**：npm 配置中公共 registry（registry.npmjs.org）的优先级高于私有 registry
3. **包名相同**：攻击者在公共 registry 上传同名包

**防范措施**：
- 所有内部包使用 scoped 命名（`@company/pkg`）
- 配置 `.npmrc` 限制 registry 作用域
- 使用 `npx npm-verify` 等工具检查包来源
- CI 中阻断未审批的外部包安装
:::

### 第 14 题（🟡）

::: details 查看答案与解析
**答案：B**

`npm ls` 以树形结构展示 node_modules 中的依赖关系：

```bash
project@1.0.0 D:/project
├── react@18.2.0
├── react-dom@18.2.0
│   └── scheduler@0.23.0
└── lodash@4.17.21
```

**常用选项**：
- `npm ls --depth=0` — 只显示直接依赖
- `npm ls --all` — 显示完整依赖树
- `npm ls <pkg>` — 检查特定包的版本
- `npm ls --prod` / `--dev` — 按环境筛选

**排错用途**：检查多版本共存、幽灵依赖、缺失依赖等问题。
:::

### 第 15 题（🟡）

::: details 查看答案与解析
**答案：B**

`npm ci`（clean install）用于 CI/CD 环境，与 `npm install` 的关键区别：

| 特性 | npm install | npm ci |
|------|------------|--------|
| 是否需要 lockfile | 可选 | 必须 |
| 更新 lockfile | 可能修改 | 绝不修改 |
| 删除 node_modules | 否 | 先删除再安装 |
| 安装速度 | 较慢 | 快 2~3 倍 |
| 确定性 | 低 | 高 |

**最佳实践**：CI/CD 流水线始终使用 `npm ci`（或 pnpm 的 `pnpm install --frozen-lockfile`）确保构建的确定性和快速部署。
:::

---

### 第 16 题（🟡）

npm 的 `package-lock.json` 与 yarn 的 `yarn.lock` 在格式上的根本区别是什么？

A. `package-lock.json` 使用 JSON 格式、嵌套结构；`yarn.lock` 使用扁平的类 YAML 文本格式
B. 两者均使用相同的 JSON 格式，仅文件名不同
C. `yarn.lock` 是二进制文件，`package-lock.json` 是文本文件
D. `package-lock.json` 由 yarn 生成，`yarn.lock` 由 npm 生成

::: details 查看答案与解析
**答案：A**

**格式对比**：

- **package-lock.json（npm）**：JSON 格式，嵌套树状结构。每个包的 dependencies 字段嵌套其直接依赖。支持 lockfileVersion 1/2/3，v2 起增加了 integrity 字段和 workspace 支持。
- **yarn.lock（Yarn Classic v1）**：扁平的类 YAML 文本格式，所有包以顶级 key 列出，每个 key 包含多个字段（version, resolved, integrity, dependencies 等）。使用 `#` 注释。
- **pnpm-lock.yaml（pnpm）**：YAML 格式，importers 区为 workspace 包，packages 区为所有解析后的依赖。

**影响**：格式差异导致合并冲突的处理方式不同——yarn.lock 的扁平格式通常更容易通过 `yarn merge` 或 `yarn-deduplicate` 处理合并冲突。
:::

### 第 17 题（🟡）

什么是"幽灵依赖"（phantom dependency / ghost dependency）？

A. 已在 package.json 中声明但在任何源文件中未导入的依赖
B. 未在项目的 package.json 中声明，但由于 npm 的依赖提升（hoisting）机制，仍可以在代码中导入的传递依赖
C. 仅存在于 lockfile 中但从未实际安装的依赖
D. 安装时显示弃用警告的过时包

::: details 查看答案与解析
**答案：B**

**幽灵依赖的形成机制**：

npm 和 yarn（v1）使用扁平化的 node_modules 结构。当包 A 依赖包 B 时，B 被提升到顶层 node_modules，于是你的代码可以直接 `import B`——即使 B 不在你的 package.json 中。

**为什么危险**：
1. **脆弱的构建**：如果 A 的下个版本不再依赖 B，你的代码立即报错
2. **环境不一致**：不同 npm 版本或包管理器版本提升策略不同，本地正常但 CI 失败
3. **版本不确定性**：你使用的 B 版本由 A 的决定，随时可能变化

**解决方案**：使用 pnpm 的严格模式，或配置 ESLint 的 `import/no-extraneous-dependencies` 规则检测未声明的导入。
:::

### 第 18 题（🟡）

Snyk 和 Socket.dev 属于哪一类工具？它们的主要功能是什么？

A. 打包工具——优化生产构建的包体积
B. 供应链安全工具——扫描依赖的已知漏洞、恶意代码、许可证合规性和维护者信誉
C. 包发布工具——帮助发布包到 npm registry
D. 性能分析工具——测量打包加载时间

::: details 查看答案与解析
**答案：B**

**功能对比**：

- **Snyk**：基于漏洞数据库的依赖扫描、自动修复 PR、许可证合规检查、容器镜像扫描、IaC 安全扫描。集成到 CI/CD 可阻断不安全依赖。
- **Socket.dev**：侧重恶意包检测（域名仿冒 typosquatting、抗议软件 protestware、混淆代码）、供应链风险评估、可疑包行为拦截。提供包健康评分。

**共同价值**：在依赖引入阶段（而非漏洞披露后）提前发现风险，将安全左移。
:::

### 第 19 题（🟢）

关于开源许可证，以下哪项描述是正确的？

A. MIT：宽松许可，允许在专有软件中自由使用。GPL：著佐权（copyleft），要求衍生作品必须以 GPL 发布。Apache 2.0：宽松许可，包含明确的专利授权条款
B. 三种许可证都要求衍生作品开源
C. GPL 许可的代码可以在专有软件中使用而无需任何义务
D. MIT 要求所有衍生作品必须以 MIT 许可发布

::: details 查看答案与解析
**答案：A**

**企业场景下的许可证含义**：

| 许可证 | 类型 | 能否用于商业闭源 | 主要义务 |
|--------|------|-----------------|---------|
| MIT | 宽松 | 可以 | 保留版权声明 |
| Apache 2.0 | 宽松 + 专利授权 | 可以 | 保留声明，专利授权 |
| GPL v2/v3 | 强著佐权 | 内部使用可以；分发需开源 | 分发时提供源码 |
| LGPL | 弱著佐权 | 可以通过链接使用 | 修改库本身需开源 |
| BSD | 宽松 | 可以 | 保留版权声明 |

**最佳实践**：企业在引入依赖前应使用 SCA 工具自动扫描许可证，阻断不兼容许可证（如 GPL）。
:::

### 第 20 题（🟡）

什么是软件组成分析（Software Composition Analysis, SCA）？

A. 分析软件组件在运行时的交互性能
B. 自动识别代码库中的开源组件、映射其版本、检查已知漏洞并评估许可证合规性
C. 一种用于组合微服务的编程语言
D. 替代 Webpack 的构建工具

::: details 查看答案与解析
**答案：B**

**SCA 的核心能力**：

1. **自动化发现**：扫描 lockfile、manifest、二进制文件，识别所有使用的 OSS 组件
2. **漏洞关联**：将组件与 CVE/NVD 数据库匹配，识别已知安全漏洞
3. **许可证合规**：检测许可证冲突（如同时使用 GPL 和 MIT 的组合限制）和违反公司政策的许可证
4. **依赖拓扑分析**：绘制完整的传递依赖树，识别可达性风险

**常用工具**：Snyk、Black Duck、FOSSA、WhiteSource（Mend）、OWASP Dependency-Check、Trivy
:::

### 第 21 题（🟡）

在 CI/CD 流水线中，推荐使用 `npm ci` 而非 `npm install`，主要原因是什么？

A. `npm ci` 会自动更新依赖到最新版本
B. `npm ci` 严格遵循 lockfile 安装、删除现有 node_modules、绝不修改 lockfile，确保构建的确定性和可复现性
C. `npm ci` 会跳过 lockfile 直接解析 package.json
D. `npm ci` 只安装生产依赖，忽略开发依赖

::: details 查看答案与解析
**答案：B**

**`npm ci` 的核心设计原则**：

`npm ci`（clean install）专为 CI/CD 环境设计：

- **必须存在 lockfile**：无 lockfile 则立即报错，强制团队提交 lockfile
- **删除重建**：自动删除 node_modules 后重新安装，避免缓存污染
- **锁定版本**：完全按照 lockfile 安装，忽略 package.json 中的 semver 范围
- **只读 lockfile**：绝不修改 lockfile，若 package.json 与 lockfile 不一致则报错

**对比**：`npm install` 在有 lockfile 时也会按 lockfile 安装，但存在以下风险——如果 lockfile 不存在或与 package.json 不一致（如手动修改了 package.json），`npm install` 会静默更新 lockfile，导致不同环境可能安装不同版本。

**CI 最佳实践**：
```bash
# 推荐
npm ci

# 更严格的方案——lockfile 不一致时报错
npm ci --frozen-lockfile  # pnpm 等效命令
```
:::

### 第 22 题（🟡）

在 pnpm monorepo 中使用 `workspace:^1.2.3` 协议声明依赖时，发布到 npm registry 后会发生什么？

A. 发布时 `workspace:^1.2.3` 会被自动替换为实际的版本号（如 `^1.2.3`）
B. `workspace:^1.2.3` 作为文字保留，安装时从 workspace 查找
C. 发布操作会失败，因为 workspace 协议不能发布
D. 发布后,pnpm 会自动创建同名的 npm 包

::: details 查看答案与解析
**答案：A**

**workspace 协议的核心机制**：

pnpm 和 yarn berry 的 workspace 协议在 monorepo 开发阶段链接本地包，发布时自动转换：

```
# 开发阶段：链接到本地 workspace 包
@my/lib → 链接到 packages/lib

# 执行 pnpm publish -r 或 pnpm publish 时
workspace:^1.2.3 → ^1.2.3  （自动替换为实际版本）
workspace:*        → 1.2.3  （锁定精确版本）
workspace:~1.2.3   → ~1.2.3
```

**验证命令**：`pnpm publish --dry-run` 可预览版本替换结果。
:::

### 第 23 题（🟡）

当项目中一个间接依赖存在严重安全漏洞，但依赖它的直接依赖已不再维护时，以下哪种方案最有效？

A. 放弃修复，接受风险
B. 寻找替代所有使用该间接依赖的直接依赖，逐一替换
C. 使用 `overrides`（npm）或 `resolutions`（yarn）强制将间接依赖升级到安全版本
D. 删除 lockfile 和 node_modules 后重新安装

::: details 查看答案与解析
**答案：C**

**`overrides` / `resolutions` 的使用场景**：

这是它们最典型的使用场景——直接依赖停止维护，但其依赖的深层包存在漏洞。

**npm overrides 示例**：
```json
{
  "overrides": {
    "semver-regex": "4.0.2",
    "minimatch": {
      "minimatch": "5.1.6"
    }
  }
}
```

**注意事项**：
1. `overrides` 是强制覆盖，可能导致直接依赖行为异常
2. 修改后运行完整的测试套件验证兼容性
3. 如果 override 后的版本 API 有 breaking change，可能需要使用 `patch-package` 修补
4. 长期方案应是替换已停止维护的直接依赖
:::

### 第 24 题（🟡）

以下哪种场景最容易遭受依赖混淆（dependency confusion）攻击？

A. 项目内部包使用 scoped 命名（如 `@company/pkg`）并且正确配置了 scoped registry
B. 项目直接依赖了一个与内部私有包同名的公有包，且 registry 搜索顺序配置不当——npm 优先查找公共 registry
C. 项目使用 pnpm 管理依赖
D. 项目使用 lockfile 锁定所有依赖版本

::: details 查看答案与解析
**答案：B**

**依赖混淆攻击的根本原因**：

攻击者利用 npm registry 解析顺序的缺陷：当配置中公共 registry 优先级高于私有 registry，且存在同名包时，npm 会从公共 registry 下载恶意版本。

**完整防护策略**：

1. **Scoped packages（推荐）**：所有内部包使用 `@company/pkg` 命名，在 `.npmrc` 中配置：
   ```
   @company:registry=https://private-reg.company.com/
   ```
2. **Registry 隔离**：CI/CD 中将默认 registry 设为私有 registry，仅允许通过代理访问公共 registry
3. **锁文件审查**：在 code review 中检查 lockfile 变更，确认新增包来源
4. **安装前验证**：使用 `socket.dev` 或自定义脚本验证包来源
5. **上游代理**：部署私有 registry（如 Verdaccio）作为统一入口，控制包的白名单
:::

### 第 25 题（🟢）

关于 `npm audit fix` 的行为，以下哪项描述是正确的？

A. 始终将依赖升级到最新版本，无论是否有 breaking changes
B. 自动修复可修复的漏洞，将依赖升级到在 semver 范围内兼容的安全版本
C. 删除所有存在漏洞的包
D. 完全重写 package.json 中的所有依赖版本

::: details 查看答案与解析
**答案：B**

**`npm audit fix` 的工作原理**：

1. `npm audit` 扫描依赖树，将每个包及其版本与漏洞数据库匹配
2. `npm audit fix` 尝试升级到包含修复的兼容版本（遵循 semver 范围）
3. 只在 lockfile 允许的范围内升级，不会做 breaking change

**进阶选项**：
- `npm audit fix --force`：允许 major 升级（存在 breaking changes 风险，需谨慎使用）
- `npm audit fix --only=dev`：仅修复开发依赖
- `npm audit --audit-level=high`：只报告 high 及以上级别的漏洞

**重要限制**：不是所有漏洞都有修复版本。对于无修复的漏洞，需要手动处理——使用 override、patch-package，或替换依赖。
:::

---

### 第 26 题（🟡）

::: details 查看答案与解析
**参考思路**：

1. **确认漏洞详情**：运行 `npm audit --json` 获取 CVE 编号、CVSS 评分、受影响版本、利用条件
2. **评估实际影响**：分析该间接依赖的调用路径，确认是否真的被使用（有些漏洞只在特定使用模式下触发）
3. **寻求修复方案**：
   - 检查直接依赖是否有最新版本升级了该间接依赖
   - 使用 `overrides`（npm）或 `resolutions`（yarn）强制将间接依赖升级到修复版本
   - 使用 `patch-package` 修补间接依赖
4. **替换直接依赖**：如果直接依赖已停止维护，应计划替换为活跃维护的替代包
5. **临时防护**：添加 WAF 规则、运行时监控、内容安全策略（CSP）等缓解措施
6. **长期治理**：建立依赖健康度评估体系，在引入新包时检查其维护活跃度和依赖深度
:::

### 第 27 题（🟡）

::: details 查看答案与解析
**参考思路**：

**问题诊断**：这是典型的**依赖混淆攻击**（dependency confusion），也称为"劫持攻击"。

**攻击原理**：
- 组织内部使用名为 `internal-logger` 的私有包
- 攻击者在 npmjs.com 上传同名的公共包
- 如果 npm 配置中 `registry=https://registry.npmjs.org/` 优先于私有 registry，安装时就会拉取恶意包

**防范措施**：
1. **Scoped packages**：所有内部包使用 `@company/package-name` 命名空间
2. **Registry 隔离**：在 `.npmrc` 中配置 scoped registry：
   ```
   @company:registry=https://private-registry.company.com/
   ```
3. **安装前验证**：CI 中校验包来源，阻断来自公共 registry 的内部包名
4. **锁文件审查**：Review lockfile 变更，关注新增包的来源
5. **安全扫描**：集成 `socket.dev`、`Snyk` 等工具自动检测
:::

### 第 28 题（🔴）

::: details 查看答案与解析
**参考流程**：

```
阶段 1: 需求提出
  └─ 开发者填写依赖申请表（用途、替代方案、预期引入量）

阶段 2: 安全评估
  ├─ 维护活跃度：GitHub stars、commit 频率、issue 响应时间
  ├─ 代码质量：TypeScript 类型覆盖、测试覆盖、Lint 配置
  ├─ 安全记录：npm audit 评分、Snyk 报告、CVE 历史
  ├─ 许可证：是否兼容公司政策（禁止 GPL，允许 MIT/Apache）
  ├─ 依赖深度：间接依赖数量 ≤ 50，总包体积 ≤ 5MB
  └─ 作者信誉：是否经过验证、是否多因素认证

阶段 3: 自动化扫描
  ├─ CI 集成 npm audit / Snyk / Socket.dev
  ├─ 依赖混淆检测
  └─ 生成评估报告

阶段 4: 审批决策
  ├─ 通过 → 加入内批准名单
  ├─ 拒绝 → 记录原因，提示替代方案
  └─ 待定 → 安全团队人工审核

阶段 5: 定期复评（季度）
  ├─ 检查已审批包的维护状态变化
  └─ 标记不再维护或出现漏洞的包
```

**关键原则**：审批流程应自动化为主（90%以上自动处理），人工审核只针对高风险或边界情况。
:::

### 第 29 题（🟡）

::: details 查看答案与解析
**参考思路**：

**问题分析**：A 依赖 lodash@4.0.0，B 依赖 lodash@3.0.0，npm 的扁平化 node_modules 会尽可能将包的版本提升到顶层：

- npm 倾向于安装一个兼容的版本：如果 A 和 B 的 semver 范围有交集，会安装交集版本
- lodash@3.0.0 和 lodash@4.0.0 的 API 不兼容（4.0 是 major 升级），npm 会安装两个版本
- lodash@4.0.0 被提升到顶层，lodash@3.0.0 嵌套在 B 的 node_modules 中
- 如果 A 的代码依赖了 lodash@4.0.0 的 API，而 B 的代码意外 import 了顶层 lodash，可能出现运行时错误

**解决方案**：
1. **升级 B**：检查 B 是否兼容 lodash@4.x，发布升级版本
2. **强制统一版本**：使用 `overrides` / `resolutions` 强制使用 lodash@4.0.0
3. **使用 pnpm**：pnpm 的严格结构能更优雅地处理多版本共存
4. **Lockfile 审查**：运行 `npm ls lodash` 确认最终安装的版本结构
:::

### 第 30 题（🟡）

::: details 查看答案与解析
**参考思路**：

**可能原因**：
1. **lockfile 未提交**：本地有 node_modules，CI 中没有，lockfile 被 .gitignore 导致 CI 使用不同的解析版本
2. **npm install vs npm ci**：本地可能使用 `npm install`（可能产生不同版本），CI 使用 `npm ci`
3. **平台差异**：本地是 Windows，CI 是 Linux，某些包的 postinstall 脚本平台特定
4. **幽灵依赖**：本地代码直接 import 了未在 package.json 中声明的间接依赖
5. **包被移除**：某个依赖的新版本移除了 `left-pad` 包

**解决方案**：
1. 确保 lockfile 提交到版本控制
2. 在 package.json 中显式声明所有直接使用的依赖
3. 使用 `npm ci` 替代 `npm install` 确保一致性
4. 在 CI 中使用 `npm ls --depth=0` 验证依赖声明完整性
5. 考虑使用 pnpm 的严格模式，强制开发者声明所有直接依赖
:::

### 第 31 题（🟡）

::: details 查看答案与解析
**参考思路**：

**分级响应策略**：

| 漏洞等级 | 响应目标 | 处理策略 |
|---------|---------|---------|
| CRITICAL | 48h 内修复 | 优先处理，考虑临时禁用或降级 |
| HIGH | 1 周内修复 | 尽快安排修复 Sprint |
| MODERATE | 1 个月内修复 | 纳入迭代计划 |
| LOW | 下个季度修复 | 记录跟踪，集中处理 |

**具体步骤**：
1. **分类分析**：对 58 个漏洞按等级和类型分类
2. **快速修复**：运行 `npm audit fix` 自动修复可修复的 low/moderate 漏洞
3. **手动评估**：检查每个 moderate 漏洞的实际利用路径和影响面
4. **批量升级**：使用 `npm update` 升级兼容的依赖
5. **风险接受**：对于没有利用路径或没有修复版本的 low 漏洞，记录并接受风险
6. **持续监控**：配置 Dependabot 或 Renovate 自动提 PR

**工具推荐**：`npm audit --json > audit-report.json` + 自定义脚本分析报告。
:::

### 第 32 题（🔴）

::: details 查看答案与解析
**参考方案**：

**迁移步骤**：

```
第 1 周: 评估与准备
  ├─ 盘点所有项目及其依赖规模
  ├─ 验证 pnpm 兼容性（重点：postinstall 脚本、原生模块）
  └─ 制定回滚计划

第 2 周: 试点迁移
  ├─ 选择 1~2 个非核心项目试迁移
  ├─ 验证构建、测试、部署全链路
  └─ 记录问题清单

第 3 周: 工具链适配
  ├─ 更新 CI/CD 流水线（npm → pnpm）
  ├─ 更新 Dockerfile（安装 pnpm）
  ├─ 配置 .npmrc（shamefully-hoist 策略选择）
  └─ 更新锁文件（删除 package-lock.json，生成 pnpm-lock.yaml）

第 4 周: 全量迁移
  ├─ 按业务模块分批迁移
  ├─ 每个模块迁移后运行完整测试套件
  └─ 监控生产环境稳定性
```

**风险控制**：
1. **幽灵依赖检测**：使用 `pnpm import` 从 npm lockfile 迁移，利用 `--strict-peer-dependencies` 发现未声明的 peer 依赖
2. **不完全兼容的包**：使用 `package.json` 的 `pnpm.onlyBuiltDependencies` 白名单控制 postinstall 脚本
3. **shamefully-hoist**：如果项目存在大量幽灵依赖，临时设置 `shamefully-hoist=true` 逐步修复
4. **Docker 构建速度**：利用 pnpm store 的缓存特性优化 CI 构建速度
:::

### 第 33 题（🔴）

::: details 查看答案与解析
**参考流程**：

```
T+0h: 发现与评估
  ├─ 确认 CVE 编号、CVSS 评分、受影响版本范围
  ├─ 检查 react-dom v18.2.0 是否在受影响范围内
  ├─ 评估利用条件和攻击面
  └─ 通知相关团队（前端、安全、运维）

T+2h: 临时缓解
  ├─ 检查是否有官方热修复版本
  ├─ 如无修复，添加 WAF 规则拦截攻击 payload
  ├─ 考虑 CSP 头增强限制
  └─ 评估是否需要灰度回退版本

T+24h: 修复实施
  ├─ 如果官方发布修复版本，立即升级并验证
  ├─ 如果无官方修复，使用 patch-package 打补丁
  ├─ 或使用 override 切换到已知安全的次版本
  └─ 经过完整测试后部署到生产环境

T+48h: 复盘改进
  ├─ 编写安全事件报告
  ├─ 评估依赖引入流程是否需改进
  ├─ 考虑引入 SBOM 机制加快下次响应
  └─ 更新应急预案手册
```

**关键考量**：区分"影响评级"和"紧急程度"——即使 CVSS 评分高，如果没有实际利用路径，紧急程度可适当调低。
:::

### 第 34 题（🟡）

::: details 查看答案与解析
**参考思路**：

**推荐方案：pnpm workspaces + Turborepo**

**选择分析**：

| 维度 | pnpm + Turborepo | npm workspaces | Yarn Berry + Nx |
|------|-----------------|----------------|-----------------|
| 磁盘占用 | 最低（全局 store + 硬链接） | 较高（重复拷贝） | 中等（压缩 + 缓存） |
| 安装速度 | 最快（并行 + 缓存） | 较慢 | 快 |
| 幽灵依赖防护 | 严格隔离 | 无 | 部分支持（PnP 模式） |
| CI 缓存 | 支持 store 缓存，显著提速 | 有限 | 支持 |
| Monorepo 工具链 | 配合 Turborepo 构建编排 | 需额外工具 | Nx 原生集成 |

**核心理由**：
1. **磁盘效率**：20 个包共享依赖时，pnpm 的硬链接方案可节省 60%~70% 磁盘空间
2. **严格隔离**：防止幽灵依赖，每个包只能访问其声明的依赖
3. **workspace 协议**：内部包通过 `workspace:*` 引用，发布时自动替换
4. **CI 加速**：pnpm store 缓存 + Turborepo 增量构建，CI 时间可缩短 50%+

**实施要点**：
- 使用 `.npmrc` 配置 `strict-peer-dependencies=true`
- 配合 Turborepo 的 `turbo.json` 定义构建依赖图
- 配置 `pnpm-workspace.yaml` 声明 workspace 路径
- 在 CI 中缓存 `~/.pnpm-store` 目录
:::

### 第 35 题（🟡）

::: details 查看答案与解析
**参考思路**：

**根因分析**：
1. **多人同时修改 package.json**：各分支添加了不同的依赖，lockfile 冲突
2. **没有在 CI 前同步分支**：feature 分支落后于 main，package.json 包含不同依赖
3. **手动编辑 package.json 后未运行 npm install**：导致 lockfile 未更新

**修复方案**：

| 步骤 | 操作 | 命令 |
|------|------|------|
| 1 | 确保 main 分支 lockfile 正确 | `git checkout main && npm install` |
| 2 | 合并或 rebase 到最新 main | `git rebase main` |
| 3 | 解决 lockfile 冲突（如有） | 手动合并或 `npm install` 重新生成 |
| 4 | 本地运行 npm install 更新 lockfile | `npm install` |
| 5 | 提交 lockfile 变更 | `git add package-lock.json && git commit` |
| 6 | 确保 CI 使用 npm ci | CI 配置 `npm ci --frozen-lockfile` |

**系统级预防**：
1. **Pre-commit hook**：检查 lockfile 是否与 package.json 同步
2. **CI 门禁**：`npm ci --frozen-lockfile` 失败则阻断合并
3. **Dependabot/Renovate**：自动管理依赖更新并生成 lockfile
4. **Lockfile linting**：使用 `lockfile-lint` 等工具验证 lockfile 完整性
:::

### 第 36 题（🔴）

::: details 查看答案与解析
**参考流程**：

```
阶段 1: 即时响应（T+0h ~ T+1h）
  ├─ 确认告警真实性：检查包版本、恶意代码样本
  ├─ 确定受影响的项目和版本范围
  ├─ 锁定/回滚版本：在 package.json 中锁定已知安全版本
  └─ 阻断安装：在 CI 和私有 registry 中屏蔽恶意版本

阶段 2: 影响评估（T+1h ~ T+4h）
  ├─ 扫描所有项目的依赖树，标记受影响版本
  ├─ 检查 CI 日志和运行历史，确定最早引入时间
  ├─ 评估数据泄露风险：哪些环境变量可能被窃取
  └─ 通知安全负责人和法务团队

阶段 3: 清理修复（T+4h ~ T+24h）
  ├─ 替换依赖：寻找替代包，或 fork 修复
  ├─ 升级所有受影响项目至安全版本
  ├─ 轮换所有可能泄露的 CI 密钥和令牌
  └─ 全面运行安全扫描确认清除

阶段 4: 事后复盘（T+24h ~ T+48h）
  ├─ 编写安全事件报告（含时间线、影响范围、根因）
  ├─ 改进依赖引入审查流程
  ├─ 实施包来源验证和完整性检查
  └─ 更新供应链安全应急预案
```

**关键经验**：
- 在事件响应期间，优先阻断恶意包的传播（锁定版本/屏蔽 registry）
- 使用 `npm audit` 和 `socket.dev` 的实时监控功能
- 建立"最小权限"原则——CI 令牌应定期轮换且限制范围
:::

### 第 37 题（🟡）

::: details 查看答案与解析
**参考思路**：

**影响分析**：

| 方面 | 影响 |
|------|------|
| 现有版本 v2.x | 保持 MIT 许可，可以继续使用 |
| 未来版本 v3.x | 需要商业付费，可能需要采购流程 |
| 法律合规 | 需法务确认 v2.x 是否可永久使用 |
| 产品路线图 | 如需要 v3.x 的新功能，需评估成本 |

**推荐方案**：

1. **短期（0~3 个月）**：继续使用 v2.x，运行 `npm audit` 确认无安全漏洞。锁定 `"ui-lib": "2.x"` 防止意外升级。
2. **中期（3~6 个月）**：
   - 评估替代方案：寻找功能相近的 MIT/Apache 许可替代库
   - 评估 fork 社区维护版本（如果许可证允许）
   - 与法务确认商业使用旧版本的合规边界
3. **长期（6~12 个月）**：
   - 如果商业版本成本合理且功能有显著提升，启动采购流程
   - 否则，迁移到替代库或自建维护

**注意事项**：
- 不要升级到 v3.x，即使免费试用版也可能有许可陷阱
- 检查项目的传递依赖中是否引用了该库的不同版本
- 更新 SBOM 中的许可证信息
:::

### 第 38 题（🔴）

::: details 查看答案与解析
**参考思路**：

**评估维度**：

| 维度 | 评估结果 | 风险等级 |
|------|---------|---------|
| 代码量 vs 依赖量 | 50 行代码 vs 200+ 传递依赖 | 🔴 严重不匹配 |
| 安装体积 | 15MB+ | 🟡 中 |
| 维护者信誉 | 需检查 | 🟡 需验证 |
| 替代方案 | 原生 URL API + 少量工具函数 | 🟢 可选 |
| 供应链攻击面 | 200+ 依赖 = 200+ 潜在攻击入口 | 🔴 高 |

**推荐决策：拒绝引入**

**理由**：
1. **功能与成本严重不匹配**：一个 URL 解析功能不应带来 200+ 依赖。Node.js 内置的 `URL` 类和 `url` 模块已经可以满足大部分需求，对少数不便之处可编写 ~20 行辅助函数。
2. **供应链攻击面过大**：每个传递依赖都是潜在的攻击入口（恶意包、依赖混淆、账户劫持）。200+ 依赖意味着攻击面扩大 200 倍。
3. **维护负担**：200+ 依赖需要持续监控漏洞，`npm audit` 报告中的噪声会显著增加。

**替代方案**：
- 使用 Node.js 原生 `URL` API + 自定义辅助函数
- 如果需要增强功能，选择无依赖或极少依赖的库（如 `tldts`）
- 要求开发者在引入任何新包时执行"依赖预算"检查
:::

### 第 39 题（🟡）

::: details 查看答案与解析
**参考思路**：

| 特性 | npm (v7+) | yarn (v1) | pnpm |
|------|-----------|-----------|------|
| node_modules 结构 | 扁平化 + 嵌套 | 扁平化 + 嵌套 | 严格隔离 |
| 包存储方式 | 拷贝到 node_modules | 拷贝到 node_modules | 硬链接到全局 store |
| 幽灵依赖 | 容易产生 | 容易产生 | 完全避免 |
| 多版本支持 | 隐式嵌套 | 隐式嵌套 | 显式通过 .pnpm 目录管理 |

**为什么 pnpm 能避免幽灵依赖**：
- npm/yarn 的扁平化策略将间接依赖提升到顶层 node_modules，使得开发者可以 import 未声明的包
- pnpm 只有直接依赖出现在顶层 node_modules，间接依赖藏在 `.pnpm/pkg@version/node_modules/` 中
- 每个包只能访问自己在 package.json 中声明的依赖及其传递依赖
- 尝试 import 未声明的包会导致 `MODULE_NOT_FOUND` 错误

**代价**：严格模式可能导致某些不规范的包无法工作，可能需要 `shamefully-hoist` 临时兼容。
:::

### 第 40 题（🔴）

::: details 查看答案与解析
**参考方案**：

**一、引入管控**
- 建立依赖白名单和黑名单机制
- 新包申请需填写用途、替代方案、License 信息
- CI 自动运行 `npm audit` 和 `socket.dev` 安全扫描
- 阻断包含已知恶意包、未授权 License 的 PR

**二、来源控制**
- 部署私有 npm registry（Verdaccio / JFrog Artifactory）
- 配置 scoped registry 隔离内部包
- 禁止直接从公共 registry 安装（CI 层面阻断）
- 使用锁文件锁定版本（`--frozen-lockfile`）

**三、持续审计**
- 每次 CI 构建执行 `npm audit`（或 `pnpm audit`）
- 集成 Snyk / Socket.dev / WhiteSource 进行深度扫描
- 自动生成 SBOM（spdx/cdx 格式）
- 每季度执行全量依赖审核

**四、更新策略**
- 配置 Renovate / Dependabot 自动提 PR
- Patch 更新自动合并（通过测试后）
- Minor 更新需人工审核变更日志
- Major 更新需评审兼容性和迁移计划

**五、应急响应**
- 定义漏洞响应 SLA（Critical 4h, High 24h, Medium 72h）
- 建立 Security On-Call 轮值机制
- 准备 overrides/resolutions 标准操作流程
- 定期进行供应链安全演练

**工具链**：Verdaccio + Renovate + Snyk + CycloneDX SBOM + OWASP Dependency-Check
:::

### 第 41 题（🔴）

::: details 查看答案与解析
**参考思路**：

**推荐工具选择**：pnpm workspaces（推荐）或 Yarn Berry + @yarnpkg/sdks

**核心策略**：

1. **公共依赖提升**：将 TypeScript、React、ESLint 等公共依赖安装到 root `package.json`
2. **Workspace 协议**：内部库使用 `workspace:*` 协议，发布时自动替换为实际版本
3. **统一的 TypeScript 版本**：所有包使用 root 的 TypeScript 版本，避免类型定义不一致
4. **依赖版本锁定**：使用 `.npmrc` 中的 `save-prefix=` 锁定精确版本

**版本冲突解决**：
```
# 方案 A：统一版本（推荐）
pnpm up -r -i  # 交互式升级所有包中的公共依赖

# 方案 B：Catalogs（pnpm v8+）
# pnpm-workspace.yaml 中定义
catalog:
  react: ^18.3.0
  typescript: ^5.4.0

# 各包中引用
dependencies:
  react: "catalog:"
```

**监控与验证**：使用 `pnpm ls -r` 检查多版本共存，设置 CI 规则阻断相同包的不同版本超过 N 个。
:::

### 第 42 题（🔴）

::: details 查看答案与解析
**参考方案**：

**选型对比**：

| 方案 | 优点 | 缺点 | 适合场景 |
|-----|------|------|---------|
| Verdaccio | 轻量、开源、易于部署 | 功能相对简单 | 中小型团队（<50 人） |
| JFrog Artifactory | 企业级、集成丰富 | 成本高、重运维 | 大型企业 |
| AWS CodeArtifact | 托管服务、与 AWS 集成 | 平台锁定 | 已使用 AWS 的组织 |
| GitHub Packages | 与 GitHub 深度集成 | 功能有限 | GitHub 深度用户 |

**部署方案（以 Verdaccio 为例）**：
```
1. Docker 部署
   version: '3'
   services:
     verdaccio:
       image: verdaccio/verdaccio:latest
       ports: ["4873:4873"]
       volumes: ["./storage:/verdaccio/storage"]

2. Nginx 反向代理 + HTTPS
3. 配置上游代理（uplink）缓存公共包
4. 配置访问控制（htpasswd 或 LDAP 集成）
```

**安全保障**：
1. **网络隔离**：仅内网可访问，VPN 远程访问
2. **认证授权**：集成公司 SSO/OAuth2
3. **包签名**：启用 npm 包签名验证（`npm sign`）
4. **审计日志**：记录所有包的上传和下载操作
5. **备份策略**：每日增量备份 + 每周全量备份 + 异地容灾
:::

### 第 43 题（🔴）

::: details 查看答案与解析
**参考方案**：

**SBOM 格式选择**：CycloneDX（推荐，OWASP 支持）或 SPDX

**生成管道设计**：

```
阶段 1: 构建时生成
  └─ 使用 @cyclonedx/bom 插件在构建时自动生成 SBOM
  └─ 命令：npx @cyclonedx/bom --output bom.json

阶段 2: 版本管理
  └─ SBOM 文件以构建产物形式存储在 CI 制品库
  └─ 使用语义化版本标记（app-1.2.3-bom.json）
  └─ 上传到 SBOM 管理平台（如 Dependency-Track）

阶段 3: 差异分析
  └─ 每次新构建与前一次 SBOM 对比
  └─ 自动检测新增/移除/升级的依赖
  └─ 标记所有变更需要在 PR 中说明原因

阶段 4: 漏洞关联
  └─ 将 SBOM 导入 Dependency-Track
  └─ 自动匹配 CVE 数据库
  └─ 生成漏洞影响分析报告

阶段 5: 合规审计
  └─ 扫描 SBOM 中的 License 合规性
  └─ 生成合规报告供审计团队使用
  └─ 导出 SPDX 格式满足法规要求（如美国 EO 14028）

CI/CD 集成示例（GitHub Actions）：
```yaml
- name: Generate SBOM
  run: npx @cyclonedx/bom --output bom-${GITHUB_SHA}.json
- name: Upload SBOM
  uses: actions/upload-artifact@v4
  with:
    name: sbom-${{ github.sha }}
    path: bom-*.json
```

**关键考量**：SBOM 的时效性和准确性——每次构建都要重新生成，且必须包含所有间接依赖。
:::

### 第 44 题（🔴）

::: details 查看答案与解析
**参考方案**：

**推荐方案：Verdaccio + Snyk + LDAP 集成**

**架构设计**：

```
                    ┌──────────────┐
                    │  开发者/CI    │
                    └──────┬───────┘
                           │ npm install
                    ┌──────▼───────┐
                    │  Nginx 反向   │
                    │  代理 + HTTPS │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
     ┌────────▼──┐  ┌─────▼─────┐  ┌───▼────────┐
     │ Verdaccio  │  │ 安全扫描   │  │  认证授权   │
     │ (核心注册表)│  │ (Snyk CLI) │  │ (LDAP/SSO) │
     ├────────────┤  ├───────────┤  ├────────────┤
     │ • 私有包   │  │ • 漏洞检查 │  │ • 用户认证 │
     │ • 公共包   │  │ • 许可证   │  │ • 权限控制 │
     │   代理缓存 │  │   扫描    │  │ • API令牌  │
     │ • 版本管理 │  │ • 恶意    │  └────────────┘
     └──────┬─────┘  │   检测    │
            │        └───────────┘
     ┌──────▼─────┐
     │ 公共 npm   │
     │ Registry   │
     └────────────┘
```

**组件详解**：

1. **核心 Registry (Verdaccio)**：
   - 私有包托管：支持 `npm publish`，自动存储到本地文件系统或 S3
   - 公共包代理：uplink 配置 `registry.npmjs.org`，自动缓存下载的公共包
   - 包隔离：通过 `packages` 配置控制哪些包名允许发布、哪些从上游代理

2. **安全扫描集成**：
   - 安装时扫描：通过 `pre-commit` hook 或 CI 阶段运行 `snyk test`
   - 发布时扫描：Verdaccio 插件 `verdaccio-audit` 在包发布时自动审计
   - 定时扫描：Jenkins/GitHub Actions 定时任务扫描所有包

3. **认证与权限**：
   - Verdaccio 集成 `verdaccio-ldap` 或 `verdaccio-oauth` 插件
   - 团队权限控制：`@team-a/pkg` 仅 team-a 可发布，其他团队只读
   - API 令牌管理：集成 Vault/Hashicorp 管理 CI 令牌

4. **高可用与灾备**：
   - 多实例部署：Kubernetes 部署多个 Verdaccio 实例，共享存储
   - 存储后端：AWS S3 / MinIO 作为包存储后端
   - 数据库：PostgreSQL/MySQL 存储包元数据（可选）
   - 备份策略：每日增量 + 每周全量，异地容灾

5. **CI/CD 集成**：
   ```bash
   # .npmrc
   registry=https://npm.internal.company.com/
   //npm.internal.company.com/:_authToken=${NPM_TOKEN}
   always-auth=true
   ```

**扩展能力**：
- Webhook：包发布时触发 CI 重建相关项目
- 审计日志：所有 publish/unpublish 操作记录到 ELK
- 用量统计：跟踪包下载量、依赖关系热度
:::

### 第 45 题（🔴）

::: details 查看答案与解析
**参考方案**：

**系统架构**：

```
  开发者 npm install          依赖防火墙                    公共 Registry
  ┌──────────┐   请求    ┌──────────────────────┐   代理    ┌──────────┐
  │ pnpm/npm │──────────▶│  反向代理 / 缓存层   │──────────▶│ npmjs.org│
  │ /yarn    │           │  (Nginx + Redis)     │           │          │
  └──────────┘           └──────────┬───────────┘           └──────────┘
                                    │
                           ┌────────▼────────┐
                           │   扫描引擎层     │
                           │  ┌────────────┐ │
                           │  │ 静态分析模块 │ │
                           │  │ • 混淆检测   │ │
                           │  │ • 已知签名   │ │
                           │  │   匹配      │ │
                           │  └────────────┘ │
                           │  ┌────────────┐ │
                           │  │ 动态分析模块 │ │
                           │  │ • 沙箱执行   │ │
                           │  │ • 网络调用   │ │
                           │  │  监控       │ │
                           │  └────────────┘ │
                           │  ┌────────────┐ │
                           │  │ 信誉分析模块 │ │
                           │  │ • 作者信誉   │ │
                           │  │ • 包年龄     │ │
                           │  │ • 下载趋势   │ │
                           │  └────────────┘ │
                           └────────┬────────┘
                                    │
                           ┌────────▼────────┐
                           │   策略引擎       │
                           │  ┌────────────┐ │
                           │  │ 允许/拒绝列表│ │
                           │  │ License过滤 │ │
                           │  │ 漏洞阈值    │ │
                           │  │ 依赖深度限制│ │
                           │  └────────────┘ │
                           └────────┬────────┘
                                    │ 决策 (allow/deny/warn)
                           ┌────────▼────────┐
                           │   审计日志       │
                           │  (ELK / S3)     │
                           └─────────────────┘
```

**核心能力**：

1. **缓存代理层**：
   - 透明代理所有 npm/pnpm/yarn 请求
   - Redis 缓存已通过扫描的包元数据和 integrity hash
   - 对于已批准的包，直接返回缓存结果，跳过重复扫描

2. **扫描引擎**：
   - **静态分析**：检测混淆代码（字符串编码、eval 使用、动态 require）、已知恶意模式（数据外传、环境变量读取）、可疑安装脚本
   - **沙箱执行**：在隔离容器中执行包的 postinstall 脚本，监控文件系统和网络行为
   - **信誉评分**：基于包年龄、维护者数量、GitHub stars、过往安全记录、下载趋势的综合评分

3. **策略引擎**：
   ```javascript
   // 策略配置示例
   {
     "rules": [
       { "action": "deny", "match": { "license": "GPL-3.0" } },
       { "action": "deny", "match": { "score": "< 0.3" } },
       { "action": "warn", "match": { "dependencies": "> 50" } },
       { "action": "allow", "match": { "package": "@company/*" } },
       { "action": "review", "match": { "maintainers": "< 2" } }
     ],
     "defaultAction": "review"
   }
   ```

4. **CI/CD 集成**：
   ```yaml
   # GitHub Actions 示例
   - name: Dependency Firewall Check
     run: |
       npm install --registry=https://firewall.internal.company.com/
   ```

5. **审计日志**：
   - 记录所有包安装请求及决策结果
   - 支持告警：当阻断发生时通知安全团队
   - 定期生成供应链安全报告

**部署方式**：Docker Compose 或 Kubernetes，支持水平扩展扫描引擎节点。
:::

---

**标签**：`#package-management` `#supply-chain` `#security`

> **最后更新**：2026-07-06
