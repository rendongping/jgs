# 实时与协同架构练习册

> 通过练习掌握实时通信方案、长连接治理、协同编辑与数据同步。

---

## 难度分级

- ：基础：理解概念，能选型。
- ：进阶：能设计实时通信方案。
- ：深入：能设计协同编辑和实时系统架构。

---

## 一、选择题

### 第 1 题（ ）

以下哪种方案最适合服务端向客户端单向推送股票行情？

A. WebSocket
B. SSE
C. 长轮询
D. WebRTC

### 第 2 题（ ）

WebSocket 相比 HTTP 轮询的主要优势是？

A. 更安全
B. 全双工、低延迟
C. 更简单
D. 兼容性更好

### 第 3 题（ ）

协同编辑中，CRDT 的主要优势是？

A. 需要中央服务器协调
B. 天然支持离线编辑和最终一致性
C. 实现比 OT 更复杂
D. 只支持文本编辑

### 第 4 题（ ）

长连接重连策略中，指数退避的主要目的是？

A. 加快重连速度
B. 避免服务端被重连风暴压垮
C. 减少内存占用
D. 提高消息实时性

### 第 5 题（ ）

在 WebSocket 集群中，跨节点广播消息通常使用什么？

A. 本地内存
B. Redis Pub/Sub
C. HTTP 请求
D. 文件系统

### 第 6 题（ ）

WebSocket 和 SSE 的关键区别是什么？

A. WebSocket 支持双向通信，SSE 仅服务端到客户端
B. SSE 比 WebSocket 快
C. WebSocket 只能传输二进制
D. SSE 需要独立协议

### 第 7 题（ ）

以下哪种场景更适合使用 SSE 而非 WebSocket？

A. 在线游戏
B. 股票行情推送
C. 即时通讯
D. 协同编辑

### 第 8 题（ ）

OT（Operational Transformation）和 CRDT 的主要区别是？

A. OT 不需要服务器
B. CRDT 天然支持离线编辑和去中心化
C. OT 无法处理并发
D. CRDT 只能处理文本

### 第 9 题（ ）

在 WebSocket 帧结构中，客户端发往服务端的数据必须设置哪个标志位？

A. FIN
B. MASK
C. RSV1
D. Opcode

### 第 10 题（ ）

WebRTC DataChannel 相比 WebSocket 的主要优势是？

A. 更简单实现
B. 支持 P2P 直连，延迟更低
C. 兼容性更好
D. 无需信令服务器

### 第 11 题（ ）

以下哪种一致性模型最适合离线优先的协同编辑应用？

A. 强一致性
B. 最终一致性（Eventual Consistency）
C. 线性一致性
D. 因果一致性

### 第 12 题（ ）

在 Presence（在线状态）系统中，推荐使用什么方式判断用户离线？

A. 用户主动发送离线请求
B. TTL 超时自动标记离线
C. 服务端定时轮询客户端
D. 客户端检测到断网后上报

### 第 13 题（ ）

关于 WebSocket 连接复用的最佳实践是？

A. 每个功能模块创建独立 WebSocket 连接
B. 单一 WebSocket 连接 + 消息路由
C. 所有页面共享一个连接
D. 禁用 WebSocket，使用轮询

### 第 14 题（ ）

LWW（Last Writer Wins）冲突解决策略的缺点是？

A. 实现复杂
B. 可能丢失较晚时间戳但语义正确的写操作
C. 不支持分布式
D. 需要中心化协调

### 第 15 题（ ）

在 WebSocket 集群中，使用一致哈希（Consistent Hashing）的主要好处是？

A. 提高消息吞吐量
B. 扩缩容时最小化受影响的连接数
C. 简化代码实现
D. 降低内存使用

---

## 二、代码分析题

### 第 16 题（ ）

分析以下 WebSocket 代码的问题：

```js
const ws = new WebSocket('wss://api.example.com/chat');
ws.onmessage = (e) => console.log(e.data);
```

### 第 17 题（ ）

设计一个可靠的消息发送机制，要求：
- 消息不重不漏
- 断线后能补发未确认消息
- 支持消息去重

### 第 18 题（ ）

分析以下消息 ID 生成方案的正确性：

```js
class MessageIdGenerator {
  constructor() {
    this.counter = 0;
  }

  next() {
    return Date.now().toString(36) + '-' + (this.counter++);
  }
}
```

---

## 三、设计/开放题

### 第 19 题（ ）

为一个在线客服系统选择实时通信方案，说明理由。

### 第 20 题（ ）

