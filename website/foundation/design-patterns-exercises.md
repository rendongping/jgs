# 设计模式与软件工程基础练习册

> 通过练习掌握设计模式、SOLID 原则和重构技巧。

---

## 难度分级

- 🟢 基础：理解概念。
- 🟡 进阶：能识别和选择模式。
- 🔴 深入：能设计可扩展架构。

---

## 一、选择题

### 第 1 题（🟢）

SOLID 原则中，S 代表？

A. Simple  
B. Single Responsibility  
C. Stable  
D. Scalable

### 第 2 题（🟢）

Vue 3 的响应式系统主要使用了哪种设计模式？

A. 单例  
B. 代理（Proxy）  
C. 工厂  
D. 适配器

### 第 3 题（🟡）

Redux 中的发布-订阅机制属于哪种模式？

A. 观察者模式  
B. 策略模式  
C. 装饰器模式  
D. 命令模式

### 第 4 题（🟡）

以下哪种情况适合使用策略模式？

A. 需要一个全局唯一实例  
B. 有多种算法可以互相替换  
C. 需要兼容旧接口  
D. 需要撤销操作

### 第 5 题（🔴）

高阶组件（HOC）本质上是哪种设计模式？

A. 工厂模式  
B. 装饰器模式  
C. 代理模式  
D. 适配器模式

### 第 6 题（🟢）

SOLID 原则中，O 代表什么？

A. Override  
B. Open/Closed  
C. Optimization  
D. Object-Oriented

### 第 7 题（🟢）

SOLID 原则中，L 代表什么？

A. Lazy Loading  
B. Liskov Substitution  
C. Low Coupling  
D. Late Binding

### 第 8 题（🟢）

以下哪个属于创建型（Creational）设计模式？

A. 观察者模式  
B. 工厂模式  
C. 装饰器模式  
D. 策略模式

### 第 9 题（🟡）

以下哪个属于行为型（Behavioral）设计模式？

A. 单例模式  
B. 适配器模式  
C. 命令模式  
D. 代理模式

### 第 10 题（🟡）

Axios 的拦截器（Interceptor）机制体现了哪种设计模式的思想？

A. 工厂模式  
B. 责任链模式  
C. 桥接模式  
D. 原型模式

### 第 11 题（🟡）

Pinia 中的 store 实例通常全局唯一，这体现了哪种模式？

A. 观察者模式  
B. 单例模式  
C. 工厂模式  
D. 代理模式

### 第 12 题（🟡）

Vue Router 的导航守卫（Navigation Guard）主要应用了什么模式？

A. 责任链模式  
B. 观察者模式  
C. 模板方法模式  
D. 访问者模式

### 第 13 题（🔴）

插件系统中，允许用户通过注册自定义插件来扩展功能，这主要体现了 SOLID 中的哪个原则？

A. 单一职责原则（SRP）  
B. 开闭原则（OCP）  
C. 里氏替换原则（LSP）  
D. 依赖倒置原则（DIP）

### 第 14 题（🔴）

在 React 应用中，使用 Context API 进行深层 props 透传，这主要是为了处理什么问题，体现了什么原则？

A. 性能优化，体现了最少知识原则  
B. 避免 prop drilling，体现了依赖倒置原则  
C. 状态共享，体现了单一职责原则  
D. 组件缓存，体现了开闭原则

### 第 15 题（🔴）

Vue 的 `provide/inject` 与 React 的 Context API 在解决同一类问题时，共同依赖的架构思想是？

A. 控制反转（IoC）  
B. 面向切面编程（AOP）  
C. 依赖注入（DI）  
D. 响应式编程（RP）

---

## 二、场景分析题

### 第 16 题（🟡）

一个组件同时负责 UI 展示、数据请求、状态管理和业务逻辑，违反了什么原则？如何重构？

### 第 17 题（🟡）

项目中需要支持多种表单校验规则（必填、邮箱、手机号、自定义），适合用什么模式？

### 第 18 题（🔴）

你正在设计一个可扩展的组件库，新组件应能无缝接入现有渲染流程，如何运用开闭原则？

### 第 19 题（🟡）

现有代码中，一个 API 服务类直接使用了 `axios` 实例，如果未来要替换为 `fetch` 或其它 HTTP 库，需要修改大量代码。请分析问题并提出使用设计模式的改进方案。

### 第 20 题（🟡）

项目中多个页面都需要实现「用户未登录则跳转到登录页」的逻辑，当前在每个组件中重复编写判断代码。如何用设计模式统一处理这类横切关注点？

### 第 21 题（🔴）

一个大型表格组件内部包含了排序、筛选、分页、行展开、列冻结、导出 PDF 等 10 多种功能，代码超过 2000 行且频繁出现 Bug。从设计模式角度分析应如何重构？

### 第 22 题（🔴）

团队维护着一个老旧的 jQuery 项目，现在要逐步迁移到 Vue 3。在迁移完成前，新旧代码需要共存并相互通信。你会建议使用什么设计模式来平滑过渡？

### 第 23 题（🔴）

在一个复杂的富文本编辑器中，用户操作需要支持撤销与重做（Undo/Redo），同时操作历史会占用大量内存。请设计一个方案，运用合适的设计模式解决这些问题。

---

## 三、设计/开放题

### 第 24 题（🟡）

实现一个简单的事件总线（Event Bus），支持 on、emit、off。

### 第 25 题（🔴）

设计一个支持多种主题切换的组件系统，要求新增主题时不修改现有代码。

### 第 26 题（🔴）

设计一个前端埋点 SDK，支持多种埋点策略（点击、曝光、自定义事件），并保证可扩展性。

### 第 27 题（🟡）

实现一个支持通配符的发布-订阅（Pub/Sub）模式，通配符事件名称如 `user.*` 应能匹配 `user.login`、`user.logout` 等。

### 第 28 题（🔴）

实现一个中间件链（Middleware Chain / 责任链模式），用于处理 HTTP 请求的生命周期（请求前打日志、鉴权、请求后格式化响应）。

### 第 29 题（🔴）

实现一个简单的插件系统，允许外部注册插件来扩展核心功能，体现策略模式 + 工厂模式的结合。

### 第 30 题（🔴）

实现一个可组合的表单校验器（Validator），支持必填、最小长度、正则匹配等规则，且规则可自由组合（Strategy 模式）。

### 第 31 题（🔴）

实现一个简单的依赖注入容器（DI Container），支持服务注册、解析和单例管理。

### 第 32 题（🔴）

