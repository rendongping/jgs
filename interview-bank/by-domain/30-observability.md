# 可观测性面试题

> 本题库共收录 **43** 道面试题（基础 12 / 进阶 12 / 深入 11 / 架构 8）。
> 本文件收录可观测性（Observability）相关面试题，目标题量 32 道。  
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、性能优化题、工程化题、软技能题、综合开放题。  
> 难度覆盖：基础、进阶、深入、架构。  
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-30-CO-B-001：可观测性的三大支柱是什么？它们之间有什么关系？

**题型**：概念题  
**难度**：🟢 基础  
**岗位层级**：初级 / 高级  
**面试知识域**：30 可观测性  
**标签**：observability、performance-optimization、sdk、core-web-vitals、error-monitoring  
**出现频率**：高频  
**预计回答时长**：3-5 分钟

**题目描述**：
请解释可观测性的三大支柱（Three Pillars of Observability），并说明它们之间如何协同工作。

**参考答案**：

可观测性的三大支柱是 **日志（Logs）、指标（Metrics）、链路（Traces）**。

| 支柱 | 关注点 | 典型数据 | 解决的问题 |
|------|--------|----------|------------|
| 日志 Logs | 离散事件 | 时间戳、级别、消息、上下文 | “发生了什么？” |
| 指标 Metrics | 聚合数值 | 计数、耗时、百分比、分位数 | “影响多大？趋势如何？” |
| 链路 Traces | 请求路径 | Trace ID、Span、依赖关系 | “问题出在哪一段？” |

三者关系：

1. **指标发现问题**：异常曲线（如错误率突增、P95 响应时间变长）告诉我们“可能出事了”。
2. **链路定位范围**：通过代表性 Trace 可以看到请求经过哪些服务/组件，哪一段耗时或报错。
3. **日志还原细节**：进入具体 Span 后，用日志查看当时的入参、返回值、异常栈、业务上下文。

关联方式：

- 在日志中注入 `trace_id` / `span_id`，实现从日志跳转到链路。
- 在指标标签（label）中统一 `env`、`version`、`page`、`app` 等维度，便于下钻。
- 保证时间戳对齐，三者使用同一 NTP 时间源。

最佳实践：

- 不要只采集一种数据；三种数据互为补充。
- 统一维度标签，方便在 Metrics → Trace → Log 之间切换。
- 在入口处生成 `trace_id`，并随请求上下文透传到日志和后续服务。

**评分维度**：
- 能说出三大支柱名称与核心差异（40%）
- 能说明 Logs / Metrics / Traces 的协同关系（30%）
- 能举例说明如何关联三种数据（30%）

**常见错误**：
- 把可观测性等同于“日志收集”。
- 认为三大支柱彼此独立，不需要关联。
- 忽略时间戳、版本号等统一维度。

**延伸追问**：
- 如果只能三选二，你会怎么选？为什么？
- 三大支柱之外，还有哪些可观测性数据（Profiling、RUM、事件）？

