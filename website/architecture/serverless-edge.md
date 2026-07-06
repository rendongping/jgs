# A11 Serverless / Edge 架构

> 目标：掌握 Serverless 和边缘计算在前端架构中的应用，构建低延迟、高可用的现代 Web 应用。

---

## 核心要点（TL;DR）

- Serverless 让开发者专注业务逻辑，无需管理服务器。
- Edge 计算将代码推到离用户最近的节点执行，降低延迟。
- 前端与边缘函数结合，可实现 SSR、A/B 测试、个性化、安全网关。
- 边缘架构需要考虑冷启动、状态管理、调试和供应商锁定。

---

## 1. Serverless 基础

### 1.1 核心概念

- **FaaS**（Function as a Service）：函数即服务，开发者编写单功能函数，平台负责运行和伸缩。代表：AWS Lambda、Cloudflare Workers、Vercel Functions。
- **BaaS**（Backend as a Service）：后端即服务，如认证（Auth0）、数据库（Supabase）、存储（AWS S3），开发者直接在前端调用。
- **事件驱动**：Serverless 函数通过事件触发执行，典型事件包括 HTTP 请求、队列消息、定时触发（Cron）、数据库变更（CDC）、对象存储上传事件。
- **无状态设计**：函数实例不保留内存状态，每次调用可能运行在全新的容器中，状态必须外存到数据库、缓存或对象存储。

### 1.2 FaaS vs PaaS

| 维度 | FaaS | PaaS |
|------|------|------|
| 抽象层级 | 函数级别 | 应用级别 |
| 扩缩容 | 自动、细粒度（每次调用） | 自动但粒度较粗（实例数） |
| 计费 | 按调用次数 + 执行时长 | 按实例运行时长 |
| 冷启动 | 存在（容器预热开销） | 通常无（进程常驻） |
| 适用场景 | 短任务、事件处理、API | 长运行服务、Web 应用 |
| 运维负担 | 极低 | 较低 |

### 1.3 执行模型

Serverless 函数的典型生命周期：

```
触发事件 → 平台调度器分配容器 → 下载代码包 → 初始化运行时 → 执行 Handler → 返回结果 → 容器冻结/回收
```

- **首次调用**（冷启动）：包含完整生命周期，延迟较高（数百毫秒到数秒）。
- **热调用**：容器复用，仅执行 Handler，延迟极低（毫秒级）。
- **温调用**：容器处于待命状态，但运行时可能被部分回收，需要部分初始化。

### 1.4 冷启动问题深度分析

冷启动延迟的主要构成：

1. **代码下载**：从存储下载部署包至计算节点，包体积越大耗时越长。
2. **运行时初始化**：启动 Node.js/Python/Deno 等运行时，加载标准库。
3. **代码加载**：JavaScript 解析和编译，模块依赖加载。
4. **Handler 注册**：执行全局作用域代码，注册路由和中间件。

典型冷启动延迟参考：

| 运行时 | 冷启动时间（中位数） | 包体积影响 |
|--------|----------------------|------------|
| AWS Lambda Node.js | 200-500ms | +50ms 每 10MB |
| Cloudflare Workers | 5-50ms | 极小（V8 隔离） |
| Vercel Edge | 50-200ms | 中等 |
| Deno Deploy | 10-50ms | 极小 |

优化策略详见后续"冷启动优化"专题章节。

### 1.5 优势

- 按需付费，无闲置成本。
- 自动扩缩容，从零到百万无需干预。
- 快速上线，无需配置基础设施。
- 内置高可用和容错。

### 1.6 劣势

- 冷启动延迟。
- 执行时长限制（通常 15 分钟以内，边缘函数通常为毫秒级）。
- 调试和本地开发复杂。
- 供应商锁定——FaaS API 不互通。
- 状态管理困难，需要外部存储。

---

## 2. Edge 计算

### 2.1 什么是 Edge

Edge 计算的核心思想是在 **CDN 边缘节点** 运行代码，将计算资源地理分布在靠近用户的网络位置。

- **CDN 缓存 vs Edge Compute**：传统 CDN 只能缓存静态资源；Edge Compute 可在边缘执行动态逻辑，生成或修改响应内容。
- **数据 locality**：边缘节点通常不直接访问中心数据库，需要数据同步或边缘存储。
- **全球分布**：主要平台在全球 100-300+ 个城市部署节点，用户的请求自动路由到最近的节点。

### 2.2 CDN 与边缘计算的关系

```
用户请求 → DNS 解析 → 路由至最近边缘节点
                          ├── 缓存命中 → 直接返回
                          └── 缓存未命中 → Edge Function 执行 → 回源/返回
```

- 边缘函数可以在 CDN 缓存策略之前/之后执行，实现"计算 + 缓存"的组合。
- 常见模式：边缘函数处理认证和个性化，CDN 缓存公共内容。

### 2.3 Edge 适用场景

