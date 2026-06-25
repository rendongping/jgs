# A05 数据与状态管理 — 练习册

> 目标：通过练习巩固状态分类、客户端状态管理、服务端状态管理、缓存策略和数据一致性等核心能力。

---

## 难度分级

- 🟢 **基础**：理解状态分类和基础状态管理。
- 🟡 **进阶**：能设计服务端状态方案、缓存策略和乐观更新。
- 🔴 **深入**：能处理复杂一致性、冲突解决和离线同步。

---

## 基础题

### 题目 1：状态分类

**考察点**：五种状态类型的理解。

**题目**：
请说出前端应用中常见的五类状态，并各举一个例子。

::: details 查看答案与解析
**参考答案**：

前端应用中的状态通常可以分为以下五类：

#### 1. 本地 UI 状态（Local UI State）

指只在当前组件或页面内部使用、不需要共享的状态。

- **例子**：弹窗的显示/隐藏、表单输入框的聚焦状态、下拉菜单的展开状态、当前展开的折叠面板索引。
- **管理工具**：`useState`、`useReducer`。

```tsx
const [isOpen, setIsOpen] = useState(false);
```

#### 2. 全局共享状态（Global Shared State）

指需要在多个组件或页面之间共享的状态。

- **例子**：当前登录用户信息、主题（暗黑/亮色）、语言设置、全局通知消息。
- **管理工具**：Context API、Zustand、Redux、Jotai、Recoil。

```tsx
const theme = useThemeStore((state) => state.theme);
```

#### 3. 服务端状态（Server State）

指来自服务器、需要通过网络请求获取的数据。

- **例子**：商品列表、订单详情、用户信息、新闻列表。
- **管理工具**：TanStack Query（React Query）、SWR、RTK Query。

```tsx
const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});
```

#### 4. URL 状态（URL State）

指存储在 URL 中的状态，刷新页面或分享链接时可以恢复。

- **例子**：当前页码、筛选条件、搜索关键词、排序方式、模态框参数。
- **管理工具**：React Router、Next.js Router、自定义 Hook。

```tsx
const [searchParams, setSearchParams] = useSearchParams();
const page = Number(searchParams.get('page')) || 1;
```

#### 5. 表单状态（Form State）

指表单相关的状态，包括输入值、校验状态、提交状态等。

- **例子**：登录表单的用户名/密码、校验错误信息、是否正在提交。
- **管理工具**：React Hook Form、Formik、受控组件 + useState。

```tsx
const { register, handleSubmit, formState: { errors } } = useForm();
```

#### 状态分类总结表

| 状态类型 | 生命周期 | 持久化 | 典型工具 |
|----------|----------|--------|----------|
| 本地 UI 状态 | 组件级 | 不持久 | useState/useReducer |
| 全局共享状态 | 应用级 | localStorage/内存 | Zustand/Redux/Context |
| 服务端状态 | 服务端决定 | 缓存 | TanStack Query/SWR |
| URL 状态 | 页面级 | URL | React Router |
| 表单状态 | 表单级 | 可草稿保存 | React Hook Form |
:::

---

### 题目 2：Context API 适合什么场景？

**考察点**：Context 使用边界。

**题目**：
React Context API 适合管理什么状态？不适合管理什么状态？为什么？

::: details 查看答案与解析
**参考答案**：

#### 适合的场景

Context API 适合管理**低频更新、跨组件共享**的状态：

1. **主题切换**：暗黑/亮色模式。
2. **语言/国际化**：当前语言设置。
3. **用户信息**：登录用户、权限角色。
4. **全局配置**：站点配置、功能开关。
5. **全局通知**：Toast、Modal 等一次性全局事件。

```tsx
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

function App() {
  const [theme, setTheme] = useState('light');
  const value = useMemo(
    () => ({ theme, toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <Main />
    </ThemeContext.Provider>
  );
}
```

#### 不适合的场景

Context API 不适合管理**高频更新**的状态：

1. **实时变化的计数器**：每秒更新的数据。
2. **复杂表单状态**：大量字段频繁变化。
3. **高频交互的动画状态**：如鼠标跟随、滚动位置。
4. **大型列表状态**：虚拟列表的滚动偏移。

