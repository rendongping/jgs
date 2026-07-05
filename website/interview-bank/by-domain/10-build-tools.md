# 构建工具 面试题

> 本题库共收录 **100** 道面试题（基础 24 / 进阶 26 / 深入 26 / 架构 24）。
> 本文件收录构建工具相关面试题，目标题量 40 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、工程化题、性能优化题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（18 道）{#basic}

### FB-10-CO-B-001：常见前端构建工具 Webpack、Vite、Rollup 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Webpack、Vite、Rollup、构建工具对比
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请简要对比 Webpack、Vite、Rollup 三种常见前端构建工具，说明它们各自的特点和适用场景。

**参考答案**：

1. **Webpack**：
   - 功能最全面，支持 JS、CSS、图片、字体等各类资源打包。
   - 基于 bundler 模式，开发/生产都会打包。
   - 生态丰富，Loader 和 Plugin 体系成熟，适合大型复杂项目。

2. **Vite**：
   - 开发时基于 ES Modules + 原生浏览器加载，启动极快。
   - 生产使用 Rollup 打包，产物更精简。
   - 配置简单，适合 Vue/React 现代项目。

3. **Rollup**：
   - 基于 ES Module 的 Tree Shaking 优化更好，产物更干净。
   - 常用于库（library）打包，如 Vue/React 组件库。
   - 对代码分割、HMR 支持不如 Webpack 完善。

选型建议：
- 大型应用、复杂工程：Webpack / Rspack
- 现代 Web 应用、追求开发体验：Vite
- 工具库、组件库：Rollup

**评分维度**：
- 说出三者核心定位差异（40%）
- 说明各自优缺点（40%）
- 能给出选型建议（20%）

**常见错误**：
- 认为 Vite 开发时也打包所有依赖
- 认为 Rollup 适合所有类型项目

**延伸追问**：
- 为什么 Vite 开发环境启动快？
- 你们项目为什么选择当前构建工具？

**参考资源**：
- [Webpack 官方文档](https://webpack.js.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Rollup 官方文档](https://rollupjs.org/)

**口头回答版**：
> - 功能最全面，支持 JS、CSS、图片、字体等各类资源打包。 - 基于 bundler 模式，开发/生产都会打包。 - 生态丰富，Loader 和 Plugin 体系成熟，适合大型复杂项目。 - 开发时基于 ES Modules + 原生浏览器加载，启动极快。

---

### FB-10-CO-B-002：什么是 Loader 和 Plugin？它们有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Webpack、Loader、Plugin、扩展机制
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
在 Webpack 中，Loader 和 Plugin 分别是什么？它们的作用和区别是什么？请举例说明。

**参考答案**：

- **Loader**：
  - 用于转换模块源码，让 Webpack 能处理非 JS 文件。
  - 执行顺序：从右到左、从下到上（数组 reverse 执行）。
  - 常见 Loader：`babel-loader`、`css-loader`、`less-loader`、`url-loader`。

- **Plugin**：
  - 用于扩展 Webpack 的功能，在构建生命周期中执行自定义逻辑。
  - 通过 Webpack 提供的 hooks 介入编译、输出等阶段。
  - 常见 Plugin：`HtmlWebpackPlugin`、`CleanWebpackPlugin`、`DefinePlugin`、`MiniCssExtractPlugin`。

区别：

| 维度 | Loader | Plugin |
|------|--------|--------|
| 作用阶段 | 模块加载/转换阶段 | 整个构建生命周期 |
| 处理对象 | 单个模块文件 | 整体构建流程 |
| 使用方式 | `module.rules` 中配置 | `plugins` 数组中实例化 |
| 典型用途 | 转译、预编译 | 生成 HTML、清理目录、注入环境变量 |

**评分维度**：
- 准确解释 Loader 和 Plugin 概念（40%）
- 能各举 2-3 个例子（30%）
- 说明两者在配置和使用上的区别（30%）

**常见错误**：
- 混淆 Loader 和 Plugin 的作用
- 说不出 Loader 执行顺序

**延伸追问**：
- 如何编写一个自定义 Loader？
- Plugin 如何介入 Webpack 的生命周期？

**相关题目**：
- [FB-10-CD-A-001 手写一个 Webpack Loader](#FB-10-CD-A-001)
- [FB-10-CD-P-001 手写一个 Webpack Plugin](#FB-10-CD-P-001)

**参考资源**：
- [Webpack Loaders](https://webpack.js.org/loaders/)
- [Webpack Plugins](https://webpack.js.org/plugins/)

**口头回答版**：
> - 用于转换模块源码，让 Webpack 能处理非 JS 文件。 - 执行顺序：从右到左、从下到上（数组 reverse 执行）。 - 常见 Loader：babel-loader、css-loader、less-loader、url-loader。 - 用于扩展 Webpack 的功能，在构建生命周期中执行自定义逻辑。

---

### FB-10-CO-B-003：什么是 Tree Shaking？什么条件下能生效？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Tree Shaking、Dead Code Elimination、ES Module、打包优化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Tree Shaking 的概念，以及在前端构建中让它生效需要满足哪些条件。

**参考答案**：

Tree Shaking（摇树优化）是一种 Dead Code Elimination（DCE，死代码消除）技术，用于移除未引用的导出代码，从而减小打包体积。

生效条件：

1. **使用 ES Module**：
   - `import` / `export` 语法是静态的，便于构建工具分析依赖关系。
   - CommonJS 的动态 `require` 难以静态分析，Tree Shaking 效果较差。

2. **代码无副作用（sideEffect）**：
   - 在 `package.json` 中配置 `"sideEffects": false` 或指定有副作用的文件。
   - 默认情况下 Webpack 会谨慎处理可能包含副作用的模块。

3. **构建工具支持**：
   - Webpack 在生产模式默认开启 Tree Shaking。
   - Rollup、Vite（基于 Rollup/esbuild）也支持良好。

4. **避免导出被整体引用**：
   - 例如 `import * as utils from './utils'` 后再使用部分方法，通常仍可 Tree Shake，但直接 `import { foo } from './utils'` 效果最好。

```json
// package.json
{
  "sideEffects": [
    "*.css",
    "*.global.js"
  ]
}
```

**评分维度**：
- 解释 Tree Shaking 概念（40%）
- 说明需要 ES Module（30%）
- 提到 sideEffects 配置（30%）

**常见错误**：
- 认为 Tree Shaking 对所有模块规范都有效
- 忽略 `sideEffects` 配置导致优化失效

**延伸追问**：
- 为什么 CommonJS 难以做 Tree Shaking？
- 为什么有时明明没用到的方法仍然被打包进去了？

**参考资源**：
- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Rollup Tree Shaking](https://rollupjs.org/tutorial/#tree-shaking)

**口头回答版**：
> Tree Shaking（摇树优化）是一种 Dead Code Elimination（DCE，死代码消除）技术，用于移除未引用的导出代码，从而减小打包体积。 使用 ES Module： - import / export 语法是静态的，便于构建工具分析依赖关系。 - CommonJS 的动态 require 难以静态分析，Tree Shaking 效果较差。

---

### FB-10-CO-B-004：什么是 HMR？在开发环境中有什么好处？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：HMR、热更新、开发体验、Webpack、Vite
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 HMR（Hot Module Replacement，热模块替换）的概念，并说明它给开发环境带来的好处。

**参考答案**：

HMR 是一种在应用运行时替换、添加或删除模块，而无需刷新整个页面的技术。

主要好处：

1. **保留应用状态**：
   - 页面不刷新，React/Vue 组件状态、表单数据、路由状态等不会丢失。

2. **提升开发效率**：
   - 修改 CSS、组件代码后可立即看到效果，减少等待时间。

3. **更快的反馈循环**：
   - 只替换变更的模块，避免全量重新编译和加载。

4. **样式热更新**：
   - CSS 修改后即时生效，无需手动刷新。

HMR 需要构建工具和运行时配合：Webpack 通过 `module.hot.accept` 暴露 API；Vite 原生支持 HMR，基于 WebSocket 推送更新。

**评分维度**：
- 解释 HMR 基本概念（40%）
- 说明保留状态、提升效率等优势（40%）
- 提到需要构建工具和运行时配合（20%）

**常见错误**：
- 把 HMR 等同于普通页面自动刷新
- 认为 HMR 在生产环境也常用

**延伸追问**：
- 为什么 HMR 不能简单用于生产环境？
- 如果 HMR 失效，可能是什么原因？

**参考资源**：
- [Webpack HMR](https://webpack.js.org/concepts/hot-module-replacement/)
- [Vite HMR](https://vitejs.dev/guide/features.html#hot-module-replacement)

**口头回答版**：
> HMR 是一种在应用运行时替换、添加或删除模块，而无需刷新整个页面的技术。 - 页面不刷新，React/Vue 组件状态、表单数据、路由状态等不会丢失。 - 修改 CSS、组件代码后可立即看到效果，减少等待时间。 - 只替换变更的模块，避免全量重新编译和加载。

---

### FB-10-CO-B-005：什么是 Source Map？生产环境应该如何配置？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：10 构建工具
**标签**：Source Map、调试、构建产物、sourcemap
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Source Map 的作用，以及在生产环境中常见的配置策略有哪些。

**参考答案**：

Source Map 是一种映射文件，记录了构建产物（压缩、转译后的代码）与原始源代码之间的位置关系，便于在浏览器 DevTools 中调试。

常见 `devtool` 配置（Webpack）：

| 配置 | 说明 | 适用场景 |
|------|------|----------|
| `source-map` | 生成独立 .map 文件，质量高 | 生产环境，需外部托管 map |
| `hidden-source-map` | 生成 map 但不暴露引用 | 生产环境，不直接暴露给浏览器 |
| `eval-source-map` | 内联在 eval 中，速度快 | 开发环境 |
| `cheap-module-source-map` | 只映射行，不包含列 | 开发环境，平衡速度和质量 |
| `false` / `none` | 不生成 | 对调试无要求或敏感场景 |

生产环境策略：
- 通常不直接暴露 Source Map 到公网，避免源码泄露。
- 可上传 map 到错误监控平台（Sentry 等），发生错误时用于还原堆栈。
- 使用 `hidden-source-map` 或单独打包后由 CI 上传到内部服务器。

**评分维度**：
- 解释 Source Map 作用（40%）
- 说出至少 3 种常见配置（30%）
- 说明生产环境不直接暴露的原因（30%）

**常见错误**：
- 生产环境直接暴露完整 Source Map
- 认为 Source Map 会随产物一起加载影响性能

**延伸追问**：
- Source Map 的 `mappings` 字段是什么格式？
- 如何防止 Source Map 泄露源码？

**参考资源**：
- [Webpack devtool](https://webpack.js.org/configuration/devtool/)
- [Source Map 规范](https://sourcemaps.info/spec.html)

**口头回答版**：
> Source Map 是一种映射文件，记录了构建产物（压缩、转译后的代码）与原始源代码之间的位置关系，便于在浏览器 DevTools 中调试。 常见 devtool 配置（Webpack）： | 配置 | 说明 | 适用场景 | |------|------|----------|

---

### FB-10-CO-B-006：Babel 的作用是什么？preset 和 plugin 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Babel、 transpilation、AST、preset、plugin
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Babel 的主要作用，并解释 Babel 中 preset 和 plugin 的区别与关系。

**参考答案**：

Babel 是一个 JavaScript 编译器，主要作用：

1. **语法转换**：将 ES6+ 新语法转换为兼容目标环境的旧语法。
2. **Polyfill 注入**：通过 `@babel/polyfill` 或 `core-js` 补齐新 API。
3. **JSX/TypeScript 转换**：配合 `@babel/preset-react`、`@babel/preset-typescript` 使用。

preset 与 plugin 区别：

- **Plugin**：
  - 单一功能的转换插件，例如 `@babel/plugin-transform-arrow-functions`。
  - 按需求精确启用。

- **Preset**：
  - 一组 plugin 的集合，方便一次性配置常用转换。
  - 例如 `@babel/preset-env` 根据目标浏览器自动选择需要的 plugin。

执行顺序：
- Plugin 先于 Preset 执行。
- Plugin 按数组顺序执行；Preset 按数组逆序执行。

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

**评分维度**：
- 说明 Babel 主要作用（40%）
- 区分 preset 和 plugin（40%）
- 说明执行顺序（20%）

**常见错误**：
- 认为 Babel 只会转语法不会处理 API
- 混淆 plugin 和 preset 的执行顺序

**延伸追问**：
- `@babel/preset-env` 的 `useBuiltIns` 选项有什么区别？
- Babel 和 TypeScript 编译器 `tsc` 有什么区别？

**参考资源**：
- [Babel 官方文档](https://babeljs.io/docs/)
- [Babel Plugin/Preset](https://babeljs.io/docs/plugins)

**口头回答版**：
> Babel 是一个 JavaScript 编译器，主要作用： 语法转换：将 ES6+ 新语法转换为兼容目标环境的旧语法。 Polyfill 注入：通过 @babel/polyfill 或 core-js 补齐新 API。 JSX/TypeScript 转换：配合 @babel/preset-react、@babel/preset-typescript 使用。

---

### FB-10-CO-B-007：什么是 Polyfill？前端项目中常见的 Polyfill 方案有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Polyfill、core-js、Babel、兼容性、旧浏览器
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Polyfill 的概念，并列举前端项目中常见的 Polyfill 方案及其优缺点。

**参考答案**：

Polyfill 是一段代码，用于在旧浏览器或旧运行环境中补齐新 API 或语法能力，使代码能在目标环境正常运行。

常见方案：

1. **手动引入 polyfill 库**：
   - 例如 `core-js`、`whatwg-fetch`、`regenerator-runtime`。
   - 优点：简单直接；缺点：可能引入大量无用代码。

2. **`@babel/preset-env` + `useBuiltIns`**：
   - `entry`：根据目标环境在入口引入全部所需 polyfill。
   - `usage`：按代码实际使用情况自动注入 polyfill（推荐）。
   - 优点：按需注入；缺点：需要正确配置 browserslist。

3. **`@babel/plugin-transform-runtime`**：
   - 将辅助函数和 polyfill 转为运行时引用，避免重复注入。
   - 适合库开发，避免污染全局。

4. **Polyfill.io 等 CDN 服务**：
   - 根据 User-Agent 动态返回所需 polyfill。
   - 优点：极致按需；缺点：依赖外部服务可用性。

**评分维度**：
- 解释 Polyfill 概念（40%）
- 列举至少 3 种方案（30%）
- 能说明 entry/usage 区别（30%）

**常见错误**：
- 把 Polyfill 和语法转换混为一谈
- 认为所有项目都必须引入完整 core-js

**延伸追问**：
- `useBuiltIns: 'usage'` 是如何知道需要哪些 polyfill 的？
- 开发组件库时为什么常用 `@babel/plugin-transform-runtime`？

**参考资源**：
- [core-js](https://github.com/zloirock/core-js)
- [Babel useBuiltIns](https://babeljs.io/docs/babel-preset-env#usebuiltins)

**口头回答版**：
> Polyfill 是一段代码，用于在旧浏览器或旧运行环境中补齐新 API 或语法能力，使代码能在目标环境正常运行。 手动引入 polyfill 库： - 例如 core-js、whatwg-fetch、regenerator-runtime。 - 优点：简单直接；缺点：可能引入大量无用代码。

---

### FB-10-CO-B-008：前端构建中如何使用环境变量？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：环境变量、dotenv、DefinePlugin、Vite、Webpack
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
在前端项目中，如何区分开发环境和生产环境？请说明环境变量的常见使用方式。

**参考答案**：

前端项目中的环境变量通常在构建时被注入，运行时是静态替换的。

常见方式：

1. **Webpack `DefinePlugin`**：
   ```js
   new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('production'),
     'process.env.API_URL': JSON.stringify('https://api.example.com')
   })
   ```

2. **Vite `.env` 文件**：
   - `.env`、`.env.development`、`.env.production`。
   - 变量需以 `VITE_` 开头才能被客户端代码访问。
   - 通过 `import.meta.env.VITE_API_URL` 读取。

3. **`dotenv` + 构建脚本**：
   - 使用 `dotenv` 加载 `.env` 文件，再通过构建工具注入。

4. **CI/CD 注入**：
   - 在构建流水线中设置环境变量，构建时读取。

注意事项：
- 不要把敏感密钥直接写入前端代码，因为最终会被打包到客户端。
- 环境变量在构建后是静态字符串，无法运行时动态修改。

**评分维度**：
- 说出 2 种以上环境变量注入方式（40%）
- 能说明构建时替换的特点（30%）
- 提到安全注意事项（30%）

**常见错误**：
- 认为服务器端的环境变量前端可以直接读取
- 将密钥直接暴露在前端代码中

**延伸追问**：
- 如何在运行时切换不同环境的配置？
- 多环境（dev/test/staging/prod）如何管理环境变量？

**参考资源**：
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Webpack DefinePlugin](https://webpack.js.org/plugins/define-plugin/)

**口头回答版**：
> 前端项目中的环境变量通常在构建时被注入，运行时是静态替换的。 Webpack DefinePlugin： Vite .env 文件： - .env、.env.development、.env.production。

---

### FB-10-CO-B-009：什么是代码分割（Code Splitting）？有什么好处？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Code Splitting、懒加载、路由分割、性能优化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Code Splitting 的概念，并说明它在前端性能优化中的作用。

**参考答案**：

Code Splitting（代码分割）是将打包产物拆分成多个小块（chunk），按需加载或并行加载的技术。

主要好处：

1. **减少首屏加载时间**：
   - 只加载当前页面需要的代码，其他代码按需加载。

2. **提高缓存命中率**：
   - 拆分包后，未变更的 chunk 可长期缓存。

3. **按需加载**：
   - 结合动态 `import()` 实现路由级、组件级懒加载。

实现方式：

1. **入口分割（Entry Splitting）**：
   - 配置多个 entry，适合多页应用。

2. **动态导入（Dynamic Import）**：
   ```js
   const LazyComponent = React.lazy(() => import('./Component'));
   ```

3. **依赖分割（SplitChunks）**：
   - Webpack 的 `optimization.splitChunks` 将公共依赖提取到单独 chunk。

**评分维度**：
- 解释 Code Splitting 概念（40%）
- 说明首屏优化、缓存等好处（40%）
- 能举出动态导入示例（20%）

**常见错误**：
- 把 Code Splitting 和 Bundle Splitting 混为一谈
- 过度分割导致请求数过多

**延伸追问**：
- Code Splitting 和 Bundle Splitting 有什么区别？
- 动态导入后如何预加载？

**参考资源**：
- [Webpack Code Splitting](https://webpack.js.org/guides/code-splitting/)
- [React.lazy](https://react.dev/reference/react/lazy)

**口头回答版**：
> Code Splitting（代码分割）是将打包产物拆分成多个小块（chunk），按需加载或并行加载的技术。 - 只加载当前页面需要的代码，其他代码按需加载。 - 拆分包后，未变更的 chunk 可长期缓存。 - 结合动态 import() 实现路由级、组件级懒加载。

---

### FB-10-CO-B-010：构建工具中静态资源（图片、字体、CSS）通常如何处理？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Asset Handling、url-loader、file-loader、CSS、静态资源
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
在前端构建工具中，图片、字体、CSS 等静态资源通常是如何被处理的？请举例说明。

**参考答案**：

静态资源处理方式：

1. **图片/字体/媒体文件**：
   - Webpack 4 使用 `file-loader`（输出文件路径）和 `url-loader`（小图转 base64）。
   - Webpack 5 内置 `Asset Modules`（`asset/resource`、`asset/inline`、`asset/source`、`asset`）。
   - Vite 内置静态资源处理，支持 `?inline`、`?url`、`?raw` 等后缀。

2. **CSS**：
   - 开发时通过 `style-loader` 注入到 `<style>` 标签。
   - 生产时使用 `MiniCssExtractPlugin` 提取到独立 CSS 文件，利于缓存和并行加载。

3. **SVG**：
   - 可作为图片资源、URL 使用，也可通过 `@svgr/webpack` 转为 React 组件。

4. **资源路径**：
   - 构建后通常会有 hash 文件名，并替换源码中的引用路径。

```js
// Webpack 5 Asset Modules 示例
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 8 * 1024 }
        }
      }
    ]
  }
};
```

**评分维度**：
- 说出图片/CSS/字体处理方式（50%）
- 提到小资源内联 base64（25%）
- 提到生产环境提取 CSS（25%）

**常见错误**：
- 不知道 Webpack 5 已经内置 Asset Modules
- 认为所有静态资源都会被打包进 JS

**延伸追问**：
- 小图转 base64 的优缺点是什么？
- 如何给静态资源添加 CDN 前缀？

**参考资源**：
- [Webpack Asset Modules](https://webpack.js.org/guides/asset-modules/)
- [Vite Static Asset Handling](https://vitejs.dev/guide/assets.html)

**口头回答版**：
> 图片/字体/媒体文件： - Webpack 4 使用 file-loader（输出文件路径）和 url-loader（小图转 base64）。 - Webpack 5 内置 Asset Modules（asset/resource、asset/inline、asset/source、asset）。 - Vite 内置静态资源处理，支持 ?inline、?url、?raw 等后缀。

---

### FB-10-CO-B-011：Webpack 的 resolve 配置中 alias、extensions、modules 有什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Webpack、resolve、alias、extensions、模块解析
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Webpack 中 `resolve.alias`、`resolve.extensions`、`resolve.modules` 的作用，并给出常见配置示例。

**参考答案**：
`resolve` 配置控制 Webpack 如何查找和解析模块。

1. **`resolve.alias`**：配置路径别名，简化模块导入。
   ```js
   resolve: {
     alias: {
       '@': path.resolve(__dirname, 'src'),
       'components': path.resolve(__dirname, 'src/components')
     }
   }
   ```
   业务中可写 `import Button from '@/components/Button'`。

2. **`resolve.extensions`**：导入文件时自动补全的扩展名列表。
   ```js
   resolve: {
     extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
   }
   ```
   顺序很重要，越靠前越优先匹配。

3. **`resolve.modules`**：告诉 Webpack 去哪些目录找第三方模块，默认是 `['node_modules']`。
   ```js
   resolve: {
     modules: [path.resolve(__dirname, 'src'), 'node_modules']
   }
   ```

合理配置能减少相对路径、提升模块解析速度，并让代码更清晰。

**评分维度**：
- 准确说明 alias/extensions/modules 的作用（60%）
- 能给出常见配置示例（40%）

**常见错误**：
- 认为 alias 只影响源码写法，不影响构建解析
- 忽略 extensions 的匹配顺序，导致解析到错误文件

**延伸追问**：
- `resolve.mainFields` 在引入 npm 包时起什么作用？
- 大型项目如何优化模块解析性能？

**相关题目**：
- [FB-10-CO-B-002 什么是 Loader 和 Plugin](#FB-10-CO-B-002)
- [FB-10-CA-A-001 分析下面 Webpack 配置的作用与产物结构](#FB-10-CA-A-001)

**参考资源**：
- [Webpack Resolve](https://webpack.js.org/configuration/resolve/)

**口头回答版**：
> Webpack 的 resolve 配置主要是管模块怎么找。alias 用来配路径别名，比如 `@` 指向 `src`；extensions 是导入时自动补全扩展名，默认有 `.js` 等；modules 是告诉 Webpack 去哪找 `node_modules`。配好了能减少相对路径、提升解析效率。
---

### FB-10-CO-B-012：Vite 中 .env 环境文件的加载顺序和规则是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Vite、环境变量、env、mode、import.meta.env
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
Vite 项目中的 `.env`、`.env.local`、`.env.[mode]` 加载顺序是什么？哪些变量能被客户端代码访问？

**参考答案**：
Vite 使用 `dotenv` 加载环境文件，优先级从低到高依次为：

1. `.env`
2. `.env.local`
3. `.env.[mode]`（如 `.env.development`、`.env.production`）
4. `.env.[mode].local`

后加载的变量会覆盖前者。

- 只有以 `VITE_` 为前缀的变量才会被暴露到客户端代码，通过 `import.meta.env.VITE_XXX` 访问。
- `envPrefix` 可自定义前缀，默认值是 `VITE_`。
- `mode` 由启动命令决定，如 `vite dev` 默认是 `development`，`vite build` 默认是 `production`。
- 可以通过 `process.env.NODE_ENV` 类似的逻辑判断，但前端代码中应使用 `import.meta.env.DEV` / `PROD`。

```env
# .env.development
VITE_API_URL=https://api.dev.example.com
```

```js
console.log(import.meta.env.VITE_API_URL);
```

**评分维度**：
- 说明环境文件加载顺序与覆盖规则（50%）
- 说明 `VITE_` 前缀规则与访问方式（30%）
- 提及 mode 对文件选择的影响（20%）

**常见错误**：
- 认为 `.env.local` 优先级最低
- 认为所有环境变量客户端都能直接读取

**延伸追问**：
- 多环境（dev/test/staging/prod）如何管理环境变量？
- 如何在不暴露给客户端的前提下使用服务端环境变量？

**相关题目**：
- [FB-10-CO-B-008 前端构建中如何使用环境变量](#FB-10-CO-B-008)

**参考资源**：
- [Vite Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html)

**口头回答版**：
> Vite 会按 `.env`、`.env.local`、`.env.[mode]`、`.env.[mode].local` 的顺序加载，后面的覆盖前面的。客户端只能读到以 `VITE_` 开头的变量，通过 `import.meta.env` 访问。mode 决定加载哪个环境文件，比如 development 或 production。
---

### FB-10-CO-B-013：什么是 Browserslist？它在构建工具中起什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Browserslist、兼容性、Babel、Autoprefixer、core-js
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Browserslist 的概念，并说明它在前端构建工具链中如何影响构建结果。

**参考答案**：
Browserslist 是一个用于声明目标浏览器/Node 版本的配置工具，构建链中的多个工具会读取它来决定兼容性策略。

主要作用：

1. **Babel / SWC**：根据目标环境决定需要转换哪些 ES6+ 语法、注入哪些 polyfill。
2. **Autoprefixer**：根据目标浏览器添加必要的 CSS 前缀。
3. **postcss-preset-env**：决定 CSS 新特性是否需要降级。
4. **core-js / @babel/preset-env**：决定 polyfill 范围。
5. **esbuild / lightningcss** 等工具也会参考 browserslist 做语法/样式降级。

配置方式：

- 在 `package.json` 中写 `browserslist` 字段。
- 或创建 `.browserslistrc` 文件。

```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
```

配置越精确，构建产物越小、转译越少；配置过宽会增加产物体积。

**评分维度**：
- 解释 Browserslist 的核心作用（40%）
- 列举受其影响的构建工具（40%）
- 说明配置方式与取舍（20%）

**常见错误**：
- 认为 Browserslist 只对 Babel 生效
- 配置范围过宽导致产物膨胀

**延伸追问**：
- 如何针对中国大陆用户设置 Browserslist？
- `caniuse-lite` 数据过期会带来什么问题？

**相关题目**：
- [FB-10-CO-B-006 Babel 的作用是什么](#FB-10-CO-B-006)
- [FB-10-CO-B-007 什么是 Polyfill](#FB-10-CO-B-007)

**参考资源**：
- [Browserslist GitHub](https://github.com/browserslist/browserslist)

**口头回答版**：
> Browserslist 就是用来声明项目要兼容哪些浏览器和版本的。Babel、Autoprefixer、core-js 都会读它来决定转译哪些语法、加哪些前缀、注入哪些 polyfill。通常写在 `package.json` 或 `.browserslistrc` 里，比如 `last 2 versions`、`> 1%`。
---

### FB-10-CO-B-014：构建产物中的 hash、chunkhash、contenthash 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Webpack、hash、chunkhash、contenthash、长期缓存
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
Webpack 输出文件名中的 `[hash]`、`[chunkhash]`、`[contenthash]` 有什么区别？分别适合什么场景？

**参考答案**：
三种 hash 策略的区别在于计算范围和缓存稳定性：

| 占位符 | 计算范围 | 特点 | 适用场景 |
|--------|----------|------|----------|
| `[hash]` | 整个构建 | 任意文件改动，所有文件名都变 | 简单场景，不推荐长期使用 |
| `[chunkhash]` | 单个 chunk | chunk 内容变化才变，不同 chunk 独立 | 多入口或代码分割后的 JS chunk |
| `[contenthash]` | 单个文件内容 | 文件内容变化才变，粒度最细 | CSS/JS 分离、长期缓存 |

示例：

```js
output: {
  filename: '[name].[contenthash:8].js'
}
```

- 使用 `contenthash` 时，业务代码改动只影响对应的 JS 文件，CSS 文件不变则缓存继续生效。
- `chunkhash` 在 chunk 内部某个模块变化时，整个 chunk 的 hash 都会变化。
- `hash` 最保守，会导致所有资源缓存失效，一般只在无缓存要求的场景使用。

**评分维度**：
- 区分三种 hash 的计算范围与影响（60%）
- 说明对长期缓存的影响（40%）

**常见错误**：
- 认为 `chunkhash` 和 `contenthash` 完全相同
- 使用 `[hash]` 导致任意改动都使全部缓存失效

**延伸追问**：
- 为什么 `contenthash` 更适合与 `MiniCssExtractPlugin` 配合使用？
- `runtimeChunk` 单独提取对缓存有什么影响？

**相关题目**：
- [FB-10-CA-A-001 分析下面 Webpack 配置的作用与产物结构](#FB-10-CA-A-001)
- [FB-10-CO-A-005 Bundle Splitting 和 Code Splitting 有什么区别](#FB-10-CO-A-005)

**参考资源**：
- [Webpack Caching](https://webpack.js.org/guides/caching/)

**口头回答版**：
> Webpack 里 hash 有三种。`hash` 是整个构建共用的，任何文件改动所有文件名都变；`chunkhash` 是按 chunk 内容算的，一个 chunk 变只影响自己；`contenthash` 是按单个文件内容算的，最细粒度，CSS 和 JS 分离时常用它做长期缓存。
---

### FB-10-CD-B-001：手写一个 Babel Plugin，将 console.log 替换为 console.info

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Babel、Plugin、AST、console、手写实现
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请手写一个 Babel Plugin，将源代码中所有的 `console.log(...)` 调用替换为 `console.info(...)`。

**参考答案**：
Babel Plugin 是一个对象，内部通过 `visitor` 遍历 AST 节点。

```js
module.exports = function ({ types: t }) {
  return {
    name: 'console-log-to-info',
    visitor: {
      CallExpression(path) {
        const { callee } = path.node;
        if (
          t.isMemberExpression(callee) &&
          t.isIdentifier(callee.object, { name: 'console' }) &&
          t.isIdentifier(callee.property, { name: 'log' })
        ) {
          callee.property = t.identifier('info');
        }
      }
    }
  };
};
```

使用方式：

```js
// babel.config.js
module.exports = {
  plugins: ['./console-log-to-info.js']
};
```

关键点：

- 只匹配 `console.log`，不要误改其他 `console.xxx`。
- 通过 `@babel/types` 判断节点类型更安全。
- 如果要保留原属性位置信息，可用 `path.replaceWith` 重新生成调用表达式。

**评分维度**：
- 写出符合 Babel Plugin 结构的 visitor（40%）
- 正确判断 `console.log` 调用（30%）
- 准确替换为 `console.info`（30%）

**常见错误**：
- 直接字符串替换源码，而不是操作 AST
- 把所有 `console.*` 都替换掉

**延伸追问**：
- 如何只替换业务代码，不处理 `node_modules`？
- 如何在替换时给开发者输出一条警告信息？

**相关题目**：
- [FB-10-CO-B-006 Babel 的作用是什么](#FB-10-CO-B-006)
- [FB-10-CO-P-007 Babel 的编译流程是怎样的](#FB-10-CO-P-007)

**参考资源**：
- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

**口头回答版**：
> 手写 Babel 插件，核心是在 visitor 里访问 `CallExpression`。如果看到 callee 是 `console.log`，就把它改成 `console.info`。用 `@babel/types` 判断和生成节点更安全。
---

### FB-10-CA-B-001：分析下面 Webpack 配置中 noParse 和 alias 的作用

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Webpack、noParse、alias、性能优化、配置分析
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请分析以下 Webpack 配置中 `module.noParse` 和 `resolve.alias` 的作用及适用场景。

```js
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'utils': path.resolve(__dirname, 'src/utils')
    }
  },
  module: {
    noParse: /jquery|lodash/
  }
};
```

**参考答案**：
1. **`resolve.alias`**：路径别名。
   - `@` 指向 `src` 目录，`utils` 指向 `src/utils`。
   - 业务代码可以写 `import foo from '@/utils/foo'`，避免大量 `../../../` 相对路径。
   - 只在构建期生效，运行时代码已经被替换为真实路径。

2. **`module.noParse`**：告诉 Webpack 哪些文件不需要解析内部依赖。
   - 示例中的 `jquery`、`lodash` 通常是独立的完整库，内部没有 `import` / `require` 其他模块。
   - 跳过解析可以显著减少构建时间，尤其适合体积大且无依赖的库。

注意：

- `noParse` 不会跳过 Loader 处理，只是跳过 AST 解析依赖。
- 如果库内部有模块化依赖，使用 `noParse` 会导致运行时错误。
- 可配合 `resolve.alias` 进一步简化导入路径。

**评分维度**：
- 正确解释 `noParse` 的作用与收益（50%）
- 正确解释 `alias` 的作用（30%）
- 指出适用范围与注意事项（20%）

**常见错误**：
- 认为 `noParse` 会跳过 Loader 处理
- 认为 `alias` 在运行时也能生效

**延伸追问**：
- `noParse` 与 `externals` 有什么区别？
- `alias` 如何与 TypeScript 的 `paths` 配置配合使用？

**相关题目**：
- [FB-10-CO-B-011 Webpack 的 resolve 配置](#FB-10-CO-B-011)
- [FB-10-CO-A-001 请描述 Webpack 的完整构建流程](#FB-10-CO-A-001)

**参考资源**：
- [Webpack noParse](https://webpack.js.org/configuration/module/#modulenoparse)

**口头回答版**：
> `noParse` 是告诉 Webpack 哪些模块不需要解析内部依赖，比如 jQuery 没有 import，可以直接打包，省解析时间。`alias` 是路径别名，简化导入路径。它们都不会改变代码逻辑，只是构建期的配置。
---

### FB-10-EN-B-001：前端项目如何根据环境选择不同的构建配置？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：环境配置、Webpack、Vite、构建配置、工程化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
前端项目通常需要区分开发、测试、生产等环境。请列举常见的根据环境选择构建配置的做法。

**参考答案**：
常见做法：

1. **多套配置文件 + 合并公共配置**
   ```
   webpack.config.base.js
   webpack.config.dev.js
   webpack.config.prod.js
   ```
   使用 `webpack-merge` 合并基础配置和环境配置。

2. **单一配置根据环境变量分支**
   ```js
   module.exports = (env, argv) => {
     const isProd = argv.mode === 'production';
     return { /* ... */ };
   };
   ```

3. **Vite 的 mode 与 `defineConfig`**
   ```js
   export default defineConfig(({ mode }) => ({
     build: mode === 'production' ? { /* ... */ } : { /* ... */ }
   }));
   ```

4. **`.env` 文件 + 构建脚本注入**
   - Vite 自动按 mode 加载 `.env.[mode]`。
   - Webpack 可通过 `DefinePlugin` / `dotenv` 注入。

5. **CI/CD 环境变量**
   - 在流水线中设置 `NODE_ENV`、`API_URL` 等变量，构建时读取。

建议：

- 公共配置只写一份，环境差异尽量收敛到少量参数。
- 避免完全复制多份配置，导致维护困难。

**评分维度**：
- 列举至少 3 种环境配置做法（60%）
- 说明公共配置与环境配置的合并策略（40%）

**常见错误**：
- 把环境判断只写在业务代码里，构建配置没有区分
- 多套配置完全复制，重复内容过多

**延伸追问**：
- 如何优雅地合并公共配置并允许项目覆盖？
- 本地 mock 接口与生产 API 如何平滑切换？

**相关题目**：
- [FB-10-CO-B-008 前端构建中如何使用环境变量](#FB-10-CO-B-008)
- [FB-10-EN-A-001 如何设计前端构建的缓存策略](#FB-10-EN-A-001)

**参考资源**：
- [webpack-merge](https://github.com/survivejs/webpack-merge)
- [Vite Config](https://vitejs.dev/config/)

**口头回答版**：
> 常见做法有几种：写多套 webpack 配置然后用 webpack-merge 合并公共部分；在单一配置里根据 process.env.NODE_ENV 判断；Vite 可以用 defineConfig 和 mode 区分；还可以通过 .env 文件或 CI 注入变量。
---

### FB-10-PE-B-001：构建产物体积过大时有哪些基础排查方法？

**题型**：性能优化题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：构建产物、体积优化、Bundle Analyzer、排查、性能
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
当构建产物体积过大时，有哪些基础的排查思路和工具可以帮助定位问题？

**参考答案**：
基础排查思路：

1. **可视化分析工具**
   - `webpack-bundle-analyzer`：查看各模块占用空间。
   - `rollup-plugin-visualizer` / `vite-bundle-visualizer`：Rollup/Vite 项目可用。
   - `source-map-explorer`：基于 source map 分析产物组成。

2. **检查大依赖**
   - 定位体积异常大的第三方库，判断是否全量引入。
   - 例如 `moment`、`lodash` 全量引入会显著增加体积。

3. **检查重复依赖**
   - 多个包依赖不同版本的同一库，会打包多份。
   - 可用 `npm ls <pkg>` 或 `depcheck` 辅助发现。

4. **分析入口包**
   - 关注首屏加载的 initial chunk，确认是否包含非必要代码。

5. **关注 gzip / brotli 后体积**
   - 传输体积通常比磁盘体积小很多，避免被未压缩体积吓到。

排查后，再有针对性地做 Tree Shaking、按需加载、替换库或代码分割。

**评分维度**：
- 说出至少 2 种可视化分析工具（40%）
- 说明大依赖、重复依赖等排查方向（40%）
- 提到 gzip/brotli 后的真实传输体积（20%）

**常见错误**：
- 不分析直接开始做代码分割
- 只看未压缩体积，误判优化收益

**延伸追问**：
- 如何确认某个依赖是否被 Tree Shaking？
- 如何在 CI 中设置构建产物体积预算？

**相关题目**：
- [FB-10-PE-A-001 如何优化 Webpack 构建速度](#FB-10-PE-A-001)
- [FB-10-PE-A-002 如何分析并优化前端打包体积](#FB-10-PE-A-002)

**参考资源**：
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

**口头回答版**：
> 先用可视化工具看看包里到底有什么，比如 webpack-bundle-analyzer。重点关注大依赖、重复包、没 tree-shaking 的部分。还可以用 source-map-explorer 分析。确认问题后再做代码分割或换库，不要凭感觉。

---

## 进阶题（19 道）{#advanced}

### FB-10-CO-A-001：请描述 Webpack 的完整构建流程。

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、构建流程、Compiler、Compilation、生命周期
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述 Webpack 从读取配置到输出产物的主要构建流程，并说明 Compiler 和 Compilation 的作用。

**参考答案**：

Webpack 构建流程大致分为以下阶段：

1. **初始化参数**：
   - 合并命令行参数、配置文件和默认配置，得到最终配置。

2. **创建 Compiler**：
   - `Compiler` 是 Webpack 的核心实例，负责控制整个构建生命周期。
   - 注册所有配置的 Plugin。

3. **开始编译（run）**：
   - 触发 `run`、`compile` 等 hook。

4. **创建 Compilation**：
   - `Compilation` 负责一次具体的编译过程，包含模块、依赖、chunk、assets 等信息。
   - 触发 `make` hook，从 entry 开始递归构建模块依赖图。

5. **模块解析与加载**：
   - 使用 `loader-runner` 执行匹配到的 Loader 转换模块源码。
   - 使用 `enhanced-resolve` 解析模块路径。

6. **依赖解析**：
   - 通过 Parser（如 acorn）分析模块依赖，递归处理直到无新依赖。

7. ** Seal（封装）**：
   - 根据模块依赖图生成 chunk，优化模块顺序，生成最终代码。

8. **输出产物**：
   - 调用 `emit` hook，Plugin 可在此时修改 assets。
   - 将 chunk 写入输出目录。

9. **完成编译**：
   - 触发 `done` hook。

**评分维度**：
- 说出主要阶段（40%）
- 区分 Compiler 和 Compilation（30%）
- 提到 Loader 解析和 Plugin hooks（30%）

**常见错误**：
- 把 Compiler 和 Compilation 混为一谈
- 忽略 Seal 阶段的重要性

**延伸追问**：
- 在 `emit` 阶段可以做什么优化？
- Webpack 的 watch 模式是如何复用 Compilation 的？

**参考资源**：
- [Webpack Compiler Hooks](https://webpack.js.org/api/compiler-hooks/)
- [Webpack Compilation Hooks](https://webpack.js.org/api/compilation-hooks/)

**口头回答版**：
> Webpack 构建流程大致分为以下阶段： - 合并命令行参数、配置文件和默认配置，得到最终配置。 创建 Compiler： - Compiler 是 Webpack 的核心实例，负责控制整个构建生命周期。

---

### FB-10-CO-A-002：Vite 为什么快？开发环境和生产环境构建有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Vite、ESM、预构建、Rollup、构建速度
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Vite 开发环境启动快的原因，并对比 Vite 在开发环境和生产环境的构建方式差异。

**参考答案**：

Vite 快的原因：

1. **开发环境基于原生 ESM**：
   - 不对源码进行打包，浏览器直接按 `import` 请求模块。
   - 启动时间只与入口文件数量有关，而非项目总模块数。

2. **按需编译**：
   - 只有浏览器请求到的模块才会被 Vite 编译转换，冷启动极快。

3. **依赖预构建（Pre-bundle）**：
   - 使用 esbuild 将 CommonJS 依赖转为 ESM，减少请求数。
   - esbuild 使用 Go 编写，速度远超 JavaScript 构建工具。

4. **HMR 速度快**：
   - 更新时只需让浏览器重新请求变更模块，无需重新打包整个 bundle。

开发 vs 生产：

| 维度 | 开发环境 | 生产环境 |
|------|----------|----------|
| 打包方式 | 不打包，原生 ESM | 使用 Rollup 打包 |
| 依赖处理 | esbuild 预构建 | Rollup 处理 |
| 产物优化 | 较少优化 | Tree Shaking、压缩、代码分割 |
| HMR | 支持 | 不涉及 |
| Source Map | 默认开启 | 可配置 |

**评分维度**：
- 解释 ESM 按需加载优势（30%）
- 说明 esbuild 预构建作用（30%）
- 对比开发与生产构建差异（40%）

**常见错误**：
- 认为 Vite 生产环境也使用 esbuild 打包
- 忽略 CommonJS 依赖需要预构建

**延伸追问**：
- 为什么生产环境还要用 Rollup 而不是 esbuild？
- 预构建后的依赖存在哪里？如何失效？

**相关题目**：
- [FB-10-CO-P-006 Vite 预构建原理](#FB-10-CO-P-006)

**参考资源**：
- [Vite 为什么快](https://vitejs.dev/guide/why.html)
- [Vite 预构建](https://vitejs.dev/guide/dep-pre-bundling.html)

**口头回答版**：
> Vite 快的原因： 开发环境基于原生 ESM： - 不对源码进行打包，浏览器直接按 import 请求模块。 - 启动时间只与入口文件数量有关，而非项目总模块数。

---

### FB-10-CO-A-003：Rollup 适合什么场景？与 Webpack 如何选型？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Rollup、Library、Tree Shaking、ES Module、Webpack
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Rollup 的优缺点和适用场景，并与 Webpack 做对比，说明如何选型。

**参考答案**：

Rollup 的特点：

1. **基于 ES Module**：
   - Tree Shaking 更彻底，产物干净无额外 runtime。

2. **输出格式多样**：
   - 支持 ESM、CJS、UMD、IIFE、AMD、SystemJS 等格式，适合库开发。

3. **配置相对简单**：
   - 默认行为更适合打包 JavaScript 库。

4. **生态相对小**：
   - 对 HMR、代码分割、静态资源的支持不如 Webpack 完善。

适用场景：
- 组件库、工具库、SDK 打包。
- 需要输出多种模块格式的场景。

Webpack vs Rollup：

| 维度 | Webpack | Rollup |
|------|---------|--------|
| 适用场景 | 大型应用 | JavaScript 库 |
| 产物 | 含 runtime，较大 | 干净，体积小 |
| Tree Shaking | 强 | 更强 |
| HMR | 成熟 | 较弱 |
| 资源处理 | 完善 | 较弱 |
| 代码分割 | 强 | 一般 |

选型建议：
- 前端应用：Webpack / Vite / Rspack
- 工具库/组件库：Rollup / tsup / vite-plugin-dlb

**评分维度**：
- 说明 Rollup 优势（40%）
- 说明适用场景（30%）
- 能与 Webpack 做对比选型（30%）

**常见错误**：
- 认为 Rollup 可以替代 Webpack 做大型应用
- 忽略 Rollup 对 CommonJS 的处理需要插件

**延伸追问**：
- Rollup 如何处理 CommonJS 依赖？
- 为什么组件库常用 Rollup 而不是 Webpack？

**参考资源**：
- [Rollup Guide](https://rollupjs.org/guide/en/)
- [Webpack vs Rollup](https://webpack.js.org/comparison/)

**口头回答版**：
> Rollup 的特点： 基于 ES Module： - Tree Shaking 更彻底，产物干净无额外 runtime。 - 支持 ESM、CJS、UMD、IIFE、AMD、SystemJS 等格式，适合库开发。

---

### FB-10-CD-A-001：手写一个最简单的 Webpack Loader，将文件内容转为大写。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、Loader、手写实现、AST
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请手写一个 Webpack Loader，功能是将加载到的文件内容全部转为大写，并返回 JavaScript 模块代码。

**参考答案**：

Loader 是一个函数，接收源码字符串（或 Buffer）作为输入，返回转换后的字符串（或 Buffer）。

```js
// upper-case-loader.js
module.exports = function(source) {
  // this 是 loaderContext，提供异步、选项查询等能力
  const options = this.getOptions ? this.getOptions() : {};
  
  const upperSource = source.toUpperCase();
  
  // 返回可被 JS 模块引用的字符串
  return `module.exports = ${JSON.stringify(upperSource)};`;
};
```

配置使用：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: [
          {
            loader: path.resolve(__dirname, './upper-case-loader.js')
          }
        ]
      }
    ]
  }
};
```

进阶：使用 `this.callback` 返回 Source Map：

```js
module.exports = function(source) {
  const callback = this.async();
  const upperSource = source.toUpperCase();
  callback(null, `module.exports = ${JSON.stringify(upperSource)};`, sourceMap);
};
```

**评分维度**：
- 写出符合 Loader 签名的函数（40%）
- 正确返回 JS 模块代码（30%）
- 提到 `this.async` 或 source map（30%）

**常见错误**：
- 直接返回转换后的字符串而不是 module.exports
- 忽略 Loader 需要是 CommonJS 模块

**延伸追问**：
- 多个 Loader 如何链式传递结果？
- Pitching Loader 是什么？

**参考资源**：
- [Writing a Loader](https://webpack.js.org/contribute/writing-a-loader/)

**口头回答版**：
> Loader 是一个函数，接收源码字符串（或 Buffer）作为输入，返回转换后的字符串（或 Buffer）。 进阶：使用 this.callback 返回 Source Map：

---

### FB-10-CA-A-001：分析下面 Webpack 配置的作用与产物结构。

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、配置分析、output、chunk、产物结构
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

请分析该配置的作用，以及构建产物大概有哪些文件。

**参考答案**：

配置分析：

1. **entry**：
   - 有两个入口：`main` 和 `vendor`。

2. **output.filename**：
   - 使用 `[name].[contenthash:8].js`，输出文件名包含入口名和基于内容的前 8 位 hash。

3. **output.clean**：
   - 每次构建前清理 `dist` 目录。

4. **optimization.splitChunks**：
   - `chunks: 'all'` 对所有类型的 chunk 进行代码分割。
   - `cacheGroups.vendor` 将 `node_modules` 中的依赖提取到 `vendors` chunk。

产物结构大概：

```
dist/
  main.xxxxxx.js      # main 入口业务代码
  vendor.yyyyyy.js    # vendor 入口业务代码
  vendors.zzzzzz.js   # node_modules 公共依赖
  runtime.aaaaaa.js   # Webpack runtime（如果配置了 runtimeChunk）
```

注意：示例中未配置 `runtimeChunk`，所以 runtime 会内联到各自 chunk 中。

**评分维度**：
- 正确分析 entry/output 作用（30%）
- 理解 contenthash 的意义（30%）
- 分析 splitChunks 产物（40%）

**常见错误**：
- 认为 `vendor` 入口和 `vendors` chunk 是同一个文件
- 不理解 contenthash 和 chunkhash 的区别

**延伸追问**：
- `contenthash`、`chunkhash`、`hash` 有什么区别？
- 为什么要将 runtime 单独提取？

**相关题目**：
- [FB-10-CO-A-005 Bundle Splitting 与 Code Splitting 的区别](#FB-10-CO-A-005)

**参考资源**：
- [Webpack Output](https://webpack.js.org/configuration/output/)
- [Webpack SplitChunks](https://webpack.js.org/plugins/split-chunks-plugin/)

**口头回答版**：
> - 有两个入口：main 和 vendor。 output.filename： - 使用 [name].[contenthash:8].js，输出文件名包含入口名和基于内容的前 8 位 hash。 output.clean：

---

### FB-10-CO-A-005：Bundle Splitting 和 Code Splitting 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Bundle Splitting、Code Splitting、Chunk、性能优化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Bundle Splitting 和 Code Splitting 的区别，并说明各自的典型使用场景。

**参考答案**：

两者都是将产物拆小以优化加载，但侧重点不同：

- **Code Splitting（代码分割）**：
  - 将应用代码按路由、组件、功能拆分为多个 chunk，按需加载。
  - 典型方式：动态 `import()`、React.lazy、Vue 异步组件。
  - 目的：减少首屏加载代码量。

- **Bundle Splitting（包分割）**：
  - 将同一个 bundle 中的代码按维度拆分成多个并行加载的 chunk。
  - 典型方式：`splitChunks` 提取公共依赖、分离 runtime/manifest/vendor。
  - 目的：提高缓存命中率、并行加载、避免重复打包。

关系：
- Code Splitting 关注"什么时候加载什么代码"。
- Bundle Splitting 关注"如何组织 chunk 让加载更高效"。

**评分维度**：
- 区分 Code Splitting 和 Bundle Splitting 概念（50%）
- 各举出典型实现方式（30%）
- 说明两者目的差异（20%）

**常见错误**：
- 将两者完全等同
- 只说出动态导入，忽略 splitChunks

**延伸追问**：
- 如何平衡 chunk 数量和单个 chunk 大小？
- Webpack 的 splitChunks 默认策略是什么？

**参考资源**：
- [Webpack Code Splitting](https://webpack.js.org/guides/code-splitting/)

**口头回答版**：
> 两者都是将产物拆小以优化加载，但侧重点不同： - Code Splitting（代码分割）： - 将应用代码按路由、组件、功能拆分为多个 chunk，按需加载。 - 典型方式：动态 import()、React.lazy、Vue 异步组件。

---

### FB-10-PE-A-001：如何优化 Webpack 构建速度？请列举至少 5 种方法。

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、构建优化、缓存、并行、构建速度
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
在大型前端项目中，Webpack 构建速度可能变得很慢。请列举常见的构建速度优化方法。

**参考答案**：

常见优化方法：

1. **使用最新版本 Webpack/Node.js**：
   - 新版本通常有性能改进，持久化缓存等功能。

2. **开启持久化缓存（Persistent Caching）**：
   ```js
   cache: { type: 'filesystem' }
   ```

3. **缩小 Loader 作用范围**：
   - 使用 `include` / `exclude` 限制 babel-loader 处理的文件范围。

4. **使用多线程/并行构建**：
   - `thread-loader` 将耗时的 Loader 放到 worker 池中执行。
   - `parallel-webpack`、`esbuild-loader` 等。

5. **减少不必要的解析**：
   - `resolve.modules`、`resolve.alias`、`resolve.extensions` 合理配置。
   - 使用 `noParse` 跳过无需解析的库。

6. **使用更快的替代工具**：
   - `esbuild-loader`、`swc-loader` 替代 `babel-loader` 进行部分转换。
   - `mini-css-extract-plugin` 替代 `style-loader` 生产环境。

7. **DLL / SplitChunks**：
   - 预编译不常变动的第三方依赖。

8. **减少 Source Map 精度**：
   - 开发环境使用 `cheap-module-source-map`。

9. **Tree Shaking 和 SideEffects**：
   - 减少参与打包的模块数。

**评分维度**：
- 列举至少 5 种优化方法（50%）
- 说明每种方法的原理（30%）
- 能结合项目场景说明优先级（20%）

**常见错误**：
- 只堆砌方法，不说明原理
- 滥用 thread-loader（小项目反而更慢）

**延伸追问**：
- 持久化缓存失效的场景有哪些？
- 如何分析 Webpack 构建耗时瓶颈？

**参考资源**：
- [Webpack Build Performance](https://webpack.js.org/guides/build-performance/)
- [Webpack Cache](https://webpack.js.org/configuration/cache/)

**口头回答版**：
> 使用最新版本 Webpack/Node.js： - 新版本通常有性能改进，持久化缓存等功能。 开启持久化缓存（Persistent Caching）： 缩小 Loader 作用范围：

---

### FB-10-PE-A-002：如何分析并优化前端打包体积？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：打包体积、Bundle Analyzer、Tree Shaking、依赖优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何分析前端打包产物体积，并给出常见的体积优化手段。

**参考答案**：

分析方法：

1. **可视化分析工具**：
   - `webpack-bundle-analyzer`：交互式查看各 chunk 和依赖体积。
   - `rollup-plugin-visualizer`：Rollup/Vite 项目使用。
   - `source-map-explorer`：基于 Source Map 分析。

2. **构建日志**：
   - Webpack `stats` 配置输出各模块大小。
   - 关注 `performance.hints` 的警告。

优化手段：

1. **Tree Shaking**：
   - 确保使用 ESM，配置 `sideEffects`。

2. **按需加载**：
   - 路由懒加载、组件懒加载、动态 `import()`。

3. **按需引入库**：
   - 使用 `lodash-es` 替代 `lodash`；使用 `antd` / `element-plus` 的按需引入。

4. **替换大型依赖**：
   - 用 `dayjs` 替代 `moment`；用 `zod`/`valibot` 替代 `yup` 等。

5. **Gzip/Brotli 压缩**：
   - 服务器开启压缩，减少传输体积。

6. **代码分割**：
   - `splitChunks` 提取公共依赖。

7. **移除无用代码和重复依赖**：
   - 使用 `depcheck` 检查未使用依赖。
   - 统一依赖版本，避免多版本共存。

**评分维度**：
- 说出至少 2 种分析工具（30%）
- 列举至少 4 种优化手段（40%）
- 能说明如何验证优化效果（30%）

**常见错误**：
- 只看未压缩体积，忽略 Gzip 后体积
- 过度优化导致 chunk 数过多

**延伸追问**：
- 如何发现项目中重复依赖的不同版本？
- 如果一个库不支持 Tree Shaking，怎么办？

**参考资源**：
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)

**口头回答版**：
> - webpack-bundle-analyzer：交互式查看各 chunk 和依赖体积。 - rollup-plugin-visualizer：Rollup/Vite 项目使用。 - source-map-explorer：基于 Source Map 分析。 - Webpack stats 配置输出各模块大小。

---

### FB-10-CO-A-006：esbuild、SWC、Rspack 是什么？为什么比传统工具快？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：esbuild、SWC、Rspack、Rust、Go、编译速度
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 esbuild、SWC、Rspack 这三种下一代构建工具/编译器，并说明它们为什么比 Webpack/Babel 快。

**参考答案**：

1. **esbuild**：
   - 使用 Go 语言编写，是极快的打包器和压缩器。
   - Vite 开发环境用它做依赖预构建。
   - 支持 TypeScript、JSX 等，但产物和生态不如 Webpack/Rollup 完善。

2. **SWC**：
   - 使用 Rust 编写的 JavaScript/TypeScript 编译器。
   - 可作为 Babel 的替代品，支持转译和压缩。
   - Next.js、Parcel、Vite 等工具内部使用。

3. **Rspack**：
   - 字节跳动开源，使用 Rust 编写，兼容 Webpack 生态。
   - 目标是在保持 Webpack 配置兼容的前提下大幅提升构建速度。

为什么快：

1. **使用系统级语言**：
   - Go/Rust 编译为机器码，执行效率远高于 JavaScript。

2. **并行化**：
   - 充分利用多核 CPU，模块解析、转换、压缩都可以并行。

3. **单次遍历 AST**：
   - 传统工具（Babel + Terser）需要多次解析和序列化 AST；esbuild/SWC 尽量在一次遍历中完成更多工作。

4. **更简单的架构**：
   - 为了速度牺牲部分灵活性和生态成熟度。

**评分维度**：
- 介绍三种工具的定位（40%）
- 说明使用语言（Go/Rust）（20%）
- 解释为什么更快（40%）

**常见错误**：
- 认为 esbuild 可以完全替代 Webpack 的所有场景
- 混淆 SWC 和 Rspack 的定位

**延伸追问**：
- 在现有 Webpack 项目中如何渐进式接入 esbuild/SWC？
- Rspack 和 Webpack 的兼容性如何？

**参考资源**：
- [esbuild](https://esbuild.github.io/)
- [SWC](https://swc.rs/)
- [Rspack](https://www.rspack.dev/)

**口头回答版**：
> - 使用 Go 语言编写，是极快的打包器和压缩器。 - Vite 开发环境用它做依赖预构建。 - 支持 TypeScript、JSX 等，但产物和生态不如 Webpack/Rollup 完善。 - 使用 Rust 编写的 JavaScript/TypeScript 编译器。

---

### FB-10-EN-A-001：如何设计前端构建的缓存策略？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：缓存策略、持久化缓存、CDN、Long Term Cache、构建缓存
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请从前端构建产物缓存和构建过程缓存两个角度，说明如何设计有效的缓存策略。

**参考答案**：

一、构建过程缓存：

1. **Webpack 持久化缓存**：
   ```js
   cache: {
     type: 'filesystem',
     buildDependencies: { config: [__filename] }
   }
   ```

2. **CI 缓存**：
   - 缓存 `node_modules`、`./node_modules/.cache`、`.turbo`、`.nx` 等目录。

3. **Loader 缓存**：
   - 使用 `cache-loader`（Webpack 4）或工具内置缓存（Babel、eslint）。

二、产物长期缓存（Long Term Caching）：

1. **文件名带 hash**：
   - `[contenthash]` / `[chunkhash]`，内容变化才变化。

2. **分离 runtime/manifest**：
   - 避免入口文件频繁变化导致整个 chunk 缓存失效。

3. **稳定 module id / chunk id**：
   - Webpack 5 默认 `deterministic`，避免新增模块导致大量 hash 变化。

4. **CDN 缓存**：
   - 静态资源配置长期缓存头（如 `Cache-Control: max-age=31536000, immutable`）。
   - HTML 文件不缓存或短缓存。

5. **SplitChunks**：
   - 公共依赖单独成 chunk，业务代码变更不影响依赖缓存。

**评分维度**：
- 说出构建过程缓存方法（40%）
- 说出产物长期缓存方法（40%）
- 提到 CDN 和 HTML 缓存策略差异（20%）

**常见错误**：
- 只关注构建缓存，忽略产物缓存
- HTML 文件也配置长期缓存导致更新不生效

**延伸追问**：
- 缓存失效后如何确保用户获取最新版本？
- Webpack 5 持久化缓存什么情况下会失效？

**参考资源**：
- [Webpack Caching](https://webpack.js.org/guides/caching/)
- [Webpack Cache 配置](https://webpack.js.org/configuration/cache/)

**口头回答版**：
> Webpack 持久化缓存： - 缓存 node_modules、./node_modules/.cache、.turbo、.nx 等目录。 Loader 缓存： - 使用 cache-loader（Webpack 4）或工具内置缓存（Babel、eslint）。

---

### FB-10-CO-A-007：Webpack optimization 中 usedExports、sideEffects、minimize 如何配合 Tree Shaking？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、Tree Shaking、usedExports、sideEffects、minimize
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Webpack `optimization` 中 `usedExports`、`sideEffects`、`minimize` 各自的作用，以及它们如何协同完成 Tree Shaking。

**参考答案**：
三个配置在 Tree Shaking 中分工协作：

1. **`optimization.usedExports`**
   - 标记哪些模块导出被使用，哪些没有被使用。
   - 生成注释 `/* unused harmony export foo */`。

2. **`optimization.sideEffects`**
   - 告诉 Webpack 哪些模块是“无副作用”的，可以安全删除整模块。
   - 读取 `package.json` 的 `sideEffects` 字段，或配置为 `false` / 数组。

3. **`optimization.minimize`**
   - 使用 Terser 等压缩工具删除被标记为未使用的代码。
   - 负责真正的死代码消除（DCE）。

协同流程：

- `usedExports` 先标记未使用导出。
- `sideEffects` 判断整个模块是否可以安全移除。
- `minimize` 最终删除死代码，减小产物体积。

```js
optimization: {
  usedExports: true,
  sideEffects: true,
  minimize: true
}
```

注意：`sideEffects` 配置错误可能导致把有副作用的代码误删。

**评分维度**：
- 解释三个配置的作用（60%）
- 说明协同流程（40%）

**常见错误**：
- 认为 `minimize` 单独完成所有 Tree Shaking
- `sideEffects` 配置错误导致误删有副作用的模块

**延伸追问**：
- 如何判断 `sideEffects` 配置是否正确？
- Webpack 与 Rollup 的 Tree Shaking 有何差异？

**相关题目**：
- [FB-10-CO-B-003 什么是 Tree Shaking](#FB-10-CO-B-003)
- [FB-10-CO-P-002 Tree Shaking 的底层原理是什么](#FB-10-CO-P-002)

**参考资源**：
- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

**口头回答版**：
> `usedExports` 负责标记哪些导出被用了；`sideEffects` 告诉 Webpack 模块有没有副作用，可以放心删；`minimize` 用 Terser 最终去掉死代码。三者配合：先标记、再判断安全、最后删除。
---

### FB-10-CO-A-008：Vite 的插件机制与 Rollup 插件有什么关系？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Vite、Rollup、插件机制、兼容性、构建工具
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
Vite 的插件 API 与 Rollup 插件 API 是什么关系？Vite 插件有哪些 Rollup 没有的扩展能力？

**参考答案**：
关系：

- Vite 插件接口在设计上**完全兼容 Rollup 插件 API**。
- 大部分 Rollup 插件可以直接在 Vite 中使用。
- Vite 生产构建底层使用 Rollup，因此 Rollup 钩子在 build 阶段生效。

Vite 特有扩展：

1. **开发服务器钩子**
   - `configureServer`：扩展 dev server。
   - `configurePreviewServer`：扩展 preview server。

2. **HMR 相关**
   - `handleHotUpdate`：自定义 HMR 更新处理。

3. **HTML 处理**
   - `transformIndexHtml`：转换入口 HTML。

4. **插件顺序与作用范围**
   - `enforce`: `'pre'` / `'post'` 控制插件顺序。
   - `apply`: `'build'` / `'serve'` 限定只在构建或开发时生效。

示例：

```js
export default function myVitePlugin() {
  return {
    name: 'my-plugin',
    enforce: 'pre',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => { /* ... */ next(); });
    }
  };
}
```

因此，Vite 插件是 Rollup 插件的超集。

**评分维度**：
- 说明 Vite 与 Rollup 插件的兼容关系（40%）
- 列举 Vite 特有钩子或属性（40%）
- 说明 `enforce` / `apply` 的作用（20%）

**常见错误**：
- 认为 Vite 插件和 Rollup 插件完全不同
- 忽略插件顺序和作用范围导致结果不符合预期

**延伸追问**：
- 如何编写一个只在开发环境生效的 Vite 插件？
- Vite 插件的加载顺序是如何确定的？

**相关题目**：
- [FB-10-CO-A-002 Vite 为什么快](#FB-10-CO-A-002)
- [FB-10-CO-P-006 Vite 的依赖预构建原理](#FB-10-CO-P-006)

**参考资源**：
- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)

**口头回答版**：
> Vite 插件接口基本兼容 Rollup，所以大部分 Rollup 插件可以直接在 Vite 里用。Vite 自己又加了开发服务器相关的钩子，比如 `configureServer`、`handleHotUpdate`，还有 `enforce` 控制插件顺序、`apply` 限定只在 build 或 serve 生效。
---

### FB-10-CO-A-009：什么是 CSS Modules？构建工具如何处理它？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：CSS Modules、作用域、构建工具、Webpack、Vite
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CSS Modules 的作用，并说明 Webpack 和 Vite 分别是如何处理它的。

**参考答案**：
CSS Modules 是一种将 CSS 类名局部化的技术，通过构建工具把类名转换为唯一的哈希名，避免全局命名冲突。

核心特点：

- 每个类名只在当前模块生效。
- 导入后得到一个 JavaScript 对象，映射原始类名到实际类名。
- 配合 `:global(...)` 可声明全局类名。

Webpack 处理：

```js
{
  test: /\.module\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: { modules: true }
    }
  ]
}
```

Vite 处理：

- 默认将以 `.module.css` 结尾的文件视为 CSS Modules，无需额外配置。

```js
import styles from './Button.module.css';
<button className={styles.primary}>Click</button>
```

产物中 `.primary` 会被替换为类似 `.Button_primary__3x7a` 的唯一名。

**评分维度**：
- 解释 CSS Modules 局部化作用（40%）
- 说明 Webpack 配置方式（30%）
- 说明 Vite 默认行为与产物表现（30%）

**常见错误**：
- 把 CSS Modules 等同于 CSS-in-JS
- 和普通 CSS 导入混淆，导致类名没有哈希化

**延伸追问**：
- 如何让某些类名保持全局可用？
- CSS Modules 如何与 Sass/Less 等预处理器配合使用？

**相关题目**：
- [FB-10-CO-B-010 构建工具中静态资源通常如何处理](#FB-10-CO-B-010)

**参考资源**：
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Vite CSS Features](https://vitejs.dev/guide/features.html#css)

**口头回答版**：
> CSS Modules 就是把 CSS 的类名局部化，构建时会把 `.title` 改成带 hash 的唯一名，避免全局冲突。Webpack 通过 css-loader 的 modules 配置支持，Vite 原生支持 `.module.css`。导入后得到一个对象，key 是原名，value 是 hash 后的类名。
---

### FB-10-CO-A-010：如何理解 Webpack 中的 runtimeChunk 和 moduleGraph？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、runtimeChunk、moduleGraph、长期缓存、构建原理
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Webpack 中 `optimization.runtimeChunk` 的作用，以及 `moduleGraph` 在构建过程中扮演的角色。

**参考答案**：
1. **`optimization.runtimeChunk`**
   - 将 Webpack 的运行时代码（manifest）单独提取到一个 chunk 中。
   - runtime 包含模块 ID 与 chunk 文件的映射关系，很容易随构建变化。
   - 单独提取后，业务代码 chunk 更稳定，有利于长期缓存。

   ```js
   optimization: {
     runtimeChunk: { name: 'runtime' }
   }
   ```

2. **`moduleGraph`**
   - Webpack 5 内部用于表示模块之间连接关系的数据结构。
   - 记录模块导出/导入、依赖原因（reasons）、连接状态等信息。
   - 在 seal 阶段用于生成 chunk graph、代码生成、Tree Shaking 等。

两者关系：

- `moduleGraph` 影响最终 chunk 的划分与内容。
- `runtimeChunk` 影响 chunk 加载时的映射代码是否独立出来，从而影响缓存策略。

**评分维度**：
- 说明 `runtimeChunk` 的作用与缓存意义（40%）
- 说明 `moduleGraph` 的作用（40%）
- 说明两者对产物的影响（20%）

**常见错误**：
- 认为 runtime 和业务代码合并更好
- 将 `moduleGraph` 与原始依赖图混为一谈

**延伸追问**：
- 为什么 `runtimeChunk` 对长期缓存很重要？
- `moduleGraph` 在代码分割时会发生什么变化？

**相关题目**：
- [FB-10-CO-A-001 请描述 Webpack 的完整构建流程](#FB-10-CO-A-001)
- [FB-10-CA-A-001 分析下面 Webpack 配置的作用与产物结构](#FB-10-CA-A-001)

**参考资源**：
- [Webpack runtimeChunk](https://webpack.js.org/configuration/optimization/#optimizationruntimechunk)

**口头回答版**：
> `runtimeChunk` 是把 Webpack 的运行时代码单独提取出来，因为 runtime 里记录了模块 ID 映射，容易随构建变化，单独提取可以让业务 chunk 更稳定地缓存。`moduleGraph` 是 Webpack 内部维护的模块关系图，在 seal 阶段用来生成 chunk 和代码。
---

### FB-10-CD-A-002：手写一个 Vite 插件，在构建结束时输出所有产物文件大小

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Vite、插件、构建产物、文件大小、手写实现
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请手写一个 Vite 插件，在构建结束时遍历 `dist` 目录，输出所有产物文件的尺寸（类似 `ls -lh`）。

**参考答案**：
```js
import fs from 'node:fs/promises';
import path from 'node:path';

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

export default function buildSizePlugin() {
  return {
    name: 'build-size',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const dist = path.resolve(process.cwd(), 'dist');
      const files = await fs.readdir(dist);
      console.log('\nBuild assets:');
      for (const file of files) {
        const stat = await fs.stat(path.join(dist, file));
        if (stat.isFile()) {
          console.log(`  ${file.padEnd(30)} ${formatSize(stat.size).padStart(10)}`);
        }
      }
    }
  };
}
```

关键点：

- `apply: 'build'` 让插件只在生产构建时生效。
- `enforce: 'post'` 让插件在其他插件之后执行。
- `closeBundle` 在产物写入磁盘后触发，适合读取最终产物。
- 使用异步 API 避免阻塞构建线程。

**评分维度**：
- 正确使用 Vite 插件结构（40%）
- 在 `closeBundle` 中读取产物目录（30%）
- 格式化输出文件大小（30%）

**常见错误**：
- 使用 `buildEnd` 而非 `closeBundle`，此时产物尚未写入
- 同步读取大量文件导致构建阻塞

**延伸追问**：
- 如何过滤只输出 JS/CSS 文件？
- 如何将文件大小上报到监控系统？

**相关题目**：
- [FB-10-CO-A-008 Vite 的插件机制与 Rollup 插件有什么关系](#FB-10-CO-A-008)
- [FB-10-CD-A-001 手写一个最简单的 Webpack Loader](#FB-10-CD-A-001)

**参考资源**：
- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)

**口头回答版**：
> 写一个 Vite 插件，在 build 阶段用 `closeBundle` 钩子读取 dist 目录，stat 每个文件大小，然后打印成表格。注意用异步读取避免阻塞，`apply` 设为 `build`。
---

### FB-10-CA-A-002：分析以下 splitChunks 配置可能产生的问题及优化方向

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、splitChunks、代码分割、性能优化、配置分析
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请分析以下 `splitChunks` 配置可能带来的问题，并给出优化建议。

```js
optimization: {
  splitChunks: {
    chunks: 'all',
    minSize: 10000,
    maxSize: 50000,
    cacheGroups: {
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      },
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -10,
        chunks: 'all'
      }
    }
  }
}
```

**参考答案**：
潜在问题：

1. **`vendors` 使用单一 `name`**
   - 所有第三方依赖被打包到一个 `vendors.js`。
   - 任意依赖升级都会使整个 `vendors` hash 变化，缓存失效范围大。
   - 首屏可能加载大量非当前页面需要的依赖。

2. **`maxSize` 设置过小（50KB）**
   - 容易产生大量细碎 chunk，增加 HTTP 请求数。
   - 对 HTTP/1.1 环境尤其不友好。

3. **`default` 组可能过度拆分业务代码**
   - 多个业务模块被复用时会单独成 chunk，导致请求不可控。

优化方向：

- 将核心框架（react、vue、lodash 等）单独分组，业务依赖再细分或按包拆分。
- 合理设置 `maxSize` 和 `maxAsyncRequests`，避免请求爆炸。
- 使用 `maxInitialRequests` 控制首屏请求数。
- 对路由级动态导入，让业务代码按路由自然分包。
- 给 `vendors` 使用 `name` 函数生成多文件，或去掉固定 `name` 让 Webpack 自动命名。

**评分维度**：
- 识别 `vendors` 单一文件带来的缓存与加载问题（40%）
- 分析 `maxSize` / `minSize` 对 chunk 数量的影响（30%）
- 给出具体优化方向（30%）

**常见错误**：
- 认为 `chunks: 'all'` 就是最佳配置
- 忽略请求数对性能的影响

**延伸追问**：
- 如何按框架、业务库拆分 vendors？
- 动态导入与 `splitChunks` 的关系是什么？

**相关题目**：
- [FB-10-CO-A-005 Bundle Splitting 和 Code Splitting 有什么区别](#FB-10-CO-A-005)
- [FB-10-CA-A-001 分析下面 Webpack 配置的作用与产物结构](#FB-10-CA-A-001)

**参考资源**：
- [Webpack SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)

**口头回答版**：
> 这个配置把所有 node_modules 打成一个 vendors，会导致首屏加载巨大；maxSize 设得太小又会拆分出太多小文件，增加请求开销。优化时可以把核心框架单独成组，业务代码按路由动态导入，调整 minSize 和 maxAsyncRequests。
---

### FB-10-PE-A-003：如何针对大型依赖做按需加载和构建优化？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：按需加载、大型依赖、组件库、Monaco、构建优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
项目中引入了 Monaco Editor、Ant Design 等大型依赖，如何从构建和运行时角度进行优化？

**参考答案**：
优化思路：

1. **组件/功能按需引入**
   - Ant Design：`babel-plugin-import` 或 `unplugin-vue-components` / `unplugin-auto-import`。
   - Element Plus：使用官方按需引入插件。

2. **动态导入 + 代码分割**
   ```js
   const MonacoEditor = React.lazy(() => import('react-monaco-editor'));
   ```
   - Monaco 可配合 `monaco-editor-webpack-plugin` 按语言 worker 分包。

3. **替换全量依赖**
   - `lodash` -> `lodash-es` 或按需引入子模块。
   - `moment` -> `dayjs`。

4. **构建配置优化**
   - Webpack `splitChunks` 将大依赖单独成组。
   - Vite `manualChunks` 将核心框架、编辑器拆离主包。
   - 使用 CDN 加载稳定且大的库（权衡稳定性与缓存）。

5. **图标/字体子集化**
   - 避免全量引入图标字体文件。

6. **验证效果**
   - 使用 bundle analyzer 确认按需引入生效，没有冗余代码。

**评分维度**：
- 给出按需加载方案（40%）
- 说明动态导入与代码分割（30%）
- 说明构建配置与验证方法（30%）

**常见错误**：
- 全量引入组件库，没有按需加载
- 只优化构建配置，不优化运行时加载

**延伸追问**：
- 如何验证按需引入真正生效？
- Monorepo 中如何统一大型依赖版本？

**相关题目**：
- [FB-10-CO-B-009 什么是代码分割](#FB-10-CO-B-009)
- [FB-10-PE-A-002 如何分析并优化前端打包体积](#FB-10-PE-A-002)

**参考资源**：
- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
- [unplugin](https://github.com/unjs/unplugin)

**口头回答版**：
> 对于 Ant Design 这类库，可以用 babel-plugin-import 或 unplugin 按需引入组件和样式，而不是全量导入。Monaco 这种大型编辑器可以用动态导入并按语言分包，worker 也可以走 CDN。构建层面再配好 manualChunks 和 splitChunks。
---

### FB-10-EN-A-002：Monorepo 中如何设计构建任务依赖和缓存？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Monorepo、构建任务、拓扑依赖、缓存、Turborepo、Nx
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在多包仓库（Monorepo）中，如何设计构建任务的依赖关系，以及如何设计有效的缓存策略？

**参考答案**：
1. **任务依赖设计**
   - 按包的依赖拓扑排序：子包先构建，父包后构建。
   - 使用 `dependsOn` / `pipeline` 声明依赖。

   ```json
   {
     "pipeline": {
       "build": { "dependsOn": ["^build"] },
       "test": { "dependsOn": ["build"] }
     }
   }
   ```

2. **缓存策略**
   - 本地缓存：基于源码 hash、lockfile、环境变量生成缓存 key。
   - 远程缓存：Turborepo / Nx 支持把缓存上传到远程存储，团队共享。
   - 只缓存任务的输出（如 `dist/`、`coverage/`），不缓存输入源码。

3. **仅构建受影响包**
   - 结合 Git 差异分析，只构建变更的包及其下游依赖。
   - 大幅减少 CI 时间和本地等待时间。

4. **关键注意事项**
   - 缓存 key 必须包含 `package.json`、lockfile、构建配置，否则可能命中过期缓存。
   - 环境变量变化时要使缓存失效。
   - 对于非确定性任务（如 lint 全量扫描）谨慎开启缓存。

**评分维度**：
- 说明拓扑依赖设计（40%）
- 说明本地/远程缓存策略（40%）
- 说明受影响包构建与缓存失效（20%）

**常见错误**：
- 每个包独立构建，不利用拓扑关系
- 缓存 key 不考虑 lockfile 导致命中过期产物

**延伸追问**：
- 如何处理跨包类型定义（`.d.ts`）的构建顺序？
- 如何设计基于变更的 CI 流水线？

**相关题目**：
- [FB-10-CO-R-001 Monorepo 场景下的构建方案如何选型](#FB-10-CO-R-001)
- [FB-10-EN-R-001 CI/CD 中的构建优化与并行化策略](#FB-10-EN-R-001)

**参考资源**：
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Nx Docs](https://nx.dev/)

**口头回答版**：
> Monorepo 里要用任务调度工具，比如 Turborepo 或 Nx。核心是先按包的依赖拓扑执行 build，子包先构建，父包后构建。缓存要基于源码 hash、lockfile 和环境变量，远程缓存能让团队共享。只构建受影响的包可以大幅提升效率。
---

### FB-10-PE-A-004：如何分析 Webpack 构建耗时分布并定位瓶颈？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、构建性能、耗时分析、speed-measure、瓶颈定位
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何分析 Webpack 构建过程中各阶段的耗时，并定位主要性能瓶颈。

**参考答案**：
常用分析方法：

1. **speed-measure-webpack-plugin**
   - 测量每个 Loader 和 Plugin 的耗时。
   - 输出表格，直观看到热点。

2. **Webpack 内置 Profile**
   - `webpack --profile --json > stats.json`
   - 在 Chrome DevTools 的 Performance 中导入查看火焰图。

3. **Compilation 阶段分析**
   - 关注 `make`（模块解析）、`seal`（chunk 生成）、`emit`（写入磁盘）。
   - 使用 `compilation.profile` 或自定义插件在关键 hook 打印时间。

4. **常见瓶颈**
   - `babel-loader`、`ts-loader` 转译慢：考虑换 SWC / esbuild / thread-loader。
   - `less-loader`、`sass-loader`：检查是否重复编译。
   - 大量小文件：考虑 `dll`、`external` 或预构建。
   - 模块解析慢：优化 `resolve.extensions`、使用 `noParse`。

5. **建立基线**
   - 记录冷启动、增量构建、CI 构建时间，持续对比。

**评分维度**：
- 说出至少 2 种分析工具（40%）
- 能定位 Loader/Plugin 耗时热点（30%）
- 给出优化方向（30%）

**常见错误**：
- 只看总构建时间，不细分阶段
- 频繁清理缓存导致无法度量增量优化效果

**延伸追问**：
- 如何减少 `babel-loader` 的耗时？
- `thread-loader` 适用于哪些场景，哪些场景不适合？

**相关题目**：
- [FB-10-PE-A-001 如何优化 Webpack 构建速度](#FB-10-PE-A-001)
- [FB-10-CO-A-006 esbuild、SWC、Rspack 是什么](#FB-10-CO-A-006)

**参考资源**：
- [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)
- [Webpack Build Performance](https://webpack.js.org/guides/build-performance/)

**口头回答版**：
> 可以用 speed-measure-webpack-plugin 看每个 loader 和 plugin 耗时，也可以用 webpack 的 profile 生成 JSON 在 Chrome 里看火焰图。主要关注 babel-loader、ts-loader、less-loader 这些转译步骤，还有解析阶段。找到瓶颈后再决定用缓存、多线程还是换编译器。

---

## 深入题（19 道）{#proficient}

### FB-10-CO-P-001：Webpack Module Federation 的原理是什么？解决了什么问题？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Module Federation、微前端、Remote、Host、共享依赖
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请解释 Webpack Module Federation 的核心原理，以及它主要解决了什么问题。

**参考答案**：

Module Federation 是 Webpack 5 引入的模块联邦机制，允许独立构建的应用在运行时动态加载彼此的模块，实现代码共享和独立部署。

核心概念：

1. **Host（宿主）**：
   - 消费远程模块的应用。

2. **Remote（远程）**：
   - 暴露模块供其他应用消费的应用。

3. **Shared Dependencies（共享依赖）**：
   - 多个应用之间共享的依赖（如 React、Vue），避免重复加载和版本冲突。

核心原理：

1. **Container Plugin**：
   - `ModuleFederationPlugin` 将远程应用打包为一个"容器"，暴露指定模块。

2. **Remote Entry**：
   - 远程应用生成一个入口文件（remoteEntry.js），包含模块注册表和加载逻辑。

3. **Runtime 动态加载**：
   - Host 通过 `import('remote/app')` 在运行时向 Remote Entry 请求模块。
   - Webpack Runtime 会解析依赖、加载 chunk、初始化共享作用域。

4. **Share Scope**：
   - 共享依赖被挂载到全局 share scope，按版本规则匹配加载。

解决的问题：
- 微前端架构下独立构建、独立部署。
- 避免巨石应用全量构建。
- 共享公共依赖，减少重复打包。

```js
// Remote 配置
new ModuleFederationPlugin({
  name: 'remoteApp',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/Button'
  },
  shared: ['react', 'react-dom']
});

// Host 配置
new ModuleFederationPlugin({
  name: 'hostApp',
  remotes: {
    remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js'
  },
  shared: ['react', 'react-dom']
});
```

**评分维度**：
- 解释 Host/Remote/Shared 概念（40%）
- 说明 remoteEntry 和运行时加载原理（30%）
- 说明解决的问题和适用场景（30%）

**常见错误**：
- 把 Module Federation 等同于简单脚本加载
- 忽略共享依赖版本匹配机制

**延伸追问**：
- 共享依赖版本冲突时如何降级/升级？
- Module Federation 与 iframe、qiankun 等微前端方案有什么区别？

**相关题目**：
- [FB-10-CO-R-002 模块联邦架构设计与版本冲突解决](#FB-10-CO-R-002)

**参考资源**：
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Module Federation 官方示例](https://github.com/module-federation/module-federation-examples)

**口头回答版**：
> Module Federation 是 Webpack 5 引入的模块联邦机制，允许独立构建的应用在运行时动态加载彼此的模块，实现代码共享和独立部署。 - 消费远程模块的应用。 Remote（远程）： - 暴露模块供其他应用消费的应用。

---

### FB-10-CO-P-002：Tree Shaking 的底层原理是什么？为什么有时会失效？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Tree Shaking、DCE、副作用、ES Module、AST
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请深入解释 Tree Shaking 的底层实现原理，并列举导致 Tree Shaking 失效的常见原因。

**参考答案**：

Tree Shaking 的底层原理：

1. **静态分析依赖图**：
   - 构建工具从 entry 出发，根据 ESM 的 `import`/`export` 构建模块依赖图。
   - ESM 的导入导出是静态的，可在编译期确定。

2. **标记未引用导出（Mark & Sweep）**：
   - Webpack 使用 `UsedExportsPlugin` 标记哪些导出被使用。
   - 配合 Terser 等压缩工具，删除未使用的代码（DCE）。

3. **AST 级别的死代码消除**：
   - 压缩工具基于 AST 判断变量、函数是否被引用，安全移除。

失效原因：

1. **使用 CommonJS**：
   - `require` / `module.exports` 动态性强，难以静态分析。

2. **未声明 sideEffects**：
   - 构建工具不确定模块是否有副作用，不敢删除。

3. **导出对象整体引用**：
   - 例如 `import * as _ from 'lodash'` 后只使用部分方法，可能整包保留。

4. **代码中包含副作用**：
   - 模块顶层代码修改全局变量、polyfill 注入、CSS 导入等。

5. **Babel 配置转 ESM 为 CJS**：
   - 如果 Babel 将 `import` 转成了 `require`，Tree Shaking 会失效。

6. **动态表达式导入**：
   - `require(path + '/foo')` 或模板字符串动态导入无法分析。

最佳实践：
- 使用 ESM，配置 `sideEffects`。
- 库作者提供 ESM 入口（`module` / `exports` 字段）。
- 避免顶层副作用；按需引入工具库。

**评分维度**：
- 解释静态分析和 DCE 原理（40%）
- 列举至少 4 种失效原因（40%）
- 提到最佳实践（20%）

**常见错误**：
- 认为 Tree Shaking 只看 `export` 是否被引用
- 忽略 Babel 配置对 ESM 的破坏

**延伸追问**：
- Webpack 的 `usedExports` 和 `sideEffects` 有什么关系？
- 如何验证一个库是否能被 Tree Shaking？

**参考资源**：
- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Rollup Tree Shaking](https://rollupjs.org/tutorial/#tree-shaking)

**口头回答版**：
> Tree Shaking 的底层原理： - 构建工具从 entry 出发，根据 ESM 的 import/export 构建模块依赖图。 - ESM 的导入导出是静态的，可在编译期确定。 标记未引用导出（Mark & Sweep）：

---

### FB-10-CO-P-003：HMR 的底层实现原理是什么？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：HMR、热更新、WebSocket、Webpack Runtime、模块替换
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请深入解释 Webpack HMR 的实现原理，从代码修改到页面更新的完整流程是怎样的？

**参考答案**：

Webpack HMR 的核心流程：

1. **文件监听**：
   - Webpack 使用 `watchpack` 监听文件变化（基于 fs events 或轮询）。

2. **重新编译**：
   - 变更文件对应的模块重新编译，生成新的 chunk/hash。

3. **生成更新清单（Update Manifest）**：
   - Webpack dev server 生成包含更新模块列表和 hash 的 `.hot-update.json`。

4. **推送更新事件**：
   - Webpack Dev Server 通过 WebSocket（`webpack-hot-middleware` 用 EventSource）通知浏览器。

5. **浏览器请求更新**：
   - Runtime 根据更新清单请求 `.hot-update.js`。

6. **模块替换**：
   - Runtime 执行 `module.hot.accept` 注册的回调，用新模块替换旧模块。
   - 如果没有 accept 处理，则向上冒泡，直到某层 accept 或刷新页面。

7. **状态保留**：
   - 框架层面（React Fast Refresh、Vue HMR）通过代理组件保持状态。

```js
if (module.hot) {
  module.hot.accept('./utils.js', function() {
    console.log('utils updated');
  });
}
```

关键点：
- HMR 是构建工具和运行时共同协作的结果。
- accept 的粒度决定了更新范围和状态保留能力。

**评分维度**：
- 说明监听、编译、推送、替换四个阶段（40%）
- 解释 `module.hot.accept` 作用（30%）
- 提到 WebSocket 和更新清单（30%）

**常见错误**：
- 认为 HMR 只是浏览器自动刷新
- 忽略 accept 冒泡机制

**延伸追问**：
- React Fast Refresh 和旧版 React Hot Loader 有什么区别？
- 如果 HMR 更新后状态丢失，可能是哪里出了问题？

**参考资源**：
- [Webpack HMR Concepts](https://webpack.js.org/concepts/hot-module-replacement/)
- [Webpack HMR API](https://webpack.js.org/api/hot-module-replacement/)

**口头回答版**：
> Webpack HMR 的核心流程： - Webpack 使用 watchpack 监听文件变化（基于 fs events 或轮询）。 - 变更文件对应的模块重新编译，生成新的 chunk/hash。 生成更新清单（Update Manifest）：

---

### FB-10-CO-P-004：Source Map 的各种类型有什么区别？如何选择？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Source Map、devtool、VLQ、调试、源码安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请详细说明 Webpack `devtool` 中常见的 Source Map 类型（如 source-map、eval-source-map、cheap-module-source-map 等）的区别，并说明不同场景下的选择策略。

**参考答案**：

Source Map 类型由几个维度组合：

1. **是否内联（inline-）**：
   - map 内容以 Data URL 形式内联到产物中，不生成独立 .map 文件。

2. **是否便宜（cheap-）**：
   - 只映射到行，不映射列；不处理 Loader Source Map。

3. **是否模块（module-）**：
   - 包含 Loader 转换前的原始源码映射。

4. **是否隐藏（hidden-）**：
   - 生成 .map 文件，但产物中不添加引用注释。

5. **是否 nosources**：
   - map 文件不包含原始源码内容，只保留映射关系。

常见类型对比：

| 类型 | 质量 | 速度 | 是否暴露源码 | 场景 |
|------|------|------|--------------|------|
| `eval` | 差 | 最快 | 暴露（内联） | 开发，只需行级定位 |
| `eval-source-map` | 高 | 快 | 暴露（内联） | 开发环境推荐 |
| `cheap-module-source-map` | 中 | 较快 | 暴露（独立文件） | 开发环境 |
| `source-map` | 高 | 慢 | 暴露（独立文件） | 生产，需外部托管 |
| `hidden-source-map` | 高 | 慢 | 不直接暴露 | 生产，上传监控平台 |
| `nosources-source-map` | 中 | 较慢 | 不暴露源码内容 | 生产，允许行号但不暴露源码 |

选择策略：
- 开发环境：`eval-source-map` 或 `cheap-module-source-map`。
- 生产环境：`hidden-source-map` / `nosources-source-map`，map 文件不上传到公网。

**评分维度**：
- 解释 Source Map 类型命名维度（40%）
- 对比常见类型差异（30%）
- 给出选择策略（30%）

**常见错误**：
- 生产环境使用 `eval-source-map` 导致源码泄露
- 混淆 cheap 和 module 的含义

**延伸追问**：
- VLQ 编码是什么？为什么 Source Map 用它？
- 如何只让内部人员访问 Source Map？

**参考资源**：
- [Webpack Devtool](https://webpack.js.org/configuration/devtool/)
- [Source Map 详解](https://www.ruanyifeng.com/blog/2013/01/source_map.html)

**口头回答版**：
> Source Map 类型由几个维度组合： 是否内联（inline-）： - map 内容以 Data URL 形式内联到产物中，不生成独立 .map 文件。 是否便宜（cheap-）：

---

### FB-10-CO-P-005：Webpack Plugin 的生命周期和 Tapable 机制是怎样的？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Webpack、Plugin、Tapable、Hook、生命周期
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Webpack 的 Plugin 机制，说明 Tapable 是什么，以及 Plugin 如何介入构建生命周期。

**参考答案**：

Webpack 本质上是一个事件驱动的构建工具，通过 Tapable 实现事件订阅和发布。

**Tapable**：
- 一个轻量级的事件流库，提供多种类型的 Hook：
  - `SyncHook`：同步串行
  - `SyncBailHook`：同步，返回非 undefined 时终止
  - `AsyncSeriesHook`：异步串行
  - `AsyncParallelHook`：异步并行
  - `WaterfallHook`：上一个返回值传给下一个
- Compiler 和 Compilation 对象都继承自 Tapable。

**Plugin 写法**：
```js
class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      console.log('emit 阶段');
      callback();
    });
  }
}
module.exports = MyPlugin;
```

**常见生命周期 Hook**：

| Hook | 触发时机 |
|------|----------|
| `environment` | 环境准备好 |
| `compile` | 新 Compilation 创建前 |
| `compilation` | Compilation 创建后 |
| `make` | 开始从 entry 解析模块 |
| `seal` | 模块依赖图构建完成，开始封装 |
| `optimize` | 优化 chunk/模块 |
| `emit` | 生成 assets 后，写入文件前 |
| `done` | 构建完成 |

Plugin 通过在指定 Hook 上 tap 来介入构建过程，可以读取和修改 Compilation 数据。

**评分维度**：
- 解释 Tapable 和 Hook 类型（30%）
- 说明 Plugin 注册方式（30%）
- 列举重要生命周期 Hook 及触发时机（40%）

**常见错误**：
- 认为 Plugin 直接修改 Webpack 内部类
- 混淆同步 Hook 和异步 Hook 的 tap 方式

**延伸追问**：
- `tap`、`tapAsync`、`tapPromise` 有什么区别？
- 如何在 Plugin 中修改输出文件？

**相关题目**：
- [FB-10-CD-P-001 手写一个 Webpack Plugin](#FB-10-CD-P-001)

**参考资源**：
- [Tapable](https://github.com/webpack/tapable)
- [Webpack Compiler Hooks](https://webpack.js.org/api/compiler-hooks/)

**口头回答版**：
> Webpack 本质上是一个事件驱动的构建工具，通过 Tapable 实现事件订阅和发布。 - 一个轻量级的事件流库，提供多种类型的 Hook： - SyncHook：同步串行 - SyncBailHook：同步，返回非 undefined 时终止

---

### FB-10-CD-P-001：手写一个 Webpack Plugin，在构建完成后输出所有 chunk 文件名。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Webpack、Plugin、手写实现、Tapable、Compilation
**出现频率**：中频
**预计回答时长**：8-10 分钟

**题目描述**：
请手写一个 Webpack Plugin，在构建完成后输出所有生成的 chunk 文件名和大小。

**参考答案**：

```js
// ChunkInfoPlugin.js
class ChunkInfoPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('ChunkInfoPlugin', (compilation, callback) => {
      const assets = compilation.assets;
      const entries = Object.entries(assets);

      console.log('\n=== Chunk Info ===');
      entries.forEach(([filename, source]) => {
        const size = source.size();
        console.log(`${filename}: ${(size / 1024).toFixed(2)} KB`);
      });
      console.log('==================\n');

      callback();
    });
  }
}

module.exports = ChunkInfoPlugin;
```

使用方式：

```js
const ChunkInfoPlugin = require('./ChunkInfoPlugin');

module.exports = {
  plugins: [
    new ChunkInfoPlugin()
  ]
};
```

进阶：在 `done` 阶段获取 stats：

```js
compiler.hooks.done.tap('ChunkInfoPlugin', (stats) => {
  const info = stats.toJson();
  info.assets.forEach(asset => {
    console.log(`${asset.name}: ${(asset.size / 1024).toFixed(2)} KB`);
  });
});
```

**评分维度**：
- 写出 Plugin 类结构和 apply 方法（40%）
- 正确使用 Tapable Hook（30%）
- 能读取 compilation.assets 并输出信息（30%）

**常见错误**：
- 在错误的 Hook 阶段读取 assets
- 忘记调用 callback 导致构建挂起
- 使用同步 Hook 却用 tapAsync

**延伸追问**：
- 如何过滤只输出 JS/CSS 文件？
- 如何将统计信息写入 JSON 文件？

**参考资源**：
- [Writing a Plugin](https://webpack.js.org/contribute/writing-a-plugin/)

**口头回答版**：
> （见代码示例）
> 使用方式：
> （见代码示例）
> 进阶：在 done 阶段获取 stats：
> （见代码示例）

---

### FB-10-CO-P-006：Vite 的依赖预构建（Pre-bundle）原理和作用是什么？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Vite、Pre-bundle、esbuild、依赖扫描、ESM
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Vite 为什么在开发环境要进行依赖预构建，预构建做了哪些事情，以及它的缓存机制。

**参考答案**：

Vite 开发环境基于原生 ESM，但 npm 包大多以 CommonJS 发布，直接导入会遇到问题。预构建主要解决以下问题：

1. **CommonJS 转 ESM**：
   - 将 CJS 依赖转换为浏览器可识别的 ESM 格式。

2. **减少请求数量**：
   - 将具有许多内部模块的依赖（如 lodash-es）打包成单个或少量 ESM 文件。
   - 避免浏览器发起几百个请求。

3. **支持裸导入（Bare Import）**：
   - `import React from 'react'` 中的 `react` 需要解析为 node_modules 中的实际路径。

预构建流程：

1. **依赖扫描**：
   - Vite 扫描项目源码，找到所有裸导入的依赖。

2. **esbuild 打包**：
   - 使用 esbuild 将依赖打包为 ESM，写入 `node_modules/.vite/deps/`。

3. **生成元数据**：
   - 生成 `_metadata.json`，记录依赖版本、hash、浏览器目标等。

缓存机制：
- 预构建产物会缓存到 `node_modules/.vite/deps/`。
- 只有依赖版本变化、`vite.config.js` 修改、浏览器目标变化等才会重新预构建。
- 可通过 `optimizeDeps.force: true` 强制重新预构建。

**评分维度**：
- 说明预构建的三个主要作用（40%）
- 解释依赖扫描和 esbuild 打包流程（30%）
- 说明缓存失效条件（30%）

**常见错误**：
- 认为预构建是为了压缩代码
- 不知道预构建产物存放在哪里

**延伸追问**：
- 如何处理动态添加的依赖？
- 为什么 Vite 不对源码做预构建？

**参考资源**：
- [Vite Dependency Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html)

**口头回答版**：
> Vite 开发环境基于原生 ESM，但 npm 包大多以 CommonJS 发布，直接导入会遇到问题。 预构建主要解决以下问题： CommonJS 转 ESM： - 将 CJS 依赖转换为浏览器可识别的 ESM 格式。

---

### FB-10-CO-P-007：Babel 的编译流程是怎样的？AST 转换在这个过程中起什么作用？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Babel、AST、编译流程、Parser、Traverse、Generator
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Babel 将 ES6+ 代码转换为兼容代码的完整流程，并解释 AST 在这个过程中的作用。

**参考答案**：

Babel 编译流程主要分为三个阶段：

1. **解析（Parse）**：
   - 使用 `@babel/parser`（原 babylon）将源代码解析为 AST（抽象语法树）。
   - 基于源代码字符流生成 token，再组装成树形结构。

2. **转换（Transform）**：
   - 使用 `@babel/traverse` 遍历 AST。
   - Plugin/Preset 通过 visitor 模式访问、修改、新增、删除节点。
   - 例如将 `ArrowFunctionExpression` 转为 `FunctionExpression`。

3. **生成（Generate）**：
   - 使用 `@babel/generator` 将修改后的 AST 转回代码字符串。
   - 同时生成 Source Map。

AST 的作用：
- AST 是源代码的结构化表示，Babel 通过操作 AST 实现语法转换。
- 每个语法节点（Node）都有类型、位置、子节点等属性。
- Visitor 模式允许插件只关注特定节点类型，而不用遍历整棵树。

```js
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const code = `const add = (a, b) => a + b;`;
const ast = parser.parse(code, { sourceType: 'module' });

traverse(ast, {
  ArrowFunctionExpression(path) {
    // 可在此转换箭头函数
  }
});

const output = generate(ast, {}, code);
```

**评分维度**：
- 说明 Parse/Transform/Generate 三阶段（40%）
- 解释 AST 和 Visitor 模式（30%）
- 能举例说明转换过程（30%）

**常见错误**：
- 认为 Babel 直接基于字符串做正则替换
- 混淆 parser 和 transformer 的职责

**延伸追问**：
- 如何编写一个简单的 Babel Plugin？
- Babel 的 preset-env 是如何决定使用哪些 plugin 的？

**参考资源**：
- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
- [AST Explorer](https://astexplorer.net/)

**口头回答版**：
> Babel 编译流程主要分为三个阶段： 解析（Parse）： - 使用 @babel/parser（原 babylon）将源代码解析为 AST（抽象语法树）。 - 基于源代码字符流生成 token，再组装成树形结构。

---

### FB-10-SC-P-001：在微前端项目中，构建工具应该如何配合设计？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：微前端、Module Federation、构建设计、共享依赖、独立部署
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
假设你正在设计一个基于微前端架构的企业级中台系统，有多个独立团队维护不同子应用。请说明构建工具层面需要考虑哪些问题，以及你的设计方案。

**参考答案**：

构建工具层面需要考虑：

1. **独立构建与独立部署**：
   - 每个子应用应有自己的构建流程和产物，互不影响。
   - 使用独立的 CI/CD 流水线。

2. **共享依赖管理**：
   - 通过 Module Federation 或 importmap 共享 React/Vue、路由库、组件库等。
   - 统一依赖版本，避免多版本冲突和重复加载。

3. **公共组件库/工具库的构建**：
   - 抽离为独立 npm 包或联邦模块。
   - 使用 Rollup 打包为 ESM/CJS，并开启 Tree Shaking。

4. **构建产物规范**：
   - 统一输出目录、入口文件名、版本号规则。
   - 使用 contenthash 支持长期缓存。

5. **环境变量与配置管理**：
   - 每个子应用有自己的环境变量，但基座需提供统一运行时配置注入。

6. **HMR 与本地联调**：
   - 支持独立启动和联调启动两种模式。
   - 通过代理或 Module Federation dev 模式实现本地组合调试。

7. **产物大小与加载策略**：
   - 子应用按需加载，基座控制激活规则。
   - prefetch 预加载常用子应用。

8. **构建工具选型**：
   - 若使用 Module Federation：Webpack 5 / Rspack。
   - 若使用 qiankun：Webpack/Vite/Rollup 均可，需输出 UMD/SystemJS。

**评分维度**：
- 覆盖独立构建、共享依赖、公共库等关键点（40%）
- 能结合具体微前端方案说明（30%）
- 提到部署和联调策略（30%）

**常见错误**：
- 只关注技术选型，忽略团队协作规范
- 忽略依赖版本冲突问题

**延伸追问**：
- 如果子应用使用不同版本的 React，如何处理？
- 微前端下如何实现统一的错误监控和埋点？

**相关题目**：
- [FB-10-CO-P-001 Module Federation 原理](#FB-10-CO-P-001)
- [FB-10-CO-R-002 模块联邦架构设计](#FB-10-CO-R-002)

**参考资源**：
- [qiankun](https://qiankun.umijs.org/)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)

**口头回答版**：
> 构建工具层面需要考虑： 独立构建与独立部署： - 每个子应用应有自己的构建流程和产物，互不影响。 - 使用独立的 CI/CD 流水线。

---

### FB-10-PE-P-001：大型前端项目构建性能优化实战方案。

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：构建性能、Webpack、缓存、并行、性能分析、大型项目
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
你所在的项目有上千个模块，Webpack 冷启动和 HMR 都很慢。请给出系统性的构建性能优化方案。

**参考答案**：

一、定位瓶颈：

1. 使用 `speed-measure-webpack-plugin` 测量各 Loader/Plugin 耗时。
2. 使用 `webpack --profile` 生成构建性能分析。
3. 查看 CPU/内存/磁盘 IO 占用。

二、优化方案：

1. **升级工具链**：
   - 升级到 Webpack 5 + Node.js LTS 版本。
   - 评估迁移到 Rspack/Vite 的可行性。

2. **开启持久化缓存**：
   ```js
   cache: {
     type: 'filesystem',
     buildDependencies: { config: [__filename] }
   }
   ```

3. **并行化**：
   - `thread-loader` 处理 babel-loader、ts-loader。
   - `terser-webpack-plugin` 配置 `parallel: true`。

4. **替换编译器**：
   - 用 `esbuild-loader` 或 `swc-loader` 替代 babel-loader 进行部分转换。
   - 用 `esbuild-minimizer-plugin` 替代 Terser。

5. **优化解析**：
   - `resolve.extensions` 只保留必要后缀。
   - `resolve.modules` 指定绝对路径。
   - `noParse` 跳过已知库。

6. **减少参与打包的代码**：
   - 配置 `sideEffects` 和 `usedExports`。
   - 移除未使用依赖。

7. **外部化大型依赖**：
   - `externals` 排除 react/react-dom，通过 CDN 引入。

8. **增量预构建**：
   - DLL、Module Federation shared、预编译 node_modules。

9. **CI 优化**：
   - 缓存 `node_modules`、构建缓存目录。
   - 并行化构建任务，分治构建。

10. **HMR 优化**：
    - 限制监听范围，使用 `watchOptions.ignored`。
    - 避免在 HMR 路径上做重型转换。

**评分维度**：
- 先定位瓶颈再给出方案（20%）
- 覆盖缓存、并行、编译器替换等核心手段（50%）
- 能说明收益和 trade-off（30%）

**常见错误**：
- 不加分析直接堆砌优化手段
- 小项目盲目使用 thread-loader 反而变慢

**延伸追问**：
- 如何量化优化前后的构建速度提升？
- 迁移到 Rspack 需要做哪些改造？

**参考资源**：
- [Webpack Build Performance](https://webpack.js.org/guides/build-performance/)
- [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)

**口头回答版**：
> 使用 speed-measure-webpack-plugin 测量各 Loader/Plugin 耗时。 使用 webpack --profile 生成构建性能分析。 查看 CPU/内存/磁盘 IO 占用。 - 升级到 Webpack 5 + Node.js LTS 版本。

---

### FB-10-CO-P-008：Webpack 5 的 Persistent Caching 原理是什么？如何配置？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Webpack 5、Persistent Caching、构建缓存、cache、性能
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Webpack 5 Persistent Caching 的原理，以及如何配置才能既安全又高效地提升构建速度。

**参考答案**：
Webpack 5 引入的持久化缓存（Persistent Caching）会将模块和 chunk 的编译结果序列化后写入文件系统，下次构建时直接复用。

工作原理：

- 构建时将 `module`、`chunk`、`moduleGraph` 等对象序列化到磁盘。
- 下次构建先计算缓存 key，命中则跳过重复的编译工作。
- 缓存 key 由配置、依赖、环境变量等共同决定。

推荐配置：

```js
cache: {
  type: 'filesystem',
  cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
  buildDependencies: {
    config: [__filename]
  },
  version: process.env.WEBPACK_CACHE_VERSION || '1.0.0',
  store: 'pack'
}
```

关键点：

- `buildDependencies` 必须包含配置文件，否则配置变了缓存不会失效。
- CI 环境中需要将缓存目录持久化（如 GitHub Actions 的 `actions/cache`）。
- 插件或 loader 升级后要更新 `version` 或清空缓存。
- `store: 'pack'` 将多个小缓存文件打包，减少 I/O。

**评分维度**：
- 说明持久化缓存原理（40%）
- 给出正确配置项（40%）
- 说明缓存失效与注意事项（20%）

**常见错误**：
- 开启缓存后从不清理，导致配置或依赖升级仍命中旧缓存
- CI 中不持久化缓存目录，导致每次构建都是冷启动

**延伸追问**：
- 缓存失效的常见原因有哪些？
- 如何度量缓存命中率？

**相关题目**：
- [FB-10-EN-A-001 如何设计前端构建的缓存策略](#FB-10-EN-A-001)
- [FB-10-PE-A-001 如何优化 Webpack 构建速度](#FB-10-PE-A-001)

**参考资源**：
- [Webpack Cache](https://webpack.js.org/configuration/cache/)

**口头回答版**：
> Webpack 5 持久化缓存会把模块和 chunk 的编译结果序列化到磁盘，下次构建时直接复用。配置时要指定 cacheDirectory、buildDependencies 包含配置文件，这样配置变了缓存才会失效。CI 里要把缓存目录也保存起来。
---

### FB-10-CO-P-009：Vite 为什么要用 esbuild 对依赖进行预构建？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Vite、esbuild、预构建、Pre-bundle、依赖处理
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
Vite 开发环境为什么需要用 esbuild 对依赖进行预构建？直接使用裸的 node_modules 会有什么问题？

**参考答案**：
直接使用裸 `node_modules` 的问题：

1. **模块格式不统一**
   - 很多 npm 包是 CommonJS 或 UMD，浏览器原生 ESM 无法直接加载。

2. **请求数量爆炸**
   - 一个包可能拆成数十上百个内部文件，浏览器会发起大量请求。

3. **内部文件被直接引用**
   - 有些包源码中直接 `import 'lodash/debounce'`，会暴露内部路径。

esbuild 预构建的作用：

- 将 CommonJS / UMD 依赖转换为 ESM。
- 将每个依赖（及其内部子路径）尽量合并为单个文件，减少请求。
- 使用 Go 编写的 esbuild 速度极快，预构建开销可忽略。
- 转换后的依赖缓存到 `node_modules/.vite`，后续复用。

Vite 会在首次启动时扫描源码中的 `import` 语句，确定需要预构建的依赖列表。

**评分维度**：
- 说明裸依赖直接使用的问题（50%）
- 说明 esbuild 预构建的核心作用（30%）
- 提及缓存与扫描机制（20%）

**常见错误**：
- 认为预构建是为了压缩代码
- 忽略 CommonJS -> ESM 转换的必要性

**延伸追问**：
- 如何强制重新预构建？
- 预构建缓存存在哪里，如何失效？

**相关题目**：
- [FB-10-CO-A-002 Vite 为什么快](#FB-10-CO-A-002)
- [FB-10-CO-P-006 Vite 的依赖预构建原理和作用是什么](#FB-10-CO-P-006)

**参考资源**：
- [Vite Dependency Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html)

**口头回答版**：
> 直接用 node_modules 的问题是，很多包是 CJS 或 UMD，浏览器 ESM 不支持；而且一个包可能拆成很多小文件，请求会爆炸。Vite 用 esbuild 把这些依赖提前打包成 ESM，并尽量合并成单个文件，减少请求。esbuild 是 Go 写的，所以很快。
---

### FB-10-CO-P-010：Rollup 和 Webpack 的 Tree Shaking 实现有什么差异？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Rollup、Webpack、Tree Shaking、ESM、Dead Code Elimination
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
Rollup 和 Webpack 都能做 Tree Shaking，但实现方式和效果有何差异？为什么 Rollup 通常被认为更彻底？

**参考答案**：
差异：

1. **架构基础**
   - Rollup 原生基于 ESM，整个打包过程围绕静态模块结构展开。
   - Webpack 需要兼容 CJS、AMD、UMD 等多种模块规范，内部需要模块加载器（runtime）。

2. **Tree Shaking 实现机制**
   - Rollup：在模块级别分析哪些导出被使用，直接保留有效语句，产物几乎没有额外 runtime。
   - Webpack：通过 `usedExports` 标记未使用导出，再依赖 Terser 等压缩工具做死代码消除。

3. **产物形态**
   - Rollup 产物更干净，适合库；Webpack 产物包含 runtime，适合应用。
   - Rollup 对某些模式（如 unused object methods）的消除更激进。

4. **CJS 兼容**
   - Webpack 对 CJS 的 Tree Shaking 需要 `sideEffects` 和 `usedExports` 配合，较保守。
   - Rollup 处理 CJS 依赖需要 `@rollup/plugin-commonjs`，但原生 Tree Shaking 仍基于 ESM。

结论：库打包常用 Rollup，应用打包常用 Webpack / Vite。

**评分维度**：
- 说明架构差异（40%）
- 说明 Tree Shaking 实现机制差异（40%）
- 说明适用场景差异（20%）

**常见错误**：
- 认为 Webpack 不能做 Tree Shaking
- 认为 Tree Shaking 只和 ES Module 语法有关，与工具无关

**延伸追问**：
- 为什么组件库常用 Rollup 而不是 Webpack？
- Webpack 5 在 Tree Shaking 上有哪些提升？

**相关题目**：
- [FB-10-CO-B-003 什么是 Tree Shaking](#FB-10-CO-B-003)
- [FB-10-CO-P-002 Tree Shaking 的底层原理是什么](#FB-10-CO-P-002)

**参考资源**：
- [Rollup Guide](https://rollupjs.org/guide/en/)
- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

**口头回答版**：
> Rollup 原生基于 ESM，Tree Shaking 是在模块级别直接分析哪些语句被用到，产物也更干净。Webpack 要经过 usedExports 标记和 Terser 压缩来消除死代码，还要兼容 CJS，所以有时会保守一些。Rollup 对库打包通常更彻底。
---

### FB-10-CO-P-011：Babel Plugin 中的 visitor 模式如何遍历和修改 AST？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Babel、AST、visitor、插件、语法树遍历
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Babel Plugin 中的 visitor 模式，说明它是如何遍历和修改 AST 的。

**参考答案**：
Babel 使用 `@babel/traverse` 遍历 AST。插件返回一个包含 `visitor` 的对象，visitor 的 key 是节点类型，value 是对应的处理函数。

基本结构：

```js
module.exports = function ({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {
        // path 是当前节点及其上下文
        // state 是遍历状态，可传递数据
      },
      CallExpression: {
        enter(path) { /* 进入节点 */ },
        exit(path) { /* 离开节点 */ }
      }
    }
  };
};
```

遍历特点：

- 默认采用深度优先前序遍历。
- 每个节点会触发 `enter` 和 `exit`。
- 通过 `path` 可以获取父节点、兄弟节点、作用域等信息。
- 通过 `path.replaceWith`、`path.remove`、`path.insertBefore` 等方法修改 AST。

visitor 模式让插件可以只关心特定节点类型，而无需自己实现完整遍历逻辑。

**评分维度**：
- 解释 visitor 模式概念（40%）
- 说明 enter/exit 遍历机制（30%）
- 说明 path 操作方式（30%）

**常见错误**：
- 认为 visitor 直接返回一个新的 AST 即可
- 混淆 enter 与 exit 的执行时机

**延伸追问**：
- 如何实现只在顶层作用域替换某个标识符？
- 如何阻止 visitor 继续向下遍历某个子树？

**相关题目**：
- [FB-10-CO-P-007 Babel 的编译流程是怎样的](#FB-10-CO-P-007)
- [FB-10-CD-B-001 手写一个 Babel Plugin 将 console.log 替换为 console.info](#FB-10-CD-B-001)

**参考资源**：
- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

**口头回答版**：
> Babel 遍历 AST 时用 visitor 模式，插件里写一个 visitor 对象，key 是节点类型，值是进入或离开该节点时执行的函数。通过 path 可以替换、删除或插入节点。默认是深度优先前序遍历。
---

### FB-10-CO-P-012：Webpack 中的 Dependency Graph 和 Module Graph 有什么区别？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Webpack、Dependency Graph、Module Graph、构建原理、chunk
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Webpack 中的 Dependency Graph 和 Module Graph，它们如何影响最终产物？

**参考答案**：
1. **Dependency Graph（依赖图）**
   - 编译早期根据源码中的 `import` / `require` 等语句建立的原始依赖关系。
   - 节点是 `Dependency` 实例，描述“谁依赖了什么”。

2. **Module Graph（模块图）**
   - Webpack 在解析依赖后建立的规范化模块关系图。
   - 节点是 `Module` 实例，边是 `ModuleGraphConnection`。
   - 包含模块的导出/导入信息、依赖原因（reasons）、优化标记等。

影响产物的方式：

- `Module Graph` 是 seal 阶段生成 chunk graph 的基础。
- Tree Shaking、Scope Hoisting、代码分割都依赖 `Module Graph`。
- 依赖图主要用于从入口递归解析模块，模块图用于后续优化和代码生成。

简言之：Dependency Graph 是“原始输入”，Module Graph 是“编译后用于优化的标准化模型”。

**评分维度**：
- 区分 Dependency Graph 与 Module Graph（40%）
- 说明构建阶段关系（30%）
- 说明对产物的影响（30%）

**常见错误**：
- 将两者混为一谈
- 认为 Webpack 内部只有 Dependency Graph

**延伸追问**：
- `ModuleGraphConnection` 中的 `explanation` 字段有什么用？
- 如何调试或可视化 Module Graph？

**相关题目**：
- [FB-10-CO-A-001 请描述 Webpack 的完整构建流程](#FB-10-CO-A-001)
- [FB-10-CO-A-010 如何理解 Webpack 中的 runtimeChunk 和 moduleGraph](#FB-10-CO-A-010)

**参考资源**：
- [Webpack ModuleGraph source](https://github.com/webpack/webpack/blob/main/lib/ModuleGraph.js)

**口头回答版**：
> Dependency Graph 是编译早期根据 import 建立起来的原始依赖关系；Module Graph 是 Webpack 规范化后的模块连接图，包含导出导入信息和依赖原因。后面的 chunk 图、代码生成、Tree Shaking 都基于 Module Graph。
---

### FB-10-CD-P-002：手写一个 Rollup 插件，将多个 JSON 文件合并为虚拟模块导出

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Rollup、插件、虚拟模块、JSON、手写实现
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请手写一个 Rollup 插件，将 `src/locales/` 目录下的所有 JSON 文件合并成一个虚拟模块 `virtual:locales` 导出。

**参考答案**：
```js
import fs from 'node:fs/promises';
import path from 'node:path';

const VIRTUAL_ID = 'virtual:locales';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

function mergeLocalesPlugin({ dir = 'src/locales' } = {}) {
  return {
    name: 'merge-locales',
    resolveId(id) {
      if (id === VIRTUAL_ID) {
        return RESOLVED_ID;
      }
      return null;
    },
    async load(id) {
      if (id !== RESOLVED_ID) return null;

      const localeDir = path.resolve(process.cwd(), dir);
      const files = await fs.readdir(localeDir);
      const result = {};

      for (const file of files) {
        if (file.endsWith('.json')) {
          const lang = path.basename(file, '.json');
          const content = await fs.readFile(path.join(localeDir, file), 'utf-8');
          result[lang] = JSON.parse(content);
        }
      }

      return `export default ${JSON.stringify(result)};`;
    }
  };
}

export default mergeLocalesPlugin;
```

关键点：

- `resolveId` 拦截 `virtual:locales`，返回带 `\0` 前缀的虚拟模块 ID，避免与真实文件冲突。
- `load` 读取目录下 JSON 文件并合并。
- 返回 ESM 代码字符串，Rollup 会进一步处理。

进阶：

- 可在 `load` 中调用 `this.addWatchFile` 让插件在文件变化时触发重新构建。
- 如需按语言分包，可在 `load` 中返回动态导入语句。

**评分维度**：
- 正确实现虚拟模块 `resolveId`（40%）
- 在 `load` 中读取并合并 JSON（40%）
- 返回合法 ESM 代码（20%）

**常见错误**：
- 在 `transform` 中处理所有 JSON 文件，而不是用虚拟模块
- 忽略虚拟模块 ID 的 `\0` 约定，导致路径解析冲突

**延伸追问**：
- 如何让 Rollup 监听 JSON 文件变化并热更新？
- 如何支持按语言代码分割？

**相关题目**：
- [FB-10-CD-A-001 手写一个最简单的 Webpack Loader](#FB-10-CD-A-001)
- [FB-10-SC-P-003 如何在构建阶段实现国际化资源的分包和按需加载](#FB-10-SC-P-003)

**参考资源**：
- [Rollup Plugin API](https://rollupjs.org/plugin-development/)

**口头回答版**：
> Rollup 插件可以通过 `resolveId` 拦截 `virtual:locales`，然后在 `load` 里读取 `src/locales` 下所有 JSON 合并成一个对象，最后返回 `export default {...}` 的代码。需要把 id 标记为虚拟模块，避免真正去文件系统找这个路径。
---

### FB-10-SC-P-002：构建工具如何配合微前端实现独立部署与共享依赖？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：微前端、构建工具、独立部署、共享依赖、Module Federation
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
在微前端项目中，构建工具应如何配合主子应用实现独立部署与共享依赖？

**参考答案**：
方案要点：

1. **独立构建、独立部署**
   - 每个子应用单独出包，产物格式通常为 UMD 或 SystemJS。
   - 主应用通过 `import-html-entry`、SystemJS `import` 或模块联邦运行时加载子应用。

2. **共享依赖策略**
   - 使用 Module Federation 的 `shared` 配置声明共享库和版本范围。
   - 设置 `singleton: true` 保证全局只加载一份 React/Vue 等核心库。
   - 通过 `requiredVersion` 控制版本兼容性。

3. **构建产物格式**
   - 主应用：常规 SPA 产物。
   - 子应用：打包为 `library` 类型，暴露生命周期钩子（如 `bootstrap`、`mount`、`unmount`）。

4. **构建时注意事项**
   - 配置 `publicPath` 为运行时动态获取，避免子应用资源路径错误。
   - 避免把共享库打到子应用主包里。
   - source map 独立托管，便于线上调试。

5. **CI/CD**
   - 每个子应用独立流水线，发布后将 manifest 注册到主应用配置中心。

**评分维度**：
- 说明独立部署方案（40%）
- 说明共享依赖策略（40%）
- 说明构建产物格式与 publicPath（20%）

**常见错误**：
- 所有应用打成一个包，失去微前端独立部署优势
- 共享依赖版本完全不控制，导致运行时冲突

**延伸追问**：
- 如何解决 `shared` 依赖的版本冲突？
- 主应用如何设计加载子应用的策略？

**相关题目**：
- [FB-10-SC-P-001 在微前端项目中构建工具应该如何配合设计](#FB-10-SC-P-001)
- [FB-10-CO-R-002 模块联邦的架构设计、共享依赖与版本冲突如何解决](#FB-10-CO-R-002)

**参考资源**：
- [Module Federation](https://module-federation.io/)
- [qiankun](https://qiankun.umijs.org/)

**口头回答版**：
> 微前端里每个应用应该独立构建、独立部署，产物可以用 UMD 或 SystemJS。共享依赖可以用 Module Federation 的 shared 配置，设置 singleton 和 requiredVersion，让主应用在运行时只加载一份。构建时要配置好 publicPath，确保子应用资源路径正确。
---

### FB-10-SC-P-003：如何在构建阶段实现国际化资源的分包和按需加载？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：国际化、i18n、构建分包、按需加载、动态导入
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个方案，在构建阶段实现国际化资源的分包，并在运行时按语言按需加载。

**参考答案**：
方案设计：

1. **资源组织**
   - 每种语言一个 JSON 文件，如 `locales/zh-CN.json`、`locales/en-US.json`。
   - 或按页面/模块拆分，如 `locales/zh-CN/home.json`。

2. **构建阶段分包**
   - 使用动态导入让构建工具自动将语言包拆为独立 chunk。
     ```js
     const messages = await import(`./locales/${locale}.json`);
     ```
   - Webpack 中需开启 `module.rules` 对 json 的处理；Vite 原生支持动态 import JSON。

3. **默认语言处理**
   - 默认语言可内联到主包或预加载，保证首屏不阻塞。
   - 其他语言在切换时动态加载。

4. **构建插件辅助**
   - 使用 `i18next-scanner`、`formatjs cli` 等提取翻译 key 并生成语言包。
   - 在构建时校验缺失 key、重复 key。

5. **产物优化**
   - 对 JSON 进行压缩。
   - 使用 CDN 部署语言包，减少主包体积。

6. **SSR 场景**
   - 服务端根据请求头或 cookie 加载对应语言包，同构渲染时注入。

**评分维度**：
- 设计按语言分包的策略（40%）
- 说明运行时按需加载实现（30%）
- 说明构建插件与验证机制（30%）

**常见错误**：
- 把所有语言打包进主包
- 运行时动态加载但构建时不分包，主包仍包含全部语言资源

**延伸追问**：
- 如何减少翻译 key 的重复和体积？
- SSR 场景下如何加载和注入语言包？

**相关题目**：
- [FB-10-CO-B-009 什么是代码分割](#FB-10-CO-B-009)
- [FB-10-CD-P-002 手写一个 Rollup 插件合并 JSON](#FB-10-CD-P-002)

**参考资源**：
- [Webpack Dynamic Imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports)

**口头回答版**：
> 国际化资源可以按语言拆成独立 chunk，通过动态 import 加载。默认语言可以内联或预加载，其他语言在切换时按需加载。构建时可以用 Rollup/Vite 的代码分割，也可以用插件提取翻译 key 生成 JSON，避免把全部语言打进主包。
---

### FB-10-PE-P-002：如何设计一个大型前端项目的增量构建方案？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：增量构建、大型项目、缓存、Monorepo、构建性能
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个大型前端项目的增量构建方案，覆盖开发和生产两个场景。

**参考答案**：
方案要点：

1. **开发环境增量**
   - 使用 Vite 等基于原生 ESM 的工具，只编译浏览器请求的模块。
   - HMR 只替换变更模块，不重新打包整个应用。
   - 依赖预构建缓存，避免每次启动都重新处理 node_modules。

2. **生产环境增量**
   - 使用 Webpack 5 Persistent Caching 或 Rspack Cache，缓存模块和 chunk 编译结果。
   - 在 CI 中持久化缓存目录，避免每次冷启动。
   - 使用 Monorepo 任务调度工具（Turborepo / Nx），只构建受影响的包及其下游。

3. **缓存稳定性**
   - 缓存 key 必须包含源码 hash、lockfile、构建配置、关键环境变量。
   - 依赖或配置升级时通过版本号或清空缓存强制失效。

4. **构建流水线优化**
   - 拆分为 lint / type-check / build / test 等并行任务。
   - 仅对变更文件运行单测或 e2e。
   - 使用远程缓存让团队共享构建结果。

5. **度量与监控**
   - 记录冷启动、增量构建、CI 构建时间。
   - 设置预算和告警，防止构建时间回退。

**评分维度**：
- 说明开发环境增量策略（40%）
- 说明生产环境增量策略（40%）
- 说明缓存与度量机制（20%）

**常见错误**：
- 认为增量构建只靠 Webpack cache
- 忽略 Monorepo 拓扑关系，每次都全量构建

**延伸追问**：
- 如何保证增量构建产物与全量构建一致？
- 缓存命中率低时应该从哪些方面排查？

**相关题目**：
- [FB-10-PE-A-001 如何优化 Webpack 构建速度](#FB-10-PE-A-001)
- [FB-10-EN-A-002 Monorepo 中如何设计构建任务依赖和缓存](#FB-10-EN-A-002)
- [FB-10-CO-P-008 Webpack 5 的 Persistent Caching](#FB-10-CO-P-008)

**参考资源**：
- [Turborepo Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Webpack Cache](https://webpack.js.org/configuration/cache/)

**口头回答版**：
> 增量构建分开发和生产。开发可以用 Vite 的原生 ESM 加 HMR，只编译改动的文件。生产侧要用持久化缓存、remote 缓存，Monorepo 里只构建受影响的包，配合任务调度工具。关键是缓存 key 要稳定，不然增量会失效。

---

## 架构题（44 道）{#architect}

### FB-10-SD-R-001：设计一个企业级前端构建体系。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：构建体系、工程化、Monorepo、CI/CD、构建平台
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个支持多业务线、多团队协作的企业级前端构建体系。需要覆盖开发、构建、测试、发布全流程，并说明关键技术选型和设计理由。

**参考答案**：

一、分层架构：

```
应用层（业务项目）
   ↓
工程化脚手架 / CLI
   ↓
构建工具层（Webpack/Rspack/Vite）
   ↓
基础能力层（Babel/SWC/TypeScript/eslint/stylelint）
   ↓
平台服务层（CI/CD、制品库、监控）
```

二、核心设计：

1. **统一脚手架**：
   - 封装 `create-app` CLI，内置最佳实践模板。
   - 项目配置收敛到标准配置包（如 `@company/webpack-config`），业务项目通过 `extends` 继承。

2. **构建工具选型**：
   - 新项目优先 Vite/Rspack，老项目 Webpack 5 渐进升级。
   - 组件库/工具库使用 Rollup/tsup。

3. **Monorepo 管理**：
   - 使用 pnpm workspace + Turborepo/Nx。
   - 统一依赖版本，缓存构建任务，按需执行 CI。

4. **标准化配置**：
   - browserslist 统一配置。
   - Source Map 策略按环境统一。
   - 统一的产物目录和命名规范。

5. **CI/CD 流水线**：
   - Lint/Test/Build 并行执行。
   - 构建产物上传到 CDN/对象存储。
   - 灰度发布、回滚机制。

6. **构建平台化**：
   - 提供构建产物分析、构建耗时看板、缓存命中率监控。
   - 异常构建自动告警和日志收集。

7. **安全与合规**：
   - 依赖审计（npm audit、Snyk）。
   - Source Map 不直接暴露公网。
   - 构建产物签名与完整性校验。

三、关键指标：
- 冷启动时间、HMR 时间、构建产物大小、缓存命中率、发布频率。

**评分维度**：
- 覆盖开发、构建、测试、发布全流程（40%）
- 说明关键技术选型和理由（30%）
- 提到团队协作和标准化（30%）

**常见错误**：
- 只谈技术栈，忽略团队规范和组织协同
- 追求最新工具而忽视迁移成本

**延伸追问**：
- 如何平衡统一配置和业务自定义需求？
- 不同业务线技术栈不一致时如何处理？

**参考资源**：
- [Turborepo](https://turbo.build/)
- [Nx](https://nx.dev/)

**口头回答版**：
> - 封装 create-app CLI，内置最佳实践模板。 - 项目配置收敛到标准配置包（如 @company/webpack-config），业务项目通过 extends 继承。 - 新项目优先 Vite/Rspack，老项目 Webpack 5 渐进升级。 - 组件库/工具库使用 Rollup/tsup。

---

### FB-10-CO-R-001：Monorepo 场景下的构建方案如何选型？

**题型**：概念题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：Monorepo、Turborepo、Nx、pnpm、构建缓存、任务编排
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
在 Monorepo 场景下，前端构建面临哪些挑战？请说明主流方案（如 Turborepo、Nx、Rush、pnpm workspace）的特点和选型思路。

**参考答案**：

Monorepo 构建挑战：

1. **依赖关系复杂**：包之间互相依赖，构建顺序需保证。
2. **构建重复**：大量包重复执行相同任务。
3. **CI 时间长**：变更一个包可能触发全量构建。
4. **版本管理**：包版本协调和发布流程复杂。

主流方案：

| 方案 | 特点 | 适用场景 |
|------|------|----------|
| pnpm workspace | 轻量，依赖去重和链接能力强 | 小型到中型 Monorepo |
| Turborepo | 任务编排 + 远程缓存，配置简单 | 以 npm 脚本为主的 Monorepo |
| Nx | 功能全面，图计算、代码生成、CI 集成强 | 大型 Monorepo，需要强约束 |
| Rush | 微软出品，版本策略和构建隔离严格 | 超大型企业级 Monorepo |
| Lerna | 经典工具，现多与 Nx 集成使用 | 包发布管理为主 |

选型思路：
- 团队规模小、项目少：pnpm workspace 足够。
- 追求构建速度和 CI 效率：Turborepo。
- 需要全生命周期管理（生成、测试、发布）：Nx。
- 超大规模、强流程管控：Rush。

构建优化：
- 使用 affected 机制只构建变更影响的包。
- 配置远程缓存，复用已构建产物。
- 统一构建脚本规范，便于任务编排。

**评分维度**：
- 说出 Monorepo 构建挑战（30%）
- 对比主流方案特点（40%）
- 给出选型思路和优化手段（30%）

**常见错误**：
- 认为 Monorepo 只是把多个项目放一起
- 选型只看流行度不看团队规模和需求

**延伸追问**：
- 如何解决 Monorepo 中循环依赖问题？
- 远程缓存的安全性和一致性如何保障？

**参考资源**：
- [Turborepo](https://turbo.build/)
- [Nx](https://nx.dev/)
- [Rush](https://rushjs.io/)

**口头回答版**：
> Monorepo 构建挑战： 依赖关系复杂：包之间互相依赖，构建顺序需保证。 构建重复：大量包重复执行相同任务。 CI 时间长：变更一个包可能触发全量构建。

---

### FB-10-CO-R-002：模块联邦的架构设计、共享依赖与版本冲突如何解决？

**题型**：概念题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：Module Federation、共享依赖、版本冲突、架构设计、微前端
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请从架构师角度设计一套基于 Webpack Module Federation 的微前端方案，重点说明共享依赖的管理、版本冲突的解决策略以及降级方案。

**参考答案**：

一、架构设计：

1. **基座应用（Host）**：
   - 负责路由调度、公共依赖共享、子应用注册与加载。
   - 提供统一的运行时配置和公共组件。

2. **子应用（Remote）**：
   - 独立构建、独立部署。
   - 暴露业务模块，消费基座共享依赖。

3. **共享依赖层**：
   - React/Vue、路由、状态管理、组件库、工具函数等统一通过 shared 声明。

二、共享依赖策略：

```js
new ModuleFederationPlugin({
  name: 'host',
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0', eager: true },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' }
  }
});
```

- `singleton: true`：所有应用共享单例，避免多实例。
- `requiredVersion`：声明兼容版本范围。
- `eager: true`：在初始化时立即加载，避免异步竞态。

三、版本冲突解决：

1. **统一版本约束**：
   - 在基座和子应用间约定主版本一致（如 React 18.x）。
   - 使用 lockfile 和依赖校验脚本。

2. **运行时版本匹配**：
   - Module Federation 按 `requiredVersion` 和实际版本决定使用哪个共享实例。
   - 版本不兼容时降级为使用子应用自带版本（非 singleton 时）。

3. **版本隔离**：
   - 对不兼容版本不提供 singleton，允许子应用独立加载。

4. **构建时校验**：
   - CI 中检查 shared 依赖版本是否冲突。

四、降级方案：

1. **MF 加载失败时回退到独立加载子应用完整 bundle。**
2. **关键页面提供非 MF 的独立部署版本。**
3. **监控远程入口加载成功率，异常时告警并自动切换。**

**评分维度**：
- 说明 Host/Remote 架构和 shared 配置（40%）
- 解释版本冲突解决策略（30%）
- 提到降级和监控（30%）

**常见错误**：
- 认为 Module Federation 能解决所有版本问题
- 忽略 singleton 导致多实例 React 错误

**延伸追问**：
- 如何在运行时动态注册 Remote？
- Module Federation 与 SSR 如何结合？

**相关题目**：
- [FB-10-CO-P-001 Module Federation 原理](#FB-10-CO-P-001)
- [FB-10-SC-P-001 微前端构建设计](#FB-10-SC-P-001)

**参考资源**：
- [Module Federation Shared API](https://webpack.js.org/plugins/module-federation-plugin/)

**口头回答版**：
> 基座应用（Host）： - 负责路由调度、公共依赖共享、子应用注册与加载。 - 提供统一的运行时配置和公共组件。 子应用（Remote）：

---

### FB-10-SC-R-001：设计一个支持多环境、多团队的前端构建平台。

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：构建平台、多环境、多团队、CI/CD、构建服务
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个面向公司多个前端团队、支持 dev/test/staging/prod 多环境的构建平台。需要支持项目接入、构建触发、产物管理和环境配置。

**参考答案**：

一、平台能力分层：

```
接入层：Git Webhook、Open API、Web 控制台
调度层：构建任务队列、资源调度、并发控制
执行层：构建容器/Runner、缓存挂载、环境隔离
存储层：产物存储、Source Map 托管、元数据
展示层：构建日志、产物分析、告警通知
```

二、核心功能设计：

1. **项目接入**：
   - 标准化项目模板和 `build.config.js`。
   - 自动识别构建工具（Webpack/Vite/Rollup）。

2. **多环境配置管理**：
   - 每个环境独立的环境变量集合。
   - 配置加密存储，构建时注入，不落地到产物。

3. **构建触发**：
   - Git 提交自动触发、手动触发、定时触发。
   - 支持分支策略（如 main → prod、release/* → staging）。

4. **构建执行**：
   - 容器化构建，保证环境一致性。
   - 缓存 `node_modules` 和构建缓存目录。
   - 大项目支持分布式构建。

5. **产物管理**：
   - 产物按版本/环境/分支归档。
   - 支持产物对比、回滚、灰度发布。
   - Source Map 单独上传错误监控平台。

6. **安全与审计**：
   - 构建日志和产物签名。
   - 依赖安全扫描。
   - 操作审计和权限控制。

三、关键设计点：

- **构建缓存复用**：同一项目不同分支可共享未变更的缓存。
- **环境隔离**：不同环境使用不同容器镜像和网络策略。
- **降级策略**：构建失败自动重试，关键路径支持人工介入。

**评分维度**：
- 覆盖接入、触发、执行、产物管理等核心功能（40%）
- 说明多环境和安全设计（30%）
- 提到缓存、隔离、降级等架构设计（30%）

**常见错误**：
- 把构建平台等同于简单 CI 脚本
- 忽略环境变量安全和产物版本管理

**延伸追问**：
- 如何防止不同团队的构建任务互相影响？
- 构建平台如何支持快速回滚？

**参考资源**：
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitLab CI/CD](https://docs.gitlab.com/ee/ci/)

**口头回答版**：
> - 标准化项目模板和 build.config.js。 - 自动识别构建工具（Webpack/Vite/Rollup）。 - 每个环境独立的环境变量集合。 - 配置加密存储，构建时注入，不落地到产物。

---

### FB-10-CO-R-003：Rspack、Parcel、Turbopack 等下一代构建工具的架构有何异同？

**题型**：概念题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：Rspack、Parcel、Turbopack、下一代构建工具、Rust、增量构建
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请对比 Rspack、Parcel、Turbopack 这三种下一代构建工具的架构思路和适用场景。

**参考答案**：

一、Rspack：

- **定位**：兼容 Webpack 生态的高性能构建工具。
- **语言**：Rust。
- **架构思路**：
  - 核心打包逻辑用 Rust 重写，保持 Webpack 的 Loader/Plugin API 兼容。
  - 支持增量构建和持久化缓存。
- **适用场景**：已有 Webpack 大型项目渐进式迁移。

二、Parcel：

- **定位**：零配置构建工具。
- **语言**：Rust（v2 起核心使用 Rust）。
- **架构思路**：
  - 默认配置开箱即用，强调"约定优于配置"。
  - 使用统一插件系统和内容哈希缓存。
  - 支持多核并行和按需编译。
- **适用场景**：中小型项目、快速原型、对配置敏感的场景。

三、Turbopack：

- **定位**：Vercel 推出的下一代 Webpack 替代者，与 Next.js 深度集成。
- **语言**：Rust。
- **架构思路**：
  - 基于函数式增量计算引擎，按需编译。
  - 开发环境极快，HMR 性能突出。
  - 目前主要服务于 Next.js，通用性还在发展中。
- **适用场景**：Next.js 项目、追求极致开发体验。

异同对比：

| 维度 | Rspack | Parcel | Turbopack |
|------|--------|--------|-----------|
| 兼容性 | 兼容 Webpack | 零配置自有生态 | 深度集成 Next.js |
| 配置方式 | 类 Webpack 配置 | 零配置为主 | 框架驱动 |
| 生态成熟度 | 快速追赶 | 中等 | 较新 |
| 迁移成本 | 低 | 中 | 高（若脱离 Next.js） |

**评分维度**：
- 分别说明三种工具的定位和架构（40%）
- 对比语言、兼容性、配置方式（30%）
- 给出适用场景建议（30%）

**常见错误**：
- 认为 Turbopack 已完全替代 Webpack
- 忽略 Rspack 的 Webpack 兼容优势

**延伸追问**：
- 在现有 Webpack 项目中如何评估迁移到 Rspack 的成本？
- 下一代构建工具会完全统一吗？为什么？

**参考资源**：
- [Rspack](https://www.rspack.dev/)
- [Parcel](https://parceljs.org/)
- [Turbopack](https://turbo.build/pack)

**口头回答版**：
> - 定位：兼容 Webpack 生态的高性能构建工具。 - 语言：Rust。 - 核心打包逻辑用 Rust 重写，保持 Webpack 的 Loader/Plugin API 兼容。 - 支持增量构建和持久化缓存。

---

### FB-10-SD-R-002：设计一个前端产物发布与回滚系统。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：产物发布、回滚、CDN、版本管理、灰度发布
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端产物发布与回滚系统，要求支持版本管理、灰度发布、快速回滚，并说明构建产物如何与发布系统协同。

**参考答案**：

一、系统组成：

```
构建系统 → 产物仓库 → 发布控制台 → CDN/边缘节点 → 终端用户
                ↓
         元数据服务（版本、映射、灰度规则）
```

二、核心功能：

1. **产物版本管理**：
   - 每次构建生成唯一版本号（如 git commit hash + build id）。
   - 产物按版本归档，保留历史版本。
   - HTML 入口与静态资源版本解耦。

2. **发布流程**：
   - 预发布环境验证 → 灰度发布 → 全量发布。
   - 发布时更新 HTML 入口指向新版本静态资源。

3. **灰度发布**：
   - 按用户 ID、地域、设备、Cookie、Header 等维度灰度。
   - 通过边缘计算或网关层路由到不同版本。

4. **快速回滚**：
   - 一键将 HTML 入口指向上一个稳定版本。
   - 静态资源使用 contenthash，旧版本资源仍在 CDN 缓存中可用。

5. **监控与告警**：
   - 发布期间监控错误率、性能指标、业务指标。
   - 异常自动熔断或人工回滚。

三、构建产物协同：

1. **HTML 不缓存/短缓存**：
   - 确保用户能获取最新入口。

2. **静态资源长期缓存**：
   - JS/CSS/图片使用 contenthash，发布后长期有效。

3. **Source Map 托管**：
   - 不随产物发布到公网，单独上传到监控平台。

4. **产物校验**：
   - 构建完成后生成产物清单（manifest），发布时校验完整性。

**评分维度**：
- 覆盖版本管理、灰度、回滚核心流程（40%）
- 说明构建产物与发布的协同（30%）
- 提到监控和自动化策略（30%）

**常见错误**：
- 回滚时需要重新构建旧版本产物
- HTML 文件也配置长期缓存导致无法回滚

**延伸追问**：
- 如何实现前端版本的蓝绿发布？
- 如果 CDN 缓存了错误版本，如何快速清除？

**参考资源**：
- [Front-End Deployment Best Practices](https://frontendmastery.com/posts/front-end-deployment/)

**口头回答版**：
> - 每次构建生成唯一版本号（如 git commit hash + build id）。 - 产物按版本归档，保留历史版本。 - HTML 入口与静态资源版本解耦。 - 预发布环境验证 → 灰度发布 → 全量发布。

---

### FB-10-CO-R-004：前端构建产物安全与供应链安全如何保障？

**题型**：概念题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：构建安全、供应链安全、Source Map、依赖审计、SRI
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请从前端构建和产物角度，说明如何保障前端应用的安全，包括供应链安全和运行时安全。

**参考答案**：

一、供应链安全：

1. **依赖管理**：
   - 使用 lockfile（package-lock.json / yarn.lock / pnpm-lock.yaml）锁定版本。
   - 私有 npm 仓库 + 依赖白名单。

2. **依赖审计**：
   - 定期运行 `npm audit`、Snyk、Dependabot。
   - CI 中阻断高危漏洞依赖上线。

3. **构建环境安全**：
   - 构建容器隔离，固定基础镜像。
   - 构建日志审计，禁止非法网络请求。

4. **代码签名**：
   - 关键依赖或产物进行签名验证。

二、产物安全：

1. **Source Map 保护**：
   - 生产环境不直接暴露 Source Map。
   - 上传到内部错误监控平台。

2. **内容安全策略（CSP）**：
   - 配置 CSP 头，限制脚本加载来源。

3. **Subresource Integrity（SRI）**：
   - 为 CDN 资源添加 integrity 属性，防止篡改。
   ```html
   <script src="https://cdn.example.com/app.js" integrity="sha384-..."></script>
   ```

4. **环境变量安全**：
   - 敏感密钥不写入前端代码。
   - 构建时注入的环境变量要审计。

5. **产物扫描**：
   - 构建后对产物进行敏感信息扫描（AK/SK、内网地址等）。

三、运行时安全：

1. **XSS 防护**：输出转义、CSP。
2. **HTTPS/TLS**：全站 HTTPS。
3. **权限最小化**：前端权限校验只作为体验优化，核心校验在服务端。

**评分维度**：
- 覆盖供应链安全（40%）
- 覆盖产物安全（40%）
- 提到运行时安全（20%）

**常见错误**：
- 认为前端代码不需要考虑安全
- 将密钥直接通过环境变量注入前端

**延伸追问**：
- 如何发现 npm 包被投毒？
- 构建产物被篡改如何检测？

**参考资源**：
- [SRI - MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [CSP - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

**口头回答版**：
> - 使用 lockfile（package-lock.json / yarn.lock / pnpm-lock.yaml）锁定版本。 - 私有 npm 仓库 + 依赖白名单。 - 定期运行 npm audit、Snyk、Dependabot。 - CI 中阻断高危漏洞依赖上线。

---

### FB-10-EN-R-001：CI/CD 中的构建优化与并行化策略。

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：CI/CD、并行构建、缓存、分布式构建、构建流水线
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何在 CI/CD 流水线中优化前端构建，缩短整体交付时间，并说明并行化和缓存策略。

**参考答案**：

一、CI 构建优化：

1. **依赖安装优化**：
   - 使用 pnpm 提升安装速度。
   - CI 缓存 `node_modules` 或 pnpm store。
   - 使用 `--frozen-lockfile` 保证一致性。

2. **构建缓存**：
   - 持久化 Webpack/Vite/eslint 缓存目录。
   - Turborepo/Nx 远程缓存复用。

3. **并行化任务**：
   - Lint、Test、Build 并行执行。
   - 多应用项目按 affected 范围并行构建。

4. **增量构建**：
   - 只构建变更影响的包或应用。
   - 利用 Git diff 计算 affected 范围。

5. **产物并行上传**：
   - 构建完成后并行上传到 CDN/对象存储。

6. **容器资源优化**：
   - 根据项目大小分配 CPU/内存。
   - 大项目使用分布式构建或更大规格 Runner。

二、流水线设计示例：

```yaml
stages:
  - install
  - lint
  - test
  - build
  - deploy

install:
  cache:
    paths:
      - node_modules/
      - .turbo/

build:
  script:
    - pnpm turbo run build --filter=[HEAD^1]
```

三、关键指标：
- Pipeline 总时长、缓存命中率、构建成功率、回滚耗时。

**评分维度**：
- 覆盖依赖安装、构建缓存、并行化（40%）
- 说明增量构建和 affected 机制（30%）
- 提到容器资源和指标（30%）

**常见错误**：
- 所有任务串行执行
- 缓存目录配置错误导致缓存失效

**延伸追问**：
- 远程缓存出现不一致怎么办？
- 如何设计 CI 构建的降级和重试策略？

**参考资源**：
- [GitHub Actions Caching](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [Turborepo Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)

**口头回答版**：
> 一、CI 构建优化： - 使用 pnpm 提升安装速度。 - CI 缓存 node_modules 或 pnpm store。 - 使用 --frozen-lockfile 保证一致性。

---

### FB-10-CP-R-001：如何评估和迁移前端构建工具？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：构建工具迁移、评估、ROI、风险管理、渐进式迁移
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
你所在团队计划将现有 Webpack 项目迁移到新的构建工具（如 Vite 或 Rspack）。请说明你的评估思路和迁移策略。

**参考答案**：

一、评估维度：

| 维度 | 评估内容 |
|------|----------|
| 构建速度 | 冷启动、HMR、生产构建耗时对比 |
| 生态兼容性 | Loader/Plugin、自定义逻辑是否能迁移 |
| 产物质量 | 包大小、Tree Shaking、Source Map |
| 团队成本 | 学习曲线、配置改造成本、维护成本 |
| 稳定性 | 社区活跃度、企业背书、 issue 响应 |
| 长期演进 | 是否匹配团队技术战略 |

二、迁移策略：

1. **POC 验证**：
   - 选择典型项目做 Proof of Concept，量化对比数据。

2. **渐进式迁移**：
   - 先在新项目或独立包上试用。
   - 老项目分模块、分环境迁移，避免大爆炸式重构。

3. **兼容性适配**：
   - 列出所有自定义 Webpack Plugin/Loader 的替代方案。
   - 对无法直接替代的能力，评估二次开发成本。

4. **双轨运行**：
   - 迁移期间保留原构建能力，新工具并行验证。
   - 通过 feature flag 或分支切换构建工具。

5. **回滚预案**：
   - 保留原配置和构建脚本。
   - 关键指标异常时快速回滚。

6. **团队赋能**：
   - 编写迁移文档、培训、最佳实践。

三、决策建议：
- 若追求兼容和低迁移成本：选 Rspack。
- 若追求现代化体验和愿意改造：选 Vite。
- 若项目极度复杂且生态依赖深：谨慎迁移，优先局部优化。

**评分维度**：
- 评估维度全面（40%）
- 迁移策略稳健、可落地（40%）
- 能说明风险控制和回滚方案（20%）

**常见错误**：
- 只看构建速度，忽略生态和团队成本
- 一次性全量迁移所有项目

**延伸追问**：
- 迁移后如何确保产物行为一致？
- 如何向团队证明迁移的 ROI？

**参考资源**：
- [Rspack Migration](https://www.rspack.dev/guide/migration/webpack)
- [Vite Migration from Webpack](https://vitejs.dev/guide/backend-integration.html)

**口头回答版**：
> | 维度 | 评估内容 | |------|----------| | 构建速度 | 冷启动、HMR、生产构建耗时对比 | | 生态兼容性 | Loader/Plugin、自定义逻辑是否能迁移 |

---

### FB-10-SD-R-003：设计一个前端组件库/Monorepo 的构建与发布流程。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：组件库、Monorepo、构建发布、Rollup、Changesets、语义化版本
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端组件库的 Monorepo 构建与发布流程，包括目录结构、构建输出、版本管理和 CI 发布流程。

**参考答案**：

一、目录结构：

```
packages/
  core/          # 核心工具
  components/    # 组件库
  theme/         # 主题样式
  docs/          # 文档站点
playground/      # 调试场
```

二、构建输出：

1. **组件库打包**：
   - 使用 Rollup 或 tsup 输出：
     - `es/`：ES Module，供 Tree Shaking。
     - `lib/`：CommonJS，供 Node 端/SSR。
     - `dist/`：UMD/IIFE，供 CDN 直接引用。
   - CSS 单独提取或按需引入。

2. **类型定义**：
   - 输出 `.d.ts` 文件。
   - 使用 `tsc` 或 `rollup-plugin-dts` 生成。

3. **package.json 字段**：
   ```json
   {
     "main": "lib/index.js",
     "module": "es/index.js",
     "types": "es/index.d.ts",
     "sideEffects": ["*.css", "*.less"]
   }
   ```

三、版本管理：

1. **Changesets**：
   - 每次变更提交一个 changeset 文件，记录改动类型（major/minor/patch）。
   - CI 中自动聚合生成 CHANGELOG 和版本号。

2. **语义化版本（Semver）**：
   - 严格遵循 breaking change → major、feature → minor、fix → patch。

四、CI 发布流程：

1. PR 阶段：
   - Lint、Type Check、Unit Test、Build。
   - 要求提交 changeset。

2. 合并主分支后：
   - Version PR：自动更新版本和 CHANGELOG。
   - 审核后合并触发发布。

3. 发布阶段：
   - 构建所有包。
   - 按拓扑顺序发布到 npm（ Changesets + pnpm publish）。
   - 发布文档站点。

五、关键设计点：

- **按需引入**：组件库支持 babel-plugin-import / unplugin-vue-components 等按需引入方案。
- **样式处理**：CSS 变量 + 主题文件，支持定制主题。
- **文档与示例**：VitePress / Storybook / Dumi。

**评分维度**：
- 目录结构和构建输出合理（30%）
- 版本管理和发布流程清晰（40%）
- 提到按需引入、主题、文档等细节（30%）

**常见错误**：
- 只输出一种模块格式
- 手动管理版本号导致混乱

**延伸追问**：
- 如何处理组件库 breaking change 的升级路径？
- 如何验证组件库在不同框架版本下的兼容性？

**参考资源**：
- [Changesets](https://github.com/changesets/changesets)
- [tsup](https://tsup.egoist.dev/)

**口头回答版**：
> - 使用 Rollup 或 tsup 输出： - es/：ES Module，供 Tree Shaking。 - lib/：CommonJS，供 Node 端/SSR。 - dist/：UMD/IIFE，供 CDN 直接引用。

---

### FB-10-SD-R-004：设计一个企业级前端构建产物质量门禁体系

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：质量门禁、构建产物、CI/CD、安全、性能、工程化
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个企业级前端构建产物质量门禁体系，确保上线产物符合性能、安全、规范等要求。

**参考答案**：
体系设计：

1. **构建时检查**
   - 代码规范：ESLint / StyleLint / Prettier。
   - 类型检查：TypeScript / vue-tsc。
   - 单元测试：覆盖率阈值。
   - 依赖审计：`npm audit`、license 合规检查。

2. **产物检查**
   - 体积预算：使用 `bundlesize`、`bundlewatch` 或自研脚本设置总包 / initial chunk 阈值。
   - 重复依赖检测：防止同库多版本打包。
   - 资源检查：图片、字体大小上限，是否使用 CDN。
   - Source Map 完整性：确保能正确映射到监控平台。

3. **安全与合规**
   - 敏感信息扫描：防止 API Key、内网地址泄露。
   - 供应链安全：漏洞扫描、SBOM 生成。
   - CSP / SRI 校验。

4. **流程集成**
   - 所有检查嵌入 CI/CD，失败即阻断流水线。
   - 生成质量报告，推送到 IM 或看板。
   - 对历史遗留项目设置宽限期和渐进式收敛策略。

**评分维度**：
- 覆盖构建时与产物侧检查维度（40%）
- 说明安全、性能、规范等具体检查项（40%）
- 说明流程集成与阻断机制（20%）

**常见错误**：
- 只检查构建是否成功，忽略产物质量
- 门禁阈值过严导致团队无法交付

**延伸追问**：
- 如何处理历史遗留的大依赖包？
- 如何防止门禁被绕过或流于形式？

**相关题目**：
- [FB-10-EN-R-001 CI/CD 中的构建优化与并行化策略](#FB-10-EN-R-001)
- [FB-10-PE-P-002 如何设计一个大型前端项目的增量构建方案](#FB-10-PE-P-002)

**参考资源**：
- [bundlesize](https://github.com/siddharthkp/bundlesize)
- [bundlewatch](https://github.com/bundlewatch/bundlewatch)

**口头回答版**：
> 质量门禁要在构建和产物两个阶段做检查。构建时跑 lint、类型检查、单测；产物侧检查体积预算、重复依赖、安全漏洞、sourcemap 完整性。超阈值就阻断流水线，并把报告推送到群里或看板。
---

### FB-10-SD-R-005：设计一个支持多构建工具统一配置的前端工程平台

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：工程平台、构建工具、统一配置、Webpack、Vite、Rspack
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个支持 Webpack、Vite、Rollup、Rspack 等多种构建工具的统一前端工程配置平台。

**参考答案**：
平台架构：

1. **抽象配置模型**
   - 定义统一的领域模型：entry、output、loaders/transforms、plugins、devServer、optimization、env、assets。
   - 使用 JSON Schema 或 TypeScript 类型约束，保证配置可校验。

2. **多构建工具适配层**
   - 为每种工具实现 Adapter，将统一模型翻译为具体配置。
   - Webpack Adapter：生成 webpack config。
   - Vite Adapter：生成 vite config + 插件。
   - Rollup Adapter：生成 rollup config。
   - Rspack Adapter：复用 Webpack Adapter 大部分逻辑，处理差异点。

3. **预设与插件市场**
   - 提供官方预设：`web-app`、`library`、`micro-frontend`、`ssr`。
   - 支持项目级插件注册和覆盖。

4. **CLI / GUI**
   - 提供命令行工具创建、构建、调试项目。
   - 提供配置可视化界面，降低使用门槛。

5. **可扩展与逃生通道**
   - 允许项目通过 `overrides` 直接修改最终配置。
   - 记录版本化 schema，保证升级可平滑迁移。

6. **度量与灰度**
   - 统一收集构建时间、产物体积、错误率。
   - 支持按项目灰度切换构建工具。

**评分维度**：
- 抽象统一的配置模型（40%）
- 说明多工具适配层设计（30%）
- 说明可扩展性与灰度机制（30%）

**常见错误**：
- 强制统一导致项目无法定制
- 适配层只支持简单配置，无法覆盖高级场景

**延伸追问**：
- 如何处理各构建工具能力差异？
- 如何进行灰度切换和回滚？

**相关题目**：
- [FB-10-CP-R-001 如何评估和迁移前端构建工具](#FB-10-CP-R-001)
- [FB-10-CO-R-003 Rspack、Parcel、Turbopack 等下一代构建工具的架构有何异同](#FB-10-CO-R-003)

**参考资源**：
- [Backstage](https://backstage.io/)
- [Nx](https://nx.dev/)

**口头回答版**：
> 统一配置平台要先把常用构建能力抽象成一套 schema，比如入口、输出、loader、优化项。然后针对 Webpack、Vite、Rspack 写适配器，把 schema 翻译成各自配置。平台还要支持预设模板、插件市场和项目级覆盖，保证既能统一也能灵活。
---

### FB-10-CO-R-005：如何设计跨团队的前端构建规范与最佳实践？

**题型**：概念题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：跨团队、构建规范、最佳实践、工程化、组织治理
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
在大型组织中，如何制定和推广前端构建规范与最佳实践？

**参考答案**：
推广策略：

1. **规范内容**
   - 统一构建工具版本和升级节奏。
   - 统一的 browserslist、polyfill、Source Map 策略。
   - 统一的构建产物目录、hash 策略、缓存策略。
   - 统一的 bundle budget、性能基线。

2. **组织机制**
   - 成立前端工程化委员会或平台团队作为规范 owner。
   - 通过 RFC / ADR 记录决策过程。
   - 建立代码审查清单，把规范纳入 MR/PR 检查。

3. **工具化落地**
   - 提供脚手架、CLI、共享配置包（如 `@org/webpack-config`）。
   - 在 CI 中内置规范检查，不合规自动阻断。

4. **培训与反馈**
   - 定期培训、技术分享、 office hours。
   - 建立反馈渠道，根据团队痛点迭代规范。

5. **度量与激励**
   - 构建健康度看板：构建时间、产物体积、合规率。
   - 树立标杆项目，推广优秀实践。
   - 对遗留项目设置宽限期，渐进式收敛。

**评分维度**：
- 规范内容全面（40%）
- 组织机制与推广手段合理（40%）
- 度量反馈机制（20%）

**常见错误**：
- 一次性强制所有项目改造
- 规范过于理想化，脱离业务实际

**延伸追问**：
- 如何处理遗留项目对规范的抵触？
- 如何平衡统一规范与团队自主性？

**相关题目**：
- [FB-10-EN-R-001 CI/CD 中的构建优化与并行化策略](#FB-10-EN-R-001)
- [FB-10-CP-R-001 如何评估和迁移前端构建工具](#FB-10-CP-R-001)

**参考资源**：
- [Team Topologies](https://teamtopologies.com/)

**口头回答版**：
> 先成立一个负责工程化的团队，制定基础规范，比如统一的 browserslist、构建工具版本、体积预算和缓存策略。然后通过脚手架、CLI、文档和培训推广。还要建立度量看板，看各项目构建时间、体积、合规率，逐步推进而不是一刀切。
---

### FB-10-CO-R-006：前端构建体系的演进路线应如何规划？

**题型**：概念题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：构建体系、演进路线、Webpack、Rspack、Vite、迁移
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请结合从 Webpack 到 Rspack/Vite 的迁移，谈谈前端构建体系的演进路线应如何规划。

**参考答案**：
演进路线：

1. **现状评估**
   - 建立基线指标：开发启动时间、HMR 时间、生产构建时间、产物体积、CI 时间。
   - 梳理当前自定义 loader、plugin、配置复杂度。

2. **试点项目**
   - 选择风险低、代表性强的项目先行试点。
   - 验证功能兼容性、构建产物等价性、调试体验。

3. **兼容层封装**
   - 对自定义 loader/plugin 做抽象封装，降低直接依赖具体工具。
   - 提供统一的配置 API，减少迁移时的配置重写。

4. **渐进迁移**
   - 先切换开发环境，验证 HMR 和开发体验。
   - 再切换生产构建，双跑对比产物。
   - 最后下线旧工具链。

5. **风险与回滚**
   - 关注插件兼容性、source map、SSR、测试环境行为差异。
   - 保留回滚能力，关键阶段设置里程碑评审。

6. **团队赋能**
   - 文档、培训、FAQ。
   - 建立迁移收益度量，持续跟踪。

**评分维度**：
- 演进阶段清晰（40%）
- 迁移策略可行（30%）
- 风险识别与团队赋能（30%）

**常见错误**：
- 直接全量替换构建工具
- 忽略团队学习成本和自定义工具链迁移

**延伸追问**：
- 如何验证新旧构建产物等价？
- 迁移后如何快速回滚？

**相关题目**：
- [FB-10-CP-R-001 如何评估和迁移前端构建工具](#FB-10-CP-R-001)
- [FB-10-CO-R-003 Rspack、Parcel、Turbopack 等下一代构建工具的架构有何异同](#FB-10-CO-R-003)
- [FB-10-SD-R-005 设计一个支持多构建工具统一配置的前端工程平台](#FB-10-SD-R-005)

**参考资源**：
- [Rspack Migration Guide](https://www.rspack.dev/guide/migration/webpack.html)

**口头回答版**：
> 演进要先评估现状，定好构建时间、兼容性这些基线。先挑低风险项目试点，兼容层封装好自定义 loader 和 plugin，先切开发再切生产。迁移过程中要双跑验证产物一致性，培训团队，逐步下线老工具。
---

### FB-10-SC-R-002：设计一个支持 A/B 测试的前端构建与发布方案

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：A/B 测试、构建、发布、特性开关、灰度、边缘计算
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个支持 A/B 测试的前端构建与发布方案，使同一份代码能按流量投放不同版本。

**参考答案**：
方案设计：

1. **构建变体**
   - 使用构建时特性开关（DefinePlugin / `import.meta.env`）注入不同配置。
   - 构建多个产物版本，如 `variant-a`、`variant-b`。
   - 每个版本资源独立命名，避免缓存串扰。

2. **流量切分**
   - 边缘计算：Cloudflare Workers / Lambda@Edge / Vercel Edge Config 根据用户分组返回不同版本 HTML。
   - 服务端渲染时根据请求头/cookie 决定注入哪个版本的脚本标签。
   - 运行时特性标志：LaunchDarkly 等，适合简单 UI 实验。

3. **用户分组**
   - 按用户 ID、设备、地区等稳定哈希分组，保证同一用户始终看到同一版本。
   - 避免基于会话随机分配，否则体验不稳定。

4. **发布与回滚**
   - 通过 CDN 或对象存储分别托管各版本产物。
   - 配置流量比例，支持快速切换或回滚。

5. **数据埋点**
   - 每个版本注入唯一版本号，确保埋点、性能指标、错误监控可按版本拆分。

**评分维度**：
- 构建变体设计合理（40%）
- 流量切分策略可行（30%）
- 发布回滚与数据拆分完整（30%）

**常见错误**：
- 运行时同时加载两个版本的完整代码
- 流量分组不可复现，导致实验结果不可信

**延伸追问**：
- 如何防止 A/B 测试影响 CDN 缓存命中率？
- A/B 测试对 SEO 有什么影响，如何解决？

**相关题目**：
- [FB-10-EN-R-001 CI/CD 中的构建优化与并行化策略](#FB-10-EN-R-001)
- [FB-10-SD-R-002 设计一个前端产物发布与回滚系统](#FB-10-SD-R-002)

**参考资源**：
- [LaunchDarkly](https://launchdarkly.com/)
- [Vercel Edge Config](https://vercel.com/docs/storage/edge-config)

**口头回答版**：
> A/B 测试方案可以通过构建时注入不同特性开关，产出多个版本产物。流量侧用 CDN 或边缘计算根据用户分组返回不同版本，也可以在运行时通过特性开关控制。要注意版本资源独立、回滚机制和分组一致性，避免缓存串版。
---

### FB-10-SC-R-003：设计一个前端依赖治理与构建安全审计流程

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：依赖治理、供应链安全、构建安全、审计、CI/CD
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端依赖治理与构建安全审计流程，防止供应链攻击和不安全依赖进入产物。

**参考答案**：
流程设计：

1. **依赖准入**
   - 统一使用私有 npm registry 或代理。
   - 新依赖引入需经过审批和安全性评估。
   - 固定版本 + lockfile，禁止随意使用 `latest`。

2. **持续扫描**
   - CI 中运行 `npm audit`、Snyk、Socket.dev、Retire.js 等扫描工具。
   - 检查已知漏洞、过期依赖、许可证合规性。
   - 生成 SBOM（Software Bill of Materials）。

3. **构建时审计**
   - 校验 lockfile 完整性，防止被篡改。
   - 校验安装包 checksum，防止中间人攻击。
   - 限制 `postinstall` 脚本执行或沙箱化。

4. **产物审计**
   - 扫描产物中是否包含敏感信息、内网地址。
   - 检查是否引入了未声明的依赖。

5. **响应机制**
   - 建立漏洞分级和修复 SLA。
   - 自动化创建升级 PR，关键漏洞强制阻断发布。

6. **治理文化**
   - 定期清理无用依赖。
   - 建立依赖 owner 和升级计划。

**评分维度**：
- 依赖准入与持续扫描（40%）
- 构建时与产物安全审计（40%）
- 响应与治理机制（20%）

**常见错误**：
- 只在项目初始化时做一次审计
- 忽略 lockfile 安全和 install 脚本风险

**延伸追问**：
- 如何处理零日漏洞？
- 如何平衡安全升级与业务交付节奏？

**相关题目**：
- [FB-10-CO-R-004 前端构建产物安全与供应链安全如何保障](#FB-10-CO-R-004)
- [FB-10-EN-R-001 CI/CD 中的构建优化与并行化策略](#FB-10-EN-R-001)

**参考资源**：
- [Snyk](https://snyk.io/)
- [Socket.dev](https://socket.dev/)

**口头回答版**：
> 依赖治理要从准入抓起，统一使用私有镜像和审批流程。CI 里跑 npm audit、Snyk 这类扫描，生成 SBOM，检查许可证和漏洞。构建时校验 lockfile 和包完整性，限制 install 脚本。还要定期审计，制定升级和应急响应流程。
---

### FB-10-EN-R-002：如何设计前端构建的标准化流水线？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：CI/CD、流水线、标准化、构建、测试、部署
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个覆盖开发、构建、测试、部署各环节的前端构建标准化流水线。

**参考答案**：
流水线设计：

1. **代码提交阶段**
   - pre-commit hooks：lint、format、类型检查。
   - CI 触发：MR/PR 时运行完整检查。

2. **安装与依赖校验**
   - 校验 lockfile 与 package.json 一致性。
   - 使用镜像源加速安装。

3. **构建阶段**
   - 统一构建命令和产物目录。
   - 启用构建缓存（本地/远程）。
   - 注入环境变量和版本信息。

4. **测试阶段**
   - 并行运行单元测试、e2e 测试、视觉回归。
   - 仅对变更文件运行相关测试以提速。

5. **产物门禁**
   - 体积预算、重复依赖、安全扫描、source map 检查。

6. **部署阶段**
   - 部署到 staging，运行冒烟测试。
   - 灰度到生产，支持快速回滚。
   - 上传 source map 到错误监控平台。

7. **可观测与反馈**
   - 构建时间、成功率、产物体积趋势。
   - 失败通知与日志聚合。

**评分维度**：
- 流程阶段完整（40%）
- 缓存与并行优化（30%）
- 质量门禁与可观测（30%）

**常见错误**：
- 构建和测试串行执行导致流水线过慢
- 缺少部署后验证和回滚能力

**延伸追问**：
- 如何实现多环境配置管理？
- 如何设计一键回滚机制？

**相关题目**：
- [FB-10-EN-R-001 CI/CD 中的构建优化与并行化策略](#FB-10-EN-R-001)
- [FB-10-SD-R-004 设计一个企业级前端构建产物质量门禁体系](#FB-10-SD-R-004)

**参考资源**：
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitLab CI](https://docs.gitlab.com/ee/ci/)

**口头回答版**：
> 标准化流水线包括代码提交后的 lint、类型检查，安装依赖时校验 lockfile，构建用缓存，并行跑单测和 e2e，然后做安全扫描和产物门禁。部署到 staging 做冒烟测试，再灰度到生产，最后监控和可回滚。要用模板化 CI 和制品库保证一致性。
---

### FB-10-CP-R-002：前端构建工具选型时需要做哪些 POC 和迁移风险评估？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：构建工具选型、POC、迁移风险、评估、工程化
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
前端构建工具选型时，需要做哪些 POC？迁移风险评估应关注哪些方面？

**参考答案**：
POC 维度：

1. **性能对比**
   - 开发启动时间、HMR 时间、生产构建时间、产物体积。

2. **兼容性验证**
   - 现有 loader/plugin 是否有替代方案。
   - 自定义 loader/plugin 迁移成本。
   - 框架（React/Vue）、SSR、测试环境的兼容性。

3. **功能覆盖**
   - Source Map 质量、代码分割、动态导入、静态资源处理、环境变量注入。

4. **生态与长期维护**
   - 社区活跃度、官方维护情况、版本发布节奏、主要使用者。

5. **团队成本**
   - 学习曲线、配置复杂度、调试体验、文档完善度。

风险评估：

- **功能缺失风险**：新工具不支持现有特殊需求。
- **迁移成本风险**：自定义工具链改造成本高。
- **稳定性风险**：新工具版本迭代快，存在 breaking change。
- **CI/CD 风险**：构建环境、缓存、产物路径变化。
- **回滚风险**：上线后发现问题能否快速回滚。

决策方法：

- 制定评分卡，量化各维度得分。
- 先试点再推广，设置明确的通过标准。

**评分维度**：
- POC 维度全面（50%）
- 风险识别到位（30%）
- 决策方法合理（20%）

**常见错误**：
- 只看构建速度，忽略测试和调试影响
- 没有明确通过标准就全量推广

**延伸追问**：
- 如何设计灰度切换方案？
- 如何量化迁移收益？

**相关题目**：
- [FB-10-CP-R-001 如何评估和迁移前端构建工具](#FB-10-CP-R-001)
- [FB-10-CO-R-006 前端构建体系的演进路线应如何规划](#FB-10-CO-R-006)

**参考资源**：
- [Tech Selection Scorecard](https://github.com/rendongping/jgs/blob/master/templates/TECH-SELECTION-SCORECARD.md)

**口头回答版**：
> 选型 POC 要看开发和生产的构建速度、产物体积、HMR、与现有插件和框架的兼容性，以及团队学习成本。风险方面要关注缺失的功能、自定义 loader 迁移、sourcemap 调试、测试环境、长期维护。最后用打分卡决策，不要只盯着速度。
---

### FB-10-PE-R-001：如何在组织架构层面推动前端构建性能优化落地？

**题型**：性能优化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：组织治理、构建性能、性能优化、工程化、文化建设
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请谈谈如何在组织架构层面推动前端构建性能优化落地，并保证长期有效。

**参考答案**：
推动策略：

1. **明确 owner**
   - 设立平台团队或 SRE 团队负责构建性能基线与优化。

2. **统一度量指标**
   - 开发启动时间、HMR 时间、生产构建时间、CI 时间。
   - 产物体积、initial chunk 大小、long-term cache 命中率。

3. **嵌入流程**
   - 在 CI 中设置构建时间预算和产物体积预算，超标自动告警或阻断。
   - 在代码审查清单中加入性能检查项。

4. **工具与模板**
   - 提供标准化脚手架和配置，内置最佳实践。
   - 推广远程缓存、增量构建、构建分析工具。

5. **文化与激励**
   - 定期分享优秀案例，树立标杆项目。
   - 将性能目标纳入团队 OKR 或技术债治理。

6. **持续监控与防退化**
   - 建立构建性能趋势看板。
   - 每次大版本或工具升级后对比基线。
   - 对退化自动创建修复任务。

**评分维度**：
- 组织机制清晰（40%）
- 度量与流程嵌入（30%）
- 文化与持续监控（30%）

**常见错误**：
- 只依赖个别项目自发优化
- 没有度量指标，无法判断优化效果

**延伸追问**：
- 如何处理业务需求与性能优化的冲突？
- 如何防止构建性能退化？

**相关题目**：
- [FB-10-PE-P-002 如何设计一个大型前端项目的增量构建方案](#FB-10-PE-P-002)
- [FB-10-SD-R-004 设计一个企业级前端构建产物质量门禁体系](#FB-10-SD-R-004)

**参考资源**：
- [Web Performance Budgets](https://web.dev/performance-budgets-101/)

**口头回答版**：
> 推动构建性能优化需要专门团队负责，制定统一的构建时间、体积指标并嵌入 CI 门禁。提供标准化工具和模板，定期复盘，树立标杆项目。还要把性能目标和业务 OKR 挂钩，建立长期监控，防止退化。

---


### FB-10-CO-B-015：package.json 中的 main、module、exports、browser 字段有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：package.json、main、module、exports、browser、模块入口、Tree Shaking
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 npm 包中 `main`、`module`、`exports`、`browser` 字段的含义、优先级和适用场景。

**参考答案**：

1. **`main`**：CommonJS 入口，Node.js 默认使用，通常指向 `.cjs` 或 `.js`。
2. **`module`**：ES Module 入口，Webpack/Rollup/Vite 等构建工具优先读取，便于 Tree Shaking。
3. **`browser`**：浏览器环境专用入口，可替换 Node 专用代码（如 `fs`、`path`）。
4. **`exports`**（Node.js 12+）：条件导出，支持 `import`、`require`、`node`、`browser`、`default` 等条件，优先级最高。

示例：
```json
{
  "main": "./lib/index.cjs",
  "module": "./lib/index.mjs",
  "browser": "./lib/index.browser.js",
  "exports": {
    ".": {
      "import": "./lib/index.mjs",
      "require": "./lib/index.cjs",
      "browser": "./lib/index.browser.js",
      "default": "./lib/index.mjs"
    }
  }
}
```

构建工具读取顺序（以 Webpack 为例）可通过 `resolve.mainFields` 配置，常见为 `['browser', 'module', 'main']`。

**评分维度**：
- 解释四个字段基本含义（40%）
- 说明 `exports` 条件导出与优先级（30%）
- 能举例配置并关联 Tree Shaking（30%）

**常见错误**：
- 认为 `module` 字段会被 Node.js 原生使用
- 混淆 `browser` 字段与 `exports` 的 `browser` 条件

**延伸追问**：
- `exports` 的子路径导出怎么写？
- 如果只配置 `main`，对 Tree Shaking 有什么影响？

**相关题目**：
- [FB-10-CO-B-001 常见前端构建工具对比](#FB-10-CO-B-001)
- [FB-10-CO-B-003 Tree Shaking 生效条件](#FB-10-CO-B-003)

**参考资源**：
- [Node.js Package Entry Points](https://nodejs.org/api/packages.html#package-entry-points)
- [Webpack Resolve Main Fields](https://webpack.js.org/configuration/resolve/#resolvemainfields)

**口头回答版**：
`main` 是 CJS 入口，`module` 是 ESM 入口，`browser` 是给浏览器用的，`exports` 是新的条件导出，优先级最高。构建工具会按这个顺序找合适入口，配好了才能让 Tree Shaking 生效。

---

### FB-10-CO-B-016：PostCSS 在前端构建中的作用是什么？常见插件有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：PostCSS、Autoprefixer、CSS、构建工具、CSS Modules、前缀
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 PostCSS 的定位，以及在前端构建流程中常见的 PostCSS 插件。

**参考答案**：

PostCSS 是一个用 JavaScript 工具和插件转换 CSS 的工具，本身只负责解析 CSS 为 AST，具体转换由插件完成。

常见插件：

1. **Autoprefixer**：根据 Can I Use 数据自动添加浏览器前缀。
2. **postcss-preset-env**：将现代 CSS 特性转为兼容语法，类似 Babel 的 preset-env。
3. **postcss-nested**：支持嵌套 CSS 规则。
4. **postcss-modules**：将类名局部化，生成唯一类名，防止全局污染。
5. **cssnano**：生产环境压缩 CSS。
6. **tailwindcss**：作为 PostCSS 插件处理 utility-first CSS。

典型配置：
```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({ stage: 1 })
  ]
};
```

**评分维度**：
- 说明 PostCSS 是插件化 CSS 转换器（40%）
- 列举至少 4 个常见插件（40%）
- 能说明与预处理器（Sass/Less）的区别（20%）

**常见错误**：
- 把 PostCSS 当成 CSS 预处理器
- 认为 Autoprefixer 只去掉前缀

**延伸追问**：
- PostCSS 与 Sass、Less 有什么关系？
- 如何配置 PostCSS 只针对目标浏览器加前缀？

**相关题目**：
- [FB-10-CO-B-010 静态资源处理](#FB-10-CO-B-010)

**参考资源**：
- [PostCSS 官方文档](https://postcss.org/)
- [Autoprefixer GitHub](https://github.com/postcss/autoprefixer)

**口头回答版**：
PostCSS 本身不转换 CSS，它是一套插件化的 CSS 处理框架。常见插件有 Autoprefixer 自动加前缀、postcss-preset-env 转新特性、cssnano 压缩、postcss-modules 局部化类名。它和 Sass 不一样，Sass 是预处理器，PostCSS 更像是 CSS 的 Babel。

---

### FB-10-CO-B-017：构建产物文件名中的 hash 有什么作用？contenthash、chunkhash、hash 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Webpack、hash、contenthash、chunkhash、缓存、产物命名
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释前端构建产物文件名中 hash 的作用，以及 `hash`、`chunkhash`、`contenthash` 三者的区别。

**参考答案**：

hash 的作用：

1. **破坏缓存**：文件内容变化后 hash 变化，浏览器会重新请求。
2. **长期缓存**：内容不变的文件可长期缓存，提高加载性能。

三者区别：

| 类型 | 计算范围 | 特点 |
|------|----------|------|
| `hash` | 每次构建整体 | 任意文件变化，所有产物 hash 都变，缓存命中率最低 |
| `chunkhash` | 单个 chunk | 基于 chunk 内容，chunk 内任一模块变化 hash 变 |
| `contenthash` | 单个文件内容 | CSS/JS 等单独文件按自身内容计算，最精细，推荐生产使用 |

示例：
```js
output: {
  filename: '[name].[contenthash:8].js'
},
plugins: [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css'
  })
]
```

**评分维度**：
- 解释 hash 的缓存作用（40%）
- 区分三种 hash 的计算范围（40%）
- 能说明生产环境推荐 contenthash（20%）

**常见错误**：
- 认为 `chunkhash` 和 `contenthash` 一样
- 使用 `hash` 导致所有文件缓存同时失效

**延伸追问**：
- 如果 CSS 从 JS 中提取出来，用 chunkhash 会有什么问题？
- runtime chunk 用哪种 hash 更合适？

**相关题目**：
- [FB-10-CO-A-005 Bundle Splitting 与 Code Splitting 的区别](#FB-10-CO-A-005)
- [FB-10-CA-A-001 分析 Webpack 配置产物结构](#FB-10-CA-A-001)

**参考资源**：
- [Webpack Caching](https://webpack.js.org/guides/caching/)

**口头回答版**：
产物名加 hash 是为了让浏览器在文件内容变化时重新加载，没变就一直缓存。`hash` 是整次构建共享，最不安全；`chunkhash` 按 chunk 算；`contenthash` 按文件自身内容算，最精细，生产环境推荐用 contenthash。

---

### FB-10-CA-B-018：分析下面 Webpack 配置中 `chunkFilename` 和 `publicPath` 的作用。

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：10 构建工具
**标签**：Webpack、chunkFilename、publicPath、代码分割、动态导入
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```js
module.exports = {
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist')
  }
};
```

请分析 `chunkFilename` 和 `publicPath` 在该配置中的作用。

**参考答案**：

1. **`filename`**：入口 chunk 的输出文件名。
2. **`chunkFilename`**：非入口 chunk（如动态 `import()` 懒加载产生的 chunk）的输出文件名。
3. **`publicPath`**：运行时异步加载 chunk 或资源时，拼接在文件名前面的公共路径。构建后 HTML 中同步脚本路径也使用它。

场景：
- 用户访问 `/`，HTML 加载 `/assets/main.xxxxxxxx.js`。
- 当路由切换到 `/dashboard` 时，浏览器异步请求 `/assets/dashboard.xxxxxxxx.chunk.js`。

**评分维度**：
- 正确说明 `chunkFilename` 适用对象（40%）
- 正确说明 `publicPath` 的拼接作用（40%）
- 能举例动态导入场景（20%）

**常见错误**：
- 认为 `chunkFilename` 控制所有 JS 文件名
- 把 `publicPath` 当成输出目录 `path`

**延伸追问**：
- `publicPath` 设为 CDN 地址需要注意什么？
- 动态导入的 chunk 如何预加载？

**相关题目**：
- [FB-10-CO-B-009 代码分割](#FB-10-CO-B-009)
- [FB-10-CA-A-001 分析 Webpack 配置产物结构](#FB-10-CA-A-001)

**参考资源**：
- [Webpack Output](https://webpack.js.org/configuration/output/)

**口头回答版**：
`filename` 管入口文件，`chunkFilename` 管动态导入产生的懒加载 chunk，`publicPath` 是运行时请求这些文件的前缀路径。比如 `publicPath` 设为 `/assets/`，异步加载的 chunk 就会从 `/assets/xxx.chunk.js` 请求。

---

### FB-10-EN-B-019：前端构建脚本中如何管理多环境（dev/test/prod）配置？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：10 构建工具
**标签**：环境变量、多环境、构建脚本、dotenv、NODE_ENV
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明在前端项目中如何区分开发、测试、生产环境，并给出构建脚本管理的常见做法。

**参考答案**：

1. **使用 `NODE_ENV`**：
   - `development`、`test`、`production` 是常见值。
   - 构建工具（Webpack/Vite）会根据它启用不同优化。

2. **`.env` 文件**：
   - `.env`、`.env.development`、`.env.production`、`.env.test`。
   - Vite 中以 `VITE_` 开头的变量暴露给客户端；Webpack 需配合 `dotenv` + DefinePlugin。

3. **按环境拆分配置文件**：
   - Webpack：`webpack.common.js`、`webpack.dev.js`、`webpack.prod.js`，使用 `webpack-merge` 合并。
   - Vite：`vite.config.ts` 中按 `mode` 返回不同配置。

4. **CI/CD 注入**：
   - 在流水线中设置环境变量，构建时读取。

5. **脚本示例**：
   ```json
   {
     "build:dev": "webpack --env mode=development",
     "build:prod": "webpack --env mode=production",
     "build:test": "vite build --mode test"
   }
   ```

**评分维度**：
- 说明 `NODE_ENV` 与 `.env` 的作用（40%）
- 能按环境拆分配置文件（30%）
- 提到 CI/CD 注入与密钥安全（30%）

**常见错误**：
- 把敏感密钥写入 `.env` 并提交到仓库
- 认为 `NODE_ENV` 可以在浏览器运行时被修改

**延伸追问**：
- 如何在运行时切换环境配置？
- 多环境构建产物如何分别部署？

**相关题目**：
- [FB-10-CO-B-008 前端构建中如何使用环境变量](#FB-10-CO-B-008)

**参考资源**：
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Webpack Configuration](https://webpack.js.org/guides/production/)

**口头回答版**：
前端多环境通常用 `NODE_ENV` 和 `.env` 文件区分，构建脚本按 dev/test/prod 拆分配置，Vite 用 mode，Webpack 用 webpack-merge。注意不要把密钥写进前端代码，环境变量在构建时注入。

---

### FB-10-CD-B-020：手写一个 Babel Plugin，删除代码中的所有 `console.log`。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：10 构建工具
**标签**：Babel、AST、Plugin、console.log、代码转换
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请手写一个 Babel Plugin，在编译期删除代码中所有的 `console.log(...)` 调用。

**参考答案**：

Babel Plugin 通过访问 AST 节点实现转换。思路：遍历 `CallExpression`，如果 `callee` 是 `console.log`，则移除该语句。

```js
module.exports = function removeConsoleLogPlugin({ types: t }) {
  return {
    name: 'remove-console-log',
    visitor: {
      CallExpression(path) {
        const { callee } = path.node;
        if (
          t.isMemberExpression(callee) &&
          t.isIdentifier(callee.object, { name: 'console' }) &&
          t.isIdentifier(callee.property, { name: 'log' })
        ) {
          path.remove();
        }
      }
    }
  };
};
```

配置使用：
```json
{
  "plugins": ["./remove-console-log-plugin.js"]
}
```

更完善的做法可使用已有的 `babel-plugin-transform-remove-console`。

**评分维度**：
- 写出 Babel Plugin 基本结构（40%）
- 正确匹配 console.log CallExpression（40%）
- 处理边界情况如 console.log 返回值（20%）

**常见错误**：
- 只删除 `console` 对象而保留其他 console 方法。
- 未处理 `console.log` 的返回值被使用的情况。

**延伸追问**：
- 如何保留开发环境的 console.log，只在生产环境移除？
- 如何扩展插件移除 console.warn、console.error？

**相关题目**：
- [FB-10-CO-A-011 Webpack 的 resolve 配置](#FB-10-CO-A-011)

**参考资源**：
- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

**口头回答版**：
> Babel Plugin 通过 visitor 遍历 AST，遇到 `console.log` 的 CallExpression 就 `path.remove()` 移除。要注意只删 log，并考虑 console.log 被使用的情况。

---

### FB-10-CO-A-011：Webpack 的 resolve 配置如何影响模块解析？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、resolve、alias、extensions、模块解析、enhanced-resolve
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Webpack 中 `resolve.alias`、`resolve.extensions`、`resolve.modules`、`resolve.mainFields` 的作用及常见配置。

**参考答案**：

Webpack 使用 `enhanced-resolve` 解析模块路径，`resolve` 配置决定如何定位模块。

1. **`alias`**：路径别名，简化导入。
   ```js
   resolve: {
     alias: {
       '@': path.resolve(__dirname, 'src'),
       '@components': path.resolve(__dirname, 'src/components')
     }
   }
   ```

2. **`extensions`**：自动补全扩展名。
   ```js
   extensions: ['.ts', '.tsx', '.js', '.jsx']
   ```

3. **`modules`**：指定解析 `node_modules` 的目录，可用于 Monorepo 或离线包目录。

4. **`mainFields`**：决定读取 npm 包的哪些入口字段，常用 `['browser', 'module', 'main']`。

5. **`symlinks`**：控制是否解析符号链接。

**评分维度**：
- 解释 4 个核心配置作用（50%）
- 能给出 alias/extensions 示例（30%）
- 提到 `enhanced-resolve` 与性能影响（20%）

**常见错误**：
- `alias` 配置遗漏 `$` 精确匹配导致意外匹配
- `extensions` 顺序不当导致 TypeScript 文件被 JS 文件覆盖

**延伸追问**：
- `resolve.alias` 的 `$` 后缀有什么用？
- TypeScript 项目中 alias 如何同时配置 `tsconfig.json`？

**相关题目**：
- [FB-10-CO-B-011 Webpack resolve 配置](#FB-10-CO-B-011)
- [FB-10-CO-A-001 Webpack 构建流程](#FB-10-CO-A-001)

**参考资源**：
- [Webpack Resolve](https://webpack.js.org/configuration/resolve/)

**口头回答版**：
Webpack 用 `enhanced-resolve` 找模块。`alias` 配路径别名，`extensions` 自动补全扩展名，`modules` 指定 node_modules 查找目录，`mainFields` 决定读 package.json 哪个入口。配好了能减少导入路径、提升解析效率。

---

### FB-10-CO-A-012：@babel/preset-env 的 targets 与 useBuiltIns 该如何配置？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Babel、preset-env、targets、useBuiltIns、core-js、Polyfill
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 `@babel/preset-env` 中 `targets` 和 `useBuiltIns` 的作用，并给出推荐配置。

**参考答案**：

`@babel/preset-env` 根据目标环境自动选择需要的 Babel 插件和 polyfill。

1. **`targets`**：
   - 指定目标浏览器/Node 版本，支持 browserslist 配置或对象。
   - 示例：`targets: { chrome: '80', ie: '11' }` 或 `"browserslist": ["> 1%", "last 2 versions"]`。

2. **`useBuiltIns`**：
   - `false`：不注入 polyfill，需手动引入。
   - `"entry"`：在入口根据 targets 引入全部所需 polyfill。
   - `"usage"`：按代码实际使用按需注入 polyfill（推荐）。

3. **`corejs`**：指定 core-js 版本，如 `corejs: 3`。

推荐配置：
```json
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}
```

**评分维度**：
- 解释 `targets` 与 browserslist 关系（30%）
- 区分 `useBuiltIns` 三种取值（40%）
- 能给出推荐配置并说明原因（30%）

**常见错误**：
- 使用 `useBuiltIns: 'usage'` 时仍在入口手动 import 'core-js'
- 不配置 `corejs` 导致警告或注入不完整

**延伸追问**：
- `useBuiltIns: 'usage'` 是如何分析代码注入 polyfill 的？
- 开发组件库时为什么常用 `@babel/plugin-transform-runtime` 而不是 preset-env 注入 polyfill？

**相关题目**：
- [FB-10-CO-B-006 Babel preset 和 plugin 区别](#FB-10-CO-B-006)
- [FB-10-CO-B-007 Polyfill 方案](#FB-10-CO-B-007)

**参考资源**：
- [Babel preset-env](https://babeljs.io/docs/babel-preset-env)
- [core-js](https://github.com/zloirock/core-js)

**口头回答版**：
`@babel/preset-env` 按目标环境自动选插件。`targets` 指定浏览器版本，可以用 browserslist；`useBuiltIns` 控制 polyfill 注入方式，推荐 `usage` 按需注入，配合 `corejs: 3`。

---

### FB-10-CA-A-013：分析下面代码中 Tree Shaking 为什么会失效。

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Tree Shaking、sideEffects、ES Module、Webpack、打包优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
// utils/index.js
export function foo() { return 'foo'; }
export function bar() { console.log('bar'); }

// main.js
import { foo } from './utils';
console.log(foo());
```

`package.json` 未配置 `sideEffects`。请分析 `bar` 是否会被 Tree Shaking 移除，并说明原因。

**参考答案**：

默认情况下，Webpack 在生产模式会尝试 Tree Shaking，但结果取决于：

1. **模块规范**：代码使用 ES Module `import/export`，满足静态分析前提。
2. **`sideEffects` 配置**：未配置时，Webpack 会保守处理，可能保留整个模块，导致 `bar` 不会被移除。
3. **具体行为**：
   - 如果 `utils/index.js` 被判定为有副作用（如顶层执行代码、修改全局变量），Webpack 会保留整个模块。
   - 若模块本身无副作用，Webpack 的 usedExports 优化可能移除 `bar`。

正确做法：
```json
{
  "sideEffects": false
}
```

或精确声明有副作用的文件：
```json
{
  "sideEffects": ["*.css", "*.polyfill.js"]
}
```

**评分维度**：
- 指出 Tree Shaking 依赖 ES Module 与 sideEffects（40%）
- 解释未配置 sideEffects 时构建工具的保守行为（40%）
- 能给出正确配置（20%）

**常见错误**：
- 认为只要没引用 `bar` 就一定会被移除
- 忽略 CSS 文件通常需要声明为 sideEffects

**延伸追问**：
- 如果 `bar` 内部修改了全局对象，Tree Shaking 会怎样？
- 如何验证 Tree Shaking 是否生效？

**相关题目**：
- [FB-10-CO-B-003 Tree Shaking 生效条件](#FB-10-CO-B-003)
- [FB-10-CO-P-002 Tree Shaking 底层原理](#FB-10-CO-P-002)

**参考资源**：
- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

**口头回答版**：
如果 `package.json` 没有声明 `sideEffects`，Webpack 会保守地保留整个模块，`bar` 可能不会被移除。需要配置 `"sideEffects": false` 或列出确实有副作用的文件，才能让 Tree Shaking 更彻底。

---

### FB-10-CD-A-014：手写一个 Webpack Plugin，在 emit 阶段生成 `stats.json`。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、Plugin、Tapable、emit、stats、手写实现
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请手写一个 Webpack Plugin，在构建完成 emit 阶段输出一个包含所有 chunk 名称和大小的 `stats.json` 文件。

**参考答案**：

Webpack Plugin 是一个带有 `apply` 方法的类，通过 `compiler.hooks.emit` 注册回调。

```js
class StatsJsonPlugin {
  constructor(options = {}) {
    this.filename = options.filename || 'stats.json';
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('StatsJsonPlugin', (compilation, callback) => {
      const stats = Object.keys(compilation.assets).map(name => {
        const source = compilation.assets[name].source();
        return {
          name,
          size: Buffer.byteLength(source)
        };
      });

      const content = JSON.stringify({ assets: stats }, null, 2);
      compilation.assets[this.filename] = {
        source: () => content,
        size: () => Buffer.byteLength(content)
      };

      callback();
    });
  }
}

module.exports = StatsJsonPlugin;
```

配置：
```js
plugins: [new StatsJsonPlugin({ filename: 'build-stats.json' })]
```

**评分维度**：
- 写出 Plugin 类和 apply 方法（30%）
- 正确使用 `compiler.hooks.emit`（30%）
- 能遍历 `compilation.assets` 并生成 JSON 文件（40%）

**常见错误**：
- 使用同步 hook 却未调用 `tap` 而非 `tapAsync`
- 未给新 asset 提供 `source`/`size` 方法

**延伸追问**：
- 如何在 `emit` 阶段修改已有 asset 内容？
- `compilation.hooks.processAssets` 与 `emit` 有什么区别？

**相关题目**：
- [FB-10-CO-P-005 Webpack Plugin 生命周期与 Tapable](#FB-10-CO-P-005)
- [FB-10-CD-P-001 手写 Webpack Plugin](#FB-10-CD-P-001)

**参考资源**：
- [Webpack Compiler Hooks](https://webpack.js.org/api/compiler-hooks/)
- [Webpack Compilation Hooks](https://webpack.js.org/api/compilation-hooks/)

**口头回答版**：
写一个类，里面 `apply` 方法注册 `compiler.hooks.emit` 回调。在回调里遍历 `compilation.assets`，把文件名和大小拼成 JSON，再写回 assets，构建完就会多出一个 stats.json。

---

### FB-10-PE-A-015：如何分析并可视化前端打包体积？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、Bundle Analyzer、性能分析、打包体积、可视化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍常用的打包体积分析工具，并说明如何利用分析结果进行优化。

**参考答案**：

常用工具：

1. **webpack-bundle-analyzer**：生成交互式 treemap，直观展示各模块体积。
2. **rollup-plugin-visualizer**：Rollup/Vite 的体积可视化插件。
3. **vite-plugin-inspect**：查看 Vite 转换前后的模块信息。
4. **source-map-explorer / bundle-wizard**：基于 Source Map 分析产物构成。
5. **Webpack `stats` 输出**：`webpack --json > stats.json`，配合 `webpack-bundle-analyzer` 离线分析。

优化思路：
- 找出体积最大的依赖，评估是否需要替换或按需加载。
- 检查是否重复打包了相同库的不同版本。
- 对大型库使用动态导入或替换为轻量库。
- 确保 Tree Shaking 生效，移除未使用代码。

**评分维度**：
- 列举至少 3 种分析工具（40%）
- 能说明如何解读 treemap（30%）
- 能给出优化方向（30%）

**常见错误**：
- 只看总体积，不分析具体模块
- 忽略依赖重复或 polyfill 过大

**延伸追问**：
- 如何比较两次构建的体积变化？
- 分析报告显示某个依赖占 500KB，你会怎么处理？

**相关题目**：
- [FB-10-PE-A-001 优化 Webpack 构建速度](#FB-10-PE-A-001)
- [FB-10-PE-A-002 分析并优化前端打包体积](#FB-10-PE-A-002)

**参考资源**：
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)

**口头回答版**：
常用 webpack-bundle-analyzer 或 rollup-plugin-visualizer 生成 treemap，看哪个模块最大。发现大依赖就考虑按需加载、换库、Tree Shaking，或者检查重复依赖。

---

### FB-10-EN-A-016：如何在前端构建流程中集成 Lint、Type Check 和 Test？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：工程化、Lint、TypeScript、单元测试、CI、构建流程
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个前端构建流程，集成 ESLint、TypeScript 类型检查和单元测试，并说明哪些环节应该阻塞构建。

**参考答案**：

推荐分层执行：

1. **本地开发阶段（pre-commit）**：
   - 使用 `lint-staged` + `husky` 对暂存文件跑 ESLint 和 Prettier。
   - 可选跑相关单测。

2. **构建阶段**：
   - 开发构建：可做类型检查，但不阻塞热更新，用 `fork-ts-checker-webpack-plugin` 在子进程并行检查。
   - 生产构建：类型错误应阻塞构建，防止带类型问题的代码上线。

3. **CI 阶段**：
   - 并行执行 `lint`、`


**评分维度**：
- 核心概念准确性（40%）
- 问题分析深度（35%）
- 实践案例与可落地性（25%）


**常见错误**：
- 只停留在概念层面，缺乏具体场景说明。
- 忽略边界情况、异常处理或回退方案。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 本地开发阶段（pre-commit）： - 使用 lint-staged + husky 对暂存文件跑 ESLint 和 Prettier。 - 可选跑相关单测。 - 开发构建：可做类型检查，但不阻塞热更新，用 fork-ts-checker-webpack-plugin 在子进程并行检查。


### FB-10-CO-A-017：从 Webpack 迁移到 Vite 需要考虑哪些因素和步骤？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：10 构建工具
**标签**：Webpack、Vite、迁移、场景设计、构建工具选型
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
假设一个中大型项目当前使用 Webpack，团队希望迁移到 Vite。请列出需要评估的因素、迁移步骤和常见风险。

**参考答案**：

评估因素：

1. **生态兼容性**：
   - 检查 Webpack 专属 Loader/Plugin 是否有 Vite 替代方案。
   - 例如 `raw-loader` → `?raw`，`url-loader` → 内置资源处理。

2. **代码规范**：
   - Vite 对 ESM 更严格，检查 CommonJS 混用、裸导入（bare import）等。

3. **构建产物差异**：
   - Vite 生产用 Rollup，产物结构、代码分割、hash 策略可能与 Webpack 不同。

4. **测试/SSR**：
   - 若使用 SSR，需要确认 Vite SSR 支持度。

迁移步骤：

1. 建立 Vite 配置文件，逐步对齐别名、环境变量、代理。
2. 替换不兼容的 Plugin/Loader。
3. 双轨运行：保留 Webpack，新增 Vite 脚本，灰度验证。
4. 跑全量回归测试，对比构建产物和运行时行为。
5. 上线后收集构建速度与线上错误指标。

风险：
- 开发环境行为一致但生产产物不同导致 bug。
- 某些依赖的 CJS 预构建失败。
- 团队学习成本。

**评分维度**：
- 评估因素全面（30%）
- 迁移步骤可落地（40%）
- 能说明风险与回滚方案（30%）

**常见错误**：
- 一次性全量迁移，无灰度
- 只看开发启动速度，忽略生产构建差异

**延伸追问**：
- 如果某个 Webpack Plugin 没有 Vite 替代品怎么办？
- 如何验证 Vite 和 Webpack 产物行为一致？

**相关题目**：
- [FB-10-CO-A-002 Vite 为什么快](#FB-10-CO-A-002)
- [FB-10-CP-R-001 如何评估和迁移前端构建工具](#FB-10-CP-R-001)

**参考资源**：
- [Vite Migration Guide](https://vitejs.dev/guide/)
- [Webpack to Vite Case Study](https://vitejs.dev/blog/)

**口头回答版**：
迁移前先评估 Loader/Plugin 替代方案、代码 ESM 化、产物差异。做法是配好 Vite 后双轨运行，先让一部分人用 Vite 开发，再对比产物和回归测试，没问题再全量切换。要注意回滚预案。

---
### FB-10-CO-P-013：Webpack 的持久化缓存（Persistent Cache）是如何工作的？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Webpack、Persistent Cache、缓存、构建性能、cache
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Webpack 5 中持久化缓存的原理、配置要点和失效策略。

**参考答案**：

Webpack 5 引入基于文件系统的持久化缓存，默认在 `node_modules/.cache/webpack`。

1. **缓存对象**：
   - 模块解析结果、Loader 转换结果、代码生成结果、Source Map 等。

2. **配置**：
   ```js
   cache: {
     type: 'filesystem',
     buildDependencies: {
       config: [__filename]
     },
     cacheDirectory: path.resolve(__dirname, '.cache')
   }
   ```

3. **失效策略**：
   - 配置文件、Loader/Plugin 代码变化时通过 `buildDependencies` 失效。
   - 模块内容变化通过内容 hash 失效。
   - 版本升级、Node 版本变化也会导致失效。

4. **优势**：
   - 二次构建可复用大部分结果，大幅提升增量构建速度。

**评分维度**：
- 说明持久化缓存缓存了什么（40%）
- 能给出配置并解释 `buildDependencies`（30%）
- 说明缓存失效条件（30%）

**常见错误**：
- 未配置 `buildDependencies` 导致配置改了缓存不刷新
- 把缓存目录提交到 Git

**延伸追问**：
- 持久化缓存对 CI 构建有什么影响？
- 缓存文件越来越大如何处理？

**相关题目**：
- [FB-10-PE-A-001 优化 Webpack 构建速度](#FB-10-PE-A-001)
- [FB-10-EN-A-001 设计前端构建缓存策略](#FB-10-EN-A-001)

**参考资源**：
- [Webpack Cache](https://webpack.js.org/configuration/cache/)

**口头回答版**：
Webpack 5 的 filesystem cache 把模块解析、Loader 转换、代码生成结果写到磁盘。要配 `buildDependencies` 让配置文件变更时失效缓存，不然改了配置还是旧缓存。二次构建能复用，增量构建会快很多。

---

### FB-10-CO-P-014：Vite/Rollup 插件钩子与 Unplugin 的统一插件模型是怎样的？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Vite、Rollup、Unplugin、插件钩子、构建扩展
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Vite 和 Rollup 的插件钩子，并说明 Unplugin 如何统一不同构建工具的插件开发。

**参考答案**：

1. **Rollup 插件**：
   - 基于钩子的构建流程，如 `resolveId`、`load`、`transform`、`generateBundle`。
   - 输出阶段钩子少，适合库打包。

2. **Vite 插件**：
   - 兼容 Rollup 插件 API，同时扩展了开发服务器钩子，如 `configureServer`、`transformIndexHtml`、`handleHotUpdate`。
   - 一个 Vite 插件可同时提供 Rollup 插件用于生产构建。

3. **Unplugin**：
   - 由 Anthony Fu 发起的统一插件框架。
   - 提供通用 API（`transform`、`load`、`resolveId`），底层自动适配 Webpack、Vite、Rollup、esbuild、Rspack。
   - 插件作者写一次，即可在多构建工具复用。

**评分维度**：
- 说明 Rollup/Vite 核心插件钩子（40%）
- 区分 Vite 对 Rollup 插件的扩展（30%）
- 解释 Unplugin 的统一适配思路（30%）

**常见错误**：
- 认为 Vite 插件完全等同于 Rollup 插件
- 忽略 Vite 开发服务器钩子

**延伸追问**：
- 如何在 Vite 插件中区分开发环境和生产环境？
- Unplugin 的 Webpack 适配是怎么实现的？

**相关题目**：
- [FB-10-CO-A-002 Vite 为什么快](#FB-10-CO-A-002)
- [FB-10-CD-P-016 手写 Vite 插件](#FB-10-CD-P-016)

**参考资源**：
- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)
- [Unplugin](https://github.com/unjs/unplugin)

**口头回答版**：
Rollup 插件主要靠 resolveId、load、transform 这些钩子；Vite 兼容 Rollup 插件，还加了开发服务器钩子。Unplugin 进一步抽象，让插件一次编写就能在 Webpack、Vite、Rollup、esbuild 上用。

---

### FB-10-CO-P-015：SWC 与 esbuild 的异同和适用场景分别是什么？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：SWC、esbuild、Rust、Go、构建性能、编译器
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 SWC 和 esbuild 的架构、生态和适用场景。

**参考答案**：

| 维度 | esbuild | SWC |
|------|---------|-----|
| 语言 | Go | Rust |
| 定位 | 通用打包器 + 转换器 | 编译器/转换器平台 |
| 打包能力 | 完整打包、代码分割 | 本身不打包，主要做 transform/parse |
| 插件生态 | 相对简单 | 可通过 `@swc/core` 和 Wasm 扩展 |
| 产物优化 | 压缩快，Tree Shaking 一般 | 压缩强，可替代 Terser |
| 典型应用 | Vite 预构建、工具链 | Next.js/Turbopack、Babel 替代 |

适用场景：
- **esbuild**：适合需要快速转换/预构建的场景，如 Vite 依赖预构建、开发时 TS/JSX 编译。
- **SWC**：适合替代 Babel/Terser 做编译和压缩，如 Next.js 默认编译器、Turbopack 底层。

两者共同点：都用系统语言实现，比传统 JS 工具快 10-100 倍。

**评分维度**：
- 从语言/定位/生态三方面对比（50%）
- 能说明各自典型应用场景（30%）
- 提到产物优化差异（20%）

**常见错误**：
- 认为 SWC 也是完整打包器
- 认为 esbuild 可以完全替代 Webpack/Rollup 生产打包

**延伸追问**：
- 为什么 Vite 生产不用 esbuild 打包？
- SWC 的插件模型与 Babel 插件有什么差异？

**相关题目**：
- [FB-10-CO-A-006 esbuild、SWC、Rspack 为什么快](#FB-10-CO-A-006)
- [FB-10-CO-P-006 Vite 预构建原理](#FB-10-CO-P-006)

**参考资源**：
- [esbuild 文档](https://esbuild.github.io/)
- [SWC 文档](https://swc.rs/)

**口头回答版**：
esbuild 用 Go 写，是打包器加转换器，Vite 用它做预构建；SWC 用 Rust 写，更像编译器平台，主要做 transform 和压缩，Next.js 在用。它们都比 JS 工具快很多，但定位不同。

---

### FB-10-CD-P-016：手写一个 Vite/Rollup 插件，支持直接导入 Markdown 文件为 HTML 字符串。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Vite、Rollup、插件、Markdown、手写实现
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请手写一个 Vite/Rollup 插件，使得 `import readme from './readme.md';` 中的 `readme` 为 Markdown 转换后的 HTML 字符串。

**参考答案**：

```js
import { createFilter } from '@rollup/pluginutils';
import MarkdownIt from 'markdown-it';

export default function markdownPlugin(options = {}) {
  const filter = createFilter(options.include || ['**/*.md'], options.exclude);
  const md = new MarkdownIt(options.markdownItOptions);

  return {
    name: 'rollup-plugin-markdown',
    transform(code, id) {
      if (!filter(id)) return null;

      const html = md.render(code);
      return {
        code: `export default ${JSON.stringify(html)};`,
        map: null
      };
    }
  };
}
```

Vite 使用：
```js
import markdownPlugin from './markdown-plugin';
export default {
  plugins: [markdownPlugin()]
};
```

关键点：
- `createFilter` 过滤文件。
- `transform` 返回 ESM 代码字符串。
- 返回 `map: null` 表示无 Source Map。

**评分维度**：
- 写出插件基本结构和 transform 钩子（40%）
- 正确过滤 .md 文件并转换内容（40%）
- 返回合法 ESM 导出（20%）

**常见错误**：
- 直接返回 HTML 字符串而不是 module.exports
- 未过滤文件导致所有模块都被转换

**延伸追问**：
- 如何给生成的 HTML 添加 CSS 作用域？
- 如何在 SSR 场景下处理 Markdown 导入？

**相关题目**：
- [FB-10-CD-A-001 手写 Webpack Loader](#FB-10-CD-A-001)
- [FB-10-CO-P-014 Vite/Rollup 插件钩子](#FB-10-CO-P-014)

**参考资源**：
- [Rollup Plugin Development](https://rollupjs.org/plugin-development/)
- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)

**口头回答版**：
写一个 Rollup/Vite 插件，用 `transform` 钩子拦截 `.md` 文件，读取源码后用 markdown-it 转成 HTML，再返回 `export default ${JSON.stringify(html)}`。注意要过滤文件，别把其他模块也转了。

---

### FB-10-PE-P-017：大型 Monorepo 的构建性能优化有哪些关键手段？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：Monorepo、构建性能、Remote Cache、Nx、Turborepo、任务调度
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明在大型 Monorepo 中提升构建性能的关键手段，并对比 Nx 和 Turborepo 的核心思路。

**参考答案**：

关键手段：

1. **任务拆分与并行**：
   - 将构建、测试、类型检查拆分为独立任务，按依赖图并行执行。

2. **远程缓存（Remote Cache）**：
   - 将任务输出缓存到远程服务器，CI 和其他开发者可直接复用。

3. **任务去重**：
   - 通过输入 hash 判断任务是否已执行，避免重复构建未变更的包。

4. **增量构建**：
   - 只构建受影响的包（affected），而非全量构建。

5. **统一工具链与依赖管理**：
   - 使用 pnpm workspace、共享配置，减少重复安装和解析。

Nx vs Turborepo：
- **Nx**：功能更全面，内置代码生成、依赖图、插件生态强，适合大型复杂 Monorepo。
- **Turborepo**：更轻量，基于 pipeline 配置，易于接入已有项目，Remote Cache 体验好。

**评分维度**：
- 列举至少 4 种优化手段（40%）
- 说明远程缓存和增量构建原理（30%）
- 能对比 Nx 和 Turborepo（30%）

**常见错误**：
- 每次 CI 都全量构建所有包
- 忽略缓存键设计导致缓存命中低

**延伸追问**：
- 远程缓存的安全性和权限如何控制？
- 如何处理跨包类型依赖的增量构建？

**相关题目**：
- [FB-10-CO-R-001 Monorepo 构建方案选型](#FB-10-CO-R-001)
- [FB-10-SD-R-003 组件库 Monorepo 构建发布](#FB-10-SD-R-003)

**参考资源**：
- [Turborepo](https://turbo.build/repo)
- [Nx](https://nx.dev/)

**口头回答版**：
大型 Monorepo 要把构建任务拆小、并行跑、用远程缓存复用结果、只构建受影响的包。Nx 功能全，Turborepo 轻量好接入，核心都是让没改动的包不要重复构建。

---

### FB-10-EN-P-018：前端项目如何治理依赖版本、Lockfile 和 Changelog？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：工程化、依赖治理、Lockfile、Changelog、Semver、Monorepo
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在前端工程中如何管理依赖版本、Lockfile 和 Changelog，以保证构建的可复现性和发布质量。

**参考答案**：

前端依赖治理的核心目标有三点：**版本可控**、**构建可复现**、**变更可追溯**。可围绕依赖版本、Lockfile 和 Changelog 三条主线建立规范与工具链。

1. **依赖版本管理**
   - 严格遵循 Semver，区分 `dependencies`、`devDependencies`、`peerDependencies` 的边界。
   - 制定升级策略：补丁版本可自动合并（Dependabot / Renovate），次要版本走 Review，主版本需影响面评估。
   - Monorepo 中统一依赖版本（pnpm workspace catalog、Yarn resolutions、Rush），避免子包版本漂移。
   - 建立依赖白名单与黑名单，禁用已知高风险或未维护包；定期运行 `npm audit` / `pnpm audit` / Snyk。

2. **Lockfile 治理**
   - 将 `package-lock.json`、`yarn.lock`、`pnpm-lock.yaml` 纳入版本控制，并在 CI 中校验 Lockfile 与 `package.json` 一致（如 `pnpm install --frozen-lockfile`）。
   - 禁止手动编辑 Lockfile；冲突时由指定同学用包管理器重新生成并 Review diff。
   - 统一 registry 与镜像源（私有 Nexus / Verdaccio），避免不同环境解析出不同版本。
   - 对关键依赖做“产物 diff”：升级后对比构建产物体积与运行时行为，防止隐性破坏。

3. **Changelog 与发布**
   - 采用 Conventional Commits，配合 `standard-version`、`release-please` 或 `changesets` 自动生成 Changelog。
   - Changelog 应包含：版本号、变更类型（feat/fix/breaking）、影响范围、迁移指南和关联 Issue。
   - 发布流程与 CI 集成：PR 合并后自动打 Tag、生成 Release Note、推送制品到私有仓库或 CDN。
   - 回滚策略：保留上一个版本的 Docker 镜像 / npm 包版本，线上异常可一键回滚。

4. **质量门禁**
   - PR 中自动检测 Lockfile 变更并提示 Reviewer。
   - 依赖升级触发全量构建、单元测试、E2E 与性能基准；失败则阻断合并。
   - 定期输出依赖健康度报告：过期依赖数、漏洞数、产物体积变化。

**评分维度**：
- 版本管理策略（35%）：Semver、依赖分类、升级流程
- Lockfile 可复现性（35%）：版本控制、CI 校验、冲突处理
- Changelog 与发布规范（20%）：自动化、变更可追溯
- 质量与安全意识（10%）：审计、白名单、回滚

**常见错误**：
- 不提交 Lockfile，导致 CI 与本地依赖版本不一致。
- 手动修改 Lockfile 解决冲突，引入隐性版本漂移。
- Changelog 只写“修复若干 Bug”，缺乏具体影响和迁移说明。
- 忽视 peerDependencies 版本约束，造成运行时兼容性问题。

**口头回答版**：
> 我会从版本、Lockfile、Changelog 三个维度来答。版本上严格 Semver，用 Dependabot 自动升级补丁版，主版本升级前做影响面评估；Monorepo 里统一依赖版本。Lockfile 必须进版本控制，CI 用 `--frozen-lockfile` 校验，冲突时由包管理器重新生成，禁止手改。Changelog 用 Conventional Commits 自动生成，每个版本写清楚 Breaking Change 和迁移方式。同时做依赖白名单、漏洞扫描和产物 diff，保证构建可复现和发布可控。


### FB-10-SC-P-019：微前端多技术栈项目的构建隔离与共享依赖如何设计？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：10 构建工具
**标签**：微前端、构建隔离、共享依赖、Module Federation、运行时集成
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
在一个微前端项目中，各子应用可能使用不同技术栈和构建工具。请设计构建层面的隔离策略和共享依赖方案。

**参考答案**：

1. **构建隔离**：
   - 每个子应用独立仓库/包，独立构建、独立部署。
   - 使用独立的 CI 流水线，产物为 JS/CSS 静态资源。
   - 构建工具不限制，允许 React 子应用用 Vite，Vue 子应用用 Webpack。

2. **共享依赖**：
   - 基座加载公共依赖（如 React、Vue、ReactDOM）到全局，子应用 externals 排除。
   - 或使用 Module Federation 声明 shared，运行时只加载一份指定版本。

3. **版本隔离**：
   - 共享依赖通过 semver 范围匹配，版本不兼容时允许加载多份。
   - 关键依赖升级需制定灰度策略。

4. **样式隔离**：
   - 各子应用 CSS 加 scope/类名前缀，避免全局污染。
   - 使用 Shadow DOM 或 CSS Modules。

5. **发布与回滚**：
   - 子应用独立发版，基座通过配置中心动态加载。
   - 构建产物按版本存放，支持快速回滚。

**评分维度**：
- 构建隔离策略清晰（30%）
- 共享依赖方案合理（30%）
- 版本兼容与样式隔离考虑周全（40%）

**常见错误**：
- 所有子应用强制使用同一构建工具
- 共享依赖版本不隔离导致运行时冲突

**延伸追问**：
- Module Federation 的 shared 版本冲突如何解决？
- 不同子应用构建产物命名冲突怎么办？

**相关题目**：
- [FB-10-CO-P-001 Webpack Module Federation 原理](#FB-10-CO-P-001)
- [FB-10-SC-P-001 微前端构建设计](#FB-10-SC-P-001)

**参考资源**：
- [Module Federation](https://module-federation.io/)
- [qiankun 微前端](https://qiankun.umijs.org/)

**口头回答版**：
微前端里各子应用独立构建，公共依赖让基座加载或 Module Federation 共享，按 semver 控制版本。样式要做好隔离，子应用独立发版，基座按配置动态加载，便于回滚。

---

### FB-10-SD-R-007：设计一个企业级 Monorepo 构建平台。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：Monorepo、构建平台、Remote Cache、CI/CD、架构设计
**出现频率**：中频
**预计回答时长**：20-30 分钟

**题目描述**：
请设计一个企业级 Monorepo 构建平台，支持多团队、多项目、远程缓存、构建分发和可观测性。

**参考答案**：

一、平台目标：
- 统一构建标准，提升构建速度，保证产物可复现，提供全链路可观测。

二、核心模块：

1. **任务调度引擎**：
   - 解析包依赖图，按 DAG 调度 build/test/lint/typecheck 任务。
   - 支持本地和 CI 复用同一调度逻辑（Nx/Turborepo）。

2. **远程缓存服务**：
   - 基于输入 hash（源码、配置、依赖版本）缓存任务输出。
   - 提供按项目/团队的权限隔离与缓存清理策略。

3. **构建执行器**：
   - 支持容器化构建，保证环境一致。
   - 支持分布式构建节点，负载均衡。

4. **产物仓库**：
   - 统一存储构建产物，支持版本追溯、SRI 校验。
   - 与 CDN/发布系统对接。

5. **可观测与告警**：
   - 收集构建耗时、缓存命中率、失败率、产物体积。
   - 慢构建自动告警，提供火焰图与依赖分析。

三、安全与治理：
- 依赖白名单、漏洞扫描、供应链签名。
- 构建参数与产物不可变审计。

**评分维度**：
- 架构模块划分清晰（30%）
- 远程缓存与任务调度设计合理（35%）
- 考虑安全、可观测、多团队协作（35%）

**常见错误**：
- 只关注速度，忽略可复现性
- 缺少权限隔离导致缓存污染

**延伸追问**：
- 如何防止远程缓存被恶意注入？
- 平台如何支持不同构建工具接入？

**相关题目**：
- [FB-10-PE-P-017 大型 Monorepo 构建性能优化](#FB-10-PE-P-017)
- [FB-10-SC-R-001 多团队前端构建平台](#FB-10-SC-R-001)

**参考资源**：
- [Turborepo Remote Cache](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Nx Cloud](https://nx.dev/nx-cloud)

**口头回答版**：
企业级 Monorepo 构建平台核心是任务调度、远程缓存、容器化构建、产物仓库和可观测。任务按依赖图跑，缓存按输入 hash 复用，产物做签名和版本管理，不同团队隔离权限，保证又快又稳。

---

### FB-10-CO-R-008：下一代构建工具 Rolldown、Farm、Turbopack 的架构有何异同？

**题型**：概念题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：Rolldown、Farm、Turbopack、下一代构建工具、Rust、架构对比
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请对比 Rolldown、Farm、Turbopack 的架构设计、目标场景和生态策略。

**参考答案**：

| 工具 | 语言 | 定位 | 核心特点 |
|------|------|------|----------|
| **Rolldown** | Rust | Rollup 的 Rust 重写 | 兼容 Rollup API，产物更干净，速度更快，Vite 计划用它替代生产 Rollup |
| **Farm** | Rust | 基于 Rust 的 Web 构建工具 | 强调兼容 Vite/Webpack 插件，支持持久化缓存与 HMR |
| **Turbopack** | Rust | Next.js 新一代 bundler | 增量计算架构，开发启动快，与 Next.js 深度集成 |

共同点：
- 都用 Rust 实现核心，追求极致性能。
- 都强调增量编译/持久化缓存。
- 都需要时间建立与 Webpack/Vite 相当的生态。

差异：
- Rolldown 走兼容 Rollup 路线，迁移成本低。
- Turbopack 与 Next.js 深度绑定，面向应用框架。
- Farm 希望兼容多生态，提供统一构建体验。

**评分维度**：
- 从语言/定位/核心特点对比（50%）
- 说明各工具目标场景（30%）
- 分析生态成熟度与迁移成本（20%）

**常见错误**：
- 认为它们已完全成熟可替代现有工具
- 混淆 Turbopack 与 Webpack 的关系

**延伸追问**：
- 为什么 Vite 选择 Rolldown 而不是直接改造 esbuild？
- 这些工具对现有 Plugin 生态的影响是什么？

**相关题目**：
- [FB-10-CO-R-003 Rspack/Parcel/Turbopack 异同](#FB-10-CO-R-003)
- [FB-10-CO-P-015 SWC 与 esbuild 异同](#FB-10-CO-P-015)

**参考资源**：
- [Rolldown](https://rolldown.rs/)
- [Farm](https://www.farmfe.org/)
- [Turbopack](https://turbo.build/pack)

**口头回答版**：
Rolldown 是 Rollup 的 Rust 版，Vite 未来可能用它；Farm 兼容 Vite/Webpack 插件；Turbopack 是 Next.js 的新 bundler，主打增量计算。它们都用 Rust 提速，但生态还在成熟中。

---

### FB-10-EN-R-009：如何构建前端产物安全与供应链安全体系？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：供应链安全、SRI、CSP、签名、构建产物、DevSecOps
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一套前端构建产物安全体系，包括构建过程安全、产物完整性和运行时安全策略。

**参考答案**：

一、构建过程安全：
1. **依赖安全**：
   - 使用私有 registry/镜像，禁止直接从公网安装未审核包。
   - Lockfile 签名与校验，防止被篡改。
   - 集成 SCA 工具（Snyk、npm audit）扫描漏洞。

2. **构建环境安全**：
   - 构建在隔离容器中进行，固定基础镜像版本。
   - 对构建脚本做权限最小化，禁止运行未知脚本。

二、产物完整性：
1. **Subresource Integrity (SRI)**：
   - 对 CDN 资源生成 hash，HTML 中写入 `integrity` 属性。
2. **产物签名**：
   - 构建完成后用私钥签名，部署时校验。
3. **Source Map 管控**：
   - Source Map 不上传公网，只上传到内部监控平台。

三、运行时安全：
1. **CSP（Content Security Policy）**：
   - 限制脚本来源，禁止内联脚本，防止 XSS。
2. **Trusted Types / iframe sandbox**：
   - 对 DOM 操作做类型约束，隔离第三方脚本。

四、审计与回滚：
- 记录每次构建的依赖树、构建参数、签名信息。
- 异常产物可快速回滚。

**评分维度**：
- 构建过程安全措施（30%）
- 产物完整性方案（35%）
- 运行时安全与审计回滚（35%）

**常见错误**：
- 只关注运行时 CSP，忽略构建供应链
- 把 Source Map 直接暴露到公网

**延伸追问**：
- 如何防止内部构建机被入侵后发布恶意产物？
- SRI hash 与文件名 hash 有什么区别？

**相关题目**：
- [FB-10-CO-R-004 前端构建产物安全与供应链安全](#FB-10-CO-R-004)
- [FB-10-SD-R-002 前端产物发布与回滚系统](#FB-10-SD-R-002)

**参考资源**：
- [MDN - Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [MDN - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

**口头回答版**：
前端安全要从构建供应链、产物完整性和运行时三层面做。构建时管好依赖和 Lockfile，产物加 SRI 和签名，运行时配 CSP 限制脚本来源，Source Map 不要公开，还要保留构建审计便于回滚。

---

### FB-10-SC-R-010：多仓库/多团队统一构建规范与治理机制如何设计？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：构建规范、治理、多团队、标准化、CLI、模板
**出现频率**：中频
**预计回答时长**：15-20 分钟

**题目描述**：
在一个拥有多个仓库和团队的前端组织中，如何统一构建规范、降低维护成本并保证交付质量？

**参考答案**：

一、规范制定：
1. **统一构建 CLI**：
   - 封装内部 CLI（如 `@company/build`），内置默认的 Webpack/Vite 配置、Lint、测试、发布流程。
2. **项目模板**：
   - 提供官方脚手架模板，预设目录结构、CI 配置、构建脚本。
3. **配置收敛**：
   - 公共配置放在共享包中，项目只暴露少量可覆盖项。

二、治理机制：
1. **版本管理**：
   - CLI 和共享配置采用语义化版本，升级前发布 beta，团队灰度验证。
2. **门禁与审计**：
   - CI 中统一跑规范检查（lint、typecheck、test、build）。
   - 收集各项目构建指标，发现异常自动告警。
3. **委员会与 RFC**：
   - 重大变更通过 RFC 讨论，确保多团队诉求被考虑。

三、兼容与演进：
- 允许老项目保留旧版 CLI，但新功能优先在新版实现。
- 提供迁移脚本和文档，降低升级成本。

**评分维度**：
- 统一规范工具化方案（40%）
- 治理机制可落地（30%）
- 考虑兼容与渐进式演进（30%）

**常见错误**：
- 一刀切强制所有项目立刻升级
- 只发文档不配套工具，难以落地

**延伸追问**：
- 如何处理团队对构建工具的差异化需求？
- 统一 CLI 升级失败时如何快速回滚？

**相关题目**：
- [FB-10-CP-R-001 如何评估和迁移前端构建工具](#FB-10-CP-R-001)
- [FB-10-SC-R-001 多团队前端构建平台](#FB-10-SC-R-001)

**参考资源**：
- [Front-End Tooling Survey](https://stateofjs.com/)
- [Enterprise Frontend Architecture](https://martinfowler.com/articles/micro-frontends.html)

**口头回答版**：
多团队统一构建要做一个内部 CLI 和项目模板，把公共配置收敛。升级走 RFC 和灰度，CI 做门禁，收集构建指标。老项目允许保留旧版，新功能在新版实现，渐进式推进。

---

### FB-10-CP-R-011：如何建立前端构建工具选型的决策框架与 ROI 评估？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：10 构建工具
**标签**：构建工具选型、ROI、决策框架、成本收益、技术治理
**出现频率**：低频
**预计回答时长**：15-20 分钟

**题目描述**：
请设计一个前端构建工具选型的决策框架，并说明如何评估迁移的投入产出比（ROI）。

**参考答案**：

一、决策框架：

1. **需求澄清**：
   - 项目规模、类型（应用/库/Monorepo）、技术栈、部署环境。
   - 痛点排序：构建速度、产物体积、开发体验、生态、稳定性。

2. **候选工具评估矩阵**：
   | 维度 | 权重 | Webpack | Vite | Rspack | Rollup |
   |------|------|---------|------|--------|--------|
   | 构建速度 | 25% | 中 | 高 | 高 | 高 |
   | 生态成熟度 | 25% | 高 | 高 | 中 | 中 |
   | 迁移成本 | 20% | - | 中 | 低 | 高 |
   | 团队熟悉度 | 15% | 高 | 中 | 低 | 中 |
   | 长期维护 | 15% | 中 | 高 | 高 | 中 |

3. **POC 验证**：
   - 在真实业务分支上跑关键指标：冷启动、HMR、生产构建、产物体积、测试通过率。

4. **决策评审**：
   - 架构委员会根据评估矩阵和 POC 结果决策，记录 ADR。

二、ROI 评估：

1. **成本**：
   - 迁移人力（改造配置、插件、代码）、培训、双轨运行维护、风险兜底。

2. **收益**：
   - 构建时间节省 × 团队规模 × 构建次数。
   - 开发体验提升带来的效率增益。
   - 长期维护成本降低。

3. **公式**：
   ```
   ROI = (年收益 - 年成本) / 年成本 × 100%
   ```

4. **非量化收益**：
   - 技术债减少、团队技术成长、招聘吸引力。

三、落地原则：
- 优先解决最大痛点，避免为迁移而迁移。
- 复杂项目采用局部试点再推广。

**评分维度**：
- 决策框架结构清晰（40%）
- ROI 评估维度全面（30%）
- 能结合具体场景给出建议（30%）

**常见错误**：
- 只看构建速度，忽略生态和迁移成本
- ROI 评估只算硬件成本，不算人力与风险

**延伸追问**：
- 如果两个工具评分接近，如何最终决策？
- 如何向非技术管理层解释迁移 ROI？

**相关题目**：
- [FB-10-CP-R-001 如何评估和迁移前端构建工具](#FB-10-CP-R-001)
- [FB-10-SC-A-017 从 Webpack 迁移到 Vite](#FB-10-SC-A-017)

**参考资源**：
- [Architecture Decision Records](https://adr.github.io/)
- [Webpack vs Vite Benchmarks](https://vitejs.dev/guide/why.html)

**口头回答版**：
选型要先明确项目痛点，用评估矩阵打分，再做 POC 验证。ROI 要算迁移人力、培训和双轨成本，以及构建节省和开发体验提升。不要为换而换，优先解决最大痛点，复杂项目先试点。

---




