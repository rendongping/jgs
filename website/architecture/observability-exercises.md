# A06 可观测性与稳定性工程 — 练习册

> 目标：通过练习巩固可观测性三大支柱、前端监控、稳定性设计、告警响应等核心能力。

---

## 难度分级

- 🟢 **基础**：理解可观测性概念和监控指标。
- 🟡 **进阶**：能设计监控体系和告警规则。
- 🔴 **深入**：能设计稳定性架构和故障响应流程。

---

## 基础题

### 题目 1：可观测性三大支柱

**考察点**：可观测性基础概念。

**题目**：
请说出可观测性的三大支柱，并解释它们各自解决什么问题。

::: details 查看答案与解析
**参考答案**：

可观测性（Observability）三大支柱是：**日志（Logs）、指标（Metrics）、链路追踪（Traces）**。

```
┌─────────────────────────────────────────┐
│           可观测性三大支柱               │
├───────────┬───────────┬─────────────────┤
│   Logs    │  Metrics  │     Traces      │
├───────────┼───────────┼─────────────────┤
│ 发生了什么 │ 有没有问题 │ 问题在哪里       │
│  事件明细  │  量化趋势  │  请求链路        │
└───────────┴───────────┴─────────────────┘
```

#### 1. 日志（Logs）

**定义**：系统运行过程中产生的时间序列文本记录。

**解决的问题**：

- 回答“**发生了什么**”。
- 记录详细的上下文信息，如用户操作、错误堆栈、请求参数。

**示例**：

```json
{
  "timestamp": "2026-06-18T08:52:54.548Z",
  "level": "ERROR",
  "message": "用户登录失败",
  "userId": "12345",
  "error": "Invalid credentials",
  "requestId": "req-abc-123",
  "url": "/api/login"
}
```

**最佳实践**：

- 结构化日志（JSON 格式），便于检索和分析。
- 统一日志级别（DEBUG、INFO、WARN、ERROR、FATAL）。
- 包含 requestId、userId、traceId 等上下文。

#### 2. 指标（Metrics）

**定义**：对系统状态的量化度量，通常是时间序列数据。

**解决的问题**：

- 回答“**有没有问题**”。
- 通过数值变化发现系统异常，如错误率上升、响应时间变长。

**示例**：

```
http_requests_total{status="500"} 15
http_request_duration_seconds{quantile="0.99"} 0.85
page_load_time_seconds 1.2
```

**常见指标类型**：

- **Counter**：只增不减的计数器，如请求总数、错误总数。
- **Gauge**：可增可减的瞬时值，如 CPU 使用率、内存占用。
- **Histogram**：采样分布，如请求延迟分布。
- **Summary**：类似 Histogram，但计算分位数。

#### 3. 链路追踪（Traces）

**定义**：记录一个请求在分布式系统中经过的所有服务和组件的完整路径。

**解决的问题**：

- 回答“**问题在哪里**”。
- 定位跨服务调用的性能瓶颈和故障点。

**示例**：

```
[Trace: trace-xyz-789]
  ├── [Span] 前端页面加载 (200ms)
  ├── [Span] BFF /api/products (80ms)
  │     ├── [Span] 商品服务查询 (30ms)
  │     └── [Span] 库存服务查询 (40ms)
  └── [Span] 推荐服务 (120ms)
```

**核心概念**：

- **Trace**：一次完整请求的链路。
- **Span**：链路中的一个操作单元。
- **Trace ID**：唯一标识一次请求。
- **Parent Span ID**：标识 Span 之间的父子关系。

#### 4. 三者关系

```
Metrics 发现问题
    │
    ▼
Traces 定位问题
    │
    ▼
Logs 解释问题
```

- **Metrics** 用于监控大盘，发现异常趋势。
- **Traces** 用于追踪单个请求的完整路径。
- **Logs** 用于查看详细的上下文和错误信息。
:::

---

### 题目 2：Core Web Vitals

**考察点**：前端性能指标。

**题目**：
请解释 LCP、INP/FID、CLS 三个 Core Web Vitals 指标的含义和目标值。

