# Serverless / Edge 架构练习册

> 通过练习掌握 Serverless 和 Edge 计算的应用场景与架构设计。

---

## 难度分级

- 🟢 基础：理解概念。
- 🟡 进阶：能选择平台和设计函数。
- 🔴 深入：能设计边缘架构。

---

## 一、选择题

### 第 1 题（🟢）

Serverless 的核心优势是？

A. 完全免费  
B. 无需管理服务器，按需付费  
C. 没有冷启动  
D. 适合长时间任务

### 第 2 题（🟢）

Edge 计算相比传统 Serverless 的主要优势是？

A. 更强的计算能力  
B. 更低的网络延迟  
C. 更便宜  
D. 更长的执行时间

### 第 3 题（🟢）

以下哪个是 Serverless 函数的典型计费方式？

A. 按月固定费用  
B. 按预购实例数收费  
C. 按调用次数和执行时长收费  
D. 按存储空间收费

### 第 4 题（🟡）

以下哪个场景最适合 Edge 函数？

A. 大规模批处理  
B. 边缘 SSR 和 A/B 测试  
C. 训练 AI 模型  
D. 数据库主从同步

### 第 5 题（🟡）

Edge 函数的主要限制是？

A. 不能使用 JavaScript  
B. 执行时间和资源受限  
C. 不能访问网络  
D. 不能处理 HTTP 请求

### 第 6 题（🟡）

以下哪种方式可以有效降低 Serverless 冷启动影响？

A. 增加函数代码体积  
B. 使用预留实例或保持活跃  
C. 使用更慢的运行时  
D. 增加函数超时时间

### 第 7 题（🟡）

Cloudflare Workers 中，以下哪个 API 用于持久化 KV 数据？

A. `fetch()`
B. `caches.default`
C. `KV_NAMESPACE.get()`
D. `event.respondWith()`

### 第 8 题（🟡）

以下哪个场景不适合使用 Serverless？

A. 定时触发的批处理任务  
B. 偶发性的 API 请求处理  
C. 需要 24/7 长期运行的 WebSocket 服务  
D. 图片处理与转码

### 第 9 题（🟡）

在 Edge 函数中处理用户认证时，推荐的方式是？

A. 在 Edge 函数中直接查询数据库验证用户名密码  
B. 使用 JWT 在边缘层验证 Token  
C. 在客户端保存明文密码  
D. 每次都重定向到中心服务器认证

### 第 10 题（🟢）

JAMStack 架构的核心组成部分是？

A. Java, Angular, MongoDB  
B. JavaScript, API, Markup  
C. JSON, API, MySQL  
D. jQuery, AMP, MFE

### 第 11 题（🔴）

以下哪种架构模式最适合在 Edge 层实现灰度发布？

A. 全量部署后回滚  
B. 基于 Cookie/Header 的流量路由到不同版本  
C. 数据库读写分离  
D. 消息队列异步处理

### 第 12 题（🔴）

使用 Vercel Edge Functions 时，以下哪个关于运行时环境的描述是正确的？

A. 支持 Node.js 全 API，包括 `fs` 模块  
B. 运行在 V8 Isolates 中，API 受限  
C. 只能运行 Python 代码  
D. 不支持 HTTP 请求处理

### 第 13 题（🔴）

Edge 计算中实现数据持久化的最佳实践是？

A. 在 Edge 函数内存中保存所有数据  
B. 使用全局分布式 KV 或 D1 数据库  
C. 直接写入本地磁盘文件  
D. 每次通过 WebSocket 回传中心服务器

### 第 14 题（🔴）

在 Serverless 架构中，以下哪种模式可以有效降低函数间的调用延迟？

A. 使用 HTTP 调用另一个函数  
B. 将相关逻辑合并到同一个函数中  
C. 通过消息队列异步调用  
D. 使用数据库作为中介

### 第 15 题（🔴）

以下哪种场景最适合使用 AWS Lambda@Edge 而不是 Cloudflare Workers？

A. 需要全球 300+ 边缘节点覆盖  
B. 已有 AWS CloudFront 和 AWS 生态，需要边缘计算与现有服务集成  
C. 只需要处理简单 HTTP 请求转发  
D. 团队更熟悉 JavaScript 而非 Python

---

## 二、场景分析题

### 第 16 题（🟡）

你希望在用户请求页面时根据地理位置返回不同内容，选择什么架构？

### 第 17 题（🟡）

一个 Next.js 应用部署在 Vercel，首页加载慢，如何使用 Edge 优化？

