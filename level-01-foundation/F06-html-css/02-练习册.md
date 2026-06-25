# HTML/CSS 工程化练习册

> 通过练习巩固 HTML 语义化、CSS 架构、响应式布局与性能优化的核心概念。

---

## 难度分级

- 🟢 基础：理解概念，能写出基础代码。
- 🟡 进阶：能应用知识解决实际问题。
- 🔴 深入：能分析源码或设计复杂方案。

---

## 一、选择题

### 第 1 题（🟢）

以下哪个 HTML 标签最适合表示页面的主要导航链接组？

A. `<header>`  
B. `<nav>`  
C. `<section>`  
D. `<aside>`

### 第 2 题（🟢）

BEM 命名中 `.button--primary` 表示什么？

A. button 块的 primary 元素  
B. button 块的 primary 修饰符  
C. primary 块下的 button 元素  
D. 以上都不对

### 第 3 题（🟡）

CSS 中 `@layer` 的作用是什么？

A. 定义动画关键帧  
B. 创建级联层，管理选择器优先级  
C. 声明自定义属性  
D. 实现容器查询

### 第 4 题（🟡）

以下哪种方式最有利于减少首屏渲染阻塞？

A. 将所有 CSS 放在外部文件底部加载  
B. 关键 CSS 内联，非关键 CSS 异步加载  
C. 使用 `@import` 引入所有样式  
D. 将 CSS 全部转为内联样式

### 第 5 题（🟡）

容器查询（Container Query）与媒体查询（Media Query）的主要区别是？

A. 容器查询基于视口宽度  
B. 容器查询基于组件所在容器的大小  
C. 容器查询只能用于 Grid 布局  
D. 容器查询性能更好

### 第 6 题（🔴）

以下哪个属性修改后**不会**触发重排（Reflow）？

A. `width`  
B. `transform`  
C. `top`  
D. `margin`

---

## 二、代码分析题

### 第 7 题（🟡）

分析以下代码存在的问题：

```html
<div class="header">
  <div class="logo">Logo</div>
  <div class="nav">
    <div class="nav-item"><a href="/">首页</a></div>
    <div class="nav-item"><a href="/about">关于</a></div>
  </div>
  <div class="button" onclick="search()">搜索</div>
</div>
```

### 第 8 题（🟡）

以下 CSS 有什么问题？如何改进？

```css
#header .nav ul li a span {
  color: red !important;
}
```

### 第 9 题（🟡）

请解释以下代码的响应式策略：

```css
.container {
  width: min(100% - 2rem, 75rem);
  margin-inline: auto;
}
```

### 第 10 题（🔴）

分析以下动画代码的性能影响：

```css
.box {
  animation: slide 1s ease;
}

@keyframes slide {
  from { margin-left: 0; }
  to { margin-left: 300px; }
}
```

---

## 三、设计/开放题

### 第 11 题（🟡）

设计一个按钮组件的 CSS 架构，要求：
- 支持 primary、secondary、danger 三种类型
- 支持 small、medium、large 三种尺寸
- 支持禁用状态
- 使用 CSS 变量便于主题切换

### 第 12 题（🔴）

你负责一个大型中后台系统的样式重构，当前存在以下问题：
- 全局样式文件超过 1 万行
- 大量 `!important`
- 颜色硬编码，主题切换困难
- 响应式逻辑分散

请给出分阶段重构方案。

### 第 13 题（🔴）

设计一个卡片组件，要求：
- 在窄容器下垂直堆叠（图片在上，文字在下）
- 在宽容器下水平排列（图片在左，文字在右）
- 使用容器查询实现
- 考虑 RTL 语言适配

---

## 参考答案

### 第 1 题

::: details 查看答案与解析
**答案：B**

`<nav>` 用于表示页面中的导航链接组。虽然可以在 `<header>` 内使用 `<nav>`，但 `<nav>` 本身才是语义上最合适的标签。
:::

### 第 2 题

::: details 查看答案与解析
**答案：B**

`--` 在 BEM 中表示 Modifier（修饰符），用于描述块或元素的不同状态/变体。
:::

### 第 3 题

::: details 查看答案与解析
**答案：B**

`@layer` 用于创建级联层，可以显式控制不同层级样式的优先级，解决优先级战争问题。
:::

### 第 4 题

::: details 查看答案与解析
**答案：B**

关键 CSS 内联能保证首屏快速渲染；非关键 CSS 异步加载可避免阻塞首次内容绘制。
:::

### 第 5 题

::: details 查看答案与解析
**答案：B**

容器查询基于元素所在容器的大小，而不是整个视口，因此更适合组件级响应式。
:::