::: details 查看答案与解析
**参考答案**：

#### 1. LCP（Largest Contentful Paint）

**含义**：最大内容渲染时间，衡量视口中最大可见元素渲染完成的时间。

**常见元素**：

- 大型图片（`<img>`、背景图）。
- 视频封面。
- 大型块级文本元素。

**目标值**：

| 评级 | 时间 |
|------|------|
| Good | ≤ 2.5s |
| Needs Improvement | 2.5s ~ 4.0s |
| Poor | > 4.0s |

**优化方向**：

- 优化服务器响应时间（TTFB）。
- 使用 CDN 加速静态资源。
- 图片使用 WebP/AVIF，设置正确的 `width`/`height`。
- 预加载关键资源。
- 内联关键 CSS。

#### 2. INP（Interaction to Next Paint）

**含义**：交互到下一次绘制的时间，衡量页面对用户交互的响应速度。

> 注：INP 已于 2024 年 3 月正式取代 FID（First Input Delay）成为 Core Web Vital。

**测量内容**：

- 用户点击、触摸、键盘交互后，到页面下一次视觉反馈的时间。
- 取整个会话中最差的几次交互（忽略异常值）。

**目标值**：

| 评级 | 时间 |
|------|------|
| Good | ≤ 200ms |
| Needs Improvement | 200ms ~ 500ms |
| Poor | > 500ms |

**优化方向**：

- 减少主线程长任务（Long Tasks）。
- 使用 `requestIdleCallback` 执行非关键任务。
- 事件处理函数中避免同步执行重计算。
- 使用 Web Worker 处理复杂计算。
- 延迟加载非关键第三方脚本。

#### 3. CLS（Cumulative Layout Shift）

**含义**：累积布局偏移，衡量页面生命周期中发生的意外布局偏移的总和。

**常见原因**：

- 图片/视频没有指定尺寸。
- 字体加载导致文字闪烁（FOUT/FOIT）。
- 广告或 iframe 动态插入。
- 异步加载内容推挤已有内容。

**目标值**：

| 评级 | 分数 |
|------|------|
| Good | ≤ 0.1 |
| Needs Improvement | 0.1 ~ 0.25 |
| Poor | > 0.25 |

**优化方向**：

- 为图片、视频、iframe 设置 `width` 和 `height`。
- 为广告位预留固定空间。
- 使用 `font-display: optional` 或预加载字体。
- 避免在已有内容上方插入动态内容。
:::

---

### 题目 3：前端错误监控要收集哪些错误？

**考察点**：错误监控范围。

**题目**：
前端错误监控通常要覆盖哪些类型的错误？请至少列举 5 种。

::: details 查看答案与解析
**参考答案**：

前端错误监控应覆盖以下类型：

#### 1. JavaScript 运行时错误

通过 `window.addEventListener('error', ...)` 捕获。

```js
window.addEventListener('error', (event) => {
  reportError({
    type: 'js-error',
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack,
  });
});
```

#### 2. Promise 未捕获错误

通过 `unhandledrejection` 事件捕获。

```js
window.addEventListener('unhandledrejection', (event) => {
  reportError({
    type: 'unhandledrejection',
    reason: event.reason?.message || event.reason,
  });
});
```

#### 3. 资源加载错误

图片、CSS、JS 文件加载失败。

```js
window.addEventListener('error', (event) => {
  if (event.target && (event.target as HTMLElement).tagName) {
    reportError({
      type: 'resource-error',
      tagName: (event.target as HTMLElement).tagName,
      src: (event.target as HTMLImageElement).src,
    });
  }
}, true); // 捕获阶段监听
```

#### 4. 接口请求错误

通过封装 `fetch`/`XMLHttpRequest` 拦截。

```js
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    if (!response.ok) {
      reportError({
        type: 'api-error',
        url: args[0],
        status: response.status,
      });
    }
    return response;
  } catch (err) {
    reportError({ type: 'api-error', url: args[0], error: err.message });
    throw err;
  }
};
```

#### 5. 白屏错误

检测页面渲染后关键 DOM 是否为空。