- 边缘 SSR / 渲染降级。
- A/B 测试和灰度分流。
- 地理位置相关的个性化内容。
- 安全：WAF、Bot 检测、请求改写。
- 边缘缓存和重定向。
- 认证和 JWT 验证。
- 特征标记（feature flags）和实验平台。
- API 网关和请求聚合（BFF at edge）。

### 2.4 Edge 限制

- 运行时长有限（通常毫秒级，Cloudflare Workers 30s、Vercel Edge 60s）。
- 内存和 CPU 受限（通常 128-512MB）。
- 不支持全量 Node.js API（如 fs、net 模块）。
- 不适合长时间计算或复杂状态。
- 调试工具相对于传统后端仍不成熟。

### 2.5 Edge 运行时对比

| 特性 | Cloudflare Workers | Vercel Edge | AWS Lambda@Edge | Deno Deploy |
|------|---------------------|-------------|-----------------|-------------|
| 运行时 | V8 Isolates (JavaScript) | V8 Isolates | Node.js / Python | Deno / V8 |
| 全球节点 | 300+ | 100+ | 200+ | 35+ |
| 最大执行时间 | 30s (unbound 15min) | 60s | 5s (viewer) / 30s | 60s |
| 内存限制 | 128MB | 128MB | 128MB | 256MB |
| 延迟优势 | 极低 | 低 | 中（回源触发） | 极低 |
| 冷启动 | 几乎为零 | ~50ms | 数百 ms | ~10ms |
| 本地开发 | Wrangler | Vercel CLI / Next.js | SAM / Serverless | deno task |

---

## 3. 前端 + Edge 架构模式

### 3.1 边缘渲染（Edge Rendering / SSR at Edge）

```
用户请求 → Edge 函数 → 获取数据/渲染 HTML → 返回页面
```

边缘渲染将 SSR 工作负载从源服务器迁移到 CDN 边缘节点，显著降低首字节时间（TTFB）。
Next.js 支持运行时配置 edge runtime：

```javascript
// next.config.js
export const config = {
  runtime: 'experimental-edge',
};

// pages/user/[id].js
export async function getServerSideProps({ params, req }) {
  const data = await fetch(`https://api.example.com/users/${params.id}`);
  return { props: { data: await data.json() } };
}
```

Nuxt 3 同样支持 edge 部署到 Cloudflare Pages / Vercel Edge。

### 3.2 边缘网关（Edge Gateway）

- 鉴权、限流、路由、改写请求。
- 减轻源站压力。
- 示例：Cloudflare Workers 作为反向代理网关。

```javascript
// Cloudflare Workers 网关示例
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // 1. 鉴权
  const token = request.headers.get('Authorization');
  if (!token || !validateToken(token)) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // 2. 限流
  const ip = request.headers.get('CF-Connecting-IP');
  const { success } = await rateLimit(ip);
  if (!success) {
    return new Response('Rate Limit Exceeded', { status: 429 });
  }
  
  // 3. 路由到后端服务
  url.hostname = 'api.backend.com';
  return fetch(url.toString(), request);
}
```

### 3.3 个性化与实验

- 边缘根据用户特征（地理位置、设备、Cookie）返回不同版本。
- 结合 CDN 缓存策略，为不同用户群提供差异化缓存。
- 详见后续 A/B 测试章节。

### 3.4 边缘流式渲染（Streaming SSR）

Next.js App Router 支持以流式方式从 edge 传输 HTML：

```jsx
// app/posts/page.jsx
import { Suspense } from 'react';

async function PostsList() {
  const posts = await fetch('https://api.example.com/posts');
  const data = await posts.json();
  return data.map(post => <div key={post.id}>{post.title}</div>);
}

export default function Page() {
  return (
    <div>
      <h1>Posts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PostsList />
      </Suspense>
    </div>
  );
}
```

边缘流式渲染的优势：
- 首次内容渲染（FCP）更快，不会因为数据获取而阻塞。
- 每个 Suspense 边界独立流式传输，无需等待最慢的数据源。
- 结合 edge runtime，用户可立即看到页面 shell，内容逐步填充。

---

## 4. 技术选型

| 平台 | 特点 | 适用 |
|------|------|------|
| Vercel Edge | Next.js 集成好、ISR 支持 | SSR、A/B 测试 |
| Cloudflare Workers | 全球节点多、性能强、KV/D1/R2 生态 | 网关、缓存、Workers |
| AWS Lambda@Edge | 与 AWS 生态集成、CloudFront | 已有 AWS 架构 |
| Deno Deploy | TypeScript 原生、Deno 生态 | 现代 Edge 应用 |
| Fly.io | 完整容器、接近用户的 VMs | 有状态应用、数据库 |

### 4.1 选型决策树

```
是否需要与特定云供应商集成？
  ├── 是（AWS）→ Lambda@Edge
  ├── 是（Vercel/Next.js）→ Vercel Edge
  └── 否
       ├── 需要全局低延迟 + 边缘存储 → Cloudflare Workers
       ├── 需要完整容器 + 数据库靠近用户 → Fly.io
       └── 喜欢 Deno 生态 → Deno Deploy
