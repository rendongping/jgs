# E10 Node.js / BFF 服务端 — 练习册

> 目标：通过练习巩固 Node.js 运行时、BFF 架构、SSR/SSG 服务、Serverless 与边缘计算等核心能力。

---

## 难度分级

- 🟢 **基础**：理解 Node.js 基础概念，能写简单 API。
- 🟡 **进阶**：能设计 BFF 服务，处理 SSR/SSG 选型。
- 🔴 **深入**：能设计服务端架构，处理高并发、安全、性能等问题。

---

## 基础题

### 题目 1：Node.js 为什么适合 I/O 密集型场景？

**考察点**：Node.js 事件循环与非阻塞 I/O。

**题目**：
请解释 Node.js 为什么适合 I/O 密集型场景，但不适合 CPU 密集型场景。

**参考答案**：

#### 1. Node.js 的核心机制

Node.js 采用以下核心设计：

- **单线程事件循环**：主线程通过一个事件循环处理所有请求。
- **非阻塞 I/O**：网络请求、文件读写等 I/O 操作不会阻塞主线程，完成后通过回调/Promise 通知事件循环。
- **事件驱动**：基于回调、事件发射器、Promise、async/await 处理异步结果。

```
        用户请求 A
            │
            ▼
    ┌───────────────┐
    │   事件循环     │
    └───────┬───────┘
            │
    ┌───────┴───────┐
    │  非阻塞 I/O    │  ← 将操作交给操作系统/线程池
    │  （网络/文件）  │
    └───────┬───────┘
            │
            ▼
    I/O 完成后回调事件循环
            │
            ▼
    处理响应并返回给用户
```

#### 2. 为什么适合 I/O 密集型

I/O 密集型操作的特点是：

- 大部分时间花在等待网络/磁盘响应上。
- 不需要大量 CPU 计算。

Node.js 的优势：

- 一个请求发起 I/O 后，主线程可以立即处理其他请求。
- 相同的硬件资源可以支撑大量并发连接（C10K 问题）。
- 适合 Web 服务器、API 网关、BFF、实时通信等场景。

#### 3. 为什么不适合 CPU 密集型

CPU 密集型任务的特点：

- 需要长时间占用 CPU 进行计算。
- 会阻塞事件循环，导致其他请求无法被处理。

示例：

```js
// 这是一个会阻塞事件循环的 CPU 密集型操作
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 当 n 很大时，整个 Node.js 进程会被卡住
app.get('/fib/:n', (req, res) => {
  const result = fibonacci(Number(req.params.n));
  res.json({ result });
});
```

#### 4. CPU 密集型任务的解决方案

- **Worker Threads**：使用 Node.js 的 `worker_threads` 模块，在独立线程中执行计算。
- **子进程**：通过 `child_process` 调用其他程序。
- **外部服务**：将计算任务交给 Python、Go、Rust 等更适合的语言/服务处理。
- **任务队列**：使用 Redis + Bull/BullMQ 等队列，将任务异步化。

```js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  app.get('/fib/:n', async (req, res) => {
    const worker = new Worker(__filename, {
      workerData: Number(req.params.n),
    });
    worker.on('message', (result) => res.json({ result }));
    worker.on('error', (err) => res.status(500).json({ error: err.message }));
  });
} else {
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  parentPort.postMessage(fibonacci(workerData));
}
```

---

### 题目 2：CommonJS 和 ES Module 有什么区别？

**考察点**：Node.js 模块系统。

**题目**：
请对比 CommonJS 和 ES Module，并说明现代 Node.js 项目应该如何选择。

**参考答案**：

#### 1. 核心区别

| 特性 | CommonJS (CJS) | ES Module (ESM) |
|------|----------------|-----------------|
| 语法 | `require` / `module.exports` | `import` / `export` |
| 加载时机 | 运行时动态加载 | 编译时静态分析 |
| 同步/异步 | 同步加载 | 异步加载（顶层 import） |
| 树摇优化 | 难以 Tree Shaking | 天然支持 Tree Shaking |
| 循环依赖 | 允许，但行为复杂 | 允许，规范更明确 |
| 顶层 this | `module.exports` | `undefined` |
| 文件扩展名 | `.js` / `.cjs` | `.mjs` / `.js`（配合 `"type": "module"`） |
| 动态导入 | `require()` 本身动态 | `import()` 支持动态 |

