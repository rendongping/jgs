# 浏览器学习文档

> 目标：理解浏览器如何把 HTML/CSS/JS 变成屏幕上的页面，以及背后的性能与交互机制。

---

## 核心要点（TL;DR）

- 现代浏览器是多进程系统，渲染进程负责将 HTML/CSS/JS 转换为页面，理解其协作方式是性能优化的起点。
- 渲染流程：解析 HTML/CSS 构建 DOM/CSSOM → 计算样式 → 布局 → 分层 → 绘制 → 合成，修改几何属性触发重排代价最高。
- 性能排序为 合成 > 重绘 > 重排，动画优先使用 `transform`/`opacity`，避免布局抖动与频繁读取重排属性。
- 脚本阻塞解析可通过 `defer`/`async`/ES Module 缓解，CSS 放头部以尽快构建完整 CSSOM。
- 合理利用 HTTP 缓存、本地存储与事件委托，是提升页面加载速度与交互体验的重要手段。

## 学习时长与前置知识

- **建议学习时长**：3-4 周（每周投入 6-8 小时）
- **前置知识**：JavaScript、HTML/CSS 基础

## 一、浏览器架构：一个多进程的“小团队”

现代浏览器（以 Chromium 为例）不是单进程应用，而是一个多进程协作系统。可以把浏览器比作一家公司：

- **浏览器进程（Browser Process）**：总经理，负责地址栏、书签、窗口管理、与操作系统交互。
- **渲染进程（Renderer Process）**：前端工程师的主战场，负责把 HTML/CSS/JS 变成页面。每个标签页通常对应一个独立的渲染进程。
- **GPU 进程**：图形专家，负责把渲染进程生成的位图合成并显示到屏幕上。
- **网络进程**：邮递员，负责发起网络请求、管理缓存。
- **插件进程**：负责运行 Flash/PDF 等插件（现代浏览器已逐渐淘汰）。

> 生活化比喻：浏览器进程像餐厅经理，渲染进程像厨房，GPU 进程像上菜员，网络进程像采购员。各司其职，才能快速出餐。

## 二、导航流程：输入 URL 到页面显示

1. **处理输入**：浏览器判断输入的是搜索关键词还是 URL。
2. **DNS 解析**：把域名解析为 IP 地址。
3. **建立连接**：TCP 三次握手，HTTPS 还需 TLS 握手。
4. **发送 HTTP 请求**：网络进程构造请求并发送。
5. **接收响应**：根据 Content-Type 决定交给谁处理。
6. **创建渲染进程**：如果是 HTML，浏览器进程会创建或复用渲染进程。
7. **提交文档**：网络进程把数据交给渲染进程。
8. **渲染页面**：渲染进程解析、布局、绘制、合成。

## 三、渲染流程：HTML/CSS/JS 如何变成页面

渲染进程内部有一个主线程，负责大部分渲染工作。核心流程：

### 3.1 解析 HTML，构建 DOM 树

浏览器从上到下解析 HTML，遇到标签就生成 DOM 节点。

```html
<html>
  <body>
    <div>Hello</div>
  </body>
</html>
```

解析过程中：
- 遇到 `<script>` 会暂停解析，下载并执行 JS（除非有 `defer` 或 `async`）。
- 遇到 CSS 会继续解析，但会请求 CSS 资源。

### 3.2 解析 CSS，构建 CSSOM 树

CSSOM（CSS Object Model）是 CSS 的结构化表示。浏览器需要完整 CSSOM 才能计算样式。

### 3.3 样式计算（Computed Style）

把 DOM 和 CSSOM 结合，计算每个节点的最终样式。包括：
- 继承：子节点继承父节点某些样式。
- 层叠：处理多个样式来源的冲突（优先级、specificity）。

### 3.4 布局（Layout / Reflow）

计算每个元素在视口中的几何信息：位置、大小。布局结果是一棵布局树。

### 3.5 分层（Layer）

