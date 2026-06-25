# 网络练习册

> 每道题后附答案与解析，建议先独立完成再对照。

---

## 一、选择题

### 第 1 题

OSI 七层模型中，HTTP 属于哪一层？

A. 传输层  
B. 网络层  
C. 应用层  
D. 会话层

::: details 查看答案与解析
**答案：C**

**解析**：HTTP 是应用层协议，直接为用户应用提供服务。传输层典型协议是 TCP/UDP，网络层是 IP。
:::

---

### 第 2 题

TCP 三次握手的主要目的是什么？

A. 加速数据传输  
B. 确认双方收发能力正常，防止历史连接请求造成错误  
C. 压缩数据  
D. 直接开始传输数据

::: details 查看答案与解析
**答案：B**

**解析**：三次握手是为了同步双方初始序列号，确认双方都能收发数据。两次握手无法确认客户端的接收能力，也可能因网络延迟导致已失效的连接请求被服务器误处理。
:::

---

### 第 3 题

HTTP/2 相比 HTTP/1.1 最重要的改进是什么？

A. 使用 UDP 代替 TCP  
B. 支持多路复用，一个 TCP 连接可并行传输多个请求  
C. 不支持头部压缩  
D. 完全解决了队头阻塞

::: details 查看答案与解析
**答案：B**

**解析**：HTTP/2 通过二进制分帧和多路复用，解决了 HTTP/1.1 的队头阻塞。但 TCP 层的队头阻塞仍然存在，HTTP/3 基于 QUIC/UDP 才基本解决。
:::

---

### 第 4 题

以下哪种 DNS 记录用于把域名映射到 IPv4 地址？

A. CNAME  
B. MX  
C. A  
D. TXT

::: details 查看答案与解析
**答案：C**

**解析**：A 记录是 Address 记录，把域名解析为 IPv4 地址。AAAA 对应 IPv6，CNAME 是别名，MX 是邮件交换记录，TXT 是文本记录。
:::

---

### 第 5 题

关于 WebSocket，以下说法正确的是？

A. WebSocket 基于 HTTP 长轮询  
B. WebSocket 连接建立后仍使用 HTTP 协议通信  
C. WebSocket 通过 HTTP 升级握手建立全双工 TCP 连接  
D. WebSocket 不能跨域

::: details 查看答案与解析
**答案：C**

**解析**：WebSocket 先通过 HTTP 协议发送 Upgrade 请求，服务器返回 101 后升级为 WebSocket 协议，之后使用独立的帧格式全双工通信。
:::

---

## 二、填空题

### 第 6 题

TCP/IP 四层模型从上到下依次是：应用层、______、网络层、网络接口层。

::: details 查看答案与解析
**答案：传输层**

**解析**：TCP/IP 模型四层为应用层、传输层、网络层、网络接口层。
:::

---

### 第 7 题

HTTP 状态码中，______ 表示请求成功，______ 表示资源未找到，______ 表示服务器内部错误。

::: details 查看答案与解析
**答案：`200`、`404`、`500`**

**解析**：2xx 表示成功，4xx 表示客户端错误，5xx 表示服务器错误。常见：200 OK、404 Not Found、500 Internal Server Error。
:::

---

### 第 8 题

CDN 的核心思想是把内容缓存到离用户最近的 ______ 节点，从而降低访问延迟。

::: details 查看答案与解析
**答案：边缘（Edge）**

**解析**：CDN 通过在全球部署边缘节点，让用户就近获取资源。边缘节点未命中时回源站获取。
:::

---

### 第 9 题

RESTful 设计中，创建资源通常使用 HTTP 的 ______ 方法，删除资源通常使用 ______ 方法。

::: details 查看答案与解析
**答案：`POST`、`DELETE`**

**解析**：RESTful 用 URL 表示资源，用 HTTP 方法表示操作。POST 创建、GET 查询、PUT/PATCH 更新、DELETE 删除。
:::

---

### 第 10 题

HTTPS 在 HTTP 和 TCP 之间加入了 ______ 协议层，用于加密通信。

::: details 查看答案与解析
**答案：TLS（Transport Layer Security）/ SSL**

**解析**：HTTPS = HTTP + TLS。TLS 提供加密、身份认证和数据完整性保护。
:::

---

## 三、代码分析题

### 第 11 题

分析以下 HTTP 响应头，说明缓存行为。

```
Cache-Control: max-age=3600, must-revalidate
ETag: "abc123"
```

::: details 查看答案与解析
**答案**：

