# React 面试题

> 本题库共收录 **95** 道面试题（基础 23 / 进阶 25 / 深入 26 / 架构 21）。
> 本文件收录 React 相关面试题，目标题量 250 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、框架原理题、性能优化题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-15-CO-B-001：什么是 JSX？它和 HTML 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：JSX、React、模板语法、编译
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释什么是 JSX，并说明它与 HTML 的主要区别。

**参考答案**：

JSX（JavaScript XML）是 React 推荐的一种语法扩展，允许在 JavaScript 中编写类似 HTML 的结构。它本质上是一种语法糖，最终会被 Babel 等工具编译为 `React.createElement(type, props, ...children)` 调用，返回虚拟 DOM 对象。

与 HTML 的核心区别：

| 维度 | JSX | HTML |
|------|-----|------|
| 执行环境 | JavaScript 表达式，在 JS 上下文中执行 | 标记语言，由浏览器解析 |
| 属性命名 | 使用驼峰，如 `className`、`onClick`、`htmlFor` | 使用原生属性名，如 `class`、`onclick`、`for` |
| 表达式插值 | 用大括号 `{}` 嵌入任意 JS 表达式 | 不支持直接嵌入 JS |
| 自闭合标签 | 必须显式闭合，如 `<img />`、`<input />` | 某些标签可省略闭合，如 `<img>` |
| 注释 | `{/* 注释 */}` | `<!-- 注释 -->` |
| 根节点 | 可使用 `<>...</>` Fragment 或数组返回多个元素 | 必须是单个 DOM 树 |

最佳实践：
- JSX 中避免写复杂逻辑，尽量抽成变量或函数。
- 列表渲染必须提供稳定且唯一的 `key`。
- 布尔属性可简写，如 `<Button disabled />`。

**评分维度**：
- 能说明 JSX 是语法糖并会被编译（40%）
- 能列出 3 个以上与 HTML 的区别（40%）
- 能举例说明 className、表达式插值等（20%）

**常见错误**：
- 认为 JSX 就是 HTML，浏览器能直接识别。
- 在 JSX 中写 `class` 而不是 `className`。
- 忘记给列表元素加 `key`。

**延伸追问**：
- Babel 是如何把 JSX 编译成 `React.createElement` 的？
- 为什么 React 17 之后可以不再显式引入 React？