### 第 18 题（🟡）

你的电商网站即将进行大促活动，预期流量是平时的 10 倍。你正在决定使用 Serverless 架构还是传统服务器架构。请分析两种方案的优缺点。

### 第 19 题（🟡）

你的 Serverless API 在用户首次请求时响应缓慢（3-5 秒），后续请求恢复正常。分析原因并提出至少三种优化方案。

### 第 20 题（🔴）

你需要在 Edge 层实现用户认证和授权，但你的用户遍布全球。设计一个低延迟的认证方案。

### 第 21 题（🔴）

你的团队要在 Edge 上实现 A/B 测试系统，要求能实时切换实验版本并收集指标。请设计方案。

### 第 22 题（🔴）

你需要从传统服务器架构迁移到 Edge 架构，但应用中包含大量服务器端状态和 Session 数据。如何处理这种迁移？

### 第 23 题（🔴）

你的边缘函数需要访问第三方 API，但该 API 对同一 IP 有严格的频率限制。全球边缘节点的请求可能触发限流。如何解决？

---

## 三、设计/开放题

### 第 24 题（🟡）

对比 Vercel Edge、Cloudflare Workers、AWS Lambda@Edge 的适用场景。

### 第 25 题（🔴）

设计一个基于 Edge 的全球化前端架构，支持多区域内容分发和本地化。

### 第 26 题（🔴）

如何在 Edge 架构中实现用户会话状态管理？

### 第 27 题（🔴）

设计一个边缘 API 网关，支持鉴权、限流、缓存、灰度分流、日志采集。请画出请求流程图并说明各组件职责。

### 第 28 题（🔴）

设计一个全球实时协作编辑应用的边缘架构，要求支持低延迟的 CRDT 同步和离线编辑。

### 第 29 题（🟡）

你计划将一个传统 Node.js Express API 迁移到 Serverless + Edge 架构。请设计迁移路线图，包括阶段划分、风险控制和技术选型。

### 第 30 题（🔴）

请设计一个在全球部署的边缘渲染（Edge SSR）应用架构，要求：
- 支持动态路由和静态页面混合
- 数据依赖来自不同区域的数据源
- 能自动故障转移
- 请求响应时间 < 200ms (P95)

---

## 参考答案

### 第 1 题

::: details 查看答案与解析
**答案：B**

Serverless 无需管理服务器，按调用次数和资源使用付费。

**解析**：
- A 错误：Serverless 不是免费的，只是按使用量付费。
- C 错误：冷启动是 Serverless 的固有特性。
- D 错误：大多数 Serverless 平台有执行时间限制（如 AWS Lambda 最大 15 分钟）。
:::

### 第 2 题

::: details 查看答案与解析
**答案：B**

Edge 计算在靠近用户的节点运行，延迟更低。

**解析**：
- Edge 计算将计算资源部署在网络边缘节点，距离用户更近，从而显著降低网络延迟。
- 传统 Serverless 通常部署在区域数据中心，距离用户较远。
:::

### 第 3 题

::: details 查看答案与解析
**答案：C**

**解析**：Serverless 函数按调用次数和执行时长（通常精确到毫秒）收费，这是其"按需付费"的核心体现。A 和 B 是传统服务器或预留实例的计费方式。
:::

### 第 4 题

::: details 查看答案与解析
**答案：B**

边缘 SSR 和 A/B 测试是 Edge 函数的典型场景。

**解析**：
- Edge 函数运行在 CDN 边缘节点，非常适合需要低延迟的请求级处理。
- A（批处理）和 C（训练 AI 模型）需要长时间计算，不适合 Edge 的限制。
- D（数据库同步）通常是后台服务而非边缘处理。
:::

### 第 5 题

::: details 查看答案与解析
**答案：B**

Edge 函数执行时间和 CPU/内存资源受限。

**解析**：
- 大多数 Edge 平台（如 Cloudflare Workers）限制执行时间在 1-30 秒，内存 128MB 左右。
- Edge 函数完全支持 JavaScript/TypeScript、网络访问和 HTTP 请求处理。
:::

### 第 6 题

::: details 查看答案与解析
**答案：B**

**解析**：
- 预留实例（Provisioned Concurrency）保持函数始终 warm，消除冷启动。
- 增加代码体积或使用更慢的运行时都会加剧冷启动问题。
- 超时时间与冷启动无关。
:::

### 第 7 题

::: details 查看答案与解析
**答案：C**

