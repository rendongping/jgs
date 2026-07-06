# F08 数据结构与算法

> 目标：掌握前端开发中常用的数据结构与算法，提升代码效率、面试竞争力与复杂问题解决能力。

---

## 核心要点（TL;DR）

- 数据结构是算法的基础，选择合适的数据结构能把时间复杂度从 O(n) 降到 O(1) 或 O(log n)。
- 前端高频数据结构：数组、栈、队列、链表、哈希表、树、图、堆。
- 前端高频算法：排序、双指针、滑动窗口、递归/回溯、BFS/DFS、动态规划、贪心。
- 复杂度分析是评估方案的核心工具，必须熟练掌握时间/空间复杂度。
- 算法能力决定了你能否写出高性能、可扩展的前端代码。
- 本文档涵盖完整 JavaScript 实现 + 复杂度表格 + LeetCode 题号 + 真实前端场景代码。
- 推荐按顺序阅读：复杂度→数据结构→算法→场景题→模板刷题。

---

## 1. 复杂度分析

### 1.1 时间复杂度

| 复杂度 | 名称 | 示例 | 对应数据规模 |
|--------|------|------|-------------|
| O(1) | 常数 | 哈希表查询、数组随机访问 | 任意 |
| O(log n) | 对数 | 二分查找、平衡BST查找 | 10^6 级别 |
| O(根号n) | 平方根 | 判断素数、分解因子 | 10^12 级别 |
| O(n) | 线性 | 遍历数组、寻找最大值 | 10^7 级别 |
| O(n log n) | 线性对数 | 快速排序、归并排序 | 10^6 级别 |
| O(n^2) | 平方 | 冒泡排序、双重循环 | 10^4 级别 |
| O(2^n) | 指数 | 递归回溯、组合枚举 | 20 左右 |
| O(n!) | 阶乘 | 全排列、旅行商问题 | 10 左右 |

> 面试技巧：估算 n 的范围后确定能否接受当前复杂度。例如 n=10^5 时 O(n^2) 不可接受，O(n log n) 可行。

### 1.2 空间复杂度

- **额外空间**：算法运行过程中申请的内存，不包含输入本身占用的空间。
- **原地算法**：空间复杂度为 O(1)，在原数组上直接操作。
- **递归栈空间**：递归深度决定空间复杂度，例如快速排序最好 O(log n)，最坏 O(n)。

### 1.3 复杂度分析方法

```js
// 示例1：单层循环 → O(n)
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// 示例2：嵌套循环 → O(n^2)
function findPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}

// 示例3：分治递归 → O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
// 递归深度 log n，每层合并 O(n) → O(n log n)

// 示例4：哈希表空间换时间
function findDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
  return -1;
}
// 时间 O(n)，空间 O(n) — 典型的空间换时间
```

---

## 2. 常用数据结构

### 2.1 数组与字符串

连续内存，支持随机访问 O(1)。插入/删除末尾 O(1)，中间 O(n)。

#### 操作复杂度

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| 随机访问 | O(1) | arr[i] |
| 末尾插入/删除 | O(1) | push/pop |
| 任意位置插入/删除 | O(n) | splice |
| 查找 | O(n) | indexOf/includes |
| 排序 | O(n log n) | sort |
| 扁平化 | O(n) | flat(Infinity) |

#### 前端应用场景

**场景1：渲染列表去重**

```js
// 使用 Set 实现 O(n) 去重
function uniqueList(arr, keyFn) {
  const seen = new Set();
  return arr.filter(item => {
    const key = keyFn ? keyFn(item) : item;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// 示例：根据 id 去重
const data = [{id:1,name:"A"},{id:2,name:"B"},{id:1,name:"A"}];
console.log(uniqueList(data, item => item.id));
// [{id:1,name:"A"}, {id:2,name:"B"}]
```

**场景2：数组扁平化与树形转换**

```js
// 列表转树形结构（O(n) 使用哈希表）
function listToTree(items, parentId = null) {
  const map = new Map();
  const roots = [];
  for (const item of items) {
    map.set(item.id, { ...item, children: [] });
  }
  for (const item of items) {
    const node = map.get(item.id);
    if (item.parentId === parentId) {
      roots.push(node);
    } else if (map.has(item.parentId)) {
      map.get(item.parentId).children.push(node);
    }
  }
  return roots;
}
```

### 2.2 栈与队列

#### 栈（Stack）— 后进先出（LIFO）

**完整实现**

```js
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
    return this.size();
  }
  pop() {
    return this.items.pop() ?? null;
  }
  peek() {
    return this.items[this.items.length - 1] ?? null;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
}

// 使用示例：括号匹配
function isValidBrackets(s) {
  const stack = [];
  const map = {")": "(", "}": "{", "]": "["};
  for (const ch of s) {
    if ("({[".includes(ch)) {
      stack.push(ch);
    } else if (stack.pop() !== map[ch]) {
      return false;
    }
  }
  return stack.length === 0;
}

console.log(isValidBrackets("()[]{}")); // true
console.log(isValidBrackets("(]"));     // false
```

| 操作 | 时间复杂度 |
|------|-----------|
| push | O(1) |
| pop | O(1) |
| peek | O(1) |
| isEmpty | O(1) |

**前端场景：撤销/重做（Undo/Redo）**

```js
class UndoManager {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }
  execute(action) {
    this.undoStack.push(action);
    this.redoStack = []; // 新操作清除重做
  }
  undo() {
    const action = this.undoStack.pop();
    if (action) {
      action.undo();
      this.redoStack.push(action);
    }
  }
  redo() {
    const action = this.redoStack.pop();
    if (action) {
      action.execute();
      this.undoStack.push(action);
    }
  }
}
```

#### 队列（Queue）— 先进先出（FIFO）

**完整实现**

```js
class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(element) {
    this.items[this.tail] = element;
    this.tail++;
    return this.size();
  }
  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }
  peek() {
    return this.items[this.head] ?? null;
  }
  isEmpty() {
    return this.head === this.tail;
  }
  size() {
    return this.tail - this.head;
  }
  clear() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
}
```

| 操作 | 时间复杂度 |
|------|-----------|
| enqueue | O(1) |
| dequeue | O(1) |
| peek | O(1) |

**优先队列（Priority Queue）**

```js
// 最小堆实现的优先队列（见 2.5 堆的完整实现）
class PriorityQueue {
  constructor(comparator = (a, b) => a < b) {
    this.heap = [];
    this.compare = comparator;
  }
  enqueue(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }
  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._sinkDown(0);
    return top;
  }
  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(this.heap[i], this.heap[parent])) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else break;
    }
  }
  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2*i + 1, right = 2*i + 2;
      if (left < n && this.compare(this.heap[left], this.heap[smallest])) smallest = left;
      if (right < n && this.compare(this.heap[right], this.heap[smallest])) smallest = right;
      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      } else break;
    }
  }
  peek() { return this.heap[0] ?? null; }
  size() { return this.heap.length; }
  isEmpty() { return this.heap.length === 0; }
}

// 使用示例
const pq = new PriorityQueue();
pq.enqueue(3); pq.enqueue(1); pq.enqueue(2);
console.log(pq.dequeue()); // 1
console.log(pq.dequeue()); // 2
console.log(pq.dequeue()); // 3
```