#### 2. CommonJS 示例

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js
const { add } = require('./math.js');
console.log(add(1, 2));
```

#### 3. ES Module 示例

```js
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js';
console.log(add(1, 2));
```

#### 4. 现代项目如何选择

**推荐优先使用 ES Module**：

1. 在 `package.json` 中设置 `"type": "module"`。
2. 使用 `.js` 扩展名即可按 ESM 解析。
3. 需要 CommonJS 的文件使用 `.cjs` 扩展名。

**适用场景**

| 场景 | 推荐 |
|------|------|
| 新项目 | ESM |
| 需要 Tree Shaking 的库 | ESM |
| 前端工程化（Vite、Rollup、Webpack） | ESM |
| 需要动态加载的模块 | ESM + `import()` |
| 兼容老旧 Node.js 模块 | CJS |
| 一些配置文件（如 PostCSS、Tailwind） | 根据工具要求 |

#### 5. 混合使用注意事项

```js
// ESM 中导入 CJS：可以，但默认导出可能是一个对象
import cjsModule from './legacy.cjs';

// CJS 中导入 ESM：必须用动态 import
async function loadEsm() {
  const { add } = await import('./math.js');
  console.log(add(1, 2));
}
```

#### 6. TypeScript 项目配置

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2022"
  }
}
```

---

### 题目 3：写一个最简单的 Express 服务

**考察点**：基础服务端代码能力。

**题目**：
请用 Express 实现一个 GET 接口 `/api/hello`，返回 JSON `{ message: 'Hello, World!' }`。

**参考答案**：

#### 1. 完整代码

```ts
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

#### 2. package.json 配置

```json
{
  "name": "simple-express-server",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "typescript": "^5.3.0"
  }
}
```

#### 3. 运行方式

```bash
npm install
npm run dev
```

访问 `http://localhost:3000/api/hello` 即可看到返回结果。

#### 4. 扩展：添加中间件

```ts
import express from 'express';
import cors from 'cors';

const app = express();

// 解析 JSON 请求体
app.use(express.json());
// 启用跨域
app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body });
});

// 全局错误处理中间件
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000);
```

---

### 题目 4：BFF 的核心职责是什么？

**考察点**：BFF 基本概念。

**题目**：
什么是 BFF？它主要解决什么问题？请列举至少 4 个核心职责。

**参考答案**：

#### 1. 什么是 BFF

BFF = **Backend for Frontend**，即“面向前端的后端”。

BFF 是介于前端应用和后端微服务/数据库之间的一层服务，专门为一个或多个前端应用（Web、H5、小程序、App、Admin 后台）提供定制化的 API。

```
┌─────────┐      ┌─────────┐      ┌─────────────────┐
│   Web   │      │   BFF   │      │  用户服务        │
├─────────┤      │  (Node) │      │  订单服务        │
│   H5    │ ───▶ │         │ ───▶ │  商品服务        │
├─────────┤      │ · 聚合   │      │  营销服务        │
│  小程序  │      │ · 适配   │      │  支付服务        │
├─────────┤      │ · 鉴权   │      └─────────────────┘
│  Admin  │      │ · 缓存   │
└─────────┘      └─────────┘
```

#### 2. 主要解决的问题

| 问题 | 说明 |
|------|------|
| 多端接口耦合 | 不同端对数据格式、字段、聚合粒度要求不同，直接调用后端服务难以兼顾。 |
| 多次请求 | 一个页面需要调用多个后端服务，前端需要发多次请求。 |
| 数据格式不适配 | 后端 DTO 不适合直接展示，需要转换。 |
| 鉴权限流分散 | 各端重复实现登录校验、权限控制。 |
| 协议转换 | 前端使用 REST/GraphQL，后端使用 gRPC/Thrift。 |

#### 3. 核心职责

1. **接口聚合（Aggregation）**
   - 将多个下游服务的调用合并为一个前端接口。
   - 使用 `Promise.all` 并行调用，减少响应时间。

2. **数据适配（Adaptation）**
   - 将后端 DTO 转换为前端需要的 ViewModel。
   - 字段映射、单位转换、格式化、脱敏等。

3. **鉴权与限流（Auth & Rate Limit）**
   - 统一校验用户身份、权限。
   - 对下游服务进行限流，防止被压垮。

4. **缓存（Caching）**
   - 对热点数据做 Redis/内存缓存。
   - 减少下游调用次数，提升响应速度。

5. **协议转换（Protocol Transformation）**
   - 将前端的 HTTP/GraphQL 请求转换为后端的 gRPC/Thrift/消息队列。

6. **错误处理与降级（Error Handling & Degradation）**
   - 下游服务失败时返回兜底数据或友好错误。
   - 避免单点故障拖垮整个页面。

#### 4. BFF 不是

- **不是前端框架**：BFF 是服务端层。
- **不是简单的 API 代理**：BFF 包含业务逻辑、数据转换、聚合等。
- **不能完全替代后端服务**：后端服务负责核心业务和数据持久化。

---

## 进阶题

### 题目 5：设计一个 BFF 接口

**考察点**：BFF 实战设计。

**题目**：
后端有两个服务：用户服务 `/user/:id` 返回用户信息，订单服务 `/orders?userId=` 返回订单列表。请设计一个 H5 端 BFF 接口 `/api/user-summary`，返回用户头像、昵称、订单总数、最近一笔订单金额。

