# E13 前端部署与运维（SRE）

> 目标：掌握前端应用的部署、发布、监控、容灾和容量管理，保障线上服务稳定可用。

---

## 核心要点（TL;DR）

- 前端部署不只是把文件上传到 CDN，还包括缓存策略、回滚、灰度和可观测性。
- SRE 的核心是用工程化手段提升系统可靠性，而不是靠人力值守。
- 发布策略决定风险：全量、灰度、蓝绿、金丝雀、A/B 测试各有适用场景。
- 可观测性三大支柱：日志、指标、链路追踪。
- 容灾和回滚能力比发布速度更重要。
- SLA/SLO/SLI 是定义可靠性的量化工具，错误预算指导发布节奏。
- 前端监控需要 RUM（真实用户监控）和 Synthetic（合成监控）相结合。
- 环境变量注入分构建时和运行时两种模式，推荐混合使用。
- 回滚不是重新部署，应有自动化的一键回滚机制。

---

## 1. 前端部署基础

### 1.1 部署流程

```
构建产物 -> 静态资源上传 -> CDN 刷新 -> DNS/路由切换 -> 验证 -> 监控
```

### 1.2 静态资源托管

- **对象存储**：OSS/S3/MinIO
- **CDN**：加速静态资源分发
- **边缘节点**：Cloudflare、Vercel Edge、AWS CloudFront

### 1.3 缓存策略

| 资源类型 | 缓存策略 | 说明 |
|----------|---------|------|
| HTML | no-cache / 短缓存（0-5 min） | 保证最新入口，SPA 路由兜底 |
| JS/CSS（带 hash） | 长期缓存（1年 immutable） | 文件名变化自动失效 |
| 图片/字体/媒体 | 长期缓存（1年） | 不常变化，通过文件名版本化 |
| API 响应（BFF） | 按需缓存（CDN/Service Worker） | 根据接口特性配置 |
| 第三方 SDK | 长期 + Subresource Integrity | 避免篡改风险 |

**缓存策略核心原则**：
- 带 hash 的资源使用 `Cache-Control: public, max-age=31536000, immutable`
- HTML 入口使用 `Cache-Control: no-cache` 配合 `ETag` / `Last-Modified`
- 所有资源都应启用 gzip / brotli 压缩
- Service Worker 可实现更细粒度的缓存策略

### 1.4 对象存储与 CDN 配置示例（OSS + CDN）

```yaml
# 阿里云 OSS 静态网站托管配置
Bucket:
  Name: my-app-prod
  Access: public-read
  StaticWebsite:
    Index: index.html
    Error: index.html          # SPA 路由兜底
  Lifecycle:
    - prefix: builds/
      expire_days: 90          # 历史构建版本自动清理

CDN:
  Domain: static.example.com
  Origin: my-app-prod.oss-cn-hangzhou.aliyuncs.com
  CacheRules:
    - pattern: *.html
      TTL: 0                   # no-cache
    - pattern: *.js,*.css
      TTL: 365d                # hash 文件名，长期缓存
    - pattern: *.png,*.jpg,*.svg,*.woff2
      TTL: 365d
  Preload:
    enabled: true              # 每次部署后预热热门资源
```

### 1.5 SPA 路由历史模式下的 Nginx 配置

```nginx
server {
    listen 80;
    server_name example.com;
    root /usr/share/nginx/html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 1024;
    gzip_static on;

    location ~* \.(?:css|js|woff2?|svg|png|jpg|jpeg|gif|ico|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # SPA 路由历史模式：所有非文件请求返回 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
}
```

### 1.6 .dockerignore 最佳实践

```dockerignore
node_modules
.git
.gitignore
*.md
src/
.env
.env.local
.editorconfig
.eslintrc*
.prettierrc*
tsconfig.json
tests/
e2e/
__tests__/
coverage/
```

### 1.6.5 环境变量注入模式（Build-time vs Runtime）

前端环境变量的注入有两种模式，理解它们的差异对部署架构设计至关重要。

| 维度 | 构建时注入（Build-time） | 运行时注入（Runtime） |
|------|------------------------|---------------------|
| 时机 | 构建阶段（npm run build） | 容器启动时 / CDN 部署后 |
| 方式 | webpack/Vite 的 define 替换 | 服务器注入 script 标签 / ConfigMap |
| 产物差异 | 不同环境生成不同镜像/产物 | 同一份构建产物，运行时注入配置 |
| 优势 | 性能最优，无用代码被 tree-shaking | 一次构建到处运行，便于 QA 验证 |
| 劣势 | 每套环境都需要单独构建 | 配置不能参与 tree-shaking |
| 适用场景 | API Base URL、域名配置、权限控制 | 个性化配置、A/B 参数、灰度标签 |
| 安全级别 | 高（不在客户端暴露构建过程） | 配置值在 HTML 中可见 |

**推荐策略：混合使用**

构建时注入：使用 define 替换编译时常量。适合版本号、构建时间、Git Commit 等固定值。

```typescript
// vite.config.ts - 构建时注入
export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __GIT_COMMIT__: JSON.stringify(process.env.GIT_COMMIT),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  }
});
```

运行时注入：在返回 HTML 时由服务器注入动态配置。适合 API 域名、环境标识、Feature Flag 等可变值。

```html
<!-- index.html - 运行时占位符，服务器在返回前替换 -->
<!DOCTYPE html>
<html>
<head>
  <script>
    window.__ENV__ = {
      API_BASE_URL: '&#123;&#123;API_BASE_URL&#125;&#125;',
      APP_ENV: '&#123;&#123;APP_ENV&#125;&#125;',
      CDN_DOMAIN: '&#123;&#123;CDN_DOMAIN&#125;&#125;'
    };
  </script>
</head>
</html>
```

**Nginx 运行时替换**：

```nginx
# 使用 sub_filter 模块替换占位符
sub_filter_once on;
sub_filter '&#123;&#123;API_BASE_URL&#125;&#125;' 'https://api.example.com';
sub_filter '&#123;&#123;APP_ENV&#125;&#125;' 'production';
```

**构建时 vs 运行时决策树**：

