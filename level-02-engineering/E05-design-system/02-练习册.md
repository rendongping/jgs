# 设计体系 · 练习册

> 本练习册依据《01-学习文档.md》编制，涵盖组件库设计原则、原子化设计、Design Token、Storybook、可访问性、CSS 架构、组件库工程化、版本治理等内容。难度由浅入深，每题均附答案与解析。

---

## 一、选择题（每题 4 分，共 20 分）

### 第 1 题
以下哪一项最能概括设计体系（Design System）的核心价值？

A. 让设计师完全替代前端开发  
B. 统一视觉规范、提升开发效率、改善协作体验  
C. 限制所有业务创新，确保页面一模一样  
D. 只产出高保真设计稿

**答案：B**

**解析：** 文档指出设计体系把设计规范、组件、工具、文档整合起来，让产品视觉一致、开发效率更高、协作更顺畅。

---

### 第 2 题
原子化设计（Atomic Design）中，由原子组合而成的简单组件属于哪一层？

A. Atoms  
B. Molecules  
C. Organisms  
D. Templates

**答案：B**

**解析：** Molecules（分子）是由原子组合而成的简单组件，例如搜索框 = 输入框 + 按钮。

---

### 第 3 题
Design Token 的主要作用不包括？

A. 统一全站视觉值  
B. 支持主题化与换肤  
C. 替代组件的所有逻辑  
D. 跨平台共享设计决策

**答案：C**

**解析：** Design Token 存储颜色、字号、间距等视觉决策，但不能替代组件逻辑。

---

### 第 4 题
以下哪种 CSS 方案最适合需要严格命名规范、避免样式冲突的传统项目？

A. CSS-in-JS  
B. CSS Modules  
C. BEM  
D. 原子化 CSS（Tailwind）

**答案：C**

**解析：** 文档表格中明确 BEM 适合传统项目、需要严格命名规范的场景。

---

### 第 5 题
组件库遵循 SemVer 时，一次破坏性 API 变更应该升级？

A. Patch  
B. Minor  
C. Major  
D. 不需要升级版本号

**答案：C**

**解析：** SemVer 规定 Major 版本用于不兼容变更，Minor 用于新增功能，Patch 用于修复问题。

---

## 二、填空题（每空 2 分，共 20 分）

### 第 6 题
组件库设计的五大核心原则是：单一职责、可组合性、可预测性、可访问性和 ________。

**答案：可文档化**

**解析：** 文档列出的五大原则为：单一职责、可组合性、可预测性、可访问性、可文档化。

---

### 第 7 题
原子化设计的五个层级从低到高依次是：Atoms、Molecules、Organisms、Templates、________。

**答案：Pages**

**解析：** 五个层级为 Atoms → Molecules → Organisms → Templates → Pages。

---

### 第 8 题
Design Token 通常分为三个层级：Global Token、Alias Token 和 ________ Token。

**答案：Component**

**解析：** 文档“Token 的层级结构”中说明三个层级为 Global、Alias、Component。

---

### 第 9 题
Storybook 的 ________ 插件可以让用户在界面上动态调整组件 props。

**答案：Controls**

**解析：** 文档“Storybook 的高级用法”中提到 Controls 插件支持动态调整 props。

---

### 第 10 题
BEM 命名规范中，`.card__title--primary` 里的 `--primary` 属于 ________。

**答案：Modifier（修饰符）**

**解析：** BEM = Block（块）、Element（元素）、Modifier（修饰符）。`--` 表示修饰符。

---

### 第 11 题
CSS Modules 通过把类名 ________ 化来避免全局污染。

**答案：局部**

**解析：** CSS Modules 把 CSS 类名局部化，编译后生成唯一类名，避免全局冲突。

---

### 第 12 题
可访问性（Accessibility）通常简称为 ________。

**答案：a11y**

**解析：** Accessibility 中间有 11 个字母，所以简写为 a11y。

---

### 第 13 题
组件库通常需要输出多种模块格式，其中 ________ 格式适合现代浏览器和构建工具。

**答案：ESM**

**解析：** 文档说明组件库通常输出 ESM、CJS、UMD，其中 ESM 适合现代浏览器和构建工具。

---

### 第 14 题
当某个业务组件在多个业务中复用时，可以考虑将其 ________ 到设计体系中。

**答案：提升 / 沉淀**

**解析：** 文档“业务组件的沉淀”中提到，当业务组件在多个业务中复用时，可提升到设计体系。

---

