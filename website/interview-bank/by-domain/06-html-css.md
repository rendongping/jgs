# HTML/CSS 面试题

> 本文件收录 HTML/CSS 相关面试题，目标题量 40 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、性能优化题、工程化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#基础题)
- [进阶题](#进阶题)
- [深入题](#深入题)
- [架构题](#架构题)

---

## 基础题

### FB-06-CO-B-001：什么是语义化 HTML？为什么要使用语义化标签？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：06 HTML/CSS
**标签**：语义化 HTML、可访问性、SEO、标签语义
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释什么是语义化 HTML，并说明使用语义化标签的好处。

**参考答案**：

语义化 HTML 是指使用恰当的 HTML 标签来表达内容的结构和含义，而不仅仅是为了展示效果。例如用 `<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<footer>` 等标签明确页面结构，而不是全部使用 `<div>` 和 `<span>`。

好处：

1. **可访问性**：屏幕阅读器可以更好地解析页面结构，帮助视障用户理解内容。
2. **SEO**：搜索引擎通过语义标签理解页面内容的重要性和层次，有助于排名。
3. **可维护性**：代码结构清晰，开发者和设计师更容易理解和维护。
4. **默认样式与行为**：语义标签通常带有合理的默认样式和浏览器行为（如 `<button>` 支持键盘聚焦和表单提交）。

```html
<!-- 不推荐 -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="content">...</div>
<div class="footer">...</div>

<!-- 推荐 -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>
```

**评分维度**：
- 语义化定义准确（30%）
- 能举出至少 4 个语义标签（20%）
- 说出可访问性、SEO、可维护性三大好处（40%）
- 能给出前后对比示例（10%）

**常见错误**：
- 认为语义化只是为了 SEO
- 用 `<div>` 模拟按钮但忽略键盘可访问性

**延伸追问**：
- `<section>` 和 `<article>` 有什么区别？
- 如何评估一个页面的语义化程度？

**参考资源**：
- [MDN - HTML 语义化](https://developer.mozilla.org/zh-CN/docs/Glossary/Semantics)

---

### FB-06-CO-B-002：标准盒模型和 IE 盒模型有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：06 HTML/CSS
**标签**：盒模型、box-sizing、content-box、border-box
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CSS 盒模型的组成，并比较标准盒模型（content-box）和 IE 盒模型（border-box）的区别。

**参考答案**：

CSS 盒模型由四部分组成：

1. **Content**：内容区域，显示文本和图像。
2. **Padding**：内边距，内容与边框之间的空间。
3. **Border**：边框。
4. **Margin**：外边距，元素与其他元素之间的空间。

两种盒模型的区别：

- `box-sizing: content-box`（标准盒模型）：`width` / `height` 只包含 content，padding 和 border 会额外增加元素的总尺寸。
- `box-sizing: border-box`（IE 盒模型）：`width` / `height` 包含 content + padding + border，更直观，便于布局计算。

```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid #000;
}

.content-box {
  box-sizing: content-box; /* 实际宽度 = 200 + 20*2 + 5*2 = 250px */
}

.border-box {
  box-sizing: border-box;  /* 实际宽度 = 200px，content 宽度 = 150px */
}
```

**评分维度**：
- 说清盒模型四部分（30%）
- 解释 content-box 与 border-box 差异（40%）
- 能举例计算实际尺寸（20%）
- 提到 border-box 更适合布局（10%）

**常见错误**：
- 把 margin 算入元素实际占用尺寸（margin 是外边距，不计入盒模型尺寸）
- 认为 IE 盒模型是“错误”的

**延伸追问**：
- 为什么很多项目会在全局设置 `* { box-sizing: border-box; }`？
- 行内元素的盒模型表现有什么不同？

**参考资源**：
- [MDN - box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)

---

### FB-06-CO-B-003：CSS 选择器有哪些类型？优先级如何计算？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：06 HTML/CSS
**标签**：CSS 选择器、优先级、specificity、层叠
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举常见的 CSS 选择器类型，并说明优先级（specificity）的计算规则。

**参考答案**：

常见选择器类型：

- 通配符选择器：`*`
- 类型（元素）选择器：`div`、`p`
- 类选择器：`.class`
- ID 选择器：`#id`
- 属性选择器：`[type="text"]`、`[class^="btn"]`
- 伪类：`:hover`、`:nth-child()`、`:not()`
- 伪元素：`::before`、`::after`、`::first-line`
- 组合选择器：后代 ` `、子代 `>`、相邻兄弟 `+`、通用兄弟 `~`、分组 `,`

优先级计算（按权重从高到低）：

1. **内联样式**：`style="..."`，权重 `(1, 0, 0, 0)`
2. **ID 选择器**：`#id`，权重 `(0, 1, 0, 0)`
3. **类 / 属性 / 伪类**：`.class`、`:hover`、`:not()`，权重 `(0, 0, 1, 0)`
4. **类型 / 伪元素**：`div`、`::before`，权重 `(0, 0, 0, 1)`
5. **通配符 / 继承**：`*`、继承样式，权重 `(0, 0, 0, 0)`

`!important` 会覆盖以上所有规则（除另一个 `!important` 和更高优先级外）。

```css
#nav .item a { color: red; }      /* (0,1,1,1) */
.menu li a { color: blue; }        /* (0,0,1,2) */
```

**评分维度**：
- 列举常见选择器类型（30%）
- 正确说明优先级层级（40%）
- 能举例比较两个选择器权重（20%）
- 提到 `!important` 和继承（10%）

**常见错误**：
- 认为 10 个类选择器能超过 1 个 ID 选择器（specificity 不是十进制相加）
- `:not()` 内部的参数不计入 specificity，但 `:not()` 本身按伪类计算

**延伸追问**：
- 如何避免优先级战争？
- `:is()` 和 `:where()` 对优先级有什么影响？

**参考资源**：
- [MDN - Specificity](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)

---

### FB-06-CO-B-004：display 的常见属性值有哪些？block/inline/inline-block 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：06 HTML/CSS
**标签**：display、块级、行内、视觉格式化模型
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `display` 的常见取值，并比较 `block`、`inline`、`inline-block` 三种值的区别。

**参考答案**：

`display` 控制元素的盒类型和布局行为。常见取值：

- `block`：块级元素，独占一行，可设置宽高，默认宽度填满父容器。
- `inline`：行内元素，不独占一行，宽高由内容决定，设置 width/height 无效，margin-top/bottom 多数情况下不生效。
- `inline-block`：行内块元素，对外表现为行内（可并排），对内可设置宽高和 margin/padding。
- `none`：不渲染，不占用空间。
- `flex`、`grid`、`table`、`list-item` 等：现代布局模式。

| 特性 | block | inline | inline-block |
|------|-------|--------|--------------|
| 是否独占一行 | 是 | 否 | 否 |
| 可设置宽高 | 是 | 否 | 是 |
| 垂直 margin 生效 | 是 | 否（通常） | 是 |
| 典型元素 | div、p、h1 | span、a | img、input、button |

```css
span.inline-block {
  display: inline-block;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
```

**评分维度**：
- 说清三种 display 值的核心差异（50%）
- 能举出典型元素（20%）
- 提到可设置宽高和 margin 的差异（20%）
- 提到其他常见 display 值（10%）

**常见错误**：
- 认为 `inline` 元素设置 margin 上下会撑开父元素
- 混淆 `display: none` 和 `visibility: hidden`

**延伸追问**：
- `display: none` 与 `visibility: hidden`、 `opacity: 0` 有什么区别？
- 行内元素有哪些盒模型属性不生效？

**参考资源**：
- [MDN - display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)

---

### FB-06-CO-B-005：什么是 CSS 继承？哪些属性会继承？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：06 HTML/CSS
**标签**：CSS 继承、层叠、属性继承、inherit
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 CSS 中的继承机制，并举例说明哪些属性会继承、哪些不会继承。

**参考答案**：

CSS 继承是指某些属性值会自动从父元素传递给子元素，无需显式设置。继承是层叠（cascade）的一部分。

**会继承的属性**（通常与文本相关）：

- 字体：`font-family`、`font-size`、`font-weight`、`line-height`
- 颜色：`color`
- 文本：`text-align`、`text-indent`、`letter-spacing`、`white-space`
- 可见性：`visibility`
- 光标：`cursor`

**不会继承的属性**（通常与盒模型/布局相关）：

- 盒模型：`width`、`height`、`margin`、`padding`、`border`
- 背景：`background`、`background-color`
- 定位：`position`、`top`、`left`、`z-index`
- 显示：`display`、`float`、`overflow`

可以使用 `inherit`、`initial`、`unset`、`revert` 控制继承行为：

```css
.child {
  color: inherit;   /* 显式继承父元素颜色 */
  margin: initial;  /* 恢复属性默认值 */
  all: unset;       /* 除 direction 和 unicode-bidi 外全部取消设置 */
}
```

**评分维度**：
- 解释继承概念（30%）
- 正确分类会继承与不会继承的属性（40%）
- 能举例说明（20%）
- 提到 inherit/initial/unset（10%）

**常见错误**：
- 认为所有属性都会继承
- 把 `inherit` 和 `initial` 混淆

**延伸追问**：
- `unset` 和 `revert` 有什么区别？
- 如何利用继承减少 CSS 代码量？

**参考资源**：
- [MDN - 继承](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inheritance)

---

### FB-06-CO-B-006：position 有哪些值？它们之间有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：06 HTML/CSS
**标签**：position、定位、relative、absolute、fixed、sticky
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `position` 的各个取值，以及它们在文档流中的表现差异。

**参考答案**：

`position` 用于指定元素的定位方式：

- `static`：默认值，元素处于正常文档流，不受 `top/right/bottom/left` 和 `z-index` 影响。
- `relative`：相对定位，元素仍在文档流中占据原位置，根据原位置偏移，不脱离文档流。
- `absolute`：绝对定位，元素脱离文档流，相对于最近的已定位祖先元素（非 static）定位；若无则相对于初始包含块（通常是 viewport）。
- `fixed`：固定定位，元素脱离文档流，相对于视口定位，不随页面滚动而移动。
- `sticky`：粘性定位，元素在阈值内表现为 relative，滚动超过阈值后表现为 fixed，相对于最近的滚动祖先定位。

```css
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**评分维度**：
- 说清五种 position 值（40%）
- 解释是否脱离文档流（30%）
- 说明定位参考系（20%）
- 能举例说明 sticky 或 fixed 场景（10%）

**常见错误**：
- 认为 `relative` 会脱离文档流
- 认为 `absolute` 总是相对于 body 定位
- 认为 `fixed` 一定相对于 viewport（在特定 transform 父元素下会创建包含块）

**延伸追问**：
- `transform` 会对 fixed 定位产生什么影响？
- `sticky` 不生效通常有哪些原因？

**参考资源**：
- [MDN - position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

---

### FB-06-CO-B-007：什么是 Flexbox？常用属性有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：06 HTML/CSS
**标签**：Flexbox、弹性布局、主轴、交叉轴、对齐
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍 Flexbox 布局模型，并列举容器和项目上的常用属性。

**参考答案**：

Flexbox（弹性盒布局）是一种一维布局模型，用于在容器内高效地分配、对齐空间，适合处理沿单一方向（水平或垂直）排列的项目。

容器属性（flex container）：

- `display: flex`：启用 flex 布局。
- `flex-direction`：主轴方向，如 `row`（默认）、`row-reverse`、`column`、`column-reverse`。
- `flex-wrap`：是否换行，如 `nowrap`（默认）、`wrap`、`wrap-reverse`。
- `justify-content`：主轴对齐方式，如 `flex-start`、`center`、`space-between`、`space-around`、`space-evenly`。
- `align-items`：交叉轴对齐方式，如 `stretch`（默认）、`flex-start`、`center`、`baseline`。
- `align-content`：多行时行与行之间的交叉轴对齐。
- `gap`：项目之间的间隙。

项目属性（flex item）：

- `flex-grow`：放大比例，分配剩余空间。
- `flex-shrink`：缩小比例，处理空间不足时的收缩。
- `flex-basis`：项目在主轴上的初始大小。
- `flex`：`flex-grow flex-shrink flex-basis` 的简写，常见如 `flex: 1` 表示 `1 1 0%`。
- `align-self`：覆盖容器的 `align-items`，单独设置项目交叉轴对齐。
- `order`：排列顺序。

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.item {
  flex: 1;
}
```

**评分维度**：
- 解释 flex 是一维布局模型（20%）
- 说出至少 5 个容器属性（30%）
- 说出至少 3 个项目属性（30%）
- 能举例说明常用组合（20%）

**常见错误**：
- 混淆 `justify-content` 和 `align-items` 的方向
- 认为 `flex: 1` 等价于 `flex-grow: 1`

**延伸追问**：
- `flex: 0 1 auto` 是什么意思？
- `min-width: 0` 在 flex 布局中为什么重要？

**参考资源**：
- [MDN - Flexbox](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

### FB-06-CO-B-008：什么是 CSS Grid？和 Flexbox 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：06 HTML/CSS
**标签**：CSS Grid、网格布局、二维布局、Flexbox
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍 CSS Grid 布局，并说明它与 Flexbox 的主要区别和适用场景。

**参考答案**：

CSS Grid 是一种二维布局模型，可以同时处理行和列，适合复杂的网页整体布局。Flexbox 是一维布局模型，主要处理单行或单列的项目排列。

主要区别：

| 特性 | Flexbox | CSS Grid |
|------|---------|----------|
| 维度 | 一维（行或列） | 二维（行和列同时） |
| 内容驱动还是布局驱动 | 内容驱动（项目大小决定布局） | 布局驱动（网格轨道定义容器结构） |
| 适用场景 | 组件内部对齐、导航栏、卡片列表 | 页面整体布局、复杂表单、仪表盘 |
| 对齐单位 | 基于项目 | 基于网格轨道/单元格 |

Grid 常用属性：

- 容器：`display: grid`、`grid-template-columns`、`grid-template-rows`、`grid-gap` / `gap`、`grid-template-areas`、`justify-items`、`align-items`
- 项目：`grid-column`、`grid-row`、`grid-area`、`justify-self`、`align-self`

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.item:first-child {
  grid-column: span 2;
}
```

**评分维度**：
- 说清 Grid 是二维布局（30%）
- 能与 Flexbox 作准确对比（30%）
- 列举常用 Grid 属性（20%）
- 能举例说明适用场景（20%）

**常见错误**：
- 认为 Grid 可以完全替代 Flexbox
- 混淆 `grid-template-columns` 和 `grid-auto-columns`

**延伸追问**：
- `fr` 单位是如何计算尺寸的？
- `auto-fit` 和 `auto-fill` 有什么区别？

**参考资源**：
- [MDN - Grid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout)

---

### FB-06-CO-B-009：什么是媒体查询？请写一个响应式断点示例。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：06 HTML/CSS
**标签**：媒体查询、响应式设计、断点、mobile-first
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 CSS 媒体查询的作用，并给出一段移动优先（mobile-first）的响应式断点示例代码。

**参考答案**：

媒体查询（Media Query）允许根据设备特性（如视口宽度、屏幕分辨率、方向等）应用不同的 CSS 样式，是实现响应式设计的核心技术。

移动优先示例：

```css
/* 默认样式：小屏幕 */
.container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

常用断点（参考）：

- 手机：< 768px
- 平板：768px - 1023px
- 桌面：1024px - 1279px
- 大屏：≥ 1280px

**评分维度**：
- 解释媒体查询作用（30%）
- 写出正确语法（30%）
- 体现移动优先思路（20%）
- 提到常用断点或 `min-width`/`max-width` 区别（20%）

**常见错误**：
- 媒体查询语法错误（如漏写 `@media`）
- 同时混用 `min-width` 和 `max-width` 导致样式冲突却未管理好

**延伸追问**：
- 移动优先和桌面优先在媒体查询写法上有什么不同？
- 如何实现根据用户 prefers-color-scheme 切换主题？

**参考资源**：
- [MDN - Media queries](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries)

---

### FB-06-CO-B-010：什么是外边距折叠（margin collapse）？常见场景有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：06 HTML/CSS
**标签**：margin collapse、外边距折叠、BFC、盒模型
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CSS 中的外边距折叠（margin collapse）现象，并列举常见发生场景和解决方法。

**参考答案**：

外边距折叠是指两个或多个垂直相邻的块级元素的外边距（margin）合并为一个外边距，最终取值取其中最大的那个，而不是相加。

常见发生场景：

1. **相邻兄弟元素**：上方元素的 `margin-bottom` 与下方元素的 `margin-top` 折叠。
2. **父子元素**：子元素的 `margin-top` / `margin-bottom` 与父元素的对应外边距折叠（父元素无 border/padding/inline content/BFC 分隔时）。
3. **空块元素**：自身 `margin-top` 和 `margin-bottom` 折叠。

不会发生折叠的情况：

- 水平方向 margin 不折叠。
- 浮动元素、绝对定位元素、inline-block 元素、BFC 容器内部不折叠。
- flex/grid 容器的子元素之间不折叠。

解决方法：

- 给父元素添加 `padding` 或 `border`。
- 触发父元素 BFC（如 `overflow: hidden`、`display: flow-root`）。
- 使用 flex/grid 布局替代块级布局。

```css
.parent {
  overflow: hidden; /* 触发 BFC，防止子元素 margin 折叠到父元素外 */
}
```

**评分维度**：
- 解释 margin collapse 概念（30%）
- 列举至少 3 种发生场景（40%）
- 提到不会折叠的情况（15%）
- 能给出解决方案（15%）

**常见错误**：
- 认为所有 margin 都会折叠
- 不知道 flex/grid 容器内不会发生折叠

**延伸追问**：
- 负 margin 折叠时如何计算？
- 为什么 BFC 可以解决 margin collapse？

**参考资源**：
- [MDN - 外边距折叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)

---

### FB-06-CO-B-011：什么是 BFC？如何创建 BFC？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：06 HTML/CSS
**标签**：BFC、块级格式化上下文、清除浮动、margin collapse
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 BFC（Block Formatting Context，块级格式化上下文）的概念，并说明如何创建 BFC 及其应用场景。

**参考答案**：

BFC 是 CSS 视觉格式化模型中的一个独立渲染区域，区域内的元素按照特定规则布局，且与外部元素相互隔离。

BFC 的特性：

1. 内部块级盒子在垂直方向一个接一个放置。
2. 垂直方向 margin 会在同一个 BFC 内发生折叠。
3. BFC 区域不会与浮动元素重叠。
4. BFC 可以包含浮动元素（清除浮动）。
5. BFC 在页面上是一个独立的容器，内外元素互不影响。

创建 BFC 的方式：

- `float: left` / `right`
- `position: absolute` / `fixed`
- `display: inline-block`、`display: table-cell`、`display: flow-root`（推荐，无副作用）
- `overflow: hidden`、`overflow: auto`、`overflow: scroll`（不为 visible）
- `contain: layout`、`content-visibility: auto`

应用场景：

- 清除浮动（替代 clearfix）。
- 防止 margin collapse。
- 实现自适应两栏布局（左侧浮动，右侧 BFC）。

```css
.clearfix-bfc {
  display: flow-root; /* 现代推荐写法 */
}
```

**评分维度**：
- 解释 BFC 概念（30%）
- 列举至少 4 种创建方式（30%）
- 说清 BFC 的主要特性（25%）
- 能举例应用场景（15%）

**常见错误**：
- 只知道 `overflow: hidden` 能清除浮动，但不知道为什么
- 把 BFC 和 IFC（行内格式化上下文）混淆

**延伸追问**：
- `display: flow-root` 和 `overflow: hidden` 创建 BFC 有什么副作用差异？
- IFC 是什么？和 BFC 有什么区别？

**参考资源**：
- [MDN - Block formatting context](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)

---

### FB-06-CO-B-012：什么是 CSS 变量（自定义属性）？如何使用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：06 HTML/CSS
**标签**：CSS 变量、自定义属性、var、主题、响应式
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请介绍 CSS 自定义属性（CSS Variables），并说明其基本用法和优势。

**参考答案**：

CSS 自定义属性（又称 CSS 变量）允许开发者定义可在样式表中复用的值，以 `--` 开头，通过 `var()` 函数引用。

基本用法：

```css
:root {
  --primary-color: #1890ff;
  --spacing-unit: 8px;
  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  font-family: var(--font-stack);
}
```

优势：

1. **可维护性**：一处修改，全局生效。
2. **作用域**：可在 `:root`、组件级或媒体查询中定义，支持级联覆盖。
3. **动态性**：可通过 JavaScript 读写，适合主题切换。
4. **减少重复**：统一管理颜色、间距、字体等设计 token。

```js
// JavaScript 读取和修改
const root = document.documentElement;
getComputedStyle(root).getPropertyValue('--primary-color');
root.style.setProperty('--primary-color', '#ff4d4f');
```

**评分维度**：
- 说清定义和引用语法（30%）
- 说明作用域和级联特性（25%）
- 列举至少 3 个优势（25%）
- 能写出 JS 动态修改示例（20%）

**常见错误**：
- 变量名不以 `--` 开头
- 在 `var()` 中忘记第二个回退值参数

**延伸追问**：
- CSS 变量和 Sass/Less 变量有什么区别？
- 如何实现基于 CSS 变量的暗黑模式？

**参考资源**：
- [MDN - 使用 CSS 自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

---

### FB-06-CO-B-013：transition 和 animation 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：06 HTML/CSS
**标签**：transition、animation、关键帧、CSS 动画
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 CSS 中的 `transition` 和 `animation`，并说明各自的适用场景。

**参考答案**：

| 特性 | transition | animation |
|------|------------|-----------|
| 触发方式 | 需要状态变化触发（如 hover、class 切换） | 自动播放，可通过关键帧控制 |
| 复杂度 | 两个状态之间的过渡 | 可定义多个关键帧，控制复杂动画 |
| 循环播放 | 不能直接循环 | 可通过 `animation-iteration-count: infinite` 循环 |
| 方向控制 | 无 | 可通过 `animation-direction` 控制 |
| 暂停控制 | 无原生暂停（可通过 transition-play-state） | 可通过 `animation-play-state: paused` 暂停 |

`transition` 适合简单的状态变化，如按钮 hover 效果：

```css
.button {
  background-color: blue;
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: red;
}
```

`animation` 适合复杂动画：

```css
@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
.box {
  animation: slideIn 0.5s ease-out forwards;
}
```

**评分维度**：
- 说清两者触发方式差异（30%）
- 能列举至少 3 个区别（30%）
- 各给出一个代码示例（30%）
- 提到性能注意事项（10%）

**常见错误**：
- 用 `transition` 做复杂多步骤动画
- 在 `animation` 中不使用 `will-change` 或 transform 导致性能问题

**延伸追问**：
- 如何让 transition 在页面加载时自动播放？
- `animation-fill-mode` 有哪些取值，分别是什么意思？

**参考资源**：
- [MDN - transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)
- [MDN - animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)

---

## 进阶题

### FB-06-CA-A-001：分析下面代码中 z-index 为什么不生效？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：z-index、层叠上下文、position、stacking context
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```html
<div class="parent">
  <div class="child child-a">A</div>
</div>
<div class="parent">
  <div class="child child-b">B</div>
</div>
```

```css
.parent {
  position: relative;
  z-index: 1;
}
.child-a {
  position: absolute;
  z-index: 999;
  background: red;
}
.child-b {
  position: absolute;
  z-index: 2;
  background: blue;
}
```

两个 `.parent` 部分重叠，请问最终哪个子元素显示在上层？为什么？

**参考答案**：

最终 B（蓝色）可能显示在 A（红色）上层。

原因：

1. `z-index` 只对**已定位元素**（`position` 不为 `static`）和 flex/grid 子元素生效。
2. 更重要的是，`.parent` 设置了 `position: relative` 和 `z-index: 1`，会各自创建独立的层叠上下文。
3. `.child-a` 的 `z-index: 999` 和 `.child-b` 的 `z-index: 2` 只在各自的父层叠上下文中比较。
4. 由于两个父元素的层叠上下文在根上下文中 `z-index` 相同（都是 1），它们的子元素无法跨父层叠上下文比较。后出现在 HTML 中的层叠上下文通常位于上层，因此 B 会覆盖 A。

修改方案：

- 去掉父元素的 `z-index`，让子元素在同一层叠上下文中比较。
- 或调整父元素的 `z-index`。

```css
.parent {
  position: relative;
  /* 不设置 z-index，不创建层叠上下文 */
}
```

**评分维度**：
- 正确判断显示层级（30%）
- 解释 z-index 生效条件（20%）
- 解释层叠上下文的隔离作用（40%）
- 给出修改方案（10%）

**常见错误**：
- 认为 `z-index: 999` 一定能覆盖 `z-index: 2`
- 忽略父元素创建层叠上下文的影响

**延伸追问**：
- 除了 `position + z-index`，还有哪些属性会创建层叠上下文？
- `opacity: 0.99` 为什么会创建层叠上下文？

**参考资源**：
- [MDN - 层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)

---

### FB-06-CO-A-001：什么是层叠上下文（stacking context）？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：层叠上下文、z-index、position、opacity、transform
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CSS 层叠上下文（stacking context）的概念，并列举创建层叠上下文的常见条件。

**参考答案**：

层叠上下文是 HTML 元素在三维空间（z 轴）上的渲染顺序概念。同一个层叠上下文内的元素按一定规则（如 `z-index`、出现顺序）堆叠；不同层叠上下文之间，父元素的层叠顺序决定整体层级，子元素无法跨越父层叠上下文比较。

创建层叠上下文的常见条件：

- `position` 为 `absolute` / `relative` / `fixed` / `sticky` 且 `z-index` 不为 `auto`
- `position: fixed`（部分浏览器中无需 z-index）
- `opacity` 小于 1
- `transform` / `filter` / `perspective` / `clip-path` / `mask` 不为 `none`
- `will-change` 指定 `opacity`、`transform` 等属性
- `isolation: isolate`
- `display: flex` / `grid` 且子元素 `z-index` 不为 `auto`
- `mix-blend-mode` 不为 `normal`

层叠顺序（从后到前，同一层叠上下文内）：

1. 背景和边框
2. 负 z-index 子元素
3. 块级元素
4. 浮动元素
5. 行内/行内块元素
6. `z-index: 0` / `auto` 的定位元素
7. 正 z-index 子元素

```css
.modal {
  position: fixed;
  z-index: 1000;
  isolation: isolate; /* 显式创建独立层叠上下文 */
}
```

**评分维度**：
- 解释层叠上下文概念（30%）
- 列举至少 5 种创建条件（40%）
- 说明层叠顺序规则（20%）
- 提到层叠上下文的隔离性（10%）

**常见错误**：
- 认为所有 `position: relative` 都会创建层叠上下文
- 把 z-index 的数值大小直接等同于全局层级

**延伸追问**：
- 如何安全地管理弹窗、下拉菜单等组件的 z-index？
- `z-index: auto` 和 `z-index: 0` 在创建层叠上下文上有什么不同？

**参考资源**：
- [MDN - 层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)

---

### FB-06-CD-A-001：实现元素水平垂直居中的至少三种方案。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：06 HTML/CSS
**标签**：水平垂直居中、Flexbox、Grid、position、transform
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请写出至少三种将未知宽高的元素在其父元素中水平垂直居中的 CSS 方案，并比较各自的优缺点。

**参考答案**：

方案一：Flexbox（推荐）

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

优点：代码简洁，兼容性好，支持多元素居中。
缺点：父元素会成为 flex 容器，可能影响子元素默认行为。

方案二：Grid

```css
.parent {
  display: grid;
  place-items: center;
}
```

优点：代码最简洁，二维布局能力强。
缺点：IE 不支持，较老的浏览器兼容性不如 flex。

方案三：绝对定位 + transform

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

优点：不依赖父元素尺寸，兼容性好。
缺点：子元素脱离文档流，可能需要处理后续布局。

方案四：绝对定位 + margin: auto

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

优点：无需 transform。
缺点：子元素需要有明确尺寸或 max-size 才能正确居中。

**评分维度**：
- 写出至少 3 种方案（50%）
- 方案代码正确（30%）
- 能比较优缺点（20%）

**常见错误**：
- `top: 50%; left: 50%` 后忘记用 transform 修正自身宽高的一半
- 父元素未设置 `position: relative` 导致 absolute 定位参考错误

**延伸追问**：
- 如果子元素宽高已知，还有哪些居中方案？
- 多行文本在固定高度容器中如何垂直居中？

**参考资源**：
- [MDN - 居中一个元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Layout_cookbook/Center_an_element)

---

### FB-06-CO-A-002：响应式设计的实现方式有哪些？移动优先和桌面优先有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：响应式设计、媒体查询、移动优先、断点、viewport
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍实现响应式设计的常见方式，并比较移动优先（Mobile First）和桌面优先（Desktop First）的设计思路。

**参考答案**：

响应式设计是指一套代码适配不同屏幕尺寸和设备的能力。常见实现方式：

1. **媒体查询**：根据视口宽度、设备特性应用不同样式。
2. **流式布局**：使用百分比、`fr`、vw/vh、max-width/min-width 等相对单位。
3. **弹性图片/媒体**：`img { max-width: 100%; height: auto; }`。
4. **Flexbox / Grid**：自适应布局模型。
5. **Viewport 设置**：`<meta name="viewport" content="width=device-width, initial-scale=1">`。
6. **响应式字体**：`clamp()`、vw 单位。
7. **容器查询（Container Queries）**：基于容器尺寸而非视口尺寸响应。

移动优先 vs 桌面优先：

| 特性 | Mobile First | Desktop First |
|------|--------------|---------------|
| 默认样式 | 小屏幕 | 大屏幕 |
| 媒体查询方向 | `min-width` 向上扩展 | `max-width` 向下收缩 |
| 设计思路 | 内容优先，逐步增强 | 功能完整，逐步裁剪 |
| CSS 复杂度 | 通常更小，覆盖更少 | 可能需要覆盖更多样式 |

```css
/* Mobile First */
.card { width: 100%; }
@media (min-width: 768px) { .card { width: 50%; } }

/* Desktop First */
.card { width: 25%; }
@media (max-width: 768px) { .card { width: 100%; } }
```

**评分维度**：
- 列举至少 4 种响应式实现方式（40%）
- 说清移动优先和桌面优先的区别（30%）
- 能写出媒体查询示例（20%）
- 提到 viewport meta 标签（10%）

**常见错误**：
- 忘记设置 viewport meta 标签导致媒体查询不生效
- 混用 min-width 和 max-width 导致优先级混乱

**延伸追问**：
- 什么是容器查询？它和媒体查询有什么区别？
- 响应式图片如何实现？

**参考资源**：
- [MDN - 响应式设计](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)

---

### FB-06-CA-A-002：分析下面选择器的优先级。

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：CSS 优先级、specificity、!important、选择器权重
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```css
/* A */
#app .list .item a { color: red; }

/* B */
.list .item a.active { color: blue; }

/* C */
#app #nav a.active { color: green; }

/* D */
a { color: yellow !important; }
```

请问对于一个 `<a class="active">` 元素，最终 `color` 是什么？请计算每个选择器的 specificity。

**参考答案**：

Specificity 计算（内联, ID, 类/伪类/属性, 类型/伪元素）：

- A：`#app .list .item a` → `(0, 1, 2, 1)`
- B：`.list .item a.active` → `(0, 0, 3, 1)`
- C：`#app #nav a.active` → `(0, 2, 1, 1)`
- D：`a` → `(0, 0, 0, 1)`，但带有 `!important`

比较：

1. D 有 `!important`，优先级最高（在 `!important` 层级中 specificity 仍参与比较，但这里只有一个 `!important`）。
2. 若去掉 D，C 的 `(0,2,1,1)` 最大，其次是 A `(0,1,2,1)`，最后是 B `(0,0,3,1)`。

因此最终颜色为 **yellow**（来自 D 的 `!important`）。

**评分维度**：
- 正确计算每个选择器 specificity（40%）
- 正确比较大小（30%）
- 解释 `!important` 的影响（20%）
- 提到同优先级时后覆盖前（10%）

**常见错误**：
- 把 specificity 当十进制相加（如认为 3 个类 = 30 > 1 个 ID）
- 忽略 `!important` 的层级

**延伸追问**：
- 如果 D 改成 `.active { color: yellow !important; }`，结果会变吗？
- 如何避免在项目中滥用 `!important`？

**参考资源**：
- [MDN - Specificity](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)

---

### FB-06-CO-A-003：什么是 BEM 命名规范？它的优势是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：BEM、CSS 命名规范、CSS 架构、可维护性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 BEM 命名规范，并说明它解决的问题和优势。

**参考答案**：

BEM 是一种 CSS 类名命名方法论，代表：

- **B**lock（块）：独立的可复用组件，如 `.button`、`.card`。
- **E**lement（元素）：块的组成部分，用 `__` 连接，如 `.button__icon`、`.card__title`。
- **M**odifier（修饰符）：块或元素的状态/变体，用 `--` 连接，如 `.button--primary`、`.button--disabled`。

```html
<button class="button button--primary button--large">
  <span class="button__icon">★</span>
  <span class="button__text">Submit</span>
</button>
```

优势：

1. **低特异性**：类选择器权重一致，避免优先级战争。
2. **清晰的结构**：从类名即可看出元素关系和状态。
3. **可维护性**：模块边界明确，修改影响范围可控。
4. **可复用性**：块之间解耦，便于跨项目复用。

**评分维度**：
- 说清 B/E/M 三部分含义（40%）
- 能写出正确示例（30%）
- 列举至少 3 个优势（20%）
- 提到低 specificity 设计（10%）

**常见错误**：
- 嵌套过深，如 `.block__element__sub-element`
- 把 modifier 用于不相关的状态，破坏语义

**延伸追问**：
- BEM 和原子化 CSS（如 Tailwind）如何取舍？
- 如何处理 BEM 中 deeply nested 的元素命名？

**参考资源**：
- [BEM 官方文档](https://en.bem.info/methodology/)

---

### FB-06-CO-A-004：Sass/Less 等 CSS 预处理器解决了 CSS 的哪些问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：Sass、Less、预处理器、变量、嵌套、Mixin
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍 CSS 预处理器（如 Sass、Less）的主要特性，并说明它们解决了原生 CSS 的哪些问题。

**参考答案**：

CSS 预处理器在编译阶段扩展了 CSS 语法，主要特性包括：

1. **变量**：定义可复用的颜色、字体、间距等值。
2. **嵌套**：按 HTML 结构嵌套选择器，减少重复书写。
3. **Mixin / 函数**：复用代码片段，支持参数化。
4. **继承（@extend）**：共享选择器样式。
5. **模块/导入（@use / @import）**：拆分和组织样式文件。
6. **运算**：支持数学运算和颜色函数。

解决的问题：

- 原生 CSS 缺乏变量和逻辑复用机制。
- 大型项目中样式代码冗余、难以维护。
- 缺乏模块化和命名空间隔离。

Sass 示例：

```scss
$primary: #1890ff;
$spacing: 8px;

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  @include flex-center;
  padding: $spacing * 2;
  border: 1px solid $primary;

  &__title {
    color: $primary;
  }
}
```

**评分维度**：
- 列举至少 4 个预处理器特性（40%）
- 说明解决的核心问题（30%）
- 能写出示例代码（20%）
- 提到编译产物是 CSS（10%）

**常见错误**：
- 混淆 Sass 的 SCSS 和缩进语法
- 过度嵌套导致生成高特异性选择器

**延伸追问**：
- Sass 的 `@use` 和 `@import` 有什么区别？
- 预处理器变量和 CSS 自定义属性有什么区别？

**参考资源**：
- [Sass 官方文档](https://sass-lang.com/documentation/)

---

### FB-06-CO-A-005：什么是 CSS-in-JS？它有哪些优缺点？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：CSS-in-JS、styled-components、Emotion、组件化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CSS-in-JS 的概念，并说明它的主要优缺点和适用场景。

**参考答案**：

CSS-in-JS 是一种在 JavaScript 代码中编写 CSS 的技术，通常以组件作用域样式为目标，常见库有 styled-components、Emotion、Linaria、vanilla-extract。

主要优点：

1. **组件作用域样式**：自动生成唯一类名，避免全局命名冲突。
2. **动态样式**：可直接使用 JS 变量、props、state 生成样式。
3. **代码组织**：样式与组件同处一处，便于维护。
4. **Tree-shaking**：未使用的组件样式不会被打包。
5. **类型安全**：TypeScript 可提供样式属性和主题类型检查。

主要缺点：

1. **运行时开销**：部分方案在运行时生成样式，可能影响性能。
2. **包体积增加**：引入运行时库。
3. **SSR 复杂度**：需要处理样式抽取和 hydration。
4. **调试困难**：生成的类名通常是哈希值。
5. **生态锁定**：学习成本和迁移成本。

示例（styled-components）：

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? '#1890ff' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#1890ff'};
`;
```

**评分维度**：
- 解释 CSS-in-JS 概念（20%）
- 列举至少 3 个优点（30%）
- 列举至少 3 个缺点（30%）
- 能举例说明使用方式（20%）

**常见错误**：
- 认为 CSS-in-JS 一定比传统 CSS 好
- 忽略运行时开销和 SSR 复杂度

**延伸追问**：
- CSS Modules 和 CSS-in-JS 有什么异同？
- 如何降低 CSS-in-JS 的运行时开销？

**参考资源**：
- [styled-components 文档](https://styled-components.com/docs)

---

### FB-06-CO-A-006：什么是原子化 CSS（Atomic CSS）？Tailwind 的优缺点是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：Atomic CSS、Tailwind、原子化、Utility-first
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释原子化 CSS（Atomic CSS）的概念，并以 Tailwind CSS 为例说明其优缺点。

**参考答案**：

原子化 CSS 是指每个类只负责一个单一、不可再分的样式职责，如 `.m-4` 只设置 `margin: 1rem`，`.text-center` 只设置 `text-align: center`。通过组合大量原子类来构建界面。

Tailwind CSS 是最流行的 Utility-first CSS 框架，提供大量预定义工具类，并支持 JIT（Just-In-Time）编译按需生成样式。

优点：

1. **开发速度快**：无需写自定义 CSS，直接在 HTML/JSX 中组合类名。
2. **避免命名困难**：不需要为每个组件发明类名。
3. **样式一致**：基于设计 token，保持设计系统统一。
4. **包体积小**：JIT 模式下只生成使用到的样式。
5. **响应式和状态变体**：如 `md:flex`、`hover:bg-blue-500`。

缺点：

1. **类名冗长**：HTML 中可能出现大量类名，可读性下降。
2. **语义性差**：类名不表达业务含义。
3. **学习成本**：需要记忆大量工具类。
4. **复用困难**：相同组合需要重复写或抽象为组件。
5. **与设计师协作**：设计稿到代码的映射需要适应。

```html
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Submit
</button>
```

**评分维度**：
- 解释原子化 CSS 概念（30%）
- 列举至少 3 个优点（25%）
- 列举至少 3 个缺点（25%）
- 能写出 Tailwind 示例（20%）

**常见错误**：
- 把原子化 CSS 和行内样式划等号
- 认为 Tailwind 不能做自定义样式

**延伸追问**：
- 如何在 Tailwind 中处理复杂组件的样式复用？
- 原子化 CSS 和 BEM 方法论如何共存？

**参考资源**：
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

### FB-06-PE-A-001：CSS 性能优化有哪些常见手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：CSS 性能、重排、重绘、渲染性能、选择器优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举常见的 CSS 性能优化手段，并说明每种手段的原理。

**参考答案**：

常见 CSS 性能优化手段：

1. **减少重排（Reflow）和重绘（Repaint）**
   - 避免频繁修改影响布局的属性（如 width、height、top、left）。
   - 优先使用 transform 和 opacity 做动画，它们通常可由 GPU 合成。

2. **优化选择器匹配**
   - 避免过深和过于复杂的选择器。
   - 避免使用通配符选择器 `*` 设置全局样式。
   - CSS 选择器从右向左匹配，右侧应尽可能具体。

3. **合理使用 will-change**
   - 对即将动画的元素提前声明 `will-change: transform`，提示浏览器创建图层。
   - 动画结束后移除，避免占用过多 GPU 内存。

4. **提取关键 CSS（Critical CSS）**
   - 将首屏必需的内联到 `<head>`，异步加载剩余 CSS。

5. **压缩和合并 CSS**
   - 使用构建工具压缩、去重、合并文件。

6. **使用 CSS 硬件加速**
   - `transform: translate3d(0,0,0)` 或 `will-change` 可提升合成层性能。

7. **避免 @import 阻塞**
   - `<link>` 加载 CSS 不会阻塞并行下载，但 `@import` 会串行加载。

8. **字体加载优化**
   - 使用 `font-display: swap` 避免文本不可见。

```css
.animated {
  will-change: transform;
  transform: translateZ(0); /* 创建合成层 */
}
```

**评分维度**：
- 列举至少 5 种优化手段（40%）
- 说明重排/重绘/合成层原理（30%）
- 提到 will-change 和 transform 的正确使用（20%）
- 提到关键 CSS（10%）

**常见错误**：
- 滥用 `will-change` 导致 GPU 内存占用过高
- 对静态元素也使用 `transform: translate3d`

**延伸追问**：
- 哪些 CSS 属性会触发重排？哪些只触发重绘？
- 如何测量 CSS 渲染性能？

**参考资源**：
- [MDN - will-change](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change)

---

### FB-06-CA-A-003：分析下面布局问题的原因。

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：浮动、清除浮动、BFC、margin collapse
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```html
<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
```

```css
.container {
  border: 2px solid #000;
}
.left, .right {
  float: left;
  width: 50%;
  height: 100px;
}
```

请问 `.container` 的边框会发生什么现象？为什么？如何解决？

**参考答案**：

现象：`.container` 的边框会坍塌，高度变为 0（或只剩边框本身），因为子元素都设置了 `float: left`，脱离了正常文档流，父元素无法感知它们的高度。

原因：浮动元素脱离文档流，父元素在计算高度时不会包含浮动子元素。

解决方案：

1. **触发 BFC**：给父元素添加 `overflow: hidden` 或 `display: flow-root`。
2. **clearfix 伪元素**：
   ```css
   .container::after {
     content: '';
     display: block;
     clear: both;
   }
   ```
3. **使用 flex/grid 替代浮动布局**（现代推荐）。

```css
.container {
  display: flow-root; /* 现代推荐，无副作用 */
}
```

**评分维度**：
- 正确判断父元素高度坍塌（30%）
- 解释浮动脱离文档流原理（30%）
- 给出至少 2 种解决方案（30%）
- 提到现代替代方案（10%）

**常见错误**：
- 给浮动子元素加 `clear: both`
- 使用空的 `<div style="clear: both">` 作为清除浮动元素（不符合语义化）

**延伸追问**：
- `clear` 属性是什么含义？
- 为什么 `overflow: hidden` 能清除浮动？

**参考资源**：
- [MDN - 浮动](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/CSS_layout/Floats)

---

### FB-06-SC-A-001：设计一个响应式导航栏。

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：06 HTML/CSS
**标签**：响应式、导航栏、Flexbox、媒体查询、汉堡菜单
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请设计一个响应式导航栏：桌面端水平展示所有菜单项，平板和手机端收起为汉堡菜单。请给出 HTML/CSS 结构思路和关键代码。

**参考答案**：

结构思路：

1. 使用语义化标签 `<nav>` 包裹菜单。
2. 桌面端使用 Flexbox 水平排列菜单项。
3. 小屏幕下通过复选框 hack 或 JS 控制菜单显示/隐藏。
4. 使用媒体查询切换布局。

```html
<nav class="navbar">
  <div class="brand">Logo</div>
  <input type="checkbox" id="menu-toggle" class="menu-toggle" />
  <label for="menu-toggle" class="menu-icon">☰</label>
  <ul class="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">Products</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu {
  display: flex;
  list-style: none;
  gap: 24px;
}

.menu-toggle,
.menu-icon {
  display: none;
}

@media (max-width: 768px) {
  .menu-icon {
    display: block;
    cursor: pointer;
  }
  .menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #fff;
  }
  .menu-toggle:checked ~ .menu {
    display: flex;
  }
}
```

**评分维度**：
- 结构语义化（20%）
- 桌面端布局正确（25%）
- 移动端切换逻辑正确（25%）
- 考虑可访问性（如 focus、ARIA）（20%）
- 代码简洁可维护（10%）

**常见错误**：
- 仅使用 div 模拟按钮，忽略键盘可访问性
- 汉堡菜单没有 aria-label 或 role

**延伸追问**：
- 如何为汉堡菜单添加键盘和屏幕阅读器支持？
- 如果使用 JS 控制菜单，如何处理动画和 focus trap？

**参考资源**：
- [MDN - 导航栏](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav)

---

## 深入题

### FB-06-CO-P-001：深入解析 CSS 视觉格式化模型。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：06 HTML/CSS
**标签**：视觉格式化模型、包含块、IFC、BFC、匿名盒
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请深入解释 CSS 视觉格式化模型（Visual Formatting Model）的核心概念，包括包含块（Containing Block）、格式化上下文（Formatting Context）、盒类型等。

**参考答案**：

CSS 视觉格式化模型定义了浏览器如何将文档树转换为可视化布局。核心概念包括：

1. **视口（Viewport）与初始包含块**：根元素的包含块通常是 viewport 的矩形区域。

2. **包含块（Containing Block）**：每个元素的位置和尺寸计算都相对于其包含块。通常：
   - 静态/相对定位元素的包含块是最近的块级祖先的内容框。
   - 绝对定位元素的包含块是最近的已定位祖先的 padding 框。
   - 固定定位元素的包含块是 viewport（除非祖先有 transform/perspective/filter 等）。

3. **盒类型**：
   - 块级盒（Block-level box）：生成块级盒，参与 BFC。
   - 行内级盒（Inline-level box）：生成 IFC，在行内排列。
   - 行内块（Inline-block）：对外行内，对内块级。

4. **格式化上下文（Formatting Context）**：
   - **BFC（Block Formatting Context）**：块级盒布局环境。
   - **IFC（Inline Formatting Context）**：行内盒布局环境，受 `line-height`、`vertical-align` 影响。
   - **FFC（Flex Formatting Context）**：Flex 容器创建的格式化上下文。
   - **GFC（Grid Formatting Context）**：Grid 容器创建的格式化上下文。

5. **匿名盒（Anonymous Box）**：浏览器为不完整结构自动生成的盒，如匿名块盒、匿名行内盒。

```css
/* 包含块示例 */
.parent {
  position: relative;
  width: 500px;
  padding: 20px;
}
.child {
  position: absolute;
  width: 50%; /* 参考 parent 的 padding-box，即 500px */
  left: 10px;
}
```

**评分维度**：
- 解释包含块概念及不同定位下的差异（30%）
- 区分块级盒、行内级盒、行内块（25%）
- 说明 BFC/IFC/FFC/GFC 差异（30%）
- 提到匿名盒（15%）

**常见错误**：
- 认为包含块总是父元素的内容框
- 把 IFC 和 BFC 混为一谈

**延伸追问**：
- `width: 100%` 和 `width: auto` 在包含块计算上有什么区别？
- 为什么绝对定位元素在 transform 父元素下会改变包含块？

**参考资源**：
- [MDN - 视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Visual_formatting_model)

---

### FB-06-CD-P-001：使用 CSS Grid 实现一个圣杯布局（Holy Grail Layout）。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：06 HTML/CSS
**标签**：CSS Grid、圣杯布局、响应式、布局技术
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请使用 CSS Grid 实现一个经典的圣杯布局：包含 header、footer、左侧 sidebar、右侧 sidebar 和中间 main 内容区，且中间内容区优先渲染（DOM 顺序上 main 在最前）。

**参考答案**：

```html
<div class="layout">
  <header class="header">Header</header>
  <main class="main">Main Content</main>
  <aside class="sidebar-left">Left Sidebar</aside>
  <aside class="sidebar-right">Right Sidebar</aside>
  <footer class="footer">Footer</footer>
</div>
```

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "left main right"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 16px;
}

.header  { grid-area: header; }
.main    { grid-area: main; }
.sidebar-left  { grid-area: left; }
.sidebar-right { grid-area: right; }
.footer  { grid-area: footer; }

@media (max-width: 768px) {
  .layout {
    grid-template-areas:
      "header"
      "main"
      "left"
      "right"
      "footer";
    grid-template-columns: 1fr;
  }
}
```

优点：

- DOM 顺序自然（main 在 left/right 之前），有利于 SEO 和可访问性。
- 无需负 margin 或复杂 calc。
- 响应式改造简单。

**评分维度**：
- 正确设置 grid-template-areas（30%）
- DOM 顺序体现内容优先（20%）
- 响应式断点正确（20%）
- 解释 Grid 相比传统 float/flex 圣杯布局的优势（30%）

**常见错误**：
- grid-area 名称拼写不一致
- 忘记设置 min-height: 100vh 导致 footer 不贴底

**延伸追问**：
- 传统 float 圣杯布局为什么要用负 margin？
- 如何用 Flexbox 实现同样的布局？相比 Grid 有什么局限？

**参考资源**：
- [MDN - Grid Template Areas](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas)

---

### FB-06-PE-P-001：什么是关键 CSS（Critical CSS）？如何提取和优化？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：06 HTML/CSS
**标签**：Critical CSS、首屏渲染、性能优化、内联样式、FP/FCP
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请解释关键 CSS（Critical CSS）的概念，并说明如何在项目中提取和优化关键 CSS 以提升首屏性能。

**参考答案**：

关键 CSS 是指渲染首屏（above-the-fold）内容所必需的最小 CSS 集合。将其内联到 `<head>` 中，可以让浏览器在下载外部 CSS 文件之前就开始渲染首屏，减少首次绘制（FP）和首次内容绘制（FCP）时间。

提取和优化方法：

1. **工具提取**：
   - 使用 Critical、Penthouse、CriticalCSS 等工具分析页面并提取首屏 CSS。
   - 结合 Puppeteer/Playwright 模拟不同视口尺寸。

2. **构建流程集成**：
   - 在构建时（SSG/SSR）为每个路由生成对应的关键 CSS。
   - 将关键 CSS 内联到 HTML 的 `<style>` 中。

3. **异步加载非关键 CSS**：
   ```html
   <link rel="preload" href="non-critical.css" as="style" onload="this.rel='stylesheet'">
   <noscript><link rel="stylesheet" href="non-critical.css"></noscript>
   ```

4. **优化策略**：
   - 控制关键 CSS 大小（通常 < 14KB gzip）。
   - 按路由/页面拆分关键 CSS。
   - 缓存已加载的完整 CSS，避免重复内联。

注意事项：

- 关键 CSS 过大反而阻塞渲染。
- 需要权衡维护成本和性能收益。

**评分维度**：
- 解释 Critical CSS 概念（25%）
- 说明提取方法（30%）
- 说明异步加载非关键 CSS 方式（25%）
- 提到大小控制和路由拆分（20%）

**常见错误**：
- 把所有 CSS 都内联到 HTML
- 忽略 noscript 降级

**延伸追问**：
- 如何衡量 Critical CSS 策略的效果？
- SSR 项目中 Critical CSS 和内联样式有什么区别？

**参考资源**：
- [web.dev - Extract critical CSS](https://web.dev/articles/extract-critical-css)

---

### FB-06-CO-P-002：`will-change` 的原理是什么？滥用有什么风险？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：06 HTML/CSS
**标签**：will-change、合成层、GPU、性能、内存
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `will-change` 属性的工作原理，并说明滥用它会带来哪些风险。

**参考答案**：

`will-change` 提示浏览器某个元素即将发生变化，让浏览器提前进行优化。例如声明 `will-change: transform` 会让浏览器将该元素提升为独立的合成层（compositor layer），动画可以在 GPU 上直接合成，避免主线程重排和重绘。

工作原理：

1. 浏览器接收到 `will-change` 后，会为元素创建独立的图层。
2. 属性变化时，浏览器只需重新合成图层，而无需重新计算布局或绘制。
3. 动画结束后应移除 `will-change`，释放资源。

滥用风险：

1. **GPU 内存占用**：每个合成层都占用显存，过多图层会导致内存压力。
2. **启动开销**：创建图层本身需要时间和内存。
3. **布局抖动**：错误使用 `will-change: width` 等布局属性不会创建合成层，反而可能误导优化。
4. **移动端耗电**：GPU 频繁合成增加能耗。

最佳实践：

```css
.animated {
  will-change: transform, opacity;
}
/* 动画结束后通过 JS 移除 will-change */
```

```js
element.addEventListener('transitionend', () => {
  element.style.willChange = 'auto';
});
```

**评分维度**：
- 解释 will-change 与合成层的关系（35%）
- 列举至少 3 种滥用风险（35%）
- 给出正确使用示例（20%）
- 提到应在动画结束后移除（10%）

**常见错误**：
- 对所有元素添加 `will-change`
- 对布局属性使用 `will-change`

**延伸追问**：
- `transform: translateZ(0)` 和 `will-change: transform` 有什么异同？
- 如何利用 DevTools 查看合成层？

**参考资源**：
- [MDN - will-change](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change)

---

### FB-06-CO-P-003：比较 OOCSS、SMACSS、BEM、ITCSS 等 CSS 架构方法论。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：06 HTML/CSS
**标签**：OOCSS、SMACSS、BEM、ITCSS、CSS 架构、方法论
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请比较 OOCSS、SMACSS、BEM、ITCSS 这四种 CSS 架构方法论的核心思想和适用场景。

**参考答案**：

| 方法论 | 核心思想 | 特点 | 适用场景 |
|--------|----------|------|----------|
| **OOCSS** | 结构与皮肤分离、容器与内容分离 | 高度抽象可复用对象，如 `.btn`、`.skin` | 快速构建、组件复用 |
| **SMACSS** | 按功能分类：Base、Layout、Module、State、Theme | 分类清晰，规则轻量化 | 中大型项目 |
| **BEM** | Block-Element-Modifier 命名规范 | 低 specificity、语义明确 | 组件库、团队协作 |
| **ITCSS** | 倒三角分层：Settings、Tools、Generic、Elements、Objects、Components、Utilities | 从上到下 specificity 递增，避免冲突 | 大型项目、设计系统 |

详细说明：

- **OOCSS**：由 Nicole Sullivan 提出，强调不要为特定上下文写样式，而是提取可复用对象。
- **SMACSS**：Jonathan Snook 提出，通过分类降低样式耦合，强调状态类（如 `.is-active`）。
- **BEM**：严格命名规范，使类名自解释，天然适合组件化。
- **ITCSS**：通过分层控制样式加载顺序和 specificity，底层通用、上层具体。

实践中常组合使用，如 BEM + ITCSS + SMACSS 分类。

**评分维度**：
- 准确描述四种方法论核心思想（40%）
- 能比较它们的侧重点（25%）
- 说明适用场景（20%）
- 提到实践中可组合使用（15%）

**常见错误**：
- 只背定义，不理解如何落地
- 认为必须只选一种方法论

**延伸追问**：
- 在你的项目中，如何选择和组合这些方法论？
- 原子化 CSS（Tailwind）是否可以与这些方法论语共存？

**参考资源**：
- [SMACSS 官方](http://smacss.com/)
- [ITCSS 介绍](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)

---

### FB-06-CA-P-001：分析下面复杂选择器的性能问题。

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：06 HTML/CSS
**标签**：选择器性能、渲染引擎、从右向左匹配、CSSOM
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```css
.header .nav ul li a span { color: red; }
body div#content > .sidebar + article p:first-child::first-line { font-size: 20px; }
* { margin: 0; padding: 0; }
```

请分析上述 CSS 选择器可能存在的性能问题，并给出优化建议。

**参考答案**：

CSS 选择器匹配是从右向左进行的（Right-to-Left），以便快速排除不匹配的元素。

问题分析：

1. `.header .nav ul li a span`：
   - 层级过深，浏览器需要从所有 `span` 开始，逐级向上验证祖先。
   - 建议直接使用类名，如 `.nav-link-text { color: red; }`。

2. `body div#content > .sidebar + article p:first-child::first-line`：
   - 过于复杂，包含相邻兄弟选择器、伪类、伪元素。
   - 复杂伪元素匹配成本高。
   - 建议简化，为目标元素直接添加类名。

3. `* { margin: 0; padding: 0; }`：
   - 通配符选择器会匹配所有元素，性能开销大。
   - 建议使用 CSS reset 或 normalize.css，针对具体元素重置。

优化建议：

- 使用扁平、具体的类名选择器。
- 避免深层嵌套和通配符。
- 减少使用昂贵伪类（如 `:nth-child()`、`:not()` 嵌套）。
- 实际性能影响在现代浏览器中通常很小，但简洁选择器仍是最佳实践。

**评分维度**：
- 解释从右向左匹配原理（30%）
- 指出每个选择器的性能问题（30%）
- 给出优化方案（25%）
- 提到现代浏览器已优化，避免过度焦虑（15%）

**常见错误**：
- 认为选择器优化是性能瓶颈的首要关注点
- 完全禁止使用伪类

**延伸追问**：
- CSSOM 构建和选择器匹配发生在渲染流程的哪个阶段？
- 动态添加 class 与直接修改 style 哪个性能更好？

**参考资源**：
- [MDN - CSS 选择器性能](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS)

---

### FB-06-SC-P-001：设计一个企业级多主题切换系统。

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：06 HTML/CSS
**标签**：主题切换、设计 Token、CSS 变量、暗黑模式、Design System
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个企业级前端项目的多主题切换系统，要求支持亮色/暗色主题、品牌色定制，并能与组件库（如 Ant Design、Element Plus）协同。请说明设计思路、技术选型和关键实现。

**参考答案**：

设计思路：

1. **设计 Token 层**：
   - 将颜色、间距、字体、圆角、阴影等抽象为 token。
   - 分为基础 token（如 `--color-blue-500`）和语义化 token（如 `--color-primary`、`--bg-surface`）。

2. **CSS 变量驱动主题**：
   - 使用 CSS 自定义属性作为运行时主题切换的载体。
   - 通过切换 `data-theme` 属性或 `:root` 变量实现主题切换。

3. **主题配置管理**：
   - 提供主题配置文件（JSON/TS），支持编译时和运行时扩展。
   - 使用 postcss、style-dictionary 等工具将 token 同步到设计工具和代码。

4. **组件库协同**：
   - 覆盖组件库 CSS 变量，或通过打包时替换主题变量。
   - 使用 CSS-in-JS 或 CSS Modules 时，将主题 token 注入到主题上下文。

5. **持久化与切换策略**：
   - 监听 `prefers-color-scheme`。
   - 用户手动切换后持久化到 localStorage。
   - 在 `<html>` 上设置 `data-theme`，避免闪烁（FOUC）。

```css
:root {
  --color-primary: #1890ff;
  --bg-surface: #ffffff;
  --text-primary: #000000;
}

[data-theme="dark"] {
  --color-primary: #177ddc;
  --bg-surface: #141414;
  --text-primary: #ffffff;
}
```

```js
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
```

**评分维度**：
- 设计 Token 分层合理（25%）
- 使用 CSS 变量实现运行时切换（25%）
- 考虑组件库协同（20%）
- 处理 FOUC 和持久化（15%）
- 提到品牌色定制和扩展性（15%）

**常见错误**：
- 把主题色写死在组件里
- 切换主题时没有考虑 SSR  hydration 一致性

**延伸追问**：
- 如何在不支持 CSS 变量的旧浏览器中降级？
- 如何为不同业务线提供不同的品牌主题？

**参考资源**：
- [MDN - prefers-color-scheme](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)

---

### FB-06-CP-P-001：CSS 作用域和模块化的演进路线是怎样的？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：06 HTML/CSS
**标签**：CSS 作用域、CSS Modules、Shadow DOM、CSS-in-JS、Scoped CSS
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请梳理 CSS 作用域和模块化技术的演进路线，从早期的全局 CSS 到现代的各类方案，并比较它们的优缺点。

**参考答案**：

演进路线：

1. **全局 CSS（早期）**
   - 所有样式在一个或多个大文件中，通过命名约定避免冲突。
   - 问题：命名冲突、特异性战争、难以维护。

2. **命名方法论（BEM/OOCSS/SMACSS/ITCSS）**
   - 通过命名规范和组织分层降低冲突。
   - 优点：无需工具支持，团队可快速落地。
   - 缺点：依赖人工约束，无法真正隔离。

3. **CSS 预处理器（Sass/Less/Stylus）**
   - 提供变量、嵌套、Mixin、模块化导入。
   - 编译后仍是全局 CSS，需要配合 BEM 等方法论。

4. **CSS Modules**
   - 构建时将类名哈希化，实现局部作用域。
   - 优点：真正的类名隔离，保留 CSS 编写习惯。
   - 缺点：全局样式和 `:global` 需要额外处理。

5. **CSS-in-JS（styled-components/Emotion）**
   - 在 JS 中写样式，运行时生成唯一类名。
   - 优点：动态样式、类型安全、组件作用域。
   - 缺点：运行时开销、包体积、SSR 复杂度。

6. **Shadow DOM / Web Components**
   - 浏览器原生提供的样式隔离机制。
   - 优点：真正的 DOM 和样式隔离。
   - 缺点：跨组件共享样式困难，可访问性和 SEO 需要考虑。

7. **原子化 CSS（Tailwind/UnoCSS）**
   - 通过工具类实现样式复用和隔离。
   - 优点：开发快、包小、一致性好。
   - 缺点：类名冗长、语义弱。

现代项目常组合使用：CSS Modules + CSS 变量 + 原子化工具类。

**评分维度**：
- 梳理演进路线完整（30%）
- 比较各方案优缺点（35%）
- 能结合实际项目说明选型（20%）
- 提到 Shadow DOM 原生隔离（15%）

**常见错误**：
- 认为某种方案绝对优于其他方案
- 忽略 Shadow DOM 的样式隔离特点

**延伸追问**：
- 在微前端架构中，如何处理不同子应用的 CSS 隔离？
- 原生 CSS Scope（`:scope`）和 CSS Nesting 未来会如何改变现状？

**参考资源**：
- [MDN - CSS Scoping](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope)

---

## 架构题

### FB-06-SD-R-001：设计一个企业级组件库的 CSS 架构。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：06 HTML/CSS
**标签**：组件库、CSS 架构、Design Token、CSS 变量、BEM、可扩展性
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个企业级前端组件库（如 Ant Design、Element Plus 级别）的 CSS 架构。需要考虑：样式隔离、主题定制、按需加载、多框架支持、文档和构建。请给出整体架构图和关键技术决策。

**参考答案**：

整体架构分层：

```
┌─────────────────────────────────────┐
│  Theme / Design Token Layer         │  设计 token、品牌定制
├─────────────────────────────────────┤
│  Core Styles / CSS Variables        │  核心变量、全局 reset、工具类
├─────────────────────────────────────┤
│  Component Styles                   │  各组件样式（BEM / CSS Modules）
├─────────────────────────────────────┤
│  Build / Distribution Layer         │  按需加载、less/sass 编译、CSS 变量注入
└─────────────────────────────────────┘
```

关键技术决策：

1. **命名规范**：采用 BEM 或 CSS Modules，确保类名不冲突，保持低 specificity。
2. **设计 Token**：
   - 基础 token（颜色阶梯、间距阶梯）和语义 token（primary、background、text）。
   - 使用 CSS 自定义属性 + Less/Sass 变量双轨，既支持运行时切换又支持编译时覆盖。
3. **主题系统**：
   - 默认提供亮色/暗色主题。
   - 通过构建插件（如 webpack/vite）支持自定义主题变量替换。
4. **样式隔离**：
   - 组件内部使用 BEM 命名空间。
   - 可选 CSS Modules 或 Shadow DOM（Web Components 场景）。
5. **按需加载**：
   - 组件样式与 JS 组件同目录，构建工具自动引入。
   - 提供 unplugin 插件实现自动导入。
6. **多框架支持**：
   - CSS 层与框架无关，仅通过 CSS 变量和 class 接口暴露。
   - React/Vue 组件分别封装，样式复用。
7. **构建与分发**：
   - 输出 es、cjs、umd 及独立 css 文件。
   - 提供全量 CSS 和按需 CSS 两种产物。
8. **文档与一致性**：
   - 使用 Storybook/dumi 展示组件和主题切换。
   - 通过 stylelint、设计 token 校验保障一致性。

示例变量结构：

```css
:root {
  --color-primary: #1890ff;
  --color-primary-hover: #40a9ff;
  --border-radius-base: 4px;
  --spacing-unit: 4px;
}
```

**评分维度**：
- 架构分层清晰（25%）
- 命名规范和隔离方案合理（20%）
- 主题/token 设计可扩展（25%）
- 按需加载和多框架支持考虑周全（15%）
- 构建、文档、质量保障提到（15%）

**常见错误**：
- 只关注组件样式，忽略 token 层和构建层
- 过度设计，未考虑实际维护成本

**延伸追问**：
- 如何平衡组件样式的可定制性与一致性？
- 组件库升级时如何保证样式不破坏业务方？

**参考资源**：
- [Ant Design 设计](https://ant.design/docs/spec/introduce)

---

### FB-06-EN-R-001：如何在大型前端项目中管理 CSS？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：06 HTML/CSS
**标签**：CSS 工程化、Monorepo、样式管理、Stylelint、构建工具
**出现频率**：高频
**预计回答时长**：10-20 分钟

**题目描述**：
在大型前端项目中，CSS 往往面临命名冲突、文件膨胀、主题不一致、性能下降等问题。请从工程化角度给出 CSS 管理方案。

**参考答案**：

大型项目 CSS 管理方案：

1. **规范与方法论**
   - 统一采用 BEM / ITCSS / CUBE CSS 等方法论。
   - 制定团队 CSS 编写规范，纳入 Code Review  checklist。

2. **样式隔离**
   - 业务组件使用 CSS Modules 或 Scoped CSS。
   - 公共组件库使用 BEM 命名空间。
   - 微前端场景使用 Shadow DOM 或 CSS Module 前缀隔离。

3. **设计 Token**
   - 统一管理颜色、间距、字体、阴影等 token。
   - 使用 style-dictionary 同步到设计工具、代码、文档。

4. **构建工具链**
   - 使用 PostCSS 处理嵌套、变量、autoprefixer。
   - 配置 stylelint 校验命名、属性顺序、禁用属性。
   - 使用 unplugin 实现组件和样式按需加载。

5. **性能优化**
   - 提取 Critical CSS。
   - 构建时分析未使用样式（PurgeCSS / UnoCSS JIT）。
   - 按路由/页面拆分 CSS。

6. **主题与国际化**
   - CSS 变量驱动主题，避免多套样式文件。
   - RTL 通过 `dir="rtl"` 和逻辑属性（logical properties）支持。

7. **监控与治理**
   - 统计 CSS 体积增长。
   - 定期清理 dead code 和重复样式。
   - 建立样式变更影响面评估流程。

```json
// stylelint.config.json 示例
{
  "extends": ["stylelint-config-standard", "stylelint-config-recess-order"],
  "rules": {
    "selector-class-pattern": "^[a-z][a-zA-Z0-9_-]+$",
    "no-descending-specificity": true
  }
}
```

**评分维度**：
- 方法论和规范（20%）
- 样式隔离方案（20%）
- 设计 Token 和工具链（20%）
- 性能与主题国际化（20%）
- 监控与治理（20%）

**常见错误**：
- 只关注代码层面，忽略团队协作和治理
- 引入过多工具导致团队学习成本过高

**延伸追问**：
- 微前端场景下如何防止样式污染？
- 如何量化 CSS 债务并制定偿还计划？

**参考资源**：
- [stylelint 文档](https://stylelint.io/)

---

### FB-06-PE-R-001：设计一个首屏渲染 CSS 优化方案。

**题型**：性能优化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：06 HTML/CSS
**标签**：首屏优化、Critical CSS、FOUC、渲染阻塞、性能预算
**出现频率**：高频
**预计回答时长**：10-20 分钟

**题目描述**：
某电商首页首屏加载速度慢，LCP 和 FCP 不达标。请设计一个针对 CSS 的首屏渲染优化方案。

**参考答案**：

优化方案：

1. **识别首屏内容**
   - 确定首屏包含的组件：导航、Banner、商品卡片首行、搜索框等。
   - 使用 Chrome DevTools 的 Coverage 工具找出未使用 CSS。

2. **提取 Critical CSS**
   - 使用 Critical/Penthouse 按视口尺寸（如 375x667、1440x900）提取首屏 CSS。
   - 将 Critical CSS 内联到 `<head>` 的 `<style>` 中。
   - 控制大小在 14KB gzip 以内，避免超过一个 TCP 慢启动窗口。

3. **异步加载非关键 CSS**
   ```html
   <link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
   <noscript><link rel="stylesheet" href="non-critical.css"></noscript>
   ```

4. **避免 CSS 阻塞**
   - 移除未使用的 CSS。
   - 合并和压缩 CSS 文件。
   - 避免 `@import`，使用 `<link>` 并行加载。

5. **字体加载优化**
   - 使用 `font-display: swap`。
   - 仅预加载首屏必需字体子集。

6. **防止 FOUC**
   - 内联 Critical CSS 保证首屏样式立即可用。
   - 异步 CSS 加载完成前避免内容可见性突变。

7. **建立性能预算**
   - CSS 总大小预算、Critical CSS 大小预算、首屏请求数预算。
   - CI 中集成 Lighthouse 和性能回归检测。

8. **SSR/SSG 配合**
   - 服务端渲染时直接输出内联样式。
   - 客户端 hydration 后切换为完整样式表。

**评分维度**：
- Critical CSS 提取和内联（25%）
- 异步加载策略（20%）
- 字体和 FOUC 处理（15%）
- 性能预算和监控（20%）
- SSR/SSG 协同（20%）

**常见错误**：
- 只压缩不内联，仍然阻塞首次渲染
- Critical CSS 过大，反而阻塞渲染

**延伸追问**：
- 如何在持续迭代中保证 Critical CSS 不膨胀？
- 如何衡量优化后的 LCP 和 FCP 收益？

**参考资源**：
- [web.dev - Optimize LCP](https://web.dev/articles/optimize-lcp)

---

### FB-06-SD-R-002：设计一个跨团队的 Design Token 体系。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：06 HTML/CSS
**标签**：Design Token、设计系统、跨团队、style-dictionary、主题
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
某公司多个前端团队、设计团队共用一套设计系统，但各自维护颜色和样式，导致不一致。请设计一个跨团队的 Design Token 体系，保证设计到开发的一致性。

**参考答案**：

Design Token 体系设计：

1. **Token 分层**
   - **基础 Token（Primitive）**：品牌色板、灰阶、字体族、间距阶梯等，如 `color-blue-500`。
   - **语义 Token（Semantic）**：与用途绑定，如 `color-primary`、`bg-surface`、`text-error`。
   - **组件 Token（Component）**：具体组件使用的 token，如 `button-primary-bg`、`input-border-color`。

2. **统一管理平台**
   - 使用 Figma Tokens Studio、Zeroheight 或自研平台管理 token。
   - 版本化发布，支持主题和品牌定制。

3. **代码同步工具**
   - 使用 style-dictionary 将 JSON/YAML token 转换为：
     - CSS 自定义属性
     - Sass/Less 变量
     - iOS/Android/小程序变量
     - TypeScript 类型定义

4. **命名与结构**
   - 采用分类前缀：`color-`、`space-`、`radius-`、`shadow-`。
   - 支持平台和主题维度：`color-primary-light`、`color-primary-dark`。

5. **消费方式**
   - Web：CSS 变量 + Sass 变量双轨。
   - 设计工具：Figma Variables / Tokens Studio 同步。
   - 文档站点：自动展示 token 值和使用示例。

6. **治理与变更流程**
   - Token 变更需走设计委员会评审。
   - 发布前进行影响面分析。
   - CI 校验代码中是否使用了未注册 token。

```json
{
  "color": {
    "primary": {
      "light": { "value": "#1890ff" },
      "dark": { "value": "#177ddc" }
    }
  }
}
```

**评分维度**：
- Token 分层清晰（25%）
- 跨平台同步方案（20%）
- 工具链选型合理（20%）
- 治理和变更流程（20%）
- 主题和品牌扩展性（15%）

**常见错误**：
- Token 层级混乱，基础与语义 token 混用
- 忽略设计工具到代码的同步

**延伸追问**：
- 如何处理不同业务线对同一 token 的定制需求？
- Token 更新后，如何通知所有消费方升级？

**参考资源**：
- [Style Dictionary 文档](https://amzn.github.io/style-dictionary/)

---

### FB-06-CP-R-001：原子化 CSS 与语义化类名如何权衡与选型？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：06 HTML/CSS
**标签**：原子化 CSS、语义化类名、Tailwind、BEM、架构决策
**出现频率**：中频
**预计回答时长**：10-20 分钟

**题目描述**：
原子化 CSS（如 Tailwind）和语义化类名（如 BEM）各有优劣。请结合实际项目场景，说明如何权衡和选型，并给出组合使用策略。

**参考答案**：

选型维度对比：

| 维度 | 原子化 CSS | 语义化类名（BEM） |
|------|------------|-------------------|
| 开发速度 | 快，无需写 CSS | 中等，需要命名和编写 |
| 一致性 | 高，基于设计 token | 依赖团队规范 |
| 可维护性 | 组件复用度高，但类名冗长 | 语义清晰，长期维护好 |
| 包体积 | JIT 模式下很小 | 依赖项目治理 |
| 学习成本 | 高（记忆工具类） | 低（理解命名规范） |
| 适用场景 | 快速迭代、设计系统成熟 | 复杂组件库、长期维护 |

选型建议：

1. **toC 快速迭代业务**：原子化 CSS 更合适，开发效率高，视觉一致性好。
2. **企业级组件库 / 设计系统**：语义化类名 + BEM，便于外部理解和覆盖。
3. **混合策略**：
   - 基础布局和通用样式使用原子化工具类。
   - 复杂组件和需要被覆盖的样式使用 BEM / CSS Modules。
   - 主题和 token 通过 CSS 变量统一管理。

组合使用示例：

```html
<!-- 原子化 + 语义化 -->
<div class="card card--featured">
  <h2 class="text-lg font-bold text-gray-900 card__title">Title</h2>
  <p class="mt-2 text-sm text-gray-600 card__desc">Description</p>
</div>
```

其中 `.card` 是语义化组件类，`.text-lg`、`.mt-2` 是原子化工具类。

**评分维度**：
- 客观对比两者优劣（30%）
- 给出不同场景选型建议（25%）
- 提出组合使用策略（25%）
- 考虑团队接受度和迁移成本（20%）

**常见错误**：
- 非黑即白，认为只能二选一
- 忽略原子化 CSS 对设计系统成熟度的要求

**延伸追问**：
- 如果团队已使用 BEM，如何渐进式引入 Tailwind？
- 原子化 CSS 如何支持复杂的交互状态（如 hover/focus）？

**参考资源**：
- [Tailwind CSS - Utility-first](https://tailwindcss.com/docs/utility-first)

---

### FB-06-SC-R-001：如何设计一个支持 RTL、暗黑模式、多尺寸的主题系统？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：06 HTML/CSS
**标签**：RTL、暗黑模式、主题系统、CSS 变量、逻辑属性、多尺寸
**出现频率**：中频
**预计回答时长**：10-20 分钟

**题目描述**：
请设计一个国际化产品的主题系统，要求同时支持：
1. 亮色/暗色模式；
2. RTL（从右到左）语言布局；
3. 紧凑/舒适/默认三种密度尺寸。
请说明关键实现思路和技术选型。

**参考答案**：

设计思路：

1. **CSS 变量驱动主题**
   - 使用 `:root`、`[data-theme="dark"]`、`[data-theme="light"]` 定义颜色变量。
   - 使用 `[data-density="compact"]` 等定义间距/字体尺寸变量。

2. **颜色 token 设计**
   - 语义化 token：`--bg-surface`、`--text-primary`、`--border-default`。
   - 每个主题下重新赋值这些语义 token。

3. **RTL 支持**
   - 使用 CSS 逻辑属性：`inline-start`、`inline-end`、`margin-inline-start`。
   - 或通过 PostCSS RTLCSS 插件自动转换物理属性为 RTL 版本。
   - 在 `<html dir="rtl">` 下切换，配合 `[dir="rtl"] &` 覆盖。

4. **密度尺寸**
   - 定义基础间距单位 `--space-unit`。
   - compact 模式下 `--space-unit: 4px`，default 为 `8px`，comfortable 为 `12px`。
   - 组件间距使用 `calc(var(--space-unit) * n)`。

5. **JS 状态管理**
   - 监听 `prefers-color-scheme`。
   - 用户偏好持久化到 localStorage/cookie。
   - SSR 时在服务端注入初始主题属性，避免 hydration 不匹配。

```css
:root {
  --bg-surface: #ffffff;
  --text-primary: #000000;
  --space-unit: 8px;
}

[data-theme="dark"] {
  --bg-surface: #141414;
  --text-primary: #ffffff;
}

[data-density="compact"] {
  --space-unit: 4px;
}

.card {
  background: var(--bg-surface);
  color: var(--text-primary);
  padding: calc(var(--space-unit) * 2);
  margin-inline-start: calc(var(--space-unit) * 3);
}
```

**评分维度**：
- 颜色主题方案（25%）
- RTL 实现思路（25%）
- 密度尺寸方案（20%）
- SSR/hydration 一致性（15%）
- 可维护性和扩展性（15%）

**常见错误**：
- 只支持颜色主题，忽略 RTL 和密度
- 使用物理属性（left/right）导致 RTL 适配困难

**延伸追问**：
- 如何处理图标在 RTL 布局中的翻转？
- 复杂组件（如时间轴、步骤条）在 RTL 下如何适配？

**参考资源**：
- [MDN - CSS Logical Properties](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_logical_properties_and_values)

---

### FB-06-EN-R-002：在 Monorepo 中如何组织样式代码和防止样式污染？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：06 HTML/CSS
**标签**：Monorepo、样式组织、样式隔离、共享样式、构建工具
**出现频率**：中频
**预计回答时长**：10-20 分钟

**题目描述**：
在一个 Monorepo 中，包含多个应用（apps）和多个共享 UI 包（packages）。请设计样式代码的组织方式，并说明如何防止跨包样式污染。

**参考答案**：

Monorepo 样式组织方案：

1. **目录结构**
   ```
   packages/
     ui-core/          # 基础样式、CSS 变量、reset
     ui-components/    # 组件样式
     ui-icons/         # 图标样式
   apps/
     admin/            # 业务应用样式
     mobile/
   ```

2. **共享样式包**
   - `ui-core` 提供全局变量、mixins、工具类、reset。
   - 各组件包导入 `ui-core` 的变量，保持 token 一致。

3. **样式隔离策略**
   - **BEM 命名空间**：每个包使用包前缀，如 `.uc-button`、`.admin-header`。
   - **CSS Modules**：业务组件使用局部作用域样式。
   - **Shadow DOM**：Web Components 场景使用原生隔离。
   - **构建时前缀**：通过 PostCSS 为每个包自动添加 scope 前缀。

4. **构建与消费**
   - 组件库同时输出 JS 和 CSS，支持按需导入。
   - 使用 pnpm workspace 和 changeset 管理版本。
   - 构建工具（Vite/rollup）处理 Sass/Less/PostCSS。

5. **防止污染机制**
   - 禁止使用 `* { ... }` 全局 reset，改用具体选择器或 normalize。
   - 业务样式不得覆盖组件库内部类名。
   - 建立 stylelint 规则，禁止跨包选择器覆盖。
   - 运行时可通过 CSS 变量和组件暴露的 CSS 自定义属性进行安全覆盖。

6. **主题与定制**
   - 设计 token 放在 `ui-core`，各包消费。
   - 应用层通过 `:root` 或 `data-theme` 覆盖 token。

```css
/* ui-core/variables.css */
:root {
  --uc-color-primary: #1890ff;
}

/* ui-components/button.css */
.uc-button {
  background: var(--uc-color-primary);
}
```

**评分维度**：
- Monorepo 目录结构合理（20%）
- 共享样式和 token 设计（20%）
- 样式隔离策略多样（25%）
- 构建与消费方式（15%）
- 防污染治理机制（20%）

**常见错误**：
- 各包独立维护 token，导致不一致
- 业务样式直接覆盖组件库内部类名

**延伸追问**：
- 微前端与 Monorepo 样式隔离有什么不同？
- 如何监控跨包样式冲突？

**参考资源**：
- [Turborepo 样式管理最佳实践](https://turbo.build/repo/docs/handbook/tools/eslint)

---

