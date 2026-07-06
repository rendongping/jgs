# 国际化与本地化架构：让产品服务全球市场

> 目标：掌握多语言、RTL、时区、货币、内容管理与本地化工作流的架构设计方法。

---

## 核心要点（TL;DR）

- 国际化（i18n）是让产品支持多种语言和地区的过程；本地化（l10n）是针对特定地区的适配。
- 好的 i18n 架构从设计阶段开始，而不是项目后期硬编码替换。
- 文本、日期、数字、货币、度量单位都需要根据 locale 动态格式化。
- RTL（从右到左）语言需要布局、图标、动画的镜像适配。
- 内容管理应分离代码与翻译，支持翻译平台协作和版本控制。
- 合规要求（GDPR、数据本地化）会影响多地区部署架构。

---

## 学习时长与前置知识

- **建议学习时长**：2-3 周（每周投入 5-7 小时）
- **前置知识**：HTML/CSS 工程化（F06）、React/Vue 组件设计（E06/E07）、系统架构（A01）

---

## 一、i18n 与 l10n 的区别

| 概念 | 含义 | 示例 |
|------|------|------|
| i18n（Internationalization） | 国际化，使产品具备支持多语言的能力 | 文本外置、locale 切换 |
| l10n（Localization） | 本地化，针对特定地区适配 | 中文翻译、阿拉伯语 RTL、日元货币 |
| g11n（Globalization） | 全球化，涵盖 i18n + l10n + 合规 | 全球市场发布 |

---

## 二、前端 i18n 架构核心要素

### 2.1 文本翻译

```js
// i18n key 设计
{
  "welcome": "欢迎",
  "items_count": "你有 {count} 条消息",
  "items_count_plural": "你有 {count} 条消息"
}
```

**最佳实践**：
- 使用 key 而非硬编码文本。
- 支持插值和复数。
- 翻译字符串完整，避免拼接。

### 2.2 ICU MessageFormat

```js
"items_count": "你有 {count, plural, =0 {没有消息} one {1 条消息} other {# 条消息&#125;&#125;"
```

支持复数、选择、日期、数字格式化。

### 2.3 常用库

| 库 | 特点 |
|----|------|
| react-i18next | React 生态，功能丰富 |
| vue-i18n | Vue 生态 |
| FormatJS / react-intl | 基于 ICU，格式化能力强 |
| LinguiJS | 编译时提取，体积小 |

### 2.4 组件设计

```jsx
// 硬编码
<h1>欢迎</h1>

// 使用翻译
<h1>{t('welcome')}</h1>
```

---

## 三、RTL（从右到左）适配

### 3.1 哪些语言使用 RTL？

阿拉伯语、希伯来语、波斯语、乌尔都语等。

### 3.2 CSS 逻辑属性

```css
/* 物理属性 */
margin-left: 1rem;

/* 逻辑属性 */
margin-inline-start: 1rem;
```

逻辑属性会根据文本方向自动适配。

### 3.3 布局镜像

```css
[dir="rtl"] .nav {
  flex-direction: row-reverse;
}
```

### 3.4 图标与动画

- 表示方向的图标需要镜像（如箭头、返回按钮）。
- 动画方向也应适配 RTL。
- 但某些图标不应镜像（如 logo、相机图标）。

---

## 四、日期、数字与货币

### 4.1 Intl API

```js
// 日期
new Intl.DateTimeFormat('zh-CN').format(new Date());

// 数字
new Intl.NumberFormat('en-US').format(1234567.89);

// 货币
new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(100);
```

### 4.2 时区处理

- 后端存储 UTC 时间。
- 前端根据用户时区显示。
- 避免依赖客户端本地时区处理业务逻辑。

---

## 五、内容管理与翻译工作流

### 5.1 翻译文件组织

```
locales/
  en/
    common.json
    home.json
  zh/
    common.json
    home.json
  ar/
    common.json
    home.json
```

### 5.2 翻译平台集成

常见平台：
- Crowdin
- Lokalise
- Phrase
- Transifex

工作流：

```
开发者提取 key -> 上传翻译平台 -> 翻译人员翻译 -> 下载翻译 -> 构建发布
```

### 5.3 代码与翻译分离

- 翻译文件不应由开发者手写维护所有语言。
- 使用 CI 自动同步翻译平台。
- 缺失翻译时有兜底机制（回退到默认语言）。

---

## 六、本地化合规与部署

### 6.1 数据本地化

某些国家要求数据必须存储在境内：
- 中国：个人信息和重要数据本地化。
- 欧盟：GDPR 对数据跨境传输有严格要求。

