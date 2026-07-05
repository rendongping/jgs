
# 计算机网络 面试题

> 本题库共收录 **83** 道面试题（基础 22 / 进阶 30 / 深入 28 / 架构 3）。
> 本文件收录 计算机网络 相关面试题，目标题量 150 道。
> 题型覆盖：概念题、代码分析题、场景设计题、系统设计题、性能优化题、安全题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（15 道）{#basic}

### FB-04-CO-B-001：OSI 七层模型与 TCP/IP 四层模型分别是什么？它们之间如何对应？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络
**标签**：OSI 七层模型、TCP/IP 四层模型、网络模型
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说出 OSI 七层模型和 TCP/IP 四层模型每一层的名称与主要功能，并说明它们之间的对应关系。

**参考答案**：

1. **OSI 七层模型**（开放式系统互联，理论参考模型）：
   - 应用层（Application）：为应用程序提供网络服务接口，如 HTTP、FTP、SMTP。
   - 表示层（Presentation）：数据格式转换、加密/解密、压缩/解压缩。
   - 会话层（Session）：管理会话连接，如建立、维护、同步对话。
   - 传输层（Transport）：端到端通信、可靠传输，如 TCP、UDP。
   - 网络层（Network）：寻址、路由、分组转发，如 IP、ICMP、路由协议。
   - 数据链路层（Data Link）：相邻节点间的帧传输、MAC 地址、差错检测，如以太网、ARP。
   - 物理层（Physical）：比特流传输、电气/光学/机械特性，如网线、光纤、无线电。

2. **TCP/IP 四层模型**（实际工业标准）：
   - 应用层（Application）：对应 OSI 上三层，包含 HTTP、HTTPS、DNS、FTP、SMTP 等。
   - 传输层（Transport）：对应 OSI 传输层，包含 TCP、UDP。
   - 网络层（Internet）：对应 OSI 网络层，包含 IP、ICMP、IGMP、路由协议。
   - 网络接口层（Link / Network Interface）：对应 OSI 下两层，包含以太网、Wi-Fi、ARP、MAC。

对应关系：

```text
OSI        TCP/IP
7 应用层    \
6 表示层     >  应用层
5 会话层    /
4 传输层        传输层
3 网络层        网络层（网际层）
2 数据链路层    \
1 物理层       /   网络接口层
```

**评分维度**：
- 能逐层说出 OSI 七层名称与核心职责（40%）
- 能逐层说出 TCP/IP 四层名称与核心职责（30%）
- 能正确说明两种模型的映射关系与适用场景（30%）

**常见错误**：
- 把 OSI 和 TCP/IP 的层数搞混，例如认为 TCP/IP 也是七层。
- 把 ARP 放在网络层或传输层，实际上 ARP 工作在网络接口层与网络层之间。
- 只背名称，说不出每层对应的典型协议。

**延伸追问**：
- 为什么实际网络更多使用 TCP/IP 四层模型而不是 OSI 七层？
- 路由器、交换机、网卡分别工作在 OSI 的哪一层？

**相关题目**：
- [FB-04-CO-B-003 TCP 与 UDP 的区别](#FB-04-CO-B-003)
- [FB-04-CO-A-001 HTTP/1.1 与 HTTP/2 的核心区别](#FB-04-CO-A-001)

**参考资源**：
- [MDN - OSI model](https://developer.mozilla.org/en-US/docs/Glossary/OSI_model)
- [Cloudflare - What is the OSI model?](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)

**口头回答版**：
> OSI 七层模型（开放式系统互联，理论参考模型）： - 应用层（Application）：为应用程序提供网络服务接口，如 HTTP、FTP、SMTP。 - 表示层（Presentation）：数据格式转换、加密/解密、压缩/解压缩。 - 会话层（Session）：管理会话连接，如建立、维护、同步对话。

---

### FB-04-CO-B-002：HTTP 与 HTTPS 有什么区别？为什么现在主流网站都使用 HTTPS？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：HTTP、HTTPS、TLS/SSL
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 HTTP 与 HTTPS 的主要区别，并说明使用 HTTPS 的必要性。

**参考答案**：

- **HTTP**（HyperText Transfer Protocol）是明文传输协议，默认端口 80，数据在客户端与服务器之间以明文形式传输，容易被窃听、篡改或伪造。
- **HTTPS**（HTTP Secure）是 HTTP + TLS/SSL 的安全版本，默认端口 443，在 HTTP 之下加入 TLS（Transport Layer Security）层，提供：
  1. **加密**：使用对称加密 + 非对称加密混合机制，防止窃听。
  2. **完整性**：使用消息认证码（MAC）/ 哈希算法，防止数据被篡改。
  3. **身份认证**：通过数字证书验证服务器身份，防止中间人冒充。

主流网站使用 HTTPS 的原因：

1. 浏览器对 HTTP 站点标记“不安全”，影响用户信任。
2. 搜索引擎对 HTTPS 站点有排名加权。
3. 现代 Web API（如 Service Worker、Geolocation、Camera、Payment Request）要求安全上下文（HTTPS 或 localhost）。
4. 防止中间人攻击、会话劫持、内容注入。

```bash
# HTTP 请求
http://example.com/api/users

# HTTPS 请求
https://example.com/api/users
```

**评分维度**：
- 说清端口与明文/加密差异（30%）
- 能解释 HTTPS 提供的三大安全属性（40%）
- 能举例说明 HTTPS 的实际必要性（30%）

**常见错误**：
- 认为 HTTPS 只是“加密的 HTTP”，忽略身份认证和完整性。
- 混淆 SSL 与 TLS，TLS 是 SSL 的继任者，目前主流为 TLS 1.2 / 1.3。
- 认为 HTTPS 一定比 HTTP 慢很多，实际上 TLS 1.3 握手已大幅优化。

**延伸追问**：
- HTTPS 的 TLS 握手过程是怎样的？
- 为什么说 HTTPS 不是绝对安全？哪些环节仍可能出问题？

**相关题目**：
- [FB-04-CO-A-002 HTTPS 的 TLS 握手过程](#FB-04-CO-A-002)
- [FB-04-CO-P-003 TLS 1.3 相比 TLS 1.2 有哪些改进](#FB-04-CO-P-003)

**参考资源**：
- [MDN - HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/https)
- [Cloudflare - Why use HTTPS?](https://www.cloudflare.com/learning/ssl/why-use-https/)

**口头回答版**：
> - HTTP（HyperText Transfer Protocol）是明文传输协议，默认端口 80，数据在客户端与服务器之间以明文形式传输，容易被窃听、篡改或伪造。 - HTTPS（HTTP Secure）是 HTTP + TLS/SSL 的安全版本，默认端口 443，在 HTTP 之下加入 TLS（Transport Layer Security）层，提供： 加密：使用对称加密 + 非对称加密混合机制，防止窃听。 完整性：使用消息认证码（MAC）/ 哈希算法，防止数据被篡改。

---

### FB-04-CO-B-003：TCP 与 UDP 有什么区别？各自适合什么场景？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络
**标签**：TCP、UDP、传输层
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请从连接方式、可靠性、速度、头部开销等维度比较 TCP 与 UDP，并给出典型应用场景。

**参考答案**：

| 维度 | TCP | UDP |
|------|-----|-----|
| 连接 | 面向连接，需要三次握手建立连接 | 无连接，直接发送数据 |
| 可靠性 | 可靠传输，提供确认、重传、排序、去重、流量控制、拥塞控制 | 不可靠，不保证到达、顺序和完整性 |
| 传输方式 | 面向字节流 | 面向数据报 |
| 头部开销 | 较大（20~60 字节） | 较小（8 字节） |
| 速度 | 较慢，因为握手和确认机制 | 较快，开销小 |
| 拥塞控制 | 有 | 无，需要应用层自行控制 |

**典型场景**：

- **TCP**：HTTP/HTTPS、FTP、SMTP、数据库连接等需要数据完整性和顺序的场景。
- **UDP**：DNS 查询、视频直播、在线游戏、VoIP、QUIC（HTTP/3 基于 QUIC，QUIC 基于 UDP）等对实时性要求高、可容忍少量丢包的场景。

```js
// Node.js 创建 UDP 服务端示例
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('message', (msg, rinfo) => {
  console.log(`收到来自 ${rinfo.address}:${rinfo.port} 的消息：${msg}`);
});
server.bind(41234);
```

**评分维度**：
- 能说出至少 4 个维度的差异（40%）
- 能结合场景说明为什么 TCP/UDP 更合适（40%）
- 能提到 HTTP/3 基于 QUIC 基于 UDP 这一趋势（20%）

**常见错误**：
- 认为 UDP 完全不能用，或 TCP 一定优于 UDP。
- 混淆“面向连接”与“可靠传输”的含义。
- 把 UDP 说成“不安全的”，安全性应由应用层或 TLS 保证。

**延伸追问**：
- 如果要在 UDP 上实现可靠传输，应用层需要做哪些事情？
- QUIC 为什么选择在 UDP 之上实现，而不是直接改造 TCP？

**相关题目**：
- [FB-04-CO-B-004 TCP 三次握手的过程](#FB-04-CO-B-004)
- [FB-04-CO-A-010 HTTP/3 与 QUIC 有什么优势](#FB-04-CO-A-010)

**参考资源**：
- [MDN - TCP](https://developer.mozilla.org/en-US/docs/Glossary/TCP)
- [MDN - UDP](https://developer.mozilla.org/en-US/docs/Glossary/UDP)

**口头回答版**：
> | 维度 | TCP | UDP | |------|-----|-----| | 连接 | 面向连接，需要三次握手建立连接 | 无连接，直接发送数据 | | 可靠性 | 可靠传输，提供确认、重传、排序、去重、流量控制、拥塞控制 | 不可靠，不保证到达、顺序和完整性 |

---

### FB-04-CO-B-004：TCP 三次握手的过程是什么？为什么需要三次？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络
**标签**：TCP、传输层
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请详细描述 TCP 三次握手的过程，并解释为什么不能是两次或四次。

**参考答案**：

TCP 三次握手（Three-way Handshake）用于在客户端和服务器之间建立可靠连接，同时交换初始序列号（ISN）。

过程：

1. **第一次握手（SYN）**：客户端向服务器发送 `SYN = 1, seq = x`，请求建立连接，进入 `SYN_SENT` 状态。
2. **第二次握手（SYN-ACK）**：服务器收到后回复 `SYN = 1, ACK = 1, seq = y, ack = x + 1`，进入 `SYN_RCVD` 状态。
3. **第三次握手（ACK）**：客户端收到后回复 `ACK = 1, seq = x + 1, ack = y + 1`，双方进入 `ESTABLISHED` 状态，可以开始传输数据。

```text
客户端                              服务器
  | ---- SYN seq=x -------------->   |
  | <--- SYN seq=y, ACK=x+1 ------   |
  | ---- ACK=y+1 ---------------->   |
  |                                  |
 ESTABLISHED                     ESTABLISHED
```

为什么是三次：

- 第一次和第二次握手确保客户端到服务器的信道是可达的。
- 第二次和第三次握手确保服务器到客户端的信道是可达的。
- 三次是**最小次数**能够同时确认双方收发能力并同步初始序列号。
- 两次握手无法防止历史重复连接请求（如网络延迟导致客户端已失效的 SYN 重新到达服务器），可能造成服务器资源浪费；四次握手则 unnecessarily 增加时延。

**评分维度**：
- 能准确描述三次握手每一步的标志位和序列号（40%）
- 能解释“为什么需要三次”的核心原因（40%）
- 能说明 SYN 洪泛攻击及其基本防御（20%）

**常见错误**：
- 把 ACK 和 ack 混为一谈，ACK 是标志位，ack 是确认号。
- 只说“确认双方能通信”，却说不出具体如何确认收发能力。
- 认为三次握手可以携带数据，实际上第三次握手的 ACK 包通常不携带数据（某些实现允许）。

**延伸追问**：
- 如果第三次握手丢失会发生什么？
- 什么是 SYN Flood 攻击？如何防御？

**相关题目**：
- [FB-04-CO-B-005 TCP 四次挥手的过程](#FB-04-CO-B-005)
- [FB-04-CO-A-012 TCP 的可靠传输、流量控制和拥塞控制](#FB-04-CO-A-012)

**参考资源**：
- [MDN - TCP handshake](https://developer.mozilla.org/en-US/docs/Glossary/TCP_handshake)
- [RFC 793 - Transmission Control Protocol](https://tools.ietf.org/html/rfc793)

**口头回答版**：
> TCP 三次握手（Three-way Handshake）用于在客户端和服务器之间建立可靠连接，同时交换初始序列号（ISN）。 第一次握手（SYN）：客户端向服务器发送 SYN = 1, seq = x，请求建立连接，进入 SYN_SENT 状态。 第二次握手（SYN-ACK）：服务器收到后回复 SYN = 1, ACK = 1, seq = y, ack = x + 1，进入 SYN_RCVD 状态。 第三次握手（ACK）：客户端收到后回复 ACK = 1, seq = x + 1, ack = y + 1，双方进入 ESTABLISHED 状态，可以开始传输数据。

---

### FB-04-CO-B-005：TCP 四次挥手的过程是什么？为什么需要四次？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络
**标签**：TCP、传输层
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请描述 TCP 四次挥手释放连接的过程，并解释为什么是四次而不是三次。

**参考答案**：

TCP 四次挥手（Four-way Wavehand）用于双方安全地关闭全双工连接。因为 TCP 连接是**全双工**的，每个方向都需要单独关闭。

过程：

1. **第一次挥手（FIN）**：客户端发送 `FIN = 1, seq = u`，表示没有数据要发了，进入 `FIN_WAIT_1` 状态。
2. **第二次挥手（ACK）**：服务器收到后回复 `ACK = 1, ack = u + 1`，进入 `CLOSE_WAIT` 状态；客户端收到后进入 `FIN_WAIT_2` 状态。此时服务器仍可向客户端发送数据。
3. **第三次挥手（FIN）**：服务器数据发送完毕后，发送 `FIN = 1, seq = w`，进入 `LAST_ACK` 状态。
4. **第四次挥手（ACK）**：客户端回复 `ACK = 1, ack = w + 1`，进入 `TIME_WAIT` 状态，等待 2MSL（Maximum Segment Lifetime）后关闭；服务器收到 ACK 后立即关闭。

```text
客户端                              服务器
  | ---- FIN seq=u -------------->   |
  | <--- ACK ack=u+1 -------------   |
  | <--- FIN seq=w ---------------   |
  | ---- ACK ack=w+1 ------------>   |
  | (TIME_WAIT 2MSL)                 |
```

为什么是四次：

- 关闭连接时，双方可能都还有数据待发。
- 服务器收到 FIN 后，不能立即同时发送 FIN 和 ACK（因为它可能还没发完数据），因此 ACK 和 FIN 需要分两次发送。
- 三次挥手只能适用于双方同时没有数据发送的理想情况，不具通用性。

**评分维度**：
- 能准确描述四次挥手每一步的状态和标志位（40%）
- 能解释全双工与“为什么不能三次”的原因（40%）
- 能说明 TIME_WAIT 的作用（20%）

**常见错误**：
- 混淆 CLOSE_WAIT 和 TIME_WAIT 的状态含义。
- 认为服务器收到 FIN 后必须立即关闭。
- 忽略 2MSL 等待时间，无法解释为什么客户端最后不直接关闭。

**延伸追问**：
- 为什么 TIME_WAIT 需要等待 2MSL？
- 出现大量 CLOSE_WAIT 或 TIME_WAIT 可能是什么原因？

**相关题目**：
- [FB-04-CO-B-004 TCP 三次握手的过程](#FB-04-CO-B-004)
- [FB-04-CO-P-002 TCP 拥塞控制算法 CUBIC 与 BBR](#FB-04-CO-P-002)

**参考资源**：
- [MDN - TCP](https://developer.mozilla.org/en-US/docs/Glossary/TCP)
- [RFC 793 - Transmission Control Protocol](https://tools.ietf.org/html/rfc793)

**口头回答版**：
> TCP 四次挥手（Four-way Wavehand）用于双方安全地关闭全双工连接。 因为 TCP 连接是全双工的，每个方向都需要单独关闭。 第一次挥手（FIN）：客户端发送 FIN = 1, seq = u，表示没有数据要发了，进入 FIN_WAIT_1 状态。 第二次挥手（ACK）：服务器收到后回复 ACK = 1, ack = u + 1，进入 CLOSE_WAIT 状态；客户端收到后进入 FIN_WAIT_2 状态。

---

### FB-04-CO-B-006：DNS 解析流程是怎样的？浏览器如何把一个域名解析成 IP？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络
**标签**：DNS、域名解析
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请描述从用户在浏览器输入 `www.example.com` 到获得 IP 地址的 DNS 解析过程。

**参考答案**：

DNS（Domain Name System）负责将人类可读的域名映射为机器可读的 IP 地址。浏览器通常按以下顺序查询：

1. **浏览器缓存**：检查是否近期解析过该域名。
2. **操作系统缓存**：查询 hosts 文件与本地 DNS 缓存。
3. **本地 DNS 服务器（ISP / 路由器 / 公司内网 DNS）**：若缓存未命中，向配置的递归 DNS 服务器发起请求。
4. **递归解析**：本地 DNS 服务器代为完成迭代查询：
   - 向**根域名服务器**（.）询问 `.com` 的 NS 记录。
   - 向**顶级域名服务器**（.com TLD）询问 `example.com` 的权威 NS。
   - 向**权威域名服务器**（example.com）询问 `www.example.com` 的 A/AAAA 记录。
5. **返回结果**：本地 DNS 将结果返回给操作系统和浏览器，并按 TTL 缓存。

```text
浏览器 -> 浏览器缓存 -> OS 缓存 -> hosts -> 本地 DNS
本地 DNS -> 根 DNS -> .com TLD -> example.com 权威 DNS
```

常见记录类型：

- `A`：IPv4 地址
- `AAAA`：IPv6 地址
- `CNAME`：别名记录
- `NS`：域名服务器记录
- `MX`：邮件交换记录
- `TXT`：文本记录（常用于 SPF、DKIM、域名验证）

```bash
# 使用 dig 查看解析过程
dig +trace www.example.com
```

**评分维度**：
- 能说清从浏览器到权威 DNS 的层级查询流程（50%）
- 能区分递归查询与迭代查询（25%）
- 能列举常见 DNS 记录类型及其作用（25%）

**常见错误**：
- 认为浏览器直接访问根 DNS，忽略了本地递归 DNS 服务器。
- 把递归查询和迭代查询混淆。
- 只说到 A 记录，忽略 CNAME、AAAA、NS 等常见记录。

**延伸追问**：
- DNS 解析慢会对首屏性能产生什么影响？前端可以怎么优化？
- 什么是 DNS 缓存投毒 / DNS 劫持？

**相关题目**：
- [FB-04-CO-A-004 DNS 记录类型与 CDN 调度](#FB-04-CO-A-004)
- [FB-04-SE-A-002 中间人攻击与 DNS 劫持](#FB-04-SE-A-002)

**参考资源**：
- [MDN - DNS](https://developer.mozilla.org/en-US/docs/Glossary/DNS)
- [Cloudflare - What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/)

**口头回答版**：
> DNS（Domain Name System）负责将人类可读的域名映射为机器可读的 IP 地址。 浏览器通常按以下顺序查询： 浏览器缓存：检查是否近期解析过该域名。 操作系统缓存：查询 hosts 文件与本地 DNS 缓存。

---

### FB-04-CO-B-007：浏览器缓存中的强缓存和协商缓存有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络、03 浏览器原理
**标签**：缓存策略、强缓存、协商缓存
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释浏览器缓存的强缓存与协商缓存机制，并说明它们分别使用哪些 HTTP 头部。

**参考答案**：

浏览器缓存分为两大类：

1. **强缓存（Freshness/Strong Cache）**：
   - 浏览器直接从本地缓存读取资源，**不发请求到服务器**。
   - 控制头：`Cache-Control`（HTTP/1.1）和 `Expires`（HTTP/1.0）。
   - `Cache-Control: max-age=3600` 表示资源在 3600 秒内有效。
   - `Expires: Wed, 21 Oct 2026 07:28:00 GMT` 是绝对过期时间，受本地时钟影响，优先级低于 `Cache-Control`。

2. **协商缓存（Validation/Negotiated Cache）**：
   - 强缓存过期后，浏览器会携带缓存标识向服务器发起请求，由服务器判断是否返回 304 Not Modified。
   - 控制头：`Last-Modified` / `If-Modified-Since`，`ETag` / `If-None-Match`。
   - `ETag` 是资源内容的唯一标识（如文件内容哈希），优先级高于 `Last-Modified`。
   - 服务器比对后若未变化，返回 `304 Not Modified`，浏览器继续使用本地缓存；若变化，返回 `200 OK` 和新资源。

```http
HTTP/1.1 200 OK
Content-Type: application/javascript
Cache-Control: max-age=31536000, immutable
ETag: "33a64df5"
Last-Modified: Wed, 21 Oct 2025 07:28:00 GMT
```

**评分维度**：
- 能区分强缓存和协商缓存的触发时机（40%）
- 能准确说出对应的 HTTP 头部（35%）
- 能说明 ETag 优于 Last-Modified 的原因（25%）

**常见错误**：
- 认为强缓存过期后资源会被立即删除，实际上会进入协商缓存。
- 混淆 `Expires` 与 `Last-Modified` 的作用。
- 忽略 `Cache-Control: no-cache` 实际仍可进行协商缓存，不是不缓存；真正不缓存是 `no-store`。

**延伸追问**：
- `Cache-Control: no-cache` 与 `no-store` 的区别是什么？
- 前端构建时如何利用文件指纹（hash）配合强缓存做永久缓存？

**相关题目**：
- [FB-04-CO-A-006 Cache-Control、ETag 与 Last-Modified 的协作](#FB-04-CO-A-006)
- [FB-04-PE-P-002 前端网络性能优化之缓存与预加载](#FB-04-PE-P-002)

**参考资源**：
- [MDN - HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [web.dev - Prevent unnecessary network requests](https://web.dev/articles/http-cache)

**口头回答版**：
> 浏览器缓存分为两大类： 强缓存（Freshness/Strong Cache）： - 浏览器直接从本地缓存读取资源，不发请求到服务器。 - 控制头：Cache-Control（HTTP/1.1）和 Expires（HTTP/1.0）。

---

### FB-04-CO-B-008：Cookie、Session、Token、JWT 有什么区别？各自如何工作？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：Cookie、Session、JWT、身份认证
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 Cookie、Session、Token、JWT 四种会话/身份管理机制，并说明它们的优缺点。

**参考答案**：

| 机制 | 存储位置 | 状态 | 优点 | 缺点 |
|------|----------|------|------|------|
| **Cookie** | 浏览器 | 有状态（配合 Session） | 自动携带、原生支持、可设过期/域/路径 | 大小受限（约 4KB）、易被 XSS/CSRF 利用 |
| **Session** | 服务器 | 有状态 | 安全性较高、可主动销毁 | 服务器内存/存储压力、分布式场景复杂 |
| **Token** | 客户端（通常 localStorage） | 无状态 | 服务端无需保存会话，适合分布式 | 需要手动携带，存在 XSS 泄漏风险 |
| **JWT** | 客户端 | 无状态自包含 | 结构标准、可跨域、可携带用户声明 | Token 较大、过期前无法主动撤销 |

**JWT 结构**（Header.Payload.Signature）：

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VyIjoiMTIzIn0.
SflKxwRJSMeKKF2QT4fwpMe...
```

- Header：算法和类型。
- Payload：声明（claims），如用户 ID、角色、过期时间。
- Signature：使用密钥对前两部分签名，防止篡改。

**典型工作流**：

1. 用户登录成功后，服务器生成 JWT 返回给前端。
2. 前端将 JWT 存储在 `localStorage` 或 `HttpOnly Cookie` 中。
3. 后续请求通过 `Authorization: Bearer <token>` 头部携带 JWT。
4. 服务器验证签名和有效期，解析出用户身份。

```js
// 前端 Axios 请求拦截器示例
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**评分维度**：
- 能区分四种机制的状态位置与存储方式（40%）
- 能解释 JWT 三段结构与签名作用（30%）
- 能结合安全场景给出选择建议（30%）

**常见错误**：
- 认为 JWT 一定比 Session 安全，实际上 JWT 泄漏后难以吊销。
- 把 Token 和 JWT 混为一谈，JWT 只是 Token 的一种实现。
- 将敏感信息放入 JWT Payload（Payload 只是 Base64Url 编码，不加密）。

**延伸追问**：
- 如何安全地在前端存储 JWT？`localStorage` 与 `HttpOnly Cookie` 哪个更安全？
- Access Token 过期后，Refresh Token 机制如何设计？

**相关题目**：
- [FB-04-CO-A-009 JWT 的安全使用与常见攻击](#FB-04-CO-A-009)
- [FB-04-SE-A-001 XSS 与 CSRF 的防御](#FB-04-SE-A-001)

**参考资源**：
- [MDN - Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [jwt.io - Introduction to JSON Web Tokens](https://jwt.io/introduction)

**口头回答版**：
> | 机制 | 存储位置 | 状态 | 优点 | 缺点 | |------|----------|------|------|------| | Cookie | 浏览器 | 有状态（配合 Session） | 自动携带、原生支持、可设过期/域/路径 | 大小受限（约 4KB）、易被 XSS/CSRF 利用 | | Session | 服务器 | 有状态 | 安全性较高、可主动销毁 | 服务器内存/存储压力、分布式场景复杂 |

---

### FB-04-CO-B-009：什么是 CORS？为什么会有预检请求（Preflight）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：CORS、预检请求
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CORS 的作用、简单请求与预检请求的区别，以及服务器需要配置哪些响应头。

**参考答案**：

**CORS**（Cross-Origin Resource Sharing，跨域资源共享）是浏览器实现的一种机制，允许服务器声明哪些跨域请求被允许，从而在保证安全的前提下突破同源策略限制。

**同源策略**：协议、主机、端口三者相同即为同源，不同源的前端脚本默认不能读取跨域响应。

**简单请求（Simple Request）**：

满足以下全部条件时，浏览器直接发送请求，不触发预检：

- 方法为 `GET`、`HEAD`、`POST` 之一。
- 头部仅限于 `Accept`、`Accept-Language`、`Content-Language`、`Content-Type`（且值为 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain` 之一）。
- 没有使用 `ReadableStream`。

**预检请求（Preflight Request）**：

当请求不满足简单请求条件时（如使用 `PUT`、`DELETE`、`Content-Type: application/json`、自定义头部），浏览器会先自动发送一个 `OPTIONS` 请求到目标服务器，询问是否允许该跨域请求。

服务器需要返回的 CORS 头：

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

```js
// 前端 fetch 跨域请求示例
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // 携带 Cookie
  body: JSON.stringify({ name: 'kimi' })
});
```

**评分维度**：
- 能解释同源策略与 CORS 的目的（30%）
- 能区分简单请求与预检请求（35%）
- 能列出并解释关键 CORS 响应头（35%）

**常见错误**：
- 认为 CORS 错误是后端返回的 HTTP 错误，实际上是浏览器的安全拦截。
- 把 `Access-Control-Allow-Origin: *` 与 `credentials: include` 同时使用，这是不被允许的。
- 忽略预检请求对性能的影响，所有跨域 POST 都使用 `application/json` 会触发额外 OPTIONS 请求。

**延伸追问**：
- 如何在开发环境临时解决跨域问题？生产环境推荐哪种方案？
- 如果服务器已设置 `Access-Control-Allow-Origin: *`，为什么带 Cookie 的请求仍然失败？

**相关题目**：
- [FB-04-CA-A-001 CORS 预检与响应头代码分析](#FB-04-CA-A-001)
- [FB-04-CO-B-008 Cookie、Session、Token、JWT 的区别](#FB-04-CO-B-008)

**参考资源**：
- [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [web.dev - Cross-Origin Resource Sharing](https://web.dev/articles/cross-origin-resource-sharing)

**口头回答版**：
> CORS（Cross-Origin Resource Sharing，跨域资源共享）是浏览器实现的一种机制，允许服务器声明哪些跨域请求被允许，从而在保证安全的前提下突破同源策略限制。

---

### FB-04-CO-B-010：常见的 HTTP 状态码有哪些？分别代表什么意思？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络
**标签**：HTTP、HTTP 状态码
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请分类列举常见 HTTP 状态码，并说明它们在实际开发中的含义。

**参考答案**：

HTTP 状态码由三位数字组成，第一位表示响应类别：

| 类别 | 状态码 | 含义 |
|------|--------|------|
| **1xx 信息** | 100 Continue | 客户端应继续请求。 |
| **2xx 成功** | 200 OK | 请求成功。 |
| | 201 Created | 资源创建成功。 |
| | 204 No Content | 成功但无返回体，常用于 DELETE。 |
| **3xx 重定向** | 301 Moved Permanently | 永久重定向，SEO 权重转移。 |
| | 302 Found | 临时重定向。 |
| | 304 Not Modified | 协商缓存命中，客户端使用本地缓存。 |
| **4xx 客户端错误** | 400 Bad Request | 请求参数错误。 |
| | 401 Unauthorized | 未认证。 |
| | 403 Forbidden | 无权限。 |
| | 404 Not Found | 资源不存在。 |
| | 429 Too Many Requests | 请求过于频繁，触发限流。 |
| **5xx 服务器错误** | 500 Internal Server Error | 服务器内部错误。 |
| | 502 Bad Gateway | 网关/代理从上游收到无效响应。 |
| | 503 Service Unavailable | 服务暂时不可用。 |
| | 504 Gateway Timeout | 网关/代理上游超时。 |

```js
// Axios 响应拦截器中对常见状态码做统一处理
axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    if (status === 401) {
      redirectToLogin();
    } else if (status === 403) {
      showToast('无权限访问');
    } else if (status >= 500) {
      showToast('服务器繁忙，请稍后再试');
    }
    return Promise.reject(error);
  }
);
```

**评分维度**：
- 能按 1xx~5xx 分类说出常见状态码（40%）
- 能准确解释 200、301/302、401/403、500/502/503/504 的区别（40%）
- 能结合实际 API 设计说明使用场景（20%）

**常见错误**：
- 把 401 和 403 混淆：401 是未认证，403 是认证后无权限。
- 认为 304 是错误码，实际上它是缓存优化的正常响应。
- 把 502 和 504 混淆：502 是上游响应无效，504 是上游超时。

**延伸追问**：
- 301 和 302 对浏览器缓存行为有什么影响？
- 429 状态码通常配合哪些响应头使用？

**相关题目**：
- [FB-04-CO-B-011 RESTful API 设计的基本原则](#FB-04-CO-B-011)
- [FB-04-SC-A-001 网络请求失败时的重试与降级设计](#FB-04-SC-A-001)

**参考资源**：
- [MDN - HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [HTTP Cats](https://http.cat/)

**口头回答版**：
> HTTP 状态码由三位数字组成，第一位表示响应类别： | 类别 | 状态码 | 含义 | |------|--------|------| | 1xx 信息 | 100 Continue | 客户端应继续请求。

---

### FB-04-CO-B-011：RESTful API 设计的基本原则是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络
**标签**：RESTful、API 设计
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 RESTful API 的核心概念，并举例说明 URI、HTTP 方法、状态码如何配合表达资源操作。

**参考答案**：

REST（Representational State Transfer）是一种架构风格，RESTful API 以**资源**为核心，通过 HTTP 方法表达操作，通过 URI 定位资源，通过状态码反馈结果。

核心原则：

1. **资源导向**：URI 表示资源，而不是动作。
   - 推荐：`/users/123` `/orders?status=paid`
   - 避免：`/getUser?id=123` `/deleteOrder`
2. **使用标准 HTTP 方法**：
   - `GET /users`：查询列表
   - `GET /users/123`：查询单个资源
   - `POST /users`：创建资源
   - `PUT /users/123`：全量更新
   - `PATCH /users/123`：局部更新
   - `DELETE /users/123`：删除资源
3. **无状态**：服务器不保存客户端上下文，每次请求应包含全部必要信息（如 Token）。
4. **统一接口**：使用标准 MIME 类型（JSON、XML）和自描述消息。
5. **合理使用状态码**：如 201 Created、204 No Content、400 Bad Request、404 Not Found。

```http
GET /api/v1/users/123 HTTP/1.1
Host: example.com
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "Kimi",
  "email": "kimi@example.com"
}
```

**评分维度**：
- 能解释 REST 资源导向和无状态原则（40%）
- 能正确举例 URI + HTTP 方法 + 状态码（40%）
- 能区分 PUT 与 PATCH（20%）

**常见错误**：
- 在 URI 中使用动词，如 `/createUser`。
- 把所有操作都用 POST 实现，不符合 RESTful 语义。
- 认为 RESTful 必须使用 JSON，其实 REST 也可以使用 XML、MessagePack 等。

**延伸追问**：
- RESTful API 如何处理复杂动作（如登录、搜索、批量操作）？
- GraphQL 与 RESTful 在设计理念上有何不同？

**相关题目**：
- [FB-04-CO-A-011 GraphQL 基础与适用场景](#FB-04-CO-A-011)
- [FB-04-SC-P-002 RESTful API 的幂等性、版本控制与分页设计](#FB-04-SC-P-002)

**参考资源**：
- [MDN - REST](https://developer.mozilla.org/en-US/docs/Glossary/REST)
- [RESTful API Designing guidelines](https://restfulapi.net/)

**口头回答版**：
> REST（Representational State Transfer）是一种架构风格，RESTful API 以资源为核心，通过 HTTP 方法表达操作，通过 URI 定位资源，通过状态码反馈结果。 资源导向：URI 表示资源，而不是动作。 - 推荐：/users/123 /orders?status=paid - 避免：/getUser?id=123 /deleteOrder

---

### FB-04-CO-B-012：WebSocket 与 HTTP 轮询有什么区别？它解决了什么问题？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络、32 实时与协同
**标签**：WebSocket、实时通信
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 WebSocket 与 HTTP 轮询、长轮询，说明 WebSocket 的优缺点及典型应用场景。

**参考答案**：

**HTTP 轮询（Polling）**：客户端定时向服务器发送请求询问新数据。实现简单但实时性差、浪费带宽。

**长轮询（Long Polling）**：客户端发起请求后，服务器挂起连接直到有数据才返回；客户端收到后立刻再次发起请求。比轮询实时性更好，但仍需反复建立连接，服务器压力大。

**WebSocket**：

- 在 TCP 之上建立**全双工**通信通道，通过一次 HTTP 握手升级为 WebSocket 协议（`Upgrade: websocket`）。
- 连接建立后，客户端和服务器可随时互相推送消息，头部开销小。
- 使用 `ws://`（明文）或 `wss://`（加密）。

```js
// 前端 WebSocket 示例
const ws = new WebSocket('wss://example.com/socket');

ws.onopen = () => ws.send(JSON.stringify({ type: 'subscribe', channel: 'orders' }));
ws.onmessage = event => console.log('收到消息：', event.data);
ws.onclose = () => console.log('连接关闭');
ws.onerror = err => console.error('WebSocket 错误', err);
```

**典型场景**：即时聊天、股票行情、协同编辑、在线游戏、实时通知。

**评分维度**：
- 能区分轮询、长轮询、WebSocket 的通信模式（40%）
- 能说明 WebSocket 握手升级过程（30%）
- 能举例适用场景并指出 WebSocket 的运维成本（30%）

**常见错误**：
- 认为 WebSocket 完全替代 HTTP，实际上首次握手仍基于 HTTP。
- 忽略 WebSocket 的心跳、断线重连、二进制消息等实际工程问题。
- 在不需要双向推送的场景滥用 WebSocket，增加复杂度。

**延伸追问**：
- WebSocket 如何保持连接？心跳机制怎么设计？
- 如果浏览器不支持 WebSocket，有哪些降级方案？

**相关题目**：
- [FB-04-CO-P-005 WebSocket 心跳、断线重连与二进制消息](#FB-04-CO-P-005)
- [FB-04-SC-P-001 设计一个支持高并发的 WebSocket 聊天室](#FB-04-SC-P-001)

**参考资源**：
- [MDN - WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [RFC 6455 - The WebSocket Protocol](https://tools.ietf.org/html/rfc6455)

**口头回答版**：
> HTTP 轮询（Polling）：客户端定时向服务器发送请求询问新数据。 实现简单但实时性差、浪费带宽。 长轮询（Long Polling）：客户端发起请求后，服务器挂起连接直到有数据才返回；客户端收到后立刻再次发起请求。 比轮询实时性更好，但仍需反复建立连接，服务器压力大。

---
### FB-04-CO-B-016：IP 地址、子网掩码和默认网关分别是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络
**标签**：IP、子网掩码、网关、网络基础
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明三者作用及它们如何协作完成主机间通信。

**参考答案**：

IP 地址是网络中主机的唯一逻辑地址；子网掩码用于划分网络位和主机位，判断目标是否在同一子网；默认网关是本地子网通往其他网络的出口。

同一子网直接通信；不同子网时，数据包发送给默认网关转发。


**补充说明**：

在实际落地 IP 地址、子网掩码和默认网关分别是什么 时，建议结合 IP、子网掩码、网关 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- IP 地址（30%）：逻辑地址与寻址
- 子网掩码（30%）：网络位与主机位
- 默认网关（40%）：跨网段转发

**常见错误**：
- 把 MAC 地址和 IP 地址混为一谈
- 认为子网掩码只影响网络大小，不影响通信路径
- 不知道默认网关通常配置在路由器接口上

**口头回答版**：
> IP 地址标识主机，子网掩码判断网段，默认网关负责跨网段转发。

### FB-04-CO-B-017：常见 HTTP 方法的语义与幂等性

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络
**标签**：HTTP、幂等性、REST、方法
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS 的语义和幂等性。

**参考答案**：

GET 获取资源，幂等安全；POST 创建资源，非幂等；PUT 整体替换，幂等；DELETE 删除，幂等；PATCH 部分更新，默认不保证幂等；HEAD 获取元数据；OPTIONS 查询支持的方法，常用于 CORS 预检。

幂等性指多次相同请求副作用一致。


**补充说明**：

在实际落地 常见 HTTP 方法的语义与幂等性 时，建议结合 HTTP、幂等性、REST 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 语义（50%）：各方法用途
- 幂等性（30%）：是否幂等
- 安全性（20%）：是否修改资源

**常见错误**：
- 认为 POST 天然幂等
- 把 PUT 和 PATCH 混用，导致部分更新意外覆盖其他字段
- 用 GET 请求做删除或修改操作

**口头回答版**：
> GET/PUT/DELETE/HEAD/OPTIONS 幂等，POST 非幂等，PATCH 不一定幂等。应根据语义选择方法。

### FB-04-CO-B-018：URL 的组成结构及各部分作用

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：04 计算机网络
**标签**：URL、协议、域名、路径、查询参数
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请拆解 https://example.com:8080/path?a=1#frag 的各部分。

**参考答案**：

URL 包括：protocol（https）、authority（userinfo@host:port）、path（/path）、query（?a=1）、fragment（#frag）。host 包含域名和端口，fragment 仅在客户端使用，不会发送到服务端。

编码：query 参数需用 encodeURIComponent 处理特殊字符。

**评分维度**：
- 协议与主机（40%）：scheme、host、port
- 路径与查询（40%）：path、query 编码
- 片段（20%）：fragment 客户端定位

**常见错误**：
- fragment 被发送到服务器
- query 参数直接拼接中文字符而不编码
- 混淆 pathname 和 search 的取值范围

**口头回答版**：
> URL 由协议、主机、路径、查询参数和片段组成，fragment 不发送到服务端，query 需编码。
---

## 进阶题（23 道）{#advanced}

**口头回答版**：
> HTTP 轮询（Polling）：客户端定时向服务器发送请求询问新数据。 实现简单但实时性差、浪费带宽。 长轮询（Long Polling）：客户端发起请求后，服务器挂起连接直到有数据才返回；客户端收到后立刻再次发起请求。 比轮询实时性更好，但仍需反复建立连接，服务器压力大。

### FB-04-CO-A-001：HTTP/1.1 与 HTTP/2 的核心区别是什么？HTTP/2 的多路复用如何解决队头阻塞？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、27 性能工程
**标签**：HTTP/2、多路复用、队头阻塞
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 HTTP/1.1 与 HTTP/2 在连接模型、头部压缩、服务器推送等方面的差异，并解释 HTTP/2 的多路复用如何解决 HTTP 层队头阻塞。

**参考答案**：

| 特性 | HTTP/1.1 | HTTP/2 |
|------|----------|--------|
| 连接 | 默认每个域名 6~8 个 TCP 连接，请求串行或管道化 | 单一 TCP 连接上多路复用（Multiplexing） |
| 队头阻塞 | 存在，同一连接上请求/响应按顺序排队 | 通过二进制分帧和流 ID 解决 HTTP 层队头阻塞 |
| 头部 | 明文文本，冗余大 | HPACK 压缩头部，减少重复传输 |
| 服务器推送 | 不支持 | 支持 Server Push（可主动推送资源） |
| 优先级 | 无 | 支持流优先级与依赖 |
| 安全性 | 不强制 TLS | 主流实现要求 TLS（事实标准） |

**HTTP/2 多路复用**：

- 将请求和响应切分为二进制帧（frame），每个帧带有**流标识符（Stream ID）**。
- 不同 Stream 的帧可以交错发送，接收端按 Stream ID 重新组装。
- 因此一个请求被阻塞不会影响其他请求，解决了 HTTP/1.1 的**应用层队头阻塞**。

但 HTTP/2 仍存在**TCP 层队头阻塞**：一旦某个 TCP 包丢失，整个连接上所有 Stream 都必须等待重传。

```http
# HTTP/2 连接升级（ALPN 协商）
ClientHello -> ALPN: h2
ServerHello -> ALPN: h2
```

**评分维度**：
- 能说清 HTTP/1.1 与 HTTP/2 的核心差异（40%）
- 能解释多路复用的二进制分帧与 Stream ID 机制（35%）
- 能区分 HTTP 层队头阻塞与 TCP 层队头阻塞（25%）

**常见错误**：
- 认为 HTTP/2 完全消除了队头阻塞，忽略 TCP 层队头阻塞。
- 把 HTTP/2 的多路复用等同于 TCP 连接池。
- 认为 HTTP/2 必须使用服务器推送，实际上 Server Push 使用场景有限。

**延伸追问**：
- HTTP/2 的 Server Push 有什么问题？现代浏览器为什么多已禁用或弱化？
- 为什么 HTTP/2 通常部署在 HTTPS 之上？

**相关题目**：
- [FB-04-CO-A-010 HTTP/3 与 QUIC 有什么优势](#FB-04-CO-A-010)
- [FB-04-CO-P-001 HTTP/2 的 HPACK、Server Push 与关键问题](#FB-04-CO-P-001)

**参考资源**：
- [MDN - HTTP/2](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2)
- [Cloudflare - What is HTTP/2?](https://www.cloudflare.com/learning/performance/what-is-http2/)

**口头回答版**：
> | 特性 | HTTP/1.1 | HTTP/2 | |------|----------|--------| | 连接 | 默认每个域名 6~8 个 TCP 连接，请求串行或管道化 | 单一 TCP 连接上多路复用（Multiplexing） | | 队头阻塞 | 存在，同一连接上请求/响应按顺序排队 | 通过二进制分帧和流 ID 解决 HTTP 层队头阻塞 |

---

### FB-04-CO-A-002：HTTPS 的 TLS 握手过程是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：HTTPS、TLS/SSL
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请详细描述 TLS 1.2 握手过程，并说明其中对称加密、非对称加密和数字证书各自的作用。

**参考答案**：

TLS 1.2 握手通常需要 2-RTT（不含 TCP 三次握手）。以 RSA 密钥交换为例：

1. **ClientHello**：客户端发送支持的 TLS 版本、加密套件列表（Cipher Suites）、随机数 `Client Random`、SNI（Server Name Indication）等。
2. **ServerHello + Certificate + ServerHelloDone**：服务器返回选定的 TLS 版本和加密套件、服务器随机数 `Server Random`、数字证书（含公钥）。
3. **密钥交换**：客户端验证证书合法性（证书链、有效期、域名匹配），生成 **Pre-Master Secret**，用服务器公钥加密后发送给服务器。
4. **双方生成会话密钥**：客户端和服务器使用 `Client Random + Server Random + Pre-Master Secret` 派生对称会话密钥。
5. **Finished**：双方发送 ChangeCipherSpec 和 Finished 消息，后续通信使用对称加密。

```text
客户端                         服务器
  | ---- ClientHello --------> |
  | <--- ServerHello          |
  | <--- Certificate          |
  | <--- ServerHelloDone      |
  | ---- ClientKeyExchange --> |
  | ---- ChangeCipherSpec     |
  | ---- Finished -----------> |
  | <--- ChangeCipherSpec     |
  | <--- Finished             |
  | ---- 加密应用数据 --------> |
```

**加密角色**：

- **非对称加密**（RSA/ECDHE）：仅在握手阶段用于身份认证和密钥交换，保证 Pre-Master Secret 不被窃听。
- **对称加密**（AES-GCM/ChaCha20-Poly1305）：握手完成后用于大量数据传输，效率高。
- **数字证书**（X.509）：由 CA 签发，验证服务器身份，防止中间人冒充。

**评分维度**：
- 能按顺序描述 TLS 1.2 握手步骤（40%）
- 能解释三种密码学手段的作用（35%）
- 能说明证书验证过程和中间人攻击防护（25%）

**常见错误**：
- 认为 HTTPS 全程使用非对称加密，实际上只用于握手。
- 混淆 Pre-Master Secret 与会话密钥。
- 说不清证书链验证，忽略中间证书和根证书的作用。

**延伸追问**：
- TLS 1.3 相比 TLS 1.2 握手有哪些改进？
- 什么是前向保密（Forward Secrecy）？ECDHE 如何提供？

**相关题目**：
- [FB-04-CO-B-002 HTTP 与 HTTPS 的区别](#FB-04-CO-B-002)
- [FB-04-CO-P-003 TLS 1.3 的握手优化与前向保密](#FB-04-CO-P-003)

**参考资源**：
- [Cloudflare - What happens in a TLS handshake?](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)
- [MDN - Transport Layer Security](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security)

**口头回答版**：
> TLS 1.2 握手通常需要 2-RTT（不含 TCP 三次握手）。 以 RSA 密钥交换为例： ClientHello：客户端发送支持的 TLS 版本、加密套件列表（Cipher Suites）、随机数 Client Random、SNI（Server Name Indication）等。 ServerHello + Certificate + ServerHelloDone：服务器返回选定的 TLS 版本和加密套件、服务器随机数 Server Random、数字证书（含公钥）。

---

### FB-04-CO-A-003：CDN 的基本原理是什么？如何为项目选择合适的 CDN？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、27 性能工程
**标签**：CDN、静态资源
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 CDN 的工作原理、常见调度方式，并说明前端项目在选择 CDN 时应考虑哪些因素。

**参考答案**：

**CDN（Content Delivery Network，内容分发网络）**通过在全球部署边缘节点，将网站的静态资源（图片、JS、CSS、视频）缓存到离用户最近的位置，降低延迟、分担源站压力、提升可用性。

**工作原理**：

1. 用户访问 `cdn.example.com/image.jpg`。
2. DNS 解析返回最优边缘节点 IP（基于地理位置、运营商、节点负载、RTT）。
3. 若边缘节点缓存命中，直接返回资源；否则回源站拉取并缓存。
4. 源站更新资源后通过 URL 指纹（如 `app.a3f1c2.js`）或主动刷新（purge）使缓存失效。

```text
用户 -> DNS -> 边缘节点 -> 命中？返回缓存 : 回源拉取 -> 返回并缓存
```

**调度方式**：

- **DNS 调度**：根据用户 Local DNS 位置返回边缘节点，简单但精度低。
- **HTTP DNS / 302 调度**：客户端或调度服务器根据实时探测选择节点。
- **Anycast**：同一 IP 在不同地理位置广播，路由到最近节点。

**选型因素**：

- 节点覆盖（国内/海外/运营商）。
- 缓存策略灵活性（TTL、purge、预热）。
- HTTPS、HTTP/2、HTTP/3、QUIC、Brotli 支持。
- 安全防护（DDoS、WAF、Bot 管理）。
- 成本（按流量计 / 按带宽计 / 请求数）。
- 日志、监控、边缘计算（Edge Workers）能力。

**评分维度**：
- 能说清 CDN 的请求流转与缓存机制（40%）
- 能列举至少两种调度方式及其适用场景（30%）
- 能结合业务需求给出选型维度（30%）

**常见错误**：
- 认为 CDN 只能缓存静态资源，其实也可以通过边缘函数做动态内容。
- 忽略缓存刷新策略，导致更新后用户仍访问旧资源。
- 不考虑 HTTPS 证书、回源协议和 SNI 配置。

**延伸追问**：
- 如何避免 CDN 缓存导致的静态资源更新延迟？
- 如果源站在海外、用户在国内，CDN 回源慢怎么办？

**相关题目**：
- [FB-04-CO-B-007 强缓存与协商缓存](#FB-04-CO-B-007)
- [FB-04-SD-R-001 设计全球 CDN + 多活架构](#FB-04-SD-R-001)

**参考资源**：
- [Cloudflare - What is a CDN?](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
- [MDN - CDN](https://developer.mozilla.org/en-US/docs/Glossary/CDN)

**口头回答版**：
> CDN（Content Delivery Network，内容分发网络）通过在全球部署边缘节点，将网站的静态资源（图片、JS、CSS、视频）缓存到离用户最近的位置，降低延迟、分担源站压力、提升可用性。

---

### FB-04-CO-A-004：DNS 有哪些常见记录类型？TTL 对解析有什么影响？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络
**标签**：DNS、域名解析
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举常见的 DNS 记录类型并说明作用，同时解释 TTL 在 DNS 解析和故障切换中的影响。

**参考答案**：

**常见 DNS 记录类型**：

| 记录 | 作用 |
|------|------|
| A | 域名 -> IPv4 地址 |
| AAAA | 域名 -> IPv6 地址 |
| CNAME | 域名 -> 另一个域名（别名） |
| NS | 指定域名的权威 DNS 服务器 |
| MX | 邮件服务器及优先级 |
| TXT | 文本记录，常用于 SPF、DKIM、域名验证 |
| SOA | 区域授权起始记录，包含主 DNS、管理员邮箱、序列号等 |
| PTR | IP -> 域名，反向解析 |
| SRV | 定义特定服务的服务器与端口 |

**TTL（Time To Live）**：

- DNS 记录的生存时间，单位秒，告诉递归 DNS/客户端缓存多久。
- TTL 较长（如 86400 秒）：减少解析请求，提升性能，但故障切换慢。
- TTL 较短（如 60 秒）：变更生效快，利于灾备切换，但增加 DNS 查询负载。
- 变更前通常先调低 TTL，待生效后再改回。

```bash
# 查询 A 记录与 TTL
dig example.com A

# 示例输出
# example.com.   300  IN  A  93.184.216.34
```

**评分维度**：
- 能列举至少 6 种常见记录类型及作用（40%）
- 能解释 TTL 对性能与故障切换的影响（40%）
- 能说明 CNAME 与 A 记录在使用上的区别（20%）

**常见错误**：
- 认为 TTL 过期后域名解析会失效，实际上会重新查询刷新。
- 把 CNAME 与 A 记录混用，例如根域名（@）通常不能设置 CNAME。
- 忽略 MX、TXT 在邮件与安全验证中的作用。

**延伸追问**：
- 为什么根域名通常不能设置 CNAME？有什么替代方案？
- DNS 负载均衡与 HTTP 负载均衡相比有什么优缺点？

**相关题目**：
- [FB-04-CO-B-006 DNS 解析流程](#FB-04-CO-B-006)
- [FB-04-CO-A-013 DNS 安全与 DNS over HTTPS](#FB-04-CO-A-013)

**参考资源**：
- [Cloudflare - DNS records](https://www.cloudflare.com/learning/dns/dns-records/)
- [MDN - DNS](https://developer.mozilla.org/en-US/docs/Glossary/DNS)

**口头回答版**：
> 常见 DNS 记录类型： | 记录 | 作用 | |------|------| | A | 域名 -> IPv4 地址 |

---

### FB-04-CO-A-005：HTTP Keep-Alive 与 TCP 连接池在前端工程中的作用是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、27 性能工程
**标签**：Keep-Alive、HTTP
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 HTTP Keep-Alive 的工作原理，以及为什么浏览器要对同一域名限制并发连接数。前端如何利用连接池优化请求？

**参考答案**：

**HTTP Keep-Alive（持久连接）**：

- HTTP/1.0 默认每个请求后关闭 TCP 连接；HTTP/1.1 默认启用 Keep-Alive，允许在同一 TCP 连接上发送多个请求/响应，避免反复三次握手和 TLS 握手。
- 通过头部 `Connection: keep-alive` 控制，可配合 `Keep-Alive: timeout=5, max=100` 设置空闲超时和最大请求数。

**浏览器并发限制**：

- 浏览器对同一域名通常限制 6~8 个并发 TCP 连接（HTTP/1.1），防止客户端占用过多服务器资源。
- 超过限制时请求会排队，产生**应用层队头阻塞**。

**前端优化**：

- 对 HTTP/1.1：使用域名分片（Domain Sharding）增加并行连接，但会增加 DNS 和连接开销。
- 使用 HTTP/2：单一连接多路复用，无需域名分片。
- 在 Node.js / 服务端使用 HTTP Agent 维护连接池：

```js
const http = require('http');
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 10,      // 每个目标主机最大连接数
  maxFreeSockets: 5,   // 空闲连接数
  timeout: 60000,
  freeSocketTimeout: 30000
});

http.get('http://api.example.com/data', { agent }, res => { ... });
```

**评分维度**：
- 能解释 Keep-Alive 与持久连接的收益（40%）
- 能说明浏览器并发连接限制的原因与影响（30%）
- 能给出 HTTP/2 与连接池的工程实践（30%）

**常见错误**：
- 认为 Keep-Alive 连接永远不断开，实际上有超时和最大请求数限制。
- 在 HTTP/2 场景下仍使用域名分片，反而降低性能。
- 忽略服务端连接池配置，导致高并发时频繁创建连接。

**延伸追问**：
- HTTP/2 为什么不需要 Keep-Alive 头部？
- 大量短连接会对服务器产生什么影响？

**相关题目**：
- [FB-04-CO-A-001 HTTP/1.1 与 HTTP/2 的核心区别](#FB-04-CO-A-001)
- [FB-04-PE-P-002 前端网络性能优化](#FB-04-PE-P-002)

**参考资源**：
- [MDN - Connection header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection)
- [web.dev - Performance: Connection management](https://web.dev/articles/performance-resource-loading)

**口头回答版**：
> HTTP Keep-Alive（持久连接）： - HTTP/1.0 默认每个请求后关闭 TCP 连接；HTTP/1.1 默认启用 Keep-Alive，允许在同一 TCP 连接上发送多个请求/响应，避免反复三次握手和 TLS 握手。 - 通过头部 Connection: keep-alive 控制，可配合 Keep-Alive: timeout=5, max=100 设置空闲超时和最大请求数。

---

### FB-04-CO-A-006：Cache-Control、ETag 与 Last-Modified 是如何协作的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、03 浏览器原理
**标签**：缓存策略、ETag
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请详细说明 `Cache-Control`、`ETag`、`Last-Modified` 的取值、优先级与协作流程，并说明前端构建中如何配合文件名 hash 做长期缓存。

**参考答案**：

**Cache-Control 常用指令**：

- `max-age=<seconds>`：强缓存有效期。
- `no-cache`：每次使用前必须向服务器验证（协商缓存）。
- `no-store`：完全禁止缓存，常用于敏感数据。
- `private`：仅浏览器可缓存，中间代理不可缓存。
- `public`：可被任何缓存（浏览器、CDN、代理）缓存。
- `immutable`：资源在有效期内不会变化，可避免刷新时重新验证。
- `s-maxage`：覆盖 max-age，仅对共享缓存（CDN/代理）生效。

**ETag vs Last-Modified**：

- `Last-Modified`：文件最后修改时间，精度秒级，可能因时间回拨或批量修改而误判。
- `ETag`：文件内容指纹（如 hash），优先级高于 `Last-Modified`，更精确。

**协作流程**：

1. 首次请求返回资源，附带 `Cache-Control: max-age=3600` 和 `ETag: "abc123"`。
2. 在 max-age 内，浏览器使用强缓存，不发请求。
3. 过期后，浏览器发送协商请求：`If-None-Match: "abc123"`。
4. 服务器比对 ETag，未变化返回 `304 Not Modified`；变化返回 `200` 和新 ETag。

**前端构建长期缓存**：

```html
<!-- 带 hash 的资源文件名，可设置永久强缓存 -->
<script src="/static/app.a3f1c2.js" crossorigin></script>
<link rel="stylesheet" href="/static/style.7e8b9c.css">
```

```nginx
# Nginx 配置示例
location ~* \.(js|css|png|jpg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**评分维度**：
- 能解释 Cache-Control 关键指令含义（35%）
- 能说清 ETag 与 Last-Modified 优先级与差异（35%）
- 能结合构建产物 hash 给出缓存策略（30%）

**常见错误**：
- 把 `no-cache` 理解为“不缓存”。
- 在 HTML 入口文件也设置长期强缓存，导致用户无法获取新版本。
- 没有为 HTML 设置 `no-cache` 或为静态资源加 hash，造成更新不生效。

**延伸追问**：
- 当服务器返回 304 时，浏览器还会重新下载资源内容吗？
- 在微前端或多构建产物场景下，如何管理缓存版本？

**相关题目**：
- [FB-04-CO-B-007 强缓存与协商缓存](#FB-04-CO-B-007)
- [FB-04-PE-P-002 前端网络性能优化](#FB-04-PE-P-002)

**参考资源**：
- [MDN - Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [web.dev - HTTP cache](https://web.dev/articles/http-cache)

**口头回答版**：
> Cache-Control 常用指令： - max-age=`<seconds>`：强缓存有效期。 - no-cache：每次使用前必须向服务器验证（协商缓存）。 - no-store：完全禁止缓存，常用于敏感数据。

---

### FB-04-CA-A-001：分析以下跨域请求场景，哪些会成功，哪些会触发预检？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：CORS、预检请求
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
以下三个跨域 `fetch` 请求对应的响应头已给出，请判断每个请求是否能成功，并说明原因。

```js
// 场景 1
fetch('https://api.example.com/users', {
  method: 'GET',
  credentials: 'include'
});
// 响应头：Access-Control-Allow-Origin: *

// 场景 2
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'kimi' })
});
// 响应头：
// Access-Control-Allow-Origin: https://app.example.com
// Access-Control-Allow-Methods: GET, POST

// 场景 3
fetch('https://api.example.com/users/1', {
  method: 'PUT',
  headers: { 'X-Request-Id': '12345' },
  body: JSON.stringify({ name: 'kimi' })
});
// 响应头：
// Access-Control-Allow-Origin: https://app.example.com
// Access-Control-Allow-Methods: GET, POST, PUT
// Access-Control-Allow-Headers: Content-Type
```

**参考答案**：

**场景 1**：失败。

- 请求携带了 `credentials: 'include'`，但响应头 `Access-Control-Allow-Origin: *` 不能与 `Allow-Credentials: true` 同时使用。
- 浏览器会拦截响应，报 CORS 错误。
- 正确做法：返回具体 Origin，并设置 `Access-Control-Allow-Credentials: true`。

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
```

**场景 2**：成功，但会触发预检请求。

- `Content-Type: application/json` 不属于简单请求的三种 Content-Type 之一，因此浏览器会先发送 `OPTIONS` 预检。
- 预检通过后，再发送真正的 POST 请求。
- 响应头允许 `https://app.example.com` 和 `GET, POST` 方法，满足条件。

**场景 3**：失败。

- `PUT` 方法和自定义头部 `X-Request-Id` 会触发预检。
- 预检请求会询问是否允许 `PUT` 和 `X-Request-Id`。
- 响应头虽然允许 `PUT`，但 `Access-Control-Allow-Headers` 只列出了 `Content-Type`，未列出 `X-Request-Id`。
- 因此预检失败，真实 PUT 请求不会发出。

```http
# 正确配置应包含
Access-Control-Allow-Headers: Content-Type, X-Request-Id
```

**评分维度**：
- 能判断三个场景的成功/失败结果（30%）
- 能解释简单请求与预检请求的判定条件（35%）
- 能指出 `*` 与 `credentials: include` 的冲突及自定义头部配置缺失（35%）

**常见错误**：
- 认为 POST 请求一定不会触发预检，实际上 `application/json` 会触发。
- 只关注最终响应头，忽略预检请求的响应要求。
- 不理解 `Access-Control-Allow-Origin: *` 与 credentials 的互斥关系。

**延伸追问**：
- 如果希望支持任意自定义头部，服务器如何配置？
- 预检请求的 `OPTIONS` 是否会计入接口限流？

**相关题目**：
- [FB-04-CO-B-009 CORS 原理与预检请求](#FB-04-CO-B-009)
- [FB-04-CO-A-009 JWT 的安全使用](#FB-04-CO-A-009)

**参考资源**：
- [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Fetch - CORS protocol](https://fetch.spec.whatwg.org/#cors-protocol)

**口头回答版**：
> - 请求携带了 credentials: 'include'，但响应头 Access-Control-Allow-Origin: * 不能与 Allow-Credentials: true 同时使用。 - 浏览器会拦截响应，报 CORS 错误。 - 正确做法：返回具体 Origin，并设置 Access-Control-Allow-Credentials: true。 场景 2：成功，但会触发预检请求。

---

### FB-04-SE-A-001：XSS 与 CSRF 的区别是什么？前端有哪些防御手段？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：Web 安全、XSS、CSRF
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 XSS 与 CSRF 的攻击原理、危害与防御方案，并说明前端在防御中能做哪些工作。

**参考答案**：

| 维度 | XSS（跨站脚本攻击） | CSRF（跨站请求伪造） |
|------|---------------------|----------------------|
| 攻击目标 | 利用站点对用户输入过滤不足，注入恶意脚本 | 诱导已登录用户浏览器自动发起请求 |
| 是否读取响应 | 通常需要读取响应或执行脚本 | 不需要读取响应，利用 Cookie 自动携带 |
| 依赖 | 页面存在输入输出漏洞 | 用户已登录且 Cookie 随请求自动发送 |
| 典型危害 | 窃取 Cookie、会话劫持、钓鱼、挖矿 | 以用户身份执行转账、改密码等操作 |

**XSS 分类**：

- **存储型 XSS**：恶意脚本存入数据库，如评论区输入 `<script>alert(1)</script>`。
- **反射型 XSS**：恶意脚本在 URL 中，服务器直接回显到页面。
- **DOM 型 XSS**：前端 JavaScript 不当地处理用户输入，如 `innerHTML`、`eval`、`document.write`。

**XSS 防御**：

1. 对用户输入做**转义**（Escape）后再输出到 HTML、JS、URL、CSS 上下文。
2. 使用 `textContent` 而非 `innerHTML` 插入文本。
3. 设置 CSP（Content Security Policy）限制脚本来源。
4. 对 Cookie 设置 `HttpOnly`，使 JS 无法读取敏感 Cookie。

**CSRF 防御**：

1. **CSRF Token**：服务器生成一次性 Token，表单或请求头携带，攻击者无法伪造。
2. **SameSite Cookie**：设置 `SameSite=Lax` 或 `SameSite=Strict`，跨站请求不携带 Cookie。
3. **验证 Origin / Referer**：服务器检查请求来源。
4. **关键操作二次验证**：如短信验证码、密码确认。

```http
Set-Cookie: session=xxx; HttpOnly; Secure; SameSite=Lax; Path=/
```

**评分维度**：
- 能区分 XSS 与 CSRF 的攻击原理（40%）
- 能分别列出至少 3 种防御手段（35%）
- 能说明前端在渲染、Cookie 设置中的具体职责（25%）

**常见错误**：
- 认为只要使用 HTTPS 就能防御 XSS/CSRF。
- 混淆 XSS 和 CSRF，实际上两者攻击面不同，防御也互补。
- 认为设置 HttpOnly Cookie 能防御 CSRF，其实 HttpOnly 主要防 XSS 窃取 Cookie，CSRF 需要 SameSite/Token。

**延伸追问**：
- CSP 如何配置才能既防 XSS 又不影响业务？
- `SameSite=None` 与 `SameSite=Lax` 分别在什么场景使用？

**相关题目**：
- [FB-04-CO-B-008 Cookie、Session、Token、JWT 的区别](#FB-04-CO-B-008)
- [FB-04-SE-P-001 CSP、SameSite Cookie 与安全响应头](#FB-04-SE-P-001)

**参考资源**：
- [MDN - Cross-site scripting (XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss)
- [OWASP - CSRF](https://owasp.org/www-community/attacks/csrf)

**口头回答版**：
> | 维度 | XSS（跨站脚本攻击） | CSRF（跨站请求伪造） | |------|---------------------|----------------------| | 攻击目标 | 利用站点对用户输入过滤不足，注入恶意脚本 | 诱导已登录用户浏览器自动发起请求 | | 是否读取响应 | 通常需要读取响应或执行脚本 | 不需要读取响应，利用 Cookie 自动携带 |

---

### FB-04-CO-A-009：JWT 如何安全使用？有哪些常见攻击与防御手段？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：JWT、身份认证
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 JWT 在实际项目中的安全使用方式，包括存储、传输、过期与撤销，并列举常见攻击与防御手段。

**参考答案**：

**安全使用建议**：

1. **存储方式**：
   - 推荐：`HttpOnly`、`Secure`、`SameSite` Cookie，防止 XSS 窃取。
   - 次选：`Memory`（内存中），关闭页面即失效。
   - 避免：`localStorage` / `sessionStorage` 存储敏感 Token，易被 XSS 读取。

2. **传输方式**：
   - 始终通过 HTTPS 传输。
   - 使用 `Authorization: Bearer <token>` 头部，不要放在 URL 参数中。

3. **Token 设计**：
   - Access Token 设置短有效期（如 15 分钟）。
   - Refresh Token 设置较长有效期（如 7 天），单独存储并支持轮换（Refresh Token Rotation）。
   - 在服务端维护 Refresh Token 黑名单或版本号，支持登出撤销。

4. **签名算法**：
   - 服务端明确指定并校验 `alg`，拒绝 `none` 算法。
   - 使用强密钥和 HMAC-SHA256 / RS256 等算法。

**常见攻击**：

| 攻击 | 说明 | 防御 |
|------|------|------|
| **Token 窃取** | XSS/中间人窃取 Token | HttpOnly Cookie + HTTPS |
| **Token 伪造** | 篡改算法为 `none` 或弱密钥 | 校验 alg、使用强密钥 |
| **重放攻击** | 截获合法 Token 反复使用 | 短有效期、jti 唯一标识、黑名单 |
| **信息泄露** | Payload 仅 Base64Url 编码 | 不在 Payload 放敏感信息 |

```js
// 推荐：后端设置 HttpOnly Cookie
res.cookie('access_token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000
});
```

**评分维度**：
- 能说出 JWT 安全存储与传输方案（35%）
- 能解释 Access/Refresh Token 与撤销机制（35%）
- 能列举常见攻击及对应防御（30%）

**常见错误**：
- 将 JWT 存储在 localStorage 并认为 HTTPS 足够安全。
- 在 Payload 中存放密码等敏感信息。
- 忽略 `alg: none` 攻击风险。

**延伸追问**：
- 如果 Token 被盗，如何最小化损失？
- Refresh Token Rotation 的实现与优缺点是什么？

**相关题目**：
- [FB-04-CO-B-008 Cookie、Session、Token、JWT 的区别](#FB-04-CO-B-008)
- [FB-04-SE-P-001 CSP、SameSite Cookie 与安全响应头](#FB-04-SE-P-001)

**参考资源**：
- [jwt.io - Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP - JWT Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-04-CO-A-010：HTTP/3 与 QUIC 有什么优势？它解决了 HTTP/2 的哪些问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、27 性能工程
**标签**：HTTP/3、QUIC
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 HTTP/3 为什么基于 QUIC 和 UDP，它相比 HTTP/2 解决了哪些关键问题？

**参考答案**：

**HTTP/3** 是 HTTP 协议的第三个主要版本，它不再基于 TCP + TLS，而是运行在 **QUIC** 之上，QUIC 本身基于 UDP。

**QUIC 的核心优势**：

1. **消除 TCP 层队头阻塞**：
   - HTTP/2 多路复用共享一个 TCP 连接，任一 TCP 包丢失会阻塞所有 Stream。
   - QUIC 在传输层实现类似 TCP 的可靠传输，但每个 Stream 独立处理丢包，一个 Stream 阻塞不影响其他 Stream。

2. **更快的连接建立**：
   - QUIC 将传输层握手与 TLS 1.3 握手合并，理想情况下 **0-RTT** 即可发送应用数据。
   - 首次连接 1-RTT，后续连接可 0-RTT。

3. **连接迁移**：
   - TCP 连接由四元组（源 IP、源端口、目的 IP、目的端口）标识，网络切换（Wi-Fi -> 4G）会断开连接。
   - QUIC 使用连接 ID 标识连接，IP/端口变化时仍可保持连接。

4. **内置加密**：
   - QUIC 强制使用 TLS 1.3，安全性更好。

```text
HTTP/1.1: HTTP -> TCP -> IP
HTTP/2:   HTTP/2 -> TLS -> TCP -> IP
HTTP/3:   HTTP/3 -> QUIC(UDP+TLS 1.3) -> IP
```

**评分维度**：
- 能解释 HTTP/3 与 QUIC 的关系（25%）
- 能说明 QUIC 如何解决 TCP 层队头阻塞（30%）
- 能说明 0-RTT 和连接迁移的优势（25%）
- 能提及 HTTP/3 的部署挑战（20%）

**常见错误**：
- 认为 HTTP/3 只是 HTTP/2 的小优化，实际上传输层发生了根本变化。
- 认为 QUIC 不可靠，实际上 QUIC 在 UDP 之上实现了可靠传输、拥塞控制、流量控制。
- 忽略 0-RTT 的安全隐患（重放攻击风险）。

**延伸追问**：
- QUIC 如何实现连接迁移？连接 ID 的作用是什么？
- HTTP/3 目前的兼容性和部署挑战有哪些？

**相关题目**：
- [FB-04-CO-A-001 HTTP/1.1 与 HTTP/2 的核心区别](#FB-04-CO-A-001)
- [FB-04-CO-P-004 QUIC 的 0-RTT 与连接迁移](#FB-04-CO-P-004)

**参考资源**：
- [Cloudflare - HTTP/3](https://www.cloudflare.com/learning/performance/what-is-http3/)
- [MDN - HTTP/3](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_3)

**口头回答版**：
> HTTP/3 是 HTTP 协议的第三个主要版本，它不再基于 TCP + TLS，而是运行在 QUIC 之上，QUIC 本身基于 UDP。 QUIC 的核心优势： 消除 TCP 层队头阻塞： - HTTP/2 多路复用共享一个 TCP 连接，任一 TCP 包丢失会阻塞所有 Stream。

---

### FB-04-SC-A-001：网络请求失败时，如何设计重试与降级策略？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、27 性能工程
**标签**：网络请求、性能优化
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
在一个前端项目中，调用后端 API 可能因网络抖动、服务器超时或限流而失败。请设计一套重试与降级策略，兼顾用户体验和系统稳定性。

**参考答案**：

**1. 错误分类与是否重试**：

| 错误类型 | 是否重试 | 说明 |
|----------|----------|------|
| 网络断开 / DNS 失败 | 可重试 | 可能是临时网络问题 |
| 408 / 502 / 503 / 504 | 可重试 | 服务端临时不可用 |
| 429 | 可重试 + 退避 | 触发限流，需增加间隔 |
| 400 / 401 / 403 / 404 | 不重试 | 客户端错误或权限问题 |
| 500 | 谨慎重试 | 可能是幂等性问题 |

**2. 重试策略**：

- **指数退避（Exponential Backoff）**：1s、2s、4s、8s，避免雪崩。
- **抖动（Jitter）**：在退避时间上加入随机值，防止并发请求同时重试。
- **最大重试次数**：一般 2~3 次。
- **超时控制**：总超时时间限制，避免无限重试。
- **幂等性保证**：重试仅用于幂等请求（GET、PUT、DELETE），非幂等 POST 谨慎处理。

```js
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      if (i === maxRetries) throw err;
      const delay = Math.min(1000 * 2 ** i, 8000) + Math.random() * 1000;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

**3. 降级策略**：

- 返回本地缓存数据（Stale-while-revalidate）。
- 返回占位数据 / 默认配置。
- 关闭非核心功能（如推荐、统计）。
- 提示用户稍后重试，提供刷新按钮。

**4. 可观测性**：

- 记录重试次数、失败率、降级触发次数。
- 对熔断器（Circuit Breaker）状态进行监控。

**评分维度**：
- 能根据状态码合理判断是否重试（25%）
- 能设计指数退避 + 抖动 + 超时机制（30%）
- 能给出降级与缓存兜底方案（25%）
- 能考虑幂等性与可观测性（20%）

**常见错误**：
- 对所有错误都无限重试，导致服务器雪崩。
- 对非幂等 POST 请求直接重试，造成重复下单/提交。
- 重试间隔固定，未使用退避和抖动。

**延伸追问**：
- 如果后端接口不幂等，如何设计“防重放”机制？
- 熔断器与重试策略如何配合使用？

**相关题目**：
- [FB-04-CO-B-010 常见 HTTP 状态码](#FB-04-CO-B-010)
- [FB-04-SC-P-002 RESTful API 的幂等性设计](#FB-04-SC-P-002)

**参考资源**：
- [Google Cloud - Exponential backoff](https://cloud.google.com/storage/docs/retry-strategy)
- [AWS - Retry behavior](https://docs.aws.amazon.com/general/latest/gr/api-retries.html)

**口头回答版**：
> 错误分类与是否重试： | 错误类型 | 是否重试 | 说明 | |----------|----------|------| | 网络断开 / DNS 失败 | 可重试 | 可能是临时网络问题 |

---

### FB-04-CO-A-011：GraphQL 与 RESTful 相比有什么特点？适合什么场景？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络
**标签**：GraphQL、API 设计
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 GraphQL 的基本概念、与 RESTful 的差异，以及在前端项目中的适用场景与潜在问题。

**参考答案**：

**GraphQL 核心概念**：

- 由 Facebook 提出，是一种**查询语言**和**运行时**，客户端可以精确描述所需数据结构。
- 单一端点（如 `/graphql`），通过 `Query`（查）、`Mutation`（改）、`Subscription`（订阅）操作数据。
- 强类型 Schema，支持内省（Introspection）。

**与 RESTful 对比**：

| 维度 | RESTful | GraphQL |
|------|---------|---------|
| 端点 | 多个资源 URI | 通常一个 `/graphql` |
| 数据粒度 | 由服务端固定返回 | 客户端按需字段查询 |
| 请求数 | 可能需要多次请求 | 一次请求获取多资源 |
| 缓存 | 基于 HTTP 路径/方法缓存 | 需在应用层实现缓存 |
| 版本 | 常见 v1/v2 版本号 | 通过 Schema 演化避免版本 |
| 学习成本 | 低 | 需要理解 Schema、Resolver |

**GraphQL 示例**：

```graphql
query GetUserWithPosts($id: ID!) {
  user(id: $id) {
    name
    email
    posts {
      title
      createdAt
    }
  }
}
```

```js
// 前端使用 Apollo Client 示例
const { data } = await client.query({
  query: GET_USER_WITH_POSTS,
  variables: { id: '123' }
});
```

**适用场景**：

- 移动端 / BFF 聚合多资源，减少请求次数。
- 数据结构复杂、前端需求多变，需要灵活字段裁剪。
- 实时订阅场景。

**潜在问题**：

- 单点复杂度：N+1 查询、Resolver 性能、权限控制。
- 缓存困难：HTTP 缓存失效，需要 Apollo Cache、DataLoader。
- 文件上传、错误码标准化不如 REST 直观。

**评分维度**：
- 能说清 GraphQL 的核心概念与操作类型（30%）
- 能对比 RESTful 与 GraphQL 的优缺点（35%）
- 能结合实际场景判断是否适合引入 GraphQL（35%）

**常见错误**：
- 认为 GraphQL 一定优于 RESTful，忽略团队学习成本和缓存问题。
- 把 GraphQL 当成数据库查询语言，实际上它描述的是 API 接口。
- 忽略 N+1 查询问题。

**延伸追问**：
- 如何解决 GraphQL 的 N+1 查询问题？
- GraphQL 如何做权限控制和限流？

**相关题目**：
- [FB-04-CO-B-011 RESTful API 设计](#FB-04-CO-B-011)
- [FB-04-SC-P-002 RESTful API 的幂等性、版本控制与分页](#FB-04-SC-P-002)

**参考资源**：
- [GraphQL 官方文档](https://graphql.org/learn/)
- [Apollo Client 文档](https://www.apollographql.com/docs/react/)

**口头回答版**：
> GraphQL 核心概念： - 由 Facebook 提出，是一种查询语言和运行时，客户端可以精确描述所需数据结构。 - 单一端点（如 /graphql），通过 Query（查）、Mutation（改）、Subscription（订阅）操作数据。 - 强类型 Schema，支持内省（Introspection）。

---

### FB-04-CO-A-012：TCP 的可靠传输、流量控制和拥塞控制分别是怎么实现的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络
**标签**：TCP、拥塞控制
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请分别解释 TCP 如何保证可靠传输、如何进行流量控制、如何进行拥塞控制，并说明三者之间的关系。

**参考答案**：

**1. 可靠传输**：

- **序列号与确认应答（ACK）**：每个字节都有序列号，接收方返回期望下一个字节的 ACK。
- **超时重传（RTO）**：发送方未收到 ACK 则在超时后重传。
- **去重与排序**：接收方根据序列号丢弃重复包、按序提交。
- **校验和**：检测数据在传输中是否损坏。

**2. 流量控制（Flow Control）**：

- 解决**发送方与接收方速率不匹配**的问题。
- 通过 **滑动窗口** 和 **接收窗口（rwnd）** 实现：接收方在 ACK 中告知当前可接收的字节数，发送方据此调整发送速率。
- 当 rwnd 为 0 时，发送方停止发送，等待窗口更新。

**3. 拥塞控制（Congestion Control）**：

- 解决**发送方与网络承载能力不匹配**的问题。
- 主要算法：
  - **慢启动（Slow Start）**：cwnd 从 1 开始指数增长。
  - **拥塞避免（Congestion Avoidance）**：达到阈值后线性增长。
  - **快重传 / 快恢复（Fast Retransmit / Fast Recovery）**：收到 3 个重复 ACK 时快速重传并恢复。
- 核心指标：**拥塞窗口（cwnd）**和**慢启动阈值（ssthresh）**。

```text
发送窗口 = min(rwnd, cwnd)
```

三者关系：可靠传输保证数据不错、不丢、不乱；流量控制防止接收方被压垮；拥塞控制防止网络被压垮。最终发送窗口由接收窗口和拥塞窗口共同限制。

**评分维度**：
- 能解释可靠传输的 ACK、序列号、重传机制（35%）
- 能解释流量控制的滑动窗口与 rwnd（30%）
- 能解释拥塞控制的慢启动、拥塞避免、快重传（35%）

**常见错误**：
- 把流量控制和拥塞控制混为一谈。
- 只记算法名称，说不出触发条件和窗口变化。
- 认为 TCP 重传只依赖超时，忽略快速重传。

**延伸追问**：
- TCP 的 RTT 和 RTO 如何估算？
- 为什么 TCP 拥塞控制从慢启动开始而不是直接满速？

**相关题目**：
- [FB-04-CO-B-004 TCP 三次握手](#FB-04-CO-B-004)
- [FB-04-CO-P-002 TCP 拥塞控制算法 CUBIC 与 BBR](#FB-04-CO-P-002)

**参考资源**：
- [RFC 5681 - TCP Congestion Control](https://tools.ietf.org/html/rfc5681)
- [MDN - TCP](https://developer.mozilla.org/en-US/docs/Glossary/TCP)

**口头回答版**：
> - 序列号与确认应答（ACK）：每个字节都有序列号，接收方返回期望下一个字节的 ACK。 - 超时重传（RTO）：发送方未收到 ACK 则在超时后重传。 - 去重与排序：接收方根据序列号丢弃重复包、按序提交。 - 校验和：检测数据在传输中是否损坏。

---

### FB-04-CO-A-013：DNS 安全有哪些威胁？DNS over HTTPS（DoH）有什么作用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：DNS、DNS 安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举 DNS 面临的主要安全威胁，并说明 DNS over HTTPS（DoH）与传统 DNS 相比有什么安全优势。

**参考答案**：

**DNS 安全威胁**：

1. **DNS 劫持**：攻击者篡改 DNS 解析结果，将用户导向钓鱼网站。
2. **DNS 缓存投毒**：向 DNS 缓存服务器注入虚假记录。
3. **DNS 欺骗 / 中间人攻击**：在本地网络或公共 Wi-Fi 中伪造 DNS 响应。
4. **DNS 泄露**：即使使用 VPN/代理，DNS 查询仍走本地运营商，暴露访问目标。

**传统 DNS 的问题**：

- 使用 UDP 53 端口明文传输，容易被监听和篡改。
- 请求/响应无加密、无身份验证。

**DoH（DNS over HTTPS）**：

- 将 DNS 查询封装在 HTTPS 请求中，使用 443 端口，享受 TLS 的加密和身份认证。
- 优点：防止监听、防止篡改、绕过部分 DNS 劫持。
- 缺点：可能增加延迟、依赖 DoH 服务商、企业内网审计困难。

```text
传统 DNS：客户端 --UDP 53--> 本地 DNS
DoH：     客户端 --HTTPS 443--> DoH 服务器
```

**DoT（DNS over TLS）**：

- 直接在 TLS 之上运行 DNS 协议，使用 853 端口。
- 与 DoH 相比更轻量，但端口特征明显，易被封锁。

**评分维度**：
- 能列举至少 3 种 DNS 安全威胁（35%）
- 能解释 DoH 的加密与防篡改原理（35%）
- 能对比 DoH 与 DoT 的优缺点（30%）

**常见错误**：
- 认为 DoH 可以完全防止 DNS 劫持，实际上仍需信任 DoH 服务商。
- 把 DoH 与 VPN 混淆，DoH 只加密 DNS 查询，不加密后续流量。
- 忽略 DoH 对企业网络策略和故障排查的影响。

**延伸追问**：
- 浏览器如何决定是否使用 DoH？用户能否强制开启？
- 在零信任架构中，DNS 安全应如何设计？

**相关题目**：
- [FB-04-CO-B-006 DNS 解析流程](#FB-04-CO-B-006)
- [FB-04-SE-A-002 中间人攻击与 DNS 劫持](#FB-04-SE-A-002)

**参考资源**：
- [Cloudflare - DNS over HTTPS](https://www.cloudflare.com/learning/dns/dns-over-tls/)
- [MDN - DNS-over-HTTPS](https://developer.mozilla.org/en-US/docs/Web/Security/DNS-over-HTTPS)

**口头回答版**：
> DNS 劫持：攻击者篡改 DNS 解析结果，将用户导向钓鱼网站。 DNS 缓存投毒：向 DNS 缓存服务器注入虚假记录。 DNS 欺骗 / 中间人攻击：在本地网络或公共 Wi-Fi 中伪造 DNS 响应。 DNS 泄露：即使使用 VPN/代理，DNS 查询仍走本地运营商，暴露访问目标。

---

### FB-04-SE-A-002：什么是中间人攻击（MITM）和 DNS 劫持？HTTPS 能否完全防御？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：MITM、DNS 安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释中间人攻击（MITM）和 DNS 劫持的原理，并讨论 HTTPS 能否完全防御这些攻击，还需要哪些补充手段。

**参考答案**：

**中间人攻击（MITM）**：

- 攻击者插入客户端与服务器之间，窃听、篡改或伪造通信内容。
- 常见方式：ARP 欺骗、伪造 Wi-Fi 热点、代理劫持、SSL 剥离（SSL Stripping）。

**DNS 劫持**：

- 攻击者篡改 DNS 解析结果，使用户访问恶意 IP。
- 常见方式：本地 hosts 篡改、路由器 DNS 被改、运营商/本地 DNS 缓存投毒。

**HTTPS 的防御能力**：

- HTTPS 通过 TLS 提供加密和服务器身份认证，能防御**传输过程中**的窃听和篡改。
- 但如果攻击者能伪造或安装受信任的根证书（如企业代理、恶意软件），仍可实施 MITM。
- 如果用户忽略证书警告继续访问，HTTPS 也会失效。

**补充防御手段**：

1. **HSTS（HTTP Strict Transport Security）**：强制浏览器只通过 HTTPS 访问，防御 SSL 剥离。
2. **证书固定（HPKP / Certificate Pinning）**：将服务器证书或公钥嵌入客户端，防止伪造证书。
3. **DNSSEC**：为 DNS 响应提供签名验证，防止 DNS 篡改。
4. **DoH/DoT**：加密 DNS 查询，降低 DNS 劫持风险。
5. **安全意识**：不随意安装根证书、警惕公共 Wi-Fi。

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**评分维度**：
- 能解释 MITM 和 DNS 劫持的原理（35%）
- 能分析 HTTPS 能防什么、不能防什么（35%）
- 能列举 HSTS、DNSSEC、DoH、证书固定等补充手段（30%）

**常见错误**：
- 认为 HTTPS 绝对安全，忽略证书伪造和 SSL 剥离。
- 把 DNS 劫持等同于 MITM，实际上 DNS 劫持是 MITM 的一种前置手段。
- 认为 HSTS 能防御首次访问攻击，实际上 HSTS 依赖首次安全访问。

**延伸追问**：
- 企业 HTTPS 代理算不算 MITM？如何平衡安全与审计？
- 移动 App 中如何实施证书固定？有什么风险？

**相关题目**：
- [FB-04-CO-A-002 HTTPS 的 TLS 握手](#FB-04-CO-A-002)
- [FB-04-CO-A-013 DNS 安全与 DNS over HTTPS](#FB-04-CO-A-013)

**参考资源**：
- [OWASP - Man-in-the-middle attack](https://owasp.org/www-community/attacks/Man-in-the-middle_attack)
- [Cloudflare - What is DNS hijacking?](https://www.cloudflare.com/learning/dns/dns-security/)

**口头回答版**：
> 中间人攻击（MITM）： - 攻击者插入客户端与服务器之间，窃听、篡改或伪造通信内容。 - 常见方式：ARP 欺骗、伪造 Wi-Fi 热点、代理劫持、SSL 剥离（SSL Stripping）。 - 攻击者篡改 DNS 解析结果，使用户访问恶意 IP。

---
### FB-04-CO-A-018：TCP 粘包与拆包问题是如何产生的？如何解决？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络
**标签**：TCP、粘包、拆包、字节流
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 TCP 粘包/拆包的原因，并给出应用层解决方案。

**参考答案**：

TCP 是面向字节流的协议，没有消息边界。发送方可能把多个小报文合并发送（粘包），也可能把大报文分片发送（拆包）。应用层需自行定义消息边界。

常见方案：固定长度、分隔符、长度前缀。HTTP 使用 Content-Length 或分块传输解决边界问题。

**评分维度**：
- 原因（40%）：字节流无边界
- 固定长度（20%）：定长消息
- 分隔符（20%）：特殊字符分隔
- 长度前缀（20%）：先读长度再读数据

**常见错误**：
- 认为 TCP 按应用层报文为单位传输
- 用简单字符串 split 处理二进制数据导致边界错误
- 长度前缀不考虑字节序和大端小端

**口头回答版**：
> TCP 粘包/拆包源于字节流无消息边界，应用层可用固定长度、分隔符或长度前缀定义边界。

### FB-04-CO-A-019：长连接与短连接的区别及适用场景

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络
**标签**：HTTP、Keep-Alive、长连接、短连接
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 HTTP 长连接和短连接在 TCP 握手、资源消耗和适用场景上的差异。

**参考答案**：

短连接：每次请求都新建 TCP 连接，响应后关闭，适合低频请求。长连接（Keep-Alive）：复用 TCP 连接发送多个请求，减少握手开销，适合高频、连续请求，如 REST API、HTTP/2。

注意长连接需管理空闲超时和连接池大小。


**补充说明**：

在实际落地 长连接与短连接的区别及适用场景 时，建议结合 HTTP、Keep-Alive、长连接 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 握手开销（40%）：短连接多次握手
- 资源占用（30%）：长连接维持与连接数
- 场景（30%）：低频 vs 高频请求

**常见错误**：
- 认为长连接一定比短连接性能好
- 长连接没有空闲超时，导致连接泄漏
- HTTP/2 仍使用短连接

**口头回答版**：
> 长连接复用 TCP 减少握手开销，适合高频请求；短连接简单，适合低频或一次性请求。

### FB-04-CO-A-020：正向代理、反向代理和透明代理有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络
**标签**：代理、正向代理、反向代理、负载均衡
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明三种代理的位置、可见性和典型应用场景。

**参考答案**：

正向代理位于客户端和目标服务器之间，代理客户端访问外网，客户端需配置，服务端不知道真实客户端（如 VPN）。反向代理位于服务端前，代理服务器响应请求，客户端无感知，常用于负载均衡、SSL 终结、缓存（如 Nginx）。透明代理对客户端和服务端都不可感知，常用于企业审计。

CDN 属于反向代理。

**评分维度**：
- 正向代理（30%）：代理客户端
- 反向代理（40%）：代理服务端、负载均衡
- 透明代理（30%）：无感知中间人

**常见错误**：
- 认为 CDN 是正向代理
- 反向代理直接暴露后端真实服务器
- 混淆代理和 NAT 网关的作用

**口头回答版**：
> 正向代理代理客户端，反向代理代理服务端，CDN 属于反向代理。透明代理对两端无感知。

### FB-04-CO-A-021：If-None-Match 与 If-Modified-Since 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络
**标签**：HTTP、缓存、ETag、Last-Modified
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明两个请求头在协商缓存中的优先级和差异。

**参考答案**：

If-Modified-Since 携带 Last-Modified 时间，按时间判断资源是否变化；If-None-Match 携带 ETag，按资源标识判断。服务器优先使用 If-None-Match/ETag，更精确，可识别内容不变但时间变化的情况。

304 Not Modified 表示缓存可用。

**评分维度**：
- 时间 vs 标识（40%）：Last-Modified 与 ETag 差异
- 优先级（30%）：ETag 优先
- 响应（30%）：200 与 304 的区别

**常见错误**：
- 认为 If-Modified-Since 优先级高于 If-None-Match
- ETag 仅基于文件修改时间生成
- 协商缓存和强缓存混用导致预期外的网络请求

**口头回答版**：
> If-Modified-Since 基于时间，If-None-Match 基于 ETag；服务器优先比较 ETag，命中返回 304。

### FB-04-CO-A-022：WebSocket 握手过程及帧格式关键字段

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络
**标签**：WebSocket、握手、帧、协议升级
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述 WebSocket 从 HTTP 升级到全双工通信的过程。

**参考答案**：

握手：客户端发送带 Upgrade: websocket、Connection: Upgrade、Sec-WebSocket-Key 的 HTTP 请求；服务端返回 101 Switching Protocols 和 Sec-WebSocket-Accept（基于 Key 的哈希）。

帧格式关键字段：FIN（是否最后一个分片）、opcode（文本/二进制/关闭/心跳）、MASK（客户端帧必须掩码）、payload length、payload data。

**评分维度**：
- 握手请求（30%）：Upgrade、Sec-WebSocket-Key
- 握手响应（30%）：101、Sec-WebSocket-Accept
- 帧字段（40%）：FIN、opcode、MASK、payload

**常见错误**：
- 认为 WebSocket 不依赖 HTTP 协议
- 忽略客户端必须对 payload 进行掩码
- 把 Sec-WebSocket-Key 直接当作认证密钥

**口头回答版**：
> WebSocket 通过 HTTP 协议升级握手，服务端返回 101；帧中 FIN、opcode、MASK、payload length 是关键字段。

### FB-04-CO-A-023：同源策略具体限制了哪些资源的访问？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络
**标签**：同源策略、CORS、DOM、存储
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明同源策略对脚本、AJAX、DOM、Cookie、存储的限制。

**参考答案**：

同源策略限制：

1. DOM 访问：不同源窗口/iframe 不能读取 document/contentWindow。
2. AJAX：XMLHttpRequest/fetch 默认不能跨源读取响应。
3. Cookie/Web Storage/IndexedDB：不同源页面不能互相访问。
4. Canvas：跨域图片绘制后 canvas 被污染，无法 toDataURL。

标签如 script/img/link 的跨域加载不受限制，但读取内容受限。

**评分维度**：
- DOM（25%）：iframe/窗口访问
- AJAX（25%）：请求响应读取
- 存储（25%）：Cookie/Storage
- Canvas（25%）：跨域图片污染

**常见错误**：
- 认为 script 标签加载跨域资源违反同源策略
- 忽略 CORS 只放宽读取响应，不放宽 DOM 访问
- 用 document.domain 降低安全性而不评估风险

**口头回答版**：
> 同源策略限制跨源 DOM 访问、AJAX 响应读取、存储访问和 Canvas 读取；标签加载本身不限制。

### FB-04-CO-A-024：DNS 负载均衡与 GSLB 的基本思想

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络
**标签**：DNS、负载均衡、GSLB、CDN
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 DNS 如何支持流量分发和全局负载均衡。

**参考答案**：

DNS 负载均衡：为一个域名配置多个 A/AAAA 记录，递归 DNS 按轮询、权重或地理位置返回不同 IP，分散流量。

GSLB（全局负载均衡）：基于 DNS 或 HTTP 302/Anycast，根据用户地理位置、网络状况、节点健康度将请求调度到最近或最健康的机房/CDN 节点。

**评分维度**：
- DNS 轮询（40%）：多 A 记录分发
- GSLB（40%）：地理/健康度调度
- 优缺点（20%）：DNS 缓存导致切换不及时

**常见错误**：
- 认为 DNS 负载均衡能精确控制会话粘性
- 忽略 DNS TTL 对故障切换的影响
- 把 GSLB 和应用层负载均衡混为一谈

**口头回答版**：
> DNS 负载均衡通过多 A 记录分发流量；GSLB 基于地理和健康度做全局调度，但受 DNS 缓存影响。

### FB-04-SE-A-004：什么是 SSRF？前端如何配合防御？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：04 计算机网络
**标签**：SSRF、服务器端请求伪造、安全、输入校验
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 SSRF 原理及前端在 URL 输入场景中的防御配合。

**参考答案**：

SSRF 是攻击者诱使服务端发起对内部网络或敏感资源的请求。前端可在 URL 输入场景做白名单校验、禁止私有 IP 和 localhost、限制协议为 http/https，并将原始 URL 传给服务端，不做前端代理跳转。

    function isPrivateIP(ip) { ... } // 校验 10/172/192 段


**补充说明**：

在实际落地 SSRF前端如何配合防御 时，建议结合 SSRF、服务器端请求伪造、安全 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 原理（40%）：服务端发起恶意请求
- 前端校验（30%）：URL 白名单、协议限制
- 配合后端（30%）：不绕过服务端校验

**常见错误**：
- 前端绕过校验后直接请求内网资源
- 把 SSRF 完全当成后端问题，前端不做输入控制
- 用正则简单判断 URL，无法识别编码和重定向绕过

**口头回答版**：
> SSRF 是服务端请求伪造，前端应校验 URL 白名单、协议和私有 IP，并配合后端再做严格校验。
---

## 深入题（19 道）{#proficient}

**口头回答版**：
> 中间人攻击（MITM）： - 攻击者插入客户端与服务器之间，窃听、篡改或伪造通信内容。 - 常见方式：ARP 欺骗、伪造 Wi-Fi 热点、代理劫持、SSL 剥离（SSL Stripping）。 - 攻击者篡改 DNS 解析结果，使用户访问恶意 IP。

### FB-04-CO-P-001：HTTP/2 的 HPACK、Server Push 以及实际使用中有哪些关键问题？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、27 性能工程
**标签**：HTTP/2、HPACK、多路复用
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请深入讲解 HTTP/2 的 HPACK 头部压缩机制和 Server Push 原理，并说明它们在实际应用中面临的问题与最佳实践。

**参考答案**：

**HPACK（Header Compression for HTTP/2）**：

- HTTP/1.x 头部以明文重复发送，开销大；HPACK 通过**静态表**、**动态表**和**霍夫曼编码**压缩头部。
- **静态表**：预定义 61 个常见头部字段（如 `:method: GET`、`content-type`）。
- **动态表**：连接级 FIFO 缓存，存储双方已发送的头部，索引号从 62 开始。
- **霍夫曼编码**：对字符串值进行压缩。
- **注意**：动态表大小受 `SETTINGS_HEADER_TABLE_SIZE` 限制，且可能引发**压缩侧信道攻击（HPACK Bomb / CRIME 变体）**。

**Server Push**：

- 服务器可主动将客户端可能需要的资源（如 CSS、JS）推送到客户端缓存，无需等待客户端解析 HTML 后发起请求。
- 通过 `PUSH_PROMISE` 帧实现，需在响应同一请求前发送。

**实际问题**：

1. **Server Push 命中率低**：服务器难以准确预测客户端缓存，容易推送已缓存资源。
2. **缓存挑战**：推送的资源与浏览器缓存状态同步困难。
3. **优先级与带宽竞争**：推送可能抢占关键资源带宽。
4. **现代浏览器弃用**：Chrome 已从桌面版移除对 Server Push 的支持，推荐优先使用 HTTP/3 或 `103 Early Hints`。

```http
# 103 Early Hints 作为替代方案
HTTP/1.1 103 Early Hints
Link: </style.css>; rel=preload; as=style
Link: </app.js>; rel=preload; as=script
```

**评分维度**：
- 能解释 HPACK 的静态表、动态表和霍夫曼编码（35%）
- 能说明 Server Push 的原理与缺陷（30%）
- 能提及 HPACK 安全风险和 Server Push 被弃用的现状（20%）
- 能给出替代方案（103 Early Hints、预加载）（15%）

**常见错误**：
- 认为 HPACK 只是 gzip 压缩头部。
- 把 Server Push 当作“推送消息”，实际上推送的是静态资源。
- 不了解主流浏览器已弱化 Server Push。

**延伸追问**：
- HPACK 动态表如果过大会有什么风险？
- `preload` 与 Server Push 的区别是什么？

**相关题目**：
- [FB-04-CO-A-001 HTTP/1.1 与 HTTP/2 的核心区别](#FB-04-CO-A-001)
- [FB-04-PE-P-002 前端网络性能优化](#FB-04-PE-P-002)

**参考资源**：
- [RFC 7541 - HPACK](https://tools.ietf.org/html/rfc7541)
- [web.dev - HTTP/2 Server Push](https://web.dev/articles/http2-push)

**口头回答版**：
> HPACK（Header Compression for HTTP/2）： - HTTP/1.x 头部以明文重复发送，开销大；HPACK 通过静态表、动态表和霍夫曼编码压缩头部。 - 静态表：预定义 61 个常见头部字段（如 :method: GET、content-type）。 - 动态表：连接级 FIFO 缓存，存储双方已发送的头部，索引号从 62 开始。

---

### FB-04-CO-P-002：TCP 拥塞控制算法 CUBIC 与 BBR 的区别是什么？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、27 性能工程
**标签**：TCP、拥塞控制
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 TCP 拥塞控制算法 CUBIC 与 BBR 的设计思想、优缺点及适用场景。

**参考答案**：

**CUBIC（Linux 默认）**：

- 基于**丢包**的拥塞控制算法。
- 核心思想：在丢包后按三次函数（cubic function）增长拥塞窗口，快速恢复到丢包前速率。
- 优点：在高带宽、低延迟网络中吞吐量大。
- 缺点：
  - 需要把缓冲区填满到丢包才认为网络拥塞，导致**Bufferbloat**（缓冲区膨胀）。
  - 在 Wi-Fi、移动网络等随机丢包场景下性能下降。

**BBR（Bottleneck Bandwidth and Round-trip propagation time）**：

- 由 Google 提出，基于**模型**而非丢包：测量瓶颈带宽（BtlBw）和最小 RTT（RTprop）。
- 发送速率 = BtlBw， inflight 数据量 = BtlBw × RTprop。
- 优点：
  - 不需要填满缓冲区，延迟更低。
  - 对随机丢包容忍度高。
  - 在 YouTube 等场景中显著提升吞吐和降低缓冲时间。
- 缺点：
  - 与基于丢包的算法共存时可能占用更多带宽（不公平性）。
  - 对网络抖动敏感，需要持续测量。

```text
CUBIC: 发送窗口增长 -> 缓冲区填满 -> 丢包 -> 减半 -> 再次增长
BBR:   测量 BtlBw 与 RTprop -> 控制发送速率和 inflight -> 维持低延迟高吞吐
```

**评分维度**：
- 能解释 CUBIC 基于丢包和三次窗口增长的思想（35%）
- 能解释 BBR 基于瓶颈带宽和 RTT 的模型（35%）
- 能对比两者在 Bufferbloat、随机丢包、共存场景的表现（30%）

**常见错误**：
- 认为 BBR 只是 CUBIC 的优化版本，实际上设计思想完全不同。
- 只讲名字和来源，讲不清测量指标和窗口控制逻辑。
- 认为 CUBIC 已过时，实际上仍是 Linux 默认且广泛使用。

**延伸追问**：
- 如何在内核或服务器上切换拥塞控制算法？
- QUIC 的拥塞控制与 TCP 相比有哪些不同？

**相关题目**：
- [FB-04-CO-A-012 TCP 的可靠传输、流量控制和拥塞控制](#FB-04-CO-A-012)
- [FB-04-CO-P-004 QUIC 的 0-RTT 与连接迁移](#FB-04-CO-P-004)

**参考资源**：
- [ACM Queue - BBR: Congestion-Based Congestion Control](https://queue.acm.org/detail.cfm?id=3022184)
- [Linux CUBIC paper](https://www.cs.princeton.edu/courses/archive/fall16/cos561/papers/Cubic08.pdf)

**口头回答版**：
> CUBIC（Linux 默认）： - 基于丢包的拥塞控制算法。 - 核心思想：在丢包后按三次函数（cubic function）增长拥塞窗口，快速恢复到丢包前速率。 - 优点：在高带宽、低延迟网络中吞吐量大。

---

### FB-04-CO-P-003：TLS 1.3 相比 TLS 1.2 有哪些改进？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、05 Web 安全
**标签**：HTTPS、TLS 1.3
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 TLS 1.3 相比 TLS 1.2 在握手效率、安全性和算法支持方面的主要改进。

**参考答案**：

**1. 握手效率提升**：

- TLS 1.2：完整握手通常 2-RTT（不含 TCP）。
- TLS 1.3：完整握手 1-RTT，复用会话时 **0-RTT**，显著降低首次请求延迟。

**2. 握手简化**：

- TLS 1.3 将握手消息从 4 个阶段简化为 3 个阶段。
- 删除了 ServerKeyExchange、ChangeCipherSpec 等冗余消息。
- ServerHello 之后所有消息已加密。

**3. 安全性增强**：

- 移除了大量过时或不安全的算法和加密套件，如 MD5、SHA-1、RC4、DES、RSA 密钥交换。
- 仅支持 AEAD 加密套件（如 AES-GCM、ChaCha20-Poly1305）。
- 强制使用前向保密（Forward Secrecy）：仅支持 DHE/ECDHE 密钥交换。

**4. 0-RTT 模式**：

- 客户端在第二次连接时可直接发送应用数据，无需等待握手完成。
- 风险：存在**重放攻击**隐患，对非幂等请求需谨慎使用。

```text
TLS 1.2: ClientHello -> ServerHello + Certificate + ServerHelloDone
         -> ClientKeyExchange + ChangeCipherSpec + Finished
         -> ChangeCipherSpec + Finished (2-RTT)

TLS 1.3: ClientHello -> ServerHello + {EncryptedExtensions + Certificate + Finished}
         -> Finished + 应用数据 (1-RTT)
```

**评分维度**：
- 能比较 TLS 1.2 与 TLS 1.3 的 RTT（30%）
- 能说明移除的不安全算法与强制前向保密（35%）
- 能解释 0-RTT 的收益与重放风险（35%）

**常见错误**：
- 认为 TLS 1.3 把 TCP 三次握手也省略了。
- 认为 0-RTT 完全无风险，忽略重放攻击。
- 说不出具体被淘汰的算法名称。

**延伸追问**：
- TLS 1.3 的 0-RTT 如何防御重放攻击？
- 前向保密为什么重要？RSA 密钥交换为什么不满足前向保密？

**相关题目**：
- [FB-04-CO-A-002 HTTPS 的 TLS 握手](#FB-04-CO-A-002)
- [FB-04-CO-A-010 HTTP/3 与 QUIC](#FB-04-CO-A-010)

**参考资源**：
- [RFC 8446 - TLS 1.3](https://tools.ietf.org/html/rfc8446)
- [Cloudflare - TLS 1.3](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/)

**口头回答版**：
> - TLS 1.2：完整握手通常 2-RTT（不含 TCP）。 - TLS 1.3：完整握手 1-RTT，复用会话时 0-RTT，显著降低首次请求延迟。 - TLS 1.3 将握手消息从 4 个阶段简化为 3 个阶段。 - 删除了 ServerKeyExchange、ChangeCipherSpec 等冗余消息。

---

### FB-04-SC-P-001：如何设计一个支持高并发的 WebSocket 聊天室？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、32 实时与协同
**标签**：WebSocket、实时通信、高并发
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个支持百万在线用户、多房间、消息有序的 WebSocket 聊天室，说明连接管理、消息路由、状态同步、容灾等关键设计。

**参考答案**：

**1. 架构分层**：

```text
全球用户
   |
L4/L7 负载均衡（支持长连接一致性哈希）
   |
WebSocket 网关集群（无状态）
   |
消息队列 / Pub-Sub（Redis、RabbitMQ、Kafka、RocketMQ）
   |
业务服务（房间、用户、消息持久化）
```

**2. 连接管理**：

- 每个 WebSocket 连接绑定到一台网关，使用一致性哈希或 sticky session 减少连接漂移。
- 维护用户 ID -> 连接 ID -> 网关节点的映射（可放在 Redis 或分布式注册中心）。
- 心跳检测（ping/pong）和断线重连，清理僵尸连接。

**3. 房间与消息路由**：

- 用户加入房间时，订阅对应房间的消息通道。
- 发送消息时，业务服务校验权限后将消息写入 MQ，网关消费后推送给房间内的在线用户。
- 对超大房间（如全员广播）可分级推送：在线用户实时推送，离线用户走消息存储 + 拉取。

**4. 消息有序性**：

- 每个房间维护一个全局递增的消息 ID（Snowflake、Redis 自增）。
- 客户端按消息 ID 排序，缺失时主动拉取补全。
- 对单聊可保证按发送顺序到达；群聊允许轻微乱序后由客户端排序。

**5. 容灾与高可用**：

- 网关无状态，可水平扩展；连接断开后客户端自动重连到其他节点。
- 消息持久化到数据库（分库分表或时序数据库），支持历史消息查询。
- 限流：按用户、房间、IP 限流，防止刷屏。

```js
// 客户端断线重连 + 心跳示例
class ChatClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectDelay = 1000;
    this.heartbeatTimer = null;
  }
  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.reconnectDelay = 1000;
      this.heartbeatTimer = setInterval(() => this.ws.send('ping'), 30000);
    };
    this.ws.onclose = () => {
      clearInterval(this.heartbeatTimer);
      setTimeout(() => {
        this.connect();
        this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000);
      }, this.reconnectDelay);
    };
  }
}
```

**评分维度**：
- 能设计分层架构并说明无状态网关（30%）
- 能说明连接管理、心跳、重连机制（25%）
- 能设计房间消息路由与有序性方案（25%）
- 能考虑限流、容灾、离线消息（20%）

**常见错误**：
- 让 WebSocket 网关保存用户状态，导致无法水平扩展。
- 每个消息都直接广播给所有连接，无法支撑大房间。
- 忽略消息乱序和丢包问题。

**延伸追问**：
- 百万用户同时在线时，如何优雅扩容网关？
- 消息“已读回执”如何设计，才不会压垮服务器？

**相关题目**：
- [FB-04-CO-B-012 WebSocket 基础](#FB-04-CO-B-012)
- [FB-04-CO-P-005 WebSocket 心跳、断线重连与二进制消息](#FB-04-CO-P-005)

**参考资源**：
- [Socket.io - How it works](https://socket.io/docs/v4/how-it-works/)
- [Discord - How Discord Scaled Elixir](https://discord.com/blog/how-discord-scaled-elixir-to-5-000-000-concurrent-users)

**口头回答版**：
> - 每个 WebSocket 连接绑定到一台网关，使用一致性哈希或 sticky session 减少连接漂移。 - 维护用户 ID -> 连接 ID -> 网关节点的映射（可放在 Redis 或分布式注册中心）。 - 心跳检测（ping/pong）和断线重连，清理僵尸连接。 - 用户加入房间时，订阅对应房间的消息通道。

---

### FB-04-PE-P-001：将前端项目从 HTTP/2 迁移到 HTTP/3 需要考虑哪些性能与安全因素？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、27 性能工程
**标签**：HTTP/3、QUIC、性能优化
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
假设你负责将一个流量较大的前端项目从 HTTP/2 迁移到 HTTP/3，请说明需要评估的性能收益、潜在风险、兼容性处理与灰度方案。

**参考答案**：

**性能收益预期**：

1. **连接建立更快**：QUIC + TLS 1.3 首次 1-RTT、后续 0-RTT，减少首包时间。
2. **消除 TCP 队头阻塞**：移动网络、弱网环境下单流丢包不影响其他流。
3. **连接迁移**：用户网络切换（Wi-Fi ↔ 4G）时连接不中断。
4. **更平滑的拥塞控制**：QUIC 在用户空间实现，可快速迭代 BBR 等算法。

**迁移前评估**：

- 确认 CDN、负载均衡、WAF、防火墙是否支持 QUIC/UDP 443。
- 评估用户端 HTTP/3 支持率（现代浏览器已广泛支持）。
- 建立性能基线：首字节时间（TTFB）、LCP、FCP、错误率、重连率。

**潜在风险**：

- **UDP 被封禁或限速**：部分企业网络、国家/地区可能限制 UDP。
- **0-RTT 重放攻击**：对非幂等请求需加防重放令牌或禁用 0-RTT。
- **中间设备兼容**：老旧 NAT/防火墙对长连接 UDP 支持不佳。
- **可观测性**：QUIC 连接状态、丢包、重传等统计需要新工具。

**灰度方案**：

1. 在 CDN / 边缘节点开启 HTTP/3，源站仍走 HTTP/2。
2. 按地区、运营商、浏览器白名单灰度。
3. 同时监听 `Alt-Svc: h3=":443"; ma=86400`，让支持的客户端自动升级，不支持者回退 HTTP/2。
4. 监控关键指标，发现异常立即回滚。

```http
# 服务端返回 Alt-Svc 头部
Alt-Svc: h3=":443"; ma=86400, h2=":443"
```

**评分维度**：
- 能列出 HTTP/3 相比 HTTP/2 的性能收益（30%）
- 能识别 UDP、0-RTT、中间设备等风险（30%）
- 能设计灰度与回滚方案（25%）
- 能提出可观测性指标（15%）

**常见错误**：
- 认为 HTTP/3 在所有场景下都更快，忽略弱网环境外可能收益有限。
- 直接全量切换，没有兼容回退。
- 忽略 0-RTT 的安全风险。

**延伸追问**：
- 如何评估 HTTP/3 是否真正提升了你项目的核心指标？
- 如果企业防火墙限制 UDP 443，有哪些替代方案？

**相关题目**：
- [FB-04-CO-A-010 HTTP/3 与 QUIC](#FB-04-CO-A-010)
- [FB-04-CO-P-004 QUIC 的 0-RTT 与连接迁移](#FB-04-CO-P-004)

**参考资源**：
- [Cloudflare - HTTP/3 in practice](https://blog.cloudflare.com/http-3-from-root-to-tip/)
- [web.dev - QUIC and HTTP/3](https://web.dev/articles/quic-basics)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-04-SE-P-001：CSP、SameSite Cookie 与安全响应头如何协同防御前端攻击？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、05 Web 安全、31 安全架构
**标签**：CSP、Web 安全
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 CSP、SameSite Cookie、HSTS、X-Frame-Options、X-Content-Type-Options 等安全响应头的作用，并说明如何在前端工程中系统化落地。

**参考答案**：

**关键安全响应头**：

| 响应头 | 作用 |
|--------|------|
| `Content-Security-Policy (CSP)` | 限制页面可加载的脚本、样式、图片、连接等来源，防御 XSS 和数据注入。 |
| `Set-Cookie: ...; SameSite=Lax/Strict/None` | 控制 Cookie 是否随跨站请求发送，防御 CSRF。 |
| `Strict-Transport-Security (HSTS)` | 强制 HTTPS，防御 SSL 剥离。 |
| `X-Frame-Options: DENY/SAMEORIGIN` | 禁止页面被嵌入 iframe，防御点击劫持。 |
| `X-Content-Type-Options: nosniff` | 禁止浏览器猜测 MIME 类型，防御上传漏洞。 |
| `Referrer-Policy` | 控制 Referer 信息泄露范围。 |
| `Permissions-Policy` | 限制浏览器 API（摄像头、地理位置等）的使用。 |

**CSP 示例**：

```http
Content-Security-Policy: default-src 'self';
  script-src 'self' https://cdn.example.com 'nonce-abc123';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://img.example.com;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

**SameSite 策略**：

- `Strict`：完全禁止跨站携带 Cookie，安全最高但影响从外链进入的登录态。
- `Lax`：顶级导航 GET 请求可携带 Cookie，平衡安全与体验（现代浏览器默认值）。
- `None`：必须配合 `Secure` 使用，允许跨站携带 Cookie。

**系统化落地**：

1. **服务端统一配置**：在 Nginx / CDN / 网关层统一添加响应头。
2. **报告模式先行**：CSP 先用 `Content-Security-Policy-Report-Only` 收集违规报告，确认无问题后切换 enforce。
3. **Nonce / Hash**：避免 `'unsafe-inline'`，使用 CSP nonce 或 hash 允许内联脚本。
4. **自动化检测**：CI 中加入安全头扫描（如 Mozilla Observatory、securityheaders.com）。

```nginx
# Nginx 统一添加安全头
add_header Content-Security-Policy "default-src 'self'; script-src 'self';" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

**评分维度**：
- 能解释每个安全响应头的作用（35%）
- 能设计 CSP 策略并区分 report-only 与 enforce（30%）
- 能说明 SameSite 三档策略的差异与选型（20%）
- 能给出工程化落地流程（15%）

**常见错误**：
- CSP 直接使用 `'unsafe-inline' 'unsafe-eval'`，失去防御意义。
- 把 SameSite=None 不加 Secure 使用，浏览器会拒绝。
- 上线 CSP 前未用 report-only 验证，导致功能大面积不可用。

**延伸追问**：
- 如果业务需要加载第三方脚本（如统计、客服），CSP 如何最小权限配置？
- 点击劫持除了 X-Frame-Options，还可以用什么 CSP 指令防御？

**相关题目**：
- [FB-04-SE-A-001 XSS 与 CSRF 防御](#FB-04-SE-A-001)
- [FB-04-CP-R-001 零信任前端安全架构](#FB-04-CP-R-001)

**参考资源**：
- [MDN - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN - SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-04-SC-P-002：如何设计 RESTful API 的幂等性、版本控制与分页？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、19 Node.js / BFF
**标签**：RESTful、API 设计、幂等性
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套 RESTful API 规范，重点说明如何保证关键接口的幂等性、如何进行 API 版本控制、以及如何设计高效分页。

**参考答案**：

**1. 幂等性设计**：

幂等性指同一操作执行一次和多次结果相同。

| 方法 | 天然幂等 | 说明 |
|------|----------|------|
| GET | 是 | 只读 |
| PUT | 是 | 全量替换 |
| DELETE | 是 | 删除一次和多次结果一致 |
| PATCH | 否 | 局部更新可能非幂等 |
| POST | 否 | 创建资源，重复提交会重复创建 |

对非幂等 POST（如下单、支付），引入**幂等键（Idempotency-Key）**：

```http
POST /orders HTTP/1.1
Idempotency-Key: <uuid>
Content-Type: application/json

{ "productId": "P001", "quantity": 2 }
```

- 服务端以 Idempotency-Key + 用户 ID 为键缓存第一次响应。
- 重复请求直接返回缓存结果，避免重复处理。
- 设置幂等键过期时间（如 24 小时）。

**2. 版本控制**：

- **URL 路径版本**：`/api/v1/users`、`/api/v2/users`，最直观。
- **请求头版本**：`Accept: application/vnd.example.v2+json`。
- **查询参数版本**：`/api/users?version=2`。
- 推荐路径版本 + 请求头版本作为补充；避免同时维护过多版本。

**3. 分页设计**：

- **Offset/Limit**：`?page=1&size=20`，实现简单，但深页性能差、数据漂移。
- **Cursor/Keyset**：`?cursor=eyJpZCI6MTAwfQ==&limit=20`，基于排序键游标，性能稳定，适合实时数据。
- 返回结构应包含：数据列表、下一页游标、总条数（可选）、是否有更多。

```json
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTAwfQ==",
    "hasMore": true,
    "limit": 20
  }
}
```

**评分维度**：
- 能说明 RESTful 方法的幂等性并给出 Idempotency-Key 方案（35%）
- 能对比 API 版本控制策略并给出推荐（25%）
- 能设计 Offset 与 Cursor 分页并说明适用场景（25%）
- 能考虑缓存、并发与重复提交（15%）

**常见错误**：
- 对 POST 请求直接重试而不做幂等处理。
- 版本号放在 URL 查询参数中，导致缓存和路由混乱。
- 深分页仍使用 Offset，导致数据库全表扫描。

**延伸追问**：
- 如果幂等键被客户端恶意重复使用，服务端如何防止滥用？
- 在分布式系统中，如何保证幂等键的全局唯一性？

**相关题目**：
- [FB-04-CO-B-011 RESTful API 设计](#FB-04-CO-B-011)
- [FB-04-SC-A-001 网络请求重试与降级](#FB-04-SC-A-001)

**参考资源**：
- [Stripe - Idempotent Requests](https://stripe.com/docs/api/idempotent_requests)
- [API Versioning Best Practices](https://restfulapi.net/versioning/)

**口头回答版**：
> 幂等性指同一操作执行一次和多次结果相同。 | 方法 | 天然幂等 | 说明 | |------|----------|------| | GET | 是 | 只读 |

---

### FB-04-CO-P-004：QUIC 的 0-RTT 与连接迁移是如何实现的？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、27 性能工程
**标签**：QUIC、0-RTT
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请详细说明 QUIC 如何实现 0-RTT 数据发送，以及在网络切换时如何保持连接不中断。

**参考答案**：

**0-RTT 实现**：

1. 首次连接时，客户端与服务器完成 1-RTT 握手，服务器向客户端颁发一个**会话票据（Session Ticket / NST）**，包含加密的会话参数。
2. 客户端缓存该票据和恢复密钥。
3. 后续连接时，客户端在初始包中直接携带 Session Ticket 和早期数据（Early Data），无需等待握手完成即可发送应用数据。
4. 服务器解密并验证 Ticket 后，直接处理 Early Data。

```text
首次连接：ClientHello -> ServerHello + Ticket (1-RTT)
后续连接：ClientHello + Early Data -> ServerHello + 处理数据 (0-RTT)
```

**安全风险**：

- 0-RTT 数据可能被攻击者截获并重放，因此通常只用于幂等、低风险请求，或要求应用层做防重放。

**连接迁移**：

- TCP 连接由四元组（源 IP、源端口、目的 IP、目的端口）唯一标识，网络切换会改变四元组，导致连接中断。
- QUIC 使用**连接 ID（Connection ID）**标识连接，不依赖 IP/端口。
- 当客户端网络切换时，新的数据包携带相同 Connection ID，服务器可识别并继续通信。
- QUIC 还会通过**路径验证（Path Challenge / Path Response）**确认新路径可达，防止攻击者伪造地址。

**评分维度**：
- 能解释 0-RTT 的会话票据与 Early Data 机制（40%）
- 能说明 0-RTT 的重放风险与限制（25%）
- 能解释连接 ID 与路径验证如何实现连接迁移（35%）

**常见错误**：
- 认为 0-RTT 适用于所有请求，忽略重放风险。
- 认为连接迁移不需要任何验证，实际上有路径验证防止地址伪造。
- 把 QUIC 连接 ID 与 TCP 端口混为一谈。

**延伸追问**：
- 移动网络频繁切换时，连接迁移对用户体验有多大提升？
- QUIC 如何在 NAT 重绑定（NAT rebinding）场景下保持连接？

**相关题目**：
- [FB-04-CO-A-010 HTTP/3 与 QUIC](#FB-04-CO-A-010)
- [FB-04-PE-P-001 HTTP/3 迁移](#FB-04-PE-P-001)

**参考资源**：
- [RFC 9000 - QUIC](https://tools.ietf.org/html/rfc9000)
- [RFC 9001 - QUIC TLS](https://tools.ietf.org/html/rfc9001)

**口头回答版**：
> 首次连接时，客户端与服务器完成 1-RTT 握手，服务器向客户端颁发一个会话票据（Session Ticket / NST），包含加密的会话参数。 客户端缓存该票据和恢复密钥。 后续连接时，客户端在初始包中直接携带 Session Ticket 和早期数据（Early Data），无需等待握手完成即可发送应用数据。 服务器解密并验证 Ticket 后，直接处理 Early Data。

---

### FB-04-CO-P-005：WebSocket 的心跳、断线重连与二进制消息如何实现？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、32 实时与协同
**标签**：WebSocket、实时通信
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在复杂网络环境下，WebSocket 客户端和服务端应如何实现心跳保活、断线重连以及二进制消息传输。

**参考答案**：

**1. 心跳保活**：

- 原因：NAT、防火墙、负载均衡会主动断开长时间空闲连接。
- 实现：客户端/服务端定时发送 ping/pong 帧（WebSocket 协议原生支持）或应用层心跳消息。
- 策略：通常 30~60 秒一次 ping，若连续 N 次未收到 pong 则认为连接异常。

**2. 断线重连**：

- 监听 `onclose` / `onerror` 事件，使用指数退避重连。
- 重连后需要恢复状态：重新认证、重新订阅频道、同步消息序列号。
- 使用 ACK/SEQ 机制对消息去重，防止重连后重复处理。

```js
class ResilientWebSocket {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectDelay = 1000;
    this.heartbeatInterval = 30000;
    this.timer = null;
  }
  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.binaryType = 'arraybuffer'; // 接收二进制
    this.ws.onopen = () => {
      this.reconnectDelay = 1000;
      this.send({ type: 'auth', token: getToken() });
      this.startHeartbeat();
    };
    this.ws.onmessage = event => this.handleMessage(event.data);
    this.ws.onclose = () => this.reconnect();
    this.ws.onerror = err => console.error(err);
  }
  startHeartbeat() {
    this.timer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, this.heartbeatInterval);
  }
  reconnect() {
    clearInterval(this.timer);
    setTimeout(() => {
      this.connect();
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000);
    }, this.reconnectDelay);
  }
  send(data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(typeof data === 'string' ? data : JSON.stringify(data));
    }
  }
  sendBinary(buffer) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(buffer); // ArrayBuffer / Blob
    }
  }
}
```

**3. 二进制消息**：

- 设置 `ws.binaryType = 'arraybuffer'` 或 `'blob'`。
- 使用 Protocol Buffers、MessagePack 或自定义二进制协议序列化，减少带宽。
- 服务端（如 Node.js ws 库）可直接发送 Buffer。

```js
// 使用 MessagePack 编码
const msgpack = require('@msgpack/msgpack');
const encoded = msgpack.encode({ type: 'frame', data: imageBuffer });
ws.send(encoded);
```

**评分维度**：
- 能设计心跳机制并解释其作用（30%）
- 能设计断线重连与状态恢复（30%）
- 能说明二进制消息传输方式与序列化选择（25%）
- 能考虑消息去重与幂等性（15%）

**常见错误**：
- 不设心跳，导致连接被 NAT 静默断开。
- 重连后立即发送业务消息，未重新认证或订阅。
- 所有消息都使用 JSON，忽略二进制在音视频/游戏场景的优势。

**延伸追问**：
- WebSocket 心跳与应用层心跳有什么区别？何时使用协议层 ping/pong？
- 在弱网环境下，如何平衡心跳频率与电量消耗？

**相关题目**：
- [FB-04-CO-B-012 WebSocket 基础](#FB-04-CO-B-012)
- [FB-04-SC-P-001 高并发 WebSocket 聊天室](#FB-04-SC-P-001)

**参考资源**：
- [MDN - WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [RFC 6455 - WebSocket](https://tools.ietf.org/html/rfc6455)

**口头回答版**：
> - 原因：NAT、防火墙、负载均衡会主动断开长时间空闲连接。 - 实现：客户端/服务端定时发送 ping/pong 帧（WebSocket 协议原生支持）或应用层心跳消息。 - 策略：通常 30~60 秒一次 ping，若连续 N 次未收到 pong 则认为连接异常。 - 监听 onclose / onerror 事件，使用指数退避重连。

---

### FB-04-PE-P-002：前端网络性能优化可以从哪些层面入手？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：04 计算机网络、27 性能工程
**标签**：性能优化、网络请求、CDN
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请系统性地总结前端在网络层面的性能优化手段，覆盖 DNS、TCP/TLS、HTTP、缓存、CDN 等环节。

**参考答案**：

**1. DNS 优化**：

- 使用 DNS 预解析：`<link rel="dns-prefetch" href="//cdn.example.com">`
- 使用预连接：`<link rel="preconnect" href="https://cdn.example.com">`，提前完成 DNS + TCP + TLS。

**2. TCP/TLS 优化**：

- 升级到 TLS 1.3，减少握手 RTT。
- 启用 HTTP/2 或 HTTP/3，减少连接数并消除/缓解队头阻塞。
- 保持长连接（Keep-Alive / 连接池）。

**3. 资源加载优化**：

- 压缩：Gzip / Brotli 压缩文本资源。
- 代码分割（Code Splitting）与懒加载，减少首包体积。
- Tree Shaking 移除未使用代码。
- 图片使用 WebP/AVIF、响应式图片、懒加载。

**4. 缓存优化**：

- HTML 入口设置 `no-cache` 或短 TTL。
- 静态资源加 hash 文件名，设置长期强缓存。
- 使用 Service Worker 做离线缓存和 Stale-while-revalidate。

**5. CDN 与边缘**：

- 静态资源部署到 CDN。
- 启用 HTTP/2、Brotli、边缘缓存。
- 对动态内容使用边缘计算（Edge Workers）就近渲染。

**6. 预加载策略**：

```html
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
<link rel="prefetch" href="/next-page.js">
<link rel="modulepreload" href="/module.js">
```

**7. 请求数量与体积**：

- 合并小图标为 SVG Sprite 或 Icon Font。
- 使用 HTTP/2 后不必过度合并资源，可适度拆分以利用缓存。
- 启用压缩、最小化（Minify）。

**评分维度**：
- 能覆盖 DNS、TCP/TLS、HTTP、缓存、CDN 至少 4 个层面（40%）
- 能解释每项优化背后的网络原理（30%）
- 能结合实际指标（FCP、LCP、TTFB）说明优化效果（20%）
- 能区分 preload/prefetch/preconnect 的适用场景（10%）

**常见错误**：
- 只关注资源压缩，忽略网络协议层优化。
- 在 HTTP/2 环境下仍过度合并资源，降低缓存命中率。
- 滥用 preload，导致关键带宽被非关键资源占用。

**延伸追问**：
- 如何量化一次网络优化的实际收益？
- HTTP/2 下资源拆分与合并的权衡点是什么？

**相关题目**：
- [FB-04-CO-A-001 HTTP/1.1 与 HTTP/2](#FB-04-CO-A-001)
- [FB-04-CO-A-003 CDN 原理与选型](#FB-04-CO-A-003)
- [FB-04-CO-A-006 Cache-Control、ETag 与 Last-Modified](#FB-04-CO-A-006)

**参考资源**：
- [web.dev - Optimize resource loading](https://web.dev/articles/optimize-lcp)
- [MDN - Link types: preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)

**口头回答版**：
> - 使用 DNS 预解析：&lt;link rel="dns-prefetch" href="//cdn.example.com"&gt; - 使用预连接：&lt;link rel="preconnect" href="https://cdn.example.com"&gt;，提前完成 DNS + TCP + TLS。 TCP/TLS 优化： - 升级到 TLS 1.3，减少握手 RTT。

---
### FB-04-CO-P-010：TCP 的 TIME_WAIT 状态为什么存在？过多如何优化？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：04 计算机网络
**标签**：TCP、TIME_WAIT、连接状态、性能
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TIME_WAIT 的作用及高并发短连接场景下的优化手段。

**参考答案**：

TIME_WAIT 存在两个原因：1) 保证最后一个 ACK 丢失后能重传，避免对端 FIN 重发后无法处理；2) 让旧连接的延迟报文在网络中消失，防止新连接收到过期数据。

优化：连接复用（Keep-Alive/连接池）、tw_reuse（仅客户端）、tw_recycle（已废弃）、增加本地端口范围、使用长连接协议如 HTTP/2。

**评分维度**：
- 作用（50%）：ACK 重传与旧报文清理
- 问题（20%）：端口耗尽
- 优化（30%）：连接池、长连接、端口范围

**常见错误**：
- 直接修改内核大量降低 TIME_WAIT 而不理解风险
- 在服务端开启 tw_reuse
- 高并发短连接不使用连接池

**口头回答版**：
> TIME_WAIT 保证可靠关闭和旧报文清理，过多时通过连接池、长连接和端口范围优化。

### FB-04-CO-P-011：HTTP 范围请求（Range Requests）如何实现断点续传？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：04 计算机网络
**标签**：HTTP、Range、断点续传、下载
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Range/Content-Range 头字段及 206 Partial Content 的应用。

**参考答案**：

客户端通过 Range: bytes=start-end 请求资源的一部分；服务端返回 206 Partial Content 和 Content-Range: bytes start-end/total。客户端可合并多个分片，失败时只重试缺失分片。

    Range: bytes=0-1023
    Content-Range: bytes 0-1023/10000

**评分维度**：
- 请求头（40%）：Range 格式
- 响应头（30%）：Content-Range 与 206
- 续传逻辑（30%）：分片合并与失败重试

**常见错误**：
- 断点续传不使用 Range，而是重新下载整个文件
- 服务端返回 200 而非 206
- 多线程下载时未校验分片顺序和完整性

**口头回答版**：
> HTTP 范围请求通过 Range/Content-Range 获取资源片段，返回 206，用于断点续传和多线程下载。

### FB-04-CO-P-012：QUIC 的连接迁移是如何实现的？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：04 计算机网络
**标签**：QUIC、连接迁移、UDP、HTTP/3
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 QUIC 如何在不中断连接的情况下切换网络。

**参考答案**：

QUIC 基于 UDP，连接标识由连接 ID 而非四元组确定。当客户端 IP 或端口变化时，只要连接 ID 不变，服务端即可识别同一连接，继续传输。

这解决了 TCP 在 Wi-Fi/4G 切换时连接中断的问题。


**补充说明**：

在实际落地 QUIC 的连接迁移是如何实现的 时，建议结合 QUIC、连接迁移、UDP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 连接标识（40%）：Connection ID 替代四元组
- UDP 优势（30%）：无 TCP 握手依赖
- 场景（30%）：移动网络切换

**常见错误**：
- 认为 QUIC 连接迁移需要重新握手
- 把 QUIC 的连接 ID 和 TLS session ticket 混为一谈
- 忽略服务端需要验证新路径的防攻击机制

**口头回答版**：
> QUIC 使用连接 ID 标识连接，IP/端口变化时仍可迁移，适合移动网络切换。

### FB-04-CO-P-013：HTTPS 证书链验证过程及潜在风险

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：04 计算机网络
**标签**：HTTPS、证书链、CA、TLS
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明浏览器如何验证服务器证书，以及可能存在的风险。

**参考答案**：

验证：1) 检查证书有效期和域名匹配；2) 使用上级 CA 公钥验证签名，逐级到信任锚；3) 检查证书吊销状态（CRL/OCSP）；4) 验证证书用途和基本约束。

风险：中间人使用非法 CA 证书、私有 CA 被滥用、CRL/OCSP 检查被拦截、用户忽略证书警告。

**评分维度**：
- 签名验证（30%）：逐级验证 CA 签名
- 信任锚（30%）：系统/浏览器根证书
- 吊销检查（20%）：CRL/OCSP
- 风险（20%）：非法 CA、用户忽略警告

**常见错误**：
- 认为 HTTPS 证书绝对无法伪造
- 忽略证书链中中间证书缺失导致的验证失败
- 混淆自签名证书与 CA 签名证书的安全性

**口头回答版**：
> HTTPS 证书链验证包括有效期、域名、签名、吊销等；风险来自非法 CA、私有根证书和用户忽略警告。

### FB-04-CO-P-014：WebTransport 与 WebSocket 的设计差异

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：04 计算机网络
**标签**：WebTransport、WebSocket、HTTP/3、实时通信
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较两者的传输层、API 模型和适用场景。

**参考答案**：

WebSocket 基于 TCP 和 HTTP 升级，提供双向有序字节流，API 简单。WebTransport 基于 HTTP/3 和 QUIC，支持多个可靠/不可靠数据流（类似 WebRTC 的 DataChannel），可复用连接且避免队头阻塞。

WebTransport 适合需要低延迟、多流、部分不可靠传输的游戏或实时场景。

**评分维度**：
- 传输层（40%）：TCP/HTTP vs QUIC/HTTP3
- API 模型（30%）：单流 vs 多流
- 场景（30%）：可靠有序 vs 低延迟多流

**常见错误**：
- 认为 WebTransport 是 WebSocket 的简单替代
- 在需要可靠有序消息的场景误用不可靠流
- 忽略 WebTransport 目前浏览器支持度有限

**口头回答版**：
> WebSocket 基于 TCP 提供单流双向通信；WebTransport 基于 QUIC 提供多可靠/不可靠流，适合低延迟实时场景。

### FB-04-PE-P-003：前端如何测量和优化 TTFB？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：04 计算机网络
**标签**：TTFB、首字节时间、性能指标、优化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 TTFB 的定义、测量方式和优化方向。

**参考答案**：

TTFB 是从请求开始到浏览器收到第一个字节的时间，包括 DNS、TCP/TLS、服务端处理、网络传输。可用 PerformanceNavigationTiming.responseStart - startTime 测量。

优化：DNS 预解析/预连接、CDN 边缘节点、服务端渲染缓存、优化数据库查询、HTTP/2 或 HTTP/3、压缩响应。


**补充说明**：

在实际落地 前端如何测量和优化 TTFB 时，建议结合 TTFB、首字节时间、性能指标 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 定义（30%）：responseStart - startTime
- 分解（30%）：DNS/TCP/TLS/服务端处理
- 优化（40%）：边缘缓存、服务端优化、协议升级

**常见错误**：
- 把 TTFB 等同于页面完全加载时间
- 只优化前端资源而忽略服务端处理时间
- 忽略 CDN 回源延迟对 TTFB 的影响

**口头回答版**：
> TTFB 衡量首字节返回时间。优化需覆盖 DNS、连接、服务端处理和传输，常用 CDN、缓存和协议升级。

### FB-04-SC-P-004：设计一个高并发短链服务的前后端接口

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：04 计算机网络
**标签**：短链、高并发、接口设计、缓存
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计短链生成、存储、跳转和防刷接口。

**参考答案**：

生成：POST /shorten {url} 返回短码，使用哈希+发号器或 Base62 编码保证唯一。跳转：GET /{shortCode} 302 到原 URL，使用 Redis 缓存热点映射。防刷：接口限流、验证码、域名黑名单。

    POST /api/shorten
    { "url": "https://example.com/very/long/path" }
    Response: { "shortUrl": "https://s.cn/abc123" }

**评分维度**：
- 短码生成（30%）：唯一性与冲突处理
- 存储与缓存（30%）：数据库 + Redis
- 跳转（20%）：302 与缓存失效
- 安全（20%）：限流与域名过滤

**常见错误**：
- 短码生成依赖数据库自增 ID，高并发成为瓶颈
- 跳转时不做缓存，每次查数据库
- 允许任意 URL 生成短链，导致钓鱼或恶意跳转

**口头回答版**：
> 高并发短链服务需保证短码唯一、使用缓存加速跳转、接口限流和域名过滤。

### FB-04-SC-P-005：设计一个断点续传上传组件

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：04 计算机网络
**标签**：上传、断点续传、分片、文件
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计文件分片、上传状态记录、失败重试和合并流程。

**参考答案**：

流程：1) 文件按大小切片并计算 hash；2) 服务端校验已上传分片，返回缺失列表；3) 客户端并行上传缺失分片；4) 服务端按顺序合并；5) 前端展示上传进度，支持暂停/恢复。

    const chunks = slice(file, CHUNK_SIZE);
    const uploaded = await check(fileHash);
    await Promise.all(chunks.filter(...).map(upload));

**评分维度**：
- 分片策略（30%）：大小与 hash 计算
- 断点记录（30%）：服务端已上传分片索引
- 重试合并（25%）：失败重试与顺序合并
- 体验（15%）：进度与暂停

**常见错误**：
- 分片过小导致请求过多
- 没有校验文件 hash，导致合并错误
- 断点信息仅存在前端，刷新页面丢失

**口头回答版**：
> 断点续传上传需要分片、hash 校验、服务端记录缺失分片、并行上传、失败重试和最终合并。

### FB-04-SE-P-002：网络层 DDoS 攻击的原理与防御思路

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：04 计算机网络
**标签**：DDoS、网络攻击、CDN、WAF
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明常见 DDoS 类型及前端可观测与配合的防御措施。

**参考答案**：

DDoS 通过大量请求耗尽目标带宽、连接或计算资源。类型：Volumetric（流量耗尽）、Protocol（SYN Flood 等）、Application（CC 攻击）。

防御：流量清洗、CDN Anycast、WAF 限流、速率限制、挑战（Captcha）、基于行为分析封禁。前端可配合埋点识别异常流量并启用验证码挑战。


**补充说明**：

在实际落地 网络层 DDoS 攻击的原理与防御思路 时，建议结合 DDoS、网络攻击、CDN 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 类型（40%）：流量/协议/应用层攻击
- 防御层（40%）：CDN、WAF、限流、清洗
- 前端配合（20%）：验证码、行为校验

**常见错误**：
- 把 DDoS 等同于 XSS
- 认为前端可以单独防御 DDoS
- 忽略应用层 CC 攻击与正常高并发的区分难度

**口头回答版**：
> DDoS 通过大量流量或请求耗尽资源，防御依赖网络层清洗、CDN、WAF 和限流，前端可配合验证码和行为校验。
---

## 架构题（26 道）{#architect}

**口头回答版**：
> - 使用 DNS 预解析：`<link rel="dns-prefetch" href="//cdn.example.com">` - 使用预连接：`<link rel="preconnect" href="https://cdn.example.com">`，提前完成 DNS + TCP + TLS。 TCP/TLS 优化： - 升级到 TLS 1.3，减少握手 RTT。

### FB-04-SD-R-001：如何设计一个面向全球用户的 CDN + 多活静态资源分发架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：04 计算机网络、27 性能工程、25 系统架构设计
**标签**：CDN、多活、全球分发、静态资源
**出现频率**：低频
**预计回答时长**：20-30 分钟

**题目描述**：
假设你是一个全球化前端产品的架构师，需要为全球用户提供低延迟、高可用的静态资源（HTML、JS、CSS、图片、视频）访问。请设计整体 CDN + 多活分发架构，并说明关键组件、调度策略、容灾与缓存一致性。

**参考答案**：

**1. 整体架构**：

```text
全球用户
   |
智能 DNS / GeoDNS / HTTP DNS
   |
CDN 边缘节点（PoP）
   | 命中？直接返回缓存
   |
CDN 区域中心 / 父层缓存
   |
源站集群（多活部署：北京、上海、法兰克福、硅谷、新加坡）
   |
对象存储（OSS/S3）+ CI/CD 发布系统
```

**2. 关键组件**：

- **智能 DNS / GeoDNS**：根据用户地理位置、运营商、节点负载返回最优 PoP。
- **全球 CDN 网络**：在主要大洲部署边缘节点，支持 HTTPS、HTTP/2、HTTP/3、Brotli。
- **对象存储 + 版本化发布**：构建产物带 hash，上传到对象存储，通过 CDN 回源拉取。
- **多活源站**：每个区域部署独立源站或对象存储桶，就近回源，降低跨洋延迟。
- **发布系统**：蓝绿发布、灰度发布，支持按地区、按设备、按用户 ID 灰度。

**3. 调度策略**：

- **地理位置调度**：国内用户命中国内节点，海外用户命中海外节点。
- **运营商调度**：避免跨运营商瓶颈。
- **实时探测调度**：通过 RUM（Real User Monitoring）与主动探测，动态调整调度。
- **Anycast**：同一 IP 全球广播，路由到最近节点。

**4. 容灾设计**：

- 边缘节点故障时，DNS/调度系统切到备用节点。
- 源站故障时，CDN 使用 Stale Cache（过期缓存兜底）并切换备用源站。
- 多区域对象存储互为备份，启用跨区域复制。

**5. 缓存一致性**：

- 静态资源文件名带 hash，天然 immutable。
- HTML 入口文件设置短 TTL（如 1 分钟）或 `stale-while-revalidate`。
- 发布新版本时通过 CDN purge 预热新资源。

```bash
# 构建产物示例
dist/
  index.html               # 短缓存
  assets/
    app.a3f1c2.js          # 1 年强缓存
    style.7e8b9c.css       # 1 年强缓存
    logo.d4e5f6.webp       # 1 年强缓存
```

**评分维度**：
- 能设计覆盖 DNS、CDN、源站、存储的分层架构（30%）
- 能说明多活调度、容灾与回源策略（25%）
- 能解决缓存一致性与灰度发布问题（25%）
- 能考虑 HTTPS、HTTP/3、Brotli 等现代协议（20%）

**常见错误**：
- 只用一个源站，导致海外回源慢。
- 忽略 HTML 入口缓存，导致版本更新不生效或回退困难。
- 没有跨区域容灾，单点故障影响全球。

**延伸追问**：
- 如何在全球化合规（GDPR、数据主权）前提下设计 CDN 缓存？
- 如果某地区 CDN 节点全部被封锁，如何快速切换？

**相关题目**：
- [FB-04-CO-A-003 CDN 原理与选型](#FB-04-CO-A-003)
- [FB-04-PE-P-002 前端网络性能优化](#FB-04-PE-P-002)

**参考资源**：
- [Cloudflare - Global CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
- [AWS - CloudFront best practices](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/best-practices.html)

**口头回答版**：
> - 智能 DNS / GeoDNS：根据用户地理位置、运营商、节点负载返回最优 PoP。 - 全球 CDN 网络：在主要大洲部署边缘节点，支持 HTTPS、HTTP/2、HTTP/3、Brotli。 - 对象存储 + 版本化发布：构建产物带 hash，上传到对象存储，通过 CDN 回源拉取。 - 多活源站：每个区域部署独立源站或对象存储桶，就近回源，降低跨洋延迟。

---

### FB-04-SD-R-002：如何设计一个前端 API 网关 / BFF 层？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：04 计算机网络、19 Node.js / BFF、25 系统架构设计
**标签**：API 网关、BFF、API 设计、协议转换、限流
**出现频率**：低频
**预计回答时长**：20-30 分钟

**题目描述**：
请设计一个前端 API 网关 / BFF（Backend for Frontend）层，说明其核心职责、与微服务的关系、关键技术选型、安全与性能保障。

**参考答案**：

**1. 核心职责**：

- **协议转换**：HTTP/1.1、HTTP/2、HTTP/3、gRPC、GraphQL 互转。
- **聚合编排**：将多个微服务接口聚合成一个前端需要的视图接口，减少请求次数。
- **统一认证鉴权**：JWT/Session 校验、权限控制、黑白名单。
- **限流熔断**：按用户、应用、接口限流；熔断下游故障服务。
- **缓存**：对热点接口做 CDN 或网关级缓存。
- **日志与监控**：统一 tracing、metrics、日志采集。

**2. 架构位置**：

```text
客户端 -> CDN -> WAF -> API 网关/BFF -> 微服务集群
                              |
                        认证中心、配置中心、监控、日志
```

**3. 技术选型**：

- Node.js + Express/Fastify/NestJS：适合前端团队维护，生态丰富。
- Go / Rust：高并发、低延迟场景。
- Kong / Envoy / Nginx：成熟网关，适合做通用层。
- GraphQL Federation：聚合多服务数据。

**4. 安全保障**：

- HTTPS 全链路、TLS 1.3。
- CORS、CSRF Token、Rate Limiting。
- 敏感接口加签、防重放、防刷。
- 统一安全响应头。

**5. 性能保障**：

- 连接池与 Keep-Alive。
- 请求合并与批处理。
- 边缘缓存 + 网关本地缓存（如 Redis）。
- 异步处理与非关键路径降级。

```js
// NestJS BFF 聚合示例
@Controller('dashboard')
export class DashboardController {
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private statsService: StatsService
  ) {}

  @Get(':userId')
  async getDashboard(@Param('userId') userId: string) {
    const [user, orders, stats] = await Promise.all([
      this.userService.get(userId),
      this.orderService.recent(userId),
      this.statsService.summary(userId)
    ]);
    return { user, orders, stats };
  }
}
```

**评分维度**：
- 能清晰划分网关/BFF 的职责边界（30%）
- 能设计分层架构并说明与微服务关系（25%）
- 能给出技术选型理由（15%）
- 能系统说明安全、限流、缓存、监控方案（30%）

**常见错误**：
- 把 BFF 做成“万能层”，承担过多业务逻辑。
- 忽略网关自身的性能和可用性，成为单点瓶颈。
- 在 BFF 中不做限流，导致下游服务被压垮。

**延伸追问**：
- BFF 与 API 网关的区别是什么？是否必须同时存在？
- 当微服务数量爆炸时，BFF 如何组织以避免“大泥球”？

**相关题目**：
- [FB-04-CO-B-011 RESTful API 设计](#FB-04-CO-B-011)
- [FB-04-SC-P-002 RESTful API 幂等性、版本控制与分页](#FB-04-SC-P-002)
- [FB-04-CP-R-001 零信任前端安全架构](#FB-04-CP-R-001)

**参考资源**：
- [Sam Newman - Building Microservices](https://samnewman.io/books/building_microservices/)
- [ThoughtWorks - BFF](https://www.thoughtworks.com/en-us/insights/blog/bff-soundcloud)

**口头回答版**：
> - 协议转换：HTTP/1.1、HTTP/2、HTTP/3、gRPC、GraphQL 互转。 - 聚合编排：将多个微服务接口聚合成一个前端需要的视图接口，减少请求次数。 - 统一认证鉴权：JWT/Session 校验、权限控制、黑白名单。 - 限流熔断：按用户、应用、接口限流；熔断下游故障服务。

---

### FB-04-CP-R-001：从架构师视角，如何构建零信任前端安全架构？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：04 计算机网络、05 Web 安全、31 安全架构
**标签**：零信任、Web 安全、安全架构
**出现频率**：低频
**预计回答时长**：20-30 分钟

**题目描述**：
请从架构师视角，设计一套“零信任”前端安全架构，覆盖身份、传输、运行、数据、供应链等维度，并说明如何在工程化流程中落地。

**参考答案**：

**零信任核心原则**：永不信任，持续验证（Never trust, always verify）。前端不再因处于内网或已登录而默认受信。

**1. 身份与访问**：

- 统一身份认证（SSO / OIDC），多因素认证（MFA）。
- 最小权限原则：按角色、设备、位置动态授权。
- 短有效期 Token + Refresh Token Rotation，服务端可撤销。

**2. 传输安全**：

- 全站 HTTPS + TLS 1.3，HSTS preload。
- 敏感接口双向 TLS（mTLS）或请求签名。
- DoH/DoT 防止 DNS 劫持。

**3. 运行安全**：

- CSP、Trusted Types 防止 XSS。
- Subresource Integrity（SRI）校验第三方资源。
- iframe 沙箱、noopener、COOP/COEP 隔离。

**4. 数据安全**：

- 敏感数据加密存储（前端内存中，避免 localStorage）。
- 输入输出校验，参数化查询，防止注入。
- 最小化敏感字段返回，前端按需脱敏。

**5. 供应链安全**：

- 依赖漏洞扫描（Snyk、Dependabot）。
- 私有 npm 仓库、锁定版本、签名验证。
- CI/CD 构建产物签名与 SBOM（软件物料清单）。

**6. 可观测与响应**：

- 前端错误监控、行为审计、异常访问检测。
- WAF、Bot 管理、风控系统联动。
- 事件响应预案与红蓝演练。

**工程化落地**：

```yaml
# CI 安全门禁示例
security-gates:
  - dependency-audit
  - sast-scan
  - secret-scan
  - csp-policy-check
  - sri-integrity-check
```

**评分维度**：
- 能从身份、传输、运行、数据、供应链多维度展开（35%）
- 能结合零信任原则说明“永不信任”的实现（25%）
- 能给出工程化落地与 CI 门禁（25%）
- 能考虑可观测性与事件响应（15%）

**常见错误**：
- 只谈 HTTPS 和 CSP，忽略身份持续验证和供应链。
- 把零信任等同于“内网不需要 VPN”，实际上前端也要持续验证。
- 只依赖安全团队，未在 CI/CD 中嵌入安全门禁。

**延伸追问**：
- 如何在不牺牲用户体验的前提下实现持续身份验证？
- 前端供应链攻击（如恶意 npm 包）如何防御？

**相关题目**：
- [FB-04-SE-A-001 XSS 与 CSRF 防御](#FB-04-SE-A-001)
- [FB-04-SE-P-001 CSP、SameSite Cookie 与安全响应头](#FB-04-SE-P-001)
- [FB-04-SE-A-002 MITM 与 DNS 劫持](#FB-04-SE-A-002)

**参考资源**：
- [NIST - Zero Trust Architecture](https://csrc.nist.gov/publications/detail/sp/800-207/final)
- [Google BeyondCorp](https://cloud.google.com/beyondcorp)

---

## 统计

> 当前文件题目数量：40 道
> 目标题目数量：150 道
> 完成度：27%

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。
### FB-04-CP-B-001：OSI 七层模型和 TCP/IP 四层模型有什么区别？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
OSI 七层模型和 TCP/IP 四层模型有什么区别。

**参考答案**：

- OSI 七层：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层。
- TCP/IP 四层：网络接口层、网络层、传输层、应用层。
- TCP/IP 更贴近实际实现，OSI 是理论参考模型。TCP/IP 把 OSI 的上三层合并为应用层，下两层合并为网络接口层。


**补充说明**：

在实际落地 OSI 七层模型和 TCP/IP 四层模型有什么区别 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能列出两层模型（50%）。
- 说明对应关系（37%）。
- 说明 TCP/IP 更实用（13%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - OSI 七层：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层。 - TCP/IP 四层：网络接口层、网络层、传输层、应用层。 - TCP/IP 更贴近实际实现，OSI 是理论参考模型。 TCP/IP 把 OSI 的上三层合并为应用层，下两层合并为网络接口层。

---

### FB-04-SC-B-001：TCP 和 UDP 有什么区别？各适用于什么场景？

**题型**：场景设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
TCP 和 UDP 有什么区别？各适用于什么场景。

**参考答案**：

| 特性 | TCP | UDP |
|------|-----|-----|
| 连接 | 面向连接 | 无连接 |
| 可靠性 | 可靠，保证顺序 | 不可靠，不保证顺序 |
| 开销 | 大 | 小 |
| 传输效率 | 较低 | 较高 |
| 适用场景 | HTTP、文件传输、邮件 | 视频直播、DNS、在线游戏、QUIC |


**补充说明**：

在实际落地 TCP 和 UDP 有什么区别各适用于什么场景 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 至少 4 个区别（50%）。
- 场景举例（50%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> | 特性 | TCP | UDP | |------|-----|-----| | 连接 | 面向连接 | 无连接 | | 可靠性 | 可靠，保证顺序 | 不可靠，不保证顺序 | | 开销 | 大 | 小 | | 传输效率 | 较低 | 较高 | | 适用场景 | HTTP、文件传输、邮件 | 视频直播、DNS、在线游戏、QUIC |

---

### FB-04-CO-B-013：详细描述 TCP 三次握手和四次挥手的过程。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
详细描述 TCP 三次握手和四次挥手的过程。。

**参考答案**：

三次握手：
1. SYN：客户端发送 SYN，进入 SYN_SENT。
2. SYN + ACK：服务器回复 SYN+ACK，进入 SYN_RCVD。
3. ACK：客户端回复 ACK，双方 ESTABLISHED。

四次挥手：
1. FIN：主动方发送 FIN。
2. ACK：被动方确认 FIN。
3. FIN：被动方发送 FIN。
4. ACK：主动方确认 FIN，进入 TIME_WAIT 后关闭。

**评分维度**：
- 三次握手完整（37%）。
- 四次挥手完整（38%）。
- 解释为什么需要四次（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 三次握手： 1. SYN：客户端发送 SYN，进入 SYN_SENT。 2. SYN + ACK：服务器回复 SYN+ACK，进入 SYN_RCVD。 3. ACK：客户端回复 ACK，双方 ESTABLISHED。 四次挥手： 1. FIN：主动方发送 FIN。

---

### FB-04-CO-B-014：HTTP/1.1、HTTP/2、HTTP/3 各有什么特点？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
HTTP/1.1、HTTP/2、HTTP/3 各有什么特点。

**参考答案**：

- HTTP/1.1：持久连接、管道化不完善、队头阻塞严重、文本协议。
- HTTP/2：二进制分帧、多路复用、头部压缩（HPACK）、服务器推送。
- HTTP/3：基于 QUIC/UDP、连接迁移、更低延迟、彻底解决队头阻塞。


**补充说明**：

在实际落地 HTTP/1.1、HTTP/2、HTTP/3 各有什么特点 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 每个版本特点准确（75%）。
- 提到队头阻塞差异（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - HTTP/1.1：持久连接、管道化不完善、队头阻塞严重、文本协议。 - HTTP/2：二进制分帧、多路复用、头部压缩（HPACK）、服务器推送。 - HTTP/3：基于 QUIC/UDP、连接迁移、更低延迟、彻底解决队头阻塞。

---

### FB-04-CO-B-015：什么是 DNS？DNS 解析过程是怎样的？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是 DNS？DNS 解析过程是怎样的。

**参考答案**：

DNS 是把域名解析为 IP 地址的系统。

解析过程：
1. 浏览器缓存。
2. 操作系统缓存。
3. 本地 DNS 服务器。
4. 根域名服务器 → 顶级域名服务器 → 权威域名服务器递归查询。


**补充说明**：

在实际落地 DNSDNS 解析过程是怎样的 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- DNS 作用（25%）。
- 解析层级完整（50%）。
- 提到缓存（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> DNS 是把域名解析为 IP 地址的系统。 解析过程： 1. 浏览器缓存。 2. 操作系统缓存。 3. 本地 DNS 服务器。

---

### FB-04-EN-B-001：CDN 的原理是什么？有什么作用？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
CDN 的原理是什么？有什么作用。

**参考答案**：

- 原理：把网站内容缓存到全球各地的边缘节点，用户从最近节点获取资源。
- 作用：降低延迟、分担源站压力、提高可用性、增强抗 DDoS 能力。



**补充说明**：

在实际落地 CDN 的原理是什么有什么作用 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 CDN 的原理是什么有什么作用 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 原理解释（50%）。
- 作用列举（50%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 原理：把网站内容缓存到全球各地的边缘节点，用户从最近节点获取资源。 - 作用：降低延迟、分担源站压力、提高可用性、增强抗 DDoS 能力。

---

### FB-04-SE-B-001：HTTPS 为什么安全？TLS 握手做了什么？

**题型**：安全题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
HTTPS 为什么安全？TLS 握手做了什么。

**参考答案**：

- HTTPS 在 HTTP 下加入 TLS 加密层，防止窃听、篡改、冒充。
- TLS 握手：协商加密套件、验证服务器证书、生成会话密钥，后续用对称加密通信。


**补充说明**：

在实际落地 HTTPS 为什么安全TLS 握手做了什么 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- HTTPS 安全原因（37%）。
- TLS 握手关键步骤（38%）。
- 提到证书验证（25%）。

---
## 二、进阶题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - HTTPS 在 HTTP 下加入 TLS 加密层，防止窃听、篡改、冒充。 - TLS 握手：协商加密套件、验证服务器证书、生成会话密钥，后续用对称加密通信。

---

### FB-04-CO-A-014：HTTP 常见状态码有哪些？分别代表什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
HTTP 常见状态码有哪些？分别代表什么。

**参考答案**：

- 1xx：信息性状态码，如 100 Continue。
- 2xx：成功，如 200 OK、201 Created、204 No Content。
- 3xx：重定向，如 301 Moved Permanently、302 Found、304 Not Modified。
- 4xx：客户端错误，如 400 Bad Request、401 Unauthorized、403 Forbidden、404 Not Found。
- 5xx：服务器错误，如 500 Internal Server Error、502 Bad Gateway、503 Service Unavailable。

**评分维度**：
- 每个类别说明（37%）。
- 至少列出 8 个常见状态码（63%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 1xx：信息性状态码，如 100 Continue。 - 2xx：成功，如 200 OK、201 Created、204 No Content。 - 3xx：重定向，如 301 Moved Permanently、302 Found、304 Not Modified。 - 4xx：客户端错误，如 400 Bad Request、401 Unauthorized、403 Forbidden、404 Not Found。

---

### FB-04-CO-A-015：什么是队头阻塞？HTTP/2 和 HTTP/3 分别是如何解决的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是队头阻塞？HTTP/2 和 HTTP/3 分别是如何解决的。

**参考答案**：

队头阻塞：前一个请求/响应阻塞后续请求处理。

- HTTP/1.1：请求按顺序排队，一个阻塞影响所有后续请求。
- HTTP/2：二进制分帧 + 多路复用，一个 TCP 连接上多个流并行，解决 HTTP 层队头阻塞，但 TCP 层仍存在（丢包会阻塞所有流）。
- HTTP/3：基于 QUIC/UDP，每个流独立，一个流丢包不影响其他流，彻底解决。

**评分维度**：
- 队头阻塞概念（25%）。
- HTTP/2 解决方案（37%）。
- HTTP/3 解决方案（38%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 队头阻塞：前一个请求/响应阻塞后续请求处理。 - HTTP/1.1：请求按顺序排队，一个阻塞影响所有后续请求。 - HTTP/2：二进制分帧 + 多路复用，一个 TCP 连接上多个流并行，解决 HTTP 层队头阻塞，但 TCP 层仍存在（丢包会阻塞所有流）。 - HTTP/3：基于 QUIC/UDP，每个流独立，一个流丢包不影响其他流，彻底解决。

---

### FB-04-CO-A-016：RESTful API 设计有哪些原则？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
RESTful API 设计有哪些原则。

**参考答案**：

- URL 表示资源，不使用动词。
- HTTP 方法表示操作：GET 查询、POST 创建、PUT/PATCH 更新、DELETE 删除。
- 使用状态码表达结果。
- 无状态：请求包含完整上下文。
- 支持过滤、分页、排序。
- 版本管理（如 /v1/users）。


**补充说明**：

在实际落地 RESTful API 设计有哪些原则 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 资源和方法设计（50%）。
- 状态码和无状态（25%）。
- 分页/版本等实践（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - URL 表示资源，不使用动词。 - HTTP 方法表示操作：GET 查询、POST 创建、PUT/PATCH 更新、DELETE 删除。 - 使用状态码表达结果。 - 无状态：请求包含完整上下文。

---

### FB-04-CP-A-001：WebSocket 和 HTTP 长轮询有什么区别？

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
WebSocket 和 HTTP 长轮询有什么区别。

**参考答案**：

- HTTP 长轮询：客户端发送请求后服务器挂起，有数据再返回，然后客户端立即再请求。模拟实时，但开销大、延迟高。
- WebSocket：建立后是全双工长连接，服务器可主动推送，开销小、延迟低。


**补充说明**：

在实际落地 WebSocket 和 HTTP 长轮询有什么区别 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 长轮询原理（37%）。
- WebSocket 原理（38%）。
- 对比延迟和开销（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - HTTP 长轮询：客户端发送请求后服务器挂起，有数据再返回，然后客户端立即再请求。 模拟实时，但开销大、延迟高。 - WebSocket：建立后是全双工长连接，服务器可主动推送，开销小、延迟低。

---

### FB-04-SE-A-003：什么是跨域？CORS 的原理是什么？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是跨域？CORS 的原理是什么。

**参考答案**：

跨域：浏览器同源策略限制不同源（协议、域名、端口）之间的请求。

CORS：
- 简单请求：满足特定条件（GET/POST/HEAD、特定 Content-Type、无自定义头）的请求，浏览器自动添加 Origin 头，服务器返回 `Access-Control-Allow-Origin`。
- 预检请求：对于非简单请求，浏览器先发送 OPTIONS 预检请求，询问服务器是否允许该跨域请求，服务器返回允许的源、方法、头信息后，浏览器才发送真正请求。
- 服务器通过响应头控制允许的来源、方法、头部、是否允许携带凭证：
  - `Access-Control-Allow-Origin`：允许的源，携带凭证时不能为 `*`。
  - `Access-Control-Allow-Methods`：允许的方法。
  - `Access-Control-Allow-Headers`：允许的请求头。
  - `Access-Control-Allow-Credentials`：是否允许携带 Cookie。

**评分维度**：
- 同源策略（20%）。
- 简单请求和预检请求（45%）。
- 相关响应头（25%）。
- 凭证配置注意事项（10%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 跨域：浏览器同源策略限制不同源（协议、域名、端口）之间的请求。 CORS： - 简单请求：满足特定条件（GET/POST/HEAD、特定 Content-Type、无自定义头）的请求，浏览器自动添加 Origin 头，服务器返回 Access-Control-Allow-Origin。 - 预检请求：对于非简单请求，浏览器先发送 OPTIONS 预检请求，询问服务器是否允许该跨域请求，服务器返回允许的源、方法、头信息后，浏览器才发送真正请求。 - 服务器通过响应头控制允许的来源、方法、头部、是否允许携带凭证：   - Access-Control-Allow-Origin：允许的源，携带凭证时不能为 *。

---

### FB-04-PE-A-001：前端网络优化有哪些常用手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
前端网络优化有哪些常用手段。

**参考答案**：

- 减少请求：合并资源、图标字体、雪碧图。
- 减少体积：Gzip/Brotli、图片压缩/WebP、Tree Shaking。
- 提高传输效率：HTTP/2、CDN、keep-alive。
- 缓存：强缓存、协商缓存、Service Worker。
- 预加载：dns-prefetch、preconnect、preload、prefetch。
- 减少等待：SSR/SSG、接口聚合、减少重定向。


**补充说明**：

在实际落地 前端网络优化有哪些常用手段 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 至少 5 个方向（62%）。
- 能结合实际场景说明（38%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 减少请求：合并资源、图标字体、雪碧图。 - 减少体积：Gzip/Brotli、图片压缩/WebP、Tree Shaking。 - 提高传输效率：HTTP/2、CDN、keep-alive。 - 缓存：强缓存、协商缓存、Service Worker。

---

### FB-04-CO-A-017：什么是 GraphQL？它和 REST 各有什么优缺点？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是 GraphQL？它和 REST 各有什么优缺点。

**参考答案**：

GraphQL 是一种查询语言，客户端可以精确指定所需字段。

优点：
- 减少过度获取和不足获取。
- 一次请求聚合多个资源。
- 强类型 Schema。

缺点：
- 服务器复杂度高。
- HTTP 缓存不如 REST。
- 错误处理、文件上传需额外设计。

REST 更简单、缓存友好；GraphQL 适合复杂前端数据需求。

**评分维度**：
- GraphQL 概念（25%）。
- 优缺点各 3 点（50%）。
- 使用场景对比（25%）。

---
## 三、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> GraphQL 是一种查询语言，客户端可以精确指定所需字段。 优点： - 减少过度获取和不足获取。 - 一次请求聚合多个资源。 - 强类型 Schema。

---

### FB-04-CP-P-001：TCP 的滑动窗口、流量控制和拥塞控制有什么区别？

**题型**：综合开放题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
TCP 的滑动窗口、流量控制和拥塞控制有什么区别。

**参考答案**：

- 滑动窗口：提高传输效率，允许发送方连续发送多个包而无需等待每个 ACK。
- 流量控制：接收方告诉发送方自己的接收窗口大小，防止发送过快导致接收方缓冲区溢出。
- 拥塞控制：发送方根据网络拥塞状况调整发送速率，防止网络瘫痪。包括慢启动、拥塞避免、快重传、快恢复。


**补充说明**：

在实际落地 TCP 的滑动窗口、流量控制和拥塞控制有什么区别 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 滑动窗口（25%）。
- 流量控制（37%）。
- 拥塞控制机制（38%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 滑动窗口：提高传输效率，允许发送方连续发送多个包而无需等待每个 ACK。 - 流量控制：接收方告诉发送方自己的接收窗口大小，防止发送过快导致接收方缓冲区溢出。 - 拥塞控制：发送方根据网络拥塞状况调整发送速率，防止网络瘫痪。 包括慢启动、拥塞避免、快重传、快恢复。

---

### FB-04-CP-P-002：TLS 1.2 和 TLS 1.3 握手过程有什么区别？为什么 TLS 1.3 更快？

**题型**：综合开放题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
TLS 1.2 和 TLS 1.3 握手过程有什么区别？为什么 TLS 1.3 更快。

**参考答案**：

- TLS 1.2：通常需要 2-RTT 握手。
- TLS 1.3：简化为 1-RTT，恢复会话可达 0-RTT。
- TLS 1.3 移除大量过时加密算法，握手消息加密，更安全。


**补充说明**：

在实际落地 TLS 1.2 和 TLS 1.3 握手过程有什么区别为什么 TLS 1.3 更快 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- RTT 差异（37%）。
- 握手步骤简化（38%）。
- 安全改进（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - TLS 1.2：通常需要 2-RTT 握手。 - TLS 1.3：简化为 1-RTT，恢复会话可达 0-RTT。 - TLS 1.3 移除大量过时加密算法，握手消息加密，更安全。

---

### FB-04-CO-P-006：HTTP/2 的服务器推送（Server Push）是什么？为什么现代浏览器逐渐弃用？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
HTTP/2 的服务器推送（Server Push）是什么？为什么现代浏览器逐渐弃用。

**参考答案**：

服务器推送允许服务器在客户端请求 HTML 时主动推送 CSS/JS 等资源。

弃用原因：
- 推送命中率低，容易推送客户端已有缓存的资源，浪费带宽。
- 推送优先级管理复杂。
- 现代 HTTP/2 和 HTTP/3 更推荐预加载提示（如 103 Early Hints、`<link rel="preload">`）。

**评分维度**：
- 服务器推送概念（37%）。
- 命中率问题（38%）。
- 替代方案（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 服务器推送允许服务器在客户端请求 HTML 时主动推送 CSS/JS 等资源。 弃用原因： - 推送命中率低，容易推送客户端已有缓存的资源，浪费带宽。 - 推送优先级管理复杂。 - 现代 HTTP/2 和 HTTP/3 更推荐预加载提示（如 103 Early Hints、`<link rel="preload"139>`）。

---

### FB-04-SD-P-001：如何设计一个高可用的前端网络请求层？

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何设计一个高可用的前端网络请求层。

**参考答案**：

- 统一封装：baseURL、超时、请求/响应拦截器。
- 错误处理：分类处理网络错误、HTTP 错误、业务错误。
- 重试机制：根据错误类型决定是否重试，退避策略。
- 取消请求：AbortController 避免竞态。
- 缓存：GET 请求合理缓存，合并相同并发请求。
- 鉴权：统一附加 token，过期自动刷新。
- 监控：请求耗时、错误率、失败重试上报。



**补充说明**：

在实际落地 设计一个高可用的前端网络请求层 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 设计一个高可用的前端网络请求层 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 封装和拦截器（20%）。
- 错误处理和重试（30%）。
- 取消和缓存（30%）。
- 鉴权和监控（20%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 统一封装：baseURL、超时、请求/响应拦截器。 - 错误处理：分类处理网络错误、HTTP 错误、业务错误。 - 重试机制：根据错误类型决定是否重试，退避策略。 - 取消请求：AbortController 避免竞态。

---

### FB-04-CP-P-003：DNS 劫持和 HTTP 劫持有什么区别？如何防御？

**题型**：综合开放题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
DNS 劫持和 HTTP 劫持有什么区别？如何防御。

**参考答案**：

- DNS 劫持：篡改 DNS 解析结果，把域名指向恶意 IP。
- HTTP 劫持：在 HTTP 传输过程中插入广告或恶意内容。

防御：
- DNS 劫持：使用 HTTPS（验证证书防止中间人）、DNS over HTTPS/TLS（DoH/DoT）、可信 DNS 服务商。
- HTTP 劫持：全站 HTTPS、HSTS、CSP。


**补充说明**：

在实际落地 DNS 劫持和 HTTP 劫持有什么区别如何防御 时，建议结合 TCP、API 设计、HTTP 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 两种劫持区别（50%）。
- 防御手段（50%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - DNS 劫持：篡改 DNS 解析结果，把域名指向恶意 IP。 - HTTP 劫持：在 HTTP 传输过程中插入广告或恶意内容。 防御： - DNS 劫持：使用 HTTPS（验证证书防止中间人）、DNS over HTTPS/TLS（DoH/DoT）、可信 DNS 服务商。 - HTTP 劫持：全站 HTTPS、HSTS、CSP。

---

### FB-04-CO-P-007：解释 QUIC 协议的设计目标，以及它相比 TCP 的优势。

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
解释 QUIC 协议的设计目标，以及它相比 TCP 的优势。。

**参考答案**：

QUIC 是基于 UDP 的传输协议，设计目标：
- 降低连接建立延迟：握手与 TLS 合并，通常 1-RTT，恢复会话 0-RTT。
- 解决队头阻塞：每个流独立，丢包只影响当前流。
- 连接迁移：通过连接 ID 而不是四元组标识连接，网络切换不断连。
- 内置加密：安全性更好。

优势：
- 更快的首次连接。
- 更好的移动网络体验。
- 更强的抗丢包能力。

**评分维度**：
- QUIC 设计目标（50%）。
- 与 TCP 对比优势（50%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> QUIC 是基于 UDP 的传输协议，设计目标： - 降低连接建立延迟：握手与 TLS 合并，通常 1-RTT，恢复会话 0-RTT。 - 解决队头阻塞：每个流独立，丢包只影响当前流。 - 连接迁移：通过连接 ID 而不是四元组标识连接，网络切换不断连。 - 内置加密：安全性更好。

---

### FB-04-CO-P-008：什么是 DoH / DoT？它们解决了什么问题？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
什么是 DoH / DoT？它们解决了什么问题。

**参考答案**：

DoH（DNS over HTTPS）和 DoT（DNS over TLS）都是加密 DNS 查询的协议。

- **DoH**：通过 HTTPS（端口 443）传输 DNS 查询，流量看起来像普通 HTTPS。
- **DoT**：通过 TLS（端口 853）传输 DNS 查询，独立端口。

解决的问题：
- 传统 DNS 查询是明文的，容易被窃听或劫持。
- 加密 DNS 可以保护用户隐私，防止中间人篡改解析结果。

对比：

| 特性 | DoH | DoT |
|------|-----|-----|
| 协议 | HTTPS | TLS |
| 端口 | 443 | 853 |
| 伪装性 | 强 | 弱 |
| 部署 | 依赖现有 HTTP 基础设施 | 需独立端口 |

**评分维度**：
- 能解释 DoH/DoT 原理（30%）。
- 能说明解决的问题（30%）。
- 能对比两者差异（40%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> DoH（DNS over HTTPS）和 DoT（DNS over TLS）都是加密 DNS 查询的协议。 - DoH：通过 HTTPS（端口 443）传输 DNS 查询，流量看起来像普通 HTTPS。 - DoT：通过 TLS（端口 853）传输 DNS 查询，独立端口。 解决的问题： - 传统 DNS 查询是明文的，容易被窃听或劫持。

---

### FB-04-CO-P-009：WebRTC 的核心组件和基本流程是什么？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
WebRTC 的核心组件和基本流程是什么。

**参考答案**：

核心组件：

- **getUserMedia**：获取摄像头/麦克风媒体流。
- **RTCPeerConnection**：建立 P2P 连接，处理编解码和传输。
- **RTCDataChannel**：在 P2P 连接上传输任意数据。
- **ICE/STUN/TURN**：解决 NAT 穿透。

基本流程：

1. 获取本地媒体流。
2. 创建 RTCPeerConnection，配置 ICE 服务器。
3. 把本地轨道添加到连接。
4. 通过信令服务器交换 SDP 和 ICE candidate。
5. 建立连接后，远端流通过 `ontrack` 事件接收。

挑战：NAT 穿透、信令服务器实现、编解码兼容性、QoS。

**评分维度**：
- 能说出 3 个以上核心组件（30%）。
- 能描述基本流程（40%）。
- 能提到挑战（30%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 核心组件： - getUserMedia：获取摄像头/麦克风媒体流。 - RTCPeerConnection：建立 P2P 连接，处理编解码和传输。 - RTCDataChannel：在 P2P 连接上传输任意数据。 - ICE/STUN/TURN：解决 NAT 穿透。

---

### FB-04-SC-P-003：区分以下 HTTP 状态码的使用场景：200、201、204、301、302、400、401、403、404、429、500、502、503、504。

**题型**：场景设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：04 
**标签**：TCP、API 设计、HTTP、HTTPS、传输层
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
区分以下 HTTP 状态码的使用场景：200、201、204、301、302、400、401、403、404、429、500、502、503、504。。

**参考答案**：

- **2xx**：成功。200 通用成功；201 创建成功；204 成功无返回体。
- **3xx**：重定向。301 永久；302 临时；304 协商缓存命中。
- **4xx**：客户端错误。400 参数错误；401 未认证；403 无权限；404 资源不存在；429 限流。
- **5xx**：服务端错误。500 内部错误；502 网关错误；503 服务不可用；504 网关超时。

关键区分：
- 401 vs 403：401 是“不知道你是谁”，403 是“知道你是谁但你不允许”。
- 502 vs 504：502 是上游无响应，504 是上游响应超时。

**评分维度**：
- 正确分类（30%）。
- 准确描述每个状态码（40%）。
- 能区分易混淆状态码（30%）。

---
## 面试准备建议

1. 能手画 TCP 三次握手/四次挥手时序图。
2. 能用 Wireshark 或 Chrome Network 验证 HTTP/2、缓存行为。
3. 准备自己项目中的网络优化案例，量化收益。
4. 理解 HTTPS/TLS 握手细节，能解释证书链验证。

---

> **领域编号**：F04 计算机网络  
> **最后更新**：2026-06-24

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 200 通用成功；201 创建成功；204 成功无返回体。 - 3xx：重定向。 301 永久；302 临时；304 协商缓存命中。 - 4xx：客户端错误。


