```
配置值需要在构建时确定吗？
  ├── 是 → 构建时注入（define/import.meta.env）
  │    示例：API基础域名、Sentry DSN（区分环境）
  └── 否 → 运行时注入（服务器注入 / ConfigMap）
        ├── 需要热更新？ → WebSocket / Server-Sent Events
        └── 不需要 → HTML 占位符替换 / K8s ConfigMap
```

### 1.7 Docker 多阶段构建前端镜像

```dockerfile
# ---- 阶段一：构建 ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
ARG APP_ENV=production
RUN echo "VITE_APP_ENV=${APP_ENV}" >> .env.production
RUN npm run build

# ---- 阶段二：运行 ----
FROM nginx:1.25-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 1.7.1 Dockerfile 逐段详解

**阶段一：构建阶段**

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
```

- 使用 `node:20-alpine` 作为基础镜像，体积小（~120MB），安全性高
- 先复制依赖配置文件，再执行安装 —— 利用 Docker 层缓存加速
- `--frozen-lockfile` 确保锁定文件一致，防止依赖版本漂移

```dockerfile
COPY . .
ARG APP_ENV=production
RUN echo "VITE_APP_ENV=${APP_ENV}" >> .env.production
RUN npm run build
```

- `ARG` 允许通过 `--build-arg` 传入环境变量，实现多环境构建
- 构建产物输出到 `/app/dist`

**阶段二：运行阶段**

```dockerfile
FROM nginx:1.25-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html
```

- 使用 `nginx:1.25-alpine`（~25MB）作为运行镜像
- `--from=builder` 仅从构建阶段复制产物，构建工具和源码不进入最终镜像
- 最终镜像只包含：nginx 二进制 + 配置文件 + 静态文件

**镜像大小对比**：

| 方案 | 镜像大小 | 说明 |
|------|---------|------|
| 单阶段（node 镜像运行 nginx） | ~1.2GB | 包含全部 node 工具链 |
| 单阶段（nginx 镜像手动构建） | ~400MB | 仍包含构建缓存 |
| 多阶段构建 | ~25MB | 仅包含运行时文件 |

### 1.8 构建时 vs 运行时：Env 注入总结

**推荐策略**：
- **构建时注入**：版本号、构建时间、Git Commit SHA（固定不变）
- **运行时注入**：API Base URL、环境标识、Feature Flag、CDN 域名
- **混合使用**：一次构建 + 运行时注入 = 同一份产物部署到多环境

---

## 2. 发布策略详解

### 2.1 策略对比总览

| 策略 | 速度 | 风险 | 成本 | 回滚速度 | 适用场景 |
|------|------|------|------|---------|---------|
| 全量发布 | 快 | 高 | 低 | 中等 | 热修复、低风险变更 |
| 灰度发布 | 慢 | 中 | 低 | 快 | 功能逐步开放 |
| 金丝雀发布 | 中等 | 低 | 中 | 快 | 重大版本发布 |
| 蓝绿发布 | 快 | 极低 | 高 | 极快 | 核心服务、支付等关键系统 |
| A/B 测试 | 慢 | 低 | 中 | N/A | 业务验证、UI 实验 |
| 滚动发布 | 中等 | 中 | 低 | 慢 | 后端微服务，前端少用 |

#### 2.1.1 滚动发布（Rolling Update）详解

**原理**：逐步替换运行中的实例，每次只更新一部分，保持服务不中断。后端微服务常用，前端 SSR 场景也会用到。

**滚动更新流程**（以 K8s 5 副本为例）：

```
maxSurge: 1, maxUnavailable: 1

T0: [v1] [v1] [v1] [v1] [v1]   全部旧版本
T1: [v1] [v1] [v1] [v1] [v2]   启动一个新 v2 实例
T2: [v1] [v1] [v1] [v2] [v2]   停止一个 v1 实例
T3: [v1] [v1] [v2] [v2] [v2]
T4: [v1] [v2] [v2] [v2] [v2]
T5: [v2] [v2] [v2] [v2] [v2]   全部替换完成
```

**K8s 滚动更新配置**：

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  minReadySeconds: 10         # 新 Pod 就绪后等待 10 秒再继续
  progressDeadlineSeconds: 300 # 更新超时时间
```

**滚动回滚命令**：

```bash
# 回滚到上一个版本
kubectl rollout undo deployment/frontend -n production

# 回滚到指定版本
kubectl rollout undo deployment/frontend -n production --to-revision=3

# 查看发布历史
kubectl rollout history deployment/frontend -n production
```

**策略选择指南**：

| 部署方式 | 推荐策略 | 原因 |
|---------|---------|------|
| 纯静态前端（CDN 托管） | 蓝绿 / 全量 | 只需切换 CDN 指向的目录版本 |
| SSR 前端（K8s 部署） | 滚动 / 金丝雀 | 实例逐步替换，观察内存和 CPU |
| BFF 层（Node.js） | 滚动 + 金丝雀 | 需要监控请求延迟和错误率 |
| 重大 UI 重构 | 蓝绿 + Feature Flag | 瞬时全量切换 + 功能级别 kill switch |

### 2.2 蓝绿发布（Blue-Green Deploy）

**原理**：准备两套完全独立的、与生产环境镜像的环境。蓝环境（当前生产）和绿环境（新版本）同时运行，通过路由/负载均衡器切换流量。

**拓扑示意**：
```
                   +----------------+
                   |  Load Balancer |
                   |  (Router/Nginx)|
                   +-------+--------+
                           |
              +------------+------------+
              |                         |
       +------v------+         +------v------+
       |  Blue (v1)  |         | Green (v2)  |
       |  (current)  |         |  (staging)  |
       +-------------+         +-------------+
