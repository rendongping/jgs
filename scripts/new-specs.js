/**
 * New interview question specs for all 9 core foundation domains.
 * Loaded by run-append.js to append into interview-bank/by-domain/*.md
 */

function Q(type, level, title, tags, duration, frequency, desc, answer, scoring, mistakes, oral) {
  return { type, level, title, tags, duration, frequency, desc, answer, scoring, mistakes, oral };
}

const jsSpecs = [
  Q('CD', 'B', '手写 Array.prototype.flat 的实现',
    ['数组', 'flat', '递归', '手写代码'], '5-8 分钟', '中频',
    '请实现一个 myFlat(arr, depth) 函数，效果与 Array.prototype.flat 一致。',
    `递归处理数组元素，遇到元素仍为数组且 depth 大于 0 时继续展开。使用 reduce 累积结果。边界情况：depth 为 Infinity、非数组输入、数组为空。

    function myFlat(arr, depth = 1) {
      if (depth === 0) return arr.slice();
      return arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) && depth > 0 ? myFlat(cur, depth - 1) : cur);
      }, []);
    }`,
    [['递归展开逻辑', '40%', '是否按 depth 控制递归深度'], ['边界处理', '30%', 'Infinity、非数组、空数组'], ['代码质量', '30%', '是否避免副作用']],
    ['直接用 arr.toString().split(",")，丢失对象和嵌套数组结构',
     'depth 使用 arr 的 length 判断，逻辑错误',
     '没有处理类数组或稀疏数组的情况'],
    'myFlat 用递归按 depth 展开嵌套数组，reduce 累积结果。注意 Infinity、非数组和空数组的边界。'),
  Q('CD', 'B', '手写 JSON.stringify 的简化版',
    ['JSON', '序列化', '手写代码'], '5-8 分钟', '中频',
    '实现一个简化版 myStringify(value)，支持基本类型、对象、数组、字符串，忽略循环引用。',
    `核心规则：undefined/function/symbol 在对象中忽略、在数组中转为 null；字符串加双引号；对象递归拼接 key:value；数组递归拼接元素。

    function myStringify(value) {
      if (value === null) return 'null';
      const type = typeof value;
      if (type === 'number' || type === 'boolean') return String(value);
      if (type === 'string') return '"' + value.replace(/"/g, '\\"') + '"';
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
    }`,
    [['类型覆盖', '40%', '基本类型、数组、对象处理'], ['特殊值', '30%', 'undefined/function/symbol 的处理'], ['代码健壮性', '30%', '字符串转义、循环引用提示']],
    ['字符串没有转义双引号，导致结果非法',
     '对象属性值是 undefined 时直接序列化为 undefined',
     '数组中的 undefined 没有转换为 null'],
    '简化 JSON.stringify 需要正确处理字符串转义、undefined 在数组和对象中的差异，以及递归拼接。'),
  Q('CO', 'B', 'Set、Map、WeakMap、WeakSet 在垃圾回收上有什么差异？',
    ['Set', 'Map', 'WeakMap', '垃圾回收'], '3-5 分钟', '中频',
    '请比较 Set/Map 与 WeakMap/WeakSet 的键类型、可迭代性和 GC 行为。',
    `Set/Map 的键被强引用，即使对象在其他地方不再使用，也不会被 GC，且可遍历。WeakMap/WeakSet 的键必须是对象，持有弱引用，不阻止 GC，不可遍历，因此没有 size/forEach。

适用场景：WeakMap 适合私有数据缓存或 DOM 元数据，避免内存泄漏。`,
    [['引用类型', '40%', '强引用 vs 弱引用'], ['可迭代性', '30%', 'Weak 集合不可遍历的原因'], ['GC 影响', '30%', '内存泄漏风险对比']],
    ['认为 WeakMap 可以枚举所有键',
     '用原始值作为 WeakMap 的键',
     '在需要长期保持映射的场景误用 WeakMap 导致数据丢失'],
    'Set/Map 强引用、可遍历；WeakMap/WeakSet 弱引用、键必须是对象、不可遍历，适合不影响 GC 的元数据。'),
  Q('CO', 'A', 'Object.is 与 === 有什么区别？',
    ['Object.is', '严格相等', 'NaN', '类型'], '3-5 分钟', '中频',
    '请说明 Object.is 和 === 在 NaN、+0、-0 上的差异。',
    `=== 使用 SameValueZero 语义：NaN !== NaN，+0 === -0。Object.is 使用 SameValue 语义：NaN 等于 NaN，+0 不等于 -0。其他情况下两者结果一致。

    Object.is(NaN, NaN); // true
    Object.is(+0, -0);   // false
    NaN === NaN;         // false
    +0 === -0;           // true`,
    [['NaN 行为', '40%', '是否能说出 Object.is(NaN,NaN) 为 true'], ['零值差异', '30%', '+0 与 -0 的处理'], ['一般场景', '30%', '其余情况一致']],
    ['认为 Object.is 在所有情况下都与 === 相同',
     '用 Object.is 判断对象引用相等，混淆值相等与引用相等',
     '认为 +0 和 -0 在数学运算中永远无区别'],
    'Object.is 与 === 主要区别在于 NaN 相等和 +0/-0 不等，其余情况一致。'),
  Q('CD', 'A', '手写 Promise.race',
    ['Promise', 'race', '异步', '手写代码'], '5-8 分钟', '中频',
    '实现 Promise.race，返回第一个 settled 的 Promise 结果或原因。',
    `遍历输入，给每个 Promise 注册 then/catch，第一个 settle 的调用 resolve/reject 后返回结果。输入为空数组时返回 pending 的 Promise，与规范一致。

    function promiseRace(iterable) {
      return new Promise((resolve, reject) => {
        for (const p of iterable) {
          Promise.resolve(p).then(resolve, reject);
        }
      });
    }`,
    [['竞速逻辑', '50%', '第一个 settled 决定结果'], ['输入处理', '30%', '非 Promise 值包装、空数组行为'], ['错误处理', '20%', 'reject 时是否停止']],
    ['用 forEach 导致异步开始，空数组行为不符',
     '没有 Promise.resolve 包装非 Promise 值',
     '第一个 reject 后没有立即返回，继续监听后续'],
    'Promise.race 返回第一个 settled 的结果。实现时要将非 Promise 包装，空数组返回 pending Promise。'),
  Q('CD', 'A', '手写 Promise.any',
    ['Promise', 'any', 'AggregateError', '手写代码'], '5-8 分钟', '低频',
    '实现 Promise.any，返回第一个 fulfilled 的 Promise；全部 reject 时返回 AggregateError。',
    `记录 reject 次数和错误数组。任一 Promise fulfill 立即 resolve；全部 reject 后 reject(new AggregateError(errors))。

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
    }`,
    [['成功逻辑', '40%', '任一 fulfill 立即 resolve'], ['全部失败', '40%', 'AggregateError 收集所有原因'], ['边界', '20%', '空数组处理']],
    ['全部 reject 时返回普通 Error 而非 AggregateError',
     '使用 let 计数但没有初始化导致 NaN',
     'fulfill 后没有停止收集后续错误'],
    'Promise.any 返回首个成功，全部失败返回 AggregateError。实现时注意计数和错误收集。'),
  Q('CO', 'A', 'ArrayBuffer、SharedArrayBuffer 和 Atomics 各是什么？',
    ['ArrayBuffer', 'SharedArrayBuffer', 'Atomics', '二进制'], '5-8 分钟', '低频',
    '请解释三者的作用、使用场景和安全限制。',
    `ArrayBuffer 是固定长度的原始二进制数据缓冲区，需通过 TypedArray/DataView 读写。SharedArrayBuffer 允许多个 Worker 共享同一块内存。Atomics 提供原子操作和线程同步，避免竞态条件。

由于 Spectre 漏洞，SharedArrayBuffer 需要跨域隔离（COOP/COEP）才能启用。`,
    [['ArrayBuffer', '30%', '二进制缓冲区与视图关系'], ['SharedArrayBuffer', '30%', '多 Worker 共享内存'], ['Atomics', '30%', '原子操作与锁'], ['安全限制', '10%', 'COOP/COEP']],
    ['直接用 ArrayBuffer 下标读写数据',
     '在单线程场景使用 SharedArrayBuffer 没有收益但增加复杂度',
     '多线程写入时不使用 Atomics，导致数据竞争'],
    'ArrayBuffer 是二进制缓冲区，SharedArrayBuffer 支持跨 Worker 共享，Atomics 提供原子操作和同步，启用需跨域隔离。'),
  Q('CD', 'A', '手写一个 sleep / delay 函数',
    ['Promise', 'sleep', '定时器', '手写代码'], '3-5 分钟', '中频',
    '请用 Promise 实现 sleep(ms)，并说明与 setTimeout 的区别。',
    `sleep 返回一个 Promise，在 ms 后 resolve，便于在 async/await 中暂停执行。

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function demo() {
      await sleep(1000);
      console.log('after 1s');
    }`,
    [['Promise 包装', '40%', '是否返回 Promise'], ['this/参数', '30%', '是否透传 resolve 值'], ['可取消', '30%', '是否提供 AbortSignal 支持']],
    ['返回 setTimeout 的 timer id 而非 Promise',
     '用 async 函数包裹 setTimeout 但 await 位置错误',
     '没有处理 ms 为负数或 0 的边界'],
    'sleep 用 Promise 包装 setTimeout，返回在指定时间后 resolve 的 Promise，方便在 async 函数中暂停。'),
  Q('CO', 'A', '什么是尾调用优化？JavaScript 中有什么限制？',
    ['尾调用', '递归', '性能', 'ES6'], '3-5 分钟', '低频',
    '请解释尾调用优化的原理，以及为什么实际引擎支持有限。',
    `尾调用优化（TCO）指在函数最后一步调用另一个函数时复用当前栈帧，避免栈增长。ES6 规定了 TCO，但浏览器引擎（除 Safari）大多未实现严格模式下的 TCO。

实际中，递归深时建议改用循环或蹦床函数（trampoline）避免栈溢出。`,
    [['尾调用定义', '40%', '调用位置与栈帧复用'], ['ES6 规定', '30%', '仅在严格模式'], ['实际限制', '30%', '浏览器支持情况']],
    ['认为所有 JavaScript 引擎都支持 TCO',
     '把尾调用优化和代码末尾 return 任意表达式混为一谈',
     '在非严格模式下期待 TCO 生效'],
    '尾调用优化通过复用栈帧减少递归栈消耗，ES6 规定严格模式支持，但主流引擎大多未实现。'),
  Q('CD', 'A', '手写一个 JSONP 函数',
    ['JSONP', '跨域', '手写代码', '脚本注入'], '5-8 分钟', '低频',
    '实现一个 jsonp(url, params, callbackName) 函数，通过动态 script 标签请求跨域数据。',
    `JSONP 利用 script 标签不受同源策略限制，服务端返回 callbackName(data)。前端动态创建 script，注册全局回调，加载后清理脚本和全局函数。

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
    }`,
    [['全局回调', '40%', '动态注册与清理'], ['URL 拼接', '30%', '参数编码与 callback 字段'], ['错误处理', '30%', 'onerror 与超时']],
    ['没有清理全局回调和 script 标签，造成内存泄漏',
     'callbackName 固定，多次调用互相覆盖',
     '没有处理服务端返回非 JSON 或异常格式'],
    'JSONP 通过动态 script 和全局回调实现跨域，注意唯一回调名、错误处理和清理脚本节点。'),
  Q('CO', 'A', 'Symbol.iterator 与 Generator 的关系是什么？',
    ['Symbol.iterator', 'Generator', 'Iterable', '迭代器'], '3-5 分钟', '中频',
    '请解释可迭代协议、迭代器协议，以及生成器如何实现它们。',
    `Iterable 协议要求对象具有 Symbol.iterator 方法，返回 Iterator。Iterator 协议要求 next 返回 { value, done }。Generator 函数返回的 generator 对象同时满足 Iterator 和 Iterable，因此 for…of 可遍历生成器。

    function* gen() { yield 1; yield 2; }
    const it = gen();
    it[Symbol.iterator]() === it; // true`,
    [['Iterable', '30%', 'Symbol.iterator 方法'], ['Iterator', '30%', 'next 返回值'], ['Generator', '40%', '既是迭代器也是可迭代对象']],
    ['把 Generator 和 Promise 混为一谈',
     '认为普通函数 yield 也能暂停执行',
     '实现 Symbol.iterator 时返回对象没有 next 方法'],
    'Symbol.iterator 定义可迭代对象，Generator 返回的对象满足 Iterator 和 Iterable，可直接用于 for…of。'),
  Q('CD', 'A', '手写一个 JSON.parse 的简化版',
    ['JSON', '解析', '递归下降', '手写代码'], '8-12 分钟', '低频',
    '实现一个简化版 myParse(str)，支持对象、数组、字符串、数字、true/false/null。',
    `使用递归下降解析器：跳过空白，根据当前字符分发到对象、数组、字符串、数字或字面量。字符串处理转义；对象用 key:value 对；数组用逗号分隔元素。

实现时建议先写 tokenizer 将字符串切分为 token，再递归解析 AST。`,
    [['分词', '40%', '能否识别字符串、数字、字面量、符号'], ['递归解析', '40%', '对象、数组的嵌套处理'], ['边界', '20%', '空白、转义、非法输入']],
    ['用 eval 直接解析，存在安全风险',
     '字符串没有处理转义字符导致越界',
     '逗号结尾的数组或对象没有容错'],
    '手写 JSON.parse 通常使用 tokenizer + 递归下降，分别处理对象、数组、字符串、数字和字面量。'),
  Q('CO', 'A', 'eval、Function 构造函数和 new Function 有什么安全风险？',
    ['eval', 'Function', 'XSS', '安全'], '3-5 分钟', '中频',
    '请比较三者的作用域差异和安全风险。',
    `eval 在当前作用域执行字符串代码，可访问局部变量，风险最高。Function / new Function 在全局作用域执行，无法直接访问局部变量，但仍可执行任意代码。

三者都会把字符串当代码执行，如果字符串来自用户输入，会导致 XSS 或代码注入。应尽量避免，改用 JSON.parse、模板引擎或沙箱方案。`,
    [['作用域', '40%', 'eval 访问局部 vs Function 全局'], ['注入风险', '40%', '用户输入导致代码执行'], ['替代方案', '20%', 'JSON.parse、沙箱']],
    ['认为 new Function 完全安全',
     '用 eval 解析 JSON',
     '忽略 Function 仍可访问全局对象和 DOM'],
    'eval 在当前作用域执行且风险最高，Function 在全局作用域执行，三者都应避免用于不可信输入。'),
  Q('CD', 'A', '手写一个模板字符串解析器',
    ['模板字符串', '解析', '插值', '手写代码'], '5-8 分钟', '低频',
    '实现 parseTemplate(template, data)，将 "Hello, ${name}!" 替换为 data 对应值。',
    `使用正则 /\\$\\{([^}]+)\\}/g 匹配插值表达式，用 with 或 Function 计算，或仅支持属性路径。需要处理嵌套对象和默认值。

    function parseTemplate(template, data) {
      return template.replace(/\\$\\{([^}]+)\\}/g, (_, expr) => {
        const keys = expr.trim().split('.');
        let val = data;
        for (const k of keys) val = val?.[k];
        return val ?? '';
      });
    }`,
    [['正则匹配', '40%', '正确识别 ${...}'], ['路径解析', '30%', '支持嵌套属性'], ['安全', '30%', '避免用 eval 执行任意表达式']],
    ['用 eval 直接执行插值表达式',
     '没有处理表达式为空或包含嵌套括号的情况',
     'undefined 值没有给出默认值导致显示 undefined'],
    '模板字符串解析器用正则匹配 ${...}，按属性路径取值，避免 eval 执行任意代码。'),
  Q('CO', 'A', 'import.meta 和动态 import 有什么作用？',
    ['import.meta', '动态导入', 'ES Module', '代码分割'], '3-5 分钟', '中频',
    '请说明 import.meta 提供的信息以及 import() 的使用场景。',
    `import.meta 是当前模块的元数据对象，包含 url 等属性。import() 返回 Promise，可在运行时按条件加载模块，天然支持代码分割和懒加载。

    const module = await import('./heavy.js');
    module.doSomething();`,
    [['import.meta', '30%', '模块元数据 url'], ['动态导入', '40%', '运行时条件加载、代码分割'], ['返回值', '30%', 'Promise 与命名空间对象']],
    ['在 CommonJS 中直接使用 import.meta',
     '把 import() 当成同步调用',
     '动态导入路径使用纯变量导致打包工具无法分析代码分割'],
    'import.meta 提供模块元数据，import() 支持运行时动态加载和代码分割，返回 Promise。'),
  Q('CD', 'A', '手写一个 EventEmitter（发布订阅）',
    ['EventEmitter', '发布订阅', '观察者模式', '手写代码'], '5-8 分钟', '高频',
    '实现 on、emit、off、once 方法。',
    `使用 Map 存储事件名到监听器数组的映射。on 添加监听，once 包装为执行后自移除，emit 按注册顺序同步调用并传递参数，off 按引用移除。

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
    }`,
    [['数据结构', '30%', 'Map + 数组'], ['once 实现', '30%', '包装函数自移除'], ['off 准确性', '40%', '按引用移除']],
    ['emit 使用异步调用导致执行顺序不可预期',
     'off 时直接清空该事件所有监听器',
     'once 包装函数没有正确移除自身，导致重复执行'],
    'EventEmitter 用 Map 存事件与监听器数组，实现 on/emit/off/once，注意 once 的自移除。'),
  Q('CO', 'P', 'Top-level await 是什么？有什么兼容和降级方案？',
    ['Top-level await', 'ES Module', '异步', '兼容性'], '3-5 分钟', '中频',
    '请解释 Top-level await 的语义、使用限制和降级方案。',
    `Top-level await 允许在 ES Module 顶层直接使用 await，使模块本身变为异步。它会阻塞模块图中后续依赖的执行，直到 Promise settle。

降级方案：在模块内导出一个 async 函数或 Promise，由消费方 await；构建工具如 Webpack/Vite 会自动转换部分用法。`,
    [['语义', '40%', '模块变为异步，阻塞依赖'], ['使用限制', '30%', '仅在 ESM 顶层'], ['降级', '30%', '导出 async 函数/Promise']],
    ['在 CommonJS 或 IIFE 中直接使用顶层 await',
     '认为 Top-level await 不影响模块加载顺序',
     '未考虑循环依赖导致的死锁风险'],
    'Top-level await 让模块本身异步，阻塞后续依赖，适用于 ESM，旧环境可导出 Promise 或 async 函数降级。'),
  Q('CD', 'P', '手写一个带并发限制的异步任务调度器',
    ['并发控制', '调度器', 'Promise', '手写代码'], '8-12 分钟', '中频',
    '实现 Scheduler(max)，支持 add(promiseFactory) 按最大并发数执行异步任务。',
    `维护运行中任务数和等待队列。add 时如果运行数小于 max 立即执行；否则入队。任务完成后从队列取出下一个执行，并 resolve 原始 Promise。

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
    }`,
    [['并发控制', '40%', 'max/running 计数'], ['队列管理', '30%', '等待队列与任务复用'], ['Promise 透传', '30%', 'resolve/reject 结果返回']],
    ['所有任务一次性启动，没有限制并发',
     '使用数组 splice 导致性能差且顺序错乱',
     '没有处理 promiseFactory 抛出的同步异常'],
    '带并发限制的调度器用计数器和等待队列控制同时运行的任务数，并正确透传每个任务的结果。'),
  Q('CO', 'P', 'Temporal API 是什么？它解决了 Date 的哪些问题？',
    ['Temporal', 'Date', '时间处理', '提案'], '3-5 分钟', '低频',
    '请介绍 Temporal API 的设计目标和主要对象。',
    `Temporal 是 ECMAScript 新的日期/时间提案，提供不可变对象、纳秒精度、显式时区处理，以及 Duration、Instant、ZonedDateTime 等类型。它解决了原生 Date 的可变性、时区混乱和 2038 年问题。

目前可通过 polyfill 使用，生产环境需评估浏览器支持。`,
    [['不可变', '30%', '避免修改现有对象'], ['类型化', '30%', 'Instant/PlainDate/ZonedDateTime'], ['时区', '40%', '显式时区与夏令时']],
    ['认为 Temporal 已原生广泛支持',
     '把 Temporal 和 Moment.js 混为一谈',
     '忽略 Temporal 的 API 与 Date 不兼容需要迁移成本'],
    'Temporal API 提供不可变、类型化、纳秒精度的日期时间处理，解决原生 Date 的时区和可变性痛点。'),
  Q('SC', 'P', '设计一个前端路由拦截与权限校验系统',
    ['路由拦截', '权限校验', '前端路由', '设计'], '10-15 分钟', '中频',
    '请设计一个支持白名单、角色、异步权限拉取和降级处理的路由守卫系统。',
    `核心模块：路由配置表附加 meta.roles/permissions；全局 beforeEach 守卫按顺序执行鉴权；权限服务支持同步校验和异步拉取；未通过时重定向到登录或 403。

    router.beforeEach(async (to, from, next) => {
      const permitted = await authService.check(to);
      if (permitted) next(); else next('/403');
    });`,
    [['拦截点', '30%', '全局/路由/组件守卫'], ['权限模型', '30%', '角色、资源、动态拉取'], ['降级与缓存', '40%', '无权限跳转、权限缓存']],
    ['在组件内才做权限校验，导致路由已切换',
     '每次路由都同步请求权限接口造成阻塞',
     '没有处理权限校验异常导致页面卡死'],
    '路由拦截与权限校验系统应在全局守卫中根据角色/权限判断，支持异步拉取并做降级和缓存。'),
];

