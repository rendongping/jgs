# 设计模式 面试题

> 本题库共收录 **35** 道面试题（基础 11 / 进阶 10 / 深入 7 / 架构 7）。
> 本文件收录 设计模式 相关面试题，目标题量 30 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-09-CO-B-001：什么是单例模式？请举一个前端应用场景。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：09 设计模式
**标签**：单例模式、全局状态、实例控制
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释单例模式（Singleton Pattern）的核心思想，并举例说明一个前端开发中的实际应用场景。

**参考答案**：

单例模式确保一个类（或构造函数）在整个应用生命周期中只有一个实例，并提供一个全局访问点。

核心要点：

1. 唯一实例：多次创建返回同一个对象。
2. 全局访问：通过统一入口访问该实例。
3. 延迟创建：通常在首次使用时才初始化。

前端应用场景：

- 全局状态管理对象（如早期的 Store、配置中心）。
- 日志收集器、埋点 SDK。
- 弹窗管理器、消息提示组件。
- 浏览器中的 `window` 对象、`document` 对象本身就是单例。

```js
class Singleton {
  static instance = null;
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    this.data = {};
    Singleton.instance = this;
  }
}
const a = new Singleton();
const b = new Singleton();
console.log(a === b); // true
```

**评分维度**：
- 定义准确性（40%）：是否说明唯一实例与全局访问点
- 举例恰当性（40%）：能否举出前端真实场景
- 代码示例（20%）：能否用简单代码说明

**常见错误**：
- 把单例简单等同于全局变量
- 忽略单例的线程/并发安全问题（Node.js 中需额外考虑）

**延伸追问**：
- 单例模式和全局变量有什么区别？单例有哪些劣势？
- 在 ES Module 中，`export default new Store()` 是否算单例？

