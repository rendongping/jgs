# React 学习文档

---

## 核心要点（TL;DR）

- React 的核心是声明式 UI、组件化与单向数据流，JSX 只是 `React.createElement` 的语法糖。
- Fiber 架构将渲染拆分为可中断、可优先调度的工作单元，支撑并发特性与流畅交互。
- Hooks 让函数组件拥有状态与副作用，但必须按顺序调用并正确管理依赖数组。
- 状态管理按需选型：局部用 `useState/useReducer`，低频全局用 Context，复杂场景用 Zustand/Redux/MobX。
- 性能优化（memo、useMemo/useCallback、虚拟列表、Code Splitting）要基于实测，避免过早优化。

## 学习时长与前置知识

- **建议学习时长**：4-6 周（每周投入 6-8 小时）
- **前置知识**：JavaScript、ES6+、前端工程化基础

## 一、前言：React 改变了什么？

在 React 出现之前，前端开发大多是"命令式"的。开发者需要一步步告诉浏览器：先找到这个 DOM 节点，再修改它的内容，再绑定事件。当页面复杂起来，DOM 操作就像一团乱麻，难以维护。

React 带来了"声明式"编程和"组件化"思想。你只需要描述"页面应该长什么样"，React 会负责把它渲染出来；当数据变化时，React 会自动更新界面。

生活化比喻：命令式编程像是你亲自下厨，每道菜每一步都要自己操作；声明式编程像是点外卖，你只需要说"我要一份宫保鸡丁"，剩下的交给餐厅（React）。

## 二、React 核心思想

### 2.1 组件化

组件是 React 应用的基本单元。一个页面可以拆分成多个独立的组件，每个组件负责自己的 UI 和逻辑。

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}
```

组件化的好处：

- 复用性强
- 职责清晰
- 易于测试和维护

### 2.2 声明式

React 让你用 JSX 描述 UI，而不是直接操作 DOM。

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

你不需要手动更新按钮文字，React 会自动根据状态重新渲染。

### 2.3 单向数据流

React 中数据从父组件流向子组件，通过 props 传递。子组件不能直接修改父组件的数据，只能通过回调函数通知父组件。

```jsx
function Parent() {
  const [value, setValue] = useState('');
  return <Child value={value} onChange={setValue} />;
}