const tsSpecs = [
  Q('CO', 'B', 'any、unknown、never 有什么区别？',
    ['any', 'unknown', 'never', '类型安全'], '3-5 分钟', '高频',
    '请说明三者的赋值方向、使用场景和类型安全差异。',
    `any 关闭类型检查，可任意赋值和调用。unknown 是更安全的 any，赋值给任何类型前必须先做类型收窄。never 表示不可能存在的值，常用于穷尽检查和函数永远抛错/不返回。

    let a: any = 1; a.foo();
    let u: unknown = 1; (u as number).toFixed();
    function fail(): never { throw new Error(); }`,
    [['any', '30%', '关闭检查的风险'], ['unknown', '40%', '使用前必须收窄'], ['never', '30%', '穷尽分支与不可达值']],
    ['认为 unknown 和 any 完全一样',
     '把 never 当成 void 使用',
     '在可能返回值的函数上使用 never'],
    'any 关闭类型检查，unknown 需要收窄后才能使用，never 表示不可能存在的值。'),
  Q('CO', 'B', 'interface 与 type 有什么异同？',
    ['interface', 'type', '类型别名', '声明合并'], '3-5 分钟', '高频',
    '请比较 interface 和 type 在扩展、合并、实现和性能上的差异。',
    `interface 支持声明合并和 implements，适合对象类型定义；type 更通用，可定义联合、交叉、元组、映射等，但不能声明合并。大多数对象类型优先用 interface，复杂类型用 type。

同：都可描述对象结构、支持泛型、可互相扩展（interface extends type / type = interface & ...）。`,
    [['声明合并', '30%', 'interface 可多次声明合并'], ['扩展能力', '30%', '联合、交叉、映射只能用 type'], ['实现', '20%', 'class 可实现 interface'], ['选择原则', '20%', '对象用 interface，复杂用 type']],
    ['认为 type 也支持声明合并',
     '所有类型都用 type，导致无法 implements 和合并',
     '认为 interface 性能一定优于 type'],
    'interface 支持声明合并和 implements，适合对象；type 更灵活，适合联合、交叉和映射类型。'),
  Q('CO', 'B', '可选属性 ? 与 undefined 在类型上有什么区别？',
    ['可选属性', 'undefined', '类型系统'], '3-5 分钟', '中频',
    '请解释 `name?: string` 与 `name: string | undefined` 的差异。',
    `name?: string 表示属性可以不存在，读取时类型为 string | undefined。name: string | undefined 表示属性必须存在，但值可以是 undefined。在 exactOptionalPropertyTypes 开启后，前者不能把 undefined 显式赋值给该属性。

    interface A { name?: string; }
    interface B { name: string | undefined; }
    const a: A = {}; // OK
    const b: B = {}; // Error`,
    [['存在性', '50%', '属性是否必须存在'], ['赋值', '30%', '能否显式赋 undefined'], ['配置影响', '20%', 'exactOptionalPropertyTypes']],
    ['认为两者完全等价',
     '在解构时使用默认值时忽略属性不存在和值为 undefined 的区别',
     '开启 exactOptionalPropertyTypes 后仍向可选属性赋 undefined'],
    '可选属性表示可以不存在，undefined 类型表示必须存在但可为 undefined，二者在 exactOptionalPropertyTypes 下有差异。'),
  Q('CO', 'A', '函数重载的使用场景和实现方式是什么？',
    ['函数重载', 'overload', '类型签名'], '3-5 分钟', '中频',
    '请用函数重载为同一个函数设计多个调用签名。',
    `函数重载允许为同一函数提供多个调用签名，编译器根据参数数量和类型选择匹配的签名。实现签名的参数类型和返回类型必须兼容所有重载签名。

    function add(a: number, b: number): number;
    function add(a: string, b: string): string;
    function add(a: any, b: any): any {
      return a + b;
    }`,
    [['签名设计', '40%', '多个调用签名'], ['实现兼容', '30%', '实现签名兼容所有重载'], ['场景', '30%', '根据参数类型返回不同结果']],
    ['重载签名没有实现签名',
     '实现签名参数类型比重载更窄',
     '在可以用联合类型和泛型解决的场景滥用重载'],
    '函数重载通过多个调用签名描述不同参数组合，实现签名必须兼容所有签名，适合参数类型决定返回类型的场景。'),
  Q('CO', 'A', '索引签名与 Record 类型有什么区别？',
    ['索引签名', 'Record', '映射类型', '键类型'], '3-5 分钟', '中频',
    '请比较 `[key: string]: T` 与 `Record<string, T>` 的用法和约束差异。',
    `索引签名允许对象拥有任意数量的某类型属性。Record<string, T> 是内置映射类型，表示键为 string、值为 T 的对象。Record 更简洁，但键类型可以是联合类型；索引签名只能使用 string、number 或 symbol。

    interface A { [key: string]: number; }
    type B = Record<string, number>;
    type C = Record<'a'|'b', number>;`,
    [['定义方式', '30%', '接口索引签名 vs Record'], ['键类型', '40%', 'Record 支持字面量联合，索引签名只接受 string/number/symbol'], ['使用场景', '30%', '动态属性 vs 固定键集合']],
    ['认为 Record 不支持字面量键联合',
     '在需要已知键集合时仍用索引签名，丢失精确类型',
     '索引签名中键名为保留字导致意外问题'],
    '索引签名描述任意动态属性；Record 更简洁，支持字面量联合键，适合固定键集合。'),
  Q('CO', 'A', '什么是模板字面量类型？举一个实际例子。',
    ['模板字面量类型', '字符串类型', '类型体操'], '3-5 分钟', '中频',
    '请解释模板字面量类型如何构造字符串联合类型。',
    `模板字面量类型用反引号语法组合字符串字面量类型，可生成新的字符串联合类型。常用于事件名、CSS 变量名、路由路径等。

    type EventName<T extends string> = \`on\${Capitalize<T>}\`;
    type ClickEvent = EventName<'click'>; // "onClick"`,
    [['语法', '40%', '反引号组合类型'], ['生成联合', '30%', '多个占位符生成笛卡尔积'], ['场景', '30%', '事件名、路由、CSS 变量']],
    ['把模板字面量类型和普通字符串模板混淆',
     '在不需要精确字符串类型的场景过度使用',
     '不理解 Capitalize、Uppercase 等内置字符串工具类型'],
    '模板字面量类型通过反引号组合字面量类型生成字符串联合，适合事件名、路由等场景。'),
  Q('CO', 'A', 'TypeScript 类的访问修饰符有哪些？',
    ['class', 'public', 'private', 'protected', 'readonly'], '3-5 分钟', '中频',
    '请说明 public、private、protected、readonly 在类中的可见性。',
    `public 默认，随处访问。private 仅类内部可访问（TypeScript 编译期限制，可用 bracket 绕过）。protected 类内部及子类可访问。readonly 属性初始化后不可重新赋值。

    class User {
      public name: string;
      private password: string;
      protected role: string;
      readonly id: number;
    }`,
    [['public/private', '40%', '可见范围'], ['protected', '30%', '子类可见'], ['readonly', '30%', '只读属性与运行时效用']],
    ['认为 private 在运行时也绝对安全',
     'protected 当作 public 使用破坏封装',
     'readonly 与 Object.freeze 混淆'],
    'public 默认；private 仅类内；protected 类内及子类；readonly 只读。'),
  Q('CO', 'A', '什么是声明合并与模块增强？',
    ['声明合并', '模块增强', 'interface', 'declare'], '3-5 分钟', '中频',
    '请解释 Declaration Merging 和 Module Augmentation 的使用场景。',
    `声明合并指同名的 interface、namespace、enum 等会被合并为一个定义，常用于扩展全局类型。模块增强用于为第三方模块补充类型声明，如给 Vue 的 ComponentCustomProperties 增加属性。

    declare module 'vue' {
      interface ComponentCustomProperties {
        $api: ApiClient;
      }
    }`,
    [['声明合并', '40%', '同名 interface/namespace 合并'], ['模块增强', '40%', 'declare module 扩展第三方类型'], ['场景', '20%', '插件属性、全局类型扩展']],
    ['用 type 做声明合并',
     '模块增强没有放在正确的 .d.ts 文件导致不生效',
     '混淆 declare module 与 import 的语法'],
    '声明合并让同名声明自动合并；模块增强通过 declare module 为第三方库扩展类型。'),
  Q('CO', 'P', 'TypeScript 的类型兼容性是基于结构类型还是名义类型？',
    ['类型兼容性', '结构类型', '名义类型', 'brand'], '3-5 分钟', '中频',
    '请解释结构类型系统的含义，以及如何实现名义类型效果。',
    `TypeScript 主要基于结构类型：只要结构兼容即可赋值，不要求显式继承或实现。这与 Java/C# 的名义类型不同。若需要名义类型效果，可用 Branded Type 或私有字段。

    type UserId = string & { __brand: 'UserId' };
    type OrderId = string & { __brand: 'OrderId' };`,
    [['结构类型', '40%', '按结构而非名称兼容'], ['与名义类型对比', '30%', 'Java/C# 的对比'], ['实现名义效果', '30%', 'Brand 类型或私有字段']],
    ['认为 TypeScript 是名义类型',
     '在需要区分同构类型时仅用 type alias',
     '滥用 any 绕过结构检查'],
    'TypeScript 基于结构类型，结构兼容即可赋值；需要名义类型效果可用 Branded Type。'),
  Q('CO', 'P', 'TypeScript Compiler API 可以做什么？请举一个应用场景。',
    ['Compiler API', 'AST', '类型检查', '工具链'], '5-8 分钟', '低频',
    '请介绍 ts.createProgram、TypeChecker 等 API 的典型用途。',
    `Compiler API 允许程序访问 TypeScript 编译器的解析、类型检查、AST 遍历能力。可用于构建自定义 lint、自动生成 API 文档、类型检查 CI、代码迁移工具等。

    import ts from 'typescript';
    const program = ts.createProgram(['src/index.ts'], {});
    const checker = program.getTypeChecker();`,
    [['能力', '40%', 'AST、类型检查、代码生成'], ['典型场景', '40%', '文档生成、lint、迁移'], ['限制', '20%', '学习曲线和版本兼容性']],
    ['认为 Compiler API 可以修改运行时行为',
     '直接操作字符串而非 AST 做代码分析',
     '忽略 TypeScript 版本升级对 AST 节点的影响'],
    'TypeScript Compiler API 提供 AST 和类型检查能力，常用于自定义工具、文档生成和代码迁移。'),
  Q('CO', 'P', '什么是递归类型？使用递归类型要注意什么？',
    ['递归类型', 'JSON', '类型系统'], '3-5 分钟', '中频',
    '请用递归类型定义一个 JSON 类型，并说明递归深度限制。',
    `递归类型指类型定义中引用自身，常用于树、JSON、链表等结构。TypeScript 支持接口自引用和条件类型递归，但过深递归会触发 TS2589 类型实例化过深。

    type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };`,
    [['自引用', '40%', '类型定义引用自身'], ['应用场景', '30%', 'JSON、树形结构'], ['深度限制', '30%', '递归深度与编译错误']],
    ['递归类型没有终止条件',
     '把运行时递归和类型递归混为一谈',
     '在复杂递归中不设置类型参数上限导致 TS2589'],
    '递归类型用于自引用结构如 JSON，需注意终止条件和递归深度限制。'),
  Q('CO', 'P', '制定一个从 JavaScript 迁移到 TypeScript 的方案',
    ['迁移', 'JavaScript', 'TypeScript', '工程化'], '5-8 分钟', '中频',
    '请描述迁移步骤、配置策略、风险控制和团队培训。',
    `步骤：1) 搭建 TS 编译配置和类型声明；2) 允许 JS/TS 混编，逐步迁移核心模块；3) 优先迁移公共库和接口层；4) 开启 strict 选项逐项修复；5) 建立类型检查 CI 门禁。

风险控制：使用 allowJs、noImplicitAny 关闭初期，使用 @ts-check 和 JSDoc 过渡，避免一次性全量重写。`,
    [['渐进策略', '40%', '混编、按优先级迁移'], ['配置', '30%', 'allowJs、strict 渐进开启'], ['团队', '30%', '培训、CI 门禁']],
    ['一次性全量重写导致业务停滞',
     '直接开启 strict:true 产生大量无法短期修复的错误',
     '忽略第三方库类型补充导致 any 泛滥'],
    '迁移应渐进混编，优先核心模块，逐步开启 strict，并建立 CI 类型检查。'),
  Q('CO', 'P', 'Monorepo 中 TypeScript 配置应该如何设计？',
    ['Monorepo', 'tsconfig', 'Project References', '工程化'], '5-8 分钟', '中频',
    '请说明 root tsconfig、composite、references 和 paths 的作用。',
    `根 tsconfig 用于编辑器路径解析和统一编译选项；各包 tsconfig 开启 composite 生成 .d.ts 和 tsbuildinfo；references 声明包间依赖，使 TypeScript 按拓扑顺序编译；paths 配置别名以支持源码引用。

    {
      "compilerOptions": { "composite": true },
      "references": [{ "path": "../core" }]
    }`,
    [['composite', '30%', '项目引用与增量编译'], ['references', '30%', '拓扑依赖'], ['paths', '20%', '别名解析'], ['根配置', '20%', '统一选项与继承']],
    ['所有包共用一个 tsconfig，导致编译范围过大',
     '没有使用 references，无法利用增量编译',
     'paths 配置与构建工具 resolve.alias 不一致'],
    'Monorepo TS 配置应分根配置、包配置，使用 composite 和 references 实现增量和拓扑编译。'),
  Q('CO', 'P', '如何在类型安全与开发效率之间取得平衡？',
    ['类型安全', '开发效率', 'any', '工程化'], '5-8 分钟', '中频',
    '请给出在大型项目中兼顾类型覆盖率和开发体验的实践。',
    `平衡策略：1) 核心库和公共 API 强制严格类型；2) 边界场景使用 unknown 而非 any；3) 允许临时 any 但需标注 TODO 和渐进修复；4) 使用类型推导减少冗余注解；5) 建立类型覆盖率指标，但不要追求 100% 而牺牲进度。

工具：zod 做运行时校验，ts-reset 改善内置类型。`,
    [['核心严格', '30%', '公共 API 和库'], ['any 管理', '30%', '用 unknown 替代，标注 TODO'], ['度量', '20%', '类型覆盖率而非 100%'], ['工具', '20%', 'zod、ts-reset']],
    ['所有代码强制 strict 导致迁移困难',
     '为赶进度大面积使用 any 不治理',
     '只看类型覆盖率，忽略关键路径的类型质量'],
    '核心路径严格类型，边界用 unknown，允许临时 any 并标注修复，配合运行时校验工具平衡安全与效率。'),
  Q('CO', 'A', '枚举 Enum 有哪些缺陷？可以用什么替代？',
    ['Enum', '联合类型', 'const assertion', '类型安全'], '3-5 分钟', '中频',
    '请说明 enum 的编译产物、类型安全问题和替代方案。',
    `enum 会生成运行时对象和反向映射，增加打包体积；常量枚举 const enum 有内联限制和编译兼容性风险。替代方案：使用联合类型或 as const 对象，配合 satisfies 获得更好的类型推断和 tree-shaking。

    const Status = {
      Pending: 'pending',
      Done: 'done',
    } as const;
    type Status = typeof Status[keyof typeof Status];`,
    [['编译产物', '30%', '运行时对象和反向映射'], ['体积', '20%', '增加打包体积'], ['替代', '30%', 'as const 联合类型'], ['const enum 风险', '20%', 'isolatedModules 报错']],
    ['在所有场景使用 enum 而不考虑打包体积',
     'const enum 跨包导出导致 isolatedModules 报错',
     '用字符串枚举时混淆运行时值和类型名'],
    'enum 会增加运行时对象和体积，可用 as const 对象加联合类型替代，以获得更好推断和 tree-shaking。'),
  Q('CO', 'A', '字面量类型与联合类型如何结合使用？',
    ['字面量类型', '联合类型', '类型收窄', '枚举'], '3-5 分钟', '高频',
    '请用字面量联合类型定义状态和事件名，并说明类型收窄优势。',
    `字面量类型表示具体的字符串、数字或布尔值；联合类型将多个字面量组合。配合 switch 或 if 可实现穷尽检查，避免拼写错误。

    type Status = 'idle' | 'loading' | 'success' | 'error';
    function handle(s: Status) {
      switch (s) { case 'idle': ... }
    }`,
    [['字面量类型', '30%', '具体值作为类型'], ['联合类型', '30%', '组合多个字面量'], ['类型收窄', '40%', 'switch 穷尽检查']],
    ['用 string 代替字面量联合，丢失类型检查',
     '联合类型成员过多导致类型提示困难',
     'switch 没有 default，编译器无法穷尽检查'],
    '字面量联合类型用于状态和事件名，可在 switch 中实现穷尽检查，减少拼写错误。'),
  Q('CO', 'P', 'TypeScript 装饰器有哪些类型？其原理是什么？',
    ['装饰器', 'Decorator', '元数据', '实验性'], '5-8 分钟', '中频',
    '请介绍类装饰器、方法装饰器、属性装饰器及其执行顺序。',
    `装饰器是特殊的函数，可在类、方法、访问器、属性、参数声明前使用。旧版实验性装饰器通过修改原型或属性描述符实现；TC39 新装饰器采用函数包装方式，不依赖 metadata。

执行顺序：参数 > 方法 > 访问器 > 属性 > 类，由近及远。`,
    [['装饰器类型', '40%', '类/方法/属性/参数装饰器'], ['原理', '30%', '描述符包装 vs 函数包装'], ['执行顺序', '30%', '由近及远、参数优先']],
    ['把装饰器当成运行时 AOP 任意修改类',
     '混淆实验性装饰器和新版 TC39 装饰器 API',
     '忽略 reflect-metadata 对类型元数据的额外配置'],
    'TypeScript 装饰器分为类、方法、属性、参数装饰器，旧版基于描述符，新版基于函数包装，执行顺序由近及远。'),
  Q('CO', 'P', '类型体操的度在哪里？如何保持可维护性？',
    ['类型体操', '可维护性', '类型系统', '工程化'], '3-5 分钟', '中频',
    '请讨论复杂类型推导与代码可读性之间的平衡。',
    `类型体操适合库和框架内部抽象，业务代码应优先简单类型。保持可维护性：1) 命名中间类型；2) 注释复杂推导的意图；3) 单元测试类型；4) 控制递归深度；5) 团队成员能理解是上限。

过度类型体操会导致编译变慢、错误信息难以阅读和新人上手困难。`,
    [['适用场景', '40%', '库框架 vs 业务代码'], ['命名与注释', '30%', '中间类型和意图'], ['测试', '30%', '类型级单元测试']],
    ['在业务代码中追求极度复杂的类型',
     '类型推导没有命名中间结果',
     '错误信息无法阅读时不增加注释或简化'],
    '类型体操适合底层库，业务代码应简单；通过命名、注释、测试和限制复杂度保持可维护。'),
  Q('CO', 'A', 'TypeScript 中的类型保护（Type Guards）有哪些？',
    ['Type Guards', 'typeof', 'instanceof', '自定义保护'], '3-5 分钟', '高频',
    '请列举内置和自定义类型保护，并说明它们如何收窄类型。',
    `内置：typeof 收窄基本类型，instanceof 收窄类实例，in 检查属性，Array.isArray。自定义：函数返回 value is Type 谓词，配合控制流分析收窄。

    function isString(value: unknown): value is string {
      return typeof value === 'string';
    }`,
    [['内置保护', '50%', 'typeof/instanceof/in/Array.isArray'], ['自定义保护', '30%', 'value is Type'], ['收窄效果', '20%', '控制流分析']],
    ['自定义类型保护函数没有返回类型谓词',
     '用 as 强制断言替代类型保护',
     '对联合类型成员使用 typeof 无法区分的场景未用自定义保护'],
    '类型保护通过 typeof、instanceof、in、自定义谓词函数收窄联合类型，避免使用 as 断言。'),
  Q('CO', 'A', '泛型默认值如何与条件类型结合使用？',
    ['泛型默认值', '条件类型', 'infer', '类型工具'], '3-5 分钟', '中频',
    '请写一个带默认类型参数的泛型工具，并解释其推导过程。',
    `泛型默认值在调用方未传入类型时使用预设类型。与条件类型结合可创建根据输入类型推断输出类型的工具。

    type MaybeArray<T = any> = T extends any[] ? T : T[];
    type A = MaybeArray<string>; // string[]`,
    [['默认值', '40%', '未传类型时的回退'], ['条件类型', '40%', 'extends 分支选择'], ['组合效果', '20%', '推导输出类型']],
    ['默认值使用 any 导致类型安全丢失',
     '条件类型分支没有覆盖所有输入情况',
     '混淆默认值与类型约束 extends'],
    '泛型默认值与条件类型结合，可在未传类型时回退默认值，并按条件推导输出类型。'),
];

