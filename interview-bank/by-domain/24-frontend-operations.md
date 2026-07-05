# 前端运维与监控 面试题

> 本题库共收录 **30** 道面试题（基础 8 / 进阶 8 / 深入 7 / 架构 7）。
> 本文件收录 前端运维与监控 相关面试题，目标题量 30 道。
> 题型覆盖：概念题、场景设计题、系统设计题、性能优化题、工程化题、软技能题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-24-CO-B-001：什么是前端可观测性？它与传统“看日志”有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：24 前端运维与监控
**标签**：可观测性、日志、Metrics、错误监控、Performance
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释前端可观测性（Frontend Observability）的核心概念，并说明它与传统“出了问题再查日志”的运维方式有何不同。

**参考答案**：

前端可观测性是指通过系统化的数据采集、存储、分析和可视化，使团队能够在用户端发生问题前主动发现、定位并理解前端系统的行为与状态。

核心三支柱（Three Pillars）：

- **Metrics（指标）**：聚合型数值，如页面加载耗时、JS 错误率、API 成功率、P95/P99 等。
- **Logs（日志）**：离散事件记录，如用户操作轨迹、错误堆栈、业务埋点日志。
- **Traces（链路）**：跨端跨服务的请求链路，如页面初始化 → API → 渲染 → 交互的完整耗时链路。

与传统查日志的区别：

| 维度 | 传统查日志 | 可观测性 |
|------|-----------|----------|
| 触发方式 | 被动，用户投诉后排查 | 主动，告警/看板发现问题 |
| 数据粒度 | 单点文本，依赖 grep | 指标+日志+链路多维关联 |
| 定位速度 | 慢，需要复现 | 快，基于数据下钻 |
| 预防能力 | 弱 | 强，通过 SLO/趋势分析提前预警 |

最佳实践：

- 在研发阶段就嵌入 SDK，而不是上线后补监控。
- 统一 Trace ID，打通前后端链路。
- 给指标和日志添加业务维度标签（页面、版本、环境、用户分桶）。

**评分维度**：
- 能说出可观测性三支柱（40%）
- 能对比主动/被动、多维度关联（30%）
- 能提到研发期嵌入和统一 Trace ID（30%）

**常见错误**：
- 把可观测性等同于“收集日志”。
- 只关注错误率，忽略性能和用户体验指标。
- 未建立前后端统一的 Trace ID。

**延伸追问**：
- 如果只有日志没有指标，排查线上 JS Error 会有什么问题？
- 如何在没有 Trace 基础设施的情况下做简单链路串联？