**前端场景：任务队列（异步调度）**

```js
class TaskScheduler {
  constructor(concurrency = 2) {
    this.queue = [];
    this.running = 0;
    this.concurrency = concurrency;
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._run();
    });
  }
  _run() {
    while (this.running < this.concurrency && this.queue.length) {
      const { task, resolve, reject } = this.queue.shift();
      this.running++;
      Promise.resolve(task()).then(resolve, reject).finally(() => {
        this.running--;
        this._run();
      });
    }
  }
}

// 使用：限制并发请求数
const scheduler = new TaskScheduler(3);
for (let i = 0; i < 10; i++) {
  scheduler.add(() => fetch("/api/data/" + i));
}
```

### 2.3 链表

非连续内存，插入删除 O(1)，查找 O(n)。

#### 单向链表完整实现

```js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(val) {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  prepend(val) {
    const node = new ListNode(val, this.head);
    this.head = node;
    if (!this.tail) this.tail = node;
    this.length++;
    return this;
  }

  find(val) {
    let cur = this.head;
    while (cur) {
      if (cur.val === val) return cur;
      cur = cur.next;
    }
    return null;
  }

  delete(val) {
    if (!this.head) return null;
    if (this.head.val === val) {
      const removed = this.head;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return removed;
    }
    let cur = this.head;
    while (cur.next) {
      if (cur.next.val === val) {
        const removed = cur.next;
        cur.next = cur.next.next;
        if (!cur.next) this.tail = cur;
        this.length--;
        return removed;
      }
      cur = cur.next;
    }
    return null;
  }

  toArray() {
    const arr = [];
    let cur = this.head;
    while (cur) {
      arr.push(cur.val);
      cur = cur.next;
    }
    return arr;
  }

  reverse() {
    let prev = null;
    let cur = this.head;
    this.tail = cur;
    while (cur) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }
    this.head = prev;
    return this;
  }
}

// 使用
const list = new LinkedList();
list.append(1).append(2).append(3);
console.log(list.toArray()); // [1, 2, 3]
list.reverse();
console.log(list.toArray()); // [3, 2, 1]
```

| 操作 | 时间复杂度 |
|------|-----------|
| 头部插入/删除 | O(1) |
| 尾部插入 | O(1)（有 tail） |
| 中间插入/删除 | O(n) |
| 查找 | O(n) |
| 反转 | O(n) |

#### 前端场景：React Fiber 链表结构

React Fiber 使用链表实现可中断的递归遍历。每个 Fiber 节点通过 child、sibling、return 指针形成链表树，支持增量渲染。



通过链表结构，React 可以在渲染过程中随时中断并恢复，实现 60fps 的流畅体验。

### 2.4 哈希表

键值对存储，查询/插入/删除平均 O(1)。

| 操作 | 平均 | 最坏 |
|------|------|------|
| 插入 | O(1) | O(n)（哈希碰撞） |
| 删除 | O(1) | O(n) |
| 查找 | O(1) | O(n) |
| 大小 | O(1) | O(1) |

#### JavaScript 实现（链地址法）

```js
class HashTable {
  constructor(size = 53) {
    this.table = new Array(size);
    this.size = size;
    this.count = 0;
  }

  _hash(key) {
    let hash = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      hash = (hash * PRIME + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const idx = this._hash(key);
    if (!this.table[idx]) this.table[idx] = [];
    const bucket = this.table[idx];
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.count++;
    if (this.count / this.size > 0.75) this._resize(this.size * 2);
  }

  get(key) {
    const idx = this._hash(key);
    const bucket = this.table[idx];
    if (!bucket) return undefined;
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return undefined;
  }

  delete(key) {
    const idx = this._hash(key);
    const bucket = this.table[idx];
    if (!bucket) return false;
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    return false;
  }

  _resize(newSize) {
    const oldTable = this.table;
    this.size = newSize;
    this.table = new Array(newSize);
    this.count = 0;
    for (const bucket of oldTable) {
      if (bucket) {
        for (const [k, v] of bucket) this.set(k, v);
      }
    }
  }

  keys() {
    const keys = [];
    for (const bucket of this.table) {
      if (bucket) {
        for (const [k] of bucket) keys.push(k);
      }
    }
    return keys;
  }
}
```

**前端应用：缓存数据索引**

```js
// 根据组件 id 快速查找对应的状态
const componentCache = new Map();

function mountComponent(id, instance) {
  componentCache.set(id, instance);
}

function getComponent(id) {
  return componentCache.get(id);
}

function unmountComponent(id) {
  componentCache.delete(id);
}

// 使用 WeakMap 避免内存泄漏
const stateMap = new WeakMap();
function getState(el) {
  if (!stateMap.has(el)) stateMap.set(el, {});
  return stateMap.get(el);
}
// el 被 GC 时，对应的 state 自动释放
```

### 2.5 树

树是前端面试中最常见的数据结构。核心操作：遍历（前序、中序、后序、层序）。

#### 二叉树节点与遍历实现

```js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 前序遍历：根 → 左 → 右
function preorder(root) {
  if (!root) return [];
  return [root.val, ...preorder(root.left), ...preorder(root.right)];
}

// 中序遍历：左 → 根 → 右
function inorder(root) {
  if (!root) return [];
  return [...inorder(root.left), root.val, ...inorder(root.right)];
}

// 后序遍历：左 → 右 → 根
function postorder(root) {
  if (!root) return [];
  return [...postorder(root.left), ...postorder(root.right), root.val];
}

// 层序遍历（BFS）
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
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

// 迭代前序遍历（显式栈）
function preorderIterative(root) {
  if (!root) return [];
  const result = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}

// 测试
//     1
//    / \n//   2   3
//  / \n// 4   5
const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);
console.log(preorder(root));  // [1,2,4,5,3]
console.log(inorder(root));   // [4,2,5,1,3]
console.log(postorder(root)); // [4,5,2,3,1]
console.log(levelOrder(root));// [[1],[2,3],[4,5]]
```

| 遍历方式 | 时间复杂度 | 空间复杂度 |
|---------|-----------|-----------|
| 前序/中序/后序（递归） | O(n) | O(h) |
| 前序/中序/后序（迭代） | O(n) | O(h) |
| 层序（BFS） | O(n) | O(n) |

> h 为树高，平衡树 h = log n，链状树 h = n

#### 二叉搜索树（BST）