- `max-age=3600`：资源在 3600 秒（1 小时）内可直接使用本地缓存，不发请求。
- `must-revalidate`：缓存过期后必须向服务器验证，不能使用过期缓存。
- `ETag`：用于协商缓存，过期后浏览器会带 `If-None-Match` 询问服务器。

**解析**：强缓存和协商缓存可共存。max-age 控制强缓存，ETag 控制协商缓存。
:::

---

### 第 12 题

下面 RESTful API 设计有哪些问题？

```
GET /getUser?id=123
POST /deleteUser
GET /users/delete/123
```

::: details 查看答案与解析
**答案**：

- `/getUser?id=123`：URL 中不应包含动词 `get`，应改为 `GET /users/123`。
- `POST /deleteUser`：不应使用 POST + 动词表示删除，应改为 `DELETE /users/123`。
- `GET /users/delete/123`：GET 方法不应用于删除操作，且 URL 中不应有 `delete` 动词。

**解析**：RESTful 设计强调用 URL 表示资源，用 HTTP 方法表示动作，保持语义清晰。
:::

---

### 第 13 题

分析 TCP 四次挥手为什么需要四次，而不是三次。

::: details 查看答案与解析
**答案**：

TCP 是全双工通信，双方都有独立的发送和接收通道。关闭连接时：
1. 主动方发送 FIN，表示不再发送数据（但仍可接收）。
2. 被动方 ACK 确认。
3. 被动方处理完数据后也发送 FIN。
4. 主动方 ACK 确认。

因为被动方可能还有数据要发送，所以不能把 ACK 和 FIN 合并，需要四次。

**解析**：三次握手可以合并 SYN+ACK，是因为双方同时开始连接。四次挥手双方关闭时机不同，无法合并。
:::

---

### 第 14 题

分析 GraphQL 查询相比 REST 的优势和不足。

```graphql
query {
  user(id: 1) { name posts { title } }
}
```

::: details 查看答案与解析
**答案**：

优势：
- 一次请求获取用户信息和文章列表，避免多次 REST 调用。
- 客户端精确指定字段，避免过度获取。

不足：
- 服务器需要实现解析器和 Schema，复杂度增加。
- HTTP 缓存不如 REST 成熟。
- 错误处理、文件上传需要额外设计。

**解析**：GraphQL 适合复杂数据聚合场景，REST 适合简单、缓存友好的场景，应结合实际选择。
:::

---

## 四、编程实践题

### 第 15 题

实现一个简单的 fetch 超时封装。

::: details 查看答案与解析
**参考答案**：

```js
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout)
    )
  ]);
}
```

**解析**：
- 使用 `Promise.race` 让 fetch 和定时器竞争。
- 超时时间内 fetch 未完成则 reject。
- 生产环境建议配合 AbortController 取消请求，避免资源浪费。
:::

---

### 第 16 题

实现一个带重试机制的 fetch 函数。

::: details 查看答案与解析
**参考答案**：

```js
async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
  let lastError;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      lastError = err;
      if (i < maxRetries) await new Promise(r => setTimeout(r, delay));
    }
  }
  throw lastError;
}
```

**解析**：
- 循环执行 fetch，失败则等待后重试。
- 达到最大重试次数后抛出最后一次错误。
- 实际项目中应根据错误类型决定是否重试（如 4xx 不应重试）。
:::

---

### 第 17 题

实现一个简单的 WebSocket 重连封装。

::: details 查看答案与解析
**参考答案**：

```js
class ReconnectingWebSocket {
  constructor(url, options = {}) {
    this.url = url;
    this.maxRetries = options.maxRetries || 5;
    this.retryDelay = options.retryDelay || 1000;
    this.retries = 0;
    this.listeners = {};
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = (e) => {
      this.retries = 0;
      this.emit("open", e);
    };
    this.ws.onmessage = (e) => this.emit("message", e);
    this.ws.onclose = () => this.reconnect();
    this.ws.onerror = (e) => this.emit("error", e);
  }

  reconnect() {
    if (this.retries >= this.maxRetries) {
      this.emit("maxretry");
      return;
    }
    this.retries++;
    setTimeout(() => this.connect(), this.retryDelay * this.retries);
  }

  send(data) { this.ws.send(data); }
  on(event, handler) { this.listeners[event] = handler; }
  emit(event, data) { this.listeners[event]?.(data); }
}
```