**相关题目**：
- [FB-15-CO-B-002 React 组件是什么](#FB-15-CO-B-002)
- [FB-15-CO-B-002 React 函数组件与类组件](#FB-15-CO-B-002)

**参考资源**：
- [React 官方文档 - JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Babel JSX Transform](https://babeljs.io/docs/babel-plugin-transform-react-jsx)

**口头回答版**：
> JSX 就是一种“长得像 HTML 的 JavaScript 语法糖”。我们写 ``<div className="app">`{title}`</div>``，Babel 会把它编译成 `React.createElement('div', { className: 'app' }, title)`，得到的是一个 JavaScript 对象，也就是虚拟 DOM。它和 HTML 最大的区别是：属性用驼峰命名，比如 `className`、`onClick`；表达式要写在花括号里；标签必须闭合。浏览器不认识 JSX，必须经过构建工具转换。

---

### FB-15-CO-B-002：React 组件是什么？函数组件和类组件有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、函数组件、类组件、组件化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 React 组件的概念，并对比函数组件与类组件的区别。

**参考答案**：

React 组件是 UI 的独立、可复用单元，接收输入（props）并返回描述界面的 JSX。组件可以组合、嵌套，形成完整的应用界面。

函数组件与类组件对比：

| 维度 | 函数组件 | 类组件 |
|------|---------|--------|
| 写法 | 普通 JS 函数 | ES6 class 继承 `React.Component` |
| 状态 | 使用 Hooks，如 `useState` | 使用 `this.state` / `this.setState` |
| 生命周期 | 使用 Hooks，如 `useEffect` | 使用 `componentDidMount` 等生命周期方法 |
| this | 无 `this` 问题 | 需要绑定 `this` 或使用箭头函数 |
| 性能 | 通常更轻量 | 相对较重 |
| 新特性 | 支持 Hooks、Server Components、Suspense 等新特性 | 不支持 Server Components 等部分新特性 |

现代 React 推荐使用函数组件，类组件目前仍被支持但不再新增特性。

**评分维度**：
- 能说明组件是 UI 的独立可复用单元（30%）
- 能从写法、状态、生命周期、this 等维度对比两者（50%）
- 能指出现代 React 推荐函数组件（20%）

**常见错误**：
- 认为类组件性能一定优于函数组件。
- 认为函数组件不能使用状态（忽略了 Hooks）。
- 混淆 props 和 state 的使用场景。

**延伸追问**：
- 类组件的 `this.setState` 为什么是异步的？
- 函数组件如何模拟 `componentWillUnmount`？

**相关题目**：
- [FB-15-CO-B-003 props 和 state 的区别](#FB-15-CO-B-003)
- [FB-15-CO-B-006 React 生命周期](#FB-15-CO-B-006)

**参考资源**：
- [React 官方文档 - 组件](https://react.dev/learn/thinking-in-react)
- [React 官方文档 - State 和生命周期](https://react.dev/learn/state-a-components-memory)

**口头回答版**：
> React 组件就是把页面拆成一个个独立、可复用的小模块，每个组件接收 props，返回 JSX 描述它长什么样。现在主流是函数组件，配合 Hooks 来管理状态和副作用；类组件通过 `this.state` 和生命周期方法来管理，但现在已经不推荐新项目使用了。函数组件没有 `this` 烦恼，也更轻量。

---

### FB-15-CO-B-003：props 和 state 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、props、state、数据流
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 React 中 props 和 state 的区别，以及它们各自的使用场景。

**参考答案**：

- **props**：
  - 父组件传递给子组件的数据。
  - 只读，子组件不能修改自己的 props。
  - 用于组件间通信，体现单向数据流。

- **state**：
  - 组件内部管理的数据。
  - 可读可写，通过 `setState`（类组件）或 setter（Hooks）更新。
  - 更新会触发组件重新渲染。

对比：

| 维度 | props | state |
|------|-------|-------|
| 来源 | 父组件传入 | 组件内部初始化 |
| 可变性 | 只读 | 可通过 API 修改 |
| 更新效果 | 不直接触发自身重新渲染（由父组件决定） | 触发组件重新渲染 |
| 使用场景 | 组件配置、父子通信 | 组件内部交互状态 |

最佳实践：
- 尽量保持 props 简单、稳定。
- state 尽量放在离使用它最近的公共父组件（提升状态）。
- 不要直接修改 state，应使用不可变更新。

**评分维度**：
- 能准确区分 props 和 state 的来源与可变性（50%）
- 能说明数据流方向（30%）
- 能举例说明使用场景（20%）

**常见错误**：
- 子组件直接修改 props。
- 认为 props 变化不会导致子组件重新渲染。
- state 直接赋值而非调用 setter。

**延伸追问**：
- 子组件如何向父组件传递数据？
- 什么时候应该把 state 提升到父组件？

**相关题目**：
- [FB-15-CO-B-004 React 单向数据流](#FB-15-CO-B-004)
- [FB-15-CO-B-012 Context API](#FB-15-CO-B-012)

**参考资源**：
- [React 官方文档 - Props](https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state)
- [React 官方文档 - State](https://react.dev/learn/state-a-components-memory)

**口头回答版**：
> props 是父组件传给子组件的数据，子组件只能读不能改；state 是组件自己管理的数据，改了就会重新渲染。简单说：props 是外来的配置，state 是内部的记忆。React 推荐数据单向流动，子组件想改父组件的数据，要通过父组件传下来的回调函数。

---

### FB-15-CO-B-004：什么是 React 的单向数据流？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、单向数据流、数据驱动、组件通信
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 React 中的单向数据流，并说明它带来的优势和常见实现方式。

**参考答案**：

React 的单向数据流指数据只能从父组件通过 props 流向子组件，子组件不能直接修改父组件的数据。如果子组件需要影响父组件，必须通过父组件传递的回调函数，由父组件自身来修改状态。

优势：
- **可预测性**：数据来源清晰，便于追踪状态变化。
- **可调试性**：状态变化路径明确，错误定位更快。
- **组件解耦**：子组件不依赖父组件内部状态，复用性更高。

常见实现：
- 父组件通过 props 向子组件传递数据和回调。
- 状态提升（Lifting State Up）：把共享状态放到最近的公共父组件。
- 使用 Context 或状态管理库在跨层级组件间传递数据。

**评分维度**：
- 能解释单向数据流的含义（40%）
- 能说明至少 2 个优势（30%）
- 能举例说明父子通信和状态提升（30%）

**常见错误**：
- 把单向数据流理解为 props 不能变化（props 变化会触发子组件更新）。
- 认为单向数据流导致代码冗余，忽略状态提升和 Context 的用法。

**延伸追问**：
- 双向绑定和单向数据流各有什么适用场景？
- Redux 如何保持单向数据流？

**相关题目**：
- [FB-15-CO-B-003 props 和 state 的区别](#FB-15-CO-B-003)
- [FB-15-CO-A-009 useState 批量更新](#FB-15-CO-A-009)

**参考资源**：
- [React 官方文档 - State 提升](https://react.dev/learn/sharing-state-between-components)

**口头回答版**：
> 单向数据流就是数据只能从父组件往下传给子组件，子组件不能反过来直接改父组件的数据。要改的话，父组件得传一个回调函数下来，子组件调用这个函数，由父组件去改。这样数据流向很清晰，出了问题容易追踪，组件也更容易复用。

---

### FB-15-CA-B-005：下面代码点击按钮后 count 的值是多少？为什么？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、useState、闭包、批量更新
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>+3</button>
    </div>
  );
}
```

点击一次按钮后，`count` 会变成多少？为什么？

**参考答案**：

点击一次按钮后，`count` 只会从 0 变成 1，而不是 3。

原因：

1. `useState` 的 setter 在事件处理函数中会被 React 批量更新（batching）。
2. 三次 `setCount(count + 1)` 都基于同一个闭包中的 `count` 值（即 0）。
3. 因此三次更新都被计算为 `setCount(1)`，最终只生效一次。

如果要实现 +3，应使用函数式更新：

```jsx
const handleClick = () => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
};
```

函数式更新会基于最新的 state 进行计算，因此结果是 3。

**评分维度**：
- 正确判断最终 count 为 1（30%）
- 能解释闭包和批量更新机制（40%）
- 能给出函数式更新方案（30%）

**常见错误**：
- 认为三次 setCount 会顺序执行并累加为 3。
- 直接说 setState 是异步的，但没有解释清楚批量更新和闭包。
- 在类组件和函数组件之间混淆 `this.setState` 的合并行为。

**延伸追问**：
- React 18 的自动批量更新和 React 17 有什么区别？
- 在什么情况下 setState 不会批量更新？

**相关题目**：
- [FB-15-CO-A-009 useState 批量更新](#FB-15-CO-A-009)
- [FB-15-CO-P-019 setState 异步与批量更新](#FB-15-CO-P-019)

**参考资源**：
- [React 官方文档 - Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React 18 Automatic Batching](https://react.dev/blog/2022/03-29-react-v18#new-feature-automatic-batching)

**口头回答版**：
> 点击之后 count 是 1，不是 3。因为这三个 setCount 都是在同一个事件处理函数里，React 会把它们批量处理；而且它们都读取的是同一个闭包里的 count，当时 count 是 0，所以三次都是 setCount(1)。要想加 3，得用函数式更新 `setCount(c => c + 1)`，这样每次都能拿到最新的值。

---

### FB-15-CO-B-006：React 组件的生命周期有哪些？函数组件中如何模拟？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、生命周期、useEffect、类组件
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请简述 React 类组件的生命周期，并说明函数组件中如何使用 Hooks 模拟这些生命周期。

**参考答案**：

类组件生命周期主要分为三个阶段：

1. **挂载阶段（Mounting）**：
   - `constructor()`：初始化 state 和绑定事件。
   - `static getDerivedStateFromProps()`：根据 props 派生 state（极少使用）。
   - `render()`：返回 JSX。
   - `componentDidMount()`：组件挂载到 DOM 后执行，适合发起请求、订阅。

2. **更新阶段（Updating）**：
   - `static getDerivedStateFromProps()`
   - `shouldComponentUpdate()`：控制是否重新渲染，性能优化。
   - `render()`
   - `getSnapshotBeforeUpdate()`：在 DOM 更新前获取快照。
   - `componentDidUpdate()`：组件更新后执行。

3. **卸载阶段（Unmounting）**：
   - `componentWillUnmount()`：组件卸载前执行，适合清理订阅、定时器。

函数组件中使用 `useEffect` 模拟：

| 生命周期 | 函数组件写法 |
|----------|-------------|
| componentDidMount | `useEffect(() => { ... }, [])` |
| componentDidUpdate | `useEffect(() => { ... }, [deps])` |
| componentWillUnmount | `useEffect(() => { return () => { ... }; }, [])` |

注意：`useEffect` 不是生命周期的直接等价物，而是基于副作用的语义化抽象。

**评分维度**：
- 能列出主要生命周期方法（40%）
- 能说明每个阶段适合做什么（30%）
- 能用 useEffect 正确映射生命周期（30%）

**常见错误**：
- 认为 `useEffect(fn, [])` 完全等价于 `componentDidMount`。
- 在 `useEffect` 中忘记清理副作用，导致内存泄漏。
- 把 `useLayoutEffect` 和 `useEffect` 混用。

**延伸追问**：
- `useEffect` 和 `useLayoutEffect` 有什么区别？
- 为什么 React 不推荐在 `componentWillUnmount` 之外做清理？

**相关题目**：
- [FB-15-CO-A-007 useEffect 依赖数组](#FB-15-CO-A-007)
- [FB-15-CO-P-020 React 18 useInsertionEffect](#FB-15-CO-P-020)

**参考资源**：
- [React 官方文档 - 生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [React 官方文档 - useEffect](https://react.dev/reference/react/useEffect)

**口头回答版**：
> 类组件生命周期分三个阶段：挂载时 constructor、render、componentDidMount；更新时有 render、componentDidUpdate；卸载时有 componentWillUnmount。函数组件用 useEffect 来模拟：空依赖数组相当于 componentDidMount，带依赖数组相当于 componentDidUpdate，return 的清理函数相当于 componentWillUnmount。不过要注意，useEffect 不是完全等价，它是按副作用来组织的。

---

### FB-15-CO-B-007：React 中的 key 有什么作用？为什么列表渲染不建议用 index？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、key、diff、列表渲染
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 React 中 `key` 的作用，并说明为什么在列表渲染中不建议使用数组 `index` 作为 key。

**参考答案**：

`key` 是 React 在 diff 算法中用来识别列表中每个元素的唯一标识。它的作用是帮助 React 判断哪些元素是新增、删除、移动或复用，从而高效更新 DOM。

不建议使用 `index` 作为 key 的原因：

1. **无法稳定标识元素**：当列表顺序变化（排序、插入、删除）时，元素的 index 会改变，导致 React 认为同一位置的元素发生了变化。
2. **破坏组件状态**：如果列表项是有状态的组件，错误的 key 会让状态错位，出现“状态复用”到错误项上。
3. **性能下降**：React 可能做不必要的 DOM 操作，而不是最小化更新。

适合作为 key 的数据：
- 数据中稳定的唯一 ID，如数据库主键、UUID。
- 如果数据没有 ID，且列表不会增删改顺序，短期可用 index，但不推荐。

示例：

```jsx
// 推荐
{list.map(item => <TodoItem key={item.id} {...item} />)}

// 不推荐
{list.map((item, index) => <TodoItem key={index} {...item} />)}
```

**评分维度**：
- 能说明 key 帮助 React 识别元素（40%）
- 能解释 index 作为 key 在顺序变化时的问题（40%）
- 能给出使用稳定 ID 的建议（20%）

**常见错误**：
- 认为 key 只是为了消除控制台警告。
- 使用随机数或 `Math.random()` 作为 key。
- 在列表项内部使用 key 来读取状态。

**延伸追问**：
- key 能作为 props 在子组件中获取吗？
- 如果两个同级列表项 key 相同会发生什么？

**相关题目**：
- [FB-15-CO-P-020 React Diff 算法](#FB-15-CO-P-020)
- [FB-15-CO-A-010 useMemo 与 useCallback](#FB-15-CO-A-010)

**参考资源**：
- [React 官方文档 - Rendering Lists](https://react.dev/learn/rendering-lists)
- [React 官方文档 - Why does React need keys?](https://react.dev/learn/rendering-lists#why-does-react-need-keys)

**口头回答版**：
> key 是 React 用来识别列表里每个元素身份的。列表更新时，React 靠 key 判断谁新增、谁删除、谁移动。如果用数组 index 当 key，一旦排序、插入、删除，index 就变了，React 会误判，可能导致状态错位、性能变差。所以最好用数据里稳定的 id，比如数据库主键。

---

### FB-15-CO-B-008：受控组件和非受控组件有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、受控组件、非受控组件、表单
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 React 中受控组件和非受控组件的区别，并说明各自的适用场景。

**参考答案**：

| 维度 | 受控组件 | 非受控组件 |
|------|---------|-----------|
| 数据来源 | React state | DOM 自身 |
| 值更新方式 | 通过 `onChange` 事件更新 state | 通过 ref 读取 DOM 值 |
| 实时校验 | 容易实现 | 需要手动获取值后校验 |
| 可预测性 | 高，UI 完全由 state 驱动 | 相对较低 |
| 典型实现 | `<input value={value} onChange={...} />` | `<input ref={inputRef} defaultValue={...} />` |

受控组件示例：

```jsx
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />
```

非受控组件示例：

```jsx
const inputRef = useRef(null);
<input ref={inputRef} defaultValue="hello" />
// 读取：inputRef.current.value
```

适用场景：
- **受控组件**：表单校验、动态联动、即时反馈、大多数表单场景。
- **非受控组件**：简单表单、文件上传、集成非 React 组件、需要读取 DOM 的场景。

最佳实践：
- 优先使用受控组件，数据流更清晰。
- 非受控组件使用 `defaultValue` / `defaultChecked` 设置初始值，而不是 `value`。

**评分维度**：
- 能区分受控和非受控的数据来源（40%）
- 能写出两种组件的代码示例（30%）
- 能说明适用场景（30%）

**常见错误**：
- 在非受控组件中同时使用 `value` 和 `ref`，导致状态混乱。
- 认为非受控组件完全不能用。
- 在受控组件中不处理 `onChange`，导致输入框无法输入。

**延伸追问**：
- 文件输入框为什么只能是非受控的？
- React Hook Form 是如何在性能上优化非受控表单的？

**相关题目**：
- [FB-15-CO-A-013 Refs 与 forwardRef](#FB-15-CO-A-013)
- [FB-15-CO-A-016 React 表单处理](#FB-15-CO-A-016)

**参考资源**：
- [React 官方文档 - Controlled Components](https://react.dev/learn/thinking-in-react#step-5-add-inverse-data-flow)
- [React 官方文档 - Uncontrolled Components](https://react.dev/learn/manipulating-the-dom-with-refs)

**口头回答版**：
> 受控组件就是表单值由 React 的 state 管理，输入框的 value 绑定 state，onChange 去更新 state；非受控组件则是由 DOM 自己保存值，我们用 ref 去取。受控组件适合做校验、联动和实时反馈，非受控组件适合简单表单或者文件上传这种不好完全控制的场景。一般优先用受控。


---

## 进阶题（9 道）{#advanced}

### FB-15-CO-A-009：useEffect 的依赖数组应该怎么写？清理函数什么时候执行？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、useEffect、副作用、依赖数组、清理函数
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请详细说明 `useEffect` 依赖数组的作用、常见写法，以及清理函数（cleanup）的执行时机。并说明 `useEffect` 和 `useLayoutEffect` 的区别。

**参考答案**：

`useEffect` 用于在函数组件中执行副作用。它的执行时机由依赖数组决定：

| 写法 | 执行时机 |
|------|---------|
| `useEffect(fn)` | 每次渲染后都执行 |
| `useEffect(fn, [])` | 只在挂载后执行一次 |
| `useEffect(fn, [a, b])` | 挂载后执行，以及依赖变化后执行 |

清理函数：

- 在组件卸载时执行。
- 在依赖变化导致 effect 重新执行前，先执行上一次 effect 的清理函数。

示例：

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);

  return () => {
    clearInterval(timer); // 清理函数
  };
}, []);
```

依赖数组的最佳实践：
- 依赖必须包含 effect 中使用到的所有响应式值（props、state、函数、refs 等）。
- 使用 ESLint 插件 `eslint-plugin-react-hooks` 自动检查依赖。
- 如果依赖频繁变化导致 effect 反复执行，考虑使用 `useMemo` / `useCallback` 或调整逻辑。

`useEffect` vs `useLayoutEffect`：

| 维度 | useEffect | useLayoutEffect |
|------|-----------|-----------------|
| 执行时机 | 浏览器绘制之后异步执行 | 浏览器绘制之前同步执行 |
| 阻塞渲染 | 否 | 是，会阻塞首屏绘制 |
| 使用场景 | 大多数副作用，如数据请求、订阅 | 需要同步测量 DOM 并立即调整布局 |
| SSR 兼容性 | 服务端可安全使用 | 服务端无法执行，可能触发警告 |

**评分维度**：
- 能准确说明三种依赖写法的区别（30%）
- 能解释清理函数执行时机（30%）
- 能对比 useEffect 和 useLayoutEffect（30%）
- 能提到 ESLint 依赖检查（10%）

**常见错误**：
- 依赖数组遗漏响应式值，导致闭包问题。
- 在 useEffect 中直接使用 async 函数作为回调（应内部定义 async 函数）。
- 滥用 useLayoutEffect 处理普通副作用，影响性能。

**延伸追问**：
- 为什么 useEffect 不能直接用 async 函数？
- 如何在 useEffect 中正确发起数据请求并避免竞态？

**相关题目**：
- [FB-15-CO-B-006 React 生命周期](#FB-15-CO-B-006)
- [FB-15-CO-P-021 Concurrent 特性与 Suspense](#FB-15-CO-P-021)

**参考资源**：
- [React 官方文档 - useEffect](https://react.dev/reference/react/useEffect)
- [React 官方文档 - useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)

**口头回答版**：
> useEffect 的依赖数组决定它什么时候执行：不传数组每次渲染后都执行；传空数组只在组件挂载后执行；传了依赖数组，挂载和依赖变化时都会执行。return 的清理函数会在组件卸载时执行，也会在依赖变化、新的 effect 运行之前先清理上一次的。useLayoutEffect 和 useEffect 的区别在于时机：useLayoutEffect 在浏览器绘制前同步执行，会阻塞渲染，适合要立刻调整 DOM 布局的场景；普通副作用用 useEffect 就够了。

---

### FB-15-CO-A-010：useMemo 和 useCallback 有什么区别？什么时候应该使用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、useMemo、useCallback、性能优化、缓存
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 `useMemo` 和 `useCallback` 的作用、区别，以及使用时机。滥用它们会带来什么问题？

**参考答案**：

- `useMemo`：缓存**值**（value）的计算结果，避免在每次渲染时重复执行昂贵的计算。
- `useCallback`：缓存**函数**（function）引用，避免子组件因函数引用变化而不必要地重新渲染。

两者内部都使用记忆化（memoization）技术，依赖数组变化时才会重新计算。

示例：

```jsx
// useMemo：缓存计算结果
const expensiveValue = useMemo(() => {
  return data.filter(item => item.active).sort(...);
}, [data]);

// useCallback：缓存函数引用
const handleSubmit = useCallback((values) => {
  api.submit(values);
}, []);
```

使用时机：
- 计算成本较高且依赖稳定时使用 `useMemo`。
- 将函数传递给经过 `React.memo` 优化的子组件时使用 `useCallback`。
- 依赖数组中引用类型稳定时才有意义。

滥用的代价：
- 增加代码复杂度。
- 记忆化本身也有开销（依赖比较、缓存存储）。
- 可能掩盖真正的性能问题，如不必要的渲染层级。

**评分维度**：
- 能区分 useMemo 缓存值、useCallback 缓存函数（40%）
- 能说明使用场景（30%）
- 能指出滥用带来的问题（30%）

**常见错误**：
- 所有函数都包 useCallback，不管子组件是否优化。
- 在 useMemo 内部执行有副作用的操作。
- 依赖数组写错导致缓存失效或闭包问题。

**延伸追问**：
- useCallback 和直接定义函数在性能上有什么差异？
- useMemo 能否完全替代 useEffect？为什么？

**相关题目**：
- [FB-15-CO-A-011 React.memo](#FB-15-CO-A-011)
- [FB-15-CO-R-028 React 性能优化策略](#FB-15-CO-R-028)

**参考资源**：
- [React 官方文档 - useMemo](https://react.dev/reference/react/useMemo)
- [React 官方文档 - useCallback](https://react.dev/reference/react/useCallback)
- [Before you memo](https://react.dev/blog/2021/12/17/react-conf-2021-recap)

**口头回答版**：
> useMemo 用来缓存一个计算出来的值，比如复杂的过滤排序结果；useCallback 用来缓存函数的引用，避免子组件因为函数变了而重新渲染。它们都依赖数组，依赖没变就不会重新创建。什么时候用呢？计算很贵或者要传给 React.memo 子组件的函数才用。不要滥用，因为缓存本身也有开销，而且会让代码变复杂。

---

### FB-15-CO-A-011：React.memo 是什么？什么时候使用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、React.memo、性能优化、浅比较
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `React.memo` 的作用、比较逻辑，并说明它与 `PureComponent` 的区别。

**参考答案**：

`React.memo` 是一个高阶组件，用于对函数组件进行浅比较（shallow comparison）。如果 props 没有变化，则跳过该组件的重新渲染，从而优化性能。

基本用法：

```jsx
const MemoizedComponent = React.memo(MyComponent);
```

也可以传入自定义比较函数：

```jsx
React.memo(MyComponent, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // 返回 true 表示不重新渲染
});
```

与 `PureComponent` 的区别：

| 维度 | React.memo | PureComponent |
|------|-----------|---------------|
| 适用组件 | 函数组件 | 类组件 |
| 比较对象 | props | props 和 state |
| 比较方式 | 默认浅比较 | 默认浅比较 |
| 自定义比较 | 支持第二个参数 | 可通过 shouldComponentUpdate 实现 |

注意事项：
- 仅适用于 props 变化频率高但渲染结果不变的组件。
- 如果组件内部使用了 context 或 state，React.memo 不影响其重新渲染。
- 传入的 props 中包含函数、对象、数组时，需配合 `useCallback` / `useMemo` 保持引用稳定。

**评分维度**：
- 能说明 React.memo 是函数组件的浅比较优化（40%）
- 能对比 PureComponent（30%）
- 能指出配合 useCallback / useMemo 使用的场景（30%）

**常见错误**：
- 对所有组件都使用 React.memo。
- 使用了 React.memo 但 props 中传了内联函数或对象，导致比较失效。
- 认为 React.memo 会阻止 state 变化引起的重新渲染。

**延伸追问**：
- 为什么浅比较对于嵌套对象会失效？
- 自定义比较函数返回 true 和 false 分别代表什么？

**相关题目**：
- [FB-15-CO-A-010 useMemo 和 useCallback](#FB-15-CO-A-010)
- [FB-15-CO-R-028 React 性能优化策略](#FB-15-CO-R-028)

**参考资源**：
- [React 官方文档 - React.memo](https://react.dev/reference/react/memo)
- [React 官方文档 - PureComponent](https://react.dev/reference/react/PureComponent)

**口头回答版**：
> React.memo 是给函数组件做性能优化的，它会浅比较 props，如果 props 没变就不重新渲染。类组件里对应的是 PureComponent。用法很简单，把组件包一层 `React.memo(MyComponent)` 就行。但要注意，如果 props 里传的是每次新创建的函数或对象，浅比较会失效，所以通常要和 useCallback、useMemo 一起用。

---

### FB-15-CO-A-012：Context API 解决了什么问题？有什么性能陷阱？

**题型**：概念题 / 场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、Context、跨层级通信、性能优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React Context API 的适用场景，并分析它可能带来的性能问题及解决方案。

**参考答案**：

Context API 用于在组件树中跨层级传递数据，避免通过 props 一层层手动传递（prop drilling）。

适用场景：
- 主题、语言、用户登录状态等全局数据。
- 路由、权限等需要被多个层级访问的数据。
- 组件库中需要共享的配置。

基本用法：

```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}
```

性能陷阱：

1. **频繁变化导致大范围重渲染**：
   Context value 变化时，所有消费该 Context 的组件都会重新渲染，即使它们只用到 value 中不相关的部分。

2. **不稳定的 value 引用**：
   如果 value 是每次渲染新创建的对象或数组，会触发不必要的更新。

解决方案：

- **拆分 Context**：把高频变化和低频变化的 Context 分开。
- **useMemo 稳定 value**：
  ```jsx
  const value = useMemo(() => ({ user, theme }), [user, theme]);
  ```
- **Selector 模式**：使用 `use-context-selector` 等库，只订阅需要的部分状态。
- **状态管理库**：对于复杂全局状态，使用 Zustand、Jotai、Redux 等。

**评分维度**：
- 能说明 Context 解决 prop drilling 问题（30%）
- 能分析 value 变化导致全部消费者重渲染的性能问题（40%）
- 能给出拆分 Context、useMemo、selector 等解决方案（30%）

**常见错误**：
- 把所有全局状态都塞进一个 Context。
- 把频繁变化的状态和不常变化的状态放在同一个 Context。
- 认为 Context 可以替代 Redux 等状态管理库。

**延伸追问**：
- Context 和 Redux 有什么本质区别？
- 如何实现 Context 的按需订阅？

**相关题目**：
- [FB-15-CO-B-004 React 单向数据流](#FB-15-CO-B-004)
- [FB-15-CO-R-027 状态管理库选型](#FB-15-CO-R-027)

**参考资源**：
- [React 官方文档 - Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React 官方文档 - useContext](https://react.dev/reference/react/useContext)

**口头回答版**：
> Context API 主要解决跨层级传数据的问题，不用每层都手动传 props，比如主题、语言、用户信息。它的性能陷阱是：Context 的 value 一变，所有用了这个 Context 的组件都会重新渲染，哪怕它们只用到里面的一小部分。解决办法可以拆成多个 Context、用 useMemo 稳定 value，或者上 selector 库、状态管理库来按需订阅。

---

### FB-15-CO-A-013：Refs 在 React 中有什么作用？forwardRef 和 useImperativeHandle 怎么用？

**题型**：概念题 / 手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、ref、forwardRef、useImperativeHandle、DOM
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React 中 ref 的作用，并解释 `forwardRef` 和 `useImperativeHandle` 的使用场景和用法。

**参考答案**：

ref 用于访问 DOM 节点或在组件中保存不触发渲染的可变值。

常见用途：
- 聚焦输入框、测量 DOM 尺寸、触发动画。
- 保存定时器 ID、上一轮 state 等不需要渲染的值。
- 集成非 React 的 DOM 操作库。

`useRef` 基础用法：

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();
```

`forwardRef`：

当需要把 ref 从父组件透传到子组件内部的 DOM 元素时，使用 `forwardRef`：

```jsx
const FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} className="fancy" />;
});

// 父组件
const parentRef = useRef(null);
<FancyInput ref={parentRef} />
```

`useImperativeHandle`：

用于自定义暴露给父组件的实例值，而不是直接暴露整个 DOM 节点：

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => inputRef.current.value = '',
  }));

  return <input ref={inputRef} />;
});
```

最佳实践：
- 优先通过 props 和 state 通信，ref 是 escape hatch。
- 不要滥用 ref 保存应该由 state 管理的数据。

**评分维度**：
- 能说明 ref 访问 DOM 和保存可变值的作用（30%）
- 能正确使用 forwardRef 透传 ref（30%）
- 能用 useImperativeHandle 自定义暴露 API（30%）
- 能指出 ref 不应替代 state（10%）

**常见错误**：
- 在 render 阶段读取或修改 ref.current。
- 把 ref 作为 prop 传递时忘记 forwardRef。
- useImperativeHandle 暴露过多内部实现。

**延伸追问**：
- ref 和 state 有什么本质区别？
- 回调 ref 和 useRef 有什么区别？

**相关题目**：
- [FB-15-CO-B-008 受控组件和非受控组件](#FB-15-CO-B-008)
- [FB-15-CO-P-022 React 18 useId、useSyncExternalStore、useInsertionEffect](#FB-15-CO-P-022)

**参考资源**：
- [React 官方文档 - useRef](https://react.dev/reference/react/useRef)
- [React 官方文档 - forwardRef](https://react.dev/reference/react/forwardRef)
- [React 官方文档 - useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)

**口头回答版**：
> ref 主要用来直接访问 DOM 节点，或者保存一些不会触发渲染的可变值，比如定时器。forwardRef 是把 ref 从父组件传到子组件内部的 DOM 上。useImperativeHandle 则更进一步，可以自定义父组件通过 ref 能调用哪些方法，比如只暴露 focus、clear，而不是把整个 input 节点都交出去。ref 是 escape hatch，不要用来替代 state。

---

### FB-15-CD-A-014：如何封装一个 Custom Hook？请写一个 useWindowSize 的示例。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、Custom Hook、useEffect、复用
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明 React 中 Custom Hook 的设计原则，并手写一个 `useWindowSize` Hook，返回当前窗口的宽度和高度。

**参考答案**：

Custom Hook 是提取组件间可复用状态逻辑的函数，命名必须以 `use` 开头，内部可以调用其他 Hooks。

设计原则：
- **单一职责**：一个 Hook 只做一件事。
- **可组合**：多个 Hooks 可以组合使用。
- **透明**：调用方清楚 Hook 的输入和输出。
- **避免滥用**：不要把所有逻辑都塞进 Hook，保持合理粒度。

`useWindowSize` 实现：

```jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
```

使用：

```jsx
function App() {
  const { width, height } = useWindowSize();
  return <div>窗口尺寸：{width} x {height}</div>;
}
```

进阶考虑（SSR 安全）：

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // ...
  }, []);

  return size;
}
```

**评分维度**：
- 能说明 Custom Hook 是复用状态逻辑（20%）
- 实现 useState + useEffect 监听 resize（40%）
- 有清理函数，避免内存泄漏（20%）
- 提到 SSR 安全和默认值（20%）

**常见错误**：
- Custom Hook 内部没有使用任何 React Hook。
- 没有清理事件监听，导致内存泄漏。
- 在 SSR 环境下直接访问 window 报错。

**延伸追问**：
- 如何让 useWindowSize 支持防抖？
- Custom Hook 之间可以互相调用吗？有什么限制？

**相关题目**：
- [FB-15-CO-A-009 useEffect 依赖数组](#FB-15-CO-A-009)
- [FB-15-CO-P-023 Suspense 数据获取](#FB-15-CO-P-023)

**参考资源**：
- [React 官方文档 - Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React 官方文档 - Rules of Hooks](https://react.dev/reference/rules)

**口头回答版**：
> Custom Hook 就是把组件里可复用的状态逻辑抽成一个以 use 开头的函数，里面可以调用其他 Hook。比如 useWindowSize，用 useState 保存宽高，useEffect 监听 window resize，resize 时更新 size，卸载时移除监听。要注意 SSR 环境下 window 可能不存在，要做兼容。

---

### FB-15-CO-A-015：React Router v6 有哪些核心变化？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、React Router、路由、SPA
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 React Router v5 和 v6 的核心变化，并说明 `BrowserRouter`、`Routes`、`Route`、`useNavigate` 的用法。

**参考答案**：

React Router v6 相比 v5 的主要变化：

| 特性 | v5 | v6 |
|------|-----|-----|
| 路由声明 | `<Switch>` + `<Route component={}/>` | `<Routes>` + `<Route element={}/>` |
| 嵌套路由 | 需要手动拼接 path | 支持 `<Route>` 嵌套，子路由自动拼接父 path |
| 重定向 | `<Redirect />` | `<Navigate replace />` |
| 编程导航 | `useHistory()` | `useNavigate()` |
| 路由参数 | `useParams()` 相同 | 相同，但 v6 更强调相对路由 |
| 优先级 | 按 Route 顺序匹配 | 自动按最佳匹配 |
| Hooks 规则 | 可在 Route 内使用 | Route 本身不是组件，element 内才能用 Hooks |

基本用法：

```jsx
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function LoginButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/dashboard')}>登录</button>;
}
```

嵌套路由：

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
// Dashboard 内需渲染 <Outlet />
```

**评分维度**：
- 能列出 v5 到 v6 的 3 个以上核心变化（40%）
- 能写出 Routes / Route / useNavigate 的基本用法（40%）
- 能说明嵌套路由和 Outlet（20%）

**常见错误**：
- 在 v6 中仍然使用 `<Switch>` 或 `<Redirect>`。
- 在 `<Route>` 上直接使用 props 而不是 element。
- 混淆 `useHistory` 和 `useNavigate`。

**延伸追问**：
- 如何在 v6 中实现路由守卫？
- Data Router（createBrowserRouter）相比传统 Router 有什么优势？

**相关题目**：
- [FB-15-CO-P-024 Next.js 与 SSR](#FB-15-CO-P-024)
- [FB-15-CO-R-029 微前端与 React](#FB-15-CO-R-029)

**参考资源**：
- [React Router v6 官方文档](https://reactrouter.com/en/main)
- [React Router v6 升级指南](https://reactrouter.com/en/main/upgrading/v5)

**口头回答版**：
> React Router v6 最大的变化是用 Routes 替代了 Switch，Route 的渲染方式从 component 改成 element；编程导航从 useHistory 变成 useNavigate；重定向用 Navigate 组件。v6 支持嵌套路由，子路由会自动拼到父路由 path 上，父组件里用 Outlet 渲染子路由。Data Router 还引入了 loader、action，更适合做数据驱动的路由。

---

### FB-15-CO-A-016：React 中如何处理表单？React Hook Form 的优势是什么？

**题型**：概念题 / 场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、表单、受控组件、React Hook Form、非受控组件
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React 中常见的表单处理方式，并分析 React Hook Form 相比传统受控表单方案的优势。

**参考答案**：

React 中处理表单主要有三种方式：

1. **受控组件**：
   - 表单值由 state 管理，实时同步。
   - 优点：数据可控，易于校验和联动。
   - 缺点：每次输入都触发渲染，复杂表单性能差。

2. **非受控组件**：
   - 表单值由 DOM 自身管理，通过 ref 读取。
   - 优点：实现简单，渲染次数少。
   - 缺点：实时校验、联动困难。

3. **React Hook Form**：
   - 基于非受控组件思想，使用 ref 注册字段。
   - 只在提交或需要校验时触发重渲染，性能更好。
   - 内置验证、错误处理、表单状态管理。

React Hook Form 示例：

```jsx
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })} />
      {errors.email && <span>邮箱格式错误</span>}
      <button type="submit">提交</button>
    </form>
  );
}
```

优势：
- 减少不必要的重渲染。
- API 简洁，易于集成校验库（Yup、Zod）。
- 支持受控与非受控混合使用（Controller）。

**评分维度**：
- 能对比受控、非受控、React Hook Form 三种方式（40%）
- 能写出 React Hook Form 基本用法（30%）
- 能分析性能优势和适用场景（30%）

**常见错误**：
- 认为 React Hook Form 完全不能用受控组件。
- 忽略 `register` 返回的 ref 和 name 的展开使用。
- 在复杂表单中仍然全部使用受控组件导致性能问题。

**延伸追问**：
- React Hook Form 是如何减少渲染次数的？
- 如何处理表单字段之间的联动？

**相关题目**：
- [FB-15-CO-B-008 受控组件和非受控组件](#FB-15-CO-B-008)
- [FB-15-CO-A-013 Refs 与 forwardRef](#FB-15-CO-A-013)

**参考资源**：
- [React 官方文档 - Forms](https://react.dev/reference/react-dom/components/input)
- [React Hook Form 官方文档](https://react-hook-form.com/)

**口头回答版**：
> React 里处理表单最基础的是受控组件，用 state 管值，onChange 更新，好处是数据可控，坏处是输入一次渲染一次。非受控组件用 ref 取值，渲染少但不好做实时校验。React Hook Form 走的是非受控路线，用 ref 注册字段，只在提交或校验时触发渲染，性能更好，API 也简洁，还能很方便地接 Yup、Zod 做校验。

---

### FB-15-CO-A-017：Error Boundary 是什么？它的局限性有哪些？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、Error Boundary、错误处理、容错
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 React Error Boundary 的作用、实现方式，以及它不能捕获哪些错误。

**参考答案**：

Error Boundary 是一种 React 组件，用于捕获其子组件树中的 JavaScript 错误，防止整个应用崩溃，并展示备用 UI。

类组件实现：

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // 可上报日志服务
  }

  render() {
    if (this.state.hasError) {
      return <h2>出错了，请刷新页面重试。</h2>;
    }
    return this.props.children;
  }
}
```

注意：函数组件本身不能直接成为 Error Boundary，目前仍需用类组件实现，或借助 `react-error-boundary` 等库。

不能捕获的错误：

1. 事件处理函数中的错误（需用 try/catch）。
2. 异步代码中的错误（如 setTimeout、Promise）。
3. 服务端渲染（SSR）期间抛出的错误。
4. Error Boundary 自身抛出的错误。

最佳实践：
- 在关键页面、路由级别放置 Error Boundary。
- 结合错误上报服务（Sentry）收集错误信息。
- 提供用户友好的降级 UI 和重试机制。

**评分维度**：
- 能说明 Error Boundary 的容错作用（30%）
- 能写出类组件实现（30%）
- 能列出至少 3 个不能捕获的错误场景（30%）
- 能提到错误上报和降级 UI（10%）

**常见错误**：
- 用函数组件直接实现 Error Boundary。
- 认为 Error Boundary 能捕获所有错误。
- 在 componentDidCatch 中再次 setState 导致循环。

**延伸追问**：
- React 18 对 Error Boundary 有什么改进？
- 如何设计全局错误边界和局部错误边界？

**相关题目**：
- [FB-15-CO-P-021 Concurrent 特性与 Suspense](#FB-15-CO-P-021)
- [FB-15-CO-R-028 React 性能优化策略](#FB-15-CO-R-028)

**参考资源**：
- [React 官方文档 - Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [react-error-boundary 库](https://github.com/bvaughn/react-error-boundary)

**口头回答版**：
> Error Boundary 是用来捕获子组件树里的 JS 错误，避免整个页面白屏的组件。它用类组件的 getDerivedStateFromError 和 componentDidCatch 来实现，出错时显示一个兜底 UI，同时还可以上报错误。但它捕获不了事件处理函数里的错误、异步代码里的错误、SSR 错误，以及它自己抛出的错误，这些要额外用 try/catch 或 Promise catch 处理。


---

## 深入题（9 道）{#proficient}

### FB-15-FS-P-018：React Fiber 架构解决了什么问题？请简述它的两个阶段。

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、Fiber、Reconciliation、Scheduler、虚拟 DOM
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请解释 React Fiber 架构出现的原因，并说明 reconciliation（协调）的两个阶段及其主要工作。

**参考答案**：

React 15 及之前使用递归遍历虚拟 DOM 进行 diff，一旦开始就无法中断，导致长任务阻塞主线程，动画和输入卡顿。Fiber 架构的核心目标是：

1. **可中断的渲染工作**：把渲染任务拆分成小单元，利用浏览器空闲时间执行，必要时让出主线程。
2. **优先级调度**：不同更新可以设置不同优先级，用户交互优先于低优先级后台任务。
3. **更好的错误处理**：为 Error Boundary 提供基础。
4. **支持并发特性**：为 Suspense、useTransition 等提供底层能力。

Fiber 是 React 重新实现的虚拟 DOM 节点结构，每个节点对应一个 Fiber 对象，包含子节点、父节点、兄弟节点的指针，以及当前状态、副作用等信息。

Reconciliation 两个阶段：

1. **Render 阶段（可中断）**：
   - 从根节点开始遍历 Fiber 树，构建新的 Fiber 树（workInProgress tree）。
   - 计算 diff，标记需要执行的副作用（effect tags）。
   - 可被高优先级任务打断，已完成的 work 不会丢失。

2. **Commit 阶段（不可中断）**：
   - 把 Render 阶段计算出的副作用同步应用到真实 DOM。
   - 执行生命周期方法 / useLayoutEffect、useEffect 的调度。
   - 必须一气呵成，避免中间状态被用户看到。

对应生命周期：
- Render 阶段：getDerivedStateFromProps、render、shouldComponentUpdate。
- Commit 阶段：componentDidMount、componentDidUpdate、componentWillUnmount。

**评分维度**：
- 能说明 Fiber 解决可中断渲染和优先级调度问题（30%）
- 能解释 Fiber 节点的基本作用（20%）
- 能区分 Render 阶段和 Commit 阶段（30%）
- 能说明哪些生命周期属于哪个阶段（20%）

**常见错误**：
- 认为 Fiber 只是虚拟 DOM 的另一种叫法。
- 认为 Render 阶段也会操作真实 DOM。
- 不清楚两个阶段的可中断性差异。

**延伸追问**：
- Fiber 的双缓冲机制是什么？
- Scheduler 如何决定何时让出主线程？

**相关题目**：
- [FB-15-CO-P-019 setState 异步与批量更新](#FB-15-CO-P-019)
- [FB-15-CO-P-020 React Diff 算法](#FB-15-CO-P-020)

**参考资源**：
- [React 官方文档 - React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
- [Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react)

**口头回答版**：
> Fiber 主要是为了解决老版 React 渲染一旦开始就不能中断、会卡主线程的问题。它把渲染拆成很多小任务，利用浏览器空闲时间执行，还能给不同更新设优先级。整个更新分两个阶段：Render 阶段计算差异、构建新的 Fiber 树，这个阶段可以中断；Commit 阶段把差异同步应用到真实 DOM，不能中断。像 render、shouldComponentUpdate 在 Render 阶段，componentDidMount、useLayoutEffect 在 Commit 阶段。

---

### FB-15-FS-P-019：setState 是异步还是同步的？React 18 的自动批量更新有什么变化？

**题型**：框架原理题 / 代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、setState、批量更新、异步、并发
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 `setState` 的行为：它是异步的还是同步的？React 18 之前的批量更新和 React 18 的自动批量更新有什么区别？

**参考答案**：

`setState` 本身并不承诺异步或同步，它的行为取决于调用场景：

- **React 事件处理函数中**：默认异步批量更新，多次 setState 会合并成一次渲染。
- **定时器、Promise、原生事件回调中（React 17 及之前）**：不会自动批量更新，每次 setState 可能触发一次渲染。
- **React 18 中**：自动批量更新覆盖所有场景，包括 setTimeout、Promise、原生事件等。

React 18 之前示例：

```jsx
// React 17：会渲染 3 次
setTimeout(() => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
}, 0);
```

React 18 示例：

```jsx
// React 18：只渲染 1 次
setTimeout(() => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
}, 0);
```

如果需要强制同步刷新，可以使用 `flushSync`：

```jsx
import { flushSync } from 'react-dom';

flushSync(() => {
  setCount(c => c + 1);
});
// 此时 DOM 已更新
```

函数组件中的 `useState` setter 同理。setState 的“异步”本质上是为了批量更新和性能优化，而不是真正的异步 API。

**评分维度**：
- 能区分不同场景下 setState 的批量行为（40%）
- 能对比 React 17 和 React 18 的自动批量更新（30%）
- 能说明 flushSync 的作用和使用场景（20%）
- 能解释 setState 异步的本质（10%）

**常见错误**：
- 简单说 setState 是异步的，忽略场景差异。
- 认为 setState 之后立即能读取到最新 state。
- 滥用 flushSync 破坏性能优化。

**延伸追问**：
- 类组件的 setState 合并和函数组件的 useState 有什么区别？
- 为什么在 React 事件处理函数中 setState 不会立即生效？

**相关题目**：
- [FB-15-CA-B-005 setCount 连续调用](#FB-15-CA-B-005)
- [FB-15-CO-P-021 Concurrent 特性与 Suspense](#FB-15-CO-P-021)

**参考资源**：
- [React 官方文档 - Automatic Batching](https://react.dev/blog/2022/03-29-react-v18#new-feature-automatic-batching)
- [React 官方文档 - flushSync](https://react.dev/reference/react-dom/flushSync)

**口头回答版**：
> setState 不能简单说异步还是同步，关键看调用场景。React 事件里默认是批量更新，相当于异步合并；React 17 以前，放到 setTimeout、Promise 里就不会自动批量，会多次渲染。React 18 改成自动批量更新，几乎所有场景下多次 setState 都会合并成一次渲染。如果确实要立刻刷新 DOM，可以用 flushSync，但一般不推荐。

---

### FB-15-FS-P-020：React 的 Diff 算法是如何工作的？key 在其中起什么作用？

**题型**：框架原理题 / 代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、Diff、Reconciliation、key、虚拟 DOM
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请简述 React Diff 算法的核心策略，并说明 `key` 在列表 diff 中的作用。为什么不建议用数组 index 作为 key？

**参考答案**：

React Diff 算法基于两个假设进行优化：

1. 不同类型的元素会产生不同的树。
2. 开发者可以通过 `key` 提示哪些子元素在不同渲染间保持稳定。

Diff 策略：

- **单节点 diff**：比较新旧节点的 type，如果不同则销毁旧节点并创建新节点；如果相同则复用 DOM 节点，只更新变化的 props。
- **多子节点 diff**：React 使用双端比较（旧头新头、旧尾新尾、旧头新尾、旧尾新头），尽量减少移动次数。如果无法匹配，则通过 key 在旧节点中查找可复用节点。

key 的作用：

- 为列表中的每个元素提供稳定身份标识。
- 帮助 React 在多次渲染间判断元素是新增、删除、移动还是复用。
- 没有 key 时，React 只能按位置比较，导致本可复用的元素被销毁重建。

为什么不用 index 作为 key：

1. 列表排序、插入、删除时，index 会变化，导致 React 误判元素身份。
2. 有状态组件可能出现状态错位。
3. 性能下降，产生不必要的 DOM 操作。

示例：

```jsx
// 旧：[A(0), B(1), C(2)]
// 新：[A(0), C(1), B(2)] 使用 index 作为 key
// React 会认为 B 和 C 都变了，实际应只是移动位置
```

使用稳定 ID 后，React 能识别出只是 B 和 C 交换了位置。

**评分维度**：
- 能说明 React Diff 的两个假设（20%）
- 能解释单节点和多子节点的 diff 策略（30%）
- 能说明 key 在列表 diff 中的作用（30%）
- 能分析 index 作为 key 的问题（20%）

**常见错误**：
- 认为 Diff 算法是深度优先完全比较。
- 认为 key 只是为了消除 warning。
- 使用随机数作为 key。

**延伸追问**：
- 同一层级 key 相同但 type 不同会怎么处理？
- 为什么 key 只在兄弟节点间需要唯一？

**相关题目**：
- [FB-15-CO-B-007 key 的作用](#FB-15-CO-B-007)
- [FB-15-FS-P-018 React Fiber 架构](#FB-15-FS-P-018)

**参考资源**：
- [React 官方文档 - Reconciliation](https://react.dev/learn/preserving-and-resetting-state)
- [React 源码解析 - Diff 算法](https://react.iamkasong.com/diff/prepare.html)

**口头回答版**：
> React 的 diff 算法不是无脑比较整棵树，而是基于两个假设：不同类型元素直接重新创建；子元素用 key 来识别身份。单节点比较 type，不同就重建；多子节点用双端比较加 key 查找，尽量少移动 DOM。key 就是给列表项一个稳定身份证，让 React 知道谁是谁。用 index 当 key，排序、插入、删除时 index 会变，React 就会误判，可能把状态搞错，性能也变差。

---

### FB-15-FS-P-021：React 18 的 Concurrent 特性有哪些？useTransition 和 useDeferredValue 怎么用？

**题型**：框架原理题 / 概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React 18、Concurrent、useTransition、useDeferredValue、Suspense
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请介绍 React 18 引入的并发特性，重点说明 `useTransition` 和 `useDeferredValue` 的作用、区别和使用场景。

**参考答案**：

React 18 引入了并发渲染（Concurrent Rendering），允许 React 同时准备多个版本的 UI，并根据优先级决定先渲染哪个。主要特性包括：

- **自动批量更新**：所有 setState 默认批量处理。
- **Suspense 数据获取**：支持在组件树中展示加载状态。
- **Transitions**：区分紧急更新（urgent）和过渡更新（transition）。
- **useDeferredValue**：延迟某些 UI 的重新渲染。
- **useId**：生成稳定的 SSR 安全 ID。
- **useSyncExternalStore**：安全订阅外部状态。
- **useInsertionEffect**：CSS-in-JS 插入样式的安全时机。

`useTransition`：

```jsx
import { useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value); // 紧急更新：输入框立刻响应
    startTransition(() => {
      setSearchQuery(e.target.value); // 过渡更新：结果列表可延迟
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <SearchList query={searchQuery} />
    </>
  );
}
```

`useDeferredValue`：

```jsx
import { useDeferredValue } from 'react';

function Search({ query }) {
  const deferredQuery = useDeferredValue(query);
  return <SearchList query={deferredQuery} />;
}
```

区别：

| 维度 | useTransition | useDeferredValue |
|------|---------------|------------------|
| 控制对象 | state 更新函数 | 某个值 |
| 使用位置 | 通常在有 state setter 的地方 | 通常把值传给子组件 |
| 典型场景 | 用户交互后延迟复杂状态更新 | 把高频变化的值延迟给耗时子组件 |
| 是否返回 pending 状态 | 返回 isPending | 无 |

**评分维度**：
- 能列举 React 18 并发特性的主要变化（30%）
- 能用代码说明 useTransition 的用法（30%）
- 能用代码说明 useDeferredValue 的用法（20%）
- 能对比两者适用场景（20%）

**常见错误**：
- 在 useTransition 中执行紧急更新。
- 认为 useDeferredValue 会阻止渲染，只是延迟低优先级渲染。
- 在所有场景滥用并发特性。

**延伸追问**：
- Suspense 和 useTransition 如何配合？
- Concurrent 模式下渲染是否可中断？

**相关题目**：
- [FB-15-CO-P-023 Suspense 数据获取](#FB-15-CO-P-023)
- [FB-15-CO-P-022 React 18 新 Hooks](#FB-15-CO-P-022)

**参考资源**：
- [React 官方文档 - useTransition](https://react.dev/reference/react/useTransition)
- [React 官方文档 - useDeferredValue](https://react.dev/reference/react/useDeferredValue)
- [React 18 并发模式介绍](https://react.dev/blog/2022/03-29-react-v18)

**口头回答版**：
> React 18 最大的变化是引入了并发渲染，可以同时准备多个 UI 版本，按优先级决定先渲染谁。useTransition 用来把一次不紧急的状态更新标记为过渡更新，比如搜索时输入框要立刻响应，但结果列表可以慢一点，它还会返回 isPending 显示 loading。useDeferredValue 则是让某个值延迟更新，常用于把高频变化的 query 延迟传给复杂的子组件。简单说：useTransition 管 state 更新，useDeferredValue 管值传递。

---

### FB-15-CO-P-022：React 18 新增了哪些 Hooks？useId、useSyncExternalStore、useInsertionEffect 分别解决什么问题？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React 18、useId、useSyncExternalStore、useInsertionEffect、SSR
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 React 18 新增的 `useId`、`useSyncExternalStore` 和 `useInsertionEffect` 三个 Hooks，分别说明它们的使用场景。

**参考答案**：

1. **useId**：
   - 生成在服务端和客户端都稳定的唯一 ID。
   - 解决 SSR hydration 时 `Math.random()` 或自增 ID 导致的不匹配问题。
   - 常用于表单 label 和 input 的 `htmlFor` / `id` 关联、ARIA 属性。

   ```jsx
   const id = useId();
   return (
     <>
       <label htmlFor={id}>用户名</label>
       <input id={id} />
     </>
   );
   ```

2. **useSyncExternalStore**：
   - 安全地订阅外部状态源（如 Redux store、浏览器 API）。
   - 在 Concurrent 模式下避免 tearing（同一视图读到不一致状态）。
   - 提供 getSnapshot 和 getServerSnapshot。

   ```jsx
   const width = useSyncExternalStore(
     callback => {
       window.addEventListener('resize', callback);
       return () => window.removeEventListener('resize', callback);
     },
     () => window.innerWidth,
     () => 0 // SSR 快照
   );
   ```

3. **useInsertionEffect**：
   - 在 DOM 变更之前同步执行，比 useLayoutEffect 更早。
   - 主要用于 CSS-in-JS 库在渲染过程中动态插入样式，避免样式闪烁。
   - 普通业务代码很少直接使用。

执行时机对比：

```text
useInsertionEffect -> DOM 变更前 -> useLayoutEffect -> 浏览器绘制 -> useEffect
```

**评分维度**：
- 能说明 useId 解决 SSR ID 不一致问题（30%）
- 能说明 useSyncExternalStore 解决外部状态订阅 tearing 问题（35%）
- 能说明 useInsertionEffect 解决 CSS-in-JS 样式插入时机问题（25%）
- 能对比三个 Hook 的执行时机（10%）

**常见错误**：
- 用 useId 生成列表 key（应使用数据 ID）。
- 在普通业务中滥用 useInsertionEffect。
- 忽略 useSyncExternalStore 的 SSR 快照参数。

**延伸追问**：
- 为什么 Concurrent 模式下需要 useSyncExternalStore？
- useInsertionEffect 和 useLayoutEffect 有什么本质区别？

**相关题目**：
- [FB-15-CO-A-009 useEffect 和 useLayoutEffect](#FB-15-CO-A-009)
- [FB-15-CO-P-024 Next.js 与 SSR](#FB-15-CO-P-024)

**参考资源**：
- [React 官方文档 - useId](https://react.dev/reference/react/useId)
- [React 官方文档 - useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
- [React 官方文档 - useInsertionEffect](https://react.dev/reference/react/useInsertionEffect)

**口头回答版**：
> React 18 加了几个为并发和 SSR 服务的 Hook。useId 用来生成服务端和客户端一致的稳定 ID，解决 hydration  mismatch；useSyncExternalStore 用来安全订阅外部状态，比如 Redux 或浏览器 API，避免并发模式下读到不一致的状态；useInsertionEffect 比 useLayoutEffect 还早执行，主要是给 CSS-in-JS 库插样式用的，防止样式闪烁。普通业务里一般用不上 useInsertionEffect。

---

### FB-15-FS-P-023：什么是 React Server Components（RSC）？它和 Client Components 有什么区别？

**题型**：框架原理题 / 概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：15 React
**标签**：React、Server Components、RSC、Client Components、SSR
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请解释 React Server Components（RSC）的概念，并对比 Server Components 与 Client Components 的区别、优势和限制。

**参考答案**：

React Server Components 是一种只在服务端执行的组件，不会打包到客户端 bundle 中。它可以访问服务端资源（数据库、文件系统、私有 API），并把渲染结果以特殊协议流式传输到客户端。

与 Client Components 对比：

| 维度 | Server Components | Client Components |
|------|-------------------|-------------------|
| 执行环境 | 服务端 | 浏览器 / 客户端 |
| Bundle 体积 | 不打包到客户端 | 打包到客户端 |
| 可直接访问数据库/文件系统 | 可以 | 不可以 |
| 可使用浏览器 API | 不可以 | 可以 |
| 可使用 useState / useEffect | 不可以 | 可以 |
| 可被交互事件绑定 | 不可以 | 可以 |
| 渲染结果传输 | 流式 RSC payload | HTML / JS |

优势：
- **减少客户端 bundle 体积**：服务端组件的依赖不会发送给浏览器。
- **直接访问后端数据**：无需编写 REST/GraphQL API，减少往返。
- **提升首屏性能**：服务端直接渲染，客户端只需加载必要 JS。
- **更好的代码组织**：同一份代码既能写 UI 又能写数据获取。

限制：
- 不能使用 Hooks 和浏览器 API。
- 不能绑定事件或维持客户端状态。
- 需要框架支持（Next.js App Router、RSC 自定义实现）。
- 调试和心智模型与传统 React 不同。

最佳实践：
- 把数据获取、静态展示、依赖重的逻辑放在 Server Components。
- 把交互、状态、浏览器 API 放在 Client Components。
- 尽量让 Client Components 作为叶子节点，被 Server Components 组合使用。

**评分维度**：
- 能说明 RSC 只在服务端执行，不进入客户端 bundle（30%）
- 能从执行环境、能力、限制等维度对比两种组件（40%）
- 能分析优势和适用场景（20%）
- 能提到需要框架支持（10%）

**常见错误**：
- 把 RSC 和 SSR 混为一谈（SSR 关注首屏 HTML，RSC 关注组件执行位置）。
- 认为 RSC 完全替代 Client Components。
- 在 Server Component 中使用 useState。

**延伸追问**：
- RSC 和 SSR 如何结合使用？
- Next.js App Router 中如何区分 Server 和 Client Component？

**相关题目**：
- [FB-15-CO-P-024 Next.js 与 SSR](#FB-15-CO-P-024)
- [FB-15-FS-P-025 React 19 Server Actions](#FB-15-FS-P-025)

**参考资源**：
- [React 官方文档 - Server Components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components)
- [Next.js 官方文档 - Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

**口头回答版**：
> React Server Components 是只在服务端运行的组件，不会打包到客户端。它可以直接访问数据库、文件系统这些后端资源，渲染结果以流的方式发给浏览器。和 Client Components 最大的区别是：Server Components 不能用 useState、useEffect，也不能绑定事件；Client Components 则在浏览器运行，负责交互和状态。RSC 的好处是减少 bundle 体积、首屏更快、数据获取更直接。但要注意它不是 SSR 的替代品，两者可以结合用。

---

### FB-15-FS-P-024：Suspense 是什么？如何与数据获取、Error Boundary 配合使用？

**题型**：框架原理题 / 场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、Suspense、数据获取、Error Boundary、异步
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请解释 React Suspense 的作用，并说明它如何与数据获取和 Error Boundary 配合使用，构建更优雅的异步 UI。

**参考答案**：

Suspense 让组件在数据或代码加载时“暂停”渲染，并展示统一的 fallback UI，直到准备就绪。它把加载状态从业务组件中抽离，简化异步 UI 逻辑。

基本用法：

```jsx
import { Suspense } from 'react';

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Loading />}>
        <UserProfile />
        <UserPosts />
      </Suspense>
    </ErrorBoundary>
  );
}
```

与数据获取配合：

- Suspense 需要配合“能让 React 感知到 pending 状态”的数据源，如：
  - Relay、SWR、React Query、Next.js 的 data fetching。
  - 自定义的 Suspense-enabled cache（通过 throw promise）。

```jsx
const resource = fetchUser(id);

function UserProfile() {
  const user = resource.read(); // 首次会 throw promise，触发 Suspense fallback
  return <div>{user.name}</div>;
}
```

与 Error Boundary 配合：

- Suspense 只处理“加载中”状态，不处理“加载失败”。
- 数据获取或组件渲染抛出的错误应由 Error Boundary 捕获。
- 推荐结构：外层 Error Boundary，内层 Suspense。

嵌套 Suspense：

```jsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<ListSkeleton />}>
    <ContentList />
  </Suspense>
</Suspense>
```

**评分维度**：
- 能说明 Suspense 统一处理加载状态的作用（30%）
- 能写出 Suspense + fallback 的基本用法（20%）
- 能说明需要配合 throw promise 的数据源（25%）
- 能说明 Suspense 和 Error Boundary 的职责边界（25%）

**常见错误**：
- 在 Suspense 内部自己写 loading 状态。
- 认为 Suspense 能捕获错误（应由 Error Boundary 处理）。
- 数据源不支持 Suspense 协议就强行使用。

**延伸追问**：
- Suspense 和传统的条件渲染 loading 有什么区别？
- 如何设计 Suspense 的 fallback 层级？

**相关题目**：
- [FB-15-CO-A-017 Error Boundary](#FB-15-CO-A-017)
- [FB-15-FS-P-021 Concurrent 特性](#FB-15-FS-P-021)

**参考资源**：
- [React 官方文档 - Suspense](https://react.dev/reference/react/Suspense)
- [React 官方文档 - Thinking in React: Suspense](https://react.dev/blog/2022/03/29/react-v18#suspense-in-data-frameworks)

**口头回答版**：
> Suspense 让组件在等数据或代码的时候先挂起，显示一个 fallback，比如 loading 骨架屏，等准备好了再继续渲染。它要和能 throw promise 的数据获取方案一起用，比如 React Query、Relay。它只处理加载，不处理错误，错误要外层包 Error Boundary。推荐写法是外层 Error Boundary，里面包 Suspense，Suspense 里再放业务组件。

---

### FB-15-FS-P-025：React 19 的 Server Actions 和 useOptimistic 解决了什么问题？

**题型**：框架原理题 / 概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：15 React
**标签**：React 19、Server Actions、useOptimistic、useActionState、表单
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请介绍 React 19 引入的 Server Actions、`useActionState` 和 `useOptimistic`，并说明它们各自的使用场景。

**参考答案**：

React 19 进一步强化了服务端与客户端的协作能力，主要新增/稳定了以下特性：

1. **Server Actions**：
   - 允许 Client Component 直接调用服务端函数，无需手写 API 路由。
   - 函数通过 `'use server'` 标记，可在 Server Component 或 Server Action 文件中定义。
   - 天然支持渐进增强（不依赖 JS 也能提交表单）。

   ```jsx
   // actions.js
   'use server';
   export async function addTodo(formData) {
     const title = formData.get('title');
     await db.todo.create({ title });
     revalidatePath('/');
   }

   // page.js
   <form action={addTodo}>
     <input name="title" />
     <button type="submit">添加</button>
   </form>
   ```

2. **useActionState**：
   - 用于管理 form action 的提交状态和返回结果。
   - 替代手动管理 loading、error、success 状态。

   ```jsx
   const [state, formAction, isPending] = useActionState(addTodo, { message: '' });
   ```

3. **useOptimistic**：
   - 在异步操作完成前，先乐观地更新 UI。
   - 操作失败时自动回滚到之前状态。

   ```jsx
   const [optimisticState, addOptimistic] = useOptimistic(
     state,
     (currentState, newItem) => [...currentState, newItem]
   );
   ```

三者配合：

```jsx
function TodoList({ todos, addTodoAction }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos);

  async function submit(formData) {
    const title = formData.get('title');
    addOptimisticTodo({ id: Date.now(), title });
    await addTodoAction(formData);
  }

  return (
    <form action={submit}>
      {optimisticTodos.map(todo => <TodoItem key={todo.id} {...todo} />)}
      <input name="title" />
      <button>添加</button>
    </form>
  );
}
```

**评分维度**：
- 能说明 Server Actions 让客户端直接调用服务端函数（30%）
- 能说明 useActionState 管理表单提交状态（25%）
- 能说明 useOptimistic 实现乐观更新（25%）
- 能写出三者配合的代码示例（20%）

**常见错误**：
- 在 Client Component 里直接写 `'use server'` 函数。
- 把 useOptimistic 当成普通 state 管理。
- 忽略 Server Actions 的权限和安全校验。

**延伸追问**：
- Server Actions 如何防止安全风险？
- useOptimistic 和手动乐观更新有什么区别？

**相关题目**：
- [FB-15-FS-P-023 React Server Components](#FB-15-FS-P-023)
- [FB-15-CO-A-016 React 表单处理](#FB-15-CO-A-016)

**参考资源**：
- [React 官方文档 - Server Actions](https://react.dev/reference/react/use-server)
- [React 官方文档 - useActionState](https://react.dev/reference/react/useActionState)
- [React 官方文档 - useOptimistic](https://react.dev/reference/react/useOptimistic)

**口头回答版**：
> React 19 的 Server Actions 让客户端可以直接调用服务端函数，不用写 API 路由，表单提交特别方便。useActionState 用来管理表单 action 的提交状态和结果，省得自己维护 loading 和 error。useOptimistic 则是乐观更新，比如点添加待办，先把 UI 变了，等服务端返回再确认或回滚。三者配合可以写出很简洁的表单交互代码。

---

### FB-15-FS-P-026：什么是 Hydration？Hydration Mismatch 有哪些常见原因和解决办法？

**题型**：框架原理题 / 概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、Hydration、SSR、SSR Hydration、水合
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 React 中的 Hydration 概念，并分析 Hydration Mismatch 的常见原因及解决方案。

**参考答案**：

Hydration（水合）是指 React 在服务端渲染（SSR）生成的静态 HTML 基础上，在客户端重新执行组件逻辑、绑定事件、恢复交互性的过程。SSR 提供首屏 HTML，Hydration 让页面“活”起来。

Hydration Mismatch 是指服务端渲染出的 HTML 与客户端首次渲染出的虚拟 DOM 不一致，React 会报错并尝试用客户端结果覆盖服务端 HTML。

常见原因：

1. **时间/随机数差异**：服务端和客户端生成不同值，如 `Date.now()`、`Math.random()`。
2. **浏览器 API 差异**：服务端没有 window、localStorage、navigator 等对象。
3. **用户相关数据差异**：服务端用默认语言，客户端按浏览器语言渲染。
4. **HTML 结构不一致**：服务端和客户端渲染条件分支不同。
5. **第三方库 SSR 支持不好**：某些库只在客户端执行。

解决方案：

1. **避免在 SSR 阶段使用不稳定值**：
   - 用 `useId` 生成稳定 ID。
   - 把时间格式化移到 useEffect 中执行。

2. **延迟客户端特有逻辑**：
   ```jsx
   const [isClient, setIsClient] = useState(false);
   useEffect(() => setIsClient(true), []);
   ```

3. **统一数据获取**：
   - 服务端把数据通过 props 传给客户端，避免两端各自获取。

4. **使用支持 SSR 的库**：
   - 选择 Next.js、Remix 等框架，或使用 `suppressHydrationWarning` 处理无法避免的小差异。

最佳实践：
- 尽量让服务端和客户端的首次渲染结果一致。
- 客户端特有内容放在 useEffect 中或 Client Component 中渲染。

**评分维度**：
- 能解释 Hydration 是 SSR 后恢复交互性的过程（30%）
- 能列举 3 个以上 mismatch 原因（30%）
- 能给出对应的解决方案（30%）
- 能提到 suppressHydrationWarning（10%）

**常见错误**：
- 把 SSR 和 Hydration 混为一谈。
- 在服务端渲染阶段直接访问 window。
- 用随机数生成列表 key。

**延伸追问**：
- React 18 的流式 SSR 对 Hydration 有什么影响？
- 如何排查 Hydration Mismatch 错误？

**相关题目**：
- [FB-15-FS-P-023 React Server Components](#FB-15-FS-P-023)
- [FB-15-CO-P-022 React 18 新 Hooks](#FB-15-CO-P-022)

**参考资源**：
- [React 官方文档 - Hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Next.js 官方文档 - Hydration Errors](https://nextjs.org/docs/messages/react-hydration-error)

**口头回答版**：
> Hydration 就是 SSR 之后，React 在浏览器里重新跑一遍组件，给静态 HTML 绑定事件、恢复交互。Hydration Mismatch 就是服务端和客户端第一次渲染出来的 HTML 对不上，React 会报错。常见原因有时间、随机数、浏览器 API、用户语言不一致。解决办法是尽量让两端第一次渲染一致，客户端特有的逻辑放到 useEffect 里，ID 用 useId，实在不行就用 suppressHydrationWarning。


---

## 架构题（69 道）{#architect}

### FB-15-SD-R-027：大型 React 项目中如何选择状态管理方案？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、状态管理、Redux、Zustand、Jotai、Context、选型
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
在一个大型 React 项目中，你会如何选择状态管理方案？请对比 Context、Redux、Zustand、Jotai、Recoil 等方案的适用场景。

**参考答案**：

状态管理选型需要考虑：应用规模、数据更新频率、团队熟悉度、调试需求、性能要求、生态成熟度。

常见方案对比：

| 方案 | 适用场景 | 优势 | 劣势 |
|------|---------|------|------|
| **useState / useReducer** | 组件级或局部状态 | 简单、无需额外依赖 | 跨层级传递困难 |
| **Context + useReducer** | 低频变化的全局状态（主题、语言、用户信息） | 内置于 React | 高频更新性能差，缺乏中间件 |
| **Redux Toolkit** | 大型应用、复杂状态流、强调试需求 | 生态成熟、DevTools 强大、中间件丰富 | 样板代码多、学习成本高 |
| **Zustand** | 中小型到大型应用 | API 极简、无样板、TypeScript 友好 | 生态不如 Redux 丰富 |
| **Jotai / Recoil** | 原子化状态、细粒度订阅 | 按需订阅、避免不必要渲染 | 生态较新、心智模型不同 |
| **React Query / SWR** | 服务端状态 | 缓存、失效、重试、去重 | 不擅长客户端全局 UI 状态 |

选型建议：

- **局部状态**：useState / useReducer。
- **低频全局配置**：Context。
- **中小型应用或追求简洁**：Zustand。
- **大型企业级应用、强可预测性**：Redux Toolkit + RTK Query。
- **状态关系复杂、需要细粒度订阅**：Jotai / Recoil。
- **服务端状态主导**：React Query / SWR + 轻量客户端状态库。

架构原则：

1. **状态分类**：区分服务端状态、客户端全局状态、局部 UI 状态。
2. **最小全局状态**：不要把所有状态都放到全局。
3. ** colocation（就近放置）**：状态放在离使用它最近的地方。
4. **不可变更新**：所有状态更新都遵循不可变原则。
5. **可测试性**：状态逻辑应便于单元测试。

**评分维度**：
- 能按应用规模和场景给出选型建议（30%）
- 能对比至少 4 种方案的优劣势（30%）
- 能提到状态分类和就近放置原则（20%）
- 能结合实际项目经验说明（20%）

**常见错误**：
- 一上来就用 Redux，忽略 Context 或 Zustand。
- 把服务端状态和客户端状态混在一个 store。
- 全局状态过多，导致任何修改都触发大面积渲染。

**延伸追问**：
- 如何避免 Redux 中的样板代码？
- Zustand 和 Jotai 的本质区别是什么？

**相关题目**：
- [FB-15-CO-A-012 Context API 性能陷阱](#FB-15-CO-A-012)
- [FB-15-CO-R-028 React 性能优化策略](#FB-15-CO-R-028)

**参考资源**：
- [Redux Toolkit 官方文档](https://redux-toolkit.js.org/)
- [Zustand 官方文档](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Jotai 官方文档](https://jotai.org/)

**口头回答版**：
> 选型要看项目规模和状态类型。局部状态用 useState；低频全局配置比如主题、语言用 Context；中小型项目或团队追求简洁，我倾向 Zustand；大型企业级、需要强调试和中间件，用 Redux Toolkit；状态关系复杂、要细粒度订阅可以用 Jotai 或 Recoil；服务端状态多用 React Query。核心原则是把状态就近放，不要全局化所有东西，同时区分服务端状态和客户端状态。

---

### FB-15-SD-R-028：如何系统地对 React 应用做性能优化？

**题型**：系统设计题 / 性能优化题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、性能优化、渲染优化、Memo、懒加载、Code Splitting
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请从测量、定位到优化手段，系统地说明如何对一个 React 应用进行性能优化。

**参考答案**：

性能优化应遵循“先测量，后优化”的原则，避免过早优化。

一、测量与定位

1. **React DevTools Profiler**：
   - 记录组件渲染耗时，识别渲染次数多或耗时长的组件。
   - 查看 commit 阶段和 render 阶段耗时。

2. **Chrome DevTools Performance**：
   - 分析主线程长任务、脚本执行、布局重排、重绘。

3. **Web Vitals**：
   - LCP（最大内容绘制）、INP（交互到下一次绘制）、CLS（累积布局偏移）。

4. **Lighthouse**：
   - 综合性能评分，给出优化建议。

二、常见优化手段

1. **减少不必要渲染**：
   - `React.memo` 缓存函数组件。
   - `useMemo` 缓存计算结果。
   - `useCallback` 缓存函数引用。
   - 合理拆分组件，避免父组件更新导致大量子组件重渲染。

2. **状态优化**：
   - 状态尽量就近放置。
   - 避免把高频变化的状态和不相关组件放在同一 Context。
   - 使用 selector 模式按需订阅。

3. **懒加载与代码分割**：
   - `React.lazy` + `Suspense` 按路由或功能拆分 chunk。
   - 使用动态 import 加载非首屏组件。

4. **列表优化**：
   - 使用稳定 key。
   - 虚拟列表（react-window、react-virtualized）处理大数据量列表。

5. **副作用优化**：
   - 合理设置 useEffect 依赖。
   - 避免在 useEffect 中执行昂贵计算。

6. **构建优化**：
   - Tree Shaking、代码压缩、Gzip/Brotli。
   - 分包策略（vendors、runtime、业务代码分离）。
   - 图片、字体等资源优化。

7. **首屏优化**：
   - SSR / SSG（Next.js）。
   - 骨架屏、预加载关键资源。
   - 使用 `defer` / `async` 加载非关键脚本。

三、优化流程

```text
测量 -> 定位瓶颈 -> 提出假设 -> 实施优化 -> 再次测量 -> 对比验证
```

**评分维度**：
- 能强调先测量再优化（20%）
- 能熟练使用 React DevTools Profiler 和 Chrome Performance（20%）
- 能系统列出渲染优化、状态优化、懒加载、列表优化等手段（40%）
- 能提到 Web Vitals 和首屏优化（20%）

**常见错误**：
- 一上来就加 React.memo，不做测量。
- 滥用 useMemo / useCallback 导致代码复杂但收益低。
- 只关注 JS 执行，忽略资源加载和 CSS 布局。

**延伸追问**：
- 如何优化一个包含 10 万条数据的表格？
- React 18 的并发特性如何帮助性能优化？

**相关题目**：
- [FB-15-CO-A-010 useMemo 和 useCallback](#FB-15-CO-A-010)
- [FB-15-CO-A-011 React.memo](#FB-15-CO-A-011)
- [FB-15-SD-R-027 状态管理选型](#FB-15-SD-R-027)

**参考资源**：
- [React 官方文档 - Optimizing Performance](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [React DevTools Profiler](https://react.dev/learn/thinking-in-react#step-5-add-inverse-data-flow)

**口头回答版**：
> 性能优化一定要先测量再动手。先用 React DevTools Profiler 看哪些组件渲染多、耗时长，再用 Chrome Performance 看主线程长任务。优化手段分几块：减少不必要渲染，比如 React.memo、useMemo、useCallback；状态就近放，Context 不要塞高频变化；路由和组件做懒加载；大数据列表用虚拟滚动；副作用依赖要写对；构建层面做 Tree Shaking、压缩、分包；首屏可以用 SSR 或 SSG。每改一步都要再测量验证。

---

### FB-15-SD-R-029：微前端架构下使用 React 有哪些关键考虑点？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、微前端、Module Federation、qiankun、子应用隔离
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明在微前端架构中使用 React 时，需要关注哪些关键问题？对比 qiankun 和 Module Federation 两种方案。

**参考答案**：

微前端将大型前端应用拆分为多个独立部署、独立运行的子应用，每个子应用可以使用不同技术栈。React 微前端需要关注以下问题：

1. **框架版本隔离**：
   - 多个子应用可能使用不同版本的 React。
   - 需要避免全局 window.React 冲突，常见方案是把 React 作为 externals 由基座统一提供，或各子应用独立打包。

2. **样式隔离**：
   - 子应用间 CSS 可能冲突。
   - 使用 CSS Modules、CSS-in-JS、Shadow DOM、PostCSS prefix 等方案隔离。

3. **JS 沙箱隔离**：
   - qiankun 提供 Proxy 沙箱，隔离 window 修改。
   - Module Federation 依赖运行时共享，需要设计好 shared scope。

4. **路由协调**：
   - 基座路由和子应用路由需要统一。
   - 子应用可能需要支持独立运行和嵌入运行两种模式。

5. **状态共享**：
   - 推荐通过事件总线、URL、全局 store 或发布订阅进行跨应用通信。
   - 避免直接共享 React state，降低耦合。

6. **公共依赖共享**：
   - Module Federation 可配置 shared dependencies，避免重复加载 React、ReactDOM。
   - 需要处理版本兼容和 fallback。

qiankun vs Module Federation：

| 维度 | qiankun | Module Federation |
|------|---------|-------------------|
| 集成方式 | 运行时加载子应用 JS 并执行 | 构建时共享模块，运行时组合 |
| 技术栈 | 不限 | 通常用于 Webpack/Rspack 生态 |
| 沙箱 | 内置 JS 沙箱、样式隔离 | 无内置沙箱，依赖共享模块设计 |
| 独立部署 | 支持 | 支持 |
| 共享依赖 | 通过 externals 或手动处理 | 原生支持 shared scope |
| 适用场景 | 异构技术栈、存量应用拆分 | 同构 Webpack 生态、模块共享 |

最佳实践：
- 基座尽量轻量，只负责加载、路由、公共依赖。
- 子应用保持独立，能单独运行和测试。
- 统一设计规范、组件库、埋点、错误监控。
- 建立版本管理和发布协调机制。

**评分维度**：
- 能列出 React 微前端的关键问题（30%）
- 能对比 qiankun 和 Module Federation（30%）
- 能说明公共依赖共享和版本隔离方案（20%）
- 能提到路由、样式、状态共享等实践（20%）

**常见错误**：
- 认为微前端就是简单地把多个 SPA 拼起来。
- 忽略 React 多版本冲突问题。
- 过度共享状态，导致子应用强耦合。

**延伸追问**：
- 如果两个子应用使用不同版本的 React，怎么处理？
- Module Federation 的 shared scope 是如何工作的？

**相关题目**：
- [FB-15-SD-R-030 React 组件库设计](#FB-15-SD-R-030)
- [FB-15-CO-R-028 React 性能优化策略](#FB-15-CO-R-028)

**参考资源**：
- [qiankun 官方文档](https://qiankun.umijs.org/)
- [Module Federation 官方文档](https://module-federation.io/)
- [Micro Frontends](https://micro-frontends.org/)

**口头回答版**：
> React 微前端要重点关注框架版本隔离、样式隔离、JS 沙箱、路由协调、状态共享和公共依赖共享。qiankun 是运行时加载子应用，内置沙箱和样式隔离，适合异构技术栈；Module Federation 是构建时共享模块，适合同一 Webpack 生态，能很好共享 React 等依赖。实践中基座要轻量，子应用要能独立跑，公共依赖尽量统一版本，状态通信用事件总线或全局 store，避免子应用强耦合。

---

### FB-15-SD-R-030：如何设计一个高质量的 React 组件库？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、组件库、设计系统、TypeScript、Storybook、Tree Shaking
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请从 API 设计、组件实现、工程化、文档、测试、发布等方面，说明如何设计一个高质量的 React 组件库。

**参考答案**：

一、API 设计

1. **一致性和可预测性**：
   - 统一命名规范、props 命名风格。
   - 行为一致的受控/非受控模式。

2. **组合优于配置**：
   - 优先使用复合组件模式（Compound Components），如 `<Select><Option /></Select>`。
   - 提供合理默认值，同时支持自定义。

3. **TypeScript 优先**：
   - 完整的类型定义，支持泛型和推断。
   - 导出组件 prop 类型，便于二次封装。

二、组件实现

1. **可访问性（a11y）**：
   - 遵循 WAI-ARIA 规范，提供正确的 role、aria-* 属性。
   - 支持键盘导航和焦点管理。

2. **样式方案**：
   - CSS Modules、CSS-in-JS、Tailwind 等，需考虑主题、Dark Mode、Design Token。
   - 避免样式污染，支持样式覆盖。

3. **性能**：
   - 合理使用 React.memo、useMemo、useCallback。
   - 支持 Tree Shaking，避免全量打包。

三、工程化

1. **构建工具**：
   - Rollup / tsup 打包 ESM / CJS / UMD。
   - 生成 d.ts 类型文件。
   - 配置 package.json 的 `main`、`module`、`types`、`exports`、`sideEffects`。

2. **代码质量**：
   - ESLint、Prettier、Husky、lint-staged。
   - TypeScript 严格模式。

3. **测试**：
   - 单元测试：Jest / Vitest + React Testing Library。
   - 视觉回归：Chromatic / Storybook test runner。
   - 可访问性测试：axe-core。

四、文档与示例

1. **Storybook**：
   - 展示组件各个状态和用法。
   - 支持 Controls、Docs、交互测试。

2. **设计文档**：
   - 设计原则、贡献指南、迁移指南、Changelog。

五、发布与版本管理

1. **语义化版本**：
   - 遵循 SemVer，明确 Breaking Change。

2. **Monorepo 管理**：
   - 使用 pnpm workspace + Changesets 管理多包版本。

3. **持续集成**：
   - 自动化测试、构建、发布到 npm。

**评分维度**：
- 能从 API、实现、工程化、文档、测试、发布等维度系统回答（40%）
- 能提到 TypeScript、a11y、Tree Shaking 等关键点（30%）
- 能说明 Storybook 和测试策略（20%）
- 能提到 Monorepo 和 Changesets（10%）

**常见错误**：
- 只关注组件实现，忽略工程化和文档。
- API 设计不一致，导致使用成本高。
- 忽略 Tree Shaking，导致业务包体积过大。

**延伸追问**：
- 如何设计一个支持主题换肤的组件库？
- 组件库如何处理 Breaking Change 和版本迁移？

**相关题目**：
- [FB-15-CO-A-011 React.memo](#FB-15-CO-A-011)
- [FB-15-SD-R-029 微前端与 React](#FB-15-SD-R-029)

**参考资源**：
- [Storybook 官方文档](https://storybook.js.org/)
- [Radix UI - Headless UI 设计思路](https://www.radix-ui.com/)
- [Ant Design 组件库实践](https://ant.design/)

**口头回答版**：
> 设计高质量 React 组件库要从几方面入手。API 设计要一致、可预测，优先组合而不是配置，类型要完整。实现上要重视可访问性、键盘导航、主题和样式隔离，性能上做好 memo 和 Tree Shaking。工程化用 Rollup 或 tsup 打包 ESM/CJS/UMD，配好 package.json 的 exports 和 sideEffects。测试用 React Testing Library 做单元测试，Storybook 做文档和视觉回归，axe 做可访问性测试。发布用 Monorepo + Changesets 管版本，CI 自动化测试和发布。


---

### FB-15-CO-B-031：什么是 React 的 Strict Mode？它会在开发环境下做什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、Strict Mode、开发模式、副作用
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 React 的 Strict Mode 作用，以及它在开发环境下会故意触发哪些行为。

**参考答案**：

Strict Mode 是 React 的开发模式辅助工具，用于提前发现副作用和不安全的生命周期使用。它在开发环境下会故意双重调用某些函数（如 render、某些 state updater、副作用清理与执行等），以帮助检测副作用。它还会检测过时的 API（如 findDOMNode、旧 Context API）、意外副作用、以及不安全的生命周期。

注意 Strict Mode 只在开发环境生效，生产环境无影响。

**评分维度**：
- 能说明 Strict Mode 是开发辅助工具（30%）
- 能列举双重调用 render/effect 等行为（40%）
- 能说明生产环境无影响（30%）

**常见错误**：
- 认为 Strict Mode 会在生产环境生效。
- 把 Strict Mode 导致的双重渲染当成 bug。
- 不了解它会检测过时的 API。

**延伸追问**：
- 为什么 React 18 的 Strict Mode 会重新挂载组件？
- 如何让你的组件在 Strict Mode 下安全运行？

**相关题目**：
- [FB-15-CO-B-006 React 组件的生命周期](#FB-15-CO-B-006)

**参考资源**：
- [React 官方文档 - Strict Mode](https://react.dev/reference/react/StrictMode)

**口头回答版**：
> Strict Mode 是 React 开发模式下的一个辅助检查工具，用来帮我们发现副作用。它会故意双重调用 render、effect 的清理和执行函数等，这样如果你的代码有副作用就会暴露出来。它还能检测过时 API 和不安全的生命周期。只在开发环境生效，生产环境不会。
---

### FB-15-CO-B-032：React 的事件处理有什么特点？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、事件处理、合成事件、事件委托
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 React 事件处理的特点，例如事件绑定方式、事件对象和事件委托。

**参考答案**：

React 事件处理使用合成事件（SyntheticEvent），提供跨浏览器一致性的事件对象。事件通过事件委托绑定在根容器上（React 17+ 是 root 容器，React 16 是 document），而不是每个 DOM 节点单独绑定。事件处理器命名使用驼峰，如 onClick、onChange。事件处理函数接收 SyntheticEvent 对象，可以通过 `e.stopPropagation()` 阻止冒泡，`e.preventDefault()` 阻止默认行为。React 17+ 已取消合成事件池化。

**评分维度**：
- 能说明合成事件概念（30%）
- 能说明事件委托机制（30%）
- 能写出 onClick 等基本事件绑定（20%）
- 能说明 React 17 事件委托根容器变化（20%）

**常见错误**：
- 事件名写成 onclick 小写。
- 认为 React 事件和原生事件完全一致。
- 混淆阻止冒泡和阻止默认行为。

**延伸追问**：
- React 合成事件和原生事件如何混用？
- React 17 把事件委托从 document 移到 root 有什么好处？

**相关题目**：
- [FB-15-CO-A-043 React 合成事件和原生事件](#FB-15-CO-A-043)

**参考资源**：
- [React 官方文档 - Handling Events](https://react.dev/learn/thinking-in-react#step-5-add-inverse-data-flow)

**口头回答版**：
> React 事件处理用合成事件对象，保证跨浏览器一致。它不是绑在每个元素上，而是委托到根容器，React 17 以后是 root 容器。事件名用驼峰比如 onClick，函数接收 e 对象，可以阻止冒泡和默认行为。React 17 之前合成事件还有对象池化，17 以后取消了。

---

### FB-15-CO-B-033：React 中渲染列表时有什么要求？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、列表渲染、key、JSX
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明在 React 中使用 map 渲染列表时需要注意什么，为什么需要 key。

**参考答案**：

在 React 中渲染列表通常使用数组的 `map` 方法返回 JSX 元素数组。每个列表项需要有稳定的 `key` 属性，帮助 React 在 diff 时识别元素身份，复用 DOM 节点。key 应该在兄弟节点间唯一，但不必须是全局唯一。key 不能通过 props 在子组件中读取。应使用数据中的稳定唯一 ID 作为 key，避免使用数组 index。

**评分维度**：
- 能说明使用 map 渲染列表（30%）
- 能说明 key 的作用（40%）
- 能说明 key 应使用稳定 ID 而不是 index（30%）

**常见错误**：
- 忘记给列表项加 key。
- 使用 index 作为 key 处理会排序/增删的列表。
- 尝试在子组件中读取 props.key。

**延伸追问**：
- key 在子组件中能不能作为 prop 拿到？
- 如果列表没有唯一 ID 怎么办？

**相关题目**：
- [FB-15-CO-B-007 key 的作用](#FB-15-CO-B-007)

**参考资源**：
- [React 官方文档 - Rendering Lists](https://react.dev/learn/rendering-lists)

**口头回答版**：
> React 里列表渲染一般用 map 返回一组 JSX，每个元素都要有 key。key 帮助 React 识别列表项身份，diff 时知道谁是谁，尽量复用 DOM。key 要在兄弟节点里唯一，最好用数据里的稳定 id，不要用数组 index，尤其是列表会排序、增删的时候。

---

### FB-15-CO-B-034：什么是 React Fragment？它解决了什么问题？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、Fragment、JSX、DOM
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 React Fragment 的作用和用法，它为什么比使用额外 div 更好。

**参考答案**：

React Fragment 允许组件返回多个元素而不需要额外包裹 DOM 节点。语法是 `<></>` 或 `<React.Fragment></React.Fragment>`。使用 Fragment 可以避免引入无意义的 DOM 层级，减少 DOM 节点数，避免破坏 CSS 布局或语义化结构。`React.Fragment` 还可以加 key 属性，短语法不能加 key。

**评分维度**：
- 能说明 Fragment 让组件返回多个元素（40%）
- 能区分短语法和 React.Fragment（20%）
- 能说明相比 div 的优势（40%）

**常见错误**：
- 在短语法 Fragment 上加 key。
- 认为 Fragment 会渲染成真实 DOM。
- 所有情况都使用 div 包裹。

**延伸追问**：
- Fragment 在 DOM 中是否存在？
- 什么时候必须用 React.Fragment 而不是 `<></>`？

**相关题目**：
- [FB-15-CO-B-001 JSX 与 HTML 区别](#FB-15-CO-B-001)

**参考资源**：
- [React 官方文档 - Fragment](https://react.dev/reference/react/Fragment)

**口头回答版**：
> Fragment 让我们可以在不额外加 div 的情况下返回多个元素，写法是 `<>``</44>``` 或者 ``&lt;React.Fragment53&gt;```</React.Fragment69>```。它不会生成真实 DOM，能避免无意义嵌套，保持结构干净。短写法不能加 key，需要加 key 的时候要用 React.Fragment。

---

### FB-15-CO-B-035：React 中有哪些条件渲染方式？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、条件渲染、JSX、逻辑与
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请列举 React 中常见的条件渲染写法，并说明各自适用场景。

**参考答案**：

常见方式：
1. `if/else` 语句在组件函数内返回不同 JSX；
2. 三元表达式 `{condition ? <A /> : <B />}`；
3. 逻辑与 `&&` 运算符 `{condition && <A />}`，注意 condition 为 0、'' 等 falsy 值时会意外渲染；
4. 使用变量提前计算元素；
5. 封装条件渲染组件。

选择依据：简单二选一用三元，单一元素显示隐藏用 `&&` 但要确保条件是布尔值，复杂逻辑用 if/else 或提前计算。

**评分维度**：
- 能列举 if/else、三元、&& 等方式（40%）
- 能说明 && 的 falsy 值陷阱（30%）
- 能给出适用场景建议（30%）

**常见错误**：
- 用 `&&` 时左侧条件为数字 0 或空字符串导致显示。
- 三元表达式嵌套过深。
- 在 JSX 中直接使用 if 语句。

**延伸追问**：
- `{count && <Component />}` 当 count 为 0 时会怎样？
- 如何封装一个 Show 组件做条件渲染？

**相关题目**：
- [FB-15-CO-B-001 JSX 与 HTML 区别](#FB-15-CO-B-001)

**参考资源**：
- [React 官方文档 - Conditional Rendering](https://react.dev/learn/conditional-rendering)

**口头回答版**：
> React 条件渲染常见有几种：组件函数里用 if/else 返回不同 JSX；JSX 里用三元表达式做二选一；用 `&&` 做单一显示隐藏，但要注意条件如果是 0 或空字符串会显示出来；还可以提前把要渲染的元素算好存到变量里。简单场景用三元，复杂逻辑用 if。

---

### FB-15-CA-B-036：下面 useEffect 的代码输出什么？为什么？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、useEffect、闭包、依赖数组
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, []);

  const handleClick = () => {
    setCount(c => c + 1);
  };

  return <button onClick={handleClick}>+1</button>;
}
```

点击按钮后，控制台会输出什么？为什么？

**参考答案**：

点击按钮不会触发 `useEffect` 中的 `console.log`。因为 `useEffect` 依赖数组是空数组 `[]`，effect 只在组件挂载后执行一次，后续 count 变化不会触发它。依赖数组为空时，effect 内部的 count 是挂载时的闭包值。如果想在 count 变化时输出，应把 count 加入依赖数组 `[count]`。

**评分维度**：
- 能正确判断不会重复输出（30%）
- 能解释空依赖数组只在挂载执行（40%）
- 能给出修复方案（30%）

**常见错误**：
- 认为 state 变化会触发空依赖 effect。
- 不理解闭包导致 effect 内 count 不变。
- 为了解决闭包问题过度使用 ref。

**延伸追问**：
- 如果依赖数组写 `[count]` 会输出几次？
- 如何在空依赖 effect 中获取最新 count？

**相关题目**：
- [FB-15-CO-A-009 useEffect 依赖数组](#FB-15-CO-A-009)

**参考资源**：
- [React 官方文档 - useEffect](https://react.dev/reference/react/useEffect)

**口头回答版**：
> 点击按钮后不会输出新的 count，因为 useEffect 依赖数组是空的，只在挂载时执行一次，之后 count 变了也不会再执行。如果要监听 count 变化，就要把 count 写到依赖数组里。

---

### FB-15-CO-B-037：React Portal 的作用是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、Portal、DOM、Modal
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 React Portal 的作用、使用场景和基本用法。

**参考答案**：

Portal 提供了一种将子组件渲染到父组件之外的 DOM 节点中的能力，使用 `createPortal(children, domNode)`。常见场景：Modal、Tooltip、Toast、Dropdown 等需要脱离当前布局上下文、避免被父级 overflow / z-index 影响的 UI。Portal 中的事件仍然会冒泡到 React 组件树中的父组件。

**评分维度**：
- 能说明 Portal 渲染到外部 DOM 节点（40%）
- 能列举 Modal/Toast 等适用场景（30%）
- 能说明事件冒泡仍按 React 组件树（30%）

**常见错误**：
- 认为 Portal 会脱离 React 事件系统。
- 用 z-index 代替 Portal 处理所有弹层。
- 不理解 Portal 目标节点需要已存在。

**延伸追问**：
- Portal 中的事件冒泡行为是怎样的？
- 如何管理多个 Modal 的 z-index？

**相关题目**：
- [FB-15-CO-A-017 Error Boundary](#FB-15-CO-A-017)

**参考资源**：
- [React 官方文档 - Portals](https://react.dev/reference/react-dom/createPortal)

**口头回答版**：
> Portal 让我们可以把子组件渲染到页面其他 DOM 节点里，不在父组件的 DOM 位置。常用于 Modal、Toast、Tooltip，避免被父级 overflow 裁掉或者 z-index 覆盖。虽然 DOM 位置变了，但事件冒泡还是按 React 组件树来。

---

### FB-15-CO-B-038：React 中的 children prop 是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：15 React
**标签**：React、children、props、组件组合
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 React 中 children prop 的含义和常见用法。

**参考答案**：

children 是 React 组件中特殊的 prop，表示组件标签体内部的内容。它可以是 JSX 元素、文本、数字、数组、函数或 null。通过 children 可以实现组件组合和布局复用，如 Layout、Card、List 等容器组件。还可以使用 `React.Children` API 或 `Children.map` 对 children 做遍历和增强。

**评分维度**：
- 能说明 children 表示组件标签体内容（40%）
- 能列举 children 可以是元素/文本/数组等（30%）
- 能说明组合复用场景（30%）

**常见错误**：
- 把 children 当成普通 prop 但忽略其多种类型。
- 直接修改 children。
- 不理解 React.Children 工具 API。

**延伸追问**：
- React.Children.map 和数组 map 有什么区别？
- render props 和 children 作为函数有什么区别？

**相关题目**：
- [FB-15-CO-A-040 render props 和高阶组件](#FB-15-CO-A-040)

**参考资源**：
- [React 官方文档 - Children](https://react.dev/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy)

**口头回答版**：
> children 是组件标签中间的内容，是 React 里一种特殊的 prop。它可以是 JSX、文本、数字、数组等。我们常常用 children 来做可复用的容器组件，比如 Card、Layout，把具体内容从外面传进来，实现组合。
---

### FB-15-CO-A-039：useReducer 和 useState 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、useReducer、useState、状态管理、Hooks
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 useReducer 和 useState，说明它们的适用场景。

**参考答案**：

useState 适合简单、独立的状态逻辑。useReducer 适合状态逻辑复杂、包含多个子状态或状态转换规则明确的场景。useReducer 把状态更新逻辑集中到 reducer 函数中，便于测试和复用，天然适合处理 action 驱动的状态机。使用 useReducer 时，dispatch 的引用是稳定的，不会导致依赖它的 effect 或子组件重新渲染。

**评分维度**：
- 能说明 useState 适合简单状态（30%）
- 能说明 useReducer 适合复杂状态逻辑（40%）
- 能指出 dispatch 引用稳定的好处（30%）

**常见错误**：
- 所有状态都使用 useReducer。
- 在 reducer 中直接修改 state 或执行副作用。
- 不理解 dispatch 的稳定性。

**延伸追问**：
- useReducer 如何实现状态机和撤销重做？
- useReducer 和 Redux 有什么关系？

**相关题目**：
- [FB-15-CO-A-009 useEffect 依赖数组](#FB-15-CO-A-009)

**参考资源**：
- [React 官方文档 - useReducer](https://react.dev/reference/react/useReducer)

**口头回答版**：
> useState 适合简单的状态，比如开关、计数。useReducer 适合状态逻辑复杂、有多个子状态或者状态转换规则多的场景，把更新逻辑集中到 reducer 函数里，好测试也好复用。另外 useReducer 的 dispatch 引用是稳定的，不会因为 dispatch 变而导致 effect 重跑。

---

### FB-15-CO-A-040：什么是 Render Props 和高阶组件（HOC）？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、Render Props、HOC、组件复用
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 React 中的 Render Props 和高阶组件，对比它们的优缺点。

**参考答案**：

Render Props 是指组件通过一个 prop（通常是 render 或 children）接收一个函数，该函数返回 JSX，组件把内部状态或逻辑传给这个函数。HOC 是一个接收组件并返回新组件的函数，用于复用组件逻辑。两者都是 React 中复用逻辑的方式，在 Hooks 出现前广泛使用。

HOC 可能导致 props 命名冲突、嵌套地狱；Render Props 可能导致组件树嵌套过深。Hooks 出现后，大多数场景可用自定义 Hook 替代。

**评分维度**：
- 能解释 Render Props 模式（30%）
- 能解释 HOC 模式（30%）
- 能对比两者优缺点（25%）
- 能说明 Hooks 可以替代大多数场景（15%）

**常见错误**：
- 在 Hooks 时代仍然优先使用 HOC。
- 不理解 HOC 应该保持透传 props。
- Render Props 的函数每次都重建导致子组件渲染。

**延伸追问**：
- HOC 和 Render Props 各有什么调试上的缺点？
- 如何用自定义 Hook 替代 HOC？

**相关题目**：
- [FB-15-CD-A-014 Custom Hook](#FB-15-CD-A-014)

**参考资源**：
- [React 官方文档 - Render Props](https://react.dev/reference/react/cloneElement)

**口头回答版**：
> Render Props 是把一个函数通过 prop 传给组件，组件把内部状态或逻辑通过参数传给这个函数，函数返回 JSX。HOC 是一个函数接收组件返回新组件，用来复用逻辑。HOC 容易 props 冲突、嵌套深；Render Props 容易组件树嵌套多。Hooks 出来后，大部分情况用自定义 Hook 更直接。

---

### FB-15-CO-A-041：如何用 React.lazy 和 Suspense 做代码分割？

**题型**：概念题 / 手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、React.lazy、Suspense、代码分割、性能
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React.lazy 和 Suspense 的作用，并给出按路由做代码分割的示例。

**参考答案**：

React.lazy 允许动态导入组件，实现组件级别的代码分割。Suspense 可以在 lazy 组件加载时显示 fallback UI。两者配合使用可按路由或功能模块拆分 chunk，减少首屏 JS 体积。

示例：

```jsx
const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

注意 React.lazy 目前只支持默认导出组件，不支持服务端渲染，需要配合 Next.js 等框架的 dynamic import。

**评分维度**：
- 能说明 React.lazy 动态导入组件（30%）
- 能说明 Suspense 显示 fallback（30%）
- 能写出路由代码分割示例（25%）
- 能说明 SSR 限制（15%）

**常见错误**：
- 忘记包 Suspense 导致报错。
- 在 React.lazy 组件内使用非默认导出。
- 把 Suspense fallback 设计得过于复杂。

**延伸追问**：
- React.lazy 和动态 import 有什么区别？
- 如何做错误边界处理加载失败的 chunk？

**相关题目**：
- [FB-15-CO-A-015 React Router v6](#FB-15-CO-A-015)

**参考资源**：
- [React 官方文档 - Code Splitting](https://react.dev/reference/react/lazy)

**口头回答版**：
> React.lazy 可以让我们在需要的时候才加载组件，配合 Suspense 在加载过程中显示一个 fallback。常用来做路由级别的代码分割，减少首屏加载体积。写法是用 import() 动态导入组件，然后用 Suspense 包起来。要注意它不支持 SSR，Next.js 里要用自己的 dynamic。

---

### FB-15-CA-A-042：下面代码在输入框快速输入时会出现什么问题？如何修复？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、useEffect、竞态、异步、debounce
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：

```jsx
function Search({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]);

  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}
```

这段代码有什么问题？当用户快速输入时会出现什么情况？

**参考答案**：

主要问题是竞态（race condition）：当 query 快速变化时，先发出的请求可能后返回，导致旧结果覆盖新结果。另外没有 loading 状态、错误处理和请求取消。

修复方案：在 effect 中使用 AbortController 来取消过期请求。

```jsx
useEffect(() => {
  const controller = new AbortController();
  setLoading(true);
  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setResults(data))
    .catch(() => { /* 忽略取消错误 */ })
    .finally(() => setLoading(false));
  return () => controller.abort();
}, [query]);
```

**评分维度**：
- 能指出竞态问题（40%）
- 能说明旧结果覆盖新结果的风险（30%）
- 能给出 AbortController 修复方案（30%）

**常见错误**：
- 只提到没有防抖，没提到竞态。
- 在 cleanup 中不做任何处理。
- 没有处理 AbortError。

**延伸追问**：
- 除了 AbortController 还有什么方法避免竞态？
- 如何结合 useTransition 优化搜索体验？

**相关题目**：
- [FB-15-CO-A-009 useEffect 依赖数组](#FB-15-CO-A-009)

**参考资源**：
- [React 官方文档 - Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)

**口头回答版**：
> 这段代码的问题是当 query 变得很快时，先发的请求可能后返回，导致旧结果把新结果覆盖掉，这就是竞态。修复方法是在 useEffect 里用 AbortController，清理时 abort 掉旧请求，或者用一个标志位忽略过期请求的返回。

---

### FB-15-CO-A-043：React 合成事件和原生事件有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、合成事件、原生事件、事件委托、事件冒泡
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 React 合成事件（SyntheticEvent）和原生 DOM 事件，说明它们的关系和差异。

**参考答案**：

React 合成事件是对原生事件的跨浏览器封装，提供一致的 API。React 使用事件委托，事件监听绑定在 root 容器（React 17+）或 document（React 16）上，而不是每个元素。合成事件对象是池化的概念在 React 17+ 已取消。合成事件和原生事件可以在同一节点共存，事件执行顺序是原生事件先捕获/冒泡，React 事件按 React 组件树冒泡。SyntheticEvent 提供 `nativeEvent` 访问原生事件。

**评分维度**：
- 能说明合成事件是跨浏览器封装（30%）
- 能说明事件委托机制（30%）
- 能说明原生事件和合成事件的执行顺序（25%）
- 能提到 React 17 事件委托根节点变化（15%）

**常见错误**：
- 认为合成事件会完全替代原生事件。
- 混淆事件委托目标和事件目标。
- 在 React 17+ 还担心合成事件池化。

**延伸追问**：
- 在 React 事件和原生事件中都监听 click，执行顺序如何？
- 为什么 React 17 把事件委托从 document 移到 root？

**相关题目**：
- [FB-15-CO-B-032 React 事件处理](#FB-15-CO-B-032)

**参考资源**：
- [React 官方文档 - SyntheticEvent](https://react.dev/reference/react-dom/components/common#react-event-object)

**口头回答版**：
> React 合成事件是对原生事件的封装，API 跨浏览器一致。它不是绑在每个元素上，而是委托到根容器。React 17 之前委托到 document，17 以后到 root。合成事件和原生事件可以混用，原生事件先触发，React 事件按组件树冒泡。React 17 以后取消了事件对象池化，可以异步访问事件属性了。

---

### FB-15-CO-A-044：dangerouslySetInnerHTML 有什么风险？如何安全使用？

**题型**：概念题 / 场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、XSS、dangerouslySetInnerHTML、安全、富文本
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 dangerouslySetInnerHTML 的作用、风险和安全使用方式。

**参考答案**：

dangerouslySetInnerHTML 是 React 中类似 innerHTML 的属性，用于将 HTML 字符串直接插入 DOM。主要风险是 XSS（跨站脚本攻击），如果内容来自用户输入且未过滤，可能执行恶意脚本。

安全使用方式：
1. 尽量避免使用；
2. 必须使用时对输入做严格消毒（sanitize），如使用 DOMPurify；
3. 使用 CSP（Content Security Policy）限制脚本执行；
4. 对富文本编辑器内容做白名单过滤。

**评分维度**：
- 能说明作用是插入原始 HTML（20%）
- 能指出 XSS 风险（40%）
- 能给出 sanitize、CSP 等安全措施（40%）

**常见错误**：
- 直接渲染用户输入内容。
- 认为 React 会自动转义 dangerouslySetInnerHTML 内容。
- 忽略 CSP 等防御层。

**延伸追问**：
- DOMPurify 的工作原理是什么？
- 富文本编辑器如何防止 XSS？

**相关题目**：
- [FB-15-CO-A-017 Error Boundary](#FB-15-CO-A-017)

**参考资源**：
- [React 官方文档 - dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html)

**口头回答版**：
> dangerouslySetInnerHTML 让 React 直接把一段 HTML 字符串插到 DOM 里，和 innerHTML 类似。它的主要风险是 XSS，如果内容里有恶意脚本就会执行。所以能不用就不用，必须用的时候一定要先做消毒，比如用 DOMPurify，只允许白名单标签，同时配合 CSP。

---

### FB-15-CD-A-045：请手写一个 useDebounce Hook

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、Custom Hook、debounce、useEffect、性能
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请手写一个 useDebounce Hook，接收 value 和 delay，返回防抖后的值。

**参考答案**：

```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

使用：

```jsx
const debouncedQuery = useDebounce(query, 500);
```

注意：delay 变化时应重置计时器；cleanup 函数保证在 value 变化时清除旧定时器。

**评分维度**：
- 能使用 useState + useEffect 实现（40%）
- 能正确处理清理函数（30%）
- 能处理 delay 变化的情况（20%）
- 能说明使用场景（10%）

**常见错误**：
- 没有清理函数导致旧值覆盖新值。
- 忽略 delay 作为依赖。
- 使用 useMemo 而不是 useEffect 做防抖。

**延伸追问**：
- 如何实现 useThrottle？
- 用 useDeferredValue 能否替代 debounce？

**相关题目**：
- [FB-15-CD-A-014 useWindowSize](#FB-15-CD-A-014)

**参考资源**：
- [React 官方文档 - Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

**口头回答版**：
> useDebounce 就是用一个 state 保存防抖后的值，useEffect 里设一个定时器，delay 时间到了把值更新。关键是每次 value 或 delay 变化时要清理掉旧定时器，避免旧值覆盖新值。常用于搜索输入，等用户停止输入一段时间再发请求。
---

### FB-15-CO-A-046：如何用 useRef 保存上一次的 state 或 props？

**题型**：概念题 / 手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、useRef、上一次的值、闭包
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何使用 useRef 在组件中保存上一次渲染时的 props 或 state。

**参考答案**：

由于 ref 的更新不会触发渲染，可以在 useEffect 中把当前值赋值给 ref，供下一次渲染读取。

示例：

```jsx
function MyComponent({ value }) {
  const prevValueRef = useRef(value);

  useEffect(() => {
    prevValueRef.current = value;
  });

  const prevValue = prevValueRef.current;
  return <div>当前：{value}，上次：{prevValue}</div>;
}
```

注意 useEffect 在渲染后执行，所以 `prevValueRef.current` 在上一次渲染的 effect 中已被更新为旧值，本次渲染读取的就是旧值。

**评分维度**：
- 能说明 useRef 保存不触发渲染的值（30%）
- 能在 useEffect 中更新 ref（40%）
- 能理解渲染时读取的是上一次 effect 保存的值（30%）

**常见错误**：
- 在 render 阶段直接修改 ref.current。
- 认为 useRef 保存的值会自动同步。
- 把 prevValue 放到 state 中导致无限循环。

**延伸追问**：
- 为什么不能在 render 阶段修改 ref？
- 如何用 usePrevious Hook 封装？

**相关题目**：
- [FB-15-CO-A-013 Refs 与 forwardRef](#FB-15-CO-A-013)

**参考资源**：
- [React 官方文档 - useRef](https://react.dev/reference/react/useRef)

**口头回答版**：
> useRef 可以保存不触发渲染的值。我们可以写一个 usePrevious，在 useEffect 里把当前值赋给 ref，这样下一次渲染时 ref.current 就是上一次的值。要注意 useEffect 是渲染后才执行，所以渲染时读到的是上一次渲染结束后存进去的值。

---

### FB-15-CO-A-047：React.memo、useMemo、useCallback 如何配合使用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：15 React
**标签**：React、React.memo、useMemo、useCallback、性能优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React.memo、useMemo、useCallback 各自作用，以及如何配合优化子组件渲染。

**参考答案**：

React.memo 对函数组件 props 做浅比较，props 不变跳过渲染。useMemo 缓存计算结果。useCallback 缓存函数引用。配合场景：当父组件传递对象或函数给被 React.memo 包裹的子组件时，需要用 useMemo/useCallback 保持引用稳定，否则 React.memo 的浅比较会失效。

优化顺序：先测量，再拆分组件，最后才考虑 memo/cache。

**评分维度**：
- 能说明三者各自作用（30%）
- 能说明 React.memo 与 useCallback/useMemo 配合使用（40%）
- 能指出优化前应先测量（30%）

**常见错误**：
- 对所有组件都加 React.memo。
- 子组件用 React.memo 但父组件每次传新对象。
- 滥用 useCallback 导致代码复杂。

**延伸追问**：
- 浅比较对嵌套对象会失效吗？
- 自定义比较函数有什么风险？

**相关题目**：
- [FB-15-CO-A-010 useMemo 和 useCallback](#FB-15-CO-A-010)

**参考资源**：
- [React 官方文档 - memo](https://react.dev/reference/react/memo)

**口头回答版**：
> React.memo 用来让函数组件在 props 没变时不渲染；useMemo 缓存计算值；useCallback 缓存函数引用。它们经常一起用：如果子组件被 React.memo 包裹，父组件传给它函数或对象时，要用 useCallback 和 useMemo 保持引用稳定，不然每次父组件渲染都创建新引用，React.memo 就失效了。

---

### FB-15-FS-P-048：React 的 Reconciliation 是什么？和 Diff 有什么关系？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、Reconciliation、Diff、虚拟 DOM、Fiber
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请解释 React 的 Reconciliation 过程，以及它和 Diff 算法的关系。

**参考答案**：

Reconciliation 是 React 在状态变化后，比较新旧虚拟 DOM（或 Fiber）树，计算出最小 DOM 操作集合的过程。Diff 算法是 Reconciliation 中用于比较两棵树的算法。

React 基于两个假设优化 Diff：
1. 不同类型元素产生不同树；
2. 通过 key 提示哪些子元素稳定。

Reconciliation 包含 Render 阶段（可中断，计算新树和副作用）和 Commit 阶段（不可中断，应用 DOM 操作）。

**评分维度**：
- 能解释 Reconciliation 是比较和计算最小更新的过程（30%）
- 能说明 Diff 是 Reconciliation 的核心算法（25%）
- 能说明两个优化假设（20%）
- 能区分 Render 和 Commit 阶段（25%）

**常见错误**：
- 把 Reconciliation 和 Diff 混为一谈。
- 认为 Reconciliation 直接操作 DOM。
- 不理解 Render 阶段可中断。

**延伸追问**：
- Reconciliation 和 Layout 有什么关系？
- 为什么 React 不采用完整的树 Diff？

**相关题目**：
- [FB-15-FS-P-020 React Diff 算法](#FB-15-FS-P-020)

**参考资源**：
- [React 官方文档 - Reconciliation](https://react.dev/learn/preserving-and-resetting-state)

**口头回答版**：
> Reconciliation 是 React 状态变化后，比较新旧两棵树，算出最小 DOM 更新集合的过程。Diff 算法是这个比较过程用到的算法。React 的 Diff 基于两个假设：不同类型直接重建，子元素用 key 识别。整个过程分 Render 阶段计算差异和 Commit 阶段应用差异，Render 可中断，Commit 不能中断。

---

### FB-15-FS-P-049：React Scheduler 是如何调度任务的？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、Scheduler、Fiber、优先级、时间切片
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请简述 React Scheduler 的作用，以及它是如何决定任务执行和让出主线程的。

**参考答案**：

Scheduler 是 React 内部的任务调度器，负责按优先级调度渲染任务，并把长任务切分成小片执行，避免阻塞主线程。它使用 `requestIdleCallback` 的 polyfill（MessageChannel + 时间切片），在浏览器空闲时执行任务，每帧预留一定时间给 React，超过时间就 yield 给浏览器。高优先级任务（如用户输入）可以打断低优先级任务。Scheduler 还维护一个最小堆优先队列来管理任务。

**评分维度**：
- 能说明 Scheduler 按优先级调度任务（30%）
- 能说明时间切片和让出主线程（30%）
- 能提到 MessageChannel / requestIdleCallback（20%）
- 能说明高优先级打断低优先级（20%）

**常见错误**：
- 认为 Scheduler 使用 setTimeout。
- 认为所有更新都是同步执行的。
- 混淆 Scheduler 和事件循环。

**延伸追问**：
- React 如何计算每帧剩余时间？
- useTransition 的过渡更新是什么优先级？

**相关题目**：
- [FB-15-FS-P-018 React Fiber 架构](#FB-15-FS-P-018)

**参考资源**：
- [React 官方文档 - Scheduler](https://react.dev/learn/thinking-in-react)

**口头回答版**：
> Scheduler 是 React 的任务调度器，它把渲染任务切成小块，利用浏览器空闲时间执行，避免卡住主线程。它用 MessageChannel 模拟 requestIdleCallback，每一帧给 React 分配一点时间，超时就让出主线程。不同更新有不同优先级，用户输入这种高优先级可以打断低优先级的后台任务。

---

### FB-15-FS-P-050：为什么 Hooks 必须在顶层调用？

**题型**：框架原理题 / 概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、Hooks、调用规则、Fiber、链表
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 React 规定 Hooks 必须在函数组件顶层调用、不能在循环或条件中调用的原因。

**参考答案**：

React 通过调用顺序来关联 Hook 状态和 Fiber 节点。每个函数组件对应一个 Fiber，Hooks 以链表形式存储在 `Fiber.memoizedState` 中。每次渲染按相同顺序遍历链表，如果 Hook 调用顺序变化（如在条件或循环中调用），React 无法正确匹配状态，导致状态错位或报错。因此必须保证每次渲染 Hook 调用顺序一致。



**补充说明**：

在实际落地 为什么 Hooks 必须在顶层调用 时，建议结合 React、Hooks、调用规则 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 Hooks 调用规则时，建议结合 React、Hooks 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明 Hooks 按调用顺序匹配状态（40%）
- 能说明 Fiber.memoizedState 链表结构（30%）
- 能解释条件/循环调用导致顺序变化的问题（30%）

**常见错误**：
- 认为 Hooks 是按名字匹配的。
- 在 if 语句中调用 useState。
- 不理解 Fiber 内部结构。

**延伸追问**：
- 多个 useEffect 的执行顺序如何确定？
- 自定义 Hook 内部为什么可以调用 Hook？

**相关题目**：
- [FB-15-CD-A-014 Custom Hook](#FB-15-CD-A-014)

**参考资源**：
- [React 官方文档 - Rules of Hooks](https://react.dev/reference/rules)

**口头回答版**：
> Hooks 必须按固定顺序调用，因为 React 内部靠调用顺序把每个 Hook 和 Fiber 节点里的状态链表对应起来。如果放在 if 或循环里，每次渲染调用顺序可能不一样，React 就找不到对应状态，会报错。所以要把 Hook 写在组件最顶层，保证顺序不变。

---

### FB-15-FS-P-051：React 的双缓冲机制是什么？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、双缓冲、Fiber、current、workInProgress
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 React 中的双缓冲机制，以及 current 和 workInProgress 两棵树的作用。

**参考答案**：

React 使用双缓冲机制维护两棵 Fiber 树：current 树是当前屏幕上已渲染的 UI 对应的 Fiber 树；workInProgress 树是正在计算中的新 UI 对应的树。Render 阶段在 workInProgress 树上进行，不影响 current 树。当 Render 完成并进入 Commit 阶段后，workInProgress 树变为新的 current 树，完成切换。这种机制保证用户不会看到渲染中间状态，也便于中断和恢复渲染。

**评分维度**：
- 能说明 current 和 workInProgress 两棵树（40%）
- 能说明 Render 在 workInProgress 上执行（25%）
- 能说明 Commit 阶段切换两棵树（25%）
- 能解释保证不看到中间状态（10%）

**常见错误**：
- 认为只有一棵树。
- 认为 workInProgress 会直接修改 current。
- 不理解双缓冲和可中断渲染的关系。

**延伸追问**：
- 双缓冲如何提高可恢复性？
- 如果渲染被打断，workInProgress 会被丢弃吗？

**相关题目**：
- [FB-15-FS-P-048 Reconciliation](#FB-15-FS-P-048)

**参考资源**：
- [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)

**口头回答版**：
> React 内部有两棵 Fiber 树，一棵叫 current，是当前屏幕显示的内容；另一棵叫 workInProgress，是正在计算的新内容。Render 阶段在 workInProgress 树上算，算完 Commit 阶段把它变成新的 current。这样用户看不到中间状态，渲染也可以随时中断再恢复。

---

### FB-15-PE-P-052：React 中如何实现虚拟列表优化长列表？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、虚拟列表、性能优化、长列表、react-window
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明虚拟列表的原理，并给出在 React 中实现或使用现有库的方案。

**参考答案**：

虚拟列表只渲染可视区域内的列表项，而不是全部数据。通过计算 scrollTop、viewport 高度和 item 高度，确定当前需要渲染的 item 起始/结束索引，动态更新渲染内容。使用绝对定位或 transform 让可视项处于正确位置。常用库有 react-window、react-virtualized。

实现要点：
1. 计算总高度占位；
2. 监听滚动；
3. 复用 DOM 节点；
4. 处理动态高度。


**补充说明**：

在实际落地 React 中如何实现虚拟列表优化长列表 时，建议结合 React、虚拟列表、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明只渲染可视区元素（30%）
- 能说明计算可见索引的思路（30%）
- 能提到 react-window 等库（20%）
- 能提到动态高度处理（20%）

**常见错误**：
- 认为虚拟列表就是分页。
- 忽略滚动监听性能。
- 没有处理动态高度导致位置跳跃。

**延伸追问**：
- 如何实现动态高度的虚拟列表？
- 虚拟列表和无限滚动如何结合？

**相关题目**：
- [FB-15-SD-R-028 React 性能优化策略](#FB-15-SD-R-028)

**参考资源**：
- [react-window 文档](https://github.com/bvaughn/react-window)

**口头回答版**：
> 虚拟列表就是只渲染当前可视区里的列表项，而不是把所有数据都渲染出来。我们根据滚动位置、容器高度和每项高度，算出该渲染哪些项，然后只渲染这些。常用库有 react-window。关键点是要有一个总高度占位，监听滚动，复用 DOM，动态高度的话还要额外处理。
---

### FB-15-FS-P-053：React Compiler 是什么？它能解决什么问题？

**题型**：框架原理题 / 概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、React Compiler、自动 memoization、性能、编译
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 React Compiler（原 React Forget）的作用、工作原理和注意事项。

**参考答案**：

React Compiler 是 React 团队开发的编译时自动 memoization 工具，目标是在不手动使用 useMemo、useCallback、React.memo 的情况下自动优化组件重渲染。它通过静态分析组件和 Hook 的依赖关系，自动插入记忆化逻辑。注意它目前处于实验/逐步稳定阶段，需要 Babel 插件，且要求代码遵循 React 规则。不能替代良好的组件设计。


**补充说明**：

在实际落地 React Compiler 是什么它能解决什么问题 时，建议结合 React、React Compiler、自动 memoization 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明 React Compiler 是编译时自动优化工具（30%）
- 能说明它自动替代手动 memoization（30%）
- 能说明工作原理是静态分析依赖（25%）
- 能提到需要遵循 React 规则（15%）

**常见错误**：
- 认为 React Compiler 已经成熟可用。
- 认为用了 Compiler 就可以随便写代码。
- 和 React.memo 混淆。

**延伸追问**：
- React Compiler 和手动 useMemo 有什么区别？
- 它如何处理动态依赖？

**相关题目**：
- [FB-15-CO-A-010 useMemo 和 useCallback](#FB-15-CO-A-010)

**参考资源**：
- [React Compiler 官方文档](https://react.dev/learn/react-compiler)

**口头回答版**：
> React Compiler 是 React 出的一个编译时工具，可以自动分析组件依赖并自动做 memoization，这样我们就不用到处写 useMemo、useCallback 了。它还在逐步成熟中，使用时要保证代码符合 React 规则。它不是万能药，好的组件设计依然重要。

---

### FB-15-FS-P-054：React 19 的 use 特性有什么作用？

**题型**：框架原理题 / 概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React 19、use、Suspense、Promise、Context
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 React 19 引入的 use 特性，说明它解决了什么问题。

**参考答案**：

React 19 引入的 `use` 是一个新 API，用于在渲染时读取 Promise 或 Context 的值。它允许组件在渲染过程中消费 Promise 的结果，如果 Promise 未 resolved，会触发最近的 Suspense fallback。它让数据获取和 Suspense 配合更自然，减少样板代码。注意 use 不能在循环或条件中调用，必须在组件或 Hook 内部使用。


**补充说明**：

在实际落地 React 19 的 use 特性有什么作用 时，建议结合 React 19、use、Suspense 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明 use 用于读取 Promise 或 Context（35%）
- 能说明 Promise 未 resolve 会触发 Suspense（30%）
- 能减少数据获取样板代码（20%）
- 能说明调用规则限制（15%）

**常见错误**：
- 认为 use 可以替代所有 useContext。
- 在循环或条件中调用 use。
- 和 useEffect 数据获取混用。

**延伸追问**：
- use 和普通 await 有什么区别？
- use 如何与 Server Components 配合？

**相关题目**：
- [FB-15-FS-P-024 Suspense](#FB-15-FS-P-024)

**参考资源**：
- [React 官方文档 - use](https://react.dev/reference/react/use)

**口头回答版**：
> React 19 的 use 可以让我们在组件里直接读取 Promise 或 Context。如果 Promise 还没 resolve，它会触发 Suspense 显示 fallback。这让数据获取和 Suspense 结合得更自然，代码也更简洁。但它也要遵守 Hooks 的调用规则，不能放在 if 或循环里。

---

### FB-15-PE-P-055：如何优化 React 应用的首屏加载性能？

**题型**：性能优化题 / 场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：15 React
**标签**：React、首屏优化、SSR、SSG、Code Splitting、性能
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请从多个维度说明如何优化 React 应用的首屏加载性能。

**参考答案**：

1. **代码分割**：React.lazy + Suspense、路由懒加载、动态 import。
2. **构建优化**：Tree Shaking、压缩、分包、externals 大库。
3. **服务端渲染/静态生成**：Next.js SSR/SSG 减少白屏。
4. **资源优化**：图片懒加载/压缩、字体预加载、关键 CSS 内联。
5. **网络优化**：HTTP/2、Gzip/Brotli、CDN、预加载关键资源。
6. **减少 Hydration 负担**：延迟非关键组件水合、Server Components。

**评分维度**：
- 能列举代码分割和构建优化（30%）
- 能说明 SSR/SSG 作用（25%）
- 能说明资源和网络优化（25%）
- 能提到减少 Hydration 负担（20%）

**常见错误**：
- 只关注 JS 代码，忽略资源加载。
- 不做测量就优化。
- SSR 后不做 Hydration 优化。

**延伸追问**：
- SSR 和 SSG 各适合什么场景？
- 如何评估首屏优化效果？

**相关题目**：
- [FB-15-SD-R-028 React 性能优化策略](#FB-15-SD-R-028)

**参考资源**：
- [Web Vitals](https://web.dev/vitals/)

**口头回答版**：
> 首屏优化要从几个方面入手：代码上做分割和懒加载；构建时 Tree Shaking、分包压缩；服务端用 SSR 或 SSG 直接出 HTML；资源上优化图片字体、预加载关键资源；网络层面用 CDN、Gzip。React 18/19 还可以用 Server Components 减少 Hydration 负担。优化前一定要先测量。

---

### FB-15-FS-P-056：React 19 还有哪些值得关注的新特性？

**题型**：框架原理题 / 概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：15 React
**标签**：React 19、Server Actions、useOptimistic、Document Metadata、Asset Loading
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请概述 React 19 除 Server Actions 和 useOptimistic 之外的其他重要新特性。

**参考答案**：

React 19 的重要特性包括：
1. Server Actions 和 useActionState / useOptimistic；
2. 新的 use API 读取 Promise 和 Context；
3. 支持在组件中直接写 `<title>`、`<meta>`、`<link>` 等文档元数据；
4. 改进资源加载，支持样式表、脚本、字体的预加载和加载状态管理；
5. ref 可作为 prop 直接传递；
6. 改进 Hydration 错误提示；
7. React Compiler 实验性推进。

这些特性强化了服务端-客户端协作和开发体验。

**评分维度**：
- 能列举 3 个以上 React 19 新特性（40%）
- 能说明文档元数据支持（25%）
- 能说明资源加载改进（20%）
- 能提到 ref 作为 prop 等细节（15%）

**常见错误**：
- 只关注 Server Actions。
- 认为 React 19 是革命性变化。
- 混淆 React 19 特性和 Next.js 特性。

**延伸追问**：
- 文档元数据特性如何影响 SEO？
- React Compiler 在 React 19 中是什么状态？

**相关题目**：
- [FB-15-FS-P-025 React 19 Server Actions](#FB-15-FS-P-025)

**参考资源**：
- [React 19 官方文档](https://react.dev/blog/2024/12/05/react-19)

**口头回答版**：
> React 19 除了 Server Actions 和 useOptimistic，还有 use API、直接在组件里写 title/meta 等文档元数据、更好的样式表和字体资源加载管理、ref 可以作为普通 prop 传递、Hydration 错误提示更友好，以及 React Compiler 的推进。整体是在强化服务端能力和开发体验。

---

### FB-15-SD-R-057：如何设计一个大型 React 前端工程体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、工程化、Monorepo、CI/CD、规范、架构
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请从目录结构、技术选型、规范、构建、测试、发布等方面，说明如何设计大型 React 工程体系。

**参考答案**：

1. **目录结构**：按功能模块或领域分层，避免按类型平铺。
2. **技术选型**：React 18/19 + TypeScript + 状态管理 + 路由 + UI 库。
3. **规范**：ESLint/Prettier + Husky + commitlint + 代码审查。
4. **构建**：Vite/Rspack + 分包 + Tree Shaking + 环境配置。
5. **测试**：Jest/Vitest + React Testing Library + E2E。
6. **发布**：Monorepo + Changesets + CI/CD。
7. **文档**：Storybook/文档站点。
8. **可观测性**：埋点、监控、错误上报。


**补充说明**：

在实际落地 设计一个大型 React 前端工程体系 时，建议结合 React、工程化、Monorepo 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能从多维度系统回答（30%）
- 能说明 Monorepo 和模块边界（25%）
- 能说明 CI/CD 和版本管理（20%）
- 能提到规范和可观测性（25%）

**常见错误**：
- 只关注技术栈，忽略规范和流程。
- 过度设计，引入不必要的复杂度。
- 忽视可测试性。

**延伸追问**：
- Monorepo 和 Multirepo 各适合什么场景？
- 如何防止模块间循环依赖？

**相关题目**：
- [FB-15-SD-R-030 React 组件库设计](#FB-15-SD-R-030)

**参考资源**：
- [React 官方文档 - Thinking in React](https://react.dev/learn/thinking-in-react)

**口头回答版**：
> 大型 React 工程要从目录结构、技术选型、代码规范、构建、测试、发布几个方面系统设计。目录按功能或领域分，技术栈选 React + TypeScript，规范用 ESLint、Prettier、Husky。构建做分包、Tree Shaking。测试覆盖单元、E2E。发布用 Monorepo + Changesets + CI/CD，同时做好文档和监控。

---

### FB-15-SD-R-058：如何设计一个 React SSR/SSG 架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、SSR、SSG、Next.js、Hydration、架构
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个支持 SSR 和 SSG 的 React 应用架构，说明数据流、构建部署和运行时流程。

**参考答案**：

1. **框架选型**：Next.js App Router（RSC + SSR/SSG）或 Remix。
2. **页面类型**：静态页面用 SSG 构建时生成；动态页面用 SSR 或 ISR 按需生成。
3. **数据流**：Server Components 直接获取数据；Client Components 用 SWR/React Query 管理客户端状态。
4. **缓存策略**：CDN、页面缓存、组件级缓存。
5. **Hydration**：Server Components 不水合，Client Components 水合并绑定事件。
6. **部署**：Node.js serverless 或边缘运行时。
7. **降级**：CSR fallback。

**评分维度**：
- 能区分 SSR/SSG/ISR 适用场景（25%）
- 能说明 RSC 和 Client Components 分工（25%）
- 能说明数据流和缓存策略（25%）
- 能说明部署和降级方案（25%）

**常见错误**：
- 所有页面都用 SSR。
- 混淆 RSC 和 SSR。
- 忽略 Hydration 性能开销。

**延伸追问**：
- ISR 和 SSG 的缓存失效策略如何设计？
- 如何防止 SSR 数据泄露？

**相关题目**：
- [FB-15-FS-P-023 React Server Components](#FB-15-FS-P-023)

**参考资源**：
- [Next.js 官方文档 - Rendering](https://nextjs.org/docs/app/building-application/rendering)

**口头回答版**：
> SSR/SSG 架构可以用 Next.js App Router。静态内容用 SSG 构建时生成，动态内容用 SSR 或 ISR。Server Components 直接拿数据，不进客户端 bundle；Client Components 负责交互，客户端再水合。数据流要分清楚服务端状态和客户端状态，缓存用 CDN 和页面缓存，部署可以走 serverless 或边缘节点，同时准备 CSR 降级。
---

### FB-15-SD-R-059：React 应用如何与微服务后端集成？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、微服务、BFF、API Gateway、数据层
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在一个微服务后端环境下，React 前端应如何设计 API 层和数据获取策略？

**参考答案**：

1. **API Gateway/BFF**：通过网关聚合多个微服务接口，前端不直接调用众多微服务。
2. **数据获取**：Server Components 可直接访问 BFF 或数据库；Client Components 用 React Query/SWR 统一管理。
3. **错误处理**：统一错误码、重试、降级。
4. **鉴权**：JWT/Session 在 BFF 层统一处理。
5. **版本管理**：API 版本化和契约测试。
6. **缓存**：服务端缓存、客户端缓存、失效策略。
7. **可观测**：链路追踪、日志、监控。


**补充说明**：

在实际落地 React 应用如何与微服务后端集成 时，建议结合 React、微服务、BFF 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明 API Gateway/BFF 的作用（25%）
- 能说明数据获取和缓存策略（25%）
- 能说明错误处理和鉴权（25%）
- 能提到版本管理和可观测（25%）

**常见错误**：
- 前端直接调用所有微服务。
- 每个页面各自管理请求，缺乏统一层。
- 忽略错误和鉴权统一处理。

**延伸追问**：
- BFF 应该放在前端团队还是后端团队？
- 如何处理微服务接口不一致的数据格式？

**相关题目**：
- [FB-15-SD-R-058 React SSR 架构](#FB-15-SD-R-058)

**参考资源**：
- [React 官方文档 - Server Components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components)

**口头回答版**：
> 微服务后端下，前端不要直接调很多服务，而是通过 API Gateway 或 BFF 聚合。Server Components 可以直接获取数据，Client Components 用 React Query/SWR 管缓存和请求。错误、鉴权、重试在 BFF 或统一层处理，还要做 API 版本管理和链路监控。

---

### FB-15-SD-R-060：大型 React 项目的路由设计应注意什么？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、路由设计、React Router、代码分割、权限
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明大型 React 项目中的路由设计策略，包括代码分割、权限、布局和嵌套路由。

**参考答案**：

1. **路由配置集中化**：用配置文件生成路由，便于维护。
2. **代码分割**：路由级 lazy + Suspense。
3. **权限控制**：路由守卫/高阶组件，结合用户权限做动态过滤。
4. **布局**：嵌套路由 + Layout 组件，区分登录态/业务布局。
5. **路由状态**：URL 作为状态来源，支持分享和刷新。
6. **错误处理**：404/403 统一处理。
7. **历史管理**：Hash/Browser Router 选择、basename。


**补充说明**：

在实际落地 大型 React 项目的路由设计应注意什么 时，建议结合 React、路由设计、React Router 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明路由配置集中化（20%）
- 能说明代码分割和权限控制（25%）
- 能说明布局和嵌套路由（25%）
- 能说明路由状态管理和错误处理（30%）

**常见错误**：
- 路由散落在各组件中。
- 不做路由级权限控制。
- 忽略 URL 作为状态的重要性。

**延伸追问**：
- 如何实现动态路由菜单？
- 路由权限和按钮级权限如何统一？

**相关题目**：
- [FB-15-CO-A-015 React Router v6](#FB-15-CO-A-015)

**参考资源**：
- [React Router 官方文档](https://reactrouter.com/)

**口头回答版**：
> 大型项目路由要集中配置，不要散落。路由级做代码分割，用 lazy + Suspense。权限通过路由守卫或配置过滤。布局用嵌套路由和 Layout 组件区分。URL 本身也是状态，要做好 404/403 处理。选择 Browser Router 还是 Hash Router 要看部署环境。

---

### FB-15-SD-R-061：如何设计 React 组件库的 Monorepo 架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、组件库、Monorepo、pnpm、Changesets、架构
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何用 Monorepo 管理 React 组件库，包括包划分、构建、测试和发布。

**参考答案**：

1. **工具**：pnpm workspace + Turborepo/Rspack。
2. **包划分**：core（通用组件）、theme（主题/token）、icons、utils、docs、playground。
3. **构建**：每个包输出 ESM/CJS/UMD + d.ts，配置 exports。
4. **测试**：统一测试配置，组件用 React Testing Library。
5. **文档**：Storybook 或 VitePress。
6. **版本**：Changesets 管理多包版本和 changelog。
7. **CI**：自动测试、构建、发布到 npm。
8. **依赖**：内部包通过 workspace 协议引用。

**评分维度**：
- 能说明 Monorepo 工具选型（20%）
- 能说明包划分策略（25%）
- 能说明构建和类型输出（20%）
- 能说明版本管理和 CI（20%）
- 能提到 workspace 依赖（15%）

**常见错误**：
- 所有组件放一个包导致 Tree Shaking 困难。
- 不输出类型定义。
- 版本管理混乱。

**延伸追问**：
- 如何设计包之间的依赖边界？
- 组件库如何实现按需引入？

**相关题目**：
- [FB-15-SD-R-030 React 组件库设计](#FB-15-SD-R-030)

**参考资源**：
- [pnpm workspaces](https://pnpm.io/workspaces)

**口头回答版**：
> 组件库 Monorepo 可以用 pnpm workspace 加 Turborepo。包拆成 core、theme、icons、utils、docs 等。每个包输出 ESM/CJS/UMD 和 d.ts。测试统一用 React Testing Library，文档用 Storybook。版本用 Changesets 管理 changelog 和发布，CI 自动化。内部包用 workspace 协议引用，避免版本冲突。

---

### FB-15-SD-R-062：React 项目中 TypeScript 架构规范应如何制定？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、TypeScript、架构规范、类型设计、代码质量
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明在大型 React 项目中如何制定 TypeScript 规范，提升可维护性。

**参考答案**：

1. **严格模式**：开启 strict、noImplicitAny、strictNullChecks。
2. **类型设计**：组件 props 用 interface，业务模型用 type，避免 any。
3. **组件类型**：泛型组件、forwardRef 类型、render props 类型。
4. **API 类型**：自动生成后端接口类型（OpenAPI/Swagger）。
5. **工具链**：tsconfig 分层、path alias、类型检查纳入 CI。
6. **共享类型**：公共类型放到 shared 包。
7. **命名规范**：PascalCase 组件、camelCase 变量。
8. **文档**：复杂类型加注释。


**补充说明**：

在实际落地 React 项目中 TypeScript 架构规范应如何制定 时，建议结合 React、TypeScript、架构规范 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明严格模式和禁止 any（25%）
- 能说明组件和 API 类型设计（25%）
- 能说明类型检查和 CI 集成（20%）
- 能说明共享类型和命名规范（20%）
- 能提到自动生成类型（10%）

**常见错误**：
- 大量使用 any 绕过类型检查。
- tsconfig 配置不严格。
- 类型和业务逻辑分散。

**延伸追问**：
- 如何处理第三方库缺少类型定义？
- 类型体操是否越多越好？

**相关题目**：
- [FB-15-SD-R-057 React 工程体系](#FB-15-SD-R-057)

**参考资源**：
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)

**口头回答版**：
> 大型 React 项目 TS 规范要开严格模式，禁止滥用 any。组件 props 用 interface，业务模型定义清楚，泛型组件和 ref 类型也要处理好。后端接口类型可以自动生成。tsconfig 做分层，path alias 管理好，类型检查进 CI。公共类型放 shared 包，命名统一。

---

### FB-15-SD-R-063：如何设计一个基于 React 的 AI 应用前端架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、AI、SSE、流式输出、RAG、架构
**出现频率**：低频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个基于 React 的 AI 对话应用前端架构，包括数据流、流式输出、状态管理和错误处理。

**参考答案**：

1. **架构分层**：UI 层、会话管理层、AI 服务层。
2. **流式输出**：SSE（Server-Sent Events）或 WebSocket，逐步渲染 AI 回复。
3. **状态管理**：会话历史、当前消息、流式 token。
4. **渲染**：Markdown 渲染 + 代码高亮 + 安全消毒。
5. **中断/重试**：AbortController 中断请求，支持重新生成。
6. **错误处理**：网络错误、模型错误、内容审核。
7. **性能**：虚拟化长对话、防抖输入、消息缓存。
8. **扩展**：插件系统、RAG 上下文展示。


**补充说明**：

在实际落地 设计一个基于 React 的 AI 应用前端架构 时，建议结合 React、AI、SSE 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明流式输出技术选型（25%）
- 能说明状态管理和消息渲染（25%）
- 能说明中断重试和错误处理（25%）
- 能提到安全和性能（25%）

**常见错误**：
- 用普通 HTTP 请求等待完整响应。
- 不做流式状态管理。
- 直接渲染 AI 返回的 HTML/Markdown 不消毒。

**延伸追问**：
- SSE 和 WebSocket 各适合什么场景？
- 如何实现 AI 消息的后撤销和分支？

**相关题目**：
- [FB-15-FS-P-023 React Server Components](#FB-15-FS-P-023)

**参考资源**：
- [Vercel AI SDK](https://sdk.vercel.ai/docs)

**口头回答版**：
> AI 对话应用前端要分层设计：UI、会话管理、AI 服务。流式输出用 SSE 或 WebSocket，逐步显示 AI 回复。状态要管理好会话历史、当前消息和 token 流。渲染 Markdown 要消毒，支持代码高亮。还要有中断、重试、错误处理，长对话要做虚拟化。

---

### FB-15-SD-R-064：React 跨平台方案如何选型？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、跨平台、React Native、Taro、Electron、选型
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请对比 React 生态中常见的跨平台方案，并给出选型建议。

**参考答案**：

常见方案：
1. **React Native**：原生移动端，性能接近原生，生态成熟。
2. **Taro / Remax**：小程序跨端，一套代码跑多端小程序。
3. **React Native Web**：RN 同时输出 Web。
4. **Electron + React**：桌面端。
5. **Next.js / React**：Web 端。

选型依据：目标平台、团队能力、性能要求、生态成熟度、维护成本。移动端优先且追求性能选 RN；要同时覆盖小程序选 Taro；桌面应用选 Electron；Web 用 Next.js。


**补充说明**：

在实际落地 React 跨平台方案如何选型 时，建议结合 React、跨平台、React Native 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能对比至少 4 种跨平台方案（30%）
- 能说明各方案适用平台（25%）
- 能给出选型依据（25%）
- 能提到维护成本和团队能力（20%）

**常见错误**：
- 所有平台强行用一套方案。
- 忽略性能差异。
- 不考虑团队技术栈。

**延伸追问**：
- Taro 和 React Native 的实现原理有什么不同？
- 如何设计跨端组件库？

**相关题目**：
- [FB-15-SD-R-030 React 组件库设计](#FB-15-SD-R-030)

**参考资源**：
- [React Native 官方文档](https://reactnative.dev/)

**口头回答版**：
> React 跨平台方案要看目标平台。移动端原生用 React Native；小程序用 Taro 或 Remax；桌面端用 Electron + React；Web 用 Next.js。选型看平台、性能、团队熟悉度和维护成本。不要强行一套代码跑所有端，不同端差异很大。

---

### FB-15-SD-R-065：React 项目的可观测性体系如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：15 React
**标签**：React、可观测性、监控、埋点、错误上报、性能
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何为 React 应用构建可观测性体系，包括错误监控、性能监控、埋点和日志。

**参考答案**：

1. **错误监控**：Error Boundary + Sentry 等工具捕获运行时错误，收集组件堆栈。
2. **性能监控**：Web Vitals（LCP、INP、CLS）、React Profiler、长任务监控。
3. **埋点**：页面曝光、点击、转化事件，统一封装埋点组件/HOC/Hook。
4. **日志**：结构化日志、日志级别、采样、脱敏。
5. **用户行为**：录屏、热力图、链路追踪。
6. **告警**：阈值告警、异常趋势。
7. **数据平台**：统一看板、下钻分析。


**补充说明**：

在实际落地 React 项目的可观测性体系如何设计 时，建议结合 React、可观测性、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能说明错误监控方案（25%）
- 能说明性能监控指标（25%）
- 能说明埋点体系（25%）
- 能说明日志和告警（25%）

**常见错误**：
- 只监控错误，不监控性能。
- 埋点散落在业务代码中难以维护。
- 忽略用户隐私和数据脱敏。

**延伸追问**：
- 如何减少监控脚本对性能的影响？
- 前端错误上报如何防止重复？

**相关题目**：
- [FB-15-CO-A-017 Error Boundary](#FB-15-CO-A-017)

**参考资源**：
- [Web Vitals](https://web.dev/vitals/)

**口头回答版**：
> React 项目可观测性包括错误监控、性能监控、埋点和日志。错误用 Error Boundary + Sentry；性能看 Web Vitals 和 Profiler；埋点要统一封装，页面曝光点击转化都覆盖；日志结构化并做采样和脱敏。还要有告警和统一看板，帮助快速定位问题。


























### FB-15-CO-B-039：React 中的 SyntheticEvent 和 NativeEvent 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、合成事件、SyntheticEvent、NativeEvent
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 React 中的 SyntheticEvent 和原生 DOM 事件（NativeEvent）的区别。

**参考答案**：

一、SyntheticEvent：

1. React 基于 W3C 规范封装了跨浏览器兼容的事件对象。
2. 采用事件委托，所有事件统一挂载到 root 容器。
3. 事件对象会被复用（React 17 之前），访问异步需调用 `e.persist()`。
4. 提供与原生事件类似的 API，如 `e.stopPropagation()`、`e.preventDefault()`。

二、NativeEvent：

1. 浏览器原生事件对象。
2. 不同浏览器可能存在差异。
3. 通过 `e.nativeEvent` 可以访问。

三、主要区别：

| 特性 | SyntheticEvent | NativeEvent |
|------|----------------|-------------|
| 跨浏览器 | 统一封装 | 有差异 |
| 事件委托 | 是 | 否 |
| 事件池（React <17） | 有 | 无 |
| 性能优化 | React 统一管理 | 需手动管理 |

四、注意事项：

- React 17 之前异步访问 event 属性需要先 `e.persist()`。
- React 17+ 使用原生事件委托到 root，SyntheticEvent 不再复用。
- 混合使用原生事件和 React 事件时要注意事件传播阶段。

**评分维度**：
- 说明 SyntheticEvent 封装（35%）
- 说明事件委托（25%）
- 说明与 NativeEvent 区别（25%）
- 提到 React 17 变化（15%）

**常见错误**：
- 认为 SyntheticEvent 就是 NativeEvent 的简单别名
- 在异步回调中直接访问 React 16 的 event 属性

**口头回答版**：
> SyntheticEvent 是 React 封装的跨浏览器兼容事件对象，所有事件通过事件委托挂到 root 容器。它提供和原生事件类似的 API，但会被复用（React 17 前）。原生事件通过 `e.nativeEvent` 访问。React 17 后 SyntheticEvent 不再复用，事件委托到 root。

---

### FB-15-CO-B-040：什么是 React 的 Batch Update？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、Batch Update、状态更新、性能
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 React 中的 Batch Update（批量更新）机制，以及 React 18 的改进。

**参考答案**：

Batch Update 指 React 将多个状态更新合并为一次重新渲染，避免每次 setState 都触发 render，从而提升性能。

React 17 及之前：

- 仅在 React 合成事件和生命周期中自动批量更新。
- 在 setTimeout、Promise、原生事件中不会批量更新。

```js
// React 17：setTimeout 中两次 setState 会触发两次 render
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f); // 两次 render
}, 0);
```

React 18：

- 引入 Automatic Batching，默认在任何情况下都批量更新。
- setTimeout、Promise、原生事件中也会自动合并。
- 使用 `flushSync` 可强制同步刷新。

```js
// React 18：自动 batching，只触发一次 render
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f); // 一次 render
}, 0);
```

注意事项：

- Automatic Batching 是 React 18 的 breaking change 之一。
- 如果需要立即读取 DOM，使用 `flushSync`。

**评分维度**：
- 说明 batch update 含义（40%）
- React 17 的限制（25%）
- React 18 automatic batching（25%）
- flushSync 使用（10%）

**常见错误**：
- 认为 setState 每次都会立即更新
- 在 React 18 中滥用 flushSync

**口头回答版**：
> Batch Update 就是 React 把多次 setState 合并成一次重新渲染。React 17 只在合成事件和生命周期里自动 batch，setTimeout 和 Promise 里不会。React 18 改成 Automatic Batching，任何地方都默认合并，用 flushSync 可以强制同步刷新。

---

### FB-15-CO-B-041：React 中 useLayoutEffect 和 useEffect 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、useEffect、useLayoutEffect、Hooks
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `useEffect` 和 `useLayoutEffect` 的区别和使用场景。

**参考答案**：

一、执行时机：

- `useEffect`：在浏览器绘制之后异步执行，不会阻塞渲染。
- `useLayoutEffect`：在浏览器绘制之前同步执行，会阻塞渲染。

二、使用场景：

- **useEffect**：
  - 数据获取。
  - 订阅和取消订阅。
  - 大多数副作用处理。

- **useLayoutEffect**：
  - 需要同步测量 DOM 尺寸并调整布局。
  - 防止 UI 闪烁，如根据元素宽度设置 tooltip 位置。
  - 需要确保在绘制前完成 DOM 修改。

三、代码示例：

```jsx
useLayoutEffect(() => {
  const { width } = ref.current.getBoundingClientRect();
  setTooltipLeft(width / 2);
}, []);
```

四、注意事项：

- `useLayoutEffect` 在 SSR 中不会执行，因为服务端没有 DOM 绘制。
- 过度使用 `useLayoutEffect` 会导致性能问题，因为它阻塞绘制。
- 优先使用 `useEffect`，只有在出现闪烁或需要同步测量时才用 `useLayoutEffect`。

**评分维度**：
- 说明执行时机区别（40%）
- 使用场景区分（35%）
- SSR 注意事项（15%）
- 性能影响（10%）

**常见错误**：
- 所有副作用都用 useLayoutEffect
- 在 SSR 中使用 useLayoutEffect 导致 warning

**口头回答版**：
> useEffect 在浏览器绘制后异步执行，不阻塞渲染；useLayoutEffect 在绘制前同步执行，会阻塞渲染。普通副作用用 useEffect，需要同步测量 DOM 或防止闪烁才用 useLayoutEffect。SSR 里 useLayoutEffect 不会执行，要小心。

---

### FB-15-CO-B-042：什么是 React 的 controlled input 的注意事项？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、受控组件、input、表单
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 React 中受控 input 的注意事项和常见问题。

**参考答案**：

一、基本写法：

```jsx
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />
```

二、常见问题：

1. **value 为 undefined 时变为非受控**：
   - 如果初始 value 是 `undefined`，React 会报错或视为非受控。
   - 解决：初始值用空字符串 `''`。

2. **number input 的值类型**：
   - `e.target.value` 始终是字符串。
   - 需要数字时手动 `Number(e.target.value)`。

3. **checkbox/radio 的处理**：
   - checkbox 用 `checked` 而不是 `value`。
   - radio 用 `checked={value === option.value}`。

4. **中文输入法合成事件**：
   - 使用 `onCompositionStart`/`onCompositionEnd` 处理中文输入。
   - 或在需要时结合 `input` 的 `type` 和 `maxLength`。

5. **性能优化**：
   - 大量输入时可用 `useDeferredValue` 或防抖。

三、最佳实践：

- 表单复杂时使用 React Hook Form 或 Formik。
- 统一封装 Form 组件，抽象受控逻辑。

**评分维度**：
- 基本写法（20%）
- 常见问题覆盖（50%）
- 最佳实践（20%）
- 性能意识（10%）

**常见错误**：
- value 初始为 undefined
- 把 checkbox 当普通 input 处理

**口头回答版**：
> 受控 input 要把 value 和 onChange 绑定。注意初始值别给 undefined，要用空字符串。number input 的 value 是字符串，checkbox 用 checked。中文输入要考虑合成事件。复杂表单用 React Hook Form 管理。

---

### FB-15-CO-B-043：React 中如何实现组件懒加载？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、lazy、Suspense、代码分割
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 React 中实现组件懒加载的方式和注意事项。

**参考答案**：

一、React.lazy + Suspense：

```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

二、基于路由的懒加载：

```jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));

<Route path="/dashboard" element={<Suspense fallback={<Loading />}><Dashboard /></Suspense>} />
```

三、注意事项：

1. **fallback 体验**：
   - 避免 fallback 闪烁，可用 `startTransition` 降低优先级。

2. **错误处理**：
   - 配合 Error Boundary 捕获加载失败。

3. **SSR 兼容**：
   - React.lazy 不支持 SSR，可用 `@loadable/component` 或 Next.js dynamic import。

4. **预加载**：
   - 在用户 hover 或接近页面时预加载组件。
   - `const Component = lazy(() => import('./Component')); Component.preload?.();`

5. **命名导出**：
   - React.lazy 需要 default export，命名导出需要转换：
     ```js
     lazy(() => import('./Component').then(m => ({ default: m.NamedComponent })))
     ```

**评分维度**：
- 说明 lazy + Suspense（40%）
- 路由懒加载（20%）
- 注意事项（40%）

**常见错误**：
- 懒加载组件没有在 Suspense 内使用
- SSR 项目直接使用 React.lazy

**口头回答版**：
> React 里用 `React.lazy` 加 `Suspense` 做组件懒加载，配合路由可以实现按页面分割。要注意 fallback 体验、用 Error Boundary 捕获加载失败、SSR 里不能用 React.lazy 要用 loadable 或 Next dynamic。还可以预加载，比如 hover 时提前加载。

---

### FB-15-CO-B-044：什么是 React 的 key prop 的最佳实践？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、key、列表渲染、diff
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 React 中 key prop 的作用和最佳实践。

**参考答案**：

一、key 的作用：

1. 帮助 React 在 diff 过程中识别哪些元素是新增、删除、移动。
2. 没有 key 或 key 不稳定时，React 会按顺序比较，导致状态错乱或性能下降。

二、最佳实践：

1. **使用稳定唯一标识**：
   - 优先使用数据 ID，如 `key={item.id}`。
   - 不要用 `key={index}`，除非列表是纯展示且不会重新排序。

2. **避免使用随机数或 Math.random()**：
   - 每次渲染 key 都会变，导致组件每次都重新挂载。

3. **同一列表内 key 唯一**：
   - 不同列表的 key 可以重复，但同一列表内必须唯一。

4. **不要用 key 传业务数据**：
   - key 只用于 React 内部 diff，不应在子组件中读取。

三、常见错误示例：

```jsx
// 不好
items.map((item, index) => <Item key={index} />)

// 好
items.map(item => <Item key={item.id} />)
```

四、特殊场景：

- 表单列表：key 尤其重要，错误的 key 会导致输入框状态错乱。
- 可排序列表：key 必须是数据唯一 ID。

**评分维度**：
- 说明 key 作用（30%）
- 最佳实践（50%）
- 特殊场景（20%）

**常见错误**：
- 用 index 作为 key 导致状态错乱
- 用随机数作为 key 导致不必要的重新挂载

**口头回答版**：
> React 的 key 帮助 diff 识别元素身份，要用稳定唯一 ID，比如 `item.id`，不要用 index 或随机数。同一列表内 key 必须唯一，不同列表可以重复。key 只给 React 用，不要在子组件里读取。表单和可排序列表尤其要注意 key。

---

### FB-15-CO-B-045：React 中 context 的 Provider 嵌套过多怎么办？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：15 React
**标签**：React、Context、Provider、嵌套
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
当 React 应用中有大量 Context Provider 嵌套时，如何优化代码结构？

**参考答案**：

一、问题：

大量 Provider 嵌套会导致 JSX 层级深、可读性差、维护困难：

```jsx
<ThemeProvider>
  <UserProvider>
    <LocaleProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </LocaleProvider>
  </UserProvider>
</ThemeProvider>
```

二、解决方案：

1. **合并相关 Context**：
   - 如果多个 Context 经常一起使用，合并为一个 AppContext。

2. **使用 Provider Composer**：
   ```tsx
   const providers = [ThemeProvider, UserProvider, LocaleProvider];
   <Compose providers={providers}><App /></Compose>
   ```

3. **Redux/Zustand 等状态管理**：
   - 全局状态不需要每个都建 Context。

4. **自定义 render 函数**：
   - 将 Provider 组合封装到 `renderApp` 函数中。

三、注意事项：

- 不要为了消除嵌套而合并不相关的 Context，导致组件不必要重渲染。
- 高频变化的 Context 应单独拆分，避免影响无关组件。

**评分维度**：
- 说明嵌套问题（20%）
- 合并 Provider（25%）
- Composer 模式（25%）
- 状态管理替代（20%）
- 注意事项（10%）

**常见错误**：
- 把所有 Context 合并成一个巨大的 Context
- 忽略 Context 更新导致的性能问题

**口头回答版**：
> Provider 嵌套过多可以把相关的 Context 合并，或者用 Provider Composer 模式简化 JSX。全局状态也可以用 Redux、Zustand 替代部分 Context。但不要为了消嵌套把所有 Context 合成一个，否则更新时会导致大量组件重渲染。

---

### FB-15-CO-A-048：如何优化 React 组件的 re-render？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、re-render、性能优化、memo
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明优化 React 组件 re-render 的常见手段。

**参考答案**：

一、减少不必要的 re-render：

1. **React.memo**：
   - 对函数组件进行浅比较，props 不变不渲染。
   - 配合 `useMemo`/`useCallback` 稳定引用。

2. **useMemo / useCallback**：
   - 缓存计算结果和函数引用。
   - 注意：不要为了用而用，只有当确实造成子组件 re-render 或计算昂贵时使用。

3. **拆分组件**：
   - 把频繁更新的局部状态隔离到小组件中。
   - 避免一个大组件因为局部状态变化整体重渲染。

二、优化状态管理：

1. **Context 拆分**：
   - 把高频变化的 state 和稳定的 state 分到不同 Context。
   - 或使用原子化状态管理（Jotai、Recoil）。

2. **选择器优化**：
   - Redux 中使用 `createSelector`。
   - Zustand 中使用 selector 函数。

三、避免反模式：

1. 不要在 render 中创建新对象/函数/数组作为 props。
2. 避免在 useEffect 中 setState 导致循环渲染。
3. 谨慎使用 context value 直接传一个大对象。

四、工具辅助：

- React DevTools Profiler：定位 re-render 原因。
- `why-did-you-render`：开发环境检测不必要渲染。

**评分维度**：
- memo/useMemo/useCallback 使用（35%）
- 组件拆分（20%）
- 状态管理优化（25%）
- 反模式和工具（20%）

**常见错误**：
- 所有组件都包 React.memo
- 父组件传内联函数导致 memo 失效

**口头回答版**：
> 优化 re-render 可以用 React.memo 包函数组件，配合 useMemo/useCallback 稳定引用。把频繁更新的状态拆成小组件，Context 也按更新频率拆分。不要在 render 里创建新对象传 props。用 React DevTools Profiler 和 why-did-you-render 定位问题。

---

### FB-15-CO-A-049：React 中如何正确获取异步数据？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、异步数据、useEffect、数据获取
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React 中获取异步数据的最佳实践和常见陷阱。

**参考答案**：

一、基本方式：

```jsx
useEffect(() => {
  let cancelled = false;
  async function fetchData() {
    const res = await api.getUser(id);
    if (!cancelled) {
      setUser(res.data);
    }
  }
  fetchData();
  return () => { cancelled = true; };
}, [id]);
```

二、竞态问题：

- 如果用户快速切换 ID，先发出的请求可能后返回，导致状态被旧数据覆盖。
- 解决：使用取消令牌、AbortController 或标记是否已卸载/已过期。

三、使用 AbortController：

```jsx
useEffect(() => {
  const controller = new AbortController();
  api.getUser(id, { signal: controller.signal });
  return () => controller.abort();
}, [id]);
```

四、数据获取库推荐：

- **React Query / TanStack Query**：缓存、去重、重试、后台刷新。
- **SWR**：轻量、支持 SSR。
- **RTK Query**：与 Redux 生态集成。

五、Suspense 模式：

- React 18 支持 Suspense for Data Fetching（配合 React Query 或框架）。
- 数据获取逻辑上提到组件渲染流程，配合 `<Suspense>` 和 `<ErrorBoundary>`。

六、常见陷阱：

1. 在 useEffect 中直接使用 async 函数作为回调（useEffect 不支持返回 Promise）。
2. 没有处理竞态和取消。
3. 没有 loading/error 状态管理。

**评分维度**：
- 基本写法正确（25%）
- 竞态处理（25%）
- 数据获取库（20%）
- Suspense 模式（15%）
- 常见陷阱（15%）

**常见错误**：
- useEffect 直接 async
- 没有处理请求竞态

**口头回答版**：
> React 里获取异步数据可以在 useEffect 里写 async 函数，用 cancelled 标志或 AbortController 处理竞态和取消。推荐用 React Query 或 SWR，它们自带缓存、去重、重试。React 18 还可以配合 Suspense for Data Fetching。要注意不要在 useEffect 回调上直接 async。

---

### FB-15-CO-A-050：如何使用 useRef 操作 DOM？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、useRef、DOM、Hooks
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 React 中 useRef 操作 DOM 的方式和注意事项。

**参考答案**：

一、基本用法：

```jsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);

return <input ref={inputRef} />;
```

二、forwardRef 传递 ref：

```tsx
const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

三、useImperativeHandle 暴露自定义方法：

```tsx
useImperativeHandle(ref, () => ({
  focus: () => {
    inputRef.current.focus();
  },
  clear: () => {
    inputRef.current.value = '';
  }
}));
```

四、注意事项：

1. ref.current 在渲染阶段可能为 null，应在 useEffect 或事件回调中访问。
2. 不要通过 ref 读取 state 来触发渲染，应使用 state。
3. ref 更新不会触发 re-render，适合保存不需要响应式的值。
4. React 19 中 ref 可以作为 prop 直接传递，不再需要 forwardRef。

五、常见场景：

- 聚焦输入框。
- 测量 DOM 尺寸。
- 集成第三方非 React 库。
- 保存上一轮 props/state。

**评分维度**：
- 基本用法（30%）
- forwardRef（20%）
- useImperativeHandle（20%）
- 注意事项（20%）
- React 19 变化（10%）

**常见错误**：
- 在 render 阶段直接访问 ref.current
- 用 ref 保存需要响应式的值

**口头回答版**：
> useRef 可以获取 DOM 引用，比如聚焦输入框。封装组件时用 forwardRef 把 ref 传下去，需要用 useImperativeHandle 暴露自定义方法。注意 ref.current 在渲染阶段可能为 null，要在 useEffect 或事件里访问。ref 不会触发 re-render。React 19 可以直接把 ref 当 prop 传。

---

### FB-15-CO-A-051：React 中 useMemo 的依赖项注意事项？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、useMemo、依赖项、Hooks
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 React 中 useMemo 依赖项的写法规则和常见错误。

**参考答案**：

一、依赖项规则：

1. 依赖项数组必须包含 useMemo 回调中使用的所有响应式值。
2. 响应式值包括：props、state、context、其他 hooks 返回值。
3. 不包含在 render 中变化的值（如普通变量）可以不加。

二、eslint-plugin-react-hooks：

- 使用 `eslint-plugin-react-hooks` 的 `exhaustive-deps` 规则自动检查。
- 不要无条件禁用该规则。

三、常见错误：

1. **遗漏依赖**：
   ```js
   // 错误：缺少 count
   const doubled = useMemo(() => count * 2, []);
   ```

2. **依赖过多导致频繁重新计算**：
   - 如果依赖是对象，每次 render 都是新引用，导致 useMemo 失效。
   - 解决：拆分依赖、使用 memoization。

3. **依赖函数**：
   - 函数每次 render 都是新引用。
   - 用 useCallback 包裹，或把函数定义在 useMemo 内部。

四、最佳实践：

- 不是所有计算都需要 useMemo，简单计算直接用就行。
- 依赖项应稳定可预测。
- 当依赖项复杂时，考虑拆分组件或调整数据结构。

**评分维度**：
- 依赖项规则（40%）
- eslint 工具（15%）
- 常见错误（30%）
- 最佳实践（15%）

**常见错误**：
- 遗漏依赖导致 stale closure
- 过度使用 useMemo

**口头回答版**：
> useMemo 依赖项要包含回调里用到的所有响应式值，props、state、context 这些。用 eslint-plugin-react-hooks 的 exhaustive-deps 检查。常见错误是漏依赖、依赖对象导致每次 render 都重新计算、依赖函数。不是所有计算都要 useMemo，简单计算直接用。

---

### FB-15-CO-A-052：什么是 React 的 lifting state up？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、状态提升、lifting state up、数据流
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 React 中的“状态提升”（Lifting State Up），并说明使用场景。

**参考答案**：

状态提升指把多个组件共享的状态从子组件提升到最近的共同父组件中管理，通过 props 向下传递 state 和回调函数。

使用场景：

1. 多个子组件需要同步显示同一数据。
2. 一个组件的修改需要影响另一个组件。

示例：

```jsx
function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Display value={value} />
    </>
  );
}
```

优点：

1. 数据来源单一，便于调试。
2. 避免多个本地 state 不同步。
3. 符合 React 单向数据流。

缺点：

1. 层级过深时 props drilling 严重。
2. 大量状态提升会导致父组件臃肿。

替代方案：

- 使用 Context 或状态管理库（Redux、Zustand、Jotai）。

**评分维度**：
- 说明状态提升含义（35%）
- 使用场景（25%）
- 优缺点（25%）
- 替代方案（15%）

**常见错误**：
- 所有状态都提升到根组件
- 明明不共享的状态也被提升

**口头回答版**：
> Lifting state up 就是把多个子组件共享的状态放到它们最近的共同父组件里管，通过 props 传下去。适合两个子组件要同步同一个数据的场景。层级太深会 props drilling，可以用 Context 或状态管理库替代。

---

### FB-15-CA-A-043：分析一个 useEffect 依赖问题

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、useEffect、依赖项、代码分析
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请分析下面代码的问题，并说明如何修复。

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const res = await fetchUser(userId);
    setUser(res);
  }, []);

  return <div>{user?.name}</div>;
}
```

**参考答案**：

问题：

1. **useEffect 回调不能直接是 async 函数**：
   - useEffect 的返回函数用于清理，async 函数会返回 Promise，可能导致异常处理混乱。

2. **依赖项缺失**：
   - 依赖数组为空 `[]`，但内部使用了 `userId`。
   - 当 `userId` 变化时，useEffect 不会重新执行，导致显示旧用户数据。

3. **没有清理/取消机制**：
   - 快速切换 userId 时，可能出现竞态问题。

修复后：

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      const res = await fetchUser(userId);
      if (!cancelled) setUser(res);
    }

    fetchData();

    return () => { cancelled = true; };
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

进一步改进：

- 使用 React Query/SWR 处理数据获取。
- 使用 AbortController 取消请求。

**评分维度**：
- 指出 async 回调问题（30%）
- 指出依赖项缺失（35%）
- 给出修复代码（25%）
- 提到竞态处理（10%）

**常见错误**：
- 只修复依赖项，没处理 async
- 修复后仍没有取消机制

**口头回答版**：
> 这段代码有三个问题：useEffect 回调不能直接用 async，因为返回的 Promise 不能当清理函数；依赖项缺了 userId，id 变了不会重新获取；没有取消机制会竞态。修复是在 useEffect 内部定义 async 函数，依赖数组加 userId，用 cancelled 标志处理竞态。更好是用 React Query。

---

### FB-15-CD-A-046：请手写一个 useThrottle Hook

**题型**：代码实现题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、useThrottle、Hook、性能
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请手写一个 `useThrottle` Hook，并说明使用场景。

**参考答案**：

```tsx
import { useEffect, useRef, useState } from 'react';

function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - lastExecuted.current;

    if (timeElapsed >= delay) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, delay - timeElapsed);

      return () => clearTimeout(timer);
    }
  }, [value, delay]);

  return throttledValue;
}
```

使用场景：

1. 滚动事件处理，限制高频触发。
2. 窗口 resize 监听。
3. 搜索输入实时请求，但不想每输入一个字符都请求。

与 useDebounce 区别：

- throttle：固定间隔执行一次。
- debounce：停止触发后延迟执行。

测试要点：

- 立即执行第一次。
- 在 delay 内多次更新只保留最后一次。
- 组件卸载时清理定时器。

**评分维度**：
- 实现正确（40%）
- 清理函数（20%）
- 使用场景（20%）
- 与 debounce 区别（20%）

**常见错误**：
- 没有清理定时器导致内存泄漏
- 首次更新没有立即执行

**口头回答版**：
> useThrottle 就是固定间隔内只执行一次。实现时用 useState 存节流后的值，useRef 记录上次执行时间。如果距离上次超过 delay 就立即更新，否则设定时器。使用场景有滚动、resize、搜索输入。要注意卸载时清定时器。和 debounce 区别是 throttle 固定间隔执行，debounce 是停止后才执行。

---

### FB-15-FS-P-057：React 18 的 automatic batching 原理是什么？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React 18、automatic batching、Scheduler、性能
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 React 18 automatic batching 的实现原理。

**参考答案**：

一、背景：

React 17 及之前，batching 只在 React 事件处理函数和生命周期中发生。setTimeout、Promise、原生事件中的 setState 会同步触发多次 render。

二、React 18 改进：

React 18 把所有 setState 调用都放到一个统一的调度周期中处理，无论它发生在什么上下文。

三、实现原理：

1. **统一的事件循环处理**：
   - React 18 在每次事件循环的末尾检查是否有待处理的更新。
   - 所有更新合并到一个 task 中，统一调度。

2. **Scheduler 优先级**：
   - React 使用 Scheduler 包管理任务优先级。
   - 默认更新是连续优先级（DefaultLane），多个 setState 会合并。

3. **Lane 模型**：
   - 每次 setState 不立即进入 render，而是标记对应的 lane。
   - 在合适的时机统一消费这些 lanes。

4. **flushSync**：
   - 特殊 API 可以跳过 batching，强制同步刷新。

四、效果：

```js
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 18：只 render 一次
}, 0);
```

五、注意事项：

- Automatic Batching 是默认行为，不需要额外配置。
- 如果测试或某些场景依赖同步更新，需要改用 `flushSync`。

**评分维度**：
- 说明 React 17 限制（20%）
- 统一事件循环处理（30%）
- Scheduler 和 Lane（30%）
- flushSync（10%）
- 示例（10%）

**常见错误**：
- 认为 automatic batching 只影响 useState
- 忽略 flushSync 的存在

**口头回答版**：
> React 18 automatic batching 是把所有 setState 放到一个调度周期里处理。原理是 React 在事件循环末尾检查待处理更新，用 Scheduler 和 Lane 模型合并优先级相同的更新，统一 render。flushSync 可以强制同步。这样 setTimeout、Promise 里的多次 setState 也只会 render 一次。

---

### FB-15-FS-P-058：React 的 useDeferredValue 使用场景是什么？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、useDeferredValue、Concurrent、性能
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 `useDeferredValue` 的使用场景，并对比 `useTransition`。

**参考答案**：

一、useDeferredValue 作用：

让一个状态值延迟更新，优先渲染更紧急的内容。常用于保持 UI 响应性，同时避免滞后输入。

二、典型场景：

1. **搜索输入 + 大数据列表过滤**：
   - 输入框的 value 立即更新，保证输入不卡顿。
   - 过滤后的列表使用 deferred value，允许先展示旧列表。

```jsx
const [text, setText] = useState('');
const deferredText = useDeferredValue(text);

// 输入框用 text，列表过滤用 deferredText
```

2. **图表/复杂可视化随数据变化重绘**：
   - 控制参数立即响应，复杂渲染延后。

三、与 useTransition 区别：

| 特性 | useDeferredValue | useTransition |
|------|------------------|---------------|
| 操作对象 | 值 | 状态更新函数 |
| 使用方式 | 包装一个 value | 包装 setState 调用 |
| 适用场景 | 从外部接收的 value | 自己触发的状态更新 |
| 示例 | 组件 props 延迟 | 搜索按钮触发过滤 |

四、注意事项：

- 需要配合 React 18 Concurrent 特性。
- 延迟更新的部分会显示旧值，需要设计好 loading/placeholder。
- 不适合所有场景，只对确实有渲染性能瓶颈的地方使用。

**评分维度**：
- 说明作用（25%）
- 典型场景（35%）
- 与 useTransition 对比（30%）
- 注意事项（10%）

**常见错误**：
- 和 useTransition 混用导致逻辑混乱
- 在不需要延迟的地方使用，增加复杂度

**口头回答版**：
> useDeferredValue 用来延迟某个值的更新，让紧急内容先渲染。比如搜索框输入时输入框立即更新，但列表过滤用 deferred value，避免输入卡顿。它和 useTransition 的区别是，useDeferredValue 包装值，useTransition 包装 setState。适合从外部接收的值需要延迟的场景。

---

### FB-15-PE-P-056：React 中如何实现虚拟列表优化长列表？

**题型**：性能题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、虚拟列表、长列表、性能优化
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 React 中实现虚拟列表的原理和关键代码。

**参考答案**：

一、原理：

只渲染可视区域内的列表项，配合一个高度占位元素模拟完整列表高度。滚动时根据 scrollTop 计算 startIndex，更新可视窗口。

二、关键计算：

```js
const itemHeight = 50;
const visibleCount = Math.ceil(containerHeight / itemHeight) + buffer;
const startIndex = Math.floor(scrollTop / itemHeight);
const offsetY = startIndex * itemHeight;
```

三、实现代码：

```jsx
function VirtualList({ items, itemHeight, height }) {
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(height / itemHeight) + 2;
  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  return (
    <div
      style={{ height, overflow: 'auto' }}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

四、优化：

1. 滚动事件节流或使用 `requestAnimationFrame`。
2. 使用 `transform: translateY` 代替改变每个 item 的 top。
3. 可变高度需要预先测量或动态计算。

五、成熟库：

- `react-window`、`react-virtualized`：功能完善。
- `@tanstack/react-virtual`：现代化、TypeScript 友好。

**评分维度**：
- 原理清晰（25%）
- 关键计算（25%）
- 代码实现（25%）
- 优化和库选择（25%）

**常见错误**：
- 一次性渲染所有列表项
- 滚动事件不做节流导致卡顿

**口头回答版**：
> 虚拟列表只渲染可视区内容，用一个占位元素模拟总高度。根据 scrollTop 算 startIndex 和 offsetY，渲染可视项加 buffer。滚动监听可以节流或用 requestAnimationFrame。高度固定时好做，可变高度要测量。推荐 react-window 或 tanstack virtual。

---

### FB-15-PE-P-057：React 中如何避免 context 导致的性能问题？

**题型**：性能题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、Context、性能优化、re-render
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React 中 Context 使用不当导致的性能问题，以及优化方法。

**参考答案**：

一、Context 性能问题：

1. **所有消费组件都 re-render**：
   - Context value 变化时，所有 `useContext` 的组件都会重新渲染，即使它们只用到 value 的一小部分。

2. **value 引用不稳定**：
   - 如果 value 是每次 render 新创建的对象，会导致不必要的更新。

二、优化方法：

1. **拆分 Context**：
   - 把高频变化的状态和稳定状态拆分到不同 Context。
   - 例如 `ThemeContext` 和 `UserContext` 分开。

2. **使用 useMemo 稳定 value**：
   ```jsx
   const value = useMemo(() => ({ user, setUser }), [user]);
   return <UserContext.Provider value={value}>...</UserContext.Provider>;
   ```

3. **selector 模式**：
   - 使用 `use-context-selector` 等库，只订阅 Context 的部分值。

4. **原子化状态管理**：
   - 使用 Jotai、Recoil、Zustand，避免 Context 的广播问题。

5. **把消费组件拆分**：
   - 让只读取 Context 的小组件被 memo 包裹，减少大范围 re-render。

三、注意事项：

- Context 适合低频更新的全局状态（主题、语言、用户信息）。
- 高频更新状态不适合放 Context。

**评分维度**：
- 说明性能问题（25%）
- 拆分 Context（25%）
- useMemo 稳定 value（20%）
- selector/原子化方案（20%）
- 使用建议（10%）

**常见错误**：
- 所有全局状态放一个 Context
- value 对象每次 render 都新建

**口头回答版**：
> Context value 一变，所有 useContext 的组件都会 re-render。优化可以拆分 Context，高频和低频状态分开；用 useMemo 稳定 value；或者用 use-context-selector 只订阅部分值。高频更新状态建议用 Jotai、Recoil、Zustand。Context 适合主题、语言、用户信息这种低频更新的。

---

### FB-15-CO-P-023：什么是 React Server Actions？

**题型**：概念题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、Server Actions、React 19、SSR
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 React Server Actions 是什么，它解决了什么问题。

**参考答案**：

一、定义：

Server Actions 是 React 19 / Next.js 引入的一种机制，允许在服务端定义函数，并直接从客户端组件调用，无需手动编写 API 路由。

二、解决的问题：

1. **减少样板代码**：
   - 不需要单独写 `/api/update` 路由。
   - 表单提交、数据变更可以直接调用服务端函数。

2. **类型安全**：
   - 服务端函数和客户端调用共享 TypeScript 类型。

3. **简化数据变更流程**：
   - 传统：客户端 → API → 服务端 → 数据库。
   - Server Actions：客户端 → 服务端函数 → 数据库。

三、使用方式：

```tsx
// Server Component 或 server action 文件
async function updateUser(formData: FormData) {
  'use server';
  const name = formData.get('name');
  await db.user.update({ name });
}

// Client Component
<form action={updateUser}>
  <input name="name" />
  <button type="submit">Save</button>
</form>
```

四、注意事项：

1. `'use server'` 标记的函数只在服务端运行。
2. 需要框架支持（Next.js App Router）。
3. 要注意安全校验，不能信任客户端传来的数据。
4. 错误处理需要配合 Error Boundary 或表单状态管理。

**评分维度**：
- 说明 Server Actions 定义（25%）
- 解决问题（30%）
- 使用示例（25%）
- 注意事项（20%）

**常见错误**：
- 认为 Server Actions 可以替代所有 API
- 在 Server Actions 中不校验输入

**口头回答版**：
> React Server Actions 是可以直接在客户端调用的服务端函数，主要在 React 19 和 Next.js 里用。它减少了写 API 路由的样板代码，还能共享 TypeScript 类型。比如表单提交可以直接把 action 指向 server action。要注意安全校验，不能信任客户端数据。

---

### FB-15-CO-P-024：React 19 的 use hook 有什么作用？

**题型**：概念题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React 19、use、Suspense、数据获取
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 React 19 引入的 `use` hook 的作用和使用方式。

**参考答案**：

一、作用：

`use` 是一个新的 React Hook，用于在组件中读取 Promise、Context 等可等待资源，只能在 render 期间调用，并且可以与 Suspense 和 Error Boundary 配合。

二、与 await 的区别：

- `use` 可以在普通函数组件中使用，不需要 async 组件。
- 当 Promise pending 时，React 会暂停当前组件渲染，展示最近的 Suspense fallback。
- Promise resolve 后，React 会恢复渲染。

三、使用方式：

```tsx
import { use, Suspense } from 'react';

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise); // 类似 await，但可以中断渲染
  return comments.map(c => <p key={c.id}>{c.text}</p>);
}

function Page({ commentsPromise }) {
  return (
    <Suspense fallback={<Loading />}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

四、读取 Context：

```tsx
const theme = use(ThemeContext);
```

五、注意事项：

1. `use` 可以在条件语句中使用（与 Hooks 规则不同）。
2. 必须在 render 期间调用，不能在 useEffect 或事件处理中调用。
3. 需要配合 Suspense 处理 loading 状态。

**评分维度**：
- 说明 use 作用（30%）
- 与 await 区别（25%）
- 使用示例（25%）
- 注意事项（20%）

**常见错误**：
- 把 use 当成普通 await 在 async 组件外乱用
- 不在 Suspense 内使用 use

**口头回答版**：
> React 19 的 use hook 用来在组件里读取 Promise 或 Context，和 Suspense 配合。当 Promise 还在 pending 时，React 会暂停渲染显示 fallback，resolve 后继续。它可以在条件里用，但必须在 render 期间。读取 Context 时比 useContext 更灵活。

---

### FB-15-FS-P-059：React 的 SuspenseList 是什么？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、SuspenseList、Suspense、并发
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 React 的 SuspenseList 组件及其使用场景。

**参考答案**：

一、定义：

`SuspenseList` 是 React 提供的用于协调多个 Suspense 组件显示顺序的组件，可以控制多个 loading 状态的展示方式，避免界面闪烁。

二、核心 props：

1. **`revealOrder`**：
   - `together`：所有子 Suspense 都准备好后一起显示。
   - `forwards`：按顺序显示，前面的准备好后才显示后面的。
   - `backwards`：倒序显示。

2. **`tail`**：
   - `collapsed`：只显示一个 fallback，其他隐藏。
   - `hidden`：所有子项在准备好前都隐藏。

三、使用场景：

1. 聊天应用消息列表：按顺序显示消息，避免后面消息先出来导致顺序错乱。
2. 仪表盘多个卡片：可以一起显示，避免逐个闪烁。
3. 瀑布流内容：控制加载顺序，提升视觉稳定性。

四、示例：

```jsx
<SuspenseList revealOrder="forwards" tail="collapsed">
  <Suspense fallback={<Spinner />}><ProfileData /></Suspense>
  <Suspense fallback={<Spinner />}><Posts /></Suspense>
  <Suspense fallback={<Spinner />}><Photos /></Suspense>
</SuspenseList>
```

五、注意事项：

- SuspenseList 目前仍是实验性 API，尚未稳定。
- 只在 Concurrent Mode 下有效。

**评分维度**：
- 说明作用（30%）
- revealOrder 和 tail 选项（30%）
- 使用场景（25%）
- 实验性状态（15%）

**常见错误**：
- 把 SuspenseList 当成普通 Suspense 使用
- 不了解 revealOrder 的不同效果

**口头回答版**：
> SuspenseList 用来协调多个 Suspense 的显示顺序，避免界面闪烁。revealOrder 可以设 together、forwards、backwards，tail 控制 fallback 显示。比如聊天消息按 forwards 顺序显示，避免后面消息先出来。目前还是实验性 API。

---

### FB-15-PE-P-058：React 中的代码分割策略有哪些？

**题型**：性能题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：15 React
**标签**：React、代码分割、懒加载、性能优化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React 项目中常用的代码分割策略。

**参考答案**：

一、按路由分割：

- 每个路由对应一个 chunk，用户访问时才加载。
- 使用 React.lazy + Suspense 或 Next.js dynamic import。

二、按组件分割：

- 对大型组件或弹窗等延迟展示内容做懒加载。
- 例如图表编辑器、富文本编辑器。

三、按功能/模块分割：

- 把不常用的功能模块独立成 chunk。
- 例如导出 PDF、数据报表。

四、预加载策略：

1. **路由预加载**：
   - 鼠标 hover 到链接时预加载目标页面。
   - Next.js 默认支持 `<Link prefetch>`。

2. **交互预加载**：
   - 用户即将打开弹窗时提前加载弹窗组件。

3. **动态 import 预加载**：
   - `const Component = lazy(() => import('./Component')); Component.preload?.();`

五、构建工具配置：

- Webpack/Vite 支持动态 import 自动分割。
- 配置 `splitChunks` 提取公共依赖。
- 控制 chunk 大小，避免过多小文件。

六、监控：

- 使用 Lighthouse、webpack-bundle-analyzer 分析 chunk 分布。
- 关注首屏加载的 JS 大小。

**评分维度**：
- 分割策略分类（40%）
- 预加载策略（25%）
- 构建工具配置（20%）
- 监控（15%）

**常见错误**：
- 过度分割，产生大量小 chunk
- 不分析实际加载路径，分割没有收益

**口头回答版**：
> React 代码分割可以按路由、按组件、按功能模块做。路由分割最常见，每个页面对应一个 chunk。弹窗、编辑器这种大型组件也可以懒加载。还要做预加载，比如 hover 链接时预加载。构建工具用 Webpack splitChunks 或 Vite 自动分割，注意别分太多小文件。用 bundle analyzer 分析。

---

### FB-15-SD-R-066：设计一个 React 状态管理方案

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：15 React
**标签**：React、状态管理、Redux、Zustand、Jotai
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请为一个中大型 React 项目设计状态管理方案，说明不同状态的分层和选型。

**参考答案**：

一、状态分层：

| 层级 | 示例 | 管理方式 |
|------|------|---------|
| 服务端状态 | 用户列表、订单数据 | React Query / SWR |
| 全局 UI 状态 | 主题、语言、登录用户 | Context / Zustand |
| 全局业务状态 | 购物车、权限 | Zustand / Redux Toolkit |
| 局部组件状态 | 表单输入、弹窗显隐 | useState / useReducer |
| URL 状态 | 筛选条件、分页 | URL query / 路由参数 |

二、选型建议：

1. **服务端状态**：
   - React Query：缓存、重试、后台刷新、去重。
   - SWR：轻量，适合简单场景。

2. **全局客户端状态**：
   - Zustand：轻量、TypeScript 友好、无样板代码。
   - Redux Toolkit：复杂业务、强调试需求、时间旅行。
   - Jotai/Recoil：原子化状态，适合细粒度订阅。

3. **临时/局部状态**：
   - useState / useReducer。
   - 避免过度提升到全局。

三、设计原则：

1. 状态尽量靠近使用它的地方。
2. 服务端状态和客户端状态分离。
3. 不可变更新，方便调试和优化。
4. 持久化状态要考虑序列化和版本兼容。

四、工具链：

- React Query DevTools 调试服务端状态。
- Redux DevTools 调试全局状态。
- 类型定义集中管理，避免 any。

五、演进策略：

- 项目初期用 Context + useState。
- 业务复杂后引入 Zustand 或 Redux Toolkit。
- 服务端交互增多后引入 React Query。

**评分维度**：
- 状态分层清晰（30%）
- 选型合理（25%）
- 设计原则（20%）
- 工具链和演进（15%）
- 类型安全（10%）

**常见错误**：
- 所有状态都放 Redux
- 服务端状态不用缓存库，手动管理

**口头回答版**：
> 状态管理要分层：服务端状态用 React Query/SWR，全局 UI 状态用 Context 或 Zustand，业务状态用 Zustand/Redux Toolkit，局部状态用 useState，URL 状态用 query 参数。状态尽量靠近使用方，服务端和客户端状态分离。项目小的时候用 Context，大了引入 Zustand，服务端交互多了用 React Query。

---

### FB-15-SD-R-067：如何设计 React 应用的性能监控体系？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：15 React
**标签**：React、性能监控、Web Vitals、Profiler
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 React 应用的性能监控体系，覆盖运行时性能、构建性能和用户体验指标。

**参考答案**：

一、运行时性能：

1. **Web Vitals**：
   - LCP、INP、CLS、FCP、TTFB。
   - 使用 `web-vitals` 库采集，发送到监控平台。

2. **React Profiler**：
   - 使用 `<Profiler>` 记录组件渲染耗时。
   - 识别渲染热点组件。

3. **长任务（Long Tasks）**：
   - 监听 `PerformanceObserver`，发现阻塞主线程的任务。

二、构建性能：

1. 构建耗时趋势。
2. 产物体积分析（webpack-bundle-analyzer、rollup-plugin-visualizer）。
3. 依赖大小和重复依赖检测。

三、用户体验指标：

1. 首屏加载时间。
2. 交互响应延迟。
3. 页面切换耗时。
4. 错误率和白屏率。

四、数据采集与上报：

1. 采样上报，避免影响性能。
2. 脱敏处理，不上报敏感信息。
3. 与版本号、用户环境关联，便于定位。

五、告警与优化：

1. 设置 P75/P95/P99 指标阈值。
2. 异常时自动告警到相关负责人。
3. 定期做性能回归测试。

六、工具：

- Sentry、Datadog、阿里云 ARMS。
- Lighthouse CI。
- React DevTools Profiler。

**评分维度**：
- 运行时性能覆盖（30%）
- 构建性能（15%）
- 用户体验指标（20%）
- 采集与告警（20%）
- 工具选择（15%）

**常见错误**：
- 只监控错误，不监控性能
- 全量上报导致自身成为性能瓶颈

**口头回答版**：
> React 性能监控要覆盖运行时、构建和用户体验。运行时采 Web Vitals、React Profiler 和长任务；构建看耗时和产物体积；用户体验看首屏、交互延迟、错误率。数据采样上报、脱敏，和版本号关联。设 P75/P95 阈值告警，定期做 Lighthouse 回归。

---

### FB-15-SD-R-068：设计一个 React 组件的低代码平台

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：15 React
**标签**：React、低代码、组件平台、DSL、架构
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个基于 React 组件的低代码平台，支持拖拽搭建页面、配置属性和发布。

**参考答案**：

一、核心架构：

```
设计器（画布 + 组件面板 + 属性面板）
    ↓
页面 Schema（JSON DSL）
    ↓
渲染器（根据 Schema 渲染 React 组件树）
    ↓
出码/发布（生成 React 代码或直接发布）
```

二、设计器：

1. **组件面板**：
   - 展示平台内置组件和业务组件。
   - 支持搜索、分组、版本管理。

2. **画布**：
   - 拖拽放置组件。
   - 实时预览和选中高亮。
   - 支持撤销重做。

3. **属性面板**：
   - 根据组件 schema 动态生成表单。
   - 支持绑定变量、表达式、事件。

三、Schema 设计：

```json
{
  "type": "Page",
  "props": { "title": "首页" },
  "children": [
    {
      "type": "Button",
      "props": { "text": "提交", "onClick": { "action": "submit" } }
    }
  ]
}
```

四、渲染器：

1. 递归解析 schema，映射到真实 React 组件。
2. 支持组件懒加载和错误边界。
3. 提供运行时上下文（数据、事件、路由）。

五、扩展性：

1. 组件注册机制，业务方可上传自定义组件。
2. 插件系统，扩展属性面板和事件能力。
3. 数据源绑定，支持 REST、GraphQL、低代码服务。

六、发布与出码：

1. 直接发布为可访问页面（SSG/SSR）。
2. 导出 React 源码，供开发者二次开发。
3. 版本管理和回滚。

**评分维度**：
- 架构完整（30%）
- 设计器能力（20%）
- Schema 设计（20%）
- 扩展性（15%）
- 发布能力（15%）

**常见错误**：
- Schema 设计过于灵活，难以出码
- 忽略组件版本和回滚

**口头回答版**：
> 低代码平台核心是设计器、Schema DSL、渲染器三层。设计器有组件面板、画布、属性面板，拖拽生成 JSON Schema。渲染器把 Schema 映射成 React 组件树。要支持组件注册、插件扩展、数据源绑定。发布可以直接部署或出码。还要做版本管理和回滚。

---

### FB-15-SD-R-069：React 项目如何进行微前端改造？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：15 React
**标签**：React、微前端、Module Federation、qiankun
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何将一个大型 React 单体应用改造为微前端架构。

**参考答案**：

一、拆分策略：

1. **按业务域拆分**：
   - 将独立业务模块拆分为子应用，如订单、商品、用户。

2. **按路由拆分**：
   - 每个路由对应一个子应用。

3. **先拆出公共基础**：
   - 把组件库、工具函数、权限等抽到共享包或基座。

二、技术选型：

1. **Module Federation**：
   - 适合共享组件和模块，运行时组合。
2. **qiankun / single-spa**：
   - 适合按路由加载独立子应用。
3. **iframe**：
   - 简单隔离，但体验差，适合临时方案。

三、改造步骤：

1. **搭建基座**：
   - 负责路由分发、登录鉴权、全局状态、公共 UI。

2. **公共依赖共享**：
   - React、ReactDOM、Router 等通过 Module Federation shared 或 externals 共享。

3. **子应用改造**：
   - 每个子应用导出生命周期函数（bootstrap、mount、unmount）。
   - 处理样式隔离和 JS 沙箱。

4. **逐步迁移**：
   - 先迁移边缘业务，再迁移核心模块。
   - 保持双轨运行，支持回滚。

四、注意事项：

1. 路由统一由基座管理。
2. 全局状态通过事件总线或共享库通信。
3. 样式隔离避免子应用互相污染。
4. 公共组件库版本升级要有协调机制。

**评分维度**：
- 拆分策略（25%）
- 技术选型（25%）
- 改造步骤（30%）
- 注意事项（20%）

**常见错误**：
- 一开始就把所有模块都拆成微前端
- 公共依赖不共享，每个子应用打包一份 React

**口头回答版**：
> 改造微前端先按业务域或路由拆分，把公共基础抽到基座。技术选 Module Federation 做共享，或 qiankun 做路由加载。步骤是搭基座、共享 React 等依赖、改造子应用生命周期、逐步迁移。注意路由统一、样式隔离、全局状态通信，别一开始全拆。

---

### FB-15-SD-R-070：如何设计 React SSR 的缓存策略？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：15 React
**标签**：React、SSR、缓存、Next.js、性能
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 React SSR 应用的缓存策略，提升首屏性能和降低服务端压力。

**参考答案**：

一、缓存分层：

| 层级 | 策略 | 适用场景 |
|------|------|---------|
| CDN | 页面级缓存 | 公开页面、不依赖登录态 |
| Edge Cache | 边缘节点渲染 | 跨境、低延迟要求 |
| 应用内存 | 页面片段缓存 | 热门页面、构建后稳定内容 |
| 数据缓存 | React Query/SWR | API 响应缓存 |
| 浏览器 | Service Worker / HTTP Cache | 静态资源、重复访问 |

二、Next.js 缓存策略：

1. **Static Site Generation (SSG)**：
   - 构建时生成页面，适合内容不频繁变化。

2. **Incremental Static Regeneration (ISR)**：
   - 按需重新生成页面，兼顾实时性和性能。

3. **Server-Side Rendering (SSR)**：
   - 每次请求服务端渲染，适合强个性化页面。

4. **React Server Components**：
   - 服务端组件无需发送 JS，可独立缓存数据。

三、缓存失效：

1. 按路径和时间 TTL 失效。
2. 通过 webhook 或 revalidate API 主动刷新。
3. 版本号变化时全量失效。

四、安全与一致性：

1. 登录态页面不能简单 CDN 全缓存。
2. 使用 Edge Side Includes (ESI) 或部分缓存处理个性化区域。
3. 缓存 key 要包含用户角色、语言、设备类型等维度。

五、监控：

- 缓存命中率。
- SSR 渲染耗时。
- 缓存失效后的错误率。

**评分维度**：
- 缓存分层清晰（30%）
- Next.js 策略（25%）
- 缓存失效（20%）
- 安全一致性（15%）
- 监控（10%）

**常见错误**：
- 登录态页面错误缓存导致数据泄露
- 缓存时间过长，内容更新不及时

**口头回答版**：
> SSR 缓存可以分多层：CDN 页面缓存、Edge 渲染、应用内存缓存、数据缓存、浏览器缓存。Next.js 用 SSG 构建时生成、ISR 增量更新、SSR 实时渲染。登录态页面不能全缓存，要用 ESI 或部分缓存。缓存失效按 TTL 或主动刷新，监控命中率和渲染耗时。

---

### FB-15-SD-R-071：React 组件库如何支持多框架？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：15 React
**标签**：React、Vue、跨框架、组件库、Headless
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个同时支持 React 和 Vue 的组件库方案。

**参考答案**：

一、方案选型：

1. **Headless UI + 框架适配层**：
   - 核心逻辑用 vanilla JS 实现。
   - React 和 Vue 分别做轻量适配层。
   - 例如 Radix UI、Headless UI 模式。

2. **Web Components**：
   - 用原生 Custom Elements 封装。
   - 任何框架都能使用。
   - 但样式隔离、事件、表单集成较复杂。

3. **独立维护两套代码**：
   - React 组件库和 Vue 组件库分开。
   - 设计和 API 尽量统一。

二、推荐方案：Headless + Adapter：

```text
packages/
  core/          # 框架无关逻辑（状态机、工具函数）
  react/         # React 适配
  vue/           # Vue 适配
  styles/        # 共享样式/主题
```

三、核心逻辑抽象：

1. 用状态机描述组件行为（如 Modal 的 open/close）。
2. 用纯函数处理键盘导航、焦点管理。
3. React/Vue 适配层只负责绑定状态和事件。

四、样式共享：

- 使用 CSS 变量或 Tailwind 等原子类。
- 设计 token 跨框架共享。

五、注意事项：

1. API 命名尽量贴近各框架习惯。
2. 文档和示例要分开维护。
3. 版本发布要协调，避免功能不同步。
4. 测试覆盖要全面，尤其是交互行为。

**评分维度**：
- 方案选型合理（30%）
- Headless + Adapter 架构（30%）
- 核心逻辑抽象（20%）
- 样式和版本管理（15%）
- 注意事项（5%）

**常见错误**：
- 强行用 Web Components 导致集成复杂
- 两套代码完全独立，设计和 API 不一致

**口头回答版**：
> 跨框架组件库推荐 Headless UI 加适配层。核心逻辑用 vanilla JS 写，React 和 Vue 分别做绑定层。样式用 CSS 变量共享。也可以选 Web Components，但集成复杂。要注意 API 贴近各框架习惯，文档示例分开，版本协调。

---

### FB-15-SD-R-072：如何设计 React 应用的安全体系？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：15 React
**标签**：React、安全、XSS、CSRF、CSP
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 React 应用的安全体系，覆盖常见前端安全风险。

**参考答案**：

一、输入安全：

1. 不要信任用户输入。
2. 表单校验在前端和后端都做。
3. 对 URL 参数做校验和过滤。

二、输出安全：

1. **XSS 防护**：
   - React 默认转义 JSX 中的变量。
   - 谨慎使用 `dangerouslySetInnerHTML`，必须做 HTML 消毒（DOMPurify）。
   - 设置 CSP 限制内联脚本。

2. **URL 安全**：
   - 使用 `URL` 或 `encodeURIComponent` 处理用户输入。
   - 避免 `javascript:` 伪协议链接。

三、认证与授权：

1. Token 存储在 httpOnly cookie，避免 XSS 窃取。
2. 敏感操作需要二次验证。
3. 前端路由权限校验，后端做最终鉴权。

四、依赖安全：

1. 定期 `npm audit`，使用 Snyk 扫描。
2. 锁定依赖版本，使用 lockfile。
3. 第三方 CDN 资源加 SRI。

五、安全头：

- CSP、X-Frame-Options、HSTS、X-Content-Type-Options。
- Referrer-Policy。

六、监控与响应：

1. 错误监控和异常上报。
2. 安全事件应急预案。
3. 定期渗透测试。

**评分维度**：
- 输入输出安全（30%）
- XSS 防护（25%）
- 认证授权（15%）
- 依赖安全（15%）
- 安全头和监控（15%）

**常见错误**：
- 只依赖 React 默认转义，忽略 dangerouslySetInnerHTML
- Token 放 localStorage

**口头回答版**：
> React 应用安全要从输入、输出、认证、依赖、安全头几方面做。输入要校验，输出要防 XSS，dangerouslySetInnerHTML 必须消毒。Token 放 httpOnly cookie，前端路由做权限校验但后端最终鉴权。依赖要定期 audit，第三方 CDN 加 SRI。配 CSP、HSTS 这些安全头，定期做渗透测试。

---

### FB-15-SD-R-073：React 项目如何做国际化架构？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：15 React
**标签**：React、国际化、i18n、SSR、架构
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 React 应用的国际化架构，支持多语言、SSR 和组件库文案。

**参考答案**：

一、技术选型：

1. **react-i18next**：生态成熟，插件丰富。
2. **LinguiJS**：编译时提取，体积小。
3. **FormatJS / react-intl**：官方 ICU 消息格式。

二、文案管理：

1. 按页面/模块组织 namespace。
2. 使用 key 命名规范：`module.component.action`。
3. 公共文案放在 common namespace。
4. 组件库文案通过 ConfigProvider 注入。

三、SSR 支持：

1. 服务端根据请求 locale 加载对应语言包。
2. 将语言包注入 HTML，避免客户端重新请求。
3. Next.js 使用 `next-intl` 或 `next-i18next`。

四、语言切换：

1. 用户选择持久化到 cookie/localStorage。
2. 根据浏览器语言自动匹配，允许回退。
3. 切换语言时刷新相关数据，不强制整页刷新。

五、RTL 和排版：

1. 支持阿拉伯语等 RTL 语言。
2. 使用 CSS logical properties。
3. 日期、数字、货币格式使用 Intl API。

六、流程：

1. 开发时写 key，不直接写死文案。
2. CI 自动提取 key 给翻译平台。
3. 翻译完成后同步回仓库。
4. 部署时按语言分包或全量打包。

**评分维度**：
- 技术选型（15%）
- 文案管理（25%）
- SSR 支持（20%）
- 语言切换（15%）
- RTL 和流程（15%）
- 组件库集成（10%）

**常见错误**：
- 文案散落在代码各处，难以维护
- SSR 时语言包加载不一致导致 hydration mismatch

**口头回答版**：
> React 国际化常用 react-i18next 或 FormatJS。文案按模块分 namespace，组件库通过 ConfigProvider 注入。SSR 要根据请求 locale 加载语言包并注入 HTML。语言切换持久化，支持浏览器自动匹配和 RTL。开发时不写死文案，CI 自动提取给翻译平台。

---