```

---

## 5. 深度平台分析

### 5.1 Cloudflare Workers

Cloudflare Workers 运行在 V8 Isolates 沙箱中，每个 Worker 是一个独立的 JavaScript 隔离环境，启动成本远低于容器。

#### 5.1.1 Workers + KV（键值存储）

KV 是全球复制的键值存储，最终一致性，适合配置、缓存、元数据。

```javascript
// 写入 KV
export default {
  async fetch(request, env, ctx) {
    await env.MY_KV.put('user:123', JSON.stringify({
      name: 'Alice',
      role: 'admin'
    }));
    return new Response('Data saved');
  }
};

// 读取 KV
const data = await env.MY_KV.get('user:123', 'json');
// → { name: 'Alice', role: 'admin' }
```

#### 5.1.2 Workers + D1（SQLite 数据库）

D1 是 Cloudflare 的 Serverless SQLite 数据库，支持关系型查询：

```javascript
// 创建表
await env.DB.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    completed INTEGER DEFAULT 0
  )
`);

// 插入
await env.DB.prepare(
  'INSERT INTO todos (title) VALUES (?1)'
).bind('Buy milk').run();

// 查询
const { results } = await env.DB.prepare(
  'SELECT * FROM todos WHERE completed = 0'
).all();
```

#### 5.1.3 Workers + R2（对象存储）

R2 是兼容 S3 API 的对象存储，无出口费用：

```javascript
// 上传文件
await env.MY_BUCKET.put('images/hero.png', request.body);

// 下载文件
const object = await env.MY_BUCKET.get('images/hero.png');
return new Response(object.body);
```

#### 5.1.4 Durable Objects（有状态协调）

Durable Objects 提供单点强一致性，适合 WebSocket 协调、游标同步、计数器等场景：

```javascript
export class Counter {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    const url = new URL(request.url);
    let value = (await this.state.storage.get('value')) || 0;

    if (url.pathname === '/increment') {
      value++;
      await this.state.storage.put('value', value);
    }

    return new Response(value.toString());
  }
}
```

#### 5.1.5 Queues（消息队列）

```javascript
// 生产者
export default {
  async fetch(request, env) {
    await env.MY_QUEUE.send({
      type: 'email',
      to: 'user@example.com'
    });
    return new Response('Queued');
  }
};

// 消费者 (wrangler.toml 配置)
export default {
  async queue(batch, env) {
    for (const msg of batch.messages) {
      console.log('Processing:', msg.body);
    }
  }
};
```

#### 5.1.6 Cron Triggers（定时任务）

```javascript
// wrangler.toml
// triggers = { crons = ["0 */6 * * *"] }

export default {
  async scheduled(event, env, ctx) {
    await env.DB.prepare(
      'DELETE FROM sessions WHERE expires_at < datetime('now')'
    ).run();
    console.log('Cleanup completed');
  }
};
```

### 5.2 Vercel Edge Functions

Vercel Edge Functions 基于 V8 Isolates，与 Next.js 深度集成。支持 Middleware、Edge Config、ISR 等。

#### 5.2.1 Vercel Middleware（Edge 中间件）

```typescript
// middleware.ts — 在 Edge 上运行的中间件
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';
  const response = NextResponse.next();

  // 根据用户地理位置定制响应
  if (country === 'CN') {
    response.cookies.set('region', 'cn');
  }

  // A/B 测试：随机分配到不同版本
  const bucket = Math.random() < 0.5 ? 'A' : 'B';
  response.cookies.set('experiment', bucket);

  return response;
}

export const config = {
  matcher: ['/', '/products/:path*'],
};
```

#### 5.2.2 Edge Config（边缘配置存储）

Edge Config 是 Vercel 的全球复制键值存储，适合存储 feature flags 和配置：

```typescript
import { get } from '@vercel/edge-config';

export default async function handler(req) {
  const features = await get('features');
  // features → { newCheckout: true, darkMode: false }

  if (features.newCheckout) {
    return new Response(JSON.stringify({ version: 'v2' }));
  }
  return new Response(JSON.stringify({ version: 'v1' }));
}
```

#### 5.2.3 ISR（增量静态再生）

ISR 允许在 Edge 层按需重新生成静态页面：

```javascript
// pages/products/[id].js
export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: { product },
    revalidate: 60, // 每 60 秒尝试重新生成
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}
```

ISR + Edge 组合：首次访问触发边缘渲染，缓存结果，后续请求直接由 CDN 服务。

#### 5.2.4 Vercel Analytics（边缘分析）

Vercel Analytics 在 Edge 层收集 Web Vitals 和页面浏览数据，不阻塞渲染：

```jsx
// app/layout.jsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics /> {/* 边缘收集，零性能开销 */}
      </body>
    </html>
  );
}
```

### 5.3 AWS Lambda@Edge / CloudFront Functions

AWS 提供两种边缘计算服务：

| 特性 | CloudFront Functions | Lambda@Edge |
|------|---------------------|-------------|
| 运行时 | JavaScript (ECMAScript 5.1) | Node.js / Python |
| 执行时间 | < 1ms | < 5s (viewer) / < 30s (origin) |
| 内存 | 2MB | 128MB |
| 冷启动 | 无 | 有 |
| 计费 | 按请求计费（$0.10/百万） | 按请求 + 时长 |
| 适用 | URL 重写、Header 操作 | 复杂逻辑、鉴权、SSR |

