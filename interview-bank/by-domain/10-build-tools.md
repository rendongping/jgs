# 构建工具 面试题

> 本文件收录构建工具相关面试题，目标题量 40 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、工程化题、性能优化题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#基础题)
- [进阶题](#进阶题)
- [深入题](#深入题)
- [架构题](#架构题)

---

## 基础题

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

---

## 进阶题

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

---

## 深入题

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

---

## 架构题

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

---
