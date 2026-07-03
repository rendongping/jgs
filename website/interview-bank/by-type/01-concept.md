# 按题型：概念题

> 本文件收录前端面试中的高频概念题。
> 完整题目请按知识域查看 `by-domain/` 目录。

## 完整题目示例

### FB-01-CO-B-001：JavaScript 有哪些数据类型？

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

- 原始类型：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`、`bigint`
- 引用类型：`object`（包括 Object、Array、Function、Date、RegExp 等）

区别：原始类型存值本身，赋值时拷贝值；引用类型存引用，赋值时拷贝引用。

**评分维度**：
- 完整列出 8 种类型（40%）
- 解释赋值/拷贝差异（40%）
- 能举例说明（20%）

**完整题目链接**：[01-javascript.md#FB-01-CO-B-001](../by-domain/01-javascript.md#FB-01-CO-B-001)

---

## 更多概念题索引

### JavaScript

- [FB-01-CO-B-002 变量提升与 let/const/var](../by-domain/01-javascript.md#FB-01-CO-B-002)
- [FB-01-CO-B-003 闭包](../by-domain/01-javascript.md#FB-01-CO-B-003)
- [FB-01-CO-B-005 this 指向规则](../by-domain/01-javascript.md#FB-01-CO-B-005)
- [FB-01-CO-B-007 null 和 undefined](../by-domain/01-javascript.md#FB-01-CO-B-007)
- [FB-01-CO-B-008 深拷贝和浅拷贝](../by-domain/01-javascript.md#FB-01-CO-B-008)
- [FB-01-CO-B-009 事件委托](../by-domain/01-javascript.md#FB-01-CO-B-009)
- [FB-01-CO-B-010 原型和原型链](../by-domain/01-javascript.md#FB-01-CO-B-010)
- [FB-01-CO-A-002 for...of 和 for...in](../by-domain/01-javascript.md#FB-01-CO-A-002)
- [FB-01-CO-A-003 Object.defineProperty 和 Proxy](../by-domain/01-javascript.md#FB-01-CO-A-003)
- [FB-01-CO-P-001 V8 垃圾回收机制](../by-domain/01-javascript.md#FB-01-CO-P-001)
- [FB-01-CO-P-002 事件循环完整机制](../by-domain/01-javascript.md#FB-01-CO-P-002)

### TypeScript

> 待补充

### 浏览器

> 待补充

### 网络

> 待补充

---

## 面试技巧提示

概念题回答建议采用"定义 + 例子 + 边界情况"三段式：

1. **定义**：先给出一个准确、简洁的定义。
2. **例子**：用代码或场景说明。
3. **边界情况**：补充容易混淆或出错的地方。

例如回答闭包：

> 闭包是函数能够访问其词法作用域中的变量，即使函数在当前作用域外执行。常见应用是模块模式和计数器。需要注意的是，闭包可能导致内存泄漏，因为被引用的变量不会被回收。