```

**步骤**：
1. 部署 v2 到绿环境，完整 CI/CD 流程一次性完成
2. 在绿环境运行集成测试和烟雾测试
3. 切换负载均衡器，将 100% 流量导向绿环境
4. 监控 15-30 分钟，观察错误率和性能指标
5. 如有问题，立即切回蓝环境（秒级回滚）
6. 确认稳定后，蓝环境保留作为下一次回滚目标

**优点**：回滚极快（DNS/路由切换即可）、零停机、环境隔离彻底
**缺点**：资源成本翻倍、DB 兼容性需要额外关注、切换瞬间可能有短暂不一致

### 2.3 金丝雀发布（Canary Release）

**原理**：新版本部署到一小部分节点或用户子集，验证稳定后逐步扩大比例。

**流量切分阶段**：
```
阶段   | 金丝雀 | 稳定版 | 持续时间  | 验证内容
------|---------|--------|-----------|---------
1     |   1%    |  99%   |  15 min   | 错误率、崩溃率
2     |   5%    |  95%   |  30 min   | Web Vitals、CPU/内存
3     |   20%   |  80%   |  30 min   | 业务指标、转化率
4     |   50%   |  50%   |  30 min   | 全面对比
5     |  100%   |   0%   |  -        | 完成发布
```

**前端金丝雀实现方式**：
- CDN 层面：通过权重 DNS 或边缘逻辑分流
- 网关层面：Nginx lua 脚本根据 Cookie/Header 分流
- 应用层面：Feature Flag SDK 控制

**Nginx 权重分流示例**：
```nginx
upstream frontend {
    server 192.168.1.10 weight=95;  # 稳定版
    server 192.168.1.11 weight=5;   # 金丝雀
}
```

### 2.4 全量发布

**全量发布的危险信号**：
- 未经过灰度验证的重大变更（改架构、换框架）
- 前端资源与后端接口不兼容的更新
- 缓存策略、CDN 配置变更未验证
- 缺少自动化回滚预案

**安全全量发布的必要条件**：
1. 完善的自动化测试覆盖
2. 前 5 分钟的错误率 / 性能自动告警
3. 一键回滚能力（保留上一版本产物）
4. 发布窗口期（非高峰时段）

### 2.5 A/B 测试

**A/B 测试与灰度发布的区别**：

| 维度 | 灰度发布 | A/B 测试 |
|------|---------|----------|
| 目的 | 降低风险 | 验证假设 |
| 持续时间 | 数小时-数天 | 数天-数周 |
| 流量分配 | 逐步到 100% | 固定比例 |
| 评估指标 | 稳定性 | 业务转化率 |
| 结束条件 | 确认稳定即全量 | 统计显著后判定 |

**A/B 测试分流方案**：
```javascript
function getAbVariant(userId, experimentName) {
  const hash = hashCode(experimentName + ':' + userId);
  return hash % 100 < 50 ? 'control' : 'treatment';
}
```

### 2.6 Feature Flag（特性开关）

**Feature Flag 层级**：

```
级别 | 作用域     | 生命周期   | 示例
-----|-----------|-----------|------
发布 | Release   | 短（天）  | 功能上线开关
实验 | Experiment| 中（周）  | A/B 测试变体
运维 | Ops       | 长（月）  | 降级开关、kill switch
权限 | Permission| 永久      | 白名单用户功能
```

**推荐方案**：
- 自研：简单 localStorage 开关 + 接口下发配置
- 开源：Unleash、LaunchDarkly
- 轻量：基于 URL Query 参数覆写

**Feature Flag 代码示例**：
```typescript
type FeatureFlags = {
  newHomePage: boolean;
  aiRecommendation: boolean;
  darkModeV2: boolean;
};

class FeatureFlagService {
  private flags: FeatureFlags = {};
  private overrides: Partial<FeatureFlags> = {};

  async init() {
    const resp = await fetch('/config/feature-flags.json');
    const remote = await resp.json();
    const params = new URLSearchParams(location.search);
    params.forEach((value, key) => {
      if (key.startsWith('ff_')) {
        const flagName = key.replace('ff_', '') as keyof FeatureFlags;
        this.overrides[flagName] = value === '1';
      }
    });
    this.flags = { ...remote, ...this.overrides };
  }

  isEnabled(flag: keyof FeatureFlags): boolean {
    return this.flags[flag] ?? false;
  }
}
```

---

## 3. CI/CD 流水线设计

### 3.1 流水线阶段

完整的现代前端 CI/CD 流水线包括十个阶段：

```
代码提交
   |
   v
[1] 代码质量 ── Lint + Prettier + TypeScript 严格模式
   |
   v
[2] 单元测试 ── Jest/Vitest + 覆盖率门禁 >= 80%
   |
   v
[3] 安全扫描 ── npm audit + Snyk/Trivy 依赖扫描 + SAST
   |
   v
[4] 构建 ── 多环境构建（staging/production）+ 产物大小对比
   |
   v
[5] 制品签名 ── 哈希校验 + 签名确保完整性
   |
   v
[6] 制品上传 ── 上传到对象存储 / 镜像仓库
   |
   v
[7] Staging 部署 ── 自动部署到预发布环境
   |
   v
[8] E2E 测试 ── Playwright/Cypress + Lighthouse CI
   |
   v
[9] 生产部署 ── 灰度发布（1% → 5% → 20% → 50% → 100%）
   |
   v
[10] 监控验证 ── 错误率 + Web Vitals + CDN 缓存命中率
   |
   v
发布完成
```

### 3.2 GitHub Actions 完整工作流

```yaml
# .github/workflows/deploy.yml
name: Frontend CI/CD

