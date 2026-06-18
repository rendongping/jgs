# 设计体系学习文档

---

## 核心要点（TL;DR）

- 设计体系是设计规范、组件、Token、文档与流程的系统化整合，目标是产品一致性与开发效率。
- 组件库应遵循单一职责、可组合、可预测、可访问与可文档化原则，原子化设计帮助组织组件层级。
- Design Token 是设计决策的唯一来源，分层（Global/Alias/Component）与跨平台输出支撑主题化和品牌一致性。
- Storybook 实现组件独立开发、文档化与视觉回归测试，可访问性应作为组件验收标准。
- CSS 架构（BEM、CSS Modules、CSS-in-JS、原子化 CSS）选型应匹配团队技术栈与工程化需求。

## 学习时长与前置知识

- **建议学习时长**：3-4 周（每周投入 6-8 小时）
- **前置知识**：React/Vue 基础、CSS、组件化思维

## 一、前言：为什么需要设计体系？

想象你走进一家连锁咖啡店。无论去哪家分店，菜单、装修风格、杯子、服务流程几乎都一模一样。这种一致性不是偶然，而是背后有一套完整的设计规范在支撑。

前端项目也是如此。当产品越来越大、团队越来越多时，如果没有统一的设计体系，每个页面可能都会长出不同样式的按钮、不同尺寸的间距、不同颜色的文字。最终用户会觉得产品"东拼西凑"，开发团队也会陷入重复劳动。

设计体系（Design System）就是一套把设计规范、组件、工具、文档整合起来的系统。它让产品视觉一致、开发效率更高、协作更顺畅。

## 二、组件库设计原则

### 2.1 什么是组件库？

组件库是设计体系在技术层面的落地。它把常用的 UI 元素（按钮、输入框、弹窗、表格等）封装成可复用的代码组件。

### 2.2 组件库设计的核心原则

**单一职责**：一个组件只做一件事。按钮负责点击反馈，输入框负责数据录入，不要混在一起。

**可组合性**：复杂组件应由简单组件组合而成。就像乐高积木，小块拼成大块。

**可预测性**：相同输入产生相同输出。组件的行为和样式应该稳定可预期。

**可访问性**：组件要考虑到残障用户、键盘用户、屏幕阅读器用户。

**可文档化**：每个组件都要有清晰的文档和示例。

生活化比喻：组件库就像餐厅的中央厨房。每道菜（页面）都由标准化的食材（组件）组成，既保证口味一致，又提高出餐效率。

## 三、原子化设计

### 3.1 原子化设计理论

原子化设计（Atomic Design）由 Brad Frost 提出，把 UI 拆成五个层次：

1. **Atoms（原子）**：最基本、不可再分的元素，如颜色、字体、间距、按钮
2. **Molecules（分子）**：由原子组合而成的简单组件，如搜索框（输入框 + 按钮）
3. **Organisms（有机体）**：由分子和原子组成的复杂组件，如导航栏、商品卡片
4. **Templates（模板）**：页面的骨架，定义组件的布局关系
5. **Pages（页面）**：真实的页面，填充具体数据后的模板

### 3.2 原子化设计的价值

- 清晰的层级结构
- 更容易维护和扩展
- 促进设计与开发的协作

## 四、Design Token

### 4.1 什么是 Design Token？

Design Token 是设计体系中用于存储设计决策的变量。它把颜色、字号、间距、圆角等视觉属性抽象成可复用的 token。

```json
{
  "color": {
    "primary": "#1890ff",
    "success": "#52c41a",
    "warning": "#faad14",
    "error": "#f5222d"
  },
  "fontSize": {
    "sm": "12px",
    "base": "14px",
    "lg": "16px"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px"
  }
}
```

### 4.2 为什么需要 Design Token？

- **一致性**：全站使用同一套变量
- **可维护性**：改一个 token，全站生效
- **主题化**：通过替换 token 实现暗黑模式、品牌换肤
- **跨平台共享**：同一份 token 可以给 Web、iOS、Android 使用