### 6.2 多地区部署

| 策略 | 说明 |
|------|------|
| 单应用多语言 | 一个应用根据路由或域名切换语言 |
| 多站点 | 不同地区独立部署 |
| 边缘部署 | 通过 CDN/Edge Function 就近服务 |

### 6.3 法律与合规

- Cookie 同意弹窗（GDPR）。
- 隐私政策本地化。
- 年龄验证、内容过滤。

---

## 七、常见误区与反模式

| 误区 | 说明 | 正确做法 |
|------|------|---------|
| "i18n 就是文本替换" | 还涉及日期、数字、RTL、文化差异 | 从设计阶段考虑完整 i18n |
| "用字符串拼接翻译" | 不同语言语序不同 | 使用 ICU MessageFormat |
| "RTL 只是文字反向" | 布局、图标、动画都需要适配 | 使用逻辑属性和方向感知组件 |
| "翻译文件和代码放一起" | 不利于协作 | 使用翻译平台，CI 同步 |


### 2.5 i18n 框架对比

| 特性 | react-i18next | react-intl (FormatJS) | LinguiJS | vue-i18n |
|------|--------------|----------------------|---------|---------|
| 底层标准 | 自建语法 | ICU MessageFormat | ICU MessageFormat | 自建语法 |
| ICU 完整支持 | 需插件 | 原生 | 原生 | 需插件 |
| 编译时提取 | 需 babel-plugin | 需 @formatjs/cli | 内置 babel/macro | 需 unplugin-vue-i18n |
| 运行时体积 | ~8KB gzip | ~12KB gzip | ~5KB gzip | ~7KB gzip |
| TypeScript | 优秀 | 良好 | 优秀 | 良好 |
| SSR 支持 | 完整 | 完整 | 完整 | 完整（Nuxt） |
| 代码分割 | 支持 | 支持 | 支持 | 支持 |
| RTL 辅助 | 无 | 无 | 无 | 无 |
| 社区生态 | 最大 | 中等 | 较小 | Vue 生态 |
| React Native | 完整 | 支持 | 实验性 | 不支持 |

**选型建议**：
- React 项目首选 react-i18next，生态完善且上手简单。
- 需要严格 ICU 标准选择 react-intl。
- 追求最小体积选择 LinguiJS。
- Vue 项目使用 vue-i18n。

### 2.6 ICU MessageFormat 深入

#### 基础语法

```
{参数名, 格式类型, 格式参数}
```

#### plural（复数）

```js
{
  "cart_items": "您购物车中有 {count, plural, =0 {0 件商品} one {# 件商品} other {# 件商品&#125;&#125;",
  "new_messages": "你有 {count, plural, offset:1 =0 {没有新消息} =1 {1 条新消息} one {# 条新消息} other {# 条新消息&#125;&#125;"
}

// 渲染结果
new Intl.MessageFormat("你有 {count, plural, =0 {没有消息} one {# 条消息} other {# 条消息&#125;&#125;", "zh").format({count: 0});
// "你有 0 条消息" -- 注意中文没有 one/other 区分，但 ICU 通过 =0 精确匹配
```

#### select（选择）

```js
{
  "pronoun_display": "用户选择了 {pronoun, select, he {他} she {她} they {他们} other {未知&#125;&#125;"
}

// 应用场景：根据枚举值选择不同文案
function getGenderLabel(gender) {
  return t("gender_label", { gender: gender || "other" });
}
```

#### selectordinal（序数）

```js
{
  "rank": "您排名第 {position, selectordinal, one {#st} two {#nd} few {#rd} other {#th&#125;&#125;"
}

// 英文渲染结果
// 1 -> "1st",  2 -> "2nd",  3 -> "3rd",  4 -> "4th"
// 注意中文没有序数形态，通常直接显示数字
```

#### 嵌套与组合

```js
{
  "notification": "{gender, select, male &#123;&#123;count, plural, =0 {他没有消息} one {他有 # 条消息} other {他有 # 条消息&#125;&#125;} female &#123;&#123;count, plural, =0 {她没有消息} one {她有 # 条消息} other {她有 # 条消息&#125;&#125;} other &#123;&#123;count, plural, =0 {他们没有消息} one {他们有 # 条消息} other {他们有 # 条消息&#125;&#125;&#125;&#125;"
}
```

#### 日期与数字格式化

```js
{
  "published": "发布于 {date, date, long}",
  "price": "价格: {value, number, ::currency/USD}"
}

// 等价于 Intl.DateTimeFormat / Intl.NumberFormat
// date, time, number, 都可在 ICU MessageFormat 字符串内使用
```

