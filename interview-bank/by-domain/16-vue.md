# Vue 面试题

> 本题库共收录 **96** 道面试题（基础 23 / 进阶 25 / 深入 25 / 架构 23）。
> 本文件收录 Vue 相关面试题，目标题量 200 道。
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

### FB-16-CO-B-001：Vue 2 和 Vue 3 有哪些核心区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、Vue 2、Vue 3、Composition API、Proxy
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 Vue 2 和 Vue 3 的核心区别，至少说出 4 个方面的差异。

**参考答案**：

| 维度 | Vue 2 | Vue 3 |
|------|-------|-------|
| 响应式系统 | Object.defineProperty | Proxy + Reflect |
| 核心 API | Options API | Options API + Composition API |
| 模板根节点 | 只能有一个根节点 | 支持多根节点（Fragment） |
| 生命周期 | beforeDestroy / destroyed | beforeUnmount / unmounted |
| 自定义事件 | 需要 $emit 声明 | 无需声明，直接使用 |
| 全局 API | Vue.use / Vue.component | createApp，避免污染全局 |
| 性能 | 无静态提升 | 静态提升、PatchFlag、事件缓存 |
| TypeScript | 支持一般 | 源码用 TS 重写，类型支持更好 |
| 新特性 | 无 Teleport/Suspense | 支持 Teleport、Suspense、Composition API |

选型建议：
- 新项目优先选择 Vue 3。
- 存量 Vue 2 项目可按官方迁移指南逐步升级，或使用 @vue/compat 兼容模式。

**评分维度**：
- 能说出响应式系统差异（30%）
- 能说出 Options API 和 Composition API 差异（25%）
- 能说出生命周期、Fragment、全局 API 等至少 2 个差异（25%）
- 能给出选型建议（20%）

**常见错误**：
- 认为 Vue 3 完全不能使用 Options API。
- 认为 Vue 3 的响应式只是 Proxy 的简单替换，忽略 Reflect、深度代理等细节。
- 混淆 Vue 2 和 Vue 3 的生命周期名称。

**延伸追问**：
- Vue 3 为什么要用 Proxy 替代 Object.defineProperty？
- Vue 3 的 createApp 解决了什么问题？

