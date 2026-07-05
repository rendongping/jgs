# 微前端 面试题

> 本题库共收录 **51** 道面试题（基础 8 / 进阶 16 / 深入 14 / 架构 13）。
> 本文件收录微前端相关面试题，目标题量 100 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、框架原理题、性能优化题、安全题、工程化题、软技能题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-26-CO-B-001：什么是微前端？它主要解决哪些问题？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：26 微前端
**标签**：微前端、组件化、架构设计、前端工程化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释微前端的概念，并说明它主要解决哪些问题、适合什么样的组织与项目。

**参考答案**：

微前端（Micro-Frontend）是把前端应用拆分成多个可独立开发、独立部署、独立运行的子应用，再由一个基座应用（或路由网关）把它们组合成完整用户体验的架构风格。它借鉴了微服务的思想，但运行在浏览器端。

核心解决的问题：

1. **巨石应用演进困难**：代码库膨胀后编译慢、发布耦合、任何小改动都要全量回归。
2. **团队规模化协作难**：大团队在同一仓库里容易产生代码冲突、发布冲突和沟通成本。
3. **技术栈固化**：子应用可以按业务域选择最合适的技术栈，避免被单一框架版本绑架。
4. **渐进式重构**：可以逐步把老系统拆出来，而不是一次性重写。

适用场景：

- 中后台大盘、运营平台等多业务线聚合的大型 Web 应用。
- 多团队并行开发、需要独立发布节奏的产品。
- 存在历史遗留系统，需要渐进式现代化改造的项目。

不适用场景：

- 小型项目或单一团队维护的项目，拆分带来的运维复杂度可能得不偿失。
- 对首屏性能要求极高、且子应用间耦合度本来就很高的场景。

**评分维度**：
- 能说明微前端是可独立开发部署的子应用组合（40%）
- 能列出至少 3 个解决的问题（30%）
- 能给出适用与不适用场景的判断（30%）

**常见错误**：
- 把微前端简单等同于“iframe 嵌页面”。
- 认为微前端一定能提升性能，忽略组合带来的额外开销。
- 忽略组织与治理维度，只谈技术实现。

**延伸追问**：
- 微前端和组件化、Monorepo 有什么区别？
- 什么情况下微前端会变成“为了拆分而拆分”？

