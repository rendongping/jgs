<template>
  <div class="coding-challenge">
    <div class="challenge-tabs">
      <button
        v-for="c in challenges"
        :key="c.id"
        class="challenge-tab"
        :class="{ active: selectedId === c.id }"
        @click="selectChallenge(c.id)"
      >
        {{ c.title }}
      </button>
    </div>

    <div v-if="current" class="challenge-detail">
      <div class="challenge-meta">
        <span class="challenge-difficulty" :class="current.difficulty">{{ difficultyText(current.difficulty) }}</span>
        <span class="challenge-domain">{{ current.domain }}</span>
        <span v-if="current.time" class="challenge-time">建议用时 {{ current.time }}</span>
      </div>

      <div class="challenge-section">
        <h5>题目描述</h5>
        <div class="challenge-body">{{ current.description }}</div>
      </div>

      <div v-if="current.requirements && current.requirements.length" class="challenge-section">
        <h5>要求</h5>
        <ul>
          <li v-for="(r, idx) in current.requirements" :key="idx">{{ r }}</li>
        </ul>
      </div>

      <div v-if="current.examples && current.examples.length" class="challenge-section">
        <h5>示例</h5>
        <div v-for="(ex, idx) in current.examples" :key="idx" class="challenge-example">
          <div class="challenge-example-label">输入</div>
          <pre class="challenge-code">{{ ex.input }}</pre>
          <div class="challenge-example-label">输出</div>
          <pre class="challenge-code">{{ ex.output }}</pre>
          <div v-if="ex.explanation" class="challenge-example-explanation">{{ ex.explanation }}</div>
        </div>
      </div>

      <div class="challenge-section">
        <h5>在线作答</h5>
        <textarea
          v-model="code"
          class="challenge-editor"
          rows="12"
          spellcheck="false"
          :placeholder="current.starter || '请在此输入你的实现代码...'"
        ></textarea>
        <div class="challenge-actions">
          <button class="challenge-btn" @click="runCheck">运行自测</button>
          <button class="challenge-btn secondary" @click="showAnswer = !showAnswer">
            {{ showAnswer ? '隐藏参考答案' : '查看参考答案' }}
          </button>
          <button class="challenge-btn secondary" @click="resetCode">重置代码</button>
        </div>
      </div>

      <div v-if="checkResult" class="challenge-check-result" :class="checkResult.pass ? 'pass' : 'fail'">
        <strong>{{ checkResult.pass ? '自测通过' : '自测未通过' }}</strong>
        <p v-if="checkResult.message">{{ checkResult.message }}</p>
      </div>

      <div v-if="showAnswer" class="challenge-section">
        <h5>参考答案</h5>
        <pre class="challenge-code">{{ current.solution }}</pre>
        <div v-if="current.explanation" class="challenge-explanation">
          <strong>思路解析：</strong>{{ current.explanation }}
        </div>
      </div>

      <div v-if="current.testCases && current.testCases.length" class="challenge-section">
        <h5>测试用例</h5>
        <div v-for="(tc, idx) in current.testCases" :key="idx" class="challenge-test-case">
          <div class="challenge-test-case-header">用例 {{ idx + 1 }}</div>
          <pre class="challenge-code">{{ tc.code }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const challenges = [
  {
    id: 'js-deep-clone',
    title: '实现深拷贝',
    domain: 'JavaScript',
    difficulty: 'intermediate',
    time: '20 分钟',
    description: '编写一个 deepClone 函数，能够递归拷贝对象和数组，并处理循环引用。',
    requirements: ['支持基本类型、对象、数组', '处理循环引用不导致栈溢出', '不拷贝原型链上的属性'],
    examples: [
      {
        input: 'const a = { x: 1, y: { z: 2 } }; const b = deepClone(a); b.y.z = 3; console.log(a.y.z);',
        output: '2',
        explanation: '修改拷贝后的对象不影响原对象。'
      }
    ],
    starter: 'function deepClone(obj, map = new WeakMap()) {\n  // 你的实现\n}',
    solution: `function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], map);
  }
  return clone;
}`,
    explanation: '使用 WeakMap 记录已拷贝对象避免循环引用；递归处理对象和数组；对 Date 和 RegExp 做特殊处理。',
    testCases: [
      { code: 'const a = { x: 1 }; const b = deepClone(a); assert(b.x === 1 && b !== a);' },
      { code: 'const a = { y: { z: 2 } }; const b = deepClone(a); b.y.z = 3; assert(a.y.z === 2);' },
      { code: 'const a = {}; a.self = a; const b = deepClone(a); assert(b.self === b);' },
    ]
  },
  {
    id: 'js-debounce',
    title: '实现防抖函数',
    domain: 'JavaScript',
    difficulty: 'basic',
    time: '15 分钟',
    description: '实现一个 debounce 函数，使得连续触发的事件在最后一次触发后等待指定时间才执行。',
    requirements: ['支持立即执行选项 leading', '支持取消功能 cancel', '返回函数与原函数 this 绑定一致'],
    examples: [
      {
        input: 'const fn = debounce(() => console.log("ok"), 300); fn(); fn(); fn();',
        output: '300ms 后只输出一次 "ok"',
      }
    ],
    starter: 'function debounce(fn, wait, options = {}) {\n  // 你的实现\n}',
    solution: `function debounce(fn, wait, options = {}) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;

  function invoke() {
    fn.apply(lastThis, lastArgs);
  }

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;
    const callNow = options.leading && !timer;
    if (callNow) invoke();
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!options.leading) invoke();
    }, wait);
  }

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}`,
    explanation: '通过 setTimeout 延迟执行；leading 选项控制是否首次立即执行；cancel 可清除定时器。',
    testCases: [
      { code: 'let count = 0; const fn = debounce(() => count++, 100); fn(); fn(); await sleep(200); assert(count === 1);' },
      { code: 'const fn = debounce(() => {}, 100, { leading: true }); let c = 0; fn(); assert(c === 0); await sleep(0); assert(c === 1);' },
    ]
  },
  {
    id: 'js-promise-all',
    title: '实现 Promise.all',
    domain: 'JavaScript',
    difficulty: 'intermediate',
    time: '25 分钟',
    description: '手写一个 myPromiseAll 函数，行为与 Promise.all 一致。',
    requirements: ['输入为可迭代对象', '所有 Promise 完成后返回结果数组', '任一 reject 立即 reject'],
    examples: [
      {
        input: 'myPromiseAll([Promise.resolve(1), Promise.resolve(2)])',
        output: '[1, 2]',
      }
    ],
    starter: 'function myPromiseAll(iterable) {\n  // 你的实现\n}',
    solution: `function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const items = Array.from(iterable);
    if (items.length === 0) return resolve([]);
    const results = new Array(items.length);
    let completed = 0;

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        value => {
          results[index] = value;
          completed++;
          if (completed === items.length) resolve(results);
        },
        reason => reject(reason)
      );
    });
  });
}`,
    explanation: '先将可迭代对象转为数组；用 Promise.resolve 包裹每个元素；计数完成后 resolve，任一失败立即 reject。',
    testCases: [
      { code: 'myPromiseAll([1, 2, 3]).then(v => assert.deepEqual(v, [1, 2, 3]));' },
      { code: 'myPromiseAll([Promise.resolve(1), Promise.reject("err")]).catch(e => assert(e === "err"));' },
    ]
  },
  {
    id: 'react-hooks-counter',
    title: '自定义 useCounter Hook',
    domain: 'React',
    difficulty: 'basic',
    time: '20 分钟',
    description: '实现一个 useCounter Hook，支持 increment、decrement、reset，并支持步长 step。',
    requirements: ['返回 count 和操作函数', '支持初始值和 step 参数', 'reset 回到初始值'],
    starter: 'function useCounter(initialValue = 0, step = 1) {\n  // 你的实现\n}',
    solution: `import { useState, useCallback } from 'react';

function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(c => c + step), [step]);
  const decrement = useCallback(() => setCount(c => c - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}`,
    explanation: '使用 useState 管理状态，useCallback 缓存操作函数，避免重复创建。',
    testCases: [
      { code: 'const { result } = renderHook(() => useCounter(0, 2)); act(() => result.current.increment()); assert(result.current.count === 2);' },
      { code: 'const { result } = renderHook(() => useCounter(10)); act(() => result.current.reset()); assert(result.current.count === 10);' },
    ]
  },
  {
    id: 'react-memo-list',
    title: '优化长列表渲染',
    domain: 'React',
    difficulty: 'intermediate',
    time: '30 分钟',
    description: '给定一个展示大量数据的列表组件，优化其渲染性能，避免不必要的重渲染。',
    requirements: ['使用 React.memo 或 useMemo', '保持列表项 key 稳定', '支持选中态高亮'],
    starter: 'const ListItem = React.memo(({ item, selected, onSelect }) => {\n  // 你的实现\n});',
    solution: `const ListItem = React.memo(({ item, selected, onSelect }) => {
  return (
    <li
      className={selected ? 'selected' : ''}
      onClick={() => onSelect(item.id)}
    >
      {item.name}
    </li>
  );
}, (prev, next) => {
  return prev.item.id === next.item.id && prev.selected === next.selected;
});

function List({ items }) {
  const [selectedId, setSelectedId] = useState(null);
  const handleSelect = useCallback((id) => setSelectedId(id), []);

  return (
    <ul>
      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={handleSelect}
        />
      ))}
    </ul>
  );
}`,
    explanation: 'React.memo 配合自定义比较函数避免无效渲染；useCallback 稳定回调引用；稳定的 key 帮助 React 复用 DOM。',
    testCases: [
      { code: 'const wrapper = mount(<List items={[{id:1, name:"a"}, {id:2, name:"b"}]} />); assert(wrapper.find("li").length === 2);' },
    ]
  },
  {
    id: 'vue-composable-fetch',
    title: '实现 useFetch 组合式函数',
    domain: 'Vue',
    difficulty: 'intermediate',
    time: '25 分钟',
    description: '使用 Vue 3 Composition API 实现一个 useFetch 函数，处理加载态、错误态和请求取消。',
    requirements: ['返回 data、loading、error', '组件卸载时取消未完成的请求', '支持手动重新请求'],
    starter: 'import { ref, watchEffect, onUnmounted } from "vue";\nfunction useFetch(url) {\n  // 你的实现\n}',
    solution: `import { ref, watchEffect, onUnmounted } from 'vue';

function useFetch(url) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  let abortController = null;

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    abortController = new AbortController();

    try {
      const res = await fetch(url.value, { signal: abortController.signal });
      if (!res.ok) throw new Error(res.statusText);
      data.value = await res.json();
    } catch (e) {
      if (e.name !== 'AbortError') error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  watchEffect(() => {
    fetchData();
  });

  onUnmounted(() => {
    abortController?.abort();
  });

  return { data, loading, error, refresh: fetchData };
}`,
    explanation: 'watchEffect 自动追踪 url 变化并重新请求；AbortController 用于取消请求和避免内存泄漏。',
    testCases: [
      { code: 'const { result } = vueTestUtils.mount({ setup() { return useFetch(ref("/api")); } }); assert(result.current.loading.value === true);' },
    ]
  },
  {
    id: 'perf-virtual-list',
    title: '实现简易虚拟列表',
    domain: 'Performance',
    difficulty: 'advanced',
    time: '40 分钟',
    description: '实现一个只渲染可视区域内列表项的虚拟列表组件（固定高度项）。',
    requirements: ['仅渲染可见项', '支持滚动', '保持滚动位置正确'],
    starter: 'function VirtualList({ items, itemHeight, containerHeight }) {\n  // 你的实现\n}',
    solution: `import { useState, useMemo } from 'react';

function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);

  const visibleItems = useMemo(() =>
    items.slice(startIndex, endIndex).map((item, idx) => ({
      ...item,
      index: startIndex + idx,
    })),
  [items, startIndex, endIndex]);

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={e => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(item => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: item.index * itemHeight,
              height: itemHeight,
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}`,
    explanation: '计算可见起止索引，只渲染可见项；外层容器撑开总高度保持滚动条正确。',
    testCases: [
      { code: 'render(<VirtualList items={Array(1000).fill(0).map((_,i)=>({id:i, content:i}))} itemHeight={30} containerHeight={300} />); assert(screen.getAllByText(/\\d+/).length < 20);' },
    ]
  },
  {
    id: 'arch-cache',
    title: '实现带过期时间的缓存',
    domain: 'System Architecture',
    difficulty: 'intermediate',
    time: '25 分钟',
    description: '设计并实现一个带 TTL（过期时间）的内存缓存，支持 get/set/delete。',
    requirements: ['set 时指定 TTL（毫秒）', 'get 时自动清理过期项', '避免内存泄漏'],
    starter: 'class TTLCache {\n  // 你的实现\n}',
    solution: `class TTLCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl) {
    const expires = Date.now() + ttl;
    this.cache.set(key, { value, expires });
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value;
  }

  delete(key) {
    return this.cache.delete(key);
  }
}`,
    explanation: '使用 Map 存储键值和过期时间；get 时惰性清理过期项，防止返回过期数据。',
    testCases: [
      { code: 'const cache = new TTLCache(); cache.set("a", 1, 100); assert(cache.get("a") === 1); await sleep(150); assert(cache.get("a") === undefined);' },
    ]
  },
];

const selectedId = ref(challenges[0].id);
const code = ref('');
const showAnswer = ref(false);
const checkResult = ref(null);
const originalCode = ref('');

const current = computed(() => challenges.find(c => c.id === selectedId.value));

watch(current, (c) => {
  if (c) {
    let saved = '';
    if (typeof window !== 'undefined') {
      saved = localStorage.getItem(`challenge-code-${c.id}`) || '';
    }
    code.value = saved || c.starter || '';
    originalCode.value = code.value;
    showAnswer.value = false;
    checkResult.value = null;
  }
}, { immediate: true });

onMounted(() => {
  if (current.value) {
    const saved = localStorage.getItem(`challenge-code-${current.value.id}`);
    code.value = saved || current.value.starter || '';
    originalCode.value = code.value;
  }
});

function selectChallenge(id) {
  // save current before switch
  if (current.value) {
    localStorage.setItem(`challenge-code-${current.value.id}`, code.value);
  }
  selectedId.value = id;
}

function difficultyText(d) {
  const map = { basic: '基础', intermediate: '进阶', advanced: '深入' };
  return map[d] || d;
}

function runCheck() {
  // Lightweight static check: ensure code is not empty and contains common keywords
  const text = code.value.trim();
  if (!text) {
    checkResult.value = { pass: false, message: '代码不能为空，请先作答。' };
    return;
  }
  if (text === originalCode.value) {
    checkResult.value = { pass: false, message: '请先完成代码再运行自测。' };
    return;
  }
  // Simple heuristic checks per challenge
  const checks = {
    'js-deep-clone': /WeakMap|Map|typeof.*object/.test(text),
    'js-debounce': /setTimeout|clearTimeout/.test(text),
    'js-promise-all': /Promise|resolve|reject/.test(text),
    'react-hooks-counter': /useState|useCallback/.test(text),
    'react-memo-list': /React\.memo|useMemo|useCallback/.test(text),
    'vue-composable-fetch': /watchEffect|onUnmounted|AbortController/.test(text),
    'perf-virtual-list': /slice|Math\.floor|visible/.test(text),
    'arch-cache': /Date\.now|expires|ttl/i.test(text),
  };
  const ok = checks[current.value.id];
  checkResult.value = ok
    ? { pass: true, message: '代码结构符合预期，建议继续对照参考答案和测试用例验证边界情况。' }
    : { pass: false, message: '代码似乎缺少关键实现，请再检查题目要求。' };
}

function resetCode() {
  if (confirm('确定要重置为初始代码吗？')) {
    code.value = current.value.starter || '';
    localStorage.setItem(`challenge-code-${current.value.id}`, code.value);
    checkResult.value = null;
  }
}
</script>

<style scoped>
.coding-challenge {
  margin: 16px 0;
}

.challenge-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.challenge-tab {
  padding: 8px 14px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.challenge-tab:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.challenge-tab.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.challenge-detail {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
}

.challenge-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.challenge-difficulty {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.challenge-difficulty.basic {
  background: #e8f5e9;
  color: #43a047;
}

.challenge-difficulty.intermediate {
  background: #fff3e0;
  color: #fb8c00;
}

.challenge-difficulty.advanced {
  background: #ffebee;
  color: #e53935;
}

.challenge-domain,
.challenge-time {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.challenge-section {
  margin-bottom: 20px;
}

.challenge-section h5 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 15px;
}

.challenge-body {
  line-height: 1.6;
}

.challenge-example {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid var(--vp-c-divider);
}

.challenge-example-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin: 8px 0 4px;
}

.challenge-example-label:first-child {
  margin-top: 0;
}

.challenge-example-explanation {
  margin-top: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.challenge-code {
  margin: 0;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
}

.challenge-editor {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
}

.challenge-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.challenge-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.challenge-btn:hover {
  opacity: 0.9;
}

.challenge-btn.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
}

.challenge-check-result {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.challenge-check-result.pass {
  background: #e8f5e9;
  color: #43a047;
}

.challenge-check-result.fail {
  background: #ffebee;
  color: #e53935;
}

.challenge-explanation {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.6;
}

.challenge-test-case {
  margin-bottom: 12px;
}

.challenge-test-case-header {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .challenge-tabs {
    flex-direction: column;
  }
  .challenge-actions {
    flex-direction: column;
  }
  .challenge-btn {
    width: 100%;
  }
}
</style>