**原因**：

- Context 值变化时，所有消费该 Context 的组件都会重新渲染。
- 即使使用 `React.memo`，子组件的渲染也无法避免（因为 Context 订阅机制）。
- 高频更新会导致大量不必要的渲染，影响性能。

#### 替代方案

| 场景 | 推荐工具 |
|------|----------|
| 高频更新、原子化状态 | Jotai、Recoil |
| 中等复杂度全局状态 | Zustand |
| 复杂应用状态 | Redux Toolkit |
| 服务端状态 | TanStack Query、SWR |

#### 优化 Context 性能的方法

1. **拆分 Context**：将高频和低频状态放在不同 Context 中。
2. **使用 useMemo**：稳定 Context value 的引用。
3. **只传递 dispatch**：使用 `useReducer`，Context 只传 dispatch。

```tsx
// 不好的做法：Context 中传递频繁变化的状态
const CountContext = createContext({ count: 0, setCount: () => {} });

// 好的做法：拆分为两个 Context
const CountStateContext = createContext(0);
const CountDispatchContext = createContext(() => {});
```
:::

---

### 题目 3：React Query 的核心概念

**考察点**：服务端状态管理基础。

**题目**：
请解释 React Query 中的 queryKey、staleTime、cacheTime 和 invalidateQueries 的作用。

::: details 查看答案与解析
**参考答案**：

#### 1. queryKey

`queryKey` 是 React Query 中用于**唯一标识和缓存查询**的数组。

```tsx
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});
```

作用：

- 决定数据是否复用：相同 `queryKey` 的查询会共享缓存。
- 自动作为依赖：当 `queryKey` 中的值变化时，自动重新获取数据。
- 建议包含所有会影响请求结果的变量。

```tsx
// 好的 queryKey 设计
useQuery({ queryKey: ['products', category, page], queryFn: fetchProducts });
```

#### 2. staleTime

`staleTime` 定义数据从“新鲜”变为“过时”的时间间隔。

```tsx
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000, // 5 分钟内数据视为新鲜
});
```

- 数据新鲜时，组件重新挂载不会触发请求。
- 数据过时后，组件重新挂载或窗口重新聚焦时会自动重新获取。
- `staleTime: Infinity` 表示数据永远新鲜，不会自动重新获取。

#### 3. gcTime（v5 之前叫 cacheTime）

`gcTime` 定义数据在缓存中保留的时间。

```tsx
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  gcTime: 10 * 60 * 1000, // 10 分钟内没有被使用会被垃圾回收
});
```

- 当所有使用该 `queryKey` 的组件都卸载后，数据仍保留 `gcTime` 时间。
- 在此期间重新订阅，可以直接使用缓存数据。
- 超过 `gcTime` 后数据被清除。

#### 4. invalidateQueries

`invalidateQueries` 用于将指定 `queryKey` 的缓存标记为过时，触发重新获取。

```tsx
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    // 让 ['user'] 相关的所有查询失效
    queryClient.invalidateQueries({ queryKey: ['user'] });
  },
});
```

使用场景：

- 用户修改数据后，需要刷新相关列表或详情。
- 触发后台重新同步。

#### 5. 四者关系

```
请求数据
   │
   ▼
数据新鲜（staleTime 内）
   │
   ▼
数据过时（staleTime 后）
   │
   ├─ 窗口聚焦/重新挂载 → 自动重新获取
   │
   ▼
组件卸载
   │
   ▼
数据仍保留在缓存中（gcTime 内）
   │
   ▼
gcTime 后数据被清除

invalidateQueries：
   立即将数据标记为过时，触发重新获取
```
:::

---

### 题目 4：HTTP 缓存策略

**考察点**：HTTP 缓存基础。

**题目**：
请解释 `Cache-Control: max-age=3600` 和 `ETag` 的区别。

::: details 查看答案与解析
**参考答案**：

#### 1. Cache-Control: max-age=3600

这是**强缓存**策略。

- 浏览器收到响应后，在 3600 秒（1 小时）内再次请求该资源时，直接使用本地缓存，不会向服务器发送请求。
- 状态码显示为 `200 (from disk cache)` 或 `200 (from memory cache)`。

