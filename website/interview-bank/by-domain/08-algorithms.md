# 数据结构与算法 面试题

> 本题库共收录 **70** 道面试题（基础 21 / 进阶 24 / 深入 17 / 架构 8）。
> 本文件收录 数据结构与算法 相关面试题，目标题量 50 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（21 道）{#basic}

### FB-08-CO-B-001：什么是时间复杂度和空间复杂度？请列出常见的 Big O 表示法。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：时间复杂度、空间复杂度、时间复杂度、算法分析
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释时间复杂度和空间复杂度的含义，并列出常见的 Big O 等级，按增长速度从低到高排列。

**参考答案**：

- **时间复杂度**：衡量算法执行时间随输入规模增长的变化趋势，通常用大 O 表示法描述最坏/平均情况。
- **空间复杂度**：衡量算法运行时额外占用内存随输入规模增长的变化趋势。

常见 Big O 从低到高：

```text
O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2^n) < O(n!)
```

前端常见示例：

- `O(1)`：对象属性访问、数组按索引访问
- `O(log n)`：二分查找
- `O(n)`：数组遍历
- `O(n log n)`：快速排序、归并排序
- `O(n²)`：冒泡排序、嵌套循环

**评分维度**：
- 准确解释时间/空间复杂度含义（40%）
- 正确列出常见 Big O 等级（30%）
- 能给出前端常见示例（30%）

**常见错误**：
- 把复杂度简单理解为"运行时间"而非"增长趋势"
- 忽略空间复杂度，只关注时间复杂度

**延伸追问**：
- 为什么说 `O(n)` 算法在 n 很大时一定比 `O(n²)` 快？
- 实际工程中，时间复杂度和空间复杂度如何取舍？

**参考资源**：
- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)

**口头回答版**：
> - 时间复杂度：衡量算法执行时间随输入规模增长的变化趋势，通常用大 O 表示法描述最坏/平均情况。 - 空间复杂度：衡量算法运行时额外占用内存随输入规模增长的变化趋势。 常见 Big O 从低到高： - O(1)：对象属性访问、数组按索引访问

---

### FB-08-CO-B-002：数组和链表有什么区别？各自适合什么场景？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：数组、链表、线性表、内存结构
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较数组（Array）和链表（Linked List）在内存结构、访问、插入删除等方面的差异，并说明适用场景。

**参考答案**：

| 特性 | 数组 | 链表 |
|------|------|------|
| 内存结构 | 连续内存 | 离散内存，通过指针连接 |
| 随机访问 | O(1) | O(n) |
| 头部插入/删除 | O(n) | O(1) |
| 尾部插入/删除 | 均摊 O(1) | O(n)（需遍历）/ O(1)（带尾指针） |
| 中间插入/删除 | O(n) | O(1)（找到节点后） |
| 缓存友好性 | 高 | 低 |

适用场景：

- **数组**：需要频繁随机访问、索引查询、缓存命中率要求高的场景。
- **链表**：频繁插入删除、不确定数据规模、需要实现队列/栈等场景。

**评分维度**：
- 说清内存结构差异（30%）
- 正确比较访问与增删复杂度（40%）
- 能结合场景说明选择（30%）

**常见错误**：
- 认为链表所有操作都是 O(1)
- 忽略缓存局部性对实际性能的影响

**延伸追问**：
- JavaScript 的 Array 底层真的是数组吗？
- 什么情况下数组的插入也是 O(1)？

**口头回答版**：
> | 特性 | 数组 | 链表 | |------|------|------| | 内存结构 | 连续内存 | 离散内存，通过指针连接 | | 随机访问 | O(1) | O(n) |

---

### FB-08-CD-B-001：用 JavaScript 实现数组求和、最大值、最小值函数。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：数组、遍历、reduce、线性扫描
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请编写函数 `sum(arr)`、`max(arr)`、`min(arr)`，分别求数组的和、最大值、最小值。要求不使用内置 `Math.max` / `Math.min`，并分析时间复杂度。

**参考答案**：

```js
function sum(arr) {
  let result = 0;
  for (const num of arr) {
    result += num;
  }
  return result;
}

function max(arr) {
  if (arr.length === 0) return undefined;
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > result) result = arr[i];
  }
  return result;
}

function min(arr) {
  if (arr.length === 0) return undefined;
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < result) result = arr[i];
  }
  return result;
}

// reduce 写法
const sum2 = arr => arr.reduce((acc, cur) => acc + cur, 0);
```

时间复杂度：均为 O(n)，空间复杂度 O(1)。

**评分维度**：
- 正确实现三个函数（50%）
- 处理空数组等边界情况（20%）
- 分析时间/空间复杂度（30%）

**常见错误**：
- 空数组未处理导致返回 `-Infinity` / `Infinity`
- 使用 `Math.max(...arr)` 处理超大数组导致栈溢出

**延伸追问**：
- 如果数组是类数组对象或迭代器，如何兼容？
- 如何在一次遍历中同时返回和、最大、最小值？

**口头回答版**：
> （见代码示例）
> 时间复杂度：均为 O(n)，空间复杂度 O(1)。

---

### FB-08-CD-B-002：反转一个字符串或数组。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：数组、字符串、反转、双指针
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现 `reverseString(str)` 和 `reverseArray(arr)`，分别反转字符串和数组。要求至少给出两种实现方式（原生 API 和手写）。

**参考答案**：

```js
// 字符串反转：API 写法
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 字符串反转：双指针手写
function reverseStringManual(str) {
  const arr = str.split('');
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr.join('');
}

// 数组反转：API 写法
function reverseArray(arr) {
  return [...arr].reverse();
}

// 数组反转：手写
function reverseArrayManual(arr) {
  const result = [...arr];
  let left = 0, right = result.length - 1;
  while (left < right) {
    [result[left], result[right]] = [result[right], result[left]];
    left++;
    right--;
  }
  return result;
}
```

时间复杂度：O(n)，空间复杂度：API 方式 O(n)，原地双指针 O(1)（不计输入拷贝）。

**评分维度**：
- 写出字符串和数组反转（40%）
- 提供 API 和手写两种方案（30%）
- 分析复杂度（30%）

**常见错误**：
- 直接修改输入数组（副作用）
- 处理 Unicode 代理对（如 emoji）时结果不正确

**延伸追问**：
- 如何正确处理包含 emoji 的字符串反转？
- 数组反转时如何做到真正的 O(1) 空间？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：API 方式 O(n)，原地双指针 O(1)（不计输入拷贝）。

---

### FB-08-CD-B-003：判断一个字符串是否是回文。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：字符串、回文、双指针
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现 `isPalindrome(str)`，判断字符串是否为回文。只考虑字母和数字字符，忽略大小写及非字母数字字符。例如 `"A man, a plan, a canal: Panama"` 是回文。

**参考答案**：

```js
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}

// 一次遍历版
function isPalindromeOnePass(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    while (left < right && !/[a-zA-Z0-9]/.test(str[left])) left++;
    while (left < right && !/[a-zA-Z0-9]/.test(str[right])) right--;
    if (str[left].toLowerCase() !== str[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}
```

时间复杂度：O(n)，空间复杂度：清洗版 O(n)，双指针版 O(1)。

**评分维度**：
- 正确判断回文（40%）
- 处理非字母数字字符和大小写（30%）
- 分析复杂度并给出优化版本（30%）

**常见错误**：
- 忽略大小写和非字母数字字符
- 使用正则后未考虑性能

**延伸追问**：
- 如果字符串非常长（GB 级），如何优化？
- 如何判断一个整数是否是回文？（不转字符串）

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：清洗版 O(n)，双指针版 O(1)。

---

### FB-08-CO-B-003：栈和队列有什么区别？JavaScript 中如何实现？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：栈、队列、LIFO、FIFO
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释栈（Stack）和队列（Queue）的特点，并说明在 JavaScript 中如何实现它们。

**参考答案**：

- **栈**：后进先出（LIFO, Last In First Out）。操作：push（入栈）、pop（出栈）、peek（看栈顶）。
- **队列**：先进先出（FIFO, First In First Out）。操作：enqueue（入队）、dequeue（出队）、peek（看队首）。

JavaScript 实现：

```js
class Stack {
  constructor() { this.items = []; }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}

class Queue {
  constructor() { this.items = []; }
  enqueue(item) { this.items.push(item); }
  dequeue() { return this.items.shift(); }
  peek() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
}
```

注意：基于数组的队列 `dequeue` 使用 `shift()` 时间复杂度为 O(n)。大数据量时应使用对象 + 头尾指针实现 O(1) 出队。

**评分维度**：
- 说清 LIFO / FIFO 差异（40%）
- 写出基本实现（40%）
- 提到 shift 的性能问题（20%）

**常见错误**：
- 混淆栈和队列的出队/出栈方向
- 忽略 `shift()` 的 O(n) 复杂度

**延伸追问**：
- 如何用两个栈实现一个队列？
- 如何用链表实现栈和队列？

**口头回答版**：
> - 栈：后进先出（LIFO, Last In First Out）。 操作：push（入栈）、pop（出栈）、peek（看栈顶）。 - 队列：先进先出（FIFO, First In First Out）。 操作：enqueue（入队）、dequeue（出队）、peek（看队首）。

---

### FB-08-CD-B-004：用两个栈实现一个队列。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：栈、队列、数据结构、实现
**出现频率**：中频
**预计回答时长**：8-10 分钟

**题目描述**：
请用两个栈实现一个队列，支持 `enqueue` 和 `dequeue` 操作，并分析均摊时间复杂度。

**参考答案**：

核心思想：一个栈负责入队（inStack），一个栈负责出队（outStack）。当 outStack 为空时，将 inStack 全部倒入 outStack。

```js
class QueueWithTwoStacks {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  enqueue(item) {
    this.inStack.push(item);
  }

  dequeue() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.pop();
  }

  peek() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  isEmpty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}
```

均摊时间复杂度：enqueue O(1)，dequeue 均摊 O(1)。每个元素最多被 push/pop 两次。

**评分维度**：
- 正确实现两个栈模拟队列（50%）
- 分析均摊复杂度（30%）
- 处理空队列边界（20%）

**常见错误**：
- 每次 dequeue 都倒腾两个栈，导致 O(n)
- 未处理空队列情况

**延伸追问**：
- 如何用两个队列实现一个栈？
- 这种实现方式在前端有哪些应用场景？

**口头回答版**：
> 核心思想：一个栈负责入队（inStack），一个栈负责出队（outStack）。 当 outStack 为空时，将 inStack 全部倒入 outStack。 均摊时间复杂度：enqueue O(1)，dequeue 均摊 O(1)。 每个元素最多被 push/pop 两次。

---

### FB-08-CD-B-005：有效的括号。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：栈、字符串、括号匹配
**出现频率**：高频
**预计回答时长**：8-10 分钟

**题目描述**：
给定一个只包含 `'('`、`')'`、`'{'`、`'}'`、`'['`、`']'` 的字符串 `s`，判断字符串是否有效。有效条件：
1. 左括号必须用相同类型的右括号闭合；
2. 左括号必须以正确的顺序闭合。

**参考答案**：

```js
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char in map) {
      const top = stack.length > 0 ? stack.pop() : '#';
      if (top !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}
```

时间复杂度：O(n)，空间复杂度：O(n)（最坏情况下所有字符都是左括号）。

**评分维度**：
- 正确使用栈解决问题（50%）
- 处理各种括号类型（20%）
- 分析复杂度并处理边界（30%）

**常见错误**：
- 只判断数量相等，不判断顺序
- 未处理字符串为空或奇数长度的情况

**延伸追问**：
- 如果括号嵌套深度很大，栈会溢出吗？如何优化？
- 如何扩展支持 `""`、'' 等引号匹配？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：O(n)（最坏情况下所有字符都是左括号）。

---

### FB-08-CO-B-004：什么是哈希表？JavaScript 中如何实现？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：哈希表、Hash Map、对象、Map
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释哈希表（Hash Table）的原理、时间复杂度，并说明 JavaScript 中可用的实现方式。

