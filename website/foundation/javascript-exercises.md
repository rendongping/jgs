# JavaScript 练习册

> 每道题后附答案与解析，建议先独立完成再对照。

---

## 一、选择题

### 第 1 题

以下代码输出什么？

```js
console.log(typeof null);
console.log(typeof []);
console.log(typeof NaN);
```

A. `"null"` `"array"` `"number"`  
B. `"object"` `"object"` `"number"`  
C. `"object"` `"array"` `"NaN"`  
D. `"null"` `"object"` `"number"`

**答案：B**

**解析**：`typeof null` 是历史 bug，返回 `"object"`；`typeof []` 返回 `"object"`，判断数组应使用 `Array.isArray()`；`NaN` 是 `number` 类型中的特殊值。

---

### 第 2 题

下面代码的输出是？

```js
console.log(1 + "2" + "2");
console.log(1 + +"2" + "2");
console.log("A" - "B" + "2");
console.log("A" - "B" + 2);
```

A. `"122"` `"32"` `"NaN2"` `"NaN2"`  
B. `"122"` `"32"` `"NaN2"` `"NaN"`  
C. `"14"` `"32"` `"NaN2"` `"NaN"`  
D. `"122"` `"14"` `"NaN"` `"NaN2"`

**答案：B**

**解析**：
- `1 + "2"` 得 `"12"`，再 `"12" + "2"` 得 `"122"`。
- `+"2"`  unary plus 把 `"2"` 转数字 2，所以 `1 + 2 + "2"` 得 `"32"`。
- `"A" - "B"` 得 `NaN`，`NaN + "2"` 得 `"NaN2"`。
- `NaN + 2` 得 `NaN`。

---

### 第 3 题

以下哪个表达式的结果是 `true`？

```js
A. [] == []
B. [] == ![]
C. {} == {}
D. undefined == null
```

**答案：B、D**

**解析**：
- A 和 C：引用类型比较的是地址，两个空数组/对象地址不同，所以为 false。
- B：`![]` 是 false，`[]` 转数字为 0，`false` 转数字为 0，所以相等。
- D：`undefined` 与 `null` 在 `==` 时互相相等，这是 ECMAScript 规定。

---

### 第 4 题

关于 `this`，下面代码输出是？

```js
const obj = {
  name: "Alice",
  say() {
    setTimeout(function() {
      console.log(this.name);
    }, 0);
  }
};
obj.say();
```

A. Alice  
B. undefined（严格模式）或全局对象的 name  
C. 报错  
D. null

**答案：B**

**解析**：`setTimeout` 的回调是普通函数，独立调用时 this 指向全局对象（非严格模式）或 undefined（严格模式）。如想访问 obj.name，应使用箭头函数或在 setTimeout 外缓存 this。

---

### 第 5 题