```
首次请求：
  浏览器 ──────▶ 服务器
  浏览器 ◀────── 服务器 + Cache-Control: max-age=3600

1 小时内再次请求：
  浏览器 ──────▶ 本地缓存（不发网络请求）
```

适用场景：

- 不经常变化的静态资源：JS、CSS、图片、字体。
- 通常配合文件名哈希使用，如 `app.abc123.js`。

#### 2. ETag

这是**协商缓存**策略。

- 服务器返回资源时附带一个资源唯一标识 `ETag`。
- 浏览器再次请求时，通过 `If-None-Match` 头带上 ETag。
- 服务器对比 ETag，如果资源未变，返回 `304 Not Modified`，浏览器使用本地缓存。

```
首次请求：
  浏览器 ──────▶ 服务器
  浏览器 ◀────── 服务器 + ETag: "33a64df5"

再次请求：
  浏览器 ──────▶ 服务器 + If-None-Match: "33a64df5"
  浏览器 ◀────── 服务器 304 Not Modified
```

适用场景：

- 需要验证资源是否变化的动态资源。
- 不适合长期强缓存的 HTML 页面。

#### 3. 核心区别

| 特性 | max-age | ETag |
|------|---------|------|
| 缓存类型 | 强缓存 | 协商缓存 |
| 是否发请求 | 缓存期内不发请求 | 每次都发请求验证 |
| 状态码 | 200 (from cache) | 304 Not Modified |
| 精确度 | 基于时间，可能拿到过期数据 | 基于内容哈希，更准确 |
| 开销 | 网络开销最小 | 有一次请求验证开销 |

#### 4. 最佳实践

- 静态资源：`Cache-Control: public, max-age=31536000, immutable` + 文件名哈希。
- HTML 文件：`Cache-Control: no-cache` 或短 max-age + ETag，确保更新及时生效。
- API 数据：根据业务场景设置 `max-age` 或 `ETag`。
:::

---

## 进阶题

### 题目 5：设计一个商品列表页的数据状态

**考察点**：状态分类与综合设计。

**题目**：
一个电商商品列表页包含：分类筛选、价格排序、分页、商品列表数据、加载状态。请说明每部分应该用什么状态管理。

::: details 查看答案与解析
**参考答案**：

#### 状态分配

| 状态 | 类型 | 管理方式 | 理由 |
|------|------|----------|------|
| 分类筛选 | URL 状态 | `useSearchParams` | 可分享、可回退、SEO 友好 |
| 价格排序 | URL 状态 | `useSearchParams` | 同上 |
| 分页（page） | URL 状态 | `useSearchParams` | 刷新后保持在当前页 |
| 商品列表数据 | 服务端状态 | TanStack Query | 自动缓存、刷新、加载状态 |
| 加载状态 | 服务端状态 | TanStack Query 提供 | `isLoading`、`isFetching` |
| 选中项/展开状态 | 本地 UI 状态 | `useState` | 只在当前页面使用 |

#### 完整代码示例

```tsx
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from './api';

function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 状态
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'default';
  const page = Number(searchParams.get('page')) || 1;

  // 本地 UI 状态
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // 服务端状态
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['products', category, sort, page],
    queryFn: () => fetchProducts({ category, sort, page }),
    staleTime: 60 * 1000,
  });

  const updateFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, value);
      next.set('page', '1'); // 切换筛选时重置到第一页
      return next;
    });
  };

  if (isLoading) return <ProductListSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <FilterBar category={category} sort={sort} onChange={updateFilter} />
      {isFetching && <RefreshIndicator />}
      <ProductList
        products={data?.list}
        selectedProducts={selectedProducts}
        onSelect={setSelectedProducts}
      />
      <Pagination
        page={page}
        total={data?.total}
        onChange={(p) => updateFilter('page', String(p))}
      />
    </div>
  );
}
```

#### 设计要点

- **URL 状态优先**：筛选、排序、分页放在 URL 中，用户可以分享和回退。
- **服务端状态独立**：商品数据由 React Query 管理，自动处理缓存和刷新。
- **避免状态同步问题**：不要同时用 useState 和 URL 保存同一份筛选条件。
- **加载状态细分**：首次加载用 `isLoading`，后台刷新用 `isFetching`。
:::

