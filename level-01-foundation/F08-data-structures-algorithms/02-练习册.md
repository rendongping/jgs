# 数据结构与算法练习册

> 通过练习掌握复杂度分析、常用数据结构和算法。

---

## 难度分级

- 🟢 基础：理解概念。
- 🟡 进阶：能应用算法解决问题。
- 🔴 深入：能设计高效方案。

---

## 一、选择题

### 第 1 题（🟢）

数组的随机访问时间复杂度是？

A. O(1)  
B. O(log n)  
C. O(n)  
D. O(n²)

### 第 2 题（🟢）

二分查找的前提条件是？

A. 数组无序  
B. 数组有序  
C. 数组长度固定  
D. 数组元素唯一

### 第 3 题（🟡）

以下哪种数据结构最适合实现 LRU 缓存？

A. 数组  
B. 栈  
C. Map + 双向链表  
D. 队列

### 第 4 题（🟡）

快速排序的平均时间复杂度是？

A. O(n)  
B. O(n log n)  
C. O(n²)  
D. O(log n)

### 第 5 题（🔴）

动态规划的核心思想是？

A. 递归  
B. 分治  
C. 保存子问题结果，避免重复计算  
D. 贪心选择

### 第 6 题（🟢）

栈（Stack）的典型特征是？

A. 先进先出（FIFO）  
B. 先进后出（LIFO）  
C. 随机访问  
D. 键值对存储

### 第 7 题（🟢）

队列（Queue）的典型特征是？

A. 先进先出（FIFO）  
B. 先进后出（LIFO）  
C. 随机访问  
D. 键值对存储

### 第 8 题（🟡）

在单链表中，已知一个待删除节点的引用（非尾节点），执行删除操作的时间复杂度是？

A. O(1)  
B. O(log n)  
C. O(n)  
D. O(n log n)

### 第 9 题（🟡）

以下哪种方法不是解决哈希冲突的常用手段？

A. 链地址法（Separate Chaining）  
B. 开放地址法（Open Addressing）  
C. 再哈希法（Rehashing）  
D. 冒泡排序法

### 第 10 题（🟡）

关于递归与迭代，以下说法正确的是？

A. 递归一定比迭代占用更少内存  
B. 所有递归算法都可以用迭代方式实现  
C. 迭代一定比递归更易读  
D. 递归不可能导致栈溢出

### 第 11 题（🟡）

广度优先搜索（BFS）和深度优先搜索（DFS），以下说法正确的是？

A. BFS 使用栈作为辅助数据结构  
B. DFS 一定能找到无权图的最短路径  
C. BFS 使用队列作为辅助数据结构，按层遍历  
D. DFS 使用队列作为辅助数据结构

### 第 12 题（🟡）

二叉搜索树（BST）的中序遍历结果具有什么特点？

A. 降序排列  
B. 升序排列  
C. 随机排列  
D. 按层排列

### 第 13 题（🟡）

在最小堆（Min-Heap）中，插入一个新元素的时间复杂度是？

A. O(1)  
B. O(log n)  
C. O(n)  
D. O(n log n)

### 第 14 题（🔴）

关于拓扑排序，以下说法正确的是？

A. 任意有向图都可以进行拓扑排序  
B. 一个 DAG（有向无环图）的拓扑排序结果唯一  
C. 若拓扑排序输出的节点数少于总节点数，则图中存在环  
D. 拓扑排序使用贪心策略选取最短路径

### 第 15 题（🔴）

Dijkstra 最短路径算法不能处理以下哪种情况？

A. 有环有向图  
B. 存在负权边的图  
C. 无向图  
D. 带权图

---

## 二、场景分析题

### 第 16 题（🟡）

前端需要渲染一个包含 10 万条数据的表格，如何优化？请分析时间/空间复杂度。

### 第 17 题（🟡）

实现一个函数，判断字符串中的括号是否匹配。请说明使用的数据结构和复杂度。

### 第 18 题（🔴）

设计一个前端路由匹配系统，支持静态路由和通配符路由，如何选型数据结构和算法？