**参考答案**：

哈希表通过哈希函数将键映射到数组索引，实现快速查找。理想情况下增删查时间复杂度为 O(1)。

核心问题：

1. **哈希冲突**：不同键映射到同一索引。解决方法：链地址法（Separate Chaining）、开放寻址法（Open Addressing）。
2. **负载因子**：元素数/槽位数，过高时需要扩容（rehash）。

JavaScript 实现：

```js
// 普通对象（键只能是字符串或 Symbol）
const obj = { a: 1, b: 2 };

// Map（支持任意类型键，保持插入顺序）
const map = new Map();
map.set({ id: 1 }, 'value');
map.set('key', 2);
```

使用场景：计数、去重、缓存、快速查找。

**评分维度**：
- 解释哈希函数和数组索引映射（40%）
- 说明哈希冲突及解决方法（30%）
- 区分 Object 和 Map（30%）

**常见错误**：
- 认为哈希表所有操作绝对 O(1)，忽略冲突和扩容
- 用对象做 Map 时遇到原型链污染问题

**延伸追问**：
- 什么情况下哈希表会退化成 O(n)？
- `Object` 和 `Map` 在作为哈希表时有什么区别？

**口头回答版**：
> 哈希表通过哈希函数将键映射到数组索引，实现快速查找。 理想情况下增删查时间复杂度为 O(1)。 哈希冲突：不同键映射到同一索引。 解决方法：链地址法（Separate Chaining）、开放寻址法（Open Addressing）。

---

### FB-08-CD-B-006：两数之和。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：数组、哈希表、两数之和
**出现频率**：高频
**预计回答时长**：8-10 分钟

**题目描述**：
给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。假设每种输入只对应一个答案。

**参考答案**：

```js
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

时间复杂度：O(n)，空间复杂度：O(n)。

相比暴力双层循环 O(n²)，用哈希表以空间换时间。

**评分维度**：
- 使用哈希表实现 O(n) 解法（50%）
- 分析复杂度（25%）
- 处理无结果等边界情况（25%）

**常见错误**：
- 暴力 O(n²) 解法是唯一答案
- 未注意题目要求返回下标还是值
- 同一个元素使用两次

**延伸追问**：
- 如果数组已排序，能否做到 O(1) 空间？
- 三数之和如何解决？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：O(n)。 相比暴力双层循环 O(n²)，用哈希表以空间换时间。

---

### FB-08-CO-B-005：二叉树的基本概念是什么？有哪些遍历方式？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：二叉树、遍历、BST、递归
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释二叉树的基本概念，并列出常见的遍历方式及其顺序。

**参考答案**：

二叉树是每个节点最多有两个子节点的树结构，分别为左子节点和右子节点。

特殊二叉树：

- 满二叉树：每层节点数达到最大。
- 完全二叉树：除最后一层外都是满的，最后一层节点集中在左侧。
- 二叉搜索树（BST）：左子树所有节点 < 根节点 < 右子树所有节点。

遍历方式：

1. **前序遍历**：根 → 左 → 右
2. **中序遍历**：左 → 根 → 右（BST 中序为有序序列）
3. **后序遍历**：左 → 右 → 根
4. **层序遍历**：按层次从上到下、从左到右（BFS）

**评分维度**：
- 说清二叉树基本概念（30%）
- 列出四种遍历方式（40%）
- 知道 BST 中序有序（30%）

**常见错误**：
- 混淆前序/中序/后序的顺序
- 认为所有二叉树都是 BST

**延伸追问**：
- 已知前序和中序遍历，能否唯一确定一棵二叉树？
- 层序遍历通常用什么数据结构实现？

**口头回答版**：
> 二叉树是每个节点最多有两个子节点的树结构，分别为左子节点和右子节点。 - 满二叉树：每层节点数达到最大。 - 完全二叉树：除最后一层外都是满的，最后一层节点集中在左侧。 - 二叉搜索树（BST）：左子树所有节点 < 根节点 < 右子树所有节点。

---

### FB-08-CD-B-007：实现二叉树的前序、中序、后序遍历。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：二叉树、遍历、递归、DFS
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
给定二叉树节点定义，请分别用递归和非递归方式实现前序、中序、后序遍历。

**参考答案**：

```js
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// 递归前序
function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

// 递归中序
function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

// 递归后序
function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}

// 非递归前序（栈）
function preorderIter(root) {
  if (!root) return [];
  const result = [], stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}
```

时间复杂度：O(n)，空间复杂度：递归 O(h)（h 为树高），迭代最坏 O(n)。

**评分维度**：
- 正确写出递归三种遍历（40%）
- 至少写出一种非递归遍历（30%）
- 分析复杂度（30%）

**常见错误**：
- 非递归后序遍历顺序错误
- 递归函数未返回结果或结果数组未共享

**延伸追问**：
- 莫里斯遍历（Morris Traversal）是什么？有什么优点？
- 如何根据遍历结果重建二叉树？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：递归 O(h)（h 为树高），迭代最坏 O(n)。

---

### FB-08-CO-B-006：什么是递归？递归三要素是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：递归、递归三要素、终止条件
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释什么是递归，并说明编写递归函数时需要注意的三个核心要素。

**参考答案**：

递归：函数在执行过程中调用自身，把大问题分解为结构相同的子问题。

递归三要素：

1. **终止条件（Base Case）**：防止无限递归，最小子问题直接返回结果。
2. **递归关系（Recurrence Relation）**：如何将大问题拆解为子问题。
3. **返回值/副作用**：每一层递归返回什么，或对外部状态如何修改。

```js
function factorial(n) {
  if (n <= 1) return 1;        // 终止条件
  return n * factorial(n - 1); // 递归关系
}
```

**评分维度**：
- 准确解释递归思想（40%）
- 说清三要素（40%）
- 能举例说明（20%）

**常见错误**：
- 忘记写终止条件导致栈溢出
- 递归关系错误导致结果不对

**延伸追问**：
- 递归和循环如何互相转换？
- 尾递归是什么？JavaScript 引擎是否优化尾递归？

**口头回答版**：
> 递归：函数在执行过程中调用自身，把大问题分解为结构相同的子问题。 终止条件（Base Case）：防止无限递归，最小子问题直接返回结果。 递归关系（Recurrence Relation）：如何将大问题拆解为子问题。 返回值/副作用：每一层递归返回什么，或对外部状态如何修改。

---

### FB-08-CD-B-008：斐波那契数列。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：递归、动态规划、斐波那契
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请实现 `fib(n)`，返回斐波那契数列第 n 项。要求给出递归、记忆化搜索和动态规划三种实现，并比较复杂度。

**参考答案**：

```js
// 递归（指数级，不推荐）
function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 记忆化搜索
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// 动态规划（O(n) 时间，O(1) 空间）
function fibDP(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
```

复杂度对比：

- 递归：时间 O(2^n)，空间 O(n)（调用栈）
- 记忆化：时间 O(n)，空间 O(n)
- 动态规划：时间 O(n)，空间 O(1)

**评分维度**：
- 写出三种实现（50%）
- 正确比较复杂度（30%）
- 指出递归版本的问题（20%）

**常见错误**：
- 只写递归版本且未指出性能问题
- 动态规划版本空间复杂度仍为 O(n)

**延伸追问**：
- 如何用矩阵快速幂将斐波那契优化到 O(log n)？
- 实际项目中什么时候适合用递归？

**口头回答版**：
> - 递归：时间 O(2^n)，空间 O(n)（调用栈） - 记忆化：时间 O(n)，空间 O(n) - 动态规划：时间 O(n)，空间 O(1)

---

### FB-08-CO-B-007：常见排序算法有哪些？比较它们的时间复杂度和稳定性。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：排序、时间复杂度、稳定性、比较排序
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列出常见的排序算法，比较它们的时间复杂度、空间复杂度和稳定性，并说明适用场景。

**参考答案**：

| 算法 | 平均时间 | 最坏时间 | 空间 | 稳定性 | 场景 |
|------|---------|---------|------|--------|------|
| 冒泡排序 | O(n²) | O(n²) | O(1) | 稳定 | 教学，数据量极小 |
| 选择排序 | O(n²) | O(n²) | O(1) | 不稳定 | 交换代价高时 |
| 插入排序 | O(n²) | O(n²) | O(1) | 稳定 | 近乎有序数据 |
| 归并排序 | O(n log n) | O(n log n) | O(n) | 稳定 | 需要稳定排序 |
| 快速排序 | O(n log n) | O(n²) | O(log n) | 不稳定 | 通用排序，平均最快 |
| 堆排序 | O(n log n) | O(n log n) | O(1) | 不稳定 | 内存受限 |
| 计数/基数排序 | O(n + k) | O(n + k) | O(k) | 稳定 | 数据范围有限 |

**稳定性**：相等元素排序后相对位置不变。

**评分维度**：
- 列出至少 5 种排序算法（30%）
- 正确比较复杂度与稳定性（40%）
- 能说明适用场景（30%）

**常见错误**：
- 混淆稳定与不稳定排序
- 认为快速排序最坏也是 O(n log n)

**延伸追问**：
- JavaScript 的 `Array.prototype.sort` 底层是什么排序？
- 前端什么场景需要稳定排序？

**口头回答版**：
> | 算法 | 平均时间 | 最坏时间 | 空间 | 稳定性 | 场景 | |------|---------|---------|------|--------|------| | 冒泡排序 | O(n²) | O(n²) | O(1) | 稳定 | 教学，数据量极小 | | 选择排序 | O(n²) | O(n²) | O(1) | 不稳定 | 交换代价高时 |

---
### FB-08-CO-B-008：什么是递归？如何防止栈溢出？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：递归、栈溢出、尾递归、算法
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明递归三要素及栈溢出的优化方法。

**参考答案**：

递归三要素：终止条件、递归关系和返回值。栈溢出通常由于递归深度过大。优化方法：1) 改写为循环；2) 使用尾递归（若引擎支持）；3) 使用递归深度限制；4) 对分治问题使用迭代栈模拟。

    function factorial(n, acc = 1) {
      if (n <= 1) return acc;
      return factorial(n - 1, n * acc); // 尾递归形式
    }

**评分维度**：
- 三要素（40%）：终止条件、递归关系、返回值
- 栈溢出原因（20%）：深度过大
- 优化（40%）：循环、尾递归、深度限制

**常见错误**：
- 递归没有终止条件导致死循环
- 深度大时不做任何优化直接递归
- 混淆尾递归和普通递归，忽略引擎是否优化

**口头回答版**：
> 递归需要终止条件、递归关系和返回值。防止栈溢出可改写循环、尾递归或限制深度。

### FB-08-CO-B-009：分治法的基本思想与经典案例

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：分治法、归并排序、快速排序、算法
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明分治法的三个步骤及经典算法。

**参考答案**：

分治法三步：分解（Divide）将问题拆分为子问题；解决（Conquer）递归解决子问题；合并（Combine）将子问题解合并为原问题解。

经典案例：归并排序、快速排序、二分查找、Strassen 矩阵乘法、最近点对。


**补充说明**：

在实际落地 分治法的基本思想与经典案例 时，建议结合 分治法、归并排序、快速排序 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 分解（25%）：拆分问题
- 解决（25%）：递归求解
- 合并（25%）：合并结果
- 案例（25%）：归并/快排/二分

**常见错误**：
- 分治后没有正确合并结果
- 子问题划分不均衡导致复杂度退化
- 把分治和递归混为一谈，忽略合并步骤

**口头回答版**：
> 分治法包括分解、解决、合并三步，经典应用有归并排序、快速排序和二分查找。

### FB-08-CD-B-009：手写快速排序并分析复杂度

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：快速排序、分治、手写代码、排序
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现快速排序，并说明最好、最坏、平均时间复杂度。

**参考答案**：

选择基准 pivot，将数组分为小于 pivot 和大于 pivot 的两部分，递归排序。平均时间复杂度 O(n log n)，最坏 O(n²) 发生在数组已有序且 pivot 选择固定时。

    function quickSort(arr) {
      if (arr.length <= 1) return arr;
      const pivot = arr[Math.floor(arr.length / 2)];
      const left = arr.filter(x => x < pivot);
      const mid = arr.filter(x => x === pivot);
      const right = arr.filter(x => x > pivot);
      return [...quickSort(left), ...mid, ...quickSort(right)];
    }

**评分维度**：
- 分区逻辑（40%）：pivot 与分区
- 递归（30%）：递归排序
- 复杂度（30%）：平均/最坏

**常见错误**：
- pivot 选择固定导致已有序数组退化为 O(n²)
- 分区没有处理等于 pivot 的元素导致死循环
- 空间复杂度说成 O(1) 忽略递归栈

**口头回答版**：
> 快速排序通过 pivot 分区递归排序，平均 O(n log n)，最坏 O(n²)，可随机选 pivot 优化。

### FB-08-CD-B-010：手写归并排序

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：归并排序、分治、稳定排序、手写代码
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现归并排序并说明其稳定性。

**参考答案**：

归并排序将数组二分，递归排序后合并两个有序数组。时间复杂度稳定 O(n log n)，空间复杂度 O(n)。合并时相等元素按原顺序取，因此是稳定排序。

    function mergeSort(arr) {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
    }
    function merge(left, right) { ... }

**评分维度**：
- 分解（30%）：二分递归
- 合并（40%）：合并有序数组
- 稳定性（30%）：相等元素顺序不变

**常见错误**：
- 合并时没有处理剩余元素
- 使用额外空间超过 O(n)
- 不稳定合并导致排序结果不可预期

**口头回答版**：
> 归并排序稳定 O(n log n)，核心是分解与合并两个有序数组，合并时保持相等元素顺序。

### FB-08-CD-B-011：手写二分查找及其变体

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：二分查找、查找边界、手写代码、算法
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现普通二分查找、查找左边界和右边界。

**参考答案**：

二分查找要求数组有序，每次将查找范围减半。查找边界时通过调整收缩方向定位最左/最右目标。

    function binarySearch(nums, target) {
      let l = 0, r = nums.length - 1;
      while (l <= r) {
        const mid = (l + r) >>> 1;
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
      }
      return -1;
    }

**评分维度**：
- 基本二分（40%）：减半范围
- 边界查找（40%）：左/右边界收缩
- 溢出问题（20%）：mid 计算

**常见错误**：
- 循环条件写错导致死循环或漏查
- 边界查找时收缩方向错误
- mid 用 (l + r) / 2 在超大数组中溢出

**口头回答版**：
> 二分查找通过减半范围查找目标；边界变体通过调整收缩方向定位最左/最右位置。
---
### FB-08-CO-B-010：如何理解前缀和与差分数组？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：08 数据结构与算法
**标签**：前缀和、差分数组、区间查询、算法
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明前缀和与差分数组的定义、适用场景和相互关系。

**参考答案**：

前缀和数组 sum[i] 表示原数组前 i 个元素之和，可 O(1) 查询区间和。差分数组 diff[i] 记录原数组相邻元素差值，可 O(1) 进行区间加减，最后通过前缀和还原原数组。

    const diff = [0,0,0,0,0];
    diff[l] += v; diff[r+1] -= v; // 区间 [l,r] 加 v

**评分维度**：
- 前缀和（40%）：区间和查询
- 差分数组（40%）：区间更新
- 还原（20%）：差分求前缀和

**常见错误**：
- 前缀和数组下标从 0 和 1 混淆导致越界
- 差分数组更新时忘记修改 r+1
- 在不需要频繁区间查询的场景滥用前缀和增加空间

**口头回答版**：
> 前缀和用于快速区间和查询，差分数组用于快速区间更新，两者可通过前缀和相互转换。
---

## 进阶题（24 道）{#advanced}

**口头回答版**：
> | 算法 | 平均时间 | 最坏时间 | 空间 | 稳定性 | 场景 | |------|---------|---------|------|--------|------| | 冒泡排序 | O(n²) | O(n²) | O(1) | 稳定 | 教学，数据量极小 | | 选择排序 | O(n²) | O(n²) | O(1) | 不稳定 | 交换代价高时 |

### FB-08-CD-A-001：实现二分查找。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：二分查找、搜索、数组
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
给定一个按升序排列的整数数组 `nums` 和一个目标值 `target`，请实现 `binarySearch(nums, target)`，如果目标值存在返回其索引，否则返回 -1。要求分别写出迭代和递归版本。

**参考答案**：

```js
// 迭代版
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// 递归版
function binarySearchRecursive(nums, target, left = 0, right = nums.length - 1) {
  if (left > right) return -1;
  const mid = left + Math.floor((right - left) / 2);
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) {
    return binarySearchRecursive(nums, target, mid + 1, right);
  }
  return binarySearchRecursive(nums, target, left, mid - 1);
}
```

时间复杂度：O(log n)，空间复杂度：迭代 O(1)，递归 O(log n)。

**评分维度**：
- 正确写出迭代二分查找（40%）
- 处理边界条件（如 left <= right）（30%）
- 分析复杂度并给出递归版（30%）

**常见错误**：
- 循环条件写成 `left < right`，导致边界遗漏
- 中点计算用 `(left + right) / 2` 导致整数溢出（其他语言）
- 更新边界时忘记 +/-1

**延伸追问**：
- 如果数组中有重复元素，如何找到第一个/最后一个 target？
- 二分查找可以用于哪些非数组场景？

**口头回答版**：
> 时间复杂度：O(log n)，空间复杂度：迭代 O(1)，递归 O(log n)。

---

### FB-08-CD-A-002：实现冒泡排序、选择排序和插入排序。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：排序、冒泡排序、选择排序、插入排序
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请分别实现冒泡排序、选择排序和插入排序，并说明它们的时间复杂度、空间复杂度和稳定性。

**参考答案**：

```js
function bubbleSort(arr) {
  const nums = [...arr];
  for (let i = 0; i < nums.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return nums;
}

function selectionSort(arr) {
  const nums = [...arr];
  for (let i = 0; i < nums.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIndex]) minIndex = j;
    }
    if (minIndex !== i) [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
  }
  return nums;
}