**解析**：
- 监听 onclose 自动重连。
- 限制最大重试次数，采用退避策略避免频繁重连。
- 实际生产还需处理心跳、消息队列等。
:::

---

### 第 18 题

实现一个简单的 RESTful 客户端方法。

::: details 查看答案与解析
**参考答案**：

```js
class HttpClient {
  constructor(baseURL) { this.baseURL = baseURL; }

  async request(method, path, data) {
    const options = {
      method,
      headers: { "Content-Type": "application/json" }
    };
    if (data) options.body = JSON.stringify(data);
    const res = await fetch(`${this.baseURL}${path}`, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  get(path) { return this.request("GET", path); }
  post(path, data) { return this.request("POST", path, data); }
  put(path, data) { return this.request("PUT", path, data); }
  patch(path, data) { return this.request("PATCH", path, data); }
  delete(path) { return this.request("DELETE", path); }
}
```

**解析**：
- 封装通用请求方法。
- 提供 RESTful 常用方法。
- 生产环境需补充错误处理、拦截器、取消请求等。
:::

---

### 第 19 题

实现一个 DNS 预解析和预连接的 HTML 片段。

::: details 查看答案与解析
**参考答案**：

```html
<head>
  <link rel="dns-prefetch" href="//cdn.example.com">
  <link rel="preconnect" href="https://cdn.example.com">
  <link rel="prefetch" href="https://example.com/next-page.html">
</head>
```

**解析**：
- `dns-prefetch`：提前解析域名。
- `preconnect`：提前建立 TCP/TLS 连接。
- `prefetch`：提前下载下一个页面可能用到的资源。
- 注意不要滥用，否则浪费带宽。
:::

---

### 第 20 题

实现一个请求合并函数：对于相同的 GET 请求，在并发场景下只发一次网络请求。

::: details 查看答案与解析
**参考答案**：

```js
function createDeduplicatedFetch() {
  const pending = new Map();

  return function dedupFetch(url) {
    if (pending.has(url)) return pending.get(url);

    const promise = fetch(url)
      .then(res => res.json())
      .finally(() => pending.delete(url));

    pending.set(url, promise);
    return promise;
  };
}

const fetchOnce = createDeduplicatedFetch();
Promise.all([fetchOnce("/api/user"), fetchOnce("/api/user")])
  .then(([a, b]) => console.log(a === b)); // true，只发一次请求
```

**解析**：
- 用 Map 缓存正在进行的请求 Promise。
- 相同 URL 的并发请求共享同一个 Promise。
- 请求完成后从 Map 中移除。
:::

---

### 第 16 题

为以下 RESTful 接口选择合适的 HTTP 状态码：

1. 用户成功登录并返回 Token。
2. 用户请求的管理员接口，但当前用户只是普通角色。
3. 请求体中手机号格式错误。
4. 后端数据库连接失败。
5. 客户端在 1 秒内请求了 100 次接口。

::: details 查看答案与解析
**参考答案**：

1. **200 OK**（或 201 Created，如果认为登录创建了会话资源）。
2. **403 Forbidden**。
3. **400 Bad Request**。
4. **500 Internal Server Error**（不应暴露具体数据库错误）。
5. **429 Too Many Requests**。

**解析**：
- 401 是未认证，403 是已认证但无权限。
- 参数校验失败用 400。
- 服务端内部异常用 500 系列。
- 限流用 429。
:::

---

### 第 17 题

补全 WebRTC 获取本地摄像头并展示的基本代码。

```js
async function startLocalVideo(videoElement) {
  const stream = await navigator.mediaDevices.________({
    video: true,
    audio: true
  });
  videoElement.srcObject = stream;
}
```

::: details 查看答案与解析
**参考答案**：

横线处应填入 `getUserMedia`。

完整代码：

```js
async function startLocalVideo(videoElement) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });
  videoElement.srcObject = stream;
}
```

**解析**：
- `getUserMedia` 用于获取用户的摄像头和麦克风媒体流。
- 需要在 HTTPS 或 localhost 环境下调用。
- 调用前应考虑权限处理和错误捕获。
:::

---

## 练习建议

1. 使用 Wireshark 或 Chrome Network 面板观察 TCP 握手和 HTTP/2 帧。
2. 搭建本地 HTTP/2 或 WebSocket 服务，验证协议行为。
3. 分析自己项目的网络请求，找出可优化点（如重复请求、缓存策略）。
4. 用 WebRTC 实现一个本地双人视频通话 Demo。

---

> **领域编号**：F04 网络  
> **最后更新**：2026-06-24
