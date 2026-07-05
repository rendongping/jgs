# 设计系统与组件库 面试题

> 本题库共收录 **95** 道面试题（基础 23 / 进阶 24 / 深入 24 / 架构 24）。
> 本文件收录设计系统（Design System）与组件库（Component Library）相关面试题，目标题量 40 道。
> 题型覆盖：概念题、场景设计题、系统设计题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（10 道）{#basic}

### FB-14-CO-B-001：什么是 Design Token？它解决了什么问题？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：Design Token、设计变量、主题、一致性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Design Token 的概念，并说明它在前端组件库中的作用。

**参考答案**：

Design Token 是设计系统中用于存储视觉设计原子值（如颜色、字体、间距、圆角、阴影等）的命名变量。它们以平台无关的格式（通常是 JSON/YAML）定义，再派生为各端代码变量（CSS 自定义属性、Sass 变量、JS 对象等）。

解决的问题：

1. **设计与研发同源**：设计师和开发者引用同一份 Token，避免"设计稿与代码各写各的"。
2. **主题切换**：通过替换 Token 值即可实现浅色/深色/品牌主题，无需改动组件代码。
3. **一致性**：统一产品视觉语言，避免硬编码色值导致风格漂移。
4. **可维护性**：全局样式变更只需改 Token 源文件。

```css
/* 由 Token 生成的 CSS 变量 */
:root {
  --color-primary-500: #1677ff;
  --spacing-md: 16px;
  --radius-base: 4px;
}

.button {
  background: var(--color-primary-500);
  padding: var(--spacing-md);
  border-radius: var(--radius-base);
}
```

**评分维度**：
- 概念准确性（40%）：能否说清 Token 是命名化的设计原子值
- 解决的问题（40%）：一致性、主题、同源、可维护性
- 举例能力（20%）：能否举出颜色/间距/圆角等 Token 示例

**常见错误**：
- 把 Design Token 简单等同于 CSS 变量
- 认为 Token 只包含颜色，忽略 spacing、typography、shadow 等维度

**延伸追问**：
- Token 一般分为哪几个层级？（如 global、alias、component-specific）
- 多主题下如何让 Token 值跟随主题切换？

**参考资源**：
- [W3C Design Tokens Community Group](https://www.w3.org/community/designtokens/)
- [Salesforce Lightning Design System - Tokens](https://www.lightningdesignsystem.com/design-tokens/)

**口头回答版**：
> Design Token 是设计系统中用于存储视觉设计原子值（如颜色、字体、间距、圆角、阴影等）的命名变量。 它们以平台无关的格式（通常是 JSON/YAML）定义，再派生为各端代码变量（CSS 自定义属性、Sass 变量、JS 对象等）。 设计与研发同源：设计师和开发者引用同一份 Token，避免"设计稿与代码各写各的"。 主题切换：通过替换 Token 值即可实现浅色/深色/品牌主题，无需改动组件代码。

---

### FB-14-CO-B-002：原子设计（Atomic Design）的五个层级是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：Atomic Design、组件分层、设计方法论
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Atomic Design 的五个层级，并举例说明每个层级在前端组件库中的对应物。

**参考答案**：

Atomic Design 由 Brad Frost 提出，将 UI 拆分为五个由小到大、逐层组合的层级：

1. **Atoms（原子）**：不可再分的基础元素，如颜色、字体、按钮、输入框、图标。
2. **Molecules（分子）**：由多个原子组成的简单组件，如搜索框（Input + Button）、标签页头。
3. **Organisms（有机体/组织）**：相对复杂的组件组合，如导航栏、卡片、表单区块。
4. **Templates（模板）**：页面级骨架，由多个 Organisms 组成，定义内容布局但不含真实数据。
5. **Pages（页面）**：填充真实数据后的完整页面，是 Template 的实例。

前端对应示例：

```text
Atoms    -> Button、Input、Typography
Molecules -> SearchBar、FormItem
Organisms -> NavBar、ProductCard
Templates -> DashboardLayout、LoginPageLayout
Pages     -> HomePage、ProfilePage
```

**评分维度**：
- 五个层级名称与含义（50%）
- 各层级能举出组件示例（30%）
- 理解分层组合思想（20%）

**常见错误**：
- 把"页面"和"模板"混为一谈
- 认为层级必须严格对应代码目录，忽略它是一种设计思维

**延伸追问**：
- 原子设计是否适合所有业务组件库？有什么缺点？
- 你们项目中 Button 属于 Atom 还是 Molecule？

**参考资源**：
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)

**口头回答版**：
> Atomic Design 由 Brad Frost 提出，将 UI 拆分为五个由小到大、逐层组合的层级： Atoms（原子）：不可再分的基础元素，如颜色、字体、按钮、输入框、图标。 Molecules（分子）：由多个原子组成的简单组件，如搜索框（Input + Button）、标签页头。 Organisms（有机体/组织）：相对复杂的组件组合，如导航栏、卡片、表单区块。

---

### FB-14-CO-B-003：什么是受控组件（Controlled）和非受控组件（Uncontrolled）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：受控组件、非受控组件、状态管理、表单
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释受控组件和非控组件的区别，并说明在组件库设计中如何选择。

**参考答案**：

- **受控组件**：组件的显示状态由外部传入的 `value` / `onChange` 控制，组件本身不持有状态。
- **非受控组件**：组件内部自行管理状态，外部通过 `defaultValue` 或 ref 读取/操作。

```jsx
// 受控
<Input value={text} onChange={e => setText(e.target.value)} />

// 非受控
<Input defaultValue="hello" />
```

选择原则：

- 需要实时校验、联动、提交前处理的场景优先使用**受控**。
- 简单表单、快速使用、不希望父组件介入过多时可用**非受控**。
- 组件库通常**同时支持两种模式**以兼顾灵活性与易用性。

**评分维度**：
- 概念区分（50%）：value/defaultValue、onChange 的差异
- 使用场景（30%）：何时用受控，何时用非受控
- 组件库设计考量（20%）：是否应同时支持两种模式

**常见错误**：
- 认为组件库只需要受控组件
- 混淆 `defaultValue` 和 `value` 的生效时机

**延伸追问**：
- 同时支持受控和非受控时，内部状态如何设计？
- React 中如何判断当前是受控还是非受控？

**参考资源**：
- [React Docs - Controlled vs Uncontrolled Components](https://react.dev/learn/thinking-in-react#step-5-add-inverse-data-flow)

**口头回答版**：
> - 受控组件：组件的显示状态由外部传入的 value / onChange 控制，组件本身不持有状态。 - 非受控组件：组件内部自行管理状态，外部通过 defaultValue 或 ref 读取/操作。 - 需要实时校验、联动、提交前处理的场景优先使用受控。 - 简单表单、快速使用、不希望父组件介入过多时可用非受控。

---

### FB-14-CO-B-004：组件库 API 命名应该遵循哪些约定？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：API 设计、命名规范、组件库
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举组件库公共 API 命名时应遵循的通用约定，并举例说明。

**参考答案**：

1. **语义清晰**：props 名称应自解释，如 `disabled`、`loading`、`size`、`variant`。
2. **避免缩写**：使用 `buttonText` 而非 `btnTxt`，`children` 保持 React 约定。
3. **布尔属性采用正向语义**：`disabled` 优于 `notEnabled`；需要否定时用 `unmountOnExit` 等明确表达。
4. **事件回调以 `on` 开头**：`onClick`、`onChange`、`onVisibleChange`。
5. **受控/非受控配对**：`value` + `defaultValue`、`open` + `defaultOpen`。
6. **样式相关属性统一**：`className`、`style` 保持框架原生约定；设计系统属性用 `size`、`type`、`status`。
7. **避免暴露内部实现**：如不用 `antdPrefixCls`，而统一通过 ConfigProvider 配置。

```jsx
<Button type="primary" size="large" loading disabled>
  Submit
</Button>

<Modal open={visible} onCancel={handleCancel} okText="确认" />
```

**评分维度**：
- 命名清晰度（40%）
- 事件与受控配对约定（30%）
- 实际举例能力（30%）

**常见错误**：
- 使用拼音或内部黑话命名
- 同一个概念在不同组件中命名不一致（如 `size` vs `dimension`）

**延伸追问**：
- 如何处理 `visible` 与 `open` 这类历史遗留命名冲突？
- 跨组件的相同语义属性命名不一致时如何治理？

**口头回答版**：
> 语义清晰：props 名称应自解释，如 disabled、loading、size、variant。 避免缩写：使用 buttonText 而非 btnTxt，children 保持 React 约定。 布尔属性采用正向语义：disabled 优于 notEnabled；需要否定时用 unmountOnExit 等明确表达。 事件回调以 on 开头：onClick、onChange、onVisibleChange。

---

### FB-14-CO-B-005：组件库中为什么要关注可访问性（a11y）？基础做法有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：可访问性、a11y、ARIA、键盘导航
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明在组件库中关注可访问性的原因，并列举至少 5 个基础做法。

**参考答案**：

原因：

1. 满足法律法规与企业合规要求（如 WCAG 2.1 AA）。
2. 提升产品覆盖人群（视障、行动不便、老年用户）。
3. 改善所有用户的体验（键盘党、搜索引擎、自动化测试）。

基础做法：

1. 使用语义化 HTML（`<button>`、`<nav>`、`<main>`）。
2. 为自定义组件补充 `role`、`aria-*` 属性。
3. 保证键盘可达与可操作（Tab 顺序、Enter/Space 触发）。
4. 提供焦点样式（`:focus-visible`）。
5. 为图片/图标提供替代文本或 `aria-label`。
6. 保证颜色对比度符合 WCAG 标准。
7. 弹窗/浮层使用焦点管理与 `aria-hidden`。

```jsx
<button aria-label="关闭" onClick={onClose}>
  <CloseIcon aria-hidden="true" />
</button>
```

**评分维度**：
- 可访问性价值（30%）
- 基础做法覆盖度（50%）
- 能否写出 ARIA 示例（20%）

**常见错误**：
- 认为可访问性只服务于视障用户
- 滥用 `div` + `onClick` 代替原生按钮

**延伸追问**：
- 如何测试组件的可访问性？
- 自定义 Select 组件需要考虑哪些 ARIA 属性？

**参考资源**：
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN - ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

**口头回答版**：
> 满足法律法规与企业合规要求（如 WCAG 2.1 AA）。 提升产品覆盖人群（视障、行动不便、老年用户）。 改善所有用户的体验（键盘党、搜索引擎、自动化测试）。 使用语义化 HTML（`<button>`、`<nav>`、`<main>`）。

---

### FB-14-CO-B-006：主题切换在前端有哪些实现方式？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：主题切换、CSS 变量、Dark Mode、class 主题
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举前端实现主题切换（含深色模式）的常见方式，并比较它们的优缺点。

**参考答案**：

常见方式：

1. **CSS 自定义属性（推荐）**
   - 优点：运行时切换无闪烁、无 JS 重新渲染、性能高。
   - 缺点：IE11 不支持（现代项目通常可接受）。

2. **class 主题切换**
   - 在 `html` 或容器元素上切换主题 class，CSS 选择器依赖该 class。
   - 优点：兼容性好、可结合预处理器。
   - 缺点：选择器冗长、灵活性不如 CSS 变量。

3. **CSS-in-JS 动态注入**
   - 通过主题对象动态生成样式。
   - 优点：类型安全、与组件同构。
   - 缺点：运行时开销大、SSR 水合风险。

4. **加载不同 CSS 文件**
   - 切换时替换 link 标签。
   - 优点：简单直接。
   - 缺点：切换时可能闪烁、请求额外资源。

```css
:root {
  --bg: #fff;
  --text: #000;
}

[data-theme="dark"] {
  --bg: #000;
  --text: #fff;
}
```

**评分维度**：
- 列出 3 种以上方式（40%）
- 比较优缺点（40%）
- 给出推荐方案及理由（20%）

**常见错误**：
- 忽略 SSR/首屏闪烁（FOUC）问题
- 认为 CSS-in-JS 一定优于 CSS 变量

**延伸追问**：
- 如何根据系统主题偏好自动初始化？
- 主题切换时如何让图表/图片也跟随变化？

**口头回答版**：
> CSS 自定义属性（推荐） - 优点：运行时切换无闪烁、无 JS 重新渲染、性能高。 - 缺点：IE11 不支持（现代项目通常可接受）。 class 主题切换

---

### FB-14-CO-B-007：组合（Composition）与配置（Configuration）式组件有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：组合模式、配置式、组件设计、灵活性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释组合式组件与配置式组件的区别，并各举一个例子。

**参考答案**：

- **配置式组件**：通过大量 props 控制内部渲染，API 集中但灵活性受限。

```jsx
<Table
  columns={columns}
  dataSource={data}
  pagination=&#123;&#123; pageSize: 10 &#125;&#125;
  rowSelection=&#123;&#123; type: 'checkbox' &#125;&#125;
/>
```

- **组合式组件**：将 UI 拆分为多个可自由组合的子组件，通过 `children` 或显式插槽拼装。

```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Age</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.age}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

对比：

- 配置式上手快、API 收敛，适合通用场景；扩展点有限。
- 组合式灵活、可定制性强，但学习成本略高、代码量更多。
- 组件库通常二者结合：底层组合，上层封装配置式。

**评分维度**：
- 概念区分（40%）
- 各举一例（30%）
- 使用场景分析（30%）

**常见错误**：
- 认为组合式一定优于配置式
- 忽略组件库应面向不同开发者提供分层 API

**延伸追问**：
- Tabs 组件用组合式和配置式分别怎么设计？
- 如何在组合式组件中保持样式与行为一致性？

**口头回答版**：
> - 配置式组件：通过大量 props 控制内部渲染，API 集中但灵活性受限。 - 组合式组件：将 UI 拆分为多个可自由组合的子组件，通过 children 或显式插槽拼装。 - 配置式上手快、API 收敛，适合通用场景；扩展点有限。 - 组合式灵活、可定制性强，但学习成本略高、代码量更多。

---

### FB-14-CO-B-008：BEM 命名规范是什么？在组件库 CSS 架构中如何应用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：BEM、CSS 命名、CSS 架构、命名空间
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 BEM 命名规范，并说明在组件库中如何使用它来避免样式冲突。

**参考答案**：

BEM 是 Block-Element-Modifier 的缩写：

- **Block**：独立的组件块，如 `.btn`、`.card`。
- **Element**：块内部的子元素，用 `__` 连接，如 `.btn__icon`、`.card__title`。
- **Modifier**：状态或变体，用 `--` 连接，如 `.btn--primary`、`.btn--disabled`。

组件库应用：

```css
.ds-btn { }
.ds-btn__icon { }
.ds-btn__text { }
.ds-btn--primary { }
.ds-btn--large { }
.ds-btn--disabled { }
```

为避免全局冲突，组件库通常还会加**统一前缀**（如 `ds-`、组件库名缩写），并通过构建工具生成哈希类名（CSS Modules）作为补充。

**评分维度**：
- BEM 三层含义（40%）
- 能写出规范示例（30%）
- 提到前缀/命名空间避免冲突（30%）

**常见错误**：
- 层级过深，如 `.block__elem__sub__item`
- 在 Element 上再嵌套 Block，破坏语义

**延伸追问**：
- BEM 和 CSS Modules 可以如何结合？
- 原子化 CSS（如 Tailwind）是否还需要 BEM？

**口头回答版**：
> BEM 是 Block-Element-Modifier 的缩写： - Block：独立的组件块，如 .btn、.card。 - Element：块内部的子元素，用 __ 连接，如 .btn__icon、.card__title。 - Modifier：状态或变体，用 -- 连接，如 .btn--primary、.btn--disabled。

---

### FB-14-CO-B-009：Storybook 在组件库开发中的主要作用是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：Storybook、组件文档、视觉回归、开发环境
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Storybook 在组件库开发与维护中的主要用途。

**参考答案**：

Storybook 是组件库的独立开发与文档展示环境，主要作用：

1. **隔离开发**：无需启动完整应用即可单独开发、调试组件。
2. **交互文档**：通过 Stories 展示组件各状态与用法，作为设计与研发的单一事实来源。
3. **设计评审**：设计师可在浏览器中直接查看组件，减少设计与实现偏差。
4. **自动化测试**：
   - 视觉回归测试（Chromatic、Loki）
   - 交互测试（@storybook/addon-interactions）
   - 可访问性测试（@storybook/addon-a11y）
5. **文档生成**：可自动输出 Props 表、设计 Token 文档。

```jsx
// Button.stories.jsx
export const Primary = {
  args: { type: 'primary', children: 'Hello' },
};
```

**评分维度**：
- 说出 3 个以上核心作用（50%）
- 提到文档与测试价值（30%）
- 能写简单 Story 示例（20%）

**常见错误**：
- 认为 Storybook 只是写文档的工具
- 忽略其在视觉回归和交互测试中的作用

**延伸追问**：
- 如何在 Storybook 中切换主题？
- Storybook 的 Stories 如何与单元测试共享？

**参考资源**：
- [Storybook 官方文档](https://storybook.js.org/)

**口头回答版**：
> Storybook 是组件库的独立开发与文档展示环境，主要作用： 隔离开发：无需启动完整应用即可单独开发、调试组件。 交互文档：通过 Stories 展示组件各状态与用法，作为设计与研发的单一事实来源。 设计评审：设计师可在浏览器中直接查看组件，减少设计与实现偏差。

---

### FB-14-CO-B-010：组件库版本号为什么要遵循语义化版本（SemVer）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：SemVer、版本管理、破坏性变更、依赖升级
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 SemVer 版本号格式 `MAJOR.MINOR.PATCH`，并说明组件库为什么需要遵循它。

**参考答案**：

SemVer 格式 `MAJOR.MINOR.PATCH`：

- **MAJOR**：破坏性变更（Breaking Change），不兼容的 API 修改。
- **MINOR**：向后兼容的功能新增。
- **PATCH**：向后兼容的问题修复。

组件库遵循 SemVer 的原因：

1. 使用者可以安全地升级 PATCH / MINOR 版本，无需修改业务代码。
2. 明确告知用户何时存在破坏性变更，降低升级风险。
3. 便于自动化工具（如 renovate、dependabot）判断升级安全级别。
4. 在大型组织内维护多团队协作时，版本语义是沟通契约。

**评分维度**：
- 三段含义（40%）
- 对组件库用户的意义（40%）
- 能否举例说明升级策略（20%）

**常见错误**：
- 把新功能发布为 PATCH
- 认为小改动都不算 Breaking Change

**延伸追问**：
- 什么是 0.x 版本的 SemVer 约定？
- 如何判定一次 API 修改是否属于 Breaking Change？

**参考资源**：
- [SemVer 规范](https://semver.org/lang/zh-CN/)

---

## 进阶题（10 道）{#advanced}

**口头回答版**：
> SemVer 格式 MAJOR.MINOR.PATCH： - MAJOR：破坏性变更（Breaking Change），不兼容的 API 修改。 - MINOR：向后兼容的功能新增。 - PATCH：向后兼容的问题修复。

### FB-14-SC-A-001：如何基于 Design Token 实现多主题切换？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Design Token、多主题、CSS 变量、主题系统
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
假设你正在设计一个企业级组件库，需要支持浅色、深色以及多个品牌主题。请描述基于 Design Token 的主题切换方案。

**参考答案**：

方案分为 Token 层、构建层、运行时层：

1. **Token 分层设计**
   - **Global Token**：原始调色板、字体、间距等全局基础值。
   - **Alias Token**：语义化别名，如 `--color-bg-default`、 `--color-text-primary`。
   - **Component Token**：组件级 Token，如 `--button-bg-primary`。

2. **主题数据源**
   - 以 JSON 维护各主题：`light.json`、`dark.json`、`brand-a.json`。
   - 使用 Style Dictionary 或 Theo 生成各平台变量。

3. **运行时切换**
   - 在 `:root` 或 `[data-theme]` 下注入对应 CSS 变量。
   - 通过 JS 切换 `document.documentElement.dataset.theme`。

```json
// tokens/themes/light.json
{
  "color": {
    "bg": { "default": { "value": "#ffffff" } },
    "text": { "primary": { "value": "#1f1f1f" } }
  }
}
```

```css
:root {
  --color-bg-default: #ffffff;
  --color-text-primary: #1f1f1f;
}

[data-theme="dark"] {
  --color-bg-default: #141414;
  --color-text-primary: #e0e0e0;
}
```

4. **SSR / 首屏优化**
   - 通过内联脚本在 `<head>` 中读取本地存储/系统偏好设置主题，避免 FOUC。

**评分维度**：
- Token 分层设计（30%）
- 主题数据与构建流程（30%）
- 运行时切换机制（25%）
- SSR/FOUC 处理（15%）

**常见错误**：
- 所有颜色直接映射 Global Token，缺少语义层
- 主题切换依赖 React 状态重渲染，导致闪烁

**延伸追问**：
- 如何让第三方业务组件也能消费你的 Token？
- 如何实现局部主题（某一块区域用不同主题）？

**口头回答版**：
> 方案分为 Token 层、构建层、运行时层： Token 分层设计 - Global Token：原始调色板、字体、间距等全局基础值。 - Alias Token：语义化别名，如 --color-bg-default、 --color-text-primary。

---

### FB-14-SC-A-002：设计一个组件库的深色模式（Dark Mode）方案时需要考虑哪些问题？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Dark Mode、深色模式、主题、对比度、图片
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请描述为组件库增加深色模式时，除了颜色反转之外还需要考虑哪些工程与设计问题。

**参考答案**：

1. **Token 语义化**：使用 `--color-bg-default` 而非 `--color-white`，避免"白色变黑"的硬编码思维。
2. **对比度与可读性**：深色模式不是简单反色，需要重新校验 WCAG 对比度（如文字 4.5:1）。
3. **阴影与层级**：深色模式下阴影效果变弱，常改用不透明蒙层或边框区分层级。
4. **图片/图表适配**：提供 `dark` 图或让图表库消费主题 Token。
5. **系统偏好同步**：监听 `prefers-color-scheme` 并支持用户覆盖。
6. **闪烁问题**：SSR 时通过内联脚本优先设置主题 class。
7. **第三方内容**：iframe、富文本、Markdown 渲染内容可能无法跟随主题。
8. **可访问性**：焦点环、选中态在深色下要足够明显。

```js
const mq = window.matchMedia('(prefers-color-scheme: dark)');
if (mq.matches) setTheme('dark');
```

**评分维度**：
- Token 语义化（25%）
- 对比度/层级/图片等视觉问题（35%）
- 系统偏好与 FOUC（25%）
- 第三方内容与边界场景（15%）

**常见错误**：
- 认为深色模式就是颜色取反
- 忽略 `prefers-color-scheme` 与用户手动设置的优先级

**延伸追问**：
- 如果业务线只想部分页面支持深色模式，如何设计？
- 如何验证深色模式的对比度是否符合 WCAG？

**口头回答版**：
> Token 语义化：使用 --color-bg-default 而非 --color-white，避免"白色变黑"的硬编码思维。 对比度与可读性：深色模式不是简单反色，需要重新校验 WCAG 对比度（如文字 4.5:1）。 阴影与层级：深色模式下阴影效果变弱，常改用不透明蒙层或边框区分层级。 图片/图表适配：提供 dark 图或让图表库消费主题 Token。

---

### FB-14-SC-A-003：如何提高组件库的可组合性（Composability）？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：可组合性、复合组件、插槽、render props
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
在组件库设计中，如何让组件更易于组合和扩展？请给出具体策略。

**参考答案**：

1. **复合组件（Compound Components）**：将相关子组件作为命名空间暴露，共享内部状态。

```jsx
<Select>
  <Select.Trigger />
  <Select.Popover>
    <Select.Option value="a">A</Select.Option>
  </Select.Popover>
</Select>
```

2. **插槽/Render Props**：允许用户替换局部渲染。

```jsx
<Card title={({ Title }) => <Title as="h2" />} />
```

3. **Hooks 暴露**：将逻辑抽成独立 Hooks，如 `useDisclosure`、 `useSelect`。
4. **样式透传**：支持 `className`、 `style`、 `sx`、CSS 变量覆盖。
5. **组件拆分粒度合理**：不过度封装，保留原子组件。
6. **Context 共享隐式状态**：子组件通过 Context 访问父组件状态，无需层层传参。
7. **as / polymorphic 支持**：允许用户改变渲染元素，如 `<Button as="a" />`。

**评分维度**：
- 说出 3 种以上组合策略（40%）
- 能给出代码示例（30%）
- 说明可组合性的收益与成本（30%）

**常见错误**：
- 为了组合而组合，导致 API 碎片化
- 过度使用 Render Props 导致嵌套地狱

**延伸追问**：
- 复合组件与 Hooks 组合有什么区别？
- 如何在组合式组件中保持无障碍属性正确？

**口头回答版**：
> 复合组件（Compound Components）：将相关子组件作为命名空间暴露，共享内部状态。 插槽/Render Props：允许用户替换局部渲染。 Hooks 暴露：将逻辑抽成独立 Hooks，如 useDisclosure、 useSelect。 样式透传：支持 className、 style、 sx、CSS 变量覆盖。

---

### FB-14-CO-A-001：什么是 Headless UI？它解决了什么问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Headless UI、无头组件、逻辑与样式分离、可访问性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Headless UI 的概念，并说明它的优势和典型使用场景。

**参考答案**：

Headless UI 是指只提供组件行为逻辑、状态管理和可访问性支持，但不提供默认样式的组件库。代表项目：Radix UI、React Aria、Headless UI（Tailwind Labs）。

解决的问题：

1. **样式与行为解耦**：用户可完全自定义外观，不受组件库默认 UI 限制。
2. **可访问性内置**：复杂交互（弹窗、下拉、日期选择）的键盘与屏幕阅读器行为由库负责。
3. **设计系统自由度**：团队可基于 Headless 组件快速构建自有设计系统。
4. **避免样式覆盖战争**：无需覆盖深层 CSS 选择器。

```jsx
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="overlay" />
    <Dialog.Content className="content">
      <Dialog.Title>Title</Dialog.Title>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**评分维度**：
- 概念准确（40%）
- 优势和典型库（30%）
- 能写简单示例（30%）

**常见错误**：
- 把 Headless UI 等同于"没有 UI"
- 认为 Headless 一定比普通组件库好

**延伸追问**：
- Headless 组件库如何管理样式类名约定？
- 你们是否考虑过在组件库中引入 Headless 层？

**参考资源**：
- [Radix UI](https://www.radix-ui.com/)
- [Headless UI](https://headlessui.com/)

**口头回答版**：
> Headless UI 是指只提供组件行为逻辑、状态管理和可访问性支持，但不提供默认样式的组件库。 代表项目：Radix UI、React Aria、Headless UI（Tailwind Labs）。 样式与行为解耦：用户可完全自定义外观，不受组件库默认 UI 限制。 可访问性内置：复杂交互（弹窗、下拉、日期选择）的键盘与屏幕阅读器行为由库负责。

---

### FB-14-SC-A-004：设计一个通用 Modal 组件时，API 应该如何设计？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Modal、API 设计、受控组件、可访问性
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请为组件库设计一个通用 Modal 对话框组件的 API，包括核心 Props、事件、插槽与可访问性支持。

**参考答案**：

核心 Props：

- `open` / `defaultOpen`：受控与非受控状态。
- `onOpenChange(open: boolean, reason)`：状态变化回调，可携带原因（如点击蒙层、按 ESC）。
- `title` / `children`：标题与内容。
- `footer` / `okText` / `cancelText` / `onOk` / `onCancel`：底部操作区。
- `mask` / `maskClosable` / `keyboard`：是否显示蒙层、点击蒙层关闭、ESC 关闭。
- `width` / `className` / `style`：样式扩展。
- `destroyOnClose`：关闭时是否卸载内容。
- `zIndex` / `getContainer`：挂载点控制。
- `aria-labelledby` / `aria-describedby`：可访问性。

可访问性：

- 焦点进入弹窗、关闭后焦点恢复。
- 弹窗内焦点循环（Focus Trap）。
- `role="dialog"`、 `aria-modal="true"`。

```jsx
<Modal
  open={visible}
  onOpenChange={setVisible}
  title="确认删除"
  okText="删除"
  cancelText="取消"
  onOk={handleDelete}
  maskClosable={false}
>
  删除后无法恢复，是否继续？
</Modal>
```

**评分维度**：
- Props 设计完整度（40%）
- 受控/非受控与事件设计（25%）
- 可访问性支持（25%）
- 扩展点考虑（10%）

**常见错误**：
- 缺少焦点管理
- `onCancel` 和蒙层关闭没有区分 reason

**延伸追问**：
- 如何实现焦点陷阱（Focus Trap）？
- 弹层嵌套时 z-index 与焦点如何管理？

**口头回答版**：
> - open / defaultOpen：受控与非受控状态。 - onOpenChange(open: boolean, reason)：状态变化回调，可携带原因（如点击蒙层、按 ESC）。 - title / children：标题与内容。 - footer / okText / cancelText / onOk / onCancel：底部操作区。

---

### FB-14-SC-A-005：如何为组件库设计一致且可访问的键盘导航？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：键盘导航、a11y、焦点管理、ARIA
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请描述组件库中常见组件（Button、Tabs、Menu、Dialog）应遵循的键盘交互规范，以及如何在工程中落地。

**参考答案**：

常见组件键盘规范：

1. **Button**：Enter / Space 触发。
2. **Tabs**：Tab 进入 TabList，左右箭头切换 Tab，Tab 键进入面板。
3. **Menu**：Enter / Space / 下箭头打开菜单，上下箭头移动焦点，Esc 关闭。
4. **Dialog**：打开时焦点进入首焦元素，Tab 在弹窗内循环，Esc 关闭。
5. **Select**：上下箭头切换选项，Enter 选中，Esc 关闭。

工程落地：

- 统一封装 `useFocusTrap`、`useRovingTabIndex`、`useDisclosure` 等 Hooks。
- 在 Storybook 中增加交互测试与 a11y 插件。
- 引入自动化测试：jest-axe、@axe-core/playwright。
- 文档中明确标注键盘交互行为。
- 设计师交付稿中标注焦点顺序与默认焦点。

**评分维度**：
- 组件键盘规范覆盖度（40%）
- 可复用 Hooks/工具设计（30%）
- 测试与文档落地（30%）

**常见错误**：
- 只支持鼠标点击，忽略键盘操作
- 弹窗打开后焦点未进入或关闭后未恢复

**延伸追问**：
- 如何处理复合组件中多个可聚焦元素的 roving tabindex？
- 自定义组件如何决定默认焦点元素？

**口头回答版**：
> Button：Enter / Space 触发。 Tabs：Tab 进入 TabList，左右箭头切换 Tab，Tab 键进入面板。 Menu：Enter / Space / 下箭头打开菜单，上下箭头移动焦点，Esc 关闭。 Dialog：打开时焦点进入首焦元素，Tab 在弹窗内循环，Esc 关闭。

---

### FB-14-CO-A-002：CSS-in-JS、CSS Modules、BEM 三种方案如何选型？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：CSS-in-JS、CSS Modules、BEM、样式方案
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请比较 CSS-in-JS、CSS Modules、BEM 三种组件库样式方案，并说明各自的优缺点与适用场景。

**参考答案**：

| 维度 | BEM | CSS Modules | CSS-in-JS |
|------|-----|-------------|-----------|
| 作用域隔离 | 依靠命名约定 | 构建时局部哈希 | 运行时/构建时局部作用域 |
| 动态样式 | 依赖 CSS 变量/class 切换 | 有限 | 强，可直接使用 props |
| 类型安全 | 无 | 有 class 映射 | 强，可主题类型推断 |
| 运行时开销 | 无 | 无 | 有（尤其是运行时方案） |
| SSR 支持 | 好 | 好 | 需注意抽离与水合 |
| 包体积 | 小 | 小 | 可能增加依赖体积 |
| 可读性 | 类名冗长 | 较差（哈希） | 较好 |

选型建议：

- **BEM**：传统项目、需要兼容旧浏览器、设计系统 Token 与类名体系成熟。
- **CSS Modules**：中小型项目、需要作用域隔离但不想引入运行时开销。
- **CSS-in-JS**：需要强主题动态样式、类型安全、与 React 深度集成；但要注意性能。

组件库建议：底层用 CSS Modules 或原子化 CSS 保证轻量，文档站点可用 CSS-in-JS。

**评分维度**：
- 三方案对比全面性（40%）
- 优缺点分析（30%）
- 给出合理选型建议（30%）

**常见错误**：
- 认为某一种方案绝对优于其他方案
- 忽略 SSR 与运行时开销

**延伸追问**：
- Tailwind CSS 与上述方案是什么关系？
- 如何在组件库中同时支持多种样式消费方式？

**口头回答版**：
> | 维度 | BEM | CSS Modules | CSS-in-JS | |------|-----|-------------|-----------| | 作用域隔离 | 依靠命名约定 | 构建时局部哈希 | 运行时/构建时局部作用域 | | 动态样式 | 依赖 CSS 变量/class 切换 | 有限 | 强，可直接使用 props |

---

### FB-14-SC-A-006：如何设计支持响应式的组件？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：响应式、断点、Breakpoint、Layout
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请为组件库设计一套响应式支持方案，使组件能够根据视口或容器尺寸调整布局与样式。

**参考答案**：

方案一：**全局断点 Token**

```js
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
```

组件 props 支持对象形式：

```jsx
<Grid columns=&#123;&#123; sm: 1, md: 2, lg: 4 &#125;&#125; />
<Space size=&#123;&#123; sm: 'sm', lg: 'lg' &#125;&#125; />
```

方案二：**CSS 媒体查询 + Token**

```css
.responsive-card {
  padding: var(--space-sm);
}
@media (min-width: 768px) {
  .responsive-card { padding: var(--space-lg); }
}
```

方案三：**Container Query（容器查询）**

适用于组件嵌入不同容器尺寸的场景：

```css
.card-container {
  container-type: inline-size;
}
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

工程落地：

- 断点体系纳入 Design Token。
- 提供 `useBreakpoint` / `useMediaQuery` Hooks。
- 优先使用 CSS 媒体查询，避免 JS 监听导致重渲染。
- 复杂布局组件支持 prop 对象语法，内部生成媒体查询。

**评分维度**：
- 断点体系设计（30%）
- 组件 prop 设计（30%）
- CSS 媒体查询与容器查询运用（25%）
- 性能考虑（15%）

**常见错误**：
- 所有响应式逻辑都用 JS resize 监听实现
- 断点值硬编码在组件中

**延伸追问**：
- 服务端渲染时如何响应式渲染？
- 如何实现容器查询的 polyfill/降级？

**口头回答版**：
> 方案一：全局断点 Token 组件 props 支持对象形式： 方案二：CSS 媒体查询 + Token 方案三：Container Query（容器查询）

---

### FB-14-CO-A-003：视觉回归测试（Visual Regression Testing）是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：视觉回归、Chromatic、Loki、截图对比
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释视觉回归测试的原理，并说明它在组件库中的价值与常用工具。

**参考答案**：

视觉回归测试通过截图对比组件在不同版本下的渲染结果，自动发现样式或布局上的意外变化。

原理：

1. 在 CI 中为组件的关键状态生成截图基线（baseline）。
2. 每次代码变更后重新截图，与基线进行像素级或感知哈希对比。
3. 若差异超过阈值则标记为失败，等待人工确认。

价值：

- 捕获样式变更导致的 UI 回归。
- 作为设计与研发之间的视觉契约。
- 在重构 CSS、升级依赖时提供安全保障。

常用工具：

- **Chromatic**：与 Storybook 深度集成，支持协作评审。
- **Loki**：轻量，基于 Storybook 截图。
- **Percy**、**Applitools**：更成熟的商业方案。
- **Playwright / Cypress**：自定义截图对比流程。

**评分维度**：
- 原理解释（40%）
- 价值说明（30%）
- 工具列举与选型（30%）

**常见错误**：
- 把视觉回归等同于功能测试
- 忽略动态内容（时间、动画）导致的误报

**延伸追问**：
- 如何降低视觉回归测试的误报率？
- 动态数据或动画组件如何做视觉回归？

**口头回答版**：
> 视觉回归测试通过截图对比组件在不同版本下的渲染结果，自动发现样式或布局上的意外变化。 在 CI 中为组件的关键状态生成截图基线（baseline）。 每次代码变更后重新截图，与基线进行像素级或感知哈希对比。 若差异超过阈值则标记为失败，等待人工确认。

---

### FB-14-SC-A-007：如何建立高效的 design-dev handoff（设计-研发交付）流程？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：设计交付、DesignOps、Handoff、Figma
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请描述一套组件库场景下，设计师与前端工程师之间的高效交付流程，包括工具、规范与协作机制。

**参考答案**：

1. **单一事实来源**：以组件库文档站点 + Storybook 作为设计实现的最终参考。
2. **Design Token 双向同步**：
   - 设计侧：Figma Variables 维护 Token。
   - 研发侧：JSON/YAML 维护 Token，通过 Style Dictionary 生成代码。
   - 借助 Figma Plugin 或 Tokens Studio 实现双向同步。
3. **组件对应表**：每个 Figma 组件对应 Storybook Story 与代码组件。
4. **设计稿标注规范**：使用 Figma Dev Mode / Inspect，标注 Token 名称而非具体色值。
5. **走查与验收**：
   - 设计师在 Storybook 中走查组件状态。
   - 使用视觉回归测试对比 Figma 导出与组件截图。
6. **变更管理**：Design Token 或组件变更需同步更新设计与代码，走 RFC 或变更日志。
7. **定期设计-研发对齐会**：同步设计意图与技术约束。

**评分维度**：
- 工具链完整性（30%）
- Token 同步机制（30%）
- 走查与验收流程（25%）
- 变更管理（15%）

**常见错误**：
- 设计稿只提供图片，研发手写样式
- 设计变更不通知研发，导致代码与设计不同步

**延伸追问**：
- 如何让设计师参与组件代码走查？
- 设计 Token 与 Figma 变量不一致时如何解决？

**相关题目**：
- [FB-14-SC-R-001 设计一套 DesignOps 与设计系统平台](#FB-14-SC-R-001)

---

## 深入题（10 道）{#proficient}

**口头回答版**：
> 单一事实来源：以组件库文档站点 + Storybook 作为设计实现的最终参考。 Design Token 双向同步： - 设计侧：Figma Variables 维护 Token。 - 研发侧：JSON/YAML 维护 Token，通过 Style Dictionary 生成代码。

### FB-14-SD-P-001：如何从 0 到 1 设计一个企业级组件库？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：组件库架构、Monorepo、构建、文档、测试
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个企业级前端组件库的完整技术方案，包括工程结构、构建输出、主题系统、文档、测试与发布流程。

**参考答案**：

1. **工程结构（Monorepo）**

```text
packages/
  core/           # 基础工具与类型
  tokens/         # Design Token 源数据
  components/     # 组件源码
  icons/          # 图标库
  theme/          # 主题包
  docs/           # 文档站点
tools/
  storybook/      # Storybook 配置
  eslint-config/  # 共享 lint 配置
```

2. **技术栈选型**
   - 框架：React / Vue（根据团队）
   - 类型：TypeScript
   - 样式：CSS Modules + PostCSS + CSS 变量
   - 构建：Rollup / Vite Library Mode，输出 ESM、CJS、UMD 及类型声明
   - 文档：Storybook + VitePress
   - 测试：Vitest + React Testing Library + Playwright

3. **Design Token 体系**
   - JSON 源文件 + Style Dictionary 生成 CSS 变量 / JS 对象。
   - 分层：Global / Alias / Component。

4. **组件设计原则**
   - 同时支持受控/非受控。
   - API 一致、命名规范。
   - 可访问性内置。
   - 样式可覆盖。

5. **构建输出**
   - 全量包 + 按需引入（ESM tree-shaking）。
   - 每个组件独立目录，含 `style.css`。

6. **发布与治理**
   - Changesets 管理版本与变更日志。
   - SemVer 规范。
   - 破坏性变更走 RFC。

7. **质量保障**
   - 单元测试、交互测试、视觉回归、a11y 测试。
   - CI 中校验类型、lint、测试、构建。

**评分维度**：
- 工程结构合理性（25%）
- 技术栈与构建输出（25%）
- Token 与主题系统（20%）
- 测试与发布流程（20%）
- 可访问性与 API 设计（10%）

**常见错误**：
- 缺少 Design Token 层，颜色硬编码
- 只输出全量包，无法 tree-shaking

**延伸追问**：
- 如何平衡组件数量与维护成本？
- 多业务线需求冲突时如何决策？

**口头回答版**：
> 工程结构（Monorepo） - 框架：React / Vue（根据团队） - 类型：TypeScript - 样式：CSS Modules + PostCSS + CSS 变量

---

### FB-14-SC-P-001：组件库出现破坏性变更（Breaking Change）时应如何处理？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：Breaking Change、兼容性、迁移、版本策略
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
组件库需要移除一个已废弃的 props 或修改默认行为，如何尽量减少对业务方的影响？

**参考答案**：

1. **提前标记弃用（Deprecation）**
   - 在当前 MAJOR 版本中使用 `console.warn` 或 `process.env.NODE_ENV` 提示。
   - 文档中标注弃用版本与替代方案。
   - TypeScript 中标记 `@deprecated`。

2. **提供兼容层**
   - 在新版本中保留旧 props 映射，内部转换为新 API。
   - 使用 codemod 自动迁移业务代码。

3. **版本策略**
   - 按 SemVer 提升 MAJOR 版本。
   - 发布迁移指南（Migration Guide）。

4. **灰度与验证**
   - 在内部重点项目先行升级验证。
   - 提供 beta / rc 版本供业务方提前适配。

5. **沟通机制**
   - 通过 RFC、变更日志、内部宣讲同步变更原因与影响面。
   - 建立升级窗口期与技术支持。

```js
// 兼容层示例
function Button({ type, variant, ...rest }) {
  if (process.env.NODE_ENV !== 'production' && type) {
    console.warn('[Button] `type` is deprecated, use `variant` instead.');
  }
  return <BaseButton variant={variant ?? type} {...rest} />;
}
```

**评分维度**：
- 弃用与提示机制（25%）
- 兼容层与 codemod（25%）
- 版本与迁移指南（25%）
- 沟通与验证（25%）

**常见错误**：
- 直接删除旧 API 而不提前通知
- 将 Breaking Change 发布为 MINOR/PATCH

**延伸追问**：
- 如何评估一次改动是否为 Breaking Change？
- 多版本并存时如何维护文档与示例？

**口头回答版**：
> 提前标记弃用（Deprecation） - 在当前 MAJOR 版本中使用 console.warn 或 process.env.NODE_ENV 提示。 - 文档中标注弃用版本与替代方案。 - TypeScript 中标记 @deprecated。

---

### FB-14-CO-P-001：什么是复合组件（Compound Components）模式？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：Compound Components、Context、组合模式、组件状态
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释复合组件模式，并说明它的实现方式、优势与适用场景。

**参考答案**：

复合组件模式将一组相关子组件挂载在一个父组件命名空间下，子组件通过 Context 共享父组件状态，彼此协作完成复杂 UI。

实现方式：

```jsx
function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  return (
    <TabsContext.Provider value=&#123;&#123; activeIndex, setActiveIndex &#125;&#125;>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = function List({ children }) { /* ... */ };
Tabs.Tab = function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  return (
    <button
      role="tab"
      aria-selected={activeIndex === index}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
};
Tabs.Panel = function Panel({ index, children }) {
  const { activeIndex } = useContext(TabsContext);
  return activeIndex === index ? <div role="tabpanel">{children}</div> : null;
};
```

优势：

- 灵活组合，用户可自定义结构。
- 内部状态共享，API 自然。
- 易于扩展子组件行为。

适用场景：Tabs、Accordion、Select、Form 等具有内在状态关联的组件族。

**评分维度**：
- 概念与实现（40%）
- 能写出 Context 共享示例（30%）
- 优势与适用场景（30%）

**常见错误**：
- 子组件单独使用时状态异常，缺少容错
- 过度拆分导致 API 复杂

**延伸追问**：
- 复合组件与 Hooks 组合有什么区别？
- 如何让子组件在父组件外部也能安全使用？

**口头回答版**：
> 复合组件模式将一组相关子组件挂载在一个父组件命名空间下，子组件通过 Context 共享父组件状态，彼此协作完成复杂 UI。 - 灵活组合，用户可自定义结构。 - 内部状态共享，API 自然。 - 易于扩展子组件行为。

---

### FB-14-CO-P-002：受控组件与非受控组件同时支持时，内部状态如何设计？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：受控、非受控、内部状态、useControllableState
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述一种让组件同时支持受控和非受控模式的内部状态管理方案。

**参考答案**：

通用方案是使用 `useControllableState` Hook：

```jsx
function useControllableState({ value, defaultValue, onChange }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback((next) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  }, [isControlled, onChange]);

  return [currentValue, setValue];
}
```

设计要点：

1. 以 `value !== undefined` 判断是否受控。
2. 受控模式下只读外部值，内部状态不更新。
3. 非受控模式下更新内部状态，并回调 `onChange`。
4. 避免在受控/非受控之间动态切换，React 会发出警告。
5. 首次渲染后不可切换模式，设计阶段应明确。

**评分维度**：
- Hook 实现正确性（40%）
- 受控判断逻辑（30%）
- 边界情况与警告处理（30%）

**常见错误**：
- 用 `value != null` 判断，导致空字符串等合法值被视为非受控
- 受控模式下仍更新内部状态，导致双源 truth

**延伸追问**：
- 如果用户传入了 `value` 但没有传 `onChange`，会有什么风险？
- 如何处理 `defaultValue` 只生效一次的语义？

**口头回答版**：
> 通用方案是使用 useControllableState Hook： 以 value !== undefined 判断是否受控。 受控模式下只读外部值，内部状态不更新。 非受控模式下更新内部状态，并回调 onChange。

---

### FB-14-SC-P-002：如何设计可扩展的主题系统，支持业务线二次定制？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：主题系统、可扩展性、Token、定制、多品牌
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
企业组件库需要被多个业务线使用，各业务线有自己的品牌色和局部样式。请设计一套可扩展的主题系统。

**参考答案**：

1. **Token 分层与命名空间**
   - 基础 Token 不可覆盖或有限覆盖。
   - 语义 Token 与组件 Token 开放覆盖。
   - 使用前缀区分全局与业务线：`--ds-color-primary` vs `--biz-color-primary`。

2. **主题配置入口**
   - 提供 `ThemeProvider` 或 ConfigProvider 注入主题对象。
   - 支持局部主题覆盖：`<ThemeProvider theme={customTheme}><BizPage /></ThemeProvider>`。

3. **自定义方式**
   - 覆盖已有 Token。
   - 扩展新 Token（合并到主题对象）。
   - 针对单个组件覆盖样式变量。

```js
const customTheme = {
  colors: {
    primary: { 500: '#ff4d4f' },
  },
  components: {
    Button: {
      borderRadius: '999px',
    },
  },
};
```

4. **编译时/运行时生成**
   - 运行时根据主题对象生成 CSS 变量注入。
   - 编译时通过 Style Dictionary 生成不同品牌 CSS 包。

5. **类型安全**
   - TypeScript 主题类型支持扩展，业务线通过模块声明合并新增 Token。

6. **版本兼容**
   - 文档明确可覆盖范围与稳定性级别。
   - 避免内部重构导致业务覆盖失效。

**评分维度**：
- Token 分层与命名空间（25%）
- 配置入口与局部主题（25%）
- 定制方式覆盖度（25%）
- 类型安全与兼容性（25%）

**常见错误**：
- 所有 Token 都允许覆盖，导致系统失控
- 业务线覆盖后升级组件库时样式被静默破坏

**延伸追问**：
- 如何防止业务线覆盖导致视觉一致性失控？
- 多品牌场景下如何避免 CSS 变量名冲突？

**口头回答版**：
> Token 分层与命名空间 - 基础 Token 不可覆盖或有限覆盖。 - 语义 Token 与组件 Token 开放覆盖。 - 使用前缀区分全局与业务线：--ds-color-primary vs --biz-color-primary。

---

### FB-14-CO-P-003：Design Token 如何与 Figma 设计变量保持同步？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：Design Token、Figma、Tokens Studio、DesignOps
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述 Design Token 在设计与研发之间双向同步的方案与工具链。

**参考答案**：

1. **单一数据源（Single Source of Truth）**
   - 选择 JSON 作为权威源，存储在 Git 仓库中。
   - 或选择 Figma Variables 作为权威源，通过插件导出。

2. **工具链**
   - **Tokens Studio for Figma**：在 Figma 中管理 Token，支持导出 JSON 到 Git。
   - **Style Dictionary / Theo**：将 JSON Token 转换为 CSS、SCSS、iOS、Android 变量。
   - **Figma REST API**：自定义脚本同步变量。

3. **同步流程**
   - 设计侧修改 Token → Tokens Studio 提交 PR → CI 生成代码变量 → 发布新包。
   - 研发侧新增 Token → 更新 JSON → 同步到 Figma → 设计侧评审。

4. **冲突与治理**
   - 权限控制：关键 Token 变更需 Design System 团队审批。
   - 版本化：Token 与组件库版本绑定。
   - 变更日志：记录 Token 增删改。

5. **校验**
   - CI 校验 Token 命名规范、引用完整性。
   - 对比 Figma 与代码生成变量的差异。

**评分维度**：
- 数据源与工具链（35%）
- 同步流程双向性（30%）
- 治理与校验（25%）
- 冲突处理（10%）

**常见错误**：
- 只有单向同步，设计改后代码不同步
- 无权限控制，导致 Token 随意增删

**延伸追问**：
- 设计师不会用 Git，如何降低协作门槛？
- Token 命名冲突时按什么规则解决？

**口头回答版**：
> 单一数据源（Single Source of Truth） - 选择 JSON 作为权威源，存储在 Git 仓库中。 - 或选择 Figma Variables 作为权威源，通过插件导出。 - Tokens Studio for Figma：在 Figma 中管理 Token，支持导出 JSON 到 Git。

---

### FB-14-SC-P-003：组件库大版本升级时，如何制定迁移方案？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：版本升级、迁移、codemod、Breaking Change
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
组件库从 v3 升级到 v4，包含大量 API 调整、样式重构和主题变更。请制定一套完整的迁移方案。

**参考答案**：

1. **事前评估**
   - 梳理所有 Breaking Change 清单与影响面。
   - 通过代码扫描统计业务方使用旧 API 的位置。
   - 评估回滚成本与升级收益。

2. **发布策略**
   - 提前 1-2 个 MINOR 版本发布 deprecation 警告。
   - 发布 v4 beta / rc，邀请重点项目试用。
   - 保留 v3 的维护窗口期（如 6 个月安全更新）。

3. **迁移工具**
   - 编写 codemod（jscodeshift / ts-morph）自动替换 API。
   - 提供迁移 CLI：`npx @ds/codemod v3-to-v4 ./src`。
   - 提供迁移对照表与详细 Migration Guide。

4. **兼容与兜底**
   - v4 内部提供可选兼容包，降低一次性迁移压力。
   - 对无法自动迁移的场景给出明确手动步骤。

5. **验证机制**
   - 业务方升级后跑通单元测试、E2E、视觉回归。
   - 组件库团队提供升级支持渠道与答疑。

6. **文档与培训**
   - 发布升级博客、录制培训视频。
   - 在文档站点提供 v3/v4 对比示例。

**评分维度**：
- 影响评估（20%）
- 发布与兼容策略（25%）
- 迁移工具与文档（25%）
- 验证与支持机制（20%）
- 沟通与培训（10%）

**常见错误**：
- 不评估影响面直接强制升级
- 缺少 codemod，依赖业务方手动替换

**延伸追问**：
- 如何处理业务方无法在短期内升级的情况？
- codemod 无法覆盖的边界场景如何处理？

**口头回答版**：
> - 梳理所有 Breaking Change 清单与影响面。 - 通过代码扫描统计业务方使用旧 API 的位置。 - 评估回滚成本与升级收益。 - 提前 1-2 个 MINOR 版本发布 deprecation 警告。

---

### FB-14-CO-P-004：Render Props、Hooks 与 Compound Components 三种组合模式如何取舍？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：Render Props、Hooks、Compound Components、组合模式
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 Render Props、Hooks 与 Compound Components 三种模式的适用场景、优缺点，并说明在组件库中如何选择。

**参考答案**：

| 模式 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| **Render Props** | 灵活替换局部渲染，与组件生命周期结合 | 嵌套层级深，类型复杂 | 需要高度自定义渲染但保留状态控制 |
| **Hooks** | 复用逻辑，无嵌套，类型友好 | 需要用户自己组合 JSX | 行为逻辑复用，如 useDisclosure、useSelect |
| **Compound Components** | 结构清晰，状态隐式共享 | 子组件依赖父组件 Context | Tabs、Accordion、Select 等组件族 |

选择原则：

- 优先用 **Hooks** 暴露逻辑，用户自由组合。
- 对结构强相关的组件族使用 **Compound Components**。
- 在需要保留组件封装同时替换局部渲染时使用 **Render Props**。
- 现代组件库通常以 Hooks + Compound Components 为主，Render Props 作为补充。

**评分维度**：
- 三种模式对比（40%）
- 优缺点分析（30%）
- 选型原则（30%）

**常见错误**：
- 所有组件都用 Compound Components，导致 API 冗余
- 忽视 Hooks 带来的组合自由度

**延伸追问**：
- 你设计过哪些 Hooks 来支持组件组合？
- 如何在 Compound Components 中支持 Render Props？

**口头回答版**：
> | 模式 | 优点 | 缺点 | 适用场景 | |------|------|------|---------| | Render Props | 灵活替换局部渲染，与组件生命周期结合 | 嵌套层级深，类型复杂 | 需要高度自定义渲染但保留状态控制 | | Hooks | 复用逻辑，无嵌套，类型友好 | 需要用户自己组合 JSX | 行为逻辑复用，如 useDisclosure、useSelect |

---

### FB-14-SC-P-004：组件库的性能优化有哪些手段？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：性能优化、Tree Shaking、懒加载、渲染优化
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请描述组件库在包体积、运行时渲染、构建产物三个维度上的性能优化手段。

**参考答案**：

1. **包体积优化**
   - ESM 输出，支持 Tree Shaking。
   - 组件独立目录，业务方可按需引入。
   - 图标按需加载或子路径导入。
   - 依赖外部化（react、react-dom 不打包进产物）。
   - 分析产物体积，使用 rollup-plugin-visualizer。

2. **运行时渲染优化**
   - 组件内部使用 `React.memo` 避免不必要重渲染。
   - Context 拆分，避免大 Context 变化导致全树渲染。
   - 使用 `useCallback` / `useMemo` 稳定回调与对象引用。
   - 弹窗/复杂组件支持懒加载或 `destroyOnClose`。

3. **构建产物优化**
   - 多格式输出：ESM、CJS、UMD。
   - 生成 sourcemap 与 d.ts 声明文件。
   - CSS 产物压缩，提取为独立 CSS 文件。
   - 对不支持 CSS 变量的环境提供降级产物。

4. **文档与示例优化**
   - Storybook 按需编译，避免全量 stories 构建过慢。
   - 文档站点代码分割。

```js
// package.json 侧滑配置
{
  "sideEffects": ["*.css"]
}
```

**评分维度**：
- 包体积优化（30%）
- 运行时渲染优化（30%）
- 构建产物优化（25%）
- 文档与工程化优化（15%）

**常见错误**：
- 全量打包所有依赖
- 滥用 memo，导致维护成本上升而收益有限

**延伸追问**：
- 如何验证业务方实际只打包了使用的组件？
- 组件库中的 Context 如何设计才能避免渲染放大？

**口头回答版**：
> - ESM 输出，支持 Tree Shaking。 - 组件独立目录，业务方可按需引入。 - 图标按需加载或子路径导入。 - 依赖外部化（react、react-dom 不打包进产物）。

---

### FB-14-CO-P-005：组件库 Monorepo 工程结构应如何组织？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：Monorepo、组件库、工程结构、pnpm workspace
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述一个组件库 Monorepo 的典型目录结构，并说明各包的职责与依赖关系。

**参考答案**：

```text
ds/
├── packages/
│   ├── tokens/            # Design Token 源与生成物
│   ├── theme/             # 主题包，依赖 tokens
│   ├── components/        # 组件源码，依赖 tokens、theme、icons、shared
│   ├── icons/             # 图标库
│   ├── shared/            # 工具 Hooks、类型、常量
│   └── docs/              # 文档站点
├── tools/
│   ├── storybook/         # Storybook 配置
│   ├── eslint-config/     # 共享 ESLint 配置
│   ├── tsconfig/          # 共享 TS 配置
│   └── codemod/           # 迁移脚本
├── package.json
├── pnpm-workspace.yaml
└── changesets/
```

职责与依赖：

- `tokens`：不依赖其他包，被所有包消费。
- `theme`：依赖 tokens，提供主题上下文与默认主题。
- `shared`：被 components、docs 等使用。
- `icons`：独立包，支持按需引入。
- `components`：依赖 theme、shared、icons，发布为单一入口或多入口包。
- `docs`：依赖 components，用于构建文档站点。

工具选择：

- pnpm workspace + Turborepo 管理任务与缓存。
- Changesets 管理版本与变更日志。

**评分维度**：
- 目录结构合理性（40%）
- 包职责与依赖关系（30%）
- 工具链选择（20%）
- 可扩展性考虑（10%）

**常见错误**：
- 所有组件平铺在一个包中，无法按需引入
- 包之间循环依赖

**延伸追问**：
- 是按组件分包好，还是统一一个 components 包好？
- 如何处理跨包的类型循环依赖？

---

## 架构题（65 道）{#architect}

**口头回答版**：
> - tokens：不依赖其他包，被所有包消费。 - theme：依赖 tokens，提供主题上下文与默认主题。 - shared：被 components、docs 等使用。 - icons：独立包，支持按需引入。

### FB-14-SD-R-001：如何设计一个跨框架（React/Vue/Svelte）的组件库？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：跨框架、Web Components、Headless、设计系统
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
企业希望一套设计系统能同时服务 React、Vue 和其他技术栈。请设计一套跨框架组件库的技术架构。

**参考答案**：

方案一：**Headless 逻辑层 + 框架适配层**

1. 核心逻辑用原生 TS 编写（状态机、可访问性、键盘事件）。
2. 各框架提供适配层：React Hooks、Vue Composables、Svelte Stores。
3. 样式层统一：CSS 变量 + 预定义 class，框架只负责绑定。

```text
packages/
  core/          # 框架无关逻辑（状态机、a11y、utils）
  react/         # React Hooks + JSX 组件
  vue/           # Vue Composables + SFC
  web-components/# Web Components 封装（可选）
  styles/        # 共享 CSS
```

方案二：**Web Components**

- 使用 Stencil、Lit 等工具构建自定义元素。
- 优势：框架无关、原生集成。
- 劣势：SSR 复杂、React/Vue 中事件与表单集成不够自然、可访问性支持有限。

方案三：**Design Token + 文档规范 + 各框架独立实现**

- 只统一 Token 与设计规范，各框架团队自行实现组件。
- 成本最高但集成度最好，适合大型组织。

推荐组合：

- 复杂交互组件用 Headless 核心 + 框架适配，保证行为一致。
- 简单展示组件可考虑 Web Components 或各框架独立实现。
- 文档与 Storybook 统一展示各框架示例。

**评分维度**：
- 跨框架策略选择合理性（30%）
- 共享层与适配层设计（30%）
- 可访问性与 SSR 考虑（20%）
- 成本与维护性权衡（20%）

**常见错误**：
- 直接用 Web Components 解决所有问题，忽略框架集成体验
- 完全独立实现，失去设计系统一致性

**延伸追问**：
- React 与 Vue 的响应式模型差异会如何影响共享逻辑设计？
- 跨框架组件如何保证视觉回归测试覆盖？

**口头回答版**：
> 方案一：Headless 逻辑层 + 框架适配层 核心逻辑用原生 TS 编写（状态机、可访问性、键盘事件）。 各框架提供适配层：React Hooks、Vue Composables、Svelte Stores。 样式层统一：CSS 变量 + 预定义 class，框架只负责绑定。

---

### FB-14-SD-R-002：如何设计一套 DesignOps 与设计系统平台？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：DesignOps、设计系统平台、治理、文档、度量
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个支持多团队协作的设计系统平台，涵盖 Token 管理、组件库、文档、度量与治理。

**参考答案**：

平台核心模块：

1. **Token 中心**
   - 可视化 Token 管理（颜色、字体、间距、阴影）。
   - 版本控制与变更审批。
   - 自动同步到 Figma 与代码仓库。

2. **组件库**
   - Monorepo 组织，统一构建、测试、发布。
   - 多框架适配（如需要）。
   - 主题与定制能力。

3. **文档站点**
   - 设计与开发文档统一。
   - 交互示例、API 说明、可访问性指南。
   - 设计Token 可视化展示。

4. **度量与监控**
   - 组件使用覆盖率（哪些组件被多少业务使用）。
   - 设计一致性指标（违规样式扫描）。
   - 版本升级进度追踪。
   - 性能与包体积监控。

5. **治理流程**
   - 新组件提案（RFC）与评审。
   - 设计委员会与前端架构委员会。
   - 变更日志与迁移指南。
   - 贡献者指南与 Code Review 规范。

6. **工具集成**
   - CI/CD：构建、测试、视觉回归、发布。
   - 设计工具：Figma Plugin。
   - 沟通：升级公告、迁移支持。

**评分维度**：
- 模块划分完整性（30%）
- Token 与组件库设计（25%）
- 度量与治理（25%）
- 多团队协作机制（20%）

**常见错误**：
- 只关注组件代码，忽略设计与治理流程
- 度量指标流于形式，无法驱动决策

**延伸追问**：
- 如何度量设计系统对业务的价值？
- 平台由哪个团队维护？如何平衡中台与业务需求？

**口头回答版**：
> - 可视化 Token 管理（颜色、字体、间距、阴影）。 - 版本控制与变更审批。 - 自动同步到 Figma 与代码仓库。 - Monorepo 组织，统一构建、测试、发布。

---

### FB-14-SD-R-003：如何建设组件库的文档与开发者生态？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：文档、Storybook、开发者体验、生态、示例
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套组件库文档体系，使其同时服务设计师、前端开发者和产品经理，并促进组件的正确使用。

**参考答案**：

文档体系分层：

1. **设计指南（For Designers）**
   - 设计原则、品牌语言、使用规范。
   - Figma 组件库链接与使用说明。
   - 设计模式与反模式示例。

2. **开发文档（For Developers）**
   - 快速开始、安装、主题配置。
   - 每个组件的 API 表、类型定义、默认值。
   - 交互示例与代码沙箱（StackBlitz / CodeSandbox）。
   - 可访问性说明与键盘交互。

3. **贡献文档（For Contributors）**
   - 环境搭建、代码规范、提交规范。
   - 新组件 RFC 模板。
   - 发布与变更日志流程。

4. **自动化文档**
   - 从 TypeScript 类型自动生成 API 表。
   - 从 Token JSON 生成 Token 文档。
   - Storybook 与文档站点集成。

5. **可发现性**
   - 全文搜索、标签分类。
   - 设计 Token 与组件关联展示。
   - 常见场景模板页面。

6. **反馈与迭代**
   - 每页提供"反馈"入口。
   - 组件使用问题汇总为 FAQ。
   - 定期根据搜索热词优化文档结构。

**评分维度**：
- 受众分层清晰度（25%）
- 文档内容覆盖度（25%）
- 自动化与工具集成（25%）
- 可发现性与反馈机制（25%）

**常见错误**：
- 文档只面向开发者，忽略设计师与产品经理
- API 表手动维护，容易过期

**延伸追问**：
- 如何保证文档与代码版本同步？
- 如何度量文档质量与使用率？

**口头回答版**：
> 设计指南（For Designers） - 设计原则、品牌语言、使用规范。 - Figma 组件库链接与使用说明。 - 设计模式与反模式示例。

---

### FB-14-SD-R-004：如何构建组件库的视觉回归测试体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：视觉回归、Chromatic、CI、截图对比、Storybook
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套完整的视觉回归测试体系，覆盖组件库各状态、主题与视口，并能在 CI 中稳定运行。

**参考答案**：

1. **测试范围**
   - 所有组件的核心状态 Story。
   - 多主题（light / dark / brand）。
   - 多视口（desktop / tablet / mobile）。
   - 关键交互状态（hover / focus / disabled / loading）。

2. **工具链**
   - Storybook 作为组件展示基座。
   - Chromatic / Loki / Percy 进行截图对比。
   - Playwright 自定义截图流程作为补充。

3. **基线管理**
   - 主分支基线作为权威。
   - PR 中生成差异报告，需人工审批。
   - 基线更新通过 PR 合并触发。

4. **稳定性保障**
   - 禁用动画、固定字体、固定时间相关元素。
   - 使用稳定的数据与固定随机种子。
   - 统一浏览器版本与渲染环境（Docker）。

5. **CI 集成**

```yaml
# 示例 CI 流程
- name: Build Storybook
  run: pnpm storybook:build
- name: Visual Regression
  run: pnpm chromatic --project-token=$&#123;&#123; secrets.CHROMATIC_TOKEN &#125;&#125;
```

6. **误报处理**
   - 设置合理阈值。
   - 对动态内容使用占位符或屏蔽区域。
   - 定期 review 差异，优化测试用例。

**评分维度**：
- 测试范围覆盖度（25%）
- 工具链与基线管理（25%）
- 稳定性保障措施（25%）
- CI 集成与误报处理（25%）

**常见错误**：
- 只覆盖默认状态，忽略交互态与主题
- 不稳定环境导致大量误报，团队失去信任

**延伸追问**：
- 视觉回归测试应该放在 PR 阶段还是发布阶段？
- 如何处理跨浏览器渲染差异？

**口头回答版**：
> - 所有组件的核心状态 Story。 - 多主题（light / dark / brand）。 - 多视口（desktop / tablet / mobile）。 - 关键交互状态（hover / focus / disabled / loading）。

---

### FB-14-SD-R-005：如何设计支持多品牌的设计系统主题架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：多品牌、主题架构、Design Token、品牌定制
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
一家集团公司有多个子品牌，各品牌需要共享组件库但保持独立视觉风格。请设计一套多品牌主题架构。

**参考答案**：

1. **Token 分层**
   - **Core Token**：所有品牌共享的基础尺度（如间距阶梯、字号阶梯）。
   - **Brand Token**：各品牌独立的颜色、圆角、阴影等。
   - **Component Token**：组件级映射，可品牌级覆盖。

2. **主题包结构**

```text
themes/
  base/           # 基础 Token
  brand-a/        # 品牌 A 覆盖
  brand-b/        # 品牌 B 覆盖
```

3. **构建输出**
   - 每个品牌生成独立 CSS 变量文件。
   - 运行时通过 `data-brand` 属性切换。
   - 支持按需加载品牌 CSS。

4. **定制边界**
   - 定义"可定制"与"不可定制"Token 白名单。
   - 限制字体、布局结构等影响一致性的维度。

5. **设计工具**
   - Figma 中每个品牌对应一套变量模式（Variable Mode）。
   - 设计稿导出时附带品牌标识。

6. **运行时切换**

```jsx
<ThemeProvider brand="brand-a">
  <App />
</ThemeProvider>
```

7. **治理**
   - 品牌主题变更需 Design System 团队审批。
   - 定期审计各品牌偏离度。

**评分维度**：
- Token 分层与品牌隔离（30%）
- 构建与运行时切换（25%）
- 定制边界与治理（25%）
- 设计工具协同（20%）

**常见错误**：
- 允许品牌无限制覆盖所有样式
- 各品牌独立维护完整组件库，失去中台价值

**延伸追问**：
- 品牌 A 需要完全特殊的组件时如何处理？
- 如何防止多品牌导致组件库代码复杂度失控？

**口头回答版**：
> - Core Token：所有品牌共享的基础尺度（如间距阶梯、字号阶梯）。 - Brand Token：各品牌独立的颜色、圆角、阴影等。 - Component Token：组件级映射，可品牌级覆盖。 - 每个品牌生成独立 CSS 变量文件。

---

### FB-14-SD-R-006：如何治理与度量大型组件库的健康度？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：组件库治理、度量、健康度、覆盖率、质量
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套组件库治理与度量体系，帮助团队了解组件库质量、使用情况和演进方向。

**参考答案**：

1. **质量度量**
   - 单元测试覆盖率、交互测试覆盖率。
   - 视觉回归覆盖率。
   - 可访问性扫描通过率（axe-core）。
   - TypeScript 类型严格度。
   - 代码重复率、圈复杂度。

2. **使用度量**
   - 各组件被业务方引用次数。
   - 组件在页面中的实际渲染覆盖率。
   - 废弃 API 的使用分布。
   - 主题/定制使用率。

3. **一致性度量**
   - 设计稿与实现组件的匹配度。
   - 业务线中违规样式（硬编码色值）扫描。
   - Token 使用率。

4. **演进度量**
   - Breaking Change 数量与迁移进度。
   - Issue / PR 响应时间。
   - 版本发布频率。
   - 社区/内部贡献量。

5. **治理机制**
   - 设立组件库委员会，定期 review 度量报告。
   - 对低质量、低使用组件进行归档或重构。
   - 将度量指标纳入团队 OKR。

6. **工具链**
   - 使用 AST 扫描业务代码统计组件使用。
   - 搭建度量仪表盘（Docusaurus / 自建）。
   - 集成到 CI 报告。

**评分维度**：
- 度量维度全面性（30%）
- 数据获取方式可行性（25%）
- 治理机制（25%）
- 工具链与落地（20%）

**常见错误**：
- 只关注代码质量，忽略使用情况
- 度量指标过多却无法驱动行动

**延伸追问**：
- 发现某组件使用率低但维护成本高时如何处理？
- 度量数据如何反馈到组件设计阶段？

**口头回答版**：
> - 单元测试覆盖率、交互测试覆盖率。 - 视觉回归覆盖率。 - 可访问性扫描通过率（axe-core）。 - TypeScript 类型严格度。

---

### FB-14-SC-R-001：从 0 到 1 建设组件库，如何进行技术选型？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：技术选型、组件库、构建工具、样式方案、测试
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请从框架、样式、构建、文档、测试、发布六个方面，说明组件库 0 到 1 的技术选型思路。

**参考答案**：

1. **框架**
   - 根据团队现状选择 React / Vue / 跨框架。
   - 若需跨端，评估 React Native、Taro 等方案。

2. **样式方案**
   - 推荐 CSS Modules + CSS Variables：轻量、无运行时开销、Tree Shaking 友好。
   - 需要强动态主题时可选 CSS-in-JS，但关注 SSR 与性能。
   - 原子化 CSS（Tailwind）适合快速构建，但组件库长期维护需谨慎。

3. **构建工具**
   - Rollup / Vite Library Mode：输出 ESM/CJS/UMD，支持 Tree Shaking。
   - tsup：快速打包 TS 库。
   - 避免 Webpack 用于库构建（配置复杂、产物大）。

4. **文档**
   - Storybook：组件开发、交互测试、视觉回归。
   - VitePress / Docusaurus：设计指南、使用文档。

5. **测试**
   - Vitest / Jest：单元测试。
   - React Testing Library / Vue Test Utils：组件测试。
   - Playwright：E2E 与视觉回归。
   - Chromatic / Loki：视觉回归。

6. **发布**
   - pnpm workspace + Turborepo。
   - Changesets 版本与 changelog。
   - npm registry / 私有仓库。

选型原则：优先选择团队熟悉、社区活跃、长期维护有保障的方案；避免过度追求新技术。

**评分维度**：
- 六个维度覆盖度（40%）
- 选型理由充分（30%）
- 权衡与取舍（30%）

**常见错误**：
- 选型只看流行度，不看团队现状
- 同时引入多种样式方案，增加维护成本

**延伸追问**：
- 如果三年后需要迁移框架，当前选型如何降低迁移成本？
- 如何评估 CSS-in-JS 的运行时开销是否可接受？

**口头回答版**：
> - 根据团队现状选择 React / Vue / 跨框架。 - 若需跨端，评估 React Native、Taro 等方案。 - 推荐 CSS Modules + CSS Variables：轻量、无运行时开销、Tree Shaking 友好。 - 需要强动态主题时可选 CSS-in-JS，但关注 SSR 与性能。

---

### FB-14-SD-R-007：如何保障设计与研发实现的一致性？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：设计一致性、Design Token、交付流程、自动化校验
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套体系，持续保障设计稿与前端实现之间的一致性，减少设计与研发交付偏差。

**参考答案**：

1. **同源数据**
   - Design Token 作为设计与研发共同数据源。
   - Figma Variables 与代码 Token JSON 双向同步。

2. **标准化交付**
   - 设计稿标注使用 Token 名称而非具体数值。
   - 组件状态与 Storybook Story 一一对应。
   - 设计评审在 Storybook 中完成。

3. **自动化校验**
   - 业务代码扫描：检测硬编码色值/间距，推荐替换为 Token。
   - 视觉回归：对比 Figma 导出图与组件截图。
   - Token 一致性检查：CI 校验代码与 Token 源无偏差。

4. **流程保障**
   - 设计变更走 RFC，同步更新代码。
   - 组件上线前设计师走查签字。
   - 定期设计-研发对齐会。

5. **工具链**
   - Figma Plugin：导出 Token、标注组件链接。
   - Style Dictionary：Token 转代码。
   - Chromatic：视觉回归。
   - 自定义 ESLint/Stylelint 规则。

6. **度量与反馈**
   - 统计设计返工率、视觉 bug 数量。
   - 将一致性指标纳入团队考核。

**评分维度**：
- 同源数据机制（25%）
- 交付与评审流程（25%）
- 自动化校验（25%）
- 度量与持续改进（25%）

**常见错误**：
- 只依赖人工走查，无法规模化
- Token 不同步，设计稿与代码各用各的

**延伸追问**：
- 视觉回归测试能否完全替代人工设计走查？
- 设计师不参与代码，如何保证评审有效性？

**口头回答版**：
> - Design Token 作为设计与研发共同数据源。 - Figma Variables 与代码 Token JSON 双向同步。 - 设计稿标注使用 Token 名称而非具体数值。 - 组件状态与 Storybook Story 一一对应。

---

### FB-14-CP-R-001：展望未来 3-5 年，设计系统与组件库会如何演进？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：设计系统演进、AI、设计工具、跨平台、Web Components
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请谈谈你对设计系统与组件库未来发展趋势的看法，以及前端架构师应如何提前布局。

**参考答案**：

趋势判断：

1. **AI 辅助设计与生成**
   - AI 根据设计意图生成组件代码与 Token。
   - 设计稿到代码的转换更加智能（Figma to Code）。
   - 组件文档、测试用例、变更日志由 AI 辅助生成。

2. **Design Token 标准化**
   - W3C Design Tokens 格式规范逐渐统一。
   - Token 成为设计与研发之间真正的"通用语言"。

3. **跨平台与跨框架**
   - 一套核心逻辑服务 Web、小程序、桌面端。
   - Headless + 原生适配层成为主流。

4. **可访问性内建**
   - a11y 不再是可选项，而是组件库默认能力。
   - 自动化可访问性测试成为 CI 标配。

5. **实时协作与度量平台**
   - 设计系统平台化，集成 Token、组件、文档、度量、治理。
   - 设计与开发在同一平台实时协作。

6. **性能与可持续发展**
   - 更关注碳排放与包体积，推动绿色前端。
   - 组件库按使用场景拆分，避免过度加载。

布局建议：

- 尽早将 Token 体系化、标准化。
- 投资于 Headless 与跨框架能力建设。
- 构建可度量、可治理的设计系统平台。
- 保持对 AI 工具的敏感度，探索人机协作流程。

**评分维度**：
- 趋势洞察深度（40%）
- 与当前工作结合（30%）
- 布局建议可行性（30%）

**常见错误**：
- 只谈技术趋势，忽略设计与组织变革
- 观点空泛，没有结合自身项目思考

**延伸追问**：
- AI 生成代码对组件库质量保障提出哪些新要求？
- 你们团队未来一年在设计系统上最重要的投资是什么？

**口头回答版**：
> AI 辅助设计与生成 - AI 根据设计意图生成组件代码与 Token。 - 设计稿到代码的转换更加智能（Figma to Code）。 - 组件文档、测试用例、变更日志由 AI 辅助生成。

---

### FB-14-SD-R-008：如何构建组件库的可访问性工程化体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：可访问性、a11y、工程化、自动化测试、WCAG
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套可访问性工程化体系，确保组件库从设计、开发到发布都能持续满足 WCAG 标准。

**参考答案**：

1. **设计阶段**
   - 设计规范中明确颜色对比度、焦点样式、触摸目标尺寸。
   - 设计稿标注 ARIA 角色、键盘交互流程。
   - 提供可访问性检查清单模板。

2. **开发阶段**
   - 组件模板内置 a11y 属性（role、aria-*、键盘事件）。
   - 封装 `useFocusTrap`、`useRovingTabIndex`、`useId` 等 Hooks。
   - 使用语义化 HTML，避免 `div` 模拟按钮。

3. **测试阶段**
   - 单元测试：jest-axe 对每个组件做静态扫描。
   - E2E 测试：键盘导航、屏幕阅读器关键路径。
   - 视觉回归：焦点态、高对比度模式截图。
   - 手动测试：使用 NVDA、VoiceOver 走查。

4. **CI/CD 集成**

```yaml
- name: Accessibility Audit
  run: pnpm test:a11y
- name: Build Storybook
  run: pnpm storybook:build
- name: A11y Storybook Tests
  run: pnpm test:storybook --a11y
```

5. **文档与培训**
   - 每个组件文档包含键盘交互说明。
   - 定期组织 a11y 培训与案例分享。
   - 发布可访问性声明与合规报告。

6. **度量与治理**
   - 统计 a11y 问题数量、修复率。
   - 将可访问性纳入组件上线标准。
   - 定期第三方审计。

**评分维度**：
- 全流程覆盖度（30%）
- 自动化测试与 CI 集成（30%）
- 工具与模板设计（20%）
- 治理与培训（20%）

**常见错误**：
- 只依赖开发自觉，无工程化约束
- 把 a11y 测试放在最后，上线前才发现大量问题

**延伸追问**：
- 如何说服业务方为可访问性投入资源？
- 屏幕阅读器测试如何在 CI 中自动化？

**参考资源**：
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core](https://github.com/dequelabs/axe-core)

**口头回答版**：
> - 设计规范中明确颜色对比度、焦点样式、触摸目标尺寸。 - 设计稿标注 ARIA 角色、键盘交互流程。 - 提供可访问性检查清单模板。 - 组件模板内置 a11y 属性（role、aria-*、键盘事件）。

---

### FB-14-CO-B-011：什么是组件库的图标系统（Icon System）？有哪些常见方案？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：图标系统、Icon、SVG、字体图标、组件库
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释组件库中图标系统的作用，并列举至少三种常见的图标方案及其适用场景。

**参考答案**：

图标系统是组件库中用于统一图标资产、使用方式与视觉风格的子系统，作用包括：保证全产品图标风格一致；提供一致的尺寸、颜色、可访问性接口；支持主题切换与按需加载。

常见方案：

1. **SVG 图标（推荐）**
   - 每个图标是一个独立 SVG 文件或 React/Vue 组件。
   - 优点：矢量无损、支持多色与动态颜色、可通过 `currentColor` 继承文字色。
   - 缺点：需要构建工具支持按需引入与 Tree Shaking。

2. **Icon Font（字体图标）**
   - 将图标做成字体文件，通过 CSS class 或 Unicode 使用。
   - 优点：兼容性好、文件小、适合大量单色图标。
   - 缺点：多色支持差、可访问性处理麻烦、子像素渲染可能模糊。

3. **SVG Symbol / Sprite**
   - 将多个图标合并成一个 symbol 集合，通过 `<use>` 引用。
   - 优点：减少 HTTP 请求、支持缓存。
   - 缺点：构建配置稍复杂、动态新增图标不够灵活。

4. **CSS Background / Mask**
   - 使用 CSS mask 或背景图实现图标。
   - 优点：无额外 DOM。
   - 缺点：可访问性差、颜色与尺寸控制受限。

```jsx
// SVG 图标组件示例
import { CloseIcon } from '@ds/icons';
<CloseIcon size="16" color="currentColor" aria-label="关闭" />
```

**评分维度**：
- 图标系统价值理解（30%）：一致性、可维护性、可访问性
- 三种方案覆盖度（40%）：说出 SVG、Icon Font、Sprite 等
- 方案优缺点与选型（30%）：能否结合组件库场景做推荐

**常见错误**：
- 把图标系统简单理解为“把图标放一起”
- 忽略图标的可访问性（aria-label、role）
- 选择字体图标但业务需要多色图标

**延伸追问**：
- 如何实现图标按需加载，避免全量打包？
- 如果设计稿新增图标，如何同步到代码库？

**相关题目**：
- [FB-14-SC-A-010 如何为组件库设计一套图标按需加载方案](#)

**口头回答版**：
> 图标系统是组件库中用于统一图标资产、使用方式与视觉风格的子系统，作用包括：保证全产品图标风格一致；提供一致的尺寸、颜色、可访问性接口；支持主题切换与按需加载。 SVG 图标（推荐） - 每个图标是一个独立 SVG 文件或 React/Vue 组件。 - 优点：矢量无损、支持多色与动态颜色、可通过 currentColor 继承文字色。

---

### FB-14-CO-B-012：组件库中的 Slot/插槽机制有什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：插槽、Slot、组合模式、组件扩展、灵活性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释组件库中 Slot（插槽）机制的作用，并说明它与 props 传入内容的主要区别。

**参考答案**：

Slot/插槽机制允许组件在预定义位置接收外部传入的内容（DOM、组件或渲染逻辑），从而在不修改组件内部代码的情况下定制局部 UI。

与 props 传入内容的区别：

| 维度 | Props 传内容 | Slot 插槽 |
|------|-------------|----------|
| 控制能力 | 组件内部决定如何渲染 | 外部决定渲染什么 |
| 灵活性 | 适合字符串、简单配置 | 适合复杂结构、交互、样式 |
| 可组合性 | 低 | 高 |
| 典型场景 | title、description | header、footer、extra、empty |

```jsx
// React 中常用 children/render props 模拟插槽
<Card>
  <Card.Header>自定义标题</Card.Header>
  <Card.Body>内容区</Card.Body>
  <Card.Footer actions={actions} />
</Card>
```

作用：

1. **提高扩展性**：业务方可在保留组件行为的同时替换局部 UI。
2. **解耦内容与结构**：组件负责布局与交互，业务方负责内容。
3. **支持多态渲染**：同一组件可呈现完全不同的外观。

**评分维度**：
- 插槽概念准确性（40%）
- 与 props 的区别（30%）
- 能举出组件库中的插槽示例（30%）

**常见错误**：
- 把所有扩展点都用 props 实现，导致 API 臃肿
- 滥用插槽导致组件内部结构失控
- 忽略插槽内容与组件状态的上下文传递

**延伸追问**：
- Vue 的 slot 与 React 的 children/render props 有何异同？
- 如何在插槽中共享组件内部状态？

**相关题目**：
- [FB-14-CO-B-007 组合（Composition）与配置（Configuration）式组件有什么区别](#)

**口头回答版**：
> Slot/插槽机制允许组件在预定义位置接收外部传入的内容（DOM、组件或渲染逻辑），从而在不修改组件内部代码的情况下定制局部 UI。 与 props 传入内容的区别： | 维度 | Props 传内容 | Slot 插槽 | |------|-------------|----------|

---

### FB-14-CO-B-013：如何理解组件的 Props 透传（Props Spreading）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：Props、透传、API 设计、组件封装、扩展性
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释什么是 Props 透传，并说明在组件库设计中应如何安全使用。

**参考答案**：

Props 透传是指将父组件接收到的 props 整体或部分传递给子组件（通常是底层 DOM 元素或原生组件），以减少重复声明、支持原生能力。

```jsx
function Button({ children, ...rest }) {
  return <button {...rest}>{children}</button>;
}
```

安全使用原则：

1. **明确透传目标**：是透传给底层 DOM，还是内部子组件。
2. **过滤内部 props**：避免将组件内部使用的 props（如 `loading`、`size`）传入 DOM 导致 React warning。
3. **保留类型安全**：使用 TypeScript 的 `React.ComponentPropsWithoutRef` 推断原生属性。
4. **控制优先级**：组件级 props 应覆盖透传的原生属性，避免行为冲突。

```tsx
type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  loading?: boolean;
};

function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button {...rest} disabled={rest.disabled || loading}>
      {loading ? '加载中' : children}
    </button>
  );
}
```

**评分维度**：
- 透传概念准确（40%）
- 安全风险识别（30%）：过滤内部 props、避免非法 DOM 属性
- 类型安全实践（30%）

**常见错误**：
- 直接 `<button {...props}>` 导致非法属性透传到 DOM
- 透传后内部 props 与原生 props 冲突未处理
- 为了透传而透传，破坏组件封装边界

**延伸追问**：
- 如何在不丢失类型的情况下实现 ref 透传？
- 多层级组件透传时如何避免 props drilling？

**口头回答版**：
> Props 透传是指将父组件接收到的 props 整体或部分传递给子组件（通常是底层 DOM 元素或原生组件），以减少重复声明、支持原生能力。 明确透传目标：是透传给底层 DOM，还是内部子组件。 过滤内部 props：避免将组件内部使用的 props（如 loading、size）传入 DOM 导致 React warning。 保留类型安全：使用 TypeScript 的 React.ComponentPropsWithoutRef 推断原生属性。

---

### FB-14-CO-B-014：什么是 CSS 自定义属性（CSS Variables）？在组件库中如何使用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：CSS 变量、CSS 自定义属性、主题、Design Token、组件库
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CSS 自定义属性的概念，并说明它在组件库主题系统中的作用。

**参考答案**：

CSS 自定义属性（CSS Variables）是原生支持的变量机制，以 `--` 开头，通过 `var()` 引用，可在运行时动态修改。

```css
:root {
  --color-primary: #1677ff;
  --spacing-md: 16px;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}
```

在组件库中的作用：

1. **主题切换**：通过修改根元素的 CSS 变量即可切换浅色/深色/品牌主题，无需重新编译。
2. **Token 落地**：Design Token 通常以 CSS 变量形式输出，实现设计与代码同源。
3. **局部覆盖**：业务方可在组件作用域内覆盖变量，实现细粒度定制。
4. **运行时动态**：支持 JS 动态修改变量值，响应用户偏好或配置。

```css
[data-theme="dark"] {
  --color-primary: #3b82f6;
}
```

**评分维度**：
- CSS 变量概念（40%）
- 在组件库主题系统中的作用（40%）
- 能否写出覆盖示例（20%）

**常见错误**：
- 将 CSS 变量与 Sass/Less 变量混为一谈
- 忽略 IE11 兼容性（现代项目通常可忽略）
- 变量命名无层级，导致维护困难

**延伸追问**：
- CSS 变量与 JS 主题对象各有什么优劣？
- 如何实现组件级局部主题覆盖？

**相关题目**：
- [FB-14-CO-B-001 什么是 Design Token？它解决了什么问题](#)

**口头回答版**：
> CSS 自定义属性（CSS Variables）是原生支持的变量机制，以 -- 开头，通过 var() 引用，可在运行时动态修改。 主题切换：通过修改根元素的 CSS 变量即可切换浅色/深色/品牌主题，无需重新编译。 Token 落地：Design Token 通常以 CSS 变量形式输出，实现设计与代码同源。 局部覆盖：业务方可在组件作用域内覆盖变量，实现细粒度定制。

---

### FB-14-CO-B-015：组件库文档应该包含哪些核心内容？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：组件文档、Storybook、使用指南、API 文档、组件库
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明一份完整的组件库文档应包含哪些核心内容，并解释它们的价值。

**参考答案**：

完整组件库文档应包含：

1. **设计指南（Design Guidelines）**
   - 何时使用该组件、使用原则、与其他组件的关系。
   - 价值：保证设计与研发对组件语义理解一致。

2. **使用示例（Usage / Examples）**
   - 常见用法、变体组合、完整代码片段。
   - 价值：降低上手成本，减少错误使用。

3. **API 参考（API Reference）**
   - 每个 props 的名称、类型、默认值、是否必填。
   - 价值：开发时快速查阅，减少源码阅读。

4. **变更日志（Changelog）**
   - 版本变更、破坏性变更、迁移说明。
   - 价值：帮助业务方安全升级。

5. **可访问性说明（Accessibility）**
   - 键盘交互、ARIA 角色、焦点管理。
   - 价值：满足合规要求，服务多元用户。

6. **设计 Token 与主题（Tokens & Theming）**
   - 组件消费的 Token、可定制变量、主题覆盖方式。
   - 价值：支持二次定制与品牌扩展。

**评分维度**：
- 核心内容覆盖度（50%）：至少说出 4 项
- 各项内容价值解释（30%）
- 是否有文档工具实践经验（20%）

**常见错误**：
- 只写 API，没有使用示例
- 示例代码不可运行或与实际组件不符
- 缺少变更日志导致升级困难

**延伸追问**：
- 如何让设计师也参与文档维护？
- 文档站点如何与 Storybook 结合？

**相关题目**：
- [FB-14-CO-B-009 Storybook 在组件库开发中的主要作用是什么](#)

**口头回答版**：
> 完整组件库文档应包含： 设计指南（Design Guidelines） - 何时使用该组件、使用原则、与其他组件的关系。 - 价值：保证设计与研发对组件语义理解一致。

---

### FB-14-CO-B-016：什么是 Polymorphic Component（多态组件）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：多态组件、Polymorphic、as、组件封装、TypeScript
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Polymorphic Component（多态组件）的概念，并举例说明它在组件库中的应用场景。

**参考答案**：

Polymorphic Component 是指可以通过一个 prop（通常是 `as`）改变其渲染元素类型的组件。它保留组件的样式与行为，但允许最终渲染为不同的 HTML 标签或组件。

```tsx
// Button 默认渲染为 <button>，也可渲染为 <a> 或 Link
<Button as="a" href="/home">首页</Button>
<Button as={Link} to="/home">首页</Button>
```

应用场景：

1. **语义化需求**：同一样式在不同场景需要不同标签（如 `button` vs `a`）。
2. **路由集成**：与 React Router、Next.js Link 等路由组件结合。
3. **保持设计一致性**：外观统一但底层元素由业务决定。

实现要点：

- 使用 TypeScript 泛型推断 `as` 对应的 props。
- 过滤掉当前元素不支持的 props，避免传入非法属性。
- 保留 ref 转发能力。

**评分维度**：
- 概念准确性（40%）
- 应用场景举例（30%）
- 实现要点与类型安全（30%）

**常见错误**：
- 与“条件渲染”混淆
- 忽略 `as` 改变后对应 props 的类型变化
- 为了多态而多态，增加不必要的复杂度

**延伸追问**：
- 如何在 TypeScript 中优雅实现 Polymorphic 类型？
- `as` 与 `component` 两种命名约定有何区别？

**口头回答版**：
> Polymorphic Component 是指可以通过一个 prop（通常是 as）改变其渲染元素类型的组件。 它保留组件的样式与行为，但允许最终渲染为不同的 HTML 标签或组件。 语义化需求：同一样式在不同场景需要不同标签（如 button vs a）。 路由集成：与 React Router、Next.js Link 等路由组件结合。

---

### FB-14-CO-B-017：组件库中如何处理浏览器兼容性问题？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：浏览器兼容、Polyfill、CSS、组件库、渐进增强
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明组件库在开发和发布过程中应如何处理浏览器兼容性问题。

**参考答案**：

处理策略：

1. **明确浏览器矩阵（Browser Matrix）**
   - 在 README 中声明支持的浏览器及最低版本（如 Chrome 90+、Safari 14+、Edge 90+、Firefox 88+）。
   - 根据目标用户调整，避免过度兼容旧浏览器。

2. **构建时转译**
   - 使用 Babel/SWC 将现代语法转译为兼容语法。
   - 通过 `.browserslistrc` 控制目标浏览器。

3. **CSS 前缀与 Polyfill**
   - 使用 Autoprefixer 处理 CSS 前缀。
   - 对 Container Query、Popover API 等新特性按需引入 polyfill 或提供降级方案。

4. **渐进增强与优雅降级**
   - 核心功能必须可用，增强体验可逐步启用。
   - 例如：暗黑模式在不支持的浏览器中回退到默认主题。

5. **测试覆盖**
   - 在 Playwright/BrowserStack 中对主流浏览器做回归测试。
   - 重点关注焦点管理、弹层、动画在低版本浏览器的表现。

**评分维度**：
- 浏览器矩阵意识（25%）
- 构建与转译策略（25%）
- Polyfill 与降级方案（25%）
- 测试覆盖（25%）

**常见错误**：
- 支持范围不明确，导致偶发兼容问题
- 为了兼容旧浏览器引入大量 polyfill，显著增加包体积
- 只在 Chrome 中测试就发布

**延伸追问**：
- 如何评估某个 CSS 新特性是否可以在组件库中使用？
- 组件库是否应该在内部集成 polyfill，还是由业务方决定？

**口头回答版**：
> 明确浏览器矩阵（Browser Matrix） - 在 README 中声明支持的浏览器及最低版本（如 Chrome 90+、Safari 14+、Edge 90+、Firefox 88+）。 - 根据目标用户调整，避免过度兼容旧浏览器。 - 使用 Babel/SWC 将现代语法转译为兼容语法。

---

### FB-14-CO-B-018：什么是 Tree Shaking？组件库如何支持它？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：Tree Shaking、打包、ESM、按需加载、包体积
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Tree Shaking 的概念，并说明组件库应如何打包以支持 Tree Shaking。

**参考答案**：

Tree Shaking 是构建工具（如 Rollup、Webpack、Vite）在打包时移除未引用代码的优化技术，依赖 ES Module 的静态结构进行分析。

组件库支持 Tree Shaking 的做法：

1. **输出 ESM 格式**
   - 在 `package.json` 中设置 `"module"`、`"exports"` 指向 ESM 产物。
   - 提供 `"sideEffects"` 字段，明确哪些文件有副作用。

2. **保持模块粒度**
   - 每个组件独立文件，避免所有组件打包在一个 IIFE 中。
   - 工具函数单独导出，避免间接引入未使用的模块。

3. **避免副作用**
   - 不在模块顶层修改全局对象或执行立即渲染。
   - CSS 导入可标记为 sideEffects: true。

```json
{
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "sideEffects": ["*.css", "*.less"],
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js"
    }
  }
}
```

**评分维度**：
- Tree Shaking 概念准确（40%）
- ESM 与 sideEffects 配置（30%）
- 模块粒度与副作用控制（30%）

**常见错误**：
- 只输出 UMD/CJS，无法被现代构建工具 Tree Shaking
- 在组件库入口统一引入所有组件样式，导致全量加载
- 误认为任何导入都能被 Tree Shaking

**延伸追问**：
- Tree Shaking 与按需引入（Babel Plugin Import）有什么区别？
- 如何验证组件库在业务项目中的 Tree Shaking 效果？

**相关题目**：
- [FB-14-SC-A-016 如何设计组件库的按需加载](#)

**口头回答版**：
> Tree Shaking 是构建工具（如 Rollup、Webpack、Vite）在打包时移除未引用代码的优化技术，依赖 ES Module 的静态结构进行分析。 组件库支持 Tree Shaking 的做法： - 在 package.json 中设置 "module"、"exports" 指向 ESM 产物。 - 提供 "sideEffects" 字段，明确哪些文件有副作用。

---

### FB-14-SC-A-008：如何设计一个支持多尺寸变体的 Button 组件？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Button、尺寸变体、API 设计、组件设计、Design Token
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请为组件库设计一个支持多种尺寸（如 small / medium / large）的 Button 组件，说明其 API、样式实现与可扩展性设计。

**参考答案**：

API 设计：

```tsx
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonStatus = 'primary' | 'success' | 'warning' | 'danger';

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  status?: ButtonStatus;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}
```

样式实现：

1. **尺寸 Token 化**
   - 将 padding、font-size、height、icon-size 映射到 Design Token。
   - 避免硬编码，便于主题覆盖。

```css
.ds-btn--small {
  padding: var(--btn-padding-sm);
  font-size: var(--font-size-sm);
  height: var(--btn-height-sm);
}
```

2. **变体组合**
   - 尺寸、变体、状态独立组合，避免 class 爆炸。
   - 使用 CSS 变量控制不同变体下的颜色。

3. **可扩展性**
   - 支持 `className` / `style` 覆盖。
   - 提供 `--button-*` 级 CSS 变量供业务方定制。

**评分维度**：
- API 设计合理性（30%）
- 尺寸 Token 化与样式结构（30%）
- 变体组合与可扩展性（25%）
- 可访问性考虑（15%）：loading 时 disabled、焦点样式

**常见错误**：
- 尺寸参数与 padding/height 全部硬编码
- 尺寸 × 变体 × 状态产生大量重复 CSS
- 忽略 loading 状态下按钮的可访问性

**延伸追问**：
- 如果业务需要新增一个 xsmall 尺寸，改动范围有多大？
- 如何在保持 API 简洁的同时支持图标按钮的独立尺寸？

**口头回答版**：
> 尺寸 Token 化 - 将 padding、font-size、height、icon-size 映射到 Design Token。 - 避免硬编码，便于主题覆盖。 - 尺寸、变体、状态独立组合，避免 class 爆炸。

---

### FB-14-SC-A-009：设计一个通用 Form 组件时，如何统一校验与错误提示？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Form、表单、校验、错误提示、受控组件、组件设计
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请为组件库设计一个通用 Form 组件，重点说明如何统一字段校验、错误提示与表单状态管理。

**参考答案**：

设计思路：

1. **表单上下文（FormContext）**
   - 通过 Context 管理字段值、校验状态、错误信息。
   - 各表单组件通过 `useField` 注册自身，避免手动同步。

2. **校验规则抽象**
   - 提供 `rules` prop 支持必填、类型、正则、自定义函数。
   - 支持同步与异步校验。

```tsx
<Form onSubmit={handleSubmit}>
  <Form.Item name="email" rules={[{ required: true }, { type: 'email' }]}>
    <Input />
  </Form.Item>
  <Form.Item name="age" rules={[{ min: 18, message: '年龄需大于 18' }]}>
    <InputNumber />
  </Form.Item>