**相关题目**：
- [FB-24-SD-P-001 设计前端可观测性平台](#FB-24-SD-P-001)
- [FB-24-CO-B-003 前端错误监控要关注哪些指标](#FB-24-CO-B-003)

**参考资源**：
- [Google Cloud - Observability](https://cloud.google.com/learn/what-is-observability)
- [OpenTelemetry - What is Observability?](https://opentelemetry.io/docs/concepts/observability-primer/)

**口头回答版**：
> 前端可观测性就是通过指标、日志、链路三种数据，让我们能在用户投诉之前就发现前端问题。它不只是“看日志”，而是把分散的数据关联起来，主动预警、快速下钻。关键是在开发阶段就接入 SDK，并且前后端共用 Trace ID，这样排查效率才会高。

---

### FB-24-CO-B-002：Core Web Vitals 包含哪些指标？各自的目标阈值是多少？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：24 前端运维与监控
**标签**：Core Web Vitals、Performance、Metrics、可观测性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Google Core Web Vitals（CWV）的核心指标、含义以及推荐阈值，并解释它们为什么重要。

**参考答案**：

Core Web Vitals 是 Google 提出的一组衡量真实用户体验质量的网页性能指标，当前核心三项为：

| 指标 | 含义 | 良好阈值 |
|------|------|----------|
| **LCP（Largest Contentful Paint）** | 最大内容绘制时间，衡量 perceived load speed | ≤ 2.5 s |
| **INP（Interaction to Next Paint）** | 交互到下一次绘制的最大延迟，衡量交互响应性 | ≤ 200 ms |
| **CLS（Cumulative Layout Shift）** | 累积布局偏移，衡量视觉稳定性 | ≤ 0.1 |

补充说明：

- **FID（First Input Delay）** 曾是 CWV 之一，2024 年起被 INP 取代。
- 阈值分三档：Good（绿色）、Needs Improvement（黄色）、Poor（红色）。
- 这些指标应从真实用户（RUM）采集，而不是仅依赖实验室数据。

重要性：

- 直接影响用户留存和转化。
- 已被 Google 纳入搜索排名因素。
- 是前端 SLO/SLA 最常见的量化依据。

**评分维度**：
- 能准确说出 LCP/INP/CLS 及阈值（50%）
- 能解释每个指标代表的用户体验维度（30%）
- 能区分 RUM 与实验室数据（20%）

**常见错误**：
- 把 FID 与 INP 混淆或仍然以 FID 作为当前指标。
- 只记住数字但不理解指标含义。
- 认为 CWV 只在 Chrome 有效，忽略其他浏览器也有类似能力。

**延伸追问**：
- INP 和 FID 的本质区别是什么？为什么 INP 更能反映交互体验？
- 在移动端弱网环境下，CWV 通常会比桌面端差多少？

**相关题目**：
- [FB-24-PE-P-004 如何通过监控优化资源加载与 LCP](#FB-24-PE-P-004)
- [FB-24-SC-A-001 如何在项目中接入 Sentry 并设置性能监控](#FB-24-SC-A-001)

**参考资源**：
- [web.dev - Core Web Vitals](https://web.dev/articles/vitals)
- [web.dev - INP](https://web.dev/articles/inp)

**口头回答版**：
> Core Web Vitals 主要有三个指标：LCP 衡量页面主要内容多快出来，目标是 2.5 秒以内；INP 衡量交互响应，目标是 200 毫秒以内；CLS 衡量页面元素会不会乱动，目标是小于 0.1。之前用的 FID 已经被 INP 取代。这些指标最好从真实用户环境采集，因为它们直接影响搜索排名和用户体验。

---

### FB-24-CO-B-003：前端错误监控要关注哪些指标和错误类型？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：24 前端运维与监控
**标签**：错误监控、Sentry、SDK、可观测性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举前端错误监控中常见的错误类型，并说明应该从哪些维度来衡量错误监控的质量。

**参考答案**：

常见前端错误类型：

| 类型 | 典型场景 |
|------|----------|
| JavaScript 运行时错误 | 空指针、未定义变量、异步异常 |
| 资源加载错误 | JS/CSS/图片/字体 404 或加载失败 |
| Promise 未捕获异常 | `unhandledrejection` |
| 框架级错误 | React Error Boundary、Vue `errorHandler` |
| API 错误 | HTTP 5xx/4xx、超时、业务错误码 |
| 白屏/渲染失败 | 根节点未挂载、SSR 注水失败 |

关键监控指标：

- **错误率**：错误数 / PV 或会话数。
- **影响用户数**：去重后的受影响用户量。
- **错误恢复率**：被 Error Boundary 捕获后降级成功的比例。
- **P95 首次出现时间**：新发错误的发现速度。
- **Top 错误列表**：按出现次数/影响面排序。

衡量监控质量：

- 覆盖率：关键页面和流程是否都接入了监控。
- 准确率：误报率是否低，去重是否有效。
- 可定位性：是否有 source map、上下文、用户轨迹。

**评分维度**：
- 能列举 4 种以上错误类型（40%）
- 能说出 3 个以上关键指标（30%）
- 能说明监控质量维度（30%）

**常见错误**：
- 只监控 JS Error，忽略资源加载和 Promise 异常。
- 不对错误去重，导致告警被同一问题刷屏。
- 缺少 source map，线上压缩代码无法定位。

**延伸追问**：
- 如何区分“业务预期错误”和“需要修复的系统错误”？
- 如果线上错误量暴增，怎么快速判断是版本问题还是基础设施问题？

**相关题目**：
- [FB-24-SC-A-001 如何在项目中接入 Sentry 并设置性能监控](#FB-24-SC-A-001)
- [FB-24-SD-P-001 设计前端可观测性平台](#FB-24-SD-P-001)

**参考资源**：
- [MDN - GlobalEventHandlers.onerror](https://developer.mozilla.org/en-US/docs/Web/API/Window/error_event)
- [Sentry - Frontend Error Monitoring](https://docs.sentry.io/platforms/javascript/)

**口头回答版**：
> 前端错误监控要覆盖 JS 运行时错误、资源加载失败、Promise 未捕获异常、框架错误、API 错误和白屏等。关键指标有错误率、影响用户数、错误恢复率、Top 错误等。好的监控不仅要覆盖全，还得准，能定位——比如要有 source map 和用户操作轨迹，不然线上报错也查不出来。

---

### FB-24-CO-B-004：RUM 监控与 Synthetic 监控有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：24 前端运维与监控
**标签**：可观测性、Performance、Metrics、可用性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 RUM（Real User Monitoring，真实用户监控）和 Synthetic（合成/主动）监控的区别，并说明它们各自的适用场景。

**参考答案**：

| 维度 | RUM | Synthetic |
|------|-----|-----------|
| 数据来源 | 真实用户的浏览器/设备 | 受控实验室环境或机器人 |
| 网络环境 | 复杂多样，覆盖不同地区/网络/设备 | 固定机房、固定带宽、固定浏览器 |
| 样本偏差 | 反映真实分布，但受用户群体影响 | 无真实用户偏差，可精确复现 |
| 适用指标 | LCP、INP、CLS、转化率、用户轨迹 | TTFB、FCP、基线回归、竞品对比 |
| 触发方式 | 被动采集真实访问 | 主动按固定频率/脚本访问 |
| 成本 | 随流量线性增长 | 可控，按探针数量收费 |

适用场景：

- **RUM**：用于衡量真实用户体验、发现地域/设备差异、驱动 SLO 制定。
- **Synthetic**：用于上线前基线测试、回归验证、SLA 报告、竞品对标。

最佳实践：

- 两者结合：Synthetic 保证发布前基线，RUM 保证上线后真实体验。
- RUM 数据要按国家、运营商、设备、版本切片分析。

**评分维度**：
- 能清晰区分数据来源和环境（40%）
- 能说明各自适用指标和场景（30%）
- 能提出 RUM+Synthetic 结合的实践（30%）

**常见错误**：
- 认为 Synthetic 监控可以替代 RUM。
- 用实验室数据直接作为用户 SLO 依据。
- 忽略 RUM 中长尾用户（弱网、低端机）的体验。

**延伸追问**：
- 如果 RUM 显示 INP 差但 Synthetic 正常，可能是什么原因？
- 如何降低 RUM 数据采集对页面性能的影响？

**相关题目**：
- [FB-24-SD-A-002 如何设计一个前端 RUM SDK](#FB-24-SD-A-002)
- [FB-24-PE-A-008 如何监控前端网络质量](#FB-24-PE-A-008)

**参考资源**：
- [Google - RUM vs Synthetic](https://developer.chrome.com/docs/devtools/performance/overview)
- [web.dev - Measure performance in the field](https://web.dev/articles/user-centric-performance-metrics)

**口头回答版**：
> RUM 是监控真实用户的访问数据，能反映不同地区、网络、设备下的真实体验；Synthetic 是在实验室或固定节点主动探测，环境稳定，适合做基线和回归。两者不冲突，一般发布前用 Synthetic 测基线，上线后用 RUM 看真实效果，结合起来最靠谱。

---

### FB-24-CO-B-005：前端埋点有哪些类型？设计埋点方案时要注意什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：24 前端运维与监控
**标签**：埋点、可观测性、日志、可用性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍常见的前端埋点类型，并说明一个合理的埋点方案应遵循哪些原则。

**参考答案**：

常见埋点类型：

| 类型 | 说明 | 示例 |
|------|------|------|
| 代码埋点 | 开发人员在关键位置手动触发 | 按钮点击、表单提交 |
| 自动埋点/全埋点 | SDK 自动采集所有可交互元素 | 全站点击、页面浏览 |
| 可视化圈选埋点 | 运营/产品通过可视化工具配置 | 热图、转化漏斗 |
| 服务端埋点 | 由后端记录，前端只传必要上下文 | 订单、支付成功 |

设计原则：

- **目标导向**：先定义业务问题，再决定埋什么，避免“全埋”。
- **事件模型统一**：建议采用 `who/when/where/what/how` 五元组。
- **字段标准化**：页面名、组件名、事件名统一命名规范，避免拼写差异。
- **隐私合规**：避免采集敏感信息，遵守 GDPR/个人信息保护法。
- **采样与节流**：高频事件（如滚动、鼠标移动）必须采样或节流。
- **可回溯**：埋点元数据应有版本管理，方便后续对数。

埋点数据质量检查：

- 空值率、重复率、延迟时间。
- 与后端订单/支付数据对账。

**评分维度**：
- 能说出 3 种以上埋点类型（40%）
- 能提出 3 条以上设计原则（30%）
- 能提到数据质量检查和隐私合规（30%）

**常见错误**：
- 全站无差别全埋点，导致数据噪音大、成本高。
- 事件名随意命名，后期无法聚合。
- 采集用户输入内容或敏感字段。

**延伸追问**：
- 自动埋点如何准确标识“业务语义”？
- 埋点丢失或不及时，如何排查？

**相关题目**：
- [FB-24-EN-A-003 如何设计前端日志采集方案](#FB-24-EN-A-003)
- [FB-24-CP-P-007 如何通过终端分布分析驱动运维决策](#FB-24-CP-P-007)

**参考资源**：
- [Google Analytics 4 Events](https://support.google.com/analytics/answer/9322688)
- [MDN - Tracking protections](https://developer.mozilla.org/en-US/docs/Web/Privacy/Tracking_Protection)

**口头回答版**：
> 前端埋点主要有代码埋点、自动埋点、可视化圈选和服务端埋点。设计埋点方案要先想清楚要解决什么业务问题，统一事件字段规范，注意隐私合规，高频事件要节流采样，还要做数据质量校验。不要为了埋点而埋点，否则数据多反而看不清。

---

### FB-24-PE-B-006：页面性能监控通常需要采集哪些指标？

**题型**：性能优化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：24 前端运维与监控
**标签**：Performance、Metrics、Core Web Vitals、可观测性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举前端页面性能监控中需要重点关注的指标，并说明它们各自的采集方式和含义。

**参考答案**：

页面性能监控指标可分为加载类、交互类、稳定类三类：

**加载类指标**：

- **TTFB（Time to First Byte）**：首字节时间，反映网络和后端响应速度。
- **FCP（First Contentful Paint）**：首次内容绘制。
- **LCP（Largest Contentful Paint）**：最大内容绘制。
- **DOM Ready / Load**：HTML 解析完成、页面完全加载。

**交互类指标**：

- **INP（Interaction to Next Paint）**：交互到下一次绘制延迟。
- **FID（First Input Delay）**：首次输入延迟（旧指标）。
- **Long Tasks**：超过 50 ms 的主线程长任务。

**稳定类指标**：

- **CLS（Cumulative Layout Shift）**：累积布局偏移。
- **内存占用**、**CPU 占用**、**帧率 FPS**。

采集方式：

- **Navigation Timing API**：TTFB、DNS、TCP、Redirect 等网络阶段。
- **Resource Timing API**：单个资源加载耗时。
- **PerformanceObserver**：监听 LCP、INP、CLS、Long Tasks。
- **requestAnimationFrame / requestIdleCallback**：采集 FPS、内存趋势。

示例（LCP 监听）：

```javascript
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const last = entries[entries.length - 1];
  console.log('LCP:', last.startTime, last.element);
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

**评分维度**：
- 能按加载/交互/稳定分类列举指标（40%）
- 能说明主要 API（Navigation/Resource/PerformanceObserver）（30%）
- 能给出一个 PerformanceObserver 示例（30%）

**常见错误**：
- 只关注加载时间，忽略交互和稳定性。
- 把 FCP 和 LCP 混淆。
- 在所有环境无差别采集高频指标，导致性能反噬。

**延伸追问**：
- 在 SPA 中，路由切换的性能应该如何采集？
- 如果 LCP 元素是一个异步加载的图片，如何追踪它？

**相关题目**：
- [FB-24-CO-B-002 Core Web Vitals 指标与阈值](#FB-24-CO-B-002)
- [FB-24-PE-A-004 长任务与卡顿分析](#FB-24-PE-A-004)

**参考资源**：
- [MDN - Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)
- [web.dev - Measure performance with the JavaScript API](https://web.dev/articles/measure-performance-with-the-js-api)

**口头回答版**：
> 页面性能监控主要看三类：加载类像 TTFB、FCP、LCP；交互类像 INP、Long Tasks；稳定类像 CLS、内存和帧率。用 Navigation Timing 看网络阶段，Resource Timing 看资源，PerformanceObserver 监听 LCP、CLS、长任务。采集时要注意不要影响页面性能。

---

### FB-24-EN-B-007：CDN 与缓存监控需要关注哪些指标？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：高级
**面试知识域**：24 前端运维与监控
**标签**：CDN、缓存策略、Performance、可观测性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明前端静态资源部署在 CDN 后，应该从哪些维度监控 CDN 和缓存的效果。

**参考答案**：

CDN 与缓存监控核心维度：

| 维度 | 关键指标 | 说明 |
|------|----------|------|
| 命中率 | CDN 命中率、浏览器缓存命中率 | 越高说明回源越少、成本越低 |
| 可用性 | 可用性百分比、5xx 错误率 | 直接影响资源加载成功 |
| 延迟 | 边缘节点 TTFB、下载耗时 | 反映用户到边缘节点的距离和质量 |
| 带宽/流量 | 总流量、峰值带宽、回源流量 | 用于成本核算和容量规划 |
| 刷新效率 | 缓存刷新成功率、生效时间 | 影响版本发布后的用户体验 |
| 地理分布 | 各国/各运营商命中与延迟 | 发现局部节点异常 |

浏览器缓存相关检查：

- `Cache-Control`、`Expires`、`ETag`、`Last-Modified` 配置是否合理。
- 是否对 HTML 使用 `no-cache`、对带 hash 资源使用长期强缓存。
- 版本更新后用户是否仍命中旧资源。

常见告警规则：

- CDN 可用性低于 99.9%。
- 命中率突降 10% 以上。
- 5xx 错误率持续高于 0.1%。

**评分维度**：
- 能说出命中率、可用性、延迟、流量 4 个核心维度（40%）
- 能说明浏览器缓存配置要点（30%）
- 能给出 2 条以上告警规则（30%）

**常见错误**：
- 只监控 CDN 总流量，不区分回源流量。
- HTML 文件被长期缓存，导致版本无法更新。
- 忽略不同地区、运营商的节点质量差异。

**延伸追问**：
- 如果 CDN 命中率突然下降，可能有哪些原因？
- 版本发布后如何确保老用户不会命中旧缓存？

**相关题目**：
- [FB-24-EN-A-006 前端灰度发布与回滚的监控要点](#FB-24-EN-A-006)
- [FB-24-SD-R-004 设计多 CDN 监控与自动切换](#FB-24-SD-R-004)

**参考资源**：
- [web.dev - HTTP caching](https://web.dev/articles/http-cache)
- [AWS - CloudFront Monitoring](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/monitoring-using-cloudwatch-metrics.html)

**口头回答版**：
> CDN 和缓存监控要看命中率、可用性、延迟、回源流量、刷新效率和地理分布。浏览器端要检查 Cache-Control、ETag 这些头，HTML 一般不能长期缓存，带 hash 的 JS/CSS 可以长期缓存。命中率突降、5xx 变多、可用性低于 99.9% 都应该告警。

---

### FB-24-SS-B-008：什么是 on-call 机制？前端团队为什么也需要？

**题型**：软技能题
**难度**：🟢 基础
**岗位层级**：高级
**面试知识域**：24 前端运维与监控
**标签**：可观测性、错误监控、可用性、高可用
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 on-call 机制的含义，并说明前端团队建立 on-call 制度的价值和基本流程。

**参考答案**：

on-call（值班待命）机制是指团队成员按轮值方式在非工作时间也保持可响应状态，以便在系统发生故障时快速介入处理。

前端为什么需要 on-call：

- 前端直接面向用户，线上问题最先被感知。
- JS Error、白屏、CDN 异常、版本回滚失败都需要快速止血。
- 建立“谁构建谁运维”的 DevOps/SRE 文化。

基本流程：

1. **告警接入**：错误率、核心业务流程失败、SLO 跌破阈值时触发告警。
2. **分级响应**：P0（立即响应）、P1（30 分钟内）、P2（工作时间内）。
3. **值班轮换**：避免长期由同一人承担，使用日历工具或 PagerDuty/OpsGenie。
4. **Runbook 支撑**：每类告警都有对应的排查和止血步骤。
5. **交接与复盘**：班次结束时交接未处理事件，事后写 Postmortem。

注意事项：

- 不要把 on-call 等同于 24 小时待命，应明确响应时效和升级路径。
- 对低频但高影响的问题也要设置兜底告警。
- 前端 on-call 需要与后端/运维/产品建立联动机制。

**评分维度**：
- 能说明 on-call 的定义和价值（40%）
- 能描述基本流程和分级响应（30%）
- 能提到 Runbook、值班轮换、复盘机制（30%）

**常见错误**：
- 认为前端问题都可以第二天处理，不需要值班。
- on-call 没有分级，所有告警都深夜电话叫醒。
- 缺少 Runbook，每次故障都从零排查。

**延伸追问**：
- 如何减少 on-call 期间的无效打扰？
- 前端 on-call 人员需要哪些权限和工具？

**相关题目**：
- [FB-24-SS-P-003 线上故障的 Incident Response 流程](#FB-24-SS-P-003)
- [FB-24-SD-R-001 设计前端 on-call 与告警升级系统](#FB-24-SD-R-001)

**参考资源**：
- [Google SRE - Being On-Call](https://sre.google/sre-book/being-on-call/)
- [Atlassian - On-call best practices](https://www.atlassian.com/incident-management/on-call)

**口头回答版**：
> on-call 就是团队轮值，在非工作时间也能快速响应线上故障。前端直接面对用户，JS 报错、白屏、CDN 挂了都需要第一时间处理。基本流程是把告警分级，比如 P0 立即响应，P1 半小时内；然后轮值、配 Runbook、事后复盘。要注意别什么告警都深夜打电话，要做好分级和降噪。

---
## 进阶题（8 道）{#advanced}

### FB-24-SC-A-001：如何在项目中接入 Sentry 并设置性能监控？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：24 前端运维与监控
**标签**：Sentry、错误监控、Performance、SDK
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
假设你负责一个 React 项目，需要在生产环境接入 Sentry 进行错误和性能监控。请说明接入步骤、关键配置以及上线后如何验证数据质量。

**参考答案**：

接入步骤：

1. **安装 SDK**：

   ```bash
   npm install @sentry/react @sentry/browser
   ```

2. **初始化**：

   ```javascript
   import * as Sentry from '@sentry/react';

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
     release: process.env.CI_COMMIT_SHA,
     integrations: [
       Sentry.browserTracingIntegration(),
       Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
     ],
     tracesSampleRate: 0.1,
     replaysSessionSampleRate: 0.01,
     replaysOnErrorSampleRate: 1.0,
     beforeSend(event) {
       if (event.exception) {
         // 过滤测试域名或敏感信息
       }
       return event;
     },
   });
   ```

3. **React 错误边界**：

   ```jsx
   const SentryErrorBoundary = Sentry.withErrorBoundary(App, {
     fallback: <ErrorFallback />,
   });
   ```

4. **路由/性能自动埋点**：使用 `browserTracingIntegration` 自动采集页面加载和路由切换。

5. **Source Map 上传**：CI 阶段上传 source map 并删除线上 map 文件，避免源码泄露。

6. **上线验证**：
   - 触发一个测试错误，确认 Sentry 能收到。
   - 检查 Release 与 source map 关联。
   - 观察 1 小时数据，确认采样率、PII 过滤、上下文标签正确。

关键配置：

- `tracesSampleRate` 控制性能采样，高流量站点建议 0.01-0.1。
- `beforeSend`/`beforeBreadcrumb` 用于脱敏和过滤。
- `release` 必须和 source map 的 release 一致。

数据质量检查：

- 错误去重是否生效（Grouping）。
- Issue 是否按 release 聚合。
- 是否存在大量 `Script error.`（跨域脚本需加 `crossorigin`）。

**评分维度**：
- 能列出安装、初始化、错误边界、source map 上传等步骤（40%）
- 能解释采样率、release、beforeSend 等关键配置（30%）
- 能说明上线验证和数据质量检查方法（30%）

**常见错误**：
- 未上传 source map，线上堆栈无法阅读。
- 采样率设为 1.0 导致 SDK 开销和数据量过大。
- 未在 `beforeSend` 中过滤敏感信息。

**延伸追问**：
- Sentry 的 Performance 数据是如何采集路由切换的？
- 如果项目使用微前端，Sentry 应该如何隔离不同子应用的数据？

**相关题目**：
- [FB-24-CO-B-003 前端错误监控要关注哪些指标](#FB-24-CO-B-003)
- [FB-24-SD-P-001 设计前端可观测性平台](#FB-24-SD-P-001)

**参考资源**：
- [Sentry React Docs](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry Source Maps](https://docs.sentry.io/platforms/javascript/sourcemaps/)

**口头回答版**：
> 接入 Sentry 先装 @sentry/react，然后在入口 init，配置 dsn、environment、release，加上 browserTracingIntegration 做性能监控和 replay 做会话回放。React 里用 withErrorBoundary 包一下根组件。上线前要通过 CI 上传 source map，上线后触发测试错误验证。注意采样率别设太高，beforeSend 里脱敏。

---

### FB-24-SD-A-002：如何设计一个前端 RUM SDK？

**题型**：系统设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：24 前端运维与监控
**标签**：可观测性、Performance、SDK、埋点、Metrics
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个轻量级的前端 RUM SDK，能够采集页面性能指标、JS 错误和用户行为，并发送到后端。要求说明核心模块、采集策略、上报机制和数据安全。

**参考答案**：

核心模块：

```text
rum-sdk/
├── core/              # 初始化、配置、全局状态
├── collectors/        # 采集器：性能、错误、行为、资源
├── transport/         # 上报通道：sendBeacon、fetch、img
├── processors/        # 数据加工：采样、压缩、去重、脱敏
├── storage/           # 本地队列：IndexedDB / localStorage
└── plugins/           # 扩展插件：SPA 路由、框架适配
```

采集策略：

- **性能**：PerformanceObserver 监听 LCP、INP、CLS、Long Tasks；NavigationTiming 算 TTFB/FCP。
- **错误**：`window.onerror`、`unhandledrejection`、框架 Error Boundary。
- **行为**：PV/UV、点击、页面停留时长、滚动深度；支持自动+代码埋点。
- **资源**：ResourceTiming 采集慢资源 Top N。

上报机制：

- 优先 `navigator.sendBeacon`（页面关闭时可靠发送）。
- 降级到 `fetch`（异步、支持自定义头）。
- 再降级到 1x1 像素 `Image`（跨域简单请求）。
- 本地队列：失败重试 3 次，按指数退避。
- 上报时机：页面卸载、定时 5 秒、批处理满 20 条。

数据安全：

- 字段白名单，默认不采集 input 值、Cookie、URL 查询参数中的 token。
- 上报使用 HTTPS，必要时对 payload 做压缩（如 gzip、Protocol Buffers）。
- 提供 `beforeSend` 钩子让业务方二次脱敏。

SDK 初始化示例：

```javascript
import RumSDK from '@corp/rum-sdk';

RumSDK.init({
  appId: 'web-shop',
  env: 'prod',
  version: '2.3.1',
  sampleRate: 0.05,
  endpoint: 'https://rum.example.com/collect',
  beforeSend: (data) => {
    data.userId = hash(data.userId);
    return data;
  },
});
```

**评分维度**：
- 能拆分 core/collector/transport/processor 等模块（30%）
- 能说明采集内容和对应 API（30%）
- 能设计上报通道、降级和本地队列（25%）
- 能提到采样、脱敏、压缩（15%）

**常见错误**：
- 所有数据实时上报，导致大量请求影响性能。
- 未处理页面关闭时的数据丢失。
- 采集字段过多，触发隐私合规风险。

**延伸追问**：
- 如何在 SDK 中实现 SPA 路由切换的性能采集？
- 如果后端采集接口不可用，SDK 应该如何降级？

**相关题目**：
- [FB-24-CO-B-004 RUM 与 Synthetic 监控的区别](#FB-24-CO-B-004)
- [FB-24-EN-A-003 如何设计前端日志采集方案](#FB-24-EN-A-003)

**参考资源**：
- [web.dev - RUM](https://web.dev/articles/rum-vs-synthetic)
- [MDN - sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)

**口头回答版**：
> 设计 RUM SDK 我会拆成 core、collectors、transport、processors、storage 几个模块。collectors 用 PerformanceObserver 采性能，window.onerror 采错误，自动或代码埋点采行为。transport 优先 sendBeacon，页面关闭也能发，失败时本地队列重试。数据要采样、压缩、脱敏，并提供 beforeSend 钩子。

---

### FB-24-EN-A-003：如何设计前端日志采集方案？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：24 前端运维与监控
**标签**：日志、可观测性、SDK、埋点、错误监控
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一套前端日志采集方案，包括日志分级、采样策略、上报方式、本地缓冲和存储成本优化。

**参考答案**：

日志分级：

| 级别 | 用途 | 保留时长 |
|------|------|----------|
| DEBUG | 开发调试，线上默认关闭 | 1 天 |
| INFO | 关键流程记录，如登录、下单 | 7 天 |
| WARN | 可恢复异常、降级行为 | 14 天 |
| ERROR | JS 错误、接口失败 | 30 天 |
| FATAL | 白屏、核心流程中断 | 90 天 |

采样策略：

- **随机采样**：对 INFO/WARN 按用户会话采样，如 1%。
- **错误全采**：ERROR/FATAL 默认 100% 采集。
- **条件采样**：高流量页面采样率低，核心交易流程采样率高。
- **动态采样**：后端根据存储压力实时调整采样率。

上报方式：

- 实时/准实时：页面卸载前批量发送；定时 5 秒发送；满 50 条发送。
- 通道优先级：`sendBeacon` > `fetch` > `image`。
- 失败重试：本地 IndexedDB 队列，失败时按 1s/2s/4s 退避重试，最多 3 次。

本地缓冲：

- 使用 IndexedDB 存储待发送日志，避免 localStorage 大小限制和同步阻塞。
- 超出容量时按 FIFO 淘汰低级别日志。

成本优化：

- 压缩 payload（gzip、snappy、protobuf）。
- 按日志级别设置不同保留周期和索引策略。
- 高频日志聚合为指标，原始日志仅保留抽样。
- 冷热分离：近期数据用热存储，历史数据归档到对象存储。

**评分维度**：
- 能给出日志分级和保留策略（30%）
- 能设计采样和上报机制（30%）
- 能提到本地缓冲和失败重试（20%）
- 能提出存储成本优化手段（20%）

**常见错误**：
- 所有级别日志都全量采集，成本爆炸。
- 使用 localStorage 存储大量日志，阻塞主线程。
- 未对敏感字段脱敏，导致合规风险。

**延伸追问**：
- 如何防止日志采集被广告拦截器误杀？
- 如果用户处于离线状态，日志如何保证不丢失？

**相关题目**：
- [FB-24-CO-B-005 前端埋点有哪些类型](#FB-24-CO-B-005)
- [FB-24-SD-A-002 如何设计一个前端 RUM SDK](#FB-24-SD-A-002)

**参考资源**：
- [MDN - IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [web.dev - Save data with compression](https://web.dev/articles/performance-budgets-101)

**口头回答版**：
> 前端日志采集要分级，DEBUG 上线关掉，ERROR/FATAL 全采，其他按会话采样。上报用 sendBeacon，失败放 IndexedDB 队列重试。为了省钱，要压缩 payload、按级别设置保留期、高频日志聚合成指标。还要注意别采集敏感信息。

---

### FB-24-PE-A-004：如何检测和分析前端长任务与页面卡顿？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：24 前端运维与监控
**标签**：Performance、Core Web Vitals、可观测性、Metrics、可用性
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端长任务（Long Tasks）和页面卡顿的检测方法，并给出分析思路和优化方向。

**参考答案**：

检测方法：

- **PerformanceObserver - Long Tasks**：监听主线程超过 50 ms 的任务。

  ```javascript
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('Long Task:', entry.duration, entry.attribution);
    }
  }).observe({ type: 'longtask', buffered: true });
  ```

- **Long Animation Frames API（LoAF）**：更细粒度地定位导致长帧的脚本。
- **INP**：直接反映交互卡顿程度。
- **FPS 监控**：通过 `requestAnimationFrame` 计算帧率，低于 30 fps 视为卡顿。

分析思路：

1. **定位长任务来源**：通过 `attribution` 或 LoAF 的 `scripts` 字段找到具体脚本/函数。
2. **复现实验室数据**：用 Chrome DevTools Performance 面板录制火焰图。
3. **关联业务场景**：卡顿发生在页面加载、滚动、输入还是动画？
4. **按用户分桶**：低端机、弱网、特定浏览器版本是否更容易出现？

优化方向：

- 拆分长任务：使用 `scheduler.yield()` 或 `setTimeout` 让出主线程。
- 减少主线程工作量：Web Worker、OffscreenCanvas、虚拟滚动。
- 优化事件处理：防抖/节流，避免输入时同步更新大量 DOM。
- 延迟非关键脚本：使用 `defer`、`async`、`requestIdleCallback`。
- 减少重排重绘：批量 DOM 读写，使用 CSS transform。

**评分维度**：
- 能说出 Long Tasks/LoAF/INP/FPS 检测方式（40%）
- 能给出 PerformanceObserver 示例（20%）
- 能按来源、场景、用户分桶分析（20%）
- 能提出 3 条以上优化措施（20%）

**常见错误**：
- 只关注加载性能，忽略交互卡顿。
- 未在真实用户环境采集，只在本地高端机测试。
- 盲目使用 Web Worker，增加复杂度和通信开销。

**延伸追问**：
- `scheduler.yield()` 和 `setTimeout(0)` 有什么区别？
- 如何量化一次卡顿对业务转化率的影响？

**相关题目**：
- [FB-24-PE-B-006 页面性能监控通常需要采集哪些指标](#FB-24-PE-B-006)
- [FB-24-PE-P-004 如何通过监控优化资源加载与 LCP](#FB-24-PE-P-004)

**参考资源**：
- [web.dev - Long Tasks](https://web.dev/articles/optimize-long-tasks)
- [web.dev - Optimize INP](https://web.dev/articles/optimize-inp)

**口头回答版**：
> 检测长任务可以用 PerformanceObserver 监听 longtask，也可以用 LoAF 看具体哪个脚本导致长帧，再结合 INP 和 FPS 判断卡顿。分析时要找到具体来源、复现火焰图、看发生在什么场景、哪些用户群体。优化思路包括拆分长任务、用 Web Worker、减少主线程工作、事件节流、延迟非关键脚本。

---

### FB-24-SC-A-005：如何设计前端告警策略，避免告警疲劳？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：24 前端运维与监控
**标签**：可观测性、错误监控、可用性、高可用、Performance
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一套前端告警策略，使得团队既能及时发现线上问题，又不会因为告警过多而产生疲劳。

**参考答案**：

告警设计原则：

1. **基于 SLO/用户体验**，而不是基于原始指标阈值。
   - 例：错误率 > 0.1% 且持续 5 分钟，影响用户 > 1000。
2. **分层分级**：
   - P0：业务核心流程不可用（支付、登录），立即电话/短信。
   - P1：重要功能异常，30 分钟内响应。
   - P2：体验下降，工作时间内处理。
   - P3：趋势类/优化建议，不进 on-call。
3. **多条件组合**：避免单一指标抖动触发告警。
   - 示例：`(错误率环比上升 50%) AND (绝对值 > 0.1%) AND (持续 3 分钟)`。
4. **动态基线**：使用历史同期数据（上周同一时段）作为动态阈值，减少季节性波动误报。
5. **告警收敛**：
   - 同一问题聚合为 single issue。
   - 设置抑制窗口，5 分钟内相同告警只通知一次。
   - 升级路径：前线 → 负责人 → 经理。
6. **可行动**：每条告警必须附带 Runbook 链接和最近的 release/变更信息。

降噪手段：

- 过滤已知低优先级错误（如第三方脚本、浏览器扩展报错）。
- 区分新错误与存量错误，新错误优先告警。
- 使用告警认领和静默规则，避免重复打扰。

**评分维度**：
- 能提出基于 SLO/用户体验的分级策略（30%）
- 能给出多条件组合和动态基线思路（25%）
- 能说明告警收敛和降噪方法（25%）
- 能提到 Runbook 和可行动性（20%）

**常见错误**：
- 阈值固定，不考虑业务波动。
- 所有告警都走短信/电话，导致疲劳。
- 告警只抛错误数，不说明影响和上下文。

**延伸追问**：
- 如何处理“错误率上升但绝对值很低”的情况？
- 如果告警太多，团队开始忽略，你会怎么挽救信任？

**相关题目**：
- [FB-24-SS-B-008 什么是 on-call 机制](#FB-24-SS-B-008)
- [FB-24-CO-P-002 如何制定前端 SLI/SLO](#FB-24-CO-P-002)

**参考资源**：
- [Google SRE - Alerting](https://sre.google/workbook/alerting/)
- [PagerDuty - Incident Response](https://www.pagerduty.com/resources/learn/incident-response/)

**口头回答版**：
> 好的告警要基于 SLO 和用户体验，而不是随便设个阈值。要分层：P0 立即打电话，P2 工作时间处理。多条件组合，比如错误率既环比上升又持续几分钟才报。用动态基线减少误报，同一问题要收敛，不要刷屏。最重要的是告警要带 Runbook，让人知道怎么处理。

---

### FB-24-EN-A-006：前端灰度发布与回滚的监控要点有哪些？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：24 前端运维与监控
**标签**：灰度发布、可观测性、错误监控、Performance、可用性
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端灰度发布和回滚过程中，应该监控哪些指标、设计哪些检查点，以及如何在异常时自动或手动回滚。

**参考答案**：

灰度发布监控要点：

1. **流量划分**：按用户 ID、地域、设备、业务标签分桶，逐步放量（1% → 5% → 20% → 100%）。
2. **核心指标对比**：
   - 错误率：灰度组 vs 基线组。
   - LCP/INP/CLS：性能是否回归。
   - 业务转化率：关键漏斗是否异常。
   - 资源加载失败率：CDN、版本路径是否正确。
3. **检查点（Check Gates）**：
   - 每阶段维持至少 15-30 分钟，覆盖足够样本。
   - 自动熔断：灰度组错误率超过基线 2 倍且持续 5 分钟自动回滚。
   - 人工审批：进入 50% 以上流量前需要负责人确认。
4. **回滚策略**：
   - 配置开关/特性开关（Feature Toggle）关闭新功能。
   - CDN 刷新或回源到旧版本。
   - 对于单页应用，已加载新版本的用户可提示刷新。
5. **版本标记**：所有监控数据和日志必须带 `version` 标签，便于按版本对比。

示例流程：

```text
构建 → 部署 Canary → 1% 流量 → 检查错误率/性能 → 5% → 检查 → 20% → 检查 → 全量
```

异常处理：

- 自动：触发熔断后调用部署平台 API 切回旧版本。
- 手动：告警里附带回滚命令或一键回滚按钮。

**评分维度**：
- 能描述灰度分桶和放量节奏（25%）
- 能列出核心对比指标（25%）
- 能设计自动熔断/回滚机制（25%）
- 能强调 version 标签和检查点（25%）

**常见错误**：
- 灰度只看错误率，忽略性能和业务指标。
- 放量速度过快，样本不足就全量。
- 回滚时未通知已加载新版本的用户，导致状态不一致。

**延伸追问**：
- 如果灰度组用户已经缓存了新的 HTML，如何快速回滚？
- 前端版本回滚后，如何确保后端接口版本兼容？

**相关题目**：
- [FB-24-EN-B-007 CDN 与缓存监控需要关注哪些指标](#FB-24-EN-B-007)
- [FB-24-EN-P-005 前端版本管理与缓存失效](#FB-24-EN-P-005)

**参考资源**：
- [Flagger - Progressive Delivery](https://flagger.app/)
- [LaunchDarkly - Feature Management](https://launchdarkly.com/)

**口头回答版**：
> 灰度发布要按用户或地域分桶，1%、5%、20% 逐步放量，每个阶段留够时间看数据。重点对比错误率、LCP/INP/CLS、业务转化率、资源加载失败率。灰度组错误率比基线高很多就自动熔断回滚。所有监控必须带上版本号，才能按版本对比。

---

### FB-24-SC-A-007：前端服务降级有哪些常见策略？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：24 前端运维与监控
**标签**：可观测性、错误监控、限流、可用性、高可用
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
当前端依赖的服务（如推荐接口、广告、埋点、图片服务）出现故障或超时时，如何设计降级策略以保证核心用户体验？

**参考答案**：

降级原则：

- **有损服务，保核心**：非核心功能可以降级，核心交易链路必须可用。
- **可观测**：每次降级都要记录日志和指标，便于复盘。
- **可恢复**：服务恢复后自动退出降级模式。

常见策略：

| 场景 | 降级方式 | 监控点 |
|------|----------|--------|
| 推荐接口失败 | 展示兜底榜单/默认推荐 | 降级次数、兜底点击率 |
| 广告位超时 | 隐藏广告位或展示静态占位 | 广告空耗率 |
| 埋点服务不可用 | 本地队列暂存，延迟上报 | 队列积压量、丢失率 |
| 图片 CDN 异常 | 降级到备用 CDN 或缩略图 | 降级图片占比、加载耗时 |
| 大促高峰 | 关闭非核心动画/弹窗 | 性能指标、转化率 |
| 配置中心失败 | 使用本地缓存配置 | 命中本地配置比例 |

实现方式：

- **静态降级配置**：JSON 配置由服务端下发，前端按开关执行。
- **动态熔断**：基于错误率/延迟自动触发，如连续 5 次失败进入熔断。
- **分级降级**：L1 关闭非核心功能，L2 简化 UI，L3 只保留核心交易。

示例：

```javascript
async function fetchRecommend() {
  try {
    const data = await request('/api/recommend');
    return data;
  } catch (err) {
    reportMetric('recommend.degrade', 1);
    return getDefaultRecommend(); // 兜底
  }
}
```

**评分维度**：
- 能说明“保核心、可观测、可恢复”原则（30%）
- 能列举 4 种以上降级场景（30%）
- 能区分静态配置、动态熔断、分级降级（25%）
- 能给出代码或流程示例（15%）

**常见错误**：
- 降级后没有任何监控，无法评估影响。
- 核心链路也一起降级，导致业务受损。
- 服务恢复后仍停留在降级状态。

**延伸追问**：
- 降级和熔断、限流之间是什么关系？
- 如何避免降级被用户明显感知？

**相关题目**：
- [FB-24-SC-A-005 如何设计前端告警策略](#FB-24-SC-A-005)
- [FB-24-SE-P-006 前端限流与客户端防护](#FB-24-SE-P-006)

**参考资源**：
- [Microsoft - Circuit Breaker Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)
- [Netflix Tech Blog - Fault Tolerance](https://netflixtechblog.com/fault-tolerance-in-a-high-volume-distributed-system-91ab4faae74a)

**口头回答版**：
> 服务降级就是核心链路保住，非核心功能有损。比如推荐接口挂了给默认推荐，广告超时隐藏，埋点服务不可用先存本地。每次降级要记日志和指标，服务恢复后自动退出。可以用静态开关、动态熔断或分级降级来实现。

---

### FB-24-PE-A-008：如何监控前端网络质量？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：24 前端运维与监控
**标签**：Performance、Metrics、可观测性、可用性、HTTP
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何在前端采集和监控网络质量，包括页面加载网络阶段、API 请求、弱网/离线状态的识别与适配。

**参考答案**：

采集维度：

1. **页面加载网络阶段**：
   - DNS、TCP、SSL、TTFB、下载耗时（Navigation Timing）。
2. **API 请求质量**：
   - 成功率、耗时分布（P50/P95/P99）、超时率、重试率。
   - 按接口、版本、地域、网络类型分桶。
3. **网络类型与状态**：
   - `navigator.connection`：downlink、effectiveType（4g/3g/2g）、rtt。
   - `navigator.onLine`：离线状态。
4. **错误分类**：
   - 超时、DNS 失败、TCP 失败、HTTP 4xx/5xx、CORS 错误。

监控实现：

```javascript
// 网络类型
const conn = navigator.connection;
const netInfo = {
  type: conn?.effectiveType,
  downlink: conn?.downlink,
  rtt: conn?.rtt,
};

// Navigation Timing
const nav = performance.getEntriesByType('navigation')[0];
const ttfb = nav.responseStart - nav.requestStart;
```

弱网适配：

- 根据 `effectiveType` 降质：低清图、减少预加载、关闭自动播放。
- 请求超时时间按网络类型动态调整。
- 离线时启用 Service Worker 缓存或队列化请求。

告警与看板：

- 按国家/运营商/网络类型建立网络质量热力图。
- 对 P95 API 耗时突增、成功率下降设置告警。

**评分维度**：
- 能说明 Navigation Timing 和 API 监控指标（30%）
- 能使用 navigator.connection/onLine 识别网络状态（25%）
- 能提出弱网适配策略（25%）
- 能设计分桶看板和告警（20%）

**常见错误**：
- 只采集平均值，忽略 P95/P99 长尾。
- 未按网络类型分桶，导致弱网用户问题被平均掉。
- 离线检测只依赖 `online` 事件，不做心跳验证。

**延伸追问**：
- 如何区分“后端慢”和“网络慢”？
- 如果用户从 WiFi 切换到 4G，SDK 如何实时调整策略？

**相关题目**：
- [FB-24-CO-B-004 RUM 与 Synthetic 监控的区别](#FB-24-CO-B-004)
- [FB-24-PE-A-004 长任务与卡顿分析](#FB-24-PE-A-004)

**参考资源**：
- [MDN - Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
- [web.dev - Measure network timing](https://web.dev/articles/navigation-and-resource-timing)

**口头回答版**：
> 监控网络质量可以用 Navigation Timing 看 DNS、TCP、TTFB，用 Resource Timing 看每个资源，还要监控 API 成功率、P95 耗时、超时率。navigator.connection 可以拿到网络类型，navigator.onLine 判断离线。弱网时要降质，比如用低清图、减少预加载。数据要按网络类型、地域分桶，不然会被平均值盖住。

---
## 深入题（7 道）{#proficient}

### FB-24-SD-P-001：如何设计一个前端可观测性平台？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：24 前端运维与监控
**标签**：可观测性、Sentry、Performance、SDK、Metrics、日志
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个面向中大型前端应用的可观测性平台，能够统一采集错误、性能、日志、埋点和链路数据，并支持告警、排查和成本管理。

**参考答案**：

整体架构：

```text
端侧 SDK  →  数据采集网关  →  消息队列  →  实时/离线处理  →  存储  →  查询/告警/看板
   ↑              ↑                ↑              ↑              ↑           ↑
  Web/App      Nginx/Kong      Kafka/Pulsar    Flink/Spark   ClickHouse   Grafana
```

核心组件：

1. **端侧 SDK**：统一采集 JS Error、Performance、Logs、Traces、Behavior。
   - 通过 Plugin 机制支持 React/Vue/小程序。
   - 采样率、开关、脱敏规则支持服务端下发。

2. **采集网关**：
   - 接收 beacon/fetch/image 请求，做鉴权、限流、格式校验。
   - 写入消息队列，削峰填谷。

3. **数据处理**：
   - 实时流：错误聚合、指标计算、异常检测、告警触发。
   - 离线批处理：source map 解析、用户会话重建、成本分摊。

4. **存储层**：
   - 指标：Prometheus / VictoriaMetrics。
   - 日志：ClickHouse / Elasticsearch（按冷热分层）。
   - 链路：Jaeger / Tempo。
   - 事件：关系型数据库（MySQL/PostgreSQL）存 issue、release、告警。

5. **查询与分析**：
   - 多维下钻：按页面、版本、地域、网络、设备。
   - 关联查询：错误 → 链路 → 日志 → 用户回放。

6. **告警与响应**：
   - 基于 SLO 的多级告警。
   - 告警自动生成工单，附带 Runbook 和最近变更。

7. **成本管理**：
   - 按应用/团队分摊存储和流量成本。
   - 动态采样、日志降级、冷热分层。

关键设计点：

- **统一 Trace ID**：从页面请求开始，贯穿前端、BFF、后端。
- **采样策略**：默认低采样，错误全采，核心业务高采样。
- **隐私合规**：字段白名单、敏感信息哈希化、数据保留策略。

**评分维度**：
- 能画出端到端数据流和核心组件（30%）
- 能说明 SDK、网关、处理、存储、告警职责（30%）
- 能提到 Trace ID、采样、脱敏、成本（25%）
- 能给出存储选型理由（15%）

**常见错误**：
- 所有数据都进同一个存储，导致成本高昂。
- 未设计采样和限流，流量高峰打挂采集服务。
- 忽视 source map 解析和隐私合规。

**延伸追问**：
- 如何在不丢失关键上下文的前提下降低 50% 存储成本？
- 如果平台要支持小程序和 H5 统一看板，SDK 需要抽象哪些能力？

**相关题目**：
- [FB-24-CO-B-001 什么是前端可观测性](#FB-24-CO-B-001)
- [FB-24-SD-A-002 如何设计一个前端 RUM SDK](#FB-24-SD-A-002)

**参考资源**：
- [OpenTelemetry Architecture](https://opentelemetry.io/docs/concepts/architecture/)
- [Honeycomb - Observability](https://www.honeycomb.io/what-is-observability)

**口头回答版**：
> 前端可观测性平台一般分为端侧 SDK、采集网关、消息队列、实时离线处理、存储和看板告警。SDK 统一采错误、性能、日志、链路，网关做限流鉴权，数据进 Kafka 后实时算指标和告警，离线做 source map 解析。存储按指标、日志、链路分开，ClickHouse 适合日志，Prometheus 适合指标。关键是统一 Trace ID、采样、脱敏和成本控制。

---

### FB-24-CO-P-002：如何制定前端 SLI/SLO？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：24 前端运维与监控
**标签**：可观测性、Metrics、Performance、可用性、高可用
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 SLI、SLO、SLA 的区别，并说明如何为前端服务制定合理的 SLO。

**参考答案**：

概念区分：

| 术语 | 全称 | 含义 |
|------|------|------|
| SLI | Service Level Indicator | 服务水平指标，如 LCP P75、JS 错误率、API 成功率 |
| SLO | Service Level Objective | 服务水平目标，如 LCP P75 ≤ 2.5s 的会话占比 ≥ 90% |
| SLA | Service Level Agreement | 服务等级协议，违约有赔偿，通常由商务定义 |

制定前端 SLO 的步骤：

1. **选择用户视角指标**：
   - 可用性：页面可访问率、核心功能成功率。
   - 性能：LCP、INP、CLS、FCP。
   - 正确性：核心流程完成率、JS 错误率。

2. **定义统计口径**：
   - 时间窗口：通常 28 天滚动窗口，避免周末/节假日波动。
   - 分位：P75/P90/P95，避免平均值掩盖长尾。
   - 用户会话维度：按会话聚合，而不是按 PV。

3. **设定目标值**：
   - 参考行业基准（CWV Good 阈值）。
   - 结合历史数据，不要一开始就追求 99.99%。
   - 预留错误预算（Error Budget），如允许 0.1% 会话不达标。

4. **建立告警与复盘**：
   - 当错误预算消耗过快时触发告警。
   - 每月 SLO 评审，调整不合理目标。

示例 SLO：

```text
首页 LCP P75 ≤ 2.5s，28 天滚动达成率 ≥ 90%。
核心下单流程 JS 错误率 ≤ 0.05%，28 天滚动。
```

**评分维度**：
- 能准确区分 SLI/SLO/SLA（30%）
- 能按可用性/性能/正确性选择指标（25%）
- 能说明统计口径和时间窗口（25%）
- 能提到错误预算和复盘机制（20%）

**常见错误**：
- 把 SLI 当 SLO 用，缺少目标值。
- 使用平均值而不是分位数。
- SLO 目标过高导致团队无法达成，失去指导意义。

**延伸追问**：
- 如果某个月 SLO 未达成，如何决定是调整目标还是投入优化？
- 错误预算耗尽后应该禁止发布吗？

**相关题目**：
- [FB-24-SC-A-005 如何设计前端告警策略](#FB-24-SC-A-005)
- [FB-24-SS-R-005 如何让前端 SLO 与业务结果挂钩](#FB-24-SS-R-005)

**参考资源**：
- [Google SRE - SLI/SLO/SLA](https://sre.google/workbook/slo-document/)
- [web.dev - Defining Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)

**口头回答版**：
> SLI 是指标，SLO 是目标，SLA 是带赔偿的协议。制定前端 SLO 要选用户视角指标，比如 LCP、INP、错误率，用 28 天滚动窗口和 P75 分位，不要看平均值。目标参考 CWV 基准，留出错误预算。每月复盘，不合理的要调。

---

### FB-24-SS-P-003：线上故障的 Incident Response 流程和 Runbook 应该怎么设计？

**题型**：软技能题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：24 前端运维与监控
**标签**：可观测性、错误监控、可用性、高可用、Performance
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请描述一次前端线上故障的 Incident Response 流程，并说明 Runbook 应包含哪些内容。你会如何组织复盘？

**参考答案**：

Incident Response 流程：

```text
检测告警 → 响应认领 → 止损 → 根因定位 → 修复验证 → 复盘改进
```

1. **检测（Detect）**：监控/告警/用户反馈发现异常。
2. **响应（Triage）**：on-call 人员认领，评估严重程度和影响面。
   - 建立临时作战室（War Room），同步信息。
3. **止血（Mitigate）**：优先恢复服务，而不是先找根因。
   - 常见手段：回滚、降级、关闭特性开关、切 CDN。
4. **定位（Diagnose）**：基于 Trace、日志、指标、用户回放定位根因。
5. **修复（Resolve）**：修复并验证，逐步恢复。
6. **复盘（Postmortem）**：24-48 小时内完成，聚焦改进项而非追责。

Runbook 内容：

- **触发条件**：什么指标/告警会触发本 Runbook。
- **影响评估**：如何快速判断影响范围（页面、版本、地域、用户数）。
- **止血步骤**：回滚命令、降级开关、CDN 刷新。
- **排查清单**：常见原因和检查命令。
- **升级路径**：何时升级给后端/运维/安全团队。
- **验证方法**：如何确认问题已解决。
- **历史案例**：类似事故及处理结果。

复盘模板：

| 项目 | 内容 |
|------|------|
| 事故摘要 | 一句话描述 |
| 时间线 | 检测、响应、止损、修复各阶段时间点 |
| 影响面 | 用户数、订单损失、SLO 消耗 |
| 根因 | 技术根因 + 流程根因 |
| 改进项 | 短期止血 + 长期预防，明确负责人和 DDL |
| 经验教训 | 可复用的认知 |

**评分维度**：
- 能完整描述 Incident Response 流程（30%）
- 能说明 Runbook 关键章节（30%）
- 能组织无追责复盘（25%）
- 能提到止血优先、升级路径（15%）

**常见错误**：
- 先找根因再止血，导致故障扩大。
- Runbook 过于简略，缺少具体命令和检查项。
- 复盘变成追责会，无法产生有效改进。

**延伸追问**：
- 如果故障涉及第三方 CDN，前端团队应如何协同运维？
- 如何在高压情况下保持沟通透明？

**相关题目**：
- [FB-24-SS-B-008 什么是 on-call 机制](#FB-24-SS-B-008)
- [FB-24-CP-R-007 大规模前端故障的治理机制](#FB-24-CP-R-007)

**参考资源**：
- [Google SRE - Incident Management](https://sre.google/incident-management/)
- [Atlassian - Incident Postmortem](https://www.atlassian.com/incident-management/postmortem)

**口头回答版**：
> 线上故障流程是检测、响应、止血、定位、修复、复盘。最重要的是先止血再查原因，Runbook 要明确触发条件、影响评估、止血步骤、排查清单和升级路径。复盘要无追责，重点写时间线、根因、影响和改进项，24 到 48 小时内完成。

---

### FB-24-PE-P-004：如何通过监控优化资源加载与 LCP？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：24 前端运维与监控
**标签**：Performance、Core Web Vitals、CDN、可观测性、Metrics
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明如何通过监控数据识别 LCP 瓶颈，并给出资源加载优化的完整闭环：发现 → 定位 → 优化 → 验证。

**参考答案**：

监控识别瓶颈：

1. **LCP 分位数**：看 P75/P90，确认问题规模。
2. **按资源类型分桶**：图片、视频、背景图、块级文本分别看 LCP 元素。
3. **按阶段拆解**：
   - TTFB：网络/后端。
   - Load Delay：资源发现晚。
   - Load Time：资源下载慢。
   - Render Delay：渲染阻塞。
4. **Resource Timing 慢资源 Top N**：找出耗时最长的图片/字体/脚本。
5. **用户切片**：低端机、弱网、特定地域是否更差。

定位方法：

- 在 RUM 中记录 LCP 元素的 `element` 和 `url`。
- 用 Chrome DevTools Lighthouse 复现。
- 检查关键路径：是否被 JS/CSS 阻塞、是否未预加载、是否未压缩。

优化手段：

| 问题 | 优化 |
|------|------|
| LCP 是图片 | 压缩、WebP/AVIF、响应式图片、`fetchpriority="high"`、预加载 |
| 渲染阻塞 | 内联关键 CSS、异步非关键 JS、减少 CSS 体积 |
| 发现晚 | 预加载 LCP 资源、提前 DNS/TCP/SSL 预连接 |
| CDN 慢 | 多 CDN、边缘缓存、HTTP/3 |
| 后端慢 | SSR/SSG、边缘渲染、缓存 HTML |

验证闭环：

1. 在灰度环境 A/B 测试。
2. 对比优化前后 LCP 分布。
3. 监控业务指标（转化率、跳出率）是否改善。
4. 将优化经验沉淀为性能预算或 lint 规则。

**评分维度**：
- 能按 TTFB/Load Delay/Load Time/Render Delay 拆解 LCP（30%）
- 能使用 RUM 数据定位慢资源和 LCP 元素（25%）
- 能给出 4 类以上优化手段（25%）
- 能描述 A/B 验证和沉淀机制（20%）

**常见错误**：
- 只关注 LCP 平均值，忽略分位数和用户分桶。
- 未识别具体 LCP 元素就盲目优化。
- 优化后未验证业务指标，无法证明价值。

**延伸追问**：
- 如果 LCP 元素是异步渲染的文本，如何减少 Render Delay？
- 在多页应用中，如何持续监控每个路由的 LCP？

**相关题目**：
- [FB-24-CO-B-002 Core Web Vitals 指标与阈值](#FB-24-CO-B-002)
- [FB-24-EN-A-006 前端灰度发布与回滚的监控要点](#FB-24-EN-A-006)

**参考资源**：
- [web.dev - Optimize LCP](https://web.dev/articles/optimize-lcp)
- [web.dev - How to optimize resource loading](https://web.dev/articles/optimize-resource-loading)

**口头回答版**：
> 优化 LCP 先把时间拆成 TTFB、Load Delay、Load Time、Render Delay 四段，看 RUM 里 LCP 元素是什么。如果是图片，就压缩、用 WebP、加 fetchpriority、预加载；如果是渲染阻塞，就内联关键 CSS、异步 JS。优化后做 A/B 测试，对比 LCP 分布和业务指标，把经验沉淀成规则。

---

### FB-24-EN-P-005：前端版本管理与缓存失效如何设计？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：24 前端运维与监控
**标签**：前端工程化、灰度发布、CDN、缓存策略、可观测性
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端静态资源的版本管理策略，以及如何在版本更新时避免用户命中旧缓存或出现版本不一致。

**参考答案**：

版本管理策略：

1. **文件指纹（Content Hash）**：
   - JS/CSS 文件名带 hash，如 `app.a1b2c3.js`。
   - 内容变化 hash 变化，内容不变可长期缓存。

2. **HTML 不缓存或短缓存**：
   - HTML 使用 `Cache-Control: no-cache` 或短 TTL（如 5 分钟）。
   - 确保用户每次能拿到最新的资源引用。

3. **版本号标记**：
   - 全局 `window.__APP_VERSION__` 或 meta 标签。
   - 监控、错误、埋点都带 `version` 字段。

4. **多版本并存**：
   - CDN 上保留最近 N 个版本的资源，便于快速回滚。
   - 通过 URL 路径或 query 区分版本：`/v2.3.1/app.js`。

缓存失效方案：

| 场景 | 做法 |
|------|------|
| 正常发布 | 新 HTML 引用新 hash 资源，旧资源长期缓存 |
| 紧急回滚 | 部署旧版本 HTML，CDN 刷新 HTML，旧 hash 资源仍在 CDN |
| 配置更新 | 使用服务端下发配置，避免重新打包 |
| 版本不一致 | 前端检测到版本落后时提示用户刷新 |

版本一致性校验：

```javascript
// 应用启动时比较服务端版本
const serverVersion = await fetch('/api/version').then(r => r.text());
if (serverVersion && serverVersion !== window.__APP_VERSION__) {
  showRefreshToast('发现新版本，请刷新页面');
}
```

监控要点：

- 版本错误率：按版本对比，快速发现新版本问题。
- 缓存命中率：HTML 命中率应低，hash 资源命中率应高。
- 旧版本残留：统计用户停留旧版本的比例和时长。

**评分维度**：
- 能说清 hash 文件名 + HTML 不缓存的组合（30%）
- 能说明版本号标记和多版本并存（25%）
- 能给出缓存失效和一致性校验方案（25%）
- 能列出版本相关监控指标（20%）

**常见错误**：
- HTML 被长期缓存，导致版本无法更新。
- JS/CSS 不带 hash，缓存清理困难。
- 回滚时删除了旧 hash 资源，导致 404。

**延伸追问**：
- 在微前端架构中，如何管理基座和子应用的版本一致性？
- 如果用户长期不刷新页面，如何强制更新？

**相关题目**：
- [FB-24-EN-A-006 前端灰度发布与回滚的监控要点](#FB-24-EN-A-006)
- [FB-24-EN-B-007 CDN 与缓存监控需要关注哪些指标](#FB-24-EN-B-007)

**参考资源**：
- [web.dev - HTTP caching](https://web.dev/articles/http-cache)
- [webpack - Caching](https://webpack.js.org/guides/caching/)

**口头回答版**：
> 前端版本管理一般用带 hash 的 JS/CSS 文件名，HTML 不缓存或短缓存，这样发版后 HTML 引用新资源。全局要标记 version，错误和监控都带上。CDN 保留多版本方便回滚。还可以前端启动时拉服务端版本对比，落后就提示刷新。监控要看版本错误率和缓存命中率。

---

### FB-24-SE-P-006：前端限流与客户端防护如何设计？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：24 前端运维与监控
**标签**：限流、安全、可观测性、错误监控、SDK
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端为什么需要限流，以及如何设计客户端限流和防护机制，避免异常流量打垮服务或被滥用。

**参考答案**：

前端限流场景：

- 防止埋点/日志 SDK 在高频事件下产生过多请求。
- 防止用户误操作或脚本刷屏（如投票、抢购按钮）。
- 保护后端接口不被前端异常重试打垮。
- 防止爬虫/自动化工具恶意调用前端接口。

限流策略：

| 策略 | 说明 | 适用场景 |
|------|------|----------|
| 令牌桶 | 固定速率补充令牌，突发可控 | 接口请求、埋点上报 |
| 漏桶 | 匀速处理，平滑突发 | 日志上报 |
| 计数器 | 单位时间内限制次数 | 按钮点击、短信发送 |
| 滑动窗口 | 更平滑的计数器 | API 限流 |

客户端实现示例（令牌桶简化版）：

```javascript
class TokenBucket {
  constructor(rate, capacity) {
    this.tokens = capacity;
    this.capacity = capacity;
    this.rate = rate;
    this.last = Date.now();
  }
  allow() {
    const now = Date.now();
    this.tokens = Math.min(this.capacity, this.tokens + (now - this.last) * this.rate / 1000);
    this.last = now;
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }
}
```

防护机制：

- **防抖/节流**：按钮、搜索输入。
- **验证码/人机校验**：高频操作前触发。
- **请求签名**：防止接口被直接调用。
- **异常行为检测**：同一用户短时间内大量请求触发风控。
- **熔断**：后端连续失败时停止请求，避免雪崩。

可观测：

- 记录限流次数、被拒绝请求数、令牌消耗速率。
- 对异常流量模式告警。

**评分维度**：
- 能说明前端限流的 3 个以上场景（25%）
- 能对比常见限流算法（25%）
- 能给出客户端限流代码或设计（25%）
- 能提到防护和可观测（25%）

**常见错误**：
- 认为限流只在服务端做，前端不需要。
- 限流算法实现有并发/时钟回拨问题。
- 限流后没有反馈用户，导致重复点击。

**延伸追问**：
- 客户端限流能否完全防止恶意刷接口？为什么？
- 如何在限流和用户体验之间取得平衡？

**相关题目**：
- [FB-24-SC-A-007 前端服务降级有哪些常见策略](#FB-24-SC-A-007)
- [FB-24-SD-R-001 设计前端 on-call 与告警升级系统](#FB-24-SD-R-001)

**参考资源**：
- [Cloudflare - Rate Limiting](https://www.cloudflare.com/rate-limiting/)
- [MDN - Debounce/Throttle concepts](https://developer.mozilla.org/en-US/docs/Glossary/Throttle)

**口头回答版**：
> 前端限流主要是防止 SDK 高频上报、用户误操作或脚本刷屏。可以用令牌桶、漏桶、计数器、滑动窗口等算法。按钮要防抖节流，敏感操作加验证码，异常流量触发风控。限流情况要记指标和告警，也要给用户反馈，不然会一直点。

---

### FB-24-CP-P-007：如何通过用户终端分布分析驱动运维决策？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：24 前端运维与监控
**标签**：可观测性、埋点、Performance、可用性、Metrics
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明用户终端分布（浏览器、操作系统、设备、分辨率、网络类型）对前端运维的意义，并举例说明如何基于分布数据做决策。

**参考答案**：

终端分布数据维度：

- **浏览器及版本**：Chrome、Safari、Edge、微信内置浏览器、各版本占比。
- **操作系统**：iOS、Android、Windows、macOS 版本。
- **设备**：高端/低端机、屏幕分辨率、内存、CPU 核心数。
- **网络**：WiFi、4G、3G、2G、运营商。
- **地域**：国家、省份、城市。

运维意义：

1. **兼容性风险识别**：
   - 某旧版本浏览器占比高，意味着不能随意使用新 API。
2. **性能基线制定**：
   - 低端机/弱网用户的 CWV 通常更差，应单独设定 SLO。
3. **故障定位**：
   - 错误集中在某个浏览器版本，可能是该版本 Bug。
4. **资源投放**：
   - 高占比机型优先适配和测试。
5. **成本优化**：
   - 低占比且维护成本高的浏览器可以逐步降权。

决策示例：

| 发现 | 决策 |
|------|------|
| Android 10 以下占比 < 2% 但 bug 率高 | 引入渐进增强，必要时提示升级浏览器 |
| iOS 15 以下无法支持 WebP | 继续使用 JPEG 兜底或启用格式协商 |
| 低端机 LCP 差但转化率高 | 单独优化图片降质、减少动效 |
| 某省 4G 占比高且 API 超时多 | 增加边缘节点、降低包体积 |

实现方式：

- 在 RUM SDK 中解析 User-Agent 或 Client Hints。
- 建立终端分布看板，按周/月更新。
- 与性能、错误、业务指标交叉分析。

**评分维度**：
- 能说出 4 个以上终端维度（25%）
- 能说明终端分布对兼容性/性能/故障/成本的意义（35%）
- 能给出具体决策示例（25%）
- 能提到 Client Hints 和交叉分析（15%）

**常见错误**：
- 只看总体指标，忽视长尾终端。
- 用 User-Agent 做精确判断，导致未来浏览器兼容问题。
- 终端数据未与业务指标关联，无法驱动决策。

**延伸追问**：
- 隐私政策收紧后，User-Agent 信息减少，如何获取终端数据？
- 如果某终端占比很低但客单价很高，如何平衡投入产出？

**相关题目**：
- [FB-24-PE-A-008 如何监控前端网络质量](#FB-24-PE-A-008)
- [FB-24-PE-P-004 如何通过监控优化资源加载与 LCP](#FB-24-PE-P-004)

**参考资源**：
- [MDN - User-Agent Client Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints)
- [web.dev - Adapt serving based on network quality](https://web.dev/articles/adaptive-serving-based-on-network-quality)

**口头回答版**：
> 用户终端分布包括浏览器、系统、设备、网络、地域。它能帮我们识别兼容性风险、制定性能基线、定位故障、优化资源投入。比如某旧浏览器占比低但 bug 多，可以渐进增强；低端机转化高就专门做图片降质。要用 User-Agent 或 Client Hints 采集，和性能、错误、业务数据交叉分析。

---
## 架构题（7 道）{#architect}

### FB-24-SD-R-001：如何设计前端 on-call 与告警升级系统？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：24 前端运维与监控
**标签**：可观测性、错误监控、可用性、高可用、Performance
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个面向前端团队的 on-call 与告警升级系统，涵盖告警接入、值班管理、升级路径、事件工单和复盘闭环。

**参考答案**：

系统架构：

```text
监控数据源（Sentry/RUM/日志） → 告警引擎 → 通知路由 → 值班调度 → 事件工单 → 复盘看板
                                      ↓
                                升级策略（时间/影响/未响应）
```

核心模块：

1. **告警接入层**：
   - 统一 Webhook 接收各监控系统告警。
   - 标准化告警格式：severity、service、version、runbook、trace_id。

2. **告警引擎**：
   - 降噪：去重、抑制、聚合。
   - 富化：补充 release、owner、最近变更、相似历史事件。
   - 路由：按服务/组件/团队路由到对应值班组。

3. **值班调度**：
   - 支持轮值、主备、节假日替换。
   - 与日历/OA 系统集成，自动换班提醒。
   - 记录值班负载，避免疲劳。

4. **通知与升级**：
   - 通知渠道：IM、短信、电话、邮件。
   - 升级规则：P0 5 分钟未响应升级主管；10 分钟未响应升级经理。
   - 升级条件：未认领、未解决、影响扩大。

5. **事件工单**：
   - 自动生成 incident，记录时间线、处理人、变更、影响。
   - 关联 Runbook 和 Trace/日志链接。

6. **复盘与改进**：
   - 自动生成 Postmortem 模板。
   - 跟踪 action item 完成率。
   - 统计 MTTR（平均修复时间）、告警准确率。

关键设计：

- **告警分级与 SLO 绑定**：只有影响 SLO 的才进入 on-call。
- **可观测集成**：工单里一键跳转到相关 trace、日志、用户回放。
- **反馈闭环**：处理人标记误报，算法自动调优阈值。

**评分维度**：
- 能描述告警接入、引擎、调度、升级、工单闭环（30%）
- 能说明降噪、富化、路由机制（25%）
- 能设计升级策略和防疲劳机制（25%）
- 能提到 MTTR、误报反馈、SLO 绑定（20%）

**常见错误**：
- 只做一个通知渠道，缺少升级路径。
- 告警不经过降噪直接发给人。
- 值班表手工维护，容易遗漏。

**延伸追问**：
- 如果前端告警需要后端协同，如何设计跨团队升级？
- 如何衡量 on-call 系统的健康度？

**相关题目**：
- [FB-24-SS-B-008 什么是 on-call 机制](#FB-24-SS-B-008)
- [FB-24-SS-P-003 线上故障的 Incident Response 流程](#FB-24-SS-P-003)

**参考资源**：
- [PagerDuty - On-call scheduling](https://www.pagerduty.com/resources/learn/on-call-scheduling/)
- [Google SRE - Incident Command](https://sre.google/incident-management/incident-command/)

**口头回答版**：
> 设计 on-call 系统要有告警接入层统一收各监控的告警，告警引擎做降噪、富化和路由，按团队值班表通知。P0 几分钟没人认领就自动升级主管或经理。事件自动生成工单，带 Runbook 和相关链路。最后还要复盘跟踪 action item，统计 MTTR 和告警准确率。关键是只把影响 SLO 的告警放进 on-call。

---

### FB-24-CP-R-002：如何在前端开展混沌工程？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：24 前端运维与监控
**标签**：可观测性、Performance、可用性、高可用、容错
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明混沌工程在前端领域的应用场景、实验设计原则和风险控制方法。

**参考答案**：

前端混沌工程目标：验证系统在异常条件下的韧性，包括降级、容错、用户体验。

可注入的故障类型：

| 故障 | 注入方式 | 观察目标 |
|------|----------|----------|
| 网络延迟/丢包 | Chrome DevTools、代理、Service Worker 拦截 | 超时处理、重试策略、降级 |
| API 失败 | Mock 接口返回 5xx/4xx | 错误边界、兜底 UI、熔断 |
| CDN 不可用 | 修改资源域名指向黑洞 | 多 CDN 切换、本地缓存 |
| JS 异常 | 代码中注入随机 throw | Error Boundary、监控捕获 |
| 长任务/卡顿 | 占用主线程计算 | 交互响应、INP |
| 弱网/离线 | 模拟 2G、断网 | 离线缓存、队列化请求 |
| 高内存占用 | 创建大量对象 | OOM 保护、内存监控 |

实验设计原则（借鉴 Chaos Engineering Principles）：

1. **从稳态假设开始**：先定义正常状态下系统的可观测指标。
2. **真实世界事件**：优先注入生产中发生过的故障。
3. **生产环境优先**：但前端通常先在预发/灰度执行，降低风险。
4. **最小爆炸半径**：按用户、地域、页面、版本控制影响范围。
5. **可观测**：实验期间加强监控，随时停止。
6. **自动化与常态化**：将实验纳入 CI/CD 或定期演练。

风险控制：

- 必须有 kill switch，一键终止实验。
- 选择非高峰时段和低价值流量。
- 实验前通知相关团队，准备好回滚方案。
- 实验后产出韧性改进项。

示例流程：

```text
定义稳态 → 设计故障 → 选择范围 → 执行注入 → 观察指标 → 回滚 → 复盘改进
```

**评分维度**：
- 能列举 4 种以上前端可注入故障（30%）
- 能说明混沌工程基本原则（30%）
- 能给出风险控制措施（25%）
- 能设计完整实验流程（15%）

**常见错误**：
- 在生产环境直接全量注入高风险故障。
- 实验前没有定义稳态指标，无法判断影响。
- 实验后没有跟进改进，流于形式。

**延伸追问**：
- 如何验证 CDN 故障时的自动切换是否生效？
- 混沌实验是否会导致真实用户流失？如何权衡？

**相关题目**：
- [FB-24-SC-A-007 前端服务降级有哪些常见策略](#FB-24-SC-A-007)
- [FB-24-SD-R-004 设计多 CDN 监控与自动切换](#FB-24-SD-R-004)

**参考资源**：
- [Principles of Chaos Engineering](https://principlesofchaos.org/)
- [Gremlin - Chaos Engineering](https://www.gremlin.com/community/tutorials/chaos-engineering-the-history-principles-and-practice/)

**口头回答版**：
> 前端混沌工程就是主动注入故障来验证系统韧性。可以模拟网络延迟、API 失败、CDN 不可用、JS 异常、弱网、长任务等。设计实验要先定义正常指标，控制爆炸半径，有 kill switch，在低峰期做。重点是实验后一定要产出改进项，不然就是走过场。

---

### FB-24-SD-R-003：如何设计全球化的前端可观测性与成本优化架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：24 前端运维与监控
**标签**：可观测性、CDN、Performance、成本、可用性
**出现频率**：低频
**预计回答时长**：15-30 分钟

**题目描述**：
假设你的前端应用覆盖全球多地区，请设计一套兼顾低延迟、高可用和成本可控的可观测性架构。

**参考答案**：

全球化架构要点：

1. **边缘采集**：
   - SDK 数据就近上报到边缘节点（PoP），减少跨洲延迟。
   - 使用 Anycast 或 GeoDNS 路由到最近接入点。

2. **区域聚合**：
   - 边缘节点做第一层聚合、采样、脱敏。
   - 只把聚合后的指标和抽样日志回传到中心。

3. **多区域存储**：
   - 指标：每个大区部署 Prometheus/VictoriaMetrics，中心做全局查询。
   - 日志：按合规要求分区域存储，欧盟数据留欧盟。
   - 链路：采样率按区域动态调整。

4. **CDN 与监控结合**：
   - 监控多 CDN 厂商质量，自动切换。
   - 采集数据走 CDN 边缘日志，减少 SDK 上报量。

5. **成本优化**：
   - 采样率分层：核心市场高采样，长尾市场低采样。
   - 冷热分层：7 天热存储，30 天温存储，长期归档到对象存储。
   - 聚合降精：原始日志保留 1%，指标保留全量。
   - 按团队/地区分摊成本，驱动治理。

6. **合规与隐私**：
   - 遵守 GDPR、CCPA、中国个人信息保护法。
   - 敏感字段在端侧哈希，不支持反向解析。
   - 数据保留期限按地区法律配置。

架构示例：

```text
User (EU) → Edge Collector (Frankfurt) → Regional Kafka → Regional Storage
                                      ↓
User (APAC) → Edge Collector (Singapore) → Regional Kafka → Regional Storage
                                      ↓
                              Global Aggregation & Query Layer
```

**评分维度**：
- 能设计边缘采集和区域聚合（25%）
- 能说明多区域存储和合规（25%）
- 能提出采样、冷热分层等成本优化（25%）
- 能把 CDN 质量与可观测性结合（25%）

**常见错误**：
- 所有数据直接回传中心，延迟高且成本高。
- 忽略数据驻留合规要求。
- 全球统一采样率，导致重点区域数据不足。

**延伸追问**：
- 如何在不降低关键市场数据质量的前提下，把长尾市场成本降低 70%？
- 多区域存储后，如何做全局统一查询？

**相关题目**：
- [FB-24-SD-P-001 如何设计一个前端可观测性平台](#FB-24-SD-P-001)
- [FB-24-SD-R-004 设计多 CDN 监控与自动切换](#FB-24-SD-R-004)

**参考资源**：
- [AWS - Global Data Residency](https://aws.amazon.com/compliance/gdpr-center/)
- [Cloudflare - Observability at the edge](https://www.cloudflare.com/learning/performance/what-is-edge-computing/)

**口头回答版**：
> 全球化可观测性要让 SDK 就近报到边缘节点，先在边缘聚合、采样、脱敏，再把指标和抽样日志回中心。存储要分区域，满足数据驻留合规。成本上核心市场采样率高，长尾低，日志冷热分层，原始只保留抽样。还要多 CDN 监控自动切换，把 CDN 日志也作为数据来源。

---

### FB-24-SD-R-004：如何设计多 CDN 监控与自动切换？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：24 前端运维与监控
**标签**：CDN、可观测性、Performance、高可用、成本
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套多 CDN 监控与自动切换系统，当某个 CDN 出现故障或性能退化时，能够快速将流量切换到备用 CDN。

**参考答案**：

系统目标：

- 高可用：单 CDN 故障时用户无感知切换。
- 性能最优：根据实时质量选择最佳 CDN。
- 成本可控：按价格和质量综合调度。

架构组成：

1. **质量探测层**：
   - 在全球多个节点主动探测各 CDN 的可用性、TTFB、下载速度、错误率。
   - 同时采集 RUM 数据，反映真实用户体验。

2. **决策中心**：
   - 实时聚合探测和 RUM 数据。
   - 按国家/运营商/资源类型维护 CDN 质量分。
   - 策略：可用性权重 50%、延迟 30%、成本 20%。

3. **调度执行层**：
   - DNS 调度：根据用户 IP 返回最优 CDN CNAME。
   - HTTP 302 调度：边缘返回重定向到备用 CDN。
   - 客户端调度：前端 SDK 根据下发的 CDN 优先级动态替换资源域名。

4. **切换策略**：
   - 自动切换：主 CDN 可用性 < 99% 或错误率 > 1% 持续 3 分钟。
   - 灰度切换：先切 5% 流量观察，再逐步扩大。
   - 回切：主 CDN 恢复稳定 10 分钟后按 10% 阶梯回切。

5. **监控与告警**：
   - 记录每次切换事件、影响用户数、恢复时间。
   - 对切换失败、质量分骤降、成本异常告警。

示例配置：

```json
{
  "cdns": [
    { "name": "A", "domain": "cdn-a.example.com", "weight": 70, "region": ["CN", "US"] },
    { "name": "B", "domain": "cdn-b.example.com", "weight": 30, "region": ["EU", "APAC"] }
  ],
  "failover": { "errorRate": 0.01, "durationSec": 180 }
}
```

风险控制：

- 切换前检查备用 CDN 是否已有该资源缓存，避免回源打爆。
- 设置全局开关，支持一键切回主 CDN。
- 切换时优先静态资源，HTML 仍由 DNS 控制，防止版本错乱。

**评分维度**：
- 能设计探测、决策、执行三层架构（30%）
- 能说明调度方式（DNS/302/客户端）和切换策略（25%）
- 能提到灰度切换和回切（20%）
- 能考虑缓存预热和风险控制（25%）

**常见错误**：
- 只依赖探测节点，忽略真实用户数据。
- 切换时不考虑备用 CDN 缓存命中率，导致回源失败。
- 切换后没有自动回切机制。

**延伸追问**：
- 如果两个 CDN 同时出现区域性故障，如何兜底？
- 多 CDN 切换后，如何保证日志和计费数据一致？

**相关题目**：
- [FB-24-EN-B-007 CDN 与缓存监控需要关注哪些指标](#FB-24-EN-B-007)
- [FB-24-SD-R-003 全球化的前端可观测性与成本优化](#FB-24-SD-R-003)

**参考资源**：
- [Cloudflare - Multi-CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
- [AWS - Route 53 Routing Policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)

**口头回答版**：
> 多 CDN 监控需要探测层测各 CDN 可用性和延迟，同时用 RUM 真实数据；决策层算质量分；执行层用 DNS、302 或客户端替换域名来切换。切换要灰度，主 CDN 恢复后阶梯回切。要注意备用 CDN 有没有缓存，别一切换就回源失败。还要有全局开关和自动回切。

---

### FB-24-SS-R-005：如何让前端 SLO 与业务结果挂钩，并推动可靠性文化？

**题型**：软技能题
**难度**：⚫ 架构
**岗位层级**：架构师 / 技术负责人
**面试知识域**：24 前端运维与监控
**标签**：可观测性、可用性、高可用、Performance、成本
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明如何制定和运营前端 SLO，使其不只是技术指标，而是能反映业务价值，并推动团队形成可靠性文化。

**参考答案**：

让 SLO 与业务挂钩：

1. **选择业务相关指标**：
   - 电商：支付成功率、加购转化率、结账流程 LCP/INP。
   - 内容：视频首帧时间、播放卡顿率、停留时长。
   - 把技术指标映射到业务漏斗的每一步。

2. **量化影响**：
   - 通过 A/B 实验或历史回归，估算 LCP 每增加 1s 对转化率的影响。
   - 用“每 0.1% 错误率 = X 万元损失”来沟通。

3. **分层 SLO**：
   - 公司级：整体可用性、核心页面 CWV。
   - 团队级：各业务线/页面的 SLO。
   - 个人级：上线质量门禁、性能预算。

4. **运营机制**：
   - 每周 SLO 看板 Review，公开各团队达成情况。
   - 错误预算消耗过半时启动发布审批。
   - 未达标团队给出改进计划，纳入 OKR。

推动可靠性文化：

- **左移**：在 CI 中加入性能预算、错误率门禁。
- **可观测共享**：让产品、运营也能看懂核心看板。
- **事故复盘公开化**：无追责，聚焦系统改进。
- **奖励机制**：把 SLO 达成与团队绩效、稳定性奖金挂钩。
- **Reliability Champion**：每个团队指定可靠性负责人。

沟通技巧：

- 用业务语言替代技术术语：不说“CLS 高了”，说“页面跳动导致用户误点取消”。
- 提供选项：修复需要 2 人日 vs 潜在损失 X 万。

**评分维度**：
- 能把技术指标映射到业务指标（30%）
- 能设计分层 SLO 和运营机制（30%）
- 能提出左移、复盘、激励机制（25%）
- 能用业务语言沟通技术风险（15%）

**常见错误**：
- SLO 只由 SRE 团队制定，业务方不参与。
- 只追求 99.99%，忽略成本。
- 未达成 SLO 后没有改进动作，变成数字游戏。

**延伸追问**：
- 如果业务方认为性能优化不影响收入，你怎么说服？
- SLO 达成和发布速度冲突时如何取舍？

**相关题目**：
- [FB-24-CO-P-002 如何制定前端 SLI/SLO](#FB-24-CO-P-002)
- [FB-24-CP-R-007 大规模前端故障的治理机制](#FB-24-CP-R-007)

**参考资源**：
- [Google SRE - Error Budgets](https://sre.google/workbook/error-budget-policy/)
- [web.dev - How Core Web Vitals affect your business](https://web.dev/articles/how-core-web-vitals-affect-your-business)

**口头回答版**：
> 让 SLO 和业务挂钩，要先把 LCP、错误率这些技术指标映射到转化率、支付成功率等业务指标，算清楚每慢一秒损失多少钱。然后分层设 SLO，公司级、团队级、个人级，每周 review，错误预算快用完就收紧发布。推动文化要靠左移门禁、无追责复盘、可靠性负责人和绩效挂钩。沟通时要用业务语言，比如页面跳动导致误点。

---

### FB-24-SD-R-006：如何设计从前端到后端的全链路 Trace？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：24 前端运维与监控
**标签**：可观测性、SDK、Performance、Metrics、可用性
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套端到端的链路追踪方案，能够从前端页面请求开始，串联 BFF、后端服务、数据库和第三方调用，并说明 Trace ID 的生成、传播和存储。

**参考答案**：

链路追踪目标：

- 前端用户点击 → 页面加载 → API 请求 → BFF → 后端服务 → DB/缓存/第三方 → 返回渲染。
- 每个环节都有耗时、状态、错误信息。

Trace 模型：

- **Trace**：一次完整请求链路。
- **Span**：链路中的一个操作片段，包含 operation name、start/end time、tags、logs。
- **Trace ID**：全局唯一标识一次 Trace。
- **Parent Span ID**：标识调用关系。

Trace ID 生成与传播：

1. **生成**：
   - 页面加载时由前端 SDK 生成 `trace-id`（UUIDv7 或雪花算法，保证时间有序）。
   - 保存在 `window.__TRACE_ID__`，后续所有请求带该 ID。

2. **HTTP 传播**：
   - 请求头：`x-trace-id`、`x-span-id`、`x-parent-span-id`。
   - 遵循 W3C Trace Context：`traceparent`、`tracestate`。
   - 跨域请求需确保头字段在 CORS 允许列表中。

3. **异步传播**：
   - 定时器、Promise、事件监听器中通过 AsyncContext 或 zone.js 保持上下文。

4. **框架集成**：
   - React/Vue 路由切换时生成新的 Span。
   - 组件渲染耗时通过 Profiler API 记录为 Span。

示例：

```javascript
// 前端 SDK 生成 Trace ID
const traceId = generateTraceId();
fetch('/api/order', {
  headers: { 'x-trace-id': traceId, 'x-span-id': spanId }
});
```

存储与查询：

- 使用 Jaeger/Tempo/SkyWalking 存储 span。
- 前端 span 以 OTLP/JSON 格式上报到 collector。
- 查询时按 trace-id 聚合所有 span，生成火焰图。

成本与采样：

- 全量链路成本过高，生产环境通常 1%-10% 采样。
- 错误链路 100% 采样。
- 对核心交易链路可提高采样率。

**评分维度**：
- 能说明 Trace/Span/Trace ID/Parent Span ID 概念（25%）
- 能设计生成、传播、HTTP 头规范（30%）
- 能处理异步和框架集成（20%）
- 能提到采样策略和存储选型（25%）

**常见错误**：
- Trace ID 只在后端生成，前端无法串联首屏加载。
- 跨域请求未透传 trace header。
- 异步调用丢失上下文，导致链路断裂。

**延伸追问**：
- 在 SSR 场景下，Trace ID 应该由服务端还是客户端生成？
- 如何处理第三方 SDK 调用无法传播 Trace ID 的情况？

**相关题目**：
- [FB-24-CO-B-001 什么是前端可观测性](#FB-24-CO-B-001)
- [FB-24-SD-P-001 如何设计一个前端可观测性平台](#FB-24-SD-P-001)

**参考资源**：
- [W3C Trace Context](https://www.w3.org/TR/trace-context/)
- [OpenTelemetry - Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/)

**口头回答版**：
> 全链路 Trace 要在页面加载时由前端 SDK 生成 trace-id，后面所有请求都带这个 ID 和 span 信息，通常用 W3C traceparent 头。后端接到后继续透传。每个操作都是 Span，最后按 trace-id 聚合看火焰图。异步调用要保持上下文，采样率生产环境 1% 到 10%，出错的全采。

---

### FB-24-CP-R-007：大规模前端团队如何建立故障治理机制？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师 / 技术负责人
**面试知识域**：24 前端运维与监控
**标签**：可观测性、错误监控、可用性、高可用、Performance
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请从组织、流程、技术三个维度，说明大规模前端团队如何系统性地预防和治理线上故障。

**参考答案**：

组织维度：

- **可靠性委员会**：跨业务线 SRE/前端负责人，定期评审 SLO 和重大风险。
- **稳定性负责人**：每个业务团队指定 reliability owner。
- **On-call 轮值**：前端团队自身承担一线 on-call，减少交接成本。
- **故障演练**：季度级红蓝对抗、混沌工程演练。

流程维度：

- **发布门禁**：CI 中跑性能预算、错误率阈值、E2E、可视回归。
- **灰度发布**： mandatory canary，自动熔断。
- **变更关联**：每次发布自动关联监控告警，发布窗口内错误率异常自动暂停。
- **事故管理**：统一 incident 标签、Postmortem 模板、action item 跟踪。
- **知识库**：Runbook、历史事故、排查手册可搜索。

技术维度：

- **统一 SDK 与平台**：一个公司级 RUM/错误/日志平台，数据标准统一。
- **可观测性左移**：开发环境即可查看本地 trace、性能热力图。
- **自动降级与熔断**：核心依赖失败自动兜底。
- **版本与回滚**：一键回滚、多版本共存、特性开关。
- **依赖治理**：第三方库安全扫描、版本锁定、supply chain 监控。

度量指标：

- MTTR（平均修复时间）、MTTD（平均发现时间）。
- 错误预算达成率。
- 发布成功率、回滚率。
- 告警准确率、on-call 负荷。

治理闭环：

```text
预防（左移/演练） → 发现（监控/告警） → 响应（on-call/runbook） → 复盘（postmortem） → 改进（action item） → 再预防
```

**评分维度**：
- 能从组织、流程、技术三个维度展开（30%）
- 能给出具体机制和工具（25%）
- 能设计度量指标（20%）
- 能描述闭环治理流程（25%）

**常见错误**：
- 只抓技术，不抓组织和流程。
- 度量指标过多，团队疲于应付。
- 故障复盘后 action item 无人跟进。

**延伸追问**：
- 如何在不显著增加团队负担的情况下推行稳定性治理？
- 多业务线 KPI 冲突时，如何统一可靠性优先级？

**相关题目**：
- [FB-24-SS-P-003 线上故障的 Incident Response 流程](#FB-24-SS-P-003)
- [FB-24-SS-R-005 如何让前端 SLO 与业务结果挂钩](#FB-24-SS-R-005)

**参考资源**：
- [Google SRE - Reliability Culture](https://sre.google/workbook/culture/)
- [Netflix Tech Blog - Failure Modes](https://netflixtechblog.com/failure-modes-in-distributed-systems-8b7378dba94e)

**口头回答版**：
> 大规模前端故障治理要三方面一起抓：组织上要有可靠性委员会、稳定性负责人和 on-call；流程上要有发布门禁、灰度熔断、变更关联、事故复盘；技术上要有统一监控平台、可观测性左移、自动降级、一键回滚。还要度量 MTTR、错误预算、告警准确率，形成预防-发现-响应-复盘-改进的闭环。