根据 z-index、transform、opacity、will-change 等属性，把页面分成多个图层。分层有利于独立绘制和合成，提高性能。

### 3.6 绘制（Paint）

为每个图层生成绘制指令列表，比如“在 (10,20) 画一个红色矩形”。

### 3.7 合成（Composite）

把各个图层合并成最终图像，交给 GPU 显示到屏幕。

## 四、重排、重绘与合成

### 4.1 重排（Reflow / Layout）

当元素的几何属性（宽高、位置、边距等）改变时，浏览器需要重新计算布局。

触发重排的操作：
- 修改 width、height、padding、margin
- 读取 offsetWidth、clientHeight 等属性
- 修改字体大小
- 添加/删除 DOM 节点

### 4.2 重绘（Repaint）

当元素外观改变但不影响几何布局时，只需要重新绘制。

触发重绘的操作：
- 修改 color、background-color
- 修改 border-color
- 修改 visibility

### 4.3 合成（Composite）

只改变合成层属性（transform、opacity）时，浏览器跳过布局和绘制，直接由 GPU 合成。

**性能排序：合成 > 重绘 > 重排**

**最佳实践**：
- 尽量使用 `transform` 和 `opacity` 做动画。
- 避免频繁读取会触发重排的属性。
- 批量修改样式，或使用 CSS 类切换。
- 使用 `DocumentFragment` 或 `requestAnimationFrame` 批量操作 DOM。

## 五、JavaScript 的执行与阻塞

默认情况下，`<script>` 标签会阻塞 HTML 解析。原因：JS 可能修改 DOM 和 CSSOM，浏览器需要保证执行顺序。

### 5.1 script 的加载策略

```html
<script src="app.js"></script>        <!-- 阻塞解析，立即执行 -->
<script async src="app.js"></script>  <!-- 异步下载，下载完立即执行，不保证顺序 -->
<script defer src="app.js"></script>  <!-- 异步下载，DOM 解析完后按顺序执行 -->
<script type="module" src="app.js"></script> <!-- 默认 defer -->
```

**选择建议**：
- 普通脚本放底部，或使用 `defer`。
- 独立统计/广告脚本用 `async`。
- ES Module 默认 defer，可配合 `async` 使用。

### 5.2 渲染阻塞与 CSS

CSS 也会阻塞渲染：浏览器需要完整 CSSOM 才能生成渲染树。因此 CSS 通常放在 `<head>`，让用户尽快看到样式正确的页面。

## 六、事件机制：捕获、冒泡、委托

### 6.1 事件三阶段

1. **捕获阶段**：事件从 window 向下传播到目标元素。
2. **目标阶段**：事件到达目标元素。
3. **冒泡阶段**：事件从目标元素向上冒泡回 window。

```js
element.addEventListener("click", handler, false); // false 表示冒泡阶段监听（默认）
element.addEventListener("click", handler, true);  // true 表示捕获阶段监听
```

### 6.2 事件委托

利用冒泡机制，把子元素的事件监听器绑定到父元素上。

```js
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("点击了 li", e.target.textContent);
  }
});
```

**优点**：
- 减少内存占用，尤其动态生成的子元素无需单独绑定。
- 方便管理。

**注意事项**：
- 不冒泡的事件不能用委托（如 focus、blur、mouseenter、mouseleave）。
- 注意 `e.target` 和 `e.currentTarget` 的区别。

## 七、存储方案：cookie、localStorage、sessionStorage、IndexedDB

### 7.1 cookie

- 容量小，约 4KB。
- 每次请求都会自动携带，影响性能。
- 可设置过期时间、域名、路径、HttpOnly、Secure、SameSite。
- 主要用于身份认证、追踪。

### 7.2 localStorage

- 容量约 5-10MB。
- 持久化存储，关闭浏览器仍存在。
- 仅支持字符串，需手动 JSON 序列化。
- 同源共享。

### 7.3 sessionStorage

