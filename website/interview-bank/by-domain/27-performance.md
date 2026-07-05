# 性能工程 面试题

> 本题库共收录 **51** 道面试题（基础 8 / 进阶 16 / 深入 14 / 架构 13）。
> 本文件收录前端性能工程相关面试题，目标题量 30 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、性能优化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-27-CO-B-001：什么是 RAIL 模型？它如何指导前端性能优化？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：27 Performance
**标签**：performance、performance-optimization
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 RAIL 模型的四个维度，并说明它在前端性能优化中的指导意义。

**参考答案**：

RAIL 是 Google 提出的以用户为中心的性能模型，四个字母分别代表：

| 维度 | 英文 | 目标 | 说明 |
|------|------|------|------|
| R | Response | 用户输入后 100ms 内得到响应 | 按钮点击、菜单展开等交互应在 100ms 内完成，给用户“即时”感 |
| A | Animation | 每帧在 16ms 内完成 | 保证 60fps，每帧留给 JavaScript 约 10-12ms |
| I | Idle | 最大化利用空闲时间 | 将非关键工作拆分为 50ms 以内的任务块，避免阻塞主线程 |
| L | Load | 首屏内容在 1s 内呈现 | 关键渲染路径优先，非关键资源延后加载 |

指导意义：
- **以用户感知为核心**，不只是追求某个绝对数值。
- **Response** 约束交互延迟，要求事件处理轻量、避免长任务。
- **Animation** 要求避免布局抖动和强制同步布局，优先使用 `transform` / `opacity`。
- **Idle** 鼓励拆分任务、使用 `requestIdleCallback` 或 Scheduler 调度低优先级工作。
- **Load** 关注关键资源优先级、首字节时间（TTFB）和最大内容绘制（LCP）。

最佳实践：
- 把用户输入响应控制在 100ms 内，复杂操作可先做乐观 UI 更新。
- 动画使用 `requestAnimationFrame`，避免在滚动时读取 `offsetHeight` 等会触发重排的属性。
- 长任务拆分为多个小于 50ms 的微任务或 `setTimeout`/`postMessage` 切片。

**评分维度**：
- 能准确说出 RAIL 四个字母含义（40%）
- 能说明每个维度对应的时间目标与场景（30%）
- 能结合优化实践举例（30%）

**常见错误**：
- 把 RAIL 和 Core Web Vitals 混为一谈。
- 只背出四个单词，无法联系实际优化手段。
- 认为 100ms/16ms/1s 是独立指标，忽略它们之间的权衡。

**延伸追问**：
- RAIL 与 Core Web Vitals 有什么关系和区别？
- 如果一个动画必须读取布局，如何降低对 60fps 的影响？