function Child({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
```

单向数据流让数据变化更可追踪，降低了调试难度。

## 三、JSX

### 3.1 JSX 是什么？

JSX 是 JavaScript 的语法扩展，允许在 JS 中写类似 HTML 的结构。

```jsx
const element = <h1 className="title">Hello World</h1>;
```

JSX 最终会被编译成 `React.createElement` 调用：

```javascript
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello World'
);
```

### 3.2 JSX 规则

- 只能返回一个根元素
- 使用 `className` 代替 `class`
- 使用 `{}` 嵌入表达式
- 标签必须闭合

## 四、Fiber 架构

### 4.1 为什么需要 Fiber？

React 15 及之前使用递归方式渲染组件。当组件树很大时，渲染会阻塞主线程，导致页面卡顿。

Fiber 是 React 16 引入的新架构。它把渲染工作拆分成小单元，可以暂停、恢复、优先级调度，从而实现流畅的用户体验。

生活化比喻：旧的 React 像是一个人一口气搬完所有家具，中途不能停；Fiber 像是把搬家拆成多次搬运，每次搬一点，中间还能接电话（响应用户交互）。

### 4.2 Fiber 树

Fiber 把每个组件对应一个 Fiber 节点，形成一棵 Fiber 树。React 通过双缓冲技术维护两棵树：

- `current`：当前屏幕上显示的树
- `workInProgress`：正在构建的新树

渲染完成后，`workInProgress` 变成新的 `current`。

### 4.3  reconcilation（协调）

协调是 React 比较新旧虚拟 DOM，找出最小更新步骤的过程。React 的 Diff 算法基于三个假设：

1. 不同类型元素产生不同树
2. 通过 key 属性识别哪些子元素可以保持稳定
3. 同级比较，不跨层级比较

## 五、Hooks 原理

### 5.1 为什么需要 Hooks？

Class 组件存在一些问题：

- 逻辑复用困难（HOC 嵌套地狱）
- `this` 指向容易困惑
- 生命周期函数里逻辑分散

Hooks 让函数组件也能拥有状态和副作用能力。

### 5.2 useState

```jsx
const [count, setCount] = useState(0);
```

React 内部用数组保存每个组件的 Hook 状态。Hooks 必须按相同顺序调用，因此不能在循环、条件、嵌套函数中调用。

### 5.3 useEffect

```jsx
useEffect(() => {
  console.log('副作用执行');
  return () => {
    console.log('清理函数');
  };
}, [deps]);
```

`useEffect` 用于处理副作用。第二个参数是依赖数组：

- 不传：每次渲染后都执行
- 空数组 `[]`：只在挂载和卸载时执行
- 有依赖：依赖变化时执行

### 5.4 自定义 Hooks

自定义 Hook 是提取组件间共享逻辑的方式。

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}
```

## 六、Concurrent Mode

### 6.1 什么是并发？

Concurrent Mode 是 React 18 引入的并发特性。它允许 React 同时准备多个版本的 UI，并根据优先级决定何时更新屏幕。

### 6.2 主要 API

- `useTransition`：把非紧急更新标记为过渡，不阻塞用户输入
- `useDeferredValue`：延迟更新某些值，优先响应紧急更新
- `Suspense`：声明式地处理异步数据加载

```jsx
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      {isPending && <span>Loading...</span>}
      <button onClick={handleClick}>Increase</button>
      <HeavyComponent count={count} />
    </div>
  );
}
```

## 七、状态管理

### 7.1 Context

Context 用于跨组件传递数据，避免 props 层层传递。

```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

注意：Context 不适合高频更新的场景，因为任何变化都会导致所有消费组件重新渲染。

### 7.2 Redux

Redux 是经典的状态管理库，遵循单一数据源、状态只读、纯函数修改三大原则。

```javascript
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    default: return state;
  }
};
```

Redux Toolkit 简化了 Redux 的使用。

### 7.3 Zustand

Zustand 是轻量级的状态管理库，API 简单直观。

```javascript
import { create } from 'zustand';

const useStore = create(set => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 }))
}));
```

### 7.4 MobX

MobX 使用响应式编程，通过 observable 自动追踪依赖。

```javascript
import { makeAutoObservable } from 'mobx';

class Counter {
  count = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increment() {
    this.count++;
  }
}
```

### 7.5 如何选择？

| 方案 | 适用场景 |
|------|----------|
| useState/useReducer | 局部状态 |
| Context | 主题、语言等低频全局状态 |
| Zustand | 中小型应用 |
| Redux | 大型应用、需要强规范 |
| MobX | 面向对象风格、复杂状态 |

## 八、React 性能优化

### 8.1 常见优化手段

- `React.memo`：避免不必要的组件重渲染
- `useMemo` / `useCallback`：缓存计算结果和函数引用
- `useTransition` / `useDeferredValue`：优先级调度
- 虚拟列表：大数据量渲染
- Code Splitting：按需加载

```jsx
const MemoizedComponent = React.memo(function MyComponent({ data }) {
  return <div>{data.name}</div>;
});
```

### 8.2 不要滥用优化

过早优化是万恶之源。`React.memo` 和 `useMemo` 本身也有开销，只在真正出现性能问题时使用。

## 九、SSR 与 Next.js

### 9.1 什么是 SSR？

SSR（Server-Side Rendering，服务端渲染）是在服务器上生成 HTML，再返回给浏览器。相比 CSR（客户端渲染），SSR 有利于首屏性能和 SEO。

### 9.2 Next.js

Next.js 是基于 React 的全栈框架，内置 SSR、SSG（静态生成）、API 路由、文件路由等功能。

```jsx
// pages/index.js
export default function Home({ data }) {
  return <div>{data.title}</div>;
}

