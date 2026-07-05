# 数据与状态管理 面试题

> 本题库共收录 **44** 道面试题（基础 12 / 进阶 12 / 深入 12 / 架构 8）。
> 本文件收录数据与状态管理相关面试题，目标题量 30 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、框架原理题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-29-CO-B-001：什么是客户端状态和服务端状态？它们有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理
**标签**：客户端状态、服务端状态、状态分类、数据源
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释客户端状态和服务端状态的概念，并说明它们在前端应用中的区别与管理方式。

**参考答案**：

- **客户端状态（Client State）**：指仅存在于浏览器端、由前端自己产生和维护的数据。例如 UI 开关、主题、表单输入、路由状态、本地缓存等。它的生命周期由前端控制，关闭页面后通常会丢失（除非持久化）。
- **服务端状态（Server State）**：指来源于服务端、反映服务器真实数据的状态。例如用户信息、订单列表、商品详情等。它有权威性（source of truth），前端需要通过网络请求获取并同步。

核心区别：

| 维度 | 客户端状态 | 服务端状态 |
|------|-----------|-----------|
| 来源 | 前端自身产生 | 服务端 API |
| 权威性 | 本地有效 | 服务端为唯一真相源 |
| 同步方式 | 本地即时更新 | 异步请求、缓存、重新验证 |
| 生命周期 | 页面关闭可丢失 | 持久化在服务端 |
| 典型库 | Redux、Zustand、Pinia | React Query、SWR、TanStack Query |

最佳实践：
- 不要把服务端状态无差别地放入全局状态管理库。
- 使用专门的服务端状态管理库处理缓存、失效、重新验证。
- 客户端状态按作用域决定放在组件本地还是全局。

**评分维度**：
- 能清晰区分两类状态的来源和权威性（40%）
- 能说明生命周期和同步方式的差异（30%）
- 能举例说明典型场景和对应管理工具（30%）

**常见错误**：
- 把所有 API 数据都塞入 Redux / Pinia，导致缓存和同步逻辑重复实现。
- 认为 Redux 不适合放服务端状态，完全否定其适用场景。
- 混淆本地缓存（localStorage）和服务端状态。

**延伸追问**：
- 如果一个状态既是服务端状态又被前端修改，应该怎么管理？
- 表单草稿属于客户端状态还是服务端状态？

