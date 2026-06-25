# Vue 练习册

> 本练习册基于《Vue 学习文档》编写，涵盖响应式原理、虚拟 DOM、Composition API、Vue Router、Pinia、性能优化等核心知识点。难度由浅入深，每题均附答案与解析。

---

## 一、选择题（每题 4 分，共 24 分）

### 第 1 题

Vue 3 的响应式系统基于以下哪个 ES6 特性实现？

A. `Object.defineProperty`  
B. `Proxy`  
C. `Reflect`  
D. `Map`  

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：B**

**解析：** Vue 3 使用 `Proxy` 实现响应式，可以代理整个对象，监听新增、删除属性以及数组索引和长度变化。Vue 2 则使用 `Object.defineProperty`。
</details>
:::

---

### 第 2 题

在 Vue 3 的 `<script setup>` 中，以下哪个 API 用于定义响应式基本类型数据？

A. `reactive`  
B. `ref`  
C. `computed`  
D. `watch`  

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：B**

**解析：** `ref` 用于基本类型和需要重新赋值的场景，访问时需要通过 `.value`（模板中会自动解包）。`reactive` 用于对象类型，`computed` 用于计算属性，`watch` 用于监听变化。
</details>
:::

---

### 第 3 题

Vue Router 的 History 模式相比 Hash 模式，主要区别是什么？

A. History 模式兼容性更好  
B. History 模式 URL 更美观，但需要服务器配置支持  
C. Hash 模式支持 HTML5 History API  
D. 两者都需要后端配合  

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：B**

**解析：** Hash 模式使用 URL hash（`#`），hash 变化不会发送给服务器，兼容性好，无需后端配置。History 模式使用 HTML5 History API，URL 更美观，但刷新或直接访问深层路由时，需要服务器配置回退到 `index.html`，否则会出现 404。
</details>
:::

---

### 第 4 题

以下关于 `v-for` 中 `key` 的说法，正确的是？

A. `key` 可以使用数组索引，永远不会有问题  
B. `key` 应该是稳定且唯一的标识，帮助 Vue 复用节点  
C. `key` 只在列表渲染时需要，其他场景不需要  
D. `key` 会作为真实 DOM 的 id 属性  

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：B**

**解析：** `key` 是 Vue Diff 算法识别节点的依据，应使用稳定且唯一的业务标识。数组索引在列表顺序变化时会导致错误复用。`key` 不会作为 DOM 属性渲染，仅用于内部 Diff。
</details>
:::

---

### 第 5 题

在 Pinia 中，以下哪个选项用于定义基于状态的派生值？

A. `state`  
B. `getters`  
C. `actions`  
D. `mutations`  

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：B**

**解析：** Pinia 中 `state` 定义状态，`getters` 定义计算属性/派生值，`actions` 定义方法（可包含异步操作）。Pinia 不再有 `mutations`，状态修改直接在 actions 中进行。
</details>
:::

---

### 第 6 题

Vue 3 中，`watch` 和 `watchEffect` 的主要区别是？

A. `watch` 是同步的，`watchEffect` 是异步的  
B. `watch` 需要显式指定依赖，`watchEffect` 自动追踪依赖  
C. `watch` 只能监听 ref，`watchEffect` 只能监听 reactive  
D. 两者没有区别  

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：B**

**解析：** `watch` 显式声明监听源，回调接收新旧值；`watchEffect` 自动追踪回调中用到的响应式依赖，适合多个数据源的副作用场景。
</details>
:::

---

## 二、填空题（每空 2 分，共 20 分）

### 第 7 题

Vue 2 中，给对象新增属性需要使用 ______ 方法，才能让该属性成为响应式。

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：`Vue.set`（或 `this.$set`）**

**解析：** Vue 2 使用 `Object.defineProperty` 实现响应式，无法监听对象新增属性。`Vue.set` 可以手动将新增属性转换为响应式。Vue 3 使用 `Proxy` 后没有此限制。
</details>
:::

---

### 第 8 题

Vue 3 的模板编译器会识别模板中的静态节点，并在首次渲染后复用，这一优化称为 ______。

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：静态节点提升（Static Node Hoisting）**

**解析：** Vue 3 编译器会标记静态节点并在首次渲染后复用，减少 Diff 过程中的比较开销，提升更新性能。
</details>
:::

---

### 第 9 题

在 `<script setup>` 中，使用 `ref(0)` 创建的响应式数据，在 JavaScript 中访问其值需要写 ______。

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：`.value`**

**解析：** `ref` 返回一个包装对象，在脚本中通过 `.value` 访问和修改值；在模板中 Vue 会自动解包，无需写 `.value`。
</details>
:::

---

### 第 10 题

Vue 3 中，使用 ______ 函数可以创建异步组件，实现组件懒加载。

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：`defineAsyncComponent`**

