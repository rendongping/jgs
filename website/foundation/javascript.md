# JavaScript 语言基础学习文档

> 目标：把 JavaScript 核心机制从“能跑就行”升级到“知其所以然”。

---

## 核心要点（TL;DR）

- JavaScript 是动态类型语言，原始类型与引用类型在赋值、比较和拷贝时的行为差异决定了大量日常 Bug 的底层逻辑。
- 作用域链、闭包、`this` 绑定规则与原型链是理解 JS 执行模型的四大核心支柱。
- 事件循环通过调用栈、宏任务与微任务协作实现单线程异步，`async/await` 本质是 Promise + 微任务。
- 类型转换与 `==` 规则是面试与 Bug 高发区，生产环境应优先使用 `===` 并显式转换。
- V8 通过隐藏类、内联缓存与 TurboFan 优化热点代码，保持稳定的对象结构并避免类型突变可提升运行时性能。

## 学习时长与前置知识

- **建议学习时长**：4-6 周（每周投入 6-8 小时）
- **前置知识**：HTML/CSS 基础、编程基础

## 一、数据类型：别把“箱子”和“标签”搞混

JavaScript 是**动态类型**语言，变量本身没有类型，值才有类型。可以把变量理解为贴在箱子上的便签，便签随时可以撕下来贴到另一个箱子上。

### 1.1 七种原始类型与一种引用类型

原始类型（Primitive）：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`、`bigint`。
引用类型（Reference）：`object`（包括 Object、Array、Function、Date、RegExp 等）。

**核心区别：赋值时拷贝的是什么？**

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10，原始类型拷贝的是值

let obj1 = { name: "Alice" };
let obj2 = obj1;
obj2.name = "Bob";
console.log(obj1.name); // Bob，引用类型拷贝的是指针
```

比喻：原始类型像复印身份证，你改复印件不影响原件；引用类型像共享网盘链接，改链接指向的文件，所有人看到的都变了。

### 1.2 `typeof` 的坑

```js
typeof null;        // "object"，历史 bug，为了兼容一直没修
typeof [];          // "object"
typeof function(){} // "function"（实际 function 是 object 的子类型）
```

判断数组用 `Array.isArray()`，判断 null 用 `value === null`。

### 1.3 `null` vs `undefined`

- `undefined`：系统表示“这里还没有值”（变量声明未赋值、函数没 return、对象没有某个属性）。
- `null`：程序员主动表示“这里应该是空值”。

## 二、类型转换：隐式转换是蜜糖也是砒霜

### 2.1 显式转换与隐式转换

```js
Number("123");   // 123
String(123);     // "123"
Boolean(0);      // false

// 隐式转换（容易踩坑）
"5" - 3;         // 2，字符串被转成数字
"5" + 3;         // "53"，数字被转成字符串
[] + [];         // ""
[] + {};         // "[object Object]"
```

### 2.2 抽象相等 `==` 的转换规则

`==` 会做类型转换，`===` 不会。规则可记为：

1. 类型相同，按 `===` 比较。
2. null 与 undefined 互相相等，但与其他值都不等。
3. 数字与字符串比较，字符串转数字。
4. 布尔值与其他类型比较，布尔值转数字。
5. 对象与原始值比较，对象先调用 `ToPrimitive`。

```js
[] == ![];       // true
// 解析：![] 是 false；[] == false；[] 转数字是 0；false 转数字是 0；0 == 0
```

**最佳实践：几乎永远使用 `===` 和 `!==`，除非你有明确的理由需要 `==`。**

### 2.3 对象转原始值：ToPrimitive

对象转原始值时，优先调用 `Symbol.toPrimitive`，其次 `valueOf`，再其次 `toString`。

```js
let obj = {
  [Symbol.toPrimitive](hint) {
    return hint === "number" ? 42 : "hello";
  }
};
console.log(obj + 1);  // "hello1"
console.log(obj - 1);  // 41
```

## 三、作用域与闭包：变量的“势力范围”

### 3.1 作用域链

JavaScript 采用**词法作用域**（静态作用域），函数定义时作用域就确定了，而不是调用时。

```js
let a = 1;
function outer() {
  let b = 2;
  function inner() {
    console.log(a, b);
  }
  inner();
}
outer(); // 1 2
```

### 3.2 变量提升与 TDZ（暂时性死区）

