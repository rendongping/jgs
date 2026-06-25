# 构建工具练习册

> 本练习册基于《构建工具学习文档》编写，涵盖 Webpack、Vite、Rollup、esbuild、Rspack、Tree Shaking、Code Splitting、Loader/Plugin 开发等核心知识点。每题均附答案与解析，难度由浅入深。

---

## 一、选择题

### 第 1 题
Webpack 中，负责把非 JavaScript 资源（如 CSS、图片）转换成 Webpack 能处理模块的是？

A. Plugin  
B. Loader  
C. Entry  
D. Output

::: details 查看答案与解析
**答案：B**

**解析：** Loader 是 Webpack 的"翻译官"，负责将 CSS、图片、TypeScript、Vue 等非 JS 资源转换为模块；Plugin 负责在构建生命周期中执行更广泛的任务，如压缩、生成 HTML 等。
:::

---

### 第 2 题
Vite 在开发环境下为什么启动速度快？

A. 使用了多线程打包  
B. 利用浏览器原生 ESM，按需加载模块  
C. 预先把所有模块打包成 bundle  
D. 使用了 Webpack 的持久化缓存

::: details 查看答案与解析
**答案：B**

**解析：** Vite 开发环境基于浏览器原生 ES Modules，浏览器请求哪个模块，Vite 服务器才编译并返回哪个模块，无需预先全量打包。生产环境才使用 Rollup 打包。
:::

---

### 第 3 题
以下哪种代码分割方式是 Webpack 原生支持的？

A. 仅支持手动多入口  
B. 仅支持动态导入 `import()`  
C. 多入口、动态导入、SplitChunksPlugin  
D. 仅支持 Tree Shaking

::: details 查看答案与解析
**答案：C**

**解析：** Webpack 支持三种代码分割方式：入口起点分割、动态导入 `import()` 和 SplitChunksPlugin 自动提取公共模块。
:::

---

### 第 4 题
Tree Shaking 删除未使用代码主要依赖什么？

A. CommonJS 的动态 require  
B. ESM 的静态 import/export 结构  
C. Webpack 的 Loader 链式调用  
D. Plugin 的 emit 阶段

::: details 查看答案与解析
**答案：B**

**解析：** Tree Shaking 依赖 ESM 的静态结构，因为 import/export 在编译时即可确定依赖关系，打包工具能分析哪些导出被使用。CommonJS 的动态 require 不利于 Tree Shaking。
:::

---

### 第 5 题
在 `use: ['style-loader', 'css-loader']` 中，Loader 的执行顺序是？

A. 从左到右：style-loader → css-loader  
B. 从右到左：css-loader → style-loader  
C. 同时执行  
D. 随机执行

::: details 查看答案与解析
**答案：B**

**解析：** Webpack 的 Loader 链按"从右到左、从下到上"执行。先由 css-loader 解析 CSS 文件，再由 style-loader 把 CSS 注入 DOM。
:::

---

## 二、填空题

### 第 6 题
Webpack 的打包过程大致分为四个阶段：初始化（Initialization）、编译（Compilation）、优化与分块（Optimization & Sealing）、________。

::: details 查看答案与解析
**答案：输出（Emit）**

**解析：** 四个阶段分别是初始化、编译、优化与分块、输出。输出阶段把 Chunk 写入到输出目录，生成最终的静态资源文件。
:::

---

### 第 7 题
Vite 在首次启动时会对依赖进行预构建，预构建后的缓存目录默认位于 ________。

::: details 查看答案与解析
**答案：`node_modules/.vite/deps/`**

**解析：** Vite 使用 esbuild 对 CommonJS/UMD 包进行预构建，将其转换为 ESM 并合并成少量大文件，结果缓存在 `node_modules/.vite/deps/`。
:::

---

### 第 8 题
Webpack 5 开启持久化缓存，应在配置中设置 `cache: { type: '________' }`。

::: details 查看答案与解析
**答案：filesystem**

**解析：** Webpack 5 内置文件系统缓存，开启后可大幅提升二次构建速度。
:::

---