- 容量约 5-10MB。
- 会话级存储，关闭标签页即清除。
- 不同标签页不共享（即使同源）。

### 7.4 IndexedDB

- 容量较大（取决于浏览器和磁盘）。
- 支持结构化数据、索引、事务。
- 适合离线应用、大量数据缓存。
- API 较复杂，可封装 Dexie.js 等库。

### 7.5 对比总结

| 特性 | cookie | localStorage | sessionStorage | IndexedDB |
|------|--------|--------------|----------------|-----------|
| 容量 | ~4KB | ~5-10MB | ~5-10MB | 较大 |
| 生命周期 | 可设置 | 永久 | 会话 | 永久 |
| 服务端携带 | 是 | 否 | 否 | 否 |
| 数据类型 | 字符串 | 字符串 | 字符串 | 结构化 |
| 复杂度 | 低 | 低 | 低 | 高 |

## 八、缓存策略：让页面更快

### 8.1 强缓存

浏览器直接从本地缓存读取，不发请求。

控制头：
- `Cache-Control: max-age=31536000`（HTTP/1.1）
- `Expires: Wed, 21 Oct 2026 07:28:00 GMT`（HTTP/1.0）

### 8.2 协商缓存

缓存过期后，浏览器向服务器确认资源是否变化。

控制头：
- `Last-Modified` / `If-Modified-Since`
- `ETag` / `If-None-Match`（更精确）

### 8.3 缓存策略建议

- HTML：使用协商缓存或短缓存，保证更新及时。
- JS/CSS/图片：强缓存 + 文件名 hash，更新时 URL 变化，强制重新加载。
- API 数据：根据业务设置合适的 `Cache-Control`。

## 九、渲染性能优化

### 9.1 减少重排重绘

- 使用 `transform` 和 `opacity` 做动画。
- 避免用 JS 频繁修改会触发重排的样式。
- 使用 `requestAnimationFrame` 把动画与浏览器刷新同步。

### 9.2 避免布局抖动（Layout Thrashing）

不要交替读写会触发重排的属性：

```js
// 不好
for (let i = 0; i < 100; i++) {
  const h = element.offsetHeight; // 读
  element.style.height = h + 1 + "px"; // 写
}

// 好：先批量读，再批量写
const h = element.offsetHeight;
requestAnimationFrame(() => {
  element.style.height = h + 100 + "px";
});
```

### 9.3 虚拟滚动

长列表只渲染可视区域的内容，减少 DOM 节点数量。

### 9.4 图片优化

- 使用适当格式（WebP、AVIF）。
- 懒加载 `loading="lazy"`。
- 响应式图片 `srcset`。

### 9.5 代码分割与懒加载

- Webpack/Vite 的代码分割。
- 路由懒加载。
- 组件/库按需加载。

## 十、Web Vitals 与 INP：用户体验的“体检报告”

### 10.1 什么是 Web Vitals？

Web Vitals 是 Google 提出的一组核心性能指标，用于衡量真实用户的网页体验。最核心的是 LCP、INP、CLS：

| 指标 | 含义 | 目标值 |
|------|------|--------|
| **LCP**（Largest Contentful Paint） | 最大内容绘制时间 | ≤ 2.5s |
| **INP**（Interaction to Next Paint） | 交互到下一次绘制的时间 | ≤ 200ms |
| **CLS**（Cumulative Layout Shift） | 累积布局偏移 | ≤ 0.1 |

### 10.2 为什么 INP 取代了 FID？

FID（First Input Delay）只测量用户首次交互的延迟，而 INP 测量整个页面生命周期内所有（或大部分）交互的延迟，更能反映真实体验。

生活化比喻：FID 像餐厅只记录你第一次叫服务员的等待时间；INP 则记录你每次叫服务员到服务员回应的平均时间，显然更全面。

### 10.3 Web Vitals 测量代码示例