```js
class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const node = new TreeNode(val);
    if (!this.root) { this.root = node; return; }
    let cur = this.root;
    while (true) {
      if (val < cur.val) {
        if (!cur.left) { cur.left = node; return; }
        cur = cur.left;
      } else {
        if (!cur.right) { cur.right = node; return; }
        cur = cur.right;
      }
    }
  }

  search(val) {
    let cur = this.root;
    while (cur) {
      if (val === cur.val) return cur;
      cur = val < cur.val ? cur.left : cur.right;
    }
    return null;
  }

  delete(val) {
    this.root = this._deleteNode(this.root, val);
  }

  _deleteNode(node, val) {
    if (!node) return null;
    if (val < node.val) {
      node.left = this._deleteNode(node.left, val);
    } else if (val > node.val) {
      node.right = this._deleteNode(node.right, val);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      // 有两个子节点：找右子树最小节点
      let min = node.right;
      while (min.left) min = min.left;
      node.val = min.val;
      node.right = this._deleteNode(node.right, min.val);
    }
    return node;
  }

  isValid() {
    return this._isValid(this.root, -Infinity, Infinity);
  }

  _isValid(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return this._isValid(node.left, min, node.val) &&
           this._isValid(node.right, node.val, max);
  }
}

// 验证 BST
const bst = new BST();
[5, 3, 7, 2, 4, 6, 8].forEach(v => bst.insert(v));
console.log(bst.isValid()); // true
console.log(bst.search(4)); // TreeNode
bst.delete(5);
console.log(bst.isValid()); // true
```

#### 堆（Heap）

堆是完全二叉树，用于实现优先队列和 Top K 问题。

```js
class MinHeap {
  constructor() { this.heap = []; }

  insert(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._sinkDown(0);
    return min;
  }

  peek() { return this.heap[0] ?? null; }
  size() { return this.heap.length; }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[i] < this.heap[parent]) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else break;
    }
  }

  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2*i + 1, right = 2*i + 2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      } else break;
    }
  }
}

// Top K 问题：找最大的 K 个元素
function topK(nums, k) {
  const heap = new MinHeap();
  for (const n of nums) {
    heap.insert(n);
    if (heap.size() > k) heap.extractMin();
  }
  const result = [];
  while (heap.size()) result.push(heap.extractMin());
  return result.reverse();
}

console.log(topK([3,2,1,5,6,4], 3)); // [6, 5, 4]
```

| 操作 | 时间复杂度 |
|------|-----------|
| 插入 | O(log n) |
| 提取最值 | O(log n) |
| 建堆 | O(n) |
| Top K | O(n log k) |

#### Trie（前缀树）

```js
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }
    return true;
  }

  // 获取所有以 prefix 开头的单词
  autocomplete(prefix) {
    const results = [];
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return results;
      node = node.children.get(ch);
    }
    this._dfs(node, prefix, results);
    return results;
  }

  _dfs(node, path, results) {
    if (node.isEnd) results.push(path);
    for (const [ch, child] of node.children) {
      this._dfs(child, path + ch, results);
    }
  }
}

// 使用
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");
console.log(trie.autocomplete("ap")); // ["app", "apple", "application"]
console.log(trie.search("app"));      // true
console.log(trie.search("appl"));    // false
```

### 2.6 图

节点与边的集合，用邻接表或邻接矩阵表示。

#### 邻接表实现 + BFS/DFS

```js
class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(v) {
    if (!this.adjList.has(v)) this.adjList.set(v, []);
  }

  addEdge(v1, v2, undirected = true) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjList.get(v1).push(v2);
    if (undirected) this.adjList.get(v2).push(v1);
  }

  // BFS
  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    visited.add(start);
    while (queue.length) {
      const v = queue.shift();
      result.push(v);
      for (const neighbor of this.adjList.get(v) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  // DFS 递归
  dfs(start) {
    const visited = new Set();
    const result = [];
    const dfsHelper = (v) => {
      if (visited.has(v)) return;
      visited.add(v);
      result.push(v);
      for (const neighbor of this.adjList.get(v) || []) {
        dfsHelper(neighbor);
      }
    };
    dfsHelper(start);
    return result;
  }

  // 检测环（有向图）
  hasCycle() {
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color = new Map();
    for (const v of this.adjList.keys()) color.set(v, WHITE);

    const dfs = (v) => {
      color.set(v, GRAY);
      for (const nb of this.adjList.get(v) || []) {
        if (color.get(nb) === GRAY) return true;
        if (color.get(nb) === WHITE && dfs(nb)) return true;
      }
      color.set(v, BLACK);
      return false;
    };

    for (const v of this.adjList.keys()) {
      if (color.get(v) === WHITE && dfs(v)) return true;
    }
    return false;
  }

  // 拓扑排序（Kahn 算法）
  topologicalSort() {
    const inDegree = new Map();
    for (const v of this.adjList.keys()) inDegree.set(v, 0);
    for (const [_, neighbors] of this.adjList) {
      for (const nb of neighbors) {
        inDegree.set(nb, (inDegree.get(nb) || 0) + 1);
      }
    }
    const queue = [];
    for (const [v, deg] of inDegree) {
      if (deg === 0) queue.push(v);
    }
    const result = [];
    while (queue.length) {
      const v = queue.shift();
      result.push(v);
      for (const nb of this.adjList.get(v) || []) {
        inDegree.set(nb, inDegree.get(nb) - 1);
        if (inDegree.get(nb) === 0) queue.push(nb);
      }
    }
    return result.length === this.adjList.size ? result : [];
  }
}

// 使用
const g = new Graph();
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");
console.log(g.bfs("A")); // ["A", "B", "C", "D"]
console.log(g.dfs("A")); // ["A", "B", "D", "C"]
```

| 操作 | 邻接表 | 邻接矩阵 |
|------|--------|---------|
| 添加顶点 | O(1) | O(V^2) |
| 添加边 | O(1) | O(1) |
| 检查相邻 | O(deg(v)) | O(1) |
| BFS/DFS | O(V + E) | O(V^2) |
| 拓扑排序 | O(V + E) | O(V^2) |

**前端场景：模块依赖分析**

```js
// Webpack 等打包工具使用依赖图来构建模块关系
// 检测循环依赖
function detectCircularDeps(modules) {
  // modules: { name: [dependencies] }
  const graph = new Graph();
  for (const [name, deps] of Object.entries(modules)) {
    for (const dep of deps) {
      graph.addEdge(name, dep, false); // 有向图
    }
  }
  return graph.hasCycle();
}

const modules = {
  "app": ["router", "store"],
  "router": ["store"],
  "store": ["utils"],
  "utils": []
};
console.log(detectCircularDeps(modules)); // false
```

---

## 3. 常用算法

### 3.1 排序算法