**解析**：
- `KV_NAMESPACE.get('key')` 是 Cloudflare Workers 中读取 KV 存储的标准 API。
- `fetch()` 用于发起 HTTP 请求。
- `caches.default` 是 Cache API。
- `event.respondWith()` 用于响应请求。
:::

### 第 8 题

::: details 查看答案与解析
**答案：C**

**解析**：
- 需要 24/7 长期运行的 WebSocket 服务不适合 Serverless，因为 Serverless 函数有执行时间限制且有冷启动。
- Serverless 非常适合定时任务、偶发 API 请求和图片处理等突发性工作负载。
:::

### 第 9 题

::: details 查看答案与解析
**答案：B**

**解析**：
- 在 Edge 层使用 JWT 验证 Token 是最佳方案，因为 JWT 无状态、不需要查询中心数据库。
- Edge 函数不应直接查询数据库进行认证——这会增加延迟。
- 每次都重定向到中心服务器会丧失 Edge 的优势。
:::

### 第 10 题

::: details 查看答案与解析
**答案：B**

**解析**：JAMStack 代表 JavaScript、API 和 Markup。它是一种现代 Web 架构模式，在构建时预渲染静态页面（Markup），通过 JavaScript 和 API 调用实现动态功能，天然适合 Serverless 和 Edge 部署。
:::

### 第 11 题

::: details 查看答案与解析
**答案：B**

**解析**：基于 Cookie/Header 的流量路由可以在 Edge 层根据请求特征（如用户 ID、地域、设备类型）将流量分配到不同版本，实现细粒度的灰度发布。Edge 函数拦截请求并根据规则改写上游地址或返回不同内容。
:::

### 第 12 题

::: details 查看答案与解析
**答案：B**

**解析**：Vercel Edge Functions 运行在 V8 Isolates 环境中，与 Cloudflare Workers 类似，不提供完整的 Node.js API。例如，没有 `fs` 模块、`net` 模块等。这种轻量环境使得冷启动极快（微秒级），但 API 受限。
:::

### 第 13 题

::: details 查看答案与解析
**答案：B**

**解析**：Edge 函数是无状态的，不能依赖本地内存或磁盘持久化。最佳实践是使用全局分布式 KV 存储（如 Cloudflare KV、Vercel Edge Config）或边缘数据库（如 Cloudflare D1、PlanetScale）。这些服务在全球节点间同步数据。
:::

### 第 14 题

::: details 查看答案与解析
**答案：B**

**解析**：在 Serverless 架构中，函数间调用最好将相关逻辑合并到同一个函数中，或使用内部事件/队列进行通信。通过 HTTP 调用另一个函数会增加网络延迟和额外开销。
:::

### 第 15 题

::: details 查看答案与解析
**答案：B**

**解析**：
- AWS Lambda@Edge 与 CloudFront、DynamoDB、S3 等 AWS 服务深度集成，适合已有 AWS 基础设施的团队。
- Cloudflare Workers 在节点数量和原始性能上更优，但如果团队已经在 AWS 生态中，Lambda@Edge 的集成优势更明显。
:::

### 第 16 题

::: details 查看答案与解析
**参考思路**：
- 使用 Edge 函数（如 Cloudflare Workers 或 Vercel Edge）。
- 根据请求头中的地理位置或 IP 返回不同内容。
- 结合 CDN 缓存策略，为不同地理区域设置不同的缓存规则。
- 示例（Cloudflare Workers）：
```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const country = request.cf?.country || 'US'
  const content = await getContentForCountry(country)
  return new Response(content, {
    headers: { 'Content-Type': 'text/html' }
  })
}
```
:::

### 第 17 题

::: details 查看答案与解析
**参考思路**：
- 使用 Edge SSR，在边缘节点渲染首屏。
- 将静态资源缓存到 CDN。
- 个性化内容通过 Edge 函数动态注入。
- 配合 Vercel Edge Functions 做流式渲染（Streaming SSR）。
- 使用 ISR 增量静态生成平衡动态与静态内容。
:::

### 第 18 题

::: details 查看答案与解析
**参考思路**：

**Serverless 方案**：
- 优势：自动弹性伸缩，无需预先准备服务器；大促期间按实际调用付费，非大促期间零成本；免运维。
- 劣势：冷启动可能影响首次请求；执行时长限制（如 Lambda 最大 15 分钟）；调试复杂。

**传统服务器方案**：
- 优势：性能可预测，无冷启动；适合长时间运行的任务；调试工具成熟。
- 劣势：需要预估流量提前准备资源；大促后仍有闲置成本；运维复杂。

