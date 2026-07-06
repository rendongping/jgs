import os
wd = os.getcwd()
base = os.path.join(wd, "level-03-architecture", "A08-real-time")
path1 = os.path.join(base, "01-学习文档.md")

s = """
### 1.2 WebSocket

```js
const ws = new WebSocket('wss://api.example.com/chat');

ws.onopen = () => ws.send(JSON.stringify({ type: 'join', roomId: '1' }));
ws.onmessage = (event) => console.log(JSON.parse(event.data));
ws.onclose = () => reconnect();
```

优点：全双工、低延迟、头部开销小。
缺点：需要单独协议和基础设施，代理/防火墙可能干扰。

#### WebSocket 协议深度解析

WebSocket 协议（RFC 6455）在 HTTP 握手后升级为独立的帧协议。

**帧结构**

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data (continued)                  |
+---------------------------------------------------------------+
```

关键字段：
- **FIN**：标记是否为最后一帧（可分段传输）。
- **Opcode**：帧类型 — 0x1（文本）、0x2（二进制）、0x8（关闭）、0x9（Ping）、0xA（Pong）。
- **MASK**：客户端发往服务端的数据必须掩码，服务端发往客户端不需要。
- **Payload Length**：7/16/64 位变长编码，126 表示后续 2 字节，127 表示后续 8 字节。

**WebSocket 扩展**

- **permessage-deflate**：对消息载荷进行压缩（RFC 7692），可显著减少带宽。
- **multiplexing**：在一个 TCP 连接上复用多个 WebSocket 子通道。

**Ping/Pong 帧**

WebSocket 协议内置心跳，无需在应用层发送心跳消息：

```
客户端 -> 服务端：Ping 帧（opcode 0x9）
服务端 -> 客户端：Pong 帧（opcode 0xA）回复
```

如果服务端未收到 Pong，则判定连接断开。

```js
// 服务端 Ping 示例（Node.js ws 库）
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
});

// 定时检测
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => clearInterval(interval));
```
"""

with open(path1, "a", encoding="utf-8") as f:
    f.write(s)
print("Part 2 (WebSocket deep dive) appended:", len(s), "chars")