function insertionSort(arr) {
  const nums = [...arr];
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i];
    let j = i - 1;
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = key;
  }
  return nums;
}
```

复杂度：三者平均/最坏时间 O(n²)，空间 O(1)。冒泡和插入稳定，选择不稳定。

**评分维度**：
- 正确实现三种排序（50%）
- 分析复杂度与稳定性（30%）
- 写出优化（如冒泡的 swapped 标志）（20%）

**常见错误**：
- 排序算法修改了原数组
- 稳定性判断错误

**延伸追问**：
- 插入排序在什么情况下接近 O(n)？
- 实际项目中为什么很少手写这三种排序？

**口头回答版**：
> 复杂度：三者平均/最坏时间 O(n²)，空间 O(1)。 冒泡和插入稳定，选择不稳定。

---

### FB-08-CD-A-003：实现快速排序和归并排序。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：排序、快速排序、归并排序、分治
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请分别实现快速排序（Quick Sort）和归并排序（Merge Sort），比较它们的复杂度、稳定性，并说明适用场景。

**参考答案**：

```js
// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// 原地快速排序
function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSortInPlace(arr, left, pivotIndex - 1);
    quickSortInPlace(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

// 归并排序
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}
```

| 算法 | 平均时间 | 最坏时间 | 空间 | 稳定性 |
|------|---------|---------|------|--------|
| 快速排序 | O(n log n) | O(n²) | O(log n) | 不稳定 |
| 归并排序 | O(n log n) | O(n log n) | O(n) | 稳定 |

**评分维度**：
- 正确实现快排和归并（50%）
- 比较复杂度与稳定性（25%）
- 说明分治思想及适用场景（25%）

**常见错误**：
- 快排未处理相等元素导致性能退化
- 原地快排 partition 逻辑错误

**延伸追问**：
- 如何避免快速排序的最坏情况？
- 归并排序的空间复杂度能否优化到 O(1)？

**口头回答版**：
> | 算法 | 平均时间 | 最坏时间 | 空间 | 稳定性 | |------|---------|---------|------|--------| | 快速排序 | O(n log n) | O(n²) | O(log n) | 不稳定 | | 归并排序 | O(n log n) | O(n log n) | O(n) | 稳定 |

---

### FB-08-CD-A-004：合并两个有序数组。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：数组、双指针、合并、排序
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
给你两个按非递减顺序排列的整数数组 `nums1` 和 `nums2`，另有两个整数 `m` 和 `n`，分别表示两个数组中的有效元素数目。请将 `nums2` 合并到 `nums1` 中，使合并后的数组同样按非递减顺序排列。要求使用 O(1) 额外空间。

**参考答案**：

```js
function merge(nums1, m, nums2, n) {
  let i = m - 1;       // nums1 有效末尾
  let j = n - 1;       // nums2 末尾
  let k = m + n - 1;   // 合并后末尾

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
}
```

时间复杂度：O(m + n)，空间复杂度：O(1)。

**评分维度**：
- 使用双指针从后向前合并（50%）
- 实现 O(1) 空间（25%）
- 处理边界情况（25%）

**常见错误**：
- 从前向后合并导致覆盖 nums1 中尚未比较的元素
- 未处理 nums2 还有剩余的情况

**延伸追问**：
- 如果允许 O(m+n) 空间，你会怎么实现？
- 合并 K 个有序数组怎么做？

**口头回答版**：
> （见代码示例）
> 时间复杂度：O(m + n)，空间复杂度：O(1)。

---

### FB-08-CD-A-005：无重复字符的最长子串。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：字符串、滑动窗口、哈希表、双指针
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
给定一个字符串 `s`，请你找出其中不含有重复字符的最长子串的长度。

**参考答案**：

```js
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
```

时间复杂度：O(n)，空间复杂度：O(min(m, n))，m 为字符集大小。

**评分维度**：
- 正确使用滑动窗口思想（40%）
- 用哈希表记录字符最新位置（30%）
- 分析复杂度（30%）

**常见错误**：
- 遇到重复字符时 left 更新不正确
- 使用 Set 时窗口收缩逻辑错误

**延伸追问**：
- 如果需要返回最长子串本身，怎么改？
- 如果字符集是固定大小（如 ASCII），空间复杂度是多少？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：O(min(m, n))，m 为字符集大小。

---

### FB-08-CD-A-006：和为 K 的子数组。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：数组、前缀和、哈希表、子数组
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
给定一个整数数组 `nums` 和一个整数 `k`，请统计并返回该数组中和为 `k` 的连续子数组的个数。

**参考答案**：

```js
function subarraySum(nums, k) {
  const prefixCount = new Map();
  prefixCount.set(0, 1); // 前缀和为 0 出现 1 次
  let prefixSum = 0, count = 0;

  for (const num of nums) {
    prefixSum += num;
    const target = prefixSum - k;
    if (prefixCount.has(target)) {
      count += prefixCount.get(target);
    }
    prefixCount.set(prefixSum, (prefixCount.get(prefixSum) || 0) + 1);
  }
  return count;
}
```

时间复杂度：O(n)，空间复杂度：O(n)。

核心思路：若 `prefix[j] - prefix[i] = k`，则 `nums[i+1..j]` 和为 k。用哈希表统计前缀和出现次数。

**评分维度**：
- 理解前缀和思想（40%）
- 正确使用哈希表优化（35%）
- 处理初始前缀和为 0 的情况（25%）

**常见错误**：
- 暴力 O(n²) 解法未优化
- 忘记初始化 `prefixCount.set(0, 1)`

**延伸追问**：
- 如果数组全是正数，能否用滑动窗口做？
- 如何找到和为 k 的最长子数组？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：O(n)。 核心思路：若 prefix[j] - prefix[i] = k，则 nums[i+1..j] 和为 k。 用哈希表统计前缀和出现次数。

---

### FB-08-CD-A-007：链表中倒数第 K 个节点。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：链表、双指针、快慢指针
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
给定一个单链表的头节点 `head` 和一个整数 `k`，返回该链表的倒数第 `k` 个节点。要求只遍历链表一次。

**参考答案**：

```js
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function findKthToTail(head, k) {
  let fast = head, slow = head;
  for (let i = 0; i < k; i++) {
    if (!fast) return null;
    fast = fast.next;
  }
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
}
```

时间复杂度：O(n)，空间复杂度：O(1)。

**评分维度**：
- 使用快慢指针一次遍历（50%）
- 处理 k 大于链表长度的情况（25%）
- 分析复杂度（25%）

**常见错误**：
- 先遍历求长度再遍历，不符合一次遍历要求
- fast 先走 k 步还是 k-1 步混淆

**延伸追问**：
- 如何删除倒数第 K 个节点？
- 如何找到链表的中间节点？

**口头回答版**：
> （见代码示例）
> 时间复杂度：O(n)，空间复杂度：O(1)。

---

### FB-08-CD-A-008：反转链表。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：链表、反转、迭代、递归
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
给你单链表的头节点 `head`，请你反转链表，并返回反转后的链表头节点。要求分别用迭代和递归实现。

**参考答案**：

```js
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