设计一个多人文档协同编辑系统的架构，要求：
- 支持离线编辑
- 冲突自动解决
- 最终一致性

### 第 21 题（ ）

设计一个 10 万人在线直播弹幕系统的实时架构。

### 第 22 题（ ）

设计一个 WebSocket 连接管理方案，要求：
- 自动重连（指数退避 + 抖动）
- 心跳保活
- 消息确认与补发
- 连接质量监控上报

### 第 23 题（ ）

设计一个 Presence（在线状态）系统，支持：
- 实时显示用户在线/离线
- 用户多设备登录
- 心跳检测自动离线


---

## 参考答案

### 第 1 题

::: details 查看答案与解析
**答案：B**

SSE 基于 HTTP，适合服务端向客户端单向推送，如股票行情、通知。
:::

### 第 2 题

::: details 查看答案与解析
**答案：B**

WebSocket 建立后是全双工连接，延迟低，头部开销小。
:::

### 第 3 题

::: details 查看答案与解析
**答案：B**

CRDT 通过数据结构特性保证最终一致，天然支持离线编辑和去中心化。
:::

### 第 4 题

::: details 查看答案与解析
**答案：B**

指数退避避免大量客户端同时重连导致服务端过载。
:::

### 第 5 题

::: details 查看答案与解析
**答案：B**

Redis Pub/Sub 是 WebSocket 集群跨节点广播的常用方案。
:::

### 第 6 题

::: details 查看答案与解析
**答案：A**

WebSocket 是全双工协议，支持客户端和服务端双向通信；SSE 仅支持服务端向客户端单向推送。SSE 的优势在于基于 HTTP 协议，浏览器原生支持自动重连。
:::

### 第 7 题

::: details 查看答案与解析
**答案：B**

股票行情推送是典型的服务端到客户端单向推送场景，SSE 实现简单且浏览器原生支持。在线游戏和即时通讯需要双向通信，协同编辑也需要双向同步。
:::

### 第 8 题

::: details 查看答案与解析
**答案：B**

CRDT 通过数据结构本身的数学性质保证最终一致性，各副本可独立修改后合并，天然支持离线编辑。OT 需要中心化服务端对操作进行变换来保证一致性。
:::

### 第 9 题

::: details 查看答案与解析
**答案：B**

WebSocket 协议规定，客户端发往服务端的数据帧必须设置 MASK 标志位，并对载荷数据进行掩码处理，这是为了防止缓存污染攻击。服务端发往客户端的数据不需要掩码。
:::

### 第 10 题

::: details 查看答案与解析
**答案：B**

WebRTC DataChannel 建立 P2P 直连，数据不经过服务器中转，因此延迟更低，适合文件传输、实时游戏等场景。缺点是需要 STUN/TURN 服务器进行 NAT 穿透，实现复杂度高。
:::

### 第 11 题

::: details 查看答案与解析
**答案：B**

离线优先的协同编辑应用需要各副本独立修改后合并，最终一致性（Eventual Consistency）允许各副本暂时不一致，但最终会收敛到一致状态。CRDT 是实现最终一致性的典型方案。
:::

### 第 12 题

::: details 查看答案与解析
**答案：B**

Presence 系统通常使用 TTL（Time To Live）机制：客户端定期发送心跳续期，TTL 到期自动标记离线。这种方式不需要精确的断线检测，实现简单且容错性好。
:::

### 第 13 题

::: details 查看答案与解析
**答案：B**

最佳实践是使用单一 WebSocket 连接承载多个功能模块，通过消息路由分发。避免每个功能创建一个连接，减少资源消耗和服务端连接压力。
:::

### 第 14 题

::: details 查看答案与解析
**答案：B**

LWW 以最后写入为准，可能丢失语义上正确的操作。例如用户先修改 A 字段再修改 B 字段，如果 B 的修改先到达服务端，A 的修改后到达，按照 LWW 规则 B 的修改会被 A 覆盖，但正确的语义应该是先看到 A 再看到 B。
:::

### 第 15 题

::: details 查看答案与解析
**答案：B**

一致哈希在节点扩缩容时，只影响哈希环上相邻节点的连接映射，最小化受影响的连接数。相比普通哈希取模（增加节点后几乎所有连接都受影响），一致哈希的扩展性更好。
:::

### 第 16 题

::: details 查看答案与解析
**问题分析**：