export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}
```

## 十、常见误区与最佳实践

### 误区一：Hooks 可以在任意地方调用

Hooks 必须在函数组件顶层按顺序调用，不能在循环、条件、嵌套函数中使用。

### 误区二：所有状态都放到 Redux

不要把所有状态都全局化。局部状态用 useState，跨组件共享状态再考虑 Context 或状态管理库。

### 误区三：频繁使用 useMemo/useCallback

这些 Hook 有自身的开销，只有在确实能减少重渲染时使用。

### 最佳实践

1. 组件职责单一
2. props 尽可能简单
3. 合理使用 useEffect 依赖数组
4. 为列表项提供稳定的 key
5. 使用 React DevTools 分析性能
6. 大型项目使用 TypeScript 增强类型安全

## 十一、总结

React 的核心价值在于声明式 UI、组件化和单向数据流。Fiber 架构和 Hooks 让 React 能够应对复杂场景，Concurrent Mode 带来了更流畅的交互体验。理解状态管理、性能优化和 SSR，是成为高级 React 工程师的必经之路。

## 十二、React 事件机制

### 12.1 合成事件

React 使用合成事件（SyntheticEvent）封装浏览器原生事件，提供一致的跨浏览器 API。

```jsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('clicked');
  };
  return <button onClick={handleClick}>Click</button>;
}
```

### 12.2 事件委托

React 17 之前，事件委托到 document；React 17 及之后，事件委托到 root 容器。这减少了事件监听器的数量，提升了性能。

## 十三、React Context 深入

### 13.1 Context 的工作方式

Context 通过 Provider 和 Consumer 实现跨组件传值。

```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

### 13.2 Context 的性能问题

Context 的值变化时，所有消费该 Context 的组件都会重新渲染。对于高频变化的数据，建议使用状态管理库。

### 13.3 拆分 Context

把大 Context 拆分成多个小 Context，可以减少不必要的重渲染。

## 十四、React Router 基础

### 14.1 声明式路由

React Router 提供声明式路由配置：

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 14.2 路由守卫

React Router v6 可以通过自定义组件实现路由守卫：

```jsx
function RequireAuth({ children }) {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/login" />;
}
```

## 十五、React 18 新特性

### 15.1 自动批处理

React 18 默认开启自动批处理，多个状态更新会合并为一次重新渲染。

### 15.2 Suspense 改进

React 18 增强了 Suspense 在数据获取场景下的能力，配合框架使用效果更佳。

### 15.3 新的 Root API

```jsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

## 十六、总结

React 的生态系统庞大而成熟。从 JSX、组件化、Hooks 到 Fiber、并发特性、状态管理和 SSR，React 为前端开发提供了一套完整的解决方案。深入理解这些核心概念，结合实际项目不断实践，才能真正掌握 React 的精髓。

## 十七、React 中的表单处理

### 17.1 受控组件与非受控组件

受控组件的值由 React 状态管理：

```jsx
function Input() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
```

非受控组件使用 ref 直接操作 DOM：

```jsx
function Input() {
  const inputRef = useRef(null);
  const handleClick = () => {
    console.log(inputRef.current.value);
  };
  return <input ref={inputRef} />;
}
```

### 17.2 表单库

复杂表单可以使用 React Hook Form 或 Formik 简化开发。

## 十八、React 服务端组件

### 18.1 什么是 Server Components

React Server Components 允许组件在服务端渲染，不打包到客户端，减少客户端 JS 体积。

### 18.2 与 SSR 的区别

- SSR：在服务端生成 HTML，但组件代码仍在客户端执行
- Server Components：只在服务端运行，代码不会发送到客户端

## 十九、React 与 TypeScript

### 19.1 组件类型

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
```

### 19.2 常用类型

- `React.ReactNode`：任意可渲染内容
- `React.ElementType`：组件类型
- `React.RefObject`：ref 类型

## 二十、React 项目结构

### 20.1 按功能组织

```
src/
├── features/
│   ├── auth/
│   ├── dashboard/
│   └── profile/
├── components/
├── hooks/
├── utils/
└── api/
```

### 20.2 按职责组织

```
src/
├── components/
├── pages/
├── stores/
├── services/
└── styles/
```

选择适合团队和项目的结构即可，关键是保持一致。

## 二十一、总结