// 迭代版
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// 递归版
function reverseListRecursive(head) {
  if (!head || !head.next) return head;
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}
```

时间复杂度：O(n)，空间复杂度：迭代 O(1)，递归 O(n)。

**评分维度**：
- 正确实现迭代反转（40%）
- 正确实现递归反转（30%）
- 分析复杂度差异（30%）

**常见错误**：
- 迭代时指针更新顺序错误导致断链
- 递归版本未断开原头节点的 next 导致环

**延伸追问**：
- 如何反转链表中从位置 m 到 n 的部分？
- 如何 K 个一组反转链表？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：迭代 O(1)，递归 O(n)。

---

### FB-08-CD-A-009：判断链表是否有环。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：链表、环、快慢指针、Floyd
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
给定一个链表的头节点 `head`，判断链表中是否有环。如果有环，请返回环的入口节点；如果没有环，返回 null。要求使用 O(1) 空间。

**参考答案**：

```js
function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  if (!fast || !fast.next) return null;

  let ptr = head;
  while (ptr !== slow) {
    ptr = ptr.next;
    slow = slow.next;
  }
  return ptr;
}
```

时间复杂度：O(n)，空间复杂度：O(1)。

原理：快慢指针相遇后，一个指针回到头节点，两指针同步前进，再次相遇点即为环入口。

**评分维度**：
- 使用 Floyd 判环算法（40%）
- 找到环入口节点（35%）
- 分析复杂度（25%）

**常见错误**：
- 使用哈希表不符合 O(1) 空间要求
- 快慢指针不同步导致死循环

**延伸追问**：
- 如何计算环的长度？
- 这个算法为什么能确定环入口？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：O(1)。 原理：快慢指针相遇后，一个指针回到头节点，两指针同步前进，再次相遇点即为环入口。

---

### FB-08-CD-A-010：二叉树的层序遍历。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：二叉树、BFS、层序遍历、队列
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
给你二叉树的根节点 `root`，返回其节点值的层序遍历结果（即逐层地、从左到右访问所有节点）。

**参考答案**：

```js
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```

时间复杂度：O(n)，空间复杂度：O(n)（最宽一层的节点数）。

**评分维度**：
- 使用 BFS / 队列实现（50%）
- 按层输出结果（25%）
- 分析复杂度（25%）

**常见错误**：
- 未按层分组，直接输出所有节点
- 使用 `shift()` 未意识到其 O(n) 复杂度（大数据量应优化）

**延伸追问**：
- 如何用 DFS 实现层序遍历效果？
- 如何求二叉树的右视图？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：O(n)（最宽一层的节点数）。

---

### FB-08-CD-A-011：二叉树的最大深度。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：二叉树、DFS、BFS、递归
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
给定一个二叉树，找出其最大深度。最大深度是从根节点到最远叶子节点的最长路径上的节点数。

**参考答案**：

```js
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// 递归 DFS
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// BFS
function maxDepthBFS(root) {
  if (!root) return 0;
  let depth = 0;
  const queue = [root];
  while (queue.length > 0) {
    depth++;
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return depth;
}
```

时间复杂度：O(n)，空间复杂度：递归 O(h)，BFS O(n)。

**评分维度**：
- 正确实现递归解法（40%）
- 给出 BFS 解法（30%）
- 分析复杂度（30%）

**常见错误**：
- 空树深度返回 1 而不是 0
- 递归时未取左右子树最大深度

**延伸追问**：
- 如何求最小深度？和最大深度有什么不同？
- 如果树非常深，递归会有什么问题？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：递归 O(h)，BFS O(n)。

---

### FB-08-CD-A-012：验证二叉搜索树。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：二叉树、BST、递归、中序遍历
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
给你一个二叉树的根节点 `root`，判断其是否是一个有效的二叉搜索树（BST）。

**参考答案**：

```js
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// 递归范围判断
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}

