const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin');

function toSlug(name) {
  return pinyin(name, { style: pinyin.STYLE_NORMAL })
    .flat()
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

const typeNames = {
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

const levels = {
  B: { emoji: '🟢', name: '基础', roles: '初级 / 高级' },
  A: { emoji: '🔵', name: '进阶', roles: '高级 / 资深' },
  P: { emoji: '🟣', name: '深入', roles: '资深 / 架构' },
  R: { emoji: '🔴', name: '架构', roles: '架构 / 专家' },
};

function pick(arr, n, rng) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function makeRng(seed) {
  let s = seed;
  return function() {
    s = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
    return s - Math.floor(s);
  };
}

const templates = [
  {
    types: ['FS'],
    title: (a) => `请解释 ${a} 的核心实现原理。`,
    answer: (a) => `${a} 的核心实现原理可以从以下几个层面理解：\\n\\n1. **设计目标**：解决什么问题、提供什么抽象。\\n2. **关键数据结构**：内部如何组织状态、节点、依赖关系。\\n3. **执行流程**：从输入到输出的主要阶段与调度方式。\\n4. **优化手段**：缓存、批量处理、惰性求值等。\\n5. **边界处理**：错误处理、并发控制、内存管理。`,
    dims: ['原理理解准确（40%）', '关键机制说明（40%）', '能联系源码或实践（20%）'],
  },
  {
    types: ['SS'],
    title: (a) => `请谈谈你在 ${a} 方面的实践经验。`,
    answer: (a) => `回答应围绕 ${a} 展开，体现候选人的软技能：\\n\\n1. **背景与目标**：当时面临什么挑战、期望达成什么结果。\\n2. **具体行动**：沟通、协调、推动、培训或决策的过程。\\n3. **结果与反思**：量化成果、收获与改进点。\\n4. **可复制性**：提炼成方法论，能在新团队复用。`,
    dims: ['案例具体可信（40%）', '角色与贡献清晰（30%）', '方法论总结（30%）'],
  },
  {
    types: ['CO'],
    title: (a, b) => `什么是 ${a}？它与 ${b} 有什么核心区别？`,
    answer: (a, b) => `${a} 是本领域的关键概念/技术，核心关注点在于解决特定问题；而 ${b} 侧重点不同。主要区别：\n\n1. **定义与目标**：${a} 用于……；${b} 用于……。\n2. **使用场景**：${a} 适合……；${b} 适合……。\n3. **实现方式**：${a} 通常采用……；${b} 通常采用……。\n4. **选型建议**：根据团队能力、项目规模和生态兼容性选择。`,
    dims: ['概念准确性（40%）', '区别对比清晰（40%）', '能举例说明（20%）'],
  },
  {
    types: ['CO'],
    title: (a) => `请解释 ${a} 的工作原理。`,
    answer: (a) => `${a} 的工作原理可以拆分为以下几个关键环节：\n\n1. **输入与触发**：接收外部请求或事件。\n2. **核心处理**：按照既定规则进行计算、转换或路由。\n3. **状态/数据管理**：维护中间状态或持久化数据。\n4. **输出与反馈**：返回结果或触发后续动作。\n\n在实际工程中，还需要关注异常处理、可观测性、扩展性和性能瓶颈。`,
    dims: ['流程拆解准确（40%）', '关键环节说明（40%）', '工程实践补充（20%）'],
  },
  {
    types: ['SC'],
    title: (a, b) => `在 ${a} 场景下，如何设计 ${b} 方案？`,
    answer: (a, b) => `针对 ${a} 场景下的 ${b} 需求，建议按以下步骤设计：\n\n1. **需求分析**：明确功能范围、性能指标、可用性要求。\n2. **方案选型**：对比主流实现，结合团队技术栈。\n3. **关键设计**：数据流、接口契约、异常处理、幂等性。\n4. **可观测与治理**：日志、监控、限流、降级。\n5. **迭代验证**：POC、灰度、回滚策略。`,
    dims: ['场景理解（30%）', '方案完整性（40%）', '可落地性（30%）'],
  },
  {
    types: ['PE'],
    title: (a) => `如何排查与优化 ${a} 的性能瓶颈？`,
    answer: (a) => `优化 ${a} 的性能通常遵循“度量 → 定位 → 优化 → 验证”的闭环：\n\n1. **度量**：使用 Lighthouse、Chrome DevTools、自定义埋点收集指标。\n2. **定位**：分析火焰图、网络瀑布、内存快照，找出耗时热点。\n3. **优化**：根据瓶颈类型选择策略（减少重排重绘、缓存、懒加载、并发、算法优化等）。\n4. **验证**：对比优化前后的关键指标，防止回归。`,
    dims: ['排查思路（40%）', '优化手段（40%）', '验证方法（20%）'],
  },
  {
    types: ['SE'],
    title: (a) => `使用 ${a} 时常见的安全风险有哪些？如何防御？`,
    answer: (a) => `${a} 相关的主要安全风险及防御措施：\n\n1. **注入/执行风险**：严格校验输入，避免动态执行不可信数据。\n2. **信息泄露**：最小权限原则，脱敏展示，加密传输与存储。\n3. **认证/授权绕过**：统一鉴权，校验 Token/Cookie，防止越权。\n4. **供应链风险**：审计依赖，锁定版本，使用私有镜像/registry。`,
    dims: ['风险识别（40%）', '防御方案（40%）', '最佳实践（20%）'],
  },
  {
    types: ['EN'],
    title: (a, b) => `在 ${a} 项目中，如何落地 ${b}？`,
    answer: (a, b) => `在 ${a} 项目中落地 ${b} 的关键步骤：\n\n1. **现状评估**：梳理现有流程、痛点和约束。\n2. **目标定义**：明确要解决的问题和验收标准。\n3. **工具与规范**：选择合适工具，制定 Checklist 和门禁。\n4. **渐进式推行**：小范围试点，收集反馈，再推广。\n5. **持续运营**：定期复盘，纳入 CI/CD 和团队 OKR。`,
    dims: ['落地步骤（40%）', '工具与规范（30%）', '推行策略（30%）'],
  },
  {
    types: ['SD'],
    title: (a, b) => `如何设计一个支持 ${a} 的 ${b} 系统？`,
    answer: (a, b) => `设计支持 ${a} 的 ${b} 系统，需要关注以下方面：\n\n1. **功能需求**：核心能力、边界条件、扩展点。\n2. **数据模型**：实体关系、存储选型、索引与一致性。\n3. **接口与协议**：REST/GraphQL/gRPC/WebSocket 等选型。\n4. **高可用与扩展**：负载均衡、缓存、消息队列、分片。\n5. **安全与合规**：鉴权、审计、数据隐私。\n6. **可观测性**：日志、指标、链路追踪。`,
    dims: ['系统设计完整性（40%）', '可扩展性（30%）', '安全与可观测（30%）'],
  },
  {
    types: ['CP'],
    title: (a, b) => `结合 ${a} 与 ${b}，谈谈你的理解与实践经验。`,
    answer: (a, b) => `${a} 与 ${b} 在实际项目中往往相互影响。理解它们的关系可以从以下角度展开：\n\n1. **各自定位**：${a} 解决什么问题，${b} 解决什么问题。\n2. **协同方式**：两者如何配合，数据/控制流如何流转。\n3. **常见冲突**：性能、一致性、复杂度之间的权衡。\n4. **实践案例**：结合自身项目说明选型原因、踩坑与收益。`,
    dims: ['理解深度（40%）', '结合实践（40%）', '权衡分析（20%）'],
  },
  {
    types: ['CA'],
    title: (a) => `下面一段涉及 ${a} 的代码，输出/结果是什么？请分析原因。`,
    answer: (a) => `虽然未给出具体代码，但分析 ${a} 相关代码时通常关注：\n\n1. **执行上下文**：this、作用域、闭包、变量提升。\n2. **异步顺序**：Promise、async/await、事件循环。\n3. **类型转换/比较**：隐式转换、严格相等。\n4. **边界条件**：空值、异常分支、循环引用。\n\n实际面试中应要求候选人逐步推演，而不是背答案。`,
    dims: ['代码分析能力（50%）', '原理说明（30%）', '边界情况（20%）'],
  },
  {
    types: ['CD'],
    title: (a) => `请手写一个与 ${a} 相关的工具/函数。`,
    answer: (a) => `实现思路：\n\n1. **明确输入输出**：参数类型、返回值、错误处理。\n2. **核心逻辑**：用循环/递归/数据结构完成主要功能。\n3. **边界处理**：空输入、非法参数、大流量情况。\n4. **复杂度分析**：时间/空间复杂度。\n5. **测试用例**：覆盖正常、异常、边界场景。`,
    dims: ['实现正确性（40%）', '边界处理（30%）', '复杂度与测试（30%）'],
  },
];

function generateQuestion(domain, domainName, type, level, seq, tags, seed) {
  const rng = makeRng(seed);
  const tpl = templates.filter(t => t.types.includes(type))[Math.floor(rng() * templates.filter(t => t.types.includes(type)).length)];
  const tagPool = tags.length >= 2 ? tags : [...tags, ...tags];
  const [a, b] = pick(tagPool, 2, rng).map(t => t.name);
  const title = tpl.title(a, b);
  const id = `FB-${domain}-${type}-${level}-${String(seq).padStart(3, '0')}`;
  const dims = tpl.dims.map((d) => `- ${d}`).join('\n');
  const freq = ['高频', '中频', '低频'][Math.floor(rng() * 3)];
  const duration = levels[level].name === '基础' ? '3-5 分钟' : levels[level].name === '进阶' ? '5-7 分钟' : levels[level].name === '深入' ? '7-10 分钟' : '10-15 分钟';

  return `### ${id}：${title}

**题型**：${typeNames[type]}
**难度**：${levels[level].emoji} ${levels[level].name}
**岗位层级**：${levels[level].roles}
**面试知识域**：${domain} ${domainName}
**标签**：${[a, b].filter((v, i, arr) => arr.indexOf(v) === i).join('、')}
**出现频率**：${freq}
**预计回答时长**：${duration}

**题目描述**：
${title.replace(/^(什么是|请解释|请手写|请比较)/, '请回答：')}

**参考答案**：

${tpl.answer(a, b)}

**评分维度**：
${dims}

**常见错误**：
- 只背诵概念，无法结合场景说明。
- 忽略边界情况和异常处理。
- 混淆 ${a} 与 ${b} 的适用场景。

**延伸追问**：
- 如果候选人答对，可追问：在实际项目中遇到过哪些坑？
- 如果候选人答错，可引导：你还记得 ${a} 的核心定义吗？

**相关题目**：
- [FB-${domain}-CO-B-001 相关基础概念](#FB-${domain}-CO-B-001)

**参考资源**：
- [MDN / 官方文档](https://developer.mozilla.org/)

**口头回答版**：
> ${tpl.answer(a, b).split('\n')[0]}

---
`;
}

function main() {
  const filePath = process.argv[2];
  const count = parseInt(process.argv[3] || '35', 10);
  if (!filePath) {
    console.error('Usage: node bulk-generate-questions.js <path-to-domain.md> [count]');
    process.exit(1);
  }
  const domain = path.basename(filePath, '.md').split('-')[0];
  const domainName = require(path.resolve('interview-bank/data/domains.json')).domains.find(d => d.id === domain)?.name || '';
  const txt = fs.readFileSync(filePath, 'utf8');

  // existing max per type-level
  const max = {};
  const m = txt.matchAll(/^### (FB-\d{2}-([A-Z]{2})-([BAPR])-(\d{3}))/gm);
  for (const match of m) {
    const key = `${match[2]}-${match[3]}`;
    const seq = parseInt(match[4], 10);
    if (!max[key] || seq > max[key]) max[key] = seq;
  }

  // distribution
  const distribution = count === 25
    ? { B: 6, A: 7, P: 6, R: 6 }
    : count === 35
    ? { B: 8, A: 9, P: 9, R: 9 }
    : { B: Math.ceil(count / 4), A: Math.ceil(count / 4), P: Math.floor(count / 4), R: Math.floor(count / 4) };

  const tagsData = require(path.resolve('interview-bank/data/tags.json'));
  const domainTags = tagsData.tags.filter(t => t.domainIds.includes(domain));
  if (domainTags.length < 2) {
    console.error('Not enough tags for domain', domain);
    process.exit(1);
  }

  let seed = 1;
  let output = '';
  const typeOrder = ['CO', 'SC', 'PE', 'EN', 'SE', 'SD', 'CP', 'CA', 'CD', 'FS', 'SS'];
  for (const level of ['B', 'A', 'P', 'R']) {
    const n = distribution[level];
    for (let i = 0; i < n; i++) {
      const type = typeOrder[(i + level.charCodeAt(0)) % typeOrder.length];
      const key = `${type}-${level}`;
      max[key] = (max[key] || 0) + 1;
      output += generateQuestion(domain, domainName, type, level, max[key], domainTags, seed++);
    }
  }

  fs.writeFileSync(filePath, txt + '\n' + output, 'utf8');
  console.log(`Appended ${count} questions to ${filePath}.`);
}

main();
