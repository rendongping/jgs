# 实时与协同架构练习册

> 通过练习掌握实时通信方案、长连接治理、协同编辑与数据同步。

---

## 难度分级

- 🟢 基础：理解概念，能选型。
- 🟡 进阶：能设计实时通信方案。
- 🔴 深入：能设计协同编辑和实时系统架构。

---

## 一、选择题

### 第 1 题（🟢）

以下哪种方案最适合服务端向客户端单向推送股票行情？

A. WebSocket  
B. SSE  
C. 长轮询  
D. WebRTC

### 第 2 题（🟢）

WebSocket 相比 HTTP 轮询的主要优势是？

A. 更安全  
B. 全双工、低延迟  
C. 更简单  
D. 兼容性更好

### 第 3 题（🟡）

协同编辑中，CRDT 的主要优势是？

A. 需要中央服务器协调  
B. 天然支持离线编辑和最终一致性  
C. 实现比 OT 更复杂  
D. 只支持文本编辑

### 第 4 题（🟡）

长连接重连策略中，指数退避的主要目的是？

A. 加快重连速度  
B. 避免服务端被重连风暴压垮  
C. 减少内存占用  
D. 提高消息实时性

### 第 5 题（🔴）

在 WebSocket 集群中，跨节点广播消息通常使用什么？

A. 本地内存  
B. Redis Pub/Sub  
C. HTTP 请求  
D. 文件系统

---

## 二、代码分析题

### 第 6 题（🟡）

分析以下 WebSocket 代码的问题：

```js
const ws = new WebSocket('wss://api.example.com/chat');
ws.onmessage = (e) => console.log(e.data);
```

### 第 7 题（🔴）

设计一个可靠的消息发送机制，要求：
- 消息不重不漏
- 断线后能补发未确认消息
- 支持消息去重

---

## 三、设计/开放题

### 第 8 题（🟡）

为一个在线客服系统选择实时通信方案，说明理由。

### 第 9 题（🔴）

设计一个多人文档协同编辑系统的架构，要求：
- 支持离线编辑
- 冲突自动解决
- 最终一致性

### 第 10 题（🔴）

设计一个 10 万人在线直播弹幕系统的实时架构。

---

## 参考答案

### 第 1 题

**答案：B**

SSE 基于 HTTP，适合服务端向客户端单向推送，如股票行情、通知。

### 第 2 题

**答案：B**

WebSocket 建立后是全双工连接，延迟低，头部开销小。

### 第 3 题

**答案：B**

CRDT 通过数据结构特性保证最终一致，天然支持离线编辑和去中心化。

### 第 4 题

**答案：B**

指数退避避免大量客户端同时重连导致服务端过载。

### 第 5 题

**答案：B**

Redis Pub/Sub 是 WebSocket 集群跨节点广播的常用方案。

### 第 6 题

**问题分析**：
- 没有处理 onopen、onclose、onerror。
- 没有心跳保活。
- 没有重连机制。
- 没有消息确认。

### 第 7 题

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

### 第 8 题

**参考方案**：

在线客服需要双向实时通信，推荐使用 WebSocket：
- 用户发送消息。
- 客服回复消息。
- 支持消息已读回执。
- 断线重连后补发历史消息。

如果只需要客服主动推送通知，SSE 也可考虑，但双向场景 WebSocket 更合适。

### 第 9 题

**参考架构**：

1. **客户端**：使用 CRDT 库（如 Yjs）管理本地文档状态。
2. **同步层**：WebSocket 连接服务端，同步操作。
3. **服务端**：接收操作，广播给其他客户端，持久化到数据库。
4. **离线支持**：本地缓存操作，联网后批量同步。
5. **冲突解决**：CRDT 自动处理，保证最终一致。

### 第 10 题

**参考架构**：

1. **接入层**：WebSocket 网关集群，负责连接管理。
2. **消息队列**：Kafka / Pulsar 削峰填谷。
3. **房间服务**：管理直播间、用户分片。
4. **过滤服务**：敏感词过滤、频率限制。
5. **推送服务**：按房间广播弹幕。
6. **降级策略**：高峰期只显示部分弹幕或合并相似内容。

---

**标签**：`#real-time` `#websocket` `#sse` `#crdt` `#collaborative-editing`

> **最后更新**：2026-06-25