### 第 19 题（🟡）

如何用两个栈实现编辑器的撤销（Undo）和重做（Redo）功能？请说明操作步骤和时间复杂度。

### 第 20 题（🟡）

在前端开发中，防抖（Debounce）和节流（Throttle）的底层实现依赖什么机制？如果事件触发频率极高（如每秒 1000 次），请分析各自的复杂度以及对内存的影响。

### 第 21 题（🔴）

React 的虚拟 DOM Diff 算法（Tree Diff）为什么能从 O(n³) 优化到 O(n)？请从树的层级比较、节点类型判断和 key 属性三个维度分析。

### 第 22 题（🔴）

设计一个关键词自动补全（Autocomplete）系统，用户输入前缀后需要快速返回 Top K 建议。请说明如何用 Trie 树实现，并分析插入和查询的时间复杂度。

### 第 23 题（🟡）

图片懒加载（Image Lazy Loading）中，使用 IntersectionObserver 相比传统的 scroll 事件监听 + getBoundingClientRect 方案有什么性能优势？请分析两种方案的时间复杂度。

---

## 三、设计/开放题

### 第 24 题（🟡）

实现 LRU 缓存类，要求 get 和 put 时间复杂度为 O(1)。

### 第 25 题（🔴）

给定一个 DOM 树和一个目标节点，设计算法查找最近的公共祖先节点，并分析复杂度。

### 第 26 题（🔴）

设计一个依赖分析工具，用于检测项目中的循环依赖。请说明图算法选择和实现思路。

### 第 27 题（🟡）

编写一个函数 flatten(arr)，将任意嵌套的数组展平为一维数组。例如 flatten([1, [2, [3, [4]], 5]]) 返回 [1, 2, 3, 4, 5]。要求分别实现递归版和迭代版，并分析复杂度。

### 第 28 题（🟡）

实现一个深拷贝函数 deepClone(obj)，能够处理对象、数组和循环引用。不能使用 JSON.parse(JSON.stringify(obj))。请说明为何简单递归会遇到循环引用问题以及如何解决。

### 第 29 题（🔴）

实现 Promise.all 的 polyfill，要求支持任意数量的 Promise 并发执行，在所有 Promise 完成后按顺序返回结果数组。如果任一 Promise reject，则整体 reject。请分析复杂度。

### 第 30 题（🟡）

实现一个节流函数 throttle(fn, delay)，确保函数在指定时间间隔内最多执行一次。要求支持首次立即执行（leading）和末尾追加执行（trailing）两种模式。

---

## 四、复杂度分析题

分析以下代码片段的时间复杂度和空间复杂度。

### 第 31 题（🟡）

```javascript
function analyzeA(n) {
  let count = 0;
  for (let i = 1; i <= n; i *= 2) {
    for (let j = 0; j < i; j++) {
      count++;
    }
  }
  return count;
}
```

### 第 32 题（🟡）

```javascript
function analyzeB(arr) {
  const n = arr.length;
  const result = [];
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += arr[j];
      result.push(sum);
    }
  }
  return result;
}
```

### 第 33 题（🟡）

```javascript
function analyzeC(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = analyzeC(n - 1, memo) + analyzeC(n - 2, memo);
  return memo[n];
}
```

### 第 34 题（🔴）