</Form>
```

3. **错误提示统一**
   - 在 Form.Item 中统一渲染错误信息，保持样式一致。
   - 支持错误位置配置（下方、右侧、tooltip）。

4. **状态反馈**
   - 校验中、成功、错误状态通过 UI 反馈（边框色、图标、消息）。
   - 提交时统一收集并展示错误。

5. **与受控组件集成**
   - 通过 `value` / `onChange` 协议与 Input、Select 等组件对接。

**评分维度**：
- 校验规则设计（30%）
- 表单状态管理（25%）
- 错误提示统一性（25%）
- 与受控组件的集成（20%）

**常见错误**：
- 每个表单组件各自管理校验，缺乏统一协议
- 异步校验未做竞态处理
- 错误提示样式不统一，业务方各自实现

**延伸追问**：
- 如何处理表单字段之间的联动校验？
- 表单性能优化（如大量字段时）有哪些手段？

**口头回答版**：
> 表单上下文（FormContext） - 通过 Context 管理字段值、校验状态、错误信息。 - 各表单组件通过 useField 注册自身，避免手动同步。 - 提供 rules prop 支持必填、类型、正则、自定义函数。

---

### FB-14-SC-A-010：如何为组件库设计一套图标按需加载方案？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：图标系统、按需加载、Tree Shaking、SVG、构建优化
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
组件库图标数量通常很多，如何设计一套按需加载方案，避免业务项目打包全部图标？

**参考答案**：

方案一：**单文件单图标 + 统一入口按需导出**

```ts
// icons/index.ts 仅做重导出
export { default as CloseIcon } from './CloseIcon';
export { default as SearchIcon } from './SearchIcon';
```

业务方按需引入：

```tsx
import { CloseIcon } from '@ds/icons';
```

构建工具通过 ESM Tree Shaking 自动剔除未使用图标。

方案二：**子路径导入**

```tsx
import CloseIcon from '@ds/icons/CloseIcon';
```

优点明确、无需 Tree Shaking；缺点路径记忆成本高。

方案三：**Babel / Unplugin 自动转换**

```ts
// 配置插件将 { CloseIcon } from '@ds/icons' 转换为单文件导入
import CloseIcon from '@ds/icons/esm/CloseIcon';
```

工程配套：

- `sideEffects` 正确声明，避免图标文件被误删。
- 图标组件本身无额外依赖、无运行时状态。
- 提供 SVG Sprite 模式作为替代，适合大量图标同时渲染场景。

**评分维度**：
- 按需加载方案覆盖度（40%）
- Tree Shaking 与 ESM 配合（30%）
- 工程配置与边界场景（30%）

**常见错误**：
- 所有图标打包在一个文件中，无法按需加载
- 图标组件依赖全局样式或运行时主题，导致副作用
- 未配置 sideEffects，构建工具错误 Tree Shaking

**相关题目**：
- [FB-14-CO-B-018 什么是 Tree Shaking](#)

**口头回答版**：
> 方案一：单文件单图标 + 统一入口按需导出 构建工具通过 ESM Tree Shaking 自动剔除未使用图标。 优点明确、无需 Tree Shaking；缺点路径记忆成本高。 方案三：Babel / Unplugin 自动转换

---

### FB-14-SC-A-011：设计一个可复用的 Table 组件需要考虑哪些扩展点？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Table、表格、API 设计、可扩展性、组件设计
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请设计一个通用 Table 组件，列举其核心 API 与关键扩展点，并说明如何平衡通用性与易用性。

**参考答案**：

核心 API：

```tsx
interface TableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  rowKey: string | ((record: T) => string | number);
  loading?: boolean;
  pagination?: PaginationConfig | false;
  rowSelection?: RowSelectionConfig<T>;
  onRow?: (record: T, index: number) => RowConfig;
}
```

关键扩展点：

1. **列定义扩展**
   - `render` 自定义单元格内容。
   - `sorter`、`filters` 支持排序与筛选。
   - `fixed`、`width` 支持固定列与宽度。

2. **行操作扩展**
   - `onRow` 配置行点击、双击、className。
   - `rowSelection` 支持单选/多选/全选。

3. **空状态与加载**
   - `empty` 插槽自定义无数据展示。
   - `loading` 统一加载骨架屏。

4. **滚动与布局**
   - 支持横向/纵向滚动、固定表头、固定列。
   - 虚拟滚动优化大数据量渲染。

5. **组合式 API**
   - 提供 `<Table>`、`<Table.Column>`、`<Table.ColumnGroup>` 等复合组件，兼顾配置式与组合式用法。

**评分维度**：
- 核心 API 完整性（30%）
- 扩展点覆盖度（35%）
- 通用性与易用性平衡（20%）
- 性能考虑（15%）：虚拟滚动、分页

**常见错误**：
- 扩展点过多导致 API 复杂难用
- 只支持配置式，无法满足复杂自定义需求
- 忽略大数据量下的渲染性能

**延伸追问**：
- 如何实现表格列的拖拽排序？
- 虚拟滚动与固定列同时存在时需要注意什么？

**口头回答版**：
> - render 自定义单元格内容。 - sorter、filters 支持排序与筛选。 - fixed、width 支持固定列与宽度。 - onRow 配置行点击、双击、className。

---

### FB-14-SC-A-012：如何在组件库中实现平滑的动画与过渡效果？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：动画、过渡、Transition、CSS、性能、组件设计
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明在组件库中为 Modal、Toast、Menu 等组件实现动画与过渡效果时应考虑哪些问题，并给出方案。

**参考答案**：

核心原则：

1. **优先使用 CSS 过渡/动画**
   - `transition`、`animation` 性能优于 JS 动画。
   - 使用 `transform` 与 `opacity`，避免触发布局重排。

2. **进入/离开状态管理**
   - 为组件定义 `enter`、`enter-active`、`exit`、`exit-active` 状态。
   - 配合 React Transition Group / Vue Transition 等库管理生命周期。

3. **可配置与可禁用**
   - 提供 `duration`、`easing`、`animation` 等 prop。
   - 支持 `prefers-reduced-motion`，尊重用户减少动画偏好。

```css
.modal-enter {
  opacity: 0;
  transform: scale(0.96);
}
.modal-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 200ms, transform 200ms ease-out;
}
```

4. **弹层类组件特殊处理**
   - 卸载时需要等待动画结束再真正移除 DOM。
   - 处理多个弹层叠加时的动画时序。

5. **性能与可访问性**
   - 使用 `will-change` 谨慎优化。
   - 动画不影响焦点管理与屏幕阅读器。

**评分维度**：
- CSS 动画优先意识（25%）
- 状态生命周期管理（30%）
- 可配置与可访问性（25%）
- 性能优化意识（20%）

**常见错误**：
- 使用 JS 逐帧修改 width/height/top/left 导致重排
- 忽略 `prefers-reduced-motion`
- 组件卸载时直接移除 DOM，导致退出动画丢失

**延伸追问**：
- 如何在 React 18 的并发模式下安全使用动画？
- 如何对复杂布局变化（如高度展开）做平滑动画？

**口头回答版**：
> 优先使用 CSS 过渡/动画 - transition、animation 性能优于 JS 动画。 - 使用 transform 与 opacity，避免触发布局重排。 - 为组件定义 enter、enter-active、exit、exit-active 状态。

---

### FB-14-SC-A-013：如何设计一个通用 Notification/Toast 组件？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Notification、Toast、消息提示、API 设计、组件设计
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请为组件库设计一个全局消息提示组件（Notification / Toast），包括命令式调用 API、渲染位置、动画与状态管理。

**参考答案**：

命令式 API 设计：

```ts
Toast.info('操作成功');
Toast.success({ content: '保存成功', duration: 3000 });
Toast.error({ content: '网络异常', closable: true });
Toast.loading('加载中...');
```

架构设计：

1. **全局容器**
   - 在 body 下挂载唯一容器，所有消息项按顺序渲染。
   - 支持多个挂载位置（top-left、top-right、bottom-center 等）。

2. **命令式调用与内部状态**
   - 通过全局 store 或 ref 管理消息队列。
   - 每个消息生成唯一 id，支持手动关闭。

3. **自动关闭与生命周期**
   - 默认 duration 后自动移除。
   - 鼠标悬停时暂停计时，提升可访问性。

4. **动画**
   - 进入/离开动画使用 CSS transition。
   - 队列更新时保持现有项位置稳定。

5. **可访问性**
   - 使用 `role="alert"` / `role="status"`。
   - 提供 `aria-live` 区域，让屏幕阅读器播报。

```tsx
const id = Toast.success('保存成功');
Toast.close(id);
```

**评分维度**：
- API 设计（30%）
- 全局状态与容器管理（25%）
- 动画与生命周期（20%）
- 可访问性（15%）
- 扩展性（10%）：自定义图标、操作按钮

**常见错误**：
- 命令式调用导致无法与 React 状态同步
- 消息层叠顺序与 z-index 管理混乱
- 自动关闭未考虑屏幕阅读器用户

**延伸追问**：
- 命令式 API 与声明式 API 如何共存？
- 多实例消息如何避免重复渲染容器？

**口头回答版**：
> 命令式 API 设计： - 在 body 下挂载唯一容器，所有消息项按顺序渲染。 - 支持多个挂载位置（top-left、top-right、bottom-center 等）。 命令式调用与内部状态

---

### FB-14-SC-A-014：如何为组件库设计一致的间距与布局系统？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：间距系统、Layout、Design Token、Space、Grid、组件设计
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请为组件库设计一套一致的间距与布局系统，使业务方在页面搭建时能够保持视觉节奏统一。

**参考答案**：

1. **间距 Token 体系**
   - 定义基础单位（如 4px）与阶梯：4、8、12、16、20、24、32、40、48...
   - 用语义化命名：`--space-xs`、`--space-sm`、`--space-md`、`--space-lg`。

2. **通用布局组件**
   - `Space`：控制子元素之间的水平/垂直间距，支持 `size`、`direction`、`align`。
   - `Stack`：垂直堆叠，自动处理相邻元素间距。
   - `Grid`：基于 12/24 列的栅格系统，支持响应式断点。
   - `Divider`：统一分隔线。

```jsx
<Space size="large" direction="vertical">
  <Input />
  <Button>提交</Button>