React 是一个不断演进的生态系统。从组件化、Hooks 到并发特性、Server Components，React 始终在探索更好的 UI 开发方式。作为开发者，我们要掌握核心原理，理解设计思想，同时关注生态发展，在实践中不断提升自己的 React 开发能力。

## 二十二、React 的错误边界

### 22.1 什么是错误边界

错误边界（Error Boundary）是 React 组件，用于捕获子组件树中的 JavaScript 错误，防止整个应用崩溃。

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
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 22.2 错误边界的限制

错误边界不能捕获：

- 自身内部的错误
- 事件处理函数中的错误
- 异步代码中的错误
- SSR 中的错误

## 二十三、React 的 Refs

### 23.1 useRef

`useRef` 返回一个可变的 ref 对象，常用于访问 DOM 或保存不触发渲染的值。

```jsx
function Timer() {
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {}, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return <div>Timer</div>;
}
```

### 23.2 forwardRef

`forwardRef` 用于把 ref 转发给子组件。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="fancy">{props.children}</button>
));
```

## 二十四、React 的 Portals

Portals 允许把子节点渲染到父组件以外的 DOM 节点，常用于模态框、提示框等。

```jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')
  );
}
```

## 二十五、React 与状态管理选型

### 25.1 何时需要状态管理库

- 多个组件需要共享状态
- 状态逻辑复杂，需要中间件
- 需要时间旅行调试
- 团队需要强规范

### 25.2 轻量方案 vs 重量方案

- 轻量：useState/useReducer + Context、Zustand、Jotai
- 重量：Redux、MobX

选择时应考虑项目规模、团队熟悉度和长期维护成本。

## 二十六、React 的 Suspense 与数据获取

### 26.1 Suspense 的基本用法

```jsx
<Suspense fallback={<Loading />}>
  <ProfileData />
</Suspense>
```

### 26.2 配合数据获取库

Suspense 与 Relay、SWR、React Query 等数据获取库配合使用效果最佳。

## 二十七、总结

React 的学习曲线可能看起来陡峭，但只要抓住组件化、声明式、Hooks、Fiber 这几个核心概念，就能逐步深入。React 的生态系统非常丰富，从状态管理到路由，从测试到部署，都有成熟的解决方案。保持对官方文档和新特性的关注，结合实际项目不断实践，你一定能够成为优秀的 React 开发者。

## 二十八、React 性能优化进阶

### 28.1 React.memo 的合理使用

`React.memo` 用于缓存函数组件，避免不必要的重渲染。但它本身也有比较开销。

```jsx
const ExpensiveComponent = React.memo(function Expensive({ data }) {
  // 渲染逻辑
});
```

### 28.2 useMemo 与 useCallback

- `useMemo`：缓存计算结果
- `useCallback`：缓存函数引用

不要滥用，只有当确实影响性能时使用。

### 28.3 虚拟列表

对于长列表，使用 `react-window` 或 `react-virtualized` 只渲染可视区域内容。

## 二十九、React 中的副作用管理

### 29.1 useEffect 依赖数组

依赖数组必须包含所有在 effect 中使用的响应式值。

```jsx
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### 29.2 清理副作用

对于订阅、定时器等副作用，要在清理函数中释放资源。

```jsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

## 三十、React 与现代前端趋势

### 30.1 Server Components

React Server Components 正在改变前端架构，让服务端承担更多渲染工作。

### 30.2 边缘渲染

结合 Vercel、Cloudflare Workers 等平台，React 应用可以在边缘节点渲染，进一步提升性能。

## 三十一、总结

React 已经成为现代前端开发的基石之一。从组件化思想到 Fiber 架构，从 Hooks 到并发模式，React 不断推动前端工程的发展。掌握 React 不仅需要学习 API，更需要理解其设计思想和最佳实践。希望本文能帮助你建立扎实的 React 知识体系，在实际项目中游刃有余。

## 三十二、React 中的数据获取模式

### 32.1 在 Effect 中获取数据

最常见的数据获取方式是在 `useEffect` 中调用 API。

```jsx
useEffect(() => {
  let ignore = false;
  async function fetchData() {
    const result = await fetch('/api/user');
    const data = await result.json();
    if (!ignore) setUser(data);
  }
  fetchData();
  return () => { ignore = true; };
}, [userId]);
```

### 32.2 使用数据获取库

React Query、SWR、RTK Query 等库提供了更优雅的数据获取方案，包括缓存、重试、去重等功能。

## 三十三、React 表单处理最佳实践

### 33.1 受控组件优先

优先使用受控组件，让 React 管理表单状态。

### 33.2 表单验证

使用 React Hook Form + Zod 或 Yup 进行声明式表单验证。

```jsx
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

