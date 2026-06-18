# React 练习册

> 本练习册基于《React 学习文档》编写，涵盖 JSX、组件化、Hooks、Fiber、状态管理、性能优化、SSR 等核心知识点。难度由浅入深，每题均附答案与解析。

---

## 一、选择题（每题 4 分，共 24 分）

### 第 1 题

React 中 JSX 最终会被编译成什么？

A. HTML 字符串  
B. `React.createElement` 调用  
C. `document.createElement` 调用  
D. CSS 样式对象  

<details>
<summary>答案与解析</summary>

**答案：B**

**解析：** JSX 是 JavaScript 的语法扩展，Babel 等工具会将其编译为 `React.createElement(type, props, children)` 调用，最终生成描述 UI 的 JavaScript 对象（虚拟 DOM），而非直接操作真实 DOM。
</details>

---

### 第 2 题

React 组件间数据流动的正确描述是？

A. 子组件可以直接修改父组件的 props  
B. 数据通过 props 从父组件单向流向子组件  
C. 兄弟组件可以直接互相传递状态  
D. 状态只能在类组件中使用  

<details>
<summary>答案与解析</summary>

**答案：B**

**解析：** React 采用单向数据流。props 只读，子组件不能直接修改父组件数据；若需修改，需通过父组件传入的回调函数通知父组件。兄弟组件通信通常需要提升到共同父组件或使用状态管理库。
</details>

---

### 第 3 题

下列哪个 Hook 的调用方式是**错误**的？

A. 在函数组件顶层调用 `useState`  
B. 在 `useEffect` 内部调用 `useState`  
C. 在循环中调用 `useEffect`  
D. 在自定义 Hook 顶层调用 `useState`  

<details>
<summary>答案与解析</summary>

**答案：C**

**解析：** Hooks 必须在函数组件或自定义 Hook 的顶层按相同顺序调用。不能在循环、条件、嵌套函数中调用，否则会导致 Hook 状态数组错位。
</details>

---

### 第 4 题

React 18 中，以下哪个 API 用于将非紧急更新标记为过渡，避免阻塞用户输入？

A. `useDeferredValue`  
B. `useTransition`  
C. `Suspense`  
D. `useMemo`  

<details>
<summary>答案与解析</summary>

**答案：B**

**解析：** `useTransition` 返回 `isPending` 和 `startTransition`，可将状态更新包裹在 `startTransition` 中，让 React 优先处理紧急更新（如输入）。`useDeferredValue` 用于延迟某个值，`Suspense` 用于异步加载， `useMemo` 用于缓存计算结果。
</details>

---

### 第 5 题

React 17 及之后，合成事件委托到了哪个节点？

A. `document`  
B. `window`  
C. React 应用的 root 容器  
D. 当前触发事件的 DOM 元素  

<details>
<summary>答案与解析</summary>

**答案：C**

**解析：** React 17 之前，合成事件委托到 `document`；React 17 及之后改为委托到 React 应用的 root 容器，这有利于微前端等场景下多个 React 应用共存。
</details>

---

### 第 6 题

关于 `useEffect` 的依赖数组，下列说法正确的是？

A. 不传依赖数组时，只在组件挂载时执行一次  
B. 空数组 `[]` 表示每次渲染后都执行  
C. 依赖数组必须包含 effect 中使用到的所有响应式值  
D. 依赖数组中可以放入对象或数组，无需关心引用变化  

<details>
<summary>答案与解析</summary>

**答案：C**

**解析：** 不传依赖数组时每次渲染后都执行；空数组 `[]` 只在挂载和卸载时执行；依赖数组必须包含所有响应式值（state、props 等），否则可能读取到旧值或导致 bug。对象/数组作为依赖时，每次渲染引用不同，可能触发不必要的 effect，需谨慎处理。
</details>

---

## 二、填空题（每空 2 分，共 20 分）

### 第 7 题

在 JSX 中，为元素添加类名应使用 ______ 属性，而非 HTML 中的 `class`。

<details>
<summary>答案与解析</summary>

**答案：`className`**

**解析：** JSX 更接近 JavaScript，而 `class` 是 JavaScript 的保留字，因此使用 `className` 代替。
</details>

---

### 第 8 题

React 通过 ______ 节点比较新旧虚拟 DOM，找出最小更新步骤，该过程称为协调（reconciliation）。