```javascript
function analyzeD(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

### 第 35 题（🔴）

```javascript
function analyzeE(n) {
  if (n <= 1) return n;
  return analyzeE(n - 1) + analyzeE(n - 2);
}
```


---

## 参考答案

### 第 1 题

::: details 查看答案与解析
**答案：A**

数组通过索引随机访问，时间复杂度 O(1)。
:::

### 第 2 题

::: details 查看答案与解析
**答案：B**

二分查找要求数组有序。
:::

### 第 3 题

::: details 查看答案与解析
**答案：C**

Map 提供 O(1) 查询，双向链表维护访问顺序，两者结合实现 O(1) 的 get/put。
:::

### 第 4 题

::: details 查看答案与解析
**答案：B**

快速排序平均时间复杂度 O(n log n)，最坏 O(n²)。
:::

### 第 5 题

::: details 查看答案与解析
**答案：C**

动态规划通过保存子问题结果避免重复计算。
:::

### 第 6 题

::: details 查看答案与解析
**答案：B**

栈是后进先出（LIFO）的数据结构，只允许在一端进行插入和删除操作。常见应用包括函数调用栈、括号匹配、撤销操作等，push/pop 时间复杂度均为 O(1)。
:::

### 第 7 题

::: details 查看答案与解析
**答案：A**

队列是先进先出（FIFO）的数据结构，新元素从队尾入队，旧元素从队头出队。常见应用包括 BFS、任务队列、消息队列等，enqueue/dequeue 时间复杂度均为 O(1)。
:::

### 第 8 题

::: details 查看答案与解析
**答案：A**

删除一个已知节点（非尾节点）可以使用节点替换法：将当前节点的值替换为下一个节点的值，然后修改 next 指针跳过下一个节点。无需遍历链表，时间复杂度 O(1)。注意，如果只知道值而不知道节点位置则需要先查找，总体为 O(n)。
:::

### 第 9 题

::: details 查看答案与解析
**答案：D**

常见的哈希冲突解决方法包括链地址法、开放地址法、再哈希法等。冒泡排序是排序算法，与哈希冲突解决无关。
:::

### 第 10 题

::: details 查看答案与解析
**答案：B**

理论上所有递归算法都可以用迭代加显式栈的方式实现。递归的优势在于代码简洁，但可能因递归深度过大导致栈溢出。迭代通常更节省内存，但代码可能更复杂。
:::

### 第 11 题

::: details 查看答案与解析
**答案：C**

BFS 使用队列辅助，按距离递增的顺序逐层遍历节点。DFS 使用栈（或递归），沿着一条路径走到底再回溯。BFS 在无权图中首次到达目标节点时即为最短路径。
:::

### 第 12 题

::: details 查看答案与解析
**答案：B**

二叉搜索树（BST）的中序遍历顺序为左子树到根节点到右子树。由于左子树值小于根小于右子树，中序遍历输出升序序列。
:::

### 第 13 题

::: details 查看答案与解析
**答案：B**

最小堆的插入操作：将新元素放在数组末尾，然后执行上浮操作，与其父节点比较并交换，直到满足堆的性质。堆的高度为 O(log n)，因此时间复杂度 O(log n)。
:::

### 第 14 题

::: details 查看答案与解析
**答案：C**

拓扑排序仅适用于有向无环图（DAG）。如果拓扑排序过程中处理完的节点数少于总节点数，说明图中存在环。一个 DAG 可能存在多个有效的拓扑排序结果。
:::

### 第 15 题

::: details 查看答案与解析
**答案：B**

Dijkstra 算法基于贪心策略，每次选择当前距离最短的未处理节点。当存在负权边时，已确定最短距离的节点可能被后续的负权边更新，导致贪心策略失效。对于负权边图应使用 Bellman-Ford 算法。
:::


### 第 16 题

::: details 查看答案与解析
**参考思路**：
- 使用虚拟列表（Virtual List），只渲染可视区域数据。
- 时间复杂度：渲染 O(k)，k 为可视区行数；滚动更新 O(1)。
- 空间复杂度：O(k)。
:::

### 第 17 题

::: details 查看答案与解析
**参考思路**：
- 使用栈遍历字符串。
- 遇到左括号入栈，遇到右括号与栈顶匹配。
- 时间复杂度 O(n)，空间复杂度 O(n)。
:::

### 第 18 题

::: details 查看答案与解析
**参考思路**：
- 使用 Trie 树存储路由路径，支持通配符节点。
- 或使用正则匹配，但 Trie 更适合大规模路由。
- 匹配时间复杂度 O(L)，L 为路径长度。
:::

### 第 19 题

::: details 查看答案与解析
**参考思路**：
- 使用两个栈：undoStack 和 redoStack。
- 每次执行操作时，将操作记录推入 undoStack，并清空 redoStack。
- Undo：从 undoStack 弹出顶部记录，执行逆操作，将原操作记录推入 redoStack。
- Redo：从 redoStack 弹出顶部记录，重新执行操作，将其推入 undoStack。
- 每次操作时间复杂度 O(1)，空间复杂度 O(n)，n 为历史操作数。
:::

### 第 20 题

::: details 查看答案与解析
**参考思路**：
- 防抖（Debounce）和节流（Throttle）都依赖闭包和定时器，底层基于 JavaScript 事件循环机制。
- 防抖：每次触发重置定时器。高频触发下定时器被频繁创建销毁，对内存有压力。
- 节流：固定时间间隔执行一次，定时器创建频率固定，内存更友好。
- 每秒 1000 次触发时，节流对内存更友好。
:::

### 第 21 题

::: details 查看答案与解析
**参考思路**：
- 传统 Tree Diff 两两比较所有节点，每层递归还要比较子树，综合复杂度 O(n³)。
- React 的三个优化策略：
  1. Tree diff：只比较同层节点，不跨层级比较。跨层级移动视为删除加创建。
  2. Component diff：不同类型节点直接替换整棵子树，不进行深层比较。
  3. Element diff：通过 key 在同层快速匹配节点，将 O(n²) 遍历优化为 O(n)。
- 基于 Web UI 中跨层级移动操作很少见的工程假设，用近似换来了线性复杂度。
:::

### 第 22 题

::: details 查看答案与解析
**参考思路**：
- 使用 Trie（前缀树）存储所有关键词。
- 每个节点包含子节点映射和 isEnd 标记。
- 插入：从根节点逐字符遍历 Trie，为不存在的字符创建新节点。时间复杂度 O(L)，L 为关键词长度。
- 查询 Top K：先遍历前缀找到对应节点 O(L)，然后在该节点下 DFS 收集所有完整单词 O(M)。
- 优化策略：在每个节点预计算并缓存 Top K 热门建议，查询 O(1)，但插入有写放大 O(L x K)。
:::

### 第 23 题

::: details 查看答案与解析
**参考思路**：
- scroll + getBoundingClientRect：每次滚动事件触发时都需遍历所有图片元素，调用 getBoundingClientRect 触发强制回流。每次滚动事件的时间复杂度为 O(n)。
- IntersectionObserver：浏览器原生 API，仅在元素可见性变化时通过回调通知 JS。无需在滚动事件中执行 JS 计算，回调次数等于可见性变化次数。
- 复杂度对比：传统方案 O(n) 乘滚动频率；IntersectionObserver O(1)，浏览器层面处理且不触发 reflow。
:::


### 第 24 题

::: details 查看答案与解析
**参考实现**：

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
```
:::