---

### 题目 6：实现乐观更新

**考察点**：乐观更新与回滚。

**题目**：
用 React Query 实现一个“点赞”功能的乐观更新，要求成功时保留，失败时回滚。

::: details 查看答案与解析
**参考答案**：

#### 完整实现

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost } from './api';

interface Post {
  id: string;
  liked: boolean;
  likeCount: number;
}

function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,

    // 1. 发起请求前：乐观更新本地缓存
    onMutate: async (postId: string) => {
      // 取消正在进行的重新获取，避免覆盖乐观更新
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // 保存之前的缓存状态，用于回滚
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // 乐观更新缓存
      queryClient.setQueryData<Post[]>(['posts'], (old) => {
        if (!old) return old;
        return old.map((post) =>
          post.id === postId
            ? {
                ...post,
                liked: true,
                likeCount: post.likeCount + 1,
              }
            : post
        );
      });

      // 返回上下文，供 onError 使用
      return { previousPosts };
    },

    // 2. 请求失败时：回滚到之前的状态
    onError: (err, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      // 可以在这里显示错误提示
      console.error('点赞失败:', err);
    },

    // 3. 无论成功失败：最后重新获取最新数据
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // 也可以只让当前 post 失效
      // queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
  });
}
```

#### 使用示例

```tsx
function LikeButton({ post }: { post: Post }) {
  const likeMutation = useLikePost();

  return (
    <button
      onClick={() => likeMutation.mutate(post.id)}
      disabled={likeMutation.isPending}
    >
      {post.liked ? '❤️' : '🤍'} {post.likeCount}
    </button>
  );
}
```

#### 关键点说明

| 步骤 | 作用 |
|------|------|
| `onMutate` | 在请求发出前立即更新 UI，提供即时反馈。 |
| `cancelQueries` | 避免后台 refetch 覆盖乐观更新。 |
| `previousPosts` | 保存旧状态，失败时回滚。 |
| `onError` | 请求失败时恢复到旧状态。 |
| `onSettled` | 最终与服务器同步，确保数据一致。 |

#### 注意事项

- 乐观更新适合**可逆操作**（点赞、收藏、开关）。
- 对于**不可逆操作**（删除、转账），应谨慎使用或不用。
- 需要确保回滚逻辑完善，避免状态不一致。
:::

---

### 题目 7：缓存失效策略设计

**考察点**：缓存策略。

**题目**：
一个应用有以下数据，请为每种数据设计缓存策略：
1. 用户头像和昵称
2. 商品列表
3. 实时通知
4. 购物车数量

::: details 查看答案与解析
**参考答案**：

#### 1. 用户头像和昵称

- **缓存策略**：较长时间缓存 + Mutation 后主动更新。
- **staleTime**：30 分钟 ~ 数小时。
- **理由**：用户头像和昵称变化频率很低，适合长期缓存。

```tsx
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 30 * 60 * 1000, // 30 分钟
});

// 修改后主动更新缓存
const updateMutation = useMutation({
  mutationFn: updateUserProfile,
  onSuccess: (newUser) => {
    queryClient.setQueryData(['user', newUser.id], newUser);
  },
});
```

#### 2. 商品列表

- **缓存策略**：短时间缓存 + 操作后失效。
- **staleTime**：1 ~ 5 分钟。
- **理由**：商品信息可能变化（价格、库存），但变化不会太频繁。

```tsx
const { data: products } = useQuery({
  queryKey: ['products', category, page],
  queryFn: () => fetchProducts({ category, page }),
  staleTime: 5 * 60 * 1000, // 5 分钟
});