```js
console.log(x); // undefined（var 提升）
var x = 10;

console.log(y); // ReferenceError（let 在 TDZ 中）
let y = 20;
```

`var` 会提升声明并初始化为 `undefined`；`let`/`const` 会提升但处于 TDZ，访问会报错。

### 3.3 闭包：函数记住它的出生地

**闭包 = 函数 + 函数能访问到的外部变量集合。**

```js
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

`createCounter` 执行完后，局部变量 `count` 本来应该被销毁，但返回的函数仍然引用它，所以 JavaScript 引擎保留了这个变量。

**闭包的应用**：模块化、函数柯里化、防抖节流、数据私有化。

**闭包的代价**：变量长期驻留内存，使用不当可能造成内存泄漏。

## 四、this：调用方式决定“谁”

`this` 是 JavaScript 最令人头疼的概念之一。核心原则：**this 在函数被调用时确定，而不是定义时。**

### 4.1 四种绑定规则

1. **默认绑定**：普通函数调用，`this` 指向全局对象（严格模式为 `undefined`）。
2. **隐式绑定**：通过对象调用，`this` 指向该对象。
3. **显式绑定**：`call`、`apply`、`bind`。
4. **`new` 绑定**：`this` 指向新创建的实例。

```js
function foo() { console.log(this.a); }
const obj = { a: 2, foo };

foo();       // 默认绑定，非严格模式 this -> window
obj.foo();   // 隐式绑定，this -> obj，输出 2
foo.call(obj); // 显式绑定，输出 2
new foo();   // this 指向新对象，a 是 undefined
```

### 4.2 箭头函数：没有自己的 this

箭头函数的 `this` 继承自外层作用域，且不可被 `call`/`apply`/`bind` 改变。

```js
const obj = {
  name: "Alice",
  say: () => {
    console.log(this.name); // this 指向定义时外层作用域
  }
};
obj.say(); // 非严格模式下可能是 window.name
```

**最佳实践**：
- 需要动态 this（如事件处理、对象方法）用普通函数。
- 需要固定 this（如回调、定时器内访问外层 this）用箭头函数。

## 五、原型链与继承：对象的“族谱”

### 5.1 原型与原型链

每个对象都有一个内部属性 `[[Prototype]]`，可通过 `__proto__` 访问（现代代码中建议用 `Object.getPrototypeOf()`）。

```js
const animal = { eats: true };
const rabbit = { jumps: true };
Object.setPrototypeOf(rabbit, animal);
console.log(rabbit.eats); // true，沿原型链找到 animal
```

**原型链**：对象查找属性时，先找自身，找不到沿 `__proto__` 向上找，直到 `null`。

### 5.2 构造函数、prototype、constructor

```js
function Dog(name) { this.name = name; }
Dog.prototype.bark = function() { console.log("汪"); };
const dog = new Dog("旺财");

dog.__proto__ === Dog.prototype;       // true
Dog.prototype.constructor === Dog;     // true
```

### 5.3 class 语法糖

ES6 的 `class` 只是构造函数的语法糖，底层仍然是原型链。

```js
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(`${this.name} 发出声音`); }
}
class Dog extends Animal {
  speak() { console.log(`${this.name} 汪汪`); }
}
const d = new Dog("旺财");
d.speak(); // 旺财 汪汪
```

**继承的本质**：子类的 `prototype` 的原型指向父类的 `prototype`。

### 5.4 常见误区

- `__proto__` 是浏览器实现的访问器，不是标准属性，生产环境建议用 `Object.getPrototypeOf()` / `Object.setPrototypeOf()`。
- 修改已有内置类型的 `prototype`（如 `Array.prototype.xxx`）是危险行为，可能污染全局。

## 六、事件循环：异步的“调度中心”

JavaScript 是**单线程**语言，意味着同一时刻只能做一件事。为了解决阻塞问题，浏览器/Node.js 引入了事件循环（Event Loop）。

### 6.1 调用栈、堆、任务队列

- **调用栈（Call Stack）**：记录函数执行位置，后进先出。
- **堆（Heap）**：存放对象。
- **任务队列（Task Queue）**：存放待执行的异步回调。

### 6.2 宏任务与微任务

- **宏任务（Macrotask）**：`setTimeout`、`setInterval`、I/O、UI 渲染、`<script>` 整体执行。
- **微任务（Microtask）**：`Promise.then`/`catch`/`finally`、`MutationObserver`、`queueMicrotask`。

**执行顺序**：当前宏任务执行完 → 清空所有微任务 → 执行下一个宏任务 → 可能渲染 → 循环。

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 输出：1 4 3 2
```