</Space>
```

3. **组件内部间距**
   - 组件自身 padding、margin 统一引用 Token。
   - 避免业务方随意写死 13px、17px 等不规则值。

4. **文档与约束**
   - 文档中给出常见布局模式。
   - 通过 Stylelint/ESLint 扫描硬编码间距并提示替换。

**评分维度**：
- Token 体系设计（30%）
- 布局组件覆盖度（30%）
- 组件内部间距一致性（20%）
- 约束与文档落地（20%）

**常见错误**：
- 间距值随意定义，没有阶梯体系
- 只提供 Grid，忽略日常小间距场景
- 组件内部硬编码间距，无法随主题变化

**延伸追问**：
- 如何处理组件内部间距与业务外部间距的边界？
- 响应式布局中间距是否需要随断点变化？

**口头回答版**：
> 间距 Token 体系 - 定义基础单位（如 4px）与阶梯：4、8、12、16、20、24、32、40、48... - 用语义化命名：--space-xs、--space-sm、--space-md、--space-lg。 - Space：控制子元素之间的水平/垂直间距，支持 size、direction、align。

---

### FB-14-SC-A-015：组件库如何与 TypeScript 类型系统深度结合？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：TypeScript、类型推导、组件库、类型安全、泛型
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明在组件库开发与交付中，如何利用 TypeScript 提升 API 类型安全、开发体验与可维护性。

**参考答案**：

1. **组件 Props 类型化**
   - 每个组件定义清晰的 interface，区分必填与可选。
   - 使用 `React.ComponentPropsWithoutRef` 继承原生属性。

2. **泛型组件**
   - Table 的 `dataSource`、`columns` 支持泛型，保证 row 类型推导。
   - Select、Cascader 等组件支持选项值类型推导。

3. **联合类型与字面量类型**
   - `size: 'small' | 'medium' | 'large'` 限制非法值。
   - `status: 'primary' | 'success' | 'warning'` 保证语义一致。

4. **Context 与 Hooks 类型**
   - Form、ConfigProvider 等使用泛型 Context。
   - 自定义 Hooks 返回类型明确，避免 any。

5. **类型导出**
   - 导出组件 Props 类型，方便业务方二次封装。
   - 提供 `ComponentProps` 工具类型。

```ts
export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
};
```

**评分维度**：
- Props 类型设计（30%）
- 泛型与推导应用（25%）
- 联合类型约束（20%）
- 类型导出与生态（25%）

**常见错误**：
- 大量使用 `any` 或 `Record<string, unknown>`
- 不导出 Props 类型，业务方无法扩展
- 泛型过度复杂，导致类型推断困难

**延伸追问**：
- 如何为 Polymorphic 组件编写准确的 TypeScript 类型？
- 组件库升级时如何保持类型兼容？

**口头回答版**：
> 组件 Props 类型化 - 每个组件定义清晰的 interface，区分必填与可选。 - 使用 React.ComponentPropsWithoutRef 继承原生属性。 - Table 的 dataSource、columns 支持泛型，保证 row 类型推导。

---

### FB-14-SC-A-016：如何设计组件库的按需加载（Tree Shaking + 按需引入）？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：按需加载、Tree Shaking、ESM、Babel Plugin、包体积
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请设计一套组件库按需加载方案，使业务项目只打包实际使用的组件和样式。

**参考答案**：

方案分层：

1. **ESM 产物支持 Tree Shaking**
   - 输出 `esm/` 目录，配置 `package.json` 的 `module`、`exports`、`sideEffects`。
   - 组件独立文件，避免 barrel 文件引入未使用模块。

2. **组件级子路径导入**

```ts
import Button from '@ds/button';
import '@ds/button/style';
```

3. **Babel / Unplugin 自动转换**

```ts
// 配置插件
{
  libraryName: '@ds',
  camel2DashComponentName: true,
  style: true
}
// 将 import { Button } from '@ds' 转换为子路径导入并引入样式
```

4. **样式按需**
   - 每个组件独立样式文件。
   - 公共 Token/工具样式通过基础包引入，避免重复。

5. **图标、工具函数独立包**
   - `@ds/icons`、`@ds/utils` 单独发布，避免组件包臃肿。

6. **验证与监控**
   - 在示例项目中使用 `rollup-plugin-visualizer` / `webpack-bundle-analyzer` 验证打包体积。
   - CI 中监控单组件引入体积。

**评分维度**：
- ESM 与 Tree Shaking（30%）
- 子路径与插件方案（25%）
- 样式按需策略（25%）
- 验证与监控（20%）

**常见错误**：
- 全部组件打包在一个入口，无法按需
- 样式全量引入，抵消组件按需收益
- sideEffects 配置错误导致样式被误删

**相关题目**：
- [FB-14-CO-B-018 什么是 Tree Shaking](#)

**口头回答版**：
> ESM 产物支持 Tree Shaking - 输出 esm/ 目录，配置 package.json 的 module、exports、sideEffects。 - 组件独立文件，避免 barrel 文件引入未使用模块。 Babel / Unplugin 自动转换

---

### FB-14-SC-P-005：如何设计一个支持动态表单的 Form Engine？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：表单引擎、动态表单、Form Engine、Schema、低代码、组件库
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个基于 JSON Schema 的动态表单引擎，支持根据配置渲染表单、校验规则与联动逻辑。

**参考答案**：

1. **Schema 协议设计**

```json
{
  "type": "object",
  "properties": {
    "username": { "type": "string", "title": "用户名", "required": true },
    "role": { "type": "string", "enum": ["admin", "user"], "title": "角色" },
    "adminCode": { "type": "string", "title": "管理员码", "visible": "role === 'admin'" }
  }
}
```

2. **组件映射表（Widget Map）**
   - `string` -> Input
   - `number` -> InputNumber
   - `boolean` -> Switch
   - `enum` -> Select/Radio
   - 支持自定义 widget 注册。

3. **表单状态与校验**
   - 统一 FormStore 管理字段值、校验状态、错误信息。
   - 校验引擎支持 JSON Schema 校验 + 自定义规则函数。

4. **联动与计算**
   - 提供 `visible`、`disabled`、`value` 等表达式解析。
   - 表达式可访问当前表单值，支持简单逻辑与函数扩展。

5. **事件与提交**
   - 标准化 `onChange`、`onSubmit`、`onReset`。
   - 提交前统一校验并返回结构化错误。

6. **扩展性**
   - 允许注册自定义组件、自定义校验器、自定义布局。

**评分维度**：
- Schema 协议设计（25%）
- 组件映射与注册机制（25%）
- 校验与状态管理（25%）
- 联动逻辑与扩展性（25%）

**常见错误**：
- Schema 协议过于复杂，业务方难以上手
- 联动逻辑硬编码，无法配置化
- 忽略表单嵌套与数组字段场景

**延伸追问**：
- 动态表单引擎与低代码平台如何结合？
- 如何保证复杂联动下的性能？

**口头回答版**：
> Schema 协议设计 组件映射表（Widget Map） - string -> Input - number -> InputNumber

---

### FB-14-SC-P-006：组件库如何做 API 兼容与废弃治理？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：API 兼容、废弃治理、Breaking Change、迁移、SemVer
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
组件库长期演进中必然会出现 API 调整。请说明如何设计一套 API 兼容与废弃治理机制。

**参考答案**：

1. **语义化版本控制**
   - 破坏性变更必须提升 MAJOR 版本。
   - 新功能提升 MINOR，修复提升 PATCH。

2. **渐进式废弃（Deprecation）**
   - 在 MAJOR 版本中标记 `deprecated`，输出控制台 warning。
   - 文档中明确替代方案与移除时间线。

```ts
if (process.env.NODE_ENV !== 'production' && props.visible !== undefined) {
  console.warn('[Button] `visible` is deprecated, use `open` instead.');
}
```

3. **兼容层与 Codemod**
   - 提供 Babel/JSCodeshift 脚本自动替换废弃 API。
   - 在 breaking change 版本中保留临时兼容层。

4. **迁移指南**
   - 每个 MAJOR 版本发布详细迁移文档。
   - 提供 before/after 代码对照与常见问题。

5. **使用扫描与监控**
   - 通过 AST 扫描业务代码中的废弃 API 使用情况。
   - 在 CI 中告警，防止新版本发布前未迁移。

6. **版本策略**
   - 长期支持（LTS）版本，给予业务方足够迁移时间。
   - 避免频繁发布破坏性变更。

**评分维度**：
- 版本策略（25%）
- 废弃标记与 warning（20%）
- Codemod 与迁移工具（25%）
- 监控与治理机制（30%）

**常见错误**：
- 直接删除 API，没有任何兼容期
- warning 信息缺少替代方案
- 没有迁移工具，业务方手动替换成本高

**相关题目**：
- [FB-14-CO-B-010 组件库版本号为什么要遵循语义化版本](#)

**口头回答版**：
> - 破坏性变更必须提升 MAJOR 版本。 - 新功能提升 MINOR，修复提升 PATCH。 渐进式废弃（Deprecation） - 在 MAJOR 版本中标记 deprecated，输出控制台 warning。

---

### FB-14-SC-P-007：如何设计支持国际化的组件库？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：国际化、i18n、Locale、RTL、组件库、多语言
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请为组件库设计一套国际化方案，覆盖文案、日期、数字、RTL 等场景。

**参考答案**：

1. **文案国际化**
   - 组件内置默认文案（中文/英文）。
   - 通过 `LocaleProvider` 或 `ConfigProvider` 注入当前语言包。
   - 允许业务方覆盖特定文案。

```tsx
<ConfigProvider locale={zhCN}>
  <App />
