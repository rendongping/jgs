# Web 安全面试题

> 本题库共收录 **73** 道面试题（基础 13 / 进阶 24 / 深入 23 / 架构 13）。
> 本文件收录 Web 安全相关面试题，目标题量 120 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（13 道）{#basic}

### FB-05-CO-B-001：什么是 XSS？它有哪些常见类型？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全、03 浏览器原理
**标签**：XSS、存储型 XSS、反射型 XSS、DOM 型 XSS、注入攻击
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 XSS（跨站脚本攻击）的概念，并说明存储型、反射型和 DOM 型 XSS 的区别与典型触发场景。

**参考答案**：

XSS（Cross-Site Scripting）是指攻击者将恶意脚本注入到网页中，使其在用户浏览器中执行，从而窃取 Cookie、会话令牌、钓鱼或执行恶意操作。

三种常见类型：

1. **存储型 XSS（Stored XSS）**：恶意脚本被持久化存储到服务器（如数据库、评论、文章），所有访问该页面的用户都会执行。危害最大。
2. **反射型 XSS（Reflected XSS）**：恶意脚本通过 URL 参数等传给服务器，服务器立即将脚本反射回响应页面，通常需要诱骗用户点击恶意链接。
3. **DOM 型 XSS（DOM-based XSS）**：恶意输入通过前端 JavaScript 操作 DOM 时直接触发，不经过服务器响应，如 `innerHTML`、`eval`、`location.hash`。

```html
<!-- 反射型示例：攻击者构造 URL -->
https://example.com/search?q=<script>alert(document.cookie)</script>

<!-- DOM 型示例 -->
<script>
  document.write(location.hash.slice(1)); // #<img src=x onerror=alert(1)>
</script>
```

**评分维度**：
- 概念准确性（40%）：能否说清 XSS 的本质是脚本注入
- 三种类型区分（40%）：能否从触发点、持久化、是否经过服务器区分
- 举例能力（20%）：能否给出每种类型的简单示例

**常见错误**：
- 只提到反射型 XSS，忽略存储型和 DOM 型
- 认为 XSS 只能窃取 Cookie，忽略键盘记录、钓鱼、挖矿等
- 认为前端框架默认能完全防御 XSS

**延伸追问**：
- 如果候选人答对了，可追问：Vue/React 为什么能防御大部分 XSS？还有哪些场景会绕过？
- 如果候选人答错了，可引导：如果用户输入直接写到页面里，会发生什么？

**相关题目**：
- [FB-05-SE-A-001 如何系统防御 XSS](#FB-05-SE-A-001)
- [FB-05-SE-P-001 深入分析 DOM 型 XSS](#FB-05-SE-P-001)

**参考资源**：
- [MDN - Cross-site scripting](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss)
- [OWASP - XSS](https://owasp.org/www-community/attacks/xss/)

**口头回答版**：
> XSS（Cross-Site Scripting）是指攻击者将恶意脚本注入到网页中，使其在用户浏览器中执行，从而窃取 Cookie、会话令牌、钓鱼或执行恶意操作。 存储型 XSS（Stored XSS）：恶意脚本被持久化存储到服务器（如数据库、评论、文章），所有访问该页面的用户都会执行。 反射型 XSS（Reflected XSS）：恶意脚本通过 URL 参数等传给服务器，服务器立即将脚本反射回响应页面，通常需要诱骗用户点击恶意链接。 DOM 型 XSS（DOM-based XSS）：恶意输入通过前端 JavaScript 操作 DOM 时直接触发，不经过服务器响应，如 innerHTML、eval、location.hash。

---

### FB-05-CO-B-002：什么是 CSRF？如何防御？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全
**标签**：CSRF、跨站请求伪造、Token、SameSite
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CSRF（跨站请求伪造）的攻击原理，并列举至少三种防御方法。

**参考答案**：

CSRF（Cross-Site Request Forgery）是指攻击者诱导已登录用户在不知情的情况下，向目标站点发起恶意请求。浏览器会自动携带该域下的 Cookie，因此服务器会误认为是用户本人的合法操作。

典型场景：用户登录银行网站后访问恶意页面，恶意页面自动提交转账表单。

防御方法：

1. **CSRF Token**：服务端生成随机 Token 嵌入表单或响应头，敏感操作必须携带并校验。
2. **SameSite Cookie**：设置 `SameSite=Lax` 或 `Strict`，限制第三方站点携带 Cookie。
3. **校验 Referer/Origin**：检查请求来源，拒绝来自非本站的请求。
4. **二次确认**：敏感操作增加验证码、短信验证或密码确认。
5. **自定义请求头**：如 `X-Requested-With`，跨域简单请求无法自定义头部。

```http
Set-Cookie: session=xxx; HttpOnly; Secure; SameSite=Lax
```

**评分维度**：
- 攻击原理理解（40%）：能否说清利用浏览器自动携带 Cookie 的机制
- 防御方法数量与准确性（40%）：至少说出 3 种并解释原理
- 实际应用意识（20%）：能否结合业务说明如何选择防御手段

**常见错误**：
- 把 CSRF 和 XSS 混淆
- 认为只要用了 HTTPS 就能防 CSRF
- 认为前端校验 Referer 足够安全（可被绕过）

**延伸追问**：
- `SameSite=None` 和 `SameSite=Lax` 有什么区别？什么场景必须用 `None`？
- 如果接口既要支持跨域调用又要防 CSRF，该如何设计？

**相关题目**：
- [FB-05-SE-A-002 CSRF Token 的设计与校验](#FB-05-SE-A-002)
- [FB-05-CO-B-003 Cookie 安全属性](#FB-05-CO-B-003)

**参考资源**：
- [OWASP - CSRF](https://owasp.org/www-community/attacks/csrf/)
- [MDN - SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

**口头回答版**：
> CSRF（Cross-Site Request Forgery）是指攻击者诱导已登录用户在不知情的情况下，向目标站点发起恶意请求。 浏览器会自动携带该域下的 Cookie，因此服务器会误认为是用户本人的合法操作。 典型场景：用户登录银行网站后访问恶意页面，恶意页面自动提交转账表单。 CSRF Token：服务端生成随机 Token 嵌入表单或响应头，敏感操作必须携带并校验。

---

### FB-05-CO-B-003：Cookie 的 HttpOnly、Secure、SameSite 属性分别有什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全
**标签**：Cookie、HttpOnly、Secure、SameSite、会话安全
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Cookie 的三个关键安全属性 `HttpOnly`、`Secure`、`SameSite` 的作用，并解释为什么需要同时使用它们。

**参考答案**：

1. **HttpOnly**：禁止 JavaScript 通过 `document.cookie` 访问该 Cookie，可有效防御 XSS 窃取会话 Cookie。
2. **Secure**：Cookie 只在 HTTPS 连接中传输，防止明文 HTTP 被窃听或中间人攻击。
3. **SameSite**：控制 Cookie 在跨站请求中是否发送，用于防御 CSRF。
   - `Strict`：仅同站请求携带，最严格。
   - `Lax`：允许顶部导航（如 a 链接）携带，阻止 POST 等危险跨站请求，推荐默认值。
   - `None`：允许跨站携带，必须配合 `Secure`。

三者应组合使用：

```http
Set-Cookie: session=xxx; HttpOnly; Secure; SameSite=Lax; Path=/
```

**评分维度**：
- 三个属性作用（60%）：分别评估 HttpOnly、Secure、SameSite 的理解
- 组合使用意识（20%）：能否说明为什么需要同时设置
- 场景选择能力（20%）：能否根据业务选择 SameSite 值

**常见错误**：
- 认为 HttpOnly 能防 CSRF（实际防 XSS 窃取 Cookie）
- 认为 Secure 能防 XSS（实际防传输窃听）
- 在需要跨域嵌入的场景误用 SameSite=Strict

**延伸追问**：
- 如果业务是跨域 iframe 嵌入，SameSite 应该怎么配？
- 为什么 `SameSite=None` 必须配合 `Secure`？

**相关题目**：
- [FB-05-CO-B-002 什么是 CSRF](#FB-05-CO-B-002)
- [FB-05-SE-A-006 postMessage 安全](#FB-05-SE-A-006)

**参考资源**：
- [MDN - Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)

**口头回答版**：
> HttpOnly：禁止 JavaScript 通过 document.cookie 访问该 Cookie，可有效防御 XSS 窃取会话 Cookie。 Secure：Cookie 只在 HTTPS 连接中传输，防止明文 HTTP 被窃听或中间人攻击。 SameSite：控制 Cookie 在跨站请求中是否发送，用于防御 CSRF。 - Strict：仅同站请求携带，最严格。

---

### FB-05-CO-B-004：HTTPS 为什么比 HTTP 更安全？TLS 握手过程是怎样的？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全、04 计算机网络
**标签**：HTTPS、TLS、SSL、中间人、加密、握手
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请简述 HTTPS 相比 HTTP 的安全优势，并描述 TLS 握手的主要步骤。

**参考答案**：

HTTPS = HTTP + TLS/SSL，提供：

1. **机密性**：通过对称加密防止窃听。
2. **完整性**：通过 MAC（消息认证码）防止篡改。
3. **身份认证**：通过数字证书验证服务器身份，防止中间人冒充。

TLS 1.2 握手简化步骤：

1. 客户端发送 `ClientHello`，包含支持的 TLS 版本、密码套件、随机数。
2. 服务器返回 `ServerHello`、证书（Certificate）、服务器随机数。
3. 客户端验证证书，生成 Pre-Master Secret，用服务器公钥加密后发送。
4. 双方根据随机数和 Pre-Master Secret 生成会话密钥。
5. 客户端发送 `Finished`，服务器返回 `Finished`，后续使用对称加密通信。

TLS 1.3 简化为 1-RTT（甚至 0-RTT 会话恢复），并移除了不安全的算法。

**评分维度**：
- HTTPS 安全优势（40%）：机密性、完整性、身份认证
- TLS 握手步骤（40%）：ClientHello、证书验证、密钥交换、Finished
- TLS 版本差异（20%）：是否提到 TLS 1.3 优化

**常见错误**：
- 认为 HTTPS 只是加密了 URL（实际 URL 仍可见，内容加密）
- 忽略证书验证环节
- 把 TLS 和 SSL 混为一谈但不说明版本差异

**延伸追问**：
- 如果用户忽略证书警告继续访问，会发生什么？
- 什么是 HSTS？为什么需要它？

**相关题目**：
- [FB-05-SE-A-007 MITM 与 HSTS](#FB-05-SE-A-007)
- [FB-05-SE-R-003 前端加密与密钥管理](#FB-05-SE-R-003)

**参考资源**：
- [MDN - HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/https)
- [Cloudflare - TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)

**口头回答版**：
> HTTPS = HTTP + TLS/SSL，提供： 机密性：通过对称加密防止窃听。 完整性：通过 MAC（消息认证码）防止篡改。 身份认证：通过数字证书验证服务器身份，防止中间人冒充。

---

### FB-05-CO-B-005：什么是 CORS？为什么会出现 CORS 错误？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全、04 计算机网络
**标签**：CORS、同源策略、跨域、预检请求
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CORS（跨域资源共享）的作用，并说明什么情况下会触发预检请求（Preflight）。

**参考答案**：

CORS 是浏览器实现的跨域访问控制机制。同源策略（Same-Origin Policy）默认禁止跨域读取资源，CORS 通过 HTTP 头部让服务器声明哪些源可以访问资源。

常见 CORS 响应头：

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

预检请求（OPTIONS）触发条件：

1. 请求方法不是 GET/HEAD/POST。
2. 自定义了请求头（如 `Authorization`、`X-Request-Id`）。
3. Content-Type 不是 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`。

简单请求不会触发预检，浏览器直接发送并检查响应头。

**评分维度**：
- CORS 作用理解（40%）：能否说清是浏览器安全策略而非服务器拦截
- 预检条件（40%）：能否准确说出触发条件
- 实际排错能力（20%）：能否根据报错判断是缺少哪个头

**常见错误**：
- 认为 CORS 是服务器拒绝请求（实际是浏览器拦截响应）
- 混淆 `Access-Control-Allow-Origin: *` 和带凭据的跨域
- 认为关闭浏览器 CORS 插件是合理解决方案

**延伸追问**：
- 为什么 `Access-Control-Allow-Origin: *` 不能和 `Access-Control-Allow-Credentials: true` 一起用？
- 如何处理多个来源的 CORS？

**相关题目**：
- [FB-05-SE-A-005 CORS 配置错误与安全风险](#FB-05-SE-A-005)

**参考资源**：
- [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

**口头回答版**：
> CORS 是浏览器实现的跨域访问控制机制。 同源策略（Same-Origin Policy）默认禁止跨域读取资源，CORS 通过 HTTP 头部让服务器声明哪些源可以访问资源。 常见 CORS 响应头： 预检请求（OPTIONS）触发条件：

---

### FB-05-CO-B-006：什么是 CSP？它如何帮助防御 XSS？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：CSP、内容安全策略、XSS、内联脚本
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CSP（Content Security Policy）的基本概念，并说明它如何降低 XSS 风险。

**参考答案**：

CSP 是一种声明式安全机制，通过 HTTP 头 `Content-Security-Policy` 告诉浏览器哪些资源可以加载和执行，从而限制恶意脚本运行。

常见指令：

- `default-src`：默认资源策略
- `script-src`：允许执行的脚本来源
- `style-src`：允许的样式来源
- `img-src`：允许的图片来源
- `connect-src`：允许的 AJAX/WebSocket 目标
- `frame-ancestors`：控制哪些页面可以嵌入当前页

防御 XSS 的方式：

1. 禁止内联脚本：`script-src 'self'`
2. 禁止 `eval`：`script-src 'self';`（默认不允许 `unsafe-eval`）
3. 限制脚本来源：仅允许可信 CDN 或本域
4. 报告违规行为：`report-uri` 或 `report-to`

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com; img-src 'self' data:
```

**评分维度**：
- CSP 概念理解（40%）：能否说清是资源加载和执行白名单
- 关键指令（30%）：能否说出 script-src、default-src 等
- XSS 防御原理（30%）：能否解释禁止内联脚本和 eval 的作用

**常见错误**：
- 认为 CSP 能完全替代输入输出编码
- 使用 `unsafe-inline` 和 `unsafe-eval` 后认为 CSP 仍有意义（意义大幅降低）
- 忽略 CSP 报告机制

**延伸追问**：
- 如果业务必须使用内联脚本，CSP 该怎么配置？
- `nonce` 和 `hash` 在 CSP 中如何使用？

**相关题目**：
- [FB-05-SE-A-003 CSP 策略配置实战](#FB-05-SE-A-003)
- [FB-05-SD-R-003 设计 CSP 部署策略](#FB-05-SD-R-003)

**参考资源**：
- [MDN - CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Quick Reference](https://content-security-policy.com/)

**口头回答版**：
> CSP 是一种声明式安全机制，通过 HTTP 头 Content-Security-Policy 告诉浏览器哪些资源可以加载和执行，从而限制恶意脚本运行。 - default-src：默认资源策略 - script-src：允许执行的脚本来源 - style-src：允许的样式来源

---

### FB-05-SE-B-001：localStorage 和 sessionStorage 的安全风险有哪些？

**题型**：安全题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全、03 浏览器原理
**标签**：localStorage、sessionStorage、XSS、敏感数据、同源
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 localStorage 和 sessionStorage 的安全隐患，以及哪些数据不适合存放在其中。

**参考答案**：

两者都是浏览器同源（origin）下的键值存储，但存在以下安全风险：

1. **XSS 可读**：一旦页面存在 XSS 漏洞，攻击脚本可直接读取 `localStorage` 和 `sessionStorage`。
2. **无过期机制**：localStorage 持久保存，设备被物理访问或恶意软件读取风险更高。
3. **不随 HTTP 请求自动发送**：这既是优点也是缺点，无法像 HttpOnly Cookie 一样被保护。
4. **同源共享**：同一 origin 下所有页面/标签共享，子域名或路径隔离不足。

不适合存放的数据：

- 访问令牌（Access Token）尤其是长期有效的
- 用户密码、身份证、银行卡等敏感信息
- 刷新令牌（Refresh Token）

替代方案：

- 短期 Access Token 可放内存
- Refresh Token 应放 HttpOnly Cookie
- 敏感信息建议放服务端会话

**评分维度**：
- XSS 可读风险（40%）：能否说清存储与 Cookie 在安全上的核心差异
- 不适合存放的数据（30%）：能否举出敏感数据类型
- 替代方案（30%）：能否给出合理的存储建议

**常见错误**：
- 认为 sessionStorage 完全安全（XSS 下同样可读）
- 认为 localStorage 有 HttpOnly 等价机制
- 把 JWT 长期存在 localStorage 并认为是最佳实践

**延伸追问**：
- 如果一定要把 token 放前端，放内存和放 storage 有什么区别？
- 单页应用中如何安全地管理登录状态？

**相关题目**：
- [FB-05-SE-A-004 JWT 安全存储与传输](#FB-05-SE-A-004)
- [FB-05-SE-R-003 前端加密与密钥管理](#FB-05-SE-R-003)

**参考资源**：
- [OWASP - HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)

**口头回答版**：
> 两者都是浏览器同源（origin）下的键值存储，但存在以下安全风险： XSS 可读：一旦页面存在 XSS 漏洞，攻击脚本可直接读取 localStorage 和 sessionStorage。 无过期机制：localStorage 持久保存，设备被物理访问或恶意软件读取风险更高。 不随 HTTP 请求自动发送：这既是优点也是缺点，无法像 HttpOnly Cookie 一样被保护。

---

### FB-05-SE-B-002：前端视角下，SQL 注入是如何发生的？如何防御？

**题型**：安全题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全
**标签**：SQL 注入、输入校验、参数化查询、前后端分离
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
SQL 注入虽然主要发生在后端，但前端也能起到关键防御作用。请说明前端能做哪些事来降低 SQL 注入风险。

**参考答案**：

SQL 注入本质是用户输入被当作 SQL 代码执行。前端虽不直接执行 SQL，但以下行为会影响风险：

1. **输入校验**：在提交前校验数据类型、长度、格式（如数字字段拒绝非数字字符），减少恶意输入到达后端。
2. **避免拼接参数**：不要把用户输入直接拼接到 URL 查询字符串或请求体中作为命令片段。
3. **使用参数化 API**：调用后端时明确区分数据和指令，GraphQL 等查询语言也应注意变量绑定。
4. **输出展示安全**：即使后端做了防御，前端展示数据时也要防止 XSS。

前端示例：

```js
// 不推荐：直接拼接搜索条件
const query = `SELECT * FROM users WHERE name = '${userInput}'`;

// 推荐：通过 API 传参，由后端使用参数化查询
fetch('/api/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: userInput })
});
```

**评分维度**：
- 理解 SQL 注入本质（30%）：用户输入被解释为代码
- 前端防御措施（40%）：输入校验、避免拼接、参数化 API
- 前后端协作意识（30%）：强调后端是主要防御点，前端是辅助

**常见错误**：
- 认为前端做转义就能防 SQL 注入
- 在前端拼接 SQL 语句再发给后端执行
- 忽略后端参数化查询的重要性

**延伸追问**：
- 如果后端提供的是 GraphQL 接口，前端如何防止类似注入？
- 前端校验能完全替代后端校验吗？为什么？

**参考资源**：
- [OWASP - SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)

**口头回答版**：
> SQL 注入本质是用户输入被当作 SQL 代码执行。 前端虽不直接执行 SQL，但以下行为会影响风险： 输入校验：在提交前校验数据类型、长度、格式（如数字字段拒绝非数字字符），减少恶意输入到达后端。 避免拼接参数：不要把用户输入直接拼接到 URL 查询字符串或请求体中作为命令片段。

---

### FB-05-SE-B-003：为什么说“永远不信任用户输入”？前端应如何处理不可信数据？

**题型**：安全题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全
**标签**：输入校验、输出编码、XSS、不可信数据、防御纵深
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释"永远不信任用户输入"的安全原则，并说明前端在接收和展示用户输入时应采取的措施。

**参考答案**：

"永远不信任用户输入"是安全编程的核心原则：任何来自用户或外部系统的数据都可能被恶意构造，必须在验证和清理后才能使用。

前端处理不可信数据的措施：

1. **输入校验（Input Validation）**：
   - 白名单校验：只允许预期的字符、格式、长度。
   - 类型转换：数字字段必须转为数字后再使用。
   - 客户端校验是提升体验，不能替代服务端校验。

2. **输出编码（Output Encoding）**：
   - 插入 HTML 前进行 HTML 实体编码。
   - 插入 URL 前进行 URL 编码。
   - 插入 JavaScript/JSON 前进行对应上下文编码。

3. **避免危险 API**：
   - 不用 `innerHTML`、`document.write` 插入不可信内容。
   - 不用 `eval`、`setTimeout(string)` 执行用户输入。

4. **使用框架安全机制**：
   - React 的 `{}` 默认转义、Vue 的 `&#123;&#123; &#125;&#125;`、Angular 的绑定均会自动编码。

```js
// 危险
el.innerHTML = userInput;

// 安全
element.textContent = userInput;
```

**评分维度**：
- 原则理解（30%）：能否解释为什么要默认不信任
- 输入校验（30%）：白名单、类型、长度
- 输出编码与危险 API（40%）：能否说出具体做法

**常见错误**：
- 认为前端校验可以替代后端校验
- 用黑名单（如过滤 `<script>`）替代白名单和编码
- 认为现代框架自动转义后可以随意使用 `dangerouslySetInnerHTML`

**延伸追问**：
- 如果用户输入要展示为富文本，应该怎么做？
- 黑名单过滤 `<script>` 有什么绕过方式？

**相关题目**：
- [FB-05-SC-A-001 如何安全实现富文本编辑器](#FB-05-SC-A-001)
- [FB-05-SE-A-001 如何系统防御 XSS](#FB-05-SE-A-001)

**参考资源**：
- [OWASP - Input Validation](https://owasp.org/www-community/controls/Input_Validation)

**口头回答版**：
> "永远不信任用户输入"是安全编程的核心原则：任何来自用户或外部系统的数据都可能被恶意构造，必须在验证和清理后才能使用。 前端处理不可信数据的措施： 输入校验（Input Validation）： - 白名单校验：只允许预期的字符、格式、长度。

---

### FB-05-SE-B-004：什么是点击劫持（Clickjacking）？如何防御？

**题型**：安全题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全
**标签**：点击劫持、X-Frame-Options、frame-ancestors、UI 欺骗
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释点击劫持的攻击方式，并列举防御点击劫持的方法。

**参考答案**：

点击劫持是指攻击者通过 iframe 将目标网站透明覆盖在恶意页面上，诱导用户点击目标网站的按钮，从而执行非用户本意的操作（如点赞、转账、关注）。

防御方法：

1. **X-Frame-Options HTTP 头**：
   - `DENY`：禁止任何页面嵌入。
   - `SAMEORIGIN`：仅允许同域嵌入。

2. **CSP frame-ancestors**：
   - `frame-ancestors 'none'`：不允许嵌入。
   - `frame-ancestors 'self' https://trusted.com`：仅允许指定来源。

3. **JavaScript 帧破坏（Frame Busting）**：
   - 通过 JS 检测 `window.top !== window.self` 并跳转，但不可靠，现代推荐用响应头。

```http
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none'
```

**评分维度**：
- 攻击原理解释（40%）：iframe 透明覆盖、诱导点击
- 防御方法（40%）：X-Frame-Options、CSP frame-ancestors
- 方案选择（20%）：为什么响应头比 JS 更可靠

**常见错误**：
- 认为点击劫持是 XSS 的一种
- 只提 JS 防嵌套，忽略 HTTP 头
- 混淆 `X-Frame-Options` 和 `frame-ancestors` 的优先级

**延伸追问**：
- 如果业务确实需要被第三方 iframe 嵌入，该怎么安全实现？
- `X-Frame-Options` 和 `frame-ancestors` 同时存在时以哪个为准？

**相关题目**：
- [FB-05-SE-P-008 点击劫持高级防御](#FB-05-SE-P-008)
- [FB-05-SC-R-002 第三方脚本与 iframe 安全](#FB-05-SC-R-002)

**参考资源**：
- [OWASP - Clickjacking](https://owasp.org/www-community/attacks/Clickjacking)
- [MDN - X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)

**口头回答版**：
> 点击劫持是指攻击者通过 iframe 将目标网站透明覆盖在恶意页面上，诱导用户点击目标网站的按钮，从而执行非用户本意的操作（如点赞、转账、关注）。 X-Frame-Options HTTP 头： - DENY：禁止任何页面嵌入。 - SAMEORIGIN：仅允许同域嵌入。

---
### FB-05-CO-B-007：输入验证在前端应遵循哪些原则？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全
**标签**：输入验证、白名单、XSS、安全
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明前端输入验证的原则及与服务端验证的关系。

**参考答案**：

原则：1) 白名单优于黑名单；2) 按数据类型和长度限制；3) 在输入点、边界点做校验；4) 前端校验只提升体验，服务端必须最终校验；5) 不可信数据进入 DOM 前按上下文转义。

前端校验不能替代服务端校验。


**补充说明**：

在实际落地 输入验证在前端应遵循哪些原则 时，建议结合 输入验证、白名单、XSS 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 白名单（30%）：允许什么而非禁止什么
- 多层校验（30%）：前端+服务端
- 上下文转义（40%）：输出到 DOM/JS/CSS 前转义

**常见错误**：
- 前端验证通过后信任数据安全
- 用黑名单过滤所有危险字符
- 把用户输入直接插入 innerHTML

**口头回答版**：
> 前端输入验证使用白名单、多层校验，并不可信数据进入 DOM 前按上下文转义；服务端必须再次校验。

### FB-05-CO-B-008：HTTPS 证书过期或域名不匹配会发生什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全
**标签**：HTTPS、证书、TLS、错误处理
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释证书过期、域名不匹配、不受信任 CA 时浏览器的行为。

**参考答案**：

浏览器会拦截请求并显示安全警告，阻止用户继续访问（可手动绕过）。原因：过期证书无法保证当前时间段合法；域名不匹配说明证书不是为该站点签发；不受信任 CA 无法建立信任链。

前端应监控证书有效期并提前续期，HSTS 站点无法绕过警告。


**补充说明**：

在实际落地 HTTPS 证书过期或域名不匹配会发生什么 时，建议结合 HTTPS、证书、TLS 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 过期（30%）：时间有效性
- 域名（30%）：CN/SAN 匹配
- 信任链（40%）：根证书与警告行为

**常见错误**：
- 让用户绕过所有证书警告
- 认为自签名证书在生产环境可接受
- 忽略证书监控导致过期宕机

**口头回答版**：
> 证书过期、域名不匹配或 CA 不受信任时浏览器会拦截并警告，生产环境需监控证书有效期。

### FB-05-CO-B-009：Referrer-Policy 有哪些常见取值？对隐私有什么影响？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：05 Web 安全
**标签**：Referrer-Policy、隐私、安全头
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 no-referrer、strict-origin-when-cross-origin 等取值的含义。

**参考答案**：

常见值：no-referrer（不发送 Referer）、no-referrer-when-downgrade（HTTPS 到 HTTP 不发送）、origin（仅发送来源域名）、strict-origin（降级不发送且仅域名）、same-origin（同源完整，跨域仅域名）、strict-origin-when-cross-origin（默认值：同源完整，跨域仅域名，降级不发送）、unsafe-url（始终发送完整 URL）。

设置过严可能影响依赖 Referer 的统计分析。

**评分维度**：
- 取值语义（50%）：各值区别
- 降级安全（20%）：HTTPS 到 HTTP
- 隐私平衡（30%）：业务分析与隐私保护

**常见错误**：
- 对所有请求使用 no-referrer 导致分析系统失效
- 使用 unsafe-url 泄露敏感 URL 参数
- 混淆 Referrer-Policy 和 Referer 头本身

**口头回答版**：
> Referrer-Policy 控制请求携带的 Referer 信息量，需在隐私保护和业务分析间取得平衡。
---

## 进阶题（24 道）{#advanced}

**口头回答版**：
> 点击劫持是指攻击者通过 iframe 将目标网站透明覆盖在恶意页面上，诱导用户点击目标网站的按钮，从而执行非用户本意的操作（如点赞、转账、关注）。 X-Frame-Options HTTP 头： - DENY：禁止任何页面嵌入。 - SAMEORIGIN：仅允许同域嵌入。

### FB-05-SE-A-001：如何系统性地防御 XSS？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全
**标签**：XSS、输入校验、输出编码、CSP、HttpOnly
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请从输入、输出、运行时、架构等多个层面，描述一套完整的 XSS 防御体系。

**参考答案**：

XSS 防御应遵循"纵深防御"原则，多层叠加：

1. **输入层**：
   - 服务端和客户端都做白名单校验。
   - 限制数据类型、长度、格式，拒绝明显恶意输入。

2. **输出层（最关键）**：
   - 根据上下文编码：HTML、HTML 属性、JavaScript、URL、CSS。
   - 使用框架自动转义机制（React/Vue/Angular）。
   - 必须插入 HTML 时使用 DOMPurify 等可信库进行清洗。

3. **运行时层**：
   - 设置 `HttpOnly` Cookie，防止脚本窃取会话。
   - 部署 CSP，禁止内联脚本和 eval。
   - 使用现代浏览器安全头：`X-Content-Type-Options: nosniff`。

4. **架构与流程层**：
   - 安全编码规范和 Code Review。
   - 引入 SAST/DAST 扫描和 XSS 专项测试。
   - 建立安全响应流程和漏洞赏金计划。

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'
X-Content-Type-Options: nosniff
Set-Cookie: session=xxx; HttpOnly; Secure; SameSite=Lax
```

**评分维度**：
- 防御层次完整性（40%）：输入、输出、运行时、流程
- 输出编码理解（30%）：上下文相关编码
- 实际落地能力（30%）：能否结合团队现状给出可执行方案

**常见错误**：
- 只说"转义"但不区分上下文
- 认为使用框架就高枕无忧
- 忽略流程和长期治理

**延伸追问**：
- 富文本场景下如何平衡功能和安全性？
- 如果业务需要支持用户自定义 HTML/CSS，应该怎么做？

**相关题目**：
- [FB-05-CO-B-001 什么是 XSS](#FB-05-CO-B-001)
- [FB-05-SC-A-001 如何安全实现富文本编辑器](#FB-05-SC-A-001)

**参考资源**：
- [OWASP - XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

**口头回答版**：
> XSS 防御应遵循"纵深防御"原则，多层叠加： - 服务端和客户端都做白名单校验。 - 限制数据类型、长度、格式，拒绝明显恶意输入。 - 根据上下文编码：HTML、HTML 属性、JavaScript、URL、CSS。

---

### FB-05-SE-A-002：CSRF Token 应该如何生成、分发和校验？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全
**标签**：CSRF、CSRF Token、会话安全、随机数、双重 Cookie
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请详细说明 CSRF Token 的工作机制，包括生成、分发、校验流程，并说明常见的实现误区。

**参考答案**：

CSRF Token 是一种随机、不可预测、与用户会话绑定的值，用于证明请求确实来自本站页面。

**生成**：

- 使用加密安全的随机数生成器（如 Node.js `crypto.randomBytes`）。
- 长度建议至少 128 位（16 字节以上）。
- 可与会话绑定，也可按请求生成（更严格但影响性能）。

**分发**：

- 嵌入表单隐藏字段：`<input type="hidden" name="csrf_token" value="...">`
- 通过响应头或页面内联脚本注入到前端内存/元标签中。
- SPA 可通过登录接口返回，后续请求携带在 Header 中。

**校验**：

- 服务端从会话中取出预期 Token，与请求中的 Token 比对。
- 必须做常量时间比较，防止时序攻击。
- 校验失败立即拒绝并记录日志。

**常见误区**：

1. Token 可预测或使用简单算法生成。
2. Token 未与会话绑定，可被攻击者复用。
3. 仅对 POST 校验，忽略 PUT/DELETE 等。
4. 将 Token 放入 Cookie（违反设计初衷）。

**评分维度**：
- Token 生成安全（25%）：加密安全随机、足够长度
- 分发方式（25%）：表单、Header、内存
- 校验逻辑（30%）：会话绑定、常量时间比较
- 误区识别（20%）：能否指出常见错误

**常见错误**：
- 用时间戳或自增 ID 作为 Token
- Token 只校验存在性不校验值
- 把 Token 放入 URL 参数（可能被日志/Referer 泄露）

**延伸追问**：
- 双重 Cookie 提交（Double Submit Cookie）是什么？和会话 Token 比有什么优劣？
- 在纯前后端分离架构中，CSRF Token 如何设计？

**相关题目**：
- [FB-05-CO-B-002 什么是 CSRF](#FB-05-CO-B-002)
- [FB-05-SC-P-001 OAuth PKCE 流程](#FB-05-SC-P-001)

**参考资源**：
- [OWASP - CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

**口头回答版**：
> CSRF Token 是一种随机、不可预测、与用户会话绑定的值，用于证明请求确实来自本站页面。

---

### FB-05-SE-A-003：如何为生产环境配置一套合理的 CSP 策略？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全
**标签**：CSP、内容安全策略、XSS、unsafe-inline、nonce
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
假设你负责一个现代 SPA 项目，需要部署 CSP。请描述如何制定、测试和逐步上线 CSP 策略。

**参考答案**：

**制定策略**：

1. 先使用 `Content-Security-Policy-Report-Only` 收集违规报告，不阻断。
2. 根据报告调整策略，明确允许的来源。
3. 逐步收紧，最终切换到 `Content-Security-Policy`。

**推荐配置示例**：

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.example.com;
  font-src 'self' https://fonts.gstatic.com;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self';
```

**处理内联脚本**：

- 优先将脚本外联。
- 必须内联时使用 `nonce-{random}` 或 `sha256-{hash}`。
- 避免使用 `'unsafe-inline'`。

**上线流程**：

1. 报告模式跑 1-2 周。
2. 修复所有违规（如遗漏的 CDN、内联脚本）。
3. 先对低风险页面启用 enforce。
4. 全量启用并监控错误上报。

**评分维度**：
- 策略制定流程（30%）：Report-Only → 调整 → 强制
- 指令选择（30%）：能否根据业务选择合适指令
- 内联脚本处理（25%）：nonce/hash/外联
- 上线与监控（15%）：分阶段、错误上报

**常见错误**：
- 一上来就启用严格策略导致业务大面积报错
- 为省事使用 `'unsafe-inline' 'unsafe-eval' *`
- 忽略 `frame-ancestors`、`base-uri` 等关键指令
- 不配置报告地址，无法发现问题

**延伸追问**：
- nonce 每次请求都需要变化吗？为什么？
- 如果第三方 SDK 要求 `'unsafe-eval'`，你该怎么办？

**相关题目**：
- [FB-05-CO-B-006 什么是 CSP](#FB-05-CO-B-006)
- [FB-05-SD-R-003 设计 CSP 部署策略](#FB-05-SD-R-003)

**参考资源**：
- [Google Web Fundamentals - CSP](https://developers.google.com/web/fundamentals/security/csp)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-A-004：JWT 在前端应该如何安全存储和传输？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全
**标签**：JWT、Token、localStorage、HttpOnly、Refresh Token
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 JWT 在前端的存储方式选择，以及 Access Token 与 Refresh Token 分别应如何管理。

**参考答案**：

**JWT 存储方式对比**：

| 存储位置 | XSS 风险 | CSRF 风险 | 持久化 | 推荐场景 |
|---------|---------|----------|--------|---------|
| localStorage | 高 | 无 | 持久 | 不推荐存放敏感 Token |
| sessionStorage | 高（XSS 可读） | 无 | 标签页关闭清除 | 短期临时数据 |
| HttpOnly Cookie | 低 | 需配合 SameSite/CSRF Token | 可控 | 推荐 Refresh Token |
| 内存（JS 变量） | 中（XSS 可读取运行中内存） | 无 | 页面刷新丢失 | 推荐短期 Access Token |

**推荐实践**：

1. **Access Token**：短期有效（如 5-15 分钟），存放于内存或 sessionStorage（权衡）。
2. **Refresh Token**：长期有效，必须存放于 `HttpOnly; Secure; SameSite=Strict` Cookie。
3. **传输**：始终使用 HTTPS，避免在 URL 中传递 Token。
4. **撤销**：Refresh Token 应具备轮换机制（Refresh Token Rotation）和黑名单能力。

```http
Set-Cookie: refresh_token=xxx; HttpOnly; Secure; SameSite=Strict; Path=/api/auth
```

**评分维度**：
- 存储方式对比（30%）：能否清晰对比各方案优劣
- Access/Refresh 分离意识（30%）：不同 Token 不同存储策略
- Cookie 安全配置（25%）：HttpOnly/Secure/SameSite
- Token 生命周期管理（15%）：过期、轮换、撤销

**常见错误**：
- 把 JWT 长期存在 localStorage
- 认为 JWT 无法撤销所以不需要后端管理
- 忽略 HTTPS 传输要求
- Access Token 有效期设置过长

**延伸追问**：
- 如果 Access Token 存在内存，页面刷新后如何保持登录状态？
- JWT 被盗用后有什么检测和应急手段？

**相关题目**：
- [FB-05-SE-B-001 localStorage 安全风险](#FB-05-SE-B-001)
- [FB-05-SC-P-001 OAuth PKCE 流程](#FB-05-SC-P-001)

**参考资源**：
- [OWASP - JWT Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

**口头回答版**：
> JWT 存储方式对比： | 存储位置 | XSS 风险 | CSRF 风险 | 持久化 | 推荐场景 | |---------|---------|----------|--------|---------| | localStorage | 高 | 无 | 持久 | 不推荐存放敏感 Token |

---

### FB-05-SE-A-005：CORS 配置错误可能带来哪些安全风险？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全、04 计算机网络
**标签**：CORS、跨域、凭证、Origin、安全配置
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举常见的 CORS 配置错误，并说明它们各自可能导致的安全问题。

**参考答案**：

**常见错误及风险**：

1. **`Access-Control-Allow-Origin: *` 且 `Allow-Credentials: true`**：
   - 浏览器禁止这种组合，但某些自定义实现可能允许。
   - 风险：任意网站都可携带用户 Cookie 调用接口，导致 CSRF 升级为跨域读取。

2. **动态反射 Origin**：
   - 服务端直接返回请求头中的 `Origin` 值。
   - 风险：攻击者构造恶意 Origin，即可跨域读取响应。

3. **允许非必要的方法和头**：
   - `Access-Control-Allow-Methods: *` 或包含 PUT/DELETE。
   - 风险：扩大攻击面，配合 XSS 可执行更危险操作。

4. **预检缓存时间过长**：
   - `Access-Control-Max-Age` 设置过大。
   - 风险：策略变更后客户端仍使用旧缓存。

5. **不校验 Origin 直接允许所有来源**：
   - 对于公开只读资源可以接受，但对于用户数据接口非常危险。

**正确做法**：

- 维护可信 Origin 白名单，严格匹配协议和域名。
- 需要携带凭证时，明确指定 `Allow-Origin` 为具体 Origin。
- 最小化允许的 Methods 和 Headers。

**评分维度**：
- 风险识别（40%）：能否指出 * + credentials、反射 Origin 等高危配置
- 正确配置方法（30%）：白名单、最小权限
- 实际排查能力（30%）：能否根据场景判断配置是否合理

**常见错误**：
- 认为 CORS 是后端安全策略，前端无法影响
- 为解决跨域报错而直接配置 `*`
- 忽略 Origin 校验中的子域名绕过

**延伸追问**：
- 如果前端需要跨域读取用户数据，后端 CORS 应该怎么配？
- `Origin` 头在什么情况下不会被浏览器发送？

**相关题目**：
- [FB-05-CO-B-005 什么是 CORS](#FB-05-CO-B-005)

**参考资源**：
- [PortSwigger - CORS](https://portswigger.net/web-security/cors)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-A-006：使用 postMessage 跨窗口通信时有哪些安全注意事项？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全、03 浏览器原理
**标签**：postMessage、跨窗口、Origin、iframe、消息校验
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 `window.postMessage` 的安全使用规范，以及常见的错误用法。

**参考答案**：

`postMessage` 允许不同源的窗口通信，但如果使用不当会导致 XSS 或信息泄露。

**安全规范**：

1. **始终指定 targetOrigin**：
   - 不要用 `*` 作为目标源，除非确实需要广播给任意源。
   - 应写明确的协议+域名+端口，如 `https://trusted.com`。

2. **接收端严格校验 origin**：
   - 在 `message` 事件中检查 `event.origin` 是否在白名单内。
   - 不要只校验域名字符串，要完整匹配 origin。

3. **校验 event.source**：
   - 确认消息来自预期的窗口对象，防止中间窗口转发攻击。

4. **验证消息格式**：
   - 不要直接 `eval` 消息内容。
   - 使用结构化格式（如 JSON）并校验字段类型。

5. **避免通过 postMessage 传递敏感数据**：
   - 可被父页面或子页面监听，应使用更安全的方式如后端交互。

```js
// 发送端
childWindow.postMessage({ type: 'login', token: 'xxx' }, 'https://trusted.com');

// 接收端
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://trusted.com') return;
  if (e.source !== expectedWindow) return;
  if (e.data.type === 'login') {
    // 处理
  }
});
```

**评分维度**：
- targetOrigin 使用（30%）：能否说清为什么不能用 *
- 接收端校验（30%）：origin、source、数据格式
- 危险操作识别（25%）：eval、innerHTML 等
- 敏感数据传输意识（15%）

**常见错误**：
- 发送和接收都使用 `*`
- 接收端不校验 `event.origin`
- 直接执行 `eval(e.data)`
- 用字符串包含 origin 而不是完整匹配

**延伸追问**：
- 如果父页面和子页面不同源，子页面如何安全地校验父页面身份？
- postMessage 能和 Service Worker 通信吗？有什么风险？

**相关题目**：
- [FB-05-SE-B-004 点击劫持](#FB-05-SE-B-004)
- [FB-05-SC-R-002 第三方脚本与 iframe 安全](#FB-05-SC-R-002)

**参考资源**：
- [MDN - postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

**口头回答版**：
> postMessage 允许不同源的窗口通信，但如果使用不当会导致 XSS 或信息泄露。

---

### FB-05-CA-A-001：下面代码存在什么安全问题？如何修复？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全
**标签**：XSS、innerHTML、DOM、代码审计
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
function renderComment(comment) {
  const container = document.getElementById('comments');
  container.innerHTML += `
    <div class="comment">
      <p>${comment.content}</p>
      <a href="${comment.userLink}">@${comment.author}</a>
    </div>
  `;
}
```

请指出上述代码的安全问题并给出修复方案。

**参考答案**：

**安全问题**：

1. **`innerHTML` 拼接用户输入**：`comment.content` 直接插入 HTML，存在存储型/反射型 XSS。
2. **`href` 属性未校验**：`comment.userLink` 可能是 `javascript:alert(1)`，点击执行脚本。
3. **`comment.author` 未编码**：插入到 HTML 中同样存在 XSS。
4. **`+=` 追加到 innerHTML**：会重新解析整个容器，可能破坏已有事件监听器。

**修复方案**：

```js
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isSafeUrl(url) {
  try {
    const parsed = new URL(url, window.location.href);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function renderComment(comment) {
  const container = document.getElementById('comments');
  const div = document.createElement('div');
  div.className = 'comment';

  const p = document.createElement('p');
  p.textContent = comment.content; // 自动转义

  const a = document.createElement('a');
  a.textContent = comment.author;
  a.href = isSafeUrl(comment.userLink) ? comment.userLink : '#';

  div.appendChild(p);
  div.appendChild(a);
  container.appendChild(div);
}
```

**评分维度**：
- 漏洞识别（40%）：innerHTML、href、author 三处
- 修复方案（40%）：DOM API、编码、URL 校验
- 代码质量（20%）：是否避免 += innerHTML

**常见错误**：
- 只修复 content，忽略 userLink 和 author
- 用正则过滤 `<script>` 代替编码
- 不校验 URL scheme，允许 javascript: 伪协议

**延伸追问**：
- 如果 comment.content 需要支持富文本，应该怎么做？
- 框架（React/Vue）中为什么较少出现这种漏洞？

**相关题目**：
- [FB-05-SE-B-003 不可信数据处理](#FB-05-SE-B-003)
- [FB-05-SC-A-001 富文本编辑器安全](#FB-05-SC-A-001)

**参考资源**：
- [OWASP - DOM based XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SC-A-001：如何安全地实现一个富文本编辑器？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全
**标签**：XSS、富文本、DOMPurify、HTML 消毒、白名单
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
公司需要开发一个富文本编辑器，允许用户输入加粗、链接、图片、列表等格式。请设计一套安全的实现方案。

**参考答案**：

**方案分层**：

1. **编辑阶段**：
   - 使用 `contenteditable` 或成熟库（Quill、TinyMCE、Slate）。
   - 不直接暴露原始 HTML 编辑给普通用户。
   - 粘贴内容时进行过滤。

2. **提交阶段**：
   - 前端用 DOMPurify 清洗 HTML，但仅作为体验层。
   - 服务端必须进行最终清洗和白名单校验。

3. **展示阶段**：
   - 对清洗后的 HTML 进行渲染，避免再次转义。
   - 使用沙箱 iframe 展示不可信富文本（可选）。

**DOMPurify 配置示例**：

```js
import DOMPurify from 'dompurify';

const clean = DOMPurify.sanitize(dirtyHtml, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'p', 'br'],
  ALLOWED_ATTR: ['href', 'title', 'target'],
  ALLOW_DATA_ATTR: false,
  SANITIZE_DOM: true
});
```

**URL 处理**：

- 对 `href`、`src` 强制校验 scheme，仅允许 `http/https/mailto`。
- 对链接添加 `rel="noopener noreferrer nofollow"`。
- 图片使用代理域名，防止 SSRF/信息泄露。

**服务端补充**：

- 使用同样的白名单重新清洗。
- 对输出 HTML 做二次编码或 CSP 限制。

**评分维度**：
- 编辑/提交/展示分层设计（30%）
- 白名单清洗（30%）：DOMPurify 或服务端等价方案
- URL 与链接安全（20%）：scheme 校验、rel 属性
- 服务端最终校验意识（20%）

**常见错误**：
- 只在前端过滤就信任后端存储的内容
- 黑名单过滤标签（如只禁 script）
- 允许任意 style 属性导致 CSS 注入
- 忽略服务端二次校验

**延伸追问**：
- 如果允许用户上传图片，需要注意哪些安全问题？
- 富文本中的 CSS 可能造成什么攻击？

**相关题目**：
- [FB-05-SE-A-001 系统性防御 XSS](#FB-05-SE-A-001)
- [FB-05-CA-A-001 代码分析 XSS](#FB-05-CA-A-001)

**参考资源**：
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [OWASP - XSS Filter Evasion Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-A-007：什么是中间人攻击（MITM）？HTTPS 如何防御？前端还能做什么？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全、04 计算机网络
**标签**：MITM、HTTPS、HSTS、证书固定、中间人
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释中间人攻击的原理，说明 HTTPS 的防御机制，并补充前端可采取的安全措施。

**参考答案**：

**中间人攻击**：攻击者位于用户和服务器之间，窃听、篡改或冒充通信双方。常见场景包括公共 Wi-Fi 劫持、DNS 劫持、ARP 欺骗。

**HTTPS 防御机制**：

1. **加密**：TLS 对称加密通信内容，攻击者无法窃听。
2. **完整性校验**：MAC 防止数据被篡改。
3. **身份认证**：服务器证书由可信 CA 签发，浏览器验证域名和证书链。

**前端补充措施**：

1. **HSTS（HTTP Strict Transport Security）**：
   - 强制浏览器后续只通过 HTTPS 访问站点。
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

2. **敏感操作二次确认**：
   - 大额转账等关键操作增加额外验证。

3. **证书透明度（CT）与 HPKP（已废弃）**：
   - 关注 CT 日志，发现异常证书。

4. **混合内容修复**：
   - 确保页面所有资源都通过 HTTPS 加载，避免降级攻击。

5. **安全链接提示**：
   - 对非 HTTPS 链接给出风险提示（尤其对钓鱼场景）。

**评分维度**：
- MITM 原理（30%）：窃听、篡改、冒充
- HTTPS 防御（30%）：加密、完整性、证书认证
- 前端措施（40%）：HSTS、混合内容、二次确认

**常见错误**：
- 认为 HTTPS 能防御所有 MITM（证书被伪造或用户忽略警告时仍可能失败）
- 忽略 HSTS 的 includeSubDomains 和 preload
- 页面内加载 HTTP 资源却不以为然

**延伸追问**：
- 如果用户第一次访问站点就被 MITM，HSTS 还有效吗？
- 什么是 SSL Stripping 攻击？如何防御？

**相关题目**：
- [FB-05-CO-B-004 HTTPS 为什么更安全](#FB-05-CO-B-004)
- [FB-05-SE-R-003 前端加密与密钥管理](#FB-05-SE-R-003)

**参考资源**：
- [OWASP - Man-in-the-middle attack](https://owasp.org/www-community/attacks/Man-in-the-middle_attack)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-A-008：请简述 OAuth 2.0 授权码模式的基本流程及前端注意事项。

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：05 Web 安全
**标签**：OAuth 2.0、授权码模式、PKCE、重定向、Token
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述 OAuth 2.0 授权码模式（Authorization Code Grant）的完整流程，并说明前端在实现时应注意的安全问题。

**参考答案**：

**授权码模式流程**：

1. 用户点击登录，前端将浏览器重定向到授权服务器。
2. 授权服务器验证用户身份并请求授权。
3. 用户同意后，授权服务器通过回调 URL 返回 `authorization_code`。
4. 前端将 `code` 发送给后端，后端用 `code` + `client_secret` 换取 Access Token。
5. 后端存储 Token 或返回给前端，前端请求资源服务器。

**前端安全注意事项**：

1. **使用 PKCE（Proof Key for Code Exchange）**：
   - 公共客户端（SPA、移动端）必须生成 `code_verifier` 和 `code_challenge`。
   - 防止授权码被拦截后重放。

2. **校验 state 参数**：
   - 前端生成随机 `state`，授权回调后比对，防止 CSRF。

3. **保护回调地址**：
   - 回调 URL 必须注册且严格校验，防止开放重定向。

4. **不在前端暴露 client_secret**：
   - 只有后端能持有 client_secret。

5. **HTTPS 全链路**：
   - 所有授权端点、回调、Token 交换必须使用 HTTPS。

**评分维度**：
- 授权码流程（30%）：重定向、code、Token 交换
- PKCE 理解（25%）：为什么公共客户端需要
- state 校验（20%）：防止 CSRF
- 前端安全细节（25%）：client_secret、回调校验、HTTPS

**常见错误**：
- 在 SPA 中把 client_secret 写死在前端代码里
- 忽略 state 校验
- 认为授权码模式不需要 PKCE
- 回调 URL 任意跳转到攻击者域名

**延伸追问**：
- 隐式授权模式（Implicit Grant）为什么现在不推荐使用？
- 设备授权码模式（Device Code）适用于什么场景？

**相关题目**：
- [FB-05-SC-P-001 OAuth PKCE 流程](#FB-05-SC-P-001)
- [FB-05-SD-R-002 设计 SSO/OIDC 架构](#FB-05-SD-R-002)

**参考资源**：
- [RFC 6749 - OAuth 2.0](https://tools.ietf.org/html/rfc6749)
- [RFC 7636 - PKCE](https://tools.ietf.org/html/rfc7636)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---
### FB-05-CO-A-001：什么是会话固定攻击？如何防御？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：会话固定、Session、认证、安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释攻击者如何固定用户会话标识，并给出防御方法。

**参考答案**：

攻击者预先获取一个会话 ID 并诱导用户使用该 ID 登录，登录后服务端未更换 ID，攻击者即可使用该 ID 冒充用户。

防御：登录成功后重新生成会话 ID；设置 HttpOnly/Secure/SameSite Cookie；定期轮换会话；绑定用户 IP/设备指纹。

**评分维度**：
- 攻击流程（40%）：预设 session ID 诱导登录
- 防御（40%）：登录后更换 session ID
- Cookie 属性（20%）：HttpOnly/Secure/SameSite

**常见错误**：
- 登录前后使用相同 session ID
- 把 session ID 放在 URL 中
- 仅依赖前端隐藏 session ID

**口头回答版**：
> 会话固定攻击通过预设 session ID 冒充用户；登录成功后应重新生成会话 ID 并加固 Cookie。

### FB-05-CO-A-002：X-Frame-Options 与 CSP frame-ancestors 如何防御点击劫持？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：点击劫持、X-Frame-Options、frame-ancestors、CSP
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较两种响应头的作用和优先级。

**参考答案**：

X-Frame-Options: DENY 禁止任何框架嵌入；SAMEORIGIN 只允许同源。CSP frame-ancestors 更灵活，支持指定允许嵌入的源，如 'self' https://example.com。

现代推荐 frame-ancestors，若浏览器不支持 CSP 可保留 X-Frame-Options 作为降级。

**评分维度**：
- DENY/SAMEORIGIN（40%）：X-Frame-Options 取值
- frame-ancestors（40%）：CSP 灵活配置
- 优先级（20%）：CSP 优先

**常见错误**：
- 仅使用 JS frame-busting 防御
- X-Frame-Options 设置为 ALLOW-FROM 多个域名
- frame-ancestors 配置为 * 导致失效

**口头回答版**：
> X-Frame-Options 和 CSP frame-ancestors 限制页面被嵌入 iframe，frame-ancestors 更灵活，推荐两者结合。

### FB-05-CO-A-003：什么是 HSTS？它如何防御 SSL 剥离攻击？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：HSTS、HTTPS、SSL 剥离、安全头
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 HSTS 头字段、preload 列表和降级风险。

**参考答案**：

HSTS（HTTP Strict Transport Security）通过响应头 Strict-Transport-Security 告诉浏览器未来一段时间内必须通过 HTTPS 访问该域名，浏览器会自动把 HTTP 请求重定向为 HTTPS，从而防御中间人 SSL 剥离攻击。

可提交到 HSTS preload 列表实现首次访问即 HTTPS。

**评分维度**：
- 头字段（30%）：max-age、includeSubDomains、preload
- 防御原理（40%）：强制 HTTPS 阻止明文访问
- 风险（30%）：配置错误导致子域不可用

**常见错误**：
- HSTS 不设置 includeSubDomains 导致子域仍可被降级
- 未提交 preload 列表时首次访问仍可能受攻击
- max-age 设置过短导致保护失效

**口头回答版**：
> HSTS 强制浏览器使用 HTTPS 访问域名，防御 SSL 剥离，可配合 preload 列表。

### FB-05-CO-A-004：Subresource Integrity（SRI）的原理和使用方式

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：SRI、完整性校验、CDN、安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 integrity 属性和浏览器如何校验资源哈希。

**参考答案**：

SRI 通过给 script/link 标签添加 integrity 属性指定资源哈希，浏览器下载资源后计算哈希并比对，不匹配则拒绝执行或加载，防止 CDN/服务器被篡改导致恶意代码执行。

    <script src="https://cdn.com/lib.js"
      integrity="sha384-..."
      crossorigin="anonymous">&lt;/script&gt;

**评分维度**：
- integrity 格式（40%）：algo-base64hash
- 校验流程（30%）：下载后计算哈希比对
- crossorigin（30%）：需要 CORS

**常见错误**：
- integrity 值使用 MD5 而非 SHA-384/SHA-256
- CDN 资源没有 CORS 头却使用 SRI
- 资源更新后未同步更新 integrity 导致加载失败

**口头回答版**：
> SRI 通过 integrity 属性校验外部资源哈希，防止 CDN 投毒，需配合 crossorigin 使用。

### FB-05-CO-A-005：如何安全地集成第三方脚本和 iframe？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：第三方脚本、iframe、CSP、SRI、sandbox
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请从来源控制、权限隔离、监控审计等角度说明。

**参考答案**：

第三方脚本：使用 SRI 校验、CSP script-src 白名单、子资源域名限制、延迟加载、监控加载失败。iframe：设置 sandbox 属性限制权限，按需允许 allow-scripts/allow-same-origin；使用 referrerpolicy/credentialless 减少信息泄露。

定期审计第三方脚本变更和权限。

**评分维度**：
- 脚本校验（30%）：SRI、CSP
- iframe 隔离（40%）：sandbox、allow 属性
- 监控审计（30%）：加载监控、权限复查

**常见错误**：
- 直接引入第三方脚本不做任何限制
- iframe sandbox 同时允许 scripts 和 same-origin 导致隔离失效
- 第三方脚本加载失败时无降级方案

**口头回答版**：
> 第三方脚本应使用 SRI 和 CSP 限制，iframe 应使用 sandbox 和 allow 控制权限，并定期审计。

### FB-05-CO-A-006：什么是凭证填充攻击（Credential Stuffing）？前端能做什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：Credential Stuffing、撞库、登录安全、验证码
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释撞库攻击原理及前端防御措施。

**参考答案**：

攻击者使用泄露的用户名/密码批量尝试登录。前端可通过：限制登录频率、图形/行为验证码、锁定账户一段时间、检测异常设备和地理位置、提示用户使用强密码和唯一密码。

前端措施可缓解但无法根除，核心防御在服务端。


**补充说明**：

在实际落地 凭证填充攻击（Credential Stuffing）前端能做什么 时，建议结合 Credential Stuffing、撞库、登录安全 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 攻击原理（40%）：泄露凭据批量尝试
- 前端缓解（40%）：验证码、频率限制、锁定
- 用户教育（20%）：强密码、唯一密码

**常见错误**：
- 仅依赖前端限制就能完全防御撞库
- 限制策略过严影响正常用户
- 泄露凭据不强制用户修改密码

**口头回答版**：
> 凭证填充攻击使用泄露凭据批量登录，前端可配合验证码、频率限制和账户锁定缓解。

### FB-05-CO-A-007：JSONP 有哪些安全风险？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：JSONP、XSS、CSRF、跨域
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 JSONP 在 CSRF、XSS 和敏感数据泄露方面的风险。

**参考答案**：

JSONP 把响应作为 JS 执行，若服务端未校验 callback 参数，可能触发 XSS；script 标签请求会自动携带 Cookie，导致 CSRF；返回数据可能被任意网站通过动态 script 读取，造成敏感信息泄露。

现代项目优先使用 CORS，避免新增 JSONP 接口。

**评分维度**：
- XSS（30%）：callback 参数未过滤
- CSRF（30%）：自动携带 Cookie
- 数据泄露（30%）：任意网站可读取
- 替代（10%）：CORS

**常见错误**：
- 认为 JSONP 请求不会携带 Cookie
- callback 参数直接拼接到响应中不做转义
- 把 JSONP 作为新接口首选方案

**口头回答版**：
> JSONP 存在 XSS、CSRF 和数据泄露风险，现代项目应使用 CORS 替代。

### FB-05-CO-A-008：前端敏感日志如何脱敏？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：日志脱敏、隐私、安全、PII
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明前端日志中哪些字段需要脱敏及常用方法。

**参考答案**：

需脱敏字段：手机号、身份证号、银行卡号、Token、密码、经纬度、设备 ID。方法：部分掩码、哈希化、替换为占位符、正则匹配替换、分级采样。

    function maskPhone(phone) {
      return phone.replace(/(d{3})d{4}(d{4})/, '$1****$2');
    }

**评分维度**：
- 敏感字段（40%）：PII、凭证、位置
- 脱敏方法（40%）：掩码、哈希、替换
- 日志策略（20%）：分级采样与保留期限

**常见错误**：
- 前端日志明文记录用户 Token
- 只在服务端脱敏，前端原样上报
- 脱敏正则不完善导致部分敏感信息泄露

**口头回答版**：
> 前端日志应对手机号、证件号、Token 等敏感信息脱敏，方法包括掩码、哈希和替换。

### FB-05-SE-A-009：什么是 IDOR（不安全的直接对象引用）？前端如何参与防御？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：IDOR、越权、访问控制、安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 IDOR 原理及前端防御配合。

**参考答案**：

IDOR 指攻击者通过修改 URL/参数中的对象 ID 访问其他用户数据。前端不应依赖隐藏字段或前端路由保护资源，应在服务端校验用户是否有权访问该 ID；前端可限制用户修改 ID、使用 UUID 替代自增 ID、敏感操作二次确认。

    // 不要在前端暴露内部自增 ID
    const orderId = 'ord_' + uuid;


**补充说明**：

在实际落地 IDOR（不安全的直接对象引用）前端如何参与防御 时，建议结合 IDOR、越权、访问控制 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 原理（40%）：修改 ID 越权访问
- 服务端校验（30%）：权限控制是根本
- 前端配合（30%）：不暴露内部 ID、二次确认

**常见错误**：
- 认为前端隐藏 ID 就能防止越权
- 使用自增 ID 暴露数据规模
- 敏感操作没有二次身份验证

**口头回答版**：
> IDOR 通过篡改对象 ID 越权访问，服务端必须校验权限，前端应避免暴露内部自增 ID。

### FB-05-SE-A-010：什么是路径遍历攻击？前端如何参与防御？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：路径遍历、目录穿越、文件上传、安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释路径遍历原理及前端在文件路径场景中的配合。

**参考答案**：

路径遍历指通过 ../ 等序列访问服务端非授权文件。前端在文件上传、下载、导出场景应避免把用户输入直接拼接到路径；限制文件名字符、使用白名单扩展名、文件 ID 映射而非真实路径。

    // 不推荐
    fetch('/download?file=' + userInput)
    // 推荐
    fetch('/download?id=' + fileId)


**补充说明**：

在实际落地 路径遍历攻击前端如何参与防御 时，建议结合 路径遍历、目录穿越、文件上传 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 原理（40%）：../ 穿越目录
- 前端校验（30%）：文件名白名单、ID 映射
- 服务端（30%）：路径规范化、沙箱存储

**常见错误**：
- 前端直接把用户输入拼接到下载路径
- 仅依赖前端过滤文件名
- 文件存储使用用户可控路径

**口头回答版**：
> 路径遍历通过 ../ 访问非授权文件，前端应使用 ID 映射、限制文件名，服务端做路径规范化。

### FB-05-SE-A-011：CSP Report-Only 模式有什么用？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：CSP、Report-Only、安全头、策略部署
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Content-Security-Policy-Report-Only 与强制执行模式的区别。

**参考答案**：

Report-Only 模式不会阻止违规资源加载，只向 report-uri/report-to 上报违规信息，用于在正式启用 CSP 前评估策略影响、发现内联脚本/外部资源依赖，避免直接启用导致功能损坏。

建议：先 report-only 收集数据，修复后再启用 enforce 模式。


**补充说明**：

在实际落地 CSP Report-Only 模式有什么用 时，建议结合 CSP、Report-Only、安全头 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 模式差异（40%）：阻止 vs 仅报告
- 用途（30%）：策略评估与影响发现
- 过渡流程（30%）：report-only 到 enforce

**常见错误**：
- 长期停留在 report-only 不启用 enforce
- 未配置 report-uri 导致无法收集报告
- report-only 阶段不处理上报的违规

**口头回答版**：
> CSP Report-Only 只报告不阻止，适合在正式启用前评估策略影响并修复违规。

### FB-05-CO-A-009：什么是 DOM Invader？它如何帮助前端安全测试？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：DOM Invader、Burp Suite、DOM XSS、安全测试
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍 Burp Suite DOM Invader 插件的功能和使用场景。

**参考答案**：

DOM Invader 是 Burp Suite 的浏览器扩展，用于检测 DOM XSS 漏洞。它可自动扫描页面中的 source 和 sink，注入 canary 标记，追踪不可信数据从输入到危险 DOM 操作的完整链路，帮助定位漏洞点。

适用于测试大量使用 innerHTML、eval、document.write 的 SPA。

**评分维度**：
- 功能（40%）：source/sink 扫描与追踪
- canary（30%）：注入标记定位漏洞
- 场景（30%）：DOM XSS 自动化测试

**常见错误**：
- 把 DOM Invader 当成后端漏洞扫描器
- 忽略手动验证扫描结果
- 认为无 alert 弹窗即无 DOM XSS

**口头回答版**：
> DOM Invader 是 Burp Suite 的 DOM XSS 检测工具，通过 canary 追踪 source 到 sink 的链路。

### FB-05-CO-A-010：什么是 Web Inject 技术？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：Web Inject、银行木马、中间人、安全
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Web Inject 在恶意软件中的作用。

**参考答案**：

Web Inject 是银行木马等恶意软件在浏览器层面注入或修改网页内容的技术，通常在受害者设备上通过浏览器扩展、DLL 注入、代理篡改等方式，向合法银行页面添加额外字段或替换转账目标，实施欺诈。

防御：设备安全、反病毒、HTTPS 证书锁定、异常行为检测。

**评分维度**：
- 注入位置（40%）：浏览器扩展、DLL、代理
- 目的（30%）：篡改页面实施欺诈
- 防御（30%）：终端安全与行为检测

**常见错误**：
- 认为 HTTPS 能完全防御 Web Inject
- 把 Web Inject 和普通 XSS 混为一谈
- 忽略终端被攻破后的浏览器层攻击

**口头回答版**：
> Web Inject 是恶意软件在浏览器层修改网页内容的技术，防御依赖终端安全和异常行为检测。

### FB-05-SE-A-012：如何防止用户凭证被自动填充到钓鱼页面？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：05 Web 安全
**标签**：钓鱼、自动填充、密码管理器、安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明浏览器自动填充机制和前端降低风险的措施。

**参考答案**：

浏览器密码管理器根据域名匹配自动填充。钓鱼页面通过相似域名或 iframe 诱骗填充。前端措施：对敏感表单设置 autocomplete="off" 或 "new-password"、不使用 iframe 嵌套登录、启用 CSP frame-ancestors 防止被嵌入钓鱼站点、使用 WebAuthn/Passkeys 减少密码依赖。

根本上用户需识别域名，企业可做域名监控。


**补充说明**：

在实际落地 防止用户凭证被自动填充到钓鱼页面 时，建议结合 钓鱼、自动填充、密码管理器 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 自动填充机制（30%）：域名匹配
- 前端措施（40%）：autocomplete、CSP、iframe 限制
- 替代方案（30%）：Passkeys 减少密码

**常见错误**：
- 依赖 autocomplete="off" 完全阻止密码管理器
- 登录页允许被任意站点 iframe 嵌入
- 忽略用户教育和域名监控

**口头回答版**：
> 防止凭证自动填充到钓鱼页需设置 autocomplete、限制 iframe 嵌入、推广 Passkeys，并监控相似域名。
---

## 深入题（20 道）{#proficient}

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

### FB-05-SE-P-001：深入分析 DOM 型 XSS 的触发原理与防御难点。

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全、03 浏览器原理
**标签**：DOM 型 XSS、innerHTML、eval、location、客户端路由
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请深入分析 DOM 型 XSS 与反射型/存储型 XSS 的本质区别，并说明为什么 DOM 型 XSS 更难被传统 WAF 检测。

**参考答案**：

**本质区别**：

| 类型 | 恶意脚本位置 | 是否经过服务器 | 触发点 |
|------|------------|--------------|--------|
| 反射型 XSS | URL 参数 | 是 | 服务端返回的响应中 |
| 存储型 XSS | 数据库/文件 | 是 | 服务端返回的响应中 |
| DOM 型 XSS | URL/hash/本地存储等 | 否 | 前端 JavaScript 操作 DOM 时 |

DOM 型 XSS 完全发生在浏览器端，服务器可能只返回一个完全正常的静态页面，恶意 payload 通过 `location.hash`、`location.search`、`localStorage`、`postMessage`、WebSocket 等进入前端代码，再经由不安全的 DOM API 触发。

**典型触发链**：

```js
// 服务器返回的页面完全正常
const hash = location.hash.slice(1);
document.getElementById('output').innerHTML = decodeURIComponent(hash);
// 攻击 URL: https://example.com#<img src=x onerror=alert(document.cookie)>
```

**为什么 WAF 难检测**：

1. **不经过服务器**：WAF 部署在服务端，看不到客户端 DOM 操作。
2. **Payload 可高度混淆**：利用 HTML5、SVG、JavaScript 编码、模板字符串等绕过特征库。
3. **触发路径依赖运行时状态**：如客户端路由、异步加载、事件触发。
4. **Source 和 Sink 分离**：数据入口（source）和危险输出点（sink）可能在不同模块。

**防御要点**：

- 识别所有不可信 source：`location`、`postMessage`、`localStorage`、WebSocket。
- 避免危险 sink：`innerHTML`、`outerHTML`、`document.write`、`eval`、`setTimeout(string)`。
- 使用安全 API：`textContent`、安全的 URL 解析、模板引擎自动转义。
- 引入 DOM XSS 扫描工具（如 Semgrep、DOM Invader）。

**评分维度**：
- DOM 型 XSS 原理（30%）：source、sink、不经过服务器
- 与反射/存储型对比（20%）：触发点和持久化差异
- WAF 检测难点（25%）：客户端执行、混淆、source/sink 分离
- 防御方案（25%）：安全 API、source 识别、工具

**常见错误**：
- 把 DOM 型 XSS 等同于反射型 XSS
- 认为服务端过滤就能防 DOM 型 XSS
- 只关注 `innerHTML`，忽略 `eval`、`location` 等 sink

**延伸追问**：
- 现代前端路由（React Router、Vue Router）如何引入 DOM 型 XSS 风险？
- 如果必须使用 `innerHTML`，如何最小化风险？

**相关题目**：
- [FB-05-CO-B-001 什么是 XSS](#FB-05-CO-B-001)
- [FB-05-CA-A-001 代码分析 XSS](#FB-05-CA-A-001)

**参考资源**：
- [OWASP - DOM based XSS](https://owasp.org/www-community/attacks/DOM_Based_XSS)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-P-002：什么是原型污染（Prototype Pollution）？前端如何利用或防御？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全、01 JavaScript
**标签**：原型污染、__proto__、Object.prototype、对象合并、 Lodash
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请解释 JavaScript 原型污染漏洞的原理，给出典型利用方式，并说明前端如何防御。

**参考答案**：

**原理**：

JavaScript 中几乎所有对象都继承自 `Object.prototype`。如果攻击者能控制对象属性赋值的路径 `__proto__`、`constructor.prototype`，就可以修改所有对象共享的原型，导致属性注入、逻辑绕过、RCE（Node.js 中）或客户端 XSS。

**典型利用**：

```js
// 不安全的对象合并
function merge(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      target[key] = merge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

const payload = JSON.parse('{"__proto__": {"isAdmin": true&#125;&#125;');
merge({}, payload);

console.log({}.isAdmin); // true，污染了所有对象
```

**前端利用场景**：

1. **逻辑绕过**：污染 `isAdmin`、`role` 等判断字段。
2. **XSS**：污染 `innerHTML`、`src`、`href` 等模板默认值。
3. **框架/库漏洞**：如旧版 Lodash、jQuery 的 `$.extend`。

**防御方法**：

1. **禁止遍历 `__proto__`、`constructor`、`prototype`**：
   - 合并前检查 key。
2. **使用 `Object.create(null)` 创建无原型对象**。
3. **使用安全库**：现代 Lodash 已修复，或使用 `structuredClone`。
4. **冻结原型**：`Object.freeze(Object.prototype)`。
5. **输入校验**：不接受用户输入直接作为对象键。

```js
function safeMerge(target, source) {
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    // ...
  }
}
```

**评分维度**：
- 原型污染原理（35%）：__proto__、Object.prototype、共享属性
- 利用方式（25%）：逻辑绕过、XSS、库漏洞
- 防御方案（40%）：key 过滤、Object.create(null)、冻结原型

**常见错误**：
- 认为原型污染只影响 Node.js
- 防御时只过滤 `__proto__` 而忽略 `constructor.prototype`
- 用 `for...in` 合并对象时不做 key 校验

**延伸追问**：
- `Object.freeze(Object.prototype)` 有什么副作用？
- JSON.parse 后的对象是否已经被污染？为什么？

**相关题目**：
- [FB-05-CA-P-001 代码分析原型污染](#FB-05-CA-P-001)

**参考资源**：
- [PortSwigger - Prototype pollution](https://portswigger.net/web-security/prototype-pollution)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-P-003：什么是 DOM Clobbering？它如何绕过某些安全控制？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全、03 浏览器原理
**标签**：DOM Clobbering、HTML 注入、命名属性、window、id
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请解释 DOM Clobbering 攻击原理，并说明攻击者如何利用 HTML 元素覆盖 JavaScript 变量。

**参考答案**：

**原理**：

DOM Clobbering 是指攻击者通过注入 HTML 元素（特别是带有 `id` 或 `name` 属性的元素），覆盖页面中预期的 JavaScript 变量或对象，从而改变代码执行逻辑。

浏览器会自动将带有 `id` 或 `name` 的元素挂载为 `window` 或 `document` 的属性：

```html
<!-- 攻击者注入 -->
<img id="config" src="x">

<script>
  // 开发者预期 config 是一个对象
  if (config && config.debug) {
    // 被覆盖后 config 是 HTMLImageElement
  }
</script>
```

**利用方式**：

1. **覆盖全局变量**：用 `<img id="foo">` 覆盖 `window.foo`。
2. **覆盖嵌套对象**：利用 `<form>` + `<input name="bar">` 构造 `window.foo.bar`。

```html
<form id="config">
  <input name="apiUrl" value="https://evil.com">
</form>
<script>
  console.log(config.apiUrl.value); // https://evil.com
</script>
```

**绕过场景**：

- 绕过前端配置校验。
- 覆盖安全库中的白名单对象。
- 配合 XSS 绕过 CSP（如覆盖 `windowTrustedTypes`）。

**防御方法**：

1. 避免使用全局变量作为安全配置。
2. 使用 `const`/`let` 声明变量，避免被 DOM 覆盖。
3. 对不可信 HTML 进行严格清洗。
4. 使用 `Object.hasOwn` 或 `typeof` 校验变量类型。

**评分维度**：
- DOM Clobbering 原理（35%）：id/name 自动挂载为 window 属性
- 利用方式（30%）：覆盖变量、构造嵌套对象
- 防御方案（35%）：变量声明、配置隔离、输入清洗

**常见错误**：
- 认为 DOM Clobbering 就是 XSS
- 忽略 `name` 属性也能挂载到 window
- 认为 `var` 声明的局部变量不会被覆盖

**延伸追问**：
- DOM Clobbering 能覆盖 `const` 声明的变量吗？为什么？
-  Trusted Types 能完全防御 DOM Clobbering 吗？

**相关题目**：
- [FB-05-SE-P-002 原型污染](#FB-05-SE-P-002)
- [FB-05-SE-P-001 DOM 型 XSS](#FB-05-SE-P-001)

**参考资源**：
- [PortSwigger - DOM clobbering](https://portswigger.net/web-security/dom-based/dom-clobbering)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-P-004：什么是 MIME Sniffing / Content Sniffing 攻击？如何防御？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全、03 浏览器原理
**标签**：MIME Sniffing、Content Sniffing、X-Content-Type-Options、上传、文件类型
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 MIME Sniffing（内容嗅探）攻击的原理，以及前端/服务端应如何防御。

**参考答案**：

**原理**：

浏览器为了兼容旧站点，当响应的 `Content-Type` 与文件实际内容不符时，可能会根据文件内容猜测真实类型（MIME Sniffing）。攻击者可以上传一个伪装成图片的 HTML/JS 文件，浏览器嗅探后将其作为脚本执行。

**典型攻击**：

1. 攻击者上传 `avatar.jpg`，内容实为 HTML：`<script>alert(document.cookie)</script>`。
2. 网站返回时设置 `Content-Type: image/jpeg`。
3. 浏览器嗅探到 HTML 内容，当作页面执行，造成 XSS。

**防御方法**：

1. **设置 `X-Content-Type-Options: nosniff`**：
   - 告诉浏览器严格按响应头声明的 MIME 类型处理，禁止嗅探。

2. **正确设置 Content-Type**：
   - 根据文件真实类型返回，不依赖扩展名。

3. **文件上传校验**：
   - 服务端校验文件头（magic number）。
   - 限制文件类型白名单。
   - 重命名文件并使用不可预测路径。

4. **资源隔离**：
   - 用户上传文件放在独立域名（cookieless domain），防止脚本读取主站 Cookie。
   - 强制下载：`Content-Disposition: attachment`。

```http
Content-Type: image/jpeg
X-Content-Type-Options: nosniff
```

**评分维度**：
- MIME Sniffing 原理（35%）：浏览器猜测文件类型
- 攻击场景（25%）：伪装图片执行脚本
- 防御方案（40%）：nosniff、Content-Type、上传校验、资源隔离

**常见错误**：
- 认为文件扩展名决定浏览器处理方式
- 只在前端校验文件类型
- 用户上传文件与主站同域且可执行

**延伸追问**：
- 如果文件必须支持在线预览，如何防止内容嗅探风险？
- `Content-Disposition: inline` 和 `attachment` 有什么区别？

**相关题目**：
- [FB-05-SE-A-001 系统性防御 XSS](#FB-05-SE-A-001)

**参考资源**：
- [MDN - X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-P-005：什么是开放重定向（Open Redirect）？前端如何参与防御？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全
**标签**：开放重定向、OAuth、钓鱼、URL 校验、跳转
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释开放重定向漏洞的原理、危害，并说明前端在登录回调、退出跳转等场景中如何防御。

**参考答案**：

**原理**：

开放重定向是指应用根据用户可控参数决定跳转目标，且未对目标 URL 做白名单校验，导致攻击者构造链接将用户重定向到钓鱼网站。

**典型场景**：

```
https://example.com/login?redirect=https://evil.com
```

用户登录成功后跳转到 `evil.com`，攻击者在该页面伪造登录失败提示，再次窃取账号。

**危害**：

1. 钓鱼攻击，窃取用户凭据。
2. 配合 OAuth 窃取 authorization code。
3. 绕过 Referer 校验。
4. 损害品牌信任。

**前端防御**：

1. **跳转目标白名单**：
   - 只允许本域或预配置的受信域名。
   - 使用完整 origin 匹配，避免 `@`、双斜杠等绕过。

2. **不使用用户输入直接跳转**：
   - 用内部状态或键值映射替代完整 URL。

3. **URL 解析校验**：

```js
function isSafeRedirect(url) {
  try {
    const parsed = new URL(url, window.location.href);
    const allowed = ['https://example.com', 'https://app.example.com'];
    return allowed.includes(parsed.origin);
  } catch {
    return false;
  }
}
```

4. **OAuth 回调严格校验**：
   - `redirect_uri` 必须在授权服务器注册并精确匹配。

**评分维度**：
- 原理与危害（30%）：钓鱼、OAuth 窃取
- 白名单校验（30%）：origin 完整匹配
- 实际场景应用（25%）：登录回调、退出跳转
- 绕过识别（15%）：@、双斜杠、协议相对 URL

**常见错误**：
- 只校验 URL 是否包含本域字符串
- 允许相对路径任意跳转
- 忽略 `javascript:`、`data:` 等伪协议

**延伸追问**：
- 如果必须支持任意子域名跳转，如何安全实现？
- OAuth 中 `redirect_uri` 为什么要精确匹配而不是包含匹配？

**相关题目**：
- [FB-05-SE-A-008 OAuth 2.0 授权码模式](#FB-05-SE-A-008)
- [FB-05-SC-P-001 OAuth PKCE 流程](#FB-05-SC-P-001)

**参考资源**：
- [OWASP - Open Redirect](https://owasp.org/www-community/attacks/Open_redirect)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-CA-P-001：分析下面代码是否存在原型污染漏洞，并修复。

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全、01 JavaScript
**标签**：原型污染、对象合并、__proto__、防御
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：

```js
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

const userInput = JSON.parse('{"user": {"__proto__": {"role": "admin"&#125;&#125;}');
const config = deepMerge({}, userInput);

console.log({}.role); // ?
```

请指出漏洞并修复。

**参考答案**：

**漏洞分析**：

代码使用 `for...in` 遍历用户输入的键，当键为 `__proto__` 时，`target[key]` 会访问并修改 `target` 的原型（即 `Object.prototype`），导致所有对象被污染。

修复后 `{}.role` 输出 `'admin'`。

**修复方案**：

```js
function isDangerousKey(key) {
  return key === '__proto__' || key === 'constructor' || key === 'prototype';
}

function deepMerge(target, source) {
  for (const key in source) {
    if (isDangerousKey(key)) continue;
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (source[key] && typeof source[key] === 'object') {
        target[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// 更安全：使用无原型对象
const config = deepMerge(Object.create(null), userInput);
console.log({}.role); // undefined
```

**进一步加固**：

- 使用 `Object.create(null)` 作为合并目标。
- 冻结 `Object.prototype`。
- 使用经过安全审计的库（如 lodash 4.17.12+）。

**评分维度**：
- 漏洞定位（40%）：__proto__ 修改 Object.prototype
- 修复代码（40%）：危险 key 过滤、hasOwnProperty、无原型对象
- 加固意识（20%）：冻结原型、使用安全库

**常见错误**：
- 只过滤 `__proto__` 但忽略 `constructor.prototype`
- 不调用 `hasOwnProperty` 导致遍历到原型链属性
- 修复后仍用普通对象 `{}` 作为合并目标

**延伸追问**：
- 为什么 `JSON.parse` 后的对象仍能触发原型污染？
- 如果攻击者使用 `constructor.prototype`，修复代码是否有效？

**相关题目**：
- [FB-05-SE-P-002 原型污染](#FB-05-SE-P-002)

**参考资源**：
- [OWASP - Prototype Pollution](https://owasp.org/www-community/attacks/Prototype_Pollution)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SC-P-001：在 SPA 中实现 OAuth 2.0 + PKCE，请描述安全细节。

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全
**标签**：OAuth 2.0、PKCE、SPA、Authorization Code、State
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请为一个纯前端 SPA 设计 OAuth 2.0 登录方案，重点说明 PKCE 流程、state 校验、Token 存储和刷新机制。

**参考答案**：

**整体流程**：

1. **生成 PKCE 参数**：
   - `code_verifier`：高熵随机字符串，长度 43-128。
   - `code_challenge = base64url(sha256(code_verifier))`。

2. **生成 state**：
   - 加密安全随机字符串，存储在 `sessionStorage`。

3. **重定向到授权服务器**：
   - 携带 `response_type=code`、`client_id`、`redirect_uri`、`code_challenge`、`code_challenge_method=S256`、`state`。

4. **回调处理**：
   - 校验 `state` 是否匹配。
   - 提取 `code`，连同 `code_verifier` 发送给 BFF/后端。

5. **Token 交换**：
   - 后端用 `code` + `code_verifier` + `client_secret` 换 Token。
   - Access Token 返回前端内存；Refresh Token 写入 HttpOnly Cookie。

**安全细节**：

- `code_verifier` 只存在于前端内存，不持久化。
- `state` 必须一次性使用，回调后立即清除。
- `redirect_uri` 必须在授权服务器精确注册。
- 所有通信走 HTTPS。
- Access Token 短期有效，配合 Refresh Token Rotation。

```js
// PKCE 生成示例
const verifier = crypto.getRandomValues(new Uint8Array(32));
const codeVerifier = btoa(String.fromCharCode(...verifier))
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
```

**评分维度**：
- PKCE 流程（30%）：verifier、challenge、交换
- state 校验（20%）：随机、一次性、回调校验
- Token 管理（30%）：Access 内存、Refresh HttpOnly、轮换
- 安全细节（20%）：HTTPS、redirect_uri、精确匹配

**常见错误**：
- 在 SPA 中暴露 client_secret
- 不生成或使用 PKCE
- state 校验缺失或复用
- Refresh Token 存在 localStorage

**延伸追问**：
- 如果授权服务器不支持 PKCE，这个方案还能用吗？
- 后端在 Token 交换时应做哪些额外校验？

**相关题目**：
- [FB-05-SE-A-008 OAuth 2.0 授权码模式](#FB-05-SE-A-008)
- [FB-05-SD-R-002 设计 SSO/OIDC 架构](#FB-05-SD-R-002)

**参考资源**：
- [RFC 7636 - PKCE](https://tools.ietf.org/html/rfc7636)
- [Auth0 - SPA + PKCE](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-P-006：XSS 过滤/转义有哪些常见绕过手法？如何设计更健壮的防御？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全
**标签**：XSS、绕过、HTML 编码、黑名单、上下文编码
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请列举 XSS 防御中常见的绕过手法，并说明为什么上下文相关的输出编码比简单过滤更可靠。

**参考答案**：

**常见绕过手法**：

1. **大小写和编码绕过**：
   - `<ScRiPt>`、`<img src=x onerror=alert(1)>`
   - HTML 实体编码：`&#x3c;script&#x3e;`
   - Unicode 转义、URL 编码

2. **事件处理器绕过**：
   - `onmouseover`、`onfocus`、`onload` 等大量事件
   - SVG 中的 `onload`

3. **伪协议绕过**：
   - `javascript:`、`data:text/html,`

4. **模板和框架绕过**：
   - Vue `v-html`、React `dangerouslySetInnerHTML`
   - Angular `ng-bind-html`

5. **黑名单绕过**：
   - 过滤 `<script>` 但允许 `<img onerror=...>`
   - 过滤 `alert` 但允许 `prompt`、`confirm`、`eval`

**为什么上下文编码更可靠**：

不同上下文的编码规则不同：

- **HTML 内容上下文**：`& < > " '` → 实体编码
- **HTML 属性上下文**：根据属性类型选择编码，URL 属性需额外校验 scheme
- **JavaScript 上下文**：`\` 和引号需转义，且必须确保在字符串/数字上下文中
- **CSS 上下文**：避免在 `url()`、`expression()` 中插入不可信数据
- **URL 上下文**：URL 编码 + scheme 白名单

**健壮防御**：

1. 不使用黑名单过滤，优先使用框架自动转义。
2. 必须手动插入时按上下文编码。
3. 使用 DOMPurify 等库清洗富文本。
4. 部署 CSP 作为最后防线。

**评分维度**：
- 绕过手法（35%）：编码、事件、伪协议、框架绕过
- 上下文编码理解（35%）：HTML/JS/CSS/URL 不同规则
- 防御设计（30%）：白名单、自动转义、CSP

**常见错误**：
- 认为过滤 `<script>` 标签就足够
- 在 JS 上下文中只做 HTML 编码
- 忽略 URL 属性的 scheme 校验

**延伸追问**：
- 如果用户输入要插入到 `<a href="">` 中，应该怎么做？
- `innerHTML` 和 `textContent` 在安全性上有什么本质区别？

**相关题目**：
- [FB-05-SE-A-001 系统性防御 XSS](#FB-05-SE-A-001)
- [FB-05-CA-A-001 代码分析 XSS](#FB-05-CA-A-001)

**参考资源**：
- [OWASP - XSS Filter Evasion Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-P-007：什么是供应链攻击？前端项目中有哪些典型风险点？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全、10 构建工具、23 包管理与供应链安全
**标签**：供应链攻击、npm、依赖、恶意包、CVE、SBOM
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请解释前端供应链攻击的概念，列举典型风险点，并说明如何在项目构建和发布阶段进行防御。

**参考答案**：

**供应链攻击**：攻击者通过污染开发工具、依赖包、CDN 资源等上游环节，将恶意代码注入到最终产品中。由于前端项目依赖大量第三方资源，攻击面极广。

**典型风险点**：

1. **npm 依赖**：
   - 恶意包、 typosquatting（名称拼写相近）。
   - 依赖的依赖被入侵（如 event-stream、ua-parser-js 事件）。

2. **CDN 资源**：
   - 直接引用第三方 CDN 脚本，一旦被篡改全站受影响。

3. **构建工具与插件**：
   - Webpack/Vite 插件、Babel 插件被植入后门。

4. **CI/CD 环境**：
   - 构建机凭据泄露、恶意 runner。

5. **开发者机器**：
   - 被篡改的编辑器插件、命令行工具。

**防御措施**：

1. **依赖管理**：
   - 锁定版本：`package-lock.json`、`yarn.lock`、`pnpm-lock.yaml`。
   - 使用私有仓库/镜像并做审计。
   - 定期扫描 CVE：`npm audit`、`Snyk`、`Dependabot`。

2. **构建安全**：
   - 校验依赖完整性（lockfile + checksum）。
   - 使用 SBOM（软件物料清单）追踪依赖。
   - 构建产物签名与哈希校验。

3. **运行时防御**：
   - SRI（Subresource Integrity）校验 CDN 资源。
   - CSP 限制脚本来源。

4. **流程治理**：
   - 代码审查、最小权限原则、依赖变更审批。

**评分维度**：
- 供应链攻击理解（25%）：上游污染、影响最终产品
- 风险点识别（35%）：依赖、CDN、构建工具、CI/CD
- 防御措施（40%）：lockfile、SRI、审计、SBOM、CSP

**常见错误**：
- 认为只用知名包就安全
- 不锁版本直接使用 `latest`
- 忽略 transitive dependencies 的风险
- 不在 CI 中做安全扫描

**延伸追问**：
- SRI 是什么？如何为 CDN 脚本生成完整性哈希？
- 如果某个依赖出现 CVE，但业务紧急需要，该如何决策？

**相关题目**：
- [FB-05-SE-R-002 供应链安全治理](#FB-05-SE-R-002)
- [FB-05-SC-R-002 第三方脚本与 iframe 安全](#FB-05-SC-R-002)

**参考资源**：
- [OWASP - Software Supply Chain Security](https://owasp.org/www-project-software-supply-chain-security/)
- [Snyk - npm security](https://snyk.io/learn/npm-security/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-P-008：除了 X-Frame-Options，点击劫持还有哪些高级防御手段？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：05 Web 安全
**标签**：点击劫持、frame-ancestors、UI 伪装、交互时序、指针事件
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明点击劫持的高级变体（如 UI 伪装、拖放劫持、触屏劫持）以及更全面的防御方案。

**参考答案**：

**高级变体**：

1. **UI 伪装（UI Redressing）**：
   - 用 iframe 覆盖目标页面，并通过 CSS 把关键按钮定位到用户可见的诱饵按钮下方。

2. **拖放劫持（Clickjacking with Drag-and-Drop）**：
   - 诱导用户拖拽看似无害的元素，实际将敏感数据拖入攻击者控制的区域。

3. **触屏劫持（Tapjacking）**：
   - 针对移动端的点击劫持，利用透明覆盖层和触摸事件时序。

4. **光标劫持（Cursor Jacking）**：
   - 用自定义光标偏移，让用户点击到意想不到的位置。

**防御方案**：

1. **响应头（首选）**：
   - `X-Frame-Options: DENY / SAMEORIGIN`
   - `Content-Security-Policy: frame-ancestors 'none' / 'self'`

2. **Permission Policy（原 Feature Policy）**：
   - 限制 iframe 使用摄像头、麦克风、定位等敏感 API。

3. **SameSite Cookie**：
   - 即使被嵌入，Cookie 不发送也能降低危害。

4. **前端交互增强**：
   - 敏感操作增加二次确认、验证码、生物识别。
   - 检测 iframe 嵌入并提示用户。

5. **反点击劫持 JS（备用）**：
   - 当响应头不可控时，使用 frame-busting 脚本，但可靠性不如响应头。

**评分维度**：
- 高级变体（30%）：拖放、触屏、光标劫持
- 响应头防御（30%）：XFO、frame-ancestors
- 纵深防御（40%）：Permission Policy、SameSite、二次确认

**常见错误**：
- 只防御传统点击劫持，忽略移动端和拖放场景
- 依赖 JS frame-busting 作为主要防御
- 允许任意第三方 iframe 嵌入敏感页面

**延伸追问**：
- 如果业务确实需要提供"嵌入"功能，如何设计安全的嵌入方案？
- 点击劫持和 CSRF 有什么联系和区别？

**相关题目**：
- [FB-05-SE-B-004 什么是点击劫持](#FB-05-SE-B-004)
- [FB-05-SC-R-002 第三方脚本与 iframe 安全](#FB-05-SC-R-002)

**参考资源**：
- [OWASP - Clickjacking Defense Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---
### FB-05-SE-P-012：OAuth 2.0 隐式授权模式有什么问题？PKCE 如何解决？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：OAuth、PKCE、隐式授权、安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明隐式授权在公网客户端的风险及 PKCE 流程。

**参考答案**：

隐式授权把 access_token 通过 URL fragment 返回，可被浏览器历史、Referer、恶意脚本窃取，且不支持 refresh token。PKCE 在授权码流程中增加 code_verifier 和 code_challenge，防止授权码被拦截后兑换 token。

所有公网客户端（包括 SPA）都应使用带 PKCE 的授权码模式。


**补充说明**：

在实际落地 OAuth 2.0 隐式授权模式有什么问题PKCE 如何解决 时，建议结合 OAuth、PKCE、隐式授权 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 隐式授权风险（40%）：token 泄露、历史记录
- PKCE 流程（40%）：code_challenge/verifier
- 推荐模式（20%）：授权码 + PKCE

**常见错误**：
- SPA 使用隐式授权模式
- PKCE 的 code_verifier 保存在可被读取的 localStorage
- 认为后端应用才需要 PKCE

**口头回答版**：
> OAuth 隐式授权存在 token 泄露风险，SPA 应使用带 PKCE 的授权码模式。

### FB-05-SE-P-013：什么是刷新令牌轮换（Refresh Token Rotation）？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：Refresh Token、轮换、OAuth、安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释刷新令牌被窃取的风险及轮换机制。

**参考答案**：

刷新令牌长期有效，窃取后可长期冒充用户。Refresh Token Rotation 每次使用 refresh token 获取新 access token 时同时颁发新的 refresh token，旧 token 失效。检测到旧 token 被重放时（reuse detection）可撤销用户所有令牌。

    access_token, refresh_token = rotate(old_refresh_token)


**补充说明**：

在实际落地 刷新令牌轮换（Refresh Token Rotation） 时，建议结合 Refresh Token、轮换、OAuth 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 风险（30%）：长期 token 泄露
- 轮换（40%）：每次刷新更换 token
- 重放检测（30%）：发现窃取并撤销

**常见错误**：
- 刷新令牌固定不变
- 将 refresh token 存 localStorage 增加泄露面
- 没有重放检测机制，轮换效果大打折扣

**口头回答版**：
> 刷新令牌轮换每次刷新时更换 refresh token，并检测重放，降低长期 token 泄露风险。

### FB-05-SE-P-014：CSP 的 script-src、style-src、img-src 等指令如何配置？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：CSP、script-src、style-src、安全头
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明各资源指令的作用和常见取值。

**参考答案**：

script-src 控制 JS 来源，可设 'self'、'unsafe-inline'、'unsafe-eval'、nonce/hash、指定域名。style-src 控制样式来源。img-src 控制图片。default-src 作为其他指令默认值。

推荐：禁用 'unsafe-inline' 和 'unsafe-eval'，使用 nonce 或哈希允许内联脚本；生产环境启用 report-uri/report-to 收集违规报告。

**评分维度**：
- script-src（40%）：JS 来源与 nonce/hash
- style-src/img-src（30%）：样式与图片限制
- default-src/report（30%）：默认策略与报告

**常见错误**：
- CSP 设置为 default-src * 导致完全失效
- 大量使用 'unsafe-inline' 而不使用 nonce
- 没有收集 CSP 违规报告，无法发现配置问题

**口头回答版**：
> CSP 通过 script-src、style-src、img-src 等指令限制资源来源，推荐禁用 unsafe-inline/eval 并使用 nonce 或哈希。

### FB-05-SE-P-015：如何防御 DOM Clobbering 攻击？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：DOM Clobbering、XSS、原型污染、安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 DOM Clobbering 原理及防御方法。

**参考答案**：

DOM Clobbering 利用 HTML 元素 id/name 会映射为 window/global 对象属性的特性，覆盖脚本依赖的全局变量，从而绕过安全检查或触发恶意代码。防御：避免用全局变量做安全配置；使用 Object.hasOwn 判断属性来源；使用 const/let 声明局部变量；对第三方 HTML 严格过滤；使用 Trusted Types。

    if (window.config && Object.hasOwn(window, 'config')) { ... }

**评分维度**：
- 原理（40%）：id/name 覆盖全局属性
- 防御（40%）：局部变量、hasOwn、Trusted Types
- 过滤（20%）：不可信 HTML 清理

**常见错误**：
- 用全局变量存储安全白名单
- 检查属性存在但未判断是否为 DOM 元素注入
- 认为只有 innerHTML 才会导致 XSS

**口头回答版**：
> DOM Clobbering 通过 DOM 元素 id/name 覆盖全局属性，防御需避免全局安全配置、使用 hasOwn 和 Trusted Types。

### FB-05-SE-P-016：前端密钥管理有哪些原则和最佳实践？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：密钥管理、加密、前端安全、环境变量
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明哪些密钥不应放在前端，以及如何管理必要的客户端凭证。

**参考答案**：

原则：服务端私钥、数据库密码、支付密钥绝不应放在前端。必要客户端凭证（如 API key、公钥）应：限制作用域、按环境注入、使用构建时加密或混淆但不依赖其保密、配合服务端鉴权、定期轮换。

浏览器中任何字符串都可被用户获取，不要把机密当成隐私。


**补充说明**：

在实际落地 前端密钥管理有哪些原则和最佳实践 时，建议结合 密钥管理、加密、前端安全 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 不在前端存放（40%）：私钥和敏感密钥
- 作用域限制（30%）：API key 仅允许特定接口和域名
- 轮换（30%）：定期更换与监控

**常见错误**：
- 把支付私钥放在前端代码
- 认为 webpack 混淆能保护密钥
- API key 无服务端校验直接操作核心资源

**口头回答版**：
> 前端不应存放服务端私钥，必要客户端凭证需限制作用域、按环境注入、定期轮换并配合服务端鉴权。

### FB-05-SE-P-017：Secure Cookie 与 SameSite=None 的兼容处理

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：Cookie、SameSite、Secure、跨站
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明现代浏览器对 SameSite=None 的要求及旧浏览器兼容问题。

**参考答案**：

Chrome 等现代浏览器要求 SameSite=None 的 Cookie 必须同时设置 Secure，否则会被拒绝。部分旧浏览器可能把 SameSite=None 当作 SameSite=Strict，导致跨站请求不带 Cookie。

兼容方案：User-Agent 检测，对已知不兼容浏览器不设置 SameSite 或设置 SameSite=（空字符串）。


**补充说明**：

在实际落地 Secure Cookie 与 SameSite=None 的兼容处理 时，建议结合 Cookie、SameSite、Secure 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 现代要求（40%）：SameSite=None 必须 Secure
- 旧浏览器（30%）：解析为 Strict 的问题
- 兼容方案（30%）：UA 检测与降级

**常见错误**：
- SameSite=None 未设置 Secure
- 对所有浏览器都发送 SameSite=None
- 忽略第三方 Cookie 逐步淘汰趋势

**口头回答版**：
> SameSite=None 必须配合 Secure，旧浏览器可能解析异常，需按 User-Agent 做兼容降级。

### FB-05-SE-P-018：什么是 Trusted Types？如何缓解 DOM XSS？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：Trusted Types、DOM XSS、CSP、安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Trusted Types API 的原理和使用方式。

**参考答案**：

Trusted Types 要求 DOM 注入 API（innerHTML、eval、script.src 等）只接受特定策略创建的受信对象，而非原始字符串。结合 CSP require-trusted-types-for 'script' 强制使用，可从源头阻止 DOM XSS。

    const policy = trustedTypes.createPolicy('default', {
      createHTML: (s) => DOMPurify.sanitize(s)
    });
    el.innerHTML = policy.createHTML(userInput);

**评分维度**：
- 策略（40%）：createHTML/createScriptURL
- CSP 强制（30%）：require-trusted-types-for
- DOM 注入点（30%）：innerHTML/eval/script.src

**常见错误**：
- Trusted Types 策略未做输入清理
- CSP 未强制 require-trusted-types-for
- 认为 Trusted Types 可替代所有 XSS 防御

**口头回答版**：
> Trusted Types 要求 DOM 注入只接受受信对象，配合 CSP 强制可显著缓解 DOM XSS。

### FB-05-SE-P-019：如何对富文本进行安全过滤？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：富文本、XSS、DOMPurify、过滤
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明富文本过滤的原则、工具和常见绕过。

**参考答案**：

原则：使用成熟库（DOMPurify）而非手写正则；采用白名单标签/属性/协议；过滤事件处理器、javascript:、data:、SVG script；对输出再次按上下文转义；配置 CSP 兜底。

常见绕过：HTML 实体编码、大小写、命名空间混淆、SVG/math 中的 script。


**补充说明**：

在实际落地 对富文本进行安全过滤 时，建议结合 富文本、XSS、DOMPurify 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 白名单（40%）：允许的标签和属性
- 成熟库（30%）：DOMPurify 等
- 绕过（30%）：实体编码、SVG script

**常见错误**：
- 用正则表达式过滤 HTML
- 允许任意 style 属性导致 mXSS
- 过滤后输出到 textarea 等仍按 HTML 解析的上下文

**口头回答版**：
> 富文本过滤应使用白名单和成熟库，过滤危险标签、属性和协议，注意 HTML 实体和 SVG 等绕过方式。

### FB-05-SE-P-020：npm 恶意包有哪些典型攻击手法与防御？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：供应链、npm、恶意包、安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 npm 供应链攻击常见手法及企业防御策略。

**参考答案**：

手法：typosquatting（拼写相似包）、依赖混淆、postinstall 脚本执行恶意代码、窃取环境变量、挖矿、上传包含漏洞的旧版本。

防御：私有仓库、依赖锁定、SCA 扫描（Snyk/Dependabot）、审查 postinstall 脚本、最小权限安装、网络隔离、定期审计。


**补充说明**：

在实际落地 npm 恶意包有哪些典型攻击手法与防御 时，建议结合 供应链、npm、恶意包 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 攻击手法（40%）：typosquatting、混淆、postinstall
- 扫描（30%）：SCA 与漏洞库
- 流程（30%）：私有仓库、锁定、审计

**常见错误**：
- 安装依赖时不看包名和下载量
- 忽略 package-lock 变更直接提交
- 允许 npm 脚本以 root 权限执行

**口头回答版**：
> npm 恶意包常用手法包括拼写混淆、依赖混淆和 postinstall 脚本，防御需私有仓库、锁定、SCA 扫描和审计。

### FB-05-SE-P-021：如何安全地实现前端端到端加密（E2EE）？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：05 Web 安全
**标签**：E2EE、加密、WebCrypto、密钥管理
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明前端 E2EE 的密钥生成、分发、存储和加密流程。

**参考答案**：

E2EE 保证只有通信双方能读取消息。前端使用 WebCrypto API 生成非对称密钥对，私钥本地安全存储（如 IndexedDB 或硬件模块），公钥通过可信渠道交换。消息用对称密钥加密，对称密钥用接收方公钥加密后随消息发送。

注意：密钥派生、随机数、认证加密（AES-GCM）、前向保密、密钥轮换。


**补充说明**：

在实际落地 安全地实现前端端到端加密（E2EE） 时，建议结合 E2EE、加密、WebCrypto 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 密钥生成（30%）：WebCrypto 与随机源
- 密钥分发（30%）：公钥可信交换
- 存储安全（20%）：私钥本地保护
- 算法（20%）：认证加密与密钥轮换

**常见错误**：
- 私钥明文存在 localStorage
- 使用自定义加密算法或 ECB 模式
- 忽略公钥真实性验证导致中间人攻击

**口头回答版**：
> 前端 E2EE 需用 WebCrypto 生成密钥对，私钥本地安全存储，公钥可信交换，使用认证加密并定期轮换密钥。
---

## 架构题（16 道）{#architect}

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

### FB-05-SD-R-001：如何为大型企业级前端应用设计一套完整的安全体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、31 安全架构
**标签**：安全体系、纵深防御、SDL、DevSecOps、安全治理
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
假设你是前端架构师，负责一个包含多个 SPA、微前端、BFF、CDN 的大型企业应用。请设计一套完整的前端安全体系，覆盖开发、构建、部署、运行全生命周期。

**参考答案**：

**一、安全治理层**

1. 建立前端安全规范：输入输出编码、密钥管理、第三方依赖审批。
2. 设立安全负责人和应急响应流程。
3. 定期安全培训与攻防演练。

**二、开发阶段**

1. 安全编码规范：
   - 禁用 `innerHTML`/`document.write`/`eval`。
   - 统一使用公司封装的安全工具函数。
   - 敏感操作必须二次确认。

2. Code Review 清单：
   - 新依赖是否必要、是否有 CVE。
   - 是否引入新的第三方脚本/CDN。
   - 是否处理不可信输入。

3. 静态安全扫描：
   - Semgrep、ESLint 安全规则、npm audit。

**三、构建阶段**

1. 依赖锁定与完整性校验。
2. SBOM 生成与归档。
3. 构建环境隔离与最小权限。
4. 产物哈希与签名。

**四、部署与运行时**

1. 安全响应头标准化：
   - `Content-Security-Policy`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options` / `frame-ancestors`
   - `Strict-Transport-Security`
   - `Referrer-Policy`

2. WAF 与 RASP：
   - 网关层 WAF 拦截常见攻击。
   - 运行时应用自我保护（RASP）检测异常行为。

3. 微前端隔离：
   - 使用 iframe 或 Web Component 沙箱。
   - 子应用间通信通过受控 postMessage。

**五、监控与响应**

1. CSP 违规上报、前端错误监控。
2. 安全事件自动化告警。
3. 漏洞响应 SLA 与回滚机制。

**评分维度**：
- 生命周期覆盖（30%）：开发、构建、部署、运行
- 技术措施完整性（30%）：规范、扫描、响应头、隔离
- 治理与流程（25%）：SDL、培训、应急响应
- 可落地性（15%）：是否结合企业现状

**常见错误**：
- 只关注运行时防御，忽略开发和构建阶段
- 堆砌安全工具但缺乏流程
- 忽略微前端等复杂架构的特殊风险

**延伸追问**：
- 如何平衡安全策略与开发效率？
- 微前端架构下，主子应用之间的安全边界如何划分？

**相关题目**：
- [FB-05-SD-R-003 设计 CSP 部署策略](#FB-05-SD-R-003)
- [FB-05-SE-R-002 供应链安全治理](#FB-05-SE-R-002)

**参考资源**：
- [OWASP - Software Assurance Maturity Model (SAMM)](https://owasp.org/www-project-samm/)

**口头回答版**：
> 建立前端安全规范：输入输出编码、密钥管理、第三方依赖审批。 设立安全负责人和应急响应流程。 定期安全培训与攻防演练。 - 禁用 innerHTML/document.write/eval。

---

### FB-05-SD-R-002：如何设计一个企业级 SSO/OIDC 认证架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、31 安全架构
**标签**：SSO、OIDC、OAuth 2.0、ID Token、Session、BFF
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个企业级单点登录（SSO）架构，基于 OIDC/OAuth 2.0，说明前端、BFF、IDP、业务服务之间的交互，以及 Token 管理和安全细节。

**参考答案**：

**架构组成**：

1. **User Agent**：浏览器/移动端。
2. **IDP（Identity Provider）**：OIDC Provider，负责身份认证和颁发 Token。
3. **BFF / Gateway**：前端的后端服务，持有 client_secret，负责与 IDP 交互。
4. **业务服务**：受保护资源，接收并校验 Access Token。

**登录流程**：

1. 用户访问前端，发现未登录，重定向到 BFF。
2. BFF 生成 `state` 和 `nonce`，引导用户到 IDP 授权端点。
3. 用户在 IDP 完成认证，IDP 重定向回 BFF 回调地址并携带 `code`。
4. BFF 校验 `state`，用 `code` + `client_secret` 换 ID Token、Access Token、Refresh Token。
5. BFF 将 Refresh Token 写入 `HttpOnly; Secure; SameSite=Lax` Cookie。
6. BFF 建立会话（session）或将短期 Access Token 返回前端内存。
7. 前端后续请求携带 session cookie 或 Access Token。

**安全细节**：

- **PKCE**：公共客户端必须启用。
- **nonce**：防止重放攻击，校验 ID Token 中的 `nonce`。
- **ID Token 校验**：校验签名、issuer、audience、expiry、nonce。
- **Refresh Token Rotation**：每次刷新后颁发新 Refresh Token，旧 Token 失效。
- **登出**：调用 IDP 结束会话端点，清除 Cookie 和会话。
- **跨域 Cookie**：`SameSite=None; Secure` 仅用于跨站嵌入场景。

**前端职责**：

- 不直接处理 client_secret。
- 不长期保存敏感 Token。
- 监听登录状态，安全存储非敏感用户信息。
- 配合 BFF 完成静默刷新。

**评分维度**：
- 架构清晰度（25%）：各角色职责
- OIDC 流程（25%）：code、ID Token、nonce、state
- Token 管理（25%）：Access/Refresh、HttpOnly、轮换
- 安全细节（25%）：签名校验、登出、会话管理

**常见错误**：
- 让前端直接持有长期 Refresh Token
- 不校验 ID Token 签名
- 忽略 nonce 和 state
- 单点登出设计不完善

**延伸追问**：
- 如何在多个子域之间实现 SSO？
- 如果 IDP 不可用，如何优雅降级？

**相关题目**：
- [FB-05-SE-A-008 OAuth 2.0 授权码模式](#FB-05-SE-A-008)
- [FB-05-SC-P-001 SPA 中 OAuth 2.0 + PKCE](#FB-05-SC-P-001)

**参考资源**：
- [OIDC Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SC-R-001：如何设计"零信任"视角下的前端安全架构？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、31 安全架构
**标签**：零信任、最小权限、持续验证、设备指纹、前端可信
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请结合"零信任"（Never Trust, Always Verify）理念，设计一套前端安全架构，说明如何在不可信网络和设备上保护应用和数据。

**参考答案**：

**零信任核心原则**：

1. 从不信任任何请求，默认拒绝。
2. 最小权限原则。
3. 持续验证和动态授权。
4. 假设边界已被突破，做内部隔离。

**前端零信任设计**：

1. **身份认证层**：
   - 强身份验证：MFA、FIDO2/WebAuthn、生物识别。
   - 短会话 + 持续重认证：敏感操作重新验证身份。

2. **设备信任层**：
   - 设备指纹采集与绑定。
   - 异常设备检测和风险评分。
   - 不可信设备限制访问敏感功能。

3. **网络层**：
   - 全站 HTTPS + HSTS preload。
   - mTLS 或客户端证书用于高敏感场景。
   - 不信任任何代理和中转。

4. **应用层**：
   - 前端代码混淆与完整性校验（SRI、签名）。
   - 敏感逻辑不依赖前端校验，所有关键操作服务端仲裁。
   - 关键数据加密传输和存储。

5. **数据层**：
   - 字段级加密。
   - 最小数据暴露：前端只获取必要字段。
   - 水印、防截屏、剪贴板控制。

6. **监控与响应**：
   - 前端行为分析：异常点击、自动化工具检测。
   - 实时风控拦截和会话冻结。

**评分维度**：
- 零信任理念理解（25%）：持续验证、最小权限
- 多层设计（35%）：身份、设备、网络、应用、数据
- 前端特殊性（20%）：代码不可信、前端可被绕过
- 可落地性（20%）：分阶段实施建议

**常见错误**：
- 把零信任简单理解为"多因子认证"
- 认为前端可以实现零信任（零信任是端到端体系）
- 忽略用户体验与安全的平衡

**延伸追问**：
- 前端如何辅助做设备指纹？有哪些限制？
- 在零信任架构中，前端是否还需要做输入校验？为什么？

**相关题目**：
- [FB-05-SD-R-001 企业级前端安全体系](#FB-05-SD-R-001)
- [FB-05-SE-R-003 前端加密与密钥管理](#FB-05-SE-R-003)

**参考资源**：
- [NIST - Zero Trust Architecture](https://csrc.nist.gov/publications/detail/sp/800-207/final)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SE-R-001：如何在团队中落地安全 SDL（安全开发生命周期）？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、13 代码质量与测试、31 安全架构
**标签**：SDL、DevSecOps、安全左移、安全测试、安全培训
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
作为前端架构师，你如何在团队中推动安全 SDL 落地？请说明关键阶段、工具选择和度量指标。

**参考答案**：

**SDL 关键阶段**：

1. **需求阶段**：
   - 识别安全需求（数据分级、合规要求）。
   - 威胁建模（STRIDE）：识别 XSS、CSRF、越权等风险。

2. **设计阶段**：
   - 安全架构评审。
   - 制定认证、授权、加密、审计方案。

3. **开发阶段**：
   - 安全编码规范与培训。
   - IDE 插件实时提示（如 SonarLint、Snyk）。
   - Code Review 安全检查单。

4. **测试阶段**：
   - SAST（静态应用安全测试）：Semgrep、CodeQL。
   - DAST（动态应用安全测试）：OWASP ZAP、Burp Suite。
   - 依赖安全扫描：npm audit、Snyk、Dependabot。
   - 渗透测试与漏洞赏金。

5. **部署与运维**：
   - 安全响应头基线。
   - 生产监控与告警。
   - 漏洞响应与补丁管理。

**工具选择示例**：

- 静态扫描：Semgrep、ESLint security、SonarQube。
- 依赖扫描：Snyk、Socket.dev、npm audit。
- 动态扫描：OWASP ZAP、Burp Suite。
- 密钥扫描：GitLeaks、truffleHog。

**度量指标**：

- 高危漏洞平均修复时间（MTTR）。
- 每千行代码漏洞数。
- 安全扫描覆盖率。
- 安全培训参与率和考试通过率。

**评分维度**：
- SDL 阶段覆盖（30%）：需求、设计、开发、测试、运维
- 工具与实践（30%）：SAST/DAST/依赖扫描/Code Review
- 团队推动能力（25%）：培训、度量、激励机制
- 可落地性（15%）：从小处着手，逐步完善

**常见错误**：
- 一上来就引入大量工具导致团队抵触
- 只重视测试阶段，忽略需求和设计
- 没有度量指标，无法证明价值

**延伸追问**：
- 如何处理安全扫描中的误报？
- 业务压力大时，如何平衡安全与交付速度？

**相关题目**：
- [FB-05-SD-R-001 企业级前端安全体系](#FB-05-SD-R-001)
- [FB-05-SE-R-002 供应链安全治理](#FB-05-SE-R-002)

**参考资源**：
- [Microsoft SDL](https://www.microsoft.com/en-us/securityengineering/sdl)

**口头回答版**：
> - 识别安全需求（数据分级、合规要求）。 - 威胁建模（STRIDE）：识别 XSS、CSRF、越权等风险。 - 制定认证、授权、加密、审计方案。 - 安全编码规范与培训。

---

### FB-05-SE-R-002：如何治理前端供应链安全风险？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、23 包管理与供应链安全
**标签**：供应链、npm、SBOM、SRI、依赖治理、CVE
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请描述一套前端供应链安全治理方案，覆盖依赖选型、引入、构建、运行和应急响应全流程。

**参考答案**：

**一、依赖选型**

1. 优先使用官方/大厂维护的包。
2. 检查包的健康度：下载量、维护频率、issue 响应、最近更新时间。
3. 避免使用功能重叠的多个包。

**二、引入审批**

1. 新依赖需经过安全评审，说明用途和替代方案。
2. 检查依赖树大小和 transitive dependencies 数量。
3. 使用工具（如 Socket.dev）分析包行为。

**三、版本锁定与完整性**

1. 强制使用 lockfile（package-lock/yarn.lock/pnpm-lock）。
2. CI 校验 lockfile 与 registry 的 checksum。
3. 禁止 `--legacy-peer-deps` 等可能改变依赖树的参数未经审批。

**四、构建与发布**

1. 构建环境隔离、最小权限。
2. 生成并归档 SBOM。
3. 产物签名，部署时校验哈希。

**五、运行时防护**

1. CDN 资源使用 SRI。
2. CSP 限制脚本来源。
3. 监控第三方脚本行为（如埋点、客服插件）。

**六、应急响应**

1. 建立依赖漏洞响应流程。
2. 订阅 npm security advisories、Snyk 告警。
3. 高危漏洞 24 小时内评估影响，72 小时内修复或缓解。

**评分维度**：
- 全流程覆盖（35%）：选型、引入、构建、运行、应急
- 技术手段（30%）：lockfile、SBOM、SRI、CSP
- 治理机制（25%）：审批、评审、响应 SLA
- 风险意识（10%）：transitive dependencies、typosquatting

**常见错误**：
- 只扫描 direct dependencies
- 没有版本锁定机制
- 忽略第三方 CDN 和脚本
- 应急响应流程缺失

**延伸追问**：
- 如果某个核心依赖停止维护但出现漏洞，你该怎么办？
- 如何评估一个 npm 包是否可信？

**相关题目**：
- [FB-05-SE-P-007 供应链攻击](#FB-05-SE-P-007)
- [FB-05-SC-R-002 第三方脚本与 iframe 安全](#FB-05-SC-R-002)

**参考资源**：
- [OWASP - Dependency Check](https://owasp.org/www-project-dependency-check/)

**口头回答版**：
> 优先使用官方/大厂维护的包。 检查包的健康度：下载量、维护频率、issue 响应、最近更新时间。 避免使用功能重叠的多个包。 新依赖需经过安全评审，说明用途和替代方案。

---

### FB-05-SD-R-003：如何为大型站点设计和分阶段部署 CSP？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、31 安全架构
**标签**：CSP、部署策略、Report-Only、分阶段、安全头
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
大型站点历史悠久，包含大量内联脚本、第三方资源和遗留页面。请设计一套 CSP 分阶段部署方案，既能提升安全性，又不影响业务。

**参考答案**：

**一、现状摸底**

1. 梳理所有页面、子应用、第三方脚本和 CDN。
2. 使用爬虫 + CSP Report-Only 收集一段时间的违规报告。
3. 识别高频违规来源和 blocker。

**二、基线策略制定**

1. 从最宽松但仍有价值的策略开始：
   - `default-src *`（先不禁资源，只收集报告）
   - 逐步收紧为 `default-src 'self'`
2. 优先启用非破坏性指令：
   - `frame-ancestors 'self'`
   - `base-uri 'self'`
   - `form-action 'self'`
   - `upgrade-insecure-requests`

**三、处理内联脚本**

1. 统计所有内联脚本，制定外联计划。
2. 对短期无法外联的，使用 nonce 或 hash。
3. 禁止新增内联脚本（通过 CI 检测）。

**四、分阶段上线**

1. **第 1 阶段**：Report-Only 全量，持续 2-4 周。
2. **第 2 阶段**：对低流量页面启用 enforce。
3. **第 3 阶段**：核心业务页面启用，保留 Report-Only 监控。
4. **第 4 阶段**：收紧策略，移除 `unsafe-inline`/`unsafe-eval`。

**五、监控与回滚**

1. 建立 CSP 违规上报通道。
2. 设置告警阈值，如某页面违规突增则自动回滚。
3. 保留历史策略版本，支持快速切换。

**评分维度**：
- 现状分析（20%）：梳理资源、收集报告
- 分阶段策略（30%）：Report-Only → 低流量 → 核心 → 收紧
- 内联脚本处理（25%）：外联、nonce/hash
- 风险控制（25%）：监控、告警、回滚

**常见错误**：
- 一开始就全量 enforce 严格策略
- 忽略旧系统和第三方嵌入
- 没有监控和回滚机制
- 只关注 script-src，忽略其他指令

**延伸追问**：
- 如果某个第三方 SDK 强制要求 `unsafe-eval`，你如何决策？
- CSP 违规报告量很大时，如何有效分析？

**相关题目**：
- [FB-05-SE-A-003 生产环境 CSP 配置](#FB-05-SE-A-003)
- [FB-05-CO-B-006 什么是 CSP](#FB-05-CO-B-006)

**参考资源**：
- [Google - CSP Adoption](https://csp.withgoogle.com/)

**口头回答版**：
> 梳理所有页面、子应用、第三方脚本和 CDN。 使用爬虫 + CSP Report-Only 收集一段时间的违规报告。 识别高频违规来源和 blocker。 从最宽松但仍有价值的策略开始：

---

### FB-05-SC-R-002：如何安全地集成第三方脚本、iframe 和广告？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、31 安全架构
**标签**：第三方脚本、iframe、广告、沙箱、SRI、CSP
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
业务需要集成第三方客服脚本、广告、支付 iframe 和数据分析工具。请设计一套安全集成方案，防止第三方代码危害主站安全。

**参考答案**：

**一、第三方脚本**

1. **按需加载**：仅在必要页面加载，延迟加载非关键脚本。
2. **SRI 校验**：对可信 CDN 脚本启用 Subresource Integrity。
3. **CSP 限制**：`script-src` 明确列出允许来源，禁止内联。
4. **沙箱执行**：
   - 将第三方脚本放入 iframe 沙箱执行。
   - 使用 Web Worker 隔离计算密集型第三方库。
5. **权限最小化**：
   - 使用 `fetch` 代理转发请求，隐藏真实 Cookie。
   - 不授予第三方 `document.cookie` 访问权限。

**二、iframe 集成**

1. 使用 `sandbox` 属性限制权限：
   ```html
   <iframe sandbox="allow-scripts allow-same-origin" src="..."></iframe>
   ```
2. 通过 `allow` 属性限制摄像头、麦克风、定位等。
3. 跨域 iframe 通信使用受控 postMessage。

**三、广告**

1. 广告代码放在独立子域或沙箱 iframe。
2. 不共享主站 Cookie。
3. 使用广告安全封装库，限制 DOM 访问。

**四、监控与治理**

1. 建立第三方脚本白名单和版本管理。
2. 监控第三方脚本的网络请求和 DOM 操作。
3. 定期审计第三方服务条款和安全实践。

**评分维度**：
- 脚本隔离方案（30%）：SRI、沙箱、CSP
- iframe 安全（25%）：sandbox、allow、postMessage
- 数据隔离（25%）：Cookie、权限、代理
- 治理机制（20%）：白名单、审计、监控

**常见错误**：
- 直接把第三方脚本放到主域执行
- iframe 不设置 sandbox
- 与第三方共享会话 Cookie
- 不监控第三方行为

**延伸追问**：
- 如果第三方脚本必须访问 DOM，如何最小化权限？
- 第三方 iframe 中的支付页面如何防止点击劫持？

**相关题目**：
- [FB-05-SE-B-004 点击劫持](#FB-05-SE-B-004)
- [FB-05-SE-A-006 postMessage 安全](#FB-05-SE-A-006)
- [FB-05-SE-R-002 供应链安全治理](#FB-05-SE-R-002)

**参考资源**：
- [OWASP - Third Party Javascript Management](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/03-Testing_for_HTML_Injection)

**口头回答版**：
> 按需加载：仅在必要页面加载，延迟加载非关键脚本。 SRI 校验：对可信 CDN 脚本启用 Subresource Integrity。 CSP 限制：script-src 明确列出允许来源，禁止内联。 - 将第三方脚本放入 iframe 沙箱执行。

---

### FB-05-SE-R-003：前端加密与密钥管理有哪些原则和最佳实践？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、31 安全架构
**标签**：前端加密、密钥管理、Web Crypto、HTTPS、零信任
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明前端加密的适用场景、局限性，以及密钥管理的原则和最佳实践。

**参考答案**：

**前端加密的适用场景**：

1. **端到端加密**（E2EE）：如即时通讯，密钥由用户持有。
2. **数据在传输前的额外保护**：如敏感字段二次加密。
3. **合规要求**：某些场景需要在客户端进行加密签名。
4. **离线数据保护**：本地存储的敏感数据加密。

**前端加密的局限性**：

1. **密钥难以隐藏**：前端代码和运行时均可被调试，硬编码密钥等于公开。
2. **可被绕过**：攻击者可修改前端代码或直接用后端接口。
3. **依赖运行环境**：浏览器插件、恶意软件可读取内存中的密钥。
4. **不能替代 HTTPS**：传输层安全是基础。

**密钥管理原则**：

1. **最小化密钥暴露**：
   - 密钥应从服务端动态获取，短期有效。
   - 使用硬件安全模块（HSM）或 KMS 托管密钥。

2. **分层密钥体系**：
   - 数据加密密钥（DEK）+ 密钥加密密钥（KEK）。
   - DEK 可缓存，KEK 严格受控。

3. **使用 Web Crypto API**：
   - 避免自己实现加密算法。
   - 使用标准算法：AES-GCM、RSA-OAEP、ECDH。

4. **密钥生命周期管理**：
   - 生成、分发、使用、轮换、销毁全周期可控。
   - 支持密钥版本化和向后兼容。

5. **零信任存储**：
   - 不在 localStorage 长期保存密钥。
   - 内存中短期使用，页面卸载后清除。

```js
// 使用 Web Crypto 生成密钥
const key = await crypto.subtle.generateKey(
  { name: 'AES-GCM', length: 256 },
  true,
  ['encrypt', 'decrypt']
);
```

**评分维度**：
- 适用场景与局限（30%）：E2EE、不能替代 HTTPS、密钥隐藏难
- 密钥管理原则（35%）：最小暴露、分层、Web Crypto、生命周期
- 实践落地（25%）：动态获取、短期有效、内存使用
- 风险意识（10%）：不硬编码、不自行实现算法

**常见错误**：
- 在前端硬编码 AES 密钥
- 自己实现加密算法或模式
- 认为前端加密能防所有中间人攻击
- 把密钥存在 localStorage

**延伸追问**：
- 如果业务必须在前端解密数据，密钥从哪里来最安全？
- Web Crypto API 和 CryptoJS 有什么区别？为什么推荐前者？

**相关题目**：
- [FB-05-CO-B-004 HTTPS 为什么更安全](#FB-05-CO-B-004)
- [FB-05-SC-R-001 零信任前端架构](#FB-05-SC-R-001)

**参考资源**：
- [MDN - Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [OWASP - Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-05-SD-R-004：如何从前端视角设计一个安全的 API Gateway？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、31 安全架构、19 Node.js / BFF
**标签**：API 网关、鉴权、限流、WAF、CORS、审计
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个面向前端应用的 API Gateway，重点说明鉴权、防刷、防篡改、CORS、日志审计等安全机制。

**参考答案**：

**一、接入层安全**

1. **TLS 终止**：
   - 全站 HTTPS，支持 TLS 1.2+，禁用弱算法。
   - HSTS preload。

2. **DDoS / 流量清洗**：
   - 接入 CDN/WAF，限制单 IP 请求频率。
   - 人机验证（CAPTCHA）应对异常流量。

**二、认证与授权**

1. **统一鉴权**：
   - 校验 Access Token / Session Cookie。
   - Token 黑名单和过期校验。
2. **权限控制**：
   - 基于 RBAC/ABAC 校验接口权限。
   - 敏感接口需要二次认证。

**三、请求安全**

1. **CORS 白名单**：严格 Origin 校验。
2. **请求签名**：
   - 对关键接口要求请求签名（HMAC-SHA256），防篡改和重放。
3. **参数校验**：
   - 类型、长度、格式白名单校验。
4. **防重放**：
   - nonce + timestamp，限制请求时间窗口。

**四、响应安全**

1. 脱敏：不返回前端不需要的敏感字段。
2. 安全响应头：CSP、X-Content-Type-Options 等。
3. 错误信息隐藏内部细节。

**五、限流与熔断**

1. 按用户/IP/接口限流。
2. 异常流量自动熔断和告警。

**六、日志与审计**

1. 记录请求来源、用户、接口、结果。
2. 敏感操作留痕，支持溯源。
3. 与安全 SIEM 对接。

**评分维度**：
- 架构完整性（30%）：接入、鉴权、请求、响应、限流、审计
- 安全机制深度（30%）：签名、防重放、脱敏、CORS
- 前端配合点（20%）：Token 携带、签名生成、错误处理
- 可运维性（20%）：监控、告警、熔断

**常见错误**：
- 把 Gateway 只当反向代理用
- 鉴权逻辑散落在各业务服务
- 不校验请求来源和参数
- 错误信息泄露堆栈或 SQL

**延伸追问**：
- 前端如何安全地生成请求签名？密钥放在哪里？
- Gateway 层做权限控制和业务服务做权限控制，怎么分工？

**相关题目**：
- [FB-05-SE-A-005 CORS 配置错误](#FB-05-SE-A-005)
- [FB-05-SE-A-004 JWT 安全存储](#FB-05-SE-A-004)

**参考资源**：
- [OWASP - API Security Top 10](https://owasp.org/www-project-api-security/)

**口头回答版**：
> - 全站 HTTPS，支持 TLS 1.2+，禁用弱算法。 - HSTS preload。 DDoS / 流量清洗： - 接入 CDN/WAF，限制单 IP 请求频率。

---

### FB-05-SE-R-004：前端隐私合规（GDPR/个保法）需要关注哪些技术点？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：05 Web 安全、37 业务
**标签**：隐私合规、GDPR、个保法、Cookie 同意、数据最小化、审计
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请结合 GDPR、《个人信息保护法》等法规，说明前端在数据收集、存储、传输、共享等环节应注意的合规技术点。

**参考答案**：

**一、数据收集**

1. **最小化原则**：
   - 只收集业务必需的数据。
   - 表单字段按需展示，不预收集敏感信息。

2. **用户同意（Consent）**：
   - 提供清晰的 Cookie/数据收集同意弹窗。
   - 区分必要 Cookie 和非必要 Cookie（分析、营销）。
   - 同意记录可审计、可撤回。

3. **未成年人保护**：
   - 对未成年人收集数据需监护人同意。

**二、数据存储**

1. **敏感数据前端不落地**：
   - 身份证、银行卡等不存 localStorage。
2. **加密存储**：
   - 必要本地数据使用 Web Crypto 加密。
3. **数据保留期限**：
   - 过期自动清理。

**三、数据传输**

1. 全站 HTTPS。
2. 敏感字段额外加密或脱敏传输。
3. 避免在 URL 中传递 PII（个人身份信息）。

**四、数据共享与第三方**

1. 第三方脚本（埋点、广告）需经用户同意。
2. 与第三方共享数据需明确告知用户。
3. 对第三方 SDK 做数据访问限制和审计。

**五、用户权利支持**

1. **访问权**：用户可查看收集的数据。
2. **更正权**：支持修改个人信息。
3. **删除权（被遗忘权）**：支持删除账户和数据。
4. **可携带权**：支持导出数据。

**六、审计与响应**

1. 记录数据处理日志。
2. 数据泄露事件 72 小时内通知监管机构和用户。
3. 定期隐私影响评估（PIA/DPIA）。

**评分维度**：
- 法规理解（20%）：GDPR、个保法核心原则
- 技术措施（40%）：同意管理、最小化、加密、脱敏
- 用户权利（20%）：访问、更正、删除、导出
- 审计响应（20%）：日志、泄露响应、DPIA

**常见错误**：
- 认为隐私合规只是法务或产品的事
- 默认勾选所有同意选项
- 把用户数据无差别传给第三方 SDK
- 用户删除账户后数据仍残留

**延伸追问**：
- 如何设计一个可审计的 Cookie 同意管理系统？
- 如果第三方 SDK 偷偷收集数据，前端如何发现和限制？

**相关题目**：
- [FB-05-SC-R-002 第三方脚本安全集成](#FB-05-SC-R-002)
- [FB-05-SE-B-001 localStorage 安全风险](#FB-05-SE-B-001)

**参考资源**：
- [OWASP - Privacy Risks](https://owasp.org/www-project-top-10-privacy-risks/)
- [MDN - Cookie 同意最佳实践](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

**口头回答版**：
> - 只收集业务必需的数据。 - 表单字段按需展示，不预收集敏感信息。 用户同意（Consent）： - 提供清晰的 Cookie/数据收集同意弹窗。

---
### FB-05-SE-P-011：什么是供应链安全？前端项目如何做好依赖安全？

**题型**：安全题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：05 Web 安全
**标签**：XSS、CSP、Token、HttpOnly、HTTPS
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
什么是供应链安全？前端项目如何做好依赖安全。

**参考答案**：

供应链安全指保护软件所依赖的第三方组件、工具、服务不被恶意篡改或利用。前端项目的依赖树庞大，一个恶意包即可影响整个应用。

防御措施：

1. **最小依赖原则**：只引入必要的包。
2. **版本锁定**：使用 `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` 保证一致性。
3. **定期审计**：`npm audit`、Snyk、Dependabot。
4. **lockfile 校验**：CI 中检查 lockfile 是否被篡改。
5. **私有依赖审查**：对内部包做安全扫描。
6. **SRI 校验**：对 CDN 资源加 integrity 属性。
7. **依赖图谱分析**：使用 `npm ls` 或可视化工具了解间接依赖。

**评分维度**：
- 能解释供应链攻击风险（30%）。
- 能说出 4 个以上防御措施（40%）。
- 能提到 lockfile 和 SRI（30%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 供应链安全指保护软件所依赖的第三方组件、工具、服务不被恶意篡改或利用。 前端项目的依赖树庞大，一个恶意包即可影响整个应用。 防御措施： 1. 最小依赖原则：只引入必要的包。 2. 版本锁定：使用 package-lock.json / yarn.lock / pnpm-lock.yaml 保证一致性。

---

### FB-05-CO-P-001：什么是 Prototype Pollution？如何防御？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：05 Web 安全
**标签**：XSS、CSP、Token、HttpOnly、HTTPS
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
什么是 Prototype Pollution？如何防御。

**参考答案**：

原型污染是指攻击者通过修改 `Object.prototype`，影响所有对象的默认行为。常见于不安全的对象合并、递归赋值。

攻击示例：

```js
function merge(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object") {
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}
merge({}, JSON.parse('{"__proto__": {"isAdmin": true&#125;&#125;'));
console.log({}.isAdmin); // true
```

防御方法：

- 合并前过滤 `__proto__`、`constructor`、`prototype` 键名。
- 使用 `Object.create(null)` 创建无原型对象。
- 使用经过安全审计的库（如最新版 lodash）。
- 及时升级已知存在原型污染漏洞的依赖。

**评分维度**：
- 能解释原理（30%）。
- 能写出攻击示例（30%）。
- 能给出 3 种以上防御方法（40%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 原型污染是指攻击者通过修改 Object.prototype，影响所有对象的默认行为。 常见于不安全的对象合并、递归赋值。 攻击示例： （代码示例） 防御方法： - 合并前过滤 __proto__、constructor、prototype 键名。 - 使用 Object.create(null) 创建无原型对象。

---

### FB-05-CO-P-002：WebAuthn / Passkeys 的基本原理和优势是什么？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：05 Web 安全
**标签**：XSS、CSP、Token、HttpOnly、HTTPS
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
WebAuthn / Passkeys 的基本原理和优势是什么。

**参考答案**：

WebAuthn 是 W3C/FIDO 制定的基于公钥密码学的认证标准。Passkeys 是其用户友好实现。

流程：

1. 注册时，浏览器生成公私钥对，私钥保存在设备，公钥发送服务器。
2. 认证时，服务器发送 challenge，设备用私钥签名，服务器用公钥验证。

优势：

- 抗钓鱼：凭据绑定 RP ID，无法跨站使用。
- 无密码：用户用生物识别或 PIN。
- 服务器不存密码，降低泄露风险。
- 每次认证有新 challenge，抵抗重放攻击。

前端 API：

- `navigator.credentials.create({ publicKey: ... })` 注册。
- `navigator.credentials.get({ publicKey: ... })` 登录。

**评分维度**：
- 能解释公钥认证流程（30%）。
- 能说出 3 个以上优势（30%）。
- 能提到 API 和 RP ID（25%）。
- 能说明兼容性和降级（15%）。

---

**常见错误**：
- 只停留在概念层面，缺乏具体场景说明。
- 忽略边界情况、异常处理或回退方案。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> WebAuthn 是 W3C/FIDO 制定的基于公钥密码学的认证标准。 Passkeys 是其用户友好实现。 注册时，浏览器生成公私钥对，私钥保存在设备，公钥发送服务器。 认证时，服务器发送 challenge，设备用私钥签名，服务器用公钥验证。

### FB-05-SE-R-005：如何建立企业级前端安全运营指标体系？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：05 Web 安全
**标签**：安全运营、指标、SOC、前端安全
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套可度量前端安全成熟度与运营效果的指标体系。

**参考答案**：

指标体系：

1. 漏洞类：XSS/CSRF/注入漏洞数量、严重等级、修复时长。
2. 配置类：HTTPS/HSTS/CSP/SRI 覆盖率、Header 合规率。
3. 依赖类：已知漏洞组件数量、漏洞修复周期。
4. 事件类：CSP 违规数、钓鱼/仿冒站点数、安全事件响应时间。
5. 流程类：SDL 参与度、安全培训覆盖率、代码审计率。

通过看板持续跟踪并驱动改进。


**补充说明**：

在实际落地 建立企业级前端安全运营指标体系 时，建议结合 安全运营、指标、SOC 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 漏洞指标（30%）：数量、等级、修复时长
- 配置指标（30%）：安全头与 HTTPS 覆盖
- 运营流程（40%）：SDL、培训、响应

**常见错误**：
- 只统计漏洞数量，忽略修复时长
- 指标无法关联业务风险
- 缺少持续监控导致指标流于形式

**口头回答版**：
> 前端安全运营指标应覆盖漏洞、配置、依赖、事件和流程，通过看板持续度量与改进。

### FB-05-SE-R-006：如何在团队内建立前端安全红蓝演练机制？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：05 Web 安全
**标签**：红蓝演练、安全测试、SDL、团队
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明演练目标、组织方式和成果闭环。

**参考答案**：

目标：模拟真实攻击发现前端漏洞，验证防御和响应流程。组织：蓝队负责防御（代码、配置、监控），红队负责攻击（XSS、CSRF、供应链、社工）。周期：每季度一次，覆盖核心链路。

成果：漏洞清单、修复方案、知识沉淀、安全用例补充到 CI。


**补充说明**：

在实际落地 在团队内建立前端安全红蓝演练机制 时，建议结合 红蓝演练、安全测试、SDL 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 目标（30%）：发现漏洞与验证响应
- 组织（30%）：红蓝角色与范围
- 闭环（40%）：修复、沉淀、CI 集成

**常见错误**：
- 演练变成单兵作战，缺少跨团队协作
- 只找漏洞不修复
- 未将发现的问题转化为自动化检测规则

**口头回答版**：
> 前端安全红蓝演练通过模拟攻击验证防御能力，成果需修复、沉淀并转化为自动化检测。

### FB-05-SE-R-007：零信任视角下如何实现前端持续认证与设备绑定？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：05 Web 安全
**标签**：零信任、持续认证、设备绑定、安全架构
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个不信任任何位置、持续验证的前端认证方案。

**参考答案**：

原则：永不信任，始终验证。实现：短有效期 access token + 刷新令牌轮换；设备指纹绑定；行为生物特征（鼠标、键盘）风险评分；敏感操作二次认证（MFA）；上下文变化（IP、设备、位置）触发重新认证；会话异常自动吊销。

前端负责安全采集设备上下文、安全存储 token、配合 MFA 流程。


**补充说明**：

在实际落地 零信任视角下如何实现前端持续认证与设备绑定 时，建议结合 零信任、持续认证、设备绑定 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 短周期凭证（30%）：token 有效期与轮换
- 设备指纹（30%）：绑定与识别异常
- 持续评估（40%）：行为风险与 MFA

**常见错误**：
- 长有效期 token 即零信任
- 设备指纹容易被伪造但未做服务端校验
- 频繁重新认证严重影响用户体验

**口头回答版**：
> 零信任前端认证需要短有效期 token、设备绑定、行为风险评分和 MFA，持续验证用户与设备上下文。
---

## 结语

Web 安全是前端工程师的重要基本功。通过本面试题的练习，建议读者不仅记住概念，更要理解攻击原理、防御机制和实际落地方法。在面试中，能够结合项目经验给出具体案例，往往比背诵定义更有说服力。

---

> **领域编号**：F05 Web 安全  
> **最后更新**：2026-06-24

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> WebAuthn 是 W3C/FIDO 制定的基于公钥密码学的认证标准。 Passkeys 是其用户友好实现。 流程： 1. 注册时，浏览器生成公私钥对，私钥保存在设备，公钥发送服务器。 2. 认证时，服务器发送 challenge，设备用私钥签名，服务器用公钥验证。





