### 2.7 RTL 深入

#### dir="auto" 智能方向

```html
<!-- 浏览器根据首字符自动判断文本方向 -->
<p dir="auto">Hello World</p>
<p dir="auto">مرحبا بالعالم</p>

<!-- 混排场景：英文术语嵌入阿拉伯文 -->
<p dir="auto">يرجى قراءة README.md 文件</p>
```

```js
// 判断字符串方向
function detectDirection(text) {
  const arabicRange = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
  return arabicRange.test(text) ? "rtl" : "ltr";
}

// 整页方向切换
document.documentElement.dir = userLocale === "ar" ? "rtl" : "ltr";
document.documentElement.lang = userLocale;
```

#### CSS 逻辑属性对照表

| 物理属性 | 逻辑属性（horizontal-tb） |
|---------|------------------------|
| width | inline-size |
| height | block-size |
| margin-left | margin-inline-start |
| margin-right | margin-inline-end |
| padding-left | padding-inline-start |
| padding-right | padding-inline-end |
| border-left | border-inline-start |
| border-right | border-inline-end |
| text-align: left | text-align: start |
| text-align: right | text-align: end |
| left | inset-inline-start |
| right | inset-inline-end |

#### RTL 网格与弹性布局

```css
/* 使用逻辑属性实现自动适配 */
.card {
  margin-inline: auto;
  padding-inline: 1rem;
  border-inline-start: 3px solid var(--accent);
}

/* flex/grid 在 dir=rtl 下自动反转主轴 */
.flex-row {
  display: flex;
  gap: 1rem;
}

/* 方向感知的网格 */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* 显式处理 RTL 下的特殊布局 */
[dir="rtl"] .timeline {
  /* 时间线在 RTL 下箭头方向反转 */
  transform: scaleX(-1);
}

[dir="rtl"] .timeline-content {
  transform: scaleX(-1); /* 内容再翻转回来 */
}
```

#### RTL 测试 checklist

- [ ] 所有页面设置正确 dir 属性
- [ ] 滚动条在 RTL 下出现在左侧
- [ ] 文字对齐正确（start/end 而非 left/right）
- [ ] 输入框光标在 RTL 下从右开始
- [ ] 数字和英文嵌入 RTL 文本时方向正确
- [ ] 箭头图标镜像
- [ ] 视频播放器控制条反转
- [ ] 表单校验提示位置正确
- [ ] 弹窗关闭按钮在左上角（RTL 习惯）
- [ ] 分页器页码方向反转

### 2.8 RTL 感知的组件封装

```jsx
// RTL 感知的图标组件
function DirectionalIcon({ name, direction }) {
  const shouldMirror = ["arrow-left", "arrow-right", "chevron-left", "chevron-right", "back"].includes(name);
  
  return (
    <span
      className={`icon-${name}`}
      style=&#123;&#123;
        transform: shouldMirror && direction === "rtl" ? "scaleX(-1)" : "none",
        display: "inline-block",
      &#125;&#125;
    />
  );
}

// RTL 感知的布局组件
function RTLProvider({ locale, children }) {
  const direction = getDirection(locale);
  
  return (
    <div dir={direction} className={`layout-${direction}`}>
      {children}
    </div>
  );
}
```



### 2.9 动态加载与代码分割

#### 语言包懒加载

```js
// 按需加载翻译资源
async function loadLocale(locale) {
  const messages = await import(`./locales/${locale}.json`);
  i18n.addResourceBundle(locale, "translation", messages);
  i18n.changeLanguage(locale);
}

// React 结合 Suspense
function LanguageLoader({ locale, children }) {
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    loadLocale(locale).then(() => setReady(true));
  }, [locale]);
  
  if (!ready) return <LoadingSpinner />;
  return children;
}
```

#### 按路由分割

```js
// 每个路由只加载所需翻译
const userRoutes = {
  "en": () => import("./locales/en/user.json"),
  "zh": () => import("./locales/zh/user.json"),
};

async function loadRouteTranslations(locale, route) {
  const module = await userRoutes[locale]();
  i18n.addResourceBundle(locale, route, module);
}
```

#### Webpack 分包策略

```js
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.ContextReplacementPlugin(
      /locales/,
      /^\.\.\/.*\.json$/
    ),
  ],
};

// 使用 magic comment 指定 chunk name
const messages = await import(/* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`);
```

### 2.10 Locale 检测策略

#### Accept-Language 检测

```js
// 服务端检测
function detectLocaleFromHeader(acceptLanguage) {
  // acceptLanguage: "zh-CN,zh;q=0.9,en;q=0.8"
  const locales = acceptLanguage
    .split(",")
    .map(l => {
      const [locale, q = "q=1"] = l.split(";");
      return { locale: locale.trim(), quality: parseFloat(q.split("=")[1]) };
    })
    .sort((a, b) => b.quality - a.quality);
  
  return locales[0]?.locale || "en";
}