**建议**：对于电商大促场景，Serverless + Edge 组合是最佳选择——边缘层处理静态资源和个性化，Serverless 后端处理 API 和订单逻辑。
:::

### 第 19 题

::: details 查看答案与解析
**参考思路**：

**原因分析**：
- 典型的冷启动问题。函数长时间未被调用后，平台回收实例，首次请求需要重新初始化运行时和加载依赖。

**优化方案**：
1. **预留实例（Provisioned Concurrency）**：保持指定数量的实例始终 warm，彻底消除冷启动。
2. **代码优化**：减少依赖体积；使用 Tree Shaking 移除无用代码；选择轻量运行时。
3. **定期 Warm-up**：通过 CloudWatch Events / CRON 定时调用函数，保持活跃。
4. **使用 Edge 函数**：对于延迟敏感的 API，考虑迁移到 Edge 层（V8 Isolate 冷启动极低）。
5. **优化初始化逻辑**：将数据库连接等初始化移到 Handler 外部复用。
:::

### 第 20 题

::: details 查看答案与解析
**参考思路**：

**方案：边缘无状态认证**
1. **用户登录**：在中心服务器验证身份后，签发 JWT Token。
2. **缓存公钥**：在 Edge 函数中缓存 JWKS（JSON Web Key Set），定期刷新。
3. **边缘验证**：Edge 函数拦截请求，直接验证 JWT 签名和过期时间，无需回源。
4. **Token 刷新**：使用短生命周期 Access Token + 长生命周期 Refresh Token，Refresh Token 通过安全的中心 API 刷新。
5. **黑名单**：登出的 Token 加入分布式 KV（如 Cloudflare KV），Edge 函数在验证时检查。

**架构优势**：
- 全球延迟 < 10ms（Token 验证在边缘完成）。
- 无状态，水平扩展无限制。
- 回源请求减少 90% 以上。
:::

### 第 21 题

::: details 查看答案与解析
**参考思路**：

**设计方案**：
1. **实验配置**：将 A/B 实验配置（流量比例、实验标识）存储在分布式 KV 中。
2. **流量分配**：Edge 函数读取请求 Cookie 或计算用户 ID 哈希，决定分配版本。
3. **内容返回**：根据实验版本返回不同页面/API 响应。
4. **指标采集**：
   - 使用 Edge 函数在响应头中注入实验标识。
   - 客户端自动上报埋点数据。
   - 边缘节点收集指标后批量上报分析平台。
5. **实时切换**：更新 KV 中的实验配置即可实时调整流量比例，无需重新部署。

**示例（Cloudflare Workers）**：
```js
async function handleRequest(request) {
  const url = new URL(request.url)
  const expConfig = await KV_NAMESPACE.get('ab-test-config', 'json')
  const userId = request.headers.get('X-User-Id') || ''
  const hash = await hashUserId(userId)
  const variant = hash % 100 < expConfig.trafficPercent ? 'B' : 'A'
  const response = await fetch(url, request)
  const newResponse = new Response(response.body, response)
  newResponse.headers.set('X-Experiment', `homepage-${variant}`)
  return newResponse
}
```
:::

### 第 22 题

::: details 查看答案与解析
**参考思路**：

**迁移策略**：
1. **阶段一：Session 外部化**
   - 将内存 Session 迁移到外部存储（Redis / DynamoDB / Cloudflare KV）。
   - 应用代码改为从外部存储读取 Session。

2. **阶段二：无状态化改造**
   - 将业务逻辑中所有本地状态改为无状态设计。
   - 文件上传改为直接写入对象存储（S3 / R2）。
   - 数据库连接池改为每次请求独立连接或使用连接代理。

3. **阶段三：拆分边缘友好功能**
   - 将读多写少、对延迟敏感的功能迁移到 Edge 函数。
   - 如静态资源服务、内容个性化、认证验证。

4. **阶段四：全量迁移**
   - 使用 API Gateway 逐步切流。
   - 监控延迟、错误率，稳步推进。
:::

### 第 23 题

::: details 查看答案与解析
**参考思路**：

**解决方案**：
1. **第三方 API 代理层**：在中心区域部署 API 代理服务，Edge 函数统一通过代理访问。
2. **分布式 Token Bucket**：使用分布式 KV 实现全局速率限制，确保所有边缘节点共享额度。
3. **边缘缓存**：对第三方 API 的响应使用边缘缓存（Cache API），减少实际请求。
4. **批量请求合并**：Edge 函数合并多个相同请求，只发一次第三方 API 调用。
5. **使用专用出口 IP**：将 Edge 函数的出口流量路由到固定的中心代理 IP，避免分散 IP 触发限流。
:::