**相关题目**：
- [FB-29-CO-B-002 全局状态与局部状态](#FB-29-CO-B-002)
- [FB-29-CO-A-009 SWR 缓存策略](#FB-29-CO-A-009)

**参考资源**：
- [React Query - Server State](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Patterns.dev - Client vs Server State](https://www.patterns.dev/posts/client-vs-server-state/)

**口头回答版**：
> 客户端状态是前端自己产生的，比如主题、弹窗开关、表单输入，关掉页面就没了；服务端状态是服务器返回的，比如用户资料、订单列表，服务器是唯一的真相源。管理方式是：客户端状态用 Redux、Zustand、Pinia 这类状态库；服务端状态最好用 React Query、SWR 这种专门处理缓存、失效和重新验证的库。不要把所有 API 数据都塞到全局状态库里。

---

### FB-29-CO-B-002：全局状态和局部状态有什么区别？如何选择作用域？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理
**标签**：全局状态、局部状态、状态作用域、状态提升
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明全局状态和局部状态的区别，并给出选择状态作用域的原则。

**参考答案**：

- **局部状态（Local State）**：仅在某个组件或其子树内使用，通过 `useState`、`ref`、组件 props 等管理。数据流清晰、影响范围小、容易测试和复用。
- **全局状态（Global State）**：跨多个组件、路由或模块共享，通常通过 Context、状态管理库或 URL 参数管理。

选择原则：

1. **从局部开始**：先放在离使用最近的组件，避免过早全局化。
2. **需要共享再提升**：当多个 sibling 组件需要同一状态时，提升到最近的公共父组件。
3. **跨路由/模块共享时放入全局**：例如用户登录态、权限、主题。
4. **服务端状态单独管理**：不要和无脑放入 Redux，优先使用 TanStack Query / SWR。
5. **URL 状态交给路由**：可分享、可回退的状态，例如筛选条件、分页、当前 tab。

示例：

```tsx
// 局部状态：仅当前表单组件使用
const [formValues, setFormValues] = useState({ name: '' });

// 全局状态：登录用户信息，多个页面共享
const useUserStore = create(() => ({ user: null }));
```

**评分维度**：
- 能区分全局与局部状态的影响范围（40%）
- 能说出“从局部开始、按需提升”的原则（30%）
- 能举例说明不同作用域的典型状态（30%）

**常见错误**：
- 所有状态一开始就放入全局 Store。
- 把只在一个组件里使用的状态也通过 Redux 管理。
- 忽略 URL 作为状态容器的作用。

**延伸追问**：
- 状态提升和 Context 有什么关系？
- 什么时候应该把全局状态下沉到局部？

**相关题目**：
- [FB-29-CO-B-001 客户端状态与服务端状态](#FB-29-CO-B-001)
- [FB-29-CO-A-016 状态提升与状态下沉](#FB-29-CO-A-016)

**参考资源**：
- [React - Lifting State Up](https://react.dev/learn/sharing-state-between-components)
- [Kent C. Dodds - State Colocation](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)

**口头回答版**：
> 局部状态只在某个组件里用，比如一个开关、一个输入框；全局状态是跨组件甚至跨路由共享的，比如用户信息、主题。选择原则是从局部开始，哪个组件用就放在哪；多个组件需要就提升到公共父组件；跨路由或模块再用全局 Store。别一上来就把所有状态都塞全局，服务端状态还要单独管理。

---

### FB-29-CO-B-003：Redux 的核心概念有哪些？简述它的数据流

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理
**标签**：Redux、Store、Action、Reducer、单向数据流
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Redux 的核心概念（Store、Action、Reducer），并描述一次完整的数据更新流程。

**参考答案**：

Redux 的核心概念：

1. **Store**：单一的状态树，保存整个应用的 state，提供 `getState()`、`dispatch()` 和 `subscribe()`。
2. **Action**：描述发生了什么的普通对象，必须包含 `type` 字段，可携带 payload。
3. **Reducer**：纯函数，接收当前 state 和 action，返回新的 state。`(state, action) => newState`。
4. **Dispatch**：触发 action 的方法，`store.dispatch(action)`。

数据流：

```text
View -> dispatch(Action) -> Reducer -> new State -> View re-render
```

完整示例：

```ts
// Action
const increment = (payload) => ({ type: 'INCREMENT', payload });

// Reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload;
    default:
      return state;
  }
};

// Store
const store = createStore(counterReducer);

// View
document.getElementById('add').addEventListener('click', () => {
  store.dispatch(increment(1));
});
```

特点：
- 单一数据源、state 只读、使用纯函数修改。
- 数据流单向、可预测、便于调试和回溯。

**评分维度**：
- 能准确说出 Store、Action、Reducer 的定义（50%）
- 能按顺序描述 dispatch 到 view 更新的完整流程（30%）
- 能写出或口述一个简单的 reducer 示例（20%）

**常见错误**：
- 在 reducer 中直接修改原 state。
- 把异步逻辑写在 reducer 中。
- 认为 Redux 必须配合 React 使用。

**延伸追问**：
- Redux 为什么要强调不可变更新？
- Redux Toolkit 如何简化样板代码？

**相关题目**：
- [FB-29-CO-A-012 Redux 与 MobX 对比](#FB-29-CO-A-012)
- [FB-29-FS-P-017 Redux 中间件原理](#FB-29-FS-P-017)

**参考资源**：
- [Redux 官方文档 - Three Principles](https://redux.js.org/understanding/thinking-in-redux/three-principles)
- [Redux Toolkit 文档](https://redux-toolkit.js.org/)

**口头回答版**：
> Redux 核心是 Store、Action、Reducer。Store 是保存全局状态的容器；Action 是一个带 type 的普通对象，描述发生了什么事；Reducer 是纯函数，根据当前 state 和 action 返回新的 state。数据流是：组件 dispatch 一个 action，reducer 处理后返回新 state，然后组件重新渲染。Redux 强调单一数据源、state 只读、用纯函数修改。

---

### FB-29-CO-B-004：Pinia 和 Vuex 有什么区别？为什么 Vue 3 推荐 Pinia？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理、16 Vue
**标签**：Pinia、Vuex、Vue 3、状态管理、Composition API
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 Pinia 和 Vuex，并说明 Pinia 为什么成为 Vue 3 官方推荐的状态管理方案。

**参考答案**：

| 维度 | Vuex 3/4 | Pinia |
|------|----------|-------|
| API 风格 | Options API 风格（state/mutations/actions/getters） | Composition API 风格，直接用 state/actions/getters |
| mutations | 必须同步，通过 mutations 修改 state | 无 mutations，action 中可直接修改 state |
| TypeScript | 类型支持较弱，需要额外封装 | 原生 TypeScript 支持，类型推导好 |
| 模块拆分 | 需要 namespaced 模块 | 每个 Store 天然是独立模块 |
| 体积 | 较大 | 更轻量 |
| 与 Vue 3 | 支持但设计偏旧 | 官方推荐，设计贴合 Composition API |
| Devtools | 支持 | 支持更好 |

Pinia 示例：

```ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  const increment = () => count.value++;

  return { count, double, increment };
});
```

Vue 3 推荐 Pinia 的原因：
- 更好的 TypeScript 支持。
- API 更简洁，没有 mutations 的样板代码。
- 与 Composition API / `script setup` 天然契合。
- 模块化和 tree-shaking 更友好。

**评分维度**：
- 能说出 Pinia 无 mutations、API 更简洁（40%）
- 能对比 TS 支持和模块拆分方式（30%）
- 能说明与 Vue 3 Composition API 的契合度（30%）

**常见错误**：
- 认为 Pinia 完全不支持 Options API（实际是支持的）。
- 认为 Pinia 不能用于 Vue 2（Pinia 同时支持 Vue 2 和 Vue 3）。
- 在 Pinia 的 action 里仍然写 mutation 风格的代码。

**延伸追问**：
- Pinia 的 Store 如何做持久化？
- Pinia 的 action 支持 async 吗？和 Vuex 的 actions 有什么区别？

**相关题目**：
- [FB-29-CO-B-005 Zustand 与 Redux 对比](#FB-29-CO-B-005)
- [FB-29-CO-A-012 MobX 与 Redux 对比](#FB-29-CO-A-012)

**参考资源**：
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vuex 官方文档](https://vuex.vuejs.org/)

**口头回答版**：
> Pinia 是 Vue 3 官方推荐的状态管理库。和 Vuex 比，Pinia 没有 mutations，action 里可以直接改 state，代码更简洁；TypeScript 支持也更好；每个 Store 天然是独立模块，不需要 namespaced。Vuex 必须用 mutations 同步修改 state，类型支持也相对弱。所以 Vue 3 项目一般直接用 Pinia，配合 Composition API 很舒服。

---

### FB-29-CO-B-005：Zustand 和 Redux 相比有什么优势和劣势？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理、15 React
**标签**：Zustand、Redux、状态管理、React、轻量
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 Zustand 和 Redux，说明它们各自的适用场景。

**参考答案**：

Zustand 是一个轻量、简单的 React 状态管理库；Redux 是更成熟、生态更丰富的可预测状态容器。

| 维度 | Redux | Zustand |
|------|-------|---------|
| 学习曲线 | 较陡，需要理解 Action/Reducer/Middleware | 平缓，几行代码即可使用 |
| 样板代码 | 多（ especially 原始 Redux） | 极少 |
| TypeScript | Redux Toolkit 已大幅改善 | 原生优秀 |
| 中间件生态 | 丰富（redux-thunk、redux-saga、RTK Query 等） | 较少，但常用功能内置 |
| 调试工具 | Redux DevTools 成熟 | 支持 Redux DevTools 中间件 |
| 适用规模 | 大型应用、复杂状态逻辑 | 中小型应用、局部/轻量全局状态 |
| 不可变性 | 强制不可变 | 推荐不可变，但不强制 |

Zustand 示例：

```ts
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// 组件中使用
const count = useStore((state) => state.count);
```

选型建议：
- 大型应用、需要严格数据流、时间旅行调试、复杂异步流：选 Redux Toolkit。
- 中小型应用、希望快速上手、状态逻辑不太复杂：选 Zustand。
- 两者可以共存，局部状态用 Zustand，复杂全局状态用 Redux Toolkit。

**评分维度**：
- 能从学习曲线、样板代码、生态三个维度对比（50%）
- 能写出 Zustand 基础用法（30%）
- 能给出选型建议（20%）

**常见错误**：
- 认为 Zustand 完全替代 Redux（大型复杂场景 Redux 仍有优势）。
- 在 Zustand 中直接修改 state 而不使用 set。
- 选择状态库时不考虑团队规模和长期维护成本。

**延伸追问**：
- Zustand 如何实现状态的按需订阅？
- Zustand 如何处理异步 action？

**相关题目**：
- [FB-29-CO-B-003 Redux 核心概念](#FB-29-CO-B-003)
- [FB-29-CD-P-022 手写简化状态管理库](#FB-29-CD-P-022)

**参考资源**：
- [Zustand 官方文档](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Redux Toolkit 文档](https://redux-toolkit.js.org/)

**口头回答版**：
> Zustand 比 Redux 轻量很多，几行代码就能跑起来，学习成本低，TypeScript 支持也好；Redux 生态更丰富，中间件多，适合大型复杂应用。Zustand 用 create 创建 store，组件里用 selector 按需订阅。一般来说，中小型项目或局部状态用 Zustand，大型项目、需要严格数据流和时间旅行调试的用 Redux Toolkit。两者不是完全互斥的。

---

### FB-29-CO-B-006：React Query / TanStack Query 主要解决什么问题？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理、15 React
**标签**：React Query、TanStack Query、服务端状态、缓存、SWR
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 React Query（TanStack Query）主要解决什么问题，以及它与传统状态管理库的核心区别。

**参考答案**：

React Query 是专门管理**服务端状态**的库，核心解决以下问题：

1. **数据获取**：简化请求、loading、error 状态管理。
2. **缓存**：避免重复请求，提升性能和用户体验。
3. **失效与重新验证（Stale-while-revalidate）**：在缓存过期或窗口重新聚焦时自动刷新。
4. **后台更新**：用户无感知地保持数据新鲜。
5. **分页、无限滚动、乐观更新、去重**：内置常见数据请求模式。
6. **devtools**：可视化缓存状态和查询生命周期。

与传统状态管理库（Redux、Zustand、Pinia）的区别：

| 维度 | Redux / Zustand / Pinia | React Query |
|------|------------------------|-------------|
| 管理对象 | 客户端状态 | 服务端状态 |
| 数据同步 | 手动 | 自动缓存 + 重新验证 |
| 缓存策略 | 无内置 | 强大的缓存和失效策略 |
| 异步处理 | 需要 thunk / saga 等 | 内置 |
| 目标 | 全局状态共享 | 服务端数据获取与同步 |

基础示例：

```tsx
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then((res) => res.json()),
  });

  if (isLoading) return <p>加载中...</p>;
  if (error) return <p>出错了</p>;
  return <div>{data.name}</div>;
}
```

**评分维度**：
- 能说出 React Query 主要解决服务端状态管理问题（40%）
- 能列举缓存、失效、后台刷新等核心能力（30%）
- 能与传统状态管理库区分管理对象（30%）

**常见错误**：
- 用 React Query 管理所有状态，包括 UI 开关等客户端状态。
- 忽略 `queryKey` 的设计，导致缓存失效问题。
- 认为 React Query 可以完全替代 Redux。

**延伸追问**：
- `queryKey` 的设计原则是什么？
- React Query 的 `staleTime` 和 `gcTime` 有什么区别？

**相关题目**：
- [FB-29-CO-B-001 客户端状态与服务端状态](#FB-29-CO-B-001)
- [FB-29-FS-P-018 React Query 缓存机制](#FB-29-FS-P-018)

**参考资源**：
- [TanStack Query 文档](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Query 核心概念](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)

**口头回答版**：
> React Query 主要解决服务端状态管理问题。传统状态库比如 Redux 是管客户端状态的，React Query 是专门管 API 数据的：帮你做缓存、loading、error、失效重新验证、后台刷新、分页、乐观更新这些。它和传统状态库不是替代关系，而是互补。用 `useQuery` 时传 queryKey 和 queryFn，它会自动帮你缓存和刷新。

---

### FB-29-CO-B-007：SWR 是什么？它和 React Query 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理、15 React
**标签**：SWR、React Query、缓存、数据获取、Next.js
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 SWR 的核心思想，并对比 SWR 和 React Query 的差异。

**参考答案**：

SWR（stale-while-revalidate）是 Vercel 推出的数据获取库，名字本身就来自 HTTP 缓存策略：先返回缓存（stale）数据，同时在后台重新验证（revalidate）最新数据。

核心思想：

1. **优先使用缓存**：页面首次加载或返回时，先展示缓存数据，减少白屏。
2. **后台自动重新验证**：在合适的时机（窗口聚焦、网络恢复、定时器）自动刷新。
3. **极简 API**：主要以 `useSWR(key, fetcher)` 为核心。
4. **与 Next.js 生态深度集成**：适合 SSR/SSG 场景。

SWR 与 React Query 对比：

| 维度 | SWR | React Query |
|------|-----|-------------|
| 体积 | 更轻量 | 稍大 |
| API 简洁度 | 更简洁 | 更完整 |
| 功能丰富度 | 基础功能完善，高级功能较少 | 更丰富（mutation、devtools、离线等） |
| 生态/工具 | DevTools 较弱 | DevTools 强大 |
| 适用场景 | 简单数据同步、Next.js 项目 | 复杂服务端状态管理 |

SWR 示例：

```tsx
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);

  if (isLoading) return <div>loading</div>;
  if (error) return <div>failed</div>;
  return <div>hello {data.name}</div>;
}
```

**评分维度**：
- 能解释 SWR 名字来源和核心思想（40%）
- 能对比 SWR 与 React Query 的简洁度和功能丰富度（30%）
- 能写出基础 useSWR 用法（30%）

**常见错误**：
- 认为 SWR 只能用于 Next.js。
- 把 SWR 当作全局状态管理库使用。
- 在 mutation 场景下仍用 SWR 而不用 `useSWRMutation`。

**延伸追问**：
- SWR 的 `revalidateOnFocus` 参数有什么用？
- 如果 SWR 和 React Query 都可以满足需求，如何选型？

**相关题目**：
- [FB-29-CO-B-006 React Query 主要解决什么问题](#FB-29-CO-B-006)
- [FB-29-CO-A-010 缓存失效策略](#FB-29-CO-A-010)

**参考资源**：
- [SWR 官方文档](https://swr.vercel.app/)
- [React Query vs SWR](https://tanstack.com/query/latest/docs/framework/react/comparison)

**口头回答版**：
> SWR 是 Vercel 出的数据获取库，名字来自 HTTP 缓存策略 stale-while-revalidate：先拿缓存数据给用户看，同时在后台去拉最新数据。核心 API 是 `useSWR(key, fetcher)`。它和 React Query 都是管服务端状态的，SWR 更轻量、API 更简单，适合 Next.js 或需求不复杂的项目；React Query 功能更全，有强大的 devtools、mutation、离线支持，适合复杂场景。

---

### FB-29-CO-B-008：表单状态为什么要单独管理？受控与非受控表单如何选择？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理
**标签**：表单状态、受控组件、非受控组件、React Hook Form、Formik
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明表单状态为什么值得单独抽象和管理，并解释受控表单与非受控表单的区别和选择依据。

**参考答案**：

表单状态之所以需要单独管理，是因为它具备以下特点：

1. **高频变更**：每个输入框都会触发更新，放在全局状态容易导致大范围重渲染。
2. **局部性**：表单状态通常只在表单组件内部使用，天然适合局部管理。
3. **校验与格式化**：需要实时校验、错误提示、字段联动、格式化。
4. **提交语义**：表单有初始化、校验、提交、重置等明确生命周期。
5. **性能敏感**：不必要的重渲染会显著影响输入体验。

受控表单 vs 非受控表单：

| 维度 | 受控表单 | 非受控表单 |
|------|---------|-----------|
| 数据来源 | React/Vue state | DOM 自身 |
| 更新方式 | onChange 更新 state | ref 读取 DOM 值 |
| 实时校验 | 容易 | 需要手动 |
| 性能 | 每次输入触发渲染 | 更少渲染 |
| 典型库 | Formik、React Final Form、@mantine/form | React Hook Form |
| 适用场景 | 复杂联动、实时校验 | 大型表单、性能敏感 |

示例（受控）：

```tsx
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

示例（非受控，React Hook Form）：

```tsx
const { register, handleSubmit } = useForm();
<input {...register('name')} />;
```

选择依据：
- 简单表单或需要实时联动：受控。
- 大型表单、字段多、性能敏感：非受控（React Hook Form）。

**评分维度**：
- 能说明表单状态高频、局部、校验等特点（40%）
- 能区分受控和非受控表单的数据来源与更新方式（30%）
- 能给出选择依据和典型库（30%）

**常见错误**：
- 所有表单状态都放到全局 Store。
- 在大型表单中仍使用完全受控，导致输入卡顿。
- 认为非受控表单不能做校验。

**延伸追问**：
- React Hook Form 的性能优势来自哪里？
- 文件上传框为什么通常用非受控？

**相关题目**：
- [FB-29-CO-A-014 表单状态管理库对比](#FB-29-CO-A-014)
- [FB-29-CO-P-019 状态机与 XState](#FB-29-CO-P-019)

**参考资源**：
- [React Hook Form 文档](https://react-hook-form.com/)
- [Formik 文档](https://formik.org/)

**口头回答版**：
> 表单状态要单独管理，因为它更新很频繁，而且基本只在表单组件里用。放全局 Store 会让很多无关组件重新渲染。表单分受控和非受控：受控是每个输入都绑定 state，onChange 更新，适合做实时校验和联动；非受控是 DOM 自己保存值，用 ref 或 React Hook Form 去取，性能更好，适合字段很多的大型表单。

---

## 进阶题（8 道）{#advanced}

### FB-29-CO-A-009：SWR 缓存策略是什么？stale-while-revalidate 如何在前端应用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：29 数据与状态管理
**标签**：SWR、stale-while-revalidate、缓存策略、React Query、数据新鲜度
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 SWR（stale-while-revalidate）缓存策略的原理，并说明它在前端数据管理中的应用场景和注意事项。

**参考答案**：

SWR 是一种 HTTP 缓存控制策略，也被 React Query、SWR 等库借鉴为数据同步策略。其核心思想是：

1. **Stale（陈旧数据优先）**：当缓存存在但可能已过期时，先立即返回缓存数据给用户。
2. **Revalidate（后台重新验证）**：同时异步发起请求去服务端校验/获取最新数据。
3. **更新 UI**：后台请求完成后，如果数据有变化，再更新界面。

流程图：

```text
用户请求数据
  │
  ▼
缓存是否存在？
  │
  ├─ 是 ──▶ 立即返回缓存（stale）
  │           │
  │           ▼
  │        后台发起请求（revalidate）
  │           │
  │           ▼
  │        数据变化则更新 UI
  │
  └─ 否 ──▶ 发起请求，等待最新数据
```

应用场景：

- 首页feed、商品列表、用户资料等容忍短暂不一致的数据。
- 用户返回页面或切换 tab 时，避免白屏。
- 网络抖动或弱网环境下提升可用性。

注意事项：

- **数据新鲜度要求**：金融支付、库存扣减等对一致性要求极高的场景不适合单纯 SWR。
- **错误处理**：后台 revalidate 失败时，要有降级策略（toast、重试按钮）。
- **更新冲突**：用户正在编辑时，后台刷新可能覆盖用户输入。

示例（React Query 中配置 SWR 行为）：

```tsx
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 1000 * 60 * 5, // 5 分钟内视为 fresh
  refetchOnWindowFocus: true,
});
```

**评分维度**：
- 能准确解释 stale-while-revalidate 两个阶段的含义（40%）
- 能说明适用场景和不适合的场景（30%）
- 能指出数据一致性、错误处理等注意事项（30%）

**常见错误**：
- 把 SWR 策略用于所有数据，忽略强一致性需求。
- 认为 stale 数据一定是错误数据。
- 不配置 staleTime / refetch 策略，导致请求过于频繁。

**延伸追问**：
- 如果后台 revalidate 返回的数据和用户当前编辑冲突，怎么处理？
- SWR 策略和强制刷新（hard refresh）如何结合？

**相关题目**：
- [FB-29-CO-B-006 React Query 主要解决什么问题](#FB-29-CO-B-006)
- [FB-29-CO-A-010 缓存失效策略](#FB-29-CO-A-010)

**参考资源**：
- [MDN - Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [React Query - Caching Overview](https://tanstack.com/query/latest/docs/framework/react/guides/caching)

**口头回答版**：
> SWR 就是 stale-while-revalidate：先拿缓存里的旧数据给用户看，不让页面白屏，同时后台悄悄去服务器拉最新数据，拉到了再更新界面。React Query 和 SWR 库都是这个思路。适合对实时性要求不高的场景，比如商品列表、用户资料。但像支付、库存这种强一致性场景不能光靠 SWR，要结合强制刷新或乐观更新。

---

### FB-29-CO-A-010：前端缓存失效策略有哪些？如何选择？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：29 数据与状态管理
**标签**：缓存失效、缓存策略、React Query、SWR、数据一致性
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举前端常见的缓存失效策略，并说明在不同业务场景下如何选择。

**参考答案**：

常见缓存失效策略：

1. **TTL（Time To Live）**：
   - 给缓存设置固定过期时间，过期后重新请求。
   - 适用于更新频率可预测的数据，如配置项、分类列表。

2. **Stale-While-Revalidate（SWR）**：
   - 先返回缓存，后台异步刷新。
   - 适用于能容忍短暂不一致的展示型数据。

3. **事件驱动失效（Event-based Invalidation）**：
   - 当某个操作（mutation）成功后，主动使相关 queryKey 的缓存失效。
   - 例如创建订单后，失效订单列表缓存。

4. **乐观更新（Optimistic Update）**：
   - 先更新 UI，再发请求，失败则回滚。
   - 属于“写”侧缓存策略，常与 SWR 配合使用。

5. **手动刷新 / 强制刷新**：
   - 提供刷新按钮或下拉刷新，明确重新获取数据。
   - 适合用户主动触发或强一致性场景。

6. **基于版本的缓存（Version-based）**：
   - 服务端返回数据版本号或 ETag，前端对比后决定是否使用缓存。
   - 适合需要精确控制一致性的场景。

7. **窗口聚焦/网络恢复重新验证**：
   - 用户切换回页面或网络恢复时自动刷新。

选择依据：

| 场景 | 推荐策略 |
|------|---------|
| 商品列表、资讯 feed | SWR + 窗口聚焦刷新 |
| 用户配置、字典数据 | TTL（较长） |
| 创建/更新/删除后 | 事件驱动失效 + 乐观更新 |
| 支付结果、库存 | 强制刷新 + 轮询/长连接 |
| 静态资源、构建产物 | ETag / 版本号 |

React Query 示例：

```tsx
useQuery({
  queryKey: ['orders'],
  queryFn: fetchOrders,
  staleTime: 1000 * 60,
  gcTime: 1000 * 60 * 5,
});

// mutation 成功后失效
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: createOrder,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  },
});
```

**评分维度**：
- 能列举至少 4 种缓存失效策略（40%）
- 能说明不同策略的适用场景（30%）
- 能结合 React Query / SWR 给出配置或代码示例（30%）

**常见错误**：
- 只使用 TTL，忽略事件驱动失效。
- 对强一致性场景使用纯 SWR 策略。
- 失效范围过大，导致无关 queryKey 被清空。

**延伸追问**：
- `staleTime` 和 `gcTime` 有什么区别？
- 如何设计一个既能离线使用又能及时失效的缓存方案？

**相关题目**：
- [FB-29-CO-A-009 SWR 缓存策略](#FB-29-CO-A-009)
- [FB-29-CO-A-011 乐观更新](#FB-29-CO-A-011)

**参考资源**：
- [React Query - Caching](https://tanstack.com/query/latest/docs/framework/react/guides/caching)
- [Patterns.dev - Cache Invalidation](https://www.patterns.dev/posts/cache-invalidation/)

**口头回答版**：
> 前端缓存失效策略主要有这几种：TTL 固定过期时间；SWR 先返回缓存再后台刷新；事件驱动失效，就是 mutation 成功后手动让相关缓存失效；乐观更新，先改 UI 再发请求；还有手动刷新、基于版本号或 ETag 的缓存。选择看业务：展示类数据用 SWR，配置类用 TTL，写操作后用事件驱动失效，支付库存用强制刷新或轮询。

---

### FB-29-CO-A-011：乐观更新是什么？适用场景和风险有哪些？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：29 数据与状态管理
**标签**：乐观更新、乐观 UI、回滚、数据一致性、用户体验
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释乐观更新（Optimistic Update）的概念，说明其适用场景，并分析可能带来的风险与应对方案。

**参考答案**：

乐观更新是一种 UI 更新策略：在用户触发写操作后，**先假设操作会成功**，立即更新界面，同时后台异步发送请求；如果请求失败，再将界面回滚到之前的状态。

典型流程：

```text
用户点击点赞
  │
  ▼
立即更新 UI（点赞数 +1，按钮高亮）
  │
  ▼
后台发送请求
  │
  ├─ 成功 ──▶ 保持 UI
  │
  └─ 失败 ──▶ 回滚 UI，提示用户
```

适用场景：

- 用户期望即时反馈的操作：点赞、收藏、删除、添加待办。
- 网络延迟明显但失败率低的场景。
- 操作结果可预测、回滚成本低。

风险与应对：

1. **请求失败导致状态不一致**：
   - 必须实现回滚机制，保留更新前的快照。
2. **并发冲突**：
   - 多个用户同时修改同一份数据，可能导致覆盖。
   - 应对：版本号、last-write-wins、合并策略。
3. **后续读请求读到旧数据**：
   - 乐观更新本地状态后，服务端缓存或 CDN 仍可能是旧值。
   - 应对：更新后主动失效相关缓存或重新验证。
4. **用户体验问题**：
   - 回滚动画、toast 提示要柔和，避免用户困惑。

React Query 乐观更新示例：

```tsx
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos', newTodo.id] });
    const previousTodo = queryClient.getQueryData(['todos', newTodo.id]);
    queryClient.setQueryData(['todos', newTodo.id], newTodo);
    return { previousTodo };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos', newTodo.id], context.previousTodo);
  },
  onSettled: (newTodo) => {
    queryClient.invalidateQueries({ queryKey: ['todos', newTodo.id] });
  },
});
```

**评分维度**：
- 能解释乐观更新“先更新 UI 再发请求”的核心思想（40%）
- 能说明适用场景（20%）
- 能分析失败回滚、并发冲突等风险并给出应对方案（40%）

**常见错误**：
- 所有写操作都用乐观更新，忽略高失败率场景。
- 没有实现回滚机制，失败后 UI 和服务端数据不一致。
- 乐观更新后忘记失效或重新验证相关缓存。

**延伸追问**：
- 乐观更新和悲观更新各适合什么场景？
- 如果用户在乐观更新后立刻跳转到其他页面，回滚逻辑如何处理？

**相关题目**：
- [FB-29-CO-P-020 乐观更新与悲观更新选择](#FB-29-CO-P-020)
- [FB-29-CO-A-010 缓存失效策略](#FB-29-CO-A-010)

**参考资源**：
- [React Query - Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
- [Patterns.dev - Optimistic UI](https://www.patterns.dev/posts/optimistic-ui/)

**口头回答版**：
> 乐观更新就是用户点了一个操作后，不等服务器返回，先把 UI 改了，假设会成功，后台再去发请求。成功就保持，失败就回滚。适合点赞、收藏、添加待办这种需要即时反馈、失败率低的操作。风险主要是请求失败后 UI 和服务端不一致，所以要做好回滚；还有并发冲突，可能需要版本号或合并策略。React Query 里用 onMutate 改缓存、onError 回滚、onSettled 重新验证。

---

### FB-29-CO-A-012：MobX 和 Redux 的响应式模型有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：29 数据与状态管理
**标签**：MobX、Redux、响应式、不可变、面向对象
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 MobX 和 Redux 在响应式模型、数据修改方式和使用体验上的差异。

**参考答案**：

| 维度 | Redux | MobX |
|------|-------|------|
| 范式 | 函数式，强调不可变数据 | 面向对象/响应式，允许可变数据 |
| 数据流 | 单向：dispatch -> reducer -> new state | 双向追踪：observable -> reaction -> autorun |
| 修改方式 | 必须通过 dispatch action，reducer 返回新 state | 在 action 中直接修改 observable 对象 |
| 订阅粒度 | 通常整个 store 或切片 | 细粒度，自动追踪使用到的属性 |
| 样板代码 | 较多（action/reducer） | 较少 |
| 调试 | Redux DevTools 时间旅行 | MobX DevTools 依赖追踪 |
| 学习曲线 | 较陡 | 较平缓 |

Redux 模型：

```ts
// 纯函数，返回新 state
function reducer(state = 0, action) {
  if (action.type === 'inc') return state + 1;
  return state;
}
store.dispatch({ type: 'inc' });
```

MobX 模型：

```ts
import { makeAutoObservable, autorun } from 'mobx';

class Counter {
  count = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increment() {
    this.count++; // 直接修改
  }
}

const counter = new Counter();
autorun(() => console.log(counter.count));
counter.increment();
```

核心区别：

- Redux 通过不可变更新和纯函数保证可预测性。
- MobX 通过 Proxy/observable 自动追踪依赖，修改更自然，但需要对响应式原理有理解。

选型建议：
- 需要严格数据流、团队协作规范、时间旅行调试：Redux Toolkit。
- 希望代码简洁、类 OOP 风格、自动追踪依赖：MobX。

**评分维度**：
- 能从不可变 vs 可变、函数式 vs 响应式对比（40%）
- 能说明订阅粒度差异（30%）
- 能给出选型建议（30%）

**常见错误**：
- 在 MobX 中手动返回新对象，违背其设计。
- 在 Redux 中直接修改 state。
- 认为 MobX 不适合大型应用（实际有 mobx-state-tree 等方案）。

**延伸追问**：
- MobX 的 `makeAutoObservable` 和 `makeObservable` 有什么区别？
- MobX 如何处理异步 action？

**相关题目**：
- [FB-29-CO-B-003 Redux 核心概念](#FB-29-CO-B-003)
- [FB-29-CO-A-013 Jotai 与 Zustand 设计理念](#FB-29-CO-A-013)

**参考资源**：
- [MobX 官方文档](https://mobx.js.org/README.html)
- [Redux vs MobX](https://redux.js.org/faq/general#when-should-i-use-redux)

**口头回答版**：
> Redux 是函数式的，强调不可变数据，所有修改都要 dispatch action，reducer 返回新 state。MobX 是响应式的，用 observable 自动追踪依赖，可以直接修改数据。Redux 适合需要严格数据流和时间旅行调试的大型项目；MobX 写起来更自然，代码量少，适合喜欢面向对象风格的团队。两者没有谁绝对好，看团队习惯和项目复杂度。

---

### FB-29-CO-A-013：Jotai 和 Zustand 的设计理念有什么不同？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：29 数据与状态管理、15 React
**标签**：Jotai、Zustand、原子化状态、状态管理、React
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Jotai 和 Zustand 的设计理念、API 风格及适用场景。

**参考答案**：

Jotai 和 Zustand 都是轻量级 React 状态管理库，但设计哲学不同：

| 维度 | Zustand | Jotai |
|------|---------|-------|
| 模型 | 单一外部 Store，类似 Redux | 原子化（Atoms），类似 Recoil |
| 状态组织 | 一个 store 内包含多个字段 | 每个 atom 是一个独立状态单元 |
| 派生状态 | 用 selector 或单独 store | 用 atom 组合 / `atom` 计算属性 |
| 订阅粒度 | selector 按需订阅 | 自动按 atom 订阅 |
| API 风格 | 命令式 `set/get` | 声明式 `useAtom` |
| 跨组件共享 | 全局 store | 原子可在模块间导出共享 |
| 适用场景 | 全局/局部状态、简单到中等复杂度 | 需要细粒度、组合式状态，复杂派生 |

Zustand 示例：

```ts
const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));

const count = useStore((s) => s.count);
```

Jotai 示例：

```ts
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const doubleAtom = atom((get) => get(countAtom) * 2);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [double] = useAtom(doubleAtom);
  return <button onClick={() => setCount((c) => c + 1)}>{count} / {double}</button>;
}
```

选型建议：
- 状态结构扁平、以全局 store 为主：Zustand。
- 状态之间存在大量派生关系、希望细粒度订阅：Jotai。
- 两者可以结合使用：Zustand 管全局，Jotai 管组件级原子状态。

**评分维度**：
- 能说明 Zustand 的单一 Store 与 Jotai 的原子化模型差异（40%）
- 能对比订阅粒度和派生状态实现（30%）
- 能给出选型建议（30%）

**常见错误**：
- 认为 Jotai 只能用于局部状态（atom 可全局导出）。
- 在 Zustand 中每次返回新对象导致 selector 失效。
- 把 Recoil、Jotai、Zustand 混为一谈。

**延伸追问**：
- Jotai 的 atom 和 Recoil 的 atom 有什么区别？
- Zustand 的 selector 如何避免不必要的重渲染？

**相关题目**：
- [FB-29-CO-B-005 Zustand 与 Redux 对比](#FB-29-CO-B-005)
- [FB-29-CD-P-022 手写简化状态管理库](#FB-29-CD-P-022)

**参考资源**：
- [Jotai 官方文档](https://jotai.org/)
- [Zustand 官方文档](https://docs.pmnd.rs/zustand/)

**口头回答版**：
> Zustand 是单一 Store 模型，像 Redux 但更简单，用 selector 按需订阅；Jotai 是原子化模型，每个状态是一个 atom，可以互相组合派生，订阅粒度更细。Zustand 适合全局状态或简单场景，Jotai 适合状态之间有很多派生关系、需要细粒度订阅的场景。两者也能一起用。

---

### FB-29-CO-A-014：React Hook Form 和 Formik 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：29 数据与状态管理、15 React
**标签**：React Hook Form、Formik、表单、非受控、性能
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 React Hook Form 和 Formik，说明它们的核心差异和适用场景。

**参考答案**：

| 维度 | Formik | React Hook Form |
|------|--------|-----------------|
| 控制方式 | 受控表单，内部管理 state | 非受控表单，基于 ref 和 DOM |
| 性能 | 字段多时易重渲染 | 字段多也稳定，重渲染少 |
| API 复杂度 | 较复杂，组件较多 | 简洁，基于 hooks |
| 包体积 | 较大 | 较小 |
| 校验 | 支持 Yup / Zod / 自定义 | 原生支持 resolver，可集成 Zod/Yup |
| TypeScript | 支持一般 | 原生优秀 |
| 学习曲线 | 中等 | 低 |
| 适用场景 | 中小型表单、团队熟悉受控 | 大型表单、性能敏感 |

Formik 示例：

```tsx
import { Formik, Form, Field } from 'formik';

<Formik
  initialValues=&#123;&#123; email: '' &#125;&#125;
  onSubmit={(values) => console.log(values)}
>
  <Form>
    <Field name="email" type="email" />
    <button type="submit">Submit</button>
  </Form>
</Formik>
```

React Hook Form 示例：

```tsx
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

选型建议：
- 字段多、性能要求高、希望代码简洁：React Hook Form。
- 团队熟悉受控表单、需要大量内置组件封装：Formik。
- 新项目一般优先 React Hook Form。

**评分维度**：
- 能说出受控 vs 非受控的核心差异（40%）
- 能对比性能、体积、学习曲线（30%）
- 能给出选型建议（30%）

**常见错误**：
- 认为 React Hook Form 不能做受控组件（实际支持 Controller）。
- 在 React Hook Form 中仍然为每个字段写 useState。
- 忽略校验库的集成方式差异。

**延伸追问**：
- React Hook Form 的 `register` 和 `Controller` 有什么区别？
- 如何处理表单字段之间的联动？

**相关题目**：
- [FB-29-CO-B-008 表单状态管理](#FB-29-CO-B-008)
- [FB-29-CO-P-019 状态机与 XState](#FB-29-CO-P-019)

**参考资源**：
- [React Hook Form 文档](https://react-hook-form.com/)
- [Formik 文档](https://formik.org/)

**口头回答版**：
> Formik 是受控表单，内部自己管 state，API 相对复杂，字段多了容易渲染多；React Hook Form 是非受控的，基于 ref 和 DOM，性能更好，包也更小，API 简洁。新项目或大型表单一般优先 React Hook Form。两者都能集成 Yup、Zod 做校验。

---

### FB-29-CO-A-015：数据一致性在前端有哪些常见问题？如何处理？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：29 数据与状态管理
**标签**：数据一致性、缓存一致性、并发、乐观更新、版本号
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请分析前端数据一致性的常见问题，并给出对应的处理策略。

**参考答案**：

前端数据一致性问题主要来源于缓存、并发和异步更新：

1. **缓存与源数据不一致**：
   - 原因：前端缓存了旧数据，服务端数据已变化。
   - 处理：SWR 重新验证、事件驱动失效、TTL 过期、主动刷新。

2. **多个组件持有同一数据的不同副本**：
   - 原因：同一 API 数据被多处存储在各自的 state 或 store。
   - 处理：使用单一数据源（Single Source of Truth），如 React Query 的共享缓存。

3. **乐观更新失败导致 UI 与服务端不一致**：
   - 原因：先更新 UI 但请求失败未回滚。
   - 处理：保存快照、实现回滚机制、失败提示。

4. **并发写冲突**：
   - 原因：多个用户或同一用户多个 tab 同时修改同一份数据。
   - 处理：版本号 / ETag、last-write-wins、 operational transformation / CRDT（协作场景）。

5. **mutation 与 query 的顺序问题**：
   - 原因：写操作后读到的仍是缓存旧值。
   - 处理：mutation 成功后 invalidate 相关 query，或 optimistic update 后立即 revalidate。

6. **离线后恢复导致冲突**：
   - 原因：离线期间本地修改与服务端最新数据冲突。
   - 处理：本地队列、冲突检测、合并策略、用户确认。

处理策略总结：

| 问题 | 策略 |
|------|------|
| 缓存旧数据 | SWR、失效、TTL、主动刷新 |
| 多处副本 | 单一数据源、服务端状态库 |
| 乐观更新失败 | 快照回滚 |
| 并发冲突 | 版本号、ETag、CRDT |
| 读写顺序 | invalidateQueries、refetch |
| 离线冲突 | 本地队列 + 冲突解决 |

**评分维度**：
- 能列举至少 4 种一致性常见问题（40%）
- 能针对每种问题给出处理策略（40%）
- 能说明单一数据源、版本号等核心思想（20%）

**常见错误**：
- 只关注写操作，忽略读缓存的一致性。
- 对所有场景都使用乐观更新。
- 没有版本号机制就处理并发写。

**延伸追问**：
- 如果两个 tab 同时修改同一个购物车，如何保证一致性？
- 在设计 API 时，哪些字段有助于前端保持一致性？

**相关题目**：
- [FB-29-CO-A-011 乐观更新](#FB-29-CO-A-011)
- [FB-29-CO-P-021 离线同步与冲突解决](#FB-29-CO-P-021)

**参考资源**：
- [Martin Fowler - CQRS](https://martinfowler.com/bliki/CQRS.html)
- [React Query - Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)

**口头回答版**：
> 前端数据一致性问题主要有几种：缓存里的旧数据和服务端不一致；多个组件各自保存同一份数据；乐观更新失败后没回滚；并发写冲突；mutation 后读到旧缓存；离线后恢复冲突。处理方式包括：用 SWR 或主动失效让缓存刷新；用单一数据源避免多处副本；乐观更新保存快照好回滚；并发写用版本号或 ETag；离线用本地队列加冲突解决。

---

### FB-29-CO-A-016：状态提升（Lifting State Up）和状态下沉（State Colocation）各有什么适用场景？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：29 数据与状态管理
**标签**：状态提升、状态下沉、状态作用域、组件通信
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释状态提升和状态下沉的概念，并说明各自的适用场景和优缺点。

**参考答案**：

- **状态提升（Lifting State Up）**：把多个子组件共享的状态放到它们最近的公共父组件中管理，通过 props 向下传递。
- **状态下沉（State Colocation）**：把状态尽量放在离使用它最近的组件，减少不必要的数据传递和影响范围。

适用场景：

| 场景 | 推荐方式 |
|------|---------|
| 两个 sibling 组件需要同步同一数据 | 状态提升 |
| 状态只在一个组件及其子树中使用 | 状态下沉 |
| 父组件过度渲染 | 状态下沉 |
| 需要跨多层级共享 | Context / 全局 Store |

示例（状态提升）：

```tsx
function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  );
}
```

示例（状态下沉）：

```tsx
function Parent() {
  return <Form />; // Form 内部自己管理自己的 state
}

function Form() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

优缺点：

- 状态提升：
  - 优点：共享数据一致，便于同步。
  - 缺点：父组件可能变得臃肿，props drilling。
- 状态下沉：
  - 优点：组件独立、可复用、渲染范围小。
  - 缺点：需要共享时又得提升。

最佳实践：
- 先用状态下沉，需要共享时再提升。
- 提升后若 props drilling 严重，考虑 Context 或状态管理库。

**评分维度**：
- 能解释状态提升和状态下沉的含义（40%）
- 能给出不同场景下的选择依据（30%）
- 能分析两者的优缺点（30%）

**常见错误**：
- 一开始就过度提升，导致父组件复杂。
- 该提升时不提升，导致兄弟组件数据不同步。
- 用全局 Store 解决本可以用状态提升解决的问题。

**延伸追问**：
- 状态提升和 Context 是什么关系？
- 如何判断一个状态应该放在局部还是全局？

**相关题目**：
- [FB-29-CO-B-002 全局状态与局部状态](#FB-29-CO-B-002)
- [FB-29-SD-R-026 大型 SPA 状态管理架构](#FB-29-SD-R-026)

**参考资源**：
- [React - Lifting State Up](https://react.dev/learn/sharing-state-between-components)
- [Kent C. Dodds - State Colocation](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)

**口头回答版**：
> 状态提升是把共享状态放到最近的公共父组件，让兄弟组件都能拿到；状态下沉是把状态放到离使用最近的组件，减少影响范围。一般先用下沉，需要共享再提升。提升太多会让父组件臃肿、props 一层层传，这时候可以考虑 Context 或状态管理库。

---

## 深入题（8 道）{#proficient}

### FB-29-FS-P-017：Redux 中间件原理是什么？请手写一个 logger 中间件

**题型**：框架原理题 / 手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：29 数据与状态管理、15 React
**标签**：Redux、中间件、logger、函数式编程、compose
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请解释 Redux 中间件的工作原理，并手写一个 `logger` 中间件，要求能打印 action 和 state 变化前后的值。

**参考答案**：

Redux 中间件是一个柯里化函数，形式为：

```ts
const middleware = (store) => (next) => (action) => {
  // 在 dispatch 前执行
  const result = next(action);
  // 在 dispatch 后执行
  return result;
};
```

中间件原理：

1. Redux 的 `applyMiddleware` 会改造 `store.dispatch`。
2. 每个中间件拿到 `store` 的引用和 `next`（下一个中间件或原始 dispatch）。
3. 中间件可以在 action 到达 reducer 前后执行副作用，如日志、异步请求、崩溃上报等。
4. 多个中间件通过 `compose` 组合成洋葱模型。

手写 logger 中间件：

```ts
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('prev state', store.getState());
  console.log('action', action);

  const result = next(action);

  console.log('next state', store.getState());
  console.groupEnd();

  return result;
};
```

完整使用示例：

```ts
import { createStore, applyMiddleware } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

const store = createStore(counterReducer, applyMiddleware(loggerMiddleware));

store.dispatch({ type: 'INCREMENT' });
```

执行顺序：

```text
dispatch(action)
  │
  ▼
logger 前：打印 prev state / action
  │
  ▼
next(action) -> 下一个中间件或 reducer
  │
  ▼
logger 后：打印 next state
```

如果中间件需要处理异步，常见形式如 redux-thunk：

```ts
const thunkMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};
```

**评分维度**：
- 能准确解释中间件柯里化形式和洋葱模型（40%）
- 能正确手写 logger 中间件（40%）
- 能说明中间件在 dispatch 前后的执行时机（20%）

**常见错误**：
- 忘记调用 `next(action)`，导致 action 无法到达 reducer。
- 在 logger 中直接修改 action 或 state。
- 混淆中间件和 reducer 的职责。

**延伸追问**：
- redux-thunk 和 redux-saga 各有什么优缺点？
- Redux Toolkit 的 `createAsyncThunk` 如何简化异步流程？

**相关题目**：
- [FB-29-CO-B-003 Redux 核心概念](#FB-29-CO-B-003)
- [FB-29-CO-A-012 MobX 与 Redux 对比](#FB-29-CO-A-012)

**参考资源**：
- [Redux 中间件文档](https://redux.js.org/understanding/history-and-design/middleware)
- [Redux Toolkit 文档](https://redux-toolkit.js.org/)

**口头回答版**：
> Redux 中间件是一个三层柯里化函数：`store => next => action => {}`。它可以在 action 到达 reducer 前后做事情。`applyMiddleware` 会把多个中间件串起来，每个中间件调用 next(action) 把动作传给下一个。logger 中间件就是在 next 之前打印 prev state 和 action，next 之后打印 next state。一定要记得调用 next，否则 action 到不了 reducer。

---

### FB-29-FS-P-018：React Query 的缓存和失效机制底层是怎么工作的？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：29 数据与状态管理、15 React
**标签**：React Query、TanStack Query、缓存、queryKey、失效、垃圾回收
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入说明 React Query 的缓存结构、queryKey 作用、失效触发条件和垃圾回收机制。

**参考答案**：

React Query 内部维护一个 **QueryCache**，每个查询对应一个 **Query** 实例，由 `queryKey` 唯一标识。

核心机制：

1. **queryKey 作为缓存键**：
   - `queryKey` 经过序列化后作为 Query 的唯一 ID。
   - 相同 `queryKey` 的组件共享同一个 Query 实例和结果。
   - `queryKey` 通常包含资源类型和 ID，如 `['user', userId]`。

2. **Query 状态生命周期**：
   - `fresh`：数据在 `staleTime` 内，认为是最新的，不会重新请求。
   - `stale`：数据超过 `staleTime`，但仍在 `gcTime` 内，可以被立即返回并后台重新验证。
   - `inactive`：没有任何组件订阅该 Query。
   - 超过 `gcTime` 后，Query 被垃圾回收。

3. **失效触发条件**：
   - `staleTime` 过期。
   - 窗口重新聚焦（默认 `refetchOnWindowFocus: true`）。
   - 网络恢复（默认 `refetchOnReconnect: true`）。
   - 手动调用 `queryClient.invalidateQueries({ queryKey: [...] })`。
   - 新订阅者挂载且数据是 stale 的。

4. **Mutation 与缓存失效**：
   - mutation 成功后，通过 `invalidateQueries` 使相关 Query 标记为 stale，触发重新获取。
   - 也可以通过 `setQueryData` 直接更新缓存，实现乐观更新或即时同步。

5. **垃圾回收（gcTime）**：
   - 默认 5 分钟。
   - 当 Query 没有任何 observer 且超过 `gcTime` 后，从 QueryCache 中移除。

代码示例：

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 分钟内 fresh
      gcTime: 1000 * 60 * 5, // 5 分钟后回收
      refetchOnWindowFocus: true,
    },
  },
});

// 失效订单列表
queryClient.invalidateQueries({ queryKey: ['orders'] });
```

**评分维度**：
- 能说明 queryKey 作为缓存键的原理（30%）
- 能解释 fresh/stale/inactive/gc 生命周期（30%）
- 能列举失效触发条件和 mutation 失效机制（25%）
- 能说明 gcTime 垃圾回收机制（15%）

**常见错误**：
- 认为 `staleTime` 是缓存过期时间（实际是“新鲜”时间）。
- 混淆 `staleTime` 和 `gcTime`。
- `queryKey` 设计不稳定，导致缓存命中率低。

**延伸追问**：
- 如果两个组件的 queryKey 完全一样但 queryFn 不同，会发生什么？
- 如何设计 queryKey 才能兼顾缓存命中和失效精度？

**相关题目**：
- [FB-29-CO-B-006 React Query 主要解决什么问题](#FB-29-CO-B-006)
- [FB-29-CO-A-010 缓存失效策略](#FB-29-CO-A-010)

**参考资源**：
- [TanStack Query - How Queries Work](https://tanstack.com/query/latest/docs/framework/react/guides/how-query-works)
- [TanStack Query - Caching](https://tanstack.com/query/latest/docs/framework/react/guides/caching)

**口头回答版**：
> React Query 内部有一个 QueryCache，每个 queryKey 对应一个 Query 实例，相同 queryKey 的组件共享结果。Query 有生命周期：fresh 是还在 staleTime 内，不会重新请求；stale 是过了 staleTime，可以返回缓存同时后台刷新；inactive 是没人订阅；超过 gcTime 就被回收。失效可以由 staleTime 过期、窗口聚焦、网络恢复、手动 invalidateQueries 触发。mutation 成功后一般用 invalidateQueries 让相关缓存失效，或用 setQueryData 直接更新。

---

### FB-29-CO-P-019：状态机在前端状态管理中的应用是什么？XState 的核心概念有哪些？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：29 数据与状态管理
**标签**：状态机、XState、Finite State Machine、状态转换、副作用
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明有限状态机（FSM）在前端状态管理中的价值，并介绍 XState 的核心概念。

**参考答案**：

有限状态机（FSM）是一种数学模型，包含有限个状态、状态之间通过事件触发转换。在前端状态管理中，FSM 的价值在于：

1. **消除非法状态**：通过显式定义状态和转换，避免“不可能状态”组合，如 `isLoading && isError`。
2. **可视化状态流转**：状态图清晰表达业务逻辑，便于沟通和维护。
3. **集中管理副作用**：进入某个状态时自动执行 action、invoke 服务等。
4. **可预测**：给定状态和事件，下一个状态是确定的。

XState 核心概念：

- **Machine**：状态机定义，包含 states、events、transitions。
- **State**：当前状态节点，包括 value 和 context（扩展状态）。
- **Event**：触发状态转换的信号。
- **Transition**：状态之间的转换规则，`on: { EVENT: 'targetState' }`。
- **Context**：存储额外数据，可变但非状态本身。
- **Action**：进入/离开状态时执行的副作用，如发送日志、调用函数。
- **Service**：运行状态机的实例，可以发送事件、读取当前状态。

示例：

```ts
import { createMachine, interpret } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } },
  },
});

const service = interpret(toggleMachine).start();
service.send('TOGGLE');
```

适用场景：
- 复杂表单流程、订单状态流转、支付流程、权限审批、多人协作状态。

**评分维度**：
- 能说明 FSM 消除非法状态、可视化流转的价值（40%）
- 能说出 XState 的 Machine、State、Event、Context、Action（40%）
- 能给出适用场景（20%）

**常见错误**：
- 把所有状态都用 FSM 管理，导致过度设计。
- 把业务数据放在 state value 中而非 context。
- 忽略 XState 的学习和迁移成本。

**延伸追问**：
- XState 如何处理嵌套状态和并行状态？
- 状态机和 Redux  reducer 有什么联系？

**相关题目**：
- [FB-29-CO-P-023 Event Sourcing 与 CQRS 在前端应用](#FB-29-CO-P-023)
- [FB-29-SD-R-025 设计前端数据层抽象](#FB-29-SD-R-025)

**参考资源**：
- [XState 官方文档](https://stately.ai/docs/xstate)
- [Patterns.dev - State Machine](https://www.patterns.dev/posts/state-machine/)

**口头回答版**：
> 状态机能让我们显式定义所有状态和转换，避免出现不可能的状态组合，比如同时 loading 和 error。XState 是前端常用的状态机库，核心概念有 Machine、State、Event、Transition、Context、Action。Machine 是定义，State 是当前状态，Event 触发转换，Context 存额外数据，Action 做副作用。适合复杂流程，比如订单状态、支付流程、表单审批。

---

### FB-29-CO-P-020：乐观更新和悲观更新如何选择？如何处理失败回滚？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：29 数据与状态管理
**标签**：乐观更新、悲观更新、回滚、数据一致性、错误处理
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比乐观更新和悲观更新，说明选择策略，并详细说明失败回滚的实现方式。

**参考答案**：

| 维度 | 悲观更新（Pessimistic） | 乐观更新（Optimistic） |
|------|------------------------|------------------------|
| 更新时机 | 请求成功后更新 UI | 请求前更新 UI |
| 用户体验 | 有等待感，可能需要 loading | 即时反馈 |
| 一致性风险 | 低 | 高，需回滚机制 |
| 实现复杂度 | 低 | 高 |
| 适用场景 | 支付、删除、强一致性要求 | 点赞、收藏、待办、评论 |

选择策略：

- **用乐观更新**：操作结果可预测、失败率低、回滚成本低、用户期望即时反馈。
- **用悲观更新**：失败率高、后果严重、需要服务端确认、强一致性要求。
- **混合使用**：关键字段悲观，非关键字段乐观。

失败回滚实现方式：

1. **快照回滚**：
   - 更新前保存旧状态快照。
   - 请求失败后将状态恢复为快照。

2. **React Query 回滚**：
   - `onMutate` 中保存 `previousData`。
   - `onError` 中用 `setQueryData` 恢复。

3. **状态机回滚**：
   - 设计 `submitting -> success / error` 状态，error 时回退到编辑态。

4. **用户确认回滚**：
   - 冲突严重时提示用户选择保留本地还是服务端版本。

示例（React Query 回滚）：

```tsx
const mutation = useMutation({
  mutationFn: likePost,
  onMutate: async (postId) => {
    await queryClient.cancelQueries({ queryKey: ['post', postId] });
    const previousPost = queryClient.getQueryData(['post', postId]);
    queryClient.setQueryData(['post', postId], (old) => ({ ...old, liked: true }));
    return { previousPost };
  },
  onError: (err, postId, context) => {
    queryClient.setQueryData(['post', postId], context.previousPost);
  },
  onSettled: (postId) => {
    queryClient.invalidateQueries({ queryKey: ['post', postId] });
  },
});
```

**评分维度**：
- 能清晰对比乐观更新和悲观更新（40%）
- 能给出选择策略和典型场景（30%）
- 能详细说明快照回滚、React Query 回滚等实现（30%）

**常见错误**：
- 对高风险操作使用乐观更新。
- 只更新 UI 不保存快照，失败后无法恢复。
- 回滚时不提示用户，导致用户困惑。

**延伸追问**：
- 如果乐观更新后用户立即离开页面，回滚怎么办？
- 如何设计一个既能乐观更新又能保证最终一致性的系统？

**相关题目**：
- [FB-29-CO-A-011 乐观更新概念](#FB-29-CO-A-011)
- [FB-29-CO-A-015 数据一致性](#FB-29-CO-A-015)

**参考资源**：
- [React Query - Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
- [Patterns.dev - Optimistic UI](https://www.patterns.dev/posts/optimistic-ui/)

**口头回答版**：
> 悲观更新是等服务器返回成功后再改 UI，安全但慢；乐观更新是先改 UI 再发请求，快但需要回滚。点赞、收藏、待办适合乐观；支付、删除、库存扣减适合悲观。回滚的关键是更新前保存旧状态快照，失败时恢复。React Query 里用 onMutate 保存 previousData，onError 时 setQueryData 恢复，onSettled 再重新验证。

---

### FB-29-CO-P-021：离线同步和数据冲突解决有哪些策略？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：29 数据与状态管理
**标签**：离线同步、数据冲突、本地队列、CRDT、最终一致性
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端离线同步的常见方案，以及当本地数据和服务端数据冲突时有哪些解决策略。

**参考答案**：

离线同步常见方案：

1. **本地缓存 + 联网刷新**：
   - 离线时展示缓存数据，联网后重新请求最新数据。
   - 适合只读或低频写场景。

2. **本地队列（Operation Queue）**：
   - 离线期间的操作按顺序存入本地队列（如 IndexedDB）。
   - 联网后按 FIFO 或自定义顺序依次同步到服务端。

3. **乐观本地更新 + 冲突检测**：
   - 本地立即生效，联网后和服务端版本对比。
   - 若冲突，按策略合并或提示用户。

4. **CRDT（Conflict-free Replicated Data Types）**：
   - 数学上保证合并结果一致，无需中心协调。
   - 适合协作文档、多人编辑等场景，如 Yjs、Automerge。

5. **Operational Transformation（OT）**：
   - 将操作转换后再应用，保证多方操作顺序一致。
   - 传统在线文档协作方案，如 Google Docs。

冲突解决策略：

| 策略 | 说明 | 适用场景 |
|------|------|---------|
| Last-Write-Wins（LWW） | 以最后修改时间为准 | 简单计数、配置 |
| 版本号 / ETag | 服务端比较版本，冲突时拒绝 | 单字段更新 |
| 合并（Merge） | 自动合并非冲突字段 | 对象级更新 |
| 用户确认 | 冲突时弹窗让用户选择 | 重要内容编辑 |
| CRDT / OT | 自动保持最终一致 | 协作文档 |

注意事项：
- 明确最终一致性还是强一致性。
- 离线队列要有重试、去重、失败处理。
- 冲突解决策略要在产品层明确，避免技术黑盒。

**评分维度**：
- 能列举至少 3 种离线同步方案（40%）
- 能说明至少 3 种冲突解决策略（40%）
- 能指出重试、去重、一致性等注意事项（20%）

**常见错误**：
- 离线写操作直接丢弃，不保存队列。
- 所有冲突都用 Last-Write-Wins，忽略业务语义。
- 不考虑离线队列的幂等性。

**延伸追问**：
- 如何保证离线队列的幂等性？
- 设计一个离线购物车，如何处理多端同步？

**相关题目**：
- [FB-29-CO-A-015 数据一致性](#FB-29-CO-A-015)
- [FB-29-SD-R-030 离线优先协作编辑系统](#FB-29-SD-R-030)

**参考资源**：
- [CRDT.tech](https://crdt.tech/)
- [Yjs 文档](https://docs.yjs.dev/)
- [Automerge 文档](https://automerge.org/)

**口头回答版**：
> 离线同步常见有几种：只读场景用本地缓存加联网刷新；写操作多就用本地队列，联网后按顺序同步；复杂协作用 CRDT 或 OT。冲突解决策略包括：最后写入为准、版本号拒绝冲突、自动合并、用户确认。离线队列要注意重试、去重和幂等性，不能简单丢弃，也不能所有冲突都自动覆盖。

---

### FB-29-CD-P-022：如何手写一个简化的状态管理库（类似 Zustand）？

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：29 数据与状态管理、15 React
**标签**：手写代码、状态管理、Zustand、发布订阅、React Hook
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请手写一个简化的全局状态管理库，要求支持：创建 store、读取/更新状态、订阅变化、在 React 组件中通过 Hook 使用。

**参考答案**：

核心思路：

1. 用一个对象保存全局 state。
2. 提供 `set` 方法更新 state。
3. 维护订阅者列表，state 变化时通知所有订阅者。
4. 提供 React Hook，订阅 state 变化并按需重渲染。

实现：

```ts
// store.ts
export const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (partial) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener(state));
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
};
```

React Hook：

```tsx
// useStore.ts
import { useEffect, useState, useSyncExternalStore } from 'react';

export const createUseStore = (store) => (selector = (state) => state) => {
  // React 18 推荐方式
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );

  // 兼容 React 17 的方式
  // const [state, setState] = useState(() => selector(store.getState()));
  // useEffect(() => store.subscribe((newState) => setState(selector(newState))), []);
  // return state;
};
```

使用：

```tsx
const store = createStore({ count: 0, name: 'Tom' });
const useStore = createUseStore(store);

function Counter() {
  const count = useStore((state) => state.count);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => store.setState((s) => ({ count: s.count + 1 }))}>
        +
      </button>
    </div>
  );
}
```

关键点：

- 使用 `useSyncExternalStore` 保证并发安全（React 18）。
- selector 可以让组件只订阅需要的字段，减少重渲染。
- `setState` 支持函数式更新，避免闭包问题。

**评分维度**：
- 能实现 createStore 的 getState / setState / subscribe（40%）
- 能实现 React Hook 订阅和 selector（30%）
- 能提到 useSyncExternalStore 和并发安全（20%）
- 能说明 selector 减少重渲染的作用（10%）

**常见错误**：
- 订阅时每次更新都触发所有组件重渲染，不做 selector。
- 在 useEffect 中订阅但没有正确清理。
- `setState` 直接修改原 state，不使用不可变更新。

**延伸追问**：
- 如何在这个基础上实现中间件？
- 如何让 store 支持异步 action？

**相关题目**：
- [FB-29-CO-B-005 Zustand 与 Redux 对比](#FB-29-CO-B-005)
- [FB-29-CO-A-013 Jotai 与 Zustand 设计理念](#FB-29-CO-A-013)

**参考资源**：
- [React useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
- [Zustand 源码](https://github.com/pmndrs/zustand)

**口头回答版**：
> 手写一个类似 Zustand 的状态库，核心是三个方法：getState 读状态，setState 更新并通知订阅者，subscribe 注册监听。state 变化时遍历 listeners 调用。React Hook 里用 useSyncExternalStore 订阅 store，再传入 selector 让组件只监听需要的字段。setState 要支持函数式更新，避免闭包问题。

---

### FB-29-CO-P-023：Event Sourcing 和 CQRS 在前端如何应用？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：29 数据与状态管理
**标签**：Event Sourcing、CQRS、事件溯源、命令查询分离、前端架构
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请解释 Event Sourcing 和 CQRS 的概念，并说明它们在前端状态管理中的应用场景和实现思路。

**参考答案**：

**CQRS（Command Query Responsibility Segregation）**：

将“写操作”（Command）和“读操作”（Query）分离，使用不同的模型处理。前端常见体现：

- **读**：使用 React Query / SWR 从服务端读取数据，本地只做展示。
- **写**：通过 mutation / action 发送命令到服务端，成功后失效读缓存。

前端 CQRS 示例：

```tsx
// Query：读取订单列表
const { data: orders } = useQuery({ queryKey: ['orders'], queryFn: fetchOrders });

// Command：创建订单
const mutation = useMutation({
  mutationFn: createOrder,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
});
```

**Event Sourcing（事件溯源）**：

不保存最终状态，而是保存所有改变状态的事件序列。通过重放事件得到任意时刻的状态。

前端应用场景：

1. **Undo/Redo**：保存用户操作事件，支持撤销重做。
2. **审计日志**：记录用户每一步操作。
3. **协作编辑**：操作序列化后同步给其他客户端。
4. **时间旅行调试**：Redux DevTools 就是事件溯源思想的体现。

前端实现思路：

```ts
type Event =
  | { type: 'ADD_TODO'; payload: { id: string; text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } };

const events: Event[] = [];

const applyEvent = (state, event) => {
  switch (event.type) {
    case 'ADD_TODO':
      return [...state, event.payload];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === event.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

// 重放得到当前状态
const currentState = events.reduce(applyEvent, []);
```

注意事项：

- Event Sourcing 会增加存储和复杂度，不是所有应用都需要。
- CQRS 读模型和写模型不一致时，要处理最终一致性。
- 前端通常只做轻量级事件溯源，核心事件存储在服务端。

**评分维度**：
- 能解释 CQRS 的读写分离思想（30%）
- 能解释 Event Sourcing 的事件重放思想（30%）
- 能给出前端应用场景和实现思路（30%）
- 能说明复杂度和注意事项（10%）

**常见错误**：
- 把 CQRS 和 Event Sourcing 混为一谈（两者可以独立使用）。
- 在前端对所有状态都使用事件溯源，导致过度设计。
- 忽略读模型和写模型的延迟一致性。

**延伸追问**：
- Redux 的 action log 和 Event Sourcing 有什么关系？
- 如何在事件溯源中处理事件版本升级？

**相关题目**：
- [FB-29-CO-P-019 状态机与 XState](#FB-29-CO-P-019)
- [FB-29-SD-R-026 大型 SPA 状态管理架构](#FB-29-SD-R-026)

**参考资源**：
- [Martin Fowler - CQRS](https://martinfowler.com/bliki/CQRS.html)
- [Martin Fowler - Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)

**口头回答版**：
> CQRS 是把读和写分开。前端常见做法是读用 React Query 拉数据，写用 mutation 发命令，成功后让读缓存失效。Event Sourcing 是不保存最终状态，而是保存所有事件，通过重放事件得到状态。前端适合做撤销重做、审计日志、协作编辑。Redux DevTools 的时间旅行也是这个思想。但不要在所有地方都用事件溯源，复杂度会很高。

---

### FB-29-CO-P-024：Repository 模式和 Data Mapper 模式在前端数据层有什么区别？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：29 数据与状态管理
**标签**：Repository、Data Mapper、数据层、抽象、Clean Architecture
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Repository 模式和 Data Mapper 模式在前端数据层抽象中的应用，并说明各自的优缺点。

**参考答案**：

**Repository 模式**：

将数据访问逻辑封装到 Repository 对象中，组件/业务层不直接调用 API，而是通过 Repository 接口获取数据。

特点：

- 隐藏数据源细节（REST、GraphQL、IndexedDB、Mock）。
- 返回领域模型或 DTO。
- 便于切换数据源和单元测试。

示例：

```ts
class UserRepository {
  async getById(id: string): Promise<User> {
    const dto = await api.get(`/users/${id}`);
    return User.fromDTO(dto);
  }

  async update(user: User): Promise<void> {
    await api.put(`/users/${user.id}`, user.toDTO());
  }
}
```

**Data Mapper 模式**：

在 Repository 基础上增加一层 Mapper，专门负责原始数据（DTO）和领域模型之间的转换。

特点：

- Repository 只负责数据获取和持久化。
- Mapper 负责 DTO <-> Entity 转换。
- 转换逻辑集中，便于维护和复用。

示例：

```ts
class UserMapper {
  toDomain(dto: UserDTO): User {
    return new User(dto.id, dto.full_name);
  }

  toDTO(user: User): UserDTO {
    return { id: user.id, full_name: user.name };
  }
}

class UserRepository {
  private mapper = new UserMapper();

  async getById(id: string): Promise<User> {
    const dto = await api.get(`/users/${id}`);
    return this.mapper.toDomain(dto);
  }
}
```

对比：

| 维度 | Repository | Data Mapper |
|------|-----------|-------------|
| 抽象层次 | 封装数据访问 | 额外封装数据转换 |
| 复杂度 | 较低 | 较高 |
| 适用场景 | 中小型项目、转换简单 | 大型项目、DTO 和领域模型差异大 |
| 测试性 | 好 | 更好 |
| 与 Clean Architecture 关系 | 位于数据层 | Repository + Mapper 位于数据层 |

前端应用建议：

- 中小型项目：使用 Repository 模式即可。
- 大型项目、字段映射复杂、多端数据格式不同：使用 Data Mapper。
- 配合状态管理库时，Repository 可作为 action/mutation 的调用层。

**评分维度**：
- 能说明 Repository 封装数据访问的作用（30%）
- 能说明 Data Mapper 负责 DTO 与领域模型转换（30%）
- 能对比两者复杂度和适用场景（25%）
- 能给出前端应用建议（15%）

**常见错误**：
- 在组件里直接调用 fetch/axios，没有数据层抽象。
- 把转换逻辑分散在各个组件中。
- 为了用模式而用模式，增加不必要的抽象。

**延伸追问**：
- 如果后端接口返回的字段命名和前端不一致，怎么处理？
- Repository 模式和 React Query 的 queryFn 是什么关系？

**相关题目**：
- [FB-29-SD-R-025 设计前端数据层抽象](#FB-29-SD-R-025)
- [FB-29-CP-R-029 状态管理库选型决策矩阵](#FB-29-CP-R-029)

**参考资源**：
- [Repository Pattern - Microsoft](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)
- [Data Mapper Pattern - Martin Fowler](https://martinfowler.com/eaaCatalog/dataMapper.html)

**口头回答版**：
> Repository 模式是把数据访问封装起来，组件不直接调 API，而是通过 Repository。Data Mapper 是在 Repository 基础上再抽一层 Mapper，专门做 DTO 和领域模型之间的转换。Repository 适合中小项目；Data Mapper 适合大型项目或前后端字段差异大的场景。好处是数据源变了、字段映射变了，都只改一层，业务代码不动。

---

## 架构题（20 道）{#architect}

### FB-29-SD-R-025：如何设计一个前端数据层抽象层，支持多数据源切换和缓存？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：29 数据与状态管理
**标签**：数据层抽象、Repository、多数据源、缓存、Clean Architecture
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个前端数据层抽象层，要求支持 REST、GraphQL、本地 IndexedDB 等多种数据源切换，并内置统一的缓存和失效策略。

**参考答案**：

设计目标：

1. 业务层不感知底层数据源（REST/GraphQL/IndexedDB/Mock）。
2. 统一缓存策略，支持内存缓存和持久化缓存。
3. 统一的查询和写入语义。
4. 便于单元测试和后续扩展。

分层架构：

```text
UI / Components
    │
    ▼
Hooks / View Models  (useUser, useOrders)
    │
    ▼
Services / Use Cases (业务编排)
    │
    ▼
Repository Layer     (UserRepository, OrderRepository)
    │
    ▼
Data Sources         (RestDataSource, GraphQLDataSource, IndexedDBDataSource)
    │
    ▼
Cache Layer          (MemoryCache, IndexedDBCache)
    │
    ▼
Network / Storage    (fetch / GraphQL client / IndexedDB)
```

核心接口设计：

```ts
interface DataSource<T> {
  query(key: QueryKey, options?: QueryOptions): Promise<T>;
  mutate(key: QueryKey, payload: unknown, options?: MutateOptions): Promise<T>;
}

interface Repository<T> {
  getById(id: string): Promise<T>;
  list(params?: Record<string, unknown>): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

interface Cache {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  invalidate(key: string): Promise<void>;
}
```

Repository 实现：

```ts
class UserRepository implements Repository<User> {
  constructor(
    private dataSource: DataSource<User>,
    private cache: Cache,
    private mapper: UserMapper
  ) {}

  async getById(id: string): Promise<User> {
    const cacheKey = `user:${id}`;
    const cached = await this.cache.get<User>(cacheKey);
    if (cached) return cached;

    const dto = await this.dataSource.query(['user', id]);
    const user = this.mapper.toDomain(dto);
    await this.cache.set(cacheKey, user, 60_000);
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const dto = await this.dataSource.mutate(['user', id], this.mapper.toDTO(data));
    const user = this.mapper.toDomain(dto);
    await this.cache.set(`user:${id}`, user);
    return user;
  }
}
```

数据源切换：

```ts
const restSource = new RestDataSource({ baseURL: '/api' });
const graphQLSource = new GraphQLDataSource({ client });
const localSource = new IndexedDBDataSource({ db });

// 按环境或功能切换
const userRepo = new UserRepository(
  import.meta.env.VITE_OFFLINE_MODE ? localSource : restSource,
  new HybridCache(),
  new UserMapper()
);
```

缓存策略：

- 内存缓存：LRU，短期高频数据。
- 持久化缓存：IndexedDB，离线使用。
- 失效：TTL、事件驱动、手动 invalidate。

**评分维度**：
- 能画出清晰的分层架构（30%）
- 能设计出 Repository / DataSource / Cache 等核心接口（30%）
- 能说明多数据源切换机制（20%）
- 能说明缓存和失效策略（20%）

**常见错误**：
- 数据层和业务层耦合，组件直接调 API。
- 缓存层和数据源层没有明确边界。
- 忽略离线场景和缓存一致性。

**延伸追问**：
- 如何处理不同数据源的返回格式差异？
- 如果某个数据源挂掉，如何优雅降级？

**相关题目**：
- [FB-29-CO-P-024 Repository 与 Data Mapper](#FB-29-CO-P-024)
- [FB-29-SD-R-026 大型 SPA 状态管理架构](#FB-29-SD-R-026)

**参考资源**：
- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Repository Pattern - Microsoft](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)

**口头回答版**：
> 设计前端数据层抽象，我会分几层：最上面是 UI 和 Hooks，下面是业务 Service，再下面是 Repository，Repository 不直接调网络，而是依赖 DataSource 接口。DataSource 可以有 REST、GraphQL、IndexedDB 多种实现。再下面加 Cache 层，支持内存和持久化缓存。这样数据源切换只改配置，业务代码不动。缓存策略用 TTL、事件驱动失效和手动 invalidate 结合。

---

### FB-29-SD-R-026：如何为大型 SPA 设计状态管理架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：29 数据与状态管理
**标签**：大型 SPA、状态管理、架构设计、微前端、模块拆分
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请为大型单页应用设计一套状态管理架构，要求考虑状态分层、模块拆分、服务端状态、跨模块通信、微前端等场景。

**参考答案**：

设计原则：

1. **状态分层**：
   - UI 状态（局部）：组件自己管理。
   - 全局客户端状态：主题、用户、权限、设置。
   - 服务端状态：API 数据，用 React Query / SWR 管理。
   - URL 状态：路由、筛选、分页。

2. **模块拆分**：
   - 按业务域拆分 Store / Slice / Repository。
   - 每个模块独立，避免全局命名冲突。

3. **单一数据源**：
   - 服务端状态不复制到多个地方。
   - 客户端全局状态避免重复存储。

4. **按需加载**：
   - 大型 Store 按路由或模块懒加载。

5. **跨模块通信**：
   - 优先通过 URL、全局事件总线、或最小共享状态通信。
   - 避免模块间直接依赖彼此的状态。

架构示意图：

```text
┌─────────────────────────────────────────┐
│           UI Components                 │
├─────────────────────────────────────────┤
│  Local State (useState/useReducer)      │
├─────────────────────────────────────────┤
│  Server State (React Query / SWR)       │
├─────────────────────────────────────────┤
│  Global Client State (Zustand/Redux)    │
│  - user    - theme    - permission      │
├─────────────────────────────────────────┤
│  URL State (React Router / history)     │
├─────────────────────────────────────────┤
│  Data Layer (Repository + DataSource)   │
├─────────────────────────────────────────┤
│  API / GraphQL / LocalStorage           │
└─────────────────────────────────────────┘
```

微前端场景：

- 每个微应用拥有自己的局部状态和 Repository。
- 共享全局状态通过基座应用注入，或使用共享模块（如 Module Federation）。
- 避免微应用之间直接依赖彼此的 Store。

示例（Redux Toolkit 切片）：

```ts
// features/user/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { profile: null, permissions: [] },
  reducers: {
    setUser(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
```

最佳实践：

- 服务端状态和客户端状态分离。
- 全局状态最小化，优先局部化。
- 状态变更要有明确来源，便于调试。
- 使用 DevTools、持久化、日志中间件辅助维护。

**评分维度**：
- 能提出状态分层和模块拆分原则（30%）
- 能区分服务端状态和客户端状态（25%）
- 能说明跨模块通信和微前端场景（25%）
- 能给出具体架构图或代码示例（20%）

**常见错误**：
- 所有状态都放全局 Store。
- 模块间状态高度耦合。
- 忽略服务端状态管理库，自己重复实现缓存。

**延伸追问**：
- 微前端之间如何安全共享状态？
- 如果全局 Store 体积过大，如何优化首屏加载？

**相关题目**：
- [FB-29-SD-R-025 设计前端数据层抽象](#FB-29-SD-R-025)
- [FB-29-CP-R-029 状态管理库选型决策矩阵](#FB-29-CP-R-029)

**参考资源**：
- [Redux Style Guide](https://redux.js.org/style-guide/)
- [Patterns.dev - State Management](https://www.patterns.dev/posts/state-management/)

**口头回答版**：
> 大型 SPA 状态管理要分层：UI 状态放组件；服务端状态用 React Query 或 SWR；全局客户端状态只放用户、主题、权限这种真正全局的；URL 状态交给路由。按业务域拆分 Store 或 Slice，避免命名冲突。微前端场景下，每个微应用有自己的状态，共享状态通过基座注入。核心原则是全局状态最小化、单一数据源、状态变更来源清晰。

---

### FB-29-SC-R-027：设计一个高并发的购物车状态管理方案

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：29 数据与状态管理
**标签**：购物车、高并发、状态管理、乐观更新、库存、一致性
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个电商购物车的状态管理方案，要求支持高并发场景（如秒杀），并处理库存校验、价格变动、多端同步等问题。

**参考答案**：

核心挑战：

1. 用户频繁加购、修改数量。
2. 库存实时变化，需要防止超卖。
3. 价格、促销可能变动。
4. 多端同步（App、小程序、Web）。
5. 高并发下秒杀场景库存扣减。

状态分层：

```text
购物车 UI State（本地）
   │
   ▼
购物车 Client State（全局 Store）
   │
   ▼
购物车 Server State（服务端为真相源）
```

设计方案：

1. **本地即时反馈**：
   - 用户点击“加购”或修改数量，立即更新本地购物车 UI。
   - 使用乐观更新，失败时回滚并提示。

2. **服务端真相源**：
   - 购物车最终数据以服务端为准。
   - 每次进入购物车或结算时，拉取最新购物车快照。

3. **库存校验**：
   - 加购时本地不真正校验库存，只做轻量提示。
   - 结算时服务端强制校验库存和价格，超卖直接拒绝。
   - 秒杀场景采用预扣库存 + 订单锁定机制。

4. **价格与促销**：
   - 购物车展示的价格为“参考价”。
   - 结算时重新计算价格和优惠，避免前端价格被篡改。

5. **多端同步**：
   - 服务端购物车数据通过 WebSocket / 轮询同步到各端。
   - 或采用事件驱动：加购成功后触发刷新。

6. **离线支持**：
   - 本地缓存购物车，联网后合并到服务端。
   - 合并时处理冲突：以服务端为准，提示用户本地变化。

代码示例（加购流程）：

```ts
async function addToCart(skuId: string, quantity: number) {
  // 1. 乐观更新本地状态
  cartStore.optimisticallyAdd({ skuId, quantity });

  try {
    // 2. 请求服务端
    const result = await cartApi.add({ skuId, quantity });

    // 3. 同步服务端返回的精确数据
    cartStore.replaceWithServer(result);
  } catch (error) {
    // 4. 失败回滚
    cartStore.rollback(skuId);
    toast.error('加购失败，库存不足');
  }
}
```

秒杀场景：

- 前端按钮防重复点击。
- 服务端采用 Redis 原子扣减库存。
- 扣减成功才写入购物车或生成订单。
- 前端展示“抢购中”状态，避免用户频繁操作。

**评分维度**：
- 能识别库存、价格、多端同步等核心挑战（30%）
- 能设计本地乐观更新 + 服务端真相源方案（30%）
- 能说明秒杀场景的特殊处理（20%）
- 能提到回滚、冲突处理、离线支持（20%）

**常见错误**：
- 前端做最终库存校验，导致超卖。
- 购物车状态完全本地，不与服务端同步。
- 忽略价格变动和促销失效。

**延伸追问**：
- 如果用户把商品加入购物车后长期不结算，价格变了怎么处理？
- 多个 tab 同时操作购物车，如何保证一致性？

**相关题目**：
- [FB-29-CO-A-011 乐观更新](#FB-29-CO-A-011)
- [FB-29-CO-A-015 数据一致性](#FB-29-CO-A-015)

**参考资源**：
- [电商购物车设计](https://www.infoq.cn/article/shopping-cart-design)
- [秒杀系统设计](https://www.aliyun.com/course/lesson/684)

**口头回答版**：
> 购物车状态管理要分本地和服务端两层。用户操作时先本地乐观更新，让 UI 及时响应，再以服务端为真相源，失败就回滚。库存校验不能靠前端，结算时服务端强制校验，秒杀用预扣库存。价格是参考价，结算时重新算。多端同步可以用 WebSocket 或事件驱动刷新。还要考虑离线缓存和冲突合并。

---

### FB-29-SC-R-028：如何设计多端状态同步方案（Web、小程序、App）？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：29 数据与状态管理
**标签**：多端同步、Web、小程序、App、状态同步、冲突解决
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个多端状态同步方案，使 Web、小程序、App 上的用户状态（如购物车、收藏、阅读进度）保持一致。

**参考答案**：

同步原则：

1. **服务端为唯一真相源**：所有端最终都以服务端数据为准。
2. **最小化本地状态**：只缓存必要数据，避免多端冲突。
3. **事件驱动 + 拉取结合**：写操作成功后广播事件，各端按需拉取。
4. **冲突可预期**：明确最终一致性策略，必要时提示用户。

同步方案：

```text
Web / 小程序 / App
    │
    ├─ 本地缓存（离线、加速）
    │
    ▼
同步层（Sync Layer）
    │
    ├─ 上传本地变更队列
    ├─ 拉取服务端变更
    ├─ 冲突检测与合并
    │
    ▼
服务端（ truth source ）
    │
    ├─ 长连接 / 推送 / 轮询通知变更
```

关键技术：

1. **变更队列（Change Queue）**：
   - 本地操作按时间顺序排队，联网后同步。
   - 每条变更包含操作类型、目标 ID、版本号、时间戳。

2. **版本向量 / 时间戳**：
   - 用 `lastModifiedAt` 或 `version` 判断数据新旧。
   - Last-Write-Wins 或自定义合并策略。

3. **推送通道**：
   - WebSocket、SSE、长轮询、小程序 socket、App push。
   - 用于实时通知其他端数据变化。

4. **拉取策略**：
   - 应用启动、页面可见、用户主动刷新时拉取。
   - 使用 SWR 策略减少请求。

5. **冲突处理**：
   - 简单字段：LWW 或版本号拒绝。
   - 复杂对象：服务端合并或用户确认。

示例（阅读进度同步）：

```ts
// 本地变更队列
interface ReadingProgressChange {
  bookId: string;
  progress: number;
  timestamp: number;
  version: number;
}

// 同步时
async function syncProgress(changes: ReadingProgressChange[]) {
  const serverProgress = await api.getReadingProgress();
  const merged = mergeByTimestamp(changes, serverProgress);
  await api.saveReadingProgress(merged);
}
```

各端差异处理：

- **Web**：SWR + localStorage/IndexedDB。
- **小程序**：storage + 云函数/推送。
- **App**：SQLite + 原生推送 + 后台同步。

**评分维度**：
- 能提出服务端为真相源、事件驱动 + 拉取结合（30%）
- 能设计变更队列和版本机制（25%）
- 能说明推送通道和各端差异（25%）
- 能提到冲突处理策略（20%）

**常见错误**：
- 以本地状态为准，多端各自为政。
- 没有版本号或时间戳，冲突无法判断。
- 所有数据都实时推送，造成性能浪费。

**延伸追问**：
- 如果某端长期离线，恢复后如何合并大量变更？
- 用户在一个端删除数据，另一个端如何感知？

**相关题目**：
- [FB-29-CO-P-021 离线同步与冲突解决](#FB-29-CO-P-021)
- [FB-29-SC-R-027 高并发购物车](#FB-29-SC-R-027)

**参考资源**：
- [Firebase 离线同步](https://firebase.google.com/docs/firestore/manage-data/enable-offline)
- [CRDT 多端同步](https://crdt.tech/)

**口头回答版**：
> 多端同步要以服务端为唯一真相源。本地只做缓存和离线队列。写操作成功后通过 WebSocket、推送或轮询通知其他端，各端再按需拉取。每条变更要带时间戳或版本号，用于冲突判断。简单字段用最后写入为准，复杂对象可以服务端合并或让用户确认。Web 用 SWR 加 IndexedDB，小程序用 storage 加云函数，App 用 SQLite 加原生推送。

---

### FB-29-CP-R-029：如何评估和选择状态管理库？请给出决策矩阵

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：29 数据与状态管理
**标签**：状态管理、选型、决策矩阵、Redux、Zustand、Pinia、React Query
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请从多个维度分析状态管理库的选型因素，并给出一份针对 React / Vue 项目的决策矩阵。

**参考答案**：

选型维度：

1. **状态类型**：客户端状态 vs 服务端状态。
2. **团队规模与熟悉度**：小团队用简单库，大团队需要规范和生态。
3. **TypeScript 支持**：类型推导是否友好。
4. **学习曲线**：上手成本和维护成本。
5. **性能**：订阅粒度、重渲染范围。
6. **生态与工具**：DevTools、中间件、持久化、调试。
7. **可维护性**：代码组织、模块化、测试性。
8. **长期支持**：社区活跃度、官方维护情况。

React 项目决策矩阵：

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| 服务端状态为主 | TanStack Query / SWR | 缓存、失效、乐观更新内置 |
| 简单全局状态 | Zustand / Jotai | 轻量、易用 |
| 复杂全局状态、多团队协作 | Redux Toolkit | 规范、生态、调试 |
| 需要细粒度原子状态 | Jotai / Recoil | 按需订阅、派生灵活 |
| 表单状态 | React Hook Form / Formik | 专门处理表单高频更新 |
| 复杂流程状态 | XState | 状态机消除非法状态 |

Vue 项目决策矩阵：

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| 服务端状态 | Vue Query / SWR | 同 React 生态 |
| 全局状态 | Pinia | Vue 官方推荐、TS 友好 |
| 简单全局状态 | Pinia 或 provide/inject | 根据复杂度选择 |
| 表单状态 | VeeValidate + Composition API | 或 Element Plus 表单 |
| 复杂流程 | XState Vue | 状态机管理 |

通用决策流程：

```text
1. 区分服务端状态和客户端状态
   ├─ 服务端状态 -> React Query / SWR / Vue Query
   └─ 客户端状态 -> 继续判断
2. 客户端状态按复杂度
   ├─ 简单、局部 -> useState / provide-inject
   ├─ 跨组件共享、中等复杂度 -> Zustand / Pinia / Jotai
   └─ 复杂、多团队、强规范 -> Redux Toolkit
3. 特殊场景
   ├─ 表单 -> React Hook Form / VeeValidate
   └─ 复杂流程 -> XState
```

**评分维度**：
- 能从状态类型、团队、TS、性能、生态等维度分析（40%）
- 能给出 React / Vue 的具体决策矩阵（30%）
- 能说明决策流程和选型原则（20%）
- 能指出避免一刀切的思路（10%）

**常见错误**：
- 所有项目都用 Redux 或所有项目都用 Zustand。
- 忽略服务端状态管理库，把所有数据放全局 Store。
- 选型只看流行度，不看团队能力和业务场景。

**延伸追问**：
- 如果一个项目同时需要 Redux 和 React Query，如何划分职责？
- 状态管理库选型后，如何保证团队一致使用？

**相关题目**：
- [FB-29-CO-B-005 Zustand 与 Redux 对比](#FB-29-CO-B-005)
- [FB-29-CO-A-013 Jotai 与 Zustand 设计理念](#FB-29-CO-A-013)
- [FB-29-SD-R-026 大型 SPA 状态管理架构](#FB-29-SD-R-026)

**参考资源**：
- [Redux 选型 FAQ](https://redux.js.org/faq/general#when-should-i-use-redux)
- [State of JS - State Management](https://stateofjs.com/)

**口头回答版**：
> 选型要先分清楚是服务端状态还是客户端状态。服务端状态用 React Query 或 SWR；客户端状态再看复杂度：简单用 useState 或 Zustand/Pinia，复杂用 Redux Toolkit。表单单独用 React Hook Form，复杂流程用 XState。还要看团队熟悉度、TypeScript 支持、生态和长期维护。不要一刀切，服务端状态和客户端状态最好分开管。

---

### FB-29-SD-R-030：设计一个支持离线优先的协作编辑状态同步系统

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：29 数据与状态管理
**标签**：离线优先、协作编辑、CRDT、OT、状态同步、冲突解决
**出现频率**：低频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个支持离线优先的多人协作编辑系统，要求支持离线编辑、断网重连、多端同步、冲突自动解决。

**参考答案**：

核心挑战：

1. 用户离线时仍能编辑。
2. 多人同时编辑同一文档。
3. 断网重连后本地操作需要同步。
4. 冲突自动解决，避免用户感知。
5. 多端（Web、App、桌面端）数据一致。

技术选型：

- **CRDT**（推荐）：Yjs、Automerge。天然支持离线优先和最终一致，无需中心服务器协调。
- **OT**：Google Docs 早期方案，需要中心服务器转换操作，离线支持较复杂。

系统架构：

```text
┌─────────────────────────────────────────┐
│           Editor UI                     │
│  (ProseMirror / Quill / Slate / Monaco) │
├─────────────────────────────────────────┤
│  CRDT Document (Y.Doc / Automerge)      │
├─────────────────────────────────────────┤
│  Local Persistence (IndexedDB)          │
├─────────────────────────────────────────┤
│  Sync Layer (Yjs provider / WebSocket)  │
├─────────────────────────────────────────┤
│  Collaboration Server                   │
├─────────────────────────────────────────┤
│  Persistence (Database / Object Storage)│
└─────────────────────────────────────────┘
```

关键设计：

1. **文档模型 CRDT**：
   - 每个字符/段落是一个 CRDT 元素。
   - 插入、删除、格式化操作都生成 CRDT 操作。
   - 任意顺序合并后结果一致。

2. **本地持久化**：
   - 每次本地更新先写入 IndexedDB。
   - 离线时操作继续排队。

3. **同步协议**：
   - 使用 Yjs 的 `y-websocket` 或 `y-webrtc`。
   - 连接时交换状态向量（state vector），只同步差异。

4. **离线队列**：
   - 记录本地操作日志。
   - 联网后按顺序应用并广播。

5. **光标与选区**：
   - 使用相对位置（Yjs 中的 relative position）避免插入删除时光标漂移。
   - 共享 awareness 状态显示协作者光标和昵称。

6. **版本历史**：
   - 基于 CRDT 操作日志实现撤销重做和时间轴。

示例（Yjs 核心 API）：

```ts
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const doc = new Y.Doc();
const yText = doc.getText('content');

// 本地编辑
yText.insert(0, 'hello');

// 持久化到 IndexedDB
const provider = new WebsocketProvider('wss://demo.yjs.dev', 'room', doc);
```

冲突解决：

- CRDT 保证最终一致，无需额外冲突解决。
- 对于非 CRDT 数据（如元数据），使用版本号或 LWW。

**评分维度**：
- 能选择 CRDT 并说明其离线优先优势（30%）
- 能设计本地持久化 + 同步层架构（25%）
- 能说明光标、选区、awareness 等协作细节（20%）
- 能提到版本历史和撤销重做（15%）
- 能说明与 OT 的对比（10%）

**常见错误**：
- 使用传统 diff 合并文本，导致冲突难以解决。
- 没有本地持久化，离线编辑丢失。
- 忽略光标同步和用户体验。

**延伸追问**：
- 如果某个用户长期离线，重连后操作量很大，如何优化同步？
- 如何防止恶意用户通过 CRDT 生成大量垃圾数据？

**相关题目**：
- [FB-29-CO-P-021 离线同步与冲突解决](#FB-29-CO-P-021)
- [FB-29-SC-R-028 多端状态同步](#FB-29-SC-R-028)

**参考资源**：
- [Yjs 文档](https://docs.yjs.dev/)
- [Automerge 文档](https://automerge.org/)
- [CRDT.tech](https://crdt.tech/)

**口头回答版**：
> 离线优先的协作编辑系统我推荐用 CRDT，比如 Yjs 或 Automerge，它们天然支持离线编辑和最终一致。架构上：编辑器下面是 CRDT 文档，再下面是 IndexedDB 本地持久化，然后是同步层用 WebSocket 和其他客户端同步。离线时操作本地排队，联网后交换差异。光标和选区要用相对位置避免漂移，awareness 用来显示协作者。CRDT 比 OT 更适合离线场景，因为不需要中心服务器做转换。

### FB-29-SD-R-031：如何设计前端 URL 状态管理方案？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：29 数据与状态管理、15 React、16 Vue
**标签**：URL 状态、路由状态、状态管理、可分享、可回退
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个前端 URL 状态管理方案，说明哪些状态适合放入 URL，并给出实现思路和注意事项。

**参考答案**：

URL 是状态的天然容器。将部分状态放入 URL 的好处：

1. **可分享**：用户复制链接即可复现当前页面状态。
2. **可回退**：浏览器前进/后退能恢复状态。
3. **可书签化**：特定筛选条件、分页可直接收藏。
4. **SEO 友好**：搜索引擎可抓取部分 URL 状态。

适合放入 URL 的状态：

| 状态类型 | 示例 |
|---------|------|
| 搜索条件 | keyword、filters |
| 分页排序 | page、pageSize、sortBy、sortOrder |
| 视图切换 | tab、mode、layout |
| 选中项 | selectedId、panel |
| 时间范围 | startDate、endDate |

不适合放入 URL 的状态：

- 表单输入中未提交的草稿。
- 临时 UI 状态，如弹窗开关、加载状态。
- 敏感信息，如 token、用户密码。
- 过大的对象或数组。

实现思路：

1. **路由参数（Path / Query）**：
   - React Router：`useSearchParams`、`useParams`。
   - Vue Router：`useRoute`、`useRouter`。

2. **状态与 URL 双向绑定**：
   - 状态变化时更新 URL。
   - URL 变化时解析并同步到状态。

3. **序列化与反序列化**：
   - 数组、对象使用 `JSON.stringify` 或自定义编码。
   - 注意 URL 长度限制和可读性。

4. **状态重置**：
   - 提供“重置筛选”按钮，清除 URL 参数。

React 示例：

```tsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const page = Number(searchParams.get('page')) || 1;

  const setKeyword = (value: string) => {
    setSearchParams({ keyword: value, page: '1' });
  };

  return <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />;
}
```

注意事项：

- 避免把过多状态塞入 URL，导致链接过长、难以维护。
- URL 参数变更可能触发不必要的请求，需防抖或 memo。
- 注意类型转换和默认值处理。

**评分维度**：
- 能说明 URL 状态的优势（可分享、可回退、SEO）（25%）
- 能区分适合与不适合放入 URL 的状态（25%）
- 能给出双向绑定和序列化方案（25%）
- 能提到敏感信息、URL 长度等注意事项（25%）

**常见错误**：
- 把所有状态都放入 URL。
- 忽略 URL 参数的类型转换，导致 `page=NaN` 等问题。
- 在 URL 中暴露敏感信息。

**延伸追问**：
- 如果 URL 状态和全局 Store 状态冲突，以谁为准？
- 如何设计一个通用的 URL 状态同步 Hook？

**相关题目**：
- [FB-29-SD-R-026 大型 SPA 状态管理架构](#FB-29-SD-R-026)
- [FB-29-CO-B-002 全局状态与局部状态](#FB-29-CO-B-002)

**参考资源**：
- [React Router - Search Params](https://reactrouter.com/en/main/hooks/use-search-params)
- [Vue Router - Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)

**口头回答版**：
> URL 本身就是很好的状态容器，适合放搜索条件、分页、排序、当前 tab 这些。好处是链接可以分享、可以回退、可以收藏。不适合放草稿、临时弹窗、敏感信息。实现上就是状态和 URL 双向绑定：状态变了更新 URL，URL 变了同步回状态。React 用 useSearchParams，Vue 用 useRoute。要注意类型转换、默认值，还有别把链接搞太长。

---

### FB-29-PE-R-032：全局状态管理下如何进行性能优化？

**题型**：性能优化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：29 数据与状态管理、15 React、16 Vue
**标签**：状态管理、性能优化、按需订阅、selector、拆分状态
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请分析全局状态管理下常见的性能问题，并给出优化策略和实现方案。

**参考答案**：

全局状态管理常见性能问题：

1. **不必要的重渲染**：
   - 全局状态变化时，所有订阅组件都重新渲染。
   - 解决：按需订阅、selector、拆分状态。

2. **状态粒度过大**：
   - 一个巨大对象作为全局状态，任何字段变化都触发全量更新。
   - 解决：按业务域拆分为多个 Store / Slice / Atom。

3. **频繁更新的状态和不常变状态混合**：
   - 例如把计时器和用户信息放在同一个 Context。
   - 解决：拆分高频与低频状态。

4. **派生状态重复计算**：
   - 每次渲染都重新计算过滤、排序结果。
   - 解决：使用 selector、computed、useMemo。

5. **大列表或大数据量**：
   - 全局存储大量数据导致内存和渲染压力。
   - 解决：虚拟滚动、分页、服务端状态库缓存、数据裁剪。

优化策略：

| 问题 | 方案 |
|------|------|
| 不必要重渲染 | selector（Zustand/Redux）、原子化（Jotai/Recoil）、拆分 Context |
| 状态粒度过大 | 按模块/业务域拆分 Store |
| 高频与低频混合 | 拆分高频状态到独立 Store/Atom |
| 派生重复计算 | computed、reselect、useMemo |
| 大数据量 | 虚拟滚动、分页、服务端状态库 |

Zustand selector 示例：

```tsx
// 只订阅 count，name 变化不会触发重渲染
const count = useStore((state) => state.count);
```

Redux Reselect 示例：

```ts
import { createSelector } from '@reduxjs/toolkit';

const selectTodos = (state) => state.todos.items;
const selectFilter = (state) => state.todos.filter;

const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => todos.filter((todo) => todo.status === filter)
);
```

Context 拆分示例：

```tsx
// 避免一个 Context 包含所有状态
const ThemeContext = createContext();
const UserContext = createContext();
```

最佳实践：

- 全局状态最小化，优先局部化。
- 使用 DevTools 和 React Profiler 定位重渲染。
- 服务端状态不要存入全局客户端 Store。

**评分维度**：
- 能识别不必要重渲染、状态粒度过大等性能问题（30%）
- 能给出 selector、拆分状态、computed 等优化方案（30%）
- 能结合具体库（Zustand/Redux/Jotai）给出代码示例（20%）
- 能说明全局状态最小化和使用分析工具（20%）

**常见错误**：
- 所有组件都订阅整个 Store。
- 用 Context 管理所有状态，导致 value 变化时全部消费者重渲染。
- 为了优化而过度拆分，增加维护成本。

**延伸追问**：
- 如何量化状态管理性能优化的收益？
- 在 Redux 中，reselect 如何避免重复计算？

**相关题目**：
- [FB-29-CO-A-013 Jotai 与 Zustand 设计理念](#FB-29-CO-A-013)
- [FB-29-SD-R-026 大型 SPA 状态管理架构](#FB-29-SD-R-026)

**参考资源**：
- [Redux - Performance](https://redux.js.org/faq/performance)
- [Zustand - Selecting multiple state slices](https://docs.pmnd.rs/zustand/guides/preventing-rerenders-with-equality-fn)

**口头回答版**：
> 全局状态管理常见的性能问题有不必要的重渲染、状态粒度太大、高频和低频状态混在一起、派生状态重复计算。优化方法包括：用 selector 只订阅需要的字段，比如 Zustand 的 useStore(selector)；把大 Store 按业务域拆分；高频状态单独放；派生状态用 computed 或 reselect 缓存。还要尽量少放全局状态，多用 React Profiler 找问题。
### FB-29-SS-B-001：前端应用中有哪些类型的状态？分别应该怎么管理？

**题型**：软技能题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
前端应用中有哪些类型的状态？分别应该怎么管理。

**参考答案**：

前端状态通常分为五类，不同类型的状态有不同的生命周期、更新来源和一致性要求：

1. **本地 UI 状态**：只影响单个组件，如弹窗开关、表单临时值。用 `useState` / `useReducer` 管理。
2. **全局共享状态**：多个组件共享，如用户信息、主题、语言。用 Zustand / Redux / Pinia / Context 管理。
3. **服务端状态**：来自服务端的数据，如列表、详情。用 React Query / SWR / TanStack Query 管理。
4. **URL 状态**：页面级可分享状态，如筛选条件、页码。用路由参数 / query string 管理。
5. **表单状态**：复杂表单内部状态。用 React Hook Form / Formik / VeeValidate 管理。

分类管理的意义：避免所有状态都放入全局 Store 导致的耦合和性能问题；服务端状态有缓存、失效、去重等专属需求，应使用专门库。

**评分维度**：
- 分类完整（30%）
- 管理方案合理（30%）
- 能解释分类原因（20%）
- 有项目经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 前端状态通常分为五类，不同类型的状态有不同的生命周期、更新来源和一致性要求： 1. 本地 UI 状态：只影响单个组件，如弹窗开关、表单临时值。 用 useState / useReducer 管理。 2. 全局共享状态：多个组件共享，如用户信息、主题、语言。 用 Zustand / Redux / Pinia / Context 管理。

---

### FB-29-CO-B-009：Redux、Zustand、React Query 分别解决什么问题？可以互相替代吗？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
Redux、Zustand、React Query 分别解决什么问题？可以互相替代吗。

**参考答案**：

三者定位不同：

- **Redux**：全局客户端状态管理，强调可预测、可调试，适合超大型应用和需要严格状态流控制的场景。
- **Zustand**：轻量全局状态管理，API 简单灵活，适合中小型应用或作为 Redux 的简化替代。
- **React Query**：服务端状态管理，解决数据获取、缓存、失效、去重、乐观更新等问题。

它们**不能互相替代**：
- Redux/Zustand 不擅长处理服务端数据的缓存、失效和异步同步。
- React Query 不擅长管理纯客户端 UI 状态（如主题、弹窗）。

最佳实践是组合使用：Zustand 管理全局客户端状态，React Query 管理服务端状态，局部状态用 useState。

**评分维度**：
- 能区分三者定位（30%）
- 能说明不可替代性（30%）
- 提出组合方案（20%）
- 有选型经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 三者定位不同： - Redux：全局客户端状态管理，强调可预测、可调试，适合超大型应用和需要严格状态流控制的场景。 - Zustand：轻量全局状态管理，API 简单灵活，适合中小型应用或作为 Redux 的简化替代。 - React Query：服务端状态管理，解决数据获取、缓存、失效、去重、乐观更新等问题。 它们不能互相替代： - Redux/Zustand 不擅长处理服务端数据的缓存、失效和异步同步。

---

### FB-29-CP-B-001：React Query 的 staleTime 和 cacheTime 有什么区别？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
React Query 的 staleTime 和 cacheTime 有什么区别。

**参考答案**：

- **staleTime**：数据被视为“新鲜”的时间。在 staleTime 内，组件重新挂载不会触发新请求；超过后，组件重新挂载会 background refetch。
- **cacheTime**：数据在缓存中保留的时间。超过 cacheTime 后，即使还有组件引用该 query，未激活的数据也会被垃圾回收。

比喻：
- staleTime 是牛奶的“最佳饮用期”，过期了还可以喝，但会检查一下是否变质。
- cacheTime 是牛奶的“保质期”，过期后直接倒掉。

配置建议：
- 变化频繁的数据：staleTime 设短（如 0）。
- 变化少的数据：staleTime 设长（如 5 分钟），cacheTime 可适当延长。

```tsx
useQuery({
  queryKey: ['user', userId],
  queryFn: fetchUser,
  staleTime: 1000 * 60 * 5, // 5 分钟内视为新鲜
  cacheTime: 1000 * 60 * 30, // 30 分钟后清理缓存
});
```

**评分维度**：
- 概念准确（35%）
- 能举例说明（25%）
- 知道如何配置（20%）
- 能说明适用场景（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - staleTime：数据被视为“新鲜”的时间。 在 staleTime 内，组件重新挂载不会触发新请求；超过后，组件重新挂载会 background refetch。 - cacheTime：数据在缓存中保留的时间。 超过 cacheTime 后，即使还有组件引用该 query，未激活的数据也会被垃圾回收。

---

### FB-29-CO-B-010：什么是乐观更新？实现时需要注意什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是乐观更新？实现时需要注意什么。

**参考答案**：

乐观更新是先假设操作会成功，立即更新 UI，再异步发送请求。如果失败，再回滚到之前的状态。它能显著提升用户体验，减少等待感。

实现注意事项：

1. **保存旧状态**：用于失败时回滚。
2. **取消冲突 refetch**：在 `onMutate` 中取消正在进行的相关查询，避免冲突。
3. **执行回滚**：在 `onError` 中恢复旧状态。
4. **最终校验**：在 `onSettled` 中 invalidate 相关 query，确保数据正确。
5. **适用边界**：对于关键操作（如支付、下单），不适合乐观更新，应等待服务端确认。

```tsx
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previousTodos = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

**评分维度**：
- 能解释原理（25%）
- 能说出实现步骤（30%）
- 能指出注意事项（20%）
- 有代码示例（10%）
- 有实战经验（15%）

---

## 二、进阶题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 乐观更新是先假设操作会成功，立即更新 UI，再异步发送请求。 如果失败，再回滚到之前的状态。 它能显著提升用户体验，减少等待感。 实现注意事项： 1. 保存旧状态：用于失败时回滚。

---

### FB-29-SD-A-001：如何设计一个大型列表页的状态管理？

**题型**：系统设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何设计一个大型列表页的状态管理。

**参考答案**：

大型列表页的状态需要按职责分层管理，避免全部塞入全局 Store。

状态划分：
- **筛选条件、排序、页码**：URL 状态（可分享、可回退、刷新不丢失）。
- **列表数据**：React Query 服务端状态，自动处理缓存、加载、错误。
- **加载/错误状态**：React Query 自动管理。
- **选中行、展开状态**：本地 UI 状态。
- **批量操作结果**：临时本地状态，操作成功后 invalidate 列表。

关键设计：
- queryKey 要包含所有筛选参数，确保不同参数走不同缓存。
- 使用分页或无限滚动时，注意缓存策略和预加载。
- 用户操作后主动 invalidate 列表数据。
- 对高频筛选变化做防抖，避免频繁请求。

```tsx
const [search, setSearch] = useSearchParams();
const page = Number(search.get('page')) || 1;
const keyword = search.get('keyword') || '';

const { data, isLoading } = useQuery({
  queryKey: ['orders', page, keyword],
  queryFn: () => fetchOrders({ page, keyword }),
  keepPreviousData: true,
});
```

**评分维度**：
- 状态分类合理（30%）
- queryKey 设计正确（25%）
- 考虑用户体验（20%）
- 有代码示例（10%）
- 有实际项目经验（15%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 大型列表页的状态需要按职责分层管理，避免全部塞入全局 Store。 状态划分： - 筛选条件、排序、页码：URL 状态（可分享、可回退、刷新不丢失）。 - 列表数据：React Query 服务端状态，自动处理缓存、加载、错误。 - 加载/错误状态：React Query 自动管理。

---

### FB-29-SS-A-001：服务端状态管理和客户端状态管理有什么区别？

**题型**：软技能题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
服务端状态管理和客户端状态管理有什么区别。

**参考答案**：

服务端状态的特殊性：

1. **真相在服务端**：前端只是缓存，最终一致性以服务端为准。
2. **获取是异步的**：有 loading、error、success 等状态。
3. **需要缓存策略**：如 staleTime、cacheTime、refetchOnWindowFocus。
4. **需要失效策略**：Mutation 后 invalidate 相关 Query。
5. **需要去重**：多个组件同时请求同一数据，应只发一次请求。
6. **需要乐观更新和回滚**：提升用户体验。
7. **需要错误重试**：网络波动时自动重试。
8. **需要后台刷新**：页面重新聚焦时自动同步最新数据。

因此服务端状态需要专门的管理方案（React Query / SWR / TanStack Query / RTK Query），而不是简单用 Redux 存储。

**评分维度**：
- 能说出核心区别（35%）
- 能举例说明（25%）
- 能解释为什么需要专用库（25%）
- 有项目经验（15%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 服务端状态的特殊性： 1. 真相在服务端：前端只是缓存，最终一致性以服务端为准。 2. 获取是异步的：有 loading、error、success 等状态。 3. 需要缓存策略：如 staleTime、cacheTime、refetchOnWindowFocus。 4. 需要失效策略：Mutation 后 invalidate 相关 Query。

---

### FB-29-CO-A-017：如何处理数据一致性问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何处理数据一致性问题。

**参考答案**：

数据一致性处理策略应根据业务要求选择：

1. **主动失效**：Mutation 后 invalidate 相关 Query，让数据重新获取。
2. **手动更新缓存**：直接更新本地缓存，避免重新请求，适合频繁操作场景。
3. **乐观更新 + 回滚**：提升用户体验，失败时恢复旧状态。
4. **实时同步**：WebSocket / SSE 推送数据变化，适合协同场景。
5. **版本号/时间戳**：检测冲突，决定以哪方为准，适合并发编辑。
6. **最终一致性**：接受短暂不一致，通过同步机制最终一致。

选择依据：
- 业务对一致性的要求（强一致 vs 最终一致）。
- 用户体验要求。
- 技术复杂度和成本。

例如：电商下单后应立即刷新订单列表（主动失效）；社交点赞可用乐观更新；协同文档需用 OT/CRDT 保证一致性。

**评分维度**：
- 策略覆盖全面（35%）
- 能区分场景（25%）
- 有架构权衡意识（20%）
- 有实际经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 数据一致性处理策略应根据业务要求选择： 1. 主动失效：Mutation 后 invalidate 相关 Query，让数据重新获取。 2. 手动更新缓存：直接更新本地缓存，避免重新请求，适合频繁操作场景。 3. 乐观更新 + 回滚：提升用户体验，失败时恢复旧状态。 4. 实时同步：WebSocket / SSE 推送数据变化，适合协同场景。

---

### FB-29-SD-A-002：如何设计一个支持乐观更新的全局状态方案？

**题型**：系统设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何设计一个支持乐观更新的全局状态方案。

**参考答案**：

设计乐观更新方案需要同时考虑性能、一致性和回滚能力。

核心设计：

1. **状态分层**：服务端状态用 React Query 管理，乐观更新在其缓存层实现；纯 UI 状态不需要乐观更新。
2. **操作原子化**：每个 mutation 对应一个明确的业务操作，避免批量操作部分失败难以回滚。
3. **快照机制**：执行乐观更新前保存当前状态快照。
4. **冲突检测**：对同一资源的并发操作，检测是否会产生冲突。
5. **队列化**：对高频操作（如连续点赞、拖拽排序）可以队列化，避免中间状态频繁闪烁。
6. **错误回滚**：请求失败时恢复到快照状态，并提示用户。
7. **最终同步**：操作成功后 invalidate 或手动更新缓存，确保与服务端一致。

```ts
interface OptimisticUpdate<T> {
  key: string;
  previous: T;
  optimistic: T;
  mutation: () => Promise<T>;
  onError: (err: Error) => void;
}
```

**评分维度**：
- 设计方案完整（30%）
- 能说明快照和回滚（25%）
- 考虑并发和队列化（20%）
- 有代码或架构示例（15%）
- 有实战经验（10%）

---

## 三、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 设计乐观更新方案需要同时考虑性能、一致性和回滚能力。 核心设计： 1. 状态分层：服务端状态用 React Query 管理，乐观更新在其缓存层实现；纯 UI 状态不需要乐观更新。 2. 操作原子化：每个 mutation 对应一个明确的业务操作，避免批量操作部分失败难以回滚。 3. 快照机制：执行乐观更新前保存当前状态快照。

---

### FB-29-SD-P-001：设计一个支持离线编辑的协同文档应用的数据层。

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
设计一个支持离线编辑的协同文档应用的数据层。。

**参考答案**：

离线协同文档的数据层需要兼顾本地优先、冲突解决和实时同步。

架构要素：

1. **本地优先**：使用 IndexedDB 存储文档快照和编辑操作队列。
2. **操作队列**：记录离线期间的所有操作（insert、delete、format）。
3. **冲突解决**：使用 OT（Operational Transformation）或 CRDT（如 Yjs）处理多人并发编辑。
4. **实时同步**：WebSocket 同步操作，网络恢复后批量同步离线队列。
5. **版本管理**：每个文档有版本号或向量时钟，用于检测冲突。
6. **服务端持久化**：最终保存到数据库，作为权威来源。
7. **数据丢失防护**：定期快照、本地备份、上传进度提示。

挑战与应对：
- 冲突合并：优先使用 CRDT 保证最终一致性。
- 网络恢复后的批量同步：分批上传，避免一次性发送大量操作。
- 多人同时编辑的实时一致性：操作广播 + 本地合并。
- 数据丢失：本地快照 + 服务端持久化双保险。

**评分维度**：
- 架构完整（30%）
- 技术选型合理（25%）
- 考虑冲突和同步（25%）
- 有深度思考（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 离线协同文档的数据层需要兼顾本地优先、冲突解决和实时同步。 架构要素： 1. 本地优先：使用 IndexedDB 存储文档快照和编辑操作队列。 2. 操作队列：记录离线期间的所有操作（insert、delete、format）。 3. 冲突解决：使用 OT（Operational Transformation）或 CRDT（如 Yjs）处理多人并发编辑。

---

### FB-29-SD-P-002：如何设计一个大型前端应用的状态管理架构？

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何设计一个大型前端应用的状态管理架构。

**参考答案**：

大型前端应用的状态管理应遵循“分层、分域、分离”的原则。

架构设计：

1. **状态分层**：
   - 局部 UI 状态：组件内部。
   - 领域状态：按业务领域拆分 Store（如订单域、用户域）。
   - 全局共享状态：主题、语言、用户信息等。
   - 服务端状态：React Query / SWR。
2. **按领域组织**：每个领域有独立的 actions、selectors、effects，避免全局命名冲突。
3. **服务端与客户端状态分离**：不要把 API 数据长期放在 Redux 中，交给专业库管理。
4. **不可变数据**：使用 Immer 或不可变更新，便于调试和性能优化。
5. **派生状态**：用 selector / computed 派生，避免冗余存储。
6. **状态变更可追踪**： Redux DevTools / Zustand DevTools / 日志。
7. **性能优化**：按订阅拆分、使用 selector 避免不必要的重渲染。

```ts
// 领域状态示例
interface UserState {
  profile: UserProfile | null;
  permissions: string[];
}

const useUserStore = create<UserState & UserActions>((set) => ({
  profile: null,
  permissions: [],
  setProfile: (profile) => set({ profile }),
}));
```

**评分维度**：
- 架构分层清晰（30%）
- 领域组织合理（25%）
- 服务端与客户端分离（20%）
- 有代码示例（10%）
- 有大型项目经验（15%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 大型前端应用的状态管理应遵循“分层、分域、分离”的原则。 架构设计： 1. 状态分层：    - 局部 UI 状态：组件内部。 - 领域状态：按业务领域拆分 Store（如订单域、用户域）。 - 全局共享状态：主题、语言、用户信息等。

---

### FB-29-SC-P-001：Redux Toolkit、Zustand、Jotai、Recoil 的适用场景分别是什么？

**题型**：场景设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
Redux Toolkit、Zustand、Jotai、Recoil 的适用场景分别是什么。

**参考答案**：

| 库 | 特点 | 适用场景 |
|----|------|---------|
| Redux Toolkit | 生态成熟、可预测、调试强 | 大型应用、复杂状态流、严格规范 |
| Zustand | API 极简、无样板代码、TypeScript 友好 | 中小型应用、快速开发 |
| Jotai | 原子化状态、组合灵活、按需订阅 | 需要细粒度状态共享的场景 |
| Recoil | 原子化 + selector、Facebook 出品 | React 生态、需要派生状态管理 |

选型建议：
- 团队熟悉 Redux 且项目规模大 → Redux Toolkit。
- 追求简洁和快速开发 → Zustand。
- 需要原子化、组合式状态 → Jotai。
- 已有 Recoil 使用经验 → Recoil（注意生态活跃度）。

共同趋势：现代状态管理更强调按需订阅、TypeScript 支持和最小化样板代码。

**评分维度**：
- 能区分四种库（35%）
- 能说明适用场景（30%）
- 有选型依据（20%）
- 了解生态趋势（15%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> | 库 | 特点 | 适用场景 | |----|------|---------| | Redux Toolkit | 生态成熟、可预测、调试强 | 大型应用、复杂状态流、严格规范 | | Zustand | API 极简、无样板代码、TypeScript 友好 | 中小型应用、快速开发 | | Jotai | 原子化状态、组合灵活、按需订阅 | 需要细粒度状态共享的场景 | | Recoil | 原子化 + selector、Facebook 出品 | React 生态、需要派生状态管理 | 选型建议： - 团队熟悉 Redux 且项目规模大 → Redux Toolkit。 - 追求简洁和快速开发 → Zustand。 - 需要原子化、组合式状态 → Jotai。 - 已有 Recoil……

---

### FB-29-CO-P-025：如何处理跨组件、跨页面的状态共享与持久化？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：29 数据与状态管理
**标签**：状态管理、React Query、Redux、Zustand、缓存
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何处理跨组件、跨页面的状态共享与持久化。

**参考答案**：

跨组件、跨页面状态共享与持久化需要统一方案：

1. **全局状态库**：Zustand / Redux / Pinia 管理跨页面共享状态。
2. **URL 状态**：适合可分享、可刷新的页面级状态。
3. **本地存储持久化**：
   - 使用 localStorage / sessionStorage / IndexedDB。
   - 注意序列化、版本迁移、容量限制。
   - 敏感信息不要持久化到 localStorage。
4. **状态同步**：
   - 多标签页同步：BroadcastChannel / storage 事件。
   - 前后端同步：WebSocket / SSE / 轮询。
5. **持久化策略**：
   - 只持久化必要状态（如用户偏好）。
   - 服务端权威数据不持久化，只缓存。
   - 持久化前做 schema 校验，防止版本不兼容。

```ts
// Zustand 持久化示例
import { persist } from 'zustand/middleware';

const useStore = create(persist(
  (set) => ({ theme: 'light', setTheme: (theme) => set({ theme }) }),
  { name: 'app-theme' }
));
```

**评分维度**：
- 方案覆盖全面（30%）
- 能区分共享和持久化（25%）
- 考虑安全和版本（20%）
- 有代码示例（10%）
- 有实战经验（15%）

---

## 面试准备建议

1. 理解状态分类：本地、全局、服务端、URL、表单状态各司其职。
2. 掌握 React Query / SWR 核心概念：queryKey、staleTime、cacheTime、invalidate、乐观更新。
3. 能设计列表页、详情页、表单页的状态管理方案。
4. 理解数据一致性策略：主动失效、乐观更新、实时同步、最终一致。
5. 准备项目案例：说明你如何选型状态管理库、解决性能或一致性问题。

---

> **领域编号**：A05 数据与状态管理  
> **最后更新**：2026-06-18

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 跨组件、跨页面状态共享与持久化需要统一方案： 1. 全局状态库：Zustand / Redux / Pinia 管理跨页面共享状态。 2. URL 状态：适合可分享、可刷新的页面级状态。 3. 本地存储持久化：    - 使用 localStorage / sessionStorage / IndexedDB。 - 注意序列化、版本迁移、容量限制。