**相关题目**：
- [FB-27-CO-B-002 什么是 Core Web Vitals](#FB-27-CO-B-002)
- [FB-27-PE-A-003 如何优化 INP](#FB-27-PE-A-003)

**参考资源**：
- [web.dev - Measure performance with the RAIL model](https://web.dev/articles/rail)
- [Google Chrome Developers - RAIL](https://developers.google.com/web/fundamentals/performance/rail)

**口头回答版**：
> RAIL 是 Google 提出的性能模型，四个字母分别代表 Response、Animation、Idle、Load。Response 是用户操作后 100 毫秒内要有反馈；Animation 要求每帧 16 毫秒以内，保证 60 帧；Idle 是把不重要的事情拆成 50 毫秒以内的小任务，在空闲时做；Load 是首屏内容尽量在 1 秒内出来。它的核心是以用户感知为中心，指导我们把优化精力放在真正影响体验的地方，比如交互响应、动画流畅度、主线程别阻塞、首屏加载快。

---

### FB-27-CO-B-002：什么是 Core Web Vitals？LCP、INP、CLS 分别衡量什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：27 Performance
**标签**：core-web-vitals、performance
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Core Web Vitals 的组成，分别说明 LCP、INP、CLS 的含义、阈值以及优化方向。

**参考答案**：

Core Web Vitals 是 Google 提出的一组衡量真实用户体验的核心指标，包含三个维度：

| 指标 | 含义 | 目标阈值（75 分位） | 优化方向 |
|------|------|---------------------|---------|
| **LCP**（Largest Contentful Paint） | 最大内容绘制时间 | ≤2.5s 良好，>4s 差 | 优化首屏关键资源加载速度 |
| **INP**（Interaction to Next Paint） | 交互到下一次绘制的时间 | ≤200ms 良好，>500ms 差 | 减少交互处理时长，避免长任务阻塞主线程 |
| **CLS**（Cumulative Layout Shift） | 累计布局偏移 | ≤0.1 良好，>0.25 差 | 避免内容跳动，为图片/字体/广告预留空间 |

补充说明：
- LCP 元素通常是首屏最大的图片、视频海报或块级文本节点。
- INP 在 2024 年 3 月正式取代 FID（First Input Delay），关注整个页面生命周期内的最差交互。
- CLS 只计算视口内可见元素的意外位移，用户滚动导致的正常位置变化不计入。

三者关系：
- LCP 衡量**加载性能**；INP 衡量**交互响应性**；CLS 衡量**视觉稳定性**。
- 它们共同描述用户在页面加载和使用过程中的“快、顺、稳”体验。

**评分维度**：
- 能准确说出三个指标名称和含义（40%）
- 能说出良好/差的阈值（30%）
- 能给出对应的优化方向（30%）

**常见错误**：
- 把 FID 和 INP 混淆，或不知道 INP 已取代 FID。
- 认为 CLS 数值越大越好（实际是越小越好）。
- 忽略指标的 75 分位统计方式。

**延伸追问**：
- LCP 元素可能是哪些 DOM 节点？如何确定当前页面的 LCP 元素？
- INP 和 TTI、TBT 有什么区别？

**相关题目**：
- [FB-27-PE-A-001 如何优化 LCP](#FB-27-PE-A-001)
- [FB-27-PE-A-002 如何优化 CLS](#FB-27-PE-A-002)
- [FB-27-PE-A-003 如何优化 INP](#FB-27-PE-A-003)

**参考资源**：
- [web.dev - Core Web Vitals](https://web.dev/articles/vitals)
- [web.dev - LCP](https://web.dev/articles/lcp)
- [web.dev - INP](https://web.dev/articles/inp)
- [web.dev - CLS](https://web.dev/articles/cls)

**口头回答版**：
> Core Web Vitals 是 Google 用来衡量真实用户体验的三个核心指标。第一个是 LCP，最大内容绘制时间，看首屏最大元素多久能渲染出来，目标 2.5 秒以内；第二个是 INP，交互到下一次绘制的时间，看用户点击后多久页面有反应，目标 200 毫秒以内，它已经取代了原来的 FID；第三个是 CLS，累计布局偏移，看页面元素有没有乱跳，目标 0.1 以内。它们分别对应加载快、交互顺、视觉稳。

---

### FB-27-CO-B-003：FCP、TTFB、LCP、TBT 有什么区别？它们分别在性能漏斗的哪个阶段？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：27 Performance
**标签**：core-web-vitals、performance、network-request
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 FCP、TTFB、LCP、TBT 四个指标的含义，并说明它们在页面加载过程中的先后顺序和诊断价值。

**参考答案**：

四个指标分别衡量加载漏斗的不同阶段：

| 指标 | 含义 | 典型目标 | 所处阶段 |
|------|------|---------|---------|
| **TTFB**（Time to First Byte） | 浏览器收到第一个字节的时间 | ≤600ms | 网络 + 服务端响应 |
| **FCP**（First Contentful Paint） | 第一个文本或图像渲染到屏幕 | ≤1.8s | 首次内容绘制 |
| **LCP**（Largest Contentful Paint） | 最大内容元素渲染完成 | ≤2.5s | 主要内容可见 |
| **TBT**（Total Blocking Time） | FCP 到 TTI 之间主线程被阻塞超过 50ms 的任务累计时间 | ≤200ms | 交互就绪前 |

加载顺序：

```text
TTFB → FCP → LCP → TTI (包含 TBT 评估区间)
```

诊断价值：
- **TTFB 高**：通常是 DNS、TLS、重定向、服务端处理或 CDN 边缘缓存问题。
- **FCP 高**：HTML、关键 CSS/JS 阻塞渲染，或关键资源下载慢。
- **LCP 高**：首屏大图、字体、视频海报未优化，或资源请求链过长。
- **TBT 高**：JavaScript 执行占用主线程，需要拆分长任务、延迟非关键脚本。

**评分维度**：
- 能区分四个指标的含义（40%）
- 能说明它们在加载漏斗中的先后顺序（30%）
- 能根据指标异常定位问题阶段（30%）

**常见错误**：
- 把 FCP 和 LCP 当成同一个指标。
- 认为 TTFB 只和服务器有关，忽略网络链路。
- 忽略 TBT 与 INP 的关联：TBT 是实验室指标，INP 是真实用户交互指标。

**延伸追问**：
- 如果 TTFB 正常但 LCP 差，可能是什么原因？
- TBT 和 INP 的关系是什么？

**相关题目**：
- [FB-27-CO-B-002 什么是 Core Web Vitals](#FB-27-CO-B-002)
- [FB-27-PE-A-001 如何优化 LCP](#FB-27-PE-A-001)

**参考资源**：
- [web.dev - FCP](https://web.dev/articles/fcp)
- [web.dev - TTFB](https://web.dev/articles/ttfb)
- [web.dev - TBT](https://web.dev/articles/tbt)

**口头回答版**：
> 这四个指标是页面加载不同阶段的时间。TTFB 是浏览器收到第一个字节的时间，反映网络和服务端；FCP 是第一个内容画出来；LCP 是最大内容画出来；TBT 是首次绘制到可交互期间，主线程被长任务阻塞的总时间。顺序是 TTFB 最早，然后 FCP，然后 LCP，最后看 TTI 和 TBT。它们能帮我们定位问题：TTFB 高看网络和服务器，LCP 高看首屏大图，TBT 高看 JS 执行。

---

### FB-27-CO-B-004：重排（Reflow）和重绘（Repaint）有什么区别？如何减少它们？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：27 Performance
**标签**：reflow-repaint、rendering、performance-optimization
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释浏览器渲染过程中的重排和重绘，说明它们的触发原因、性能差异以及优化手段。

**参考答案**：

浏览器渲染流程大致为：

```text
JavaScript → Style → Layout → Paint → Composite
```

- **重排（Reflow / Layout）**：当元素的几何属性（尺寸、位置）发生变化时，浏览器需要重新计算布局。它会影响后续元素的布局，代价高。
- **重绘（Repaint）**：当元素外观属性（颜色、背景、阴影）变化但不影响布局时，浏览器只需重新绘制该元素。代价低于重排，但仍需避免大面积重绘。

触发重排的常见属性：

```text
width、height、top、left、margin、padding、border、font-size、display、offsetWidth/Height（读取强制同步布局）
```

触发重绘的常见属性：

```text
color、background-color、box-shadow、border-radius、visibility
```

优化手段：
1. **批量读写**：先统一读取布局属性，再统一修改，避免强制同步布局（forced synchronous layout）。
2. **使用 transform / opacity**：它们只触发合成层（Composite），不触发重排重绘。
3. **离线修改**：使用 `documentFragment`、克隆节点修改后替换、或 `display: none` 修改再显示。
4. **CSS 选择器优化**：避免过深层级和复杂选择器，减少样式计算时间。
5. **使用 will-change / contain**：提示浏览器创建合成层或限制布局影响范围。

**评分维度**：
- 能清楚区分重排和重绘（40%）
- 能列举触发两者的典型 CSS 属性（30%）
- 能给出 3 种以上优化手段（30%）

**常见错误**：
- 认为所有 CSS 属性变化都会触发重排。
- 忽略“强制同步布局”的危害，在循环中反复读写布局属性。
- 滥用 `will-change`，导致 GPU 内存暴涨。

**延伸追问**：
- 什么是强制同步布局（Forced Reflow）？举一个循环中的例子。
- `transform: translateZ(0)` 为什么能提升性能？

**相关题目**：
- [FB-27-PE-P-001 浏览器渲染管线与合成层优化](#FB-27-PE-P-001)
- [FB-27-CA-A-004 长任务与主线程阻塞分析](#FB-27-CA-A-004)

**参考资源**：
- [web.dev - Avoid large, complex layouts and layout thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)
- [MDN - Contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)

**口头回答版**：
> 重排是元素的几何信息变了，浏览器要重新算布局，比如改 width、height、margin；重绘是外观变了但布局没变，比如改颜色、背景。重排比重绘更耗性能。优化的话，批量读写布局属性，不要在循环里读一次写一次；动画尽量用 transform 和 opacity，它们只走合成层；复杂修改可以先 display:none 改完再显示；还可以用 will-change 或者 contain 做限制。

---

### FB-27-CO-B-005：什么是懒加载（Lazy Loading）？图片懒加载有哪些实现方式？

**题型**：概念题 / 手写代码题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：27 Performance
**标签**：lazy-loading、performance-optimization、static-assets
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释懒加载的概念，并说明图片懒加载的几种实现方式及其优缺点。

**参考答案**：

懒加载是指**延迟加载非关键资源**，直到它们即将进入视口或用户需要时才加载。它能减少首屏请求量、节省带宽、提升 LCP 和整体加载速度。

实现方式：

1. **原生 `loading="lazy"`**（最推荐，现代浏览器支持）：

```html
<img src="hero.jpg" alt="首屏图" />
<img src="below-fold.jpg" loading="lazy" alt="非首屏图" />
```

优点：零 JS、浏览器自动管理、与 fetchpriority 配合良好。
缺点：旧浏览器不支持，需要 polyfill 或降级。

2. **Intersection Observer API**：

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
```

优点：性能优于滚动监听，支持 root margin 可提前加载。
缺点：需要 JavaScript，首屏内的图片应直接加载。

3. **滚动事件 + 节流（旧方案）**：

```javascript
function lazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      img.src = img.dataset.src;
    }
  });
}
window.addEventListener('scroll', throttle(lazyLoad, 200));
```

缺点：scroll 事件在主线程运行，频繁触发会阻塞，已不推荐。

最佳实践：
- 首屏关键图片不要使用懒加载，避免影响 LCP。
- 为图片设置 `width`/`height` 或 `aspect-ratio`，减少 CLS。
- 可结合 `loading="lazy"` 与 `decoding="async"` 进一步降低解码开销。

**评分维度**：
- 能解释懒加载的概念和价值（30%）
- 能说清原生 lazy 和 Intersection Observer 两种方案（40%）
- 能指出首屏图片不应懒加载等最佳实践（30%）

**常见错误**：
- 所有图片都加 `loading="lazy"`，包括首屏大图。
- 懒加载时未预留尺寸，导致 CLS 飙升。
- 在滚动事件中不做节流，造成卡顿。

**延伸追问**：
- 如何为懒加载图片预留空间以避免 CLS？
- 除了图片，还有哪些资源适合懒加载？

**相关题目**：
- [FB-27-PE-A-001 如何优化 LCP](#FB-27-PE-A-001)
- [FB-27-PE-A-002 如何优化 CLS](#FB-27-PE-A-002)

**参考资源**：
- [web.dev - Lazy loading images](https://web.dev/articles/lazy-loading-images)
- [MDN - Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

**口头回答版**：
> 懒加载就是等资源快要进到视口才加载，不是一开始就把所有资源都请求下来。图片懒加载最常用的方式是原生 loading="lazy"，现代浏览器都支持，最简单；另一种是 Intersection Observer API，用 JS 监听图片是否进入视口再换 src。不要用 scroll 事件去算，性能不好。要注意首屏大图不要懒加载，否则会影响 LCP；还要给图片预留宽高，不然加载后页面会跳，影响 CLS。

---

### FB-27-CO-B-006：什么是代码分割（Code Splitting）？前端有哪些实现方式？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：27 Performance
**标签**：lazy-loading、webpack、performance-optimization、frontend-engineering
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释代码分割的概念，说明它解决什么问题，以及在前端工程中的常见实现方式。

**参考答案**：

代码分割是指将一个大的 JavaScript bundle 拆分成多个小文件，按需加载或并行加载，从而减少首屏需要下载和执行的代码量。

解决的问题：
- 首屏 JS 体积过大，导致下载和执行时间变长。
- 用户访问某些页面时，却加载了永远不会用到的代码。
- 缓存命中率低，任何代码改动都导致整个 bundle 缓存失效。

常见实现方式：

1. **按路由分割（Route-based Splitting）**：

```javascript
// React 示例
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
```

2. **按组件/功能分割（Component-based Splitting）**：

```javascript
const HeavyChart = React.lazy(() => import('./HeavyChart'));
```

3. **构建工具自动分割**：

```javascript
// Vite/Webpack 配置 splitChunks
// Webpack
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' }
    }
  }
}
```

4. **预加载关键分片**：

```html
<link rel="prefetch" href="/chunk-about.js" />
<link rel="preload" as="script" href="/chunk-home.js" />
```

最佳实践：
- 路由级分割是最安全的起点，收益明显。
- 不要过度拆分，过多的 HTTP/2 请求和小文件也会增加开销。
- 结合 `webpackPreload` / `webpackPrefetch` 注释控制资源优先级。

**评分维度**：
- 能说明代码分割解决的问题（30%）
- 能列举 3 种以上实现方式（40%）
- 能提到预加载、缓存、避免过度拆分等最佳实践（30%）

**常见错误**：
- 认为代码分割只适用于路由。
- 拆分过细，导致请求数量爆炸。
- 忘记处理异步加载的 loading 和错误边界。

**延伸追问**：
- 代码分割后如何优化 Webpack/Vite 的 chunk 策略？
- 异步组件加载失败如何处理？

**相关题目**：
- [FB-27-SC-A-006 预加载、预取、预连接](#FB-27-SC-A-006)
- [FB-27-CO-A-008 SSR、SSG、ISR 对比](#FB-27-CO-A-008)

**参考资源**：
- [web.dev - Reduce JavaScript payloads with code splitting](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting)
- [React 官方文档 - Code Splitting](https://react.dev/reference/react/lazy)

**口头回答版**：
> 代码分割就是把一个大 JS 文件拆成多个小文件，按需加载。主要解决首屏 JS 太大、下载执行慢的问题。常见做法有按路由分割，比如 React.lazy 配合 Suspense；按组件分割，把很重的组件单独拆出去；构建工具里配 splitChunks，把 node_modules 单独打包。还可以用 preload 或 prefetch 控制加载时机。要注意别拆太碎，不然请求太多也慢。

---

### FB-27-CO-B-007：HTTP 缓存策略有哪些？强缓存和协商缓存的区别是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：27 Performance
**标签**：cache-strategy、strong-cache、negotiated-cache、performance-optimization
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 HTTP 缓存中的强缓存和协商缓存机制，包括相关头部字段、判断流程和适用场景。

**参考答案**：

HTTP 缓存分为强缓存和协商缓存两类：

| 类型 | 触发条件 | 状态码 | 特点 |
|------|---------|--------|------|
| 强缓存 | `Cache-Control` 或 `Expires` 未过期 | 200（from memory/disk cache） | 不发请求到服务器，速度最快 |
| 协商缓存 | 强缓存过期后，带上验证信息询问服务器 | 304 Not Modified | 发请求但只返回头部，不重复下载资源 |

相关头部：

- **强缓存**：
  - `Cache-Control: max-age=31536000`（HTTP/1.1）
  - `Expires: Wed, 21 Oct 2026 07:28:00 GMT`（HTTP/1.0，已不推荐单独使用）

- **协商缓存**：
  - `Last-Modified` + `If-Modified-Since`（时间精度秒级，可能不准确）
  - `ETag` + `If-None-Match`（文件内容哈希，优先级高于 Last-Modified）

浏览器缓存判断流程：

```text
请求资源
  → 是否有 Cache-Control/Expires？
    → 未过期 → 直接使用强缓存（200 from cache）
    → 已过期 → 带上 If-None-Match / If-Modified-Since 发请求
      → 服务器返回 304 → 使用本地缓存
      → 服务器返回 200 + 新资源 → 更新缓存
```

最佳实践：
- 静态资源使用 `Cache-Control: public, max-age=31536000, immutable`，并通过文件名 hash 控制更新。
- HTML 入口文件使用 `no-cache` 或短 max-age，保证更新及时。
- 接口根据业务需要设置合适的 max-age，敏感数据使用 `private, no-store`。

**评分维度**：
- 能区分强缓存和协商缓存（40%）
- 能说出 Cache-Control、ETag、Last-Modified 等头部（30%）
- 能描述浏览器缓存判断流程（30%）

**常见错误**：
- 把 `no-cache` 当成不缓存（实际是需要协商缓存）。
- 把 `no-store` 和 `no-cache` 混淆。
- 静态资源不设置长期缓存，导致重复下载。

**延伸追问**：
- `Cache-Control: no-cache` 和 `no-store` 有什么区别？
- 静态资源文件名加 hash 后，为什么可以设一年强缓存？

**相关题目**：
- [FB-27-EN-P-006 Service Worker 缓存策略](#FB-27-EN-P-006)
- [FB-27-SC-R-005 CDN 与边缘缓存架构](#FB-27-SC-R-005)

**参考资源**：
- [MDN - HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [web.dev - HTTP cache](https://web.dev/articles/http-cache)

**口头回答版**：
> HTTP 缓存分强缓存和协商缓存。强缓存是浏览器直接看 Cache-Control 或 Expires，没过期就直接用本地缓存，状态码是 200 from cache，不发请求。协商缓存是强缓存过期了，浏览器带上 If-None-Match 或 If-Modified-Since 去问服务器，如果资源没变就返回 304，继续用本地缓存；变了就返回 200 和新资源。Cache-Control 控制强缓存，ETag 和 Last-Modified 控制协商缓存。静态资源一般可以设一年缓存，靠文件名 hash 来更新。

---

### FB-27-CO-B-008：图片资源优化有哪些常用手段？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：27 Performance
**标签**：lazy-loading、core-web-vitals、static-assets、performance-optimization
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举前端图片资源优化的常用手段，并说明它们分别解决什么问题。

**参考答案**：

图片通常占据页面传输体积的最大部分，是 LCP 优化的重点。常用优化手段：

| 手段 | 解决的问题 | 示例 |
|------|-----------|------|
| **选择现代格式** | 减少文件体积 | WebP、AVIF、JPEG XL 替代 JPEG/PNG |
| **响应式图片** | 避免移动端加载过大图片 | `<img srcset="..." sizes="...">` |
| **压缩** | 降低画质可接受范围内的体积 | TinyPNG、Squoosh、构建时自动压缩 |
| **懒加载** | 非首屏图片延迟加载 | `loading="lazy"` |
| **CDN 图片处理** | 动态裁切、格式转换 | `?x-oss-process=image/resize,w_800` |
| **占位图 / 渐进加载** | 提升感知性能 | LQIP、SVG 占位、模糊渐进 |
| **预加载首屏大图** | 加速 LCP | `<link rel="preload" as="image" href="hero.webp">` |

现代格式兼容性处理：

```html
<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <img src="hero.jpg" alt="描述" width="800" height="600" />
</picture>
```

响应式图片：

```html
<img
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  src="hero-800.jpg"
  alt="描述"
/>
```

最佳实践：
- 优先使用 WebP，支持 AVIF 的浏览器可再降级。
- 为所有图片设置明确的 width/height，避免 CLS。
- 首屏大图使用 `fetchpriority="high"` 提升优先级。

**评分维度**：
- 能列举 4 种以上图片优化手段（40%）
- 能说明现代格式和响应式图片的实现（30%）
- 能结合 LCP、CLS 说明最佳实践（30%）

**常见错误**：
- 只压缩不转换格式，错失 WebP/AVIF 的体积优势。
- 响应式图片的 `sizes` 写错，导致浏览器选择错误的分辨率。
- 所有图片都预加载，浪费带宽。

**延伸追问**：
- AVIF、WebP、JPEG 在压缩率和解码速度上有什么区别？
- 如何为不同 DPR 设备提供合适的图片？

**相关题目**：
- [FB-27-CO-B-005 懒加载实现](#FB-27-CO-B-005)
- [FB-27-PE-A-001 如何优化 LCP](#FB-27-PE-A-001)

**参考资源**：
- [web.dev - Choose the right image format](https://web.dev/articles/choose-the-right-image-format)
- [web.dev - Serve responsive images](https://web.dev/articles/serve-responsive-images)

**口头回答版**：
> 图片优化是前端性能里很重要的一块。常用手段有：用 WebP 或 AVIF 替代 JPEG/PNG；用 srcset 和 sizes 做响应式图片，不同屏幕加载不同尺寸；压缩图片；非首屏图片懒加载；用 CDN 动态裁切和转格式；首屏大图可以 preload。还要给图片设好宽高，避免 CLS。现代格式兼容性可以用 picture 标签做降级。

---

## 进阶题（8 道）{#advanced}

### FB-27-PE-A-001：如何优化 LCP（Largest Contentful Paint）？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：27 Performance
**标签**：core-web-vitals、lazy-loading、static-assets、performance-optimization
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请结合实际场景，说明优化 LCP 的完整思路和具体手段。

**参考答案**：

LCP 衡量首屏最大可见元素的渲染时间，优化目标是让关键资源尽快加载并渲染。

优化方向可分为四个阶段：

1. **降低服务器响应时间（TTFB）**：
   - 启用 CDN，缩短用户到源站的物理距离。
   - 使用边缘缓存、SSR/SSG 减少服务端处理时间。
   - 优化数据库查询、接口聚合，减少阻塞。

2. **优化资源加载优先级**：
   - 对 LCP 图片使用 `<link rel="preload" as="image" href="hero.webp">`。
   - 使用 `fetchpriority="high"` 提升关键图片优先级。
   - 避免首屏关键 CSS/JS 被非关键资源阻塞。

```html
<link rel="preload" as="image" href="/hero.avif" type="image/avif" fetchpriority="high" />
<img src="/hero.avif" fetchpriority="high" width="1200" height="600" alt="首屏图" />
```

3. **减少渲染阻塞**：
   - 关键 CSS 内联，非关键 CSS 异步加载。
   - 延迟非关键 JavaScript，使用 `defer` / `async` / `type="module"`。

```html
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'" />
<script src="analytics.js" defer></script>
```

4. **优化资源体积和格式**：
   - 首屏大图使用 WebP/AVIF，压缩到合理质量。
   - 使用响应式图片，避免移动端加载桌面大图。

测量与验证：
- 在 Chrome DevTools Performance 中查看 LCP 元素。
- 使用 `web-vitals` 库上报真实用户 LCP。
- 通过 Lighthouse 诊断 Opportunities 获取建议。

**评分维度**：
- 能从 TTFB、资源优先级、渲染阻塞、资源体积四个维度展开（40%）
- 能给出 preload/fetchpriority 等具体代码示例（30%）
- 能说明如何测量和验证 LCP（30%）

**常见错误**：
- 只关注图片压缩，忽略服务器响应和优先级。
- 对所有图片都 preload，导致带宽竞争。
- 用 CSS background-image 做 LCP 元素，无法被 preload 有效加速。

**延伸追问**：
- LCP 元素是 background-image 时如何优化？
- 为什么 SSR 不一定能改善 LCP？

**相关题目**：
- [FB-27-CO-B-002 什么是 Core Web Vitals](#FB-27-CO-B-002)
- [FB-27-CO-B-008 图片资源优化](#FB-27-CO-B-008)
- [FB-27-SC-A-006 预加载、预取、预连接](#FB-27-SC-A-006)

**参考资源**：
- [web.dev - Optimize LCP](https://web.dev/articles/optimize-lcp)
- [web.dev - Preload critical assets](https://web.dev/articles/preload-critical-assets)

**口头回答版**：
> 优化 LCP 主要分四步。第一，降低服务器响应时间，用 CDN、缓存、SSR/SSG；第二，提升关键资源优先级，对首屏大图用 preload 和 fetchpriority="high"；第三，减少渲染阻塞，关键 CSS 内联，非关键 JS 用 defer；第四，优化资源体积，首屏图用 WebP/AVIF、响应式图片。测量可以用 Chrome DevTools 看 LCP 元素，或者用 web-vitals 库收集真实数据。

---

### FB-27-PE-A-002：如何优化 CLS（Cumulative Layout Shift）？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：27 Performance
**标签**：core-web-vitals、reflow-repaint、performance-optimization
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明导致 CLS 的常见原因，并给出系统性的优化方案。

**参考答案**：

CLS 衡量页面生命周期内**意外布局偏移**的累计分数。常见触发原因：

1. **图片/视频/iframe 未设置尺寸**：
   - 图片加载完成后撑开容器，导致下方内容下移。

2. **Web 字体加载导致文字闪动（FOUT/FOIT）**：
   - 字体文件加载前后，文字尺寸或行高变化。

3. **广告、嵌入内容、动态插入内容**：
   - 占位区域高度为 0，内容加载后突然撑开。

4. **异步加载内容无预留空间**：
   - 接口返回后插入列表、弹窗、横幅等。

优化方案：

1. **为媒体元素设置 width/height 或 aspect-ratio**：

```html
<img src="photo.jpg" width="800" height="600" alt="" />
```

或 CSS：

```css
.aspect-box {
  aspect-ratio: 16 / 9;
}
```

2. **字体优化**：
   - 使用 `font-display: optional` 或 `swap`，并指定 fallback 字体尺寸。
   - 使用 `size-adjust`、`ascent-override` 等 `@font-face` 描述符减少字体切换差异。

```css
@font-face {
  font-family: 'Custom';
  src: url('custom.woff2') format('woff2');
  font-display: swap;
  size-adjust: 100%;
}
```

3. **为动态内容预留占位**：
   - 骨架屏、min-height、占位 div。
   - 广告位使用固定的 container，避免内容加载后撑开。

```html
<div class="ad-slot" style="min-height: 250px;">
  <!-- 广告异步填充 -->
</div>
```

4. **避免在已有内容上方插入新内容**：
   - 新内容应附加到末尾，或替换同尺寸占位。
   - 避免使用 `top: 0` 的 banner 突然插入到视口顶部。

5. **动画使用 transform/opacity**：
   - 不会触发布局偏移，属于合成层动画。

测量与验证：
- Chrome DevTools Performance 中查看 Experience 轨道。
- Layout Shift Region 可视化高亮偏移元素。
- 使用 `web-vitals` 库上报真实 CLS。

**评分维度**：
- 能列举 3 种以上 CLS 触发原因（30%）
- 能给出图片尺寸、字体、占位等具体优化方案（40%）
- 能说明如何测量和验证 CLS（30%）

**常见错误**：
- 认为 CLS 只在加载时出现，忽略用户交互后的异步内容插入。
- 只给图片加 width/height，但忽略 iframe、广告位。
- 用 `font-display: block` 导致 FOIT 时间过长。

**延伸追问**：
- 如何为响应式图片设置宽高以避免 CLS？
-  skeleton 骨架屏能降低 CLS 吗？原理是什么？

**相关题目**：
- [FB-27-CO-B-002 什么是 Core Web Vitals](#FB-27-CO-B-002)
- [FB-27-PE-P-007 字体优化与 FOUT/FOIT](#FB-27-PE-P-007)

**参考资源**：
- [web.dev - Optimize CLS](https://web.dev/articles/optimize-cls)
- [web.dev - Avoid layout shifts](https://web.dev/articles/optimize-cls#avoid-inserting-content-above-existing-content)

**口头回答版**：
> CLS 是页面内容的意外偏移。常见原因有图片没设宽高、字体加载导致文字闪动、广告或异步内容没预留空间。优化方法：给 img、video、iframe 都设好宽高或 aspect-ratio；字体用 font-display: swap 并调整好 fallback；异步内容用骨架屏或 min-height 预留空间；新内容不要插到已有内容上方；动画用 transform 和 opacity。可以在 DevTools 的 Experience 轨道里看到具体是哪些元素在偏移。

---

### FB-27-PE-A-003：如何优化 INP（Interaction to Next Paint）？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：27 Performance
**标签**：core-web-vitals、performance、performance-optimization
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 INP 的计算方式，并说明如何识别和优化导致 INP 变差的交互延迟。

**参考答案**：

INP（Interaction to Next Paint）衡量用户交互到下一次视觉反馈之间的最长时间，包括三个阶段：

```text
输入延迟（Input Delay）→ 事件处理（Event Processing）→ 渲染延迟（Rendering Delay）
```

- **输入延迟**：用户事件到达主线程前被长任务阻塞的时间。
- **事件处理**：事件回调函数执行时间。
- **渲染延迟**：事件处理完成后，浏览器完成样式计算、布局、绘制到下一帧的时间。

优化手段：

1. **拆分长任务，让出主线程**：

```javascript
// 差：一次性处理 10 万条数据
function handleClick() {
  const result = heavyComputation(100000);
  updateUI(result);
}

// 好：拆分为多个任务
async function handleClick() {
  const chunks = splitIntoChunks(data, 1000);
  for (const chunk of chunks) {
    await yieldToMain();
    processChunk(chunk);
  }
  updateUI();
}

function yieldToMain() {
  return new Promise(resolve => setTimeout(resolve, 0));
}
```

2. **减少事件处理函数工作量**：
   -  debounce/throttle 滚动、输入事件。
   -  复杂计算移到 Web Worker。

3. **避免强制同步布局（Layout Thrashing）**：

```javascript
// 差：读写交错触发多次重排
for (let i = 0; i < elements.length; i++) {
  const h = elements[i].offsetHeight; // 读
  elements[i].style.height = h * 2 + 'px'; // 写
}

// 好：先批量读，再批量写
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2 + 'px';
});
```

4. **优化 DOM 更新**：
   - 使用 `requestAnimationFrame` 合并 DOM 操作。
   - 减少大型列表重渲染，使用虚拟滚动。

5. **第三方脚本隔离**：
   - 延迟加载非关键第三方脚本，避免它们阻塞主线程。

测量与验证：
- Chrome DevTools Performance 中查看Interactions 轨道和 Long Tasks。
- 使用 `web-vitals` 库获取具体交互的 `eventEntry` 详情。
- WebPageTest 的 Chrome Trace 可看到交互分解。

**评分维度**：
- 能解释 INP 三个阶段（30%）
- 能给出拆分长任务、减少布局抖动等优化方案（40%）
- 能说明如何测量 INP 并定位问题交互（30%）

**常见错误**：
- 只关注事件回调执行时间，忽略输入延迟和渲染延迟。
- 用 `setState` 等同步批量更新导致大量 DOM 操作。
- 在滚动事件中直接读取 `scrollTop`、`offsetHeight`。

**延伸追问**：
- 如何在不阻塞 UI 的情况下处理大量数据？
- Web Worker 能直接操作 DOM 吗？不能的话如何与主线程协作？

**相关题目**：
- [FB-27-CO-B-002 什么是 Core Web Vitals](#FB-27-CO-B-002)
- [FB-27-PE-P-002 JavaScript 执行优化](#FB-27-PE-P-002)
- [FB-27-CA-A-004 长任务与主线程阻塞分析](#FB-27-CA-A-004)

**参考资源**：
- [web.dev - Optimize INP](https://web.dev/articles/optimize-inp)
- [web.dev - Long JavaScript tasks](https://web.dev/articles/optimize-long-tasks)

**口头回答版**：
> INP 是用户交互到下一次页面绘制的时间，分输入延迟、事件处理、渲染延迟三段。优化 INP 最关键的是别让主线程被长任务占满，要把大任务拆成小块，让出主线程；事件回调里不要做太重的事，复杂计算放 Web Worker；还要注意批量读写布局属性，避免强制同步布局；DOM 更新用 requestAnimationFrame 合并。测量可以用 DevTools 的 Interactions 轨道和 Long Tasks，或者 web-vitals 库看真实用户数据。

---

### FB-27-CA-A-004：分析下面代码为什么会阻塞主线程，如何优化？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：27 Performance
**标签**：core-web-vitals、event-loop、performance-optimization
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：

```javascript
function processItems(items) {
  const result = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // 模拟复杂计算
    const computed = heavyCompute(item);
    result.push(computed);
  }
  render(result);
}

button.addEventListener('click', () => {
  processItems(largeArray);
});
```

上述代码在用户点击按钮时执行，当 `largeArray` 很大时会导致页面卡顿。请分析原因并给出优化方案。

**参考答案**：

问题分析：
1. `processItems` 是**同步长任务**，整个循环占用主线程，阻塞用户输入、动画和渲染。
2. 即使单次 `heavyCompute` 很快，大量累积也会超过 50ms，形成 Long Task，影响 INP 和 TBT。
3. `render(result)` 在所有计算完成后一次性执行，进一步加重主线程负担。

优化方案：

1. **任务切片，让出主线程**：

```javascript
async function processItemsInChunks(items, chunkSize = 100) {
  const result = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    result.push(...chunk.map(heavyCompute));
    if (i + chunkSize < items.length) {
      await yieldToMain();
    }
  }
  render(result);
}

function yieldToMain() {
  return new Promise(resolve => {
    if ('scheduler' in window && scheduler.yield) {
      scheduler.yield().then(resolve);
    } else {
      setTimeout(resolve, 0);
    }
  });
}
```

2. **使用 Web Worker 处理计算**：

```javascript
// worker.js
self.onmessage = (e) => {
  const result = e.data.map(heavyCompute);
  self.postMessage(result);
};

// main.js
const worker = new Worker('worker.js');
button.addEventListener('click', () => {
  worker.postMessage(largeArray);
  worker.onmessage = (e) => render(e.data);
});
```

3. **增量渲染**：
   - 不必等全部数据处理完再渲染，每处理完一个 chunk 就更新一部分 UI，并配合 `requestAnimationFrame`。

4. **虚拟化 / 分页**：
   - 如果结果要渲染大量 DOM，使用虚拟滚动或分页，避免一次性创建过多节点。

方案对比：

| 方案 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| 任务切片 | 计算不能脱离主线程 | 实现简单，兼容性好 | 总时间可能略长 |
| Web Worker | 纯计算任务 | 不阻塞主线程 | 不能操作 DOM，通信有开销 |
| 增量渲染 | 需要及时反馈进度 | 体验好 | 实现复杂 |

**评分维度**：
- 能指出同步长任务阻塞主线程（30%）
- 能给出任务切片或 Web Worker 方案（40%）
- 能提到增量渲染、虚拟化等辅助优化（30%）

**常见错误**：
- 只说要加 loading，不解决阻塞问题。
- 使用 `setInterval` 切片但不控制 chunk 大小。
- 把 Worker 结果直接在 Worker 里操作 DOM。

**延伸追问**：
- `scheduler.yield()` 和 `setTimeout(..., 0)` 有什么区别？
- 如果 `render` 本身很慢，该怎么办？

**相关题目**：
- [FB-27-PE-A-003 如何优化 INP](#FB-27-PE-A-003)
- [FB-27-PE-P-002 JavaScript 执行优化](#FB-27-PE-P-002)
- [FB-27-CD-P-004 实现一个任务调度器](#FB-27-CD-P-004)

**参考资源**：
- [web.dev - Optimize long tasks](https://web.dev/articles/optimize-long-tasks)
- [web.dev - Use web workers](https://web.dev/articles/use-workers)

**口头回答版**：
> 这段代码的问题是 for 循环一次性处理大量数据，主线程被占满，用户点击后页面会卡死。优化思路是把大任务切片，每处理一段就让出主线程，可以用 setTimeout 或 scheduler.yield；如果是纯计算，可以放到 Web Worker 里；还可以边处理边渲染，不用等全部算完。如果结果要渲染很多 DOM，最好配合虚拟滚动或分页。

---

### FB-27-CD-A-005：实现一个固定高度的虚拟列表（Virtual List）

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：27 Performance
**标签**：rendering、performance-optimization、frontend-engineering
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请手写一个固定高度项的虚拟列表，支持滚动时动态渲染可视区内的元素，并说明关键计算逻辑。

**参考答案**：

核心思想：
- 只渲染可视区及其上下缓冲区的元素，而非全部数据。
- 通过绝对定位或 `transform` 让可视元素在正确的滚动位置。
- 总高度由 `itemCount * itemHeight` 计算，撑开滚动条。

实现示例（React）：

```jsx
import { useState, useRef, useMemo } from 'react';

function VirtualList({ items, itemHeight = 50, height = 400, overscan = 5 }) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(height / itemHeight);
  const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index,
    }));
  }, [items, startIndex, endIndex]);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      style=&#123;&#123; height, overflow: 'auto', position: 'relative' &#125;&#125;
      onScroll={handleScroll}
    >
      <div style=&#123;&#123; height: totalHeight, position: 'relative' &#125;&#125;>
        {visibleItems.map((item) => (
          <div
            key={item.id}
            style=&#123;&#123;
              position: 'absolute',
              top: item.index * itemHeight,
              height: itemHeight,
              left: 0,
              right: 0,
            &#125;&#125;
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

关键计算：
1. `startIndex = floor(scrollTop / itemHeight)`：当前滚动位置对应的数据索引。
2. `visibleCount = ceil(height / itemHeight)`：可视区能容纳的元素个数。
3. `overscan`：上下缓冲区，减少快速滚动时的白屏。
4. `top = index * itemHeight`：每个可见项的绝对定位偏移。

优化点：
- 滚动事件使用 `requestAnimationFrame` 节流，或改用 `Intersection Observer` 自动感知。
- 列表项高度不固定时，需要缓存已渲染项高度并动态计算（complex）。
- 大数据量下，总高度容器可用一个占位 div，不需要创建所有空节点。

**评分维度**：
- 能说出虚拟列表只渲染可视区的核心思想（30%）
- 能正确写出 startIndex、visibleCount、offset 计算（40%）
- 能提到 overscan、节流、高度不固定等扩展问题（30%）

**常见错误**：
- 没有撑开总高度，导致滚动条异常。
- 使用 `index` 作为 key，导致列表项状态错位。
- 滚动时不节流，频繁 setState 导致卡顿。

**延伸追问**：
- 如果列表项高度不固定，虚拟列表要怎么实现？
- 双向无限滚动虚拟列表如何实现？

**相关题目**：
- [FB-27-PE-A-003 如何优化 INP](#FB-27-PE-A-003)
- [FB-27-PE-P-001 浏览器渲染管线与合成层优化](#FB-27-PE-P-001)

**参考资源**：
- [web.dev - Virtualize long lists](https://web.dev/articles/virtualize-long-lists)
- [react-window 源码](https://github.com/bvaughn/react-window)

**口头回答版**：
> 虚拟列表就是只渲染视口内和上下缓冲区的元素，不渲染全部数据。关键计算：用 scrollTop 除以每项高度得到 startIndex，用容器高度除以每项高度得到可视数量，再加上 overscan 缓冲区。每个可见项用绝对定位，top 是 index 乘 itemHeight。外层要有一个总高度的 div 撑开滚动条。要注意滚动事件节流，key 要用数据 id 而不是 index；如果高度不固定，实现会复杂很多，需要缓存已渲染项的高度。

---

### FB-27-SC-A-006：预加载（preload）、预取（prefetch）、预连接（preconnect）有什么区别？如何在一个电商详情页中使用它们？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：27 Performance
**标签**：static-assets、performance-optimization、network-request
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 `preload`、`prefetch`、`preconnect` 的区别，并为一个电商商品详情页设计资源优先级策略。

**参考答案**：

| 指令 | 作用 | 优先级 | 典型场景 |
|------|------|--------|---------|
| `preconnect` | 提前建立 DNS、TCP、TLS 连接 | 高 | 字体、CDN、第三方 API 域名 |
| `dns-prefetch` | 提前解析 DNS | 中 | 后续可能访问的域名 |
| `preload` | 提前加载当前页面关键资源 | 高 | LCP 图片、关键字体、异步 chunk |
| `prefetch` | 空闲时预取下一页资源 | 低 | 用户可能访问的下一页 |
| `prerender` | 后台预渲染整个页面 | 很低 | 极高概率跳转的页面 |

电商详情页策略示例：

```html
<!-- 1. 预连接关键域名 -->
<link rel="preconnect" href="https://cdn.example.com" />
<link rel="dns-prefetch" href="https://api.example.com" />

<!-- 2. 预加载首屏大图（LCP） -->
<link rel="preload" as="image" href="/products/123-main.avif" type="image/avif" fetchpriority="high" />

<!-- 3. 预加载关键字体 -->
<link rel="preload" as="font" href="/fonts/brand.woff2" type="font/woff2" crossorigin />

<!-- 4. 预取用户可能去的下一页 -->
<link rel="prefetch" href="/products/123/reviews" />

<!-- 5. 预加载可能异步使用的组件 chunk -->
<link rel="preload" as="script" href="/chunks/product-gallery.js" />
```

设计原则：
- **preconnect** 用于当前页一定会用到的外部域名。
- **preload** 只预加载当前页关键路径上的资源，避免带宽竞争。
- **prefetch** 用于概率较高的下一页，不阻塞当前页。
- 不要滥用 `preload`，每个预加载都会消耗带宽和 CPU。

**评分维度**：
- 能区分 preconnect、preload、prefetch 的语义和优先级（40%）
- 能为电商详情页给出合理的资源优先级方案（40%）
- 能指出滥用预加载的风险（20%）

**常见错误**：
- 用 `prefetch` 加载当前页关键资源（它优先级太低）。
- 对不需要 CORS 的资源加 `crossorigin` 导致重复加载。
- 预加载了图片但没用 `as="image"` 或 `type`。

**延伸追问**：
- `preload` 和 HTTP/2 Server Push 有什么关系？为什么 Server Push 被弃用？
- 如何在单页应用路由切换时动态 prefetch 下一页 chunk？

**相关题目**：
- [FB-27-PE-A-001 如何优化 LCP](#FB-27-PE-A-001)
- [FB-27-CO-B-006 代码分割](#FB-27-CO-B-006)

**参考资源**：
- [web.dev - Preload critical assets](https://web.dev/articles/preload-critical-assets)
- [web.dev - Prefetch resources](https://web.dev/articles/link-prefetch)
- [web.dev - Establish network connections early](https://web.dev/articles/preconnect-and-dns-prefetch)

**口头回答版**：
> preconnect 是提前建立 TCP 和 TLS 连接，适合字体、CDN 域名；preload 是提前加载当前页关键资源，比如 LCP 大图、关键字体；prefetch 是空闲时预取下一页资源，优先级低。电商详情页可以这样做：preconnect CDN 和接口域名；preload 首屏商品主图和关键字体；prefetch 用户可能点的评价页或下一页。不要滥用 preload，因为它会抢当前页的带宽。

---

### FB-27-EN-A-007：如何使用 Lighthouse 进行性能诊断和优化闭环？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：27 Performance
**标签**：performance、performance-optimization、github-actions
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Lighthouse 的工作原理、评分维度，以及如何在团队中建立基于 Lighthouse 的性能优化闭环。

**参考答案**：

Lighthouse 是一个开源的自动化网站质量审计工具，可审计性能（Performance）、可访问性（Accessibility）、最佳实践（Best Practices）、SEO、PWA 等维度。

性能评分维度（v10+）：

| 指标 | 权重 |
|------|------|
| Performance Score | 由多个指标加权计算 |
| LCP | 25% |
| INP | 25%（v12 起） |
| CLS | 25% |
| TBT | 15% |
| FCP | 10% |
| SI（Speed Index） | 10% |

> 注：权重会随版本更新，面试时应说明以最新版本为准。

工作原理：
1. 使用 Chrome DevTools Protocol 控制浏览器加载页面。
2. 在实验室环境（固定网络、CPU 降速）下采集性能 trace。
3. 根据各指标得分和权重计算总分，并给出 Opportunities 和 Diagnostics 建议。

建立优化闭环：

```text
1. 设定基线 → 2. 本地 Lighthouse 诊断 → 3. 定位 Top 问题
   ↑                                            ↓
4. 持续监控 ← 3. 修复后 CI 回归验证 ← 2. 提交修复
```

具体措施：
- **设定基线**：定义 Performance Score ≥ 90，LCP ≤ 2.5s，CLS ≤ 0.1 等目标。
- **本地诊断**：使用 Chrome DevTools Lighthouse 面板或 CLI。
- **CI 集成**：使用 `lighthouse-ci` 在每次 MR/PR 时跑 Lighthouse，阻止性能回退。

```json
// lighthouserc.json
{
  "ci": {
    "collect": { "url": ["http://localhost:3000/"] },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }]
      }
    }
  }
}
```

- **持续监控**：结合真实用户 RUM 数据，因为 Lighthouse 是实验室数据，可能与真实环境有偏差。

**评分维度**：
- 能说清 Lighthouse 的评分指标和权重（30%）
- 能说明实验室测量与真实用户测量的区别（30%）
- 能设计 CI 集成和基线回归流程（40%）

**常见错误**：
- 只看总分，不分析 Opportunities。
- 在本地高配机器上跑 Lighthouse，忽略 CPU/网络节流。
- 把 Lighthouse 分数当成唯一标准，忽略 RUM。

**延伸追问**：
- Lighthouse 的 Performance Score 和 Core Web Vitals 的通过标准有什么关系？
- 如何处理 Lighthouse 在 CI 中结果波动的问题？

**相关题目**：
- [FB-27-CO-P-005 实验室数据与真实用户数据](#FB-27-CO-P-005)
- [FB-27-SD-R-002 性能预算与 CI 门禁](#FB-27-SD-R-002)

**参考资源**：
- [Lighthouse 官方文档](https://developer.chrome.com/docs/lighthouse/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

**口头回答版**：
> Lighthouse 是一个自动化网站审计工具，主要评性能、可访问性、SEO 等。性能分数由 LCP、INP、CLS、TBT、FCP、Speed Index 加权算出来。它是实验室数据，会模拟慢网络和降速 CPU。团队里用 Lighthouse 做优化闭环：先定基线，比如 Performance Score 90 以上；本地用 DevTools 或 CLI 诊断，根据 Opportunities 改；再集成到 CI，每次 PR 跑 lighthouse-ci，防止回退；最后还要结合真实用户 RUM 数据一起看，因为实验室数据不一定代表真实用户。

---

### FB-27-CO-A-008：SSR、SSG、ISR 有什么区别？各自适合什么场景？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：27 Performance
**标签**：ssr、rendering、performance-optimization
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 SSR（服务端渲染）、SSG（静态站点生成）、ISR（增量静态再生成）三种渲染策略，说明它们的优缺点和适用场景。

**参考答案**：

| 维度 | SSR | SSG | ISR |
|------|-----|-----|-----|
| 渲染时机 | 每次请求在服务端渲染 | 构建时预渲染 | 首次请求生成静态页，后台定时/按需更新 |
| 首屏时间 | 取决于服务端响应 | 最快，直接返回 CDN | 首次略慢于 SSG，后续接近 SSG |
| 数据实时性 | 实时 | 构建时快照 | 可配置重新验证时间 |
| 服务器成本 | 高 | 低 | 低 |
| 适用场景 | 强动态内容、SEO 要求高 | 内容型站点、博客、文档 | 电商列表、新闻、中等动态内容 |

工作流程：

```text
SSR:  用户请求 → 服务端实时取数 → 渲染 HTML → 返回 → 客户端 hydrate
SSG:  构建时取数渲染 → 静态 HTML 部署到 CDN → 用户直接获取
ISR:  首次请求生成静态页 → 返回并缓存 → 后台按 revalidate 周期重新生成
```

代码示例（Next.js）：

```javascript
// SSR
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

// SSG
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

// ISR
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data }, revalidate: 60 }; // 60 秒后后台重新生成
}
```

性能权衡：
- **SSR** 改善 FCP/LCP 和 SEO，但 TTFB 可能增加，且服务器压力大。
- **SSG** 首屏最快，但数据更新需要重新构建全站。
- **ISR** 在 SSG 和 SSR 之间取平衡，适合数据变化不频繁但量大的页面。

最佳实践：
- 首页、落地页优先考虑 SSG + CDN。
- 用户个性化数据用 CSR 或 SSR。
- 电商商品列表/详情页适合 ISR。

**评分维度**：
- 能从渲染时机、首屏、实时性、成本等维度对比三者（40%）
- 能给出具体适用场景（30%）
- 能说明性能权衡和选型思路（30%）

**常见错误**：
- 认为 SSR 一定比 CSR 快（忽略 TTFB 和 hydrate 成本）。
- 把 ISR 和 SSG 混为一谈，忽略重新验证机制。
- 对所有页面都用 SSR，导致服务器压力过大。

**延伸追问**：
- SSR 的 hydrate 过程如何影响 INP？
- 如何降低 SSG 大型站点的构建时间？

**相关题目**：
- [FB-27-PE-A-001 如何优化 LCP](#FB-27-PE-A-001)
- [FB-27-SD-R-005 CDN 与边缘缓存架构](#FB-27-SC-R-005)

**参考资源**：
- [Next.js - Rendering](https://nextjs.org/docs/app/building-your-application/rendering)
- [web.dev - Rendering on the Web](https://web.dev/articles/rendering-on-the-web)

**口头回答版**：
> SSR 是每次请求都在服务端渲染，数据实时但服务器压力大；SSG 是构建时就生成静态 HTML，放到 CDN，首屏最快但数据更新要重新构建；ISR 是第一次访问时生成静态页并缓存，之后按设定的周期后台更新，结合了 SSG 的速度和一定的实时性。博客、文档适合 SSG；电商商品详情、新闻列表适合 ISR；强个性化、实时数据用 SSR。

---

## 深入题（7 道）{#proficient}

### FB-27-PE-P-001：浏览器渲染管线是怎样的？如何利用合成层（Compositor Layer）优化渲染性能？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：27 Performance
**标签**：rendering、reflow-repaint、performance-optimization
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请详细说明浏览器渲染管线各阶段，并解释合成层的作用、创建条件及优化注意事项。

**参考答案**：

浏览器渲染管线（关键路径）：

```text
JavaScript → Style → Layout → Paint → Composite
```

各阶段说明：

| 阶段 | 作用 |
|------|------|
| JavaScript | 执行 JS，修改样式或 DOM |
| Style | 计算匹配选择器，得到每个元素的 computed style |
| Layout | 计算元素几何位置和尺寸（重排） |
| Paint | 将元素绘制为光栅化图层（重绘） |
| Composite | 将多个图层合并为最终屏幕图像 |

合成层（Compositor Layer）：
- 浏览器将页面分成多个图层，每个图层可以独立光栅化和合成。
- GPU 负责合成层的最终绘制，适合动画和复杂页面。

会触发创建独立合成层的常见条件：
- `transform: translate3d()` / `scale3d()` / `rotate3d()`
- `opacity` 动画
- `will-change: transform, opacity`
- `position: fixed` / `position: sticky`
- 3D transform、video、canvas、iframe
- 覆盖在其他合成层之上的元素（overlap）

优化手段：

1. **动画优先使用 transform / opacity**：

```css
.ball {
  will-change: transform;
  transform: translate3d(0, 0, 0); /* 强制创建合成层 */
}
```

2. **避免大面积重绘**：
   - 将频繁动画的元素提升到独立合成层，减少对其他元素的影响。

3. **谨慎使用 will-change**：
   - 提前告知浏览器准备动画，但动画结束后应移除，避免占用过多 GPU 内存。

```css
.animated {
  will-change: transform;
}
.animation-done {
  will-change: auto;
}
```

4. **避免层爆炸（Layer Explosion）**：
   - 大量使用 `translateZ(0)` 会创建过多合成层，消耗 GPU 内存。
   - 使用 Chrome DevTools Layers 面板检查层数量和原因。

合成层的代价：
- 每个合成层都需要 GPU 内存来存储纹理。
- 层过多时，合成阶段本身也会成为瓶颈。
- 移动端 GPU 内存有限，更容易出现性能问题。

**评分维度**：
- 能完整描述渲染管线五个阶段（30%）
- 能说明合成层创建条件和 GPU 合成机制（30%）
- 能给出 transform/opacity/will-change 等优化方案并指出层爆炸风险（40%）

**常见错误**：
- 认为 `will-change` 可以随便加，越多越好。
- 动画使用 `top`/`left` 而非 `transform`，导致每帧重排。
- 忽略合成层内存开销，移动端层爆炸。

**延伸追问**：
- 什么是隐式合成层（implicit compositing）？如何避免它导致的层爆炸？
- 如何查看当前页面有哪些合成层？

**相关题目**：
- [FB-27-CO-B-004 重排和重绘的区别](#FB-27-CO-B-004)
- [FB-27-PE-P-002 JavaScript 执行优化](#FB-27-PE-P-002)

**参考资源**：
- [web.dev - How browsers work](https://web.dev/articles/how-browsers-work)
- [web.dev - Stick to compositor-only properties](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count)

**口头回答版**：
> 浏览器渲染管线分 JavaScript、Style、Layout、Paint、Composite 五个阶段。Layout 是重排，Paint 是重绘，Composite 是合成。合成层是浏览器把页面元素分层，让 GPU 来合成。像 transform、opacity、will-change、fixed 定位都会创建合成层。优化动画时尽量用 transform 和 opacity，这样只走合成阶段；可以用 will-change 提示浏览器，但动画结束要去掉，避免层爆炸和 GPU 内存爆掉。不要滥用 translateZ(0)。

---

### FB-27-PE-P-002：如何优化 JavaScript 执行性能？请从任务调度、长任务拆分、主线程释放等角度说明。

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：27 Performance
**标签**：core-web-vitals、performance-optimization、frontend-engineering
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请系统性地说明 JavaScript 执行性能优化的方法，重点包括长任务识别、任务拆分、调度策略和主线程释放。

**参考答案**：

JavaScript 是单线程的，长时间占用主线程会阻塞用户输入、动画和渲染，直接影响 INP 和 TBT。

优化策略：

1. **识别长任务**：
   - Chrome DevTools Performance 面板中超过 50ms 的任务标记为 Long Task。
   - `PerformanceObserver` 可监控长任务：

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Long Task:', entry.duration, entry.attribution);
  }
});
observer.observe({ entryTypes: ['longtask'] });
```

2. **任务拆分与让出主线程**：

```javascript
async function runInChunks(tasks, chunkSize = 50) {
  for (let i = 0; i < tasks.length; i += chunkSize) {
    const chunk = tasks.slice(i, i + chunkSize);
    chunk.forEach(t => t());
    if (i + chunkSize < tasks.length) {
      await yieldToMain();
    }
  }
}

function yieldToMain() {
  if ('scheduler' in window && scheduler.yield) {
    return scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
}
```

3. **使用 Web Worker 卸载计算**：

```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ data: largeArray });
worker.onmessage = (e) => updateUI(e.data);

// worker.js
self.onmessage = (e) => {
  const result = e.data.data.map(heavyCompute);
  self.postMessage(result);
};
```

4. **使用 requestIdleCallback / Scheduler**：
   - `requestIdleCallback` 在浏览器空闲时执行低优先级任务。
   - React Scheduler 提供优先级调度，可在用户交互时暂停低优先级工作。

```javascript
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    runNextTask();
  }
});
```

5. **减少重渲染和 DOM 操作**：
   - 使用虚拟 DOM diff、批量更新、虚拟滚动、DocumentFragment。
   - 避免在循环中频繁读取布局属性（forced synchronous layout）。

6. **代码层面优化**：
   - 减少嵌套循环、使用 Map/Set 替代数组查找。
   - 避免创建大量临时对象，减少 GC 压力。
   - 使用 `requestAnimationFrame` 合并 DOM 更新。

策略选择：

| 场景 | 推荐方案 |
|------|---------|
| 大量同步计算 | 任务切片 / Web Worker |
| 用户交互响应 | 事件防抖节流、优先处理输入 |
| 后台数据处理 | requestIdleCallback / Scheduler |
| 动画 | requestAnimationFrame + transform |

**评分维度**：
- 能从识别、拆分、调度、卸载四个层面展开（40%）
- 能给出 PerformanceObserver、scheduler.yield、Web Worker 等代码示例（30%）
- 能根据场景选择合适策略（30%）

**常见错误**：
- 把所有任务都放 Web Worker，忽略通信成本。
- 使用 `setTimeout(..., 0)` 但不控制 chunk 粒度。
- 忽略主线程释放后可能导致的执行顺序和状态一致性问题。

**延伸追问**：
- `scheduler.yield()` 和 `requestIdleCallback` 的优先级和兼容性如何？
- 如何保证任务拆分后数据的一致性？

**相关题目**：
- [FB-27-PE-A-003 如何优化 INP](#FB-27-PE-A-003)
- [FB-27-CA-A-004 长任务与主线程阻塞分析](#FB-27-CA-A-004)
- [FB-27-CD-P-004 实现一个任务调度器](#FB-27-CD-P-004)

**参考资源**：
- [web.dev - Optimize long tasks](https://web.dev/articles/optimize-long-tasks)
- [web.dev - Scheduler API](https://web.dev/articles/scheduler)

**口头回答版**：
> JS 执行优化的核心是不让主线程被长任务占满。首先要识别长任务，用 PerformanceObserver 监控超过 50 毫秒的任务；然后把大任务拆成小块，每块执行完让出主线程，可以用 scheduler.yield 或 setTimeout；纯计算可以放到 Web Worker；不紧急的后台任务用 requestIdleCallback；动画用 requestAnimationFrame。还要避免循环里频繁读写布局属性，减少 GC 压力。关键是根据场景选方案：计算多用 Worker 或切片，交互要立刻响应，后台任务放低优先级。

---

### FB-27-PE-P-003：如何排查和优化前端内存泄漏？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：27 Performance
**标签**：memory-leak、garbage-collection、weakmap-weakset
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明常见的前端内存泄漏场景，以及如何使用 Chrome DevTools 排查和优化。

**参考答案**：

常见内存泄漏场景：

1. **全局变量意外挂载**：

```javascript
function leak() {
  leakedData = new Array(10_000_000).fill('x'); // 未声明，挂在 window 上
}
```

2. **闭包引用未释放**：

```javascript
function createLeak() {
  const bigData = new Array(10_000_000).fill('x');
  return function() {
    console.log(bigData.length); // 即使外部不再需要，bigData 仍被闭包持有
  };
}
const handlers = [];
handlers.push(createLeak());
```

3. **DOM 引用未清理**：

```javascript
const elements = [];
function removeElement(el) {
  el.parentNode.removeChild(el);
  elements.push(el); // 仍然引用已移除的 DOM 节点
}
```

4. **事件监听器未移除**：

```javascript
class Component {
  constructor() {
    this.handleResize = () => { /* ... */ };
    window.addEventListener('resize', this.handleResize);
  }
  destroy() {
    // 忘记 removeEventListener
  }
}
```

5. **定时器/回调未清理**：

```javascript
const timer = setInterval(() => { /* ... */ }, 1000);
// 组件卸载时未 clearInterval
```

6. **第三方库 / 单例持有引用**：
   - 如全局 store、缓存未设置上限。

排查方法（Chrome DevTools）：

1. **Performance 面板**：
   - 录制一段时间，观察 JS Heap 是否持续上升且不下降。

2. **Memory 面板**：
   - 拍摄 Heap Snapshot，比较操作前后的对象数量。
   - 使用 Comparison 视图定位增长最多的对象类型。

3. **Allocation instrumentation on timeline**：
   - 记录分配时间线，查看哪些函数在持续分配内存。

优化手段：

```javascript
// 1. 组件卸载时清理
useEffect(() => {
  const handler = () => {};
  window.addEventListener('resize', handler);
  const timer = setInterval(() => {}, 1000);
  return () => {
    window.removeEventListener('resize', handler);
    clearInterval(timer);
  };
}, []);

// 2. 使用 WeakMap/WeakSet 避免强引用
const cache = new WeakMap();
cache.set(element, data); // element 被回收后，cache 中对应项自动释放

// 3. 限制缓存大小
class LRUCache {
  constructor(max = 100) { this.max = max; this.map = new Map(); }
  get(key) { /* ... */ }
  set(key, value) {
    if (this.map.size >= this.max) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
    this.map.set(key, value);
  }
}
```

**评分维度**：
- 能列举 4 种以上内存泄漏场景（30%）
- 能使用 DevTools Performance/Memory 描述排查流程（30%）
- 能给出清理、WeakMap、LRU 等优化代码（40%）

**常见错误**：
- 认为现代框架会自动处理所有内存泄漏，忽略手动监听和定时器。
- 使用 `WeakMap` 时传入原始值作为 key（必须是对象）。
- 只看 Heap Snapshot 某一刻，不做对比分析。

**延伸追问**：
- WeakMap 和 Map 在垃圾回收上有什么区别？
- SPA 路由切换时常见的内存泄漏有哪些？

**相关题目**：
- [FB-27-PE-P-002 JavaScript 执行优化](#FB-27-PE-P-002)
- [FB-27-PE-P-001 浏览器渲染管线](#FB-27-PE-P-001)

**参考资源**：
- [web.dev - Fix memory problems](https://developer.chrome.com/docs/devtools/memory-problems/)
- [MDN - Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)

**口头回答版**：
> 常见内存泄漏有：全局变量没声明挂在 window 上；闭包引用了大对象没释放；DOM 节点删了但还保存在数组里；事件监听没移除；定时器没清；第三方缓存没上限。排查用 Chrome DevTools：Performance 面板看 JS Heap 是不是一直涨；Memory 面板拍 Heap Snapshot 做对比，看哪种对象增长最多。优化要养成清理习惯，组件卸载时 removeEventListener、clearInterval；可以用 WeakMap 避免强引用；大缓存要做 LRU 限制大小。

---

### FB-27-CD-P-004：实现一个基于 `requestIdleCallback` 的任务调度器

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：27 Performance
**标签**：performance-optimization、frontend-engineering
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请手写一个任务调度器，能够将多个低优先级任务拆分到浏览器空闲时间执行，并支持任务取消和优先级控制。

**参考答案**：

核心思路：
- 使用 `requestIdleCallback` 在浏览器空闲时执行任务。
- 每个任务执行前检查剩余空闲时间 `deadline.timeRemaining()`。
- 如果当前帧时间不够，将剩余任务推迟到下一次空闲回调。
- 支持任务取消：用 id 标记任务，取消时从队列移除。

实现：

```javascript
class IdleScheduler {
  constructor() {
    this.tasks = new Map(); // id -> { fn, priority }
    this.nextId = 1;
    this.isScheduled = false;
  }

  addTask(fn, priority = 0) {
    const id = this.nextId++;
    this.tasks.set(id, { fn, priority });
    this.schedule();
    return id;
  }

  cancelTask(id) {
    return this.tasks.delete(id);
  }

  schedule() {
    if (this.isScheduled || this.tasks.size === 0) return;
    this.isScheduled = true;
    requestIdleCallback(this.runTasks.bind(this));
  }

  runTasks(deadline) {
    this.isScheduled = false;

    // 按优先级排序
    const sorted = Array.from(this.tasks.entries())
      .sort((a, b) => b[1].priority - a[1].priority);

    while (
      (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
      sorted.length > 0
    ) {
      const [id, task] = sorted.shift();
      if (!this.tasks.has(id)) continue; // 可能已被取消

      try {
        task.fn();
      } catch (e) {
        console.error('Idle task error:', e);
      }
      this.tasks.delete(id);
    }

    // 未执行完的任务继续调度
    if (this.tasks.size > 0) {
      this.schedule();
    }
  }
}

// 使用示例
const scheduler = new IdleScheduler();

const ids = [];
for (let i = 0; i < 1000; i++) {
  ids.push(
    scheduler.addTask(() => {
      console.log('task', i);
    }, i % 10)
  );
}

// 取消部分任务
scheduler.cancelTask(ids[5]);
```

增强版：支持可中断任务（任务返回是否完成）：

```javascript
class IdleScheduler {
  // ...
  runTasks(deadline) {
    this.isScheduled = false;
    const sorted = Array.from(this.tasks.entries())
      .sort((a, b) => b[1].priority - a[1].priority);

    while (
      (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
      sorted.length > 0
    ) {
      const [id, task] = sorted.shift();
      if (!this.tasks.has(id)) continue;

      const done = task.fn();
      if (done !== false) {
        this.tasks.delete(id);
      }
    }

    if (this.tasks.size > 0) this.schedule();
  }
}

// 任务返回 false 表示未完成，下次继续
scheduler.addTask(() => {
  const chunk = getNextChunk();
  processChunk(chunk);
  return isFinished();
});
```

兼容性处理：

```javascript
const requestIdleCallback =
  window.requestIdleCallback ||
  function (cb) {
    const start = performance.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining() {
          return Math.max(0, 50 - (performance.now() - start));
        },
      });
    }, 1);
  };
```

注意事项：
- `requestIdleCallback` 不保证立即执行，紧急任务不应依赖它。
- 每个任务应足够小，避免单次任务本身成为长任务。
- 支持 `didTimeout` 处理，即使超时也要执行部分任务。

**评分维度**：
- 能正确使用 requestIdleCallback 和 timeRemaining（30%）
- 能实现任务队列、优先级排序、取消功能（40%）
- 能提到兼容性和任务粒度假设备（30%）

**常见错误**：
- 一次性执行所有任务，不检查 deadline。
- 任务执行完没有从队列移除，导致重复执行。
- 忽略 `didTimeout`，在浏览器繁忙时完全不执行。

**延伸追问**：
- React Scheduler 和 requestIdleCallback 有什么关系？
- 如果浏览器不支持 requestIdleCallback，如何 polyfill？

**相关题目**：
- [FB-27-PE-P-002 JavaScript 执行优化](#FB-27-PE-P-002)
- [FB-27-CA-A-004 长任务与主线程阻塞分析](#FB-27-CA-A-004)

**参考资源**：
- [MDN - requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)
- [React Scheduler 源码](https://github.com/facebook/react/tree/main/packages/scheduler)

**口头回答版**：
> 实现一个基于 requestIdleCallback 的调度器，核心是把任务存在一个队列里，等浏览器空闲时按优先级执行。每次执行前看 deadline.timeRemaining() 还剩多少时间，时间不够就把剩下的任务留到下一次空闲回调。任务用 Map 存，返回 id 可以取消。要考虑兼容性，不支持 requestIdleCallback 时可以用 setTimeout 模拟一个 deadline。任务要拆得足够小，避免自己变成长任务；紧急任务不要放这里。

---

### FB-27-CO-P-005：实验室数据（Lab Data）和真实用户数据（Field Data / RUM）有什么区别？分别适用于什么场景？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：27 Performance
**标签**：core-web-vitals、observability
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比实验室数据和真实用户数据（RUM）的区别，并说明在实际项目中如何结合使用它们。

**参考答案**：

| 维度 | Lab Data（实验室数据） | Field Data / RUM（真实用户数据） |
|------|----------------------|--------------------------------|
| 来源 | Lighthouse、WebPageTest、本地 DevTools | 真实用户浏览器采集 |
| 环境 | 可控、模拟网络/CPU | 真实网络、设备、缓存状态 |
| 指标 | FCP、LCP、CLS、TBT、Speed Index 等 | LCP、INP、CLS、FCP、TTFB 等 |
| 稳定性 | 高，可复现 | 波动大，受用户群体影响 |
| 适用场景 | 开发调试、CI 门禁、回归测试 | 真实体验评估、业务决策、告警 |
| 缺点 | 无法覆盖所有用户环境 | 噪声大，需足够样本量 |

典型工具：
- **Lab Data**：Lighthouse、WebPageTest、Chrome DevTools Performance。
- **Field Data**：Chrome User Experience Report（CrUX）、`web-vitals` 库自采集、自建 RUM 平台。

如何结合使用：

```text
1. 开发阶段：Lighthouse 本地诊断，快速定位问题。
2. 预发/CI 阶段：Lighthouse CI 设置分数和指标门禁。
3. 上线后：web-vitals 采集真实用户数据，按百分位（p75/p90/p99）分析。
4. 告警：RUM 指标劣化时触发告警，再用 Lab Data 复现和修复。
```

示例：使用 `web-vitals` 库采集 RUM：

```javascript
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToAnalytics(metric) {
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
      page: location.pathname,
    }),
    keepalive: true,
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

CrUX 与自建 RUM 的区别：
- CrUX 是 Google 官方大数据，覆盖广但粒度粗，只能到页面级或源站级。
- 自建 RUM 可携带业务维度（用户类型、AB 实验、设备、网络类型），定位更精准。

**评分维度**：
- 能清楚对比 Lab Data 和 Field Data 的优劣（40%）
- 能说明各自典型工具和适用场景（30%）
- 能给出 web-vitals 采集代码和结合使用流程（30%）

**常见错误**：
- 只看 Lighthouse 分数，忽略真实用户数据。
- 用少量 RUM 样本得出统计结论。
- 把 TBT（Lab）和 INP（Field）混为一谈。

**延伸追问**：
- CrUX 的数据为什么和你的 RUM 数据有差异？
- RUM 数据应该按哪些维度下钻分析？

**相关题目**：
- [FB-27-EN-A-007 Lighthouse 性能诊断](#FB-27-EN-A-007)
- [FB-27-SD-R-001 性能监控与告警系统设计](#FB-27-SD-R-001)

**参考资源**：
- [web.dev - Lab and field data](https://web.dev/articles/lab-and-field-data)
- [web-vitals 库](https://github.com/GoogleChrome/web-vitals)

**口头回答版**：
> Lab Data 是在实验室环境里测的，比如 Lighthouse、WebPageTest，环境可控、可复现，适合开发和 CI 门禁。Field Data 是真实用户数据，通过 web-vitals 库在浏览器里采集，能反映真实网络、设备、缓存情况，适合上线后监控和告警。实际项目要结合用：开发用 Lighthouse 快速定位，CI 设门禁，上线后用 RUM 看真实指标，异常时再用 Lab Data 复现。RUM 要按 p75 或 p90 看，不能只看平均值。

---

### FB-27-EN-P-006：Service Worker 有哪些缓存策略？如何选择？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：27 Performance
**标签**：cache-strategy、performance-optimization、frontend-engineering
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 Service Worker 常见的缓存策略，并说明在不同资源类型下应如何选择。

**参考答案**：

Service Worker 是浏览器后台运行的脚本，可拦截网络请求、管理缓存，实现离线访问和加速资源加载。

常见缓存策略：

| 策略 | 流程 | 适用资源 |
|------|------|---------|
| **Cache First** | 先读缓存，命中直接返回；未命中再请求并缓存 | 静态资源、图片、字体 |
| **Network First** | 先请求网络，成功返回并更新缓存；失败用缓存 | HTML、API 数据 |
| **Stale-While-Revalidate** | 先返回缓存，同时后台请求更新缓存 | 更新不敏感的静态资源 |
| **Network Only** | 只走网络 | 敏感 API、实时数据 |
| **Cache Only** | 只读缓存 | 预缓存的离线资源 |
| **Race / Cache then Network** | 缓存和网络同时发起，先用快的 | 对实时性有一定要求的资源 |

Stale-While-Revalidate 示例：

```javascript
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images-v1').then(async (cache) => {
        const cached = await cache.match(event.request);
        const fetchPromise = fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
        return cached || fetchPromise;
      })
    );
  }
});
```

Workbox 配置示例：

```javascript
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// 静态资源：Cache First
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font',
  new CacheFirst({
    cacheName: 'static-assets',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

// API：Network First
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 3,
  })
);
```

策略选择原则：
- **静态资源**：Cache First + 长期缓存，配合文件名 hash。
- **HTML 入口**：Network First 或 Stale-While-Revalidate，保证内容新鲜。
- **API 数据**：Network First + 短缓存，或根据业务定制。
- **用户个性化数据**：Network Only 或私有缓存。

注意事项：
- 缓存清理：SW 更新时清理旧缓存，避免存储无限增长。
- 缓存版本：通过 cacheName 版本号管理，如 `static-v2`。
- HTTPS 要求：Service Worker 必须在 HTTPS 下运行。
- 不要缓存跨域请求的 opaque 响应，除非明确需要。

**评分维度**：
- 能说出 4 种以上缓存策略及流程（40%）
- 能根据资源类型选择合适策略（30%）
- 能给出 Service Worker 或 Workbox 代码示例（30%）

**常见错误**：
- 所有资源都用 Cache First，导致内容更新不及时。
- Service Worker 缓存不清理，存储持续增长。
- 忽略 HTTPS 要求，本地开发正常但线上无法注册。

**延伸追问**：
- 如何保证 Service Worker 更新后用户能尽快使用新版本？
- Service Worker 缓存和 HTTP 缓存是什么关系？

**相关题目**：
- [FB-27-CO-B-007 HTTP 缓存策略](#FB-27-CO-B-007)
- [FB-27-SC-R-005 CDN 与边缘缓存架构](#FB-27-SC-R-005)

**参考资源**：
- [web.dev - Service Workers](https://web.dev/articles/service-workers-cache-storage)
- [Workbox 文档](https://developer.chrome.com/docs/workbox/)

**口头回答版**：
> Service Worker 常见的缓存策略有 Cache First、Network First、Stale-While-Revalidate、Network Only、Cache Only。静态资源用 Cache First，命中缓存最快；HTML 和 API 用 Network First，保证最新；不常变的资源用 Stale-While-Revalidate，先返回缓存再后台更新。实现可以直接写 fetch 事件，也可以用 Workbox。要注意缓存版本管理和清理，SW 更新后要删掉旧缓存。Service Worker 必须在 HTTPS 下运行。

---

### FB-27-PE-P-007：字体加载优化有哪些策略？FOUT、FOIT、FOF 分别是什么？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：27 Performance
**标签**：core-web-vitals、reflow-repaint、performance-optimization
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释字体加载过程中 FOUT、FOIT、FOF 的含义，并说明如何通过 `font-display` 和其他手段优化字体加载。

**参考答案**：

字体加载三阶段现象：

| 现象 | 全称 | 描述 |
|------|------|------|
| **FOIT** | Flash of Invisible Text | 自定义字体加载前，文字不可见 |
| **FOUT** | Flash of Unstyled Text | 先用 fallback 字体显示，加载完成后再切换 |
| **FOF** | Flash of Faux Text | 浏览器用合成方式模拟字重/斜体，显示不正确 |

`font-display` 取值：

| 值 | 行为 | 适用场景 |
|----|------|---------|
| `auto` | 浏览器默认行为 | 一般不建议 |
| `block` | 短 FOIT（约 3s），然后 FOUT | 品牌字体必须显示 |
| `swap` | 立即 FOUT | 可读性优先，推荐 |
| `fallback` | 短暂 FOIT（约 100ms），然后 swap | 平衡 |
| `optional` | 在缓存期内 FOIT，否则用 fallback | 性能优先，不切换 |

推荐配置：

```css
@font-face {
  font-family: 'Brand';
  src: url('/fonts/brand.woff2') format('woff2');
  font-display: swap;
  font-weight: 400 700;
  unicode-range: U+4E00-9FFF; /* 中文字体按需加载 */
}
```

优化手段：

1. **预加载关键字体**：

```html
<link rel="preload" as="font" href="/fonts/brand.woff2" type="font/woff2" crossorigin />
```

2. **使用现代字体格式**：
   - WOFF2 体积最小，优先使用。
   - 可变字体（Variable Fonts）用一个文件覆盖多个字重，减少请求。

3. **减少字体子集**：
   - 使用 `unicode-range` 只加载需要的字符。
   - 中文字体通过子集化工具拆分常用字。

4. **Font Face Observer / Font Loading API**：

```javascript
const font = new FontFace('Brand', 'url(/fonts/brand.woff2)');
font.load().then(() => {
  document.fonts.add(font);
  document.documentElement.classList.add('fonts-loaded');
});
```

5. **调整 fallback 字体尺寸（size-adjust / ascent-override）**：

```css
@font-face {
  font-family: 'Brand Fallback';
  src: local('Arial');
  size-adjust: 107%;
  ascent-override: 90%;
}
```

通过让 fallback 字体和自定义字体的尺寸更接近，减少切换时的 CLS。

**评分维度**：
- 能区分 FOUT、FOIT、FOF（30%）
- 能说明 font-display 各值的行为和适用场景（30%）
- 能给出预加载、子集化、fallback 调整等优化手段（40%）

**常见错误**：
- 所有字体都用 `font-display: block`，导致 FOIT 过长。
- 预加载字体但不加 `crossorigin`，导致重复请求。
- 忽略字体切换对 CLS 的影响。

**延伸追问**：
- 可变字体如何减少请求和体积？
- 中文字体子集化有哪些方案？

**相关题目**：
- [FB-27-PE-A-002 如何优化 CLS](#FB-27-PE-A-002)
- [FB-27-SC-A-006 预加载、预取、预连接](#FB-27-SC-A-006)

**参考资源**：
- [web.dev - Optimize WebFont loading](https://web.dev/articles/optimize-webfont-loading)
- [web.dev - Avoid invisible text during font loading](https://web.dev/articles/avoid-invisible-text)

**口头回答版**：
> 字体加载时会有 FOIT，就是自定义字体没加载好前文字看不见；FOUT 是先显示 fallback 字体，加载好了再切换；FOF 是浏览器用伪字重显示。font-display 控制这个行为：swap 是立刻用 fallback 再切换，可读性好；optional 是如果缓存里有就用，没有就不切换，性能最好；block 是等几秒再切换。优化方法：用 preload 预加载关键字体；用 WOFF2 和可变字体；用 unicode-range 做子集化；调整 fallback 字体尺寸让切换时少跳，降低 CLS。

---

## 架构题（28 道）{#architect}

### FB-27-SD-R-001：如何设计一个前端性能监控与告警系统？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：27 Performance
**标签**：observability、performance、performance-optimization
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端性能监控与告警系统，能够采集真实用户性能指标、存储、分析、可视化，并在指标劣化时触发告警。要求说明数据采集、传输、存储、计算、告警和可视化各环节。

**参考答案**：

系统目标：
- 采集 Core Web Vitals、资源加载、错误、业务自定义指标。
- 支持按页面、设备、网络、版本、AB 实验等多维度下钻。
- 提供实时告警和趋势分析能力。

整体架构：

```text
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Web/App    │────▶│  SDK / Beacon │────▶│  Gateway    │
│  客户端      │     │  数据采集     │     │  接收/鉴权  │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                          ┌────────────────────┼────────────────────┐
                          ▼                    ▼                    ▼
                   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                   │  实时流处理  │    │  离线数仓    │    │  告警引擎    │
                   │  Kafka/Flink│    │  ClickHouse │    │  Rule Engine│
                   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
                          │                  │                  │
                          ▼                  ▼                  ▼
                   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                   │  实时看板    │    │  离线报表    │    │  告警通知    │
                   │  Grafana    │    │  BI / 自研  │    │  企微/邮件   │
                   └─────────────┘    └─────────────┘    └─────────────┘
```

各环节设计：

1. **数据采集（SDK）**：

```javascript
import { onLCP, onINP, onCLS, onTTFB, onFCP } from 'web-vitals';

class PerfMonitor {
  constructor(config) {
    this.endpoint = config.endpoint;
    this.init();
  }

  init() {
    onLCP(this.report.bind(this));
    onINP(this.report.bind(this));
    onCLS(this.report.bind(this));
    onTTFB(this.report.bind(this));
    onFCP(this.report.bind(this));

    // 资源加载监控
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.report({ name: 'resource', value: entry.responseEnd, ...entry });
      }
    }).observe({ type: 'resource', buffered: true });
  }

  report(metric) {
    const payload = {
      ...metric,
      url: location.href,
      pathname: location.pathname,
      ua: navigator.userAgent,
      deviceType: this.getDeviceType(),
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
    };
    navigator.sendBeacon(this.endpoint, JSON.stringify(payload));
  }
}
```

2. **数据传输**：
   - 使用 `sendBeacon` 保证页面卸载时也能上报。
   - 批量压缩后上报，减少请求数。
   - 采样率控制：全量采集成本高，可按用户/页面采样（如 10%）。

3. **数据存储**：
   - 实时数据：Kafka + Flink / ClickHouse，适合高并发写入和聚合查询。
   - 离线数据：Hive / S3，用于长期趋势分析和成本控制。
   - 元数据：MySQL / Redis，存储页面映射、版本、告警规则。

4. **指标计算**：
   - 按 p50/p75/p90/p99 分位计算。
   - 按页面、设备、网络、版本、地域等维度下钻。
   - 计算 PASS 率：如 LCP ≤ 2.5s 的占比。

5. **告警设计**：

```yaml
rules:
  - name: LCP 劣化
    metric: lcp_p75
    condition: > 2500
    duration: 10m
    window: 5m
    channels: [wecom, email]
  - name: INP 劣化
    metric: inp_p75
    condition: > 200
    duration: 5m
    channels: [wecom]
```

告警策略：
- 避免毛刺误报，使用滑动窗口和多条件组合。
- 按业务线/页面分级，核心页面告警阈值更严格。
- 告警升级机制：持续劣化时升级通知级别。

6. **可视化**：
   - 实时看板：Grafana 或自研，展示关键指标趋势。
   - 分布图：瀑布图、热力图、散点图分析长尾问题。
   - 关联分析：把性能指标与发布版本、错误率、业务转化率关联。

**评分维度**：
- 能完整设计采集、传输、存储、计算、告警、可视化六层架构（40%）
- 能说明 web-vitals 采集、sendBeacon、采样、分位计算等关键点（30%）
- 能考虑成本、误报、多维度下钻等架构权衡（30%）

**常见错误**：
- 全量采集导致存储和计算成本失控。
- 告警只看平均值，忽略 p75/p90 长尾。
- 只采集不分析，缺少与业务指标的关联。

**延伸追问**：
- 如何保证页面 unload 时数据不丢失？
- 性能监控 SDK 本身如何不拖慢页面性能？

**相关题目**：
- [FB-27-CO-P-005 实验室数据与真实用户数据](#FB-27-CO-P-005)
- [FB-27-EN-A-007 Lighthouse 性能诊断](#FB-27-EN-A-007)

**参考资源**：
- [web.dev - Measure performance in the field](https://web.dev/articles/field-data)
- [Google Chrome UX Report](https://developer.chrome.com/docs/crux/)

**口头回答版**：
> 设计前端性能监控系统，分六层。采集层用 web-vitals SDK 在浏览器里收集 LCP、INP、CLS 等指标，用 sendBeacon 上报，支持采样。传输层做批量压缩和鉴权。存储层用 Kafka 接实时流，ClickHouse 做聚合查询，S3 存长期数据。计算层按 p75、p90 分位，按页面、设备、版本下钻。告警层设滑动窗口规则，比如 LCP p75 超过 2.5 秒持续 10 分钟就发企微。可视化用 Grafana 做看板，还要把性能指标和发布、业务转化率关联起来分析。

---

### FB-27-SD-R-002：如何设计性能预算（Performance Budget）和 CI 门禁系统？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：27 Performance
**标签**：performance、github-actions、performance-optimization、frontend-engineering
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套性能预算和 CI 门禁机制，防止前端应用在迭代过程中性能回退。要求说明预算指标、工具链、门禁流程和失败处理策略。

**参考答案**：

性能预算是为关键指标和资源体积设定上限，作为工程纪律阻止性能劣化进入主干。

预算指标分类：

| 类型 | 指标示例 | 典型阈值 |
|------|---------|---------|
| 时间类 | LCP、INP、CLS、FCP、TBT | LCP ≤ 2.5s，INP ≤ 200ms |
| 体积类 | JS Bundle、CSS、图片 | 首页 JS ≤ 200KB（gzip） |
| 请求类 | 请求数、第三方脚本数 | 首屏请求 ≤ 50 |
| 分数类 | Lighthouse Performance Score | ≥ 90 |
| 自定义 | 路由切换时间、TTI | 依业务定义 |

工具链：

```text
本地开发 ──▶ Lighthouse CLI / webpack-bundle-analyzer
   │
   ▼
PR/MR ──▶ Lighthouse CI / bundlesize / size-limit
   │
   ▼
预发环境 ──▶ 全链路压测 / 真实环境 RUM 基线
   │
   ▼
线上 ──▶ RUM 监控 + 告警
```

Lighthouse CI 配置示例：

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/", "http://localhost:3000/product/123"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-byte-weight": ["warn", { "maxNumericValue": 500000 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

Bundle 体积门禁（size-limit）：

```json
[
  {
    "path": "dist/index.js",
    "limit": "150 KB",
    "running": false
  },
  {
    "path": "dist/index.js",
    "limit": "3 s",
    "running": true
  }
]
```

CI 门禁流程：

```text
1. 开发者提交 PR
2. CI 构建产物
3. 跑 Lighthouse / size-limit / 构建分析
4. 与基线（base branch）对比
5. 任一指标超过预算 → PR 阻塞，必须修复或申请豁免
6. 通过后在 dashboard 中记录趋势
```

失败处理策略：
- **硬门禁（Hard Gate）**：关键指标（LCP、INP、CLS、JS 体积）失败即阻塞合并。
- **软门禁（Soft Gate）**：次要指标失败只警告，由 reviewer 决策。
- **豁免机制**：业务紧急时可申请临时提升预算，但需记录技术债并限期恢复。
- **基线漂移**：定期 review 预算，根据业务增长和用户环境调整。

最佳实践：
- 预算要具体、可量化，避免“越快越好”的模糊目标。
- 与业务目标对齐，如转化率和性能指标的相关性。
- 可视化趋势，让团队感知每次迭代的影响。

**评分维度**：
- 能设计多维度性能预算指标体系（30%）
- 能说明 Lighthouse CI、size-limit 等工具链集成（30%）
- 能设计软硬门禁、豁免、基线调整等流程（40%）

**常见错误**：
- 预算指标过于宽松，失去约束意义。
- 只看总体积，不拆分首屏/非首屏。
- 没有基线对比，只看绝对值。

**延伸追问**：
- 如何处理第三方脚本体积不可控的问题？
- 性能预算和代码审查如何结合？

**相关题目**：
- [FB-27-EN-A-007 Lighthouse 性能诊断](#FB-27-EN-A-007)
- [FB-27-SD-R-003 性能基线设计](#FB-27-SD-R-003)

**参考资源**：
- [web.dev - Performance budgets](https://web.dev/articles/performance-budgets-101)
- [Lighthouse CI 文档](https://github.com/GoogleChrome/lighthouse-ci)
- [size-limit](https://github.com/ai/size-limit)

**口头回答版**：
> 性能预算是给关键指标和资源体积设上限，防止迭代中性能回退。指标分时间类、体积类、请求类、分数类，比如 LCP 2.5 秒、首页 JS 200KB、Lighthouse 90 分。工具链可以用 Lighthouse CI 跑时间指标，size-limit 或 bundlesize 控制包体积。CI 流程是每次 PR 构建后跑这些检查，和主干基线对比，超预算就阻塞合并，重要指标硬门禁，次要指标软警告。还要支持豁免机制，业务紧急可以申请临时提高，但要记技术债。预算要定期 review，根据业务和环境调整。

---

### FB-27-SD-R-003：如何为大型前端项目建立性能基线（Performance Baseline）？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：27 Performance
**标签**：performance、observability、frontend-engineering
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请说明性能基线的概念、建立方法和维护策略。如何确保基线既能反映真实用户体验，又能在持续迭代中保持有效？

**参考答案**：

性能基线是指在某一时点、某一环境下，前端应用关键性能指标的标准参考值。它是性能优化、回归防护和团队沟通的基准。

基线指标体系：

| 层级 | 指标 | 采集方式 |
|------|------|---------|
| 页面级 | LCP、INP、CLS、FCP、TTFB | RUM + Lab |
| 资源级 | JS/CSS/图片体积、请求数、缓存命中率 | 构建分析 + 网络监控 |
| 交互级 | 路由切换时间、首交互时间、长任务数 | RUM |
| 业务级 | 转化率、跳出率与性能指标相关性 | 业务数据 |

建立步骤：

1. **定义关键页面**：
   - 首页、商品详情页、结算页、搜索结果页等核心流程页面。

2. **选择环境和设备**：
   - 实验室：Moto G4 模拟、慢 4G、CPU 4x 降速。
   - 真实用户：按设备等级（高/中/低端）、网络类型（4G/5G/WiFi）分组。

3. **采集数据**：
   - Lab：Lighthouse、WebPageTest 固定脚本，每天至少跑一次。
   - RUM：web-vitals SDK 采集真实用户 p75/p90。

4. **确定基线值**：
   - 取稳定运行 2-4 周后的 p75 值作为基线。
   - 基线 = 当前可接受水平，不一定是目标水平。

5. **建立 dashboard**：
   - 展示每个页面、每个指标的当前值、基线、目标值。
   - 标记异常波动和版本关联。

维护策略：

```text
基线 = 稳定期 p75 值
预算 = 基线 + 容差（如 +10% 或 +200ms）
目标 = 行业推荐值（如 LCP ≤ 2.5s）
```

- **定期校准**：每季度 review 一次，考虑业务增长、新设备、网络升级。
- **版本锚定**：基线与代码版本关联，便于追溯是哪次发布引入变化。
- **容差机制**：允许短期波动，但持续超过容差需排查。
- **分层基线**：核心页面更严格，长尾页面可放宽。

基线应用：
- **CI 对比**：PR 性能与基线对比，偏差超过阈值则告警。
- **发布评估**：发布前后对比基线，决定是否回滚。
- **技术规划**：根据与目标的差距制定季度优化 OKR。

**评分维度**：
- 能说明基线的定义和分层指标体系（30%）
- 能描述从采集到确定基线的完整步骤（30%）
- 能设计维护、校准、容差、应用策略（40%）

**常见错误**：
- 把基线设为目标值，导致一上来就全线飘红。
- 基线只取一次，不随业务和环境变化更新。
- 只看平均值，不看分位数和分布。

**延伸追问**：
- 基线和性能预算有什么区别和联系？
- 如何处理发布新版本后基线自然上升的情况？

**相关题目**：
- [FB-27-SD-R-002 性能预算与 CI 门禁](#FB-27-SD-R-002)
- [FB-27-SD-R-001 性能监控与告警系统](#FB-27-SD-R-001)

**参考资源**：
- [web.dev - Establish performance baselines](https://web.dev/articles/performance-baseline)
- [web.dev - Performance budgets](https://web.dev/articles/performance-budgets-101)

**口头回答版**：
> 性能基线就是我们在稳定状态下，关键性能指标的标准参考值。建立基线要先定义核心页面，选好测试环境，比如 Moto G4、慢 4G；然后用 Lighthouse 和 web-vitals 采集数据，取运行稳定后 p75 的值作为基线。基线不等于目标，基线加上容差就是性能预算。维护上要定期校准，每季度 review，因为业务和网络环境会变；核心页面严格，长尾页面宽松。基线用来在 CI 里做对比、发布时评估、做技术规划。

---

### FB-27-CP-R-004：假设你负责一个大型电商首页的性能优化，请给出整体优化策略。

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：27 Performance
**标签**：core-web-vitals、performance-optimization、frontend-engineering
**出现频率**：高频
**预计回答时长**：20-30 分钟

**题目描述**：
请针对大型电商首页的加载和交互性能，给出从网络、渲染、资源、架构到监控的系统性优化方案。

**参考答案**：

电商首页特点：
- 模块多、图片多、第三方脚本多、动态内容多。
- 首屏直接影响转化率和跳出率。
- 大促时流量激增，对稳定性和性能要求极高。

优化策略分层：

1. **网络层**：
   - CDN 加速静态资源，边缘缓存 HTML（如 Cloudflare / Akamai / 阿里云 CDN）。
   - 启用 HTTP/2 或 HTTP/3，减少连接开销。
   - 开启 Brotli/Gzip 压缩。
   - DNS 预解析和预连接关键域名。

2. **服务端与渲染策略**：
   - 首页使用 SSG + CDN，TTFB 降到最低。
   - 动态模块（如个性化推荐）使用 ISR 或 Edge SSR，静态骨架优先返回。
   - 接口聚合，减少前端请求数。

3. **资源优化**：
   - 首屏图片使用 WebP/AVIF + 响应式图片 + preload/fetchpriority。
   - 非首屏图片懒加载，广告位预留尺寸避免 CLS。
   - JS/CSS 按路由和模块拆分，关键 CSS 内联。
   - 第三方脚本（埋点、广告、客服）延迟加载或异步加载。

4. **渲染优化**：
   - 避免首屏大量同步 JS 执行，使用任务切片。
   - 轮播、tab 切换等交互用 transform/opacity，走合成层。
   - 长列表使用虚拟滚动或分页。
   - Hydration 优化：React 18 Selective Hydration、Vue 的异步组件 hydration。

5. **缓存策略**：
   - 静态资源文件名加 hash，设一年强缓存。
   - HTML 用 SWR / 短缓存，保证更新及时。
   - Service Worker 缓存静态资源，支持离线兜底。

6. **大促保障**：
   - 降级预案：非核心模块可开关、图片降质、关闭部分动画。
   - 预热 CDN，提前推送关键资源到边缘节点。
   - 限流和熔断，防止后端拖垮前端体验。

7. **监控与闭环**：
   - RUM 监控 LCP/INP/CLS，按页面、模块、AB 实验下钻。
   - Lab 监控 Lighthouse 分数和体积预算。
   - 大促期间实时大盘，异常自动告警。

优先级矩阵：

| 优化项 | 收益 | 成本 | 优先级 |
|--------|------|------|--------|
| 图片格式/响应式/懒加载 | 高 | 低 | P0 |
| 关键 CSS 内联 + JS 延迟 | 高 | 中 | P0 |
| SSG + CDN | 高 | 中 | P0 |
| 第三方脚本治理 | 高 | 中 | P1 |
| Hydration 优化 | 中 | 高 | P1 |
| 虚拟滚动 | 中 | 中 | P1 |

**评分维度**：
- 能从网络、服务端、资源、渲染、缓存、监控多维度展开（40%）
- 能结合电商首页特点给出针对性方案（30%）
- 能考虑大促、降级、优先级等技术管理因素（30%）

**常见错误**：
- 只谈前端优化，忽略服务端和 CDN。
- 所有模块都预加载，导致带宽竞争。
- 忽略第三方脚本对 INP 和 CLS 的影响。

**延伸追问**：
- 大促时如果 CDN 边缘节点命中率下降，如何快速定位？
- 电商首页个性化推荐模块如何兼顾性能和实时性？

**相关题目**：
- [FB-27-PE-A-001 如何优化 LCP](#FB-27-PE-A-001)
- [FB-27-PE-A-003 如何优化 INP](#FB-27-PE-A-003)
- [FB-27-SC-R-005 CDN 与边缘缓存架构](#FB-27-SC-R-005)

**参考资源**：
- [web.dev - Fast load times](https://web.dev/articles/fast)
- [web.dev - Optimize e-commerce sites](https://web.dev/articles/e-commerce)

**口头回答版**：
> 电商首页优化要分层做。网络层用 CDN、HTTP/2、Brotli、DNS 预解析；服务端用 SSG 加 CDN，让 TTFB 最低，动态模块用 ISR 或 Edge SSR；资源层首屏图片用 WebP/AVIF、响应式、preload，非首屏懒加载，JS/CSS 拆分、关键 CSS 内联；渲染层避免同步长任务，动画用 transform，长列表虚拟滚动；缓存层静态资源一年强缓存，HTML 短缓存，Service Worker 兜底；监控层用 RUM 看 LCP、INP、CLS，Lighthouse 做 Lab 监控。大促还要准备降级预案，比如图片降质、关动画、模块开关，提前预热 CDN。

---

### FB-27-SC-R-005：如何设计 CDN 缓存与边缘计算架构来优化前端性能？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：27 Performance
**标签**：cdn、cache-strategy、edge、global-delivery、performance-optimization
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套基于 CDN 的前端性能优化架构，包括静态资源缓存、HTML 缓存、边缘计算能力，并说明如何应对缓存失效和动态内容。

**参考答案**：

CDN 在前端性能中的价值：
- 缩短用户到服务器的物理距离，降低 TTFB。
- 分担源站压力，提高可用性和并发能力。
- 边缘计算可在靠近用户的位置执行部分逻辑。

架构分层：

```text
用户 ──▶ 边缘节点（CDN PoP）
          ├── 静态资源缓存（JS/CSS/图片/字体）
          ├── HTML 缓存 / SSG 页面
          └── 边缘计算（Edge Worker）
                    └── 回源到 源站 / API / 对象存储
```

1. **静态资源缓存**：
   - 文件名加 content hash，设置 `Cache-Control: public, max-age=31536000, immutable`。
   - 按文件类型配置不同的缓存 TTL。
   - 启用 Brotli/Gzip 压缩和 HTTP/2 Server Push（如仍支持）。

2. **HTML 缓存策略**：
   - 纯静态页面：长期缓存 + 通过版本号或路径刷新。
   - 半动态页面（如电商首页）：使用 `s-maxage=60, stale-while-revalidate=86400`，边缘可快速返回并后台更新。
   - 强动态页面：不缓存或极短缓存，由 Edge Worker 注入公共部分。

3. **边缘计算（Edge Worker / Cloudflare Workers）**：

```javascript
// Cloudflare Worker 示例：A/B 分流 + 边缘缓存
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const ab = request.headers.get('cookie')?.includes('experiment=A') ? 'A' : 'B';
    
    const cacheKey = new Request(url.toString() + '?ab=' + ab, request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);
    
    if (!response) {
      response = await fetch(request, { cf: { cacheTtl: 300 } });
      response = new Response(response.body, response);
      response.headers.append('Cache-Control', 'public, max-age=300');
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    }
    
    return response;
  }
};
```

边缘计算适用场景：
- A/B 测试分流（避免回源）。
- 地理/设备相关的页面变体。
- 轻量级 SSR/ISR（如 Next.js on Vercel Edge）。
- 鉴权、限流、灰度发布。

4. **缓存失效策略**：
   - 静态资源通过文件名 hash 自然失效，不需要主动 purge。
   - HTML 和 API 使用版本号、ETag、Last-Modified 或 CDN purge API。
   - 设计灰度发布时，按版本路径（如 `/v2/index.html`）部署，避免全站刷新。

5. **动态内容处理**：
   - 边缘侧包含（ESI）：将页面分为可缓存和不可缓存片段。
   - 骨架屏 + 客户端 hydrate：先返回静态骨架，再由 JS 拉取动态数据。
   - GraphQL/CDN 缓存：对查询结果做片段缓存。

6. **监控与调优**：
   - 监控 CDN 命中率、回源率、TTFB、边缘节点分布。
   - 命中率低于预期时检查缓存 key 配置、Vary 头、Cookie 透传。

**评分维度**：
- 能设计静态资源、HTML、API 的分层缓存策略（40%）
- 能说明边缘计算的适用场景和代码示例（30%）
- 能处理缓存失效、动态内容、命中率监控等问题（30%）

**常见错误**：
- 所有 HTML 都长期缓存，导致内容更新不及时。
- Cookie 未正确剥离，导致每个用户命中不同缓存。
- 忽略回源带宽成本，命中率低时不优化。

**延伸追问**：
- CDN 缓存 key 通常包含哪些字段？如何配置 Vary？
- 边缘 SSR 和源站 SSR 相比有什么优势和限制？

**相关题目**：
- [FB-27-CO-B-007 HTTP 缓存策略](#FB-27-CO-B-007)
- [FB-27-EN-P-006 Service Worker 缓存策略](#FB-27-EN-P-006)
- [FB-27-CO-A-008 SSR、SSG、ISR 对比](#FB-27-CO-A-008)

**参考资源**：
- [web.dev - Content delivery networks](https://web.dev/articles/content-delivery-networks)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions)

**口头回答版**：
> CDN 优化前端性能的核心是把资源放到离用户近的节点。静态资源文件名加 hash，设一年缓存；HTML 看情况，静态页长期缓存，半动态用 stale-while-revalidate，动态页短缓存或不缓存。边缘计算可以做 A/B 分流、轻量 SSR、灰度发布，减少回源。缓存失效方面，静态资源靠 hash，HTML 用 purge 或版本路径。要注意 Cookie 和 Vary 头，否则每个用户都命不中缓存。还要监控命中率和回源率，命中率低要排查配置。

---

### FB-27-SD-R-006：如何设计一个前端性能可视化大盘（Performance Dashboard）？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：27 Performance
**标签**：observability、performance-optimization
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端性能可视化大盘，面向不同角色（开发、产品、管理层）展示性能数据。说明数据源、指标设计、可视化方案和权限管理。

**参考答案**：

大盘目标：
- 开发：快速定位性能瓶颈和回归点。
- 产品：理解性能对用户体验和业务指标的影响。
- 管理层：掌握核心页面健康度和优化 ROI。

数据架构：

```text
RUM SDK ──▶ 数据网关 ──▶ Kafka ──▶ Flink 实时聚合
                                  ──▶ ClickHouse 明细查询
                                  ──▶ 离线数仓（趋势/归因）
```

指标设计：

| 角色 | 关注指标 | 可视化 |
|------|---------|--------|
| 管理层 | LCP/INP/CLS PASS 率、性能分数趋势、业务转化率关联 | 仪表盘、周/月趋势 |
| 产品 | 页面级加载时间、用户分布、劣化页面 Top10 | 漏斗、表格 |
| 开发 | 长任务、资源瀑布、错误堆栈、版本对比 | 瀑布图、火焰图、散点图 |

可视化方案：

1. **核心指标看板**：
   - 展示 LCP/INP/CLS 的 p75/p90/p99 趋势。
   - 用红黄绿标示是否通过 Google 推荐阈值。

2. **页面矩阵**：
   - 表格展示各页面 LCP/INP/CLS，支持排序和下钻。

3. **分布图**：
   - 直方图展示 LCP 分布，识别长尾用户。
   - 散点图展示 LCP 与转化率关系。

4. **瀑布图 / 火焰图**：
   - 单个会话的资源加载时序。
   - Lab 数据可集成 WebPageTest 瀑布图。

5. **告警事件叠加**：
   - 在趋势图上标记发布、告警、优化事件，便于归因。

权限管理：
- 管理层：只看汇总和趋势。
- 产品经理：看自己负责业务的页面。
- 开发：可看原始 trace 和明细。
- SRE：可看告警配置和系统健康度。

交互设计：
- 支持时间范围、页面、设备、网络、版本、地域筛选。
- 支持下钻：从页面 → 会话 → 单个资源加载详情。
- 支持对比：本周 vs 上周、当前版本 vs 上一版本。

技术选型：
- 实时查询：ClickHouse + Grafana / 自研图表库（ECharts/AntV）。
- 存储：短期热数据 ClickHouse，长期冷数据 S3 + Presto。
- 后端：Node.js / Go 提供聚合 API。

**评分维度**：
- 能按角色设计分层指标和视图（30%）
- 能设计数据源、存储、聚合架构（30%）
- 能考虑下钻、对比、告警叠加、权限等交互需求（40%）

**常见错误**：
- 大盘只展示平均值，忽略分位数和分布。
- 指标过多过杂，不同角色找不到重点。
- 缺乏与业务指标的关联，无法体现性能价值。

**延伸追问**：
- 如何保证大盘本身的性能，避免查询过慢？
- 性能数据涉及用户隐私，如何做好脱敏和合规？

**相关题目**：
- [FB-27-SD-R-001 性能监控与告警系统](#FB-27-SD-R-001)
- [FB-27-SD-R-003 性能基线设计](#FB-27-SD-R-003)

**参考资源**：
- [web.dev - Performance dashboards](https://web.dev/articles/performance-budgets-101)
- [ECharts 官方文档](https://echarts.apache.org/)

**口头回答版**：
> 性能可视化大盘要面向不同角色设计。管理层看 PASS 率、趋势和与转化的关系；产品看各页面加载时间和劣化排名；开发看长任务、资源瀑布、错误明细。数据源来自 RUM SDK 和 Lighthouse Lab 数据，经过 Kafka 实时聚合到 ClickHouse，长期数据放 S3。可视化用仪表盘、趋势图、分布直方图、瀑布图。要支持按页面、设备、版本、地域筛选，支持下钻到单个会话，还要能在趋势上叠加发布和告警事件。权限上分管理层看汇总、开发看明细。

---

### FB-27-CP-R-007：SPA、MPA、Islands 架构在性能上各有什么优劣？如何选择？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：27 Performance
**标签**：ssr、rendering、performance-optimization、micro-frontend
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请对比 SPA（单页应用）、MPA（多页应用）、Islands 架构在性能上的表现，并说明在不同业务场景下如何选型。

**参考答案**：

三种架构对比：

| 维度 | SPA | MPA | Islands |
|------|-----|-----|---------|
| 首屏加载 | 需下载完整框架 + 路由代码 | 每页独立加载，首屏只加载当前页所需 | 静态 HTML 优先，局部交互组件按需 hydrate |
| 路由切换 | 快，无整页刷新 | 慢，整页重新加载 | 介于两者之间 |
| JS 体积 | 总体积大，但首次后复用 | 每页体积小，但重复依赖多 | 静态部分无 JS，交互组件按需加载 |
| 交互响应 | 框架内部处理，复杂状态管理 | 页面级刷新，状态难保持 | 局部 hydration，响应快 |
| SEO | 依赖 SSR/SSG | 天然友好 | 天然友好 |
| 复杂度 | 中（路由、状态管理） | 低 | 高（需要识别 islands 边界） |

性能特点分析：

**SPA**：
- 优点：路由切换快，用户体验接近原生应用。
- 缺点：首屏需要加载和解析大量 JS，hydration 可能阻塞主线程，影响 INP。
- 优化：代码分割、懒加载路由、 SSR/SSG + selective hydration。

**MPA**：
- 优点：每页独立，首屏只加载当前页面资源；无 hydration 开销。
- 缺点：页面切换需重新加载，公共依赖重复下载；状态共享复杂。
- 优化：公共依赖提取、预加载下一页、Service Worker 缓存公共资源。

**Islands 架构**：
- 代表框架：Astro、Fresh（Deno）、Marko。
- 页面大部分为静态 HTML，只有交互组件（islands）才加载 JS 并 hydrate。
- 优点：首屏 JS 极小，SEO 友好，交互组件隔离加载。
- 缺点：架构复杂度高，组件间通信和状态共享需要额外设计。

代码示例（Astro Islands）：

```astro
---
import Carousel from '../components/Carousel.astro';
import SearchBox from '../components/SearchBox.jsx';
---
<html>
  <body>
    <Carousel /> <!-- 静态，无 JS -->
    <SearchBox client:visible /> <!-- 进入视口时才 hydrate -->
  </body>
</html>
```

选型建议：

| 场景 | 推荐架构 |
|------|---------|
| 内容型站点、博客、文档 | MPA / Islands |
| 强交互后台系统、复杂状态 | SPA |
| 营销页、落地页、内容电商 | Islands |
| 大型平台，既有内容又有复杂交互 | 混合：核心页面 Islands/MPA，后台 SPA |

未来趋势：
- Islands 和 React Server Components 都在推动“按需交互”的方向。
- 没有银弹，架构选型应基于页面类型、团队能力、SEO 要求和性能目标。

**评分维度**：
- 能从首屏、路由切换、JS 体积、SEO、复杂度多维度对比三者（40%）
- 能给出具体框架示例和代码（20%）
- 能根据业务场景给出选型建议（40%）

**常见错误**：
- 认为 SPA 一定比 MPA 快（忽略首屏和 hydration 成本）。
- 认为 Islands 架构适合所有场景（复杂交互开发成本高）。
- 忽略团队技术栈和可维护性，只看性能。

**延伸追问**：
- React Server Components 和 Islands 架构有什么异同？
- 如果一个大型平台要迁移到 Islands 架构，你会怎么规划？

**相关题目**：
- [FB-27-CO-A-008 SSR、SSG、ISR 对比](#FB-27-CO-A-008)
- [FB-27-CP-R-004 电商首页性能优化](#FB-27-CP-R-004)

**参考资源**：
- [Astro Islands 架构](https://docs.astro.build/en/concepts/islands/)
- [web.dev - Rendering on the Web](https://web.dev/articles/rendering-on-the-web)
- [Fresh 架构](https://fresh.deno.dev/docs/concepts/architecture)

**口头回答版**：
> SPA 首屏需要加载整个框架，路由切换快但 hydration 可能阻塞主线程；MPA 每页独立加载，没有 hydration 开销，但页面切换慢、公共依赖重复；Islands 是大部分静态 HTML，只有交互组件才加载 JS，首屏 JS 很小。内容型站点适合 MPA 或 Islands，复杂后台系统适合 SPA，营销页落地页适合 Islands。选型要看业务特点，没有绝对好坏。像 Astro 的 Islands 可以让组件按 client:visible 进入视口才 hydrate，显著减少首屏 JS。
### FB-27-CO-A-009：请解释 FCP、LCP、CLS、INP、TTFB 的含义。

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 FCP、LCP、CLS、INP、TTFB 的含义。。

**参考答案**：

- FCP：首次内容绘制，浏览器首次渲染 DOM 内容的时间。
- LCP：最大内容绘制，视口中最大可见元素渲染完成的时间。
- CLS：累积布局偏移，衡量页面视觉稳定性。
- INP：交互到下一次绘制，衡量页面交互响应性。
- TTFB：首字节时间，从请求到收到服务器第一个字节的时间。

**评分维度**：
- 五个指标含义准确（60%）
- 能说明哪些是 Core Web Vitals（20%）
- 能说明优化方向（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - FCP：首次内容绘制，浏览器首次渲染 DOM 内容的时间。 - LCP：最大内容绘制，视口中最大可见元素渲染完成的时间。 - CLS：累积布局偏移，衡量页面视觉稳定性。 - INP：交互到下一次绘制，衡量页面交互响应性。

---

### FB-27-CO-A-010：什么是 Core Web Vitals？Google 为什么重视它们？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是 Core Web Vitals？Google 为什么重视它们。

**参考答案**：

Core Web Vitals 是 Google 提出的一组衡量网页用户体验的核心指标，包括 LCP（加载性能）、INP（交互响应）、CLS（视觉稳定性）。Google 将其作为搜索排名因素，因为这三项直接影响用户留存和转化率。


**补充说明**：

在实际落地 Core Web VitalsGoogle 为什么重视它们 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能列出三个指标（40%）
- 能解释各自代表的体验维度（40%）
- 能联系业务价值（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> Core Web Vitals 是 Google 提出的一组衡量网页用户体验的核心指标，包括 LCP（加载性能）、INP（交互响应）、CLS（视觉稳定性）。 Google 将其作为搜索排名因素，因为这三项直接影响用户留存和转化率。

---

### FB-27-CP-A-001：重排和重绘有什么区别？如何减少重排？

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
重排和重绘有什么区别？如何减少重排。

**参考答案**：

- 重排（Reflow）：元素几何属性变化导致重新计算布局，代价高。
- 重绘（Repaint）：外观变化但布局不变，代价较低。

减少重排方法：

- 批量修改样式（class 切换）。
- 缓存会触发重排的属性值。
- 使用 transform/opacity 做动画。
- 离线操作 DOM（DocumentFragment）。
- 避免在循环中读写 DOM 属性。


**补充说明**：

在实际落地 重排和重绘有什么区别如何减少重排 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能区分重排重绘（40%）
- 能给出至少 3 个优化方法（40%）
- 能举代码示例（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 重排（Reflow）：元素几何属性变化导致重新计算布局，代价高。 - 重绘（Repaint）：外观变化但布局不变，代价较低。 减少重排方法： - 批量修改样式（class 切换）。 - 缓存会触发重排的属性值。

---

### FB-27-CO-A-011：什么是虚拟列表？它的实现原理是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是虚拟列表？它的实现原理是什么。

**参考答案**：

虚拟列表只渲染视口内及少量缓冲区的列表项，而不是全部数据。实现原理：

1. 计算可视区域高度 `viewportHeight` 和每项高度 `itemHeight`。
2. 根据滚动位置 `scrollTop` 计算起始索引 `startIndex` 和结束索引 `endIndex`。
3. 只渲染可见项及少量缓冲区 item。
4. 用 `paddingTop` 或 `transform` 模拟总高度和滚动位置。

示例（固定高度）：

```js
function VirtualList({ items, itemHeight, height }) {
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(height / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div style=&#123;&#123; height, overflow: 'auto' &#125;&#125; onScroll={e => setScrollTop(e.target.scrollTop)}>
      <div style=&#123;&#123; height: totalHeight, position: 'relative' &#125;&#125;>
        {visibleItems.map((item, i) => (
          <div
            key={item.id}
            style=&#123;&#123; position: 'absolute', top: (startIndex + i) * itemHeight, height: itemHeight &#125;&#125;
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

这样可以显著减少 DOM 节点数量，提升渲染性能。动态高度场景需缓存已测量高度并预估未测量项。

**评分维度**：
- 理解虚拟列表概念（25%）
- 能解释实现原理（35%）
- 能说明适用场景（15%）
- 有代码示例（15%）
- 了解动态高度处理（10%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 虚拟列表只渲染视口内及少量缓冲区的列表项，而不是全部数据。 实现原理： 1. 计算可视区域高度 viewportHeight 和每项高度 itemHeight。 2. 根据滚动位置 scrollTop 计算起始索引 startIndex 和结束索引 endIndex。 3. 只渲染可见项及少量缓冲区 item。

---

### FB-27-SC-A-007：节流和防抖有什么区别？分别适用什么场景？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
节流和防抖有什么区别？分别适用什么场景。

**参考答案**：

- 防抖：事件停止触发后一段时间才执行。适合搜索输入、表单校验。
- 节流：一段时间内只执行一次。适合滚动、resize、mousemove。


**补充说明**：

在实际落地 节流和防抖有什么区别分别适用什么场景 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能准确区分两者（50%）
- 能给出适用场景（30%）
- 能写出简单实现（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 防抖：事件停止触发后一段时间才执行。 适合搜索输入、表单校验。 - 节流：一段时间内只执行一次。 适合滚动、resize、mousemove。

---

### FB-27-CO-A-012：代码分割是什么？React 中如何实现？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
代码分割是什么？React 中如何实现。

**参考答案**：

代码分割是把大 bundle 拆分成多个小 chunk，按需加载。React 中通过 `React.lazy` 和 `Suspense` 实现：

```javascript
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

也可以按路由分割，配合 React Router 使用。

**评分维度**：
- 理解代码分割价值（30%）
- 能写出 React 实现（50%）
- 能说明路由分割（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 代码分割是把大 bundle 拆分成多个小 chunk，按需加载。 React 中通过 React.lazy 和 Suspense 实现： （代码示例） 也可以按路由分割，配合 React Router 使用。

---

### FB-27-CP-A-002：preload 和 prefetch 有什么区别？

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
preload 和 prefetch 有什么区别。

**参考答案**：

- preload：预加载当前页面需要的资源，优先级高。
- prefetch：在空闲时预加载未来可能用到的资源，优先级低。

preload 用于关键资源，prefetch 用于预测用户下一步访问。

示例：

```html
<!-- 预加载当前页面关键字体 -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

<!-- 预加载下一个可能访问的页面 -->
<link rel="prefetch" href="/next-page">

<!-- DNS 预解析和预连接 -->
<link rel="dns-prefetch" href="//api.example.com">
<link rel="preconnect" href="https://api.example.com">
```

注意：滥用 preload 会占用带宽，建议只对首屏关键资源使用；prefetch 优先级低，不会阻塞当前页面。

**评分维度**：
- 能区分两者（40%）
- 能给出使用示例（30%）
- 能说明优先级差异（20%）
- 了解 dns-prefetch/preconnect（10%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - preload：预加载当前页面需要的资源，优先级高。 - prefetch：在空闲时预加载未来可能用到的资源，优先级低。 preload 用于关键资源，prefetch 用于预测用户下一步访问。 示例： （代码示例） 注意：滥用 preload 会占用带宽，建议只对首屏关键资源使用；prefetch 优先级低，不会阻塞当前页面。

---

### FB-27-PE-A-004：HTTP 缓存中的强缓存和协商缓存有什么区别？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
HTTP 缓存中的强缓存和协商缓存有什么区别。

**参考答案**：

- 强缓存：根据 Cache-Control/Expires 判断是否直接使用本地缓存，不发请求。
- 协商缓存：强缓存过期后，带 ETag/Last-Modified 向服务器验证，返回 304 则使用缓存。

强缓存性能更好，协商缓存能保证资源最新。通常配合文件名哈希实现长期强缓存。


**补充说明**：

在实际落地 HTTP 缓存中的强缓存和协商缓存有什么区别 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能区分两种缓存（50%）
- 能说明触发条件和状态码（30%）
- 能说明实际应用（20%）

---
## 二、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 强缓存：根据 Cache-Control/Expires 判断是否直接使用本地缓存，不发请求。 - 协商缓存：强缓存过期后，带 ETag/Last-Modified 向服务器验证，返回 304 则使用缓存。 强缓存性能更好，协商缓存能保证资源最新。 通常配合文件名哈希实现长期强缓存。

---

### FB-27-PE-P-008：你如何分析一个页面的性能瓶颈？

**题型**：性能优化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
你如何分析一个页面的性能瓶颈。

**参考答案**：

步骤：

1. 使用 Lighthouse 获取综合评分和优化建议。
2. 使用 Chrome DevTools Performance 面板分析主线程、重排重绘、长任务。
3. 使用 Network 面板分析资源大小、请求数量、缓存命中。
4. 使用 Web Vitals 采集真实用户数据。
5. 关注 Long Tasks、Layout Shifts、渲染帧率。
6. 结合业务场景，优先优化关键路径。


**补充说明**：

在实际落地 你如何分析一个页面的性能瓶颈 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 工具使用全面（40%）
- 能区分 Lab 和 RUM 数据（30%）
- 有优先级判断（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 步骤： 1. 使用 Lighthouse 获取综合评分和优化建议。 2. 使用 Chrome DevTools Performance 面板分析主线程、重排重绘、长任务。 3. 使用 Network 面板分析资源大小、请求数量、缓存命中。 4. 使用 Web Vitals 采集真实用户数据。

---

### FB-27-PE-P-009：Service Worker 如何提升性能？有哪些注意事项？

**题型**：性能优化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
Service Worker 如何提升性能？有哪些注意事项。

**参考答案**：

提升性能方式：

- 缓存静态资源，离线可用。
- 实现 Stale While Revalidate，先用缓存再后台更新。
- 减少网络请求，提升重复访问速度。

注意事项：

- Service Worker 有生命周期，更新机制需要谨慎处理。
- 缓存策略选择要合理，避免用户长期用旧版本。
- HTTPS 环境才能使用。
- 不要缓存动态 API 数据过久。


**补充说明**：

在实际落地 Service Worker 如何提升性能有哪些注意事项 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明性能提升方式（40%）
- 能列出注意事项（40%）
- 有缓存策略意识（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 提升性能方式： - 缓存静态资源，离线可用。 - 实现 Stale While Revalidate，先用缓存再后台更新。 - 减少网络请求，提升重复访问速度。 注意事项： - Service Worker 有生命周期，更新机制需要谨慎处理。

---

### FB-27-PE-P-010：什么是关键渲染路径？如何优化？

**题型**：性能优化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
什么是关键渲染路径？如何优化。

**参考答案**：

关键渲染路径是浏览器从接收 HTML/CSS/JS 到渲染首屏内容所经过的步骤：

```
HTML → DOM
CSS → CSSOM
DOM + CSSOM → Render Tree → Layout → Paint → Composite
```

优化方法：

- 减少关键资源数量。
- 压缩关键资源体积。
- 内联关键 CSS。
- 延迟加载非关键 JS（async/defer）。
- 预加载关键资源。


**补充说明**：

在实际落地 关键渲染路径如何优化 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能解释渲染路径（40%）
- 能给出优化方法（40%）
- 能说明对 LCP/FCP 的影响（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 关键渲染路径是浏览器从接收 HTML/CSS/JS 到渲染首屏内容所经过的步骤： （代码示例） 优化方法： - 减少关键资源数量。 - 压缩关键资源体积。 - 内联关键 CSS。 - 延迟加载非关键 JS（async/defer）。

---

### FB-27-PE-P-011：图片优化有哪些常用手段？

**题型**：性能优化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
图片优化有哪些常用手段。

**参考答案**：

1. 使用现代格式：WebP、AVIF。
2. 响应式图片：srcset + sizes。
3. 懒加载：loading="lazy"。
4. 压缩：TinyPNG、Squoosh。
5. 使用 CDN 和缓存。
6. 占位图/模糊渐进加载。
7.  SVG 替代简单图标。
8. 图片 CDN 动态裁剪尺寸。


**补充说明**：

在实际落地 图片优化有哪些常用手段 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 手段全面（50%）
- 能结合现代浏览器特性（30%）
- 有经验案例（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 1. 使用现代格式：WebP、AVIF。 2. 响应式图片：srcset + sizes。 3. 懒加载：loading="lazy"。 4. 压缩：TinyPNG、Squoosh。

---

### FB-27-PE-P-012：如何优化首屏加载时间？

**题型**：性能优化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何优化首屏加载时间。

**参考答案**：

1. 代码分割和懒加载，减少首屏 JS。
2. 内联关键 CSS，异步加载非关键 CSS。
3. 图片懒加载和格式优化。
4. 使用 CDN 和 HTTP 缓存。
5. 预加载关键资源。
6. 服务端渲染（SSR）或静态生成（SSG）。
7. 减少第三方脚本阻塞。
8. 启用 Brotli/Gzip 压缩。


**补充说明**：

在实际落地 优化首屏加载时间 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 优化方向全面（50%）
- 能区分关键与非关键资源（30%）
- 能结合业务场景（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 1. 代码分割和懒加载，减少首屏 JS。 2. 内联关键 CSS，异步加载非关键 CSS。 3. 图片懒加载和格式优化。 4. 使用 CDN 和 HTTP 缓存。

---

### FB-27-PE-P-013：什么是长任务（Long Task）？如何优化？

**题型**：性能优化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
什么是长任务（Long Task）？如何优化。

**参考答案**：

长任务是指执行时间超过 50ms 的主线程任务，会阻塞用户交互和渲染。

优化方法：

- 把大任务拆分成多个小任务（requestIdleCallback、setTimeout、scheduler）。
- 使用 Web Worker 处理计算密集型任务。
- 虚拟列表减少渲染量。
- 避免在主线程做大量数据转换。
- 使用 Time Slicing（React Concurrent Features）。


**补充说明**：

在实际落地 长任务（Long Task）如何优化 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 理解长任务概念（30%）
- 能给出优化方法（50%）
- 能说明对 INP 的影响（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 长任务是指执行时间超过 50ms 的主线程任务，会阻塞用户交互和渲染。 优化方法： - 把大任务拆分成多个小任务（requestIdleCallback、setTimeout、scheduler）。 - 使用 Web Worker 处理计算密集型任务。 - 虚拟列表减少渲染量。

---

### FB-27-PE-P-014：你如何制定性能预算（Performance Budget）？

**题型**：性能优化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
你如何制定性能预算（Performance Budget）。

**参考答案**：

制定方法：

1. 采集当前性能基线。
2. 根据业务目标设定可接受阈值。
3. 把预算分解到具体指标：JS 大小、图片大小、请求数、LCP、INP 等。
4. 在 CI 中集成检测，超预算时阻止合并。
5. 定期复盘和调整预算。

示例：

- 首屏 JS ≤ 200KB（gzip）
- 图片总大小 ≤ 1MB
- 第三方脚本 ≤ 3 个
- LCP ≤ 2.5s


**补充说明**：

在实际落地 你如何制定性能预算（Performance Budget） 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能解释性能预算概念（30%）
- 能说明制定步骤（40%）
- 能给出具体指标（30%）

---
## 三、架构级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 制定方法： 1. 采集当前性能基线。 2. 根据业务目标设定可接受阈值。 3. 把预算分解到具体指标：JS 大小、图片大小、请求数、LCP、INP 等。 4. 在 CI 中集成检测，超预算时阻止合并。

---

### FB-27-SD-R-007：设计一个面向百万级 DAU 的内容平台的性能优化体系。

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
设计一个面向百万级 DAU 的内容平台的性能优化体系。。

**参考答案**：

体系包括：

1. **接入层**：CDN、边缘缓存、HTTP/3、Brotli。
2. **渲染层**：SSR/SSG、流式渲染、骨架屏、关键 CSS 内联。
3. **资源层**：代码分割、懒加载、图片优化、公共依赖共享。
4. **网络层**：预加载、预连接、BFF 聚合、API 缓存。
5. **缓存层**：HTTP 缓存、Service Worker、Memory Cache。
6. **监控层**：RUM + Lab 数据、性能预算、告警。
7. **组织层**：性能作为 Code Review 和迭代 KPI。


**补充说明**：

在实际落地 设计一个面向百万级 DAU 的内容平台的性能优化体系。 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 覆盖多个层次（50%）
- 能说明关键决策理由（30%）
- 有组织保障意识（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 体系包括： 1. 接入层：CDN、边缘缓存、HTTP/3、Brotli。 2. 渲染层：SSR/SSG、流式渲染、骨架屏、关键 CSS 内联。 3. 资源层：代码分割、懒加载、图片优化、公共依赖共享。 4. 网络层：预加载、预连接、BFF 聚合、API 缓存。

---

### FB-27-PE-R-001：性能优化中，Lab 数据和 RUM 数据有什么区别？应该如何结合使用？

**题型**：性能优化题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
性能优化中，Lab 数据和 RUM 数据有什么区别？应该如何结合使用。

**参考答案**：

- **Lab 数据**：在受控环境（如 Lighthouse）下测试，可复现、便于调试，但不能代表真实用户。
- **RUM 数据**：采集真实用户数据，反映实际体验，但变量多、难以复现。

结合使用：

- 用 Lab 数据做 CI 门禁和本地优化验证。
- 用 RUM 数据发现真实问题、设定优化优先级。
- 两者相互补充，不要只看一个。


**补充说明**：

在实际落地 性能优化中，Lab 数据和 RUM 数据有什么区别应该如何结合使用 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能区分两种数据（40%）
- 能说明各自优缺点（30%）
- 能说明结合方式（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - Lab 数据：在受控环境（如 Lighthouse）下测试，可复现、便于调试，但不能代表真实用户。 - RUM 数据：采集真实用户数据，反映实际体验，但变量多、难以复现。 结合使用： - 用 Lab 数据做 CI 门禁和本地优化验证。 - 用 RUM 数据发现真实问题、设定优化优先级。

---

### FB-27-PE-R-002：你如何处理第三方脚本对性能的影响？

**题型**：性能优化题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
你如何处理第三方脚本对性能的影响。

**参考答案**：

处理方法：

1. 评估必要性：删除不必要的第三方脚本。
2. 异步加载：使用 async/defer，避免阻塞解析。
3. 延迟加载：非关键脚本延迟到交互后加载。
4. 预连接：preconnect 第三方域名。
5. 自托管：把关键第三方脚本放到自己 CDN。
6. 监控：跟踪第三方脚本的加载时间和错误。
7. 使用 Web Worker 加载部分脚本。


**补充说明**：

在实际落地 你如何处理第三方脚本对性能的影响 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 方法全面（50%）
- 有删除不必要脚本的意识（20%）
- 有监控意识（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 处理方法： 1. 评估必要性：删除不必要的第三方脚本。 2. 异步加载：使用 async/defer，避免阻塞解析。 3. 延迟加载：非关键脚本延迟到交互后加载。 4. 预连接：preconnect 第三方域名。

---

### FB-27-PE-R-003：在团队中如何推动性能优化落地？

**题型**：性能优化题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在团队中如何推动性能优化落地。

**参考答案**：

推动方法：

1. 建立性能指标和监控体系，用数据说话。
2. 制定性能预算并集成到 CI。
3. 把性能纳入 Code Review checklist。
4. 定期组织性能优化专项。
5. 分享性能优化案例和最佳实践。
6. 与产品、设计协作，平衡视觉体验和性能。
7. 设立性能优化目标和奖励机制。


**补充说明**：

在实际落地 在团队中如何推动性能优化落地 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 有体系化推动思路（50%）
- 强调数据和工具（30%）
- 有跨团队协作意识（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 推动方法： 1. 建立性能指标和监控体系，用数据说话。 2. 制定性能预算并集成到 CI。 3. 把性能纳入 Code Review checklist。 4. 定期组织性能优化专项。

---

### FB-27-PE-R-005：现代前端框架（如 React 18）提供了哪些性能优化特性？

**题型**：性能优化题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
现代前端框架（如 React 18）提供了哪些性能优化特性。

**参考答案**：

React 18 主要特性：

1. **Concurrent Rendering**：可中断渲染，提升交互响应。
2. **Automatic Batching**：自动批量更新状态，减少重渲染。
3. **Transitions**：区分紧急更新和非紧急更新。
4. **Suspense 改进**：支持数据获取和流式 SSR。
5. **startTransition**：把非紧急更新标记为 transition。
6. **useDeferredValue**：延迟某些值的更新，避免阻塞关键渲染。
7. **React Server Components**：减少客户端 JS 体积。

**评分维度**：
- 能列举特性（50%）
- 能说明对性能的影响（30%）
- 有经验案例（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> React 18 主要特性： 1. Concurrent Rendering：可中断渲染，提升交互响应。 2. Automatic Batching：自动批量更新状态，减少重渲染。 3. Transitions：区分紧急更新和非紧急更新。 4. Suspense 改进：支持数据获取和流式 SSR。

---

### FB-27-PE-R-006：如何平衡性能优化和开发效率？

**题型**：性能优化题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：27 性能工程
**标签**：performance-optimization、core-web-vitals、performance、frontend-engineering、rendering
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
如何平衡性能优化和开发效率。

**参考答案**：

平衡策略：

1. 设定合理目标，不过度优化。
2. 把性能优化工具化、自动化（如 CI 检测、构建优化）。
3. 优先优化关键路径和高流量页面。
4. 建立公共组件和最佳实践，减少重复投入。
5. 用性能预算约束，而不是临时救火。
6. 让性能优化成为日常开发习惯，而不是独立项目。


**补充说明**：

在实际落地 平衡性能优化和开发效率 时，建议结合 performance-optimization、core-web-vitals、performance 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 不盲目追求极致（30%）
- 工具化和自动化思路（40%）
- 优先级意识（30%）

---

> **领域编号**：A03 性能架构  
> **最后更新**：2026-06-18

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 平衡策略： 1. 设定合理目标，不过度优化。 2. 把性能优化工具化、自动化（如 CI 检测、构建优化）。 3. 优先优化关键路径和高流量页面。 4. 建立公共组件和最佳实践，减少重复投入。

