const browserSpecs = [
  Q('CO', 'B', 'Intersection Observer 的原理与典型使用场景',
    ['Intersection Observer', '懒加载', '无限滚动', '可见性'], '3-5 分钟', '中频',
    '请说明 Intersection Observer 相比 scroll 监听的优势，并给出懒加载示例。',
    `Intersection Observer 异步监听目标元素与视口或祖先元素的交叉状态，避免在 scroll 事件中频繁读取布局属性导致重排。

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          io.unobserve(e.target);
        }
      });
    });
    io.observe(img);`,
    [['异步检测', '40%', '不阻塞主线程'], ['场景', '40%', '懒加载、无限滚动、广告可见性'], ['性能', '20%', '避免强制同步布局']],
    ['仍用 scroll + getBoundingClientRect 实现懒加载',
     '没有 unobserve 已加载元素，导致重复回调',
     '混淆 threshold 和 rootMargin 的作用'],
    'Intersection Observer 异步检测元素进入视口，适合图片懒加载和无限滚动，避免 scroll 监听导致的强制同步布局。'),
  Q('CO', 'B', 'DOMContentLoaded 与 load 事件的区别',
    ['DOMContentLoaded', 'load', '生命周期', '事件'], '2-3 分钟', '高频',
    '请说明两个事件的触发时机和使用场景差异。',
    `DOMContentLoaded 在 HTML 解析完成、DOM 树构建好后触发，无需等待样式表、图片、子框架。load 在整个页面包括所有资源加载完成后触发。

需要尽早执行 DOM 操作时监听 DOMContentLoaded；需要统计完整加载时间或操作图片尺寸时监听 load。`,
    [['触发时机', '50%', 'DOM 就绪 vs 全部资源加载'], ['使用场景', '30%', '初始化交互 vs 完整加载后操作'], ['阻塞因素', '20%', 'defer 脚本在 DOMContentLoaded 前执行']],
    ['在 DOMContentLoaded 中读取图片宽高，结果可能为 0',
     '把所有初始化逻辑都放在 load 事件，延迟交互可用时间',
     '认为 async 脚本一定在 DOMContentLoaded 之前执行'],
    'DOMContentLoaded 在 DOM 解析完成后触发，适合初始化交互；load 在所有资源加载完成后触发，适合完整加载后的操作。'),
  Q('CO', 'A', '什么是 Back-Forward Cache（bfcache）？',
    ['bfcache', '往返缓存', '页面生命周期', '性能'], '3-5 分钟', '中频',
    '请解释浏览器 bfcache 的作用，以及哪些行为会导致页面无法进入 bfcache。',
    `bfcache 是浏览器为前进/后退保留的页面快照，可瞬间恢复页面状态，无需重新加载和解析。使用 unload 事件、打开持久连接、beforeunload 中同步操作等可能阻止页面进入 bfcache。

最佳实践是用 pagehide/pageshow 的 persisted 属性判断缓存状态，避免在 unload 中执行清理逻辑。`,
    [['概念解释', '40%', '页面快照而非普通缓存'], ['阻塞原因', '40%', 'unload 事件、WebSocket、同步请求'], ['恢复处理', '20%', 'pageshow.persisted 判断']],
    ['在 unload 中释放资源，导致页面无法被缓存',
     '把 bfcache 当成 HTTP 缓存管理',
     '没有处理从 bfcache 恢复后定时器和网络状态不一致的问题'],
    'bfcache 让浏览器快速恢复前进后退的页面快照。应避免 unload 事件和持久连接，改用 pagehide/pageshow 处理状态恢复。'),
  Q('CO', 'A', 'CSS 的 content-visibility 属性有什么作用？',
    ['content-visibility', '渲染优化', 'CSS', 'contain'], '3-5 分钟', '中频',
    '请解释 content-visibility 如何影响浏览器渲染，并说明 auto 值的使用场景。',
    `content-visibility: auto 让浏览器跳过视口外元素的渲染工作（包括布局和绘制），直到它们接近视口。需要配合 contain-intrinsic-size 设置自然尺寸，防止滚动条跳动。

    .card {
      content-visibility: auto;
      contain-intrinsic-size: auto 300px;
    }`,
    [['作用解释', '40%', '跳过视口外元素的布局/绘制'], ['尺寸处理', '30%', 'contain-intrinsic-size 防止布局偏移'], ['适用场景', '30%', '长列表/feed 流']],
    ['不设置 contain-intrinsic-size，导致滚动条抖动',
     '对所有元素滥用 content-visibility，反而增加 contain 开销',
     '把它和 display:none 混为一谈，忽略元素仍占据空间'],
    'content-visibility: auto 让浏览器延迟渲染视口外元素，适合长列表。需要配合 contain-intrinsic-size 预留空间，避免布局偏移。'),
  Q('SC', 'A', '如何在前端实现图片懒加载？',
    ['图片懒加载', 'Intersection Observer', 'loading', '性能'], '5-8 分钟', '高频',
    '请设计一个图片懒加载方案，要求兼容现代浏览器和旧浏览器。',
    `现代浏览器可用 <img loading="lazy">，旧浏览器用 Intersection Observer 监听图片进入视口后再设置 src。需要处理占位图、错误降级和无 JS 场景的 noscript 回退。

    <img data-src="real.jpg" src="placeholder.jpg" loading="lazy" alt="描述" />`,
    [['方案完整', '40%', 'loading=lazy、Intersection Observer、降级'], ['性能优化', '30%', '占位图、避免布局偏移、unobserve'], ['边界处理', '30%', '错误处理、SEO、noscript 回退']],
    ['直接把所有图片 src 留空，导致 SEO 和无 JS 场景无法展示',
     '没有占位尺寸，图片加载后页面跳动严重',
     '在滚动事件中用 getBoundingClientRect 高频检测'],
    '现代浏览器优先用 img loading="lazy"，旧浏览器用 Intersection Observer。要预留占位尺寸、处理加载失败和 SEO 回退。'),
  Q('CO', 'A', 'requestIdleCallback 与 requestAnimationFrame 的区别',
    ['requestIdleCallback', 'requestAnimationFrame', '调度', '性能'], '3-5 分钟', '中频',
    '请比较两者的触发时机、用途和兼容性。',
    `requestAnimationFrame 与屏幕刷新同步，用于视觉相关的动画和绘制。requestIdleCallback 在浏览器空闲时执行低优先级任务，适合分片处理大数据、日志上报等非紧急工作。

rAF 回调通常 16ms 一次；requestIdleCallback 不保证执行，且部分浏览器缺失。`,
    [['触发时机', '40%', '刷新同步 vs 空闲时段'], ['适用场景', '40%', '动画 vs 后台任务'], ['兼容性', '20%', 'requestIdleCallback 缺失处理']],
    ['在 requestIdleCallback 中做动画，导致掉帧',
     '在 rAF 中执行耗时计算，阻塞下一帧',
     '忽略 requestIdleCallback 任务可能因浏览器忙碌而长期不执行'],
    'rAF 用于与刷新同步的动画；requestIdleCallback 用于浏览器空闲时的低优先级任务。不要把耗时任务放进 rAF。'),
  Q('CO', 'A', '浏览器标签页之间有哪些通信方式？',
    ['跨标签通信', 'BroadcastChannel', 'Storage', 'SharedWorker'], '3-5 分钟', '中频',
    '请列举浏览器标签页间通信的方案，并说明各自的优缺点和限制。',
    `常用方式包括：

1. BroadcastChannel：同源标签页间点对点广播，API 简洁但 IE 不支持。
2. localStorage + storage 事件：兼容性最好，但只能传递字符串且频繁写入有性能开销。
3. SharedWorker：多标签共享后台线程，但 Safari 历史支持不佳。
4. Service Worker + MessageChannel：可实现更复杂的协调，但实现成本较高。`,
    [['方案覆盖', '40%', '至少 3 种通信方式'], ['优缺点', '40%', '兼容性、性能、数据类型限制'], ['场景选择', '20%', '根据需求选择合适方案']],
    ['用轮询 localStorage 做实时通信，造成性能浪费',
     '忽略 storage 事件只在其他标签页触发，当前页修改不触发',
     '跨域场景下使用 BroadcastChannel 而未处理同源限制'],
    '标签页通信可用 BroadcastChannel、localStorage storage 事件、SharedWorker 或 Service Worker。选择时需考虑兼容性、数据大小和实时性。'),
  Q('PE', 'A', '什么是渲染阻塞资源？如何减少阻塞？',
    ['渲染阻塞', '关键渲染路径', 'CSS', 'JS'], '5-8 分钟', '高频',
    '请解释哪些资源会阻塞首次渲染，并给出减少阻塞的常用手段。',
    `CSS 和同步 JavaScript 会阻塞渲染：CSS 阻塞是因为需要 CSSOM 才能构建渲染树；JS 阻塞是因为默认会暂停 HTML 解析。

减少阻塞：CSS 用 media 查询分割、内联关键 CSS；JS 用 async/defer、底部加载或模块预加载；对非关键资源使用 preload/prefetch。`,
    [['阻塞原因', '40%', 'CSSOM 与 JS 解析阻塞'], ['优化手段', '40%', 'async/defer、关键 CSS、preload'], ['优先级判断', '20%', '如何识别关键资源']],
    ['把所有 CSS 都内联，导致 HTML 体积膨胀',
     '对所有脚本都加 async，导致依赖脚本执行顺序错乱',
     '忽略字体文件也会阻塞文本渲染'],
    'CSS 和同步 JS 是常见的渲染阻塞资源。优化方式包括 defer/async、内联关键 CSS、按需加载非关键资源。'),
  Q('PE', 'A', 'DNS 预解析和预连接对首屏有什么帮助？',
    ['DNS 预解析', 'preconnect', 'prefetch', '首屏优化'], '3-5 分钟', '中频',
    '请说明 dns-prefetch、preconnect、prefetch、preload 的区别和适用场景。',
    `<link rel="dns-prefetch"> 提前解析域名；<link rel="preconnect"> 提前建立 TCP/TLS 连接；<link rel="prefetch"> 低优先级预取后续页面资源；<link rel="preload"> 高优先级预加载当前页面关键资源。

对首屏最有用的是 preconnect 和 preload，可减少 DNS/TLS 和关键资源的等待时间。`,
    [['概念区分', '50%', '四种 link rel 的触发时机和优先级'], ['首屏收益', '30%', '减少的耗时环节'], ['滥用风险', '20%', 'preconnect 过多占用连接池']],
    ['对非关键资源使用 preload，浪费带宽',
     'preconnect 了不使用的第三方域名',
     '混淆 prefetch 和 preload 的优先级'],
    'dns-prefetch 提前解析域名，preconnect 提前建立连接，preload 预加载当前关键资源，prefetch 预取后续资源。合理配置能显著降低首屏关键路径耗时。'),
  Q('CO', 'A', '浏览器存储方案对比：Cookie、localStorage、sessionStorage、IndexedDB',
    ['Cookie', 'localStorage', 'sessionStorage', 'IndexedDB', '存储'], '5-8 分钟', '高频',
    '请从容量、生命周期、作用域、服务端携带等维度比较四种存储。',
    `Cookie：容量约 4KB，可设过期时间，随请求自动携带，适合身份凭证。localStorage：约 5-10MB，持久化，同源共享。sessionStorage：与会话生命周期一致，页面关闭清除。IndexedDB：键值对/结构化数据存储，容量大，适合离线应用。

敏感数据不建议存 localStorage，XSS 风险高。`,
    [['容量', '25%', '各存储容量差异'], ['生命周期', '25%', '过期/会话/持久'], ['作用域', '25%', '同源/单标签'], ['安全', '25%', '服务端携带与 XSS 风险']],
    ['把 JWT 存 localStorage  ignoring XSS 风险',
     'Cookie 未设置 HttpOnly/Secure/SameSite',
     '用 localStorage 做跨域数据共享'],
    'Cookie 小且自动携带，localStorage 持久大容量，sessionStorage 会话级，IndexedDB 适合结构化大数据。敏感数据应避免 localStorage。'),
  Q('CO', 'B', '事件捕获、冒泡和事件委托的区别',
    ['事件捕获', '事件冒泡', '事件委托', 'DOM'], '3-5 分钟', '高频',
    '请说明事件传播三个阶段，以及事件委托的实现原理和优点。',
    `事件传播分捕获阶段、目标阶段、冒泡阶段。addEventListener 第三个参数 useCapture 控制监听阶段。事件委托把监听注册到父元素，通过 event.target 判断实际触发元素，减少监听器数量。

    list.addEventListener('click', e => {
      if (e.target.matches('li')) handle(e.target);
    });`,
    [['三阶段', '40%', '捕获、目标、冒泡顺序'], ['委托原理', '40%', '父元素代理判断 target'], ['优点', '20%', '减少内存、动态元素支持']],
    ['在捕获阶段处理事件但不了解默认是冒泡阶段',
     '事件委托没有过滤 target 导致所有子元素都触发',
     '在需要 event.stopPropagation 的场景滥用委托'],
    '事件传播分捕获、目标、冒泡三阶段。事件委托通过父元素代理子元素事件，减少监听器并支持动态元素。'),
  Q('CO', 'B', '同源策略是什么？跨域有哪些解决方案？',
    ['同源策略', '跨域', 'CORS', 'JSONP'], '3-5 分钟', '高频',
    '请解释同源策略限制的内容，并列举常见跨域解决方案。',
    `同源策略要求协议、域名、端口完全一致，限制不同源文档间的 DOM 访问、Cookie/localStorage 读取和 AJAX 请求。常见方案：CORS、JSONP、代理服务器、postMessage、WebSocket、document.domain、window.name 等。

推荐方案：生产环境使用 CORS 或代理服务器，JSONP 仅用于历史兼容。`,
    [['同源定义', '30%', '协议/域名/端口'], ['限制范围', '30%', 'DOM、存储、请求'], ['方案', '40%', 'CORS、代理、JSONP、postMessage']],
    ['认为同源策略只限制 AJAX',
     '用 JSONP 处理所有跨域请求忽略安全性',
     'CORS 配置为 * 并允许 credentials 导致安全风险'],
    '同源策略限制协议、域名、端口不一致的资源访问。跨域推荐 CORS 或代理，JSONP 用于兼容但安全性差。'),
  Q('CO', 'A', '什么是关键渲染路径（CRP）？如何优化？',
    ['CRP', '关键渲染路径', '首屏优化', '性能'], '5-8 分钟', '高频',
    '请描述从 HTML/CSS/JS 到首帧的关键路径及优化手段。',
    `关键渲染路径包括：构建 DOM、CSSOM、合并为渲染树、布局、绘制、合成。阻塞资源会延迟首帧。

优化：减少关键资源数量/体积、内联关键 CSS、defer/async JS、预加载关键资源、使用 HTTP 缓存、服务端渲染。`,
    [['路径阶段', '40%', 'DOM/CSSOM/渲染树/布局/绘制/合成'], ['阻塞资源', '30%', 'CSS 和同步 JS'], ['优化手段', '30%', '内联关键 CSS、defer、preload']],
    ['把首屏所有资源都标记为 preload',
     'CSS 全部外联且不内联关键样式',
     'JS 阻塞在 head 中导致首次绘制延迟'],
    '关键渲染路径是浏览器生成首帧的步骤。优化重点是减少阻塞资源、内联关键 CSS、异步加载 JS 和预加载关键资源。'),
  Q('CO', 'A', '浏览器资源加载优先级是如何确定的？',
    ['资源优先级', '加载顺序', 'preload', '浏览器'], '3-5 分钟', '中频',
    '请说明浏览器如何根据资源类型、位置和属性确定加载优先级。',
    `浏览器基于资源类型（CSS/JS/字体/图片）、HTML 中的位置（head 中 CSS 优先级高）、async/defer/module、preload/preconnect 提示以及图片的 loading 属性确定优先级。关键 CSS 和字体通常是 Highest，异步 JS 和懒加载图片较低。

可通过 DevTools Network 面板查看 Priority 字段。`,
    [['类型', '30%', '不同资源默认优先级'], ['位置与属性', '30%', 'head、async、defer'], ['优化提示', '40%', 'preload、preconnect、fetchpriority']],
    ['对所有图片使用 loading=lazy，包括首屏 LCP 图片',
     '用 preload 加载非关键资源，浪费带宽',
     '忽略 fetchpriority 对图片和脚本优先级的微调能力'],
    '浏览器根据资源类型、位置、async/defer、preload 等确定加载优先级。关键资源应优先加载，非关键资源延后。'),
  Q('PE', 'A', '如何用 PerformanceObserver 采集性能指标？',
    ['PerformanceObserver', 'Web Vitals', '性能指标', 'RUM'], '5-8 分钟', '中频',
    '请写出用 PerformanceObserver 监听 LCP、CLS、INP 的代码片段。',
    `PerformanceObserver 可异步订阅 performance entry，避免轮询 Performance Timeline。

    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        console.log(entry.name, entry.startTime, entry.value || entry.duration);
      }
    });
    observer.observe({ type: 'web-vitals' }); // 或分别 observe largest-contentful-paint 等`,
    [['API 使用', '40%', 'PerformanceObserver 订阅 entry'], ['指标类型', '30%', 'LCP/CLS/INP/FID'], ['RUM 上报', '30%', '数据收集与发送']],
    ['仍用 setInterval 轮询 performance.getEntries',
     '在页面加载完成前未注册 observer 导致丢失早期 entry',
     '对 buffer 中的历史 entry 没有使用 observe 的 buffered 选项'],
    'PerformanceObserver 异步订阅性能条目，适合采集 LCP、CLS、INP 等 Web Vitals 指标。'),
  Q('CO', 'A', '浏览器的主要进程与线程模型是什么？',
    ['浏览器进程', '渲染进程', 'GPU 进程', '多进程'], '5-8 分钟', '中频',
    '请说明 Chrome 多进程架构中各进程的职责及渲染进程内的主要线程。',
    `主要进程：Browser 进程（UI、标签管理）、Renderer 进程（网页渲染与 JS 执行，沙箱中）、GPU 进程（图形合成）、Network 进程（网络请求）、Plugin 进程（插件）。渲染进程内：主线程、合成器线程、光栅线程、IO 线程等。

多进程架构提升稳定性，一个标签页崩溃不影响其他标签。`,
    [['进程职责', '50%', 'Browser/Renderer/GPU/Network'], ['渲染线程', '30%', '主线程、合成器、光栅'], ['优势', '20%', '稳定性与安全隔离']],
    ['认为所有网页都在 Browser 进程运行',
     '把渲染进程和浏览器进程混为一谈',
     '忽略站点隔离对跨站点 iframe 的进程分配影响'],
    'Chrome 采用多进程架构：Browser 管理 UI，Renderer 渲染网页，GPU 合成图形，Network 处理请求。渲染进程内有主线程、合成器线程等。'),
  Q('SC', 'P', '如何设计浏览器端的安全架构防御 XSS、CSRF、点击劫持？',
    ['安全架构', 'XSS', 'CSRF', '点击劫持', 'CSP'], '10-15 分钟', '中频',
    '请从输入、输出、传输、运行时四个层面设计前端安全方案。',
    `输入层：白名单校验、类型约束、不可信数据标记。输出层：HTML/JS/CSS 上下文转义、使用 textContent 而非 innerHTML。传输层：HTTPS、HSTS、Secure/HttpOnly/SameSite Cookie。运行时：CSP、Trusted Types、iframe sandbox、X-Frame-Options、输入事件审计。

定期更新依赖、建立 SRI 校验和 CSP 报告收集。`,
    [['输入输出', '30%', '校验与转义'], ['传输', '30%', 'HTTPS、Cookie 属性'], ['运行时', '30%', 'CSP、Trusted Types、X-Frame-Options'], ['治理', '10%', '依赖安全与报告']],
    ['只依赖前端过滤，忽略服务端校验',
     'CSP 配置过宽，如 script-src *',
     '点击劫持仅依赖 JS 防御，未配置 X-Frame-Options/CSP frame-ancestors'],
    '浏览器端安全架构应分层：输入校验、输出转义、HTTPS/Cookie 安全、运行时 CSP/Trusted Types/iframe 防护，并治理依赖。'),
  Q('SC', 'P', '如何设计跨窗口/跨 Tab 的前端状态同步方案？',
    ['跨窗口同步', 'BroadcastChannel', '状态同步', '设计'], '5-8 分钟', '中频',
    '请设计一个支持多标签页实时同步用户状态和互斥登录的方案。',
    `方案：使用 BroadcastChannel 进行同源广播；localStorage storage 事件做兼容降级；Service Worker 做协调中心。状态变更时发送 action，各标签页 reducer 更新本地 store。互斥登录可通过 leader election 或 token 失效广播实现。

注意隐私数据不要通过广播明文传输。`,
    [['通信方式', '40%', 'BroadcastChannel、storage 事件、SW'], ['状态一致性', '30%', 'action/reducer 模式'], ['安全', '30%', '敏感数据加密与 token 失效']],
    ['用轮询 localStorage 实现实时同步',
     '广播状态快照导致性能差且冲突多',
     '未处理标签页失活后恢复导致的过期状态'],
    '跨 Tab 状态同步可用 BroadcastChannel 或 storage 事件，采用 action/reducer 模式保持一致，敏感数据需加密。'),
  Q('SC', 'R', '如何设计浏览器端的前端监控与可观测性体系？',
    ['可观测性', '监控', '性能', '错误采集'], '10-15 分钟', '中频',
    '请从错误、性能、业务、日志四个维度设计监控体系。',
    `错误：window.onerror、unhandledrejection、Error Boundary、SourceMap 还原。性能：Web Vitals、资源加载时间、Long Tasks、RUM 采样。业务：埋点、PV/UV、关键路径漏斗。日志：结构化日志、日志级别、本地缓存与批量上报。

上报策略：sendBeacon、采样、限流、脱敏、离线缓存。`,
    [['错误监控', '30%', '全局错误与 SourceMap'], ['性能监控', '30%', 'Web Vitals、RUM'], ['业务埋点', '20%', '漏斗与事件'], ['上报策略', '20%', '采样、限流、脱敏']],
    ['所有指标全量上报导致网络拥塞',
     '未做用户隐私和敏感数据脱敏',
     'SourceMap 上传到公网导致源码泄露'],
    '浏览器端监控体系覆盖错误、性能、业务、日志四方面，通过采样、限流、脱敏和 sendBeacon 保证可靠与合规。'),
];

