# 安全题

> 本文件按题型收录 **安全题** 相关前端面试题索引。
> 共收录 **94** 道题（基础 12 / 进阶 34 / 深入 40 / 架构 8）。
> 每道题都附带完整参考答案与评分维度，点击链接可查看原文。

## 基础题（12 道）{#basic}

### 计算机网络（1 道）

- [FB-04-SE-B-001 HTTPS 为什么安全？TLS 握手做了什么？](../by-domain/04-network.md#FB-04-SE-B-001)

### Web 安全（4 道）

- [FB-05-SE-B-001 localStorage 和 sessionStorage 的安全风险有哪些？](../by-domain/05-security.md#FB-05-SE-B-001)
- [FB-05-SE-B-002 前端视角下，SQL 注入是如何发生的？如何防御？](../by-domain/05-security.md#FB-05-SE-B-002)
- [FB-05-SE-B-003 为什么说“永远不信任用户输入”？前端应如何处理不可信数据？](../by-domain/05-security.md#FB-05-SE-B-003)
- [FB-05-SE-B-004 什么是点击劫持（Clickjacking）？如何防御？](../by-domain/05-security.md#FB-05-SE-B-004)

### Vue（1 道）

- [FB-16-SE-B-001 Vue 中常见的 XSS 风险有哪些？如何防范？](../by-domain/16-vue.md#FB-16-SE-B-001)

### AI 工程化（1 道）

- [FB-18-SE-B-038 前端展示 AI 生成内容时应注意哪些安全风险？](../by-domain/18-ai-engineering.md#FB-18-SE-B-038)

### 开发者体验与工程效能（1 道）

- [FB-21-SE-B-001 Jest 测试运行中的安全风险与敏感信息防护要点](../by-domain/21-dx.md#FB-21-SE-B-001)

### 部署与 SRE（1 道）

- [FB-22-SE-B-001 前端资源长期缓存可能带来哪些安全风险？如何防御缓存污染与 RPO 攻击？](../by-domain/22-deployment-sre.md#FB-22-SE-B-001)

### 包管理与供应链安全（1 道）

- [FB-23-SE-B-001 npm install 生命周期脚本（postinstall）有哪些供应链风险？企业应如何防御？](../by-domain/23-package-supply-chain.md#FB-23-SE-B-001)

### 安全架构（2 道）

- [FB-31-SE-B-001 什么是供应链安全？前端如何防护？](../by-domain/31-security-architecture.md#FB-31-SE-B-001)
- [FB-31-SE-B-002 前端如何处理用户身份认证安全？](../by-domain/31-security-architecture.md#FB-31-SE-B-002)

## 进阶题（34 道）{#advanced}

### Browser（1 道）

- [FB-03-SE-A-001 SameSite Cookie 的三种取值对跨站请求有什么影响？](../by-domain/03-browser.md#FB-03-SE-A-001)

### 计算机网络（3 道）

- [FB-04-SE-A-001 XSS 与 CSRF 的区别是什么？前端有哪些防御手段？](../by-domain/04-network.md#FB-04-SE-A-001)
- [FB-04-SE-A-002 什么是中间人攻击（MITM）和 DNS 劫持？HTTPS 能否完全防御？](../by-domain/04-network.md#FB-04-SE-A-002)
- [FB-04-SE-A-003 什么是跨域？CORS 的原理是什么？](../by-domain/04-network.md#FB-04-SE-A-003)

### Web 安全（8 道）

- [FB-05-SE-A-001 如何系统性地防御 XSS？](../by-domain/05-security.md#FB-05-SE-A-001)
- [FB-05-SE-A-002 CSRF Token 应该如何生成、分发和校验？](../by-domain/05-security.md#FB-05-SE-A-002)
- [FB-05-SE-A-003 如何为生产环境配置一套合理的 CSP 策略？](../by-domain/05-security.md#FB-05-SE-A-003)
- [FB-05-SE-A-004 JWT 在前端应该如何安全存储和传输？](../by-domain/05-security.md#FB-05-SE-A-004)
- [FB-05-SE-A-005 CORS 配置错误可能带来哪些安全风险？](../by-domain/05-security.md#FB-05-SE-A-005)
- [FB-05-SE-A-006 使用 postMessage 跨窗口通信时有哪些安全注意事项？](../by-domain/05-security.md#FB-05-SE-A-006)
- [FB-05-SE-A-007 什么是中间人攻击（MITM）？HTTPS 如何防御？前端还能做什么？](../by-domain/05-security.md#FB-05-SE-A-007)
- [FB-05-SE-A-008 请简述 OAuth 2.0 授权码模式的基本流程及前端注意事项。](../by-domain/05-security.md#FB-05-SE-A-008)

### CI/CD（2 道）

- [FB-12-SE-A-020 如何防止 CI/CD 流水线泄露 Secrets？](../by-domain/12-ci-cd.md#FB-12-SE-A-020)
- [FB-12-SE-A-025 SAST、SCA、DAST 分别是什么？在前端 CI 中如何应用？](../by-domain/12-ci-cd.md#FB-12-SE-A-025)

### Vue（1 道）

- [FB-16-SE-A-001 Vue 中如何安全地使用 v-html？](../by-domain/16-vue.md#FB-16-SE-A-001)

### 跨端技术（2 道）

- [FB-17-SE-A-013 Electron 应用有哪些安全注意事项？](../by-domain/17-cross-platform.md#FB-17-SE-A-013)
- [FB-17-SE-A-045 小程序有哪些常见安全风险？如何防御？](../by-domain/17-cross-platform.md#FB-17-SE-A-045)

### AI 工程化（3 道）

- [FB-18-SE-A-014 AI 应用中的安全与护栏（Guardrails）包括哪些方面？](../by-domain/18-ai-engineering.md#FB-18-SE-A-014)
- [FB-18-SE-A-015 前端 AI 应用如何处理敏感数据脱敏与隐私保护？](../by-domain/18-ai-engineering.md#FB-18-SE-A-015)
- [FB-18-SE-A-046 如何防范前端 AI 应用中的 Prompt 泄露？](../by-domain/18-ai-engineering.md#FB-18-SE-A-046)

### 开发者体验与工程效能（1 道）

- [FB-21-SE-A-001 使用 Playwright 进行端到端测试时，如何防范测试脚本中的安全与数据风险](../by-domain/21-dx.md#FB-21-SE-A-001)

### 部署与 SRE（2 道）

- [FB-22-SE-A-016 HTTPS/TLS 部署有哪些安全要点？](../by-domain/22-deployment-sre.md#FB-22-SE-A-016)
- [FB-22-SE-A-017 前端监控数据采集与上报过程中常见的安全风险有哪些？如何防御？](../by-domain/22-deployment-sre.md#FB-22-SE-A-017)

### 包管理与供应链安全（3 道）

- [FB-23-SE-A-013 供应链攻击有哪些常见手段？如何防御 typosquatting 与恶意包？](../by-domain/23-package-supply-chain.md#FB-23-SE-A-013)
- [FB-23-SE-A-014 企业私有 npm registry（Verdaccio / Nexus）有哪些常见安全风险与加固措施？](../by-domain/23-package-supply-chain.md#FB-23-SE-A-014)
- [FB-23-SE-A-015 供应链攻击有哪些常见形式？](../by-domain/23-package-supply-chain.md#FB-23-SE-A-015)

### 系统架构设计（2 道）

- [FB-25-SE-A-007 从架构视角看，前端安全应该如何设计？](../by-domain/25-system-architecture.md#FB-25-SE-A-007)
- [FB-25-SE-A-017 从架构角度看，前端供应链安全应该如何设计？](../by-domain/25-system-architecture.md#FB-25-SE-A-017)

### 安全架构（2 道）

- [FB-31-SE-A-001 前端加密与后端加密有什么区别？前端加密能否替代 HTTPS？](../by-domain/31-security-architecture.md#FB-31-SE-A-001)
- [FB-31-SE-A-002 什么是安全左移？前端如何实践？](../by-domain/31-security-architecture.md#FB-31-SE-A-002)

### Serverless/Edge（1 道）

- [FB-35-SE-A-001 Serverless 安全与权限如何管理？](../by-domain/35-serverless-edge.md#FB-35-SE-A-001)

### 小程序（1 道）

- [FB-45-SE-A-007 小程序的权限管理和用户授权如何处理？](../by-domain/45-mini-program.md#FB-45-SE-A-007)

### Electron（1 道）

- [FB-48-SE-A-003 Electron 应用应该遵循哪些安全最佳实践？](../by-domain/48-electron.md#FB-48-SE-A-003)

### 低代码（1 道）

- [FB-52-SE-A-008 低代码平台需要考虑哪些安全问题？](../by-domain/52-low-code.md#FB-52-SE-A-008)

## 深入题（40 道）{#proficient}

### Browser（1 道）

- [FB-03-SE-P-001 Content Security Policy（CSP）如何限制 XSS 攻击？有哪些常用指令？](../by-domain/03-browser.md#FB-03-SE-P-001)

### 计算机网络（1 道）

- [FB-04-SE-P-001 CSP、SameSite Cookie 与安全响应头如何协同防御前端攻击？](../by-domain/04-network.md#FB-04-SE-P-001)

### Web 安全（9 道）

- [FB-05-SE-P-001 深入分析 DOM 型 XSS 的触发原理与防御难点。](../by-domain/05-security.md#FB-05-SE-P-001)
- [FB-05-SE-P-002 什么是原型污染（Prototype Pollution）？前端如何利用或防御？](../by-domain/05-security.md#FB-05-SE-P-002)
- [FB-05-SE-P-003 什么是 DOM Clobbering？它如何绕过某些安全控制？](../by-domain/05-security.md#FB-05-SE-P-003)
- [FB-05-SE-P-004 什么是 MIME Sniffing / Content Sniffing 攻击？如何防御？](../by-domain/05-security.md#FB-05-SE-P-004)
- [FB-05-SE-P-005 什么是开放重定向（Open Redirect）？前端如何参与防御？](../by-domain/05-security.md#FB-05-SE-P-005)
- [FB-05-SE-P-006 XSS 过滤/转义有哪些常见绕过手法？如何设计更健壮的防御？](../by-domain/05-security.md#FB-05-SE-P-006)
- [FB-05-SE-P-007 什么是供应链攻击？前端项目中有哪些典型风险点？](../by-domain/05-security.md#FB-05-SE-P-007)
- [FB-05-SE-P-008 除了 X-Frame-Options，点击劫持还有哪些高级防御手段？](../by-domain/05-security.md#FB-05-SE-P-008)
- [FB-05-SE-P-011 什么是供应链安全？前端项目如何做好依赖安全？](../by-domain/05-security.md#FB-05-SE-P-011)

### CI/CD（1 道）

- [FB-12-SE-P-021 如何保障 CI/CD 软件供应链安全？](../by-domain/12-ci-cd.md#FB-12-SE-P-021)

### Vue（1 道）

- [FB-16-SE-P-001 Vue 应用中如何防御 CSRF 攻击？](../by-domain/16-vue.md#FB-16-SE-P-001)

### AI 工程化（5 道）

- [FB-18-SE-P-023 什么是 Prompt Injection？如何防御？](../by-domain/18-ai-engineering.md#FB-18-SE-P-023)
- [FB-18-SE-P-024 如何设计 AI 应用的内容安全审核与越狱防御体系？](../by-domain/18-ai-engineering.md#FB-18-SE-P-024)
- [FB-18-SE-P-056 如何构建企业级 AI 应用的权限与审计体系？](../by-domain/18-ai-engineering.md#FB-18-SE-P-056)
- [FB-18-SE-P-057 如何保障 AI 应用的内容安全与合规？](../by-domain/18-ai-engineering.md#FB-18-SE-P-057)
- [FB-18-SE-P-058 如何防止 AI 应用中的 Prompt 注入和数据泄露？](../by-domain/18-ai-engineering.md#FB-18-SE-P-058)

### Node.js / BFF（3 道）

- [FB-19-SE-P-020 Node.js 服务常见的安全漏洞有哪些？如何防御？](../by-domain/19-node-bff.md#FB-19-SE-P-020)
- [FB-19-SE-P-049 Node.js 服务如何防御 CSRF、XSS、SQL 注入等常见 Web 攻击？](../by-domain/19-node-bff.md#FB-19-SE-P-049)
- [FB-19-SE-P-050 如何保障 Node.js/BFF 服务的安全性？](../by-domain/19-node-bff.md#FB-19-SE-P-050)

### Git 工作流与变更管理（3 道）

- [FB-20-SE-P-021 Git 中如何保障提交安全和防止敏感信息泄露？](../by-domain/20-git-workflow.md#FB-20-SE-P-021)
- [FB-20-SE-P-051 客户端 Git Hooks 能被绕过，如何保证规范落地？](../by-domain/20-git-workflow.md#FB-20-SE-P-051)
- [FB-20-SE-P-056 Git 仓库中发生密钥泄露后，完整的应急处理流程是什么？](../by-domain/20-git-workflow.md#FB-20-SE-P-056)

### 开发者体验与工程效能（1 道）

- [FB-21-SE-P-001 Monorepo 使用 Turborepo 远程缓存时的安全风险与访问控制](../by-domain/21-dx.md#FB-21-SE-P-001)

### 部署与 SRE（1 道）

- [FB-22-SE-P-001 使用 Vercel/边缘平台托管前端时，监控与可观测性方面有哪些安全风险？如何防御？](../by-domain/22-deployment-sre.md#FB-22-SE-P-001)

### 包管理与供应链安全（3 道）

- [FB-23-SE-P-018 Sigstore、Provenance 与 NPM 发布签名是什么？它们如何提升供应链安全？](../by-domain/23-package-supply-chain.md#FB-23-SE-P-018)
- [FB-23-SE-P-021 SBOM 是什么？如何做许可证合规？](../by-domain/23-package-supply-chain.md#FB-23-SE-P-021)
- [FB-23-SE-P-022 如何建立第三方依赖的漏洞修复 SLA 与版本维护策略？](../by-domain/23-package-supply-chain.md#FB-23-SE-P-022)

### 前端运维与监控（1 道）

- [FB-24-SE-P-006 前端限流与客户端防护如何设计？](../by-domain/24-frontend-operations.md#FB-24-SE-P-006)

### 安全架构（3 道）

- [FB-31-SE-P-001 前端零信任架构的核心原则是什么？](../by-domain/31-security-architecture.md#FB-31-SE-P-001)
- [FB-31-SE-P-002 CSP 有哪些常见绕过方式？如何构建深度防御？](../by-domain/31-security-architecture.md#FB-31-SE-P-002)
- [FB-31-SE-P-003 什么是前端运行时应用自保护（RASP）？](../by-domain/31-security-architecture.md#FB-31-SE-P-003)

### 实时与协同（1 道）

- [FB-32-SE-P-001 实时协同中的安全与权限如何设计？](../by-domain/32-real-time.md#FB-32-SE-P-001)

### Serverless/Edge（1 道）

- [FB-35-SE-P-001 Edge 上的认证与授权如何设计？](../by-domain/35-serverless-edge.md#FB-35-SE-P-001)

### 前端数据工程（1 道）

- [FB-36-SE-P-001 前端数据隐私合规有哪些深度措施？](../by-domain/36-data-engineering.md#FB-36-SE-P-001)

### 鸿蒙 ArkTS / HarmonyOS（1 道）

- [FB-46-SE-P-021 鸿蒙应用的安全架构是怎样的？如何做好权限治理？](../by-domain/46-harmonyos.md#FB-46-SE-P-021)

### Electron（1 道）

- [FB-48-SE-P-002 preload 与 contextIsolation 的底层安全模型是怎样的？](../by-domain/48-electron.md#FB-48-SE-P-002)

### WebAssembly（1 道）

- [FB-49-SE-P-004 WebAssembly 的安全模型与沙箱机制是怎样的？](../by-domain/49-webassembly.md#FB-49-SE-P-004)

### 行业特化（1 道）

- [FB-56-SE-P-003 金融级前端安全体系设计](../by-domain/56-industry.md#FB-56-SE-P-003)

## 架构题（8 道）{#architect}

### Web 安全（4 道）

- [FB-05-SE-R-001 如何在团队中落地安全 SDL（安全开发生命周期）？](../by-domain/05-security.md#FB-05-SE-R-001)
- [FB-05-SE-R-002 如何治理前端供应链安全风险？](../by-domain/05-security.md#FB-05-SE-R-002)
- [FB-05-SE-R-003 前端加密与密钥管理有哪些原则和最佳实践？](../by-domain/05-security.md#FB-05-SE-R-003)
- [FB-05-SE-R-004 前端隐私合规（GDPR/个保法）需要关注哪些技术点？](../by-domain/05-security.md#FB-05-SE-R-004)

### AI 工程化（1 道）

- [FB-18-SE-R-063 如何设计覆盖全链路的 AI 安全架构？](../by-domain/18-ai-engineering.md#FB-18-SE-R-063)

### 微前端（1 道）

- [FB-26-SE-R-027 微前端安全架构需要考虑哪些风险与防御？](../by-domain/26-micro-frontend.md#FB-26-SE-R-027)

### 小程序（1 道）

- [FB-45-SE-R-006 小程序安全架构应考虑哪些方面？](../by-domain/45-mini-program.md#FB-45-SE-R-006)

### 低代码（1 道）

- [FB-52-SE-R-008 如何设计低代码平台的安全架构？](../by-domain/52-low-code.md#FB-52-SE-R-008)

