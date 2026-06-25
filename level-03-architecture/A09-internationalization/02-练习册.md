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

## 二、代码分析题

### 第 6 题（🟡）

分析以下代码的 i18n 问题：

```js
const message = '你有 ' + count + ' 条消息';
```

### 第 7 题（🟡）

以下 CSS 在 RTL 下可能会有什么问题？如何改进？

```css
.card {
  margin-left: 1rem;
  text-align: left;
}
```

---

## 三、设计/开放题

### 第 8 题（🟡）

设计一个 React 组件的 i18n 方案，要求支持中文、英文、阿拉伯语。

### 第 9 题（🔴）

设计一个企业级多语言内容管理工作流，包括开发者、翻译人员、产品经理的协作流程。

### 第 10 题（🔴）

为一个全球化 SaaS 设计部署架构，要求：
- 支持多地区低延迟访问
- 符合中国和欧盟的数据本地化要求
- 支持按地区定制功能和内容

---

## 参考答案

### 第 1 题

**答案：A**

i18n = Internationalization（国际化），l10n = Localization（本地化）。

### 第 2 题

**答案：B**

`margin-inline-start` 是逻辑属性，会根据文本方向自动适配 LTR/RTL。

### 第 3 题

**答案：B**

ICU MessageFormat 用于处理插值、复数、选择等复杂翻译场景。

### 第 4 题

**答案：B**

`Intl.NumberFormat` 配合 `style: 'currency'` 可格式化货币。

### 第 5 题

**答案：B**

GDPR 主要影响个人数据的处理、用户同意、知情权、删除权等。

### 第 6 题

**问题分析**：
- 硬编码中文，无法翻译。
- 字符串拼接方式在不同语言语序下可能不适用。
- 不支持复数。

**改进方案**：

```js
const { t } = useTranslation();
const message = t('messages_count', { count });

// messages_count: "你有 {count} 条消息"
```

### 第 7 题

**问题分析**：
- `margin-left` 和 `text-align: left` 在 RTL 下会导致布局反向错误。

**改进方案**：

```css
.card {
  margin-inline-start: 1rem;
  text-align: start;
}
```

### 第 8 题

**参考方案**：

```jsx
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: { welcome: '欢迎' } },
    en: { translation: { welcome: 'Welcome' } },
    ar: { translation: { welcome: 'أهلاً' } }
  },
  lng: 'zh',
  fallbackLng: 'zh'
});

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('zh')}>中文</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('ar')}>العربية</button>
    </div>
  );
}
```

### 第 9 题

**工作流设计**：

```
开发者
  ↓ 提取新 key 到翻译文件
上传翻译平台
  ↓
翻译人员翻译
  ↓
产品经理/语言负责人审核
  ↓
下载翻译到代码库
  ↓
CI 构建多语言包
  ↓
发布
```

**配套规范**：
- key 命名规范。
- 翻译完成度检查。
- 缺失翻译回退机制。
- 翻译更新触发构建。

### 第 10 题

**参考架构**：

1. **多地区部署**：中国、欧盟、其他地区分别部署。
2. **数据本地化**：用户数据按地区存储，不跨境传输。
3. **边缘加速**：全球 CDN 加速静态资源。
4. **路由分发**：根据用户位置路由到最近的数据中心。
5. **功能开关**：按地区启用/禁用功能。
6. **内容管理**：CMS 支持按地区定制内容。
7. **合规审计**：数据处理日志和同意记录。

---

**标签**：`#i18n` `#l10n` `#rtl` `#internationalization` `#localization`

> **最后更新**：2026-06-25