代码存在以下问题：
1. 没有处理 onopen 事件，连接未就绪可能发送消息
2. 没有处理 onclose 和 onerror，断线后无法重连
3. 没有心跳保活机制，可能被 NAT/代理断开
4. 没有消息确认和重试机制，消息可能丢失
5. 没有消息解析错误处理，非法数据会导致异常

**改进建议**：

```js
class SafeWebSocket {
  constructor(url) {
    this.url = url;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => this.onConnected();
    this.ws.onmessage = (e) => this.onMessage(e);
    this.ws.onclose = () => this.reconnect();
    this.ws.onerror = () => this.ws.close();
  }

  onConnected() {
    this.heartbeat();
    this.joinRoom();
  }

  onMessage(event) {
    try {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    } catch (e) {
      console.error('消息解析失败:', e);
    }
  }

  reconnect() {
    setTimeout(() => this.connect(), 3000);
  }
}
```
:::

### 第 17 题

::: details 查看答案与解析
**参考实现要点**：

```js
class ReliableWebSocket {
  constructor(url) {
    this.url = url;
    this.pendingMessages = new Map();
    this.messageId = 0;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => this.resendPending();
    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === 'ack') {
        this.pendingMessages.delete(msg.id);
      }
    };
    this.ws.onclose = () => setTimeout(() => this.connect(), 1000);
  }

  send(data) {
    const id = ++this.messageId;
    const msg = { id, data, type: 'msg' };
    this.pendingMessages.set(id, msg);
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  resendPending() {
    this.pendingMessages.forEach(msg => {
      this.ws.send(JSON.stringify(msg));
    });
  }
}
```

关键设计点：
- 每个消息分配唯一 ID，用于去重和确认
- 发送前存入 pending 队列，收到 ACK 后移除
- 重连后重发 pending 队列中的所有消息
- 服务端需要校验消息 ID，重复消息不处理
- 设置 ACK 超时，超时未确认触发重发

:::

### 第 18 题

::: details 查看答案与解析
**答案：有缺陷**

```js
class MessageIdGenerator {
  constructor() {
    this.counter = 0;
  }

  next() {
    return Date.now().toString(36) + '-' + (this.counter++);
  }
}
```

问题分析：
1. **无持久化**：页面刷新后 counter 重置，可能生成重复 ID
2. **时间精度问题**：同一毫秒内生成多个 ID，时间戳前缀相同
3. **无客户端标识**：不同客户端可能生成相同 ID

改进方案：
```js
class ImprovedIdGenerator {
  constructor(clientId) {
    this.clientId = clientId || Math.random().toString(36).slice(2, 10);
    this.counter = parseInt(localStorage.getItem('msgCounter') || '0');
  }

  next() {
    const id = this.clientId + '-' + Date.now() + '-' + (this.counter++);
    localStorage.setItem('msgCounter', this.counter.toString());
    return id;
  }
}
```
:::

### 第 19 题

::: details 查看答案与解析
**参考方案**：

在线客服需要双向实时通信，推荐使用 WebSocket：
- 用户发送消息，客服回复消息
- 支持消息已读回执和输入状态
- 支持断线重连后补发历史消息
- 支持多客服分配和排队

**架构方案**：
```
WebSocket Gateway Cluster
    |
Message Queue (Kafka)
    |
Message Router -> 客服分配服务 -> Agent WebSocket
    |
Database (MongoDB/PostgreSQL)
```
:::

### 第 20 题

::: details 查看答案与解析
**参考架构**：

1. **客户端**：使用 CRDT 库（如 Yjs）管理本地文档状态
2. **同步层**：WebSocket 连接服务端，同步操作
3. **服务端**：接收操作，广播给其他客户端，持久化到数据库
4. **离线支持**：本地缓存操作，联网后批量同步
5. **冲突解决**：CRDT 自动处理，保证最终一致

**数据结构**：
```
Y.Doc
  |-- ytext: 文档内容（支持富文本）
  |-- ymap:  标题、标签等元数据
  |-- yarray: 评论、建议列表
```

**同步流程**：
```
离线: 操作 -> IndexedDB 持久化
上线: 连接 -> 同步未推送操作 -> 接收服务端状态 -> 合并
冲突: CRDT 自动解决 -> UI 更新
```
:::

### 第 21 题

::: details 查看答案与解析
**参考架构**：

1. **接入层**：WebSocket 网关集群，负责连接管理
2. **消息队列**：Kafka / Pulsar 削峰填谷
3. **房间服务**：管理直播间、用户分片（按 roomId 哈希）
4. **过滤服务**：敏感词过滤、频率限制、用户等级校验
5. **推送服务**：按房间广播弹幕（Redis Pub/Sub 或 MQ 广播）
6. **降级策略**：高峰期只显示部分弹幕或合并相似内容

