# 浏览器练习册

> 每道题后附答案与解析，建议先独立完成再对照。

---

## 一、选择题

### 第 1 题

现代浏览器中，每个标签页通常运行在独立的什么中？

A. 线程  
B. 进程  
C. 协程  
D. 虚拟机

**答案：B**

**解析**：现代浏览器采用多进程架构，每个标签页通常对应一个独立的渲染进程，以提高稳定性和安全性。一个进程崩溃不会影响其他标签页。

---

### 第 2 题

下面哪个属性修改后最可能只触发合成（Composite），而不触发重排和重绘？

A. `width`  
B. `background-color`  
C. `transform`  
D. `margin`

**答案：C**

**解析**：`transform` 和 `opacity` 通常只影响合成层，可由 GPU 直接处理，跳过布局（重排）和绘制（重绘），性能最好。

---

### 第 3 题

关于 `<script>` 标签，`defer` 和 `async` 的区别，正确的是？

A. 两者都会阻塞 HTML 解析  
B. `defer` 异步下载，DOM 解析完成后按顺序执行；`async` 异步下载，下载完立即执行且不保证顺序  
C. `async` 一定比 `defer` 先执行  
D. 两者都只能用于外部脚本

**答案：B**

**解析**：`defer` 保证脚本按出现顺序执行，且在 DOM 解析完成后执行；`async` 下载完立即执行，顺序不确定。两者都只能用于外部脚本（有 src 属性）。

---

### 第 4 题

事件委托依赖事件的哪个阶段？

A. 捕获阶段  
B. 目标阶段  
C. 冒泡阶段  
D. 任意阶段

**答案：C**

**解析**：事件委托是把事件监听器绑定到父元素，利用子元素事件冒泡到父元素的特性。因此依赖冒泡阶段。某些事件不冒泡，不能用于事件委托。

---

### 第 5 题

以下哪种存储方案在每次 HTTP 请求时都会自动携带？

A. localStorage  
B. sessionStorage  
C. cookie  
D. IndexedDB

**答案：C**

**解析**：cookie 会随每个同源请求自动发送到服务器，因此容量小且不宜存放大量数据。localStorage、sessionStorage、IndexedDB 只在客户端使用。

---

## 二、填空题

### 第 6 题

浏览器渲染流程的五个关键步骤是：解析 → 样式计算 → ______ → 绘制 → 合成。

**答案：布局（Layout / Reflow）**

**解析**：渲染主流程为：解析 HTML/CSS 构建 DOM/CSSOM → 样式计算 → 布局（计算几何位置）→ 绘制 → 合成。

---

### 第 7 题

CSS 的 ______ 属性可以提示浏览器哪些元素将要变化，从而提前创建合成层。

**答案：`will-change`**

**解析**：`will-change: transform` 告诉浏览器该元素即将做 transform 变化，可提前优化。但滥用会占用额外内存，动画结束后应移除。

---

### 第 8 题

协商缓存的两个核心请求头/响应头对是 `Last-Modified` / `If-Modified-Since` 和 ______ / `If-None-Match`。

**答案：`ETag`**

**解析**：`ETag` 是服务器生成的资源唯一标识，比 `Last-Modified` 更精确。浏览器再次请求时通过 `If-None-Match` 发送 ETag，服务器判断资源是否变化。

---

### 第 9 题

`localStorage` 中存储的数据类型是 ______，因此对象需要先用 `JSON.stringify` 转换。

**答案：字符串（string）**

**解析**：localStorage 和 sessionStorage 只能存储字符串。存入对象时需 JSON.stringify，取出时需 JSON.parse。

---

### 第 10 题

调用 `element.offsetWidth` 会触发浏览器的 ______，导致性能损耗。

**答案：强制同步布局（Forced Synchronous Layout）/ 回流**

**解析**：读取 offsetWidth/offsetHeight 等属性时，浏览器必须立即计算最新布局，这会强制刷新布局队列。如果与写操作交替进行，会造成布局抖动（Layout Thrashing）。

---

## 三、代码分析题

### 第 11 题

分析以下代码的事件执行顺序。

```html
<div id="outer">
  <div id="inner"></div>
</div>
<script>
  outer.addEventListener("click", () => console.log("outer bubble"), false);
  inner.addEventListener("click", () => console.log("inner target"), false);
  outer.addEventListener("click", () => console.log("outer capture"), true);
</script>
```

点击 inner 后输出顺序是什么？

**答案**：

```
outer capture
inner target
outer bubble
```

**解析**：
- 捕获阶段：事件从 window → outer → inner，outer 的捕获监听器先执行。
- 目标阶段：inner 的目标监听器执行。
- 冒泡阶段：事件从 inner → outer，outer 的冒泡监听器执行。

---

### 第 12 题

分析以下 CSS 动画的性能差异。