const networkSpecs = [
  Q('CO', 'B', 'IP 地址、子网掩码和默认网关分别是什么？',
    ['IP', '子网掩码', '网关', '网络基础'], '3-5 分钟', '中频',
    '请说明三者作用及它们如何协作完成主机间通信。',
    `IP 地址是网络中主机的唯一逻辑地址；子网掩码用于划分网络位和主机位，判断目标是否在同一子网；默认网关是本地子网通往其他网络的出口。

同一子网直接通信；不同子网时，数据包发送给默认网关转发。`,
    [['IP 地址', '30%', '逻辑地址与寻址'], ['子网掩码', '30%', '网络位与主机位'], ['默认网关', '40%', '跨网段转发']],
    ['把 MAC 地址和 IP 地址混为一谈',
     '认为子网掩码只影响网络大小，不影响通信路径',
     '不知道默认网关通常配置在路由器接口上'],
    'IP 地址标识主机，子网掩码判断网段，默认网关负责跨网段转发。'),
  Q('CO', 'B', '常见 HTTP 方法的语义与幂等性',
    ['HTTP', '幂等性', 'REST', '方法'], '3-5 分钟', '高频',
    '请说明 GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS 的语义和幂等性。',
    `GET 获取资源，幂等安全；POST 创建资源，非幂等；PUT 整体替换，幂等；DELETE 删除，幂等；PATCH 部分更新，默认不保证幂等；HEAD 获取元数据；OPTIONS 查询支持的方法，常用于 CORS 预检。

幂等性指多次相同请求副作用一致。`,
    [['语义', '50%', '各方法用途'], ['幂等性', '30%', '是否幂等'], ['安全性', '20%', '是否修改资源']],
    ['认为 POST 天然幂等',
     '把 PUT 和 PATCH 混用，导致部分更新意外覆盖其他字段',
     '用 GET 请求做删除或修改操作'],
    'GET/PUT/DELETE/HEAD/OPTIONS 幂等，POST 非幂等，PATCH 不一定幂等。应根据语义选择方法。'),
  Q('CO', 'B', 'URL 的组成结构及各部分作用',
    ['URL', '协议', '域名', '路径', '查询参数'], '3-5 分钟', '高频',
    '请拆解 https://example.com:8080/path?a=1#frag 的各部分。',
    `URL 包括：protocol（https）、authority（userinfo@host:port）、path（/path）、query（?a=1）、fragment（#frag）。host 包含域名和端口，fragment 仅在客户端使用，不会发送到服务端。

编码：query 参数需用 encodeURIComponent 处理特殊字符。`,
    [['协议与主机', '40%', 'scheme、host、port'], ['路径与查询', '40%', 'path、query 编码'], ['片段', '20%', 'fragment 客户端定位']],
    ['fragment 被发送到服务器',
     'query 参数直接拼接中文字符而不编码',
     '混淆 pathname 和 search 的取值范围'],
    'URL 由协议、主机、路径、查询参数和片段组成，fragment 不发送到服务端，query 需编码。'),
  Q('CO', 'A', 'TCP 粘包与拆包问题是如何产生的？如何解决？',
    ['TCP', '粘包', '拆包', '字节流'], '5-8 分钟', '中频',
    '请解释 TCP 粘包/拆包的原因，并给出应用层解决方案。',
    `TCP 是面向字节流的协议，没有消息边界。发送方可能把多个小报文合并发送（粘包），也可能把大报文分片发送（拆包）。应用层需自行定义消息边界。

常见方案：固定长度、分隔符、长度前缀。HTTP 使用 Content-Length 或分块传输解决边界问题。`,
    [['原因', '40%', '字节流无边界'], ['固定长度', '20%', '定长消息'], ['分隔符', '20%', '特殊字符分隔'], ['长度前缀', '20%', '先读长度再读数据']],
    ['认为 TCP 按应用层报文为单位传输',
     '用简单字符串 split 处理二进制数据导致边界错误',
     '长度前缀不考虑字节序和大端小端'],
    'TCP 粘包/拆包源于字节流无消息边界，应用层可用固定长度、分隔符或长度前缀定义边界。'),
  Q('CO', 'A', '长连接与短连接的区别及适用场景',
    ['HTTP', 'Keep-Alive', '长连接', '短连接'], '3-5 分钟', '中频',
    '请比较 HTTP 长连接和短连接在 TCP 握手、资源消耗和适用场景上的差异。',
    `短连接：每次请求都新建 TCP 连接，响应后关闭，适合低频请求。长连接（Keep-Alive）：复用 TCP 连接发送多个请求，减少握手开销，适合高频、连续请求，如 REST API、HTTP/2。

注意长连接需管理空闲超时和连接池大小。`,
    [['握手开销', '40%', '短连接多次握手'], ['资源占用', '30%', '长连接维持与连接数'], ['场景', '30%', '低频 vs 高频请求']],
    ['认为长连接一定比短连接性能好',
     '长连接没有空闲超时，导致连接泄漏',
     'HTTP/2 仍使用短连接'],
    '长连接复用 TCP 减少握手开销，适合高频请求；短连接简单，适合低频或一次性请求。'),
  Q('CO', 'A', '正向代理、反向代理和透明代理有什么区别？',
    ['代理', '正向代理', '反向代理', '负载均衡'], '3-5 分钟', '中频',
    '请说明三种代理的位置、可见性和典型应用场景。',
    `正向代理位于客户端和目标服务器之间，代理客户端访问外网，客户端需配置，服务端不知道真实客户端（如 VPN）。反向代理位于服务端前，代理服务器响应请求，客户端无感知，常用于负载均衡、SSL 终结、缓存（如 Nginx）。透明代理对客户端和服务端都不可感知，常用于企业审计。

CDN 属于反向代理。`,
    [['正向代理', '30%', '代理客户端'], ['反向代理', '40%', '代理服务端、负载均衡'], ['透明代理', '30%', '无感知中间人']],
    ['认为 CDN 是正向代理',
     '反向代理直接暴露后端真实服务器',
     '混淆代理和 NAT 网关的作用'],
    '正向代理代理客户端，反向代理代理服务端，CDN 属于反向代理。透明代理对两端无感知。'),
  Q('CO', 'A', 'If-None-Match 与 If-Modified-Since 有什么区别？',
    ['HTTP', '缓存', 'ETag', 'Last-Modified'], '3-5 分钟', '中频',
    '请说明两个请求头在协商缓存中的优先级和差异。',
    `If-Modified-Since 携带 Last-Modified 时间，按时间判断资源是否变化；If-None-Match 携带 ETag，按资源标识判断。服务器优先使用 If-None-Match/ETag，更精确，可识别内容不变但时间变化的情况。

304 Not Modified 表示缓存可用。`,
    [['时间 vs 标识', '40%', 'Last-Modified 与 ETag 差异'], ['优先级', '30%', 'ETag 优先'], ['响应', '30%', '200 与 304 的区别']],
    ['认为 If-Modified-Since 优先级高于 If-None-Match',
     'ETag 仅基于文件修改时间生成',
     '协商缓存和强缓存混用导致预期外的网络请求'],
    'If-Modified-Since 基于时间，If-None-Match 基于 ETag；服务器优先比较 ETag，命中返回 304。'),
  Q('CO', 'A', 'WebSocket 握手过程及帧格式关键字段',
    ['WebSocket', '握手', '帧', '协议升级'], '5-8 分钟', '中频',
    '请描述 WebSocket 从 HTTP 升级到全双工通信的过程。',
    `握手：客户端发送带 Upgrade: websocket、Connection: Upgrade、Sec-WebSocket-Key 的 HTTP 请求；服务端返回 101 Switching Protocols 和 Sec-WebSocket-Accept（基于 Key 的哈希）。

帧格式关键字段：FIN（是否最后一个分片）、opcode（文本/二进制/关闭/心跳）、MASK（客户端帧必须掩码）、payload length、payload data。`,
    [['握手请求', '30%', 'Upgrade、Sec-WebSocket-Key'], ['握手响应', '30%', '101、Sec-WebSocket-Accept'], ['帧字段', '40%', 'FIN、opcode、MASK、payload']],
    ['认为 WebSocket 不依赖 HTTP 协议',
     '忽略客户端必须对 payload 进行掩码',
     '把 Sec-WebSocket-Key 直接当作认证密钥'],
    'WebSocket 通过 HTTP 协议升级握手，服务端返回 101；帧中 FIN、opcode、MASK、payload length 是关键字段。'),
  Q('CO', 'A', '同源策略具体限制了哪些资源的访问？',
    ['同源策略', 'CORS', 'DOM', '存储'], '3-5 分钟', '高频',
    '请说明同源策略对脚本、AJAX、DOM、Cookie、存储的限制。',
    `同源策略限制：

1. DOM 访问：不同源窗口/iframe 不能读取 document/contentWindow。
2. AJAX：XMLHttpRequest/fetch 默认不能跨源读取响应。
3. Cookie/Web Storage/IndexedDB：不同源页面不能互相访问。
4. Canvas：跨域图片绘制后 canvas 被污染，无法 toDataURL。

标签如 script/img/link 的跨域加载不受限制，但读取内容受限。`,
    [['DOM', '25%', 'iframe/窗口访问'], ['AJAX', '25%', '请求响应读取'], ['存储', '25%', 'Cookie/Storage'], ['Canvas', '25%', '跨域图片污染']],
    ['认为 script 标签加载跨域资源违反同源策略',
     '忽略 CORS 只放宽读取响应，不放宽 DOM 访问',
     '用 document.domain 降低安全性而不评估风险'],
    '同源策略限制跨源 DOM 访问、AJAX 响应读取、存储访问和 Canvas 读取；标签加载本身不限制。'),
  Q('CO', 'A', 'DNS 负载均衡与 GSLB 的基本思想',
    ['DNS', '负载均衡', 'GSLB', 'CDN'], '3-5 分钟', '中频',
    '请解释 DNS 如何支持流量分发和全局负载均衡。',
    `DNS 负载均衡：为一个域名配置多个 A/AAAA 记录，递归 DNS 按轮询、权重或地理位置返回不同 IP，分散流量。

GSLB（全局负载均衡）：基于 DNS 或 HTTP 302/Anycast，根据用户地理位置、网络状况、节点健康度将请求调度到最近或最健康的机房/CDN 节点。`,
    [['DNS 轮询', '40%', '多 A 记录分发'], ['GSLB', '40%', '地理/健康度调度'], ['优缺点', '20%', 'DNS 缓存导致切换不及时']],
    ['认为 DNS 负载均衡能精确控制会话粘性',
     '忽略 DNS TTL 对故障切换的影响',
     '把 GSLB 和应用层负载均衡混为一谈'],
    'DNS 负载均衡通过多 A 记录分发流量；GSLB 基于地理和健康度做全局调度，但受 DNS 缓存影响。'),
  Q('CO', 'P', 'TCP 的 TIME_WAIT 状态为什么存在？过多如何优化？',
    ['TCP', 'TIME_WAIT', '连接状态', '性能'], '3-5 分钟', '中频',
    '请解释 TIME_WAIT 的作用及高并发短连接场景下的优化手段。',
    `TIME_WAIT 存在两个原因：1) 保证最后一个 ACK 丢失后能重传，避免对端 FIN 重发后无法处理；2) 让旧连接的延迟报文在网络中消失，防止新连接收到过期数据。

优化：连接复用（Keep-Alive/连接池）、tw_reuse（仅客户端）、tw_recycle（已废弃）、增加本地端口范围、使用长连接协议如 HTTP/2。`,
    [['作用', '50%', 'ACK 重传与旧报文清理'], ['问题', '20%', '端口耗尽'], ['优化', '30%', '连接池、长连接、端口范围']],
    ['直接修改内核大量降低 TIME_WAIT 而不理解风险',
     '在服务端开启 tw_reuse',
     '高并发短连接不使用连接池'],
    'TIME_WAIT 保证可靠关闭和旧报文清理，过多时通过连接池、长连接和端口范围优化。'),
  Q('CO', 'P', 'HTTP 范围请求（Range Requests）如何实现断点续传？',
    ['HTTP', 'Range', '断点续传', '下载'], '3-5 分钟', '中频',
    '请说明 Range/Content-Range 头字段及 206 Partial Content 的应用。',
    `客户端通过 Range: bytes=start-end 请求资源的一部分；服务端返回 206 Partial Content 和 Content-Range: bytes start-end/total。客户端可合并多个分片，失败时只重试缺失分片。

    Range: bytes=0-1023
    Content-Range: bytes 0-1023/10000`,
    [['请求头', '40%', 'Range 格式'], ['响应头', '30%', 'Content-Range 与 206'], ['续传逻辑', '30%', '分片合并与失败重试']],
    ['断点续传不使用 Range，而是重新下载整个文件',
     '服务端返回 200 而非 206',
     '多线程下载时未校验分片顺序和完整性'],
    'HTTP 范围请求通过 Range/Content-Range 获取资源片段，返回 206，用于断点续传和多线程下载。'),
  Q('CO', 'P', 'QUIC 的连接迁移是如何实现的？',
    ['QUIC', '连接迁移', 'UDP', 'HTTP/3'], '3-5 分钟', '低频',
    '请解释 QUIC 如何在不中断连接的情况下切换网络。',
    `QUIC 基于 UDP，连接标识由连接 ID 而非四元组确定。当客户端 IP 或端口变化时，只要连接 ID 不变，服务端即可识别同一连接，继续传输。

这解决了 TCP 在 Wi-Fi/4G 切换时连接中断的问题。`,
    [['连接标识', '40%', 'Connection ID 替代四元组'], ['UDP 优势', '30%', '无 TCP 握手依赖'], ['场景', '30%', '移动网络切换']],
    ['认为 QUIC 连接迁移需要重新握手',
     '把 QUIC 的连接 ID 和 TLS session ticket 混为一谈',
     '忽略服务端需要验证新路径的防攻击机制'],
    'QUIC 使用连接 ID 标识连接，IP/端口变化时仍可迁移，适合移动网络切换。'),
  Q('CO', 'P', 'HTTPS 证书链验证过程及潜在风险',
    ['HTTPS', '证书链', 'CA', 'TLS'], '5-8 分钟', '中频',
    '请说明浏览器如何验证服务器证书，以及可能存在的风险。',
    `验证：1) 检查证书有效期和域名匹配；2) 使用上级 CA 公钥验证签名，逐级到信任锚；3) 检查证书吊销状态（CRL/OCSP）；4) 验证证书用途和基本约束。

风险：中间人使用非法 CA 证书、私有 CA 被滥用、CRL/OCSP 检查被拦截、用户忽略证书警告。`,
    [['签名验证', '30%', '逐级验证 CA 签名'], ['信任锚', '30%', '系统/浏览器根证书'], ['吊销检查', '20%', 'CRL/OCSP'], ['风险', '20%', '非法 CA、用户忽略警告']],
    ['认为 HTTPS 证书绝对无法伪造',
     '忽略证书链中中间证书缺失导致的验证失败',
     '混淆自签名证书与 CA 签名证书的安全性'],
    'HTTPS 证书链验证包括有效期、域名、签名、吊销等；风险来自非法 CA、私有根证书和用户忽略警告。'),
  Q('CO', 'P', 'WebTransport 与 WebSocket 的设计差异',
    ['WebTransport', 'WebSocket', 'HTTP/3', '实时通信'], '3-5 分钟', '低频',
    '请比较两者的传输层、API 模型和适用场景。',
    `WebSocket 基于 TCP 和 HTTP 升级，提供双向有序字节流，API 简单。WebTransport 基于 HTTP/3 和 QUIC，支持多个可靠/不可靠数据流（类似 WebRTC 的 DataChannel），可复用连接且避免队头阻塞。

WebTransport 适合需要低延迟、多流、部分不可靠传输的游戏或实时场景。`,
    [['传输层', '40%', 'TCP/HTTP vs QUIC/HTTP3'], ['API 模型', '30%', '单流 vs 多流'], ['场景', '30%', '可靠有序 vs 低延迟多流']],
    ['认为 WebTransport 是 WebSocket 的简单替代',
     '在需要可靠有序消息的场景误用不可靠流',
     '忽略 WebTransport 目前浏览器支持度有限'],
    'WebSocket 基于 TCP 提供单流双向通信；WebTransport 基于 QUIC 提供多可靠/不可靠流，适合低延迟实时场景。'),
  Q('PE', 'P', '前端如何测量和优化 TTFB？',
    ['TTFB', '首字节时间', '性能指标', '优化'], '5-8 分钟', '中频',
    '请说明 TTFB 的定义、测量方式和优化方向。',
    `TTFB 是从请求开始到浏览器收到第一个字节的时间，包括 DNS、TCP/TLS、服务端处理、网络传输。可用 PerformanceNavigationTiming.responseStart - startTime 测量。

优化：DNS 预解析/预连接、CDN 边缘节点、服务端渲染缓存、优化数据库查询、HTTP/2 或 HTTP/3、压缩响应。`,
    [['定义', '30%', 'responseStart - startTime'], ['分解', '30%', 'DNS/TCP/TLS/服务端处理'], ['优化', '40%', '边缘缓存、服务端优化、协议升级']],
    ['把 TTFB 等同于页面完全加载时间',
     '只优化前端资源而忽略服务端处理时间',
     '忽略 CDN 回源延迟对 TTFB 的影响'],
    'TTFB 衡量首字节返回时间。优化需覆盖 DNS、连接、服务端处理和传输，常用 CDN、缓存和协议升级。'),
  Q('SC', 'P', '设计一个高并发短链服务的前后端接口',
    ['短链', '高并发', '接口设计', '缓存'], '8-12 分钟', '中频',
    '请设计短链生成、存储、跳转和防刷接口。',
    `生成：POST /shorten {url} 返回短码，使用哈希+发号器或 Base62 编码保证唯一。跳转：GET /{shortCode} 302 到原 URL，使用 Redis 缓存热点映射。防刷：接口限流、验证码、域名黑名单。

    POST /api/shorten
    { "url": "https://example.com/very/long/path" }
    Response: { "shortUrl": "https://s.cn/abc123" }`,
    [['短码生成', '30%', '唯一性与冲突处理'], ['存储与缓存', '30%', '数据库 + Redis'], ['跳转', '20%', '302 与缓存失效'], ['安全', '20%', '限流与域名过滤']],
    ['短码生成依赖数据库自增 ID，高并发成为瓶颈',
     '跳转时不做缓存，每次查数据库',
     '允许任意 URL 生成短链，导致钓鱼或恶意跳转'],
    '高并发短链服务需保证短码唯一、使用缓存加速跳转、接口限流和域名过滤。'),
  Q('SC', 'P', '设计一个断点续传上传组件',
    ['上传', '断点续传', '分片', '文件'], '8-12 分钟', '中频',
    '请设计文件分片、上传状态记录、失败重试和合并流程。',
    `流程：1) 文件按大小切片并计算 hash；2) 服务端校验已上传分片，返回缺失列表；3) 客户端并行上传缺失分片；4) 服务端按顺序合并；5) 前端展示上传进度，支持暂停/恢复。

    const chunks = slice(file, CHUNK_SIZE);
    const uploaded = await check(fileHash);
    await Promise.all(chunks.filter(...).map(upload));`,
    [['分片策略', '30%', '大小与 hash 计算'], ['断点记录', '30%', '服务端已上传分片索引'], ['重试合并', '25%', '失败重试与顺序合并'], ['体验', '15%', '进度与暂停']],
    ['分片过小导致请求过多',
     '没有校验文件 hash，导致合并错误',
     '断点信息仅存在前端，刷新页面丢失'],
    '断点续传上传需要分片、hash 校验、服务端记录缺失分片、并行上传、失败重试和最终合并。'),
  Q('SE', 'A', '什么是 SSRF？前端如何配合防御？',
    ['SSRF', '服务器端请求伪造', '安全', '输入校验'], '3-5 分钟', '中频',
    '请解释 SSRF 原理及前端在 URL 输入场景中的防御配合。',
    `SSRF 是攻击者诱使服务端发起对内部网络或敏感资源的请求。前端可在 URL 输入场景做白名单校验、禁止私有 IP 和 localhost、限制协议为 http/https，并将原始 URL 传给服务端，不做前端代理跳转。

    function isPrivateIP(ip) { ... } // 校验 10/172/192 段`,
    [['原理', '40%', '服务端发起恶意请求'], ['前端校验', '30%', 'URL 白名单、协议限制'], ['配合后端', '30%', '不绕过服务端校验']],
    ['前端绕过校验后直接请求内网资源',
     '把 SSRF 完全当成后端问题，前端不做输入控制',
     '用正则简单判断 URL，无法识别编码和重定向绕过'],
    'SSRF 是服务端请求伪造，前端应校验 URL 白名单、协议和私有 IP，并配合后端再做严格校验。'),
  Q('SE', 'P', '网络层 DDoS 攻击的原理与防御思路',
    ['DDoS', '网络攻击', 'CDN', 'WAF'], '5-8 分钟', '低频',
    '请说明常见 DDoS 类型及前端可观测与配合的防御措施。',
    `DDoS 通过大量请求耗尽目标带宽、连接或计算资源。类型：Volumetric（流量耗尽）、Protocol（SYN Flood 等）、Application（CC 攻击）。

防御：流量清洗、CDN Anycast、WAF 限流、速率限制、挑战（Captcha）、基于行为分析封禁。前端可配合埋点识别异常流量并启用验证码挑战。`,
    [['类型', '40%', '流量/协议/应用层攻击'], ['防御层', '40%', 'CDN、WAF、限流、清洗'], ['前端配合', '20%', '验证码、行为校验']],
    ['把 DDoS 等同于 XSS',
     '认为前端可以单独防御 DDoS',
     '忽略应用层 CC 攻击与正常高并发的区分难度'],
    'DDoS 通过大量流量或请求耗尽资源，防御依赖网络层清洗、CDN、WAF 和限流，前端可配合验证码和行为校验。'),
];