// 中序遍历版
function isValidBSTInorder(root) {
  let prev = -Infinity;
  function inorder(node) {
    if (!node) return true;
    if (!inorder(node.left)) return false;
    if (node.val <= prev) return false;
    prev = node.val;
    return inorder(node.right);
  }
  return inorder(root);
}
```

时间复杂度：O(n)，空间复杂度：O(h)。

注意：BST 要求左子树**所有节点**小于根，右子树**所有节点**大于根，不能只比较当前节点的左右子节点。

**评分维度**：
- 理解 BST 定义（30%）
- 正确实现递归范围判断（40%）
- 或正确实现中序遍历判断（30%）

**常见错误**：
- 只比较当前节点与左右子节点
- 未使用 long 范围处理边界值（如 `Number.MAX_SAFE_INTEGER`）

**延伸追问**：
- 如何在 BST 中查找第 K 小的元素？
- BST 退化成链表时如何优化？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：O(h)。 注意：BST 要求左子树所有节点小于根，右子树所有节点大于根，不能只比较当前节点的左右子节点。

---

### FB-08-CD-A-013：买卖股票的最佳时机。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：数组、动态规划、贪心、股票问题
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
给定一个数组 `prices`，它的第 `i` 个元素 `prices[i]` 表示某只股票第 `i` 天的价格。你只能选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出。设计一个算法来计算你所能获取的最大利润。如果你不能获取任何利润，返回 0。

**参考答案**：

```js
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}
```

时间复杂度：O(n)，空间复杂度：O(1)。

动态规划思路：`dp[i]` 表示第 i 天卖出时的最大利润，`dp[i] = prices[i] - min(prices[0..i-1])`。

**评分维度**：
- 使用一次遍历贪心解法（50%）
- 分析复杂度（25%）
- 解释动态规划思路（25%）

**常见错误**：
- 暴力 O(n²) 未优化
- 允许在最低价之后无卖出日时返回负数

**延伸追问**：
- 如果允许买卖多次，最大利润怎么算？
- 如果最多允许两次交易，怎么做？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：O(1)。 动态规划思路：dp[i] 表示第 i 天卖出时的最大利润，dp[i] = prices[i] - min(prices[0..i-1])。

---

### FB-08-CD-A-014：爬楼梯：如何用动态规划求解最小代价？

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：动态规划、递归、记忆化、斐波那契
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。问有多少种不同的方法可以爬到楼顶。

**参考答案**：

```js
// 动态规划 O(n) 时间 O(1) 空间
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// 记忆化搜索
function climbStairsMemo(n, memo = {}) {
  if (n <= 2) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
  return memo[n];
}
```

时间复杂度：O(n)，空间复杂度：O(1)。

状态转移方程：`dp[i] = dp[i-1] + dp[i-2]`，即最后一步跨 1 阶或 2 阶。

**评分维度**：
- 写出动态规划解法（50%）
- 解释状态转移方程（30%）
- 优化到 O(1) 空间（20%）

**常见错误**：
- 纯递归导致超时
- 状态转移方程写错

**延伸追问**：
- 如果每次可以跨 1、2 或 3 阶，状态方程怎么变？
- 带障碍物的爬楼梯怎么做？

**口头回答版**：
> 时间复杂度：O(n)，空间复杂度：O(1)。 状态转移方程：dp[i] = dp[i-1] + dp[i-2]，即最后一步跨 1 阶或 2 阶。

---

### FB-08-CO-A-001：贪心算法的基本思想是什么？适合解决哪些问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：08 数据结构与算法
**标签**：贪心算法、最优子结构、局部最优
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释贪心算法的基本思想、适用条件，并举例说明适合用贪心解决的问题。

**参考答案**：

贪心算法：在每一步选择中都采取当前状态下最好或最优的选择，从而希望导致全局最优。

适用条件：

1. **最优子结构**：问题的最优解包含子问题的最优解。
2. **贪心选择性质**：局部最优选择能导致全局最优。

经典问题：

- 活动选择问题
- 跳跃游戏
- 零钱兑换（某些币种）
- 区间调度
- 哈夫曼编码

注意：贪心不一定能得到全局最优，如 0-1 背包问题通常需要用动态规划。

**评分维度**：
- 解释贪心思想（40%）
- 说明适用条件（30%）
- 举例经典问题并指出局限性（30%）

**常见错误**：
- 认为贪心总能得到最优解
- 与动态规划混淆

**延伸追问**：
- 贪心算法和动态规划的核心区别是什么？
- 如何判断一个问题能否用贪心解决？

**口头回答版**：
> 贪心算法：在每一步选择中都采取当前状态下最好或最优的选择，从而希望导致全局最优。 最优子结构：问题的最优解包含子问题的最优解。 贪心选择性质：局部最优选择能导致全局最优。 - 零钱兑换（某些币种）

---
### FB-08-CD-A-015：实现一个 LRU 缓存

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：LRU、缓存、Map、手写代码
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请用 Map 实现 O(1) 时间复杂度的 get/put。

**参考答案**：

LRU（最近最少使用）在容量满时淘汰最久未使用的键。Map 的迭代顺序按插入顺序，get/put 时先 delete 再 set 可更新顺序。

    class LRUCache {
      constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
      }
      get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
      }
      put(key, value) {
        if (this.map.has(key)) this.map.delete(key);
        else if (this.map.size >= this.capacity) {
          this.map.delete(this.map.keys().next().value);
        }
        this.map.set(key, value);
      }
    }

**评分维度**：
- 数据结构（30%）：Map 维护顺序
- get（30%）：更新访问顺序
- put（40%）：淘汰与插入

**常见错误**：
- 用普通对象导致无法 O(1) 获取最久未用键
- put 时没有处理 key 已存在的情况
- 容量判断逻辑错误导致多删或少删

**口头回答版**：
> LRU 缓存可用 Map 的插入顺序实现 O(1) get/put，访问时更新顺序，满时删除最前元素。

### FB-08-CD-A-016：手写一个深拷贝函数

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：深拷贝、递归、循环引用、手写代码
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请实现支持对象、数组、循环引用的深拷贝。

**参考答案**：

递归复制每个属性，遇到循环引用时用 WeakMap 记录已拷贝对象。还需处理 Date、RegExp、Map、Set 等特殊对象。

    function deepClone(obj, map = new WeakMap()) {
      if (obj === null || typeof obj !== 'object') return obj;
      if (obj instanceof Date) return new Date(obj);
      if (obj instanceof RegExp) return new RegExp(obj);
      if (map.has(obj)) return map.get(obj);
      const clone = Array.isArray(obj) ? [] : {};
      map.set(obj, clone);
      for (const key of Reflect.ownKeys(obj)) {
        clone[key] = deepClone(obj[key], map);
      }
      return clone;
    }

**评分维度**：
- 递归复制（30%）：基本类型与对象
- 循环引用（30%）：WeakMap 记录
- 特殊对象（20%）：Date/RegExp/Map/Set
- ownKeys（20%）：symbol 属性

**常见错误**：
- 未处理循环引用导致栈溢出
- 特殊对象被复制为普通对象
- 忽略 symbol 和不可枚举属性导致拷贝不完整

**口头回答版**：
> 深拷贝需递归复制属性，用 WeakMap 处理循环引用，并处理 Date、RegExp 等特殊对象。

### FB-08-CD-A-017：手写函数 compose 和 pipe

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：compose、pipe、函数式编程、手写代码
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现 compose 从右到左组合函数，pipe 从左到右组合函数。

**参考答案**：

compose(f, g, h)(x) 等价于 f(g(h(x)))。pipe 则相反。

    const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
    const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    compose(mul2, add1)(3); // 8

**评分维度**：
- compose（40%）：reduceRight
- pipe（40%）：reduce
- 函数签名（20%）：多参数函数处理

**常见错误**：
- compose 和 pipe 方向搞反
- 没有处理多参数函数导致结果错误
- 使用 for 循环但初始值设置错误

**口头回答版**：
> compose 从右到左组合函数，pipe 从左到右，可用 reduceRight/reduce 实现。

### FB-08-CD-A-018：实现一个事件发布订阅（EventBus）

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：EventBus、发布订阅、手写代码
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现 on、emit、off、once 方法。

**参考答案**：

使用 Map 存储事件名到监听器数组的映射。on 添加监听，once 包装为执行后自移除，emit 按注册顺序同步调用并传递参数，off 按引用移除。

    class EventBus {
      constructor() { this.events = new Map(); }
      on(name, fn) { ... }
      emit(name, ...args) { (this.events.get(name)||[]).forEach(fn => fn(...args)); }
      off(name, fn) { ... }
      once(name, fn) { const wrapper = (...args) => { this.off(name, wrapper); fn(...args); }; this.on(name, wrapper); }
    }

**评分维度**：
- 数据结构（30%）：Map + 数组
- once 实现（30%）：包装函数自移除
- off 准确性（40%）：按引用移除

**常见错误**：
- emit 使用异步调用导致执行顺序不可预期
- off 时直接清空该事件所有监听器
- once 包装函数没有正确移除自身

**口头回答版**：
> EventBus 用 Map 存事件与监听器数组，实现 on/emit/off/once，注意 once 的自移除。

### FB-08-CD-A-019：手写 Promise.allSettled

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：Promise、allSettled、手写代码
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现 Promise.allSettled，返回每个 Promise 的状态和结果/原因。

**参考答案**：

等待所有 Promise settle，结果数组元素为 { status: 'fulfilled', value } 或 { status: 'rejected', reason }。

    function allSettled(promises) {
      return Promise.all(promises.map(p =>
        Promise.resolve(p).then(
          value => ({ status: 'fulfilled', value }),
          reason => ({ status: 'rejected', reason })
        )
      ));
    }

**评分维度**：
- 全部等待（40%）：所有 Promise settle
- 结果格式（40%）：status/value/reason
- 输入处理（20%）：非 Promise 包装

**常见错误**：
- 有 reject 时直接返回 rejected Promise
- 结果对象字段与规范不符
- 未包装非 Promise 值

**口头回答版**：
> Promise.allSettled 等待所有 Promise 完成，返回包含 status 和 value/reason 的结果数组。

### FB-08-CD-A-020：实现数组乱序（Fisher-Yates）

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：Fisher-Yates、乱序、随机、手写代码
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请实现一个公平的数组乱序算法并说明为什么它比 sort 随机更公平。

**参考答案**：

Fisher-Yates 从后向前遍历，每次从 0 到 i 中随机选一个元素与 i 交换。每个排列概率相等。

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

用 sort(() => Math.random() - 0.5) 会因比较函数不稳定导致分布不均。

**评分维度**：
- 算法步骤（40%）：从后向前随机交换
- 公平性（40%）：每个排列概率相等
- 避免 sort（20%）：sort 随机分布不均

**常见错误**：
- 从前向后随机交换导致某些排列概率不均
- 使用 Math.random() 没有取整
- 认为 sort + random 是公平乱序

**口头回答版**：
> Fisher-Yates 从后向前随机交换，保证每个排列等概率，比 sort 随机更公平。

### FB-08-CD-A-021：大数相加的实现思路

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：大数相加、字符串、算法、精度
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何在不丢失精度的情况下实现两个大整数相加。

**参考答案**：

将数字转为字符串，从末位逐位相加并处理进位，最后反转结果。适合超出 JavaScript 安全整数范围的计算。

    function addStrings(a, b) {
      let i = a.length - 1, j = b.length - 1, carry = 0, res = '';
      while (i >= 0 || j >= 0 || carry) {
        const sum = (+a[i--] || 0) + (+b[j--] || 0) + carry;
        res = (sum % 10) + res;
        carry = Math.floor(sum / 10);
      }
      return res;
    }

**评分维度**：
- 字符串逐位（40%）：从末位相加
- 进位（30%）：carry 处理
- 边界（30%）：长度不等和最后进位

**常见错误**：
- 直接转 number 相加导致精度丢失
- 没有处理最后进位
- 结果拼接方向错误导致数字反转

**口头回答版**：
> 大数相加将数字作为字符串逐位相加并处理进位，避免超出安全整数范围。

### FB-08-SC-A-001：设计一个前端请求合并/去重系统

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：请求合并、请求去重、缓存、设计
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个系统，对相同请求进行合并或去重，减少服务端压力。

**参考答案**：

合并：将同一时刻的相同请求合并为一个网络请求，结果分发给所有调用方。去重：使用请求 key 缓存正在进行的 Promise，在请求完成前相同 key 直接返回同一 Promise。

    const pending = new Map();
    function request(key, fetcher) {
      if (pending.has(key)) return pending.get(key);
      const promise = fetcher().finally(() => pending.delete(key));
      pending.set(key, promise);
      return promise;
    }

**评分维度**：
- 合并策略（40%）：同时请求合并
- 去重策略（40%）：pending Promise 缓存
- 失效（20%）：请求完成后清理

**常见错误**：
- 不同参数的请求被错误合并
- 请求失败没有清理 pending 导致后续请求永远等待
- 合并结果没有按请求参数分发

**口头回答版**：
> 请求合并/去重系统通过缓存正在进行的 Promise 减少重复请求，注意 key 设计和失败清理。

### FB-08-SC-A-002：设计一个前端任务调度器

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：初级 / 高级
**面试知识域**：08 数据结构与算法
**标签**：任务调度、并发控制、优先级、设计
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个支持优先级和并发限制的前端任务调度器。

**参考答案**：

核心：优先队列（最小堆）存储任务，按优先级排序；运行计数器控制并发；任务完成后从队列取出下一个执行。支持任务取消、超时和错误处理。

    class TaskScheduler {
      constructor(max) { this.max = max; this.running = 0; this.queue = new MinHeap((a,b)=>a.priority-b.priority); }
      add(task) { ... }
    }


**补充说明**：

在实际落地 设计一个前端任务调度器 时，建议结合 任务调度、并发控制、优先级 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 并发控制（30%）：max/running 计数
- 优先级（30%）：优先队列
- 生命周期（40%）：取消、超时、错误

**常见错误**：
- 没有优先级导致重要任务被阻塞
- 任务失败后没有重试或降级
- 并发数为 0 或无限导致资源问题

**口头回答版**：
> 前端任务调度器通过优先队列和并发计数管理任务，支持优先级、取消、超时和错误处理。
---

## 深入题（17 道）{#proficient}

**口头回答版**：
> 贪心算法：在每一步选择中都采取当前状态下最好或最优的选择，从而希望导致全局最优。 最优子结构：问题的最优解包含子问题的最优解。 贪心选择性质：局部最优选择能导致全局最优。 - 零钱兑换（某些币种）

### FB-08-CD-P-001：最长递增子序列。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：动态规划、二分查找、LIS、子序列
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
给你一个整数数组 `nums`，找到其中最长严格递增子序列的长度。

**参考答案**：

```js
// 动态规划 O(n²)
function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;
  const dp = new Array(nums.length).fill(1);
  let maxLen = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  return maxLen;
}

// 贪心 + 二分查找 O(n log n)
function lengthOfLISBinary(nums) {
  const tails = [];
  for (const num of nums) {
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }
    tails[left] = num;
  }
  return tails.length;
}
```

时间复杂度：DP 版 O(n²)，二分优化版 O(n log n)；空间复杂度均为 O(n)。

**评分维度**：
- 正确实现 O(n²) 动态规划（40%）
- 解释状态转移方程（25%）
- 了解或实现 O(n log n) 优化（35%）

**常见错误**：
- 与子数组混淆，要求连续
- 二分优化版 tails 数组理解不清

**延伸追问**：
- 如果需要输出具体的最长递增子序列，怎么做？
- 如何求最长连续递增子序列？

**口头回答版**：
> 时间复杂度：DP 版 O(n²)，二分优化版 O(n log n)；空间复杂度均为 O(n)。

---

### FB-08-CD-P-002：0-1 背包问题。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：动态规划、背包问题、空间优化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
给定 `n` 个物品，第 `i` 个物品的重量为 `weights[i]`，价值为 `values[i]`。现有一个容量为 `W` 的背包，每件物品只能选择放入或不放入。求在不超过背包容量的前提下，能装入物品的最大价值。

**参考答案**：

```js
function knapsack(weights, values, W) {
  const n = weights.length;
  // dp[j] 表示容量为 j 时的最大价值
  const dp = new Array(W + 1).fill(0);

  for (let i = 0; i < n; i++) {
    // 必须倒序遍历，防止重复选择同一物品
    for (let j = W; j >= weights[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i]);
    }
  }
  return dp[W];
}
```

时间复杂度：O(n × W)，空间复杂度：O(W)。

状态转移：`dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i]] + value[i])`，压缩为一维后需倒序更新。

**评分维度**：
- 正确写出 DP 状态定义（30%）
- 实现一维数组优化（40%）
- 解释为什么要倒序遍历（30%）

**常见错误**：
- 一维 DP 正序遍历导致物品重复选择
- 状态定义不清

**延伸追问**：
- 完全背包和 0-1 背包在状态转移上有什么区别？
- 如果要求输出选择了哪些物品，怎么做？

**口头回答版**：
> 时间复杂度：O(n × W)，空间复杂度：O(W)。 状态转移：dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i]] + value[i])，压缩为一维后需倒序更新。

---

### FB-08-CD-P-003：编辑距离。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：动态规划、字符串、编辑距离、DP
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
给你两个单词 `word1` 和 `word2`，请计算将 `word1` 转换成 `word2` 所使用的最少操作数。你可以对一个单词进行如下三种操作：插入一个字符、删除一个字符、替换一个字符。

**参考答案**：

```js
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // 删除
          dp[i][j - 1] + 1,     // 插入
          dp[i - 1][j - 1] + 1  // 替换
        );
      }
    }
  }
  return dp[m][n];
}
```

时间复杂度：O(m × n)，空间复杂度：O(m × n)，可优化至 O(min(m, n))。

**评分维度**：
- 正确定义 DP 状态（30%）
- 写出状态转移方程（40%）
- 处理初始化边界（30%）

**常见错误**：
- 初始化错误
- 未区分插入/删除/替换三种操作

**延伸追问**：
- 如果只允许插入和删除，最少操作数是什么？
- 如何空间优化到 O(min(m, n))？

**口头回答版**：
> 时间复杂度：O(m × n)，空间复杂度：O(m × n)，可优化至 O(min(m, n))。

---

### FB-08-CD-P-004：全排列和子集。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：回溯、递归、全排列、子集、DFS
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
给定一个不含重复数字的数组 `nums`，返回其所有可能的全排列和所有子集。要求使用回溯算法实现。

**参考答案**：

```js
// 全排列
function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path);
      path.pop();
      used[i] = false;
    }
  }
  backtrack([]);
  return result;
}

