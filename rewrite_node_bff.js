const fs = require('fs');

const path = 'interview-bank/by-domain/19-node-bff.md';
let content = fs.readFileSync(path, 'utf-8');

const replacements = {
  'FB-19-CO-B-038': `### FB-19-CO-B-038：在 Node.js BFF 中，如何利用 OpenTelemetry 实现分布式链路追踪？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：19 Node.js / BFF
**标签**：链路追踪、XSS
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
假设你正在维护一个基于 Express/NestJS 的 BFF 服务，上游是 Web/App 客户端，下游调用多个微服务。请说明如何在 Node.js 中接入 OpenTelemetry，实现请求全链路的 Trace 采集、上下文传递与可视化。

**参考答案**：

在 Node.js BFF 中落地链路追踪，通常围绕 Trace、Span、Context 三个核心概念展开：

1. **接入 SDK**：通过 `require('@opentelemetry/sdk-node')` 初始化 NodeSDK，配置资源属性（service.name、deployment.environment）和导出器（OTLP/HTTP 或 Jaeger）。
2. **自动埋点**：使用 `@opentelemetry/auto-instrumentations-node` 自动为 http、express、koa、graphql、ioredis 等库创建 Span，减少手工埋点成本。
3. **跨进程传播**：在 BFF 作为中间层时，需从上游请求头解析 W3C traceparent / tracestate，并在调用下游服务时注入相同头，保证 Trace ID 连续。
4. **手动埋点补充关键路径**：对聚合逻辑、缓存访问、外部 RPC 使用 `tracer.startActiveSpan()` 创建子 Span，并设置属性（如下游服务名、状态码）和事件（如 cache.hit）。
5. **采样与性能平衡**：生产环境使用 ParentBasedSampler + TraceIdRatioBased 控制采样率，避免全量采集拖垮 BFF；关键链路可强制采样。
6. **可视化**：将 Span 上报至 Jaeger、Grafana Tempo 或云厂商 APM，通过 TraceID 串联一次请求在 BFF 及下游微服务中的完整路径。

BFF 中的典型注意点：
- 异步调用需确保 Span 上下文在 async/await、Promise.all 中正确传递。
- 不要将所有内部变量都放入 Baggage，避免请求头过大。
- 错误 Span 应记录 exception.message 和 stack，便于定位超时或下游故障。

**评分维度**：
- 能说出 Trace/Span/Context 的基本关系（20%）
- 能说明自动埋点和手动埋点的适用场景（25%）
- 能解释 traceparent 在 BFF 上下游之间的传播机制（25%）
- 能提到采样策略与性能平衡（15%）
- 能给出 Jaeger/Tempo/云 APM 等可视化方案（15%）

**常见错误**：
- 认为链路追踪只在网关层做，忽略了 BFF 作为聚合层也需要透传 Trace ID。
- 在异步聚合（Promise.all）中丢失 Span 上下文，导致子 Span 挂在错误的父 Span 下。
- 采样率设置过高，导致 BFF CPU/内存和上报带宽被拖垮。

**延伸追问**：
- 如果下游微服务没有接入 OpenTelemetry，BFF 还能不能保持链路完整？
- 在 NestJS 中，如何通过 Interceptor 统一为每个请求创建一个顶层 Span？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [OpenTelemetry Node.js 自动埋点文档](https://opentelemetry.io/docs/instrumentation/js/automatic/)
- [OpenTelemetry 上下文传播规范](https://opentelemetry.io/docs/concepts/signals/traces/#context-propagation)
- [W3C Trace Context](https://www.w3.org/TR/trace-context/)

**口头回答版**：
> 在 Node.js BFF 里做链路追踪，我通常用 OpenTelemetry。先初始化 SDK 配好导出器，再用自动埋点包把 http、express、redis 这些库的 Span 自动打出来。关键是 BFF 作为中间层，要从上游请求头里解析 traceparent，调用下游时再把同样的头带过去，这样 Trace ID 才能串起来。对复杂的聚合逻辑，我会手动 startActiveSpan 创建子 Span，记录 cache hit、下游服务名这些信息。生产环境要注意采样率，别全量上报把服务拖垮。最后把数据发到 Jaeger 或 Grafana Tempo 做可视化。`,

  'FB-19-SC-B-001': `### FB-19-SC-B-001：在为 BFF 商品搜索接口建立索引时，如何设计可观测指标体系？

**题型**：场景设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：19 Node.js / BFF
**标签**：索引、指标
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
某电商 BFF 需要为商品搜索接口（底层依赖 Elasticsearch 或 Meilisearch）建立索引监控。请设计一套可观测指标方案，帮助团队快速发现索引延迟、数据不一致和查询异常。

**参考答案**：

针对 BFF 搜索索引场景，指标设计应覆盖“索引侧—BFF 侧—用户侧”三层：

1. **索引侧指标**：
   - 索引刷新延迟（index.refresh_latency）：从商品数据变更到可被搜索的时间。
   - 索引文档数与主库差异（index.doc_lag）：定期比对 ES 文档数与商品库数量。
   - 索引失败率（index.failure_rate）：批量写入失败或拒绝的占比。

2. **BFF 侧指标**：
   - 搜索接口 QPS、P99 延迟、错误率（按关键词、类目维度拆分）。
   - 缓存命中率（search.cache.hit_rate）：如 Redis 缓存热门搜索结果。
   - 下游 ES 查询耗时（search.es_query_duration）和超时率。
   - 聚合/分页/排序阶段的 CPU/内存占用。

3. **用户侧指标**：
   - 零结果率（search.zero_result_rate）：反映索引质量或搜索词解析问题。
   - 结果点击率（search.click_through_rate）：间接验证索引相关性。

采集与告警：
- 使用 Prometheus + Grafana，BFF 通过 prom-client 暴露 /metrics。
- 对 P99 延迟、索引延迟、零结果率设置分级告警（P1/P2）。
- 日志中统一携带 traceId、keyword、category，便于与指标联动排查。

**评分维度**：
- 能从索引、BFF、用户三个层面设计指标（40%）
- 能给出 4 个以上具体指标名称及含义（30%）
- 能说明采集工具与告警策略（20%）
- 能提到日志与 trace 的联动排查（10%）

**常见错误**：
- 只关注接口延迟，忽略了索引延迟和数据一致性指标。
- 指标维度设计过少，无法按关键词/类目下钻定位问题。
- 告警阈值拍脑袋，导致大量误报或漏报。

**延伸追问**：
- 如果索引延迟突然升高，你会按什么顺序排查 BFF、消息队列和搜索引擎？
- 如何在 BFF 层用缓存缓解索引抖动对搜索接口的影响？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [prom-client 官方文档](https://github.com/siimon/prom-client)
- [Google SRE - 监控四个黄金指标](https://sre.google/sre-book/monitoring-distributed-systems/)
- [Elasticsearch 监控指标](https://www.elastic.co/guide/en/elasticsearch/reference/current/monitor-elasticsearch-cluster.html)

**口头回答版**：
> 我会把指标分成三层：索引侧看刷新延迟、文档数差异、写入失败率；BFF 侧看搜索接口 QPS、P99 延迟、错误率、缓存命中率和 ES 查询耗时；用户侧看零结果率和点击率。采集用 Prometheus + Grafana，BFF 用 prom-client 暴露 /metrics。告警要分级，比如 P99 延迟和索引延迟设 P1，零结果率设 P2。日志里带 traceId 和 keyword，方便和指标联动排查。`,

  'FB-19-PE-B-001': `### FB-19-PE-B-001：BFF 层聚合多个下游微服务接口时，如何排查和优化性能瓶颈？

**题型**：性能优化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：19 Node.js / BFF
**标签**：聚合、Saga
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
一个商品详情页的 BFF 接口需要并发调用用户服务、库存服务、价格服务、推荐服务，然后组装返回。最近该接口 P99 延迟从 80ms 上升到 300ms。请描述你的排查思路和优化手段。

**参考答案**：

排查 BFF 聚合接口性能问题，建议按“监控 → 定位 → 优化 → 验证”的闭环推进：

1. **建立监控基线**：
   - 记录 BFF 接口总耗时、QPS、错误率。
   - 对每个下游调用记录开始时间、结束时间、状态码、响应体大小。
   - 使用 Async Hooks 或 OpenTelemetry 生成瀑布图，直观看到是串行还是并行。

2. **常见瓶颈定位**：
   - **串行调用**：代码里多个 await 顺序执行，未使用 Promise.all。
   - **慢服务拖累**：某个下游 P99 暴涨，拖累整体聚合。
   - **大对象序列化**：JSON.parse/stringify 巨型响应体消耗 CPU。
   - **连接池耗尽**：HTTP Agent 默认连接数不足，导致请求排队。
   - **超时配置不合理**：未设置 timeout，慢请求占用事件循环。

3. **优化手段**：
   - 将无依赖的下游调用改为 `Promise.all`/`Promise.allSettled`。
   - 对读多写少的数据加 Redis 缓存，设置合理的 TTL 和降级策略。
   - 使用 `got`/`undici` 并配置 keep-alive 与合理 maxSockets。
   - 对非核心服务设置更短的 timeout 并启用熔断/降级。
   - 对返回字段做裁剪，避免传输无用数据。

4. **验证**：
   - 压测对比优化前后的 P99、P95、错误率。
   - 灰度发布，观察线上核心指标回归情况。

**评分维度**：
- 能列出 3 种以上聚合接口常见瓶颈（30%）
- 能说明监控和定位的具体方法（25%）
- 能给出 3 种以上可落地优化手段（30%）
- 能提到压测/灰度验证（15%）

**常见错误**：
- 一味加机器，而不是先分析是真慢还是调用方式问题。
- 把所有下游调用都改成 Promise.all，忽略了依赖关系和数据一致性。
- 只优化平均延迟，忽略了长尾 P99。

**延伸追问**：
- 如果库存服务偶尔 500ms 超时，BFF 应该熔断还是降级？如何设计降级数据？
- Promise.allSettled 和 Promise.all 在聚合场景下各有什么风险？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js HTTP Agent 文档](https://nodejs.org/api/http.html#class-httpagent)
- [undici 性能优化指南](https://undici.nodejs.org/#/docs/api/Agent)
- [Google SRE - 处理延迟](https://sre.google/sre-book/handling-overload/)

**口头回答版**：
> 我会先埋点看每个下游的耗时瀑布图，定位是串行调用、某个服务慢、连接池不够，还是 JSON 序列化太耗 CPU。常见优化包括把无依赖调用改成 Promise.all、加 Redis 缓存、用 keep-alive 连接池、对非核心服务设置短超时和降级。最后通过压测和灰度验证 P99 是否回归。`,

  'FB-19-EN-B-001': `### FB-19-EN-B-001：在 Node.js BFF 项目中，如何利用边缘计算（如 Cloudflare Workers）落地 HTTP/2 服务？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：19 Node.js / BFF
**标签**：HTTP/2、Cloudflare Workers
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
公司希望将部分 BFF 能力（如鉴权、缓存、AB 实验分流）下沉到边缘节点，以减少回源延迟。请说明在 Node.js BFF 项目中，如何结合边缘计算（以 Cloudflare Workers 为例）落地 HTTP/2 服务。

**参考答案**：

将 BFF 能力下沉到边缘节点，需要兼顾运行时差异、协议特性与部署治理：

1. **运行时适配**：
   - Cloudflare Workers 基于 V8 Isolates，不是完整 Node.js，需确认 BFF 代码不依赖 `fs`、`crypto` 的 Node 特有 API。
   - 优先使用 Web 标准 API（`fetch`、`Request`、`Response`、`Headers`），与 Node.js 18+ 的 fetch 保持一致。

2. **HTTP/2 特性利用**：
   - 边缘侧原生支持 HTTP/2 多路复用，适合合并多个小请求。
   - 对静态资源和可缓存 BFF 响应设置 `cache-control`，利用边缘缓存减少回源。
   - 注意 Workers 当前不支持 HTTP/2 Server Push，需避免按该方案设计。

3. **BFF 能力拆分**：
   - 边缘层：鉴权校验、地理位置路由、简单 AB 实验、缓存命中响应。
   - 源站 Node.js BFF：复杂聚合、数据库/缓存访问、业务逻辑。

4. **开发与部署**：
   - 使用 Wrangler CLI 管理 Workers 路由、环境变量和 secrets。
   - 在 Node.js BFF 与 Workers 之间约定统一的错误码、traceId 传递。
   - 通过 CI/CD 双轨发布：Node.js BFF 走容器/K8s，Workers 走 Wrangler publish。

5. **监控与回滚**：
   - 边缘侧记录响应码、回源率、缓存命中率。
   - 保留从 Workers 回源到 Node.js BFF 的开关，便于快速回滚。

**评分维度**：
- 能说明 Workers 运行时与 Node.js 的差异（25%）
- 能结合 HTTP/2 特性给出边缘缓存/多路复用方案（25%）
- 能拆分边缘层与源站 BFF 的职责（25%）
- 能提到 Wrangler、CI/CD、监控与回滚机制（25%）

**常见错误**：
- 直接把完整 Node.js BFF 代码搬到 Workers，导致 fs/crypto 等 API 不可用。
- 忽略边缘节点的 CPU/内存限制，执行重计算任务。
- 未设计回源降级方案，一旦 Workers 异常就全站不可用。

**延伸追问**：
- 如果边缘节点需要访问 Redis，通常有哪些方案？
- 在 Workers 中如何做 JWT 鉴权，密钥如何安全存储？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Cloudflare Workers Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)
- [Cloudflare Workers 与 Node.js 兼容层](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)

**口头回答版**：
> 我会把鉴权、缓存、AB 实验这些轻量逻辑放到 Cloudflare Workers 这种边缘节点跑，复杂聚合还是留在源站 Node.js BFF。Workers 基于 V8 Isolate，不是完整 Node.js，所以代码要用 fetch、Headers 这些 Web 标准 API。HTTP/2 在边缘侧原生支持多路复用，可以合并小请求，还要配好 cache-control 利用边缘缓存。部署用 Wrangler，和 Node.js BFF 约定统一错误码和 traceId。最重要的是保留回源开关，一旦边缘异常能切回源站。`,

  'FB-19-SE-B-001': `### FB-19-SE-B-001：在 Node.js 中处理内存数据（如缓存、会话）时，有哪些常见安全风险及防御手段？

**题型**：安全题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：19 Node.js / BFF
**标签**：内存、冷启动
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
Node.js BFF 服务常把用户会话、Token、接口响应等敏感数据放在内存缓存（如 Node-cache、LRU）中。请分析其中常见的安全风险，并给出防御措施。

**参考答案**：

Node.js 内存数据处理中的主要安全风险及防御：

1. **原型链污染（Prototype Pollution）**：
   - 风险：攻击者通过 `__proto__`、`constructor.prototype` 污染 Object.prototype，影响全局对象行为。
   - 防御：使用 `Object.create(null)` 创建字典；对不可信输入做 key 白名单过滤；使用 `lodash.merge` 等库时升级到安全版本。

2. **不安全的反序列化**：
   - 风险：使用 `node-serialize`、`serialize-javascript` 反序列化不可信数据可能触发 RCE。
   - 防御：优先使用 `JSON.parse`；如需反序列化函数，必须签名验证且沙箱执行。

3. **敏感信息残留**：
   - 风险：JWT、密码、信用卡号长期驻留堆内存，可能被 core dump 或调试工具读取。
   - 防御：敏感数据使用完立即覆盖或置 null；限制日志打印；避免把密钥硬编码在代码中。

4. **内存缓存越权**：
   - 风险：多租户 BFF 中，缓存 key 未隔离导致 A 用户读到 B 用户数据。
   - 防御：缓存 key 必须包含用户/租户标识；对缓存值做完整性校验（HMAC）。

5. **DoS / 内存耗尽**：
   - 风险：无界缓存被攻击者塞满，导致进程 OOM。
   - 防御：设置缓存容量上限、TTL、最大单值大小；对 key 做长度限制。

**评分维度**：
- 能识别原型链污染、反序列化、敏感信息残留三类风险（45%）
- 能给出每类风险的具体防御措施（35%）
- 能提到缓存隔离与容量控制（20%）

**常见错误**：
- 认为内存数据只在当前请求内有效，忽略 Node.js 进程级缓存的共享风险。
- 使用 `eval` 或 `new Function` 处理缓存中的动态配置。
- 缓存 key 只用业务 ID，未加租户或用户维度。

**延伸追问**：
- 如果 BFF 使用 cluster 多进程，内存缓存会出现什么问题？如何解决？
- 如何在 Node.js 中安全地清理包含敏感字符串的 Buffer？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js 安全最佳实践](https://nodejs.org/en/docs/guides/security/)
- [OWASP Prototype Pollution Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html)
- [Snyk - Insecure Deserialization in Node.js](https://snyk.io/blog/serialization-and-rce-in-node-js/)

**口头回答版**：
> Node.js 里处理内存数据要注意几个风险：一是原型链污染，攻击者通过 __proto__ 污染全局对象，防御要用 Object.create(null) 和 key 白名单；二是不安全反序列化，尽量用 JSON.parse，不要用能执行代码的序列化库；三是敏感信息残留，JWT 和密码用完要尽快释放，别打日志；四是缓存越权，key 里必须带用户或租户 ID；最后还要设缓存容量上限和 TTL，防止被塞满 OOM。`,

  'FB-19-SD-B-001': `### FB-19-SD-B-001：如何设计一个支持 TypeScript 热编译与类型检查的 Node.js 运行时工作流？

**题型**：系统设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：19 Node.js / BFF
**标签**：TypeScript、V8
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
团队希望在 Node.js BFF 项目中直接使用 TypeScript 开发，同时兼顾开发体验（热更新、类型检查）与生产性能。请设计一套从开发到生产的 TypeScript 运行时工作流。

**参考答案**：

一套兼顾开发效率与生产性能的 TypeScript 工作流可分为三层：

1. **开发阶段**：
   - 使用 `tsx` 或 `ts-node --transpile-only` 启动服务，利用 esbuild/SWC 做快速转译，实现秒级热重载。
   - 类型检查与运行分离：单独跑 `tsc --noEmit` 在 CI 或编辑器中完成，不阻塞服务启动。
   - 使用 `nodemon` 或 Node.js `--watch` 监听 .ts 文件变更并自动重启。

2. **构建阶段**：
   - 生产构建使用 `tsc` 或 `esbuild` 将 TypeScript 编译为 JavaScript，输出到 `dist/`。
   - 开启 `sourceMap` 便于线上问题定位；通过 `tsconfig-paths` 或构建工具处理路径别名。
   - 在 CI 中并行执行：单元测试、类型检查、构建产物校验。

3. **运行阶段**：
   - 生产直接运行 `node dist/main.js`，避免线上 JIT 转译带来的性能损耗和内存开销。
   - 容器镜像基于 `node:20-alpine` 或 `node:20-slim`，仅复制 dist 与依赖，排除源码和 devDependencies。
   - 通过 `package.json` 的 `type: "module"` 统一使用 ESM，或明确 `.cjs`/`.mjs` 边界。

4. **关键取舍**：
   - 开发求快：transpile-only + SWC。
   - 生产求稳：预编译 + 类型检查前置 + 最小化镜像。

**评分维度**：
- 能区分开发、构建、运行三个阶段的设计（30%）
- 能说明 tsx/ts-node 与 tsc 的适用场景（25%）
- 能解释类型检查与运行分离的原因（20%）
- 能提到生产环境避免线上转译（15%）
- 能提到 ESM/CJS 模块边界（10%）

**常见错误**：
- 生产环境直接用 ts-node 运行 .ts 文件，导致启动慢、内存高。
- 类型检查阻塞服务启动，开发体验差。
- 构建产物未清理 devDependencies，镜像体积过大。

**延伸追问**：
- 如果项目使用路径别名（如 `@/services`），如何在生产运行时正确解析？
- tsx 和 ts-node 在实现原理上有什么区别？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [tsx 官方文档](https://github.com/privatenumber/tsx)
- [ts-node 文档](https://typestrong.org/ts-node/)
- [Node.js TypeScript 支持路线图](https://nodejs.org/api/typescript.html)

**口头回答版**：
> 我会把工作流分成开发、构建、运行三个阶段。开发用 tsx 或 ts-node --transpile-only 做快速转译，类型检查单独跑 tsc --noEmit，不阻塞启动。构建阶段用 tsc 或 esbuild 预编译到 dist，配好 sourceMap 和路径别名。生产直接跑 node dist/main.js，别在线上转译。容器镜像用 alpine，只复制 dist 和 dependencies。这样开发快、生产稳。`,

  'FB-19-CP-B-001': `### FB-19-CP-B-001：在高并发 BFF 中，如何合理使用动态 import() 实现按需加载与模块隔离？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：19 Node.js / BFF
**标签**：高并发、import
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
一个高并发 BFF 服务启动时会加载大量中间件、路由和工具模块，导致冷启动时间较长。请结合动态 `import()` 谈谈你的优化思路和实践经验。

**参考答案**：

在高并发 BFF 中，合理使用动态 `import()` 可以在启动性能、内存占用和模块隔离之间取得平衡：

1. **按需加载路由/中间件**：
   - 将不常用的管理后台路由、报表导出模块改为动态导入，只在首次请求时加载。
   - 示例：`const { adminRouter } = await import('./routes/admin.js');`

2. **减少启动时模块解析**：
   - Node.js require/import 的模块图在启动时构建，动态导入延迟了子图的解析和编译，降低冷启动时间。
   - 对 serverless/FaaS 场景尤为重要，可显著减少函数冷启动耗时。

3. **模块隔离与错误边界**：
   - 把可选依赖（如特定云厂商 SDK、PDF 生成库）动态导入，主流程不因为该模块加载失败而崩溃。
   - 配合 `try/catch` 实现优雅降级：加载失败时返回默认值或走兜底逻辑。

4. **高并发注意事项**：
   - 动态导入首次会有 I/O 开销，可能阻塞请求；对热点路径建议预加载或缓存导入结果。
   - 使用 `await import()` 时注意事件循环：虽然 import 是异步的，但模块执行是同步的，避免在模块顶层做重初始化。
   - 在 cluster/worker_threads 中，每个进程/线程独立维护模块缓存，动态导入不会跨进程共享。

5. **实践案例**：
   - 电商大促 BFF 中，将优惠券计算引擎按策略动态导入（满减、折扣、秒杀），避免启动时全部加载，内存下降约 30%。

**评分维度**：
- 能说明动态 import() 在 BFF 中的典型应用场景（30%）
- 能解释对冷启动和内存的影响（25%）
- 能提到错误隔离与降级（20%）
- 能说明高并发下首次加载和模块缓存的注意点（15%）
- 能结合自身项目举例（10%）

**常见错误**：
- 所有路由都用动态导入，导致首次请求延迟不可预测。
- 在请求热点路径反复调用 `import()`，未缓存模块实例。
- 忽略动态导入的模块顶层副作用，导致内存泄漏或重复初始化。

**延伸追问**：
- 动态 import() 在 CommonJS 和 ESM 中的行为有什么不同？
- 如果 BFF 使用 cluster 模式，动态导入的模块缓存是否共享？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [MDN - dynamic import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import)
- [Node.js ESM 文档](https://nodejs.org/api/esm.html#import-expressions)
- [V8 模块加载性能](https://v8.dev/features/modules)

**口头回答版**：
> 在高并发 BFF 里，我会把不常用的路由、管理后台、报表导出这些模块改成动态 import，只在第一次请求时加载，降低启动时间和内存。对可选依赖也动态导入，加载失败不影响主流程。但热点路径不能每次都动态导入，要缓存结果，不然首次请求会慢。事件循环方面要注意，import 是异步的，但模块执行是同步的，顶层别做太重的事。cluster 模式下每个进程模块缓存是独立的。`,

  'FB-19-CA-B-001': `### FB-19-CA-B-001：下面一段 Node.js 缓存代码存在缓存击穿风险，输出是什么？请分析原因。

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：19 Node.js / BFF
**标签**：缓存击穿、集群
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
某 BFF 服务用 Node.js 内存缓存商品详情，代码如下。请分析当 key 过期且并发请求到达时会出现什么问题，并说明输出特征。

\`\`\`js
const cache = new Map();

async function getProduct(id) {
  if (cache.has(id)) {
    return cache.get(id);
  }
  const product = await fetchFromDatabase(id); // 耗时 200ms
  cache.set(id, product, { ttl: 5000 });
  return product;
}

// 模拟 10 个并发请求
for (let i = 0; i < 10; i++) {
  getProduct('sku-1001').then(console.log);
}
\`\`\`

假设 
fetchFromDatabase
 每次返回不同的对象引用，且没有互斥锁或单飞机制。

**参考答案**：

输出特征：
- 控制台会打印 10 次数据库查询结果（可能对象引用不同）。
- 在第一个请求把结果写入缓存之前，其余 9 个请求都会穿透到数据库。
- 数据库会被同一 key 瞬间查询 10 次，形成缓存击穿。

原因分析：
1. `cache.has(id)` 在多个并发请求同时判断时都为 false，因为此时缓存中没有该 key。
2. 所有请求都进入 `fetchFromDatabase(id)`，导致同一资源被重复加载。
3. `Map` 的 set 操作不是原子的，最终虽然缓存会被写入，但已造成数据库压力。

修复思路：
- 使用互斥锁（如 `async-mutex`、`p-lock`）保证同一 key 同时只有一个请求去加载。
- 或采用“单飞”（singleflight）模式：相同 key 的并发请求共享同一个 Promise。
- 生产环境建议使用 Redis + 分布式锁，或使用 Node.js 生态的 `node-cache`/`lru-cache` 提供的 `allowStale` + `updateAgeOnGet` 策略。

**评分维度**：
- 能正确判断 10 个请求会同时击穿到数据库（40%）
- 能解释并发下 `cache.has` 判断竞态的原因（30%）
- 能给出互斥锁或单飞模式的修复方案（20%）
- 能提到分布式缓存下的扩展（10%）

**常见错误**：
- 认为 Map 的 set 操作是原子的，只会查询一次数据库。
- 只建议在数据库加索引，不从缓存层解决并发竞态。
- 混淆缓存击穿与缓存穿透、缓存雪崩。

**延伸追问**：
- 如果换成 Redis 缓存，如何用 Redlock 或 Lua 脚本避免同一 key 并发回源？
- lru-cache 的 `allowStale` 选项如何缓解缓存击穿？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [lru-cache 文档](https://github.com/isaacs/node-lru-cache)
- [async-mutex 文档](https://github.com/DirtyHairy/async-mutex)
- [Redis 分布式锁 Redlock](https://redis.io/docs/manual/patterns/distributed-locks/)

**口头回答版**：
> 这段代码会打印 10 次数据库查询结果，因为当 key 不存在时，10 个并发请求同时判断 cache.has 都是 false，都会去打数据库，造成缓存击穿。修复可以用互斥锁或单飞模式，让同一个 key 同时只有一个请求去加载，其他请求等这个 Promise 完成。生产环境用 Redis 的话，还要考虑分布式锁。`,

  'FB-19-SS-A-001': `### FB-19-SS-A-001：请分享一次你在生产环境中使用 Node.js cluster/PM2 提升服务吞吐量的经历。

**题型**：软技能题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：19 Node.js / BFF
**标签**：cluster、setImmediate
**出现频率**：高频
**预计回答时长**：5-7 分钟

**题目描述**：
请结合一个真实或你熟悉的项目，讲述你如何通过 Node.js cluster 模块或 PM2 提升 BFF 服务吞吐量，并说明你在其中承担的角色、遇到的挑战和最终收益。

**参考答案**：

回答应围绕具体项目展开，建议包含以下要素：

1. **背景与目标**：
   - 项目类型：例如电商大促 BFF、内容聚合网关。
   - 当时问题：单进程 Node.js CPU 利用率低（仅跑满 1 核），QPS 瓶颈明显，响应延迟长尾严重。
   - 目标：在相同机器规格下提升 QPS，降低 P99 延迟，并保证故障自动恢复。

2. **具体行动**：
   - 技术选型：对比原生 cluster 模块与 PM2，最终选择 PM2（生态成熟）或原生 cluster（更可控）。
   - 实施过程：配置 worker 数量与 CPU 核心数一致（或略少，留核心给系统与监控）；实现优雅关闭，处理完当前请求再退出；配置内存上限自动重启防止泄漏。
   - 关键决策：主进程只负责负载均衡和 worker 保活，不处理业务；worker 之间用 Redis 共享会话和缓存。

3. **结果与反思**：
   - 量化收益：QPS 从 1200 提升到 3800，P99 从 450ms 降到 180ms（需真实数据或合理估算）。
   - 踩坑：早期 worker 数设为 CPU 核数 2 倍，导致上下文切换开销增加；后调整为与核心数一致。
   - 团队协作：与运维一起制定滚动重启策略，避免发布时流量抖动。

4. **可复制性**：
   - 沉淀为团队 SOP：CPU 密集型服务优先使用 worker_threads；I/O 密集型 HTTP 服务使用 cluster/PM2。
   - 编写监控告警模板：worker 崩溃次数、重启频率、CPU/内存水位。

**评分维度**：
- 案例背景与目标清晰（25%）
- 技术选型和实施过程具体（30%）
- 能量化结果并反思踩坑（25%）
- 能提炼可复用的方法论（20%）

**常见错误**：
- 只说“用了 PM2 后性能变好了”，没有数据支撑和具体场景。
- 忽略 worker 间状态共享问题，仿佛所有数据都能天然共享。
- 把 cluster 和 worker_threads 混用场景讲错。

**延伸追问**：
- 如果 worker 之间需要共享 WebSocket 连接状态，你会怎么设计？
- PM2 的 cluster 模式和 fork 模式在负载均衡上有什么区别？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js cluster 模块文档](https://nodejs.org/api/cluster.html)
- [PM2 集群模式文档](https://pm2.keymetrics.io/docs/usage/cluster-mode/)
- [Node.js 多进程最佳实践](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/)

**口头回答版**：
> 我之前在一个电商 BFF 项目里用 PM2 把单进程改成多进程。当时单进程只能跑满一个核，QPS 到 1200 就上不去了。我们按 CPU 核数起 worker，主进程做负载均衡和保活，worker 之间用 Redis 共享会话。结果 QPS 提升到 3800，P99 也降了很多。踩过坑是 worker 数设太多导致上下文切换高，后来调整为和核心数一致。还配了内存上限自动重启，防止泄漏。我把这套方案沉淀成 SOP，新项目直接复用。`,

  'FB-19-CO-A-047': `### FB-19-CO-A-047：Node.js 中的动态 import() 与缓存预热在解决缓存击穿上有什么核心区别？

**题型**：概念题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：19 Node.js / BFF
**标签**：import、缓存击穿
**出现频率**：高频
**预计回答时长**：5-7 分钟

**题目描述**：
在 BFF 缓存设计中，有人提出用动态 
import()
 延迟加载 heavy 模块来降低启动缓存压力，也有人主张用缓存预热提前填充热点数据。请对比这两种思路的核心区别与适用场景。

**参考答案**：

动态 `import()` 与缓存预热解决的是不同层面的问题，核心区别如下：

| 维度 | 动态 import() | 缓存预热 |
|------|--------------|----------|
| 解决的问题 | 启动时模块加载过多导致的内存/CPU 压力 | 缓存冷启动或过期后大量请求击穿到数据库 |
| 作用对象 | 代码模块（module graph） | 业务数据（hot keys） |
| 触发时机 | 首次访问对应功能/路由时 | 服务启动后或定时任务中 |
| 对缓存击穿的影响 | 间接：减少启动负载，但不直接防止并发回源 | 直接：提前填充热点 key，降低击穿概率 |
| 典型实现 | 
await import('./heavy-module.js')
 | 启动时批量读取热点 SKU/用户数据写入 Redis |
| 风险 | 首次请求延迟、模块执行副作用 | 预热数据过期后仍需配合互斥锁/单飞 |

选型建议：
- 如果 BFF 启动慢是因为加载了大量 seldom-used 模块，使用动态 import()。
- 如果大促前缓存为空，担心热点 key 同时失效导致 DB 被打挂，使用缓存预热 + 互斥锁。
- 两者可以结合：启动时预热热点数据，同时将非核心模块动态导入。

**评分维度**：
- 能清晰区分两者解决的问题层面（30%）
- 能从触发时机、作用对象、风险三个维度对比（30%）
- 能给出具体实现方式（25%）
- 能说明两者可结合使用（15%）

**常见错误**：
- 把动态 import() 当成缓存击穿的直接解决方案。
- 认为缓存预热后就完全不会发生击穿，忽略了并发过期场景。
- 混淆模块加载延迟与数据回源延迟。

**延伸追问**：
- 如果缓存预热后数据在流量高峰过期，你还应该采取什么措施？
- 动态 import() 的模块加载失败，如何设计兜底逻辑？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [MDN - dynamic import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import)
- [Redis 缓存预热最佳实践](https://redis.io/docs/manual/patterns/)
- [Node.js 模块缓存机制](https://nodejs.org/api/modules.html#caching)

**口头回答版**：
> 动态 import 和缓存预热解决的问题不一样。动态 import 是减少启动时加载的模块，省内存和 CPU，它作用的是代码模块；缓存预热是提前把热点数据写到缓存里，防止请求同时打到数据库，作用的是业务数据。所以动态 import 不直接解决缓存击穿，缓存预热才能降低击穿概率，但预热后 key 过期还是要配互斥锁。实际项目里两者可以一起用。`,

  'FB-19-SC-A-001': `### FB-19-SC-A-001：在 BFF 缓存查询场景中，如何用设计模式解决缓存穿透问题？

**题型**：场景设计题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：19 Node.js / BFF
**标签**：缓存穿透、设计模式
**出现频率**：高频
**预计回答时长**：5-7 分钟

**题目描述**：
某 BFF 的商品详情接口使用 Redis 缓存。攻击者构造大量不存在的 SKU 请求，导致每次请求都穿透到数据库。请用设计模式思想设计一套缓存穿透防御方案。

**参考答案**：

解决缓存穿透，可组合使用以下设计模式与策略：

1. **空对象模式（Null Object Pattern）**：
   - 当数据库查询结果为空时，缓存一个短 TTL 的空值（如 `"__NULL__"`），避免同一无效 key 反复回源。
   - 读取缓存时识别空值并直接返回 404，不再查库。

2. **布隆过滤器（Bloom Filter）**：
   - 在 BFF 与 Redis 之间加一层 Bloom Filter，预加载所有合法 SKU。
   - 请求到达时先查 Bloom Filter，不存在直接返回，避免无效请求打到 Redis 和 DB。
   - 适合数据相对稳定的场景，新增 SKU 时需要重建或增量更新过滤器。

3. **代理模式 / 缓存门模式（Cache Aside with Guard）**：
   - 封装统一的 `getOrLoad(key, loader)` 方法，内部统一处理缓存读取、空值回填、互斥加载。
   - 所有缓存访问都走这个代理，避免业务代码散落重复逻辑。

4. **输入校验与限流**：
   - 在 BFF 入口对 SKU 格式、长度做白名单校验。
   - 对同一 IP/用户的不存在 key 请求做限流，降低攻击面。

5. **组合示例**：
   ```js
   async function getProduct(sku) {
     if (!bloomFilter.mightContain(sku)) return null;
     let cached = await redis.get(sku);
     if (cached === '__NULL__') return null;
     if (cached) return JSON.parse(cached);
     const dbResult = await db.product.findByPk(sku);
     await redis.setex(sku, 60, dbResult ? JSON.stringify(dbResult) : '__NULL__');
     return dbResult;
   }
   ```

**评分维度**：
- 能提到空对象模式与布隆过滤器两种核心方案（40%）
- 能说明各方案的适用场景与缺陷（25%）
- 能用代理模式统一缓存访问（15%）
- 能结合输入校验与限流做防御纵深（10%）
- 能给出可运行的伪代码（10%）

**常见错误**：
- 只加 Redis，不处理数据库返回为空的情况。
- 空值 TTL 设置过长，导致新增数据长时间无法被访问。
- 布隆过滤器更新不及时，把合法请求误判为不存在。

**延伸追问**：
- 如果合法 SKU 频繁新增，布隆过滤器如何增量更新？
- 空对象模式下，缓存被大量无效 key 占满怎么办？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Redis 缓存穿透、击穿、雪崩解决方案](https://redis.io/docs/manual/patterns/)
- [Bloom Filter 论文与实现](https://llimllib.github.io/bloomfilter-tutorial/)
- [Node.js 设计模式 - Proxy Pattern](https://nodejs.org/en/docs/guides/design-patterns/)

**口头回答版**：
> 解决缓存穿透我最常用两个模式：一个是空对象模式，数据库查不到时缓存一个短 TTL 的空值，避免反复回源；另一个是布隆过滤器，预加载合法 SKU，请求先查过滤器，不存在直接返回。还可以用代理模式把 getOrLoad 逻辑统一封装，业务代码只调这个方法。入口层还要做 SKU 格式校验和限流。实际代码里我会把 Bloom Filter、Redis、DB 三层串起来，查不到就写空值。`,

  'FB-19-PE-A-043': `### FB-19-PE-A-043：如何排查与优化 Deno 运行 BFF 服务时的性能瓶颈？

**题型**：性能优化题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：19 Node.js / BFF
**标签**：Deno、FaaS
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
团队尝试用 Deno 运行一个 BFF 服务，发现高并发下 CPU 占用高、响应延迟不稳定。请说明你会如何排查和优化 Deno 的性能瓶颈。

**参考答案**：

Deno 与 Node.js 在运行时、模块系统和权限模型上不同，排查思路应结合其特性：

1. **性能采集工具**：
   - 使用 Deno 内置的 `--prof` 或 `Deno.inspect` 生成 V8 CPU profile，用 Chrome DevTools 火焰图定位热点函数。
   - 使用 `deno bench` 做基准测试，对比不同实现的吞吐量。

2. **常见瓶颈定位**：
   - **TypeScript 即时编译**：Deno 默认会编译 TS，首次运行或冷启动时编译开销大；可用 `deno compile` 预编译为可执行文件。
   - **权限检查**：频繁的 `Deno.readFile`、`Deno.env` 等权限调用会累积开销；应在启动时读取配置并缓存。
   - **HTTP 服务实现**：Deno 的 `Deno.serve` 基于 Rust tokio，性能通常优于旧版 `serve` from std/http；确保使用最新 API。
   - **模块重复加载**：Deno 的 ESM 模块缓存与 Node.js 不同，检查是否重复动态导入同一模块。

3. **优化手段**：
   - 预编译产物部署到生产，减少启动编译时间。
   - 对数据库/外部服务使用连接池，避免每次请求新建连接。
   - 使用 Web Streams 或 Deno 的 ReadableStream 处理大响应，避免一次性加载到内存。
   - 对 CPU 密集型任务使用 Web Workers，避免阻塞主线程的事件循环。

4. **验证**：
   - 使用 `wrk` 或 `oha` 对优化前后做压测，对比 RPS、P99、CPU 占用。
   - 监控 Deno 进程的内存和文件描述符使用情况。

**评分维度**：
- 能说出 Deno 性能采集工具（25%）
- 能指出 TS 编译、权限检查、HTTP API 三类常见瓶颈（30%）
- 能给出 3 种以上优化手段（30%）
- 能提到压测验证（15%）

**常见错误**：
- 直接用 Node.js 的优化经验套到 Deno，忽略两者运行时差异。
- 使用旧版 std/http 而不是 `Deno.serve`。
- 忽略 Deno 的权限沙箱对文件/网络操作的性能影响。

**延伸追问**：
- Deno 的权限模型对 BFF 生产部署有什么利弊？
- 如果 Deno BFF 需要调用大量 Node.js 生态包，你会怎么处理？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Deno 性能分析文档](https://deno.land/manual/tools/profiling)
- [Deno.serve API](https://deno.land/api?s=Deno.serve)
- [Deno 部署与编译](https://deno.land/manual/tools/compiler)

**口头回答版**：
> 排查 Deno 性能我先用 --prof 生成 V8 profile，用 Chrome DevTools 看火焰图。常见瓶颈有 TypeScript 即时编译、权限检查开销、还有 HTTP API 选型。优化可以用 deno compile 预编译、启动时缓存配置、用 Deno.serve 而不是旧版 std/http、对 DB 用连接池。CPU 密集型任务放到 Web Worker。最后用 wrk 压测验证 RPS 和 P99。`,

  'FB-19-EN-A-048': `### FB-19-EN-A-048：在 Node.js BFF 对接 RocketMQ 消息队列时，如何落地限流与背压保护？

**题型**：工程化题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：19 Node.js / BFF
**标签**：RocketMQ、Rate Limit
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
某 BFF 需要消费 RocketMQ 的订单消息做数据聚合，但消费端偶发消息堆积导致内存暴涨。请说明如何在 Node.js 工程中落地限流（Rate Limit）与背压（Backpressure）机制。

**参考答案**：

在 Node.js BFF 中对接 RocketMQ 时，限流与背压需要从 SDK 配置、消费模型、业务缓冲三个层面设计：

1. **SDK 消费参数调优**：
   - 控制并发消费线程数（consumeThreadCount / consumeMessageBatchMaxSize），避免一次性拉取过多消息。
   - 设置 pull 间隔和批量大小，让消费速率与下游处理能力匹配。

2. **消费端限流**：
   - 使用令牌桶或漏桶算法对消息处理速率做限制，例如每秒处理 N 条订单消息。
   - 可借助 `bottleneckjs`、`rate-limiter-flexible` 等库实现进程内限流；多进程场景下需在 Redis 中共享令牌桶状态。

3. **背压与流控**：
   - 将 MQ 消费抽象为 Readable Stream，业务处理为 Transform/Writable，利用 `pipeline` 自动处理背压。
   - 当下游聚合接口或数据库压力过大时，降低 consume 速率或暂停消费，避免内存无界增长。

4. **监控与告警**：
   - 采集消费延迟（consumer lag）、消息堆积量、内存水位、处理耗时。
   - 当 lag 超过阈值时触发扩容或告警；当错误率升高时进入降级模式。

5. **工程落地 checklist**：
   - 幂等性：消息可能重复消费，业务需保证幂等（如数据库唯一键或 Redis setnx）。
   - 死信队列：处理失败的消息进入 DLQ，避免阻塞主队列。
   - 优雅关闭：进程退出前停止消费并处理完当前批次消息。

**评分维度**：
- 能说明 RocketMQ SDK 的并发与批量参数控制（20%）
- 能给出令牌桶/漏桶限流的具体实现思路（25%）
- 能用 Stream/pipeline 解释背压机制（20%）
- 能提到 consumer lag、死信队列、幂等性（20%）
- 能给出监控告警方案（15%）

**常见错误**：
- 只拉取消息不控制并发，导致事件循环被大量异步任务占满。
- 限流只在单进程生效，多实例部署后总流量仍可能压垮下游。
- 消费失败直接抛错，未进入死信队列，造成消息反复失败。

**延伸追问**：
- 如果下游数据库短暂不可用，消费端应该暂停消费还是继续失败重试？
- 如何在 Node.js 中实现一个基于 Redis 的分布式令牌桶？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [RocketMQ Node.js Client](https://github.com/apache/rocketmq-client-nodejs)
- [rate-limiter-flexible 文档](https://github.com/animir/node-rate-limiter-flexible)
- [Node.js Stream Backpressure](https://nodejs.org/docs/latest/api/stream.html#backpressure)

**口头回答版**：
> 我会从三层做限流和背压。SDK 层面控制拉取批量和并发线程数；消费层用令牌桶限制每秒处理的消息数，多实例时把令牌桶放 Redis；再用 Stream 和 pipeline 把 MQ 消费抽象成流，下游压力大时自动背压。监控看 consumer lag、堆积量、内存水位。还要保证幂等和死信队列，避免消息反复失败。优雅关闭时先停消费，处理完当前批次再退出。`,

  'FB-19-SE-A-001': `### FB-19-SE-A-001：在 Node.js 中使用 setTimeout/setInterval 处理用户输入时，有哪些安全风险及防御手段？

**题型**：安全题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：19 Node.js / BFF
**标签**：setTimeout、Cloudflare Workers
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
BFF 中某些业务会读取用户传入的延迟时间或周期配置，再通过 `setTimeout`/`setInterval` 执行任务。请分析这种写法可能带来的安全风险，并给出防御方案。

**参考答案**：

使用 `setTimeout`/`setInterval` 处理用户输入时的主要风险：

1. **ReDoS 与事件循环阻塞**：
   - 风险：如果定时器回调里执行了用户传入的正则或复杂计算，且 delay 为 0，攻击者可通过大量请求同时触发，占满事件循环。
   - 防御：定时器回调只做轻量调度，重计算放入 worker_threads 或消息队列；对用户传入的 delay 做上下限校验。

2. **定时器洪泛（Timer Flooding）**：
   - 风险：用户可构造极小 delay 或大量周期性任务，创建成千上万个定时器，耗尽内存和句柄。
   - 防御：限制全局定时器总数；对用户配置周期设置最小值（如 >= 1s）；使用单一集中调度器替代每个用户一个 timer。

3. **代码注入**：
   - 风险：如果业务把用户输入的字符串直接拼接到 `setTimeout` 的参数中执行（如 `setTimeout(userInput, 100)` 其中 userInput 是字符串函数）。
   - 防御：永远只传递函数引用；禁止将用户输入作为代码执行；使用 `vm2` 等沙箱时也要注意其逃逸风险。

4. **敏感操作延迟执行被预测**：
   - 风险：使用固定 delay 执行 token 过期清理等操作，可能被攻击者利用时序窗口。
   - 防御：结合随机抖动（jitter）；敏感操作不依赖定时器精度。

5. **未清理定时器导致内存泄漏**：
   - 风险：每个请求创建一个 `setInterval` 但未在请求结束/连接断开时清理，导致引用残留。
   - 防御：使用 `AbortController` 或在请求生命周期结束时 `clearTimeout`/`clearInterval`。

**评分维度**：
- 能识别定时器洪泛、代码注入、事件循环阻塞三类核心风险（45%）
- 能给出 delay 校验、定时器上限、集中调度等防御措施（30%）
- 能提到内存泄漏清理与敏感操作时序（15%）
- 能结合 BFF 请求生命周期说明（10%）

**常见错误**：
- 直接将用户输入字符串传给 `setTimeout` 执行。
- 对每个用户请求创建独立 `setInterval`，不清理。
- 认为 setTimeout 只是简单延时，忽略事件循环和内存影响。

**延伸追问**：
- 如果用户传入负数或极大数作为 delay，Node.js 会怎么处理？
- 在 Express/Koa 中，请求结束时如何确保所有相关定时器被清理？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js Timers 文档](https://nodejs.org/api/timers.html)
- [OWASP - ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
- [Node.js 事件循环安全](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

**口头回答版**：
> 用 setTimeout 处理用户输入主要有几个风险：一是定时器回调里做复杂计算会阻塞事件循环；二是用户传极小 delay 或大量周期任务会创建很多定时器，耗光资源；三是把用户输入字符串直接传给 setTimeout 会代码注入；四是没清理定时器导致内存泄漏。防御要对 delay 做上下限、限制全局定时器数、用集中调度器、永远传函数引用不执行字符串，请求结束要 clearTimeout。`,

  'FB-19-SD-A-001': `### FB-19-SD-A-001：如何设计一个基于 TypeScript ORM 与 gRPC 的 BFF 数据访问层？

**题型**：系统设计题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：19 Node.js / BFF
**标签**：ORM、RPC
**出现频率**：中频
**预计回答时长**：5-7 分钟

**题目描述**：
公司计划让 BFF 统一通过 gRPC 访问底层微服务，同时内部数据映射使用 TypeScript ORM（如 Prisma/TypeORM）。请设计 BFF 的数据访问层（DAL），要求兼顾类型安全、可测试性和可维护性。

**参考答案**：

基于 TypeScript ORM 与 gRPC 的 BFF 数据访问层可按以下结构分层：

1. **协议接入层（gRPC Client）**：
   - 使用 `@grpc/grpc-js` 和 `@grpc/proto-loader` 加载 .proto 文件，生成客户端 stub。
   - 对底层服务按领域拆分 client（UserClient、OrderClient、InventoryClient），避免一个 client 过大。
   - 配置连接池、keep-alive、deadline 与重试策略。

2. **防腐层（Anti-Corruption Layer）**：
   - 将 gRPC 返回的 PB 对象转换为 BFF 内部 DTO，避免把下游字段结构直接暴露给上层业务。
   - 定义清晰的领域模型，例如 `UserDTO`、`OrderDTO`，与 gRPC message 解耦。

3. **仓储层（Repository）**：
   - 每个领域一个 Repository 类，封装对 gRPC client 的调用逻辑。
   - 在 Repository 内部处理缓存（Redis）、熔断、降级和日志，不污染 Service。
   - 接口面向抽象，便于单元测试时用 mock repository 替换。

4. **ORM 在 BFF 中的定位**：
   - BFF 通常不直接连接主数据库，ORM 可用于本地配置库、审计日志表或聚合结果的持久化。
   - 如果 BFF 需要写本地库，使用 Prisma/TypeORM 管理 schema 迁移和类型安全查询。

5. **依赖注入与测试**：
   - 在 NestJS 中通过 Module + Provider 注入 Repository；Express/Koa 中可手动实现 DI 容器。
   - 测试时用 jest.mock 替换 gRPC client，验证 Repository 的调用次数和参数。

**评分维度**：
- 能画出 gRPC Client → ACL → Repository → Service 的分层（30%）
- 能说明防腐层和 DTO 转换的必要性（25%）
- 能提到连接池、deadline、重试等 gRPC 配置（20%）
- 能说明 ORM 在 BFF 中的适用边界（15%）
- 能提到依赖注入与可测试性（10%）

**常见错误**：
- 把 gRPC message 直接透传给前端，导致前端依赖下游协议。
- 在 Service 层直接调用 gRPC client，缺少 Repository 抽象。
- BFF 直接通过 ORM 写主库，破坏微服务数据 ownership。

**延伸追问**：
- 如果下游 gRPC 服务字段频繁变更，如何降低对 BFF 的影响？
- gRPC 的 deadline 和重试在 BFF 中应该如何配置？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [gRPC Node.js 官方文档](https://grpc.io/docs/languages/node/)
- [Prisma 在 Node.js 中的使用](https://www.prisma.io/docs/getting-started/quickstart)
- [NestJS Repository 模式](https://docs.nestjs.com/techniques/database#repository-pattern)

**口头回答版**：
> 我会把数据访问层分成四层：最底层是 gRPC client，按领域拆成 UserClient、OrderClient 这些；上面是防腐层，把 PB 对象转成 BFF 内部的 DTO；再上面是 Repository，封装缓存、熔断、降级；最上层 Service 只依赖 Repository 接口。ORM 在 BFF 里不直接操作主库，只用于本地配置或审计。NestJS 里用依赖注入，测试时 mock Repository 就行。`,

  'FB-19-CP-A-001': `### FB-19-CP-A-001：在 Node.js BFF 中，如何结合 RESTful API 与 Duplex Stream 实现文件实时处理？

**题型**：综合开放题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：19 Node.js / BFF
**标签**：RESTful、Duplex
**出现频率**：高频
**预计回答时长**：5-7 分钟

**题目描述**：
某 BFF 需要提供一个 RESTful 接口，允许客户端上传大文件流，并在上传过程中实时进行病毒扫描和格式转换，最后把处理后的流返回给客户端。请结合 RESTful 与 Duplex Stream 谈谈你的设计思路与实践经验。

**参考答案**：

在 Node.js BFF 中实现“上传即处理、处理即返回”，可以借助 Duplex/Transform Stream 把多个步骤管道化：

1. **接口设计**：
   - 使用 `POST /api/files/process` 接收 multipart/form-data 或 raw binary stream。
   - 响应头设置为 `Transfer-Encoding: chunked`，让客户端可以逐块接收结果。

2. **Stream 管道组合**：
   - 上游请求体 `req` 是 Readable Stream。
   - 病毒扫描可封装为 Transform Stream，边读边扫描；发现风险时立即 destroy 管道并返回 400。
   - 格式转换（如图片压缩、CSV 转 JSON）也封装为 Transform Stream。
   - 使用 `pipeline(req, scanner, transformer, res, callback)` 自动处理背压和错误传播。

3. **Duplex Stream 的运用**：
   - 如果扫描/转换需要与外部服务双向交互（如 gRPC 双向流），可自定义 Duplex Stream，把上游数据写入外部流，同时把外部流输出返回给客户端。
   - 注意 Duplex 的 `_read` 与 `_write` 需协调，避免内存堆积。

4. **RESTful 边界与限制**：
   - RESTful 请求-响应模型天然是一对一、单向的；如果需要双向实时反馈，考虑改用 WebSocket 或 Server-Sent Events。
   - 在本场景中，可通过 chunked 响应模拟“流式进度”，每个 chunk 包含状态标记（如 `{"stage":"scanning"}`）。

5. **错误处理与超时**：
   - 任何一步出错时，`pipeline` 会自动 destroy 所有流，需在 callback 中记录日志并返回统一错误。
   - 对大文件设置整体超时和单 chunk 大小限制，防止慢连接攻击。

**评分维度**：
- 能说明 RESTful 上传接口与 chunked 响应设计（20%）
- 能用 Transform Stream 解释扫描和转换的管道化（30%）
- 能说明 Duplex Stream 在双向外部交互中的作用（20%）
- 能提到 pipeline、背压、错误处理（20%）
- 能权衡 RESTful 与 WebSocket/SSE 的适用场景（10%）

**常见错误**：
- 一次性把大文件读到内存再处理，导致 OOM。
- 自己用 `pipe` 而不用 `pipeline`，导致错误处理不完整。
- 在 Transform Stream 中做同步重计算，阻塞事件循环。

**延伸追问**：
- 如果病毒扫描服务是异步 HTTP API，而不是流式服务，如何设计才不阻塞上传？
- 如何在流式处理中实现断点续传或部分重试？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js Stream 文档](https://nodejs.org/api/stream.html)
- [Node.js pipeline 文档](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options)
- [MDN - Transfer-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding)

**口头回答版**：
> 这个场景我会用 Stream 管道。客户端 POST 上传文件，BFF 把请求体当成 Readable，然后接一个 Transform 做病毒扫描，再接一个 Transform 做格式转换，最后用 pipeline 连到响应 res。响应用 chunked，客户端边传边收。如果扫描发现风险就 destroy 管道返回 400。Duplex 适合和外部双向流服务交互。自己写的话要注意背压，别用 pipe 用 pipeline，错误会自动传播。如果是要双向实时反馈，RESTful 不太合适，得用 WebSocket 或 SSE。`,

  'FB-19-CA-A-044': `### FB-19-CA-A-044：下面一段 Node.js 限流代码存在削峰逻辑缺陷，输出是什么？请分析原因。

**题型**：代码分析题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：19 Node.js / BFF
**标签**：削峰、Buffer
**出现频率**：高频
**预计回答时长**：5-7 分钟

**题目描述**：
某 BFF 用以下简单计数器实现每秒限流 5 个请求。请分析该代码在并发场景下的问题，并说明输出特征。

\`\`\`js
class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.count = 0;
    this.reset();
  }

  reset() {
    setInterval(() => {
      this.count = 0;
    }, this.windowMs);
  }

  allow() {
    if (this.count < this.limit) {
      this.count++;
      return true;
    }
    return false;
  }
}

const limiter = new RateLimiter(5, 1000);

// 模拟 10 个并发请求
for (let i = 0; i < 10; i++) {
  console.log(limiter.allow());
}
\`\`\`

**参考答案**：

输出特征：
- 前 5 次打印 `true`，后 5 次打印 `false`。
- 但在窗口切换的瞬间（如第 1000ms），`count` 被立即重置为 0，紧接着的 10 个并发请求又会有 5 个通过，形成“突刺”。
- 因此该限流器无法做到平滑削峰，只能控制单个窗口内的总量，无法控制窗口边界的流量突发。

原因分析：
1. 使用固定时间窗口（Fixed Window），窗口边界处允许请求数翻倍（上一窗口末尾 5 个 + 下一窗口开头 5 个）。
2. `setInterval` 不会精确对齐到整秒，且多个请求同时读取 `this.count` 存在竞态（虽然单线程事件循环下 `allow()` 是原子的，但在微服务多实例下计数器不共享）。
3. 没有使用滑动窗口或令牌桶/漏桶算法，无法平滑请求速率。

修复思路：
- 改用滑动窗口日志或滑动窗口计数（Redis + sorted set）。
- 使用令牌桶算法，按固定速率补充令牌，支持一定突发但平滑上限。
- 多实例 BFF 必须使用 Redis 等共享存储维护计数器。

**评分维度**：
- 能正确给出前 5 true 后 5 false 的输出（25%）
- 能指出固定窗口边界突刺问题（30%）
- 能说明单进程计数器无法应对多实例（20%）
- 能给出滑动窗口或令牌桶的修复方案（15%）
- 能提到 setInterval 精度问题（10%）

**常见错误**：
- 只回答 true/false 输出，未分析窗口边界突刺。
- 认为该限流器已经能平滑削峰。
- 忽略多实例部署时计数器不共享的问题。

**延伸追问**：
- 如何用 Redis + Lua 脚本实现原子化的滑动窗口限流？
- 令牌桶和漏桶在削峰效果上有什么本质区别？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [rate-limiter-flexible 文档](https://github.com/animir/node-rate-limiter-flexible)
- [Cloudflare - Rate Limiting Algorithms](https://blog.cloudflare.com/counting-things-a-lot-of-different-things/)
- [Redis 限流模式](https://redis.io/docs/manual/patterns/)

**口头回答版**：
> 这段代码会打印前 5 个 true、后 5 个 false。但问题是它用固定窗口，在窗口切换的瞬间 count 重置为 0，紧接着又能放行 5 个，形成突刺。而且多实例部署时这个计数器只在进程内存里，无法共享。修复可以用滑动窗口或者令牌桶，多实例下把状态放 Redis。setInterval 本身精度也不高。`,

  'FB-19-EN-P-001': `### FB-19-EN-P-001：在一个需要削峰限流的 Node.js BFF 项目中，如何落地 TypeScript 工程化？

**题型**：工程化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：19 Node.js / BFF
**标签**：削峰、TypeScript
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
某电商大促 BFF 需要实现削峰限流，同时团队希望全链路使用 TypeScript。请说明如何从工程化角度落地 TypeScript，并保证限流、队列、降级等模块的类型安全与可维护性。

**参考答案**：

在削峰限流场景中落地 TypeScript，关键在于把“流量控制策略”抽象为类型安全的领域模型：

1. **类型定义层**：
   - 定义统一的限流策略接口：`interface RateLimitStrategy { key: string; limit: number; windowMs: number; algorithm: 'fixed' | 'sliding' | 'token-bucket'; }`。
   - 定义队列任务类型：`interface ThrottledTask<T> { id: string; payload: T; priority: number; enqueueAt: number; }`。
   - 对降级状态、熔断状态使用联合类型或枚举，避免魔术字符串。

2. **模块组织**：
   - `src/rate-limit/`：算法实现（token-bucket、sliding-window）。
   - `src/throttle/`：削峰队列、延迟处理、优先级调度。
   - `src/circuit-breaker/`：熔断器状态机。
   - `src/middleware/`：Express/NestJS 中间件，将策略注入请求生命周期。

3. **运行时与编译分离**：
   - 开发用 `tsx` 快速启动，CI 中跑 `tsc --noEmit` 做全量类型检查。
   - 生产构建使用 `tsc` 或 `esbuild` 预编译，避免线上转译。

4. **测试与契约**：
   - 为限流算法写单元测试，验证边界（刚好 limit、limit+1、窗口切换）。
   - 使用 `zod` 或 `class-validator` 校验运行时配置，防止错误策略上线。
   - 对 Redis 限流封装 Repository 接口，测试时用内存实现替换。

5. **可观测性**：
   - 类型化日志结构：`interface RateLimitEvent { strategy: string; key: string; allowed: boolean; remaining: number; }`。
   - 通过 prom-client 暴露类型安全的指标采集函数。

**评分维度**：
- 能把限流策略抽象为 TypeScript 接口/类型（25%）
- 能给出清晰的模块目录设计（20%）
- 能说明开发、构建、测试的工程化流程（20%）
- 能提到运行时配置校验与可观测性（20%）
- 能结合削峰队列、熔断等场景说明（15%）

**常见错误**：
- 类型只在业务层使用，限流配置仍用 any 或 object。
- 限流算法缺少单元测试，上线后才发现边界 bug。
- 生产环境用 ts-node 直接跑，导致启动慢。

**延伸追问**：
- 如何用 TypeScript 的泛型设计一个通用的削峰队列？
- 如果限流策略需要动态热更新，如何在类型安全的前提下加载新配置？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [TypeScript Handbook - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [zod 文档](https://zod.dev/)
- [NestJS 配置验证](https://docs.nestjs.com/techniques/configuration#schema-validation)

**口头回答版**：
> 我会先把限流策略抽象成类型安全的接口，比如 strategy 里包含算法、limit、windowMs。然后按模块组织：rate-limit、throttle、circuit-breaker、middleware。开发用 tsx，CI 跑 tsc --noEmit，生产预编译。限流算法要写单元测试，边界 case 比如 limit+1 一定要测。配置校验用 zod，日志和指标也用类型化的结构，方便排查。`,

  'FB-19-SE-P-050': `### FB-19-SE-P-050：在 Node.js 使用 EventEmitter 或 Redis Pub/Sub 时，有哪些常见安全风险及防御手段？

**题型**：安全题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：19 Node.js / BFF
**标签**：发布订阅、profiling
**出现频率**：低频
**预计回答时长**：7-10 分钟

**题目描述**：
BFF 中大量使用 EventEmitter 进行进程内事件通信，也使用 Redis Pub/Sub 进行跨进程广播。请分析发布订阅机制中常见的安全风险及防御手段。

**参考答案**：

发布订阅在 Node.js BFF 中的安全风险主要分进程内和跨进程两类：

1. **EventEmitter 安全风险**：
   - **未校验的事件名**：攻击者通过用户输入构造特殊事件名触发内部逻辑。
     - 防御：事件名使用常量或 Symbol，禁止基于用户输入动态 emit。
   - **未设置最大监听器**：大量监听器导致内存泄漏（MaxListenersExceededWarning）。
     - 防御：合理设置 `setMaxListeners(n)`，定期审计监听器数量。
   - **error 事件未处理**：Node.js EventEmitter 在 error 事件无监听器时会抛异常导致进程退出。
     - 防御：所有 EventEmitter 实例统一监听 `error` 并记录。

2. **Redis Pub/Sub 安全风险**：
   - **频道/主题注入**：用户可控的 channel 名可能导致订阅到非预期频道或发布到敏感频道。
     - 防御：channel 名采用白名单或固定前缀，如 `bff:order:events`，用户输入仅作为 key 的一部分。
   - **消息内容未校验**：订阅者直接信任消息内容执行操作，可能被伪造消息利用。
     - 防御：对消息做签名（HMAC）或来源校验；用 JSON Schema 校验结构。
   - **无权限隔离**：所有服务共用同一个 Redis 实例，一个被攻破的服务可监听所有频道。
     - 防御：按业务划分 Redis ACL 或账号；敏感频道使用 ACL 规则限制发布/订阅。

3. **通用防御**：
   - 对发布频率做限流，防止消息洪泛。
   - 对消息大小做限制，避免大消息拖垮网络与内存。
   - 日志中不记录完整消息体，尤其是含敏感信息的 payload。

**评分维度**：
- 能识别 EventEmitter 的未校验事件名、内存泄漏、error 三类风险（30%）
- 能识别 Redis Pub/Sub 的频道注入、消息伪造、权限隔离三类风险（30%）
- 能给出具体的防御代码或配置（25%）
- 能提到消息大小限制与限流（15%）

**常见错误**：
- 用用户输入字符串直接作为 EventEmitter 事件名或 Redis channel。
- 忽略 `error` 事件导致进程崩溃。
- 认为 Redis Pub/Sub 在内网就无需鉴权和消息校验。

**延伸追问**：
- 如果 Redis 消息需要保证至少一次消费，应该改用哪种模式而不是 Pub/Sub？
- 在 NestJS 中，如何通过 EventEmitter 模块实现类型安全的事件发布订阅？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js Events 文档](https://nodejs.org/api/events.html)
- [Redis Pub/Sub 安全指南](https://redis.io/docs/manual/security/)
- [NestJS Event Emitter](https://docs.nestjs.com/techniques/events)

**口头回答版**：
> EventEmitter 这边要注意：不要用用户输入当事件名，用常量或 Symbol；设置 setMaxListeners 防止内存泄漏；一定要监听 error 事件，不然进程会崩。Redis Pub/Sub 这边，channel 名要做白名单和固定前缀，消息内容要签名或校验，别直接信任；还要按业务划分 Redis ACL，防止一个服务被攻破后监听所有频道。另外对发布频率和消息大小做限制，日志里别记敏感 payload。`,

  'FB-19-SD-P-001': `### FB-19-SD-P-001：如何设计一个支持 Server-Sent Events 流式推送的 BFF API 系统？

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：19 Node.js / BFF
**标签**：流、API 设计
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
公司希望 BFF 为前端提供实时推送能力，例如订单状态变更、股票行情、日志流等。请设计一套基于 Server-Sent Events（SSE）的 BFF API 系统，并说明关键技术选型与扩展策略。

**参考答案**：

设计 SSE 推送型 BFF 需要解决连接管理、消息分发、水平扩展三个核心问题：

1. **协议选型：SSE vs WebSocket**：
   - SSE 基于 HTTP，天然支持自动重连、事件 ID、Last-Event-ID，适合服务端单向推送。
   - WebSocket 适合双向高频交互；SSE 更适合日志流、通知、行情等单向场景。

2. **API 设计**：
   - 路由：`GET /api/events/stream?channel=orders&token=<jwt>`。
   - 响应头：`Content-Type: text/event-stream; charset=utf-8`、`Cache-Control: no-cache`、`Connection: keep-alive`。
   - 消息格式：`data: {...}\nevent: order.updated\nid: 123\n\n`。

3. **连接管理**：
   - 每个客户端建立一个长连接，Node.js 需要维护连接池。
   - 使用 `res.write` 持续推送，客户端断开时监听 `req.on('close')` 清理资源。
   - 设置心跳（comment `:heartbeat\n\n`）以穿越 NAT/代理超时。

4. **消息分发与扩展**：
   - 单实例：用 EventEmitter 或 Map<channel, Set<Response>> 维护订阅关系。
   - 多实例：通过 Redis Pub/Sub 广播消息，各 BFF 实例再推送给本地连接。
   - 对于超大规模，可在 BFF 前加专用推送网关（如 Socket.IO server / Pushpin / SSE Gateway）。

5. **可靠性与限流**：
   - 客户端重连时通过 `Last-Event-ID` 恢复漏掉的消息。
   - 对单个用户/连接设置推送频率上限，防止慢连接拖垮服务。
   - 记录连接数、消息延迟、丢包率等指标。

**评分维度**：
- 能比较 SSE 与 WebSocket 的适用场景（15%）
- 能给出 SSE 的 API 与消息格式设计（20%）
- 能说明连接管理与心跳机制（20%）
- 能设计单机/多机的消息分发方案（25%）
- 能提到重连恢复、限流、监控（20%）

**常见错误**：
- 在 SSE 连接中做大量计算，阻塞其他客户端推送。
- 不清理已关闭的连接，导致内存泄漏。
- 多实例部署时不使用共享消息总线，导致客户端连到不同实例收不到消息。

**延伸追问**：
- 如果前端需要同时订阅多个 channel，是每个 channel 一个 SSE 连接还是复用同一个？
- 如何保证消息至少推送一次而不重复？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [MDN - Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [Node.js HTTP 长连接](https://nodejs.org/api/http.html#event-close)
- [Redis Pub/Sub 扩展 SSE](https://redis.io/docs/manual/pubsub/)

**口头回答版**：
> 我会用 SSE 做服务端单向推送，比 WebSocket 轻量，还能自动重连。API 用 GET /api/events/stream，返回 text/event-stream，带 event、id、data 字段。连接管理上监听 req close 清理资源，定期发心跳防止代理断开。单机用 Map 维护 channel 到响应的映射，多机用 Redis Pub/Sub 广播。客户端重连用 Last-Event-ID 恢复漏掉的消息。还要限流和监控连接数。`,

  'FB-19-CP-P-001': `### FB-19-CP-P-001：结合 CommonJS 模块加载与 Node.js cluster 模式，谈谈你的理解与实践经验。

**题型**：综合开放题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：19 Node.js / BFF
**标签**：CommonJS、集群
**出现频率**：低频
**预计回答时长**：7-10 分钟

**题目描述**：
在生产环境的 Node.js BFF 中，CommonJS 仍是大量遗留模块的模块格式，同时为了利用多核 CPU 会启用 cluster 模式。请结合 CommonJS 模块加载机制与 cluster 模式，谈谈你的理解与实践经验。

**参考答案**：

CommonJS 模块加载与 cluster 模式的结合点是“每个 worker 独立维护模块缓存，共享同一套代码但拥有独立状态”：

1. **CommonJS 模块加载特点**：
   - `require` 是运行时同步加载，模块在首次 require 时执行，结果被缓存到 `require.cache`。
   - 同一个进程内多次 require 同一模块返回同一对象引用；不同进程间不共享缓存。
   - 循环依赖时返回已执行部分的拷贝，可能导致“部分初始化”问题。

2. **cluster 模式下每个 worker 独立加载**：
   - 主进程 fork 多个 worker，每个 worker 都会重新执行 `require` 并构建自己的模块缓存。
   - 这意味着单例模式在 cluster 下会存在多个实例（每个 worker 一个），例如内存缓存、数据库连接池。

3. **实践经验**：
   - 对需要进程间共享的状态（会话、缓存计数器、限流令牌桶），必须使用 Redis 等外部存储，而不是进程内变量。
   - 对数据库连接池，每个 worker 维护独立池是合理的，但要控制 pool size × worker count 不超过数据库最大连接数。
   - 启动时通过 `cluster.isPrimary` / `cluster.isWorker` 区分主从逻辑，主进程不处理 HTTP 请求。

4. **CommonJS 与 ESM 混用**：
   - cluster 模块本身是 CommonJS；在 ESM 项目中需通过 `createRequire` 引入。
   - 新项目建议统一 ESM，遗留 CJS 模块通过动态 `import()` 或 `createRequire` 兼容。

5. **调试与监控**：
   - 注意 worker 崩溃后主进程会重新 fork，但模块缓存会重新构建，可能引发短暂连接风暴。
   - 使用 PM2 或自定义 health check 监控每个 worker 的内存、CPU、重启次数。

**评分维度**：
- 能解释 CommonJS 模块缓存和 require 机制（25%）
- 能说明 cluster 下每个 worker 独立维护模块状态（25%）
- 能给出共享状态外置、连接池控制等实践经验（25%）
- 能提到 CJS/ESM 混用与主从逻辑分离（15%）
- 能结合监控与稳定性说明（10%）

**常见错误**：
- 认为 cluster worker 之间共享内存和模块缓存。
- 在 worker 内使用进程内缓存作为全局状态，导致数据不一致。
- 数据库连接池大小未乘以 worker 数评估，导致连接数打满。

**延伸追问**：
- 如果某个模块初始化很耗时，cluster 模式下如何减少每个 worker 的重复初始化开销？
- 在 ESM 项目中如何使用 cluster 模块？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js CommonJS 模块文档](https://nodejs.org/api/modules.html)
- [Node.js cluster 文档](https://nodejs.org/api/cluster.html)
- [Node.js createRequire](https://nodejs.org/api/module.html#modulecreaterequirefilename)

**口头回答版**：
> CommonJS 的 require 是运行时同步加载，首次执行后缓存到 require.cache。cluster 模式下每个 worker 都是独立进程，会重新 require 一遍，所以模块缓存不共享。这意味着进程内单例在每个 worker 里都有一个实例，共享状态必须放到 Redis。数据库连接池每个 worker 独立维护，但要算好 pool size 乘以 worker 数别超过 DB 上限。主进程只负责 fork 和保活，不处理请求。新项目建议统一 ESM，遗留 CJS 用 createRequire 兼容。`,

  'FB-19-CA-P-001': `### FB-19-CA-P-001：下面一段 NestJS 网关中间件代码存在请求头注入风险，输出是什么？请分析原因。

**题型**：代码分析题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：19 Node.js / BFF
**标签**：API 网关、Decorator
**出现频率**：低频
**预计回答时长**：7-10 分钟

**题目描述**：
以下 NestJS 中间件将上游请求头透传给下游服务，请分析其中存在的安全风险，并说明攻击者可能如何利用。

\`\`\`ts
@Injectable()
class ProxyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const upstreamHeaders = req.headers;
    const response = await fetch('https://downstream.example.com/api', {
      method: req.method,
      headers: upstreamHeaders,
      body: JSON.stringify(req.body),
    });
    res.status(response.status).send(await response.text());
  }
}
\`\`\`

**参考答案**：

输出特征：
- 代码在正常情况下能将请求转发给下游并返回响应。
- 但存在严重的请求头注入风险，攻击者可构造特殊请求头影响下游行为或窃取信息。

风险分析：
1. **Host / Content-Length 头被覆盖或注入**：
   - `req.headers` 中可能包含 `host: attacker.com`，直接透传会改变下游看到的 Host。
   - Node.js 的 `fetch` 通常会重写部分头，但某些运行时（如旧版 node-fetch）可能不完全保护。

2. **Authorization / Cookie 被滥用**：
   - 攻击者可直接在请求中携带上游用户的 Authorization 头，BFF 不加甄别地转发，可能导致下游误判身份。
   - 若下游存在 open redirect 或 SSRF，配合自定义头可扩大攻击面。

3. **X-Forwarded-For / X-Real-IP 伪造**：
   - 攻击者可直接设置 `X-Forwarded-For: 1.1.1.1`，下游基于该头的限流或审计会失效。

4. **Content-Type / Content-Length 与 body 不匹配**：
   - 代码手动 `JSON.stringify(req.body)`，但把上游的 `content-type` 原样转发，可能导致下游解析异常。

修复思路：
- 建立允许透传的头白名单（如 `accept-language`、`x-request-id`），拒绝 `host`、`content-length`、`authorization` 等敏感头由客户端控制。
- BFF 自己生成 `Authorization`（如用服务账号 Token）调用下游，不直接透传用户凭证。
- 对 `X-Forwarded-*` 头做追加而不是覆盖，并校验 IP 格式。
- 设置明确的 `Content-Type: application/json` 和正确的 `Content-Length`。

**评分维度**：
- 能指出 Host/Content-Length 透传风险（25%）
- 能指出 Authorization/Cookie 滥用风险（25%）
- 能指出 X-Forwarded-For 伪造风险（20%）
- 能给出头白名单、服务账号、追加代理头等修复方案（20%）
- 能提到 Content-Type 与 body 不匹配（10%）

**常见错误**：
- 认为直接透传请求头是安全的，因为下游会做校验。
- 只关注 body 转发，忽略请求头中的身份和路由信息。
- 修复时直接删除所有头，导致 traceId、locale 等必要上下文丢失。

**延伸追问**：
- 在 BFF 中如何安全地向下游传递用户身份？
- 如果下游要求必须透传某些敏感头，应如何加签或校验？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [OWASP - HTTP Request Smuggling](https://owasp.org/www-community/attacks/HTTP_Request_Smuggling)
- [NestJS Middleware 文档](https://docs.nestjs.com/middleware)
- [MDN - HTTP Headers 安全](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

**口头回答版**：
> 这段代码直接把上游请求头透传给下游，风险很大。攻击者可以伪造 Host、X-Forwarded-For，或者把用户的 Authorization 直接带过去让下游误判身份。Content-Type 也可能和手动 JSON.stringify 的 body 不一致。修复要做头白名单，只透传必要头如 accept-language、x-request-id；BFF 自己用服务账号调下游；X-Forwarded 系列做追加而不是覆盖；自己设 Content-Type 为 application/json。`,

  'FB-19-CD-P-053': `### FB-19-CD-P-053：请手写一个 Node.js/Express 的 CORS 中间件函数，并说明预检请求的处理逻辑。

**题型**：手写代码题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：19 Node.js / BFF
**标签**：CORS、Duplex
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
请手写一个 Express CORS 中间件，支持配置允许的来源（origin）、方法（methods）、请求头（allowedHeaders），并能正确处理 OPTIONS 预检请求。要求不依赖第三方库。

**参考答案**：

实现要点：
1. 对简单请求：设置 `Access-Control-Allow-Origin`、`Access-Control-Allow-Credentials`、`Access-Control-Expose-Headers`。
2. 对预检请求（OPTIONS）：额外设置 `Access-Control-Allow-Methods`、
Access-Control-Allow-Headers
、
Access-Control-Max-Age
，并直接返回 204。
3. 对不允许的 origin，不返回 CORS 头，浏览器会拦截。
4. 支持 origin 为字符串、数组或函数，实现动态校验。

\`\`\`js
function cors(options = {}) {
  const {
    origin = '*',
    methods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders = [],
    exposedHeaders = [],
    credentials = false,
    maxAge = 86400,
  } = options;

  const normalizeOrigin = (req) => {
    const reqOrigin = req.headers.origin;
    if (typeof origin === 'function') return origin(reqOrigin, req) ? reqOrigin : false;
    if (Array.isArray(origin)) return origin.includes(reqOrigin) ? reqOrigin : false;
    if (origin === '*') return '*';
    return origin === reqOrigin ? reqOrigin : false;
  };

  return function corsMiddleware(req, res, next) {
    const allowOrigin = normalizeOrigin(req);

    if (!allowOrigin) {
      // 不设置任何 CORS 头，浏览器会拦截跨域请求
      if (req.method === 'OPTIONS') return res.sendStatus(204);
      return next();
    }

    res.setHeader('Access-Control-Allow-Origin', allowOrigin);

    if (credentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    if (exposedHeaders.length) {
      res.setHeader('Access-Control-Expose-Headers', exposedHeaders.join(','));
    }

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', methods.join(','));
      if (allowedHeaders.length) {
        res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(','));
      } else if (req.headers['access-control-request-headers']) {
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      }
      res.setHeader('Access-Control-Max-Age', String(maxAge));
      return res.sendStatus(204);
    }

    next();
  };
}

// 使用示例
app.use(cors({
  origin: ['https://app.example.com', 'https://admin.example.com'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
\`\`\`

关键点：
- 当 `credentials: true` 时，origin 不能为 `*`，必须返回具体来源。
- 预检请求必须返回 204，不能再进入后续路由处理。
- 对动态 origin 应做白名单校验，避免反射 Origin 头造成安全风险。

**评分维度**：
- 正确实现 CORS 头设置（40%）
- 正确处理 OPTIONS 预检请求（25%）
- 支持 origin 字符串/数组/函数配置（15%）
- 正确处理 credentials 与 origin 为 * 的冲突（10%）
- 代码风格与边界处理（10%）

**常见错误**：
- credentials 为 true 时仍设置 `Access-Control-Allow-Origin: *`。
- 预检请求未拦截，继续进入后续业务逻辑。
- 直接反射 `req.headers.origin` 作为允许来源，造成安全隐患。

**延伸追问**：
- 如果前端请求带自定义头如 `X-Trace-ID`，为什么一定会触发预检？
- 如何在微服务网关层统一处理 CORS，而不是每个 BFF 都写一遍？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [MDN - CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [Express CORS 中间件源码](https://github.com/expressjs/cors)
- [Fetch Living Standard - CORS protocol](https://fetch.spec.whatwg.org/#cors-protocol)

**口头回答版**：
> 手写 CORS 中间件主要分两步：普通请求设置 Access-Control-Allow-Origin，预检 OPTIONS 请求还要多设 Allow-Methods、Allow-Headers、Max-Age，然后直接返回 204。origin 支持字符串、数组或函数，要做白名单校验。注意 credentials 为 true 时 origin 不能是 *，必须返回具体来源。代码里对不合法的 origin 不设置头，让浏览器自己拦截。`,

  'FB-19-FS-P-049': `### FB-19-FS-P-049：请解释 Helmet.js 在 Node.js BFF 中的核心实现原理与常见配置。

**题型**：框架原理题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：19 Node.js / BFF
**标签**：安全、Module
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
Helmet.js 是 Node.js 生态中常用的安全中间件。请解释它在 BFF 项目中的核心实现原理，以及你会如何配置常见的安全响应头。

**参考答案**：

Helmet.js 本质上是一个 Express/Connect 中间件集合，通过设置一系列 HTTP 响应头来缓解常见 Web 攻击：

1. **核心实现原理**：
   - Helmet 由多个子中间件组成，每个子中间件负责设置一类安全头。
   - 主中间件 `helmet()` 默认按推荐配置组合这些子中间件。
   - 每个子中间件读取用户配置，修改 `res.setHeader`，然后调用 `next()`。

2. **常见子中间件与响应头**：
   - **Content-Security-Policy**：限制页面可加载的资源来源，缓解 XSS 和数据注入。
   - **X-Content-Type-Options: nosniff**：防止浏览器 MIME 嗅探。
   - **X-Frame-Options / frame-ancestors**：控制页面是否允许被 iframe 嵌入，缓解点击劫持。
   - **Strict-Transport-Security (HSTS)**：强制浏览器使用 HTTPS。
   - **X-DNS-Prefetch-Control**：控制 DNS 预取行为。
   - **Referrer-Policy**：控制 Referer 头携带策略。
   - **Permissions-Policy**：限制浏览器功能（如摄像头、地理位置）。

3. **BFF 场景下的配置建议**：
   ```js
   app.use(helmet({
     contentSecurityPolicy: false, // BFF 通常返回 JSON，可不启用 CSP
     crossOriginEmbedderPolicy: false,
     hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
     referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
   }));
   ```

4. **注意事项**：
   - BFF 主要返回 API 响应，CSP 对 API 意义不大，通常关闭以避免影响前端。
   - 如果 BFF 也托管静态页面或 SSR，则需要精细配置 CSP。
   - Helmet 是“安全头”层面的防护，不能替代输入校验、鉴权、防 SQL 注入等应用层安全。

**评分维度**：
- 能说明 Helmet 是多个安全头中间件的组合（20%）
- 能解释 4 个以上核心安全头的作用（35%）
- 能给出 BFF 场景下的合理配置（25%）
- 能指出 Helmet 的防护边界（10%）
- 能区分 API BFF 与 SSR/静态站点的配置差异（10%）

**常见错误**：
- 认为 Helmet 可以防止所有 Web 攻击。
- 在纯 API BFF 中强行启用复杂 CSP，导致前端调用异常。
- 不区分 X-Frame-Options 与 CSP frame-ancestors 的优先级。

**延伸追问**：
- 如果前端是 React SPA，BFF 是否需要配置 CSP？应该配在哪里？
- Helmet 的 crossOriginResourcePolicy 对 BFF 返回的图片/字体资源有什么影响？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Helmet.js 官方文档](https://helmetjs.github.io/)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN - HTTP 安全头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)

**口头回答版**：
> Helmet 其实是好几个安全头中间件的组合，每个负责设一类头。核心是 CSP、X-Content-Type-Options、X-Frame-Options、HSTS、Referrer-Policy 这些。在 BFF 里主要返回 JSON，所以 CSP 一般关掉，HSTS 和 referrer-policy 可以开。它是响应头层面的防护，不能替代输入校验和鉴权。如果 BFF 还做 SSR 或托管静态页，就要精细配 CSP。`,

  'FB-19-SS-P-001': `### FB-19-SS-P-001：请分享一次你在 Node.js BFF 中落地熔断降级机制的经历。

**题型**：软技能题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：19 Node.js / BFF
**标签**：熔断、TypeScript
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
请结合一个真实或你熟悉的 Node.js BFF 项目，讲述你如何引入熔断（Circuit Breaker）与降级（Fallback）机制来保障下游故障时的服务可用性。

**参考答案**：

回答应围绕具体项目，建议包含以下结构：

1. **背景与目标**：
   - 项目背景：例如电商订单 BFF，下游依赖库存服务、价格服务、物流服务。
   - 问题：大促期间库存服务偶发超时，导致 BFF 线程（事件循环）被拖慢，级联影响订单提交接口。
   - 目标：在下游故障时快速失败并返回降级数据，避免请求堆积和雪崩。

2. **方案选型与落地**：
   - 选型：对比 `opossum`、`cockatiel`、`hystrixjs`，最终选择 `cockatiel`（类型友好、策略丰富）或自研轻量熔断器。
   - 集成：在 Repository/HTTP Client 层统一封装 `executeWithBreaker()`。
   - 策略：
     - 失败率超过 50% 且近 10 秒内请求数 >= 10 时打开断路器。
     - 打开后 30 秒内直接走降级逻辑，30 秒后进入半开状态放行少量探测请求。
     - 降级逻辑：库存显示“库存紧张，建议尽快下单”，价格显示缓存价或“以结算页为准”。

3. **结果与反思**：
   - 量化：下游库存服务故障时，订单提交接口错误率从 35% 降到 2%，P99 从 5s 降到 300ms。
   - 踩坑：初期降级数据不准确导致用户投诉，后加入缓存价 + 兜底文案。
   - 团队协同：与下游团队约定错误码和 SLA，熔断触发时自动通知。

4. **可复制性**：
   - 沉淀为团队熔断 SDK，支持配置化策略和自定义降级函数。
   - 制定 SOP：熔断不是隐藏问题，必须配套告警和事后复盘。

**评分维度**：
- 背景与目标清晰（20%）
- 方案选型与熔断策略具体（30%）
- 降级逻辑合理（20%）
- 能量化结果并反思踩坑（20%）
- 能提炼方法论（10%）

**常见错误**：
- 只说“加了熔断后好了”，没有具体阈值和效果数据。
- 熔断后没有降级逻辑，直接抛错给前端。
- 所有下游统一一套阈值，未区分核心与非核心服务。

**延伸追问**：
- 熔断打开后，半开状态的探测请求如果失败，应该如何处理？
- 如何在 NestJS 中通过 Interceptor 统一实现熔断降级？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [opossum 文档](https://nodeshift.dev/opossum/)
- [cockatiel 文档](https://github.com/connor4312/cockatiel)
- [Martin Fowler - Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html)

**口头回答版**：
> 我之前在电商订单 BFF 里落地熔断。大促时库存服务超时，把订单提交接口拖垮了。我们选用了 cockatiel，在 Repository 层封装 executeWithBreaker，失败率超 50% 就开路，30 秒后半开放探测。降级时库存显示库存紧张，价格用缓存价。结果错误率从 35% 降到 2%，P99 降到 300ms。踩坑是降级文案一开始不准确，用户投诉，后来加了缓存价兜底。我们把这套方案沉淀成 SDK，并约定熔断必须配告警。`,

  'FB-19-CO-P-057': `### FB-19-CO-P-057：请解释 Koa/Redux 中 compose 函数的工作原理及其在洋葱圈中间件中的应用。

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：19 Node.js / BFF
**标签**：compose、EventEmitter
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
Koa 和 Redux 都实现了自己的 compose 函数。请解释 compose 的工作原理，以及它如何支撑 Koa 的洋葱圈中间件模型。

**参考答案**：

compose 是将多个函数组合成一个函数的编程模式。在 Koa/Redux 中，它把 `[f1, f2, f3]` 组合成 `f1(f2(f3(...)))` 的调用链。

1. **compose 的核心实现**：
   ```js
   function compose(middlewares) {
     return function (context, next) {
       let index = -1;
       return dispatch(0);
       function dispatch(i) {
         if (i <= index) return Promise.reject(new Error('next() called multiple times'));
         index = i;
         let fn = middlewares[i];
         if (i === middlewares.length) fn = next;
         if (!fn) return Promise.resolve();
         try {
           return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
         } catch (err) {
           return Promise.reject(err);
         }
       }
     };
   }
   ```

2. **洋葱圈执行流程**：
   - 假设中间件为 `[logger, auth, router]`。
   - 执行顺序：`logger 进入 -> auth 进入 -> router 进入 -> router 返回 -> auth 返回 -> logger 返回`。
   - 每个中间件通过 `await next()` 进入下一个，返回后继续执行后续代码。

3. **为什么 compose 能实现洋葱圈**：
   - compose 返回的函数接收 `context` 和 `next`，每个中间件也接收 `context` 和 `next`。
   - `next` 实际上就是调用下一个中间件的 dispatch 函数。
   - 由于 JavaScript 调用栈和 Promise 的特性，代码在 `await next()` 前后自然形成“进入—退出”的对称结构。

4. **与 Redux 的区别**：
   - Koa 的 compose 强调异步洋葱圈，每个中间件可以 `await next()`。
   - Redux 的 compose 是同步函数组合，主要用于组合多个 store enhancer 或 middleware。

**评分维度**：
- 能手写或讲清 compose 的核心逻辑（30%）
- 能解释洋葱圈执行顺序（25%）
- 能说明 next 与 dispatch 的关系（20%）
- 能区分 Koa 与 Redux compose 的异步/同步差异（15%）
- 能提到 next() 多次调用的防御（10%）

**常见错误**：
- 把 compose 简单理解为数组遍历，没理解递归和 Promise 包装。
- 认为洋葱圈是中间件内部循环，而不是调用栈的自然回退。
- 混淆 Koa 的 compose 与函数式编程中的 pipe/compose。

**延伸追问**：
- 如果某个中间件忘记 await next()，会出现什么问题？
- 在 Koa 中，错误处理中间件为什么通常放在最外层？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Koa compose 源码](https://github.com/koajs/compose/blob/master/index.js)
- [Redux compose 源码](https://github.com/reduxjs/redux/blob/master/src/compose.ts)
- [Koa 中间件指南](https://koajs.com/#middleware)

**口头回答版**：
> compose 就是把一组中间件组合成一个函数。Koa 的实现里，它返回一个函数，里面用 dispatch 递归调用下一个中间件，每个中间件接收 context 和 next，next 就是 dispatch(i+1)。因为 await next() 会等到下一个中间件返回，所以代码在 next 前后形成进入和退出的对称结构，就是洋葱圈。Koa 的 compose 是异步的，Redux 的是同步的。还要注意防御 next 被多次调用。`,

  'FB-19-SD-R-066': `### FB-19-SD-R-066：如何设计一个基于 Decorator 的轻量级 Deno BFF 框架？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：19 Node.js / BFF
**标签**：Deno、Decorator
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
假设你需要为 Deno 设计一个类似 NestJS 的轻量级 BFF 框架，支持通过 Decorator 定义路由、中间件和依赖注入。请给出整体架构设计。

**参考答案**：

设计 Deno 装饰器框架，需要在运行时元数据、IoC 容器和 HTTP 调度三个层面搭建：

1. **装饰器与元数据层**：
   - 使用 TC39 Stage 3 装饰器（Deno 2.x 支持）或 legacy 装饰器 + `Reflect.metadata`。
   - 定义 `@Controller('/users')`、`@Get('/')`、`@Injectable()`、`@Middleware()` 等装饰器。
   - 装饰器在类、方法、参数上写入元数据，例如路由路径、HTTP 方法、参数类型。

2. **IoC 容器**：
   - 维护 `Map<token, Provider>`，支持类构造器注入和自定义 token 注入。
   - 在应用启动时扫描所有 `@Module` 装饰的模块，递归解析 imports、controllers、providers。
   - 通过反射读取构造函数参数类型（`design:paramtypes`），自动实例化依赖。

3. **HTTP 调度层**：
   - 基于 Deno 的 `Deno.serve` 监听请求。
   - 启动阶段遍历所有 Controller 元数据，构建路由表：`Map<method+path, handler>`。
   - 请求到达时，解析 URL、匹配路由、按顺序执行全局 Guard/Interceptor/Pipe、Controller handler、异常过滤器。

4. **中间件与 AOP**：
   - 中间件按注册顺序执行，可决定是否调用 `next()`。
   - Interceptor 包裹 handler，支持在前后注入逻辑（如日志、响应包装）。
   - ExceptionFilter 统一捕获异常并映射为 HTTP 响应。

5. **生命周期与扩展**：
   - 定义 `OnModuleInit`、`OnApplicationBootstrap` 等生命周期钩子。
   - 支持通过 config 模块读取环境变量，支持插件机制加载第三方装饰器。

6. **示例伪代码**：
   ```ts
   @Controller('/users')
   class UserController {
     constructor(private userService: UserService) {}
     @Get('/:id')
     getUser(@Param('id') id: string) {
       return this.userService.findById(id);
     }
   }
   ```

**评分维度**：
- 能说明装饰器元数据设计（20%）
- 能设计 IoC 容器与模块扫描机制（25%）
- 能基于 Deno.serve 设计路由调度（20%）
- 能说明中间件、拦截器、异常过滤器的 AOP 模型（20%）
- 能提到生命周期与扩展点（15%）

**常见错误**：
- 忽略 Deno 装饰器标准与 Node.js/NestJS 的差异。
- IoC 容器未处理循环依赖。
- 所有逻辑在启动时未预编译路由表，导致每次请求反射解析，性能差。

**延伸追问**：
- Deno 的权限模型对这个框架加载第三方模块有什么影响？
- 如果不用 Reflect.metadata，如何通过装饰器参数传递元数据？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Deno 装饰器文档](https://docs.deno.com/runtime/manual/advanced/decorators)
- [TC39 Decorators Proposal](https://github.com/tc39/proposal-decorators)
- [NestJS 自定义框架实现思路](https://docs.nestjs.com/)

**口头回答版**：
> 我会分三层设计：装饰器层用 @Controller、@Get、@Injectable 写元数据；IoC 容器扫描模块、解析依赖并实例化；HTTP 层用 Deno.serve，启动时把元数据建成路由表，请求来时匹配路由，依次执行 Guard、Interceptor、Handler、ExceptionFilter。中间件按注册顺序执行，Interceptor 做日志和响应包装，ExceptionFilter 统一处理错误。还要定义生命周期钩子，支持插件扩展。`,

  'FB-19-CP-R-001': `### FB-19-CP-R-001：在 Node.js BFF 中，如何结合 Stream 与 JWT 实现安全的流式文件下载？

**题型**：综合开放题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：19 Node.js / BFF
**标签**：Stream、JWT
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
某 BFF 需要提供大文件下载接口，文件存储在对象存储（如 S3/OSS）。要求：1）仅允许已登录用户下载；2）避免 BFF 内存被大文件撑爆；3）下载链接不可被篡改或盗链。请结合 Stream 与 JWT 谈谈你的设计方案。

**参考答案**：

安全的流式文件下载设计需要从鉴权、传输、防重放三个维度考虑：

1. **JWT 鉴权与签权**：
   - 用户访问 `GET /api/files/:fileId/download` 时，BFF 先校验 JWT，确认用户身份和下载权限。
   - 对于临时下载链接，可签发一个短期、单次的 download token（signed JWT），包含 fileId、userId、exp、nonce。

2. **避免 BFF 中转大文件**：
   - 最佳方案：BFF 校验 JWT 后，生成一个带签名的对象存储直链（presigned URL，如 S3 presigned GetObject），重定向给客户端（302/307）。
   - 如果必须经 BFF 中转，使用 `pipeline` 把对象存储的 Readable Stream 直接 pipe 到 HTTP Response，避免整文件进入内存。

3. **Stream 安全控制**：
   - 对 BFF 中转场景，设置 `Content-Length` 或 chunked 响应，限制最大下载速率和连接超时。
   - 使用 `stream/promises.pipeline` 自动处理背压和错误，任一环节出错立即 destroy 流。
   - 校验文件 MIME 类型，防止通过下载接口执行脚本。

4. **防盗链与防重放**：
   - presigned URL 设置短有效期（如 5 分钟）和单次使用限制。
   - 在 JWT payload 中加入 `nonce`，服务端记录已使用 nonce，防止同一 token 重复下载。
   - 对 referrer 或 IP 做可选绑定（视安全等级而定）。

5. **监控与审计**：
   - 记录每次下载的 userId、fileId、token、IP、耗时。
   - 对异常下载（高频、大文件、非预期 IP）触发告警。

**评分维度**：
- 能说明 JWT 校验与临时 download token 设计（20%）
- 能比较 presigned URL 重定向与 BFF 中转的优劣（25%）
- 能用 pipeline 解释流式传输和背压处理（20%）
- 能提到 nonce、有效期、防盗链等安全措施（20%）
- 能提到下载审计与监控（15%）

**常见错误**：
- 大文件经 BFF 时用 fs.readFile 或 Buffer 全量读取，导致 OOM。
- JWT download token 长期有效且无使用次数限制，容易被盗链。
- 只校验用户是否登录，不校验对具体 fileId 的访问权限。

**延伸追问**：
- 如果对象存储和 BFF 不在同一内网，重定向直链可能暴露存储域名，如何处理？
- 如何在流式下载中实现断点续传（Range 请求）？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js stream/promises pipeline](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options)
- [AWS S3 Presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html)
- [JWT 安全最佳实践](https://tools.ietf.org/html/rfc8725)

**口头回答版**：
> 大文件下载我优先用 presigned URL，BFF 校验 JWT 和权限后 302 重定向到对象存储直链，这样不占用 BFF 带宽和内存。如果必须中转，就用 pipeline 把对象存储的流直接 pipe 到响应，别整文件读到内存。下载 token 用短期 JWT，带 fileId、userId、exp、nonce，防止盗链和重放。还要记审计日志，异常下载告警。`,

  'FB-19-CA-R-001': `### FB-19-CA-R-001：下面一段涉及 process.nextTick 与 Promise 的代码，输出顺序是什么？请分析原因。

**题型**：代码分析题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：19 Node.js / BFF
**标签**：nextTick、模块系统
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请分析以下 Node.js 代码的输出顺序，并解释事件循环各阶段的作用。

\`\`\`js
const fs = require('fs');

console.log('1: sync');

setTimeout(() => console.log('2: timeout'), 0);
setImmediate(() => console.log('3: immediate'));

Promise.resolve().then(() => {
  console.log('4: promise1');
  process.nextTick(() => console.log('5: nextTick in promise'));
});

process.nextTick(() => console.log('6: nextTick1'));

fs.readFile(__filename, () => {
  console.log('7: io callback');
  setTimeout(() => console.log('8: io timeout'), 0);
  setImmediate(() => console.log('9: io immediate'));
  Promise.resolve().then(() => console.log('10: io promise'));
});

process.nextTick(() => console.log('11: nextTick2'));

console.log('12: sync end');
\`\`\`

**参考答案**：

输出顺序：

\`\`\`
1: sync
12: sync end
6: nextTick1
11: nextTick2
4: promise1
5: nextTick in promise
2: timeout
3: immediate
7: io callback
9: io immediate
10: io promise
8: io timeout
\`\`\`

分析：
1. 同步代码先执行：`1: sync`、`12: sync end`。
2. 当前操作完成后，先清空 nextTick 队列：按注册顺序输出 `6: nextTick1`、`11: nextTick2`。
3. 再清空 Promise 微任务队列：`4: promise1`。在 promise1 回调里又注册了一个 nextTick，由于 nextTick 队列优先级高于 Promise，所以先输出 `5: nextTick in promise`。
4. 进入事件循环：
   - timers 阶段：`setTimeout(fn, 0)` 到期，输出 `2: timeout`。
   - poll 阶段：文件读取完成，执行 I/O 回调，输出 `7: io callback`。
   - 在 I/O 回调内部：
     - `setTimeout` 进入 timers 队列，下一轮才能执行。
     - `setImmediate` 进入 check 队列，由于当前处于 poll 阶段，会立即执行 check 阶段，输出 `9: io immediate`。
     - Promise 微任务输出 `10: io promise`。
   - 下一轮 timers 阶段执行 I/O 回调里的 setTimeout，输出 `8: io timeout`。

关键结论：
- `process.nextTick` 优先级高于 Promise 微任务。
- 在 I/O 回调内部，`setImmediate` 通常优先于 `setTimeout(fn, 0)`。
- `setTimeout` 与 `setImmediate` 在主线程中的顺序不确定，取决于事件循环当前所处阶段。

**评分维度**：
- 正确给出前 6 行输出（30%）
- 正确解释 nextTick 与 Promise 的优先级（25%）
- 正确解释 I/O 回调内 setImmediate 优先于 setTimeout（25%）
- 能说明主线程 setTimeout 与 setImmediate 的不确定性（10%）
- 能解释 process.nextTick 在 promise 回调中再次注册时的执行时机（10%）

**常见错误**：
- 认为 setTimeout(fn, 0) 一定比 setImmediate 先执行。
- 忽略 promise 回调中注册的 nextTick 会插队到下一个 Promise 之前。
- 把 I/O 回调内部的微任务与主线程微任务混为一谈。

**延伸追问**：
- 如果去掉 fs.readFile，输出顺序会怎样变化？
- 递归调用 process.nextTick 会有什么风险？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js 事件循环指南](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Node.js setImmediate vs setTimeout](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout)

**口头回答版**：
> 先执行同步代码打印 1 和 12。然后清 nextTick 队列，按注册顺序打印 6 和 11。再清 Promise 微任务，打印 4，promise 回调里又注册了一个 nextTick，所以先打印 5。然后进事件循环，timers 阶段打印 2，poll 阶段处理 IO 打印 7。IO 回调里 setImmediate 进 check 阶段，因为当前在 poll，所以先打印 9，然后 Promise 打印 10，最后下一轮 timers 打印 8。注意主线程里 2 和 3 谁先谁后要看事件循环阶段。`,

  'FB-19-CD-R-001': `### FB-19-CD-R-001：请手写一个基于工厂模式的 Node.js 依赖注入容器简化版。

**题型**：手写代码题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：19 Node.js / BFF
**标签**：设计模式、IoC
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请手写一个简化版的依赖注入容器，支持通过 token 注册类、解析依赖并自动实例化。要求体现工厂模式与单例管理思想。

**参考答案**：

设计思路：
1. 容器维护 `providers` 映射，key 为 token，value 为工厂函数或类构造器。
2. 支持 `register(token, provider)` 注册，provider 可以是类、工厂函数或值。
3. `resolve(token)` 时：
   - 如果是已缓存的单例，直接返回。
   - 如果是类，反射读取构造器参数类型，递归解析依赖后 new 实例。
   - 如果是工厂函数，调用工厂函数获取实例。
4. 使用 `Reflect.getMetadata('design:paramtypes', Constructor)` 读取 TS 编译后的类型元数据。

\`\`\`ts
import 'reflect-metadata';

type Provider<T = any> = { new (...args: any[]): T } | (() => T) | T;

class Container {
  private providers = new Map<any, Provider>();
  private singletons = new Map<any, any>();

  register(token: any, provider: Provider) {
    this.providers.set(token, provider);
    return this;
  }

  resolve<T>(token: any): T {
    if (this.singletons.has(token)) {
      return this.singletons.get(token);
    }

    const provider = this.providers.get(token);
    if (!provider) {
      // 未注册但 token 是类，尝试按类自动解析
      if (typeof token === 'function') {
        return this.createInstance<T>(token);
      }
      throw new Error(`No provider found for token: ${String(token)}`);
    }

    let instance: T;
    if (typeof provider === 'function' && provider.prototype?.constructor === provider) {
      // 类构造器
      instance = this.createInstance<T>(provider as any);
    } else if (typeof provider === 'function') {
      // 工厂函数
      instance = (provider as () => T)();
    } else {
      // 值
      instance = provider as T;
    }

    this.singletons.set(token, instance);
    return instance;
  }

  private createInstance<T>(Constructor: new (...args: any[]) => T): T {
    const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', Constructor) || [];
    const dependencies = paramTypes.map((depToken) => this.resolve(depToken));
    return new Constructor(...dependencies);
  }
}

// 使用示例
class Database {
  query() { return 'data'; }
}

class UserService {
  constructor(public db: Database) {}
  findUser() { return this.db.query(); }
}

const container = new Container();
container.register(Database, Database).register(UserService, UserService);
const userService = container.resolve(UserService);
console.log(userService.findUser()); // data
\`\`\`

关键点：
- 通过 Reflect.metadata 实现构造器参数类型自动推断（需 TS 开启 `emitDecoratorMetadata`）。
- 单例缓存保证同一 token 多次 resolve 返回同一实例。
- 工厂函数和值 provider 提供灵活性，可注入第三方库实例或配置对象。

**评分维度**：
- 正确实现 register/resolve 基本流程（30%）
- 能处理类、工厂函数、值三种 provider（25%）
- 能实现单例缓存（15%）
- 能用反射自动解析构造器依赖（20%）
- 代码边界处理与类型安全（10%）

**常见错误**：
- 未处理循环依赖，导致栈溢出。
- 未做单例缓存，每次 resolve 都创建新实例。
- 直接使用 `new provider()` 而不解析其依赖。

**延伸追问**：
- 如何检测并解决循环依赖？
- 如果构造器参数需要注入普通字符串（如配置值），Reflect.metadata 无法识别，应该怎么处理？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Reflect Metadata Proposal](https://rbuckton.github.io/reflect-metadata/)
- [TypeScript 装饰器元数据](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata)
- [NestJS Container 源码设计](https://docs.nestjs.com/providers#dependency-injection)

**口头回答版**：
> 我会写一个 Container 类，里面用 Map 存 provider，另一个 Map 存单例缓存。register 支持注册类、工厂函数或值。resolve 时先看缓存，没有就根据 provider 类型处理：类的话用 Reflect.getMetadata 读构造器参数类型，递归 resolve 依赖后 new 出来；工厂函数直接调用；值直接返回。这样同一 token 多次 resolve 都是同一个实例。注意要处理循环依赖和值注入。`,

  'FB-19-FS-R-001': `### FB-19-FS-R-001：请解释 NestJS 中装饰器、IoC 容器和模块系统的核心实现原理。

**题型**：框架原理题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：19 Node.js / BFF
**标签**：NestJS、CommonJS
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请深入解释 NestJS 框架的三大核心机制：装饰器（Decorator）如何收集元数据、IoC 容器如何解析依赖、模块系统（Module）如何组织应用。

**参考答案**：

NestJS 的核心实现围绕装饰器、IoC 容器和模块系统三层展开：

1. **装饰器与元数据**：
   - NestJS 使用 TypeScript 装饰器和 `reflect-metadata` 在类、方法、参数上附加元数据。
   - `@Controller('/cats')` 会在类上记录路径前缀；`@Get()` 会在方法上记录 HTTP 方法和路径。
   - `@Injectable()` 会在类上标记为可被注入的 Provider，并触发 TS 发射 `design:paramtypes` 元数据。
   - 元数据通过 `Reflect.getMetadata(key, target)` 在运行时读取。

2. **IoC 容器与依赖注入**：
   - NestJS 启动时扫描所有 Module 的 providers 和 controllers。
   - 对每个类，读取构造器参数类型（`design:paramtypes`），递归实例化依赖。
   - 容器维护单例实例池，同一 Provider 默认在全局范围内只实例化一次。
   - 支持通过 `@Inject(token)` 注入自定义 token，例如配置对象或第三方库实例。
   - 提供三种作用域：DEFAULT（单例）、REQUEST（每个请求一个实例）、TRANSIENT（每次注入新实例）。

3. **模块系统**：
   - `@Module({ imports, controllers, providers, exports })` 是 NestJS 组织应用的基本单元。
   - `imports` 引入其他模块的 exported providers；`exports` 暴露本模块的 providers 供外部使用。
   - 模块之间形成有向无环图，容器按拓扑顺序实例化，避免循环依赖（若存在循环依赖需用 `forwardRef`）。
   - 全局模块 `@Global()` 可在任何地方被注入，适合配置、数据库连接等横切关注点。

4. **请求处理流程**：
   - 启动阶段：装饰器元数据被扫描并注册到路由表中。
   - 请求阶段：HTTP 适配器（Express/Fastify）接收请求，容器根据路由找到 Controller 方法，依次执行 Guard、Interceptor、Pipe、ExceptionFilter。

**评分维度**：
- 能解释装饰器如何利用 reflect-metadata 收集元数据（25%）
- 能说明 IoC 容器解析依赖和单例管理（25%）
- 能解释 Module 的 imports/exports 组织方式（20%）
- 能提到 Provider 作用域和循环依赖处理（15%）
- 能联系请求处理流程说明（15%）

**常见错误**：
- 认为装饰器本身执行了业务逻辑，实际上装饰器只收集元数据。
- 把 NestJS 的 IoC 简单理解为“自动 new 对象”，忽略依赖图和作用域。
- 在模块间随意使用 @Global()，导致隐式依赖难以维护。

**延伸追问**：
- 如果两个模块互相依赖，NestJS 的 forwardRef 是如何工作的？
- REQUEST 作用域的 Provider 在性能上有什么影响？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [NestJS 官方文档 - Providers](https://docs.nestjs.com/providers)
- [NestJS 官方文档 - Modules](https://docs.nestjs.com/modules)
- [reflect-metadata](https://rbuckton.github.io/reflect-metadata/)

**口头回答版**：
> NestJS 装饰器用 reflect-metadata 在运行时收集元数据，比如 Controller 路径、HTTP 方法、Provider 的参数类型。IoC 容器启动时扫描所有 Module，读 design:paramtypes 递归实例化依赖，默认单例。Module 通过 imports 和 exports 组织依赖关系，形成有向无环图。请求来的时候，容器根据路由找到 Controller 方法，依次执行 Guard、Interceptor、Pipe。还要注意 Provider 有三种作用域，循环依赖要用 forwardRef。`,

  'FB-19-SS-R-001': `### FB-19-SS-R-001：请分享一次你在 Node.js BFF 中处理最终一致性的经历。

**题型**：软技能题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：19 Node.js / BFF
**标签**：最终一致性、Rate Limit
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在分布式系统中，BFF 常常需要 orchestrate 多个下游服务，无法保证强一致性。请分享一次你处理最终一致性问题的经历，包括背景、方案、收益和反思。

**参考答案**：

回答应围绕真实场景，建议结构如下：

1. **背景与目标**：
   - 场景：电商下单 BFF，需要同时扣库存、创建订单、扣积分、发送消息。
   - 问题：早期使用本地事务思路，通过同步 RPC 串行调用，一旦某个下游超时或失败，已执行的步骤无法回滚，数据不一致。
   - 目标：在无法使用 ACID 事务的情况下，保证最终一致性。

2. **方案选型与落地**：
   - 采用 Saga 模式：将长事务拆分为多个本地事务，每个步骤成功后发送领域事件，由事件驱动下一步。
   - 补偿事务：为每个步骤定义正向操作和补偿操作。例如订单创建失败时，释放已扣库存、回滚积分。
   - 事件总线：使用 RabbitMQ/RocketMQ 的可靠消息 + 本地事务表（或 Outbox 模式）保证事件至少被发送一次。
   - 幂等性：所有下游接口支持幂等调用，防止网络重试导致重复扣减。
   - 对账与监控：定时对账任务扫描异常状态单，自动或人工触发补偿。

3. **结果与反思**：
   - 量化：不一致订单比例从 0.5% 降到 0.01% 以下，人工介入减少 80%。
   - 踩坑：补偿事务本身也可能失败，需设计补偿重试和死信队列。
   - 协作：与下游团队统一幂等键、状态机、事件契约。

4. **可复制性**：
   - 沉淀 Saga 编排框架或 DSL，降低新业务接入成本。
   - 建立最终一致性治理规范：必须定义正向/补偿操作、幂等键、对账规则、告警阈值。

**评分维度**：
- 背景与最终一致性挑战清晰（20%）
- 能说明 Saga、补偿事务、事件总线等具体方案（30%）
- 能提到幂等、对账、监控等保障措施（20%）
- 能量化结果并反思踩坑（20%）
- 能提炼可复用方法论（10%）

**常见错误**：
- 把分布式事务当成本地事务处理，期望所有步骤同时成功或失败。
- 只定义正向操作，没有补偿方案。
- 忽略幂等性，导致重试时产生重复数据。

**延伸追问**：
- Saga 的编排式（Orchestration）与协同式（Choreography）各有什么优缺点？
- 如果补偿事务一直失败，你会怎么处理？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Saga Pattern - Microservices.io](https://microservices.io/patterns/data/saga.html)
- [Outbox Pattern](https://microservices.io/patterns/data/transactional-outbox.html)
- [Node.js 事件驱动架构](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

**口头回答版**：
> 我之前在电商下单 BFF 处理过最终一致性。下单要扣库存、创建订单、扣积分、发消息，早期同步串行调用，一个超时就全乱。后来改用 Saga，把长事务拆成本地事务加事件驱动，每个步骤配补偿操作。事件用 RocketMQ 可靠消息加 Outbox 表保证至少发一次。所有下游接口做幂等。还加了对账任务扫异常单。结果不一致率从 0.5% 降到 0.01%。踩坑是补偿也可能失败，要做重试和死信队列。`,

  'FB-19-CO-R-001': `### FB-19-CO-R-001：在 BFF 中，Saga 事务编排与 GraphQL 查询编排有什么核心区别？

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：19 Node.js / BFF
**标签**：Saga、GraphQL
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
在微服务 BFF 中，Saga 和 GraphQL 都涉及“把多个下游调用组合起来”。请从目标、语义、失败处理等维度对比两者的核心区别。

**参考答案**：

Saga 与 GraphQL 虽然都编排多个下游调用，但解决的问题层次完全不同：

| 维度 | Saga | GraphQL |
|------|------|---------|
| 核心目标 | 保证分布式事务的最终一致性 | 让前端精确获取所需数据，减少请求次数 |
| 处理对象 | 有副作用的业务操作（扣库存、创建订单） | 无副作用的数据查询与变更 |
| 失败处理 | 必须定义补偿事务（compensating transaction） | 返回部分错误或 null 字段，通常不自动补偿 |
| 执行语义 | 长事务拆分，事件/命令驱动 | 单次请求，resolver 树形执行 |
| 一致性 | 最终一致性 | 读取时的一致性由下游服务保证 |
| 典型工具 | Temporal、Seata、自研 Saga 引擎 | Apollo Server、GraphQL Yoga、type-graphql |

BFF 中的结合方式：
- GraphQL 负责“数据聚合与裁剪”：一个查询同时取用户、订单、商品数据。
- Saga 负责“跨服务事务”：下单流程中扣库存、建订单、发优惠券，失败时按 Saga 补偿。
- 两者可以在同一 BFF 中共存：GraphQL mutation 触发 Saga，Saga 完成后通过 subscription 推送状态。

选型建议：
- 如果只是查数据、拼字段，用 GraphQL。
- 如果涉及多服务写操作且需要回滚，用 Saga。
- 不要把 GraphQL mutation 当成分布式事务引擎使用。

**评分维度**：
- 能清晰区分 Saga 与 GraphQL 的目标（25%）
- 能从副作用、失败处理、一致性三个维度对比（35%）
- 能说明两者在 BFF 中的结合方式（20%）
- 能给出选型建议（10%）
- 能举例说明（10%）

**常见错误**：
- 把 GraphQL 的 mutation 当成 Saga 使用，期望自动回滚。
- 认为 Saga 只是“异步调用多个服务”，忽略补偿事务。
- 把 GraphQL 只理解为查询工具，不知道它也能做 mutation 但无事务语义。

**延伸追问**：
- 在 GraphQL mutation 中调用多个下游写接口，如何保证数据一致性？
- Saga 的编排式与协同式在 BFF 中各适合什么场景？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Saga Pattern - Microservices.io](https://microservices.io/patterns/data/saga.html)
- [GraphQL Specification](https://spec.graphql.org/)
- [Apollo Server 文档](https://www.apollographql.com/docs/apollo-server/)

**口头回答版**：
> Saga 和 GraphQL 都编排下游调用，但目标不同。Saga 解决的是分布式事务最终一致性，处理有副作用的写操作，失败时需要补偿事务。GraphQL 解决的是前端数据聚合，让一次请求拿到精确字段，失败时返回部分错误，不会自动补偿。在 BFF 里可以共存：GraphQL 做查询聚合，mutation 触发 Saga 做跨服务写。选型上，查数据用 GraphQL，多服务写用 Saga。`,

  'FB-19-SC-R-001': `### FB-19-SC-R-001：在 Node.js BFF 中，如何设计统一的错误处理机制并优化 GC 表现？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：19 Node.js / BFF
**标签**：错误处理、GC
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
某 Node.js BFF 线上偶发 500，且内存使用持续增长。请设计一套统一的错误处理机制，并说明如何通过该机制和代码优化改善 GC 表现。

**参考答案**：

统一的错误处理机制与 GC 优化应协同设计，避免错误对象堆积和大对象长期存活：

1. **统一错误模型**：
   - 定义业务错误基类 `AppError`，包含 code、message、statusCode、details、stack。
   - 区分可恢复错误（如下游超时）与不可恢复错误（如代码异常）。
   - 所有错误统一序列化为 `{ code, message, requestId }`，避免把内部 stack 暴露给客户端。

2. **分层错误捕获**：
   - **代码层**：async/await 配合 try/catch，不要把错误吞掉。
   - **框架层**：Express 用错误中间件 `(err, req, res, next)`；NestJS 用 ExceptionFilter。
   - **进程层**：监听 `uncaughtException`、`unhandledRejection`，记录后优雅退出。

3. **错误与 GC 优化**：
   - 避免在错误回调中创建大对象：不要把完整请求体、完整响应体都塞进错误对象。
   - 限制错误上下文大小：只记录 traceId、关键字段、下游服务名，不保留原始 Buffer/Stream。
   - 对高频错误（如下游限流）做采样或聚合，避免日志队列无限增长。
   - 使用对象池或复用错误模板，减少短生命周期对象数量。

4. **GC 专项优化**：
   - 使用 `--heapsnapshot-near-heap-limit` 或 `v8.writeHeapSnapshot()` 定期生成堆快照，分析 retained size。
   - 避免闭包持有大对象引用，尤其是事件监听器和定时器回调。
   - 大文件处理使用 Stream，避免一次性读取到字符串或 Buffer。
   - 调整新生代/老生代比例（如 `--max-old-space-size`）需基于压测，不盲目调大。

5. **监控与告警**：
   - 按错误 code 聚合，设置 P1/P2 告警。
   - 监控 GC 频率、停顿时间、堆内存趋势，定位内存泄漏。

**评分维度**：
- 能设计统一错误模型与分层捕获（25%）
- 能说明错误对象大小控制对 GC 的影响（20%）
- 能给出 3 种以上 GC 优化手段（25%）
- 能提到堆快照与内存泄漏排查（15%）
- 能设计监控告警方案（15%）

**常见错误**：
- 错误中间件只返回 500，不记录足够上下文，导致线上问题无法定位。
- 为了排查方便把完整响应体塞进错误对象，加剧 GC 压力。
- 一遇到内存增长就调大 --max-old-space-size，不找泄漏根因。

**延伸追问**：
- 如何在 NestJS 中实现一个全局 ExceptionFilter，并针对不同异常类型返回不同状态码？
- 如果堆快照显示大量字符串是日志对象持有，应该怎么优化？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js 错误处理最佳实践](https://nodejs.org/en/docs/guides/errors/)
- [V8 堆快照分析](https://v8.dev/docs/stack-trace-api)
- [Node.js 内存诊断指南](https://nodejs.org/en/docs/guides/diagnostics-memory-leak/)

**口头回答版**：
> 我会先定义统一的 AppError，包含 code、statusCode、traceId，不暴露 stack。分层捕获：代码里 try/catch，框架层用 Express 错误中间件或 NestJS ExceptionFilter，进程层监听 uncaughtException。为了 GC 好，错误对象不要塞完整请求响应体，只记关键字段；高频错误做采样。GC 优化方面，用堆快照找泄漏，避免闭包持有大对象，大文件用 Stream。监控按错误 code 聚合，GC 频率和堆内存也要告警。`,

  'FB-19-PE-R-001': `### FB-19-PE-R-001：如何排查与优化 Node.js BFF 中 setImmediate/setTimeout 使用不当导致的性能瓶颈？

**题型**：性能优化题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：19 Node.js / BFF
**标签**：setImmediate、安全
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
某 Node.js BFF 接口响应缓慢，CPU 占用不高，但事件循环延迟（event loop lag）持续升高。经过排查发现代码中大量使用了 setImmediate/setTimeout。请说明如何定位与优化这类问题。

**参考答案**：

setImmediate/setTimeout 使用不当通常表现为事件循环延迟升高、请求响应长尾增加，排查与优化思路如下：

1. **定位问题**：
   - 使用 `event-loop-lag` 库或 `perf_hooks` 监控事件循环延迟。
   - 使用 `--prof` 生成 V8 profile，查看 timers 相关函数（如 `TimerWrap`、`listOnTimeout`）的 CPU 占用。
   - 使用 `clinic.js` 或 `0x` 生成火焰图，定位大量 setImmediate/setTimeout 的调用来源。
   - 在代码中搜索 `setImmediate`、`setTimeout`、`setInterval`，统计每个模块创建的定时器数量。

2. **常见滥用场景**：
   - **高频轮询**：用 `setInterval` 每 100ms 轮询数据库或 Redis，改为事件驱动或长轮询。
   - **递归 setImmediate**：在回调里再次 `setImmediate(fn)` 形成“伪异步循环”，饿死 I/O。
   - **大量短定时器**：为每个请求/连接创建独立 timer，应使用集中调度器或时间轮算法。
   - **delay 为 0 的 setTimeout**：大量 `setTimeout(fn, 0)` 会塞满 timers 队列，延迟其他 timer 执行。

3. **优化手段**：
   - 合并定时器：把多个相近 delay 的任务合并到一个 timer 中批量处理。
   - 使用 `setImmediate` 替代 `setTimeout(fn, 0)`，避免 timers 队列堆积。
   - 对周期性任务使用专门调度库（如 `node-cron`、`bull`），而不是每个任务一个 setInterval。
   - 重计算任务放到 worker_threads，避免占用主线程事件循环。
   - 使用 `process.nextTick` 要谨慎，递归 nextTick 会饿死 I/O。

4. **验证**：
   - 优化前后对比 event loop lag、P99 延迟、CPU 占用。
   - 使用 clinic doctor 生成诊断报告，确认 timers 不再是瓶颈。

**评分维度**：
- 能说明事件循环延迟的监控方法（20%）
- 能指出 3 种以上 setImmediate/setTimeout 滥用场景（30%）
- 能给出合并定时器、集中调度、worker_threads 等优化手段（30%）
- 能提到验证工具与指标（10%）
- 能区分 setImmediate、setTimeout、process.nextTick 的适用场景（10%）

**常见错误**：
- 看到 CPU 不高就认为是网络问题，忽略事件循环延迟。
- 用 setTimeout(fn, 0) 做异步拆分，导致 timers 队列膨胀。
- 每个请求创建独立 timer，不做清理和合并。

**延伸追问**：
- 如果必须用 setInterval 做心跳，如何设计才能避免请求高峰时 timer 抖动？
- 在 Node.js 中，setImmediate 和 process.nextTick 哪个优先级更高？

**相关题目**：
- [FB-19-CO-B-001 相关基础概念](#FB-19-CO-B-001)

**参考资源**：
- [Node.js 事件循环指南](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [clinic.js 诊断工具](https://clinicjs.org/)
- [event-loop-lag 监控](https://github.com/stratusjs/event-loop-lag)

**口头回答版**：
> 我会先监控 event loop lag，用 clinic.js 或 0x 生成火焰图，找到大量 setImmediate/setTimeout 的来源。常见滥用有高频轮询、递归 setImmediate、每个请求一个 timer。优化可以合并定时器批量处理、用 setImmediate 替代 setTimeout(fn,0)、周期性任务用 node-cron 或 bull、重计算放 worker_threads。验证时对比 event loop lag 和 P99。还要注意 process.nextTick 优先级比 setImmediate 高，递归使用会饿死 I/O。`
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const qid of Object.keys(replacements)) {
  const pattern = new RegExp(
    `(### ${escapeRegExp(qid)}.*?\\n)([\\s\\S]*?)(?=\\n### FB-19-[A-Z]{2}-[BAPR]-\\d{3}|$)`,
    'g'
  );
  const originalMatch = content.match(pattern);
  if (!originalMatch) {
    console.warn('Warning: ID not found -', qid);
    continue;
  }
  // Determine if the original block is the last block (ends with trailing newline after ---)
  const isLastBlock = !content.slice(content.indexOf(originalMatch[0]) + originalMatch[0].length).includes('### FB-19-');
  let replacement = replacements[qid];
  // Normalize trailing separator to match original block style
  if (isLastBlock) {
    if (!replacement.endsWith('\\n')) {
      replacement += '\\n';
    }
  } else {
    // non-last blocks end exactly at ---
    replacement = replacement.replace(/\\n+$/, '');
  }
  content = content.replace(originalMatch[0], replacement);
  console.log('Updated', qid);
}

fs.writeFileSync(path, content, 'utf-8');
console.log('Done. Updated', Object.keys(replacements).length, 'questions.');