const securitySpecs = [
  Q('CO', 'B', '输入验证在前端应遵循哪些原则？',
    ['输入验证', '白名单', 'XSS', '安全'], '3-5 分钟', '高频',
    '请说明前端输入验证的原则及与服务端验证的关系。',
    `原则：1) 白名单优于黑名单；2) 按数据类型和长度限制；3) 在输入点、边界点做校验；4) 前端校验只提升体验，服务端必须最终校验；5) 不可信数据进入 DOM 前按上下文转义。

前端校验不能替代服务端校验。`,
    [['白名单', '30%', '允许什么而非禁止什么'], ['多层校验', '30%', '前端+服务端'], ['上下文转义', '40%', '输出到 DOM/JS/CSS 前转义']],
    ['前端验证通过后信任数据安全',
     '用黑名单过滤所有危险字符',
     '把用户输入直接插入 innerHTML'],
    '前端输入验证使用白名单、多层校验，并不可信数据进入 DOM 前按上下文转义；服务端必须再次校验。'),
  Q('CO', 'B', 'HTTPS 证书过期或域名不匹配会发生什么？',
    ['HTTPS', '证书', 'TLS', '错误处理'], '2-3 分钟', '中频',
    '请解释证书过期、域名不匹配、不受信任 CA 时浏览器的行为。',
    `浏览器会拦截请求并显示安全警告，阻止用户继续访问（可手动绕过）。原因：过期证书无法保证当前时间段合法；域名不匹配说明证书不是为该站点签发；不受信任 CA 无法建立信任链。

前端应监控证书有效期并提前续期，HSTS 站点无法绕过警告。`,
    [['过期', '30%', '时间有效性'], ['域名', '30%', 'CN/SAN 匹配'], ['信任链', '40%', '根证书与警告行为']],
    ['让用户绕过所有证书警告',
     '认为自签名证书在生产环境可接受',
     '忽略证书监控导致过期宕机'],
    '证书过期、域名不匹配或 CA 不受信任时浏览器会拦截并警告，生产环境需监控证书有效期。'),
  Q('CO', 'B', 'Referrer-Policy 有哪些常见取值？对隐私有什么影响？',
    ['Referrer-Policy', '隐私', '安全头'], '3-5 分钟', '中频',
    '请说明 no-referrer、strict-origin-when-cross-origin 等取值的含义。',
    `常见值：no-referrer（不发送 Referer）、no-referrer-when-downgrade（HTTPS 到 HTTP 不发送）、origin（仅发送来源域名）、strict-origin（降级不发送且仅域名）、same-origin（同源完整，跨域仅域名）、strict-origin-when-cross-origin（默认值：同源完整，跨域仅域名，降级不发送）、unsafe-url（始终发送完整 URL）。

设置过严可能影响依赖 Referer 的统计分析。`,
    [['取值语义', '50%', '各值区别'], ['降级安全', '20%', 'HTTPS 到 HTTP'], ['隐私平衡', '30%', '业务分析与隐私保护']],
    ['对所有请求使用 no-referrer 导致分析系统失效',
     '使用 unsafe-url 泄露敏感 URL 参数',
     '混淆 Referrer-Policy 和 Referer 头本身'],
    'Referrer-Policy 控制请求携带的 Referer 信息量，需在隐私保护和业务分析间取得平衡。'),
  Q('CO', 'A', '什么是会话固定攻击？如何防御？',
    ['会话固定', 'Session', '认证', '安全'], '3-5 分钟', '中频',
    '请解释攻击者如何固定用户会话标识，并给出防御方法。',
    `攻击者预先获取一个会话 ID 并诱导用户使用该 ID 登录，登录后服务端未更换 ID，攻击者即可使用该 ID 冒充用户。

防御：登录成功后重新生成会话 ID；设置 HttpOnly/Secure/SameSite Cookie；定期轮换会话；绑定用户 IP/设备指纹。`,
    [['攻击流程', '40%', '预设 session ID 诱导登录'], ['防御', '40%', '登录后更换 session ID'], ['Cookie 属性', '20%', 'HttpOnly/Secure/SameSite']],
    ['登录前后使用相同 session ID',
     '把 session ID 放在 URL 中',
     '仅依赖前端隐藏 session ID'],
    '会话固定攻击通过预设 session ID 冒充用户；登录成功后应重新生成会话 ID 并加固 Cookie。'),
  Q('CO', 'A', 'X-Frame-Options 与 CSP frame-ancestors 如何防御点击劫持？',
    ['点击劫持', 'X-Frame-Options', 'frame-ancestors', 'CSP'], '3-5 分钟', '中频',
    '请比较两种响应头的作用和优先级。',
    `X-Frame-Options: DENY 禁止任何框架嵌入；SAMEORIGIN 只允许同源。CSP frame-ancestors 更灵活，支持指定允许嵌入的源，如 'self' https://example.com。

现代推荐 frame-ancestors，若浏览器不支持 CSP 可保留 X-Frame-Options 作为降级。`,
    [['DENY/SAMEORIGIN', '40%', 'X-Frame-Options 取值'], ['frame-ancestors', '40%', 'CSP 灵活配置'], ['优先级', '20%', 'CSP 优先']],
    ['仅使用 JS frame-busting 防御',
     'X-Frame-Options 设置为 ALLOW-FROM 多个域名',
     'frame-ancestors 配置为 * 导致失效'],
    'X-Frame-Options 和 CSP frame-ancestors 限制页面被嵌入 iframe，frame-ancestors 更灵活，推荐两者结合。'),
  Q('CO', 'A', '什么是 HSTS？它如何防御 SSL 剥离攻击？',
    ['HSTS', 'HTTPS', 'SSL 剥离', '安全头'], '3-5 分钟', '中频',
    '请说明 HSTS 头字段、preload 列表和降级风险。',
    `HSTS（HTTP Strict Transport Security）通过响应头 Strict-Transport-Security 告诉浏览器未来一段时间内必须通过 HTTPS 访问该域名，浏览器会自动把 HTTP 请求重定向为 HTTPS，从而防御中间人 SSL 剥离攻击。

可提交到 HSTS preload 列表实现首次访问即 HTTPS。`,
    [['头字段', '30%', 'max-age、includeSubDomains、preload'], ['防御原理', '40%', '强制 HTTPS 阻止明文访问'], ['风险', '30%', '配置错误导致子域不可用']],
    ['HSTS 不设置 includeSubDomains 导致子域仍可被降级',
     '未提交 preload 列表时首次访问仍可能受攻击',
     'max-age 设置过短导致保护失效'],
    'HSTS 强制浏览器使用 HTTPS 访问域名，防御 SSL 剥离，可配合 preload 列表。'),
  Q('CO', 'A', 'Subresource Integrity（SRI）的原理和使用方式',
    ['SRI', '完整性校验', 'CDN', '安全'], '3-5 分钟', '中频',
    '请说明 integrity 属性和浏览器如何校验资源哈希。',
    `SRI 通过给 script/link 标签添加 integrity 属性指定资源哈希，浏览器下载资源后计算哈希并比对，不匹配则拒绝执行或加载，防止 CDN/服务器被篡改导致恶意代码执行。

    <script src="https://cdn.com/lib.js"
      integrity="sha384-..."
      crossorigin="anonymous"></script>`,
    [['integrity 格式', '40%', 'algo-base64hash'], ['校验流程', '30%', '下载后计算哈希比对'], ['crossorigin', '30%', '需要 CORS']],
    ['integrity 值使用 MD5 而非 SHA-384/SHA-256',
     'CDN 资源没有 CORS 头却使用 SRI',
     '资源更新后未同步更新 integrity 导致加载失败'],
    'SRI 通过 integrity 属性校验外部资源哈希，防止 CDN 投毒，需配合 crossorigin 使用。'),
  Q('CO', 'A', '如何安全地集成第三方脚本和 iframe？',
    ['第三方脚本', 'iframe', 'CSP', 'SRI', 'sandbox'], '5-8 分钟', '中频',
    '请从来源控制、权限隔离、监控审计等角度说明。',
    `第三方脚本：使用 SRI 校验、CSP script-src 白名单、子资源域名限制、延迟加载、监控加载失败。iframe：设置 sandbox 属性限制权限，按需允许 allow-scripts/allow-same-origin；使用 referrerpolicy/credentialless 减少信息泄露。

定期审计第三方脚本变更和权限。`,
    [['脚本校验', '30%', 'SRI、CSP'], ['iframe 隔离', '40%', 'sandbox、allow 属性'], ['监控审计', '30%', '加载监控、权限复查']],
    ['直接引入第三方脚本不做任何限制',
     'iframe sandbox 同时允许 scripts 和 same-origin 导致隔离失效',
     '第三方脚本加载失败时无降级方案'],
    '第三方脚本应使用 SRI 和 CSP 限制，iframe 应使用 sandbox 和 allow 控制权限，并定期审计。'),
  Q('CO', 'A', '什么是凭证填充攻击（Credential Stuffing）？前端能做什么？',
    ['Credential Stuffing', '撞库', '登录安全', '验证码'], '3-5 分钟', '中频',
    '请解释撞库攻击原理及前端防御措施。',
    `攻击者使用泄露的用户名/密码批量尝试登录。前端可通过：限制登录频率、图形/行为验证码、锁定账户一段时间、检测异常设备和地理位置、提示用户使用强密码和唯一密码。

前端措施可缓解但无法根除，核心防御在服务端。`,
    [['攻击原理', '40%', '泄露凭据批量尝试'], ['前端缓解', '40%', '验证码、频率限制、锁定'], ['用户教育', '20%', '强密码、唯一密码']],
    ['仅依赖前端限制就能完全防御撞库',
     '限制策略过严影响正常用户',
     '泄露凭据不强制用户修改密码'],
    '凭证填充攻击使用泄露凭据批量登录，前端可配合验证码、频率限制和账户锁定缓解。'),
  Q('CO', 'A', 'JSONP 有哪些安全风险？',
    ['JSONP', 'XSS', 'CSRF', '跨域'], '3-5 分钟', '中频',
    '请说明 JSONP 在 CSRF、XSS 和敏感数据泄露方面的风险。',
    `JSONP 把响应作为 JS 执行，若服务端未校验 callback 参数，可能触发 XSS；script 标签请求会自动携带 Cookie，导致 CSRF；返回数据可能被任意网站通过动态 script 读取，造成敏感信息泄露。

现代项目优先使用 CORS，避免新增 JSONP 接口。`,
    [['XSS', '30%', 'callback 参数未过滤'], ['CSRF', '30%', '自动携带 Cookie'], ['数据泄露', '30%', '任意网站可读取'], ['替代', '10%', 'CORS']],
    ['认为 JSONP 请求不会携带 Cookie',
     'callback 参数直接拼接到响应中不做转义',
     '把 JSONP 作为新接口首选方案'],
    'JSONP 存在 XSS、CSRF 和数据泄露风险，现代项目应使用 CORS 替代。'),
  Q('CO', 'A', '前端敏感日志如何脱敏？',
    ['日志脱敏', '隐私', '安全', 'PII'], '3-5 分钟', '中频',
    '请说明前端日志中哪些字段需要脱敏及常用方法。',
    `需脱敏字段：手机号、身份证号、银行卡号、Token、密码、经纬度、设备 ID。方法：部分掩码、哈希化、替换为占位符、正则匹配替换、分级采样。

    function maskPhone(phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }`,
    [['敏感字段', '40%', 'PII、凭证、位置'], ['脱敏方法', '40%', '掩码、哈希、替换'], ['日志策略', '20%', '分级采样与保留期限']],
    ['前端日志明文记录用户 Token',
     '只在服务端脱敏，前端原样上报',
     '脱敏正则不完善导致部分敏感信息泄露'],
    '前端日志应对手机号、证件号、Token 等敏感信息脱敏，方法包括掩码、哈希和替换。'),
  Q('SE', 'A', '什么是 IDOR（不安全的直接对象引用）？前端如何参与防御？',
    ['IDOR', '越权', '访问控制', '安全'], '3-5 分钟', '中频',
    '请解释 IDOR 原理及前端防御配合。',
    `IDOR 指攻击者通过修改 URL/参数中的对象 ID 访问其他用户数据。前端不应依赖隐藏字段或前端路由保护资源，应在服务端校验用户是否有权访问该 ID；前端可限制用户修改 ID、使用 UUID 替代自增 ID、敏感操作二次确认。

    // 不要在前端暴露内部自增 ID
    const orderId = 'ord_' + uuid;`,
    [['原理', '40%', '修改 ID 越权访问'], ['服务端校验', '30%', '权限控制是根本'], ['前端配合', '30%', '不暴露内部 ID、二次确认']],
    ['认为前端隐藏 ID 就能防止越权',
     '使用自增 ID 暴露数据规模',
     '敏感操作没有二次身份验证'],
    'IDOR 通过篡改对象 ID 越权访问，服务端必须校验权限，前端应避免暴露内部自增 ID。'),
  Q('SE', 'A', '什么是路径遍历攻击？前端如何参与防御？',
    ['路径遍历', '目录穿越', '文件上传', '安全'], '3-5 分钟', '中频',
    '请解释路径遍历原理及前端在文件路径场景中的配合。',
    `路径遍历指通过 ../ 等序列访问服务端非授权文件。前端在文件上传、下载、导出场景应避免把用户输入直接拼接到路径；限制文件名字符、使用白名单扩展名、文件 ID 映射而非真实路径。

    // 不推荐
    fetch('/download?file=' + userInput)
    // 推荐
    fetch('/download?id=' + fileId)`,
    [['原理', '40%', '../ 穿越目录'], ['前端校验', '30%', '文件名白名单、ID 映射'], ['服务端', '30%', '路径规范化、沙箱存储']],
    ['前端直接把用户输入拼接到下载路径',
     '仅依赖前端过滤文件名',
     '文件存储使用用户可控路径'],
    '路径遍历通过 ../ 访问非授权文件，前端应使用 ID 映射、限制文件名，服务端做路径规范化。'),
  Q('SE', 'P', 'OAuth 2.0 隐式授权模式有什么问题？PKCE 如何解决？',
    ['OAuth', 'PKCE', '隐式授权', '安全'], '5-8 分钟', '中频',
    '请说明隐式授权在公网客户端的风险及 PKCE 流程。',
    `隐式授权把 access_token 通过 URL fragment 返回，可被浏览器历史、Referer、恶意脚本窃取，且不支持 refresh token。PKCE 在授权码流程中增加 code_verifier 和 code_challenge，防止授权码被拦截后兑换 token。

所有公网客户端（包括 SPA）都应使用带 PKCE 的授权码模式。`,
    [['隐式授权风险', '40%', 'token 泄露、历史记录'], ['PKCE 流程', '40%', 'code_challenge/verifier'], ['推荐模式', '20%', '授权码 + PKCE']],
    ['SPA 使用隐式授权模式',
     'PKCE 的 code_verifier 保存在可被读取的 localStorage',
     '认为后端应用才需要 PKCE'],
    'OAuth 隐式授权存在 token 泄露风险，SPA 应使用带 PKCE 的授权码模式。'),
  Q('SE', 'P', '什么是刷新令牌轮换（Refresh Token Rotation）？',
    ['Refresh Token', '轮换', 'OAuth', '安全'], '3-5 分钟', '中频',
    '请解释刷新令牌被窃取的风险及轮换机制。',
    `刷新令牌长期有效，窃取后可长期冒充用户。Refresh Token Rotation 每次使用 refresh token 获取新 access token 时同时颁发新的 refresh token，旧 token 失效。检测到旧 token 被重放时（reuse detection）可撤销用户所有令牌。

    access_token, refresh_token = rotate(old_refresh_token)`,
    [['风险', '30%', '长期 token 泄露'], ['轮换', '40%', '每次刷新更换 token'], ['重放检测', '30%', '发现窃取并撤销']],
    ['刷新令牌固定不变',
     '将 refresh token 存 localStorage 增加泄露面',
     '没有重放检测机制，轮换效果大打折扣'],
    '刷新令牌轮换每次刷新时更换 refresh token，并检测重放，降低长期 token 泄露风险。'),
  Q('SE', 'P', 'CSP 的 script-src、style-src、img-src 等指令如何配置？',
    ['CSP', 'script-src', 'style-src', '安全头'], '5-8 分钟', '中频',
    '请说明各资源指令的作用和常见取值。',
    `script-src 控制 JS 来源，可设 'self'、'unsafe-inline'、'unsafe-eval'、nonce/hash、指定域名。style-src 控制样式来源。img-src 控制图片。default-src 作为其他指令默认值。

推荐：禁用 'unsafe-inline' 和 'unsafe-eval'，使用 nonce 或哈希允许内联脚本；生产环境启用 report-uri/report-to 收集违规报告。`,
    [['script-src', '40%', 'JS 来源与 nonce/hash'], ['style-src/img-src', '30%', '样式与图片限制'], ['default-src/report', '30%', '默认策略与报告']],
    ['CSP 设置为 default-src * 导致完全失效',
     '大量使用 \'unsafe-inline\' 而不使用 nonce',
     '没有收集 CSP 违规报告，无法发现配置问题'],
    'CSP 通过 script-src、style-src、img-src 等指令限制资源来源，推荐禁用 unsafe-inline/eval 并使用 nonce 或哈希。'),
  Q('SE', 'P', '如何防御 DOM Clobbering 攻击？',
    ['DOM Clobbering', 'XSS', '原型污染', '安全'], '5-8 分钟', '中频',
    '请解释 DOM Clobbering 原理及防御方法。',
    `DOM Clobbering 利用 HTML 元素 id/name 会映射为 window/global 对象属性的特性，覆盖脚本依赖的全局变量，从而绕过安全检查或触发恶意代码。防御：避免用全局变量做安全配置；使用 Object.hasOwn 判断属性来源；使用 const/let 声明局部变量；对第三方 HTML 严格过滤；使用 Trusted Types。

    if (window.config && Object.hasOwn(window, 'config')) { ... }`,
    [['原理', '40%', 'id/name 覆盖全局属性'], ['防御', '40%', '局部变量、hasOwn、Trusted Types'], ['过滤', '20%', '不可信 HTML 清理']],
    ['用全局变量存储安全白名单',
     '检查属性存在但未判断是否为 DOM 元素注入',
     '认为只有 innerHTML 才会导致 XSS'],
    'DOM Clobbering 通过 DOM 元素 id/name 覆盖全局属性，防御需避免全局安全配置、使用 hasOwn 和 Trusted Types。'),
  Q('SE', 'P', '前端密钥管理有哪些原则和最佳实践？',
    ['密钥管理', '加密', '前端安全', '环境变量'], '5-8 分钟', '中频',
    '请说明哪些密钥不应放在前端，以及如何管理必要的客户端凭证。',
    `原则：服务端私钥、数据库密码、支付密钥绝不应放在前端。必要客户端凭证（如 API key、公钥）应：限制作用域、按环境注入、使用构建时加密或混淆但不依赖其保密、配合服务端鉴权、定期轮换。

浏览器中任何字符串都可被用户获取，不要把机密当成隐私。`,
    [['不在前端存放', '40%', '私钥和敏感密钥'], ['作用域限制', '30%', 'API key 仅允许特定接口和域名'], ['轮换', '30%', '定期更换与监控']],
    ['把支付私钥放在前端代码',
     '认为 webpack 混淆能保护密钥',
     'API key 无服务端校验直接操作核心资源'],
    '前端不应存放服务端私钥，必要客户端凭证需限制作用域、按环境注入、定期轮换并配合服务端鉴权。'),
  Q('SE', 'P', 'Secure Cookie 与 SameSite=None 的兼容处理',
    ['Cookie', 'SameSite', 'Secure', '跨站'], '3-5 分钟', '中频',
    '请说明现代浏览器对 SameSite=None 的要求及旧浏览器兼容问题。',
    `Chrome 等现代浏览器要求 SameSite=None 的 Cookie 必须同时设置 Secure，否则会被拒绝。部分旧浏览器可能把 SameSite=None 当作 SameSite=Strict，导致跨站请求不带 Cookie。

兼容方案：User-Agent 检测，对已知不兼容浏览器不设置 SameSite 或设置 SameSite=（空字符串）。`,
    [['现代要求', '40%', 'SameSite=None 必须 Secure'], ['旧浏览器', '30%', '解析为 Strict 的问题'], ['兼容方案', '30%', 'UA 检测与降级']],
    ['SameSite=None 未设置 Secure',
     '对所有浏览器都发送 SameSite=None',
     '忽略第三方 Cookie 逐步淘汰趋势'],
    'SameSite=None 必须配合 Secure，旧浏览器可能解析异常，需按 User-Agent 做兼容降级。'),
  Q('SE', 'P', '什么是 Trusted Types？如何缓解 DOM XSS？',
    ['Trusted Types', 'DOM XSS', 'CSP', '安全'], '5-8 分钟', '中频',
    '请解释 Trusted Types API 的原理和使用方式。',
    `Trusted Types 要求 DOM 注入 API（innerHTML、eval、script.src 等）只接受特定策略创建的受信对象，而非原始字符串。结合 CSP require-trusted-types-for 'script' 强制使用，可从源头阻止 DOM XSS。

    const policy = trustedTypes.createPolicy('default', {
      createHTML: (s) => DOMPurify.sanitize(s)
    });
    el.innerHTML = policy.createHTML(userInput);`,
    [['策略', '40%', 'createHTML/createScriptURL'], ['CSP 强制', '30%', 'require-trusted-types-for'], ['DOM 注入点', '30%', 'innerHTML/eval/script.src']],
    ['Trusted Types 策略未做输入清理',
     'CSP 未强制 require-trusted-types-for',
     '认为 Trusted Types 可替代所有 XSS 防御'],
    'Trusted Types 要求 DOM 注入只接受受信对象，配合 CSP 强制可显著缓解 DOM XSS。'),
  Q('SE', 'P', '如何对富文本进行安全过滤？',
    ['富文本', 'XSS', 'DOMPurify', '过滤'], '5-8 分钟', '中频',
    '请说明富文本过滤的原则、工具和常见绕过。',
    `原则：使用成熟库（DOMPurify）而非手写正则；采用白名单标签/属性/协议；过滤事件处理器、javascript:、data:、SVG script；对输出再次按上下文转义；配置 CSP 兜底。

常见绕过：HTML 实体编码、大小写、命名空间混淆、SVG/math 中的 script。`,
    [['白名单', '40%', '允许的标签和属性'], ['成熟库', '30%', 'DOMPurify 等'], ['绕过', '30%', '实体编码、SVG script']],
    ['用正则表达式过滤 HTML',
     '允许任意 style 属性导致 mXSS',
     '过滤后输出到 textarea 等仍按 HTML 解析的上下文'],
    '富文本过滤应使用白名单和成熟库，过滤危险标签、属性和协议，注意 HTML 实体和 SVG 等绕过方式。'),
  Q('SE', 'R', '如何建立企业级前端安全运营指标体系？',
    ['安全运营', '指标', 'SOC', '前端安全'], '8-12 分钟', '低频',
    '请设计一套可度量前端安全成熟度与运营效果的指标体系。',
    `指标体系：

1. 漏洞类：XSS/CSRF/注入漏洞数量、严重等级、修复时长。
2. 配置类：HTTPS/HSTS/CSP/SRI 覆盖率、Header 合规率。
3. 依赖类：已知漏洞组件数量、漏洞修复周期。
4. 事件类：CSP 违规数、钓鱼/仿冒站点数、安全事件响应时间。
5. 流程类：SDL 参与度、安全培训覆盖率、代码审计率。

通过看板持续跟踪并驱动改进。`,
    [['漏洞指标', '30%', '数量、等级、修复时长'], ['配置指标', '30%', '安全头与 HTTPS 覆盖'], ['运营流程', '40%', 'SDL、培训、响应']],
    ['只统计漏洞数量，忽略修复时长',
     '指标无法关联业务风险',
     '缺少持续监控导致指标流于形式'],
    '前端安全运营指标应覆盖漏洞、配置、依赖、事件和流程，通过看板持续度量与改进。'),
  Q('SE', 'R', '如何在团队内建立前端安全红蓝演练机制？',
    ['红蓝演练', '安全测试', 'SDL', '团队'], '8-12 分钟', '低频',
    '请说明演练目标、组织方式和成果闭环。',
    `目标：模拟真实攻击发现前端漏洞，验证防御和响应流程。组织：蓝队负责防御（代码、配置、监控），红队负责攻击（XSS、CSRF、供应链、社工）。周期：每季度一次，覆盖核心链路。

成果：漏洞清单、修复方案、知识沉淀、安全用例补充到 CI。`,
    [['目标', '30%', '发现漏洞与验证响应'], ['组织', '30%', '红蓝角色与范围'], ['闭环', '40%', '修复、沉淀、CI 集成']],
    ['演练变成单兵作战，缺少跨团队协作',
     '只找漏洞不修复',
     '未将发现的问题转化为自动化检测规则'],
    '前端安全红蓝演练通过模拟攻击验证防御能力，成果需修复、沉淀并转化为自动化检测。'),
  Q('SE', 'R', '零信任视角下如何实现前端持续认证与设备绑定？',
    ['零信任', '持续认证', '设备绑定', '安全架构'], '10-15 分钟', '低频',
    '请设计一个不信任任何位置、持续验证的前端认证方案。',
    `原则：永不信任，始终验证。实现：短有效期 access token + 刷新令牌轮换；设备指纹绑定；行为生物特征（鼠标、键盘）风险评分；敏感操作二次认证（MFA）；上下文变化（IP、设备、位置）触发重新认证；会话异常自动吊销。

前端负责安全采集设备上下文、安全存储 token、配合 MFA 流程。`,
    [['短周期凭证', '30%', 'token 有效期与轮换'], ['设备指纹', '30%', '绑定与识别异常'], ['持续评估', '40%', '行为风险与 MFA']],
    ['长有效期 token 即零信任',
     '设备指纹容易被伪造但未做服务端校验',
     '频繁重新认证严重影响用户体验'],
    '零信任前端认证需要短有效期 token、设备绑定、行为风险评分和 MFA，持续验证用户与设备上下文。'),
  Q('SE', 'A', 'CSP Report-Only 模式有什么用？',
    ['CSP', 'Report-Only', '安全头', '策略部署'], '3-5 分钟', '中频',
    '请说明 Content-Security-Policy-Report-Only 与强制执行模式的区别。',
    `Report-Only 模式不会阻止违规资源加载，只向 report-uri/report-to 上报违规信息，用于在正式启用 CSP 前评估策略影响、发现内联脚本/外部资源依赖，避免直接启用导致功能损坏。

建议：先 report-only 收集数据，修复后再启用 enforce 模式。`,
    [['模式差异', '40%', '阻止 vs 仅报告'], ['用途', '30%', '策略评估与影响发现'], ['过渡流程', '30%', 'report-only 到 enforce']],
    ['长期停留在 report-only 不启用 enforce',
     '未配置 report-uri 导致无法收集报告',
     'report-only 阶段不处理上报的违规'],
    'CSP Report-Only 只报告不阻止，适合在正式启用前评估策略影响并修复违规。'),
  Q('CO', 'A', '什么是 DOM Invader？它如何帮助前端安全测试？',
    ['DOM Invader', 'Burp Suite', 'DOM XSS', '安全测试'], '3-5 分钟', '低频',
    '请介绍 Burp Suite DOM Invader 插件的功能和使用场景。',
    `DOM Invader 是 Burp Suite 的浏览器扩展，用于检测 DOM XSS 漏洞。它可自动扫描页面中的 source 和 sink，注入 canary 标记，追踪不可信数据从输入到危险 DOM 操作的完整链路，帮助定位漏洞点。

适用于测试大量使用 innerHTML、eval、document.write 的 SPA。`,
    [['功能', '40%', 'source/sink 扫描与追踪'], ['canary', '30%', '注入标记定位漏洞'], ['场景', '30%', 'DOM XSS 自动化测试']],
    ['把 DOM Invader 当成后端漏洞扫描器',
     '忽略手动验证扫描结果',
     '认为无 alert 弹窗即无 DOM XSS'],
    'DOM Invader 是 Burp Suite 的 DOM XSS 检测工具，通过 canary 追踪 source 到 sink 的链路。'),
  Q('SE', 'P', 'npm 恶意包有哪些典型攻击手法与防御？',
    ['供应链', 'npm', '恶意包', '安全'], '5-8 分钟', '中频',
    '请说明 npm 供应链攻击常见手法及企业防御策略。',
    `手法：typosquatting（拼写相似包）、依赖混淆、postinstall 脚本执行恶意代码、窃取环境变量、挖矿、上传包含漏洞的旧版本。

防御：私有仓库、依赖锁定、SCA 扫描（Snyk/Dependabot）、审查 postinstall 脚本、最小权限安装、网络隔离、定期审计。`,
    [['攻击手法', '40%', 'typosquatting、混淆、postinstall'], ['扫描', '30%', 'SCA 与漏洞库'], ['流程', '30%', '私有仓库、锁定、审计']],
    ['安装依赖时不看包名和下载量',
     '忽略 package-lock 变更直接提交',
     '允许 npm 脚本以 root 权限执行'],
    'npm 恶意包常用手法包括拼写混淆、依赖混淆和 postinstall 脚本，防御需私有仓库、锁定、SCA 扫描和审计。'),
  Q('CO', 'A', '什么是 Web Inject 技术？',
    ['Web Inject', '银行木马', '中间人', '安全'], '3-5 分钟', '低频',
    '请解释 Web Inject 在恶意软件中的作用。',
    `Web Inject 是银行木马等恶意软件在浏览器层面注入或修改网页内容的技术，通常在受害者设备上通过浏览器扩展、DLL 注入、代理篡改等方式，向合法银行页面添加额外字段或替换转账目标，实施欺诈。

防御：设备安全、反病毒、HTTPS 证书锁定、异常行为检测。`,
    [['注入位置', '40%', '浏览器扩展、DLL、代理'], ['目的', '30%', '篡改页面实施欺诈'], ['防御', '30%', '终端安全与行为检测']],
    ['认为 HTTPS 能完全防御 Web Inject',
     '把 Web Inject 和普通 XSS 混为一谈',
     '忽略终端被攻破后的浏览器层攻击'],
    'Web Inject 是恶意软件在浏览器层修改网页内容的技术，防御依赖终端安全和异常行为检测。'),
  Q('SE', 'A', '如何防止用户凭证被自动填充到钓鱼页面？',
    ['钓鱼', '自动填充', '密码管理器', '安全'], '3-5 分钟', '中频',
    '请说明浏览器自动填充机制和前端降低风险的措施。',
    `浏览器密码管理器根据域名匹配自动填充。钓鱼页面通过相似域名或 iframe 诱骗填充。前端措施：对敏感表单设置 autocomplete="off" 或 "new-password"、不使用 iframe 嵌套登录、启用 CSP frame-ancestors 防止被嵌入钓鱼站点、使用 WebAuthn/Passkeys 减少密码依赖。

根本上用户需识别域名，企业可做域名监控。`,
    [['自动填充机制', '30%', '域名匹配'], ['前端措施', '40%', 'autocomplete、CSP、iframe 限制'], ['替代方案', '30%', 'Passkeys 减少密码']],
    ['依赖 autocomplete="off" 完全阻止密码管理器',
     '登录页允许被任意站点 iframe 嵌入',
     '忽略用户教育和域名监控'],
    '防止凭证自动填充到钓鱼页需设置 autocomplete、限制 iframe 嵌入、推广 Passkeys，并监控相似域名。'),
  Q('SE', 'P', '如何安全地实现前端端到端加密（E2EE）？',
    ['E2EE', '加密', 'WebCrypto', '密钥管理'], '8-12 分钟', '低频',
    '请说明前端 E2EE 的密钥生成、分发、存储和加密流程。',
    `E2EE 保证只有通信双方能读取消息。前端使用 WebCrypto API 生成非对称密钥对，私钥本地安全存储（如 IndexedDB 或硬件模块），公钥通过可信渠道交换。消息用对称密钥加密，对称密钥用接收方公钥加密后随消息发送。

注意：密钥派生、随机数、认证加密（AES-GCM）、前向保密、密钥轮换。`,
    [['密钥生成', '30%', 'WebCrypto 与随机源'], ['密钥分发', '30%', '公钥可信交换'], ['存储安全', '20%', '私钥本地保护'], ['算法', '20%', '认证加密与密钥轮换']],
    ['私钥明文存在 localStorage',
     '使用自定义加密算法或 ECB 模式',
     '忽略公钥真实性验证导致中间人攻击'],
    '前端 E2EE 需用 WebCrypto 生成密钥对，私钥本地安全存储，公钥可信交换，使用认证加密并定期轮换密钥。'),
];