**参考答案**：

#### 1. 接口设计

```
GET /api/user-summary?userId=123

Response:
{
  "avatar": "https://cdn.example.com/avatar/123.jpg",
  "nickname": "张三",
  "orderCount": 15,
  "lastOrderAmount": 299.00
}
```

#### 2. 完整实现

```ts
import express from 'express';

const app = express();

// 模拟下游服务
const userService = {
  async get(userId: string) {
    const res = await fetch(`https://user-service.example.com/user/${userId}`);
    if (!res.ok) throw new Error('用户服务异常');
    return res.json();
  },
};

const orderService = {
  async getByUserId(userId: string) {
    const res = await fetch(`https://order-service.example.com/orders?userId=${userId}`);
    if (!res.ok) throw new Error('订单服务异常');
    return res.json();
  },
};

app.get('/api/user-summary', async (req, res, next) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: '缺少 userId 参数' });
    }

    // 并行请求用户和订单数据
    const [user, orders] = await Promise.all([
      userService.get(userId),
      orderService.getByUserId(userId),
    ]);

    // 数据适配：只返回前端需要的字段
    const summary = {
      avatar: user.avatar,
      nickname: user.nickname,
      orderCount: orders.length,
      lastOrderAmount: orders[0]?.amount || 0,
    };

    res.json(summary);
  } catch (err) {
    next(err);
  }
});

// 全局错误处理
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err);
  res.status(500).json({ error: '服务暂不可用，请稍后重试' });
});

app.listen(3000);
```

#### 3. 生产环境增强

```ts
app.get('/api/user-summary', async (req, res, next) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) return res.status(400).json({ error: '缺少 userId' });

    // 1. 先获取用户（用户是必要依赖）
    const user = await userService.get(userId);

    // 2. 订单服务失败时返回空数组，避免整个接口失败
    const orders = await orderService
      .getByUserId(userId)
      .catch((err) => {
        logger.warn('订单服务异常', err);
        return [];
      });

    // 3. 对订单排序（如果后端未排序）
    const sortedOrders = orders.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // 4. 数据脱敏：头像 URL 加签名
    const avatarUrl = addCdnSignature(user.avatar);

    res.json({
      avatar: avatarUrl,
      nickname: user.nickname,
      orderCount: sortedOrders.length,
      lastOrderAmount: sortedOrders[0]?.amount || 0,
      lastOrderTime: sortedOrders[0]?.createdAt || null,
    });
  } catch (err) {
    next(err);
  }
});
```

#### 4. 设计要点

- **并行调用**：用户和订单无依赖关系，使用 `Promise.all` 减少等待时间。
- **优雅降级**：订单服务失败时不影响用户信息的返回。
- **字段裁剪**：只返回前端需要的字段，减少传输体积。
- **错误处理**：统一错误处理，不暴露下游服务细节。

---

### 题目 6：SSR 和 SSG 应该怎么选？

**考察点**：渲染模式选型。

**题目**：
请对比 CSR、SSR、SSG、ISR 四种渲染模式，并说明各自适用场景。

**参考答案**：

#### 1. 四种模式对比

| 方案 | 首屏时间 | SEO | 实时性 | 服务器成本 | 复杂度 | 典型场景 |
|------|----------|-----|--------|------------|--------|----------|
| **CSR** | 慢 | 差 | 高 | 低 | 低 | 后台系统、强交互应用 |
| **SSR** | 快 | 好 | 高 | 高 | 高 | 内容站、电商、门户网站 |
| **SSG** | 最快 | 最好 | 低 | 最低 | 低 | 博客、文档、营销页 |
| **ISR** | 快 | 好 | 中 | 中 | 中 | 新闻、商品详情、CMS 页面 |

#### 2. CSR（Client-Side Rendering）

```
浏览器请求 HTML → 返回空壳 HTML + JS
                    │
                    ▼
            浏览器下载并执行 JS
                    │
                    ▼
            JS 请求数据并渲染页面
```

- **优点**：交互体验好，服务器压力小，部署简单。
- **缺点**：首屏慢，SEO 差。
- **适用**：Dashboard、后台管理系统、SPA 应用。

#### 3. SSR（Server-Side Rendering）

```
浏览器请求页面 → 服务器实时获取数据
                       │
                       ▼
              服务器渲染完整 HTML
                       │
                       ▼
              浏览器展示 HTML + hydration
```

- **优点**：首屏快，SEO 好，实时性强。
- **缺点**：服务器压力大，开发复杂，需要处理hydration、状态同步等问题。
- **适用**：电商首页、商品详情、内容站、需要 SEO 的页面。

#### 4. SSG（Static Site Generation）

```
构建时获取数据 → 生成静态 HTML
                       │
                       ▼
              部署到 CDN
                       │
                       ▼
              用户直接访问静态文件