```css
/* A */
.box { width: 100px; transition: width 1s; }
.box:hover { width: 200px; }

/* B */
.box { transform: scaleX(1); transition: transform 1s; }
.box:hover { transform: scaleX(2); }
```

**答案**：B 的性能更好。

**解析**：A 修改 width 会触发重排（Layout），可能引起重绘，性能较差。B 修改 transform 通常只在合成层处理，由 GPU 加速，不触发重排重绘。

---

### 第 13 题

分析以下代码为什么可能导致性能问题。

```js
const list = document.querySelectorAll(".item");
for (let i = 0; i < list.length; i++) {
  const height = list[i].offsetHeight;
  list[i].style.height = height + 10 + "px";
}
```

**答案**：会造成布局抖动（Layout Thrashing）。

**解析**：循环中交替读取 `offsetHeight`（触发强制同步布局）和写入 `style.height`（触发重排），浏览器不得不反复计算布局。优化方案：先批量读取高度，再统一写入，或使用 `requestAnimationFrame`。

---

### 第 14 题

分析以下缓存头的作用。

```
Cache-Control: public, max-age=31536000
ETag: "33a64df5"
```

**答案**：

- `Cache-Control: public, max-age=31536000` 表示资源可以被任何缓存（包括 CDN）缓存一年，一年内直接使用本地缓存，不发请求。
- `ETag` 用于协商缓存，当强缓存过期后，浏览器会带上 `If-None-Match: "33a64df5"` 询问服务器资源是否变化。

**解析**：强缓存优先于协商缓存。max-age 时间内不会发请求；过期后才用 ETag 协商。

---

## 四、编程实践题

### 第 15 题

实现一个简单的事件委托函数 `delegate(parent, eventType, selector, handler)`。

**参考答案**：

```js
function delegate(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}

// 使用
delegate(document.querySelector("ul"), "click", "li", function(e) {
  console.log("点击了", this.textContent);
});
```

**解析**：
- 利用事件冒泡，在父元素上监听事件。
- 通过 `e.target.closest(selector)` 找到匹配选择器的最近祖先。
- 使用 `handler.call(target, e)` 让回调内的 this 指向实际点击的元素。

---

### 第 16 题

实现一个简单的 localStorage 封装，支持设置过期时间。

**参考答案**：

```js
const storage = {
  set(key, value, expireMs) {
    const data = { value, expire: expireMs ? Date.now() + expireMs : null };
    localStorage.setItem(key, JSON.stringify(data));
  },
  get(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.expire && Date.now() > data.expire) {
      localStorage.removeItem(key);
      return null;
    }
    return data.value;
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};
```

**解析**：
- 存储时额外记录过期时间戳。
- 读取时判断是否过期，过期则清理并返回 null。
- 注意 localStorage 只能存字符串，需 JSON 序列化。

---

### 第 17 题

实现一个函数，批量读取元素高度后统一修改，避免布局抖动。

**参考答案**：

```js
function expandItems(selector, delta) {
  const items = document.querySelectorAll(selector);
  // 先批量读取
  const heights = Array.from(items, item => item.offsetHeight);
  // 再批量写入
  requestAnimationFrame(() => {
    items.forEach((item, index) => {
      item.style.height = heights[index] + delta + "px";
    });
  });
}
```

**解析**：
- 先集中读取所有高度，避免读写交替。
- 使用 requestAnimationFrame 在下一帧统一写入，配合浏览器渲染节奏。

---

### 第 18 题

实现一个 Intersection Observer 懒加载图片组件。

**参考答案**：

```js
function lazyLoadImages() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach(img => observer.observe(img));
}
```

**解析**：
- Intersection Observer 监听元素是否进入视口。
- 进入视口后把 `data-src` 赋给 `src` 加载图片。
- 加载完成后取消观察，避免重复触发。

---

### 第 19 题

实现一个简单的 Service Worker 离线缓存策略（Cache First）。

**参考答案**：

```js
const CACHE_NAME = "v1";
const urlsToCache = ["/", "/styles.css", "/app.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

**解析**：
- install 阶段预缓存核心资源。
- fetch 阶段优先从缓存读取，没有命中再发网络请求。
- 实际生产需处理缓存更新、清理旧缓存等。

---

### 第 20 题

用 `requestAnimationFrame` 实现一个平滑滚动到顶部的函数。

**参考答案**：

```js
function scrollToTop(duration = 500) {
  const start = window.scrollY;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
```

**解析**：
- requestAnimationFrame 与屏幕刷新同步，动画更流畅。
- 使用缓动函数让滚动更自然。
- 通过 progress 控制动画进度，避免依赖固定时间间隔。

---

## 练习建议

1. 打开 Chrome DevTools Performance 面板，实际录制页面渲染过程。
2. 在 Layers 面板中观察合成层，理解 will-change 和 transform 的效果。
3. 用 Network 面板验证强缓存和协商缓存的行为。

---

> **领域编号**：F03 浏览器  
> **最后更新**：2026-06-18