## 五、Storybook 与组件文档化

### 5.1 什么是 Storybook？

Storybook 是一个用于独立开发、测试和文档化 UI 组件的工具。它让开发者可以在隔离环境中查看和交互组件。

### 5.2 Story 示例

```jsx
// Button.stories.jsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button
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

### 5.3 文档化价值

- 组件用法一目了然
- 设计、产品、开发可以统一参考
- 便于自动化测试和视觉回归测试

## 六、可访问性（a11y）

### 6.1 什么是可访问性？

可访问性（Accessibility，简称 a11y）指的是产品对所有用户的友好程度，包括视障、听障、行动不便的用户。

### 6.2 前端可访问性实践

- 为图片添加 `alt` 属性
- 使用语义化 HTML 标签
- 保证键盘可操作性
- 提供足够的颜色对比度
- 使用 ARIA 属性补充信息

```html
<button aria-label="关闭弹窗" onclick="closeModal()">×</button>
```

### 6.3 可访问性不是边缘需求

据统计，全球有超过 10 亿人存在某种形式的残障。可访问性不仅是道德责任，也可能是法律要求。

## 七、CSS 架构

### 7.1 BEM

BEM（Block Element Modifier）是一种 CSS 命名规范：

```css
.card { }
.card__title { }
.card__button { }
.card__button--primary { }
```

优点：命名清晰，避免样式冲突。

缺点：类名较长。

### 7.2 CSS Modules

CSS Modules 把 CSS 类名局部化，避免全局污染。

```css
/* Button.module.css */
.primary {
  background: blue;
  color: white;
}
```

```jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.primary}>Click</button>;
}
```

### 7.3 CSS-in-JS

CSS-in-JS 把样式写在 JS 中，便于动态样式和组件级作用域。

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
`;
```

### 7.4 原子化 CSS

原子化 CSS（如 Tailwind CSS）提供大量细粒度工具类，直接在 HTML 中组合使用。

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

优点：开发快、体积小、样式一致。

缺点：HTML 冗长，对设计能力要求高。

### 7.5 如何选择？

| 方案 | 适用场景 |
|------|----------|
| BEM | 传统项目、需要严格命名规范 |
| CSS Modules | React/Vue 组件化项目 |
| CSS-in-JS | 需要动态样式、主题化 |
| 原子化 CSS | 快速开发、设计体系成熟 |

## 八、组件库工程化

### 8.1 组件库的项目结构

```
ui-library/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   ├── styles/
│   └── index.ts
├── stories/
├── tests/
├── package.json
└── rollup.config.js
```

### 8.2 打包与发布

组件库通常需要输出多种格式：

- ESM：现代浏览器和构建工具
- CJS：Node 环境
- UMD：浏览器直接引入

```javascript
// rollup.config.js
export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.cjs', format: 'cjs' },
    { file: 'dist/index.esm.js', format: 'esm' }
  ],
  plugins: [typescript(), postcss()]
};
```

## 九、设计体系与业务的关系

设计体系不是设计的"紧箍咒"，而是业务的"加速器"。好的设计体系：

- 让设计师专注于创新和体验
- 让开发者专注于业务逻辑
- 让用户获得一致的体验

但设计体系也需要不断演进。业务在发展，新的组件和需求会不断出现。设计体系要有扩展机制，允许在规范基础上创新。

## 十、常见误区与最佳实践

### 误区一：设计体系就是组件库

组件库只是设计体系的一部分。设计体系还包括设计原则、设计 token、文档、工具、流程等。

### 误区二：一开始就追求大而全

设计体系应该从小处着手，先覆盖最常用的组件和规范，再逐步扩展。

### 误区三：忽视可访问性

可访问性应该在一开始就纳入设计体系的考量，而不是事后补救。

### 最佳实践

1. 建立 Design Token 作为设计决策的唯一来源
2. 使用原子化设计方法组织组件层级
3. 用 Storybook 文档化和测试组件
4. 组件库支持多格式输出
5. 定期收集业务反馈，迭代设计体系
6. 把可访问性作为组件验收标准

## 十一、总结

设计体系是前端工程化和产品体验之间的桥梁。通过组件库、原子化设计、Design Token、Storybook、可访问性和合理的 CSS 架构，我们可以构建出既美观一致又易于维护的产品。记住，设计体系不是束缚创造力，而是让团队把创造力用在更重要的地方。

## 十二、Design Token 的工程化实践

### 12.1 Token 的层级结构

Design Token 通常分为三个层级：

**Global Token（全局 Token）**：最基础的设计值，如 `#1890ff`、`16px`。

