# JavaScript 面试题

> 本题库共收录 **99** 道面试题（基础 33 / 进阶 37 / 深入 24 / 架构 5）。
> 本文件收录 JavaScript 相关面试题，目标题量 300 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（26 道）{#basic}

### FB-01-CO-B-001：JavaScript 有哪些数据类型？如何区分原始类型和引用类型？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：数据类型、原始类型、引用类型
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说出 JavaScript 中的数据类型，并解释原始类型和引用类型的区别。

**参考答案**：

JavaScript 有 8 种数据类型：

- 原始类型（Primitive）：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`、`bigint`
- 引用类型（Reference）：`object`（包括 Object、Array、Function、Date、RegExp 等）

区别：

- 原始类型存储的是值本身，赋值时拷贝值。
- 引用类型存储的是指向堆内存的引用，赋值时拷贝引用，多个变量可能指向同一块内存。

```js
let a = 1;
let b = a;
b = 2;
console.log(a); // 1

let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 2;
console.log(obj1.x); // 2
```

**评分维度**：
- 完整列出 8 种类型（40%）
- 解释赋值/拷贝差异（40%）
- 能举例说明（20%）

**常见错误**：
- 把 `null` 说成对象类型（历史遗留 bug，但 typeof null === 'object'）
- 忽略 `bigint` 和 `symbol`

**延伸追问**：
- `typeof null` 为什么返回 `'object'`？这是 bug 吗？
- `Object.prototype.toString.call()` 和 `typeof` 有什么区别？

**相关题目**：
- [FB-01-CA-B-001 `==` 和 `===` 的区别](#FB-01-CA-B-001)

**参考资源**：
- [MDN - Data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

**口头回答版**：
> JavaScript 有 8 种数据类型： - 原始类型（Primitive）：string、number、boolean、null、undefined、symbol、bigint - 引用类型（Reference）：object（包括 Object、Array、Function、Date、RegExp 等） - 原始类型存储的是值本身，赋值时拷贝值。

---

### FB-01-CA-B-001：`==` 和 `===` 的区别？什么情况下推荐使用 `==`？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：相等比较、类型转换、严格相等
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `==` 和 `===` 的区别，并说明是否推荐使用 `==`。

**参考答案**：

- `===` 是严格相等，要求类型和值都相同，不会做类型转换。
- `==` 是抽象相等，会做类型转换后再比较。

推荐始终使用 `===` / `!==`，避免隐式转换带来的意外结果，例如：

```js
[] == ![] // true
'' == false // true
null == undefined // true
```

极少数场景可用 `==`，例如判断 `null` 或 `undefined`：

```js
x == null // 等价于 x === null || x === undefined
```

**评分维度**：
- 说清类型转换差异（40%）
- 举例说明隐式转换坑点（30%）
- 提到 `== null` 的合理使用场景（30%）

**常见错误**：
- 认为 `==` 永远不能用
- 说不出 `null == undefined` 为 true 的场景

**延伸追问**：
- `[] == ![]` 为什么为 true？请一步步分析。
- `NaN === NaN` 为什么是 false？如何判断 NaN？

**参考资源**：
- [MDN - Equality comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

**口头回答版**：
> - === 是严格相等，要求类型和值都相同，不会做类型转换。 - == 是抽象相等，会做类型转换后再比较。 推荐始终使用 === / !==，避免隐式转换带来的意外结果，例如： 极少数场景可用 ==，例如判断 null 或 undefined：

---

### FB-01-CO-B-002：什么是变量提升？`let`、`const`、`var` 的区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：变量提升、作用域、TDZ、var、let、const
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释变量提升，并比较 `var`、`let`、`const` 的区别。

**参考答案**：

变量提升：变量和函数声明在编译阶段被移动到作用域顶部，但赋值留在原地。

- `var`：函数作用域，存在提升，可重复声明，可重新赋值。
- `let`：块级作用域，存在提升但处于 TDZ（暂时性死区），访问会报 ReferenceError；不可重复声明，可重新赋值。
- `const`：块级作用域，存在提升但处于 TDZ；不可重复声明，声明时必须初始化，且不能重新绑定（但对象属性可变）。

```js
console.log(a); // undefined
var a = 1;

console.log(b); // ReferenceError
let b = 2;
```

**评分维度**：
- 解释变量提升概念（25%）
- 区分作用域、TDZ、重复声明、可变性（50%）
- 能写出 TDZ 示例（25%）

**常见错误**：
- 认为 `let` / `const` 没有提升
- 认为 `const` 声明的对象完全不可变

**延伸追问**：
- 函数声明和函数表达式在提升上有什么区别？
- `const obj = {}; obj.a = 1;` 可以吗？为什么？

**参考资源**：
- [MDN - let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

**口头回答版**：
> 变量提升：变量和函数声明在编译阶段被移动到作用域顶部，但赋值留在原地。 - var：函数作用域，存在提升，可重复声明，可重新赋值。 - let：块级作用域，存在提升但处于 TDZ（暂时性死区），访问会报 ReferenceError；不可重复声明，可重新赋值。 - const：块级作用域，存在提升但处于 TDZ；不可重复声明，声明时必须初始化，且不能重新绑定（但对象属性可变）。

---

### FB-01-CO-B-003：解释一下闭包，并举一个实际应用场景。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：闭包、作用域、私有变量
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是闭包？请举例说明一个实际应用场景。

**参考答案**：

闭包：函数能够记住并访问它词法作用域中的变量，即使该函数在当前作用域外执行。

应用场景：

1. 模块模式：隐藏内部变量，暴露接口。
2. 防抖/节流：保存定时器状态。
3. 计数器/缓存：保持私有状态。

```js
function makeCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}

const counter = makeCounter();
counter.increment();
console.log(counter.get()); // 1
```

**评分维度**：
- 定义准确（40%）
- 至少举出一个实际应用（30%）
- 提到内存泄漏风险（30%）

**常见错误**：
- 把闭包简单等同于"函数套函数"
- 忽略闭包导致的内存泄漏风险

**延伸追问**：
- 闭包为什么可能导致内存泄漏？如何避免？
- React 的 useEffect 闭包陷阱是什么？

**参考资源**：
- [MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

**口头回答版**：
> 闭包：函数能够记住并访问它词法作用域中的变量，即使该函数在当前作用域外执行。 模块模式：隐藏内部变量，暴露接口。 防抖/节流：保存定时器状态。 计数器/缓存：保持私有状态。

---

### FB-01-CO-B-004：箭头函数和普通函数的区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：箭头函数、this、arguments、构造函数
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说出箭头函数和普通函数的主要区别。

**参考答案**：

1. **this 绑定**：箭头函数没有自己的 `this`，继承外层作用域的 `this`；普通函数的 `this` 由调用方式决定。
2. **arguments 对象**：箭头函数没有 `arguments` 对象，可用 rest 参数代替。
3. **构造函数**：箭头函数不能作为构造函数，不能用 `new`。
4. **prototype**：箭头函数没有 `prototype` 属性。
5. **简写语法**：箭头函数可省略 `function` 关键字和花括号。

```js
const obj = {
  name: 'Tom',
  sayHi: () => console.log(this.name),
  sayHello() { console.log(this.name); }
};
obj.sayHi();      // undefined（this 指向外层）
obj.sayHello();   // Tom
```

**评分维度**：
- 说出 this 差异（40%）
- 说出 arguments/构造函数/prototype 差异（40%）
- 能举例说明（20%）

**常见错误**：
- 认为箭头函数的 this 完全不能改变
- 在对象方法中误用箭头函数导致 this 错误

**延伸追问**：
- 箭头函数可以用 call / apply / bind 改变 this 吗？
- 在 React class 组件中，为什么需要 bind 方法？

**参考资源**：
- [MDN - Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

**口头回答版**：
> this 绑定：箭头函数没有自己的 this，继承外层作用域的 this；普通函数的 this 由调用方式决定。 arguments 对象：箭头函数没有 arguments 对象，可用 rest 参数代替。 构造函数：箭头函数不能作为构造函数，不能用 new。 prototype：箭头函数没有 prototype 属性。

---

### FB-01-CA-B-002：下面代码的输出是什么？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：变量提升、函数声明、作用域
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```js
console.log(a);
console.log(b);
console.log(foo());

var a = 1;
let b = 2;

function foo() {
  return 'foo';
}

var foo = function() {
  return 'bar';
};
```

请说出每一行 `console.log` 的输出。

**参考答案**：

输出顺序：

```
undefined
ReferenceError: Cannot access 'b' before initialization
foo
```

解释：

1. `var a` 被提升，初始化为 `undefined`，所以第一行输出 `undefined`。
2. `let b` 被提升但处于 TDZ，访问会报 `ReferenceError`，程序在此处抛出错误，后续代码不再执行。
3. 如果程序继续执行，`function foo` 声明被提升，所以 `foo()` 输出 `'foo'`。
4. 后续 `var foo = function() {...}` 会把 `foo` 重新赋值为函数表达式。

**评分维度**：
- 正确分析 `var` 提升（30%）
- 正确分析 `let` TDZ（40%）
- 区分函数声明和函数表达式提升（30%）

**常见错误**：
- 认为 `let` 完全没有提升
- 认为函数表达式也会被提升

**延伸追问**：
- 如果 `var foo = function() {...}` 提升到顶部，会发生什么？
- 在严格模式下，变量提升行为有变化吗？

**口头回答版**：
> var a 被提升，初始化为 undefined，所以第一行输出 undefined。 let b 被提升但处于 TDZ，访问会报 ReferenceError，程序在此处抛出错误，后续代码不再执行。 如果程序继续执行，function foo 声明被提升，所以 foo() 输出 'foo'。 后续 var foo = function() {...} 会把 foo 重新赋值为函数表达式。

---

### FB-01-CO-B-005：解释 `this` 的指向规则。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：this、绑定规则、call、apply、bind
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 JavaScript 中 `this` 的指向规则。

**参考答案**：

`this` 的指向由函数的调用方式决定：

1. **默认绑定**：独立函数调用，`this` 指向全局对象（严格模式为 `undefined`）。
2. **隐式绑定**：作为对象方法调用，`this` 指向调用它的对象。
3. **显式绑定**：通过 `call`、`apply`、`bind` 指定 `this`。
4. **new 绑定**：构造函数中的 `this` 指向新创建的实例。
5. **箭头函数**：没有自己的 `this`，继承外层词法作用域的 `this`。

```js
function foo() { console.log(this); }
foo(); // 全局对象

const obj = { foo };
obj.foo(); // obj

foo.call({ a: 1 }); // { a: 1 }

new foo(); // foo 实例
```

**评分维度**：
- 说出 4 种绑定规则（50%）
- 说明箭头函数特殊性（25%）
- 能举例说明（25%）

**常见错误**：
- 认为 this 指向函数本身或定义位置
- 忽略严格模式下的差异

**延伸追问**：
- `call`、`apply`、`bind` 的区别是什么？
- 如何实现一个自己的 `bind`？

**相关题目**：
- [FB-01-CD-A-001 手写 bind 函数](#FB-01-CD-A-001)

**口头回答版**：
> this 的指向由函数的调用方式决定： 默认绑定：独立函数调用，this 指向全局对象（严格模式为 undefined）。 隐式绑定：作为对象方法调用，this 指向调用它的对象。 显式绑定：通过 call、apply、bind 指定 this。

---

### FB-01-CD-B-001：手写一个数组去重函数。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：数组去重、Set、filter
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请写一个函数 `unique(arr)`，实现数组去重。要求：

1. 使用 ES6+ 方式实现一种。
2. 使用 ES5 方式实现一种。
3. 说明两种方法的优劣。

**参考答案**：

ES6+ 方式：

```js
function unique(arr) {
  return [...new Set(arr)];
}
```

ES5 方式：

```js
function unique(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
}
```

优劣：

- `Set` 方式简洁，时间复杂度 O(n)，但不能去重对象（引用类型）。
- ES5 方式兼容性好，时间复杂度 O(n²)，同样不能处理对象去重。

**评分维度**：
- 写出两种实现（50%）
- 分析时间复杂度（25%）
- 说明对象去重问题（25%）

**常见错误**：
- 忽略 `NaN` 的去重（Set 可以正确处理 NaN）
- 对象去重期望按值比较

**延伸追问**：
- 如果要对对象数组按某个字段去重，怎么做？
- 如果数组很大（百万级），如何优化去重性能？

**口头回答版**：
> - Set 方式简洁，时间复杂度 O(n)，但不能去重对象（引用类型）。 - ES5 方式兼容性好，时间复杂度 O(n²)，同样不能处理对象去重。

---

### FB-01-CA-B-003：下面代码的输出是什么？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：类型转换、比较运算、隐式转换
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```js
console.log([] == false);
console.log({} == false);
console.log('' == false);
console.log(null == undefined);
console.log(null === undefined);
```

请说出每行输出。

**参考答案**：

```
true
false
true
true
false
```

解释：

- `[] == false`：`[]` 转数字为 0，`false` 转数字为 0，相等。
- `{} == false`：`{}` 转字符串为 `'[object Object]'`，再转数字为 `NaN`，不相等。
- `'' == false`：都转数字为 0，相等。
- `null == undefined`：ECMAScript 规定两者相等。
- `null === undefined`：类型不同，严格不等。

**评分维度**：
- 正确分析 `[]` 和 `{}` 的转换差异（40%）
- 正确分析 `null` / `undefined`（30%）
- 解释 `==` 与 `===` 差异（30%）

**常见错误**：
- 认为 `{} == false` 也为 true
- 混淆 `null == undefined` 和 `null === undefined`

**口头回答版**：
> - [] == false：[] 转数字为 0，false 转数字为 0，相等。 - {} == false：{} 转字符串为 '[object Object]'，再转数字为 NaN，不相等。 - '' == false：都转数字为 0，相等。 - null == undefined：ECMAScript 规定两者相等。

---

### FB-01-CO-B-006：`map`、`filter`、`reduce` 的区别是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：数组方法、Map、filter、reduce
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `map`、`filter`、`reduce` 的作用和区别，并各举一个例子。

**参考答案**：

- `map`：对数组每个元素执行回调，返回新数组，长度与原数组相同。
- `filter`：按条件筛选元素，返回满足条件的新数组。
- `reduce`：对数组元素进行累积计算，返回一个最终值。

```js
const arr = [1, 2, 3, 4];

arr.map(x => x * 2);      // [2, 4, 6, 8]
arr.filter(x => x > 2);   // [3, 4]
arr.reduce((sum, x) => sum + x, 0); // 10
```

**评分维度**：
- 说清三者作用（50%）
- 各举一例（30%）
- 说明是否改变原数组（20%）

**常见错误**：
- 在 `map` 里做副作用操作
- `reduce` 忘记传初始值

**延伸追问**：
- `map` 和 `forEach` 的区别？
- 如何用 `reduce` 实现 `map` 和 `filter`？

**口头回答版**：
> - map：对数组每个元素执行回调，返回新数组，长度与原数组相同。 - filter：按条件筛选元素，返回满足条件的新数组。 - reduce：对数组元素进行累积计算，返回一个最终值。

---

### FB-01-CO-B-007：`null` 和 `undefined` 的区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：null、undefined、空值
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `null` 和 `undefined` 的区别。

**参考答案**：

- `undefined`：表示"未定义"，变量声明未赋值、对象不存在的属性、函数无返回值时默认返回 `undefined`。
- `null`：表示"空值"，需要显式赋值，表示此处应该有值但目前为空。

```js
let a;
console.log(a); // undefined

let b = null;
console.log(b); // null
```

**评分维度**：
- 说清语义差异（50%）
- 说明典型产生场景（30%）
- 提到 `typeof null === 'object'` 的历史 bug（20%）

**常见错误**：
- 认为两者完全相同
- 不知道 `typeof null` 的返回值

**口头回答版**：
> - undefined：表示"未定义"，变量声明未赋值、对象不存在的属性、函数无返回值时默认返回 undefined。 - null：表示"空值"，需要显式赋值，表示此处应该有值但目前为空。

---

### FB-01-CA-B-004：下面代码的输出是什么？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：setTimeout、事件循环、异步
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```js
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');
```

请说出输出顺序。

**参考答案**：

```
1
4
3
2
```

解释：

1. `console.log('1')` 同步执行。
2. `setTimeout` 进入宏任务队列。
3. `Promise.then` 进入微任务队列。
4. `console.log('4')` 同步执行。
5. 同步代码执行完毕后，先清空微任务队列，输出 `3`。
6. 再执行宏任务队列，输出 `2`。

**评分维度**：
- 正确输出顺序（50%）
- 解释宏任务和微任务（30%）
- 解释事件循环基本流程（20%）

**常见错误**：
- 认为 `setTimeout(..., 0)` 会立即执行
- 分不清 Promise 和 setTimeout 的优先级

**延伸追问**：
- 如果 `Promise.then` 里再 `setTimeout`，顺序会怎样？
- `process.nextTick` 和 `Promise.then` 哪个先执行？

**参考资源**：
- [MDN - Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

**口头回答版**：
> console.log('1') 同步执行。 setTimeout 进入宏任务队列。 Promise.then 进入微任务队列。 console.log('4') 同步执行。

---

### FB-01-CO-B-008：什么是深拷贝和浅拷贝？如何实现？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：深拷贝、浅拷贝、对象拷贝
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释深拷贝和浅拷贝的区别，并说明实现方式。

**参考答案**：

- **浅拷贝**：只拷贝对象的第一层属性，嵌套对象仍共享引用。
- **深拷贝**：递归拷贝所有层级，完全独立。

实现方式：

```js
// 浅拷贝
const shallow = { ...obj };
const shallow2 = Object.assign({}, obj);

// 深拷贝（简单版）
const deep = JSON.parse(JSON.stringify(obj));

// 深拷贝（完整版）
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }
  return clone;
}
```

**评分维度**：
- 说清深浅拷贝区别（30%）
- 写出浅拷贝实现（20%）
- 写出深拷贝实现（40%）
- 提到循环引用、Date、RegExp 等特殊对象（10%）

**常见错误**：
- 认为 `JSON.parse(JSON.stringify)` 是万能方案
- 深拷贝实现不处理循环引用

**相关题目**：
- [FB-01-CD-A-002 手写深拷贝函数](#FB-01-CD-A-002)

**口头回答版**：
> - 浅拷贝：只拷贝对象的第一层属性，嵌套对象仍共享引用。 - 深拷贝：递归拷贝所有层级，完全独立。

---

### FB-01-CO-B-009：解释事件委托（Event Delegation）。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript、03 Browser
**标签**：事件委托、事件冒泡、事件监听
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是事件委托？有什么优点？

**参考答案**：

事件委托：利用事件冒泡机制，将子元素的事件监听器绑定到父元素上，通过 `event.target` 判断具体触发元素。

优点：

1. 减少内存占用，避免为大量子元素绑定监听器。
2. 动态新增的子元素也能响应事件，无需重新绑定。
3. 代码更简洁，易于维护。

```js
document.getElementById('list').addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent);
  }
});
```

**评分维度**：
- 解释事件冒泡和委托原理（40%）
- 说出 2 个以上优点（40%）
- 能写出示例（20%）

**常见错误**：
- 与事件捕获混淆
- 不知道 `event.target` 和 `event.currentTarget` 的区别

**延伸追问**：
- `event.target` 和 `event.currentTarget` 有什么区别？
- 事件委托有什么局限性？

**口头回答版**：
> 事件委托：利用事件冒泡机制，将子元素的事件监听器绑定到父元素上，通过 event.target 判断具体触发元素。 减少内存占用，避免为大量子元素绑定监听器。 动态新增的子元素也能响应事件，无需重新绑定。 代码更简洁，易于维护。

---

### FB-01-CO-B-010：什么是原型和原型链？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：原型、原型链、prototype、__proto__
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 JavaScript 中的原型和原型链。

**参考答案**：

- **原型对象**：每个函数都有 `prototype` 属性，指向该函数作为构造函数时创建的实例的原型。
- **`__proto__`**：每个对象都有 `__proto__` 属性，指向其构造函数的原型对象。
- **原型链**：对象在查找属性或方法时，先在自身查找，找不到则沿 `__proto__` 向上查找，直到 `Object.prototype`，最终到 `null`。

```js
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  console.log('Hi');
};