| 算法 | 平均 | 最坏 | 空间 | 稳定 | 适用场景 |
|------|------|------|------|------|---------|
| 快速排序 | O(n log n) | O(n^2) | O(log n) | 不稳定 | 通用数组排序 |
| 归并排序 | O(n log n) | O(n log n) | O(n) | 稳定 | 链表、外部排序 |
| 堆排序 | O(n log n) | O(n log n) | O(1) | 不稳定 | Top K、优先队列 |
| 计数排序 | O(n + k) | O(n + k) | O(k) | 稳定 | 数据范围小 |
| 桶排序 | O(n + k) | O(n^2) | O(n) | 稳定 | 均匀分布数据 |

#### 快速排序

```js
// 快速排序（Lomuto 分区）
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;
  const pivot = partition(arr, left, right);
  quickSort(arr, left, pivot - 1);
  quickSort(arr, pivot + 1, right);
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

console.log(quickSort([3, 6, 8, 10, 1, 2, 1]));
// [1, 1, 2, 3, 6, 8, 10]

// LeetCode 215：数组中的第K个最大元素
function findKthLargest(nums, k) {
  const target = nums.length - k;
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const pivot = partition(nums, left, right);
    if (pivot === target) return nums[pivot];
    if (pivot < target) left = pivot + 1;
    else right = pivot - 1;
  }
  return nums[left];
}
```

#### 归并排序

```js
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
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// LeetCode 148：排序链表（归并排序链表版本）
function sortList(head) {
  if (!head || !head.next) return head;
  let slow = head, fast = head, prev = null;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = null; // 断开链表
  const left = sortList(head);
  const right = sortList(slow);
  return mergeList(left, right);
}

function mergeList(l1, l2) {
  const dummy = new ListNode(0);
  let cur = dummy;
  while (l1 && l2) {
    if (l1.val < l2.val) { cur.next = l1; l1 = l1.next; }
    else { cur.next = l2; l2 = l2.next; }
    cur = cur.next;
  }
  cur.next = l1 || l2;
  return dummy.next;
}
```

**练习题**：LeetCode 912（排序数组）、215（第K大）、148（排序链表）、75（颜色分类）

### 3.2 双指针与滑动窗口

#### 双指针

```js
// 两数之和 II（已排序数组）— LeetCode 167
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}

// 移除元素 — LeetCode 27
function removeElement(nums, val) {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow++] = nums[fast];
    }
  }
  return slow;
}

// 三数之和 — LeetCode 15
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left+1]) left++;
        while (left < right && nums[right] === nums[right-1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}
```

#### 滑动窗口

```js
// 无重复字符的最长子串 — LeetCode 3
function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// 最小覆盖子串 — LeetCode 76
function minWindow(s, t) {
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let left = 0, right = 0;
  let required = need.size;
  let minLen = Infinity, start = 0;
  while (right < s.length) {
    const rc = s[right];
    if (need.has(rc)) {
      need.set(rc, need.get(rc) - 1);
      if (need.get(rc) === 0) required--;
    }
    right++;
    while (required === 0) {
      if (right - left < minLen) {
        minLen = right - left;
        start = left;
      }
      const lc = s[left];
      if (need.has(lc)) {
        need.set(lc, need.get(lc) + 1);
        if (need.get(lc) > 0) required++;
      }
      left++;
    }
  }
  return minLen === Infinity ? "" : s.slice(start, start + minLen);
}

// 长度最小的子数组 — LeetCode 209
function minSubArrayLen(target, nums) {
  let left = 0, sum = 0, minLen = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}
```

**练习题**：LeetCode 3（无重复子串）、76（最小覆盖子串）、209（长度最小子数组）、567（字符串排列）

### 3.3 递归与回溯

回溯本质是 DFS + 剪枝，适用于组合、排列、子集、棋盘类问题。

```js
// 全排列 — LeetCode 46
function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  const backtrack = (path) => {
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
  };
  backtrack([]);
  return result;
}

// 子集 — LeetCode 78
function subsets(nums) {
  const result = [];
  const backtrack = (start, path) => {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  backtrack(0, []);
  return result;
}

// 组合总和 — LeetCode 39
function combinationSum(candidates, target) {
  const result = [];
  const backtrack = (start, path, sum) => {
    if (sum === target) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (sum + candidates[i] > target) continue; // 剪枝
      path.push(candidates[i]);
      backtrack(i, path, sum + candidates[i]);
      path.pop();
    }
  };
  backtrack(0, [], 0);
  return result;
}

// N 皇后 — LeetCode 51
function solveNQueens(n) {
  const result = [];
  const cols = new Set();
  const diag1 = new Set(); // r + c
  const diag2 = new Set(); // r - c
  const board = Array.from({ length: n }, () => ".".repeat(n));

  const backtrack = (row) => {
    if (row === n) {
      result.push([...board]);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row + col) || diag2.has(row - col)) continue;
      cols.add(col); diag1.add(row + col); diag2.add(row - col);
      const arr = board[row].split("");
      arr[col] = "Q";
      board[row] = arr.join("");
      backtrack(row + 1);
      arr[col] = ".";
      board[row] = arr.join("");
      cols.delete(col); diag1.delete(row + col); diag2.delete(row - col);
    }
  };
  backtrack(0);
  return result;
}
```

| 问题 | 时间复杂度 | 空间复杂度 | 关键剪枝 |
|------|-----------|-----------|---------|
| 全排列 | O(n * n!) | O(n) | used 数组 |
| 子集 | O(n * 2^n) | O(n) | start 索引 |
| 组合总和 | O(2^n) | O(target) | 排序 + sum 剪枝 |
| N 皇后 | O(n!) | O(n) | 列/对角线 Set |

**练习题**：LeetCode 46（全排列）、78（子集）、39（组合总和）、51（N皇后）、79（单词搜索）

### 3.4 动态规划

DP = 最优子结构 + 状态转移方程 + 重叠子问题。

```js
// 斐波那契（基础入门口）
function fib(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    [prev1, prev2] = [prev1 + prev2, prev1];
  }
  return prev1;
}
// 时间 O(n)，空间 O(1)

// 爬楼梯 — LeetCode 70
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    [prev1, prev2] = [prev1 + prev2, prev1];
  }
  return prev1;
}
// dp[i] = dp[i-1] + dp[i-2]

// 最长递增子序列 — LeetCode 300
function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}
// 时间 O(n^2)，可优化到 O(n log n)（耐心排序）

// 背包问题 — 0/1 背包
function knapsack(weights, values, W) {
  const n = weights.length;
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < n; i++) {
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[W];
}
// 完全背包：第二层循环正序遍历

// 最长公共子序列 — LeetCode 1143
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  return dp[m][n];
}

// 股票买卖（一次交易）— LeetCode 121
function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}
```

| 问题 | 状态定义 | 转移方程 | 复杂度 |
|------|---------|---------|-------|
| 爬楼梯 | dp[i] = 到 i 的方法数 | dp[i] = dp[i-1] + dp[i-2] | O(n) |
| LIS | dp[i] = 以 i 结尾的 LIS 长度 | dp[i] = max(dp[j] + 1) | O(n^2) |
| 0/1背包 | dp[w] = 容量 w 的最大价值 | dp[w] = max(dp[w], dp[w-wi] + vi) | O(nW) |
| LCS | dp[i][j] = 前缀 i,j 的 LCS 长度 | dp[i][j] = ... | O(mn) |