### 第 25 题

::: details 查看答案与解析
**参考思路**：
- 从根节点 DFS 遍历，如果当前节点等于其中一个目标，返回当前节点。
- 如果左右子树分别找到两个目标，返回当前节点。
- 时间复杂度 O(n)，空间复杂度 O(h)，h 为树高度。
:::

### 第 26 题

::: details 查看答案与解析
**参考思路**：
- 构建有向图：模块为节点，import 关系为边。
- 使用 DFS 三色标记法检测环（未访问/访问中/已访问），若遇到访问中节点则存在环。
- 也可使用 Kahn 算法拓扑排序，入度为 0 的节点入队，能处理所有节点则无环。
- 若存在环，输出环上节点路径便于定位问题。
:::

### 第 27 题

::: details 查看答案与解析
**参考实现**：

```javascript
function flattenRecursive(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenRecursive(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

function flattenIterative(arr) {
  const result = [];
  const stack = [...arr];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.push(item);
    }
  }
  return result.reverse();
}
```

**解析**：递归版每个元素访问一次，时间复杂度 O(n)，空间复杂度 O(d)，d 为嵌套深度（调用栈）。迭代版时间复杂度 O(n)，空间复杂度 O(n)（显式栈）。
:::

### 第 28 题

::: details 查看答案与解析
**参考实现**：