// 商品信息变更后让相关查询失效
queryClient.invalidateQueries({ queryKey: ['products'] });
```

#### 3. 实时通知

- **缓存策略**：不缓存或极短缓存。
- **获取方式**：SSE、WebSocket、短轮询（ fallback ）。
- **理由**：通知需要实时性，缓存会延迟信息到达。

```tsx
function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications/stream');
    eventSource.onmessage = (e) => {
      const notification = JSON.parse(e.data);
      setNotifications((prev) => [notification, ...prev]);
    };
    return () => eventSource.close();
  }, []);

  return notifications;
}
```

#### 4. 购物车数量

- **缓存策略**：短缓存 + Mutation 后立即更新 + 页面聚焦时刷新。
- **staleTime**：较短（如 30 秒 ~ 1 分钟），但加入商品后立即更新。
- **理由**：购物车数量直接影响用户决策，需要较高实时性。

```tsx
const { data: cartCount } = useQuery({
  queryKey: ['cart-count'],
  queryFn: fetchCartCount,
  staleTime: 30 * 1000,
  refetchOnWindowFocus: true,
});

// 加入购物车后立即更新
const addToCartMutation = useMutation({
  mutationFn: addToCart,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['cart-count'] });
  },
});
```

#### 缓存策略总结

| 数据 | staleTime | 更新策略 |
|------|-----------|----------|
| 用户头像/昵称 | 30 分钟+ | Mutation 后 setQueryData |
| 商品列表 | 1-5 分钟 | invalidateQueries |
| 实时通知 | 不缓存 | WebSocket/SSE |
| 购物车数量 | 30 秒 | invalidateQueries + 聚焦刷新 |
:::

---

### 题目 8：全局状态应该放什么？

**考察点**：全局状态设计原则。

**题目**：
哪些状态适合放到全局 Store？哪些不适合？请举例说明。

::: details 查看答案与解析
**参考答案**：

#### 适合放到全局 Store 的状态

| 类型 | 例子 | 理由 |
|------|------|------|
| 跨页面共享的用户信息 | 当前登录用户、权限角色 | 几乎所有页面都需要 |
| 全局主题/语言 | 暗黑模式、国际化语言 | 影响整个应用 |
| 全局通知 | Toast、Modal、全局消息 | 需要在任意组件触发 |
| 权限控制 | 功能开关、菜单权限 | 多处路由和组件使用 |
| 不频繁变化的全局配置 | 站点配置、AB 实验配置 | 多处使用，变化少 |

#### 不适合放到全局 Store 的状态

| 类型 | 例子 | 理由 |
|------|------|------|
| 局部表单输入 | 登录表单的用户名密码 | 只在当前组件使用 |
| 服务端状态 | 商品列表、订单详情 | 应使用 React Query/SWR |
| 临时 UI 状态 | 当前展开的菜单、hover 状态 | 只在局部生效 |
| 可以从 URL 获取的状态 | 当前页码、筛选条件 | 应放在 URL 中 |
| 高频变化的状态 | 实时计数器、鼠标位置 | 全局 Store 会导致大量重渲染 |

#### 决策流程

```
这个状态会被多个页面/组件使用吗？
  ├─ 否 → 使用 useState/useReducer（本地状态）
  └─ 是 → 变化频率高吗？
           ├─ 是 → 使用细粒度状态管理（Jotai/Recoil）
           └─ 否 → 来自服务端吗？
                    ├─ 是 → 使用 TanStack Query/SWR
                    └─ 否 → 使用全局 Store（Zustand/Redux）
```

#### 示例

```tsx
// ✅ 适合全局 Store：用户信息
const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// ❌ 不适合全局 Store：局部表单状态
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // ...
}
```
:::

---

## 深入题

### 题目 9：多标签页状态同步

**考察点**：数据一致性与跨窗口通信。

**题目**：
用户在浏览器标签页 A 修改了个人资料，标签页 B 如何感知并更新？请给出方案。

::: details 查看答案与解析
**参考答案**：

#### 方案一：Broadcast Channel API（推荐）

Broadcast Channel 允许同源的不同标签页、窗口、iframe 之间通信。

```tsx
import { useEffect } from 'react';

const channel = new BroadcastChannel('user-profile');

function useProfileSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'PROFILE_UPDATED') {
        // 让相关查询失效，触发重新获取
        queryClient.invalidateQueries({ queryKey: ['user', event.data.userId] });
      }
    };

    channel.addEventListener('message', handleMessage);
    return () => channel.removeEventListener('message', handleMessage);
  }, [queryClient]);

  const notifyProfileUpdate = (userId: string) => {
    channel.postMessage({ type: 'PROFILE_UPDATED', userId });
  };

  return { notifyProfileUpdate };
}
```

#### 方案二：监听 visibilitychange + focus 事件

当页面重新获得焦点时，自动刷新数据。

```tsx
function useRefetchOnFocus(queryKey: string[]) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleFocus = () => {
      queryClient.refetchQueries({ queryKey });
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        handleFocus();
      }
    });

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [queryClient, queryKey]);
}
```

#### 方案三：Service Worker 推送

- Service Worker 可以监听服务器推送或后台同步。
- 当数据变化时，Service Worker 可以向所有标签页广播消息。
- 适合需要服务器主动通知的场景。

#### 方案四：WebSocket / SSE

- 建立长连接，服务器主动推送状态变更。
- 适合实时性要求高的场景，如聊天、协作编辑。

#### 方案对比

| 方案 | 实时性 | 复杂度 | 适用场景 |
|------|--------|--------|----------|
| Broadcast Channel | 高 | 低 | 同源标签页间状态同步 |
| visibilitychange + focus | 中 | 低 | 页面重新可见时刷新 |
| Service Worker | 高 | 中 | 需要服务器推送的场景 |
| WebSocket/SSE | 最高 | 高 | 实时协作、高频变更 |

#### 最佳实践

- 简单场景：Broadcast Channel + focus 刷新。
- 实时场景：WebSocket/SSE + 本地状态更新。
- 配合 TanStack Query：`invalidateQueries` 或 `setQueryData` 实现自动同步。
:::

---

### 题目 10：离线优先应用设计

**考察点**：离线同步与冲突解决。

**题目**：
设计一个支持离线编辑的笔记应用。用户离线时可以新增、修改、删除笔记，重新联网后如何同步？请说明数据结构和同步策略。

::: details 查看答案与解析
**参考答案**：

#### 1. 数据结构设计

```typescript
interface Note {
  id: string;              // 本地生成的 UUID
  content: string;
  createdAt: number;       // 创建时间戳
  updatedAt: number;       // 最后更新时间戳
  version: number;         // 版本号，用于冲突检测
  synced: boolean;         // 是否已同步到服务端
  deleted: boolean;        // 软删除标记
}

interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  noteId: string;
  payload?: Partial<Note>;
  timestamp: number;
  retryCount: number;
}
```

#### 2. 本地存储

使用 IndexedDB 存储笔记和操作队列：

```typescript
// 使用 idb 或 dexie.js 简化 IndexedDB 操作
import { openDB } from 'idb';

