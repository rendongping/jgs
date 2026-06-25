# 前端安全架构练习册

> 通过练习掌握威胁建模、SDL、供应链安全、隐私架构与运行时安全控制。

---

## 难度分级

- 🟢 基础：理解概念，能识别安全问题。
- 🟡 进阶：能应用安全控制措施。
- 🔴 深入：能设计安全架构和流程。

---

## 一、选择题

### 第 1 题（🟢）

STRIDE 模型中，S 代表什么威胁？

A. Spoofing  
B. Scanning  
C. Stealing  
D. Sniffing

### 第 2 题（🟢）

以下哪个响应头用于防止 MIME 嗅探？

A. X-Frame-Options  
B. X-Content-Type-Options  
C. Content-Security-Policy  
D. Referrer-Policy

### 第 3 题（🟡）

SRI（Subresource Integrity）主要用于解决什么问题？

A. 防止 XSS  
B. 校验 CDN 资源完整性  
C. 防止 CSRF  
D. 加密传输数据

### 第 4 题（🟡）

以下哪项不是隐私设计原则？

A. 数据最小化  
B. 目的限制  
C. 数据最大化  
D. 默认隐私

### 第 5 题（🟡）

CSP 的主要作用是？

A. 加速页面加载  
B. 防御 XSS 和数据注入  
C. 实现 HTTPS  
D. 压缩资源

### 第 6 题（🔴）

安全左移（Shift Left Security）的核心理念是？

A. 将安全检查推迟到上线前  
B. 将安全融入软件开发生命周期的早期  
C. 只在生产环境做安全监控  
D. 由专门的安全团队负责所有安全工作

---

## 二、代码分析题

### 第 7 题（🟡）

分析以下代码的安全风险：

```js
const userInput = location.hash.slice(1);
document.getElementById('content').innerHTML = userInput;
```

### 第 8 题（🟡）

以下 npm 脚本有什么问题？如何改进？

```json
{
  "scripts": {
    "build": "webpack",
    "postinstall": "node ./scripts/setup.js"
  }
}
```

### 第 9 题（🔴）

某 SPA 应用将 JWT Access Token 存储在 localStorage 中，请分析风险并给出更安全的方案。

---

## 三、设计/开放题

### 第 10 题（🟡）

为一个电商商品详情页设计 CSP 策略，要求：
- 允许加载自身域名的脚本和样式
- 允许加载信任的 CDN 图片
- 禁止内联脚本（除 nonce 外）
- 启用 XSS 报告

### 第 11 题（🔴）

设计一个前端 SDL 流程，覆盖需求、设计、编码、测试、发布、运营六个阶段。

### 第 12 题（🔴）

某团队频繁出现 npm 依赖的安全漏洞，请设计一套供应链安全治理方案。

---

## 参考答案

### 第 1 题

::: details 查看答案与解析
**答案：A**

STRIDE 中 S 代表 Spoofing（伪装）。
:::

### 第 2 题

::: details 查看答案与解析
**答案：B**

`X-Content-Type-Options: nosniff` 用于防止浏览器 MIME 嗅探。
:::

### 第 3 题

::: details 查看答案与解析
**答案：B**

SRI 用于校验从 CDN 加载的资源是否被篡改。
:::

### 第 4 题

::: details 查看答案与解析
**答案：C**

隐私设计原则包括数据最小化、目的限制、默认隐私等，不包括数据最大化。
:::

### 第 5 题

::: details 查看答案与解析
**答案：B**

CSP（Content Security Policy）是防御 XSS 和数据注入的重要机制。
:::

### 第 6 题

::: details 查看答案与解析
**答案：B**

安全左移指将安全实践融入软件开发生命周期的早期阶段，而非上线前突击。
:::

### 第 7 题

**风险分析**：
- 直接将用户输入插入 innerHTML，存在 DOM-based XSS 风险。
- 攻击者可通过构造 hash 注入 `<script>` 标签执行恶意代码。

**改进方案**：

```js
const userInput = location.hash.slice(1);
const div = document.getElementById('content');
div.textContent = userInput; // 使用 textContent 而非 innerHTML
```

如果必须渲染 HTML，应使用 DOMPurify 等库消毒。

### 第 8 题

**问题分析**：
- `postinstall` 脚本会在安装依赖时自动执行，如果依赖被篡改，可能执行恶意代码。
- 缺少依赖审计和签名验证。

**改进方案**：
- 避免使用 `postinstall` 执行非必要脚本。
- 使用 `ignore-scripts` 安装后手动审查脚本。
- 在 CI 中运行 `npm audit` 和依赖签名验证。

### 第 9 题

**风险分析**：
- localStorage 可被 XSS 攻击读取，导致 Token 泄露。
- Token 长期存在 localStorage 中，风险窗口大。

**更安全方案**：
- Access Token 短期有效，存储在内存中。
- Refresh Token 存储在 HttpOnly、Secure、SameSite=Strict 的 Cookie 中。
- 使用 BFF 或后端处理 Token 刷新，减少前端暴露。

### 第 10 题

**参考 CSP**：

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://trusted.cdn.com 'nonce-{random}';
  style-src 'self' https://trusted.cdn.com 'nonce-{random}';
  img-src 'self' https://trusted.cdn.com data:;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  report-uri /csp-report;
```

### 第 11 题

**前端 SDL 流程**：

| 阶段 | 活动 |
|------|------|
| 需求分析 | 识别敏感数据、合规要求、资产价值 |
| 安全设计 | 威胁建模、绘制数据流图、选择控制措施 |
| 安全编码 | 编码规范、输入校验、输出编码、安全 API |
| 安全测试 | SAST、依赖审计、DAST、渗透测试 |
| 安全发布 | CSP、SRI、安全响应头、签名验证 |
| 安全运营 | 监控、漏洞响应、事件复盘、持续改进 |

### 第 12 题

**供应链安全治理方案**：

1. **固定版本**：使用 lockfile，禁止自动升级 major 版本。
2. **依赖审计**：CI 中运行 `npm audit`，阻塞高风险漏洞。
3. **私有 Registry**：企业内使用受控的 npm 镜像。
4. **审批流程**：新增依赖需经过安全审批。
5. **SRI 校验**：CDN 资源使用 integrity 属性。
6. **定期更新**：建立依赖更新节奏，及时修复漏洞。
7. **源码审查**：对关键依赖进行源码级审查。
8. **监控公告**：订阅依赖安全公告（如 GitHub Security Advisories）。

---

**标签**：`#security` `#security-architecture` `#threat-modeling` `#supply-chain` `#privacy`

> **最后更新**：2026-06-25