// 客户端检测
const browserLocale = navigator.language || navigator.userLanguage;
// "zh-CN" -> 匹配最佳支持语言
const supportedLocale = matchSupportedLocale(browserLocale, ["en", "zh", "ar", "ja"]);
```

#### URL 路由策略

```js
// 子路径策略：example.com/zh/product
// 子域名策略：zh.example.com/product
// 顶级域名：example.cn/product

// Next.js 中间件示例
function middleware(request) {
  const { pathname } = request.nextUrl;
  const detectedLocale = request.cookies.get("locale")?.value 
    || request.headers.get("accept-language")?.split(",")[0]?.split("-")[0]
    || "en";
  
  if (!supportedLocales.includes(pathname.split("/")[1])) {
    return NextResponse.redirect(new URL(`/${detectedLocale}${pathname}`, request.url));
  }
}
```

#### Cookie / LocalStorage 策略

```js
// 用户手动选择后持久化
function setUserLocale(locale) {
  document.cookie = `locale=${locale}; path=/; max-age=31536000`; // 1年
  localStorage.setItem("locale", locale);
  window.location.reload();
}

// 优先级: 用户选择 > URL 参数 > Cookie > 浏览器语言 > 默认
function getEffectiveLocale() {
  const fromUrl = getLocaleFromURL();
  if (fromUrl) return fromUrl;
  
  const fromCookie = getCookie("locale");
  if (fromCookie) return fromCookie;
  
  const fromBrowser = navigator.language?.split("-")[0];
  if (supportedLocales.includes(fromBrowser)) return fromBrowser;
  
  return "en";
}
```

### 2.11 Unicode 处理

#### 标准化形式

```js
// Unicode 有四种标准化形式：
// NFC (组合) - 大部分平台默认
// NFD (分解) - macOS 文件系统
// NFKC (兼容组合)
// NFKD (兼容分解)

// 日语示例："ベース" 可以用两种方式表示
const composed = "ベース";  // NFC: ベース
const decomposed = "ベェース"; // 不同表示

// 字符串比较前应标准化
function normalizeForComparison(str) {
  return str.normalize("NFC");  // 统一为 NFC 再比较
}

// 搜索时也应标准化
function searchText(haystack, needle) {
  return haystack.normalize("NFC").includes(needle.normalize("NFC"));
}
```

#### 字素簇（Grapheme Clusters）

```js
// 一个"可见字符"可能由多个 Unicode 码点组成
const emoji = "👍";           // 1 个码点
const skinToneEmoji = "👍🏽"; // 2 个码点（emoji + 肤色修饰符）
const flagEmoji = "🇯🇵";      // 2 个码点（地区指示符对）
const familyEmoji = "👨‍👩‍👧‍👦"; // 7 个码点（ZWJ 序列）

// 问题：String.length 返回码点数量而非可见字符数
console.log(familyEmoji.length); // 11 (UTF-16 码元)

// 使用 Intl.Segmenter 正确分割
const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
const segments = [...segmenter.segment(familyEmoji)];
console.log(segments.length); // 1 (正确)

// 应用场景：输入框字符计数、文本截断
function truncateGrapheme(text, maxLength) {
  const segmenter = new Intl.Segmenter();
  const segments = [...segmenter.segment(text)];
  return segments.slice(0, maxLength).map(s => s.segment).join("");
}
```

### 2.12 i18n 在 SSR/SSG 中的实现

#### Locale 路由策略

```
src/
  pages/
    [locale]/
      index.tsx        # 多语言首页
      about.tsx        # 多语言关于页
  lib/
    i18n/
      config.ts        # 支持语言列表
      server.ts        # 服务端 i18n 实例
      client.ts        # 客户端 i18n 实例
  locales/
    en.json
    zh.json
    ar.json
```

#### Next.js App Router 集成

```tsx
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

#### 静态生成多语言页面

```tsx
// Next.js SSG
export async function generateStaticParams() {
  return ["en", "zh", "ja", "ar"].map((locale) => ({ locale }));
}

// 每个语言独立构建 /en/about, /zh/about, /ar/about
// 优势：部署后无运行时开销
// 劣势：N 种语言就重复构建 N 次
```

#### ISR 增量静态生成