```js
window.addEventListener('load', () => {
  const root = document.getElementById('root');
  if (!root || root.children.length === 0) {
    reportError({ type: 'white-screen', url: location.href });
  }
});
```

#### 6. 框架错误边界捕获的错误

React/Vue 等框架的错误边界。

```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    reportError({
      type: 'react-error-boundary',
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }
}
```

#### 7. 性能异常

如 LCP > 4s、INP > 500ms、大量 Long Tasks。

#### 8. 业务逻辑错误

如用户操作流程中的异常状态、支付失败等。
:::

---

### 题目 4：什么是 SLO 和 Error Budget？

**考察点**：稳定性量化指标。

**题目**：
请解释 SLO、SLI、SLA、Error Budget 的含义，并举例说明。

::: details 查看答案与解析
**参考答案**：

#### 1. SLI（Service Level Indicator）

**定义**：服务等级指标，用于量化服务健康度的具体指标。

**示例**：

- 页面加载成功率 = 成功加载次数 / 总加载次数
- API 响应时间 P99
- 支付成功率
- 系统可用性百分比

#### 2. SLO（Service Level Objective）

**定义**：服务等级目标，是 SLI 要达到的目标值。

**示例**：

- 首页加载成功率 ≥ 99.9%
- API P99 响应时间 ≤ 500ms
- 支付成功率 ≥ 99.95%
- 月度可用性 ≥ 99.99%

#### 3. SLA（Service Level Agreement）

**定义**：服务等级协议，是对用户的正式承诺，通常包含未达标时的赔偿条款。

**示例**：

- 云服务商承诺月度可用性 99.99%，未达标按协议赔偿。

#### 4. Error Budget（错误预算）

**定义**：允许的不达标额度，是 SLO 中允许的失败次数比例。

**计算方式**：

```
Error Budget = 1 - SLO
```

**示例**：

- SLO = 99.9%，则 Error Budget = 0.1%。
- 一个月内如果有 100 万次请求，允许 1000 次失败。

#### 5. 四者关系

```
SLI（指标） ──▶ SLO（目标） ──▶ SLA（对外承诺）
                   │
                   ▼
              Error Budget（允许的失败额度）
```

#### 6. 实际应用

**场景**：某电商首页 SLO 为月度可用性 99.9%。

- **SLI**：首页 HTTP 200 状态码比例。
- **SLO**：月度可用性 ≥ 99.9%。
- **Error Budget**：月度允许 0.1% 的请求失败。
- **SLA**：对商家承诺首页可用性 99.9%，未达标按合同约定赔偿。

**用途**：

- 当 Error Budget 充足时，可以承担更多发布风险。
- 当 Error Budget 即将耗尽时，应暂停非必要发布，优先保障稳定性。
:::

---

## 进阶题

### 题目 5：设计一个前端错误监控系统

**考察点**：错误监控实战设计。

**题目**：
请设计一个前端错误监控系统，包括：错误采集、上报、存储、展示和告警。

::: details 查看答案与解析
**参考答案**：

#### 系统架构

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   前端应用   │───▶│  错误采集 SDK │───▶│  上报网关    │───▶│  数据存储    │
└─────────────┘    └─────────────┘    └─────────────┘    └──────┬──────┘
                                                                  │
                                                                  ▼
                                                         ┌─────────────┐
                                                         │  展示与告警  │
                                                         └─────────────┘
```

#### 1. 错误采集

SDK 负责监听各类错误：

```js
class ErrorMonitor {
  constructor(config) {
    this.config = config;
    this.init();
  }

  init() {
    this.captureJsError();
    this.capturePromiseError();
    this.captureResourceError();
    this.captureApiError();
    this.captureWhiteScreen();
  }