**Lambda@Edge 示例：用户代理检测与缓存策略**

```javascript
'use strict';

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  // 检测移动端
  const ua = headers['user-agent'][0].value;
  const isMobile = /Mobile|Android/i.test(ua);

  // 设置缓存策略
  if (isMobile) {
    request.headers['x-device'] = [{ key: 'X-Device', value: 'mobile' }];
  }

  callback(null, request);
};
```

**CloudFront Functions 示例：URL 重写**

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // 重写 /products/123 → /api/product?id=123
  var match = uri.match(/^/products/(d+)$/);
  if (match) {
    request.uri = '/api/product';
    request.querystring = 'id=' + match[1];
  }

  return request;
}
```

**Lambda@Edge 限制说明**：
- 不可在边缘节点使用环境变量（须硬编码或调用 SSM）。
- 函数版本不可删除，因为在 CloudFront 分发中持有引用。
- Viewer-request/viewer-response 的请求体不可修改（body 为空）。
- Origin-request/response 可访问请求体，但有大小限制。

### 5.4 Deno Deploy

Deno Deploy 是一个基于 Deno 运行时的边缘托管平台，天然支持 TypeScript：

```typescript
// Deno Deploy HTTP handler
Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const country = req.headers.get('x-country') || 'unknown';

  const body = {
    message: 'Hello from Deno Deploy!',
    country,
    path: url.pathname,
    timestamp: Date.now(),
  };

  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

Deno Deploy 优势：
- 原生 TypeScript 支持，无需编译配置。
- 支持 Web 标准 API（Fetch、WebSocket、Stream）。
- 与 Deno 生态（Fresh、Supabase Edge Functions）紧密集成。
- 每个部署自动获得闪电般的部署预览。

### 5.5 Fly.io

Fly.io 不是纯 Serverless 平台，而是在全球 35+ 个数据中心运行轻量级虚拟机，将完整容器部署到靠近用户的位置：

- 支持任何编程语言和运行时（Docker 容器）。
- 内置 Anycast 网络和 WireGuard VPN。
- 适合有状态应用和需要低延迟数据库连接的服务。
- 支持 Fly Postgres、SQLite 等边缘数据库。
- 通过 flyctl CLI 管理部署和扩缩容。

```toml
# fly.toml
[http_service]
  internal_port = 3000
  force_https = true

[[services.ports]]
  handlers = ['http']
  port = 80

[[services.ports]]
  handlers = ['tls', 'http']
  port = 443
```

---

## 6. Next.js / Nuxt 边缘渲染

### 6.1 Next.js Edge Runtime

Next.js 提供 edge runtime，可将 API Route 和 SSR 部署到 Vercel Edge 或自托管 Edge 环境：

```typescript
// app/api/hello/route.ts — Edge API Route
export const runtime = 'edge';

export async function GET(request: Request) {
  const geo = request.headers.get('x-vercel-ip-country');
  return new Response(
    JSON.stringify({ message: 'Hello', country: geo }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
```

### 6.2 Streaming SSR at Edge

App Router 的 streaming SSR 结合 edge runtime，可做到：
- 页面 shell 立即从边缘返回。
- 数据获取在边缘节点并行执行。
- 每个 React Suspense 边界独立流式刷出。

```jsx
// app/dashboard/page.jsx
import { Suspense } from 'react';
import { Skeleton } from '@/components/skeleton';

async function UserProfile() {
  // 在边缘节点并行获取
  const user = await fetch('https://api.example.com/user');
  const posts = await fetch('https://api.example.com/posts');
  const [u, p] = await Promise.all([user.json(), posts.json()]);
  return <Profile user={u} posts={p} />;
}

export default function Dashboard() {
  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile />
    </Suspense>
  );
}
```

### 6.3 Nuxt 3 + Edge

Nuxt 3 支持部署到 Vercel Edge Functions 和 Cloudflare Pages：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-pages',
  },
});
```

```typescript
// server/api/user.ts — 自动部署到 Edge
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const country = event.headers.get('cf-ipcountry');
  return { query, country };
});
```

---

## 7. Serverless 数据库——边缘兼容的数据方案

边缘函数无法直接连接传统集中式数据库（延迟高、连接数瓶颈），需要专为 Serverless 设计的数据库。

### 7.1 PlanetScale

- 基于 MySQL 的 Serverless 数据库，内置连接池和分支管理。
- 通过 HTTP API 访问，无需持久连接。
- 适合边缘场景：PlanetScale 提供 HTTP 驱动的 JS 驱动 @planetscale/database。

```javascript
import { connect } from '@planetscale/database';