// 子集
function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}
```

时间复杂度：全排列 O(n × n!)，子集 O(n × 2^n)；空间复杂度均为 O(n)。

**评分维度**：
- 正确实现全排列回溯（35%）
- 正确实现子集回溯（35%）
- 分析复杂度并解释剪枝思想（30%）

**常见错误**：
- 回溯时未正确恢复状态
- 结果引用共享导致所有结果相同

**延伸追问**：
- 如果数组有重复数字，如何去重？
- 全排列中如何按字典序输出？

**口头回答版**：
> 时间复杂度：全排列 O(n × n!)，子集 O(n × 2^n)；空间复杂度均为 O(n)。

---

### FB-08-CD-P-005：N 皇后问题。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：回溯、N 皇后、棋盘、剪枝
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。给定一个整数 `n`，返回所有不同的 n 皇后问题的解决方案。每一种解法包含 n 皇后在 n × n 棋盘上的不同放置位置。

**参考答案**：

```js
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => new Array(n).fill('.'));

  const cols = new Set();
  const diagonals1 = new Set(); // 主对角线 row - col
  const diagonals2 = new Set(); // 副对角线 row + col

  function backtrack(row) {
    if (row === n) {
      result.push(board.map(row => row.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diagonals1.has(row - col) || diagonals2.has(row + col)) continue;
      board[row][col] = 'Q';
      cols.add(col);
      diagonals1.add(row - col);
      diagonals2.add(row + col);
      backtrack(row + 1);
      board[row][col] = '.';
      cols.delete(col);
      diagonals1.delete(row - col);
      diagonals2.delete(row + col);
    }
  }
  backtrack(0);
  return result;
}
```

时间复杂度：O(n!)，空间复杂度：O(n)。

**评分维度**：
- 正确放置皇后并避免攻击（40%）
- 使用集合优化列和对角线检查（30%）
- 回溯状态恢复正确（30%）

**常见错误**：
- 只检查行和列，忽略对角线
- 对角线判断条件写错

**延伸追问**：
- 如何只用一维数组表示棋盘状态？
- N 皇后问题有什么优化策略？

**口头回答版**：
> （见代码示例）
> 时间复杂度：O(n!)，空间复杂度：O(n)。

---

### FB-08-CD-P-006：Top K 问题。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：Top K、堆、快速选择、优先级队列
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
给定一个整数数组 `nums` 和一个整数 `k`，请找出数组中第 K 个最大的元素。要求分别用堆和快速选择实现，并比较两种方法的适用场景。

**参考答案**：

```js
// 最小堆法 O(n log k)
function findKthLargest(nums, k) {
  const minHeap = new MinPriorityQueue();
  for (const num of nums) {
    minHeap.enqueue(num);
    if (minHeap.size() > k) minHeap.dequeue();
  }
  return minHeap.front().element;
}

// 快速选择 O(n) 平均
function findKthLargestQuickSelect(nums, k) {
  const targetIndex = nums.length - k;
  return quickSelect(nums, 0, nums.length - 1, targetIndex);
}

function quickSelect(nums, left, right, k) {
  if (left === right) return nums[left];
  const pivotIndex = partition(nums, left, right);
  if (pivotIndex === k) return nums[k];
  if (pivotIndex < k) return quickSelect(nums, pivotIndex + 1, right, k);
  return quickSelect(nums, left, pivotIndex - 1, k);
}

function partition(nums, left, right) {
  const pivot = nums[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (nums[j] <= pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  [nums[i], nums[right]] = [nums[right], nums[i]];
  return i;
}
```

| 方法 | 时间复杂度 | 空间复杂度 | 适用场景 |
|------|-----------|-----------|----------|
| 最小堆 | O(n log k) | O(k) | 数据流、K 较小 |
| 快速选择 | O(n) 平均，O(n²) 最坏 | O(log n) | 静态数组、单次查询 |

**评分维度**：
- 实现最小堆法（35%）
- 实现快速选择法（35%）
- 比较两种方法适用场景（30%）

**常见错误**：
- 用最大堆而不是最小堆
- 快速选择边界条件处理错误

**延伸追问**：
- 如果数据是流式输入，哪种方法更好？
- 如果要找前 K 个最大的所有元素，怎么做？

**口头回答版**：
> | 方法 | 时间复杂度 | 空间复杂度 | 适用场景 | |------|-----------|-----------|----------| | 最小堆 | O(n log k) | O(k) | 数据流、K 较小 | | 快速选择 | O(n) 平均，O(n²) 最坏 | O(log n) | 静态数组、单次查询 |

---

### FB-08-CD-P-007：数据流中的中位数。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：堆、中位数、双堆、数据流
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
设计一个数据结构，支持从数据流中动态添加整数，并能在 O(1) 或 O(log n) 时间内返回当前所有数字的中位数。

**参考答案**：

```js
class MedianFinder {
  constructor() {
    // 大顶堆存较小的一半
    this.maxHeap = new MaxPriorityQueue();
    // 小顶堆存较大的一半
    this.minHeap = new MinPriorityQueue();
  }

  addNum(num) {
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.front().element) {
      this.maxHeap.enqueue(num);
    } else {
      this.minHeap.enqueue(num);
    }

    // 平衡两个堆的大小
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.enqueue(this.maxHeap.dequeue().element);
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.enqueue(this.minHeap.dequeue().element);
    }
  }

  findMedian() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.front().element;
    }
    return (this.maxHeap.front().element + this.minHeap.front().element) / 2;
  }
}
```

时间复杂度：`addNum` O(log n)，`findMedian` O(1)；空间复杂度：O(n)。

**评分维度**：
- 使用双堆维护中位数（50%）
- 正确平衡两个堆的大小（30%）
- 分析复杂度（20%）

**常见错误**：
- 未保持两个堆的大小平衡
- 中位数计算错误（奇偶情况）

**延伸追问**：
- 如果数据范围已知且不大，能否用计数排序思想优化？
- 双堆方案在前端什么场景下有用？

**口头回答版**：
> 时间复杂度：addNum O(log n)，findMedian O(1)；空间复杂度：O(n)。

---

### FB-08-CD-P-008：合并 K 个有序链表。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：链表、堆、分治、归并
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。

**参考答案**：

```js
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