### 第 9 题
Rollup 专注于 JavaScript 库的打包，它基于 ________，天然支持 Tree Shaking。

::: details 查看答案与解析
**答案：ESM（ECMAScript Modules）**

**解析：** Rollup 基于 ESM，打包结果扁平、无冗余，非常适合组件库、工具库。
:::

---

### 第 10 题
HMR（热模块替换）通过 ________ 把更新推送给浏览器。

::: details 查看答案与解析
**答案：WebSocket**

**解析：** Webpack Dev Server 监听到文件变化后重新编译，并通过 WebSocket 将更新推送给浏览器，浏览器端 HMR Runtime 负责替换模块。
:::

---

## 三、代码分析题

### 第 11 题
分析以下 Webpack 配置，回答每个 Loader/Plugin 的作用。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};
```

::: details 查看答案与解析
**答案与解析：**

1. `entry: './src/index.js'`：打包入口，Webpack 从这里开始递归解析依赖。
2. `output`：指定打包产物输出到 `dist/bundle.js`。
3. `css-loader`：解析 CSS 文件中的 `@import` 和 `url()`，把 CSS 转成 JS 模块。
4. `style-loader`：将 CSS 内容注入到 DOM 的 `<style>` 标签中。
5. `babel-loader`：将 ES6+/TS 转译为兼容的 JavaScript。
6. `HtmlWebpackPlugin`：根据模板 `public/index.html` 自动生成最终 HTML，并自动引入打包后的 bundle。
:::

---

### 第 12 题
分析以下 Tree Shaking 示例，说明最终产物中是否包含 `minus` 函数，为什么？

```javascript
// utils.js
export const add = (a, b) => a + b;
export const minus = (a, b) => a - b;

// main.js
import { add } from './utils.js';
console.log(add(1, 2));
```

::: details 查看答案与解析
**答案与解析：**

最终产物中**不应包含 `minus` 函数**。因为代码使用 ESM 的 `import/export`，结构静态可分析，打包工具能识别 `minus` 未被使用，从而通过 Tree Shaking 将其删除。

注意：若 `package.json` 中 `sideEffects` 配置不当，或代码存在副作用，Tree Shaking 效果可能受影响。
:::

---

### 第 13 题
分析以下 Vite 插件代码，说明 `transform` 钩子会做什么？

```javascript
export default function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      if (id.endsWith('.js')) {
        return code.replace('console.log', '// console.log');
      }
    }
  };
}
```

::: details 查看答案与解析
**答案与解析：**

`transform` 是 Vite/Rollup 中用于转换模块内容的钩子。该插件会对所有 `.js` 文件执行转换，把代码中的 `console.log` 替换为 `// console.log`，即注释掉所有的 `console.log` 调用。这在生产构建中可用于移除调试日志。
:::

---

### 第 14 题
分析以下 Webpack Plugin 代码，指出它介入了哪个生命周期阶段，并说明功能。

```javascript
class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      console.log('资源正在输出...');
    });
  }
}
```

::: details 查看答案与解析
**答案与解析：**

该插件介入了 Webpack 的 `emit` 阶段，即资源输出到文件系统之前。功能是在输出资源前打印日志。`emit` 是 Webpack 中常用的钩子，适合生成清单文件、修改资源内容等操作。
:::

---

### 第 15 题
分析以下 `splitChunks` 配置，说明其作用。

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      }
    }
  }
}
```

::: details 查看答案与解析
**答案与解析：**

该配置表示对所有 chunk（包括异步和非异步）应用代码分割，并创建一个名为 `vendors` 的缓存组，将来自 `node_modules` 的模块提取到单独的 chunk 中。这样可以避免业务代码和第三方库混在一个 bundle 中，提高缓存命中率并减少首屏加载体积。
:::

---

## 四、实践题

### 第 16 题
请写出一份 Webpack 配置，实现以下需求：

1. 入口为 `src/main.js`；
2. 输出到 `dist/app.[contenthash:8].js`；
3. 支持解析 `.css` 和 `.ts` 文件；
4. 使用 `HtmlWebpackPlugin` 生成 HTML。

::: details 查看答案与解析
**参考答案：**

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[contenthash:8].js',
    clean: true
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};
```

