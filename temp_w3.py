import os
wd = os.getcwd()
base = os.path.join(wd, "level-03-architecture", "A08-real-time")
path1 = os.path.join(base, "01-学习文档.md")

s = """
### 1.3 SSE（Server-Sent Events）

SSE 是 HTML5 规范的一部分，允许服务端通过 HTTP 连接持续推送数据。

```js
// 基础 SSE 使用
const source = new EventSource('/api/events');

source.addEventListener('open', () => {
  console.log('SSE 连接已建立');
});

source.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  updateUI(data);
});

source.addEventListener('error', (err) => {
  console.error('SSE 连接错误', err);
});

// 自定义事件类型
source.addEventListener('stock-update', (event) => {
  updateStock(JSON.parse(event.data));
});

source.addEventListener('notification', (event) => {
  showNotification(event.data);
});
```

**SSE 服务端实现（Node.js）**

```js
const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    // 发送初始数据
    res.write('data: {\\"status\\": \\"connected\\"}\n\n');

    // 定期推送
    const intervalId = setInterval(() => {
      const data = JSON.stringify({ time: Date.now(), value: Math.random() });
      res.write('event: stock-update\n');
      res.write('id: ' + Date.now() + '\n');
      res.write('data: ' + data + '\n\n');
    }, 1000);

    req.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  }
}).listen(3000);
```

**SSE 消息格式**

每条 SSE 消息由一行或多行组成，以双换行分隔：

```
event: notification    # 事件类型（可选）
id: msg-001           # 事件 ID（可选，用于断线续传）
retry: 3000           # 重连间隔（毫秒，可选）
data: {\\"text\\": \\"hi\\"}  # 数据内容（必需）

: 注释行（客户端忽略）

```

**SSE 完整重连逻辑**

虽然 EventSource 浏览器原生支持自动重连，但可自定义增强：

```js
class ReconnectingEventSource {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.maxReconnectInterval = options.maxReconnectInterval || 30000;
    this.reconnectAttempts = 0;
    this.lastEventId = null;
    this.connect();
  }

  connect() {
    const url = this.lastEventId
      ? this.url + '?lastEventId=' + this.lastEventId
      : this.url;

    this.source = new EventSource(url);

    this.source.onopen = () => {
      this.reconnectAttempts = 0;
      console.log('SSE 已连接');
    };

    this.source.onmessage = (event) => {
      this.lastEventId = event.lastEventId || this.lastEventId;
      if (this.options.onMessage) {
        this.options.onMessage(event.data);
      }
    };

    this.source.onerror = () => {
      this.source.close();
      const delay = Math.min(
        this.reconnectInterval * Math.pow(2, this.reconnectAttempts),
        this.maxReconnectInterval
      );
      this.reconnectAttempts++;
      console.log('SSE 第 ' + this.reconnectAttempts + ' 次重连，延迟 ' + delay + 'ms');
      setTimeout(() => this.connect(), delay);
    };
  }

  close() {
    this.source.close();
  }
}
```

优点：基于 HTTP 协议，浏览器原生支持自动重连，头部开销小，实现简单。
缺点：仅支持服务端到客户端单向；浏览器同源限制（需 CORS）；连接数有限制（HTTP/1.1 每个域名 6 个连接）。

### 1.4 WebRTC DataChannel

WebRTC 不仅支持音视频，还支持 P2P 数据传输（DataChannel）。

```js
// 信令服务器（简化）
const signalingServer = new WebSocket('wss://signaling.example.com');

// 创建 RTCPeerConnection
const pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// 创建 DataChannel
const dataChannel = pc.createDataChannel('chat', {
  ordered: false,          // 无序传输以提高性能
  maxRetransmits: 3        // 最大重传次数
});

dataChannel.onopen = () => {
  dataChannel.send(JSON.stringify({ text: 'Hello P2P!' }));
};

dataChannel.onmessage = (event) => {
  console.log('接收到 P2P 消息:', event.data);
};

dataChannel.onerror = (err) => console.error('DataChannel 错误:', err);

// ICE 候选和 SDP 交换通过信令服务器进行
pc.onicecandidate = (event) => {
  if (event.candidate) {
    signalingServer.send(JSON.stringify({
      type: 'ice-candidate', candidate: event.candidate
    }));
  }
};

pc.onnegotiationneeded = async () => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  signalingServer.send(JSON.stringify({
    type: 'offer', sdp: pc.localDescription
  }));
};
```

| 特性 | WebRTC DataChannel | WebSocket |
|------|--------------------|-----------|
| 架构 | P2P，无需服务器中转 | 需要服务器 |
| 延迟 | 极低（直连） | 低（服务器中转） |
| 适用场景 | 文件传输、实时游戏 | 即时通讯、协同编辑 |
| 复杂度 | 高（需要 STUN/TURN/信令） | 低 |
| 穿透 NAT | 需要 STUN/TURN | 不需要（服务器中转） |

### 1.5 选型建议

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
    |-> 消息路由到聊天模块
    |-> 消息路由到通知模块
    |-> 消息路由到协同编辑模块
```

### 2.4 服务端架构

```
客户端 -> Load Balancer -> WebSocket 服务器集群
                              |
                         Redis Pub/Sub（房间状态广播）
                              |
                         业务服务（消息持久化）
```

要点：
- 使用 sticky session 或共享状态实现跨节点广播。
- 水平扩展 WebSocket 服务器。
- 消息持久化用于断线重连补发。
"""

with open(path1, "a", encoding="utf-8") as f:
    f.write(s)
print("Part 3 (SSE, WebRTC, connection management) appended:", len(s), "chars")