```javascript
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (map.has(obj)) return map.get(obj);
  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }
  return clone;
}
```

**解析**：简单递归拷贝遇到循环引用会无限递归导致栈溢出。使用 WeakMap 缓存已拷贝的对象引用，每次递归前先检查。时间复杂度 O(n)，空间复杂度 O(n)。
:::

### 第 29 题

::: details 查看答案与解析
**参考实现**：

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("promises must be an array"));
    }
    const results = [];
    let completed = 0;
    const total = promises.length;
    if (total === 0) return resolve(results);
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = value;
          completed++;
          if (completed === total) resolve(results);
        },
        reason => reject(reason)
      );
    });
  });
}
```

**解析**：每个 Promise 的 then 回调执行一次，时间复杂度 O(n)。存储结果数组，空间复杂度 O(n)。关键点：results 按索引赋值保持顺序；任一 reject 立即中断整体。
:::

### 第 30 题

::: details 查看答案与解析
**参考实现**：

```javascript
function throttle(fn, delay, options = { leading: true, trailing: true }) {
  let lastTime = 0;
  let timer = null;
  return function (...args) {
    const now = Date.now();
    const context = this;
    if (!lastTime && options.leading === false) lastTime = now;
    const remaining = delay - (now - lastTime);
    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null; }
      lastTime = now;
      fn.apply(context, args);
    } else if (options.trailing && !timer) {
      timer = setTimeout(() => {
        lastTime = options.leading ? Date.now() : 0;
        timer = null;
        fn.apply(context, args);
      }, remaining);
    }
  };
}
```

**解析**：leading 模式首次触发立即执行；trailing 模式停止触发后补执行最后一次。每次调用时间复杂度 O(1)，空间复杂度 O(1)（闭包中维护 lastTime 和 timer）。
:::


### 第 31 题

::: details 查看答案与解析
**答案**：
- 时间复杂度：O(n)
- 空间复杂度：O(1)

**解析**：外层循环 i 取值 1, 2, 4, 8... 共 log n 次，内层执行 i 次。总次数 = 1 + 2 + 4 + ... + 2^k = 2 * 2^k - 1，当 2^k <= n < 2^(k+1) 时，总次数约 2n - 1，因此 O(n)。仅常量变量，空间 O(1)。
:::

### 第 32 题

::: details 查看答案与解析
**答案**：
- 时间复杂度：O(n²)
- 空间复杂度：O(n²)

**解析**：外层 i 从 0 到 n-1，内层 j 从 i 到 n-1。总执行次数 = n + (n-1) + (n-2) + ... + 1 = n(n+1)/2，即 O(n²)。结果数组存储 n(n+1)/2 个元素，空间 O(n²)。
:::

### 第 33 题

::: details 查看答案与解析
**答案**：
- 时间复杂度：O(n)
- 空间复杂度：O(n)

**解析**：带记忆化的斐波那契，每个 n 只计算一次，共计算 n 次，O(n)。递归栈最大深度 n，memo 存储 n 个键值对，空间 O(n)。无记忆化时会退化为 O(2ⁿ)。
:::

### 第 34 题

::: details 查看答案与解析
**答案**：
- 时间复杂度：O(log n)
- 空间复杂度：O(1)

**解析**：二分查找，每次将搜索范围缩小一半，最多 log₂(n) 次比较。仅使用常量个辅助变量。
:::

### 第 35 题

::: details 查看答案与解析
**答案**：
- 时间复杂度：O(2ⁿ)
- 空间复杂度：O(n)

**解析**：朴素递归斐波那契（无记忆化），每个调用分支为两个子调用，形成高度为 n 的递归树，总节点数约 2ⁿ，时间复杂度指数级 O(2ⁿ)。递归栈最大深度为 n，空间 O(n)。
:::

---

**标签**：`#algorithms` `#data-structures` `#complexity`

> **最后更新**：2026-07-06
