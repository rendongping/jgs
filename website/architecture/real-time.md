# 实时与协同架构：从即时通讯到协同编辑

> 目标：掌握实时通信方案选型、长连接治理、协同编辑与数据同步架构设计。

---

## 核心要点（TL;DR）

- 实时通信方案包括轮询、长轮询、Server-Sent Events（SSE）、WebSocket 和 WebRTC，选型取决于实时性、双向性和场景。
- WebSocket 适合双向高频通信，SSE 适合服务端向客户端的单向推送。
- 长连接需要专门治理：心跳保活、重连策略、连接 multiplexing、负载均衡。
- 协同编辑的核心是冲突解决，常用 OT（Operational Transformation）和 CRDT。
- 实时系统的可观测性比功能更重要：需要监控连接数、消息延迟、断线率。

---

## 学习时长与前置知识

- **建议学习时长**：3-4 周（每周投入 6-8 小时）
- **前置知识**：网络协议（F04）、Node.js/BFF（E10）、数据状态管理（A05）

---

## 一、实时通信方案对比

| 方案 | 方向 | 实时性 | 适用场景 |
|------|------|--------|---------|
| 轮询 | 客户端主动 | 低 | 简单查询 |
| 长轮询 | 客户端主动 | 中 | 聊天室早期实现 |
| SSE | 服务端 → 客户端 | 高 | 股票行情、通知推送 |
| WebSocket | 双向 | 高 | 即时通讯、游戏、协同编辑 |
| WebRTC | P2P 双向 | 高 | 音视频通话、文件传输 |

### 1.1 WebSocket

```js
const ws = new WebSocket('wss://api.example.com/chat');

ws.onopen = () => ws.send(JSON.stringify({ type: 'join', roomId: '1' }));
ws.onmessage = (event) => console.log(JSON.parse(event.data));
ws.onclose = () => reconnect();
```

优点：全双工、低延迟、头部开销小。
缺点：需要单独协议和基础设施，代理/防火墙可能干扰。

### 1.2 SSE

```js
const source = new EventSource('/api/events');
source.onmessage = (event) => console.log(event.data);
source.onerror = () => console.error('SSE error');
```

优点：基于 HTTP，自动重连，适合服务端推送。
缺点：仅支持服务端到客户端单向。

### 1.3 选型建议

- 单向通知/推送：SSE。
- 双向高频交互：WebSocket。
- 音视频/文件 P2P：WebRTC。
- 兼容老环境/简单场景：长轮询。

---

## 二、长连接治理

### 2.1 心跳与保活

```js
// 客户端心跳
setInterval(() => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'ping' }));
  }
}, 30000);
```

心跳目的：
- 检测连接是否存活。
- 防止 NAT/代理超时断开。

### 2.2 重连策略

```js
function reconnect() {
  const delay = Math.min(1000 * 2 ** attempts, 30000);
  setTimeout(() => {
    attempts++;
    connect();
  }, delay);
}
```

重连策略要点：
- 指数退避，避免洪泛。
- 最大重试次数或无限重试。
- 断线期间消息缓存和补发。

### 2.3 连接复用

一个页面多个实时功能时，避免创建多个 WebSocket：

```
单一 WebSocket 连接
    ├── 消息路由到聊天模块
    ├── 消息路由到通知模块
    └── 消息路由到协同编辑模块
```

### 2.4 服务端架构

```
客户端 → Load Balancer → WebSocket 服务器集群
                              ↓
                         Redis Pub/Sub（房间状态广播）
                              ↓
                         业务服务（消息持久化）
```

要点：
- 使用 sticky session 或共享状态实现跨节点广播。
- 水平扩展 WebSocket 服务器。
- 消息持久化用于断线重连补发。

---

## 三、协同编辑架构

### 3.1 核心问题

多人同时编辑同一文档时，需要解决：
- 操作冲突
- 顺序不一致
- 最终一致性

### 3.2 OT（Operational Transformation）

OT 通过变换操作来保持文档一致性：

```
用户 A：在位置 3 插入 "x"
用户 B：在位置 5 删除 "y"
服务端根据操作顺序变换，保证最终一致
```

优点：成熟，Google Docs 等使用。
缺点：实现复杂，对离线支持较弱。

### 3.3 CRDT（Conflict-free Replicated Data Type）

CRDT 通过数据结构本身的数学特性保证最终一致，无需中央协调。

优点：
- 天然支持离线编辑。
- 实现相对简单。
- 去中心化。

代表库：Yjs、Automerge。

### 3.4 选型建议

| 场景 | 推荐 |
|------|------|
| 中心化、强一致 | OT |
| 去中心化、离线优先 | CRDT |
| 快速实现 | CRDT（Yjs） |

---

## 四、实时数据同步

### 4.1 状态同步模式

| 模式 | 说明 | 示例 |
|------|------|------|
| 全量同步 | 每次同步完整状态 | 简单聊天列表 |
| 增量同步 | 只同步变更操作 | 协同编辑 |
| 快照 + 增量 | 定期快照 + 持续增量 | 游戏状态 |

### 4.2 消息可靠性

- 消息确认机制（ACK）。
- 消息去重（唯一消息 ID）。
- 断线重连后补发未确认消息。

### 4.3 顺序保证

- 服务端统一分配序列号。
- 或使用向量时钟（Vector Clock）处理并发。

---

## 五、可观测性与稳定性

### 5.1 关键指标

| 指标 | 说明 |
|------|------|
| 连接数 | 当前在线连接数 |
| 消息延迟 | 从发送到接收的耗时 |
| 断线率 | 单位时间内异常断开比例 |
| 重连成功率 | 断线后成功恢复比例 |
| 消息丢失率 | 未送达消息比例 |

### 5.2 监控与告警

- WebSocket 服务端埋点。
- 客户端上报连接质量和延迟。
- 设置断线率、延迟阈值告警。

---

## 六、常见误区与反模式

| 误区 | 说明 | 正确做法 |
|------|------|---------|
| "所有实时场景都用 WebSocket" | SSE 在单向推送场景更简单 | 根据方向选型 |
| "忽略重连和消息丢失" | 网络不稳定时用户体验差 | 设计完善的重连和补发机制 |
| "不考虑服务端扩展" | 单节点无法支撑大规模连接 | 设计集群和共享状态 |
| "协同编辑直接覆盖" | 会丢失用户操作 | 使用 OT 或 CRDT |

---

## 七、最佳实践

1. **按场景选型**：SSE 单向、WebSocket 双向、WebRTC P2P。
2. **心跳保活**：防止连接被中间设备断开。
3. **指数退避重连**：避免服务端被重连风暴压垮。
4. **消息确认与去重**：保证消息可靠性。
5. **连接复用**：减少资源消耗。
6. **监控先行**：实时系统需要全面的可观测性。

---

## 八、相关领域

- [F04 Network](../foundation/network)：TCP、HTTP、WebSocket 协议
- [E10 Node.js/BFF](../engineering/node-bff)：服务端实现、消息队列
- [A05 Data & State](./data-state)：状态同步、缓存策略
- [A06 Observability](./observability)：监控、告警

---

## 九、延伸阅读

- 🟢 [MDN：WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
- 🟡 [SSE 规范](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- 🟡 [Yjs 文档](https://docs.yjs.dev/)
- 🔴 [CRDT 论文与资源](https://crdt.tech/)

---

**标签**：`#real-time` `#websocket` `#sse` `#crdt` `#ot` `#collaborative-editing`

> **最后更新**：2026-06-25


---

## 本领域学习进度

<MarkComplete domainId="real-time" />
<ProgressTracker />