```js
// 测量 LCP
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log("LCP:", lastEntry.startTime);
}).observe({ type: "largest-contentful-paint", buffered: true });

// 测量 CLS
let clsValue = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  console.log("CLS:", clsValue);
}).observe({ type: "layout-shift", buffered: true });

// 测量 INP（需要 polyfill 或 Chrome 108+）
import { onINP } from "web-vitals";
onINP((metric) => {
  console.log("INP:", metric.value);
});
```

### 10.4 INP 优化方向

- 减少主线程长任务，把耗时计算拆分到 Web Worker。
- 对非紧急更新使用 `requestIdleCallback` 或 React 的 `startTransition`。
- 优化事件处理函数，避免同步执行大量 DOM 操作。
- 对复杂 UI 反馈使用骨架屏或即时视觉响应。

---

## 十一、Storage Buckets：给本地存储分“房间”

### 11.1 什么是 Storage Buckets？

Storage Buckets（存储桶）是 Storage Standard 提出的新 API，允许开发者把本地存储划分为多个逻辑桶，每个桶可以独立设置持久化策略、配额和清理优先级。

生活化比喻：以前 localStorage、IndexedDB、Cache API 都像堆在一个大仓库里；Storage Buckets 像给仓库隔出不同房间，重要物资放“保险库”，临时缓存放“普通货架”。

### 11.2 基本用法

```js
// 创建一个名为 "critical" 的持久化存储桶
const bucket = await navigator.storageBuckets.open("critical", {
  durability: "strict", // strict 或 relaxed
  persisted: true       // 是否持久化，避免被浏览器清理
});

// 在该桶内创建 IndexedDB
const db = await bucket.indexedDB.open("my-db", 1);

// 在该桶内创建 Cache
const cache = await bucket.caches.open("my-cache");
```

### 11.3 为什么需要 Storage Buckets？

- **隔离策略**：不同业务数据可以设置不同的持久化级别。
- **配额管理**：浏览器可能按桶分配存储配额。
- **清理控制**：关键数据桶可以标记为持久化，减少被自动清理的风险。
- **权限粒度**：未来可能支持按桶设置权限。

### 11.4 兼容性说明

Storage Buckets 目前处于实验阶段，主要在 Chromium 浏览器中实现。生产环境使用前应做好兼容性检测和降级方案。

---

## 十二、Passkeys：无密码登录的未来

### 12.1 什么是 Passkeys？

Passkeys 是一种基于公钥密码学的无密码认证技术，由 FIDO2 / WebAuthn 标准支撑。用户可以使用设备自带的生物识别（指纹、面容）或 PIN 码登录，而无需记住密码。

生活化比喻：传统密码像一把金属钥匙，容易丢、容易被复制；Passkeys 像指纹锁，你的设备就是锁，你的生物特征就是钥匙，服务器只保存“这把锁能识别你”的公钥。

### 12.2 Passkeys 的优势

| 传统密码 | Passkeys |
|---------|---------|
| 需要记忆复杂密码 | 使用生物识别或 PIN |
| 容易被钓鱼 | 绑定域名，无法跨站使用 |
| 数据泄露风险高 | 私钥仅存于用户设备 |
| 需要二次验证 | 天然抵抗重放攻击 |

### 12.3 前端注册与登录流程

```js
// 注册 Passkey
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: Uint8Array.from("random-challenge", c => c.charCodeAt(0)),
    rp: { name: "Example App", id: "example.com" },
    user: {
      id: Uint8Array.from("user-id", c => c.charCodeAt(0)),
      name: "user@example.com",
      displayName: "Tom"
    },
    pubKeyCredParams: [{ alg: -7, type: "public-key" }], // ES256
    authenticatorSelection: { residentKey: "required", userVerification: "preferred" },
    attestation: "direct"
  }
});

// 将 credential.id 和公钥发送给服务器保存

// 登录时使用 Passkey
const assertion = await navigator.credentials.get({
  publicKey: {
    challenge: Uint8Array.from("login-challenge", c => c.charCodeAt(0)),
    allowCredentials: [{
      id: credentialIdFromServer,
      type: "public-key",
      transports: ["internal", "hybrid"]
    }],
    userVerification: "preferred"
  }
});

// 将 assertion 发送给服务器验证
```