**解析：**

- `[contenthash:8]` 为输出文件名添加内容哈希，便于长期缓存。
- `clean: true` 在每次构建前清空 dist 目录。
- `ts-loader` 将 TypeScript 编译为 JavaScript。
:::

---

### 第 17 题
请为一个 React 项目配置 Vite 开发服务器，要求：

1. 端口为 3000；
2. 开发时自动打开浏览器；
3. 生产构建时输出到 `build` 目录；
4. 配置 `@/` 别名指向 `src/`。

::: details 查看答案与解析
**参考答案：**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
```

**解析：**

- `server.port` 和 `server.open` 配置开发服务器端口与自动打开浏览器。
- `build.outDir` 指定生产构建输出目录。
- `resolve.alias` 配置路径别名，方便项目中使用 `@/components/Button` 等路径。
:::

---

### 第 18 题
请写出一个自定义 Webpack Loader，功能是将源文件中的所有 `console.log(...)` 调用删除。

::: details 查看答案与解析
**参考答案：**

```javascript
// remove-console-loader.js
module.exports = function(source) {
  return source.replace(/console\.log\([^)]*\);?/g, '');
};
```

使用方式：

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: path.resolve(__dirname, 'remove-console-loader.js')
      }
    ]
  }
};
```

**解析：**

Loader 本质上是一个函数，接收源文件内容字符串 `source`，返回处理后的内容。该 Loader 使用正则匹配 `console.log(...)` 并删除。实际项目中可配合 AST 解析（如 `babel-loader` + babel plugin）实现更安全的删除。
:::

---

### 第 19 题
请写一个自定义 Webpack Plugin，在构建完成后输出 "Build finished!" 到控制台。

::: details 查看答案与解析
**参考答案：**

```javascript
class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', (stats) => {
      console.log('Build finished!');
    });
  }
}

module.exports = DonePlugin;
```

使用方式：

```javascript
const DonePlugin = require('./DonePlugin');

module.exports = {
  plugins: [new DonePlugin()]
};
```

**解析：**

Plugin 必须提供 `apply(compiler)` 方法，通过 `compiler.hooks` 注册钩子回调。`done` 钩子在编译完成时触发，适合执行构建后的通知、统计等操作。
:::

---

### 第 20 题
请描述如何优化一个大型 Webpack 项目的构建速度，列出至少 5 条具体措施。

::: details 查看答案与解析
**参考答案：**

1. **开启持久化缓存**：配置 `cache: { type: 'filesystem' }`。
2. **使用多线程打包**：对耗时的 Loader 使用 `thread-loader`。
3. **缩小 Loader 搜索范围**：使用 `include`/`exclude` 限制处理文件。
4. **合理使用 `DllPlugin` 或 `externals`**：将不常变化的第三方库排除在业务构建外。
5. **升级 Webpack 5 并利用内置优化**：如 Tree Shaking、模块缓存等。
6. **使用 Rspack 或 Vite 迁移**：在适合的场景下用更快速的工具替代。
7. **分析产物体积**：使用 `webpack-bundle-analyzer` 定位大体积依赖。

**解析：**

构建速度优化需要从缓存、并行、范围控制、工具选型等多维度入手。实际项目中应先通过分析工具定位瓶颈，再有针对性地优化。
:::

---

## 参考答案速查表

| 题号 | 题型 | 答案 |
|------|------|------|
| 1 | 选择 | B |
| 2 | 选择 | B |
| 3 | 选择 | C |
| 4 | 选择 | B |
| 5 | 选择 | B |
| 6 | 填空 | 输出（Emit） |
| 7 | 填空 | `node_modules/.vite/deps/` |
| 8 | 填空 | filesystem |
| 9 | 填空 | ESM |
| 10 | 填空 | WebSocket |
| 11-15 | 代码分析 | 见解析 |
| 16-20 | 实践 | 见参考答案 |

---

> **领域编号**：E01 构建工具  
> **最后更新**：2026-06-18
