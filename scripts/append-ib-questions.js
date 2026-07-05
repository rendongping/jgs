#!/usr/bin/env node
/**
 * 批量追加面试题到 interview-bank/by-domain/*.md
 * 规则：
 * - 读取 level-01-foundation 下各领域的 03-面试题.md 或自定义数据
 * - 生成符合 SCHEMA.md 的完整题目 Markdown
 * - 按难度插入对应章节，更新题数统计
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IB_DIR = path.join(ROOT, 'interview-bank', 'by-domain');
const LEVEL_DIR = path.join(ROOT, 'level-01-foundation');

const DOMAIN_INFO = {
  '01': { name: 'JavaScript', dir: 'F01-javascript' },
  '02': { name: 'TypeScript', dir: 'F02-typescript' },
  '03': { name: 'Browser', dir: 'F03-browser' },
  '04': { name: '计算机网络', dir: 'F04-network' },
  '05': { name: 'Web 安全', dir: 'F05-security' },
  '06': { name: 'HTML/CSS', dir: 'F06-html-css' },
  '07': { name: '可访问性', dir: 'F07-a11y' },
  '08': { name: '数据结构与算法', dir: 'F08-data-structures-algorithms' },
  '09': { name: '设计模式', dir: 'F09-design-patterns' },
};

const SECTION_LEVEL = {
  '基础题': 'B',
  '进阶题': 'A',
  '深入题': 'P',
  '架构题': 'R',
};

const LEVEL_SECTION = {
  B: '基础题',
  A: '进阶题',
  P: '深入题',
  R: '架构题',
};

const TYPE_NAME = {
  CO: '概念题',
  CA: '代码分析题',
  CD: '手写代码题',
  SC: '场景设计题',
  SD: '系统设计题',
  FS: '框架原理题',
  PE: '性能优化题',
  SE: '安全题',
  EN: '工程化题',
  SS: '软技能题',
  CP: '综合开放题',
};

const DIFFICULTY = {
  B: '🟢 基础',
  A: '🟡 进阶',
  P: '🔴 深入',
  R: '⚫ 架构',
};

const POSITIONS = {
  B: '初级',
  A: '初级 / 高级',
  P: '高级 / 专家',
  R: '专家 / 架构师',
};

// 记录每个 domain-type-level 下一个可用序号
const nextSeqMap = new Map();

function getNextSeq(domain, type, level) {
  const key = `${domain}-${type}-${level}`;
  if (!nextSeqMap.has(key)) {
    const filePath = path.join(IB_DIR, `${domain}-${DOMAIN_INFO[domain].name.toLowerCase().replace(/\//g, '-')}.md`);
    // 实际文件名中 domain 为 01-javascript 等
    const realFile = path.join(IB_DIR, `${domain}-${getDomainFileSlug(domain)}.md`);
    const text = fs.existsSync(realFile) ? fs.readFileSync(realFile, 'utf8') : '';
    const re = new RegExp(`FB-${domain}-${type}-${level}-(\\d{3})`, 'g');
    let max = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      max = Math.max(max, parseInt(m[1], 10));
    }
    nextSeqMap.set(key, max + 1);
  }
  const seq = nextSeqMap.get(key);
  nextSeqMap.set(key, seq + 1);
  return seq;
}

function getDomainFileSlug(domain) {
  const map = {
    '01': 'javascript',
    '02': 'typescript',
    '03': 'browser',
    '04': 'network',
    '05': 'security',
    '06': 'html-css',
    '07': 'a11y',
    '08': 'algorithms',
    '09': 'design-patterns',
  };
  return map[domain];
}

function formatId(domain, type, level, seq) {
  return `FB-${domain}-${type}-${level}-${String(seq).padStart(3, '0')}`;
}

function parseLevelQuestion(dir, num) {
  const file = path.join(LEVEL_DIR, dir, '03-面试题.md');
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  let start = -1;
  let end = lines.length;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^###\s*([0-9]+)[\.、]/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n === num) start = i;
      else if (start !== -1) {
        end = i;
        break;
      }
    }
  }
  if (start === -1) return null;
  const block = lines.slice(start, end).join('\n');
  // 标题
  const titleMatch = block.match(/^###\s*[0-9]+[\.、]\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : '';
  // 拆分参考答案与评分维度
  const refMatch = block.match(/\*\*参考答案\*\*：\s*([\s\S]*?)(?=\*\*评分维度\*\*|$)/);
  const scoringMatch = block.match(/\*\*评分维度\*\*：\s*([\s\S]*?)(?=\n---|$)/);
  let answerBody = '';
  let scoring = [];
  if (refMatch) {
    answerBody = refMatch[1].trim();
  } else {
    // 没有“参考答案”标题时，取标题之后到评分维度之前
    const bodyMatch = block.match(/^###[^\n]+\n+([\s\S]*?)(?=\*\*评分维度\*\*|$)/);
    answerBody = bodyMatch ? bodyMatch[1].trim() : '';
  }
  if (scoringMatch) {
    scoring = scoringMatch[1]
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.startsWith('-'))
      .map(s => s.replace(/^-\s*/, '').trim());
  }
  return { title, answerBody, scoring };
}

function formatScoring(scoring) {
  return scoring
    .map(item => {
      if (typeof item === 'string') return `- ${item}`;
      const [dim, pct, detail] = item;
      const tail = detail ? `：${detail}` : '';
      return `- ${dim}（${pct}）${tail}`;
    })
    .join('\n');
}

function normalizeAnswer(body) {
  // 移除行首多余的空行，确保代码块等保留
  return body.replace(/\n{3,}/g, '\n\n').trim();
}

function buildQuestion(spec, domain) {
  let title, answerBody, scoring;
  if (spec.source === 'level') {
    const info = DOMAIN_INFO[domain];
    const parsed = parseLevelQuestion(info.dir, spec.num);
    if (!parsed) throw new Error(`未找到 level 题目 ${info.dir} #${spec.num}`);
    title = spec.title || parsed.title;
    answerBody = spec.answer || normalizeAnswer(parsed.answerBody);
    scoring = spec.scoring || parsed.scoring;
  } else {
    title = spec.title;
    answerBody = spec.answer;
    scoring = spec.scoring;
  }
  const seq = getNextSeq(domain, spec.type, spec.level);
  const id = formatId(domain, spec.type, spec.level, seq);
  const typeName = TYPE_NAME[spec.type];
  const diff = DIFFICULTY[spec.level];
  const positions = spec.positions || POSITIONS[spec.level];
  const domainName = DOMAIN_INFO[domain].name;
  const tags = spec.tags.join('、');
  const mistakes = spec.mistakes.map(m => `- ${m}`).join('\n');
  const scoringBlock = formatScoring(scoring);

  const parts = [
    `### ${id}：${title}`,
    '',
    `**题型**：${typeName}`,
    `**难度**：${diff}`,
    `**岗位层级**：${positions}`,
    `**面试知识域**：${domain} ${domainName}`,
    `**标签**：${tags}`,
    `**出现频率**：${spec.frequency}`,
    `**预计回答时长**：${spec.duration}`,
    '',
    `**题目描述**：`,
    spec.desc,
    '',
    `**参考答案**：`,
    '',
    answerBody,
    '',
    `**评分维度**：`,
    scoringBlock,
    '',
    `**常见错误**：`,
    mistakes,
    '',
    `**口头回答版**：`,
    `> ${spec.oral}`,
  ];
  return parts.join('\n');
}