const htmlCssSpecs = [
  Q('CO', 'B', 'DOCTYPE 的作用是什么？省略它会发生什么？',
    ['DOCTYPE', '渲染模式', 'HTML', '怪异模式'], '2-3 分钟', '高频',
    '请解释 DOCTYPE 如何影响浏览器渲染模式。',
    `DOCTYPE 声明告诉浏览器使用哪种 HTML 版本和渲染模式。标准模式（ Standards Mode）按 W3C 规范解析；省略或错误 DOCTYPE 会触发怪异模式（Quirks Mode），导致盒模型、布局等表现不一致。

    <!DOCTYPE html>`,
    [['声明作用', '50%', '指定渲染模式'], ['标准模式', '25%', '按规范解析'], ['怪异模式', '25%', '旧布局兼容性表现']],
    ['认为 DOCTYPE 是 HTML 标签的一部分',
     '省略 DOCTYPE 后只在旧 IE 出问题',
     '使用 HTML4 过渡 DOCTYPE 导致怪异模式'],
    'DOCTYPE 声明决定浏览器使用标准模式还是怪异模式，HTML5 使用 <!DOCTYPE html>。'),
  Q('CO', 'B', 'HTML5 新增了哪些结构化标签？',
    ['HTML5', '语义化', 'header', 'main', 'article'], '3-5 分钟', '高频',
    '请列举并说明 header、nav、main、article、section、aside、footer 的语义。',
    `header：页面或区块的头部。nav：导航链接组。main：文档主要内容，每个页面应唯一。article：独立完整的内容块。section：文档中的节。aside：辅助内容。footer：页面或区块的底部。

使用语义化标签提升可访问性、SEO 和代码可读性。`,
    [['标签语义', '60%', '各标签用途'], ['main 唯一性', '20%', '每页一个 main'], ['可访问性', '20%', '屏幕阅读器地标']],
    ['把所有内容都用 div',
     '一个页面出现多个 main',
     '用 section 代替 div 做纯样式容器'],
    'HTML5 语义化标签如 header、nav、main、article、section、aside、footer 提升结构、可访问性和 SEO。'),
  Q('CO', 'B', 'meta viewport 有哪些常见属性及作用？',
    ['viewport', '移动端', '响应式', 'meta'], '3-5 分钟', '高频',
    '请写出标准 viewport 设置并解释 width、initial-scale、maximum-scale、user-scalable。',
    `标准设置：

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

width：视口宽度，device-width 表示设备宽度。initial-scale：初始缩放比例。maximum-scale/minimum-scale：最大/最小缩放。user-scalable：是否允许用户缩放（设为 no 影响可访问性）。`,
    [['width', '30%', '视口宽度'], ['initial-scale', '30%', '初始缩放'], ['缩放限制', '20%', 'max/min scale'], ['可访问性', '20%', 'user-scalable=no 的问题']],
    ['缺少 viewport 导致移动端页面被缩放',
     'user-scalable=no 导致视力障碍用户无法缩放',
     'width 写成固定像素值导致不同设备显示异常'],
    'meta viewport 控制移动端视口和缩放，推荐 width=device-width, initial-scale=1，避免禁用缩放。'),
  Q('CO', 'A', '什么是重排（Reflow）、重绘（Repaint）和合成（Composite）？',
    ['重排', '重绘', '合成', '渲染'], '5-8 分钟', '高频',
    '请说明三者的触发条件及性能开销。',
    `重排：几何属性变化导致重新计算布局（如 width、margin、offset）。重绘：外观变化但不影响布局（如 color、background）。合成：仅合成层变化，不触发主线程布局/绘制（如 transform、opacity）。

开销：重排 > 重绘 > 合成。`,
    [['重排', '40%', '几何属性变化'], ['重绘', '30%', '外观属性变化'], ['合成', '30%', '合成层属性变化']],
    ['认为所有 CSS 属性修改都触发重排',
     '把 transform 动画和 top/left 动画性能等同',
     '忽略读取 offsetHeight 后立即修改样式导致的强制同步布局'],
    '重排影响布局，重绘影响外观，合成只在合成层处理；性能开销重排最大，合成最小。'),
  Q('CO', 'A', '如何减少重排和重绘？',
    ['重排', '重绘', '性能优化', 'CSS'], '5-8 分钟', '高频',
    '请给出具体的前端优化手段。',
    `1) 批量修改样式：使用 className 或 cssText 一次性应用。2) 读写分离：先批量读取布局属性，再批量修改。3) 使用 transform/opacity 做动画。4) 对频繁变化的元素使用 will-change 提升为合成层。5) 避免在滚动中读取布局属性。6) 使用 DocumentFragment 批量操作 DOM。`,
    [['批量修改', '25%', 'className/cssText'], ['读写分离', '25%', '避免强制同步布局'], ['动画优化', '25%', 'transform/opacity'], ['DOM 批量操作', '25%', 'DocumentFragment']],
    ['逐个修改元素样式',
     '在循环中交替读取 offsetHeight 和设置样式',
     '对所有元素滥用 will-change，占用 GPU 内存'],
    '减少重排重绘的方法包括批量修改样式、读写分离、使用 transform/opacity 动画、批量 DOM 操作。'),
  Q('CO', 'A', 'CSS 层叠与继承如何工作？',
    ['层叠', '继承', '优先级', 'CSS'], '3-5 分钟', '高频',
    '请解释层叠顺序、继承属性和 initial/inherit/unset/revert 关键字。',
    `层叠按来源（浏览器、用户、作者）、选择器特殊性和源码顺序决定最终样式。继承属性如 color、font-family 会自动继承父元素；非继承属性如 margin 不会。

    color: inherit;   // 继承父值
    margin: initial;  // 重置为默认值
    all: unset;       // 继承属性继承，非继承重置为默认
    all: revert;      // 回退到上一层级默认值`,
    [['层叠来源', '30%', '浏览器/用户/作者'], ['特殊性', '30%', '选择器权重'], ['继承', '20%', '继承属性列表'], ['关键字', '20%', 'initial/inherit/unset/revert']],
    ['认为所有 CSS 属性都继承',
     '用 !important 解决所有优先级问题',
     '混淆 unset 和 revert 的行为'],
    'CSS 层叠由来源、选择器权重和源码顺序决定；继承属性自动继承，关键字 initial/inherit/unset/revert 用于重置。'),
  Q('CO', 'A', 'CSS 的 :is()、:where()、:has() 伪类有什么作用？',
    ['CSS 选择器', 'is', 'where', 'has'], '3-5 分钟', '中频',
    '请说明三个伪类的语法、优先级差异和典型场景。',
    `:is() 接受选择器列表，匹配任一，优先级由列表中最高特殊性决定。:where() 与 :is() 类似，但优先级为 0。:has() 选择包含符合某条件子元素的父元素。

    :is(h1, h2, h3) a { color: red; }
    :where(.nav, .sidebar) a { color: blue; }
    article:has(img) { display: flex; }`,
    [['is', '30%', '匹配任一与优先级'], ['where', '30%', '零优先级'], ['has', '30%', '父元素选择'], ['兼容性', '10%', 'has 较新']],
    [':where 和 :is 优先级混淆',
     ':has 内写入复杂选择器导致性能问题',
     '在需要父元素选择时仍用 JS 监听'],
    ':is 匹配任一选择器并保留高优先级，:where 零优先级，:has 选择包含特定子元素的父元素。'),
  Q('CO', 'A', 'CSS 隔离方案有哪些？如何选型？',
    ['CSS 隔离', 'BEM', 'CSS Modules', 'Shadow DOM', 'Scoped'], '5-8 分钟', '高频',
    '请比较 BEM、CSS Modules、Shadow DOM、Scoped CSS、CSS-in-JS 的隔离方式。',
    `BEM：命名约定隔离，简单但靠约定。CSS Modules：构建时生成局部类名。Scoped CSS（Vue）：属性选择器限定作用域。Shadow DOM：原生封装，样式完全隔离。CSS-in-JS：运行时生成唯一类名。

选型：简单项目用 BEM；组件库/框架用 CSS Modules 或 CSS-in-JS；需要真正封装用 Shadow DOM。`,
    [['BEM', '20%', '命名约定'], ['CSS Modules', '20%', '构建时局部类名'], ['Shadow DOM', '20%', '原生隔离'], ['CSS-in-JS', '20%', '运行时唯一类名'], ['选型', '20%', '根据项目规模']],
    ['所有项目都强制使用 Shadow DOM，忽略可访问性和样式继承问题',
     'BEM 命名不规范导致冲突',
     'CSS Modules 和全局样式混用未处理'],
    'CSS 隔离可通过 BEM、CSS Modules、Scoped CSS、Shadow DOM、CSS-in-JS 实现，按封装需求和项目规模选型。'),
  Q('CO', 'A', 'CSS 的 contain 属性有什么作用？',
    ['contain', '布局边界', '渲染优化', 'CSS'], '3-5 分钟', '中频',
    '请说明 layout/paint/size/style 各值的含义和性能影响。',
    `contain 限制元素的子树影响范围，使浏览器可优化渲染。

- layout：子元素布局不影响外部。
- paint：子元素绘制不溢出到外部。
- size：元素尺寸不依赖子元素。
- style：counter/quote 不影响外部。
- strict：同时包含 layout paint size。
- content：layout paint style。

配合 content-visibility 可进一步优化离屏内容。`,
    [['各值含义', '50%', 'layout/paint/size/style'], ['优化效果', '30%', '减少重排重绘范围'], ['副作用', '20%', '可能产生包含块']],
    ['对所有元素使用 contain: strict',
     '使用 contain: size 但元素尺寸依赖子元素',
     '不理解 contain 会改变包含块和定位上下文'],
    'CSS contain 限制子树影响范围，取值 layout/paint/size/style，可减少重排重绘范围，但要注意副作用。'),
  Q('CO', 'A', '如何实现单行文本溢出省略与多行溢出省略？',
    ['文本溢出', 'ellipsis', 'CSS'], '3-5 分钟', '高频',
    '请给出单行和多行文本溢出省略的 CSS 方案。',
    `单行：

    .single {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

多行（WebKit 兼容方案）：

    .multi {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }`,
    [['单行方案', '40%', 'white-space/overflow/text-overflow'], ['多行方案', '40%', '-webkit-line-clamp'], ['可访问性', '20%', 'title 属性或完整文本']],
    ['多行省略使用 JavaScript 计算导致性能差',
     '忽略容器需要固定宽度或 max-width',
     '省略后没有提供查看完整文本的方式'],
    '单行省略用 white-space/overflow/text-overflow；多行用 -webkit-line-clamp。注意提供完整文本访问。'),
  Q('CO', 'P', 'CSS Houdini 是什么？Paint API 能做什么？',
    ['CSS Houdini', 'Paint API', 'CSS 扩展', 'Typed OM'], '5-8 分钟', '低频',
    '请介绍 CSS Houdini 的组成和 Paint API 的使用方式。',
    `CSS Houdini 是一组 API，允许开发者扩展 CSS 渲染引擎，包括 Paint API、Layout API、Animation API、Properties & Values API、Typed OM 等。Paint API 让开发者用 Canvas 2D 自定义 background-image、border-image 等。

    CSS.paintWorklet.addModule('sparkle.js');
    .box { background-image: paint(sparkle); }`,
    [['组成', '40%', 'Paint/Layout/Animation/Typed OM'], ['Paint API', '40%', '自定义绘制'], ['应用', '20%', '复杂背景、边框效果']],
    ['把 Houdini 当作普通 CSS 特性在所有浏览器使用',
     'Paint API 中访问 DOM 导致性能问题',
     '混淆 Paint API 和 Canvas 元素'],
    'CSS Houdini 是扩展 CSS 渲染引擎的 API 集合，Paint API 可自定义背景/边框绘制。'),
  Q('CO', 'P', 'CSS 的 @layer 层叠层有什么作用？',
    ['@layer', '层叠层', '优先级', 'CSS'], '3-5 分钟', '中频',
    '请说明 @layer 如何解决 CSS 优先级战争。',
    `@layer 允许开发者显式声明层叠层，层与层之间的优先级由层顺序决定，同一层内再按选择器特殊性排序。这样可让框架、主题、工具类、用户覆盖按层组织，避免 !important 滥用。

    @layer reset, base, components, utilities;
    @layer base { body { margin: 0; } }`,
    [['层顺序', '40%', '层声明顺序决定优先级'], ['内部排序', '30%', '同层内仍按特殊性'], ['组织方式', '30%', '框架/主题/工具类分层']],
    ['认为 @layer 会完全忽略选择器特殊性',
     '层顺序声明错误导致覆盖失效',
     '对未放入层的样式优先级理解错误'],
    '@layer 通过层顺序控制优先级，可将 reset、base、components、utilities 分层管理，减少 !important。'),
  Q('CO', 'P', '什么是 CSS Subgrid？它解决了什么问题？',
    ['Subgrid', 'CSS Grid', '布局', 'CSS'], '3-5 分钟', '低频',
    '请解释 Subgrid 的使用场景和与 Grid 嵌套的区别。',
    `普通 Grid 嵌套时，子网格的轨道独立于父网格。Subgrid 允许子网格继承父网格的轨道定义，使嵌套项目与父网格对齐，适合表单标签-输入对、复杂卡片列表等需要跨层级对齐的场景。

    .item { grid-template-columns: subgrid; }`,
    [['子网格继承', '40%', '继承父轨道'], ['使用场景', '30%', '跨层级对齐'], ['兼容性', '30%', '较新浏览器支持']],
    ['用普通 grid 模拟 subgrid 导致轨道不统一',
     '在不需要对齐的场景使用 subgrid 增加复杂度',
     '忽略 subgrid 只能继承一行或一列轨道'],
    'CSS Subgrid 让子网格继承父网格轨道，实现跨层级对齐，适合表单和复杂列表布局。'),
  Q('CO', 'P', '什么是 CSS 逻辑属性（Logical Properties）？',
    ['逻辑属性', 'inline', 'block', '国际化'], '3-5 分钟', '中频',
    '请说明 margin-inline-start 与 margin-left 的区别。',
    `逻辑属性依据文本流向定义，inline 表示文本排列方向（水平或垂直），block 表示块级排列方向。margin-inline-start 在 LTR 中对应 margin-left，在 RTL 中对应 margin-right，便于同时支持多语言布局。

    .box {
      margin-inline-start: 1rem;
      padding-block: 0.5rem;
    }`,
    [['文本流向', '40%', 'inline/block 与书写模式'], ['RTL 支持', '30%', '自动适配左右'], ['映射关系', '30%', 'margin-inline-start 对应 left/right']],
    ['把逻辑属性当成普通属性的别名简单替换',
     '在需要固定物理方向的场景误用逻辑属性',
     '忽略书写模式对 block/inline 方向的影响'],
    'CSS 逻辑属性基于文本流向，inline-start/end 自动适配 LTR/RTL，便于国际化布局。'),
  Q('CO', 'P', '渲染合成层（Compositing Layer）与 will-change 的关系？',
    ['合成层', 'will-change', 'GPU', '性能'], '5-8 分钟', '中频',
    '请说明浏览器如何创建合成层以及 will-change 的正确用法。',
    `浏览器将页面分层，每层独立光栅化后在 GPU 合成。transform/opacity 等属性可在合成层上变化而不触发重排/重绘。will-change 提示浏览器提前创建合成层，但滥用会占用大量 GPU 内存。

用法：在动画前临时设置 will-change，动画结束后移除。`,
    [['合成层', '40%', '分层光栅化与合成'], ['will-change', '40%', '提前创建层与移除时机'], ['滥用风险', '20%', 'GPU 内存与层爆炸']],
    ['对所有元素设置 will-change: transform',
     '动画结束后不清理 will-change',
     '认为 will-change 能提升所有属性的性能'],
    '合成层使 transform/opacity 动画高效，will-change 用于提前创建层，动画结束后应移除以避免 GPU 内存浪费。'),
  Q('PE', 'A', 'CSS 加载与渲染性能有哪些优化手段？',
    ['CSS 性能', '关键 CSS', '加载优化', '渲染'], '5-8 分钟', '高频',
    '请从加载、解析、渲染三个阶段说明优化方法。',
    `加载：内联关键 CSS、异步加载非关键 CSS、使用 preload 预加载字体和关键样式、压缩和缓存 CSS。解析：减少选择器复杂度、避免深层嵌套。渲染：避免重排、使用 transform/opacity、批量修改样式、使用 content-visibility 延迟离屏渲染。`,
    [['加载', '30%', '关键 CSS、异步、preload'], ['解析', '30%', '选择器复杂度'], ['渲染', '40%', '重排、合成、content-visibility']],
    ['把所有 CSS 都内联',
     '选择器过度嵌套导致解析慢',
     '用 @import 同步加载样式阻塞渲染'],
    'CSS 性能优化包括内联关键 CSS、异步非关键 CSS、降低选择器复杂度、避免重排、使用合成属性动画。'),
  Q('SC', 'A', '如何设计一个响应式图片组件？',
    ['响应式图片', 'picture', 'srcset', 'sizes'], '5-8 分钟', '中频',
    '请使用 srcset、sizes 和 picture 实现不同场景的图片适配。',
    `srcset + sizes 让浏览器根据视口宽度选择合适分辨率的图片。picture 用于艺术形式切换（如不同裁切、格式）。

    <picture>
      <source srcset="img.avif" type="image/avif">
      <source srcset="img.webp" type="image/webp">
      <img src="img.jpg" srcset="img-400.jpg 400w, img-800.jpg 800w" sizes="(max-width: 600px) 100vw, 50vw" alt="">
    </picture>`,
    [['srcset/sizes', '40%', '分辨率切换'], ['picture', '30%', '艺术形式与格式切换'], ['alt', '30%', '可访问性']],
    ['srcset 没有 sizes 导致浏览器无法选择',
     '用 picture 做分辨率切换而非艺术形式切换',
     '缺少 alt 和懒加载处理'],
    '响应式图片组件用 srcset/sizes 做分辨率切换，picture 做格式/艺术形式切换，注意 alt 和懒加载。'),
  Q('SC', 'A', '实现一个可拖拽排序列表的 HTML/CSS 思路',
    ['拖拽排序', 'HTML5 Drag', 'CSS', '交互'], '5-8 分钟', '中频',
    '请描述拖拽排序的实现要点和视觉反馈方案。',
    `HTML5 Drag and Drop：给元素设置 draggable=true，监听 dragstart、dragover、dragend。dragover 时计算插入位置，更新 DOM 顺序。视觉反馈：给拖拽元素设置 opacity/缩放，给目标位置添加占位符或边框提示。

移动端可用 pointer/touch 事件实现自定义拖拽。`,
    [['事件', '30%', 'dragstart/dragover/drop'], ['位置计算', '30%', '鼠标位置与元素边界'], ['视觉反馈', '40%', '拖拽样式、占位符']],
    ['拖拽结束后未更新数据模型导致 UI 与数据不一致',
     '未处理 touch 事件导致移动端无法拖拽',
     '缺少键盘可访问的排序方式'],
    '可拖拽排序列表通过 drag 事件计算插入位置并更新 DOM，提供拖拽样式和占位符反馈。'),
  Q('EN', 'A', 'CSS 预处理器与 PostCSS 在现代工程中的角色',
    ['CSS 预处理器', 'PostCSS', '工程化', 'CSS'], '3-5 分钟', '中频',
    '请说明 Sass/Less/Stylus 和 PostCSS 的分工与选型。',
    `预处理器提供变量、嵌套、混合、继承等语法糖，提升编写效率。PostCSS 是 CSS 后处理器/转译器，通过插件实现自动前缀、未来语法降级、px 转 rem、CSS Modules、样式压缩等。

现代工程常将两者结合：用 Sass/Less 编写源码，PostCSS 做后处理；或仅使用 PostCSS 插件链。`,
    [['预处理器', '40%', '变量、嵌套、混合'], ['PostCSS', '40%', '插件化后处理'], ['选型', '20%', '项目需求与团队熟悉度']],
    ['用预处理器替代所有 PostCSS 功能',
     '过度使用嵌套导致选择器复杂',
     'PostCSS 配置缺失 autoprefixer 导致兼容性问题'],
    'CSS 预处理器提升编写效率，PostCSS 负责后处理与插件化转换，现代工程常结合使用。'),
  Q('CO', 'A', '什么是渐进增强与优雅降级？',
    ['渐进增强', '优雅降级', '兼容性', '前端策略'], '3-5 分钟', '中频',
    '请说明两种策略的区别及适用场景。',
    `渐进增强：先构建基础功能，再为支持新特性的浏览器添加增强体验。优雅降级：先构建完整功能，再为旧浏览器做兼容性兜底。

渐进增强更关注可访问性和基础可用；优雅降级适合已确定现代体验为主、旧浏览器为辅的项目。实际常结合使用。`,
    [['渐进增强', '40%', '由基础到增强'], ['优雅降级', '40%', '由完整到兼容'], ['场景', '20%', '目标用户与浏览器分布']],
    ['把渐进增强等同于不支持任何新特性',
     '优雅降级只针对 IE 而不考虑可访问性',
     '完全放弃旧浏览器支持'],
    '渐进增强从基础功能出发逐步增强，优雅降级从完整体验出发做旧浏览器兼容，实际常结合。'),
];