</ConfigProvider>
```

2. **日期/数字/日历**
   - 不内置完整 i18n 库，但提供格式化函数插槽。
   - 与 dayjs、date-fns、Intl.NumberFormat 等库集成。

3. **RTL（从右到左）支持**
   - 通过 `[dir="rtl"]` 或 CSS logical properties 支持布局镜像。
   - 图标、弹层位置、动画方向需适配。

4. **语言包结构**

```ts
{
  locale: 'zh-CN',
  common: { ok: '确定', cancel: '取消' },
  datePicker: { placeholder: '请选择日期' }
}
```

5. **按需加载语言包**
   - 语言包单独打包，业务方按需引入。
   - 避免组件库默认打包所有语言。

6. **开发规范**
   - 组件内所有文案必须从语言包读取。
   - 提供语言包贡献指南。

**评分维度**：
- 文案国际化设计（30%）
- 日期/数字处理（20%）
- RTL 支持（25%）
- 语言包结构与按需加载（15%）
- 开发规范（10%）

**常见错误**：
- 组件内部硬编码中文或英文
- 默认打包所有语言，增加体积
- 只做文案翻译，忽略 RTL 布局

**延伸追问**：
- 业务方如何覆盖组件库默认文案而不 fork 语言包？
- 如何验证新增语言包的完整性？

**口头回答版**：
> - 组件内置默认文案（中文/英文）。 - 通过 LocaleProvider 或 ConfigProvider 注入当前语言包。 - 允许业务方覆盖特定文案。 - 不内置完整 i18n 库，但提供格式化函数插槽。

---

### FB-14-SC-P-008：组件库与低代码平台如何结合？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：低代码、组件库、Schema、物料、Design System、平台
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明组件库如何向低代码平台输出物料，并保证设计一致性与运行时稳定性。

**参考答案**：

1. **物料化封装**
   - 每个组件封装为低代码物料，包含渲染组件、Schema、属性面板配置、事件声明。
   - 物料描述组件的 props、slots、events、默认值。

```json
{
  "componentName": "Button",
  "title": "按钮",
  "props": [
    { "name": "type", "type": "string", "enum": ["primary", "default"] },
    { "name": "children", "type": "string" }
  ]
}
```

2. **属性面板与表单映射**
   - 根据组件 Props 类型自动生成设置表单。
   - 支持自定义 setter（如颜色选择器、图标选择器）。

3. **设计一致性**
   - 低代码平台消费的组件必须是组件库官方版本。
   - 主题、Token、布局系统共用同一套 Design System。

4. **运行时隔离**
   - 物料运行在沙箱或 iframe 中，防止用户配置导致全局污染。
   - 对动态表达式做安全校验。

5. **版本管理**
   - 组件库升级时，低代码平台物料需同步更新。
   - 提供物料版本锁定，避免旧项目受 breaking change 影响。

**评分维度**：
- 物料化封装设计（30%）
- 属性面板生成（20%）
- 设计一致性保障（20%）
- 运行时安全与版本管理（30%）

**常见错误**：
- 低代码组件与业务组件各自维护，导致两套实现
- 忽略属性面板的复杂类型支持（如函数、对象）
- 没有版本隔离，组件库升级破坏历史页面

**延伸追问**：
- 如何让低代码物料同时支持 React 和 Vue？
- 自定义 setter 如何与组件库表单组件结合？

**口头回答版**：
> - 每个组件封装为低代码物料，包含渲染组件、Schema、属性面板配置、事件声明。 - 物料描述组件的 props、slots、events、默认值。 - 根据组件 Props 类型自动生成设置表单。 - 支持自定义 setter（如颜色选择器、图标选择器）。

---

### FB-14-SC-P-009：如何设计组件库的插件与扩展机制？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：插件机制、扩展、Plugin、组件库、架构
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请为组件库设计一套插件与扩展机制，使业务方能够在不修改源码的情况下扩展组件行为或新增能力。

**参考答案**：

1. **全局配置扩展**
   - `ConfigProvider` 支持全局设置主题、语言、图标前缀、组件默认 props。
   - 允许注册自定义组件覆盖内置组件。

2. **组件级 Hooks / 生命周期**
   - 提供 `useComponent` 或 render hooks，让业务方注入前置/后置逻辑。
   - 例如：Modal 打开前校验权限、表单提交前统一加埋点。

3. **自定义渲染器**
   - 允许替换默认渲染节点，如自定义 DatePicker 的日期单元格。
   - 通过 render props 或 slots 实现。

4. **插件注册 API**

```ts
import { pluginManager } from '@ds/core';