### 第 24 题

::: details 查看答案与解析
**参考对比**：
- **Vercel Edge**：与 Next.js 生态深度集成，适合 SSR/ISR，配置简单，适合前端团队。
- **Cloudflare Workers**：全球 300+ 节点，性能最强，API 丰富（KV、D1、R2、Queues），适合网关和通用边缘计算。
- **AWS Lambda@Edge**：与 AWS 生态深度集成（CloudFront、DynamoDB、S3），适合已有 AWS 基础设施的架构。

| 特性 | Vercel Edge | Cloudflare Workers | Lambda@Edge |
|------|------------|-------------------|-------------|
| 运行时 | V8 Isolate | V8 Isolate | Node.js / Python |
| 节点数 | ~100 | 330+ | 400+ (CloudFront) |
| KV 存储 | Edge Config | KV + D1 + Durable | DynamoDB + ElastiCache |
| 生态绑定 | Vercel / Next.js | Cloudflare | AWS |
| 冷启动 | 微秒级 | 微秒级 | 毫秒级 |
:::

### 第 25 题

::: details 查看答案与解析
**参考思路**：
- 静态资源通过多区域 CDN 分发（如 Cloudflare CDN 或 AWS CloudFront）。
- Edge 函数根据用户区域返回本地化内容和语言翻译。
- 数据层使用多区域数据库或全局缓存（如 Cloudflare D1、DynamoDB Global Tables）。
- 监控各区域延迟和可用性，自动故障转移。
- 使用地理位置路由 DNS（GeoDNS）将用户导向最近的区域。
- 示例架构：
  ```
  用户 -> DNS (区域路由) -> 就近 CDN 边缘节点
                              |
                    Edge Function 处理请求
                    ├── 静态资源 -> CDN 缓存
                    ├── API 请求 -> 就近区域 Serverless
                    └── 数据 -> 全局分布式 KV / DB
```
:::

### 第 26 题

::: details 查看答案与解析
**参考思路**：
- 使用 JWT 等无状态 Token，在 Token 中包含必要会话信息。
- 将会话数据存储在分布式 KV（如 Cloudflare KV、Vercel Edge Config、DynamoDB）。
- 避免在 Edge 函数中保存本地状态——所有状态读写都通过外部存储。
- 对于需要实时同步的会话（如购物车），使用 WebSocket 或 Server-Sent Events 连接回源服务器。
- 使用边缘缓存策略减少 KV 读取操作，更新时自动失效。
:::

### 第 27 题

::: details 查看答案与解析
**参考思路**：

**架构设计**：
```
客户端请求
    │
    ▼
┌─────────────────────────────────────┐
│         Edge API Gateway            │
│  ┌────────┐  ┌────────┐  ┌──────┐  │
│  │ 鉴权模块 │  │ 限流模块 │  │ 日志 │  │
│  └────────┘  └────────┘  └──────┘  │
│  ┌────────┐  ┌────────┐  ┌──────┐  │
│  │ 缓存模块 │  │ 灰度模块 │  │ 路由 │  │
│  └────────┘  └────────┘  └──────┘  │
└─────────────────────────────────────┘
    │
    ▼
 后端服务 / 微服务集群
```

**组件职责**：
1. **鉴权模块**：验证 JWT / API Key，支持 OIDC。
2. **限流模块**：基于 Token Bucket 算法，按 IP/用户/API 维度限流。
3. **缓存模块**：使用 Cache API 缓存响应，设置合理的 TTL。
4. **灰度模块**：按请求特征（地域、用户比例、Cookie）路由到不同版本。
5. **日志模块**：结构化日志输出到分布式日志系统。
6. **路由模块**：按路径/域名分发到后端服务。

**实现要点（Cloudflare Workers）**：
```js
export default {
  async fetch(request, env, ctx) {
    // 限流
    const ip = request.headers.get('CF-Connecting-IP')
    const quota = await checkRateLimit(ip, env.KV)
    if (!quota.allowed) return new Response('Rate Limited', { status: 429 })
    // 鉴权
    const auth = await authenticate(request)
    if (!auth.valid) return new Response('Unauthorized', { status: 401 })
    // 灰度
    const version = await getVariant(request, env)
    // 路由到后端
    return await routeToBackend(request, version)
  }
}
```
:::