function insertQuestions(filePath, questionsByLevel) {
  const text = fs.readFileSync(filePath, 'utf8');

  const sectionRegex = /^## (基础题|进阶题|深入题|架构题).*$/mg;
  const sections = [];
  let m;
  while ((m = sectionRegex.exec(text)) !== null) sections.push({ name: m[1], index: m.index, line: m[0] });
  if (sections.length === 0) throw new Error('未找到章节标题');

  let result = text.slice(0, sections[0].index);
  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const nextIndex = i + 1 < sections.length ? sections[i + 1].index : text.length;
    const segment = text.slice(sec.index, nextIndex);
    const lvl = SECTION_LEVEL[sec.name];
    const blocks = questionsByLevel[lvl] || [];
    const block = blocks.join('\n\n');

    const headingEnd = segment.indexOf('\n') + 1;
    const body = segment.slice(headingEnd);
    const nextHash = body.search(/^## /m);

    let newBody;
    if (nextHash === -1) {
      const sepMatch = body.match(/\n---\n\s*$/);
      if (sepMatch && block) {
        const idx = sepMatch.index;
        const tail = body.slice(idx).replace(/^\n---\n\s*/, '');
        newBody = body.slice(0, idx) + '\n---\n' + block + '\n---\n\n' + tail;
      } else {
        newBody = body + (block ? '\n---\n' + block + '\n---\n\n' : '');
      }
    } else {
      const beforeNext = body.slice(0, nextHash);
      const sepMatch = beforeNext.match(/\n---\n\s*$/);
      if (sepMatch && block) {
        const idx = sepMatch.index;
        newBody = beforeNext.slice(0, idx) + '\n---\n' + block + '\n---\n\n' + body.slice(nextHash);
      } else if (block) {
        newBody = beforeNext + '\n---\n' + block + '\n---\n\n' + body.slice(nextHash);
      } else {
        newBody = body;
      }
    }

    result += sec.line + '\n' + newBody;
  }
  return result;
}

function processDomain(domain, specs) {
  const slug = getDomainFileSlug(domain);
  const filePath = path.join(IB_DIR, `${domain}-${slug}.md`);
  const byLevel = { B: [], A: [], P: [], R: [] };
  for (const spec of specs) {
    const md = buildQuestion(spec, domain);
    byLevel[spec.level].push(md);
  }
  const newText = insertQuestions(filePath, byLevel);
  fs.writeFileSync(filePath, newText, 'utf8');
  const counts = { B: byLevel.B.length, A: byLevel.A.length, P: byLevel.P.length, R: byLevel.R.length };
  console.log(`✅ ${domain} ${DOMAIN_INFO[domain].name}: 新增 ${specs.length} 题`, counts);
}

module.exports = {
  processDomain,
  DOMAIN_INFO,
};

// 实际执行放在文件末尾，由填充好数据的脚本 require 后调用
if (require.main === module) {
  // 数据将在后续步骤中写入本文件并执行
  console.log('请在本文件末尾调用 processDomain 并传入题目数据');
}


// ===================== 题目数据 =====================

function L(num, type, level, title, tags, duration, frequency, mistakes, oral) {
  return {
    source: 'level',
    num,
    type,
    level,
    title,
    tags,
    duration,
    frequency,
    desc: title,
    mistakes,
    oral,
  };
}

function C(type, level, title, tags, duration, frequency, desc, answer, scoring, mistakes, oral) {
  return {
    source: 'custom',
    type,
    level,
    title,
    tags,
    duration,
    frequency,
    desc,
    answer,
    scoring,
    mistakes,
    oral,
  };
}