**相关题目**：
- [FB-26-CO-B-002 微前端与巨石应用对比](#FB-26-CO-B-002)
- [FB-26-SD-R-024 从巨石应用迁移到微前端](#FB-26-SD-R-024)

**参考资源**：
- [Micro-Frontends.org](https://micro-frontends.org/)
- [qiankun 官网](https://qiankun.umijs.org/)

**口头回答版**：
> 微前端就是把一个大前端应用拆成多个小应用，每个小应用可以独立开发、独立部署，然后再由一个基座把它们拼起来。它主要解决巨石应用越来越难维护、团队之间发布耦合、技术栈不好升级的问题。适合多团队、多业务线的大型中后台项目；小项目没必要硬上。

---

### FB-26-CO-B-002：微前端和传统的巨石应用相比有哪些优劣？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：26 微前端
**标签**：微前端、架构设计、前端工程化、性能
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比微前端架构与传统单页巨石应用，分别说明它们的优势与劣势。

**参考答案**：

| 维度 | 巨石应用 | 微前端 |
|------|---------|--------|
| 代码规模 | 单一仓库，体积随业务线性膨胀 | 按业务域拆分，单个子应用可控 |
| 团队边界 | 边界模糊，容易互相影响 | 按子应用划分团队，职责清晰 |
| 部署耦合 | 任何改动都需要整体发布 | 子应用可独立部署、回滚 |
| 技术栈 | 统一但难以升级 | 可按域选择，支持渐进升级 |
| 运行时复杂度 | 低 | 高，需要路由、状态、样式、沙箱等协调机制 |
| 性能 | 首次加载可能较大，但运行期无额外开销 | 按需加载子应用，但基座和公共依赖管理带来新挑战 |
| 可观测性 | 统一，链路清晰 | 需要跨子应用追踪、统一埋点规范 |

优势总结：

- 独立开发、独立部署、独立运行。
- 团队自治，降低沟通与发布冲突。
- 支持渐进式重构和技术异构。

劣势/挑战总结：

- 运行时集成复杂：路由、状态、样式、公共依赖、沙箱。
- 性能风险：重复加载依赖、子应用切换白屏、资源冗余。
- 治理难度：公共组件、规范、监控、版本管理需要顶层设计。

**评分维度**：
- 能从代码规模、部署、团队、技术栈等维度对比（50%）
- 能说出微前端的 3 个以上优势（25%）
- 能指出运行时复杂度和治理挑战（25%）

**常见错误**：
- 只谈优势不谈挑战。
- 把“微前端”和“性能更好”直接划等号。
- 忽视团队与流程因素。

**延伸追问**：
- 既然微前端有这么多挑战，什么指标说明我们“需要”微前端？
- 微前端和 Monorepo 可以同时使用吗？

**相关题目**：
- [FB-26-CO-B-001 什么是微前端](#FB-26-CO-B-001)
- [FB-26-EN-R-028 微前端团队 CI/CD 与仓库组织](#FB-26-EN-R-028)

**参考资源**：
- [Micro Frontends: The Good, The Bad, and The Ugly](https://www.thoughtworks.com/insights/blog/micro-frontends-good-bad-ugly)

**口头回答版**：
> 巨石应用代码在一个仓库里，构建和发布都绑在一起，技术栈升级也困难；微前端把应用拆成多个子应用，每个子应用可以独立开发部署，团队边界更清晰，技术栈也能按业务选。但代价是运行时变复杂了，路由、状态、样式、公共依赖都需要协调，还可能带来性能开销和治理难度。

---

### FB-26-CO-B-003：常见的微前端实现方案有哪些？各有什么特点？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：26 微前端
**标签**：微前端、qiankun、Module Federation、前端工程化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举常见的微前端实现方案，并对比它们的特点、适用场景和主要代表框架/工具。

**参考答案**：

常见方案可以分为四类：

1. **iframe 方案**
   - 特点：浏览器原生隔离，JS、CSS、DOM 完全独立；实现最简单。
   - 缺点：路由同步困难、弹窗遮罩层受限、性能与体验差、SEO 不友好。
   - 适用：内部工具、临时集成、对隔离要求极高的老系统。

2. **JS 沙箱类方案（基于路由切换的应用级微前端）**
   - 代表：single-spa、qiankun、micro-app、wujie。
   - 特点：子应用以独立的 SPA 形式存在，基座负责路由调度和生命周期管理；通过 JS 沙箱和样式隔离实现共存。
   - 适用：中后台多子应用聚合、团队自治场景。

3. **Web Components / 原生组件化方案**
   - 特点：使用 Custom Elements + Shadow DOM，组件级复用，隔离性强。
   - 缺点：浏览器兼容性、跨框架封装成本、子应用生命周期管理弱。
   - 适用：组件级共享、设计体系跨框架分发。

4. **Module Federation（模块联邦）**
   - 代表：Webpack Module Federation、Rspack Module Federation、Native Federation。
   - 特点：构建时/运行时共享模块，粒度更细；共享依赖更自然。
   - 缺点：强依赖构建工具，运行时版本冲突需要精细管理。
   - 适用：希望共享组件/工具库、构建产物紧密集成的场景。

选型建议：

- 需要强隔离、技术异构、独立部署：选 qiankun / micro-app 等沙箱类方案。
- 需要共享组件、构建产物紧耦合：选 Module Federation。
- 需要跨框架组件级复用：选 Web Components。
- 快速集成、隔离第一：选 iframe。

**评分维度**：
- 能列出 iframe、JS 沙箱、Web Components、Module Federation 四类方案（40%）
- 能对比隔离性、路由、共享能力、适用场景（40%）
- 能给出选型建议（20%）

**常见错误**：
- 把 iframe 的优点说成“零成本”，忽略路由和体验问题。
- 认为 Module Federation 只能用于微前端，其实它更多解决模块共享。
- 把 single-spa 和 qiankun 混为一谈。

**延伸追问**：
- 如果要同时支持 React 子应用和 Vue 子应用，哪种方案更合适？
- Web Components 的 Shadow DOM 能完全解决样式隔离吗？

**相关题目**：
- [FB-26-CO-A-012 Web Components 作为微前端容器的优劣](#FB-26-CO-A-012)
- [FB-26-CP-R-026 微前端技术选型对比](#FB-26-CP-R-026)

**参考资源**：
- [single-spa 官网](https://single-spa.js.org/)
- [Module Federation 文档](https://module-federation.io/)

**口头回答版**：
> 常见方案有四类：iframe 最简单隔离最强但体验差；JS 沙箱类比如 single-spa、qiankun，子应用是独立 SPA，基座负责调度；Web Components 用 Shadow DOM 做组件级隔离；Module Federation 是在构建或运行时共享模块，适合紧耦合共享组件。选型要看是要强隔离独立部署，还是要共享组件和依赖。

---

### FB-26-CO-B-004：qiankun 中子应用需要暴露哪些生命周期？registerMicroApps 和 start 做了什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：高级
**面试知识域**：26 微前端
**标签**：微前端、qiankun、生命周期、前端工程化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 qiankun 子应用需要导出的生命周期函数，以及基座中 `registerMicroApps` 和 `start` 的作用。

**参考答案**：

qiankun 的子应用需要暴露一组标准的生命周期函数，供基座在适当时机调用。手动加载模式下通过 `loadMicroApp` 也会触发这些生命周期。

子应用需要导出的生命周期：

- `bootstrap(props)`：只会在子应用第一次加载时调用，用于初始化不会重复执行的全局逻辑。
- `mount(props)`：子应用被激活时调用，负责渲染到基座提供的容器节点。
- `unmount(props)`：子应用被切换走或销毁时调用，负责卸载 React/Vue 实例、清理事件、释放内存。
- `update(props)`（可选）：子应用 props 更新时调用，支持热更新参数。

示例（基于 Vue 3）：

```js
import { createApp } from 'vue';
import App from './App.vue';

let app = null;

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  app = createApp(App);
  app.mount(props.container ? props.container.querySelector('#app') : '#app');
}

export async function unmount() {
  app.unmount();
  app = null;
}
```

基座 API：

- `registerMicroApps(apps, lifeCycles?)`：注册所有子应用配置，包括 `name`、`entry`、`container`、`activeRule`。
- `start(opts)`：启动 qiankun，开始监听路由变化，根据 `activeRule` 匹配并加载子应用。

```js
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'app-vue',
    entry: '//localhost:8081',
    container: '#subapp-viewport',
    activeRule: '/app-vue',
  },
]);

start({
  sandbox: {
    experimentalStyleIsolation: true,
  },
});
```

**评分维度**：
- 能说出 bootstrap、mount、unmount 三个核心生命周期（40%）
- 能说明 mount 中使用的容器来自基座 props（30%）
- 能区分 registerMicroApps 和 start 的职责（30%）

**常见错误**：
- 忘记在 unmount 中清理实例，导致内存泄漏。
- 认为子应用必须改写成 UMD 包，其实支持 ES module 导出。
- 把 props.container 当成字符串直接 `app.mount(props.container)`，未处理 Vue/React 的挂载差异。

**延伸追问**：
- 如果子应用是 history 路由，activeRule 应该怎么写？
- 多个子应用同时激活时，qiankun 如何管理它们的生命周期？

**相关题目**：
- [FB-26-FS-A-009 qiankun JS 沙箱原理](#FB-26-FS-A-009)
- [FB-26-CO-B-006 基座与子应用路由协调](#FB-26-CO-B-006)

**参考资源**：
- [qiankun 指南 - 子应用接入](https://qiankun.umijs.org/zh/guide/tutorial)

**口头回答版**：
> qiankun 子应用要导出 bootstrap、mount、unmount 三个生命周期，分别做初始化、渲染和卸载。基座用 registerMicroApps 把子应用配置注册好，再用 start 启动路由监听。mount 时基座会把容器节点通过 props.container 传给子应用，子应用要把自己的应用挂到这个容器里。

---

### FB-26-CO-B-005：single-spa 是什么？它和 qiankun 的关系是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：高级
**面试知识域**：26 微前端
**标签**：微前端、qiankun、前端工程化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 single-spa 的定位，并说明 single-spa 与 qiankun 之间的关系与差异。

**参考答案**：

single-spa 是一个用于前端微服务化的 JavaScript 框架，核心职责是**路由监听和应用生命周期调度**。它把每个子应用抽象成一个可以注册、加载、挂载、卸载的“应用”，并根据 URL 决定当前激活哪些应用。

qiankun 基于 single-spa 进行二次封装，主要增加了：

- **HTML Entry**：子应用只需要提供一个入口 URL，qiankun 会自动解析 HTML，提取 JS/CSS 资源并执行。
- **JS 沙箱**：基于 Proxy 的 Sandbox，隔离子应用对 window 的修改。
- **样式隔离**：支持 Shadow DOM、Scoped CSS 等实验性方案。
- **预加载**：支持配置子应用资源预加载策略。
- **更简单的接入**：对子应用导出生命周期的要求更友好。

关系：

- single-spa 是“内核”，负责应用注册、路由劫持、生命周期调度。
- qiankun 是“完整解决方案”，在中国前端社区更流行，开箱即用。

差异对比：

| 维度 | single-spa | qiankun |
|------|-----------|---------|
| 定位 | 微前端路由与生命周期调度器 | 完整微前端框架 |
| Entry | 通常是 JS entry（UMD/Parcel） | 支持 HTML entry |
| 沙箱 | 无内置沙箱 | 内置 ProxySandbox 等 |
| 样式隔离 | 不提供 | 提供 |
| 社区与文档 | 海外为主 | 国内为主 |

**评分维度**：
- 能说明 single-spa 负责路由监听和生命周期调度（40%）
- 能说明 qiankun 是在 single-spa 基础上增加了 HTML entry、沙箱、样式隔离（40%）
- 能指出两者定位和职责差异（20%）

**常见错误**：
- 认为 qiankun 完全替代了 single-spa，其实底层仍依赖其调度能力。
- 把 single-spa 说成“国产框架”。
- 认为 single-spa 自带沙箱。

**延伸追问**：
- 如果不使用 qiankun，只用 single-spa，需要自行解决哪些问题？
- single-spa 的 `registerApplication` 和 qiankun 的 `registerMicroApps` 对应关系是什么？

**相关题目**：
- [FB-26-FS-A-010 single-spa 路由劫持原理](#FB-26-FS-A-010)
- [FB-26-CO-B-004 qiankun 生命周期](#FB-26-CO-B-004)

**参考资源**：
- [single-spa 架构](https://single-spa.js.org/docs/overview)
- [qiankun 与 single-spa 关系](https://qiankun.umijs.org/zh/guide)

**口头回答版**：
> single-spa 是一个负责路由监听和子应用生命周期调度的框架，它根据 URL 决定加载、挂载、卸载哪个子应用。qiankun 是在 single-spa 基础上封装的中国版完整方案，增加了 HTML entry、JS 沙箱、样式隔离、预加载这些能力，开箱即用。简单说 single-spa 是内核，qiankun 是完整解决方案。

---

### FB-26-CO-B-006：微前端场景下基座应用和子应用的路由如何协调？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：高级
**面试知识域**：26 微前端
**标签**：微前端、路由、SPA、qiankun
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明在微前端架构中，基座路由和子应用路由如何配合工作，常见的路由模式有哪些？

**参考答案**：

微前端中的路由需要“两层路由”协同：

1. **基座路由（一级路由）**：负责根据 URL 匹配并激活对应的子应用。常见的匹配规则有 `activeRule: '/app-vue'`。
2. **子应用路由（二级路由）**：子应用内部继续使用自己的 Router（如 React Router、Vue Router）管理页面切换。

常见模式：

- **hash 模式**：
  - 基座通过 hash 变化匹配子应用。
  - 优点：不依赖服务端配置。
  - 缺点：URL 不够美观，子应用间跳转需要统一 hash 规范。

- **history 模式**：
  - 基座和子应用都使用 HTML5 History API。
  - 优点：URL 更自然。
  - 缺点：需要服务端对所有子应用入口做 fallback 到基座 index.html。

协调要点：

- 子应用应配置 `base` / `basename`，使其路由在子路径下正常工作。
- 基座不要拦截子应用内部路由事件，避免循环触发。
- 子应用被卸载时应清理自己的路由监听器，避免内存泄漏。

示例（Vue Router 子应用）：

```js
const router = createRouter({
  history: createWebHistory('/app-vue'),
  routes,
});
```

基座 activeRule 可写为函数以支持更复杂的匹配：

```js
activeRule: (location) => location.pathname.startsWith('/app-vue'),
```

**评分维度**：
- 能区分基座路由和子应用路由两层职责（40%）
- 能说明 hash 与 history 模式的取舍（30%）
- 能提到 basename 和 activeRule 的配合（30%）

**常见错误**：
- 子应用没有配置 basename，导致刷新 404 或路由跳转异常。
- 基座和子应用同时监听 popstate，造成路由抖动。
- 认为所有子应用必须统一使用同一种路由模式。

**延伸追问**：
- 子应用之间如何跳转？直接操作 `window.history` 还是通过基座提供的方法？
- 多个子应用同时激活时，路由冲突怎么解决？

**相关题目**：
- [FB-26-SD-P-019 微前端路由协调深入](#FB-26-SD-P-019)
- [FB-26-CO-B-004 qiankun 生命周期](#FB-26-CO-B-004)

**参考资源**：
- [qiankun 路由说明](https://qiankun.umijs.org/zh/guide/tutorial#%E5%AD%90%E5%BA%94%E7%94%A8%E8%B7%AF%E7%94%B1)

**口头回答版**：
> 微前端路由分两层：基座根据 URL 决定激活哪个子应用，子应用内部再用自己的 Router 管理页面。可以用 hash 模式，简单但 URL 不好看；也可以用 history 模式，URL 自然但需要服务端配置 fallback。子应用要配 basename，基座配 activeRule，两边不要互相拦截路由事件。

---

### FB-26-CO-B-007：微前端中样式隔离有哪些常见方案？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：高级
**面试知识域**：26 微前端
**标签**：微前端、qiankun、子应用隔离、前端工程化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举微前端中解决子应用样式冲突的常见方案，并说明它们的原理和适用场景。

**参考答案**：

样式隔离是微前端必须解决的问题，常见方案：

1. **命名约定（BEM / CSS Modules / Scoped）**
   - 原理：通过类名前缀或编译时 hash 限定作用域。
   - 优点：无运行时开销，团队可落地。
   - 缺点：依赖团队规范，老项目改造成本高。

2. **Shadow DOM**
   - 原理：把子应用挂载到 Shadow Root 下，样式天然限定在 Shadow Tree 内。
   - 优点：浏览器原生隔离，彻底。
   - 缺点：全局样式难以透传，事件冒泡、弹窗 portal、部分 UI 库兼容性需注意。

3. **动态添加/移除样式标签（single-spa / qiankun）**
   - 原理：子应用挂载时插入 `<link/style>`，卸载时移除；基座样式始终保留。
   - 优点：实现简单，子应用间不会留下彼此样式。
   - 缺点：同时激活多子应用时无法隔离。

4. **Scoped CSS / 前缀转换（qiankun experimentalStyleIsolation）**
   - 原理：在运行时给子应用所有选择器添加限定属性选择器，如 `[data-qiankun-app1] .btn`。
   - 优点：不需要 Shadow DOM，兼容性好。
   - 缺点：运行时解析 CSS 有性能开销，部分复杂选择器可能转换不完整。

5. **CSS-in-JS**
   - 原理：通过 JS 生成唯一类名，天然作用域隔离。
   - 优点：配合 React 生态体验好。
   - 缺点：非通用方案，Vue/老项目接入成本高。

选型建议：

- 新项目：优先 BEM/CSS Modules/Scoped + 设计体系约束。
- 老项目接入 qiankun：可开启 experimentalStyleIsolation 或 Shadow DOM。
- 弹窗、工具提示类组件：需要考虑 portal 挂载点，Shadow DOM 可能不适用。

**评分维度**：
- 能列出至少 4 种样式隔离方案（40%）
- 能说明 Shadow DOM 和 Scoped CSS 的原理差异（30%）
- 能指出各方案的局限（30%）

**常见错误**：
- 认为 CSS Modules 能完全解决微前端样式冲突。
- 忽略同时激活多子应用时的隔离需求。
- 使用 Shadow DOM 时没处理全局主题和弹窗挂载问题。

**延伸追问**：
- Shadow DOM 下全局 CSS 变量如何透传？
- 如果子应用用 Tailwind 这种原子化 CSS，样式隔离怎么做？

**相关题目**：
- [FB-26-CD-A-016 手写样式前缀隔离](#FB-26-CD-A-016)
- [FB-26-FS-P-017 qiankun 沙箱深入](#FB-26-FS-P-017)

**参考资源**：
- [qiankun 样式隔离](https://qiankun.umijs.org/zh/guide/tutorial#%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB)

**口头回答版**：
> 样式隔离常见方案有：BEM、CSS Modules、Scoped 这些命名约定；Shadow DOM 原生隔离；qiankun 那种动态插拔样式标签；还有运行时给选择器加前缀的 experimentalStyleIsolation。新项目最好从源头规范命名，老项目接入可以开 qiankun 的样式隔离。Shadow DOM 隔离最彻底，但全局样式和弹窗 portal 要小心。

---

### FB-26-CO-B-008：微前端中公共依赖共享有哪些思路？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：高级
**面试知识域**：26 微前端
**标签**：微前端、Module Federation、构建、前端工程化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明微前端中共享公共依赖（如 React、Vue、lodash、组件库）的常用思路，并分析各自的优缺点。

**参考答案**：

公共依赖共享直接影响打包体积和运行时一致性。常用思路：

1. **externals + CDN / 基座注入全局变量**
   - 原理：子应用构建时把 React/Vue 等设为 external，运行时在基座统一通过 `<script>` 引入。
   - 优点：简单，减少重复打包。
   - 缺点：所有子应用必须使用同一版本；全局变量污染；版本升级耦合。

2. **import map（SystemJS / 原生 importmap）**
   - 原理：通过映射表指定公共依赖的 URL，浏览器按地址加载一次。
   - 优点：子应用按需加载，基座统一控制版本映射。
   - 缺点：依赖浏览器支持或 SystemJS polyfill；版本冲突仍需上层策略解决。

```html
<script type="systemjs-importmap">
{
  "imports": {
    "react": "https://cdn.example.com/react@18.2.0/react.production.min.js",
    "react-dom": "https://cdn.example.com/react@18.2.0/react-dom.production.min.js"
  }
}
</script>
```

3. **Module Federation shared**
   - 原理：构建工具在运行时建立 shared scope，子应用声明所需依赖的版本范围，联邦自动决定去重或加载多版本。
   - 优点：版本管理灵活、自动降级加载、模块粒度共享。
   - 缺点：构建配置复杂、版本范围设计需要治理。

4. **Monorepo 公共包 / 私有组件库**
   - 原理：把公共逻辑抽到内部 npm 包或 workspace，各子应用独立引用并各自打包。
   - 优点：版本自由，构建稳定。
   - 缺点：重复打包，体积增加。

选型建议：

- 多团队独立子应用且版本统一：基座 externals/import map。
- 需要细粒度共享与版本兼容：Module Federation shared。
- 强隔离、版本不统一：各自打包 + Monorepo 公共包。

**评分维度**：
- 能说出 externals、import map、Module Federation、Monorepo 公共包四种思路（50%）
- 能分析版本统一与隔离性的权衡（30%）
- 能给出选型建议（20%）

**常见错误**：
- 认为共享依赖一定能减少体积，忽略版本冲突导致的多版本并存。
- 把所有依赖都 externals，导致运行时加载链路过长。
- 忽略公共依赖升级对所有子应用的影响。

**延伸追问**：
- 如果两个子应用依赖不同 major 版本的 React，怎么处理？
- Module Federation 的 shared 配置中 `requiredVersion` 和 `singleton` 是什么意思？

**相关题目**：
- [FB-26-CO-A-011 Module Federation 共享机制](#FB-26-CO-A-011)
- [FB-26-EN-P-021 公共依赖版本冲突](#FB-26-EN-P-021)

**参考资源**：
- [Webpack externals](https://webpack.js.org/configuration/externals/)
- [Module Federation shared](https://module-federation.io/configure/shared.html)

**口头回答版**：
> 公共依赖共享有几种思路：子应用构建时把 React/Vue 等 externals 掉，基座统一用 script 标签注入；或者用 import map 统一映射公共依赖的 URL；Module Federation 可以在运行时按版本范围共享模块；再就是 Monorepo 里抽公共包各子应用自己打包。选型要看版本要不要统一、要不要强隔离，以及能不能接受构建复杂度。

---

## 进阶题（8 道）{#advanced}

### FB-26-FS-A-009：请解释 qiankun 的 JS 沙箱实现原理。

**题型**：框架原理题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：26 微前端
**标签**：微前端、qiankun、子应用隔离、Proxy
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 qiankun 中 JS 沙箱的作用，并解释 `ProxySandbox`、`LegacySandbox` 和 `SnapshotSandbox` 的区别与适用场景。

**参考答案**：

JS 沙箱的核心目的是**隔离子应用对全局对象（window、document 等）的修改**，防止子应用之间相互污染，同时保证子应用卸载后能够恢复干净的全局环境。

qiankun 主要提供三种沙箱：

1. **ProxySandbox（多例沙箱，推荐）**
   - 原理：为每个子应用创建一个基于 `Proxy` 的伪造 `window` 对象。子应用对 `window` 的读写都被代理到这个沙箱对象上，不会影响真实全局对象。
   - 优点：多子应用可以同时激活，互不干扰；不需要恢复真实 window。
   - 缺点：依赖 ES6 Proxy，IE11 需要 polyfill 或不支持。

2. **LegacySandbox（单例沙箱）**
   - 原理：直接代理真实 `window`，记录所有新增、修改、删除的全局属性，子应用卸载时恢复到之前状态。
   - 优点：兼容性好。
   - 缺点：同一时刻只能激活一个子应用，否则状态会互相覆盖。

3. **SnapshotSandbox（快照沙箱）**
   - 原理：子应用激活前对真实 `window` 做一次完整快照，卸载时根据快照恢复。
   - 优点：不依赖 Proxy，兼容性最强。
   - 缺点：快照/恢复性能开销大，只能单例激活。

```js
// ProxySandbox 简化示意
class ProxySandbox {
  constructor() {
    const fakeWindow = {};
    this.proxy = new Proxy(fakeWindow, {
      get(target, key) {
        if (key in target) return target[key];
        return window[key];
      },
      set(target, key, value) {
        target[key] = value;
        return true;
      },
    });
  }
}
```

配置方式：

```js
start({
  sandbox: {
    strictStyleIsolation: true, // Shadow DOM
    experimentalStyleIsolation: true, // Scoped CSS
  },
});
```

选型建议：

- 现代浏览器 + 多子应用同时激活：ProxySandbox。
- 需要兼容 IE 或低版本浏览器：SnapshotSandbox / LegacySandbox。

**评分维度**：
- 能说明 JS 沙箱隔离全局对象的目的（30%）
- 能区分 ProxySandbox、LegacySandbox、SnapshotSandbox 的原理（40%）
- 能指出多例与单例的适用差异（30%）

**常见错误**：
- 认为沙箱能 100% 隔离所有副作用（如 setTimeout、原生事件监听等）。
- 混淆 LegacySandbox 与 SnapshotSandbox 的恢复机制。
- 忽略 document 沙箱与 window 沙箱需要分别处理。

**延伸追问**：
- ProxySandbox 下子应用如何访问原生 `window` 上的方法？
- 如果子应用注册了全局事件监听，沙箱卸载时如何清理？

**相关题目**：
- [FB-26-FS-P-017 qiankun 沙箱深入](#FB-26-FS-P-017)
- [FB-26-CD-P-020 手写 JS 沙箱](#FB-26-CD-P-020)

**参考资源**：
- [qiankun 沙箱源码](https://github.com/umijs/qiankun/tree/master/src/sandbox)

**口头回答版**：
> qiankun 的 JS 沙箱用来隔离子应用对 window 的修改。ProxySandbox 是给每个子应用一个假的 window，读写都在假对象上，多子应用可以同时跑；LegacySandbox 直接代理真实 window，记录修改后恢复，只能单例；SnapshotSandbox 是拍快照再恢复，兼容性最好但性能差。现代浏览器推荐 ProxySandbox。

---

### FB-26-FS-A-010：single-spa 如何劫持路由并决定加载/卸载哪个子应用？

**题型**：框架原理题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：26 微前端
**标签**：微前端、路由、前端工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 single-spa 路由劫持的核心机制，以及它是如何判断子应用应该被加载、挂载还是卸载的。

**参考答案**：

single-spa 通过**重写浏览器路由 API** 来监听路由变化，并维护一个应用注册表。每次 URL 变化时，它会重新计算每个注册应用的 `activityFn`（活动函数），从而决定应用状态。

核心机制：

1. **劫持路由 API**
   - 重写 `window.history.pushState`、`replaceState`。
   - 监听 `popstate`、`hashchange` 事件。
   - 所有路由变化都会触发 single-spa 的重新路由（reroute）。

2. **注册应用**

```js
registerApplication({
  name: 'app1',
  app: () => import('./app1/app1.js'),
  activeWhen: '/app1',
});
```

3. **应用状态机**
   - `NOT_LOADED`：已注册，未加载。
   - `LOADING_SOURCE_CODE`：正在加载应用代码。
   - `NOT_BOOTSTRAPPED`：代码已加载，未执行 bootstrap。
   - `BOOTSTRAPPING`：正在 bootstrap。
   - `NOT_MOUNTED`：已 bootstrap，未挂载。
   - `MOUNTING`：正在挂载。
   - `MOUNTED`：已挂载，正在显示。
   - `UNMOUNTING`：正在卸载。
   - `UNLOADING`：正在移除并释放资源。

4. **reroute 流程**
   - 遍历所有应用，调用 `activeWhen(location)` 判断哪些应该激活。
   - 对需要激活但尚未加载的应用执行 `loadApp`。
   - 对需要激活且已加载的应用执行 `mount`。
   - 对不再激活且已挂载的应用执行 `unmount`。

```js
// 简化示意
function reroute() {
  const appsToLoad = [];
  const appsToMount = [];
  const appsToUnmount = [];

  apps.forEach(app => {
    const shouldBeActive = app.activeWhen(window.location);
    if (shouldBeActive) {
      if (app.status === NOT_LOADED) appsToLoad.push(app);
      if (app.status === NOT_MOUNTED) appsToMount.push(app);
    } else if (app.status === MOUNTED) {
      appsToUnmount.push(app);
    }
  });

  Promise.all(appsToUnmount.map(unmount))
    .then(() => Promise.all(appsToLoad.map(load)))
    .then(() => Promise.all(appsToMount.map(mount)));
}
```

**评分维度**：
- 能说明 single-spa 重写 history API 和监听事件实现路由劫持（30%）
- 能描述应用状态机及转换条件（40%）
- 能解释 reroute 如何决定加载/挂载/卸载（30%）

**常见错误**：
- 认为 single-spa 使用 iframe 做路由隔离。
- 把 activeWhen 写成纯字符串后忽略 location 匹配规则。
- 认为子应用路由变化会触发基座刷新。

**延伸追问**：
- single-spa 如何支持多个应用同时激活？
- 如果 activeWhen 判断依赖 query 参数，会有什么隐患？

**相关题目**：
- [FB-26-CO-B-005 single-spa 与 qiankun 关系](#FB-26-CO-B-005)
- [FB-26-SD-P-019 微前端路由协调深入](#FB-26-SD-P-019)

**参考资源**：
- [single-spa routing](https://single-spa.js.org/docs/api#registerapplication)

**口头回答版**：
> single-spa 通过重写 pushState、replaceState 和监听 popstate、hashchange 来劫持路由变化。每次变化都会触发 reroute，reroute 会根据每个应用注册的 activeWhen 判断谁该激活，然后走加载、挂载或卸载的状态机。核心就是状态机加路由匹配函数。

---

### FB-26-CO-A-011：Module Federation 的共享依赖机制是如何工作的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：26 微前端
**标签**：微前端、Module Federation、构建、前端工程化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Webpack Module Federation 中 `shared` 配置的作用，说明 `requiredVersion`、`singleton`、`eager` 等字段的含义。

**参考答案**：

Module Federation 让多个独立构建的应用在运行时相互消费彼此的模块。`shared` 配置用于声明哪些依赖应该被共享，以减少重复加载和版本冲突。

核心概念：

- **Shared Scope**：一个全局的共享作用域（默认 `default`），所有联邦应用在运行时将共享模块注册到这里。
- **Host / Remote**：Host 是消费方，Remote 是提供方；一个应用可以同时是 Host 和 Remote。

关键配置字段：

```js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    app1: 'app1@https://app1.example.com/remoteEntry.js',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^18.0.0',
      eager: false,
    },
    'react-dom': { singleton: true },
    lodash: { requiredVersion: '^4.17.0' },
  },
});
```

字段含义：

- `requiredVersion`：当前应用可接受的依赖版本范围。
- `singleton`：为 true 时，整个共享作用域只允许一个实例。如果版本不兼容会发出警告。
- `eager`：为 true 时，共享模块会打包到 entry chunk 而不是异步加载；一般公共运行时设为 true。
- `shareScope`：指定共享到哪个作用域，默认 `default`。
- `version`：手动声明当前构建使用的版本。

共享流程：

1. 应用启动时把共享依赖信息注册到 shared scope。
2. 加载 Remote 时，联邦运行时会检查 shared scope 中是否已有满足 `requiredVersion` 的模块。
3. 如果有则复用，如果没有则从该 Remote 自己的构建产物中加载对应版本。

**评分维度**：
- 能说明 shared scope 和 host/remote 概念（30%）
- 能解释 requiredVersion、singleton、eager 的作用（40%）
- 能描述运行时版本匹配与加载流程（30%）

**常见错误**：
- 把 Module Federation 当成单纯的代码分割。
- 所有依赖都设 `singleton: true`，导致不必要的版本冲突。
- 对 `eager` 理解错误，导致公共模块无法被共享。

**延伸追问**：
- 如果 Host 是 React 17，Remote 是 React 18，shared 会怎么处理？
- Module Federation 与 qiankun 的 shared 方案有什么本质区别？

**相关题目**：
- [FB-26-CO-B-008 公共依赖共享思路](#FB-26-CO-B-008)
- [FB-26-EN-P-021 公共依赖版本冲突](#FB-26-EN-P-021)

**参考资源**：
- [Module Federation shared 配置](https://module-federation.io/configure/shared.html)

**口头回答版**：
> Module Federation 的 shared 是用来声明哪些依赖可以共享的。所有联邦应用启动时会把依赖信息注册到一个全局的 shared scope，加载远程模块时会先看 scope 里有没有满足版本要求的，有就复用，没有就加载自己的版本。singleton 表示只允许一个实例；requiredVersion 是可接受版本范围；eager 表示是否打包到入口里同步加载。

---

### FB-26-CO-A-012：Web Components 作为微前端容器有什么优势和局限？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：26 微前端
**标签**：微前端、组件化、前端工程化、架构设计
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请分析使用 Web Components（Custom Elements + Shadow DOM）作为微前端载体的优势与局限。

**参考答案**：

Web Components 是浏览器原生支持的组件化标准，主要包括 Custom Elements、Shadow DOM、HTML Templates 和 ES Modules。用它做微前端容器时，每个子应用可以封装成一个自定义元素。

优势：

1. **原生隔离**：Shadow DOM 提供样式和 DOM 的天然边界。
2. **框架无关**：Custom Elements 可以被 React、Vue、Angular 原生使用或包装。
3. **标准化**：不依赖第三方运行时，长期来看稳定性好。
4. **组件级粒度**：适合把某个业务模块作为组件分发，而不是完整子应用。

局限：

1. **生命周期弱**：没有内置的子应用加载、路由、状态管理能力。
2. **全局依赖共享困难**：每个 Shadow Root 里的 JS 仍需自行解决 React/Vue 等共享。
3. **样式和事件兼容性**：
   - 全局 CSS 变量/主题不易透入 Shadow DOM。
   - 弹窗、下拉菜单等 portal 元素可能挂载到 body，跳出 Shadow Root。
   - 事件冒泡机制与 Light DOM 不同。
4. **浏览器兼容性**：现代浏览器支持良好，但 IE 需 polyfill。
5. **构建与拆分成本高**：需要把子应用打包成 Custom Element 并暴露清晰属性/事件接口。

示例：

```html
<user-profile user-id="123"></user-profile>
<script type="module" src="/dist/user-profile.js"></script>
```

适用场景：

- 跨框架组件库、设计体系。
- 需要把某个业务组件独立部署的场景。
- 对第三方运行时依赖敏感的项目。

**评分维度**：
- 能说出原生隔离、框架无关、标准化等优势（40%）
- 能指出生命周期、共享依赖、portal 等局限（40%）
- 能给出适用场景（20%）

**常见错误**：
- 认为 Web Components 可以直接替代 qiankun。
- 忽略 Shadow DOM 对全局样式和事件冒泡的影响。
- 把 Custom Elements 和 iframe 混为一谈。

**延伸追问**：
- 在 Shadow DOM 内使用 React portal 会有什么问题？
- 如何解决 Web Components 之间的状态共享？

**相关题目**：
- [FB-26-CO-B-003 常见微前端方案对比](#FB-26-CO-B-003)
- [FB-26-CP-R-026 微前端技术选型对比](#FB-26-CP-R-026)

**参考资源**：
- [Web Components - MDN](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

**口头回答版**：
> Web Components 做微前端容器的最大优势是原生隔离、框架无关，而且还是浏览器标准。局限是它没有子应用生命周期和路由管理，全局依赖共享也不方便；Shadow DOM 里弹窗 portal、全局主题这些要额外处理。它更适合组件级分发，而不是完整子应用调度。

---

### FB-26-SC-A-013：设计一个子应用间通信方案，比较不同通信方式的适用场景。

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：26 微前端
**标签**：微前端、通信、状态管理、前端工程化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
在微前端架构中，不同子应用之间需要传递数据和事件。请设计一个通信方案，并比较 props、事件总线、全局状态、URL、Storage、BroadcastChannel 等方式的优劣。

**参考答案**：

子应用间通信应遵循“最小依赖、单向数据流、可追踪”的原则。常见方式：

1. **基座下发 props（推荐用于主子通信）**
   - 基座把全局数据通过 `props` 注入子应用。
   - 优点：数据流向清晰，子应用可预测。
   - 缺点：跨子应用直接通信需要基座中转。

2. **自定义事件 / 事件总线**
   - 使用原生 `CustomEvent` 或 mitt、EventEmitter3。
   - 优点：解耦，适合一对多广播。
   - 缺点：事件命名冲突、调试困难、强运行时耦合。

```js
// 基座发布
window.dispatchEvent(new CustomEvent('global:theme-change', { detail: { theme: 'dark' } }));

// 子应用订阅
window.addEventListener('global:theme-change', (e) => setTheme(e.detail.theme));
```

3. **全局状态管理**
   - 基座维护一个全局 Store（如 Redux、Zustand、Pinia），子应用通过 props 或共享模块订阅。
   - 优点：状态一致、可追踪。
   - 缺点：增加共享依赖，子应用间耦合变强。

4. **URL 参数**
   - 适合页面间传递少量、可刷新恢复的状态。
   - 优点：可书签化、可分享。
   - 缺点：容量有限，不适合频繁变更。

5. **Storage（localStorage / sessionStorage）**
   - 适合跨标签页或持久化少量配置。
   - 缺点：同步事件 `storage` 有兼容性问题，易造成隐式耦合。

6. **BroadcastChannel**
   - 适合跨标签页、跨 iframe 的广播。
   - 缺点：同源限制，部分旧浏览器不支持。

推荐方案：

- 全局配置/用户信息：基座 props + 全局 Store。
- 跨子应用业务事件：事件总线或全局 Store 的 action。
- 页面状态同步：URL。
- 跨标签页通知：BroadcastChannel。

**评分维度**：
- 能列举至少 5 种通信方式（30%）
- 能从耦合度、可追踪性、适用场景等维度对比（40%）
- 能给出分场景推荐方案（30%）

**常见错误**：
- 所有通信都走全局事件总线，导致调用链难以追踪。
- 使用 localStorage 传递敏感信息。
- 子应用直接修改基座 Store，破坏单向数据流。

**延伸追问**：
- 如何避免事件总线中的命名冲突？
- 如果子应用是不同技术栈，全局状态应该用什么数据格式？

**相关题目**：
- [FB-26-SD-P-018 微前端全局状态设计](#FB-26-SD-P-018)
- [FB-26-CP-R-026 微前端技术选型对比](#FB-26-CP-R-026)

**参考资源**：
- [qiankun 通信](https://qiankun.umijs.org/zh/api#initglobalstatestate)

**口头回答版**：
> 子应用通信方式很多：基座 props 适合主子通信，流向清晰；事件总线适合一对多广播但调试难；全局 Store 状态一致但耦合强；URL 适合可刷新恢复的少量状态；Storage 和 BroadcastChannel 适合跨标签页。我一般推荐 props 和有限的全局 Store 结合，少用隐式事件。

---

### FB-26-EN-A-014：微前端如何实现子应用独立部署？公共路径和资源加载要注意什么？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：26 微前端
**标签**：微前端、部署、构建、前端工程化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明微前端中子应用独立部署的关键点，包括构建产物、publicPath、资源加载、缓存策略等方面的注意事项。

**参考答案**：

独立部署是微前端的核心价值之一，实现时需要关注：

1. **构建产物可独立访问**
   - 每个子应用单独打包，产物部署到独立域名或路径。
   - HTML entry（如 qiankun）时，基座通过 URL 拉取子应用 HTML 并解析资源。

2. **publicPath / runtime publicPath**
   - 子应用构建时 `publicPath` 应指向子应用真实部署地址，否则动态加载的 chunk 会拼接到基座域名下，导致 404。
   - qiankun 中可以在运行时通过 `__INJECTED_PUBLIC_PATH_BY_QIANKUN__` 注入。

```js
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://app1-cdn.example.com/'
    : '/',
};
```

3. **资源加载路径**
   - JS/CSS 应使用相对根路径或绝对 CDN 路径。
   - 避免资源路径依赖基座域名。

4. **缓存策略**
   - HTML 入口不建议强缓存，便于发布后立即生效。
   - JS/CSS 使用 content-hash 文件名 + 长期缓存。

5. **环境变量与配置**
   - 每个子应用独立配置 API 网关、CDN、埋点等。
   - 通过基座 props 注入公共配置，避免每个子应用重复维护。

6. **版本管理**
   - 发布时子应用版本应可被基座感知，常见做法：
     - 固定子应用入口 URL（如 `/app1/index.html`，发布时覆盖）。
     - 或入口 URL 带版本号（如 `/app1/v2.1.0/index.html`），基座配置中心控制。

7. **回滚**
   - 子应用独立回滚：切换入口 URL 版本或 CDN 资源版本。
   - 基座回滚：避免基座与新版本子应用不兼容，需要契约测试。

**评分维度**：
- 能说明独立部署需要独立构建产物和入口（30%）
- 能指出 publicPath 与动态 chunk 加载的关系（30%）
- 能说明缓存、版本、回滚策略（40%）

**常见错误**：
- 子应用 publicPath 写死为 `/`，导致在基座下资源 404。
- 对 HTML 入口做强缓存，发布后用户无法及时更新。
- 子应用回滚时没有通知基座，导致接口契约不匹配。

**延伸追问**：
- 如果子应用使用 CDN，如何防止跨域问题？
- 基座如何知道子应用当前线上版本？

**相关题目**：
- [FB-26-SC-P-022 微前端灰度发布](#FB-26-SC-P-022)
- [FB-26-EN-R-028 微前端团队 CI/CD 与仓库组织](#FB-26-EN-R-028)

**参考资源**：
- [qiankun publicPath 说明](https://qiankun.umijs.org/zh/faq#application-died-in-status-loading_source_code)

**口头回答版**：
> 子应用独立部署关键是每个子应用单独打包，有自己的入口 URL，publicPath 要指向真实部署地址，否则基座加载它的 chunk 会 404。HTML 入口不建议强缓存，JS/CSS 用 content-hash 长期缓存。版本管理可以让基座配置中心控制子应用入口版本，方便灰度和回滚。

---

### FB-26-PE-A-015：微前端场景下有哪些性能优化手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：26 微前端
**标签**：微前端、性能、性能优化、前端工程化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举微前端架构中常见的性能问题，并给出对应的优化手段。

**参考答案**：

微前端性能问题主要集中在首屏、子应用切换、资源重复、运行时内存等方面。

常见问题与优化手段：

1. **首屏/子应用加载慢**
   - 使用路由懒加载，只加载当前激活子应用。
   - 开启预加载：`prefetch` 或 `preload` 未来可能被访问的子应用资源。
   - 对公共依赖使用 externals / import map / Module Federation 共享。

2. **子应用切换白屏**
   - 子应用 keep-alive：保留未激活子应用的 DOM 和实例，切换时复用。
   - qiankun 可以通过 `loadMicroApp` 手动管理实例生命周期。
   - 骨架屏或过渡动画提升感知性能。

3. **公共依赖重复加载**
   - 统一版本并通过 import map 或 shared scope 复用。
   - 对不兼容版本允许加载多版本，但要评估体积影响。

4. **资源体积过大**
   - 子应用按路由拆 chunk。
   - 公共组件库按需加载，避免全量引入。

5. **运行时内存泄漏**
   - 子应用 unmount 时清理定时器、事件监听、全局状态。
   - 避免子应用向真实 window 注入不可回收对象。

6. **基座臃肿**
   - 基座只负责调度和公共能力，避免承载业务逻辑。
   - 基座本身也做代码分割。

示例（qiankun 预加载）：

```js
start({
  prefetch: 'all', // 或函数按需控制
});
```

**评分维度**：
- 能识别首屏、切换白屏、依赖重复、内存泄漏四类问题（40%）
- 能给出懒加载、预加载、keep-alive、依赖共享等优化手段（40%）
- 能强调子应用卸载时的清理工作（20%）

**常见错误**：
- 认为微前端天然比 SPA 快。
- 预加载所有子应用，反而拖慢首屏。
- 忽略 keep-alive 带来的内存占用。

**延伸追问**：
- 预加载策略如何根据用户行为动态调整？
- keep-alive 子应用时，如何防止后台子应用持续运行定时任务？

**相关题目**：
- [FB-26-PE-R-029 微前端性能与体验度量](#FB-26-PE-R-029)
- [FB-26-FS-A-009 qiankun JS 沙箱原理](#FB-26-FS-A-009)

**参考资源**：
- [qiankun 预加载](https://qiankun.umijs.org/zh/api#startopts)

**口头回答版**：
> 微前端性能问题主要是首屏慢、切换白屏、公共依赖重复加载和内存泄漏。优化可以懒加载子应用、预加载可能访问的资源、共享公共依赖、子应用切换 keep-alive、卸载时清理定时器和事件。基座要尽量轻，只负责调度。

---

### FB-26-CD-A-016：手写一段代码，给子应用样式添加前缀以实现样式隔离。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：26 微前端
**标签**：微前端、qiankun、子应用隔离、前端工程化
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请用 JavaScript 实现一个运行时样式隔离函数 `scopeCSS(cssText, scopeName)`，将一段 CSS 文本中的所有选择器都加上指定属性前缀，实现类似 qiankun `experimentalStyleIsolation` 的效果。

**参考答案**：

核心思路：解析 CSS 规则，给每个选择器追加属性选择器 `[data-qiankun="appName"]`，使其只在带有该属性的 DOM 子树下生效。

```js
function scopeCSS(cssText, scopeName) {
  const attr = `[data-qiankun="${scopeName}"]`;
  const scoped = cssText.replace(
    /([^{}]+)\{/g,
    (match, selector) => {
      // 跳过 @ 规则
      const trimmed = selector.trim();
      if (trimmed.startsWith('@') || trimmed === '') {
        return match;
      }
      // 拆分并处理每个选择器
      const selectors = trimmed.split(',').map(s => {
        const sel = s.trim();
        // 忽略 :root、html、body 全局选择器，可单独处理
        if (/^(:root|html|body)$/.test(sel)) {
          return sel;
        }
        return `${attr} ${sel}`;
      });
      return `${selectors.join(', ')} {`;
    }
  );
  return scoped;
}

const css = `
.btn { color: red; }
.card .title, .card .body { font-size: 14px; }
@media (max-width: 600px) {
  .btn { width: 100%; }
}
`;

console.log(scopeCSS(css, 'app1'));
```

预期输出片段：

```css
[data-qiankun="app1"] .btn { color: red; }
[data-qiankun="app1"] .card .title, [data-qiankun="app1"] .card .body { font-size: 14px; }
@media (max-width: 600px) {
  [data-qiankun="app1"] .btn { width: 100%; }
}
```

使用方式：

```html
<div data-qiankun="app1">
  <!-- 子应用挂载在这里，样式只在此范围内生效 -->
</div>
```

注意事项：

- 实际生产需用 PostCSS 等工具解析 AST，正则处理复杂选择器容易出错。
- `@keyframes`、`@font-face` 等规则不需要加前缀，但 `@media`、`@supports` 内的选择器需要。
- `html`、`body`、`:root` 是否需要转换取决于设计，全局样式可能需要特殊处理。

**评分维度**：
- 能实现基本选择器加属性前缀（40%）
- 能处理 @media 内选择器（30%）
- 能指出正则方案的局限并提到 AST 解析（30%）

**常见错误**：
- 对所有规则统一加前缀，导致 @keyframes、@font-face 失效。
- 忽略多个选择器以逗号分隔的情况。
- 不理解这种隔离方式依赖 DOM 属性挂载点。

**延伸追问**：
- 如果子应用动态插入 style 标签，如何自动加上这个前缀？
- Shadow DOM 方案和这种属性前缀方案相比，各有什么优缺点？

**相关题目**：
- [FB-26-CO-B-007 样式隔离常见方案](#FB-26-CO-B-007)
- [FB-26-FS-P-017 qiankun 沙箱深入](#FB-26-FS-P-017)

**参考资源**：
- [PostCSS AST](https://postcss.org/)

**口头回答版**：
> 可以写个函数把 CSS 里的每个选择器前面加上一个属性选择器，比如 [data-qiankun="app1"]。用正则替换选择器部分，但要注意 @media 里面的选择器也要处理，@keyframes 这种不需要加。生产环境最好用 PostCSS 解析 AST，正则容易漏。然后子应用挂载到带这个属性的容器里，样式就只在该容器生效。

---

## 深入题（7 道）{#proficient}

### FB-26-FS-P-017：qiankun 沙箱存在哪些逃逸风险？多实例场景下如何处理副作用？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：26 微前端
**标签**：微前端、qiankun、安全、子应用隔离
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请深入分析 qiankun 沙箱可能存在的逃逸场景，并说明多实例同时激活时如何管理全局副作用（定时器、事件监听、原生对象修改等）。

**参考答案**：

沙箱只能拦截通过 `window` 对象的读写，无法拦截所有副作用。常见逃逸风险：

1. **原生全局函数副作用**
   - `setTimeout` / `setInterval` 返回的定时器如果没有清理，子应用卸载后仍会执行。
   - `requestAnimationFrame`、`fetch` 等异步任务同理。

2. **DOM 事件监听**
   - 子应用在真实 `document` / `window` 上注册的监听器，unmount 时未移除会持续触发。

3. **原生对象原型污染**
   - 修改 `Array.prototype`、`String.prototype` 等会全局生效，沙箱无法隔离。

4. **document / window 直接引用**
   - 如果子应用代码通过闭包持有真实 `window` 引用并直接修改属性，ProxySandbox 无法拦截。

5. **Service Worker / Cache Storage**
   - 全局作用域，无法通过沙箱隔离。

多实例管理策略：

- **副作用收集与还原**：qiankun 的 `patchAtMounting` 会重写 `setTimeout`、`addEventListener` 等，记录所有副作用并在卸载时清理。
- **快照机制**：SnapshotSandbox 在激活/卸载时保存和恢复 window 状态。
- **事件委托**：建议子应用内部事件尽量挂在子应用容器上，不要直接挂 document。
- **定时器集中管理**：在子应用 mount 时创建，unmount 时统一 clear。

```js
let timers = [];

export async function mount(props) {
  const timer = setInterval(() => {}, 1000);
  timers.push(timer);
  // render...
}

export async function unmount() {
  timers.forEach(clearInterval);
  timers = [];
}
```

最佳实践：

- 子应用代码应避免污染全局原型和原生对象。
- 基座应对子应用源码进行静态扫描，禁止修改原型链等危险操作。
- 使用 ProxySandbox + 副作用补丁，而不是依赖快照沙箱。

**评分维度**：
- 能指出定时器、事件监听、原型污染等逃逸风险（40%）
- 能说明 qiankun 副作用补丁和快照的恢复机制（30%）
- 能给出子应用侧和基座侧的治理方案（30%）

**常见错误**：
- 认为 ProxySandbox 可以拦截所有全局副作用。
- 忽略子应用对 document 的污染。
- 多实例同时激活时仍然使用 LegacySandbox / SnapshotSandbox。

**延伸追问**：
- 如果子应用必须修改 `Array.prototype`，怎么处理？
- 微前端下如何审计第三方脚本的全局副作用？

**相关题目**：
- [FB-26-FS-A-009 qiankun JS 沙箱原理](#FB-26-FS-A-009)
- [FB-26-CD-P-020 手写 JS 沙箱](#FB-26-CD-P-020)

**参考资源**：
- [qiankun sandbox 源码](https://github.com/umijs/qiankun/tree/master/src/sandbox)

**口头回答版**：
> qiankun 沙箱主要隔离对 window 的读写，但拦不住所有副作用。像 setTimeout、addEventListener、修改 Array.prototype、直接持有真实 window 引用这些都会逃逸。多实例同时激活要用 ProxySandbox，并且 qiankun 会补丁 setTimeout、事件监听等，子应用卸载时清理。最好的治理还是从代码规范入手，不让子应用污染全局原型。

---

### FB-26-SD-P-018：微前端下全局状态应该如何设计？单一 Store 还是各自 Store + 事件同步？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：26 微前端
**标签**：微前端、状态管理、通信、架构设计
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
在微前端架构中，全局状态（用户信息、权限、主题等）与子应用私有状态应该如何划分？请给出设计方案并比较单一 Store 与各自 Store + 事件同步两种模式的优劣。

**参考答案**：

全局状态设计应遵循“最小共享、职责边界清晰、可预测”的原则。

状态分层：

1. **基座全局状态**
   - 用户身份、权限、主题、语言、全局通知等跨子应用共享的数据。
   - 由基座维护，通过 props 或共享模块下发。

2. **子应用私有状态**
   - 子应用内部业务状态，如表单、列表、路由状态。
   - 子应用自行管理，避免外部依赖。

3. **跨子应用业务状态**
   - 少量需要同步的状态，如购物车数量、待办提醒。
   - 通过事件总线或共享 Store 同步。

模式对比：

| 维度 | 单一 Store | 各自 Store + 事件同步 |
|------|-----------|----------------------|
| 一致性 | 高 | 需要事件保证最终一致 |
| 耦合度 | 子应用依赖基座 Store | 子应用相对独立 |
| 技术栈 | 必须统一状态库 | 可各自选择 |
| 可维护性 | 数据流清晰 | 事件链可能复杂 |
| 升级灵活性 | 低，升级 Store 影响所有子应用 | 高 |

推荐方案：

- 基座维护一个轻量全局 Store（如 Zustand / Pinia），只放真正的全局状态。
- 子应用通过 props 注入只读的全局状态；需要修改时调用基座提供的 action。
- 跨子应用状态变更通过事件总线或全局 Store 的订阅机制广播。
- 避免子应用直接修改全局 Store。

```js
// 基座
import { initGlobalState } from 'qiankun';
const actions = initGlobalState({ user: null, theme: 'light' });

// 子应用
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    setTheme(state.theme);
  });
  props.setGlobalState({ theme: 'dark' }); // 通过基座 action 修改
}
```

**评分维度**：
- 能清晰划分基座全局状态、子应用私有状态、跨应用状态（30%）
- 能对比单一 Store 与各自 Store + 事件同步（40%）
- 能给出可落地的分层方案（30%）

**常见错误**：
- 把所有状态都放到基座 Store，导致子应用失去自治性。
- 子应用之间直接互相调用状态，形成网状依赖。
- 忽略状态变更的可追踪性。

**延伸追问**：
- 如果基座是 React，子应用是 Vue，共享 Store 怎么设计？
- 如何保证全局状态变更后子应用不会过度重渲染？

**相关题目**：
- [FB-26-SC-A-013 子应用间通信方案](#FB-26-SC-A-013)
- [FB-26-SD-R-025 设计企业级微前端平台](#FB-26-SD-R-025)

**参考资源**：
- [qiankun initGlobalState](https://qiankun.umijs.org/zh/api#initglobalstatestate)

**口头回答版**：
> 微前端状态最好分三层：基座管用户、权限、主题这些真全局状态；子应用管自己的业务状态；少量跨应用状态用事件或共享 Store 同步。单一 Store 一致性好但耦合高；各自 Store 加事件同步更灵活但事件链可能复杂。我通常让基座维护一个轻量全局 Store，子应用只读，通过基座 action 去改。

---

### FB-26-SD-P-019：微前端路由协调的深入问题有哪些？如何解决？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：26 微前端
**标签**：微前端、路由、SPA、qiankun
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
在微前端中使用 HTML5 History 模式时，经常会遇到 basename、activeWhen、嵌套路由、404 等问题。请分析这些深入问题并给出解决方案。

**参考答案**：

1. **basename 与 activeRule 对齐**
   - 子应用路由的 `basename` 应等于基座的 `activeRule`，否则子应用内部路由会拼错路径。
   - 如基座 activeRule 为 `/app-vue`，Vue Router 应配置 `createWebHistory('/app-vue')`。

2. **history 与 hash 模式混用**
   - 推荐统一为 history 模式，体验更好。
   - 如果子应用必须 hash，基座 activeRule 需同时匹配 pathname 和 hash。

3. **嵌套路由 / 多级子应用**
   - 避免子应用内部再嵌套微前端基座，形成多层调度。
   - 如果必须多层，需要明确每一层的 activeWhen 和 basename。

4. **404 处理**
   - 服务端所有子应用路径都应 fallback 到基座 index.html。
   - 基座负责根据 URL 匹配子应用；子应用负责自己内部 404。

5. **子应用间跳转**
   - 推荐通过基座提供的导航 API 跳转，避免直接操作 `window.history` 导致状态不一致。

```js
// 基座提供
window.microAppNavigate = (path) => {
  history.pushState(null, '', path);
};

// 子应用调用
window.microAppNavigate('/app-react/page2');
```

6. **路由守卫与权限**
   - 基座统一做登录态和权限校验。
   - 子应用内部只做业务级权限控制。

7. **同时激活多子应用**
   - 基座 activeRule 不要互相包含，避免两个子应用同时匹配同一路径。
   - 如果确实需要同时显示，使用不同容器和精确匹配规则。

**评分维度**：
- 能说明 basename 与 activeRule 的对应关系（25%）
- 能处理 history/hash、嵌套、404、子应用跳转等问题（45%）
- 能说明基座与子应用在权限和路由守卫上的分工（30%）

**常见错误**：
- 子应用 basename 写死为 `/`。
- 服务端未配置 fallback，刷新 404。
- 子应用直接 `history.push` 跳转到其他子应用路径，导致基座未同步。

**延伸追问**：
- 如果基座和子应用都使用 React Router v6，basename 怎么传递？
- 子应用内部路由守卫失效是什么原因？

**相关题目**：
- [FB-26-CO-B-006 基座与子应用路由协调](#FB-26-CO-B-006)
- [FB-26-FS-A-010 single-spa 路由劫持原理](#FB-26-FS-A-010)

**参考资源**：
- [qiankun 路由 FAQ](https://qiankun.umijs.org/zh/faq)

**口头回答版**：
> 微前端路由协调要注意 basename 和 activeRule 对齐，子应用用 history 模式要配 basename。服务端要 fallback 到基座，不然刷新 404。子应用之间跳转最好走基座提供的导航 API，不要直接操作 history。基座做登录和全局权限，子应用做业务权限。同时激活多子应用时 activeRule 不要互相包含。

---

### FB-26-CD-P-020：手写一个基于 Proxy 的简易 JS 沙箱。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：26 微前端
**标签**：微前端、子应用隔离、Proxy、前端工程化
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请手写一个基于 `Proxy` 的简易 JS 沙箱类 `ProxySandbox`，要求：
1. 子应用在沙箱内对 `window` 的读写不影响真实全局对象；
2. 子应用可以读取真实 window 上已有的属性；
3. 支持激活和失活，失活后沙箱内修改不再影响外部。

**参考答案**：

```js
class ProxySandbox {
  constructor(name) {
    this.name = name;
    this.isActive = false;
    this.proxy = null;
    this.fakeWindow = {};
    this._bindProxy();
  }

  _bindProxy() {
    const self = this;
    const rawWindow = window;
    const fakeWindow = this.fakeWindow;

    this.proxy = new Proxy(fakeWindow, {
      set(target, key, value) {
        if (self.isActive) {
          target[key] = value;
          return true;
        }
        throw new Error(`Sandbox ${self.name} is not active`);
      },
      get(target, key) {
        if (key === Symbol.unscopables) return undefined;
        // 优先从 fakeWindow 读取
        if (key in target) {
          return target[key];
        }
        const value = rawWindow[key];
        // 避免 this 指向问题，对函数做 this 绑定
        if (typeof value === 'function' && !value.prototype) {
          return value.bind(rawWindow);
        }
        return value;
      },
      has(target, key) {
        return key in target || key in rawWindow;
      },
      deleteProperty(target, key) {
        if (key in target) {
          delete target[key];
          return true;
        }
        return true;
      },
    });
  }

  active() {
    this.isActive = true;
  }

  inactive() {
    this.isActive = false;
  }
}

// 使用示例
const sandbox = new ProxySandbox('app1');
sandbox.active();

const code = `
  window.appName = 'app1';
  console.log(window.appName);
`;

// 用 Function 构造器将沙箱 proxy 作为 window 传入
const exec = new Function('window', code);
exec(sandbox.proxy);

console.log(window.appName); // undefined，未污染真实 window

sandbox.inactive();
```

关键点：

- `set` 只写入 `fakeWindow`。
- `get` 优先读 `fakeWindow`，再回退真实 `window`。
- 对原生方法（如 `console.log`）做 `this` 绑定，避免在沙箱内调用时 this 指向 fakeWindow 报错。
- `active` 状态控制是否允许写入。

局限：

- 无法拦截通过闭包持有真实 window 的代码。
- 未处理 `document`、定时器、事件监听等副作用。

**评分维度**：
- 能正确实现 Proxy get/set 隔离读写（40%）
- 能处理真实 window 属性回退和 this 绑定（30%）
- 能说明激活/失活机制和沙箱局限（30%）

**常见错误**：
- 直接代理真实 window 而没有 fakeWindow，导致无法多实例。
- 返回原生方法时没有绑定 this，调用 `window.alert()` 报错。
- 忽略 active 状态控制。

**延伸追问**：
- 如果要拦截 `document.querySelector`，应该怎么扩展？
- 这个沙箱和 qiankun 的 ProxySandbox 还有什么差距？

**相关题目**：
- [FB-26-FS-A-009 qiankun JS 沙箱原理](#FB-26-FS-A-009)
- [FB-26-FS-P-017 qiankun 沙箱深入](#FB-26-FS-P-017)

**参考资源**：
- [MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

**口头回答版**：
> 手写 ProxySandbox 就是创建一个 fakeWindow，用 Proxy 代理它。set 的时候只写到 fakeWindow，get 的时候先在 fakeWindow 找，找不到再回退真实 window。返回原生方法时要 bind 一下 this，不然调用会报错。再加一个 active 开关控制是否允许写入。但它拦不住闭包里直接拿真实 window 的代码，也管不了定时器和事件监听。

---

### FB-26-EN-P-021：微前端公共依赖版本冲突如何解决？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：26 微前端
**标签**：微前端、Module Federation、版本管理、前端工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
微前端中不同子应用可能依赖同一库的不同版本。请说明如何识别、管理和解决公共依赖的版本冲突问题。

**参考答案**：

版本冲突根因：

- 子应用独立开发，各自升级依赖节奏不同。
- 共享依赖时如果只加载一个版本，可能不满足所有子应用的 semver 范围。

解决策略：

1. **统一版本治理**
   - 制定组织级依赖基线（如所有子应用 React 必须 >=18.0.0 <19）。
   - 使用 Monorepo workspace 或 lockfile 同步关键依赖。

2. **运行时版本匹配（Module Federation）**
   - 通过 `requiredVersion` + `singleton` 控制。
   - 如果版本不兼容且 `singleton: true`，联邦运行时会加载满足各自范围的版本，但 singleton 为 true 时只能保留一个实例，此时会报警告。
   - 对不兼容版本，允许非 singleton 依赖加载多版本。

```js
shared: {
  react: { singleton: true, requiredVersion: '^18.0.0' },
  lodash: { requiredVersion: '^4.17.0' }, // 不强制 singleton
}
```

3. **import map 分层**
   - 基座按子应用/路由维护不同 import map，精确控制加载哪个版本。
   - 适合对版本隔离要求高的场景。

4. **子应用独立打包**
   - 冲突依赖不参与共享，每个子应用打包自己的版本。
   - 优点：彻底隔离；缺点：体积增加。

5. **版本检测与 CI 门禁**
   - 在 CI 中扫描子应用依赖树，发现与基线冲突时阻断发布。
   - 使用 `depcheck`、`pnpm licenses`、自定义脚本等工具。

6. **渐进式升级**
   - 大版本升级时，允许部分子应用先升级，其余子应用逐步迁移，而不是一刀切。

**评分维度**：
- 能分析版本冲突根因（20%）
- 能说出统一治理、Module Federation、import map、独立打包等策略（50%）
- 能提出 CI 检测和渐进式升级机制（30%）

**常见错误**：
- 所有依赖都设 singleton，导致版本升级困难。
- 忽略依赖的 peerDependencies 声明。
- 没有组织级依赖基线，任由各子应用自由升级。

**延伸追问**：
- React 这种只能有一个实例的库，版本冲突怎么处理？
- 如果基座升级了公共依赖 major 版本，子应用如何平滑迁移？

**相关题目**：
- [FB-26-CO-A-011 Module Federation 共享机制](#FB-26-CO-A-011)
- [FB-26-CO-B-008 公共依赖共享思路](#FB-26-CO-B-008)

**参考资源**：
- [semver](https://semver.org/lang/zh-CN/)
- [Module Federation shared](https://module-federation.io/configure/shared.html)

**口头回答版**：
> 公共依赖版本冲突是因为各子应用升级节奏不同。解决办法：一是制定组织级依赖基线；二是 Module Federation 用 requiredVersion 和 singleton 控制，不兼容就允许加载多版本；三是 import map 分层精确控制；四是冲突库让子应用自己打包；五是 CI 里扫描依赖树做门禁。大版本升级最好渐进式，不要一刀切。

---

### FB-26-SC-P-022：如何对微前端子应用做灰度发布？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：26 微前端
**标签**：微前端、灰度、部署、前端工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个微前端子应用的灰度发布方案，要求支持按用户、按路由、按权重三种灰度策略，并说明每个策略的实现方式和适用场景。

**参考答案**：

灰度发布在微前端中更容易落地，因为子应用独立部署，基座可以动态决定加载哪个版本。

核心思路：

- 子应用发布多个版本入口（如 `app1/v1.2.0/index.html`、`app1/v1.3.0/index.html`）。
- 基座或网关根据灰度规则选择对应入口地址。
- 规则可放在配置中心、Cookie、请求头或 URL 参数中。

三种策略：

1. **按用户灰度**
   - 规则：根据用户 ID、部门、标签等判断是否命中灰度。
   - 实现：登录后由后端接口返回用户是否命中；基座根据结果选择子应用版本。
   - 适用：内测、特定客户验证、企业用户。

```js
const user = await fetchUser();
const entry = user.grayList.includes('app1-v2')
  ? 'https://app1.example.com/v2/index.html'
  : 'https://app1.example.com/v1/index.html';
```

2. **按路由灰度**
   - 规则：某些路径固定走新版本，其他路径走旧版本。
   - 实现：基座 activeRule 配置多个入口，按 pathname 匹配。
   - 适用：新页面逐步替换旧页面。

```js
registerMicroApps([
  { name: 'app1-old', entry: '/app1/v1/', activeRule: '/legacy' },
  { name: 'app1-new', entry: '/app1/v2/', activeRule: '/new' },
]);
```

3. **按权重灰度**
   - 规则：随机或按流量比例（如 5%、20%）命中新版本。
   - 实现：网关或基座根据 hash(userId) % 100 决定。
   - 适用：全量发布前的逐步放量。

```js
const bucket = hashUserId(user.id) % 100;
const entry = bucket < 10 ? '/v2/' : '/v1/';
```

配套能力：

- **配置中心**：实时调整灰度规则，无需发版。
- **监控与回滚**：灰度版本错误率、性能指标异常时一键切换回旧版本入口。
- **数据隔离**：灰度版本如需新后端接口，应通过独立 API 版本或 feature flag 隔离。

**评分维度**：
- 能说明灰度核心是基座动态选择子应用入口（20%）
- 能分别设计按用户、按路由、按权重的实现（50%）
- 能提到配置中心、监控、回滚配套（30%）

**常见错误**：
- 灰度规则硬编码在基座，调整需要发版。
- 灰度版本和旧版本共享后端接口，导致数据不一致。
- 没有灰度失败后的快速回滚能力。

**延伸追问**：
- 如果基座本身也要灰度，怎么做？
- 如何确保灰度用户在不同页面刷新后仍然命中同一版本？

**相关题目**：
- [FB-26-EN-A-014 子应用独立部署](#FB-26-EN-A-014)
- [FB-26-EN-R-028 微前端团队 CI/CD 与仓库组织](#FB-26-EN-R-028)

**参考资源**：
- [Feature Flags 实践](https://martinfowler.com/articles/feature-toggles.html)

**口头回答版**：
> 微前端灰度 easiest 的是让子应用发多个版本，基座根据规则决定加载哪个入口。按用户灰度就是根据用户标签命中；按路由灰度就是不同路径走不同版本；按权重灰度就是按比例或 hash 分配流量。规则最好放配置中心，能实时改，还要配监控和一键回滚。

---

### FB-26-CP-P-023：微前端下的监控和异常隔离应该怎么做？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：26 微前端
**标签**：微前端、监控、前端工程化、可观测性
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
在微前端架构中，一个子应用的报错不应影响其他子应用和基座。请设计一套监控与异常隔离方案，包括错误捕获、定位、上报、影响面控制等方面。

**参考答案**：

监控与异常隔离需要“子应用自治 + 基座统一收集”两层设计。

1. **错误边界（Error Boundary）**
   - 基座和子应用都应设置 React/Vue 错误边界，防止子应用崩溃拖垮基座。
   - qiankun 中子应用抛出的未捕获异常应由基座捕获并记录来源。

2. **全局异常监听**
   - 基座监听 `window.onerror`、`window.addEventListener('error')`、`unhandledrejection`。
   - 上报时附带子应用名称、版本、当前 URL、用户 ID。

```js
window.addEventListener('error', (e) => {
  report({
    type: 'error',
    message: e.message,
    filename: e.filename,
    appName: getCurrentActiveApp(), // 基座维护当前激活子应用
  });
});
```

3. **Source Map 管理**
   - 每个子应用独立生成 Source Map，发布时上传到错误监控平台。
   - 上报的 stack 中需包含子应用版本，便于平台拉取对应 Source Map。

4. **性能监控**
   - 基座监控首屏、子应用切换耗时、资源加载时间。
   - 子应用内部监控自身业务指标。

5. **影响面控制**
   - 子应用连续异常时基座可自动降级：显示占位图、切换到旧版本入口、或隐藏该子应用。
   - 通过 feature flag 快速关闭有问题的子应用。

6. **链路追踪**
   - 统一 traceId，跨基座和子应用的请求、报错都带上 traceId。
   - 便于定位是基座、网关还是子应用的问题。

7. **日志规范**
   - 统一日志格式、级别、采样率。
   - 避免各子应用重复上报同一类错误。

**评分维度**：
- 能说明基座与子应用分层捕获异常（30%）
- 能设计错误上报字段和 Source Map 版本对应（30%）
- 能提出降级、链路追踪、日志规范等治理措施（40%）

**常见错误**：
- 只在一个地方监听全局错误，无法区分子应用来源。
- 没有为每个子应用独立管理 Source Map。
- 子应用异常直接拖垮基座，没有降级方案。

**延伸追问**：
- 如何防止子应用循环报错导致上报风暴？
- 子应用报错后，基座如何优雅地展示“该模块暂时不可用”？

**相关题目**：
- [FB-26-PE-A-015 微前端性能优化](#FB-26-PE-A-015)
- [FB-26-PE-R-029 微前端性能与体验度量](#FB-26-PE-R-029)

**参考资源**：
- [Sentry 微前端支持](https://docs.sentry.io/platforms/javascript/best-practices/micro-frontends/)

**口头回答版**：
> 微前端监控要分两层：基座统一监听全局错误并收集，子应用内部用错误边界自保。上报时要带子应用名、版本、当前路径，Source Map 也要按版本管理。基座还要能自动降级，比如某个子应用一直报错就显示占位或切回旧版本。跨基座和子应用的请求统一 traceId，方便定位问题。

---

## 架构题（28 道）{#architect}

### FB-26-SD-R-024：从巨石应用迁移到微前端的策略和步骤是什么？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：26 微前端
**标签**：微前端、迁移、架构设计、前端工程化
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
假设你们有一个大型 React 巨石应用，业务线多、代码耦合严重。请给出从巨石应用迁移到微前端的完整策略、步骤和注意事项。

**参考答案**：

迁移策略应遵循“渐进式、低风险、可回滚”的原则，而不是一次性重写。

1. **现状评估**
   - 梳理业务域边界、团队边界、公共组件、公共状态。
   - 识别技术债务、构建性能瓶颈、发布冲突最严重的模块。
   - 输出微前端拆分地图（Domain Map）。

2. **选择基座与方案**
   - 选型 qiankun / Module Federation / micro-app / Web Components。
   - 根据是否需要强隔离、技术异构、独立部署决定。

3. **搭建基座**
   - 基座只做登录、权限、路由调度、全局状态、布局框架、埋点。
   - 不承载业务逻辑，保持轻量。

4. **拆分第一个子应用（试点）**
   - 选择边界清晰、团队独立、改动影响小的业务域。
   - 采用“ strangler fig ”模式：保留旧页面入口，新子应用逐步替换。

5. **公共依赖与组件治理**
   - 把公共 UI 组件库抽成独立包或 shared 模块。
   - 明确依赖版本基线，避免各子应用重复造轮子。

6. **渐进式拆分**
   - 按业务域逐个拆出子应用。
   - 每个子应用拆出前先做代码边界清理：减少跨模块直接引用。

7. **灰度与回滚**
   - 新子应用通过 activeRule 按路由灰度上线。
   - 保留旧版本入口，出现问题可一键回滚。

8. **监控与度量**
   - 监控构建时长、发布频率、线上错误、性能指标。
   - 度量团队自治度：是否减少发布冲突、是否缩短需求交付周期。

注意事项：

- 不要为了微前端而微前端，拆分粒度以团队边界和业务边界为准。
- 保留足够长时间的过渡期，允许旧页面和新子应用共存。
- 数据层、API 层也要同步拆分，避免前端微服务化而后端仍是单体。

**评分维度**：
- 能给出评估、选型、基座、试点、治理、灰度、度量完整步骤（50%）
- 能强调渐进式和 strangler fig 模式（25%）
- 能指出业务边界、团队边界、数据层同步等关键注意事项（25%）

**常见错误**：
- 一上来就全面拆分，导致长期分支冲突和项目延期。
- 基座承载过多业务，变成新的巨石。
- 只拆前端，不拆后端接口，导致跨子应用接口耦合。

**延伸追问**：
- 如何确定第一个试点的业务域？
- 如果巨石应用里有大量全局状态，迁移时怎么处理？

**相关题目**：
- [FB-26-CO-B-002 微前端与巨石应用对比](#FB-26-CO-B-002)
- [FB-26-SD-R-025 设计企业级微前端平台](#FB-26-SD-R-025)

**参考资源**：
- [Strangler Fig Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html)

**口头回答版**：
> 迁移微前端不能一步到位。先评估业务和团队边界，选边界清晰的模块做试点；搭一个只负责调度和公共能力的轻量基座；用 strangler fig 方式，新子应用和旧页面共存，逐步替换。同时要治理公共组件和依赖，按路由灰度上线，保留回滚能力，并监控构建、发布、错误、性能指标。拆分粒度要以团队和业务范围为准，不要为了拆而拆。

---

### FB-26-SD-R-025：设计一个企业级微前端平台，需要包含哪些核心模块？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：26 微前端
**标签**：微前端、架构设计、前端工程化、Monorepo
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个企业级微前端平台，说明其核心模块、职责划分、数据流转，以及如何支撑多团队长期协作。

**参考答案**：

企业级微前端平台不仅是技术框架，更是包含规范、工具链、治理体系的工程平台。

核心模块：

1. **基座应用（Shell）**
   - 职责：路由调度、生命周期管理、全局状态、登录/权限、布局、埋点。
   - 要求：轻量、稳定、尽量少发版。

2. **子应用（Micro Apps）**
   - 职责：独立业务域，独立开发、构建、部署。
   - 规范：统一入口协议、统一生命周期导出、统一埋点/日志规范。

3. **应用注册中心（App Registry）**
   - 职责：管理子应用元数据（name、entry、activeRule、version、team、owner）。
   - 支持配置中心实时更新，支撑灰度发布。

4. **构建与部署平台**
   - 职责：CI/CD 流水线、版本管理、产物托管、Source Map 上传、灰度策略。
   - 每个子应用独立 pipeline，发版不阻塞其他团队。

5. **依赖共享与版本治理**
   - 公共依赖清单、版本基线、shared 配置、import map。
   - CI 门禁检测冲突。

6. **公共能力层**
   - 公共组件库、工具库、埋点 SDK、错误监控 SDK、权限 SDK。
   - 以 npm 包或 Module Federation 共享模块形式提供。

7. **监控与可观测性**
   - 统一错误上报、性能监控、链路追踪、业务指标看板。
   - 子应用异常自动降级告警。

8. **开发者工具（CLI / Devtools）**
   - 本地联调、子应用快速创建、依赖检查、沙箱调试、mock 数据。

数据流转：

- 用户访问基座 → 基座从注册中心拉取配置 → 根据 URL 匹配子应用 → 加载并挂载子应用 → 子应用通过 props/共享状态与基座交互 → 监控数据统一上报。

多团队协作：

- 每个子应用有明确的 owner 和 on-call。
- 通过 ADR（架构决策记录）管理技术选型和接口契约。
- 定期架构 review，防止子应用间隐式耦合。

**评分维度**：
- 能列出基座、子应用、注册中心、构建部署、依赖治理、公共能力、监控、CLI 八大模块（50%）
- 能说明各模块职责和数据流转（30%）
- 能提出团队协作与治理机制（20%）

**常见错误**：
- 只关注技术框架，忽略注册中心和 CI/CD。
- 基座承载过多业务，导致基座成为瓶颈。
- 缺少监控和异常降级能力。

**延伸追问**：
- 注册中心应该放在前端还是后端？
- 如何防止子应用绕过基座直接调用其他子应用接口？

**相关题目**：
- [FB-26-SD-R-024 从巨石应用迁移到微前端](#FB-26-SD-R-024)
- [FB-26-EN-R-028 微前端团队 CI/CD 与仓库组织](#FB-26-EN-R-028)

**参考资源**：
- [Building Micro-Frontends](https://www.buildingmicrofrontends.com/)

**口头回答版**：
> 企业级微前端平台核心有八块：基座负责调度和公共能力；子应用独立业务域；注册中心管理子应用元数据和版本；构建部署平台支撑每个子应用独立发版；依赖共享和版本治理防止冲突；公共能力层提供组件库、监控、权限；监控和可观测性做错误、性能、链路追踪；CLI 和开发者工具提升效率。数据流是基座拉注册中心配置，按 URL 加载子应用，监控统一上报。团队上要有 owner、ADR、定期 review。

---

### FB-26-CP-R-026：面对不同业务场景，如何为团队选型 qiankun / Module Federation / Web Components / iframe？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：26 微前端
**标签**：微前端、架构设计、qiankun、Module Federation
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请结合具体业务场景，给出 qiankun、Module Federation、Web Components、iframe 的选型思路和落地建议。

**参考答案**：

选型应从**隔离需求、共享需求、团队结构、技术栈现状**四个维度出发。

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| 中后台多业务线聚合，团队独立发布 | qiankun / micro-app / wujie | 强隔离、独立部署、HTML entry 接入简单 |
| 多个前端应用需要共享组件/工具库 | Module Federation | 模块级共享、版本策略灵活 |
| 跨框架组件库、设计体系 | Web Components | 原生隔离、可被多框架消费 |
| 快速集成第三方老系统，隔离第一 | iframe | 实现简单、JS/CSS 完全隔离 |
| 对首屏性能要求极高、子应用耦合深 | 慎重拆分，或 Module Federation 紧耦合共享 | 减少运行时调度开销 |

选型流程：

1. **明确痛点**：是发布冲突、技术栈老旧、还是组件复用？
2. **评估隔离性**：需要 JS/DOM 完全隔离还是样式隔离即可？
3. **评估共享性**：是否需要共享 React/Vue 实例、组件、状态？
4. **评估团队能力**：能否接受构建配置复杂度？是否需要开箱即用？
5. **试点验证**：选择 1-2 个模块试点，度量效果后再推广。

组合方案：

- 基座用 qiankun 调度独立子应用；
- 公共组件通过 Module Federation 或 Web Components 共享；
- 老系统用 iframe 嵌套作为过渡。

**评分维度**：
- 能从隔离、共享、团队、技术栈四个维度分析（40%）
- 能给出四种方案的典型场景（30%）
- 能提出试点和组合方案（30%）

**常见错误**：
- 只看流行度选型，不看业务场景。
- 在不需要强隔离的场景强上 qiankun，增加复杂度。
- 认为四种方案互斥，其实可以组合使用。

**延伸追问**：
- 如果团队技术栈不统一，有 React 16 和 React 18 两个版本，怎么选型？
- Module Federation 能否和 qiankun 一起使用？

**相关题目**：
- [FB-26-CO-B-003 常见微前端方案对比](#FB-26-CO-B-003)
- [FB-26-CO-A-012 Web Components 作为微前端容器](#FB-26-CO-A-012)

**参考资源**：
- [Micro-Frontends Decision Framework](https://micro-frontends.org/)

**口头回答版**：
> 选型要看隔离需求、共享需求、团队结构和技术栈。中后台多团队独立发布用 qiankun 这类沙箱方案；要共享组件用 Module Federation；跨框架组件库用 Web Components；临时集成老系统用 iframe。也可以组合：基座 qiankun 调度，公共组件用联邦共享，老系统 iframe 过渡。选型前先明确痛点，试点验证再推广。

---

### FB-26-SE-R-027：微前端安全架构需要考虑哪些风险与防御？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：26 微前端
**标签**：微前端、安全、XSS、CSP、架构设计
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
微前端引入了多个独立部署的子应用，也带来了新的安全风险。请分析微前端架构中需要关注的安全问题，并给出防御方案。

**参考答案**：

安全风险：

1. **子应用 XSS 影响基座**
   - 子应用如果存在 XSS，可能通过全局事件、原型污染、DOM 操作影响基座和其他子应用。
   - 防御：严格 CSP；子应用输入输出做转义和校验；禁止子应用直接修改 `document.body` 等全局节点。

2. **脚本加载不可信来源**
   - 基座动态加载子应用 JS，如果入口被劫持，会执行恶意代码。
   - 防御：入口 URL 必须 HTTPS + SRI（Subresource Integrity）；白名单校验子应用域名。

```html
<script src="https://app1.example.com/main.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```

3. **跨子应用越权访问**
   - 子应用 A 的接口被嵌入到子应用 B 的页面中调用。
   - 防御：后端接口按子应用维度鉴权；前端路由和 iframe 隔离敏感模块。

4. **全局状态污染与信息泄露**
   - 子应用通过全局 Store 读取不该访问的数据。
   - 防御：基座按子应用权限裁剪下发的全局状态；对敏感数据加密或按需下发。

5. **Cookie / Storage 共享风险**
   - 子应用共享 localStorage，可能互相读写敏感信息。
   - 防御：敏感信息使用 httpOnly Cookie；按子应用命名空间隔离 Storage。

6. **依赖供应链攻击**
   - 某个子应用引入被污染的 npm 包，会通过共享模块影响其他子应用。
   - 防御：lockfile 校验、私有镜像、依赖扫描、SBOM。

7. **沙箱逃逸**
   - 即使使用 JS 沙箱，原型污染、定时器、原生事件仍可能逃逸。
   - 防御：代码审计、静态扫描、运行时策略限制。

**评分维度**：
- 能指出 XSS、脚本劫持、越权、状态泄露、Storage 共享、供应链、沙箱逃逸等风险（50%）
- 能给出 CSP、SRI、HTTPS、接口鉴权、Storage 隔离、依赖扫描等防御措施（40%）
- 能强调基座与子应用分层防御（10%）

**常见错误**：
- 认为 JS 沙箱可以完全替代安全策略。
- 子应用入口没有 SRI 校验。
- 全局状态不做权限裁剪。

**延伸追问**：
- 如果子应用必须访问 localStorage，如何防止信息泄露？
- 微前端下如何实施 CSP，允许动态加载多个子应用源？

**相关题目**：
- [FB-26-FS-P-017 qiankun 沙箱深入](#FB-26-FS-P-017)
- [FB-26-CP-P-023 微前端监控与异常隔离](#FB-26-CP-P-023)

**参考资源**：
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Subresource Integrity](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity)

**口头回答版**：
> 微前端安全风险很多：子应用 XSS 可能影响基座；动态加载脚本来源要可信，要用 HTTPS 加 SRI；后端接口要按子应用鉴权，防止越权；全局状态要按权限裁剪下发；localStorage 要按子应用命名空间隔离；依赖要被扫描防止供应链攻击；沙箱也不能完全防住原型污染这些。安全要分层，基座和子应用各负其责。

---

### FB-26-EN-R-028：微前端团队的 CI/CD 与仓库组织策略应该如何设计？

**题型**：工程化题 / 软技能题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：26 微前端
**标签**：微前端、CI/CD、Monorepo、前端工程化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
微前端涉及多个团队和多个子应用。请讨论 Monorepo 与多仓库的取舍，并设计一套适合微前端的 CI/CD 流程。

**参考答案**：

仓库组织：

| 维度 | Monorepo | 多仓库 |
|------|----------|--------|
| 代码共享 | 公共组件/工具复用容易 | 需要私有 registry 或 npm 包 |
| 版本统一 | 容易统一依赖基线 | 各仓库自由，冲突多 |
| 构建速度 | 大仓库可能慢，需配合 nx/turborepo | 各仓库独立，快 |
| 团队自治 | 权限、CI 配置需精心设计 | 高度自治 |
| 发布耦合 | 可能因公共包变更触发多子应用构建 | 子应用独立发布 |

推荐策略：

- **混合模式**：基座 + 公共能力层放 Monorepo；业务子应用放独立仓库。
- 或 **分层 Monorepo**：用 pnpm workspace + Turborepo/Nx，按 package 隔离，各子应用独立 pipeline。

CI/CD 流程：

1. **子应用独立流水线**
   - 代码提交 → 单元测试/集成测试 → 构建 → Source Map 上传 → 产物上传到 CDN/OSS → 注册中心更新版本。

2. **基座流水线**
   - 基座变更需联动子应用兼容性测试（契约测试）。
   - 发版时更新注册中心默认入口。

3. **依赖变更门禁**
   - 公共包升级触发所有依赖它的子应用构建验证。
   - 使用 `pnpm --filter` 或 Turborepo affected 精准构建。

4. **灰度发布**
   - 子应用发布新版本后先在注册中心配置灰度比例。
   - 监控通过后提升比例或全量。

5. **回滚**
   - 注册中心回滚入口版本，子应用无需重新构建。

协作机制：

- 每个子应用有 owner 和 on-call。
- 公共包变更需走 RFC/ADR 流程。
- 关键接口变更做契约测试，避免基座发版破坏子应用。

**评分维度**：
- 能对比 Monorepo 与多仓库并给出取舍（30%）
- 能设计子应用和基座独立流水线（30%）
- 能提出依赖门禁、灰度、回滚、契约测试等机制（40%）

**常见错误**：
- 所有子应用放一个 Monorepo 却不要求统一规范，导致构建和权限混乱。
- 子应用独立仓库但公共包用 file 路径引用，破坏独立部署。
- 基座发版不做兼容性测试。

**延伸追问**：
- 公共组件库发版时，如何确保所有子应用都能及时升级？
- 如果基座和子应用用不同 CI 工具，如何统一制品管理？

**相关题目**：
- [FB-26-SD-R-025 设计企业级微前端平台](#FB-26-SD-R-025)
- [FB-26-EN-A-014 子应用独立部署](#FB-26-EN-A-014)

**参考资源**：
- [Turborepo](https://turbo.build/repo)
- [pnpm workspaces](https://pnpm.io/workspaces)

**口头回答版**：
> 仓库组织看团队规模和共享需求。Monorepo 共享方便、统一依赖，但构建和权限要设计好；多仓库自治但公共包管理麻烦。我推荐基座和公共能力放 Monorepo，业务子应用独立仓库，或者大团队用分层 Monorepo。CI/CD 上每个子应用独立流水线，发版更新注册中心版本；公共包升级要有门禁和 affected 构建；基座发版要做契约测试；灰度和回滚通过注册中心切换入口实现。

---

### FB-26-PE-R-029：如何度量微前端的性能与用户体验？

**题型**：性能优化题 / 系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：26 微前端
**标签**：微前端、性能、监控、可观测性
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一套微前端性能与体验度量体系，说明关键指标、采集方式、告警阈值和优化闭环。

**参考答案**：

度量体系应覆盖基座、子应用、资源加载、用户感知四个层面。

关键指标：

1. **基座指标**
   - 基座首屏时间（FCP / LCP）。
   - 基座 JS 体积、初始化耗时。

2. **子应用加载指标**
   - 子应用入口 HTML/JS 加载时间。
   - 子应用 mount 到首次渲染完成时间。
   - 子应用切换耗时（从点击导航到可交互）。

3. **资源指标**
   - 公共依赖重复加载次数与体积。
   - 各子应用 chunk 大小、缓存命中率。

4. **运行时指标**
   - 内存占用（子应用 mount/unmount 后是否有泄漏）。
   - Long Task、FPS、INP。

5. **业务指标**
   - 子应用出错率、白屏率。
   - 用户在该子应用内的停留时长、转化率。

采集方式：

- Performance API / Web Vitals 库采集 Web 指标。
- 在基座和子应用 mount/unmount 生命周期中打点。
- 通过 `PerformanceObserver` 监控资源加载。

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    report({ name: entry.name, duration: entry.duration, type: 'resource' });
  });
});
observer.observe({ entryTypes: ['resource'] });
```

告警与闭环：

- 设定 FCP/LCP、子应用切换耗时、错误率阈值。
- 超过阈值自动告警到子应用 owner。
- 建立性能看板，按子应用维度展示趋势。
- 每个性能回归都要有 owner 跟进，形成优化闭环。

优化方向：

- 首屏慢：公共资源预加载、子应用懒加载。
- 切换慢：keep-alive、骨架屏、预渲染。
- 资源重复：公共依赖共享、统一版本。
- 内存泄漏：unmount 清理副作用。

**评分维度**：
- 能覆盖基座、子应用、资源、运行时、业务五层指标（40%）
- 能说明 Performance API 和生命周期打点采集（20%）
- 能设计告警、看板、优化闭环（40%）

**常见错误**：
- 只看首屏，忽略子应用切换体验。
- 没有按子应用维度拆分指标，无法定位责任方。
- 只采集不上报，或只报警不跟进。

**延伸追问**：
- 子应用切换耗时如何精确测量？
- 如果基座和子应用都有埋点，如何避免重复上报？

**相关题目**：
- [FB-26-PE-A-015 微前端性能优化](#FB-26-PE-A-015)
- [FB-26-CP-P-023 微前端监控与异常隔离](#FB-26-CP-P-023)

**参考资源**：
- [Web Vitals](https://web.dev/vitals/)
- [Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)

**口头回答版**：
> 度量微前端性能要从基座首屏、子应用加载和切换、公共资源重复、运行时内存、业务错误率这几个维度抓指标。用 Performance API 和 Web Vitals 采集，在 mount/unmount 生命周期里打点。然后按子应用维度建看板，设阈值告警，超过就找 owner 优化。优化方向包括预加载、keep-alive、公共依赖共享、卸载清理副作用。

---

### FB-26-SS-R-030：微前端落地中的组织治理：团队边界、发布节奏、技术栈约束、回滚策略。

**题型**：软技能题 / 综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：26 微前端
**标签**：微前端、团队协作、治理、前端工程化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
微前端不仅是技术架构，也涉及组织与流程。请从团队边界、发布节奏、技术栈约束、回滚策略四个方面谈谈微前端的治理实践。

**参考答案**：

1. **团队边界**
   - 按业务域（Domain）而非技术栈划分团队，每个团队对一个或多个子应用全生命周期负责。
   - 明确子应用 owner、接口契约、依赖关系图。
   - 禁止子应用间直接引用内部模块，跨域调用必须通过公共能力层或事件总线。

2. **发布节奏**
   - 子应用独立发布，不受其他子应用和基座约束。
   - 基座发布频率应尽量低，重大变更提前 RFC 并做兼容性测试。
   - 建立发布窗口和 on-call 机制，避免高峰期全量发布。

3. **技术栈约束**
   - 制定组织级基线：框架大版本、构建工具、代码规范、组件库、埋点 SDK。
   - 允许子应用在一定范围内自由选择（如 React 18 vs Vue 3），但核心依赖需报备。
   - 技术栈变更走 ADR 评审，防止碎片化。

4. **回滚策略**
   - 子应用回滚：注册中心切换入口版本，秒级生效。
   - 基座回滚：保留上一个稳定版本，紧急时一键切流量。
   - 数据层回滚：发布前确认数据库/接口变更兼容旧版本。
   - 建立故障演练和混沌工程机制，验证回滚预案。

治理工具：

- 依赖扫描、代码规范检查、契约测试、架构看板。
- 定期的架构 review 和技术债登记。

**评分维度**：
- 能从团队、发布、技术栈、回滚四个维度展开（50%）
- 能指出子应用自治与基座稳定的平衡（25%）
- 能提出治理工具和机制（25%）

**常见错误**：
- 只拆代码不拆团队，导致沟通和发布冲突依旧。
- 子应用技术栈完全自由，造成公共能力无法复用。
- 没有回滚预案，线上问题只能热修复。

**延伸追问**：
- 如果两个团队都想改同一个公共组件，怎么协调？
- 基座升级大版本时，如何推动所有子应用迁移？

**相关题目**：
- [FB-26-SD-R-025 设计企业级微前端平台](#FB-26-SD-R-025)
- [FB-26-EN-R-028 微前端团队 CI/CD 与仓库组织](#FB-26-EN-R-028)

**参考资源**：
- [Team Topologies](https://teamtopologies.com/)
- [康威定律](https://en.wikipedia.org/wiki/Conway%27s_law)

**口头回答版**：
> 微前端治理要从人、流程、技术三方面抓。团队按业务域划分，每个子应用有 owner，跨子应用调用走公共能力层。发布节奏上子应用独立发版，基座少发版、发版前做兼容性测试。技术栈要有组织基线，核心依赖统一，允许有限自由。回滚通过注册中心切版本实现，基座和数据层也要有预案。还要定期架构 review、做契约测试和故障演练。
### FB-26-CO-A-013：什么是微前端？它主要解决什么问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是微前端？它主要解决什么问题。

**参考答案**：

微前端是一种架构风格，将大型前端应用拆分为多个独立开发、独立部署、独立运行的小型前端应用，最终组合成完整用户体验。它主要解决：多团队协作、独立部署、技术栈差异、渐进式迁移、故障隔离等问题。


**补充说明**：

在实际落地 微前端它主要解决什么问题 时，建议结合 微前端、前端工程化、qiankun 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能定义微前端（30%）
- 能列举主要解决的问题（50%）
- 能区分适用与不适合场景（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 微前端是一种架构风格，将大型前端应用拆分为多个独立开发、独立部署、独立运行的小型前端应用，最终组合成完整用户体验。 它主要解决：多团队协作、独立部署、技术栈差异、渐进式迁移、故障隔离等问题。

---

### FB-26-CP-A-001：微前端和组件化有什么区别？

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
微前端和组件化有什么区别。

**参考答案**：

组件化是把 UI 拆成可复用的小单元，通常在同一个代码库、同一个构建产物中。微前端是把应用拆成多个独立应用，每个应用有自己的代码库、构建流程、部署节奏。组件化关注 UI 复用，微前端关注团队和组织解耦。


**补充说明**：

在实际落地 微前端和组件化有什么区别 时，建议结合 微前端、前端工程化、qiankun 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能区分粒度（组件 vs 应用）（40%）
- 能说明独立性的差异（40%）
- 能说明目标差异（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 组件化是把 UI 拆成可复用的小单元，通常在同一个代码库、同一个构建产物中。 微前端是把应用拆成多个独立应用，每个应用有自己的代码库、构建流程、部署节奏。 组件化关注 UI 复用，微前端关注团队和组织解耦。

---

### FB-26-CP-A-002：请比较 qiankun、single-spa、Module Federation 三种方案。

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 qiankun、single-spa、Module Federation 三种方案。。

**参考答案**：

- **single-spa**：只负责应用注册、生命周期、路由匹配，需要自行处理隔离和加载优化，轻量灵活。
- **qiankun**：基于 single-spa，增加了 JS 沙箱、样式隔离、HTML Entry、预加载等能力，上手更简单。
- **Module Federation**：Webpack 5 特性，支持运行时模块共享，适合模块级复用和技术栈统一的场景。


**补充说明**：

在实际落地 请比较 qiankun、single-spa、Module Federation 三种方案。 时，建议结合 微前端、前端工程化、qiankun 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 三个方案特点清晰（50%）
- 能说明各自优劣（30%）
- 能给出选型建议（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - single-spa：只负责应用注册、生命周期、路由匹配，需要自行处理隔离和加载优化，轻量灵活。 - qiankun：基于 single-spa，增加了 JS 沙箱、样式隔离、HTML Entry、预加载等能力，上手更简单。 - Module Federation：Webpack 5 特性，支持运行时模块共享，适合模块级复用和技术栈统一的场景。

---

### FB-26-CO-A-014：微前端中如何实现样式隔离？各自的优缺点是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
微前端中如何实现样式隔离？各自的优缺点是什么。

**参考答案**：

方式：

1. CSS Modules / Scoped CSS：编译时加哈希，工程化方案，适合大多数项目。
2. Shadow DOM：原生隔离强，但兼容性和 SSR 支持有挑战。
3. 命名空间约定：手动加前缀，简单但依赖人遵守。
4. qiankun 动态样式隔离：运行时添加/移除样式标签，对老项目友好但有边界情况。

**评分维度**：
- 能列举至少 3 种方案（40%）
- 能说明优缺点（40%）
- 有选型判断（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 方式： 1. CSS Modules / Scoped CSS：编译时加哈希，工程化方案，适合大多数项目。 2. Shadow DOM：原生隔离强，但兼容性和 SSR 支持有挑战。 3. 命名空间约定：手动加前缀，简单但依赖人遵守。 4. qiankun 动态样式隔离：运行时添加/移除样式标签，对老项目友好但有边界情况。

---

### FB-26-CO-A-015：微前端中 JS 隔离有哪些方案？沙箱是否能 100% 隔离？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
微前端中 JS 隔离有哪些方案？沙箱是否能 100% 隔离。

**参考答案**：

方案：

1. Proxy 沙箱（qiankun）：拦截 window 操作。
2. 快照沙箱（qiankun）：保存/恢复 window 状态。
3. iframe：原生 JS 隔离最强。
4. 严格规范：约束子应用不操作全局变量。

沙箱不能 100% 隔离。子应用仍可通过原生 DOM API、localStorage、cookie、URL、postMessage 等影响全局。iframe 隔离最强但通信成本高。

**评分维度**：
- 能列举方案（40%）
- 能说明沙箱局限（40%）
- 有安全边界意识（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 方案： 1. Proxy 沙箱（qiankun）：拦截 window 操作。 2. 快照沙箱（qiankun）：保存/恢复 window 状态。 3. iframe：原生 JS 隔离最强。 4. 严格规范：约束子应用不操作全局变量。

---

### FB-26-CO-A-016：子应用之间如何通信？应该避免什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
子应用之间如何通信？应该避免什么。

**参考答案**：

通信方式：

1. 主应用 props 下发全局状态。
2. 全局状态管理（如 qiankun 的 initGlobalState）。
3. 自定义事件（CustomEvent）。
4. URL 参数和路由状态。
5. 共享 Store（谨慎使用）。

应避免：

- 子应用之间直接调用内部方法。
- 大量共享可变状态。
- 通过全局变量频繁通信。

**评分维度**：
- 能列举通信方式（40%）
- 能说明应避免的做法（40%）
- 强调松耦合（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 通信方式： 1. 主应用 props 下发全局状态。 2. 全局状态管理（如 qiankun 的 initGlobalState）。 3. 自定义事件（CustomEvent）。 4. URL 参数和路由状态。

---

### FB-26-CO-A-017：微前端中如何处理公共依赖？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
微前端中如何处理公共依赖。

**参考答案**：

方案：

1. 主应用加载公共库，子应用 externals 配置。
2. CDN 加载公共依赖，利用浏览器缓存。
3. Module Federation shared 自动共享。
4. 每个子应用各自打包：简单但体积大。

最佳实践：

- React/Vue 等核心框架保持版本一致。
- 通过构建配置或 MF 共享。
- 制定版本升级和兼容性策略。

**评分维度**：
- 能列举方案（50%）
- 能说明版本管理挑战（30%）
- 有实际落地经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 方案： 1. 主应用加载公共库，子应用 externals 配置。 2. CDN 加载公共依赖，利用浏览器缓存。 3. Module Federation shared 自动共享。 4. 每个子应用各自打包：简单但体积大。

---

### FB-26-CO-A-018：微前端刷新页面 404 是什么原因？如何解决？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
微前端刷新页面 404 是什么原因？如何解决。

**参考答案**：

原因：

- 子应用路由使用 browser history，刷新时服务端没有对应路由。
- 主应用和子应用路由层级没有对齐。
- Nginx/网关没有配置 fallback。

解决：

- 服务端配置通配路由，返回主应用 HTML。
- 子应用使用 memory history 或接收主应用 base。
- 统一路由前缀约定，如 `/app-a/dashboard`。

**评分维度**：
- 能定位原因（50%）
- 能给出解决方案（40%）
- 强调服务端配置（10%）

---
## 二、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 原因： - 子应用路由使用 browser history，刷新时服务端没有对应路由。 - 主应用和子应用路由层级没有对齐。 - Nginx/网关没有配置 fallback。 解决： - 服务端配置通配路由，返回主应用 HTML。

---

### FB-26-SS-P-001：你会如何评估一个项目是否需要引入微前端？

**题型**：软技能题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
你会如何评估一个项目是否需要引入微前端。

**参考答案**：

评估维度：

1. 项目规模：是否足够大，需要多团队维护。
2. 发布频率：各业务域是否独立发布。
3. 技术栈：是否需要渐进式迁移或支持异构。
4. 团队结构：是否有清晰的业务边界和 ownership。
5. 基础设施：是否具备构建、部署、监控能力。
6. 业务耦合度：子应用间是否相对独立。

如果只是为了技术新颖或盲目模仿大厂，不建议引入。

**评分维度**：
- 评估维度全面（50%）
- 强调按需引入（30%）
- 有反例意识（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 评估维度： 1. 项目规模：是否足够大，需要多团队维护。 2. 发布频率：各业务域是否独立发布。 3. 技术栈：是否需要渐进式迁移或支持异构。 4. 团队结构：是否有清晰的业务边界和 ownership。

---

### FB-26-CO-P-001：微前端有哪些常见陷阱？如何避免？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
微前端有哪些常见陷阱？如何避免。

**参考答案**：

陷阱：

1. 复杂度低估：调试、部署、版本管理更复杂。
2. 性能退化：重复加载资源、首屏变慢。
3. 样式/JS 污染：隔离不彻底。
4. 通信耦合：子应用直接互相调用。
5. 用户体验不一致：各子应用风格不统一。
6. 分布式单体：拆了应用但逻辑仍强耦合。

避免：

- 建立统一设计系统和组件库。
- 严格隔离和通信规范。
- 公共依赖共享和预加载。
- 完善监控和灰度发布。

**评分维度**：
- 能列举至少 4 个陷阱（40%）
- 能给出避免措施（40%）
- 有实际经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 陷阱： 1. 复杂度低估：调试、部署、版本管理更复杂。 2. 性能退化：重复加载资源、首屏变慢。 3. 样式/JS 污染：隔离不彻底。 4. 通信耦合：子应用直接互相调用。

---

### FB-26-PE-P-001：请描述 qiankun 的加载和生命周期流程。

**题型**：性能优化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
请描述 qiankun 的加载和生命周期流程。。

**参考答案**：

流程：

1. 主应用注册子应用，配置 entry、container、activeRule。
2. 当路由匹配 activeRule 时，qiankun 通过 HTML Entry 加载子应用入口。
3. 解析子应用资源（JS/CSS）。
4. 调用子应用的 bootstrap 生命周期。
5. 创建 JS 沙箱和样式隔离环境。
6. 调用子应用的 mount，传入 props 和 container。
7. 路由切换时调用 unmount，清理沙箱和样式。

**评分维度**：
- 流程完整（50%）
- 能说明 HTML Entry 和沙箱（30%）
- 能说明生命周期函数作用（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 流程： 1. 主应用注册子应用，配置 entry、container、activeRule。 2. 当路由匹配 activeRule 时，qiankun 通过 HTML Entry 加载子应用入口。 3. 解析子应用资源（JS/CSS）。 4. 调用子应用的 bootstrap 生命周期。

---

### FB-26-CP-P-024：Module Federation 中，host 和 remote 有什么区别？shared 配置有什么用？

**题型**：综合开放题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
Module Federation 中，host 和 remote 有什么区别？shared 配置有什么用。

**参考答案**：

- **host**：消费远程模块的应用。
- **remote**：暴露模块供其他应用消费的应用。
- 一个应用可以同时是 host 和 remote。

**shared**：声明需要共享的依赖，避免重复加载，保证单例（如 React），并处理版本兼容。


**补充说明**：

在实际落地 Module Federation 中，host 和 remote 有什么区别shared 配置有什么用 时，建议结合 微前端、前端工程化、qiankun 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- host/remote 概念清晰（40%）
- 能说明 shared 作用（40%）
- 能说明版本协调（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - host：消费远程模块的应用。 - remote：暴露模块供其他应用消费的应用。 - 一个应用可以同时是 host 和 remote。 shared：声明需要共享的依赖，避免重复加载，保证单例（如 React），并处理版本兼容。

---

### FB-26-SS-P-002：微前端项目中如何做错误隔离和降级？

**题型**：软技能题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
微前端项目中如何做错误隔离和降级。

**参考答案**：

策略：

1. 子应用加载失败时显示兜底 UI。
2. 主应用设置错误边界（Error Boundary）。
3. 子应用内部也有自己的错误边界。
4. 监控子应用加载时间、错误率、JS 异常。
5. 单个应用异常时不影响主框架和其他应用。
6. 提供手动刷新子应用入口。

```javascript
// qiankun 加载失败处理
loadMicroApp({
  name: 'app',
  entry: '//app.example.com',
  container: '#container'
}).catch(err => {
  document.querySelector('#container').innerHTML = '加载失败，请刷新重试';
});
```

**评分维度**：
- 能列举降级手段（50%）
- 有监控意识（30%）
- 能给出代码示例（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 策略： 1. 子应用加载失败时显示兜底 UI。 2. 主应用设置错误边界（Error Boundary）。 3. 子应用内部也有自己的错误边界。 4. 监控子应用加载时间、错误率、JS 异常。

---

### FB-26-CO-P-002：微前端中如何保证用户体验一致性？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
微前端中如何保证用户体验一致性。

**参考答案**：

方法：

1. 统一设计系统（Design System）和组件库。
2. 统一布局、导航、主题、字体、颜色。
3. 统一错误提示、空状态、加载状态。
4. 统一交互规范（如表单校验、弹窗行为）。
5. 主应用统一处理全局反馈（Toast、Modal）。
6. 定期设计走查和一致性审查。

**评分维度**：
- 设计系统意识（40%）
- 能列举具体一致化手段（40%）
- 强调规范和审查（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 方法： 1. 统一设计系统（Design System）和组件库。 2. 统一布局、导航、主题、字体、颜色。 3. 统一错误提示、空状态、加载状态。 4. 统一交互规范（如表单校验、弹窗行为）。

---

### FB-26-SD-P-020：如果微前端子应用需要共享状态，你会如何设计？

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如果微前端子应用需要共享状态，你会如何设计。

**参考答案**：

设计原则：最小化共享、状态下沉到主应用、通过明确协议通信。

方案：

1. 用户信息、权限、主题等全局状态由主应用维护，通过 props 或全局状态下发。
2. 业务状态尽量由各子应用自己管理。
3. 需要跨应用共享的业务状态通过事件总线或共享 Store（有限使用）。
4. 状态变更要有清晰的来源和订阅机制，避免不可追踪。



**补充说明**：

在实际落地 如果微前端子应用需要共享状态，你会如何设计 时，建议结合 微前端、前端工程化、qiankun 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 如果微前端子应用需要共享状态，你会如何设计 时，建议结合 微前端、前端工程化、qiankun 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 最小共享意识（30%）
- 主应用统一全局状态（40%）
- 能说明通信协议（30%）

---
## 三、架构级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 设计原则：最小化共享、状态下沉到主应用、通过明确协议通信。 方案： 1. 用户信息、权限、主题等全局状态由主应用维护，通过 props 或全局状态下发。 2. 业务状态尽量由各子应用自己管理。 3. 需要跨应用共享的业务状态通过事件总线或共享 Store（有限使用）。

---

### FB-26-SD-R-026：设计一个支持 10 个团队同时开发的微前端平台，你会做哪些关键决策？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
设计一个支持 10 个团队同时开发的微前端平台，你会做哪些关键决策。

**参考答案**：

关键决策：

1. **框架选型**：qiankun 或自研基座，视团队能力而定。
2. **子应用划分**：按业务域划分，明确边界和 ownership。
3. **技术栈策略**：允许有限差异，但核心框架版本统一。
4. **公共依赖管理**：主应用注入 + 共享组件库 + 工具包。
5. **通信规范**：全局状态 + 事件总线，禁止直接调用。
6. **CI/CD**：每个子应用独立流水线，统一发布窗口。
7. **监控与可观测性**：子应用性能、错误、加载时长全链路监控。
8. **设计系统**：统一 UI 规范和组件库。
9. **灰度发布**：按用户、地域、业务线灰度。
10. **文档与培训**：架构决策记录、接入指南、最佳实践。


**补充说明**：

在实际落地 设计一个支持 10 个团队同时开发的微前端平台，你会做哪些关键决策 时，建议结合 微前端、前端工程化、qiankun 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 决策维度全面（50%）
- 有组织协作意识（30%）
- 能说明优先级（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 关键决策： 1. 框架选型：qiankun 或自研基座，视团队能力而定。 2. 子应用划分：按业务域划分，明确边界和 ownership。 3. 技术栈策略：允许有限差异，但核心框架版本统一。 4. 公共依赖管理：主应用注入 + 共享组件库 + 工具包。

---

### FB-26-SC-R-001：微前端和 Monorepo 各适合什么场景？可以同时使用吗？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
微前端和 Monorepo 各适合什么场景？可以同时使用吗。

**参考答案**：

- **微前端**：适合需要独立部署、技术栈异构、多团队自治的大型系统。
- **Monorepo**：适合同一团队管理多个相关包/应用，便于代码共享和统一构建。

可以同时使用。例如：用 Monorepo 管理主应用和多个子应用的代码，各子应用仍然独立构建和部署。Monorepo 解决代码组织问题，微前端解决运行时集成问题。


**补充说明**：

在实际落地 微前端和 Monorepo 各适合什么场景可以同时使用吗 时，建议结合 微前端、前端工程化、qiankun 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能区分两者（40%）
- 能说明适用场景（30%）
- 能说明组合使用方式（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 微前端：适合需要独立部署、技术栈异构、多团队自治的大型系统。 - Monorepo：适合同一团队管理多个相关包/应用，便于代码共享和统一构建。 例如：用 Monorepo 管理主应用和多个子应用的代码，各子应用仍然独立构建和部署。 Monorepo 解决代码组织问题，微前端解决运行时集成问题。

---

### FB-26-CO-R-001：你如何看待 iframe 作为微前端方案？

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
你如何看待 iframe 作为微前端方案。

**参考答案**：

优点：

- 最强的 JS/CSS 隔离。
- 技术栈完全无关。
- 实现简单。

缺点：

- 通信成本高（postMessage）。
- 路由、弹窗、全屏等体验受限。
- SEO 不友好。
- 性能开销较大。

适用场景：

- 第三方系统嵌入。
- 对隔离性要求极高的场景。
- 临时或低耦合的集成。

现代微前端通常优先选择 qiankan/MF，iframe 作为特定场景的补充。

**评分维度**：
- 优缺点分析全面（50%）
- 有适用场景判断（30%）
- 不盲目否定 iframe（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 优点： - 最强的 JS/CSS 隔离。 - 技术栈完全无关。 缺点： - 通信成本高（postMessage）。 - 路由、弹窗、全屏等体验受限。

---

### FB-26-PE-R-030：微前端上线后，如何进行性能优化？

**题型**：性能优化题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
微前端上线后，如何进行性能优化。

**参考答案**：

优化方向：

1. **预加载**：qiankun 的 prefetch 或手动预加载下一子应用资源。
2. **公共依赖共享**：避免重复加载 React/Vue 等。
3. **懒加载**：子应用内部按路由/组件懒加载。
4. **资源压缩和 CDN**：静态资源上 CDN，开启 gzip/brotli。
5. **减少首屏请求**：BFF 聚合数据，避免多次请求。
6. **缓存策略**：合理利用 HTTP 缓存和 Service Worker。
7. **子应用瘦身**：只打包必要代码，避免巨石应用。
8. **监控**：持续跟踪 FCP/LCP、子应用加载时长。

**评分维度**：
- 优化手段全面（50%）
- 能区分主应用和子应用优化（30%）
- 有监控闭环意识（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 优化方向： 1. 预加载：qiankun 的 prefetch 或手动预加载下一子应用资源。 2. 公共依赖共享：避免重复加载 React/Vue 等。 3. 懒加载：子应用内部按路由/组件懒加载。 4. 资源压缩和 CDN：静态资源上 CDN，开启 gzip/brotli。

---

### FB-26-CO-R-002：在微前端架构中，主应用应该承担哪些职责？子应用应该承担哪些职责？

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在微前端架构中，主应用应该承担哪些职责？子应用应该承担哪些职责。

**参考答案**：

**主应用职责**：

- 统一入口和布局。
- 路由注册和分发。
- 全局状态管理（用户、权限、主题）。
- 子应用生命周期管理。
- 公共依赖加载。
- 全局错误处理和监控。
- 应用间通信协调。

**子应用职责**：

- 自身业务功能实现。
- 自身路由和状态管理。
- 暴露生命周期函数。
- 遵守主应用约定的接口和规范。
- 保证独立运行能力（便于本地开发）。

**评分维度**：
- 主应用职责清晰（40%）
- 子应用职责清晰（40%）
- 能说明边界（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 主应用职责： - 统一入口和布局。 - 路由注册和分发。 - 全局状态管理（用户、权限、主题）。 - 子应用生命周期管理。

---

### FB-26-SC-R-002：如果未来浏览器原生支持更强大的应用隔离机制，微前端框架会消失吗？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：26 微前端
**标签**：微前端、前端工程化、qiankun、架构设计、Module Federation
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
如果未来浏览器原生支持更强大的应用隔离机制，微前端框架会消失吗。

**参考答案**：

不会完全消失，但形态会演变。框架的价值不仅是隔离，还包括：

- 应用注册与生命周期管理。
- 路由协调。
- 应用间通信。
- 构建与部署集成。
- 公共依赖共享。

原生隔离机制（如更完善的 Shadow DOM、iframe 改进、新的浏览器 API）会让底层实现更简单，但上层的组织协调、工程化、通信协议仍然需要框架或平台来规范。微前端的核心是“组织问题”，不是纯技术问题。


**补充说明**：

在实际落地 如果未来浏览器原生支持更强大的应用隔离机制，微前端框架会消失吗 时，建议结合 微前端、前端工程化、qiankun 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 不片面回答会或不会（30%）
- 能说明框架的多重价值（40%）
- 强调组织问题本质（30%）

---

> **领域编号**：A02 微前端  
> **最后更新**：2026-06-18

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 不会完全消失，但形态会演变。 框架的价值不仅是隔离，还包括： - 应用注册与生命周期管理。 - 构建与部署集成。 原生隔离机制（如更完善的 Shadow DOM、iframe 改进、新的浏览器 API）会让底层实现更简单，但上层的组织协调、工程化、通信协议仍然需要框架或平台来规范。