实现一个代理缓存（Proxy Cache），对 API 请求结果进行缓存，相同请求在有效期内直接返回缓存结果。

### 第 33 题（🔴）

使用命令模式（Command Pattern）实现一个支持撤销/重做的文本操作管理器。

### 第 34 题（🔴）

实现一个简单的状态机（State Machine），管理异步请求的四种状态：idle、loading、success、error，支持状态转换合法性检查。

---

## 四、代码重构题

> 以下题目给出「问题代码」，请识别其中的设计问题，并使用合适的设计模式进行重构。

### 第 35 题（🔴）—— God Component 重构

以下 Vue 组件存在严重的设计问题，请识别问题并重构。

```vue
<template>
  <div>
    <input v-model="search" @input="fetchData" />
    <button @click="sortBy='name'; fetchData()">按名称排序</button>
    <button @click="sortBy='date'; fetchData()">按日期排序</button>
    <div v-for="item in list" :key="item.id">
      <span>&#123;&#123; item.name &#125;&#125;</span>
      <span>&#123;&#123; item.date &#125;&#125;</span>
    </div>
    <button @click="page++ ; fetchData()">下一页</button>
  </div>
</template>

<script>
export default {
  data() {
    return { search: '', list: [], sortBy: 'name', page: 1 };
  },
  methods: {
    async fetchData() {
      const res = await fetch(`/api/items?q=${this.search}&sort=${this.sortBy}&page=${this.page}`);
      this.list = await res.json();
    }
  }
}
</script>
```

### 第 36 题（🔴）—— 硬编码支付方式

以下代码违反了开闭原则，请用策略模式重构。

```javascript
function calculatePrice(order, paymentMethod) {
  if (paymentMethod === 'alipay') {
    return order.total * 0.95; // 95折
  } else if (paymentMethod === 'wechat') {
    return order.total * 0.97; // 97折
  } else if (paymentMethod === 'credit_card') {
    return order.total * 1.02; // 加2%手续费
  } else if (paymentMethod === 'points') {
    return Math.max(0, order.total - order.points * 0.01);
  }
  return order.total;
}
```

### 第 37 题（🔴）—— 混乱的日志与鉴权

以下代码在业务逻辑中混杂了横切关注点，请用装饰器或 AOP 思想重构。

```javascript
class OrderService {
  async createOrder(data) {
    console.log('[LOG] 创建订单开始', data);
    if (!this.currentUser) throw new Error('未登录');
    if (this.currentUser.role !== 'admin') throw new Error('无权限');
    const result = await db.orders.create(data);
    console.log('[LOG] 创建订单成功', result.id);
    return result;
  }
  async updateOrder(id, data) {
    console.log('[LOG] 更新订单开始', id, data);
    if (!this.currentUser) throw new Error('未登录');
    if (this.currentUser.role !== 'admin') throw new Error('无权限');
    const result = await db.orders.update(id, data);
    console.log('[LOG] 更新订单成功', id);
    return result;
  }
}
```

### 第 38 题（🔴）—— 硬编码数据源切换

以下代码中，报表模块直接依赖具体的数据库实现，导致无法切换数据源。请用适配器模式重构。

```javascript
class ReportService {
  async getSalesReport() {
    const mysql = require('mysql2');
    const conn = await mysql.createConnection({ /* ... */ });
    const rows = await conn.query('SELECT * FROM sales');
    // 处理数据...
    return processedData;
  }
  async getUserReport() {
    const mysql = require('mysql2');
    const conn = await mysql.createConnection({ /* ... */ });
    const rows = await conn.query('SELECT * FROM users');
    // 处理数据...
    return processedData;
  }
}
```

### 第 39 题（🔴）—— 组件间混乱通信

以下 React 组件中，兄弟组件通过 props 层层传递回调，导致中间组件被迫传递无关 props。请用观察者模式或状态管理模式重构。

```javascript
function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Toolbar onIncrement={() => setCount(c => c + 1)} onDecrement={() => setCount(c => c - 1)} />
      <Sidebar count={count} />
      <MainArea count={count} onReset={() => setCount(0)} />
      <Footer count={count} />
    </div>
  );
}
```

### 第 40 题（🔴）—— 面条式条件分支

以下代码根据不同类型创建不同对象，每次新增类型都需要修改此函数。请用工厂模式重构。

```javascript
function createNotification(type, message) {
  if (type === 'success') {
    return { icon: '✓', color: 'green', message, duration: 3000 };
  } else if (type === 'error') {
    return { icon: '✗', color: 'red', message, duration: 5000 };
  } else if (type === 'warning') {
    return { icon: '!', color: 'orange', message, duration: 4000 };
  } else if (type === 'info') {
    return { icon: 'i', color: 'blue', message, duration: 3000 };
  }
}
```

---

## 参考答案

### 第 1 题

::: details 查看答案与解析
**答案：B**

S 是 Single Responsibility Principle，单一职责原则。
:::

### 第 2 题

::: details 查看答案与解析
**答案：B**

Vue 3 使用 Proxy 实现响应式，属于代理模式。
:::

### 第 3 题

::: details 查看答案与解析
**答案：A**

Redux 的订阅-发布机制属于观察者模式。
:::

### 第 4 题

::: details 查看答案与解析
**答案：B**

策略模式用于封装可互相替换的算法或行为。
:::

### 第 5 题

::: details 查看答案与解析
**答案：B**

HOC 在不修改原组件的情况下增强功能，本质是装饰器模式。
:::

### 第 6 题

::: details 查看答案与解析
**答案：B**

SOLID 中的 O 是 Open/Closed Principle，开闭原则——对扩展开放，对修改关闭。
:::

### 第 7 题

::: details 查看答案与解析
**答案：B**

L 是 Liskov Substitution Principle，里氏替换原则——子类应能替换父类且不影响程序正确性。
:::

### 第 8 题

::: details 查看答案与解析
**答案：B**

创建型模式关注对象创建机制，包括：工厂模式、单例模式、建造者模式、原型模式等。观察者模式和策略模式属于行为型，装饰器模式属于结构型。
:::

### 第 9 题

::: details 查看答案与解析
**答案：C**

行为型模式关注对象间的通信和职责分配，包括：观察者、策略、命令、模板方法、责任链等。单例属于创建型，适配器和代理属于结构型。
:::

### 第 10 题

::: details 查看答案与解析
**答案：B**

Axios 拦截器形成了一条处理链，每个拦截器可以决定是否继续传递请求/响应，这正是责任链模式（Chain of Responsibility）的典型应用。
:::