```

- **优点**：首屏最快，SEO 最好，成本低。
- **缺点**：内容更新需要重新构建，实时性差。
- **适用**：博客、文档站、营销落地页、企业官网。

#### 5. ISR（Incremental Static Regeneration）

```
首次请求：返回缓存的静态页面（可能稍旧）
              │
              ▼
      后台异步重新生成页面
              │
              ▼
      下次请求返回最新页面
```

- **优点**：兼顾 SSG 的性能和 SSR 的实时性。
- **缺点**：首次访问可能拿到旧数据，需要处理过期策略。
- **适用**：新闻详情、商品详情、CMS 驱动的页面。

#### 6. 选型决策树

```
需要 SEO 吗？
  ├─ 否 → CSR（强交互场景）
  └─ 是 → 数据变化频繁吗？
           ├─ 是 → SSR（实时内容）
           └─ 否 → 页面数量多吗？
                    ├─ 是 → ISR（大规模静态页面）
                    └─ 否 → SSG（固定内容）
```

#### 7. 混合架构

现代应用通常采用混合架构：

- 营销页、帮助文档：SSG
- 商品详情、文章页：ISR
- 用户中心、购物车：CSR
- 搜索页、SEO 关键页：SSR

---

### 题目 7：如何处理服务端错误？

**考察点**：服务端健壮性。

**题目**：
在 Express 中，如何处理异步函数抛出的错误？请给出代码示例。

**参考答案**：

#### 1. 问题背景

Express 默认不会捕获异步函数中的错误。如果 async 路由处理器中抛出异常，请求会挂起或进程崩溃。

```ts
// ❌ 错误示例：异常不会被 Express 捕获
app.get('/api/data', async (req, res) => {
  const data = await fetchData(); // 如果这里报错，请求会挂起
  res.json(data);
});
```

#### 2. 方案一：asyncHandler 包装器

```ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 使用
app.get('/api/data', asyncHandler(async (req, res) => {
  const data = await fetchData();
  res.json(data);
}));
```

#### 3. 方案二：Express 5 原生支持

Express 5 开始原生支持 async 错误处理：

```ts
app.get('/api/data', async (req, res) => {
  const data = await fetchData();
  res.json(data);
});
```

#### 4. 方案三：完整的错误处理体系

```ts
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// 自定义错误类
class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// 异步包装
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 业务路由
app.get('/api/user/:id', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    throw new AppError(400, 'INVALID_PARAM', '用户 ID 不能为空');
  }

  const user = await fetchUser(userId);
  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', '用户不存在');
  }

  res.json(user);
}));

// 404 处理
app.use((req, res, next) => {
  next(new AppError(404, 'NOT_FOUND', '接口不存在'));
});

// 全局错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  }

  // 未知错误
  console.error('Unhandled error:', err);
  res.status(500).json({
    code: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'development' ? err.message : '服务器内部错误',
  });
});