on:
  push:
    branches: [main, release/*]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: "20"
  PNPM_VERSION: "9"
  REGISTRY: ghcr.io

jobs:
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: $&#123;&#123; env.PNPM_VERSION &#125;&#125;
      - uses: actions/setup-node@v4
        with:
          node-version: $&#123;&#123; env.NODE_VERSION &#125;&#125;
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test -- --coverage

  build:
    name: Build and Package
    needs: quality
    runs-on: ubuntu-latest
    strategy:
      matrix:
        env: [staging, production]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: $&#123;&#123; env.PNPM_VERSION &#125;&#125;
      - uses: actions/setup-node@v4
        with:
          node-version: $&#123;&#123; env.NODE_VERSION &#125;&#125;
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build:"$&#123;&#123; matrix.env &#125;&#125;"
      - name: Upload dist artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist-$&#123;&#123; matrix.env &#125;&#125;
          path: dist/
      - name: Build Docker image
        run: |
          docker build \
            --build-arg APP_ENV=$&#123;&#123; matrix.env &#125;&#125; \
            -t $&#123;&#123; env.REGISTRY &#125;&#125;/my-app:$&#123;&#123; matrix.env &#125;&#125;-$&#123;&#123; github.sha &#125;&#125; \
            .

  deploy-production:
    name: Deploy to Production
    needs: build
    runs-on: ubuntu-latest
    environment: production
    concurrency: production-deploy
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist-production
      - name: Sync to Production S3
        run: |
          aws s3 sync dist/ s3://my-app-prod/current/ --delete
          aws s3 cp dist/index.html s3://my-app-prod/current/index.html \
            --cache-control "no-cache, no-store, must-revalidate"
      - name: CDN Cache Invalidation
        run: |
          aws cloudfront create-invalidation \
            --distribution-id $&#123;&#123; secrets.CF_DIST_ID_PROD &#125;&#125; \
            --paths "/*"
      - name: Smoke Test
        run: curl -sSf -o /dev/null -w "%{http_code}" https://example.com | grep 200
```

### 3.3 发布门禁（Quality Gates）

**建议在 CI 中设置的门禁**：
- Lint 零错误、TypeScript 严格模式通过
- 单元测试覆盖率 >= 80%（核心模块 >= 90%）
- 构建产物大小对比（增量超过 10% 需人工审批）
- 安全检查：无高危依赖漏洞 (npm audit / pnpm audit)
- Lighthouse 性能评分 >= 85（移动端）
- E2E 测试全部通过

**增量大小检测示例**：
```bash
#!/bin/bash
# scripts/check-bundle-size.sh
MAX_SIZE_KB=500
current_size=$(du -sk dist/assets/main-*.js | cut -f1)
if [ "$current_size" -gt "$MAX_SIZE_KB" ]; then
  echo "Bundle size ${current_size}KB exceeds limit ${MAX_SIZE_KB}KB"
  exit 1
fi
echo "Bundle size: ${current_size}KB - OK"
```

---

## 4. Kubernetes 前端部署基础

### 4.1 为什么前端需要 K8s

传统前端只需要静态托管，但以下场景需要 K8s：
- 前端应用包含 SSR（服务端渲染）
- 需要精细化流量管理（灰度、分流）
- 与后端 BFF 统一部署管理
- 自建 CI/CD 需要容器化编排

### 4.2 Deployment 示例

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: production
  labels:
    app: frontend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: nginx
          image: ghcr.io/myorg/frontend:latest
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: 128Mi
              cpu: 100m
            limits:
              memory: 256Mi
              cpu: 200m
          livenessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 3
            periodSeconds: 5
```

### 4.3 Service 示例

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

### 4.4 Ingress 示例

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "30"
spec:
  tls:
    - hosts:
        - example.com
      secretName: example-tls
  rules:
    - host: example.com
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

### 4.5 ConfigMap 注入前端配置

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: frontend-config
  namespace: production
data:
  config.js: |
    window.__ENV__ = {
      API_BASE_URL: 'https://api.example.com',
      APP_ENV: 'production',
      SENTRY_DSN: 'https://xxx@sentry.example.com/1',
      FEATURE_FLAGS: { newHome: true, aiRec: false }
    };
```

```yaml
# 在 Deployment 中挂载 ConfigMap
# volumeMounts:
#   - name: config
#     mountPath: /usr/share/nginx/html/config.js
#     subPath: config.js
# volumes:
#   - name: config
#     configMap:
#       name: frontend-config
```

### 4.6 HPA（水平自动扩缩容）

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: frontend
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### 4.7 K8s 蓝绿部署 Service Mesh 方案

```yaml
# 使用 Service 的 selector 切换蓝绿
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: production
spec:
  selector:
    app: frontend
    version: green   # 切换为 blue 即回滚
  ports:
    - port: 80
```


---

## 5. CDN 架构与缓存策略

### 5.1 CDN 架构层级

```
                       +------------------+
                       |   Origin Server   |
                       | (OSS/S3/Nginx)    |
                       +--------+---------+
                                |
                       +--------v---------+
                       |   Origin Shield   |
                       | (回源收敛层)      |
                       +--------+---------+
                                |
          +---------------------+----------------------+
          |                     |                      |
   +------v------+      +------v------+      +------v------+
   |   Edge L1   |      |   Edge L1   |      |   Edge L1   |
   | (pop-beijing)|     | (pop-shanghai)|    | (pop-shenzhen)|
   +-------------+      +-------------+      +-------------+
```

### 5.2 回源收敛与 Origin Shield

**Origin Shield 作用**：
- 所有边缘节点的回源请求先到达 Origin Shield，再由 Shield 回源站
- 减少源站请求量（缓存命中率更高）
- 保护源站不被突发流量打垮
- 降低回源带宽成本

**配置要点**：
```yaml
CDN:
  OriginShield:
    enabled: true
    region: cn-hangzhou       # Shield 区域，选择接近源站的区域
    maxCacheSize: 100GB
  CacheLayer:
    - name: Edge
      TTL: 1h                 # 边缘节点缓存 1 小时
    - name: Shield
      TTL: 24h                # Shield 层缓存 24 小时
```

### 5.3 缓存失效策略

| 策略 | 方式 | 适用场景 | 延迟 |
|------|------|---------|------|
| 精确刷新 | 指定文件路径 | 单个文件更新 | 秒级 |
| 目录刷新 | 指定目录前缀 | 批量更新 | 分钟级 |
| 全站刷新 | /* | 重大版本发布 | 分钟级 |
| 版本号刷新 | URL 追加版本参数 | 无 CDN 操作权限时 | 即时 |
| 预加载 | 主动预热文件 | 大版本上线前 | 提前完成 |

**缓存刷新策略建议**：
- 日常发布：只刷新 index.html（推荐精确路径刷新）
- 大版本发布：预热全部静态资源 + 刷新 HTML
- 紧急回滚：立即刷新全站 + 预热回滚版本资源

**AWS CloudFront 刷新脚本**：
```bash
#!/bin/bash
# scripts/refresh-cdn.sh
DIST_ID=$1
PATHS=${2:-'/*'}
aws cloudfront create-invalidation \
  --distribution-id $DIST_ID \
  --paths $PATHS
echo "Invalidation created for distribution $DIST_ID"
```

### 5.4 边缘计算（Edge Computing）

CDN 边缘节点不仅仅是缓存，还可以执行计算：

**Cloudflare Workers 示例 - A/B 测试分流**：
```javascript
// Cloudflare Worker: A/B testing at the edge
const AB_CONFIG = {
  control: { weight: 0.5, upstream: 'https://v1.example.com' },
  treatment: { weight: 0.5, upstream: 'https://v2.example.com' }
};

async function handleRequest(request) {
  const cookie = request.headers.get('Cookie') || '';
  let variant = cookie.match(/variant=(\w+)/)?.[1];

  if (!variant) {
    const rand = Math.random();
    variant = rand < AB_CONFIG.control.weight ? 'control' : 'treatment';
  }

  const upstream = AB_CONFIG[variant].upstream;
  const response = await fetch(upstream + new URL(request.url).pathname);

  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Set-Cookie', `variant=${variant}; Path=/; Max-Age=3600`);
  newResponse.headers.set('X-Variant', variant);
  return newResponse;
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
```

### 5.5 CDN 安全配置

```yaml
CDN Security:
  WAF:
    enabled: true
    rules:
      - SQL注入防护: on
      - XSS防护: on
      - CC攻击防护: on
      - 频率限制: 1000 req/min per IP
  Referer防盗链:
    type: blacklist/whitelist
    allowEmpty: false
    domains:
      - '*.example.com'
  IP频率限制:
    threshold: 100
    period: 10s
```

---

## 6. 静态托管平台对比与选型

### 6.1 主流平台对比

| 特性 | Vercel | Netlify | Cloudflare Pages | AWS S3 + CloudFront |
|------|--------|---------|-----------------|-------------------|
| 免费额度 | 100GB带宽/月 | 100GB带宽/月 | 无限带宽 | 按量计费 |
| 全球节点 | 100+ | 250+ | 330+ | 400+ |
| 边缘函数 | Vercel Edge | Netlify Edge | Cloudflare Workers | Lambda@Edge |
| 部署方式 | Git自动 | Git自动 | Git自动 | CI/CD手动 |
| 预览部署 | 自动生成 | 自动生成 | 自动生成 | 需自建 |
| 自定义域名 | 支持 | 支持 | 支持 | 支持 |
| SSL证书 | 自动 | 自动 | 自动 | ACM免费 |
| 构建限制 | 45min/月(免费) | 300min/月(免费) | 500次/月(免费) | 无限制 |
| 回滚 | 一键 | 一键 | 一键 | 需自建 |
| 适合场景 | SSR/SSG应用 | 静态站点/博客 | 静态站点/API | 企业生产环境 |

### 6.2 选型建议

- **初创项目/个人项目**：Vercel 或 Cloudflare Pages，零配置、快速上手
- **企业级应用**：S3 + CloudFront，成本可控、安全合规、可定制
- **高度动态站点**：Vercel（Next.js）或自建 K8s，SSR 需要更灵活的计算
- **内容型网站**：Cloudflare Pages，全球节点最多、带宽免费
- **需要预览部署和团队协作**：Vercel 或 Netlify 体验最佳

### 6.3 S3 + CloudFront 完整部署脚本

```bash
#!/bin/bash
set -euo pipefail

BUCKET='my-app-prod'
DISTRIBUTION_ID='E1234567890ABC'
BUILD_DIR='./dist'
VERSION=$(git rev-parse --short HEAD)

echo "Uploading version $VERSION to S3..."

# 上传带 hash 的资源（长期缓存）
aws s3 sync $BUILD_DIR/assets s3://$BUCKET/current/assets/ \
  --cache-control 'public, max-age=31536000, immutable' \
  --exclude '*.map'

# 上传 HTML（禁止缓存）
aws s3 cp $BUILD_DIR/index.html s3://$BUCKET/current/index.html \
  --cache-control 'no-cache, no-store, must-revalidate'

# CDN 刷新
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths '/index.html' '/assets/*'

echo "Deploy complete: https://example.com"
```

---

## 7. 可观测性与监控（扩展）

### 7.1 RUM（Real User Monitoring）

**核心指标采集**：
```javascript
// Web Vitals 采集示例
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    url: location.pathname,
    userAgent: navigator.userAgent,
    timestamp: Date.now()
  };
  // 使用 sendBeacon 确保卸载时也能发送
  navigator.sendBeacon('/api/vitals', JSON.stringify(body));
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

**RUM 数据应用**：
- LCP > 2.5s 触发性能告警
- CLS > 0.1 触发布局偏移告警
- 按版本、浏览器、地域、网络类型下钻分析
- 发布前后自动对比 Web Vitals 变化

### 7.2 合成监控（Synthetic Monitoring）

**使用 Checkly / Playwright 定时检查**：
```typescript
// synthetics/check.ts
import { test, expect } from '@playwright/test';

test('homepage loads within budget', async ({ page }) => {
  const start = Date.now();
  await page.goto('https://example.com', { waitUntil: 'networkidle' });
  const loadTime = Date.now() - start;
  expect(loadTime).toBeLessThan(3000);

  // 检查关键元素
  await expect(page.locator('#app')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('欢迎');

  // 检查控制台无错误
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  expect(errors.length).toBe(0);
});
```

### 7.3 错误追踪（Error Tracking）

**Sentry 集成示例**：
```typescript
// sentry.ts
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: window.__ENV__.SENTRY_DSN,
  environment: window.__ENV__.APP_ENV,
  release: __APP_VERSION__,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.1,           # 采样率 10%
  replaysSessionSampleRate: 0.01,  # Session replay 采样 1%
  replaysOnErrorSampleRate: 1.0,   # 错误时 100% 录制
  beforeSend(event) {
    # 过滤已知非关键错误
    if (event.exception?.values?.[0]?.type === 'ResizeObserver loop limit exceeded') {
      return null;
    }
    return event;
  }
});
```

**错误分类与处理优先级**：
```
P0 - 白屏、JS 崩溃、页面完全不可用 -> 立即告警（5分钟内响应）
P1 - 功能模块报错、API大面积失败 -> 快速响应（30分钟内）
P2 - 单个组件异常、非关键路径报错 -> 正常排期修复
P3 - 低影响告警、第三方 SDK 异常 -> 观察积累
```

### 7.4 告警规则设计

**前端核心告警规则**：

| 指标 | 告警阈值 | 严重度 | 聚合窗口 |
|------|---------|--------|---------|
| JS 错误率 | > 1% | P0 | 5min |
| 白屏率 | > 0.5% | P0 | 5min |
| LCP | > 3.0s 占比 > 5% | P1 | 10min |
| API 错误率 | > 5% | P1 | 5min |
| 页面加载失败率 | > 2% | P1 | 5min |
| 带宽峰值 | > 预估 80% | P2 | 10min |
| CDN 回源率 | > 10% | P2 | 10min |

**告警疲劳避免策略**：
- 告警聚合：相同类型的告警合并为一条
- 动静分离：夜间（非工作时间）告警降级为通知
- 自动静默：已知维护窗口期自动静默告警
- 依赖告警：CDN 有问题时，不要同时触发所有页面告警

---

## 8. 回滚策略与容灾能力

### 8.1 回滚分类

| 类型 | 速度 | 复杂度 | 数据安全 | 适用场景 |
|------|------|--------|---------|---------|
| 代码回滚 | 快（分钟级） | 低 | 无影响 | 功能 Bug、样式问题 |
| CDN 回滚 | 极快（秒级） | 低 | 无影响 | 缓存错误、资源损坏 |
| DNS 切换 | 中等（TTL 时间） | 中 | 无影响 | 全站切换、CDN 故障 |
| K8s 回滚 | 快（秒级） | 中 | 无影响 | 容器化部署回滚 |
| Feature Flag | 极快（毫秒级） | 低 | 无影响 | 功能级 kill switch |
| 数据库回滚 | 慢（小时级） | 高 | 有数据丢失风险 | 后端变更，前端少用 |

### 8.2 代码回滚策略

**Git 回滚方式对比**：
```bash
# 方式一：git revert（推荐）
git revert <commit-hash>             # 生成一个反向提交
git push origin main

# 方式二：git reset（谨慎使用）
git reset --hard <previous-tag>      # 丢弃之后的所有提交
git push --force origin main         # 需要 force push

# 方式三：版本切换（S3 多版本）
aws s3 sync s3://my-app-prod/releases/v1.2.3/ s3://my-app-prod/current/
```

### 8.3 保留多版本制品

**S3 版本管理策略**：
```bash
# S3 存储结构
s3://my-app-prod/
  releases/
    v1.2.0/          # 当前稳定版
    v1.3.0/          # 新版本（刚刚发布）
    v1.1.0/          # 上一个稳定版（保留用于快速回滚）
  current/           # 符号链接指向当前版本

# 回滚即复制上一版本到 current
aws s3 sync s3://my-app-prod/releases/v1.2.0/ s3://my-app-prod/current/ --delete
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths '/*'
```

### 8.4 数据库兼容性（前端发布关注点）

虽然前端不直接操作数据库，但以下场景需关注兼容性：

- **API 字段变更**：新前端需要新的 API 字段时，后端必须先发布（向后兼容）
- **蓝绿切换的 DB 兼容**：新旧版本前端同时在线期间，API 必须同时兼容两种请求
- **LocalStorage Schema 变更**：新版本写入新格式，旧版本读取旧格式，或清理旧数据

**LocalStorage 兼容性示例**：
```typescript
const STORAGE_VERSION = 2;

function migrateStorage() {
  const version = parseInt(localStorage.getItem('schema_version') || '0');

  if (version < 1) {
    // v1: 旧格式清理
    localStorage.removeItem('old_cart_data');
    version = 1;
  }

  if (version < 2) {
    // v2: 迁移到新格式
    const oldData = JSON.parse(localStorage.getItem('cart') || '{}');
    const newData = { items: Object.values(oldData), version: 2 };
    localStorage.setItem('cart', JSON.stringify(newData));
    version = 2;
  }

  localStorage.setItem('schema_version', String(version));
}
```

---

## 9. SLA、SLO 与 SLI

### 9.1 概念定义

| 术语 | 含义 | 示例 |
|------|------|------|
| SLI（Service Level Indicator）| 服务水平指标（可量化的度量） | 页面加载时间、错误率 |
| SLO（Service Level Objective）| 服务水平目标（目标值） | 99.9% 的请求 LCP < 2.5s |
| SLA（Service Level Agreement）| 服务水平协议（对外承诺） | 99.9% 可用性，否则赔偿 |

### 9.2 前端 SLI 指标

**核心前端 SLI**：
- 页面可用性：页面成功加载的请求占比
- 加载性能：LCP <= 2.5s 的比例
- 交互性能：INP <= 200ms 的比例
- 视觉稳定性：CLS <= 0.1 的比例
- JS 错误率：无错误的页面访问占比
- API 成功率：前端发起的 API 请求成功率

### 9.3 前端 SLO 推荐值

| 指标 | SLO | 测量窗口 |
|------|-----|---------|
| 页面可用性（白屏率） | >= 99.95% | 30天滚动 |
| LCP 达标率 | >= 90% 在 2.5s 内 | 7天滚动 |
| CLS 达标率 | >= 95% 在 0.1 内 | 7天滚动 |
| JS 错误率 | <= 0.5% 的访问有错误 | 7天滚动 |
| CDN 可用性 | 99.99% | 30天滚动 |

### 9.4 错误预算（Error Budget）

**计算公式**：
```
错误预算 = (1 - SLO) * 总时间
例如：SLO = 99.9%，月度总时间 = 30 * 24 * 60 = 43200 分钟
可用错误预算 = 43200 * 0.001 = 43.2 分钟（不可用时间）
```

**错误预算策略**：
- 预算充足（> 50% 剩余）：可以正常发布
- 预算紧张（20-50% 剩余）：控制发布频率，加强测试
- 预算耗尽（< 20% 剩余或为负）：冻结发布，全力修复

### 9.5 SLO 监控仪表盘

```yaml
# Grafana / Datadog 告警规则示例
alert:
  - name: SLO Burn Rate Alert
    condition: >
    - 在 1 小时内消耗了 2% 的错误预算
    - 或者 6 小时内消耗了 5% 的错误预算
    - 或者 30 天内消耗了 100% 的错误预算
    severity: critical
    notification: on-call
```

---

## 10. 故障演练与应急预案

### 10.1 前端混沌工程原则

混沌工程不是破坏，而是通过受控实验验证系统的容错能力。
前端混沌工程关注的是：

- 当 CDN 节点故障时，用户是否还能访问？
- 当 API 接口超时时，页面是否优雅降级？
- 当第三方 SDK 加载失败时，主功能是否受影响？
- 当网络从 4G 降为 2G 时，应用是否可用？

### 10.2 故障场景库

| 故障场景 | 演练方式 | 预期结果 | 严重度 |
|---------|---------|---------|-------|
| CDN 节点宕机 | 模拟 DNS 解析到备用源 | 自动切换到备用 CDN | P0 |
| API 全部超时 | Mock 接口返回 5xx | 降级页面 + 重试机制 | P0 |
| 主 JS 加载失败 | 拦截 main.js 请求 404 | 展示静态兜底页面 | P0 |
| 第三方 SDK 挂掉 | 拦截 analytics.js | 不影响主流程 | P1 |
| 图片 CDN 不可用 | Mock 图片返回 403 | 展示占位图 | P2 |
| LocalStorage 满 | 填充 5MB 数据 | 优雅 catch 异常 | P2 |
| 弱网环境 | Chrome DevTools 限速 | Service Worker 离线缓存 | P1 |
| CPU 高负载 | 限制 CPU 线程数 | 滚动性能不崩溃 | P2 |

### 10.3 故障注入工具与实践

**使用 Playwright 模拟网络故障**：
```typescript
import { test } from '@playwright/test';

test('CDN failure should show fallback page', async ({ page }) => {
  // 拦截所有 CSS 请求返回 500
  await page.route('**/*.css', route => {
    route.abort();
  });

  await page.goto('https://example.com');
  // 验证页面仍然有基本内容
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('.fallback-message')).toBeVisible();
});