### 第 11 题

::: details 查看答案与解析
**答案：B**

Pinia 通过 `defineStore` 创建的 store 在应用中通常以单例形式存在，确保同一 store 的状态全局一致，体现了单例模式（Singleton）。
:::

### 第 12 题

::: details 查看答案与解析
**答案：A**

Vue Router 的导航守卫（beforeEach、beforeResolve、afterEach）按照注册顺序依次执行，每个守卫可以决定是否继续导航，这是典型的责任链模式。
:::

### 第 13 题

::: details 查看答案与解析
**答案：B**

开闭原则（OCP）要求对扩展开放、对修改关闭。插件系统允许用户注册新功能（扩展）而无需修改核心代码，正是 OCP 的最佳实践。
:::

### 第 14 题

::: details 查看答案与解析
**答案：B**

Context API 避免手动逐层传递 props（prop drilling），让深层组件直接从上下文获取依赖，体现了依赖倒置原则（DIP）——高层模块不依赖于低层模块，双方依赖于抽象。
:::

### 第 15 题

::: details 查看答案与解析
**答案：C**

provide/inject 和 Context API 本质都是依赖注入（DI）的实现——将依赖从上层注入到下层组件，解除了组件间的直接耦合。
:::

### 第 16 题

::: details 查看答案与解析
**参考思路**：
- 违反单一职责原则（SRP）。
- 重构：将 UI 展示、数据请求、状态管理、业务逻辑拆分到不同模块或 Hook。
- 使用容器/展示组件模式。
:::

### 第 17 题

::: details 查看答案与解析
**参考思路**：
- 使用策略模式。
- 定义校验器接口，每种规则实现一个校验器。
- 运行时组合校验规则。
:::

### 第 18 题

::: details 查看答案与解析
**参考思路**：
- 定义组件注册接口。
- 通过配置或插件机制注册新组件。
- 渲染流程依赖抽象接口，不依赖具体组件。
:::

### 第 19 题

::: details 查看答案与解析
**参考思路**：
- 问题：直接依赖具体实现（axios），违反依赖倒置原则（DIP）。
- 方案：使用**适配器模式**（Adapter）。
- 定义抽象接口 `HttpClient`，包含 `get`、`post` 等方法。
- 分别实现 `AxiosAdapter` 和 `FetchAdapter`。
- API Service 依赖 `HttpClient` 接口而非具体实现，切换时只需替换适配器。
```typescript
interface HttpClient {
  get(url: string, params?: Record<string, any>): Promise<any>;
  post(url: string, body?: any): Promise<any>;
}
class AxiosAdapter implements HttpClient { /* 委托给 axios */ }
class FetchAdapter implements HttpClient { /* 使用 fetch */ }
```
:::

### 第 20 题

::: details 查看答案与解析
**参考思路**：
- 问题：横切关注点（认证逻辑）散落在各个组件中，违反 DRY 和 SRP。
- 方案：使用**装饰器模式**或**高阶组件（HOC）** 统一包装。
- React 实现：创建 `withAuth(WrappedComponent)` HOC，在 HOC 中检查登录状态。
- Vue 实现：使用全局导航守卫（路由级别）或组合式函数（组件级别）。
- 更进一步的方案是使用**AOP**思想，通过拦截器或中间件统一处理。
:::

### 第 21 题

::: details 查看答案与解析
**参考思路**：
- 核心问题：God Object（上帝对象），一个类/组件承担了过多的职责，违反 SRP。
- 重构方案：
  1. **组合模式（Composite）**：将表格拆分为独立子组件（SortPanel、FilterPanel、Pagination、Exporter 等），父组件组合它们。
  2. **策略模式（Strategy）**：排序、筛选、导出等算法各自封装，可独立扩展。
  3. **观察者模式（Observer）**：子组件状态变更时通知父组件，避免紧耦合。
  4. **命令模式（Command）**：用户操作封装为命令，便于记录、撤销和回放。
:::

### 第 22 题

::: details 查看答案与解析
**参考思路**：
- 使用**适配器模式（Adapter）** 或**外观模式（Facade）**。
- 在 jQuery 代码和 Vue 3 代码之间创建一个抽象层，双方通过该层通信。
- 可考虑使用**微前端架构**（如 qiankun 或 Module Federation），将新旧应用独立部署，通过通信机制交互。
- 对于简单的数据共享，可以使用**事件总线（Event Bus）** 作为过渡方案。
:::

### 第 23 题

::: details 查看答案与解析
**参考思路**：
- 使用**命令模式（Command Pattern）** 封装每个用户操作。
- 每个命令包含 `execute()` 和 `undo()` 方法。
- 使用两个栈（undoStack / redoStack）管理历史。
- 内存优化：
  - 限制历史栈的最大容量。
  - 使用**备忘录模式（Memento）** 保存必要状态而非完整快照。
  - 对大操作使用命令组合（Compound Command），将连续同类操作合并。
```typescript
interface Command {
  execute(): void;
  undo(): void;
}
class HistoryManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  execute(cmd: Command) { cmd.execute(); this.undoStack.push(cmd); this.redoStack = []; }
  undo() { const cmd = this.undoStack.pop(); cmd?.undo(); this.redoStack.push(cmd); }
  redo() { const cmd = this.redoStack.pop(); cmd?.execute(); this.undoStack.push(cmd); }
}
```
:::

### 第 24 题

::: details 查看答案与解析
**参考实现**：

```javascript
class EventBus {
  constructor() { this.events = {}; }
  on(event, fn) {
    (this.events[event] ||= []).push(fn);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
  off(event, fn) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(f => f !== fn);
  }
}
```

**解析**：这是一个典型的**观察者模式**实现。EventBus 作为被观察者（Subject）维护一个事件名到回调列表的映射。`on` 注册观察者，`emit` 通知所有观察者，`off` 移除观察者。这是前端组件通信中常用的模式，Vue 2 的实例事件系统（$on/$emit）本质就是 EventBus。
:::

### 第 25 题

::: details 查看答案与解析
**参考思路**：

```javascript
// 1. 定义主题接口
class Theme {
  getColor(name) { throw new Error('子类必须实现'); }
  getFont(name) { throw new Error('子类必须实现'); }
}

// 2. 具体主题实现
class LightTheme extends Theme {
  getColor(name) {
    const palette = { primary: '#1890ff', background: '#fff', text: '#333' };
    return palette[name];
  }
}
class DarkTheme extends Theme {
  getColor(name) {
    const palette = { primary: '#177ddc', background: '#1f1f1f', text: '#e8e8e8' };
    return palette[name];
  }
}

// 3. 通过上下文注入（Vue 版）
const ThemeContext = Symbol('ThemeContext');
// Provider 提供当前主题
// 组件通过 inject(ThemeContext) 获取主题
```