**Alias Token（别名 Token）**：把全局 Token 映射到语义化的名字，如 `color-brand-primary`。

**Component Token（组件 Token）**：针对具体组件的 Token，如 `button-primary-bg`。

```json
{
  "global": {
    "color": {
      "blue-500": "#1890ff"
    }
  },
  "alias": {
    "color": {
      "primary": "{global.color.blue-500}"
    }
  },
  "component": {
    "button": {
      "primary-bg": "{alias.color.primary}"
    }
  }
}
```

### 12.2 Token 的跨平台输出

Design Token 可以通过 Style Dictionary 等工具输出为不同平台的格式：

- Web：CSS Variables、SCSS、JS
- iOS：Swift
- Android：XML
- 小程序：JSON

### 12.3 Token 的命名规范

好的命名应该：

- 语义清晰
- 层级一致
- 便于搜索和替换

## 十三、组件库测试策略

### 13.1 单元测试

每个组件都应该有单元测试，验证不同 props 下的渲染结果。

```javascript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders primary button', () => {
  render(<Button type="primary">Click</Button>);
  expect(screen.getByText('Click')).toHaveClass('btn-primary');
});
```

### 13.2 视觉回归测试

使用 Storybook + Chromatic 或 Loki 进行视觉回归测试，防止 UI 意外变化。

### 13.3 可访问性测试

使用 `@storybook/addon-a11y` 或 axe-core 检测组件的可访问性问题。

## 十四、设计体系的治理与演进

### 14.1 版本管理

组件库应该遵循语义化版本规范（SemVer）：

- Major：不兼容变更
- Minor：新增功能
- Patch：修复问题

### 14.2  deprecation 策略

当需要移除某个 API 时，应该：

- 先标记为 deprecated
- 保留一个或多个版本的兼容
- 提供迁移指南

### 14.3 贡献流程

设计体系需要设计、产品、开发共同参与。建立清晰的贡献流程：

1. 提交设计提案
2. 评审设计决策
3. 开发组件
4. 编写文档和测试
5. 发布并通知使用方

## 十五、设计体系的常见误区

1. **追求一次完美**：设计体系是持续演进的，不可能一步到位
2. **忽视设计端**：只从技术角度做组件库，不与设计工具联动
3. **过度抽象**：为了抽象而抽象，导致组件难用
4. **缺少文档**：组件没有文档，使用者不知如何正确使用

## 十六、总结

设计体系是连接设计与开发的桥梁。通过组件库、原子化设计、Design Token、Storybook、可访问性和合理的 CSS 架构，团队可以构建出一致、高效、可持续维护的产品。设计体系不是终点，而是一个需要持续投入和演进的工程化实践。

## 十七、CSS 架构的演进

### 17.1 从全局 CSS 到模块化

早期前端使用全局 CSS，所有样式写在一个大文件里。随着项目变大，样式冲突、命名冲突、权重问题越来越严重。于是出现了 BEM、CSS Modules、CSS-in-JS、原子化 CSS 等解决方案。

### 17.2 BEM 的深入实践

BEM 的核心是块（Block）、元素（Element）、修饰符（Modifier）。

```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }

/* Modifier */
.card--large { }
.card__title--primary { }
```

BEM 适合大型项目，但类名较长。可以结合 SCSS/Less 的嵌套语法简化书写。

### 17.3 CSS Modules 与 TypeScript

CSS Modules 可以和 TypeScript 结合，通过 `*.module.css.d.ts` 文件提供类型支持。