const p = new Person('Tom');
p.sayHi(); // 沿原型链找到 sayHi
```

**评分维度**：
- 说清 `prototype` 和 `__proto__` 的区别（40%）
- 解释原型链查找过程（40%）
- 能举例说明（20%）

**常见错误**：
- 混淆 `prototype` 和 `__proto__`
- 认为所有对象都有 `prototype`

**延伸追问**：
- `instanceof` 的原理是什么？
- 如何实现继承？

**参考资源**：
- [MDN - Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

**口头回答版**：
> - 原型对象：每个函数都有 prototype 属性，指向该函数作为构造函数时创建的实例的原型。 - __proto__：每个对象都有 __proto__ 属性，指向其构造函数的原型对象。 - 原型链：对象在查找属性或方法时，先在自身查找，找不到则沿 __proto__ 向上查找，直到 Object.prototype，最终到 null。

---


---

### FB-01-CO-B-011：解构赋值是什么？有哪些常见用法？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：解构赋值、es6、数组、对象
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 ES6 解构赋值的含义，并说明数组解构、对象解构、嵌套解构、默认值和重命名的用法。

**参考答案**：

解构赋值（Destructuring Assignment）允许从数组或对象中按模式提取值并赋给变量，是 ES6 提供的语法糖。

1. **数组解构**（按位置取值）：
   ```js
   const [a, b] = [1, 2];
   const [first, , third] = [1, 2, 3]; // 跳过元素
   ```

2. **对象解构**（按属性名取值，支持重命名）：
   ```js
   const { name, age } = { name: 'Tom', age: 20 };
   const { name: userName } = { name: 'Tom' };       // 重命名
   const { role = 'guest' } = {};                    // 默认值
   ```

3. **嵌套解构**：
   ```js
   const user = { profile: { address: { city: 'Beijing' } } };
   const { profile: { address: { city } } } = user;
   ```

4. **剩余模式**：
   ```js
   const [head, ...tail] = [1, 2, 3];          // head=1, tail=[2, 3]
   const { id, ...rest } = { id: 1, name: 'a' }; // rest={ name: 'a' }
   ```

5. **函数参数解构**：
   ```js
   function greet({ name = 'Guest', age }) {
     console.log(`${name}, ${age}`);
   }
   ```

> 注意：解构赋值对嵌套对象执行的是**浅拷贝**；默认值只在提取值为 `undefined` 时生效。

**评分维度**：
- 概念准确性（30%）：能否说清解构赋值的本质
- 数组/对象解构用法（30%）：能否正确写出基本语法
- 默认值、重命名、嵌套与剩余（20%）：是否覆盖常见变体
- 举例能力（20%）：能否用代码示例说明

**常见错误**：
- 给已声明的变量解构时忘记加括号：`let a; {a} = obj` 会报语法错误，应写成 `({a} = obj)`。
- 认为默认值对 `null` 也会生效，实际上默认值只在 `undefined` 时生效。
- 在对象解构中混淆重命名与默认值：`{a: b = 1}` 表示把属性 `a` 重命名为 `b` 并设默认值。

**延伸追问**：
- 解构赋值能否用于函数参数？有什么好处？
- 解构赋值和深拷贝/浅拷贝有什么关系？

**相关题目**：
- [FB-01-CO-B-002 `let`、`const`、`var` 的区别](#FB-01-CO-B-002)

**参考资源**：
- [MDN - 解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

**口头回答版**：
> 解构赋值（Destructuring Assignment）允许从数组或对象中按模式提取值并赋给变量，是 ES6 提供的语法糖。 数组解构（按位置取值）： 对象解构（按属性名取值，支持重命名）： > 注意：解构赋值对嵌套对象执行的是浅拷贝；默认值只在提取值为 undefined 时生效。

---

### FB-01-CO-B-012：模板字符串有什么特性？什么是标签模板？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：模板字符串、es6、字符串插值、标签模板
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 ES6 模板字符串的主要特性，并解释什么是标签模板（Tagged Template）。

**参考答案**：

模板字符串使用反引号 `` ` `` 包裹，相比普通字符串有以下增强：

1. **字符串插值**：使用 `${expression}` 嵌入变量或表达式。
   ```js
   const name = 'Tom';
   console.log(`Hello, ${name.toUpperCase()}!`); // Hello, TOM!
   ```

2. **多行字符串**：保留换行和缩进（包含空白字符）。
   ```js
   const html = `
     <div>
       <p>text</p>
     </div>
   `;
   ```

3. **标签模板**：在模板字符串前放置一个函数（tag），该函数接收字符串片段数组和插入值。
   ```js
   function highlight(strings, ...values) {
     return strings.reduce((acc, str, i) =>
       acc + str + (values[i] ? `<b>${values[i]}</b>` : ''), '');
   }
   const name = 'Tom';
   highlight`Hello ${name}, welcome!`; // "Hello <b>Tom</b>, welcome!"
   ```

标签模板的典型用途：防止 XSS（转义 HTML）、实现国际化（i18n）、CSS-in-JS（如 styled-components）。

**评分维度**：
- 模板字符串特性（40%）：插值、多行、表达式
- 字符串插值与多行示例（30%）：能否写出正确示例
- 标签模板理解（30%）：是否知道函数签名为 `(strings, ...values)`

**常见错误**：
- 在普通单/双引号字符串中使用 `${}`，导致无法解析。
- 标签模板函数返回字符串数组而不是拼接后的结果。
- 对不可信输入直接使用模板字符串拼接 HTML，导致 XSS。

**延伸追问**：
- 如何用标签模板实现简单的 HTML 转义？
- `String.raw` 是什么？它的作用是什么？

**相关题目**：
- [FB-01-CO-B-011 解构赋值](#FB-01-CO-B-011)

**参考资源**：
- [MDN - 模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)

**口头回答版**：
> 模板字符串使用反引号 `  ` 包裹，相比普通字符串有以下增强： 字符串插值：使用 ${expression}` 嵌入变量或表达式。 多行字符串：保留换行和缩进（包含空白字符）。 标签模板：在模板字符串前放置一个函数（tag），该函数接收字符串片段数组和插入值。

---

### FB-01-CO-B-013：默认参数、剩余参数与展开运算符有什么区别和联系？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：默认参数、rest、spread、es6、函数
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 ES6 中函数的默认参数、剩余参数（rest）和展开运算符（spread），并说明它们的使用场景。

**参考答案**：

三者都是 ES6 为函数和表达式提供的语法增强，但用途不同：

| 特性 | 语法 | 作用 | 位置 |
|------|------|------|------|
| 默认参数 | `function f(x = 1)` | 参数未传入或为 `undefined` 时使用默认值 | 形参声明 |
| 剩余参数 | `function f(...args)` | 把多余的实参收集为一个数组 | 形参末尾 |
| 展开运算符 | `fn(...arr)` / `[...arr]` | 把可迭代对象“展开”为多个元素 | 调用/构造/数组/对象字面量 |

示例：

```js
// 默认参数
function greet(name = 'Guest') {
  return `Hello, ${name}`;
}
greet();           // Hello, Guest
greet(undefined);  // Hello, Guest
greet(null);       // Hello, null

// 剩余参数
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6

// 展开运算符
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }
```

> 剩余参数得到的是一个真正的 `Array`，可以使用数组方法；`arguments` 是类数组对象。剩余参数必须是形参列表中的最后一个。

**评分维度**：
- 三者概念区分（40%）：能否准确区分默认参数、rest、spread
- 使用场景与示例（30%）：能否写出典型代码
- 注意事项（30%）：默认值对 `undefined` 生效、rest 必须放最后、spread 浅拷贝

**常见错误**：
- 在箭头函数中仍使用 `arguments` 而不是 rest 参数。
- 认为默认参数对 `null` 也会生效。
- 把剩余参数放在形参中间，导致语法错误。
- 用展开运算符复制嵌套对象时期望得到深拷贝。

**延伸追问**：
- 剩余参数和 `arguments` 有什么区别？
- 对象展开运算符会覆盖哪些属性？覆盖顺序是怎样的？

**相关题目**：
- [FB-01-CO-B-004 箭头函数和普通函数的区别](#FB-01-CO-B-004)
- [FB-01-CO-B-011 解构赋值](#FB-01-CO-B-011)

**参考资源**：
- [MDN - 默认参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [MDN - 剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [MDN - 展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

**口头回答版**：
> 三者都是 ES6 为函数和表达式提供的语法增强，但用途不同： | 特性 | 语法 | 作用 | 位置 | |------|------|------|------| | 默认参数 | function f(x = 1) | 参数未传入或为 undefined 时使用默认值 | 形参声明 |

---

### FB-01-CO-B-014：正则表达式中常用元字符有哪些？如何写一个简单的手机号校验？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：正则表达式、字符串校验、es6
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明正则表达式中常见元字符的含义，并写出一个简单的中国大陆手机号校验正则。

**参考答案**：

常用元字符：

| 元字符 | 含义 |
|--------|------|
| `.` | 匹配除换行符外的任意单个字符 |
| `*` | 前面的字符出现 0 次或多次 |
| `+` | 前面的字符出现 1 次或多次 |
| `?` | 前面的字符出现 0 次或 1 次 |
| `^` | 匹配字符串开头 |
| `$` | 匹配字符串结尾 |
| `[]` | 字符类，匹配方括号内的任意一个字符 |
| `()` | 分组，捕获子匹配 |
| `\|` | 或 |
| `\d` | 数字 `[0-9]` |
| `\w` | 单词字符 `[A-Za-z0-9_]` |
| `\s` | 空白字符 |
| `{n,m}` | 前面的字符出现 n 到 m 次 |

简单手机号校验（中国大陆 11 位，1 开头，第二位 3-9）：

```js
const phoneRegex = /^1[3-9]\d{9}$/;
phoneRegex.test('13800138000'); // true
phoneRegex.test('1380013800');  // false
```

常用方法：
- `regex.test(str)`：返回布尔值。
- `str.match(regex)`：返回匹配结果数组。
- `str.replace(regex, replacement)`：替换。
- `str.split(regex)`：按正则分割。

**评分维度**：
- 元字符解释（40%）：能否清晰说明常见元字符
- 正则编写能力（30%）：能否写出正确的手机号正则
- 标志与方法（30%）：是否了解 `g/i/m/s` 等标志及常用方法

**常见错误**：
- 忘记写 `^` 和 `$`，导致只匹配部分字符串。
- 把手机号第二位写成 `[0-9]`，导致不合法号段通过。
- 认为 `.` 可以匹配换行符（默认不能）。
- 在字符类中对元字符过度转义，如 `[\d]` 虽然有效但 `[0-9]` 更直观。

**延伸追问**：
- 如何校验邮箱？需要注意哪些边界？
- `g` 标志对 `test()` 有什么副作用？

**相关题目**：
- [FB-01-CA-B-003 隐式类型转换输出分析](#FB-01-CA-B-003)

**参考资源**：
- [MDN - 正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

**口头回答版**：
> | 元字符 | 含义 | |--------|------| | . | 匹配除换行符外的任意单个字符 | | * | 前面的字符出现 0 次或多次 |

---

### FB-01-CA-B-005：下面代码的输出是什么？如何正确输出 0、1、2？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：闭包、作用域、var、let、异步
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

1. 请说出上面代码的输出，并解释原因。
2. 不使用 `let`，如何修改让它按顺序输出 `0 1 2`？

**参考答案**：

**输出**：

```
3
3
3
```

**原因**：

`var` 声明的变量没有块级作用域，三次循环共享同一个 `i`。当 `setTimeout` 的回调执行时，循环早已结束，`i` 的值已经是 `3`，所以三次都输出 `3`。这正是**闭包捕获变量引用**的典型场景。

**修改方案**（不使用 `let`）：

通过 IIFE 为每次循环创建一个新的作用域：

```js
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 0);
  })(i);
}
// 0 1 2
```

或者使用 `forEach` 等函数参数创建新作用域：

```js
[0, 1, 2].forEach(j => {
  setTimeout(() => console.log(j), 0);
});
```

最简洁的写法是使用 `let`，利用块级作用域：

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

**评分维度**：
- 正确输出（30%）：能说出三次输出 3
- 原因分析（30%）：能解释 `var` 无块级作用域和闭包捕获引用
- 修改方案（40%）：能给出 IIFE、`let` 或 `forEach` 方案

**常见错误**：
- 以为 `setTimeout` 会按 0、1、2 的顺序输出当前的 `i`。
- 写了 IIFE 但没有把当前 `i` 作为参数传入，仍然共享变量。
- 认为把 `var` 改成 `const` 也可以（循环变量不能是 `const`）。

**延伸追问**：
- 如果用 `let` 声明，`i` 在每次迭代中是同一个变量还是新变量？
- 在 React 中类似的闭包陷阱有哪些表现？

**相关题目**：
- [FB-01-CO-B-003 什么是闭包](#FB-01-CO-B-003)
- [FB-01-CO-B-002 `let`、`const`、`var` 的区别](#FB-01-CO-B-002)

**参考资源**：
- [MDN - 闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-01-CD-B-002：用 ES6+ 实现对象/数组的浅拷贝与合并，并比较 `Object.assign` 与展开运算符的区别。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：浅拷贝、对象合并、spread、es6
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请用 ES6+ 语法实现对象和数组的浅拷贝，并实现两个对象的浅合并。同时说明 `Object.assign` 与对象展开运算符 `{...obj}` 的区别。

**参考答案**：

```js
// 对象浅拷贝
const cloneObj = obj => ({ ...obj });

// 数组浅拷贝
const cloneArr = arr => [...arr];

// 对象浅合并（多个源对象）
const merge = (target, ...sources) => Object.assign({}, target, ...sources);
// 等价写法
const merge2 = (target, ...sources) =>
  sources.reduce((acc, cur) => ({ ...acc, ...cur }), target);