const db = connect({ url: process.env.DATABASE_URL });
const result = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
```

### 7.2 Neon

- Serverless PostgreSQL，基于存算分离架构。
- 自动暂停/恢复，无闲置费用。
- 支持通过 @neondatabase/serverless 驱动从 Edge 连接。

```javascript
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
const rows = await sql'SELECT * FROM posts WHERE published = true LIMIT 10';
```

### 7.3 Turso

- 基于 libSQL（SQLite 分支），嵌入式和边缘原生。
- 主从架构：主节点写，多个只读副本分布在边缘节点。
- 支持从 Cloudflare Workers、Vercel Edge 直接查询。

```javascript
import { createClient } from '@libsql/client/web';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const result = await turso.execute('SELECT * FROM products');
```

### 7.4 Fauna

- 文档型 Serverless 数据库，原生支持 GraphQL 和 FQL。
- 全球分布式，强一致性。
- 直接从前端和边缘函数调用，无需中间层。

```javascript
import { Client, fql } from 'fauna';

const client = new Client({ secret: process.env.FAUNA_SECRET });
const { data } = await client.query(fql`
  users.where(.email == ${email}).first()
`);
```

### 7.5 边缘数据库选型对比

| 特性 | PlanetScale | Neon | Turso | Fauna |
|------|-------------|------|-------|-------|
| 模型 | MySQL | PostgreSQL | SQLite | 文档 + 关系 |
| 一致性 | 强一致 | 强一致 | 最终一致（副本） | 强一致 |
| HTTP 连接 | 是 | 是 | 是 | 是 |
| 边缘读取 | 受限 | 受限 | 优秀（多副本） | 优秀（全球） |
| 冷启动 | 无 | 轻微（暂停恢复） | 无 | 无 |
| 免费额度 | 1GB 存储 | 0.5GB | 9GB | 100k ops/月 |

---

## 8. 边缘认证（Authentication at Edge）

### 8.1 JWT 验证在边缘

边缘函数是验证 JWT 的理想场所——在请求到达源站之前完成鉴权，无效请求直接拒绝。

```javascript
// Cloudflare Workers JWT 验证
import { importJWK, jwtVerify } from 'jose';

const JWKS_URL = 'https://your-auth-domain/.well-known/jwks.json';

async function verifyJWT(token) {
  // 从 KV 缓存 JWKS，避免每次获取
  const cached = await env.JWKS_CACHE.get('jwks', 'json');
  const jwks = cached || await (await fetch(JWKS_URL)).json();
  if (!cached) await env.JWKS_CACHE.put('jwks', JSON.stringify(jwks), { expirationTtl: 3600 });

  const { payload } = await jwtVerify(
    token,
    await importJWK(jwks.keys[0])
  );
  return payload;
}

export default {
  async fetch(request, env) {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      const payload = await verifyJWT(auth.slice(7));
      request.cf.tokenPayload = payload; // 传递到上游
      return fetch(request);
    } catch {
      return new Response('Invalid token', { status: 401 });
    }
  }
}
```

### 8.2 边缘 Session 管理

Session 管理在边缘环境需要特殊设计，因为边缘函数无状态：

- **方案 A：JWT（推荐）**——声明式 token，无需服务端存储 session。
- **方案 B：KV/Edge Config 存储 session**——适合需要手动撤销的场景。
- **方案 C：加密 Cookie**——敏感数据加密后存储在客户端 Cookie 中。

```javascript
// Vercel Edge: 加密 Session Cookie
import { encrypt, decrypt } from './crypto';

export default async function handler(req) {
  const sessionCookie = req.cookies.get('session');
  
  if (sessionCookie) {
    const session = await decrypt(sessionCookie.value);
    if (session && session.expires > Date.now()) {
      return new Response('Authenticated');
    }
  }
  
  return new Response('Redirect to login', { status: 307, headers: { Location: '/login' } });
}
```

---

## 9. 边缘 A/B 测试与实验

### 9.1 Feature Flags at Edge

在边缘节点评估 feature flags，确保实验不影响页面性能：

```javascript
// Cloudflare Workers + KV feature flags
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userId = request.headers.get('X-User-Id') || 'anonymous';

    // 获取用户的实验分组（使用一致性哈希，确保同一用户始终分配到同一组）
    const features = await getFeaturesForUser(userId, env);

    // 根据 feature flag 选择页面版本
    if (features.newCheckout) {
      url.pathname = '/api/checkout-v2';
    }

    return fetch(url.toString(), request);
  }
}

async function getFeaturesForUser(userId, env) {
  // 使用用户 ID 哈希进行分流，保证一致性
  const hash = Array.from(userId).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const bucket = hash % 100;

  // 从 KV 读取全局实验配置
  const experiments = await env.EXPERIMENTS.get('active', 'json');
  return {
    newCheckout: experiments?.newCheckout?.rollout > bucket || false,
    newDesign: experiments?.newDesign?.rollout > bucket || false,
  };
}
```

### 9.2 Vercel Edge + Statsig / LaunchDarkly

主流 feature flag 平台都提供了边缘兼容的 SDK：

```javascript
// Vercel Edge + Statsig
import Statsig from 'statsig-node';

