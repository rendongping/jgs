# 设计系统与组件库 面试题

> 本文件收录设计系统（Design System）与组件库（Component Library）相关面试题，目标题量 40 道。
> 题型覆盖：概念题、场景设计题、系统设计题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#基础题)
- [进阶题](#进阶题)
- [深入题](#深入题)
- [架构题](#架构题)

---

## 基础题

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
  pagination={{ pageSize: 10 }}
  rowSelection={{ type: 'checkbox' }}
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

## 进阶题

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
<Grid columns={{ sm: 1, md: 2, lg: 4 }} />
<Space size={{ sm: 'sm', lg: 'lg' }} />
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

## 深入题

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
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
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

## 架构题

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
  run: pnpm chromatic --project-token=${{ secrets.CHROMATIC_TOKEN }}
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