**解析**：核心思想是**策略模式** + **依赖注入**。主题是一种可切换的算法族，每个主题实现相同的接口。组件不依赖具体主题而依赖抽象接口，符合**依赖倒置原则（DIP）**。新增主题只需新建一个 Theme 子类，无需修改现有代码，符合**开闭原则（OCP）**。
:::

### 第 26 题

::: details 查看答案与解析
**参考思路**：

```javascript
// 策略接口
class TrackingStrategy {
  track(eventName, data) { throw new Error('子类必须实现'); }
}

// 具体策略
class ClickStrategy extends TrackingStrategy {
  track(eventName, data) {
    console.log('[Click] ' + eventName, data);
  }
}
class ExposureStrategy extends TrackingStrategy {
  track(eventName, data) {
    // 使用 IntersectionObserver 检测曝光
    console.log('[Exposure] ' + eventName, data);
  }
}

// 埋点 SDK 核心
class TrackingSDK {
  constructor() {
    this.strategies = new Map();
    this.queue = [];    // 命令模式：埋点队列
  }
  register(type, strategy) {
    this.strategies.set(type, strategy);
  }
  track(type, eventName, data) {
    const strategy = this.strategies.get(type);
    if (strategy) {
      this.queue.push({ strategy, eventName, data });
      this.flush();
    }
  }
  flush() {
    while (this.queue.length > 0) {
      const { strategy, eventName, data } = this.queue.shift();
      strategy.track(eventName, data);
    }
  }
}
```

**解析**：组合使用了**策略模式**（不同埋点策略可互换）、**观察者模式**（监听 DOM 事件）、**命令模式**（埋点命令入队，支持批量发送和重试）。策略注册机制保证了 OCP，新增埋点类型不需要修改 SDK 核心代码。
:::

### 第 27 题

::: details 查看答案与解析
**参考实现**：

```javascript
class WildcardEventBus {
  constructor() {
    this.handlers = new Map();
    this.wildcardHandlers = [];
  }

  on(event, fn) {
    if (event.includes('*')) {
      const regex = new RegExp('^' + event.split('*').map(escapeRegex).join('.*') + '$');
      this.wildcardHandlers.push({ pattern: regex, handler: fn });
    } else {
      (this.handlers.set(event, this.handlers.get(event) || [])).get(event).push(fn);
    }
  }

  emit(event, ...args) {
    (this.handlers.get(event) || []).forEach(fn => fn(...args));
    this.wildcardHandlers.forEach(({ pattern, handler }) => {
      if (pattern.test(event)) handler(...args);
    });
  }

  off(event, fn) {
    if (event.includes('*')) {
      this.wildcardHandlers = this.wildcardHandlers.filter(w => w.handler !== fn);
    } else {
      const handlers = this.handlers.get(event);
      if (handlers) this.handlers.set(event, handlers.filter(h => h !== fn));
    }
  }
}

function escapeRegex(str) {
  return str.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
}

// 使用示例
const bus = new WildcardEventBus();
bus.on('user.*', (data) => console.log('用户事件:', data));
bus.emit('user.login', { id: 1 });   // 匹配
bus.emit('user.logout', { id: 1 });  // 匹配
```

**解析**：通配符 EventBus 在精确匹配的基础上增加了模式匹配能力。将包含 `*` 的事件名转换为正则表达式，发射事件时同时匹配精确事件和通配符模式。这种模式在 Node.js 的 EventEmitter 和消息队列系统中广泛应用。
:::

### 第 28 题

::: details 查看答案与解析
**参考实现**：

```javascript
// 中间件基类
class Middleware {
  handle(context, next) {
    throw new Error('子类必须实现 handle 方法');
  }
}

// 日志中间件
class LoggerMiddleware extends Middleware {
  async handle(context, next) {
    console.log('[请求] ' + context.url, context.params);
    const start = Date.now();
    await next();
    console.log('[响应] 耗时 ' + (Date.now() - start) + 'ms');
  }
}

// 鉴权中间件
class AuthMiddleware extends Middleware {
  async handle(context, next) {
    if (!context.token) {
      throw new Error('未授权：缺少 token');
    }
    console.log('[鉴权] 通过');
    await next();
  }
}

// 响应格式化中间件
class ResponseFormatterMiddleware extends Middleware {
  async handle(context, next) {
    await next();
    if (context.response && typeof context.response === 'object') {
      context.response = { code: 0, data: context.response, message: 'success' };
    }
  }
}

// 中间件链
class MiddlewareChain {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(context) {
    let index = -1;
    const dispatch = async (i) => {
      if (i <= index) throw new Error('next() 多次调用');
      index = i;
      if (i >= this.middlewares.length) return;
      const middleware = this.middlewares[i];
      await middleware.handle(context, () => dispatch(i + 1));
    };
    await dispatch(0);
  }
}

// 使用示例
const chain = new MiddlewareChain();
chain.use(new LoggerMiddleware());
chain.use(new AuthMiddleware());
chain.use(new ResponseFormatterMiddleware());

chain.execute({ url: '/api/users', params: { page: 1 }, token: 'abc123' })
  .then(() => console.log('完成'))
  .catch(err => console.error(err));
```

**解析**：这是**责任链模式（Chain of Responsibility）** 的完整实现。每个中间件在 `handle` 方法中执行自己的逻辑，然后调用 `next()` 将控制权传递给下一个中间件。这类似于 Koa.js 的洋葱模型，请求从外层流向内层，响应从内层流向外层。
:::

### 第 29 题

::: details 查看答案与解析
**参考实现**：