### 6.3 async/await 的微任务行为

`await` 后面的代码会被放入微任务队列。

```js
async function foo() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
foo();
console.log("C");
// 输出：A C B
```

## 七、异步编程：从回调地狱到优雅代码

### 7.1 Promise

Promise 表示一个异步操作的最终完成（或失败）及其结果值。

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("ok"), 1000);
});
p.then(res => console.log(res));
```

**Promise 链**：每个 `.then` 返回新的 Promise，支持链式调用。`catch` 能捕获链上任意位置的 reject。

**常见误区**：
- `.then` 里不 return，下一个 `.then` 收到 `undefined`。
- `Promise.all` 中一个失败就整体失败；想忽略单个失败用 `Promise.allSettled`。

### 7.2 async/await

`async` 函数返回 Promise；`await` 会暂停 async 函数执行，等待 Promise 完成。

```js
async function fetchData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

**最佳实践**：
- 用 `try/catch` 处理 await 的错误。
- 多个无依赖的异步请求用 `Promise.all` 并行，不要用 await 串行。

### 7.3 Generator

Generator 函数可以暂停和恢复执行，配合 `yield` 使用。

```js
function* gen() {
  yield 1;
  yield 2;
  return 3;
}
const g = gen();
console.log(g.next()); // { value: 1, done: false }
```

Generator 是实现协程的基础，`redux-saga` 等库利用它处理复杂异步流程。现代开发中，async/await 更常用。

## 八、ES6+ 新特性：现代 JavaScript 的瑞士军刀

### 8.1 解构赋值

```js
const { a, b = 10 } = { a: 1 };
const [first, ...rest] = [1, 2, 3, 4];
```

### 8.2 模板字符串与标签模板

```js
const name = "World";
console.log(`Hello, ${name}!`);

function tag(strings, ...values) {
  console.log(strings, values);
}
tag`price: ${100}`;
```

### 8.3 模块化

```js
// math.js
export const add = (a, b) => a + b;
export default function() {}

// main.js
import add, { add as addFn } from "./math.js";
```

ES Module 是静态的，编译时就能确定依赖关系，支持 Tree Shaking。CommonJS 是动态的，运行时才能确定。

### 8.4 其他重要特性

- `Map` / `Set` / `WeakMap` / `WeakSet`：Weak 系列不会阻止垃圾回收，适合缓存。
- `Proxy`：拦截对象的基本操作，实现响应式系统（Vue3 核心）。
- `Reflect`：提供对象操作的统一 API，常与 Proxy 配合使用。
- `Optional Chaining` (`?.`) 和 `Nullish Coalescing` (`??`)：安全访问与默认值。

```js
const user = { profile: { name: "Tom" } };
console.log(user.profile?.name);        // Tom
console.log(user.settings?.theme);      // undefined
console.log(null ?? "default");         // default
console.log(0 ?? "default");            // 0（与 || 不同）
```

## 九、垃圾回收：内存的“清洁工”

### 9.1 可达性分析

JavaScript 垃圾回收基于**可达性**：从根对象（全局对象、调用栈中的变量）出发，能访问到的对象就是“存活”的，访问不到的就是垃圾。

### 9.2 引用计数与循环引用

旧 IE 的 BOM/DOM 使用引用计数，容易出现循环引用导致内存泄漏。现代 V8 使用标记-清除（Mark-Sweep）和分代回收。

### 9.3 常见内存泄漏

1. 全局变量意外创建。
2. 闭包中持有大量数据。
3. 定时器/事件监听未清除。
4. DOM 引用未释放。
5. `console.log` 的对象被 DevTools 持有引用。

## 十、V8 引擎基础：代码如何变快

### 10.1 编译执行流程

V8 执行 JavaScript 大致经历：
1. **词法分析 / 语法分析**：生成 AST。
2. **Ignition 解释器**：将 AST 编译为字节码并执行。
3. **TurboFan 编译器**：对热点代码编译为机器码，优化执行。

### 10.2 隐藏类与内联缓存