### 第 28 题

::: details 查看答案与解析
**参考思路**：

**架构设计**：
```
用户 A (东京)             用户 B (纽约)
    │                        │
    ▼                        ▼
┌─────┐                  ┌─────┐
│边缘节点│◄─── WebSocket ──►│边缘节点│
│(Tokyo)│                  │(NYC) │
└──┬──┘                  └──┬──┘
   │                        │
   ▼                        ▼
┌──────────────────────────────┐
│      CRDT 同步层 (Durable    │
│      Objects / WebSocket)    │
├──────────────────────────────┤
│  文档状态存储 (D1 / DDB)     │
└──────────────────────────────┘
```

**核心设计**：
1. **CRDT 数据结构**：使用 Yjs 或 Automerge 实现无冲突的并发编辑。
2. **边缘 WebSocket**：Cloudflare Durable Objects 提供全局一致的 WebSocket 协调。
3. **状态持久化**：定期将文档状态写入分布式数据库，故障时恢复。
4. **离线编辑**：客户端本地缓存 CRDT 状态，恢复网络后同步。
5. **冲突解决**：CRDT 算法自动合并并发修改，无需中心服务器裁定。

**技术选型**：
- Cloudflare Workers + Durable Objects（应用层）
- Yjs（CRDT 库）
- Cloudflare D1（持久化）
:::

### 第 29 题

::: details 查看答案与解析
**参考思路**：

**迁移路线图**：

**阶段一：评估与准备（2-4 周）**
- 分析现有 API 的调用模式、延迟要求、依赖关系。
- 确定适合 Serverless 的服务（偶发请求、突发流量）和不适合的服务（长时间 WebSocket、重型计算）。
- 选择目标平台（Vercel / Cloudflare / AWS）。

**阶段二：基础设施搭建（2 周）**
- 配置 CI/CD 流水线。
- 搭建 API Gateway 或 Edge Router。
- 配置分布式 KV 和数据库。

**阶段三：低风险服务迁移（4-6 周）**
- 迁移无状态、低风险的 API（如内容查询、配置读取）。
- 使用新旧并行运行模式，逐步切流。
- 监控延迟、错误率、成本。

**阶段四：核心服务迁移（4-8 周）**
- 重构有状态服务为无状态。
- 实现边缘缓存层。
- 数据库读写分离改造。

**阶段五：边缘层优化（持续）**
- 将适合的边缘处理逻辑迁移到 Edge 函数。
- 优化冷启动、缓存策略、区域部署。

**风险控制**：
- 每次迁移保留回滚能力。
- 使用蓝绿部署或灰度发布。
- 每个阶段设立明确的回滚条件。
:::

### 第 30 题

::: details 查看答案与解析
**参考思路**：

**架构图**：
```
全球用户
    │
    ▼
┌────────────────────────────────────────────┐
│          Cloudflare / Vercel Edge          │
│  ┌──────────┐  ┌──────────┐  ┌─────────┐  │
│  │ 静态路由  │  │ 动态路由  │  │ 数据聚合 │  │
│  │ (ISR)    │  │ (SSR)    │  │ (边缘DB)│  │
│  └──────────┘  └──────────┘  └─────────┘  │
└────────────────┬───────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
区域数据源(US)         区域数据源(EU)
    │                         │
    └────────────┬────────────┘
                 ▼
        全局数据同步层
      (DDB Global / D1)
```

**核心设计**：

1. **混合渲染策略**：
   - 静态页面：使用 ISR（Incremental Static Regeneration），在构建时生成。
   - 动态页面：使用 Edge SSR，在最近节点渲染。
   - 动态路由：Edge 函数根据 URL 模式和用户特征决定渲染策略。

2. **数据获取优化**：
   - 边缘数据缓存（Cache API）缓存 API 响应。
   - 数据依赖拆分：区域特定数据从区域数据源获取，全局数据从全局缓存获取。
   - 使用 Streaming SSR 实现首屏快速呈现。

3. **故障转移**：
   - 区域故障时自动路由到其他区域。
   - 数据源故障时返回缓存版本（Stale-while-revalidate）。
   - 使用健康检查端点定期检测各区域状态。

4. **性能目标**：
   - CDN 缓存命中：< 10ms
   - 边缘 SSR（无缓存）：< 150ms
   - 边缘 SSR（含数据获取）：< 200ms (P95)
:::

---

**标签**：`#serverless` `#edge` `#architecture`

> **最后更新**：2026-07-06