```javascript
// ===== 插件接口 =====
class Plugin {
  name = '';
  install(app) { throw new Error('插件必须实现 install 方法'); }
}

// ===== 核心应用 =====
class Application {
  constructor() {
    this.plugins = new Map();
    this.components = new Map();
    this.hooks = {};
  }

  // 注册插件
  use(plugin) {
    if (this.plugins.has(plugin.name)) {
      throw new Error('插件 ' + plugin.name + ' 已注册');
    }
    this.plugins.set(plugin.name, plugin);
    plugin.install(this);   // 插件安装时获得扩展能力
    return this;
  }

  // 注册组件（供插件调用）
  registerComponent(name, component) {
    this.components.set(name, component);
  }

  // 获取组件（工厂方法）
  getComponent(name) {
    return this.components.get(name);
  }

  // 生命周期钩子
  on(hook, fn) {
    (this.hooks[hook] ||= []).push(fn);
  }

  emitHook(hook, ...args) {
    (this.hooks[hook] || []).forEach(fn => fn(...args));
  }
}

// ===== 示例插件 =====
class LoggerPlugin extends Plugin {
  name = 'logger';
  install(app) {
    app.on('beforeRequest', (url) => console.log('[请求]', url));
    app.on('afterResponse', (url, data) => console.log('[响应]', url, data));
  }
}

class RouterPlugin extends Plugin {
  name = 'router';
  install(app) {
    app.registerComponent('RouterLink', { /* 路由组件实现 */ });
    app.registerComponent('RouterView', { /* 路由视图实现 */ });
  }
}

// 使用
const app = new Application();
app.use(new LoggerPlugin());
app.use(new RouterPlugin());
const RouterLink = app.getComponent('RouterLink');
```

**解析**：这是**策略模式 + 工厂模式 + 插件模式**的组合应用。Plugin 定义了策略接口，每个插件是具体策略。Application 作为工厂，通过 `getComponent` 创建并返回组件。插件通过 `install` 方法获得扩展 Application 的能力，体现了**开闭原则**。
:::

### 第 30 题

::: details 查看答案与解析
**参考实现**：

```javascript
// ===== 校验策略接口 =====
class ValidationRule {
  validate(value) { throw new Error('子类必须实现'); }
  get message() { return '校验失败'; }
}

// ===== 具体校验规则 =====
class RequiredRule extends ValidationRule {
  get message() { return '此字段为必填项'; }
  validate(value) {
    return value !== null && value !== undefined && value !== '';
  }
}

class MinLengthRule extends ValidationRule {
  constructor(min) { super(); this.min = min; }
  get message() { return '最小长度为 ' + this.min; }
  validate(value) {
    return typeof value === 'string' && value.length >= this.min;
  }
}

class PatternRule extends ValidationRule {
  constructor(pattern, msg) { super(); this.pattern = pattern; this._msg = msg; }
  get message() { return this._msg || '格式不匹配'; }
  validate(value) {
    return this.pattern.test(value);
  }
}

class EmailRule extends ValidationRule {
  get message() { return '邮箱格式不正确'; }
  validate(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

// ===== 校验器（组合策略） =====
class Validator {
  constructor() { this.rules = []; }
  add(rule) { this.rules.push(rule); return this; }
  validate(value) {
    const errors = [];
    for (const rule of this.rules) {
      if (!rule.validate(value)) {
        errors.push(rule.message);
      }
    }
    return { valid: errors.length === 0, errors };
  }
}

// ===== 使用示例 =====
const validator = new Validator()
  .add(new RequiredRule())
  .add(new MinLengthRule(6))
  .add(new PatternRule(/^[a-zA-Z]/, '必须以字母开头'))
  .add(new EmailRule());

console.log(validator.validate(''));           // { valid: false, errors: ['此字段为必填项', ...] }
console.log(validator.validate('ab@c'));       // { valid: false, errors: ['最小长度为 6', '邮箱格式不正确'] }
console.log(validator.validate('user@example.com')); // { valid: true, errors: [] }
```

**解析**：这是**策略模式（Strategy）** 的经典应用。ValidationRule 是策略接口，每种校验规则是具体策略。Validator 在运行时组合多个策略，形成校验链。规则可自由组合、可独立测试、可动态添加，符合**单一职责原则（SRP）** 和**开闭原则（OCP）**。
:::

### 第 31 题

::: details 查看答案与解析
**参考实现**：

```javascript
class DIContainer {
  constructor() {
    this.registry = new Map();     // 服务名称 -> 定义
    this.instances = new Map();    // 服务名称 -> 单例实例（对于 singleton 模式）
  }

  // 注册服务
  register(name, factory, options = {}) {
    this.registry.set(name, { factory, singleton: options.singleton || false });
  }

  // 注册单例
  singleton(name, factory) {
    this.register(name, factory, { singleton: true });
  }

  // 解析服务
  resolve(name) {
    const definition = this.registry.get(name);
    if (!definition) throw new Error('服务 ' + name + ' 未注册');

    // 单例：返回缓存的实例
    if (definition.singleton) {
      if (!this.instances.has(name)) {
        this.instances.set(name, definition.factory(this));
      }
      return this.instances.get(name);
    }

    // 非单例：每次创建新实例
    return definition.factory(this);
  }

  // 检查服务是否存在
  has(name) {
    return this.registry.has(name);
  }
}

// ===== 使用示例 =====
const container = new DIContainer();

// 注册服务
container.singleton('config', () => ({ apiUrl: 'https://api.example.com' }));
container.register('httpClient', (c) => {
  const config = c.resolve('config');
  return {
    get: (url) => console.log('GET ' + config.apiUrl + url),
    post: (url, data) => console.log('POST ' + config.apiUrl + url, data)
  };
});
container.register('userService', (c) => {
  const http = c.resolve('httpClient');
  return {
    getUsers: () => http.get('/users'),
    createUser: (data) => http.post('/users', data)
  };
});

// 使用
const userService = container.resolve('userService');
userService.getUsers();   // GET https://api.example.com/users
```

**解析**：依赖注入容器是**控制反转（IoC）** 的核心实现。容器负责管理服务的创建和生命周期，消费者通过容器获取依赖，而不是自己创建。这是**工厂模式**的升级版——工厂只知道如何创建对象，而 DI 容器还管理依赖解析和生命周期。单例模式通过缓存实例实现，确保全局唯一。
:::

### 第 32 题

::: details 查看答案与解析
**参考实现**：