app.listen(3000);
```

#### 5. 错误处理最佳实践

- **统一错误格式**：所有错误返回 `{ code, message, details? }` 结构。
- **区分业务错误和系统错误**：业务错误返回 400/404，系统错误返回 500。
- **不泄露敏感信息**：生产环境不返回堆栈信息。
- **日志记录**：所有 500 错误必须记录，便于排查。
- **监控告警**：核心接口错误率超过阈值时触发告警。

---

### 题目 8：Serverless 的优缺点是什么？

**考察点**：Serverless 理解。

**题目**：
Serverless 有哪些优点和缺点？前端在什么场景下适合使用 Serverless？

**参考答案**：

#### 1. Serverless 的优点

| 优点 | 说明 |
|------|------|
| **按需付费** | 只有请求执行时才计费，无流量时成本接近零。 |
| **自动扩缩容** | 云服务商根据请求量自动扩展，无需手动配置。 |
| **免运维** | 不需要管理服务器、操作系统、补丁、容量规划。 |
| **快速部署** | 只需上传代码即可运行，发布周期短。 |
| **事件驱动** |  easily 与对象存储、消息队列、定时任务等事件源集成。 |

#### 2. Serverless 的缺点

| 缺点 | 说明 |
|------|------|
| **冷启动延迟** | 函数长时间未调用后首次调用会有延迟（几百毫秒到数秒）。 |
| **运行时长限制** | 多数平台限制单次执行时间（如 15 分钟）。 |
| **本地调试复杂** | 依赖云环境，本地难以完全模拟。 |
| **状态管理受限** | 函数无状态，需要依赖外部存储。 |
| **供应商锁定** | 不同平台的 API 和特性差异大，迁移成本高。 |
| **成本不可控** | 高并发场景下，按调用次数计费可能比固定服务器更贵。 |

#### 3. 前端适合使用 Serverless 的场景

1. **BFF（Backend for Frontend）**
   - 聚合多个后端接口，为前端提供定制化 API。
   - 示例：Vercel Functions、Netlify Functions、阿里云函数计算。

2. **轻量 API**
   - 表单提交、联系表单、投票、评论等简单接口。

3. **边缘逻辑**
   - 在 CDN 边缘节点执行 A/B 测试、地理定位、请求改写。
   - 示例：Vercel Edge Functions、Cloudflare Workers。

4. **事件处理**
   - 图片上传后自动压缩、Webhook 接收、消息推送。

5. **低频任务**
   - 定时报表生成、数据同步、邮件发送。

#### 4. 不适合 Serverless 的场景

- 需要长时间运行的服务（如 WebSocket 长连接、视频流处理）。
- 对延迟极其敏感的核心链路（冷启动问题）。
- 高并发且持续运行的服务（成本可能更高）。
- 需要大量本地状态或复杂依赖的应用。

#### 5. 示例：Vercel Serverless Function

```ts
// api/hello.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.json({ message: 'Hello from Serverless!' });
}
```

---

## 深入题

### 题目 9：设计一个高可用 BFF 架构

**考察点**：服务端架构设计。

**题目**：
一个电商平台的 BFF 每天处理 1000 万请求，高峰 QPS 5000。请设计一个高可用 BFF 架构，包括负载均衡、缓存、限流、降级方案。

**参考答案**：

#### 1. 整体架构

```
                              ┌─────────────┐
                              │   用户请求   │
                              └──────┬──────┘
                                     ▼
                         ┌───────────────────────┐
                         │   CDN / WAF / DNS     │
                         └───────────┬───────────┘
                                     ▼
                         ┌───────────────────────┐
                         │   负载均衡（L7/L4）    │
                         │   Nginx / 云 LB       │
                         └───────────┬───────────┘
                                     ▼
                    ┌────────────────────────────────┐
                    │        BFF 服务集群             │
                    │  ┌─────┐ ┌─────┐ ┌─────┐      │
                    │  │Pod 1│ │Pod 2│ │Pod N│      │
                    │  └─────┘ └─────┘ └─────┘      │
                    │       自动扩缩容 HPA            │
                    └────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
   ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
   │   Redis 缓存   │        │  限流/熔断中心 │        │  配置/注册中心 │
   │  · 热点数据    │        │  · Token Bucket│        │  · Nacos      │
   │  · 会话状态    │        │  · Circuit     │        │  · Consul     │
   └───────────────┘        │    Breaker     │        └───────────────┘
                            └───────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
   ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
   │   用户服务     │        │   订单服务     │        │   商品服务     │
   └───────────────┘        └───────────────┘        └───────────────┘
```

#### 2. 负载均衡

- **入口层**：使用云 LB（如阿里云 SLB、AWS ALB）做 L4/L7 负载均衡。
- **服务层**：使用 Nginx 或 Service Mesh（Istio）做服务发现和流量分发。
- **策略**：轮询 + 最小连接数 + 健康检查，自动剔除异常节点。
- **自动扩缩容**：基于 CPU、内存、QPS 指标配置 HPA，高峰自动扩容，低峰缩容。

#### 3. 缓存策略

| 层级 | 作用 | 示例 |
|------|------|------|
| **浏览器缓存** | 静态资源、接口响应 | `Cache-Control: max-age=300` |
| **CDN 缓存** | 静态资源、不常变化的数据 | 商品分类、配置 |
| **BFF 本地缓存** | 进程内缓存，极低延迟 | Caffeine、Node-Cache |
| **Redis 缓存** | 分布式缓存，热点数据 | 用户信息、商品详情 |
| **下游接口缓存** | 减少下游调用 | 对响应时间较长的接口做缓存 |

缓存更新策略：

- **Cache-Aside**：先读缓存，未命中再读数据库并写入缓存。
- **TTL 过期**：设置合理的过期时间，避免数据长期不一致。
- **主动失效**：数据变更时通过消息队列通知缓存失效。

#### 4. 限流方案

- **入口限流**：在 Nginx/网关层按 IP、User-Agent 限流。
- **接口限流**：使用 Token Bucket 或 Leaky Bucket 算法，按用户、接口限流。
- **下游保护**：对下游服务调用做限流，防止把下游打垮。

```ts
// Token Bucket 限流示例（概念）
class TokenBucket {
  constructor(private capacity: number, private refillRate: number) {}