<details>
<summary>答案与解析</summary>

**答案：Fiber / Diff**

**解析：** Fiber 架构将每个组件对应一个 Fiber 节点，通过 reconciler（协调器）比较新旧 Fiber 树，基于 Diff 算法决定如何最小化更新真实 DOM。
</details>

---

### 第 9 题

`useState` 返回的第二个元素是 ______ 函数，用于更新状态。

<details>
<summary>答案与解析</summary>

**答案：setState（状态更新函数）**

**解析：** `const [count, setCount] = useState(0)` 中，`setCount` 是更新函数，调用后会触发组件重新渲染。
</details>

---

### 第 10 题

React 中用于避免不必要重渲染的高阶组件是 ______。

<details>
<summary>答案与解析</summary>

**答案：`React.memo`**

**解析：** `React.memo` 包裹函数组件后，若 props 未发生变化则跳过渲染。可配合第二个参数自定义比较逻辑。
</details>

---

### 第 11 题

React 18 使用新的 Root API：`const root = createRoot(document.getElementById('root')); root.render(<App />);`，该 API 从包 ______ 中导出。

<details>
<summary>答案与解析</summary>

**答案：`react-dom/client`**

**解析：** React 18 将 `createRoot` 和 `hydrateRoot` 放在 `react-dom/client` 包中，以区分服务端渲染相关的 API。
</details>

---

### 第 12 题

错误边界（Error Boundary）是 ______ 组件，用于捕获子组件树中的 JavaScript 错误。

<details>
<summary>答案与解析</summary>

**答案：类（class）**

**解析：** 目前错误边界只能通过类组件实现，需定义 `static getDerivedStateFromError` 或 `componentDidCatch` 生命周期方法。函数组件暂不支持错误边界。
</details>

---

### 第 13 题

在列表渲染中，应为每个列表项提供稳定且唯一的 ______ 属性，帮助 React 复用节点。

<details>
<summary>答案与解析</summary>

**答案：`key`**

**解析：** `key` 是 Diff 算法识别节点的依据。应避免使用数组索引作为 key，尤其在列表会重排、增删的场景。
</details>

---

### 第 14 题

使用 `useRef` 返回的对象，其 `.current` 属性常用于访问 DOM 或保存 ______ 渲染的值。

<details>
<summary>答案与解析</summary>

**答案：不触发 / 不引起**

**解析：** `useRef` 的可变对象在 `.current` 变化时不会触发组件重新渲染，因此适合保存定时器 ID、上一次状态值等不需要渲染的值。
</details>

---

## 三、代码分析题（每题 8 分，共 32 分）

### 第 15 题

阅读以下代码，指出问题并说明正确做法。

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  );
}
```

<details>
<summary>答案与解析</summary>

**问题：** 使用数组索引 `index` 作为 `key`。

**影响：** 当 `users` 顺序变化或发生增删时，React 可能错误复用已有节点，导致状态错位、性能下降，甚至出现 UI bug。

**正确做法：** 使用稳定且唯一的业务标识作为 `key`，如 `user.id`：

```jsx
<li key={user.id}>{user.name}</li>
```

只有在列表静态不变、无状态依赖时，才可谨慎使用索引作为 key。
</details>

---

### 第 16 题

分析以下 Hook 使用错误，并给出修改方案。

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  if (count > 0) {
    useEffect(() => {
      console.log('count > 0');
    }, [count]);
  }

  return <button onClick={() => setCount(count + 1)}>+</button>;
}
```

<details>
<summary>答案与解析</summary>

**问题：** 在条件分支中调用 `useEffect`，违反 Hooks 调用规则。

**影响：** 条件调用会导致 React 内部 Hook 链表顺序不一致，引发状态错乱或报错。

**正确做法：** 将条件判断放到 effect 内部：

```jsx
useEffect(() => {
  if (count > 0) {
    console.log('count > 0');
  }
}, [count]);
```
</details>

---

### 第 17 题

以下组件每次输入时都会触发子组件不必要的重渲染，如何优化？

```jsx
function Parent() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(c => c + 1);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <Child count={count} onClick={handleClick} />
    </div>
  );
}

function Child({ count, onClick }) {
  return <button onClick={onClick}>{count}</button>;
}
```

<details>
<summary>答案与解析</summary>