const db = await openDB('notes-db', 1, {
  upgrade(db) {
    db.createObjectStore('notes', { keyPath: 'id' });
    db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
  },
});
```

#### 3. 离线操作流程

**新增笔记**

```typescript
async function createNote(content: string) {
  const note: Note = {
    id: crypto.randomUUID(),
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1,
    synced: false,
    deleted: false,
  };

  await db.put('notes', note);
  await db.add('syncQueue', {
    type: 'create',
    noteId: note.id,
    payload: note,
    timestamp: Date.now(),
    retryCount: 0,
  });
}
```

**修改笔记**

```typescript
async function updateNote(id: string, content: string) {
  const note = await db.get('notes', id);
  if (!note) return;

  note.content = content;
  note.updatedAt = Date.now();
  note.version += 1;
  note.synced = false;

  await db.put('notes', note);
  await db.add('syncQueue', {
    type: 'update',
    noteId: id,
    payload: { content, updatedAt: note.updatedAt, version: note.version },
    timestamp: Date.now(),
    retryCount: 0,
  });
}
```

**删除笔记**

```typescript
async function deleteNote(id: string) {
  const note = await db.get('notes', id);
  if (!note) return;

  note.deleted = true;
  note.updatedAt = Date.now();
  note.synced = false;

  await db.put('notes', note);
  await db.add('syncQueue', {
    type: 'delete',
    noteId: id,
    timestamp: Date.now(),
    retryCount: 0,
  });
}
```

#### 4. 同步策略

```typescript
async function syncNotes() {
  if (!navigator.onLine) return;

  const queue = await db.getAll('syncQueue');
  queue.sort((a, b) => a.timestamp - b.timestamp);

  for (const operation of queue) {
    try {
      await syncOperation(operation);
      await db.delete('syncQueue', operation.id);
    } catch (err) {
      operation.retryCount += 1;
      if (operation.retryCount > 3) {
        // 移动到失败队列，等待人工处理
        await db.add('failedQueue', operation);
        await db.delete('syncQueue', operation.id);
      } else {
        await db.put('syncQueue', operation);
      }
    }
  }

  // 拉取服务端最新数据
  await pullFromServer();
}
```

#### 5. 冲突解决策略

| 情况 | 处理方式 |
|------|----------|
| 本地版本 > 服务端版本 | 本地覆盖服务端 |
| 服务端版本 > 本地版本 | 服务端覆盖本地，提示用户 |
| 同时修改且无法自动合并 | 提示用户手动选择保留哪个版本 |
| 本地删除，服务端修改 | 根据业务决定：优先删除或保留 |
| 本地修改，服务端删除 | 提示用户是否恢复 |

```typescript
function resolveConflict(localNote: Note, serverNote: Note): Note {
  if (localNote.version > serverNote.version) {
    return localNote; // 本地更新，以本地为准
  }
  if (serverNote.version > localNote.version) {
    return serverNote; // 服务端更新，拉取服务端
  }
  // 版本相同但内容不同，需要手动合并
  return { ...localNote, conflict: true };
}
```

#### 6. 网络状态监听

```typescript
useEffect(() => {
  const handleOnline = () => syncNotes();
  window.addEventListener('online', handleOnline);
  return () => window.removeEventListener('online', handleOnline);
}, []);
```

#### 7. 设计要点

- **本地优先**：所有操作先在本地完成，保证离线可用。
- **操作队列**：记录所有未同步操作，按顺序执行。
- **版本号/时间戳**：用于冲突检测和解决。
- **软删除**：避免误删，支持恢复。
- **幂等性**：同步接口需要幂等，防止重复操作。
- **最终一致性**：接受短暂不一致，最终与服务端同步。
:::

---

### 题目 11：设计一个大型应用的数据层

**考察点**：数据架构设计能力。

**题目**：
一个大型 SaaS 应用有用户系统、项目管理、团队协作、实时通知四个模块。请设计整个应用的数据层架构，包括：
1. 状态分类和管理工具选择。
2. 服务端状态缓存策略。
3. 模块间数据共享方式。
4. 实时数据同步方案。

::: details 查看答案与解析
**参考答案**：

#### 1. 状态分类和管理工具选择

```
┌─────────────────────────────────────────────────────────┐
│                       数据层架构                         │
├─────────────────┬───────────────────────────────────────┤
│   状态类型       │   管理工具                             │
├─────────────────┼───────────────────────────────────────┤
│ 本地 UI 状态     │ useState / useReducer                  │
│ 全局共享状态     │ Zustand                                │
│ 服务端状态       │ TanStack Query                         │
│ URL 状态         │ React Router / Next.js Router          │
│ 表单状态         │ React Hook Form                        │
│ 实时状态         │ WebSocket / SSE + 本地状态             │
└─────────────────┴───────────────────────────────────────┘
```

**具体说明**

- **本地 UI 状态**：弹窗、加载状态、当前选中项等，使用 `useState`/`useReducer`。
- **全局共享状态**：用户信息、主题、权限、全局通知，使用 Zustand。
- **服务端状态**：用户资料、项目列表、任务详情、团队成员，使用 TanStack Query。
- **URL 状态**：项目筛选、任务看板视图、页码，使用路由参数。
- **表单状态**：项目创建表单、任务编辑表单，使用 React Hook Form。
- **实时状态**：通知、协作光标、在线状态，使用 WebSocket/SSE。

#### 2. 服务端状态缓存策略

| 数据类型 | staleTime | 缓存策略 |
|----------|-----------|----------|
| 用户信息 | 30 分钟 | Mutation 后 setQueryData |
| 项目列表 | 5 分钟 | invalidateQueries 后刷新 |
| 项目详情 | 10 分钟 | 进入页面时刷新 |
| 任务列表 | 2 分钟 | 操作后 invalidateQueries |
| 团队成员 | 15 分钟 | 变更时 invalidateQueries |
| 实时通知 | 不缓存 | WebSocket 推送 |
| 报表数据 | 1 小时 | 手动刷新 |

```tsx
// 示例：项目详情查询
const { data: project } = useQuery({
  queryKey: ['project', projectId],
  queryFn: () => fetchProject(projectId),
  staleTime: 10 * 60 * 1000,
});
```

#### 3. 模块间数据共享方式

```
┌─────────────────────────────────────────┐
│            全局状态层（Zustand）          │
│  · 当前用户信息                          │
│  · 当前选中项目                          │
│  · 主题/语言                             │
│  · 全局通知                              │
└─────────────────────────────────────────┘
                     │
   ┌─────────────────┼─────────────────┐
   ▼                 ▼                 ▼
