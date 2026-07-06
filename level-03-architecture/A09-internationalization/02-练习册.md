# 国际化与本地化架构练习册

> 通过练习掌握 i18n/l10n、RTL、格式化、翻译工作流与合规。

---

## 难度分级

- 🟢 基础：理解概念，能使用 i18n 库。
- 🟡 进阶：能处理 RTL 和复杂格式化。
- 🔴 深入：能设计国际化架构和工作流。

---

## 一、选择题

### 第 1 题（🟢）

i18n 和 l10n 分别代表什么？

A. 国际化和本地化
B. 本地化和国际化
C. 导入和导出
D. 输入和输出

### 第 2 题（🟢）

以下哪个 CSS 属性更适合 RTL 布局？

A. `margin-left`
B. `margin-inline-start`
C. `margin-right`
D. `padding-left`

### 第 3 题（🟡）

ICU MessageFormat 主要用于解决什么问题？

A. 样式适配
B. 复数和插值等复杂翻译
C. 图片国际化
D. 网络请求

### 第 4 题（🟡）

以下哪个 API 用于格式化货币？

A. `Intl.DateTimeFormat`
B. `Intl.NumberFormat`
C. `Intl.Collator`
D. `Intl.ListFormat`

### 第 5 题（🔴）

GDPR 对前端应用的主要影响是？

A. 必须使用 React
B. 数据处理和用户同意
C. 必须使用 HTTPS
D. 必须使用 SSR

---

## 新增题（第 6-15 题）

### 第 6 题（🟡）

ICU MessageFormat 中 `select` 和 `plural` 有什么区别？

A. 没有区别，可互换使用
B. select 用于字符串匹配，plural 用于数字匹配
C. select 用于数字匹配，plural 用于字符串匹配
D. select 处理复数，plural 处理选择

### 第 7 题（🟡）

RTL 布局中，以下哪个 CSS 属性用于逻辑性的 `text-align: left`？

A. `text-align: logical-left`
B. `text-align: start`
C. `text-align: inline-start`
D. `text-align: rtl-left`

### 第 8 题（🟢）

locale 检测优先级中，以下哪个优先级最高？

A. 浏览器 Accept-Language
B. IP 地理位置
C. 用户显式设置的语言偏好
D. Cookie 中的语言记录

### 第 9 题（🟡）

在 SSR 中处理 i18n 时，以下哪个做法是错误的？

A. 根据请求 Accept-Language 确定 locale
B. 使用 `window.navigator.language` 在服务端检测
C. 将翻译文件缓存到服务端内存
D. 为 HTML 设置正确的 lang 和 dir 属性

### 第 10 题（🟡）

CLDR 复数规则中，俄语（Russian）包含哪些复数类别？

A. one, other
B. one, few, many, other
C. zero, one, two, few, many, other
D. one, two, other

---

## 三、代码分析题

### 第 11 题（🟡）

分析以下 ICU MessageFormat 的复数问题：

```
{count, plural,
  =0 {无结果}
  one {# 个结果}
  other {# 个结果}
}
```

这段表达式在中文环境下可能有什么问题？应该如何改进？

### 第 12 题（🟡）

阅读以下代码，指出其中的 i18n 问题：

```js
const price = 19.99;
const message = 'Price: $' + price;
document.getElementById('price').innerText = message;
```

### 第 13 题（🟡）

以下代码在 RTL 下有什么问题？如何修复？

```css
.card {
  margin-left: 1rem;
  text-align: left;
  border-left: 1px solid #ccc;
}
```

---

## 四、设计/开放题

### 第 14 题（🟡）

设计一个 locale 自动检测和切换方案，要求：
1. 首次访问根据浏览器语言自动检测
2. 用户可手动切换并记住偏好
3. SEO 友好，URL 包含区域信息
4. 支持 RTL 语言自动切换

### 第 15 题（🔴）

为一个国际化 SaaS 平台设计语言包的动态加载方案：
1. 支持 30+ 种语言
2. 首屏只加载当前语言
3. 用户切换语言时异步加载新语言包
4. 考虑缓存策略和错误处理
5. 翻译缺失时优雅降级

---

## 参考答案

### 第 1 题

```details
**答案：A**

i18n = Internationalization（国际化），l10n = Localization（本地化）。
```

### 第 2 题

```details
**答案：B**

`margin-inline-start` 是逻辑属性，会根据文本方向自动适配 LTR/RTL。
```

### 第 3 题

```details
**答案：B**

ICU MessageFormat 用于处理插值、复数、选择等复杂翻译场景。
```

### 第 4 题

```details
**答案：B**

`Intl.NumberFormat` 配合 `style: 'currency'` 可格式化货币。
```

### 第 5 题