**解析：** `defineAsyncComponent` 用于定义异步组件，配合 `import()` 可实现组件懒加载，减少首屏加载体积。
</details>
:::

---

### 第 11 题

Vue 的 ______ 组件可以把子节点渲染到 DOM 的其他位置，常用于模态框。

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：`Teleport`**

**解析：** `Teleport` 类似于 React 的 Portals，可以把组件内容渲染到指定 DOM 节点，例如 `document.body`，避免被父级样式限制。
</details>
:::

---

### 第 12 题

Vue 插件是一个对象或函数，必须暴露 ______ 方法。

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：`install`**

**解析：** 插件需要实现 `install(app, options)` 方法，在其中可以注册全局组件、指令、挂载全局属性或使用 `app.provide` 提供数据。
</details>
:::

---

### 第 13 题

对于不需要响应式的大型数据，可以使用 ______ 或 `Object.freeze` 避免响应式转换开销。

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：`markRaw`**

**解析：** `markRaw` 可以标记一个对象，使其永远不会被转换为响应式对象，适用于大型原始数据、第三方类实例等场景。
</details>
:::

---

### 第 14 题

Vue 的 ______ 组件可以缓存动态组件的状态，避免组件切换时被销毁。

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：`<keep-alive>`**

**解析：** `<keep-alive>` 包裹动态组件后，组件切换时不会被卸载，而是被缓存，保留组件状态，常用于标签页、表单等场景。
</details>
:::

---

## 三、代码分析题（每题 8 分，共 32 分）

### 第 15 题

指出以下代码的问题并修正。

```vue
<script setup>
import { reactive } from 'vue';

const state = reactive({ count: 0 });

function reset() {
  state = { count: 0 };
}
</script>
```

<details>
<summary>答案与解析</summary>

**问题：** `reactive` 声明的对象不能整体重新赋值，否则会丢失响应式。`state = { count: 0 }` 实际上是给 `const state` 重新赋值，会报错（const 不可重新赋值），即使使用 `let` 也会丢失响应式。

**修正方案：**

1. 直接修改对象的属性：

```javascript
function reset() {
  state.count = 0;
}
```

2. 或改用 `ref`：

```vue
<script setup>
import { ref } from 'vue';
const state = ref({ count: 0 });
function reset() {
  state.value = { count: 0 };
}
</script>
```
</details>

---

### 第 16 题

分析以下 `watch` 用法是否正确，并说明原因。

```vue
<script setup>
import { reactive, watch } from 'vue';

const user = reactive({ name: 'Tom', age: 20 });

watch(user, (newVal, oldVal) => {
  console.log('user changed', newVal, oldVal);
});
</script>
```

<details>
<summary>答案与解析</summary>

::: details 查看答案与解析
**答案：** 写法基本正确，但 `newVal` 和 `oldVal` 指向同一对象。

**解析：** 监听 `reactive` 对象时，默认是深度监听。由于 `newVal` 和 `oldVal` 都是同一个响应式对象的引用，所以它们的值看起来相同。如果需要监听单个属性，应使用 getter 函数：

```javascript
watch(() => user.name, (newName, oldName) => {
  console.log(newName, oldName);
});
```
</details>
:::

---

### 第 17 题

以下路由守卫代码有什么问题？如何改进？

```javascript
router.beforeEach((to, from, next) => {
  if (to.path === '/admin' && !isLoggedIn()) {
    next('/login');
  }
  next();
});
```

<details>
<summary>答案与解析</summary>

**问题：** 未登录访问 `/admin` 时，会同时调用 `next('/login')` 和 `next()`，导致多次导航。

**修正：** 在需要拦截的分支中调用 `next('/login')` 后直接 `return`，或添加 `else` 分支：

```javascript
router.beforeEach((to, from, next) => {
  if (to.path === '/admin' && !isLoggedIn()) {
    return next('/login');
  }
  next();
});
```

Vue Router 4 也支持直接返回路径字符串或对象：

```javascript
router.beforeEach((to) => {
  if (to.path === '/admin' && !isLoggedIn()) {
    return '/login';
  }
});
```
</details>

---

### 第 18 题

分析以下插槽代码的作用，并说明 `#header` 是什么语法糖。

```vue
<template>
  <BaseLayout>
    <template #header>
      <h1>标题</h1>
    </template>
    <p>正文内容</p>
  </BaseLayout>
</template>
```

<details>
<summary>答案与解析</summary>

**作用：** 向 `BaseLayout` 组件的 `header` 具名插槽传递内容，`p` 标签内容会进入默认插槽。

**语法糖：** `#header` 是 `v-slot:header` 的简写形式。

等效写法：

```vue
<BaseLayout>
  <template v-slot:header>
    <h1>标题</h1>
  </template>
  <p>正文内容</p>
</BaseLayout>
```
</details>

---

## 四、编程实践题（每题 12 分，共 24 分）

### 第 19 题