// 分治法 O(n log k)
function mergeKLists(lists) {
  if (lists.length === 0) return null;

  function mergeTwo(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    while (l1 && l2) {
      if (l1.val < l2.val) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
      curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
  }

  function mergeRange(start, end) {
    if (start === end) return lists[start];
    const mid = Math.floor((start + end) / 2);
    const left = mergeRange(start, mid);
    const right = mergeRange(mid + 1, end);
    return mergeTwo(left, right);
  }

  return mergeRange(0, lists.length - 1);
}
```

时间复杂度：O(n log k)（n 为总节点数，k 为链表数），空间复杂度：O(log k)（递归栈）。

**评分维度**：
- 正确合并两个有序链表（30%）
- 使用分治思想合并 K 个链表（40%）
- 分析复杂度（30%）

**常见错误**：
- 使用暴力逐一合并导致 O(n × k)
- 分治边界处理错误

**延伸追问**：
- 如何用优先队列（堆）实现？
- 如果链表数量非常大，如何优化？

**口头回答版**：
> 时间复杂度：O(n log k)（n 为总节点数，k 为链表数），空间复杂度：O(log k)（递归栈）。

---

### FB-08-CD-P-009：图的 BFS 和 DFS 遍历。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：图、BFS、DFS、邻接表、遍历
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
给定一个无向图，用邻接表表示。请分别实现广度优先搜索（BFS）和深度优先搜索（DFS）遍历，并返回遍历顺序。图中节点编号从 0 开始。

**参考答案**：

```js
// 邻接表：graph[i] 表示节点 i 的邻居列表
function bfs(graph, start) {
  const visited = new Set();
  const result = [];
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}

function dfs(graph, start) {
  const visited = new Set();
  const result = [];

  function traverse(node) {
    visited.add(node);
    result.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        traverse(neighbor);
      }
    }
  }
  traverse(start);
  return result;
}
```

时间复杂度：O(V + E)，空间复杂度：O(V)。

**评分维度**：
- 正确实现 BFS（30%）
- 正确实现 DFS（30%）
- 处理visited避免重复访问（25%）
- 分析复杂度（15%）

**常见错误**：
- BFS 中节点未入队就标记 visited
- DFS 递归未正确回溯（图不需要显式回溯，但需要 visited）

**延伸追问**：
- 如何判断图中是否有环？
- BFS 和 DFS 分别适合解决什么问题？

**口头回答版**：
> （见代码示例）
> 时间复杂度：O(V + E)，空间复杂度：O(V)。

---

### FB-08-CD-P-010：岛屿数量。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：图、DFS、BFS、连通分量、矩阵
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
给你一个由 `'1'`（陆地）和 `'0'`（水）组成的二维网格，请计算网格中岛屿的数量。岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

**参考答案**：

```js
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // 标记为已访问
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}
```

时间复杂度：O(m × n)，空间复杂度：O(m × n)（递归栈最坏情况）。

**评分维度**：
- 使用 DFS/BFS 遍历连通块（50%）
- 正确标记已访问陆地（25%）
- 分析复杂度（25%）

**常见错误**：
- 未标记已访问导致重复计数
- 边界条件判断错误

**延伸追问**：
- 如何求最大岛屿面积？
- 如果网格很大，递归栈溢出怎么办？

**口头回答版**：
> 时间复杂度：O(m × n)，空间复杂度：O(m × n)（递归栈最坏情况）。

---

### FB-08-CD-P-011：合并区间。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：区间、排序、贪心、合并
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
以数组 `intervals` 表示若干个区间的集合，其中单个区间为 `intervals[i] = [starti, endi]`。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

**参考答案**：

```js
function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    const curr = intervals[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      result.push(curr);
    }
  }
  return result;
}
```

时间复杂度：O(n log n)（主要来自排序），空间复杂度：O(n)。

**评分维度**：
- 先按区间起点排序（30%）
- 正确合并重叠区间（50%）
- 分析复杂度（20%）

**常见错误**：
- 未排序直接合并
- 合并时只取 curr 的终点，未考虑 last 终点更大

**延伸追问**：
- 如何判断一个点是否被区间覆盖？
- 如何求区间的交集而不是并集？

**口头回答版**：
> 时间复杂度：O(n log n)（主要来自排序），空间复杂度：O(n)。

---

### FB-08-CO-P-001：位运算有哪些常见技巧？在前端中有哪些应用？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：08 数据结构与算法
**标签**：位运算、二进制、位掩码、前端应用
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请介绍常见的位运算操作及技巧，并举例说明在前端开发中的应用场景。

**参考答案**：

常见位运算：

| 运算 | 符号 | 说明 |
|------|------|------|
| 与 | `&` | 两位都为 1 才为 1 |
| 或 | `\|` | 有一位为 1 就为 1 |
| 异或 | `^` | 不同为 1，相同为 0 |
| 非 | `~` | 按位取反 |
| 左移 | `<<` | 乘以 2 的幂 |
| 右移 | `>>` | 除以 2 的幂 |

常见技巧：

1. `n & (n - 1)`：去掉 n 二进制表示中最低位的 1。
2. `n & (-n)`：获取 n 二进制表示中最低位的 1。
3. `a ^ a = 0`，`a ^ 0 = a`：可用于找唯一出现奇数次的数字。
4. 位掩码：用整数表示状态集合。

前端应用：

- React 的 `fiber.flags` 使用位掩码管理状态。
- 权限系统设计（每个权限占一位）。
- 颜色值处理（如 RGBA 移位）。

**评分维度**：
- 说清常见位运算含义（30%）
- 掌握常用技巧（40%）
- 举例前端应用场景（30%）

**常见错误**：
- 混淆 `&` 和 `&&`
- 位运算应用于浮点数或超过 32 位的整数

**延伸追问**：
- 如何用位运算判断一个数是否是 2 的幂？
- 如何用位运算实现两数交换？

**口头回答版**：
> | 运算 | 符号 | 说明 | |------|------|------| | 与 | & | 两位都为 1 才为 1 | | 或 | \| | 有一位为 1 就为 1 |

---
### FB-08-CD-P-012：手写一个最小堆 / 优先队列

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：08 数据结构与算法
**标签**：最小堆、优先队列、手写代码、数据结构
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请实现可插入、弹出最小元素、查看堆顶的优先队列。

**参考答案**：

最小堆是完全二叉树，父节点值小于等于子节点。用数组存储，索引 i 的左右子节点为 2i+1、2i+2。插入时上浮，弹出时下沉调整。

    class MinHeap {
      constructor() { this.heap = []; }
      push(val) { this.heap.push(val); this.bubbleUp(); }
      pop() { ... }
      peek() { return this.heap[0]; }
      bubbleUp() { ... }
      sinkDown() { ... }
    }

**评分维度**：
- 结构（30%）：数组表示完全二叉树
- push（30%）：上浮
- pop（40%）：下沉调整

**常见错误**：
- 子节点索引计算错误
- 弹出时未把末尾元素放到根再调整
- 比较函数写死导致无法复用为大顶堆

**口头回答版**：
> 最小堆用数组存储，插入上浮、弹出下沉，可高效获取最小元素。

### FB-08-CD-P-013：手写 Trie（前缀树）

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：08 数据结构与算法
**标签**：Trie、前缀树、字符串、手写代码
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请实现 Trie 的 insert、search、startsWith 方法。

**参考答案**：

Trie 是树形结构，每条边代表一个字符，节点标记是否为单词结尾。适合前缀搜索和自动补全。

    class TrieNode {
      constructor() { this.children = new Map(); this.isEnd = false; }
    }
    class Trie {
      insert(word) { ... }
      search(word) { ... }
      startsWith(prefix) { ... }
    }


**补充说明**：

在实际落地 手写 Trie（前缀树） 时，建议结合 Trie、前缀树、字符串 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 节点结构（30%）：children 和 isEnd
- 插入（30%）：逐字符创建节点
- 查找（40%）：search 与 startsWith 区别

**常见错误**：
- search 和 startsWith 逻辑没有区分是否到单词结尾
- children 用普通对象导致查找顺序不可控
- 没有处理空字符串

**口头回答版**：
> Trie 用节点存储字符路径，支持 insert、search 和 startsWith，适合前缀匹配和自动补全。

### FB-08-CD-P-014：手写并查集

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：08 数据结构与算法
**标签**：并查集、Union-Find、连通性、手写代码
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现带路径压缩和按秩合并的并查集。

**参考答案**：

并查集用于管理元素分组和连通性。find 查找根节点并压缩路径，union 按秩合并两个集合。

    class UnionFind {
      constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
      }
      find(x) { return this.parent[x] === x ? x : this.parent[x] = this.find(this.parent[x]); }
      union(x, y) { ... }
    }

**评分维度**：
- find（40%）：路径压缩
- union（40%）：按秩合并
- 连通判断（20%）：同根即连通

**常见错误**：
- find 没有路径压缩导致树过深
- union 没有按秩合并导致退化
- 初始化 parent 错误

**口头回答版**：
> 并查集通过路径压缩和按秩合并优化 find/union，常用于连通性和集合合并问题。

### FB-08-SC-P-001：设计一个支持撤销重做的编辑器状态系统

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：08 数据结构与算法
**标签**：Undo/Redo、状态管理、命令模式、设计
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个文本/图形编辑器的撤销重做机制。

**参考答案**：

使用命令模式：每个用户操作封装为 execute/undo 命令。维护两个栈：undoStack 和 redoStack。执行新命令时清空 redoStack。每个命令保存足够信息以反向恢复状态。

    class Command { execute() {} undo() {} }
    class Editor { undoStack = []; redoStack = []; execute(cmd) { cmd.execute(); this.undoStack.push(cmd); this.redoStack = []; } undo() { ... } }

**评分维度**：
- 命令模式（40%）：execute/undo
- 双栈（40%）：undoStack/redoStack
- 状态边界（20%）：执行新命令清空 redo

**常见错误**：
- 用深拷贝整个状态保存历史，内存占用大
- undo 后没有维护 redo 栈
- 没有限制历史栈深度导致内存泄漏

**口头回答版**：
> Undo/Redo 可用命令模式封装操作，用 undoStack/redoStack 管理历史，执行新命令时清空 redo。

### FB-08-SC-P-002：实时协作编辑的 OT 或 CRDT 简版思路

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：08 数据结构与算法
**标签**：OT、CRDT、实时协作、设计
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请简述操作转换和 CRDT 在实时编辑中的应用思路。

**参考答案**：

OT：客户端发送操作到服务端，服务端根据并发操作转换后再应用，保证一致性。CRDT：使用满足交换律/结合律/幂等性的数据结构，各副本独立合并即可收敛。

前端通常使用现成库（Yjs、Automerge）实现，核心思路是为每次编辑分配唯一 ID 和位置，冲突时按规则合并。


**补充说明**：

在实际落地 实时协作编辑的 OT 或 CRDT 简版思路 时，建议结合 OT、CRDT、实时协作 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- OT（40%）：操作转换
- CRDT（40%）：无冲突复制数据类型
- 应用（20%）：Yjs/Automerge

**常见错误**：
- 自己实现完整 OT/CRDT 忽略复杂度
- 没有唯一标识导致并发编辑冲突无法解决
- 忽略网络延迟和断线重连状态同步

**口头回答版**：
> OT 通过服务端转换操作保证一致性，CRDT 通过数学性质让副本独立合并收敛；前端常用 Yjs/Automerge。
---

## 架构题（8 道）{#architect}

**口头回答版**：
> | 运算 | 符号 | 说明 | |------|------|------| | 与 | & | 两位都为 1 才为 1 | | 或 | \| | 有一位为 1 就为 1 |

### FB-08-SC-R-001：设计一个前端 LRU 缓存。

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：08 数据结构与算法
**标签**：LRU、缓存、双向链表、Hash Map、设计
**出现频率**：高频
**预计回答时长**：15-20 分钟

**题目描述**：
请设计并实现一个 LRU（最近最少使用）缓存机制。它应该支持 `get` 和 `put` 操作，且两者时间复杂度都为 O(1)。当缓存达到容量上限时，应淘汰最久未使用的数据。

**参考答案**：

核心思路：哈希表 + 双向链表。哈希表实现 O(1) 查找，双向链表维护使用顺序，头部为最近使用，尾部为最久未使用。

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> node
    // 双向链表虚拟头尾
    this.head = { key: null, val: null, prev: null, next: null };
    this.tail = { key: null, val: null, prev: this.head, next: null };
    this.head.next = this.tail;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _moveToHead(node) {
    this._remove(node);
    this._addToHead(node);
  }

  _popTail() {
    const node = this.tail.prev;
    this._remove(node);
    return node;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this._moveToHead(node);
    return node.val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.val = value;
      this._moveToHead(node);
    } else {
      const node = { key, val: value, prev: null, next: null };
      this.cache.set(key, node);
      this._addToHead(node);
      if (this.cache.size > this.capacity) {
        const tail = this._popTail();
        this.cache.delete(tail.key);
      }
    }
  }
}
```

时间复杂度：get/put 均为 O(1)，空间复杂度：O(capacity)。

**评分维度**：
- 选择合适的数据结构组合（30%）
- 正确实现 O(1) 的 get/put（40%）
- 处理容量溢出与淘汰策略（20%）
- 考虑线程安全/前端特殊场景（10%）

**常见错误**：
- 使用数组 + splice 导致 O(n)
- 未正确维护双向链表指针

**延伸追问**：
- 如何实现 LFU（最不经常使用）缓存？
- 如果缓存需要持久化，如何设计？

**口头回答版**：
> 核心思路：哈希表 + 双向链表。 哈希表实现 O(1) 查找，双向链表维护使用顺序，头部为最近使用，尾部为最久未使用。 时间复杂度：get/put 均为 O(1)，空间复杂度：O(capacity)。

---

### FB-08-SC-R-002：设计一个前端请求去重/合并系统。

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：08 数据结构与算法
**标签**：请求去重、请求合并、缓存、Promise、场景设计
**出现频率**：中频
**预计回答时长**：15-20 分钟

**题目描述**：
在一个前端项目中，多个组件可能同时发起相同参数的请求。请设计一个系统，能够自动合并相同请求，避免重复发送，并让所有调用方共享同一份结果。

**参考答案**：

核心思路：使用一个请求池（Map）缓存进行中的请求，key 为请求标识（URL + 参数序列化），value 为 Promise。新请求到来时，若池中已存在相同请求，直接返回已有 Promise。

```js
class RequestDeduper {
  constructor() {
    this.pending = new Map(); // key -> promise
  }

  request(key, factory) {
    if (this.pending.has(key)) {
      return this.pending.get(key);
    }
    const promise = factory().finally(() => {
      this.pending.delete(key);
    });
    this.pending.set(key, promise);
    return promise;
  }
}

// 使用示例
const deduper = new RequestDeduper();
function fetchUser(id) {
  return deduper.request(`user:${id}`, () => fetch(`/api/user/${id}`).then(r => r.json()));
}
```

关键考虑：

1. 请求标识生成：需考虑 URL、method、body、headers 等。
2. 错误处理：失败请求是否从池中移除。
3. 超时控制：避免长时间占用 pending。
4. 缓存策略：可扩展为请求结果缓存（TTL）。

**评分维度**：
- 使用 Map/Promise 实现去重（40%）
- 处理错误、超时、并发边界（30%）
- 讨论缓存键设计与可扩展性（30%）

**常见错误**：
- 未在 finally 中清理 pending 导致内存泄漏
- 缓存 key 设计不严谨导致不同请求被合并

**延伸追问**：
- 如何实现请求防抖与去重的结合？
- 如果后端接口不支持幂等，如何处理？

**口头回答版**：
> 核心思路：使用一个请求池（Map）缓存进行中的请求，key 为请求标识（URL + 参数序列化），value 为 Promise。 新请求到来时，若池中已存在相同请求，直接返回已有 Promise。 请求标识生成：需考虑 URL、method、body、headers 等。 错误处理：失败请求是否从池中移除。

---

### FB-08-CP-R-001：如何为大型前端应用设计一套数据结构来管理状态？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：08 数据结构与算法
**标签**：状态管理、数据结构、Immutable、性能、架构
**出现频率**：中频
**预计回答时长**：20-30 分钟

**题目描述**：
在大型前端应用中，状态管理是核心问题。请从数据结构和算法角度，设计一套状态管理方案，讨论如何组织数据、保证可预测性、支持高效更新和派生计算。

**参考答案**：

设计要点：

1. **单一状态树**：使用一个不可变对象作为全局状态源（如 Redux 的 store）。
2. **规范化数据（Normalization）**：将嵌套数据扁平化，用 ID 引用代替嵌套，避免重复和更新不一致。
   ```js
   {
     users: { byId: { 1: { id: 1, name: 'Tom' } }, allIds: [1] },
     posts: { byId: {}, allIds: [] }
   }
   ```
3. **不可变更新**：使用 Immutable.js、Immer 或 spread 操作，保证状态不可变，便于时间旅行和比较。
4. **派生数据缓存**：使用选择器（Selector）+ 记忆化（reselect），避免重复计算。
5. **订阅机制**：发布订阅或 Proxy，实现组件级细粒度更新。
6. **批量更新与事务**：合并多个状态变更，减少重渲染。

算法考虑：

- 状态比较：对象浅比较 O(1) / 深比较 O(n)。
- 派生计算：记忆化避免 O(n) 重复计算。
- 列表更新：使用 key + diff 算法优化渲染。

**评分维度**：
- 提出单一状态树和规范化数据（30%）
- 讨论不可变性和性能权衡（25%）
- 说明派生计算和订阅机制（25%）
- 结合具体框架或业务场景（20%）

**常见错误**：
- 过度嵌套状态导致更新困难
- 忽略不可变数据带来的性能开销