**相关题目**：
- [FB-30-CO-B-002 日志、指标、链路分别适合解决什么问题](#FB-30-CO-B-002)
- [FB-30-SD-P-017 设计一个前端全链路可观测平台](#FB-30-SD-P-017)

**参考资源**：
- [OpenTelemetry - What is Observability?](https://opentelemetry.io/docs/concepts/observability-primer/)
- [Google SRE Book - Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)

**口头回答版**：
> 可观测性的三大支柱是日志、指标和链路。指标用来发现“有没有问题、影响多大”，比如错误率、响应时间曲线；链路用来定位“问题出在哪一段”，看请求经过了哪些服务；日志用来还原“当时发生了什么”，看参数、异常栈、业务上下文。三者要关联起来，比如日志里带上 trace_id，指标标签统一环境和版本号，这样排查时才能从指标下钻到链路，再看到日志。

---

### FB-30-CO-B-002：日志、指标、链路分别适合解决什么问题？

**题型**：概念题  
**难度**：🟢 基础  
**岗位层级**：初级 / 高级  
**面试知识域**：30 可观测性  
**标签**：observability、performance、error-monitoring、sdk、core-web-vitals  
**出现频率**：高频  
**预计回答时长**：3-5 分钟

**题目描述**：
请分别说明日志、指标、链路在排查线上问题时的适用场景，并各举一个前端案例。

**参考答案**：

**日志 Logs**

- 适合记录离散事件、业务行为和异常详情。
- 典型内容：用户点击、接口请求参数、错误堆栈、状态机变迁。
- 前端案例：用户在结算页点击“提交订单”后，记录 `{ event: 'submit_order', orderId, amount, userId, result }`，用于核对客诉。

**指标 Metrics**

- 适合聚合统计、趋势分析和告警。
- 典型内容：PV/UV、JS 错误率、API 成功率、FCP/LCP 分位数。
- 前端案例：统计首页 `LCP > 2.5s` 的占比，按 `country` 和 `deviceType` 分组，发现某地区 4G 用户性能明显变差。

**链路 Traces**

- 适合追踪一次完整请求或用户操作的端到端路径和各段耗时。
- 典型内容：Trace ID、Span 名称、父级关系、开始/结束时间、属性。
- 前端案例：用户打开详情页，Trace 显示前端 `init` → `GET /api/detail`（120 ms）→ `CDN 资源加载`（800 ms），定位到图片缩略图阻塞渲染。

选择原则：

- 先通过**指标**发现异常；
- 再通过**链路**缩小范围；
- 最后通过**日志**确认根因。

**评分维度**：
- 能区分三类数据的适用场景（50%）
- 能给出前端具体案例（30%）
- 能说出排障时的一般顺序（20%）

**常见错误**：
- 用日志做聚合告警，导致存储和查询成本过高。
- 用指标记录细粒度业务事件，导致基数爆炸。
- 链路采样率过低，导致抓不到异常样本。

**延伸追问**：
- 如果某个 Bug 只在单个用户身上出现，你优先用哪种数据排查？
- 指标和日志在存储模型上有什么区别？

**相关题目**：
- [FB-30-CO-B-001 可观测性的三大支柱](#FB-30-CO-B-001)
- [FB-30-SC-A-009 页面白屏如何定位](#FB-30-SC-A-009)

**参考资源**：
- [OpenTelemetry - Logs vs Metrics vs Traces](https://opentelemetry.io/docs/concepts/signals/)

**口头回答版**：
> 日志适合记录离散事件，比如用户点了什么、接口返回什么、错误堆栈是什么；指标适合做聚合和告警，比如错误率、LCP 占比；链路适合看一次完整请求经过哪些环节、每段花多久。排查时通常是先看指标发现异常，再用链路定位范围，最后用日志确认根因。比如首页加载慢，先看 LCP 指标，再用链路发现 CDN 图片慢，最后日志里确认具体图片 URL。

---

### FB-30-CO-B-003：前端常见的错误类型有哪些？分别如何捕获？

**题型**：概念题  
**难度**：🟢 基础  
**岗位层级**：初级 / 高级  
**面试知识域**：30 可观测性  
**标签**：observability、error-monitoring、error-handling、exception-handling、promise  
**出现频率**：高频  
**预计回答时长**：3-5 分钟

**题目描述**：
请列举前端常见的错误类型，并说明各自的捕获方式与上报字段。

**参考答案**：

前端常见错误类型：

| 错误类型 | 示例 | 捕获方式 | 关键字段 |
|----------|------|----------|----------|
| 语法错误 | 构建阶段即可发现 | ESLint / TypeScript / 构建失败 | 文件、行号、规则 |
| 运行时错误 | `ReferenceError`、`TypeError` | `window.onerror`、`window.addEventListener('error')` | message、source、lineno、colno、error.stack |
| 资源加载错误 | `<script>` / `<img>` / CSS 加载失败 | `addEventListener('error', ..., true)`（捕获阶段） | target.src / href、tagName |
| Promise 未捕获异常 | `unhandledrejection` | `window.addEventListener('unhandledrejection')` | reason、stack |
| 网络请求错误 | fetch/XHR 失败、超时 | 拦截 `fetch` / `XMLHttpRequest` | url、status、method、duration |
| 框架级错误 | React Error Boundary、Vue `errorHandler` | 框架提供的错误处理钩子 | componentStack、info |
| 跨域脚本错误 | `Script error.` | 设置 `crossorigin="anonymous"` + CORS | 完整堆栈 |

捕获示例：

```js
// 运行时错误
window.addEventListener('error', (event) => {
  report({
    type: 'error',
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack,
  });
}, true);

// Promise 未捕获
window.addEventListener('unhandledrejection', (event) => {
  report({
    type: 'unhandledrejection',
    reason: event.reason?.message || String(event.reason),
    stack: event.reason?.stack,
  });
});
```

上报字段通常包括：错误类型、消息、堆栈、页面 URL、UA、时间戳、用户 ID、Release、Session ID、Trace ID。

**评分维度**：
- 能列举至少 5 类前端错误（40%）
- 能说明对应的捕获方式（40%）
- 能说明上报字段设计（20%）

**常见错误**：
- 只用 `window.onerror` 而遗漏资源错误与 Promise 异常。
- 对跨域脚本错误没有配置 `crossorigin`。
- 错误对象被 `JSON.stringify` 后丢失 stack。

**延伸追问**：
- 如何避免同一错误被 `onerror` 和 Error Boundary 重复上报？
- `error.cause` 应该怎么处理？

**相关题目**：
- [FB-30-CD-B-007 手写异常捕获与上报函数](#FB-30-CD-B-007)
- [FB-30-CD-A-016 实现前端错误边界](#FB-30-CD-A-016)

**参考资源**：
- [MDN - window.onerror](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/error_event)
- [MDN - unhandledrejection](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event)

**口头回答版**：
> 前端常见错误分几类：语法错误靠构建和 ESLint 提前发现；运行时错误用 window.onerror 或 addEventListener('error') 捕获；资源加载错误要在捕获阶段监听；Promise 未捕获异常用 unhandledrejection；网络请求错误要拦截 fetch 和 XHR；框架错误用 React Error Boundary 或 Vue 的 errorHandler。上报时要带错误消息、堆栈、页面 URL、用户、版本等上下文，方便聚合和定位。

---

### FB-30-CO-B-004：Sentry 在前端错误监控中的基本工作原理是什么？

**题型**：概念题  
**难度**：🟢 基础  
**岗位层级**：初级 / 高级  
**面试知识域**：30 可观测性  
**标签**：observability、sentry、error-monitoring、sdk、frontend-engineering  
**出现频率**：高频  
**预计回答时长**：3-5 分钟

**题目描述**：
请简述 Sentry 在前端项目中的工作原理，包括数据如何采集、分组、展示，以及 Source Map 的作用。

**参考答案**：

Sentry 前端监控流程：

1. **SDK 接入**：安装 `@sentry/browser`（或框架专用包），初始化后自动挂载全局错误、Promise、资源、性能等 Hook。
2. **事件采集**：捕获异常后生成 Event，包含 stack trace、breadcrumbs、上下文、标签、用户信息、release 等。
3. **事件发送**：默认通过 `fetch` / `sendBeacon` 发到 Sentry Relay / SaaS 服务端。
4. **Source Map 还原**：构建时上传 Source Map（或让 Sentry 从 Release Artifact 下载），服务端用其将压缩后的堆栈还原为原始文件位置。
5. **问题分组**：根据 stack trace fingerprint、异常类型、文件名等将相似 Event 聚合为 Issue。
6. **告警与展示**：Issue 列表、趋势图、Release 健康度、受影响用户数、关联 Commits。

初始化示例：

```js
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://xxx@yyy.ingest.sentry.io/zzz',
  environment: process.env.NODE_ENV,
  release: 'my-app@1.2.3',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({ maskAllText: false }),
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.01,
});
```

Source Map 作用：

- 生产代码经过压缩、混淆后，堆栈行号列号无意义。
- Source Map 把 `bundle.js:1:12345` 映射回 `src/components/Order.tsx:42:10`。
- 构建时通过 `sentry-cli sourcemaps upload` 上传，或在 Sentry 中配置 artifact bundle。

**评分维度**：
- 能说明 Sentry SDK 采集和上报流程（40%）
- 能解释 Issue/Event/Release/Source Map 的关系（40%）
- 能提到采样、环境、Release 等配置（20%）

**常见错误**：
- 认为 Source Map 在浏览器端直接解析。
- 没有配置 `release`，导致无法按版本回溯。
- 本地上传 Source Map 但生产环境禁止访问，导致匹配失败。

**延伸追问**：
- Sentry 如何对重复错误进行限流？
- 为什么有时候 Sentry 里看到的异常堆栈只有一行？

**相关题目**：
- [FB-30-CO-A-010 Sentry 的 issue、event、release、source map](#FB-30-CO-A-010)
- [FB-30-CD-B-007 手写异常捕获与上报函数](#FB-30-CD-B-007)

**参考资源**：
- [Sentry - Source Maps](https://docs.sentry.io/platforms/javascript/sourcemaps/)
- [Sentry - Releases](https://docs.sentry.io/product/releases/)

**口头回答版**：
> Sentry 通过 SDK 自动挂全局的错误和 Promise 钩子，捕获异常后生成事件，带上堆栈、面包屑、用户上下文和版本号，发到 Sentry 服务端。服务端用 Source Map 把压缩代码的堆栈还原成原始代码位置，再按异常类型和堆栈指纹聚合成 Issue。开发者在后台看 Issue 列表、影响人数、版本趋势，并配置告警。用的时候一定要配 release 和 source map 上传，不然定位很麻烦。

---

### FB-30-PE-B-005：什么是 RUM？它通常采集哪些性能指标？

**题型**：性能优化题  
**难度**：🟢 基础  
**岗位层级**：初级 / 高级  
**面试知识域**：30 可观测性  
**标签**：observability、performance、core-web-vitals、sdk、frontend-engineering  
**出现频率**：高频  
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 RUM（Real User Monitoring）的概念，并列举前端 RUM 通常会采集的核心性能指标。

**参考答案**：

RUM 即**真实用户监控**，指在真实用户的浏览器中采集性能与体验数据，反映不同网络、设备、地区下的实际表现。

与 Synthetic 监控（主动拨测）不同，RUM 数据来自真实访问，覆盖样本更全面，但受用户环境噪声影响。

核心性能指标：

| 指标 | 含义 | 理想阈值 |
|------|------|----------|
| TTFB | 首字节时间 | < 800 ms |
| FCP | 首次内容绘制 | < 1.8 s |
| LCP | 最大内容绘制 | < 2.5 s |
| FID / INP | 首次输入延迟 / 下次绘制交互 | INP < 200 ms |
| CLS | 累积布局偏移 | < 0.1 |
| TTI | 可交互时间 | 视场景而定 |
| Long Tasks | 长任务（>50 ms） | 尽量少 |
| Resource Timing | 资源加载耗时 | 按资源类型设定 |
| Navigation Timing | DNS/TCP/SSL/Response 等阶段 | 按阶段分析 |

业务/自定义指标：

- 路由切换耗时（SPA）
- 关键 API 耗时
- 页面白屏时间、首屏时间
- 用户可操作时间

采集方式：

```js
import { onLCP, onINP, onCLS, onTTFB, onFCP } from 'web-vitals';

onLCP(console.log, { reportAllChanges: true });
onCLS(console.log);
```

**评分维度**：
- 能解释 RUM 与 Synthetic 的核心区别（30%）
- 能列出 Web Vitals 等核心指标（40%）
- 能说明采集方式与业务自定义指标（30%）

**常见错误**：
- 把 RUM 等同于实验室性能测试（Lighthouse）。
- 只看平均值，忽略 p75/p95 分位数。
- 采集指标过多，影响用户端性能。

**延伸追问**：
- RUM 数据应该如何采样？
- 如何在 SPA 路由切换时采集性能？

**相关题目**：
- [FB-30-PE-A-011 Synthetic 监控与 RUM 的区别](#FB-30-PE-A-011)
- [FB-30-PE-P-019 基于 Web Vitals 做性能监控](#FB-30-PE-P-019)

**参考资源**：
- [web-vitals 库](https://github.com/GoogleChrome/web-vitals)
- [Chrome - Core Web Vitals](https://web.dev/articles/vitals)

**口头回答版**：
> RUM 就是真实用户监控，数据来自真实用户的浏览器，而不是实验室测试。它主要采集 TTFB、FCP、LCP、INP、CLS 这些 Core Web Vitals，还有 Resource Timing、Long Tasks、自定义业务指标。RUM 的好处是覆盖真实环境，坏处是噪声大，所以分析时要看分位数，不要只看平均值。可以用 web-vitals 库方便地采集。

---

### FB-30-CO-B-006：日志级别通常有哪些？前端如何选择？

**题型**：概念题  
**难度**：🟢 基础  
**岗位层级**：初级 / 高级  
**面试知识域**：30 可观测性  
**标签**：observability、sdk、testing-strategy、error-monitoring、frontend-engineering  
**出现频率**：中频  
**预计回答时长**：2-3 分钟

**题目描述**：
请说明常见的日志级别，并阐述前端生产环境、测试环境和开发环境应该如何选择默认级别。

**参考答案**：

常见日志级别（由低到高）：

```text
TRACE < DEBUG < INFO < WARN < ERROR < FATAL
```

| 级别 | 用途 | 示例 |
|------|------|------|
| TRACE | 最详细的调用链 | 函数进入/退出、变量快照 |
| DEBUG | 调试信息 | 内部状态、缓存命中 |
| INFO | 正常业务事件 | 用户登录、订单提交 |
| WARN | 潜在问题 | 接口超时但已重试、降级 |
| ERROR | 需要处理的异常 | API 500、JS 报错 |
| FATAL | 系统级崩溃 | 页面白屏、核心依赖加载失败 |

前端环境选择：

- **开发环境**：开启 `DEBUG` 及以上，甚至 `TRACE`。
- **测试环境**：开启 `INFO` 及以上，便于验证业务流程。
- **生产环境**：默认 `WARN` 及以上，只上报 ERROR/FATAL；必要时通过 URL 参数或动态开关临时降低到 INFO/DEBUG。

代码示例：

```js
class Logger {
  constructor(level = 'INFO') {
    this.levels = { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4, FATAL: 5 };
    this.level = this.levels[level] ?? 2;
  }
  log(lvl, ...args) {
    if (this.levels[lvl] >= this.level) {
      console[lvl.toLowerCase()]?.(...args);
      if (this.levels[lvl] >= 4) sendToServer({ level: lvl, message: args });
    }
  }
}
```

**评分维度**：
- 能说清各级别含义与顺序（40%）
- 能区分不同环境的默认级别（30%）
- 能提到动态开关与采样（30%）

**常见错误**：
- 生产环境打印大量 DEBUG 日志，影响性能与成本。
- 所有异常都用 ERROR，缺少 FATAL 区分。
- 日志级别管理分散，各端不统一。

**延伸追问**：
- 如果用户反馈问题但生产日志不足，如何安全地提升级别？
- 日志采样和日志级别有什么区别？

**相关题目**：
- [FB-30-EN-A-012 设计前端日志采集 SDK](#FB-30-EN-A-012)
- [FB-30-EN-P-023 日志脱敏与合规](#FB-30-EN-P-023)

**参考资源**：
- [SLF4J - Log Level](https://www.slf4j.org/manual.html#typical_usage)

**口头回答版**：
> 常见日志级别从低到高是 TRACE、DEBUG、INFO、WARN、ERROR、FATAL。开发环境可以开到 DEBUG，测试环境 INFO，生产环境一般只开 WARN 及以上，避免日志太多影响性能和成本。必要的时候可以通过 URL 参数或远程开关临时降低级别排查问题。前端还要考虑别把 DEBUG 日志打到生产。

---

### FB-30-CD-B-007：手写一个前端异常捕获与上报函数

**题型**：手写代码题  
**难度**：🟢 基础  
**岗位层级**：初级 / 高级  
**面试知识域**：30 可观测性  
**标签**：observability、error-monitoring、sdk、frontend-engineering、promise  
**出现频率**：中频  
**预计回答时长**：5-10 分钟

**题目描述**：
请使用原生 JavaScript 实现一个 `initErrorReporter` 函数，能够捕获运行时错误、Promise 未捕获异常和资源加载错误，并具备基础去重与限流能力。

**参考答案**：

```js
function initErrorReporter({ endpoint, sampleRate = 1, maxPerMinute = 30 }) {
  const seen = new Set();
  let count = 0;
  let resetTimer = setInterval(() => { count = 0; }, 60_000);

  function getFingerprint(err) {
    const stack = err?.stack || err?.message || String(err);
    return stack.split('\n').slice(0, 3).join('|');
  }

  function shouldReport(fingerprint) {
    if (Math.random() > sampleRate) return false;
    if (seen.has(fingerprint)) return false;
    if (count >= maxPerMinute) return false;
    seen.add(fingerprint);
    count++;
    return true;
  }

  function report(payload) {
    const body = JSON.stringify({
      ...payload,
      url: location.href,
      ua: navigator.userAgent,
      ts: Date.now(),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body);
    } else {
      fetch(endpoint, { method: 'POST', body, keepalive: true });
    }
  }

  window.addEventListener('error', (event) => {
    const err = event.error;
    const fp = getFingerprint(err);
    if (!shouldReport(fp)) return;
    report({
      type: 'error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: err?.stack,
      tagName: event.target?.tagName,
      src: event.target?.src || event.target?.href,
    });
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const fp = getFingerprint(reason);
    if (!shouldReport(fp)) return;
    report({
      type: 'unhandledrejection',
      message: reason?.message || String(reason),
      stack: reason?.stack,
    });
  });

  return () => clearInterval(resetTimer);
}

initErrorReporter({ endpoint: '/api/log/error', sampleRate: 0.5, maxPerMinute: 20 });
```

关键设计点：

- 在捕获阶段监听 `error`，才能拿到资源加载错误。
- 用堆栈前三行生成指纹，避免同一错误重复上报。
- `sampleRate` 控制采样，`maxPerMinute` 防止报错风暴拖垮上报通道。
- 优先使用 `sendBeacon`，页面关闭也能保证发送。
- 返回卸载函数，避免内存泄漏。

**评分维度**：
- 能捕获 error / unhandledrejection / 资源错误（40%）
- 能实现去重或限流（30%）
- 能正确选择 sendBeacon / fetch 上报（20%）
- 代码健壮性（10%）

**常见错误**：
- 只在冒泡阶段监听，漏掉资源错误。
- 没有处理 `sendBeacon` 失败或 URL 长度限制。
- 用 `JSON.stringify(Error)` 导致 stack 丢失。

**延伸追问**：
- 如何防止上报接口本身出错导致死循环？
- 如果错误发生在 Web Worker 中怎么办？

**相关题目**：
- [FB-30-CO-B-003 前端常见错误类型](#FB-30-CO-B-003)
- [FB-30-CD-A-016 实现前端错误边界](#FB-30-CD-A-016)

**参考资源**：
- [MDN - sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)

**口头回答版**：
> 我写一个 initErrorReporter，在捕获阶段监听 error 事件，这样资源加载错误也能抓到；再监听 unhandledrejection 抓 Promise 异常。用堆栈前几行算一个指纹，避免同一个错误重复上报。再加 sampleRate 采样和每分钟最大上报数限流，防止报错风暴。上报优先用 sendBeacon，页面关了也能发出去。最后返回一个清理函数。

---

### FB-30-CO-B-008：什么是健康检查（Health Check）？前端可以怎么做？

**题型**：概念题  
**难度**：🟢 基础  
**岗位层级**：初级 / 高级  
**面试知识域**：30 可观测性  
**标签**：observability、performance、sdk、frontend-engineering、leadership  
**出现频率**：中频  
**预计回答时长**：3-5 分钟

**题目描述**：
请解释健康检查的作用，并给出前端应用可实施的健康检查方案。

**参考答案**：

健康检查是用于判断系统、服务或应用是否“活着且能正常服务”的探测机制。目的是在故障早期发现异常，触发告警或自动切换。

服务端健康检查常见形式：

- `/health/live`：进程是否存活（liveness）。
- `/health/ready`：是否准备好接收流量（readiness），如依赖服务可达。

前端健康检查方案：

1. **页面加载健康探针**
   在 HTML 中内联一段极简脚本，检测核心 JS 是否加载、DOM 是否正常：

   ```html
   <script>
     window.__appHealth = { loadedAt: Date.now(), jsOk: true };
   </script>
   ```

2. **关键 API 探测**
   定期访问 `/api/health` 或一个轻量接口：

   ```js
   setInterval(async () => {
     const ok = await fetch('/api/health', { cache: 'no-store' })
       .then(r => r.ok)
       .catch(() => false);
     report({ metric: 'api_health', value: ok ? 1 : 0 });
   }, 30_000);
   ```

3. **白屏 / 关键节点检测**
   在 `window.load` 后检查 `#root` 是否有子节点，或关键区域是否渲染。

4. **Service Worker 健康**
   检测 SW 是否注册、是否最新，避免缓存导致旧版本长期运行。

5. **CDN / 静态资源探测**
   对关键 JS/CSS 文件发起 `HEAD` 请求，确认 200 且响应时间可接受。

6. **综合评分**
   将多项指标汇总为一个 `health_score`，低于阈值触发告警。

**评分维度**：
- 能解释健康检查的目的（30%）
- 能区分 liveness / readiness（20%）
- 能给出前端可落地的健康检查手段（50%）

**常见错误**：
- 只检查页面能否打开，忽略关键 API 和静态资源。
- 健康检查本身太耗时，反而影响性能。
- 没有区分“存活”和“可用”。

**延伸追问**：
- 健康检查失败时，前端如何优雅降级？
- 如何避免健康检查接口本身被缓存导致误判？

**相关题目**：
- [FB-30-SC-A-009 页面白屏如何定位](#FB-30-SC-A-009)
- [FB-30-SD-R-026 设计前端 on-call 与事故响应机制](#FB-30-SD-R-026)

**参考资源**：
- [Kubernetes - Liveness and Readiness Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

**口头回答版**：
> 健康检查就是判断系统是不是还活着、能不能正常服务。服务端常用 liveness 和 readiness 两个端点。前端可以做页面加载探针、定期探测关键 API、检查根节点有没有内容、探测 CDN 静态资源、看 Service Worker 是否正常。最后可以把这些指标综合成一个 health score，低于阈值就告警。


---

## 进阶题（8 道）{#advanced}

### FB-30-SC-A-009：如果一个页面白屏，如何利用可观测性数据定位根因？

**题型**：场景设计题  
**难度**：🟡 进阶  
**岗位层级**：高级  
**面试知识域**：30 可观测性  
**标签**：observability、error-monitoring、performance、sdk、frontend-engineering  
**出现频率**：高频  
**预计回答时长**：5-8 分钟

**题目描述**：
用户反馈某页面白屏，请描述你会如何利用日志、指标、链路、错误监控等数据逐步定位根因。

**参考答案**：

排查步骤：

1. **确认影响面（指标）**
   - 查看该页面白屏率、错误率、PV 是否在特定版本/地区/设备上升。
   - 关注 `LCP` 是否为空或极大、`load` 事件是否触发。

2. **查看错误监控（Sentry / 日志）**
   - 按页面 URL 过滤最近报错，看是否有大量 `Script error`、资源加载失败、框架 Error Boundary 捕获异常。
   - 检查 `unhandledrejection` 是否有阻塞渲染的 Promise 异常。

3. **分析页面加载链路（Trace / Performance）**
   - 查看代表性的 Navigation Timing 瀑布流：DNS、TCP、HTML、JS、CSS、图片。
   - 识别是否有 JS 文件长时间 pending、关键 CSS 阻塞或同步脚本阻塞解析。

4. **检查资源可用性**
   - 用 Resource Timing 看关键 JS/CSS 是否 404/5xx、跨域、超时。
   - 查看 CDN 边缘节点状态、版本发布时间点。

5. **回放或复现**
   - 若有 Session Replay，回放用户操作路径。
   - 在相同浏览器版本、网络条件下复现。

6. **关联发布与配置变更**
   - 对比白屏开始时间与最近发布、配置变更、A/B 实验、灰度开关。

常见根因：

- 关键 JS 打包失败或被 AdBlock 拦截。
- 服务端渲染失败，返回空 HTML。
- 旧浏览器不支持新语法且 polyfill 缺失。
- 第三方脚本阻塞或失败。
- 后端接口返回异常导致前端渲染中断。

**评分维度**：
- 排查步骤清晰、从宏观到微观（40%）
- 能结合指标、日志、链路、错误监控四种数据（30%）
- 能列举常见白屏根因并给出验证方法（30%）

**常见错误**：
- 一上来就抓用户日志，没有先确认影响范围。
- 忽略版本、发布时间、A/B 实验的关联。
- 只看错误数，不看报错是否命中白屏用户。

**延伸追问**：
- 如果错误监控里没有任何报错，你会怎么继续排查？
- 如何量化“白屏”？用什么指标？

**相关题目**：
- [FB-30-CO-B-003 前端常见错误类型](#FB-30-CO-B-003)
- [FB-30-CO-B-008 健康检查](#FB-30-CO-B-008)

**参考资源**：
- [Chrome - Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)

**口头回答版**：
> 遇到白屏，我先看指标：这个页面白屏率、错误率最近有没有涨，影响哪些版本和地区。然后到 Sentry 或日志里按 URL 过滤，看有没有资源加载失败、脚本错误或 Promise 异常。接着看 Performance Timing 瀑布流，找有没有 JS/CSS 阻塞或加载失败。再关联最近发布时间和配置变更。如果都没报错，就怀疑是 SSR 返回空、AdBlock 拦截或旧浏览器不兼容。必要时用 Session Replay 回放复现。

---

### FB-30-CO-A-010：Sentry 的 issue、event、release、source map 之间是什么关系？

**题型**：概念题  
**难度**：🟡 进阶  
**岗位层级**：高级  
**面试知识域**：30 可观测性  
**标签**：observability、sentry、error-monitoring、sdk、frontend-engineering  
**出现频率**：高频  
**预计回答时长**：3-5 分钟

**题目描述**：
请详细说明 Sentry 中 issue、event、release、source map 的概念及相互关系。

**参考答案**：

概念关系：

```text
Project
 └─ Release（一次部署版本）
     ├─ Source Map / Debug File（构建产物映射）
     └─ Issue（一组相似异常）
         └─ Event（一次具体异常上报）
```

| 概念 | 说明 | 作用 |
|------|------|------|
| Event | SDK 上报的一次异常或消息 | 包含时间、环境、用户、堆栈、面包屑 |
| Issue | 按指纹聚合后的异常组 | 统计影响用户数、趋势、状态 |
| Release | 应用版本标识 | 关联 Source Map、Commits、问题引入版本 |
| Source Map | 压缩代码到源码的映射文件 | 还原原始文件名、行号、列号 |

关系细节：

- 每次异常产生一个 **Event**；Sentry 根据 stack trace fingerprint 把相似 Event 聚合为 **Issue**。
- **Release** 用于标记 Event 发生在哪个版本，帮助判断问题是否随某次发布引入。
- 构建时把 **Source Map** 上传到 Sentry 并与 Release 绑定；服务端收到 Event 后，用对应 Release 的 Source Map 还原堆栈。
- 通过 Release 的 commits 列表，可以定位哪次代码变更可能引入了 Issue。

配置示例：

```js
Sentry.init({
  dsn: '...',
  release: process.env.RELEASE, // e.g. my-app@1.2.3
  environment: process.env.NODE_ENV,
});
```

构建上传 Source Map：

```bash
sentry-cli sourcemaps upload --release=my-app@1.2.3 ./dist
```

**评分维度**：
- 能准确区分 Event 与 Issue（30%）
- 能说清 Release 与 Source Map 的绑定关系（30%）
- 能解释它们在排障中的实际作用（40%）

**常见错误**：
- 把 Event 和 Issue 混为一谈。
- Source Map 没有按 Release 分开上传，导致版本错乱。
- Release 名称不一致，导致无法关联。

**延伸追问**：
- Sentry 如何生成 fingerprint？什么情况下需要自定义 fingerprint？
- Release Health 里的 Session、User、Crash Free Rate 是怎么计算的？

**相关题目**：
- [FB-30-CO-B-004 Sentry 基本工作原理](#FB-30-CO-B-004)
- [FB-30-CD-B-007 手写异常捕获与上报函数](#FB-30-CD-B-007)

**参考资源**：
- [Sentry - Issue Grouping](https://docs.sentry.io/product/data-management/event-grouping/)
- [Sentry - Uploading Source Maps](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/)

**口头回答版**：
> Sentry 里 Event 是单次异常上报，Issue 是把相似 Event 按指纹聚合后的异常组。Release 是应用版本，Source Map 是构建时上传的源码映射。Event 发生时会带上 release 字段，Sentry 用这个 release 找到对应的 Source Map 还原堆栈，再把 Event 聚合成 Issue。这样我们能知道问题从哪个版本开始出现、影响了多少用户、对应哪次代码提交。

---

### FB-30-PE-A-011：Synthetic 监控与 RUM 有什么区别？

**题型**：性能优化题  
**难度**：🟡 进阶  
**岗位层级**：高级  
**面试知识域**：30 可观测性  
**标签**：observability、performance、core-web-vitals、sdk、frontend-engineering  
**出现频率**：中频  
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 Synthetic 监控和 RUM（Real User Monitoring），说明各自的原理、优缺点和适用场景。

**参考答案**：

| 维度 | Synthetic 监控 | RUM |
|------|----------------|-----|
| 数据来源 | 主动探针 / 模拟浏览器 | 真实用户浏览器 |
| 环境 | 机房、云节点、Headless 浏览器 | 真实网络、设备、地理位置 |
| 可控性 | 高（固定脚本、网络、设备） | 低（用户环境复杂） |
| 覆盖度 | 固定采样点 | 覆盖全部真实流量 |
| 典型指标 | 可用性、页面加载耗时、API 响应 | Web Vitals、用户路径、业务指标 |
| 告警能力 | 强，适合 SLA 告警 | 强，适合趋势与用户体验分析 |
| 成本 | 按探针数和频率计费 | 按数据量计费 |

Synthetic 监控原理：

- 通过 Puppeteer/Playwright/Headless Chrome 按固定脚本访问页面。
- 在可控节点上测量 TTFB、FCP、LCP、可交互路径、关键 API。
- 常用于 CDN 可用性、关键链路巡检、竞争对手对比。

RUM 原理：

- 在真实用户页面注入 SDK，采集 Performance API、Web Vitals、资源加载、错误、用户行为。
- 数据按用户环境分布，能发现 Synthetic 探针覆盖不到的地区或设备问题。

最佳实践：

- **Synthetic**：作为 SLA 基线、7×24 告警、发布前验证。
- **RUM**：作为用户体验真实画像、慢速用户分析、业务影响评估。
- 两者结合：Synthetic 发现问题，RUM 确认影响范围。

**评分维度**：
- 能说明两者数据来源与环境的差异（40%）
- 能对比优缺点和适用场景（30%）
- 能举例说明如何配合使用（30%）

**常见错误**：
- 认为 Synthetic 可以完全替代 RUM。
- 忽略 Synthetic 探针网络环境与真实用户的差异。
- RUM 采样不足导致无法代表整体用户。

**延伸追问**：
- 发布前 Synthetic 校验应该覆盖哪些核心路径？
- RUM 数据如何用于设定 Synthetic 的告警阈值？

**相关题目**：
- [FB-30-PE-B-005 什么是 RUM](#FB-30-PE-B-005)
- [FB-30-SD-R-025 设计前端 RUM 指标体系与 Dashboard](#FB-30-SD-R-025)

**参考资源**：
- [Google - RUM vs Synthetic](https://web.dev/articles/rum-vs-synthetic)

**口头回答版**：
> Synthetic 是主动监控，用机房里的无头浏览器按固定脚本访问页面，环境可控，适合做 SLA 告警和发布前验证。RUM 是真实用户监控，数据来自用户真实浏览器，能覆盖真实网络和设备，但噪声大。两者要结合：Synthetic 发现问题，RUM 看影响范围和用户体验。不能只靠 Synthetic，因为它的网络和真实用户可能差很多。

---

### FB-30-EN-A-012：如何设计一个前端日志采集 SDK？

**题型**：工程化题  
**难度**：🟡 进阶  
**岗位层级**：高级 / 专家  
**面试知识域**：30 可观测性  
**标签**：observability、sdk、frontend-engineering、error-monitoring、performance-optimization  
**出现频率**：高频  
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个前端日志采集 SDK，覆盖采集范围、日志分级、采样、批量上报、降级与隐私处理。

**参考答案**：

整体架构：

```text
业务代码 / 框架 Hook
        │
   ┌────┴────┐
采集层（console/error/network/performance/user-action）
        │
  处理层（level filter、formatter、sample、privacy）
        │
  缓冲层（memory queue、持久化）
        │
  发送层（sendBeacon / fetch / img ping）
        │
  服务端网关（鉴权、限流、转发）
```

核心模块：

1. **采集范围**
   - 自动采集：console、error、unhandledrejection、资源错误、fetch/XHR、路由切换、Web Vitals。
   - 手动采集：`logger.info('submit_order', {...})`。

2. **日志分级**
   - TRACE / DEBUG / INFO / WARN / ERROR / FATAL。
   - 支持全局阈值与按模块/namespace 单独阈值。

3. **采样策略**
   - 错误日志全采；性能/行为日志按用户 ID hash 采样（保证同一用户稳定性）。
   - 支持动态采样率下发。

4. **批量与限流**
   - 内存队列，满 N 条或 T 秒触发一次上报。
   - 网络异常时本地缓存（IndexedDB / localStorage），恢复后补发。
   - 最大并发、最大体积限制。

5. **降级策略**
   - 上报失败次数过多时自动降采样或暂停上报。
   - 低端设备/弱网环境降低采集频率。

6. **隐私合规**
   - 字段白名单 + 正则脱敏（手机号、身份证、Token）。
   - 支持 GDPR/CCPA 的“不追踪”模式。

伪代码：

```ts
class LogSDK {
  private queue: LogEntry[] = [];
  private config = { level: 'INFO', sampleRate: 1, batchSize: 10, flushInterval: 5000 };

  log(level: Level, message: string, context?: object) {
    if (!this.shouldLog(level)) return;
    const entry = formatEntry(level, message, context);
    this.queue.push(entry);
    if (this.queue.length >= this.config.batchSize) this.flush();
  }

  private flush() {
    if (!this.queue.length) return;
    const payload = this.queue.splice(0);
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) navigator.sendBeacon('/api/log', body);
    else fetch('/api/log', { method: 'POST', body, keepalive: true });
  }
}
```

**评分维度**：
- 架构分层清晰（30%）
- 能覆盖采集、分级、采样、批量、降级（40%）
- 能说明隐私合规与成本控制（30%）

**常见错误**：
- 所有日志实时单条上报，导致网络拥塞。
- 采样随机性太强，无法保持用户维度一致性。
- 忽略日志中敏感信息脱敏。

**延伸追问**：
- 如何确保页面关闭时不丢失未发送日志？
- 采样策略在 DEBUG 场景下如何动态调整？

**相关题目**：
- [FB-30-CO-B-006 日志级别选择](#FB-30-CO-B-006)
- [FB-30-EN-P-023 日志脱敏与合规](#FB-30-EN-P-023)

**参考资源**：
- [OpenTelemetry - SDK Configuration](https://opentelemetry.io/docs/concepts/sdk-configuration/)

**口头回答版**：
> 前端日志 SDK 我分成采集层、处理层、缓冲层、发送层。采集层自动抓 console、error、网络、路由和性能事件，也支持手动打日志。处理层做日志分级、格式化、采样和脱敏。缓冲层把日志先放内存队列，满一批或定时上报，网络不好时存本地。发送层优先 sendBeacon，失败再 fetch。采样按用户 hash，保证同一个人要么采要么不采，错误日志尽量全采。还要注意隐私合规，对手机号、Token 脱敏。

---

### FB-30-CO-A-013：什么是 OpenTelemetry？它在前端链路追踪中扮演什么角色？

**题型**：概念题  
**难度**：🟡 进阶  
**岗位层级**：高级 / 专家  
**面试知识域**：30 可观测性  
**标签**：observability、sdk、frontend-engineering、micro-frontend、performance-optimization  
**出现频率**：高频  
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 OpenTelemetry 的核心定位，并说明它如何帮助前端实现分布式链路追踪。

**参考答案**：

OpenTelemetry（OTel）是 CNCF 主导的可观测性标准与框架，提供统一的 API、SDK、数据模型和传输协议（OTLP），用于采集**链路（Traces）、指标（Metrics）、日志（Logs）**。

核心组件：

| 组件 | 作用 |
|------|------|
| API | 定义 instrument 接口，业务代码无侵入或低侵入 |
| SDK | 实现采样、批处理、资源属性、导出器 |
| Collector | 接收、处理、转发可观测数据到后端 |
| OTLP | 基于 gRPC/HTTP 的二进制传输协议 |
| Semantic Conventions | 统一属性命名规范 |

前端链路追踪中的角色：

1. **起点生成 Trace Context**
   用户打开页面或点击按钮时，前端创建 Root Span 与 `traceparent`。

2. **上下文透传**
   在请求头中携带 `traceparent` 和 `tracestate`，后端服务继续接力：

   ```js
   fetch('/api/order', {
     headers: { traceparent: span.spanContext().traceparent },
   });
   ```

3. **自动埋点**
   OTel 提供 `DocumentLoadInstrumentation`、`FetchInstrumentation`、`UserInteractionInstrumentation` 等自动埋点包。

4. **统一导出**
   前端 Span 通过 OTLP/HTTP 或 WebSocket 发到 OTel Collector，再转到 Jaeger/Zipkin/Grafana Tempo。

示例：

```js
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const provider = new WebTracerProvider();
provider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter({ url: '/v1/traces' })));
provider.register();
```

**评分维度**：
- 能说明 OpenTelemetry 的定位与三大信号（30%）
- 能解释 Trace Context 在前端的生成与透传（40%）
- 能提到自动埋点、Collector、语义规范（30%）

**常见错误**：
- 认为 OpenTelemetry 只能做后端链路追踪。
- 把 OpenTracing/OpenCensus 与 OpenTelemetry 混为一谈。
- 忽略 W3C trace context 标准，导致前后端 trace 断裂。

**延伸追问**：
- 前端 Trace 如何与后端 Trace 关联？
- 如何解决浏览器跨域请求携带 trace header 的问题？

**相关题目**：
- [FB-30-CO-P-018 分布式链路追踪核心概念](#FB-30-CO-P-018)
- [FB-30-SC-P-022 微前端/跨端统一可观测性](#FB-30-SC-P-022)

**参考资源**：
- [OpenTelemetry - JS SDK](https://opentelemetry.io/docs/languages/js/)
- [W3C Trace Context](https://www.w3.org/TR/trace-context/)

**口头回答版**：
> OpenTelemetry 是 CNCF 出的可观测性标准，统一了 traces、metrics、logs 的采集和传输。前端用它做链路追踪，可以在用户打开页面或点击按钮时生成 trace，然后通过请求头把 traceparent 传给后端，后端接着这个 trace 继续生成 span。OTel 还提供自动埋点、SDK、Collector，数据可以统一发到 Jaeger 或 Tempo。它让前后端链路能串起来。

---

### FB-30-SC-A-014：如何处理前端高频埋点/性能数据上报不阻塞业务？

**题型**：场景设计题  
**难度**：🟡 进阶  
**岗位层级**：高级  
**面试知识域**：30 可观测性  
**标签**：observability、sdk、performance、frontend-engineering、performance-optimization  
**出现频率**：高频  
**预计回答时长**：5-8 分钟

**题目描述**：
前端需要采集大量点击、曝光、性能数据，如何保证采集与上报过程对业务体验和主线程影响最小？

**参考答案**：

优化策略分层：

1. **采集阶段**
   - 使用事件委托，避免每个元素单独绑定监听器。
   - 使用 `PerformanceObserver` 的 `buffered: true`，避免轮询。
   - 仅采集关键路径和采样用户，非全量。

2. **缓冲阶段**
   - 内存队列批量聚合，按条数/时间窗口触发上报。
   - 大量数据时本地压缩（如 MessagePack、gzip）。

3. **发送阶段**
   - 优先 `navigator.sendBeacon`：异步、不阻塞页面关闭。
   - 次选 `fetch(..., { keepalive: true })`。
   - 避免同步 `XMLHttpRequest` 和图片 `src` 上报造成的阻塞。
   - 使用 `requestIdleCallback` 将上报放到空闲时段。

4. **主线程卸载**
   - 复杂格式化/序列化放到 Web Worker。
   - 使用 IndexedDB 持久化，网络恢复后台补发。

5. **降级与熔断**
   - 上报耗时/失败率超过阈值时降低采样率或暂停非关键埋点。
   - 低端设备（内存、CPU）进一步降级。

6. **体积控制**
   - 字段裁剪，只保留必要维度。
   - 公共上下文只发一次。
   - 对重复事件计数聚合（如曝光次数聚合为 `count`）。

示例：

```js
let queue = [];
const BATCH_SIZE = 20;
const FLUSH_INTERVAL = 5000;

function enqueue(event) {
  queue.push(event);
  if (queue.length >= BATCH_SIZE) flush();
}

function flush() {
  if (!queue.length) return;
  const payload = queue.splice(0);
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => send(payload));
  } else {
    send(payload);
  }
}

function send(payload) {
  navigator.sendBeacon('/api/beacon', JSON.stringify(payload));
}

setInterval(flush, FLUSH_INTERVAL);
```

**评分维度**：
- 能提出批量、采样、压缩等降低频率手段（40%）
- 能说明 sendBeacon / requestIdleCallback / Worker 等降低阻塞手段（30%）
- 能提到降级、熔断、低端设备适配（30%）

**常见错误**：
- 每条事件都同步发送，阻塞 UI。
- 用 `new Image()` 上报大量数据，导致 URL 超长。
- 忽略页面关闭时未发送数据丢失。

**延伸追问**：
- 如果埋点数据实时性要求很高（如风控），如何权衡？
- 批量上报失败时，重试策略怎么设计？

**相关题目**：
- [FB-30-EN-A-012 设计前端日志采集 SDK](#FB-30-EN-A-012)
- [FB-30-PE-B-005 什么是 RUM](#FB-30-PE-B-005)

**参考资源**：
- [MDN - requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

**口头回答版**：
> 高频埋点不能实时一条条发。我一般用内存队列批量聚合，到一定数量或时间窗口再发；发送用 sendBeacon，不阻塞页面；复杂序列化可以放 Web Worker；还可以用 requestIdleCallback 等浏览器空闲时上报。另外采样很重要，性能数据按用户 hash 采样，点击埋点也做采样。网络不好或低端设备要降级，甚至暂停非关键埋点。页面关闭时 sendBeacon 能保证未发送数据不丢。

---

### FB-30-CO-A-015：SLI、SLO、SLA 有什么区别？请给前端示例。

**题型**：概念题  
**难度**：🟡 进阶  
**岗位层级**：高级 / 专家  
**面试知识域**：30 可观测性  
**标签**：observability、leadership、performance、sdk、frontend-engineering  
**出现频率**：高频  
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 SLI、SLO、SLA 的含义与区别，并给出至少两个前端可观测性相关的例子。

**参考答案**：

| 概念 | 全称 | 含义 | 特点 |
|------|------|------|------|
| SLI | Service Level Indicator | 服务水平指标，量化服务质量的指标 | 可测量、可客观 |
| SLO | Service Level Objective | 服务水平目标，SLI 要达成的目标值 | 内部目标，可调整 |
| SLA | Service Level Agreement | 服务等级协议，对用户的承诺 | 涉及赔偿或违约 |

关系：`SLA ≥ SLO > SLI` 的严格程度通常如此。

前端示例 1 —— 页面加载性能：

- SLI：首页 LCP ≤ 2.5s 的会话比例。
- SLO：过去 28 天，首页 LCP ≤ 2.5s 的比例 ≥ 90%。
- SLA：向企业客户承诺首页可用时间 ≥ 99.9%，否则按合同赔付。

前端示例 2 —— 错误率：

- SLI：每千次页面浏览中的 JS 错误次数。
- SLO：JS 错误率 < 1%。
- SLA：核心下单流程 JS 错误率 < 0.5%，否则触发服务补偿。

制定 SLO 的原则：

- 从用户视角出发，选择能反映体验的指标。
- 不要追求 100%，否则成本过高且抑制创新。
- 区分关键路径（如支付）和非关键路径（如帮助页）。
- 预留错误预算（Error Budget），用于灰度发布和实验。

**评分维度**：
- 能清晰区分 SLI/SLO/SLA（40%）
- 能给出前端具体示例（30%）
- 能提到错误预算与用户视角（30%）

**常见错误**：
- 把 SLO 和 SLA 混用。
- SLI 选择不能反映用户体验（如服务器 CPU 使用率）。
- SLO 设定过严，导致团队疲于救火。

**延伸追问**：
- 错误预算燃尽时应该怎么做？
- 前端 SLO 应该用会话维度还是页面维度？

**相关题目**：
- [FB-30-SD-R-025 设计前端 RUM 指标体系与 Dashboard](#FB-30-SD-R-025)
- [FB-30-CP-R-027 评估可观测性数据生命周期与成本](#FB-30-CP-R-027)

**参考资源**：
- [Google SRE Book - SLI/SLO/SLA](https://sre.google/workbook/slo-document/)

**口头回答版**：
> SLI 是指标，比如首页 LCP 小于 2.5 秒的会话比例；SLO 是目标，比如这个比例要达到 90%；SLA 是对外承诺，比如可用性 99.9%，达不到要赔偿。SLO 比 SLI 严格，SLA 又比 SLO 严格。前端定 SLO 要从用户视角选指标，比如 LCP、CLS、JS 错误率，还要留错误预算，不能定 100%，不然没法做灰度和实验。

---

### FB-30-CD-A-016：实现一个前端错误边界并接入监控

**题型**：手写代码题  
**难度**：🟡 进阶  
**岗位层级**：高级  
**面试知识域**：30 可观测性  
**标签**：observability、error-monitoring、sentry、sdk、frontend-engineering  
**出现频率**：中频  
**预计回答时长**：5-10 分钟

**题目描述**：
请用 React 实现一个 Error Boundary，捕获子组件渲染错误后展示降级 UI，并将错误上报到监控服务。同时说明 Vue 中类似机制。

**参考答案**：

React Error Boundary 示例：

```jsx
import React from 'react';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 上报到监控
    Sentry.captureException(error, {
      contexts: { react: { componentStack: info.componentStack } },
      tags: { page: window.location.pathname },
    });

    // 兜底：发送到自建日志服务
    fetch('/api/log/error', {
      method: 'POST',
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: info.componentStack,
        url: window.location.href,
      }),
      keepalive: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h2>页面出现错误，请刷新重试</h2>;
    }
    return this.props.children;
  }
}

// 使用
<ErrorBoundary fallback={<FallbackPage />}>
  <App />
</ErrorBoundary>
```

Vue 类似机制：

```js
import { createApp } from 'vue';

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  Sentry.captureException(err, {
    contexts: { vue: { info, props: instance?.$props } },
  });
};

window.addEventListener('error', () => { /* 全局兜底 */ });
window.addEventListener('unhandledrejection', () => { /* Promise 兜底 */ });
```

设计要点：

- Error Boundary 只能捕获子组件渲染、生命周期和构造函数中的错误，不能捕获事件处理器、异步代码、SSR 错误。
- 需要配合全局 `error` / `unhandledrejection` 形成多层防护。
- 上报时带上组件栈、页面路径、用户信息，便于定位。
- 降级 UI 应提供刷新、返回首页、上报反馈等操作。

**评分维度**：
- 能正确实现 React Error Boundary（40%）
- 能集成监控上报（30%）
- 能说明 Vue 等效机制与 Error Boundary 的覆盖范围（30%）

**常见错误**：
- 在函数组件中直接写 Error Boundary（React 16+ 仅支持类组件）。
- 忽略 Error Boundary 无法捕获异步错误。
- 降级 UI 只显示“出错”，没有引导操作。

**延伸追问**：
- 如果错误边界本身抛错怎么办？
- 微前端场景下错误边界如何设计？

**相关题目**：
- [FB-30-CO-B-003 前端常见错误类型](#FB-30-CO-B-003)
- [FB-30-CD-B-007 手写异常捕获与上报函数](#FB-30-CD-B-007)

**参考资源**：
- [React - Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Vue - errorHandler](https://vuejs.org/api/application.html#app-config-errorhandler)

**口头回答版**：
> React 里 Error Boundary 是一个类组件，在 getDerivedStateFromError 里返回降级状态，在 componentDidCatch 里拿到错误和组件栈，上报到 Sentry 或自建服务，再展示 fallback UI。它只能捕获渲染、生命周期和构造函数的错误，事件和异步错误要另外用全局 error 和 unhandledrejection。Vue 里没有 Error Boundary，用 app.config.errorHandler 做全局捕获。上报时要带组件栈、页面路径、用户信息，降级 UI 最好给刷新或返回按钮。


---

## 深入题（8 道）{#proficient}

### FB-30-SD-P-017：设计一个前端全链路可观测平台

**题型**：系统设计题  
**难度**：🔴 深入  
**岗位层级**：专家  
**面试知识域**：30 可观测性  
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring  
**出现频率**：中频  
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个面向大型前端应用的全链路可观测平台，覆盖错误监控、性能监控、日志、链路追踪和告警，要求说明数据采集、传输、存储、查询与展示的关键设计。

**参考答案**：

系统架构：

```text
┌─────────────────────────────────────────────────────────────┐
│                        前端应用层                            │
│  业务代码  +  SDK（Error / RUM / Logger / Tracer）           │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP / Beacon / WebSocket / OTLP
┌───────────────────────▼─────────────────────────────────────┐
│                       接入网关                               │
│  鉴权 / 限流 / 压缩解压 / 协议转换 / 敏感字段清洗             │
└───────┬───────────────┬───────────────┬─────────────────────┘
        │               │               │
┌───────▼───────┐ ┌─────▼─────┐ ┌───────▼────────┐
│   指标存储     │ │  日志存储  │ │    链路存储     │
│  Prometheus/   │ │ ClickHouse│ │  Jaeger/Tempo  │
│  VictoriaMetrics│ │ / ES     │ │                │
└───────┬───────┘ └─────┬─────┘ └───────┬────────┘
        │               │               │
└───────┴───────▼───────┴───────▼───────┴────────┘
              │      查询与可视化层       │
              │   Grafana / 自建 Dashboard│
              │   告警引擎 / 值班系统      │
              └───────────────────────────┘
```

关键设计：

1. **数据采集**
   - 错误：全局 `error` / `unhandledrejection` + 框架 Error Boundary。
   - 性能：Web Vitals、PerformanceObserver、Resource Timing、Long Tasks。
   - 日志：Console 拦截 + 业务手动日志。
   - 链路：OpenTelemetry Web SDK，生成 Trace，注入 `traceparent`。

2. **传输协议**
   - 错误/日志：`sendBeacon` / `fetch keepalive` / WebSocket。
   - 链路：OTLP/HTTP 或 OTLP/WebSocket。
   - 采集端压缩：gzip、MessagePack，降低上行带宽。

3. **数据关联**
   - 统一维度：`trace_id`、`session_id`、`user_id`、`release`、`env`、`page`。
   - 在日志和错误事件中注入 `trace_id`。
   - 在指标 Label 中保留 `page`、`release`、`env`。

4. **存储选型**
   - 指标：时序数据库（VictoriaMetrics、M3DB），按标签索引。
   - 日志：列式存储（ClickHouse）或日志专用系统（Loki），按时间分区。
   - 链路：分布式追踪存储（Jaeger、Tempo、SkyWalking），按 Trace ID 索引。

5. **查询与展示**
   - Dashboard：错误率趋势、Web Vitals 分位、API 成功率、资源加载耗时。
   - 下钻：从指标 → Trace 列表 → Span 详情 → 关联日志。
   - 告警：基于 SLO 的 burn rate、异常检测、阈值告警。

6. **成本与隐私**
   - 采样：链路头部采样 + 尾部采样；日志分级；指标降精度。
   - 脱敏：网关侧正则清洗 PII；前端 SDK 预过滤。
   - 保留策略：热数据 7 天、温数据 30 天、冷数据归档。

**评分维度**：
- 架构分层合理、覆盖采集/传输/存储/展示（30%）
- 能说明数据关联与下钻设计（25%）
- 能给出合理的存储选型与理由（25%）
- 能考虑采样、成本、隐私、告警（20%）

**常见错误**：
- 所有数据存在同一个数据库，导致查询性能差。
- 没有统一维度，日志、链路、指标无法关联。
- 忽略前端上行带宽和隐私合规。

**延伸追问**：
- 如果日活 1 亿，链路数据如何采样？
- 如何在查询时实现 Trace → Log 的跳转？

**相关题目**：
- [FB-30-CO-B-001 可观测性的三大支柱](#FB-30-CO-B-001)
- [FB-30-SD-R-028 多租户可观测中台](#FB-30-SD-R-028)

**参考资源**：
- [OpenTelemetry - Reference Architecture](https://opentelemetry.io/docs/concepts/observability-primer/)
- [Grafana - LGTM Stack](https://grafana.com/go/stack/)

**口头回答版**：
> 前端全链路可观测平台我分成采集层、接入网关、存储层、查询展示层。采集层用 SDK 抓错误、性能、日志、链路；接入网关做鉴权限流脱敏；存储按数据类型分开：指标用时序库，日志用 ClickHouse 或 Loki，链路用 Jaeger/Tempo。关键是统一 trace_id、session_id、release、page 这些维度，让用户能从指标下钻到 Trace，再看到日志。还要做采样、分级、脱敏和保留策略来控制成本。

---

### FB-30-CO-P-018：分布式链路追踪的核心概念是什么？

**题型**：概念题  
**难度**：🔴 深入  
**岗位层级**：专家  
**面试知识域**：30 可观测性  
**标签**：observability、sdk、frontend-engineering、performance-optimization、micro-frontend  
**出现频率**：高频  
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Trace、Span、Context Propagation、Baggage 等分布式链路追踪核心概念，并说明它们如何协同工作。

**参考答案**：

核心概念：

| 概念 | 含义 | 示例 |
|------|------|------|
| Trace | 一次完整的分布式事务或用户请求 | 用户下单全流程 |
| Span | Trace 中的一个工作单元 | `GET /api/order`、DB 查询、函数调用 |
| SpanContext | 当前 Span 的标识信息 | `trace_id`、`span_id`、`trace_flags` |
| Context Propagation | 在进程/服务间传递 Trace 上下文 | HTTP 请求头 `traceparent` |
| Baggage | 随 Trace 透传的业务键值对 | `user_id`、`tenant_id` |

Span 关键字段：

- `trace_id`：全局唯一，标识一次完整请求。
- `span_id`：当前 Span 唯一标识。
- `parent_span_id`：父 Span 标识。
- `start_time` / `end_time`：起止时间。
- `name`：操作名称，如 `fetch /api/user`。
- `kind`：Span 类型（client / server / internal / producer / consumer）。
- `attributes`：自定义属性。
- `events`：时间线事件，如 SQL 开始、缓存命中。
- `status`：OK / ERROR。

Trace 示例结构：

```text
Trace: abc123
 ├─ Span A: documentLoad (frontend) [0-1200ms]
 │   ├─ Span B: fetch /api/config [100-300ms]
 │   └─ Span C: fetch /api/user [400-900ms]
 │       └─ Span D: DB query users [450-700ms] (backend)
```

Context Propagation：

- W3C `traceparent`：`00-<trace_id>-<span_id>-<flags>`。
- W3C `tracestate`：携带厂商扩展信息。
- 前端发起请求时把当前 SpanContext 写入 Header，后端继续生成子 Span。

Baggage：

- 与 Trace Context 一起透传，用于把业务字段沿请求链传递。
- 注意 Baggage 会随每个请求传播，避免塞入过大或敏感数据。

**评分维度**：
- 能准确解释 Trace/Span/SpanContext（40%）
- 能说清 Context Propagation 机制（30%）
- 能区分 Baggage 与 Trace Context 的用途（30%）

**常见错误**：
- 把 Trace 和 Span 混为一谈。
- 忽略 parent_span_id，画不出调用树。
- 在 Baggage 中传递敏感信息或未控制大小。

**延伸追问**：
- 前端如何在没有后端配合的情况下实现链路？
- Span 采样策略中头部采样和尾部采样有什么区别？

**相关题目**：
- [FB-30-CO-A-013 OpenTelemetry 与前端链路追踪](#FB-30-CO-A-013)
- [FB-30-SC-P-022 微前端/跨端统一可观测性](#FB-30-SC-P-022)

**参考资源**：
- [OpenTelemetry - Traces](https://opentelemetry.io/docs/concepts/signals/traces/)
- [W3C Trace Context](https://www.w3.org/TR/trace-context/)

**口头回答版**：
> 分布式链路追踪里，Trace 是一次完整请求，Span 是请求里的一个工作单元。每个 Span 有 trace_id、span_id、parent_span_id、起止时间、名称、属性。Context Propagation 是把 trace_id 和当前 span_id 通过 HTTP 头的 traceparent 传给下游服务，下游再继续生成子 Span。Baggage 是顺带传的业务字段，比如 user_id，但要注意别传敏感和太大的数据。这样整个调用链就能串起来。

---

### FB-30-PE-P-019：如何基于 Web Vitals + Performance API 做首屏/交互性能监控？

**题型**：性能优化题  
**难度**：🔴 深入  
**岗位层级**：专家  
**面试知识域**：30 可观测性  
**标签**：observability、performance、core-web-vitals、sdk、frontend-engineering  
**出现频率**：高频  
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套基于 Web Vitals 和 Performance API 的前端性能监控方案，覆盖首屏、交互、资源加载，并说明如何上报、聚合与告警。

**参考答案**：

采集指标：

| 指标 | 含义 | 目标 |
|------|------|------|
| TTFB | 首字节时间 | < 800 ms |
| FCP | 首次内容绘制 | < 1.8 s |
| LCP | 最大内容绘制 | < 2.5 s |
| INP | 下次绘制交互延迟 | < 200 ms |
| CLS | 累积布局偏移 | < 0.1 |
| TBT/FID | 阻塞/输入延迟 | 视场景 |
| 自定义 SPA 导航耗时 | 路由切换到可交互 | 视业务 |

采集实现：

```js
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToRUM(metric) {
  // metric: { name, value, rating, delta, entries, navigationType }
  fetch('/api/rum', {
    method: 'POST',
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating, // good / needs-improvement / poor
      page: location.pathname,
      ua: navigator.userAgent,
      ts: Date.now(),
    }),
    keepalive: true,
  });
}

onLCP(sendToRUM, { reportAllChanges: true });
onINP(sendToRUM);
onCLS(sendToRUM);
onFCP(sendToRUM);
onTTFB(sendToRUM);
```

自定义 SPA 导航：

```js
let startTime = performance.now();

window.addEventListener('popstate', () => { startTime = performance.now(); });

export function onRouteComplete(name) {
  const duration = performance.now() - startTime;
  sendToRUM({ name: 'spa_navigation', value: duration, page: name });
}
```

PerformanceObserver 补充：

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 50) {
      sendToRUM({ name: 'long_task', value: entry.duration, startTime: entry.startTime });
    }
  }
});
observer.observe({ type: 'longtask', buffered: true });
```

聚合与展示：

- 按 `page`、`country`、`deviceType`、`connection` 分组。
- 计算 p50/p75/p95/p99，避免只看平均值。
- Dashboard：时间趋势、分布直方图、异常样本列表。

告警：

- 基于 SLO：过去 1 小时 LCP poor 比例 > 5% 触发告警。
- 基于异常检测：某地区 INP 突增 3 sigma。

**评分维度**：
- 能列出关键 Web Vitals 及目标（30%）
- 能给出采集代码示例（30%）
- 能说明自定义 SPA 指标与 Long Tasks（20%）
- 能说明聚合维度与告警策略（20%）

**常见错误**：
- 只采集 FCP 忽略 LCP/INP/CLS。
- 用平均值掩盖尾部用户问题。
- 所有指标全量上报，导致 RUM 数据过大。

**延伸追问**：
- Web Vitals 在 SSR/SSG 页面上的表现有什么不同？
- 如何减少 web-vitals 库本身的体积开销？

**相关题目**：
- [FB-30-PE-B-005 什么是 RUM](#FB-30-PE-B-005)
- [FB-30-SD-R-025 设计前端 RUM 指标体系与 Dashboard](#FB-30-SD-R-025)

**参考资源**：
- [web-vitals](https://github.com/GoogleChrome/web-vitals)
- [web.dev - Optimize Web Vitals](https://web.dev/articles/optimize-web-vitals)

**口头回答版**：
> 我会用 web-vitals 库采集 TTFB、FCP、LCP、INP、CLS，这些都是 Core Web Vitals。上报时带指标名、值、评级、页面路径、UA、时间戳。SPA 还要自定义路由切换耗时。再用 PerformanceObserver 监听 Long Tasks，超过 50ms 的也上报。后端按页面、国家、设备分组，看 p75、p95，不要只看平均值。告警可以基于 SLO，比如 LCP poor 比例超过 5% 就告警。

---

### FB-30-SC-P-020：告警策略如何设计？如何解决告警风暴与降噪？

**题型**：场景设计题  
**难度**：🔴 深入  
**岗位层级**：专家  
**面试知识域**：30 可观测性  
**标签**：observability、leadership、performance、sdk、frontend-engineering  
**出现频率**：高频  
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套前端可观测性告警策略，说明告警分级、触发条件、通知渠道，并重点阐述如何抑制告警风暴和降低噪音。

**参考答案**：

告警设计原则：

1. **基于 SLO / SLI，而非原始阈值**
   - 例：过去 1 小时，首页 LCP > 2.5s 的会话占比 > 5%。
   - 例：JS 错误率连续 5 分钟 > 1%。

2. **分级（Severity）**

   | 级别 | 触发条件 | 响应要求 | 通知渠道 |
   |------|----------|----------|----------|
   | P0 | 核心流程不可用 / 大量用户受影响 | 立即响应 | 电话 + 短信 + IM |
   | P1 | 核心指标显著劣化 | 30 分钟内 | IM + 邮件 |
   | P2 | 非核心问题或趋势告警 | 工作时间内 | 邮件 / 工单 |
   | P3 | 优化建议、容量预警 | 定期 Review | Dashboard |

3. **通知与升级**
   - 首轮通知 on-call 人员；未响应则升级给主管。
   - 使用 PagerDuty / Opsgenie / 内部值班系统。
   - 每条告警附带 Runbook 链接和 Dashboard 下钻链接。

告警降噪策略：

- **相关性聚合**：同一服务/页面/异常的告警合并为一条。
- **抑制（Inhibit）**：根因告警触发时，抑制下游衍生告警。
- **静默（Silence）**：发布窗口、计划维护期间静默预期内告警。
- **动态阈值 / 异常检测**：用基线或机器学习替代固定阈值，减少节假日、活动期误报。
- **SLO Burn Rate**：按错误预算燃尽速度告警，避免轻微抖动打扰。
- **告警质量度量**：统计 MTTD、MTTR、误报率、重复告警率，持续优化。

示例：

```yaml
alerts:
  - name: homepage_lcp_poor_high
    expr: |
      (
        sum(rate(rum_lcp_count{rating="poor"}[1h]))
        /
        sum(rate(rum_lcp_count[1h]))
      ) > 0.05
    severity: P1
    for: 5m
    annotations:
      runbook_url: "https://wiki/runbooks/homepage-lcp"
      dashboard_url: "https://grafana/d/homepage"
```

**评分维度**：
- 能基于 SLO/SLI 设计触发条件（30%）
- 能说明告警分级与通知升级（25%）
- 能提出至少 4 种降噪手段（30%）
- 能提到 Runbook、质量度量（15%）

**常见错误**：
- 所有指标都配告警，导致告警疲劳。
- 阈值固定，不考虑业务周期性波动。
- 只有告警没有 Runbook，处理人不知道看什么。

**延伸追问**：
- 发布期间如何设置自动静默？
- 如何衡量一条告警是否“好”？

**相关题目**：
- [FB-30-CO-A-015 SLI/SLO/SLA](#FB-30-CO-A-015)
- [FB-30-SD-R-026 设计前端 on-call 与事故响应机制](#FB-30-SD-R-026)

**参考资源**：
- [Google SRE - Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)
- [Prometheus Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/)

**口头回答版**：
> 告警要基于 SLO 设计，比如 LCP poor 比例连续 5 分钟超过 5% 才报。分级 P0 到 P3，P0 打电话，P1 发 IM，P2 邮件。每条告警要附带 Runbook 和 Dashboard 链接。降噪方面，同一类告警要聚合，根因告警抑制下游告警，发布和维护期间静默，用动态阈值或 SLO burn rate 减少抖动误报。还要统计误报率和 MTTR，持续优化。

---

### FB-30-CO-P-021：可观测性数据成本通常有哪些？如何优化？

**题型**：概念题  
**难度**：🔴 深入  
**岗位层级**：专家  
**面试知识域**：30 可观测性  
**标签**：observability、tech-debt、performance、sdk、frontend-engineering  
**出现频率**：中频  
**预计回答时长**：5-8 分钟

**题目描述**：
请分析可观测性数据的主要成本构成，并给出针对性的优化方案。

**参考答案**：

成本构成：

| 成本项 | 说明 | 主要影响因素 |
|--------|------|--------------|
| 采集成本 | SDK 运行开销、带宽、CPU | 采样率、埋点数量 |
| 传输成本 | 网络流量、跨区域传输 | 压缩、批大小、协议 |
| 存储成本 | 磁盘/对象存储 | 数据量、保留周期、索引 |
| 计算成本 | 查询聚合、告警计算 | 基数、查询频率 |
| 接入成本 | 网关、Collector 资源 | QPS、解压、路由 |

优化方案：

1. **采样**
   - 链路：头部采样 + 尾部采样，异常 Trace 全采。
   - 日志：ERROR/FATAL 全采，INFO/DEBUG 低采样。
   - 指标：保持全量聚合，但不存储原始事件。

2. **聚合与降精度**
   - 原始指标保留 7 天，降精度为 1 小时或 1 天长期保留。
   - 高频 Counter 做预聚合。

3. **索引与标签优化**
   - 控制 Label 基数，避免用户 ID、订单 ID 作为标签。
   - 日志字段选择性索引，冷热分离。

4. **数据裁剪**
   - 前端 SDK 只上报必要字段，删除调试字段。
   - 网关侧清洗、去重、截断过长日志。

5. **压缩与批处理**
   - 客户端 gzip / zstd 压缩。
   - 批量上报减少请求数。

6. **存储分层**
   - 热数据 SSD/高频查询；温数据普通磁盘；冷数据归档到对象存储。

7. **成本分摊与预算**
   - 按团队/应用拆分账单，设定可观测性预算。
   - 关键业务多投入，边缘业务降级。

**评分维度**：
- 能识别采集、传输、存储、计算成本（40%）
- 能提出采样、聚合、索引优化方案（40%）
- 能提到存储分层与成本预算（20%）

**常见错误**：
- 为了省钱而过度采样，导致丢失关键异常。
- 把高基数 ID 作为指标 Label。
- 所有数据永久保留，不做归档。

**延伸追问**：
- 如何在不影响排障的前提下把日志成本降 50%？
- 前端 SDK 采样率动态调整需要考虑哪些因素？

**相关题目**：
- [FB-30-EN-A-012 设计前端日志采集 SDK](#FB-30-EN-A-012)
- [FB-30-CP-R-027 评估可观测性数据生命周期与成本](#FB-30-CP-R-027)

**参考资源**：
- [Honeycomb - Observability Data Retention](https://www.honeycomb.io/blog/observability-data-retention)

**口头回答版**：
> 可观测性数据成本主要在采集、传输、存储、计算四块。采集和传输看采样率和埋点数量；存储看数据量和保留周期；计算看标签基数和查询频率。优化方法包括：链路用头部加尾部采样，异常 Trace 全采；日志分级采样；指标控制 Label 基数，别拿用户 ID 当标签；原始数据降精度保存；客户端压缩和批量上报；存储热温冷分层；还要给可观测性设预算，按业务重要性分配。

---

### FB-30-SC-P-022：如何在微前端/跨端场景下统一可观测性？

**题型**：场景设计题  
**难度**：🔴 深入  
**岗位层级**：专家  
**面试知识域**：30 可观测性  
**标签**：observability、micro-frontend、sdk、frontend-engineering、performance-optimization  
**出现频率**：中频  
**预计回答时长**：8-15 分钟

**题目描述**：
在微前端（如 qiankun / Module Federation）或跨端（Web / 小程序 / RN）架构下，如何统一采集错误、性能、埋点和链路数据？

**参考答案**：

统一可观测性设计：

1. **共享 SDK 与上下文**
   - 在基座/宿主应用中初始化一次监控 SDK，子应用复用同一实例。
   - 通过全局命名空间或依赖注入传递 `logger`、`tracer`、`reporter`。
   - 统一 `app_id`、`micro_app_name`、`platform`、`version` 维度。

2. **统一 Trace Context**
   - 基座生成 Root Trace，子应用通过 `traceparent` 继续当前 Span。
   - 跨应用路由切换时保持 `trace_id` / `session_id`。

3. **错误归属**
   - 错误上报时携带 `app_name` 和 `micro_app_version`。
   - 对加载失败的微应用单独统计，便于区分基座问题与子应用问题。

4. **性能聚合**
   - 基座监听整体加载，子应用上报自身 mount / unmount / 渲染耗时。
   - 自定义微前端专用指标：`micro_app_load_duration`、`micro_app_switch_duration`。

5. **跨端适配**
   - Web：使用 `window`、Performance API、`fetch`。
   - 小程序：使用 `wx.onError`、`wx.getNetworkType`、自定义路由拦截。
   - React Native：使用 `ErrorUtils`、`Performance.now()`、Native 桥接。
   - 抽象平台层，统一接口。

6. **数据隔离与聚合**
   - 多租户/多应用在网关按 `app_id` 路由到不同索引。
   - Dashboard 既支持全局视图，也支持按应用下钻。

示例：微前端全局错误处理：

```js
import { init } from '@company/obs-sdk';

const sdk = init({ appId: 'portal', env: 'prod' });

// 子应用注册时注入 SDK
registerMicroApps([
  {
    name: 'order-app',
    entry: '//order.example.com',
    props: { $obs: sdk.child({ appName: 'order-app' }) },
  },
]);
```

**评分维度**：
- 能说明基座统一初始化与子应用复用（25%）
- 能说明跨应用 Trace Context 透传（25%）
- 能区分错误归属与微前端专用指标（25%）
- 能提到跨端抽象与数据隔离（25%）

**常见错误**：
- 每个子应用独立引入不同版本 SDK，数据格式不统一。
- 子应用切换后 Trace 断裂。
- 错误全部算到基座，无法定位具体微应用。

**延伸追问**：
- 微应用使用不同技术栈（Vue/React/纯 JS），SDK 如何兼容？
- 跨端场景下 WebView 与 Native 的链路如何串联？

**相关题目**：
- [FB-30-CO-A-013 OpenTelemetry 与前端链路追踪](#FB-30-CO-A-013)
- [FB-30-CO-P-018 分布式链路追踪核心概念](#FB-30-CO-P-018)

**参考资源**：
- [qiankun - 运行时沙箱](https://qiankun.umijs.org/zh/guide)
- [OpenTelemetry - Cross-service Tracing](https://opentelemetry.io/docs/concepts/signals/traces/)

**口头回答版**：
> 微前端和跨端统一可观测，关键是在基座只初始化一次 SDK，子应用复用同一个实例，带上 app_name 和版本维度。Trace 要在基座生成，子应用通过 traceparent 接力，路由切换时保持 trace_id。错误上报要区分是基座还是子应用的。跨端的话抽象平台层，Web 用 Performance API，小程序用 wx.onError，RN 用 ErrorUtils，底层接口统一。数据在网关按 app_id 路由，Dashboard 既能看全局也能下钻到具体应用。

---

### FB-30-EN-P-023：日志脱敏与合规（PII/敏感信息）在前端如何处理？

**题型**：工程化题  
**难度**：🔴 深入  
**岗位层级**：专家  
**面试知识域**：30 可观测性  
**标签**：observability、web-security、sdk、frontend-engineering、error-monitoring  
**出现频率**：中频  
**预计回答时长**：5-8 分钟

**题目描述**：
前端日志与埋点中可能包含手机号、身份证、Token 等敏感信息，请说明如何在采集、传输、存储阶段进行脱敏与合规处理。

**参考答案**：

敏感信息类型：

- 个人身份信息（PII）：手机号、身份证、邮箱、银行卡、地址。
- 认证信息：Token、Cookie、密码、API Key。
- 业务敏感：订单金额、用户行为轨迹。

处理原则：

- **最小必要**：只采集排障必需字段，避免完整用户输入。
- **默认脱敏**：除非显式放行，否则敏感字段脱敏。
- **端侧优先**：尽量在客户端输出前脱敏，减少服务端暴露面。
- **可审计**：保留脱敏规则版本与操作日志。

技术手段：

1. **字段白名单**
   明确定义允许输出的字段，其余字段默认不采集或哈希化。

2. **正则脱敏**

   ```js
   const MASK_RULES = [
     { key: /phone|mobile/i, pattern: /(\d{3})\d{4}(\d{4})/, replacer: '$1****$2' },
     { key: /idCard|id_card/i, pattern: /(\d{6})\d{8}(\d{4})/, replacer: '$1********$2' },
     { key: /token|password|cookie/i, pattern: /.*/, replacer: '***' },
   ];
   ```

3. **结构化日志预脱敏**

   ```js
   function sanitize(obj) {
     return deepMap(obj, (key, value) => {
       const rule = MASK_RULES.find(r => r.key.test(key));
       return rule ? value.toString().replace(rule.pattern, rule.replacer) : value;
     });
   }
   ```

4. **网关二次清洗**
   服务端再次扫描，发现 PII 模式则拦截或告警。

5. **合规能力**
   - 支持 GDPR “被遗忘权”：按用户 ID 删除相关日志。
   - 数据保留期限：PII 日志保留期更短或单独加密存储。
   - 用户同意管理：未同意追踪时不上报行为日志。

6. **安全传输**
   - 使用 HTTPS；上报接口鉴权；敏感字段额外加密。

**评分维度**：
- 能识别常见敏感信息类型（25%）
- 能提出端侧脱敏与正则规则（30%）
- 能说明网关二次清洗与保留策略（25%）
- 能提到 GDPR/CCPA/用户同意（20%）

**常见错误**：
- 只在服务端脱敏，客户端日志已泄露到网络。
- 用简单字符串替换导致误伤正常数据。
- 没有保留脱敏规则版本，排查时无法还原。

**延伸追问**：
- 如果日志里必须保留手机号用于客诉追踪，怎么办？
- 脱敏规则如何热更新而不影响线上 SDK？

**相关题目**：
- [FB-30-EN-A-012 设计前端日志采集 SDK](#FB-30-EN-A-012)
- [FB-30-SC-P-022 微前端/跨端统一可观测性](#FB-30-SC-P-022)

**参考资源**：
- [GDPR - Right to erasure](https://gdpr-info.eu/art-17-gdpr/)
- [OWASP - Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)

**口头回答版**：
> 前端日志脱敏要最小采集、默认脱敏、端侧优先。常见敏感信息像手机号、身份证、Token、密码都要处理。方法有字段白名单、正则脱敏、结构化日志遍历脱敏。服务端网关还要二次清洗。合规上要考虑 GDPR 的被遗忘权、数据保留期限、用户同意。传输必须用 HTTPS，敏感字段还可以额外加密。不能只在服务端脱敏，因为请求过程已经泄露了。

---

### FB-30-CP-P-024：发生线上 P0 故障时，如何利用可观测性数据快速定位根因？

**题型**：综合开放题  
**难度**：🔴 深入  
**岗位层级**：专家 / 架构师  
**面试知识域**：30 可观测性  
**标签**：observability、leadership、error-monitoring、performance、sdk  
**出现频率**：高频  
**预计回答时长**：8-15 分钟

**题目描述**：
假设你是 on-call 工程师，凌晨收到 P0 告警“核心支付流程成功率骤降”，请描述你会如何利用可观测性数据进行排查和止损。

**参考答案**：

事故响应流程：

1. **确认与召集（5 分钟内）**
   - 查看告警详情、影响范围、开始时间。
   - 在值班群创建事故频道，通知相关团队。

2. **止损优先**
   - 若怀疑发布引入，立即回滚或关闭灰度开关。
   - 若怀疑第三方服务，切换降级开关或熔断。
   - 记录变更时间，便于后续评估。

3. **数据下钻**
   - **指标**：支付成功率按 `page`、`version`、`region`、`platform` 分组，定位哪部分用户受影响。
   - **错误监控**：查看 Sentry 中支付相关 Issue，按版本聚合，找新增异常。
   - **链路**：抽样失败支付请求，看失败发生在前端、网关还是后端服务。
   - **日志**：查看失败请求的参数、响应码、错误消息。
   - **发布/配置变更**：比对故障开始时间与最近发布、配置中心变更、A/B 实验。

4. **根因假设与验证**
   - 列出可能根因：新代码 Bug、依赖服务故障、配置错误、CDN 异常、证书过期、限流。
   - 用数据逐一排除：若后端返回 503，则非前端问题；若 JS 报错在支付按钮点击后，则定位前端逻辑。

5. **修复与验证**
   - 修复后观察成功率、错误率、用户反馈恢复。
   - 保持低级别监控，防止回弹。

6. **复盘与改进**
   - 召开 blameless postmortem。
   - 记录根因、修复动作、检测延迟、改进项。
   - 补充监控与告警，防止同类故障再次发生。

**评分维度**：
- 响应流程清晰、止损优先（30%）
- 能综合指标、错误、链路、日志定位（30%）
- 能关联发布/配置变更（20%）
- 能提到复盘与改进（20%）

**常见错误**：
- 先排查根因再止损，导致故障扩大。
- 只看自己团队的指标，忽略上下游。
- 修复后不复盘，重复踩坑。

**延伸追问**：
- 如果监控数据本身缺失，你如何排查？
- 如何判断是前端 Bug 还是后端服务导致的成功率下降？

**相关题目**：
- [FB-30-SC-P-020 告警策略与降噪](#FB-30-SC-P-020)
- [FB-30-SD-R-026 设计前端 on-call 与事故响应机制](#FB-30-SD-R-026)

**参考资源**：
- [Google SRE - Incident Management](https://sre.google/workbook/incident-response/)

**口头回答版**：
> 收到 P0 我先确认影响范围和开始时间，拉群召集人。然后优先止损：怀疑发布就回滚，怀疑第三方就开降级。接着下钻数据：成功率按版本和地区拆分，Sentry 看新增异常，链路看失败发生在哪里，日志看具体报错和参数，再对最近发布和配置变更时间。定位根因修复后观察指标恢复，最后开复盘会，写 postmortem，补充监控避免再犯。


---

## 架构题（19 道）{#architect}

### FB-30-SD-R-025：设计一个前端 RUM 指标体系与 Dashboard

**题型**：系统设计题  
**难度**：⚫ 架构  
**岗位层级**：架构师  
**面试知识域**：30 可观测性  
**标签**：observability、performance、core-web-vitals、sdk、frontend-engineering  
**出现频率**：高频  
**预计回答时长**：15-30 分钟

**题目描述**：
请为一款大型电商 SPA 设计一套 RUM 指标体系与 Dashboard，覆盖页面加载、交互、业务关键路径，并说明指标定义、维度、聚合方式与告警策略。

**参考答案**：

指标体系分层：

| 层级 | 指标 | 说明 |
|------|------|------|
| 体验层 | LCP、INP、CLS、FCP、TTFB | Core Web Vitals |
| 加载层 | HTML 解析、JS 执行、首屏 API、关键资源 | 瀑布细分 |
| 交互层 | 路由切换耗时、按钮响应、长任务 | SPA 自定义 |
| 业务层 | 加购成功率、支付成功率、下单漏斗 | 业务黄金指标 |
| 稳定性 | JS 错误率、API 失败率、资源失败率 | 可用性 |

指标定义示例：

```text
rum_lcp_seconds{page,env,country,device_type,connection}
  -> 直方图 / summary，计算 p50/p75/p95/p99

rum_js_error_rate{page,version}
  -> 1m / 5m / 1h 滚动窗口

rum_api_success_rate{api_name,page}
  -> 成功请求 / 总请求
```

维度设计：

- 页面：`page`、`route`
- 版本：`release`、`build_id`
- 环境：`env`、`country`、`region`
- 设备：`device_type`、`os`、`browser`、`viewport`
- 网络：`connection`（4G/WiFi/慢 3G）
- 用户：`user_type`（新/老）、`experiment_id`

Dashboard 布局：

1. **全局概览**：核心 Web Vitals 健康度、JS 错误率、API 成功率、业务成功率。
2. **页面矩阵**：各页面 LCP/INP/CLS 热力图。
3. **趋势图**：按时间展示 p75 分位、错误率、失败请求数。
4. **地理/设备分布**：地图展示各国家/地区性能。
5. **异常下钻**：错误 Top 10、慢 Trace 列表、代表性用户会话回放链接。
6. **发布对比**：当前版本 vs 上一版本核心指标。

告警策略：

- P0：核心业务成功率下降 > 5%，持续 3 分钟。
- P1：LCP p75 > 2.5s 持续 10 分钟；JS 错误率 > 1% 持续 5 分钟。
- P2：某地区/某版本指标劣化 > 20%。

**评分维度**：
- 指标体系分层合理、覆盖体验/加载/交互/业务/稳定性（30%）
- 维度设计全面且避免高基数（20%）
- Dashboard 布局清晰、支持下钻（25%）
- 告警策略基于分位数与业务影响（25%）

**常见错误**：
- 维度过多导致指标基数爆炸。
- 只看平均值，忽略分位数。
- Dashboard 信息过载，缺少关键视图。

**延伸追问**：
- 如何衡量 Dashboard 本身对排障效率的提升？
- 指标维度中出现高基数标签时如何处理？

**相关题目**：
- [FB-30-PE-P-019 基于 Web Vitals 做性能监控](#FB-30-PE-P-019)
- [FB-30-CO-A-015 SLI/SLO/SLA](#FB-30-CO-A-015)

**参考资源**：
- [Google - CrUX Dashboard](https://developer.chrome.com/docs/crux/dashboard)
- [Grafana - Frontend Observability](https://grafana.com/solutions/frontend-observability/)

**口头回答版**：
> 我会把 RUM 指标分成体验层、加载层、交互层、业务层、稳定性五层。体验层是 LCP、INP、CLS 这些 Core Web Vitals；加载层看 HTML、JS、API 各阶段；交互层看 SPA 路由切换和按钮响应；业务层看加购、支付成功率；稳定性看 JS 错误率和 API 失败率。Dashboard 先放全局概览，再按页面矩阵、趋势、地理设备分布、异常下钻来组织。维度包括页面、版本、环境、国家、设备、网络。告警基于 p75 分位数和业务影响，比如支付成功率降 5% 就 P0。

---

### FB-30-SD-R-026：如何从零构建前端 SRE 值班（on-call）与事故响应机制？

**题型**：系统设计题  
**难度**：⚫ 架构  
**岗位层级**：架构师  
**面试知识域**：30 可观测性  
**标签**：observability、leadership、error-monitoring、sdk、performance  
**出现频率**：中频  
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套适合前端团队的 SRE 值班与事故响应机制，包括值班轮换、告警升级、事故流程、工具链与复盘文化。

**参考答案**：

机制设计：

1. **值班轮换**
   - 按周/双周轮换，初级+高级搭配，避免单人长期值班。
   - 明确主 on-call（响应）与次 on-call（backup）。
   - 节假日安排专项值班表，提前通知。

2. **告警分级与响应时限**

   | 级别 | 响应时间 | 处理目标 | 升级路径 |
   |------|----------|----------|----------|
   | P0 | 5 分钟 | 30 分钟止损 | 15 分钟未响应升级主管 |
   | P1 | 15 分钟 | 2 小时恢复 | 30 分钟升级 |
   | P2 | 1 小时 | 当天处理 | 工单 |
   | P3 | 1 工作日 | 排期优化 | 周会跟踪 |

3. **工具链**
   - 监控告警：Prometheus + Alertmanager / Datadog / New Relic。
   - 事件管理：PagerDuty / Opsgenie。
   - 沟通：Slack/钉钉/飞书机器人 + 专用事故频道。
   - 文档：Runbook 仓库、Dashboard、Postmortem 模板。

4. **事故响应流程**
   - 检测 → 确认 → 召集 → 止损 → 定位 → 修复 → 验证 → 复盘。
   - 每个阶段指定负责人（Incident Commander）。
   - 保持沟通：定期更新事故状态页，减少信息噪音。

5. **Runbook 与 Playbook**
   - 针对每种高频告警编写操作手册：
     - 页面白屏排查清单。
     - JS 错误率突增排查清单。
     - API 失败排查清单。
   - 包含关键 Dashboard、日志查询语句、常用命令、回滚步骤。

6. **复盘文化**
   - Blameless Postmortem：关注流程与系统，不指责个人。
   - 记录：时间线、根因、影响、修复、检测延迟、改进项。
   - 跟踪：改进项进入迭代 backlog，设定 owner 与 deadline。

7. **度量指标**
   - MTTD（平均检测时间）、MTTR（平均恢复时间）、MTBF（平均故障间隔）。
   - 告警量、误报率、重复告警率。

**评分维度**：
- 值班轮换与升级机制合理（25%）
- 事故响应流程完整（25%）
- Runbook 与工具链设计落地（25%）
- 复盘文化与度量指标（25%）

**常见错误**：
- 只有告警没有值班，问题无人处理。
- 告警全部 P0，导致值班人员疲劳。
- 复盘变成追责会，团队隐瞒问题。

**延伸追问**：
- 如何说服业务团队投入时间做 Runbook？
- 前端 on-call 与后端 on-call 如何协作？

**相关题目**：
- [FB-30-SC-P-020 告警策略与降噪](#FB-30-SC-P-020)
- [FB-30-CP-P-024 P0 故障根因定位](#FB-30-CP-P-024)

**参考资源**：
- [Google SRE - Being On-Call](https://sre.google/workbook/being-on-call/)
- [PagerDuty - Incident Response](https://www.pagerduty.com/resources/learn/incident-response/)

**口头回答版**：
> 前端 SRE 值班我设计成按周轮换，主 on-call 加 backup。告警分 P0 到 P3，P0 五分钟响应、十五分钟升级主管。工具链用 Alertmanager 或 PagerDuty 发告警，IM 建事故频道，Dashboard 和 Runbook 提前准备好。事故响应流程是检测、确认、召集、止损、定位、修复、验证、复盘。每个高频故障都要有 Runbook，写清怎么看 Dashboard、怎么回滚、联系谁。复盘要 blameless，关注系统改进，记录 MTTD、MTTR，跟踪改进项。

---

### FB-30-CP-R-027：如何评估并控制可观测性数据的生命周期与成本？

**题型**：综合开放题  
**难度**：⚫ 架构  
**岗位层级**：架构师  
**面试知识域**：30 可观测性  
**标签**：observability、tech-debt、sdk、performance、frontend-engineering  
**出现频率**：中频  
**预计回答时长**：15-30 分钟

**题目描述**：
作为架构师，请从数据生命周期、存储分层、成本控制、治理机制等角度，阐述如何管理前端可观测性数据，避免数据膨胀导致成本失控。

**参考答案**：

数据生命周期管理：

```text
产生 -> 采集 -> 传输 -> 处理 -> 存储 -> 查询 -> 归档/删除
```

每个阶段成本优化：

1. **产生与采集**
   - 只采集与业务目标相关的信号。
   - 使用分级采样：错误全采、行为采样、性能采样。
   - 避免在循环、高频事件（scroll/mousemove）中无节制埋点。

2. **传输**
   - 客户端压缩、批量上报。
   - 使用边缘节点接入，减少跨区域流量。

3. **处理**
   - 网关侧清洗、去重、脱敏、丢弃调试日志。
   - 预聚合高频指标，避免存储原始事件。

4. **存储分层**

   | 层级 | 保留期 | 存储介质 | 用途 |
   |------|--------|----------|------|
   | 热数据 | 1-7 天 | SSD / 内存 | 实时排障 |
   | 温数据 | 7-30 天 | 普通磁盘 | 趋势分析 |
   | 冷数据 | 30-90 天 | 对象存储 | 合规与审计 |
   | 归档 | 1-3 年 | 廉价归档 | 法律要求 |

5. **查询与计算**
   - 限制高基数查询；预计算常用 Dashboard。
   - 对历史数据降精度（1 分钟 → 5 分钟 → 1 小时 → 1 天）。

6. **治理机制**
   - 成本归因：按应用/团队拆分账单。
   - 预算制度：设定月度可观测性预算，超限触发审查。
   - 数据 SLA：定义每种信号的保留期、采样率、查询 SLA。
   - 定期审计：清理无用 Dashboard、过期告警、僵尸指标。

成本评估模型：

```text
月度成本 ≈ 采集事件数 × 平均事件体积 × 保留天数 × 单位存储价格
         + 查询扫描数据量 × 单位计算价格
         + 网络出口流量 × 单位流量价格
```

**评分维度**：
- 数据生命周期阶段完整（25%）
- 存储分层与降精度策略合理（25%）
- 成本模型与预算治理清晰（25%）
- 能平衡成本与可观测性（25%）

**常见错误**：
- 只关注存储，忽略采集和计算成本。
- 为了省钱过度采样，导致关键故障无法复现。
- 没有按团队拆分账单，成本责任不清。

**延伸追问**：
- 如何向业务方证明可观测性投入的 ROI？
- 如果预算砍掉一半，你会优先保留哪些数据？

**相关题目**：
- [FB-30-CO-P-021 可观测性数据成本](#FB-30-CO-P-021)
- [FB-30-SD-R-028 多租户可观测中台](#FB-30-SD-R-028)

**参考资源**：
- [FinOps - Cloud Cost Management](https://www.finops.org/)
- [OpenTelemetry - Sampling](https://opentelemetry.io/docs/concepts/sampling/)

**口头回答版**：
> 可观测性数据成本要从生命周期每一阶段控制。采集阶段只采相关信号，错误全采、行为和性能采样。传输用压缩和批量。处理时网关清洗去重脱敏，预聚合高频指标。存储分热温冷归档四层，热数据放 SSD 保七天，冷数据归档。查询限制高基数，历史数据降精度。治理上按团队拆分账单，设月度预算，定期审计僵尸指标和过期告警。成本模型要考虑事件数、体积、保留天数、查询量和网络流量。

---

### FB-30-SD-R-028：设计一个支持多租户、多环境的前端埋点与可观测中台

**题型**：系统设计题  
**难度**：⚫ 架构  
**岗位层级**：架构师  
**面试知识域**：30 可观测性  
**标签**：observability、sdk、frontend-engineering、api-design、performance-optimization  
**出现频率**：中频  
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个面向公司多个前端应用、多个环境（开发/测试/生产）、多个租户的前端埋点与可观测中台，要求支持数据隔离、权限控制、成本分摊与灵活扩展。

**参考答案**：

总体架构：

```text
┌──────────────────────────────────────────────┐
│              前端应用 / SDK                   │
│   埋点、错误、性能、日志、链路统一上报        │
└──────────────┬───────────────────────────────┘
               │ HTTPS / Beacon / OTLP
┌──────────────▼───────────────────────────────┐
│              接入网关                         │
│  鉴权、限流、租户路由、数据脱敏、协议转换     │
└──────┬────────────┬────────────┬─────────────┘
       │            │            │
   指标存储      日志存储       链路存储
  (TSDB)      (ClickHouse)   (Tempo/Jaeger)
       │            │            │
   元数据与权限   查询引擎       可视化层
  (租户/应用/用户) (统一查询 DSL) (Grafana/自建)
```

关键设计：

1. **租户与应用模型**
   - 每个租户有独立 `tenant_id`，每个应用有 `app_id`、`env`。
   - 元数据服务管理租户 → 应用 → 环境 → 数据集的映射。

2. **数据隔离**
   - 物理隔离：核心租户独立集群。
   - 逻辑隔离：同一集群内按 `tenant_id` 分库/分表/索引前缀。
   - 网关层校验 JWT/AK/SK，确保租户只能访问自己的数据。

3. **权限控制**
   - RBAC：管理员、开发者、只读用户。
   - 数据权限：按应用、环境、敏感字段控制。
   - API 权限：限制查询时间范围、并发、导出。

4. **SDK 与插件化**
   - 核心 SDK 提供统一 API：`track`, `log`, `reportError`, `startSpan`。
   - 插件体系：Web 插件、小程序插件、RN 插件、私有化插件。
   - 配置中心：支持按租户/应用动态下发采样率、埋点开关、黑名单。

5. **成本分摊**
   - 在每条数据中注入 `tenant_id`、`app_id`、`env`。
   - 计费系统按数据量、查询量、存储量生成账单。
   - 超额租户触发限流或升配。

6. **扩展性**
   - Collector 水平扩展，Kafka/Pulsar 做缓冲。
   - 存储层支持按租户/时间分片。
   - 查询层统一 DSL，后端路由到不同存储。

7. **数据质量**
   - Schema 校验、去重、补全缺失字段。
   - 血缘追踪：埋点定义 → SDK → 存储 → Dashboard。

**评分维度**：
- 多租户隔离与权限设计合理（30%）
- SDK 与中台架构清晰（25%）
- 成本分摊与扩展性考虑（25%）
- 数据质量与 Schema 治理（20%）

**常见错误**：
- 所有租户共享同一索引，导致查询越权或性能互相影响。
- SDK 功能大而全，无法按需裁剪。
- 缺少数据血缘，埋点废弃后存储仍保留。

**延伸追问**：
- SaaS 多租户与私有化部署如何共用同一套中台？
- 如何处理租户间查询热点不均导致的资源争抢？

**相关题目**：
- [FB-30-EN-A-012 设计前端日志采集 SDK](#FB-30-EN-A-012)
- [FB-30-SC-P-022 微前端/跨端统一可观测性](#FB-30-SC-P-022)

**参考资源**：
- [OpenTelemetry - Collector](https://opentelemetry.io/docs/collector/)
- [ClickHouse - Multi-tenant Design](https://clickhouse.com/docs/en/cloud/bestpractices/multi-tenant-design)

**口头回答版**：
> 多租户可观测中台前端用统一 SDK 上报埋点、错误、性能、链路，接入网关做鉴权、限流、租户路由和脱敏。数据按租户和应用隔离，可以物理独立集群或逻辑分索引。权限用 RBAC，按应用和环境控制。SDK 做成插件化，支持 Web、小程序、RN，配置中心动态下发采样率和开关。成本按 tenant_id、app_id 分摊，超额的限流或升配。存储层按时间和租户分片，查询层统一 DSL，后面对接 TSDB、ClickHouse、Tempo。还要做 Schema 校验和数据血缘，防止垃圾数据长期留存。

---

### FB-30-SC-R-029：如何在大型前端工程中平衡监控覆盖度与性能开销？

**题型**：场景设计题  
**难度**：⚫ 架构  
**岗位层级**：架构师  
**面试知识域**：30 可观测性  
**标签**：observability、performance、sdk、frontend-engineering、tech-debt  
**出现频率**：高频  
**预计回答时长**：8-15 分钟

**题目描述**：
在大型前端工程中，全面的监控可能带来 SDK 体积、运行时开销、网络请求增加等问题。请说明如何在监控覆盖度和性能开销之间取得平衡。

**参考答案**：

平衡策略：

1. **按需加载 SDK**
   - 核心 SDK 极简，功能模块懒加载：
     - 错误监控默认加载。
     - RUM、链路追踪按页面或用户比例动态加载。
   - 使用 tree-shaking，剔除未使用功能。

2. **关键路径优先**
   - 重点监控核心用户旅程：首页、登录、商品详情、加购、支付。
   - 非关键页面降低采样率或不采集链路。

3. **采样策略精细化**
   - 错误和异常全采或高采样。
   - 性能数据按会话采样，保持稳定用户一致性。
   - 交互埋点按事件重要性分级采样。

4. **运行时开销控制**
   - 避免在 scroll、mousemove 等高频事件中实时计算/上报。
   - 批量上报、requestIdleCallback、Web Worker 处理序列化。
   - 限制单次上报体积和并发数。

5. **性能预算（Performance Budget）**
   - 设定 SDK 体积预算：如核心包 < 5KB gzipped。
   - 设定运行时开销预算：监控任务 CPU 占用 < 3%、额外网络流量 < 1%。
   - 在 CI 中跑基准测试，超标阻断发布。

6. **效果度量与持续裁剪**
   - 定期 review 埋点使用率，下线无人问津的指标。
   - 使用 RUM 监控监控 SDK 自身的性能：初始化耗时、上报耗时、失败率。

示例预算：

```text
监控 SDK 体积预算：
- 核心包：5 KB gzipped
- 错误 + RUM：12 KB gzipped
- 全功能（含链路）：20 KB gzipped

运行时预算：
- 初始化耗时 < 50 ms
- 主线程长任务增加 < 1%
- 页面关闭前未发送数据丢失率 < 0.1%
```

**评分维度**：
- 能提出按需加载、采样、批量等具体手段（35%）
- 能设定性能预算与 CI 检查（25%）
- 能区分关键路径与非关键路径（20%）
- 能持续度量监控自身开销（20%）

**常见错误**：
- 全量全功能监控，导致首屏变差。
- 只看覆盖率，不看真实使用率。
- 没有性能预算，无法量化权衡。

**延伸追问**：
- 如果业务方坚持要全量采集，你如何说服？
- 监控 SDK 自身的性能问题如何被监控？

**相关题目**：
- [FB-30-SC-A-014 高频埋点不阻塞业务](#FB-30-SC-A-014)
- [FB-30-CP-R-027 可观测性数据生命周期与成本](#FB-30-CP-R-027)

**参考资源**：
- [web.dev - Performance Budgets](https://web.dev/articles/performance-budgets-101)

**口头回答版**：
> 大型工程里不能全量全开监控。我按关键路径优先，核心用户旅程重点监控，其他页面降低采样。SDK 核心包要极简，RUM、trace 这些功能可以懒加载或按用户比例加载。运行时高频事件不能实时上报，要批量、用 requestIdleCallback、放 Worker。还要设性能预算，比如核心 SDK 小于 5KB、初始化小于 50ms、CPU 占用小于 3%，CI 里跑基准测试。定期 review 哪些埋点没人用就下线，用 RUM 监控监控 SDK 自己。

---

### FB-30-CP-R-030：请给出从“指标异常”到“根因定位”的完整可观测性工作流

**题型**：综合开放题  
**难度**：⚫ 架构  
**岗位层级**：架构师  
**面试知识域**：30 可观测性  
**标签**：observability、error-monitoring、performance、sdk、frontend-engineering  
**出现频率**：高频  
**预计回答时长**：15-30 分钟

**题目描述**：
请以一个具体的线上指标异常为例，描述从发现异常到定位根因的完整可观测性工作流，包括使用的数据、工具和决策点。

**参考答案**：

以“首页 LCP p75 从 1.8s 上升到 3.5s”为例：

**1. 发现异常**
- Dashboard 告警：LCP p75 > 2.5s 持续 10 分钟。
- 关联信息：告警开始时间 14:05，对应 release `v2.3.1` 灰度 30%。

**2. 确认影响面**
- 按维度切片：
  - 按 `country`：仅美国用户上升，其他地区正常。
  - 按 `device_type`：移动端明显，桌面端正常。
  - 按 `connection`：WiFi 也慢，排除弱网。
- 结论：v2.3.1 在美国移动端用户上影响首页 LCP。

**3. 查看相关指标**
- FCP 正常，TTFB 正常，资源加载耗时上升。
- JS 错误率未上升，API 成功率未下降。
- CDN 命中率在美国节点下降。

**4. 下钻到链路/资源**
- 抽样美国移动端慢请求，查看 Navigation Timing 和 Resource Timing。
- 发现 `hero-banner.jpg` 从美国东部节点加载耗时 2.8s，且未被压缩。
- Trace 显示图片加载阻塞 LCP。

**5. 查看日志与发布**
- 代码变更记录：v2.3.1 把首页 Banner 替换为 4K 原图，未走图片压缩服务。
- Sentry 无新增错误，确认非 JS 异常。

**6. 根因与修复**
- 根因：新 Banner 图片过大 + CDN 节点未命中，导致移动端 LCP 恶化。
- 修复：回滚到压缩图，启用 WebP/AVIF 自适应，CDN 预热。

**7. 验证与复盘**
- 观察 30 分钟后 LCP p75 回到 1.7s。
- Postmortem：图片资源缺少大小校验和监控，CI 增加图片体积门禁。

决策点总结：

| 决策点 | 判断依据 |
|--------|----------|
| 是否回滚 | 影响面大、修复时间长则先回滚 |
| 是否前端问题 | FCP/TTFB/API 指标排除后端 |
| 是否 CDN 问题 | Resource Timing + CDN 命中率 |
| 是否代码引入 | Release 时间与变更内容 |

**评分维度**：
- 工作流完整、有具体案例（30%）
- 能结合指标切片、链路、日志、发布（30%）
- 决策点清晰、有止损意识（20%）
- 能闭环验证与复盘（20%）

**常见错误**：
- 只看单一指标，不做维度切片。
- 没有关联发布变更，盲目优化。
- 修复后不复盘，重复犯错。

**延伸追问**：
- 如果异常只在单个用户出现，这套工作流如何调整？
- 如何自动化部分根因定位步骤？

**相关题目**：
- [FB-30-CP-P-024 P0 故障根因定位](#FB-30-CP-P-024)
- [FB-30-SD-R-025 设计 RUM 指标体系与 Dashboard](#FB-30-SD-R-025)

**参考资源**：
- [Google SRE - Monitoring](https://sre.google/sre-book/monitoring-distributed-systems/)

**口头回答版**：
> 比如首页 LCP p75 从 1.8 升到 3.5。先看告警时间和对应发布，发现 v2.3.1 灰度。然后按国家、设备、网络切片，发现只有美国移动端慢。再看 FCP、TTFB、资源加载，资源加载慢，CDN 命中率低。抽样链路看 Resource Timing，发现 hero banner 图片从美国节点加载慢，而且很大。查代码变更，发现新版本用了 4K 原图没压缩。根因确认后回滚或替换图片，半小时后指标恢复。复盘补图片体积门禁。关键是每一步都有决策依据：影响大就先回滚，排除后端再看资源，最后关联代码变更。

---

### FB-30-SD-R-031：设计一个前端灰度发布/回滚的可观测性方案

**题型**：系统设计题  
**难度**：⚫ 架构  
**岗位层级**：架构师  
**面试知识域**：30 可观测性  
**标签**：observability、performance、sdk、frontend-engineering、leadership  
**出现频率**：中频  
**预计回答时长**：15-30 分钟

**题目描述**：
请为前端灰度发布设计一套可观测性方案，使团队能够在灰度过程中及时发现异常并自动或半自动回滚。

**参考答案**：

方案目标：

- 实时监控灰度用户的核心指标。
- 快速对比灰度组 vs 基准组。
- 异常时自动触发回滚或告警通知人工介入。

架构组成：

```text
发布平台
   │
   ├── 标记灰度用户（cookie / header / CDN 边缘规则）
   │
灰度组用户  <--->  新版本资源  <--->  RUM/错误/链路 SDK
   │
   └── 指标对比服务：灰度组 vs 基准组
            │
            ├── 自动回滚触发器（P0 异常）
            └── 人工确认告警（P1/P2 异常）
```

核心指标：

| 类别 | 指标 | 灰度目标 |
|------|------|----------|
| 稳定性 | JS 错误率、API 失败率、资源失败率 | 不高于基准组 120% |
| 性能 | LCP、INP、CLS、FCP | 不劣于基准组 10% |
| 业务 | 转化率、支付成功率、关键漏斗 | 无显著下降 |
| 可用性 | 白屏率、页面崩溃率 | 不高于基准组 |

实现步骤：

1. **灰度标记注入**
   - 在 HTML/JS 中通过 `window.__release__` 或响应头暴露 `release`、`bucket`。
   - SDK 上报时自动带上 `release` 和 `is_canary` 标签。

2. **实时对比看板**
   - 同一 Dashboard 展示灰度组与基准组的指标曲线。
   - 显示 diff 百分比与统计显著性（如 p-value）。

3. **自动告警规则**
   - P0：JS 错误率 / 白屏率 / 支付成功率异常，立即触发回滚。
   - P1：性能指标劣化超过阈值，通知负责人决策。

4. **回滚触发器**
   - 与发布平台集成：调用回滚 API 切换流量到稳定版本。
   - 半自动：先告警，人工一键回滚。
   - 自动：仅针对明确且影响大的 P0 指标。

5. **发布标记（Release Markers）**
   - 在指标时间轴上标注发布、回滚、配置变更事件，便于复盘。

6. **采样与人群均衡**
   - 灰度组与基准组用户属性尽量一致（地域、设备、网络）。
   - 关键业务用户先小流量灰度，再逐步扩大。

示例告警：

```yaml
- alert: CanaryJSErrorRateHigh
  expr: |
    (
      sum(rate(rum_js_errors{release="v2.3.1"}[5m]))
      /
      sum(rate(rum_page_views{release="v2.3.1"}[5m]))
    )
    >
    1.2 * (
      sum(rate(rum_js_errors{release="v2.3.0"}[5m]))
      /
      sum(rate(rum_page_views{release="v2.3.0"}[5m]))
    )
  severity: P0
  action: auto_rollback
```

**评分维度**：
- 灰度标记与指标对比设计合理（30%）
- 能覆盖稳定性、性能、业务三类指标（25%）
- 自动/半自动回滚机制清晰（25%）
- 能考虑人群均衡与发布标记（20%）

**常见错误**：
- 灰度组与基准组用户差异大，导致对比无意义。
- 只看错误率，忽略性能和业务指标。
- 自动回滚阈值过松或过严。

**延伸追问**：
- 灰度过程中如何区分是版本问题还是第三方服务波动？
- 自动回滚触发后，如何确保缓存和 CDN 也同步回滚？

**相关题目**：
- [FB-30-SD-R-025 设计 RUM 指标体系与 Dashboard](#FB-30-SD-R-025)
- [FB-30-CP-R-030 指标异常到根因工作流](#FB-30-CP-R-030)

**参考资源**：
- [Google SRE - Release Engineering](https://sre.google/workbook/release/)
- [Flagger - Canary Deployments](https://flagger.app/)

**口头回答版**：
> 灰度发布可观测性关键是对比灰度组和基准组。首先在资源或响应头里打 release 和 canary 标记，SDK 上报自动带上。Dashboard 同时展示两组指标，看 diff。指标分三类：稳定性看 JS 错误率、白屏率；性能看 LCP、INP、CLS；业务看转化率、支付成功率。P0 异常自动触发回滚，P1 通知人工。还要在时间轴上标记发布和回滚事件。灰度人群要和基准组尽量均衡，避免地域设备差异影响判断。

---

### FB-30-SS-R-032：作为前端架构师，你如何推动团队建立可观测性文化？

**题型**：软技能题  
**难度**：⚫ 架构  
**岗位层级**：架构师  
**面试知识域**：30 可观测性  
**标签**：observability、leadership、sdk、frontend-engineering、tech-debt  
**出现频率**：中频  
**预计回答时长**：8-15 分钟

**题目描述**：
可观测性不仅是工具和平台，更需要团队文化。请说明作为前端架构师，你会如何从流程、规范、激励等方面推动团队建立可观测性文化。

**参考答案**：

推动策略：

1. **建立标准与规范**
   - 制定《前端可观测性规范》：哪些场景必须埋点、错误如何分类、日志级别怎么用。
   - 提供统一的 SDK 与脚手架模板，降低接入成本。
   - Code Review Checklist 中加入可观测性项：是否有错误边界、关键路径是否有指标、是否泄露敏感信息。

2. **融入开发流程**
   - 设计阶段：识别关键用户旅程，定义 SLI/SLO。
   - 开发阶段：按规范接入监控、埋点、链路。
   - 发布阶段：灰度必须有 Dashboard 对比，发布失败自动回滚。
   - 复盘阶段：每个 P1+ 事故必须有 Postmortem，并补充监控缺口。

3. **平台化与自助化**
   - 搭建一站式可观测平台，让业务团队能自助查看指标、Trace、日志。
   - 提供预置 Dashboard 模板，减少重复搭建。
   - 建立指标市场 / 埋点字典，方便查询已有指标含义。

4. **培训与赋能**
   - 定期分享真实排障案例，展示可观测性的价值。
   - 组织 on-call 轮值，让工程师直面问题。
   - 编写 Runbook，沉淀排查经验。

5. **激励与度量**
   - 将监控覆盖率、错误修复时效纳入团队 OKR 或绩效。
   - 设立“最佳排障案例奖”，鼓励主动优化可观测性。
   - 度量指标：关键路径监控覆盖率、MTTR、误报率、Postmortem 完成率。

6. **以身作则**
   - 架构师亲自参与 on-call、写 Runbook、做 Postmortem。
   - 在事故复盘时强调系统改进而非个人追责。

**评分维度**：
- 能从规范、流程、平台、培训多维度推动（40%）
- 能提出可量化的激励与度量（25%）
- 能强调 blameless 文化与以身作则（20%）
- 能结合前端特点（如关键路径、灰度发布）（15%）

**常见错误**：
- 只推工具，不推流程和文化。
- 监控规范太复杂，团队抵触。
- 把可观测性当成运维团队的事，前端不参与。

**延伸追问**：
- 如果业务团队以“赶工期”为由拒绝接入监控，你怎么应对？
- 如何向管理层证明可观测性投入的价值？

**相关题目**：
- [FB-30-SD-R-026 设计前端 on-call 与事故响应机制](#FB-30-SD-R-026)
- [FB-30-CP-P-024 P0 故障根因定位](#FB-30-CP-P-024)

**参考资源**：
- [Google SRE - Organizational Culture](https://sre.google/workbook/overloaded/)
- [Accelerate - DevOps Culture](https://itrevolution.com/accelerate-book/)

**口头回答版**：
> 推动可观测性文化不能光靠工具。首先定规范和 SDK，Code Review 里加可观测性检查项。然后把它嵌入全流程：设计时定 SLI/SLO，开发时接入监控，发布时看灰度 Dashboard，复盘时补监控缺口。平台要自助化，提供模板和埋点字典。还要培训、分享真实案例、轮值 on-call。激励上可以把监控覆盖率和 MTTR 进 OKR，设最佳排障案例奖。最重要的是以身作则，架构师自己参与值班和复盘，强调 blameless，让团队觉得可观测性是大家的事。
### FB-30-CP-B-001：什么是可观测性？它和监控有什么区别？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是可观测性？它和监控有什么区别。

**参考答案**：

可观测性（Observability）是通过系统的外部输出（日志、指标、追踪）理解系统内部状态的能力。它帮助我们回答“为什么会这样”的未知问题。

监控（Monitoring）是预定义指标和告警，告诉你“已知的问题是否发生”。

区别：
- 监控是“我问你答”，问题是预设的，如“接口错误率是否超过 1%”。
- 可观测性是“你告诉我为什么”，能回答未知问题，如“为什么这个用户下单失败”。

可观测性三大支柱：Logs（日志）、Metrics（指标）、Traces（链路追踪）。

**评分维度**：
- 概念准确（30%）
- 能区分监控和可观测性（30%）
- 能说出三大支柱（20%）
- 表达清晰（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 可观测性（Observability）是通过系统的外部输出（日志、指标、追踪）理解系统内部状态的能力。 它帮助我们回答“为什么会这样”的未知问题。 监控（Monitoring）是预定义指标和告警，告诉你“已知的问题是否发生”。 区别： - 监控是“我问你答”，问题是预设的，如“接口错误率是否超过 1%”。

---

### FB-30-PE-B-006：Core Web Vitals 包含哪些指标？如何优化？

**题型**：性能优化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
Core Web Vitals 包含哪些指标？如何优化。

**参考答案**：

Core Web Vitals 是 Google 提出的核心性能指标，直接影响搜索排名和用户体验：

- **LCP（Largest Contentful Paint）**：最大内容渲染时间，目标 ≤ 2.5s。衡量加载性能。
- **INP（Interaction to Next Paint）**：交互响应时间，目标 ≤ 200ms。衡量交互响应性。
- **CLS（Cumulative Layout Shift）**：累积布局偏移，目标 ≤ 0.1。衡量视觉稳定性。

优化方向：
- **LCP**：优化图片/视频加载、使用 CDN、预加载关键资源、SSR/SSG、服务端响应优化。
- **INP**：减少长任务、使用 Web Worker、优化事件处理、避免强制同步布局。
- **CLS**：为图片/广告预留尺寸、避免插入未定义尺寸的内容、字体加载优化（font-display）。

```js
import { getLCP, getINP, getCLS } from 'web-vitals';

getLCP(console.log);
getINP(console.log);
getCLS(console.log);
```

**评分维度**：
- 指标解释准确（30%）
- 优化方案具体（35%）
- 有代码示例（15%）
- 有实际优化经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> Core Web Vitals 是 Google 提出的核心性能指标，直接影响搜索排名和用户体验： - LCP（Largest Contentful Paint）：最大内容渲染时间，目标 ≤ 2.5s。 - INP（Interaction to Next Paint）：交互响应时间，目标 ≤ 200ms。 - CLS（Cumulative Layout Shift）：累积布局偏移，目标 ≤ 0.1。 优化方向： - LCP：优化图片/视频加载、使用 CDN、预加载关键资源、SSR/SSG、服务端响应优化。

---

### FB-30-CO-B-009：前端错误监控应该怎么做？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
前端错误监控应该怎么做。

**参考答案**：

前端错误监控需要覆盖采集、上报、展示、告警四个环节。

1. **采集**：
   - 监听 `window.onerror` 捕获 JS 运行时错误。
   - 监听 `window.onunhandledrejection` 捕获 Promise 未处理拒绝。
   - 框架错误边界捕获组件错误（React Error Boundary、Vue errorHandler）。
   - 监听资源加载错误（`error` 事件）。
2. **上报**：
   - 异步批量上报，避免阻塞业务。
   - 包含上下文：用户 ID、页面路径、版本号、设备信息、堆栈、用户操作路径。
   - Source Map 还原真实错误位置。
3. **展示**：
   - 按错误类型、页面、版本、设备聚合。
   - 支持查看错误详情、用户操作路径、影响范围。
4. **告警**：
   - 核心页面错误率超过阈值时告警。
   - 新增错误、错误量突增时告警。

```js
window.addEventListener('error', (e) => {
  reportError({ message: e.message, filename: e.filename, lineno: e.lineno, stack: e.error?.stack });
});

window.addEventListener('unhandledrejection', (e) => {
  reportError({ message: e.reason?.message, stack: e.reason?.stack, type: 'unhandledrejection' });
});
```

**评分维度**：
- 采集全面（30%）
- 上下文完整（20%）
- 展示和告警设计合理（20%）
- 有代码示例（10%）
- 有实战经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 前端错误监控需要覆盖采集、上报、展示、告警四个环节。 1. 采集：    - 监听 window.onerror 捕获 JS 运行时错误。 - 监听 window.onunhandledrejection 捕获 Promise 未处理拒绝。 - 框架错误边界捕获组件错误（React Error Boundary、Vue errorHandler）。

---

### FB-30-CO-B-010：什么是 SLO、SLA、Error Budget？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是 SLO、SLA、Error Budget。

**参考答案**：

- **SLI（Service Level Indicator）**：服务等级指标，是可量化的指标，如页面加载成功率、接口 P99 延迟。
- **SLO（Service Level Objective）**：服务等级目标，是基于 SLI 设定的内部目标，如加载成功率 ≥ 99.9%。
- **SLA（Service Level Agreement）**：服务等级协议，是对用户的正式承诺，通常包含赔偿条款，一般比 SLO 更宽松。
- **Error Budget**：错误预算，是 SLO 允许失败的额度。例如 99.9% 的可用性意味着每年约有 8.76 小时的停机预算。

关系：
- SLI 是度量，SLO 是目标，SLA 是对外承诺，Error Budget 是允许失败的额度。
- 当 Error Budget 耗尽时，应暂停发布或非关键变更，优先恢复稳定性。

**评分维度**：
- 概念准确（35%）
- 能区分四者关系（30%）
- 能举例说明（20%）
- 理解 Error Budget 意义（15%）

---

## 二、进阶题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - SLI（Service Level Indicator）：服务等级指标，是可量化的指标，如页面加载成功率、接口 P99 延迟。 - SLO（Service Level Objective）：服务等级目标，是基于 SLI 设定的内部目标，如加载成功率 ≥ 99.9%。 - SLA（Service Level Agreement）：服务等级协议，是对用户的正式承诺，通常包含赔偿条款，一般比 SLO 更宽松。 - Error Budget：错误预算，是 SLO 允许失败的额度。

---

### FB-30-SD-A-001：设计一个前端监控体系。

**题型**：系统设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
设计一个前端监控体系。。

**参考答案**：

前端监控体系应包含以下模块：

1. **错误监控**：JS 错误、资源错误、接口错误、框架异常、白屏检测。
2. **性能监控**：Core Web Vitals、自定义性能指标、资源加载时间、接口耗时。
3. **业务埋点**：用户行为、转化漏斗、功能使用、AB 实验数据。
4. **日志**：结构化日志，支持检索和分析。
5. **告警**：分级告警，少而精，避免告警疲劳。
6. **可视化**：Dashboard 展示核心指标和趋势。
7. **链路追踪**：关键用户操作链路追踪，关联前后端请求。

工具选择：
- 错误监控：Sentry、Fundebug。
- 性能监控：Web Vitals + 自研或 ARMS/New Relic。
- 业务埋点：自研埋点 + 数据分析平台（GA、神策、GrowingIO）。
- 日志：ELK / Loki / Splunk。
- 指标：Prometheus + Grafana。
- 链路：OpenTelemetry + Jaeger。

设计原则：
- 低侵入：SDK 接入简单，不影响业务性能。
- 采样率：高流量场景合理采样，降低成本。
- 数据隐私：遵守 GDPR、个人信息保护法，敏感信息脱敏。

**评分维度**：
- 体系完整（30%）
- 工具选型合理（20%）
- 考虑数据隐私（15%）
- 考虑采样和侵入性（15%）
- 有实际搭建经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 前端监控体系应包含以下模块： 1. 错误监控：JS 错误、资源错误、接口错误、框架异常、白屏检测。 2. 性能监控：Core Web Vitals、自定义性能指标、资源加载时间、接口耗时。 3. 业务埋点：用户行为、转化漏斗、功能使用、AB 实验数据。 4. 日志：结构化日志，支持检索和分析。

---

### FB-30-SD-A-002：如何设计一个高可用的前端发布流程？

**题型**：系统设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何设计一个高可用的前端发布流程。

**参考答案**：

高可用发布流程需要在每个环节设置质量门禁和回滚能力。

发布流程：
1. 代码审查 + 自动化测试通过。
2. 构建产物 + 静态资源上传到 CDN。
3. 灰度发布（按用户/地域/设备逐步放量）。
4. 实时监控核心指标（错误率、性能、业务转化）。
5. 达到回滚条件时自动或人工回滚。
6. 全量发布后持续观察。
7. 事故复盘（如有问题）。

稳定性保障：
- 蓝绿部署或金丝雀发布。
- 版本化静态资源（contenthash），便于回滚。
- 核心页面兜底方案（静态化、降级页）。
- 发布窗口避开业务高峰。
- 发布前自动巡检核心链路。

```js
// 灰度判定示例
function isGrayUser(userId, percent) {
  return hash(userId) % 100 < percent;
}
```

**评分维度**：
- 流程完整（30%）
- 灰度和回滚机制合理（25%）
- 监控和兜底考虑周全（20%）
- 有代码示例（10%）
- 有实际发布经验（15%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 高可用发布流程需要在每个环节设置质量门禁和回滚能力。 发布流程： 1. 代码审查 + 自动化测试通过。 2. 构建产物 + 静态资源上传到 CDN。 3. 灰度发布（按用户/地域/设备逐步放量）。

---

### FB-30-SC-A-015：遇到线上故障，你的处理流程是什么？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
遇到线上故障，你的处理流程是什么。

**参考答案**：

线上故障处理应遵循“先止损，后定位”的原则：

1. **发现**：通过监控告警或用户反馈发现异常。
2. **确认**：快速确认影响范围、严重程度和受影响用户。
3. **止损**：优先恢复服务，如回滚、降级、扩容、关闭功能开关。
4. **定位**：通过日志、追踪、指标找到根因。
5. **修复**：在测试环境验证修复方案，再部署上线。
6. **验证**：确认服务恢复且稳定，核心指标正常。
7. **复盘**：输出事故报告，制定改进措施，更新预案。

关键原则：
- 先止损，后定位。
- 不要在线上直接 debug。
- 保持沟通，及时同步进展给相关方。
- 故障期间保留现场证据（日志、截图、配置）。

**评分维度**：
- 流程清晰（30%）
- 先止损后定位意识（25%）
- 沟通和复盘意识（20%）
- 有实际处理经验（25%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 线上故障处理应遵循“先止损，后定位”的原则： 1. 发现：通过监控告警或用户反馈发现异常。 2. 确认：快速确认影响范围、严重程度和受影响用户。 3. 止损：优先恢复服务，如回滚、降级、扩容、关闭功能开关。 4. 定位：通过日志、追踪、指标找到根因。

---

### FB-30-CO-A-016：什么是混沌工程？前端可以做吗？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是混沌工程？前端可以做吗。

**参考答案**：

混沌工程是通过主动注入故障来验证系统韧性的方法。传统上更多用于后端，但前端同样可以应用。

前端混沌工程实践：
- 模拟网络断开或慢网（Chrome DevTools Network Throttling）。
- 模拟接口 500/超时。
- 模拟 CDN 资源加载失败。
- 模拟低版本浏览器或禁用 JavaScript。
- 模拟设备性能低下（CPU 降速）。
- 模拟 localStorage/IndexedDB 不可用或满容量。

目的：验证降级、兜底、重试、超时等稳定性机制是否有效，发现平时难以触发的异常路径。

实施建议：
- 从生产环境影响最小的场景开始。
- 在灰度或测试环境先验证。
- 定义清晰的恢复策略和止损条件。

**评分维度**：
- 理解混沌工程概念（25%）
- 能提出前端场景（30%）
- 理解目的和价值（20%）
- 有实施安全意识（10%）
- 有实践经验（15%）

---

## 三、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 混沌工程是通过主动注入故障来验证系统韧性的方法。 传统上更多用于后端，但前端同样可以应用。 前端混沌工程实践： - 模拟网络断开或慢网（Chrome DevTools Network Throttling）。 - 模拟接口 500/超时。

---

### FB-30-SD-P-018：如何设计前端全链路追踪方案？

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何设计前端全链路追踪方案。

**参考答案**：

前端全链路追踪需要把用户请求从浏览器到后端服务的各个环节关联起来。

设计要点：

1. **Trace ID 生成**：在应用入口（如页面加载或用户点击）生成全局 traceId。
2. **上下文传递**：
   - 前端请求时通过 HTTP Header（如 `x-trace-id`）传递给后端。
   - 异步操作（如 setTimeout、Promise）通过 AsyncLocalStorage 或手动传递保持上下文。
3. **Span 埋点**：对关键操作（页面加载、API 请求、组件渲染、用户点击）生成 span。
4. **错误关联**：异常信息中携带 traceId，便于在错误平台直接跳转链路。
5. **性能关联**：把 Web Vitals 与 traceId 关联，定位性能问题发生的链路。
6. **可视化展示**：在 APM 平台展示端到端链路耗时。

```ts
// 前端生成 traceId 并在请求中传递
const traceId = generateTraceId();
fetch('/api/order', {
  headers: { 'x-trace-id': traceId }
});
```

**评分维度**：
- Trace ID 传递机制（25%）
- Span 埋点设计（25%）
- 错误与性能关联（20%）
- 有代码示例（10%）
- 有实际搭建经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 前端全链路追踪需要把用户请求从浏览器到后端服务的各个环节关联起来。 设计要点： 1. Trace ID 生成：在应用入口（如页面加载或用户点击）生成全局 traceId。 2. 上下文传递：    - 前端请求时通过 HTTP Header（如 x-trace-id）传递给后端。 - 异步操作（如 setTimeout、Promise）通过 AsyncLocalStorage 或手动传递保持上下文。

---

### FB-30-SD-P-019：如何设计前端性能预算和告警体系？

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何设计前端性能预算和告警体系。

**参考答案**：

性能预算是把性能指标转化为可约束的开发规则，并在 CI 和运行中持续监控。

设计步骤：

1. **选择指标**：首屏 JS 大小、图片总大小、请求数、LCP、INP、CLS 等。
2. **设定基线**：采集当前性能数据作为基准。
3. **设定预算**：
   - 首屏 JS ≤ 200KB（gzip）。
   - 图片总大小 ≤ 1MB。
   - 第三方脚本 ≤ 3 个。
   - LCP ≤ 2.5s，INP ≤ 200ms，CLS ≤ 0.1。
4. **CI 集成**：使用 bundlesize、lighthouse-ci 在合并前检测预算。
5. **运行时监控**：RUM 采集真实用户数据，超预算时告警。
6. **分级告警**：P0（核心指标异常）立即告警，P1（趋势恶化）日报/周报。
7. **定期复盘**：根据业务变化调整预算。

```json
// lighthouse-ci 配置示例
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.9 }],
        "resource-summary:script:size": ["error", { "maxNumericValue": 200000 }]
      }
    }
  }
}
```

**评分维度**：
- 指标选择合理（25%）
- 预算设定和 CI 集成（25%）
- 告警分级（20%）
- 有配置示例（10%）
- 有实际经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 性能预算是把性能指标转化为可约束的开发规则，并在 CI 和运行中持续监控。 设计步骤： 1. 选择指标：首屏 JS 大小、图片总大小、请求数、LCP、INP、CLS 等。 2. 设定基线：采集当前性能数据作为基准。 3. 设定预算：    - 首屏 JS ≤ 200KB（gzip）。

---

### FB-30-EN-P-024：如何构建前端稳定性保障体系？

**题型**：工程化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：30 可观测性
**标签**：observability、sdk、frontend-engineering、performance、error-monitoring
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何构建前端稳定性保障体系。

**参考答案**：

前端稳定性保障体系需要从预防、发现、响应、恢复四个维度构建。

1. **预防**：
   - 代码规范、类型检查、单元测试、E2E 测试。
   - Code Review 和架构评审。
   - 灰度发布和功能开关。
2. **发现**：
   - 错误监控、性能监控、业务监控。
   - 自动化巡检和拨测。
   - 用户反馈渠道。
3. **响应**：
   - 明确的 on-call 机制。
   - 故障分级和升级路径。
   - 快速回滚和降级预案。
4. **恢复**：
   - 版本化静态资源，支持秒级回滚。
   - 核心页面兜底方案。
   - 服务降级（关闭非核心功能）。
5. **复盘**：
   - 事故复盘会议。
   - 改进措施跟踪。
   - 预案文档更新。

**评分维度**：
- 四个维度覆盖全面（35%）
- 能说明具体措施（30%）
- 有回滚和降级意识（20%）
- 有体系建设经验（15%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 前端稳定性保障体系需要从预防、发现、响应、恢复四个维度构建。 1. 预防：    - 代码规范、类型检查、单元测试、E2E 测试。 - Code Review 和架构评审。 - 灰度发布和功能开关。