## 三十四、React 与微前端

### 34.1 微前端中的 React

React 应用可以作为微前端子应用，通过 qiankun、Module Federation 等方案集成。

### 34.2 样式隔离

微前端场景下要注意样式隔离，避免子应用间互相影响。

## 三十六、React 19：Actions、useOptimistic、use 与 React Compiler

### 36.1 React 19 新特性概览

React 19 是 React 团队近年来最大的版本升级之一，核心目标是让数据变更、表单处理、乐观更新和异步数据消费变得更简单、更符合直觉。

主要新特性：

- **Actions**：把异步数据变更函数标记为 action，自动处理 pending 状态和错误。
- **useOptimistic**：在异步操作完成前，先乐观地更新 UI。
- **use**：在渲染中读取 Promise / Context / Context-like 值。
- **React Compiler**：自动记忆化组件，减少手动使用 `useMemo`/`useCallback`/`React.memo`。
- **Server Actions**：允许客户端直接调用服务端函数。
- **改进的表单处理**：原生表单与 React 状态更深度集成。

### 36.2 Actions

Action 是一个被 `startTransition` 包裹的异步函数。React 会自动追踪 action 的执行状态。

```jsx
import { useTransition } from "react";

function UpdateNameForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData) => {
    startTransition(async () => {
      await updateName(formData.get("name"));
    });
  };

  return (
    <form action={handleSubmit}>
      <input name="name" />
      <button disabled={isPending}>更新</button>
    </form>
  );
}
```

在 React 19 中，你可以直接把异步函数作为 `action` 属性，React 会自动处理 pending 状态。

### 36.3 useOptimistic

乐观更新让用户操作后立即看到结果，而不需要等待服务器响应。

```jsx
import { useOptimistic } from "react";

function Messages({ messages }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { text: newMessage, sending: true }]
  );

  async function sendMessage(formData) {
    const text = formData.get("message");
    addOptimisticMessage(text);
    await deliverMessage(text);
  }

  return (
    <>
      {optimisticMessages.map((msg, i) => (
        <div key={i} style=&#123;&#123; opacity: msg.sending ? 0.5 : 1 &#125;&#125;>
          {msg.text}
        </div>
      ))}
      <form action={sendMessage}>
        <input name="message" />
        <button>发送</button>
      </form>
    </>
  );
}
```

### 36.4 use Hook

`use` 是一个新的 Hook，允许在渲染过程中读取 Promise 或 Context。它只能在渲染、其他 Hook 或 Server Components 中调用。

```jsx
import { use, Suspense } from "react";

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise); // 像 await，但在渲染中
  return comments.map((c) => <p key={c.id}>{c.text}</p>);
}

function Page({ commentsPromise }) {
  return (
    <Suspense fallback={<div>Loading comments...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

`use` 让数据获取组件化，配合 Server Components 和 Suspense 使用效果更佳。

### 36.5 React Compiler

React Compiler 是 React 官方推出的编译时自动记忆化工具。它会在构建阶段分析组件和 Hook 的依赖关系，自动插入 memoization，开发者不再需要手动写 `useMemo`、`useCallback`、`React.memo`。

```jsx
// 之前可能需要 useMemo/useCallback
function Expensive({ items, onSelect }) {
  // React Compiler 会自动优化这里
  return <List items={items} onSelect={onSelect} />;
}
```

注意事项：

- React Compiler 目前仍在逐步推广中，需要配合 Babel 插件使用。
- 它遵循 React 规则，因此项目需要遵守 Hooks 规则。
- 不是万能的，极端场景仍需手动优化。

---

## 三十七、Server Actions：客户端直接调用服务端

### 37.1 什么是 Server Actions？

Server Actions 是 React 生态中的一项能力（主要见于 Next.js App Router），允许你在服务端定义函数，然后像调用普通函数一样在客户端调用它们。这消除了传统 REST/GraphQL API 的样板代码。

生活化比喻：以前客户端想和后端通信，需要写一封信（HTTP 请求）并等回信；Server Actions 像给客户端和后端之间装了一部直通电话，直接说话。

### 37.2 基本用法

```jsx
// actions.js
"use server";