**延伸追问**：
- 如何处理跨模块的状态依赖？
- 状态树过大时如何分片和懒加载？

**口头回答版**：
> 单一状态树：使用一个不可变对象作为全局状态源（如 Redux 的 store）。 规范化数据（Normalization）：将嵌套数据扁平化，用 ID 引用代替嵌套，避免重复和更新不一致。 不可变更新：使用 Immutable.js、Immer 或 spread 操作，保证状态不可变，便于时间旅行和比较。 派生数据缓存：使用选择器（Selector）+ 记忆化（reselect），避免重复计算。

---

### FB-08-SC-R-003：设计一个前端任务调度器。

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：08 数据结构与算法
**标签**：任务调度、优先级队列、事件循环、并发控制
**出现频率**：中频
**预计回答时长**：15-20 分钟

**题目描述**：
请设计一个前端任务调度器，支持按优先级执行任务、限制并发数量、支持任务取消，并能够在浏览器空闲时执行低优先级任务。

**参考答案**：

```js
class TaskScheduler {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    // 最小堆实现优先级队列
    this.queue = new MinHeap((a, b) => a.priority - b.priority);
  }

  add(task, priority = 0, options = {}) {
    const taskItem = { task, priority, id: options.id || Symbol(), cancel: false };
    this.queue.push(taskItem);
    this._run();
    return () => { taskItem.cancel = true; };
  }

  _run() {
    if (this.running >= this.concurrency || this.queue.isEmpty()) return;
    const item = this.queue.pop();
    if (item.cancel) {
      this._run();
      return;
    }
    this.running++;
    Promise.resolve(item.task())
      .finally(() => {
        this.running--;
        this._run();
      });
    this._run();
  }
}
```

关键设计：

1. **优先级队列**：最小堆，优先级数字越小越优先。
2. **并发控制**：running 计数器限制同时执行任务数。
3. **任务取消**：返回取消函数，设置 cancel 标记。
4. **空闲调度**：低优先级任务可结合 `requestIdleCallback` 或 `requestAnimationFrame`。

**评分维度**：
- 使用优先级队列组织任务（30%）
- 实现并发控制（30%）
- 支持取消和空闲调度（25%）
- 讨论错误处理和任务重试（15%）

**常见错误**：
- 使用普通数组排序导致插入 O(n)
- 未限制并发导致浏览器卡顿

**延伸追问**：
- 如何防止低优先级任务饿死？
- 如果任务有依赖关系，如何设计？

**口头回答版**：
> 优先级队列：最小堆，优先级数字越小越优先。 并发控制：running 计数器限制同时执行任务数。 任务取消：返回取消函数，设置 cancel 标记。 空闲调度：低优先级任务可结合 requestIdleCallback 或 requestAnimationFrame。

---

### FB-08-SC-R-004：设计一个虚拟列表的算法方案。

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：08 数据结构与算法
**标签**：虚拟列表、长列表、性能优化、渲染优化
**出现频率**：高频
**预计回答时长**：15-20 分钟

**题目描述**：
在一个前端列表场景中，数据量可能达到数万甚至数十万条。请设计一个虚拟列表方案，只渲染可视区域内的元素，并支持滚动、动态高度和快速滚动。

**参考答案**：

核心思路：只渲染视口内及缓冲区的元素，根据滚动位置动态计算起始/结束索引。

```js
class VirtualList {
  constructor(container, options) {
    this.container = container;
    this.itemHeight = options.itemHeight;
    this.buffer = options.buffer || 5;
    this.total = options.total;
    this.renderItem = options.renderItem;
    this.visibleStart = 0;
    this.visibleEnd = 0;
    this.init();
  }

  init() {
    this.container.addEventListener('scroll', () => this.onScroll());
    this.onScroll();
  }

  onScroll() {
    const scrollTop = this.container.scrollTop;
    const viewportHeight = this.container.clientHeight;
    const start = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.buffer);
    const end = Math.min(
      this.total,
      Math.ceil((scrollTop + viewportHeight) / this.itemHeight) + this.buffer
    );
    if (start === this.visibleStart && end === this.visibleEnd) return;
    this.visibleStart = start;
    this.visibleEnd = end;
    this.render();
  }

  render() {
    const contentHeight = this.total * this.itemHeight;
    let html = `<div style="height:${contentHeight}px;position:relative">`;
    for (let i = this.visibleStart; i < this.visibleEnd; i++) {
      const top = i * this.itemHeight;
      html += `<div style="position:absolute;top:${top}px;height:${this.itemHeight}px">${this.renderItem(i)}</div>`;
    }
    html += '</div>';
    this.container.innerHTML = html;
  }
}
```

高级优化：

1. **动态高度**：维护每个 item 的位置缓存（prefix sum），用二分查找定位可视范围。
2. **快速滚动**：滚动时先显示占位符，停止滚动后再渲染真实内容。
3. **DOM 复用**：使用 translateY 移动已有 DOM 节点，减少创建销毁开销。

**评分维度**：
- 计算可视区域索引（30%）
- 设置总高度和绝对定位（25%）
- 讨论动态高度处理（25%）
- 考虑快速滚动和 DOM 复用（20%）

**常见错误**：
- 未设置总高度导致滚动条异常
- 滚动事件未节流导致性能问题

**延伸追问**：
- 如何处理不定高内容的测量？
- 虚拟列表和分页加载如何结合？

**口头回答版**：
> 核心思路：只渲染视口内及缓冲区的元素，根据滚动位置动态计算起始/结束索引。 动态高度：维护每个 item 的位置缓存（prefix sum），用二分查找定位可视范围。 快速滚动：滚动时先显示占位符，停止滚动后再渲染真实内容。 DOM 复用：使用 translateY 移动已有 DOM 节点，减少创建销毁开销。

---

### FB-08-CP-R-002：如何在前端实现一个高效的搜索/过滤系统？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：08 数据结构与算法
**标签**：搜索、过滤、索引、Trie、性能优化
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个前端搜索/过滤系统，支持对大量数据进行关键字搜索、多条件过滤和排序。要求讨论数据结构选择、算法优化和用户体验策略。

**参考答案**：

设计要点：

1. **数据索引**：
   - 对常用过滤字段建立倒排索引（inverted index）。
   - 对文本搜索使用 Trie 树或前缀树实现自动补全。
2. **搜索算法**：
   - 小数据量：直接遍历 + 字符串匹配。
   - 大数据量：使用 Web Worker 或 IndexDB 异步搜索。
   - 模糊搜索：Levenshtein 距离、BK 树、Fuse.js。
3. **防抖与节流**：输入时 debounce 减少搜索次数。
4. **缓存与记忆化**：缓存搜索结果，避免重复计算。
5. **分页与虚拟滚动**：避免一次性渲染大量结果。
6. **分词与拼音**：中文场景需要分词和拼音支持。

```js
// 倒排索引示例
const invertedIndex = {
  'apple': [1, 3, 5],
  'banana': [2, 4]
};

function search(keyword) {
  return invertedIndex[keyword.toLowerCase()] || [];
}
```

**评分维度**：
- 选择合适的索引结构（30%）
- 讨论搜索算法与复杂度（25%）
- 考虑防抖、缓存、异步等体验优化（25%）
- 结合实际数据规模和业务场景（20%）

**常见错误**：
- 大数据量下在主线程同步遍历
- 未建立索引导致每次搜索 O(n)

**延伸追问**：
- 如何实现拼音搜索？
- 如何实现搜索结果的实时高亮？

**口头回答版**：
> - 对常用过滤字段建立倒排索引（inverted index）。 - 对文本搜索使用 Trie 树或前缀树实现自动补全。 - 小数据量：直接遍历 + 字符串匹配。 - 大数据量：使用 Web Worker 或 IndexDB 异步搜索。

---

### FB-08-SC-R-005：设计一个 Undo/Redo 系统。

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：08 数据结构与算法
**标签**：Undo、Redo、命令模式、栈、状态管理
**出现频率**：中频
**预计回答时长**：15-20 分钟

**题目描述**：
请设计一个支持撤销（Undo）和重做（Redo）的系统，适用于编辑器、画布、表单等前端场景。要求讨论数据结构、命令设计、内存管理和边界情况。

**参考答案**：

核心思路：命令模式 + 双栈。undo 栈保存已执行命令，redo 栈保存撤销的命令。执行新命令时清空 redo 栈。

```js
class CommandManager {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }

  execute(command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = []; // 新命令清空 redo 栈
  }

  undo() {
    if (this.undoStack.length === 0) return;
    const command = this.undoStack.pop();
    command.undo();
    this.redoStack.push(command);
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const command = this.redoStack.pop();
    command.execute();
    this.undoStack.push(command);
  }
}

class SetValueCommand {
  constructor(target, key, newValue) {
    this.target = target;
    this.key = key;
    this.oldValue = target[key];
    this.newValue = newValue;
  }
  execute() { this.target[this.key] = this.newValue; }
  undo() { this.target[this.key] = this.oldValue; }
}
```

高级考虑：

1. **命令合并**：连续输入合并为一个命令。
2. **内存管理**：限制 undo 栈深度，或存储差异（diff）而非完整状态。
3. **事务**：多个命令作为一个原子操作。
4. **持久化**：将命令日志持久化，支持回放。

**评分维度**：
- 使用双栈 + 命令模式（40%）
- 处理 undo/redo 边界（25%）
- 讨论内存优化和命令合并（20%）
- 结合实际前端场景（15%）

**常见错误**：
- redo 栈未在新命令执行时清空
- 未保存旧状态导致无法撤销

**延伸追问**：
- 如何实现事务性撤销（多个操作一起撤销）？
- 如果状态非常大，如何减少内存占用？

**口头回答版**：
> 核心思路：命令模式 + 双栈。 undo 栈保存已执行命令，redo 栈保存撤销的命令。 执行新命令时清空 redo 栈。 命令合并：连续输入合并为一个命令。

---

### FB-08-CP-R-003：前端算法选型的权衡：时间、空间、可维护性。

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：08 数据结构与算法
**标签**：算法选型、性能、可维护性、工程权衡
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
在前端工程实践中，算法选型不仅要考虑时间复杂度和空间复杂度，还要考虑可维护性、团队能力、浏览器特性和业务场景。请结合实际案例，谈谈你如何进行算法选型。

**参考答案**：

选型维度：

1. **数据规模**：
   - 小数据量（n < 1000）：优先选择可读性好的简单算法。
   - 大数据量：必须考虑时间/空间复杂度，必要时使用 Web Worker、服务端计算。
2. **执行环境**：
   - 主线程算法需控制耗时，避免阻塞渲染。
   - 可利用 IndexDB、Web Worker、WASM 扩展计算能力。
3. **可维护性**：
   - 避免过度优化，优先使用团队熟悉的方案。
   - 复杂算法需配合详细注释和测试。
4. **业务特性**：
   - 实时性要求高的场景：预计算 + 缓存。
   - 可接受延迟的场景：复杂精确算法。
5. **代码体积**：
   - 前端对包大小敏感，避免引入大型算法库。

案例：虚拟列表 vs 分页 vs 全量渲染：

- 数据 < 100 条：直接渲染，最简单。
- 数据 100-10000 条：虚拟列表。
- 数据 > 10000 条：分页 + 服务端搜索。

**评分维度**：
- 从多维度分析算法选型（35%）
- 结合实际案例说明（35%）
- 体现工程化思维和团队考虑（30%）

**常见错误**：
- 只关注理论复杂度，忽略实际环境
- 过度设计，为小数据量引入复杂算法

**延伸追问**：
- 当算法优化影响代码可读性时，你如何取舍？
- 如何在前端做算法性能的基准测试？

**口头回答版**：
> - 小数据量（n < 1000）：优先选择可读性好的简单算法。 - 大数据量：必须考虑时间/空间复杂度，必要时使用 Web Worker、服务端计算。 - 主线程算法需控制耗时，避免阻塞渲染。 - 可利用 IndexDB、Web Worker、WASM 扩展计算能力。

---







