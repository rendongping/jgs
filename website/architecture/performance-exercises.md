# 性能工程练习册

## 一、选择题

### 1. 以下哪个指标衡量页面最大可见内容的渲染时间？

A. FCP
B. LCP
C. CLS
D. TTFB

**答案：B**

**解析**：LCP（Largest Contentful Paint）衡量视口中最大可见元素渲染完成的时间。

---

### 2. Core Web Vitals 包括以下哪三个指标？

A. FCP、FID、TTFB
B. LCP、INP、CLS
C. FP、FCP、LCP
D. TBT、TTFB、FID

**答案：B**

**解析**：Google Core Web Vitals 当前为 LCP、INP、CLS。INP 已取代 FID。

---

### 3. 以下哪种操作会触发重排（Reflow）？

A. 修改 color
B. 修改 transform
C. 修改 width
D. 修改 opacity

**答案：C**

**解析**：修改 width、height、margin 等几何属性会触发重排。color 触发重绘，transform 和 opacity 主要触发合成。

---

### 4. 以下哪个缓存头表示资源在 1 小时内可以直接使用本地缓存？

A. Cache-Control: no-cache
B. Cache-Control: no-store
C. Cache-Control: max-age=3600
D. Cache-Control: must-revalidate

**答案：C**

**解析**：max-age=3600 表示资源在 3600 秒内有效，可直接使用缓存。

---

### 5. 防抖（debounce）最适合以下哪个场景？

A. 窗口 resize 事件处理
B. 滚动事件处理
C. 搜索框实时输入
D. 按钮点击

**答案：C**

**解析**：防抖适合事件停止触发后才执行的场景，如搜索框输入后触发搜索。resize 和滚动更适合节流。

---

## 二、填空题

### 6. FCP 的全称是 ______，表示浏览器首次渲染出有意义内容的时间。

**答案**：First Contentful Paint

**解析**：FCP 是 First Contentful Paint 的缩写。

---

### 7. 浏览器渲染流程中，修改元素的几何属性会触发 ______，代价较高。

**答案**：重排 / Reflow / Layout

**解析**：几何属性变化会导致浏览器重新计算布局，即重排。

---

### 8. Service Worker 的 ______ 策略表示优先使用缓存，缓存没有时再去请求网络。

**答案**：Cache First

**解析**：Cache First 策略优先命中缓存，适合不经常变化的静态资源。

---

### 9. 使用 CSS 的 ______ 属性可以提示浏览器哪些元素即将变化，从而提前优化渲染。

**答案**：will-change

**解析**：will-change 告知浏览器元素将发生变化，浏览器可以提前做优化。但要谨慎使用。

---

### 10. 图片懒加载可以使用 HTML 原生的 ______ 属性。

**答案**：loading="lazy"

**解析**：现代浏览器支持 `<img loading="lazy">` 原生懒加载。

---

## 三、代码分析题

### 11. 分析以下代码的性能问题，并给出优化方案。

```javascript
function handleScroll() {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.style.width = box.offsetWidth + 1 + 'px';
    box.style.height = box.offsetHeight + 1 + 'px';
  });
}

window.addEventListener('scroll', handleScroll);
```

**答案与解析**：

问题：

1. **滚动事件高频触发**，导致大量计算和 DOM 操作。
2. **读写交错**：读取 offsetWidth/offsetHeight 会强制重排，随后修改 style 再次触发重排。
3. **未节流**：滚动事件每秒触发几十次。
4. **事件监听未清理**：可能导致内存泄漏。

优化：

```javascript
function handleScroll() {
  const boxes = document.querySelectorAll('.box');
  requestAnimationFrame(() => {
    boxes.forEach(box => {
      const width = box.offsetWidth;
      const height = box.offsetHeight;
      box.style.cssText = `width: ${width + 1}px; height: ${height + 1}px;`;
    });
  });
}

window.addEventListener('scroll', throttle(handleScroll, 16));
```

进一步建议：如果动画效果允许，使用 `transform: scale()` 替代修改 width/height。

---

### 12. 以下是一个图片加载方案，指出可以优化的地方。

```html
<img src="large-photo.jpg" width="800" height="600" alt="photo">
```

**答案与解析**：

问题：