事件循环中，下列输出顺序是？

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
Promise.resolve().then(() => setTimeout(() => console.log("4"), 0));
console.log("5");
```

A. `1 5 3 2 4`  
B. `1 5 2 3 4`  
C. `1 5 3 4 2`  
D. `1 5 2 4 3`

**答案：A**

**解析**：
1. 同步代码输出 `1 5`。
2. 微任务队列清空，输出 `3`，并把 `setTimeout(...4)` 放入宏任务队列。
3. 执行第一个宏任务，输出 `2`。
4. 执行第二个宏任务，输出 `4`。

---

## 二、填空题

### 第 6 题

```js
function foo() {
  console.log(a);
  var a = 1;
}
foo(); // 输出 ______
```

**答案：`undefined`**

**解析**：`var` 声明会提升到函数作用域顶部，但赋值留在原地，所以输出 undefined。

---

### 第 7 题

```js
function outer() {
  let x = 10;
  return function inner() {
    return ++x;
  };
}
const f1 = outer();
const f2 = outer();
console.log(f1()); // ______
console.log(f1()); // ______
console.log(f2()); // ______
```

**答案：`11`、`12`、`11`**

**解析**：每次调用 `outer` 都会创建新的作用域和新的 `x`。`f1` 和 `f2` 各自维护独立的闭包变量。

---

### 第 8 题

```js
const obj = { a: 1 };
const copy = Object.assign({}, obj);
copy.a = 2;
console.log(obj.a); // ______
```

**答案：`1`**

**解析**：`Object.assign` 是浅拷贝，`a` 是原始类型，拷贝的是值，修改 copy 不影响 obj。

---

### 第 9 题

```js
const p = new Promise((resolve) => {
  console.log("A");
  resolve("B");
  console.log("C");
});
p.then(console.log);
console.log("D");
```

输出顺序为 ______

**答案：`A C D B`**

**解析**：Promise 构造函数中的代码是同步执行的，先输出 A、C；then 回调是微任务，等同步代码 D 执行完后再执行，输出 B。

---

### 第 10 题

```js
class Animal {
  constructor(name) { this.name = name; }
}
class Dog extends Animal {
  constructor(name, breed) {
    ______;
    this.breed = breed;
  }
}
```

横线处应填入 ______

**答案：`super(name)`**

**解析**：派生类构造函数中必须先调用 `super()` 才能使用 `this`，否则报错。

---

## 三、代码分析题

### 第 11 题

分析以下代码，写出输出并解释原因。

```js
var x = 10;
function foo() {
  console.log(x);
  var x = 20;
  console.log(x);
}
foo();
```

**答案**：

```
undefined
20
```

**解析**：函数内部的 `var x = 20` 会提升声明到函数顶部，相当于：

```js
function foo() {
  var x;
  console.log(x); // undefined
  x = 20;
  console.log(x); // 20
}
```

函数作用域内的 `x` 遮蔽了全局的 `x`。

---

### 第 12 题

分析以下代码，写出输出。

```js
const obj = {
  value: 1,
  getValue: () => this.value
};
console.log(obj.getValue());
```

**答案**：非严格模式下可能输出全局 `value` 或 `undefined`；严格模式下 `undefined`。

**解析**：箭头函数没有自己的 this，`getValue` 定义时外层作用域是全局作用域，所以 `this` 指向全局对象（或 undefined），不会指向 obj。应改为普通函数。

---

### 第 13 题

分析以下代码，写出输出。

```js
const promise = new Promise((resolve, reject) => {
  reject("error");
});
promise
  .then(() => console.log("then 1"))
  .catch(() => console.log("catch 1"))
  .then(() => console.log("then 2"))
  .catch(() => console.log("catch 2"));
```

**答案**：

```
catch 1
then 2
```

**解析**：第一个 `then` 返回 rejected 的 Promise，被 `catch` 捕获并返回 fulfilled 的 Promise，因此后续 `then` 会执行；第二个 `catch` 不会执行。

---

### 第 14 题

分析原型链，判断以下表达式的结果。

```js
function Foo() {}
Foo.prototype.bar = 1;
const f = new Foo();
Foo.prototype.bar = 2;
console.log(f.bar);

Foo.prototype = { bar: 3 };
console.log(f.bar);
const f2 = new Foo();
console.log(f2.bar);
```

**答案**：

```
2
2
3
```

**解析**：
- `f` 创建时 `__proto__` 指向原 `Foo.prototype`，后来该对象上的 `bar` 被改为 2，所以 f.bar 是 2。
- `Foo.prototype` 被重新赋值为新对象，不影响已有实例 `f` 的原型链。
- `f2` 指向新的 `Foo.prototype`，所以 f2.bar 是 3。

---

## 四、编程实践题

### 第 15 题

实现一个 `debounce`（防抖）函数。

**参考答案**：

```js
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

**解析**：
- 每次触发时清除上一次的定时器，重新计时。
- 使用 `fn.apply(this, args)` 保留原函数的 this 和参数。
- 应用场景：搜索框输入、窗口 resize、按钮重复点击。

---

### 第 16 题

实现一个 `throttle`（节流）函数，支持首次/末次执行选项。

**参考答案**：

```js
function throttle(fn, wait, options = {}) {
  let lastTime = 0;
  let timer = null;
  const { leading = true, trailing = true } = options;

  return function(...args) {
    const now = Date.now();
    if (!lastTime && !leading) lastTime = now;

    const remaining = wait - (now - lastTime);
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args);
      lastTime = now;
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}
```

**解析**：
- 节流的核心是控制函数执行频率，在 wait 时间内最多执行一次。
- `leading` 控制是否立即执行，`trailing` 控制是否执行最后一次。

---

### 第 17 题

实现 `Promise.all`。

**参考答案**：