┌────────┐      ┌────────┐      ┌────────┐
│ 用户模块 │      │ 项目模块 │      │ 协作模块 │
│        │      │        │      │        │
│ useUser│      │useProject│     │useTeam │
└────────┘      └────────┘      └────────┘
   │                 │                 │
   └─────────────────┼─────────────────┘
                     ▼
          ┌─────────────────────┐
          │  TanStack Query 缓存  │
          │  · 共享服务端数据      │
          └─────────────────────┘
```

**共享方式**

1. **Zustand 共享全局状态**：用户登录后，将用户信息放入全局 Store，所有模块共享。
2. **TanStack Query 共享服务端数据**：相同 `queryKey` 的数据在不同模块间自动共享。
3. **事件总线处理跨模块事件**：如用户切换项目时，通知任务模块刷新。

```tsx
// 全局 Store
const useAppStore = create((set) => ({
  currentProjectId: null,
  setCurrentProjectId: (id) => set({ currentProjectId: id }),
}));

// 项目模块和任务模块共享 currentProjectId
const currentProjectId = useAppStore((state) => state.currentProjectId);

// 任务模块根据 currentProjectId 自动查询
const { data: tasks } = useQuery({
  queryKey: ['tasks', currentProjectId],
  queryFn: () => fetchTasks(currentProjectId),
  enabled: !!currentProjectId,
});
```

#### 4. 实时数据同步方案

```
┌─────────────┐
│   客户端 A   │
└──────┬──────┘
       │ WebSocket
       ▼
┌─────────────┐     ┌─────────────┐
│  消息队列    │────▶│  服务端      │
│  Redis Pub/Sub│     │  WebSocket  │
└─────────────┘     └──────┬──────┘
                           │ WebSocket
                           ▼
                    ┌─────────────┐
                    │   客户端 B   │
                    └─────────────┘
```

**实时数据类型与方案**

| 数据类型 | 方案 | 说明 |
|----------|------|------|
| 系统通知 | WebSocket / SSE | 服务端主动推送 |
| 协作编辑 | WebSocket + OT/CRDT | 实时同步编辑状态 |
| 在线状态 | WebSocket heartbeat | 用户在线/离线状态 |
| 任务变更 | WebSocket 通知 + TanStack Query refetch | 收到通知后刷新数据 |

```tsx
// 实时通知处理
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com/notifications');

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case 'TASK_UPDATED':
        queryClient.invalidateQueries({ queryKey: ['tasks', message.projectId] });
        break;
      case 'PROJECT_MEMBER_ADDED':
        queryClient.invalidateQueries({ queryKey: ['members', message.projectId] });
        break;
      case 'NOTIFICATION':
        showToast(message.content);
        break;
    }
  };

  return () => ws.close();
}, [queryClient]);
```

#### 5. 数据层设计原则

1. **单一数据源**：服务端状态由 TanStack Query 统一管理，避免多处维护。
2. **按需共享**：只把真正需要全局共享的状态放入 Store。
3. **缓存一致性**：明确每种数据的缓存策略和失效时机。
4. **实时与缓存结合**：实时消息用于触发缓存刷新，而不是完全替代缓存。
5. **离线友好**：关键操作支持本地队列和重试。
:::

---

> **领域编号**：A05 数据与状态管理  
> **最后更新**：2026-06-18