test('API failure should show error state', async ({ page }) => {
  await page.route('**/api/**', route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Server Error' })
    });
  });

  await page.goto('https://example.com');
  await expect(page.locator('.error-boundary')).toBeVisible();
});
```

### 10.4 应急预案（Runbook）

**故障响应流程**：
```
1. 发现（Detection）
   - 自动告警触发：错误率突增、白屏率上升、LCP 恶化
   - 用户反馈：客服群/工单系统

2. 响应（Response）
   - 值班人员确认告警（5min内）
   - 判断影响范围：全局/部分用户/特定页面
   - 公告：在状态页更新（status.example.com）

3. 止损（Mitigation）
   - 优先回滚/降级，不要花时间查 root cause
   - 执行预演过的回滚脚本
   - 如无法回滚，执行 Feature Flag 功能降级

4. 排查（Investigation）
   - 查看 Sentry 错误采样
   - 查看 RUM 性能曲线变化
   - 对比最近发布变更

5. 恢复（Resolution）
   - 确认问题已修复
   - 持续监控 30 分钟

6. 复盘（Postmortem）
   - 编写故障报告（5 Why 分析法）
   - 制定改进措施并跟踪闭环
```

### 10.5 日常演练计划

| 频率 | 演练内容 | 参与人 |
|------|---------|-------|
| 每月 | 三分之一的故障场景轮换演练 | 值班团队 |
| 每季度 | 全流程故障模拟（Game Day） | 全体 SRE |
| 每半年 | 容灾切换演练（跨区域） | 基础架构团队 |
| 发布前 | 新功能降级验证 | 开发团队 |

### 10.6 值班轮换制度（On-Call Rotation）

**值班模型**：

```
                    +---------------+
                    |   SRE Team    |
                    +-------+-------+
                            |
      +---------------------+----------------------+
      |                     |                      |
