# Web 无障碍（a11y）练习册

> 通过练习掌握 WCAG 标准、语义化 HTML、ARIA、键盘可访问性与测试方法。

---

## 难度分级

- 🟢 基础：理解概念，能识别问题。
- 🟡 进阶：能应用知识修复问题。
- 🔴 深入：能设计无障碍流程和架构。

---

## 一、选择题

### 第 1 题（🟢）

WCAG 2.1 的四项原则 POUR 中，O 代表什么？

A. Observable  
B. Operable  
C. Optimizable  
D. Organized

### 第 2 题（🟢）

以下哪种标签最适合表示页面的主要内容区域？

A. `<section>`  
B. `<main>`  
C. `<article>`  
D. `<div role="main">`

### 第 3 题（🟡）

以下哪个 ARIA 属性用于表示当前元素是否展开？

A. `aria-hidden`  
B. `aria-expanded`  
C. `aria-selected`  
D. `aria-pressed`

### 第 4 题（🟡）

WCAG AA 级对普通文本与背景的对比度要求是？

A. 3:1  
B. 4.5:1  
C. 7:1  
D. 2:1

### 第 5 题（🟡）

以下哪种做法是表单可访问性的最佳实践？

A. 使用 placeholder 替代 label  
B. 使用 `<label for="id">` 与输入框关联  
C. 将错误提示放在页面顶部，不与输入框关联  
D. 使用 `<div>` 模拟单选按钮

### 第 6 题（🔴）

打开一个模态对话框时，以下哪项不是必须做的？

A. 将焦点移到对话框内第一个可聚焦元素  
B. 关闭页面滚动  
C. 将焦点限制在对话框内  
D. 关闭对话框后将焦点返回到触发按钮

---

## 二、代码分析题

### 第 7 题（🟡）

分析以下代码的可访问性问题：

```html
<div class="card" onclick="openModal()">
  <h3>产品详情</h3>
  <p>点击查看更多信息</p>
</div>
```

### 第 8 题（🟡）

以下表单有什么问题？如何修复？

```html
<form>
  <input type="email" placeholder="请输入邮箱" required />
  <input type="password" placeholder="请输入密码" required />
  <button>登录</button>
</form>
```

### 第 9 题（🟡）

以下错误提示实现是否可访问？为什么？

```html
<input type="text" id="name" />
<span class="error" style="color: red;">名称不能为空</span>
```

### 第 10 题（🔴）

分析以下自定义选项卡的实现，列出所有可访问性问题：

```html
<div class="tabs">
  <div class="tab active" onclick="showTab(0)">Tab 1</div>
  <div class="tab" onclick="showTab(1)">Tab 2</div>
</div>
<div class="panel">内容 1</div>
<div class="panel hidden">内容 2</div>
```

---

## 三、设计/开放题

### 第 11 题（🟡）

设计一个可访问的开关组件（toggle switch），要求：
- 可被键盘操作
- 屏幕阅读器能读取当前状态和标签
- 视觉上有明确的开/关状态
- 不依赖颜色作为唯一状态提示

### 第 12 题（🔴）

你负责为团队建立无障碍开发规范，请设计一份可落地的无障碍检查清单，覆盖设计、开发、测试三个阶段。

### 第 13 题（🔴）

设计一个可访问的下拉菜单（Dropdown Menu）组件，要求：
- 支持键盘导航（Tab、方向键、Enter、Esc）
- 屏幕阅读器能正确播报菜单项和状态
- 焦点管理符合 ARIA 规范

---

## 参考答案

### 第 1 题

**答案：B**

POUR 分别代表 Perceivable（可感知）、Operable（可操作）、Understandable（可理解）、Robust（健壮）。

### 第 2 题

**答案：B**

`<main>` 是 HTML5 原生标签，用于标识页面的主要内容区域。虽然 `<div role="main">` 也能表达相同语义，但原生标签更推荐。

### 第 3 题

**答案：B**

`aria-expanded` 用于表示控件是否展开或折叠，常用于折叠面板、下拉菜单等。

### 第 4 题

**答案：B**

WCAG AA 级要求普通文本与背景对比度至少 4.5:1，大文本至少 3:1。

### 第 5 题

**答案：B**

使用 `<label for="id">` 与输入框显式关联，是表单可访问性的基础要求。

### 第 6 题

**答案：B**

关闭页面滚动是常见的用户体验优化，但不是 WCAG 的硬性要求。焦点管理（A、C、D）则是可访问性的核心要求。

### 第 7 题

**问题分析**：
1. 使用 `<div>` 模拟可点击元素，屏幕阅读器无法识别为按钮。
2. 无法通过键盘聚焦和激活。
3. 缺少键盘事件处理。
4. 没有提供 role 和 tabindex。

**改进方案**：

```html
<button class="card" onclick="openModal()">
  <h3>产品详情</h3>
  <p>点击查看更多信息</p>
</button>
```

或必须使用 div 时：

```html
<div
  class="card"
  role="button"
  tabindex="0"
  aria-label="查看产品详情"
  onclick="openModal()"
  onkeydown="if(event.key === 'Enter' || event.key === ' ') openModal()"
>
  <h3>产品详情</h3>
  <p>点击查看更多信息</p>
</div>
```