```details
**答案：B**

GDPR 主要影响个人数据的处理、用户同意、知情权、删除权等。
```

### 第 6 题

```details
**答案：B**

`select` 根据字符串值匹配（如 gender: male/female/other），`plural` 根据数字匹配复数规则（如 =0/one/other）。

```
{gender, select,
  male {他}
  female {她}
  other {他们}
}

{count, plural,
  =0 {无}
  one {1 个}
  other {# 个}
}
```
```

### 第 7 题

```details
**答案：B**

`text-align: start` 会根据文本方向自动对齐：LTR 下左对齐，RTL 下右对齐。
```

### 第 8 题

```details
**答案：C**

用户显式设置的语言偏好优先级最高，其次是 URL/Cookie，再是 Accept-Language，最后是 IP 地理位置。
```

### 第 9 题

```details
**答案：B**

`window.navigator.language` 是浏览器 API，在 SSR 服务端环境中不可用。服务端应根据请求头或 Cookie 确定 locale。
```

### 第 10 题

```details
**答案：B**

俄语包含 `one`（1）、`few`（2-4）、`many`（5-20）、`other` 四个复数类别。

```
{count, plural,
  one {# файл}
  few {# файла}
  many {# файлов}
  other {# файла}
}
```
```

### 第 11 题

```details
**问题分析**：
中文的复数规则只有 `other`（与英文不同），因此 `one` 规则在中文中永远不会匹配。

**改进方案**：
```
{count, plural,
  =0 {无结果}
  other {# 个结果}
}
```

更通用的写法（跨语言兼容）：
```
{count, plural,
  =0 {无结果}
  one {# 个结果}
  other {# 个结果}
}
```
对于中文，ICUMessageFormat 会忽略 one 规则直接匹配 other。
```

### 第 12 题

```details
**问题分析**：
1. 硬编码货币符号 `$`，无法适应不同货币。
2. 字符串拼接导致语序问题（不同语言数字位置不同）。
3. 没有使用 Intl.NumberFormat 格式化数字（千位分隔符、小数位）。

**改进方案**：
```js
const price = 19.99;
const formattedPrice = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'USD'
}).format(price);
// $19.99
// 或通过 i18n 框架：{t('price', { price })}
```
```

### 第 13 题

```details
**问题分析**：
`margin-left`、`text-align: left`、`border-left` 都是物理属性，在 RTL 下会导致布局错误。

**改进方案**：
```css
.card {
  margin-inline-start: 1rem;
  text-align: start;
  border-inline-start: 1px solid #ccc;
}
```
```

### 第 14 题

```details
**参考方案**：

```js
// 1. 检测优先级
function detectLocale() {
  // 1) URL 路径
  const urlLocale = window.location.pathname.split('/')[1];
  if (supportedLocales.includes(urlLocale)) return urlLocale;

  // 2) Cookie/localStorage
  const saved = localStorage.getItem('locale');
  if (saved) return saved;

  // 3) 浏览器语言
  const browserLang = navigator.language.slice(0, 2);
  if (supportedLocales.includes(browserLang)) return browserLang;

  // 4) 默认
  return 'en';
}

// 2. 切换语言
function switchLocale(locale) {
  localStorage.setItem('locale', locale);
  document.documentElement.lang = locale;
  document.documentElement.dir = isRTL(locale) ? 'rtl' : 'ltr';
  window.location.href = `/${locale}${window.location.pathname.slice(3)}`;
}

// 3. RTL 检测
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];
function isRTL(locale) {
  return RTL_LANGUAGES.includes(locale);
}
```
```

### 第 15 题

```details
**参考方案**：

```js
// 动态加载语言包
const localeCache = new Map();

async function loadMessages(locale) {
  if (localeCache.has(locale)) {
    return localeCache.get(locale);
  }

  try {
    const messages = await import(`./locales/${locale}.json`);
    localeCache.set(locale, messages);
    return messages;
  } catch (e) {
    console.warn(`Failed to load ${locale}, falling back to en`);
    return await import(`./locales/en.json`);
  }
}

// 预加载常见语言
const preloadLocales = ['zh-CN', 'ja-JP', 'ar-SA'];
preloadLocales.forEach(locale => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'fetch';
  link.href = `/locales/${locale}.json`;
  document.head.appendChild(link);
});

// 翻译缺失时显示 key 并记录
const MISSING_TRANSLATIONS = new Set();
function t(key, params) {
  const msg = messages[key];
  if (!msg) {
    MISSING_TRANSLATIONS.add(key);
    return key; // 显示 key 作为兜底
  }
  return interpolate(msg, params);
}
```
```

---

**标签**：`#i18n` `#l10n` `#rtl` `#internationalization` `#localization`

> **最后更新**：2026-07-06