**流量估算**：
```
10 万人在线
每人每 10 秒发 1 条弹幕 = 10,000 TPS 写入
每条广播到 10 万人 = 10^9 消息量/秒（需合并和采样）
```

**优化策略**：
- 弹幕合并：同一用户短时间多条合并
- 采样显示：随机选取部分弹幕显示
- 优先级队列：付费用户、高等级用户优先展示
- CDN 边缘推送：静态弹幕预计算
:::

### 第 22 题

::: details 查看答案与解析
**参考设计**：

```js
class ConnectionManager {
  constructor(url) {
    this.url = url;
    this.retryCount = 0;
    this.pendingMessages = [];
    this.baseDelay = 1000;
    this.maxDelay = 30000;
    this.heartbeatInterval = 30000;
    this.metrics = { disconnects: 0, reconnects: 0 };
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.retryCount = 0;
      this.metrics.reconnects++;
      this.startHeartbeat();
      this.flushPending();
    };
    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === 'ack') this.handleAck(msg);
      else if (msg.type === 'pong') this.lastPong = Date.now();
      else this.onMessage(msg);
    };
    this.ws.onclose = () => {
      this.stopHeartbeat();
      this.scheduleReconnect();
      this.metrics.disconnects++;
    };
  }

  scheduleReconnect() {
    const delay = Math.min(
      this.baseDelay * Math.pow(2, this.retryCount),
      this.maxDelay
    ) * (0.5 + Math.random() * 0.5);
    this.retryCount++;
    setTimeout(() => this.connect(), delay);
  }

  startHeartbeat() {
    this.lastPong = Date.now();
    this.heartbeatTimer = setInterval(() => {
      if (Date.now() - this.lastPong > this.heartbeatInterval * 2) {
        this.ws.close();
        return;
      }
      this.ws.send(JSON.stringify({ type: 'ping' }));
    }, this.heartbeatInterval);
  }
}
```

关键设计点：
- 指数退避 + 抖动防止惊群效应
- 心跳超时强制断开，触发重连
- 消息确认（ACK）保证送达
- 断线缓存待发送消息，重连后补发
- 客户端上报连接质量指标
:::

### 第 23 题

::: details 查看答案与解析
**参考设计**：

```js
class PresenceService {
  constructor(redis) {
    this.redis = redis;
  }

  async userOnline(userId, deviceId, deviceInfo) {
    const sessionKey = 'presence:' + userId + ':sessions';
    await this.redis.hset(sessionKey, deviceId, JSON.stringify({
      status: 'online',
      deviceInfo,
      lastSeen: Date.now(),
      onlineAt: Date.now()
    }));
    await this.redis.expire(sessionKey, 120);
    await this.broadcastPresence(userId, 'online', { deviceId });
  }

  async heartbeat(userId, deviceId) {
    const sessionKey = 'presence:' + userId + ':sessions';
    const data = await this.redis.hget(sessionKey, deviceId);
    if (data) {
      const parsed = JSON.parse(data);
      parsed.lastSeen = Date.now();
      await this.redis.hset(sessionKey, deviceId, JSON.stringify(parsed));
      await this.redis.expire(sessionKey, 120);
    }
  }

  async getUserStatus(userId) {
    const sessionKey = 'presence:' + userId + ':sessions';
    const sessions = await this.redis.hgetall(sessionKey);
    if (!sessions || Object.keys(sessions).length === 0) {
      return { userId, status: 'offline', devices: [], lastSeen: null };
    }
    return {
      userId,
      status: 'online',
      devices: Object.entries(sessions).map(([deviceId, data]) => ({
        deviceId,
        deviceInfo: JSON.parse(data).deviceInfo,
        lastSeen: JSON.parse(data).lastSeen
      })),
      onlineSince: Math.min(...Object.values(sessions).map(s => JSON.parse(s).onlineAt))
    };
  }
}
```

设计要点：
- 使用 Redis Hash 存储用户的多个设备会话
- TTL（120 秒）自动过期，无需精确下线检测
- 心跳每 30 秒续期，更新 lastSeen
- 离线状态由 TTL 到期或客户端主动上报触发
- 同一用户多设备显示"在线（2 台设备）"
:::

---

**标签**：`#real-time` `#websocket` `#sse` `#crdt` `#collaborative-editing` `#presence` `#connection-management`

> **最后更新**：2026-07-06