```

`Object.assign(target, ...sources)` 与 `{ ...obj }` 的异同：

| 特性 | `Object.assign` | `{ ...obj }` |
|------|-----------------|--------------|
| 拷贝层级 | 浅拷贝 | 浅拷贝 |
| 原型属性 | 不拷贝原型链属性 | 不拷贝原型链属性 |
| 不可枚举属性 | 不拷贝 | 不拷贝 |
| Symbol 属性 | 拷贝 | 拷贝 |
| setter 调用 | 在 `target` 上调用 setter | 直接创建新属性，不调用 setter |
| 目标对象 | 可指定已有对象 | 总是生成新对象 |
| 适用对象 | 仅普通对象/可枚举自有属性 | 对象字面量；数组展开用于数组 |

示例：

```js
const a = { x: 1, y: { z: 2 } };
const b = { ...a };
b.y.z = 3;
console.log(a.y.z); // 3，浅拷贝导致嵌套对象共享
```

**评分维度**：
- 实现对象/数组浅拷贝与合并（40%）：代码正确
- `Object.assign` 与 spread 区别（30%）：能说出关键差异
- 浅拷贝语义理解（30%）：能指出嵌套对象共享引用

**常见错误**：
- 认为 `Object.assign` 或展开运算符是深拷贝。
- 合并时直接修改原始对象，导致副作用。
- 在需要深拷贝的场景直接使用浅拷贝。

**延伸追问**：
- 如果需要深拷贝，你会怎么实现？`JSON.parse(JSON.stringify)` 有什么缺陷？
- 浅拷贝在 Redux 等不可变数据更新中有什么意义？

**相关题目**：
- [FB-01-CO-B-008 深拷贝和浅拷贝](#FB-01-CO-B-008)
- [FB-01-CD-A-002 手写深拷贝函数](#FB-01-CD-A-002)

**参考资源**：
- [MDN - Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [MDN - 展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

**口头回答版**：
> Object.assign(target, ...sources) 与 { ...obj } 的异同： | 特性 | Object.assign | { ...obj } | |------|-----------------|--------------| | 拷贝层级 | 浅拷贝 | 浅拷贝 |

---

### FB-01-CO-B-015：JavaScript 中如何捕获和处理异常？`finally` 在 `return` 前后会如何执行？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：异常处理、错误处理、es6
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 JavaScript 中异常处理的基本语法，包括 `try/catch/finally`、`throw`、内置 `Error` 类型。并解释 `finally` 块在函数 `return` 时的执行时机。

**参考答案**：

JavaScript 使用 `try/catch/finally` 结构捕获同步异常：

```js
try {
  // 可能出错的代码
  throw new Error('Something wrong');
} catch (err) {
  console.error(err.message);
} finally {
  // 无论是否异常都会执行
  console.log('finally');
}
```

常见内置错误类型：`Error`、`TypeError`、`ReferenceError`、`RangeError`、`SyntaxError`、`URIError`。

`finally` 的执行时机：

- `finally` 块**一定会在 `try` / `catch` 之后、函数真正返回之前执行**。
- 如果 `finally` 块中也有 `return`，会覆盖 `try` / `catch` 中的 `return` 值。

```js
function demo() {
  try {
    return 1;
  } finally {
    return 2;
  }
}
demo(); // 2
```

异步异常：
- `Promise` 的异常需要通过 `.catch()` 或 `try...catch` 配合 `await` 捕获。
- 未捕获的 Promise 拒绝会触发 `unhandledrejection` 事件。

**评分维度**：
- 异常处理语法（30%）：`try/catch/finally`、`throw`、Error 类型
- `finally` 执行时机（40%）：能解释 finally 在 return 前执行及覆盖 return 值
- 异步异常处理（30%）：知道 Promise 异常不能用外层 try/catch 直接捕获

**常见错误**：
- 认为 `finally` 在函数返回之后才执行。
- 不知道 `finally` 中的 `return` 会覆盖 `try` 中的 `return`。
- 用外层的 `try/catch` 捕获 Promise 的 reject，结果捕获不到。
- 在 `catch` 中不做任何处理直接吞掉异常，导致问题难以排查。

**延伸追问**：
- `try` 块中没有异常，`catch` 中的代码会执行吗？
- `async` 函数中 `try/catch` 能捕获 `await` 的 Promise 拒绝吗？

**参考资源**：
- [MDN - try...catch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)

**口头回答版**：
> JavaScript 使用 try/catch/finally 结构捕获同步异常： 常见内置错误类型：Error、TypeError、ReferenceError、RangeError、SyntaxError、URIError。 finally 的执行时机： - finally 块一定会在 try / catch 之后、函数真正返回之前执行。

---

### FB-01-CO-B-016：严格模式下 `this` 的指向有哪些不同？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：严格模式、this、执行上下文、es6
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明在严格模式（`'use strict'`）下，`this` 的指向与非严格模式相比有什么不同。

**参考答案**：

在严格模式下，`this` 不再被“装箱”为全局对象或包装对象：

1. **全局作用域中的 `this` 为 `undefined`**（非严格模式下是全局对象 `window` / `globalThis`）。
2. **普通函数独立调用时，`this` 为 `undefined`**，不再指向全局对象。
   ```js
   'use strict';
   function foo() { console.log(this); }
   foo(); // undefined
   ```
3. **通过 `call` / `apply` 传入原始值时，不会自动装箱为包装对象**。
   ```js
   function fn() { console.log(typeof this); }
   fn.call('abc'); // string（非严格模式为 object）
   ```
4. 严格模式还带来一些额外限制：禁止使用 `with`、禁止重复参数名、`eval` 有独立作用域等，但这些不直接改变 `this` 规则。

> 注意：严格模式**不会改变箭头函数的 `this`**，箭头函数仍然没有自己的 `this`。

**评分维度**：
- 全局/函数调用 this 为 undefined（40%）
- 原始值不再装箱（30%）
- 能举例说明（30%）

**常见错误**：
- 认为严格模式下箭头函数的 `this` 也会改变。
- 认为严格模式下所有场景的 `this` 都变成 `undefined`（对象方法调用仍指向对象）。
- 混淆严格模式与 `this` 绑定规则的优先级。

**延伸追问**：
- 严格模式还有哪些限制？
- 模块代码默认是严格模式吗？为什么？

**相关题目**：
- [FB-01-CO-B-005 解释 `this` 的指向规则](#FB-01-CO-B-005)
- [FB-01-CD-A-001 手写 `call`、`apply`、`bind`](#FB-01-CD-A-001)

**参考资源**：
- [MDN - 严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

**口头回答版**：
> 在严格模式下，this 不再被“装箱”为全局对象或包装对象： 全局作用域中的 this 为 undefined（非严格模式下是全局对象 window / globalThis）。 普通函数独立调用时，this 为 undefined，不再指向全局对象。 通过 call / apply 传入原始值时，不会自动装箱为包装对象。



---
### FB-01-CD-B-003：手写 Array.prototype.flat 的实现

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：数组、flat、递归、手写代码
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现一个 myFlat(arr, depth) 函数，效果与 Array.prototype.flat 一致。

**参考答案**：

递归处理数组元素，遇到元素仍为数组且 depth 大于 0 时继续展开。使用 reduce 累积结果。边界情况：depth 为 Infinity、非数组输入、数组为空。

    function myFlat(arr, depth = 1) {
      if (depth === 0) return arr.slice();
      return arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) && depth > 0 ? myFlat(cur, depth - 1) : cur);
      }, []);
    }

**评分维度**：
- 递归展开逻辑（40%）：是否按 depth 控制递归深度
- 边界处理（30%）：Infinity、非数组、空数组
- 代码质量（30%）：是否避免副作用

**常见错误**：
- 直接用 arr.toString().split(",")，丢失对象和嵌套数组结构
- depth 使用 arr 的 length 判断，逻辑错误
- 没有处理类数组或稀疏数组的情况

**口头回答版**：
> myFlat 用递归按 depth 展开嵌套数组，reduce 累积结果。注意 Infinity、非数组和空数组的边界。

### FB-01-CD-B-004：手写 JSON.stringify 的简化版

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：JSON、序列化、手写代码
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
实现一个简化版 myStringify(value)，支持基本类型、对象、数组、字符串，忽略循环引用。

**参考答案**：

核心规则：undefined/function/symbol 在对象中忽略、在数组中转为 null；字符串加双引号；对象递归拼接 key:value；数组递归拼接元素。

    function myStringify(value) {
      if (value === null) return 'null';
      const type = typeof value;
      if (type === 'number' || type === 'boolean') return String(value);
      if (type === 'string') return '"' + value.replace(/"/g, '\"') + '"';
      if (Array.isArray(value)) {
        return '[' + value.map(v => myStringify(v === undefined ? null : v)).join(',') + ']';
      }
      if (type === 'object') {
        const pairs = Object.entries(value)
          .filter(([, v]) => !['undefined','function','symbol'].includes(typeof v))
          .map(([k, v]) => '"' + k + '":' + myStringify(v));
        return '{' + pairs.join(',') + '}';
      }
      return undefined;
    }

**评分维度**：
- 类型覆盖（40%）：基本类型、数组、对象处理
- 特殊值（30%）：undefined/function/symbol 的处理
- 代码健壮性（30%）：字符串转义、循环引用提示

**常见错误**：
- 字符串没有转义双引号，导致结果非法
- 对象属性值是 undefined 时直接序列化为 undefined
- 数组中的 undefined 没有转换为 null

**口头回答版**：
> 简化 JSON.stringify 需要正确处理字符串转义、undefined 在数组和对象中的差异，以及递归拼接。

### FB-01-CO-B-019：Set、Map、WeakMap、WeakSet 在垃圾回收上有什么差异？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：01 JavaScript
**标签**：Set、Map、WeakMap、垃圾回收
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 Set/Map 与 WeakMap/WeakSet 的键类型、可迭代性和 GC 行为。

**参考答案**：

Set/Map 的键被强引用，即使对象在其他地方不再使用，也不会被 GC，且可遍历。WeakMap/WeakSet 的键必须是对象，持有弱引用，不阻止 GC，不可遍历，因此没有 size/forEach。

适用场景：WeakMap 适合私有数据缓存或 DOM 元数据，避免内存泄漏。

**评分维度**：
- 引用类型（40%）：强引用 vs 弱引用
- 可迭代性（30%）：Weak 集合不可遍历的原因
- GC 影响（30%）：内存泄漏风险对比

**常见错误**：
- 认为 WeakMap 可以枚举所有键
- 用原始值作为 WeakMap 的键
- 在需要长期保持映射的场景误用 WeakMap 导致数据丢失

**口头回答版**：
> Set/Map 强引用、可遍历；WeakMap/WeakSet 弱引用、键必须是对象、不可遍历，适合不影响 GC 的元数据。
---

## 进阶题（30 道）{#advanced}

**口头回答版**：
> 在严格模式下，this 不再被“装箱”为全局对象或包装对象： 全局作用域中的 this 为 undefined（非严格模式下是全局对象 window / globalThis）。 普通函数独立调用时，this 为 undefined，不再指向全局对象。 通过 call / apply 传入原始值时，不会自动装箱为包装对象。

### FB-01-CD-A-001：手写 `call`、`apply`、`bind`。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：call、apply、bind、手写实现、this
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请手写实现 `Function.prototype.call`、`Function.prototype.apply`、`Function.prototype.bind`。

**参考答案**：

```js
Function.prototype.myCall = function(context, ...args) {
  context = context == null ? globalThis : Object(context);
  const key = Symbol('fn');
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myApply = function(context, args = []) {
  context = context == null ? globalThis : Object(context);
  const key = Symbol('fn');
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myBind = function(context, ...bindArgs) {
  const fn = this;
  return function(...args) {
    return fn.apply(context, [...bindArgs, ...args]);
  };
};
```

**评分维度**：
- 正确实现 `call`（30%）
- 正确实现 `apply`（20%）
- 正确实现 `bind`（30%）
- 处理 `context` 为 `null`/`undefined` 的情况（10%）
- 处理参数传递（10%）

**常见错误**：
- 使用 `context.fn` 可能覆盖对象原有属性
- `bind` 没有保留原函数的 `prototype`

**延伸追问**：
- 如果用 `Symbol` 之前的 ES5 方式，如何防止覆盖属性？
- `bind` 返回的函数作为构造函数调用时，`this` 应该指向什么？

**口头回答版**：
> （见代码示例）

---

### FB-01-CD-A-002：手写一个深拷贝函数。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：深拷贝、递归、WeakMap、循环引用
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请手写一个深拷贝函数，要求：

1. 支持对象、数组、Date、RegExp。
2. 处理循环引用。
3. 说明 `JSON.parse(JSON.stringify)` 的缺陷。

**参考答案**：

```js
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;

  // 处理 Date
  if (obj instanceof Date) return new Date(obj.getTime());

  // 处理 RegExp
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

  // 处理循环引用
  if (map.has(obj)) return map.get(obj);

  const result = Array.isArray(obj) ? [] : {};
  map.set(obj, result);

  // 处理 Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    obj.forEach((value, key) => {
      clonedMap.set(deepClone(key, map), deepClone(value, map));
    });
    return clonedMap;
  }

  // 处理 Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    obj.forEach(value => clonedSet.add(deepClone(value, map)));
    return clonedSet;
  }

  // 处理普通对象和数组
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], map);
    }
  }

  // 复制 Symbol 类型的 key
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for (const key of symbolKeys) {
    result[key] = deepClone(obj[key], map);
  }

  return result;
}
```

`JSON.parse(JSON.stringify)` 的缺陷：

1. 忽略 `undefined`、`function`、`Symbol`。
2. 忽略 `Map`、`Set`、`Date`、`RegExp` 等类型（Date 会被转成字符串）。
3. 不能处理循环引用，会报错。
4. 不能复制原型链上的属性。

**评分维度**：
- 递归实现基础深拷贝（30%）
- 处理循环引用（25%）
- 处理 Date/RegExp/Map/Set（25%）
- 说明 JSON 方案缺陷（20%）

**常见错误**：
- 不处理循环引用导致栈溢出
- 忽略 Symbol key
- 用 `JSON.parse(JSON.stringify)` 当作最终答案

**延伸追问**：
- 如何处理函数和 undefined？是否应该选择忽略还是保留？
- 浅拷贝有哪些原生方法？

**口头回答版**：
> JSON.parse(JSON.stringify) 的缺陷： 忽略 undefined、function、Symbol。 忽略 Map、Set、Date、RegExp 等类型（Date 会被转成字符串）。 不能处理循环引用，会报错。

---

### FB-01-CA-A-001：下面代码的输出是什么？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：Promise、异步、微任务、宏任务、事件循环
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
console.log('start');

setTimeout(() => {
  console.log('setTimeout1');
  Promise.resolve().then(() => console.log('promise1'));
}, 0);

Promise.resolve().then(() => {
  console.log('promise2');
  setTimeout(() => console.log('setTimeout2'), 0);
});

console.log('end');
```

请说出输出顺序。

**参考答案**：

```
start
end
promise2
setTimeout1
promise1
setTimeout2
```

解释：

1. 同步代码：`start`、`end`。
2. `Promise.then` 进入微任务队列，第一个宏任务 `setTimeout1` 进入宏任务队列。
3. 同步代码结束，执行微任务：`promise2`，其中又注册一个宏任务 `setTimeout2`。
4. 微任务清空，执行第一个宏任务 `setTimeout1`，输出 `setTimeout1`，并注册微任务 `promise1`。
5. 该宏任务执行完后，检查微任务队列，输出 `promise1`。
6. 最后执行第二个宏任务 `setTimeout2`。

**评分维度**：
- 正确输出顺序（50%）
- 解释微任务嵌套宏任务的注册时机（30%）
- 解释每一轮事件循环的流程（20%）

**常见错误**：
- 认为 `setTimeout1` 里的 `Promise.then` 会在下一个宏任务才执行
- 搞混微任务和宏任务的清空顺序

**延伸追问**：
- 如果 `Promise.resolve().then` 里再嵌套 `Promise.then`，执行顺序如何？
- `async/await` 在事件循环中如何表现？

**口头回答版**：
> 同步代码：start、end。 Promise.then 进入微任务队列，第一个宏任务 setTimeout1 进入宏任务队列。 同步代码结束，执行微任务：promise2，其中又注册一个宏任务 setTimeout2。 微任务清空，执行第一个宏任务 setTimeout1，输出 setTimeout1，并注册微任务 promise1。

---

### FB-01-CD-A-003：手写 Promise.all。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：Promise、Promise.all、手写实现、异步
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请手写实现 `Promise.all`，并说明：

1. 参数不是数组或 Promise 时如何处理。
2. 有一个 reject 时如何处理。
3. 空数组时返回什么。

**参考答案**：

```js
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable);
    const results = new Array(promises.length);
    let completedCount = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        value => {
          results[index] = value;
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        },
        reason => reject(reason)
      );
    });
  });
}
```

行为：

- 参数为空数组：返回 `resolve([])`。
- 元素不是 Promise：用 `Promise.resolve(p)` 包装。
- 任一 reject：立即 reject，不等待其他 Promise。

**评分维度**：
- 正确返回 Promise（20%）
- 处理非 Promise 元素（20%）
- 保持结果顺序（20%）
- 处理 reject（25%）
- 处理空数组（15%）

**常见错误**：
- 结果顺序错乱
- 空数组时 hanging 不返回
- 用 `forEach` 时发现索引错误

**延伸追问**：
- 如何实现 `Promise.allSettled`？
- `Promise.all` 和 `Promise.race` 的区别？

**口头回答版**：
> - 参数为空数组：返回 resolve([])。 - 元素不是 Promise：用 Promise.resolve(p) 包装。 - 任一 reject：立即 reject，不等待其他 Promise。

---

### FB-01-CO-A-001：解释 `Promise` 的链式调用原理。

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：Promise、链式调用、then、微任务
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释为什么 `Promise` 可以链式调用，`then` 返回的是什么？

**参考答案**：

`Promise.prototype.then` 返回一个新的 Promise，因此可以链式调用。

链式调用规则：

1. 如果 `then` 的回调返回一个值，新 Promise 会 resolve 该值。
2. 如果 `then` 的回调抛出错误，新 Promise 会 reject 该错误。
3. 如果 `then` 的回调返回一个 Promise，新 Promise 会跟随该 Promise 的状态。

```js
Promise.resolve(1)
  .then(v => v + 1)        // 返回 2
  .then(v => Promise.resolve(v + 1)) // 返回 resolve(3)
  .then(console.log);      // 3
```

**评分维度**：
- 说明 then 返回新 Promise（40%）
- 说明三种返回值的处理（40%）
- 能举例说明（20%）

**常见错误**：
- 认为 then 返回的是同一个 Promise
- 忘记错误会传递

**口头回答版**：
> Promise.prototype.then 返回一个新的 Promise，因此可以链式调用。 如果 then 的回调返回一个值，新 Promise 会 resolve 该值。 如果 then 的回调抛出错误，新 Promise 会 reject 该错误。 如果 then 的回调返回一个 Promise，新 Promise 会跟随该 Promise 的状态。

---

### FB-01-CA-A-002：`setTimeout` 一定准时执行吗？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：setTimeout、事件循环、主线程阻塞
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
`setTimeout(fn, 1000)` 一定会在 1 秒后执行吗？为什么？

**参考答案**：

不一定。`setTimeout` 的延迟时间是最小延迟，实际执行时间取决于事件循环：

1. 如果主线程被长任务阻塞，即使时间到了，回调也要等主线程空闲才能执行。
2. 在浏览器中，嵌套 `setTimeout`（5 层以上）最小延迟会被强制为 4ms。
3. 页面不可见时，后台标签页的 `setTimeout` 可能被节流。

```js
const start = Date.now();
setTimeout(() => console.log(Date.now() - start), 100);

// 阻塞主线程 500ms
while (Date.now() - start < 500) {}
// 实际输出约 500+ms
```

**评分维度**：
- 说明最小延迟而非精确延迟（40%）
- 解释主线程阻塞影响（40%）
- 提到浏览器 4ms 限制（20%）

**常见错误**：
- 认为 setTimeout 是定时精确执行
- 不知道最小延迟限制

**延伸追问**：
- 如果需要一个相对精确的定时器，有什么方案？
- `requestAnimationFrame` 和 `setTimeout` 有什么区别？

**口头回答版**：
> setTimeout 的延迟时间是最小延迟，实际执行时间取决于事件循环： 如果主线程被长任务阻塞，即使时间到了，回调也要等主线程空闲才能执行。 在浏览器中，嵌套 setTimeout（5 层以上）最小延迟会被强制为 4ms。 页面不可见时，后台标签页的 setTimeout 可能被节流。

---

### FB-01-CO-A-002：`for...of` 和 `for...in` 的区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：遍历、for...of、for...in、迭代器
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 `for...of` 和 `for...in` 的用法和区别。

**参考答案**：

| 特性 | `for...in` | `for...of` |
|------|-----------|-----------|
| 遍历目标 | 对象的可枚举属性键 | 可迭代对象的值 |
| 返回内容 | 键名（字符串） | 值 |
| 适用对象 | 普通对象 | 数组、字符串、Map、Set、Generator 等可迭代对象 |
| 原型链 | 会遍历原型链上的可枚举属性 | 不会 |

```js
const arr = ['a', 'b'];
for (const i in arr) console.log(i); // 0, 1
for (const v of arr) console.log(v); // a, b
```

**评分维度**：
- 说清遍历目标差异（40%）
- 说清返回值差异（30%）
- 说清适用对象差异（30%）

**常见错误**：
- 用 `for...in` 遍历数组索引时误以为是数字类型
- 用 `for...of` 遍历普通对象报错却不知原因

**延伸追问**：
- 如何让普通对象支持 `for...of`？
- `for...in` 如何过滤原型链属性？

**口头回答版**：
> | 特性 | for...in | for...of | |------|-----------|-----------| | 遍历目标 | 对象的可枚举属性键 | 可迭代对象的值 | | 返回内容 | 键名（字符串） | 值 |

---

### FB-01-CO-A-003：解释 `Object.defineProperty` 和 `Proxy` 的区别。

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：响应式、Object.defineProperty、Proxy、Vue
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 `Object.defineProperty` 和 `Proxy` 的区别，并说明为什么 Vue3 选择 Proxy。

**参考答案**：

| 特性 | `Object.defineProperty` | `Proxy` |
|------|------------------------|---------|
| 拦截能力 | 只能拦截已有属性的读写 | 可以拦截对象几乎所有操作 |
| 新增属性 | 检测不到 | 可以检测 |
| 数组 | 需要 hack 数组方法 | 原生支持 |
| 嵌套对象 | 需要递归处理 | 可以在 get 时懒代理 |
| 性能 | 对象属性多时性能较差 | 更优 |

Vue3 选择 Proxy 的原因：

1. 可以拦截新增/删除属性。
2. 原生支持数组索引和 length 修改。
3. 不需要初始化时递归遍历所有属性。
4. 更好的 Map/Set/WeakMap/WeakSet 支持。

**评分维度**：
- 列出 3 个以上区别（50%）
- 解释 Vue3 选择 Proxy 的原因（30%）
- 能举例说明（20%）

**常见错误**：
- 认为 Object.defineProperty 完全不能监听数组
- 不知道 Proxy 需要配合 Reflect 使用

**延伸追问**：
- `Proxy` 有哪些操作不能被拦截？
- `Reflect` 和 `Object` 上的方法有什么区别？

**口头回答版**：
> | 特性 | Object.defineProperty | Proxy | |------|------------------------|---------| | 拦截能力 | 只能拦截已有属性的读写 | 可以拦截对象几乎所有操作 | | 新增属性 | 检测不到 | 可以检测 |

---

### FB-01-CD-A-004：手写一个防抖（debounce）函数。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：防抖、debounce、闭包、定时器
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请手写一个防抖函数，并说明：

1. 基础版只支持延迟执行。
2. 增强版支持立即执行和取消。

**参考答案**：

```js
function debounce(fn, wait, immediate = false) {
  let timer = null;

  const debounced = function(...args) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    }
  };

  debounced.cancel = function() {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
```

**评分维度**：
- 基础防抖逻辑正确（40%）
- 支持 immediate 模式（30%）
- 支持 cancel（15%）
- 正确处理 this 指向（15%）

**常见错误**：
- 忘记保存和恢复 `this`
- 立即执行逻辑写反

**延伸追问**：
- 防抖和节流的区别？
- 手写一个节流函数。

**口头回答版**：
> （见代码示例）

---

### FB-01-CO-A-004：解释 `Symbol` 的用途。

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：Symbol、唯一性、迭代器、私有属性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `Symbol` 的主要用途。

**参考答案**：

1. **创建唯一属性键**：避免属性名冲突。
2. **定义迭代协议**：`Symbol.iterator`、`Symbol.asyncIterator`。
3. **内置 Symbol 方法**：`Symbol.toPrimitive`、`Symbol.toStringTag`、`Symbol.hasInstance`。
4. **模拟私有属性**：虽然不完全私有，但难以被常规枚举访问。

```js
const id = Symbol('id');
const user = { name: 'Tom' };
user[id] = 123;

console.log(Object.keys(user)); // ['name']
console.log(user[id]); // 123
```

**评分维度**：
- 说明唯一性（30%）
- 说明迭代协议相关 Symbol（30%）
- 举例说明（20%）
- 提到内置 Symbol（20%）

**常见错误**：
- 认为 `Symbol('a') === Symbol('a')`
- 用 `for...in` 遍历 Symbol 属性

**口头回答版**：
> 创建唯一属性键：避免属性名冲突。 定义迭代协议：Symbol.iterator、Symbol.asyncIterator。 内置 Symbol 方法：Symbol.toPrimitive、Symbol.toStringTag、Symbol.hasInstance。 模拟私有属性：虽然不完全私有，但难以被常规枚举访问。

---


---

### FB-01-CO-A-005：`Map`、`Set`、`WeakMap`、`WeakSet` 的区别和使用场景是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：Map/Set、WeakMap/WeakSet、es6
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 ES6 提供的 `Map`、`Set`、`WeakMap`、`WeakSet`，说明它们的特点、区别和典型使用场景。

**参考答案**：

| 特性 | `Map` | `Set` | `WeakMap` | `WeakSet` |
|------|-------|-------|-----------|-----------|
| 存储内容 | 键值对 | 唯一值 | 键值对（键必须是对象） | 唯一对象 |
| 键类型 | 任意类型 | 无键 | 对象 | 对象 |
| 可迭代 | 是 | 是 | 否 | 否 |
| 大小属性 | `size` | `size` | 无 | 无 |
| 垃圾回收 | 强引用 | 强引用 | 弱引用 | 弱引用 |
| 遍历方法 | `forEach`、`for...of` | `forEach`、`for...of` | 无 | 无 |

使用场景：