### 12.4 注意事项

- Passkeys 需要 HTTPS 环境。
- 不同平台（iOS、Android、Windows）的 Passkey 同步机制不同。
- 应同时保留传统登录方式作为降级方案。
- 服务器端需要存储 credential ID 和公钥，并实现挑战-响应验证。

---

## 十三、渲染 NG 架构简介

### 13.1 什么是 RenderingNG？

RenderingNG 是 Chromium 历时多年推进的渲染架构升级，目标是把渲染流程彻底模块化、并行化、可预测化。它不是一个单一功能，而是一系列重构的集合，包括：

- **Viz**：统一的合成服务，负责把渲染进程生成的帧合成到屏幕。
- **SkiaRenderer / GPU 服务**：跨平台、跨进程的图形渲染。
- **LayoutNG**：全新的布局引擎，解决旧布局引擎的复杂性和不一致性。
- **CompositeAfterPaint**：更合理的分层与绘制策略。
- **BlinkNG**：渲染主线程内的模块化改造。

### 13.2 为什么需要 RenderingNG？

旧渲染架构经过多年补丁式迭代，存在以下问题：

- 布局、绘制、合成职责模糊，代码耦合严重。
- 跨平台实现差异大，渲染结果不一致。
- 难以支持新的硬件能力和性能优化。
- 复杂场景下（如嵌套滚动、变换动画）容易出现 bug。

RenderingNG 通过清晰的阶段划分和进程间通信，让浏览器渲染更像一条现代化流水线。

### 13.3 对前端开发者的意义

- 更稳定的渲染行为，减少跨浏览器差异。
- 更流畅的动画和滚动体验。
- 更强的硬件加速能力。
- 为新 CSS 特性（如 container queries、color-mix）和 API（如 View Transitions）提供坚实基础。

### 13.4 渲染架构演进对比

| 阶段 | 特点 |
|------|------|
| 早期单线程渲染 | 所有工作在主线程串行执行 |
| 多进程 + GPU 加速 | 渲染、合成、GPU 分离 |
| RenderingNG | 模块化、可预测、跨平台一致的现代化架构 |

---

## 十四、常见误区

1. **认为 DOM 操作一定慢**：DOM 操作本身不慢，慢的是触发布局和绘制。
2. **滥用 will-change**：会消耗额外内存，只在需要时临时使用。
3. **忽视回流属性的读取**：`offsetWidth` 等属性会强制同步布局。
4. **把所有脚本放头部**：会阻塞渲染，应合理 defer/async。
5. **localStorage 存敏感数据**：没有加密，且同源任意脚本可读取。
6. **只关注首次加载指标**：INP、CLS 等全生命周期指标同样重要。
7. **Passkeys 可以完全替代所有认证**：当前仍需考虑兼容性和降级方案。

## 总结

浏览器是前端工程师最重要的运行环境。理解其架构、渲染流程、事件机制、存储方案和缓存策略，能帮助你写出更快、更稳定、更安全的页面。随着 Web Vitals、Storage Buckets、Passkeys 和 RenderingNG 等新标准和架构的发展，前端性能与安全的边界也在不断扩展。性能优化的核心思路是：**减少不必要的计算、减少网络请求、减少重排重绘、合理利用硬件加速**。

---

**延伸阅读**：
- 《How Browsers Work》（HTML5 Rocks）
- Chrome Developers 官方博客
- Web Vitals 文档（web.dev/vitals）
- FIDO Alliance / WebAuthn 规范

---

> **领域编号**：F03 浏览器原理  
> **最后更新**：2026-06-24


---

## 本领域学习进度

<MarkComplete domainId="browser" />
<ProgressTracker />