**练习题**：LeetCode 70（爬楼梯）、300（LIS）、322（零钱兑换）、1143（LCS）、121（股票买卖）

### 3.5 贪心算法

每一步选择当前最优，需要证明局部最优能推出全局最优。

```js
// 跳跃游戏 — LeetCode 55
function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}

// 用最少数量的箭引爆气球 — LeetCode 452
function findMinArrowShots(points) {
  if (!points.length) return 0;
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 1, end = points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) {
      arrows++;
      end = points[i][1];
    }
  }
  return arrows;
}

// 任务调度器 — LeetCode 621
function leastInterval(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
  const maxFreq = Math.max(...freq);
  const maxCount = freq.filter(f => f === maxFreq).length;
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}
```

**练习题**：LeetCode 55（跳跃游戏）、452（射气球）、621（任务调度器）、435（无重叠区间）

---

## 4. 前端场景题

### 4.1 虚拟列表（Virtual List）

**问题**：渲染 10 万条数据导致页面卡顿。

**方案**：只渲染可视区域内的 DOM 元素，滚动时动态替换。本质是滑动窗口思想在 DOM 渲染中的应用。

**完整实现**

```js
/**
 * 固定高度虚拟列表核心逻辑
 * @param {number} containerHeight - 容器高度
 * @param {number} itemHeight - 每项固定高度
 * @param {number} totalItems - 总数据条数
 * @param {number} overscan - 额外渲染项数（缓冲）
 */
function virtualList(containerHeight, itemHeight, totalItems, overscan = 3) {
  const totalHeight = totalItems * itemHeight;

  return {
    totalHeight,

    /**
     * 根据滚动位置计算需要渲染的项
     */
    getVisibleRange(scrollTop) {
      const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
      const visibleCount = Math.ceil(containerHeight / itemHeight) + 2 * overscan;
      const endIdx = Math.min(totalItems, startIdx + visibleCount);
      return { startIdx, endIdx, visibleCount };
    },

    /**
     * 计算偏移量（在容器内创建一个占位元素撑起滚动高度）
     */
    getOffset(scrollTop) {
      return scrollTop - (scrollTop % itemHeight);
    },

    /**
     * 渲染函数（返回 { items, offset, totalHeight }）
     */
    render(scrollTop, data) {
      const { startIdx, endIdx } = this.getVisibleRange(scrollTop);
      const visibleItems = data.slice(startIdx, endIdx);
      const offsetY = startIdx * itemHeight;
      return {
        visibleItems,
        offsetY,
        totalHeight,
        startIdx,
        endIdx
      };
    }
  };
}

// React 组件骨架
/*
function VirtualList({ data, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  const list = virtualList(containerHeight, itemHeight, data.length);
  const { visibleItems, offsetY, totalHeight } = list.render(scrollTop, data);

  return (
    <div
      style=&#123;&#123; height: containerHeight, overflow: "auto" &#125;&#125;
      onScroll={e => setScrollTop(e.target.scrollTop)}
    >
      <div style=&#123;&#123; height: totalHeight, position: "relative" &#125;&#125;>
        <div style=&#123;&#123; transform: `translateY(${offsetY}px)` &#125;&#125;>
          {visibleItems.map((item, i) => (
            <div key={i} style=&#123;&#123; height: itemHeight &#125;&#125;>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
*/
```

| 指标 | 优化前 | 优化后 |
|------|-------|-------|
| DOM 节点数 | 100,000 | ~20 |
| 首次渲染时间 | 数秒 | 毫秒级 |
| 滚动卡顿 | 明显 | 流畅 |
| 内存占用 | 大 | 小 |

**变体**：动态高度虚拟列表（预估高度 + 二分查找定位）

### 4.2 LRU 缓存

**问题**：实现最近最少使用（Least Recently Used）缓存，get/set 均为 O(1)。

#### 方案一：Map 实现（最简洁）

```js
class LRUCacheMap {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    // 先删除再插入，刷新顺序
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 删除最久未使用的（Map 的迭代顺序是插入顺序）
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }

  has(key) { return this.cache.has(key); }
  size() { return this.cache.size; }
}
```

#### 方案二：双向链表 + 哈希表（更标准，面试常考）

```js
class DLinkedNode {
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    // 虚拟头尾节点，避免边界判断
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._moveToHead(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._moveToHead(node);
    } else {
      const node = new DLinkedNode(key, value);
      this.map.set(key, node);
      this._addToHead(node);
      if (this.map.size > this.capacity) {
        const removed = this._removeTail();
        this.map.delete(removed.key);
      }
    }
  }

  _addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }

  _removeTail() {
    const node = this.tail.prev;
    this._removeNode(node);
    return node;
  }
}

// 验证
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));    // 1
cache.put(3, 3);              // 淘汰 key=2
console.log(cache.get(2));    // -1
```

**LeetCode**：146（LRU 缓存）、460（LFU 缓存）

### 4.3 防抖与节流

防抖和节流本质是时间维度上的队列/窗口控制。

#### 防抖（Debounce）

触发事件后，等待一段时间，如果期间再次触发则重新计时。用于搜索输入、窗口调整。

```js
function debounce(fn, delay = 300, options = {}) {
  const { leading = false } = options;
  let timer = null;
  let leadingCalled = false;

  const debounced = function (...args) {
    if (leading && !leadingCalled) {
      fn.apply(this, args);
      leadingCalled = true;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!leading) fn.apply(this, args);
      leadingCalled = false;
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
    leadingCalled = false;
  };

  return debounced;
}

// 使用
const saveInput = debounce((text) => {
  fetch("/api/search?q=" + text);
}, 300);
// 每次输入都调用，但只有用户停止输入 300ms 后才发请求
```

#### 节流（Throttle）

规定时间内只执行一次。用于滚动、拖拽、resize。

```js
function throttle(fn, interval = 100, options = {}) {
  const { leading = true, trailing = false } = options;
  let lastTime = 0;
  let timer = null;

  const throttled = function (...args) {
    const now = Date.now();
    if (!lastTime && !leading) lastTime = now;

    const remaining = interval - (now - lastTime);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args);
      lastTime = now;
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = leading ? Date.now() : 0;
        timer = null;
      }, remaining);
    }
  };

  throttled.cancel = () => {
    clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };

  return throttled;
}

// 使用
const handleScroll = throttle(() => {
  console.log("scroll position:", window.scrollY);
}, 100);
window.addEventListener("scroll", handleScroll);
```

| 特性 | 防抖 | 节流 |
|------|------|------|
| 行为 | 停稳后执行 | 固定频率执行 |
| 首次触发 | 可配 leading | 可配 leading |
| 末尾触发 | 必有一次 | 可配 trailing |
| 适用 | 搜索、resize | 滚动、拖拽 |