pluginManager.register({
  name: 'permission',
  onBeforeMount: (component, props) => {
    if (props.permission && !hasPermission(props.permission)) {
      return { hidden: true };
    }
  }
});
```

5. **扩展点约束**
   - 明确哪些能力可扩展、哪些不可扩展，避免核心行为被破坏。
   - 插件需声明版本兼容范围。

6. **文档与示例**
   - 提供插件开发指南与示例，降低扩展成本。

**评分维度**：
- 扩展点设计全面性（30%）
- 插件注册与生命周期（25%）
- 安全性与约束（25%）
- 文档与易用性（20%）

**常见错误**：
- 扩展点过多导致核心 API 不稳定
- 插件无版本约束，升级时大面积失效
- 扩展机制只支持全局，无法满足组件级需求

**延伸追问**：
- 插件机制与业务二次封装组件有什么区别？
- 如何防止插件破坏组件库的可访问性？

**口头回答版**：
> - ConfigProvider 支持全局设置主题、语言、图标前缀、组件默认 props。 - 允许注册自定义组件覆盖内置组件。 组件级 Hooks / 生命周期 - 提供 useComponent 或 render hooks，让业务方注入前置/后置逻辑。

---

### FB-14-SC-P-010：大型组件库如何做版本灰度与 AB 实验？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：灰度发布、AB 实验、组件库、版本管理、风险管控
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套组件库版本灰度与 AB 实验机制，使得新组件或新 API 能够在部分业务线先行验证，降低全量发布风险。

**参考答案**：

1. **多版本共存**
   - 通过 npm alias 或 monorepo 子包同时安装多个版本。
   - 例如 `@ds/button@2.x` 与 `@ds/button@3.x` 在同一应用内共存。

2. **灰度开关**
   - 组件库内部读取灰度配置，决定使用新/旧实现。
   - 配置可来自服务端、环境变量或 AB 平台。

```tsx
<ConfigProvider experimental=&#123;&#123; newModal: true &#125;&#125;>
  <App />