**问题：** `Parent` 输入时 `text` 变化导致整个 `Parent` 重渲染，而 `Child` 的 props 实际未变也会重渲染；同时 `handleClick` 每次渲染都新建引用。

**优化方案：**

1. 使用 `React.memo` 缓存 `Child`。
2. 使用 `useCallback` 缓存事件处理函数。

```jsx
const MemoChild = React.memo(Child);

function Parent() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => setCount(c => c + 1), []);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <MemoChild count={count} onClick={handleClick} />
    </div>
  );
}
```

**注意：** 仅当子组件渲染开销较大或父组件频繁渲染时才需要此类优化，避免过早优化。
</details>

---

### 第 18 题

请说明以下 `useEffect` 中 `ignore` 变量的作用。

```jsx
useEffect(() => {
  let ignore = false;

  async function fetchData() {
    const res = await fetch(`/api/user/${userId}`);
    const data = await res.json();
    if (!ignore) setUser(data);
  }

  fetchData();

  return () => { ignore = true; };
}, [userId]);
```

<details>
<summary>答案与解析</summary>

**作用：** 防止竞态条件（race condition）。

**解析：** 当 `userId` 快速变化时，可能同时存在多个请求。清理函数将 `ignore` 设为 `true`，使旧请求的响应不会覆盖最新 `userId` 对应的状态，保证 UI 与最新请求一致。

这是 React 官方推荐的在 effect 中请求数据时的处理方式。生产环境建议使用 React Query / SWR / RTK Query 等库处理缓存、重试和去重。
</details>

---

## 四、编程实践题（每题 12 分，共 24 分）

### 第 19 题

实现一个自定义 Hook `useWindowWidth`，返回当前窗口宽度，并在窗口大小变化时自动更新。

<details>
<summary>答案与解析</summary>

```jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
```

**解析：**

- 使用 `useState` 保存窗口宽度，初始值使用懒加载函数避免每次渲染读取 `window`。
- 在 `useEffect` 中订阅 `resize` 事件。
- 清理函数中移除事件监听器，避免内存泄漏。
- 空依赖数组 `[]` 表示只在挂载和卸载时执行。
</details>

---

### 第 20 题

使用 Context + `useReducer` 实现一个简单的全局计数器状态管理，包含 `increment`、`decrement`、`reset` 三个 action。

<details>
<summary>答案与解析</summary>

```jsx
import { createContext, useContext, useReducer } from 'react';

const CountContext = createContext(null);

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function CountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CountContext.Provider value=&#123;&#123; state, dispatch &#125;&#125;>
      {children}
    </CountContext.Provider>
  );
}

export function useCount() {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within CountProvider');
  }
  return context;
}

// 使用示例
function Counter() {
  const { state, dispatch } = useCount();
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
    </div>
  );
}
```

**解析：**

- `useReducer` 适合状态逻辑较复杂的场景。
- Context 用于跨组件传递 dispatch 和 state。
- 自定义 Hook `useCount` 封装了 `useContext`，并提供错误提示，提升可维护性。
- Context 不适合高频更新场景，若 count 更新频繁，建议使用 Zustand、Redux 等状态管理库。
</details>

---

## 参考答案速查表

| 题号 | 题型 | 答案 |
|------|------|------|
| 1 | 选择题 | B |
| 2 | 选择题 | B |
| 3 | 选择题 | C |
| 4 | 选择题 | B |
| 5 | 选择题 | C |
| 6 | 选择题 | C |
| 7 | 填空题 | `className` |
| 8 | 填空题 | Fiber / Diff |
| 9 | 填空题 | setState |
| 10 | 填空题 | `React.memo` |
| 11 | 填空题 | `react-dom/client` |
| 12 | 填空题 | 类（class） |
| 13 | 填空题 | `key` |
| 14 | 填空题 | 不触发渲染 |
| 15 | 代码分析 | 用 `user.id` 代替 `index` 作为 key |
| 16 | 代码分析 | 将条件放入 effect 内部 |
| 17 | 代码分析 | `React.memo` + `useCallback` |
| 18 | 代码分析 | 防止竞态条件 |
| 19 | 编程实践 | `useWindowWidth` 自定义 Hook |
| 20 | 编程实践 | Context + `useReducer` 计数器 |

---

> **领域编号**：E06 React  
> **最后更新**：2026-06-18