```javascript
class APICacheProxy {
  constructor(options = {}) {
    this.cache = new Map();
    this.ttl = options.ttl || 60000; // 默认缓存 60 秒
  }

  // 生成缓存键
  _makeKey(url, params) {
    return url + '?' + JSON.stringify(params || {});
  }

  // 判断是否过期
  _isExpired(entry) {
    return Date.now() - entry.timestamp > this.ttl;
  }

  // 包装 API 请求方法
  wrap(apiFunc) {
    const proxy = this;
    return async function(url, params) {
      const key = proxy._makeKey(url, params);

      // 缓存命中且未过期
      if (proxy.cache.has(key)) {
        const entry = proxy.cache.get(key);
        if (!proxy._isExpired(entry)) {
          console.log('[缓存命中]', key);
          return entry.data;
        }
        // 过期了，删除
        proxy.cache.delete(key);
      }

      // 发起真实请求
      console.log('[发起请求]', key);
      const data = await apiFunc(url, params);

      // 存入缓存
      proxy.cache.set(key, { data, timestamp: Date.now() });
      return data;
    };
  }

  // 清除缓存
  clear(url, params) {
    if (url) {
      this.cache.delete(this._makeKey(url, params));
    } else {
      this.cache.clear();
    }
  }
}

// ===== 使用示例 =====
async function fetchUserAPI(url, params) {
  // 模拟 API 请求
  console.log('真实请求:', url);
  return { id: params?.id, name: '张三', timestamp: Date.now() };
}

const cacheProxy = new APICacheProxy({ ttl: 30000 });
const cachedFetchUser = cacheProxy.wrap(fetchUserAPI);

// 第一次调用：发起真实请求
cachedFetchUser('/api/user', { id: 1 }).then(data => console.log('结果1:', data));

// 第二次调用（1秒后）：命中缓存
setTimeout(() => {
  cachedFetchUser('/api/user', { id: 1 }).then(data => console.log('结果2:', data));
}, 1000);
```

**解析**：这是**代理模式（Proxy Pattern）** 和**备忘录模式（Memento）** 的结合应用。Proxy 控制对真实 API 函数的访问，在调用前后加入缓存逻辑。备忘录模式体现在将请求结果和时间戳封装为缓存条目。这种方式对调用方完全透明——调用方无需感知缓存的存在，体现了「最少知识原则」。
:::

### 第 33 题

::: details 查看答案与解析
**参考实现**：

```javascript
// ===== 命令接口 =====
class Command {
  execute() { throw new Error('子类必须实现'); }
  undo() { throw new Error('子类必须实现'); }
}

// ===== 具体命令：插入文本 =====
class InsertTextCommand extends Command {
  constructor(editor, text, position) {
    super();
    this.editor = editor;
    this.text = text;
    this.position = position;
  }
  execute() {
    this.editor.insert(this.text, this.position);
  }
  undo() {
    this.editor.delete(this.position, this.text.length);
  }
}

// ===== 具体命令：删除文本 =====
class DeleteTextCommand extends Command {
  constructor(editor, start, length) {
    super();
    this.editor = editor;
    this.start = start;
    this.length = length;
    this.deletedText = ''; // 执行时保存被删文本，用于撤销
  }
  execute() {
    this.deletedText = this.editor.getText(this.start, this.length);
    this.editor.delete(this.start, this.length);
  }
  undo() {
    this.editor.insert(this.deletedText, this.start);
  }
}

// ===== 文本编辑器 =====
class TextEditor {
  constructor() {
    this.content = '';
  }
  insert(text, position) {
    this.content = this.content.slice(0, position) + text + this.content.slice(position);
  }
  delete(start, length) {
    this.content = this.content.slice(0, start) + this.content.slice(start + length);
  }
  getText(start, length) {
    return this.content.slice(start, start + length);
  }
}

// ===== 命令管理器（支持撤销/重做） =====
class CommandManager {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
    this.maxStackSize = 50; // 限制历史大小，防止内存溢出
  }

  execute(cmd) {
    cmd.execute();
    this.undoStack.push(cmd);
    this.redoStack = []; // 执行新命令后清空重做栈
    // 限制历史栈大小
    if (this.undoStack.length > this.maxStackSize) {
      this.undoStack.shift();
    }
  }

  undo() {
    if (this.undoStack.length === 0) return false;
    const cmd = this.undoStack.pop();
    cmd.undo();
    this.redoStack.push(cmd);
    return true;
  }

  redo() {
    if (this.redoStack.length === 0) return false;
    const cmd = this.redoStack.pop();
    cmd.execute();
    this.undoStack.push(cmd);
    return true;
  }
}

// ===== 使用示例 =====
const editor = new TextEditor();
const manager = new CommandManager();

manager.execute(new InsertTextCommand(editor, 'Hello', 0));
console.log(editor.content); // 'Hello'

manager.execute(new InsertTextCommand(editor, ' World', 5));
console.log(editor.content); // 'Hello World'

manager.undo();
console.log(editor.content); // 'Hello'

manager.redo();
console.log(editor.content); // 'Hello World'
```

**解析**：**命令模式（Command Pattern）** 的核心是将操作封装为对象，每个命令包含 `execute()` 和 `undo()` 方法。命令管理器使用两个栈（undoStack/redoStack）管理历史，用户操作时入 undo 栈，撤销时从 undo 栈弹出并压入 redo 栈。限制栈大小（50）防止内存无限增长。如果需要进一步优化内存，可以使用**备忘录模式（Memento）** 保存增量状态而非全量快照。
:::

### 第 34 题

::: details 查看答案与解析
**参考实现**：

```javascript
// ===== 状态机 =====
class StateMachine {
  constructor(initialState, transitions) {
    this.currentState = initialState;
    this.transitions = transitions;  // { currentState: { event: nextState } }
    this.state = initialState;
    this.listeners = new Map();      // 状态变化监听器
    this.beforeHooks = [];           // 转换前钩子
    this.afterHooks = [];            // 转换后钩子
  }

  // 触发事件
  dispatch(event, ...args) {
    const currentTransitions = this.transitions[this.currentState];
    if (!currentTransitions) {
      throw new Error('状态 ' + this.currentState + ' 没有定义任何转换');
    }

    const nextState = currentTransitions[event];
    if (!nextState) {
      throw new Error('状态 ' + this.currentState + ' 不允许事件 ' + event);
    }

    // 执行转换前钩子
    for (const hook of this.beforeHooks) {
      hook(this.currentState, nextState, event, ...args);
    }

    const prevState = this.currentState;
    this.currentState = nextState;

    // 触发特定状态变化事件
    const listeners = this.listeners.get(nextState) || [];
    for (const fn of listeners) {
      fn(prevState, event, ...args);
    }

    // 触发所有变化事件
    const allListeners = this.listeners.get('*') || [];
    for (const fn of allListeners) {
      fn(prevState, this.currentState, event, ...args);
    }

    // 执行转换后钩子
    for (const hook of this.afterHooks) {
      hook(prevState, this.currentState, event, ...args);
    }

    return this.currentState;
  }

  // 监听特定状态
  on(state, fn) {
    (this.listeners.set(state, this.listeners.get(state) || [])).get(state).push(fn);
    return this;
  }

  // 注册转换前/后钩子
  before(fn) { this.beforeHooks.push(fn); return this; }
  after(fn) { this.afterHooks.push(fn); return this; }

  // 获取当前状态
  getState() { return this.currentState; }

  // 检查是否处于某状态
  is(state) { return this.currentState === state; }
}

// ===== 异步请求状态机 =====
const requestTransitions = {
  'idle':    { 'fetch': 'loading' },
  'loading': { 'success': 'success', 'error': 'error', 'cancel': 'idle' },
  'success': { 'fetch': 'loading', 'reset': 'idle' },
  'error':   { 'retry': 'loading', 'reset': 'idle' }
};

// ===== 使用示例 =====
const fsm = new StateMachine('idle', requestTransitions);

fsm.on('loading', () => console.log('进入加载状态...'));
fsm.on('success', () => console.log('加载成功！'));
fsm.on('error', () => console.log('加载失败！'));
fsm.before((from, to, event) => console.log(from + ' -> ' + to + ' (' + event + ')'));

console.log(fsm.getState()); // 'idle'

fsm.dispatch('fetch');       // idle -> loading (fetch)
console.log(fsm.getState()); // 'loading'

fsm.dispatch('success');     // loading -> success (success)
console.log(fsm.getState()); // 'success'

// 非法转换会抛错
// fsm.dispatch('fetch');   // 在 success 状态 fetch 是合法的，会回到 loading
// fsm.dispatch('cancel');  // 在 success 状态 cancel 是非法的，抛错
```

