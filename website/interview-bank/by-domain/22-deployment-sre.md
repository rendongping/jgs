# 部署与 SRE 面试题

> 本题库共收录 **71** 道面试题（基础 19 / 进阶 19 / 深入 17 / 架构 16）。
> 本文件收录前端部署、SRE、DevOps 相关面试题，目标题量 30 道以上。
> 题型覆盖：概念题、场景设计题、系统设计题、工程化题、性能优化题、安全题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-22-CO-B-001：什么是 CI/CD？前端 CI/CD 流水线通常包含哪些阶段？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：CI/CD、DevOps、流水线、部署
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CI/CD 的含义，并说明一条典型前端 CI/CD 流水线包含哪些阶段。

**参考答案**：

CI/CD 是 **Continuous Integration / Continuous Deployment** 的缩写，代表持续集成与持续部署：

- **CI（持续集成）**：开发人员频繁将代码合并到主干，每次合并都通过自动化构建和测试验证，尽早发现集成问题。
- **CD（持续部署/交付）**：通过自动化把通过验证的代码发布到测试环境或生产环境，减少人工干预，提高发布效率和一致性。

典型前端 CI/CD 流水线阶段：

```text
代码提交 -> 依赖安装 -> 代码检查 -> 单元测试 -> 构建 -> 产物扫描 -> 部署 -> 自动化验收 -> 监控告警
```

1. **触发（Trigger）**：Git Push / Pull Request / 定时触发。
2. **依赖安装**：`npm ci` / `pnpm install --frozen-lockfile`，保证可复现。
3. **代码检查**：ESLint、Prettier、TypeScript 类型检查、Commit Message 校验。
4. **单元/集成测试**：Jest / Vitest + Testing Library。
5. **构建**：Vite / Webpack / Rspack 构建，生成生产产物。
6. **产物扫描**：依赖漏洞扫描（Snyk / npm audit）、许可证检查、产物体积分析。
7. **部署**：上传 CDN / OSS / Kubernetes / Serverless。
8. **自动化验收**：E2E 测试（Playwright / Cypress）、Lighthouse CI。
9. **监控与告警**：错误上报、性能指标、业务指标接入。

最佳实践：
- 每个阶段失败都立即阻断后续阶段。
- 使用 artifact 缓存 node_modules 和构建产物，缩短流水线时间。
- 部署前进行灰度/蓝绿切换，降低发布风险。

**评分维度**：
- 能解释 CI/CD 核心含义（30%）
- 能列出至少 6 个流水线阶段（40%）
- 能提到质量门禁与失败阻断（20%）
- 能举例说明前端常用工具（10%）

**常见错误**：
- 把 CI 和 CD 混为一谈。
- 只讲构建和部署，忽略代码检查、测试、扫描。
- 认为 CI/CD 只是运维的事，与前端无关。

**延伸追问**：
- 如果单元测试通过率低，如何设计流水线策略？
- 如何保证不同环境（开发/测试/生产）构建产物一致？