const a11ySpecs = [
  Q('CO', 'B', 'WCAG 的 POUR 四项原则是什么？',
    ['WCAG', 'POUR', '可访问性', '原则'], '3-5 分钟', '高频',
    '请解释 Perceivable、Operable、Understandable、Robust 的含义。',
    `POUR：

1. Perceivable（可感知）：信息和 UI 组件必须以用户可感知的方式呈现，如替代文本、颜色对比度。
2. Operable（可操作）：界面组件必须可操作，如键盘导航、充足的时间限制。
3. Understandable（可理解）：信息和操作必须可理解，如可读文本、错误提示。
4. Robust（健壮）：内容必须能被各种辅助技术可靠解析，如语义化 HTML。`,
    [['Perceivable', '25%', '可感知'], ['Operable', '25%', '可操作'], ['Understandable', '25%', '可理解'], ['Robust', '25%', '健壮']],
    ['只关注键盘导航而忽略可感知性',
     '把 POUR 当作设计原则而非可访问性原则',
     '认为 POUR 只适用于视障用户'],
    'POUR 四项原则是可感知、可操作、可理解、健壮，覆盖所有残疾类型和辅助技术。'),
  Q('CO', 'B', '如何正确使用 heading 层级？',
    ['heading', 'h1-h6', '语义化', '屏幕阅读器'], '3-5 分钟', '高频',
    '请说明标题层级对可访问性的影响和常见错误。',
    `页面应只有一个 h1，层级按 h1 -> h2 -> h3 顺序嵌套，不要跳级。标题构成文档大纲，屏幕阅读器用户常通过标题快速导航。

错误：用标题标签控制字体大小、跳级（h1 后直接 h4）、多个 h1。`,
    [['唯一 h1', '30%', '每页一个 h1'], ['顺序嵌套', '40%', '不跳级'], ['语义而非样式', '30%', '用 CSS 控制大小']],
    ['用 h1-h6 做字体大小调整',
     '标题层级混乱，h1 后直接 h4',
     '页面出现多个 h1 没有主标题'],
    'heading 层级应唯一 h1、顺序嵌套不跳级，用于文档大纲而非样式控制。'),
  Q('CO', 'B', '什么是焦点顺序（focus order）？',
    ['focus order', 'tabindex', '键盘导航', '可访问性'], '3-5 分钟', '高频',
    '请解释 DOM 顺序与视觉顺序对焦点顺序的影响。',
    `焦点顺序通常应与 DOM 顺序和视觉顺序一致，使用 Tab 键按预期移动。tabindex="0" 使元素可聚焦并纳入自然焦点顺序；tabindex="-1" 可通过脚本聚焦但不参与 Tab 顺序；正 tabindex 会打乱顺序，不推荐。

    <button tabindex="0">可聚焦</button>
    <div tabindex="-1" ref={el}>脚本聚焦</div>`,
    [['DOM 与视觉', '40%', '焦点顺序一致性'], ['tabindex', '40%', '0/-1/正值'], ['避免正 tabindex', '20%', '不打乱顺序']],
    ['用正 tabindex 控制 Tab 顺序',
     'CSS 改变视觉顺序后未调整 DOM 顺序',
     '把 tabindex 加到所有 div 上'],
    '焦点顺序应与 DOM 和视觉顺序一致，优先使用默认 Tab 顺序，必要时用 tabindex="0" 或 "-1"。'),
  Q('CO', 'A', '如何为数据表格提供无障碍支持？',
    ['表格', 'th', 'scope', '可访问性'], '3-5 分钟', '中频',
    '请说明 table、caption、th、scope 和 thead/tbody 的使用。',
    `使用 table 元素，为列/行标题使用 th 并添加 scope="col"/scope="row"。为表格添加 caption 描述内容。复杂表格使用 headers 属性关联单元格与多行/列标题。避免用 div 模拟表格导致屏幕阅读器无法解析行列关系。`,
    [['th', '30%', '表头单元格'], ['scope', '30%', 'col/row'], ['caption', '20%', '表格标题'], ['headers', '20%', '复杂表格关联']],
    ['用 div + CSS 模拟表格',
     'th 不写 scope 导致屏幕阅读器方向不清',
     '复杂表头没有使用 headers 关联'],
    '数据表格应使用 table、th、scope、caption，复杂表头使用 headers 关联，避免 div 模拟。'),
  Q('CO', 'A', 'aria-describedby 与 aria-labelledby 有什么区别？',
    ['ARIA', 'aria-describedby', 'aria-labelledby', '标签'], '3-5 分钟', '中频',
    '请说明两个属性的用途和优先级差异。',
    `aria-labelledby 指向元素名称/标签，功能等同于 HTML label，优先级高于原生标签。aria-describedby 指向补充描述信息，不会替代名称，只作为额外说明。

    <input aria-labelledby="name-label" aria-describedby="name-hint" />
    <div id="name-label">用户名</div>
    <div id="name-hint">3-20 个字符</div>`,
    [['aria-labelledby', '40%', '名称/标签'], ['aria-describedby', '40%', '补充描述'], ['优先级', '20%', 'labelledby 高于原生标签']],
    ['把描述信息放在 aria-labelledby 中导致名称冗长',
     'aria-describedby 指向可见元素但该元素没有文本',
     '用 aria-label 和 aria-labelledby 重复定义名称'],
    'aria-labelledby 提供元素名称，aria-describedby 提供补充描述，两者功能不同。'),
  Q('CO', 'A', '如何为视频/音频内容提供无障碍替代方案？',
    ['视频', '音频', '字幕', '可访问性'], '3-5 分钟', '中频',
    '请说明字幕、转录文本、音频描述和手语视频的作用。',
    `视频应提供同步字幕（closed captions）给听障用户，提供音频描述给视障用户。音频内容应提供完整文字转录。重要视觉信息不应只通过视频传达。

    <video controls>
      <track src="captions.vtt" kind="captions" srclang="zh" label="中文字幕">
    </video>`,
    [['字幕', '30%', 'captions'], ['转录', '30%', '文本稿'], ['音频描述', '30%', '描述视觉信息'], ['track', '10%', 'VTT 文件']],
    ['自动生成的字幕不校对',
     '只提供一种语言字幕',
     '关键信息只出现在视频中无文字说明'],
    '视频应提供字幕、音频描述和转录文本，音频提供文字稿，使用 track 元素加载 VTT。'),
  Q('CO', 'A', '什么是键盘陷阱（keyboard trap）？如何避免？',
    ['键盘陷阱', 'focus trap', '键盘导航', '可访问性'], '3-5 分钟', '中频',
    '请说明键盘陷阱的表现和 Modal 等组件中的正确做法。',
    `键盘陷阱指焦点无法通过 Tab 键离开某个区域。正确做法：在 Modal 中焦点循环限制在弹窗内，但可通过 Esc 或关闭按钮退出。焦点离开弹窗后应回到触发元素。

    // 弹窗关闭后恢复焦点
trigger.focus();`,
    [['表现', '30%', 'Tab 无法离开'], ['焦点循环', '40%', '限制在弹窗内'], ['恢复焦点', '30%', '关闭后回到触发元素']],
    ['Modal 打开后焦点仍可在页面任意元素移动',
     '弹窗内 Tab 焦点丢失',
     '关闭弹窗后未恢复焦点导致用户迷失'],
    '键盘陷阱指 Tab 无法离开某区域；Modal 应限制焦点循环并提供退出方式，关闭后恢复焦点。'),
  Q('CO', 'A', '如何为动态加载内容使用 aria-live？',
    ['aria-live', '动态内容', '实时区域', '屏幕阅读器'], '3-5 分钟', '中频',
    '请说明 aria-live 的 polite/assertive/off 取值及使用场景。',
    `aria-live 让屏幕阅读器在内容变化时朗读更新。polite 等当前朗读完成后再播报；assertive 立即打断；off 不播报。

    <div aria-live="polite" aria-atomic="true">
      {statusMessage}
    </div>

用于加载完成提示、表单错误、通知消息等。`,
    [['取值', '40%', 'polite/assertive/off'], ['aria-atomic', '30%', '整体播报'], ['场景', '30%', '状态提示、错误、通知']],
    ['所有动态内容都用 assertive 打断用户',
     'aria-live 区域初始为空，更新后仍不播报',
     '在频繁变化的区域使用 aria-live 导致刷屏'],
    'aria-live 用于动态内容播报，polite 等待当前朗读结束，assertive 立即打断，assertive 应谨慎使用。'),
  Q('CO', 'A', '可见焦点指示器（focus indicator）的要求是什么？',
    ['focus indicator', '可见焦点', '键盘', 'WCAG'], '3-5 分钟', '中频',
    '请说明 WCAG 对焦点可见性的要求及自定义样式注意事项。',
    `WCAG 要求键盘焦点必须可见，焦点指示器应有足够的尺寸和对比度。自定义 focus 样式时不应完全移除 outline，可改用 box-shadow 或 border，但要确保可见。

    :focus-visible {
      outline: 2px solid #005fcc;
      outline-offset: 2px;
    }`,
    [['可见性', '40%', '焦点必须可见'], ['对比度', '30%', '与背景对比足够'], ['实现', '30%', 'outline 或替代方案']],
    ['全局设置 outline: none 且不替代',
     '焦点样式与背景色对比度不足',
     '鼠标点击时也显示突兀的焦点样式'],
    '焦点指示器必须可见且对比度足够，可用 :focus-visible 和 outline/box-shadow 实现，不要完全移除 outline。'),
  Q('CO', 'A', '如何为图标按钮提供可访问名称？',
    ['图标按钮', 'aria-label', '可访问名称', '按钮'], '3-5 分钟', '高频',
    '请给出至少两种为无文本图标按钮添加名称的方法。',
    `1) 使用 aria-label 描述按钮功能。2) 使用 visually hidden 文本供屏幕阅读器读取。3) 使用 title 属性（仅鼠标悬浮提示，不建议作为主要可访问名称）。

    <button aria-label="搜索">
      <svg aria-hidden="true">...</svg>
    </button>
    <button>
      <svg aria-hidden="true">...</svg>
      <span class="sr-only">搜索</span>
    </button>`,
    [['aria-label', '40%', '按钮功能描述'], ['visually hidden', '40%', '隐藏文本'], ['aria-hidden', '20%', '图标隐藏']],
    ['图标按钮没有可访问名称',
     '用 title 替代 aria-label 作为主要名称',
     'svg 没有 aria-hidden 导致屏幕阅读器重复读取'],
    '图标按钮应通过 aria-label 或隐藏文本提供可访问名称，图标本身应 aria-hidden。'),
  Q('CO', 'P', '如何实现一个可访问的 Tabs 组件？',
    ['Tabs', 'ARIA', '键盘', '可访问组件'], '5-8 分钟', '中频',
    '请说明 Tabs 的 role、状态、键盘交互和焦点管理。',
    `结构：tablist 包含 tab，每个 tab 对应 tabpanel。选中 tab 设置 aria-selected="true"，未选中为 false。tabpanel 通过 aria-labelledby 关联 tab。

键盘：左右箭头切换 tab，Home/End 到第一个/最后一个 tab，Tab 键进入激活的面板内容。激活方式可为自动激活或手动激活（空格/回车）。`,
    [['角色', '30%', 'tablist/tab/tabpanel'], ['状态', '30%', 'aria-selected'], ['键盘', '30%', '方向键/Home/End'], ['激活方式', '10%', '自动/手动']],
    ['用 div 模拟 tab 但未添加 role 和状态',
     'Tab 键在 tab 间切换而不是箭头键',
     'tabpanel 没有与 tab 关联'],
    '可访问 Tabs 需设置 tablist/tab/tabpanel 角色、aria-selected、aria-labelledby，并用方向键切换。'),
  Q('CO', 'P', '如何实现一个可访问的 Accordion 组件？',
    ['Accordion', 'ARIA', '展开收起', '可访问组件'], '5-8 分钟', '中频',
    '请说明 Accordion 的按钮、面板状态、键盘和屏幕阅读器支持。',
    `标题按钮使用 button，aria-expanded 表示展开状态，aria-controls 关联面板 id。面板使用 aria-labelledby 关联按钮。允许多个面板同时展开或限制仅一个展开。

键盘：Enter/Space 切换当前按钮；若限制单个展开，方向键可在标题间移动。`,
    [['按钮', '30%', '使用 button 元素'], ['状态', '30%', 'aria-expanded/aria-controls'], ['面板关联', '30%', 'aria-labelledby'], ['键盘', '10%', 'Enter/Space 切换']],
    ['用 div 做标题并监听 click',
     '展开状态没有通过 aria-expanded 通知屏幕阅读器',
     '面板未与按钮关联导致上下文丢失'],
    '可访问 Accordion 使用 button 做标题，aria-expanded 表示状态，aria-controls/aria-labelledby 关联面板。'),
  Q('CO', 'P', '复杂表单验证的无障碍反馈如何设计？',
    ['表单验证', 'ARIA', '错误提示', '可访问性'], '5-8 分钟', '中频',
    '请说明错误提示与表单控件的关联、焦点管理和 live region 的使用。',
    `1) 错误信息通过 aria-describedby 与输入框关联。2) 提交时将焦点移到第一个错误字段。3) 使用 aria-invalid="true" 标记无效字段。4) 对全局错误摘要使用 aria-live="polite"。5) 错误信息应具体说明如何修复。

    <input aria-describedby="email-error" aria-invalid="true" />
    <div id="email-error">请输入有效的邮箱地址</div>`,
    [['关联', '30%', 'aria-describedby'], ['焦点', '30%', '首个错误字段聚焦'], ['状态', '20%', 'aria-invalid'], ['摘要', '20%', 'aria-live']],
    ['错误提示仅用颜色标识',
     '提交后未将焦点移到错误字段',
     'aria-describedby 指向错误提示但该提示动态未更新'],
    '复杂表单验证需用 aria-describedby 关联错误、aria-invalid 标记、焦点移到首个错误、live region 播报摘要。'),
  Q('CO', 'P', '屏幕阅读器中的地标（landmark）与跳转有什么关系？',
    ['landmark', 'main', 'nav', '屏幕阅读器'], '3-5 分钟', '中频',
    '请说明 HTML5 语义元素如何映射为 ARIA landmark 及其实际作用。',
    `HTML5 元素 main、nav、aside、header、footer、section[aria-labelledby] 映射为 ARIA landmark。屏幕阅读器用户可通过快捷键在 landmark 之间跳转，快速定位页面区域。

正确使用 landmark 能显著提升页面导航效率。`,
    [['映射', '40%', 'HTML5 到 ARIA landmark'], ['跳转', '30%', '屏幕阅读器快捷键'], ['设计', '30%', '合理划分区域']],
    ['所有内容包在 div 中无 landmark',
     '页面出现多个 main',
     '用 section 不加 aria-label 导致 landmark 列表都是无标签 section'],
    'HTML5 语义元素映射为 ARIA landmark，屏幕阅读器用户可快速跳转，应合理划分页面区域。'),
  Q('CO', 'P', '如何为图表（Chart）添加无障碍文本？',
    ['图表', '数据可视化', 'ARIA', '可访问性'], '5-8 分钟', '中频',
    '请说明图表的替代文本、数据表格和交互键盘支持。',
    `1) 提供图表总结文本，描述主要趋势和关键数据。2) 使用 aria-label 或 figure/figcaption 描述图表。3) 提供可访问的替代数据表格。4) 为图表元素添加键盘焦点和 aria-roledescription。

    <figure>
      <figcaption>2024 年各季度销售额，Q4 最高为 120 万</figcaption>
      <canvas role="img" aria-label="2024 年季度销售柱状图"></canvas>
    </figure>`,
    [['替代文本', '40%', '总结趋势和关键数据'], ['数据表格', '30%', '提供表格化数据'], ['交互', '30%', '键盘焦点与 role']],
    ['图表没有替代文本',
     '把原始数据直接作为 aria-label 导致冗长',
     '图表交互无法通过键盘访问'],
    '图表应提供总结文本、数据表格替代和键盘交互，帮助屏幕阅读器用户理解数据。'),
  Q('SC', 'A', '设计一个无障碍文件上传组件',
    ['文件上传', 'a11y', '表单', '错误提示'], '5-8 分钟', '中频',
    '请说明上传组件的可访问性要点，包括按钮、进度、错误和删除。',
    `1) 使用 label 关联隐藏 input[type=file]，自定义按钮可通过 label 触发。2) 上传进度通过 aria-live 播报。3) 文件名、大小、删除按钮使用语义化元素并关联 aria-describedby。4) 错误信息明确说明格式/大小限制。5) 支持键盘操作和拖拽回退。`,
    [['隐藏 input', '30%', 'label 关联'], ['进度播报', '30%', 'aria-live'], ['错误与删除', '30%', '语义与关联'], ['键盘', '10%', 'Tab/Enter/Space']],
    ['自定义按钮未与 file input 关联导致无法触发',
     '进度变化未播报',
     '错误信息只显示图标颜色'],
    '无障碍文件上传需 label 关联 input、aria-live 播报进度、明确错误信息、支持键盘操作。'),
  Q('SC', 'A', '设计一个可访问的日期选择器',
    ['日期选择器', 'DatePicker', '键盘', 'ARIA'], '5-8 分钟', '中频',
    '请说明日期选择器的键盘导航、焦点管理和 ARIA 属性。',
    `1) 输入框支持手动输入并关联格式提示。2) 弹层面板使用 role="dialog"，日期网格 role="grid"，日期单元格 role="gridcell"。3) 方向键移动日期，Enter/Space 选择，Esc 关闭。4) 选中日期设置 aria-selected，当前日期 aria-current="date"。5) 焦点在打开时进入面板，关闭后返回输入框。`,
    [['键盘', '30%', '方向键/Enter/Esc'], ['角色', '30%', 'dialog/grid/gridcell'], ['状态', '20%', 'aria-selected/current'], ['焦点', '20%', '打开/关闭焦点管理']],
    ['日期网格使用 table 但没有 ARIA 角色',
     '方向键移动导致页面滚动',
     '未提供手动输入回退'],
    '可访问日期选择器需 dialog/grid 角色、方向键导航、aria-selected/current 状态，以及良好的焦点管理。'),
  Q('SS', 'A', '如何在团队中推广无障碍测试？',
    ['无障碍测试', '团队', '流程', 'a11y'], '3-5 分钟', '中频',
    '请说明推广无障碍测试的策略和工具。',
    `策略：1) 建立可访问性检查清单；2) 将 a11y 纳入代码评审；3) 引入自动化工具（axe-core、Lighthouse、eslint-plugin-jsx-a11y）；4) 提供屏幕阅读器使用培训；5) 设置 CI 门禁和定期人工审计。

从小范围试点，展示 ROI 和用户反馈，逐步扩大。`,
    [['自动化', '30%', 'axe/Lighthouse/eslint'], ['流程', '30%', 'CR、CI、审计'], ['培训', '20%', '屏幕阅读器使用'], ['试点', '20%', '小范围验证']],
    ['只依赖自动化工具忽略键盘和屏幕阅读器测试',
     '一次性要求所有代码达到 AAA',
     '没有度量指标导致改进缺乏方向'],
    '推广无障碍测试需自动化工具、流程嵌入、培训和试点，逐步建立团队文化。'),
  Q('SS', 'P', '无障碍合规审计流程与整改闭环如何建立？',
    ['无障碍审计', 'WCAG', '合规', '整改'], '5-8 分钟', '中频',
    '请描述从审计计划到整改验证的完整流程。',
    `流程：1) 确定范围与 WCAG 目标等级（AA/AAA）。2) 自动化扫描（axe/Lighthouse）。3) 人工审计：键盘导航、屏幕阅读器、颜色对比度。4) 产出缺陷清单，按严重等级排序。5) 分配修复责任人并设定期限。6) 修复后复测，更新测试用例。7) 持续监控与回归。`,
    [['范围与等级', '20%', '目标等级'], ['自动化', '20%', '工具扫描'], ['人工审计', '20%', '键盘/读屏/对比度'], ['闭环', '40%', '修复、复测、回归']],
    ['只做自动化扫描',
     '没有按严重等级排序修复',
     '修复后不复测导致问题反复'],
    '无障碍审计应包含自动化扫描、人工测试、缺陷修复、复测和持续监控的完整闭环。'),
  Q('CO', 'B', '可访问性对 SEO 和用户体验有什么双重价值？',
    ['a11y', 'SEO', 'UX', '语义化'], '3-5 分钟', '中频',
    '请说明可访问性如何同时改善搜索引擎和真实用户体验。',
    `可访问性强调语义化 HTML、alt 文本、标题结构和清晰导航，这些也是搜索引擎理解页面内容的重要依据。同时，键盘导航、充足对比度、清晰错误提示提升所有用户（包括临时受限用户）的体验。

因此，投入可访问性往往同时提升 SEO 和用户满意度。`,
    [['SEO', '40%', '语义化、alt、标题'], ['UX', '40%', '键盘、对比度、错误提示'], ['通用设计', '20%', '惠及所有用户']],
    ['认为可访问性只对残疾用户有价值',
     '为了 SEO 堆砌关键词而破坏可访问性',
     '忽略可访问性对移动端和老年用户的价值'],
    '可访问性通过语义化、替代文本和清晰结构同时提升 SEO 和用户体验，惠及所有用户。'),
];

const algorithmSpecs = [
  Q('CO', 'B', '什么是递归？如何防止栈溢出？',
    ['递归', '栈溢出', '尾递归', '算法'], '3-5 分钟', '高频',
    '请说明递归三要素及栈溢出的优化方法。',
    `递归三要素：终止条件、递归关系和返回值。栈溢出通常由于递归深度过大。优化方法：1) 改写为循环；2) 使用尾递归（若引擎支持）；3) 使用递归深度限制；4) 对分治问题使用迭代栈模拟。

    function factorial(n, acc = 1) {
      if (n <= 1) return acc;
      return factorial(n - 1, n * acc); // 尾递归形式
    }`,
    [['三要素', '40%', '终止条件、递归关系、返回值'], ['栈溢出原因', '20%', '深度过大'], ['优化', '40%', '循环、尾递归、深度限制']],
    ['递归没有终止条件导致死循环',
     '深度大时不做任何优化直接递归',
     '混淆尾递归和普通递归，忽略引擎是否优化'],
    '递归需要终止条件、递归关系和返回值。防止栈溢出可改写循环、尾递归或限制深度。'),
  Q('CO', 'B', '贪心算法的基本思想是什么？适合解决哪些问题？',
    ['贪心算法', '最优子结构', '区间调度', '算法'], '3-5 分钟', '中频',
    '请解释贪心算法的特点及经典应用场景。',
    `贪心算法在每一步选择当前局部最优解，希望最终得到全局最优。适合具有贪心选择性质和最优子结构的问题。经典应用：区间调度、最小生成树（Kruskal/Prim）、Dijkstra（非负权）、 Huffman 编码、找零问题（特定面额）。`,
    [['局部最优', '30%', '每步最优选择'], ['适用条件', '30%', '贪心选择性质'], ['经典问题', '40%', '区间调度、最小生成树、Dijkstra']],
    ['所有优化问题都用贪心导致结果错误',
     '分不清贪心与动态规划的区别',
     '没有证明贪心选择性质就直接使用'],
    '贪心算法每步选择局部最优，适合区间调度、最小生成树等问题，需满足贪心选择性质。'),
  Q('CO', 'B', '分治法的基本思想与经典案例',
    ['分治法', '归并排序', '快速排序', '算法'], '3-5 分钟', '高频',
    '请说明分治法的三个步骤及经典算法。',
    `分治法三步：分解（Divide）将问题拆分为子问题；解决（Conquer）递归解决子问题；合并（Combine）将子问题解合并为原问题解。

经典案例：归并排序、快速排序、二分查找、Strassen 矩阵乘法、最近点对。`,
    [['分解', '25%', '拆分问题'], ['解决', '25%', '递归求解'], ['合并', '25%', '合并结果'], ['案例', '25%', '归并/快排/二分']],
    ['分治后没有正确合并结果',
     '子问题划分不均衡导致复杂度退化',
     '把分治和递归混为一谈，忽略合并步骤'],
    '分治法包括分解、解决、合并三步，经典应用有归并排序、快速排序和二分查找。'),
  Q('CD', 'B', '手写快速排序并分析复杂度',
    ['快速排序', '分治', '手写代码', '排序'], '5-8 分钟', '高频',
    '请实现快速排序，并说明最好、最坏、平均时间复杂度。',
    `选择基准 pivot，将数组分为小于 pivot 和大于 pivot 的两部分，递归排序。平均时间复杂度 O(n log n)，最坏 O(n²) 发生在数组已有序且 pivot 选择固定时。

    function quickSort(arr) {
      if (arr.length <= 1) return arr;
      const pivot = arr[Math.floor(arr.length / 2)];
      const left = arr.filter(x => x < pivot);
      const mid = arr.filter(x => x === pivot);
      const right = arr.filter(x => x > pivot);
      return [...quickSort(left), ...mid, ...quickSort(right)];
    }`,
    [['分区逻辑', '40%', 'pivot 与分区'], ['递归', '30%', '递归排序'], ['复杂度', '30%', '平均/最坏']],
    ['pivot 选择固定导致已有序数组退化为 O(n²)',
     '分区没有处理等于 pivot 的元素导致死循环',
     '空间复杂度说成 O(1) 忽略递归栈'],
    '快速排序通过 pivot 分区递归排序，平均 O(n log n)，最坏 O(n²)，可随机选 pivot 优化。'),
  Q('CD', 'B', '手写归并排序',
    ['归并排序', '分治', '稳定排序', '手写代码'], '5-8 分钟', '高频',
    '请实现归并排序并说明其稳定性。',
    `归并排序将数组二分，递归排序后合并两个有序数组。时间复杂度稳定 O(n log n)，空间复杂度 O(n)。合并时相等元素按原顺序取，因此是稳定排序。

    function mergeSort(arr) {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
    }
    function merge(left, right) { ... }`,
    [['分解', '30%', '二分递归'], ['合并', '40%', '合并有序数组'], ['稳定性', '30%', '相等元素顺序不变']],
    ['合并时没有处理剩余元素',
     '使用额外空间超过 O(n)',
     '不稳定合并导致排序结果不可预期'],
    '归并排序稳定 O(n log n)，核心是分解与合并两个有序数组，合并时保持相等元素顺序。'),
  Q('CD', 'B', '手写二分查找及其变体',
    ['二分查找', '查找边界', '手写代码', '算法'], '5-8 分钟', '高频',
    '请实现普通二分查找、查找左边界和右边界。',
    `二分查找要求数组有序，每次将查找范围减半。查找边界时通过调整收缩方向定位最左/最右目标。

    function binarySearch(nums, target) {
      let l = 0, r = nums.length - 1;
      while (l <= r) {
        const mid = (l + r) >>> 1;
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
      }
      return -1;
    }`,
    [['基本二分', '40%', '减半范围'], ['边界查找', '40%', '左/右边界收缩'], ['溢出问题', '20%', 'mid 计算']],
    ['循环条件写错导致死循环或漏查',
     '边界查找时收缩方向错误',
     'mid 用 (l + r) / 2 在超大数组中溢出'],
    '二分查找通过减半范围查找目标；边界变体通过调整收缩方向定位最左/最右位置。'),
  Q('CD', 'A', '实现一个 LRU 缓存',
    ['LRU', '缓存', 'Map', '手写代码'], '8-12 分钟', '高频',
    '请用 Map 实现 O(1) 时间复杂度的 get/put。',
    `LRU（最近最少使用）在容量满时淘汰最久未使用的键。Map 的迭代顺序按插入顺序，get/put 时先 delete 再 set 可更新顺序。

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
    }`,
    [['数据结构', '30%', 'Map 维护顺序'], ['get', '30%', '更新访问顺序'], ['put', '40%', '淘汰与插入']],
    ['用普通对象导致无法 O(1) 获取最久未用键',
     'put 时没有处理 key 已存在的情况',
     '容量判断逻辑错误导致多删或少删'],
    'LRU 缓存可用 Map 的插入顺序实现 O(1) get/put，访问时更新顺序，满时删除最前元素。'),
  Q('CD', 'A', '手写一个深拷贝函数',
    ['深拷贝', '递归', '循环引用', '手写代码'], '8-12 分钟', '高频',
    '请实现支持对象、数组、循环引用的深拷贝。',
    `递归复制每个属性，遇到循环引用时用 WeakMap 记录已拷贝对象。还需处理 Date、RegExp、Map、Set 等特殊对象。

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
    }`,
    [['递归复制', '30%', '基本类型与对象'], ['循环引用', '30%', 'WeakMap 记录'], ['特殊对象', '20%', 'Date/RegExp/Map/Set'], ['ownKeys', '20%', 'symbol 属性']],
    ['未处理循环引用导致栈溢出',
     '特殊对象被复制为普通对象',
     '忽略 symbol 和不可枚举属性导致拷贝不完整'],
    '深拷贝需递归复制属性，用 WeakMap 处理循环引用，并处理 Date、RegExp 等特殊对象。'),
  Q('CD', 'A', '手写函数 compose 和 pipe',
    ['compose', 'pipe', '函数式编程', '手写代码'], '5-8 分钟', '中频',
    '请实现 compose 从右到左组合函数，pipe 从左到右组合函数。',
    `compose(f, g, h)(x) 等价于 f(g(h(x)))。pipe 则相反。

    const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
    const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    compose(mul2, add1)(3); // 8`,
    [['compose', '40%', 'reduceRight'], ['pipe', '40%', 'reduce'], ['函数签名', '20%', '多参数函数处理']],
    ['compose 和 pipe 方向搞反',
     '没有处理多参数函数导致结果错误',
     '使用 for 循环但初始值设置错误'],
    'compose 从右到左组合函数，pipe 从左到右，可用 reduceRight/reduce 实现。'),
  Q('CD', 'A', '实现一个事件发布订阅（EventBus）',
    ['EventBus', '发布订阅', '手写代码'], '5-8 分钟', '高频',
    '请实现 on、emit、off、once 方法。',
    `使用 Map 存储事件名到监听器数组的映射。on 添加监听，once 包装为执行后自移除，emit 按注册顺序同步调用并传递参数，off 按引用移除。

    class EventBus {
      constructor() { this.events = new Map(); }
      on(name, fn) { ... }
      emit(name, ...args) { (this.events.get(name)||[]).forEach(fn => fn(...args)); }
      off(name, fn) { ... }
      once(name, fn) { const wrapper = (...args) => { this.off(name, wrapper); fn(...args); }; this.on(name, wrapper); }
    }`,
    [['数据结构', '30%', 'Map + 数组'], ['once 实现', '30%', '包装函数自移除'], ['off 准确性', '40%', '按引用移除']],
    ['emit 使用异步调用导致执行顺序不可预期',
     'off 时直接清空该事件所有监听器',
     'once 包装函数没有正确移除自身'],
    'EventBus 用 Map 存事件与监听器数组，实现 on/emit/off/once，注意 once 的自移除。'),
  Q('CD', 'A', '手写 Promise.allSettled',
    ['Promise', 'allSettled', '手写代码'], '5-8 分钟', '中频',
    '请实现 Promise.allSettled，返回每个 Promise 的状态和结果/原因。',
    `等待所有 Promise settle，结果数组元素为 { status: 'fulfilled', value } 或 { status: 'rejected', reason }。

    function allSettled(promises) {
      return Promise.all(promises.map(p =>
        Promise.resolve(p).then(
          value => ({ status: 'fulfilled', value }),
          reason => ({ status: 'rejected', reason })
        )
      ));
    }`,
    [['全部等待', '40%', '所有 Promise settle'], ['结果格式', '40%', 'status/value/reason'], ['输入处理', '20%', '非 Promise 包装']],
    ['有 reject 时直接返回 rejected Promise',
     '结果对象字段与规范不符',
     '未包装非 Promise 值'],
    'Promise.allSettled 等待所有 Promise 完成，返回包含 status 和 value/reason 的结果数组。'),
  Q('CD', 'P', '手写一个最小堆 / 优先队列',
    ['最小堆', '优先队列', '手写代码', '数据结构'], '8-12 分钟', '中频',
    '请实现可插入、弹出最小元素、查看堆顶的优先队列。',
    `最小堆是完全二叉树，父节点值小于等于子节点。用数组存储，索引 i 的左右子节点为 2i+1、2i+2。插入时上浮，弹出时下沉调整。

    class MinHeap {
      constructor() { this.heap = []; }
      push(val) { this.heap.push(val); this.bubbleUp(); }
      pop() { ... }
      peek() { return this.heap[0]; }
      bubbleUp() { ... }
      sinkDown() { ... }
    }`,
    [['结构', '30%', '数组表示完全二叉树'], ['push', '30%', '上浮'], ['pop', '40%', '下沉调整']],
    ['子节点索引计算错误',
     '弹出时未把末尾元素放到根再调整',
     '比较函数写死导致无法复用为大顶堆'],
    '最小堆用数组存储，插入上浮、弹出下沉，可高效获取最小元素。'),
  Q('CD', 'P', '手写 Trie（前缀树）',
    ['Trie', '前缀树', '字符串', '手写代码'], '8-12 分钟', '中频',
    '请实现 Trie 的 insert、search、startsWith 方法。',
    `Trie 是树形结构，每条边代表一个字符，节点标记是否为单词结尾。适合前缀搜索和自动补全。

    class TrieNode {
      constructor() { this.children = new Map(); this.isEnd = false; }
    }
    class Trie {
      insert(word) { ... }
      search(word) { ... }
      startsWith(prefix) { ... }
    }`,
    [['节点结构', '30%', 'children 和 isEnd'], ['插入', '30%', '逐字符创建节点'], ['查找', '40%', 'search 与 startsWith 区别']],
    ['search 和 startsWith 逻辑没有区分是否到单词结尾',
     'children 用普通对象导致查找顺序不可控',
     '没有处理空字符串'],
    'Trie 用节点存储字符路径，支持 insert、search 和 startsWith，适合前缀匹配和自动补全。'),
  Q('CD', 'P', '手写并查集',
    ['并查集', 'Union-Find', '连通性', '手写代码'], '5-8 分钟', '中频',
    '请实现带路径压缩和按秩合并的并查集。',
    `并查集用于管理元素分组和连通性。find 查找根节点并压缩路径，union 按秩合并两个集合。

    class UnionFind {
      constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
      }
      find(x) { return this.parent[x] === x ? x : this.parent[x] = this.find(this.parent[x]); }
      union(x, y) { ... }
    }`,
    [['find', '40%', '路径压缩'], ['union', '40%', '按秩合并'], ['连通判断', '20%', '同根即连通']],
    ['find 没有路径压缩导致树过深',
     'union 没有按秩合并导致退化',
     '初始化 parent 错误'],
    '并查集通过路径压缩和按秩合并优化 find/union，常用于连通性和集合合并问题。'),
  Q('CD', 'A', '实现数组乱序（Fisher-Yates）',
    ['Fisher-Yates', '乱序', '随机', '手写代码'], '3-5 分钟', '中频',
    '请实现一个公平的数组乱序算法并说明为什么它比 sort 随机更公平。',
    `Fisher-Yates 从后向前遍历，每次从 0 到 i 中随机选一个元素与 i 交换。每个排列概率相等。

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

用 sort(() => Math.random() - 0.5) 会因比较函数不稳定导致分布不均。`,
    [['算法步骤', '40%', '从后向前随机交换'], ['公平性', '40%', '每个排列概率相等'], ['避免 sort', '20%', 'sort 随机分布不均']],
    ['从前向后随机交换导致某些排列概率不均',
     '使用 Math.random() 没有取整',
     '认为 sort + random 是公平乱序'],
    'Fisher-Yates 从后向前随机交换，保证每个排列等概率，比 sort 随机更公平。'),
  Q('CD', 'A', '大数相加的实现思路',
    ['大数相加', '字符串', '算法', '精度'], '5-8 分钟', '中频',
    '请说明如何在不丢失精度的情况下实现两个大整数相加。',
    `将数字转为字符串，从末位逐位相加并处理进位，最后反转结果。适合超出 JavaScript 安全整数范围的计算。

    function addStrings(a, b) {
      let i = a.length - 1, j = b.length - 1, carry = 0, res = '';
      while (i >= 0 || j >= 0 || carry) {
        const sum = (+a[i--] || 0) + (+b[j--] || 0) + carry;
        res = (sum % 10) + res;
        carry = Math.floor(sum / 10);
      }
      return res;
    }`,
    [['字符串逐位', '40%', '从末位相加'], ['进位', '30%', 'carry 处理'], ['边界', '30%', '长度不等和最后进位']],
    ['直接转 number 相加导致精度丢失',
     '没有处理最后进位',
     '结果拼接方向错误导致数字反转'],
    '大数相加将数字作为字符串逐位相加并处理进位，避免超出安全整数范围。'),
  Q('SC', 'A', '设计一个前端请求合并/去重系统',
    ['请求合并', '请求去重', '缓存', '设计'], '5-8 分钟', '中频',
    '请设计一个系统，对相同请求进行合并或去重，减少服务端压力。',
    `合并：将同一时刻的相同请求合并为一个网络请求，结果分发给所有调用方。去重：使用请求 key 缓存正在进行的 Promise，在请求完成前相同 key 直接返回同一 Promise。

    const pending = new Map();
    function request(key, fetcher) {
      if (pending.has(key)) return pending.get(key);
      const promise = fetcher().finally(() => pending.delete(key));
      pending.set(key, promise);
      return promise;
    }`,
    [['合并策略', '40%', '同时请求合并'], ['去重策略', '40%', 'pending Promise 缓存'], ['失效', '20%', '请求完成后清理']],
    ['不同参数的请求被错误合并',
     '请求失败没有清理 pending 导致后续请求永远等待',
     '合并结果没有按请求参数分发'],
    '请求合并/去重系统通过缓存正在进行的 Promise 减少重复请求，注意 key 设计和失败清理。'),
  Q('SC', 'A', '设计一个前端任务调度器',
    ['任务调度', '并发控制', '优先级', '设计'], '5-8 分钟', '中频',
    '请设计一个支持优先级和并发限制的前端任务调度器。',
    `核心：优先队列（最小堆）存储任务，按优先级排序；运行计数器控制并发；任务完成后从队列取出下一个执行。支持任务取消、超时和错误处理。

    class TaskScheduler {
      constructor(max) { this.max = max; this.running = 0; this.queue = new MinHeap((a,b)=>a.priority-b.priority); }
      add(task) { ... }
    }`,
    [['并发控制', '30%', 'max/running 计数'], ['优先级', '30%', '优先队列'], ['生命周期', '40%', '取消、超时、错误']],
    ['没有优先级导致重要任务被阻塞',
     '任务失败后没有重试或降级',
     '并发数为 0 或无限导致资源问题'],
    '前端任务调度器通过优先队列和并发计数管理任务，支持优先级、取消、超时和错误处理。'),
  Q('SC', 'P', '设计一个支持撤销重做的编辑器状态系统',
    ['Undo/Redo', '状态管理', '命令模式', '设计'], '8-12 分钟', '中频',
    '请设计一个文本/图形编辑器的撤销重做机制。',
    `使用命令模式：每个用户操作封装为 execute/undo 命令。维护两个栈：undoStack 和 redoStack。执行新命令时清空 redoStack。每个命令保存足够信息以反向恢复状态。

    class Command { execute() {} undo() {} }
    class Editor { undoStack = []; redoStack = []; execute(cmd) { cmd.execute(); this.undoStack.push(cmd); this.redoStack = []; } undo() { ... } }`,
    [['命令模式', '40%', 'execute/undo'], ['双栈', '40%', 'undoStack/redoStack'], ['状态边界', '20%', '执行新命令清空 redo']],
    ['用深拷贝整个状态保存历史，内存占用大',
     'undo 后没有维护 redo 栈',
     '没有限制历史栈深度导致内存泄漏'],
    'Undo/Redo 可用命令模式封装操作，用 undoStack/redoStack 管理历史，执行新命令时清空 redo。'),
  Q('SC', 'P', '实时协作编辑的 OT 或 CRDT 简版思路',
    ['OT', 'CRDT', '实时协作', '设计'], '8-12 分钟', '低频',
    '请简述操作转换和 CRDT 在实时编辑中的应用思路。',
    `OT：客户端发送操作到服务端，服务端根据并发操作转换后再应用，保证一致性。CRDT：使用满足交换律/结合律/幂等性的数据结构，各副本独立合并即可收敛。

前端通常使用现成库（Yjs、Automerge）实现，核心思路是为每次编辑分配唯一 ID 和位置，冲突时按规则合并。`,
    [['OT', '40%', '操作转换'], ['CRDT', '40%', '无冲突复制数据类型'], ['应用', '20%', 'Yjs/Automerge']],
    ['自己实现完整 OT/CRDT 忽略复杂度',
     '没有唯一标识导致并发编辑冲突无法解决',
     '忽略网络延迟和断线重连状态同步'],
    'OT 通过服务端转换操作保证一致性，CRDT 通过数学性质让副本独立合并收敛；前端常用 Yjs/Automerge。'),
];