```js
function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(iterable);
    const result = new Array(arr.length);
    let count = 0;

    if (arr.length === 0) return resolve(result);

    arr.forEach((item, index) => {
      Promise.resolve(item).then(
        value => {
          result[index] = value;
          count++;
          if (count === arr.length) resolve(result);
        },
        reason => reject(reason)
      );
    });
  });
}
```

**解析**：
- 返回新 Promise。
- 所有 Promise 都 resolve 才 resolve，顺序与输入一致。
- 任意一个 reject 就 reject。

---

### 第 18 题

实现 `deepClone`（深拷贝），处理循环引用。

**参考答案**：

```js
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map) return new Map(Array.from(obj, ([k, v]) => [deepClone(k, map), deepClone(v, map)]));
  if (obj instanceof Set) return new Set(Array.from(obj, v => deepClone(v, map)));

  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], map);
  }
  return clone;
}
```

**解析**：
- 使用 WeakMap 记录已拷贝的对象，解决循环引用。
- 特殊处理 Date、RegExp、Map、Set。
- 只遍历自身可枚举属性，不处理 Symbol 属性等更复杂场景（可扩展）。

---

### 第 19 题

实现一个事件发布订阅器（EventEmitter）。

**参考答案**：

```js
class EventEmitter {
  constructor() { this.events = {}; }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(l => l(...args));
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}
```

**解析**：
- `on` 订阅，`off` 取消，`emit` 触发，`once` 只执行一次。
- 事件名对应一个监听器数组。

---

### 第 20 题

实现 `new` 操作符。

**参考答案**：

```js
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return (result !== null && (typeof result === "object" || typeof result === "function")) ? result : obj;
}
```

**解析**：
1. 创建空对象，其原型指向构造函数的 prototype。
2. 以该对象为 this 执行构造函数。
3. 若构造函数返回对象/函数，则返回该结果；否则返回新对象。

---

### 第 21 题

补全下面的 `MyPromise` 实现，使其支持 `Promise.resolve().then(() => ...)` 的链式调用。

```js
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
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
    // 请补全：返回新的 MyPromise，并异步执行 onFulfilled/onRejected
  }
}
```

**参考答案**：

```js
then(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
  onRejected = typeof onRejected === "function" ? onRejected : (e) => { throw e; };

  return new MyPromise((resolve, reject) => {
    const handle = (callback, value) => {
      queueMicrotask(() => {
        try {
          const x = callback(value);
          resolve(x);
        } catch (err) {
          reject(err);
        }
      });
    };

    if (this.state === "fulfilled") {
      handle(onFulfilled, this.value);
    } else if (this.state === "rejected") {
      handle(onRejected, this.reason);
    } else {
      this.onFulfilledCallbacks.push(() => handle(onFulfilled, this.value));
      this.onRejectedCallbacks.push(() => handle(onRejected, this.reason));
    }
  });
}
```

**解析**：
- `then` 必须返回新的 Promise。
- 使用 `queueMicrotask` 保证回调异步执行。
- 对回调返回值 `x` 直接 resolve（简化版未处理 thenable，面试中可进一步展开）。

---

### 第 22 题

下面的对象如何实现 `for…of` 遍历？写出 `[Symbol.iterator]` 的完整实现，使其支持 `for (const n of range(1, 3))` 输出 1、2、3。

**参考答案**：

```js
function range(from, to) {
  return {
    [Symbol.iterator]() {
      let current = from;
      return {
        next() {
          if (current <= to) {
            return { value: current++, done: false };
          }
          return { done: true };
        }
      };
    }
  };
}

for (const n of range(1, 3)) {
  console.log(n); // 1 2 3
}
```

**解析**：
- 可迭代协议要求对象实现 `Symbol.iterator` 方法。
- 迭代器对象必须有 `next()` 方法，返回 `{ value, done }`。
- 函数返回的对象同时拥有闭包变量 `current` 和 `to`，实现范围遍历。

---

## 练习建议

1. 每道题在浏览器控制台或 Node.js 中实际运行一遍。
2. 对事件循环类题目，尝试画出调用栈、微任务队列、宏任务队列的变化。
3. 手写实现题不要死记，理解原理后能根据需求调整（如防抖增加 cancel 方法）。

---

> **领域编号**：F01 JavaScript  
> **最后更新**：2026-06-24