export async function updateName(formData) {
  const name = formData.get("name");
  await db.user.update({ where: { id: 1 }, data: { name } });
  return { success: true };
}

// page.jsx
import { updateName } from "./actions";

export default function Page() {
  return (
    <form action={updateName}>
      <input name="name" />
      <button>更新名字</button>
    </form>
  );
}
```

### 37.3 Server Actions 的优势

- **减少样板代码**：不需要写 API 路由、fetch 调用、序列化/反序列化。
- **类型安全**：函数参数和返回值天然类型化。
- **服务端能力**：可以直接访问数据库、文件系统、内部服务。
- **渐进增强**：即使 JavaScript 禁用，原生表单也能工作。

### 37.4 安全注意事项

- Server Actions 必须验证所有输入，因为客户端可以被绕过。
- 需要做好权限校验，不能假设调用者都是合法用户。
- 敏感操作应配合 CSRF 防护和速率限制。

---

## 三十八、Hydration 失败处理

### 38.1 什么是 Hydration？

Hydration 是 SSR/SSG 应用把服务端生成的静态 HTML“激活”为可交互 React 组件的过程。React 会对比服务端生成的 HTML 和客户端首次渲染的结果，如果两者不一致，就会发生 hydration 失败。

### 38.2 Hydration 失败的常见原因

| 原因 | 示例 |
|------|------|
| 服务端和客户端时间不同 | `new Date()` 在两端结果不同 |
| 浏览器 API 仅在客户端可用 | `window`、`localStorage`、`document` |
| 随机数/UUID | `Math.random()`、`crypto.randomUUID()` |
| 用户相关数据 | 客户端从 localStorage 读取主题/语言 |
| 第三方脚本修改 DOM | 客服插件、统计脚本插入元素 |

### 38.3 如何避免 Hydration 失败

```jsx
import { useEffect, useState } from "react";

function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : null;
}

function Page() {
  return (
    <div>
      <h1>服务端渲染的内容</h1>
      <ClientOnly>
        <div>只在客户端渲染的内容</div>
      </ClientOnly>
    </div>
  );
}
```

### 38.4 React 18 的 `hydrateRoot` 与错误处理

```jsx
import { hydrateRoot } from "react-dom/client";

hydrateRoot(document.getElementById("root"), <App />);
```

React 18 会在 hydration 不匹配时尽可能恢复，而不是直接白屏。你可以在 `console.error` 中查看具体的不匹配信息，定位问题。

### 38.5 Hydration 失败处理最佳实践

1. **避免在 SSR 阶段使用浏览器 API**：把客户端逻辑放到 `useEffect` 或 `ClientOnly` 组件中。
2. **统一数据源**：时间、随机数等尽量从服务端传入或固定。
3. **谨慎使用第三方脚本**：避免它们修改 React 管理的 DOM。
4. **使用 `suppressHydrationWarning`**：对确实无法避免的不一致（如时间戳）加此属性抑制警告。
5. **监控与上报**：把 hydration 错误接入错误监控系统。

---

## 三十九、总结

React 的学习永无止境。本文从核心概念、Fiber、Hooks、并发特性、状态管理、性能优化、SSR 等方面进行了系统介绍，并深入探讨了 React 19 的新特性、Server Actions 和 Hydration 失败处理。React 19 让数据变更和异步数据消费更加直观，Server Actions 模糊了前后端的边界，而对 Hydration 问题的理解则是 SSR 应用稳定性的关键。希望你能够把这些知识融会贯通，在实际项目中不断实践和提升。

---

> **领域编号**：E06 React 原理与生态  
> **最后更新**：2026-06-24


---

## 本领域学习进度

<MarkComplete domainId="react" />
<ProgressTracker />