+------v------+      +------v------+      +------v------+
|   Primary   |      |  Secondary  |      |  Escalation  |
|   (1 week)  |      |   (1 week)  |      |  (Manager)   |
+-------------+      +-------------+      +-------------+
```

**值班规则**：
- 轮换周期：每周一轮换（周一早上交接）
- 响应时间：P0 告警 5 分钟内响应，P1 告警 15 分钟内响应
- 交接内容：本周告警统计、未关闭事件、已知问题、版本发布计划

**值班工具链**：
- **PagerDuty / OpsGenie**：告警通知与排班
- **Status Page**：对外状态页（status.example.com）
- **Escalation Policy**：Primary 超时 -> Secondary -> Engineering Manager

### 10.7 事后复盘模板（Postmortem Template）

P0/P1 故障后 48 小时内完成事后复盘。目的是找出系统性改进点，而非追责。

```markdown
# 故障报告

## 基本信息
- **故障编号**：INC-YYYY-MM-DD-XXX
- **标题**：[简短描述]
- **日期**：YYYY-MM-DD
- **持续时间**：[开始] -> [结束]（共计 XX 分钟）
- **严重度**：P0 / P1
- **值班人员**：@name
- **影响范围**：影响用户数 / 页面 / 功能

## 时间线

| 时间 | 事件 |
|------|------|
| HH:MM | 告警触发 |
| HH:MM | 值班人员确认 |
| HH:MM | 定位根因 |
| HH:MM | 执行回滚 |
| HH:MM | 确认恢复 |
| HH:MM | 故障关闭 |

