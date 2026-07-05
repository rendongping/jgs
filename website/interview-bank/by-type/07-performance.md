# 性能优化题

> 本文件按题型收录 **性能优化题** 相关前端面试题索引。
> 共收录 **152** 道题（基础 13 / 进阶 55 / 深入 66 / 架构 18）。
> 每道题都附带完整参考答案与评分维度，点击链接可查看原文。

## 基础题（13 道）{#basic}

### Browser（1 道）

- [FB-03-PE-B-001 什么是强缓存和协商缓存？分别由哪些 HTTP 头控制？](../by-domain/03-browser.md#FB-03-PE-B-001)

### 构建工具（1 道）

- [FB-10-PE-B-001 构建产物体积过大时有哪些基础排查方法？](../by-domain/10-build-tools.md#FB-10-PE-B-001)

### Vue（1 道）

- [FB-16-PE-B-001 如何避免 Vue 组件不必要的重渲染？](../by-domain/16-vue.md#FB-16-PE-B-001)

### AI 工程化（1 道）

- [FB-18-PE-B-039 如何降低前端 AI 功能的首屏加载时间？](../by-domain/18-ai-engineering.md#FB-18-PE-B-039)

### 开发者体验与工程效能（1 道）

- [FB-21-PE-B-001 平台工程团队如何度量和优化 pnpm 依赖安装性能](../by-domain/21-dx.md#FB-21-PE-B-001)

### 部署与 SRE（1 道）

- [FB-22-PE-B-001 前端静态资源访问量翻倍时，如何排查并优化 CDN/边缘缓存扩容中的性能瓶颈？](../by-domain/22-deployment-sre.md#FB-22-PE-B-001)

### 包管理与供应链安全（1 道）

- [FB-23-PE-B-001 pnpm install 因版本冲突导致解析变慢，如何排查与优化？](../by-domain/23-package-supply-chain.md#FB-23-PE-B-001)

### 前端运维与监控（1 道）

- [FB-24-PE-B-006 页面性能监控通常需要采集哪些指标？](../by-domain/24-frontend-operations.md#FB-24-PE-B-006)

### 可观测性（2 道）

- [FB-30-PE-B-005 什么是 RUM？它通常采集哪些性能指标？](../by-domain/30-observability.md#FB-30-PE-B-005)
- [FB-30-PE-B-006 Core Web Vitals 包含哪些指标？如何优化？](../by-domain/30-observability.md#FB-30-PE-B-006)

### 可视化与图形（1 道）

- [FB-34-PE-B-001 如何解决大数据量可视化性能问题？](../by-domain/34-visualization-graphics.md#FB-34-PE-B-001)

### WebAssembly（1 道）

- [FB-49-PE-B-008 WebAssembly 在哪些场景有性能优势？哪些场景不适合？](../by-domain/49-webassembly.md#FB-49-PE-B-008)

### 多媒体（Multimedia）（1 道）

- [FB-51-PE-B-006 video 标签的 preload 和 autoplay 属性有什么作用？](../by-domain/51-multimedia.md#FB-51-PE-B-006)

## 进阶题（55 道）{#advanced}

### Browser（6 道）

- [FB-03-PE-A-001 如何识别并避免布局抖动（Layout Thrashing）？](../by-domain/03-browser.md#FB-03-PE-A-001)
- [FB-03-PE-A-002 什么是关键渲染路径（CRP）？如何优化首屏加载？](../by-domain/03-browser.md#FB-03-PE-A-002)
- [FB-03-PE-A-003 Performance API 中 LCP、FID、CLS 分别衡量什么？如何优化？](../by-domain/03-browser.md#FB-03-PE-A-003)
- [FB-03-PE-A-004 如何通过 PerformanceObserver 采集性能指标？](../by-domain/03-browser.md#FB-03-PE-A-004)
- [FB-03-PE-A-005 浏览器渲染主流程是什么？DOM、CSSOM、Render Tree 的关系？](../by-domain/03-browser.md#FB-03-PE-A-005)
- [FB-03-PE-A-006 什么是 CRP（Critical Rendering Path）？如何优化？](../by-domain/03-browser.md#FB-03-PE-A-006)

### 计算机网络（1 道）

- [FB-04-PE-A-001 前端网络优化有哪些常用手段？](../by-domain/04-network.md#FB-04-PE-A-001)

### HTML/CSS（1 道）

- [FB-06-PE-A-001 CSS 性能优化有哪些常见手段？](../by-domain/06-html-css.md#FB-06-PE-A-001)

### 构建工具（5 道）

- [FB-10-PE-A-001 如何优化 Webpack 构建速度？请列举至少 5 种方法。](../by-domain/10-build-tools.md#FB-10-PE-A-001)
- [FB-10-PE-A-002 如何分析并优化前端打包体积？](../by-domain/10-build-tools.md#FB-10-PE-A-002)
- [FB-10-PE-A-003 如何针对大型依赖做按需加载和构建优化？](../by-domain/10-build-tools.md#FB-10-PE-A-003)
- [FB-10-PE-A-004 如何分析 Webpack 构建耗时分布并定位瓶颈？](../by-domain/10-build-tools.md#FB-10-PE-A-004)
- [FB-10-PE-A-015 如何分析并可视化前端打包体积？](../by-domain/10-build-tools.md#FB-10-PE-A-015)

### CI/CD（1 道）

- [FB-12-PE-A-021 如何优化前端 CI 流水线的性能？](../by-domain/12-ci-cd.md#FB-12-PE-A-021)

### Vue（1 道）

- [FB-16-PE-A-001 Vue 长列表性能优化有哪些方案？](../by-domain/16-vue.md#FB-16-PE-A-001)

### 跨端技术（3 道）

- [FB-17-PE-A-009 小程序有哪些常见的性能优化手段？](../by-domain/17-cross-platform.md#FB-17-PE-A-009)
- [FB-17-PE-A-039 跨端应用的首屏加载可以从哪些方面优化？](../by-domain/17-cross-platform.md#FB-17-PE-A-039)
- [FB-17-PE-A-047 React Native 长列表如何优化性能？](../by-domain/17-cross-platform.md#FB-17-PE-A-047)

### AI 工程化（3 道）

- [FB-18-PE-A-013 LLM 应用的成本与延迟如何优化？](../by-domain/18-ai-engineering.md#FB-18-PE-A-013)
- [FB-18-PE-A-014 如何优化 AI 聊天应用的首屏体验和交互流畅度？](../by-domain/18-ai-engineering.md#FB-18-PE-A-014)
- [FB-18-PE-A-047 如何优化前端 RAG 应用的检索延迟？](../by-domain/18-ai-engineering.md#FB-18-PE-A-047)

### Node.js / BFF（2 道）

- [FB-19-PE-A-016 Node.js 服务有哪些常见的性能优化手段？](../by-domain/19-node-bff.md#FB-19-PE-A-016)
- [FB-19-PE-A-042 Node.js 服务的日志规范应如何设计？如何接入 ELK/Loki？](../by-domain/19-node-bff.md#FB-19-PE-A-042)

### Git 工作流与变更管理（1 道）

- [FB-20-PE-A-001 大型 Git 仓库有哪些性能优化手段？](../by-domain/20-git-workflow.md#FB-20-PE-A-001)

### 开发者体验与工程效能（4 道）

- [FB-21-PE-A-011 大型前端项目冷启动慢，如何系统性地分析和优化构建性能？](../by-domain/21-dx.md#FB-21-PE-A-011)
- [FB-21-PE-A-041 如何优化前端项目的依赖安装速度？](../by-domain/21-dx.md#FB-21-PE-A-041)
- [FB-21-PE-A-074 前端项目的 HMR 失效或变慢，如何排查和优化？](../by-domain/21-dx.md#FB-21-PE-A-074)
- [FB-21-PE-A-075 组件库 Monorepo 中 Jest 测试越跑越慢，如何排查与优化](../by-domain/21-dx.md#FB-21-PE-A-075)

### 部署与 SRE（2 道）

- [FB-22-PE-A-013 前端性能基线如何建立和监控？](../by-domain/22-deployment-sre.md#FB-22-PE-A-013)
- [FB-22-PE-A-014 如何排查并优化前端 SSR 服务高可用架构中的性能瓶颈？](../by-domain/22-deployment-sre.md#FB-22-PE-A-014)

### 包管理与供应链安全（2 道）

- [FB-23-PE-A-014 如何做包体积分析？有哪些常用工具和优化手段？](../by-domain/23-package-supply-chain.md#FB-23-PE-A-014)
- [FB-23-PE-A-015 前端项目依赖数量庞大时，如何优化许可证扫描的性能与准确性？](../by-domain/23-package-supply-chain.md#FB-23-PE-A-015)

### 前端运维与监控（2 道）

- [FB-24-PE-A-004 如何检测和分析前端长任务与页面卡顿？](../by-domain/24-frontend-operations.md#FB-24-PE-A-004)
- [FB-24-PE-A-008 如何监控前端网络质量？](../by-domain/24-frontend-operations.md#FB-24-PE-A-008)

### 系统架构设计（2 道）

- [FB-25-PE-A-006 从架构视角看，性能优化应该如何系统化思考？](../by-domain/25-system-architecture.md#FB-25-PE-A-006)
- [FB-25-PE-A-016 从架构角度设计一个首屏加载优化方案](../by-domain/25-system-architecture.md#FB-25-PE-A-016)

### 微前端（1 道）

- [FB-26-PE-A-015 微前端场景下有哪些性能优化手段？](../by-domain/26-micro-frontend.md#FB-26-PE-A-015)

### 性能工程（4 道）

- [FB-27-PE-A-001 如何优化 LCP（Largest Contentful Paint）？](../by-domain/27-performance.md#FB-27-PE-A-001)
- [FB-27-PE-A-002 如何优化 CLS（Cumulative Layout Shift）？](../by-domain/27-performance.md#FB-27-PE-A-002)
- [FB-27-PE-A-003 如何优化 INP（Interaction to Next Paint）？](../by-domain/27-performance.md#FB-27-PE-A-003)
- [FB-27-PE-A-004 HTTP 缓存中的强缓存和协商缓存有什么区别？](../by-domain/27-performance.md#FB-27-PE-A-004)

### 可观测性（1 道）

- [FB-30-PE-A-011 Synthetic 监控与 RUM 有什么区别？](../by-domain/30-observability.md#FB-30-PE-A-011)

### 可视化与图形（1 道）

- [FB-34-PE-A-012 Canvas 大数据量渲染性能调优：离屏渲染、分层、脏矩形、requestAnimationFrame](../by-domain/34-visualization-graphics.md#FB-34-PE-A-012)

### Serverless/Edge（1 道）

- [FB-35-PE-A-001 Serverless 冷启动如何优化？](../by-domain/35-serverless-edge.md#FB-35-PE-A-001)

### 前端数据工程（1 道）

- [FB-36-PE-A-001 前端如何处理大数据量？](../by-domain/36-data-engineering.md#FB-36-PE-A-001)

### 小程序（2 道）

- [FB-45-PE-A-004 小程序分包加载的原理是什么？如何配置？](../by-domain/45-mini-program.md#FB-45-PE-A-004)
- [FB-45-PE-A-005 小程序性能优化有哪些常用手段？](../by-domain/45-mini-program.md#FB-45-PE-A-005)

### 鸿蒙 ArkTS / HarmonyOS（1 道）

- [FB-46-PE-A-015 鸿蒙中如何进行列表渲染？有哪些性能优化手段？](../by-domain/46-harmonyos.md#FB-46-PE-A-015)

### Flutter（1 道）

- [FB-47-PE-A-007 Flutter 性能优化有哪些常用手段？](../by-domain/47-flutter.md#FB-47-PE-A-007)

### Electron（1 道）

- [FB-48-PE-A-005 Electron 应用有哪些性能优化手段？](../by-domain/48-electron.md#FB-48-PE-A-005)

### WebAssembly（1 道）

- [FB-49-PE-A-005 如何优化 WebAssembly 的启动时间和运行时性能？](../by-domain/49-webassembly.md#FB-49-PE-A-005)

### WebGPU / 图形学（1 道）

- [FB-50-PE-A-015 WebGPU 应用有哪些常见性能优化手段？](../by-domain/50-webgpu-graphics.md#FB-50-PE-A-015)

### 多媒体（Multimedia）（1 道）

- [FB-51-PE-A-010 视频播放卡顿如何排查和优化？](../by-domain/51-multimedia.md#FB-51-PE-A-010)

### 低代码（1 道）

- [FB-52-PE-A-006 低代码平台有哪些常见的性能优化手段？](../by-domain/52-low-code.md#FB-52-PE-A-006)

### 行业特化（1 道）

- [FB-56-PE-A-005 游戏行业前端性能优化的关键维度有哪些？](../by-domain/56-industry.md#FB-56-PE-A-005)

## 深入题（66 道）{#proficient}

### JavaScript（1 道）

- [FB-01-PE-P-001 V8 引擎是如何执行 JavaScript 的？解释 Ignition、TurboFan、隐藏类、内联缓存。](../by-domain/01-javascript.md#FB-01-PE-P-001)

### TypeScript（1 道）

- [FB-02-PE-P-001 如何优化大型 TypeScript 项目的编译性能？](../by-domain/02-typescript.md#FB-02-PE-P-001)

### Browser（4 道）

- [FB-03-PE-P-001 为什么 transform 和 opacity 动画通常比 top/left 动画性能更好？](../by-domain/03-browser.md#FB-03-PE-P-001)
- [FB-03-PE-P-002 长任务（Long Tasks）如何影响性能？如何检测和拆分？](../by-domain/03-browser.md#FB-03-PE-P-002)
- [FB-03-PE-P-003 浏览器是如何保证渲染进程安全的？什么是站点隔离（Site Isolation）？](../by-domain/03-browser.md#FB-03-PE-P-003)
- [FB-03-PE-P-004 如何分析并优化首屏加载时间（FCP/LCP）？](../by-domain/03-browser.md#FB-03-PE-P-004)

### 计算机网络（2 道）

- [FB-04-PE-P-001 将前端项目从 HTTP/2 迁移到 HTTP/3 需要考虑哪些性能与安全因素？](../by-domain/04-network.md#FB-04-PE-P-001)
- [FB-04-PE-P-002 前端网络性能优化可以从哪些层面入手？](../by-domain/04-network.md#FB-04-PE-P-002)

### HTML/CSS（1 道）

- [FB-06-PE-P-001 什么是关键 CSS（Critical CSS）？如何提取和优化？](../by-domain/06-html-css.md#FB-06-PE-P-001)

### 可访问性（a11y）（1 道）

- [FB-07-PE-P-001 无障碍性对页面性能有什么影响？如何优化？](../by-domain/07-a11y.md#FB-07-PE-P-001)

### 构建工具（3 道）

- [FB-10-PE-P-001 大型前端项目构建性能优化实战方案。](../by-domain/10-build-tools.md#FB-10-PE-P-001)
- [FB-10-PE-P-002 如何设计一个大型前端项目的增量构建方案？](../by-domain/10-build-tools.md#FB-10-PE-P-002)
- [FB-10-PE-P-017 大型 Monorepo 的构建性能优化有哪些关键手段？](../by-domain/10-build-tools.md#FB-10-PE-P-017)

### 代码质量与测试（2 道）

- [FB-13-PE-P-001 前端如何做性能测试？请列举指标和工具。](../by-domain/13-code-quality.md#FB-13-PE-P-001)
- [FB-13-PE-P-002 如何对前端构建产物进行体积回归测试？](../by-domain/13-code-quality.md#FB-13-PE-P-002)

### React（2 道）

- [FB-15-PE-P-052 React 中如何实现虚拟列表优化长列表？](../by-domain/15-react.md#FB-15-PE-P-052)
- [FB-15-PE-P-055 如何优化 React 应用的首屏加载性能？](../by-domain/15-react.md#FB-15-PE-P-055)

### Vue（2 道）

- [FB-16-PE-P-023 Vue 应用有哪些性能优化手段？](../by-domain/16-vue.md#FB-16-PE-P-023)
- [FB-16-PE-P-024 Vue 应用首屏加载性能如何系统优化？](../by-domain/16-vue.md#FB-16-PE-P-024)

### 跨端技术（3 道）

- [FB-17-PE-P-020 跨端动画性能如何保证一致性？](../by-domain/17-cross-platform.md#FB-17-PE-P-020)
- [FB-17-PE-P-051 跨端应用的内存优化和泄漏治理怎么做？](../by-domain/17-cross-platform.md#FB-17-PE-P-051)
- [FB-17-PE-P-056 跨端应用的包体积优化有哪些深入手段？](../by-domain/17-cross-platform.md#FB-17-PE-P-056)

### AI 工程化（5 道）

- [FB-18-PE-P-020 多模态 AI 和 Edge AI 如何在前端落地？](../by-domain/18-ai-engineering.md#FB-18-PE-P-020)
- [FB-18-PE-P-021 如何对 LLM 应用做全链路性能剖析？](../by-domain/18-ai-engineering.md#FB-18-PE-P-021)
- [FB-18-PE-P-057 如何对 LLM 推理链路进行性能剖析与优化？](../by-domain/18-ai-engineering.md#FB-18-PE-P-057)
- [FB-18-PE-P-058 大模型应用的性能优化有哪些手段？](../by-domain/18-ai-engineering.md#FB-18-PE-P-058)
- [FB-18-PE-P-059 如何保证 LLM 返回的结果可以被前端稳定渲染？](../by-domain/18-ai-engineering.md#FB-18-PE-P-059)

### Node.js / BFF（3 道）

- [FB-19-PE-P-050 如何定位并优化 Node.js 服务的 CPU 高占用问题？](../by-domain/19-node-bff.md#FB-19-PE-P-050)
- [FB-19-PE-P-055 Node.js 中如何对大文件进行流式上传、下载与断点续传？](../by-domain/19-node-bff.md#FB-19-PE-P-055)
- [FB-19-PE-P-056 Node.js 服务如何做性能调优？](../by-domain/19-node-bff.md#FB-19-PE-P-056)

### Git 工作流与变更管理（3 道）

- [FB-20-PE-P-018 面对超大型仓库，Git 有哪些优化手段？](../by-domain/20-git-workflow.md#FB-20-PE-P-018)
- [FB-20-PE-P-050 面对超大型仓库，有哪些 Git clone 加速策略？](../by-domain/20-git-workflow.md#FB-20-PE-P-050)
- [FB-20-PE-P-055 shallow clone 和 git filter-repo 各适用于什么场景？](../by-domain/20-git-workflow.md#FB-20-PE-P-055)

### 开发者体验与工程效能（2 道）

- [FB-21-PE-P-051 大型项目构建缓存失效的常见原因有哪些？如何应对？](../by-domain/21-dx.md#FB-21-PE-P-051)
- [FB-21-PE-P-082 如何系统性地优化前端测试的执行速度和稳定性？](../by-domain/21-dx.md#FB-21-PE-P-082)

### 部署与 SRE（1 道）

- [FB-22-PE-P-023 容量规划在前端场景如何应用？](../by-domain/22-deployment-sre.md#FB-22-PE-P-023)

### 前端运维与监控（1 道）

- [FB-24-PE-P-004 如何通过监控优化资源加载与 LCP？](../by-domain/24-frontend-operations.md#FB-24-PE-P-004)

### 微前端（1 道）

- [FB-26-PE-P-001 请描述 qiankun 的加载和生命周期流程。](../by-domain/26-micro-frontend.md#FB-26-PE-P-001)

### 性能工程（11 道）

- [FB-27-PE-P-001 浏览器渲染管线是怎样的？如何利用合成层（Compositor Layer）优化渲染性能？](../by-domain/27-performance.md#FB-27-PE-P-001)
- [FB-27-PE-P-002 如何优化 JavaScript 执行性能？请从任务调度、长任务拆分、主线程释放等角度说明。](../by-domain/27-performance.md#FB-27-PE-P-002)
- [FB-27-PE-P-003 如何排查和优化前端内存泄漏？](../by-domain/27-performance.md#FB-27-PE-P-003)
- [FB-27-PE-P-007 字体加载优化有哪些策略？FOUT、FOIT、FOF 分别是什么？](../by-domain/27-performance.md#FB-27-PE-P-007)
- [FB-27-PE-P-008 你如何分析一个页面的性能瓶颈？](../by-domain/27-performance.md#FB-27-PE-P-008)
- [FB-27-PE-P-009 Service Worker 如何提升性能？有哪些注意事项？](../by-domain/27-performance.md#FB-27-PE-P-009)
- [FB-27-PE-P-010 什么是关键渲染路径？如何优化？](../by-domain/27-performance.md#FB-27-PE-P-010)
- [FB-27-PE-P-011 图片优化有哪些常用手段？](../by-domain/27-performance.md#FB-27-PE-P-011)
- [FB-27-PE-P-012 如何优化首屏加载时间？](../by-domain/27-performance.md#FB-27-PE-P-012)
- [FB-27-PE-P-013 什么是长任务（Long Task）？如何优化？](../by-domain/27-performance.md#FB-27-PE-P-013)
- [FB-27-PE-P-014 你如何制定性能预算（Performance Budget）？](../by-domain/27-performance.md#FB-27-PE-P-014)

### 质量保障（1 道）

- [FB-28-PE-P-019 如何提升 E2E 测试的稳定性？](../by-domain/28-quality.md#FB-28-PE-P-019)

### 可观测性（1 道）

- [FB-30-PE-P-019 如何基于 Web Vitals + Performance API 做首屏/交互性能监控？](../by-domain/30-observability.md#FB-30-PE-P-019)

### 实时与协同（2 道）

- [FB-32-PE-P-001 实时系统如何实现水平扩展？](../by-domain/32-real-time.md#FB-32-PE-P-001)
- [FB-32-PE-P-002 实时数据流中的背压（Backpressure）如何处理？](../by-domain/32-real-time.md#FB-32-PE-P-002)

### 国际化（1 道）

- [FB-33-PE-P-001 语言包体积如何优化？](../by-domain/33-internationalization.md#FB-33-PE-P-001)

### 可视化与图形（2 道）

- [FB-34-PE-P-019 地理/地图可视化中，如何处理大规模 GeoJSON、投影变换与瓦片化？](../by-domain/34-visualization-graphics.md#FB-34-PE-P-019)
- [FB-34-PE-P-022 可视化动画与性能：requestAnimationFrame、补间、时间轴与 Web Animations API 如何选型？](../by-domain/34-visualization-graphics.md#FB-34-PE-P-022)

### 小程序（3 道）

- [FB-45-PE-P-002 小程序启动性能优化和白屏优化有哪些方案？](../by-domain/45-mini-program.md#FB-45-PE-P-002)
- [FB-45-PE-P-003 小程序包体积优化有哪些手段？如何分析体积？](../by-domain/45-mini-program.md#FB-45-PE-P-003)
- [FB-45-PE-P-006 小程序 SSR、预渲染和骨架屏的实践方案是什么？](../by-domain/45-mini-program.md#FB-45-PE-P-006)

### 鸿蒙 ArkTS / HarmonyOS（1 道）

- [FB-46-PE-P-018 鸿蒙应用如何进行性能与功耗优化？](../by-domain/46-harmonyos.md#FB-46-PE-P-018)

### Flutter（1 道）

- [FB-47-PE-P-004 Flutter 性能调优实战：如何定位并解决卡顿、掉帧、内存泄漏？](../by-domain/47-flutter.md#FB-47-PE-P-004)

### Electron（1 道）

- [FB-48-PE-P-003 Electron 如何进行内存管理与泄漏排查？](../by-domain/48-electron.md#FB-48-PE-P-003)

### WebGPU / 图形学（1 道）

- [FB-50-PE-P-021 如何用 WebGPU 设计一个高性能粒子系统？](../by-domain/50-webgpu-graphics.md#FB-50-PE-P-021)

### 多媒体（Multimedia）（2 道）

- [FB-51-PE-P-018 WebRTC 中的延迟、抖动和拥塞控制如何实现？](../by-domain/51-multimedia.md#FB-51-PE-P-018)
- [FB-51-PE-P-021 图片和视频的前端压缩方案对比？](../by-domain/51-multimedia.md#FB-51-PE-P-021)

### 低代码（1 道）

- [FB-52-PE-P-006 如何优化低代码平台中大数据量表格的性能？](../by-domain/52-low-code.md#FB-52-PE-P-006)

## 架构题（18 道）{#architect}

### TypeScript（1 道）

- [FB-02-PE-R-001 如何优化大型 TypeScript 项目的编译性能？](../by-domain/02-typescript.md#FB-02-PE-R-001)

### HTML/CSS（1 道）

- [FB-06-PE-R-001 设计一个首屏渲染 CSS 优化方案。](../by-domain/06-html-css.md#FB-06-PE-R-001)

### 构建工具（1 道）

- [FB-10-PE-R-001 如何在组织架构层面推动前端构建性能优化落地？](../by-domain/10-build-tools.md#FB-10-PE-R-001)

### AI 工程化（1 道）

- [FB-18-PE-R-064 面对亿级 AI 调用，前端如何进行性能与成本治理？](../by-domain/18-ai-engineering.md#FB-18-PE-R-064)

### 开发者体验与工程效能（1 道）

- [FB-21-PE-R-001 大型 TypeScript 仓库中 tsc 类型检查极慢，如何从架构层面系统排查与优化](../by-domain/21-dx.md#FB-21-PE-R-001)

### 部署与 SRE（1 道）

- [FB-22-PE-R-001 如何排查并优化前端高可用灰度发布过程中的性能瓶颈？](../by-domain/22-deployment-sre.md#FB-22-PE-R-001)

### 包管理与供应链安全（1 道）

- [FB-23-PE-R-001 大型 Monorepo 中 npm install 变慢，如何在保证安全校验的前提下优化性能？](../by-domain/23-package-supply-chain.md#FB-23-PE-R-001)

### 微前端（2 道）

- [FB-26-PE-R-029 如何度量微前端的性能与用户体验？](../by-domain/26-micro-frontend.md#FB-26-PE-R-029)
- [FB-26-PE-R-030 微前端上线后，如何进行性能优化？](../by-domain/26-micro-frontend.md#FB-26-PE-R-030)

### 性能工程（5 道）

- [FB-27-PE-R-001 性能优化中，Lab 数据和 RUM 数据有什么区别？应该如何结合使用？](../by-domain/27-performance.md#FB-27-PE-R-001)
- [FB-27-PE-R-002 你如何处理第三方脚本对性能的影响？](../by-domain/27-performance.md#FB-27-PE-R-002)
- [FB-27-PE-R-003 在团队中如何推动性能优化落地？](../by-domain/27-performance.md#FB-27-PE-R-003)
- [FB-27-PE-R-005 现代前端框架（如 React 18）提供了哪些性能优化特性？](../by-domain/27-performance.md#FB-27-PE-R-005)
- [FB-27-PE-R-006 如何平衡性能优化和开发效率？](../by-domain/27-performance.md#FB-27-PE-R-006)

### 数据与状态管理（1 道）

- [FB-29-PE-R-032 全局状态管理下如何进行性能优化？](../by-domain/29-data-state.md#FB-29-PE-R-032)

### 鸿蒙 ArkTS / HarmonyOS（1 道）

- [FB-46-PE-R-030 如何为鸿蒙应用建立一套完整的性能工程体系？](../by-domain/46-harmonyos.md#FB-46-PE-R-030)

### Flutter（1 道）

- [FB-47-PE-R-002 Flutter 应用包体积优化有哪些系统性的做法？](../by-domain/47-flutter.md#FB-47-PE-R-002)

### WebGPU / 图形学（1 道）

- [FB-50-PE-R-027 如何对 WebGPU 应用进行 GPU 性能剖析与瓶颈定位？](../by-domain/50-webgpu-graphics.md#FB-50-PE-R-027)