### 第 15 题
使用 Tailwind CSS 时，通过 ________ 引擎按需生成样式，避免产物体积过大。

**答案：JIT（Just-In-Time）**

**解析：** 文档“Tailwind CSS 的工程化”中说明 Tailwind 通过 JIT 引擎按需生成样式。

---

## 三、代码分析题（每题 10 分，共 30 分）

### 第 16 题
分析以下 Design Token 结构，指出其层级关系并说明优点。

```json
{
  "global": { "color": { "blue-500": "#1890ff" } },
  "alias": { "color": { "primary": "{global.color.blue-500}" } },
  "component": { "button": { "primary-bg": "{alias.color.primary}" } }
}
```

**答案与解析：**

- 层级关系：
  - `global.color.blue-500` 是最基础的设计值（Global Token）。
  - `alias.color.primary` 是别名 Token，把全局值映射到语义化名称。
  - `component.button.primary-bg` 是组件级 Token，针对 Button 主背景色。
- 优点：
  - 修改品牌主色只需改 alias 层，组件层自动生效。
  - 语义清晰，便于理解和搜索。
  - 支持主题化，例如暗黑模式替换 alias 即可。
  - 跨平台输出时，可统一从各层级生成目标代码。

---

### 第 17 题
以下组件实现存在哪些问题？请从组件库设计原则角度分析。

```jsx
function UserCard({ user, onDelete, onEdit, theme, size, showAvatar, bordered }) {
  return (
    <div className={`card ${theme} ${size} ${bordered ? 'bordered' : ''}`}>
      {showAvatar && <img src={user.avatar} />}
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      <button onClick={onEdit}>编辑</button>
      <button onClick={onDelete}>删除</button>
    </div>
  );
}
```

**答案与解析：**

1. **违反单一职责**：组件同时负责展示用户信息、编辑、删除、主题/尺寸控制，职责过重。
2. **可组合性差**：头像、标题、操作按钮被硬编码，无法灵活组合。
3. **可访问性不足**：img 缺少 `alt` 属性，按钮缺少语义化说明，可能影响屏幕阅读器。
4. **可预测性不足**：`theme`、`size` 为字符串，传入非法值时样式不可控，应使用枚举或类型约束。
5. **命名不清晰**：`bordered` 建议改为 `bordered` 已是布尔，但主题/尺寸建议拆分为独立子组件或 composition。
6. 改进方向：拆分为 `Card`、`Avatar`、`CardTitle`、`CardActions` 等原子/分子组件，通过组合方式拼装。

---

### 第 18 题
以下 Storybook Story 是否完整？如果不完整，请补充使其能自动生成文档。

```jsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button
};

export const Primary = () => <Button type="primary">Primary</Button>;
```

**答案与解析：**

- 该 Story 可以运行，但不够完整：
  1. 缺少 `tags: ['autodocs']`（Storybook 7+）以自动生成文档。
  2. 使用 render 函数形式不利于 Controls 插件动态调整 props，建议改为 `args` 形式。
  3. 缺少 argTypes，无法控制 prop 类型和取值范围。
- 改进示例：

```jsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['primary', 'default', 'dashed'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] }
  }
};

export const Primary = {
  args: {
    type: 'primary',
    children: 'Primary Button'
  }
};

export const Large = {
  args: {
    size: 'large',
    children: 'Large Button'
  }
};
```

---

### 第 19 题
分析以下 CSS 写法的问题，并给出基于 BEM 的改进版本。

```css
.card {}
.title {}
.button {}
.primary {}
```

**答案与解析：**

- 问题：
  - `.title`、`.button`、`.primary` 类名过于通用，容易产生全局命名冲突。
  - 无法从类名看出层级关系，可维护性差。
- BEM 改进：

```css
/* Block */
.card {}

/* Element */
.card__title {}
.card__button {}

/* Modifier */
.card__button--primary {}
.card--large {}
```

- 优点：命名清晰、结构明确、避免冲突。

---

### 第 20 题
以下代码的可访问性存在哪些问题？如何修复？

```jsx
<div className="modal-header">
  <span onClick={onClose}>×</span>
  <h2>{title}</h2>
</div>
```

**答案与解析：**

1. `<span>` 作为关闭按钮，无法通过键盘聚焦和操作。应改为 `<button>`。
2. 缺少 `aria-label`，屏幕阅读器无法识别“×”的含义。
3. 若弹窗是模态框，应管理焦点（focus trap）、设置 `role="dialog"`、`aria-modal="true"`。
4. 关闭按钮应可通过 `Esc` 键关闭弹窗。
5. 修复示例：

