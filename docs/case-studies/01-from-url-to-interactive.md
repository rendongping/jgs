# 跨领域综合案例一：从输入 URL 到页面可交互

> 本案例串联 **网络（F04）+ 浏览器（F03）+ JavaScript（F01）+ 性能（A03）+ 安全（F05）** 五个领域，帮助理解前端全链路。

---

## 场景

用户在浏览器地址栏输入 `https://example.com/product/123`，按下回车。接下来发生了什么？

---

## 阶段一：网络请求（F04 计算机网络）

### 1. URL 解析

浏览器解析 URL：
- 协议：HTTPS
- 域名：example.com
- 路径：/product/123

### 2. DNS 解析

```
用户输入域名 → 浏览器缓存 → 操作系统缓存 → 路由器缓存 → DNS 服务器 → 获取 IP 地址
```

优化点：DNS 预解析（`<link rel="dns-prefetch">`）。

### 3. TCP / TLS 连接

```
TCP 三次握手 → TLS 握手（HTTPS）→ 建立安全连接
```

HTTP/2 和 HTTP/3 可以复用连接，减少握手开销。

### 4. 发送 HTTP 请求

```http
GET /product/123 HTTP/2
Host: example.com
Accept: text/html
Cookie: sessionId=xxx
```

### 5. 服务端响应

```http
HTTP/2 200 OK
Content-Type: text/html
Cache-Control: max-age=3600

<!DOCTYPE html>
<html>...</html>
```

---

## 阶段二：浏览器渲染（F03 浏览器原理）

### 1. 解析 HTML

浏览器从网络线程接收 HTML，交给渲染线程：

```
HTML → DOM Tree
```

### 2. 解析 CSS

```
CSS → CSSOM Tree
```

### 3. 合成 Render Tree

```
DOM + CSSOM → Render Tree
```

### 4. 布局（Layout / Reflow）

计算每个元素的位置和大小。

### 5. 绘制（Paint）

把元素画成像素。

### 6. 合成（Composite）

把不同图层合成最终页面。使用 `transform` 和 `opacity` 可以只触发合成，避免重排重绘。

---

## 阶段三：JavaScript 执行（F01 JavaScript）

### 1. 下载和执行 JS

浏览器遇到 `<script>` 标签时：
- 默认阻塞 HTML 解析。
- 使用 `defer` 或 `async` 可以异步加载。

### 2. 事件循环

JS 是单线程，通过事件循环处理异步任务：

```
同步代码 → 微任务（Promise）→ 宏任务（setTimeout）→ 渲染 → 下一轮
```

### 3. 请求数据

页面初始化后，前端发起 API 请求：

```js
fetch('/api/product/123')
  .then(res => res.json())
  .then(data => renderProduct(data));
```

---

## 阶段四：性能优化（A03 性能工程）

### 1. 首屏优化

- 关键 CSS 内联。
- 关键 JS 延迟加载。
- 图片懒加载。
- 使用 CDN。

### 2. 指标监控

- LCP：最大内容渲染时间。
- FCP：首次内容绘制。
- TTI：可交互时间。

### 3. 缓存策略

- HTML 使用协商缓存（ETag）。
- 静态资源使用强缓存（Cache-Control: max-age=31536000 + hash 文件名）。

---

## 阶段五：安全（F05 Web 安全）

### 1. HTTPS

防止中间人攻击，保证数据传输安全。

### 2. XSS 防护

- 用户输入转义。
- Content Security Policy（CSP）。

### 3. CSRF 防护

- SameSite Cookie。
- CSRF Token。

### 4. 接口安全

- 身份验证（JWT / Session）。
- 权限控制。

---

## 总结

从输入 URL 到页面可交互，前端工程师需要理解：

- 网络如何建立连接、传输数据。
- 浏览器如何解析、布局、绘制页面。
- JavaScript 如何执行和请求数据。
- 性能如何度量、如何优化。
- 安全如何防护。

只有把这些知识点串联起来，才能真正理解前端工作的本质。

---

> **涉及领域**：F01 JavaScript、F03 Browser、F04 Network、F05 Security、A03 Performance  
> **最后更新**：2026-06-18