export default async function handler(req) {
  await Statsig.initialize(process.env.STATSIG_SECRET);
  
  const userId = req.headers.get('x-user-id');
  const gate = await Statsig.checkGate({ userID: userId }, 'new_checkout');

  if (gate) {
    // 实验组逻辑
  }
  return new Response('OK');
}
```

### 9.3 A/B 测试的缓存策略

- 使用 Cookie 头作为 Vary 字段：`Vary: x-experiment`。
- 边缘函数根据分组设置 Cookie，CDN 按分组缓存。
- 谨慎设计：过多的分组会降低缓存命中率。

```javascript
// Vercel Middleware A/B 缓存策略
export function middleware(req) {
  const group = req.cookies.get('exp_group')?.value || 'A';
  const response = NextResponse.next();
  
  // 告诉 CDN 根据实验分组缓存
  response.headers.set('Vary', 'x-experiment');
  response.headers.set('x-experiment', group);
  
  if (!req.cookies.has('exp_group')) {
    const assigned = Math.random() < 0.5 ? 'A' : 'B';
    response.cookies.set('exp_group', assigned, { maxAge: 3600 });
  }
  
  return response;
}
```

---

## 10. WebAssembly 在边缘（WASM at Edge）

WebAssembly 可以在边缘运行不受纯 JavaScript 性能限制的工作负载，例如图像处理、视频转码、数据压缩、ML 推理等。

### 10.1 Cloudflare Workers + WASM

```javascript
// 导入编译后的 WASM 模块
import wasm from './image-processor.wasm';

export default {
  async fetch(request) {
    const instance = await WebAssembly.instantiate(wasm);
    const { resizeImage } = instance.exports;

    const image = await request.arrayBuffer();
    const resized = resizeImage(image, 800, 600);
    return new Response(resized, {
      headers: { 'Content-Type': 'image/webp' },
    });
  }
};
```

### 10.2 WASM 在边缘的适用场景

- **图像处理**：WebP/AVIF 转换、缩略图生成、水印添加。
- **数据压缩**：gzip/brotli 压缩，减轻传输负载。
- **ML 推理**：使用 ONNX Runtime (WASM) 在边缘进行轻量级 AI 推理。
- **加密/解密**：高性能加解密操作，如视频 DRM。
- **序列化/反序列化**：Protocol Buffers、MessagePack 等高性能序列化。

- **值得注意**：Cloudflare Workers 支持 WASM，Vercel Edge 目前对 WASM 支持有限（需通过 wasm-pack 预处理）。

### 10.3 使用 Rust 编译 WASM 部署到 Edge

```rust
// src/lib.rs — 用 Rust 编写，编译为 WASM
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn process_payment(encrypted: &[u8]) -> Vec<u8> {
    // 高性能解密 + 验证签名
    let decrypted = decrypt(encrypted);
    let validated = validate_signature(&decrypted);
    serialize_response(validated)
}
```

```bash
wasm-pack build --target web
# 将生成的 .wasm 文件导入 Worker
```

---

## 11. 边缘架构设计模式（Edge Architecture Patterns）

### 11.1 模式一：边缘代理网关（Edge Proxy Gateway）

```
请求进入边缘节点 → 鉴权 → 限流 → 路由 → 聚合多个后端 → 返回
```

适用于 API 网关、BFF、微服务聚合。将所有外部请求统一经过边缘网关，实现鉴权、限流、日志等横切关注点。

### 11.2 模式二：边缘 + 缓存分层（Edge Cache Hierarchy）

```
用户 → 边缘节点（L1 缓存）→ 区域节点（L2 缓存）→ 源站
```

- L1：边缘节点缓存，TTL 短（秒级），针对热点内容。
- L2：区域缓存，TTL 中等（分钟级），回源保护。
- 源站：仅在缓存未命中时访问。

### 11.3 模式三：边缘个性化（Edge Personalization）

```
用户请求 → Edge Function → 读取 Cookie/地理位置/设备信息 → 动态组装页面片段
                        → 公共部分从 CDN 缓存，个性化部分由 Edge 生成
                        → 组合后返回