</ConfigProvider>
```

3. **AB 实验集成**
   - 与 AB 平台对接，按用户 ID、业务线、页面维度分流。
   - 实验组使用新组件，对照组保持旧组件。

4. **埋点与回滚**
   - 对新组件关键路径埋点，监控错误率、性能、业务指标。
   - 发现异常可快速关闭开关回滚到旧版本。

5. **文档与治理**
   - 实验组件标注为 experimental，明确到期时间。
   - 实验到期后根据结果合并或清理代码。

**评分维度**：
- 多版本共存方案（25%）
- 灰度开关设计（25%）
- AB 实验集成（20%）
- 监控与回滚（20%）
- 治理机制（10%）

**常见错误**：
- 没有实验到期机制，实验代码长期残留
- 灰度开关散落在业务代码中，难以统一管理
- 忽略新旧版本的样式/状态冲突

**延伸追问**：
- 同一页面内不同业务组件使用不同版本时如何避免样式冲突？
- 如何度量组件升级对业务指标的影响？

**口头回答版**：
> - 通过 npm alias 或 monorepo 子包同时安装多个版本。 - 例如 @ds/button@2.x 与 @ds/button@3.x 在同一应用内共存。 - 组件库内部读取灰度配置，决定使用新/旧实现。 - 配置可来自服务端、环境变量或 AB 平台。

---

### FB-14-CO-P-006：什么是 Design Token 的 W3C 社区组规范？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：Design Token、W3C、标准化、DTCG、Token 格式
**出现频率**：低频
**预计回答时长**：5-10 分钟

**题目描述**：
请介绍 W3C Design Tokens Community Group（DTCG）规范，以及它对组件库 Token 体系的影响。

**参考答案**：

W3C Design Tokens Community Group（DTCG）是一个致力于制定 Design Token 通用格式规范的社区组，目标让 Token 成为设计与研发之间的通用语言。

核心规范要点：

1. **统一 JSON 格式**
   - 定义 Token 的标准 JSON 结构，包含 `$value`、`$type`、`$description`、`$extensions`。

```json
{
  "color-primary": {
    "$value": "#1677ff",
    "$type": "color",
    "$description": "主品牌色"
  }
}
```

2. **Token 类型系统**
   - 明确支持 color、dimension、fontFamily、fontWeight、duration、cubicBezier 等类型。
   - 类型信息帮助工具做转换与校验。

3. **引用与别名**
   - 支持 Token 引用其他 Token：`"$value": "{color.brand.500}"`。
   - 鼓励建立 Global -> Alias -> Component 的分层引用。

4. **对组件库的影响**
   - 工具链互操作性增强（Figma、Style Dictionary、Tokens Studio 等）。
   - 减少各团队自定义 Token 格式带来的迁移成本。
   - 更容易实现设计工具到代码的自动化导出。

**评分维度**：
- DTCG 规范认知（40%）
- Token 格式与类型（30%）
- 对组件库工程化的影响（30%）

**常见错误**：
- 把 DTCG 规范等同于某个具体工具
- 忽略 `$type` 在跨平台转换中的作用
- 认为 Token 只需要 `$value` 即可

**延伸追问**：
- 现有自定义 Token 格式如何迁移到 DTCG 格式？
- DTCG 规范目前有哪些尚未覆盖的场景？

**参考资源**：
- [W3C Design Tokens Community Group](https://www.w3.org/community/designtokens/)
- [DTCG Format Specification](https://design-tokens.github.io/community-group/format/)

**口头回答版**：
> W3C Design Tokens Community Group（DTCG）是一个致力于制定 Design Token 通用格式规范的社区组，目标让 Token 成为设计与研发之间的通用语言。 统一 JSON 格式 - 定义 Token 的标准 JSON 结构，包含 $value、$type、$description、$extensions。 Token 类型系统

---

### FB-14-CO-P-007：组件库中的状态机与交互模式如何抽象？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：状态机、交互模式、Hooks、Headless UI、可复用逻辑
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明组件库中常见的交互模式（如 Disclosure、Popover、Select）如何通过状态机或 Hooks 进行抽象复用。

**参考答案**：

组件库中大量组件共享类似的交互状态：打开/关闭、焦点管理、选中状态、键盘导航。通过状态机与 Hooks 抽象可以避免重复实现。

常见抽象：

1. **Disclosure 模式**
   - 控制内容的显示/隐藏，如 Collapse、Accordion、Tooltip。
   - 抽象为 `useDisclosure`，返回 `isOpen`、`open`、`close`、`toggle`。

2. **Popover 模式**
   - 浮层定位、触发器绑定、点击外部关闭、ESC 关闭。
   - 抽象为 `usePopover`，返回 trigger props、content props、position。

3. **Select 模式**
   - 选项列表、高亮、选中、键盘导航。
   - 抽象为 `useSelect`，管理 `highlightedIndex`、`selectedValue`、按键处理。

4. **状态机表达**
   - 复杂交互（如下拉菜单）可用 XState 或轻量状态机表达。
   - 明确 idle、open、navigating、closing 等状态及转移条件。

```ts
const disclosure = useDisclosure();
const popover = usePopover({ ...disclosure });
```

收益：

- 行为一致：同模式组件共享键盘与焦点逻辑。
- 样式解耦：Headless 层提供行为，业务方自定义 UI。
- 测试聚焦：状态逻辑单独测试，减少组件测试负担。

**评分维度**：
- 常见交互模式识别（30%）
- Hooks 抽象能力（35%）
- 状态机应用理解（20%）
- 收益与成本分析（15%）

**常见错误**：
- 每个组件都独立实现打开/关闭逻辑
- 抽象过度，导致 Hooks 接口复杂难用
- 状态机与 UI 渲染耦合，难以复用

**延伸追问**：
- 如何处理多个交互模式叠加（如 Popover 内嵌 Select）？
- 状态机抽象后，如何进行可访问性测试？

**口头回答版**：
> 组件库中大量组件共享类似的交互状态：打开/关闭、焦点管理、选中状态、键盘导航。 通过状态机与 Hooks 抽象可以避免重复实现。 Disclosure 模式 - 控制内容的显示/隐藏，如 Collapse、Accordion、Tooltip。

---

### FB-14-CO-P-008：如何评估组件库的 bundle size 与运行时性能？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：14 设计系统与组件库
**标签**：Bundle Size、运行时性能、性能评估、组件库、监控
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明组件库应从哪些维度评估 bundle size 与运行时性能，并列举常用工具与指标。

**参考答案**：

1. **Bundle Size 评估**
   - **全量体积**：`dist` 目录所有产物大小。
   - **单组件体积**：单独引入某个组件时增加的体积。
   - **依赖体积**：第三方依赖（如日期库、动画库）占比。
   - 工具：`rollup-plugin-visualizer`、`webpack-bundle-analyzer`、`size-limit`。

2. **运行时性能指标**
   - **首次渲染时间**：组件 mount 耗时。
   - **重渲染开销**：复杂组件（Table、Select）更新耗时。
   - **内存占用**：弹层未正确卸载、事件监听未清理导致的泄漏。
   - **长任务**：主线程阻塞时间。

3. **评估方法**
   - 在 CI 中设置体积阈值，超过即失败。
   - 使用 Lighthouse、React DevTools Profiler、Chrome Performance Panel。
   - 对关键组件编写基准测试（Benchmark / Vitest bench）。

4. **优化方向**
   - 按需加载、Tree Shaking、代码分割。
   - 减少运行时样式计算、避免不必要重渲染。
   - 懒加载大型依赖（如图表、日期处理）。

**评分维度**：
- Bundle Size 维度（30%）
- 运行时性能指标（30%）
- 工具与评估方法（25%）
- 优化方向（15%）

**常见错误**：
- 只关注全量体积，忽略单组件体积
- 没有 CI 监控，体积随版本缓慢膨胀
- 把包体积小等同于运行时性能好

**延伸追问**：
- 如何为组件库设置合理的体积预算？
- 运行时性能问题如何在业务环境中被及时发现？

**口头回答版**：
> Bundle Size 评估 - 全量体积：dist 目录所有产物大小。 - 单组件体积：单独引入某个组件时增加的体积。 - 依赖体积：第三方依赖（如日期库、动画库）占比。

---

### FB-14-SD-R-009：如何设计一个企业级设计系统平台（Design System Platform）？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：设计系统平台、DesignOps、平台化、治理、组件库
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个企业级设计系统平台，整合设计 Token、组件、文档、度量与治理，提升跨团队协作效率。

**参考答案**：

1. **平台定位与分层**
   - **资产层**：Design Token、图标、插画、字体、组件代码。
   - **工具层**：Figma Plugin、Token 转换工具、文档站点、Storybook。
   - **应用层**：组件文档、设计指南、Token 浏览器、使用分析。
   - **治理层**：贡献流程、评审机制、度量仪表盘、质量门禁。

2. **核心模块**
   - **Token 管理**：可视化编辑 Token，自动生成多平台代码。
   - **组件库门户**：统一入口查看组件 API、示例、变更日志。
   - **设计与代码同步**：Figma 组件与代码组件双向链接。
   - **度量中心**：组件使用率、覆盖率、质量分数、迁移进度。
   - **贡献与评审**：RFC 流程、PR 模板、自动化检查。

3. **技术架构**
   - 前端：VitePress / Docusaurus + Storybook 嵌入。
   - 后端：Token 服务、用户权限、使用数据收集。
   - 构建：Monorepo + Changesets + CI/CD。

4. **协作流程**
   - 设计变更 -> Token 更新 -> 代码同步 -> 文档更新 -> 发布通知。
   - 所有变更可追溯，支持版本对比与回滚。

**评分维度**：
- 平台分层与模块完整性（30%）
- 设计与研发协同流程（25%）
- 技术架构合理性（25%）
- 治理与度量机制（20%）

**常见错误**：
- 平台只做文档展示，缺少设计与代码联动
- 模块过多但没人维护，导致平台荒废
- 忽略权限与审批流程，任何人都能修改核心 Token

**相关题目**：
- [FB-14-SD-R-002 如何设计一套 DesignOps 与设计系统平台](#)

**口头回答版**：
> - 资产层：Design Token、图标、插画、字体、组件代码。 - 工具层：Figma Plugin、Token 转换工具、文档站点、Storybook。 - 应用层：组件文档、设计指南、Token 浏览器、使用分析。 - 治理层：贡献流程、评审机制、度量仪表盘、质量门禁。

---

### FB-14-SD-R-010：如何构建跨团队的组件库贡献与 Review 流程？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：组件库治理、贡献流程、Code Review、Design Review、跨团队协作
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套跨团队贡献组件库的流程，确保外部业务团队提交的组件或修复符合设计系统标准。

**参考答案**：

1. **贡献准入标准**
   - 明确组件纳入组件库的条件：通用性、复用度、维护成本、设计质量。
   - 提供 RFC 模板，要求说明背景、API 设计、影响范围。

2. **设计与研发双 Review**
   - **Design Review**：设计师确认视觉、交互、Token 使用符合规范。
   - **Code Review**：技术团队确认 API 设计、测试、文档、性能。
   - **A11y Review**：可访问性负责人检查键盘与屏幕阅读器支持。

3. **自动化检查**
   - CI 运行单元测试、视觉回归、a11y 扫描、类型检查。
   - Stylelint 检查硬编码色值/间距，要求使用 Token。

4. **文档与发布**
   - 新组件必须包含 API 文档、使用示例、可访问性说明。
   - 通过 Changesets 自动管理版本与 Changelog。

5. **贡献激励与培训**
   - 定期举办组件库贡献培训。
   - 在内部推广“组件贡献者”认证，提升积极性。

**评分维度**：
- 准入标准清晰度（25%）
- Review 流程完整性（30%）
- 自动化检查覆盖度（25%）
- 治理与培训机制（20%）

**常见错误**：
- 只接受来自组件库团队的代码，外部贡献门槛过高
- Review 缺少设计侧参与，导致视觉不一致
- 没有自动化检查，人工 Review 负担重且易遗漏

**延伸追问**：
- 如何处理业务方贡献的组件与通用组件的边界？
- 贡献者众多时，如何统一 API 风格？

**口头回答版**：
> - 明确组件纳入组件库的条件：通用性、复用度、维护成本、设计质量。 - 提供 RFC 模板，要求说明背景、API 设计、影响范围。 设计与研发双 Review - Design Review：设计师确认视觉、交互、Token 使用符合规范。

---

### FB-14-SD-R-011：如何设计支持 AI 辅助的组件库生成与维护流程？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：AI、设计系统、组件生成、自动化、Figma to Code、维护
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
随着 AI 发展，如何利用 AI 辅助组件库的设计、生成、测试与维护？请给出整体架构设计。

**参考答案**：

1. **设计稿转代码（Figma to Code）**
   - 利用 AI 模型将 Figma 设计稿转换为组件代码草稿。
   - 结合 Design Token 映射，优先使用已有 Token。
   - 人工 Review 后合并，AI 输出作为起点而非终点。

2. **Token 与文档生成**
   - AI 根据设计变量自动生成 Token JSON 与 CSS 变量。
   - 根据组件代码自动生成 API 文档与使用示例。

3. **测试用例生成**
   - AI 基于组件 Props 生成单元测试、交互测试、a11y 测试。
   - 对已有组件，AI 辅助补充边界场景测试。

4. **变更影响分析**
   - AI 分析 PR 改动，预测受影响的业务方、可能的 Breaking Change。
   - 自动生成迁移建议与 Codemod。

5. **人机协作流程**
   - AI 负责重复性、模式化工作；人类负责评审、创意与质量把关。
   - 所有 AI 生成内容需通过 CI 与人工 Review。

6. **风险管控**
   - 建立 AI 生成内容的质量标准与回滚机制。
   - 避免 AI 引入未经验证的可访问性或安全问题。

**评分维度**：
- AI 应用场景覆盖度（30%）
- 人机协作流程设计（25%）
- 质量与风险管控（25%）
- 对现有工作流的整合（20%）

**常见错误**：
- 完全依赖 AI 生成代码，缺乏人工 Review
- 忽略 AI 生成代码与现有 Token/规范的兼容性
- 没有明确的 AI 输出质量标准

**延伸追问**：
- AI 生成组件后，如何保持与现有组件库风格一致？
- 如何防止 AI 引入版权或隐私风险？

**口头回答版**：
> 设计稿转代码（Figma to Code） - 利用 AI 模型将 Figma 设计稿转换为组件代码草稿。 - 结合 Design Token 映射，优先使用已有 Token。 - 人工 Review 后合并，AI 输出作为起点而非终点。

---

### FB-14-SD-R-012：如何设计组件库的长期演进与 Deprecation 战略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：长期演进、Deprecation、组件库治理、技术债、版本战略
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套组件库长期演进战略，包括新组件引入、旧组件下线、API 废弃与版本生命周期管理。

**参考答案**：

1. **组件生命周期定义**
   - **Experimental**：实验阶段，不稳定，仅特定业务试用。
   - **Stable**：正式发布，提供完整文档与长期支持。
   - **Legacy**：不再新增功能，仅修复严重问题。
   - **Deprecated**：已废弃，提供迁移方案，计划移除。

2. **引入新组件流程**
   - RFC 评审 -> 设计与代码实现 -> Review -> 实验发布 -> 稳定发布。
   - 实验阶段收集使用反馈，稳定后去除 experimental 标记。

3. **旧组件下线**
   - 提前 2-3 个 MAJOR 版本标记废弃。
   - 提供 Codemod 与迁移文档。
   - 通过 AST 扫描监控业务方使用情况。

4. **API 废弃机制**
   - 控制台 warning（仅开发环境）。
   - 文档中标注废弃状态与替代方案。
   - 废弃 API 在下一个 MAJOR 版本移除或进入兼容层。

5. **版本生命周期**
   - 设定 LTS 版本与维护周期。
   - 明确安全修复、Bug 修复、功能新增的支持范围。

6. **沟通与培训**
   - 定期发布路线图与升级公告。
   - 组织升级培训与迁移答疑。

**评分维度**：
- 生命周期定义（25%）
- 废弃与下线机制（30%）
- 迁移工具与监控（25%）
- 沟通与培训（20%）

**常见错误**：
- 没有明确的组件生命周期状态
- 废弃 API 直接删除，没有过渡期
- 旧组件长期不清理，导致包体积膨胀

**相关题目**：
- [FB-14-SC-P-006 组件库如何做 API 兼容与废弃治理](#)

**口头回答版**：
> - Experimental：实验阶段，不稳定，仅特定业务试用。 - Stable：正式发布，提供完整文档与长期支持。 - Legacy：不再新增功能，仅修复严重问题。 - Deprecated：已废弃，提供迁移方案，计划移除。

---

### FB-14-SD-R-013：如何保障组件库在微前端架构下的样式与行为隔离？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：微前端、样式隔离、Shadow DOM、CSS 变量、组件库
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
在微前端架构中，多个子应用可能使用不同版本的同一组件库。请设计一套隔离方案，避免样式冲突与行为异常。

**参考答案**：

1. **CSS 隔离方案**
   - **CSS Modules / 构建时哈希**：每个版本组件类名带唯一 hash，避免全局冲突。
   - **CSS 变量命名空间**：不同版本使用不同 CSS 变量前缀，如 `--ds-v2-color-primary`。
   - **Shadow DOM**：将组件封装在 Shadow Root 内，完全隔离样式，但需注意事件与主题传递。

2. **JS 隔离方案**
   - 避免组件库在全局注册状态或服务。
   - 使用版本化的全局变量或 Symbol 避免冲突。
   - 弹层（Modal、Tooltip）挂载到子应用容器而非全局 body。

3. **主题与 Token 隔离**
   - 不同子应用可独立配置主题，通过 CSS 变量作用域限定。
   - 使用 `data-app-id` 或容器 class 限定 Token 生效范围。

4. **事件与焦点管理**
   - 焦点陷阱、键盘导航不应跨越子应用边界。
   - 全局事件（如 ESC 关闭弹层）需限定在当前子应用。

5. **版本管理**
   - 尽量统一基座与主应用的组件库版本。
   - 若必须多版本共存，通过 npm alias 或模块联邦实现隔离加载。

**评分维度**：
- CSS 隔离方案（30%）
- JS 运行时隔离（25%）
- 主题与 Token 隔离（20%）
- 事件与焦点边界（15%）
- 版本管理策略（10%）

**常见错误**：
- 使用全局 class 名，导致不同版本互相覆盖
- 弹层默认挂载到 body，跨越子应用边界
- 忽略 CSS 变量全局生效带来的主题污染

**延伸追问**：
- Shadow DOM 方案下，组件库如何消费全局主题？
- 微前端中如何共享组件库公共依赖？

**口头回答版**：
> - CSS Modules / 构建时哈希：每个版本组件类名带唯一 hash，避免全局冲突。 - CSS 变量命名空间：不同版本使用不同 CSS 变量前缀，如 --ds-v2-color-primary。 - Shadow DOM：将组件封装在 Shadow Root 内，完全隔离样式，但需注意事件与主题传递。 - 避免组件库在全局注册状态或服务。

---

### FB-14-SD-R-014：如何设计一套组件库的语义化版本自动化与变更管理？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：SemVer、Changesets、版本自动化、变更管理、CI/CD
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套组件库的版本自动化与变更管理流程，确保每次发布都能正确判定版本号、生成 Changelog 并通知业务方。

**参考答案**：

1. **变更收集（Changesets）**
   - 每个 PR 必须附带 changeset 文件，声明变更类型（patch/minor/major）与影响范围。
   - changeset 文件随代码一起提交，便于 Review。

```md
---
"@ds/core": minor
"@ds/button": patch
---
新增 Button loading 状态动画。
```

2. **版本号自动判定**
   - CI 根据 changeset 聚合结果自动计算新版本号。
   - Monorepo 中不同子包独立版本或统一版本策略可选。

3. **Changelog 自动生成**
   - 根据 changeset 生成每个包的 CHANGELOG.md。
   - 分类展示 Features、Bug Fixes、Breaking Changes。

4. **发布流程**
   - 合并版本 PR 后自动触发 npm 发布。
   - 同步发布 GitHub Release，包含变更摘要。

5. **业务方通知**
   - 通过内部公告、邮件列表、IM 机器人推送升级通知。
   - 对 Breaking Change 提供迁移指南与 Codemod。

6. **质量门禁**
   - 发布前必须通过测试、类型检查、视觉回归。
   - 禁止未提交 changeset 的 PR 合并。

**评分维度**：
- Changeset 机制设计（25%）
- 版本判定与 Changelog（25%）
- 发布自动化（25%）
- 通知与迁移机制（15%）
- 质量门禁（10%）

**常见错误**：
- 手动修改版本号，容易出错
- Changelog 与代码变更不同步
- Breaking Change 未提前通知业务方

**参考资源**：
- [Changesets 官方文档](https://github.com/changesets/changesets)

**口头回答版**：
> 变更收集（Changesets） - 每个 PR 必须附带 changeset 文件，声明变更类型（patch/minor/major）与影响范围。 - changeset 文件随代码一起提交，便于 Review。 - CI 根据 changeset 聚合结果自动计算新版本号。

---

### FB-14-SC-R-002：如何从业务组件沉淀到通用组件库？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：业务组件、通用组件、组件沉淀、组件库建设、治理
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请描述将业务线中的组件沉淀为组件库通用组件的流程与关键决策点。

**参考答案**：

1. **识别可沉淀组件**
   - 统计组件在多个业务线的复用情况。
   - 评估组件通用性、维护成本、设计稳定性。

2. **抽象与解耦**
   - 移除业务特定逻辑（如业务字段、权限判断、埋点）。
   - 将业务逻辑通过 props、slots、render props 暴露给业务方。

3. **API 重新设计**
   - 从业务视角切换到通用视角，命名更语义化。
   - 保证 API 与组件库现有风格一致。

4. **设计与可访问性校准**
   - 设计师确认视觉符合设计系统。
   - 补充键盘导航、ARIA、焦点管理等可访问性支持。

5. **文档与示例**
   - 提供通用使用示例，避免暴露业务案例。
   - 明确使用场景与不适用的场景。

6. **渐进迁移**
   - 先在组件库发布 experimental 版本。
   - 选择一个业务线试点，收集反馈后稳定发布。
   - 提供 Codemod 或迁移路径，逐步替换业务线旧实现。

**评分维度**：
- 沉淀流程完整性（30%）
- 业务解耦能力（25%）
- API 通用化设计（25%）
- 迁移策略（20%）

**常见错误**：
- 直接把业务代码复制到组件库，未做抽象
- 忽略可访问性与设计规范校准
- 一次性全量推广，导致多个业务线同时踩坑

**延伸追问**：
- 如何防止业务方不愿意使用通用组件？
- 业务组件与通用组件的边界如何界定？

**口头回答版**：
> - 统计组件在多个业务线的复用情况。 - 评估组件通用性、维护成本、设计稳定性。 - 移除业务特定逻辑（如业务字段、权限判断、埋点）。 - 将业务逻辑通过 props、slots、render props 暴露给业务方。

---

### FB-14-SC-R-003：如何平衡组件库的一致性与业务灵活性？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：一致性、灵活性、组件库治理、定制、扩展、Design System
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
组件库追求一致性，业务方需要灵活性。请谈谈如何在二者之间取得平衡。

**参考答案**：

1. **分层设计**
   - **基础层**：原子组件（Button、Input）高度一致，限制定制。
   - **复合层**：业务组件（ProductCard、UserProfile）允许更多自定义。
   - **模式层**：提供可复用交互模式，业务方自由组合。

2. **可定制边界**
   - 明确哪些可变（颜色、间距、圆角）与哪些不可变（交互行为、可访问性）。
   - 通过 Token 白名单控制可定制范围。

3. **扩展机制**
   - 提供 slots、render props、自定义 widget、主题变量等扩展点。
   - 扩展点经过设计，避免破坏一致性。

4. **治理与审查**
   - 业务方深度定制需经过 Design Review。
   - 定期审计业务线偏离度，识别可沉淀为通用能力的定制。

5. **渐进策略**
   - 初创业务优先使用标准组件快速上线。
   - 成熟业务在标准组件无法满足时，通过扩展机制定制，并反馈给组件库。

**评分维度**：
- 分层设计思路（25%）
- 可定制边界定义（25%）
- 扩展机制设计（25%）
- 治理与反馈闭环（25%）

**常见错误**：
- 为了绝对一致，拒绝任何业务定制，导致业务方绕过组件库
- 为了灵活，开放所有内部实现，导致风格失控
- 没有反馈机制，业务定制无法回流到通用组件

**延伸追问**：
- 当业务方坚持特殊设计时，如何决策？
- 如何度量业务线对组件库的一致性遵守程度？

**口头回答版**：
> - 基础层：原子组件（Button、Input）高度一致，限制定制。 - 复合层：业务组件（ProductCard、UserProfile）允许更多自定义。 - 模式层：提供可复用交互模式，业务方自由组合。 - 明确哪些可变（颜色、间距、圆角）与哪些不可变（交互行为、可访问性）。

---

### FB-14-SC-R-004：组件库团队如何与产品、设计、业务团队协作？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：14 设计系统与组件库
**标签**：跨团队协作、DesignOps、产品协作、设计协作、组件库治理
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
组件库的成功不仅依赖技术，也依赖协作。请说明组件库团队应如何与产品、设计、业务团队高效协作。

**参考答案**：

1. **与产品团队协作**
   - 参与产品需求评审，提前识别可复用组件与新组件需求。
   - 提供组件能力地图，帮助产品经理评估实现成本。

2. **与设计团队协作**
   - 共同维护 Design Token 与 Figma 组件库。
   - 建立 design-dev handoff 流程，设计稿直接使用 Token 命名。
   - 设计评审在 Storybook 或设计系统平台完成。

3. **与业务团队协作**
   - 提供清晰文档、示例与技术支持渠道。
   - 建立反馈机制（Issue、问卷、定期访谈），收集组件使用痛点。
   - 鼓励业务团队贡献组件或提交 RFC。

4. **流程与节奏**
   - 固定版本发布节奏，让业务方有预期。
   - 重大变更提前发布路线图与迁移计划。

5. **度量与激励**
   - 公开组件库使用率、满意度、贡献者榜单。
   - 对积极贡献的团队与个人给予认可。

**评分维度**：
- 各协作方职责清晰（35%）
- 流程与机制设计（30%）
- 反馈与改进闭环（20%）
- 度量与激励（15%）

**常见错误**：
- 组件库团队闭门造车，不了解业务真实需求
- 设计变更不通知研发团队，导致实现偏差
- 缺少固定沟通机制，协作依赖个人关系

**延伸追问**：
- 当业务需求与组件库规范冲突时，如何决策？
- 如何提升业务团队使用组件库的意愿？

**口头回答版**：
> - 参与产品需求评审，提前识别可复用组件与新组件需求。 - 提供组件能力地图，帮助产品经理评估实现成本。 - 共同维护 Design Token 与 Figma 组件库。 - 建立 design-dev handoff 流程，设计稿直接使用 Token 命名。

---



### FB-14-CO-B-019：什么是组件库中的 spacing scale？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：Design Token、spacing、间距、组件库
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释组件库中 spacing scale 的概念及其作用。

**参考答案**：

Spacing scale 是一组预定义的间距值（如 4px、8px、16px、24px、32px），作为 Design Token 的一部分，用于统一组件和页面中的间距。

示例：

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

作用：

1. 保持视觉一致性，避免开发者随意写 `margin: 13px` 等魔法数值。
2. 降低设计和开发之间的沟通成本。
3. 便于主题切换和多品牌适配。
4. 与布局系统、栅格系统对齐。

实践建议：

- 使用 4px 或 8px 作为基础单位。
- 优先使用 Token 而不是硬编码数值。
- 在 Figma 中同步定义 spacing token。

**评分维度**：
- 说明 spacing scale 含义（40%）
- 列举作用（40%）
- 提到与 Figma 同步（20%）

**常见错误**：
- 把 spacing scale 和 color token 混为一谈
- 允许开发者随意使用非标准间距

**口头回答版**：
> spacing scale 就是一组预定义的间距值，比如 4、8、16、24、32px，作为 Design Token。作用是统一组件和页面间距，避免乱写魔法数值，也方便主题切换。设计稿里也要同步定义这些 token。

---

### FB-14-CO-B-020：什么是 Container Queries？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：CSS、Container Queries、响应式、组件库
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 CSS Container Queries 是什么，以及它在组件库中的价值。

**参考答案**：

Container Queries 是 CSS 的一种新特性，允许元素根据其所在容器的大小而不是视口大小来调整样式。

示例：

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
```