## 根因分析（5 Why）

1. 为什么会出现错误率突增？
2. 为什么测试没有发现？
3. 为什么监控没有及时告警？
4. 为什么回滚不够快？
5. 为什么系统的防御机制没有生效？

## 影响评估

- 用户体验：XX% 用户受影响，平均 XX 分钟
- 业务指标：转化率下降 XX%，收入影响约 XX
- 技术指标：错误率峰值 XX%，白屏率 XX%

## 改进措施

| 改进项 | 负责人 | 截止日期 | 状态 |
|--------|-------|---------|------|
| [措施 1] | @name | YYYY-MM-DD | 待开始 |
| [措施 2] | @name | YYYY-MM-DD | 待开始 |

## 经验教训

- 做得好的：快速响应、回滚流畅
- 待改进的：测试覆盖不足、告警配置不敏感
```

---

## 11. 前端生产部署清单

### 11.1 部署前检查

**代码质量**：
- [ ] Lint 和 TypeScript 检查通过
- [ ] 单元测试覆盖率 >= 80%
- [ ] E2E 测试全部通过
- [ ] 代码 Review 已完成并获得至少一个 Approval
- [ ] 无已知 P0/P1 级别的 Bug 未修复

**构建验证**：
- [ ] 本地生产构建成功
- [ ] 构建产物大小未异常增长（与上一版本比对）
- [ ] Source Map 正确上传（不上传到 CDN 公共目录）
- [ ] 环境变量配置正确（区分 staging/production）

**安全审计**：
- [ ] 依赖漏洞扫描通过（npm audit）
- [ ] 无敏感信息硬编码（API Key、Token 等）
- [ ] CSP（Content Security Policy）头配置正确
- [ ] HTTP 安全头齐全（HSTS、X-Frame-Options 等）

**部署配置**：
- [ ] 发布策略已确定（全量/灰度/蓝绿）
- [ ] 回滚方案已准备（上一版本产物仍可用）
- [ ] CDN 刷新/预热脚本已就绪
- [ ] 配置中心/Feature Flag 同步更新
- [ ] 监控告警阈值已配置

### 11.2 部署中检查

- [ ] 灰度发布开始时，验证 1% 流量无异常
- [ ] 检查 Sentry 错误趋势无突增
- [ ] 检查 RUM Web Vitals 无退化
- [ ] 检查 CDN 回源率和缓存命中率正常
- [ ] 扩大灰度比例前确认所有指标正常

### 11.3 部署后检查

- [ ] 各核心页面手动验证（打开页面、功能操作）
- [ ] API 接口正确调用，无 4xx/5xx 增加
- [ ] 静态资源加载正常（无 404）
- [ ] 页面渲染无异常（白屏、布局错乱）
- [ ] 监控面板观察 15-30 分钟确认稳定
- [ ] 通知相关团队部署完成

---

## 12. 常见故障模式与应急预案

### 12.1 故障分类与优先级矩阵

| 故障模式 | 典型表现 | 影响面 | 严重度 | 响应要求 |
|---------|---------|-------|-------|---------|
| 白屏/页面崩溃 | JS 执行错误导致页面完全空白 | 全部用户 | P0 | 5min 响应，15min 止血 |
| CDN 故障 | 静态资源 403/404/超时 | 全部用户 | P0 | 5min 响应，15min 切换备源 |
| API 大规模失败 | 前端请求全部超时/5xx | 全部用户 | P0 | 5min 响应，10min 降级 |
| 第三方 SDK 故障 | 统计/支付 SDK 加载失败 | 功能级 | P1 | 15min 响应，30min 降级 |
| 性能退化 | LCP > 5s，页面明显卡顿 | 全部用户 | P1 | 15min 响应，1h 优化 |
| 功能 Bug | 特定功能操作失败 | 部分用户 | P1/P2 | 30min-24h |
| 布局错乱 | CSS 兼容性问题 | 部分浏览器 | P2 | 4h 响应 |

### 12.2 P0 故障应急：白屏/页面崩溃

**应急流程**：

1. 确认故障范围：全局白屏？特定页面？特定浏览器/设备？
2. 快速止损：
   - 执行回滚到上一版本（首选）
   - 如无法回滚，部署备用静态页面
3. 排查根因：查看 Sentry 错误采样，检查构建产物是否损坏
4. 修复验证：修复后灰度验证，监控 30 分钟确认稳定

**备用静态页面模板**：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>系统维护中</title>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center;
           align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .container { text-align: center; padding: 2rem; }
    h1 { font-size: 2rem; color: #333; }
    p { color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>系统正在修复中</h1>
    <p>请稍候刷新重试。</p>
  </div>
</body>
</html>
```

