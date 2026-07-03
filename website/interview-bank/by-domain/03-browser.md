# Browser 面试题

> 本文件收录 Browser（浏览器原理）相关面试题，目标题量 50 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、性能优化题、安全题、系统设计题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#基础题)
- [进阶题](#进阶题)
- [深入题](#深入题)
- [架构题](#架构题)

---

## 基础题

### FB-03-CO-B-001：从输入 URL 到页面首次渲染，浏览器经历了哪些主要阶段？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：03 Browser
**标签**：URL、DNS、TCP、HTTP、渲染流水线
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说出从用户在地址栏输入 URL 到页面首次显示出内容，浏览器大致会经历哪些阶段。

**参考答案**：

主要阶段如下：

1. **URL 解析与导航**：浏览器解析协议、域名、路径，检查 HSTS、缓存等。
2. **DNS 解析**：将域名解析为 IP 地址，可能有 DNS 缓存、递归查询。
3. **建立连接**：TCP 三次握手，HTTPS 还需 TLS/SSL 握手。
4. **发送 HTTP 请求**：构建请求行、请求头，发送给服务器。
5. **服务器响应**：接收响应头和响应体，根据状态码处理。
6. **下载关键资源**：HTML 解析器开始接收并解析 HTML。
7. **构建 DOM 树**：将 HTML 标记转换为 DOM 节点。
8. **构建 CSSOM 树**：解析 CSS 文件和样式标签，生成 CSSOM。
9. **合成渲染树（Render Tree）**：结合 DOM 与 CSSOM，计算可见节点及样式。
10. **布局（Layout/Reflow）**：计算各元素的几何位置与大小。
11. **绘制（Paint）**：生成绘制记录，填充像素。
12. **合成（Composite）**：将图层合并为最终帧并显示到屏幕。

**评分维度**：
- 阶段完整性（40%）：是否覆盖网络、解析、渲染三大阶段
- 阶段作用解释（40%）：能否简明说明每个阶段的核心任务
- 提到关键渲染路径（20%）：是否意识到首屏性能由关键资源决定

**常见错误**：
- 漏掉 DNS 解析或 TLS 握手
- 将“绘制”与“合成”混为一谈
- 只讲渲染而忽略网络层

**延伸追问**：
- CSS 和 JavaScript 分别在哪些阶段会阻塞渲染？
- 哪些资源属于关键渲染路径资源？

**参考资源**：
- [MDN - 渲染网页：浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)

---

### FB-03-CO-B-002：DOM 树和 CSSOM 树分别是什么？浏览器如何构建它们？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：03 Browser
**标签**：DOM、CSSOM、解析、渲染树
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 DOM 树和 CSSOM 树的含义，并说明浏览器如何从无到有构建它们。

**参考答案**：

- **DOM 树（Document Object Model）**：将 HTML 文档解析成树形节点结构，每个标签、文本、注释都对应一个节点。浏览器通过 HTML 解析器的词法分析、语法分析，将字节流转换为 Token，再构建节点并挂载到树中。
- **CSSOM 树（CSS Object Model）**：将 CSS 规则解析成树形结构，包含选择器、属性、值及继承关系。CSSOM 与 DOM 是独立的，因为样式可以来自外部 CSS、`<style>` 标签或内联样式。

构建过程：

1. 下载 HTML 后，解析器边接收边解析，遇到普通标签就创建 DOM 节点。
2. 遇到 `<link rel="stylesheet">` 会请求 CSS，CSS 下载完成后解析为 CSSOM。
3. 遇到 `<script>` 默认会阻塞 HTML 解析，等待脚本下载并执行完成后再继续。
4. DOM 与 CSSOM 合并后形成渲染树，用于后续布局与绘制。

```html
<!-- DOM + CSSOM 示例 -->
<div class="box">Hello</div>
<style>.box { color: red; }</style>
```

**评分维度**：
- DOM/CSSOM 定义准确性（40%）
- 构建流程描述（40%）
- 阻塞关系说明（20%）

**常见错误**：
- 将 DOM 与渲染树混为一谈
- 认为 CSSOM 包含在 DOM 内部
- 不知道 CSS 也会阻塞渲染

**延伸追问**：
- `<script>` 为什么要放在 `</body>` 前，或者使用 `defer`/`async`？
- 浏览器遇到错误 HTML 时会如何处理？

**参考资源**：
- [MDN - DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)

---

### FB-03-CO-B-003：什么是重排（Reflow）、重绘（Repaint）和合成（Composite）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：03 Browser
**标签**：重排、重绘、合成、渲染流水线
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释浏览器渲染过程中的重排、重绘和合成三个阶段，并说明它们之间的关系。

**参考答案**：

- **重排（Reflow/Layout）**：当元素的几何信息（尺寸、位置）发生变化时，浏览器需要重新计算布局。重排成本最高，可能触发整棵渲染树的重新计算。
- **重绘（Repaint）**：当元素的视觉属性（颜色、背景、边框样式）改变但不影响几何布局时，浏览器会重新绘制可见像素。重绘通常比重排轻量，但仍需 CPU 参与。
- **合成（Composite）**：浏览器将已经绘制好的图层（Layer）按顺序叠加生成最终帧，交给 GPU 显示。合成可在不经过布局和绘制的情况下完成动画，性能最好。

关系：

- 重排一定会导致重绘（因为几何变了，像素需要重画）。
- 重绘不一定会触发重排。
- 仅触发合成的改动（如 `transform`、`opacity`）能跳过布局与绘制阶段。

**评分维度**：
- 三者定义与区别（60%）
- 触发示例（20%）
- 性能差异（20%）

**常见错误**：
- 认为重绘一定会导致重排
- 忽略合成的存在
- 把“合成”等同于“绘制”

**延伸追问**：
- 修改 `width` 和修改 `color` 分别会触发什么？
- `display: none` 与 `visibility: hidden` 在重排重绘上有何不同？

**参考资源**：
- [Google Web Fundamentals - Render-tree Construction, Layout, and Paint](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)

---

### FB-03-CO-B-004：CSS 哪些属性的修改会触发重排、重绘或仅触发合成？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：03 Browser
**标签**：CSS 属性、重排、重绘、合成、性能
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请举例说明哪些 CSS 属性会触发重排、重绘或合成，并解释原因。

**参考答案**：

| 触发阶段 | 典型属性 | 原因 |
|----------|----------|------|
| 重排 | `width`、`height`、`margin`、`padding`、`top`、`left`、`font-size`、`border-width` | 改变元素几何尺寸或位置，需要重新布局 |
| 重绘 | `color`、`background-color`、`border-color`、`box-shadow`、`outline` | 只改变视觉外观，不影响布局 |
| 合成 | `transform`、`opacity`、`filter`（在已提升为合成层时） | 浏览器可直接在 GPU 中对图层做矩阵变换或透明度调整 |

注意：

- `transform` 和 `opacity` 触发合成的前提是元素已经被提升为独立图层，或浏览器决定为其创建图层。
- 可通过 `will-change: transform` 提前提示浏览器创建合成层，但滥用会消耗显存。

**评分维度**：
- 能正确分类常见属性（60%）
- 解释触发原因（30%）
- 提到 `will-change` 的合理使用（10%）

**常见错误**：
- 认为 `transform` 会触发重排
- 认为 `opacity` 会触发重绘
- 滥用 `will-change` 导致层爆炸

**延伸追问**：
- 为什么 `left`/`top` 动画通常比 `transform` 动画更耗性能？
- 如何判断一个属性实际触发了哪些阶段？

**参考资源**：
- [CSS Triggers](https://csstriggers.com/)

---

### FB-03-CO-B-005：事件传播的三个阶段是什么？它们的执行顺序如何？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：03 Browser
**标签**：事件传播、捕获、冒泡、目标阶段
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 DOM 事件传播的三个阶段及其执行顺序。

**参考答案**：

DOM 事件传播分为三个阶段：

1. **捕获阶段（Capture Phase）**：事件从 `window` 向下传递到目标元素的父元素，直到目标元素的父级。
2. **目标阶段（Target Phase）**：事件到达实际触发事件的元素。
3. **冒泡阶段（Bubble Phase）**：事件从目标元素向上冒泡，依次经过父元素，直到 `window`。

执行顺序：**捕获 → 目标 → 冒泡**。

默认情况下，`addEventListener` 在冒泡阶段监听事件；传入第三个参数 `true` 或使用 `{ capture: true }` 可在捕获阶段监听。

```js
element.addEventListener('click', handler, true); // 捕获阶段
```

**评分维度**：
- 说出三阶段名称（50%）
- 正确描述顺序（30%）
- 知道如何控制监听阶段（20%）

**常见错误**：
- 认为捕获和冒泡只能二选一
- 将目标阶段误归为冒泡阶段
- 忘记 `addEventListener` 默认是冒泡

**延伸追问**：
- `stopPropagation()` 和 `stopImmediatePropagation()` 有什么区别？
- `event.target` 和 `event.currentTarget` 分别指向什么？

**参考资源**：
- [MDN - Event dispatch and DOM event flow](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/eventPhase)

---

### FB-03-CO-B-006：什么是事件委托？它适合哪些场景？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：03 Browser
**标签**：事件委托、事件冒泡、性能优化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释事件委托的原理、优点，并说明它适合与不适合的场景。

**参考答案**：

事件委托（Event Delegation）利用事件冒泡机制，将子元素的事件监听器绑定到共同的祖先元素上，通过 `event.target` 判断实际触发事件的子元素。

优点：

1. **减少内存占用**：不需要为大量子元素分别绑定监听器。
2. **支持动态元素**：后来新增的子元素也能响应事件，无需重新绑定。
3. **代码更简洁**：统一处理逻辑，便于维护。

适合场景：

- 长列表、表格中的行/单元格点击
- 动态生成的菜单或标签页

不适合场景：

- 不冒泡的事件，如 `focus`、`blur`、`mouseenter`、`mouseleave`（除非使用捕获阶段）
- 需要精确控制事件目标且目标层级极深的场景

```js
document.getElementById('list').addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
  }
});
```

**评分维度**：
- 原理说明（40%）
- 优点列举（30%）
- 适用与不适用场景（30%）

**常见错误**：
- 与事件捕获混淆
- 不知道 `event.target` 和 `event.currentTarget` 的区别
- 对所有事件都使用委托

**延伸追问**：
- 如果列表项内部有子元素，`event.target` 可能不是 `LI`，如何解决？
- 事件委托如何获取列表项的索引？

**参考资源**：
- [MDN - Event Delegation](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)

---

### FB-03-CO-B-007：浏览器事件循环中的宏任务和微任务有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：03 Browser
**标签**：事件循环、宏任务、微任务、Promise
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释浏览器事件循环中宏任务与微任务的区别，并各举几个例子。

**参考答案**：

**宏任务（Macrotask）**：由浏览器在事件循环的每个循环中取出并执行一个的任务。常见来源：

- `setTimeout` / `setInterval`
- I/O 操作、UI 渲染事件
- `postMessage`、`MessageChannel`
- 用户交互事件（点击、键盘等）

**微任务（Microtask）**：在当前宏任务执行结束后、浏览器渲染之前立即清空执行的任务。常见来源：

- `Promise.then` / `catch` / `finally`
- `queueMicrotask`
- `MutationObserver`

执行顺序：

1. 执行一个宏任务。
2. 执行所有微任务，直到微任务队列为空。
3. 必要时进行渲染（样式计算、布局、绘制、合成）。
4. 进入下一轮循环。

因此微任务总是比后续宏任务先执行。

**评分维度**：
- 宏任务/微任务概念区分（50%）
- 能举例说明（30%）
- 理解执行顺序（20%）

**常见错误**：
- 认为 `setTimeout` 是微任务
- 认为微任务在渲染之后执行
- 忽略 `queueMicrotask` 的存在

**延伸追问**：
- `setTimeout(..., 0)` 和 `Promise.resolve().then(...)` 哪个先执行？
- `MutationObserver` 是什么场景下的微任务？

**参考资源**：
- [MDN - Event Loop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

---

### FB-03-CO-B-008：Cookie、localStorage、sessionStorage 有何区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：03 Browser
**标签**：Cookie、localStorage、sessionStorage、浏览器存储
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 Cookie、localStorage 和 sessionStorage 的区别，包括容量、生命周期、作用域和使用场景。

**参考答案**：

| 特性 | Cookie | localStorage | sessionStorage |
|------|--------|--------------|----------------|
| 容量 | 约 4KB | 约 5-10MB | 约 5-10MB |
| 生命周期 | 可设置过期时间，默认会话级 | 持久化，除非手动清除 | 当前标签页会话级，关闭即清除 |
| 作用域 | 按域名+路径，可跨子域配置 | 同源策略限制 | 同源策略限制，且仅当前标签页 |
| 与服务端通信 | 每次请求自动携带 | 不自动发送 | 不自动发送 |
| 访问方式 | `document.cookie` | `localStorage` API | `sessionStorage` API |

安全相关：

- Cookie 可设置 `HttpOnly`（禁止 JS 读取）、`Secure`（仅 HTTPS）、`SameSite`（控制跨站携带）。
- localStorage/sessionStorage 中的数据可被同源的 JS 读取，不适合存放敏感信息。

**评分维度**：
- 区分容量与生命周期（40%）
- 作用域与通信方式（30%）
- 安全属性说明（30%）

**常见错误**：
- 认为 sessionStorage 关闭浏览器后仍保留
- 认为 localStorage 可以跨域共享
- 认为 Cookie 容量与 localStorage 相同

**延伸追问**：
- 什么情况下应该选择 Cookie 而不是 localStorage？
- IndexedDB 适合什么场景？

**参考资源**：
- [MDN - Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)

---

### FB-03-CO-B-009：什么是同源策略（Same-Origin Policy）？它限制了什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：03 Browser
**标签**：同源策略、安全、跨域、Origin
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释浏览器的同源策略，并说明它限制了哪些行为。

**参考答案**：

同源策略是浏览器的一项安全机制，它要求两个 URL 的**协议、主机名和端口**都相同，才视为同源。

限制行为：

- 不同源的页面不能通过 JS 读取对方的 DOM（如 `iframe.contentDocument`）。
- 不同源不能共享 Cookie、localStorage、IndexedDB 等存储。
- 默认情况下，前端 JS 不能读取跨域 HTTP 响应的内容。

例外：

- `<img>`、`<script>`、`<link>` 等标签可以加载跨域资源，但 JS 读取其内容可能受限（如 Canvas 跨域图片）。
- CORS 机制允许服务器显式声明哪些源可以访问资源。

**评分维度**：
- 同源定义（40%）
- 限制内容（40%）
- 知道 CORS 等例外机制（20%）

**常见错误**：
- 认为不同子域默认同源
- 认为同源策略会阻止所有跨域请求的发送
- 将“发送请求”与“读取响应”混为一谈

**延伸追问**：
- 如何允许 `a.example.com` 与 `b.example.com` 共享 Cookie？
- CORS 和同源策略是什么关系？

**参考资源**：
- [MDN - Same-origin policy](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

---

### FB-03-CO-B-010：简述 CORS 的工作原理，什么是简单请求和预检请求？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：03 Browser
**标签**：CORS、跨域、预检请求、简单请求
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 CORS 是如何让浏览器实现安全跨域访问的，并解释简单请求与预检请求的区别。

**参考答案**：

CORS（Cross-Origin Resource Sharing，跨域资源共享）通过服务器返回的响应头告知浏览器是否允许跨域访问。

关键响应头：

- `Access-Control-Allow-Origin`：允许的源，如 `https://example.com` 或 `*`。
- `Access-Control-Allow-Methods`：允许的 HTTP 方法。
- `Access-Control-Allow-Headers`：允许的自定义请求头。
- `Access-Control-Allow-Credentials`：是否允许携带 Cookie。

**简单请求**：满足以下条件时，浏览器直接发送请求：

- 方法为 `GET`、`HEAD` 或 `POST`
- 请求头为安全头部（如 `Accept`、`Content-Type` 限于 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`）
- 无自定义头部

**预检请求（Preflight）**：不满足简单请求条件时，浏览器会先发送 `OPTIONS` 请求询问服务器是否允许。只有服务器返回允许后，浏览器才会发送实际请求。

**评分维度**：
- CORS 基本机制（30%）
- 简单请求与预检请求区别（50%）
- 关键响应头（20%）

**常见错误**：
- 认为 CORS 是前端配置
- 认为所有跨域请求都会发送预检
- 认为 `*` 可以与 `Access-Control-Allow-Credentials: true` 同时使用

**延伸追问**：
- 如何携带 Cookie 进行跨域请求？
- 预检请求可以缓存吗？如何配置？

**参考资源**：
- [MDN - CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

---

### FB-03-CO-B-011：XSS 和 CSRF 是什么？浏览器端分别如何防御？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：03 Browser
**标签**：XSS、CSRF、安全、防御
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 XSS 和 CSRF 攻击的原理，并说明浏览器端可以采取哪些防御措施。

**参考答案**：

**XSS（跨站脚本攻击）**：攻击者向页面注入恶意脚本，浏览器执行后窃取 Cookie、伪造请求或篡改页面。

防御：

- 对用户输入进行转义后再输出到 HTML/JS/CSS 中。
- 设置 `Content-Security-Policy`（CSP）限制脚本来源。
- 对 Cookie 设置 `HttpOnly`，防止 JS 读取敏感 Cookie。
- 使用框架内置的转义机制（如 React 的 `dangerouslySetInnerHTML` 需谨慎）。

**CSRF（跨站请求伪造）**：攻击者诱导已登录用户在第三方站点发起对目标站的请求，利用浏览器自动携带 Cookie 的特性完成非法操作。

防御：

- 设置 `SameSite` Cookie 属性（Strict/Lax）。
- 服务端校验 CSRF Token 或双重 Cookie。
- 校验请求来源头 `Origin` / `Referer`。
- 对敏感操作使用二次确认或验证码。

**评分维度**：
- XSS/CSRF 概念区分（40%）
- 防御措施列举（40%）
- 能举例说明（20%）

**常见错误**：
- 将 XSS 与 CSRF 混淆
- 认为 CORS 能防御 CSRF
- 只列防御手段但说不清原理

**延伸追问**：
- DOM 型 XSS 与反射型 XSS 有什么区别？
- `SameSite=None` 使用时必须配合什么属性？

**参考资源**：
- [OWASP - XSS](https://owasp.org/www-community/attacks/xss/)

---

### FB-03-CO-B-012：Web Worker 是什么？它适合做什么、不适合做什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：03 Browser
**标签**：Web Worker、多线程、主线程、性能
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Web Worker 的作用，并说明它在前端适合与不适合处理的任务。

**参考答案**：

Web Worker 允许 JavaScript 在浏览器后台线程中运行，不阻塞主线程（UI 线程）。Worker 通过 `postMessage` 和 `onmessage` 与主线程通信，数据传递默认采用结构化克隆。

适合场景：

- 复杂计算（大数据排序、图像处理、压缩/解压）
- 长耗时解析（JSON、Protobuf 解码）
- 轮询、日志处理等非 UI 任务

不适合场景：

- 直接操作 DOM（Worker 中无法访问 `window`、`document`）
- 需要频繁与主线程同步通信的场景（消息传递有开销）
- 简单的同步任务（创建 Worker 本身也有成本）

```js
const worker = new Worker('worker.js');
worker.postMessage({ n: 40 });
worker.onmessage = e => console.log(e.data);
```

**评分维度**：
- Worker 基本作用（30%）
- 限制说明（40%）
- 通信方式与适用场景（30%）

**常见错误**：
- 认为 Worker 可以操作 DOM
- 认为 Worker 与主线程共享变量
- 忽略消息传递的开销

**延伸追问**：
- SharedWorker 和 Dedicated Worker 有什么区别？
- Worker 中如何使用 ES Module？

**参考资源**：
- [MDN - Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)

---

### FB-03-CO-B-013：requestAnimationFrame 和 setTimeout 做动画有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：03 Browser
**标签**：requestAnimationFrame、setTimeout、动画、60fps
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较使用 `requestAnimationFrame` 和 `setTimeout` 实现动画的差异。

**参考答案**：

| 特性 | requestAnimationFrame | setTimeout |
|------|-----------------------|------------|
| 刷新同步 | 与显示器刷新率同步（通常 60Hz） | 由定时器触发，可能与刷新不同步 |
| 节能 | 页面不可见时自动暂停 | 后台仍可能运行 |
| 回调参数 | 提供高精度时间戳 | 不提供 |
| 性能 | 浏览器可在同一帧内批量处理样式与绘制 | 容易出现掉帧或布局抖动 |
| 取消方式 | `cancelAnimationFrame` | `clearTimeout` |

最佳实践：

- 视觉动画优先使用 `requestAnimationFrame`。
- 避免在 `setTimeout` 中频繁读取和写入 DOM，以免造成布局抖动。

**评分维度**：
- 刷新同步机制（40%）
- 节能与性能差异（40%）
- 使用建议（20%）

**常见错误**：
- 认为 `requestAnimationFrame` 一定比 `setTimeout` 慢
- 忽略后台标签页的暂停行为
- 在 `requestAnimationFrame` 中执行大量同步计算

**延伸追问**：
- `requestAnimationFrame` 回调在事件循环的哪个阶段执行？
- 为什么 `setTimeout(fn, 16)` 可能仍然不流畅？

**参考资源**：
- [MDN - requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

---

### FB-03-CO-B-014：浏览器主要有哪些进程？各自职责是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：03 Browser
**标签**：浏览器架构、进程、渲染进程、GPU 进程
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说出现代浏览器（如 Chrome）中主要有哪些进程，以及它们各自的职责。

**参考答案**：

现代浏览器采用多进程架构，主要进程包括：

1. **Browser 进程**：浏览器主进程，负责地址栏、书签、标签页管理、网络请求协调、本地存储等。
2. **Renderer 进程**：每个标签页或站点通常运行在独立的渲染进程中，负责解析 HTML/CSS、执行 JS、布局、绘制。
3. **GPU 进程**：负责处理 GPU 相关的绘制任务，如图层合成、3D 变换、视频解码。
4. **Network Service 进程**：负责网络请求（现代 Chromium 中独立出来）。
5. **Plugin 进程 / Utility 进程**：负责插件、PDF 渲染、音频等辅助任务。

多进程优势：

- 一个标签页崩溃不会影响其他标签页。
- 提供站点隔离（Site Isolation），降低安全沙箱被突破后的影响范围。

**评分维度**：
- 主要进程列举（40%）
- 职责说明（40%）
- 多进程优势（20%）

**常见错误**：
- 认为所有渲染都在 Browser 进程完成
- 认为一个标签页一定只有一个进程
- 忽略 GPU 进程的作用

**延伸追问**：
- 站点隔离（Site Isolation）解决了什么问题？
- 多进程架构有什么缺点？

**参考资源**：
- [Chromium 多进程架构](https://www.chromium.org/developers/design-documents/multi-process-architecture/)

---

## 进阶题

### FB-03-PE-A-001：如何识别并避免布局抖动（Layout Thrashing）？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：布局抖动、重排、批量读写、性能
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是布局抖动？在编写 DOM 操作代码时如何避免它？

**参考答案**：

布局抖动（Layout Thrashing）是指反复交替读取布局属性（如 `offsetWidth`）和写入样式（如 `width`），导致浏览器不断强制同步计算布局，造成性能开销。

示例（糟糕）：

```js
for (let i = 0; i < 100; i++) {
  const h = el.offsetHeight; // 读取（强制同步布局）
  el.style.height = h + 10 + 'px'; // 写入
}
```

优化方式：

1. **批量读取，批量写入**：先读取所有需要的布局值，再统一修改样式。
2. **使用 `requestAnimationFrame`**：把写操作集中在下一帧执行。
3. **使用工具库**：如 FastDOM，自动帮你分离读写。
4. **避免在循环中读取布局属性**。

```js
const h = el.offsetHeight; // 先读
for (let i = 0; i < 100; i++) {
  items[i].style.height = h + 10 + 'px'; // 后写
}
```

**评分维度**：
- 布局抖动原因说明（40%）
- 读写分离示例（30%）
- 优化方案完整性（30%）

**常见错误**：
- 只谈“减少重排”，不提读写交错
- 在 rAF 中仍然读写交替
- 认为所有重排都不可接受

**延伸追问**：
- 哪些属性读取会触发强制同步布局？
- 如何用 Chrome DevTools 定位布局抖动？

**参考资源**：
- [Google Web Fundamentals - Avoid Large, Complex Layouts and Layout Thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)

---

### FB-03-PE-A-002：什么是关键渲染路径（CRP）？如何优化首屏加载？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：关键渲染路径、首屏、FCP、LCP、性能优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释关键渲染路径，并给出优化首屏加载的常用手段。

**参考答案**：

关键渲染路径（Critical Rendering Path）是浏览器将 HTML、CSS、JS 转换为屏幕上像素所必须经过的最小资源与步骤序列。路径越短、资源越少，首屏渲染越快。

优化方向：

1. **减少关键资源数量**：
   - 将非关键 JS 标记为 `async` 或 `defer`。
   - 延迟加载非首屏 CSS（如通过 `media` 查询或 `rel="preload"` + `onload`）。
2. **减少关键资源体积**：
   - 压缩、Tree Shaking、代码分割。
   - 内联关键 CSS（权衡缓存）。
3. **缩短关键路径长度**：
   - 尽早返回首字节（TTFB）。
   - 使用 HTTP/2、CDN、预连接（`preconnect`）。
4. **优化字体加载**：
   - `font-display: swap` 避免 invisible text。
5. **预加载关键资源**：
   - `<link rel="preload" as="script/style/image">`。

**评分维度**：
- CRP 概念理解（30%）
- 识别关键资源能力（30%）
- 优化手段完整性（40%）

**常见错误**：
- 认为所有 CSS 都必须阻塞渲染
- 过度内联 CSS 导致缓存失效
- 忽略 TTFB 和服务器端优化

**延伸追问**：
- 如何衡量首屏性能？FCP 和 LCP 有什么区别？
- `preload` 和 `prefetch` 有什么区别？

**参考资源**：
- [Google Web Fundamentals - Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path)

---

### FB-03-CO-A-001：浏览器的合成层（Compositing Layer）是什么？如何触发？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：合成层、Compositing、will-change、GPU
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释浏览器渲染中的合成层概念，并说明哪些情况会触发元素被提升为独立合成层。

**参考答案**：

合成层是浏览器渲染管线中的一个独立图层，拥有自己的位图（bitmap），可以单独绘制并交给 GPU 进行合成。多个合成层最终叠加成完整画面。

常见触发条件：

- 3D 变换：`translate3d`、`scale3d`、`rotate3d`、`perspective`
- `opacity` 动画或过渡
- `will-change: transform / opacity`
- `video`、`canvas`、`iframe` 等媒体元素
- `position: fixed` 或 `position: sticky`
- `filter`、`mask` 等效果
- 层叠上下文导致与其他合成层重叠（overlap）

注意事项：

- 合成层能提升动画性能，但每个图层都占用显存。
- 滥用 `will-change` 会导致“层爆炸”，反而降低性能。

**评分维度**：
- 合成层概念准确性（40%）
- 触发条件列举（40%）
- 性能权衡（20%）

**常见错误**：
- 认为所有元素默认都是合成层
- 滥用 `will-change` 而不移除
- 忽略合成层占用的内存

**延伸追问**：
- 如何在 DevTools 中查看页面的合成层？
- 合成层过多会导致什么问题？

**参考资源**：
- [MDN - will-change](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change)

---

### FB-03-CA-A-001：分析下面代码的打印顺序，并说明原因。

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：事件循环、requestAnimationFrame、微任务、宏任务
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
console.log('start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise1'));

requestAnimationFrame(() => console.log('rAF'));

Promise.resolve().then(() => console.log('promise2'));

console.log('end');
```

请说出上述代码在浏览器中的典型输出顺序。

**参考答案**：

典型输出顺序为：

```
start
end
promise1
promise2
rAF
timeout
```

解释：

1. `console.log('start')` 和 `console.log('end')` 是同步代码，最先执行。
2. 两个 `Promise.then` 进入微任务队列，在当前宏任务结束后、渲染前依次执行，输出 `promise1`、`promise2`。
3. `requestAnimationFrame` 回调在渲染阶段执行，位于微任务之后、下一次宏任务之前。
4. `setTimeout` 属于宏任务，进入下一次事件循环才执行。

> 注意：实际 `rAF` 是否触发取决于浏览器是否需要渲染该帧；如果页面不可见或无需更新，可能会延迟。

**评分维度**：
- 正确输出顺序（50%）
- `rAF` 所处阶段说明（30%）
- 宏任务与微任务区分（20%）

**常见错误**：
- 将 `requestAnimationFrame` 当成宏任务
- 忽略微任务优先级高于渲染阶段
- 认为 `setTimeout(..., 0)` 一定在 `rAF` 之前

**延伸追问**：
- 如果再加入 `MutationObserver`，打印顺序会如何变化？
- 在 Node.js 中这段代码的输出会有什么不同？

**参考资源**：
- [MDN - 事件循环](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide)

---

### FB-03-CO-A-002：Service Worker 的生命周期是怎样的？如何注册和激活？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：Service Worker、生命周期、缓存、PWA
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述 Service Worker 的生命周期，并说明注册后为什么新版本的 SW 不会立即生效。

**参考答案**：

Service Worker 的生命周期包括：

1. **注册（Register）**：通过 `navigator.serviceWorker.register('/sw.js')` 注册。
2. **安装（Install）**：浏览器下载 SW 脚本，触发 `install` 事件，常用于预缓存核心资源。
3. **等待（Waiting）**：安装成功后，如果当前仍有页面被旧版 SW 控制，新版 SW 会进入 waiting 状态。
4. **激活（Activate）**：当所有旧版 SW 控制的页面关闭后，新版 SW 激活，触发 `activate` 事件，常用于清理旧缓存。
5. **控制（Controlled）**：激活后，SW 开始拦截 `fetch` 事件，控制页面资源请求。

为什么不会立即生效：

- 浏览器为了确保当前页面逻辑一致性，要求旧页面关闭后才让新版 SW 接管。
- 可通过 `self.skipWaiting()` 让新 SW 立即激活，再用 `clients.claim()` 立即控制页面。

**评分维度**：
- 生命周期阶段完整（40%）
- waiting 原因解释（30%）
- skipWaiting / claim 用法（30%）

**常见错误**：
- 认为注册后 SW 立刻控制所有页面
- 忽略 `activate` 阶段清理旧缓存
- 不知道 SW 必须在 HTTPS 下运行（localhost 例外）

**延伸追问**：
- 如何实现“检测到新版本时提示用户刷新”？
- Service Worker 更新失败如何回滚？

**参考资源**：
- [MDN - Service Worker 生命周期](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)

---

### FB-03-SC-A-001：如何设计一个支持离线访问的 Web 应用缓存策略？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：离线、Service Worker、缓存策略、PWA
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
假设你需要为一个内容型 Web 应用设计离线访问能力，请给出缓存策略方案。

**参考答案**：

可按资源类型分层设计缓存策略：

1. **App Shell（应用外壳）**：
   - 资源：HTML 骨架、核心 CSS/JS、Logo。
   - 策略：**Cache First / 预缓存**。安装 SW 时写入缓存，保证离线可加载基础结构。
2. **动态内容/API 数据**：
   - 资源：接口 JSON 数据。
   - 策略：**Network First + Cache Fallback**。优先联网获取最新数据，离线时使用缓存，并提示用户。
3. **图片等媒体资源**：
   - 资源：文章图片、头像。
   - 策略：**Stale-While-Revalidate**。先返回缓存保证速度，同时后台更新缓存。
4. **离线回退页面**：
   - 当所有策略都失败时返回一个离线提示页。

更新机制：

- 每次构建生成缓存版本号，激活 SW 时清理旧版本缓存。
- 使用 Workbox 等库简化策略实现。

**评分维度**：
- 按资源类型划分策略（40%）
- 缓存更新与清理方案（30%）
- 离线用户体验（20%）
- 工具选型（10%）

**常见错误**：
- 所有资源都使用 cache-first
- 没有缓存版本管理，导致旧资源长期不更新
- 忽略缓存容量限制

**延伸追问**：
- 如何处理用户离线时提交的数据？
- 缓存容量超出后如何优雅降级？

**参考资源**：
- [Workbox - Caching Strategies](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)

---

### FB-03-CO-A-003：HTTP 强缓存和协商缓存的判断流程是怎样的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：HTTP 缓存、强缓存、协商缓存、Cache-Control
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明浏览器在发起请求时，如何判断使用强缓存还是协商缓存，以及各自的响应头。

**参考答案**：

浏览器缓存判断流程：

1. **检查强缓存**：
   - 查看 `Cache-Control: max-age=xxx`（HTTP/1.1）或 `Expires`（HTTP/1.0）。
   - 如果在有效期内，直接返回磁盘/内存缓存，状态码可能显示 `200 (from disk cache)` 或 `200 (from memory cache)`。
2. **强缓存失效后进入协商缓存**：
   - 浏览器向服务器发送条件请求，携带 `If-None-Match`（对应 `ETag`）或 `If-Modified-Since`（对应 `Last-Modified`）。
   - 服务器判断资源未变化则返回 `304 Not Modified`，浏览器继续使用缓存。
   - 若资源变化则返回 `200` 和新资源。

优先级：`Cache-Control` > `Expires`；`ETag` > `Last-Modified`。

**评分维度**：
- 强缓存条件与头部（40%）
- 协商缓存条件与头部（40%）
- 优先级与状态码（20%）

**常见错误**：
- 认为协商缓存一定会返回 304
- 混淆 `no-cache` 与 `no-store`
- 认为 `Expires` 优先级高于 `Cache-Control`

**延伸追问**：
- `no-cache`、`no-store`、`must-revalidate` 有什么区别？
- 为什么 `ETag` 比 `Last-Modified` 更精确？

**参考资源**：
- [MDN - HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)

---

### FB-03-CO-A-004：浏览器如何处理跨域图片、脚本和 iframe 的访问限制？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：跨域、CORS、iframe、CORP、COEP
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明浏览器对跨域图片、脚本和 iframe 的加载与读取限制。

**参考答案**：

- **图片（`<img>`）**：可以加载跨域图片并在页面上显示，但默认不能通过 Canvas 读取像素（会污染 Canvas）。若图片服务器允许，可设置 `crossorigin="anonymous"` 配合 CORS 头来读取像素。
- **脚本（`<script>`）**：可以加载跨域脚本并执行，但 JS 不能读取脚本源码（除非服务器返回 CORS 头）。JSONP 正是利用了这一特性。
- **iframe**：受同源策略严格限制。不同源的父页面不能读取子页面的 DOM、Cookie、localStorage。可通过 `postMessage` 进行跨域通信。

跨域隔离：

- `Cross-Origin-Resource-Policy`（CORP）：声明资源可被哪些站点加载。
- `Cross-Origin-Embedder-Policy`（COEP）：要求嵌入资源必须明确允许跨域嵌入。

**评分维度**：
- 加载与读取的区别（40%）
- 图片、脚本、iframe 各自限制（30%）
- CORS/CORP/COEP 理解（30%）

**常见错误**：
- 认为 CORS 会阻止图片加载
- 认为跨域 iframe 完全无法交互
- 忽略 Canvas 污染问题

**延伸追问**：
- 跨域字体加载有什么特殊限制？
- 什么是跨域隔离（Cross-Origin Isolation）？

**参考资源**：
- [MDN - CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

---

### FB-03-SE-A-001：SameSite Cookie 的三种取值对跨站请求有什么影响？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：SameSite、Cookie、CSRF、安全
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `SameSite` Cookie 的三个取值及其对跨站请求的影响。

**参考答案**：

| 取值 | 行为 | 典型用途 |
|------|------|----------|
| `Strict` | 完全不允许在跨站请求中发送 Cookie | 高安全场景，如银行后台 |
| `Lax` | 允许在顶层导航的安全 GET 请求中发送（如 `<a href>`），但不允许 iframe、POST、AJAX 等 | 现代浏览器默认值，兼顾安全与体验 |
| `None` | 允许在所有跨站请求中发送 Cookie，但必须同时设置 `Secure` | 需要跨站登录或嵌入的场景 |

对 CSRF 的影响：

- `Strict` 和 `Lax` 都能有效防御 CSRF，因为 CSRF 通常依赖跨站自动携带 Cookie。
- `None` 会恢复跨站携带能力，需要配合 CSRF Token 等其他防御手段。

**评分维度**：
- 三种取值解释（50%）
- 对 CSRF 防御的影响（30%）
- 默认值与 `Secure` 配合（20%）

**常见错误**：
- 认为 `SameSite=Strict` 会阻止所有跨域请求
- 忽略 `None` 必须配合 `Secure`
- 不清楚现代浏览器默认是 `Lax`

**延伸追问**：
- `SameSite` 与 CORS 有什么关系？
- 前后端分离且跨域时，如何正确设置 Cookie？

**参考资源**：
- [MDN - SameSite](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

---

### FB-03-PE-A-003：Performance API 中 LCP、FID、CLS 分别衡量什么？如何优化？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：Core Web Vitals、LCP、FID、CLS、性能指标
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Core Web Vitals 中的 LCP、FID、CLS 指标含义，并给出优化方向。

**参考答案**：

- **LCP（Largest Contentful Paint）**：衡量视口中最大内容元素（如首图、大段文本）的渲染时间，反映首屏加载体验。建议 ≤ 2.5s。
- **FID（First Input Delay）**：衡量用户首次交互（点击、按键）到浏览器实际响应的时间，反映交互响应性。建议 ≤ 100ms。INP（Interaction to Next Paint）正逐步替代 FID。
- **CLS（Cumulative Layout Shift）**：衡量页面加载过程中累计布局偏移量，反映视觉稳定性。建议 ≤ 0.1。

优化方向：

- **LCP**：优化 TTFB、预加载 LCP 资源、压缩图片、内联关键 CSS、使用 CDN。
- **FID/INP**：减少长任务、拆分 JS、使用 Web Worker、避免在主线程执行大量同步逻辑。
- **CLS**：为图片/视频/广告预留尺寸、避免在已有内容上方插入内容、预加载字体避免闪烁。

**评分维度**：
- 指标含义（40%）
- 阈值知识（20%）
- 优化手段（40%）

**常见错误**：
- 将 FCP 与 LCP 混淆
- 认为 FID 等同于页面完全可交互时间
- 忽略 INP 作为 FID 的替代指标

**延伸追问**：
- 如何用 `PerformanceObserver` 采集 LCP？
- 什么是 TTFB 和 FCP？

**参考资源**：
- [web.dev - Core Web Vitals](https://web.dev/vitals/)

---

### FB-03-CO-A-005：浏览器资源加载的优先级是如何确定的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：资源优先级、preload、fetchpriority、关键资源
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明浏览器如何决定 HTML、CSS、JS、图片、字体等资源的加载优先级。

**参考答案**：

浏览器根据以下因素综合确定资源优先级：

1. **资源类型**：
   - 高优先级：阻塞渲染的 CSS、`<head>` 中的同步 JS、字体。
   - 中优先级：首屏图片。
   - 低优先级：`async`/`defer` JS、非首屏图片、视频等。
2. **文档顺序与位置**：`<head>` 中的资源通常优先级更高。
3. **`async` / `defer` / `module` 属性**：异步脚本优先级降低。
4. **开发者提示**：
   - `<link rel="preload" as="...">` 可提升关键资源优先级。
   - `fetchpriority="high" / "low"` 可微调优先级。
5. **预加载扫描器（Preload Scanner）**：浏览器在解析器被阻塞时，会预扫描后续标签提前发现资源。

**评分维度**：
- 影响因素（50%）
- 各类资源默认优先级（30%）
- 优化手段（20%）

**常见错误**：
- 认为所有图片优先级相同
- 滥用 `preload` 导致带宽争抢
- 混淆 `preload` 与 `prefetch`

**延伸追问**：
- `async` 和 `defer` 对加载和执行顺序分别有什么影响？
- Chrome DevTools Network 面板如何查看资源优先级？

**参考资源**：
- [Chrome Resource Prioritization](https://web.dev/resource-prioritization/)

---

### FB-03-CO-A-006：渲染进程内部有哪些主要线程？它们如何协作？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：渲染进程、主线程、合成器线程、光栅线程
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述 Chromium 渲染进程内部的主要线程及其职责，并说明它们如何协作完成一帧的渲染。

**参考答案**：

渲染进程主要线程：

1. **主线程（Main Thread）**：解析 HTML/CSS、构建 DOM/CSSOM、执行 JS、计算布局、生成绘制记录。
2. **合成器线程（Compositor Thread）**：接收输入事件、管理图层树、决定哪些区域需要重绘、将绘制任务分发给光栅线程。
3. **光栅线程（Raster Thread）**：将绘制记录转换为位图（栅格化），可运行在 GPU 进程或 Worker 线程中。
4. **Worker 线程**：处理图片解码、网络请求回调等辅助任务。

协作流程：

- 主线程完成布局与绘制后，将绘制指令和图层信息提交给合成器线程。
- 合成器线程将图层切分为图块（tile），分配给光栅线程进行栅格化。
- 栅格化完成后，合成器线程将图块合成最终帧，交给 GPU 进程显示。
- 滚动等输入事件优先在合成器线程处理，无需等待主线程。

**评分维度**：
- 线程职责完整（50%）
- 协作流程描述（30%）
- 输入事件处理路径（20%）

**常见错误**：
- 认为所有渲染都在主线程完成
- 把合成器线程与 GPU 进程混淆
- 忽略光栅线程的存在

**延伸追问**：
- 为什么滚动操作通常不会阻塞主线程？
- 主线程繁忙时，点击事件会有哪些延迟表现？

**参考资源**：
- [Chromium - How Chromium Displays Web Pages](https://www.chromium.org/developers/design-documents/displaying-a-web-page-chrome/)

---

### FB-03-CD-A-001：手写一个防抖（debounce）函数，并说明在浏览器输入场景中的应用。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：防抖、debounce、输入优化、性能
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请手写一个 `debounce(fn, delay, options)` 函数，支持 `leading` 和 `trailing` 参数，并说明在搜索框输入中的应用。

**参考答案**：

```js
function debounce(fn, delay, options = {}) {
  const { leading = false, trailing = true } = options;
  let timer = null;
  let lastArgs = null;

  return function (...args) {
    const shouldCallNow = leading && !timer;
    lastArgs = args;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      if (trailing && lastArgs) {
        fn.apply(this, lastArgs);
      }
      timer = null;
      lastArgs = null;
    }, delay);

    if (shouldCallNow) {
      fn.apply(this, args);
    }
  };
}

// 搜索框应用
const input = document.getElementById('search');
input.addEventListener('input', debounce(e => {
  fetch(`/api/search?q=${e.target.value}`)
    .then(res => res.json())
    .then(renderResults);
}, 300));
```

应用价值：

- 用户在搜索框连续输入时，只在停止输入 300ms 后发起请求，减少无效请求和服务器压力。

**评分维度**：
- 实现正确性（50%）
- `this` 绑定与参数传递（20%）
- leading/trailing 边界处理（20%）
- 实际应用场景（10%）

**常见错误**：
- 与节流（throttle）混淆
- 没有保留 `this` 和参数
- 忽略返回值或取消功能

**延伸追问**：
- 手写一个 `throttle` 函数，并说明适用场景。
- 如何取消一个 debounce 函数内部待执行的调用？

**参考资源**：
- [Lodash - debounce](https://lodash.com/docs/4.17.15#debounce)

---

### FB-03-PE-A-004：如何通过 PerformanceObserver 采集性能指标？

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：03 Browser
**标签**：PerformanceObserver、性能指标、采集、Web Vitals
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请用 `PerformanceObserver` 编写代码采集 LCP、FID 和 CLS，并说明 `buffered: true` 的作用。

**参考答案**：

```js
function observeMetrics() {
  // LCP
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime, lastEntry.element);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // FID
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const delay = entry.processingStart - entry.startTime;
      console.log('FID:', delay);
    }
  }).observe({ type: 'first-input', buffered: true });

  // CLS
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    console.log('CLS:', clsValue);
  }).observe({ type: 'layout-shift', buffered: true });
}

observeMetrics();
```

`buffered: true` 的作用：

- 允许 Observer 注册时获取已经发生的、符合条件的性能条目，避免因为注册时机较晚而遗漏首屏数据。
- 注意：`buffered` 需配合 `type` 单类型使用，不能与 `entryTypes` 数组一起使用。

**评分维度**：
- API 使用正确性（50%）
- 指标计算逻辑（30%）
- `buffered` 理解（20%）

**常见错误**：
- 认为 `observe()` 会同步返回历史数据
- CLS 没有过滤 `hadRecentInput`
- FID 计算方式错误

**延伸追问**：
- 如何采集 Long Tasks？
- 采集到的性能数据如何上报？

**参考资源**：
- [MDN - PerformanceObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver)

---

## 深入题

### FB-03-CO-P-001：详细描述浏览器渲染流水线中的分层（Layer）和光栅化（Raster）阶段。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：分层、光栅化、渲染流水线、GPU、Tiling
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请深入说明浏览器渲染流水线中“分层”与“光栅化”两个阶段的细节，包括它们的目的和输出。

**参考答案**：

**分层（Layerization）**：

- 在绘制之前，浏览器会根据一定规则将渲染树拆分为多个独立的合成层（Compositing Layers）。
- 每个图层可以独立绘制、独立更新，避免修改一个元素时重绘整个页面。
- 分层依据包括：`transform`、`opacity`、`will-change`、`position: fixed`、`<video>`/`<canvas>`、层叠重叠等。

**光栅化（Rasterization）**：

- 光栅化将绘制记录（Paint Records）转换为位图（Bitmap）。
- 浏览器通常将每个图层切分成多个图块（Tiles），只光栅化可见区域及附近的图块。
- 光栅化可以在 CPU（Skia）或 GPU（硬件加速）上完成，现代浏览器优先使用 GPU 以提升效率。
- 光栅化后的位图存储在 GPU 内存中，合成阶段直接调用这些位图。

两者关系：

- 分层决定“哪些内容可以独立更新”。
- 光栅化决定“最终像素长什么样”。
- 分层越多，内存占用越大；光栅化粒度越细，滚动等场景越流畅。

**评分维度**：
- 分层原因与规则（40%）
- 光栅化流程与图块机制（30%）
- CPU/GPU 分工与内存影响（20%）
- 两者关系（10%）

**常见错误**：
- 认为“绘制”就是“光栅化”
- 认为图层越多越好
- 忽略图块（Tile）机制

**延伸追问**：
- 什么是层爆炸（Layer Explosion）？如何避免？
- 为什么固定定位元素通常会被提升为独立图层？

**参考资源**：
- [Chromium - Compositing in Blink/WebCore](https://www.chromium.org/developers/design-documents/compositor-thread-architecture/)

---

### FB-03-CO-P-002：合成器线程（Compositor Thread）如何接收并处理输入事件？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：合成器线程、输入事件、命中测试、事件路由
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明浏览器合成器线程在输入事件处理中的角色，以及它如何将事件路由到主线程。

**参考答案**：

输入事件从操作系统传递给浏览器进程，再转发给对应的渲染进程。合成器线程首先接收输入事件。

处理流程：

1. **命中测试（Hit Test）**：合成器线程根据图层树（Layer Tree）和可见区域，判断事件命中的目标元素。
2. **判断是否可独立处理**：
   - 如果事件只是滚动、缩放等合成器可独立完成的手势，直接在合成器线程处理，无需主线程参与。
   - 如果目标元素注册了非被动事件监听器，或事件可能影响布局（如 `touchstart` 默认可能阻塞滚动），合成器线程需要将事件发送给主线程。
3. **事件合并与分发**：
   - 对于高频事件（如 `mousemove`、`scroll`），浏览器可能合并或跳过部分事件以节省性能。
   - 主线程执行对应的事件监听器，可能触发 JS、样式计算、布局等。

优化提示：

- 对滚动相关监听器使用 `{ passive: true }`，让合成器线程无需等待主线程即可滚动。
- 避免在滚动监听中做重排重绘，防止卡顿。

**评分维度**：
- 命中测试理解（30%）
- 合成器与主线程分工（40%）
- 被动监听器与事件合并（30%）

**常见错误**：
- 认为所有输入事件都先经过主线程
- 忽略 `passive: true` 对滚动性能的影响
- 认为命中测试在主线程完成

**延伸追问**：
- `passive: true` 对 `preventDefault()` 有什么影响？
- 什么是输入延迟（Input Delay）？它与主线程繁忙程度有什么关系？

**参考资源**：
- [web.dev - Compositor-Only Properties](https://web.dev/animations-guide/)

---

### FB-03-PE-P-001：为什么 transform 和 opacity 动画通常比 top/left 动画性能更好？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：transform、opacity、动画性能、合成、布局
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请从浏览器渲染机制角度解释，为什么使用 `transform` 和 `opacity` 做动画通常比 `top`/`left` 性能更好。

**参考答案**：

`transform` 和 `opacity` 动画性能更高的核心原因是它们可以在**合成阶段由 GPU 直接处理**，跳过布局与绘制。

具体流程对比：

- **`top`/`left` 动画**：每一帧都会改变元素几何位置，触发**重排（Reflow）**，随后触发**重绘（Repaint）**，最后合成。CPU 密集型，容易掉帧。
- **`transform`/`opacity` 动画**：如果元素已提升为独立合成层，浏览器只需在每帧调整图层的变换矩阵或透明度，直接由 GPU 合成。不需要重新计算布局，也不需要重绘像素。

注意事项：

- 需要元素被提升为合成层；否则仍可能触发绘制。
- 可通过 `will-change: transform` 提前提示浏览器创建合成层，但动画结束后应移除，避免显存浪费。
- 只适用于不涉及布局变化的动画。

**评分维度**：
- 触发渲染阶段差异（60%）
- 合成层作用（20%）
- 实践注意事项（20%）

**常见错误**：
- 认为 `transform` 绝对不会触发重绘
- 忽略 `will-change` 的副作用
- 认为所有 CSS 动画性能都一样

**延伸追问**：
- 如何验证一个动画实际触发了哪些渲染阶段？
- 使用 `translate3d(0,0,0)` 为什么能开启硬件加速？

**参考资源**：
- [Google Web Fundamentals - Animations](https://developers.google.com/web/fundamentals/design-and-ux/animations)

---

### FB-03-CO-P-003：浏览器如何处理 JavaScript 执行对渲染和输入响应的影响？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：主线程、长任务、输入延迟、调度
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 JavaScript 执行为什么会阻塞渲染和输入响应，并给出缓解方案。

**参考答案**：

浏览器的主线程需要同时处理：

- JavaScript 执行
- DOM/CSSOM 构建
- 样式计算（Style）
- 布局（Layout）
- 绘制（Paint）
- 输入事件处理

由于 JavaScript 可以修改 DOM 和样式，浏览器通常需要等 JS 执行完才能进行样式计算和布局。因此长任务会阻塞后续渲染和输入响应，导致掉帧和输入延迟。

缓解方案：

1. **拆分长任务**：将超过 50ms 的任务拆分为多个小任务，中间让出主线程。
2. **使用 `requestAnimationFrame`**：把视觉更新集中在渲染帧内。
3. **使用 `scheduler.yield()` / `setTimeout(fn, 0)`**：让出主线程给事件和渲染。
4. **使用 Web Worker**：把计算密集型任务放到后台线程。
5. **代码分割与懒加载**：减少首屏 JS 执行量。
6. **避免强制同步布局**：不要在循环中交替读写布局属性。

**评分维度**：
- 主线程竞争模型（40%）
- 长任务对渲染/输入的影响（30%）
- 缓解方案完整性（30%）

**常见错误**：
- 认为 JS 与渲染可以并行执行
- 只谈 Web Worker 而忽略主线程调度
- 认为 `requestAnimationFrame` 能解决所有阻塞问题

**延伸追问**：
- 什么是 INP（Interaction to Next Paint）？
- 如何检测页面中的长任务？

**参考资源**：
- [web.dev - Optimize Long Tasks](https://web.dev/optimize-long-tasks/)

---

### FB-03-SE-P-001：Content Security Policy（CSP）如何限制 XSS 攻击？有哪些常用指令？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：CSP、XSS、安全头、script-src、nonce
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 CSP 的防御 XSS 的原理，并列举常用指令。

**参考答案**：

CSP 通过响应头 `Content-Security-Policy` 告诉浏览器哪些来源的资源可以加载和执行，从而限制攻击者注入的恶意脚本运行。

常用指令：

- `default-src`：所有资源的默认策略。
- `script-src`：允许加载 JS 的来源，可配合 `'nonce-xxx'` 或 `'sha256-xxx'` 允许特定内联脚本。
- `style-src`：允许加载 CSS 的来源。
- `img-src`：允许加载图片的来源。
- `connect-src`：限制 `fetch`、`XHR`、`WebSocket` 等网络请求。
- `frame-ancestors`：限制哪些页面可以嵌入当前页面，防止点击劫持。
- `report-uri` / `report-to`：违规报告上报地址。

最佳实践：

- 先使用 `Content-Security-Policy-Report-Only` 收集违规报告，确认无影响后再强制启用。
- 避免使用 `'unsafe-inline'` 和 `'unsafe-eval'`，它们会削弱 CSP 效果。
- 对第三方脚本使用 SRI（Subresource Integrity）校验。

**评分维度**：
- CSP 防御原理（40%）
- 常用指令掌握（40%）
- 部署实践（20%）

**常见错误**：
- 认为 CSP 可以防御 SQL 注入
- 使用 `'unsafe-inline'` 后认为 CSP 仍然有效
- 忽略 report-only 模式

**延伸追问**：
- `nonce` 和 `hash` 有什么区别？如何生成安全的 nonce？
- CSP 与 Trusted Types 如何配合使用？

**参考资源**：
- [MDN - Content Security Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

---

### FB-03-CO-P-004：浏览器的内存管理机制是怎样的？前端常见的内存泄漏有哪些？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：内存管理、V8、垃圾回收、内存泄漏
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请简述浏览器中 JavaScript 的内存管理机制，并列举前端常见的内存泄漏场景。

**参考答案**：

浏览器中的 JS 主要由 V8 引擎执行，采用**分代垃圾回收**机制：

- **新生代（New Space）**：存放生命周期短的对象，使用 Scavenge 算法（复制式回收）。
- **老生代（Old Space）**：存放生命周期长的对象，使用 Mark-Sweep-Compact 算法。
- 垃圾回收器会标记不可达对象并回收其内存，但回收不是实时的。

常见内存泄漏场景：

1. **未移除的事件监听器**：DOM 被移除但监听器仍持有引用。
2. **闭包持有 DOM 引用**：导致 DOM 节点无法被回收。
3. **定时器未清除**：`setInterval` / `setTimeout` 持续引用外部变量。
4. **全局变量累积**：未声明的变量挂载到 `window`，或全局缓存无上限增长。
5. **分离的 DOM 节点（Detached DOM）**：被 JS 引用但已从文档树移除。
6. **console 输出**：某些浏览器会保留被打印对象的引用。

排查工具：

- Chrome DevTools Memory 面板：Heap Snapshot、Allocation Timeline。
- Performance 面板：观察 JS Heap 持续增长。

**评分维度**：
- GC 基本原理（30%）
- 泄漏场景列举（40%）
- 排查工具与方法（30%）

**常见错误**：
- 认为 JS 没有内存泄漏
- 认为 GC 会立即回收不再使用的对象
- 混淆“内存占用高”与“内存泄漏”

**延伸追问**：
- `WeakMap` 和 `WeakSet` 为什么能帮助避免内存泄漏？
- 单页应用路由切换时容易出现哪些泄漏？

**参考资源**：
- [MDN - Memory Management](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_management)

---

### FB-03-CO-P-005：Service Worker 的缓存更新策略与“activate”陷阱如何解决？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：Service Worker、缓存更新、skipWaiting、activate
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Service Worker 安装新版本时的缓存更新流程，并解释如何规避“activate”陷阱。

**参考答案**：

Service Worker 更新流程：

1. 浏览器检测到 SW 脚本字节变化，开始下载新版 SW。
2. 新版 SW 触发 `install` 事件，可预缓存新资源。
3. `install` 成功后，新版 SW 进入 `waiting` 状态，等待旧版 SW 控制的所有页面关闭。
4. 旧页面全部关闭后，新版 SW 进入 `activate` 事件，此时应清理旧缓存。
5. 新版 SW 开始控制页面并拦截 `fetch`。

“activate 陷阱”：

- 如果用户长期不关闭标签页，新版 SW 可能一直无法激活，导致旧资源长期生效。
- 用户在多个标签页打开同一站点时，旧 SW 可能持续存在。

解决方案：

1. **提示用户刷新**：监听到 `updatefound` 后提示用户手动刷新。
2. **`skipWaiting()` + `clients.claim()`**：新版 SW 安装完成后立即激活并接管页面。
   - 注意：这可能导致同一页面在生命周期中前后使用不同版本的资源，需确保资源兼容。
3. **构建时资源文件名加 hash**：保证新旧版本资源不冲突。
4. **约定缓存版本号**：`activate` 中删除非当前版本的缓存。

**评分维度**：
- 更新流程完整性（40%）
- waiting 原因与风险（30%）
- 解决方案合理性（30%）

**常见错误**：
- 认为新 SW 安装后立即生效
- 不清理旧缓存导致容量膨胀
- 盲目使用 `skipWaiting` 导致资源不一致

**延伸追问**：
- 如何设计 SW 更新失败的回滚策略？
- 多个标签页如何同步 SW 更新状态？

**参考资源**：
- [Google - The Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)

---

### FB-03-CO-P-006：跨域资源共享中，Credentials 与 CORS 响应头如何配合？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：CORS、Credentials、Cookie、跨域安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明在 CORS 请求中携带 Cookie 时，前端与后端需要如何配合配置。

**参考答案**：

要在跨域请求中携带 Cookie，需要同时满足以下条件：

1. **前端设置 credentials**：
   - `fetch`：`fetch(url, { credentials: 'include' })`
   - `XMLHttpRequest`：`xhr.withCredentials = true`
2. **后端响应头**：
   - `Access-Control-Allow-Credentials: true`
   - `Access-Control-Allow-Origin` 必须设置为**具体的源**，不能是 `*`
3. **Cookie 本身的属性**：
   - 如果 Cookie 设置了 `SameSite=None`，则必须同时设置 `Secure`（HTTPS）。
   - 若 Cookie 为 `SameSite=Strict` 或 `Lax`，跨域 AJAX 请求可能不会携带。

预检请求：

- 对于非简单请求，浏览器会在 `OPTIONS` 预检中携带 `Access-Control-Request-Headers` 等，服务端需在响应中声明允许 credentials。

**评分维度**：
- credentials 模式（40%）
- 响应头配置（40%）
- Cookie 属性影响（20%）

**常见错误**：
- 认为 `Access-Control-Allow-Origin: *` 可以携带 Cookie
- 前端设置了 credentials 但后端没返回 `Access-Control-Allow-Credentials`
- 忽略 `SameSite` 对 Cookie 携带的影响

**延伸追问**：
- `credentials: 'same-origin'` 和 `'include'` 有什么区别？
- 跨域请求默认是否携带 Cookie？

**参考资源**：
- [MDN - CORS with credentials](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#%E5%8F%91%E9%80%81%E5%B8%A6%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)

---

### FB-03-PE-P-002：长任务（Long Tasks）如何影响性能？如何检测和拆分？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：长任务、主线程、PerformanceObserver、yield
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是长任务？它如何影响用户体验？如何检测并拆分长任务？

**参考答案**：

长任务（Long Task）是指占用主线程超过 **50ms** 的任务。由于主线程还需要处理用户输入、样式计算、布局和绘制，长任务会导致：

- 输入响应延迟（FID/INP 变差）
- 动画掉帧
- 交互卡顿

检测方式：

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Long Task:', entry.duration, entry.attribution);
  }
});
observer.observe({ entryTypes: ['longtask'] });
```

拆分方案：

1. **任务切片**：将大循环拆分为多个小任务，每次处理固定数量后让出主线程。
2. **`scheduler.yield()`**：将控制权交还浏览器，优先处理高优先级任务。
3. **`requestIdleCallback`**：在浏览器空闲时执行低优先级任务（注意兼容性）。
4. **Web Worker**：将计算移到后台线程。
5. **虚拟化**：长列表只渲染可视区域。

```js
function processChunk(items, chunkSize, callback) {
  let i = 0;
  function step() {
    const end = Math.min(i + chunkSize, items.length);
    for (; i < end; i++) callback(items[i]);
    if (i < items.length) setTimeout(step, 0); // 让出主线程
  }
  step();
}
```

**评分维度**：
- 长任务定义与影响（40%）
- 检测方法（20%）
- 拆分与优化方案（40%）

**常见错误**：
- 只看 CPU 占用而忽略 50ms 阈值
- 拆分任务后没有真正让出主线程
- 忽略 Web Worker 的适用场景

**延伸追问**：
- Total Blocking Time（TBT）与长任务有什么关系？
- 主线程让出后，微任务会在什么时候执行？

**参考资源**：
- [web.dev - Long Tasks](https://web.dev/long-tasks-devtools/)

---

### FB-03-CO-P-007：浏览器 DNS 解析、TCP 连接和 TLS 握手过程如何优化？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：DNS、TCP、TLS、连接优化、资源提示
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明浏览器建立网络连接的过程，并给出前端可做的优化手段。

**参考答案**：

建立连接过程：

1. **DNS 解析**：将域名解析为 IP，可能经过本地缓存、HOSTS、递归 DNS 查询。
2. **TCP 三次握手**：建立可靠连接。
3. **TLS 握手**（HTTPS）：协商加密算法、交换密钥，TLS 1.2 通常需要 1-RTT，TLS 1.3 可降至 0-RTT（需配合早期数据）。
4. **发送 HTTP 请求**。

前端优化手段：

1. **DNS 预解析**：`<link rel="dns-prefetch" href="//cdn.example.com">`
2. **预连接**：`<link rel="preconnect" href="https://cdn.example.com">`，提前完成 DNS + TCP + TLS。
3. **连接复用**：启用 Keep-Alive，HTTP/2 多路复用。
4. **TLS 1.3**：减少握手往返。
5. **CDN**：缩短物理距离，降低 RTT。
6. **减少重定向**：每次重定向都会增加 DNS/TCP/TLS 开销。
7. **Early Hints（103）**：服务器先返回提示头，让浏览器提前加载关键资源。

**评分维度**：
- 建立连接过程理解（40%）
- 优化手段完整性（40%）
- 权衡与副作用（20%）

**常见错误**：
- 认为 DNS 预解析会替代实际请求
- 滥用 `preconnect` 导致不必要的连接开销
- 忽略 TLS 版本对性能的影响

**延伸追问**：
- HTTP/3 如何进一步优化连接建立？
- `prefetch` 和 `preconnect` 有什么区别？

**参考资源**：
- [web.dev - Establish Network Connections](https://web.dev/efficiently-load-third-party-javascript/#preconnect-to-required-origins)

---

### FB-03-CO-P-008：浏览器 DevTools 的 Performance 面板如何分析页面性能瓶颈？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：DevTools、Performance、火焰图、性能分析
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何使用 Chrome DevTools Performance 面板定位页面性能瓶颈。

**参考答案**：

Performance 面板分析步骤：

1. **录制性能数据**：在目标操作前点击 Record，执行操作后停止。
2. **查看时间轴**：
   - **FPS**：绿色条表示帧率，红色表示掉帧。
   - **CPU**：颜色区域表示各阶段占用：黄色=JS，紫色=样式/布局，绿色=绘制，蓝色=加载。
   - **NET**：网络请求瀑布流。
3. **分析主线程**：
   - 查看 Main 火焰图，定位长任务。
   - 关注红色三角标记的“Forced Reflow”或“Long Task”。
   - Bottom-up / Call Tree 查看耗时函数。
4. **查看帧详情**：
   - 查看每一帧的 Rendering 阶段，识别重排重绘热点。
5. **结合其他面板**：
   - Network 面板看资源加载。
   - Layers 面板看合成层。
   - Memory 面板看内存增长。

常见瓶颈识别：

- 长 JS 任务 → 拆分或移入 Worker。
- 强制同步布局 → 批量读写。
- 大量绘制 → 减少重绘区域或使用合成层。

**评分维度**：
- 录制与面板操作（30%）
- 火焰图与主线程分析（40%）
- 优化方向推导（30%）

**常见错误**：
- 只看 Summary 而不定位调用栈
- 混淆 Layout 和 Paint 的颜色
- 忽略 Network 与 Performance 的关联

**延伸追问**：
- 如何用 DevTools 定位内存泄漏？
- Layers 面板能看到哪些信息？

**参考资源**：
- [Chrome DevTools - Performance](https://developer.chrome.com/docs/devtools/performance/)

---

### FB-03-SC-P-001：设计一个浏览器端图片懒加载与占位方案。

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：03 Browser
**标签**：懒加载、Intersection Observer、占位、CLS
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个图片懒加载方案，要求：1）只在图片进入视口时加载；2）提供占位避免布局偏移；3）尽量保证性能和无障碍。

**参考答案**：

方案要点：

1. **触发机制**：
   - 原生：`<img loading="lazy" />`（现代浏览器支持）。
   - 自定义：使用 `IntersectionObserver` 监听目标元素进入视口。
2. **占位与防止 CLS**：
   - 提前设置图片 `width` 和 `height` 属性，或使用 `aspect-ratio` 预留空间。
   - 使用低质量占位图（LQIP）或模糊占位（如 BlurHash）。
3. **加载优化**：
   - 使用 `decode()` 异步解码图片，避免阻塞主线程。
   - 首屏图片不使用懒加载，直接加载。
   - 对弱网环境可降级为更低质量图片。
4. **降级与无障碍**：
   - 无 JS 环境：使用 `<noscript>` 提供直接 `<img>`。
   - 始终保留有意义的 `alt` 文本。

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.srcset = img.dataset.srcset || '';
      img.decode?.().then(() => img.classList.add('loaded'));
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
```

**评分维度**：
- 触发机制选择（30%）
- 占位与 CLS 处理（30%）
- 性能与解码优化（20%）
- 降级与无障碍（20%）

**常见错误**：
- 使用 `scroll` 事件 + `getBoundingClientRect` 监听滚动
- 不设置图片尺寸导致 CLS
- 懒加载首屏关键图片

**延伸追问**：
- 如何实现图片的渐进式加载？
- 如果图片加载失败，如何优雅降级？

**参考资源**：
- [web.dev - Lazy Loading](https://web.dev/browser-level-image-lazy-loading/)

---

## 架构题

### FB-03-SD-R-001：设计一个大型 SPA 的首屏性能优化体系。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：SPA、首屏优化、CRP、SSR、Code Splitting
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请为一个大型单页应用设计一套完整的首屏性能优化体系，包括构建、网络、运行时和监控四个层面。

**参考答案**：

**1. 构建层面**：

- 代码分割：按路由、按组件、按依赖自动分割。
- Tree Shaking 与 Dead Code Elimination。
- 压缩、Gzip/Brotli、图片/WebP/AVIF、字体子集化。
- 构建时生成资源 hash，便于长期缓存。

**2. 网络层面**：

- CDN 部署静态资源。
- HTTP/2 或 HTTP/3，启用 Keep-Alive 和多路复用。
- 关键资源预加载：`<link rel="preload">`、`<link rel="preconnect">`。
- Service Worker 缓存 App Shell 与常用资源。

**3. 运行时层面**：

- 路由懒加载，首屏只加载必要代码。
- SSR / SSG / Islands Architecture：首屏 HTML 直出，减少客户端 JS 执行。
- 关键 CSS 内联，非关键 CSS 异步加载。
- 减少主线程长任务：Web Worker、任务切片、虚拟化长列表。
- 图片/字体懒加载与占位。

**4. 监控与持续优化**：

- 采集 FCP、LCP、INP、CLS、TTFB 等 Web Vitals。
- 建立性能基线，设置告警阈值。
- 定期进行 Lighthouse / WebPageTest 评估。

**评分维度**：
- 体系完整性（40%）
- 关键技术选型与理由（30%）
- 可度量与可持续优化（30%）

**常见错误**：
- 只堆技术而没有性能目标
- 忽略构建产物体积对首屏的影响
- 缺乏监控闭环

**延伸追问**：
- SSR 和 SSG 各有什么取舍？
- 如何平衡首屏速度与交互可响应性？

**参考资源**：
- [web.dev - Fast Load Times](https://web.dev/fast/)

---

### FB-03-SD-R-002：如何设计浏览器端的安全架构以防御 XSS、CSRF、点击劫持和数据窃取？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：安全架构、XSS、CSRF、点击劫持、CSP
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套浏览器端安全架构，系统性防御 XSS、CSRF、点击劫持和敏感数据窃取。

**参考答案**：

安全架构应遵循**纵深防御**原则，在多个层面设防：

**1. 输入与输出层**：

- 所有用户输入在入库和渲染前做校验与转义。
- 使用框架默认转义机制，避免直接拼接 HTML。

**2. 内容安全策略（CSP）**：

- 限制脚本、样式、图片、连接来源。
- 使用 nonce/hash 管理内联脚本，禁止 `'unsafe-inline'`。
- 配置 `frame-ancestors` 防止点击劫持。

**3. Cookie 与身份安全**：

- 敏感 Cookie 设置 `HttpOnly`、`Secure`、`SameSite=Lax/Strict`。
- 使用短期 Access Token + Refresh Token，敏感操作二次验证。

**4. 资源完整性**：

- 第三方脚本使用 SRI（Subresource Integrity）。
- 对外部 iframe 使用 `sandbox` 属性。

**5. 传输与隔离**：

- 全站 HTTPS，启用 HSTS。
- 对敏感页面启用 COOP/COEP 实现跨域隔离。

**6. 监控与响应**：

- 部署 CSP 违规上报、错误监控、异常行为检测。
- 建立漏洞响应流程与依赖安全扫描。

**评分维度**：
- 分层防御设计（40%）
- 具体措施覆盖度（40%）
- 运维与响应机制（20%）

**常见错误**：
- 认为单一措施即可解决所有安全问题
- 忽略第三方脚本带来的供应链风险
- 前端做权限判断但后端不校验

**延伸追问**：
- 如何防御 DOM 型 XSS？
- 第三方 SDK 注入脚本如何隔离？

**参考资源**：
- [OWASP - Front-end Security](https://owasp.org/www-project-web-security-testing-guide/)

---

### FB-03-SD-R-003：设计一个基于 Service Worker 的前端缓存与离线可用架构。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：Service Worker、缓存架构、离线、PWA
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个基于 Service Worker 的前端缓存架构，使 Web 应用在网络不稳定或离线时仍能基本可用。

**参考答案**：

**1. 缓存分层**：

- **预缓存（Precache）**：构建时将 App Shell、核心 JS/CSS、离线fallback 页面写入缓存（Cache First）。
- **运行时缓存**：
  - API 数据：Network First + Cache Fallback，保证数据新鲜度，离线可读。
  - 图片/字体：Stale-While-Revalidate，优先速度，后台更新。
  - 第三方资源：Cache First with max-age。

**2. 更新机制**：

- 构建时生成缓存版本号（如 `static-v{hash}`）。
- 新版 SW `activate` 时清理旧版本缓存。
- 提供“发现新版本，请刷新”的提示。

**3. 离线体验**：

- 离线时返回本地缓存或离线提示页。
- 对写操作使用 Background Sync，待网络恢复后重试。
- 设置合理的缓存配额监控与 LRU 清理策略。

**4. 安全与回退**：

- SW 仅缓存 HTTPS 或 localhost。
- 核心 API 失败时返回降级数据，避免白屏。

**评分维度**：
- 缓存分层合理性（40%）
- 更新与一致性方案（30%）
- 离线体验与降级（20%）
- 容量与安全（10%）

**常见错误**：
- 所有资源使用 Cache First
- 没有缓存版本管理
- 忽略 Safari 对 Background Sync 的限制

**延伸追问**：
- 多个标签页同时打开时，如何保证缓存更新一致？
- 缓存数据如何与后端版本对齐？

**参考资源**：
- [Google - Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers)

---

### FB-03-SD-R-004：针对高交互 Web 应用，如何设计 60fps 动画与输入响应保障方案？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：60fps、动画、输入响应、INP、RAIL
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请为一个高交互 Web 应用设计一套保障动画 60fps 和输入快速响应的技术方案。

**参考答案**：

**1. 动画渲染层优化**：

- 只动画化合成器属性：`transform` 和 `opacity`。
- 使用 FLIP 技术（First, Last, Invert, Play）实现高性能布局动画。
- 对复杂动画提前使用 `will-change`，动画结束后移除。
- 使用 CSS 动画优先，复杂逻辑使用 `requestAnimationFrame`。

**2. 输入响应优化**：

- 对滚动/触摸监听使用 `{ passive: true }`。
- 将非必要输入处理节流或防抖。
- 避免在输入回调中同步执行重排重绘。

**3. 主线程调度**：

- 拆分长任务，使用 `scheduler.yield()`、`scheduler.postTask()` 或 `setTimeout` 让出主线程。
- 计算密集型任务移入 Web Worker。
- 长列表使用虚拟滚动减少 DOM 数量。

**4. 度量与监控**：

- 监控 FPS、INP、Long Tasks、Dropped Frames。
- 使用 RAIL 模型设定目标：响应 <100ms，动画 <16ms。

**评分维度**：
- 渲染管线利用（40%）
- 调度与拆分方案（30%）
- 度量体系（20%）
- 无障碍与降级（10%）

**常见错误**：
- 滥用 `will-change` 导致显存浪费
- 在主线程做大量动画计算
- 只关注 FPS 而忽略 INP

**延伸追问**：
- FLIP 动画的具体实现步骤是什么？
- 如何在动画中兼顾减少运动偏好（prefers-reduced-motion）？

**参考资源**：
- [web.dev - RAIL](https://web.dev/rail/)

---

### FB-03-SD-R-005：如何设计跨窗口/跨 Tab 的前端状态同步方案？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：跨 Tab、BroadcastChannel、SharedWorker、状态同步
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个方案，实现同一浏览器中多个标签页之间的状态同步，例如登录态、购物车数量等。

**参考答案**：

可选方案对比：

| 方案 | 能力 | 限制 |
|------|------|------|
| `localStorage` + `storage` 事件 | 同域跨 Tab 同步 | 只能同步字符串，部分隐私模式下不可用 |
| `BroadcastChannel` | 同源跨 Tab/窗口/iframe 高效通信 | Safari 历史版本支持较晚 |
| `SharedWorker` | 多个 Tab 共享后台线程 | Safari 已移除支持，调试复杂 |
| `Service Worker` + `clients` | 通过 SW 中转消息 | 需要 HTTPS，生命周期管理复杂 |
| 服务端推送（WebSocket/SSE） | 跨设备同步 | 依赖网络和后端 |

推荐架构：

1. **本地优先**：使用 `BroadcastChannel` 作为同域 Tab 间实时同步通道。
2. **降级兜底**：对不支持的浏览器降级为 `storage` 事件轮询。
3. **服务端同步**：通过 WebSocket/SSE 在跨设备或多浏览器间同步。
4. **冲突解决**：采用 last-write-wins 或更复杂的 CRDT/OT，根据业务选择。
5. **安全与隐私**：敏感状态不通过本地通道传播，或通过加密/签名校验。

**评分维度**：
- 方案选型与理由（40%）
- 一致性保障（30%）
- 降级与兼容性（20%）
- 安全与隐私（10%）

**常见错误**：
- 不考虑 Safari 兼容性
- 频繁轮询造成性能浪费
- 忽略冲突处理

**延伸追问**：
- 如何实现跨浏览器的同步？
- 登录态在多个 Tab 中如何安全地同步登出？

**参考资源**：
- [MDN - BroadcastChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel)

---

### FB-03-SD-R-006：设计一个浏览器端前端监控与可观测性体系。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：可观测性、监控、RUM、Performance、错误追踪
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个浏览器端可观测性体系，覆盖性能、错误、用户行为和业务指标。

**参考答案**：

**1. 指标采集（Metrics）**：

- Web Vitals：LCP、INP、CLS、FCP、TTFB。
- 自定义性能指标：API 耗时、首屏时间、白屏时间、长任务数量。
- 资源加载指标：通过 PerformanceObserver 采集 `navigation` 和 `resource` 条目。

**2. 日志采集（Logs）**：

- JS 错误：`window.onerror`、`unhandledrejection`。
- 资源加载失败：`addEventListener('error', ...)`。
- 自定义业务日志和上下文（用户 ID、页面路径、环境信息）。

**3. 链路追踪（Traces）**：

- 对关键用户操作（点击、提交）生成 trace ID。
- 关联前端调用、后端接口、数据库查询。
- 使用 OpenTelemetry 或 Sentry 等工具。

**4. 数据治理**：

- 采样策略：全量错误 + 采样性能数据。
- 聚合与下钻：按页面、浏览器、版本、地区分组。
- 告警阈值：P95/P99 延迟、错误率、CLS 超标。

**5. 隐私与性能**：

- 避免采集敏感字段（密码、Token、PII）。
- 监控 SDK 本身不应显著影响页面性能。

**评分维度**：
- 三大支柱覆盖（30%）
- 采集方案完整度（30%）
- 数据治理与告警（20%）
- 隐私与性能控制（20%）

**常见错误**：
- 无采样导致数据量过大
- 只采集错误不采集性能
- 忽略监控 SDK 自身的性能开销

**延伸追问**：
- 如何保证错误堆栈可读？Source Map 如何管理？
- 如何关联前端错误与后端日志？

**参考资源**：
- [web.dev - User-centric Performance Metrics](https://web.dev/user-centric-performance-metrics/)

---

### FB-03-SD-R-007：如何设计浏览器端资源加载策略以平衡性能与实时性？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：资源加载、优先级、预加载、实时性、自适应
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套浏览器端资源加载策略，既要保证首屏和交互性能，又要满足实时数据展示的需求。

**参考答案**：

**1. 优先级分层**：

- **关键路径资源**：HTML、阻塞渲染的 CSS、首屏 JS，使用 `preload`/`preconnect`。
- **重要但不阻塞**：首屏字体、首屏图片，使用 `fetchpriority="high"`。
- **延迟加载**：非首屏图片、视频、辅助模块，使用懒加载或 `import()`。
- **预取**：预测用户下一步可能访问的页面资源，使用 `prefetch`。

**2. 实时数据加载**：

- 首屏关键数据可 SSR/SSG 直出，减少首次请求。
- 非关键实时数据使用 `fetch` + 缓存策略，配合 Stale-While-Revalidate。
- 高实时性数据使用 WebSocket/SSE，避免轮询。

**3. 自适应加载**：

- 根据网络状况（`navigator.connection`）选择资源质量。
- 根据设备内存和 CPU 核心数决定是否加载高级功能。
- 支持 Save-Data 模式。

**4. 运行时调度**：

- 在空闲时段预加载和同步数据。
- 对实时数据更新使用 requestAnimationFrame 批量更新 DOM，避免频繁重排。

**评分维度**：
- 资源优先级分层（40%）
- 实时性与性能平衡（30%）
- 自适应与降级（20%）
- 运行时调度（10%）

**常见错误**：
- 所有资源都预加载，导致带宽争抢
- 实时数据频繁更新导致主线程阻塞
- 忽略低带宽用户

**延伸追问**：
- HTTP/2 Server Push 为什么逐渐被弃用？
- 如何根据用户行为预测下一步资源？

**参考资源**：
- [web.dev - Resource Prioritization](https://web.dev/resource-prioritization/)

---

### FB-03-SD-R-008：针对微前端架构，浏览器端隔离方案如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：微前端、隔离、Shadow DOM、CSS Scope、运行时
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
在浏览器端实现微前端架构时，如何保证不同子应用之间的 JS、CSS、DOM、存储隔离？

**参考答案**：

**1. JS 隔离**：

- 使用 qiankun/single-spa 的 JS Sandbox，通过 Proxy 隔离 `window`。
- 快照沙箱：保存和恢复全局变量。
- 实验性方案：Web Component + ES Module 作用域，或 iframe 天然隔离。

**2. CSS 隔离**：

- CSS Modules / BEM：命名约定隔离。
- Shadow DOM：样式仅作用于内部，不影响外部。
- 运行时样式作用域：给子应用根节点加唯一类名前缀，卸载时移除样式标签。

**3. DOM 隔离**：

- 每个子应用挂载到独立容器节点。
- 使用 Shadow DOM 进一步隔离。
- 卸载子应用时清理其 DOM 节点和事件监听器。

**4. 路由与通信**：

- 基座应用统一路由调度，子应用监听自身路由变化。
- 跨应用通信使用 CustomEvent、全局状态管理或发布订阅，避免直接修改全局变量。

**5. 存储隔离**：

- 各子应用使用带前缀的 localStorage key，或通过基座提供存储 API。
- 敏感数据不保存在子应用可直接访问的存储中。

**评分维度**：
- JS 隔离方案（40%）
- CSS/DOM 隔离方案（30%）
- 通信与存储隔离（20%）
- 性能与兼容性（10%）

**常见错误**：
- 认为 Shadow DOM 能解决所有隔离问题
- 忽略全局事件和定时器污染
- 共享依赖版本冲突未处理

**延伸追问**：
- 微前端下如何保证公共依赖只加载一份？
- iframe 微前端与 SPA 微前端的取舍是什么？

**参考资源**：
- [qiankun - Sandbox](https://qiankun.umijs.org/zh/guide/concepts#%E6%B2%99%E7%AE%B1)

---

### FB-03-SD-R-009：设计一个浏览器端内存优化与防泄漏方案。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：内存优化、泄漏预防、生命周期、WeakMap
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请为一个大型的浏览器端应用设计内存优化与防泄漏方案，确保长期运行不会显著增长内存占用。

**参考答案**：

**1. 编码规范**：

- 组件/页面卸载时清理事件监听器、定时器、网络请求、IntersectionObserver。
- 避免在闭包中无意识地持有 DOM 引用。
- 全局状态/缓存设置容量上限和过期策略。

**2. 数据结构与缓存**：

- 使用 `WeakMap` / `WeakSet` 存储与 DOM 节点相关的元数据。
- 对 LRU 缓存限定大小，定期清理过期项。
- 对图片、音视频等大型对象及时释放引用。

**3. 框架与运行时**：

- 利用框架卸载生命周期（如 React `useEffect` cleanup、Vue `onUnmounted`）。
- 路由切换时执行资源释放钩子。
- 对长列表使用虚拟滚动，减少 DOM 数量。

**4. 监控与治理**：

- 在 DevTools 中定期 Heap Snapshot 对比。
- 线上采集 JS Heap 趋势，超过阈值告警。
- 将内存检查纳入 Code Review 和 CI 检测（如检测全局变量新增）。

**评分维度**：
- 生命周期管理（40%）
- 数据结构/缓存设计（30%）
- 框架集成（10%）
- 监控治理（20%）

**常见错误**：
- 完全依赖 GC，不主动清理
- 使用普通 Map 缓存无限增长
- 路由切换不复位状态

**延伸追问**：
- 如何检测线上用户的内存泄漏？
- `WeakRef` 和 `FinalizationRegistry` 适合什么场景？

**参考资源**：
- [web.dev - JavaScript Memory Management](https://web.dev/monitor-total-page-memory/)

---

### FB-03-SD-R-010：如何设计一个多环境、多角色的前端权限与安全模型？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：03 Browser
**标签**：权限模型、RBAC、浏览器安全、路由守卫
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个浏览器端权限与安全模型，支持多环境（开发、测试、生产）和多角色（管理员、普通用户、访客）的访问控制。

**参考答案**：

**1. 权限原则**：

- **后端为权威**：所有敏感操作必须由后端鉴权，前端只做 UI 层控制。
- **最小权限**：只下发当前角色所需的最小权限集合。

**2. 权限数据模型**：

- RBAC：用户 -> 角色 -> 权限（菜单、按钮、数据范围、API）。
- 前端从登录接口获取角色和权限码列表，避免在前端硬编码角色。

**3. 前端控制层**：

- 路由守卫：根据权限决定能否访问某路由。
- 菜单/按钮级渲染：通过 `v-permission` / `Permission` 组件控制。
- API 请求：Token 自动附加，后端校验；前端对 403 统一处理。

**4. 多环境安全**：

- 不同环境使用不同的 API 域名、Cookie 域、CSP 策略。
- 生产环境禁用 Source Map、调试工具、测试账号入口。
- 使用环境变量隔离配置，避免提交密钥到仓库。

**5. 浏览器安全机制**：

- 敏感 Cookie HttpOnly + Secure + SameSite。
- 使用 CSP 限制脚本来源，防止 XSS 窃取权限。
- 对 iframe 嵌入使用 `X-Frame-Options` / `frame-ancestors`。

**评分维度**：
- 权限分层设计（40%）
- 前后端边界（30%）
- 多环境与传输安全（20%）
- 审计与异常处理（10%）

**常见错误**：
- 前端权限决定后端安全
- 将 Token 存储在 localStorage 中无额外保护
- 角色写死在前端代码中

**延伸追问**：
- 如何实现数据级权限（如只能看自己部门的数据）？
- 权限变更后如何实时同步到已登录用户？

**参考资源**：
- [OWASP - Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)

---