### 4.4 DOM Diff 算法基础

React 的 Reconciliation（协调算法）核心是**同层比较**的 O(n) 算法。

#### 核心策略

1. **同层比较**：只对同一层级的节点进行对比，不跨层级
2. **类型决定**：节点类型不同则直接替换整个子树
3. **key 优化**：通过 key 识别可复用的节点

```js
// 简化的 Diff 算法核心逻辑
function diff(oldChildren, newChildren, keyFn) {
  const oldMap = new Map();
  oldChildren.forEach((child, i) => {
    oldMap.set(keyFn(child), { node: child, index: i });
  });

  const patches = [];
  let lastIndex = 0;

  newChildren.forEach((newChild, newIdx) => {
    const key = keyFn(newChild);
    if (oldMap.has(key)) {
      const oldEntry = oldMap.get(key);
      const oldIdx = oldEntry.index;
      // 判断是否需要移动
      if (oldIdx < lastIndex) {
        patches.push({ type: "MOVE", node: oldEntry.node, toIndex: newIdx });
      }
      lastIndex = Math.max(lastIndex, oldIdx);
      oldMap.delete(key);
      // 还需要对比 props 变化
    } else {
      patches.push({ type: "INSERT", node: newChild, atIndex: newIdx });
    }
  });

  // 剩下的旧节点都需要删除
  for (const [_, entry] of oldMap) {
    patches.push({ type: "REMOVE", node: entry.node });
  }

  return patches;
}

// 示例
const oldList = [
  { id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }
];
const newList = [
  { id: "b" }, { id: "a" }, { id: "c" }, { id: "e" }
];
console.log(diff(oldList, newList, item => item.id));
```

**Vue 的 snabbdom** 和 **React Fiber** 都采用了类似但更完善的方案（如可中断渲染、双缓冲等）。

### 4.5 Trie 自动补全（Autocomplete）

**问题**：实现一个搜索框的自动补全功能，前缀匹配速度快、内存占用合理。

**方案**：使用 Trie（前缀树）+ 提前缓存热门搜索。

```js
// 带权重的 Trie 自动补全
class AutocompleteTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, weight = 1) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch);
      // 沿途更新前缀权重
      node.prefixWeight = Math.max(node.prefixWeight || 0, weight);
    }
    node.isEnd = true;
    node.weight = (node.weight || 0) + weight;
  }

  // 批量构建
  buildFromCorpus(words) {
    for (const { word, weight } of words) {
      this.insert(word, weight);
    }
  }

  // 获取补全建议（按权重排序）
  suggest(prefix, limit = 5) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return [];
      node = node.children.get(ch);
    }

    const results = [];
    const dfs = (cur, path) => {
      if (cur.isEnd) {
        results.push({ word: path, weight: cur.weight || 0 });
      }
      for (const [ch, child] of cur.children) {
        dfs(child, path + ch);
      }
    };
    dfs(node, prefix);

    return results
      .sort((a, b) => b.weight - a.weight)
      .slice(0, limit)
      .map(r => r.word);
  }
}

// 前端使用
const ac = new AutocompleteTrie();
const corpus = [
  { word: "react", weight: 100 },
  { word: "redux", weight: 90 },
  { word: "recoil", weight: 50 },
  { word: "react-native", weight: 80 },
  { word: "vue", weight: 95 },
  { word: "vuex", weight: 70 },
];
ac.buildFromCorpus(corpus);
console.log(ac.suggest("re"));
// ["react", "redux", "react-native", "recoil"]
```

| 操作 | 时间复杂度 |
|------|-----------|
| 插入 | O(L) |
| 搜索 | O(L) |
| 前缀匹配 | O(L + M) |
| 构建（N 个词） | O(N * L) |

> L = 单词长度, M = 匹配结果数

**LeetCode**：208（实现 Trie）、211（通配符匹配）、212（单词搜索 II）

### 4.6 拓扑排序与前端依赖管理

**问题**：前端工程中模块/组件之间存在依赖关系，需要确定加载顺序或并行构建策略。

**方案**：抽象为有向无环图（DAG），使用拓扑排序确定执行顺序。

```js
/**
 * 模块依赖解析器
 * 根据模块依赖关系确定构建/加载顺序
 */
class DependencyResolver {
  constructor() {
    this.graph = new Map();  // 邻接表
    this.inDegree = new Map();
  }

  addModule(name, dependencies = []) {
    if (!this.graph.has(name)) {
      this.graph.set(name, []);
      this.inDegree.set(name, 0);
    }
    for (const dep of dependencies) {
      if (!this.graph.has(dep)) {
        this.graph.set(dep, []);
        this.inDegree.set(dep, 0);
      }
      this.graph.get(dep).push(name);
      this.inDegree.set(name, (this.inDegree.get(name) || 0) + 1);
    }
  }

  // Kahn 算法拓扑排序
  resolve() {
    const queue = [];
    const order = [];
    const inDeg = new Map(this.inDegree);

    // 入度为 0 的节点入队（无依赖的模块）
    for (const [node, deg] of inDeg) {
      if (deg === 0) queue.push(node);
    }

    while (queue.length) {
      const node = queue.shift();
      order.push(node);

      for (const neighbor of this.graph.get(node) || []) {
        const newDeg = inDeg.get(neighbor) - 1;
        inDeg.set(neighbor, newDeg);
        if (newDeg === 0) queue.push(neighbor);
      }
    }

    // 如果还有未处理的节点，说明存在循环依赖
    if (order.length !== this.graph.size) {
      const remaining = [...this.graph.keys()].filter(
        n => !order.includes(n)
      );
      throw new Error(
        "Circular dependency detected: " + remaining.join(" -> ")
      );
    }

    return order;
  }

  // 检测循环依赖
  hasCycle() {
    try {
      this.resolve();
      return false;
    } catch {
      return true;
    }
  }
}

// 使用示例
const resolver = new DependencyResolver();
resolver.addModule("App", ["Router", "Store"]);
resolver.addModule("Router", ["Store", "Utils"]);
resolver.addModule("Store", ["Utils"]);
resolver.addModule("Utils", []);

console.log(resolver.resolve());
// ["Utils", "Store", "Router", "App"]

// 并行构建策略：按层次分批执行
function parallelBuildOrder(resolver) {
  const graph = resolver.graph;
  const inDeg = new Map(resolver.inDegree);
  const levels = [];

  while (true) {
    const current = [];
    for (const [node, deg] of inDeg) {
      if (deg === 0) current.push(node);
    }
    if (current.length === 0) break;

    levels.push(current);
    for (const node of current) {
      inDeg.delete(node);
      for (const neighbor of graph.get(node) || []) {
        if (inDeg.has(neighbor)) {
          inDeg.set(neighbor, inDeg.get(neighbor) - 1);
        }
      }
    }
  }

  return levels;
}
/*
输出：
[
  ["Utils"],         // 第1批可并行
  ["Store"],         // 第2批可并行
  ["Router"],        // 第3批
  ["App"]            // 第4批
]
*/
```