  captureJsError() {
    window.addEventListener('error', (event) => {
      this.report({
        type: 'js-error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });
  }

  capturePromiseError() {
    window.addEventListener('unhandledrejection', (event) => {
      this.report({
        type: 'unhandledrejection',
        reason: event.reason?.message || String(event.reason),
      });
    });
  }

  // ... 其他捕获逻辑
}
```

#### 2. 错误上报

- **异步批量上报**：收集多个错误后一次性发送，减少网络请求。
- **失败重试**：上报失败时本地队列保存，稍后重试。
- **采样率**：高流量应用设置采样率，避免上报过多。
- **信息脱敏**：不上报用户敏感信息。

```js
class ErrorReporter {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.queue = [];
  }

  send(error) {
    this.queue.push(error);
    if (this.queue.length >= 10) {
      this.flush();
    }
  }

  flush() {
    if (this.queue.length === 0) return;
    const payload = this.queue.splice(0);
    fetch(this.endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // 失败时重新入队
      this.queue.unshift(...payload);
    });
  }
}
```

#### 3. 错误信息字段

每条错误应包含：

```json
{
  "type": "js-error",
  "message": "Cannot read property 'name' of undefined",
  "stack": "TypeError: ...",
  "filename": "https://app.example.com/main.js",
  "lineno": 42,
  "colno": 15,
  "userAgent": "Mozilla/5.0 ...",
  "url": "https://app.example.com/dashboard",
  "userId": "12345",
  "sessionId": "sess-abc",
  "traceId": "trace-xyz",
  "appVersion": "1.2.3",
  "timestamp": "2026-06-18T08:52:54.548Z"
}
```

#### 4. 数据存储

- **短期存储**：Elasticsearch、ClickHouse，支持快速检索和聚合。
- **长期存储**：对象存储（S3/OSS），用于归档和审计。
- **Source Map**：单独存储 source map，用于错误还原。

#### 5. 展示

- **错误列表**：按时间、类型、页面、版本筛选。
- **错误聚合**：相同错误聚合展示，按发生次数排序。
- **错误趋势图**：按时间维度展示错误率变化。
- **用户影响**：统计受影响用户数。
- **Source Map 还原**：将压缩后的堆栈还原为原始代码位置。

#### 6. 告警

- **阈值告警**：错误率超过 1% 或错误数突增时告警。
- **P0 错误告警**：核心流程（登录、支付）错误立即告警。
- **告警渠道**：短信、电话、钉钉、企业微信、PagerDuty。
- **告警分级**：P0/P1/P2/P3，避免告警风暴。
:::

---

### 题目 6：设计性能监控方案

**考察点**：性能监控实现。

**题目**：
如何收集一个页面的 LCP、INP、CLS？请用代码或伪代码说明。

::: details 查看答案与解析
**参考答案**：

#### 使用 web-vitals 库

```js
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // 上报到监控系统
  fetch('/api/metrics', {
    method: 'POST',
    body: JSON.stringify({
      name: metric.name,           // 'LCP' / 'INP' / 'CLS'
      value: metric.value,         // 数值
      rating: metric.rating,       // 'good' / 'needs-improvement' / 'poor'
      delta: metric.delta,         // 较上次变化值
      id: metric.id,               // 唯一标识
      navigationType: metric.navigationType,
      page: location.pathname,
      timestamp: Date.now(),
    }),
    keepalive: true,
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

#### 上报数据示例

```json
{
  "name": "LCP",
  "value": 2100,
  "rating": "good",
  "page": "/products",
  "device": "mobile",
  "network": "4g",
  "timestamp": "2026-06-18T08:52:54.548Z"
}
```

#### 不使用 web-vitals 的原生实现

```js
// LCP
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.startTime);
}).observe({ entryTypes: ['largest-contentful-paint'] });

// CLS
let clsValue = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  console.log('CLS:', clsValue);
}).observe({ entryTypes: ['layout-shift'] });

// INP（较复杂，推荐使用 web-vitals）
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.interactionId) {
      console.log('Interaction duration:', entry.duration);
    }
  }
}).observe({ entryTypes: ['event'], buffered: true, durationThreshold: 0 });
```

#### 监控体系设计

1. **采集层**：web-vitals + PerformanceObserver。
2. **上报层**：批量异步上报，支持采样。
3. **存储层**：时序数据库（如 InfluxDB、Prometheus）。
4. **展示层**：按页面、设备、网络、地域维度展示。
5. **告警层**：P75/P95 超过阈值时告警。
:::

---

### 题目 7：设计业务埋点规范

**考察点**：业务埋点设计。

**题目**：
一个电商 APP 需要追踪“商品详情页到支付成功”的转化漏斗。请设计需要埋点的事件和字段。

::: details 查看答案与解析
**参考答案**：

#### 转化漏斗事件设计

| 步骤 | 事件名 | 触发时机 | 关键字段 |
|------|--------|----------|----------|
| 浏览商品 | `product_view` | 进入商品详情页 | `product_id`, `category_id`, `source`, `price` |
| 加入购物车 | `add_to_cart` | 点击加入购物车 | `product_id`, `quantity`, `price`, `sku_id` |
| 进入结算 | `checkout_start` | 点击去结算 | `cart_id`, `product_ids`, `total_amount` |
| 提交订单 | `order_submit` | 点击提交订单 | `order_id`, `product_ids`, `total_amount` |
| 支付成功 | `payment_success` | 支付完成回调 | `order_id`, `amount`, `payment_method` |
| 支付失败 | `payment_fail` | 支付失败回调 | `order_id`, `error_code`, `error_msg` |

#### 公共字段

每个事件都应包含：

```json
{
  "event_id": "evt-unique-id",
  "event_name": "product_view",
  "user_id": "12345",
  "device_id": "dev-abc",
  "session_id": "sess-xyz",
  "page_url": "https://app.example.com/product/123",
  "referrer": "https://app.example.com/home",
  "timestamp": "2026-06-18T08:52:54.548Z",
  "app_version": "2.1.0",
  "platform": "iOS",
  "os_version": "17.0",
  "screen_width": 390,
  "screen_height": 844
}
```

#### 埋点代码示例

```ts
interface BaseEvent {
  event_name: string;
  user_id: string;
  session_id: string;
  timestamp: number;
  page_url: string;
}

function track(eventName: string, params: Record<string, any>) {
  const event: BaseEvent = {
    event_name: eventName,
    user_id: getUserId(),
    session_id: getSessionId(),
    timestamp: Date.now(),
    page_url: location.href,
    ...params,
  };

  navigator.sendBeacon('/api/track', JSON.stringify(event));
}

// 使用
track('add_to_cart', {
  product_id: 'P123',
  quantity: 2,
  price: 199,
});
```

#### 转化漏斗分析

```sql
-- 计算各步骤转化率
SELECT
  event_name,
  COUNT(DISTINCT user_id) as uv
FROM events
WHERE event_name IN ('product_view', 'add_to_cart', 'checkout_start', 'order_submit', 'payment_success')
  AND timestamp >= '2026-06-01'
GROUP BY event_name
ORDER BY FIELD(event_name, 'product_view', 'add_to_cart', 'checkout_start', 'order_submit', 'payment_success');
```
:::

---

### 题目 8：告警分级设计

**考察点**：告警设计。

**题目**：
为一个电商首页设计至少 3 个级别的告警规则。

::: details 查看答案与解析
**参考答案**：

#### 告警分级表

| 级别 | 名称 | 触发条件 | 响应要求 | 通知方式 |
|------|------|----------|----------|----------|
| **P0** | 紧急 | 首页白屏率 > 1% 或支付成功率 < 95% 或核心接口错误率 > 5% | 立即处理，启动回滚 | 电话 + 短信 + IM |
| **P1** | 严重 | 首页 LCP > 5s 持续 5 分钟 或首页错误率 > 1% 持续 10 分钟 | 30 分钟内处理 | 短信 + IM |
| **P2** | 一般 | 某推荐位曝光量下降 50% 或 CLS > 0.25 持续 30 分钟 | 2 小时内排查 | IM |
| **P3** | 提示 | CLS 轻微退化 或某非核心指标异常 | 纳入下次迭代 | 邮件/看板 |

#### P0 告警示例

```yaml
alert: HomepageWhiteScreenRateHigh
expr: |
  (
    sum(rate(white_screen_total[5m])) /
    sum(rate(page_view_total[5m]))
  ) > 0.01
for: 2m
labels:
  severity: p0
annotations:
  summary: "首页白屏率超过 1%"
  description: "当前白屏率 &#123;&#123; $value | humanizePercentage &#125;&#125;，请立即排查"
```

#### 告警设计原则

1. **分级明确**：不同级别对应不同响应时间和通知方式。
2. **避免告警风暴**：合并同类告警，设置静默期。
3. **可执行**：每条告警都应指向明确的排查 SOP。
4. **持续优化**：定期回顾告警有效性，减少误报。
:::

---

## 深入题

### 题目 9：设计稳定性保障方案

**考察点**：稳定性架构设计。

**题目**：
一个依赖 5 个下游微服务的前端 BFF，如何设计稳定性保障，防止下游故障拖垮整个系统？

::: details 查看答案与解析
**参考答案**：

#### 稳定性保障体系

```
┌─────────────────────────────────────────┐
│           稳定性保障体系                 │
├─────────┬─────────┬─────────┬───────────┤
│  超时    │  重试    │  熔断    │   降级     │
├─────────┼─────────┼─────────┼───────────┤
│  限流    │  隔离    │  兜底    │   监控     │
└─────────┴─────────┴─────────┴───────────┘
```

#### 1. 超时（Timeout）

为每个下游调用设置合理超时：

```ts
const userPromise = fetchUser(userId, { timeout: 2000 });
const orderPromise = fetchOrders(userId, { timeout: 3000 });
```

避免长时间等待导致请求堆积。

#### 2. 重试（Retry）

对失败请求按指数退避重试：

```ts
async function fetchWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === maxRetries) throw err;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

注意：重试必须保证接口幂等性。

#### 3. 熔断（Circuit Breaker）

```ts
class CircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private nextAttempt = Date.now();

  constructor(
    private failureThreshold = 5,
    private timeout = 60000
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  private onFailure() {
    this.failureCount += 1;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}
```

#### 4. 降级（Degradation）

下游服务异常时返回兜底数据：

```ts
const [user, orders, products, coupons, notifications] = await Promise.all([
  fetchUser(userId),
  fetchOrders(userId).catch(() => []),
  fetchProducts().catch(() => []),
  fetchCoupons(userId).catch(() => []),
  fetchNotifications(userId).catch(() => []),
]);
```

#### 5. 限流（Rate Limit）

- 入口限流：限制单个用户/IP 的请求频率。
- 下游限流：限制对下游服务的调用速率，保护下游。

#### 6. 隔离（Isolation）

- 线程池/连接池隔离：核心链路和非核心链路使用不同资源池。
- 舱壁模式（Bulkhead）：一个下游故障不影响其他下游。

#### 7. 兜底（Fallback）

- 静态页面兜底。
- 缓存数据兜底。
- 默认值兜底。

#### 8. 监控

- 实时统计每个下游的成功率、延迟、错误率。
- 熔断状态可视化。
- 异常时自动触发告警。
:::

---

### 题目 10：灰度发布与回滚方案

**考察点**：发布稳定性。

**题目**：
请设计一个前端灰度发布方案，包括：灰度策略、监控指标、回滚条件和回滚流程。

::: details 查看答案与解析
**参考答案**：

#### 1. 灰度策略

| 阶段 | 流量比例 | 用户范围 | 持续时间 |
|------|----------|----------|----------|
| 内测 | 1% | 内部员工 + 白名单用户 | 1 天 |
| 小流量 | 5% | 按用户 ID 取模 | 1-2 天 |
| 中流量 | 20% | 按用户 ID 取模 | 2-3 天 |
| 大流量 | 50% | 按用户 ID 取模 | 2-3 天 |
| 全量 | 100% | 全部用户 | - |

#### 2. 灰度实现方式

**基于用户 ID 取模**

```js
function isInGrayRelease(userId, percent) {
  const hash = hashCode(userId);
  return hash % 100 < percent;
}
```

**基于配置中心**

```json
{
  "newFeatureEnabled": true,
  "grayPercentage": 20,
  "whiteList": ["user1", "user2"]
}
```

**基于 CDN/Edge Function**

- 在边缘节点根据 Cookie/Header 决定返回新旧版本资源。

#### 3. 监控指标

| 指标类型 | 具体指标 | 阈值 |
|----------|----------|------|
| 错误率 | JS 错误率、API 错误率 | 错误率 > 基线 2 倍 |
| 性能 | LCP、INP、CLS | LCP > 5s 或 INP > 500ms |
| 业务 | 转化率、支付成功率 | 下降 > 10% |
| 资源 | 404 率、加载失败率 | > 1% |

#### 4. 回滚条件

- P0/P1 告警触发。
- 错误率超过基线 2 倍。
- 核心转化率下降超过阈值。
- 用户投诉量突增。

#### 5. 回滚流程

```
1. 发现异常
      │
      ▼
2. 确认影响范围（版本、用户、页面）
      │
      ▼
3. 一键切流量到旧版本
      │
      ▼
4. 验证旧版本是否恢复正常
      │
      ▼
5. 保留新版本环境用于排查
      │
      ▼
6. 修复问题后重新灰度
```

#### 6. 工具支持

- 配置中心：动态调整流量比例。
- 发布平台：一键回滚。
- 监控看板：实时对比新旧版本指标。
- 告警系统：异常自动通知。
:::

---

### 题目 11：事故复盘

**考察点**：故障响应文化。

**题目**：
某次上线后，低版本浏览器出现大面积白屏。请用事故复盘模板输出一份复盘报告。

::: details 查看答案与解析
**参考答案**：

```markdown
# Incident Report: 低版本浏览器白屏事故
:::

## 基本信息

- **事故编号**：INC-2026-0618-001
- **发生时间**：2026-06-18 10:00
- **恢复时间**：2026-06-18 10:30
- **持续时间**：30 分钟
- **影响范围**：iOS 12、Android 8 及以下版本用户
- **影响用户**：约 5000 人
- **严重程度**：P0

## 现象

- 低版本浏览器访问首页出现白屏，控制台报错：
  `SyntaxError: Unexpected token '?'`
- 新版 Chrome/Safari 访问正常。

## 影响

- 首页无法访问，用户无法浏览商品和下单。
- 客服渠道收到约 200 起相关投诉。
- 预估 GMV 损失约 5 万元。

## 根因分析

1. **直接原因**：
   - 新版本中使用了 ES2020 的 Optional Chaining（`?.`）。
   - 构建时 browserslist 配置错误，未对低版本浏览器注入 polyfill。

2. **间接原因**：
   - 测试环境只覆盖了最新版 Chrome 和 Safari。
   - 缺乏低版本浏览器自动化测试。
   - 上线前未进行灰度发布。
   - 白屏率监控告警缺失。

## 止损措施

- 10:05 触发一键回滚，流量切回上一稳定版本。
- 10:30 确认所有用户访问恢复正常。

## 改进措施

| 序号 | 措施 | 负责人 | 完成时间 |
|------|------|--------|----------|
| 1 | CI 增加 browserslist 兼容性检查 | 张三 | 2026-06-25 |
| 2 | 引入低版本浏览器自动化测试（BrowserStack） | 李四 | 2026-07-02 |
| 3 | 上线前必须灰度发布，覆盖不同浏览器版本 | 王五 | 2026-06-28 |
| 4 | 增加白屏率监控和 P0 告警 | 赵六 | 2026-06-25 |
| 5 | 建立浏览器兼容性基线文档 | 张三 | 2026-06-30 |

## 经验教训

1. 兼容性问题是前端发布的高风险点，必须纳入 CI 门禁。
2. 测试覆盖度不能只看主流浏览器，要考虑用户实际分布。
3. 灰度发布是发现问题的最后一道防线，必须严格执行。
4. 监控告警要覆盖核心用户体验指标，不能只看业务指标。

## 附件

- 错误日志样本
- 浏览器分布数据
- 回滚操作记录
```

---

> **领域编号**：A06 可观测性与稳定性工程  
> **最后更新**：2026-06-18