在组件库中的价值：

1. **组件自适应性**：组件能根据自身容器宽度响应，而不是依赖全局视口。
2. **复用性提升**：同一个组件在不同布局中表现一致。
3. **减少媒体查询耦合**：不再需要在页面层写大量 `@media`。

注意事项：

- 需要给容器声明 `container-type`。
- 旧浏览器需要 polyfill 或 fallback。

**评分维度**：
- 说明 Container Queries 含义（40%）
- 与 media query 区别（30%）
- 组件库价值（30%）

**常见错误**：
- 认为 Container Queries 完全替代 Media Queries
- 忽略容器声明和浏览器兼容

**口头回答版**：
> Container Queries 是让组件根据它所在容器的大小来响应，而不是整个视口。组件库里用它可以让组件更自适、复用性更高，同一个组件放不同布局里表现一致。要给容器声明 container-type，旧浏览器要处理兼容。

---

### FB-14-CO-B-021：组件库中为什么要避免 magic number？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：magic number、Design Token、可维护性、组件库
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明组件库中为什么要避免 magic number，以及替代方案。

**参考答案**：

Magic number 指代码中没有明确含义、随意写出的数值（如 `width: 37px`、`margin-left: 13px`）。

避免原因：

1. **不可维护**：后人不知道这个数值的业务含义。
2. **不一致**：容易出现 `13px`、`14px`、`15px` 等相近但不同的值。
3. **难以主题化**：换主题时需要逐个查找替换。
4. **设计协作困难**：设计师和开发者无法对齐。

替代方案：

1. 使用 Design Token：
   ```css
   padding: var(--spacing-md);
   ```
2. 使用语义化变量：
   ```css
   --modal-width: 560px;
   ```
3. 使用计算表达式：
   ```css
   width: calc(var(--spacing-md) * 7);
   ```

**评分维度**：
- 说明 magic number 危害（40%）
- 替代方案具体（40%）
- 提到 Design Token（20%）

**常见错误**：
- 认为只要注释一下就可以保留 magic number
- 把部分合理常量也当成 magic number 过度抽象

**口头回答版**：
> magic number 就是代码里随便写的没含义的数值，比如 13px、37px。它们难维护、不一致、也不好换主题。应该用 Design Token 或语义化变量替代，比如 `padding: var(--spacing-md)`、定义 `--modal-width`。

---

### FB-14-CO-B-022：什么是 CSS 的 layer (@layer) ？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：CSS、@layer、层叠、组件库
**出现频率**：低频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 CSS `@layer` 的作用，以及它在组件库中的应用场景。

**参考答案**：

`@layer` 是 CSS Cascade Layers 特性，允许开发者将 CSS 规则分组到不同的层中，从而更精细地控制层叠顺序，而不依赖选择器优先级或 `!important`。

示例：

```css
@layer reset, base, components, utilities;

@layer base {
  body { margin: 0; }
}

@layer utilities {
  .hidden { display: none; }
}
```

后声明的层优先级更高（utilities 会覆盖 base），但同一层内仍按选择器优先级和顺序决定。

在组件库中的应用：

1. **隔离基础样式和工具类**：
   - reset、base 放在低优先级层。
   - utilities 放在高优先级层，方便业务覆盖。

2. **避免业务样式被组件库意外覆盖**：
   - 组件样式放在独立层，业务层可以方便覆盖。

3. **减少 !important 使用**：
   - 通过层控制覆盖关系，代码更清晰。

**评分维度**：
- 说明 @layer 作用（40%）
- 说明层叠顺序规则（30%）
- 组件库应用场景（30%）

**常见错误**：
- 认为 @layer 可以完全替代选择器优先级
- 忽略浏览器兼容性

**口头回答版**：
> `@layer` 是 CSS 的层叠层特性，可以把样式分到不同层里控制优先级，比如 reset、base、components、utilities。后声明的层优先级更高。组件库里可以用它隔离基础样式和业务覆盖样式，减少 !important。

---

### FB-14-CO-B-023：组件库中如何处理 focus 状态？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：14 设计系统与组件库
**标签**：focus、a11y、组件库、键盘导航
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明组件库中如何设计和实现一致的 focus 状态，兼顾可访问性和视觉美观。

**参考答案**：

一、设计原则：

1. **可见性**：焦点指示器必须清晰可见，不能隐藏。
2. **一致性**：所有可聚焦元素使用统一的 focus ring 样式。
3. **不破坏布局**：focus ring 不应导致布局跳动。

二、实现方式：

1. **使用 outline**：
   ```css
   :focus-visible {
     outline: 2px solid var(--color-primary);
     outline-offset: 2px;
   }
   ```
2. **使用 box-shadow**：
   ```css
   :focus-visible {
     box-shadow: 0 0 0 2px var(--color-primary);
   }
   ```

三、区分 focus 和 focus-visible：

- `:focus`：鼠标点击也会触发，可能破坏视觉。
- `:focus-visible`：只在键盘导航时显示焦点环，更推荐。

四、键盘导航支持：

- 保证 Tab 顺序合理。
- 对复杂组件（Menu、Tabs）实现 roving tabindex。
- 焦点 trapped 在 Modal 内。

五、与 Design Token 结合：

- focus color、outline width、offset 都使用 token。
- 深色模式下保持对比度。

**评分维度**：
- 说明 focus 设计原则（30%）
- 实现方式具体（30%）
- 区分 focus/focus-visible（20%）
- 键盘导航（20%）

**常见错误**：
- 直接 `outline: none` 导致键盘用户找不到焦点
- 鼠标点击也显示 focus ring，影响视觉

**口头回答版**：
> 组件库 focus 状态要可见、一致、不破坏布局。推荐用 `:focus-visible` 只在键盘导航时显示 focus ring，可以用 outline 或 box-shadow 实现。复杂组件要做好 Tab 顺序和 roving tabindex。focus 颜色、宽度用 Design Token，深色模式保持对比度。

---

### FB-14-SC-A-017：如何设计一个 DatePicker 组件？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：DatePicker、组件设计、日期处理、可访问性
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个通用的 DatePicker 组件，说明核心 API、状态管理和可扩展点。

**参考答案**：

一、核心 API 设计：

```tsx
interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  disabledDate?: (date: Date) => boolean;
  format?: string;
  locale?: Locale;
  showTime?: boolean;
}
```

二、状态管理：

1. **受控模式**：`value` + `onChange`。
2. **非受控模式**：`defaultValue` + 内部状态。
3. **视图状态**：当前展示月份、选中年/月/日、时间选择状态。
4. **使用日期库**：
   - 推荐 `date-fns`、`dayjs` 或原生 `Intl.DateTimeFormat`。
   - 避免自己写日期算法，容易出错。

三、可扩展点：

1. `renderCell`：自定义日期单元格渲染。
2. `renderFooter`：自定义底部操作区。
3. `presets`：快捷选择（今天、昨天、最近7天）。
4. `dateRender`：高亮特定日期。

四、可访问性：

1. 键盘导航：上下左右切换日期，Enter 选中，Esc 关闭面板。
2. ARIA：使用 `role="grid"`、`aria-selected`、`aria-disabled`。
3. 焦点管理：打开面板时焦点进入面板，关闭时回到输入框。

五、性能考虑：

- 日期面板数据可预生成或虚拟化。
- 避免在每次渲染时重新计算整个月份日期。

**评分维度**：
- API 设计合理（30%）
- 状态管理清晰（25%）
- 可扩展点（20%）
- 可访问性（15%）
- 性能意识（10%）

**常见错误**：
- 自己实现复杂日期逻辑
- 忽略键盘和屏幕阅读器支持

**口头回答版**：
> DatePicker 要设计受控和非受控 API，包括 value、onChange、minDate、maxDate、disabledDate、format 这些。状态有当前展示月份和选中值。用 date-fns 或 dayjs 处理日期，别自己写算法。提供 renderCell、presets 等扩展点。键盘导航和 ARIA 要做好。

---

### FB-14-SC-A-018：如何设计一个支持虚拟滚动的 Select？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Select、虚拟滚动、性能、组件库
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
当 Select 组件选项数量达到上万时，如何设计虚拟滚动以保证性能？

**参考答案**：

一、虚拟滚动原理：

只渲染可视区域内的选项，配合一个高度占位元素模拟完整列表高度。滚动时动态更新可视窗口内容。

二、核心计算：

1. 每个选项固定高度 `itemHeight`。
2. 可视区能显示 `visibleCount = Math.ceil(containerHeight / itemHeight) + buffer` 个选项。
3. `startIndex = Math.floor(scrollTop / itemHeight)`。
4. `offsetY = startIndex * itemHeight`。
5. 渲染 `items.slice(startIndex, startIndex + visibleCount)`。

三、API 设计：

```tsx
interface VirtualSelectProps {
  options: Option[];
  itemHeight?: number;
  visibleCount?: number;
  buffer?: number;
  value?: string | string[];
  onChange?: (value) => void;
}
```

四、实现细节：

1. 使用 `transform: translateY(offsetY)` 定位可视选项。
2. 监听滚动容器 `onScroll`，用 `requestAnimationFrame` 节流。
3. 键盘导航时，需要滚动到选中项：`scrollTop = selectedIndex * itemHeight`。
4. 多选时保持已选项在列表中的高亮状态。

五、可访问性：

1. 使用 `role="listbox"`、`role="option"`。
2. 键盘上下键移动焦点，并同步滚动。
3. 屏幕阅读器能正确播报选项总数和当前位置。

六、可变高度处理：

- 如果选项高度不固定，需要预先测量或动态计算。
- 可用 `react-window` 或 `react-virtualized` 等成熟库。

**评分维度**：
- 虚拟滚动原理清晰（25%）
- 计算逻辑具体（25%）
- 键盘和可访问性（20%）
- 可变高度处理（15%）
- 是否推荐成熟库（15%）

**常见错误**：
- 一次性渲染所有选项
- 滚动监听不做节流，导致卡顿

**口头回答版**：
> 虚拟滚动 Select 只渲染可视区选项，用一个占位元素模拟总高度。根据 scrollTop 算 startIndex 和 offsetY，渲染可视选项加 buffer。滚动用 requestAnimationFrame 节流，键盘上下键要同步滚动。选项多且高度固定时推荐 react-window。还要做 ARIA 和键盘导航。

---

### FB-14-SC-A-019：如何设计一个 Skeleton 加载组件？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Skeleton、加载、组件设计、UX
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个 Skeleton 骨架屏组件，说明其使用场景、实现方式和可定制性。

**参考答案**：

一、使用场景：

1. 页面首次加载，数据尚未返回时。
2. 列表、卡片、表单等结构化内容加载。
3. 避免使用统一 loading spinner 造成的闪烁感。

二、实现方式：

1. **基础元素**：
   - `Skeleton.Text`：文本占位。
   - `Skeleton.Circle`：头像占位。
   - `Skeleton.Rect`：矩形占位。

2. **动画**：
   - 常用 shimmer 动画（渐变扫过）。
   - 使用 CSS `background-size`、`background-position` 动画。

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

三、可定制性：

1. `width`、`height`、`borderRadius` 支持传入。
2. `active` 控制是否显示动画。
3. `rows` 控制文本行数。
4. 支持组合成复杂布局：
   ```tsx
   <Skeleton>
     <Skeleton.Circle size={40} />
     <Skeleton.Text rows={3} />
   </Skeleton>
   ```

四、可访问性：

1. 使用 `aria-busy="true"` 和 `aria-live` 提示加载状态。
2. 避免屏幕阅读器朗读骨架内容。
3. 加载完成后焦点应回到主要内容。

五、注意事项：

- 骨架屏结构应与真实内容结构一致，减少布局跳动。
- 不要滥用骨架屏，简单加载可用 spinner。

**评分维度**：
- 使用场景合理（20%）
- 实现方式具体（30%）
- 可定制性（25%）
- 可访问性（15%）
- 注意事项（10%）

**常见错误**：
- 骨架屏和真实内容结构差异大，加载后跳动明显
- 动画造成性能问题或视觉疲劳

**口头回答版**：
> Skeleton 用于数据加载时展示内容结构，减少等待焦虑。可以设计 Text、Circle、Rect 几种基础形状，用 CSS shimmer 动画。支持 width、height、圆角、行数等定制。要注意和真实内容结构一致，避免跳动。加载状态用 aria-busy 提示。

---

### FB-14-SC-A-020：如何设计一个 Steps 步骤条组件？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：Steps、组件设计、状态、可访问性
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个 Steps 步骤条组件，说明状态定义、API 设计和可访问性支持。

**参考答案**：

一、状态定义：

1. **wait**：未开始。
2. **process**：当前进行中。
3. **finish**：已完成。
4. **error**：当前步骤出错。
5. **disabled**：不可点击。

二、API 设计：