1. 没有使用现代图片格式（WebP/AVIF）。
2. 没有响应式图片，所有设备都加载 800px 大图。
3. 没有懒加载，首屏就加载。
4. 没有压缩，文件体积可能很大。
5. 没有指定 decoding="async" 或 fetchpriority。

优化：

```html
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img
    src="photo.jpg"
    srcset="photo-400.jpg 400w, photo-800.jpg 800w"
    sizes="(max-width: 600px) 400px, 800px"
    loading="lazy"
    decoding="async"
    width="800"
    height="600"
    alt="photo"
  >
</picture>
```

---

### 13. 分析以下缓存配置，说明其对性能的影响。

```nginx
location /static/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
```

**答案与解析**：

- **public**：允许 CDN 等中间节点缓存。
- **max-age=31536000**：缓存一年，浏览器几乎不会再发起请求。
- **immutable**：告知浏览器文件内容不会改变，即使刷新也不重新验证。

影响：

- 静态资源加载极快，充分利用缓存。
- 风险：如果文件内容更新但文件名未变，用户可能长期不更新。
- 最佳实践：配合文件名哈希（如 app.abc123.js）使用，更新时文件名变化。

---

## 四、架构设计题

### 14. 设计一个电商首页的性能优化方案，列出关键优化点和指标目标。

**参考答案**：

关键优化点：

1. **首屏资源优化**
   - 关键 CSS 内联，非关键 CSS 异步加载。
   - 首屏 JS 代码分割，按需加载。
   - 首屏图片使用 WebP/AVIF，响应式尺寸，懒加载非首屏图片。

2. **网络优化**
   - 静态资源上 CDN。
   - 开启 HTTP/2 或 HTTP/3。
   - 开启 Brotli/Gzip 压缩。
   - 使用 preconnect/prefetch/preload。

3. **渲染优化**
   - 骨架屏提升 perceived performance。
   - 避免布局偏移，图片指定 width/height。
   - 长列表使用虚拟列表。

4. **缓存策略**
   - 静态资源长期缓存 + 文件名哈希。
   - API 数据合理缓存。
   - Service Worker 缓存核心资源。

5. **监控**
   - RUM 监控 LCP、INP、CLS。
   - 建立性能预算和告警。

指标目标：

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1
- 首屏 JS ≤ 200KB（gzip 后）

---

### 15. 你如何建立团队的前端性能监控体系？

**参考答案**：

1. **采集指标**：使用 Web Vitals 库采集 LCP、INP、CLS、FCP、TTFB。
2. **上报数据**：通过日志服务或 RUM 平台（如 Sentry、Datadog、阿里云 ARMS）上报。
3. **建立看板**：按页面、设备、网络、地域维度展示性能数据。
4. **设置阈值**：定义 P50/P75/P95 分位数的告警线。
5. **性能预算**：在 CI 中限制 bundle 大小、请求数。
6. **问题定位**：结合 Source Map 和 Trace 定位慢请求、长任务、布局偏移。
7. **持续优化**：定期复盘，把性能指标纳入迭代目标。

---

### 16. 一个后台管理系统页面有大量表格数据，用户反馈卡顿。请给出优化方案。

**参考答案**：

1. **虚拟列表**：只渲染视口内行，如 react-window 或 vue-virtual-scroller。
2. **分页或无限滚动**：避免一次性加载全部数据。
3. **列懒渲染**：复杂列按需渲染。
4. **减少重渲染**：使用 memo/useMemo/useCallback 避免不必要渲染。
5. **大数据量处理**：排序/过滤放后端或使用 Web Worker。
6. **表格骨架屏**：加载时减少白屏焦虑。
7. **监控长任务**：用 Performance Observer 定位阻塞主线程的操作。

---

### 17. 对比 HTTP 缓存的强缓存和协商缓存。

**参考答案**：

| 类型 | 触发条件 | 状态码 | 请求次数 |
|------|---------|--------|---------|
| 强缓存 | Cache-Control/Expires 未过期 | 200 (from cache) | 0 |
| 协商缓存 | 强缓存过期，带 ETag/Last-Modified 验证 | 304 Not Modified / 200 | 1 |

强缓存性能更好，但更新控制粒度粗；协商缓存能确保资源最新，但仍有请求开销。通常配合文件名哈希实现长期强缓存。

---

> **领域编号**：A03 性能工程  
> **最后更新**：2026-06-18
