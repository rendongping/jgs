import os, sys
wd = os.getcwd()
base = os.path.join(wd, "level-03-architecture", "A08-real-time")
path1 = os.path.join(base, "01-学习文档.md")

s = """# 实时与协同架构：从即时通讯到协同编辑

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
| 短轮询 | 客户端主动 | 低 | 简单查询 |
| 长轮询 | 客户端主动 | 中 | 聊天室早期实现 |
| SSE | 服务端 -> 客户端 | 高 | 股票行情、通知推送 |
| WebSocket | 双向 | 高 | 即时通讯、游戏、协同编辑 |
| WebRTC | P2P 双向 | 高 | 音视频通话、文件传输 |

### 1.1 短轮询 vs 长轮询

**短轮询（Short Polling）**

客户端按固定间隔向服务器发起 HTTP 请求，服务端立即返回响应（无论是否有新数据）。

```js
// 短轮询示例
setInterval(async () => {
  const res = await fetch('/api/messages');
  const data = await res.json();
  if (data.length > 0) {
    updateUI(data);
  }
}, 3000); // 每 3 秒轮询一次
```

优缺点：
- 优点：实现最简单，兼容性最好。
- 缺点：大量空请求浪费带宽，延迟取决于轮询间隔，实时性差。

**长轮询（Long Polling）**

客户端发起请求后，服务端保持连接打开，直到有新数据或超时才返回。客户端收到响应后立即发起新的请求。

```js
// 长轮询示例
async function longPoll() {
  try {
    const res = await fetch('/api/poll');
    const data = await res.json();
    updateUI(data);
  } catch (e) {
    // 超时或错误后重新连接
  }
  longPoll(); // 收到响应后立即发起下一次
}
longPoll();
```

| 特性 | 短轮询 | 长轮询 |
|------|--------|--------|
| 请求频率 | 固定间隔 | 有数据时触发 |
| 实时性 | 低（取决于间隔） | 中（取决于服务端响应速度） |
| 服务端压力 | 高（大量空请求） | 中（连接保持但减少空响应） |
| 实现复杂度 | 低 | 中 |
| 适用场景 | 不重要、低频查询 | 实时性要求中等的场景 |
"""

with open(path1, "w", encoding="utf-8") as f:
    f.write(s)
print("Part 1 written:", len(s), "chars")
