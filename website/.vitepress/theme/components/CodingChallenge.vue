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
          <button class="challenge-btn" :disabled="running" @click="runCheck">
            {{ running ? '运行中...' : '运行测试' }}
          </button>
          <button class="challenge-btn secondary" @click="showAnswer = !showAnswer">
            {{ showAnswer ? '隐藏参考答案' : '查看参考答案' }}
          </button>
          <button class="challenge-btn secondary" @click="resetCode">重置代码</button>
        </div>
      </div>

      <div v-if="checkResult" class="challenge-check-result" :class="checkResult.pass ? 'pass' : 'fail'">
        <strong>{{ checkResult.pass ? `全部通过（${checkResult.passed}/${checkResult.total}）` : `未通过（${checkResult.passed}/${checkResult.total}）` }}</strong>
        <ul v-if="checkResult.results && checkResult.results.length" class="challenge-result-list">
          <li v-for="(r, idx) in checkResult.results" :key="idx" :class="r.pass ? 'pass' : 'fail'">
            {{ r.pass ? '✓' : '✗' }} {{ r.name }}
            <span v-if="!r.pass" class="challenge-result-error">{{ r.error }}</span>
          </li>
        </ul>
      </div>

      <div v-if="showAnswer" class="challenge-section">
        <h5>参考答案</h5>
        <pre class="challenge-code">{{ current.solution }}</pre>
        <div v-if="current.explanation" class="challenge-explanation">
          <strong>思路解析：</strong>{{ current.explanation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useLearningData } from '../composables/useLearningData.js';

const challenges = [
  {
    id: 'js-deep-clone',
    title: '实现深拷贝',
    domain: 'JavaScript',
    difficulty: 'intermediate',
    time: '20 分钟',
    description: '编写一个 deepClone 函数，能够递归拷贝对象和数组，并处理循环引用。',
    requirements: ['支持基本类型、对象、数组', '处理循环引用不导致栈溢出', '不拷贝原型链上的属性'],
    examples: [{ input: 'const a = { x: 1, y: { z: 2 } }; const b = deepClone(a);', output: 'b.y.z = 3 后 a.y.z 仍为 2' }],
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
    testScript: `
{{USER_CODE}}
test('基本对象深拷贝', () => {
  const a = { x: 1 };
  const b = deepClone(a);
  assert(b.x === 1 && b !== a);
});
test('嵌套对象深拷贝', () => {
  const a = { y: { z: 2 } };
  const b = deepClone(a);
  b.y.z = 3;
  assert(a.y.z === 2);
});
test('数组深拷贝', () => {
  const a = [1, [2, 3]];
  const b = deepClone(a);
  b[1][0] = 9;
  assert(a[1][0] === 2);
});
test('循环引用', () => {
  const a = { self: null };
  a.self = a;
  const b = deepClone(a);
  assert(b.self === b);
});
    `
  },
  {
    id: 'js-debounce',
    title: '实现防抖函数',
    domain: 'JavaScript',
    difficulty: 'basic',
    time: '15 分钟',
    description: '实现一个 debounce 函数，使得连续触发的事件在最后一次触发后等待指定时间才执行。',
    requirements: ['支持立即执行选项 leading', '支持取消功能 cancel', '返回函数与原函数 this 绑定一致'],
    examples: [{ input: 'const fn = debounce(() => console.log("ok"), 300); fn(); fn(); fn();', output: '300ms 后只输出一次 "ok"' }],
    starter: 'function debounce(fn, wait, options = {}) {\n  // 你的实现\n}',
    solution: `function debounce(fn, wait, options = {}) {
  let timer = null;
  function debounced(...args) {
    const callNow = options.leading && !timer;
    if (callNow) fn.apply(this, args);
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!options.leading) fn.apply(this, args);
    }, wait);
  }
  debounced.cancel = () => { clearTimeout(timer); timer = null; };
  return debounced;
}`,
    explanation: '通过 setTimeout 延迟执行；leading 选项控制是否首次立即执行；cancel 可清除定时器。',
    testScript: `
{{USER_CODE}}
test('防抖基本功能', () => {
  let count = 0;
  const fn = debounce(() => count++, 50);
  fn(); fn(); fn();
  assert(count === 0);
  sleep(80);
  assert(count === 1);
});
test('leading 立即执行', () => {
  let count = 0;
  const fn = debounce(() => count++, 50, { leading: true });
  fn();
  assert(count === 1);
  fn(); fn();
  sleep(80);
  assert(count === 1);
});
test('cancel 取消', () => {
  let count = 0;
  const fn = debounce(() => count++, 50);
  fn();
  fn.cancel();
  sleep(80);
  assert(count === 0);
});
    `
  },
  {
    id: 'js-promise-all',
    title: '实现 Promise.all',
    domain: 'JavaScript',
    difficulty: 'intermediate',
    time: '25 分钟',
    description: '手写一个 myPromiseAll 函数，行为与 Promise.all 一致。',
    requirements: ['输入为可迭代对象', '所有 Promise 完成后返回结果数组', '任一 reject 立即 reject'],
    examples: [{ input: 'myPromiseAll([Promise.resolve(1), Promise.resolve(2)])', output: '[1, 2]' }],
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
    testScript: `
{{USER_CODE}}
async function runAsyncTests() {
  test('普通值', async () => {
    const result = await myPromiseAll([1, 2, 3]);
    assert(deepEqual(result, [1, 2, 3]));
  });
  test('Promise 混合', async () => {
    const result = await myPromiseAll([Promise.resolve(1), 2, Promise.resolve(3)]);
    assert(deepEqual(result, [1, 2, 3]));
  });
  test('空数组', async () => {
    const result = await myPromiseAll([]);
    assert(deepEqual(result, []));
  });
  test('reject 立即失败', async () => {
    try {
      await myPromiseAll([Promise.resolve(1), Promise.reject('err')]);
      assert(false, '应该 reject');
    } catch (e) {
      assert(e === 'err');
    }
  });
}
runAsyncTests();
    `
  },
  {
    id: 'js-throttle',
    title: '实现节流函数',
    domain: 'JavaScript',
    difficulty: 'basic',
    time: '15 分钟',
    description: '实现 throttle 函数，限制函数在一定时间内的执行次数。',
    requirements: ['默认首次立即执行', '间隔内多次调用只执行一次', '支持 trailing 选项'],
    examples: [{ input: 'const fn = throttle(() => console.log("ok"), 100);', output: '高频调用时每隔 100ms 执行一次' }],
    starter: 'function throttle(fn, wait, options = {}) {\n  // 你的实现\n}',
    solution: `function throttle(fn, wait, options = {}) {
  let lastTime = 0;
  let timer = null;
  function throttled(...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    } else if (options.trailing && !timer) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(this, args);
      }, wait - (now - lastTime));
    }
  }
  return throttled;
}`,
    explanation: '记录上次执行时间，控制执行频率；trailing 选项支持在周期结束时补一次执行。',
    testScript: `
{{USER_CODE}}
test('基本节流', () => {
  let count = 0;
  const fn = throttle(() => count++, 50);
  fn(); fn(); fn();
  assert(count === 1);
  sleep(60);
  fn();
  assert(count === 2);
});
    `
  },
  {
    id: 'js-curry',
    title: '实现函数柯里化',
    domain: 'JavaScript',
    difficulty: 'basic',
    time: '15 分钟',
    description: '实现 curry 函数，将多参数函数转换为一系列单参数函数。',
    requirements: ['支持多次调用累积参数', '参数足够时执行原函数', '支持任意数量参数'],
    examples: [{ input: 'const add = curry((a, b, c) => a + b + c); add(1)(2)(3)', output: '6' }],
    starter: 'function curry(fn) {\n  // 你的实现\n}',
    solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}`,
    explanation: '递归收集参数，当参数数量达到原函数形参数量时执行。',
    testScript: `
{{USER_CODE}}
test('柯里化基本用法', () => {
  const add = curry((a, b, c) => a + b + c);
  assert(add(1)(2)(3) === 6);
  assert(add(1, 2)(3) === 6);
  assert(add(1)(2, 3) === 6);
});
    `
  },
  {
    id: 'js-event-emitter',
    title: '实现 EventEmitter',
    domain: 'JavaScript',
    difficulty: 'intermediate',
    time: '20 分钟',
    description: '实现一个简单的事件发布订阅器。',
    requirements: ['支持 on/off/emit/once', '支持一个事件多个监听', 'once 只触发一次'],
    examples: [{ input: 'const emitter = new EventEmitter(); emitter.on("foo", cb); emitter.emit("foo");', output: 'cb 被调用' }],
    starter: 'class EventEmitter {\n  // 你的实现\n}',
    solution: `class EventEmitter {
  constructor() { this.events = {}; }
  on(type, handler) {
    if (!this.events[type]) this.events[type] = [];
    this.events[type].push(handler);
  }
  off(type, handler) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(h => h !== handler);
  }
  once(type, handler) {
    const onceWrapper = (...args) => {
      handler(...args);
      this.off(type, onceWrapper);
    };
    this.on(type, onceWrapper);
  }
  emit(type, ...args) {
    (this.events[type] || []).forEach(h => h(...args));
  }
}`,
    explanation: '用对象存储事件到监听器数组的映射；once 通过包装函数实现单次触发后移除。',
    testScript: `
{{USER_CODE}}
test('on 和 emit', () => {
  const emitter = new EventEmitter();
  let count = 0;
  emitter.on('foo', () => count++);
  emitter.emit('foo');
  emitter.emit('foo');
  assert(count === 2);
});
test('off 移除监听', () => {
  const emitter = new EventEmitter();
  let count = 0;
  const cb = () => count++;
  emitter.on('foo', cb);
  emitter.off('foo', cb);
  emitter.emit('foo');
  assert(count === 0);
});
test('once 只触发一次', () => {
  const emitter = new EventEmitter();
  let count = 0;
  emitter.once('foo', () => count++);
  emitter.emit('foo');
  emitter.emit('foo');
  assert(count === 1);
});
    `
  },
  {
    id: 'js-pub-sub',
    title: '实现发布订阅状态管理',
    domain: 'JavaScript',
    difficulty: 'intermediate',
    time: '25 分钟',
    description: '实现一个极简的发布订阅状态管理器 createStore。',
    requirements: ['支持 getState/setState/subscribe', 'setState 后通知所有订阅者', 'subscribe 返回取消订阅函数'],
    examples: [{ input: 'const store = createStore({ count: 0 });', output: '可读取和更新状态并通知监听' }],
    starter: 'function createStore(initialState = {}) {\n  // 你的实现\n}',
    solution: `function createStore(initialState = {}) {
  let state = { ...initialState };
  const listeners = new Set();
  return {
    getState: () => ({ ...state }),
    setState: (updater) => {
      const next = typeof updater === 'function' ? updater(state) : updater;
      state = { ...state, ...next };
      listeners.forEach(fn => fn(state));
    },
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}`,
    explanation: '通过闭包保存状态，Set 保存订阅者，setState 时合并新状态并通知所有监听。',
    testScript: `
{{USER_CODE}}
test('状态读写', () => {
  const store = createStore({ count: 0 });
  assert(store.getState().count === 0);
  store.setState({ count: 1 });
  assert(store.getState().count === 1);
});
test('订阅通知', () => {
  const store = createStore({ count: 0 });
  let called = false;
  store.subscribe(() => called = true);
  store.setState({ count: 1 });
  assert(called);
});
test('取消订阅', () => {
  const store = createStore({ count: 0 });
  let count = 0;
  const unsubscribe = store.subscribe(() => count++);
  unsubscribe();
  store.setState({ count: 1 });
  assert(count === 0);
});
    `
  },
  {
    id: 'js-lazy-load',
    title: '实现图片懒加载',
    domain: 'Browser',
    difficulty: 'intermediate',
    time: '20 分钟',
    description: '实现 lazyLoadImages 函数，让页面图片延迟加载。',
    requirements: ['使用 IntersectionObserver', '支持占位符 data-src', '只加载进入视口的图片'],
    examples: [{ input: '<img data-src="real.jpg" src="placeholder.jpg">', output: '进入视口后将 src 替换为 data-src' }],
    starter: 'function lazyLoadImages(selector = "img[data-src]") {\n  // 你的实现\n}',
    solution: `function lazyLoadImages(selector = 'img[data-src]') {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(selector).forEach(img => {
      img.src = img.dataset.src;
    });
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
  document.querySelectorAll(selector).forEach(img => observer.observe(img));
}`,
    explanation: '优先使用 IntersectionObserver 监听元素是否进入视口，不支持时降级直接加载。',
    testScript: `
{{USER_CODE}}
test('函数存在且不报错', () => {
  assert(typeof lazyLoadImages === 'function');
});
    `
  },
  {
    id: 'js-xss-filter',
    title: '实现 XSS 过滤',
    domain: 'Security',
    difficulty: 'intermediate',
    time: '20 分钟',
    description: '实现 escapeHtml 函数，将用户输入中的特殊字符转义。',
    requirements: ['转义 < > " \' &', '不影响普通文本显示'],
    examples: [{ input: 'escapeHtml("<script>alert(1)<\\/script>")', output: '&lt;script&gt;alert(1)&lt;/script&gt;' }],
    starter: 'function escapeHtml(str) {\n  // 你的实现\n}',
    solution: `function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(str).replace(/[&<>"']/g, char => map[char]);
}`,
    explanation: '用正则替换特殊字符为 HTML 实体，防止浏览器解析为标签或属性。',
    testScript: `
{{USER_CODE}}
test('转义特殊字符', () => {
  assert(escapeHtml('<script>alert(1)<\\/script>') === '&lt;script&gt;alert(1)&lt;/script&gt;');
});
test('转义引号', () => {
  assert(escapeHtml('"\'\\'') === '&quot;&#39;&#39;');
});
    `
  },
  {
    id: 'react-hooks-counter',
    title: '自定义 useCounter Hook',
    domain: 'React',
    difficulty: 'basic',
    time: '20 分钟',
    description: '实现一个 useCounter Hook，支持 increment、decrement、reset，并支持步长 step。',
    requirements: ['返回 count 和操作函数', '支持初始值和 step 参数', 'reset 回到初始值'],
    examples: [{ input: 'const { count, increment } = useCounter(0, 2);', output: 'increment 后 count 为 2' }],
    starter: 'function useCounter(initialValue = 0, step = 1) {\n  // 你的实现\n}',
    solution: `function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = React.useState(initialValue);
  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const reset = () => setCount(initialValue);
  return { count, increment, decrement, reset };
}`,
    explanation: '使用 useState 管理状态，返回基于 step 的操作函数。',
    testScript: `
{{USER_CODE}}
test('useCounter 存在', () => {
  assert(typeof useCounter === 'function');
});
    `
  },
  {
    id: 'vue-composable-fetch',
    title: '实现 useFetch 组合式函数',
    domain: 'Vue',
    difficulty: 'intermediate',
    time: '25 分钟',
    description: '使用 Vue 3 Composition API 实现一个 useFetch 函数，处理加载态、错误态和请求取消。',
    requirements: ['返回 data、loading、error', '组件卸载时取消未完成的请求', '支持手动重新请求'],
    examples: [{ input: 'const { data, loading } = useFetch(url);', output: '根据 url 自动请求并返回状态' }],
    starter: 'function useFetch(url) {\n  // 你的实现\n}',
    solution: `function useFetch(url) {
  const data = Vue.ref(null);
  const loading = Vue.ref(false);
  const error = Vue.ref(null);
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
  Vue.watchEffect(fetchData);
  Vue.onUnmounted(() => abortController?.abort());
  return { data, loading, error, refresh: fetchData };
}`,
    explanation: 'watchEffect 自动追踪 url 变化并重新请求；AbortController 用于取消请求和避免内存泄漏。',
    testScript: `
{{USER_CODE}}
test('useFetch 存在', () => {
  assert(typeof useFetch === 'function');
});
    `
  },
  {
    id: 'perf-virtual-list',
    title: '实现简易虚拟列表',
    domain: 'Performance',
    difficulty: 'advanced',
    time: '40 分钟',
    description: '实现一个只渲染可视区域内列表项的虚拟列表组件（固定高度项）。',
    requirements: ['仅渲染可见项', '支持滚动', '保持滚动位置正确'],
    examples: [{ input: 'VirtualList({ items, itemHeight: 30, containerHeight: 300 })', output: '只渲染约 10-11 个可见项' }],
    starter: 'function VirtualList({ items, itemHeight, containerHeight }) {\n  // 你的实现（使用 React）\n}',
    solution: `function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  const visibleItems = items.slice(startIndex, endIndex);
  return React.createElement('div', {
    style: { height: containerHeight, overflow: 'auto' },
    onScroll: e => setScrollTop(e.target.scrollTop)
  }, React.createElement('div', { style: { height: totalHeight, position: 'relative' } },
    visibleItems.map((item, i) => React.createElement('div', {
      key: item.id,
      style: { position: 'absolute', top: (startIndex + i) * itemHeight, height: itemHeight }
    }, item.content))
  ));
}`,
    explanation: '计算可见起止索引，只渲染可见项；外层容器撑开总高度保持滚动条正确。',
    testScript: `
{{USER_CODE}}
test('VirtualList 存在', () => {
  assert(typeof VirtualList === 'function');
});
    `
  },
  {
    id: 'arch-cache',
    title: '实现带过期时间的缓存',
    domain: 'System Architecture',
    difficulty: 'intermediate',
    time: '25 分钟',
    description: '设计并实现一个带 TTL（过期时间）的内存缓存，支持 get/set/delete。',
    requirements: ['set 时指定 TTL（毫秒）', 'get 时自动清理过期项', '避免内存泄漏'],
    examples: [{ input: 'cache.set("a", 1, 100); cache.get("a");', output: '100ms 内返回 1，之后返回 undefined' }],
    starter: 'class TTLCache {\n  // 你的实现\n}',
    solution: `class TTLCache {
  constructor() { this.cache = new Map(); }
  set(key, value, ttl) {
    this.cache.set(key, { value, expires: Date.now() + ttl });
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
  delete(key) { return this.cache.delete(key); }
}`,
    explanation: '使用 Map 存储键值和过期时间；get 时惰性清理过期项，防止返回过期数据。',
    testScript: `
{{USER_CODE}}
test('TTLCache 基本读写', () => {
  const cache = new TTLCache();
  cache.set('a', 1, 1000);
  assert(cache.get('a') === 1);
});
test('TTLCache 过期清理', () => {
  const cache = new TTLCache();
  cache.set('a', 1, 10);
  assert(cache.get('a') === 1);
  sleep(30);
  assert(cache.get('a') === undefined);
});
test('TTLCache delete', () => {
  const cache = new TTLCache();
  cache.set('a', 1, 1000);
  cache.delete('a');
  assert(cache.get('a') === undefined);
});
    `
  },
  {
    id: 'arch-promise-pool',
    title: '实现并发控制池',
    domain: 'System Architecture',
    difficulty: 'advanced',
    time: '35 分钟',
    description: '实现一个 asyncPool 函数，控制异步任务的并发数。',
    requirements: ['最多同时执行 poolSize 个任务', '返回所有任务结果', '任一任务失败不影响其他任务执行，但最终 reject'],
    examples: [{ input: 'asyncPool(2, [task1, task2, task3, task4])', output: '按并发度 2 依次执行 4 个任务' }],
    starter: 'function asyncPool(poolSize, tasks) {\n  // 你的实现\n}',
    solution: `function asyncPool(poolSize, tasks) {
  return new Promise((resolve, reject) => {
    const results = new Array(tasks.length);
    let running = 0;
    let completed = 0;
    let index = 0;
    function runNext() {
      if (completed === tasks.length) return resolve(results);
      while (running < poolSize && index < tasks.length) {
        const currentIndex = index++;
        running++;
        Promise.resolve(tasks[currentIndex]()).then(
          value => {
            results[currentIndex] = { status: 'fulfilled', value };
          },
          reason => {
            results[currentIndex] = { status: 'rejected', reason };
          }
        ).finally(() => {
          running--;
          completed++;
          runNext();
        });
      }
    }
    runNext();
  });
}`,
    explanation: '维护运行中任务数，循环启动新任务直到达到并发上限；任务完成时递归补充新任务。',
    testScript: `
{{USER_CODE}}
async function runPoolTests() {
  test('并发控制', async () => {
    let running = 0;
    let maxRunning = 0;
    const tasks = Array(4).fill(0).map((_, i) => async () => {
      running++;
      maxRunning = Math.max(maxRunning, running);
      sleep(20);
      running--;
      return i;
    });
    const results = await asyncPool(2, tasks);
    assert(maxRunning <= 2);
    assert(results.length === 4);
  });
}
runPoolTests();
    `
  },
  {
    id: 'ai-prompt-template',
    title: '实现 Prompt 模板引擎',
    domain: 'AI Engineering',
    difficulty: 'intermediate',
    time: '20 分钟',
    description: '实现一个简单的 promptTemplate 函数，支持 {{variable}} 插值。',
    requirements: ['替换模板中的变量占位符', '支持嵌套对象属性', '未定义的变量保留原样或置空'],
    examples: [{ input: 'promptTemplate("你好 {{name}}", { name: "AI" })', output: '你好 AI' }],
    starter: 'function promptTemplate(template, variables) {\n  // 你的实现\n}',
    solution: `function promptTemplate(template, variables) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables && key in variables ? variables[key] : match;
  });
}`,
    explanation: '使用正则匹配 {{key}} 并从变量对象中取值替换。',
    testScript: `
{{USER_CODE}}
test('基本插值', () => {
  assert(promptTemplate('你好 {{name}}', { name: 'AI' }) === '你好 AI');
});
test('多个变量', () => {
  assert(promptTemplate('{{a}} + {{b}} = {{c}}', { a: 1, b: 2, c: 3 }) === '1 + 2 = 3');
});
test('未定义变量保留', () => {
  assert(promptTemplate('{{a}} {{b}}', { a: 1 }) === '1 {{b}}');
});
    `
  },
  {
    id: 'ai-structured-output',
    title: '实现 JSON 输出校验',
    domain: 'AI Engineering',
    difficulty: 'intermediate',
    time: '20 分钟',
    description: '实现一个 validateJSON 函数，校验 LLM 返回的 JSON 字符串是否符合指定 schema。',
    requirements: ['解析 JSON 字符串', '校验必填字段存在且类型正确', '返回 { valid, data, error }'],
    examples: [{ input: 'validateJSON("{\"name\":\"a\"}", { name: "string" })', output: '{ valid: true, data: {...} }' }],
    starter: 'function validateJSON(jsonStr, schema) {\n  // 你的实现\n}',
    solution: `function validateJSON(jsonStr, schema) {
  try {
    const data = JSON.parse(jsonStr);
    for (const [key, type] of Object.entries(schema)) {
      if (!(key in data)) return { valid: false, error: \`缺少字段 \${key}\` };
      if (typeof data[key] !== type) return { valid: false, error: \`字段 \${key} 类型错误\` };
    }
    return { valid: true, data };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}`,
    explanation: '先解析 JSON，再按 schema 逐项校验字段类型。',
    testScript: `
{{USER_CODE}}
test('合法 JSON', () => {
  const result = validateJSON('{"name":"a","age":1}', { name: 'string', age: 'number' });
  assert(result.valid === true && result.data.name === 'a');
});
test('缺少字段', () => {
  const result = validateJSON('{"name":"a"}', { name: 'string', age: 'number' });
  assert(result.valid === false);
});
test('非法 JSON', () => {
  const result = validateJSON('{invalid}', { name: 'string' });
  assert(result.valid === false);
});
    `
  },
  {
    id: 'node-middleware',
    title: '实现洋葱模型中间件',
    domain: 'Node.js / BFF',
    difficulty: 'intermediate',
    time: '25 分钟',
    description: '实现一个支持洋葱模型的 compose 函数，用于组合中间件。',
    requirements: ['中间件按顺序执行', '支持 await next()', '错误能向上抛出'],
    examples: [{ input: 'compose([m1, m2, m3])(ctx)', output: '按 m1 -> m2 -> m3 -> m2 -> m1 顺序执行' }],
    starter: 'function compose(middlewares) {\n  // 你的实现\n}',
    solution: `function compose(middlewares) {
  return function(ctx) {
    let index = -1;
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      const fn = middlewares[i];
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return dispatch(0);
  };
}`,
    explanation: '递归 dispatch 实现洋葱圈执行；next 调用下一层中间件，返回后当前中间件继续执行后续逻辑。',
    testScript: `
{{USER_CODE}}
async function runComposeTests() {
  test('洋葱圈执行顺序', async () => {
    const logs = [];
    const middlewares = [
      async (ctx, next) => { logs.push('m1-start'); await next(); logs.push('m1-end'); },
      async (ctx, next) => { logs.push('m2-start'); await next(); logs.push('m2-end'); },
      async (ctx, next) => { logs.push('m3'); }
    ];
    await compose(middlewares)({});
    assert(deepEqual(logs, ['m1-start','m2-start','m3','m2-end','m1-end']));
  });
}
runComposeTests();
    `
  },
  {
    id: 'node-rate-limiter',
    title: '实现滑动窗口限流器',
    domain: 'Node.js / BFF',
    difficulty: 'advanced',
    time: '30 分钟',
    description: '实现一个基于滑动窗口的 RateLimiter，控制单位时间内的请求次数。',
    requirements: ['支持 allow(key) 判断是否允许通过', '按 key 隔离计数', '窗口过期后自动清理'],
    examples: [{ input: 'const limiter = new RateLimiter(3, 1000);', output: '1 秒内同一 key 最多 3 次通过' }],
    starter: 'class RateLimiter {\n  constructor(maxRequests, windowMs) {\n    // 你的实现\n  }\n  allow(key) {\n    // 你的实现\n  }\n}',
    solution: `class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.windows = new Map();
  }
  allow(key) {
    const now = Date.now();
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;
    if (!this.windows.has(key) || this.windows.get(key).start !== windowStart) {
      this.windows.set(key, { start: windowStart, count: 0 });
    }
    const record = this.windows.get(key);
    if (record.count < this.maxRequests) {
      record.count++;
      return true;
    }
    return false;
  }
}`,
    explanation: '按时间窗口分桶记录每个 key 的请求次数，超过阈值则拒绝。',
    testScript: `
{{USER_CODE}}
test('限流基本逻辑', () => {
  const limiter = new RateLimiter(2, 1000);
  assert(limiter.allow('user1') === true);
  assert(limiter.allow('user1') === true);
  assert(limiter.allow('user1') === false);
});
test('不同 key 隔离', () => {
  const limiter = new RateLimiter(2, 1000);
  limiter.allow('user1');
  limiter.allow('user1');
  assert(limiter.allow('user2') === true);
});
    `
  },
  {
    id: 'build-rollup-plugin',
    title: '实现 Rollup 插件',
    domain: 'Build Tools',
    difficulty: 'advanced',
    time: '30 分钟',
    description: '实现一个 rollup 插件 myPlugin，用于将 .txt 文件内容内联为字符串导出。',
    requirements: ['匹配 .txt 文件', '返回模块代码 export default "..."', '忽略非 txt 文件'],
    examples: [{ input: 'import content from "./note.txt";', output: 'content 为文件内容字符串' }],
    starter: 'function myPlugin() {\n  return {\n    name: "my-plugin",\n    // 你的实现\n  };\n}',
    solution: `function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      if (!id.endsWith('.txt')) return null;
      const escaped = JSON.stringify(code);
      return { code: \`export default \${escaped};\`, map: null };
    }
  };
}`,
    explanation: '通过 transform 钩子拦截 .txt 文件，将其原始内容作为默认导出返回。',
    testScript: `
{{USER_CODE}}
test('txt 文件转换', () => {
  const plugin = myPlugin();
  const result = plugin.transform('hello world', '/path/note.txt');
  assert(result && result.code.includes('hello world'));
});
test('非 txt 文件忽略', () => {
  const plugin = myPlugin();
  const result = plugin.transform('console.log(1)', '/path/index.js');
  assert(result === null);
});
    `
  },
  {
    id: 'micro-frontend-communication',
    title: '实现微前端通信总线',
    domain: 'Micro Frontend',
    difficulty: 'intermediate',
    time: '25 分钟',
    description: '实现一个跨应用通信的 SharedBus，基于 CustomEvent 或内存事件总线。',
    requirements: ['支持 emit 和 on', '支持应用名称空间隔离', '同一页面多个应用可互相通信'],
    examples: [{ input: 'SharedBus.on("app1","login", cb); SharedBus.emit("app1","login", data);', output: 'cb 被调用' }],
    starter: 'const SharedBus = {\n  // 你的实现\n};',
    solution: `const SharedBus = (function() {
  const listeners = {};
  return {
    on(namespace, event, handler) {
      const key = \`\${namespace}:\${event}\`;
      if (!listeners[key]) listeners[key] = [];
      listeners[key].push(handler);
    },
    off(namespace, event, handler) {
      const key = \`\${namespace}:\${event}\`;
      if (!listeners[key]) return;
      listeners[key] = listeners[key].filter(h => h !== handler);
    },
    emit(namespace, event, data) {
      const key = \`\${namespace}:\${event}\`;
      (listeners[key] || []).forEach(h => h(data));
    }
  };
})();`,
    explanation: '用命名空间:event 作为 key 的事件总线，实现跨应用解耦通信。',
    testScript: `
{{USER_CODE}}
test('命名空间事件', () => {
  let called = false;
  let payload = null;
  SharedBus.on('app1', 'login', data => { called = true; payload = data; });
  SharedBus.emit('app1', 'login', { user: 'a' });
  assert(called && payload.user === 'a');
});
test('命名空间隔离', () => {
  let count = 0;
  SharedBus.on('app1', 'logout', () => count++);
  SharedBus.emit('app2', 'logout', null);
  assert(count === 0);
});
    `
  }
];

const selectedId = ref(challenges[0].id);
const code = ref('');
const showAnswer = ref(false);
const checkResult = ref(null);
const running = ref(false);

const { data, setChallengeCode, getChallengeCode } = useLearningData();

const current = computed(() => challenges.find(c => c.id === selectedId.value));

watch(current, (c) => {
  if (c) {
    const saved = typeof window !== 'undefined' ? getChallengeCode(c.id) : '';
    code.value = saved || c.starter || '';
    showAnswer.value = false;
    checkResult.value = null;
  }
}, { immediate: true });

function selectChallenge(id) {
  if (current.value) {
    setChallengeCode(current.value.id, code.value);
  }
  selectedId.value = id;
}

function difficultyText(d) {
  const map = { basic: '基础', intermediate: '进阶', advanced: '深入' };
  return map[d] || d;
}

function runCheck() {
  if (!current.value || running.value) return;
  if (typeof window === 'undefined') return;

  running.value = true;
  checkResult.value = null;

  const worker = new Worker('/js/code-worker.js');
  const timeoutId = setTimeout(() => {
    worker.terminate();
    running.value = false;
    checkResult.value = { pass: false, passed: 0, total: 0, results: [{ name: '执行超时', pass: false, error: '代码运行超过 3 秒，可能存在死循环' }] };
  }, 4000);

  worker.onmessage = (e) => {
    clearTimeout(timeoutId);
    worker.terminate();
    running.value = false;
    const results = e.data.results || [];
    const passed = results.filter(r => r.pass).length;
    checkResult.value = {
      pass: e.data.pass && passed === results.length,
      passed,
      total: results.length,
      results,
    };
  };

  worker.onerror = (err) => {
    clearTimeout(timeoutId);
    worker.terminate();
    running.value = false;
    checkResult.value = { pass: false, passed: 0, total: 0, results: [{ name: 'Worker 错误', pass: false, error: err.message }] };
  };

  worker.postMessage({
    userCode: code.value,
    testScript: current.value.testScript,
  });
}

function resetCode() {
  if (typeof window !== 'undefined' && confirm('确定要重置为初始代码吗？')) {
    code.value = current.value.starter || '';
    setChallengeCode(current.value.id, code.value);
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

.challenge-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.challenge-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.challenge-result-list {
  margin-top: 10px;
  padding-left: 20px;
}

.challenge-result-list li {
  margin-bottom: 4px;
}

.challenge-result-list li.fail {
  color: #e53935;
}

.challenge-result-error {
  display: block;
  font-size: 12px;
  margin-top: 2px;
  opacity: 0.9;
}

.challenge-explanation {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.6;
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