const designPatternSpecs = [
  Q('CO', 'B', '单例模式在前端有哪些应用场景？',
    ['单例模式', '全局状态', '设计模式'], '3-5 分钟', '高频',
    '请说明单例模式的特点及前端典型应用。',
    `单例模式保证一个类只有一个实例，并提供全局访问点。前端应用：全局配置对象、日志服务、权限服务、应用状态管理器（如 Redux store 单一实例）、路由实例。

注意：过度使用单例会导致代码耦合和测试困难。`,
    [['唯一实例', '40%', '控制实例数量'], ['全局访问', '30%', '统一入口'], ['前端场景', '30%', '配置、日志、状态管理']],
    ['所有工具类都做成单例',
     '单例模块中持有大量可变全局状态',
     '测试时无法替换单例实例'],
    '单例模式适合全局配置、日志、状态管理等场景，但应避免滥用导致耦合。'),
  Q('CO', 'B', '观察者模式与发布订阅模式有什么区别？',
    ['观察者模式', '发布订阅', '设计模式'], '3-5 分钟', '高频',
    '请比较两者的耦合度和通信方式。',
    `观察者模式中 Subject 直接维护 Observer 列表，Observer 订阅 Subject，二者直接通信。发布订阅模式引入事件中心（Broker），发布者和订阅者不直接依赖，通过主题解耦。

观察者模式耦合稍高，发布订阅模式更灵活但增加中间层。`,
    [['观察者', '40%', 'Subject 直接通知 Observer'], ['发布订阅', '40%', '通过事件中心解耦'], ['耦合度', '20%', '后者耦合更低']],
    ['把两者完全等同',
     '在观察者模式中引入事件中心却不自知',
     '发布订阅中事件名硬编码导致维护困难'],
    '观察者模式直接通信，发布订阅通过事件中心解耦，后者更灵活但增加复杂度。'),
  Q('CO', 'B', '工厂模式解决了什么问题？',
    ['工厂模式', '创建型模式', '封装', '设计模式'], '3-5 分钟', '高频',
    '请说明简单工厂、工厂方法和抽象工厂的区别。',
    `工厂模式将对象创建逻辑封装，调用方无需关心具体类。简单工厂用一个工厂函数根据参数创建对象；工厂方法将创建延迟到子类；抽象工厂创建相关对象族。

前端应用：根据类型创建不同图表组件、不同平台 API 适配器。`,
    [['简单工厂', '30%', '单一工厂函数'], ['工厂方法', '30%', '子类决定创建'], ['抽象工厂', '30%', '创建相关对象族'], ['解耦', '10%', '调用方不依赖具体类']],
    ['工厂类自身变得臃肿包含所有创建逻辑',
     '为每个简单对象都创建工厂增加复杂度',
     '工厂返回类型为 any 失去类型安全'],
    '工厂模式封装对象创建逻辑，简单工厂、工厂方法、抽象工厂适用于不同复杂度，调用方不依赖具体类。'),
  Q('CO', 'B', '策略模式主要解决什么问题？',
    ['策略模式', '条件分支', '设计模式'], '3-5 分钟', '高频',
    '请说明策略模式如何替代大量 if/else 或 switch。',
    `策略模式定义一系列算法，分别封装起来，让它们可互相替换。客户端根据上下文选择策略，避免冗长的条件分支，便于扩展和维护。

    const strategies = {
      wechat: () => {...},
      alipay: () => {...},
    };
    strategies[payType]();`,
    [['算法封装', '40%', '每个策略独立'], ['替换', '30%', '运行时选择'], ['扩展', '30%', '新增策略不修改原有代码']],
    ['策略数量少时仍强行使用策略模式',
     '策略注册中心硬编码所有策略',
     '上下文对象没有提供策略所需数据'],
    '策略模式封装可互换算法，替代大量条件分支，便于新增策略而不修改既有代码。'),
  Q('CO', 'A', '适配器模式在前端如何应用？',
    ['适配器模式', '接口适配', '设计模式'], '3-5 分钟', '中频',
    '请举一个前端使用适配器模式的例子。',
    `适配器模式将一个类的接口转换成客户希望的另一个接口。前端例子：封装统一请求层，适配 fetch、axios、小程序 wx.request；或适配不同地图 SDK 的 API。

    class AxiosAdapter {
      request(config) { return axios(config); }
    }
    class FetchAdapter {
      request(config) { return fetch(config.url, config); }
    }`,
    [['目的', '40%', '接口转换'], ['前端场景', '40%', '请求层、第三方 SDK'], ['解耦', '20%', '调用方不依赖具体库']],
    ['适配器中包含业务逻辑',
     '为每一个小差异都创建适配器',
     '适配后接口仍暴露底层细节'],
    '适配器模式用于转换接口，前端常用于统一请求层或第三方 SDK 适配。'),
  Q('CO', 'A', '装饰器模式在前端有哪些应用？',
    ['装饰器模式', 'AOP', '设计模式', '高阶组件'], '3-5 分钟', '中频',
    '请说明装饰器模式与继承的区别，并举例。',
    `装饰器模式在不改变原对象结构的情况下动态添加职责。与继承相比更灵活。前端应用：高阶组件（HOC）增强组件能力、axios 请求/响应拦截器、日志/权限装饰函数。

    function withLogger(fn) {
      return function(...args) {
        console.log('call', fn.name);
        return fn(...args);
      };
    }`,
    [['动态扩展', '40%', '不改变原对象'], ['继承对比', '30%', '组合优于继承'], ['前端场景', '30%', 'HOC、拦截器']],
    ['装饰器嵌套过深导致调试困难',
     '用装饰器修改原对象内部状态',
     '与代理模式场景混淆'],
    '装饰器模式动态扩展对象职责，前端常用于 HOC、拦截器和日志/权限装饰。'),
  Q('CO', 'A', '代理模式在前端有哪些应用？',
    ['代理模式', 'Proxy', '拦截', '设计模式'], '3-5 分钟', '中频',
    '请说明代理模式的作用，并举前端例子。',
    `代理模式为对象提供代理以控制访问。前端例子：ES6 Proxy 实现响应式数据、图片懒加载占位代理、虚拟代理延迟加载大对象、缓存代理避免重复计算。

    const handler = {
      get(target, key) { console.log('get', key); return target[key]; }
    };
    const proxy = new Proxy(obj, handler);`,
    [['控制访问', '40%', '代理对象拦截操作'], ['前端场景', '40%', '响应式、懒加载、缓存'], ['与装饰器区别', '20%', '侧重访问控制']],
    ['代理对象中修改目标对象语义导致意外行为',
     '所有操作都走 Proxy 造成性能损耗',
     '把 Proxy 和 Reflect 职责混淆'],
    '代理模式通过代理对象控制访问，前端常用于响应式、懒加载和缓存代理。'),
  Q('CO', 'A', '命令模式适合什么场景？',
    ['命令模式', '撤销重做', '队列', '设计模式'], '3-5 分钟', '中频',
    '请说明命令模式的核心角色和前端应用。',
    `命令模式将请求封装为对象，支持参数化、队列、日志和撤销。核心角色：Invoker（调用者）、Command（命令）、Receiver（接收者）、Client。

前端应用：编辑器撤销重做、宏录制、UI 操作队列、Redux action 可视为命令模式变体。`,
    [['封装请求', '40%', '命令对象'], ['支持撤销', '30%', 'execute/undo'], ['前端场景', '30%', '编辑器、Redux action']],
    ['命令对象持有过多状态导致内存占用大',
     '把所有函数调用都封装为命令',
     'Invoker 直接调用 Receiver 方法绕过命令'],
    '命令模式封装请求为对象，支持撤销、队列和日志，前端常用于编辑器和 Redux action。'),
  Q('CO', 'A', '模板方法模式是什么？',
    ['模板方法', '骨架', '设计模式'], '3-5 分钟', '中频',
    '请说明模板方法模式的结构和适用场景。',
    `模板方法模式在基类中定义算法骨架，将某些步骤延迟到子类实现。基类控制流程，子类定制细节。适合流程固定但部分步骤可变的场景，如组件生命周期、表单验证流程。

    abstract class DataFetcher {
      async fetch() {
        this.beforeFetch();
        const data = await this.request();
        this.afterFetch(data);
      }
      abstract request();
    }`,
    [['算法骨架', '40%', '基类定义流程'], ['延迟实现', '30%', '子类实现步骤'], ['场景', '30%', '生命周期、固定流程']],
    ['基类包含过多具体逻辑导致子类难以扩展',
     '模板方法中步骤划分不清晰',
     '把模板方法和策略模式混淆'],
    '模板方法模式在基类定义算法骨架，子类实现可变步骤，适合流程固定但细节变化的场景。'),
  Q('CO', 'A', '访问者模式解决了什么问题？',
    ['访问者模式', '双分派', '设计模式'], '3-5 分钟', '低频',
    '请说明访问者模式的适用场景和优缺点。',
    `访问者模式将数据结构与作用于结构上的操作分离，适合需要对一组不同类型对象执行多种不同操作，且对象结构相对稳定的场景。如 AST 遍历（babel 插件）、报表生成。

缺点：增加新元素类型困难，破坏封装。`,
    [['分离操作', '40%', '数据结构与操作解耦'], ['适用场景', '30%', 'AST、报表'], ['缺点', '30%', '新增元素困难']],
    ['在对象结构频繁变化的场景使用访问者模式',
     '访问者暴露元素内部状态破坏封装',
     '把访问者模式和观察者模式混淆'],
    '访问者模式将数据结构与操作分离，适合 AST 遍历等对象结构稳定、操作多样的场景。'),
  Q('CO', 'P', '前端框架中体现了哪些设计模式？',
    ['前端框架', '设计模式', 'React', 'Vue'], '5-8 分钟', '中频',
    '请结合 React/Vue 说明常见设计模式的应用。',
    `React：组合模式（组件组合）、高阶组件/渲染属性/自定义 Hooks（装饰器/策略）、Context（依赖注入）、Virtual DOM（享元/代理）。Vue：响应式系统（观察者/代理）、指令（装饰器）、组件插槽（策略/模板方法）、provide/inject（依赖注入）。`,
    [['React', '40%', 'HOC/Hook/Context/组合'], ['Vue', '40%', '响应式/指令/插槽/provide-inject'], ['分析深度', '20%', '能举例说明']],
    ['只罗列模式名称没有结合框架',
     '把框架所有特性都说成是单例模式',
     '混淆观察者模式和发布订阅模式在前端的具体体现'],
    '前端框架中体现了组合、装饰器、观察者、代理、依赖注入等多种设计模式。'),
  Q('CO', 'P', '什么是依赖注入与 IoC 容器？',
    ['依赖注入', 'IoC', '控制反转', '设计模式'], '5-8 分钟', '中频',
    '请说明依赖注入的作用和前端应用场景。',
    `依赖注入（DI）将依赖从外部传入，而不是在内部创建，降低模块耦合。IoC 容器负责创建和管理依赖生命周期。前端应用：Angular 的 DI 系统、Vue provide/inject、React Context + 服务实例、测试时注入 mock 依赖。`,
    [['依赖注入', '40%', '外部传入依赖'], ['IoC 容器', '30%', '管理依赖生命周期'], ['前端应用', '30%', 'Angular/Vue/React DI']],
    ['所有依赖都通过全局单例获取',
     'DI 配置过于复杂导致可读性下降',
     '测试时不利用 DI 注入 mock'],
    '依赖注入将依赖外部化，降低耦合，IoC 容器管理依赖，前端框架如 Angular、Vue、React 都支持。'),
  Q('CO', 'P', '状态模式与状态机有什么区别？',
    ['状态模式', '状态机', '设计模式'], '3-5 分钟', '中频',
    '请说明状态模式的结构和有限状态机的应用场景。',
    `状态模式将每个状态封装为类，上下文在不同状态间切换，行为随状态改变。状态机更抽象，定义状态、事件和转移规则。状态模式是实现状态机的一种方式。

前端应用：订单状态流转、播放器状态（播放/暂停/缓冲）、表单分步 wizard。`,
    [['状态模式', '40%', '状态类封装行为'], ['状态机', '40%', '状态、事件、转移'], ['应用', '20%', '订单、播放器']],
    ['状态转移规则分散在业务代码中',
     '为每个小状态都创建类导致过度设计',
     '没有处理无效状态转移'],
    '状态模式将状态行为封装，状态机定义状态转移；前端常用于订单、播放器、表单等状态流转。'),
  Q('CO', 'P', '组合模式在前端组件树中如何应用？',
    ['组合模式', '组件树', '递归', '设计模式'], '3-5 分钟', '中频',
    '请说明组合模式如何统一处理单个对象和组合对象。',
    `组合模式让客户端以一致的方式处理单个对象和组合对象。前端组件树中，容器组件和叶子组件实现相同接口（props/children），如 Menu 和 MenuItem、Tree 和 TreeNode。

    <Tree>
      <TreeNode label="A">
        <TreeNode label="A1" />
      </TreeNode>
    </Tree>`,
    [['统一接口', '40%', '一致处理叶子和容器'], ['组件树', '40%', 'Menu/Tree 等递归组件'], ['递归渲染', '20%', 'children 递归']],
    ['叶子组件和容器组件接口不一致',
     '递归没有终止条件',
     '在不需要统一操作的场景强行组合'],
    '组合模式统一处理叶子和容器，前端组件树如 Menu、Tree 都体现了该模式。'),
  Q('CO', 'P', '责任链模式适合什么场景？',
    ['责任链', '审批流', '中间件', '设计模式'], '3-5 分钟', '中频',
    '请说明责任链模式的结构和前端应用。',
    `责任链模式让多个对象都有机会处理请求，请求沿链传递直到被处理。前端应用：请求拦截器链（axios interceptors）、Koa 中间件、表单校验规则链、审批流。

    axios.interceptors.request.use(handler1);
    axios.interceptors.request.use(handler2);`,
    [['链式传递', '40%', '请求沿链传递'], ['解耦', '30%', '发送方和处理方解耦'], ['前端场景', '30%', '拦截器、中间件']],
    ['链过长导致调试困难',
     '没有处理链尾未被处理的情况',
     '链中节点直接互相依赖'],
    '责任链模式让请求沿处理链传递，前端常用于请求拦截器、中间件和审批流。'),
  Q('CO', 'P', '备忘录模式在前端有哪些应用？',
    ['备忘录模式', '快照', '撤销', '设计模式'], '3-5 分钟', '中频',
    '请说明备忘录模式的作用及前端应用。',
    `备忘录模式在不破坏封装的前提下捕获对象内部状态，便于后续恢复。前端应用：编辑器撤销/重做、表单草稿保存、状态管理的时间旅行调试、路由历史管理。

注意内存占用，应限制快照数量。`,
    [['捕获状态', '40%', '保存对象内部状态'], ['恢复', '30%', '回滚到之前状态'], ['前端场景', '30%', '撤销、草稿、时间旅行']],
    ['保存整个应用状态导致内存爆炸',
     '备忘录暴露对象私有状态破坏封装',
     '没有限制快照数量'],
    '备忘录模式保存对象状态以便恢复，前端用于撤销、草稿和时间旅行，需注意内存控制。'),
  Q('CO', 'P', '桥接模式解决了什么问题？',
    ['桥接模式', '抽象与实现', '设计模式'], '3-5 分钟', '低频',
    '请说明桥接模式如何分离抽象和实现。',
    `桥接模式将抽象部分与实现部分分离，使它们可以独立变化。适合多维度变化的场景，如不同平台渲染（DOM/Canvas/SVG）和不同图表类型（柱状图/折线图）。

    class Chart { constructor(renderer) { this.renderer = renderer; } draw() { ... } }`,
    [['抽象与实现分离', '50%', '独立变化'], ['多维度', '30%', '类型与渲染器组合'], ['前端场景', '20%', '跨平台渲染']],
    ['抽象和实现仍强耦合',
     '为每种组合创建子类导致类爆炸',
     '把桥接模式和适配器模式混淆'],
    '桥接模式分离抽象与实现，使它们独立变化，适合多维度变化的渲染器/平台适配。'),
  Q('SC', 'A', '用策略模式实现一个表单校验器',
    ['策略模式', '表单校验', '设计模式'], '5-8 分钟', '中频',
    '请设计一个可扩展的表单校验器。',
    `定义校验规则策略：required、minLength、maxLength、email、phone 等。校验器遍历字段配置，调用对应策略函数，返回错误信息。

    const rules = {
      required: v => v !== '' || '必填',
      email: v => /\S+@\S+\.\S+/.test(v) || '邮箱格式错误',
    };
    function validate(values, schema) { ... }`,
    [['策略封装', '40%', '每个规则独立'], ['可扩展', '30%', '新增规则不修改核心'], ['错误收集', '30%', '返回字段级错误']],
    ['校验逻辑写死在 validate 函数中',
     '规则函数签名不一致',
     '没有支持异步校验'],
    '用策略模式实现表单校验器，将每条规则封装为策略，便于扩展和维护。'),
  Q('SC', 'A', '用职责链模式实现一个审批流',
    ['职责链', '审批流', '设计模式'], '5-8 分钟', '中频',
    '请设计一个根据金额自动流转到不同审批人的流程。',
    `每个审批节点封装为处理者，判断自己能否处理当前请求，不能则传递给下一个节点。例如：小于 1000 直属经理审批，1万以内部门经理审批，超过 1万 总监审批。

    class Approver {
      setNext(next) { this.next = next; }
      handle(request) { if (this.canHandle(request)) return this.approve(request); return this.next?.handle(request); }
    }`,
    [['链节点', '40%', '每个审批人作为处理者'], ['流转逻辑', '30%', '不能处理则传递'], ['可扩展', '30%', '新增审批级别']],
    ['审批逻辑分散在 if/else 中',
     '链没有尾部处理导致请求丢失',
     '节点顺序硬编码无法配置'],
    '审批流可用职责链模式实现，每个审批节点判断能否处理，不能则传递给下一节点。'),
  Q('SC', 'R', '如何在大型前端项目中选择与应用设计模式？',
    ['设计模式', '选型', '架构', '前端'], '10-15 分钟', '中频',
    '请说明设计模式选型的原则、常见误区和落地步骤。',
    `原则：先理解问题，再选择模式；优先简单方案；组合优于继承；关注可测试性和可维护性。误区：为模式而模式、过度设计、盲目套用。

落地：1) 识别重复变化和扩展点；2) 用模式封装变化；3) 团队统一术语；4) 在代码评审中检查模式使用是否恰当；5) 保留重构空间。`,
    [['问题驱动', '30%', '先有问题再选模式'], ['避免过度设计', '30%', '简单优先'], ['团队落地', '40%', '统一术语、CR、重构']],
    ['所有代码都强行套用设计模式',
     '为了使用新学到的模式而重构稳定代码',
     '团队成员对同一模式理解不一致'],
    '大型前端项目应问题驱动选择模式，避免过度设计，统一术语并在代码评审中检查。'),
];

module.exports = {
  jsSpecs,
  tsSpecs,
  browserSpecs,
  networkSpecs,
  securitySpecs,
  htmlCssSpecs,
  a11ySpecs,
  algorithmSpecs,
  designPatternSpecs,
};