  allowRequest(tokens: number = 1): boolean {
    this.refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }
}
```

#### 5. 降级方案

| 场景 | 降级策略 |
|------|----------|
| 下游服务超时 | 返回缓存数据或默认值 |
| 下游服务报错 | 非核心数据返回空，核心数据返回错误提示 |
| 推荐服务不可用 | 首页降级为固定推荐位 |
| 库存服务异常 | 显示“库存紧张”，不允许下单 |
| 优惠券服务异常 | 跳过优惠券计算，按原价展示 |

#### 6. 熔断方案

使用 Circuit Breaker 模式：

- **Closed**：正常调用下游服务。
- **Open**：失败率达到阈值后，直接快速失败，不再调用下游。
- **Half-Open**：一段时间后允许少量请求试探，成功后恢复 Closed。

工具：Hystrix、Resilience4j、Polly、自研熔断器。

#### 7. 监控与告警

- **指标**：QPS、延迟 P99、错误率、CPU、内存、GC。
- **日志**：结构化日志，支持链路追踪。
- **告警**：错误率 > 1%、P99 > 500ms、CPU > 80% 时触发告警。

---

### 题目 10：Node.js 服务的性能优化

**考察点**：服务端性能优化。

**题目**：
一个 Node.js BFF 服务响应变慢，请列出至少 6 个排查和优化方向。

**参考答案**：

#### 1. 资源使用排查

- **CPU**：使用 `top`、`htop`、Node.js `--prof` 分析 CPU 占用。
- **内存**：使用 `process.memoryUsage()`、heap dump 检查内存泄漏。
- **事件循环延迟**：使用 `clinic.js`、`0x` 或内置 `perf_hooks` 检测事件循环阻塞。

#### 2. 同步阻塞排查

- 检查是否有同步文件读写、大数据量 JSON 序列化、复杂正则表达式。
- 同步阻塞会导致整个事件循环卡顿，影响所有请求。

```js
// ❌ 同步阻塞示例
const data = fs.readFileSync('./large-file.json');
const parsed = JSON.parse(data); // 大 JSON 解析会阻塞
```

#### 3. 数据库/外部 API 优化

- 检查慢查询，添加索引。
- 使用连接池，避免频繁创建连接。
- 对外部 API 设置超时，避免长时间等待。
- 使用 `Promise.all` 并行调用无依赖的接口。

#### 4. 缓存优化

- 对热点数据使用 Redis 缓存。
- 对接口响应做内存缓存（注意 TTL 和并发更新）。
- 使用 CDN 缓存静态资源。

#### 5. 网络优化

- 启用 gzip/brotli 压缩响应。
- 使用 HTTP/2 减少连接开销。
- 减少响应体积，只返回必要字段。

#### 6. 代码层面优化

- 避免重复计算，使用缓存结果。
- 减少不必要的中间件和日志输出。
- 使用 Stream 处理大文件，避免一次性读入内存。
- 使用 `cluster` 模块或 PM2 多进程利用多核 CPU。

```js
// 使用 cluster 利用多核
const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  require('./app.js');
}
```

#### 7. 架构层面优化

- 将 CPU 密集型任务拆分到 Worker Threads 或外部服务。
- 使用边缘计算（Edge Function）减少中心服务器压力。
- 对读写分离，读多写少场景使用缓存优先。

#### 8. 监控与压测

- 使用 Artillery、k6 进行压力测试，找到瓶颈。
- 建立性能基线，持续监控响应时间分位数（P50/P95/P99）。

---

### 题目 11：前后端共享类型的实践

**考察点**：类型安全与工程效率。

**题目**：
如何在一个 Monorepo 中实现前后端共享 TypeScript 类型？请说明目录结构和实现方式。

**参考答案**：

#### 1. 目录结构

```
packages/
├── shared/                 # 共享类型和校验 Schema
│   ├── src/
│   │   ├── types/
│   │   │   ├── api.ts      # API 请求/响应类型
│   │   │   ├── models.ts   # 业务模型类型
│   │   │   └── index.ts
│   │   ├── schemas/
│   │   │   ├── user.ts     # Zod Schema
│   │   │   └── order.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── web/                    # 前端项目
│   ├── src/
│   └── package.json
└── server/                 # 后端项目
    ├── src/
    └── package.json