const jsSpecs = [
  L(8, 'CD', 'A', '手写一个 Promise.all，并说明其特点',
    ['Promise', 'Promise.all', '异步', '手写代码'], '8-10 分钟', '高频',
    ['使用 forEach 时未正确处理异步完成顺序，导致结果顺序错乱',
     '未处理输入为空数组的情况，导致永远无法 resolve',
     'reject 后没有停止后续 Promise 的执行，造成不必要的资源消耗'],
    'Promise.all 接收可迭代对象，所有 Promise 都 resolve 后按输入顺序返回结果数组；只要有一个 reject 就立即 reject。实现时我用计数器记录已完成数量，并用索引保证结果顺序。'),
  L(9, 'CO', 'A', '如何理解 `this` 的绑定规则？优先级是怎样的？',
    ['this', '绑定规则', 'call', 'apply', 'new'], '5-8 分钟', '高频',
    ['把 this 指向理解为函数定义位置而不是调用位置',
     '认为箭头函数的 this 可以通过 call/apply/bind 改变',
     '说不出 new 绑定与显式绑定的优先级关系'],
    'this 由调用方式决定：默认、隐式、显式、new 绑定四种规则，优先级从高到低依次是 new > 显式 > 隐式 > 默认。箭头函数没有自己的 this，不纳入这个优先级。'),
  L(10, 'CO', 'A', '原型链是什么？`__proto__`、`prototype`、`constructor` 的关系？',
    ['原型链', 'prototype', '__proto__', 'constructor'], '5-8 分钟', '高频',
    ['把 __proto__ 和 prototype 混为一谈',
     '认为所有对象都有 prototype 属性',
     '说不清属性查找沿着 __proto__ 向上直到 null 的过程'],
    '每个对象都有 __proto__ 指向其原型；构造函数有 prototype 指向原型对象；原型对象有 constructor 指回构造函数。查找属性时沿 __proto__ 向上直到 null，这就是原型链。'),
  L(11, 'CO', 'A', 'ES6 模块与 CommonJS 模块有什么区别？',
    ['ES Module', 'CommonJS', '静态导入', 'Tree Shaking'], '5-8 分钟', '高频',
    ['认为 ESM 和 CommonJS 都是运行时加载',
     '混淆 ESM 活绑定与 CommonJS 值拷贝的差异',
     '说不出 ESM 支持 Tree Shaking 的根本原因'],
    'ESM 是静态编译时确定依赖，支持 Tree Shaking，导出的是只读引用；CommonJS 是运行时同步加载，导出的是值的拷贝。循环依赖时，ESM 的活绑定能让后续修改被感知。'),
  L(12, 'CA', 'A', '解释 `async/await` 的执行过程，下面代码输出什么？',
    ['async', 'await', '事件循环', '微任务'], '5-8 分钟', '高频',
    ['认为 await 后面代码会立即同步执行',
     '把 async 函数整体当成微任务',
     '忽略 await 右侧表达式的同步执行部分'],
    'async 函数调用后立即执行同步部分；await 右侧表达式先同步执行，await 后面的代码被放入微任务队列，等当前宏任务和已有微任务清空后再执行。'),
  L(13, 'CO', 'A', '解释一下 JavaScript 的垃圾回收机制，常见内存泄漏有哪些？',
    ['垃圾回收', 'V8', '内存泄漏', '标记清除'], '5-8 分钟', '高频',
    ['把内存泄漏简单归因于闭包，忽略定时器和事件监听',
     '说不清新生代 Scavenge 与老生代标记清除/整理的区别',
     '认为设置变量为 null 就能立即回收其引用对象'],
    'V8 使用可达性分析的标记清除，并配合分代回收。常见泄漏包括未清除的定时器、事件监听、闭包持有的大对象、DOM 引用以及 console.log 缓存。'),
  L(14, 'CD', 'A', '什么是函数柯里化（Currying）？手写实现。',
    ['柯里化', '高阶函数', '函数式编程', '手写代码'], '5-8 分钟', '中频',
    ['实现的柯里化只支持单参数分步，不支持一次传多个参数',
     '没有复用原函数的 length 属性来判断参数是否足够',
     '忽略 this 绑定，导致柯里化后的方法调用上下文丢失'],
    '柯里化是把多参数函数转成连续接收单一参数的函数。实现时通过判断已传参数个数是否达到 fn.length 来决定返回新函数还是执行原函数，并用 apply 保留 this。'),
  L(15, 'CO', 'P', 'V8 引擎是如何执行 JavaScript 的？解释 Ignition、TurboFan、隐藏类、内联缓存。',
    ['V8', 'Ignition', 'TurboFan', '隐藏类', '内联缓存'], '8-12 分钟', '中频',
    ['认为 JavaScript 一开始就被编译为机器码',
     '说不清 Ignition 字节码与 TurboFan 优化机器码的协作关系',
     '不知道对象结构变化会导致反优化（deopt）'],
    'V8 先解析为 AST，Ignition 解释执行字节码并收集类型反馈；热点代码由 TurboFan 编译为优化机器码。隐藏类和内联缓存用于加速属性访问，结构不稳定会触发反优化。'),
  L(16, 'CD', 'P', '设计一个支持取消的 Promise，并解释实现原理。',
    ['Promise', '取消', 'AbortController', '异步'], '8-12 分钟', '中频',
    ['取消后仍然 resolve 了原 Promise，没有真正阻止结果消费',
     '没有处理取消后异步结果到达的状态，导致竞态',
     '只知道包装 Promise 的方案，不了解标准 AbortController 的用法'],
    '可取消 Promise 通常通过包装原 Promise，暴露 cancel 标志位，在 then 回调中根据标志决定 resolve/reject。现代推荐用 AbortController 配合 fetch 等 API 实现标准化取消。'),
  L(17, 'CD', 'P', '如何实现一个响应式系统（类似 Vue3 的 reactive）？',
    ['响应式', 'Proxy', '依赖收集', 'effect'], '10-15 分钟', '高频',
    ['只拦截 get/set，没有处理嵌套对象和数组方法',
     '依赖收集没有使用 WeakMap/Map/Set 分层，导致内存泄漏',
     '没有考虑 effect 嵌套和依赖清理，触发不必要的更新'],
    '用 Proxy 拦截对象的 get/set，在 get 时收集当前 activeEffect，在 set 时触发相关 effect。依赖结构通常用 WeakMap(target -> Map(key -> Set(effects))) 组织。'),
  L(18, 'CO', 'P', '解释 JavaScript 的模块循环依赖问题，ESM 和 CommonJS 分别是如何处理的？',
    ['循环依赖', 'ES Module', 'CommonJS', '模块加载'], '5-8 分钟', '中频',
    ['认为 CommonJS 的循环依赖能拿到完整 exports',
     '不清楚 ESM 的活绑定在循环依赖时的表现',
     '给不出避免循环依赖的实际方案，如依赖倒置或合并模块'],
    'CommonJS 循环依赖时，后加载模块拿到的是先加载模块的不完整 exports 拷贝。ESM 静态分析并按图执行，导出是活引用，但仍可能访问到未初始化的绑定。'),
  L(19, 'CO', 'P', '解释一下 Proxy 和 Reflect，为什么 Vue3 选择 Proxy 而不是 Object.defineProperty？',
    ['Proxy', 'Reflect', '响应式', 'Object.defineProperty'], '5-8 分钟', '高频',
    ['认为 Proxy 和 Reflect 功能重复，说不出 Reflect 的规范作用',
     '只说 Proxy 性能好，但讲不出具体优化点',
     '忽略 Object.defineProperty 无法监听新增/删除属性、数组索引等局限'],
    'Proxy 可拦截 13 种对象操作，Reflect 提供对应默认行为。Vue3 选 Proxy 是因为它能监听属性增删、数组索引、Map/Set，且不需要递归初始化所有属性。'),
  L(20, 'SD', 'R', '如何设计一个高可靠的前端埋点 SDK？从错误监控、性能采集、数据上报等角度分析。',
    ['埋点', 'SDK', '错误监控', '性能采集', '数据上报'], '15-25 分钟', '中频',
    ['只罗列 API，没有考虑采样率、限流和失败重试',
     '忽略上报对业务主线程的阻塞，未使用 sendBeacon 或异步队列',
     '没有设计敏感信息脱敏和用户授权机制'],
    '高可靠埋点 SDK 需要分采集层、队列层、上报层。采集层用 window.onerror、PerformanceObserver 等；上报层用 sendBeacon、批量合并、失败重试、本地持久化，并控制采样率。'),
  L(21, 'CD', 'P', '手写一个符合 Promise/A+ 规范的 Promise，关键点有哪些？',
    ['Promise/A+', '手写代码', '状态机', '微任务'], '15-25 分钟', '中频',
    ['then 没有返回新 Promise，破坏链式调用',
     'then 回调没有异步执行，导致执行顺序错误',
     '没有处理 thenable 和循环引用，不符合 A+ 规范'],
    '手写 Promise 需要三种状态、状态不可逆、then 返回新 Promise、回调异步执行、支持 thenable 并检测循环引用，还要提供 catch/finally 等常用 API。'),
  L(22, 'CO', 'A', '什么是 Iterator / Iterable 协议？如何让一个对象支持 `for…of`？',
    ['Iterator', 'Iterable', 'Symbol.iterator', 'for…of'], '3-5 分钟', '中频',
    ['把可迭代和数组混为一谈',
     '实现的 next 没有返回 { value, done } 格式',
     '说不清 for…of 在自定义对象和生成器中的应用'],
    'Iterable 协议要求对象实现 Symbol.iterator 返回 Iterator；Iterator 协议要求 next 返回 { value, done }。为对象添加 Symbol.iterator 即可让它支持 for…of。'),
  L(23, 'CO', 'P', '什么是 Error Cause？在实际项目中如何构建分层的错误处理体系？',
    ['Error Cause', '错误处理', 'Error Boundary', '监控上报'], '5-8 分钟', '中频',
    ['只把错误信息字符串拼接，丢失原始错误堆栈',
     '没有区分业务错误、框架错误和未处理错误',
     '忽略错误按严重等级分发到不同通道（用户提示、日志、告警）'],
    'Error Cause 允许在创建 Error 时通过 cause 保留原始错误，便于追溯根因。分层体系通常包括业务层提示降级、框架层 Error Boundary、全局层 onerror/unhandledrejection 上报。'),
  C('CD', 'B', '手写实现 `new` 操作符',
    ['new', '手写代码', '原型链', '构造函数'], '5-8 分钟', '中频',
    '请实现一个 `myNew(Constructor, ...args)` 函数，效果与 `new Constructor(...args)` 一致。',
    `核心步骤：创建空对象、将对象原型链接到构造函数的 prototype、以该对象为上下文执行构造函数、如果构造函数返回对象则返回该对象，否则返回新对象。\n\n\`\`\`js\nfunction myNew(Constructor, ...args) {\n  const obj = Object.create(Constructor.prototype);\n  const result = Constructor.apply(obj, args);\n  return result !== null && (typeof result === 'object' || typeof result === 'function') ? result : obj;\n}\n\`\`\``,
    [['步骤完整性','40%','是否覆盖创建对象、绑定原型、执行构造函数、返回判断'],['边界处理','30%','是否处理构造函数返回非对象/函数的情况'],['代码可运行','30%','示例能否正确构造实例']],
    ['忘记用 Object.create 设置原型，而是直接 {}',
     '没有判断构造函数返回对象的情况',
     '用箭头函数作为构造函数测试，忽略箭头函数不能作为构造器'],
    'new 的本质是创建一个继承构造函数 prototype 的新对象，以该对象为 this 执行构造函数，并根据返回值的类型决定最终返回对象。'),
  C('CA', 'B', '为什么 `0.1 + 0.2 !== 0.3`？如何安全比较浮点数？',
    ['浮点数', '精度', 'Number.EPSILON', 'IEEE 754'], '3-5 分钟', '高频',
    '请解释 `0.1 + 0.2` 在 JavaScript 中不等于 `0.3` 的原因，并给出安全比较两个浮点数是否相等的方法。',
    `JavaScript 使用 IEEE 754 双精度浮点数表示数字。0.1 和 0.2 在二进制下是无限循环小数，存储时产生舍入误差，相加后结果约为 0.30000000000000004。\n\n安全比较：\n\n\`\`\`js\nfunction equal(a, b, epsilon = Number.EPSILON) {\n  return Math.abs(a - b) < epsilon;\n}\n\`\`\``,
    [['原理解释','40%','能否说出 IEEE 754 与二进制表示的舍入'],['比较方法','40%','是否使用误差范围而非 ==='],['边界意识','20%','是否意识到金融计算应使用整数分']],
    ['直接用 === 比较浮点数结果',
     '认为 toFixed 后再比较是绝对安全的',
     '忽略不同数量级下 epsilon 应该相对缩放'],
    '因为二进制浮点表示无法精确存储 0.1 和 0.2，相加后存在舍入误差。比较浮点数应使用误差范围，如 Math.abs(a - b) < Number.EPSILON。'),
  C('CO', 'B', '`Object.create` 和 `Object.assign` 分别适合什么场景？',
    ['Object.create', 'Object.assign', '对象拷贝', '原型'], '3-5 分钟', '中频',
    '请比较 `Object.create` 与 `Object.assign` 的用途、输出结果差异和典型使用场景。',
    `Object.create(proto) 创建一个以 proto 为原型的新空对象，适合显式指定原型链或创建纯净对象。\n\nObject.assign(target, ...sources) 把源对象的可枚举自有属性浅拷贝到目标对象，返回 target，适合对象合并或浅拷贝。\n\n\`\`\`js\nconst base = { x: 1 };\nconst a = Object.create(base); // a.__proto__ === base, a 自身没有 x\nconst b = Object.assign({}, base); // b 自身有 x: 1\n\`\`\``,
    [['语义区分','40%','是否清楚原型设置 vs 属性拷贝'],['浅拷贝陷阱','30%','是否提到嵌套对象共享引用'],['场景选择','30%','能否举例说明分别何时使用']],
    ['用 Object.create 做浅拷贝，忽略它创建的是新对象且原型指向源对象',
     '用 Object.assign 做深拷贝',
     '认为 Object.assign 会复制不可枚举或继承属性'],
    'Object.create 用于指定原型创建新对象；Object.assign 用于浅拷贝/合并对象的可枚举自有属性。嵌套对象在 assign 后仍共享引用。'),
  C('CD', 'A', '手写防抖（debounce）和节流（throttle）函数',
    ['防抖', '节流', '性能优化', '手写代码'], '8-12 分钟', '高频',
    '请分别实现 debounce 和 throttle，要求支持首次立即执行、取消定时器等可选配置。',
    `防抖：事件停止触发 wait 毫秒后才执行；节流：每隔 wait 毫秒最多执行一次。\n\n\`\`\`js\nfunction debounce(fn, wait, immediate = false) {\n  let timer = null;\n  return function (...args) {\n    const callNow = immediate && !timer;\n    clearTimeout(timer);\n    timer = setTimeout(() => {\n      timer = null;\n      if (!immediate) fn.apply(this, args);\n    }, wait);\n    if (callNow) fn.apply(this, args);\n  };\n}\n\nfunction throttle(fn, wait) {\n  let last = 0;\n  return function (...args) {\n    const now = Date.now();\n    if (now - last >= wait) {\n      last = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\`\`\``,
    [['防抖实现','35%','是否正确使用定时器并支持 immediate'],['节流实现','35%','是否用时间戳或定时器控制频率'],['边界处理','30%','是否考虑 this、参数传递和取消']],
    ['防抖实现中没有保存 this 和参数',
     '节流使用时间戳方案时没有处理停止触发后再执行一次的需求',
     '没有提供 cancel 方法，导致组件卸载时定时器残留'],
    '防抖是在停止触发后延迟执行，适合搜索输入；节流是限制执行频率，适合滚动/resize。实现时要注意保留 this 和参数，支持 immediate 和取消。'),
];