```tsx
interface StepsProps {
  current: number;
  items: StepItem[];
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'default' | 'large';
  onChange?: (index: number) => void;
  status?: 'process' | 'error';
}

interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

三、渲染逻辑：

1. 每个步骤显示序号/图标、标题、描述。
2. 当前步骤之前的连线为完成状态。
3. 当前步骤高亮显示。
4. 支持点击切换（如果允许）。

四、可访问性：

1. 使用 `role="list"` 和 `role="listitem"`。
2. 当前步骤 `aria-current="step"`。
3. 已完成步骤 `aria-label="已完成：xxx"`。
4. 键盘导航：Tab 切换焦点，Enter 激活。

五、扩展性：

1. 支持自定义图标。
2. 支持垂直布局和点状步骤条。
3. 支持步骤内容联动（与 Form Wizard 结合）。

**评分维度**：
- 状态定义清晰（25%）
- API 合理（25%）
- 渲染逻辑（20%）
- 可访问性（15%）
- 扩展性（15%）

**常见错误**：
- 状态之间转换逻辑混乱
- 忽略键盘和屏幕阅读器支持

**口头回答版**：
> Steps 组件状态分 wait、process、finish、error、disabled。API 有 current、items、direction、onChange。每个步骤显示序号、标题、描述，当前步骤高亮。可访问性用 role=list、aria-current=step。还要支持自定义图标、垂直布局和点状样式。

---

### FB-14-SC-A-021：组件库中如何实现响应式断点？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：响应式、breakpoint、组件库、CSS
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明组件库中如何定义和使用响应式断点，保证多设备一致性。

**参考答案**：

一、断点定义：

作为 Design Token 统一维护：

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

二、CSS Media Query 使用：

```css
.component {
  padding: var(--spacing-sm);
}

@media (min-width: 768px) {
  .component {
    padding: var(--spacing-md);
  }
}
```

三、组件级响应式 API：

```tsx
<Grid columns=&#123;&#123; sm: 1, md: 2, lg: 3 &#125;&#125; />
<Stack spacing=&#123;&#123; base: 2, md: 4 &#125;&#125; />
```

四、JS 中响应式处理：

1. 使用 `matchMedia` API 监听断点变化。
2. 提供 `useBreakpoint` hook：
   ```ts
   const breakpoint = useBreakpoint();
   // 'sm' | 'md' | 'lg'
   ```
3. 避免在每次渲染时重复创建 matchMedia。

五、与设计协同：

- Figma 中同步定义断点和对应布局。
- 文档中说明每个断点的推荐用法。
- 移动端优先（mobile-first）或桌面优先策略要统一。

**评分维度**：
- 断点定义方式（25%）
- CSS 和 JS 实现（30%）
- 组件级 API（20%）
- 与设计协同（15%）
- 性能意识（10%）

**常见错误**：
- 每个组件各自定义断点，导致不一致
- JS 中大量监听 resize 导致性能问题

**口头回答版**：
> 响应式断点应该作为 Design Token 统一维护，比如 sm、md、lg、xl。CSS 里用 media query，组件 API 可以支持对象形式 `{ sm: 1, md: 2 }`。JS 里用 matchMedia 做 useBreakpoint hook，不要监听 resize。设计稿里也要同步这些断点。

---

### FB-14-SC-P-011：如何设计一个可拖拽的组件？

**题型**：场景设计题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：拖拽、Dnd、组件设计、可访问性
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个可拖拽排序的列表组件，说明核心交互、状态管理和可访问性支持。

**参考答案**：

一、核心交互：

1. **鼠标/触控拖拽**：
   - mousedown/touchstart 开始拖拽。
   - 创建 ghost 元素跟随指针。
   - mousemove/touchmove 计算插入位置。
   - mouseup/touchend 更新顺序。

2. **键盘操作**：
   - Space/Enter 选中当前项。
   - 上下箭头移动位置。
   - Space/Enter 放下。

二、状态管理：

```tsx
interface DndListState {
  items: Item[];
  activeId: string | null;
  overId: string | null;
}
```

三、API 设计：

```tsx
interface SortableListProps {
  items: Item[];
  onReorder: (items: Item[]) => void;
  renderItem: (item: Item, props: SortableItemProps) => React.ReactNode;
}
```

四、库选择：

- 推荐 `@dnd-kit`（现代、可访问性好）或 `react-beautiful-dnd`。
- 复杂场景可用原生 HTML5 Drag and Drop，但可访问性差。

五、可访问性：

1. 拖拽项 `role="button"` 或 `role="listitem"`。
2. 使用 `aria-grabbed`、`aria-dropeffect`。
3. 屏幕阅读器播报当前位置和操作结果。
4. 提供视觉提示：高亮当前项、插入位置指示线。

六、性能：

- 大量项时使用虚拟滚动。
- 拖拽过程中不直接修改 DOM 顺序，只更新 transform。

**评分维度**：
- 交互设计完整（30%）
- 状态和 API 设计（25%）
- 可访问性（25%）
- 性能和库选择（20%）

**常见错误**：
- 只支持鼠标拖拽，忽略键盘用户
- 拖拽时没有明确视觉反馈

**口头回答版**：
> 可拖拽列表组件要支持鼠标和键盘两种操作。鼠标拖拽创建 ghost 元素，计算插入位置；键盘用空格选中和箭头移动。状态管理 activeId、overId 和 items。推荐 @dnd-kit，可访问性好。要做 ARIA 播报和视觉提示，大量项时加虚拟滚动。

---

### FB-14-SC-P-012：如何设计组件库的国际化文案管理？

**题型**：场景设计题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：国际化、i18n、组件库、文案管理
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明组件库如何管理内置文案（如 Button、Modal、Form 的默认提示），以支持多语言。

**参考答案**：

一、内置文案抽象：

组件库不应直接写死中文或英文，而是提供默认 locale 对象，允许业务方覆盖。

```ts
// locale/zh-CN.ts
export default {
  Button: { loading: '加载中' },
  Modal: { ok: '确定', cancel: '取消' },
  Form: { required: '该字段不能为空' }
};
```

二、API 设计：

```tsx
import { ConfigProvider } from '@scope/ui';
import zhCN from '@scope/ui/locale/zh-CN';

<ConfigProvider locale={zhCN}>
  <App />
</ConfigProvider>
```

三、文案组织：

1. 按组件分 namespace，避免 key 冲突。
2. 提供 TypeScript 类型，支持 IDE 提示。
3. 支持运行时覆盖：
   ```tsx
   <ConfigProvider locale={zhCN} localeOverrides=&#123;&#123; Modal: { ok: '好的' } &#125;&#125;>
   ```

四、与业务 i18n 框架集成：

- 组件库本身不绑定具体 i18n 库（如 react-i18next）。
- 提供 `locale` 注入机制，业务方可以把自己框架的翻译传给组件库。

五、可扩展性：

- 支持语言回退：找不到 `zh-CN` 时回退到 `zh`，再回退到 `en`。
- 支持复数、日期、数字格式化（可借助 Intl API）。
- 提供 CLI 或脚本帮助业务方提取和翻译文案。

**评分维度**：
- 内置文案抽象方式（30%）
- API 设计合理（25%）
- 与业务 i18n 解耦（20%）
- 回退和格式化（15%）
- 工具支持（10%）

**常见错误**：
- 组件库直接硬编码中文
- 绑定某个 i18n 框架，限制业务方选择

**口头回答版**：
> 组件库文案不能硬编码，要抽象成 locale 对象，按组件分 namespace。通过 ConfigProvider 注入，支持业务覆盖。不绑定具体 i18n 库，业务可以把自己框架的翻译传进来。还要支持语言回退、复数、日期格式化。

---

### FB-14-SC-P-013：如何设计组件库的错误边界和降级策略？

**题型**：场景设计题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：错误边界、Error Boundary、降级、组件库
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明组件库如何设计错误边界和降级策略，避免单个组件错误导致整个应用崩溃。

**参考答案**：

一、错误边界机制：

1. React 使用 class component 的 `componentDidCatch` 或 `react-error-boundary`。
2. Vue 使用 `errorCaptured` 钩子或 `onErrorCaptured`。

二、组件库内置 Error Boundary：

```tsx
interface SafeComponentProps {
  fallback?: React.ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}
```

三、降级策略：

1. **静默降级**：显示 fallback UI，如占位符或提示。
2. **部分降级**：只隐藏出错子组件，其他组件正常显示。
3. **重试机制**：提供“重新加载”按钮。
4. **日志上报**：把错误信息发送到监控平台。

四、使用方式：

1. 全局包裹：在应用根节点包一层 Error Boundary。
2. 局部包裹：对可能出错的复杂组件单独包裹。
3. 组件库内部：每个独立组件自身具备一定容错能力。

五、设计原则：

- 默认行为要安全，不要让用户看到白屏。
- fallback UI 风格要与组件库一致。
- 提供 onError 回调，让业务方自定义处理。

六、可访问性：

- 错误提示要可读，不仅是空白。
- 提供聚焦管理，错误发生时焦点移动到 fallback。

**评分维度**：
- 错误边界实现（25%）
- 降级策略多样（30%）
- 使用方式（20%）
- 设计原则和可访问性（15%）
- 日志上报（10%）

**常见错误**：
- 只在应用根节点包 Error Boundary，局部组件崩溃范围大
- 降级 UI 和组件库风格不一致

**口头回答版**：
> 组件库可以提供 SafeComponent 或内置 Error Boundary，捕获子组件错误后显示 fallback。降级可以静默显示占位、局部隐藏、提供重试按钮。全局和局部都可以包。错误要上报监控，fallback UI 风格要统一。还要把焦点移动到 fallback，提升可访问性。

---

### FB-14-SC-P-014：组件库如何支持微前端下的样式隔离？

**题型**：场景设计题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：微前端、样式隔离、CSS Modules、Shadow DOM、组件库
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明组件库在微前端架构下，如何支持样式隔离，避免子应用间互相污染。

**参考答案**：

一、组件库自身样式隔离：

1. **CSS Modules**：
   - 组件类名编译为唯一 hash，天然隔离。
   - 适合 React/Vue 组件库。

2. **BEM 命名规范**：
   - 类名带组件前缀，降低冲突概率。

3. **CSS-in-JS**：
   - 样式随组件生成，作用域限定在组件内。
   - 如 styled-components、emotion。

二、微前端框架层面的隔离：

1. **Shadow DOM**：
   - 子应用挂载到 shadow root，样式完全隔离。
   - 但组件库需要考虑 shadow root 内的 CSS 变量和事件传播。

2. **CSS Scoped Prefix**：
   - qiankun 等框架会自动给子应用样式加前缀。

3. **构建时加前缀**：
   - 组件库构建时为所有类名加统一前缀，如 `.app1-button`。

三、Design Token 隔离：

- 使用 CSS 变量时避免全局同名。
- 组件库 CSS 变量加前缀：`--scope-color-primary`。

四、实践建议：

- 组件库不依赖全局样式，所有样式通过组件自身引入。
- 提供无样式版本（Headless），让业务方自行决定样式方案。
- 文档说明微前端下的集成方式。

**评分维度**：
- 组件库自身隔离方案（35%）
- 微前端框架层面方案（30%）
- Token 隔离（15%）
- 实践建议（20%）

**常见错误**：
- 组件库使用全局样式，子应用互相污染
- 使用 Shadow DOM 但不处理 CSS 变量和事件冒泡

**口头回答版**：
> 组件库自身可以用 CSS Modules、BEM 或 CSS-in-JS 隔离样式。微前端框架可以用 Shadow DOM 或自动加前缀。CSS 变量要加前缀避免冲突。组件库尽量不依赖全局样式，必要时提供 Headless 版本。文档里要说清楚微前端集成方式。

---

### FB-14-SC-P-015：如何设计组件库的埋点与可观测性？

**题型**：场景设计题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：14 设计系统与组件库
**标签**：组件库、埋点、可观测性、数据
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明组件库如何设计埋点和可观测性机制，帮助业务方分析组件使用情况。

**参考答案**：

一、埋点设计：

1. **组件级埋点**：
   - 在组件内部关键交互处触发事件，如 Button click、Modal open、Form submit。
   - 通过统一的 `onTrack` 回调暴露给业务方。

```tsx
interface ConfigProviderProps {
  onTrack?: (event: TrackEvent) => void;
}

interface TrackEvent {
  component: string;
  action: string;
  payload?: Record<string, any>;
}
```

2. **不强制绑定埋点库**：
   - 组件库只提供事件和回调。
   - 业务方将事件转发到自己的埋点系统（如神策、GrowingIO、GA）。

二、可观测性：

1. **性能指标**：
   - 组件渲染耗时、首次交互时间。
   - 使用 React Profiler、Vue devtools 或自定义 performance mark。

2. **错误监控**：
   - 组件内部捕获错误并上报。
   - 统计各组件错误率。

3. **使用率统计**：
   - 通过静态分析或运行时注册，统计哪些组件被使用。

三、隐私与合规：

- 不采集敏感信息。
- 提供关闭埋点的开关。
- 遵循 GDPR、个人信息保护法等法规。

四、数据应用：

- 识别高频/低频组件，指导组件库演进。
- 发现组件使用痛点，优化 API 设计。
- 追踪 Breaking Change 的影响范围。

**评分维度**：
- 埋点设计合理（30%）
- 与业务解耦（20%）
- 可观测性维度（25%）
- 隐私合规（15%）
- 数据应用（10%）

**常见错误**：
- 组件库直接集成特定埋点 SDK
- 采集用户敏感信息导致合规风险

**口头回答版**：
> 组件库埋点可以通过 ConfigProvider 注入 onTrack 回调，在 Button、Modal、Form 等关键交互时触发事件，业务方转发到自己的埋点系统。可观测性还要看组件渲染性能、错误率和使用率。不能采集敏感信息，要提供关闭开关。数据用来指导组件库演进和 Breaking Change 影响分析。

---

### FB-14-SD-R-015：如何设计组件库的 CI/CD 与发布流水线？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：14 设计系统与组件库
**标签**：组件库、CI/CD、发布、Monorepo、Storybook
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个企业级组件库的 CI/CD 与发布流水线，覆盖测试、文档、发布和站点部署。

**参考答案**：

一、CI 阶段：

```
install → lint → typecheck → unit test → visual regression → build
```

1. **lint/typecheck**：所有包通过才能继续。
2. **单元测试**：覆盖核心组件和工具函数。
3. **视觉回归测试**：用 Chromatic 或 Loki 对比组件截图。
4. **构建**：打包 ES/CJS/UMD 产物，生成类型声明。

二、PR 阶段：

- 每个 PR 部署 Storybook preview URL。
- 视觉回归测试生成差异报告。
- 文档变更同步预览。

三、发布阶段：

1. 合并 main 后，根据 Changesets 自动计算版本。
2. 生成 changelog。
3. 构建并发布到 npm（按拓扑顺序）。
4. 为文档站点和 Storybook 打 tag 并部署。

四、文档站点：

- 使用 VitePress/Docusaurus 搭建。
- 自动从组件注释生成 API 文档。
- 每次发布同步部署到 CDN。

五、产物管理：

- 产物包含 ES modules、CommonJS、UMD、类型声明。
- 每个版本产物保留在 npm registry 和内部 registry。
- Source Map 上传监控平台。

六、安全：

- npm publish 使用 CI automation token。
- 核心包发布需要额外审批。
- 发布前运行 npm audit。

**评分维度**：
- CI 阶段完整（30%）
- PR preview 和视觉回归（20%）
- 发布流程清晰（25%）
- 文档和安全（15%）
- 产物管理（10%）

**常见错误**：
- 没有视觉回归，UI 变更无法及时发现
- 发布流程手动化，容易出错

**口头回答版**：
> 组件库 CI 要跑 lint、typecheck、单元测试、视觉回归、构建。PR 自动部署 Storybook preview。发布时用 Changesets 自动算版本、生成 changelog、按拓扑顺序发布到 npm。文档站点用 VitePress，随发布一起部署。发布前跑 npm audit，核心包要审批。

---

### FB-14-SD-R-016：如何构建组件库的开发者体验（DX）？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：14 设计系统与组件库
**标签**：组件库、DX、开发者体验、文档、工具链
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明如何提升组件库的开发者体验，让业务方愿意使用并高效开发。

**参考答案**：

一、文档体验：

1. 每个组件有清晰的使用示例、API 表格、变更记录。
2. Storybook 支持在线交互和参数调节。
3. 搜索功能强大，支持按组件、API、场景查找。

二、开发工具：

1. 提供 CLI 脚手架，快速创建组件和示例。
2. 类型提示完善，API 有详细 TypeScript 类型。
3. 支持 Tree Shaking 和按需引入，减少打包体积。

三、调试支持：

1. 提供 devtools 插件，查看组件状态和 Design Token。
2. 清晰的错误提示，指出常见用法错误。
3. Source Map 完整，便于调试。

四、反馈渠道：

1. Issue 模板和快速响应机制。
2. 内部技术支持群或频道。
3. 定期用户满意度调研。

五、迁移与升级：

1. 提供 codemod 脚本，自动迁移 Breaking Change。
2. 版本升级文档详细，包含 before/after 示例。
3. 发布路线图透明，让业务方有预期。

六、性能与稳定：

1. 组件库构建产物体积小。
2. 运行时性能好，无内存泄漏。
3. 版本发布稳定，不频繁引入 regression。

**评分维度**：
- 文档体验（25%）
- 开发工具（20%）
- 调试支持（15%）
- 反馈与升级（20%）
- 性能稳定（20%）

**常见错误**：
- 只关注组件实现，忽略文档和工具
- 升级时没有迁移指南，业务方抵触

**口头回答版**：
> 组件库 DX 要好，文档要清晰、有示例、可在线交互。提供 CLI、完善 TypeScript、支持按需引入。要有 devtools、清晰错误提示、Source Map。Issue 响应要快，升级提供 codemod 和详细迁移文档。最终性能稳定、体积小，业务方才愿意用。

---

### FB-14-SD-R-017：如何设计组件库的暗色/浅色主题自动切换？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：14 设计系统与组件库
**标签**：主题、暗色模式、自动切换、Design Token
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个支持暗色/浅色主题自动切换的组件库方案。

**参考答案**：

一、Design Token 分层：

```css
:root {
  /* 基础 token */
  --color-gray-100: #f5f5f5;
  --color-gray-900: #1a1a1a;
  
  /* 语义 token */
  --color-bg: var(--color-gray-100);
  --color-text: var(--color-gray-900);
}

[data-theme="dark"] {
  --color-bg: var(--color-gray-900);
  --color-text: var(--color-gray-100);
}
```

二、切换机制：

1. **CSS 类切换**：
   - 在 html 或 body 上切换 `data-theme`。
   - 组件只依赖语义 token。

2. **系统偏好自动检测**：
   ```ts
   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
   ```

3. **持久化**：
   - 用户手动选择后存入 localStorage。
   - 下次访问优先使用用户选择，其次使用系统偏好。

三、API 设计：

```tsx
<ThemeProvider
  defaultTheme="system"
  storageKey="app-theme"
>
  <App />
</ThemeProvider>
```

四、避免闪烁：

1. 在 HTML 渲染前通过 inline script 读取 localStorage 设置主题。
2. 避免先渲染浅色再切换到暗色。

五、图片和图标：

- 提供暗色模式专用资源，或使用 mask/filter 调整。
- 图标颜色跟随当前 token。

六、可访问性：

- 暗色模式下保持足够的颜色对比度（WCAG AA）。
- 提供主题切换按钮，并有清晰的 aria-label。

**评分维度**：
- Token 分层设计（25%）
- 切换机制（25%）
- API 设计（15%）
- 避免闪烁（15%）
- 可访问性（10%）
- 图片处理（10%）

**常见错误**：
- 组件直接使用基础色值，不支持主题切换
- 页面加载时先闪一下浅色

**口头回答版**：
> 主题切换要用基础 token 和语义 token 分层，语义 token 在不同主题下映射不同基础色。切换通过 data-theme 属性，自动检测系统 prefers-color-scheme，用户选择存 localStorage。页面渲染前用 inline script 读主题避免闪烁。暗色模式要保证对比度，图标和图片也要适配。

---

### FB-14-SC-R-005：如何从设计系统沉淀业务设计语言？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：14 设计系统与组件库
**标签**：设计系统、业务设计语言、沉淀、组件库
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明如何从多个业务线中沉淀出通用的业务设计语言，并反哺设计系统。

**参考答案**：

一、收集业务需求：

1. 分析各业务线的页面和组件，找出共性模式。
2. 通过设计师访谈、业务方问卷收集痛点。
3. 建立组件需求池，按使用频率和影响面排序。

二、抽象设计模式：

1. 把业务组件抽象为通用模式，如列表页、详情页、表单页。
2. 提取通用的交互流程：搜索、筛选、分页、批量操作。
3. 定义业务语义 token，如 `color-success`、`color-warning`。

三、验证与试点：

1. 选择 1-2 个业务线试点，验证通用模式是否满足需求。
2. 收集使用反馈，调整 API 和视觉。
3. 确认稳定后纳入设计系统。

四、反哺机制：

1. 业务组件升级时评估是否可通用化。
2. 建立贡献流程，业务团队可以提交 RFC。
3. 对贡献者给予认可和激励。

五、文档与培训：

1. 沉淀业务设计语言文档，说明何时使用何种模式。
2. 定期组织跨业务线的设计 review。
3. 在新业务启动时推荐使用已沉淀的模式。

六、度量：

- 统计通用组件在不同业务线的复用率。
- 收集业务方满意度，持续优化设计语言。

**评分维度**：
- 需求收集（20%）
- 抽象能力（25%）
- 验证试点（20%）
- 反哺机制（15%）
- 度量（10%）
- 文档培训（10%）

**常见错误**：
- 没有从业务提炼，直接照搬其他公司设计系统
- 沉淀的组件不满足实际业务场景

**口头回答版**：
> 从业务沉淀设计语言要先分析各业务线页面，找出共性模式，通过访谈收集痛点。然后抽象成通用组件和交互模式，选一两个业务试点验证，稳定后纳入设计系统。建立业务贡献流程，沉淀文档，统计复用率和满意度，持续优化。

---

### FB-14-SC-R-006：如何评估组件库的商业价值？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：14 设计系统与组件库
**标签**：组件库、商业价值、ROI、设计系统
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明如何度量组件库的商业价值，向管理层证明投入是值得的。

**参考答案**：

一、效率指标：

1. **开发效率**：
   - 新页面开发时间缩短比例。
   - 需求交付周期（lead time）变化。

2. **设计效率**：
   - 设计稿复用率。
   - 设计-研发交付往返次数减少。

二、质量指标：

1. **线上缺陷率**：使用组件库后 bug 数下降比例。
2. **视觉一致性评分**：品牌一致性提升。
3. **可访问性合规率**。

三、成本指标：

1. **重复开发减少**：相同组件不再各业务线重复建设。
2. **维护成本降低**：统一升级和修复，减少散落的维护点。
3. **培训成本降低**：新人通过学习组件库快速上手。

四、业务指标：

1. **转化率/用户满意度**：一致体验带来的业务收益。
2. **上线速度**：支持业务快速试错和创新。

五、度量方法：

1. 基线调研：组件库上线前的效率、质量数据。
2. 持续跟踪：每季度采集关键指标。
3. 案例收集：具体项目因组件库节省的时间和成本。
4. 用户满意度：业务方和设计师的 NPS 调研。

六、呈现方式：

- 制作 ROI 报告，用数据说话。
- 展示标杆业务线使用效果。
- 与管理层定期复盘组件库投入产出。

**评分维度**：
- 指标分类全面（35%）
- 度量方法具体（25%）
- 业务指标关联（20%）
- 呈现方式（20%）

**常见错误**：
- 只讲技术价值，没有和商业指标挂钩
- 没有基线数据，无法证明改进

**口头回答版**：
> 评估组件库商业价值可以从效率、质量、成本、业务四方面。效率看页面开发时间和设计稿复用率，质量看 bug 下降和一致性，成本看重复开发减少和维护成本降低，业务看转化率和上线速度。要有基线数据，持续跟踪，做 ROI 报告和满意度调研。

---