```

关键技术：ESI（Edge Side Includes）或自定义流式组装。

### 11.4 模式四：边缘 API 聚合（Edge API Composition / BFF）

边缘节点作为 BFF（Backend For Frontend），将多个微服务 API 聚合为前端需要的格式：

```javascript
// Cloudflare Workers API 聚合
export default {
  async fetch(request, env) {
    const [user, orders, recommendations] = await Promise.all([
      fetch('https://user-svc.internal/users/me', request),
      fetch('https://order-svc.internal/orders', request),
      fetch('https://rec-svc.internal/recommendations', request),
    ]);

    const response = {
      user: await user.json(),
      orders: await orders.json(),
      recommendations: await recommendations.json(),
    };

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

### 11.5 模式五：地理位置路由（Geo-Aware Routing）

根据用户地理位置路由到不同的后端或返回不同的内容版本：

```javascript
// Vercel Edge: 地理位置路由
export function middleware(request) {
  const country = request.geo?.country || 'US';
  const url = request.nextUrl.clone();

  // 中国用户路由到国内 CDN
  if (country === 'CN') {
    url.hostname = 'cn-backend.example.com';
    return NextResponse.rewrite(url);
  }

  // 欧盟用户遵循 GDPR
  if (['DE', 'FR', 'IT', 'ES'].includes(country)) {
    url.pathname = `/eu${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}
```

### 11.6 模式六：降级与熔断（Graceful Degradation）

当后端服务不可用时，边缘函数返回降级内容而非直接错误：

```javascript
async function fetchWithFallback(url, fallbackData) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Service unavailable');
    return await res.json();
  } catch {
    // 返回缓存的降级数据
    return fallbackData;
  }
}
```

### 11.7 模式七：边缘 WebSocket 网关

使用 Cloudflare Durable Objects 或 Serverless WebSocket 在边缘维持长连接：

- 实时协作（如 Figma 风格的白板）。
- 游戏同步。
- 实时数据推送。
- 每个房间/文档分配一个 Durable Object 实例，全局路由到最近的 DO。

---

## 12. 冷启动优化策略

### 12.1 代码体积优化

- **Tree Shaking**：移除未使用的代码，减少包体积。
- **代码拆分**：使用 dynamic import 按需加载模块。
- **最小化依赖**：只引入必要的包，避免臃肿的 npm 包。
- **使用原生 API**：优先使用运行时原生提供的 API（如 Cloudflare Workers 的 fetch、crypto 等）。

### 12.2 初始化延迟（Lazy Initialization）

```javascript
// 错误做法：全局作用域初始化
const client = createExpensiveClient(); // 每次冷启动都执行

// 正确做法：延迟初始化
let client;
async function getClient() {
  if (!client) {
    client = await createExpensiveClient();
  }
  return client;
}