**解析**：**状态模式（State Pattern）** 和有限状态机（FSM）的思想。状态机通过预定义的状态转换表（transitions）管理合法转换路径，避免非法状态变化。每个状态只响应特定事件，事件触发状态迁移。观察者机制（`on`/`before`/`after`）让外部监听状态变化。这种模式在 UI 组件（如表单、弹窗、加载）和游戏开发中广泛应用，能显著降低 if-else 分支复杂度。
:::

### 第 35 题

::: details 查看答案与解析
**问题分析**：

该组件违反了**单一职责原则（SRP）**，同时承担了数据获取、搜索、排序、分页和 UI 展示五项职责。

**重构方案**：

1. **抽取自定义 Hook**：将数据获取逻辑抽离为 `useDataFetching` hook。
2. **容器/展示组件分离**：容器组件负责数据逻辑，展示组件只负责渲染。
3. **策略模式**：排序策略可独立封装。

```javascript
// useDataFetching.js — 数据获取 Hook
import { ref, watch } from 'vue';

export function useDataFetching(urlBuilder) {
  const data = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetch(params) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(urlBuilder(params));
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }
  return { data, loading, error, fetch };
}

// SearchableList.vue — 重构后的容器组件
// <template> 只保留 UI 结构，不再包含 fetch 逻辑
// <script>
//   const { data, fetch } = useDataFetching(params => `/api/items?q=${params.q}&sort=${params.sort}&page=${params.page}`);
//   watch([search, sortBy, page], () => fetch({ q: search.value, sort: sortBy.value, page: page.value }));
// </script>
```

**核心改进**：职责分离、可测试性提升、组件体积缩小 70% 以上。
:::

### 第 36 题

::: details 查看答案与解析
**问题分析**：

`calculatePrice` 函数使用大量 if-else 分支处理不同支付方式，每次新增支付方式都需要修改此函数，违反**开闭原则（OCP）**。

**重构方案**：使用**策略模式（Strategy）**。

```javascript
// ===== 策略接口 =====
class PaymentStrategy {
  calculate(order) { throw new Error('子类必须实现'); }
}

// ===== 具体策略 =====
class AlipayStrategy extends PaymentStrategy {
  calculate(order) { return order.total * 0.95; }
}
class WechatStrategy extends PaymentStrategy {
  calculate(order) { return order.total * 0.97; }
}
class CreditCardStrategy extends PaymentStrategy {
  calculate(order) { return order.total * 1.02; }
}
class PointsStrategy extends PaymentStrategy {
  calculate(order) { return Math.max(0, order.total - order.points * 0.01); }
}

// ===== 策略上下文 =====
class PriceCalculator {
  constructor() {
    this.strategies = new Map();
  }
  register(method, strategy) {
    this.strategies.set(method, strategy);
  }
  calculate(order, method) {
    const strategy = this.strategies.get(method);
    if (!strategy) throw new Error('不支持的支付方式: ' + method);
    return strategy.calculate(order);
  }
}

// ===== 使用 =====
const calculator = new PriceCalculator();
calculator.register('alipay', new AlipayStrategy());
calculator.register('wechat', new WechatStrategy());
calculator.register('credit_card', new CreditCardStrategy());
calculator.register('points', new PointsStrategy());

// 新增支付方式时，只需新增策略类并注册，无需修改现有代码
// calculator.register('apple_pay', new ApplePayStrategy());
```

**核心改进**：新增支付方式无需修改核心逻辑，每个策略独立测试，完全符合 OCP。
:::

### 第 37 题

::: details 查看答案与解析
**问题分析**：

`OrderService` 的每个方法都重复包含日志记录和权限检查，违反**DRY 原则**和**单一职责原则（SRP）**。日志和鉴权是横切关注点（Cross-cutting Concerns），应通过 **装饰器模式（Decorator）** 或 AOP 分离。

**重构方案**：使用装饰器模式。

```javascript
// ===== 装饰器工厂 =====
function withLogging(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function(...args) {
    console.log('[LOG] ' + propertyKey + ' 开始', args);
    try {
      const result = await originalMethod.apply(this, args);
      console.log('[LOG] ' + propertyKey + ' 成功');
      return result;
    } catch (err) {
      console.log('[LOG] ' + propertyKey + ' 失败:', err.message);
      throw err;
    }
  };
  return descriptor;
}

function withAuth(requiredRole = 'admin') {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args) {
      if (!this.currentUser) throw new Error('未登录');
      if (this.currentUser.role !== requiredRole) throw new Error('无权限');
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

// ===== 装饰后的业务类 =====
class OrderService {
  constructor() { this.currentUser = null; }

  @withLogging
  @withAuth('admin')
  async createOrder(data) {
    // 只包含核心业务逻辑
    return db.orders.create(data);
  }

  @withLogging
  @withAuth('admin')
  async updateOrder(id, data) {
    return db.orders.update(id, data);
  }
}
```

**核心改进**：日志和鉴权与业务逻辑完全解耦，每个关注点可独立修改和维护。如果环境不支持装饰器语法，可以用 HOC 函数包装形式实现相同效果。
:::