### 第 6 题

::: details 查看答案与解析
**答案：B**

`transform` 和 `opacity` 通常可以提升到合成层，不触发重排。`width`、`top`、`margin` 都会触发布局计算。
:::

### 第 7 题

**问题分析**：
1. 使用了大量 `<div>` 模拟语义标签，如 header 应该用 `<header>`，导航应该用 `<nav>`，按钮应该用 `<button>`。
2. 搜索按钮用 `<div>` 模拟，缺少键盘可访问性和默认按钮行为。
3. 缺少 ARIA 标签，屏幕阅读器难以理解结构。

**改进建议**：

```html
<header>
  <a class="logo" href="/">Logo</a>
  <nav aria-label="主导航">
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="/about">关于</a></li>
    </ul>
  </nav>
  <button type="button" aria-label="搜索" onclick="search()">搜索</button>
</header>
```

### 第 8 题

**问题分析**：
1. 选择器过长、过度具体，难以覆盖和维护。
2. 使用 `!important` 破坏优先级规则。
3. 使用 ID 选择器 `#header` 降低可复用性。

**改进建议**：

```css
.nav-link-text {
  color: var(--color-text-link);
}

/* 需要特殊状态时 */
.nav-link-text--highlight {
  color: var(--color-text-danger);
}
```

### 第 9 题

::: details 查看答案与解析
**解析**：
- `min(100% - 2rem, 75rem)` 表示容器宽度取"视口宽度减 2rem"和"75rem"中的较小值。
- 这意味着在小屏时宽度自适应并保留边距，在大屏时最大宽度限制为 75rem。
- `margin-inline: auto` 使用逻辑属性实现水平居中，同时支持 RTL 布局。
:::

### 第 10 题

**性能分析**：
- `margin-left` 动画会触发每一帧的重排，因为浏览器需要重新计算布局。
- 这会导致动画卡顿，尤其在复杂页面中。

**优化方案**：

```css
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(300px); }
}
```

`transform` 动画可以运行在合成层，不会触发重排，性能更好。

### 第 11 题

**参考设计**：

```css
:root {
  --btn-primary-bg: #3b82f6;
  --btn-secondary-bg: transparent;
  --btn-danger-bg: #ef4444;
  --btn-disabled-bg: #9ca3af;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-weight: 500;
  cursor: pointer;
}

.btn--primary { background: var(--btn-primary-bg); color: white; }
.btn--secondary { background: var(--btn-secondary-bg); border-color: currentColor; }
.btn--danger { background: var(--btn-danger-bg); color: white; }

.btn--small { padding: 0.25rem 0.5rem; font-size: 0.875rem; }
.btn--medium { padding: 0.5rem 1rem; }
.btn--large { padding: 0.75rem 1.5rem; font-size: 1.125rem; }

.btn:disabled,
.btn[aria-disabled="true"] {
  background: var(--btn-disabled-bg);
  cursor: not-allowed;
}
```

### 第 12 题

**分阶段重构方案**：

**第一阶段：止血与规范**
- 禁止使用新的 `!important`。
- 建立 CSS 变量体系，提取颜色、间距等 Token。
- 引入 Stylelint 进行静态检查。

**第二阶段：分层与拆分**
- 按 ITCSS 将样式分层：Settings、Tools、Generic、Base、Objects、Components、Trumps。
- 将大文件拆分为组件级样式文件。

**第三阶段：组件化**
- 为高频组件（按钮、表单、表格）建立独立组件样式。
- 使用 BEM 或 CSS Modules 避免命名冲突。

**第四阶段：响应式统一**
- 将媒体查询收敛到组件内部或使用容器查询。
- 建立断点 Token。

**第五阶段：主题化**
- 全量替换硬编码颜色为 CSS 变量。
- 支持深色模式或多品牌主题。

### 第 13 题

::: details 查看答案与解析
**参考实现**：

```html
<div class="card-wrapper">
  <article class="card">
    <img class="card__media" src="..." alt="..." />
    <div class="card__content">
      <h2 class="card__title">标题</h2>
      <p class="card__desc">描述</p>
    </div>
  </article>
</div>
```

```css
.card-wrapper {
  container-type: inline-size;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card__media {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }

  .card__media {
    width: 40%;
    aspect-ratio: 1 / 1;
  }
}
```

**RTL 适配**：
- 使用逻辑属性 `margin-inline-start` 替代 `margin-left`。
- 使用 `flex-direction: row` 时，在 RTL 下内容会自动反向，无需额外处理。
:::

---

**标签**：`#html` `#css` `#响应式设计` `#css架构` `#性能优化`

> **最后更新**：2026-06-25