const tsSpecs = [
  L(4, 'CO', 'B', '什么是泛型？写一个实际应用的例子。',
    ['泛型', 'Generics', '类型参数', '类型安全'], '3-5 分钟', '高频',
    ['把泛型理解为 any，使用时丢失类型约束',
     '不会给泛型参数加约束，导致内部无法调用具体方法',
     '认为泛型只在运行时做类型检查'],
    '泛型是在定义函数、接口或类时不指定具体类型，而在使用时传入类型参数，兼顾复用和类型安全。例如一个类型安全的 identity 函数。'),
  L(5, 'CO', 'B', 'TypeScript 中的类型推断是什么？什么情况下需要显式注解？',
    ['类型推断', '类型注解', '上下文类型', '最佳实践'], '3-5 分钟', '高频',
    ['所有变量都写类型注解，导致代码冗长',
     '函数参数依赖推断，结果类型被拓宽为 any',
     '不清楚 const 上下文和 let 在推断上的区别'],
    '类型推断是 TypeScript 根据赋值或上下文自动推导类型。简单变量优先推断；函数参数、返回值和公共 API 推荐显式注解，以提高可读性和编译错误发现能力。'),
  L(6, 'CO', 'B', '`readonly` 和 `const` 有什么区别？',
    ['readonly', 'const', '类型系统', '不可变'], '2-3 分钟', '中频',
    ['认为 readonly 等同于 const',
     '认为 readonly 是深不可变，可以修改嵌套对象属性',
     '说不出 readonly 只作用于类型层面，运行时不存在'],
    'const 是运行时变量声明，禁止重新绑定；readonly 是类型层面修饰，禁止重新赋值，但不阻止修改对象内部属性。readonly 编译后会被擦除。'),
  L(8, 'CO', 'A', '什么是泛型约束？写一个带约束的泛型函数。',
    ['泛型约束', 'extends', '类型安全', '关键字'], '3-5 分钟', '高频',
    ['使用 any 作为约束，失去类型检查意义',
     '在约束中使用具体类型而非接口或联合类型',
     '忽略泛型约束对默认类型和条件类型的影响'],
    '泛型约束通过 extends 限制类型参数必须满足某些结构，从而在泛型内部安全调用属性或方法。例如 T extends { length: number } 表示 T 必须有 length。'),
  L(9, 'CO', 'A', '解释 `keyof`、`typeof`、`in`、`as` 在类型系统中的作用。',
    ['keyof', 'typeof', 'as', '类型操作符'], '5-8 分钟', '高频',
    ['把 typeof 在类型位置和值位置混用',
     '认为 keyof 返回的是值数组而不是联合类型',
     '用 as 做运行时类型转换，忽略它只是类型断言'],
    'keyof 取对象类型的键联合；typeof 在类型位置获取变量类型；in 用于映射类型遍历联合类型；as 是类型断言，只在编译期生效。'),
  L(10, 'CD', 'A', '什么是映射类型？手写 `Partial<T>`、`Readonly<T>`、`Pick<T, K>`。',
    ['映射类型', 'Partial', 'Readonly', 'Pick', '类型工具'], '5-8 分钟', '高频',
    ['只写出用法，说不出 [K in keyof T] 的语法含义',
     '混淆 Readonly<T> 与 const 在对象上的效果',
     '手写 Pick 时没有使用 K extends keyof T 约束'],
    '映射类型通过 in 关键字遍历键联合，对属性类型进行统一变换。Partial 把属性变为可选，Readonly 把属性变为只读，Pick 从 T 中选取指定键。'),
  L(11, 'CD', 'A', '解释条件类型，并手写 `IsArray<T>`、`Extract<T, U>`。',
    ['条件类型', 'infer', 'IsArray', 'Extract'], '5-8 分钟', '中频',
    ['把条件类型当成运行时三元表达式',
     '不会用 extends 判断类型归属',
     '混淆 Extract 与 Exclude 的作用'],
    '条件类型语法是 T extends U ? X : Y，用于根据类型关系选择分支。IsArray<T> 判断 T 是否为数组类型；Extract<T, U> 从 T 中提取可赋值给 U 的类型。'),
  L(12, 'CD', 'A', '什么是 `infer`？用它实现 `ReturnType<T>` 和 `Parameters<T>`。',
    ['infer', '类型推断', 'ReturnType', 'Parameters'], '5-8 分钟', '高频',
    ['在条件类型外使用 infer，导致语法错误',
     '说不清 infer 推断出的变量作用域',
     '实现 ReturnType 时没有约束 T 为函数类型'],
    'infer 用于在条件类型中推断并声明一个类型变量，只能在 extends 子句中使用。ReturnType<T> 通过 infer R 提取函数返回类型，Parameters<T> 提取参数元组。'),
  L(13, 'CO', 'A', '解释 discriminated union（可辨识联合），并说明其优势。',
    ['可辨识联合', '联合类型', '类型收窄', 'tag'], '3-5 分钟', '中频',
    ['只用联合类型而不设置共同的可辨识字段',
     '用类型断言绕过联合类型收窄',
     '说不出可辨识联合相比普通联合在 switch  exhaustiveness 上的优势'],
    '可辨识联合是为联合类型的每个成员设置一个共同字段（tag），通过该字段做类型收窄，使编译器能确定当前分支的具体类型，并支持穷尽检查。'),
  L(14, 'SC', 'A', '如何处理第三方库没有类型声明的问题？',
    ['类型声明', 'DefinitelyTyped', '@types', 'declare'], '3-5 分钟', '中频',
    ['直接用 any 关闭所有第三方库的类型检查',
     '不知道可以编写 .d.ts 声明文件本地补充',
     '混淆 declare module 与 declare namespace 的用途'],
    '优先安装 @types/xxx；没有时创建 .d.ts 文件用 declare module 声明模块，或写 minimal 类型。对于小型库，可以用 interface 包裹 API 返回结果。'),
  L(15, 'CO', 'P', '解释 TypeScript 的协变、逆变、双向协变和不变，并举例子。',
    ['协变', '逆变', '不变', 'strictFunctionTypes'], '8-12 分钟', '低频',
    ['只记住名词，举不出数组/函数参数的实例',
     '认为 TypeScript 所有场景都严格逆变',
     '忽略 strictFunctionTypes 关闭时函数参数双向协变的风险'],
    '协变是子类型可赋值给父类型位置，如数组元素；逆变是父类型可赋值给子类型位置，如函数参数；不变要求类型完全一致。strictFunctionTypes 开启后函数参数改为严格逆变。'),
  L(16, 'CD', 'P', '什么是类型体操？请实现 `TupleToUnion<T>`、`DeepReadonly<T>`。',
    ['类型体操', '递归类型', 'DeepReadonly', '元组'], '10-15 分钟', '中频',
    ['过度使用类型体操导致可读性极差',
     '递归类型没有设置终止条件，触发无限递归',
     '用 any 绕过复杂类型推导'],
    '类型体操是利用 TypeScript 类型系统实现复杂类型计算。TupleToUnion<T[number]> 把元组转为联合类型；DeepReadonly 通过递归把对象所有层级属性设为 readonly。'),
  L(17, 'SC', 'P', '如何设计一个类型安全的前端 API 请求层？',
    ['API 请求层', '类型安全', '泛型', '错误处理'], '10-15 分钟', '中频',
    ['请求参数和响应类型都用 any',
     '没有统一错误类型和错误码枚举',
     '泛型约束过松，导致调用方传入错误类型'],
    '类型安全请求层应定义 Request/Response 泛型接口，封装 fetch/axios，返回经过校验的数据和错误联合类型。利用泛型让调用处自动推断响应类型。'),
  L(18, 'CO', 'P', '解释 `declare`、`namespace`、`module` 的区别与使用场景。',
    ['declare', 'namespace', 'module', '类型声明'], '5-8 分钟', '中频',
    ['把 declare 当成普通 JS 运行时语法',
     '用 namespace 组织现代 ESM 模块代码',
     '混淆内部模块 namespace 与外部 module 声明'],
    'declare 用于告诉 TypeScript 某个变量/模块已存在；namespace 用于组织全局类型或兼容历史内部模块；module 声明用于为无类型第三方库补充类型。现代项目优先用 ESM。'),
  L(19, 'CO', 'P', 'Vue3 和 React 中是如何利用 TypeScript 类型系统的？',
    ['Vue3', 'React', 'TSX', '类型推导'], '5-8 分钟', '中频',
    ['只说框架支持 TS，讲不出具体类型机制',
     '混淆 Vue 的 defineProps 类型推导与 React 的 FC 类型',
     '说不清泛型组件在两种框架中的写法差异'],
    'Vue3 通过 defineProps、defineEmits 和泛型支持类型推导；React 通过 FC、泛型组件和 TSX 约束 props/children。两者都利用泛型提升组件复用和类型安全。'),
  L(20, 'CO', 'P', 'TypeScript 编译配置 `strict: true` 会开启哪些检查？实际项目中如何取舍？',
    ['tsconfig', 'strict', '类型检查', '工程化'], '5-8 分钟', '中频',
    ['认为 strict:true 只是 noImplicitAny',
     '不敢开启 strict，因为遗留代码报错过多',
     '忽略 strictNullChecks 对业务逻辑的深远影响'],
    'strict:true 开启 noImplicitAny、strictNullChecks、strictFunctionTypes 等。新项目建议全开；老项目可逐项开启并配合渐进式修复，优先打开 strictNullChecks。'),
  L(21, 'CO', 'A', '`satisfies` 与类型注解 `:T`、类型断言 `as T` 有什么区别？',
    ['satisfies', '类型注解', '类型断言', '类型安全'], '3-5 分钟', '中频',
    ['把 satisfies 当成类型断言，绕过类型检查',
     '认为 satisfies 会改变变量推断类型',
     '分不清 as 和 satisfies 在推导保留上的差异'],
    'satisfies 检查值是否满足类型，同时保留值的具体推断类型；:T 把变量类型固定为 T；as T 是断言，可能绕过检查。推导需要保留时优先用 satisfies。'),
  L(22, 'CO', 'P', '什么是 Branded Type？它解决了什么问题？',
    ['Branded Type', '名义类型', '类型安全', 'opaque'], '3-5 分钟', '低频',
    ['用 Type Alias 给 string 起别名就认为实现了 Brand',
     '不知道如何在不改变运行时的情况下添加 brand 字段',
     '混淆 Branded Type 与简单的类型别名'],
    'Branded Type 通过唯一符号属性把结构相同但语义不同的类型区分开，实现名义类型。例如 UserId 和 OrderId 都是 string，但 brand 不同，调用时不会混用。'),
  L(23, 'PE', 'P', '如何优化大型 TypeScript 项目的编译性能？',
    ['编译性能', 'tsconfig', '增量编译', '项目引用'], '5-8 分钟', '中频',
    ['只升级 TypeScript 版本，不优化配置',
     '没有使用 incremental 或 project references',
     'ignore 了性能问题，导致 CI 编译时间过长'],
    '优化措施包括开启 incremental、composite、项目引用拆分大型代码库、skipLibCheck、exclude 不必要的文件、使用 SWC/esbuild 做转译，以及限制复杂类型体操。'),
  C('CO', 'B', '什么是类型拓宽（Type Widening）和 `as const`？',
    ['类型拓宽', 'as const', '字面量类型', '类型推断'], '3-5 分钟', '中频',
    '请解释 TypeScript 中的类型拓宽现象，以及 `as const` 如何保留字面量类型。',
    `let 声明的变量会被拓宽为更宽的类型，例如 \`let x = 'a'\` 推断为 string 而非字面量 'a'。as const 可以把对象/数组的属性和元素锁定为字面量类型，并使属性变为 readonly。\n\n\`\`\`ts\nconst config = { host: 'localhost' } as const;\n// config.host 类型为 'localhost'\n\`\`\``,
    [['概念解释','40%','能否说出 widening 的原因和表现'],['as const 作用','40%','是否知道它锁定字面量并设 readonly'],['场景选择','20%','能否举例何时需要 as const']],
    ['认为 const 声明的变量一定是字面量类型',
     '用 as const 后仍尝试修改对象属性，不理解 readonly 含义',
     '在需要动态修改的对象上滥用 as const'],
    '类型拓宽是 TypeScript 为 let 和普通对象推断更宽类型的行为。as const 可以保留字面量类型，适合配置对象和 Redux action type。'),
];