### 第 8 题

**问题分析**：
1. 没有 `<label>` 标签，屏幕阅读器无法告知输入框用途。
2. 使用 placeholder 作为标签，输入后提示消失。
3. 错误提示缺失。

**改进方案**：

```html
<form>
  <label for="email">邮箱</label>
  <input id="email" type="email" required aria-describedby="email-error" />
  <div id="email-error" class="error" aria-live="polite"></div>

  <label for="password">密码</label>
  <input id="password" type="password" required aria-describedby="password-error" />
  <div id="password-error" class="error" aria-live="polite"></div>

  <button type="submit">登录</button>
</form>
```

### 第 9 题

**问题分析**：
1. 仅通过红色文字表示错误，色盲用户可能无法识别。
2. 错误提示未与输入框关联，屏幕阅读器无法朗读。
3. 输入框缺少 `aria-invalid` 状态。

**改进方案**：

```html
<input
  type="text"
  id="name"
  aria-invalid="true"
  aria-describedby="name-error"
/>
<div id="name-error" class="error">
  <span aria-hidden="true">⚠</span> 名称不能为空
</div>
```

### 第 10 题

**问题分析**：
1. Tab 使用 `<div>` 而非 `<button>`，不可聚焦。
2. 缺少 `role="tablist"`、`role="tab"`、`role="tabpanel"`。
3. 缺少 `aria-selected`、`aria-controls`。
4. 未处理方向键导航。
5. 隐藏面板应使用 `hidden` 属性或 `display: none`。

**改进方案**：

```html
<div class="tabs" role="tablist" aria-label="示例选项卡">
  <button
    class="tab"
    role="tab"
    id="tab-1"
    aria-selected="true"
    aria-controls="panel-1"
    tabindex="0"
  >
    Tab 1
  </button>
  <button
    class="tab"
    role="tab"
    id="tab-2"
    aria-selected="false"
    aria-controls="panel-2"
    tabindex="-1"
  >
    Tab 2
  </button>
</div>

<div class="panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  内容 1
</div>
<div class="panel hidden" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  内容 2
</div>
```

### 第 11 题

**参考实现**：

```html
<button
  type="button"
  role="switch"
  aria-checked="false"
  aria-label="夜间模式"
  class="switch"
  onclick="toggleSwitch(this)"
>
  <span class="switch__track">
    <span class="switch__thumb" aria-hidden="true"></span>
  </span>
  <span class="switch__label" aria-hidden="true">关</span>
</button>
```

```css
.switch[aria-checked="true"] .switch__thumb {
  transform: translateX(100%);
}

.switch__thumb::before {
  content: "🌙";
}

.switch[aria-checked="true"] .switch__thumb::before {
  content: "☀";
}
```

```js
function toggleSwitch(btn) {
  const checked = btn.getAttribute('aria-checked') === 'true';
  btn.setAttribute('aria-checked', !checked);
  btn.querySelector('.switch__label').textContent = checked ? '关' : '开';
}
```

**关键点**：
- 使用 `role="switch"` 和 `aria-checked`。
- 通过图标和文字共同表示状态，不依赖颜色。
- 按钮本身可被键盘聚焦和激活。

### 第 12 题

**无障碍检查清单**：

**设计阶段**：
- [ ] 颜色对比度是否满足 WCAG AA（4.5:1）？
- [ ] 是否只用颜色传达状态？
- [ ] 字体大小是否可缩放至 200%？
- [ ] 交互元素尺寸是否足够（至少 44×44 CSS px）？
- [ ] 焦点环设计是否清晰可见？

**开发阶段**：
- [ ] 是否使用语义化 HTML 标签？
- [ ] 图片是否有恰当的 alt 文本？
- [ ] 表单是否有 label 关联？
- [ ] 自定义组件是否补充了 ARIA？
- [ ] 所有交互是否可通过键盘完成？
- [ ] 焦点顺序是否合理？

**测试阶段**：
- [ ] 是否通过 axe/Lighthouse 自动化扫描？
- [ ] 是否进行键盘-only 操作测试？
- [ ] 是否使用屏幕阅读器测试？
- [ ] 是否邀请真实用户参与测试？

### 第 13 题

**参考实现要点**：

```html
<button
  type="button"
  aria-haspopup="true"
  aria-expanded="false"
  aria-controls="menu"
  id="menu-button"
>
  选项
</button>
<ul
  id="menu"
  role="menu"
  aria-labelledby="menu-button"
  hidden
>
  <li role="none">
    <button role="menuitem" tabindex="-1">复制</button>
  </li>
  <li role="none">
    <button role="menuitem" tabindex="-1">粘贴</button>
  </li>
</ul>
```

**键盘交互**：
- Enter/Space：打开菜单。
- 方向键 ↑ ↓：在菜单项间移动。
- Esc：关闭菜单并返回焦点到按钮。
- Tab：关闭菜单并将焦点移出。

**ARIA 状态**：
- `aria-expanded` 随菜单状态更新。
- `aria-activedescendant` 指向当前高亮菜单项。

---

**标签**：`#a11y` `#wcag` `#aria` `#键盘导航` `#屏幕阅读器`

> **最后更新**：2026-06-25