**相关题目**：
- [FB-22-EN-A-009 设计一个前端静态资源部署流程](#FB-22-EN-A-009)
- [FB-22-EN-P-017 容器化部署前端应用](#FB-22-EN-P-017)

**参考资源**：
- [GitLab CI/CD 官方文档](https://docs.gitlab.com/ee/ci/)
- [GitHub Actions 官方文档](https://docs.github.com/en/actions)

**口头回答版**：
> CI/CD 就是持续集成和持续部署。CI 是频繁合并代码并自动构建测试，CD 是自动把通过验证的代码发布到线上。前端流水线一般包括：代码提交触发、安装依赖、代码检查、单元测试、构建、产物扫描、部署、自动化验收、监控告警。重点是每个阶段失败都要阻断，不能带病上线。

---

### FB-22-CO-B-002：滚动部署、蓝绿部署、金丝雀部署、红黑部署有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：部署策略、蓝绿部署、金丝雀、滚动部署
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比滚动部署、蓝绿部署、金丝雀部署和红黑部署四种常见部署策略，并说明各自的优缺点与适用场景。

**参考答案**：

| 部署策略 | 核心思想 | 优点 | 缺点 | 适用场景 |
|---------|---------|------|------|---------|
| **滚动部署** | 逐步用新版本替换旧版本实例 | 不需要额外资源，发布平滑 | 升级期间新旧共存，回滚较慢 | 实例多、资源有限、可接受短暂混合 |
| **蓝绿部署** | 同时维护两套环境，一键切换流量 | 零停机、回滚极快 | 需要双倍资源、切换瞬间可能丢请求 | 对可用性要求高、资源充足 |
| **金丝雀部署** | 先让小部分流量访问新版本，再逐步放大 | 风险可控、可实时监控 | 需要流量控制能力、发布周期长 | 大版本变更、需要观察指标 |
| **红黑部署** | 与蓝绿类似，但旧版本保留用于回滚 | 回滚快、数据隔离好 | 资源占用大 | 金融、电商等强一致性场景 |

关键区别：
- **滚动部署**：同一集群内逐步替换，存在中间状态。
- **蓝绿部署**：两套完整环境，通过负载均衡/路由切换流量。
- **金丝雀部署**：按流量比例或用户维度灰度，可细粒度控制。
- **红黑部署**：通常用于云平台，红环境为旧版本，黑环境为新版本，保留红环境直到确认黑环境稳定。

前端落地方式：
- 静态资源通过 CDN / OSS 发布不同版本目录，结合网关或 Nginx 配置切换。
- 使用 Feature Flag 或动态路由实现用户级灰度。

**评分维度**：
- 能准确区分四种部署策略（40%）
- 能从资源、回滚、风险等维度对比（30%）
- 能结合前端场景说明落地方式（20%）
- 能举例说明适用场景（10%）

**常见错误**：
- 把蓝绿部署和金丝雀部署混为一谈。
- 忽略滚动部署期间的新旧版本兼容问题。
- 认为蓝绿部署不需要处理数据库/状态一致性。

**延伸追问**：
- 前端静态资源如何做蓝绿切换？
- 金丝雀部署中，如何决定何时全量？

**相关题目**：
- [FB-22-SC-A-010 蓝绿部署在前端的实现与风险](#FB-22-SC-A-010)
- [FB-22-SC-A-011 金丝雀发布前端方案](#FB-22-SC-A-011)

**参考资源**：
- [Martin Fowler - Blue Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Spinnaker 部署策略](https://spinnaker.io/docs/concepts/#deployment-strategies)

**口头回答版**：
> 滚动部署是逐步替换实例，省资源但新旧会共存一段时间；蓝绿部署是两套环境同时存在，一键切流量，回滚快但资源翻倍；金丝雀部署是先把小比例流量导到新版本，观察没问题再放大；红黑部署类似蓝绿，旧环境会保留一段时间备回滚。前端一般用 CDN 不同目录或网关路由来实现切换。

---

### FB-22-CO-B-003：CDN 是什么？在前端部署中起什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：CDN、边缘节点、静态资源、加速
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CDN 的基本概念，并说明它在前端部署中的主要作用。

**参考答案**：

CDN（Content Delivery Network，内容分发网络）是一组分布在全球各地的边缘服务器，通过将网站内容缓存到离用户最近的节点，降低访问延迟、分担源站压力。

前端部署中 CDN 的核心作用：

1. **加速静态资源访问**：JS/CSS/图片/字体等缓存到边缘节点，用户就近下载。
2. **降低源站带宽压力**：边缘节点承担大部分流量，源站只处理未命中缓存的请求。
3. **提升并发能力**：CDN 厂商通常具备大规模带宽和 DDoS 防护能力。
4. **支持边缘计算**：现代 CDN（Cloudflare Workers、阿里云 DCDN、AWS CloudFront Functions）可在边缘执行轻量逻辑。
5. **全球加速**：通过海外节点提升跨境访问体验。

前端常见 CDN 使用方式：

```nginx
# Nginx 配置静态资源 CDN 回源
location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

构建时给资源加 hash：

```text
app.a3f2b1c.js   ->   https://cdn.example.com/static/js/app.a3f2b1c.js
```

最佳实践：
- 静态资源文件名加内容 hash，便于长期缓存。
- HTML 文件不建议长期缓存，或设置较短的 max-age。
- 配置 CORS、HTTPS、HTTP/2、Brotli 压缩。

**评分维度**：
- 能解释 CDN 基本概念（30%）
- 能列出至少 4 个前端作用（40%）
- 能说明缓存策略与 hash 命名（20%）
- 能提到边缘计算（10%）

**常见错误**：
- 认为 CDN 只是加速图片。
- 忽略 HTML 缓存策略导致用户看不到新版本。
- 不了解 CDN 回源和缓存命中率。

**延伸追问**：
- CDN 缓存未命中时会发生什么？
- 如何处理 CDN 节点上的旧版本资源？

**相关题目**：
- [FB-22-CO-B-004 HTTP 缓存与 CDN 缓存刷新](#FB-22-CO-B-004)
- [FB-22-SC-P-020 大规模前端缓存失效策略](#FB-22-SC-P-020)

**参考资源**：
- [MDN - HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Cloudflare - What is a CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)

**口头回答版**：
> CDN 是内容分发网络，把网站的静态资源缓存到全球各地的边缘节点，让用户从最近的节点下载。前端用 CDN 可以加速 JS、CSS、图片访问，减轻源站压力，还能抗大流量。一般构建时给资源文件名加 hash，然后长期缓存；HTML 文件不长期缓存，否则用户可能一直看到旧版本。

---

### FB-22-CO-B-004：HTTP 缓存与 CDN 缓存有什么区别？如何刷新缓存？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：HTTP 缓存、CDN 缓存、缓存策略、缓存刷新
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 HTTP 缓存与 CDN 缓存，并说明前端部署中刷新缓存的常见方法。

**参考答案**：

| 维度 | HTTP 缓存（浏览器缓存） | CDN 缓存（边缘缓存） |
|------|----------------------|---------------------|
| 位置 | 用户浏览器 | CDN 边缘节点 |
| 控制头 | `Cache-Control`、`Expires`、`ETag`、`Last-Modified` | CDN 控制台规则、源站响应头 |
| 生效对象 | 单个用户 | 大量用户共享 |
| 刷新方式 | 用户手动清缓存、改 URL、改响应头 | CDN 控制台刷新/预热 API |
| 典型问题 | 用户本地旧版本 | 全网节点旧版本 |

常见缓存控制头：

```http
Cache-Control: public, max-age=31536000, immutable
```

- `public`：可被任何缓存存储。
- `max-age`：缓存有效秒数。
- `immutable`：表示资源内容不会变，浏览器不必在 max-age 内重新验证。

缓存刷新方法：

1. **文件名加 hash（推荐）**：
   ```text
   app.a1b2c3.js -> app.d4e5f6.js
   ```
   新 URL 天然绕过旧缓存。

2. **修改 HTML 引用**：部署新版本时，HTML 中引用新的资源 URL。

3. **CDN 控制台/API 刷新**：
   - 目录刷新：`/static/v1.0/`
   - URL 刷新：`https://cdn.example.com/static/app.js`
   - 全站刷新（慎用）。

4. **预热（Preheat）**：新版本发布前，主动将资源推送到 CDN 节点。

5. **版本号/查询参数（不推荐用于 CDN）**：
   ```text
   app.js?v=2.0
   ```
   可能无法保证所有 CDN 节点都按查询参数区分缓存。

最佳实践：
- 静态资源采用“内容 hash + 长期缓存”。
- HTML 设置 `Cache-Control: no-cache` 或较短 max-age。
- 发布流程中集成 CDN 刷新/预热 API。

**评分维度**：
- 能区分 HTTP 缓存和 CDN 缓存（30%）
- 能解释常见缓存控制头含义（25%）
- 能列出至少 4 种缓存刷新方法（30%）
- 能说明 hash 命名是最佳实践（15%）

**常见错误**：
- 认为清浏览器缓存就能解决 CDN 缓存问题。
- 给所有资源设置无限期缓存，导致无法更新。
- 用查询参数 `?v=xxx` 作为长期缓存方案。

**延伸追问**：
- 如果用户浏览器缓存了旧的 HTML，怎么办？
- 什么是缓存击穿、缓存穿透、缓存雪崩？

**相关题目**：
- [FB-22-CO-B-003 CDN 在前端部署中的作用](#FB-22-CO-B-003)
- [FB-22-SC-P-020 大规模前端缓存失效策略](#FB-22-SC-P-020)

**参考资源**：
- [MDN - Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [Web.dev - HTTP cache](https://web.dev/articles/http-cache)

**口头回答版**：
> HTTP 缓存是浏览器本地的缓存，CDN 缓存是边缘节点上的缓存。HTTP 缓存管单个用户，CDN 缓存管一大片用户。刷新缓存最好用的是文件名加 hash，新版本改文件名，HTML 引用新的，旧的会自动过期。也可以调用 CDN 刷新 API 或提前预热。HTML 不要长期缓存，否则用户可能一直加载旧资源。

---

### FB-22-EN-B-005：前端构建产物如何做版本化管理？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：构建产物、版本管理、hash、CDN
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
前端构建产物发布到 CDN 或 OSS 后，通常如何进行版本化管理？请说明常见做法及其原因。

**参考答案**：

前端构建产物版本化管理的核心目标是：

1. **可回滚**：每个版本独立，出现问题可快速切回旧版本。
2. **可缓存**：文件名或路径包含版本信息，便于长期缓存。
3. **可追溯**：通过版本号快速定位代码提交。
4. **避免覆盖**：新旧版本并存，不互相影响。

常见做法：

**1. 内容 hash 命名**

```text
dist/
  js/
    app.a3f2b1c.js
    vendor.7d8e9f0.js
  css/
    main.2c4d6e8.css
```

优点：文件内容变化则 hash 变化，天然支持长期缓存。

**2. 版本目录隔离**

```text
https://cdn.example.com/
  app/v1.0.0/
  app/v1.1.0/
  app/v1.2.0/
```

优点：整个版本目录独立，方便回滚和并行测试。

**3. 构建信息文件**

```json
{
  "version": "1.2.0",
  "gitCommit": "abc1234",
  "buildTime": "2026-07-03T12:00:00Z",
  "branch": "main"
}
```

部署时写入 `version.json`，便于线上问题定位。

**4. Source Map 版本对应**

```text
app.a3f2b1c.js
app.a3f2b1c.js.map
```

生产环境 Source Map 可单独存储，按需上传至错误监控平台。

最佳实践：
- 使用语义化版本号（SemVer）管理发布版本。
- HTML 作为入口不长期缓存，每次发布指向新的资源路径。
- 保留最近 N 个版本的产物，支持快速回滚。
- 在监控平台上注册版本号，便于错误归因。

**评分维度**：
- 能说明版本化管理的目标（25%）
- 能列出 hash 命名、版本目录、构建信息文件等方法（45%）
- 能说明 Source Map 管理（15%）
- 能提到回滚与追溯（15%）

**常见错误**：
- 每次构建都覆盖同一个文件名，导致缓存无法更新。
- 不保留历史版本，回滚困难。
- 版本号随意，无法对应代码提交。

**延伸追问**：
- 如何实现一键回滚到上一个版本？
- Source Map 是否应该部署到生产环境？

**相关题目**：
- [FB-22-EN-A-012 前端如何实现自动回滚](#FB-22-EN-A-012)
- [FB-22-CO-B-004 HTTP 缓存与 CDN 缓存刷新](#FB-22-CO-B-004)

**参考资源**：
- [SemVer 规范](https://semver.org/lang/zh-CN/)
- [Vite 构建配置 - assetFileNames](https://vitejs.dev/config/build-options.html#build-rollupoptions)

**口头回答版**：
> 前端产物版本管理主要为了可回滚、可缓存、可追溯。常见做法是给 JS/CSS 文件名加内容 hash，内容变了 hash 就变；或者按版本号建目录，比如 v1.0.0、v1.1.0。还会生成一个 version.json 记录 git commit 和构建时间。HTML 不长期缓存，每次发布指向新的资源路径。这样出问题可以快速切回旧版本。

---

### FB-22-CO-B-006：HTTPS/TLS 是什么？为什么前端部署必须使用 HTTPS？

**题型**：概念题 / 安全题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：HTTPS、TLS、SSL、安全、证书
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 HTTPS 与 TLS 的关系，并说明前端部署使用 HTTPS 的必要性。

**参考答案**：

HTTPS（HyperText Transfer Protocol Secure）是 HTTP 的安全版本，它在 HTTP 之下加入了 TLS（Transport Layer Security，传输层安全协议）加密层。TLS 的前身是 SSL，目前主流版本为 TLS 1.2 和 TLS 1.3。

HTTPS 工作原理简述：

1. **TCP 连接建立**：客户端与服务端三次握手。
2. **TLS 握手**：协商加密算法、交换证书、生成对称加密密钥。
3. **加密传输**：后续 HTTP 数据通过对称加密传输。
4. **完整性校验**：通过 MAC（Message Authentication Code）防止篡改。

前端部署必须使用 HTTPS 的原因：

1. **数据安全**：防止中间人窃听用户敏感信息（Cookie、Token、表单数据）。
2. **防止篡改**：避免页面内容被注入广告或恶意脚本。
3. **浏览器限制**：
   - 混合内容（Mixed Content）警告：HTTPS 页面加载 HTTP 资源会被拦截。
   - Service Worker、Push API、Geolocation 等必须在 HTTPS 下使用。
   - Chrome 标记 HTTP 站点为“不安全”。
4. **SEO 与信任**：搜索引擎对 HTTPS 站点更友好，用户信任度更高。
5. **HTTP/2 和 HTTP/3 前提**：主流浏览器只支持在 HTTPS 上启用 HTTP/2、HTTP/3。

证书获取方式：
- Let’s Encrypt（免费，90 天有效期，自动续期）。
- 商业 CA（DigiCert、GlobalSign 等，支持 OV/EV）。
- 云厂商托管证书（阿里云 SSL、AWS ACM、Cloudflare Origin CA）。

最佳实践：
- 强制 HSTS（HTTP Strict Transport Security）。
- 定期更新 TLS 版本，禁用不安全的 TLS 1.0/1.1。
- 配置证书链完整，避免移动端兼容问题。

**评分维度**：
- 能说明 HTTPS 与 TLS 的关系（25%）
- 能解释 TLS 握手核心步骤（25%）
- 能列出至少 4 个必须使用 HTTPS 的原因（35%）
- 能提到 HSTS 和证书管理（15%）

**常见错误**：
- 把 HTTPS 和 TLS 完全等同。
- 认为 HTTPS 只是加密，忽略防篡改和浏览器限制。
- 忽略混合内容问题。

**延伸追问**：
- TLS 1.3 相比 TLS 1.2 有哪些改进？
- 如何解决 HTTPS 站点加载 HTTP 资源的问题？

**相关题目**：
- [FB-22-SE-A-016 HTTPS/TLS 部署安全要点](#FB-22-SE-A-016)
- [FB-22-CO-B-007 DNS 解析流程和前端部署关系](#FB-22-CO-B-007)

**参考资源**：
- [MDN - HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS)
- [Let's Encrypt 官方文档](https://letsencrypt.org/docs/)

**口头回答版**：
> HTTPS 就是 HTTP 加了一层 TLS 加密。TLS 负责握手协商加密算法和密钥，之后数据对称加密传输。前端必须用 HTTPS，一是保护用户数据不被窃听和篡改，二是浏览器对 HTTPS 页面有很多限制，比如 Service Worker、HTTP/2 都必须 HTTPS，混合内容也会被拦截。还要配 HSTS，让浏览器强制走 HTTPS。

---

### FB-22-CO-B-007：DNS 解析流程是什么？它和前端部署有什么关系？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：DNS、域名解析、CDN、负载均衡
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请简述 DNS 解析流程，并说明 DNS 在前端部署和流量调度中的作用。

**参考答案**：

DNS（Domain Name System）是将人类可读的域名转换为机器可识别的 IP 地址的分布式系统。

DNS 解析流程：

```text
1. 浏览器缓存 -> 2. 操作系统缓存 -> 3. 本地 DNS 服务器（ISP/公司 DNS）
   -> 4. 根域名服务器 -> 5. 顶级域服务器（TLD，如 .com）
   -> 6. 权威域名服务器 -> 7. 返回 IP 地址
```

1. **浏览器缓存**：检查是否近期解析过该域名。
2. **操作系统缓存**：检查 hosts 文件和本地 DNS 缓存。
3. **递归解析器**（Recursive Resolver）：通常由 ISP 或公司 DNS 提供，负责递归查询。
4. **根域名服务器**：指引到对应 TLD 服务器。
5. **TLD 服务器**：指引到域名的权威 DNS 服务器。
6. **权威 DNS 服务器**：返回最终的 A/AAAA/CNAME 记录。

DNS 记录类型（前端常用）：

| 记录类型 | 作用 |
|---------|------|
| A | 域名指向 IPv4 地址 |
| AAAA | 域名指向 IPv6 地址 |
| CNAME | 域名指向另一个域名 |
| TXT | 文本记录，常用于域名验证 |
| MX | 邮件服务器记录 |

前端部署中 DNS 的作用：

1. **流量入口**：用户通过域名访问应用，DNS 决定流量打到哪个 IP。
2. **CDN 接入**：通常将域名 CNAME 到 CDN 厂商域名，由 CDN 调度最近节点。
3. **负载均衡**：一个域名可配置多个 A 记录，实现简单轮询。
4. **灰度切换**：通过修改 DNS 记录将流量切到不同集群，实现灾备切换。
5. **GeoDNS**：根据用户地理位置返回不同 IP，实现就近访问。

最佳实践：
- 合理设置 TTL（Time To Live），平衡解析生效速度和缓存压力。
- 使用 CDN 时通常 CNAME 到 CDN 提供的域名。
- 重要业务使用 DNS 高可用服务，避免单点故障。

**评分维度**：
- 能描述 DNS 解析主要步骤（35%）
- 能区分常见 DNS 记录类型（25%）
- 能说明 DNS 在前端部署中的作用（30%）
- 能提到 TTL 和 CNAME 配置（10%）

**常见错误**：
- 把 DNS 解析过程描述得过于简单，忽略递归查询。
- 认为 DNS 修改后立即全球生效。
- 不清楚 A 记录和 CNAME 的区别。

**延伸追问**：
- DNS 解析慢会有什么影响？如何优化？
- 什么是 DNS 劫持和 DNS 污染？

**相关题目**：
- [FB-22-CO-B-006 HTTPS/TLS 基础](#FB-22-CO-B-006)
- [FB-22-SD-R-026 全球化多区域部署架构](#FB-22-SD-R-026)

**参考资源**：
- [MDN - DNS](https://developer.mozilla.org/en-US/docs/Glossary/DNS)
- [Cloudflare - How DNS works](https://www.cloudflare.com/learning/dns/what-is-dns/)

**口头回答版**：
> DNS 就是把域名转成 IP 的系统。解析时先查浏览器缓存、系统缓存，再找本地 DNS 服务器递归查询，依次问根服务器、顶级域服务器、权威服务器，最后拿到 IP。前端部署里，DNS 是流量入口，通常 CNAME 到 CDN 实现加速，也可以按地域返回不同 IP 做就近访问，还能通过改 DNS 做灾备切换。TTL 要设置合理，太短压力大，太长生效慢。

---

### FB-22-CO-B-008：灰度发布和 A/B 测试有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：灰度发布、A/B 测试、Feature Flag、流量切分
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明灰度发布和 A/B 测试的异同，并举例说明前端如何实现。

**参考答案**：

| 维度 | 灰度发布 | A/B 测试 |
|------|---------|---------|
| 目的 | 降低发布风险，逐步全量 | 验证产品假设，比较不同方案效果 |
| 关注指标 | 稳定性、错误率、性能 | 转化率、点击率、留存等业务指标 |
| 用户分组 | 通常按用户 ID、地域、设备、流量比例 | 按随机桶或业务规则分组 |
| 结束条件 | 观察无异常后全量 | 实验达到统计显著性后决策 |
| 技术实现 | 网关路由、Feature Flag、CDN 版本切换 | 实验平台、埋点、统计分析 |

共同点：
- 都是只让部分用户看到新版本。
- 都需要流量切分能力和数据观测能力。
- 都可能使用 Feature Flag 或动态配置。

前端实现方式：

**灰度发布**：

```javascript
// 按用户 ID 取模灰度
function isGrayUser(userId, grayPercent = 10) {
  const hash = userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return hash % 100 < grayPercent;
}
```

**A/B 测试**：

```javascript
// 实验平台分配 bucket
const experiment = abPlatform.getExperiment('new-checkout-flow');
if (experiment.bucket === 'A') {
  renderOldCheckout();
} else {
  renderNewCheckout();
}
```

最佳实践：
- 灰度发布重点监控技术指标（错误率、耗时、回滚）。
- A/B 测试需要严密的实验设计、随机分组和统计检验。
- 两者都需要完善的埋点和可观测性支持。

**评分维度**：
- 能准确区分灰度发布和 A/B 测试的目的（35%）
- 能从分组方式和指标维度对比（30%）
- 能举例说明前端实现方式（25%）
- 能提到 Feature Flag 和埋点（10%）

**常见错误**：
- 把灰度发布当作 A/B 测试使用。
- 认为 A/B 测试只关心界面样式。
- 忽略分组随机性和统计显著性。

**延伸追问**：
- 如何保证 A/B 测试分组的稳定性？
- 灰度发布如何设计回滚策略？

**相关题目**：
- [FB-22-SC-A-011 金丝雀发布前端方案](#FB-22-SC-A-011)
- [FB-22-SD-R-027 零停机前端发布架构](#FB-22-SD-R-027)

**参考资源**：
- [Martin Fowler - Feature Toggles](https://martinfowler.com/articles/feature-toggles.html)
- [Google - A/B 测试基础](https://developers.google.com/analytics/devguides/collection/ga4/experiment?hl=zh-cn)

**口头回答版**：
> 灰度发布是为了降低发布风险，先让一小部分用户用新版本，没问题再全量；A/B 测试是为了验证产品方案，比如新版本能不能提升转化率。灰度看稳定性指标，A/B 看业务指标。前端可以用用户 ID 取模做灰度，用实验平台分桶做 A/B 测试，两者都可以用 Feature Flag 控制。

---

## 进阶题（8 道）{#advanced}

### FB-22-EN-A-009：设计一个前端静态资源部署流程

**题型**：工程化题 / 场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：22 部署与 SRE
**标签**：静态资源、CDN、CI/CD、部署流程、OSS
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
假设你负责一个 SPA 前端项目，请设计一条从代码提交到线上访问的完整静态资源部署流程。

**参考答案**：

完整部署流程：

```text
代码提交
  │
  ▼
CI 触发
  │
  ├── 依赖安装
  ├── 代码检查（Lint / Type Check）
  ├── 单元测试
  └── 构建（生成带 hash 的静态资源）
  │
  ▼
产物质量检查
  ├── 产物体积分析
  ├── Source Map 上传
  └── 安全扫描（npm audit / Snyk）
  │
  ▼
部署到预发环境
  ├── 上传到 OSS / S3
  ├── CDN 刷新/预热
  └── 自动化 E2E 测试
  │
  ▼
灰度发布
  ├── 5% -> 20% -> 50% -> 100%
  └── 监控错误率、性能指标
  │
  ▼
全量发布 / 回滚
```

关键环节说明：

1. **构建产物**：
   ```text
   dist/
     index.html
     assets/
       app.abc123.js
       vendor.def456.js
       main.ghi789.css
   ```

2. **OSS/S3 上传**：
   - 仅上传 `assets/` 下带 hash 的资源到 CDN 源站。
   - `index.html` 根据环境上传到对应路径或服务器。

3. **CDN 刷新/预热**：
   - 刷新 `index.html` 所在路径。
   - 预热核心 JS/CSS 资源到边缘节点。

4. **版本标记**：
   - 写入 `version.json`：版本号、commit、构建时间。
   - 在监控平台注册版本。

5. **回滚能力**：
   - 保留最近 N 个版本目录。
   - 一键切换 CDN 回源路径或 HTML 指向旧版本。

最佳实践：
- 构建产物按环境隔离（dev/staging/prod）。
- 使用基础设施即代码（Terraform / Pulumi）管理 OSS/S3/CloudFront。
- 部署过程全自动化，人工只负责审批灰度阶段。

**评分维度**：
- 能画出完整流程（30%）
- 能说明构建产物结构和上传策略（25%）
- 能提到 CDN 刷新/预热和版本管理（25%）
- 能说明灰度与回滚机制（20%）

**常见错误**：
- 忽略预发环境和灰度阶段直接全量。
- 不保留历史版本，无法回滚。
- 产物没有按环境隔离。

**延伸追问**：
- 如果 CDN 刷新失败，如何保障用户访问？
- 如何实现多环境配置管理？

**相关题目**：
- [FB-22-CO-B-001 CI/CD 流水线阶段](#FB-22-CO-B-001)
- [FB-22-EN-A-012 前端如何实现自动回滚](#FB-22-EN-A-012)

**参考资源**：
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [阿里云 OSS 静态网站托管](https://help.aliyun.com/zh/oss/user-guide/tutorial-host-a-static-website-by-using-a-bucket)

**口头回答版**：
> 我先设计一条完整流水线：代码提交后触发 CI，安装依赖、代码检查、单元测试、构建生成带 hash 的产物；然后做产物质量检查，包括体积分析、Source Map 上传、安全扫描；接着部署到预发环境，上传 OSS、刷新 CDN、跑 E2E 测试；通过后再灰度，比如 5%、20%、50%、100%，同时监控错误率和性能；每个阶段失败都阻断，保留历史版本支持一键回滚。

---

### FB-22-SC-A-010：蓝绿部署在前端如何实现？有哪些风险？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：22 部署与 SRE
**标签**：蓝绿部署、零停机、回滚、静态资源
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何对前端应用实施蓝绿部署，并分析可能遇到的风险及应对措施。

**参考答案**：

前端蓝绿部署核心思路：

1. 同时准备两套完整环境：蓝环境（当前线上）和绿环境（新版本）。
2. 绿环境部署并验证通过后，将流量从蓝环境切换到绿环境。
3. 切换后持续观察，出现问题立即切回蓝环境。
4. 确认稳定后，再决定是否释放蓝环境资源。

静态资源场景实现：

```text
https://cdn.example.com/
  blue/
    index.html
    assets/...
  green/
    index.html
    assets/...
```

通过 Nginx / API Gateway / DNS 切换 `index.html` 的来源：

```nginx
location / {
    # 切换 upstream 或 root 目录实现蓝绿切换
    root /var/www/green;  # 或 /var/www/blue
    try_files $uri $uri/ /index.html;
}
```

前端蓝绿部署的风险与应对：

| 风险 | 应对措施 |
|------|---------|
| 切换瞬间用户会话中断 | 保持无状态设计，Token 等状态不依赖具体环境 |
| 新旧版本 API 不兼容 | 发布前做 API 契约测试，保证向后兼容 |
| 用户加载到旧 HTML 但请求新 JS 导致 404 | 旧版本资源保留一段时间，不要立即清理 |
| 数据库/schema 变更 | 数据库变更需先于应用发布或兼容新旧两版 |
| 回滚时 CDN 缓存未失效 | 设置 HTML 短缓存，必要时主动刷新 CDN |
| 资源成本翻倍 | 仅在发布窗口期保留双环境，稳定后释放 |

最佳实践：
- 使用容器化部署时，蓝绿可通过 Kubernetes Service + Deployment 实现。
- 静态资源按版本目录隔离，避免切换时资源错乱。
- 切换前执行自动化冒烟测试。
- 保留回滚脚本，切换时间控制在秒级。

**评分维度**：
- 能说明蓝绿部署基本流程（30%）
- 能结合前端静态资源说明实现方式（30%）
- 能列出至少 4 个风险及应对（30%）
- 能提到资源成本和回滚速度（10%）

**常见错误**：
- 认为蓝绿部署只需要复制一份代码。
- 忽略新旧版本 API 兼容性。
- 切换后立刻删除旧版本资源。

**延伸追问**：
- 蓝绿部署和金丝雀部署能否结合使用？
- 如何处理需要用户登录态的前端应用蓝绿切换？

**相关题目**：
- [FB-22-CO-B-002 部署策略对比](#FB-22-CO-B-002)
- [FB-22-SD-R-027 零停机前端发布架构](#FB-22-SD-R-027)

**参考资源**：
- [Martin Fowler - Blue Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Kubernetes Blue Green Deployment](https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#canary-deployments)

**口头回答版**：
> 前端蓝绿部署就是同时维护两套完整环境，一套线上跑，一套新版本验证好，然后一键切流量。静态资源可以放在 blue/green 两个目录，通过 Nginx 或网关切换根目录。风险主要是切换瞬间的会话问题、新旧 API 不兼容、旧资源被删导致 404、回滚时缓存没失效。应对办法是保持无状态、保留旧资源一段时间、HTML 短缓存、数据库变更兼容两版，切换后观察一段时间再释放旧环境。

---

### FB-22-SC-A-011：如何设计前端金丝雀发布方案？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：22 部署与 SRE
**标签**：金丝雀发布、灰度、Feature Flag、流量切分
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个前端金丝雀发布方案，包括灰度维度、放量策略、观测指标和回滚机制。

**参考答案**：

前端金丝雀发布核心流程：

```text
构建新版本 -> 部署到灰度环境 -> 5% 流量 -> 观察指标 -> 20% -> 50% -> 100%
                │                              │
                └──── 指标异常 -> 自动回滚 -----┘
```

**一、灰度维度**

1. **流量比例**：从 1%、5%、20%、50% 逐步放大。
2. **用户维度**：
   - 按用户 ID 哈希取模。
   - 按登录状态（先登录用户、后匿名用户）。
   - 按会员等级、组织 ID。
3. **地域维度**：先小城市、后大城市；或按国家/地区。
4. **设备/浏览器**：先 Chrome、后 Safari/IE。
5. **业务维度**：按页面、按功能模块。

**二、放量策略**

```javascript
// 按用户 ID 取模的简单实现
function isCanaryUser(userId, percent) {
  const hash = stableHash(userId);
  return (hash % 100) < percent;
}
```

更复杂的策略可接入配置中心或 Feature Flag 平台：

```javascript
const flags = await featureFlagClient.getFlags({ userId, region, device });
if (flags.newDashboard.enabled) {
  return <NewDashboard />;
}
return <OldDashboard />;
```

**三、观测指标**

| 类型 | 指标 |
|------|------|
| 稳定性 | JS 错误率、Promise 异常、白屏率 |
| 性能 | FCP、LCP、INP、CLS、API 响应时间 |
| 业务 | 转化率、点击率、跳出率 |
| 资源 | CDN 命中率、5xx 比例 |

**四、回滚机制**

- **自动回滚**：错误率超过阈值、P99 耗时飙升时，自动切回旧版本。
- **一键回滚**：人工在发布平台点击回滚，切换 CDN 路径或 Feature Flag。
- **用户无感知回滚**：通过修改配置让灰度用户重新访问旧版本。

最佳实践：
- 每个灰度阶段至少观察 15-30 分钟或达到一定样本量。
- 核心指标要有同比/环比基线。
- 发布期间保持值班，回滚脚本提前演练。

**评分维度**：
- 能设计完整金丝雀流程（30%）
- 能从多维度说明灰度策略（25%）
- 能列出关键观测指标（25%）
- 能说明自动/手动回滚机制（20%）

**常见错误**：
- 只按流量比例放量，忽略用户分组的稳定性。
- 灰度指标只看业务指标，忽略错误率和性能。
- 没有自动止损机制。

**延伸追问**：
- 如何保证同一个用户在灰度期间始终访问同一版本？
- 金丝雀发布和 A/B 测试如何共用一套基础设施？

**相关题目**：
- [FB-22-CO-B-008 灰度发布和 A/B 测试的区别](#FB-22-CO-B-008)
- [FB-22-CP-P-021 Incident Response 流程](#FB-22-CP-P-021)

**参考资源**：
- [Spinnaker - Canary Analysis](https://spinnaker.io/docs/guides/user/canary/)
- [LaunchDarkly - Feature Flag Best Practices](https://docs.launchdarkly.com/home/getting-started/feature-flags)

**口头回答版**：
> 前端金丝雀发布就是先让一小部分用户用新版本，逐步放大。灰度维度可以按流量比例、用户 ID 取模、地域、设备、业务模块等。放量时最好用 Feature Flag 平台控制。观测指标要包括 JS 错误率、白屏率、FCP/LCP/INP 这些性能指标，还有转化率等业务指标。一旦发现异常就自动或一键回滚，切换配置让用户回到旧版本。每个阶段至少观察十几分钟，核心指标要有基线对比。

---

### FB-22-EN-A-012：前端如何实现自动回滚？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：22 部署与 SRE
**标签**：回滚、自动化、监控、CI/CD、Feature Flag
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端部署中自动回滚的触发条件和实现方式，并讨论自动回滚的边界。

**参考答案**：

自动回滚的核心目标：当新版本上线后出现异常，无需人工干预即可快速恢复到上一个稳定版本，减少故障影响范围和时间。

**一、触发条件**

| 触发源 | 典型指标/事件 |
|--------|--------------|
| 监控告警 | JS 错误率突增、白屏率上升、P99 耗时超标 |
| 业务指标 | 转化率骤降、支付成功率下降 |
| 自动化测试 | 发布后 E2E/冒烟测试失败 |
| 人工触发 | 发布平台一键回滚 |
| 基础设施 | CDN 5xx 比例升高、源站不可用 |

**二、实现方式**

1. **版本化存储**：
   ```text
   /var/www/releases/
     20260703-120000-abc1234/
     20260703-100000-def5678/
   ```

2. **原子化切换**：
   - 静态资源：修改 Nginx root 或 CDN 回源路径。
   - 容器化：修改 Kubernetes Deployment 镜像 tag 或 Rollback。

3. **配置中心/Feature Flag**：
   ```javascript
   // 通过 Feature Flag 秒级关闭新功能
   if (flags.newFeature.enabled && flags.newFeature.percent > 0) {
     flags.newFeature.percent = 0;
   }
   ```

4. **CI/CD Pipeline 自动执行**：
   ```yaml
   rollback:
     triggers:
       - metric: js_error_rate
         threshold: 5%
         duration: 3m
     steps:
       - revert cdn path
       - refresh cdn cache
       - notify oncall
   ```

**三、自动回滚的边界**

- **数据变更无法回滚**：数据库 schema 变更、用户数据写入不可逆。
- **第三方依赖故障**：第三方 SDK 或 API 故障无法通过前端回滚解决。
- **缓存延迟**：CDN/浏览器缓存可能导致回滚后部分用户仍访问旧版本。
- **误触发风险**：流量抖动可能触发误回滚，需要结合持续时间和置信度。

最佳实践：
- 回滚前先尝试降级（Feature Flag 关闭新功能）。
- 核心链路回滚后必须执行冒烟测试。
- 所有回滚操作都要记录审计日志。

**评分维度**：
- 能列出自动回滚触发条件（25%）
- 能说明版本化存储和切换方式（30%）
- 能提到 Feature Flag 秒级回滚（20%）
- 能讨论自动回滚边界（25%）

**常见错误**：
- 认为自动回滚可以解决所有故障。
- 没有保留历史版本，回滚无从下手。
- 忽略数据变更和缓存延迟问题。

**延伸追问**：
- 自动回滚和手动回滚各适用于什么场景？
- 如何防止监控抖动导致误回滚？

**相关题目**：
- [FB-22-SC-A-010 蓝绿部署在前端的实现与风险](#FB-22-SC-A-010)
- [FB-22-EN-B-005 前端构建产物版本化管理](#FB-22-EN-B-005)

**参考资源**：
- [Google SRE - Rollbacks](https://sre.google/sre-book/being-on-call/)
- [Kubernetes Rollbacks](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment)

**口头回答版**：
> 自动回滚就是新版本上线后如果监控发现异常，比如 JS 错误率突增、白屏率升高、转化率骤降，系统自动切回上一个稳定版本。实现上要保持产物版本化，比如每个构建放到带时间戳和 commit 的目录，回滚时改 Nginx root 或 CDN 回源路径。Feature Flag 可以秒级关闭新功能，比全量回滚更快。但自动回滚也有边界，数据库变更、用户写入的数据没法回滚，第三方服务故障也解决不了，还要注意缓存延迟和误触发。

---

### FB-22-PE-A-013：前端性能基线如何建立和监控？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：22 部署与 SRE
**标签**：性能基线、Web Vitals、监控、Lighthouse
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何为前端应用建立性能基线，并设计持续监控方案。

**参考答案**：

性能基线是指在一定条件下（网络、设备、浏览器、地理位置）前端应用的性能指标参考值，用于衡量后续变更是否引入性能回归。

**一、选择核心指标**

| 指标 | 含义 | 建议基线 |
|------|------|---------|
| LCP（Largest Contentful Paint） | 最大内容绘制时间 | < 2.5s |
| INP（Interaction to Next Paint） | 交互到下一次绘制 | < 200ms |
| CLS（Cumulative Layout Shift） | 累积布局偏移 | < 0.1 |
| FCP（First Contentful Paint） | 首次内容绘制 | < 1.8s |
| TTFB（Time to First Byte） | 首字节时间 | < 600ms |
| JS 错误率 | JS 运行时异常比例 | < 0.1% |

**二、建立基线的方法**

1. **实验室数据（Lab Data）**：
   - 使用 Lighthouse CI 在固定机器/容器上运行。
   - 控制网络（Fast 3G、Slow 4G）和设备性能（CPU 降速）。

2. **真实用户数据（RUM, Real User Monitoring）**：
   - 通过 Performance API、`web-vitals` 库采集真实用户数据。
   - 按百分位（P50/P75/P90/P95/P99）统计。

```javascript
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(console.log);
onINP(console.log);
onCLS(console.log);
```

3. **基准版本采样**：
   - 在稳定版本上采集至少 1-2 周数据，排除节假日/活动峰值影响。
   - 分设备、浏览器、地域建立细分基线。

**三、持续监控方案**

```text
RUM SDK 采集 -> 上报 -> 时序数据库 -> 可视化看板 -> 异常告警
```

1. **埋点 SDK**：封装 `web-vitals` 和自定义性能指标。
2. **采样策略**：核心页面全量，普通页面按比例采样。
3. **看板**：Grafana / Datadog / 阿里云 ARMS。
4. **告警**：
   - 单指标阈值：LCP P75 > 2.5s。
   - 环比/同比：新版本发布后 LCP 上涨超过 10%。
5. **发布关联**：把性能数据按版本号切片，快速定位回归版本。

最佳实践：
- 性能优化遵循“先测量，后优化”。
- 每次发布对比基线，超过阈值阻断发布或触发回滚。
- 关注 P75/P95 而非平均值。

**评分维度**：
- 能列出核心 Web Vitals 指标及基线（30%）
- 能区分 Lab Data 和 RUM（25%）
- 能设计持续监控闭环（30%）
- 能提到发布版本关联与告警（15%）

**常见错误**：
- 只看本地 Lighthouse 分数，忽略真实用户数据。
- 用平均值代替百分位。
- 没有分设备/网络建立基线。

**延伸追问**：
- 如何处理 RUM 数据采集对性能的影响？
- 性能回归时如何快速定位是代码、资源还是 CDN 问题？

**相关题目**：
- [FB-22-CO-A-015 可观测性三大支柱](#FB-22-CO-A-015)
- [FB-22-PE-P-023 容量规划在前端场景的应用](#FB-22-PE-P-023)

**参考资源**：
- [web-vitals 库](https://github.com/GoogleChrome/web-vitals)
- [Web Vitals 官方文档](https://web.dev/articles/vitals)

**口头回答版**：
> 性能基线就是给应用定一个性能参考值。核心指标有 LCP、INP、CLS、FCP、TTFB 这些 Web Vitals。建立基线要结合实验室数据和真实用户数据：实验室用 Lighthouse CI 在固定环境跑；真实用户用 web-vitals 库采集，按 P75、P95 统计。持续监控就是把数据上报到 Grafana 或 ARMS，做看板和告警，新版本发布后对比基线，指标 regress 就阻断或回滚。要分设备、网络、地域建基线，不能只看平均值。

---

### FB-22-CO-A-014：SLI、SLO、SLA 分别是什么？请结合前端场景举例

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：22 部署与 SRE
**标签**：SLI、SLO、SLA、SRE、可用性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 SLI、SLO、SLA 三者的含义及关系，并以前端场景为例说明。

**参考答案**：

| 概念 | 全称 | 含义 | 前端示例 |
|------|------|------|---------|
| **SLI** | Service Level Indicator | 服务等级指标，可量化的稳定性指标 | 页面加载成功率、JS 错误率、LCP P75 |
| **SLO** | Service Level Objective | 服务等级目标，SLI 要达到的目标值 | 首页 LCP P75 < 2.5s，JS 错误率 < 0.1% |
| **SLA** | Service Level Agreement | 服务等级协议，对外承诺，违约需赔偿 | 核心页面可用性 99.95%，月度不可用时间 < 21.6 分钟 |

三者关系：

```text
SLI 是度量，SLO 是目标，SLA 是承诺。
```

- **SLI** 告诉我们“系统在发生什么”。
- **SLO** 告诉我们“系统应该达到什么水平”。
- **SLA** 告诉我们“如果没达到，要承担什么后果”。

前端场景示例：

```text
SLI：首页 7 天平均 LCP = 2.1s
SLO：首页 LCP P75 <= 2.5s
SLA：首页月度可用性 >= 99.9%，否则按合同赔偿
```

常见前端 SLI：

- 可用性：页面可访问比例、JS 错误率、白屏率。
- 性能：FCP、LCP、INP、CLS、TTFB。
- 业务：页面转化率、支付成功率、核心接口成功率。

SLO 设定原则：

1. **从用户角度出发**：关注真实用户体验，而非服务器 CPU。
2. **可度量、可达成**：避免设置无法采集或不可能达到的指标。
3. **留有错误预算**：100% 可用性不现实，预留一定失败空间用于创新和发布。
4. **分层设定**：核心链路 SLO 更严格，非核心链路可适当放宽。

最佳实践：
- 每个前端应用定义 3-5 个核心 SLI。
- SLO violations 触发告警和复盘。
- 用错误预算（Error Budget）管理发布节奏。

**评分维度**：
- 能准确区分 SLI/SLO/SLA（40%）
- 能结合前端场景举例（30%）
- 能说明三者关系和分层设定原则（20%）
- 能提到错误预算（10%）

**常见错误**：
- 把 SLO 和 SLA 混为一谈。
- 设定 100% 可用性目标。
- SLI 选择过于技术化，不反映用户体验。

**延伸追问**：
- 什么是错误预算？如何用于发布决策？
- 如果 SLO 持续不达标，应该如何处理？

**相关题目**：
- [FB-22-CO-P-022 监控告警体系设计](#FB-22-CO-P-022)
- [FB-22-CP-P-021 Incident Response 流程](#FB-22-CP-P-021)

**参考资源**：
- [Google SRE - SLI, SLO, SLA](https://sre.google/sre-book/service-level-objectives/)
- [AWS Well-Architected - Reliability](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)

**口头回答版**：
> SLI 是指标，比如页面加载成功率、JS 错误率、LCP；SLO 是目标，比如 LCP P75 要小于 2.5 秒；SLA 是对外承诺，比如可用性 99.9%，没达到要赔偿。三者关系是 SLI 度量、SLO 目标、SLA 承诺。前端常用 SLI 有可用性、性能、业务成功率。SLO 不要设 100%，要留错误预算，核心链路严格一些，非核心放宽。

---

### FB-22-CO-A-015：可观测性三大支柱（日志/指标/链路）在前端如何落地？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：22 部署与 SRE
**标签**：可观测性、日志、指标、链路、监控
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释可观测性的三大支柱，并说明它们在前端工程中的具体落地方式。

**参考答案**：

可观测性三大支柱：

| 支柱 | 英文名 | 解决的问题 | 前端示例 |
|------|--------|-----------|---------|
| **日志** | Logs | 发生了什么 | 用户操作日志、错误堆栈、API 请求日志 |
| **指标** | Metrics | 发生得有多频繁/多严重 | LCP、JS 错误率、API 成功率、PV/UV |
| **链路** | Traces | 请求经过哪些服务 | 页面加载 -> API Gateway -> BFF -> 后端服务 |

**一、日志（Logs）**

前端日志类型：

1. **错误日志**：`window.onerror`、`window.onunhandledrejection` 捕获 JS 异常。
2. **业务日志**：按钮点击、页面跳转、表单提交。
3. **性能日志**：Long Task、Resource Timing、Navigation Timing。
4. **API 日志**：请求 URL、状态码、响应时间、错误信息。

落地方式：

```javascript
window.addEventListener('error', (event) => {
  logger.report({
    type: 'js-error',
    message: event.message,
    stack: event.error?.stack,
    url: location.href,
    userAgent: navigator.userAgent,
  });
});
```

注意：敏感信息脱敏，日志采样，避免影响性能。

**二、指标（Metrics）**

前端指标采集：

```javascript
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

onLCP((metric) => sendToMetrics('web_vitals_lcp', metric));
onINP((metric) => sendToMetrics('web_vitals_inp', metric));
onCLS((metric) => sendToMetrics('web_vitals_cls', metric));
```

指标类型：
- Counter：PV、错误次数。
- Gauge：当前在线人数、内存占用。
- Histogram：LCP 分布、API 耗时分布。

**三、链路（Traces）**

前端链路追踪：

```text
用户点击 -> 页面路由 -> 组件渲染 -> API 请求 -> BFF -> 微服务 A -> 微服务 B -> 数据库
```

实现方式：
- 使用 OpenTelemetry 或自研 SDK 在请求头中注入 `trace-id`、`span-id`。
- 前端作为链路的起点，生成 trace-id，贯穿整个请求链路。

```javascript
const traceId = generateTraceId();
fetch('/api/order', {
  headers: { 'x-trace-id': traceId },
});
```

最佳实践：
- 统一 Trace ID，便于前后端串联定位问题。
- 日志、指标、链路共享同一套用户/会话/请求上下文。
- 采样策略合理，避免全量采集导致性能和成本问题。

**评分维度**：
- 能解释三大支柱各自的定位（30%）
- 能说明前端日志采集方式（25%）
- 能说明前端指标采集方式（25%）
- 能说明链路追踪注入方式（20%）

**常见错误**：
- 把日志和指标混为一谈。
- 全量采集导致页面性能下降。
- 没有统一 trace-id，前后端问题无法串联。

**延伸追问**：
- 日志中如何平衡详细程度和隐私合规？
- 链路追踪的采样率如何设计？

**相关题目**：
- [FB-22-PE-A-013 前端性能基线建立和监控](#FB-22-PE-A-013)
- [FB-22-CO-P-022 监控告警体系设计](#FB-22-CO-P-022)

**参考资源**：
- [OpenTelemetry 官方文档](https://opentelemetry.io/docs/)
- [Google SRE - Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)

**口头回答版**：
> 可观测性三大支柱是日志、指标、链路。日志解决“发生了什么”，前端通过 window.onerror、onunhandledrejection 上报 JS 错误，还有业务点击日志和 API 日志。指标解决“发生得多频繁”，用 web-vitals 采集 LCP、INP、CLS，还有 PV、错误率这些。链路解决“请求经过了什么”，前端生成 trace-id，放到请求头里，贯穿到后端。三者要结合上下文，统一 trace-id，采样也要合理，不能影响性能。

---

### FB-22-SE-A-016：HTTPS/TLS 部署有哪些安全要点？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：22 部署与 SRE
**标签**：HTTPS、TLS、HSTS、证书、安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明生产环境部署 HTTPS/TLS 时需要注意的安全要点。

**参考答案**：

**一、证书管理**

1. **使用可信 CA 证书**：生产环境避免自签名证书。
2. **证书链完整**：配置中间证书，避免部分客户端无法验证。
3. **自动续期**：Let’s Encrypt 90 天有效期，需自动化续期和更新。
4. **证书监控**：提前 30 天告警即将过期。

**二、协议与加密套件**

1. **禁用不安全的 TLS 版本**：关闭 TLS 1.0/1.1，启用 TLS 1.2/1.3。
2. **禁用弱加密套件**：如 RC4、DES、MD5、SHA1。
3. **优先使用 ECDHE 密钥交换**：支持前向保密（Forward Secrecy）。

Nginx 配置示例：

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
ssl_prefer_server_ciphers off;
```

**三、HTTP 安全头**

1. **HSTS（HTTP Strict Transport Security）**：强制浏览器使用 HTTPS。
   ```http
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   ```
2. **CSP（Content Security Policy）**：限制资源加载来源，防御 XSS。
3. **X-Content-Type-Options: nosniff**：防止 MIME 嗅探。
4. **X-Frame-Options / frame-ancestors**：防止点击劫持。
5. **Referrer-Policy**：控制 Referrer 发送策略。

**四、混合内容处理**

- HTTPS 页面禁止加载 HTTP 资源。
- 配置 `upgrade-insecure-requests` 自动升级。
- 第三方资源必须使用 HTTPS 链接。

**五、密钥与私钥保护**

- 私钥不存入代码仓库。
- 使用 KMS/HSM 或云厂商证书托管服务。
- 限制服务器文件系统对私钥的访问权限。

最佳实践：
- 使用 SSL Labs 等工具定期扫描 TLS 配置。
- 开启 OCSP Stapling，减少证书校验时间。
- 对证书续期和配置变更做审计记录。

**评分维度**：
- 能说明证书管理和续期（25%）
- 能说明 TLS 版本和加密套件选择（25%）
- 能列出至少 4 个 HTTP 安全头（25%）
- 能提到混合内容和私钥保护（25%）

**常见错误**：
- 使用自签名证书或不完整的证书链。
- 保留 TLS 1.0/1.1 兼容性。
- 忽略 HSTS 导致中间人降级攻击。

**延伸追问**：
- 什么是前向保密（Forward Secrecy）？
- 如何检测和修复混合内容？

**相关题目**：
- [FB-22-CO-B-006 HTTPS/TLS 基础](#FB-22-CO-B-006)
- [FB-22-CO-B-007 DNS 解析流程](#FB-22-CO-B-007)

**参考资源**：
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [OWASP TLS Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)

**口头回答版**：
> HTTPS/TLS 部署要注意几点：证书要用可信 CA，链要完整，还要自动续期和监控过期；协议至少用 TLS 1.2/1.3，禁用弱加密套件；安全头要配 HSTS 强制 HTTPS、CSP 防 XSS、X-Content-Type-Options 防 MIME 嗅探；HTTPS 页面不能加载 HTTP 资源，第三方资源也要 HTTPS；私钥不能放代码库，要用 KMS 托管。定期用 SSL Labs 扫描配置。

---

## 深入题（8 道）{#proficient}

### FB-22-EN-P-017：如何用容器化方式部署前端应用？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：22 部署与 SRE
**标签**：Docker、容器化、Nginx、前端部署、镜像
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何用 Docker 容器化部署一个前端 SPA 应用，并讨论优化策略。

**参考答案**：

容器化部署前端应用通常采用 **Nginx 作为静态资源服务器** 的方式。

**一、Dockerfile 示例**

```dockerfile
# 阶段一：构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# 阶段二：运行
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

**二、Nginx 配置示例**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

**三、优化策略**

| 优化点 | 做法 |
|--------|------|
| 多阶段构建 | 构建和运行分离，减少镜像体积 |
| 依赖缓存 | 先复制 package.json 再 install，利用 Docker layer cache |
| 非 root 运行 | 使用 nginx 非特权镜像或自定义用户 |
| 健康检查 | 配置 `HEALTHCHECK` 检查服务可用性 |
| 安全扫描 | 使用 Trivy / Snyk 扫描镜像漏洞 |
| 资源压缩 | 开启 gzip/brotli，压缩静态资源 |

**四、部署流程**

```text
Docker 构建 -> 镜像仓库 -> K8s Deployment -> Service -> Ingress
```

最佳实践：
- 构建产物在镜像内，不依赖外部 CDN 也可运行。
- 环境变量通过 ConfigMap/Secret 注入，不在镜像中硬编码。
- 使用 distroless 或 alpine 基础镜像，减少攻击面。

**评分维度**：
- 能写出多阶段 Dockerfile（30%）
- 能写出适配 SPA 的 Nginx 配置（25%）
- 能列出至少 4 个优化策略（25%）
- 能说明镜像安全和环境变量注入（20%）

**常见错误**：
- 单阶段构建导致镜像体积过大。
- Nginx 没有配置 SPA 路由回退。
- 在镜像中硬编码 API 地址等环境变量。

**延伸追问**：
- 如何在容器启动后注入运行时配置？
- 多环境（dev/staging/prod）是否需要打多个镜像？

**相关题目**：
- [FB-22-EN-P-018 Kubernetes 基础与前端无状态服务部署](#FB-22-EN-P-018)
- [FB-22-EN-A-009 设计一个前端静态资源部署流程](#FB-22-EN-A-009)

**参考资源**：
- [Docker 官方最佳实践](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx 配置静态 SPA](https://nginx.org/en/docs/beginners_guide.html)

**口头回答版**：
> 前端容器化一般用 Nginx 跑静态资源。Dockerfile 分两阶段：第一阶段用 Node 镜像装依赖、构建；第二阶段用 Nginx 镜像，把构建产物拷进去，再配好 Nginx。Nginx 要配 try_files 回退到 index.html 支持 SPA 路由，静态资源长期缓存。优化方面用多阶段构建减少镜像体积、先复制 package.json 利用缓存、非 root 运行、加健康检查、用 Trivy 扫漏洞、开 gzip。环境变量不要硬编码，通过 K8s ConfigMap 注入。

---

### FB-22-EN-P-018：Kubernetes 基础与前端无状态服务部署

**题型**：工程化题 / 概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：22 部署与 SRE
**标签**：Kubernetes、K8s、Deployment、Service、Ingress
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Kubernetes 中 Deployment、Service、Ingress 的作用，并给出前端无状态服务部署的 YAML 示例。

**参考答案**：

Kubernetes 核心概念：

| 资源 | 作用 |
|------|------|
| **Pod** | K8s 最小调度单元，一个或多个容器组成 |
| **Deployment** | 管理 Pod 的声明式更新，支持滚动更新、回滚、扩缩容 |
| **Service** | 为 Pod 提供稳定的服务发现和负载均衡 |
| **Ingress** | 集群入口，基于域名/路径路由到不同 Service |

前端无状态服务 Deployment 示例：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-app
  labels:
    app: frontend-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend-app
  template:
    metadata:
      labels:
        app: frontend-app
    spec:
      containers:
        - name: frontend
          image: registry.example.com/frontend:v1.2.0
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "200m"
          livenessProbe:
            httpGet:
              path: /health
              port: 80
          readinessProbe:
            httpGet:
              path: /ready
              port: 80
```

Service 示例：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend-app
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

Ingress 示例：

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
```

前端无状态服务特点：

1. **不保存会话状态**：登录态放在 Cookie/Token，不依赖本地存储。
2. **水平扩展友好**：多副本之间无差异，可任意扩缩容。
3. **配置外部化**：API 地址、主题等通过 ConfigMap/Secret 注入。

最佳实践：
- 设置合理的 `resources.requests` 和 `limits`。
- 配置 liveness 和 readiness 探针。
- 使用 HPA（Horizontal Pod Autoscaler）根据 CPU/内存自动扩缩容。
- 镜像 tag 使用语义化版本，避免使用 `latest`。

**评分维度**：
- 能解释 Deployment/Service/Ingress 作用（30%）
- 能写出基本 Deployment YAML（30%）
- 能说明无状态服务特点（20%）
- 能提到探针、HPA、资源限制（20%）

**常见错误**：
- 把前端服务设计为有状态，导致无法水平扩展。
- 使用 `latest` 镜像 tag，无法追踪和回滚。
- 忽略 readiness 探针，新 Pod 未就绪就接收流量。

**延伸追问**：
- 如何实现前端应用的滚动更新和回滚？
- HPA 的扩缩容指标如何选择？

**相关题目**：
- [FB-22-EN-P-017 容器化部署前端应用](#FB-22-EN-P-017)
- [FB-22-PE-P-023 容量规划在前端场景的应用](#FB-22-PE-P-023)

**参考资源**：
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)

**口头回答版**：
> Kubernetes 里 Pod 是最小单元，Deployment 管 Pod 的创建、更新、回滚和扩缩容，Service 给 Pod 提供稳定的访问入口和负载均衡，Ingress 是集群入口，按域名路由。前端是无状态服务，Deployment 里跑 Nginx 容器，配 3 个副本，加上存活和就绪探针。Service 用 ClusterIP，Ingress 配域名和 SSL。前端不要保存会话状态，配置用 ConfigMap 注入，镜像 tag 用版本号别用 latest，可以用 HPA 自动扩容。

---

### FB-22-SC-P-019：Serverless 与边缘部署如何落地前端 SSR/SSG？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：22 部署与 SRE
**标签**：Serverless、Edge、SSR、SSG、Vercel、Cloudflare
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 Serverless 和边缘计算平台如何托管前端 SSR/SSG 应用，并对比其优缺点。

**参考答案**：

**一、SSG（Static Site Generation）托管**

SSG 产物是纯静态文件，天然适合 Serverless 对象存储 + CDN：

```text
Next.js export / Astro build / VitePress build
   │
   ▼
上传到 Vercel / Netlify / Cloudflare Pages / 阿里云 OSS + CDN
   │
   ▼
边缘节点直接返回静态 HTML
```

优势：
- 成本低，按流量计费。
- 全球 CDN 加速。
- 无需维护服务器。

**二、SSR（Server-Side Rendering）托管**

SSR 需要运行时执行渲染逻辑，Serverless Function 或 Edge Function 承担：

```text
用户请求 -> Edge Function / Serverless Function -> 渲染页面 -> 返回 HTML
```

主流平台：

| 平台 | SSR 方式 | 特点 |
|------|---------|------|
| Vercel | Serverless Function + Edge Function | Next.js 原生支持，开发体验好 |
| Netlify | Edge Functions | 基于 Deno，延迟低 |
| Cloudflare Pages | Cloudflare Workers | 全球边缘节点，冷启动极低 |
| AWS | Lambda@Edge / CloudFront Functions | 与 AWS 生态集成 |
| 阿里云 | 函数计算 FC | 国内节点，合规 |

**三、边缘计算的优势**

1. **就近执行**：代码在全球边缘节点运行，降低 TTFB。
2. **冷启动低**：Edge Function 通常比传统 Serverless Function 启动更快。
3. **动态个性化**：在边缘根据用户地理位置、语言、Cookie 返回不同内容。

边缘中间件示例（Next.js）：

```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const country = request.geo?.country || 'US';
  if (country === 'CN') {
    return NextResponse.rewrite(new URL('/zh-CN', request.url));
  }
}
```

**四、注意事项**

- **冷启动**：传统 Serverless Function 首次调用有延迟。
- **运行时限制**：函数执行时间、内存、包大小有限制。
- **状态管理**：避免在函数内存中保存状态。
- **调试复杂度**：本地与云端环境差异可能带来问题。
- **供应商锁定**：不同平台 API 差异大，迁移成本高。

最佳实践：
- 静态页面用 SSG，动态页面用 SSR/ISR。
- 使用 ISR（Incremental Static Regeneration）平衡实时性和性能。
- 边缘侧做轻量逻辑，重逻辑放到后端服务。

**评分维度**：
- 能区分 SSG 和 SSR 的托管方式（25%）
- 能列举主流 Serverless/Edge 平台及特点（25%）
- 能说明边缘计算优势（25%）
- 能讨论冷启动、运行时限制、供应商锁定（25%）

**常见错误**：
- 所有页面都用 SSR，忽略 SSG 的成本优势。
- 在 Edge Function 里执行重逻辑或长时间任务。
- 忽略不同平台运行时差异。

**延伸追问**：
- ISR 和 SSR 如何选择？
- 边缘函数中如何访问数据库？

**相关题目**：
- [FB-22-SD-R-031 SSR/SSG/CDN 混合部署架构](#FB-22-SD-R-031)
- [FB-22-SD-R-026 全球化多区域部署架构](#FB-22-SD-R-026)

**参考资源**：
- [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Next.js ISR 文档](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

**口头回答版**：
> SSG 产物是纯静态文件，直接传到 Vercel、Netlify、Cloudflare Pages 或 OSS+CDN，成本低、速度快。SSR 需要运行时渲染，由 Serverless Function 或 Edge Function 执行。边缘计算比如 Cloudflare Workers、Vercel Edge Function 是在离用户近的节点运行，TTFB 很低，还能根据地理位置、语言做动态内容。但要注意冷启动、运行时限制、不能保存状态、供应商锁定这些问题。最佳实践是静态用 SSG，动态用 SSR 或 ISR，边缘只做轻量逻辑。

---

### FB-22-SC-P-020：大规模前端缓存失效策略有哪些？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：22 部署与 SRE
**标签**：缓存失效、CDN、版本化、Cache Busting
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在大型前端应用中，静态资源分布在全球 CDN 上，如何设计缓存失效策略以保证用户及时获取最新版本？

**参考答案**：

缓存失效是前端部署中最常见也最容易出错的问题。核心策略是：**不直接失效缓存，而是通过版本化避免缓存冲突**。

**一、首选策略：文件名内容 hash**

```text
old: app.a1b2c3.js
new: app.d4e5f6.js
```

- 文件内容变化，URL 变化，浏览器和 CDN 都会重新加载。
- 旧版本资源可保留一段时间，支持回滚。

**二、HTML 作为版本入口**

```html
<!-- 每次发布生成新的资源引用 -->
<script src="https://cdn.example.com/app.d4e5f6.js"></script>
```

- HTML 设置 `Cache-Control: no-cache` 或较短 max-age。
- 用户每次访问获取最新 HTML，HTML 中指向最新资源。

**三、CDN 刷新/预热**

| 方式 | 适用场景 | 注意 |
|------|---------|------|
| URL 刷新 | 单个文件更新 | 有 API 限频 |
| 目录刷新 | 整个版本目录 | 可能影响命中 |
| 全站刷新 | 紧急回滚 | 慎用，源站压力大 |
| 预热 | 大版本发布前 | 提前推送到边缘节点 |

**四、版本目录隔离**

```text
https://cdn.example.com/app/v1.0.0/assets/
https://cdn.example.com/app/v1.1.0/assets/
```

- 切换版本只需改 HTML 的回源路径或根目录。
- 支持多版本并行和快速回滚。

**五、动态配置与 Feature Flag**

- 通过配置中心控制资源加载路径，秒级切换版本。
- 适合灰度发布和紧急回滚。

```javascript
const assetBase = config.cdnBase; // v1.0.0 或 v1.1.0
loadScript(`${assetBase}/app.js`);
```

**六、缓存失效的兜底**

- 保留最近 N 个版本的资源，避免回滚时旧资源已被清理。
- 关键页面提供“强制刷新”入口或带版本号的 URL。
- 监控缓存命中率和用户反馈，及时发现缓存问题。

最佳实践：
- 静态资源长期缓存，HTML 短期缓存。
- 发布流程集成 CDN 刷新 API，但不要把刷新作为主要更新手段。
- 建立缓存命中率和版本一致性监控。

**评分维度**：
- 能说明 hash 命名是最佳实践（25%）
- 能解释 HTML 作为版本入口的策略（25%）
- 能列出 CDN 刷新/预热方式（20%）
- 能讨论版本目录隔离和 Feature Flag（20%）
- 能提到缓存监控和兜底（10%）

**常见错误**：
- 依赖 CDN 刷新作为常规更新手段。
- 静态资源文件名不带 hash。
- HTML 长期缓存导致用户无法获取新版本。

**延伸追问**：
- 如果 CDN 刷新失败，如何保障用户访问？
- 如何处理第三方 SDK 或 iframe 的缓存？

**相关题目**：
- [FB-22-CO-B-004 HTTP 缓存与 CDN 缓存刷新](#FB-22-CO-B-004)
- [FB-22-EN-A-012 前端如何实现自动回滚](#FB-22-EN-A-012)

**参考资源**：
- [Web.dev - Cache busting](https://web.dev/articles/caching)
- [High Performance Browser Networking - Caching](https://hpbn.co/cache/)

**口头回答版**：
> 大规模前端缓存失效最好是不要依赖刷新，而是做版本化。静态资源文件名加内容 hash，内容变了 URL 就变，自然绕过缓存。HTML 作为入口，设置短缓存，里面引用最新的资源。还可以按版本号建目录，比如 v1.0.0、v1.1.0，切换版本时改 HTML 回源路径。CDN 刷新和预热作为兜底，发布前预热、发布后刷新 HTML 路径。保留最近几个版本资源，方便回滚。不要长期缓存 HTML，也不要只靠 CDN 刷新来更新。

---

### FB-22-CP-P-021：Incident Response 流程与 Runbook 如何落地？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：22 部署与 SRE
**标签**：Incident Response、Runbook、On-call、故障处理
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个前端团队的 Incident Response 流程，并说明 Runbook 应包含哪些内容。

**参考答案**：

**一、Incident Response 流程**

```text
发现告警 -> 响应确认 -> 止损 -> 定位根因 -> 修复 -> 验证 -> 复盘 -> 改进
```

1. **发现（Detect）**：
   - 监控告警（错误率、性能、业务指标）。
   - 用户反馈、客服工单。
   - 自动化测试失败。

2. **响应（Respond）**：
   - On-call 工程师确认事件，评估影响范围。
   - 建立战争房间（War Room），召集相关人。

3. **止损（Mitigate）**：
   - 优先恢复服务，而非定位根因。
   - 常用手段：回滚、降级、限流、关闭 Feature Flag。

4. **定位（Diagnose）**：
   - 通过日志、指标、链路追踪定位根因。
   - 对比异常前后变化：代码发布、配置变更、依赖更新、流量峰值。

5. **修复（Fix）**：
   - 修复代码或配置，重新发布。

6. **验证（Verify）**：
   - 确认核心指标恢复正常。
   - 进行 smoke test 或 E2E 验证。

7. **复盘（Postmortem）**：
   - 记录事件时间线、根因、影响、修复过程。
   - 制定 Action Items，避免重复发生。

**二、Runbook 内容**

Runbook 是标准化的故障处理手册，应包含：

| 模块 | 内容 |
|------|------|
| 服务信息 | 负责人、依赖服务、架构图、关键入口 |
| 常见告警 | 告警含义、判断方法、处理步骤 |
| 回滚操作 | 版本切换命令、CDN 刷新、配置回退 |
| 降级方案 | 关闭哪些 Feature Flag、切换到哪个降级页面 |
| 排查命令 | 查看日志、查询指标、Trace 搜索语句 |
| 升级路径 | 何时升级给 TL/架构师/管理层 |
| 沟通模板 | 内部通知、用户公告文案 |

示例（JS 错误率飙升）：

```markdown
## JS 错误率飙升
1. 查看 Sentry/监控平台，确认错误类型和趋势。
2. 对比最近 30 分钟内的发布/配置变更。
3. 如确认是新版本引入，执行回滚到上一个稳定版本。
4. 刷新 CDN 缓存，验证错误率下降。
5. 通知战争房间成员，记录事件时间线。
```

最佳实践：
- Runbook 定期演练，确保可操作性。
- 故障处理追求“快速止损”，不追求完美根因。
- 复盘无责备文化（Blameless Postmortem）。

**评分维度**：
- 能设计完整 Incident Response 流程（30%）
- 能说明 Runbook 关键模块（30%）
- 能强调止损优先于定位根因（20%）
- 能提到无责备复盘和 Action Items（20%）

**常见错误**：
- 故障时先慢慢查日志，不及时止损。
- Runbook 写成理论文档，缺少可执行命令。
- 复盘追责，导致团队隐瞒问题。

**延伸追问**：
- 如何在不影响用户的情况下进行故障演练？
- 如何衡量 On-call 体验和响应效率？

**相关题目**：
- [FB-22-CO-P-022 监控告警体系设计](#FB-22-CO-P-022)
- [FB-22-CP-R-028 SRE 文化在前端团队落地](#FB-22-CP-R-028)

**参考资源**：
- [Google SRE - Incident Management](https://sre.google/sre-book/managing-incidents/)
- [PagerDuty Incident Response Guide](https://response.pagerduty.com/)

**口头回答版**：
> Incident Response 流程一般是：发现告警、响应确认、先止损、再定位根因、修复、验证、复盘。关键是止损优先，先 rollback 或关 Feature Flag 让用户恢复，再慢慢查原因。Runbook 是标准化手册，要包含服务信息、常见告警怎么处理、回滚命令、降级方案、排查命令、升级路径、沟通模板。Runbook 要定期演练，复盘要无责备，重在改进而不是追责。

---

### FB-22-CO-P-022：如何设计前端监控告警体系？

**题型**：概念题 / 系统设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：22 部署与 SRE
**标签**：监控、告警、降噪、阈值、SLO
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请从指标选择、阈值设定、告警降噪、升级策略等方面，设计一个前端监控告警体系。

**参考答案**：

**一、监控指标分层**

| 层级 | 指标示例 | 用途 |
|------|---------|------|
| 用户体验层 | LCP、INP、CLS、白屏率 | 反映真实用户体验 |
| 应用质量层 | JS 错误率、API 成功率、Promise 未捕获异常 | 反映前端代码健康度 |
| 业务指标层 | 转化率、支付成功率、核心流程完成率 | 反映业务影响 |
| 基础设施层 | CDN 命中率、5xx 比例、TTFB | 反映网络和 CDN 状态 |

**二、阈值设定策略**

1. **固定阈值**：
   - JS 错误率 > 1%。
   - LCP P75 > 2.5s。

2. **动态阈值/基线偏离**：
   - 当前值较过去 7 天均值偏离超过 3 个标准差。
   - 环比上升超过 20%。

3. **SLO 预算消耗**：
   - 本周错误预算已消耗 50%，触发预警。
   - 本周错误预算已消耗 100%，触发 P0 告警。

**三、告警降噪**

1. **合并相似告警**：同一问题在 5 分钟内只发一条。
2. **抑制依赖告警**：上游服务故障时，下游告警被抑制。
3. **分级通知**：
   - P0：电话 + 短信 + 企业微信。
   - P1：企业微信 + 邮件。
   - P2：邮件 + 工单。
4. **告警收敛**：
   - 持续异常才告警，瞬时抖动不告警。
   - 使用告警窗口和持续时长条件。

**四、升级策略**

```text
P0 告警 -> On-call 5 分钟内响应
          -> 15 分钟未处理 -> 升级到 TL
          -> 30 分钟未处理 -> 升级到总监
```

**五、告警闭环**

```text
告警触发 -> 通知 On-call -> 处理 -> 记录处理结果 -> 复盘 -> 优化阈值/代码
```

最佳实践：
- 告警要有可操作的信息：哪个服务、哪个版本、哪个指标、影响范围。
- 避免告警疲劳，定期清理无效告警。
- 每个告警都对应一个 Runbook。
- 告警处理结果纳入复盘和 Action Items。

**评分维度**：
- 能按分层选择监控指标（25%）
- 能说明固定/动态/SLO 三种阈值策略（25%）
- 能列出告警降噪手段（25%）
- 能设计升级策略和告警闭环（25%）

**常见错误**：
- 告警阈值过低，导致告警风暴。
- 只监控服务器指标，不监控用户体验指标。
- 告警发出后没有处理跟踪和复盘。

**延伸追问**：
- 如何防止监控 SDK 自身影响页面性能？
- 如何处理前端监控中的大量噪声数据？

**相关题目**：
- [FB-22-CO-A-015 可观测性三大支柱](#FB-22-CO-A-015)
- [FB-22-PE-A-013 前端性能基线建立和监控](#FB-22-PE-A-013)

**参考资源**：
- [Google SRE - Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)
- [Datadog Alerting Best Practices](https://www.datadoghq.com/blog/monitoring-101-alerting/)

**口头回答版**：
> 前端监控告警要分四层：用户体验层看 LCP、INP、CLS、白屏率；应用质量层看 JS 错误率、API 成功率；业务层看转化率、支付成功率；基础设施层看 CDN 命中率、5xx。阈值可以固定，比如错误率大于 1%；也可以动态，比如比上周同期涨 20%；还可以基于 SLO 错误预算。告警要降噪：合并相似告警、抑制依赖告警、分级通知、持续异常才告警。升级策略要明确，比如 P0 5 分钟不处理升 TL，30 分钟升总监。每个告警都要有 Runbook，处理完要复盘优化。

---

### FB-22-PE-P-023：容量规划在前端场景如何应用？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：22 部署与 SRE
**标签**：容量规划、负载、CDN、带宽、扩容
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明容量规划在前端部署和 SRE 中的意义，并给出前端场景下的容量评估方法。

**参考答案**：

容量规划（Capacity Planning）是指根据业务增长预期和性能基线，提前评估并准备足够的计算、存储、网络资源，以保障系统在峰值流量下稳定运行。

前端场景下容量规划的关注点：

1. **CDN 带宽**：
   - 评估日均/峰值流量、文件大小、命中率。
   - 预留 2-3 倍峰值带宽应对突发流量。

2. **边缘请求数**：
   - 每用户平均请求资源数 × DAU × 峰值系数。

3. **源站压力**：
   - CDN 回源率越低，源站压力越小。
   - 评估回源带宽和源站 QPS。

4. **构建与部署资源**：
   - CI/CD 并发构建数、构建时长、产物存储空间。

5. **Serverless/Function 并发**：
   - SSR/Edge Function 的并发限制和冷启动资源。

容量评估方法：

```text
峰值 DAU = 日活 × 峰值系数（通常 2-5 倍）
峰值带宽 = 峰值 DAU × 人均页面浏览量 × 人均资源大小 × 同时在线系数
CDN 请求数 = 峰值 DAU × 人均请求数
```

示例：

```text
日活 100 万，峰值系数 3，人均 PV 10，每页资源 2MB
峰值带宽 ≈ 100万 × 3 × 10 × 2MB = 60TB/天 ≈ 5.5Gbps（按 12 小时高峰折算）
```

应对措施：

1. **水平扩展**：增加 CDN 节点、增加 K8s Pod 副本。
2. **垂直扩展**：提升单机带宽、CPU、内存。
3. **缓存优化**：提高 CDN 命中率，减少回源。
4. **资源压缩**：Brotli、图片转 WebP/AVIF、代码分割。
5. **限流降级**：极端情况下关闭非核心功能。

最佳实践：
- 建立容量基线，定期复盘和预测。
- 大促/活动前进行压测和容量演练。
- 与业务、运维、后端团队协同制定容量计划。

**评分维度**：
- 能解释容量规划意义（20%）
- 能列出前端容量关注点（30%）
- 能进行简单容量估算（25%）
- 能提出扩展和优化措施（25%）

**常见错误**：
- 只按平均值规划，忽略峰值。
- 忽略 CDN 回源压力和源站容量。
- 容量规划只考虑服务器，不关注构建资源。

**延伸追问**：
- 如何做前端 CDN 的压测？
- 大促期间如何快速扩容 CDN？

**相关题目**：
- [FB-22-PE-A-013 前端性能基线建立和监控](#FB-22-PE-A-013)
- [FB-22-SD-R-025 设计高可用前端部署平台](#FB-22-SD-R-025)

**参考资源**：
- [Google SRE - Capacity Planning](https://sre.google/sre-book/planning-and-managing-capacity/)
- [AWS Well-Architected - Performance Efficiency](https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html)

**口头回答版**：
> 容量规划就是提前算好需要多少资源应对流量。前端主要关注 CDN 带宽、边缘请求数、源站回源压力、构建资源、Serverless 并发。评估时用峰值 DAU 乘人均 PV、资源大小来算带宽和请求数。要预留几倍峰值余量。应对方法包括加 CDN 节点、提高缓存命中率、资源压缩、K8s 水平扩容、限流降级。大促前要做压测和演练，不能只按平均值算。

---

### FB-22-EN-P-024：前端 Monorepo 多包部署策略

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：22 部署与 SRE
**标签**：Monorepo、多包部署、Changesets、CI/CD
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在一个前端 Monorepo 中，多个应用和组件库共存，如何设计合理的部署策略？

**参考答案**：

Monorepo 部署的核心挑战：

1. **依赖关系复杂**：应用依赖组件库、工具包，变更可能级联影响。
2. **构建范围不确定**：全部构建耗时长，只构建变更包可能遗漏依赖。
3. **版本管理困难**：多包版本独立或统一，如何选择？
4. **发布协调**：多个应用同一天发布，如何降低风险？

部署策略：

**一、变更检测与受影响分析**

```text
git diff -> 识别变更包 -> 分析依赖图 -> 确定需要构建/测试/发布的包
```

工具：
- Nx：`nx affected` 自动分析受影响项目。
- Turborepo：`turbo run build --filter=[HEAD^1]`。
- Rush / pnpm workspace。

**二、独立部署**

- 每个应用独立 CI/CD pipeline。
- 组件库变更后，只构建和发布被影响的应用。
- 适合应用之间耦合低的场景。

**三、统一版本与 Changesets**

```text
变更 -> Changeset 记录 -> Version PR -> 发布 -> 更新依赖
```

- 使用 Changesets 管理多包版本和 changelog。
- 发布时自动更新依赖关系，生成版本 PR。

**四、依赖版本策略**

| 策略 | 说明 | 适用 |
|------|------|------|
| 固定版本 | 应用依赖组件库 exact 版本 | 强调 reproducible build |
| 波浪号/插入号 | 允许小版本和补丁更新 | 组件库频繁发 patch |
| workspace 协议 | 本地开发用 workspace，发布时替换 | pnpm / Yarn Berry |

**五、部署流程示例**

```text
PR 阶段：
  affected lint/test/build

合并后：
  生成 Changeset -> Version PR -> 发布 npm -> 触发应用构建

应用发布：
  构建 -> 部署到预发 -> E2E -> 灰度 -> 全量
```

最佳实践：
- 明确包之间的依赖边界，避免循环依赖。
- 使用 lockfile 保证构建可复现。
- 组件库发布要有独立的测试和文档。
- 大版本变更提前制定协调计划。

**评分维度**：
- 能识别 Monorepo 部署挑战（25%）
- 能说明变更检测和 affected 构建（25%）
- 能说明 Changesets 版本管理（25%）
- 能给出完整部署流程（25%）

**常见错误**：
- 每次构建都构建整个 Monorepo。
- 组件库和应用版本混乱，依赖关系不清晰。
- 忽略 lockfile，导致不同环境构建结果不一致。

**延伸追问**：
- 如何处理 Monorepo 中跨包的循环依赖？
- 组件库 Breaking Change 如何协调多应用升级？

**相关题目**：
- [FB-22-EN-A-009 设计一个前端静态资源部署流程](#FB-22-EN-A-009)
- [FB-22-EN-P-017 容器化部署前端应用](#FB-22-EN-P-017)

**参考资源**：
- [Turborepo 官方文档](https://turbo.build/repo/docs)
- [Changesets 官方文档](https://github.com/changesets/changesets)

**口头回答版**：
> Monorepo 部署难点是依赖复杂、构建范围、版本管理、发布协调。我一般用 affected 分析工具比如 Nx 或 Turborepo，只构建受影响的包。版本管理用 Changesets，记录变更、生成 Version PR、自动发布 npm、更新依赖。每个应用有独立 pipeline，组件库变更后触发受影响应用构建。依赖用 workspace 协议本地开发，发布时换成具体版本。还要注意 lockfile、避免循环依赖、组件库独立测试和文档。

---

## 架构题（47 道）{#architect}

### FB-22-SD-R-025：设计一个高可用的前端部署平台

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：22 部署与 SRE
**标签**：高可用、部署平台、CI/CD、多活、架构设计
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个面向中大型前端团队的高可用部署平台，支持多应用、多环境、灰度发布、回滚、监控。

**参考答案**：

**一、整体架构**

```text
                    ┌─────────────────┐
                    │   开发者门户    │
                    │  （发布平台 UI） │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
   ┌─────────┐        ┌─────────────┐      ┌──────────┐
   │ CI 系统  │        │  发布编排服务 │      │ 监控中心  │
   │ GitHub  │        │  （蓝绿/金丝雀）│     │ Grafana  │
   │ Actions │        └──────┬──────┘       └──────────┘
   └────┬────┘               │
        │                    ▼
        │           ┌─────────────────┐
        │           │   部署执行器     │
        │           │ （CDN/OSS/K8s）  │
        │           └────────┬────────┘
        │                    │
        ▼                    ▼
   ┌──────────────────────────────────────┐
   │         多区域 CDN / 边缘节点          │
   └──────────────────────────────────────┘
```

**二、核心模块设计**

1. **开发者门户**：
   - 应用列表、发布历史、回滚入口、审批流。
   - 可视化灰度进度和监控指标。

2. **CI 系统**：
   - 与 Git 集成，支持分支策略（GitFlow / Trunk Based）。
   - 标准化构建流程：lint -> test -> build -> scan。

3. **发布编排服务**：
   - 管理发布策略：滚动、蓝绿、金丝雀、A/B 测试。
   - 与配置中心、Feature Flag 平台联动。
   - 支持发布审批、定时发布、紧急回滚。

4. **部署执行器**：
   - 适配多种目标：阿里云 OSS、AWS S3、Kubernetes、Vercel。
   - 原子化部署，失败自动回滚。

5. **监控中心**：
   - 实时采集错误率、性能、业务指标。
   - 发布期间自动对比基线，异常触发告警或自动回滚。

**三、高可用设计**

1. **多区域部署**：
   - CDN 覆盖多个区域，源站多可用区部署。
   - 某区域故障时，DNS 切流到健康区域。

2. **无状态服务**：
   - 发布平台本身无状态，可多副本部署。
   - 数据持久化到数据库和对象存储。

3. **幂等部署**：
   - 同一版本重复部署结果一致。
   - 部署操作可审计、可追踪。

4. **熔断与限流**：
   - 发布 API 限流，防止误操作。
   - 关键操作需要二次确认和审批。

**四、灰度与回滚**

- 支持流量比例、用户维度、地域维度灰度。
- 自动回滚条件：错误率、性能指标、业务指标异常。
- 保留最近 N 个版本，支持一键回滚。

最佳实践：
- 平台自身也要按 SLO 管理，保证高可用。
- 所有发布操作记录审计日志。
- 提供开放 API，方便其他系统集成。

**评分维度**：
- 能画出整体架构（25%）
- 能说明核心模块职责（25%）
- 能说明高可用设计要点（25%）
- 能说明灰度、回滚、监控闭环（25%）

**常见错误**：
- 平台自身设计为单点。
- 只支持一种部署目标，扩展性差。
- 忽略审批和审计。

**延伸追问**：
- 如何支持异构前端框架（React/Vue/Angular）的部署？
- 平台出现故障时如何不影响线上发布？

**相关题目**：
- [FB-22-SC-A-011 金丝雀发布前端方案](#FB-22-SC-A-011)
- [FB-22-SD-R-027 零停机前端发布架构](#FB-22-SD-R-027)

**参考资源**：
- [Spinnaker 架构](https://spinnaker.io/docs/reference/architecture/)
- [Argo CD 官方文档](https://argo-cd.readthedocs.io/)

**口头回答版**：
> 高可用前端部署平台可以分成几层：开发者门户负责发布界面和审批；CI 系统做代码检查、测试、构建；发布编排服务管理蓝绿、金丝雀、A/B 策略；部署执行器负责把产物发到 OSS、CDN 或 K8s；监控中心实时看错误率和性能。高可用方面，平台本身无状态多副本，数据持久化；CDN 多区域，源站多可用区；部署要幂等、可审计；发布操作要限流、二次确认。灰度支持按比例、用户、地域，异常自动回滚，保留多个历史版本。

---

### FB-22-SD-R-026：设计全球化多区域部署架构

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：22 部署与 SRE
**标签**：全球化、多区域、CDN、DNS、边缘节点
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
假设你的前端应用需要服务全球用户，请设计一个多区域部署架构，保证低延迟和高可用。

**参考答案**：

**一、架构目标**

1. **低延迟**：用户就近访问边缘节点。
2. **高可用**：单区域故障不影响全球服务。
3. **合规**：数据不出境、内容合规。
4. **一致性**：不同区域用户看到一致的应用版本。

**二、整体架构**

```text
                        ┌─────────────┐
                        │   全局 DNS   │
                        │  GeoDNS/Anycast│
                        └──────┬──────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
  ┌─────────┐            ┌─────────┐            ┌─────────┐
  │ 亚太区域 │            │ 美洲区域 │            │ 欧洲区域 │
  │ CDN PoP │            │ CDN PoP │            │ CDN PoP │
  └────┬────┘            └────┬────┘            └────┬────┘
       │                       │                       │
  ┌────┴────┐            ┌────┴────┐            ┌────┴────┐
  │ 源站集群 │            │ 源站集群 │            │ 源站集群 │
  │ K8s/OSS │            │ K8s/OSS │            │ K8s/OSS │
  └─────────┘            └─────────┘            └─────────┘
```

**三、关键技术**

1. **GeoDNS / Anycast**：
   - 根据用户地理位置返回最近 CDN PoP 的 IP。
   - 某区域故障时，DNS 可切流到备用区域。

2. **全球 CDN**：
   - 静态资源缓存到全球边缘节点。
   - 使用 Cloudflare、Akamai、阿里云 DCDN、AWS CloudFront 等。

3. **区域源站**：
   - 在主要区域部署源站集群，减少跨境回源。
   - 源站之间同步版本配置。

4. **边缘计算**：
   - 在边缘节点执行 SSR、A/B 分流、Geo 路由。

**四、数据与合规**

1. **配置同步**：
   - 使用全局配置中心，保证各区域应用版本一致。
   - 配置变更后推送到各区域 CDN。

2. **数据合规**：
   - 敏感数据存储在本地，不跨境传输。
   - 边缘节点遵守当地法律法规。

3. **内容本地化**：
   - 根据用户语言/地区返回不同文案和主题。
   - 边缘函数做 Geo 和语言判断。

**五、容灾设计**

| 故障场景 | 应对 |
|---------|------|
| 单 CDN 节点故障 | 自动切到其他节点 |
| 单区域源站故障 | DNS 切流到其他区域源站 |
| 跨境网络中断 | 区域内自治，必要时降级为静态页面 |
| 配置中心故障 | 本地缓存配置，保证基础服务 |

最佳实践：
- 版本发布全球同步，避免区域版本不一致。
- 监控各区域可用性和延迟。
- 定期进行区域级容灾演练。

**评分维度**：
- 能说明多区域架构目标（20%）
- 能设计 GeoDNS + CDN + 区域源站架构（30%）
- 能说明数据同步和合规（20%）
- 能讨论容灾和故障切换（20%）
- 能提到边缘计算应用（10%）

**常见错误**：
- 所有流量回源到单一区域。
- 忽略数据合规和本地化。
- 不同区域版本不一致导致用户体验差异。

**延伸追问**：
- 如何测试多区域部署的容灾能力？
- 边缘 SSR 在合规方面有哪些风险？

**相关题目**：
- [FB-22-CO-B-007 DNS 解析流程](#FB-22-CO-B-007)
- [FB-22-SC-P-019 Serverless 与边缘部署](#FB-22-SC-P-019)

**参考资源**：
- [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)
- [Cloudflare Global Network](https://www.cloudflare.com/network/)

**口头回答版**：
> 全球化部署目标是低延迟、高可用、合规、版本一致。架构上用 GeoDNS 或 Anycast 把用户导到最近 CDN 节点，CDN 后面是分布在亚太、美洲、欧洲等区域的源站集群。边缘节点做静态缓存和轻量 SSR。配置要全球同步，保证版本一致；敏感数据要合规，不跨境。容灾方面，单节点故障自动切，单区域故障 DNS 切流，跨境断了可以区域内自治。还要定期做容灾演练。

---

### FB-22-SD-R-027：设计零停机前端发布架构

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：22 部署与 SRE
**标签**：零停机、蓝绿、金丝雀、滚动部署、发布架构
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个零停机的前端发布架构，支持日常发布、灰度发布和紧急回滚。

**参考答案**：

**一、设计原则**

1. **版本隔离**：每个版本的静态资源独立存储，互不覆盖。
2. **入口控制**：通过 HTML/网关控制用户访问哪个版本。
3. **流量可切换**：支持比例、用户、地域维度切换。
4. **快速回滚**：异常时可秒级切回旧版本。

**二、架构设计**

```text
用户请求
   │
   ▼
DNS / CDN / 负载均衡
   │
   ▼
版本路由层（API Gateway / Edge Function）
   │
   ├── v1.0.0（当前线上）
   │      └── /release/v1.0.0/index.html + assets
   │
   └── v1.1.0（新版本）
          └── /release/v1.1.0/index.html + assets
```

**三、静态资源版本化**

```text
/release/
  v1.0.0/
    index.html
    assets/
      app.a1b2c3.js
      main.x9y8z7.css
  v1.1.0/
    index.html
    assets/
      app.d4e5f6.js
      main.q1w2e3.css
```

- 资源文件名带 hash。
- HTML 中引用同版本目录下的资源，避免版本错乱。

**四、版本路由层实现**

1. **Edge Function**：
   ```javascript
   export default function handler(request) {
     const userId = getUserId(request);
     const version = canaryRouter.getVersion(userId); // v1.0.0 or v1.1.0
     return fetch(`${CDN_BASE}/release/${version}/index.html`);
   }
   ```

2. **Nginx map 模块**：
   ```nginx
   map $cookie_version $release_version {
     default "v1.0.0";
     ~^v1.1.0$ "v1.1.0";
   }
   ```

3. **Feature Flag 平台**：
   - 根据用户属性动态返回版本号。
   - 支持灰度比例调整和一键全量/回滚。

**五、发布流程**

```text
1. 构建 v1.1.0，上传到 /release/v1.1.0/
2. 预热 CDN
3. 内部验证通过
4. 灰度 5% -> 20% -> 50% -> 100%
5. 观察指标，异常时切回 v1.0.0
6. 稳定后保留 v1.0.0 一段时间，再清理旧版本
```

**六、回滚设计**

- **秒级回滚**：修改路由层配置，让所有用户回到 v1.0.0。
- **自动回滚**：监控指标异常时自动切换。
- **保留旧资源**：回滚时旧版本资源仍然存在，避免 404。

最佳实践：
- 版本切换不依赖 CDN 刷新，避免刷新延迟。
- 发布期间核心页面做 smoke test。
- 旧版本至少保留 2-3 个发布周期。

**评分维度**：
- 能说明零停机发布原则（20%）
- 能设计版本隔离和入口控制架构（30%）
- 能说明路由层实现方式（25%）
- 能说明灰度流程和回滚设计（25%）

**常见错误**：
- 新版本覆盖旧版本文件，导致无法回滚。
- 依赖 CDN 刷新实现版本切换。
- 回滚时旧资源已被清理。

**延伸追问**：
- 如何处理前后端版本不一致？
- 多个微前端子应用如何协同零停机发布？

**相关题目**：
- [FB-22-SC-A-010 蓝绿部署在前端的实现与风险](#FB-22-SC-A-010)
- [FB-22-SC-A-011 金丝雀发布前端方案](#FB-22-SC-A-011)

**参考资源**：
- [Netflix Tech Blog - Deployment](https://netflixtechblog.com/tagged/deployment)
- [Vercel Edge Middleware](https://vercel.com/docs/functions/edge-middleware)

**口头回答版**：
> 零停机发布核心是版本隔离、入口控制、流量可切换、快速回滚。每个版本的静态资源放在独立目录，文件名带 hash。用户请求先到版本路由层，可以用 Edge Function、Nginx 或 Feature Flag 平台决定返回哪个版本的 HTML。发布时先上传新版本、预热、内部验证，然后按比例灰度，有问题秒级切回旧版本。旧版本资源要保留一段时间。版本切换不依赖 CDN 刷新，避免刷新延迟。

---

### FB-22-CP-R-028：SRE 文化如何在前端团队落地？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：22 部署与 SRE
**标签**：SRE、文化、稳定性、On-call、Error Budget
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请结合前端团队特点，说明如何落地 SRE 文化，包括组织、流程、工具等方面。

**参考答案**：

SRE（Site Reliability Engineering）是用软件工程方法解决运维问题，核心目标是保证系统可靠性，同时支持快速迭代。

**一、组织层面**

1. **明确角色职责**：
   - 前端 SRE 负责部署平台、可观测性、发布流程、稳定性体系。
   - 不替代运维，而是与开发、运维、测试协作。

2. **建立 On-call 机制**：
   - 前端团队轮流值班，处理线上问题。
   - 值班要有 Runbook、升级路径和补偿机制。

3. **跨职能协作**：
   - 与后端、运维共建监控、链路、容量体系。
   - 定期同步 SLO 和故障复盘。

**二、流程层面**

1. **定义 SLO**：
   - 每个核心前端应用定义 3-5 个 SLI/SLO。
   - 例如：首页 LCP P75 < 2.5s，JS 错误率 < 0.1%。

2. **错误预算管理**：
   - 每月允许一定比例的失败/慢请求。
   - 错误预算耗尽时，暂停非必要发布，优先稳定性。

3. **发布管控**：
   - 强制灰度发布、自动回滚、发布窗口。
   - 核心变更需要审批和演练。

4. **无责备复盘**：
   - 故障后写 Postmortem，分析根因和 Action Items。
   - 不追责个人，重在系统和流程改进。

**三、工具层面**

1. **可观测性平台**：
   - 统一日志、指标、链路。
   - 每个应用接入 RUM、错误监控、性能监控。

2. **发布平台**：
   - 标准化发布流程，支持灰度、回滚、审批。
   - 发布与监控联动，异常自动止损。

3. **自动化**：
   - CI/CD、自动测试、自动回滚。
   - 减少人工操作，降低故障概率。

**四、度量与驱动**

| 指标 | 目的 |
|------|------|
| MTTR（Mean Time To Recovery） | 平均恢复时间 |
| MTTF（Mean Time To Failure） | 平均故障间隔 |
| 发布频率 | 衡量交付能力 |
| 变更失败率 | 衡量发布质量 |
| 错误预算消耗 | 衡量稳定性风险 |

最佳实践：
- SRE 文化不是一蹴而就，需要从小范围试点。
- 让开发人员参与值班，增强 ownership。
- 用数据说话，定期 review SLO 达成情况。

**评分维度**：
- 能从组织、流程、工具三个维度阐述（30%）
- 能说明 SLO/错误预算/无责备复盘（25%）
- 能结合前端特点举例（25%）
- 能提出度量指标（20%）

**常见错误**：
- 把 SRE 简单等同于运维。
- 只关注工具，忽略文化和流程。
- 过度追求稳定性，抑制发布效率。

**延伸追问**：
- 如何平衡发布速度和稳定性？
- 前端 SRE 与后端 SRE 的分工边界是什么？

**相关题目**：
- [FB-22-CP-P-021 Incident Response 流程](#FB-22-CP-P-021)
- [FB-22-CO-A-014 SLI/SLO/SLA](#FB-22-CO-A-014)

**参考资源**：
- [Google SRE Book](https://sre.google/sre-book/introduction/)
- [Site Reliability Engineering - Workbook](https://sre.google/workbook/table-of-contents/)

**口头回答版**：
> SRE 文化落地要分组织、流程、工具三方面。组织上要有前端 SRE 角色或职责，建立 On-call 机制，跨职能协作。流程上要定义 SLO、用错误预算管理发布节奏、强制灰度发布、做无责备复盘。工具上要建可观测性平台、发布平台、自动化 CI/CD。度量上关注 MTTR、变更失败率、发布频率、错误预算消耗。关键是让开发也参与值班，增强 ownership，用数据说话，不要只买工具不重视文化。

---

### FB-22-SD-R-029：前端灾备与多活架构设计

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：22 部署与 SRE
**标签**：灾备、多活、容灾、高可用、RTO、RPO
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端应用的灾备与多活架构，说明 RTO、RPO 目标，以及故障切换流程。

**参考答案**：

**一、核心概念**

| 指标 | 含义 | 前端示例 |
|------|------|---------|
| **RTO**（Recovery Time Objective） | 恢复时间目标 | 故障后 5 分钟内恢复页面访问 |
| **RPO**（Recovery Point Objective） | 恢复点目标 | 数据丢失容忍度，前端通常接近 0 |

**二、灾备等级**

1. **冷备**：
   - 备份静态资源到异地，故障时手动恢复。
   - 成本低，RTO 长（小时级）。

2. **温备**：
   - 异地已部署环境，定期同步，故障时手动或半自动切换。
   - RTO 分钟级到小时级。

3. **热备/双活**：
   - 多区域同时对外提供服务，故障时自动切换。
   - RTO 秒级到分钟级，成本最高。

**三、前端多活架构**

```text
                   ┌─────────────┐
                   │  全局负载均衡 │
                   │  GeoDNS/GTM  │
                   └──────┬──────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  区域 A   │    │  区域 B   │    │  区域 C   │
    │  主入口   │    │  主入口   │    │  主入口   │
    │ CDN + K8s│    │ CDN + K8s│    │ CDN + K8s│
    └──────────┘    └──────────┘    └──────────┘
```

**四、前端特有灾备策略**

1. **静态资源多副本**：
   - 同一份构建产物同步到多个 CDN/对象存储。
   - 主 CDN 故障时，切换 CDN 域名或源站。

2. **HTML 入口冗余**：
   - HTML 文件多区域存储，DNS 切流。
   - 极端情况下可返回纯静态降级页。

3. **降级页面**：
   - 当核心服务不可用时，展示静态提示页或简化版页面。
   - 降级页不依赖动态 API。

4. **Service Worker 缓存**：
   - 提前缓存核心资源，网络异常时可离线访问部分功能。

**五、故障切换流程**

```text
1. 监控发现某区域异常
2. 自动/手动切 DNS/GTM 流量到健康区域
3. 验证健康区域服务正常
4. 通知用户和团队
5. 修复故障区域
6. 流量逐步切回
```

最佳实践：
- 核心链路定期做混沌工程演练。
- 降级页面要提前准备并定期更新。
- 多活架构下要保证数据一致性和版本一致性。

**评分维度**：
- 能解释 RTO/RPO 并给出目标（20%）
- 能区分冷备/温备/热备/双活（20%）
- 能设计前端多活架构（25%）
- 能说明前端特有灾备策略和切换流程（25%）
- 能提到混沌工程演练（10%）

**常见错误**：
- 灾备只关注后端，忽略前端入口和 CDN。
- RTO/RPO 目标不切实际。
- 多活架构下不同区域版本不一致。

**延伸追问**：
- 如何处理多活架构下的用户登录态同步？
- 降级页面如何保持品牌和核心信息更新？

**相关题目**：
- [FB-22-SD-R-026 全球化多区域部署架构](#FB-22-SD-R-026)
- [FB-22-SD-R-025 设计高可用前端部署平台](#FB-22-SD-R-025)

**参考资源**：
- [AWS Disaster Recovery](https://aws.amazon.com/disaster-recovery/)
- [Google SRE - Reliability](https://sre.google/sre-book/availability-table/)

**口头回答版**：
> 前端灾备要先定 RTO 和 RPO，比如 5 分钟内恢复、数据尽量不丢。灾备分冷备、温备、热备、双活，成本和恢复速度递增。前端多活架构要把静态资源多副本部署到不同区域 CDN 和源站，用 GeoDNS 或 GTM 做流量调度。还要有 HTML 入口冗余、静态降级页、Service Worker 缓存这些前端特有策略。故障时切流量到健康区域，验证后通知用户，修好后再切回。平时要做混沌工程演练，保证真的能切换。

---

### FB-22-CP-R-030：从研发效率到稳定性，前端工程化体系如何建设？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：22 部署与 SRE
**标签**：工程化、研发效率、稳定性、质量门禁、标准化
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请从研发效率、代码质量、发布稳定性、可观测性等维度，设计一个前端工程化体系。

**参考答案**：

**一、研发效率层**

| 模块 | 工具/实践 |
|------|----------|
| 脚手架 | 统一项目模板（React/Vue/SSR/组件库） |
| Monorepo | pnpm workspace + Turborepo/Nx |
| 组件库/Design System | 复用 UI、减少重复开发 |
| Low-code/Pro-code 协同 | 配置化页面 + 自定义代码扩展 |
| 本地开发 | Mock 服务、HMR、代理配置 |

**二、代码质量层**

```text
代码提交 -> ESLint/Prettier -> TypeScript -> 单元测试 -> Code Review -> 合并
```

1. **代码规范**：ESLint、Prettier、Stylelint、Commitlint。
2. **类型安全**：TypeScript 严格模式，接口契约管理。
3. **测试体系**：
   - 单元测试：Jest/Vitest + Testing Library。
   - E2E 测试：Playwright/Cypress。
   - 视觉回归：Chromatic/Storybook。
4. **Code Review**：强制 Review、自动化检查、安全扫描。

**三、发布稳定性层**

1. **CI/CD**：
   - 标准化流水线：lint -> test -> build -> scan -> deploy。
   - 环境隔离：dev/staging/prod。

2. **部署策略**：
   - 灰度发布、蓝绿部署、金丝雀、A/B 测试。
   - 自动回滚、Feature Flag 快速降级。

3. **质量门禁**：
   - 单测覆盖率阈值。
   - 产物体积阈值。
   - 安全漏洞阈值。

**四、可观测性层**

1. **RUM**：web-vitals、错误监控、性能看板。
2. **日志**：统一日志格式、Trace ID 串联。
3. **告警**：SLO 驱动、分级降噪、自动止损。

**五、治理与度量**

| 度量项 | 目的 |
|--------|------|
| 构建耗时 | 发现 CI 瓶颈 |
| 发布频率 | 衡量交付效率 |
| 变更失败率 | 衡量发布质量 |
| MTTR | 衡量故障恢复能力 |
| 技术债清单 | 跟踪长期改进项 |

最佳实践：
- 工程化体系要自上而下推动，也要有自下而上的反馈。
- 不要一次性引入过多工具，逐步演进。
- 所有规范和流程都要有文档和培训。

**评分维度**：
- 能从四个维度系统阐述（30%）
- 能说明各层具体工具和流程（30%）
- 能提到质量门禁和度量（20%）
- 能结合团队规模和业务特点取舍（20%）

**常见错误**：
- 只买工具，不建流程和文化。
- 追求大而全，忽略团队接受度。
- 度量指标只关注过程，不关注结果。

**延伸追问**：
- 如何推动团队接受新的工程化规范？
- 工程化投入如何量化 ROI？

**相关题目**：
- [FB-22-CP-R-028 SRE 文化在前端团队落地](#FB-22-CP-R-028)
- [FB-22-SD-R-025 设计高可用前端部署平台](#FB-22-SD-R-025)

**参考资源**：
- [FrontendOps - GitHub](https://github.com/FrontendOps)
- [Web Platform Tests](https://web-platform-tests.org/)

**口头回答版**：
> 前端工程化体系我分四层。研发效率层：统一脚手架、Monorepo、组件库复用、本地开发工具。代码质量层：ESLint、TypeScript、单元测试、E2E、Code Review。发布稳定层：标准化 CI/CD、灰度蓝绿发布、自动回滚、Feature Flag、质量门禁。可观测性层：RUM、日志、告警。还要有度量和治理，比如构建耗时、发布频率、变更失败率、MTTR。工程化要逐步演进，不能一次性堆工具，也要考虑团队接受度。

---

### FB-22-SD-R-031：SSR/SSG/CDN 混合部署架构

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：22 部署与 SRE
**标签**：SSR、SSG、CDN、混合部署、边缘渲染
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个同时支持 SSR、SSG 和 CDN 加速的混合部署架构，并说明不同页面的路由策略。

**参考答案**：

**一、页面分类**

| 类型 | 特点 | 示例 |
|------|------|------|
| **SSG** | 构建时生成，不变内容 | 首页、帮助文档、博客 |
| **SSR** | 请求时渲染，动态内容 | 用户中心、商品详情（价格实时） |
| **ISR** | 按需重新生成，折中方案 | 列表页、活动页 |
| **CSR** | 纯客户端渲染，交互复杂 | 管理后台、数据大屏 |

**二、混合部署架构**

```text
用户请求
   │
   ▼
CDN / Edge Layer
   │
   ├── 命中 SSG 缓存 -> 直接返回静态 HTML
   │
   ├── ISR 缓存未过期 -> 返回缓存 HTML，后台 stale-while-revalidate
   │
   └── SSR / 未命中缓存 -> Edge Function / Serverless Function 渲染
            │
            ▼
         BFF / API Gateway -> 后端服务 -> 数据库
```

**三、路由策略**

1. **静态路由**：
   - `/`、`/about`、`/docs/*` -> SSG，长期 CDN 缓存。

2. **半动态路由（ISR）**：
   - `/blog/:slug` -> 首次 SSR，之后缓存 N 秒，后台增量更新。

3. **动态路由**：
   - `/user/:id`、`/product/:id` -> SSR，短缓存或不缓存。

4. **纯客户端路由**：
   - `/admin/*` -> CSR，只返回空 HTML + JS。

Next.js 配置示例：

```javascript
// app/page.js
export const revalidate = 3600; // ISR 1 小时

// app/product/[id]/page.js
export const dynamic = 'force-dynamic'; // SSR
```

**四、CDN 策略**

| 页面类型 | 缓存策略 |
|---------|---------|
| SSG | `max-age=31536000, immutable`，通过 HTML 版本切换 |
| ISR | `s-maxage=60, stale-while-revalidate=86400` |
| SSR | `no-cache` 或 `private, max-age=0` |
| CSR | 静态资源长期缓存，HTML 不缓存 |

**五、降级与容灾**

- SSR 服务异常时，CDN 返回上次缓存的页面（stale-if-error）。
- 极端情况下切换为静态降级页。
- 核心数据接口失败时，页面展示默认数据或错误提示。

最佳实践：
- 尽量把页面 SSG/ISR 化，减少 SSR 依赖。
- 使用边缘渲染降低 SSR 延迟。
- 监控各页面类型的缓存命中率和渲染耗时。

**评分维度**：
- 能区分 SSG/SSR/ISR/CSR 适用场景（25%）
- 能设计混合部署架构（25%）
- 能说明路由和缓存策略（25%）
- 能讨论降级与容灾（15%）
- 能提到边缘渲染（10%）

**常见错误**：
- 所有页面都用 SSR，忽略静态化收益。
- CDN 缓存策略一刀切。
- ISR 缓存时间过长导致数据不及时。

**延伸追问**：
- 如何平衡 ISR 的实时性和性能？
- SSR 服务故障时，如何优雅降级到 CSR？

**相关题目**：
- [FB-22-SC-P-019 Serverless 与边缘部署](#FB-22-SC-P-019)
- [FB-22-SD-R-027 零停机前端发布架构](#FB-22-SD-R-027)

**参考资源**：
- [Next.js Rendering](https://nextjs.org/docs/app/building-your-application/rendering)
- [Vercel Edge Network](https://vercel.com/docs/edge-network/overview)

**口头回答版**：
> 混合部署要根据页面类型选渲染方式。静态内容用 SSG，比如首页、文档；实时性要求高的用 SSR，比如用户中心、商品详情；列表页、活动页可以用 ISR 折中；后台管理用 CSR。架构上用户请求先到 CDN，SSG 页面直接命中缓存；ISR 缓存没过期直接返回，过期了后台增量更新；SSR 走 Edge Function 或 Serverless Function 渲染。缓存策略要区分：SSG 长期缓存，ISR 用 stale-while-revalidate，SSR 不缓存。SSR 故障时可以用 CDN 旧缓存或静态降级页兜底。


### FB-22-CO-B-009：什么是 SLA/SLO/SLI？前端如何设定和保障服务等级？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：SLA、边缘节点
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 SLA、SLO、SLI 的含义，并说明前端团队在设定和保障服务等级时的关键做法。

**参考答案**：

SLA（Service Level Agreement，服务等级协议）是面向用户或业务方的承诺，例如“首页可用性 99.95%”。SLO（Service Level Objective，服务等级目标）是团队内部设定的可量化目标，如“LCP P75 < 2.5s”。SLI（Service Level Indicator，服务等级指标）是具体可测量的指标，如错误率、可用性、LCP、CLS。

前端设定和保障服务等级的关键做法：

1. **选择合适的 SLI**：
   - 可用性：JS 错误率、白屏率、CDN 5xx 比例。
   - 性能：FCP、LCP、INP、CLS、TTFB。
   - 业务：核心流程转化率、支付成功率。

2. **设定合理的 SLO**：
   - 参考历史基线，避免拍脑袋。
   - 区分核心页面与非核心页面，避免一刀切。
   - 留有 Error Budget，例如每月允许 0.1% 的可用性损失。

3. **保障机制**：
   - 监控告警：核心 SLI 异常时触发 P0/P1 告警。
   - 发布控制：灰度、金丝雀、自动回滚，避免一次性耗尽 Error Budget。
   - 容灾降级：CDN 异常时切换备用源，SSR 异常时降级为 CSR。

4. **对外 SLA 与对内 SLO 的 gap 管理**：
   - 对外承诺要低于对内 SLO，预留缓冲。
   - 定期复盘 SLA 达成情况，持续优化。

**评分维度**：
- 能区分 SLA/SLO/SLI 三者含义（35%）
- 能列举前端适用的 SLI 指标（30%）
- 能说明 Error Budget 与发布控制的关系（20%）
- 能提到容灾降级与 SLA gap 管理（15%）

**常见错误**：
- 把 SLA/SLO/SLI 混为一谈。
- 只关注可用性，忽略性能与业务指标。
- 设定 SLO 时不留 Error Budget，导致频繁违约。

**延伸追问**：
- 如果某版本发布导致错误率突增，如何评估是否消耗完 Error Budget？
- 前端 SLI 如何与后端服务等级目标对齐？

**相关题目**：
- [FB-22-CO-B-001 CI/CD 流水线阶段](#FB-22-CO-B-001)
- [FB-22-SC-R-001 容器化场景下的 Error Budget](#FB-22-SC-R-001)

**参考资源**：
- [Google SRE Book - SLI/SLO/SLA](https://sre.google/sre-book/table-of-contents/)
- [Google - SRE fundamentals: SLIs, SLOs and SLAs](https://cloud.google.com/blog/products/devops-sre/sli-slo-sla)

**口头回答版**：
> SLA 是对外的服务承诺，SLO 是团队内部目标，SLI 是具体可测量的指标。前端常用的 SLI 包括 JS 错误率、白屏率、LCP、CLS、CDN 5xx 等。设定 SLO 要参考历史基线，区分核心页面，还要留 Error Budget。保障手段包括监控告警、灰度发布、自动回滚和容灾降级。对外 SLA 一般要保守一点，低于对内 SLO，留出缓冲空间。
---

### FB-22-SC-B-001：电商大促期间前端静态资源带宽突增，如何设计 CDN 带宽应急方案？

**题型**：场景设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：标准化、带宽
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
某电商大促期间，前端静态资源（JS/CSS/图片）请求量激增，CDN 带宽接近上限，部分用户出现加载缓慢。请设计一套 CDN 带宽应急方案。

**参考答案**：

应急方案应覆盖扩容、降本、降级三个层面：

1. **快速扩容带宽**：
   - 联系 CDN 厂商临时提升带宽上限或启用弹性计费。
   - 开启多 CDN 厂商调度，将部分流量切到备用 CDN。
   - 按地域/运营商拆分流量，避免单一节点过载。

2. **降低回源与传输成本**：
   - 提升缓存命中率：确保静态资源文件名带 hash，配置长期缓存。
   - 开启 Brotli/Gzip 压缩，减少传输体积。
   - 对图片启用 WebP/AVIF 自适应，按需返回合适格式。
   - 暂停非核心资源的预加载、懒加载之外的大文件请求。

3. **降级与限流**：
   - 关闭非核心埋点、A/B 实验脚本，减少请求数。
   - 降级高清图片为低清占位图，优先保证主流程可用。
   - 对极端热点资源做 URL 预热，避免集中回源。

4. **监控与预案**：
   - 实时监控 CDN 带宽、命中率、5xx、RTT。
   - 提前演练大促预案，明确切换多 CDN 的 SOP。

**评分维度**：
- 能从扩容、降本、降级多角度设计（40%）
- 能提到多 CDN 调度和缓存命中率优化（25%）
- 能说明压缩、格式自适应等降本手段（20%）
- 能提到监控预警与演练（15%）

**常见错误**：
- 只想到加钱扩容，忽略降本和降级手段。
- 不了解 CDN 缓存命中率对回源带宽的影响。
- 大促前没有预热热点资源。

**延伸追问**：
- 多 CDN 调度时，如何做到用户会话内域名一致？
- 如果 CDN 厂商整体故障，如何快速切换？

**相关题目**：
- [FB-22-CO-B-003 CDN 在前端部署中的作用](#FB-22-CO-B-003)
- [FB-22-SC-P-020 大规模前端缓存失效策略](#FB-22-SC-P-020)

**参考资源**：
- [Cloudflare - CDN Best Practices](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
- [阿里云 CDN 带宽封顶与监控](https://help.aliyun.com/zh/cdn/)

**口头回答版**：
> 大促 CDN 带宽突增要从扩容、降本、降级三方面处理。扩容可以临时升带宽、开多 CDN 调度；降本要提升缓存命中率、开 Brotli 压缩、图片转 WebP/AVIF；降级可以关掉非核心埋点和实验脚本、临时用低清图。还要提前预热热点资源，实时监控带宽、命中率、5xx，演练切换 SOP。
---

### FB-22-PE-B-001：前端静态资源访问量翻倍时，如何排查并优化 CDN/边缘缓存扩容中的性能瓶颈？

**题型**：性能优化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：扩容、缓存策略
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
某前端应用访问量翻倍后，用户反馈首屏加载变慢、资源加载偶发超时。请说明如何排查并优化 CDN/边缘缓存扩容过程中的性能瓶颈。

**参考答案**：

排查与优化应遵循“定位瓶颈 → 针对性扩容 → 验证效果”的闭环：

1. **定位瓶颈**：
   - 查看 CDN 监控：带宽、QPS、命中率、回源率、5xx 比例、各节点 RTT。
   - 查看浏览器侧：LCP、FCP、TTFB、资源加载瀑布图。
   - 判断是边缘节点容量不足、回源链路拥堵，还是源站 OSS/S3 响应慢。

2. **边缘缓存优化**：
   - 提升缓存命中率：静态资源加 hash，HTML 设置短缓存，避免频繁回源。
   - 针对热点文件做 URL 预热，减少冷启动。
   - 调整缓存 TTL，平衡实时性与命中率。

3. **扩容与调度**：
   - 提升 CDN 带宽上限或启用弹性带宽。
   - 启用多 CDN 调度，分散单厂商压力。
   - 按地域/运营商扩容边缘节点。

4. **源站与链路优化**：
   - 检查 OSS/S3 带宽与连接数限制。
   - 启用 HTTP/2、HTTP/3、TLS 1.3，降低握手开销。
   - 对超大资源做分片或懒加载。

5. **验证**：
   - 对比优化前后的 LCP、TTFB、CDN 命中率。
   - 用 Lighthouse CI 或 RUM 数据验证真实用户收益。

**评分维度**：
- 能从 CDN 与浏览器两侧定位瓶颈（35%）
- 能说明缓存命中率与预热优化（30%）
- 能提到多 CDN 调度与源站优化（20%）
- 能说明验证指标（15%）

**常见错误**：
- 不加分析直接扩容，忽略命中率优化。
- 把 HTML 也设置长期缓存，导致版本更新不及时。
- 只看平均指标，忽略 P95/P99 长尾。

**延伸追问**：
- 缓存命中率低时，如何快速判断是配置问题还是业务特性导致？
- 回源带宽过高时，除了扩容还有什么手段？

**相关题目**：
- [FB-22-CO-B-004 HTTP 缓存与 CDN 缓存刷新](#FB-22-CO-B-004)
- [FB-22-SC-B-001 CDN 带宽应急方案](#FB-22-SC-B-001)

**参考资源**：
- [Web.dev - Optimize caching](https://web.dev/articles/http-cache)
- [Akamai - CDN performance best practices](https://www.akamai.com/products/cdn)

**口头回答版**：
> 先定位瓶颈，看 CDN 监控的带宽、命中率、回源率、5xx，再看浏览器侧 LCP、TTFB。如果是命中率低，就给静态资源加 hash、HTML 短缓存、热点资源预热。如果是边缘节点容量不足，就升带宽、开多 CDN 调度。还要检查源站 OSS 带宽、HTTP/2、TLS 版本。最后用 Lighthouse CI 或 RUM 验证效果。
---

### FB-22-EN-B-006：如何在 CI/CD 中落地前端静态资源的 HTTP 缓存策略，避免用户加载到旧版本？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：HTTP 缓存、前端部署
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何在 CI/CD 流水线中落地前端静态资源的 HTTP 缓存策略，确保版本更新时用户不会加载到旧资源。

**参考答案**：

落地 HTTP 缓存策略的关键是“长期缓存不可变资源，短期缓存入口文件”。

1. **构建阶段生成带 hash 的资源**：
   ```text
   assets/
     app.a3f2b1c.js
     vendor.7d8e9f0.js
     main.2c4d6e8.css
   ```
   内容变化则 hash 变化，新 URL 天然绕过旧缓存。

2. **HTML 作为入口短缓存或不缓存**：
   ```http
   Cache-Control: no-cache, must-revalidate
   ```
   或设置较短 max-age，确保每次访问都能拿到最新入口。

3. **CI/CD 中集成缓存控制**：
   - 构建后自动上传产物到 OSS/S3，并设置对应对象的 Cache-Control。
   - 部署脚本中刷新 CDN 上 `index.html` 所在路径。
   - 对核心 JS/CSS 做 CDN 预热。

4. **版本更新保障**：
   - 保留最近 N 个版本目录，支持回滚。
   - 在 HTML 中引用新的资源路径，避免旧 hash 文件被覆盖。
   - 发布后用 RUM 或 E2E 验证用户加载的是新版本。

5. **避免常见坑**：
   - 不要用 `?v=2.0` 查询参数做长期缓存，部分 CDN 可能不按参数区分。
   - 不要覆盖同名文件后依赖刷新 API，存在窗口期不一致风险。

**评分维度**：
- 能说明 hash 命名与 HTML 缓存策略（35%）
- 能描述 CI/CD 中设置 Cache-Control 和刷新/预热（30%）
- 能提到版本保留与回滚（20%）
- 能指出查询参数缓存的坑（15%）

**常见错误**：
- 所有文件都设置长期缓存，导致 HTML 旧版本无法更新。
- 覆盖同名文件后不清缓存，用户看到新旧资源混合。
- 用查询参数版本号替代 hash 命名。

**延伸追问**：
- 如果用户浏览器本地缓存了旧 HTML，除了改文件名还能怎么处理？
- 多环境部署时，如何隔离不同环境的缓存策略？

**相关题目**：
- [FB-22-CO-B-004 HTTP 缓存与 CDN 缓存刷新](#FB-22-CO-B-004)
- [FB-22-EN-B-005 前端构建产物版本化管理](#FB-22-EN-B-005)

**参考资源**：
- [Web.dev - HTTP cache](https://web.dev/articles/http-cache)
- [Vite 构建配置 - assetFileNames](https://vitejs.dev/config/build-options.html#build-rollupoptions)

**口头回答版**：
> 核心原则是不可变资源长期缓存，入口文件短缓存。构建时给 JS/CSS 加内容 hash，HTML 设置 no-cache 或短 max-age。CI/CD 里上传产物时设置好 Cache-Control，部署后刷新 CDN 上 HTML 路径，预热核心资源。还要保留最近几个版本支持回滚，发布完验证用户加载的是新版本。不要用 ?v=2.0 做长期缓存。
---

### FB-22-SE-B-001：前端资源长期缓存可能带来哪些安全风险？如何防御缓存污染与 RPO 攻击？

**题型**：安全题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：HTTP 缓存、RPO
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
前端静态资源常被 CDN/浏览器长期缓存，这种机制可能引入哪些安全风险？请重点说明缓存污染与 RPO（Relative Path Overwrite）类攻击的防御措施。

**参考答案**：

长期缓存带来的主要安全风险：

1. **缓存污染（Cache Poisoning）**：
   - 攻击者通过构造特殊请求头或查询参数，使 CDN 缓存了被污染的响应，后续正常用户获取到恶意内容。
   - 例如：`/app.js?v=malicious` 被缓存后，其他用户访问相同 URL 拿到污染版本。

2. **RPO（Relative Path Overwrite）**：
   - 攻击者利用服务器路径解析差异或缓存规则，让浏览器以错误路径加载资源，从而执行攻击者控制的脚本。
   - 例如：通过 URL 编码差异让 `/page%2f..%2fapp.js` 被当作 JS 执行。

3. **敏感信息泄露**：
   - 静态资源中误打包了 Source Map、内网 API 地址、密钥等敏感信息，被长期缓存后难以清除。

4. **版本回滚被利用**：
   - 旧版本资源若长期保留且存在已知漏洞，攻击者可强制引用旧版本。

防御措施：
- 静态资源文件名加内容 hash，避免依赖查询参数区分版本。
- CDN 配置忽略可能导致污染的请求头（如非标准的 `X-Forwarded-Host`）。
- 对上传产物做签名或完整性校验（SRI, Subresource Integrity）。
- 敏感资源禁止长期缓存，Source Map 不部署到生产或单独鉴权。
- 定期清理过期版本，限制历史版本保留数量。

**评分维度**：
- 能解释缓存污染与 RPO 的基本原理（35%）
- 能说明长期缓存导致敏感信息泄露的风险（20%）
- 能列出至少 4 项防御措施（30%）
- 能提到 SRI 与 Source Map 管理（15%）

**常见错误**：
- 认为 CDN 缓存只影响性能，不影响安全。
- 用查询参数控制缓存版本，增加污染面。
- 生产环境直接暴露 Source Map。

**延伸追问**：
- 如何在 CI/CD 中自动化检测 Source Map 或敏感信息泄露？
- SRI 与 CDN 缓存如何配合使用？

**相关题目**：
- [FB-22-CO-B-006 HTTPS/TLS 基础](#FB-22-CO-B-006)
- [FB-22-SE-A-016 HTTPS/TLS 部署安全要点](#FB-22-SE-A-016)

**参考资源**：
- [PortSwigger - Web Cache Poisoning](https://portswigger.net/web-security/web-cache-poisoning)
- [OWASP - Subresource Integrity](https://owasp.org/www-community/controls/Subresource_Integrity)

**口头回答版**：
> 长期缓存可能带来缓存污染和 RPO 攻击。缓存污染是攻击者让 CDN 缓存了恶意响应，正常用户拿到污染内容；RPO 是利用路径解析差异加载攻击者控制的脚本。防御上要给资源加 hash 而不是用查询参数，CDN 忽略污染性请求头，启用 SRI 校验，敏感资源不长期缓存，Source Map 不上生产或单独鉴权，定期清理旧版本。
---

### FB-22-SD-B-001：如何设计前端应用的 CI/CD 镜像构建系统，兼顾构建速度与产物一致性？

**题型**：系统设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：CI/CD、镜像
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请设计一套用于前端应用的 CI/CD 镜像构建系统，要求构建速度快、产物一致、可跨环境复用。

**参考答案**：

前端 CI/CD 镜像构建系统核心设计：

1. **镜像分层设计**：
   - 基础镜像：固定 Node.js 版本 + pnpm/npm/yarn，预装常用系统依赖。
   - 依赖镜像：基于 lockfile 安装 node_modules，单独一层便于缓存。
   - 构建镜像：基于依赖镜像执行构建，产物输出到指定目录。

2. **加速构建**：
   - 利用 Docker layer cache，优先拷贝 `package.json` / lockfile 再安装依赖。
   - 在 CI 中挂载远程缓存（如 Docker BuildKit cache mount 或 registry cache）。
   - 使用 pnpm workspace + store 缓存，减少重复下载。

3. **保证产物一致性**：
   - 固定 Node.js 与包管理器版本。
   - 使用 `--frozen-lockfile` 安装，禁止 lockfile 变更。
   - 构建时注入确定性环境变量（如 `NODE_ENV=production`、`BUILD_TIME`）。
   - 构建产物做 checksum 校验，确保每次构建可复现。

4. **多环境复用**：
   - 镜像 tag 包含 git commit 与版本号。
   - 通过 args 区分 dev/staging/prod 构建参数。
   - 产物推送到统一制品库（Nexus/Harbor/ECR）。

5. **可观测与安全**：
   - 镜像扫描依赖漏洞（Trivy/Snyk）。
   - 记录构建日志与产物版本，便于问题追溯。

**评分维度**：
- 能说明镜像分层与缓存策略（30%）
- 能提到 lockfile 与确定性构建（25%）
- 能描述多环境复用与制品管理（20%）
- 能提到安全扫描与可观测（15%）
- 能举例 Dockerfile 关键片段（10%）

**常见错误**：
- 每次构建都重新安装全部依赖，未利用缓存。
- 不固定 Node.js 版本，导致产物不一致。
- 镜像体积过大，包含 node_modules 和源码。

**延伸追问**：
- monorepo 场景下如何设计镜像分层？
- 如何验证不同环境构建产物的一致性？

**相关题目**：
- [FB-22-CO-B-001 CI/CD 流水线阶段](#FB-22-CO-B-001)
- [FB-22-EN-P-017 容器化部署前端应用](#FB-22-EN-P-017)

**参考资源**：
- [Dockerfile Best Practices](https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/)
- [BuildKit cache mounts](https://docs.docker.com/build/cache/optimize/#use-cache-mounts)

**口头回答版**：
> 我会把镜像分成基础镜像、依赖镜像、构建镜像三层。基础镜像固定 Node.js 版本和包管理器；依赖镜像基于 lockfile 安装 node_modules，单独一层利用缓存；构建镜像执行构建输出产物。加速方面用 Docker layer cache、远程缓存、pnpm store。一致性靠 frozen-lockfile、固定环境变量、产物 checksum。镜像 tag 带 commit，推到制品库，再扫描漏洞。
---

### FB-22-CP-B-001：结合 RPO 与前端 HTTP 缓存机制，谈谈潜在风险与防御实践。

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：RPO、HTTP 缓存
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
RPO（Relative Path Overwrite）是一种利用路径解析差异的攻击手法。请结合前端 HTTP 缓存机制，分析其潜在风险并给出防御实践。

**参考答案**：

RPO 的核心原理：攻击者通过构造特殊 URL，让浏览器把非 JS/CSS 文件当作脚本或样式表解析执行。当这种恶意响应被 HTTP 缓存（浏览器或 CDN）长期保存时，影响面会扩大。

潜在风险：

1. **路径解析差异被利用**：
   - 服务端把 `/page%2f..%2fapi.js` 解析为某个数据接口。
   - 浏览器把同一 URL 解析为脚本路径，执行返回的数据内容。

2. **缓存放大攻击面**：
   - 攻击者诱导 CDN 缓存包含恶意代码的响应。
   - 后续所有用户访问同一 URL 都拿到被污染版本。

3. **JSONP / callback 污染**：
   - 反射型接口返回 `alert(1)` 等可被 `<script>` 标签执行的响应。

防御实践：
- 静态资源文件名加内容 hash，避免依赖 URL 路径动态解析。
- CDN/源站对 JS/CSS 资源设置正确的 `Content-Type`，禁止 sniff。
- 配置 `X-Content-Type-Options: nosniff`，防止浏览器 MIME sniff。
- 敏感接口返回 JSON 时配置 `Content-Type: application/json`，不嵌入可执行脚本。
- 使用 SRI（Subresource Integrity）校验加载的外部脚本。
- 避免以用户输入拼接资源路径，严格校验路径参数。

**评分维度**：
- 能解释 RPO 与缓存结合的风险（35%）
- 能分析路径解析差异与缓存放大（25%）
- 能列出至少 4 项防御措施（30%）
- 能结合前端部署场景说明（10%）

**常见错误**：
- 只讲 RPO 原理，不讲与缓存的关系。
- 忽略 `Content-Type` 与 MIME sniff 的作用。
- 认为只要用了 HTTPS 就不会被 RPO 攻击。

**延伸追问**：
- 如果某个被污染的资源已被 CDN 缓存，如何快速清除？
- 在微前端架构中，RPO 风险会放大吗？

**相关题目**：
- [FB-22-SE-B-001 缓存污染与 RPO 防御](#FB-22-SE-B-001)
- [FB-22-CA-B-001 Nginx 缓存配置风险分析](#FB-22-CA-B-001)

**参考资源**：
- [PortSwigger - Relative Path Overwrite](https://portswigger.net/web-security/request-smuggling)
- [MDN - X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)

**口头回答版**：
> RPO 是利用服务端和浏览器对 URL 路径解析不同，让浏览器把非脚本文件当脚本执行。如果恶意响应被 CDN 或浏览器长期缓存，影响会放大。防御上要给资源加 hash、设置正确 Content-Type、开 nosniff、JSON 接口不要返回可执行内容、用 SRI 校验脚本、避免用户输入拼路径。还要能快速刷新被污染的缓存。
---

### FB-22-CA-B-001：下面一段 Nginx 缓存配置存在什么风险？请分析原因。

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：RPO、部署平台
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
下面是一段前端静态资源部署中使用的 Nginx 缓存配置，请分析其潜在问题与风险。

```nginx
server {
    listen 80;
    server_name app.example.com;

    location /static/ {
        add_header Cache-Control "public, max-age=31536000";
        try_files $uri $uri/ /index.html;
    }

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=31536000";
    }
}
```

**参考答案**：

这段配置存在多处风险：

1. **HTML 被长期缓存**：
   - `location /` 对所有请求都返回 `max-age=31536000`，包括 `index.html`。
   - 这会导致用户浏览器长时间不更新入口文件，发布新版本后用户仍可能访问旧版应用。

2. **`/static/` 回退到 `/index.html`**：
   - `try_files $uri $uri/ /index.html` 在静态资源不存在时会返回 HTML。
   - 如果攻击者请求 `/static/malicious.js` 且该文件不存在，服务端会返回 `index.html` 的内容，可能被浏览器当作 JS 执行，存在 RPO 风险。

3. **缺少 `X-Content-Type-Options: nosniff`**：
   - 浏览器可能通过 MIME sniff 把返回的 HTML 当 JS 执行，放大 RPO 风险。

4. **HTTP 明文传输**：
   - 监听 80 端口，未强制跳转 HTTPS，存在中间人攻击风险。

5. **没有针对 404 的独立处理**：
   - 缺失资源应返回 404，而不是统一 fallback 到 HTML。

改进建议：
```nginx
server {
    listen 80;
    server_name app.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name app.example.com;

    location /static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header X-Content-Type-Options "nosniff";
        try_files $uri =404;
    }

    location / {
        add_header Cache-Control "no-cache, must-revalidate";
        add_header X-Content-Type-Options "nosniff";
        try_files $uri $uri/ /index.html;
    }
}
```

**评分维度**：
- 能指出 HTML 被长期缓存的问题（30%）
- 能分析静态资源 fallback 到 HTML 的 RPO 风险（30%）
- 能提到 nosniff 与 HTTPS 强制跳转（20%）
- 能给出改进配置（20%）

**常见错误**：
- 只关注缓存时间，忽略 fallback 导致的安全问题。
- 认为 `try_files /index.html` 是 SPA 标准配置就没有风险。
- 没发现 HTTP 明文传输问题。

**延伸追问**：
- 如果必须使用 fallback 到 HTML，如何降低 RPO 风险？
- CDN 回源时也命中这段 Nginx 配置，风险会放大吗？

**相关题目**：
- [FB-22-SE-B-001 缓存污染与 RPO 防御](#FB-22-SE-B-001)
- [FB-22-CP-B-001 RPO 与 HTTP 缓存风险](#FB-22-CP-B-001)

**参考资源**：
- [Nginx try_files 文档](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)
- [MDN - X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)

**口头回答版**：
> 这段配置有两个大问题：一是所有请求包括 index.html 都设置了长期缓存，用户会拿到旧版本；二是 /static/ 下的 try_files 回退到 index.html，如果请求一个不存在的 JS，会返回 HTML，可能被浏览器执行，存在 RPO 风险。还要加上 nosniff、强制 HTTPS、404 处理。改进后 /static/ 长期缓存但缺失返回 404，/ 短缓存并 fallback 到 HTML。
---

### FB-22-SS-A-001：请分享一次你推动前端流水线改造或流量切分方案落地的经历。

**题型**：软技能题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：流水线、流量切分
**出现频率**：中频
**预计回答时长**：5-7 分钟

**题目描述**：
请结合一个实际项目，谈谈你如何推动前端 CI/CD 流水线改造或流量切分方案落地，遇到了哪些阻力，如何解决的。

**参考答案**：

回答应体现候选人的推动力、跨团队协作与结果量化能力。建议按 STAR 结构展开：

1. **背景（Situation）**：
   - 例如：团队前端项目多，发布靠手动上传 FTP，回滚慢、故障多；或者大版本重构需要灰度验证，但缺乏流量切分能力。

2. **任务（Task）**：
   - 明确目标：缩短发布耗时、降低发布失败率、实现灰度发布。

3. **行动（Action）**：
   - 技术侧：设计 CI/CD 流水线，集成代码检查、自动化测试、构建、部署、灰度。
   - 流程侧：制定发布规范、审批流程、值班机制。
   - 推动侧：组织评审会、写文档、做 demo、小范围试点。
   - 协作侧：与后端、运维、测试对齐接口契约与回滚策略。

4. **结果（Result）**：
   - 量化指标：发布耗时从 2 小时降到 15 分钟；发布失败率从 15% 降到 2%；灰度阶段发现问题 3 次，均未影响全量用户。

5. **反思（Reflection）**：
   - 哪些决策是对的，哪些踩了坑，未来如何改进。

**评分维度**：
- 案例具体可信，有明确背景与目标（30%）
- 角色与贡献清晰，体现推动力（30%）
- 有跨团队协作与冲突处理过程（20%）
- 结果量化，有方法论总结（20%）

**常见错误**：
- 只讲技术方案，不讲推动过程。
- 案例过于笼统，无法判断真实参与度。
- 忽略阻力与解决方案，显得过于理想化。

**延伸追问**：
- 当时有没有团队反对自动回滚？你是如何说服他们的？
- 如果重来一次，你会在哪个环节提前介入？

**相关题目**：
- [FB-22-CO-B-001 CI/CD 流水线阶段](#FB-22-CO-B-001)
- [FB-22-SC-A-011 前端金丝雀发布方案](#FB-22-SC-A-011)

**参考资源**：
- [Google SRE - Change Management](https://sre.google/sre-book/managing-reliability/)
- [Martin Fowler - Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html)

**口头回答版**：
> 我先用 STAR 结构讲一个真实案例：当时我们发布靠手动上传，经常出问题。我推动改成 GitLab CI/CD，集成 lint、测试、构建、部署、灰度。过程中遇到运维担心自动回滚风险，我就组织评审、做小范围试点、写 SOP。结果是发布从 2 小时降到 15 分钟，失败率明显下降。关键是既要技术方案可行，也要让人愿意配合。
---

### FB-22-CO-A-016：什么是前端服务的负载均衡？它与横向扩容有什么核心区别与联系？

**题型**：概念题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：负载、扩容
**出现频率**：中频
**预计回答时长**：5-7 分钟

**题目描述**：
请解释前端服务场景下的负载均衡，并说明它与横向扩容的核心区别与联系。

**参考答案**：

负载均衡（Load Balancing）是将用户请求按一定算法分发到多台服务实例的技术，目标是提升吞吐量、降低单点压力、实现高可用。

前端服务中的负载均衡常见层级：

1. **DNS 层**：通过 GeoDNS 或权重 A 记录将流量按地域分配。
2. **CDN 层**：CDN 调度系统将请求导向最近的边缘节点。
3. **网关/L4/L7 层**：Nginx、Ingress Controller、API Gateway 按 URL、Cookie、权重分发。
4. **应用层**：前端 SSR/Node 服务内部的集群调度。

负载均衡与横向扩容的区别：

| 维度 | 负载均衡 | 横向扩容 |
|------|---------|---------|
| 目标 | 合理分配已有流量 | 增加实例数量以提升总容量 |
| 触发时机 | 常态运行 | 容量不足时 |
| 实现方式 | 调度算法、权重、健康检查 | 增加 Pod/容器/节点 |
| 与自动化的关系 | 常与自动扩容联动 | 可由 HPA/VPA/定时策略触发 |

联系：
- 负载均衡是横向扩容生效的前提：扩容出的新实例必须通过负载均衡器接入流量。
- 自动扩容常配合负载均衡健康检查，剔除异常实例。
- 前端 SSR 服务扩容时，需保证会话状态无依赖或使用粘性会话。

**评分维度**：
- 能解释负载均衡的核心作用（25%）
- 能列举前端不同层级的负载均衡（30%）
- 能清晰对比负载均衡与横向扩容（30%）
- 能说明两者的联系与协同（15%）

**常见错误**：
- 把负载均衡和扩容当成一回事。
- 只讲 L7 负载均衡，忽略 DNS/CDN 层。
- 忽略有状态服务扩容时的会话问题。

**延伸追问**：
- 前端 SSR 服务做负载均衡时，如何处理用户会话？
- 多 CDN 调度算不算一种负载均衡？

**相关题目**：
- [FB-22-CO-B-007 DNS 解析流程和前端部署关系](#FB-22-CO-B-007)
- [FB-22-SC-R-001 容器化场景下的 Error Budget](#FB-22-SC-R-001)

**参考资源**：
- [Nginx Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/)
- [Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

**口头回答版**：
> 负载均衡是把流量合理分到多个实例，提升吞吐和高可用。前端有 DNS、CDN、网关、应用多个层级。负载均衡和横向扩容不一样：均衡是分配已有流量，扩容是增加实例数量。但两者要配合，扩容出的新实例必须通过负载均衡器接入流量，异常实例也要被健康检查剔除。SSR 服务扩容时要注意会话无状态。
---

### FB-22-SC-A-012：基于 OSS 托管前端静态资源，如何设计多环境、多版本的发布架构？

**题型**：场景设计题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：OSS、发布架构
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
假设前端静态资源托管在 OSS（阿里云 OSS / AWS S3）上，请设计一套支持多环境（dev/staging/prod）和多版本的发布架构，并说明回滚策略。

**参考答案**：

基于 OSS 的多环境、多版本发布架构：

1. **存储结构设计**：
   ```text
   bucket/
     dev/
       app/v1.2.0/index.html
       app/v1.2.0/assets/...
     staging/
       app/v1.2.0/index.html
       app/v1.2.0/assets/...
     prod/
       app/v1.2.0/index.html
       app/v1.2.0/assets/...
       app/v1.1.9/index.html
       app/v1.1.9/assets/...
   ```

2. **发布流程**：
   - CI 构建生成带 hash 的静态资源。
   - 按版本号上传到对应环境的 OSS 路径。
   - 部署平台修改入口 HTML/路由指向新版本。
   - CDN 刷新入口路径，预热核心资源。

3. **多环境隔离**：
   - dev 环境：每次提交自动部署，允许不稳定。
   - staging 环境：镜像 prod 配置，做回归验证。
   - prod 环境：需审批，按灰度策略放量。

4. **回滚策略**：
   - 保留最近 N 个版本目录，禁止覆盖旧版本资源。
   - 回滚时修改网关/Nginx/CDN 回源路径指向旧版本目录。
   - 回滚后刷新 CDN，确保用户拿到旧版入口。

5. **安全与治理**：
   - OSS Bucket 配置私有读写，通过 CDN/签名 URL 访问。
   - 启用版本控制（S3 Versioning / OSS 版本控制），防止误删。
   - 定期清理过旧版本，释放存储成本。

**评分维度**：
- 能设计清晰的 OSS 目录结构（25%）
- 能说明多环境隔离策略（25%）
- 能描述发布与回滚流程（30%）
- 能提到版本控制与清理策略（20%）

**常见错误**：
- 所有环境共用同一个 Bucket 和路径，导致互相污染。
- 每次发布覆盖旧版本，无法回滚。
- OSS Bucket 公网可读写，存在安全风险。

**延伸追问**：
- 如何实现 dev 环境每次推送自动部署，prod 环境必须审批？
- OSS 跨区域复制对发布架构有什么影响？

**相关题目**：
- [FB-22-EN-A-009 前端静态资源部署流程](#FB-22-EN-A-009)
- [FB-22-EN-B-005 前端构建产物版本化管理](#FB-22-EN-B-005)

**参考资源**：
- [阿里云 OSS 静态网站托管](https://help.aliyun.com/zh/oss/user-guide/tutorial-host-a-static-website-by-using-a-bucket)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

**口头回答版**：
> 我会按环境分 Bucket 或目录，比如 dev/staging/prod，每个版本按 v1.2.0 建目录，静态资源加 hash。dev 自动部署，staging 做回归，prod 审批后灰度发布。回滚时改入口指向旧版本目录，刷新 CDN。OSS 要开版本控制、限制公网访问，定期清理旧版本。
---

### FB-22-PE-A-014：如何排查并优化前端 SSR 服务高可用架构中的性能瓶颈？

**题型**：性能优化题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：高可用、文化
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
某前端 SSR 服务已部署多副本，但大流量下仍出现响应慢、偶发 502/504。请说明如何排查并优化其高可用架构中的性能瓶颈。

**参考答案**：

排查与优化应覆盖客户端到服务端全链路：

1. **定位瓶颈**：
   - 服务端监控：CPU、内存、事件循环延迟、请求队列长度。
   - 应用监控：SSR 渲染耗时、API 调用耗时、模板编译耗时。
   - 网关/Nginx：upstream 响应时间、连接数、超时配置。
   - 客户端：TTFB、FCP、LCP，判断是否服务端渲染慢。

2. **服务端优化**：
   - 对不依赖实时数据的页面做 SSG/ISR，减少 SSR 实时渲染。
   - 开启流式渲染（React 18 Streaming SSR），提前发送骨架屏。
   - 缓存渲染结果或 API 响应，降低重复计算。
   - 限制单次请求的数据量，避免大数据集序列化阻塞事件循环。

3. **高可用与扩容**：
   - 配置 HPA 根据 CPU/内存/QPS 自动扩容。
   - 设置合理的 readiness/liveness probe，及时剔除异常 Pod。
   - 网关层配置超时、重试、熔断，防止级联故障。

4. **降级策略**：
   - SSR 服务异常时，CDN 返回缓存页面（stale-if-error）。
   - 极端情况切换为静态降级页或 CSR 兜底。

5. **验证**：
   - 压测对比优化前后 TTFB、P99 延迟、错误率。
   - 观察线上真实用户 RUM 数据。

**评分维度**：
- 能从服务端、网关、客户端多维度定位瓶颈（35%）
- 能说明 SSR 渲染优化手段（30%）
- 能提到自动扩容、健康检查、熔断（20%）
- 能说明降级与验证（15%）

**常见错误**：
- 不加分析直接扩容，忽略渲染逻辑优化。
- 所有页面都用 SSR，未做 SSG/ISR 折中。
- 超时配置不合理，导致故障级联。

**延伸追问**：
- 流式 SSR 对 CDN 缓存策略有什么要求？
- 如何防止 SSR 服务被爬虫或异常流量打垮？

**相关题目**：
- [FB-22-SD-P-001 SSR 部署策略系统](#FB-22-SD-P-001)
- [FB-22-SC-P-018 SSG/SSR/ISR/CSR 混合部署](#FB-22-SC-P-018)

**参考资源**：
- [React 18 Streaming SSR](https://react.dev/reference/react-dom/server/renderToPipeableStream)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)

**口头回答版**：
> 先定位瓶颈，看服务端 CPU、内存、事件循环延迟、SSR 渲染耗时，再看网关 upstream 时间和客户端 TTFB。优化上能做 SSG/ISR 的页面不要 SSR，开流式渲染，缓存渲染结果和 API。高可用方面配 HPA、健康探针、超时熔断。降级可以用 CDN 旧缓存或 CSR 兜底。最后压测验证 TTFB 和 P99。
---

### FB-22-EN-A-013：如何在 Kubernetes Ingress 中落地前端应用的 Incident Response 与故障隔离机制？

**题型**：工程化题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：Incident Response、Ingress
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
请说明在 Kubernetes Ingress 层面，如何为前端应用落地 Incident Response 与故障隔离机制。

**参考答案**：

在 Ingress 层落地故障响应与隔离，可从流量控制、降级、可观测三方面入手：

1. **流量控制与熔断**：
   - 配置 rate limit，限制单 IP/用户请求频率，防止异常流量冲击。
   - 配置连接超时、读取超时，避免慢请求拖垮后端。
   - 使用 Ingress Controller（如 NGINX、Traefik、Istio Gateway）的熔断规则。

2. **故障隔离**：
   - 按路径或域名拆分路由，将异常服务与正常服务隔离。
   - 对前端静态资源与 SSR API 分别配置 upstream，避免 SSR 故障影响静态资源。
   - 使用金丝雀/蓝绿路由，快速切换异常版本。

3. **降级与兜底**：
   - 配置自定义错误页（如 502/504 返回静态降级页）。
   - SSR 异常时，Ingress 可路由到静态 CDN 版本。
   - 核心资源不可用时返回离线缓存或 skeleton。

4. **可观测与告警**：
   - Ingress 日志接入日志平台，统计 5xx、4xx、延迟、流量。
   - 配置 P0/P1 告警，触发 on-call 响应。
   - 与发布平台联动，异常时自动触发回滚或切换。

5. **Incident Response 流程**：
   - 检测 → 定位 → 止损（隔离/降级/回滚）→ 复盘 → 改进。
   - 将 Ingress 层规则纳入 GitOps，变更可审计、可回滚。

**评分维度**：
- 能说明 Ingress 层流量控制与熔断（30%）
- 能描述故障隔离与路由拆分（25%）
- 能提到降级与自定义错误页（20%）
- 能说明可观测与 Incident Response 流程（15%）
- 能举例具体 Ingress Controller 配置（10%）

**常见错误**：
- 只在应用层做熔断，忽略 Ingress 层第一道防线。
- 静态资源与 SSR 服务共用 upstream，故障互相影响。
- 没有自定义错误页，用户直接看到 502 白屏。

**延伸追问**：
- Ingress 层熔断与应用层熔断如何协同？
- 金丝雀发布时，Ingress 如何按 header/cookie 切流量？

**相关题目**：
- [FB-22-CP-P-021 Incident Response 流程](#FB-22-CP-P-021)
- [FB-22-SC-A-010 蓝绿部署在前端的实现与风险](#FB-22-SC-A-010)

**参考资源**：
- [Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [NGINX Ingress Controller Annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)

**口头回答版**：
> 在 Ingress 层可以做 rate limit、超时、熔断，把静态资源和 SSR 路由分开，避免互相影响。故障时返回自定义错误页或切到静态 CDN。还要接日志和告警，形成检测、定位、止损、复盘的闭环。规则用 GitOps 管理，变更可审计回滚。关键是把 Ingress 当成第一道防线，不要只依赖应用层。
---

### FB-22-SE-A-017：前端监控数据采集与上报过程中常见的安全风险有哪些？如何防御？

**题型**：安全题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：监控、Service
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
前端错误监控、性能监控、行为埋点在数据采集与上报过程中可能引入哪些安全风险？请说明防御措施。

**参考答案**：

前端监控上报中的主要安全风险：

1. **敏感信息泄露**：
   - 错误堆栈中可能包含用户 Token、手机号、银行卡号等 PII。
   - 埋点事件可能记录敏感页面路径或表单内容。
   - 防御：上报前脱敏，使用 allowlist 过滤字段，禁止在错误信息中打印敏感变量。

2. **XSS 通过监控通道注入**：
   - 错误消息或自定义指标中携带 `<script>`，在监控后台渲染时触发 XSS。
   - 防御：监控服务端对上报数据做转义和校验，前端展示使用 textContent 而非 innerHTML。

3. **CSRF / 伪造上报**：
   - 攻击者构造大量伪造监控请求，污染数据或消耗配额。
   - 防御：上报接口设置 CORS、请求签名、频率限制；对异常 IP/UA 做清洗。

4. **第三方监控 SDK 供应链风险**：
   - SDK 被篡改或引入恶意代码。
   - 防御：SRI 校验 SDK 文件，锁定版本，内网部署或私有 npm 镜像。

5. **传输安全**：
   - 监控数据通过 HTTP 明文传输被中间人窃听。
   - 防御：强制 HTTPS 上报，敏感指标额外加密。

6. **数据存储合规**：
   - 用户行为数据跨境存储、留存超期。
   - 防御：按 GDPR/个人信息保护法设计采集范围与留存周期。

**评分维度**：
- 能识别敏感信息泄露与 XSS 风险（30%）
- 能说明 CSRF/伪造上报防御（20%）
- 能提到供应链与传输安全（25%）
- 能说明数据合规与留存（15%）
- 能给出具体脱敏或签名方案（10%）

**常见错误**：
- 认为监控数据只是内部使用，不需要脱敏。
- 错误信息直接 innerHTML 展示到监控后台。
- 监控 SDK 从 CDN 加载但不校验完整性。

**延伸追问**：
- 错误堆栈中如何自动识别并脱敏手机号、身份证号？
- 如果监控服务端被 DDoS，如何保护业务接口不受影响？

**相关题目**：
- [FB-22-SE-A-016 HTTPS/TLS 部署安全要点](#FB-22-SE-A-016)
- [FB-22-SE-P-001 边缘平台监控安全风险](#FB-22-SE-P-001)

**参考资源**：
- [OWASP - Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [MDN - CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

**口头回答版**：
> 前端监控上报的风险主要有敏感信息泄露、XSS 通过监控通道注入、伪造上报、第三方 SDK 供应链风险、HTTP 明文传输。防御上要上报前脱敏、服务端转义、接口加签名和限频、SDK 用 SRI 校验、强制 HTTPS，还要注意数据留存合规。不能因为监控是内部数据就忽略安全。
---

### FB-22-SD-A-001：如何设计支持 Docker 的前端构建加速系统，解决 node_modules 与构建缓存问题？

**题型**：系统设计题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：Docker、加速
**出现频率**：中频
**预计回答时长**：5-7 分钟

**题目描述**：
前端项目依赖多、构建慢，请设计一套基于 Docker 的构建加速系统，重点解决 node_modules 与构建缓存问题。

**参考答案**：

设计目标：复用依赖层缓存、复用构建缓存、保证产物一致、缩短 CI 时间。

1. **Dockerfile 分层缓存**：
   ```dockerfile
   FROM node:20-alpine AS deps
   WORKDIR /app
   COPY package.json pnpm-lock.yaml ./
   RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
       pnpm install --frozen-lockfile

   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN --mount=type=cache,id=build,target=/app/.cache \
       pnpm build
   ```

2. **node_modules 缓存**：
   - 使用 BuildKit cache mount 挂载 pnpm/npm 全局 store。
   - 在 CI runner 上持久化 `/root/.pnpm-store`，跨构建复用。
   - monorepo 场景下使用 pnpm workspace + shared store。

3. **构建工具缓存**：
   - Vite/Webpack/Rspack 的 `.cache` 目录挂载 cache mount。
   - Babel、ESLint、TypeScript 增量缓存持久化。

4. **远程分布式缓存**：
   - 使用 Turborepo/Nx remote cache，团队共享构建结果。
   - 缓存 key 基于文件 hash + 环境变量，命中则跳过构建。

5. **镜像体积与一致性**：
   - 多阶段构建，最终产物镜像只包含 dist 和简单 server（如 nginx）。
   - 固定基础镜像 digest，避免上游更新导致不一致。
   - 构建产物做 checksum，便于校验。

**评分维度**：
- 能说明 Dockerfile 分层与 cache mount（30%）
- 能提到 pnpm store 与构建工具缓存（25%）
- 能描述远程分布式缓存（20%）
- 能说明产物一致性与镜像体积控制（15%）
- 能给出 Dockerfile 示例（10%）

**常见错误**：
- 每次构建都重新下载全部依赖。
- 把 node_modules 和源码都打到最后镜像里，体积巨大。
- 不固定基础镜像版本，导致构建产物不一致。

**延伸追问**：
- monorepo 中多个子项目如何共享 Docker 构建缓存？
- 远程缓存被污染时，如何快速回退？

**相关题目**：
- [FB-22-SD-B-001 前端 CI/CD 镜像构建系统](#FB-22-SD-B-001)
- [FB-22-EN-P-017 容器化部署前端应用](#FB-22-EN-P-017)

**参考资源**：
- [Docker BuildKit cache mounts](https://docs.docker.com/build/cache/optimize/#use-cache-mounts)
- [Turborepo Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)

**口头回答版**：
> 我会用多阶段 Dockerfile，把 package.json 和 lockfile 先拷贝安装依赖，利用 layer cache。再用 BuildKit cache mount 挂 pnpm store 和构建工具的 .cache。monorepo 可以用 Turborepo remote cache，按文件 hash 复用构建结果。最终镜像只保留 dist 和 nginx，基础镜像固定 digest。关键是让依赖层和构建层都能跨构建复用。
---

### FB-22-CP-A-001：结合蓝绿部署与 CI/CD，谈谈前端零停机发布的实践经验与关键权衡。

**题型**：综合开放题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：蓝绿部署、CI/CD
**出现频率**：中频
**预计回答时长**：5-7 分钟

**题目描述**：
请结合蓝绿部署与 CI/CD，谈谈前端实现零停机发布的实践经验、关键权衡以及踩坑案例。

**参考答案**：

蓝绿部署与 CI/CD 结合的实践经验：

1. **各自定位**：
   - CI/CD：自动化构建、测试、部署，保证发布流程可重复、可追溯。
   - 蓝绿部署：同时维护两套环境，一键切换流量，实现零停机和快速回滚。

2. **协同方式**：
   - CI 阶段：生成带版本号的产物，分别推送到蓝/绿环境的存储位置。
   - CD 阶段：先在绿环境部署并执行自动化验收（E2E、性能、安全扫描）。
   - 切换阶段：通过 Nginx、API Gateway 或 CDN 配置将流量从蓝切到绿。
   - 观察阶段：监控错误率、性能、业务指标，异常时一键切回蓝。

3. **前端落地形式**：
   - 静态资源：按版本目录隔离，如 `/blue/`、`/green/`，切换根目录或回源路径。
   - SSR/容器化：K8s 中通过 Service + Deployment 切换，或 Ingress 权重调整。

4. **关键权衡**：
   - 资源成本 vs 可用性：双环境意味着资源翻倍，需权衡业务重要性。
   - 切换速度 vs 稳定性：切换瞬间要保证无状态、会话一致。
   - 数据兼容性：数据库/schema 变更需兼容蓝绿两版。

5. **常见踩坑**：
   - 切换后立刻删除旧环境资源，导致回滚失败。
   - 新旧版本 API 不兼容，用户拿到新前端但调旧接口。
   - CDN 缓存旧 HTML，切换后用户仍访问旧版本。

**评分维度**：
- 能说清蓝绿部署与 CI/CD 的协同（25%）
- 能结合前端场景说明落地方式（25%）
- 能分析资源、稳定性、兼容性权衡（25%）
- 能分享真实踩坑与改进（15%）
- 能提出可量化的发布指标（10%）

**常见错误**：
- 把蓝绿部署等同于简单的全量发布两次。
- 忽略数据/schema 兼容性。
- 切换后不留观察窗口，立即释放旧环境。

**延伸追问**：
- 蓝绿部署与金丝雀发布能否结合？如何设计？
- 在静态资源场景下，蓝绿切换时如何处理 HTML 缓存？

**相关题目**：
- [FB-22-CO-B-002 部署策略对比](#FB-22-CO-B-002)
- [FB-22-SC-A-010 蓝绿部署在前端的实现与风险](#FB-22-SC-A-010)

**参考资源**：
- [Martin Fowler - Blue Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Spinnaker 部署策略](https://spinnaker.io/docs/concepts/#deployment-strategies)

**口头回答版**：
> 蓝绿部署和 CI/CD 结合，就是 CI 生成版本化产物，CD 把绿环境部署好并跑验收，然后一键切流量。前端静态资源可以按 blue/green 目录隔离，SSR 可以用 K8s Service 切换。权衡主要是资源翻倍换高可用，切换要保证无状态、数据兼容。踩坑包括切换后删旧环境导致回滚失败、CDN 缓存旧 HTML、新旧 API 不兼容。
---

### FB-22-CA-A-001：下面一段金丝雀放量逻辑代码存在什么问题？从 Incident Response 角度分析。

**题型**：代码分析题
**难度**：🔵 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：Incident Response、金丝雀
**出现频率**：低频
**预计回答时长**：5-7 分钟

**题目描述**：
下面是一段前端金丝雀放量逻辑代码，请分析其存在的问题，并从 Incident Response 角度给出改进建议。

```javascript
function isCanaryUser(userId, percent = 10) {
  const hash = userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return hash % 100 < percent;
}

async function rollout() {
  const flags = await fetchFeatureFlags();
  if (flags.newCheckout.enabled && isCanaryUser(getUserId(), flags.newCheckout.percent)) {
    renderNewCheckout();
  } else {
    renderOldCheckout();
  }
}
rollout();
```

**参考答案**：

这段代码存在多处问题：

1. **hash 算法不稳定**：
   - 使用字符 ASCII 和取模，分布不均匀，可能导致某些用户集中命中。
   - 用户 ID 变化时 hash 结果变化，同一用户可能在不同会话看到不同版本。

2. **缺少灰度用户稳定性**：
   - 未将灰度结果持久化（如写入 Cookie/本地存储或后端标记），刷新页面可能切换版本。

3. **缺少监控与熔断**：
   - 没有对新版本关键指标（错误率、转化率）做监控。
   - 没有自动或手动关闭 Feature Flag 的止损逻辑。

4. **Incident Response 角度问题**：
   - 出现故障时无法快速切回旧版本，因为 `flags.newCheckout.enabled` 变更依赖配置中心同步。
   - 没有兜底降级，配置拉取失败时直接走旧版是合理的，但此处未处理 fetch 异常。

5. **改进建议**：
   ```javascript
   const stableHash = (str) => { /* 使用一致性哈希或 MurmurHash */ };
   function isCanaryUser(userId, percent) {
     return stableHash(userId) % 100 < percent;
   }

   async function rollout() {
     try {
       const flags = await fetchFeatureFlags();
       const userId = getUserId();
       const inCanary = flags.newCheckout.enabled && isCanaryUser(userId, flags.newCheckout.percent);
       // 持久化灰度结果，保证会话内一致
       saveCanaryBucket(userId, inCanary);
       if (inCanary) {
         monitor('newCheckout');
         renderNewCheckout();
       } else {
         renderOldCheckout();
       }
     } catch (e) {
       reportError(e);
       renderOldCheckout(); // 失败兜底
     }
   }
   rollout();
   ```

**评分维度**：
- 能指出 hash 算法与稳定性问题（25%）
- 能分析缺少监控与熔断的风险（25%）
- 能从 Incident Response 角度说明止损不足（25%）
- 能给出改进代码（15%）
- 能提到配置拉取失败的兜底（10%）

**常见错误**：
- 只关注语法问题，忽略灰度稳定性。
- 认为简单取模就能满足生产环境。
- 没有从故障止损角度分析。

**延伸追问**：
- 如果配置中心故障，灰度结果如何优雅降级？
- 如何设计灰度用户的埋点，确保监控数据可对比？

**相关题目**：
- [FB-22-SC-A-011 前端金丝雀发布方案](#FB-22-SC-A-011)
- [FB-22-CP-P-021 Incident Response 流程](#FB-22-CP-P-021)

**参考资源**：
- [Martin Fowler - Feature Toggles](https://martinfowler.com/articles/feature-toggles.html)
- [LaunchDarkly - Feature Flag Best Practices](https://docs.launchdarkly.com/home/getting-started/feature-flags)

**口头回答版**：
> 这段代码的问题一是 hash 算法不稳定，分布不好，用户 ID 一变可能就换版本；二是没把灰度结果持久化，刷新可能切换；三是没有监控和熔断，出问题时没法快速止损；四是配置拉取失败没有兜底。改进要用稳定哈希、持久化灰度桶、加监控、配置失败走旧版。
---

### FB-22-EN-P-025：如何在 DevOps 流程中落地前端 HTTPS 全链路安全与证书自动化管理？

**题型**：工程化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：22 部署与 SRE
**标签**：HTTPS、DevOps
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
请说明如何在 DevOps 流程中落地前端 HTTPS 全链路安全，包括证书申请、续期、部署、监控与异常响应。

**参考答案**：

前端 HTTPS 全链路安全落地涉及证书生命周期、传输配置、混合内容治理、监控告警四个层面：

1. **证书自动化管理**：
   - 使用 Let's Encrypt、cert-manager、AWS ACM 等工具自动申请和续期。
   - 证书到期前 30/15/7 天多级告警，避免人工遗忘。
   - 私钥和证书存储在 KMS/HashiCorp Vault，最小权限访问。

2. **CI/CD 集成**：
   - 证书续期后自动同步到 CDN、负载均衡、Ingress。
   - 部署脚本验证证书链完整性与域名匹配。
   - 回滚方案：保留旧证书一段时间，新证书异常时快速切换。

3. **传输安全加固**：
   - 禁用 TLS 1.0/1.1，优先 TLS 1.3。
   - 配置 HSTS（`Strict-Transport-Security`）并预加载到浏览器列表。
   - 启用 OCSP Stapling、证书透明度（CT）监控。

4. **混合内容治理**：
   - 扫描页面中 HTTP 资源引用，阻断或自动升级（CSP upgrade-insecure-requests）。
   - 第三方 SDK、字体、图片必须走 HTTPS。

5. **监控与响应**：
   - 监控证书有效期、TLS 握手失败率、混合内容告警。
   - 建立 Incident Response 流程：证书异常 → 自动切换备用 → 人工介入 → 复盘。

**评分维度**：
- 能说明证书自动化申请与续期（25%）
- 能描述 CI/CD 中证书部署与回滚（25%）
- 能提到 TLS 版本、HSTS、OCSP 等加固（25%）
- 能说明混合内容治理与监控响应（15%）
- 能提到密钥安全管理（10%）

**常见错误**：
- 证书手动管理，临近过期才发现。
- 只配置 HTTPS，忽略 HSTS 和 TLS 版本。
- 生产环境证书私钥暴露在代码仓库。

**延伸追问**：
- 如果 CDN 边缘节点证书更新不同步，如何解决？
- Let's Encrypt 续期失败时，如何保障服务不中断？

**相关题目**：
- [FB-22-CO-B-006 HTTPS/TLS 基础](#FB-22-CO-B-006)
- [FB-22-SE-A-016 HTTPS/TLS 部署安全要点](#FB-22-SE-A-016)

**参考资源**：
- [Let's Encrypt - Getting Started](https://letsencrypt.org/getting-started/)
- [cert-manager 官方文档](https://cert-manager.io/docs/)

**口头回答版**：
> 前端 HTTPS 要在 DevOps 里自动化：用 cert-manager 或 ACM 自动申请续期证书，到期前多级告警，私钥存 KMS。CI/CD 里自动同步到 CDN、LB、Ingress，部署时验证证书链。传输上禁用老 TLS、开 HSTS、OCSP Stapling。还要治理混合内容，监控证书有效期和握手失败率，证书异常时自动切备用。
---

### FB-22-SE-P-001：使用 Vercel/边缘平台托管前端时，监控与可观测性方面有哪些安全风险？如何防御？

**题型**：安全题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：22 部署与 SRE
**标签**：监控、Vercel
**出现频率**：低频
**预计回答时长**：7-10 分钟

**题目描述**：
使用 Vercel、Cloudflare Pages、Netlify 等边缘平台托管前端时，监控与可观测性数据在采集、传输、存储过程中可能面临哪些安全风险？如何防御？

**参考答案**：

边缘平台监控与可观测性的安全风险：

1. **日志与指标中的敏感信息泄露**：
   - 边缘 Function 日志可能包含用户 Cookie、Token、查询参数。
   - 防御：日志脱敏，禁止记录完整 URL、请求体、Authorization 头。

2. **第三方分析脚本的安全风险**：
   - 为监控引入的 Google Analytics、Sentry 等脚本可能成为 XSS 入口。
   - 防御：CSP 限制脚本来源，SRI 校验，使用自建或私有部署的监控平台。

3. **边缘平台权限过度授权**：
   - Vercel/Cloudflare 的 Token 权限过大，泄露后可被用于篡改部署或读取日志。
   - 防御：最小权限原则，使用 Scoped Token，定期轮换，CI 中通过 secrets 管理。

4. **监控数据跨境与合规**：
   - 用户行为数据、错误日志可能存储在海外节点，违反数据本地化要求。
   - 防御：选择合规区域，配置数据保留策略，敏感字段加密或不上报。

5. **可观测性数据被篡改**：
   - 攻击者伪造监控指标，掩盖真实攻击痕迹。
   - 防御：上报接口签名认证，服务端做异常检测与清洗。

6. **Serverless Function 冷启动信息泄露**：
   - 错误处理不当可能泄露环境变量、内部路径。
   - 防御：统一错误兜底，生产环境关闭详细堆栈。

**评分维度**：
- 能识别日志敏感信息泄露风险（25%）
- 能说明第三方脚本与权限控制风险（25%）
- 能提到数据跨境与合规（20%）
- 能给出脱敏、签名、CSP 等防御措施（20%）
- 能结合具体边缘平台说明（10%）

**常见错误**：
- 认为边缘平台天然安全，忽略日志脱敏。
- 给 CI/CD Token 过高权限。
- 监控数据无留存期限，长期堆积。

**延伸追问**：
- 如何在 Vercel Edge Function 中安全地记录用户错误？
- 如果监控平台本身被入侵，如何保护业务不受影响？

**相关题目**：
- [FB-22-SE-A-017 前端监控数据安全风险](#FB-22-SE-A-017)
- [FB-22-SC-P-019 Serverless 与边缘部署](#FB-22-SC-P-019)

**参考资源**：
- [Vercel Security](https://vercel.com/docs/security)
- [Cloudflare Security Center](https://developers.cloudflare.com/security-center/)

**口头回答版**：
> 用 Vercel 这类边缘平台时，监控日志可能泄露用户 Cookie、Token，第三方分析脚本可能成 XSS 入口，平台 Token 权限过大也有风险。防御上要日志脱敏、CSP 和 SRI 限制脚本、Token 最小权限并轮换、注意数据跨境合规、上报接口加签名。错误处理不要泄露环境变量和内部路径。
---

### FB-22-SD-P-001：如何设计一个 SSR 前端应用的部署策略系统，支持灰度、回滚与降级？

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：22 部署与 SRE
**标签**：SSR、部署策略
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
请设计一个 SSR 前端应用的部署策略系统，支持版本化管理、灰度发布、一键回滚与故障降级。

**参考答案**：

SSR 部署策略系统核心设计：

1. **版本化与制品管理**：
   - 每次构建生成 Docker 镜像，tag 包含版本号与 git commit。
   - 镜像推送到 Harbor/ECR，同时记录版本元数据（构建时间、变更列表、SLO 基线）。

2. **多环境部署**：
   - dev/staging 自动部署，prod 需审批。
   - 使用 Kubernetes Deployment 管理不同版本副本。

3. **灰度发布**：
   - Ingress/Service Mesh 按流量比例、header、cookie、用户 ID 切分。
   - 灰度阶段持续监控错误率、P99 延迟、渲染成功率。
   - 配置自动扩缩容，避免灰度实例被压垮。

4. **一键回滚**：
   - 保留最近 N 个版本镜像，回滚时修改 Deployment 镜像 tag 或 Ingress 权重。
   - 回滚触发条件：监控告警、自动化测试失败、人工决策。
   - 回滚过程记录审计日志。

5. **故障降级**：
   - SSR 服务异常时，Ingress 返回 CDN 缓存页面或静态降级页。
   - 核心数据接口失败时，页面展示默认数据或 skeleton。
   - 支持手动切换“仅 CSR 模式”，绕过 SSR。

6. **SRE 可观测性**：
   - 日志、指标、链路追踪全覆盖。
   - 版本级别的 SLO 看板，快速对比新旧版本表现。

**评分维度**：
- 能设计版本化与制品管理（20%）
- 能说明灰度发布与流量切分（25%）
- 能描述一键回滚触发与流程（20%）
- 能提到 SSR 降级策略（20%）
- 能说明可观测性设计（15%）

**常见错误**：
- SSR 与静态资源版本不匹配，导致 hydration 失败。
- 回滚只回滚 SSR 服务，不回滚静态资源。
- 没有降级方案，SSR 一挂就全站不可用。

**延伸追问**：
- SSR 灰度时，如何确保静态资源版本与 SSR 版本一致？
- 如果回滚后用户浏览器仍持有新版本的 JS，怎么处理？

**相关题目**：
- [FB-22-SC-A-011 前端金丝雀发布方案](#FB-22-SC-A-011)
- [FB-22-PE-A-014 SSR 高可用性能优化](#FB-22-PE-A-014)

**参考资源**：
- [Kubernetes Deployment Rollout](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Next.js Self-hosting](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting)

**口头回答版**：
> SSR 部署策略系统要把每次构建打成带版本 tag 的 Docker 镜像，存在 Harbor。K8s 管理多版本副本，Ingress 按流量或 header 灰度，监控错误率和 P99。保留最近 N 个版本支持一键回滚。降级方面，SSR 挂了可以返回 CDN 缓存页或静态页，也可以切纯 CSR。还要做全链路可观测，按版本看 SLO。
---

### FB-22-CP-P-022：结合高可用架构与告警体系，谈谈前端服务的故障发现与止损实践。

**题型**：综合开放题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：22 部署与 SRE
**标签**：高可用、告警
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
请结合前端服务的高可用架构与告警体系，谈谈你如何设计故障发现、响应与止损机制，并分享实践经验。

**参考答案**：

前端服务故障发现与止损应覆盖“监控 → 告警 → 定位 → 止损 → 复盘”全链路：

1. **分层监控体系**：
   - 基础设施层：CPU、内存、网络、磁盘、节点健康。
   - 应用层：SSR 渲染成功率、API 响应时间、错误率、QPS。
   - 用户体验层：RUM 采集的 LCP、CLS、INP、白屏率、JS 错误率。
   - 业务层：核心流程转化率、支付成功率、登录成功率。

2. **告警设计**：
   - 按严重程度分 P0/P1/P2，避免告警风暴。
   - 使用 SLO/Error Budget 触发告警，例如错误率超过预算的 5%。
   - 告警信息包含上下文：版本号、影响范围、相关链路、推荐止损动作。

3. **高可用架构配合**：
   - 多可用区/多区域部署，避免单点。
   - 自动扩容与熔断，防止故障扩散。
   - CDN 缓存与降级页兜底。

4. **止损手段**：
   - 自动：监控触发阈值后自动回滚、切流量、开降级。
   - 半自动：发布平台一键回滚、一键切流量。
   - 人工：on-call 介入，按 runbook 执行。

5. **复盘与改进**：
   - MTTR、MTTD 等指标量化响应效率。
   - 每次故障更新 runbook 和自动化预案。

**评分维度**：
- 能设计分层监控与告警（30%）
- 能说明高可用架构与止损联动（25%）
- 能描述自动/半自动/人工止损策略（25%）
- 能结合实践经验与复盘机制（15%）
- 能提出可量化指标（5%）

**常见错误**：
- 只监控服务器指标，忽略用户体验指标。
- 告警阈值过低导致告警疲劳。
- 止损依赖人工，缺乏自动化预案。

**延伸追问**：
- 如何衡量告警的准确率和覆盖率？
- 自动回滚触发后，如何防止误回滚？

**相关题目**：
- [FB-22-CP-P-021 Incident Response 流程](#FB-22-CP-P-021)
- [FB-22-CO-B-009 SLA/SLO/SLI 设定与保障](#FB-22-CO-B-009)

**参考资源**：
- [Google SRE - Monitoring](https://sre.google/sre-book/monitoring-distributed-systems/)
- [PagerDuty Incident Response](https://www.pagerduty.com/resources/learn/incident-response/)

**口头回答版**：
> 我会做四层监控：基础设施、应用、用户体验、业务。告警按 P0/P1/P2 分级，用 SLO/Error Budget 触发，告警里带上下文和推荐动作。高可用靠多可用区、自动扩容、熔断、CDN 缓存兜底。止损分自动回滚、半自动一键切流量、人工按 runbook。最后复盘量化 MTTR，更新预案。
---

### FB-22-CA-P-001：下面一段 SSG/边缘渲染配置与缓存策略代码输出什么？请分析其对性能的影响。

**题型**：代码分析题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：22 部署与 SRE
**标签**：SSG、边缘渲染
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
下面是一段 Next.js 边缘渲染与缓存配置代码，请分析其运行结果、缓存行为及对性能的影响。

```javascript
// app/page.tsx
export const runtime = 'edge';
export const revalidate = 60;

export default async function Page() {
  const data = await fetch('https://api.example.com/dashboard', {
    next: { revalidate: 300 },
  });
  const json = await data.json();
  return <Dashboard data={json} />;
}
```

**参考答案**：

运行结果与缓存行为分析：

1. **`runtime = 'edge'`**：
   - 该页面在边缘节点（Edge Function）运行，降低 SSR 延迟，提升全球访问体验。

2. **页面级 `revalidate = 60`**：
   - 页面整体 ISR 缓存 60 秒，60 秒内同一请求命中边缘缓存，直接返回。
   - 过期后首次请求会触发后台重新渲染（stale-while-revalidate）。

3. **fetch `revalidate: 300`**：
   - 数据请求层缓存 300 秒，Next.js 会缓存该 fetch 结果。
   - 数据缓存时间长于页面缓存，意味着页面重新渲染时可能复用缓存数据。

性能影响：
- **优点**：
  - 边缘渲染降低 TTFB，ISR 提升缓存命中率。
  - 数据层缓存减少回源 API 压力。
- **潜在问题**：
  - 页面缓存 60s、数据缓存 300s，可能出现页面已刷新但数据仍是 5 分钟前的情况，一致性需评估。
  - 边缘 Function 有 CPU/内存限制，复杂渲染可能超时或被限制。
  - `fetch` 异常时，默认不会使用缓存数据，需配置 `cache: 'force-cache'` 或错误降级。

优化建议：
- 根据数据实时性要求统一或明确区分页面与数据缓存时间。
- 对关键 API 配置超时与降级，避免边缘 Function 长时间等待。
- 监控边缘渲染命中率与 Function 执行时间。

**评分维度**：
- 能解释 edge runtime 与 ISR 行为（30%）
- 能分析页面与数据缓存时间差异（25%）
- 能指出性能优势与一致性风险（25%）
- 能给出优化建议（10%）
- 能提到边缘 Function 限制（10%）

**常见错误**：
- 认为 revalidate 会让所有用户立刻看到新数据。
- 忽略页面缓存与数据缓存时间不一致。
- 未考虑 fetch 失败时的降级。

**延伸追问**：
- 如果 dashboard 数据需要强一致性，如何调整缓存策略？
- 边缘 Function 超时或被限流时，如何降级？

**相关题目**：
- [FB-22-SC-P-018 SSG/SSR/ISR/CSR 混合部署](#FB-22-SC-P-018)
- [FB-22-SD-R-032 多区域 SSG 系统设计](#FB-22-SD-R-032)

**参考资源**：
- [Next.js Edge Runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)

**口头回答版**：
> 这段代码用 edge runtime 跑页面，ISR 缓存 60 秒，fetch 数据缓存 300 秒。边缘渲染能降低 TTFB，ISR 提升命中率，但页面和数据缓存时间不一致，可能导致页面新但数据旧。还要注意边缘 Function 的 CPU 内存限制，fetch 失败要降级。优化时最好根据数据实时性统一缓存时间，监控命中率和执行时间。
---

### FB-22-CD-P-001：请手写一个用于前端 Incident Response 的健康检查与熔断决策函数。

**题型**：手写代码题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：22 部署与 SRE
**标签**：架构设计、Incident Response
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
请手写一个健康检查与熔断决策函数，输入为最近 N 次请求的健康状态，输出是否触发熔断，并说明设计思路。

**参考答案**：

```javascript
/**
 * 健康检查与熔断决策器
 * @param {Array<boolean>} history 最近 N 次请求是否成功
 * @param {Object} config 配置
 * @param {number} config.windowSize 滑动窗口大小
 * @param {number} config.failureThreshold 失败率阈值，0-1
 * @param {number} config.minSamples 最小样本数
 * @returns {Object} { open: boolean, failureRate: number }
 */
function circuitBreakerDecision(history, config = {}) {
  const {
    windowSize = 10,
    failureThreshold = 0.5,
    minSamples = 5,
  } = config;

  // 取最近 windowSize 条记录
  const window = history.slice(-windowSize);
  const total = window.length;

  if (total < minSamples) {
    return { open: false, failureRate: 0, reason: 'INSUFFICIENT_SAMPLES' };
  }

  const failures = window.filter(v => v === false).length;
  const failureRate = failures / total;

  return {
    open: failureRate >= failureThreshold,
    failureRate: Number(failureRate.toFixed(4)),
    windowSize: total,
    failures,
    reason: failureRate >= failureThreshold ? 'THRESHOLD_EXCEEDED' : 'HEALTHY',
  };
}

// 示例
const history = [true, true, false, true, false, false, false, true, false, false];
console.log(circuitBreakerDecision(history, { windowSize: 10, failureThreshold: 0.5, minSamples: 5 }));
// { open: true, failureRate: 0.6, windowSize: 10, failures: 6, reason: 'THRESHOLD_EXCEEDED' }
```

设计思路：
1. **滑动窗口**：只关注最近 N 次请求，避免历史数据掩盖当前故障。
2. **最小样本数**：样本不足时不熔断，防止偶发失败误伤。
3. **失败率阈值**：超过阈值触发熔断，阻止流量继续打到异常服务。
4. **可扩展**：可补充半开状态、冷却时间、渐进式恢复。

生产增强：
- 按错误类型加权（5xx 权重高于 4xx）。
- 结合 P99 延迟、并发数多维判断。
- 熔断后异步通知告警系统，触发自动降级或回滚。

**评分维度**：
- 函数实现正确（40%）
- 能说明滑动窗口与阈值设计（25%）
- 能处理边界情况（空输入、样本不足）（20%）
- 能提到生产增强（加权、半开状态、告警联动）（15%）

**常见错误**：
- 只统计总失败次数，不计算失败率。
- 没有最小样本保护，偶发失败就熔断。
- 忽略边界情况，如空数组。

**延伸追问**：
- 如何实现半开状态，让少量请求试探恢复？
- 如果历史数据很大，如何优化内存占用？

**相关题目**：
- [FB-22-CP-P-021 Incident Response 流程](#FB-22-CP-P-021)
- [FB-22-EN-A-013 Ingress 故障隔离](#FB-22-EN-A-013)

**参考资源**：
- [Martin Fowler - Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html)
- [AWS - Circuit Breaker Pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html)

**口头回答版**：
> 我实现一个滑动窗口的熔断决策函数，取最近 N 次请求，计算失败率，超过阈值且样本数足够就触发熔断。要处理样本不足和空数组的边界。生产中可以按错误类型加权、加半开状态、联动告警和自动降级。
---

### FB-22-FS-P-001：Lighthouse CI 如何集成到部署流水线中实现性能门禁与零停机发布？

**题型**：框架原理题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：22 部署与 SRE
**标签**：Lighthouse、零停机
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
请解释 Lighthouse CI 的核心实现原理，并说明如何将其集成到前端部署流水线中实现性能门禁与零停机发布。

**参考答案**：

Lighthouse CI 核心原理：

1. **基于 Lighthouse 审计**：
   - 使用 Chrome DevTools Protocol（CDP）驱动无头 Chrome 加载页面。
   - 收集性能、可访问性、最佳实践、SEO、PWA 五类指标。

2. **CI 集成方式**：
   - `lhci autorun` 命令在 CI 中自动运行审计。
   - 配置文件 `lighthouserc.js` 指定待测 URL、运行次数、断言阈值、上传服务器。

3. **性能门禁**：
   - 在 `assert` 中设定阈值，如 `categories:performance >= 0.9`。
   - 对关键指标设定绝对值：LCP <= 2500ms、CLS <= 0.1。
   - 断言失败时阻断流水线，防止低质量代码上线。

4. **与部署流水线结合实现零停机**：
   - 预发环境部署后先跑 Lighthouse CI，通过后再进入生产灰度。
   - 将性能数据持久化到 Lighthouse CI Server，追踪历史趋势。
   - 生产发布后持续监控 RUM 指标，与 Lighthouse 实验室数据对比。

5. **零停机注意事项**：
   - 性能测试应在接近生产的环境中进行，避免 dev 环境数据失真。
   - 静态资源需预热到 CDN，否则冷启动影响指标。
   - 断言阈值要合理，避免过度严格导致发布阻塞。

**评分维度**：
- 能解释 Lighthouse 审计原理（25%）
- 能说明 lhci autorun 与配置文件（20%）
- 能设计性能门禁断言（25%）
- 能描述与部署流水线及零停机发布的结合（20%）
- 能提到实验室数据与 RUM 数据的差异（10%）

**常见错误**：
- 只在本地跑一次 Lighthouse，未集成到 CI。
- 阈值设定脱离业务实际，导致频繁失败。
- 忽略网络环境与 CDN 预热对指标的影响。

**延伸追问**：
- Lighthouse 实验室数据与真实用户 RUM 数据不一致时，以哪个为准？
- 如何在 monorepo 中为多个应用分别配置 Lighthouse CI？

**相关题目**：
- [FB-22-CO-B-001 CI/CD 流水线阶段](#FB-22-CO-B-001)
- [FB-22-PE-A-014 SSR 高可用性能优化](#FB-22-PE-A-014)

**参考资源**：
- [Lighthouse CI 官方文档](https://github.com/GoogleChrome/lighthouse-ci)
- [Web.dev - Lighthouse performance scoring](https://web.dev/articles/performance-scoring)

**口头回答版**：
> Lighthouse CI 用 CDP 驱动无头 Chrome 跑审计，收集性能、可访问性等指标。集成到 CI 时用 lhci autorun 和 lighthouserc.js 配置 URL、阈值和上传服务器。可以设性能门禁，比如 performance >= 0.9，LCP <= 2.5s，失败阻断流水线。预发环境跑通过后灰度上线，数据存到 Lighthouse CI Server 看趋势。注意要在接近生产环境测，发布前预热 CDN。
---

### FB-22-SS-P-001：请分享一次你主导前端容灾演练或 Feature Flag 紧急关闭故障的经历。

**题型**：软技能题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：22 部署与 SRE
**标签**：容灾、Feature Flag
**出现频率**：高频
**预计回答时长**：7-10 分钟

**题目描述**：
请结合一个实际故障或演练案例，谈谈你在前端容灾、Feature Flag 紧急关闭或发布回滚中的决策过程与团队协作经验。

**参考答案**：

建议按 STAR 结构组织：

1. **背景（Situation）**：
   - 例如：大促期间新版本支付页转化率骤降，或某 Feature Flag 导致核心页面白屏。

2. **任务（Task）**：
   - 快速止损，恢复服务，降低业务损失。

3. **行动（Action）**：
   - 检测：通过监控告警或用户反馈发现异常。
   - 定位：快速确认是前端问题、后端接口问题还是配置问题。
   - 止损：
     - 如果是 Feature Flag 问题，立即在配置平台关闭该 flag。
     - 如果是版本问题，执行一键回滚或切流量到旧版本。
     - 如果是 CDN 问题，切换备用 CDN 或刷新缓存。
   - 沟通：同步进度到业务方、客服、管理层，安抚用户。
   - 验证：监控核心指标恢复，确认止损有效。

4. **结果（Result）**：
   - 量化止损效果：例如 5 分钟内恢复，避免损失 X 万元；或演练发现 3 个预案漏洞。

5. **反思（Reflection）**：
   - 为什么检测/定位慢？如何改进监控与 runbook。
   - Feature Flag 权限是否过于分散？是否需加审批。
   - 复盘后更新了哪些预案和自动化策略。

**评分维度**：
- 案例真实具体，有明确时间线与影响范围（30%）
- 决策过程清晰，体现判断力与担当（25%）
- 团队协作与沟通能力强（20%）
- 有量化结果与复盘改进（15%）
- 方法论可复用（10%）

**常见错误**：
- 只讲技术操作，不讲决策和沟通。
- 案例过于简单，没有体现压力下的判断。
- 忽略复盘，显得没有成长。

**延伸追问**：
- 当时有没有人与你意见不一致？你如何说服他们？
- 如果故障发生在深夜，你的 on-call 机制如何保障响应？

**相关题目**：
- [FB-22-CP-P-021 Incident Response 流程](#FB-22-CP-P-021)
- [FB-22-SC-A-011 前端金丝雀发布方案](#FB-22-SC-A-011)

**参考资源**：
- [Google SRE - Managing Incidents](https://sre.google/sre-book/managing-incidents/)
- [Atlassian Incident Management Handbook](https://www.atlassian.com/incident-management)

**口头回答版**：
> 我讲一个真实案例：大促时监控发现支付页转化率骤降，定位到是新 Feature Flag 导致部分用户白屏。我立刻在配置平台关闭 flag，同时通知业务方和客服。5 分钟后指标恢复。复盘时发现 flag 放量太快、缺少自动熔断，后来我们加了按错误率自动关闭和审批流程。关键是止损要快，沟通要同步，复盘要落地。
---

### FB-22-CO-P-023：请解释 Kubernetes Ingress/Service 流量切分的工作原理，及其在前端容器化部署中的应用。

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：22 部署与 SRE
**标签**：流量切分、容器化
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
请解释 Kubernetes 中 Ingress 与 Service 实现流量切分的工作原理，并说明其在前端容器化部署中的典型应用场景。

**参考答案**：

Kubernetes 流量切分工作原理：

1. **Service 层负载均衡**：
   - Service 通过 selector 匹配 Pod，维护后端 endpoints 列表。
   - kube-proxy 或 CNI 实现 cluster IP 到 Pod IP 的转发，支持 Round Robin 等算法。

2. **Ingress 层七层路由**：
   - Ingress 资源定义 host/path 路由规则，由 Ingress Controller（NGINX、Traefik、Istio Gateway 等）实现。
   - 支持基于权重、header、cookie 的流量切分。

3. **典型流量切分方式**：
   - **Canary**：Ingress-NGINX 通过 `canary-weight` annotation 按比例切流。
   - **Header/Cookie**：通过 `canary-by-header`、`canary-by-cookie` 让特定用户访问新版本。
   - **Blue/Green**：同时存在两个 Service/Deployment，修改 Ingress backend 切换流量。

前端容器化部署中的应用：

1. **灰度发布**：
   - 新版本 frontend-v2 部署为独立 Deployment，Ingress 按 5% → 20% → 50% → 100% 放量。

2. **A/B 测试**：
   - 按 Cookie 中实验分组标识，将用户导向不同版本。

3. **版本回滚**：
   - 切换 Ingress backend 到旧版本 Service，秒级回滚。

4. **环境隔离**：
   - 通过不同 host（如 `beta.example.com`）路由到不同 Service。

注意事项：
- 前端静态资源版本需与 SSR 版本匹配，避免 hydration 失败。
- 灰度用户会话一致性需通过 Cookie 或后端标记保证。
- 流量切分规则变更需纳入 GitOps，审计与回滚。

**评分维度**：
- 能解释 Service 与 Ingress 的分工（25%）
- 能说明 weight/header/cookie 切分方式（30%）
- 能结合前端灰度/回滚/A/B 说明应用（25%）
- 能提到版本一致性与 GitOps（10%）
- 能举例 Ingress annotation（10%）

**常见错误**：
- 把 Ingress 和 Service 混为一谈。
- 只讲权重切分，忽略 header/cookie 方式。
- 前端 SSR 灰度时忽略静态资源版本匹配。

**延伸追问**：
- Service Mesh（如 Istio）相比 Ingress-NGINX 在流量切分上有什么优势？
- 前端 SSR 灰度时，如何确保 API 版本也同步灰度？

**相关题目**：
- [FB-22-SC-A-011 前端金丝雀发布方案](#FB-22-SC-A-011)
- [FB-22-SD-P-001 SSR 部署策略系统](#FB-22-SD-P-001)

**参考资源**：
- [Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [NGINX Ingress Canary Deployment](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#canary)

**口头回答版**：
> Kubernetes 里 Service 负责 Pod 级别的负载均衡，Ingress 负责七层路由。流量切分可以通过 Ingress 的 canary-weight 按比例，也可以用 canary-by-header/cookie 让特定用户进新版本。前端容器化部署用它做灰度发布、A/B 测试、版本回滚。要注意 SSR 版本和静态资源版本一致，灰度规则纳入 GitOps。
---

### FB-22-SD-R-032：如何设计一个支持多区域部署的 SSG 前端系统，兼顾数据合规与访问延迟？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：22 部署与 SRE
**标签**：多区域、SSG
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个面向全球用户的 SSG 前端系统，要求支持多区域部署、数据合规（如 GDPR、数据本地化）并降低访问延迟。

**参考答案**：

多区域 SSG 前端系统设计：

1. **内容生成与分发**：
   - 构建阶段生成静态页面，按区域/语言拆分内容源。
   - 使用 ISR 按需重新生成页面，平衡实时性与性能。
   - 页面产物推送到多个区域的对象存储（S3/OSS），作为 CDN 源站。

2. **多区域 CDN 架构**：
   - 每个区域部署独立 CDN，边缘节点就近服务。
   - 通过 GeoDNS 或 Anycast 将用户请求导向最近区域。
   - 静态资源长期缓存，HTML 按区域策略短缓存。

3. **数据合规**：
   - 用户个人数据只存储在指定区域，静态页面不包含 PII。
   - 客户端动态数据通过区域化 API 网关获取，遵守数据本地化要求。
   - 提供区域选择/同意管理组件，满足 GDPR 同意机制。

4. **区域化内容管理**：
   - CMS 按区域/语言发布内容，构建时拉取对应内容源。
   - 对价格、库存等实时数据，SSG 页面预留占位，客户端按需填充。

5. **可观测与故障切换**：
   - 监控各区域 CDN 命中率、构建成功率、API 延迟。
   - 某个区域故障时，DNS/网关切换流量到备用区域，必要时返回通用静态页。

6. **成本控制**：
   - 公共资源（JS/CSS/图片）使用全局 CDN，减少重复存储。
   - 按访问量决定哪些区域做全量 SSG，哪些区域用边缘渲染 fallback。

**评分维度**：
- 能设计多区域内容生成与 CDN 架构（30%）
- 能说明数据合规与区域化 API 设计（25%）
- 能提到 ISR/边缘渲染与实时数据折中（20%）
- 能描述故障切换与可观测（15%）
- 能考虑成本与可维护性（10%）

**常见错误**：
- 所有区域共用一份内容和数据源，忽略合规。
- 静态页面中嵌入用户个人数据。
- 多区域部署但没有统一监控和切换机制。

**延伸追问**：
- 如果某国法律要求数据不出境，如何设计构建和内容管理？
- 多区域 SSG 如何保证不同区域用户看到一致的公共样式和组件？

**相关题目**：
- [FB-22-SD-R-026 全球化多区域部署架构](#FB-22-SD-R-026)
- [FB-22-CA-P-001 SSG/边缘渲染缓存分析](#FB-22-CA-P-001)

**参考资源**：
- [Cloudflare - Multi-region architecture](https://www.cloudflare.com/learning/performance/what-is-a-cdn/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

**口头回答版**：
> 多区域 SSG 要按区域/语言生成页面，产物推到各区域对象存储，用 GeoDNS 或 Anycast 导向最近 CDN。静态资源长期缓存，HTML 短缓存。数据合规方面，PII 不上静态页，动态数据走区域化 API。用 ISR 平衡实时性，区域故障时切到备用区。公共资源用全局 CDN 省成本。
---

### FB-22-CP-R-031：结合质量门禁与金丝雀发布，谈谈如何构建前端自动化发布风险控制体系。

**题型**：综合开放题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：22 部署与 SRE
**标签**：质量门禁、金丝雀
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请结合质量门禁与金丝雀发布，谈谈如何为前端构建一套自动化发布风险控制体系，并说明组织与流程上的配套措施。

**参考答案**：

前端自动化发布风险控制体系：

1. **质量门禁体系**：
   - 代码门禁：Lint、Type Check、单测覆盖率、Commit Message 规范。
   - 构建门禁：产物体积增长、构建时间、Source Map 校验。
   - 安全门禁：依赖漏洞扫描（npm audit/Snyk）、SRI 校验、密钥泄露扫描。
   - 性能门禁：Lighthouse CI、Core Web Vitals 阈值、资源加载预算。
   - 验收门禁：E2E 测试、视觉回归、关键业务链路自动化测试。

2. **金丝雀发布体系**：
   - 灰度维度：流量比例、用户 ID、地域、设备、业务模块。
   - 观测指标：错误率、性能指标、业务转化率、资源可用性。
   - 自动止损：指标超过阈值自动回滚或关闭 Feature Flag。
   - 放量策略：1% → 5% → 20% → 50% → 100%，每个阶段有观察窗口。

3. **自动化串联**：
   - 代码合并 → CI 门禁 → 构建 → 预发部署 → 验收 → 金丝雀 → 全量。
   - 任一阶段失败自动阻断，通知相关负责人。
   - 发布平台记录每次发布的版本、指标、决策人，便于审计。

4. **组织与流程配套**：
   - 定义发布负责人与值班机制。
   - 建立 on-call runbook 与故障演练机制。
   - 将 SLO/Error Budget 与发布节奏挂钩，避免频繁发布耗尽预算。
   - 定期复盘发布事故，更新门禁与灰度策略。

5. **权衡与演进**：
   - 门禁过严会降低发布效率，需根据业务阶段调整。
   - 金丝雀观察时间与用户量需统计显著，避免误判。

**评分维度**：
- 能设计分层质量门禁（30%）
- 能说明金丝雀发布与自动止损（30%）
- 能描述 CI/CD 自动化串联（20%）
- 能提到组织流程与 SLO 联动（15%）
- 能分析权衡与演进（5%）

**常见错误**：
- 只重视技术门禁，忽略流程与组织保障。
- 金丝雀只看技术指标，忽略业务指标。
- 门禁失败不阻断，流于形式。

**延伸追问**：
- 如何平衡质量门禁严格度与发布频率？
- 如果业务方要求紧急发布，如何绕过或加速门禁？

**相关题目**：
- [FB-22-SC-A-011 前端金丝雀发布方案](#FB-22-SC-A-011)
- [FB-22-CO-B-009 SLA/SLO/SLI 设定与保障](#FB-22-CO-B-009)

**参考资源**：
- [Google SRE - Release Engineering](https://sre.google/sre-book/release-engineering/)
- [Spinnaker - Automated Canary Analysis](https://spinnaker.io/docs/guides/user/canary/)

**口头回答版**：
> 风险控制体系分质量门禁和金丝雀发布两层。门禁包括代码 lint、测试、构建体积、安全扫描、Lighthouse 性能、E2E 验收。金丝雀按流量或用户维度放量，监控错误率、性能、业务转化，异常自动回滚。CI/CD 把门禁、预发、灰度、全量串起来，失败阻断。组织上要有发布负责人、on-call、runbook，把 SLO 和发布节奏挂钩。
---

### FB-22-CA-R-001：下面一段基于版本化策略的资源路由代码输出什么？请从 SRE 角度分析风险。

**题型**：代码分析题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：22 部署与 SRE
**标签**：版本化、SRE
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
下面是一段前端资源版本化路由代码，请分析其输出结果，并从 SRE 角度指出潜在风险。

```javascript
const releases = {
  'v1.2.0': { hash: 'abc123', active: true },
  'v1.1.9': { hash: 'def456', active: false },
  'v1.1.8': { hash: 'ghi789', active: false },
};

function getAssetPath(version, file) {
  const release = releases[version] || releases['v1.2.0'];
  return `https://cdn.example.com/${release.hash}/${file}`;
}

console.log(getAssetPath('v1.1.9', 'app.js'));
console.log(getAssetPath('v999', 'app.js'));
```

**参考答案**：

输出结果：
```text
https://cdn.example.com/def456/app.js
https://cdn.example.com/abc123/app.js
```

SRE 角度风险分析：

1. **回滚能力不足**：
   - `active` 字段存在但未使用，无法通过配置快速切换线上活跃版本。
   - 应该由 `active` 决定默认版本，而不是硬编码 `v1.2.0`。

2. **版本不存在时静默回退**：
   - `v999` 不存在时回退到 `v1.2.0`，可能掩盖配置错误。
   - 更安全的做法是返回 404 或告警，而不是默认最新版。

3. **历史版本未清理**：
   - `v1.1.8`、`v1.1.9` 仍保留，如果存在已知漏洞，攻击者可能强制引用旧版本。
   - 应定期清理过期版本，或标记废弃版本不可访问。

4. **缺少审计与监控**：
   - 没有记录访问了哪个版本、哪个 hash，问题排查困难。
   - 应对版本切换和回滚操作做审计日志，并监控各版本流量占比。

5. **单点配置风险**：
   - `releases` 配置集中在前端代码中，更新需重新发版。
   - 应放到配置中心或 CDN 边缘配置，支持秒级切换。

改进建议：
```javascript
function getAssetPath(requestedVersion, file) {
  const activeVersion = Object.entries(releases).find(([, v]) => v.active)?.[0];
  const version = releases[requestedVersion] ? requestedVersion : activeVersion;
  if (!version) throw new Error('No active release');
  return `https://cdn.example.com/${releases[version].hash}/${file}`;
}
```

**评分维度**：
- 能正确分析代码输出（15%）
- 能指出 active 字段未使用与回滚能力不足（25%）
- 能分析版本回退与历史版本风险（20%）
- 能提到审计监控与配置中心（20%）
- 能给出改进代码（10%）
- 能从 SRE 全局视角总结（10%）

**常见错误**：
- 只回答输出结果，不分析风险。
- 认为回退到最新版总是安全的。
- 忽略历史版本漏洞风险。

**延伸追问**：
- 如果配置中心故障，getAssetPath 如何优雅降级？
- 如何监控线上各版本的实际流量占比？

**相关题目**：
- [FB-22-EN-B-005 前端构建产物版本化管理](#FB-22-EN-B-005)
- [FB-22-EN-A-012 前端自动回滚](#FB-22-EN-A-012)

**参考资源**：
- [SemVer 规范](https://semver.org/lang/zh-CN/)
- [Google SRE - Configuration Management](https://sre.google/sre-book/configuration-management/)

**口头回答版**：
> 输出分别是 v1.1.9 的 def456 和 v1.2.0 的 abc123。从 SRE 角度看，active 字段没使用，不能快速切换版本；v999 不存在时静默回退到最新版，可能掩盖错误；历史版本没清理有漏洞风险；缺少审计和监控。改进后应该由 active 决定默认版本，不存在时抛错或告警，配置放到配置中心支持秒切。
---

### FB-22-CD-R-001：请手写一个前端资源缓存策略决策函数，根据文件名和环境返回 Cache-Control 头。

**题型**：手写代码题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：22 部署与 SRE
**标签**：缓存策略、架构设计
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请手写一个函数，根据请求的文件名和环境返回合适的 Cache-Control 响应头。要求：带 hash 的 JS/CSS 长期缓存，HTML 不缓存或短缓存，未知文件保守处理。

**参考答案**：

```javascript
/**
 * 根据文件名和环境生成 Cache-Control 头
 * @param {string} filename 文件路径或文件名
 * @param {string} env 环境：dev | staging | prod
 * @returns {Object} { cacheControl: string, reason: string }
 */
function generateCacheControl(filename, env = 'prod') {
  const isHashAsset = /\.[a-f0-9]{8,}\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico|webp|avif)$/i.test(filename);
  const isHtml = /\.html?$/i.test(filename);
  const isEntry = filename === '/' || filename === '/index.html';

  if (env === 'dev') {
    return {
      cacheControl: 'no-store',
      reason: 'DEV_ENVIRONMENT',
    };
  }

  if (isHashAsset) {
    return {
      cacheControl: 'public, max-age=31536000, immutable',
      reason: 'HASHED_IMMUTABLE_ASSET',
    };
  }

  if (isHtml || isEntry) {
    // staging 可以稍长，prod 强制不长期缓存
    const maxAge = env === 'staging' ? 60 : 0;
    return {
      cacheControl: env === 'staging'
        ? 'public, max-age=60, must-revalidate'
        : 'no-cache, no-store, must-revalidate',
      reason: 'HTML_ENTRY_NO_LONG_CACHE',
    };
  }

  // 未知文件保守处理
  return {
    cacheControl: 'public, max-age=3600, must-revalidate',
    reason: 'UNKNOWN_FILE_CONSERVATIVE',
  };
}

// 示例
console.log(generateCacheControl('/app.abc123def.js', 'prod'));
// { cacheControl: 'public, max-age=31536000, immutable', reason: 'HASHED_IMMUTABLE_ASSET' }
console.log(generateCacheControl('/index.html', 'prod'));
// { cacheControl: 'no-cache, no-store, must-revalidate', reason: 'HTML_ENTRY_NO_LONG_CACHE' }
console.log(generateCacheControl('/api/config.json', 'prod'));
// { cacheControl: 'public, max-age=3600, must-revalidate', reason: 'UNKNOWN_FILE_CONSERVATIVE' }
```

设计思路：
1. **不可变资源长期缓存**：文件名包含内容 hash 的资源可永久缓存，因为内容变化 URL 必变。
2. **入口文件短缓存**：HTML 是应用入口，必须保证用户能获取最新版本引用。
3. **环境差异**：dev 不缓存便于调试；staging 可短缓存；prod 严格不缓存入口。
4. **保守兜底**：未知文件不盲目长期缓存，避免不可控。

生产增强：
- 结合 CDN 刷新/预热 API 使用。
- 对 API 响应、Source Map 等单独配置策略。
- 通过 ETag/Last-Modified 支持协商缓存。

**评分维度**：
- 函数实现正确，覆盖 hash 资源、HTML、未知文件（40%）
- 能区分环境差异（20%）
- 能处理边界情况（空文件名、根路径）（15%）
- 能说明设计原则与生产增强（15%）
- 代码可读性与注释（10%）

**常见错误**：
- 所有文件统一长期缓存。
- HTML 也长期缓存。
- 没有环境区分，dev 也长期缓存。

**延伸追问**：
- 如果 hash 长度不固定，如何更鲁棒地识别 hash 资源？
- Source Map 文件应该用什么缓存策略？

**相关题目**：
- [FB-22-CO-B-004 HTTP 缓存与 CDN 缓存刷新](#FB-22-CO-B-004)
- [FB-22-EN-B-006 CI/CD 中落地 HTTP 缓存策略](#FB-22-EN-B-006)

**参考资源**：
- [MDN - Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [Web.dev - HTTP cache](https://web.dev/articles/http-cache)

**口头回答版**：
> 我写一个函数，判断文件名是否带 hash，是就返回长期缓存 immutable；HTML 或入口文件在 prod 不缓存，staging 短缓存；dev 全部 no-store；未知文件保守一小时。关键是入口不能长期缓存，hash 资源可以永久缓存，因为内容变了 URL 也变。生产里还要结合 CDN 刷新和 ETag。
---

### FB-22-FS-R-001：请解释 DNS 域名解析的核心原理，及其与前端部署安全（如 RPO、DNS 劫持）的关系。

**题型**：框架原理题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：22 部署与 SRE
**标签**：域名解析、RPO
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请解释 DNS 域名解析的核心原理，并说明其与前端部署安全（如 RPO、DNS 劫持、CDN 投毒）的关系及防御措施。

**参考答案**：

DNS 域名解析核心原理：

1. **解析流程**：
   - 浏览器缓存 → 操作系统缓存 → 递归解析器（ISP/公共 DNS）→ 根服务器 → 顶级域服务器 → 权威 DNS 服务器 → 返回 A/AAAA/CNAME 记录。

2. **记录类型（前端常用）**：
   - A/AAAA：域名指向 IP。
   - CNAME：域名指向另一个域名，常用于 CDN 接入。
   - TXT：文本记录，用于域名验证（如 SPF、DKIM、_acme-challenge）。
   - MX：邮件交换记录。

3. **TTL 与缓存**：
   - TTL 决定解析记录在各级缓存中的存活时间。
   - TTL 过长导致切换慢，过短增加 DNS 查询压力和延迟。

与前端部署安全的关系：

1. **DNS 劫持/污染**：
   - 攻击者篡改解析结果，将用户导向钓鱼站点或恶意 CDN。
   - 防御：DNSSEC 签名验证、HTTPS + HSTS、监控解析结果异常。

2. **RPO（Relative Path Overwrite）**：
   - 攻击者利用路径解析差异让浏览器加载错误资源。DNS 层面的 CNAME 劫持可能将静态资源域名指向恶意源，放大 RPO 风险。
   - 防御：CNAME 目标严格校验、CDN 源站鉴权、SRI 校验资源。

3. **CDN 投毒**：
   - 攻击者通过污染 DNS 让请求打到被控制的边缘节点，缓存恶意响应。
   - 防御：启用 DNSSEC、CDN 源站 HTTPS 强制、缓存键控制。

4. **部署切换安全**：
   - 灰度切换通过 DNS 修改时，TTL 过长会导致部分用户长时间访问旧集群。
   - 防御：切换前降低 TTL，切换后逐步恢复；使用 weighted DNS 或 GeoDNS 做可控切换。

**评分维度**：
- 能描述 DNS 解析流程与记录类型（25%）
- 能解释 TTL 对部署切换的影响（20%）
- 能分析 DNS 劫持/污染与防御（25%）
- 能联系 RPO、CDN 投毒等前端安全风险（20%）
- 能提到 DNSSEC 与监控（10%）

**常见错误**：
- 只讲 DNS 解析流程，不讲安全影响。
- 认为 HTTPS 能完全防御 DNS 劫持。
- 切换 DNS 前不调整 TTL。

**延伸追问**：
- DNSSEC 在实际落地中遇到哪些兼容性挑战？
- 多 CDN 调度时，如何避免 DNS 层面的单点风险？

**相关题目**：
- [FB-22-CO-B-007 DNS 解析流程和前端部署关系](#FB-22-CO-B-007)
- [FB-22-CP-B-001 RPO 与 HTTP 缓存风险](#FB-22-CP-B-001)

**参考资源**：
- [Cloudflare - How DNS works](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [ICANN - DNSSEC](https://www.icann.org/resources/pages/dnssec-what-is-it-why-important-2019-03-05-en)

**口头回答版**：
> DNS 解析从浏览器缓存一路查到权威 DNS，返回 A/CNAME 等记录。TTL 决定缓存时间，切换前要把 TTL 调低。安全上 DNS 劫持会把用户导到恶意站点，防御用 DNSSEC、HTTPS、HSTS。RPO 和 CDN 投毒也可能和 DNS 层面有关，要校验 CNAME、SRI 校验资源、监控解析异常。
---

### FB-22-SS-R-001：请谈谈你在跨地域容灾或 DNS 流量调度方面的架构决策经验。

**题型**：软技能题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：22 部署与 SRE
**标签**：容灾、域名解析
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请分享一次你在跨地域容灾或 DNS 流量调度方面的架构决策经历，包括当时的取舍、实施过程与最终效果。

**参考答案**：

建议按以下结构展开：

1. **背景与挑战**：
   - 例如：业务出海，单区域部署导致海外用户访问慢；或某次机房故障导致服务中断，需要多区域容灾。

2. **架构决策**：
   - 方案对比：单 CDN 多源站 vs 多区域独立部署 vs 多活架构。
   - 选择依据：成本、RTO/RPO 要求、数据一致性、团队运维能力。
   - DNS 策略：GeoDNS、weighted DNS、健康检查自动剔除故障区域。

3. **实施过程**：
   - 与网络、运维、安全团队协作，确定各区域源站和 CDN 配置。
   - 设计降级方案：区域故障时返回静态页或切换到备用区域。
   - 建立监控体系：各区域可用性、延迟、DNS 解析结果一致性。

4. **关键取舍**：
   - 数据一致性 vs 可用性：是否接受短时间的数据不同步。
   - 成本 vs 体验：是否所有区域都部署完整服务，还是部分区域用静态缓存。
   - 自动化 vs 可控性：自动切换还是人工确认后切换。

5. **效果与复盘**：
   - 量化指标：海外用户 LCP 降低 X%、故障 RTO 从小时级降到分钟级。
   - 复盘：哪些预案有效、哪些监控缺失、后续如何优化。

**评分维度**：
- 背景清晰，决策依据充分（30%）
- 能体现跨团队架构协调能力（25%）
- 取舍分析合理，有成本与风险意识（20%）
- 效果量化，复盘有深度（15%）
- 方法论可复用（10%）

**常见错误**：
- 只讲技术实现，不讲决策过程。
- 忽略成本与数据一致性权衡。
- 案例没有量化效果。

**延伸追问**：
- 如果再来一次，你会选择自动切换还是人工确认？
- 多区域数据同步延迟对前端用户体验有什么影响？

**相关题目**：
- [FB-22-SD-R-032 多区域 SSG 系统设计](#FB-22-SD-R-032)
- [FB-22-CO-B-007 DNS 解析流程和前端部署关系](#FB-22-CO-B-007)

**参考资源**：
- [AWS - Multi-Region Disaster Recovery](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/multi-region-disaster-recovery.html)
- [Google Cloud - DNS load balancing](https://cloud.google.com/dns/docs/zones/manage-load-balancing)

**口头回答版**：
> 我分享一个业务出海的案例：单区域导致海外用户访问慢，我们评估了单 CDN 多源站、多区域独立部署、多活几种方案，最后选了多区域 SSG + GeoDNS。实施时和运维、安全一起定源站和 CDN，区域故障时切备用区或返回静态页。取舍主要是数据一致性换可用性、成本换体验。效果是海外 LCP 明显下降，RTO 降到分钟级。复盘发现 TTL 预设很重要，切换前要提前调低。
---

### FB-22-CO-R-001：什么是自动扩容？它与前端 Web Vitals 性能指标有什么核心区别与联系？

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：22 部署与 SRE
**标签**：扩容、Web Vitals
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请解释自动扩容（Auto Scaling）的含义，并说明它与前端 Web Vitals 性能指标的核心区别与联系。

**参考答案**：

自动扩容（Auto Scaling）是根据负载自动调整服务实例数量或资源容量的机制，目标是保障服务在高流量下仍能稳定响应，同时避免低流量时资源浪费。

常见扩容维度：
- **水平扩容（HPA）**：增加/减少 Pod/容器/实例数量。
- **垂直扩容（VPA）**：调整单个实例的 CPU/内存。
- **定时扩容**：根据业务高峰规律提前扩容。
- **基于自定义指标扩容**：如请求队列长度、P99 延迟、消息堆积量。

与 Web Vitals 的区别：

| 维度 | 自动扩容 | Web Vitals |
|------|---------|-------------|
| 关注点 | 系统容量与可用性 | 用户真实体验 |
| 触发条件 | CPU/内存/QPS/延迟等资源指标 | 页面加载与交互质量 |
| 优化目标 | 服务不崩、成本可控 | 体验流畅、转化率高 |
| 实现层级 | 基础设施/容器编排 | 前端代码、资源加载、渲染 |

联系：
- Web Vitals 可作为扩容的输入指标：当 LCP/INP 恶化且资源不足时触发扩容。
- 扩容能改善受资源限制的 Web Vitals：例如 SSR 服务 CPU 不足导致 TTFB 高，扩容后可缓解。
- 但并非所有 Web Vitals 问题都能靠扩容解决：如 JS 体积过大、未优化的图片、阻塞渲染等需前端优化。

**评分维度**：
- 能解释自动扩容的核心概念与方式（25%）
- 能清晰对比自动扩容与 Web Vitals（30%）
- 能说明两者的联系与互相输入（25%）
- 能举例说明何时扩容有效、何时需前端优化（20%）

**常见错误**：
- 把自动扩容和性能优化混为一谈。
- 认为所有性能问题都可以通过扩容解决。
- 忽略 Web Vitals 作为扩容输入指标的价值。

**延伸追问**：
- 前端 SSR 服务的扩容阈值应该如何设定？
- 如果扩容后 LCP 仍然很差，应该从哪些方向继续排查？

**相关题目**：
- [FB-22-PE-A-014 SSR 高可用性能优化](#FB-22-PE-A-014)
- [FB-22-CO-A-016 负载均衡与横向扩容](#FB-22-CO-A-016)

**参考资源**：
- [Kubernetes HPA](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Web.dev - Web Vitals](https://web.dev/articles/vitals)

**口头回答版**：
> 自动扩容是根据负载自动调整实例数或资源，有水平、垂直、定时、自定义指标几种方式。它和 Web Vitals 不一样：扩容关注系统容量和可用性，Web Vitals 关注用户真实体验。但两者有联系，Web Vitals 可以作为扩容输入，比如 TTFB 高、CPU 不足时扩容。不过不是所有体验问题都能靠扩容解决，JS 体积大、图片没优化这些要前端自己改。
---

### FB-22-SC-R-001：在 Kubernetes 容器化场景下，如何为前端服务设计 Error Budget 与发布节奏？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：22 部署与 SRE
**标签**：容器化、Error Budget
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
在 Kubernetes 容器化场景下，如何为前端服务设计 Error Budget 与发布节奏，平衡稳定性与创新速度？

**参考答案**：

Error Budget 与发布节奏设计：

1. **定义 SLO 与 Error Budget**：
   - 例如：首页可用性 99.95%，即每月 Error Budget 约为 21 分钟。
   - 前端 SLI 包括：JS 错误率、白屏率、LCP、CDN 5xx、核心流程转化率。
   - 不同服务/页面设定不同 SLO，避免一刀切。

2. **Error Budget 消耗监控**：
   - 每次发布、故障、降级都记录预算消耗。
   - 实时看板展示剩余预算与消耗趋势。
   - 接近耗尽时触发告警，暂停非必要发布。

3. **发布节奏设计**：
   - **预算充足**：正常发布，可加快频率。
   - **预算紧张**：加强门禁、延长灰度观察时间、减少实验性变更。
   - **预算耗尽**：禁止新功能发布，只允许 P0 修复，强制复盘。

4. **K8s 场景配套**：
   - 使用 HPA/VPA 保障容量，减少因资源不足导致的预算消耗。
   - 配置 PodDisruptionBudget，避免发布或节点维护时可用副本过低。
   - 金丝雀/蓝绿 Deployment，控制新版本流量比例。

5. **组织与流程**：
   - 发布平台与 Error Budget 看板联动。
   - 建立发布日历，避开业务高峰。
   - 每次发布失败纳入复盘，更新 SLO 或发布策略。

**评分维度**：
- 能定义 SLO 与 Error Budget（25%）
- 能说明预算监控与告警（20%）
- 能设计发布节奏与预算状态联动（25%）
- 能结合 K8s 特性（HPA、PDB、金丝雀）说明（20%）
- 能提到组织流程配套（10%）

**常见错误**：
- Error Budget 只算可用性，忽略性能与业务指标。
- 预算耗尽后仍强行发布新功能。
- K8s 发布时不配置 PDB，导致可用性波动。

**延伸追问**：
- 如果业务方要求必须在 Error Budget 耗尽时上线，如何处理？
- 多租户前端服务如何分配 Error Budget？

**相关题目**：
- [FB-22-CO-B-009 SLA/SLO/SLI 设定与保障](#FB-22-CO-B-009)
- [FB-22-CP-R-031 质量门禁与金丝雀风险控制](#FB-22-CP-R-031)

**参考资源**：
- [Google SRE - Error Budgets](https://sre.google/sre-book/embracing-risk/)
- [Kubernetes PodDisruptionBudget](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)

**口头回答版**：
> 先定义 SLO，比如首页可用性 99.95%，换算成 Error Budget。每次发布和故障都记录预算消耗，实时看板展示。预算充足时正常发，紧张时加强门禁、延长灰度，耗尽时只允许 P0 修复。K8s 里配 HPA、PodDisruptionBudget、金丝雀 Deployment 来保障。发布平台要和 Error Budget 联动，失败要复盘。
---

### FB-22-PE-R-001：如何排查并优化前端高可用灰度发布过程中的性能瓶颈？

**题型**：性能优化题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：22 部署与 SRE
**标签**：高可用、灰度
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在高可用架构下实施前端灰度发布时，常出现部分用户响应慢、灰度实例负载不均等问题。请说明如何排查并优化其中的性能瓶颈。

**参考答案**：

灰度发布性能瓶颈排查与优化：

1. **定位瓶颈**：
   - 灰度用户 vs 全量用户对比：LCP、FCP、TTFB、错误率。
   - 灰度实例监控：CPU、内存、网络、请求队列、GC 频率。
   - 流量切分层监控：Ingress/网关延迟、upstream 响应时间、连接数。
   - 判断是灰度版本代码问题、资源分配问题，还是流量切分不均。

2. **灰度版本代码优化**：
   - 对比新旧版本产物体积、API 调用次数、渲染耗时。
   - 新版本引入的大包、慢接口、阻塞渲染需优化。
   - 确保静态资源版本与灰度 SSR/Node 版本匹配，避免 hydration 失败重试。

3. **流量切分优化**：
   - 避免按简单取模导致某些实例过热。
   - 使用一致性哈希或加权轮询，保证负载均衡。
   - 对灰度用户做会话粘性，避免频繁切换版本。

4. **资源与扩容**：
   - 灰度实例初始副本数与全量保持一致比例，避免资源不足。
   - 配置 HPA，灰度阶段根据负载自动扩容。
   - 使用 PodDisruptionBudget 保证发布期间最低可用副本。

5. **验证与回滚**：
   - 灰度阶段对比核心指标，设定明确的通过/失败标准。
   - 失败时快速回滚或关闭 Feature Flag，避免消耗 Error Budget。

**评分维度**：
- 能从用户、实例、网关多维度定位瓶颈（30%）
- 能分析灰度版本代码与资源匹配问题（25%）
- 能优化流量切分与会话粘性（20%）
- 能提到资源配比与自动扩容（15%）
- 能说明验证与回滚标准（10%）

**常见错误**：
- 不对比灰度与全量用户指标，无法判断问题。
- 灰度实例资源给太少，导致性能差被误判为代码问题。
- 流量切分不均导致部分实例过载。

**延伸追问**：
- 灰度过程中如何保证埋点数据的可对比性？
- 如果灰度版本性能更优但错误率略高，如何决策？

**相关题目**：
- [FB-22-SC-A-011 前端金丝雀发布方案](#FB-22-SC-A-011)
- [FB-22-CP-R-031 质量门禁与金丝雀风险控制](#FB-22-CP-R-031)

**参考资源**：
- [Google SRE - Load Balancing](https://sre.google/sre-book/load-balancing-frontend/)
- [Kubernetes HPA](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

**口头回答版**：
> 灰度发布性能问题要对比灰度和全量用户的 LCP、TTFB、错误率，看灰度实例的 CPU、内存、请求队列，还要检查 Ingress 延迟。优化方面要对比新旧版本产物体积和接口调用，确保 SSR 和静态资源版本匹配；流量切分要用一致性哈希或加权轮询，避免实例过热；灰度实例资源要给足，配 HPA。最后要有明确的通过标准和快速回滚机制。
---
### FB-22-EN-B-007：前端部署为什么要给 JS/CSS 加 hash？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：CDN、CI/CD、监控、高可用、RPO
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
前端部署为什么要给 JS/CSS 加 hash。

**参考答案**：

加 hash 后文件名与内容绑定，内容变化 hash 变化，浏览器会重新请求；未变化的资源可长期缓存，提升缓存命中率。



**补充说明**：

在实际落地 前端部署为什么要给 JS/CSS 加 hash 时，建议结合 CDN、CI/CD、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 前端部署为什么要给 JS/CSS 加 hash 时，建议结合 CDN、CI/CD、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 缓存失效机制（50%）
- 长期缓存好处（30%）
- 构建实践（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 加 hash 后文件名与内容绑定，内容变化 hash 变化，浏览器会重新请求；未变化的资源可长期缓存，提升缓存命中率。

---

### FB-22-CP-B-002：灰度发布和 A/B 测试有什么区别？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：CDN、CI/CD、监控、高可用、RPO
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
灰度发布和 A/B 测试有什么区别。

**参考答案**：

灰度发布关注风险控制，逐步放量；A/B 测试关注效果对比，同时运行多个版本，用业务指标决策。



**补充说明**：

在实际落地 灰度发布和 A/B 测试有什么区别 时，建议结合 CDN、CI/CD、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 灰度发布和 A/B 测试有什么区别 时，建议结合 CDN、CI/CD、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 目标差异（50%）
- 分流方式（30%）
- 决策依据（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 灰度发布关注风险控制，逐步放量；A/B 测试关注效果对比，同时运行多个版本，用业务指标决策。

---

### FB-22-EN-B-008：什么是 CDN？前端如何利用 CDN？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：22 部署与 SRE
**标签**：CDN、CI/CD、监控、高可用、RPO
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是 CDN？前端如何利用 CDN。

**参考答案**：

CDN 是内容分发网络，通过边缘节点缓存静态资源，降低访问延迟。前端将 JS/CSS/图片/字体等资源部署到 CDN，并配置合理缓存策略。



**补充说明**：

在实际落地 CDN前端如何利用 CDN 时，建议结合 CDN、CI/CD、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 CDN前端如何利用 CDN 时，建议结合 CDN、CI/CD、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- CDN 原理（40%）
- 前端应用（40%）
- 缓存策略（20%）

---

## 二、进阶题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> CDN 是内容分发网络，通过边缘节点缓存静态资源，降低访问延迟。 前端将 JS/CSS/图片/字体等资源部署到 CDN，并配置合理缓存策略。

---

### FB-22-SD-A-002：如何设计前端错误监控体系？

**题型**：系统设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：CDN、CI/CD、监控、高可用、RPO
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何设计前端错误监控体系。

**参考答案**：

- 捕获：window.onerror、unhandledrejection、资源加载错误。
- 上报：采样、聚合、去重。
- 分析：按错误类型、页面、版本、浏览器统计。
- 告警：核心错误实时通知。



**补充说明**：

在实际落地 设计前端错误监控体系 时，建议结合 CDN、CI/CD、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 设计前端错误监控体系 时，建议结合 CDN、CI/CD、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 捕获完整（30%）
- 上报策略（25%）
- 分析方法（25%）
- 告警机制（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 捕获：window.onerror、unhandledrejection、资源加载错误。 - 上报：采样、聚合、去重。 - 分析：按错误类型、页面、版本、浏览器统计。 - 告警：核心错误实时通知。

---

### FB-22-CO-A-017：发布回滚有哪些策略？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：22 部署与 SRE
**标签**：CDN、CI/CD、监控、高可用、RPO
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
发布回滚有哪些策略。

**参考答案**：

- 版本回滚：切换到上一个稳定构建。
- 配置回滚：关闭开关、调整灰度。
- 流量切换：蓝绿或 DNS 切换。
- 数据修复：清理异常本地存储。


**补充说明**：

在实际落地 发布回滚有哪些策略 时，建议结合 CDN、CI/CD、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 策略种类（40%）
- 回滚速度（30%）
- 自动化程度（30%）

---

## 三、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 版本回滚：切换到上一个稳定构建。 - 配置回滚：关闭开关、调整灰度。 - 流量切换：蓝绿或 DNS 切换。 - 数据修复：清理异常本地存储。