- **`Map`**：需要非字符串键，或需要保持插入顺序的键值集合。例如缓存带对象 key 的数据。
  ```js
  const map = new Map();
  map.set({ id: 1 }, 'data');
  ```
- **`Set`**：需要去重或判断成员是否存在。例如记录已访问的 ID。
  ```js
  const ids = new Set([1, 2, 2, 3]); // {1, 2, 3}
  ```
- **`WeakMap`**：需要给对象附加私有数据，且不影响该对象被垃圾回收。例如 DOM 节点元数据、类的私有字段实现。
- **`WeakSet`**：存储“只属于某个集合”的对象引用，不影响回收。例如标记对象是否被处理过。

> `WeakMap` / `WeakSet` 不可迭代、没有 `size`，因为弱引用对象可能被随时回收。

**评分维度**：
- 四类结构区别（50%）：键类型、可迭代性、弱引用
- 弱引用与垃圾回收（30%）：能否解释为什么 WeakMap 不可遍历
- 典型场景（20%）：能否举例说明

**常见错误**：
- 在 `WeakMap` 中使用原始值作为键，导致报错。
- 认为 `WeakMap` 可以遍历或获取大小。
- 在需要频繁遍历的场景误用 `WeakMap`。

**延伸追问**：
- 为什么 `WeakMap` 没有 `size` 和 `keys()`？
- 用 `WeakMap` 实现类的私有属性有什么优缺点？