### 17.4 CSS-in-JS 的性能考量

CSS-in-JS 在运行时生成样式，有一定性能开销。对于性能敏感场景，可以考虑静态提取方案。

### 17.5 Tailwind CSS 的工程化

Tailwind CSS 通过 JIT（Just-In-Time）引擎按需生成样式，避免产物体积过大。

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#1890ff'
      }
    }
  }
};
```

## 十八、组件库的版本策略

### 18.1 语义化版本

组件库应该严格遵循 SemVer：

- 破坏性变更升级 Major
- 新增功能升级 Minor
- 修复问题升级 Patch

### 18.2 迁移指南

每次 Major 升级都要提供详细的迁移指南，说明哪些 API 变了、如何修改。

## 十九、设计系统与业务组件的关系

### 19.1 基础组件 vs 业务组件

基础组件（如 Button、Input）属于设计体系。业务组件（如 UserCard、OrderList）通常放在业务仓库中。

### 19.2 业务组件的沉淀

当某个业务组件在多个业务中复用时，可以考虑提升到设计体系中。

## 二十、设计系统的度量

### 20.1 使用指标

- 组件被多少个页面使用
- 设计 Token 覆盖了多少样式
- 组件文档的访问量

### 20.2 用户满意度

定期收集设计师和开发者对设计体系的反馈，持续改进。

## 二十一、总结

设计体系是前端工程化中非常重要的一环。它让产品体验一致、开发效率提升、团队协作顺畅。通过组件库、原子化设计、Design Token、Storybook、CSS 架构和可访问性等实践，我们可以构建出强大而灵活的设计体系。记住，设计体系的核心是服务业务和团队，而不是为了规范而规范。

## 二十二、Storybook 的高级用法

### 22.1 Controls

Storybook 的 Controls 插件可以让用户在界面上动态调整组件 props。

```jsx
export const Primary = {
  args: {
    label: 'Button',
    primary: true,
    size: 'medium'
  }
};
```

### 22.2 Docs

Storybook Docs 可以自动生成组件文档，展示 props 说明和使用示例。

### 22.3 视觉回归测试

结合 Chromatic，每次提交都可以进行视觉回归测试，自动发现 UI 变化。

## 二十三、可访问性测试工具

### 23.1 axe-core

axe-core 是一个开源的可访问性测试引擎，可以集成到测试框架中。

```javascript
import { axe } from 'jest-axe';

const { container } = render(<Button />);
const results = await axe(container);
expect(results).toHaveNoViolations();
```

### 23.2 Lighthouse

Lighthouse 可以审计页面的可访问性得分，并提供改进建议。

## 二十四、设计系统的落地推广

### 24.1 获得团队认同

设计体系的成功离不开团队支持。要让设计师和开发者都参与进来，共同制定规范。

### 24.2 培训与文档

为团队提供培训，编写清晰的使用文档，降低上手门槛。

### 24.3 收集反馈

通过问卷、访谈、issue 等方式收集使用反馈，持续优化设计体系。

## 二十五、设计系统与品牌一致性

### 25.1 品牌 Token

把品牌色、品牌字体等抽象成 Design Token，确保所有产品一致传达品牌形象。

### 25.2 多品牌支持

通过替换 Token，同一套组件库可以支撑多个子品牌的产品。

## 二十六、设计系统的未来趋势

- 设计与代码的进一步融合
- AI 辅助生成组件和文档
- 更智能的可访问性检测
- 跨平台设计系统的统一

## 二十七、总结

设计体系是前端工程化中极具价值但常常被低估的领域。一个好的设计体系能够显著提升产品一致性、开发效率和团队协作质量。通过组件库、原子化设计、Design Token、Storybook、CSS 架构、可访问性等实践，我们可以构建出真正强大的设计体系，为业务增长提供坚实支撑。

---

> **领域编号**：E05 设计体系与组件库  
> **最后更新**：2026-06-18


---

## 本领域学习进度

<MarkComplete domainId="design-system" />
<ProgressTracker />