### 12.3 P0 故障应急：CDN 故障

1. 确认故障：多地域访问验证，检查 CDN 服务商状态页
2. 快速切换：
   - DNS 切换：将 CDN 域名 CNAME 切换到备用 CDN 或源站
   - 注意 DNS TTL 可能造成切换延迟
3. 降级：如有 Service Worker，切换为离线兜底；如完全不可用，部署静态兜底页面

### 12.4 P0 故障应急：API 大规模失败

**熔断降级示例**：

```typescript
class ApiGateway {
  private failureCount = 0;
  private isDegraded = false;
  private readonly THRESHOLD = 5;     // 连续 5 次失败触发熔断
  private readonly RECOVERY_MS = 30000; // 30 秒后尝试恢复

  async request<T>(url: string): Promise<T> {
    if (this.isDegraded) {
      return this.getFallback<T>(url);
    }
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      this.failureCount = 0;
      return await resp.json();
    } catch (err) {
      this.failureCount++;
      if (this.failureCount >= this.THRESHOLD) {
        this.isDegraded = true;
        setTimeout(() => { this.isDegraded = false; this.failureCount = 0; }, this.RECOVERY_MS);
      }
      return this.getFallback<T>(url);
    }
  }
}
```

### 12.5 故障响应矩阵

| 严重度 | 响应时间 | 响应人员 | 复盘要求 |
|-------|---------|---------|---------|
| P0 | 5min | 主值班 + 备值班 | 48h 内完成 |
| P1 | 15min | 主值班 | 72h 内完成 |
| P2 | 2h | 开发团队 | 可选 |
| P3 | 24h | 开发团队 | 不需要 |

### 12.6 发布前降级检查清单

- [ ] 回滚脚本是否有效？（上一版本产物是否可获取？）
- [ ] Feature Flag 是否已配置 kill switch 开关？
- [ ] CDN 刷新/预热脚本是否可用？
- [ ] 备用静态页面是否可访问？
- [ ] 值班人员是否已通知本次发布计划？
- [ ] 告警阈值是否已按当前基线调整？

---

## 常见误区
|------|---------|
| 部署成功就万事大吉 | 需要持续监控和快速回滚能力 |
| 缓存越久越好 | HTML 不能长期缓存，否则无法更新 |
| 可观测性只关注错误 | 还要关注性能、业务、用户体验 |
| 只追求发布速度 | 稳定性和可回滚性更重要 |
| 回滚就是重新部署 | 应该有自动化的一键回滚机制 |
| CDN 加速了就万事大吉 | 需要持续关注回源率和缓存命中率 |
| 灰度发布一定能发现问题 | 灰度范围不够或监控不足可能漏过问题 |

---

## 相关领域

- E03 CI/CD：自动化发布管线
- A06 Observability：日志、指标、链路追踪
- A03 Performance：性能监控与优化
- E10 Node.js/BFF：服务端部署与运维
- E06 Security：前端安全与合规
- E12 Architecture：前端架构设计

---

**标签**：`#deployment` `#sre` `#cdn` `#observability` `#reliability` `#kubernetes` `#docker` `#ci-cd`

> **最后更新**：2026-07-06



---

## 本领域学习进度

<MarkComplete domainId="deployment-sre" />
<ProgressTracker />