**前端实际应用**：
- Webpack 模块打包顺序确定
- Vite 的预构建依赖分析
- npm/yarn 的依赖版本解析
- 组件按需加载的顺序管理
- 微前端的子应用加载编排

**LeetCode**：207（课程表）、210（课程表 II）、269（火星词典）

---

## 5. 高频面试题模板

> 本节提供面试中最高频的代码模板，能手写这些模板是面试的基本要求。

### 5.1 DFS / BFS 树遍历

```js
/**
 * DFS（递归）— 前序/中序/后序
 * 适用：树的路径问题、属性计算
 */
function dfsTemplate(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    // 前序：result.push(node.val);
    traverse(node.left);
    // 中序：result.push(node.val);
    traverse(node.right);
    // 后序：result.push(node.val);
  }
  traverse(root);
  return result;
}

/**
 * DFS（迭代）— 显式栈
 */
function dfsIterative(root) {
  if (!root) return [];
  const result = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    // 先右后左，保证左子树先处理
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}

/**
 * BFS（层序）— 队列
 * 适用：最短路径、层序遍历、拓扑排序
 */
function bfsTemplate(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
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

/**
 * BFS 求最短路径（网格/图）
 * 适用：迷宫、单词接龙
 */
function bfsShortestPath(grid, start, end) {
  const rows = grid.length, cols = grid[0].length;
  const visited = new Set();
  const queue = [[start[0], start[1], 0]];  // [r, c, dist]
  visited.add(start[0] + "," + start[1]);
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

  while (queue.length) {
    const [r, c, dist] = queue.shift();
    if (r === end[0] && c === end[1]) return dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      const key = nr + "," + nc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
          && grid[nr][nc] !== 0 && !visited.has(key)) {
        visited.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}
```

**相关题目**：LeetCode 102（层序）、104（最大深度）、200（岛屿数量）

### 5.2 二分查找模板

```js
/**
 * 模板1：标准二分查找（找精确值）
 */
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >>> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

/**
 * 模板2：左边界（第一个 >= target 的位置）
 * 适用：找第一个出现、插入位置
 */
function lowerBound(nums, target) {
  let left = 0, right = nums.length;
  while (left < right) {
    const mid = (left + right) >>> 1;
    if (nums[mid] >= target) right = mid;
    else left = mid + 1;
  }
  return left;
}

/**
 * 模板3：右边界（最后一个 <= target 的位置）
 */
function upperBound(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >>> 1;
    if (nums[mid] <= target) left = mid + 1;
    else right = mid - 1;
  }
  return right;
}

/**
 * 模板4：旋转数组二分
 * 适用：搜索旋转排序数组
 */
function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >>> 1;
    if (nums[mid] === target) return mid;
    // 左半有序
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      // 右半有序
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
```

**使用 >>> 1 代替 Math.floor(n / 2)**：无符号右移确保整数除法，且性能更好。

**相关题目**：LeetCode 34（范围查询）、33（旋转数组）、153（最小值）、162（峰值）

### 5.3 滑动窗口模板

滑动窗口是处理子串/子数组问题的核心范式，掌握这个模板可以解决 LeetCode 上大部分滑动窗口题目。

```js
/**
 * 滑动窗口通用模板（固定/可变窗口）
 *
 * 特点：
 * - 窗口由 left/right 双指针维护
 * - right 向右扩展窗口
 * - left 向右收缩窗口
 * - 窗口内容由某种条件（need/window）决定
 */
function slidingWindow(s, t) {
  // 1. 初始化 need 和 window
  const need = new Map();
  const window = new Map();
  for (const ch of t) {
    need.set(ch, (need.get(ch) || 0) + 1);
  }

  let left = 0, right = 0;
  let valid = 0;  // 已满足条件的字符数
  let start = 0, minLen = Infinity;

  // 2. 外层循环扩展 right
  while (right < s.length) {
    const c = s[right];
    right++;

    // 3. 更新窗口内数据
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) valid++;
    }

    // 4. 满足条件时收缩 left
    while (valid === need.size) {
      // 更新结果
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }

      const d = s[left];
      left++;

      // 5. 更新窗口内数据（出窗口）
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid--;
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return minLen === Infinity ? "" : s.slice(start, start + minLen);
}

/**
 * 固定窗口大小
 * 适用：固定长度的子串问题
 */
function fixedWindow(nums, k, target) {
  let sum = 0;
  // 初始化第一个窗口
  for (let i = 0; i < k; i++) sum += nums[i];
  // 滑动窗口
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    // 检查是否满足条件
  }
}

/**
 * 最长子串/子数组（窗口可变但单向增大）
 * 适用：最长无重复子串
 */
function maxWindow(nums, conditionFn) {
  let left = 0, maxLen = 0;
  const window = new Map();

  for (let right = 0; right < nums.length; right++) {
    // 加入右边界元素
    const val = nums[right];
    window.set(val, (window.get(val) || 0) + 1);

    // 不满足条件时移动 left
    while (!conditionFn(window)) {
      const leftVal = nums[left];
      window.set(leftVal, window.get(leftVal) - 1);
      if (window.get(leftVal) === 0) window.delete(leftVal);
      left++;
    }

    // 此时窗口满足条件，更新结果
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

**适用题目**：LeetCode 3（无重复子串）、76（最小覆盖子串）、567（字符串排列）、438（异位词）、209（最短子数组）

### 5.4 动态规划模板

DP 题目的核心是定义状态和转移方程。

```js
/**
 * 模板1：一维 DP
 * 适用：斐波那契、爬楼梯、打家劫舍
 *
 * 状态定义：dp[i] = 以 i 结尾/长度为 i 时的最优值
 * 转移方程：dp[i] = f(dp[i-1], dp[i-2], ...) + g(i)
 */
function dp1D(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  const dp = new Array(n).fill(0);
  // 初始条件
  dp[0] = nums[0];
  // 状态转移
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i-1] + nums[i], nums[i]);
  }
  return Math.max(...dp);
}

/**
 * 模板2：二维 DP
 * 适用：LCS、编辑距离、背包问题
 *
 * 状态定义：dp[i][j] = 处理到 A[0..i) 和 B[0..j) 时的最优值
 */
function dp2D(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 },
    () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  return dp[m][n];
}

/**
 * 模板3：区间 DP
 * 适用：回文子串、石子合并、矩阵链乘
 *
 * 状态定义：dp[i][j] = 区间 [i, j] 上的最优值
 * 遍历顺序：区间长度从小到大
 */