V8 会给相同结构的对象创建“隐藏类”（Hidden Class），属性访问通过偏移量快速定位。如果对象结构频繁变化（动态增删属性），会退化到字典模式，性能下降。

```js
// 不推荐：动态增删属性
function Point(x, y) { this.x = x; }
const p1 = new Point(1, 2);
p1.y = 3; // 破坏隐藏类

// 推荐：在构造函数中初始化所有属性
function Point(x, y) { this.x = x; this.y = y; }
```

### 10.3 优化与反优化

TurboFan 基于假设做优化。如果运行时假设被打破（如函数参数类型变化），会做反优化（deoptimization），回退到解释执行。

```js
function add(x, y) { return x + y; }
add(1, 2);   // 优化为数字加法
add("a", "b"); // 类型变化，触发反优化
```

## 十一、Promise/A+ 规范：手写一个可靠的 Promise

> 生活化比喻：Promise 像一家餐厅的等位系统。你拿到一张等位单（pending），等有位置时服务员叫你（resolve），或者告诉你今晚没位置了（reject）。你不需要一直站在门口等，可以去做别的事。

### 11.1 为什么要手写 Promise？

日常开发中我们直接使用原生 `Promise`，但手写一个符合 Promise/A+ 规范的实现，能帮助我们理解：

- 为什么 `Promise` 构造函数中的代码是同步执行的？
- 为什么 `.then` 里的回调是异步的？
- 为什么 `then` 可以链式调用？
- 为什么 Promise 的状态一旦改变就不可再变？

### 11.2 Promise/A+ 核心规则

1. Promise 有三种状态：`pending`、`fulfilled`、`rejected`，状态只能从 `pending` 变为 `fulfilled` 或 `rejected`，且不可再次改变。
2. `then` 方法接收两个可选参数 `onFulfilled` 和 `onRejected`，它们必须在当前执行栈清空后以异步方式执行（即微任务）。
3. `then` 必须返回一个新的 Promise，支持链式调用。
4. 如果 `onFulfilled`/`onRejected` 返回一个值，新 Promise 以该值 resolve；如果抛出异常，新 Promise 以该异常 reject；如果返回一个 Promise，则等待其状态决定新 Promise 的状态。

### 11.3 最简符合规范的实现

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected = typeof onRejected === "function" ? onRejected : (e) => { throw e; };

    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      if (this.state === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.state === REJECTED) {
        rejectedMicrotask();
      } else {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle detected for promise"));
    return;
  }
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    let called = false;
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
}
```

**关键点解析**：

- `queueMicrotask` 保证 `then` 回调异步执行（真实 Promise 使用更底层的微任务队列）。
- `resolvePromise` 处理 thenable（鸭子类型），支持返回 Promise 的链式等待。
- 防止循环引用：如果 `promise2 === x` 则报 TypeError。
- `called` 标志防止同一个 thenable 被 resolve 又 reject。

### 11.4 常见面试陷阱

```js
const p = new MyPromise((resolve) => {
  console.log("1");
  resolve("2");
});
p.then((v) => console.log(v));
console.log("3");
// 输出：1 3 2
```

构造函数同步执行，但 `then` 回调必须等同步代码执行完后再执行。

---

## 十二、Iterator / Iterable 协议与 `for…of` 底层

### 12.1 什么是可迭代协议（Iterable Protocol）？

一个对象要成为“可迭代对象”，必须实现 `Symbol.iterator` 方法，该方法返回一个“迭代器”（Iterator）。迭代器必须有一个 `next()` 方法，返回 `{ value, done }` 对象。

可以把迭代器理解为书签：翻开一本书，书签告诉你当前页（value）和是否读完了（done）。

### 12.2 手写一个可迭代对象

```js
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { value: this.current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const num of range) {
  console.log(num); // 1 2 3 4 5
}
```

### 12.3 哪些内置对象是可迭代的？

- `Array`、`String`、`Map`、`Set`、`TypedArray`、函数的 `arguments`、NodeList 等。
- `Object` 默认不可迭代，因为对象的键没有明确的顺序语义。

### 12.4 `for…of` 的底层行为

```js
for (const item of iterable) {
  // body
}
```

大致等价于：

```js
const iterator = iterable[Symbol.iterator]();
let result = iterator.next();
while (!result.done) {
  const item = result.value;
  // body
  result = iterator.next();
}
```

### 12.5 生成器函数与迭代器的关系

生成器函数 `function*` 会返回一个 Generator 对象，它同时是迭代器也是可迭代对象，因此可以直接用于 `for…of`。

```js
function* idMaker() {
  let id = 0;
  while (true) yield id++;
}