### 第 38 题

::: details 查看答案与解析
**问题分析**：

`ReportService` 直接在方法内部创建 MySQL 连接，导致：
1. 无法切换数据源（如换为 PostgreSQL、MongoDB 或 REST API）。
2. 连接创建代码重复。
3. 违反**依赖倒置原则（DIP）**。

**重构方案**：使用**适配器模式（Adapter）** 和**工厂模式**。

```javascript
// ===== 数据源抽象接口 =====
class DataSource {
  async query(sql, params) { throw new Error('子类必须实现'); }
}

// ===== MySQL 适配器 =====
class MySQLAdapter extends DataSource {
  constructor(config) {
    super();
    // 初始化 MySQL 连接池
  }
  async query(sql, params) {
    console.log('[MySQL] 执行查询:', sql);
    // return await this.connection.execute(sql, params);
  }
}

// ===== PostgreSQL 适配器 =====
class PostgreSQLAdapter extends DataSource {
  constructor(config) {
    super();
    // 初始化 PostgreSQL 连接池
  }
  async query(sql, params) {
    console.log('[PostgreSQL] 执行查询:', sql);
    // return await this.pool.query(sql, params);
  }
}

// ===== REST API 适配器 =====
class RESTAPIAdapter extends DataSource {
  constructor(baseURL) {
    super();
    this.baseURL = baseURL;
  }
  async query(endpoint, params) {
    console.log('[REST] 请求:', this.baseURL + endpoint);
    // return await fetch(this.baseURL + endpoint, { ... });
  }
}

// ===== 重构后的报表服务 =====
class ReportService {
  constructor(dataSource) {
    this.dataSource = dataSource;  // 通过构造注入抽象接口
  }

  async getSalesReport() {
    const rows = await this.dataSource.query('SELECT * FROM sales');
    // 只处理数据，不关心数据来源
    return rows;
  }

  async getUserReport() {
    const rows = await this.dataSource.query('SELECT * FROM users');
    return rows;
  }
}

// ===== 使用 =====
// 切换数据源只需替换适配器
const mysqlAdapter = new MySQLAdapter({ host: 'localhost', user: 'root' });
const service = new ReportService(mysqlAdapter);
service.getSalesReport();

// 切换到 REST API
// const apiAdapter = new RESTAPIAdapter('https://api.example.com');
// const service2 = new ReportService(apiAdapter);
```

**核心改进**：数据源可随意切换、ReportService 与具体数据库解耦、所有数据源实现相同接口，便于测试和扩展。
:::

### 第 39 题

::: details 查看答案与解析
**问题分析**：

`App` 组件中的 `count` 状态需要通过 props 层层传递给不相关的中间组件（如 `Sidebar`、`Footer` 被迫接收 `count`），这被称为 **Prop Drilling**。中间组件承担了不必要的传递职责。

**重构方案**：使用**观察者模式（Observer）** 或**状态管理模式**（如 Zustand、Pinia 或 React Context）。

```javascript
// 方案一：使用 Context（依赖注入思想）
import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext();

function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);

  return (
    <CountContext.Provider value=&#123;&#123; count, increment, decrement, reset &#125;&#125;>
      {children}
    </CountContext.Provider>
  );
}

// 任何子组件可直接消费 count
function Toolbar() {
  const { increment, decrement } = useContext(CountContext);
  return <div><button onClick={increment}>+</button><button onClick={decrement}>-</button></div>;
}

function MainArea() {
  const { count, reset } = useContext(CountContext);
  return <div><span>计数: {count}</span><button onClick={reset}>重置</button></div>;
}

function Footer() {
  const { count } = useContext(CountContext);
  return <footer>总计: {count}</footer>;
}

// App 无需再传递任何 props
function App() {
  return (
    <CountProvider>
      <Toolbar />
      <MainArea />
      <Footer />
    </CountProvider>
  );
}

/* 方案二：使用 Zustand（观察者模式 + 单例模式）
import { create } from 'zustand';
const useCountStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));
// 组件中: const { count, increment } = useCountStore();
*/
```

**核心改进**：消除了 Prop Drilling，中间组件不再被迫传递无关 props，每个组件只订阅自己关心的状态。Context 是依赖注入的体现，Zustand/Pinia 则是观察者模式 + 单例模式的结合。
:::

### 第 40 题

::: details 查看答案与解析
**问题分析**：

`createNotification` 函数使用 if-else 分支根据类型创建不同对象，每次新增通知类型都需要修改此函数，违反**开闭原则（OCP）**。

**重构方案**：使用**工厂模式（Factory Pattern）**。

```javascript
// ===== 通知产品接口 =====
class Notification {
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }
  render() { /* 渲染逻辑 */ }
}

// ===== 具体产品 =====
class SuccessNotification extends Notification {
  constructor(message) {
    super('success', message);
    this.icon = '✓';
    this.color = 'green';
    this.duration = 3000;
  }
}
class ErrorNotification extends Notification {
  constructor(message) {
    super('error', message);
    this.icon = '✗';
    this.color = 'red';
    this.duration = 5000;
  }
}
class WarningNotification extends Notification {
  constructor(message) {
    super('warning', message);
    this.icon = '!';
    this.color = 'orange';
    this.duration = 4000;
  }
}
class InfoNotification extends Notification {
  constructor(message) {
    super('info', message);
    this.icon = 'i';
    this.color = 'blue';
    this.duration = 3000;
  }
}

// ===== 工厂 =====
class NotificationFactory {
  constructor() {
    this.registry = new Map();
  }

  register(type, ClassRef) {
    this.registry.set(type, ClassRef);
  }

  create(type, message) {
    const ClassRef = this.registry.get(type);
    if (!ClassRef) throw new Error('未知的通知类型: ' + type);
    return new ClassRef(message);
  }
}

// ===== 使用 =====
const factory = new NotificationFactory();
factory.register('success', SuccessNotification);
factory.register('error', ErrorNotification);
factory.register('warning', WarningNotification);
factory.register('info', InfoNotification);

const notification = factory.create('success', '操作成功！');
// 新增类型时无需修改工厂函数
// factory.register('loading', LoadingNotification);
```

**核心改进**：创建逻辑与使用逻辑分离，新增类型不需要修改现有代码，产品类和工厂类都可独立测试。这个模式也体现了「将条件分支转化为多态」的重构思想。
:::

---

**标签**：`#design-patterns` `#solid` `#refactoring`

> **最后更新**：2026-07-06