function dpInterval(s) {
  const n = s.length;
  const dp = Array.from({ length: n },
    () => new Array(n).fill(false));
  let count = 0;

  // 区间长度从 1 到 n
  for (let len = 1; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (len === 1) {
        dp[i][j] = true;
      } else if (len === 2) {
        dp[i][j] = s[i] === s[j];
      } else {
        dp[i][j] = s[i] === s[j] && dp[i+1][j-1];
      }
      if (dp[i][j]) count++;
    }
  }
  return count;
}

/**
 * 模板4：状态机 DP
 * 适用：股票买卖系列
 *
 * 状态定义：dp[i][k][s] = 第 i 天，交易 k 次，持有状态 s
 */
function dpStateMachine(prices) {
  // 最多交易一次 LeetCode 121
  let hold = -Infinity, sold = 0;
  for (const price of prices) {
    const prevSold = sold;
    hold = Math.max(hold, -price);   // 买入
    sold = Math.max(sold, hold + price); // 卖出
  }
  return sold;
}

/**
 * DP 解题步骤
 * 1. 确定状态定义（dp[i] / dp[i][j] 表示什么）
 * 2. 确定初始条件（base case）
 * 3. 确定状态转移方程（如何从子问题推导）
 * 4. 确定遍历顺序（一维正向/逆向，二维行/列/对角线）
 * 5. 空间优化（滚动数组）
 */
```

**相关题目**：LeetCode 70（爬楼梯）、300（LIS）、322（零钱兑换）、198（打家劫舍）、72（编辑距离）、5（最长回文子串）

---

## 6. 学习建议

### 6.1 系统学习路径

| 阶段 | 内容 | 时间 | 目标 |
|------|------|------|------|
| 1 | 复杂度分析 + 数组/哈希表 | 3h | 掌握 O(1)/O(n)/O(n^2) 判断 |
| 2 | 栈/队列/链表 | 4h | 掌握基本实现与场景 |
| 3 | 树/图/堆 | 6h | 遍历、BFS/DFS、Top K |
| 4 | 排序/双指针/滑动窗口 | 5h | 刷 20 道基础题 |
| 5 | 递归/回溯 | 4h | 组合/排列/子集模板 |
| 6 | 动态规划 | 6h | 一维到二维到状态机 |
| 7 | 前端场景题 | 3h | 虚拟列表/LRU/防抖等 |
| 8 | 综合刷题 + 模板复习 | 3h | 巩固弱项 |

### 6.2 刷题策略

- **先模板，后变体**：掌握一类题的核心模板后再练习变体
- **同类集中刷**：一天刷 5-10 道同类题目，形成肌肉记忆
- **时间盒原则**：每道题思考 15-30 分钟，无思路直接看题解
- **二刷三刷**：标记不会的题目，隔天/隔周重刷
- **复杂度分析**：每道题都要在代码上方标注时间/空间复杂度

### 6.3 前端专项提升

- **React Fiber**：学习链表在中断恢复中的应用
- **Vue 响应式**：学习队列调度和依赖图
- **Webpack/Vite 构建**：学习拓扑排序与依赖图
- **浏览器渲染**：学习 BFS/DFS 在 DOM 树遍历中的应用
- **Redux/Zustand**：学习不可变数据与结构共享

### 6.4 推荐资源

- LeetCode 热题 100
- 代码随想录 — 刷题路线清晰
- labuladong 算法小抄 — 模板化讲解

---

## 常见误区

| 误区 | 正确理解 |
|------|---------|
| 只背算法，不分析复杂度 | 复杂度是评估方案的核心，面试必问 |
| 追求最优解，忽略可读性 | 先写出正确解，再考虑优化 |
| 忽视数据结构选型 | 合适的数据结构比算法本身更重要 |
| 只做 LeetCode，不结合前端 | 要从业务场景出发，学以致用 |
| 一题只做一遍 | 间隔重复是掌握算法的唯一捷径 |
| 全用递归不优化 | 注意递归深度导致的栈溢出 |
| 动态规划只记公式 | 重点理解状态定义的推导过程 |

---

## 相关领域

- **F01 JavaScript**：算法实现语言基础
- **F03 Browser**：性能分析、渲染优化、事件循环
- **A03 Performance**：算法复杂度与前端性能工程
- **E06 React**：Fiber 链表、Reconciliation、Hooks 调度
- **E07 Vue**：响应式依赖图、异步队列、diff 算法
- **A05 System Design**：算法在架构设计中的体现

---

## 附录：推荐刷题清单

### 入门必刷

| 编号 | 题目 | 考察点 | 难度 |
|------|------|-------|------|
| 1 | 两数之和 | 哈希表 | 简单 |
| 3 | 无重复字符的最长子串 | 滑动窗口 | 中等 |
| 5 | 最长回文子串 | 动态规划 | 中等 |
| 15 | 三数之和 | 双指针 | 中等 |
| 20 | 有效的括号 | 栈 | 简单 |
| 21 | 合并两个有序链表 | 链表 | 简单 |
| 46 | 全排列 | 回溯 | 中等 |
| 53 | 最大子数组和 | DP | 中等 |
| 70 | 爬楼梯 | DP | 简单 |
| 94 | 二叉树中序遍历 | 树 | 简单 |
| 102 | 层序遍历 | BFS | 中等 |
| 121 | 股票买卖 | 状态机 | 简单 |
| 136 | 只出现一次的数字 | 位运算 | 简单 |
| 141 | 环形链表 | 快慢指针 | 简单 |
| 146 | LRU 缓存 | 哈希表+链表 | 中等 |
| 200 | 岛屿数量 | DFS/BFS | 中等 |
| 206 | 反转链表 | 链表 | 简单 |
| 207 | 课程表 | 拓扑排序 | 中等 |
| 208 | 实现 Trie | 树 | 中等 |
| 215 | 第K大元素 | 快速选择 | 中等 |
| 300 | 最长递增子序列 | DP | 中等 |
| 322 | 零钱兑换 | DP | 中等 |
| 704 | 二分查找 | 二分 | 简单 |

### 进阶挑战

| 编号 | 题目 | 考察点 |
|------|------|-------|
| 32 | 最长有效括号 | 栈/DP |
| 42 | 接雨水 | 双指针/单调栈 |
| 72 | 编辑距离 | DP |
| 76 | 最小覆盖子串 | 滑动窗口 |
| 124 | 二叉树最大路径和 | DFS |
| 128 | 最长连续序列 | 哈希表 |
| 239 | 滑动窗口最大值 | 堆/单调队列 |
| 297 | 二叉树的序列化 | BFS |
| 312 | 戳气球 | 区间 DP |
| 354 | 俄罗斯套娃 | 二分+DP |
| 460 | LFU 缓存 | 哈希表+链表 |
| 543 | 二叉树的直径 | DFS |
| 739 | 每日温度 | 单调栈 |

---

**标签**：`#algorithms` `#data-structures` `#complexity` `#interview` `#frontend`

> **最后更新**：2026-07-06


---

## 本领域学习进度

<MarkComplete domainId="data-structures-algorithms" />
<ProgressTracker />