const gen = idMaker();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
```

生成器让异步流程控制、无限序列、懒加载等场景变得非常自然。Redux-Saga、co 等库都基于生成器实现。

### 12.6 迭代器协议 vs 可迭代协议

| 协议 | 要求 | 示例 |
|------|------|------|
| 可迭代协议（Iterable） | 对象有 `Symbol.iterator` 方法 | `Array`、`Map`、`自定义 range` |
| 迭代器协议（Iterator） | 对象有 `next()` 方法，返回 `{ value, done }` | `[1,2,3][Symbol.iterator]()` |

---

## 十三、Error Cause 与错误处理体系

### 13.1 为什么需要 Error Cause？

在复杂应用中，错误往往一环套一环。比如用户下单失败，底层可能是因为网络超时、库存服务返回 500、支付网关拒绝等。如果每一层都只抛出当前层的错误，原始错误信息会被“吞掉”，排查非常困难。

ES2022 引入了 `Error Cause`，允许在创建错误时通过 `cause` 选项保留原始错误：

```js
try {
  fetchUser();
} catch (err) {
  throw new Error("获取订单详情失败", { cause: err });
}
```

这样上层捕获后可以通过 `error.cause` 追溯到真正的根因。

### 13.2 构建分层错误处理体系

生活化比喻：错误处理像医院的分诊台。小感冒自己吃药（业务内处理），发烧看门诊（抛给上层组件），急症直接送 ICU（全局错误边界 + 监控上报）。

一个健康的错误处理体系通常分三层：

1. **业务层**：对可预期错误做友好提示和降级。
2. **框架层**：用错误边界（React Error Boundary）或 Vue 的 `errorHandler` 捕获渲染期错误，防止整个应用白屏。
3. **全局层**：`window.onerror` / `window.addEventListener('unhandledrejection')` 捕获未处理错误并上报到 Sentry 等监控系统。

### 13.3 实战示例：统一错误处理

```js
class BizError extends Error {
  constructor(message, { code, cause } = {}) {
    super(message, { cause });
    this.name = "BizError";
    this.code = code;
  }
}

async function fetchOrder(orderId) {
  try {
    const res = await fetch(`/api/orders/${orderId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (cause) {
    throw new BizError("订单查询失败，请稍后重试", { code: "ORDER_FETCH_ERROR", cause });
  }
}

fetchOrder(123).catch((err) => {
  console.error(err.message);      // 订单查询失败，请稍后重试
  console.error(err.cause.message); // HTTP 500
  reportToSentry(err);
});
```

### 13.4 错误处理最佳实践

| 实践 | 说明 |
|------|------|
| 保留 Error Cause | 不吞掉原始错误，便于链路追踪 |
| 自定义错误类 | 按业务域划分错误类型，携带 code、level 等元信息 |
| 异步错误统一处理 | 使用 `try/catch` 或 `.catch`，避免未处理的 Promise 拒绝 |
| 用户提示与日志分离 | 给用户看友好文案，给开发看详细堆栈 |
| 关键路径兜底 | 对支付、下单等关键操作提供重试和回滚能力 |

---

## 总结

JavaScript 看似简单，实则底蕴深厚。掌握数据类型、类型转换、作用域闭包、this、原型链、事件循环、异步编程和 ES6+ 特性，是成为高级前端工程师的必经之路。深入理解 Promise/A+ 规范、迭代器协议和错误处理体系，能让我们在写异步代码、处理复杂数据流和定位线上问题时更加游刃有余。建议学习时多画图、多写示例、多在浏览器控制台验证，把抽象概念变成可触摸的代码行为。

---

**延伸阅读**：
- ECMAScript 规范（tc39.es/ecma262/）
- Promise/A+ 规范（promisesaplus.com）
- 《你不知道的 JavaScript》
- V8 博客（v8.dev/blog）

---

> **领域编号**：F01 JavaScript 语言基础  
> **最后更新**：2026-06-24


---

## 本领域学习进度

<MarkComplete domainId="javascript" />
<ProgressTracker />