**相关题目**：
- [FB-01-CD-B-002 对象/数组浅拷贝与合并](#FB-01-CD-B-002)
- [FB-01-CD-P-002 手写 LRU Cache](#FB-01-CD-P-002)

**参考资源**：
- [MDN - Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN - WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

**口头回答版**：
> | 特性 | Map | Set | WeakMap | WeakSet | |------|-------|-------|-----------|-----------| | 存储内容 | 键值对 | 唯一值 | 键值对（键必须是对象） | 唯一对象 | | 键类型 | 任意类型 | 无键 | 对象 | 对象 |

---

### FB-01-CA-A-003：下面代码的输出顺序是什么？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：async/await、Promise、事件循环、微任务
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');
setTimeout(() => console.log('setTimeout'), 0);
async1();
new Promise(resolve => {
  console.log('promise1');
  resolve();
}).then(() => console.log('promise2'));
console.log('script end');
```

请说出输出顺序，并解释每一步的原因。

**参考答案**：

输出顺序：

```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

执行过程：

1. `console.log('script start')` 同步执行。
2. 调用 `async1()`，进入函数体，`console.log('async1 start')` 同步执行。
3. 执行 `await async2()`：`async2()` 同步执行并返回一个 resolved Promise；`await` 会让 `async1` 函数体后续代码进入微任务队列。
4. 继续执行外层的同步代码：`new Promise` 的 executor 同步执行，输出 `promise1`，并把 `then` 回调放入微任务队列。
5. `console.log('script end')` 同步执行。
6. 同步代码执行完毕，开始清空微任务队列。先执行 `async1` 暂停点之后的代码，输出 `async1 end`（它先入队）。
7. 再执行 Promise 的 `then` 回调，输出 `promise2`。
8. 最后执行宏任务 `setTimeout`，输出 `setTimeout`。

**评分维度**：
- 正确输出顺序（50%）
- 解释 `await` 的微任务注册（30%）：能说明 await 后续代码进入微任务
- 解释 Promise executor 同步执行（20%）

**常见错误**：
- 认为 `await` 会阻塞主线程，导致 `script end` 后输出。
- 认为 `promise1` 在 `script end` 之后输出。
- 搞混 `async1 end` 和 `promise2` 的微任务顺序。

**延伸追问**：
- `await 1` 和 `await Promise.resolve(1)` 在事件循环中有区别吗？
- 如果 `async2` 返回一个 `new Promise((resolve) => setTimeout(resolve, 0))`，输出顺序会如何？

**相关题目**：
- [FB-01-CA-A-001 Promise 与 setTimeout 输出分析](#FB-01-CA-A-001)
- [FB-01-CA-P-001 async/await 基础输出分析](#FB-01-CA-P-001)

**参考资源**：
- [MDN - async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

**口头回答版**：
> console.log('script start') 同步执行。 调用 async1()，进入函数体，console.log('async1 start') 同步执行。 执行 await async2()：async2() 同步执行并返回一个 resolved Promise；await 会让 async1 函数体后续代码进入微任务队列。 继续执行外层的同步代码：new Promise 的 executor 同步执行，输出 promise1，并把 then 回调放入微任务队列。

---

### FB-01-CD-A-005：手写一个异步任务并发控制器。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：并发控制、Promise、异步、队列
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请实现一个函数 `parallelLimit(tasks, limit)`，用于并发执行一组返回 Promise 的任务，要求：

1. 最多同时执行 `limit` 个任务。
2. 返回结果按输入顺序排列。
3. 任意任务失败时，立即 reject。

**参考答案**：

```js
function parallelLimit(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = new Array(tasks.length);
    let running = 0;
    let completed = 0;
    let index = 0;
    let rejected = false;

    function runNext() {
      if (rejected) return;
      if (completed === tasks.length) {
        resolve(results);
        return;
      }

      while (running < limit && index < tasks.length) {
        const currentIndex = index++;
        running++;
        Promise.resolve(tasks[currentIndex]())
          .then(value => {
            results[currentIndex] = value;
            running--;
            completed++;
            runNext();
          }, reason => {
            if (rejected) return;
            rejected = true;
            reject(reason);
          });
      }
    }

    runNext();
  });
}

// 用法示例
const tasks = [1, 2, 3, 4].map(n => () =>
  new Promise(resolve => setTimeout(() => resolve(n * 10), 100))
);
parallelLimit(tasks, 2).then(console.log); // [10, 20, 30, 40]
```

核心思路：

- 维护一个“运行中”计数器 `running`，不超过 `limit`。
- 每当一个任务完成，从队列中补充新任务。
- 用 `currentIndex` 记录任务原始下标，保证结果顺序。
- 一旦有任务 reject，立刻结束整个流程。

**评分维度**：
- 并发数量控制（30%）：同时运行的任务不超过 limit
- 结果顺序保持（30%）：按 tasks 下标存放结果
- 错误处理（20%）：首个 reject 立即 reject
- 代码边界处理（20%）：空数组、limit 为 0 等边界

**常见错误**：
- 一次性用 `Promise.all(tasks.map(...))` 启动所有任务，失去并发限制。
- 结果没有按原数组顺序存放。
- 任务 reject 后继续执行其他任务，没有快速失败。
- 忘记 `tasks[i]()` 调用任务函数，而是直接传入 Promise。

**延伸追问**：
- 如何实现“失败的任务不影响其他任务”，等所有任务结束后再返回成功/失败结果？
- 如何实现一个带优先级的任务队列？

**相关题目**：
- [FB-01-CD-A-003 手写 Promise.all](#FB-01-CD-A-003)
- [FB-01-CD-A-006 函数柯里化与 compose](#FB-01-CD-A-006)

**参考资源**：
- [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

**口头回答版**：
> - 维护一个“运行中”计数器 running，不超过 limit。 - 每当一个任务完成，从队列中补充新任务。 - 用 currentIndex 记录任务原始下标，保证结果顺序。 - 一旦有任务 reject，立刻结束整个流程。

---

### FB-01-CO-A-006：ES6 `class` 继承的原理是什么？与 ES5 寄生组合式继承如何对应？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：class、继承、原型链、super、es6
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 ES6 `class` 和 `extends` 的底层原理，并说明它与 ES5 寄生组合式继承的对应关系。

**参考答案**：

`class` 本质上是**原型继承的语法糖**。通过 Babel 或手写转换，一段 `class` 代码大致等价于 ES5 的寄生组合式继承。

ES6 写法：

```js
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(`${this.name} makes a sound`); }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
```

对应 ES5 核心逻辑：

```js
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { console.log(this.name + ' makes a sound'); };

function Dog(name, breed) {
  Animal.call(this, name); // 对应 super(name)
  this.breed = breed;
}

// 继承原型
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 静态属性/方法继承
Object.setPrototypeOf(Dog, Animal);
```

关键点：

1. `extends` 通过 `Object.create(Super.prototype)` 建立子类原型链。
2. `super()` 在子类构造函数中等价于 `Super.call(this, ...args)`。
3. 子类实例的 `__proto__` 指向 `SubClass.prototype`，`SubClass.prototype.__proto__` 指向 `SuperClass.prototype`。
4. 静态方法通过 `Object.setPrototypeOf(SubClass, SuperClass)` 实现继承。

**评分维度**：
- 原型链建立（40%）：能否说清楚 prototype 和 __proto__ 的关系
- `super()` 语义（30%）：是否知道子类必须先调用 super 才能使用 this
- 与 ES5 寄生组合继承对应（30%）：能否手写出等价代码

**常见错误**：
- 认为 `class` 引入了全新的继承机制，完全脱离原型。
- 在子类构造函数中使用 `this` 之前没有调用 `super()`。
- 混淆 `super()` 和 `super.method()` 的用法。

**延伸追问**：
- `class` 声明会提升吗？和函数声明的提升有什么区别？
- 如何实现多重继承？有哪些限制？

**相关题目**：
- [FB-01-CO-B-010 什么是原型和原型链](#FB-01-CO-B-010)
- [FB-01-CO-A-007 `new` 操作符做了什么](#FB-01-CO-A-007)

**参考资源**：
- [MDN - class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)

**口头回答版**：
> class 本质上是原型继承的语法糖。 通过 Babel 或手写转换，一段 class 代码大致等价于 ES5 的寄生组合式继承。 对应 ES5 核心逻辑： extends 通过 Object.create(Super.prototype) 建立子类原型链。

---

### FB-01-CO-A-007：`new` 操作符在执行时具体做了哪些事？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：new、构造函数、this、原型链
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请详细说明 `new Constructor(...args)` 执行时，JavaScript 引擎具体做了哪些步骤。

**参考答案**：

`new` 操作符大致执行以下 4 步：

1. **创建新对象**：创建一个空对象 `{}`。
2. **绑定原型**：将新对象的 `__proto__` 指向构造函数的 `prototype` 属性。
   ```js
   obj.__proto__ = Constructor.prototype;
   ```
3. **绑定 `this` 并执行构造函数**：将构造函数中的 `this` 指向这个新对象，并执行构造函数体。
   ```js
   const result = Constructor.apply(obj, args);
   ```
4. **返回对象**：
   - 如果构造函数返回的是一个对象（包括函数），则返回该对象。
   - 否则返回新创建的实例对象。

手写实现：

```js
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return (result !== null && (typeof result === 'object' || typeof result === 'function'))
    ? result
    : obj;
}
```

**评分维度**：
- 四步流程（50%）：创建对象、绑定原型、执行构造、返回对象
- 原型绑定细节（30%）：能说出 `Object.create(Constructor.prototype)`
- 返回规则（20%）：构造函数返回对象时覆盖默认实例

**常见错误**：
- 忘记构造函数可以返回对象并覆盖默认实例。
- 认为 `new` 会改变构造函数内部的 `this` 绑定规则（其实是创建新对象后绑定）。
- 手写实现时使用 `obj.__proto__ = Constructor.prototype` 而不推荐 `Object.create`。

**延伸追问**：
- 如果构造函数显式 `return 1`，结果是什么？
- 如何实现一个 `new` 的 polyfill，同时支持 `new.target`？

**相关题目**：
- [FB-01-CO-B-010 什么是原型和原型链](#FB-01-CO-B-010)
- [FB-01-CO-A-006 ES6 class 继承原理](#FB-01-CO-A-006)

**参考资源**：
- [MDN - new 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

**口头回答版**：
> new 操作符大致执行以下 4 步： 创建新对象：创建一个空对象 {}。 绑定原型：将新对象的 __proto__ 指向构造函数的 prototype 属性。 绑定 this 并执行构造函数：将构造函数中的 this 指向这个新对象，并执行构造函数体。

---

### FB-01-CD-A-006：实现函数柯里化（curry）和函数组合（compose）。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：函数式编程、柯里化、compose、纯函数
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请手写实现 `curry`（柯里化）和 `compose`（函数组合），并说明什么是纯函数。

**参考答案**：

```js
// 柯里化：将多参数函数转换成一系列单参数函数
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

// 示例
function add(a, b, c) {
  return a + b + c;
}
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6

// 函数组合：从右向左执行 f(g(h(x)))
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// 管道：从左向右执行
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

// 示例
const double = x => x * 2;
const addOne = x => x + 1;
const composed = compose(double, addOne); // double(addOne(x))
console.log(composed(3)); // 8
```

**纯函数**：相同的输入永远产生相同的输出，且没有副作用（不修改外部状态、不操作 DOM、不发起请求）。

**评分维度**：
- `curry` 实现正确（40%）：支持分步传参和一次性传多个参数
- `compose` / `pipe` 实现正确（30%）：方向正确，可组合任意数量函数
- 纯函数理解（30%）：能解释无副作用和确定性输出

**常见错误**：
- `curry` 只支持单次传一个参数，不支持 `curriedAdd(1, 2)(3)`。
- `compose` 方向写反，变成从左到右。
- 没有保留 `this` 上下文（在需要时）。
- 把有副作用的函数也当作纯函数组合。

**延伸追问**：
- `lodash/fp` 中的 `compose` 和 `flow` 有什么区别？
- 柯里化在 React/Redux 中有哪些应用？

**参考资源**：
- [MDN - Function.prototype.length](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/length)

**口头回答版**：
> （见代码示例）

---

### FB-01-CO-A-008：`CommonJS` 和 `ES Module` 在循环依赖时的行为有什么不同？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：01 JavaScript
**标签**：模块化、循环依赖、CommonJS、ESM
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 `CommonJS` 和 `ES Module` 对循环依赖的处理方式有何不同，并解释为什么 ESM 更不容易出现“不完整导出”问题。

**参考答案**：

**CommonJS** 在运行时同步加载模块：

- `require` 第一次执行时会完整执行模块代码并缓存 `module.exports` 对象。
- 循环依赖时，后执行的模块拿到的可能是**尚未完成赋值的 exports 对象**。
- 因为导出的是值的拷贝，后续再修改 exports，已经拿到引用的模块不会感知。

```js
// a.js
const b = require('./b');
console.log('a.js b =', b);
module.exports = { name: 'a' };

// b.js
const a = require('./a');
console.log('b.js a =', a); // 可能拿到 {} 空对象
module.exports = { name: 'b' };
```

**ES Module** 在编译阶段静态分析依赖：

- 会先构建模块依赖图，再执行模块。
- 导出的是 **live binding**（活绑定），导入方始终访问导出方的最新值。
- 循环依赖时，虽然模块可能还没执行完，但导入方访问的是绑定；等到模块执行完毕后，绑定值会更新。
- 访问处于“暂时性死区”（TDZ）的绑定会抛出 `ReferenceError`。

```js
// a.mjs
import { foo } from './b.mjs';
export const bar = 'bar';

// b.mjs
import { bar } from './a.mjs'; // 活绑定，执行完 a 后 bar 才有值
export const foo = 'foo';
```

**评分维度**：
- CommonJS 循环依赖机制（30%）：拷贝、运行时加载、可能拿到不完整对象
- ESM 循环依赖机制（30%）：活绑定、静态分析、TDZ
- 示例对比（20%）：能写出典型循环依赖示例
- 工程意义（20%）：Tree Shaking、循环依赖可维护性

**常见错误**：
- 认为 CommonJS 也使用活绑定。
- 认为 ESM 完全不会出现循环依赖问题（TDZ 访问仍会报错）。
- 混淆 `require()` 与 `import()` 动态导入的加载时机。

**延伸追问**：
- Webpack 是如何把 ESM 和 CommonJS 混编的？循环依赖时行为会更像哪一种？
- 如何检测和避免项目中的循环依赖？

**相关题目**：
- [FB-01-CO-P-003 JavaScript 模块化发展历程](#FB-01-CO-P-003)

**参考资源**：
- [Node.js 文档 - 循环依赖](https://nodejs.org/api/modules.html#modules_cycles)
- [MDN - ES Module](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)

**口头回答版**：
> CommonJS 在运行时同步加载模块： - require 第一次执行时会完整执行模块代码并缓存 module.exports 对象。 - 循环依赖时，后执行的模块拿到的可能是尚未完成赋值的 exports 对象。 - 因为导出的是值的拷贝，后续再修改 exports，已经拿到引用的模块不会感知。



---
### FB-01-CO-A-012：Object.is 与 === 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：Object.is、严格相等、NaN、类型
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Object.is 和 === 在 NaN、+0、-0 上的差异。

**参考答案**：

=== 使用 SameValueZero 语义：NaN !== NaN，+0 === -0。Object.is 使用 SameValue 语义：NaN 等于 NaN，+0 不等于 -0。其他情况下两者结果一致。

    Object.is(NaN, NaN); // true
    Object.is(+0, -0);   // false
    NaN === NaN;         // false
    +0 === -0;           // true

**评分维度**：
- NaN 行为（40%）：是否能说出 Object.is(NaN,NaN) 为 true
- 零值差异（30%）：+0 与 -0 的处理
- 一般场景（30%）：其余情况一致

**常见错误**：
- 认为 Object.is 在所有情况下都与 === 相同
- 用 Object.is 判断对象引用相等，混淆值相等与引用相等
- 认为 +0 和 -0 在数学运算中永远无区别

**口头回答版**：
> Object.is 与 === 主要区别在于 NaN 相等和 +0/-0 不等，其余情况一致。

### FB-01-CD-A-009：手写 Promise.race

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：Promise、race、异步、手写代码
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
实现 Promise.race，返回第一个 settled 的 Promise 结果或原因。

**参考答案**：

遍历输入，给每个 Promise 注册 then/catch，第一个 settle 的调用 resolve/reject 后返回结果。输入为空数组时返回 pending 的 Promise，与规范一致。

    function promiseRace(iterable) {
      return new Promise((resolve, reject) => {
        for (const p of iterable) {
          Promise.resolve(p).then(resolve, reject);
        }
      });
    }

**评分维度**：
- 竞速逻辑（50%）：第一个 settled 决定结果
- 输入处理（30%）：非 Promise 值包装、空数组行为
- 错误处理（20%）：reject 时是否停止

**常见错误**：
- 用 forEach 导致异步开始，空数组行为不符
- 没有 Promise.resolve 包装非 Promise 值
- 第一个 reject 后没有立即返回，继续监听后续

**口头回答版**：
> Promise.race 返回第一个 settled 的结果。实现时要将非 Promise 包装，空数组返回 pending Promise。

### FB-01-CD-A-010：手写 Promise.any

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：Promise、any、AggregateError、手写代码
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
实现 Promise.any，返回第一个 fulfilled 的 Promise；全部 reject 时返回 AggregateError。

**参考答案**：

记录 reject 次数和错误数组。任一 Promise fulfill 立即 resolve；全部 reject 后 reject(new AggregateError(errors))。

    function promiseAny(iterable) {
      return new Promise((resolve, reject) => {
        const arr = Array.from(iterable);
        if (arr.length === 0) return reject(new AggregateError([], 'All promises were rejected'));
        const errors = new Array(arr.length);
        let count = 0;
        arr.forEach((p, i) => {
          Promise.resolve(p).then(resolve, err => {
            errors[i] = err;
            if (++count === arr.length) reject(new AggregateError(errors));
          });
        });
      });
    }

**评分维度**：
- 成功逻辑（40%）：任一 fulfill 立即 resolve
- 全部失败（40%）：AggregateError 收集所有原因
- 边界（20%）：空数组处理

**常见错误**：
- 全部 reject 时返回普通 Error 而非 AggregateError
- 使用 let 计数但没有初始化导致 NaN
- fulfill 后没有停止收集后续错误

**口头回答版**：
> Promise.any 返回首个成功，全部失败返回 AggregateError。实现时注意计数和错误收集。

### FB-01-CO-A-013：ArrayBuffer、SharedArrayBuffer 和 Atomics 各是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：ArrayBuffer、SharedArrayBuffer、Atomics、二进制
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释三者的作用、使用场景和安全限制。

**参考答案**：

ArrayBuffer 是固定长度的原始二进制数据缓冲区，需通过 TypedArray/DataView 读写。SharedArrayBuffer 允许多个 Worker 共享同一块内存。Atomics 提供原子操作和线程同步，避免竞态条件。

由于 Spectre 漏洞，SharedArrayBuffer 需要跨域隔离（COOP/COEP）才能启用。

**评分维度**：
- ArrayBuffer（30%）：二进制缓冲区与视图关系
- SharedArrayBuffer（30%）：多 Worker 共享内存
- Atomics（30%）：原子操作与锁
- 安全限制（10%）：COOP/COEP

**常见错误**：
- 直接用 ArrayBuffer 下标读写数据
- 在单线程场景使用 SharedArrayBuffer 没有收益但增加复杂度
- 多线程写入时不使用 Atomics，导致数据竞争

**口头回答版**：
> ArrayBuffer 是二进制缓冲区，SharedArrayBuffer 支持跨 Worker 共享，Atomics 提供原子操作和同步，启用需跨域隔离。

### FB-01-CD-A-011：手写一个 sleep / delay 函数

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：Promise、sleep、定时器、手写代码
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请用 Promise 实现 sleep(ms)，并说明与 setTimeout 的区别。

**参考答案**：

sleep 返回一个 Promise，在 ms 后 resolve，便于在 async/await 中暂停执行。

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function demo() {
      await sleep(1000);
      console.log('after 1s');
    }


**补充说明**：

在实际落地 手写一个 sleep / delay 函数 时，建议结合 Promise、sleep、定时器 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- Promise 包装（40%）：是否返回 Promise
- this/参数（30%）：是否透传 resolve 值
- 可取消（30%）：是否提供 AbortSignal 支持

**常见错误**：
- 返回 setTimeout 的 timer id 而非 Promise
- 用 async 函数包裹 setTimeout 但 await 位置错误
- 没有处理 ms 为负数或 0 的边界

**口头回答版**：
> sleep 用 Promise 包装 setTimeout，返回在指定时间后 resolve 的 Promise，方便在 async 函数中暂停。

### FB-01-CO-A-014：什么是尾调用优化？JavaScript 中有什么限制？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：尾调用、递归、性能、ES6
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释尾调用优化的原理，以及为什么实际引擎支持有限。

**参考答案**：

尾调用优化（TCO）指在函数最后一步调用另一个函数时复用当前栈帧，避免栈增长。ES6 规定了 TCO，但浏览器引擎（除 Safari）大多未实现严格模式下的 TCO。

实际中，递归深时建议改用循环或蹦床函数（trampoline）避免栈溢出。


**补充说明**：

在实际落地 尾调用优化JavaScript 中有什么限制 时，建议结合 尾调用、递归、性能 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 尾调用定义（40%）：调用位置与栈帧复用
- ES6 规定（30%）：仅在严格模式
- 实际限制（30%）：浏览器支持情况

**常见错误**：
- 认为所有 JavaScript 引擎都支持 TCO
- 把尾调用优化和代码末尾 return 任意表达式混为一谈
- 在非严格模式下期待 TCO 生效

**口头回答版**：
> 尾调用优化通过复用栈帧减少递归栈消耗，ES6 规定严格模式支持，但主流引擎大多未实现。

### FB-01-CD-A-012：手写一个 JSONP 函数

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：JSONP、跨域、手写代码、脚本注入
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
实现一个 jsonp(url, params, callbackName) 函数，通过动态 script 标签请求跨域数据。

**参考答案**：

JSONP 利用 script 标签不受同源策略限制，服务端返回 callbackName(data)。前端动态创建 script，注册全局回调，加载后清理脚本和全局函数。

    function jsonp(url, params = {}, callbackName = 'cb_' + Date.now()) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        window[callbackName] = data => {
          resolve(data);
          cleanup();
        };
        script.onerror = reject;
        const query = new URLSearchParams({ ...params, callback: callbackName }).toString();
        script.src = url + (url.includes('?') ? '&' : '?') + query;
        document.head.appendChild(script);
        function cleanup() {
          delete window[callbackName];
          script.remove();
        }
      });
    }

**评分维度**：
- 全局回调（40%）：动态注册与清理
- URL 拼接（30%）：参数编码与 callback 字段
- 错误处理（30%）：onerror 与超时

**常见错误**：
- 没有清理全局回调和 script 标签，造成内存泄漏
- callbackName 固定，多次调用互相覆盖
- 没有处理服务端返回非 JSON 或异常格式

**口头回答版**：
> JSONP 通过动态 script 和全局回调实现跨域，注意唯一回调名、错误处理和清理脚本节点。

### FB-01-CO-A-015：Symbol.iterator 与 Generator 的关系是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：Symbol.iterator、Generator、Iterable、迭代器
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释可迭代协议、迭代器协议，以及生成器如何实现它们。

**参考答案**：

Iterable 协议要求对象具有 Symbol.iterator 方法，返回 Iterator。Iterator 协议要求 next 返回 { value, done }。Generator 函数返回的 generator 对象同时满足 Iterator 和 Iterable，因此 for…of 可遍历生成器。

    function* gen() { yield 1; yield 2; }
    const it = gen();
    it[Symbol.iterator]() === it; // true

**评分维度**：
- Iterable（30%）：Symbol.iterator 方法
- Iterator（30%）：next 返回值
- Generator（40%）：既是迭代器也是可迭代对象

**常见错误**：
- 把 Generator 和 Promise 混为一谈
- 认为普通函数 yield 也能暂停执行
- 实现 Symbol.iterator 时返回对象没有 next 方法

**口头回答版**：
> Symbol.iterator 定义可迭代对象，Generator 返回的对象满足 Iterator 和 Iterable，可直接用于 for…of。

### FB-01-CD-A-013：手写一个 JSON.parse 的简化版

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：JSON、解析、递归下降、手写代码
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
实现一个简化版 myParse(str)，支持对象、数组、字符串、数字、true/false/null。

**参考答案**：

使用递归下降解析器：跳过空白，根据当前字符分发到对象、数组、字符串、数字或字面量。字符串处理转义；对象用 key:value 对；数组用逗号分隔元素。

实现时建议先写 tokenizer 将字符串切分为 token，再递归解析 AST。


**补充说明**：

在实际落地 手写一个 JSON.parse 的简化版 时，建议结合 JSON、解析、递归下降 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 分词（40%）：能否识别字符串、数字、字面量、符号
- 递归解析（40%）：对象、数组的嵌套处理
- 边界（20%）：空白、转义、非法输入

**常见错误**：
- 用 eval 直接解析，存在安全风险
- 字符串没有处理转义字符导致越界
- 逗号结尾的数组或对象没有容错

**口头回答版**：
> 手写 JSON.parse 通常使用 tokenizer + 递归下降，分别处理对象、数组、字符串、数字和字面量。

### FB-01-CO-A-016：eval、Function 构造函数和 new Function 有什么安全风险？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：eval、Function、XSS、安全
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较三者的作用域差异和安全风险。

**参考答案**：

eval 在当前作用域执行字符串代码，可访问局部变量，风险最高。Function / new Function 在全局作用域执行，无法直接访问局部变量，但仍可执行任意代码。

三者都会把字符串当代码执行，如果字符串来自用户输入，会导致 XSS 或代码注入。应尽量避免，改用 JSON.parse、模板引擎或沙箱方案。

**评分维度**：
- 作用域（40%）：eval 访问局部 vs Function 全局
- 注入风险（40%）：用户输入导致代码执行
- 替代方案（20%）：JSON.parse、沙箱

**常见错误**：
- 认为 new Function 完全安全
- 用 eval 解析 JSON
- 忽略 Function 仍可访问全局对象和 DOM

**口头回答版**：
> eval 在当前作用域执行且风险最高，Function 在全局作用域执行，三者都应避免用于不可信输入。

### FB-01-CD-A-014：手写一个模板字符串解析器

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：模板字符串、解析、插值、手写代码
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
实现 parseTemplate(template, data)，将 "Hello, ${name}!" 替换为 data 对应值。

**参考答案**：

使用正则 /\$\{([^}]+)\}/g 匹配插值表达式，用 with 或 Function 计算，或仅支持属性路径。需要处理嵌套对象和默认值。

    function parseTemplate(template, data) {
      return template.replace(/\$\{([^}]+)\}/g, (_, expr) => {
        const keys = expr.trim().split('.');
        let val = data;
        for (const k of keys) val = val?.[k];
        return val ?? '';
      });
    }

**评分维度**：
- 正则匹配（40%）：正确识别 ${...}
- 路径解析（30%）：支持嵌套属性
- 安全（30%）：避免用 eval 执行任意表达式

**常见错误**：
- 用 eval 直接执行插值表达式
- 没有处理表达式为空或包含嵌套括号的情况
- undefined 值没有给出默认值导致显示 undefined

**口头回答版**：
> 模板字符串解析器用正则匹配 ${...}，按属性路径取值，避免 eval 执行任意代码。

### FB-01-CO-A-017：import.meta 和动态 import 有什么作用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：import.meta、动态导入、ES Module、代码分割
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 import.meta 提供的信息以及 import() 的使用场景。

**参考答案**：

import.meta 是当前模块的元数据对象，包含 url 等属性。import() 返回 Promise，可在运行时按条件加载模块，天然支持代码分割和懒加载。

    const module = await import('./heavy.js');
    module.doSomething();

**评分维度**：
- import.meta（30%）：模块元数据 url
- 动态导入（40%）：运行时条件加载、代码分割
- 返回值（30%）：Promise 与命名空间对象

**常见错误**：
- 在 CommonJS 中直接使用 import.meta
- 把 import() 当成同步调用
- 动态导入路径使用纯变量导致打包工具无法分析代码分割

**口头回答版**：
> import.meta 提供模块元数据，import() 支持运行时动态加载和代码分割，返回 Promise。

### FB-01-CD-A-015：手写一个 EventEmitter（发布订阅）

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：EventEmitter、发布订阅、观察者模式、手写代码
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
实现 on、emit、off、once 方法。

**参考答案**：

使用 Map 存储事件名到监听器数组的映射。on 添加监听，once 包装为执行后自移除，emit 按注册顺序同步调用并传递参数，off 按引用移除。

    class EventEmitter {
      constructor() { this.events = new Map(); }
      on(name, fn) {
        if (!this.events.has(name)) this.events.set(name, []);
        this.events.get(name).push(fn);
      }
      emit(name, ...args) {
        (this.events.get(name) || []).forEach(fn => fn(...args));
      }
      off(name, fn) {
        const list = this.events.get(name) || [];
        this.events.set(name, list.filter(f => f !== fn));
      }
      once(name, fn) {
        const wrapper = (...args) => { this.off(name, wrapper); fn(...args); };
        this.on(name, wrapper);
      }
    }

**评分维度**：
- 数据结构（30%）：Map + 数组
- once 实现（30%）：包装函数自移除
- off 准确性（40%）：按引用移除

**常见错误**：
- emit 使用异步调用导致执行顺序不可预期
- off 时直接清空该事件所有监听器
- once 包装函数没有正确移除自身，导致重复执行

**口头回答版**：
> EventEmitter 用 Map 存事件与监听器数组，实现 on/emit/off/once，注意 once 的自移除。
---

## 深入题（15 道）{#proficient}

**口头回答版**：
> CommonJS 在运行时同步加载模块： - require 第一次执行时会完整执行模块代码并缓存 module.exports 对象。 - 循环依赖时，后执行的模块拿到的可能是尚未完成赋值的 exports 对象。 - 因为导出的是值的拷贝，后续再修改 exports，已经拿到引用的模块不会感知。

### FB-01-CO-P-001：解释 V8 的垃圾回收机制。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript
**标签**：V8、垃圾回收、分代回收、标记清除、增量标记
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请解释 V8 引擎的垃圾回收机制，包括分代回收、标记清除、增量标记等。

**参考答案**：

V8 采用**分代垃圾回收**策略：

1. **新生代（Young Generation）**：存放生命周期短的对象，使用 Scavenge 算法（Cheney 算法）。
   - 分为 From 和 To 两个半区。
   - 存活对象从 From 复制到 To，然后交换。
   - 经历两次 GC 仍存活的对象晋升到老生代。

2. **老生代（Old Generation）**：存放生命周期长的对象，使用标记-清除（Mark-Sweep）和标记-整理（Mark-Compact）。
   - **标记阶段**：从根对象出发，标记所有可达对象。
   - **清除阶段**：回收未标记对象。
   - **整理阶段**：将存活对象移到一端，减少内存碎片。

3. **优化策略**：
   - **增量标记（Incremental Marking）**：将标记过程拆分为小步骤，与 JS 执行交替进行，减少停顿。
   - **惰性清理（Lazy Sweeping）**：延迟清理，按需进行。
   - **并发标记（Concurrent Marking）**：辅助线程并行标记。

**评分维度**：
- 解释分代回收思想（30%）
- 解释新生代 Scavenge 算法（25%）
- 解释老生代标记-清除/整理（25%）
- 提到增量标记/并发标记等优化（20%）

**常见错误**：
- 只讲引用计数（JS 主流引擎不用引用计数）
- 认为所有对象都在同一个堆中统一回收

**延伸追问**：
- 什么情况下会导致内存泄漏？
- 如何排查和分析内存泄漏？

**参考资源**：
- [V8 Blog - Trash talk](https://v8.dev/blog/trash-talk)

**口头回答版**：
> V8 采用分代垃圾回收策略： 新生代（Young Generation）：存放生命周期短的对象，使用 Scavenge 算法（Cheney 算法）。 - 分为 From 和 To 两个半区。 - 存活对象从 From 复制到 To，然后交换。

---

### FB-01-CO-P-002：解释 JavaScript 的事件循环（Event Loop）完整机制。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript、03 Browser
**标签**：事件循环、宏任务、微任务、调用栈、消息队列
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请详细解释 JavaScript 的事件循环机制，包括调用栈、宏任务、微任务、渲染时机等。

**参考答案**：

JavaScript 是单线程语言，事件循环负责协调同步代码、异步任务、渲染等。

浏览器中的事件循环：

1. **调用栈（Call Stack）**：执行同步代码。
2. **宏任务队列（Macrotask Queue）**：`setTimeout`、`setInterval`、`setImmediate`（Node）、I/O、UI rendering。
3. **微任务队列（Microtask Queue）**：`Promise.then`、`MutationObserver`、`queueMicrotask`。
4. **执行流程**：
   - 执行一个宏任务。
   - 执行所有微任务（清空微任务队列）。
   - 如果需要，执行渲染（requestAnimationFrame、样式计算、布局、绘制）。
   - 进入下一轮循环。

Node.js 中的额外阶段：

- `timers` → `pending callbacks` → `idle, prepare` → `poll` → `check` → `close callbacks`。
- `process.nextTick` 优先级高于微任务。

**评分维度**：
- 解释调用栈和单线程模型（20%）
- 区分宏任务和微任务（30%）
- 说明执行顺序和清空规则（30%）
- 提到浏览器渲染时机或 Node 差异（20%）

**常见错误**：
- 认为微任务和宏任务在同一队列
- 认为 `setTimeout(..., 0)` 一定在 Promise.then 之前

**延伸追问**：
- `requestAnimationFrame` 在事件循环的哪个阶段执行？
- `process.nextTick` 和 `queueMicrotask` 的优先级？

**参考资源**：
- [MDN - Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Node.js Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

**口头回答版**：
> JavaScript 是单线程语言，事件循环负责协调同步代码、异步任务、渲染等。 浏览器中的事件循环： 调用栈（Call Stack）：执行同步代码。 宏任务队列（Macrotask Queue）：setTimeout、setInterval、setImmediate（Node）、I/O、UI rendering。

---

### FB-01-CD-P-001：手写一个符合 Promise/A+ 规范的 Promise。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript
**标签**：Promise、Promise/A+、手写实现、异步
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请手写一个符合 Promise/A+ 规范的 Promise 实现，至少支持：

1. `then` 方法
2. 链式调用
3. 异步 resolve/reject
4. 错误捕获

**参考答案**：

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(cb => cb());
      }
    };

    const reject = reason => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(cb => cb());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; };

    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
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
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(
      value => MyPromise.resolve(onFinally()).then(() => value),
      reason => MyPromise.resolve(onFinally()).then(() => { throw reason; })
    );
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle detected for promise'));
    return;
  }

  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called = false;
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
```

**评分维度**：
- 正确实现状态机（20%）
- 正确实现 then 的异步调用（20%）
- 正确处理 then 返回新 Promise（20%）
- 正确处理 thenable 对象（20%）
- 处理循环引用和异常（20%）

**常见错误**：
- then 回调同步执行
- 忽略 then 返回新 Promise
- 不处理 thenable 对象

**延伸追问**：
- Promise/A+ 规范中，为什么 then 必须异步执行？
- 如何实现 `Promise.all` / `Promise.race`？

**口头回答版**：
> （见代码示例）

---

### FB-01-CO-P-003：解释 JavaScript 的模块化发展历程。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript
**标签**：模块化、CommonJS、ESM、AMD、UMD
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 JavaScript 模块化的发展历程，以及 CommonJS、AMD、UMD、ESM 的区别。

**参考答案**：

1. **IIFE**：立即执行函数，避免全局污染。
2. **AMD（Asynchronous Module Definition）**：浏览器端异步加载，代表 RequireJS。
3. **CMD（Common Module Definition）**：sea.js，按需加载，依赖就近。
4. **CommonJS**：Node.js 使用，同步加载，`require` / `module.exports`。
5. **UMD（Universal Module Definition）**：兼容 AMD、CommonJS、全局变量。
6. **ESM（ES Modules）**：原生模块系统，`import` / `export`，静态分析，支持 Tree Shaking。

| 特性 | CommonJS | ESM |
|------|----------|-----|
| 加载时机 | 运行时同步加载 | 编译时静态解析 |
| 输出 | 值的拷贝 | 值的引用（live binding） |
| 顶层 this | `module.exports` | `undefined` |
| 循环依赖 | 可能得到不完整对象 | 支持较好 |
| Tree Shaking | 较难 | 原生支持 |

**评分维度**：
- 说出 4 种以上模块化方案（40%）
- 比较 CommonJS 和 ESM 差异（40%）
- 提到 Tree Shaking 和循环依赖（20%）

**常见错误**：
- 认为 CommonJS 也是静态分析
- 认为 ESM 不能动态 import

**延伸追问**：
- ESM 中的 `import()` 和 `import` 声明有什么区别？
- Webpack 是如何处理 CommonJS 和 ESM 混用的？

**口头回答版**：
> IIFE：立即执行函数，避免全局污染。 AMD（Asynchronous Module Definition）：浏览器端异步加载，代表 RequireJS。 CMD（Common Module Definition）：sea.js，按需加载，依赖就近。 CommonJS：Node.js 使用，同步加载，require / module.exports。

---

### FB-01-CA-P-001：下面代码的输出是什么？

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript
**标签**：async/await、Promise、事件循环、异常
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
async function foo() {
  console.log('foo start');
  await Promise.resolve();
  console.log('foo end');
}

console.log('script start');
foo();
console.log('script end');
```

请说出输出顺序。

**参考答案**：

```
script start
foo start
script end
foo end
```

解释：

1. `foo()` 被调用，`console.log('foo start')` 同步执行。
2. 遇到 `await Promise.resolve()`，`await` 后面的代码被放入微任务队列。
3. 继续执行外层同步代码 `console.log('script end')`。
4. 同步代码执行完毕，执行微任务 `console.log('foo end')`。

**评分维度**：
- 正确输出顺序（50%）
- 解释 await 的微任务注册（30%）
- 解释 async 函数执行流程（20%）

**常见错误**：
- 认为 `await` 后面的代码同步执行
- 搞不清 await 和普通 Promise.then 的等价关系

**延伸追问**：
- `await 1` 和 `await Promise.resolve(1)` 有区别吗？
- `async` 函数返回 rejected Promise 时，如何捕获？

**口头回答版**：
> foo() 被调用，console.log('foo start') 同步执行。 遇到 await Promise.resolve()，await 后面的代码被放入微任务队列。 继续执行外层同步代码 console.log('script end')。 同步代码执行完毕，执行微任务 console.log('foo end')。

---

### FB-01-CD-P-002：手写一个 LRU Cache。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript、08 数据结构与算法
**标签**：LRU、Cache、Map、链表
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请使用 JavaScript 实现一个 LRU（最近最少使用）缓存，要求 `get` 和 `put` 时间复杂度为 O(1)。

**参考答案**：

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // 移到最新
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}
```

思路：利用 `Map` 的键是有序的特性，最新访问的键会被移到末尾，最久未访问的键在开头。

**评分维度**：
- O(1) 时间复杂度（30%）
- 正确处理 get 刷新顺序（25%）
- 正确处理 put 淘汰逻辑（25%）
- 代码简洁可用（20%）

**常见错误**：
- 使用普通对象 + 数组维护顺序，导致 O(n)
- 忘记在 get 后更新使用顺序

**延伸追问**：
- 如何用双向链表 + HashMap 实现 LRU？
- 如果支持 TTL（过期时间），如何扩展？

**口头回答版**：
> 思路：利用 Map 的键是有序的特性，最新访问的键会被移到末尾，最久未访问的键在开头。

---

### FB-01-CO-P-004：解释 `Generator` 和 `Iterator` 的关系。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript
**标签**：Generator、Iterator、Symbol.iterator、协程
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Generator 和 Iterator 的关系，并说明 Generator 的应用场景。

**参考答案**：

- **Iterator（迭代器）**：实现了 `next()` 方法，返回 `{ value, done }` 的对象。
- **Iterable（可迭代对象）**：实现了 `Symbol.iterator` 方法，返回迭代器的对象。
- **Generator**：是 Iterator 的一种实现，通过 `function*` 定义，使用 `yield` 暂停执行。

Generator 的应用场景：

1. 实现自定义迭代器。
2. 异步流程控制（配合 co 库或 async/await 前身）。
3. 惰性计算、无限序列。
4. Redux-Saga 等副作用管理。

```js
function* idMaker() {
  let id = 0;
  while (true) yield id++;
}

const gen = idMaker();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
```

**评分维度**：
- 说清 Iterator / Iterable / Generator 关系（50%）
- 说明 next 返回值结构（20%）
- 举例应用场景（30%）

**常见错误**：
- 认为 Generator 和 async/await 完全无关
- 混淆 `Symbol.iterator` 和 `Symbol.asyncIterator`

**口头回答版**：
> - Iterator（迭代器）：实现了 next() 方法，返回 { value, done } 的对象。 - Iterable（可迭代对象）：实现了 Symbol.iterator 方法，返回迭代器的对象。 - Generator：是 Iterator 的一种实现，通过 function* 定义，使用 yield 暂停执行。 Generator 的应用场景：

---


---

### FB-01-CO-P-005：JavaScript 中常见的内存泄漏场景有哪些？如何排查？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript
**标签**：内存泄漏、垃圾回收、WeakRef、Performance
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请列举 JavaScript 中常见的内存泄漏场景，并说明在实际项目中如何发现和排查内存泄漏。

**参考答案**：

常见内存泄漏场景：

1. **意外的全局变量**
   ```js
   function leak() {
     foo = 'bar'; // 未声明，变成全局变量
   }
   ```

2. **闭包持有不再需要的引用**
   ```js
   function createBigData() {
     const bigData = new Array(1e6).fill('x');
     return function() {
       console.log(bigData[0]); // bigData 永远不会被释放
     };
   }
   ```

3. **未清理的定时器和回调**
   ```js
   const timer = setInterval(() => { ... }, 1000);
   // 组件卸载时未 clearInterval
   ```

4. **DOM 引用未释放**
   ```js
   const elements = {};
   elements.button = document.getElementById('btn');
   document.body.innerHTML = ''; // DOM 被移除，但 elements.button 仍引用它
   ```

5. **事件监听未移除**
   ```js
   element.addEventListener('click', handler);
   // 元素移除时未 removeEventListener
   ```

6. **缓存/Map 无限制增长**
   ```js
   const cache = new Map();
   // 持续 set 而不 delete，可使用 WeakMap 或 LRU 策略
   ```

排查方法：

- **Chrome DevTools Memory 面板**：
  - Heap Snapshot：对比操作前后的堆快照，查看新增对象。
  - Allocation instrumentation on timeline：记录内存分配时间线。
- **Performance 面板**：观察内存曲线是否持续上升。
- **弱引用**：使用 `WeakMap` / `WeakSet` / `WeakRef` 避免强引用导致无法回收。

**评分维度**：
- 识别常见泄漏场景（40%）：至少说出 4 种
- 解释泄漏根因（30%）：能否说清楚为什么无法回收
- 排查工具和方法（30%）：Heap Snapshot、Performance、WeakRef

**常见错误**：
- 认为现代引擎的 GC 能回收所有不再使用的内存。
- 把闭包等同于内存泄漏（合理使用的闭包不是泄漏）。
- 混淆 `WeakMap` 与 `WeakRef` 的用法。

**延伸追问**：
- `WeakRef` 和 `FinalizationRegistry` 有什么作用？
- 在 React 中，useEffect 返回的清理函数如何避免内存泄漏？

**相关题目**：
- [FB-01-CO-P-001 解释 V8 的垃圾回收机制](#FB-01-CO-P-001)
- [FB-01-CO-B-003 什么是闭包](#FB-01-CO-B-003)

**参考资源**：
- [V8 Blog - Trash talk](https://v8.dev/blog/trash-talk)
- [MDN - 内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_management)

**口头回答版**：
> 闭包持有不再需要的引用 未清理的定时器和回调 缓存/Map 无限制增长 - Chrome DevTools Memory 面板：

---

### FB-01-CA-P-002：下面代码的输出顺序是什么？`catch` 能否捕获到错误？

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript
**标签**：async/await、Promise、异常处理、微任务
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
async function foo() {
  console.log('a');
  await Promise.reject('err');
  console.log('b');
}

async function bar() {
  try {
    await foo();
  } catch (e) {
    console.log('c', e);
  }
  console.log('d');
}

console.log('e');
bar();
console.log('f');
```

请说出输出顺序，并解释 `catch` 是否能捕获到错误。

**参考答案**：

输出顺序：

```
e
a
f
c err
d
```

解释：

1. `console.log('e')` 同步执行。
2. 调用 `bar()`，进入 `try`，调用 `foo()`。
3. `foo()` 同步执行 `console.log('a')`，然后遇到 `await Promise.reject('err')`。
   - `foo()` 会立即返回一个 rejected Promise；
   - `foo()` 中 `await` 后面的代码（`console.log('b')`）不会执行。
4. `bar()` 在 `await foo()` 处挂起，交出执行权。
5. 继续执行外层同步代码 `console.log('f')`。
6. 同步代码执行完毕，清空微任务队列：`foo()` 的 rejected Promise 导致 `bar()` 的 `catch` 执行，输出 `c err`。
7. `catch` 之后继续执行 `bar()` 的剩余代码，输出 `d`。

`catch` **能够捕获到错误**，因为 `await` 会把 Promise 的 reject 转换成可抛出的异常。

**评分维度**：
- 正确输出顺序（50%）
- 异常捕获分析（30%）：能说明 await 与 try/catch 的关系
- 微任务时机（20%）：能解释 a/f/c/d 的先后

**常见错误**：
- 认为 `b` 也会输出。
- 认为 `catch` 捕获不到 `await` 的 reject。
- 认为 `f` 在 `c` 之前输出（正确），但说不清楚原因。

**延伸追问**：
- 如果 `foo` 中把 `await Promise.reject('err')` 换成 `throw 'err'`，结果有区别吗？
- 如何捕获多个 `await` 中的错误并汇总？

**相关题目**：
- [FB-01-CA-A-003 async/await 输出分析](#FB-01-CA-A-003)
- [FB-01-CD-P-001 手写符合 Promise/A+ 的 Promise](#FB-01-CD-P-001)

**参考资源**：
- [MDN - async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

**口头回答版**：
> console.log('e') 同步执行。 调用 bar()，进入 try，调用 foo()。 foo() 同步执行 console.log('a')，然后遇到 await Promise.reject('err')。 - foo() 会立即返回一个 rejected Promise；

---

### FB-01-CD-P-003：手写一个 Generator 自动执行器，支持 `yield Promise`。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript
**标签**：Generator、Promise、async/await、自动执行器
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在 `async/await` 出现之前，社区常用 `co` 之类的库让 Generator 自动执行异步流程。请手写一个类似 `co` 的自动执行器 `run(generatorFn)`，支持 `yield Promise`。

**参考答案**：

```js
function run(generatorFn) {
  return new Promise((resolve, reject) => {
    const gen = generatorFn();

    function next(value) {
      let result;
      try {
        result = gen.next(value);
      } catch (err) {
        return reject(err);
      }

      if (result.done) {
        return resolve(result.value);
      }

      Promise.resolve(result.value).then(
        val => next(val),
        err => {
          let throwResult;
          try {
            throwResult = gen.throw(err);
          } catch (e) {
            return reject(e);
          }
          next(throwResult.value);
        }
      );
    }

    next();
  });
}

// 用法示例
function* fetchUser() {
  const user = yield Promise.resolve({ id: 1, name: 'Tom' });
  const orders = yield Promise.resolve([1, 2, 3]);
  return { user, orders };
}

run(fetchUser).then(console.log); // { user: { id: 1, name: 'Tom' }, orders: [1, 2, 3] }
```

核心思路：

1. 调用 `generatorFn()` 得到迭代器 `gen`。
2. 反复调用 `gen.next(value)`，把上一次 `yield` 的返回值传入。
3. 对 `yield` 出的值用 `Promise.resolve()` 包装，支持 Promise、普通值、thenable。
4. 如果 Promise reject，调用 `gen.throw(err)` 让生成器内部可以用 `try/catch` 捕获。
5. 迭代器 `done` 为 `true` 时，resolve 最终结果。

**评分维度**：
- 迭代器驱动（30%）：正确使用 `gen.next` 和 `done`
- Promise 处理（30%）：包装 yield 值，按顺序执行
- 错误传播（20%）：reject 时调用 `gen.throw`
- 返回 Promise（20%）：整个执行器返回 Promise

**常见错误**：
- 同步递归调用 `next` 导致调用栈过深（应通过 `.then` 异步推进）。
- 忘记把 yield 值用 `Promise.resolve` 包装，导致非 Promise 值报错。
- 多个 `yield` 并行执行而不是按顺序等待。
- 错误没有传回 Generator 内部。

**延伸追问**：
- `async/await` 本质上是不是 Generator + Promise 自动执行器的语法糖？
- 如何让 Generator 支持 `yield [promise1, promise2]` 的并行执行？

**相关题目**：
- [FB-01-CO-P-004 解释 Generator 和 Iterator 的关系](#FB-01-CO-P-004)
- [FB-01-CD-A-006 函数柯里化与 compose](#FB-01-CD-A-006)

**参考资源**：
- [MDN - Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)
- [tj/co](https://github.com/tj/co)

**口头回答版**：
> 调用 generatorFn() 得到迭代器 gen。 反复调用 gen.next(value)，把上一次 yield 的返回值传入。 对 yield 出的值用 Promise.resolve() 包装，支持 Promise、普通值、thenable。 如果 Promise reject，调用 gen.throw(err) 让生成器内部可以用 try/catch 捕获。

---

### FB-01-CO-P-006：为什么 `Proxy` 通常要和 `Reflect` 一起使用？它们的关系是什么？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：01 JavaScript
**标签**：Proxy、Reflect、元编程、拦截器
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 `Proxy` 和 `Reflect` 的关系，并说明为什么使用 `Proxy` 时通常要配合 `Reflect`。

**参考答案**：

`Proxy` 用于定义对象基本操作的自定义行为（拦截），`Reflect` 则提供了一组与 `Proxy` trap 一一对应的默认操作方法。二者配合可以：

1. **保持默认行为**：在 trap 中通过 `Reflect` 调用默认实现，避免手动实现带来的遗漏。
2. **正确传递 `receiver`**：尤其是 `get` / `set` trap 中，`Reflect.get(target, key, receiver)` 会把 `this` 绑定正确传递，避免访问原型链或 getter/setter 时 `this` 错误。

示例：

```js
const obj = {
  _value: 0,
  get value() { return this._value; }
};

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('get', key);
    // 使用 Reflect 传递 receiver
    return Reflect.get(target, key, receiver);
    // 不要写 return target[key]; // this 会指向 target，可能出错
  }
});

const child = Object.create(proxy);
child._value = 100;
console.log(child.value); // get value -> 100
```

如果写 `target[key]`，`this` 会指向 `target` 而不是 `child`，导致结果错误。

对应关系：

| Proxy trap | Reflect 方法 |
|------------|--------------|
| `get` | `Reflect.get` |
| `set` | `Reflect.set` |
| `has` | `Reflect.has` |
| `deleteProperty` | `Reflect.deleteProperty` |
| `apply` | `Reflect.apply` |
| `construct` | `Reflect.construct` |

**评分维度**：
- Proxy / Reflect 关系（40%）：trap 与默认方法一一对应
- `receiver` 正确性（30%）：能解释为什么 get/set 要传 receiver
- 举例说明（30%）：能否写出 proxy + reflect 示例

**常见错误**：
- 认为 `Reflect` 是使用 `Proxy` 的必需条件（不是语法必需，但最佳实践）。
- 在 trap 中直接访问 `target[key]`，丢失 `receiver`，导致 getter/setter 中 `this` 指向错误。
- 混淆 `Reflect` 和 `Object` 上同名方法的区别（如 `Reflect.set` 返回布尔值）。

**延伸追问**：
- `Proxy` 有哪些操作是不能拦截的？
- `Reflect` 的方法与 `Object` 的方法相比，返回值有什么不同？

**相关题目**：
- [FB-01-CO-A-003 `Object.defineProperty` 和 `Proxy` 的区别](#FB-01-CO-A-003)

**参考资源**：
- [MDN - Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN - Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

**口头回答版**：
> Proxy 用于定义对象基本操作的自定义行为（拦截），Reflect 则提供了一组与 Proxy trap 一一对应的默认操作方法。 保持默认行为：在 trap 中通过 Reflect 调用默认实现，避免手动实现带来的遗漏。 正确传递 receiver：尤其是 get / set trap 中，Reflect.get(target, key, receiver) 会把 this 绑定正确传递，避免访问原型链或 getter/setter 时 this 错误。 如果写 target[key]，this 会指向 target 而不是 child，导致结果错误。



---
### FB-01-CO-P-009：Top-level await 是什么？有什么兼容和降级方案？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：01 JavaScript
**标签**：Top-level await、ES Module、异步、兼容性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Top-level await 的语义、使用限制和降级方案。

**参考答案**：

Top-level await 允许在 ES Module 顶层直接使用 await，使模块本身变为异步。它会阻塞模块图中后续依赖的执行，直到 Promise settle。

降级方案：在模块内导出一个 async 函数或 Promise，由消费方 await；构建工具如 Webpack/Vite 会自动转换部分用法。

**评分维度**：
- 语义（40%）：模块变为异步，阻塞依赖
- 使用限制（30%）：仅在 ESM 顶层
- 降级（30%）：导出 async 函数/Promise

**常见错误**：
- 在 CommonJS 或 IIFE 中直接使用顶层 await
- 认为 Top-level await 不影响模块加载顺序
- 未考虑循环依赖导致的死锁风险

**口头回答版**：
> Top-level await 让模块本身异步，阻塞后续依赖，适用于 ESM，旧环境可导出 Promise 或 async 函数降级。

### FB-01-CD-P-006：手写一个带并发限制的异步任务调度器

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：01 JavaScript
**标签**：并发控制、调度器、Promise、手写代码
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
实现 Scheduler(max)，支持 add(promiseFactory) 按最大并发数执行异步任务。

**参考答案**：

维护运行中任务数和等待队列。add 时如果运行数小于 max 立即执行；否则入队。任务完成后从队列取出下一个执行，并 resolve 原始 Promise。

    class Scheduler {
      constructor(max) { this.max = max; this.running = 0; this.queue = []; }
      add(promiseFactory) {
        return new Promise((resolve, reject) => {
          this.queue.push({ promiseFactory, resolve, reject });
          this.run();
        });
      }
      run() {
        while (this.running < this.max && this.queue.length) {
          const { promiseFactory, resolve, reject } = this.queue.shift();
          this.running++;
          promiseFactory().then(resolve, reject).finally(() => { this.running--; this.run(); });
        }
      }
    }

**评分维度**：
- 并发控制（40%）：max/running 计数
- 队列管理（30%）：等待队列与任务复用
- Promise 透传（30%）：resolve/reject 结果返回

**常见错误**：
- 所有任务一次性启动，没有限制并发
- 使用数组 splice 导致性能差且顺序错乱
- 没有处理 promiseFactory 抛出的同步异常

**口头回答版**：
> 带并发限制的调度器用计数器和等待队列控制同时运行的任务数，并正确透传每个任务的结果。

### FB-01-CO-P-010：Temporal API 是什么？它解决了 Date 的哪些问题？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：01 JavaScript
**标签**：Temporal、Date、时间处理、提案
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍 Temporal API 的设计目标和主要对象。

**参考答案**：

Temporal 是 ECMAScript 新的日期/时间提案，提供不可变对象、纳秒精度、显式时区处理，以及 Duration、Instant、ZonedDateTime 等类型。它解决了原生 Date 的可变性、时区混乱和 2038 年问题。

目前可通过 polyfill 使用，生产环境需评估浏览器支持。

**评分维度**：
- 不可变（30%）：避免修改现有对象
- 类型化（30%）：Instant/PlainDate/ZonedDateTime
- 时区（40%）：显式时区与夏令时

**常见错误**：
- 认为 Temporal 已原生广泛支持
- 把 Temporal 和 Moment.js 混为一谈
- 忽略 Temporal 的 API 与 Date 不兼容需要迁移成本

**口头回答版**：
> Temporal API 提供不可变、类型化、纳秒精度的日期时间处理，解决原生 Date 的时区和可变性痛点。

### FB-01-SC-P-002：设计一个前端路由拦截与权限校验系统

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：01 JavaScript
**标签**：路由拦截、权限校验、前端路由、设计
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个支持白名单、角色、异步权限拉取和降级处理的路由守卫系统。

**参考答案**：

核心模块：路由配置表附加 meta.roles/permissions；全局 beforeEach 守卫按顺序执行鉴权；权限服务支持同步校验和异步拉取；未通过时重定向到登录或 403。

    router.beforeEach(async (to, from, next) => {
      const permitted = await authService.check(to);
      if (permitted) next(); else next('/403');
    });

**评分维度**：
- 拦截点（30%）：全局/路由/组件守卫
- 权限模型（30%）：角色、资源、动态拉取
- 降级与缓存（40%）：无权限跳转、权限缓存

**常见错误**：
- 在组件内才做权限校验，导致路由已切换
- 每次路由都同步请求权限接口造成阻塞
- 没有处理权限校验异常导致页面卡死

**口头回答版**：
> 路由拦截与权限校验系统应在全局守卫中根据角色/权限判断，支持异步拉取并做降级和缓存。
---

## 架构题（28 道）{#architect}

**口头回答版**：
> Proxy 用于定义对象基本操作的自定义行为（拦截），Reflect 则提供了一组与 Proxy trap 一一对应的默认操作方法。 保持默认行为：在 trap 中通过 Reflect 调用默认实现，避免手动实现带来的遗漏。 正确传递 receiver：尤其是 get / set trap 中，Reflect.get(target, key, receiver) 会把 this 绑定正确传递，避免访问原型链或 getter/setter 时 this 错误。 如果写 target[key]，this 会指向 target 而不是 child，导致结果错误。

### FB-01-SD-R-001：如何设计一个前端代码执行沙箱？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：01 JavaScript、05 Web 安全、25 系统架构设计
**标签**：沙箱、安全、代码执行、iframe、Web Worker
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
假设你的平台需要运行用户提交的 JavaScript 代码（例如在线代码编辑器、低代码平台、面试题在线运行），如何设计一个安全沙箱？

**参考答案**：

核心目标：隔离用户代码，防止 XSS、数据窃取、恶意请求、资源耗尽。

方案对比：

| 方案 | 优点 | 缺点 |
|------|------|------|
| `with` + Proxy | 轻量 | 隔离不彻底，可逃逸 |
| `iframe` + `sandbox` | 浏览器原生隔离 | 通信复杂，性能一般 |
| Web Worker + 受控 API | 无 DOM 访问，线程隔离 | 无法操作 DOM |
| 服务端容器（Docker） | 完全隔离 | 成本高，延迟大 |
| WebAssembly 解释器 | 可完全控制执行环境 | 实现复杂 |

推荐架构（前端沙箱）：

1. **第一层：iframe sandbox**：
   - `<iframe sandbox="allow-scripts">`
   - 独立 origin，限制表单提交、弹窗、导航。

2. **第二层：CSP**：
   - 设置 `Content-Security-Policy: default-src 'none'; script-src 'unsafe-inline'`
   - 禁止外部资源加载。

3. **第三层：受控 API 白名单**：
   - 通过 `postMessage` 提供受控 API。
   - 拦截 `fetch`、`XMLHttpRequest`、`localStorage`。

4. **第四层：资源限制**：
   - 超时中断（用 Worker + Atomics 或 Service Worker）。
   - 内存/CPU 使用监控。

5. **第五层：服务端兜底**：
   - 高危操作（如网络请求、文件系统）必须走服务端鉴权。

**评分维度**：
- 识别安全风险（XSS、数据泄露、资源耗尽）（25%）
- 提出多层隔离方案（30%）
- 比较不同沙箱方案优劣（25%）
- 提到 iframe sandbox / CSP / 受控 API（20%）

**常见错误**：
- 认为 eval + try-catch 就是沙箱
- 忽略同源策略和 postMessage 安全性

**延伸追问**：
- 如何防止用户代码执行 `while(true)` 导致页面卡死？
- 如果需要沙箱内操作 DOM，有哪些方案？

**口头回答版**：
> 核心目标：隔离用户代码，防止 XSS、数据窃取、恶意请求、资源耗尽。 | 方案 | 优点 | 缺点 | |------|------|------| | with + Proxy | 轻量 | 隔离不彻底，可逃逸 |

---

### FB-01-SD-R-002：如何设计一个前端脚本加载器？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：01 JavaScript、25 系统架构设计、10 构建工具
**标签**：脚本加载、模块加载、动态加载、性能优化
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端脚本加载器，支持：

1. 动态加载 JS/CSS。
2. 支持并行加载和依赖管理。
3. 支持缓存和错误重试。
4. 支持加载超时控制。

**参考答案**：

```js
class ScriptLoader {
  constructor() {
    this.cache = new Map();
  }

  loadScript(url, options = {}) {
    const { timeout = 10000, retries = 1 } = options;

    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    const promise = this._doLoad(url, timeout, retries);
    this.cache.set(url, promise);
    return promise;
  }

  _doLoad(url, timeout, retries) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;

      const timer = setTimeout(() => {
        cleanup();
        this._retryOrReject(url, timeout, retries, reject);
      }, timeout);

      const cleanup = () => {
        clearTimeout(timer);
        script.onload = null;
        script.onerror = null;
      };

      script.onload = () => {
        cleanup();
        resolve();
      };

      script.onerror = () => {
        cleanup();
        this._retryOrReject(url, timeout, retries, reject);
      };

      document.head.appendChild(script);
    });
  }

  _retryOrReject(url, timeout, retries, reject) {
    if (retries > 0) {
      this._doLoad(url, timeout, retries - 1).then(resolve, reject);
    } else {
      reject(new Error(`Failed to load ${url}`));
    }
  }
}
```

架构要点：

1. **缓存**：避免重复加载同一脚本。
2. **依赖管理**：维护 DAG，拓扑排序后按顺序加载。
3. **错误处理**：网络失败重试、加载超时。
4. **性能**：支持 preload / prefetch、按需加载、并发加载无依赖脚本。
5. **安全**：校验 URL 白名单，防止加载恶意脚本。

**评分维度**：
- 实现基本加载逻辑（20%）
- 支持缓存（20%）
- 支持超时和重试（20%）
- 支持依赖管理思路（20%）
- 提到性能和安全优化（20%）

**常见错误**：
- 不处理重复加载
- 忽略 CSS 加载和 JS 加载的差异
- 没有超时控制

**延伸追问**：
- 如何实现 ES Module 的动态加载器？
- SystemJS 的设计思路是什么？

**口头回答版**：
> 缓存：避免重复加载同一脚本。 依赖管理：维护 DAG，拓扑排序后按顺序加载。 错误处理：网络失败重试、加载超时。 性能：支持 preload / prefetch、按需加载、并发加载无依赖脚本。

---

### FB-01-SC-R-001：在低代码平台中，如何安全执行用户自定义的 JavaScript 逻辑？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：01 JavaScript、52 低代码、05 Web 安全
**标签**：低代码、沙箱、DSL、安全、代码执行
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
在低代码平台中，用户可能需要写自定义校验、事件处理、数据转换逻辑。如何在保证安全的前提下执行这些用户代码？

**参考答案**：

整体策略：**限制能力 > 完全隔离**，根据风险等级选择执行环境。

方案 1：受限 DSL（推荐低风险场景）

- 不提供完整 JS，只提供表达式语言（如 JSON Schema 表达式、公式引擎）。
- 预定义函数白名单，禁止访问 DOM、网络、存储。

方案 2：Worker 沙箱

- 用户代码在 Web Worker 中运行，禁止访问主线程 DOM。
- 通过 `postMessage` 与主线程通信，所有 API 调用需白名单校验。

方案 3：iframe 沙箱

- 需要操作 DOM 时，使用 `sandbox="allow-scripts"` 的 iframe。
- 通过 `postMessage` 控制可访问能力。

方案 4：AST 静态分析 + 动态拦截

- 解析用户代码 AST，检测危险 API（eval、Function、fetch、document）。
- 运行时通过 Proxy 拦截全局对象访问。

安全要点：

1. 禁止 `eval`、`Function`、`setTimeout` 字符串形式。
2. 禁止访问 `window`、`document`、`localStorage` 等全局对象。
3. 所有外部调用走受控 API，记录审计日志。
4. 执行超时和内存限制。
5. 代码签名或版本控制，便于回滚。

**评分维度**：
- 识别低代码场景下的安全风险（25%）
- 提出 DSL / Worker / iframe 等多层方案（30%）
- 说明 API 白名单和审计机制（25%）
- 提到 AST 分析和运行时拦截（20%）

**常见错误**：
- 直接在前端主线程执行用户代码
- 只依赖 try-catch 做安全兜底

**延伸追问**：
- 如果用户需要访问平台上下文（如当前表单数据），如何安全传递？
- 如何设计一个可扩展的公式引擎？

**口头回答版**：
> 整体策略：限制能力 > 完全隔离，根据风险等级选择执行环境。 方案 1：受限 DSL（推荐低风险场景） - 不提供完整 JS，只提供表达式语言（如 JSON Schema 表达式、公式引擎）。 - 预定义函数白名单，禁止访问 DOM、网络、存储。

---

### FB-01-CP-R-001：从架构师角度，如何为大型前端团队制定 JavaScript 代码规范？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：01 JavaScript、22 部署与 SRE、38 团队领导力
**标签**：代码规范、ESLint、TypeScript、团队治理、架构决策
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
作为前端架构师，你需要为一个 100+ 人的大型前端团队制定 JavaScript 代码规范。请从 tooling、流程、文化三个维度说明你的方案。

**参考答案**：

1. **Tooling（工具层）**：
   - 使用 TypeScript 作为默认语言，减少运行时错误。
   - 统一 ESLint + Prettier 配置，使用 `@eslint/js` + `typescript-eslint`。
   - 引入 Husky + lint-staged，提交前自动格式化。
   - 使用 SonarQube / CodeClimate 做代码质量门禁。
   - 自定义 ESLint 插件，约束团队特定规则（如禁止直接操作 DOM、强制使用设计系统组件）。

2. **流程层**：
   - 规范纳入 CI，MR 必须 lint 通过。
   - Code Review Checklist 中包含规范项。
   - 定期（每季度）Review 规范，根据团队反馈调整。
   - 规范变更通过 RFC 流程，避免频繁变动。

3. **文化层**：
   - 编写《前端开发手册》，用案例说明为什么这样写。
   - 设立"规范Owner"，负责解释和推广。
   - 将规范遵守情况纳入技术考核，但不作为唯一指标。
   - 鼓励团队提出改进建议，保持规范的活力。

**评分维度**：
- tooling 方案具体可行（35%）
- 流程设计完整（35%）
- 文化推广思路清晰（30%）

**常见错误**：
- 只讲 ESLint 配置，忽略流程和文化
- 规范过于严苛，导致团队抵触

**延伸追问**：
- 如何处理遗留代码的规范迁移？
- 当规范与业务交付冲突时，如何取舍？

**口头回答版**：
> Tooling（工具层）： - 使用 TypeScript 作为默认语言，减少运行时错误。 - 统一 ESLint + Prettier 配置，使用 @eslint/js + typescript-eslint。 - 引入 Husky + lint-staged，提交前自动格式化。

---

---

### FB-01-SD-R-003：如何设计一个前端错误监控 SDK？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：01 JavaScript、30 可观测性
**标签**：错误监控、SDK、可观测性、前端工程化
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
假设你需要为一个大中型前端项目设计一个错误监控 SDK，用于收集、上报和分析线上错误。请从采集、上报、采样、上下文、存储与展示等维度说明你的设计方案。

**参考答案**：

一个完整的前端错误监控 SDK 可分为五层：

1. **采集层（Capture）**
   - 监听全局错误：
     - `window.onerror`：捕获 JavaScript 运行时异常。
     - `window.addEventListener('error', ...)`：捕获资源加载错误（图片、脚本、CSS）。
     - `window.addEventListener('unhandledrejection', ...)`：捕获未处理的 Promise 拒绝。
   - 框架集成：
     - Vue：`Vue.config.errorHandler`
     - React：`ErrorBoundary` + `componentDidCatch`
   - 手动上报：`sdk.captureError(error, context)`。

2. **上下文层（Context）**
   - 每次错误都应附带丰富上下文，便于复现：
     - 用户/会话 ID、页面 URL、路由、浏览器版本、设备信息。
     - 错误堆栈、源码位置（需 Source Map 反解）。
     - 用户操作轨迹（breadcrumb）：点击、路由跳转、API 请求等。
     - 环境信息：release 版本、构建号。

3. **处理与采样层（Process & Sampling）**
   - 去重：根据错误指纹（message + stack 前 N 行）合并重复错误。
   - 采样：对高频错误按比例采样，避免流量洪峰。
   - 脱敏：过滤掉 URL 中的 token、手机号、身份证号等敏感字段。
   - 阈值：设置单用户/单会话错误上限，防止单个异常循环导致雪崩。

4. **上报层（Report）**
   - 优先使用 `navigator.sendBeacon`（页面关闭时可靠发送）。
   - 降级使用 `fetch` / `XMLHttpRequest`。
   - 批量上报：本地缓存多个错误后一次性发送，减少请求数。
   - 失败重试：指数退避，避免对服务端造成压力。

5. **存储与展示层（Storage & Visualization）**
   - 服务端按项目/版本/错误类型聚合，提供趋势图、影响用户数、首次/最近出现时间。
   - 告警：当错误量突增或出现 P0 错误时触发告警（钉钉/飞书/邮件）。
   - Source Map 管理：上传构建产物，线上堆栈映射回源码行列号。

架构示意图：

```
前端 SDK
  ├─ 采集（onerror / unhandledrejection / 框架钩子）
  ├─ 上下文（user / url / stack / breadcrumb）
  ├─ 处理（去重 / 采样 / 脱敏）
  ├─ 上报（sendBeacon / fetch，批量+重试）
  └─ 服务端（聚合 / Source Map / 告警 / 看板）
```

**评分维度**：
- 错误采集完整性（25%）：是否覆盖 JS 异常、Promise 异常、资源错误、框架错误
- 上下文与可复现性（25%）：是否提到堆栈、Source Map、用户轨迹
- 采样与上报策略（25%）：是否考虑批量、采样、重试、页面关闭
- 性能与隐私（25%）：是否考虑 SDK 体积、异步加载、敏感信息脱敏

**常见错误**：
- 所有错误都同步即时上报，导致页面性能下降或请求阻塞。
- 只监听 `window.onerror`，忽略 Promise 和资源错误。
- 上报原始堆栈但不管理 Source Map，无法定位源码。
- 没有采样和限流，服务端被海量重复错误冲垮。

**延伸追问**：
- 如果错误发生在页面加载完成之前，SDK 如何确保不丢错误？
- 如何设计一个“用户录屏回放”能力来辅助错误复现？

**相关题目**：
- [FB-01-CO-B-015 JavaScript 异常处理](#FB-01-CO-B-015)
- [FB-01-SD-R-001 如何设计一个前端代码执行沙箱](#FB-01-SD-R-001)

**参考资源**：
- [Sentry 官方文档](https://docs.sentry.io/platforms/javascript/)
- [MDN - Reporting API](https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API)


## 统计

> 当前文件题目数量：56 道
> 目标题目数量：300 道
> 完成度：18.7%

**口头回答版**：
> 一个完整的前端错误监控 SDK 可分为五层： 采集层（Capture） - window.onerror：捕获 JavaScript 运行时异常。 - window.addEventListener('error', ...)：捕获资源加载错误（图片、脚本、CSS）。
### FB-01-CO-B-017：JavaScript 有哪些数据类型？如何区分原始类型和引用类型？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
JavaScript 有哪些数据类型？如何区分原始类型和引用类型。

**参考答案**：

- 原始类型：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`、`bigint`。
- 引用类型：`object`（Object、Array、Function、Date、RegExp 等）。
- 区别：原始类型存的是值本身，赋值时拷贝值；引用类型存的是指向堆内存的引用，赋值时拷贝引用，多个变量可能共享同一块内存。

**评分维度**：
- 完整列出 7 种原始类型（37%）。
- 说出赋值/拷贝差异（38%）。
- 能举例说明（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 原始类型：string、number、boolean、null、undefined、symbol、bigint。 - 引用类型：object（Object、Array、Function、Date、RegExp 等）。 - 区别：原始类型存的是值本身，赋值时拷贝值；引用类型存的是指向堆内存的引用，赋值时拷贝引用，多个变量可能共享同一块内存。

---

### FB-01-CP-B-001：`==` 和 `===` 的区别？什么情况下推荐使用 `==`？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
`==` 和 `===` 的区别？什么情况下推荐使用 `==`。

**参考答案**：

- `===` 是严格相等，要求类型和值都相同，不会做类型转换。
- `==` 是抽象相等，会做类型转换后再比较。
- 推荐始终使用 `===`/`!==`，避免隐式转换带来的意外结果（如 `[] == ![]` 为 true）。
- 极少数场景可用 `==`，例如判断 `null` 或 `undefined`：`x == null` 等价于 `x === null || x === undefined`。


**补充说明**：

在实际落地 `==` 和 `===` 的区别什么情况下推荐使用 `==` 时，建议结合 es6、Promise、事件循环 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 说清类型转换差异（43%）。
- 举例说明隐式转换坑点（28%）。
- 提到 `== null` 的合理使用场景（29%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - === 是严格相等，要求类型和值都相同，不会做类型转换。 - == 是抽象相等，会做类型转换后再比较。 - 推荐始终使用 ===/!==，避免隐式转换带来的意外结果（如 [] == ![] 为 true）。 - 极少数场景可用 ==，例如判断 null 或 undefined：x == null 等价于 x === null || x === undefined。

---

### FB-01-CP-B-002：什么是变量提升？`let`、`const`、`var` 的区别？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是变量提升？`let`、`const`、`var` 的区别。

**参考答案**：

- 变量提升：变量和函数声明在编译阶段被移动到作用域顶部。
- `var`：函数作用域，存在提升，可重复声明。
- `let`/`const`：块级作用域，存在提升但处于 TDZ（暂时性死区），访问会报 ReferenceError；`const` 声明时必须初始化，且不能重新赋值（但对象属性可变）。


**补充说明**：

在实际落地 变量提升`let`、`const`、`var` 的区别 时，建议结合 es6、Promise、事件循环 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 解释变量提升概念（25%）。
- 区分作用域、TDZ、重复声明、可变性（50%）。
- 能写出 TDZ 示例（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 变量提升：变量和函数声明在编译阶段被移动到作用域顶部。 - var：函数作用域，存在提升，可重复声明。 - let/const：块级作用域，存在提升但处于 TDZ（暂时性死区），访问会报 ReferenceError；const 声明时必须初始化，且不能重新赋值（但对象属性可变）。

---

### FB-01-SC-B-001：解释一下闭包，并举一个实际应用场景。

**题型**：场景设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
解释一下闭包，并举一个实际应用场景。。

**参考答案**：

- 闭包：函数能够记住并访问它词法作用域中的变量，即使该函数在当前作用域外执行。
- 应用：
  - 模块模式：隐藏内部变量，暴露接口。
  - 防抖/节流：保存定时器状态。
  - 计数器/缓存：保持私有状态。

```js
function makeCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}
```


**补充说明**：

在实际落地 解释一下闭包，并举一个实际应用场景。 时，建议结合 es6、Promise、事件循环 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 定义准确（43%）。
- 至少举出一个实际应用（28%）。
- 提到内存泄漏风险（29%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 闭包：函数能够记住并访问它词法作用域中的变量，即使该函数在当前作用域外执行。 - 应用：   - 模块模式：隐藏内部变量，暴露接口。 - 防抖/节流：保存定时器状态。 - 计数器/缓存：保持私有状态。

---

### FB-01-CP-B-003：箭头函数和普通函数的区别？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
箭头函数和普通函数的区别。

**参考答案**：

- 箭头函数没有自己的 `this`、`arguments`、`super`、`new.target`。
- 不能用作构造函数，不能使用 `new`。
- 没有 `prototype` 属性。
- 不能用 `call`/`apply`/`bind` 改变 this。
- 更简洁，适合回调、函数式编程。


**补充说明**：

在实际落地 箭头函数和普通函数的区别 时，建议结合 es6、Promise、事件循环 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 说出 this 差异（37%）。
- 说出 arguments、constructor、prototype 差异（38%）。
- 能举例说明使用场景（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 箭头函数没有自己的 this、arguments、super、new.target。 - 不能用作构造函数，不能使用 new。 - 没有 prototype 属性。 - 不能用 call/apply/bind 改变 this。

---

### FB-01-CP-B-004：简述事件循环，宏任务和微任务有什么区别？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
简述事件循环，宏任务和微任务有什么区别。

**参考答案**：

- JavaScript 单线程，事件循环负责调度异步任务。
- 宏任务：`script` 整体、`setTimeout`/`setInterval`、I/O、UI 渲染。
- 微任务：`Promise.then`、`MutationObserver`、`queueMicrotask`。
- 流程：执行当前宏任务 → 清空所有微任务 → 渲染（如果需要）→ 取下一个宏任务。
- 微任务优先级高于宏任务，会在当前宏任务结束后、下一个宏任务开始前执行。

**评分维度**：
- 说明单线程与事件循环关系（25%）。
- 正确区分宏任务/微任务（37%）。
- 能解释执行顺序（38%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - JavaScript 单线程，事件循环负责调度异步任务。 - 宏任务：script 整体、setTimeout/setInterval、I/O、UI 渲染。 - 微任务：Promise.then、MutationObserver、queueMicrotask。 - 流程：执行当前宏任务 → 清空所有微任务 → 渲染（如果需要）→ 取下一个宏任务。

---

### FB-01-CO-B-018：`Promise` 的三种状态是什么？`.then` 和 `.catch` 如何链式调用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
`Promise` 的三种状态是什么？`.then` 和 `.catch` 如何链式调用。

**参考答案**：

- 三种状态：pending、fulfilled、rejected。
- 状态一旦改变就不可再次改变。
- `.then` 接收两个参数：`onFulfilled` 和 `onRejected`。
- `.catch` 等价于 `.then(null, onRejected)`。
- 链式调用中，每个 `.then` 返回新的 Promise；如果返回普通值，会包装成 resolved Promise；如果抛出异常，会变为 rejected Promise。

**评分维度**：
- 状态说明正确（28%）。
- 状态不可变（29%）。
- 链式调用机制说明清楚（43%）。

---
## 二、进阶题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 三种状态：pending、fulfilled、rejected。 - 状态一旦改变就不可再次改变。 - .then 接收两个参数：onFulfilled 和 onRejected。 - .catch 等价于 .then(null, onRejected)。

---

### FB-01-CD-A-007：手写一个 `Promise.all`，并说明其特点。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
手写一个 `Promise.all`，并说明其特点。。

**参考答案**：

```js
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(iterable);
    const result = new Array(arr.length);
    let count = 0;
    if (arr.length === 0) return resolve([]);

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

特点：
- 输入可以是可迭代对象。
- 所有 Promise 都 resolve 才 resolve，结果顺序与输入一致。
- 任一 reject 就 reject。
- 非 Promise 值会包装为 resolved Promise。

**评分维度**：
- 代码正确（50%）。
- 处理空数组（12%）。
- 说明结果顺序和失败短路特性（38%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> （代码示例） 特点： - 输入可以是可迭代对象。 - 所有 Promise 都 resolve 才 resolve，结果顺序与输入一致。 - 任一 reject 就 reject。 - 非 Promise 值会包装为 resolved Promise。

---

### FB-01-CO-A-009：如何理解 `this` 的绑定规则？优先级是怎样的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何理解 `this` 的绑定规则？优先级是怎样的。

**参考答案**：

四种绑定：
1. 默认绑定：独立调用，非严格模式指向全局，严格模式 undefined。
2. 隐式绑定：通过对象调用，指向该对象。
3. 显式绑定：`call`/`apply`/`bind`。
4. new 绑定：指向新创建的实例。

优先级（从高到低）：new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定。
箭头函数没有自己的 this，不纳入此优先级。

**评分维度**：
- 四种规则说明清楚（50%）。
- 优先级正确（37%）。
- 提到箭头函数例外（13%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 四种绑定： 1. 默认绑定：独立调用，非严格模式指向全局，严格模式 undefined。 2. 隐式绑定：通过对象调用，指向该对象。 3. 显式绑定：call/apply/bind。 4. new 绑定：指向新创建的实例。

---

### FB-01-CO-A-010：原型链是什么？`__proto__`、`prototype`、`constructor` 的关系？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
原型链是什么？`__proto__`、`prototype`、`constructor` 的关系。

**参考答案**：

- 每个对象都有 `__proto__`（内部 `[[Prototype]]`），指向其原型对象。
- 构造函数有 `prototype` 属性，指向原型对象；实例的 `__proto__` 指向构造函数的 `prototype`。
- 原型对象有 `constructor` 属性，指回构造函数。
- 查找属性时，先自身，再沿 `__proto__` 向上找，直到 `null`，形成原型链。

```js
function Foo() {}
const f = new Foo();
f.__proto__ === Foo.prototype;
Foo.prototype.constructor === Foo;
Foo.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```

**评分维度**：
- 三个概念区分清楚（50%）。
- 能画图或写关系式（25%）。
- 解释属性查找机制（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 每个对象都有 __proto__（内部 [[Prototype]]），指向其原型对象。 - 构造函数有 prototype 属性，指向原型对象；实例的 __proto__ 指向构造函数的 prototype。 - 原型对象有 constructor 属性，指回构造函数。 - 查找属性时，先自身，再沿 __proto__ 向上找，直到 null，形成原型链。

---

### FB-01-CP-A-001：ES6 模块与 CommonJS 模块有什么区别？

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
ES6 模块与 CommonJS 模块有什么区别。

**参考答案**：

- 语法：ESM 用 `import`/`export`；CommonJS 用 `require`/`module.exports`。
- 加载时机：ESM 是静态的，编译时确定依赖，支持 Tree Shaking；CommonJS 是动态的，运行时确定。
- 输出：CommonJS 输出的是值的拷贝，修改内部状态不会影响引用方；ESM 输出的是值的引用（只读）。
- 顶层 this：ESM 模块顶层 `this` 是 `undefined`；CommonJS 是 `module.exports`。
- 循环依赖：两者都能处理，但 ESM 的静态结构更易于分析和优化。

**评分维度**：
- 语法和加载时机差异（37%）。
- 值引用 vs 拷贝（38%）。
- Tree Shaking 相关（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 语法：ESM 用 import/export；CommonJS 用 require/module.exports。 - 加载时机：ESM 是静态的，编译时确定依赖，支持 Tree Shaking；CommonJS 是动态的，运行时确定。 - 输出：CommonJS 输出的是值的拷贝，修改内部状态不会影响引用方；ESM 输出的是值的引用（只读）。 - 顶层 this：ESM 模块顶层 this 是 undefined；CommonJS 是 module.exports。

---

### FB-01-CA-A-004：解释 `async/await` 的执行过程，下面代码输出什么？

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() { console.log("async2"); }
console.log("script start");
async1();
console.log("script end");
```

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
解释 `async/await` 的执行过程，下面代码输出什么？

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() { console.log("async2"); }
console.log("script start");
async1();
console.log("script end");
```。

**参考答案**：

输出：

```
script start
async1 start
async2
script end
async1 end
```

解析：
- `async1` 调用后立即执行同步部分，输出 `async1 start`。
- `await async2()` 先执行 `async2()` 的同步部分，输出 `async2`。
- `await` 后面的代码被放入微任务队列。
- 同步代码继续输出 `script end`。
- 清空微任务，输出 `async1 end`。

**评分维度**：
- 输出正确（37%）。
- 解释 await 后代码入微任务（38%）。
- 能区分同步与异步部分（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 输出： （代码示例） 解析： - async1 调用后立即执行同步部分，输出 async1 start。 - await async2() 先执行 async2() 的同步部分，输出 async2。 - await 后面的代码被放入微任务队列。 - 同步代码继续输出 script end。

---

### FB-01-CO-A-011：解释一下 JavaScript 的垃圾回收机制，常见内存泄漏有哪些？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
解释一下 JavaScript 的垃圾回收机制，常见内存泄漏有哪些。

**参考答案**：

- 主流引擎使用可达性分析（标记-清除）+ 分代回收。
- 从根对象出发，能访问到的对象保留，访问不到的回收。
- V8 分新生代（Scavenge 算法）和老生代（标记-清除/整理/增量标记）。

常见内存泄漏：
1. 意外创建全局变量。
2. 闭包持有不再使用的大对象。
3. 定时器/事件监听未清除。
4. DOM 引用未释放。
5. console.log 的对象被 DevTools 持有。

**评分维度**：
- 可达性分析说明（37%）。
- 分代回收提及（25%）。
- 至少列出 3 种内存泄漏（38%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 主流引擎使用可达性分析（标记-清除）+ 分代回收。 - 从根对象出发，能访问到的对象保留，访问不到的回收。 - V8 分新生代（Scavenge 算法）和老生代（标记-清除/整理/增量标记）。 常见内存泄漏： 1. 意外创建全局变量。

---

### FB-01-CD-A-008：什么是函数柯里化（Currying）？手写实现。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是函数柯里化（Currying）？手写实现。。

**参考答案**：

柯里化是把接受多个参数的函数转换成一系列接受单一参数的函数。

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) { return a + b + c; }
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
```

**评分维度**：
- 概念解释清楚（25%）。
- 实现支持分步传参（37%）。
- 实现支持一次性传多个参数（25%）。
- 能说明应用场景（13%）。

---
## 三、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 柯里化是把接受多个参数的函数转换成一系列接受单一参数的函数。

---

### FB-01-PE-P-001：V8 引擎是如何执行 JavaScript 的？解释 Ignition、TurboFan、隐藏类、内联缓存。

**题型**：性能优化题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
V8 引擎是如何执行 JavaScript 的？解释 Ignition、TurboFan、隐藏类、内联缓存。。

**参考答案**：

- V8 执行流程：源代码 → 词法/语法分析生成 AST → Ignition 解释器生成字节码并执行 → TurboFan 对热点代码编译为优化机器码。
- Ignition：解释执行字节码，节省内存。
- TurboFan：基于类型反馈做推测优化，生成高性能机器码；若假设被打破则反优化。
- 隐藏类（Hidden Class）：V8 为结构相同的对象创建共享的隐藏类，属性按偏移访问，加速查找。
- 内联缓存（Inline Caching）：缓存属性访问的位置，避免重复查找。

优化建议：
- 对象初始化时声明完整属性，避免动态增删。
- 函数参数类型保持稳定，避免反优化。

**评分维度**：
- 执行流程完整（30%）。
- Ignition/TurboFan 作用（20%）。
- 隐藏类和内联缓存解释（30%）。
- 能给出性能优化建议（20%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - V8 执行流程：源代码 → 词法/语法分析生成 AST → Ignition 解释器生成字节码并执行 → TurboFan 对热点代码编译为优化机器码。 - Ignition：解释执行字节码，节省内存。 - TurboFan：基于类型反馈做推测优化，生成高性能机器码；若假设被打破则反优化。 - 隐藏类（Hidden Class）：V8 为结构相同的对象创建共享的隐藏类，属性按偏移访问，加速查找。

---

### FB-01-SD-P-001：设计一个支持取消的 Promise，并解释实现原理。

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
设计一个支持取消的 Promise，并解释实现原理。。

**参考答案**：

可以通过包装 Promise 并暴露 `abort` 方法实现。

```js
function makeCancelable(promise) {
  let rejected = false;
  const wrapped = new Promise((resolve, reject) => {
    promise.then(
      value => rejected ? reject({ canceled: true }) : resolve(value),
      reason => rejected ? reject({ canceled: true }) : reject(reason)
    );
  });
  return {
    promise: wrapped,
    cancel() { rejected = true; }
  };
}
```

更好的方式是使用 AbortController（现代浏览器/Node）。

**评分维度**：
- 提供可取消的封装思路（37%）。
- 能处理异步结果到来后的取消（38%）。
- 提到 AbortController 标准方案（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 可以通过包装 Promise 并暴露 abort 方法实现。 （代码示例） 更好的方式是使用 AbortController（现代浏览器/Node）。

---

### FB-01-CD-P-004：如何实现一个响应式系统（类似 Vue3 的 reactive）？

**题型**：手写代码题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何实现一个响应式系统（类似 Vue3 的 reactive）。

**参考答案**：

核心：使用 Proxy 拦截对象的 get/set，在 get 时收集依赖，在 set 时触发依赖。

```js
let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

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

const depsMap = new WeakMap();
function track(target, key) {
  if (!activeEffect) return;
  let dep = depsMap.get(target);
  if (!dep) { dep = new Map(); depsMap.set(target, dep); }
  let effects = dep.get(key);
  if (!effects) { effects = new Set(); dep.set(key, effects); }
  effects.add(activeEffect);
}
function trigger(target, key) {
  const dep = depsMap.get(target);
  if (!dep) return;
  const effects = dep.get(key);
  effects && effects.forEach(fn => fn());
}

const state = reactive({ count: 0 });
effect(() => console.log(state.count));
state.count++; // 触发重新执行
```

**评分维度**：
- 使用 Proxy 拦截（20%）。
- 收集依赖与触发依赖逻辑正确（40%）。
- 使用 WeakMap/Map/Set 组织依赖（20%）。
- 提到嵌套对象、数组、computed 等可扩展点（20%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 核心：使用 Proxy 拦截对象的 get/set，在 get 时收集依赖，在 set 时触发依赖。

---

### FB-01-CO-P-007：解释 JavaScript 的模块循环依赖问题，ESM 和 CommonJS 分别是如何处理的？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
解释 JavaScript 的模块循环依赖问题，ESM 和 CommonJS 分别是如何处理的。

**参考答案**：

循环依赖：A 依赖 B，B 又依赖 A。

CommonJS：
- 加载时先执行部分 A，遇到 `require(B)` 转去执行 B；B 中又 `require(A)`，此时 A 的 `module.exports` 可能是不完整对象，B 拿到的是半成品；B 执行完回到 A。
- 由于输出的是拷贝，B 对 A 的修改不会反映到 A 的后续执行。

ESM：
- 编译阶段先构建依赖图，再执行模块。
- 循环依赖时，模块的导出绑定是活的引用，后执行的模块修改会影响先执行模块的引用。
- 但仍需避免在模块顶层就使用对方未初始化的导出。

**评分维度**：
- 解释循环依赖现象（20%）。
- CommonJS 执行过程和拷贝问题（30%）。
- ESM 静态分析与活绑定（30%）。
- 能给出避免循环依赖的建议（20%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 循环依赖：A 依赖 B，B 又依赖 A。 CommonJS： - 加载时先执行部分 A，遇到 require(B) 转去执行 B；B 中又 require(A)，此时 A 的 module.exports 可能是不完整对象，B 拿到的是半成品；B 执行完回到 A。 - 由于输出的是拷贝，B 对 A 的修改不会反映到 A 的后续执行。 ESM： - 编译阶段先构建依赖图，再执行模块。

---

### FB-01-CP-P-001：解释一下 Proxy 和 Reflect，为什么 Vue3 选择 Proxy 而不是 Object.defineProperty？

**题型**：综合开放题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
解释一下 Proxy 和 Reflect，为什么 Vue3 选择 Proxy 而不是 Object.defineProperty。

**参考答案**：

- Proxy：代理对象，可拦截 13 种基本操作（get、set、has、deleteProperty、ownKeys 等）。
- Reflect：提供与 Proxy 处理器对应的方法，规范对象操作，返回值便于判断成功/失败。

Vue3 选择 Proxy 的原因：
- `Object.defineProperty` 只能监听已有属性的 get/set，无法监听新增/删除属性、数组索引、Map/Set 等。
- Proxy 可以监听更多操作，性能更好，API 更自然。
- Proxy 监听的是整个对象，不需要递归遍历初始化所有属性。

**评分维度**：
- Proxy/Reflect 基本概念（37%）。
- 列出 defineProperty 的局限（38%）。
- 说明 Proxy 的优势（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - Proxy：代理对象，可拦截 13 种基本操作（get、set、has、deleteProperty、ownKeys 等）。 - Reflect：提供与 Proxy 处理器对应的方法，规范对象操作，返回值便于判断成功/失败。 Vue3 选择 Proxy 的原因： - Object.defineProperty 只能监听已有属性的 get/set，无法监听新增/删除属性、数组索引、Map/Set 等。 - Proxy 可以监听更多操作，性能更好，API 更自然。

---

### FB-01-SD-P-002：如何设计一个高可靠的前端埋点 SDK？从错误监控、性能采集、数据上报等角度分析。

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何设计一个高可靠的前端埋点 SDK？从错误监控、性能采集、数据上报等角度分析。。

**参考答案**：

错误监控：
- `window.onerror` 捕获同步/运行时错误。
- `window.addEventListener('error')` 捕获资源加载错误。
- `window.addEventListener('unhandledrejection')` 捕获未处理 Promise 拒绝。
- 使用 Error Boundary（React）等框架能力。

性能采集：
- Performance API：`performance.timing`、`PerformanceObserver`。
- 采集 FCP、LCP、CLS、TTFB、FID 等 Web Vitals。

数据上报：
- 使用 `navigator.sendBeacon` 或图片 `src` 进行可靠上报。
- 合并批量上报，失败重试，本地队列持久化（localStorage/IndexedDB）。
- 采样率控制、敏感信息脱敏。

SDK 设计：
- 插件化架构，按需加载。
- 兼容旧浏览器，错误自愈。
- 不阻塞业务主线程。

**评分维度**：
- 错误监控手段完整（30%）。
- 性能指标与 API 正确（30%）。
- 上报机制考虑可靠性（30%）。
- SDK 架构设计合理（10%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 错误监控： - window.onerror 捕获同步/运行时错误。 - window.addEventListener('error') 捕获资源加载错误。 - window.addEventListener('unhandledrejection') 捕获未处理 Promise 拒绝。 - 使用 Error Boundary（React）等框架能力。

---

### FB-01-CD-P-005：手写一个符合 Promise/A+ 规范的 Promise，关键点有哪些？

**题型**：手写代码题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
手写一个符合 Promise/A+ 规范的 Promise，关键点有哪些。

**参考答案**：

核心实现结构：

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
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
    // 返回新 Promise，用 queueMicrotask 异步执行回调
    // 处理 thenable、循环引用、异常等情况
  }
}
```

关键点：
1. 三种状态，状态只能从 pending 变为 fulfilled/rejected，且不可逆。
2. `then` 必须返回新的 Promise，支持链式调用。
3. `then` 回调必须异步执行（微任务）。
4. 处理 thenable：如果回调返回值是对象/函数且有 `then` 方法，按 Promise 处理。
5. 防止循环引用：`promise2 === x` 时抛出 TypeError。
6. `catch` 是 `then(null, onRejected)` 的语法糖。

**评分维度**：
- 状态机设计正确（25%）。
- then 返回新 Promise 并异步执行（25%）。
- 处理 thenable 和循环引用（25%）。
- 能说明微任务与链式调用原理（25%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 核心实现结构： （代码示例） 关键点： 1. 三种状态，状态只能从 pending 变为 fulfilled/rejected，且不可逆。 2. then 必须返回新的 Promise，支持链式调用。 3. then 回调必须异步执行（微任务）。 4. 处理 thenable：如果回调返回值是对象/函数且有 then 方法，按 Promise 处理。

---

### FB-01-CO-P-008：什么是 Iterator / Iterable 协议？如何让一个对象支持 `for…of`？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
什么是 Iterator / Iterable 协议？如何让一个对象支持 `for…of`。

**参考答案**：

Iterable Protocol：对象必须实现 `Symbol.iterator` 方法，返回一个 Iterator。

Iterator Protocol：Iterator 必须实现 `next()` 方法，返回 `{ value, done }`。

让对象支持 `for…of`：

```js
const obj = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.data[index],
        done: index++ >= this.data.length
      })
    };
  }
};

for (const x of obj) console.log(x); // 1 2 3
```

内置可迭代对象：`Array`、`String`、`Map`、`Set`、`TypedArray`、`arguments`、`NodeList` 等。`Object` 默认不可迭代。

**评分维度**：
- 解释 Iterable 与 Iterator 区别（30%）。
- 能手写 Symbol.iterator 实现（40%）。
- 能列举内置可迭代对象并说明 Object 默认不可迭代（30%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> Iterable Protocol：对象必须实现 Symbol.iterator 方法，返回一个 Iterator。 Iterator Protocol：Iterator 必须实现 next() 方法，返回 { value, done }。 让对象支持 for…of： （代码示例） 内置可迭代对象：Array、String、Map、Set、TypedArray、arguments、NodeList 等。 Object 默认不可迭代。

---

### FB-01-SC-P-001：什么是 Error Cause？在实际项目中如何构建分层的错误处理体系？

**题型**：场景设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：01 JavaScript
**标签**：es6、Promise、事件循环、异步、this
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
什么是 Error Cause？在实际项目中如何构建分层的错误处理体系。

**参考答案**：

Error Cause 是 ES2022 引入的能力，允许在创建 Error 时通过 `cause` 选项保留原始错误：

```js
throw new Error('订单查询失败', { cause: originalError });
```

上层捕获后可通过 `err.cause` 追溯根因，避免错误信息被吞掉。

分层错误处理体系：

1. **业务层**：对可预期错误做友好提示、降级、重试。如表单校验失败、网络超时提示。
2. **框架层**：React Error Boundary / Vue errorHandler 捕获渲染期错误，防止白屏。
3. **全局层**：`window.onerror` / `unhandledrejection` 捕获未处理错误并上报 Sentry。

建议：
- 自定义错误类，按业务域携带 code、level 等元信息。
- 用户提示与开发日志分离。
- 关键路径（支付、下单）提供兜底和回滚。

**评分维度**：
- 解释 Error Cause 用法（30%）。
- 能描述三层错误处理体系（40%）。
- 提到自定义错误类和监控上报（30%）。

---
## 面试准备建议

1. 手写题：防抖、节流、深拷贝、Promise.all、new、bind/call/apply 必须能默写。
2. 事件循环题：养成画队列的习惯。
3. 原型链/this：准备关系图，能现场画出来。
4. 工程化题：结合项目经验，准备具体案例。

---

> **领域编号**：F01 JavaScript  
> **最后更新**：2026-06-24

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> Error Cause 是 ES2022 引入的能力，允许在创建 Error 时通过 cause 选项保留原始错误： （代码示例） 上层捕获后可通过 err.cause 追溯根因，避免错误信息被吞掉。 分层错误处理体系： 1. 业务层：对可预期错误做友好提示、降级、重试。 如表单校验失败、网络超时提示。 2. 框架层：React Error Boundary / Vue errorHandler 捕获渲染期错误，防止白屏。