```jsx
<div className="modal-header">
  <button aria-label="关闭弹窗" onClick={onClose}>
    ×
  </button>
  <h2 id="modal-title">{title}</h2>
</div>
```

---

## 四、实践题（每题 15 分，共 30 分）

### 第 21 题
**任务：** 为一个设计体系设计一套 Button 组件的 Design Token、Storybook Story 和单元测试。

**要求：**

1. 使用三个层级的 Design Token 定义 Button 的主背景色、主文字色、圆角、内边距。
2. 编写 Storybook Story，支持 `type`（primary / default）、`size`（small / medium / large）、`disabled` 三个 props，并能通过 Controls 动态调整。
3. 使用 React Testing Library 编写单元测试，验证：
   - 默认渲染正确；
   - 点击事件正常触发；
   - `disabled` 状态下按钮不可点击且具备 `disabled` 属性。

**参考答案：**

1. Design Token（JSON）：

```json
{
  "global": {
    "color": { "blue-500": "#1890ff", "white": "#ffffff" },
    "radius": { "sm": "2px", "md": "4px" },
    "spacing": { "sm": "4px 8px", "md": "8px 16px", "lg": "12px 24px" }
  },
  "alias": {
    "color": { "primary-bg": "{global.color.blue-500}", "primary-text": "{global.color.white}" },
    "radius": { "button": "{global.radius.md}" }
  },
  "component": {
    "button": {
      "primary-bg": "{alias.color.primary-bg}",
      "primary-text": "{alias.color.primary-text}",
      "radius": "{alias.radius.button}",
      "padding-sm": "{global.spacing.sm}",
      "padding-md": "{global.spacing.md}",
      "padding-lg": "{global.spacing.lg}"
    }
  }
}
```

2. Storybook Story：

```jsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['primary', 'default'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' }
  }
};

export const Primary = {
  args: { type: 'primary', children: 'Primary', size: 'medium', disabled: false }
};

export const LargeDisabled = {
  args: { type: 'default', children: 'Disabled', size: 'large', disabled: true }
};
```

3. 单元测试：

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('默认渲染按钮文本', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('点击时触发 onClick', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 状态下不可点击且具备 disabled 属性', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

---

### 第 22 题
**任务：** 为一个新的业务中台项目选择 CSS 架构方案，并给出理由和落地方案。

**背景：**

- 技术栈：React + TypeScript + Vite。
- 团队规模：10 人左右，前后端协作紧密。
- 需求：需要支持多品牌换肤、组件复用率高、对首屏性能有一定要求。

**参考答案：**

- **推荐方案：** CSS Modules + Tailwind CSS（原子化 CSS）+ Design Token 的组合。
- **理由：**
  - React 组件化项目天然适合 CSS Modules，避免全局污染，且能与 TypeScript 结合提供类型支持。
  - 多品牌换肤需求通过 Design Token 实现，CSS Modules 中引用 token 变量即可。
  - 原子化 CSS（Tailwind）适合快速搭建页面，减少手写 CSS 量，且 JIT 引擎可保证产物体积。
  - 对于需要动态主题的场景，可结合 CSS Variables（由 Design Token 输出）实现运行时换肤。
- **落地方案：**
  1. 定义 Global / Alias / Component 三级 Design Token。
  2. 使用 Style Dictionary 输出为 CSS Variables、SCSS、JS 对象。
  3. 基础组件（Button、Input）使用 CSS Modules，引用 CSS Variables。
  4. 业务页面使用 Tailwind 工具类快速布局，特殊样式仍通过 CSS Modules 管理。
  5. 配置 Tailwind `theme.extend` 与 Design Token 保持一致。
  6. 在 Storybook 中展示不同主题下的组件效果。

---

## 附录：评分建议

| 题型 | 题数 | 总分 | 建议通过线 |
|------|------|------|------------|
| 选择题 | 5 | 20 | 12 |
| 填空题 | 10 空 | 20 | 12 |
| 代码分析题 | 5 | 30 | 18 |
| 实践题 | 2 | 30 | 18 |
| **合计** | **≥15 道** | **100** | **60** |

---

> 练习完成后建议：打开 Storybook 亲手写一个组件 Story，并尝试用 axe-core 或 Lighthouse 做一次可访问性扫描。

---

> **领域编号**：E05 设计体系  
> **最后更新**：2026-06-18
