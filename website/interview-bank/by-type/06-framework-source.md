# 框架原理题

> 本文件按题型收录 **框架原理题** 相关前端面试题索引。
> 共收录 **67** 道题（基础 0 / 进阶 7 / 深入 57 / 架构 3）。
> 每道题都附带完整参考答案与评分维度，点击链接可查看原文。

## 基础题（0 道）{#basic}


## 进阶题（7 道）{#advanced}

### Vue（1 道）

- [FB-16-FS-A-001 Vue 3 的 Scheduler 调度器是如何工作的？](../by-domain/16-vue.md#FB-16-FS-A-001)

### 微前端（2 道）

- [FB-26-FS-A-009 请解释 qiankun 的 JS 沙箱实现原理。](../by-domain/26-micro-frontend.md#FB-26-FS-A-009)
- [FB-26-FS-A-010 single-spa 如何劫持路由并决定加载/卸载哪个子应用？](../by-domain/26-micro-frontend.md#FB-26-FS-A-010)

### 可视化与图形（1 道）

- [FB-34-FS-A-011 ECharts 的 series、data、option 更新机制是怎样的？如何避免“全量更新”？](../by-domain/34-visualization-graphics.md#FB-34-FS-A-011)

### Flutter（3 道）

- [FB-47-FS-A-001 请详细描述 Flutter 的渲染流程：从 Widget 到屏幕像素经历了哪些阶段？](../by-domain/47-flutter.md#FB-47-FS-A-001)
- [FB-47-FS-A-002 Skia 和 Impeller 有什么区别？Impeller 解决了什么问题？](../by-domain/47-flutter.md#FB-47-FS-A-002)
- [FB-47-FS-A-004 Provider 是如何基于 InheritedWidget 工作的？](../by-domain/47-flutter.md#FB-47-FS-A-004)

## 深入题（57 道）{#proficient}

### React（15 道）

- [FB-15-FS-P-018 React Fiber 架构解决了什么问题？请简述它的两个阶段。](../by-domain/15-react.md#FB-15-FS-P-018)
- [FB-15-FS-P-019 setState 是异步还是同步的？React 18 的自动批量更新有什么变化？](../by-domain/15-react.md#FB-15-FS-P-019)
- [FB-15-FS-P-020 React 的 Diff 算法是如何工作的？key 在其中起什么作用？](../by-domain/15-react.md#FB-15-FS-P-020)
- [FB-15-FS-P-021 React 18 的 Concurrent 特性有哪些？useTransition 和 useDeferredValue 怎么用？](../by-domain/15-react.md#FB-15-FS-P-021)
- [FB-15-FS-P-023 什么是 React Server Components（RSC）？它和 Client Components 有什么区别？](../by-domain/15-react.md#FB-15-FS-P-023)
- [FB-15-FS-P-024 Suspense 是什么？如何与数据获取、Error Boundary 配合使用？](../by-domain/15-react.md#FB-15-FS-P-024)
- [FB-15-FS-P-025 React 19 的 Server Actions 和 useOptimistic 解决了什么问题？](../by-domain/15-react.md#FB-15-FS-P-025)
- [FB-15-FS-P-026 什么是 Hydration？Hydration Mismatch 有哪些常见原因和解决办法？](../by-domain/15-react.md#FB-15-FS-P-026)
- [FB-15-FS-P-048 React 的 Reconciliation 是什么？和 Diff 有什么关系？](../by-domain/15-react.md#FB-15-FS-P-048)
- [FB-15-FS-P-049 React Scheduler 是如何调度任务的？](../by-domain/15-react.md#FB-15-FS-P-049)
- [FB-15-FS-P-050 为什么 Hooks 必须在顶层调用？](../by-domain/15-react.md#FB-15-FS-P-050)
- [FB-15-FS-P-051 React 的双缓冲机制是什么？](../by-domain/15-react.md#FB-15-FS-P-051)
- [FB-15-FS-P-053 React Compiler 是什么？它能解决什么问题？](../by-domain/15-react.md#FB-15-FS-P-053)
- [FB-15-FS-P-054 React 19 的 use 特性有什么作用？](../by-domain/15-react.md#FB-15-FS-P-054)
- [FB-15-FS-P-056 React 19 还有哪些值得关注的新特性？](../by-domain/15-react.md#FB-15-FS-P-056)

### Vue（7 道）

- [FB-16-FS-P-018 Vue 3 的响应式原理是什么？为什么用 Proxy 替代 Object.defineProperty？](../by-domain/16-vue.md#FB-16-FS-P-018)
- [FB-16-FS-P-019 Vue 3 的编译器做了哪些优化？PatchFlag 和静态提升是什么？](../by-domain/16-vue.md#FB-16-FS-P-019)
- [FB-16-FS-P-020 Vue 中常见的响应式“坑”有哪些？如何避免？](../by-domain/16-vue.md#FB-16-FS-P-020)
- [FB-16-FS-P-021 Vue 的 Diff 算法是怎么工作的？](../by-domain/16-vue.md#FB-16-FS-P-021)
- [FB-16-FS-P-024 Vue 3 的 Teleport、Suspense、Fragment 分别是什么？](../by-domain/16-vue.md#FB-16-FS-P-024)
- [FB-16-FS-P-025 Vue SSR / Nuxt 3 中有哪些需要注意的问题？](../by-domain/16-vue.md#FB-16-FS-P-025)
- [FB-16-FS-P-026 Vue 3 的 effectScope 是什么？有什么作用？](../by-domain/16-vue.md#FB-16-FS-P-026)

### 跨端技术（7 道）

- [FB-17-FS-P-016 小程序的底层渲染原理是什么？Skyline 和 WebView 渲染有什么区别？](../by-domain/17-cross-platform.md#FB-17-FS-P-016)
- [FB-17-FS-P-017 React Native 新架构（New Architecture）解决了什么问题？](../by-domain/17-cross-platform.md#FB-17-FS-P-017)
- [FB-17-FS-P-018 Flutter 的渲染管线是怎样的？三棵树分别负责什么？](../by-domain/17-cross-platform.md#FB-17-FS-P-018)
- [FB-17-FS-P-048 小程序 Skyline 渲染引擎相比 WebView 有哪些改进？](../by-domain/17-cross-platform.md#FB-17-FS-P-048)
- [FB-17-FS-P-049 React Native 的 JSI 和 TurboModules 解决了什么问题？](../by-domain/17-cross-platform.md#FB-17-FS-P-049)
- [FB-17-FS-P-050 Flutter 的渲染管线是怎样的？Impeller 替代 Skia 有什么意义？](../by-domain/17-cross-platform.md#FB-17-FS-P-050)
- [FB-17-FS-P-054 Electron 的进程模型和上下文隔离机制是怎样的？](../by-domain/17-cross-platform.md#FB-17-FS-P-054)

### AI 工程化（2 道）

- [FB-18-FS-P-018 LangChain / LlamaIndex 的核心抽象是什么？前端如何选择？](../by-domain/18-ai-engineering.md#FB-18-FS-P-018)
- [FB-18-FS-P-019 浅析 Vercel AI SDK 的 streamText / generateObject 实现原理](../by-domain/18-ai-engineering.md#FB-18-FS-P-019)

### Node.js / BFF（2 道）

- [FB-19-FS-P-017 NestJS 的装饰器（Decorator）原理是什么？如何手写一个装饰器？](../by-domain/19-node-bff.md#FB-19-FS-P-017)
- [FB-19-FS-P-048 NestJS 中 Guard、Interceptor、Pipe、ExceptionFilter 的执行顺序是什么？](../by-domain/19-node-bff.md#FB-19-FS-P-048)

### 开发者体验与工程效能（1 道）

- [FB-21-FS-P-001 Prettier 的 AST 打印流程是什么？如何为文档站点定制代码格式化插件](../by-domain/21-dx.md#FB-21-FS-P-001)

### 部署与 SRE（1 道）

- [FB-22-FS-P-001 Lighthouse CI 如何集成到部署流水线中实现性能门禁与零停机发布？](../by-domain/22-deployment-sre.md#FB-22-FS-P-001)

### 包管理与供应链安全（2 道）

- [FB-23-FS-P-017 pnpm 的 content-addressable store 与 hard link 机制是如何工作的？](../by-domain/23-package-supply-chain.md#FB-23-FS-P-017)
- [FB-23-FS-P-018 license-checker 等工具如何扫描 node_modules 并识别许可证冲突？](../by-domain/23-package-supply-chain.md#FB-23-FS-P-018)

### 微前端（1 道）

- [FB-26-FS-P-017 qiankun 沙箱存在哪些逃逸风险？多实例场景下如何处理副作用？](../by-domain/26-micro-frontend.md#FB-26-FS-P-017)

### 数据与状态管理（2 道）

- [FB-29-FS-P-017 Redux 中间件原理是什么？请手写一个 logger 中间件](../by-domain/29-data-state.md#FB-29-FS-P-017)
- [FB-29-FS-P-018 React Query 的缓存和失效机制底层是怎么工作的？](../by-domain/29-data-state.md#FB-29-FS-P-018)

### 可视化与图形（1 道）

- [FB-34-FS-P-018 D3.js 的 join 模式、数据绑定与 enter/update/exit 在 v5/v6/v7 中有何演进？](../by-domain/34-visualization-graphics.md#FB-34-FS-P-018)

### 小程序（3 道）

- [FB-45-FS-P-001 小程序 Exparser 组件框架和虚拟 DOM 渲染原理是什么？](../by-domain/45-mini-program.md#FB-45-FS-P-001)
- [FB-45-FS-P-004 小程序自定义组件的 behaviors、relations 和 slot 实现机制是什么？](../by-domain/45-mini-program.md#FB-45-FS-P-004)
- [FB-45-FS-P-005 小程序的同层渲染原理是什么？解决了什么问题？](../by-domain/45-mini-program.md#FB-45-FS-P-005)

### 鸿蒙 ArkTS / HarmonyOS（2 道）

- [FB-46-FS-P-017 ArkUI 的渲染原理是什么？状态变化后如何触发 UI 更新？](../by-domain/46-harmonyos.md#FB-46-FS-P-017)
- [FB-46-FS-P-024 鸿蒙与 Android / iOS / 小程序 / Flutter 在技术范式上有哪些本质差异？](../by-domain/46-harmonyos.md#FB-46-FS-P-024)

### Flutter（3 道）

- [FB-47-FS-P-001 Impeller 的渲染管线是怎样的？相比 Skia 在哪些环节做了优化？](../by-domain/47-flutter.md#FB-47-FS-P-001)
- [FB-47-FS-P-005 Platform Channel 的编解码机制是怎样的？如何实现自定义 Codec？](../by-domain/47-flutter.md#FB-47-FS-P-005)
- [FB-47-FS-P-006 StatefulWidget 的生命周期与 Element 的复用机制是怎样的？](../by-domain/47-flutter.md#FB-47-FS-P-006)

### Electron（1 道）

- [FB-48-FS-P-001 Electron 的进程模型与 Chromium 有什么关系？](../by-domain/48-electron.md#FB-48-FS-P-001)

### WebAssembly（4 道）

- [FB-49-FS-P-001 WebAssembly 模块的二进制格式结构是怎样的？](../by-domain/49-webassembly.md#FB-49-FS-P-001)
- [FB-49-FS-P-002 WebAssembly 的验证（Validation）和实例化（Instantiation）过程是怎样的？](../by-domain/49-webassembly.md#FB-49-FS-P-002)
- [FB-49-FS-P-003 WebAssembly 如何实现动态链接和模块间调用？](../by-domain/49-webassembly.md#FB-49-FS-P-003)
- [FB-49-FS-P-005 WebAssembly 的内存管理与垃圾回收机制是怎样的？](../by-domain/49-webassembly.md#FB-49-FS-P-005)

### 多媒体（Multimedia）（2 道）

- [FB-51-FS-P-017 HLS 直播低延迟优化方案（LL-HLS）的原理是什么？](../by-domain/51-multimedia.md#FB-51-FS-P-017)
- [FB-51-FS-P-023 Web Audio 中的 AudioWorklet 和 ScriptProcessorNode 有什么区别？](../by-domain/51-multimedia.md#FB-51-FS-P-023)

### 低代码（1 道）

- [FB-52-FS-P-001 低代码渲染引擎的核心原理是什么？](../by-domain/52-low-code.md#FB-52-FS-P-001)

## 架构题（3 道）{#architect}

### 开发者体验与工程效能（1 道）

- [FB-21-FS-R-001 Design Token 的多平台转换原理是什么？如何设计可扩展的 Token 编译管线](../by-domain/21-dx.md#FB-21-FS-R-001)

### 部署与 SRE（1 道）

- [FB-22-FS-R-001 请解释 DNS 域名解析的核心原理，及其与前端部署安全（如 RPO、DNS 劫持）的关系。](../by-domain/22-deployment-sre.md#FB-22-FS-R-001)

### 包管理与供应链安全（1 道）

- [FB-23-FS-R-001 前端构建工具链如何处理 node_modules 的 bundle size 优化？](../by-domain/23-package-supply-chain.md#FB-23-FS-R-001)