**相关题目**：
- [FB-09-CD-A-001 手写一个线程安全的单例模式](#FB-09-CD-A-001)

**参考资源**：
- [Refactoring Guru - Singleton](https://refactoringguru.cn/design-patterns/singleton)

**口头回答版**：
> 单例模式确保一个类（或构造函数）在整个应用生命周期中只有一个实例，并提供一个全局访问点。 唯一实例：多次创建返回同一个对象。 全局访问：通过统一入口访问该实例。 延迟创建：通常在首次使用时才初始化。

---

### FB-09-CO-B-002：工厂模式的作用是什么？与直接使用 new 创建对象有何区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：09 设计模式
**标签**：工厂模式、创建型模式、对象创建
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
解释工厂模式（Factory Pattern）的核心思想，并比较它与直接 `new` 创建对象的区别。

**参考答案**：

工厂模式是一种创建型设计模式，它将对象的创建逻辑封装起来，调用方只需关心接口而无需关心具体类的实例化细节。

核心作用：

1. 解耦创建与使用：调用方不直接依赖具体类。
2. 集中管理：对象创建逻辑集中，便于维护和扩展。
3. 易于扩展：新增产品时只需添加具体工厂或产品类，符合开闭原则。

与 `new` 的区别：

| 维度 | 直接 new | 工厂模式 |
|------|---------|---------|
| 依赖 | 强依赖具体类 | 依赖抽象接口 |
| 扩展 | 修改调用方 | 新增工厂/产品类 |
| 复杂度 | 简单直接 | 增加一层抽象 |

前端应用场景：

- 创建不同类型的图表组件（柱状图、折线图、饼图）。
- 根据配置生成不同平台的 API 请求实例。
- UI 组件库中根据 `type` 渲染不同子组件。

```js
class DialogFactory {
  static create(type) {
    switch (type) {
      case 'alert': return new AlertDialog();
      case 'confirm': return new ConfirmDialog();
      default: throw new Error('Unknown dialog type');
    }
  }
}
```

**评分维度**：
- 说清工厂模式作用（40%）
- 对比 `new` 的优缺点（30%）
- 举出前端应用示例（30%）

**常见错误**：
- 把简单工厂、工厂方法、抽象工厂混为一谈
- 认为所有创建对象的地方都应该用工厂

**延伸追问**：
- 简单工厂、工厂方法、抽象工厂三者有什么区别？
- 工厂模式和策略模式看起来很相似，如何区分？

**相关题目**：
- [FB-09-CD-A-003 手写一个工厂模式](#FB-09-CD-A-003)

**参考资源**：
- [Refactoring Guru - Factory Method](https://refactoringguru.cn/design-patterns/factory-method)

**口头回答版**：
> 工厂模式是一种创建型设计模式，它将对象的创建逻辑封装起来，调用方只需关心接口而无需关心具体类的实例化细节。 解耦创建与使用：调用方不直接依赖具体类。 集中管理：对象创建逻辑集中，便于维护和扩展。 易于扩展：新增产品时只需添加具体工厂或产品类，符合开闭原则。

---

### FB-09-CO-B-003：观察者模式与发布订阅模式有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：09 设计模式
**标签**：观察者模式、发布订阅、事件驱动、解耦
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较观察者模式（Observer Pattern）与发布订阅模式（Pub-Sub Pattern）的异同。

**参考答案**：

两者都是行为型模式，用于处理对象间的一对多依赖关系，但它们在耦合方式和通信机制上有明显区别。

| 维度 | 观察者模式 | 发布订阅模式 |
|------|-----------|-------------|
| 耦合度 | 观察者直接订阅主题（Subject），耦合相对紧 | 发布者和订阅者通过事件总线/消息中间件解耦 |
| 通信方式 | Subject 维护观察者列表，主动通知 | Pub-Sub 通过事件通道传递消息 |
| 角色关系 | 观察者知道 Subject 的存在 | 发布者和订阅者互不知道对方存在 |

示例：

观察者模式：
```js
class Subject {
  constructor() { this.observers = []; }
  add(observer) { this.observers.push(observer); }
  notify(data) { this.observers.forEach(o => o.update(data)); }
}
```

发布订阅模式：
```js
const eventBus = {
  events: {},
  on(event, cb) { (this.events[event] ||= []).push(cb); },
  emit(event, data) { (this.events[event] || []).forEach(cb => cb(data)); }
};
```

前端应用：

- 观察者模式：Vue 2 响应式系统（Dep/Watcher）。
- 发布订阅模式：事件总线 EventBus、Redux 中间件、消息队列。

**评分维度**：
- 说清两者定义（30%）
- 准确对比耦合度与角色关系（40%）
- 能给出前端示例（30%）

**常见错误**：
- 将两者完全等同
- 认为观察者模式没有耦合

**延伸追问**：
- 发布订阅模式中的事件中心如果挂掉会怎样？如何设计高可用？
- 观察者模式中的内存泄漏风险在哪里？

**相关题目**：
- [FB-09-CD-A-002 手写一个发布订阅事件总线](#FB-09-CD-A-002)

**参考资源**：
- [Refactoring Guru - Observer](https://refactoringguru.cn/design-patterns/observer)

**口头回答版**：
> 两者都是行为型模式，用于处理对象间的一对多依赖关系，但它们在耦合方式和通信机制上有明显区别。 | 维度 | 观察者模式 | 发布订阅模式 | |------|-----------|-------------| | 耦合度 | 观察者直接订阅主题（Subject），耦合相对紧 | 发布者和订阅者通过事件总线/消息中间件解耦 |

---

### FB-09-CO-B-004：策略模式主要解决什么问题？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：09 设计模式
**标签**：策略模式、算法封装、条件分支消除
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释策略模式（Strategy Pattern）的核心思想，以及它主要解决什么代码问题。

**参考答案**：

策略模式定义一系列算法，把它们一个个封装起来，并且使它们可以互相替换。该模式让算法的变化独立于使用算法的客户。

核心解决问题：

1. 消除大量的 `if/else` 或 `switch` 分支。
2. 将算法/行为与使用方解耦。
3. 便于新增策略而无需修改原有代码（开闭原则）。

典型结构：

- Context（上下文）：维护对当前策略的引用。
- Strategy（策略接口）：定义策略行为。
- ConcreteStrategy（具体策略）：实现具体算法。

前端应用场景：

- 表单校验规则（邮箱、手机号、身份证号等）。
- 电商促销计算（满减、折扣、秒杀）。
- 图表数据格式化策略。

```js
const strategies = {
  email: value => /^\S+@\S+\.\S+$/.test(value),
  phone: value => /^1[3-9]\d{9}$/.test(value)
};
function validate(type, value) {
  return strategies[type](value);
}
```

**评分维度**：
- 说清核心思想（40%）
- 说明解决的问题（30%）
- 能举前端示例（30%）

**常见错误**：
- 把策略模式等同于简单对象映射
- 忽略 Context 在策略模式中的作用

**延伸追问**：
- 策略模式和状态模式有什么区别？
- 如果策略很多，如何管理和加载策略？

**相关题目**：
- [FB-09-CD-A-003 手写一个策略模式](#FB-09-CD-A-003)

**参考资源**：
- [Refactoring Guru - Strategy](https://refactoringguru.cn/design-patterns/strategy)

**口头回答版**：
> 策略模式定义一系列算法，把它们一个个封装起来，并且使它们可以互相替换。 该模式让算法的变化独立于使用算法的客户。 消除大量的 if/else 或 switch 分支。 将算法/行为与使用方解耦。

---

### FB-09-CO-B-005：什么是模块模式？它如何实现私有变量？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：09 设计模式
**标签**：模块模式、闭包、私有变量、封装
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释模块模式（Module Pattern），并说明它是如何利用闭包实现私有变量封装的。

**参考答案**：

模块模式使用闭包将私有变量和函数封装在局部作用域内，只暴露有限的公共 API。它是 JavaScript 在 ES Module 出现之前最常用的模块化方案之一。

核心思想：

1. 立即执行函数（IIFE）创建私有作用域。
2. 内部变量和函数不被外部访问。
3. 返回一个对象，暴露需要公开的方法。

```js
const myModule = (function() {
  let privateVar = 0;
  function privateMethod() { console.log('private'); }

  return {
    increment() { return ++privateVar; },
    get() { return privateVar; }
  };
})();

myModule.increment();
console.log(myModule.get()); // 1
console.log(myModule.privateVar); // undefined
```

现代替代方案：

- ES Module 的 `export` / `import`。
- 类的 `#privateField` 私有字段。

**评分维度**：
- 说清模块模式概念（30%）
- 解释闭包封装机制（40%）
- 提到现代替代方案（30%）

**常见错误**：
- 把模块模式等同于 ES Module
- 认为返回的对象属性也是私有的

**延伸追问**：
- CommonJS 的模块实现与模块模式有什么关系？
- ES Module 是否完全替代了模块模式？什么时候还需要 IIFE？

**参考资源**：
- [MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

**口头回答版**：
> 模块模式使用闭包将私有变量和函数封装在局部作用域内，只暴露有限的公共 API。 它是 JavaScript 在 ES Module 出现之前最常用的模块化方案之一。 立即执行函数（IIFE）创建私有作用域。 内部变量和函数不被外部访问。

---

### FB-09-CO-B-006：MVC、MVP、MVVM 三者有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：09 设计模式
**标签**：MVC、MVP、MVVM、架构模式、数据绑定
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 MVC、MVP、MVVM 三种架构模式的区别，并说明各自在前端框架中的体现。

**参考答案**：

三者都是 UI 架构模式，核心目标是将数据（Model）与视图（View）分离，但交互方式和职责划分不同。

| 模式 | 核心关系 | 特点 | 前端代表 |
|------|---------|------|---------|
| MVC | Model ↔ View ↔ Controller | View 和 Model 可直接通信，Controller 处理用户输入 | Backbone.js |
| MVP | Model ↔ Presenter ↔ View | View 和 Model 完全隔离，通过 Presenter 通信 | 早期 Android |
| MVVM | Model ↔ ViewModel ↔ View | 通过双向数据绑定自动同步 View 和 ViewModel | Vue、Angular |

关键区别：

- MVC：View 可以直接观察 Model，耦合相对较高。
- MVP：Presenter 臃肿，需要手动同步 View。
- MVVM：引入 ViewModel 和数据绑定，View 自动响应数据变化。

前端体现：

- Vue：模板 + 响应式数据 + ViewModel。
- React：可视为 View = f(State)，更偏函数式，不完全是传统 MVVM。
- Angular：依赖注入 + 双向绑定，接近 MVVM。

**评分维度**：
- 准确区分三种模式（50%）
- 说明数据流向（30%）
- 能关联前端框架（20%）

**常见错误**：
- 把 MVC 的 Controller 和 MVVM 的 ViewModel 等同
- 认为 React 是严格的 MVVM

**延伸追问**：
- MVVM 的双向绑定在 Vue 2 和 Vue 3 中分别怎么实现？
- MVP 模式中 Presenter 容易膨胀，如何优化？

**参考资源**：
- [MDN - MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

**口头回答版**：
> 三者都是 UI 架构模式，核心目标是将数据（Model）与视图（View）分离，但交互方式和职责划分不同。 | 模式 | 核心关系 | 特点 | 前端代表 | |------|---------|------|---------| | MVC | Model ↔ View ↔ Controller | View 和 Model 可直接通信，Controller 处理用户输入 | Backbone.js |

---

### FB-09-CO-B-007：什么是代理模式？举一个前端应用场景。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：09 设计模式
**标签**：代理模式、ES6 Proxy、拦截、控制访问
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释代理模式（Proxy Pattern）的核心思想，并举例说明前端中的应用场景。

**参考答案**：

代理模式为某个对象提供一个代理对象，由代理对象控制对原对象的访问，可以在访问前后添加额外逻辑。

核心作用：

1. 访问控制：权限校验、延迟加载。
2. 增强功能：缓存、日志、校验。
3. 解耦：调用方无感知地使用代理对象。

前端应用场景：

- 使用 ES6 Proxy 实现响应式数据（Vue 3）。
- 图片懒加载占位代理。
- API 请求代理：统一处理鉴权、错误、缓存。
- 表单数据校验代理。

```js
const user = { name: 'Tom' };
const proxy = new Proxy(user, {
  get(target, key) {
    console.log('get', key);
    return target[key];
  },
  set(target, key, value) {
    if (key === 'age' && typeof value !== 'number') {
      throw new Error('age must be a number');
    }
    target[key] = value;
    return true;
  }
});
proxy.age = 20;
```

**评分维度**：
- 说清代理模式概念（40%）
- 举出前端场景（30%）
- 能写 Proxy 示例（30%）

**常见错误**：
- 把代理模式和装饰器模式混淆
- 不了解 Proxy 的 trap 机制

**延伸追问**：
- 代理模式和装饰器模式有什么区别？
- Vue 3 的响应式系统为什么从 Object.defineProperty 改为 Proxy？

**相关题目**：
- [FB-09-CD-P-002 用 Proxy 实现简易响应式系统](#FB-09-CD-P-002)

**参考资源**：
- [MDN - Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

**口头回答版**：
> 代理模式为某个对象提供一个代理对象，由代理对象控制对原对象的访问，可以在访问前后添加额外逻辑。 访问控制：权限校验、延迟加载。 增强功能：缓存、日志、校验。 解耦：调用方无感知地使用代理对象。

---

### FB-09-CO-B-008：什么是装饰器模式？它有什么优势？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：09 设计模式
**标签**：装饰器模式、AOP、功能增强、ES Decorator
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释装饰器模式（Decorator Pattern）的核心思想，并说明相比继承它的优势。

**参考答案**：

装饰器模式允许在不改变原对象结构的情况下，动态地给对象添加额外职责。它是继承的一种灵活替代方案。

核心优势：

1. 扩展功能时无需修改原有类（开闭原则）。
2. 比继承更灵活，可以组合多个装饰器。
3. 运行时动态添加或移除功能。

与继承的区别：

- 继承：静态扩展，类层次容易膨胀。
- 装饰器：动态组合，功能可叠加。

前端应用场景：

- 高阶组件（HOC）增强 React 组件。
- AOP 日志、权限校验、性能监控。
- ES 提案 Decorator 语法修饰类和方法。

```js
function withLogging(fn) {
  return function(...args) {
    console.log('call', fn.name, args);
    return fn.apply(this, args);
  };
}
const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(1, 2); // call add [1, 2]
```

**评分维度**：
- 说清装饰器模式概念（40%）
- 对比继承优势（30%）
- 能举前端示例（30%）

**常见错误**：
- 把装饰器模式等同于 ES 装饰器语法
- 忽略装饰器需要保持原接口

**延伸追问**：
- 装饰器模式和代理模式有什么区别？
- React 高阶组件有哪些缺点？ hooks 如何替代 HOC？

**相关题目**：
- [FB-09-CD-P-001 手写装饰器模式实现日志和权限控制](#FB-09-CD-P-001)

**参考资源**：
- [Refactoring Guru - Decorator](https://refactoringguru.cn/design-patterns/decorator)

---

## 进阶题（8 道）{#advanced}

**口头回答版**：
> 装饰器模式允许在不改变原对象结构的情况下，动态地给对象添加额外职责。 它是继承的一种灵活替代方案。 扩展功能时无需修改原有类（开闭原则）。 比继承更灵活，可以组合多个装饰器。

### FB-09-CD-A-001：手写一个单例模式，并考虑延迟初始化与线程安全。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：09 设计模式
**标签**：单例模式、懒加载、闭包、ES6 Class
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请用 JavaScript 手写一个单例模式，要求：
1. 延迟初始化（首次使用时创建实例）。
2. 多次创建返回同一个实例。
3. 讨论前端场景下是否需要考虑线程安全。

**参考答案**：

方案一：闭包 + 立即执行函数

```js
const Singleton = (function() {
  let instance = null;
  function createInstance() {
    return { data: {} };
  }
  return function() {
    if (!instance) instance = createInstance();
    return instance;
  };
})();
```

方案二：ES6 Class + 静态属性

```js
class Singleton {
  static instance = null;
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    this.data = {};
    Singleton.instance = this;
  }
}

const a = new Singleton();
const b = new Singleton();
console.log(a === b); // true
```

方案三：getter 方式（更优雅）

```js
class Singleton {
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
```

线程安全：

- 浏览器端 JavaScript 单线程执行，通常无需考虑线程安全。
- Node.js 中若存在异步初始化（如读取配置文件、连接数据库），需用锁或 `Promise` 防止重复创建。

```js
class Singleton {
  static initPromise = null;
  static async getInstanceAsync() {
    if (Singleton.instance) return Singleton.instance;
    if (!Singleton.initPromise) {
      Singleton.initPromise = this.createAsync();
    }
    Singleton.instance = await Singleton.initPromise;
    return Singleton.instance;
  }
}
```

**评分维度**：
- 写出基础单例实现（40%）
- 体现延迟初始化（20%）
- 讨论线程/异步安全（20%）
- 代码风格与可维护性（20%）

**常见错误**：
- 未处理 `new Singleton()` 和 `Singleton.getInstance()` 混用
- 忽略异步初始化时的竞态条件

**延伸追问**：
- 如何破坏单例？如何防止通过反射/序列化破坏？
- 单例模式和 DI 容器中的单例作用域有什么区别？

**相关题目**：
- [FB-09-CO-B-001 什么是单例模式](#FB-09-CO-B-001)

**参考资源**：
- [Refactoring Guru - Singleton](https://refactoringguru.cn/design-patterns/singleton)

**口头回答版**：
> 方案一：闭包 + 立即执行函数 方案二：ES6 Class + 静态属性 方案三：getter 方式（更优雅） - 浏览器端 JavaScript 单线程执行，通常无需考虑线程安全。

---

### FB-09-CD-A-002：手写一个发布订阅事件总线（EventBus）。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：09 设计模式
**标签**：发布订阅、EventBus、事件总线、手写代码
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请实现一个发布订阅事件总线 `EventBus`，支持 `on`、`off`、`emit`、`once` 方法，并考虑内存泄漏问题。

**参考答案**：

```js
class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(event, cb) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event).add(cb);
    return () => this.off(event, cb); // 返回取消订阅函数
  }

  once(event, cb) {
    const wrapper = (...args) => {
      cb(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  off(event, cb) {
    if (!this.events.has(event)) return;
    const callbacks = this.events.get(event);
    callbacks.delete(cb);
    if (callbacks.size === 0) this.events.delete(event);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach(cb => cb(...args));
  }
}
```

使用示例：

```js
const bus = new EventBus();
const unsubscribe = bus.on('login', user => console.log(user.name));
bus.emit('login', { name: 'Tom' }); // Tom
unsubscribe();
```

内存泄漏注意：

1. 组件卸载时取消订阅。
2. `once` 应确保回调执行后自动移除。
3. 避免在闭包中持有对大对象的长期引用。

**评分维度**：
- 实现 on/emit/off/once（50%）
- 使用合适数据结构（Map/Set）（20%）
- 考虑内存泄漏与取消订阅（30%）

**常见错误**：
- 用数组存储回调，off 时删除引用不一致的函数
- `once` 实现中移除的是原函数而非 wrapper
- 未返回取消订阅函数

**延伸追问**：
- 如何实现命名空间或通配符事件？
- 如果事件回调抛出异常，如何不影响其他回调？

**相关题目**：
- [FB-09-CO-B-003 观察者模式与发布订阅模式区别](#FB-09-CO-B-003)

**参考资源**：
- [Node.js Events](https://nodejs.org/api/events.html)

**口头回答版**：
> 组件卸载时取消订阅。 once 应确保回调执行后自动移除。 避免在闭包中持有对大对象的长期引用。

---

### FB-09-CD-A-003：用策略模式重构一段复杂条件判断代码。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：09 设计模式
**标签**：策略模式、重构、条件分支、开闭原则
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
下面是一段根据会员等级计算折扣的代码，请用策略模式重构：

```js
function getDiscount(level, price) {
  if (level === 'normal') return price * 0.95;
  if (level === 'vip') return price * 0.8;
  if (level === 'svip') return price * 0.7;
  return price;
}
```

**参考答案**：

核心思路：将每种折扣算法封装为独立策略，由上下文选择策略。

```js
const discountStrategies = {
  normal: price => price * 0.95,
  vip: price => price * 0.8,
  svip: price => price * 0.7,
  default: price => price
};

function getDiscount(level, price) {
  const strategy = discountStrategies[level] || discountStrategies.default;
  return strategy(price);
}
```

更完整的面向对象实现：

```js
class DiscountContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  setStrategy(strategy) { this.strategy = strategy; }
  execute(price) { return this.strategy(price); }
}

const strategies = {
  normal: price => price * 0.95,
  vip: price => price * 0.8,
  svip: price => price * 0.7
};

const ctx = new DiscountContext(strategies.normal);
console.log(ctx.execute(100)); // 95
ctx.setStrategy(strategies.vip);
console.log(ctx.execute(100)); // 80
```

收益：

1. 新增等级只需添加策略，无需修改 `getDiscount`。
2. 策略可独立测试。
3. 消除冗长 `if/else`。

**评分维度**：
- 正确分离策略与上下文（40%）
- 体现开闭原则（30%）
- 代码可扩展性（30%）

**常见错误**：
- 只是把 `if/else` 换成 `switch`
- 策略函数签名不统一

**延伸追问**：
- 如果折扣策略需要额外的上下文（如商品类别、活动规则），如何设计？
- 策略模式和状态模式有什么异同？

**相关题目**：
- [FB-09-CO-B-004 策略模式主要解决什么问题](#FB-09-CO-B-004)

**参考资源**：
- [Refactoring Guru - Strategy](https://refactoringguru.cn/design-patterns/strategy)

**口头回答版**：
> 核心思路：将每种折扣算法封装为独立策略，由上下文选择策略。 更完整的面向对象实现： 新增等级只需添加策略，无需修改 getDiscount。 消除冗长 if/else。

---

### FB-09-CO-A-001：适配器模式与外观模式有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：09 设计模式
**标签**：适配器模式、外观模式、接口转换、简化接口
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较适配器模式（Adapter Pattern）与外观模式（Facade Pattern）的异同。

**参考答案**：

两者都是结构型模式，都涉及对现有接口的包装，但目的不同。

| 维度 | 适配器模式 | 外观模式 |
|------|-----------|---------|
| 目的 | 转换接口，使不兼容的接口能协同工作 | 简化复杂子系统的接口 |
| 关注点 | 接口兼容性 | 接口易用性 |
| 是否改变原接口 | 是，进行转换 | 否，只是提供更高层抽象 |
| 典型场景 | 第三方库接口统一、旧系统迁移 | 复杂 SDK 封装、子系统入口 |

前端示例：

适配器模式：
```js
// 旧 API 返回 snake_case，新组件期望 camelCase
function userAdapter(oldUser) {
  return {
    userId: oldUser.user_id,
    userName: oldUser.user_name
  };
}
```

外观模式：
```js
// 封装复杂的微信/支付宝/银联支付调用
const PaymentFacade = {
  pay(type, order) {
    if (type === 'wechat') WechatSDK.pay(order);
    if (type === 'alipay') AlipaySDK.pay(order);
  }
};
```

**评分维度**：
- 准确说清两者目的（40%）
- 对比接口转换 vs 简化接口（30%）
- 能举前端示例（30%）

**常见错误**：
- 将两者混为一谈
- 认为外观模式也做接口转换

**延伸追问**：
- 适配器模式和代理模式有什么区别？
- 外观模式是否违反单一职责原则？

**参考资源**：
- [Refactoring Guru - Adapter](https://refactoringguru.cn/design-patterns/adapter)
- [Refactoring Guru - Facade](https://refactoringguru.cn/design-patterns/facade)

**口头回答版**：
> 两者都是结构型模式，都涉及对现有接口的包装，但目的不同。 | 维度 | 适配器模式 | 外观模式 | |------|-----------|---------| | 目的 | 转换接口，使不兼容的接口能协同工作 | 简化复杂子系统的接口 |

---

### FB-09-CO-A-002：命令模式的核心思想是什么？适合什么场景？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：09 设计模式
**标签**：命令模式、撤销重做、请求封装、行为型模式
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释命令模式（Command Pattern）的核心思想，并说明它适合解决哪些前端场景问题。

**参考答案**：

命令模式将请求封装为一个对象，从而可以用不同的请求、队列或日志来参数化其他对象，同时支持可撤销操作。

核心角色：

1. Command（命令接口）：定义执行和撤销方法。
2. ConcreteCommand（具体命令）：封装具体请求。
3. Invoker（调用者）：负责执行命令。
4. Receiver（接收者）：真正执行操作的实体。

适合场景：

1. 撤销/重做（Undo/Redo）。
2. 宏命令（批量执行）。
3. 请求队列与延迟执行。
4. 操作日志与回放。

前端应用：

- 富文本编辑器撤销重做。
- 图形编辑器操作历史。
- 表单分步提交与回滚。

```js
class Command {
  execute() {}
  undo() {}
}

class AddCommand extends Command {
  constructor(receiver, value) {
    super();
    this.receiver = receiver;
    this.value = value;
  }
  execute() { this.receiver.add(this.value); }
  undo() { this.receiver.sub(this.value); }
}
```

**评分维度**：
- 说清命令模式核心思想（40%）
- 说明角色划分（30%）
- 举出前端场景（30%）

**常见错误**：
- 把命令模式简单理解为函数回调
- 忽略 undo 能力

**延伸追问**：
- 如何实现无限撤销/重做历史栈？
- 命令模式和策略模式有什么区别？

**相关题目**：
- [FB-09-CD-A-004 手写一个支持撤销的命令模式](#FB-09-CD-A-004)

**参考资源**：
- [Refactoring Guru - Command](https://refactoringguru.cn/design-patterns/command)

**口头回答版**：
> 命令模式将请求封装为一个对象，从而可以用不同的请求、队列或日志来参数化其他对象，同时支持可撤销操作。 Command（命令接口）：定义执行和撤销方法。 ConcreteCommand（具体命令）：封装具体请求。 Invoker（调用者）：负责执行命令。

---

### FB-09-CD-A-004：手写一个迭代器模式，实现自定义集合遍历。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：09 设计模式
**标签**：迭代器模式、Symbol.iterator、生成器、遍历
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请实现一个自定义集合 `BookShelf`，支持 `for...of` 遍历，并体现迭代器模式的核心思想。

**参考答案**：

迭代器模式提供一种方法顺序访问聚合对象中的各个元素，而无需暴露其内部表示。

```js
class BookShelf {
  constructor() {
    this.books = [];
  }
  add(book) { this.books.push(book); }
  get length() { return this.books.length; }
  get(index) { return this.books[index]; }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.books.length; i++) {
      yield this.books[i];
    }
  }
}

const shelf = new BookShelf();
shelf.add('JavaScript');
shelf.add('Design Patterns');

for (const book of shelf) {
  console.log(book);
}
```

不使用生成器的版本：

```js
class BookShelf {
  // ...
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.books[index],
        done: index++ >= this.books.length
      })
    };
  }
}
```

核心收益：

1. 遍历逻辑与集合内部结构解耦。
2. 统一遍历接口。
3. 支持多种遍历策略（正序、倒序、过滤）。

**评分维度**：
- 实现 Symbol.iterator（40%）
- 体现迭代器模式思想（30%）
- 代码简洁可用（30%）

**常见错误**：
- 直接返回数组迭代器，未封装自定义逻辑
- 生成器与普通迭代器对象混淆

**延伸追问**：
- 如何同时提供正序和倒序迭代器？
- ES6 的 Map、Set 迭代器有什么区别？

**参考资源**：
- [MDN - Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

**口头回答版**：
> 迭代器模式提供一种方法顺序访问聚合对象中的各个元素，而无需暴露其内部表示。 不使用生成器的版本： 遍历逻辑与集合内部结构解耦。 支持多种遍历策略（正序、倒序、过滤）。

---

### FB-09-CO-A-003：什么是依赖注入？它解决了什么问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：09 设计模式
**标签**：依赖注入、DI、IoC、控制反转、解耦
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释依赖注入（Dependency Injection, DI）的概念，以及它解决了什么问题。

**参考答案**：

依赖注入是实现控制反转（IoC）的一种具体方式。对象不自己创建依赖，而是由外部容器将依赖注入进来。

核心思想：

1. 依赖倒置：高层模块不应依赖低层模块，二者都应依赖抽象。
2. 控制反转：将对象创建和组装的控制权交给容器/框架。
3. 依赖注入：通过构造函数、属性或方法将依赖传入。

解决的问题：

1. 降低模块间耦合。
2. 便于单元测试（可注入 Mock）。
3. 提高代码可替换性和可扩展性。

前端示例：

```js
// 不推荐
class UserService {
  constructor() {
    this.api = new HttpClient(); // 强耦合
  }
}

// 推荐：依赖注入
class UserService {
  constructor(api) {
    this.api = api;
  }
}
```

Angular 内置 DI 系统；React 中通过 props 注入依赖或 Context 提供服务。

**评分维度**：
- 说清 DI 与 IoC 关系（40%）
- 说明解决的问题（30%）
- 能举前端示例（30%）

**常见错误**：
- 把 DI 和 IoC 完全等同
- 认为 DI 只存在于后端/Angular

**延伸追问**：
- 构造函数注入、Setter 注入、接口注入各有什么优缺点？
- 依赖注入容器如何管理生命周期（singleton、transient、scoped）？

**参考资源**：
- [Angular - Dependency Injection](https://angular.io/guide/dependency-injection)

**口头回答版**：
> 依赖注入是实现控制反转（IoC）的一种具体方式。 对象不自己创建依赖，而是由外部容器将依赖注入进来。 依赖倒置：高层模块不应依赖低层模块，二者都应依赖抽象。 控制反转：将对象创建和组装的控制权交给容器/框架。

---

### FB-09-CO-A-004：为什么常说"组合优于继承"？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：09 设计模式
**标签**：组合、继承、HAS-A、IS-A、代码复用
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释"组合优于继承"（Composition over Inheritance）的含义，并说明在前端开发中如何实践。

**参考答案**：

"组合优于继承"是面向对象设计的重要原则。组合表示"有一个"（HAS-A）关系，继承表示"是一个"（IS-A）关系。当行为需要复用时，优先通过组合实现，而不是扩展继承链。

继承的问题：

1. 紧耦合：子类依赖父类实现细节。
2. 脆弱基类：修改父类可能意外破坏子类。
3. 组合爆炸：多重继承导致类层次复杂。
4. 不灵活：运行时无法更改行为。

组合的优势：

1. 运行时动态替换行为（策略模式）。
2. 类层次扁平，职责单一。
3. 更容易测试和复用。

前端实践：

- React：优先使用 props 组合而非 HOC 嵌套过深。
- Vue：使用组合式函数（Composables）复用逻辑。
- 组件库：将按钮、图标、loading 状态等作为 props 组合，而非通过继承扩展。

```js
// 组合示例
function FlyBehavior() { /* ... */ }
function Duck(behavior) { this.behavior = behavior; }
Duck.prototype.move = function() { this.behavior.fly(); };
```

**评分维度**：
- 说清 HAS-A vs IS-A（30%）
- 列举继承的缺点（30%）
- 结合前端框架说明实践（40%）

**常见错误**：
- 认为继承完全不能用
- 把组合简单等同于"传递 props"

**延伸追问**：
- 什么场景下继承仍然更合适？
- React 的 HOC、Render Props、Hooks 分别体现了哪种设计思想？

**相关题目**：
- [FB-09-SC-R-002 重构继承过深的组件体系到组合](#FB-09-SC-R-002)

**参考资源**：
- [Refactoring Guru - Composition over Inheritance](https://refactoringguru.cn/design-patterns/composite)

---

## 深入题（7 道）{#proficient}

**口头回答版**：
> "组合优于继承"是面向对象设计的重要原则。 组合表示"有一个"（HAS-A）关系，继承表示"是一个"（IS-A）关系。 当行为需要复用时，优先通过组合实现，而不是扩展继承链。 紧耦合：子类依赖父类实现细节。

### FB-09-CO-P-001：请详细解释 SOLID 原则，并说明如何在前端落地。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：09 设计模式
**标签**：SOLID、单一职责、开闭原则、里氏替换、接口隔离、依赖倒置
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请解释 SOLID 原则的五项内容，并针对每一项给出前端开发中的落地示例或反例。

**参考答案**：

SOLID 是面向对象设计的五大原则：

| 原则 | 含义 | 前端落地 |
|------|------|---------|
| S - 单一职责原则（SRP） | 一个类/模块只负责一件事 | 组件只负责渲染，逻辑抽成 Hooks/Composables |
| O - 开闭原则（OCP） | 对扩展开放，对修改关闭 | 表单校验规则用策略模式扩展，不修改校验器 |
| L - 里氏替换原则（LSP） | 子类应能替换父类而不影响正确性 | 组件 props 类型设计要兼容基类约束 |
| I - 接口隔离原则（ISP） | 客户端不应依赖它不需要的接口 | 组件 props 拆分，避免一个超大 Props 对象 |
| D - 依赖倒置原则（DIP） | 依赖抽象而非具体实现 | Service 依赖接口/抽象类型，便于 Mock 和替换 |

反例与修正：

- SRP 反例：一个组件同时处理 UI、请求、埋点、权限。
- OCP 反例：每新增图表类型就修改渲染函数中的 switch。
- LSP 反例：子组件 props 比父组件更严格，导致替换时报错。
- ISP 反例：一个通用表单组件 props 多达 30+。
- DIP 反例：组件内部直接调用 `axios` 实例。

**评分维度**：
- 完整说出五项原则（40%）
- 每项能给出前端示例（40%）
- 能识别常见反例（20%）

**常见错误**：
- 只背缩写，不理解含义
- 认为 SOLID 只适用于后端

**延伸追问**：
- React/Vue 组件是否违背 SRP？如何看待"一个组件一个职责"？
- 前端 TypeScript 中如何用类型系统辅助 ISP 和 DIP？

**参考资源**：
- [SOLID Principles - MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/SOLID)

**口头回答版**：
> SOLID 是面向对象设计的五大原则： | 原则 | 含义 | 前端落地 | |------|------|---------| | S - 单一职责原则（SRP） | 一个类/模块只负责一件事 | 组件只负责渲染，逻辑抽成 Hooks/Composables |

---

### FB-09-CO-P-002：如何理解 DRY、KISS、YAGNI 原则？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：09 设计模式
**标签**：DRY、KISS、YAGNI、代码简洁、过度设计
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 DRY、KISS、YAGNI 三条原则，并说明它们之间的平衡关系。

**参考答案**：

| 原则 | 含义 | 实践要点 |
|------|------|---------|
| DRY - Don't Repeat Yourself | 不要重复自己 | 提取公共逻辑，但避免为了消除重复而强行抽象 |
| KISS - Keep It Simple, Stupid | 保持简单 | 选择最简洁、可读的实现，避免过度设计 |
| YAGNI - You Aren't Gonna Need It | 你不需要它 | 只实现当前需求，不预设未来功能 |

平衡关系：

1. DRY 不是消灭所有重复：有时适度的重复（如两个业务线相似的校验）比错误抽象更清晰。
2. KISS 反对过度设计：不要为了使用设计模式而使用设计模式。
3. YAGNI 防止镀金：不要提前实现可能用不到的功能。

前端实践：

- DRY：提取通用 Hooks、工具函数、组件。
- KISS：优先使用简单组件和函数，避免不必要的抽象层。
- YAGNI：不要为"未来可能支持主题切换"提前写 10 套主题系统。

**评分维度**：
- 准确解释三条原则（50%）
- 说明平衡与反模式（30%）
- 能举前端实例（20%）

**常见错误**：
- 机械追求"零重复"，导致错误抽象
- 以"未来扩展"为由过度设计

**延伸追问**：
- DRY 和"偶然的重复"有什么区别？
- 如何在代码评审中判断一段代码是否过度设计？

**参考资源**：
- [The Pragmatic Programmer - DRY](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/)

**口头回答版**：
> | 原则 | 含义 | 实践要点 | |------|------|---------| | DRY - Don't Repeat Yourself | 不要重复自己 | 提取公共逻辑，但避免为了消除重复而强行抽象 | | KISS - Keep It Simple, Stupid | 保持简单 | 选择最简洁、可读的实现，避免过度设计 |

---

### FB-09-CD-P-001：用装饰器模式实现日志记录和权限校验。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：09 设计模式
**标签**：装饰器模式、AOP、高阶函数、权限控制
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请用装饰器模式实现两个通用装饰器：
1. `withLog`：在函数执行前后打印日志。
2. `withAuth`：在执行前校验用户权限，无权限则抛出错误。
要求装饰器可以组合使用。

**参考答案**：

装饰器模式通过高阶函数动态增强原函数功能，同时保持原函数签名。

```js
function withLog(fn) {
  return function(...args) {
    console.log(`[LOG] call ${fn.name} with`, args);
    const result = fn.apply(this, args);
    console.log(`[LOG] ${fn.name} return`, result);
    return result;
  };
}

function withAuth(roles) {
  return function(fn) {
    return function(...args) {
      // 假设从上下文中获取当前用户角色
      const currentRole = getCurrentUserRole();
      if (!roles.includes(currentRole)) {
        throw new Error('Permission denied');
      }
      return fn.apply(this, args);
    };
  };
}

// 使用
function getOrderList(userId) {
  return [{ id: 1 }];
}

const protectedGetOrderList = withLog(withAuth(['admin', 'editor'])(getOrderList));
protectedGetOrderList(100);
```

组合顺序注意：

- 内层先执行 `withAuth`，外层再执行 `withLog`，可记录权限校验失败。
- 顺序可调整，根据需求决定是记录原函数还是完整调用链。

**评分维度**：
- 正确实现两个装饰器（40%）
- 支持组合使用（30%）
- 保持原函数签名与 this（30%）

**常见错误**：
- 装饰器丢失原函数名或 this 指向
- 组合顺序错误导致权限校验未被日志记录

**延伸追问**：
- 如何用 ES Decorator 语法实现类方法装饰器？
- 装饰器链过长时如何调试和追踪？

**相关题目**：
- [FB-09-CO-B-008 什么是装饰器模式](#FB-09-CO-B-008)

**参考资源**：
- [Refactoring Guru - Decorator](https://refactoringguru.cn/design-patterns/decorator)

**口头回答版**：
> 装饰器模式通过高阶函数动态增强原函数功能，同时保持原函数签名。 - 内层先执行 withAuth，外层再执行 withLog，可记录权限校验失败。 - 顺序可调整，根据需求决定是记录原函数还是完整调用链。

---

### FB-09-CD-P-002：用 Proxy 实现一个简易的响应式系统。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：09 设计模式
**标签**：Proxy、响应式、依赖收集、发布订阅
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请用 ES6 Proxy 实现一个简易响应式系统 `reactive(obj)`，支持在数据变化时自动执行依赖函数，并说明与 Vue 3 响应式系统的异同。

**参考答案**：

核心思路：利用 Proxy 拦截 get/set，通过 Effect 收集依赖，数据变化时触发 Effect。

```js
let activeEffect = null;

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
      return true;
    }
  });
}

const targetMap = new WeakMap();

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

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

// 使用
const state = reactive({ count: 0 });
effect(() => console.log(state.count));
state.count++; // 输出 1
```

与 Vue 3 的差异：

- Vue 3 使用 WeakMap + Map + Set 的依赖收集结构，并支持嵌套对象、数组、Map、Set。
- Vue 3 通过 `effect` 调度器实现异步批量更新。
- Vue 3 还处理了深度响应式、只读、shallow 等变体。

**评分维度**：
- 正确实现 Proxy 拦截（30%）
- 实现依赖收集与触发（40%）
- 说明与 Vue 3 的差异（30%）

**常见错误**：
- 未处理嵌套对象（浅响应式）
- 依赖收集时未判断 activeEffect 是否存在
- 忽略数组、Map、Set 等特殊对象

**延伸追问**：
- 如何处理嵌套对象的响应式？
- 如果同一个 effect 中多次读取同一属性，依赖会重复收集吗？如何避免？

**相关题目**：
- [FB-09-CO-B-007 什么是代理模式](#FB-09-CO-B-007)

**参考资源**：
- [Vue.js - Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)

**口头回答版**：
> 核心思路：利用 Proxy 拦截 get/set，通过 Effect 收集依赖，数据变化时触发 Effect。 与 Vue 3 的差异： - Vue 3 使用 WeakMap + Map + Set 的依赖收集结构，并支持嵌套对象、数组、Map、Set。 - Vue 3 通过 effect 调度器实现异步批量更新。

---

### FB-09-CO-P-003：前端开发中有哪些常见的设计反模式？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：09 设计模式
**标签**：反模式、过度设计、上帝对象、面条代码
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举前端开发中常见的设计反模式（Anti-patterns），并说明它们的危害与改进方向。

**参考答案**：

常见前端反模式：

| 反模式 | 表现 | 危害 | 改进方向 |
|--------|------|------|---------|
| 上帝对象/组件 | 一个对象/组件负责过多职责 | 难以维护、测试困难 | 拆分职责，遵循 SRP |
| 面条代码 | 大量嵌套 if/else、回调地狱 | 可读性差、易出错 | 使用策略模式、Promise/async-await |
| 过度设计 | 为简单问题引入复杂抽象 | 开发效率低、理解成本高 | YAGNI，保持简单 |
| 过早抽象 | 只看到一次重复就强行抽象 | 抽象不稳定、修改成本高 | 等待三次重复法则 |
| 巨型 Props | 组件依赖几十上百个 props | 接口臃肿、类型难以维护 | 拆分组件、使用 Context/组合 |
| Prop Drilling | 通过多层 props 传递数据 | 中间组件被迫了解无关数据 | Context、状态管理、组合 |
| 回调地狱 | 多层嵌套回调 | 可读性差、错误处理困难 | Promise、async/await |
| 魔法字符串/数字 | 硬编码散落各处 | 维护困难、易出错 | 常量、枚举、配置中心 |

危害总结：

1. 降低可读性和可维护性。
2. 增加 Bug 率和回归成本。
3. 阻碍团队协作和新人上手。

**评分维度**：
- 列举 4 种以上反模式（40%）
- 说明危害（30%）
- 给出改进方向（30%）

**常见错误**：
- 只背名词，说不出具体表现
- 把合理的设计模式误认为是反模式

**延伸追问**：
- 你如何在代码评审中发现和预防反模式？
- 什么时候"复制粘贴"比抽象更合理？

**参考资源**：
- [Refactoring Guru - AntiPatterns](https://refactoringguru.cn/design-patterns/antipatterns)

**口头回答版**：
> | 反模式 | 表现 | 危害 | 改进方向 | |--------|------|------|---------| | 上帝对象/组件 | 一个对象/组件负责过多职责 | 难以维护、测试困难 | 拆分职责，遵循 SRP | | 面条代码 | 大量嵌套 if/else、回调地狱 | 可读性差、易出错 | 使用策略模式、Promise/async-await |

---

### FB-09-CO-P-004：设计模式通常分为哪几类？每类列举 2-3 个常用模式。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：09 设计模式
**标签**：创建型模式、结构型模式、行为型模式、模式分类
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 GoF 设计模式的三大分类，并每类列举 2-3 个前端开发中常用的模式。

**参考答案**：

GoF 设计模式通常分为三类：

1. **创建型模式（Creational Patterns）**：关注对象创建机制，提升代码灵活性和复用性。
   - 单例模式（Singleton）
   - 工厂方法模式（Factory Method）
   - 抽象工厂模式（Abstract Factory）
   - 建造者模式（Builder）
   - 原型模式（Prototype）

2. **结构型模式（Structural Patterns）**：关注类和对象的组合方式，形成更大的结构。
   - 装饰器模式（Decorator）
   - 代理模式（Proxy）
   - 适配器模式（Adapter）
   - 外观模式（Facade）
   - 组合模式（Composite）
   - 桥接模式（Bridge）
   - 享元模式（Flyweight）

3. **行为型模式（Behavioral Patterns）**：关注对象间的通信和职责分配。
   - 观察者模式（Observer）
   - 发布订阅模式（Pub-Sub）
   - 策略模式（Strategy）
   - 命令模式（Command）
   - 迭代器模式（Iterator）
   - 状态模式（State）
   - 模板方法模式（Template Method）
   - 责任链模式（Chain of Responsibility）

前端常用模式：

- 创建型：单例、工厂、建造者（复杂表单配置）。
- 结构型：装饰器（HOC/AOP）、代理（Proxy 响应式）、适配器（接口兼容）。
- 行为型：观察者/发布订阅（事件总线）、策略（校验/促销）、命令（撤销重做）、迭代器（遍历协议）。

**评分维度**：
- 准确说出三大分类（30%）
- 每类列举 2-3 个模式（40%）
- 能关联前端应用（30%）

**常见错误**：
- 将模式分错类别
- 只知道模式名称，说不出分类

**延伸追问**：
- 职责链模式在前端有哪些应用？
- 享元模式如何优化大量相似对象的性能？

**参考资源**：
- [Refactoring Guru - Design Patterns Catalog](https://refactoringguru.cn/design-patterns/catalog)

**口头回答版**：
> GoF 设计模式通常分为三类： 创建型模式（Creational Patterns）：关注对象创建机制，提升代码灵活性和复用性。 - 单例模式（Singleton） - 工厂方法模式（Factory Method）

---

### FB-09-SC-P-001：如何设计一个可扩展的电商促销计算引擎？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：09 设计模式
**标签**：策略模式、工厂模式、规则引擎、电商、扩展性
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
某电商平台需要支持多种促销活动：满减、折扣、秒杀、拼团、会员价。促销规则可能叠加或互斥。请设计一个可扩展的促销计算引擎。

**参考答案**：

核心设计：策略模式 + 工厂模式 + 责任链/组合模式。

1. **策略模式**：每种促销规则封装为独立策略。
2. **工厂模式**：根据促销类型创建对应策略实例。
3. **规则引擎**：定义优先级、互斥与叠加规则。
4. **组合模式**：支持多个促销组合计算。

```js
// 策略接口
class PromotionStrategy {
  isApplicable(order) { return false; }
  calculate(order) { return order.amount; }
}

class FullReductionStrategy extends PromotionStrategy {
  constructor(threshold, reduction) {
    super();
    this.threshold = threshold;
    this.reduction = reduction;
  }
  isApplicable(order) { return order.amount >= this.threshold; }
  calculate(order) { return order.amount - this.reduction; }
}

class DiscountStrategy extends PromotionStrategy {
  constructor(rate) { super(); this.rate = rate; }
  calculate(order) { return order.amount * this.rate; }
}

// 工厂
class PromotionFactory {
  static create(config) {
    switch (config.type) {
      case 'fullReduction': return new FullReductionStrategy(config.threshold, config.reduction);
      case 'discount': return new DiscountStrategy(config.rate);
      default: throw new Error('Unknown promotion type');
    }
  }
}

// 引擎
class PromotionEngine {
  constructor(rules) {
    this.rules = rules.map(PromotionFactory.create);
  }
  execute(order) {
    return this.rules
      .filter(r => r.isApplicable(order))
      .reduce((amount, rule) => rule.calculate({ ...order, amount }), order.amount);
  }
}
```

扩展性考虑：

1. 新促销类型：新增策略类并在工厂注册。
2. 互斥规则：在引擎中维护互斥表。
3. 优先级：对规则排序后依次计算。
4. 配置化：促销规则由运营后台配置 JSON。

**评分维度**：
- 选择合适设计模式（30%）
- 实现可扩展的策略结构（30%）
- 处理叠加/互斥/优先级（30%）
- 代码结构与可维护性（10%）

**常见错误**：
- 用大量 if/else 处理促销规则
- 忽略规则的优先级和互斥关系
- 引擎与策略职责划分不清

**延伸追问**：
- 如果促销规则需要访问用户画像、库存等外部数据，如何设计依赖？
- 如何保证计算引擎的性能？

**参考资源**：
- [Refactoring Guru - Strategy](https://refactoringguru.cn/design-patterns/strategy)

---

## 架构题（12 道）{#architect}

**口头回答版**：
> 核心设计：策略模式 + 工厂模式 + 责任链/组合模式。 策略模式：每种促销规则封装为独立策略。 工厂模式：根据促销类型创建对应策略实例。 规则引擎：定义优先级、互斥与叠加规则。

### FB-09-SD-R-001：设计一个前端跨页面/跨 iframe 的事件总线。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：09 设计模式
**标签**：发布订阅、事件总线、跨页面通信、BroadcastChannel、架构设计
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端事件总线，支持：
1. 同一页面内组件间通信。
2. 跨页面/跨 iframe 通信。
3. 支持命名空间、通配符订阅、消息持久化与离线重放。
请说明核心模块、数据流和关键技术选型。

**参考答案**：

核心架构：

```
Publisher -> Local EventBus -> Transport Layer -> Remote EventBus -> Subscriber
```

核心模块：

1. **EventBus（本地总线）**：内存中的发布订阅中心。
2. **Transport（传输层）**：负责跨页面消息传递。
   - 同源页面：`BroadcastChannel` / `window.postMessage`
   - 跨域 iframe：`postMessage` + origin 校验
3. **Namespace（命名空间）**：避免事件冲突，如 `app:module:event`。
4. **Wildcard Matcher（通配符匹配）**：支持 `app:*:login` 订阅。
5. **Persistence（持久化层）**：`localStorage` / `IndexedDB` 存储离线消息。
6. **Replay Service（重放服务）**：订阅者重新上线时按时间窗口重放消息。

关键技术选型：

- 实时通信：`BroadcastChannel`（现代浏览器），兼容性 fallback 到 `storage` 事件。
- 序列化：结构化克隆算法，避免循环引用；敏感数据加密。
- 安全性：校验 `event.origin`，白名单机制，防止 CSRF/XSS。
- 性能：消息去重、限流、订阅索引。

数据流：

1. 发布事件到本地总线。
2. 本地订阅者立即响应。
3. Transport 序列化事件并广播到远端。
4. 远端总线接收后路由到对应订阅者。
5. 若订阅者离线，事件写入持久化队列。

```js
class CrossPageEventBus {
  constructor(channelName) {
    this.localBus = new EventBus();
    this.channel = new BroadcastChannel(channelName);
    this.channel.onmessage = (e) => this.localBus.emit(e.data.topic, e.data.payload);
  }
  emit(topic, payload) {
    this.localBus.emit(topic, payload);
    this.channel.postMessage({ topic, payload, ts: Date.now() });
  }
  on(topic, cb) { return this.localBus.on(topic, cb); }
}
```

**评分维度**：
- 本地与远程通信分层设计（30%）
- 命名空间、通配符、持久化设计（30%）
- 安全性与兼容性考虑（25%）
- 可扩展性与性能（15%）

**常见错误**：
- 只考虑同页面通信，忽略跨页面
- 未做 origin 校验导致安全风险
- 持久化消息无限增长

**延伸追问**：
- 如何保证跨页面消息的顺序性？
- 如果页面关闭，未送达的消息如何处理？

**相关题目**：
- [FB-09-CD-A-002 手写一个发布订阅事件总线](#FB-09-CD-A-002)

**参考资源**：
- [MDN - BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)

**口头回答版**：
> EventBus（本地总线）：内存中的发布订阅中心。 Transport（传输层）：负责跨页面消息传递。 - 同源页面：BroadcastChannel / window.postMessage - 跨域 iframe：postMessage + origin 校验

---

### FB-09-SC-R-001：在设计大型前端组件库时，你会如何运用设计模式？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：09 设计模式
**标签**：组件库、设计模式、组合、插件化、可扩展性
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请结合设计模式，阐述如何设计一个大型前端组件库，使其具备良好的可扩展性、可维护性和一致性。

**参考答案**：

大型组件库中可运用的设计模式：

1. **组合模式（Composite）**：
   - 复杂组件由原子组件组合而成，如 Form = FormItem + Input + Button。
   - 统一渲染接口，支持嵌套结构。

2. **策略模式（Strategy）**：
   - 校验规则、尺寸适配、主题计算。
   - 不同平台（PC/Mobile）的交互策略切换。

3. **观察者模式/发布订阅（Observer/Pub-Sub）**：
   - 组件间事件通信。
   - 表单字段联动。

4. **装饰器模式（Decorator）**：
   - 高阶组件增强功能（如 `withLoading`、`withLocale`）。
   - AOP 实现埋点、日志、权限。

5. **工厂模式（Factory）**：
   - 根据配置生成不同变体组件。
   - 图标库按需加载。

6. **外观模式（Facade）**：
   - 封装复杂 DOM 操作或动画库 API。
   - 提供简洁的组件调用入口。

7. **单例模式（Singleton）**：
   - 全局配置、主题、消息通知实例。

8. **依赖注入（DI）**：
   - 通过 Context 注入主题、国际化、表单实例。

一致性保障：

- 设计令牌（Design Tokens）。
- 统一的组件 API 规范。
- 主题与变体系统。

扩展性保障：

- 插件化架构。
- 插槽（slot）/ render props。
- CSS-in-JS 或 CSS 变量主题系统。

**评分维度**：
- 能选择 3 种以上合适模式（30%）
- 结合组件库场景说明（30%）
- 体现一致性与扩展性设计（25%）
- 考虑工程化和维护成本（15%）

**常见错误**：
- 堆砌设计模式，不考虑实际场景
- 忽略组件库的一致性和文档
- 过度抽象导致使用门槛高

**延伸追问**：
- 如何平衡组件的通用性和易用性？
- 组件库如何处理破坏性更新和版本兼容？

**参考资源**：
- [Ant Design - Design](https://ant.design/docs/spec/introduce)

**口头回答版**：
> 大型组件库中可运用的设计模式： 组合模式（Composite）： - 复杂组件由原子组件组合而成，如 Form = FormItem + Input + Button。 - 统一渲染接口，支持嵌套结构。

---

### FB-09-SD-R-002：设计一个前端权限控制系统。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：09 设计模式
**标签**：权限控制、策略模式、装饰器、组合、RBAC、ABAC
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端权限控制系统，支持按钮级、路由级、字段级权限，并能适应 RBAC 和 ABAC 两种模型。请说明如何运用设计模式实现。

**参考答案**：

核心架构：

```
权限配置 -> 权限引擎（策略模式） -> 权限装饰器/HOC -> UI 组件
```

权限模型：

- **RBAC（基于角色）**：用户 -> 角色 -> 权限。
- **ABAC（基于属性）**：根据用户属性、资源属性、环境属性动态判定。

设计模式应用：

1. **策略模式（Strategy）**：
   - 定义 `RBACStrategy`、`ABACStrategy`、`CompositeStrategy`。
   - 权限引擎根据配置选择策略。

2. **装饰器模式（Decorator）**：
   - `withPermission` HOC / 指令实现按钮/路由级控制。
   - `PermissionGuard` 包裹组件，无权限时渲染空状态或隐藏。

3. **组合模式（Composite）**：
   - 权限表达式支持 `AND`、`OR`、`NOT` 组合。
   - 如 `hasRole('admin') OR (hasRole('editor') AND ownResource())`。

4. **适配器模式（Adapter）**：
   - 适配后端不同权限接口格式。

5. **单例模式（Singleton）**：
   - 全局权限引擎实例。

核心实现：

```js
class PermissionEngine {
  constructor(strategy) {
    this.strategy = strategy;
  }
  check(ctx, permission) {
    return this.strategy.evaluate(ctx, permission);
  }
}

// 策略
const rbacStrategy = {
  evaluate: (ctx, permission) => ctx.roles.includes(permission)
};

// 装饰器
function withPermission(permission) {
  return function(Component) {
    return function(props) {
      const allowed = usePermission(permission);
      return allowed ? <Component {...props} /> : null;
    };
  };
}
```

字段级权限：

- 通过 schema 配置字段可见性/可编辑性。
- 表单渲染前用权限引擎过滤字段。

**评分维度**：
- 支持多权限模型（25%）
- 策略模式设计合理（25%）
- 多粒度权限控制（25%）
- 安全性与可维护性（25%）

**常见错误**：
- 仅在前端做权限控制，忽视服务端校验
- 权限判断逻辑散落在各组件中
- 未处理权限异步加载与缓存

**延伸追问**：
- 前端权限被绕过怎么办？如何与服务端配合？
- 权限表达式过于复杂时如何优化性能？

**参考资源**：
- [OWASP - Access Control](https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control)

**口头回答版**：
> - RBAC（基于角色）：用户 -> 角色 -> 权限。 - ABAC（基于属性）：根据用户属性、资源属性、环境属性动态判定。 策略模式（Strategy）： - 定义 RBACStrategy、ABACStrategy、CompositeStrategy。

---

### FB-09-CP-R-001：React 和 Vue 中体现了哪些设计模式？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：09 设计模式
**标签**：React、Vue、设计模式、组合、观察者、发布订阅
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请结合 React 和 Vue 的源码或 API，分析其中体现了哪些设计模式，并说明这些模式带来的收益。

**参考答案**：

React 中的设计模式：

1. **组合模式（Composite）**：
   - 组件树本身就是一种组合结构。
   - `children`、render props、slots 都体现组合优于继承。

2. **策略模式（Strategy）**：
   - React Reconciler 支持不同宿主环境（DOM、Native、Canvas）的渲染策略。
   - Hooks 内部不同 effect 的处理策略。

3. **装饰器模式（Decorator）**：
   - 高阶组件 HOC。
   - React.memo、React.forwardRef 可视为组件装饰。

4. **观察者模式（Observer）**：
   - useEffect 订阅依赖变化。
   - Context 的订阅/通知机制。

5. **享元模式（Flyweight）**：
   - 虚拟 DOM 复用、Fiber 节点池化思想。

Vue 中的设计模式：

1. **观察者模式（Observer）**：
   - Vue 2 的 Dep/Watcher。
   - Vue 3 的 Effect/Dependency。

2. **代理模式（Proxy）**：
   - Vue 3 用 Proxy 拦截响应式对象。

3. **发布订阅模式（Pub-Sub）**：
   - `emit/on` 组件通信。
   - Pinia/Vuex 的状态订阅。

4. **组合模式（Composite）**：
   - 组件树、递归组件。

5. **依赖注入（DI）**：
   - `provide/inject`。
   - Vue 3 的 app.config.globalProperties 与插件系统。

收益：

- 提升框架扩展性（Renderer、插件）。
- 降低组件耦合（组合、DI）。
- 提高性能（享元、响应式依赖追踪）。

**评分维度**：
- 能识别 3 种以上模式（30%）
- 结合源码/API 说明（40%）
- 分析模式收益（30%）

**常见错误**：
- 泛泛而谈，不结合具体 API
- 错误归类模式
- 把框架特性都当成设计模式

**延伸追问**：
- React 的 Hooks 是否违反了某些设计原则？
- Vue 的 Composition API 与 React Hooks 在设计思想上有何异同？

**参考资源**：
- [React Design Principles](https://react.dev/community/thinking-in-react)
- [Vue.js - Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)

**口头回答版**：
> React 中的设计模式： 组合模式（Composite）： - 组件树本身就是一种组合结构。 - children、render props、slots 都体现组合优于继承。

---

### FB-09-SC-R-002：如何将一个继承过深的组件体系重构为组合式架构？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：09 设计模式
**标签**：重构、组合优于继承、组件设计、架构演进
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
某项目存在一个继承过深的组件体系，例如 `BaseButton -> PrimaryButton -> IconPrimaryButton -> LoadingIconPrimaryButton`。请设计重构方案，将其改造为组合式架构。

**参考答案**：

问题分析：

1. 继承链过长导致脆弱基类问题。
2. 每个子类只增加少量行为，但组合爆炸。
3. 难以复用单个行为（如 loading）到其他按钮变体。

重构方案：

1. **提取独立行为/属性**：
   - `variant`：primary、default、danger。
   - `size`：sm、md、lg。
   - `icon`：前置/后置图标。
   - `loading`：加载状态。
   - `disabled`：禁用状态。

2. **使用组合实现单一组件**：

```jsx
function Button({ variant, size, icon, loading, disabled, children }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} disabled={disabled || loading}>
      {loading && <Spinner />}
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

// 使用
<Button variant="primary" size="lg" icon="save" loading>保存</Button>
```

3. **策略模式处理变体样式**：

```js
const variantStyles = {
  primary: 'bg-blue-500 text-white',
  danger: 'bg-red-500 text-white'
};
```

4. **装饰器/HOC 处理横切关注点**：
   - `withLoading` 可提供统一的 loading 行为。
   - 但优先使用 props 组合。

5. **渐进式重构步骤**：
   - 保留旧组件 API，内部转发到新组件。
   - 逐步替换业务调用方。
   - 补充测试和文档。

**评分维度**：
- 识别继承过深问题（25%）
- 设计合理的组合方案（35%）
- 处理变体、状态、横切关注点（25%）
- 给出渐进式重构路径（15%）

**常见错误**：
- 一次性全量替换，导致回归风险
- 把组合变成巨型 props 对象
- 忽略向后兼容

**延伸追问**：
- 如果按钮行为在不同业务线差异很大，如何进一步抽象？
- 组合式组件的 props 过多时，如何进行分组和类型管理？

**相关题目**：
- [FB-09-CO-A-004 为什么常说组合优于继承](#FB-09-CO-A-004)

**参考资源**：
- [React - Composition vs Inheritance](https://react.dev/learn/thinking-in-react)

**口头回答版**：
> 继承链过长导致脆弱基类问题。 每个子类只增加少量行为，但组合爆炸。 难以复用单个行为（如 loading）到其他按钮变体。 提取独立行为/属性：

---

### FB-09-CP-R-002：如何根据业务场景选择合适的设计模式？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：09 设计模式
**标签**：设计模式选型、架构决策、KISS、YAGNI
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
在真实项目中，设计模式种类繁多。请阐述你根据业务场景选择设计模式的思路，并举例说明哪些情况下不建议使用设计模式。

**参考答案**：

选型思路：

1. **识别问题域**：
   - 对象创建复杂？考虑创建型模式。
   - 接口不兼容？考虑结构型模式。
   - 对象间协作复杂？考虑行为型模式。

2. **从具体症状出发**：
   - 大量 if/else/switch → 策略模式、状态模式。
   - 对象创建逻辑分散 → 工厂模式、建造者模式。
   - 行为需要动态组合 → 装饰器模式、组合模式。
   - 多对象依赖同一状态 → 观察者模式、发布订阅。
   - 请求需要排队/撤销 → 命令模式。

3. **评估成本收益**：
   - 模式带来的抽象是否能解决当前痛点？
   - 团队是否能理解和维护？
   - 是否会增加不必要的复杂度？

4. **遵循 KISS/YAGNI**：
   - 不要为使用模式而使用模式。
   - 简单函数能解决的问题不要引入类层次。
   - 只有当变化确实发生时，才引入抽象。

不建议使用设计模式的情况：

- 一次性脚本、原型验证阶段。
- 团队对模式理解不足，导致代码晦涩。
- 过度抽象导致"抽象泄露"，增加心智负担。
- 为"未来可能的变化"提前设计复杂架构（YAGNI 反模式）。

示例决策：

| 症状 | 推荐模式 | 不推荐 |
|------|---------|--------|
| 表单校验规则多变 | 策略模式 | 简单 if/else 硬编码 |
| 全局状态同步 | 发布订阅/观察者 | 到处传 props |
| 简单工具函数复用 | 普通函数 | 工厂 + 接口 |
| UI 组件行为叠加 | 组合 + HOC | 多层继承 |

**评分维度**：
- 选型思路系统化（40%）
- 能结合症状推荐模式（30%）
- 说明不使用模式的场景（30%）

**常见错误**：
- 面试背诵模式定义，不会根据症状选择
- 认为设计模式越多越好
- 忽略团队理解和维护成本

**延伸追问**：
- 你如何在一个新项目中引入设计模式？是提前设计还是重构时引入？
- 如果团队成员反对引入某种模式，你如何沟通？

**参考资源**：
- [Refactoring Guru - When to use patterns](https://refactoringguru.cn/design-patterns/what-is-pattern)

**口头回答版**：
> - 对象间协作复杂？ - 大量 if/else/switch → 策略模式、状态模式。 - 对象创建逻辑分散 → 工厂模式、建造者模式。 - 行为需要动态组合 → 装饰器模式、组合模式。

---

### FB-09-CP-R-003：微前端架构中常用哪些设计模式？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：09 设计模式
**标签**：微前端、适配器、外观、组合、沙箱、模块联邦
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
在微前端架构中，常常会用到一些设计模式来解决子应用集成、通信、样式隔离等问题。请列举并说明。

**参考答案**：

微前端中常用的设计模式：

1. **外观模式（Facade）**：
   - 基座应用提供统一的启动、注册、路由、通信 API。
   - 子应用只需按约定接入，不感知底层实现。

2. **适配器模式（Adapter）**：
   - 兼容不同技术栈（React、Vue、Angular、jQuery）子应用的生命周期。
   - 将不同框架的挂载/卸载接口适配为统一协议。

3. **组合模式（Composite）**：
   - 页面由多个子应用/微模块组合而成。
   - 统一路由编排和布局组合。

4. **代理模式（Proxy）**：
   - JS 沙箱通过 Proxy 拦截 window 操作。
   - CSS 隔离通过 Shadow DOM 或 scoped style 代理样式作用域。

5. **观察者模式/发布订阅（Observer/Pub-Sub）**：
   - 子应用间事件通信。
   - 全局状态共享（如 qiankun 的 globalState）。

6. **单例模式（Singleton）**：
   - 全局配置中心、用户态、主题实例。

7. **策略模式（Strategy）**：
   - 根据浏览器兼容性选择沙箱策略（legacySandbox、proxySandbox、snapshotSandbox）。
   - 加载策略：路由匹配、手动加载、依赖预加载。

8. **依赖注入（DI）**：
   - 基座向子应用注入共享依赖、工具库、权限上下文。

设计目标：

- 技术栈无关：适配器 + 统一协议。
- 运行时隔离：代理沙箱 + 样式作用域。
- 通信解耦：发布订阅 + DI。
- 可扩展性：组合 + 策略。

**评分维度**：
- 列举 4 种以上模式（30%）
- 结合微前端场景说明（40%）
- 体现隔离、通信、扩展等架构目标（30%）

**常见错误**：
- 只谈 qiankun，不抽象到设计模式
- 忽略微前端特有的安全和隔离问题

**延伸追问**：
- 微前端中的全局状态共享有哪些方案？如何避免状态污染？
- 子应用样式隔离有哪些实现方式？各自的优缺点是什么？

**参考资源**：
- [qiankun - Design](https://qiankun.umijs.org/)
- [Micro Frontends](https://micro-frontends.org/)

**口头回答版**：
> 微前端中常用的设计模式： 外观模式（Facade）： - 基座应用提供统一的启动、注册、路由、通信 API。 - 子应用只需按约定接入，不感知底层实现。

---
### FB-09-CO-B-009：什么是 SOLID 原则？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：09 设计模式
**标签**：发布订阅、组合、策略模式、单例模式、工厂模式
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是 SOLID 原则。

**参考答案**：

SOLID 是五个面向对象设计原则的首字母缩写：
- SRP 单一职责
- OCP 开闭原则
- LSP 里氏替换
- ISP 接口隔离
- DIP 依赖倒置


**补充说明**：

在实际落地 SOLID 原则 时，建议结合 发布订阅、组合、策略模式 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 列出五项（60%）
- 简要解释每项（40%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> SOLID 是五个面向对象设计原则的首字母缩写： - SRP 单一职责 - OCP 开闭原则 - LSP 里氏替换 - ISP 接口隔离 - DIP 依赖倒置

---

### FB-09-CO-B-010：单例模式有什么优缺点？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：09 设计模式
**标签**：发布订阅、组合、策略模式、单例模式、工厂模式
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
单例模式有什么优缺点。

**参考答案**：

优点：全局唯一实例，节省资源。缺点：隐藏依赖，难以测试，可能引发并发问题。


**补充说明**：

在实际落地 单例模式有什么优缺点 时，建议结合 发布订阅、组合、策略模式 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 优点（40%）
- 缺点（40%）
- 前端示例（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 优点：全局唯一实例，节省资源。 缺点：隐藏依赖，难以测试，可能引发并发问题。

---

### FB-09-CP-B-001：观察者模式和发布订阅模式有什么区别？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：09 设计模式
**标签**：发布订阅、组合、策略模式、单例模式、工厂模式
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
观察者模式和发布订阅模式有什么区别。

**参考答案**：

观察者模式中观察者和目标直接通信；发布订阅模式通过事件中心解耦，发布者和订阅者不直接依赖。



**补充说明**：

在实际落地 观察者模式和发布订阅模式有什么区别 时，建议结合 发布订阅、组合、策略模式 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 观察者模式和发布订阅模式有什么区别 时，建议结合 发布订阅、组合、策略模式 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 结构差异（50%）
- 耦合度差异（30%）
- 举例说明（20%）

---

## 二、进阶题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 观察者模式中观察者和目标直接通信；发布订阅模式通过事件中心解耦，发布者和订阅者不直接依赖。

---

### FB-09-CO-A-005：什么时候应该使用策略模式？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：09 设计模式
**标签**：发布订阅、组合、策略模式、单例模式、工厂模式
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么时候应该使用策略模式。

**参考答案**：

当存在多种可互相替换的算法或行为，且需要根据运行时条件选择时。例如表单校验、主题切换、支付方式。


**补充说明**：

在实际落地 什么时候应该使用策略模式 时，建议结合 发布订阅、组合、策略模式 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 适用场景（50%）
- 代码结构（30%）
- 好处（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 当存在多种可互相替换的算法或行为，且需要根据运行时条件选择时。 例如表单校验、主题切换、支付方式。

---

### FB-09-CO-A-006：如何理解"组合优于继承"？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：09 设计模式
**标签**：发布订阅、组合、策略模式、单例模式、工厂模式
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何理解"组合优于继承"。

**参考答案**：

继承是白盒复用，耦合度高；组合通过接口/委托复用，更灵活。React/Vue 都推荐组合。


**补充说明**：

在实际落地 理解"组合优于继承" 时，建议结合 发布订阅、组合、策略模式 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 解释差异（40%）
- 优缺点对比（40%）
- 前端示例（20%）

---

## 三、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 继承是白盒复用，耦合度高；组合通过接口/委托复用，更灵活。 React/Vue 都推荐组合。