**相关题目**：
- [FB-16-CO-B-002 Options API 与 Composition API](#FB-16-CO-B-002)
- [FB-16-FS-P-017 Vue 3 响应式原理](#FB-16-FS-P-017)

**参考资源**：
- [Vue 3 官方文档 - 迁移指南](https://v3-migration.vuejs.org/)
- [Vue 3 官方文档 - 组合式 API](https://vuejs.org/guide/extras/composition-api-faq.html)

**口头回答版**：
> Vue 3 和 Vue 2 最大的区别：一是响应式系统从 Object.defineProperty 换成了 Proxy；二是新增了 Composition API，可以更好地组织逻辑；三是模板支持多根节点；四是生命周期钩子名字变了，比如 beforeDestroy 改成 beforeUnmount；五是全局 API 改成 createApp，避免污染全局。新项目我一般都直接上 Vue 3。

---

### FB-16-CO-B-002：Options API 和 Composition API 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、Options API、Composition API、script setup
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 中 Options API 和 Composition API 的区别，以及各自的适用场景。

**参考答案**：

| 维度 | Options API | Composition API |
|------|-------------|-----------------|
| 代码组织 | 按选项（data、methods、computed）组织 | 按功能/逻辑组织 |
| 复用逻辑 | 通过 mixin，容易产生命名冲突和来源不明 | 通过 Composable / Custom Hook，来源清晰 |
| TypeScript 支持 | 类型推导较弱 | 类型推导更好 |
| 学习曲线 | 对新手更直观 | 需要理解响应式 API |
|  tree-shaking | 较差 | 更好 |

Options API 示例：

```vue
<script>
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};
</script>
```

Composition API 示例：

```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
</script>
```

适用场景：
- **Options API**：简单组件、小型项目、团队刚接触 Vue。
- **Composition API**：复杂组件、逻辑复用、大型项目、需要强 TS 支持。

两者可以共存，Vue 3 同时支持。

**评分维度**：
- 能说明两种 API 的代码组织方式差异（40%）
- 能说明逻辑复用方式差异（30%）
- 能给出适用场景（30%）

**常见错误**：
- 认为 Composition API 完全替代 Options API。
- 在 `script setup` 中错误地使用 `this`。
- 把 Composition API 和 Options API 混用导致混乱。

**延伸追问**：
- Composition API 如何解决 mixin 的命名冲突问题？
- `script setup` 和 setup() 函数有什么区别？

**相关题目**：
- [FB-16-CO-B-001 Vue 2 与 Vue 3 区别](#FB-16-CO-B-001)
- [FB-16-CD-A-014 手写一个 Vue Composable](#FB-16-CD-A-014)

**参考资源**：
- [Vue 官方文档 - Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 官方文档 - script setup](https://vuejs.org/api/sfc-script-setup.html)

**口头回答版**：
> Options API 是按 data、methods、computed 这些选项来组织代码，适合简单组件和小项目；Composition API 是按功能逻辑组织，逻辑复用通过 Composable，不容易像 mixin 那样冲突，TypeScript 支持也更好。Vue 3 推荐用 Composition API，但 Options API 仍然可以用。`script setup` 是 Composition API 的语法糖，写起来更简洁。

---

### FB-16-CO-B-003：v-model 的原理是什么？常见的修饰符有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：16 Vue
**标签**：Vue、v-model、双向绑定、修饰符、表单
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Vue 中 `v-model` 的原理，并列举常见修饰符及其作用。

**参考答案**：

`v-model` 是 Vue 提供的语法糖，用于在表单元素和组件上实现双向绑定。

在原生 input 上：

```html
<input v-model="message" />
<!-- 等价于 -->
<input :value="message" @input="message = $event.target.value" />
```

在自定义组件上：

```html
<MyInput v-model="message" />
<!-- 等价于 -->
<MyInput :modelValue="message" @update:modelValue="message = $event" />
```

Vue 3 支持多个 v-model：

```html
<MyComp v-model:title="pageTitle" v-model:content="pageContent" />
```

常见修饰符：

| 修饰符 | 作用 |
|--------|------|
| `.lazy` | 失去焦点或回车后才同步，使用 change 事件 |
| `.number` | 自动将输入转为数字 |
| `.trim` | 自动去除首尾空格 |

自定义修饰符（Vue 3）：

```vue
<MyComp v-model.capitalize="text" />
```

组件内部通过 `modelModifiers` 获取修饰符。

**评分维度**：
- 能说明 v-model 是语法糖（30%）
- 能写出原生和组件上的等价形式（30%）
- 能列举常见修饰符（30%）
- 能提到自定义修饰符（10%）

**常见错误**：
- 认为 v-model 只能用于 input。
- 在 Vue 3 组件中仍然使用 `value` + `input` 而不是 `modelValue` + `update:modelValue`。
- 修饰符混用顺序错误。

**延伸追问**：
- 如何在自定义组件中实现 v-model 的多个绑定？
- v-model 和 .sync 修饰符有什么关系？

**相关题目**：
- [FB-16-CO-B-008 受控组件在 Vue 中如何实现](#FB-16-CO-B-008)
- [FB-16-CO-A-015 Vue 插槽](#FB-16-CO-A-015)

**参考资源**：
- [Vue 官方文档 - v-model](https://vuejs.org/guide/components/v-model.html)
- [Vue 官方文档 - Form Input Bindings](https://vuejs.org/guide/essentials/forms.html)

**口头回答版**：
> v-model 本质上是语法糖。在原生 input 上，它等价于 `:value` 加 `@input`；在自定义组件上，Vue 3 等价于 `:modelValue` 加 `@update:modelValue`。常见修饰符有 `.lazy` 失焦再同步、`.number` 转数字、`.trim` 去空格。Vue 3 还支持多个 v-model 和自定义修饰符。

---

### FB-16-CO-B-004：v-if 和 v-show 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：16 Vue
**标签**：Vue、v-if、v-show、条件渲染、DOM
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `v-if` 和 `v-show` 的区别，以及各自的使用场景。

**参考答案**：

| 维度 | v-if | v-show |
|------|------|--------|
| 渲染机制 | 条件为 false 时不渲染，DOM 不存在 | 始终渲染，通过 `display: none` 切换 |
| 切换开销 | 高（需要销毁/重建组件） | 低（只是 CSS 切换） |
| 初始渲染开销 | 低（条件不满足不渲染） | 高（即使隐藏也渲染） |
| 适用场景 | 条件很少变化 | 需要频繁切换显示/隐藏 |
| 与 v-for 优先级 | v-if 优先级低于 v-for（Vue 2）/ v-if 优先级高于 v-for（Vue 3） | 不涉及 |

最佳实践：
- 频繁切换用 `v-show`。
- 条件很少变化或初始不需要渲染用 `v-if`。
- 避免在同一元素上同时使用 `v-if` 和 `v-for`（Vue 3 不推荐）。

**评分维度**：
- 能说明渲染机制差异（40%）
- 能说明切换和初始渲染开销差异（30%）
- 能给出使用场景（30%）

**常见错误**：
- 认为 v-show 会销毁组件状态。
- 在需要条件渲染时滥用 v-show，导致不必要的 DOM 初始化。
- 混淆 Vue 2 和 Vue 3 中 v-if 与 v-for 的优先级。

**延伸追问**：
- v-if 和 v-show 对组件生命周期有什么影响？
- Vue 3 为什么调整 v-if 和 v-for 的优先级？

**相关题目**：
- [FB-16-CO-B-005 v-for 与 key](#FB-16-CO-B-005)
- [FB-16-CO-A-012 Vue 生命周期](#FB-16-CO-A-012)

**参考资源**：
- [Vue 官方文档 - v-if vs v-show](https://vuejs.org/guide/essentials/conditional.html#v-if-vs-v-show)

**口头回答版**：
> v-if 是条件不满足就不渲染，DOM 直接没有，切换时组件会销毁重建；v-show 是一直渲染，只是通过 display none 隐藏。所以频繁切换用 v-show，条件很少变或者初始不想渲染用 v-if。

---

### FB-16-CO-B-005：v-for 中的 key 有什么作用？为什么不推荐用 index？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：16 Vue
**标签**：Vue、v-for、key、Diff、列表渲染
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Vue 中 `v-for` 的 `key` 的作用，并说明为什么不推荐用数组 `index` 作为 key。

**参考答案**：

`key` 是 Vue 虚拟 DOM diff 算法中用于识别节点的唯一标识。它的作用是：

- 帮助 Vue 判断列表中的节点是新增、删除、移动还是复用。
- 保持组件状态与数据项的正确对应关系。
- 提高列表更新效率，避免不必要的 DOM 操作。

不推荐用 `index` 作为 key 的原因：

1. **无法稳定标识元素**：当列表发生排序、插入、删除时，元素的 index 会变化。
2. **组件状态错位**：如果列表项包含表单状态、动画状态等，使用 index 会导致状态被错误复用。
3. **性能下降**：Vue 可能无法正确复用 DOM，导致不必要的创建和销毁。

示例：

```vue
<!-- 推荐 -->
<li v-for="item in list" :key="item.id">&#123;&#123; item.name &#125;&#125;</li>

<!-- 不推荐 -->
<li v-for="(item, index) in list" :key="index">&#123;&#123; item.name &#125;&#125;</li>
```

最佳实践：
- 使用数据中稳定且唯一的字段，如数据库主键、UUID。
- 如果列表是静态且不会变化，短期可用 index，但不推荐。

**评分维度**：
- 能说明 key 在 diff 中的作用（40%）
- 能解释 index 作为 key 的问题（40%）
- 能给出使用稳定 ID 的建议（20%）

**常见错误**：
- 认为 key 只是为了消除控制台警告。
- 使用随机数作为 key。
- 在列表项内部通过 key 读取状态。

**延伸追问**：
- key 是否会影响组件的过渡动画？
- Vue 的 key 和 React 的 key 有什么不同？

**相关题目**：
- [FB-16-CO-B-004 v-if 与 v-show](#FB-16-CO-B-004)
- [FB-16-FS-P-018 Vue Diff 算法](#FB-16-FS-P-018)

**参考资源**：
- [Vue 官方文档 - Maintaining State with key](https://vuejs.org/guide/essentials/list.html#maintain-state-with-key)

**口头回答版**：
> key 是 Vue 用来识别列表里每个节点身份的，帮助判断谁是新增、删除、移动还是复用。用 index 当 key，列表排序、插入、删除时 index 会变，Vue 会误判，可能导致状态错位、性能变差。所以要用数据里稳定的 id。

---

### FB-16-CO-B-006：computed、methods 和 watch 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、computed、methods、watch、响应式
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 中 `computed`、`methods` 和 `watch` 的区别和使用场景。

**参考答案**：

| 维度 | computed | methods | watch |
|------|----------|---------|-------|
| 用途 | 基于响应式数据派生计算值 | 定义函数，处理事件或逻辑 | 监听数据变化并执行副作用 |
| 缓存 | 有缓存，依赖不变不重新计算 | 无缓存，每次调用都执行 | 无缓存，变化时执行 |
| 返回值 | 有 | 可有可无 | 无 |
| 使用场景 | 计算属性、过滤排序 | 事件处理、异步操作 | 数据变化后的异步或复杂逻辑 |
| 书写位置 | computed 选项 / computed() | methods 选项 / 普通函数 | watch 选项 / watch() |

computed 示例：

```vue
<script setup>
import { ref, computed } from 'vue';
const firstName = ref('Foo');
const lastName = ref('Bar');
const fullName = computed(() => firstName.value + ' ' + lastName.value);
</script>
```

watch 示例：

```vue
<script setup>
import { ref, watch } from 'vue';
const search = ref('');
watch(search, (newVal, oldVal) => {
  fetchData(newVal);
});
</script>
```

最佳实践：
- 派生数据优先用 `computed`。
- 事件处理和普通函数用 `methods` 或普通函数。
- 监听数据变化执行副作用用 `watch`。

**评分维度**：
- 能说明三者的核心区别（50%）
- 能说明 computed 的缓存特性（20%）
- 能给出使用场景示例（30%）

**常见错误**：
- 在 computed 中执行异步或有副作用的操作。
- 在 methods 中做本可以用 computed 的派生计算。
- watch 中直接修改被监听的值导致无限循环。

**延伸追问**：
- computed 的 setter 什么时候用？
- watch 的 deep 和 immediate 有什么区别？

**相关题目**：
- [FB-16-CO-A-009 Vue 3 响应式 API](#FB-16-CO-A-009)
- [FB-16-CO-A-010 watch 与 watchEffect](#FB-16-CO-A-010)

**参考资源**：
- [Vue 官方文档 - Computed Properties](https://vuejs.org/guide/essentials/computed.html)
- [Vue 官方文档 - Watchers](https://vuejs.org/guide/essentials/watchers.html)

**口头回答版**：
> computed 是有缓存的计算属性，依赖没变就不会重新计算，适合派生数据；methods 是函数，每次调用都执行，适合事件处理；watch 是监听数据变化然后做副作用，比如发请求。派生数据优先用 computed，别在 computed 里写异步。

---

### FB-16-CO-B-007：Vue 组件间通信有哪些方式？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、组件通信、props、emit、provide、inject、event bus
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举 Vue 中常用的组件间通信方式，并说明各自的适用场景。

**参考答案**：

Vue 组件间通信方式：

1. **Props / Emits**：
   - 父子组件通信。
   - 父传子用 props，子传父用 `$emit`。

2. **Parent / Children refs**：
   - 通过 `ref` 直接访问子组件实例或父组件实例。
   - 适合临时调用方法，不推荐频繁使用。

3. **Provide / Inject**：
   - 跨层级祖先向后代传递数据。
   - 适合主题、全局配置等低频数据。

4. **Event Bus（Vue 3 不推荐）**：
   - 使用一个空的 Vue 实例作为事件中心。
   - Vue 3 中建议用 mitt 等库替代。

5. **全局状态管理**：
   - Vuex / Pinia。
   - 适合复杂的全局状态共享。

6. **Slot（插槽）**：
   - 父组件向子组件传递内容或作用域数据。

7. **$attrs / $listeners（Vue 2） / v-bind="$attrs"（Vue 3）**：
   - 透传未声明的 props 和事件。

适用场景总结：

| 场景 | 推荐方式 |
|------|---------|
| 父子通信 | props / emit |
| 跨层级少量数据 | provide / inject |
| 复杂全局状态 | Pinia / Vuex |
| 内容分发 | slot |
| 临时方法调用 | ref |

**评分维度**：
- 能列举至少 5 种通信方式（40%）
- 能说明每种方式的适用场景（40%）
- 能指出 Vue 3 不再推荐 Event Bus（20%）

**常见错误**：
- 所有通信都使用全局状态管理。
- 滥用 provide/inject 导致数据流向不清晰。
- 子组件直接修改 props。

**延伸追问**：
- provide/inject 是响应式的吗？
- 如何实现兄弟组件通信？

**相关题目**：
- [FB-16-CO-A-011 provide 和 inject](#FB-16-CO-A-011)
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-031)

**参考资源**：
- [Vue 官方文档 - Component Events](https://vuejs.org/guide/components/events.html)
- [Vue 官方文档 - Provide / Inject](https://vuejs.org/guide/components/provide-inject.html)

**口头回答版**：
> Vue 组件通信常见有几种：父子之间 props 向下传、emit 向上传；跨层级用 provide/inject；全局状态用 Pinia 或 Vuex；内容分发用 slot；临时调方法用 ref。Vue 3 不推荐 Event Bus，可以用 mitt 替代。我一般先 props 和 emit，太复杂再考虑状态管理。

---

### FB-16-CO-B-008：Vue 中如何实现受控组件？

**题型**：概念题 / 手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：16 Vue
**标签**：Vue、受控组件、v-model、表单、组件封装
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明在 Vue 中如何实现一个受控组件，并写一个自定义 Input 组件的示例。

**参考答案**：

受控组件指组件的值由父组件通过 props 控制，并通过事件通知父组件更新。

自定义 Input 组件：

```vue
<!-- BaseInput.vue -->
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
```

父组件使用：

```vue
<template>
  <BaseInput v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
const text = ref('');
</script>
```

如果不使用 v-model，也可以显式使用 props 和 emits：

```vue
<BaseInput :modelValue="text" @update:modelValue="text = $event" />
```

关键点：
- 子组件不直接修改 props。
- 通过事件通知父组件更新。
- Vue 3 默认使用 `modelValue` / `update:modelValue`。

**评分维度**：
- 能写出 props + emits 的受控组件（50%）
- 能说明 v-model 等价写法（30%）
- 能指出子组件不修改 props（20%）

**常见错误**：
- 子组件直接修改 props。
- 在 Vue 3 中仍然使用 `value` / `input`。
- 忘记 `defineEmits`。

**延伸追问**：
- 如何给自定义组件的 v-model 添加修饰符？
- 自定义组件如何支持多个 v-model？

**相关题目**：
- [FB-16-CO-B-003 v-model 原理](#FB-16-CO-B-003)
- [FB-16-CO-A-015 Vue 插槽](#FB-16-CO-A-015)

**参考资源**：
- [Vue 官方文档 - Component v-model](https://vuejs.org/guide/components/v-model.html)

**口头回答版**：
> Vue 里实现受控组件就是子组件接收 props 显示值，用户输入时通过 emit 通知父组件改值。Vue 3 自定义组件的 v-model 默认用 modelValue 和 update:modelValue。比如一个 BaseInput，input 的 value 绑定 modelValue，input 事件 emit update:modelValue。子组件一定不要直接改 props。


---

## 进阶题（9 道）{#advanced}

### FB-16-CO-A-009：Vue 3 的响应式 API 有哪些？ref 和 reactive 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue 3、ref、reactive、响应式、computed、watch
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 Vue 3 中常用的响应式 API，并重点对比 `ref` 和 `reactive` 的区别、使用场景和注意事项。

**参考答案**：

Vue 3 常用响应式 API：

- `ref`：接收任意类型，返回一个响应式对象，值保存在 `.value` 上。
- `reactive`：只接受对象类型，返回一个响应式代理对象。
- `computed`：创建计算属性。
- `watch` / `watchEffect`：监听响应式数据变化。
- `toRef` / `toRefs`：从 reactive 对象中提取响应式引用。
- `shallowRef` / `shallowReactive`：浅层响应式。

ref vs reactive：

| 维度 | ref | reactive |
|------|-----|----------|
| 数据类型 | 任意类型（基本类型、对象、数组） | 只接受对象类型 |
| 访问方式 | `.value` | 直接访问属性 |
| 替换整个对象 | 可以直接替换 `obj.value = newObj` | 不能替换整个对象（会失去响应式） |
| 解构/赋值 | 需用 `toRefs` 保持响应式 | 解构会丢失响应式 |
| 使用场景 | 基本类型、需要替换整体的对象 | 复杂对象、表单数据 |

示例：

```vue
<script setup>
import { ref, reactive } from 'vue';

const count = ref(0);
console.log(count.value); // 0

const user = reactive({ name: 'Tom', age: 20 });
console.log(user.name); // Tom
</script>
```

注意事项：
- `reactive` 不能代理基本类型。
- `reactive` 对象直接赋值会替换引用，导致响应式丢失。
- 解构 `reactive` 对象会丢失响应式，应使用 `toRefs`。

**评分维度**：
- 能列举常用响应式 API（30%）
- 能清晰对比 ref 和 reactive（40%）
- 能说出使用注意事项（30%）

**常见错误**：
- 对 `ref` 对象忘记 `.value`。
- 用 `reactive` 包裹基本类型。
- 直接解构 `reactive` 对象后丢失响应式。

**延伸追问**：
- ref 包裹对象时，内部是不是也是用 reactive？
- 什么时候应该用 shallowRef 而不是 ref？

**相关题目**：
- [FB-16-CO-B-006 computed、methods、watch](#FB-16-CO-B-006)
- [FB-16-FS-P-017 Vue 3 响应式原理](#FB-16-FS-P-017)

**参考资源**：
- [Vue 官方文档 - Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue 官方文档 - ref vs reactive](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref-vs-reactive)

**口头回答版**：
> Vue 3 常用响应式 API 有 ref、reactive、computed、watch、watchEffect、toRefs 等。ref 可以包任何类型，访问要 .value，适合基本类型和需要替换整个对象的场景；reactive 只接受对象，访问直接点属性，适合复杂对象。注意 reactive 不能替换整个对象，解构也会丢失响应式，要用 toRefs。

---

### FB-16-CO-A-010：watch 和 watchEffect 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue 3、watch、watchEffect、响应式、副作用
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 3 中 `watch` 和 `watchEffect` 的区别，以及各自的使用场景。

**参考答案**：

| 维度 | watch | watchEffect |
|------|-------|-------------|
| 监听源 | 显式指定要监听的数据源 | 自动追踪回调中用到的响应式数据 |
| 旧值 | 可获取 oldValue | 无法获取旧值 |
| 立即执行 | 默认不执行，可设置 immediate | 默认立即执行 |
| 使用场景 | 精确监听某个数据的变化 | 依赖关系复杂或无需精确控制时 |
| 返回值 | 停止监听函数 | 停止监听函数 |

watch 示例：

```vue
<script setup>
import { ref, watch } from 'vue';
const count = ref(0);
watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
</script>
```

watchEffect 示例：

```vue
<script setup>
import { ref, watchEffect } from 'vue';
const count = ref(0);
const name = ref('Tom');
watchEffect(() => {
  console.log(count.value, name.value);
});
</script>
```

最佳实践：
- 需要精确控制监听源、获取旧值时用 `watch`。
- 依赖较多或依赖动态变化时用 `watchEffect`。
- 两者都应在组件卸载时自动停止，也可手动调用返回的 stop 函数。

**评分维度**：
- 能说明 watch 显式指定监听源（30%）
- 能说明 watchEffect 自动追踪依赖（30%）
- 能对比旧值、immediate 等差异（20%）
- 能给出使用场景（20%）

**常见错误**：
- 用 watchEffect 监听对象属性时，访问深度属性导致依赖追踪不完整。
- 在 watch 中直接修改被监听的值导致循环触发。
- 忘记 watch 监听 ref 对象时需要 `.value` 或 getter 函数。

**延伸追问**：
- watch 监听 reactive 对象的某个属性应该怎么写？
- watchEffect 和 React 的 useEffect 有什么异同？

**相关题目**：
- [FB-16-CO-A-009 ref 和 reactive](#FB-16-CO-A-009)
- [FB-16-CO-A-012 Vue 生命周期](#FB-16-CO-A-012)

**参考资源**：
- [Vue 官方文档 - Watchers](https://vuejs.org/guide/essentials/watchers.html)
- [Vue 官方文档 - watchEffect](https://vuejs.org/api/reactivity-core.html#watcheffect)

**口头回答版**：
> watch 是显式指定监听哪个响应式数据，能拿到新旧值，默认不立即执行；watchEffect 是自动追踪回调里用到的响应式数据，会立即执行，但拿不到旧值。需要精确控制时用 watch，依赖复杂或者懒得列依赖时用 watchEffect。

---

### FB-16-CO-A-011：provide 和 inject 是什么？有什么注意事项？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue、provide、inject、跨层级通信、响应式
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Vue 中 `provide` 和 `inject` 的作用，并说明使用时的注意事项。

**参考答案**：

`provide` / `inject` 用于跨层级组件通信：祖先组件通过 `provide` 提供数据，后代组件通过 `inject` 注入使用，无需逐层传递 props。

基本用法：

```vue
<!-- Ancestor.vue -->
<script setup>
import { provide, ref } from 'vue';
const theme = ref('dark');
provide('theme', theme);
</script>
```

```vue
<!-- Descendant.vue -->
<script setup>
import { inject } from 'vue';
const theme = inject('theme', 'light');
</script>
```

注意事项：

1. **响应式**：
   - provide 基本类型时，inject 得到的不是响应式引用。
   - 应 provide ref / reactive，或对象包装。

2. **避免滥用**：
   - 只用于主题、语言、全局配置等低频数据。
   - 不要把所有状态都通过 provide/inject 传递。

3. **类型安全**：
   - Vue 3 支持 `InjectionKey`，配合 TypeScript 使用更安全。

4. **数据流向**：
   - 仍然是单向数据流，后代不应直接修改注入的数据。

示例（推荐）：

```vue
<script setup>
import { provide, readonly, ref } from 'vue';
const count = ref(0);
provide('count', readonly(count));
const increment = () => count.value++;
provide('increment', increment);
</script>
```

**评分维度**：
- 能说明 provide/inject 解决跨层级通信（40%）
- 能说明响应式注意事项（30%）
- 能提到 readonly、InjectionKey 等最佳实践（30%）

**常见错误**：
- provide 基本类型后期望 inject 是响应式的。
- 通过 provide/inject 传递大量高频变化状态。
- 后代直接修改注入的数据。

**延伸追问**：
- provide/inject 和 Context API 有什么异同？
- 如何确保 provide 的数据不会被后代修改？

**相关题目**：
- [FB-16-CO-B-007 组件通信方式](#FB-16-CO-B-007)
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-031)

**参考资源**：
- [Vue 官方文档 - Provide / Inject](https://vuejs.org/guide/components/provide-inject.html)

**口头回答版**：
> provide 和 inject 是 Vue 用来做跨层级组件通信的，祖先 provide 数据，后代 inject 使用，不用一层层传 props。要注意的是，provide 基本类型的话 inject 拿到的不是响应式的，最好 provide ref 或 reactive，或者用 readonly 包起来防止后代直接改。适合主题、语言这类低频全局数据。

---

### FB-16-CO-A-012：Vue 3 的生命周期钩子有哪些？Composition API 中如何使用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue 3、生命周期、Composition API、onMounted、onUnmounted
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列出 Vue 3 的生命周期钩子，并说明 Options API 和 Composition API 中生命周期的对应关系。

**参考答案**：

Vue 3 生命周期钩子（Options API）：

- `beforeCreate` / `created`
- `beforeMount` / `mounted`
- `beforeUpdate` / `updated`
- `beforeUnmount` / `unmounted`（Vue 3 名称，Vue 2 是 beforeDestroy / destroyed）
- `errorCaptured`
- `renderTracked` / `renderTriggered`（调试使用）

Composition API 对应：

| Options API | Composition API |
|-------------|-----------------|
| beforeCreate / created | setup() 本身 |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeUnmount | onBeforeUnmount |
| unmounted | onUnmounted |
| errorCaptured | onErrorCaptured |
| renderTracked | onRenderTracked |
| renderTriggered | onRenderTriggered |

示例：

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  console.log('mounted');
});

onUnmounted(() => {
  console.log('unmounted');
});
</script>
```

注意：
- `setup` 执行时机相当于 `beforeCreate` 和 `created` 之间。
- 在 `setup` 中不应再使用 `beforeCreate` 和 `created`。

**评分维度**：
- 能列出主要生命周期钩子（40%）
- 能正确映射 Options API 和 Composition API（40%）
- 能说明 setup 执行时机（20%）

**常见错误**：
- 在 Composition API 中使用 Vue 2 的 beforeDestroy。
- 在 setup 中写 beforeCreate / created。
- 混淆 onMounted 和 mounted 的调用方式。

**延伸追问**：
- onMounted 里可以访问 DOM 吗？
- 多个 onMounted 会按什么顺序执行？

**相关题目**：
- [FB-16-CO-A-013 Vue 3 nextTick](#FB-16-CO-A-013)
- [FB-16-FS-P-019 Vue 3 编译优化](#FB-16-FS-P-019)

**参考资源**：
- [Vue 官方文档 - Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
- [Vue 官方文档 - Composition API Lifecycle Hooks](https://vuejs.org/api/composition-api-lifecycle.html)

**口头回答版**：
> Vue 3 生命周期主要分创建、挂载、更新、卸载四个阶段。Options API 用 beforeCreate、created、mounted、beforeUnmount 这些；Composition API 用 onMounted、onUnmounted 等，前面加 on。setup 函数本身相当于 beforeCreate 和 created 之间，所以 Composition API 里不需要 beforeCreate 和 created。

---

### FB-16-CO-A-013：Vue 的 nextTick 是什么？什么时候需要使用？

**题型**：概念题 / 代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue、nextTick、异步更新、DOM、微任务
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Vue 中 `nextTick` 的作用和原理，并说明常见的使用场景。

**参考答案**：

Vue 对响应式数据的更新是异步的，会缓冲同一事件循环中的所有数据变化，在下一轮事件循环中统一更新 DOM。`nextTick` 用于在 DOM 更新完成后执行回调。

原理：

- Vue 使用一个异步队列（queue）缓存 watcher。
- 同一事件循环中的多次数据变更只触发一次 DOM 更新。
- `nextTick` 把回调放到 DOM 更新之后执行，底层使用 Promise / MutationObserver / setTimeout 降级。

使用场景：

1. 修改数据后立即获取更新后的 DOM：

```vue
<script setup>
import { ref, nextTick } from 'vue';
const msg = ref('hello');
const divRef = ref(null);

async function update() {
  msg.value = 'world';
  await nextTick();
  console.log(divRef.value.textContent); // world
}
</script>
```

2. 在测试或某些第三方库集成时确保 DOM 已更新。

最佳实践：
- 尽量避免依赖 nextTick，优先使用响应式数据驱动 UI。
- 必须使用时应使用 async/await 形式，避免回调嵌套。

**评分维度**：
- 能说明 nextTick 在 DOM 更新后执行（40%）
- 能解释 Vue 异步更新队列（30%）
- 能给出使用场景（30%）

**常见错误**：
- 认为修改数据后 DOM 会立即更新。
- 滥用 nextTick 处理普通逻辑。
- 在 Vue 2 中使用回调，Vue 3 中忘记它返回 Promise。

**延伸追问**：
- nextTick 和 setTimeout(fn, 0) 有什么区别？
- Vue 3 的 nextTick 内部是怎么实现的？

**相关题目**：
- [FB-16-FS-P-017 Vue 3 响应式原理](#FB-16-FS-P-017)
- [FB-16-CO-A-012 Vue 生命周期](#FB-16-CO-A-012)

**参考资源**：
- [Vue 官方文档 - nextTick](https://vuejs.org/api/general.html#nexttick)

**口头回答版**：
> Vue 更新 DOM 是异步的，同一事件循环里的多次数据变化会合并成一次更新。nextTick 就是让你在 DOM 更新完之后执行回调。比如改了 msg 之后立刻想拿到新的 DOM 内容，就要 await nextTick()。底层用 Promise 或 MutationObserver，不支持再降级到 setTimeout。

---

### FB-16-CO-A-014：Vue 中的 KeepAlive 是什么？如何使用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue、KeepAlive、缓存、生命周期、组件状态
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Vue 中 `KeepAlive` 组件的作用、使用方式，以及它对生命周期的影响。

**参考答案**：

`KeepAlive` 用于缓存动态组件或路由组件，避免组件在切换时被销毁和重建，从而保留组件状态和提升性能。

基本用法：

```vue
<KeepAlive>
  <component :is="currentTab" />
</KeepAlive>
```

配合路由：

```vue
<KeepAlive>
  <RouterView />
</KeepAlive>
```

条件缓存：

```vue
<KeepAlive :include="['TabA', 'TabB']" :exclude="['TabC']" :max="10">
  <component :is="currentTab" />
</KeepAlive>
```

对生命周期的影响：

- 被缓存的组件不会被真正销毁，而是触发 `deactivated` 钩子。
- 重新激活时触发 `activated` 钩子，而不是重新执行 `mounted`。
- Composition API 中使用 `onActivated` / `onDeactivated`。

适用场景：
- Tab 切换保留表单状态。
- 路由页面缓存，避免重复请求数据。

注意事项：
- 缓存过多组件会占用内存，可设置 `:max` 限制数量。
- 被缓存组件内部如果有定时器或订阅，需要在 `deactivated` / `unmounted` 中清理。

**评分维度**：
- 能说明 KeepAlive 缓存组件状态的作用（40%）
- 能写出基本用法（30%）
- 能说明 activated / deactivated 生命周期（30%）

**常见错误**：
- 认为 KeepAlive 会缓存所有组件状态，忽略 include/exclude。
- 在缓存组件中不清理副作用导致内存泄漏。
- 混淆 activated 和 mounted。

**延伸追问**：
- 如何实现路由级别的条件缓存？
- KeepAlive 的缓存策略是什么（LRU）？

**相关题目**：
- [FB-16-CO-A-012 Vue 生命周期](#FB-16-CO-A-012)
- [FB-16-CO-A-015 Vue Router](#FB-16-CO-A-015)

**参考资源**：
- [Vue 官方文档 - KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)

**口头回答版**：
> KeepAlive 就是缓存组件，切换时不去销毁重建，保留状态。常用于 Tab 切换或者路由页面缓存。被缓存的组件不会走 mounted，而是走 activated 和 deactivated。可以用 include、exclude 控制缓存哪些组件，max 限制缓存数量防止内存占用过大。

---

### FB-16-CO-A-015：Vue Router v4 有哪些核心变化？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue Router、Vue 3、路由、导航守卫、history
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Vue Router v4 相比 v3 的核心变化，并说明 `createRouter`、`history`、`useRouter`、`useRoute` 的用法。

**参考答案**：

Vue Router v4 是 Vue 3 的官方路由库，主要变化：

| 特性 | Vue Router 3 | Vue Router 4 |
|------|--------------|--------------|
| 初始化 | `new VueRouter({...})` | `createRouter({...})` |
| 历史模式 | `mode: 'history'` | `history: createWebHistory()` |
| 组合式 API | 无 | `useRouter()` / `useRoute()` |
| 全局导航守卫 | `router.beforeEach` 相同 | 相同，但需手动注册 |
| 路由匹配 | `*` 通配符 | 使用 `path: '/:pathMatch(.*)*'` |
| 动态添加路由 | `router.addRoutes` | `router.addRoute` |

基本用法：

```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: () => import('./About.vue') },
    { path: '/user/:id', component: User },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
});

export default router;
```

组合式 API 中使用：

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

function goToUser(id) {
  router.push(`/user/${id}`);
}
</script>
```

导航守卫：

```js
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLogin()) {
    next('/login');
  } else {
    next();
  }
});
```

**评分维度**：
- 能列出 v3 到 v4 的核心变化（40%）
- 能写出 createRouter 和 history 用法（30%）
- 能说明 useRouter / useRoute 和导航守卫（30%）

**常见错误**：
- 在 Vue 3 中仍然使用 `new VueRouter`。
- 通配符路由仍然写成 `*`。
- 在 setup 中使用 `this.$route`。

**延伸追问**：
- Vue Router 4 的导航解析流程是怎样的？
- 如何实现路由懒加载和预加载？

**相关题目**：
- [FB-16-CO-A-014 KeepAlive](#FB-16-CO-A-014)
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-031)

**参考资源**：
- [Vue Router 4 官方文档](https://router.vuejs.org/)
- [Vue Router 4 迁移指南](https://router.vuejs.org/guide/migration/)

**口头回答版**：
> Vue Router 4 配合 Vue 3 用 createRouter 创建，history 模式改成 createWebHistory，不再用 mode。新增了 useRouter 和 useRoute 这两个组合式 API 钩子。通配符路由写法变了，要写成 `/:pathMatch(.*)*`。导航守卫还是 beforeEach、afterEach 这些，只是初始化方式不同。

---

### FB-16-CO-A-016：Vuex 和 Pinia 有什么区别？新项目该选哪个？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vuex、Pinia、状态管理、Vue 3、Store
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Vuex 和 Pinia 的设计差异，并说明在新项目中如何选择。

**参考答案**：

Vuex 和 Pinia 都是 Vue 生态的状态管理库。

| 维度 | Vuex 4 | Pinia |
|------|--------|-------|
| 官方推荐 | Vue 2 时代主流 | Vue 3 官方推荐 |
| API 风格 | mutations、actions、getters、modules | actions、getters，无 mutations |
| TypeScript 支持 | 类型支持较弱 | 原生 TS 支持，类型推导好 |
| 代码量 | 较繁琐 | 更简洁 |
| 模块化 | 需要 namespaced | 自动模块化 |
| Devtools | 支持 | 支持更好 |
| 体积 | 较大 | 更轻量 |
| Vue 2 支持 | 原生支持 | 通过 Pinia 2.x 支持 |

Pinia 示例：

```js
// stores/counter.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  return { count, double, increment };
});
```

Vuex 示例：

```js
const store = createStore({
  state: { count: 0 },
  mutations: {
    increment(state) { state.count++; }
  },
  actions: {
    incrementAsync({ commit }) { setTimeout(() => commit('increment'), 1000); }
  }
});
```

选型建议：
- **Vue 3 新项目**：优先选择 Pinia。
- **Vue 2 老项目**：继续使用 Vuex，迁移成本较低。
- **超大型项目、需要严格数据流**：Vuex 的 mutations 更容易追踪变化，但 Pinia 也能配合 devtools 满足大部分需求。

**评分维度**：
- 能对比 Vuex 和 Pinia 的核心差异（40%）
- 能写出 Pinia 或 Vuex 基本用法（30%）
- 能给出选型建议（30%）

**常见错误**：
- 在 Pinia 中仍然写 mutations。
- 认为 Vuex 不能在 Vue 3 中使用。
- 小型项目也引入 Pinia，增加复杂度。

**延伸追问**：
- Pinia 如何实现模块化？
- Vuex 的 mutations 和 actions 有什么本质区别？

**相关题目**：
- [FB-16-CO-A-011 provide/inject](#FB-16-CO-A-011)
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-031)

**参考资源**：
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vuex 官方文档](https://vuex.vuejs.org/)

**口头回答版**：
> Vuex 是 Vue 2 时代主流状态管理，有 state、mutations、actions、getters，代码相对繁琐。Pinia 是 Vue 3 官方推荐的，更轻量，API 更简洁，没有 mutations，TypeScript 支持也更好。新项目我优先选 Pinia，老项目 Vue 2 可以先用 Vuex，有机会再迁移。

---

### FB-16-CO-A-017：Vue 中的插槽（Slot）有哪些类型？如何使用作用域插槽？

**题型**：概念题 / 手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue、Slot、插槽、作用域插槽、组件复用
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Vue 中插槽的类型，并写出作用域插槽的使用示例。

**参考答案**：

Vue 插槽分为三种：

1. **默认插槽**：

```vue
<!-- Child.vue -->
<template>
  <div>
    <slot>默认内容</slot>
  </div>
</template>

<!-- Parent.vue -->
<Child>这是传入的内容</Child>
```

2. **具名插槽**：

```vue
<!-- Child.vue -->
<template>
  <header><slot name="header" /></header>
  <main><slot /></main>
</template>

<!-- Parent.vue -->
<Child>
  <template #header>标题</template>
  <template #default>主体内容</template>
</Child>
```

3. **作用域插槽**：

子组件向父组件暴露数据，父组件通过插槽 prop 接收。

```vue
<!-- Child.vue -->
<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <slot :item="item" :index="index">&#123;&#123; item.name &#125;&#125;</slot>
    </li>
  </ul>
</template>

<script setup>
const list = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
</script>
```

```vue
<!-- Parent.vue -->
<Child v-slot="{ item, index }">
  &#123;&#123; index + 1 &#125;&#125;. &#123;&#123; item.name &#125;&#125;
</Child>
```

最佳实践：
- 使用 `#slotName` 简写替代 `v-slot:slotName`。
- 作用域插槽适合封装可复用列表、表格组件。
- 默认插槽和具名插槽可同时使用。

**评分维度**：
- 能说明三种插槽类型（40%）
- 能写出作用域插槽示例（40%）
- 能提到 # 简写（20%）

**常见错误**：
- 混淆 `v-slot` 和 `slot` 属性（Vue 2 遗留语法）。
- 作用域插槽数据传递方向搞反。
- 在插槽内容中直接修改子组件状态。

**延伸追问**：
- 作用域插槽和 render props 有什么异同？
- 如何封装一个支持自定义列的 Table 组件？

**相关题目**：
- [FB-16-CO-B-008 受控组件](#FB-16-CO-B-008)
- [FB-16-SD-R-027 Vue 组件库设计](#FB-16-SD-R-031)

**参考资源**：
- [Vue 官方文档 - Slots](https://vuejs.org/guide/components/slots.html)

**口头回答版**：
> Vue 插槽分三种：默认插槽、具名插槽、作用域插槽。默认插槽就是不指定名字；具名插槽用 name，父组件用 v-slot:name 或 #name；作用域插槽是子组件通过 slot 属性把数据传给父组件，父组件在插槽里接收。比如封装一个列表组件，把 item 和 index 传出来，父组件自己决定怎么渲染每一项。


---

## 深入题（8 道）{#proficient}

### FB-16-FS-P-018：Vue 3 的响应式原理是什么？为什么用 Proxy 替代 Object.defineProperty？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue 3、响应式原理、Proxy、Reflect、依赖收集
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请详细说明 Vue 3 的响应式原理，并解释为什么用 Proxy 替代 Vue 2 的 Object.defineProperty。

**参考答案**：

Vue 3 的响应式系统基于 `Proxy` + `Reflect` + `WeakMap` + `Map` + `Set` 实现，主要包括三个部分：

1. **响应式数据（reactive/ref）**：
   - `reactive` 使用 `new Proxy(target, handler)` 代理对象。
   - `ref` 对基本类型包装成对象，内部也使用 reactive 代理对象值。

2. **依赖收集（track）**：
   - 在 `get` 陷阱中，将当前活动的 effect 收集到依赖集合（dep）中。
   - 使用 `targetMap`，按 `target -> key -> dep` 的层级组织依赖。

3. **触发更新（trigger）**：
   - 在 `set` / `deleteProperty` 陷阱中，找到对应的 dep 并执行所有 effect。

核心代码简化：

```js
const targetMap = new WeakMap();
let activeEffect = null;

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let dep = depsMap.get(key);
  if (!dep) depsMap.set(key, (dep = new Set()));
  dep.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) dep.forEach(effect => effect());
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) trigger(target, key);
      return result;
    }
  });
}
```

为什么用 Proxy 替代 Object.defineProperty：

| 能力 | Object.defineProperty | Proxy |
|------|----------------------|-------|
| 监听属性新增 | ❌ 需要 Vue.set / Vue.delete | ✅ 自动监听 |
| 监听属性删除 | ❌ 需要 Vue.delete | ✅ 自动监听 |
| 监听数组索引 | ❌ 需要重写数组方法 | ✅ 直接代理 |
| 监听 Map/Set/WeakMap | ❌ 不支持 | ✅ Vue 3 支持 |
| 嵌套对象 | 递归定义属性，初始化慢 | 懒代理，访问时才代理 |
| 性能 | 对象初始化成本高 | 更优 |

**评分维度**：
- 能说明 track / trigger / dep 的关系（30%）
- 能说明 WeakMap + Map + Set 的依赖存储结构（20%）
- 能对比 Proxy 和 Object.defineProperty 的能力差异（30%）
- 能提到 Reflect 的作用（20%）

**常见错误**：
- 认为 Proxy 会代理对象内部不可枚举属性有问题（Proxy 会）。
- 忽略 Reflect 保证 this 指向正确。
- 认为 Vue 3 完全不使用递归代理。

**延伸追问**：
- ref 为什么需要 .value？
- Vue 3 如何处理数组的 push、pop 等方法？

**相关题目**：
- [FB-16-CO-A-009 ref 和 reactive](#FB-16-CO-A-009)
- [FB-16-CO-P-020 Vue 响应式常见坑](#FB-16-CO-P-020)

**参考资源**：
- [Vue 官方文档 - Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Vue 3 源码 - reactivity 包](https://github.com/vuejs/core/tree/main/packages/reactivity)

**口头回答版**：
> Vue 3 响应式靠 Proxy 加 Reflect 实现。读取属性时通过 track 收集依赖，把当前 effect 存到 WeakMap -> Map -> Set 的结构里；修改属性时通过 trigger 找到依赖并触发更新。用 Proxy 替代 Object.defineProperty 是因为它能自动监听新增、删除属性，数组索引变化，也支持 Map/Set，而且懒代理性能更好。

---

### FB-16-FS-P-019：Vue 3 的编译器做了哪些优化？PatchFlag 和静态提升是什么？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue 3、编译器、PatchFlag、静态提升、Block Tree
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 Vue 3 模板编译器的主要优化手段，重点解释 PatchFlag、静态提升和 Block Tree。

**参考答案**：

Vue 3 编译器将模板编译为渲染函数时，会进行多项优化，使得运行时 diff 更高效。

1. **静态提升（Static Hoisting）**：
   - 模板中不会变化的静态节点会被提升到渲染函数外部，每次渲染直接复用。
   - 多个连续静态节点会合并为静态树，减少创建开销。

2. **PatchFlag**：
   - 编译时为动态节点打上标记，说明该节点哪些部分可能变化。
   - 运行时只对比 PatchFlag 标记的部分，跳过静态内容。

   常见 PatchFlag：

   | 标记 | 含义 |
   |------|------|
   | `TEXT` | 动态文本 |
   | `CLASS` | 动态 class |
   | `STYLE` | 动态 style |
   | `PROPS` | 动态 props |
   | `FULL_PROPS` | 动态 key 或需要全量 diff |
   | `HYDRATE_EVENTS` | SSR 水合事件 |
   | `STABLE_FRAGMENT` | 子节点顺序不变的 Fragment |

3. **Block Tree**：
   - 编译时识别包含动态节点的 block，收集所有动态子节点到一个数组。
   - diff 时直接遍历动态子节点，跳过静态节点。

4. **事件缓存**：
   - 内联事件处理函数会被缓存，避免子组件不必要的重新渲染。

编译示例：

```vue
<template>
  <div>
    <h1>Static Title</h1>
    <p>&#123;&#123; message &#125;&#125;</p>
    <button @click="onClick">Click</button>
  </div>
</template>
```

编译后：

```js
const _hoisted_1 = /*#__PURE__*/_createElementVNode("h1", null, "Static Title", -1 /* HOISTED */);

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", null, [
    _hoisted_1,
    _createElementVNode("p", null, _toDisplayString(_ctx.message), 1 /* TEXT */),
    _createElementVNode("button", {
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    }, "Click")
  ]));
}
```

**评分维度**：
- 能说明静态提升减少重复创建（25%）
- 能说明 PatchFlag 让运行时只 diff 动态部分（35%）
- 能说明 Block Tree 收集动态子节点（25%）
- 能提到事件缓存（15%）

**常见错误**：
- 认为 Vue 3 每次渲染都全量 diff。
- 认为静态提升只是提取静态文本。
- 不清楚 PatchFlag 是编译时生成而非运行时计算。

**延伸追问**：
- PatchFlag 对 v-if / v-for 有什么影响？
- 手写模板和 JSX 在 Vue 3 中编译结果有什么不同？

**相关题目**：
- [FB-16-FS-P-018 Vue 3 响应式原理](#FB-16-FS-P-018)
- [FB-16-FS-P-021 Vue Diff 算法](#FB-16-FS-P-021)

**参考资源**：
- [Vue 官方文档 - Rendering Mechanism](https://vuejs.org/guide/extras/rendering-mechanism.html)
- [Vue 3 编译优化分析](https://vuejs.org/guide/extras/rendering-mechanism.html#compiler-informed-virtual-dom)

**口头回答版**：
> Vue 3 编译器会做几项优化：静态提升把不变的节点提出去复用；PatchFlag 给动态节点打标记，运行时只对比标记的部分；Block Tree 把动态子节点收集起来，diff 时直接遍历它们，跳过静态节点。这样比 Vue 2 全量对比快很多。事件处理函数也会被缓存，避免子组件因为函数引用变了而重复渲染。

---

### FB-16-FS-P-020：Vue 中常见的响应式“坑”有哪些？如何避免？

**题型**：框架原理题 / 代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue、响应式、reactive、ref、数组、对象、坑
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举 Vue 中常见的响应式使用“坑”，并说明原因和解决方案。

**参考答案**：

常见响应式坑：

1. **Vue 2 中直接给对象新增属性**：
   - 原因：Object.defineProperty 无法监听新增属性。
   - 解决：使用 `Vue.set(obj, key, value)`。

2. **Vue 2 中直接删除对象属性**：
   - 原因：无法监听属性删除。
   - 解决：使用 `Vue.delete(obj, key)`。

3. **Vue 2 中通过索引修改数组**：
   - 原因：Object.defineProperty 无法监听数组索引变化。
   - 解决：使用 `arr.splice(index, 1, value)` 或 `Vue.set(arr, index, value)`。

4. **Vue 3 中 reactive 对象整体替换**：

```js
let state = reactive({ count: 0 });
state = { count: 1 }; // 失去响应式
```

解决：使用 ref 或直接修改属性。

5. **Vue 3 中解构 reactive 对象**：

```js
const user = reactive({ name: 'Tom', age: 20 });
const { name } = user; // name 不再是响应式
```

解决：使用 `toRefs`。

```js
const { name } = toRefs(user);
```

6. **ref 在 reactive 中自动解包**：

```js
const count = ref(0);
const state = reactive({ count });
state.count++; // 0 变成 1，不需要 .value
```

注意：数组索引不会解包 ref。

7. **数组的 length 修改**：
   - Vue 2 中 `arr.length = 0` 不会触发更新。
   - Vue 3 Proxy 可以监听，但仍建议用 `arr.length = 0` 时确保响应式。

最佳实践：
- Vue 2 中遵循官方数组/对象变更方法。
- Vue 3 中优先使用 ref 管理基本类型和需要替换的对象。
- reactive 对象不要整体替换，不要直接解构。

**评分维度**：
- 能列举 4 个以上响应式坑（40%）
- 能说明原因（30%）
- 能给出解决方案（30%）

**常见错误**：
- 在 Vue 3 中仍然使用 Vue.set / Vue.delete。
- 对 reactive 对象整体赋值后期望保持响应式。
- 忽略 ref 在 reactive 中的自动解包规则。

**延伸追问**：
- Vue 3 为什么不需要 Vue.set？
- toRef 和 toRefs 有什么区别？

**相关题目**：
- [FB-16-CO-A-009 ref 和 reactive](#FB-16-CO-A-009)
- [FB-16-FS-P-018 Vue 3 响应式原理](#FB-16-FS-P-018)

**参考资源**：
- [Vue 官方文档 - Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Vue 2 官方文档 - 列表渲染注意事项](https://v2.vuejs.org/v2/guide/list.html#Caveats)

**口头回答版**：
> Vue 2 里常见的坑是对象新增删除属性、数组通过索引修改不会触发更新，要用 Vue.set、Vue.delete 或数组方法。Vue 3 因为用了 Proxy，这些问题都没了，但要注意 reactive 对象整体替换会失去响应式，解构也会丢失响应式，要用 toRefs。还有 ref 放到 reactive 对象里会自动解包，数组索引不会解包。

---

### FB-16-FS-P-021：Vue 的 Diff 算法是怎么工作的？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue、Diff、虚拟 DOM、key、Patch、Block Tree
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请简述 Vue Diff 算法的核心流程，并说明 `key` 在 Diff 中的作用。

**参考答案**：

Vue Diff 算法用于比较新旧虚拟 DOM 树，找出最小变更集并应用到真实 DOM。

核心流程：

1. **同层级比较**：
   - Vue 只比较同一层级的节点，不跨层级比较。

2. **节点比较**：
   - 先比较两个节点是否是同一节点：key 相同且标签相同（sel/tag）。
   - 如果不是同一节点，直接销毁旧节点，创建新节点。
   - 如果是同一节点，递归比较子节点。

3. **子节点双端比较**：
   - 使用四个指针：旧头、旧尾、新头、新尾。
   - 对比旧头新头、旧尾新尾、旧头新尾、旧尾新头。
   - 找到可复用节点后移动指针，继续下一轮。

4. **key 查找**：
   - 如果双端比较找不到匹配，通过 key 在旧子节点中查找可复用节点。
   - 找到后移动到正确位置。

5. **处理剩余节点**：
   - 新子节点有剩余则创建。
   - 旧子节点有剩余则删除。

key 的作用：

- 为节点提供唯一身份标识。
- 帮助 Diff 算法在列表变化时判断节点的复用、移动、删除。
- 没有 key 时只能按位置比较，效率低且可能导致状态错位。

Vue 3 优化：

- 通过 PatchFlag 和 Block Tree，diff 时只比较动态节点。
- 静态节点在编译阶段已优化，不参与运行时 diff。

**评分维度**：
- 能说明同层级比较原则（20%）
- 能说明同一节点判断标准（20%）
- 能解释双端比较和 key 查找（40%）
- 能提到 Vue 3 的 PatchFlag / Block Tree 优化（20%）

**常见错误**：
- 认为 Vue Diff 是深度优先完全比较。
- 认为 key 只是为了消除警告。
- 使用随机数作为 key。

**延伸追问**：
- Vue 2 和 Vue 3 的 Diff 算法有什么主要区别？
- 列表渲染中 key 用 index 有什么问题？

**相关题目**：
- [FB-16-CO-B-005 v-for 与 key](#FB-16-CO-B-005)
- [FB-16-FS-P-019 Vue 3 编译优化](#FB-16-FS-P-019)

**参考资源**：
- [Vue 官方文档 - Rendering Mechanism](https://vuejs.org/guide/extras/rendering-mechanism.html)
- [snabbdom 源码 - Vue 2 diff 参考实现](https://github.com/snabbdom/snabbdom)

**口头回答版**：
> Vue 的 diff 是同层级比较，先判断两个节点是不是同一个节点，标准是 key 和标签都相同。是同一节点就递归比子节点；不是就销毁重建。子节点比较用双端比较，四个指针互相碰，找不到匹配就用 key 在旧节点里查。key 的作用是给节点身份证，让 Vue 知道谁是谁，避免状态错位。Vue 3 还加了 PatchFlag 和 Block Tree，只 diff 动态节点。

---

### FB-16-CO-P-022：`script setup` 解决了什么问题？defineProps、defineEmits、defineExpose 怎么用？

**题型**：概念题 / 手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue 3、script setup、defineProps、defineEmits、defineExpose、编译器宏
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Vue 3 中 `script setup` 的优势，并解释 `defineProps`、`defineEmits`、`defineExpose` 的用法。

**参考答案**：

`script setup` 是 Vue 3.2 引入的 Composition API 语法糖，编译后等价于 `setup()` 函数。

优势：

- 代码更简洁，不需要返回变量和函数。
- 自动暴露模板中使用的变量。
- 更好的 TypeScript 类型推导。
- 更好的运行时性能（变量提升减少代理开销）。

`defineProps`：

```vue
<script setup>
const props = defineProps({
  title: String,
  count: { type: Number, default: 0 }
});

// TypeScript 版本
interface Props {
  title: string;
  count?: number;
}
const props = defineProps<Props>();
</script>
```

`defineEmits`：

```vue
<script setup>
const emit = defineEmits(['update:modelValue', 'submit']);

function handleClick() {
  emit('submit', { id: 1 });
}
</script>
```

`defineExpose`：

```vue
<script setup>
import { ref } from 'vue';
const inputRef = ref(null);
function focus() {
  inputRef.value.focus();
}
defineExpose({ focus });
</script>
```

注意：
- `defineProps` 和 `defineEmits` 是编译器宏，不需要 import。
- `script setup` 中定义的变量默认不对父组件暴露，需要 `defineExpose`。

**评分维度**：
- 能说明 script setup 的优势（30%）
- 能正确使用 defineProps（25%）
- 能正确使用 defineEmits（25%）
- 能正确使用 defineExpose（20%）

**常见错误**：
- 手动 import defineProps / defineEmits。
- 在 script setup 中使用 this。
- 忘记 defineExpose 导致父组件无法调用子组件方法。

**延伸追问**：
- script setup 和普通的 setup() 在编译后有什么区别？
- 如何在一个 SFC 中同时使用 script setup 和 Options API？

**相关题目**：
- [FB-16-CO-B-002 Options API 与 Composition API](#FB-16-CO-B-002)
- [FB-16-CO-A-013 nextTick](#FB-16-CO-A-013)

**参考资源**：
- [Vue 官方文档 - script setup](https://vuejs.org/api/sfc-script-setup.html)

**口头回答版**：
> script setup 是 Composition API 的语法糖，代码更简洁，变量自动暴露给模板，TS 类型推导也更好。defineProps 声明 props，defineEmits 声明事件，这两个是编译器宏，不需要 import。defineExpose 用来指定哪些方法或属性暴露给父组件 ref。注意 script setup 里不能用 this。

---

### FB-16-PE-P-023：Vue 应用有哪些性能优化手段？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue、性能优化、懒加载、KeepAlive、虚拟列表、computed
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请从渲染、加载、运行时等角度，系统地说明 Vue 应用的性能优化手段。

**参考答案**：

一、渲染优化

1. **合理使用 v-if / v-show**：
   - 频繁切换用 v-show，条件稳定用 v-if。

2. **使用 computed 缓存计算**：
   - 避免在模板中执行复杂计算。

3. **key 优化**：
   - 使用稳定唯一 ID 作为 key。

4. **组件懒加载**：
   - 路由组件使用 `() => import('./Component.vue')`。

5. **KeepAlive 缓存**：
   - 缓存需要保留状态的组件。

6. **v-once / v-memo**：
   - `v-once` 只渲染一次。
   - `v-memo`（Vue 3.2+）缓存指定依赖不变的子树。

7. **shallowRef / shallowReactive**：
   - 对大型数据结构使用浅层响应式，避免深层代理开销。

二、加载优化

1. **代码分割**：
   - 按路由、按功能拆分 chunk。

2. **Tree Shaking**：
   - 只打包使用到的代码。

3. **图片/资源优化**：
   - 懒加载图片、使用 WebP、压缩资源。

4. **SSR / SSG**：
   - 使用 Nuxt 3 提升首屏性能。

三、运行时优化

1. **减少不必要的响应式**：
   - 不需要响应式的数据用普通对象。

2. **避免 watch 滥用**：
   - 优先用 computed。

3. **事件防抖节流**：
   - 高频事件使用 lodash/debounce。

4. **虚拟列表**：
   - 长列表使用 vue-virtual-scroller 等库。

5. **Web Worker**：
   - 复杂计算放到 Worker 中执行。

**评分维度**：
- 能从渲染、加载、运行时三个角度回答（30%）
- 能列举至少 6 个具体优化手段（40%）
- 能说明适用场景和取舍（30%）

**常见错误**：
- 所有组件都加 KeepAlive。
- 滥用 v-once 导致无法更新。
- 把所有数据都做成响应式。

**延伸追问**：
- 如何优化一个包含 1 万条数据的 Vue 列表？
- Vue 3 的 v-memo 和 React.memo 有什么异同？

**相关题目**：
- [FB-16-CO-B-004 v-if 与 v-show](#FB-16-CO-B-004)
- [FB-16-SD-R-027 Vue 组件库设计](#FB-16-SD-R-031)

**参考资源**：
- [Vue 官方文档 - Performance](https://vuejs.org/guide/best-practices/performance.html)
- [Vue 官方文档 - v-memo](https://vuejs.org/api/built-in-directives.html#v-memo)

**口头回答版**：
> Vue 性能优化分三块。渲染上：v-if 和 v-show 选对，key 用稳定 ID，复杂计算用 computed，组件懒加载，KeepAlive 缓存，v-once/v-memo 缓存，大数据用 shallowRef。加载上：代码分割、Tree Shaking、图片压缩、SSR/SSG。运行时：减少不必要的响应式，避免 watch 滥用，事件防抖节流，长列表用虚拟滚动，复杂计算放 Web Worker。

---

### FB-16-FS-P-024：Vue 3 的 Teleport、Suspense、Fragment 分别是什么？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue 3、Teleport、Suspense、Fragment、内置组件
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请分别介绍 Vue 3 中 Teleport、Suspense、Fragment 三个新特性及其使用场景。

**参考答案**：

1. **Fragment（片段）**：
   - Vue 3 组件模板支持多个根节点。
   - Vue 2 必须只有一个根节点。

   ```vue
   <template>
     <header>...</header>
     <main>...</main>
     <footer>...</footer>
   </template>
   ```

2. **Teleport**：
   - 将组件的一部分 DOM 渲染到组件树之外的指定位置。
   - 常用于 Modal、Toast、Tooltip 等需要脱离当前布局的组件。

   ```vue
   <template>
     <Teleport to="body">
       <div class="modal">...</div>
     </Teleport>
   </template>
   ```

   特点：
   - 组件逻辑仍在当前组件中，DOM 位置改变。
   - 支持 `disabled` 属性控制是否传送。

3. **Suspense**：
   - 异步组件加载时显示 fallback 内容。
   - 可配合 async setup 使用。

   ```vue
   <template>
     <Suspense>
       <template #default>
         <AsyncComponent />
       </template>
       <template #fallback>
         <Loading />
       </template>
     </Suspense>
   </template>
   ```

   使用场景：
   - 异步组件加载。
   - async setup 中数据获取。

**评分维度**：
- 能说明 Fragment 支持多根节点（20%）
- 能说明 Teleport 改变 DOM 渲染位置（35%）
- 能说明 Suspense 异步加载 fallback（35%）
- 能给出使用场景（10%）

**常见错误**：
- 认为 Teleport 会改变组件层级关系。
- 在 Suspense 中处理错误（应配合 Error Boundary 或 onErrorCaptured）。
- 把 Fragment 和 Teleport 混为一谈。

**延伸追问**：
- Teleport 的 to 目标可以是动态的吗？
- Suspense 和 Vue Router 的懒加载如何配合？

**相关题目**：
- [FB-16-CO-A-014 KeepAlive](#FB-16-CO-A-014)
- [FB-16-CO-P-022 script setup](#FB-16-CO-P-022)

**参考资源**：
- [Vue 官方文档 - Fragment](https://vuejs.org/guide/extras/rendering-mechanism.html#fragment)
- [Vue 官方文档 - Teleport](https://vuejs.org/guide/built-ins/teleport.html)
- [Vue 官方文档 - Suspense](https://vuejs.org/guide/built-ins/suspense.html)

**口头回答版**：
> Vue 3 新增了三个特性：Fragment 让组件模板可以有多个根节点；Teleport 可以把子组件的 DOM 渲染到 body 等外部位置，适合做 Modal、Toast；Suspense 在异步组件加载时显示 fallback 内容，配合 async setup 用。Teleport 只是 DOM 位置变了，组件逻辑还是在原来的地方。

---

### FB-16-FS-P-025：Vue SSR / Nuxt 3 中有哪些需要注意的问题？

**题型**：框架原理题 / 场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：16 Vue
**标签**：Vue、SSR、Nuxt 3、Hydration、同构、服务端渲染
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 Vue SSR 的基本流程，并分析 Nuxt 3 中常见的问题和最佳实践。

**参考答案**：

Vue SSR 流程：

1. 服务端根据请求获取数据，渲染组件为 HTML 字符串。
2. 将 HTML 返回给浏览器。
3. 浏览器加载 JS 后执行 hydration，把静态 HTML 激活为可交互应用。

Nuxt 3 是 Vue 3 的官方 SSR/SSG 框架，主要特性：

- 文件系统路由。
- 自动导入组件和 composables。
- `useFetch` / `useAsyncData` 处理服务端数据获取。
- 支持 SSR、SSG、CSR、ISR 多种渲染模式。

常见问题：

1. **Hydration Mismatch**：
   - 服务端和客户端渲染结果不一致。
   - 原因：时间、随机数、浏览器 API、用户特定数据。
   - 解决：使用 `ClientOnly` 包裹客户端特有内容，使用 `useId`。

2. **服务端访问不到 window/document**：
   - 解决：在 `onMounted` 或 `process.client` 中访问。

3. **数据获取时机**：
   - 使用 `useAsyncData` / `useFetch` 确保服务端和客户端数据一致。
   - 避免在 setup 中直接调用不稳定的 API。

4. **内存泄漏**：
   - 服务端每个请求都会创建应用实例，注意清理副作用。

最佳实践：
- 区分服务端和客户端代码，使用 `ClientOnly` 或 `process.client`。
- 使用 Nuxt 提供的 composables 获取数据。
- 对不依赖 SEO 的交互组件使用 CSR。
- 合理配置缓存策略。

**评分维度**：
- 能说明 SSR 流程（25%）
- 能列举 Nuxt 3 主要特性（25%）
- 能分析 Hydration Mismatch 原因和解决（30%）
- 能提到服务端 API 限制（20%）

**常见错误**：
- 在服务端直接访问 localStorage。
- 认为 SSR 能提升所有场景性能。
- 忽略 hydration 一致性导致页面报错。

**延伸追问**：
- Nuxt 3 的 `useFetch` 和 `useAsyncData` 有什么区别？
- SSR 和 SSG 的适用场景分别是什么？

**相关题目**：
- [FB-16-CO-A-013 nextTick](#FB-16-CO-A-013)
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-031)

**参考资源**：
- [Nuxt 3 官方文档](https://nuxt.com/)
- [Vue 官方文档 - SSR](https://vuejs.org/guide/scaling-up/ssr.html)

**口头回答版**：
> Vue SSR 就是服务端先把组件渲染成 HTML，浏览器拿到后加载 JS 再做 hydration 激活。Nuxt 3 是 Vue 3 的 SSR 框架，有文件路由、自动导入、useFetch 这些特性。常见问题有 hydration mismatch，就是服务端和客户端渲染结果对不上，通常因为时间、随机数、浏览器 API；解决方法是客户端特有内容用 ClientOnly 包起来，或者用 onMounted 里执行。服务端不能访问 window、document。


---

## 架构题（14 道）{#architect}

### FB-16-SD-R-026：如何设计一个大型的 Vue 前端应用架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、架构设计、状态管理、路由、模块化、工程化
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请从项目结构、状态管理、路由、组件设计、工程化、性能等方面，说明如何设计一个大型的 Vue 前端应用架构。

**参考答案**：

一、项目结构

```text
src/
├── assets/           # 静态资源
├── components/       # 公共组件
├── composables/      # 组合式逻辑
├── layouts/          # 布局组件
├── modules/          # 按业务模块划分
│   ├── user/
│   ├── order/
│   └── product/
├── plugins/          # 插件
├── router/           # 路由配置
├── stores/           # Pinia 状态
├── styles/           # 全局样式 / 变量
├── utils/            # 工具函数
└── views/            # 页面级组件
```

二、状态管理

- 局部状态：使用 ref / reactive 管理。
- 跨组件状态：provide / inject 或 Composable。
- 全局状态：Pinia，按模块拆分 store。
- 服务端状态：useFetch / Vue Query。

三、路由设计

- 按业务模块拆分路由配置。
- 使用路由懒加载。
- 统一路由守卫处理权限、埋点、标题。

四、组件设计

- 基础组件：无业务逻辑，可复用。
- 业务组件：封装业务逻辑。
- 页面组件：连接数据、路由、布局。
- 优先使用 Composition API + `script setup`。

五、工程化

- TypeScript 全量覆盖。
- ESLint + Prettier 统一代码风格。
- Husky + lint-staged 提交检查。
- Vitest / Cypress 测试。
- Monorepo 管理公共组件库和工具包。

六、性能

- 路由懒加载、组件异步加载。
- 虚拟列表处理大数据。
- KeepAlive 缓存页面。
- 合理的响应式粒度。

**评分维度**：
- 能从结构、状态、路由、组件、工程化、性能等维度回答（40%）
- 能说明按业务模块拆分（20%）
- 能提到 Pinia、TypeScript、测试（20%）
- 能结合实际项目经验（20%）

**常见错误**：
- 所有状态都放到 Pinia。
- 组件层级过深，数据流混乱。
- 忽略 TypeScript 和测试。

**延伸追问**：
- 如何处理大型 Vue 应用中的权限路由？
- 微前端架构下如何拆分 Vue 应用？

**相关题目**：
- [FB-16-CO-A-016 Pinia 与 Vuex](#FB-16-CO-A-016)
- [FB-16-SD-R-028 Vue 微前端](#FB-16-SD-R-031)

**参考资源**：
- [Vue 官方文档 - Scaling Up](https://vuejs.org/guide/scaling-up/sfc.html)
- [Vue Style Guide](https://vuejs.org/style-guide/)

**口头回答版**：
> 大型 Vue 应用我会按业务模块拆分目录，比如 modules/user、modules/order，每个模块有自己的页面、组件、store。状态管理用 Pinia，按模块拆 store；路由按模块配置并懒加载。组件分基础组件、业务组件、页面组件三层。工程化上全量 TypeScript，ESLint + Prettier，提交前跑 lint 和测试。性能上路由懒加载、大数据用虚拟列表、KeepAlive 缓存。

---

### FB-16-SD-R-027：如何设计一个高质量的 Vue 组件库？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、组件库、设计系统、TypeScript、Tree Shaking、可访问性
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请从 API 设计、实现、样式、文档、测试、构建等方面，说明如何设计一个高质量的 Vue 组件库。

**参考答案**：

一、API 设计

- 一致命名：props、events、slots 命名统一。
- 受控与非受控：支持 v-model，同时支持 defaultValue。
- 组合式组件：如 `Tabs + TabPane`。
- TypeScript：完整的 props 类型、事件类型、slot 类型。

二、组件实现

- 使用 `script setup` + Composition API。
- 支持 `v-model`、自定义事件、作用域插槽。
- 使用 `defineExpose` 暴露必要方法。
- 注意组件卸载时清理副作用。

三、样式方案

- CSS Modules / CSS Variables / CSS-in-JS。
- Design Token：颜色、字体、间距统一。
- 支持暗黑模式、主题定制。
- 避免全局样式污染，使用 BEM 或 scoped。

四、可访问性（a11y）

- 正确的 ARIA 属性。
- 键盘导航支持。
- 焦点管理。

五、文档

- Storybook 展示组件和交互示例。
- 提供 Props / Events / Slots 表格。
- 编写迁移指南和 Changelog。

六、测试

- Vitest + Vue Test Utils 单元测试。
- Chromatic / Storybook 视觉回归。
- axe-core 可访问性测试。

七、构建与发布

- Rollup / Vite 构建 ESM / CJS / UMD。
- 配置 `sideEffects` 支持 Tree Shaking。
- 使用 Changesets 管理版本。
- pnpm workspace Monorepo。

**评分维度**：
- 能从 API、实现、样式、文档、测试、构建等维度回答（40%）
- 能提到 TypeScript、a11y、Tree Shaking（30%）
- 能说明 Storybook 和测试策略（20%）
- 能提到 Monorepo 和 Changesets（10%）

**常见错误**：
- 只关注组件实现，忽略工程化。
- API 不统一，使用成本高。
- 样式污染全局。

**延伸追问**：
- 如何设计支持主题换肤的组件库？
- Vue 组件库如何支持 Tree Shaking？

**相关题目**：
- [FB-16-CO-A-017 Vue 插槽](#FB-16-CO-A-017)
- [FB-16-PE-P-023 Vue 性能优化](#FB-16-PE-P-023)

**参考资源**：
- [Vue 官方文档 - SFC](https://vuejs.org/guide/scaling-up/sfc.html)
- [Element Plus 组件库实践](https://element-plus.org/)
- [Radix Vue - Headless UI](https://www.radix-vue.com/)

**口头回答版**：
> 设计 Vue 组件库要从 API 开始，命名一致、支持 v-model、类型完整。实现上用 script setup，注意清理副作用。样式用 CSS Variables 做 Design Token，支持主题和暗黑模式，避免全局污染。文档用 Storybook，测试用 Vitest 加视觉回归和可访问性测试。构建用 Rollup 出 ESM/CJS，配置 sideEffects 支持 Tree Shaking，用 Changesets 管版本。

---

### FB-16-SD-R-028：微前端架构下使用 Vue 有哪些关键考虑点？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、微前端、qiankun、Module Federation、子应用隔离
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明在微前端架构中使用 Vue 时，需要关注哪些关键问题？对比 qiankun 和 Module Federation 两种方案。

**参考答案**：

关键考虑点：

1. **Vue 版本隔离**：
   - 子应用可能使用不同 Vue 版本。
   - 方案：基座统一提供 Vue，或各子应用独立打包。

2. **路由协调**：
   - 基座路由和子应用路由需要统一。
   - 子应用支持独立运行和嵌入运行两种模式。

3. **样式隔离**：
   - 使用 CSS Modules、scoped、CSS-in-JS、Shadow DOM。
   - qiankun 提供实验性样式隔离。

4. **状态共享**：
   - 通过事件总线、全局 store、URL、props 传递。
   - 避免直接共享 Vue 响应式状态。

5. **公共依赖共享**：
   - Module Federation 配置 shared。
   - qiankun 通过 externals 或 importmap。

qiankun vs Module Federation：

| 维度 | qiankun | Module Federation |
|------|---------|-------------------|
| 集成方式 | 运行时加载子应用 JS | 构建时共享模块 |
| 沙箱 | 内置 JS 沙箱、样式隔离 | 无内置沙箱 |
| 技术栈 | 不限 | 通常 Webpack/Rspack |
| 共享依赖 | externals / importmap | shared scope |
| 适用场景 | 异构、存量应用 | 同构、模块共享 |

最佳实践：
- 基座轻量，负责加载、路由、公共依赖。
- 子应用独立可运行。
- 统一组件库、埋点、错误监控。
- 版本升级需协调。

**评分维度**：
- 能列出 Vue 微前端关键问题（30%）
- 能对比 qiankun 和 Module Federation（30%）
- 能说明公共依赖和版本隔离（20%）
- 能提到路由、样式、状态共享（20%）

**常见错误**：
- 认为微前端就是简单拼接多个 SPA。
- 忽略 Vue 多版本冲突。
- 过度共享状态导致耦合。

**延伸追问**：
- 如果子应用使用不同 Vue 版本，怎么处理？
- Module Federation 的 shared scope 如何工作？

**相关题目**：
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-031)
- [FB-16-SD-R-029 Vue 2 迁移 Vue 3](#FB-16-SD-R-031)

**参考资源**：
- [qiankun 官方文档](https://qiankun.umijs.org/)
- [Module Federation 官方文档](https://module-federation.io/)

**口头回答版**：
> Vue 微前端要关注版本隔离、路由协调、样式隔离、状态共享和公共依赖共享。qiankun 是运行时加载子应用，有内置沙箱，适合异构；Module Federation 是构建时共享模块，适合同一构建工具生态。实践中基座要轻量，子应用能独立跑，公共依赖统一版本，状态通信用事件总线，避免强耦合。

---

### FB-16-SD-R-029：Vue 2 项目如何迁移到 Vue 3？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue 2、Vue 3、迁移、兼容、重构
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明一个中大型 Vue 2 项目迁移到 Vue 3 的策略、步骤和注意事项。

**参考答案**：

迁移策略：

1. **评估现状**：
   - 统计 Vue 2 特有 API、第三方库兼容性。
   - 识别使用 Vue.set / Vue.delete、filter、$children 等特性。

2. **渐进式迁移**：
   - 使用 `@vue/compat`（迁移构建）在 Vue 3 中兼容 Vue 2 代码。
   - 逐步修复兼容性警告，最后切换到标准 Vue 3 构建。

3. **依赖升级**：
   - Vue Router 3 -> 4
   - Vuex 3 -> 4 / 或迁移到 Pinia
   - Element UI -> Element Plus / Ant Design Vue 3 等
   - 其他第三方库检查 Vue 3 支持

4. **代码改造**：
   - Options API -> Composition API（可选，不强制）。
   - 生命周期名称调整：beforeDestroy -> beforeUnmount。
   - v-if / v-for 优先级变化。
   - 全局 API 改为 app.use / app.component。

5. **测试与验证**：
   - 单元测试、E2E 测试。
   - 回归核心业务流程。
   - 性能基准对比。

迁移步骤建议：

```text
1. 搭建 Vue 3 基座
2. 使用 @vue/compat 运行旧代码
3. 逐步按模块/页面迁移
4. 移除兼容性构建
5. 全面回归测试
```

注意事项：

- 不要一次性全量重写，风险太高。
- 优先迁移独立模块。
- 保留 Vue 2 版本作为 fallback。
- 文档化 Breaking Change。

**评分维度**：
- 能提出渐进式迁移策略（30%）
- 能说明 @vue/compat 的作用（25%）
- 能列出依赖升级清单（25%）
- 能提到测试和风险规避（20%）

**常见错误**：
- 一次性重写所有代码。
- 忽略第三方库兼容性。
- 迁移后不做性能对比。

**延伸追问**：
- @vue/compat 的性能开销有多大？
- Vue 2 的 mixin 如何迁移到 Composition API？

**相关题目**：
- [FB-16-CO-B-001 Vue 2 与 Vue 3 区别](#FB-16-CO-B-001)
- [FB-16-CO-A-015 Vue Router v4](#FB-16-CO-A-015)

**参考资源**：
- [Vue 3 迁移指南](https://v3-migration.vuejs.org/)
- [@vue/compat 文档](https://v3-migration.vuejs.org/migration-build.html)

**口头回答版**：
> Vue 2 迁 Vue 3 不要一次性重写，建议渐进式迁移。先用 @vue/compat 让旧代码在 Vue 3 上跑起来，然后按模块逐步改造。需要升级 Vue Router、Vuex 或迁到 Pinia，UI 库也要换对应版本。生命周期 beforeDestroy 改成 beforeUnmount，全局 API 改成 app 实例。整个过程要做好测试，保留回滚方案。

---

### FB-16-SD-R-030：Vue 配合 TypeScript 有哪些最佳实践和挑战？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、TypeScript、类型推导、props 类型、泛型
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明在 Vue 项目中使用 TypeScript 的最佳实践，并分析常见的类型挑战和解决方案。

**参考答案**：

最佳实践：

1. **SFC 使用 `script setup lang="ts"`**：
   - 获得最好的类型推导。

2. **defineProps / defineEmits 使用泛型**：

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit', payload: { id: number }): void;
}>();
</script>
```

3. **为 provide/inject 定义 InjectionKey**：

```ts
import { InjectionKey } from 'vue';
export const UserKey: InjectionKey<User> = Symbol('user');
```

4. **Pinia 使用 Setup Store**：

```ts
export const useUserStore = defineStore('user', () => {
  const name = ref('');
  return { name };
});
```

5. **全局类型声明**：
   - 为环境变量、全局事件声明类型。

常见挑战：

- **模板中类型推导**：Vue 3 + Volar / Vue Language Tools 支持较好。
- **复杂 Props 类型**：使用 `withDefaults` 设置默认值。
- **emit 类型**：Vue 3.3+ 支持类型化 emit。
- **ref 类型**：

```ts
const count = ref<number>(0);
const el = ref<HTMLInputElement | null>(null);
```

- **响应式对象解构丢失类型**：使用 toRefs。

**评分维度**：
- 能说明 script setup lang="ts" 的优势（20%）
- 能写出类型化 defineProps / defineEmits（30%）
- 能提到 InjectionKey、Pinia 类型（25%）
- 能分析常见类型挑战（25%）

**常见错误**：
- 仍然使用 Options API 的 prop 类型定义。
- 忽略 emit 的类型安全。
- ref 类型推断错误导致访问时报错。

**延伸追问**：
- 如何为 Vue Router 的 meta 字段添加类型？
- Vue 3 的类型化 slots 怎么写？

**相关题目**：
- [FB-16-CO-P-022 script setup](#FB-16-CO-P-022)
- [FB-16-SD-R-027 Vue 组件库设计](#FB-16-SD-R-031)

**参考资源**：
- [Vue 官方文档 - TypeScript](https://vuejs.org/guide/typescript/overview.html)
- [Vue Language Tools](https://github.com/vuejs/language-tools)

**口头回答版**：
> Vue 配 TypeScript 最佳实践是直接用 script setup lang="ts"，defineProps 和 defineEmits 用泛型写类型。provide/inject 用 InjectionKey，Pinia 用 Setup Store。常见挑战是 ref 的类型、emit 类型、模板推导。Vue 3.3 之后类型支持已经很好了，配合 Volar 插件基本没问题。

---

### FB-16-SD-R-031：如何基于 Vue 设计一个低代码表单引擎？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、低代码、表单引擎、Schema、渲染器、DSL
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何基于 Vue 设计一个低代码表单引擎，包括 Schema 设计、组件渲染、校验、联动和扩展机制。

**参考答案**：

一、Schema 设计

表单 Schema 是 JSON 描述，包含字段列表、组件类型、属性、校验规则、联动规则。

```json
{
  "fields": [
    {
      "key": "name",
      "label": "姓名",
      "component": "Input",
      "props": { "placeholder": "请输入姓名" },
      "rules": [{ "required": true, "message": "必填" }]
    },
    {
      "key": "type",
      "label": "类型",
      "component": "Select",
      "props": { "options": [{ "label": "A", "value": "a" }] }
    }
  ]
}
```

二、渲染器

- 根据 `component` 字段从组件映射表中查找对应组件。
- 使用动态组件 `component` 渲染器。
- 统一封装 FormItem，处理 label、校验、错误提示。

三、表单模型

- 使用 reactive 管理表单数据。
- 提供 `form.getValues()`、`form.setValues()`、`form.reset()`。

四、校验

- 集成校验库如 vee-validate、yup、zod。
- 支持字段级和表单级校验。
- 异步校验。

五、联动

- 通过依赖表达式或函数实现字段显示/隐藏、选项变化、值联动。

```json
{
  "key": "company",
  "visible": "&#123;&#123; type === 'enterprise' &#125;&#125;"
}
```

六、扩展机制

- 注册自定义组件：`engine.registerComponent('MyInput', MyInput)`。
- 注册自定义校验规则。
- 插槽机制支持自定义布局。

七、性能

- 大表单使用 shallowReactive 减少响应式开销。
- 虚拟滚动处理大量字段。
- 按需渲染不可见字段。

**评分维度**：
- 能设计 Schema 结构（25%）
- 能说明渲染器实现（25%）
- 能说明校验和联动机制（25%）
- 能提到扩展性和性能（25%）

**常见错误**：
- Schema 设计过于简单，无法覆盖复杂表单。
- 渲染器和业务组件强耦合。
- 忽略表单大数据场景性能。

**延伸追问**：
- 低代码表单引擎和 JSON Schema Form 有什么区别？
- 如何实现表单字段的异步数据源？

**相关题目**：
- [FB-16-SD-R-027 Vue 组件库设计](#FB-16-SD-R-031)
- [FB-16-CO-A-017 Vue 插槽](#FB-16-CO-A-017)

**参考资源**：
- [FormKit - Vue 表单框架](https://formkit.com/)
- [Vue Formulate](https://vueformulate.com/)

**口头回答版**：
> 基于 Vue 做低代码表单引擎，核心是 JSON Schema 描述表单，然后一个渲染器根据 component 字段动态渲染对应组件。Schema 里包含字段、组件属性、校验规则、联动规则。表单数据用 reactive 管理，校验可以接 yup、zod。联动通过表达式或函数控制字段显示隐藏和选项。还要提供注册自定义组件和校验规则的扩展机制，大数据表单注意性能。


---

### FB-16-CO-B-009：Vue 3 中常用的内置指令有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：16 Vue
**标签**：Vue、指令、v-if、v-for、v-model、模板语法
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举 Vue 3 中常用的内置指令，并简要说明其作用。

**参考答案**：

常用内置指令：

| 指令 | 作用 |
|------|------|
| `v-bind` / `:` | 动态绑定属性或 prop |
| `v-on` / `@` | 绑定事件监听器 |
| `v-model` | 双向绑定 |
| `v-if` / `v-else-if` / `v-else` | 条件渲染 |
| `v-show` | 通过 display 切换显示 |
| `v-for` | 列表渲染 |
| `v-text` | 更新元素的 textContent |
| `v-html` | 更新元素的 innerHTML（注意 XSS） |
| `v-cloak` | 隐藏未编译的 Mustache 标签 |
| `v-once` | 只渲染一次 |
| `v-memo`（Vue 3.2+） | 按依赖缓存子树 |

最佳实践：
- 优先使用 `:` 和 `@` 简写。
- `v-html` 只用于可信内容。
- 列表渲染必须提供稳定 `key`。

**评分维度**：
- 能列举至少 8 个常用指令（50%）
- 能说明 v-if 与 v-show 的区别（20%）
- 能提到 v-model 与 v-bind/v-on 的关系（20%）
- 能提醒 v-html 的安全风险（10%）

**常见错误**：
- 混淆 `v-if` 与 `v-show` 的渲染机制。
- 在 `v-html` 中渲染用户输入内容。
- 在 `v-for` 中省略 `key`。

**延伸追问**：
- `v-if` 和 `v-for` 为什么不建议同时使用？
- `v-memo` 的适用场景是什么？

**相关题目**：
- [FB-16-CO-B-004 v-if 与 v-show](#FB-16-CO-B-004)
- [FB-16-CO-B-005 v-for 与 key](#FB-16-CO-B-005)

**参考资源**：
- [Vue 官方文档 - 模板语法](https://vuejs.org/guide/essentials/template-syntax.html)
- [Vue 官方文档 - 内置指令](https://vuejs.org/api/built-in-directives.html)

**口头回答版**：
> Vue 常用内置指令有 v-bind 绑定属性、v-on 绑定事件、v-model 双向绑定、v-if/v-show 条件渲染、v-for 列表渲染、v-text、v-html、v-once、v-memo 等。v-if 是不满足条件就不渲染，v-show 是一直渲染只是隐藏。v-html 要注意 XSS，不能渲染不可信内容。

---

### FB-16-CA-B-001：分析以下代码的输出

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、ref、响应式、代码分析、Composition API
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
阅读以下 Vue 3 代码，说明点击按钮后控制台输出什么。

```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);

function increment() {
  count.value++;
  count.value++;
  count.value++;
  console.log(count.value);
}
</script>

<template>
  <button @click="increment">&#123;&#123; count &#125;&#125;</button>
</template>
```

**参考答案**：

控制台输出 `3`，按钮显示 `0`（点击后异步更新为 `3`）。

原因：
- `ref` 包装的值必须通过 `.value` 访问和修改。
- 三次 `count.value++` 是同步执行的，因此 `console.log` 时已经是 `3`。
- Vue 的 DOM 更新是异步的，同一事件循环内的多次变化会合并为一次更新。

如果模板里写 `&#123;&#123; count &#125;&#125;` 而不是 `&#123;&#123; count.value &#125;&#125;`，Vue 会自动解包 ref。

**评分维度**：
- 能正确判断输出为 3（40%）
- 能解释 ref 的 .value 访问方式（30%）
- 能说明 DOM 异步更新机制（30%）

**常见错误**：
- 认为模板里需要写 `&#123;&#123; count.value &#125;&#125;`。
- 认为每次 count.value++ 都会立即触发一次 DOM 更新。
- 忽略 ref 自动解包只对顶层有效。

**延伸追问**：
- 如果改成 `reactive({ count: 0 })`，代码应该怎么写？
- 如何让 DOM 更新后立即获取最新值？

**相关题目**：
- [FB-16-CO-A-009 ref 和 reactive](#FB-16-CO-A-009)
- [FB-16-CO-A-013 nextTick](#FB-16-CO-A-013)

**参考资源**：
- [Vue 官方文档 - Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

**口头回答版**：
> 点击按钮后控制台打印 3，因为 count 是 ref，修改要用 .value，三次自增同步执行。模板会自动解包 ref，所以显示 count 就行。DOM 更新是异步的，要等 nextTick 才能拿到最新 DOM。

---

### FB-16-CD-B-001：手写一个支持删除的 TodoItem 组件

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：16 Vue
**标签**：Vue、组件、props、emit、Todo、手写代码
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请用 Vue 3 + `script setup` 实现一个 `TodoItem` 组件，支持显示任务文本和删除按钮，点击删除按钮通知父组件。

**参考答案**：

```vue
<!-- TodoItem.vue -->
<template>
  <li class="todo-item">
    <span>&#123;&#123; text &#125;&#125;</span>
    <button @click="handleDelete">删除</button>
  </li>
</template>

<script setup>
const props = defineProps({
  id: { type: Number, required: true },
  text: { type: String, required: true }
});

const emit = defineEmits(['delete']);

function handleDelete() {
  emit('delete', props.id);
}
</script>
```

父组件使用：

```vue
<template>
  <ul>
    <TodoItem
      v-for="item in list"
      :key="item.id"
      :id="item.id"
      :text="item.text"
      @delete="onDelete"
    />
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import TodoItem from './TodoItem.vue';

const list = ref([
  { id: 1, text: '学习 Vue' },
  { id: 2, text: '写代码' }
]);

function onDelete(id) {
  list.value = list.value.filter(item => item.id !== id);
}
</script>
```

**评分维度**：
- 能正确声明 props（30%）
- 能正确声明并触发 emit（30%）
- 父组件能正确监听事件并更新数据（30%）
- 代码风格和命名规范（10%）

**常见错误**：
- 子组件直接修改 props。
- 忘记 `defineEmits`。
- `v-for` 中省略 `key`。
- 事件命名与监听不一致。

**延伸追问**：
- 如何给该组件增加完成状态切换？
- 如何用 v-model 改写这个组件？

**相关题目**：
- [FB-16-CO-B-007 组件通信方式](#FB-16-CO-B-007)
- [FB-16-CO-B-008 受控组件](#FB-16-CO-B-008)

**参考资源**：
- [Vue 官方文档 - Components Basics](https://vuejs.org/guide/essentials/component-basics.html)

**口头回答版**：
> TodoItem 组件用 defineProps 接收 id 和 text，defineEmits 声明 delete 事件。点击删除按钮时 emit('delete', id)。父组件监听 delete，拿到 id 后从列表过滤掉。注意子组件不要直接改 props。

---

### FB-16-SC-B-001：如何封装一个可复用的 Vue Button 组件？

**题型**：场景设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、组件封装、Button、props、slot、可复用
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个可复用的 BaseButton 组件，支持类型、尺寸、禁用、加载状态，并允许通过插槽自定义内容。

**参考答案**：

```vue
<!-- BaseButton.vue -->
<template>
  <button
    class="base-button"
    :class="[type, size, { loading, disabled }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner">🌀</span>
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: 'medium' },
  disabled: Boolean,
  loading: Boolean
});

const emit = defineEmits(['click']);

function handleClick(e) {
  if (props.loading || props.disabled) return;
  emit('click', e);
}
</script>
```

设计要点：
- 使用 props 控制类型、尺寸、状态。
- 使用默认插槽自定义按钮文本或图标。
- 加载和禁用状态下阻止点击事件。
- 通过 class 绑定实现样式变化。

**评分维度**：
- 能设计合理的 props 接口（30%）
- 能处理加载和禁用状态（25%）
- 能使用 slot 自定义内容（25%）
- 能考虑事件透传和样式封装（20%）

**常见错误**：
- props 命名与原生 button 属性冲突。
- 禁用状态下仍然触发 click 事件。
- 忽略 $attrs 透传导致原生属性丢失。

**延伸追问**：
- 如何支持原生 type="submit"？
- 如何使用 v-bind="$attrs" 透传未声明的属性？

**相关题目**：
- [FB-16-CO-A-017 Vue 插槽](#FB-16-CO-A-017)
- [FB-16-SD-R-027 Vue 组件库设计](#FB-16-SD-R-027)

**参考资源**：
- [Vue 官方文档 - Fallthrough Attributes](https://vuejs.org/guide/components/attrs.html)

**口头回答版**：
> 封装 BaseButton 时，用 props 定义 type、size、disabled、loading，默认插槽放按钮内容。loading 和 disabled 时阻止点击，button 本身也 disabled。还可以用 $attrs 透传原生属性，比如 type="submit"。

---

### FB-16-EN-B-001：Vue CLI 和 Vite 创建项目有什么区别？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、Vue CLI、Vite、构建工具、工程化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 Vue CLI 和 Vite 在创建 Vue 项目时的主要区别。

**参考答案**：

| 维度 | Vue CLI | Vite |
|------|---------|------|
| 构建工具 | 基于 Webpack | 基于 Rollup / esbuild |
| 启动速度 | 慢，需要预打包依赖 | 快，利用浏览器原生 ESM |
| 热更新 | 基于 Webpack HMR | 更快的 HMR |
| 配置方式 | vue.config.js | vite.config.js |
| 官方推荐 | Vue 2/3 早期 | Vue 3 官方推荐 |
| TypeScript | 支持 | 原生支持更好 |
| 插件生态 | Webpack 插件 | Vite 插件 |

选型建议：
- 新项目优先使用 Vite + create-vue。
- Vue CLI 项目可继续使用，但新项目不建议。

**评分维度**：
- 能说明构建工具差异（30%）
- 能说明启动速度和 HMR 差异（30%）
- 能给出选型建议（20%）
- 能提到配置文件差异（20%）

**常见错误**：
- 认为 Vite 是基于 Webpack 的封装。
- 认为 Vue CLI 已停止维护（实际处于维护模式）。
- 忽略 Vite 对浏览器 ESM 的依赖。

**延伸追问**：
- Vite 在生产环境为什么用 Rollup？
- Vue CLI 项目如何迁移到 Vite？

**相关题目**：
- [FB-16-SD-R-029 Vue 2 迁移 Vue 3](#FB-16-SD-R-029)
- [FB-16-EN-A-001 Vue 工程化配置](#FB-16-EN-A-001)

**参考资源**：
- [Vite 官方文档](https://vitejs.dev/)
- [create-vue](https://github.com/vuejs/create-vue)

**口头回答版**：
> Vue CLI 基于 Webpack，启动慢，配置是 vue.config.js。Vite 基于 esbuild 和 Rollup，利用浏览器原生 ESM，启动和热更新都更快，是 Vue 3 官方推荐的。新项目我直接选 Vite。

---

### FB-16-SE-B-001：Vue 中常见的 XSS 风险有哪些？如何防范？

**题型**：安全题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、XSS、安全、v-html、用户输入
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 应用中常见的 XSS 攻击场景及防范措施。

**参考答案**：

常见 XSS 场景：

1. **`v-html` 渲染未过滤内容**：
   - 如果用户输入直接通过 `v-html` 渲染，可能注入 `<script>` 标签。

2. **动态 URL**：
   - 将用户输入直接作为 `href` 或 `src`，可能产生 `javascript:` 协议链接。

3. ** innerHTML / outerHTML 操作**：
   - 直接操作 DOM 时引入不可信内容。

防范措施：

- 避免使用 `v-html` 渲染用户输入。
- 必须使用时，先对 HTML 进行转义或白名单过滤（如 DOMPurify）。
- 对 URL 进行校验，禁止 `javascript:` 等危险协议。
- 使用 Vue 的文本插值 `&#123;&#123; &#125;&#125;` 自动转义输出。
- 启用 Content-Security-Policy（CSP）。

**评分维度**：
- 能识别 v-html 的 XSS 风险（40%）
- 能说明文本插值的自动转义（30%）
- 能给出具体防范措施（30%）

**常见错误**：
- 认为 Vue 默认渲染是安全的，忽略 v-html 的风险。
- 使用正则简单过滤 HTML。
- 忽略动态 URL 的风险。

**延伸追问**：
- 如何安全地渲染富文本？
- CSP 在 Vue 项目中如何配置？

**相关题目**：
- [FB-16-CO-B-009 内置指令](#FB-16-CO-B-009)
- [FB-16-SE-A-001 v-html 安全处理](#FB-16-SE-A-001)

**参考资源**：
- [Vue 官方文档 - v-html](https://vuejs.org/guide/essentials/template-syntax.html#raw-html)
- [OWASP XSS 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

**口头回答版**：
> Vue 里最常见的 XSS 风险是 v-html 渲染用户输入，会直接执行脚本。普通文本插值 {{ }} 会自动转义。防范就是尽量不用 v-html，必须用就先用 DOMPurify 过滤，URL 也要校验，避免 javascript: 协议。

---

### FB-16-PE-B-001：如何避免 Vue 组件不必要的重渲染？

**题型**：性能优化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、性能优化、computed、v-once、key、重渲染
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请从基础用法角度说明如何避免 Vue 组件不必要的重渲染。

**参考答案**：

常用方法：

1. **使用 `computed` 缓存派生数据**：
   - 避免在模板中执行复杂计算。

2. **使用稳定的 `key`**：
   - 帮助 Vue 正确复用节点。

3. **合理使用 `v-if` 和 `v-show`**：
   - 初始不需要渲染的内容用 `v-if`。

4. **`v-once`**：
   - 静态内容只渲染一次。

5. **避免在 `methods` 中做派生计算**：
   - 方法每次渲染都会重新调用。

6. **减少响应式粒度**：
   - 不要把无关数据都变成响应式。

**评分维度**：
- 能提到 computed 缓存（30%）
- 能提到 key 和 v-if/v-show 选择（30%）
- 能提到 v-once 和 methods 的使用（25%）
- 能说明减少响应式粒度（15%）

**常见错误**：
- 所有数据都使用 ref/reactive。
- 用随机数或 index 作为 key。
- 在模板中写复杂表达式。

**延伸追问**：
- Vue 3 的 v-memo 和 v-once 有什么区别？
- computed 和 methods 在渲染时的区别是什么？

**相关题目**：
- [FB-16-CO-B-006 computed、methods、watch](#FB-16-CO-B-006)
- [FB-16-PE-A-001 Vue 长列表优化](#FB-16-PE-A-001)

**参考资源**：
- [Vue 官方文档 - Performance](https://vuejs.org/guide/best-practices/performance.html)

**口头回答版**：
> 避免不必要重渲染，可以用 computed 缓存计算结果，key 用稳定 id，静态内容用 v-once，不需要初始渲染的用 v-if。别把无关数据都做成响应式，methods 里不要做本可以用 computed 的派生计算。

---

### FB-16-CP-B-001：Vue 开发与原生 HTML/JS 开发相比有哪些优缺点？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、原生开发、优缺点、开发效率、维护性
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Vue 开发与原生 HTML/JS 开发，分析各自的优缺点及适用场景。

**参考答案**：

Vue 优点：
- 声明式渲染，数据驱动视图。
- 组件化开发，提高复用性和可维护性。
- 响应式系统，自动更新 DOM。
- 生态丰富，路由、状态管理、构建工具完善。
- 渐进式框架，可逐步引入。

Vue 缺点：
- 需要学习框架概念和工具链。
- 构建打包引入额外复杂度。
- 对简单页面可能是过度设计。

原生 HTML/JS 优点：
- 无构建步骤，直接运行。
- 完全掌控 DOM 和性能。
- 适合极小页面或嵌入式脚本。

原生 HTML/JS 缺点：
- 手动管理 DOM，代码容易混乱。
- 组件复用困难。
- 大型项目维护成本高。

选型建议：
- 小型静态页或简单交互可用原生。
- 中大型应用或团队协作优先 Vue。

**评分维度**：
- 能说出 Vue 的声明式与组件化优势（40%）
- 能说出原生开发的直接控制优势（20%）
- 能对比维护性和学习成本（20%）
- 能给出选型建议（20%）

**常见错误**：
- 认为原生开发在所有场景都优于框架。
- 忽略 Vue 的渐进式特性。
- 没有结合实际场景分析。

**延伸追问**：
- 什么情况下你会选择不引入 Vue？
- Vue 的渐进式具体体现在哪里？

**相关题目**：
- [FB-16-CO-B-001 Vue 2 与 Vue 3 区别](#FB-16-CO-B-001)
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-026)

**参考资源**：
- [Vue 官方文档 - 介绍](https://vuejs.org/guide/introduction.html)

**口头回答版**：
> Vue 是声明式数据驱动，组件化开发，响应式自动更新 DOM，生态全，适合中大型项目。原生 HTML/JS 没有构建步骤，对 DOM 完全可控，适合极小页面。团队项目我一般用 Vue，简单落地页可以用原生。

---

## 进阶题（9 道）{#advanced-2}

### FB-16-CO-A-018：Vue 3 中如何编写自定义指令？

**题型**：概念题 / 手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue 3、自定义指令、directive、v-focus、生命周期
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Vue 3 自定义指令的生命周期钩子，并写一个 `v-focus` 指令示例。

**参考答案**：

自定义指令生命周期钩子：

| 钩子 | 说明 |
|------|------|
| `created` | 绑定元素的 attribute 或事件监听器被应用之前调用 |
| `beforeMount` | 指令第一次绑定到元素并且在挂载父组件之前调用 |
| `mounted` | 挂载后调用 |
| `beforeUpdate` | 更新前调用 |
| `updated` | 更新后调用 |
| `beforeUnmount` | 卸载前调用 |
| `unmounted` | 卸载后调用 |

`v-focus` 示例：

```js
// directives/focus.js
const vFocus = {
  mounted(el) {
    el.focus();
  }
};

export default vFocus;
```

使用：

```vue
<script setup>
import vFocus from './directives/focus';
</script>

<template>
  <input v-focus />
</template>
```

全局注册：

```js
import { createApp } from 'vue';
import App from './App.vue';
import vFocus from './directives/focus';

const app = createApp(App);
app.directive('focus', vFocus);
app.mount('#app');
```

**评分维度**：
- 能列出主要生命周期钩子（30%）
- 能写出自定义指令对象（30%）
- 能说明局部和全局注册方式（25%）
- 能对比 Vue 2 指令钩子命名差异（15%）

**常见错误**：
- 使用 Vue 2 的 `bind` / `inserted` 钩子名。
- 在 `created` 中访问 DOM 焦点。
- 忽略指令参数和修饰符。

**延伸追问**：
- 自定义指令如何接收参数和修饰符？
- 自定义指令和组件相比，各自适合什么场景？

**相关题目**：
- [FB-16-CO-B-009 内置指令](#FB-16-CO-B-009)
- [FB-16-FS-P-019 Vue 3 编译优化](#FB-16-FS-P-019)

**参考资源**：
- [Vue 官方文档 - Custom Directives](https://vuejs.org/guide/reusability/custom-directives.html)

**口头回答版**：
> Vue 3 自定义指令有 created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted 这些钩子。写一个 v-focus 就是在 mounted 里让 el.focus()。可以局部在组件里 import 使用，也可以 app.directive 全局注册。注意 Vue 2 的 bind、inserted 名字变了。

---

### FB-16-CA-A-001：分析以下响应式代码的执行结果

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue 3、reactive、解构、响应式丢失、代码分析
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
分析以下代码，说明 `name` 变化后页面是否更新。

```vue
<script setup>
import { reactive, ref } from 'vue';

const user = reactive({ name: 'Tom', age: 20 });
const { name } = user;
const age = ref(user.age);

function update() {
  user.name = 'Jerry';
  user.age = 21;
  age.value = 22;
}
</script>

<template>
  <div>
    <p>&#123;&#123; name &#125;&#125;</p>
    <p>&#123;&#123; age &#125;&#125;</p>
    <p>&#123;&#123; user.age &#125;&#125;</p>
    <button @click="update">更新</button>
  </div>
</template>
```

**参考答案**：

- `&#123;&#123; name &#125;&#125;` 不会更新，因为解构 `const { name } = user` 后，`name` 是普通字符串，失去了响应式。
- `&#123;&#123; age &#125;&#125;` 会更新为 `22`，因为 `age` 是 ref，通过 `.value` 修改会触发更新。
- `&#123;&#123; user.age &#125;&#125;` 会更新为 `21`，因为直接访问响应式对象的属性仍具备响应式。

原因：
- `reactive` 对象解构或属性赋值会丢失响应式。
- 如需解构保持响应式，应使用 `toRefs`。

**评分维度**：
- 能正确判断 name 不更新（30%）
- 能正确判断 age 更新为 22（30%）
- 能正确判断 user.age 更新为 21（20%）
- 能解释原因并提到 toRefs（20%）

**常见错误**：
- 认为解构后的变量仍是响应式的。
- 混淆 ref 和 reactive 的赋值行为。
- 认为 `age.value = 22` 不会影响 user.age。

**延伸追问**：
- 如何让解构后的 name 保持响应式？
- ref 在 reactive 对象中会自动解包吗？

**相关题目**：
- [FB-16-CO-A-009 ref 和 reactive](#FB-16-CO-A-009)
- [FB-16-FS-P-020 响应式坑](#FB-16-FS-P-020)

**参考资源**：
- [Vue 官方文档 - Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

**口头回答版**：
> 页面上 name 不会更新，因为解构 reactive 对象得到的是普通字符串，丢了响应式。age 是 ref，改成 22 会更新。user.age 也会更新。如果想让解构保持响应式，要用 toRefs。

---

### FB-16-SC-A-001：如何设计一个带搜索和筛选的商品列表组件？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue、场景设计、列表、搜索、筛选、computed
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个商品列表组件，支持关键词搜索、分类筛选、排序，并说明数据流和性能考虑。

**参考答案**：

组件结构：

```text
ProductList
├── SearchBar（搜索关键词）
├── FilterBar（分类筛选）
├── SortBar（排序方式）
└── ProductCard（列表项）
```

核心实现：

```vue
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({ products: Array });
const keyword = ref('');
const category = ref('all');
const sortBy = ref('default');

const filteredProducts = computed(() => {
  let list = props.products;

  if (category.value !== 'all') {
    list = list.filter(p => p.category === category.value);
  }

  if (keyword.value) {
    const k = keyword.value.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(k));
  }

  if (sortBy.value === 'priceAsc') {
    list = [...list].sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'priceDesc') {
    list = [...list].sort((a, b) => b.price - a.price);
  }

  return list;
});
</script>
```

设计要点：
- 使用 `computed` 派生过滤结果，避免手动维护状态。
- 搜索和筛选条件由用户输入控制。
- 排序时先浅拷贝数组，避免修改原数组。
- 大数据量时使用分页或虚拟列表。

**评分维度**：
- 能设计合理的组件拆分（25%）
- 能用 computed 实现派生数据（30%）
- 能处理关键词、分类、排序组合逻辑（25%）
- 能提到分页或虚拟列表性能优化（20%）

**常见错误**：
- 直接修改 props.products 进行过滤。
- 在 methods 中重复计算过滤结果。
- 排序时修改原数组导致副作用。

**延伸追问**：
- 如果筛选条件很多，如何管理状态？
- 搜索接口是后端分页时，前端如何设计？

**相关题目**：
- [FB-16-CO-B-006 computed、methods、watch](#FB-16-CO-B-006)
- [FB-16-PE-A-001 Vue 长列表优化](#FB-16-PE-A-001)

**参考资源**：
- [Vue 官方文档 - Computed Properties](https://vuejs.org/guide/essentials/computed.html)

**口头回答版**：
> 商品列表我会拆成搜索、筛选、排序和列表展示几个组件。用 computed 根据 keyword、category、sortBy 派生 filteredProducts，避免手动维护。排序时先拷贝数组再 sort。数据量大要加分页或虚拟列表。

---

### FB-16-SD-A-001：如何设计 Vue 项目的权限路由系统？

**题型**：系统设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、权限路由、路由守卫、动态路由、角色权限
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明在 Vue Router 4 项目中，如何设计基于角色的权限路由系统。

**参考答案**：

方案：

1. **路由元信息标记权限**：

```js
{
  path: '/admin',
  component: AdminPage,
  meta: { roles: ['admin'] }
}
```

2. **全局前置守卫校验**：

```js
router.beforeEach((to, from, next) => {
  const userRole = getUserRole();
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    next('/403');
  } else {
    next();
  }
});
```

3. **动态路由注册**：
   - 根据后端返回的权限菜单动态生成路由表。
   - 使用 `router.addRoute` 动态添加。

4. **菜单过滤**：
   - 根据权限过滤导航菜单，只展示有权限的入口。

5. **按钮级权限**：
   - 通过自定义指令 `v-permission` 或组件封装控制。

最佳实践：
- 路由配置与权限数据解耦。
- 服务端返回权限标识，前端只做渲染控制。
- 401/403 统一处理。

**评分维度**：
- 能说明路由元信息和守卫校验（30%）
- 能说明动态路由生成（25%）
- 能说明菜单和按钮级权限（25%）
- 能提到服务端权限控制不可少（20%）

**常见错误**：
- 仅在前端隐藏菜单就认为安全。
- 权限写死在前端，无法动态调整。
- 动态路由添加后未处理 404。

**延伸追问**：
- 如何处理刷新后动态路由丢失？
- 如何实现按钮级权限？

**相关题目**：
- [FB-16-CO-A-015 Vue Router v4](#FB-16-CO-A-015)
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-026)

**参考资源**：
- [Vue Router 官方文档 - Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)

**口头回答版**：
> 权限路由可以在路由 meta 里加 roles，然后 router.beforeEach 判断用户角色是否匹配。复杂场景后端返回权限菜单，前端用 router.addRoute 动态加路由。菜单和按钮也要根据权限过滤。注意前端隐藏不等于安全，接口权限服务端也要校验。

---

### FB-16-FS-A-001：Vue 3 的 Scheduler 调度器是如何工作的？

**题型**：框架原理题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue 3、Scheduler、响应式、nextTick、异步更新
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请简述 Vue 3 Scheduler 调度器的作用和基本流程。

**参考答案**：

Scheduler 作用：
- 管理响应式副作用（effect）的执行顺序。
- 将同一事件循环内的多次数据变更合并为一次 DOM 更新。
- 支持异步调度、nextTick、 job 队列优先级。

基本流程：

1. **触发 trigger**：响应式数据变化时，将相关 effect 包装成 job 加入队列。
2. **去重**：通过 job.id 避免同一 effect 重复执行。
3. **异步刷新**：使用 Promise.then / MutationObserver / setTimeout 降级。
4. **执行队列**：按 job 的 id 排序，依次执行 effect，更新 DOM。
5. **nextTick**：队列清空后执行注册的回调。

核心效果：
- 同一事件循环中多次修改同一响应式数据，只触发一次渲染。
- 组件更新按从父到子的顺序执行。

**评分维度**：
- 能说明 Scheduler 合并更新的作用（30%）
- 能说明 job 队列和去重（25%）
- 能说明异步刷新机制（25%）
- 能联系 nextTick 的使用（20%）

**常见错误**：
- 认为每次数据变化都立即更新 DOM。
- 混淆 Scheduler 和 effect 的关系。
- 认为 job 队列是无序的。

**延伸追问**：
- Vue 3 的 effect 队列为什么是边清理边执行？
- 如何保证父组件先更新？

**相关题目**：
- [FB-16-CO-A-013 nextTick](#FB-16-CO-A-013)
- [FB-16-FS-P-018 Vue 3 响应式原理](#FB-16-FS-P-018)

**参考资源**：
- [Vue 3 源码 - scheduler.ts](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/scheduler.ts)
- [Vue 官方文档 - Rendering Mechanism](https://vuejs.org/guide/extras/rendering-mechanism.html)

**口头回答版**：
> Vue 3 的 Scheduler 负责把同一事件循环里的多次数据变化合并成一次 DOM 更新。响应式数据变化时把 effect 包装成 job 放进队列，去重后异步刷新，nextTick 在队列清空后执行。这样避免每次改数据都重新渲染。

---

### FB-16-PE-A-001：Vue 长列表性能优化有哪些方案？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、长列表、虚拟滚动、分页、性能优化
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 Vue 应用中长列表渲染的性能问题及优化方案。

**参考答案**：

性能问题：
- 大量 DOM 节点导致内存占用高。
- 初始化渲染和滚动卡顿。
- diff 和 patch 开销大。

优化方案：

1. **分页加载**：
   - 后端分页，前端每次只渲染当前页数据。

2. **虚拟滚动**：
   - 只渲染可视区及缓冲区的节点。
   - 常用库：vue-virtual-scroller、vue-virtual-scroll-grid。

3. **延迟加载 / 无限滚动**：
   - 滚动到底部再加载下一批数据。

4. **减少响应式粒度**：
   - 对只展示不修改的数据使用 `Object.freeze` 或 `shallowRef`。

5. **key 优化**：
   - 使用稳定唯一 ID。

6. **v-memo**：
   - 对列表项缓存，依赖不变不重新渲染。

7. **骨架屏或占位**：
   - 大数据加载前显示占位，减少白屏时间。

**评分维度**：
- 能说明长列表性能瓶颈（20%）
- 能列举分页、虚拟滚动、无限滚动（40%）
- 能提到减少响应式粒度和 v-memo（20%）
- 能结合业务场景选择方案（20%）

**常见错误**：
- 所有列表都引入虚拟滚动。
- 对只读数据仍使用深层响应式。
- 虚拟滚动时没有处理好动态高度。

**延伸追问**：
- 虚拟滚动如何处理动态高度的列表项？
- 无限滚动如何避免重复请求？

**相关题目**：
- [FB-16-PE-P-023 Vue 性能优化](#FB-16-PE-P-023)
- [FB-16-PE-P-024 首屏性能优化进阶](#FB-16-PE-P-024)

**参考资源**：
- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [Vue 官方文档 - Performance](https://vuejs.org/guide/best-practices/performance.html)

**口头回答版**：
> 长列表优化首先考虑分页，前端一次渲染少量数据。数据量大但要在同一页展示就用虚拟滚动，只渲染可视区。无限滚动适合 feed 流。另外只读数据可以 Object.freeze 或 shallowRef 减少响应式开销，key 用稳定 id，必要时用 v-memo。

---

### FB-16-EN-A-001：Vue 项目中 ESLint、Prettier 和 Vitest 如何集成？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue、ESLint、Prettier、Vitest、工程化、代码质量
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明如何在 Vue 3 + Vite 项目中集成 ESLint、Prettier 和 Vitest，并保证配置不冲突。

**参考答案**：

1. **ESLint**：

```bash
npm install -D eslint eslint-plugin-vue @eslint/js
```

```js
// eslint.config.js
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: '@typescript-eslint/parser' } }
  }
];
```

2. **Prettier**：

```bash
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

- 使用 `eslint-config-prettier` 关闭与 ESLint 冲突的规则。
- 使用 `eslint-plugin-prettier` 将 Prettier 作为 ESLint 规则运行。

3. **Vitest**：

```bash
npm install -D vitest @vue/test-utils happy-dom
```

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom'
  }
});
```

最佳实践：
- 使用 lint-staged + Husky 在提交前自动格式化。
- Prettier 负责格式，ESLint 负责代码质量。
- Vitest 与 Vite 配置共享，测试使用 `@vue/test-utils`。

**评分维度**：
- 能配置 ESLint 和 Vue 插件（25%）
- 能解决 Prettier 与 ESLint 冲突（25%）
- 能配置 Vitest 和测试环境（25%）
- 能提到提交前检查（25%）

**常见错误**：
- ESLint 和 Prettier 规则冲突导致格式错误。
- 测试环境使用 jsdom 但缺少必要 polyfill。
- 将格式和质量问题混为一谈。

**延伸追问**：
- 如何为 Vue SFC 中的 TypeScript 配置 ESLint？
- Vitest 和 Jest 在 Vue 项目中的主要区别是什么？

**相关题目**：
- [FB-16-EN-B-001 Vue CLI 与 Vite](#FB-16-EN-B-001)
- [FB-16-SD-R-027 Vue 组件库设计](#FB-16-SD-R-027)

**参考资源**：
- [ESLint Plugin Vue](https://eslint.vuejs.org/)
- [Vitest 官方文档](https://vitest.dev/)

**口头回答版**：
> Vue 3 项目里 ESLint 用 eslint-plugin-vue，Prettier 用 eslint-config-prettier 关掉冲突规则，再用 eslint-plugin-prettier 把格式问题暴露出来。Vitest 和 Vite 共享配置，测试环境用 happy-dom 或 jsdom，组件测试用 @vue/test-utils。提交前再用 lint-staged 跑格式和检查。

---

### FB-16-SE-A-001：Vue 中如何安全地使用 v-html？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：16 Vue
**标签**：Vue、v-html、XSS、DOMPurify、安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在 Vue 中使用 `v-html` 渲染富文本时，如何防止 XSS 攻击。

**参考答案**：

安全使用步骤：

1. **避免直接使用**：
   - 除非必要，否则使用 `&#123;&#123; &#125;&#125;` 文本插值。

2. **输入校验与过滤**：
   - 在服务端对富文本进行白名单过滤。
   - 前端使用 DOMPurify 等库二次过滤。

```vue
<script setup>
import DOMPurify from 'dompurify';
import { ref } from 'vue';

const raw = ref('<p>Hello</p><script>alert(1)<\/script>');
const safeHtml = computed(() => DOMPurify.sanitize(raw.value));
</script>

<template>
  <div v-html="safeHtml"></div>
</template>
```

3. **CSP 策略**：
   - 配置 `Content-Security-Policy` 禁止内联脚本执行。

4. **限制使用场景**：
   - 只在受信任的内容管理后台、邮件模板等场景使用。
   - 不用于渲染用户评论等不可控内容。

**评分维度**：
- 能说明 v-html 的 XSS 风险（30%）
- 能使用 DOMPurify 等库过滤（30%）
- 能提到服务端白名单过滤（20%）
- 能提到 CSP 和场景限制（20%）

**常见错误**：
- 直接 v-html 渲染用户输入。
- 用正则简单过滤 HTML 标签。
- 认为前端过滤就足够安全。

**延伸追问**：
- 如果必须使用用户输入的 HTML，有哪些额外防护措施？
- 如何对 iframe、style 标签做限制？

**相关题目**：
- [FB-16-SE-B-001 Vue XSS 风险](#FB-16-SE-B-001)
- [FB-16-CO-B-009 内置指令](#FB-16-CO-B-009)

**参考资源**：
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [Vue 官方文档 - v-html](https://vuejs.org/guide/essentials/template-syntax.html#raw-html)

**口头回答版**：
> v-html 会直接把 HTML 渲染到页面，有 XSS 风险。用的时候一定要先过滤，可以用 DOMPurify 做白名单过滤。服务端也要过滤，另外配 CSP 禁止内联脚本。尽量不要用 v-html 渲染用户评论这类不可控内容。

---

### FB-16-CP-A-001：Vue 单页应用的 SEO 优化有哪些思路？

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、SEO、SSR、SSG、预渲染、meta
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 Vue SPA 在 SEO 方面面临的问题及优化思路。

**参考答案**：

SEO 问题：
- 客户端渲染导致搜索引擎爬虫难以抓取完整内容。
- 首屏 HTML 为空或只有占位符。
- 动态路由和 meta 信息难以管理。

优化思路：

1. **SSR / SSG**：
   - 使用 Nuxt 3 实现服务端渲染或静态生成。
   - 对内容型页面优先 SSG，对动态数据页面使用 SSR。

2. **预渲染（Prerendering）**：
   - 使用 `vite-plugin-ssr` 或 `prerender-spa-plugin` 对关键页面预渲染。

3. **合理的 meta 和路由**：
   - 使用 `vue-meta` 或 Nuxt 的 `useHead` 管理标题、描述、Open Graph。

4. **语义化 HTML**：
   - 使用正确的标签结构，避免全部使用 div。

5. **Sitemap 和 robots.txt**：
   - 主动提交搜索引擎。

6. **性能优化**：
   - 首屏加载速度也是 SEO 排名因素。

**评分维度**：
- 能说明 SPA SEO 问题（25%）
- 能说明 SSR/SSG 方案（30%）
- 能提到预渲染和 meta 管理（25%）
- 能提到语义化和站点地图（20%）

**常见错误**：
- 所有页面都使用 SSR，忽略成本。
- 只在客户端设置 meta，搜索引擎无法抓取。
- 忽略图片 alt 和链接可访问性。

**延伸追问**：
- Nuxt 3 中 useHead 和 useSeoMeta 有什么区别？
- 如何为动态路由生成 Sitemap？

**相关题目**：
- [FB-16-FS-P-025 Vue SSR / Nuxt 3](#FB-16-FS-P-025)
- [FB-16-SD-R-038 Vue SSR 架构设计](#FB-16-SD-R-038)

**参考资源**：
- [Nuxt 3 - SEO and Meta](https://nuxt.com/docs/getting-started/seo-meta-teleports)
- [Google 搜索中心 - JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

**口头回答版**：
> Vue SPA 对 SEO 不友好，因为内容是客户端渲染，爬虫可能抓不到。优化可以用 Nuxt 3 做 SSR 或 SSG，关键页面预渲染，用 useHead 管理 title 和 meta。还要注意语义化 HTML、站点地图和首屏性能。

---

## 深入题（9 道）{#proficient-2}

### FB-16-FS-P-026：Vue 3 的 effectScope 是什么？有什么作用？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue 3、effectScope、响应式、副作用、Composable
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请解释 Vue 3 中 `effectScope` 的作用、使用场景及与 Composable 的关系。

**参考答案**：

`effectScope` 用于创建一个作用域，收集该作用域内的所有响应式副作用（effect），并可以一次性停止它们。

基本用法：

```js
import { effectScope, ref, watch, computed } from 'vue';

const scope = effectScope();

scope.run(() => {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  watch(double, (val) => console.log(val));
});

// 一次性停止作用域内所有 effect
scope.stop();
```

使用场景：

1. **高级 Composable 封装**：
   - 在组件卸载或条件变化时统一清理多个 watch/computed。

2. **外部状态管理**：
   - 当响应式逻辑不绑定到具体组件时，手动控制生命周期。

3. **测试隔离**：
   - 测试结束后停止作用域，避免影响其他测试。

与组件的关系：
- 每个 Vue 组件实例内部都有一个 effectScope，组件卸载时自动 stop。
- `getCurrentScope()` 可获取当前作用域。

**评分维度**：
- 能说明 effectScope 收集并停止副作用（30%）
- 能写出基本用法示例（25%）
- 能说明在 Composable 和外部状态中的使用场景（25%）
- 能联系组件内置作用域（20%）

**常见错误**：
- 认为 effectScope 可以替代 watch 的停止函数。
- 在 scope.run 外访问内部变量导致无法清理。
- 滥用 effectScope 导致逻辑分散。

**延伸追问**：
- effectScope 和 Vue 组件的 effect 作用域有什么关系？
- 如何在 Composable 中优雅地使用 onScopeDispose？

**相关题目**：
- [FB-16-CO-A-010 watch 与 watchEffect](#FB-16-CO-A-010)
- [FB-16-CD-P-001 手写 useEventListener](#FB-16-CD-P-001)

**参考资源**：
- [Vue 官方文档 - effectScope](https://vuejs.org/api/reactivity-advanced.html#effectscope)
- [Vue 3 源码 - effectScope.ts](https://github.com/vuejs/core/blob/main/packages/reactivity/src/effectScope.ts)

**口头回答版**：
> effectScope 是 Vue 3 提供的一个 API，用来创建一个作用域，把里面的 computed、watch 等副作用都收集起来，之后可以一次性 stop。适合在高级 Composable 里统一清理副作用，或者做一些不绑定组件的响应式逻辑。

---

### FB-16-CO-P-023：Vue 3 中 toRef、toRefs、isRef、unref 有什么区别？

**题型**：概念题 / 代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue 3、toRef、toRefs、isRef、unref、响应式
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 `toRef`、`toRefs`、`isRef`、`unref` 的作用和使用场景。

**参考答案**：

| API | 作用 | 示例 |
|-----|------|------|
| `isRef` | 判断值是否为 ref | `isRef(count)` |
| `unref` | 如果是 ref 返回 `.value`，否则返回值 | `unref(count)` |
| `toRef` | 为 reactive 对象的某个属性创建 ref，保持响应式 | `toRef(user, 'name')` |
| `toRefs` | 将 reactive 对象的所有属性转为 refs | `toRefs(user)` |

toRef 示例：

```js
const user = reactive({ name: 'Tom' });
const name = toRef(user, 'name');
name.value = 'Jerry'; // user.name 也会变
```

toRefs 示例：

```js
const user = reactive({ name: 'Tom', age: 20 });
const { name, age } = toRefs(user);
// name 和 age 都是 ref，且与 user 保持响应式
```

使用场景：
- `isRef` / `unref`：编写通用 Composable 时处理可能是 ref 的值。
- `toRef`：只提取 reactive 对象的某个属性并保持响应式。
- `toRefs`：解构 reactive 对象时保持响应式。

**评分维度**：
- 能说明 isRef / unref 的用途（25%）
- 能说明 toRef 保持响应式的原理（30%）
- 能说明 toRefs 解决解构丢失响应式的问题（30%）
- 能给出使用场景（15%）

**常见错误**：
- 认为 toRef 会复制值而不是建立引用。
- 用 toRefs 处理非 reactive 对象。
- 混淆 unref 和 toRef。

**延伸追问**：
- toRef 和直接写 ref(user.name) 有什么区别？
- toRefs 返回的对象是否还能响应 user 新增的属性？

**相关题目**：
- [FB-16-CO-A-009 ref 和 reactive](#FB-16-CO-A-009)
- [FB-16-FS-P-020 响应式坑](#FB-16-FS-P-020)

**参考资源**：
- [Vue 官方文档 - toRef / toRefs](https://vuejs.org/api/reactivity-utilities.html)

**口头回答版**：
> isRef 判断是不是 ref，unref 帮你自动取 .value。toRef 是给 reactive 对象的某个属性建一个 ref，保持响应式。toRefs 是把整个 reactive 对象的属性都转成 ref，这样解构出来才不会丢响应式。

---

### FB-16-CA-P-001：分析异步组件与 Suspense 的错误处理行为

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue 3、异步组件、Suspense、错误处理、onErrorCaptured
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
分析以下代码，说明当异步组件加载失败时会发生什么。

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComp />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComp = defineAsyncComponent(() => import('./AsyncComp.vue'));
</script>
```

**参考答案**：

- 当 `import('./AsyncComp.vue')` 失败时，默认情况下 Suspense 的 fallback 会一直显示，因为没有提供错误处理。
- Vue 不会自动捕获异步组件加载错误，错误会向上传播。
- 可以通过 `onErrorCaptured` 捕获错误，或包装异步组件提供 `errorComponent`。

改进方案：

```js
const AsyncComp = defineAsyncComponent({
  loader: () => import('./AsyncComp.vue'),
  errorComponent: ErrorComp,
  delay: 200,
  timeout: 3000
});
```

```vue
<script setup>
import { onErrorCaptured } from 'vue';

onErrorCaptured((err) => {
  console.error(err);
  return false; // 阻止继续传播
});
</script>
```

**评分维度**：
- 能说明默认情况下加载失败没有错误边界（30%）
- 能说明 Suspense 不处理加载错误（25%）
- 能使用 defineAsyncComponent 的 errorComponent（25%）
- 能使用 onErrorCaptured 捕获错误（20%）

**常见错误**：
- 认为 Suspense 会自动捕获并显示错误。
- 忽略网络超时处理。
- 在 onErrorCaptured 中返回 true 导致错误继续传播。

**延伸追问**：
- Suspense 和 Error Boundary 在 Vue 中如何配合？
- defineAsyncComponent 的 loadingComponent 和 delay 参数有什么用？

**相关题目**：
- [FB-16-FS-P-024 Teleport / Suspense / Fragment](#FB-16-FS-P-024)
- [FB-16-CO-A-012 Vue 生命周期](#FB-16-CO-A-012)

**参考资源**：
- [Vue 官方文档 - Async Components](https://vuejs.org/guide/components/async.html)
- [Vue 官方文档 - Suspense](https://vuejs.org/guide/built-ins/suspense.html)

**口头回答版**：
> 异步组件加载失败时，Suspense 默认不会处理错误，fallback 可能一直挂着。要用 defineAsyncComponent 的 errorComponent 指定错误组件，或者用 onErrorCaptured 捕获。另外可以配 timeout 和 delay 优化体验。

---

### FB-16-CD-P-001：手写一个 useEventListener Composable

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue 3、Composable、useEventListener、手写代码、生命周期
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请用 Vue 3 实现一个 `useEventListener` Composable，支持元素、事件类型、回调函数，并在组件卸载时自动解绑。

**参考答案**：

```js
import { isRef, watch, onMounted, onUnmounted, unref } from 'vue';

export function useEventListener(target, event, callback, options = {}) {
  let cleanup = () => {};

  const addListener = (el) => {
    el.addEventListener(event, callback, options);
    cleanup = () => el.removeEventListener(event, callback, options);
  };

  if (isRef(target)) {
    watch(target, (newEl, oldEl) => {
      cleanup();
      if (newEl) addListener(newEl);
    }, { immediate: true });
  } else {
    onMounted(() => addListener(unref(target)));
  }

  onUnmounted(() => cleanup());
}
```

使用：

```vue
<script setup>
import { ref } from 'vue';
import { useEventListener } from './useEventListener';

const btn = ref(null);
useEventListener(btn, 'click', () => console.log('clicked'));
useEventListener(window, 'resize', () => console.log('resized'));
</script>

<template>
  <button ref="btn">点击</button>
</template>
```

要点：
- 支持 ref 和普通目标。
- 目标变化时自动解绑旧事件。
- 组件卸载时清理。

**评分维度**：
- 能正确 add/remove EventListener（30%）
- 能在 onUnmounted 中清理（25%）
- 能支持 ref 目标并响应变化（25%）
- 代码复用性和边界处理（20%）

**常见错误**：
- 忘记在卸载时解绑事件导致内存泄漏。
- 没有处理 ref 目标变化。
- 直接使用 addEventListener 而不考虑 SSR。

**延伸追问**：
- 如何支持多个事件或事件委托？
- 如果目标在 SSR 时不存在，如何处理？

**相关题目**：
- [FB-16-FS-P-026 effectScope](#FB-16-FS-P-026)
- [FB-16-CD-A-014 手写 Vue Composable](#FB-16-CD-A-014)

**参考资源**：
- [VueUse - useEventListener](https://vueuse.org/core/useEventListener/)
- [Vue 官方文档 - Composables](https://vuejs.org/guide/reusability/composables.html)

**口头回答版**：
> useEventListener 就是封装 addEventListener 和 removeEventListener。接收 target、事件名、回调。target 可以是 ref，变化时先解绑旧的再绑定新的。组件卸载时要在 onUnmounted 里 cleanup，防止内存泄漏。

---

### FB-16-SC-P-001：如何设计一个可拖拽排序的 Vue 列表组件？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue、拖拽排序、Sortable、组件设计、交互
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个可拖拽排序的列表组件，支持拖拽后更新数据顺序，并说明实现方案和性能考虑。

**参考答案**：

方案一：使用 SortableJS + Vue

```vue
<script setup>
import { ref, onMounted } from 'vue';
import Sortable from 'sortablejs';

const list = ref([
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' }
]);
const listEl = ref(null);

onMounted(() => {
  if (!listEl.value) return;
  Sortable.create(listEl.value, {
    animation: 150,
    onEnd(evt) {
      const moved = list.value.splice(evt.oldIndex, 1)[0];
      list.value.splice(evt.newIndex, 0, moved);
    }
  });
});
</script>

<template>
  <ul ref="listEl">
    <li v-for="item in list" :key="item.id">&#123;&#123; item.name &#125;&#125;</li>
  </ul>
</template>
```

方案二：HTML5 Drag and Drop API
- 自己实现 dragstart、dragover、drop 事件。
- 更轻量但兼容性处理较多。

性能考虑：
- 大数据列表使用虚拟滚动。
- 拖拽时避免频繁全量重渲染。
- 拖拽结束后一次性更新数据顺序。

**评分维度**：
- 能选择合适的技术方案（25%）
- 能正确维护数据顺序（30%）
- 能处理 key 稳定和 DOM 同步（20%）
- 能提到大数据性能优化（25%）

**常见错误**：
- 直接操作 DOM 而不更新数据。
- 使用 index 作为 key 导致拖拽异常。
- 每次拖拽都触发大量响应式更新。

**延伸追问**：
- 如何在拖拽过程中显示占位元素？
- 跨列表拖拽如何设计数据流？

**相关题目**：
- [FB-16-PE-A-001 Vue 长列表优化](#FB-16-PE-A-001)
- [FB-16-SC-A-001 商品列表组件](#FB-16-SC-A-001)

**参考资源**：
- [SortableJS](https://sortablejs.github.io/Sortable/)
- [Vue 官方文档 - Template Refs](https://vuejs.org/guide/essentials/template-refs.html)

**口头回答版**：
> 可拖拽列表我一般用 SortableJS，在 onMounted 里对列表 ref 创建 Sortable 实例，在 onEnd 回调里用 splice 调整数组顺序。key 要用稳定 id，不能用 index。数据量大时配合虚拟滚动，避免拖拽时大量重渲染。

---

### FB-16-PE-P-024：Vue 应用首屏加载性能如何系统优化？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：16 Vue
**标签**：Vue、首屏性能、懒加载、代码分割、SSR、资源优化
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请从构建、网络、渲染等角度，系统说明 Vue 应用首屏加载性能的优化方案。

**参考答案**：

一、构建优化

1. **代码分割**：
   - 路由组件懒加载。
   - 异步加载非首屏组件和库。

2. **Tree Shaking**：
   - 使用 ES Modules，避免全量引入库。

3. **压缩与混淆**：
   - 启用 gzip/brotli、代码压缩、图片压缩。

4. **依赖分包**：
   - 将第三方库单独打包并缓存。

二、网络优化

1. **CDN 加速**：
   - 静态资源放 CDN。
2. **HTTP 缓存**：
   - 合理配置 Cache-Control 和文件名 hash。
3. **预加载关键资源**：
   - 使用 `<link rel="preload">` 和 `prefetch`。

三、渲染优化

1. **SSR / SSG**：
   - 使用 Nuxt 3 或 Vite SSR 直接输出 HTML。

2. **骨架屏 / 占位**：
   - 减少白屏时间。

3. **关键 CSS 内联**：
   - 首屏样式直接写入 HTML。

4. **延迟非关键 JS**：
   - 使用 `defer` / `async`。

四、运行时优化

1. 减少全局组件和插件注册。
2. 使用 `shallowRef` / `shallowReactive` 降低响应式开销。

**评分维度**：
- 能从构建、网络、渲染、运行时多角度回答（30%）
- 能列举至少 6 个具体优化手段（40%）
- 能说明 SSR/SSG 对首屏的意义（20%）
- 能提到缓存和分包策略（10%）

**常见错误**：
- 只关注代码层面，忽略网络和服务器配置。
- 所有路由组件都同步加载。
- 图片、字体等大资源未优化。

**延伸追问**：
- 如何用 Chrome DevTools 分析首屏瓶颈？
- SSR 和 SSG 在首屏性能上有什么取舍？

**相关题目**：
- [FB-16-PE-P-023 Vue 性能优化](#FB-16-PE-P-023)
- [FB-16-FS-P-025 Vue SSR / Nuxt 3](#FB-16-FS-P-025)

**参考资源**：
- [Vue 官方文档 - Performance](https://vuejs.org/guide/best-practices/performance.html)
- [Web Vitals](https://web.dev/vitals/)

**口头回答版**：
> 首屏优化分几方面：构建上做路由懒加载、tree shaking、依赖分包；网络上用 CDN、缓存、预加载关键资源；渲染上考虑 SSR/SSG、骨架屏、关键 CSS 内联；运行时减少全局组件和过度响应式。配合 Lighthouse 和 Web Vitals 指标分析。

---

### FB-16-SE-P-001：Vue 应用中如何防御 CSRF 攻击？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue、CSRF、安全、Token、Cookie、SameSite
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Vue 应用中 CSRF 攻击的原理及防御方案。

**参考答案**：

CSRF 原理：
- 攻击者诱导用户在已登录状态下访问恶意站点。
- 恶意站点自动向目标站点发起请求，浏览器自动携带目标站点的 Cookie。
- 目标站点误以为是用户本人操作。

防御方案：

1. **CSRF Token**：
   - 后端生成 Token，前端在请求头或表单中携带。
   - 后端校验 Token 是否匹配当前会话。

2. **SameSite Cookie**：
   - 设置 `SameSite=Strict` 或 `Lax`，限制跨站请求携带 Cookie。

3. **校验 Origin / Referer**：
   - 后端检查请求来源是否合法。

4. **双重 Cookie 验证**：
   - 随机值同时存在 Cookie 和请求参数中，后端比对。

Vue 中实践：
- 在 axios 拦截器中统一添加 CSRF Token 头。
- 不要在前端硬编码密钥或 Token。
- 敏感操作增加二次确认或验证码。

**评分维度**：
- 能说明 CSRF 攻击原理（25%）
- 能说明 CSRF Token 防御机制（30%）
- 能说明 SameSite Cookie 的作用（25%）
- 能给出 Vue/axios 中的实践（20%）

**常见错误**：
- 认为只要前端做了校验就安全。
- 将 Token 存在 localStorage 中不发送给后端。
- 忽略 SameSite 兼容性。

**延伸追问**：
- CSRF 和 XSS 有什么区别？
- 前后端分离项目如何传递 CSRF Token？

**相关题目**：
- [FB-16-SE-B-001 Vue XSS 风险](#FB-16-SE-B-001)
- [FB-16-SE-A-001 v-html 安全](#FB-16-SE-A-001)

**参考资源**：
- [OWASP CSRF 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [MDN - SameSite Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

**口头回答版**：
> CSRF 是攻击者利用用户已登录的 Cookie 冒充用户发起请求。防御主要靠 CSRF Token，前端在请求头里带上，后端校验。还要设置 Cookie 的 SameSite 属性，敏感操作校验 Origin 或 Referer。Vue 里一般在 axios 拦截器统一加 Token。

---

### FB-16-EN-P-001：如何使用 Vite 构建一个支持 Tree Shaking 的 Vue 组件库？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：16 Vue
**标签**：Vue、Vite、组件库、Tree Shaking、Rollup、sideEffects
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明使用 Vite 构建 Vue 组件库时的关键配置，确保支持 Tree Shaking 和多格式输出。

**参考答案**：

关键配置：

1. **vite.config.ts**：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyVueLib',
      fileName: (format) => `my-vue-lib.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }
});
```

2. **package.json**：

```json
{
  "main": "dist/my-vue-lib.cjs.js",
  "module": "dist/my-vue-lib.es.js",
  "types": "dist/index.d.ts",
  "sideEffects": ["*.css", "*.scss"]
}
```

3. **入口文件按需导出**：

```ts
export { default as Button } from './Button.vue';
export { default as Input } from './Input.vue';
```

4. **样式隔离**：
   - 组件使用 scoped 或 CSS Modules。
   - 主题变量通过 CSS Variables 提供。

要点：
- `vue` 设置为 external，避免打包进库。
- `sideEffects` 只标记真的有副作用的文件。
- 提供 ESM、CJS、UMD 三种格式。

**评分维度**：
- 能配置 Vite lib 构建（30%）
- 能设置 external 和 globals（20%）
- 能配置 package.json 的 module 和 sideEffects（25%）
- 能说明按需导出和样式隔离（25%）

**常见错误**：
- 将 vue 打包进组件库。
- sideEffects 设置为 false 导致样式被 tree shake 掉。
- 只输出 UMD 格式，不支持 ESM 按需加载。

**延伸追问**：
- 如何为组件库提供 unplugin 自动导入？
- 如何配置 Monorepo 管理多个子包？

**相关题目**：
- [FB-16-SD-R-027 Vue 组件库设计](#FB-16-SD-R-027)
- [FB-16-EN-A-001 ESLint/Prettier/Vitest](#FB-16-EN-A-001)

**参考资源**：
- [Vite 官方文档 - Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Vue 官方文档 - SFC](https://vuejs.org/guide/scaling-up/sfc.html)

**口头回答版**：
> 用 Vite 构建 Vue 组件库，要在 vite.config.ts 里用 build.lib 配置入口和输出格式，把 vue 设为 external，rollupOptions 里配 globals。package.json 里要指定 module、main、types 和 sideEffects，sideEffects 要把 CSS 文件列出来，否则样式可能被 tree shake。入口文件按需导出组件。

---

### FB-16-CP-P-001：Vue 与 React 生态选型时应考虑哪些因素？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：16 Vue
**标签**：Vue、React、技术选型、生态、团队、架构
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请从技术特点、生态、团队、业务等角度，分析 Vue 与 React 的选型考量。

**参考答案**：

一、技术特点

| 维度 | Vue | React |
|------|-----|-------|
| 模板 | 模板语法，接近 HTML | JSX，更接近 JavaScript |
| 响应式 | 自动依赖追踪 | 显式 setState / useState |
| 学习曲线 | 对新手更友好 | 需要理解更多概念 |
| 灵活性 | 渐进式，约定较多 | 更开放，生态选择多 |

二、生态

- Vue：Vue Router、Pinia、Nuxt、Element Plus、Vuetify。
- React：React Router、Redux/Zustand、Next.js、Ant Design、MUI。

三、团队与业务

- 团队背景：前端经验、TypeScript 熟练度。
- 业务场景：中后台、C 端、SSR/SSG 需求。
- 存量系统：是否有历史代码需要迁移。
- 招聘与人才市场：当地 Vue/React 人才比例。

四、选型原则

- 没有绝对优劣，只有适合与否。
- 优先选择团队熟悉、生态能满足业务的技术栈。
- 大型企业可考虑统一技术栈以降低维护成本。

**评分维度**：
- 能对比技术特点（30%）
- 能说明生态差异（25%）
- 能结合团队和业务分析（25%）
- 能给出理性选型结论（20%）

**常见错误**：
- 仅凭个人偏好选型。
- 忽略团队学习成本。
- 忽视存量系统和迁移成本。

**延伸追问**：
- 如果团队熟悉 Vue，但业务需要 Next.js 的 SSR 生态，怎么决策？
- Vue 和 React 在大型项目中的维护性有何差异？

**相关题目**：
- [FB-16-CO-B-001 Vue 2 与 Vue 3 区别](#FB-16-CO-B-001)
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-026)

**参考资源**：
- [Vue 官方文档 - Introduction](https://vuejs.org/guide/introduction.html)
- [React 官方文档](https://react.dev/)

**口头回答版**：
> Vue 模板语法接近 HTML，响应式自动追踪，学习曲线相对平缓；React 用 JSX，更灵活但选择多。选型要看团队熟悉度、业务场景、生态是否能满足，比如需要 SSR 可以选 Nuxt 或 Next。没有绝对好坏，适合团队和项目最重要。

---

## 架构题（39 道）{#architect-2}

### FB-16-SD-R-032：如何设计 Vue 中后台管理系统的模块架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、中后台、架构、模块化、路由、权限
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请从目录结构、路由、权限、状态管理、组件设计等方面，设计一个 Vue 中后台管理系统的模块架构。

**参考答案**：

一、目录结构

```text
src/
├── api/                # 按模块组织接口
├── assets/
├── components/         # 通用基础组件
├── composables/        # 通用逻辑
├── directives/         # 自定义指令
├── layouts/            # 布局
├── modules/            # 业务模块
│   ├── user/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── router.ts
│   ├── order/
│   └── system/
├── router/             # 路由入口和守卫
├── stores/             # 全局状态
├── styles/             # 主题和全局样式
└── utils/              # 工具函数
```

二、路由设计

- 公共路由：登录、404。
- 动态路由：根据权限菜单动态 addRoute。
- 路由守卫统一处理鉴权、标题、埋点。

三、权限设计

- 路由权限：meta.roles。
- 菜单权限：过滤 visible。
- 按钮权限：v-permission 指令。

四、状态管理

- 全局：Pinia（user、app、settings）。
- 模块内：局部 store 或 composables。

五、组件分层

- 基础组件：BaseButton、BaseTable。
- 业务组件：UserForm、OrderList。
- 页面组件：UserPage。

**评分维度**：
- 能设计清晰的目录结构（25%）
- 能说明路由和权限方案（25%）
- 能说明状态管理分层（20%）
- 能说明组件分层和复用（20%）
- 能提到工程化和规范（10%）

**常见错误**：
- 所有页面放 views，没有按业务模块划分。
- 权限逻辑分散，重复判断。
- 全局状态过多，模块间耦合严重。

**延伸追问**：
- 如何处理多标签页和 KeepAlive？
- 如何支持主题切换和国际化？

**相关题目**：
- [FB-16-SD-A-001 权限路由系统](#FB-16-SD-A-001)
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-026)

**参考资源**：
- [Vue 官方文档 - Scaling Up](https://vuejs.org/guide/scaling-up/sfc.html)
- [Vue-Vben-Admin](https://github.com/vbenjs/vue-vben-admin)

**口头回答版**：
> 中后台项目我会按业务模块划分 modules，每个模块有自己的 api、components、pages、stores 和路由。全局用 Pinia 管用户、设置，路由守卫统一鉴权。组件分基础、业务、页面三层。按钮级权限用自定义指令。多标签页和 KeepAlive 单独封装。

---

### FB-16-SD-R-033：Vue 应用全球化（i18n）架构如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、i18n、国际化、vue-i18n、多语言、架构
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 Vue 应用的国际化架构，支持多语言切换、异步加载语言包、日期数字本地化。

**参考答案**：

一、技术选型

- 使用 `vue-i18n` 作为国际化库。
- 使用 `Intl.DateTimeFormat` / `Intl.NumberFormat` 处理日期数字。

二、语言包组织

```text
locales/
├── zh-CN/
│   ├── common.json
│   ├── user.json
│   └── validation.json
└── en-US/
    ├── common.json
    ├── user.json
    └── validation.json
```

三、异步加载

```js
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: {}
});

async function loadLocaleMessages(locale) {
  const messages = await import(`./locales/${locale}/index.js`);
  i18n.global.setLocaleMessage(locale, messages.default);
  i18n.global.locale = locale;
}
```

四、架构要点

1. 按模块拆分语言包，按需加载。
2. 语言切换时持久化到 localStorage 或用户配置。
3. 后端返回的错误码映射到前端文案。
4. 组件库、日期选择器等统一使用 locale 配置。
5. SSR 场景下在服务端注入初始语言。

**评分维度**：
- 能说明 vue-i18n 基本配置（20%）
- 能设计模块化语言包（25%）
- 能实现异步加载和切换（25%）
- 能提到日期数字本地化和 SSR 处理（20%）
- 能说明持久化和后端错误码映射（10%）

**常见错误**：
- 所有文案放在一个巨大 JSON 里。
- 同步加载所有语言包。
- 忽略复数、占位符和变量插值。

**延伸追问**：
- 如何处理从右到左（RTL）语言？
- 服务端渲染时如何确定初始语言？

**相关题目**：
- [FB-16-SD-R-032 中后台架构](#FB-16-SD-R-032)
- [FB-16-SD-R-038 Vue SSR 架构](#FB-16-SD-R-038)

**参考资源**：
- [Vue I18n 官方文档](https://vue-i18n.intlify.dev/)
- [MDN - Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

**口头回答版**：
> 国际化用 vue-i18n，语言包按模块拆成 common、user、validation 等，按需异步加载。切换语言时 setLocaleMessage 并持久化。日期数字用 Intl API。后端错误码映射到前端文案。SSR 时要服务端注入初始 locale。

---

### FB-16-SD-R-034：Vue 前端监控与错误追踪体系如何建设？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、监控、错误追踪、Sentry、埋点、可观测性
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一套 Vue 应用的监控与错误追踪体系，覆盖错误、性能、用户行为和业务指标。

**参考答案**：

一、错误监控

1. **全局错误捕获**：
   - `app.config.errorHandler` 捕获 Vue 组件错误。
   - `window.addEventListener('error')` 捕获资源加载和 JS 运行时错误。
   - `window.addEventListener('unhandledrejection')` 捕获未处理 Promise 错误。

2. **错误上报**：
   - 集成 Sentry、Fundebug 或自研上报服务。
   - 上报时附带用户信息、路由、组件栈、 release 版本。

二、性能监控

- Web Vitals：LCP、FID/INP、CLS。
- 自定义性能指标：首屏时间、接口耗时、路由切换耗时。

三、行为监控

- 埋点：点击、页面停留、转化率。
- 录屏回放：Sentry Session Replay。

四、业务指标

- 自定义事件：下单、支付、登录成功率。

五、架构设计

```text
monitor/
├── error/           # 错误捕获与上报
├── performance/     # 性能采集
├── behavior/        # 行为埋点
├── report/          # 统一上报通道
└── index.ts         # 初始化入口
```

**评分维度**：
- 能说明全局错误捕获方式（25%）
- 能说明性能监控指标（20%）
- 能说明埋点和行为监控（20%）
- 能设计统一上报和采样策略（20%）
- 能提到隐私和 GDPR 合规（15%）

**常见错误**：
- 只在开发环境打 console，生产环境无监控。
- 错误上报本身导致死循环。
- 忽略性能监控只关注错误。

**延伸追问**：
- 如何防止错误上报服务本身故障影响业务？
- 如何设计采样率控制上报量？

**相关题目**：
- [FB-16-A06-observability 相关题](#)
- [FB-16-SD-R-032 中后台架构](#FB-16-SD-R-032)

**参考资源**：
- [Sentry for Vue](https://docs.sentry.io/platforms/javascript/guides/vue/)
- [Vue 官方文档 - errorHandler](https://vuejs.org/api/application.html#app-config-errorhandler)

**口头回答版**：
> 前端监控分错误、性能、行为、业务指标四块。错误用 app.config.errorHandler、window.onerror、unhandledrejection 捕获，然后上报 Sentry。性能采集 Web Vitals 和自定义指标。行为埋点用统一 SDK。要注意采样、脱敏和上报服务自身的稳定性。

---

### FB-16-SD-R-035：Vue 3 + TypeScript + Monorepo 企业级工程架构如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue 3、TypeScript、Monorepo、pnpm、架构、企业级
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个企业级 Vue 3 项目的工程架构，使用 TypeScript 和 Monorepo 管理多个应用和共享包。

**参考答案**：

一、Monorepo 选型

- 使用 pnpm workspace + Turborepo / Nx。
- 包管理器：pnpm（依赖去重、速度快）。

二、目录结构

```text
packages/
├── apps/
│   ├── admin/          # 中后台应用
│   ├── h5/             # 移动端应用
│   └── web/            # PC 端应用
├── libs/
│   ├── ui/             # 组件库
│   ├── utils/          # 工具库
│   ├── api/            # 接口封装
│   └── config/         # 共享配置
└── tools/
    ├── eslint-config/
    ├── ts-config/
    └── vite-plugins/
```

三、共享包设计

- UI 库：使用 Vite 构建，输出 ESM/CJS，配置 sideEffects。
- Utils：纯 TS，无框架依赖，方便复用。
- API：封装 axios、错误处理、请求拦截。

四、统一工程化

- TypeScript：共享 tsconfig，严格模式。
- ESLint / Prettier：共享 config 包。
- 构建：Turborepo pipeline 统一执行 build、test、lint。
- 发布：Changesets 管理版本和 changelog。

五、应用开发

- 每个应用独立 Vite 配置，引用本地 workspace 包。
- 使用 `pnpm --filter admin dev` 单独启动。

**评分维度**：
- 能设计 Monorepo 目录结构（25%）
- 能说明共享包职责（25%）
- 能说明统一工程化和构建流程（25%）
- 能提到 TypeScript 和 Changesets（15%）
- 能说明依赖管理策略（10%）

**常见错误**：
- 所有代码放一个包，没有拆分。
- 共享包耦合框架，导致无法独立使用。
- 忽略 workspace 协议和版本管理。

**延伸追问**：
- 如何处理多个应用之间的路由和部署？
- 共享包变更后如何通知依赖方升级？

**相关题目**：
- [FB-16-EN-P-001 Vite 组件库构建](#FB-16-EN-P-001)
- [FB-16-SD-R-027 Vue 组件库设计](#FB-16-SD-R-027)

**参考资源**：
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Turborepo](https://turbo.build/repo)
- [Changesets](https://github.com/changesets/changesets)

**口头回答版**：
> 企业级 Monorepo 我会用 pnpm workspace 加 Turborepo。目录分 apps、libs、tools，apps 是各端应用，libs 放组件库、工具库、API 封装，tools 放共享 ESLint、TS 配置。统一用 TypeScript 严格模式，Changesets 管版本。每个应用独立 Vite 配置，引用本地 workspace 包。

---

### FB-16-SD-R-036：Vue 项目 CI/CD 与自动化发布流程如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、CI/CD、GitHub Actions、自动化、发布、部署
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 Vue 项目的持续集成与持续发布流程，包括代码检查、测试、构建、部署和回滚。

**参考答案**：

一、CI 流程

1. **代码提交触发**：
   - Pull Request / Push 触发 GitHub Actions / GitLab CI。

2. **代码检查**：
   - 安装依赖。
   - 运行 ESLint、Prettier、TypeScript 类型检查。

3. **单元测试与 E2E 测试**：
   - Vitest 跑单元测试。
   - Cypress / Playwright 跑 E2E。

4. **构建产物**：
   - 构建并上传产物到 CDN 或服务器。

二、CD 流程

1. **环境区分**：
   - dev、test、staging、production。
   - 使用环境变量区分 API、埋点、日志。

2. **部署策略**：
   - 静态资源部署到 CDN/对象存储。
   - 使用 Docker / Nginx 托管。
   - 蓝绿部署或灰度发布。

3. **版本与回滚**：
   - 产物带 hash，保留历史版本。
   - 一键回滚到上一个版本。

三、示例 GitHub Actions

```yaml
name: CI/CD
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm test
      - run: pnpm build
      - run: pnpm deploy:prod
```

**评分维度**：
- 能设计 CI 检查、测试、构建流程（30%）
- 能说明多环境部署策略（25%）
- 能说明产物管理和回滚机制（20%）
- 能提到自动化测试和代码质量门禁（15%）
- 能说明安全与密钥管理（10%）

**常见错误**：
- 没有类型检查就部署。
- 测试覆盖率不足，CI 形同虚设。
- 生产环境直接部署没有灰度。

**延伸追问**：
- 如何在 CI 中并行运行测试和构建？
- 如何处理多包 Monorepo 的发布？

**相关题目**：
- [FB-16-EN-A-001 ESLint/Prettier/Vitest](#FB-16-EN-A-001)
- [FB-16-SD-R-035 Vue Monorepo 架构](#FB-16-SD-R-035)

**参考资源**：
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitLab CI 文档](https://docs.gitlab.com/ee/ci/)

**口头回答版**：
> CI/CD 流程一般是提交后触发安装、lint、类型检查、单元测试、E2E、构建。部署分 dev、test、staging、prod，静态资源放 CDN。产物保留历史版本支持回滚。生产环境建议灰度发布。用 GitHub Actions 或 GitLab CI 编排，密钥不要硬编码。

---

### FB-16-SD-R-037：如何基于 Vue 设计一个可扩展的插件系统？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、插件系统、Plugin、扩展、架构、生命周期
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个基于 Vue 的可扩展插件系统，支持插件注册、配置、生命周期管理和沙箱隔离。

**参考答案**：

一、插件接口设计

```ts
interface Plugin {
  name: string;
  version: string;
  install: (ctx: PluginContext, options?: any) => void | (() => void);
}

interface PluginContext {
  app: App;
  router: Router;
  store: Pinia;
  emitter: EventEmitter;
  registerComponent: (name: string, comp: Component) => void;
}
```

二、插件注册

```ts
class PluginSystem {
  private plugins = new Map();
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  use(plugin: Plugin, options?: any) {
    if (this.plugins.has(plugin.name)) return;
    const uninstall = plugin.install(this.createContext(), options);
    this.plugins.set(plugin.name, { plugin, uninstall });
  }

  uninstall(name: string) {
    const p = this.plugins.get(name);
    if (p?.uninstall) p.uninstall();
    this.plugins.delete(name);
  }
}
```

三、扩展点设计

- 组件注册。
- 路由动态添加。
- 全局状态注入。
- 事件总线监听。
- 菜单/权限扩展。

四、沙箱与隔离

- 使用 iframe 或 Web Worker 运行不信任插件。
- 对插件 API 做白名单控制。
- 资源加载使用 CSP 限制。

**评分维度**：
- 能设计插件接口和上下文（30%）
- 能实现注册和卸载机制（25%）
- 能设计扩展点（20%）
- 能提到沙箱和安全隔离（15%）
- 能说明版本兼容和依赖管理（10%）

**常见错误**：
- 插件直接操作全局 Vue 原型。
- 没有卸载机制导致内存泄漏。
- 对第三方插件没有权限控制。

**延伸追问**：
- 插件之间如何通信？
- 热插拔插件时如何保存状态？

**相关题目**：
- [FB-16-CO-A-018 自定义指令](#FB-16-CO-A-018)
- [FB-16-SD-R-032 中后台架构](#FB-16-SD-R-032)

**参考资源**：
- [Vue 官方文档 - Plugins](https://vuejs.org/guide/reusability/plugins.html)
- [Qiankun 插件机制](https://qiankun.umijs.org/)

**口头回答版**：
> 插件系统要定义统一的 Plugin 接口，包含 name、version、install。注册时传入上下文，让插件能注册组件、加路由、监听事件。要支持 uninstall 清理副作用。对不可信插件要做沙箱隔离，控制 API 白名单。插件间通过事件总线通信。

---

### FB-16-SD-R-038：Vue 服务端渲染（SSR）架构如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、SSR、架构、Hydration、Nuxt、同构
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 Vue 3 服务端渲染架构，说明渲染流程、数据获取、缓存和部署方案。

**参考答案**：

一、渲染流程

1. 请求到达 Node.js / Edge 服务端。
2. 创建 Vue 应用实例（每个请求独立，避免状态污染）。
3. 通过 `renderToString` 或 `renderToPipeableStream` 渲染 HTML。
4. 注入初始状态、CSS、JS。
5. 返回 HTML，浏览器 hydration 激活。

二、数据获取

- 使用 `async setup` + Suspense，或 Nuxt 的 `useAsyncData` / `useFetch`。
- 服务端获取数据后序列化到 window.__INITIAL_STATE__。

三、缓存策略

- 页面级缓存：对不常变页面做 SSR 缓存。
- 组件级缓存：使用 `serverPrefetch` 或缓存数据结果。
- CDN 边缘缓存：Vercel / Cloudflare 缓存静态和动态页面。

四、部署方案

- Nuxt 3：支持 SSR、SSG、ISR、Hybrid。
- 自研 Node 服务：使用 Express / Fastify + Vue SSR。
- Serverless：Vercel、Netlify Functions。

五、注意事项

- 避免服务端访问浏览器 API。
- 保证 hydration 一致性。
- 每个请求独立 pinia/router 实例。

**评分维度**：
- 能说明 SSR 渲染流程（25%）
- 能说明数据获取和状态注入（25%）
- 能说明缓存策略（20%）
- 能说明部署方案（15%）
- 能提到 hydration 一致性（15%）

**常见错误**：
- 多个请求共享同一个 Vue 应用实例。
- 服务端访问 window/document 导致报错。
- 忽略 hydration mismatch 问题。

**延伸追问**：
- SSR 和 ISR 在架构上有什么区别？
- 如何监控 SSR 服务的性能和错误？

**相关题目**：
- [FB-16-FS-P-025 Vue SSR / Nuxt 3](#FB-16-FS-P-025)
- [FB-16-CP-A-001 Vue SEO](#FB-16-CP-A-001)

**参考资源**：
- [Vue 官方文档 - SSR](https://vuejs.org/guide/scaling-up/ssr.html)
- [Nuxt 3 官方文档](https://nuxt.com/)

**口头回答版**：
> Vue SSR 架构中，每个请求要单独创建 app、router、pinia 实例，避免状态污染。用 renderToString 或流式渲染输出 HTML，注入初始状态。数据获取可以用 Nuxt 的 useAsyncData。缓存分页面缓存、组件缓存和 CDN 边缘缓存。注意 hydration 一致性，服务端不能访问 window。

---

### FB-16-SD-R-039：Vue 中实现设计系统与主题定制的架构方案是什么？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、设计系统、主题、Design Token、CSS Variables、组件库
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何在 Vue 项目中实现设计系统和主题定制，包括 Design Token、组件库、主题切换和暗黑模式。

**参考答案**：

一、Design Token

```css
:root {
  --color-primary: #409eff;
  --color-bg: #ffffff;
  --spacing-sm: 8px;
  --font-size-base: 14px;
  --radius-base: 4px;
}

[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-primary: #66b1ff;
}
```

二、组件库封装

- 基础组件使用 CSS Variables 消费 Design Token。
- 支持 props 覆盖和主题变量注入。
- 使用 scoped / CSS Modules 避免污染。

三、主题切换

```ts
function setTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
```

四、架构设计

```text
design-system/
├── tokens/            # Design Token JSON/JSON5
├── theme/             # 主题配置与切换逻辑
├── components/        # 基础组件
├── presets/           # 预设主题
└── utils/             # 工具函数
```

五、工具链

- Style Dictionary：从 Token 生成 CSS Variables、SCSS、JS 变量。
- Storybook：文档和交互示例。
- Chromatic：视觉回归测试。

**评分维度**：
- 能设计 Design Token 体系（25%）
- 能说明组件库如何使用 Token（25%）
- 能实现主题切换和暗黑模式（20%）
- 能提到工具链和视觉回归（15%）
- 能说明可扩展性和业务定制（15%）

**常见错误**：
- 颜色、间距硬编码在组件里。
- 主题切换时全局重渲染。
- 忽略无障碍对比度。

**延伸追问**：
- 如何支持用户自定义主题？
- 如何确保 Design Token 在多端一致？

**相关题目**：
- [FB-16-SD-R-027 Vue 组件库设计](#FB-16-SD-R-027)
- [FB-16-SD-R-033 Vue i18n 架构](#FB-16-SD-R-033)

**参考资源**：
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Radix Vue - Themes](https://www.radix-vue.com/)

**口头回答版**：
> 设计系统核心是 Design Token，比如颜色、间距、圆角，用 CSS Variables 定义。组件库消费这些变量，支持 props 覆盖。主题切换通过给 html 加 data-theme 属性实现，localStorage 持久化。用 Style Dictionary 管理 Token，Storybook 做文档，Chromatic 做视觉回归。

---

### FB-16-SD-R-040：Vue 应用从 0 到 1 的技术选型与演进路线如何规划？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：16 Vue
**标签**：Vue、技术选型、演进路线、架构、规划
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请为一个新的 Vue 应用规划从 0 到 1 的技术选型和演进路线，包括框架、构建工具、状态管理、测试、部署等。

**参考答案**：

一、MVP 阶段

- 框架：Vue 3 + TypeScript + script setup。
- 构建：Vite。
- 路由：Vue Router 4。
- 状态：简单场景用 provide/inject 或 Composables，复杂后引入 Pinia。
- UI：选用成熟组件库（Element Plus / Ant Design Vue）。
- 测试：Vitest + Vue Test Utils。

二、成长阶段

- 引入 ESLint、Prettier、Husky。
- 按业务模块拆分代码。
- 增加 E2E 测试（Playwright）。
- 接入监控和埋点。
- 性能优化：路由懒加载、虚拟列表、KeepAlive。

三、成熟阶段

- Monorepo 拆分共享包和多个应用。
- 自研组件库和设计系统。
- SSR/SSG 满足 SEO 和首屏性能。
- 微前端或模块联邦支持多团队协作。
- 完善的 CI/CD、灰度发布、可观测性。

四、演进原则

- 避免过度设计，按业务规模逐步引入复杂度。
- 每个阶段保留回滚和迁移空间。
- 技术债定期重构。

**评分维度**：
- 能分阶段规划技术栈（30%）
- 能说明每个阶段核心目标（25%）
- 能提到状态管理、测试、部署演进（25%）
- 能体现演进原则而非一步到位（20%）

**常见错误**：
- 项目一开始就上微前端和 Monorepo。
- 忽略团队规模和技术储备。
- 技术选型不考虑业务阶段。

**延伸追问**：
- 如何判断什么时候该从 Pinia 迁到更复杂的状态方案？
- 微前端应该在什么阶段引入？

**相关题目**：
- [FB-16-SD-R-026 大型 Vue 应用架构](#FB-16-SD-R-026)
- [FB-16-SD-R-035 Vue Monorepo 架构](#FB-16-SD-R-035)

**参考资源**：
- [Vue 官方文档 - Scaling Up](https://vuejs.org/guide/scaling-up/sfc.html)
- [The Twelve-Factor App](https://12factor.net/)

**口头回答版**：
> 从 0 到 1 的 Vue 项目，MVP 阶段用 Vue 3 + Vite + TypeScript，状态简单用 Composable，复杂了上 Pinia。成长阶段加规范、拆分模块、E2E、监控。成熟阶段做 Monorepo、自研组件库、SSR/SSG、微前端。关键是按业务规模演进，别一开始就过度设计。

### FB-16-CO-B-010：Vue 中 v-bind 和 v-on 的简写是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、v-bind、v-on、指令、简写
**出现频率**：高频
**预计回答时长**：1-2 分钟

**题目描述**：
请说明 Vue 中 `v-bind` 和 `v-on` 的简写形式，并各举一个例子。

**参考答案**：

一、`v-bind` 简写为 `:`：

```vue
<!-- 完整写法 -->
<img v-bind:src="imageUrl" />

<!-- 简写 -->
<img :src="imageUrl" />
```

二、`v-on` 简写为 `@`：

```vue
<!-- 完整写法 -->
<button v-on:click="handleClick">Click</button>

<!-- 简写 -->
<button @click="handleClick">Click</button>
```

三、动态参数：

```vue
<a :[attributeName]="url">Link</a>
<button @[eventName]="handler">Click</button>
```

四、修饰符：

- `@click.stop` 阻止事件冒泡。
- `@click.prevent` 阻止默认行为。
- `@click.once` 只触发一次。

**评分维度**：
- v-bind 简写（35%）
- v-on 简写（35%）
- 动态参数或修饰符（30%）

**常见错误**：
- 在需要表达式的地方用简写时不加冒号
- 动态参数写法不熟悉

**口头回答版**：
> Vue 里 v-bind 简写是冒号，比如 `:src="imageUrl"`；v-on 简写是 @，比如 `@click="handleClick"`。还可以写动态参数 `:[attrName]` 和修饰符如 `.stop`、`.prevent`。

---

### FB-16-CO-B-011：Vue 中的 computed setter 是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、computed、setter、响应式
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 Vue 中 computed 的 getter 和 setter 用法，以及使用场景。

**参考答案**：

computed 默认只有 getter，当需要写回数据时可以定义 setter。

```vue
<script setup>
import { ref, computed } from 'vue';

const firstName = ref('John');
const lastName = ref('Doe');

const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value;
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ');
  }
});
</script>
```

使用场景：

1. **双向计算属性**：
   - 例如 v-model 绑定到一个 computed 属性，同时影响多个源数据。

2. **表单数据处理**：
   - 一个输入框显示格式化后的值，输入时反向解析。

注意事项：

- setter 不应该有副作用。
- setter 中的修改会触发依赖它的视图更新。
- Options API 中写法相同，放在 `computed` 选项中。

**评分维度**：
- 说明 getter/setter 结构（40%）
- 使用场景（35%）
- 注意事项（25%）

**常见错误**：
- 在 computed setter 中做异步操作
- 用 computed setter 替代方法

**口头回答版**：
> Vue 的 computed 可以只读，也可以有 getter 和 setter。setter 在需要双向绑定计算属性时用，比如 fullName 绑定 v-model，输入时自动拆成 firstName 和 lastName。setter 里不要有副作用。

---

### FB-16-CO-B-012：Vue 中的 watch 的 deep 和 immediate 选项作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、watch、deep、immediate、响应式
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 中 `watch` 的 `deep` 和 `immediate` 选项分别有什么作用。

**参考答案**：

一、`immediate: true`：

- 在 watch 创建时立即执行一次回调，而不是等被监听值变化后才执行。
- 第一次执行时 `oldValue` 为 `undefined`。

```js
watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal);
}, { immediate: true });
```

二、`deep: true`：

- 深度监听对象或数组内部的变化。
- 默认情况下，watch 只监听引用变化，不监听对象属性变化。

```js
watch(user, (newVal) => {
  console.log(newVal);
}, { deep: true });
```

三、注意事项：

1. deep 监听性能开销较大，对象越大越明显。
2. 尽量只监听需要的具体属性，而不是整个对象。
3. Vue 3 中可以直接 `watch(() => user.name, ...)` 监听嵌套属性。

四、Vue 3 与 Vue 2 差异：

- Vue 3 的 deep 默认是 false，需要显式开启。
- Vue 3 支持直接监听 reactive 对象，不需要 deep 也能监听到属性变化。

**评分维度**：
- immediate 作用（35%）
- deep 作用（35%）
- 性能注意事项（20%）
- Vue 3 差异（10%）

**常见错误**：
- 对所有对象都开 deep，导致性能问题
- 需要 immediate 时忘记配置

**口头回答版**：
> watch 的 immediate 是创建时立即执行一次回调，deep 是深度监听对象内部变化。deep 开销大，尽量监听具体属性而不是整个对象。Vue 3 监听 reactive 对象的属性变化有时不需要 deep。

---

### FB-16-CO-B-013：Vue 中的组件 name 有什么用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、component name、调试、递归组件
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 Vue 组件中 `name` 选项的作用。

**参考答案**：

一、主要作用：

1. **递归组件**：
   - 组件要递归调用自己时必须声明 name。
   ```vue
   <template>
     <div>
       <TreeItem v-for="child in children" :key="child.id" :node="child" />
     </div>
   </template>
   <script setup>
   import TreeItem from './TreeItem.vue';
   </script>
   <script>
   export default { name: 'TreeItem' };
   </script>
   ```

2. **调试工具显示**：
   - Vue DevTools 中显示的组件名。
   - 错误堆栈和警告信息中的组件标识。

3. **KeepAlive 的 include/exclude**：
   - 通过组件 name 控制哪些组件缓存。

4. **组件递归查找**：
   - 父组件链查找、错误边界等场景。

二、script setup 中定义 name：

```vue
<script setup>
defineOptions({ name: 'MyComponent' });
</script>
```

或再写一个普通 script：

```vue
<script>
export default { name: 'MyComponent' };
</script>
```

**评分维度**：
- 递归组件（30%）
- 调试显示（25%）
- KeepAlive（25%）
- script setup 定义方式（20%）

**常见错误**：
- 递归组件忘记声明 name
- script setup 中不知道如何定义 name

**口头回答版**：
> Vue 组件 name 主要用来做递归组件、在 DevTools 里显示、配合 KeepAlive 的 include/exclude。script setup 里可以用 defineOptions 或再写一个普通 script 来定义 name。

---

### FB-16-CO-B-014：Vue 中 $emit 和 defineEmits 的区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、emit、defineEmits、事件、Composition API
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 中 `$emit` 和 `defineEmits` 的区别和使用场景。

**参考答案**：

一、`$emit`：

- Options API 中使用 `this.$emit('eventName', payload)` 触发自定义事件。
- 在模板中也可以直接用 `$emit`：
  ```vue
  <button @click="$emit('click', $event)">Click</button>
  ```

二、`defineEmits`：

- `<script setup>` 中声明和获取 emit 函数。
- 提供更好的类型推断。

```vue
<script setup>
const emit = defineEmits(['update:modelValue', 'submit']);
// 或带类型
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit'): void;
}>();

function handleClick() {
  emit('submit');
}
</script>
```

三、声明 emits 的好处：

1. 明确组件对外暴露的事件接口。
2. TypeScript 类型支持。
3. 父组件传递的同名 props 不会被子组件当作原生事件处理。

四、注意事项：

- `defineEmits` 是编译器宏，不需要导入。
- 声明的事件不会被子组件继承为原生事件。

**评分维度**：
- $emit 用法（25%）
- defineEmits 用法（35%）
- 类型声明（20%）
- 声明的好处（20%）

**常见错误**：
- 在 script setup 中仍然用 this.$emit
- 没有声明 emits 导致事件被当作原生属性

**口头回答版**：
> $emit 是 Options API 里触发事件的方法，模板里也能直接用。defineEmits 是 script setup 里的编译器宏，用来声明事件和获取 emit 函数，支持 TypeScript 类型。声明 emits 能明确接口，避免和原生事件冲突。

---

### FB-16-CO-B-015：Vue 3 中的 Suspense 是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、Suspense、异步组件、加载状态
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Vue 3 中的 Suspense 组件及其作用。

**参考答案**：

Suspense 是 Vue 3 提供的用于处理异步依赖的组件。当包裹的组件或异步内容正在加载时，显示 fallback 内容，加载完成后再显示实际内容。

基本用法：

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
```

使用场景：

1. **异步组件加载**：
   - 配合 `defineAsyncComponent` 使用。

2. **异步 setup**：
   - 组件的 `setup` 函数可以返回 Promise。

```vue
<script setup>
const data = await fetchData();
</script>
```

注意事项：

- Suspense 目前仍是实验性特性，API 可能变化。
- 需要处理错误时配合 Error Boundary 或 `onErrorCaptured`。
- 可以嵌套使用，内部 Suspense 完成不会阻塞外部 fallback。

**评分维度**：
- 说明 Suspense 作用（35%）
- 基本用法（30%）
- 异步 setup 场景（20%）
- 注意事项（15%）

**常见错误**：
- 把 Suspense 当成普通 loading 组件
- 忽略异步 setup 的错误处理

**口头回答版**：
> Vue 3 的 Suspense 用来处理异步依赖，加载时显示 fallback，加载完显示真实内容。常用于异步组件和 async setup。用 #default 和 #fallback 插槽。目前还是实验性特性，错误处理要配合 onErrorCaptured。

---

### FB-16-CO-B-016：Vue 中的 mixin 有什么优缺点？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：16 Vue
**标签**：Vue、mixin、Composition API、复用
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 中 mixin 的优缺点，以及 Vue 3 中更推荐的替代方案。

**参考答案**：

一、mixin 优点：

1. 可以复用组件选项（data、methods、生命周期等）。
2. 在 Options API 中简单直观。

二、mixin 缺点：

1. **命名冲突**：
   - 多个 mixin 可能定义同名 data 或 methods，导致覆盖或不可预期行为。

2. **来源不透明**：
   - 组件使用了哪些属性和方法来自哪个 mixin 难以追踪。

3. **逻辑碎片化**：
   - 同一功能的代码分散在多个 mixin 和组件中。

4. **可维护性差**：
   - 随着 mixin 增多，组件行为变得难以理解和测试。

三、Vue 3 替代方案：

1. **Composition API / Composable**：
   - 按功能组织逻辑，而不是按选项类型。
   - 命名空间清晰，避免冲突。
   ```ts
   const { count, increment } = useCounter();
   ```

2. **自定义 Hook/Composable**：
   - 每个功能一个函数，组合使用。

四、适用场景：

- Vue 2 项目维护时可能仍用 mixin。
- Vue 3 新项目优先使用 Composable。

**评分维度**：
- mixin 优点（15%）
- mixin 缺点（40%）
- 替代方案（35%）
- 适用场景（10%）

**常见错误**：
- Vue 3 项目仍大量使用 mixin
- 认为 Composable 完全等同于 mixin

**口头回答版**：
> mixin 能复用 Options API 的选项，但缺点是命名冲突、来源不透明、逻辑碎片化。Vue 3 推荐用 Composition API 的 Composable，按功能组织逻辑，更清晰可维护。Vue 2 维护可能还用 mixin，新项目优先 Composable。

---

### FB-16-CO-A-019：Vue 中如何正确使用 ref 和 reactive？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、ref、reactive、响应式
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Vue 3 中 `ref` 和 `reactive` 的正确使用方式、区别和常见陷阱。

**参考答案**：

一、基本区别：

- `ref`：可以包装任何类型，返回一个响应式引用，通过 `.value` 访问和修改。
- `reactive`：只能包装对象类型，返回响应式代理对象，直接访问属性。

```js
const count = ref(0);
count.value++;

const user = reactive({ name: 'Tom' });
user.name = 'Jerry';
```

二、使用建议：

1. **基础类型用 ref**：
   - string、number、boolean 等只能用 ref。

2. **对象类型两者皆可**：
   - 推荐用 ref，因为 ref 可以整体替换对象而不丢失响应式。
   - reactive 整体替换对象会丢失响应式连接。

3. **解构和赋值**：
   - reactive 对象解构会失去响应式。
   - ref 赋值给 ref 需要 `.value`。

三、常见陷阱：

1. **reactive 解构**：
   ```js
   const { name } = user; // name 不再是响应式
   ```

2. **ref 在模板中自动解包**：
   - 模板中可以直接用 `{{ count }}`，不需要 `{{ count.value }}`。
   - 但在 setup 中必须 `.value`。

3. **ref 赋值给 reactive 属性**：
   ```js
   const state = reactive({ count });
   state.count++; // 自动解包，等价于 count.value++
   ```

四、选型建议：

- 统一使用 ref 更简单一致。
- reactive 适合需要深层响应式的复杂对象，且不会整体替换。

**评分维度**：
- 基本区别（30%）
- 使用建议（30%）
- 常见陷阱（30%）
- 选型建议（10%）

**常见错误**：
- 用 reactive 包装基础类型
- reactive 对象整体替换后丢失响应式

**口头回答版**：
> ref 包装任何类型，用 .value 访问；reactive 只包装对象，直接访问属性。基础类型用 ref，对象也推荐用 ref，因为可以整体替换。reactive 解构会失去响应式，整体替换也会断。模板里 ref 自动解包，setup 里要 .value。

---

### FB-16-CO-A-020：Vue 3 的 emits 选项有什么作用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、emits、事件、props、组件接口
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 3 中 `emits` 选项的作用，以及不声明会有什么问题。

**参考答案**：

一、作用：

1. **明确组件事件接口**：
   - 让父组件知道子组件会触发哪些事件。

2. **避免事件被当作原生 DOM 事件**：
   - 如果子组件没有声明 `emits`，父组件传递的 `@click` 等会被挂载到子组件根元素上。
   - 声明后，事件由组件自己处理，不会冒泡到根元素。

3. **更好的类型支持**：
   - 配合 TypeScript 可以定义事件 payload 类型。

二、Options API 写法：

```js
export default {
  emits: ['click', 'submit'],
  methods: {
    handleClick() {
      this.$emit('click', this.value);
    }
  }
};
```

三、Composition API 写法：

```vue
<script setup>
const emit = defineEmits(['click', 'submit']);
</script>
```

四、验证功能：

```js
emits: {
  submit: (payload) => {
    return payload && typeof payload.email === 'string';
  }
}
```

五、不声明的问题：

1. 事件可能被错误地绑定到根元素。
2. 组件接口不清晰，难以维护。
3. TypeScript 类型推断不完整。

**评分维度**：
- 说明作用（40%）
- 两种写法（25%）
- 验证功能（15%）
- 不声明的问题（20%）

**常见错误**：
- 所有事件都不声明 emits
- 把 emits 和 props 混淆

**口头回答版**：
> Vue 3 的 emits 选项用来声明组件会触发哪些事件。声明后事件不会错误绑定到根元素，接口更清晰，TypeScript 类型更好。还可以做事件参数校验。不声明可能导致事件被当原生事件处理。

---

### FB-16-CO-A-021：Vue 中的 template refs 如何使用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、template refs、DOM、组件引用
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 中 template refs 的使用方式，包括 DOM 元素和组件实例。

**参考答案**：

一、DOM 元素引用：

```vue
<script setup>
import { ref, onMounted } from 'vue';

const inputRef = ref(null);

onMounted(() => {
  inputRef.value.focus();
});
</script>

<template>
  <input ref="inputRef" />
</template>
```

二、组件实例引用：

```vue
<script setup>
import { ref, onMounted } from 'vue';
import Child from './Child.vue';

const childRef = ref(null);

onMounted(() => {
  childRef.value.someMethod();
});
</script>

<template>
  <Child ref="childRef" />
</template>
```

三、函数式 template ref：

```vue
<template>
  <input :ref="(el) => { inputRef = el }" />
</template>
```

四、组件 expose：

- Vue 3 中组件默认不暴露内部属性和方法。
- 子组件需要用 `defineExpose` 暴露：

```vue
<script setup>
const someMethod = () => {};
defineExpose({ someMethod });
</script>
```

五、注意事项：

1. ref 在组件挂载后才可用，应在 onMounted 中访问。
2. 组件卸载后 ref 变为 null。
3. 避免过度使用 ref 操作组件内部，优先用 props/events。

**评分维度**：
- DOM 引用（25%）
- 组件实例引用（30%）
- defineExpose（20%）
- 注意事项（25%）

**常见错误**：
- 在 onMounted 之前访问 ref
- 子组件没有 defineExpose 却想调用方法

**口头回答版**：
> Vue 里用 ref 获取 DOM 或组件实例。DOM 上直接 `ref="inputRef"`，组件实例也是类似，但子组件要用 defineExpose 暴露方法。ref 在 onMounted 后才可用，卸载后变 null。尽量少用 ref 操作组件内部，优先 props 和事件。

---

### FB-16-CO-A-022：Vue 中的 transition 和 transition-group 区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、transition、transition-group、动画、列表
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 中 `<Transition>` 和 `<TransitionGroup>` 的区别和使用场景。

**参考答案**：

一、`<Transition>`：

- 用于单个元素或组件的进入/离开过渡动画。
- 只包裹一个根元素。

```vue
<Transition name="fade">
  <div v-if="show">Hello</div>
</Transition>
```

触发条件：

- `v-if` / `v-show`
- 动态组件切换
- `<component :is="...">`

二、`<TransitionGroup>`：

- 用于列表中多个元素的过渡动画。
- 支持列表项的进入、离开和移动动画。
- 必须为每个子元素绑定唯一的 `key`。

```vue
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</TransitionGroup>
```

三、主要区别：

| 特性 | Transition | TransitionGroup |
|------|------------|-----------------|
| 子元素数量 | 单个 | 多个 |
| key 要求 | 不需要 | 必须 |
| 渲染元素 | 不额外渲染 DOM | 默认渲染 wrapper，可用 tag 指定 |
| 移动动画 | 不支持 | 支持（v-move） |

四、CSS 类名：

- 两者都支持 `*-enter-from`、`*-enter-active`、`*-enter-to`、`*-leave-from`、`*-leave-active`、`*-leave-to`。
- TransitionGroup 额外支持 `*-move`。

**评分维度**：
- Transition 用法（30%）
- TransitionGroup 用法（30%）
- 区别对比（30%）
- CSS 类名（10%）

**常见错误**：
- 列表动画用 Transition 而不是 TransitionGroup
- TransitionGroup 子元素没有唯一 key

**口头回答版**：
> Transition 用于单个元素的进入离开动画，TransitionGroup 用于列表多个元素的动画。TransitionGroup 要求子元素有唯一 key，支持移动动画 v-move，默认会渲染一个 wrapper。列表动画一定要用 TransitionGroup。

---

### FB-16-CO-A-023：Vue 中的 props 校验怎么做？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、props、校验、TypeScript
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 中 props 校验的方式，包括运行时校验和 TypeScript 类型校验。

**参考答案**：

一、运行时校验：

```js
export default {
  props: {
    title: {
      type: String,
      required: true,
      validator(value) {
        return value.length > 0;
      }
    },
    count: {
      type: Number,
      default: 0
    },
    user: {
      type: Object,
      default: () => ({ name: '' })
    }
  }
};
```

二、script setup 写法：

```vue
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 }
});
</script>
```

三、TypeScript 类型校验：

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});
</script>
```

四、注意事项：

1. 对象/数组默认值必须用工厂函数返回。
2. validator 只在开发环境执行。
3. TypeScript 类型只在编译时检查，运行时仍需 prop 类型声明。
4. 布尔类型有特殊的默认值处理规则。

**评分维度**：
- 运行时校验（35%）
- script setup 写法（25%）
- TypeScript 类型校验（25%）
- 注意事项（15%）

**常见错误**：
- 对象 default 直接写 `{}` 而不是工厂函数
- 认为 TypeScript 类型能替代运行时校验

**口头回答版**：
> Vue props 校验可以在运行时做，声明 type、required、default、validator。script setup 里用 defineProps。TypeScript 项目用 withDefaults 给 defineProps 设默认值。对象和数组的 default 要用工厂函数。TS 类型只在编译期，运行时还需要 prop 声明。

---

### FB-16-CO-A-024：Vue 中如何处理组件卸载时的副作用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、副作用、onUnmounted、清理、生命周期
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 中如何清理组件卸载时产生的副作用，避免内存泄漏。

**参考答案**：

一、常见副作用：

1. 定时器（setInterval / setTimeout）。
2. 事件监听（addEventListener）。
3. 网络请求（需要取消）。
4. 订阅（WebSocket、EventBus、RxJS）。
5. 第三方库实例（图表、编辑器）。

二、清理方式：

1. **onUnmounted 钩子**：
   ```vue
   <script setup>
   import { onMounted, onUnmounted } from 'vue';
   
   let timer;
   onMounted(() => { timer = setInterval(() => {}, 1000); });
   onUnmounted(() => { clearInterval(timer); });
   </script>
   ```

2. **watch 的清理函数**：
   ```js
   watch(id, (newId, oldId, onCleanup) => {
     const controller = new AbortController();
     fetchUser(newId, { signal: controller.signal });
     onCleanup(() => controller.abort());
   });
   ```

3. **Composable 中统一清理**：
   - 在 Composable 内部注册 onUnmounted。
   - 调用方无需关心清理。

三、最佳实践：

- 成对出现：有注册就要有清理。
- 使用 Composable 封装副作用逻辑。
- 对异步请求使用 AbortController 或取消令牌。

**评分维度**：
- 副作用类型（20%）
- onUnmounted 使用（30%）
- watch 清理（20%）
- Composable 封装（20%）
- 最佳实践（10%）

**常见错误**：
- 只注册不清理，导致内存泄漏
- 组件卸载后 still setState

**口头回答版**：
> Vue 组件卸载时要在 onUnmounted 里清理定时器、事件监听、订阅、网络请求。watch 可以用 onCleanup 清理副作用。推荐把副作用逻辑封装成 Composable，内部自动处理清理。异步请求用 AbortController 取消。

---

### FB-16-CO-A-025：Vue 中的 defineAsyncComponent 怎么用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、defineAsyncComponent、异步组件、懒加载
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Vue 3 中 `defineAsyncComponent` 的用法和配置项。

**参考答案**：

一、基本用法：

```vue
<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComp = defineAsyncComponent(() => import('./HeavyComp.vue'));
</script>

<template>
  <AsyncComp />
</template>
```

二、带 loading 和 error 配置：

```js
const AsyncComp = defineAsyncComponent({
  loader: () => import('./HeavyComp.vue'),
  loadingComponent: Loading,
  errorComponent: Error,
  delay: 200,
  timeout: 3000,
  suspensible: false
});
```

配置项说明：

- `loader`：返回 Promise 的加载函数。
- `loadingComponent`：加载中显示的组件。
- `errorComponent`：加载失败显示的组件。
- `delay`：延迟显示 loading 的时间，避免闪烁。
- `timeout`：加载超时时间。
- `suspensible`：是否可被 Suspense 控制。

三、与 Suspense 配合：

```vue
<Suspense>
  <AsyncComp />
  <template #fallback>Loading...</template>
</Suspense>
```

四、错误处理：

- 加载失败时 `onError` 回调可以重试。
- 建议配合 Error Boundary 或 `onErrorCaptured`。

**评分维度**：
- 基本用法（25%）
- 配置项说明（35%）
- Suspense 配合（20%）
- 错误处理（20%）

**常见错误**：
- 异步组件没有在 Suspense 内或没有 loading 组件
- 忽略加载超时处理

**口头回答版**：
> Vue 3 用 defineAsyncComponent 定义异步组件，配合 import() 做懒加载。可以配置 loading、error、delay、timeout。还能和 Suspense 一起用。加载失败要处理超时和错误，避免白屏。

---

### FB-16-FS-P-027：Vue 3 的 Compiler 优化细节有哪些？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue 3、编译器、PatchFlag、静态提升、优化
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请深入说明 Vue 3 编译器做了哪些性能优化。

**参考答案**：

一、静态提升（Static Hoisting）：

将模板中不依赖响应式数据的静态节点提升到渲染函数外部，每次 render 直接复用，避免重复创建。

```js
const _hoisted_1 = /*#__PURE__*/createElementVNode("div", null, "static text", -1 /* HOISTED */);
```

二、PatchFlag：

编译时为动态节点打上标记，告诉运行时只需要对比特定属性：

- `1 /* TEXT */`：动态文本。
- `2 /* CLASS */`：动态 class。
- `8 /* PROPS */`：动态 props。
- `16 /* FULL_PROPS */`：有动态 key 的 props。

这样 diff 时只检查标记的部分，而不是全量对比。

三、静态属性提升：

- 节点的静态 class、style、attrs 等被提升到闭包外。

四、Block Tree：

- 使用 Block 收集所有动态子节点，形成稳定结构的树。
- 配合 PatchFlag，diff 时跳过静态子树。

五、事件缓存：

- 内联事件处理函数会被缓存，避免每次 render 创建新函数导致子组件 re-render。

```js
const _ctx = this;
return (_openBlock(), _createElementBlock("div", null, [
  _createElementVNode("button", {
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick(...args))
  }, "Click")
]));
```

六、SSR 优化：

- 静态内容直接输出字符串，不需要创建 VNode。
- 动态内容标记优化，减少 hydration 开销。

**评分维度**：
- 静态提升（20%）
- PatchFlag（25%）
- Block Tree（20%）
- 事件缓存（15%）
- SSR 优化（10%）
- 整体理解深度（10%）

**常见错误**：
- 只了解 PatchFlag，忽略静态提升和 Block Tree
- 认为编译器优化只在特定场景有效

**口头回答版**：
> Vue 3 编译器优化有静态提升，把静态节点提到渲染函数外复用；PatchFlag 给动态节点打标记，diff 只对比动态部分；Block Tree 收集动态子节点跳过静态子树；事件处理函数缓存避免子组件无谓重渲染；SSR 里静态内容直接输出字符串。

---

### FB-16-FS-P-028：Vue 的响应式系统如何处理数组和集合？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、响应式、数组、Set、Map、Proxy
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 Vue 3 响应式系统如何处理数组、Set、Map 等集合类型。

**参考答案**：

一、数组处理：

Vue 3 使用 Proxy 代理数组，拦截以下操作：

1. **索引访问/修改**：`arr[0]`、`arr[0] = 1`。
2. **长度变化**：`arr.length = 0`。
3. **数组方法**：`push`、`pop`、`splice` 等。

Proxy 能直接监听数组索引和长度变化，不需要像 Vue 2 那样重写数组方法。

二、Set/Map 处理：

Vue 3 为 Set 和 Map 提供了响应式包装 `reactive(new Set())`、`reactive(new Map())`。

可追踪的操作：

- `add`、`delete`、`has`、`clear`
- `get`、`set`（Map）
- `forEach`、`keys`、`values`、`entries`、`size`

三、实现机制：

1. **集合的 Proxy trap**：
   - 针对 Set/Map 的原生方法做拦截，在调用前后触发依赖收集和通知。

2. **迭代器包装**：
   - 返回的迭代器也被包装成响应式，遍历时能追踪依赖。

四、注意事项：

1. 直接用 `new Set()` 不是响应式的，必须用 `reactive(new Set())`。
2. `WeakMap`、`WeakSet` 不支持响应式。
3. 数组的 `sort`、`reverse` 会触发多次依赖通知，Vue 内部已优化。

**评分维度**：
- 数组 Proxy 处理（30%）
- Set/Map 处理（35%）
- 实现机制（20%）
- 注意事项（15%）

**常见错误**：
- 认为 Vue 3 还需要重写数组方法
- 直接用 Set 而不是 reactive(new Set())

**口头回答版**：
> Vue 3 用 Proxy 代理数组，可以直接监听索引、长度和数组方法，不需要像 Vue 2 重写方法。Set 和 Map 用 reactive 包装后，add、delete、get、set 这些操作都是响应式的。迭代器也会被包装。注意 WeakMap/WeakSet 不支持响应式。

---

### FB-16-FS-P-029：Vue 3 的 scheduler 和 flush 模式是什么？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、scheduler、flush、watch、响应式
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Vue 3 中 scheduler 的作用，以及 `watch` 和 `watchEffect` 的 flush 模式。

**参考答案**：

一、scheduler 作用：

Vue 3 使用调度器管理响应式副作用（effect）的执行时机。当响应式数据变化时，相关的 effect 不是立即执行，而是被放入一个队列中，在微任务阶段统一执行，实现批量更新。

二、flush 模式：

1. **`pre`**（默认）：
   - 在组件更新之前执行。
   - 适合在 DOM 更新前读取旧状态或做准备工作。

2. **`post`**：
   - 在组件更新之后执行。
   - 适合访问更新后的 DOM。

3. **`sync`**：
   - 同步执行，立即响应数据变化。
   - 性能开销大，少用。

```js
watch(source, callback, { flush: 'post' });
watchEffect(callback, { flush: 'post' });
```

三、使用场景：

- `pre`：默认值，大多数情况适用。
- `post`：需要在 DOM 更新后测量元素尺寸、操作 DOM。
- `sync`：调试或需要立即同步的场景。

四、注意事项：

- `flush: 'post'` 的回调会在组件挂载和更新后执行。
- 在 `flush: 'post'` 中修改状态可能触发新一轮更新，需谨慎。

**评分维度**：
- scheduler 作用（25%）
- flush 三种模式（45%）
- 使用场景（20%）
- 注意事项（10%）

**常见错误**：
- 不知道 flush 有 pre/post/sync 三种
- 在 pre 阶段访问更新后的 DOM

**口头回答版**：
> Vue 3 的 scheduler 把响应式副作用排队到微任务里批量执行。watch 和 watchEffect 有 flush 模式：pre 在更新前执行（默认），post 在更新后执行适合访问 DOM，sync 同步执行性能开销大。一般用 pre，需要操作更新后 DOM 用 post。

---

### FB-16-PE-P-025：Vue 长列表虚拟滚动实现

**题型**：性能题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、虚拟滚动、长列表、性能优化
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明在 Vue 中实现长列表虚拟滚动的原理和关键代码。

**参考答案**：

一、原理：

只渲染可视区域内的列表项，根据 scrollTop 计算起始索引，配合一个高度占位元素模拟完整列表高度。

二、核心计算：

```js
const startIndex = Math.floor(scrollTop / itemHeight);
const visibleCount = Math.ceil(containerHeight / itemHeight) + buffer;
const visibleItems = items.slice(startIndex, startIndex + visibleCount);
const offsetY = startIndex * itemHeight;
```

三、Vue 实现：

```vue
<template>
  <div ref="container" class="container" @scroll="onScroll">
    <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>
    <div class="list" :style="{ transform: `translateY(${offsetY}px)` }">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="item"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({ items: Array, itemHeight: Number });
const containerHeight = 400;
const buffer = 2;

const scrollTop = ref(0);
const totalHeight = computed(() => props.items.length * props.itemHeight);
const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight));
const visibleCount = computed(() => Math.ceil(containerHeight / props.itemHeight) + buffer);
const visibleItems = computed(() => props.items.slice(startIndex.value, startIndex.value + visibleCount.value));
const offsetY = computed(() => startIndex.value * props.itemHeight);

function onScroll(e) {
  scrollTop.value = e.target.scrollTop;
}
</script>
```

四、优化：

1. 滚动事件节流或使用 `requestAnimationFrame`。
2. 可变高度需要预先测量或动态计算。
3. 使用已有库：`vue-virtual-scroller`、`vue3-virtual-scroll-list`。

**评分维度**：
- 原理清晰（25%）
- 计算逻辑（25%）
- Vue 代码实现（30%）
- 优化和库选择（20%）

**常见错误**：
- 一次性渲染所有列表项
- 滚动事件不做节流

**口头回答版**：
> Vue 虚拟滚动只渲染可视区内容，用 phantom 元素模拟总高度。根据 scrollTop 算 startIndex 和 offsetY，渲染可视项加 buffer。滚动监听可以节流。高度不固定要测量或用库，比如 vue-virtual-scroller。

---

### FB-16-CO-P-024：Vue 3 的 defineModel 是什么？

**题型**：概念题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、defineModel、v-model、script setup
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Vue 3.4 引入的 `defineModel` 宏，以及它如何简化 v-model 实现。

**参考答案**：

`defineModel` 是 Vue 3.4 新增的编译器宏，用于简化组件实现 `v-model` 的逻辑。

传统写法：

```vue
<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

function update(value) {
  emit('update:modelValue', value);
}
</script>
```

defineModel 写法：

```vue
<script setup>
const model = defineModel();

function update(value) {
  model.value = value;
}
</script>
```

`defineModel` 本质上返回一个 ref：

- `get` 时读取 `props.modelValue`。
- `set` 时自动 `emit('update:modelValue', value)`。

多 v-model：

```vue
<script setup>
const title = defineModel('title');
const content = defineModel('content');
</script>
```

父组件：

```vue
<Child v-model:title="pageTitle" v-model:content="pageContent" />
```

选项：

```js
const model = defineModel({ default: 'hello', required: true });
```

**评分维度**：
- 说明 defineModel 作用（35%）
- 对比传统写法（25%）
- 多 v-model（20%）
- 选项配置（10%）
- 版本要求（10%）

**常见错误**：
- 在低于 3.4 版本使用 defineModel
- 把 defineModel 返回值当成普通 ref 随意解构

**口头回答版**：
> defineModel 是 Vue 3.4 的编译器宏，简化 v-model 实现。它返回一个 ref，get 读 props.modelValue，set 自动 emit update。多 v-model 用 defineModel('name')。还支持 default、required 这些选项。

---

### FB-16-CO-P-025：Vue 中的 h 函数和 render 函数

**题型**：概念题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、h函数、render函数、VNode
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Vue 中 `h` 函数和 `render` 函数的作用和使用场景。

**参考答案**：

一、`h` 函数：

`h` 是 hyperscript 的缩写，用于创建 VNode（虚拟节点）。

```js
import { h } from 'vue';

h('div', { class: 'foo' }, 'Hello');
// 等价于 <div class="foo">Hello</div>
```

参数：

1. type：标签名、组件、Fragment、Text。
2. props：属性、事件、class、style。
3. children：子节点，可以是字符串、数组、插槽函数。

二、`render` 函数：

组件选项中用于替代 template，直接返回 VNode。

```js
export default {
  data() {
    return { msg: 'Hello' };
  },
  render() {
    return h('div', null, this.msg);
  }
};
```

三、使用场景：

1. **动态渲染**：
   - 根据条件动态生成复杂 DOM 结构。

2. **函数式组件**：
   - 没有状态，只接收 props 返回 VNode。

3. **JSX**：
   - JSX 最终编译为 h 函数调用。

4. **组件库封装**：
   - 需要高度动态化的组件（如 Table、Form render）。

四、与 template 对比：

| 特性 | template | render + h |
|------|----------|------------|
| 可读性 | 好 | 差 |
| 灵活性 | 有限 | 高 |
| TypeScript | 支持 | 支持 |
| 编译优化 | 有 | 有限 |

**评分维度**：
- h 函数作用（30%）
- render 函数（25%）
- 使用场景（25%）
- 与 template 对比（20%）

**常见错误**：
- 所有组件都用 render 函数，降低可维护性
- 不理解 h 函数返回值是 VNode

**口头回答版**：
> h 函数用来创建 VNode，render 函数直接返回 VNode 替代 template。适合动态渲染、函数式组件、组件库里高度动态的组件。template 可读性好，render 更灵活。JSX 最终也是编译成 h 函数。

---

### FB-16-PE-P-026：Vue 应用构建产物优化

**题型**：性能题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、构建优化、Vite、Webpack、性能
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何优化 Vue 应用的构建产物，减少首屏加载时间。

**参考答案**：

一、代码分割：

1. 路由级懒加载：`() => import('./views/Home.vue')`。
2. 组件级懒加载：大型组件、弹窗、编辑器按需加载。
3. Vite/Rollup 动态 import 自动分包。

二、Tree Shaking：

1. 组件库使用 ES modules 导出。
2. 避免全局注册所有组件。
3. 第三方库选择支持 Tree Shaking 的版本。

三、压缩与混淆：

1. 生产环境启用 gzip/brotli 压缩。
2. 使用 terser/rollup-plugin-terser 压缩 JS。
3. 图片、字体等资源压缩。

四、资源优化：

1. 使用 CDN 加载公共依赖（权衡缓存和 DNS）。
2. 小图片转 base64 或 SVG。
3. 字体按需加载，使用 font-display: swap。

五、构建分析：

1. 使用 `rollup-plugin-visualizer` 或 `webpack-bundle-analyzer`。
2. 识别大依赖和重复依赖。

六、SSR/SSG：

- 使用 Nuxt 3 做 SSR 或 SSG，减少首屏 JS 执行。

**评分维度**：
- 代码分割（25%）
- Tree Shaking（20%）
- 压缩优化（15%）
- 资源优化（15%）
- 构建分析（15%）
- SSR/SSG（10%）

**常见错误**：
- 所有组件全局注册导致无法 Tree Shaking
- 过度分割产生过多小文件

**口头回答版**：
> Vue 构建产物优化可以按路由和组件懒加载，让组件库支持 Tree Shaking，生产环境压缩加 gzip。用 CDN 放公共依赖，小资源转 base64。用 bundle analyzer 分析大依赖。首屏要求高可以用 Nuxt 做 SSR/SSG。

---

### FB-16-CO-P-026：Vue 中的 Suspense 和 async setup

**题型**：概念题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：16 Vue
**标签**：Vue、Suspense、async setup、异步组件
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Vue 中 `async setup` 与 Suspense 的关系，以及使用时的注意事项。

**参考答案**：

一、async setup：

Vue 3 允许 `setup` 函数返回 Promise，此时组件会处于异步加载状态。

```vue
<script setup>
const data = await fetchData();
</script>
```

二、配合 Suspense：

包含 `async setup` 的组件必须被 `<Suspense>` 包裹，否则不会显示 fallback。

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
```

三、注意事项：

1. **错误处理**：
   - async setup 中抛出的错误需要配合 `onErrorCaptured` 或 Error Boundary 处理。

2. **生命周期**：
   - 异步 setup 中，onMounted 等钩子要等 await 完成后才注册？不，onMounted 注册时机与同步 setup 相同，但回调执行在组件挂载后。

3. **script setup 顶层 await**：
   - `<script setup>` 支持顶层 await，编译后会自动包裹为 async setup。

4. **实验性**：
   - Suspense 在 Vue 3 中仍是实验性特性，生产环境使用需谨慎。

四、替代方案：

- 如果不使用 Suspense，可以在 setup 中返回 loading 状态，手动控制 UI。

**评分维度**：
- async setup 说明（30%）
- Suspense 配合（25%）
- 错误处理（15%）
- 顶层 await（15%）
- 实验性状态（15%）

**常见错误**：
- async setup 组件没有包 Suspense
- 忽略异步 setup 中的错误处理

**口头回答版**：
> Vue 3 支持 async setup，可以在 setup 里 await 数据。script setup 里顶层 await 会自动编译成 async setup。这种组件要包在 Suspense 里才会显示 fallback。错误处理要用 onErrorCaptured。Suspense 目前还是实验性，生产环境要谨慎。

---

### FB-16-SD-R-041：Vue 设计系统与组件库架构

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：16 Vue
**标签**：Vue、设计系统、组件库、架构、Design Token
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个基于 Vue 3 的企业级设计系统和组件库架构。

**参考答案**：

一、目录结构：

```text
packages/
  theme/           # Design Token、CSS 变量
  components/      # Vue 组件库
  icons/           # 图标库
  utils/           # 工具函数
  docs/            # 文档站点
playground/        # 示例和调试
```

二、Design Token：

```css
:root {
  --v-color-primary: #1890ff;
  --v-spacing-md: 16px;
  --v-radius-base: 4px;
}
```

使用 CSS 变量，支持运行时主题切换。

三、组件设计：

1. 使用 script setup + TypeScript。
2. props 声明类型和默认值。
3. 提供 unstyled/headless 选项，方便业务定制。
4. 组件样式使用 CSS Modules 或 BEM，避免污染。

四、Monorepo 与构建：

1. pnpm workspace + Turborepo。
2. Vite 构建库模式：`build.lib`。
3. 输出 ES/CJS/UMD 和类型声明。
4. 支持按需引入和 Tree Shaking。

五、文档与示例：

1. 使用 VitePress 或 Storybook。
2. 每个组件有 Playground 和 API 文档。
3. 视觉回归测试用 Chromatic。

六、主题与定制：

1. 通过 CSS 变量覆盖主题。
2. 提供 ConfigProvider 注入配置。
3. 支持暗色模式和业务品牌色。

**评分维度**：
- 目录结构（20%）
- Design Token（20%）
- 组件设计（20%）
- Monorepo 构建（20%）
- 文档与主题（20%）

**常见错误**：
- 组件样式没有隔离，容易全局污染
- 组件库强依赖业务框架

**口头回答版**：
> Vue 设计系统可以分 theme、components、icons、utils 几个包。用 CSS 变量做 Design Token，组件用 script setup + TS，样式用 CSS Modules 或 BEM。Monorepo 用 pnpm + Turborepo，Vite 构建库模式输出 ES/CJS/UMD。文档用 VitePress 或 Storybook，主题通过 ConfigProvider 和 CSS 变量切换。

---

### FB-16-SD-R-042：Vue 应用性能监控体系

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：16 Vue
**标签**：Vue、性能监控、Web Vitals、错误监控
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 Vue 应用的性能监控体系，覆盖运行时性能、构建性能和用户体验。

**参考答案**：

一、运行时性能：

1. **Web Vitals**：LCP、INP、CLS、FCP、TTFB。
2. **Vue 特定指标**：
   - 组件渲染耗时（使用 Vue DevTools Profiler 或自定义性能标记）。
   - 路由切换耗时。
   - Pinia/Vuex mutation 耗时。

3. **长任务监控**：PerformanceObserver 监听 longtask。

二、构建性能：

1. Vite/Webpack 构建耗时趋势。
2. 产物体积分析（rollup-plugin-visualizer）。
3. 依赖大小和重复依赖。

三、用户体验：

1. 首屏加载时间。
2. 白屏率、错误率。
3. 用户交互响应延迟。

四、数据采集：

1. 采样上报，避免影响主线程。
2. 与版本、路由、用户环境关联。
3. 敏感信息脱敏。

五、告警与优化：

1. P75/P95 阈值告警。
2. 性能回归测试。
3. 定期生成性能报告。

六、工具：

- Sentry、Datadog、阿里云 ARMS。
- Lighthouse CI、Web Vitals 库。

**评分维度**：
- 运行时性能（30%）
- 构建性能（15%）
- 用户体验（20%）
- 采集与告警（20%）
- 工具选择（15%）

**常见错误**：
- 只监控错误不监控性能
- 全量上报影响应用性能

**口头回答版**：
> Vue 性能监控要采集 Web Vitals、组件渲染耗时、路由切换时长、长任务。构建看耗时和产物体积。用户体验看首屏、白屏、交互延迟。数据采样上报、脱敏，和版本环境关联。设 P75/P95 阈值告警，用 Sentry、Lighthouse 这些工具。

---

### FB-16-SD-R-043：Vue 微前端改造方案

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：16 Vue
**标签**：Vue、微前端、qiankun、Module Federation
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何将一个大型 Vue 单体应用改造为微前端架构。

**参考答案**：

一、拆分策略：

1. 按业务域拆分子应用：订单、商品、用户等。
2. 先抽出公共组件库和工具函数。
3. 基座应用负责路由、鉴权、全局状态。

二、技术选型：

1. **qiankun**：适合按路由加载独立 Vue 子应用。
2. **Module Federation**：适合共享 Vue 组件和模块。
3. **iframe**：简单隔离，体验差，临时方案。

三、Vue 特有问题：

1. **Vue 全局配置冲突**：
   - 各子应用使用独立的 Vue 实例。
   - 避免全局 mixin、全局 directive 冲突。

2. **路由冲突**：
   - 子应用使用 hash 模式或 base 路径。
   - 基座统一 history 路由。

3. **样式隔离**：
   - CSS Modules、BEM、Scoped CSS。
   - qiankun 提供 experimentalStyleIsolation。

4. **公共依赖共享**：
   - Vue、VueRouter、Pinia 通过 Module Federation shared 共享。

四、改造步骤：

1. 搭建基座，注册子应用。
2. 改造子应用导出生命周期。
3. 迁移公共逻辑到共享包。
4. 逐步切换流量，支持回滚。

**评分维度**：
- 拆分策略（20%）
- 技术选型（20%）
- Vue 特有问题（35%）
- 改造步骤（15%）
- 回滚能力（10%）

**常见错误**：
- 多个子应用共享一个 Vue 实例
- 样式没有隔离导致互相污染

**口头回答版**：
> Vue 微前端改造按业务域拆分子应用，先抽公共库。技术选 qiankun 或 Module Federation。要注意 Vue 全局配置冲突、路由冲突、样式隔离、公共依赖共享。子应用导出生命周期，基座统一路由和鉴权。逐步迁移并保留回滚能力。

---

### FB-16-SD-R-044：Vue SSR 缓存策略

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：16 Vue
**标签**：Vue、SSR、缓存、Nuxt、性能
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 Vue SSR 应用的缓存策略，降低服务端压力和提升首屏速度。

**参考答案**：

一、缓存分层：

| 层级 | 策略 | 场景 |
|------|------|------|
| CDN | 整页缓存 | 公开页面、不依赖登录态 |
| Edge | 边缘渲染 | 低延迟、多地域 |
| 应用内存 | 页面片段缓存 | 热门页面、稳定内容 |
| 数据缓存 | SWR/React Query | API 响应缓存 |
| 浏览器 | HTTP Cache / SW | 静态资源、重复访问 |

二、Nuxt 策略：

1. **SSG**：`nuxt generate` 构建时生成静态页面。
2. **ISR**：`routeRules` 中设置 `isr: 60` 实现增量静态再生。
3. **SSR**：每次请求服务端渲染，适合个性化页面。
4. **Hybrid Rendering**：不同路由用不同渲染模式。

三、缓存失效：

1. 按 TTL 失效。
2. 通过 webhook 主动刷新。
3. 版本发布时全量失效。

四、个性化处理：

- 登录态页面使用 ESI 或部分缓存。
- 缓存 key 包含语言、设备类型、用户角色。

五、监控：

- 缓存命中率。
- SSR 渲染耗时。
- 缓存失效后的错误率。

**评分维度**：
- 缓存分层（30%）
- Nuxt 策略（25%）
- 失效策略（15%）
- 个性化处理（15%）
- 监控（15%）

**常见错误**：
- 登录态页面错误缓存
- 缓存时间过长导致内容陈旧

**口头回答版**：
> Vue SSR 缓存分 CDN、Edge、应用内存、数据、浏览器多层。Nuxt 可以用 SSG、ISR、SSR 和混合渲染。缓存按 TTL 失效或主动刷新。登录态页面不能全缓存，用 ESI 或部分缓存，key 里加语言、设备、角色。监控命中率和渲染耗时。

---

### FB-16-SD-R-045：Vue 应用安全架构

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：16 Vue
**标签**：Vue、安全、XSS、CSRF、CSP
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 Vue 应用的安全架构，覆盖常见前端安全风险。

**参考答案**：

一、输入安全：

1. 不信任任何用户输入。
2. 表单校验前后端都做。
3. URL 参数校验和过滤。

二、输出安全：

1. **XSS 防护**：
   - Vue 模板默认转义变量。
   - 谨慎使用 `v-html`，必须做 HTML 消毒（DOMPurify）。
   - 配置 CSP。

2. **URL 安全**：
   - 避免 `javascript:` 链接。
   - 使用 encodeURIComponent。

三、认证与授权：

1. Token 存 httpOnly cookie。
2. 前端路由权限校验，后端最终鉴权。
3. 敏感操作二次验证。

四、依赖安全：

1. 定期 `pnpm audit`，使用 Snyk。
2. 锁定 lockfile。
3. 第三方 CDN 资源加 SRI。

五、安全头：

- CSP、X-Frame-Options、HSTS、X-Content-Type-Options。

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
- 依赖 Vue 默认转义，忽略 v-html 风险
- Token 放 localStorage

**口头回答版**：
> Vue 安全架构要做好输入校验、输出转义，v-html 必须消毒。Token 放 httpOnly cookie，路由做权限校验但后端最终鉴权。依赖要定期 audit，第三方 CDN 加 SRI。配置 CSP 等安全头，错误监控和定期渗透测试。

---

### FB-16-SD-R-046：Vue 低代码平台设计

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：16 Vue
**标签**：Vue、低代码、Schema、渲染器、设计器
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个基于 Vue 3 的低代码平台，支持拖拽搭建页面和发布。

**参考答案**：

一、核心架构：

```
设计器（画布 + 组件面板 + 属性面板）
    ↓
页面 Schema（JSON DSL）
    ↓
渲染器（解析 Schema 渲染 Vue 组件树）
    ↓
出码/发布
```

二、设计器：

1. 组件面板展示内置组件和业务组件。
2. 画布支持拖拽、选中、撤销重做。
3. 属性面板根据组件 schema 动态生成表单。

三、Schema 设计：

```json
{
  "type": "Page",
  "props": {},
  "children": [
    { "type": "Button", "props": { "text": "提交" } }
  ]
}
```

四、渲染器：

1. 递归解析 schema，映射到 Vue 组件。
2. 提供运行时上下文（数据、事件、路由）。
3. 支持组件懒加载和错误边界。

五、扩展性：

1. 组件注册机制。
2. 插件系统扩展属性面板和事件。
3. 数据源绑定 REST/GraphQL。

六、发布：

1. 直接发布为可访问页面。
2. 导出 Vue 源码。
3. 版本管理和回滚。

**评分维度**：
- 架构完整（30%）
- 设计器（20%）
- Schema 和渲染器（25%）
- 扩展性和发布（15%）
- 版本管理（10%）

**常见错误**：
- Schema 过于灵活难以出码
- 忽略组件版本管理

**口头回答版**：
> Vue 低代码平台分设计器、Schema DSL、渲染器三层。设计器拖拽生成 JSON Schema，渲染器递归解析成 Vue 组件。要支持组件注册、插件扩展、数据源绑定。发布可以直接部署或出码，还要做版本管理和回滚。

---

### FB-16-SD-R-047：Vue 组件库跨框架支持

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：16 Vue
**标签**：Vue、跨框架、Web Components、Headless
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个同时支持 Vue 和 React 的组件库方案。

**参考答案**：

一、方案选型：

1. **Headless UI + 框架适配层**（推荐）：
   - 核心逻辑用 vanilla JS 实现。
   - Vue 和 React 分别做适配层。

2. **Web Components**：
   - 用 Custom Elements 封装，框架无关。
   - 但表单集成、事件、样式隔离复杂。

3. **独立维护**：
   - Vue 组件库和 React 组件库分开。
   - 设计统一，API 贴近各自框架习惯。

二、Headless + Adapter 架构：

```text
packages/
  core/     # 框架无关逻辑
  vue/      # Vue 适配
  react/    # React 适配
  theme/    # 共享样式
```

三、核心逻辑：

1. 用状态机描述组件行为。
2. 纯函数处理键盘导航、焦点管理。
3. Vue/React 适配层负责绑定状态和事件。

四、样式共享：

- CSS 变量或原子类。
- Design Token 跨框架共享。

五、注意事项：

1. API 命名贴近各框架习惯。
2. 文档和示例分开。
3. 版本协调，避免功能不同步。
4. 测试覆盖全面。

**评分维度**：
- 方案选型（30%）
- Headless 架构（30%）
- 核心逻辑抽象（20%）
- 样式和版本（15%）
- 注意事项（5%）

**常见错误**：
- 强行用 Web Components 导致集成复杂
- 两套代码完全独立，API 不一致

**口头回答版**：
> 跨框架组件库推荐 Headless 加适配层。核心逻辑用 vanilla JS 写，Vue 和 React 分别绑定。样式用 CSS 变量共享。也可以 Web Components，但集成复杂。注意 API 贴近框架习惯，文档分开，版本协调。

---

### FB-16-SD-R-048：Vue 项目国际化架构

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：16 Vue
**标签**：Vue、i18n、国际化、SSR、架构
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个 Vue 应用的国际化架构，支持多语言、SSR 和组件库文案。

**参考答案**：

一、技术选型：

1. **vue-i18n**：生态成熟，Vue 官方推荐。
2. **@intlify/vue-i18n**：Vue 3 版本。
3. Nuxt 项目可用 `@nuxtjs/i18n`。

二、文案管理：

1. 按页面/模块组织 namespace。
2. key 命名：`module.component.action`。
3. 公共文案放 common。
4. 组件库文案通过插件或 ConfigProvider 注入。

三、SSR 支持：

1. 服务端根据请求 locale 加载语言包。
2. 将语言包注入 HTML，避免客户端重新请求。
3. Nuxt 使用 `@nuxtjs/i18n` 自动处理。

四、语言切换：

1. 用户选择持久化到 cookie/localStorage。
2. 浏览器语言自动匹配，支持回退。
3. 切换语言时刷新相关数据。

五、RTL 和排版：

1. 支持 RTL 语言。
2. 使用 CSS logical properties。
3. 日期、数字、货币用 Intl API。

六、流程：

1. 开发时写 key。
2. CI 提取 key 给翻译平台。
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
- 文案散落代码各处
- SSR 语言包加载不一致导致 hydration 问题

**口头回答版**：
> Vue 国际化常用 vue-i18n。文案按模块分 namespace，组件库文案通过 ConfigProvider 注入。SSR 要根据请求 locale 加载语言包并注入 HTML。语言切换持久化，支持浏览器匹配和 RTL。开发不写死文案，CI 提取给翻译平台。

---