```

#### 2. shared 包配置

```json
// packages/shared/package.json
{
  "name": "@myapp/shared",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

```ts
// packages/shared/src/types/api.ts
export interface GetUserResponse {
  id: string;
  nickname: string;
  avatar: string;
}

export interface CreateOrderRequest {
  productId: string;
  quantity: number;
}

export interface CreateOrderResponse {
  orderId: string;
  totalAmount: number;
}
```

```ts
// packages/shared/src/schemas/user.ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  nickname: z.string().min(1).max(50),
  avatar: z.string().url(),
});

export type User = z.infer<typeof userSchema>;
```

#### 3. 前端使用

```json
// packages/web/package.json
{
  "dependencies": {
    "@myapp/shared": "workspace:*"
  }
}
```

```ts
// packages/web/src/api/user.ts
import type { GetUserResponse } from '@myapp/shared';

export async function getUser(id: string): Promise<GetUserResponse> {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
```

#### 4. 后端使用

```json
// packages/server/package.json
{
  "dependencies": {
    "@myapp/shared": "workspace:*"
  }
}
```

```ts
// packages/server/src/routes/user.ts
import { userSchema, type User } from '@myapp/shared';
import express from 'express';

const app = express();

app.get('/api/users/:id', (req, res) => {
  const user: User = {
    id: req.params.id,
    nickname: '张三',
    avatar: 'https://example.com/avatar.jpg',
  };

  // 运行时校验
  const result = userSchema.safeParse(user);
  if (!result.success) {
    return res.status(500).json({ error: '数据格式错误' });
  }

  res.json(result.data);
});
```

#### 5. 关键实践

- **Zod 同时提供类型和运行时校验**：前端用类型，后端用 Schema 校验。
- **构建顺序**：Monorepo 中确保 `shared` 先构建。
- **避免循环依赖**：shared 包只包含类型和纯函数，不依赖 web/server。
- **版本管理**：使用 Changesets 管理 shared 包版本升级。

---


### 题目 12：设计一个高可用 BFF 架构（大促场景）

**考察点**：高可用 BFF 架构设计、缓存、限流、降级、异步化。

**题目**：
某电商平台大促期间，详情页 BFF 需要承载 10 倍日常流量，峰值 QPS 5 万。请设计一个高可用 BFF 架构，要求：

1. 接口响应时间 P99 < 200ms。
2. 下游服务故障时，核心数据不丢、非核心数据可降级。
3. 写操作（如下单、领券）不丢失，库存扣减最终一致。
4. 具备完整的可观测性。

**参考答案**：

#### 1. 整体架构

```
用户请求 → CDN / WAF / DNS → API Gateway / Nginx
                ↓
        ┌─────────────────┐
        │   BFF 服务集群    │  K8s HPA 自动扩缩容
        │  Node.js/NestJS  │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    ▼            ▼            ▼
 Redis 缓存   限流/熔断中心   消息队列（Kafka/RabbitMQ）
    │            │            │
    ▼            ▼            ▼
 下游微服务   配置/注册中心   异步任务处理
```

#### 2. 分层策略

| 层级 | 职责 | 具体措施 |
|------|------|---------|
| 接入层 | 流量清洗、全局负载均衡 | CDN + WAF + 云 LB |
| 网关层 | 路由、鉴权、入口限流 | Kong/Nginx + Redis 限流 |
| BFF 层 | 接口聚合、数据适配、降级 | NestJS + 熔断器 + 缓存 |
| 服务层 | 业务逻辑 | 下游微服务 |
| 数据层 | 持久化 | 主从数据库 + 读写分离 |
| 消息层 | 异步削峰 | Kafka 订单流、BullMQ 任务 |

#### 3. 缓存策略

- **浏览器/CDN 缓存**：静态资源、商品基础信息。
- **BFF 本地缓存**：商品类目、配置项，TTL 30 秒。
- **Redis 分布式缓存**：热点商品详情、用户信息，命中率目标 90%。
- **缓存更新**：商品变更通过 Kafka 广播，BFF 本地缓存失效。

```typescript
// 伪代码：缓存优先 + 降级
async function getProductDetail(id: string) {
  const cacheKey = `product:${id}`;
  let data = await redis.get(cacheKey);
  if (data) return JSON.parse(data);

  try {
    data = await productService.get(id);
    await redis.setex(cacheKey, 60, JSON.stringify(data));
    return data;
  } catch (err) {
    // 下游故障时返回过期缓存或兜底数据
    const stale = await redis.get(`product:${id}:stale`);
    if (stale) return JSON.parse(stale);
    throw new AppError(503, 'SERVICE_UNAVAILABLE', '商品服务暂不可用');
  }
}
```

#### 4. 限流与熔断

- **入口限流**：API Gateway 按 IP、用户 ID 限流，防止刷单。
- **接口限流**：核心接口（下单、领券）使用 Token Bucket，限制每秒请求数。
- **下游熔断**：使用 Resilience4j/opossum，失败率超过 50% 自动熔断，10 秒后半开试探。

```typescript
// 基于 Redis 的分布式限流（概念）
const limiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'bff_limit',
  points: 100, // 每分钟 100 次
  duration: 60,
});
```

#### 5. 异步化与最终一致

- **下单流程**：BFF 校验后写入 Kafka，返回“处理中”状态；订单服务消费后异步处理。
- **库存扣减**：使用 Redis 预扣 + Kafka 异步同步到数据库，失败可回滚。
- **非关键数据**：埋点、日志、推荐点击通过 BullMQ 异步发送，不阻塞主链路。

#### 6. 可观测性

- **指标**：Prometheus + Grafana 监控 QPS、P99、错误率、CPU、内存。
- **链路追踪**：OpenTelemetry + Jaeger，traceId 全链路透传。
- **日志**：结构化 JSON 日志，ELK/Loki 集中收集。
- **告警**：P99 > 200ms、错误率 > 0.5%、CPU > 80% 触发告警。

---

### 题目 13：tRPC 与 gRPC 在 BFF 中如何选型？

**考察点**：现代接口模式理解、选型能力。

**题目**：
请对比 tRPC 和 gRPC，说明它们各自适用的场景。如果你要为一个全 TypeScript 栈的 SaaS 项目设计 BFF，会如何选择？如果后端是多语言微服务（Java、Go、Python），又该如何选择？

**参考答案**：

#### 1. tRPC 特点

- **端到端类型安全**：前后端共享 TypeScript 类型，无需手写 Swagger。
- **开发体验好**：与 React Query、Next.js 集成顺畅。
- **仅 TypeScript 生态**：服务端和客户端都必须是 TS。
- **适合 BFF → 前端**：BFF 层暴露 tRPC，前端直接调用。

```typescript
// 服务端定义
const appRouter = router({
  user: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => db.user.findById(input.id)),
});

// 前端调用，自动有类型
const { data } = trpc.user.useQuery({ id: '123' });
```

#### 2. gRPC 特点

- **高性能**：基于 HTTP/2 + Protocol Buffers，二进制序列化。
- **多语言支持**：Java、Go、Python、Node.js 都有成熟客户端。
- **适合微服务间通信**：BFF 调用后端 gRPC 服务。
- **浏览器不友好**：前端需通过 gRPC-Web 或 BFF 代理。

```protobuf
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
}
message GetUserRequest { string id = 1; }
message User { string id = 1; string name = 2; }
```

#### 3. 选型建议

| 场景 | 推荐 |
|------|------|
| 全 TypeScript 栈，BFF → 前端 | tRPC |
| 多语言后端，BFF → 微服务 | gRPC |
| 需要强类型 + 高性能内部通信 | gRPC |
| 快速迭代、小团队 | tRPC |
| 大型企业、多团队协作 | gRPC + GraphQL Federation |

#### 4. 混合方案

实际项目中 often 采用混合方案：

- BFF 与前端之间用 tRPC 或 REST/GraphQL。
- BFF 与后端微服务之间用 gRPC 或 HTTP。
- 通过 API Gateway 统一接入，内部按团队技术栈选择。

---

### 题目 14：设计一个 BFF 的可观测性方案

**考察点**：可观测性、OpenTelemetry、Prometheus、Jaeger、APM。

**题目**：
请为一套 Node.js BFF 服务设计完整的可观测性方案，要求覆盖日志、指标、链路追踪，并能在生产环境快速定位慢请求和错误根因。

**参考答案**：

#### 1. 可观测性三大支柱

| 支柱 | 工具 | 用途 |
|------|------|------|
| 日志 | Pino/Winston + ELK/Loki | 记录请求上下文、错误详情 |
| 指标 | Prometheus + Grafana | QPS、延迟、错误率、资源使用 |
| 链路追踪 | OpenTelemetry + Jaeger | 请求全链路耗时分析 |

#### 2. Trace ID 透传

在 BFF 入口生成 traceId，通过 HTTP Header 透传到下游服务。

```typescript
import { AsyncLocalStorage } from 'async_hooks';
const context = new AsyncLocalStorage();

app.use((req, res, next) => {
  const traceId = req.headers['x-trace-id'] || uuid();
  context.run({ traceId, userId: req.userId }, next);
});

function log(level: string, message: string, meta?: object) {
  const ctx = context.getStore() || {};
  console.log(JSON.stringify({ ...ctx, level, message, ...meta, time: new Date().toISOString() }));
}
```

#### 3. OpenTelemetry 接入

```typescript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  serviceName: 'bff-service',
  traceExporter: new OTLPTraceExporter({ url: 'http://otel-collector:4318/v1/traces' }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

#### 4. Prometheus 指标

```typescript
import client from 'prom-client';
const register = new client.Registry();

const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP 请求耗时',
  labelNames: ['route', 'method', 'status'],
});
register.registerMetric(httpDuration);

app.use((req, res, next) => {
  const end = httpDuration.startTimer();
  res.on('finish', () => {
    end({ route: req.route?.path || req.path, method: req.method, status: res.statusCode });
  });
  next();
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});
```

#### 5. 关键 SLO 与告警

| 指标 | 目标 | 告警阈值 |
|------|------|---------|
| P99 延迟 | < 200ms | > 300ms |
| 错误率 | < 0.1% | > 0.5% |
| QPS | 按业务设定 | 突增 300% |
| CPU | < 70% | > 80% |
| 内存 | < 80% | > 90% |

#### 6. 故障排查流程

1. **收到告警**：Grafana 发现 P99 升高。
2. **查看链路**：Jaeger 找到慢请求的 span，定位到某个下游服务。
3. **查看日志**：通过 traceId 检索相关日志，发现下游超时。
4. **查看指标**：确认下游服务错误率上升。
5. **采取措施**：熔断、扩容、联系下游团队。

---

> **领域编号**：E10 Node.js / BFF 服务端  
> **最后更新**：2026-06-24