```tsx
// 结合 revalidate 实现翻译更新后自动重建
export const revalidate = 3600; // 每小时重新生成

export default async function Page({ params: { locale } }) {
  const messages = await fetchTranslations(locale);
  return <PageComponent messages={messages} />;
}
```

### 2.13 翻译工作流深入

#### 平台对比

| 特性 | Crowdin | Lokalise | Phrase | Transifex |
|------|---------|----------|--------|-----------|
| 定价模式 | 按字数 | 按座位 | 按项目 | 按字数 |
| 免费额度 | OSS 免费 | 14 天试用 | 14 天试用 | 15 天试用 |
| 机器翻译 | Google/DeepL | Google/DeepL | Google/DeepL | Google/DeepL |
| CLI 工具 | 官方 + API | 官方 + API | 官方 + API | 官方 + API |
| Git 同步 | 双向同步 | 双向同步 | 双向同步 | 双向同步 |
| 屏幕截图 | 支持 | 支持 | 支持 | 支持 |
| 翻译记忆 | 支持 | 支持 | 支持 | 支持 |
| QA 检查 | 内置 | 内置 | 内置 | 内置 |

#### babel-plugin 自动提取

```js
// babel-plugin-i18next-extract
// 配置
{
  "plugins": [
    ["i18next-extract", {
      "locales": ["en", "zh", "ar"],
      "keySeparator": ".",
      "outputPath": "src/locales/&#123;&#123;locale&#125;&#125;/&#123;&#123;ns&#125;&#125;.json",
    }]
  ]
}

// 编译时自动从 t() 调用中提取 key
// 源文件:
const title = t("page.home.title");
const greeting = t("greeting", { name: "Alice" });

// 生成:
// src/locales/en/translation.json
{ "page": { "home": { "title": "" } }, "greeting": "" }
```

#### CI/CD 集成

```yaml
# .github/workflows/i18n.yml
name: i18n Sync

on:
  push:
    branches: [main]
    paths: ["src/locales/en/**"]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Upload source language
        run: |
          crowdin upload sources
      - name: Download translations
        run: |
          crowdin download
      - name: Create PR for translation updates
        run: |
          git checkout -b i18n/update-$(date +%Y%m%d)
          git add src/locales/
          git commit -m "chore(i18n): update translations"
          git push origin HEAD
```

---

## 十一、i18n 在微前端架构中的实践

### 11.1 共享 i18n 实例 vs 独立实例

| 方案 | 优点 | 缺点 |
|------|------|------|
| 共享实例 | 一致性强，翻译复用 | 耦合度高，版本冲突 |
| 独立实例 | 解耦，独立部署 | 重复加载，不一致 |
| 混合模式 | 灵活 | 复杂度高 |

### 11.2 推荐的混合方案

```js
// 主应用提供共享资源
// 每个微应用使用独立命名空间

// 主应用
i18n.addResourceBundle("en", "shell", shellTranslations);

// 微应用 A
i18n.addResourceBundle("en", "appA", appATranslations);

// 使用
t("shell:header.title");  // 主应用翻译
t("appA:dashboard.title"); // 微应用 A 翻译
```



---

## 十二、扩展阅读与资源

### 12.1 标准与规范

- Unicode CLDR (Common Locale Data Repository): 提供 locale 数据（日期格式、货币符号等）
- ICU (International Components for Unicode): 完整的 Unicode 和国际化支持库
- ECMA-402: JavaScript Intl API 标准
- W3C i18n 最佳实践

### 12.2 工具链

| 工具 | 用途 |
|------|------|
| i18next-scanner | 从代码中提取翻译 key |
| babel-plugin-react-intl | react-intl 编译时提取 |
| formatjs/cli | FormatJS 命令行工具 |
| linguijs/cli | LinguiJS 编译工具 |
| i18n-ally (VSCode) | 编辑器内联翻译预览 |
| Poedit | PO 文件编辑器 |

### 12.3 常见问题排查

```js
// 问题1：翻译不生效
// 检查：key 是否正确、命名空间是否加载、语言是否切换

// 问题2：RTL 布局断裂
// 检查：dir 属性、逻辑属性使用、第三方组件兼容性

// 问题3：日期格式不符
// 检查：Intl.DateTimeFormat 的 locale 参数、时区设置

// 问题4：性能问题
// 检查：翻译文件大小、是否按需加载、是否频繁 re-render
```

---

**标签**：`#i18n` `#l10n` `#rtl` `#internationalization` `#localization` `#intl` `#unicode` `#icu`

> **最后更新**：2026-07-06


---

## 本领域学习进度

<MarkComplete domainId="internationalization" />
<ProgressTracker />