使用 Composition API 实现一个计数器组件，包含 `count`、`double` 计算属性、增加/减少方法，并在 `onMounted` 时打印 "mounted"。

<details>
<summary>答案与解析</summary>

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const double = computed(() => count.value * 2);

function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}

onMounted(() => {
  console.log('mounted');
});
</script>

<template>
  <div>
    <p>Count: &#123;&#123; count &#125;&#125;</p>
    <p>Double: &#123;&#123; double &#125;&#125;</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
```

::: details 查看答案与解析
**解析：**

- `ref` 创建响应式基本类型数据。
- `computed` 创建只读计算属性，自动缓存。
- `<script setup>` 简化代码，方法可直接在模板中使用。
- `onMounted` 对应 Options API 中的 `mounted` 生命周期。
</details>
:::

---

### 第 20 题

编写一个组合式函数 `useMouse`，返回鼠标在页面中的坐标 `x` 和 `y`，并在组件卸载时自动移除事件监听。

<details>
<summary>答案与解析</summary>

```javascript
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  function update(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });

  return { x, y };
}
```

```vue
<script setup>
import { useMouse } from './composables/useMouse';
const { x, y } = useMouse();
</script>

<template>
  <p>Mouse: &#123;&#123; x &#125;&#125;, &#123;&#123; y &#125;&#125;</p>
</template>
```

::: details 查看答案与解析
**解析：**

- 组合式函数以 `use` 开头命名，封装可复用逻辑。
- 使用 `ref` 创建响应式坐标。
- 在 `onMounted` 中注册事件监听，在 `onUnmounted` 中清理，避免内存泄漏。
- 组合式函数可以在多个组件中复用，是 Composition API 的核心优势之一。
</details>
:::

---

## 参考答案速查表

| 题号 | 题型 | 答案 |
|------|------|------|
| 1 | 选择题 | B |
| 2 | 选择题 | B |
| 3 | 选择题 | B |
| 4 | 选择题 | B |
| 5 | 选择题 | B |
| 6 | 选择题 | B |
| 7 | 填空题 | `Vue.set` / `this.$set` |
| 8 | 填空题 | 静态节点提升 |
| 9 | 填空题 | `.value` |
| 10 | 填空题 | `defineAsyncComponent` |
| 11 | 填空题 | `Teleport` |
| 12 | 填空题 | `install` |
| 13 | 填空题 | `markRaw` |
| 14 | 填空题 | `<keep-alive>` |
| 15 | 代码分析 | 不要整体替换 reactive 对象 |
| 16 | 代码分析 | reactive 监听时 newVal/oldVal 同引用 |
| 17 | 代码分析 | 守卫中避免重复调用 next |
| 18 | 代码分析 | `#header` 是 `v-slot:header` 简写 |
| 19 | 编程实践 | Composition API 计数器 |
| 20 | 编程实践 | `useMouse` 组合式函数 |

---

### 第 21 题

使用 Vue 3.4 的 `defineModel` 实现一个自定义输入组件 `MyInput`，支持 `v-model`。

::: details 查看答案与解析
**参考答案**：

```vue
<!-- MyInput.vue -->
<script setup>
const modelValue = defineModel();
</script>

<template>
  <input v-model="modelValue" />
</template>
```

父组件：

```vue
<script setup>
import { ref } from "vue";
import MyInput from "./MyInput.vue";

const text = ref("");
</script>

<template>
  <MyInput v-model="text" />
  <p>&#123;&#123; text &#125;&#125;</p>
</template>
```

**解析**：
- `defineModel` 是 Vue 3.4 引入的编译器宏，简化了 `v-model` 的实现。
- 不再需要手动声明 props 和 emits。
- 支持多个 `v-model`，如 `defineModel("title")`。
:::

---

### 第 22 题

使用 Vue Router Data Loaders 写一个 `useUserData` loader，根据路由参数 `id` 获取用户数据。

::: details 查看答案与解析
**参考答案**：

```js
// loaders.js
import { defineLoader } from "vue-router";

export const useUserData = defineLoader(async (route) => {
  const res = await fetch(`/api/users/${route.params.id}`);
  if (!res.ok) throw new Error("获取用户失败");
  return res.json();
});
```

```vue
<!-- UserDetail.vue -->
<script setup>
import { useUserData } from "./loaders";

const { data, error, isLoading } = useUserData();
</script>

<template>
  <div v-if="isLoading">加载中...</div>
  <div v-else-if="error">错误：&#123;&#123; error.message &#125;&#125;</div>
  <div v-else>&#123;&#123; data.name &#125;&#125;</div>
</template>
```

**解析**：
- `defineLoader` 定义路由级数据加载逻辑。
- `useUserData` 在组件中返回 `data`、`error`、`isLoading` 等状态。
- 适合路由进入时必须加载的数据场景。
:::

---

> **领域编号**：E07 Vue  
> **最后更新**：2026-06-24