export default {
  async fetch(request, env) {
    const db = await getClient(); // 仅在首次需要时初始化
    return new Response('OK');
  }
};
```

### 12.3 连接池复用

在 Serverless 环境中复用数据库连接等资源：

- 利用全局变量缓存连接（在容器复用期间有效）。
- 使用 HTTP 驱动的数据库客户端（如 @planetscale/database、@neondatabase/serverless），而非持久 TCP 连接。
- AWS Lambda 中启用 Keep-Alive 复用 HTTP 连接。

### 12.4 包管理器优化

- 使用 esbuild / webpack 打包成单个文件，减少文件数量。
- 移除 source maps（生产环境）。
- 使用 `--platform=node` 打包以 tree-shake Node.js 内置模块。

### 12.5 Keep-Warm 策略

通过定时请求保持函数的活跃状态，减少冷启动：

```javascript
// 使用 Cron Trigger 每 5 分钟发送保活请求
// wrangler.toml: triggers = { crons = ["*/5 * * * *"] }
export default {
  async scheduled(event, env, ctx) {
    // 调用自身保持热启动
    await fetch('https://your-worker.example.workers.dev/keep-warm');
  }
};
```

但需注意：Keep-Warm 会增加调用次数费用，且不同平台预热策略不同。

### 12.6 平台特定优化

- **Cloudflare Workers**：利用 module worker 的 top-level await 进行预先初始化。
- **AWS Lambda**：配置 Reserved Concurrency 保持指定数量的实例预热。
- **Vercel Edge**：使用 Edge Config 而非数据库调用减少网络延迟。
- **Deno Deploy**：利用 Deno KV 实现本地缓存。

---

## 13. 成本分析与优化（Pricing Comparison）

### 13.1 各平台定价模型对比

| 平台 | 免费额度 | 请求定价 | 计算定价 | 存储/数据库 | 出口流量 |
|------|----------|----------|----------|-------------|----------|
| Cloudflare Workers | 10 万请求/天 | $0.30/百万 | 无（含在请求中） | KV: $0.50/GB, D1: $0.75/GB | 无（免费） |
| Vercel Edge | 100GB 带宽 | $20/100k Edge 请求（Pro） | 含在请求中 | Edge Config: $0.10/GB | $0.15/GB 超额 |
| AWS Lambda@Edge | 100 万请求/月 | $0.60/百万 + AWS Lambda 费 | $0.0000166667/GB-s | 无（需自行搭配 S3/DynamoDB） | CloudFront 流量费 |
| Deno Deploy | 10 万请求/月 | $0.50/百万 | 含在请求中 | Deno KV: 免费 1GB | 含在请求中 |
| Fly.io | 3 台共享 VM | 无（按 VM 时长） | $0.0015/GB-s | Fly Postgres: $15/月起 | $0.02/GB |

### 13.2 成本优化建议

1. **缓存优先**：提高缓存命中率，减少边缘函数调用次数是最大的成本杠杆。
2. **选择合适的平台**：
   - 高流量场景 → Cloudflare Workers（无出口费，请求单价低）。
   - Next.js 生态 → Vercel（集成好，但出口流量需注意）。
   - AWS 生态 → Lambda@Edge（与现有架构集成，但总成本较高）。
3. **合并请求**：边缘做 API 聚合减少回源次数，降低总请求量。
4. **避免 Keep-Warm 过度调用**：权衡冷启动延迟和额外请求费用。
5. **利用免费额度**：开发环境和低流量阶段充分使用免费层。

### 13.3 成本估算案例

假设一个中型电商网站：
- 日均请求：100 万次
- 边缘函数执行平均时长：10ms
- 缓存命中率：70%（即 30 万次请求触发边缘函数执行）
- KV 存储：5GB

| 平台 | 月成本估算 | 说明 |
|------|------------|------|
| Cloudflare Workers | ~$0 | 免费额度覆盖（10万/天 × 30 = 300万） |
| Vercel Edge（Pro） | ~$20 | 需购买 Pro 计划（$20/月） |
| AWS Lambda@Edge | ~$15-25 | Lambda 费 + CloudFront 流量费 |
| Deno Deploy | ~$0-10 | 免费额度接近覆盖，超出后 $0.50/百万 |

> 注：以上为粗略估算，实际成本因地区、平台更新和合作协议而异。

---

## 14. 最佳实践

- 边缘函数保持轻量，避免复杂逻辑。
- 使用边缘缓存减少回源。
- 注意冷启动和超时限制。
- 日志和监控接入可观测平台。
- 设计供应商无关的抽象层，降低锁定风险。
- 配置合理的超时和重试策略，防止级联故障。
- 使用 TypeScript 编写边缘函数，减少运行时错误。
- 将敏感配置（API Key、数据库 URL）存储在平台提供的 Secret 管理服务中。
- 使用渐进式部署策略（灰度发布、蓝绿部署）。
- 编写自动化测试并模拟边缘运行时进行本地测试。

- **推荐工具链**：
  - 本地开发：Wrangler (CF)、Vercel CLI、AWS SAM。
  - 测试：Vitest + workerd (CF)、@vercel/functions。
  - 部署：GitHub Actions / GitLab CI 集成平台 CLI。
  - 监控：Cloudflare Analytics、Vercel Analytics、Datadog Serverless。

---

## 15. 常见误区

| 误区 | 正确理解 |
|------|---------|
| Serverless 完全无服务器 | 只是不需要管理服务器，代码仍然运行在服务器上 |
| Edge 适合所有场景 | 受限于执行时长和资源，不适合重度计算 |
| 边缘函数可以替代后端 | 复杂业务逻辑、长事务仍需传统后端 |
| 忽略冷启动 | 冷启动是 Serverless 的重要考量，需要主动优化 |
| Serverless 数据库连接与普通数据库相同 | 边缘环境需使用 HTTP 驱动或无状态连接池 |
| 边缘计算 = CDN | CDN 是缓存，边缘计算在 CDN 基础上增加了计算能力 |
| 部署到 Edge 自动就快了 | 需要合理的数据策略和缓存配置才能体现优势 |
| 所有平台 API 可移植 | 各平台 API 差异大，建议封装适配层 |

---

## 16. 未来趋势

- **Edge + AI 推理**：在边缘节点直接运行小型 AI 模型，实现低延迟的实时推理（如内容审核、语言检测）。
- **边缘 WebGPU**：利用边缘节点的 GPU 进行高性能计算。
- **标准化边缘 API**：WinterCG（Web-interoperable Runtimes Community Group）推动跨平台 API 标准化。
- **边缘与物联网整合**：在靠近 IoT 设备的边缘节点处理传感器数据。
- **Serverless 容器**：Edge 层运行轻量级容器，支持任意运行时（如 Fly.io 的模式）。
- **更高效的冷启动**：V8 快照、代码预编译等技术进一步减少冷启动。
- **边缘数据网格**：边缘节点内置分布式数据库，支持强一致性的全球数据操作。

---

## 17. 实践项目推荐

为巩固学习效果，建议按以下路径实践：

1. **入门**：在 Cloudflare Workers 上部署一个 API 代理（请求转发 + 缓存）。
2. **进阶**：使用 Vercel Edge Functions 实现一个 A/B 测试中间件。
3. **中级**：构建一个边缘认证网关（JWT 验证 + 路由，使用 KV 缓存 JWKS）。
4. **高级**：部署一个国际电商页面，使用边缘 SSR + 地理位置路由 + 个性化推荐。
5. **专家**：设计一个全球实时协作白板应用（Durable Objects + WebSocket）。

---

## 相关领域

- E10 Node.js/BFF：后端服务基础。
- A01 System Architecture：架构模式。
- E03 CI/CD：部署和发布。
- A06 Observability：边缘监控。
- E02 API Design：设计可在边缘使用的 API。
- A04 Micro Frontend：微前端在边缘的分发和组合。
- F01 Performance：性能优化与缓存策略。

---

**标签**：`#serverless` `#edge` `#cloudflare` `#vercel` `#faas` `#lambda-edge` `#deno-deploy` `#cold-start` `#wasm` `#edge-db` `#streaming-ssr` `#feature-flags`

> **最后更新**：2026-07-06


---

## 本领域学习进度

<MarkComplete domainId="serverless-edge" />
<ProgressTracker />