const browserSpecs = [
  L(7, 'CO', 'A', '`<script>` 标签的 `defer` 和 `async` 有什么区别？',
    ['script', 'defer', 'async', '渲染阻塞'], '3-5 分钟', '高频',
    ['认为 defer 和 async 都会阻塞 HTML 解析直到脚本下载完成',
     '说不清执行时机：defer 在 DOM 解析后按顺序执行，async 下载完立即执行',
     '在依赖其他脚本的场景误用 async，导致执行顺序错乱'],
    'defer 脚本不阻塞解析，在 DOM 解析完成后、DOMContentLoaded 之前按出现顺序执行；async 脚本下载完成后立即执行，不保证顺序，适合独立脚本。'),
  L(15, 'CO', 'P', '浏览器是如何保证渲染进程安全的？什么是站点隔离（Site Isolation）？',
    ['站点隔离', '渲染进程', '安全', '沙箱'], '5-8 分钟', '中频',
    ['认为同源策略已经足以隔离不同站点',
     '不清楚 Spectre 漏洞为什么需要站点隔离',
     '说不出站点隔离对跨站 iframe 和弹窗的影响'],
    'Chrome 通过沙箱、站点隔离等机制限制渲染进程权限。站点隔离让不同站点运行在独立进程中，即使发生 Spectre 类漏洞，也难以读取其他站点的内存数据。'),
  L(16, 'CO', 'P', '详细描述 Chrome 的合成器线程（Compositor Thread）和主线程的关系。',
    ['合成器线程', '主线程', '渲染', 'Compositor'], '5-8 分钟', '中频',
    ['把合成器线程和主线程的任务混为一谈',
     '认为所有绘制都在主线程完成',
     '说不清合成器线程如何独立于主线程处理滚动和动画'],
    '主线程负责 JS、样式计算、布局、绘制记录；合成器线程接收绘制分块和图层信息，在 GPU 上合成最终帧。这样滚动和 transform 动画可在合成器线程完成，不阻塞主线程。'),
  L(17, 'PE', 'P', '如何分析并优化首屏加载时间（FCP/LCP）？',
    ['FCP', 'LCP', '首屏优化', '性能指标'], '8-12 分钟', '高频',
    ['只关注加载总时长，忽略关键渲染路径',
     '把 LCP 元素藏在异步加载的数据里，没有优先渲染',
     '没有使用 PerformanceObserver 或 Lighthouse 进行实际测量'],
    'FCP 衡量首次内容绘制，LCP 衡量最大内容元素渲染时间。优化方向包括减少关键资源体积、预加载 LCP 图片、内联关键 CSS、服务端渲染、压缩和缓存。'),
  L(18, 'CO', 'P', 'Service Worker 是什么？它能做什么？生命周期是怎样的？',
    ['Service Worker', 'PWA', '缓存', '生命周期'], '5-8 分钟', '中频',
    ['认为 Service Worker 可以操作 DOM',
     '说不清 install、activate、fetch 三个阶段的顺序和用途',
     '没有处理 Service Worker 更新机制和缓存清理'],
    'Service Worker 是浏览器后台运行的独立脚本，可拦截网络请求、实现离线缓存、推送通知。生命周期包括注册、install、activate，激活后才能拦截 fetch。'),
  L(19, 'SC', 'R', '如何设计一个高性能的虚拟列表（Virtual List）？',
    ['虚拟列表', '渲染优化', '大数据', '滚动'], '10-15 分钟', '高频',
    ['只渲染可见项但留下大量空白导致滚动闪烁',
     '没有处理动态高度项，导致计算偏移错误',
     '滚动事件未做节流或使用 requestAnimationFrame，造成掉帧'],
    '虚拟列表只渲染视口内及缓冲区的少量 DOM，通过计算滚动偏移动态替换数据。关键是确定每个项的位置，可采用固定高度、预估高度或动态测量方案，并配合滚动节流。'),
  L(20, 'CO', 'P', '浏览器的内存泄漏常见场景有哪些？如何排查？',
    ['内存泄漏', 'DevTools', 'Performance', 'Heap Snapshot'], '5-8 分钟', '高频',
    ['只关注 JS 堆，忽略 DOM 分离节点和事件监听',
     '不会使用 Heap Snapshot 比较泄漏前后的对象 retaining path',
     '认为闭包一定泄漏，忽略只有长期持有大对象才会泄漏'],
    '常见泄漏包括未清除的定时器、事件监听、闭包持有大对象、分离 DOM 节点。排查可用 Chrome DevTools Memory 面板拍摄 Heap Snapshot，对比泄漏前后的对象 retaining path。'),
  L(21, 'PE', 'P', '什么是 Web Vitals？LCP、INP、CLS 分别衡量什么？',
    ['Web Vitals', 'LCP', 'INP', 'CLS'], '5-8 分钟', '中频',
    ['把 FCP 和 LCP 混为一谈',
     '不知道 INP 已经取代 FID 成为交互响应指标',
     '只测实验室数据，忽略真实用户数据的 RUM 采集'],
    'Web Vitals 是 Google 提出的核心体验指标。LCP 衡量最大内容绘制；INP 衡量交互响应延迟；CLS 衡量布局偏移累积。它们是评估真实用户体验的关键指标。'),
  L(22, 'CO', 'P', '什么是 Passkeys？相比传统密码有什么优势？',
    ['Passkeys', 'WebAuthn', '无密码', '安全'], '3-5 分钟', '低频',
    ['认为 Passkeys 就是普通的生物识别登录',
     '说不清 Passkeys 如何抵抗钓鱼攻击',
     '忽略跨设备同步和设备兼容性挑战'],
    'Passkeys 基于 WebAuthn，用公私钥对替代密码，私钥存储在设备上。它天然防钓鱼、无弱密码问题，且支持生物识别验证，但需要考虑设备迁移和降级方案。'),
  L(23, 'CO', 'P', '什么是 RenderingNG？它对前端开发者有什么意义？',
    ['RenderingNG', '渲染流水线', 'Chrome', '性能'], '3-5 分钟', '低频',
    ['把 RenderingNG 和某个具体 CSS 属性混为一谈',
     '不知道它把渲染拆分为多个阶段和线程',
     '说不出它对跨平台一致性和性能的影响'],
    'RenderingNG 是 Chromium 的新一代渲染架构，把渲染拆分为更清晰的阶段，支持多线程和更好的 GPU 利用。对前端来说，意味着更稳定、更流畅的动画和滚动体验。'),
  C('CO', 'B', '什么是 Intersection Observer？典型使用场景有哪些？',
    ['Intersection Observer', '懒加载', '无限滚动', '可见性'], '3-5 分钟', '中频',
    '请解释 Intersection Observer 的作用，并举例说明它比滚动监听更适合的场景。',
    `Intersection Observer 异步监听目标元素与视口或祖先元素的交叉状态，避免在 scroll 事件中频繁读取布局属性导致重排。典型场景包括图片懒加载、无限滚动、广告可见性统计。\n\n\`\`\`js\nconst io = new IntersectionObserver((entries) => {\n  entries.forEach(e => {\n    if (e.isIntersecting) {\n      e.target.src = e.target.dataset.src;\n      io.unobserve(e.target);\n    }\n  });\n});\n\`\`\``,
    [['概念解释','40%','能否说出异步交叉检测的优势'],['场景举例','40%','懒加载、无限滚动、可见性'],['性能意识','20%','是否提到避免 scroll 监听导致的强制同步布局']],
    ['仍用 scroll + getBoundingClientRect 实现懒加载',
     '没有 unobserve 已加载元素，导致重复回调',
     '混淆 threshold 和 rootMargin 的作用'],
    'Intersection Observer 异步检测元素是否进入视口，适合图片懒加载和无限滚动。它避免了 scroll 事件里频繁读取布局属性带来的性能问题。'),
  C('CO', 'B', '`DOMContentLoaded` 与 `load` 事件有什么区别？',
    ['DOMContentLoaded', 'load', '生命周期', '事件'], '2-3 分钟', '高频',
    '请说明 DOMContentLoaded 和 load 事件的触发时机及使用场景差异。',
    `DOMContentLoaded 在 HTML 解析完成、DOM 树构建好后触发，无需等待样式表、图片、子框架。load 在整个页面包括所有资源加载完成后触发。\n\n需要尽早执行 DOM 操作时监听 DOMContentLoaded；需要统计完整加载时间或操作图片尺寸时监听 load。`,
    [['触发时机','50%','是否清楚 DOM 就绪 vs 全部资源加载完成'],['使用场景','30%','何时用 DOMContentLoaded，何时用 load'],['阻塞因素','20%','是否知道 defer 脚本会在 DOMContentLoaded 前执行']],
    ['在 DOMContentLoaded 中读取图片宽高，结果可能为 0',
     '把所有初始化逻辑都放在 load 事件，延迟交互可用时间',
     '认为 async 脚本一定在 DOMContentLoaded 之前执行'],
    'DOMContentLoaded 在 DOM 解析完成后触发，适合初始化交互逻辑；load 在所有资源加载完成后触发，适合完整加载后的操作。'),
  C('CO', 'A', '什么是 Back-Forward Cache（bfcache）？前端需要注意什么？',
    ['bfcache', '往返缓存', '页面生命周期', '性能'], '3-5 分钟', '中频',
    '请解释浏览器 bfcache 的作用，以及哪些行为会导致页面无法进入 bfcache。',
    `bfcache 是浏览器为前进/后退保留的页面快照，可瞬间恢复页面状态，无需重新加载和解析。使用 unload 事件、打开持久连接、beforeunload 中同步操作等可能阻止页面进入 bfcache。\n\n最佳实践是用 pagehide/pageshow 的 persisted 属性判断缓存状态，避免在 unload 中执行清理逻辑。`,
    [['概念解释','40%','能否说出 bfcache 是页面快照而非普通缓存'],['阻塞原因','40%','unload 事件、WebSocket、同步请求等'],['恢复处理','20%','是否知道用 pageshow.persisted 判断']],
    ['在 unload 中释放资源，导致页面无法被缓存',
     '把 bfcache 当成 HTTP 缓存管理',
     '没有处理从 bfcache 恢复后定时器和网络状态不一致的问题'],
    'bfcache 让浏览器快速恢复前进后退的页面快照。应避免 unload 事件和持久连接，改用 pagehide/pageshow 处理状态恢复。'),
  C('CO', 'A', 'CSS 的 `content-visibility` 属性有什么作用？',
    ['content-visibility', '渲染优化', 'CSS', 'contain'], '3-5 分钟', '中频',
    '请解释 content-visibility 如何影响浏览器渲染，并说明 auto 值的使用场景。',
    `content-visibility: auto 让浏览器跳过视口外元素的渲染工作（包括布局和绘制），直到它们接近视口。需要配合 contain-intrinsic-size 设置自然尺寸，防止滚动条跳动。\n\n\`\`\`css\n.card {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 300px;\n}\n\`\`\``,
    [['作用解释','40%','是否提到跳过视口外元素的布局/绘制'],['尺寸处理','30%','是否知道 contain-intrinsic-size 防止布局偏移'],['适用场景','30%','长列表/feed 流等大量离屏内容']],
    ['不设置 contain-intrinsic-size，导致滚动条抖动',
     '对所有元素滥用 content-visibility，反而增加 contain 开销',
     '把它和 display:none 混为一谈，忽略元素仍占据空间'],
    'content-visibility: auto 让浏览器延迟渲染视口外元素，适合长列表。需要配合 contain-intrinsic-size 预留空间，避免布局偏移。'),
  C('SC', 'A', '如何在前端实现图片懒加载？',
    ['图片懒加载', 'Intersection Observer', 'loading', '性能'], '5-8 分钟', '高频',
    '请设计一个图片懒加载方案，要求兼容现代浏览器和旧浏览器。',
    `现代浏览器可用 \`<img loading="lazy"\`，旧浏览器用 Intersection Observer 监听图片进入视口后再设置 src。需要处理占位图、错误降级和无 JS 场景的 noscript 回退。\n\n\`\`\`html\n<img data-src="real.jpg" src="placeholder.jpg" loading="lazy" alt="" />\n\`\`\``,
    [['方案完整','40%','loading=lazy、Intersection Observer、降级'],['性能优化','30%','占位图、避免布局偏移、unobserve'],['边界处理','30%','错误处理、SEO、noscript 回退']],
    ['直接把所有图片 src 留空，导致 SEO 和无 JS 场景无法展示',
     '没有占位尺寸，图片加载后页面跳动严重',
     '在滚动事件中用 getBoundingClientRect 高频检测'],
    '现代浏览器优先用 img loading="lazy"，旧浏览器用 Intersection Observer。要预留占位尺寸、处理加载失败和 SEO 回退。'),
  C('CO', 'A', '`requestIdleCallback` 与 `requestAnimationFrame` 有什么区别？',
    ['requestIdleCallback', 'requestAnimationFrame', '调度', '性能'], '3-5 分钟', '中频',
    '请比较 requestIdleCallback 和 requestAnimationFrame 的触发时机、用途和兼容性。',
    `requestAnimationFrame 与屏幕刷新同步，用于视觉相关的动画和绘制。requestIdleCallback 在浏览器空闲时执行低优先级任务，适合分片处理大数据、日志上报等非紧急工作。\n\nrAF 回调通常16ms一次；requestIdleCallback 不保证执行，且可能被 timeout 参数约束。`,
    [['触发时机','40%','刷新同步 vs 空闲时段'],['适用场景','40%','动画 vs 后台任务'],['兼容性','20%','是否知道 requestIdleCallback 在部分浏览器缺失']],
    ['在 requestIdleCallback 中做动画，导致掉帧',
     '在 rAF 中执行耗时计算，阻塞下一帧',
     '忽略 requestIdleCallback 任务可能因浏览器忙碌而长期不执行'],
    'rAF 用于与刷新同步的动画；requestIdleCallback 用于浏览器空闲时的低优先级任务。不要把耗时任务放进 rAF。'),
  C('CO', 'A', '浏览器标签页之间有哪些通信方式？',
    ['跨标签通信', 'BroadcastChannel', 'Storage', 'SharedWorker'], '3-5 分钟', '中频',
    '请列举浏览器标签页间通信的方案，并说明各自的优缺点和限制。',
    `常用方式包括：\n\n1. BroadcastChannel：同源标签页间点对点广播，API 简洁但 IE 不支持。\n2. localStorage + storage 事件：兼容性最好，但只能传递字符串且频繁写入有性能开销。\n3. SharedWorker：多标签共享后台线程，但 Safari 历史支持不佳。\n4. Service Worker + MessageChannel：可实现更复杂的协调，但实现成本较高。`,
    [['方案覆盖','40%','能否说出至少 3 种通信方式'],['优缺点','40%','兼容性、性能、数据类型限制'],['场景选择','20%','根据需求选择合适方案']],
    ['用轮询 localStorage 做实时通信，造成性能浪费',
     '忽略 storage 事件只在其他标签页触发，当前页修改不触发',
     '跨域场景下使用 BroadcastChannel 而未处理同源限制'],
    '标签页通信可用 BroadcastChannel、localStorage storage 事件、SharedWorker 或 Service Worker。选择时需考虑兼容性、数据大小和实时性。'),
  C('PE', 'A', '什么是渲染阻塞资源？如何减少阻塞？',
    ['渲染阻塞', '关键渲染路径', 'CSS', 'JS'], '5-8 分钟', '高频',
    '请解释哪些资源会阻塞首次渲染，并给出减少阻塞的常用手段。',
    `CSS 和同步 JavaScript 会阻塞渲染：CSS 阻塞是因为需要 CSSOM 才能构建渲染树；JS 阻塞是因为默认会暂停 HTML 解析。\n\n减少阻塞：CSS 用 media 查询分割、内联关键 CSS；JS 用 async/defer、底部加载或模块预加载；对非关键资源使用 preload/prefetch。`,
    [['阻塞原因','40%','CSSOM 与 JS 解析阻塞'],['优化手段','40%','async/defer、关键 CSS、preload'],['优先级判断','20%','如何识别关键资源']],
    ['把所有 CSS 都内联，导致 HTML 体积膨胀',
     '对所有脚本都加 async，导致依赖脚本执行顺序错乱',
     '忽略字体文件也会阻塞文本渲染'],
    'CSS 和同步 JS 是常见的渲染阻塞资源。优化方式包括 defer/async、内联关键 CSS、按需加载非关键资源。'),
  C('PE', 'A', 'DNS 预解析和预连接对首屏有什么帮助？',
    ['DNS 预解析', 'preconnect', 'prefetch', '首屏优化'], '3-5 分钟', '中频',
    '请说明 dns-prefetch、preconnect、prefetch、preload 的区别和适用场景。',
    `\`<link rel="dns-prefetch"\` 提前解析域名；\`<link rel="preconnect"\` 提前建立 TCP/TLS 连接；\`<link rel="prefetch"\` 低优先级预取后续页面资源；\`<link rel="preload"\` 高优先级预加载当前页面关键资源。\n\n对首屏最有用的是 preconnect 和 preload，可减少 DNS/TLS 和关键资源的等待时间。`,
    [['概念区分','50%','四种 link rel 的触发时机和优先级'],['首屏收益','30%','能否说明减少的耗时环节'],['滥用风险','20%','preconnect 过多会占用连接池']],
    ['对非关键资源使用 preload，浪费带宽',
     'preconnect 了不使用的第三方域名',
     '混淆 prefetch 和 preload 的优先级'],
    'dns-prefetch 提前解析域名，preconnect 提前建立连接，preload 预加载当前关键资源，prefetch 预取后续资源。合理配置能显著降低首屏关键路径耗时。'),
];
