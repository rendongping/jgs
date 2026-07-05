const fs = require('fs');
const path = require('path');

const DOMAIN_NAMES = {
  25: '系统架构设计',
  26: '微前端',
  27: '性能优化',
  28: '质量保障',
  29: '数据与状态',
  30: '可观测性',
  31: '安全架构',
  32: '实时系统',
  33: '国际化',
  34: '可视化与图形',
  35: 'Serverless 与边缘计算',
  36: '数据工程',
};

const TYPE_MAP = {
  CO: '概念题',
  CA: '分析题',
  CD: '辨析题',
  SC: '场景设计题',
  SD: '系统设计题',
  FS: '故障排查题',
  PE: '性能优化题',
  SE: '安全题',
  EN: '工程化题',
  SS: '软技能题',
  CP: '综合开放题',
};

const LEVEL_EMOJI = { B: '🟢', A: '🔵', P: '🟣', R: '🔴' };
const LEVEL_NAME = { B: '基础', A: '进阶', P: '深入', R: '架构' };
const ROLE_NAME = { B: '初级 / 高级', A: '中级 / 高级', P: '高级 / 资深', R: '架构师 / 专家' };

const DEFAULT_RESOURCES = {
  25: ['[Martin Fowler](https://martinfowler.com)', '[前端架构师进阶规划](https://github.com)'],
  26: ['[Micro Frontends](https://micro-frontends.org)', '[Module Federation](https://webpack.js.org/concepts/module-federation/)'],
  27: ['[web.dev/performance](https://web.dev/performance)', '[MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)'],
  28: ['[Testing JavaScript](https://testingjavascript.com)', '[Google Testing Blog](https://testing.googleblog.com)'],
  29: ['[Redux Style Guide](https://redux.js.org/style-guide)', '[React State Management](https://react.dev/learn/thinking-in-react)'],
  30: ['[OpenTelemetry](https://opentelemetry.io)', '[Google SRE Book](https://sre.google/sre-book/table-of-contents/)'],
  31: ['[OWASP Top 10](https://owasp.org/www-project-top-ten/)', '[MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)'],
  32: ['[WebSocket RFC](https://datatracker.ietf.org/doc/html/rfc6455)', '[Socket.IO Docs](https://socket.io/docs/v4)'],
  33: ['[W3C i18n](https://www.w3.org/standards/webdesign/i18n)', '[React Intl](https://formatjs.io/docs/react-intl/)'],
  34: ['[ECharts Docs](https://echarts.apache.org/en/option.html)', '[D3.js](https://d3js.org)'],
  35: ['[Cloudflare Workers](https://developers.cloudflare.com/workers/)', '[Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)'],
  36: ['[dbt Docs](https://docs.getdbt.com)', '[Martin Fowler Data Mesh](https://martinfowler.com/articles/data-mesh-intro.html)'],
};

function escapeMd(text) {
  return String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function generateAnswer(q) {
  if (q.answer) return q.answer;
  const points = (q.points || []).map((p, i) => `${i + 1}. ${p}`).join('\n');
  const pitfalls = (q.pitfalls || []).map(p => `- ${p}`).join('\n');
  let out = '核心思路如下：\n\n' + points;
  if (pitfalls) {
    out += '\n\n需要避免的典型误区：\n\n' + pitfalls;
  }
  return out;
}

function generateScoring(q) {
  if (q.scoring) return q.scoring;
  const pts = q.points || [];
  if (pts.length <= 2) return ['方案完整性（50%）：是否覆盖主要环节', '风险与权衡（50%）：是否指出关键限制'];
  const mid = Math.ceil(pts.length / 2);
  return [
    '问题理解与分析（35%）：是否抓住核心矛盾',
    `方案设计（45%）：${pts.slice(0, mid).map(p => p.split('：')[0] || p).slice(0, 2).join('、')} 等关键点`,
    '落地与优化（20%）：是否考虑监控、回滚、演进',
  ];
}

function generateErrors(q) {
  return q.errors || q.pitfalls || ['只讲概念没有落地细节', '忽略边界条件和失败场景'];
}

function generateFollowUpRight(q) {
  return q.follow_up_right || '能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？';
}

function generateFollowUpWrong(q) {
  return q.follow_up_wrong || '如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？';
}

function generateOral(q) {
  if (q.oral) return q.oral;
  const summary = (q.points || []).map(p => p.replace(/[：:].*$/, '')).join('；');
  return `${q.desc.replace(/请.*/, '')}${summary}。同时要避免${(q.pitfalls || ['忽视边界'])[0]}。`;
}

function generateRelated(q) {
  return q.related || [];
}

function generateResources(q, domain) {
  return q.resources || DEFAULT_RESOURCES[domain] || [];
}

function formatQuestion(q, domain, seqCounters) {
  const type = q.type;
  const level = q.level;
  const key = `${type}-${level}`;
  const seq = (seqCounters[key] = (seqCounters[key] || 0) + 1);
  const id = `FB-${domain}-${type}-${level}-${String(seq).padStart(3, '0')}`;
  const answer = generateAnswer(q);
  const scoring = generateScoring(q);
  const errors = generateErrors(q);
  const followRight = generateFollowUpRight(q);
  const followWrong = generateFollowUpWrong(q);
  const oral = generateOral(q);
  const related = generateRelated(q);
  const resources = generateResources(q, domain);

  let md = `### ${id}：${q.title}\n\n`;
  md += `**题型**：${TYPE_MAP[type]}\n`;
  md += `**难度**：${LEVEL_EMOJI[level]} ${LEVEL_NAME[level]}\n`;
  md += `**岗位层级**：${ROLE_NAME[level]}\n`;
  md += `**面试知识域**：${domain} ${DOMAIN_NAMES[domain]}\n`;
  md += `**标签**：${q.tags}\n`;
  md += `**出现频率**：${q.freq}\n`;
  md += `**预计回答时长**：${q.time}\n\n`;
  md += `**题目描述**：\n${q.desc}\n\n`;
  md += `**参考答案**：\n\n${answer}\n\n`;
  md += `**评分维度**：\n${scoring.map(s => `- ${s}`).join('\n')}\n\n`;
  md += `**常见错误**：\n${errors.map(e => `- ${e}`).join('\n')}\n\n`;
  md += `**延伸追问**：\n- 如果候选人答对了，可追问：${followRight}\n- 如果候选人答错了，可引导：${followWrong}\n\n`;
  if (related.length) {
    md += `**相关题目**：\n${related.map(r => `- ${r}`).join('\n')}\n\n`;
  } else {
    md += `**相关题目**：\n- 暂无\n\n`;
  }
  md += `**参考资源**：\n${resources.map(r => `- ${r}`).join('\n')}\n\n`;
  md += `**口头回答版**：\n> ${oral.replace(/\n/g, ' ')}\n\n---\n\n`;
  return md;
}

const DOMAIN_FILE = {
  25: '25-system-architecture.md',
  26: '26-micro-frontend.md',
  27: '27-performance.md',
  28: '28-quality.md',
  29: '29-data-state.md',
  30: '30-observability.md',
  31: '31-security-architecture.md',
  32: '32-real-time.md',
  33: '33-internationalization.md',
  34: '34-visualization-graphics.md',
  35: '35-serverless-edge.md',
  36: '36-data-engineering.md',
};

function getNextSeqs(domain) {
  const file = path.join('interview-bank/by-domain', DOMAIN_FILE[domain]);
  const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const re = new RegExp(`FB-${domain}-([A-Z]+)-([BARP])-([0-9]+)`, 'g');
  const counts = {};
  let m;
  while ((m = re.exec(text))) {
    const key = `${m[1]}-${m[2]}`;
    counts[key] = Math.max(counts[key] || 0, parseInt(m[3], 10));
  }
  return counts;
}

function getExistingLevelCounts(domain) {
  const file = path.join('interview-bank/by-domain', DOMAIN_FILE[domain]);
  const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const ids = new Set();
  const re = new RegExp(`FB-${domain}-[A-Z]+-([BARP])-[0-9]+`, 'g');
  let m;
  while ((m = re.exec(text))) ids.add(m[0]);
  const counts = { B: 0, A: 0, P: 0, R: 0 };
  for (const id of ids) {
    const lvl = id.match(/FB-\d+-[A-Z]+-([BARP])-[0-9]+/)[1];
    counts[lvl] = (counts[lvl] || 0) + 1;
  }
  return counts;
}

function updateHeader(domain, addedByLevel) {
  const file = path.join('interview-bank/by-domain', DOMAIN_FILE[domain]);
  let text = fs.readFileSync(file, 'utf8');
  const oldCounts = getExistingLevelCounts(domain);
  const total = Object.values(oldCounts).reduce((a, b) => a + b, 0);
  const newTotal = total + Object.values(addedByLevel).reduce((a, b) => a + b, 0);
  const newB = oldCounts.B + (addedByLevel.B || 0);
  const newA = oldCounts.A + (addedByLevel.A || 0);
  const newP = oldCounts.P + (addedByLevel.P || 0);
  const newR = oldCounts.R + (addedByLevel.R || 0);
  text = text.replace(
    /> 本题库共收录 \*\*\d+\*\* 道面试题（基础 \d+ \/ 进阶 \d+ \/ 深入 \d+ \/ 架构 \d+）/,
    `> 本题库共收录 **${newTotal}** 道面试题（基础 ${newB} / 进阶 ${newA} / 深入 ${newP} / 架构 ${newR}）`
  );
  fs.writeFileSync(file, text);
}

function appendToFile(domain, markdown, addedByLevel) {
  const file = path.join('interview-bank/by-domain', DOMAIN_FILE[domain]);
  fs.appendFileSync(file, '\n' + markdown);
  updateHeader(domain, addedByLevel);
}


const Q25 = [
  { type: 'CO', level: 'A', title: 'MVC、MVVM、MVP、MVI 的取舍与前端映射', tags: '架构模式、MVC、MVVM、单向数据流、状态管理', freq: '高频', time: '5-8 分钟', desc: '请比较四种架构模式的核心差异，并说明在 Vue/React 等现代框架中如何落地。', points: ['MVC：View 与 Model 可能直接耦合，Controller 负责输入映射', 'MVVM：通过 ViewModel 与响应式绑定解耦 View 和 Model，Vue 是典型代表', 'MVP：Presenter 作为中介，View 被动，测试性好但样板代码多', 'MVI：基于不可变 State 与单向数据流，用户 Intent → Model → View 闭环', '现代框架多为 MVVM + 单向数据流混合，选型以团队可维护性为准'], pitfalls: ['把 React 直接等同于 MVC', '认为 MVVM 就是双向绑定，忽略 ViewModel 抽象', '把 MVI 与 MVVM 混为一谈'] },
  { type: 'CO', level: 'B', title: '什么是 BFF（Backend for Frontend）', tags: 'BFF、前后端协作、API 适配、多端', freq: '高频', time: '3-5 分钟', desc: '请解释 BFF 的概念、解决的问题，以及前端与 BFF 的协作方式。', points: ['BFF 是面向前端的后端层，负责聚合、裁剪、鉴权透传', '解决接口碎片化、多端差异、前后端耦合、多次请求性能问题', '可按端或业务域拆分 BFF，对外暴露 REST/GraphQL', 'BFF 不应包含核心领域逻辑，只负责适配'], pitfalls: ['BFF 里写业务规则', '所有端共用一份 BFF 导致字段爆炸', '把 BFF 当作简单代理，不做聚合'] },
  { type: 'CO', level: 'P', title: '整洁架构与六边形架构如何在前端落地', tags: 'Clean Architecture、六边形架构、依赖倒置、领域层', freq: '中频', time: '8-15 分钟', desc: '请说明 Clean Architecture / Hexagonal Architecture 的核心思想，并给出前端项目的目录与依赖设计。', points: ['核心思想：领域层不依赖框架、UI、数据库，依赖方向向内', '前端映射：domain/use-case 位于核心，frameworks/ui 位于外层', '通过端口（interface）与适配器（adapter）隔离外部 API、存储、组件库', '目录示例：domain → application → adapters → ui/framework', '收益：可测试、可替换 UI 框架、业务逻辑复用'], pitfalls: ['在小项目中过度分层', '领域层直接 import UI 组件', '接口设计不稳定，替换成本依然高'] },
  { type: 'SC', level: 'A', title: '大型中后台系统如何进行模块拆分', tags: '模块拆分、Monorepo、业务域、依赖关系、构建', freq: '高频', time: '8-15 分钟', desc: '一个拥有上百个页面的中后台系统， monolith 导致构建慢、冲突多。请给出模块拆分方案。', points: ['按业务域（订单、商品、用户）拆分为独立包或子应用', '使用 Monorepo + pnpm workspace 管理共享依赖', '公共层下沉：UI 组件库、工具库、API 客户端独立发布', '构建侧：按需构建受影响包，远程缓存加速', '运行时集成：可选微前端或路由懒加载，保持用户体验一致'], pitfalls: ['按技术层（components/utils）而非业务域拆分', '拆分后仍互相直接引用内部实现', '没有统一版本管理，子模块升级失控'] },
  { type: 'SD', level: 'R', title: '设计一个支持多终端的 BFF 层', tags: 'BFF、多端、API 聚合、GraphQL、缓存', freq: '高频', time: '15-30 分钟', desc: '请为 Web、App、小程序、运营后台设计统一的 BFF 架构，兼顾差异与复用。', points: ['抽象设备无关的核心数据模型，BFF 负责映射到各端视图模型', '按端提供独立 BFF 入口，共享通用 Service 层', '使用 GraphQL 或聚合接口减少请求数，注意 N+1 与缓存', '统一鉴权、限流、日志、trace_id 透传', '监控各端接口耗时、错误率，按端发布回滚'], pitfalls: ['所有端共用字段导致 App 包变大', 'BFF 泄露核心领域逻辑', '多端差异大却强统一数据模型'] },
  { type: 'CO', level: 'A', title: '什么是防腐层（Anti-Corruption Layer）', tags: '防腐层、DDD、适配器、领域模型', freq: '中频', time: '5-8 分钟', desc: '请解释防腐层的作用，并举例说明前端如何用它隔离外部 API 对领域模型的污染。', points: ['ACL 用于把外部模型转换为本领域模型，防止外部变化扩散', '前端例子：后端返回 snake_case 数据库字段，ACL 转为领域对象', '放置位置：靠近数据入口（repository / api adapter），不进入业务逻辑', '使用 mapper 函数或类，集中处理字段映射与默认值', '当外部接口升级时，只需改 ACL'], pitfalls: ['在每个组件里做字段转换', 'ACL 里写业务规则', '领域模型直接使用后端 DTO'] },
  { type: 'SC', level: 'P', title: '前端如何应对高并发秒杀活动的流量峰值', tags: '高并发、秒杀、限流、降级、CDN、缓存', freq: '中频', time: '8-15 分钟', desc: '某电商大促秒杀页面预计 QPS 极高，请从前后端协作角度给出前端架构方案。', points: ['静态资源预热：HTML/JS/CSS 推送到 CDN 并启用强缓存', '前端限流：倒计时后统一放行、令牌桶控制按钮点击', '请求合并与去重：避免重复提交，幂等 key 防止超卖', '降级策略：库存接口熔断时展示缓存数据或排队页', '监控：上报点击率、下单转化率、接口错误率，实时调整'], pitfalls: ['靠前端单独扛流量，不协同后端限流', '秒杀按钮不做防抖导致重复提交', '缓存数据不提示用户可能过期'] },
  { type: 'SD', level: 'A', title: '设计一个前端错误边界与降级渲染体系', tags: '错误边界、降级、容错、监控、React', freq: '高频', time: '8-15 分钟', desc: '请设计一套前端错误处理体系，覆盖运行时错误、异步错误、子应用错误，并说明降级策略。', points: ['同步渲染错误：React Error Boundary / Vue errorHandler', '异步错误：Promise catch、全局 unhandledrejection、fetch 拦截器', '资源错误：window error 捕获阶段监听', '子应用错误：微前端基座捕获生命周期异常', '降级分级：组件级占位、页面级错误页、子应用级切换备用', '监控联动：上报 componentStack、trace_id、版本，按 fingerprint 聚合'], pitfalls: ['只用 window.onerror 捕获所有错误', '错误边界内直接白屏', '错误信息缺少上下文'] },
  { type: 'EN', level: 'A', title: '如何设计前端项目的 CI/CD 流水线', tags: 'CI/CD、流水线、质量门禁、自动化、部署', freq: '高频', time: '8-15 分钟', desc: '请为一个中型前端团队设计 CI/CD 流水线，覆盖代码提交到生产发布的完整流程。', points: ['触发：Push / MR / 定时 / 手动', '静态检查：ESLint、Prettier、TypeScript、依赖审计', '测试：单元测试、集成测试、E2E 核心路径', '构建产物分析：包体积预算、重复依赖检测', '部署预览：MR 自动生成 preview', '发布：灰度 -> 全量，保留上一版本 CDN 目录用于回滚'], pitfalls: ['CI 只跑构建不跑测试', '包体积无限制', '生产发布无灰度'] },
  { type: 'SS', level: 'R', title: '作为前端架构师如何推动架构落地', tags: '跨团队协作、架构师、沟通、影响力、推动落地', freq: '中频', time: '8-15 分钟', desc: '在推动跨团队前端架构改造时，你如何与后端、产品、运维协作并处理分歧？', points: ['用业务语言描述收益，与各团队 OKR 对齐', '召开 RFC 评审，让后端、运维、QA、产品参与', '先找痛点团队试点，跑出案例再推广', '提供脚手架、文档、培训，降低接入成本', '用数据和 PoC 处理技术分歧，向管理层沟通资源分歧'], pitfalls: ['只从技术角度推动', '方案确定后才通知相关团队', '遇到阻力就放弃'] },
  { type: 'CO', level: 'P', title: 'Bounded Context 如何映射到前端架构', tags: 'Bounded Context、DDD、前端拆分、领域边界', freq: '中频', time: '5-8 分钟', desc: '请解释 DDD 中的 Bounded Context，并说明它与微前端、组件库的关系。', points: ['Bounded Context 是明确业务边界，内部有自己的领域模型和通用语言', '前端按业务域拆分模块或应用，模块内部自治', '上下文间通过事件、URL、防腐层集成', '与微前端：Context 是业务划分依据，微前端是技术集成手段', '组件库是技术复用，不应包含业务领域知识'], pitfalls: ['把技术层当业务上下文拆分', '所有子应用共享同一领域模型', '组件库里混入业务逻辑'] },
  { type: 'CO', level: 'A', title: '什么是 Circuit Breaker，前端如何配合', tags: '熔断、降级、容错、可靠性、失败模式', freq: '中频', time: '5-8 分钟', desc: '请解释熔断机制的原理和状态机，并说明前端在调用后端服务时如何配合。', points: ['熔断状态：Closed（正常）、Open（快速失败）、Half-Open（探测）', '前端识别网关返回的 503/429 或特定 header', '熔断时展示缓存、默认推荐或友好提示', '幂等请求可有限重试，非幂等请求不重试', '上报熔断触发次数和用户体验影响'], pitfalls: ['非幂等请求自动重试', '熔断后无任何 UI 反馈', '把熔断当作家常便饭'] },
  { type: 'SC', level: 'A', title: '前端应用灰度发布的技术方案', tags: '灰度发布、Canary、Feature Flag、回滚、监控', freq: '高频', time: '8-15 分钟', desc: '请设计一个前端应用的灰度发布方案，支持按用户、地域、流量比例放量。', points: ['灰度标识：cookie/header/用户 ID 哈希分桶', '资源版本化：JS/CSS 带 hash，新旧版本共存 CDN', '放量策略：百分比、白名单、地域、业务属性逐步扩大', '监控：错误率、核心转化率、性能指标', '回滚：切换流量或回退 Feature Flag，无需重新发版'], pitfalls: ['随机分桶导致同一用户前后版本不同', '只放量不看指标', '回滚需要重新发版'] },
  { type: 'CP', level: 'R', title: '如何在组织中推进前端架构升级', tags: '架构升级、组织推动、技术债、治理、ROI', freq: '高频', time: '15-30 分钟', desc: '公司技术债严重，你计划推进一次大规模前端架构升级。请说明策略和风险控制。', points: ['明确目标与度量：构建时长、错误率、交付周期、性能', '分阶段：试点 -> 标杆业务 -> 全面推广', '建立治理组织：前端技术委员会、架构评审', '提供迁移工具、文档、培训，降低接入成本', '风险控制：保留旧版本、Feature Flag、灰度回滚、业务影响兜底'], pitfalls: ['一上来要求所有老项目重写', '只定规范没有工具', '忽视团队学习成本'] },
  { type: 'EN', level: 'R', title: '如何设计前端标准化工具链', tags: '工程化、工具链、标准化、CLI、模板、CI', freq: '中频', time: '8-15 分钟', desc: '公司前端技术栈多样、构建配置不统一。请设计一套标准化工具链及推广策略。', points: ['脚手架 CLI 内置项目类型：中后台、H5、微前端子应用', '共享配置包：eslint-config、tsconfig、vite-config', '统一流程：提交规范、Changeset、MR 模板、CI 流水线', '可观测：构建产物分析、性能预算、CVE 扫描', '推广：旧项目渐进接入，接入率纳入 OKR'], pitfalls: ['标准化变成僵化，不允许特例', '只提供规范没有工具', '强制一刀切'] },
  { type: 'CO', level: 'A', title: '前端架构中的 Idempotency 是什么意思', tags: '幂等、接口设计、重试、一致性', freq: '中频', time: '3-5 分钟', desc: '请解释幂等性在前端架构中的意义，以及哪些前端操作需要保证幂等。', points: ['幂等：同一操作执行多次与一次效果相同', '前端场景：表单提交、支付、点赞、同步请求', '通过唯一请求 ID（idempotency-key）让服务端识别重复', '重试策略：幂等可自动重试，非幂等需提示用户确认', '本地操作日志也可利用幂等实现离线同步'], pitfalls: ['所有请求都自动重试', '幂等 key 由前端生成但不保证唯一', '认为 GET 天然幂等就忽略其他方法'] },
  { type: 'SC', level: 'P', title: '微服务架构下前端的数据一致性策略', tags: '数据一致性、Saga、补偿、最终一致、微服务', freq: '中频', time: '8-15 分钟', desc: '前端调用多个微服务完成业务流程时可能部分成功。请说明一致性方案。', points: ['跨服务操作交给 BFF/Saga 编排，避免前端处理分布式事务', '最终一致性：本地乐观更新，后台异步补偿', '提供状态查询接口，让用户刷新查看最终结果', '超时请求采用“先查后重试”，避免盲目重发'], pitfalls: ['前端串行调多个服务自己处理补偿', '失败时直接提示成功', '对非幂等接口超时后自动重试'] },
  { type: 'CO', level: 'A', title: '什么是 Service Mesh，前端需要关注吗', tags: 'Service Mesh、Istio、Sidecar、微服务、网络', freq: '低频', time: '3-5 分钟', desc: '请解释 Service Mesh 的核心能力，并说明前端架构师是否需要关注。', points: ['Service Mesh 通过 Sidecar 提供服务发现、负载均衡、熔断、限流、加密、可观测', '前端通常不直接部署 Sidecar，但需关注网关行为变化', '协作点：trace_id 透传、CORS、超时、重试策略', '边缘网关或 BFF 层也可能用到类似理念'], pitfalls: ['认为 Service Mesh 是前端技术', '忽略 Sidecar 引入的延迟', 'Header 透传规则改变导致调试困难'] },
  { type: 'SD', level: 'R', title: '设计一个前端组件库/设计系统架构', tags: '组件库、设计系统、Monorepo、Token、主题', freq: '高频', time: '15-30 分钟', desc: '请设计一个企业级前端组件库，覆盖组件分层、主题定制、文档、测试、发布。', points: ['分层：Token -> 基础组件 -> 业务组件 -> 页面模板', 'Monorepo：core、theme、icons、docs、playground', '主题：CSS Variables / JS Token，支持品牌色、暗色模式', '文档：Storybook + 视觉回归 + 自动提取 Props', '测试：单元、快照、a11y；发布：changeset + CI 自动发布'], pitfalls: ['组件库依赖业务逻辑', '主题硬编码', '只重开发不重文档测试'] },
  { type: 'CP', level: 'R', title: '前端架构如何应对业务高速变化和不确定性', tags: '演进式架构、可扩展性、插件化、Feature Flag', freq: '中频', time: '15-30 分钟', desc: '业务方向频繁调整，前端架构如何快速响应又避免过度设计？', points: ['演进式架构：核心域稳定，可变部分用插件/配置/Feature Flag 隔离', '延迟决策：对不确定需求保留扩展点', '模块化与接口稳定，内部实现可替换', 'A/B 测试验证假设，失败快速回滚', '技术债管理：区分战略债与偶然债'], pitfalls: ['为不确定未来过度抽象', '业务一变就推翻重来', '忽视技术债'] },
  { type: 'EN', level: 'P', title: '前端如何实现可重复可审计的构建与发布', tags: '可重复构建、SBOM、签名、审计、CI/CD', freq: '中频', time: '8-15 分钟', desc: '请说明如何通过工程化手段保证前端构建产物可重复、可审计，并防止篡改。', points: ['锁定依赖：lockfile + 固定 Node 版本 + 固定 CI 镜像', '可重复构建：清理环境变量、禁用非确定性行为、比对 hash', '产物签名：构建产物哈希清单，发布时签名', 'SBOM：记录依赖和构建工具清单', '审计日志：构建人、时间、commit、参数可追溯'], pitfalls: ['每次构建依赖 latest', '产物不上传 hash', '缺少源码到产物映射'] },
  { type: 'SC', level: 'P', title: '设计一个支持离线使用的复杂表单系统', tags: '离线优先、表单、本地存储、同步、冲突', freq: '中频', time: '8-15 分钟', desc: '现场作业应用网络不稳定，需要表单离线可用、联网后自动同步。请设计前端架构。', points: ['本地优先：表单状态保存在 IndexedDB，所有操作先写本地', '变更日志：记录每个字段修改，支持撤销与冲突合并', '同步策略：比较本地与服务端版本，按业务规则合并', '队列与重试：提交请求排队；非幂等操作加 idempotency-key', '草稿与提交：自动保存草稿，用户可主动提交'], pitfalls: ['离线时不做校验', '直接覆盖服务端数据', '同步失败不提示用户'] },
  { type: 'CO', level: 'P', title: 'API Composition 与 GraphQL BFF 的取舍', tags: 'API Composition、GraphQL、BFF、数据聚合', freq: '中频', time: '5-8 分钟', desc: '请比较 RESTful BFF 的接口聚合与 GraphQL BFF 的 API 组合，分析适用场景。', points: ['API Composition：编排层调用多个下游服务组合前端需要的数据', 'GraphQL BFF：前端按需查询字段，BFF 负责 resolver 聚合', 'REST 简单、缓存友好；端增多、字段冗余', 'GraphQL 减少请求和字段裁剪；缓存复杂、N+1、学习成本高', '多端差异大且查询灵活用 GraphQL；接口稳定、缓存要求高用 REST'], pitfalls: ['GraphQL 解决所有问题', 'REST BFF 大量字段裁剪', 'N+1 未做 DataLoader 优化'] },
  { type: 'SD', level: 'R', title: '设计一个前端性能监控与预警平台', tags: '性能监控、RUM、预警、Web Vitals、可观测', freq: '中频', time: '15-30 分钟', desc: '请为大型产品前端设计性能监控平台，覆盖采集、指标、告警和治理闭环。', points: ['采集层：web-vitals、Performance API、长任务、资源 timing', '聚合层：按页面、版本、地区、设备分组，计算 P50/P75/P95', '展示层：趋势图、热力图、下钻到单条 trace', '告警层：P75 阈值、异常波动、发布关联告警', '治理闭环：告警 -> 定位 -> 修复 -> 回归验证 -> 更新基线'], pitfalls: ['只看平均值忽略长尾', '告警阈值过严导致疲劳', '不关联发布版本'] },
  { type: 'CO', level: 'A', title: '什么是金丝雀发布，前端如何实现', tags: '金丝雀发布、灰度、Canary、监控、回滚', freq: '高频', time: '3-5 分钟', desc: '请解释金丝雀发布的概念，并说明前端应用实现金丝雀发布的技术方案。', points: ['金丝雀：先让少量用户使用新版本，观察指标后再全量', '实现：CDN/边缘按百分比或用户特征返回新版本 HTML，或用 Feature Flag', '关键：分桶一致、监控完善、可回滚', '指标：错误率、核心流程成功率、性能', '资源带版本 hash，新旧版本可共存 CDN'], pitfalls: ['随机分桶导致用户看到不同版本', '只放量不看指标', '回滚需要重新发版'] },
  { type: 'SC', level: 'A', title: '如何设计一个可扩展的权限前端架构', tags: '权限、RBAC、ABAC、路由守卫、按钮级权限', freq: '高频', time: '8-15 分钟', desc: '请设计前端权限系统，支持菜单、路由、按钮、数据字段等多维度控制。', points: ['模型：RBAC 适合简单场景，ABAC 适合复杂动态场景', '数据层：登录后获取权限码/策略，前端缓存并订阅变更', '路由权限：守卫过滤菜单和路由，无权限跳转或隐藏', '组件权限：高阶组件/指令控制按钮、字段渲染', '数据权限：敏感字段由服务端过滤，前端兜底'], pitfalls: ['权限判断写死在前端', '只控制菜单不控制路由按钮', '前端信任后端返回的敏感数据'] },
  { type: 'CP', level: 'P', title: '前端架构中的延迟决策原则如何实践', tags: '延迟决策、演进式架构、可扩展性、架构原则', freq: '低频', time: '5-8 分钟', desc: '请解释架构设计中的延迟决策原则，并举例前端如何在不牺牲质量的前提下延迟决策。', points: ['延迟决策：信息不足时不提前做不可逆选择', '抽象稳定接口，不确定实现放到插件/适配器', '例子：不确定图表库时定义图表接口，底层可替换 ECharts/D3', '核心骨架定好，可变部分开放扩展', '用 ADR 记录决策时机，避免无限拖延'], pitfalls: ['完全不做设计', '把延迟决策当借口导致技术债', '接口设计不稳定'] },
  { type: 'EN', level: 'A', title: '前端如何管理软件包的依赖升级与兼容性', tags: '依赖管理、版本升级、兼容性、SemVer、lockfile', freq: '中频', time: '5-8 分钟', desc: '请说明大型前端项目中依赖升级的策略、风险评估、影响范围控制和回滚。', points: ['依赖分级：核心框架、构建工具、业务库、工具库', '遵循 SemVer，major 升级需评审和回归测试', '渐进升级：先独立分支或试点验证，再推广', '兼容性：codemod 批量迁移，破坏性变更提供 shim', '回滚：lockfile 保留旧版本，构建产物版本化'], pitfalls: ['major 版本直接全量改', '不读 changelog', '升级后没有回归测试'] },
  { type: 'SD', level: 'A', title: '设计一个前端日志与审计系统', tags: '日志、审计、合规、采集、脱敏', freq: '中频', time: '8-15 分钟', desc: '金融前端需记录用户关键操作日志用于审计。请设计采集、传输、存储和查询方案。', points: ['事件定义：who/when/what/result/context', '采集：SDK 在关键操作点记录，本地暂存后批量加密上报', '传输：HTTPS + 签名防篡改，失败重试并本地持久化', '脱敏：手机号、卡号、密码不上传或哈希', '存储查询：服务端不可篡改存储，支持按维度查询', '合规：保留期限、不可删除、权限控制'], pitfalls: ['敏感信息明文上传', '日志可被前端删除', '缺少服务端校验签名'] },
  { type: 'CO', level: 'R', title: '什么是反脆弱前端架构', tags: '反脆弱、韧性、故障、自愈、混沌工程', freq: '低频', time: '8-15 分钟', desc: '请解释前端架构中的反脆弱理念，并给出让系统在故障中更强韧的手段。', points: ['反脆弱：不仅抵御故障，还能从故障中学习改进', '手段：错误边界、自动降级、重试熔断、缓存兜底、灰度', '混沌工程：主动注入错误验证恢复能力', '可观测：完整日志、指标、链路', '组织：复盘、更新预案、自动化回归'], pitfalls: ['只追求零故障不做预案', '失败时直接白屏', '混沌实验在生产无控制执行'] },
  { type: 'SC', level: 'P', title: '如何设计跨团队协作的组件化前端平台', tags: '组件平台、跨团队、复用、设计系统、Monorepo', freq: '中频', time: '8-15 分钟', desc: '请设计支持多业务团队共享组件、同时保持各自独立性的前端平台。', points: ['分层：底层设计系统 + 业务组件市场 + 应用脚手架', '贡献流程：提交 -> 评审 -> 发布 -> 版本管理', '隔离：业务组件独立包，避免互相污染', '发现与文档：统一站点展示组件、示例、变更日志', '治理：组件健康度评分，低质量下架'], pitfalls: ['强制所有团队用同一组件', '组件质量无标准', '没有版本管理'] },
  { type: 'CO', level: 'A', title: 'IaC 在前端部署中的应用', tags: 'IaC、Terraform、Pulumi、部署、云原生', freq: '低频', time: '3-5 分钟', desc: '请说明基础设施即代码如何应用到前端部署和运维中，并举例。', points: ['IaC 用代码定义基础设施，避免手工配置差异', '前端：Terraform/Pulumi 定义 CDN、DNS、SSL、Edge Function、存储桶', '收益：环境一致、版本可控、可重复部署', '结合 CI/CD：合并代码后自动更新基础设施', '示例：Terraform 管理 Cloudflare Worker 和 S3 站点'], pitfalls: ['基础设施手动修改不同步代码', '所有环境共用配置', '权限管理不当'] },
  { type: 'SD', level: 'R', title: '设计一个前端全链路可观测体系', tags: '可观测、Trace、Metric、Log、RUM、SLO', freq: '高频', time: '15-30 分钟', desc: '请为大型前端应用设计全链路可观测体系，覆盖性能、错误、业务事件及 SLO。', points: ['三大支柱：Metrics、Logs、Traces', '关联：日志和指标带 trace_id、release、user_id', 'RUM：Web Vitals、资源加载、API 耗时、长任务', '错误：全局捕获 + Error Boundary + Source Map', '业务事件：埋点与 trace 结合', 'SLO/告警：可用性、LCP P75、错误率分级告警'], pitfalls: ['只采集错误不采性能业务', '三者无关联', '告警阈值不当'] },
];


const Q26 = [
  { type: 'CO', level: 'B', title: '什么是微前端，它解决了什么问题', tags: '微前端、微服务、前端集成、独立部署', freq: '高频', time: '3-5 分钟', desc: '请解释微前端的概念、产生背景以及它主要解决的大型前端应用痛点。', points: ['微前端把前端应用拆分为可独立开发、部署、运行的子应用', '解决巨石应用构建慢、发布耦合、技术栈锁定、团队边界不清', '常见集成方式：iframe、Web Components、Module Federation、路由分发', '适合组织规模大、业务域清晰、团队自治的场景'], pitfalls: ['为了技术炫技强行拆分', '忽略子应用间通信和样式隔离', '把微前端当万能方案'] },
  { type: 'CO', level: 'A', title: '微前端与 iframe 的区别与取舍', tags: '微前端、iframe、隔离、通信、体验', freq: '高频', time: '5-8 分钟', desc: '请比较微前端方案与 iframe 在隔离性、通信、体验、SEO 等方面的差异。', points: ['iframe 隔离最强但体验差：弹窗遮罩、路由同步、性能开销', '微前端集成更自然，用户体验接近单页应用', 'iframe 适合异构系统或第三方页面集成', '微前端需要解决样式隔离、JS 沙箱、公共依赖共享'], pitfalls: ['为了隔离一刀切用 iframe', '微前端不做沙箱导致全局污染', '忽略浏览器前进后退路由同步'] },
  { type: 'CO', level: 'P', title: 'Module Federation 的工作原理', tags: 'Module Federation、Webpack、远程模块、运行时共享', freq: '高频', time: '8-15 分钟', desc: '请说明 Webpack Module Federation 的核心概念、加载流程以及共享依赖管理。', points: ['核心：远程入口文件 remoteEntry.js 暴露模块，消费端动态加载', 'ContainerPlugin 暴露模块，ContainerReferencePlugin 消费远程模块', 'shared 配置实现依赖共享与版本匹配，避免重复加载', '加载流程：加载 remoteEntry -> 初始化共享作用域 -> import 远程模块', '适用场景：同技术栈子应用、组件级共享、动态能力扩展'], pitfalls: ['远程模块未做版本管理', 'shared 版本冲突导致运行时错误', '把构建时依赖当运行时加载'] },
  { type: 'SC', level: 'A', title: '微前端子应用间如何通信', tags: '微前端、通信、事件总线、共享状态、URL', freq: '高频', time: '5-8 分钟', desc: '请设计微前端子应用间的通信机制，并说明不同耦合程度下的选择。', points: ['低耦合：URL 参数、浏览器事件、postMessage', '中耦合：基座提供全局事件总线，约定事件名与数据格式', '紧耦合：共享状态库（如 Redux、Pinia）仅适用于同技术栈且强协同', '避免直接调用子应用内部 API，保持边界清晰', '通信协议版本化，便于独立演进'], pitfalls: ['子应用直接互相 import', '事件名无命名空间导致冲突', '共享状态膨胀导致互相影响'] },
  { type: 'SD', level: 'R', title: '设计一个企业级微前端基座', tags: '微前端、基座、路由、沙箱、生命周期', freq: '高频', time: '15-30 分钟', desc: '请设计一个支持多子应用、多技术栈的微前端基座，覆盖路由、加载、沙箱、通信、错误处理。', points: ['路由分发：根据 path 匹配子应用，支持注册表与动态加载', '生命周期：bootstrap、mount、unmount，确保子应用正确挂载卸载', 'JS 沙箱：Proxy 隔离 window/document，快照恢复', 'CSS 隔离：Shadow DOM、Scoped CSS、命名空间、构建时前缀', '公共依赖：shared 配置或 externals + 全局 UMD', '错误处理：子应用加载失败降级、超时、重试'], pitfalls: ['基座过于复杂侵入业务', '不处理子应用卸载后的内存泄漏', 'CSS 隔离不足导致样式覆盖'] },
  { type: 'CO', level: 'A', title: '微前端的样式隔离方案有哪些', tags: '微前端、CSS 隔离、Shadow DOM、Scoped CSS、命名空间', freq: '高频', time: '5-8 分钟', desc: '请列举并比较微前端中常用的样式隔离方案。', points: ['Shadow DOM：最强隔离，但兼容性、第三方组件、表单提交需注意', 'Scoped CSS：Vue scoped / CSS Modules，构建时限定作用域', '命名空间约定：BEM、前缀，依赖团队自律', '构建时前缀：PostCSS 自动加子应用前缀', '基座统一重置与主题变量，减少全局样式冲突'], pitfalls: ['完全依赖团队命名约定', 'Shadow DOM 一刀切导致组件库无法使用', '全局样式如 antd 被重复加载'] },
  { type: 'PE', level: 'A', title: '微前端如何优化首屏加载性能', tags: '微前端、性能、首屏、预加载、懒加载', freq: '高频', time: '5-8 分钟', desc: '请说明微前端架构下首屏性能优化的关键手段。', points: ['按需加载：只加载当前路由子应用及必要资源', '预加载：空闲时预加载常用子应用入口', '共享依赖：统一 externals 或 shared，避免重复加载框架', '产物优化：路由级 code split、tree shaking、压缩', '基座瘦身：基座只负责路由和加载，不承载业务逻辑'], pitfalls: ['所有子应用一次性加载', '每个子应用都打包一份 React/Vue', '基座体积过大'] },
  { type: 'FS', level: 'A', title: '微前端子应用加载失败如何排查', tags: '微前端、故障排查、加载、网络、资源', freq: '中频', time: '5-8 分钟', desc: '某子应用在微前端基座中白屏，请给出排查思路。', points: ['查看网络面板：remoteEntry 或子应用资源是否 404/超时', '检查控制台报错：JS 执行错误、依赖共享冲突、全局变量污染', '确认子应用独立运行是否正常，区分基座问题与子应用问题', '查看生命周期导出是否正确', '通过 Source Map 还原堆栈，定位代码问题'], pitfalls: ['不区分子应用独立运行与基座集成问题', '忽略共享依赖版本冲突', '没有 Source Map 无法定位'] },
  { type: 'EN', level: 'A', title: '微前端项目的 CI/CD 如何设计', tags: '微前端、CI/CD、独立部署、版本管理、回滚', freq: '中频', time: '8-15 分钟', desc: '请为微前端架构设计 CI/CD 流程，支持子应用独立部署和基座统一回滚。', points: ['子应用独立仓库或 Monorepo 中的独立包', '独立构建产物上传 CDN 或静态服务器，生成带版本号的入口地址', '基座配置子应用注册表，支持按环境指向不同版本', '发布时先灰度子应用，再更新注册表', '回滚：注册表切回旧版本，无需重新构建'], pitfalls: ['所有子应用必须同时发布', '子应用版本漂移无注册表管理', '回滚需要全量重新构建'] },
  { type: 'CP', level: 'R', title: '微前端拆分粒度如何把握', tags: '微前端、拆分粒度、业务域、团队边界', freq: '中频', time: '8-15 分钟', desc: '请说明微前端子应用拆分的原则，如何避免过细或过粗。', points: ['按业务域而非技术层拆分，每个子应用对应一个 Bounded Context', '团队边界：一个子应用最好由一个团队负责', '粒度适中：过细导致集成复杂、通信频繁；过粗失去独立价值', '公共页面或组件下沉为共享包', '随着业务演进可合并或拆分'], pitfalls: ['按页面拆分导致子应用过多', '把组件也拆成子应用', '业务边界不清导致互相依赖'] },
  { type: 'CO', level: 'P', title: '微前端中的 JS 沙箱实现方式', tags: '微前端、JS 沙箱、Proxy、快照、with', freq: '中频', time: '8-15 分钟', desc: '请解释微前端 JS 沙箱的作用与实现方案，分析各自的优缺点。', points: ['Proxy 沙箱：代理 window，隔离全局变量，子应用卸载后恢复', '快照沙箱：挂载前拍 window 快照，卸载后恢复，简单但无法多实例', 'with + iframe：隔离强但通信复杂', 'VM / QuickJS：更严格但性能与兼容性有代价', '现代框架：Qiankun 使用 Proxy + 快照降级'], pitfalls: ['认为沙箱能 100% 隔离', '不处理子应用卸载后的副作用', 'Proxy 不兼容 IE 未准备降级'] },
  { type: 'SC', level: 'A', title: '微前端中如何共享登录态与权限', tags: '微前端、登录态、权限、Token、SSO', freq: '高频', time: '5-8 分钟', desc: '请设计微前端架构下的统一登录态与权限管理方案。', points: ['登录态由基座统一维护，通过 props 或全局状态注入子应用', 'Token 存储在 httpOnly cookie 或基座内存，避免各子应用直接处理安全逻辑', '权限数据由基座获取并下发，子应用只做渲染控制', '子应用独立运行时通过 mock 或本地存储模拟权限', '退出登录时基座统一清理并通知子应用'], pitfalls: ['每个子应用各自请求登录态', 'Token 存在 localStorage 被各子应用读取', '权限逻辑散落在子应用难以审计'] },
  { type: 'PE', level: 'P', title: '微前端如何治理公共依赖版本', tags: '微前端、公共依赖、版本、共享、Module Federation', freq: '中频', time: '8-15 分钟', desc: '多个子应用使用不同版本 React，如何在基座中统一或兼容。', points: ['优先统一主框架版本，由基座 externals 加载', 'Module Federation shared 按 semver 匹配，版本不一致时降级加载', '子应用构建时输出依赖清单，基座运行时决定加载策略', '关键依赖升级走 RFC，制定迁移窗口', '提供 polyfill/shim 处理破坏性变更'], pitfalls: ['每个子应用都打包 React 导致体积爆炸', '强制所有子应用同时升级大版本', '版本冲突未处理导致运行时 hook 错误'] },
  { type: 'SD', level: 'P', title: '设计微前端下的路由与导航体系', tags: '微前端、路由、History、基座、子应用', freq: '中频', time: '8-15 分钟', desc: '请设计微前端基座与子应用的路由协作方案，支持浏览器前进后退和子应用内跳转。', points: ['基座路由作为一级路由，子应用路由作为二级路由', '基座监听 popstate，根据 path 激活对应子应用', '子应用使用自己的路由库，base 路径由基座注入', 'URL 约定：#/app/sub-path 或 /app/sub-path', '导航菜单由基座统一渲染或各子应用注册'], pitfalls: ['基座和子应用同时操作 history 导致冲突', '子应用内跳转基座无法感知', '刷新 404 未配置服务端路由'] },
  { type: 'CO', level: 'A', title: 'Qiankun 与 Module Federation 的主要区别', tags: 'Qiankun、Module Federation、微前端、运行时、构建时', freq: '高频', time: '5-8 分钟', desc: '请比较 Qiankun 和 Module Federation 在集成方式、技术栈要求、共享能力上的差异。', points: ['Qiankun 运行时加载子应用 HTML/JS，框架无关，提供沙箱和生命周期', 'Module Federation 构建时约定远程模块，运行时动态导入，同构技术栈体验更好', 'Qiankun 适合异构系统快速接入', 'MF 适合同技术栈、组件级共享、低耦合', '两者可结合：基座用 Qiankun 管理子应用，子应用内用 MF 共享组件'], pitfalls: ['认为 MF 只能用于微前端', 'Qiankun 加载任意远程组件', '忽略两者在共享依赖上的差异'] },
  { type: 'FS', level: 'P', title: '微前端子应用内存泄漏如何定位与治理', tags: '微前端、内存泄漏、卸载、事件、定时器', freq: '中频', time: '8-15 分钟', desc: '子应用频繁切换后内存持续增长，请给出排查和治理方案。', points: ['确认泄漏发生在子应用还是基座，用 Memory 面板对比快照', '检查 unmount 时是否清理事件监听、定时器、WebSocket、IntersectionObserver', '检查全局变量是否未释放、DOM 是否未移除', '基座确保卸载子应用 DOM 并调用生命周期', '建立自动化测试：切换子应用后内存回归基线'], pitfalls: ['子应用没有 unmount 生命周期', '基座只移除 DOM 不清理副作用', '依赖库在全局注册未注销'] },
  { type: 'SC', level: 'P', title: '微前端下如何保障全链路质量', tags: '微前端、E2E、集成测试、契约、质量', freq: '中频', time: '8-15 分钟', desc: '请说明微前端架构下的测试策略，如何防止子应用独立正常但集成失败。', points: ['子应用独立单测 + 集成测试，保障各自质量', '基座集成测试：验证路由、加载、通信、公共依赖', '契约测试：子应用暴露的生命周期、API、事件格式受约束', 'E2E：覆盖跨子应用流程，如 A 应用下单到 B 应用支付', '可视化回归：防止子应用样式污染基座'], pitfalls: ['只测子应用不测集成', '没有契约测试导致接口变更破坏基座', 'E2E 只在基座仓库运行'] },
  { type: 'CP', level: 'P', title: '何时应该选择微前端，何时不应该', tags: '微前端、适用场景、组织、成本、过度设计', freq: '高频', time: '5-8 分钟', desc: '请分析微前端的适用场景和反模式。', points: ['适合：多团队并行、业务域清晰、独立部署诉求强、技术栈需要渐进演进', '适合：巨石应用构建/发布严重阻塞', '不适合：团队规模小、业务边界模糊、为拆分而拆分', '不适合：对首屏性能要求极高且子应用过多', '关键判断：独立部署和团队自治带来的收益是否大于集成复杂度'], pitfalls: ['为了简历亮点引入微前端', '忽视样式隔离、通信、性能等隐性成本', '小团队拆出大量子应用'] },
  { type: 'EN', level: 'R', title: '微前端架构下的监控与可观测体系', tags: '微前端、监控、可观测、Trace、错误上报', freq: '中频', time: '8-15 分钟', desc: '请为微前端系统设计监控方案，能区分基座与子应用的问题。', points: ['统一 Trace：基座生成 trace_id，子应用请求携带', '错误上报：区分基座错误、子应用错误、加载错误', '性能：记录子应用加载耗时、首次渲染时间、资源体积', 'SLI/SLO：按子应用定义可用性、错误率目标', '仪表盘：基座视角 + 子应用视角，支持下钻'], pitfalls: ['所有错误混在一起无法定位子应用', '子应用重复初始化监控 SDK', '没有 trace_id 无法串联请求'] },
  { type: 'CO', level: 'A', title: '微前端如何影响 SEO', tags: '微前端、SEO、SSR、预渲染、爬虫', freq: '中频', time: '3-5 分钟', desc: '请分析微前端架构对 SEO 的影响及应对方案。', points: ['客户端渲染的微前端对 SEO 不友好，爬虫可能无法执行 JS', '方案：子应用 SSR/SSG，基座根据 UA 返回渲染结果', '对非 SEO 页面可用 CSR，关键页面用预渲染', '使用 History API 路由，避免 hash 路由影响收录', '提供 sitemap 和预渲染快照'], pitfalls: ['所有子应用都用 CSR 还想 SEO', '使用 hash 路由导致爬虫无法解析', '忽略预渲染后的 hydration 状态同步'] },
  { type: 'SC', level: 'A', title: '微前端子应用如何独立开发与联调', tags: '微前端、开发体验、独立运行、Mock、代理', freq: '中频', time: '5-8 分钟', desc: '请设计微前端子应用的本地开发与联调方案。', points: ['子应用支持独立运行，通过环境变量判断是否在基座中', '本地开发：子应用 standalone 模式 + mock 基座注入', '联调：基座本地指向子应用 dev server 地址', '统一代理配置，解决跨域和登录态', '文档化子应用接口与注册方式'], pitfalls: ['子应用只能在基座中运行，开发效率低', '本地联调频繁改基座代码', '子应用独立运行时权限缺失'] },
  { type: 'SD', level: 'R', title: '设计一个支持离线能力的微前端应用', tags: '微前端、PWA、Service Worker、离线、缓存', freq: '低频', time: '15-30 分钟', desc: '请设计一个微前端架构下的离线可用方案，支持子应用资源缓存和更新。', points: ['基座注册 Service Worker，统一拦截所有子应用资源请求', '缓存策略：基座核心 HTML 网络优先，子应用 JS/CSS 缓存优先 + hash', '子应用更新后通过注册表更新缓存，支持旧版清理', '离线时展示已缓存子应用，未缓存子应用提示联网', '后台同步关键用户操作'], pitfalls: ['每个子应用各自注册 SW 导致冲突', '缓存策略过强导致用户无法获取新版', '离线时子应用依赖未缓存'] },
  { type: 'CO', level: 'P', title: '微前端中的公共状态管理反模式', tags: '微前端、状态管理、共享状态、耦合', freq: '中频', time: '5-8 分钟', desc: '请说明微前端架构下共享状态的常见反模式与推荐做法。', points: ['反模式：全局 store 被所有子应用读写，边界模糊', '推荐：状态按所有权归属，跨子应用状态通过事件传递', '全局只保留用户、主题、语言等基础上下文', '子应用内部状态自治，不暴露给外部', '需要共享的业务状态上升为基座或 BFF 管理'], pitfalls: ['所有子应用共享 Redux store', '子应用直接修改其他子应用状态', '共享状态无版本和契约'] },
  { type: 'PE', level: 'R', title: '微前端大规模下的性能预算与治理', tags: '微前端、性能预算、包体积、治理、度量', freq: '中频', time: '8-15 分钟', desc: '请说明如何在微前端架构下制定和落实性能预算。', points: ['按子应用制定 JS/CSS 体积预算、请求数、LCP 目标', 'CI 阶段检查子应用产物是否超预算', '共享依赖统一 external，避免重复打包', '建立性能看板，按子应用、版本、路由展示', '超标处理：阻断发布或要求负责人审批'], pitfalls: ['只关注基座性能忽略子应用', '预算是总值不拆分', '没有 CI 卡点导致预算形同虚设'] },
  { type: 'SC', level: 'P', title: '微前端中如何处理第三方脚本与全局组件', tags: '微前端、第三方脚本、全局组件、沙箱、污染', freq: '中频', time: '5-8 分钟', desc: '子应用需要加载第三方 SDK 或共享全局弹窗组件，如何设计？', points: ['第三方脚本由基座统一加载一次，通过 props 或事件供子应用使用', '全局组件（如支付弹窗）封装为共享包或远程模块', '脚本加载使用异步加载和错误兜底', '防止第三方脚本污染 window，使用 Proxy 沙箱或 iframe 隔离', '明确第三方脚本的升级与回滚责任方'], pitfalls: ['每个子应用各自加载相同 SDK', '第三方脚本直接操作 DOM 导致沙箱失效', '全局组件与子应用状态耦合'] },
  { type: 'FS', level: 'A', title: '微前端子应用样式突然错乱如何定位', tags: '微前端、CSS、样式隔离、优先级、排查', freq: '中频', time: '5-8 分钟', desc: '某子应用在基座中样式正常，另一子应用切换后回来样式错乱，如何排查？', points: ['检查全局样式是否未隔离，如 antd 被重复加载覆盖', '查看 CSS 选择器优先级是否被子应用或基座全局样式影响', '确认子应用卸载时是否清除了动态注入的 style 标签', '检查 Shadow DOM 内外样式穿透', '用浏览器 DevTools 对比正常与异常时的 Computed Style'], pitfalls: ['只看自己子应用的样式，不检查基座', '忽略子应用卸载未清理的样式', '没有使用 Scoped CSS 或 CSS Modules'] },
  { type: 'CP', level: 'A', title: '微前端落地中最大的风险是什么', tags: '微前端、风险、组织、技术债、治理', freq: '高频', time: '5-8 分钟', desc: '如果要在公司落地微前端，你认为最大的三个风险是什么，如何规避？', points: ['组织风险：团队边界不清，子应用成为互相扯皮的边界', '技术风险：集成复杂、调试困难、性能下降', '治理风险：公共依赖版本漂移、接口契约失控、质量不可见', '规避：明确业务域与团队责任，建立 RFC 与治理委员会', '逐步推进：先试点再推广，度量收益与成本'], pitfalls: ['低估组织复杂度', '只关注技术实现不建治理', '一次性全量拆分'] },
  { type: 'EN', level: 'P', title: '微前端子应用的构建产物如何组织', tags: '微前端、构建产物、CDN、版本、注册表', freq: '中频', time: '5-8 分钟', desc: '请说明微前端子应用构建产物的目录、命名、版本管理和基座加载方式。', points: ['产物按版本目录存放，如 /subapp/order/v1.2.3/', '入口文件命名固定：index.html 或 remoteEntry.js', '静态资源带 hash，长期缓存；入口文件短缓存', '基座通过注册表获取当前环境子应用版本列表', '支持按环境、灰度、用户分组指向不同版本'], pitfalls: ['所有子应用产物放在同一目录', '入口文件缓存过长导致无法更新', '版本列表硬编码在基座代码中'] },
  { type: 'SD', level: 'R', title: '设计一个无基座的去中心化微前端方案', tags: '微前端、去中心化、路由、Module Federation、边缘', freq: '低频', time: '15-30 分钟', desc: '请设计一个不需要统一基座的微前端架构，各子应用可独立运行也可组合。', points: ['使用 Web Components 或 Module Federation 暴露组件', '入口聚合：边缘网关或 SSR 根据路由拼接页面', '共享设计系统组件库作为 Web Components', '路由：各应用使用约定 URL，通过 shell 页面或边缘编排', '状态：通过浏览器存储、URL、事件总线通信', '治理：统一组件注册与版本发现服务'], pitfalls: ['去中心化导致无统一体验', '组件版本冲突无协调', '路由和导航由各应用自行实现不一致'] },
  { type: 'CO', level: 'B', title: 'single-spa 与 Qiankun 的关系', tags: 'single-spa、Qiankun、微前端、生命周期', freq: '高频', time: '3-5 分钟', desc: '请解释 single-spa 和 Qiankun 的关系与区别。', points: ['single-spa 是微前端框架，提供路由分发和生命周期规范', 'Qiankun 基于 single-spa，增加了 JS 沙箱、CSS 隔离、HTML Entry、预加载等能力', 'Qiankun 更易用，适合快速落地；single-spa 更灵活但需要自己封装', '两者都不限定构建工具'], pitfalls: ['认为 Qiankun 和 single-spa 完全独立', '忽略 single-spa 的生命周期约定', '把 Qiankun 当唯一选择'] },
  { type: 'SC', level: 'A', title: '微前端与 Monorepo 如何结合', tags: '微前端、Monorepo、依赖、复用、构建', freq: '中频', time: '5-8 分钟', desc: '请说明微前端与 Monorepo 结合的优势和实践。', points: ['Monorepo 管理共享包、组件库、工具函数，子应用独立包', '统一代码规范、CI、依赖版本', '子应用可独立部署，也可通过 affected 构建提速', '公共依赖放在 workspace root，子应用通过 workspace 协议引用', '结合 Module Federation 在 Monorepo 内共享远程模块'], pitfalls: ['Monorepo 与微前端概念混淆', '所有代码放一个包失去独立部署', '子应用互相 import 内部模块'] },
  { type: 'PE', level: 'A', title: '微前端下的资源预加载策略', tags: '微前端、预加载、性能、加载时机、带宽', freq: '中频', time: '5-8 分钟', desc: '请设计微前端子应用的资源预加载策略，平衡性能与带宽。', points: ['基于路由预加载：用户 hover 菜单或进入父路由时预加载', '基于权限预加载：登录后预加载用户可见子应用入口', '基于空闲预加载：requestIdleCallback 加载低优先级资源', 'CDN 预热：将高频子应用资源推送到边缘节点', '避免预加载过多导致带宽浪费和主线程阻塞'], pitfalls: ['一次性预加载所有子应用', '预加载不区分优先级', '移动网络下过度预加载'] },
];


const Q27 = [
  { type: 'CO', level: 'B', title: '浏览器渲染管线的关键阶段', tags: '渲染管线、CRP、重排、重绘、合成', freq: '高频', time: '3-5 分钟', desc: '请描述从输入 URL 到页面显示的主要步骤，以及优化关键渲染路径的方法。', points: ['DNS/TCP/TLS、请求 HTML、解析 DOM/CSSOM、执行 JS、构建渲染树、布局、绘制、合成', '优化：减少关键资源数量、压缩体积、使用 preload/prefetch', '避免阻塞渲染的 JS：defer/async、代码分割', 'CSS 放头部，JS 放底部或异步', '减少重排重绘：使用 transform/opacity 触发合成层'], pitfalls: ['把重绘和重排混为一谈', '认为所有 CSS 都会阻塞渲染', '滥用 will-change 导致内存暴涨'] },
  { type: 'CO', level: 'A', title: 'Core Web Vitals 指标含义与优化', tags: 'Web Vitals、LCP、INP、CLS、性能指标', freq: '高频', time: '5-8 分钟', desc: '请解释 LCP、INP、CLS 的含义、目标阈值及优化手段。', points: ['LCP：最大内容绘制，反映加载体验，目标 ≤2.5s', 'INP：交互到下一次绘制，反映交互响应，目标 ≤200ms', 'CLS：累积布局偏移，反映视觉稳定性，目标 ≤0.1', 'LCP 优化：预加载关键资源、图片压缩、SSR、CDN、字体优化', 'INP 优化：长任务拆分、事件处理轻量化、使用 requestIdleCallback', 'CLS 优化：图片/视频设置尺寸、避免插入无尺寸内容、字体预留空间'], pitfalls: ['只看 FP/FCP 忽略 LCP', '把 CLS 仅归咎于图片', '忽略 INP 对交互体验的影响'] },
  { type: 'PE', level: 'A', title: '首屏加载性能优化清单', tags: '首屏、性能优化、代码分割、SSR、预加载', freq: '高频', time: '8-15 分钟', desc: '请系统性地列出提升首屏加载速度的手段。', points: ['减少请求体积：tree shaking、压缩、图片 WebP/AVIF、CDN', '代码分割：按路由/组件动态 import，首屏只加载必要代码', 'SSR/SSG：减少客户端渲染时间，直接输出 HTML', '资源优先级：preload 关键 CSS/字体，prefetch 下一页', '缓存策略：长缓存静态资源、Service Worker 离线缓存', '服务端优化：Brotli、HTTP/2、边缘缓存'], pitfalls: ['只优化 JS 忽略字体和图片', '过度分割导致请求过多', 'SSR 不做缓存反而拖慢'] },
  { type: 'PE', level: 'P', title: '如何优化大型列表渲染性能', tags: '虚拟列表、长列表、渲染优化、DOM、性能', freq: '高频', time: '5-8 分钟', desc: '请说明长列表渲染的性能瓶颈及解决方案。', points: ['瓶颈：DOM 节点过多导致布局、绘制、内存开销大', '虚拟滚动：只渲染可视区 + 缓冲区的节点，如 react-window', '分页/无限滚动：减少一次性数据量', '避免在滚动时执行复杂计算和 setState', '使用 CSS contain、will-change 优化渲染层', '大数据量时考虑 Canvas/WebGL 渲染'], pitfalls: ['一次性渲染全部数据', '虚拟列表项高度不固定未处理', '滚动事件中频繁 setState'] },
  { type: 'CD', level: 'A', title: 'React.memo/useMemo/useCallback 的使用边界', tags: 'React、memo、useMemo、useCallback、渲染优化', freq: '高频', time: '5-8 分钟', desc: '请辨析 React 中三种缓存手段的作用、适用场景与误用风险。', points: ['React.memo：缓存组件渲染结果，props 浅比较', 'useMemo：缓存计算结果，避免重复复杂计算', 'useCallback：缓存函数引用，配合 memo 使用', '适用：高开销计算、子组件依赖稳定 callback、大数据处理', '误用：缓存简单计算增加开销、依赖数组错误导致 bug'], pitfalls: ['所有组件都包 React.memo', 'useCallback 不加依赖或依赖过多', '把 useMemo 当万能缓存'] },
  { type: 'PE', level: 'P', title: '如何减少 JavaScript 执行时间', tags: 'JS 执行、长任务、性能、Web Worker、代码拆分', freq: '高频', time: '5-8 分钟', desc: '请说明减少主线程 JS 执行时间的策略。', points: ['代码分割与懒加载，减少首屏 JS 体积', '长任务拆分为多个小任务，使用 setTimeout/requestIdleCallback/yieldToMain', 'Web Worker 处理计算密集型任务', '避免在循环中触发重排', '使用 requestAnimationFrame 做动画', '减少第三方脚本和 polyfill'], pitfalls: ['所有逻辑放主线程', '频繁操作 DOM 在循环中', '忽略第三方 SDK 的性能影响'] },
  { type: 'PE', level: 'R', title: '设计一个前端性能治理体系', tags: '性能治理、性能预算、监控、CI、度量', freq: '中频', time: '15-30 分钟', desc: '请为公司级前端产品设计性能治理体系，覆盖指标、工具、流程和组织。', points: ['指标：Web Vitals、自定义业务指标、P75/P95 长尾', '工具：Lighthouse、web-vitals、RUM、包体积分析', '流程：MR 阶段性能门禁、发布前回归、线上监控告警', '性能预算：JS/CSS 体积、请求数、LCP/INP 阈值', '组织：性能负责人、定期 review、优秀案例分享'], pitfalls: ['只看平均值', '预算只在文档中，CI 不卡点', '没有业务指标只看技术数据'] },
  { type: 'CO', level: 'A', title: 'HTTP 缓存策略在前端的使用', tags: 'HTTP 缓存、Cache-Control、ETag、强缓存、协商缓存', freq: '高频', time: '5-8 分钟', desc: '请说明强缓存与协商缓存的原理及前端如何配合。', points: ['强缓存：Cache-Control/Expires，命中不请求服务器', '协商缓存：Last-Modified/ETag，询问服务器是否变化', 'HTML 使用协商缓存或短缓存，带 hash 资源使用强缓存长期缓存', '版本更新：文件名 hash 变化强制失效', 'CDN 与源站缓存策略一致'], pitfalls: ['HTML 强缓存导致发版不生效', '不带 hash 的资源长期缓存', 'ETag 与 CDN 压缩冲突'] },
  { type: 'PE', level: 'A', title: '图片性能优化手段', tags: '图片优化、WebP、懒加载、响应式、压缩', freq: '高频', time: '5-8 分钟', desc: '请系统说明图片优化的方法。', points: ['格式选择：WebP/AVIF 替代 JPEG/PNG，SVG 适合图标', '响应式图片：srcset/sizes、picture 元素', '懒加载：loading="lazy" 或 Intersection Observer', '压缩：有损/无损压缩、动态生成多尺寸', '占位：低质量占位图或模糊背景，减少 CLS', 'CDN 图片处理：按需裁剪、格式转换'], pitfalls: ['所有图片用 PNG', '不设置宽高导致布局偏移', '懒加载首屏关键图片'] },
  { type: 'SC', level: 'A', title: '如何排查页面卡顿', tags: '性能排查、卡顿、Performance、Long Task、内存', freq: '高频', time: '8-15 分钟', desc: '用户反馈页面操作卡顿，请给出排查步骤。', points: ['复现：稳定复现路径、设备、浏览器版本', 'Performance 面板：定位长任务、重排、重绘、JS 执行', '监控 INP/FID、帧率、主线程阻塞时长', '检查事件处理函数、第三方脚本、大数据渲染', '使用火焰图分析调用栈', '验证修复后回归测试'], pitfalls: ['只看网络不看主线程', '没有复现就凭猜测优化', '只在高端设备测试'] },
  { type: 'PE', level: 'P', title: 'CSS 性能优化与渲染层管理', tags: 'CSS、渲染层、重排、重绘、合成、contain', freq: '中频', time: '5-8 分钟', desc: '请说明 CSS 如何影响渲染性能，以及如何管理渲染层。', points: ['重排属性：width/height/top/left 会触发布局', '重绘属性：color/background 触发绘制', '合成属性：transform/opacity 触发 GPU 合成，性能最好', '避免布局抖动：批量读写样式，使用 FLIP 动画', 'contain 属性隔离渲染范围，减少影响面', '谨慎使用 will-change，用完移除'], pitfalls: ['动画使用 top/left 而非 transform', '滥用 will-change', '频繁读写 DOM 导致强制同步布局'] },
  { type: 'PE', level: 'A', title: '字体加载优化策略', tags: '字体、FOIT、FOUT、预加载、font-display', freq: '中频', time: '3-5 分钟', desc: '请说明 web 字体加载的性能问题及优化方案。', points: ['问题：字体阻塞渲染导致 FOIT/FOUT/CLS', 'font-display: swap 先显示fallback再替换', 'preload 关键字体，减少下载时间', '只加载必要字重和子集', '使用系统字体栈兜底，提升感知速度', '变量字体减少请求数'], pitfalls: ['加载整个字体文件', '不设置 font-display 导致白屏', '自定义字体无 fallback 导致布局偏移'] },
  { type: 'CO', level: 'P', title: 'Resource Hints 的使用场景', tags: 'Resource Hints、preload、prefetch、preconnect、dns-prefetch', freq: '中频', time: '5-8 分钟', desc: '请解释 preload、prefetch、preconnect、dns-prefetch 的区别与使用时机。', points: ['preload：当前页面必定需要的资源，提升优先级', 'prefetch：下一页可能需要的资源，低优先级空闲加载', 'preconnect：提前建立连接，减少 DNS/TCP/TLS 耗时', 'dns-prefetch：仅提前解析 DNS', '不要滥用 preload，避免带宽竞争'], pitfalls: ['对所有资源都 preload', 'prefetch 阻塞首屏', 'preconnect 到未使用的域名'] },
  { type: 'PE', level: 'R', title: '如何优化前端包体积', tags: '包体积、Tree Shaking、代码分割、依赖治理、构建', freq: '高频', time: '8-15 分钟', desc: '请系统说明减少前端产物体积的方法。', points: ['Tree Shaking：ESM、sideEffects 配置', '代码分割：路由/组件动态加载', '依赖治理：移除无用依赖、替换大库、按需加载组件库', '压缩：Terser、CSS 压缩、Gzip/Brotli', '图片/字体/多语言资源懒加载', '构建分析：webpack-bundle-analyzer、rollup-plugin-visualizer'], pitfalls: ['引入全量组件库', '动态导入但父包仍打包全部', '忽略 Brotli 压缩'] },
  { type: 'PE', level: 'P', title: '内存泄漏的常见原因与排查', tags: '内存泄漏、Performance、DevTools、闭包、事件监听', freq: '中频', time: '8-15 分钟', desc: '请说明前端内存泄漏的典型场景和排查方法。', points: ['未清理的事件监听、定时器、WebSocket', '闭包持有 DOM 引用', '全局变量或缓存无限增长', '组件卸载未取消异步请求', '排查：Memory 面板 Heap Snapshot 对比、Allocation Timeline', '定位：Detached DOM、Retainers 链路'], pitfalls: ['只看 Performance 不看 Memory', '组件卸载后仍保留订阅', '缓存无淘汰策略'] },
  { type: 'SC', level: 'P', title: '如何优化大量 DOM 操作的动画', tags: '动画、DOM、requestAnimationFrame、Web Animations、Canvas', freq: '中频', time: '5-8 分钟', desc: '页面需要同时驱动大量元素动画，请给出性能优化方案。', points: ['优先使用 transform 和 opacity，触发 GPU 合成', '使用 requestAnimationFrame，与渲染帧对齐', '批量更新：FLIP 技术先计算最终状态再动画', '复杂场景用 Canvas/WebGL 替代 DOM', '减少同时动画元素数量，使用虚拟化或层级裁剪', '避免在动画中读取布局属性'], pitfalls: ['使用 top/left 做动画', 'setInterval 驱动动画', '动画中频繁读取 offsetWidth'] },
  { type: 'CO', level: 'A', title: 'SSR 与 CSR 的性能权衡', tags: 'SSR、CSR、首屏、交互、TTFB、hydration', freq: '高频', time: '5-8 分钟', desc: '请比较 SSR 和 CSR 在首屏、交互、复杂度、成本上的差异。', points: ['SSR：首屏 HTML 直接可渲染，TTFB 略高，适合 SEO 和首屏敏感', 'CSR：TTFB 低但需下载执行 JS，首屏慢，交互后体验好', 'SSR 需要服务器资源，hydration 可能有额外开销', '混合：关键页面 SSR，后台页面 CSR； Islands Architecture', '选择：内容型站点偏 SSR，交互型应用偏 CSR'], pitfalls: ['所有页面 SSR 不考虑成本', 'SSR 不做缓存导致服务器压力过大', 'hydration 失败导致页面无法交互'] },
  { type: 'PE', level: 'A', title: '如何优化第三方脚本性能', tags: '第三方脚本、性能、async、defer、预连接', freq: '中频', time: '5-8 分钟', desc: '请说明第三方 SDK/分析脚本对性能的影响及优化方法。', points: ['影响：阻塞解析、额外请求、执行长任务、隐私合规', '优化：延迟加载到关键内容之后、使用 async/defer', '非关键脚本用 Intersection Observer 触发加载', '自托管关键脚本减少 DNS/TCP', '定期审计第三方脚本，移除无用', '使用 Partytown 将脚本移入 Web Worker'], pitfalls: ['头部加载所有第三方脚本', '同步脚本阻塞首屏', '不监控第三方脚本错误'] },
  { type: 'PE', level: 'P', title: '前端性能监控指标体系设计', tags: '性能监控、RUM、指标、P75、归因', freq: '中频', time: '8-15 分钟', desc: '请设计一个前端性能监控指标体系，能反映真实用户体验。', points: ['加载类：LCP、FCP、TTFB、页面完全加载时间', '交互类：INP、FID、点击响应时间', '稳定性：CLS、JS 错误率、资源加载失败率', '业务：白屏时间、可交互时间、关键流程耗时', '分位数：关注 P75/P95 长尾而非均值', '归因：按页面、版本、网络、设备、地域拆分'], pitfalls: ['只看均值', '指标过多无重点', '没有与业务结果关联'] },
  { type: 'SC', level: 'A', title: '如何优化首屏白屏时间', tags: '白屏、首屏、SSR、骨架屏、预渲染', freq: '高频', time: '5-8 分钟', desc: '请给出降低首屏白屏时间的具体手段。', points: ['骨架屏或 loading 占位，提升感知速度', '内联关键 CSS，异步加载非关键 CSS', '延迟非关键 JS，使用 defer/async', '预渲染/SSR 直接输出首屏 HTML', '减少关键渲染路径上的资源数量', '字体使用 swap 避免 FOIT'], pitfalls: ['骨架屏时间过长', 'CSS 全部外链阻塞渲染', 'JS 执行阻塞首屏 paint'] },
  { type: 'CO', level: 'B', title: '什么是重排与重绘', tags: '重排、重绘、布局、绘制、性能', freq: '高频', time: '3-5 分钟', desc: '请解释重排和重绘的区别，以及如何减少它们。', points: ['重排：几何属性变化导致重新计算布局', '重绘：外观属性变化导致重新绘制像素', '重排代价通常大于重绘', '减少：批量修改样式、使用 transform/opacity、避免布局抖动', '用 Chrome DevTools 的 Rendering 面板可视化'], pitfalls: ['认为重绘比重排更耗性能', '频繁读取 offsetWidth 触发强制同步布局', '在循环中逐个修改样式'] },
  { type: 'PE', level: 'A', title: 'SPA 路由切换性能优化', tags: 'SPA、路由、懒加载、预加载、keep-alive', freq: '中频', time: '5-8 分钟', desc: '请说明单页应用路由切换时的性能优化手段。', points: ['路由级代码分割，按需加载页面组件', '预加载下一页资源：hover/prefetch', 'keep-alive 缓存常用页面状态', '路由切换时保留骨架屏或过渡动画', '减少全局状态更新导致的无关组件渲染'], pitfalls: ['首屏加载所有路由代码', 'keep-alive 过多导致内存增长', '路由切换动画阻塞交互'] },
  { type: 'PE', level: 'P', title: '如何优化大量 marker 的地图性能', tags: '地图、Marker、Canvas、聚合、性能', freq: '低频', time: '8-15 分钟', desc: '地图需要展示上万 marker，请给出前端性能优化方案。', points: ['点聚合：按缩放级别聚合相邻 marker', '视口裁剪：只渲染可视区 marker', 'Canvas/WebGL 替代 DOM marker', '分层渲染：重要 marker 优先，低级别简化样式', '数据分页或瓦片加载', '使用专门的地图库如 Mapbox GL/Deck.gl'], pitfalls: ['上万 DOM marker 直接渲染', '不根据缩放级别聚合', '一次性加载全部数据'] },
  { type: 'CO', level: 'P', title: '浏览器合成器线程与主线程的关系', tags: '合成器线程、主线程、渲染、滚动、事件', freq: '中频', time: '5-8 分钟', desc: '请说明浏览器合成器线程的作用，以及它如何影响滚动和输入响应。', points: ['主线程执行 JS、布局、绘制', '合成器线程负责将图层合成并显示，可独立于主线程', '合成属性动画可在合成器线程运行，不阻塞主线程', '滚动通常由合成器线程处理，绑定滚动事件会同步到主线程', '减少主线程长任务可提升 INP'], pitfalls: ['认为所有动画都走 GPU', '滚动事件不做节流导致主线程阻塞', '合成层过多导致内存开销'] },
  { type: 'SC', level: 'P', title: '如何设计性能回归测试', tags: '性能测试、Lighthouse、CI、基准、回归', freq: '中频', time: '8-15 分钟', desc: '请设计前端性能回归测试方案，防止发布导致性能劣化。', points: ['确定基准：LCP/INP/CLS、包体积、请求数', '使用 Lighthouse CI 在 MR 阶段跑性能测试', '固定测试环境、网络、设备，减少波动', '与基线对比，超过阈值阻断合并', '监控线上 RUM，发现发布后性能回归'], pitfalls: ['测试环境不稳定导致结果波动大', '只测桌面端忽略移动端', '阈值过松无法发现问题'] },
  { type: 'PE', level: 'A', title: '如何减少首屏 JavaScript 体积', tags: 'JS 体积、Tree Shaking、代码分割、Polyfill', freq: '高频', time: '5-8 分钟', desc: '请说明降低首屏 JS 体积的具体做法。', points: ['代码分割：路由/组件懒加载', 'Tree Shaking 与 sideEffects 配置', '按需加载组件库和工具库', '移除未使用的 polyfill，按浏览器版本下发', '压缩与混淆，使用 Brotli', '利用 import() 条件加载'], pitfalls: ['整个应用打包成一个 JS', '引入全量 lodash', 'polyfill 全部打包'] },
  { type: 'CO', level: 'A', title: '什么是 Time to Interactive', tags: 'TTI、TBT、可交互、长任务、性能', freq: '中频', time: '3-5 分钟', desc: '请解释 TTI、TBT 的含义及优化思路。', points: ['TTI：页面可稳定交互的时间', 'TBT：FCP 到 TTI 之间主线程被长任务阻塞的总时间', '优化：减少长任务、拆分 JS、延迟非关键脚本、Web Worker', 'TTI 与 INP 关联，长任务多则交互差', '使用 Performance 长任务 API 监控'], pitfalls: ['只看加载时间不看可交互时间', 'TTI 低但交互卡顿', '不监控主线程阻塞'] },
  { type: 'PE', level: 'R', title: '前端性能优化的顶层方法论', tags: '性能优化、方法论、监控、预算、治理', freq: '中频', time: '8-15 分钟', desc: '请总结一个系统化的前端性能优化方法论。', points: ['度量：建立 RUM + Lab 监控，定义北极星指标', '目标：设定性能预算和 SLO', '分析：识别瓶颈，关注 P75/P95 长尾', '优化：按加载、渲染、交互、网络分层治理', '验证：A/B 测试、回归测试、线上监控', '文化：建立性能意识和责任制'], pitfalls: ['凭感觉优化', '只关注首屏忽略交互', '优化后不复盘'] },
  { type: 'SC', level: 'A', title: '如何优化电商大促活动页性能', tags: '大促、活动页、性能、预加载、降级', freq: '高频', time: '8-15 分钟', desc: '电商大促 H5 活动页需要承载高并发和复杂交互，请给出性能优化方案。', points: ['静态化：活动页预渲染为 HTML，CDN 强缓存', '资源体积：图片压缩、WebP、精灵图/IconFont', '懒加载：非首屏模块、楼层、图片按需加载', '预加载：倒计时、主会场提前加载核心资源', '降级：接口失败展示静态兜底，防止白屏', '监控：实时采集 LCP/INP/错误率，快速回滚'], pitfalls: ['活动页完全 CSR', '所有楼层一次性加载', '接口失败无兜底'] },
  { type: 'PE', level: 'P', title: 'Web Worker 在性能优化中的应用', tags: 'Web Worker、主线程、计算、性能、Transferable', freq: '中频', time: '5-8 分钟', desc: '请说明 Web Worker 适合做什么，以及前端如何安全高效地使用。', points: ['适合：计算密集型任务、大数据处理、复杂序列化', '不适合：频繁 DOM 操作、需要同步返回的小任务', '使用 Comlink 等库简化通信', 'Transferable Objects 减少大数据拷贝', '注意 Worker 生命周期和错误处理'], pitfalls: ['所有任务都放 Worker', '主 Worker 频繁通信', 'Worker 中操作 DOM'] },
  { type: 'CO', level: 'B', title: '懒加载与预加载的区别', tags: '懒加载、预加载、性能、资源优先级', freq: '高频', time: '3-5 分钟', desc: '请比较懒加载和预加载的使用场景。', points: ['懒加载：延迟非关键资源加载，减少首屏负担', '预加载：提前加载后续需要的资源，提升切换速度', '懒加载适合图片、非首屏组件、长列表', '预加载适合下一页、下一步流程的关键资源', '两者可结合：首屏懒加载非关键，空闲时预加载后续'], pitfalls: ['对首屏关键资源懒加载', '预加载过多导致带宽竞争', '忽略资源优先级'] },
  { type: 'PE', level: 'A', title: '如何优化 Webpack/Vite 构建速度', tags: '构建速度、Webpack、Vite、缓存、并行', freq: '中频', time: '5-8 分钟', desc: '请说明提升前端构建速度的方法。', points: ['缓存：persistent cache、远程缓存', '并行：thread-loader、swc/esbuild 替换 babel', '减少 loader/plugin：只处理必要文件', '代码分割与 external 大库', '升级构建工具：Vite/Rspack 利用原生 ESM', '按需构建：只构建 affected 包'], pitfalls: ['没有任何缓存', '所有文件都过 babel', '构建工具版本过老'] },
  { type: 'SC', level: 'P', title: '如何优化可交互大屏的渲染性能', tags: '大屏、可视化、渲染、Canvas、WebGL、性能', freq: '中频', time: '8-15 分钟', desc: '数据可视化大屏需要展示大量图表和实时数据，请给出性能优化方案。', points: ['图表使用 Canvas/WebGL 渲染，减少 DOM', '数据抽稀：按屏幕像素聚合大数据', '动画使用 requestAnimationFrame', '分页或虚拟化展示表格/列表', 'WebSocket 数据做节流和批量更新', '对不变化区域使用缓存位图'], pitfalls: ['大量图表用 SVG/DOM', '每帧都全量重绘', '实时数据无节流'] },
  { type: 'PE', level: 'A', title: '关键 CSS 提取与内联策略', tags: 'Critical CSS、内联、渲染阻塞、性能', freq: '中频', time: '3-5 分钟', desc: '请说明关键 CSS 的作用和实现方式。', points: ['关键 CSS：首屏渲染所需的样式', '内联到 HTML head，避免额外请求阻塞', '非关键 CSS 异步加载或延迟', '使用 Critical 或 Penthouse 工具自动提取', '注意内联体积不要过大'], pitfalls: ['内联整个 CSS 文件', '关键 CSS 提取不准确缺样式', '忽略内联体积对 HTML 缓存的影响'] },
];


const Q28 = [
  { type: 'CO', level: 'B', title: '前端质量保障的核心维度', tags: '质量保障、测试、代码质量、可维护性、监控', freq: '高频', time: '3-5 分钟', desc: '请说明前端质量保障应覆盖哪些维度。', points: ['功能质量：单元测试、集成测试、E2E 测试', '代码质量：lint、类型检查、代码评审、复杂度', '性能质量：性能预算、监控、回归', '安全质量：依赖审计、XSS/CSRF 防护', '可观测性：错误监控、埋点、日志', '流程质量：CI/CD、变更管理、发布回滚'], pitfalls: ['只依赖人工测试', '只写单元测试不做 E2E', '代码质量无标准'] },
  { type: 'CO', level: 'A', title: '单元测试、集成测试、E2E 测试的边界', tags: '测试金字塔、单元测试、集成测试、E2E', freq: '高频', time: '5-8 分钟', desc: '请解释三种测试类型的职责、成本与覆盖建议。', points: ['单元测试：测最小单元，快、稳定、成本低，覆盖核心逻辑', '集成测试：测模块间交互，验证数据流和 API 契约', 'E2E：模拟真实用户路径，成本高、稳定性低，覆盖核心链路', '比例遵循测试金字塔，单元最多，E2E 精而不多', '选型：Jest/Vitest 单元，Testing Library 集成，Playwright/Cypress E2E'], pitfalls: ['E2E 占比过高导致 CI 慢', '单元测试只测简单函数', '没有集成测试导致模块各自正常但联调失败'] },
  { type: 'EN', level: 'A', title: '前端 CI 中的质量门禁设计', tags: 'CI、质量门禁、lint、测试、覆盖率', freq: '高频', time: '5-8 分钟', desc: '请设计 CI 中的前端质量门禁，确保劣质代码不进入主干。', points: ['静态检查：ESLint、Prettier、Stylelint、TypeScript', '测试：单元测试通过、覆盖率不低于阈值', '构建：构建成功、产物体积不超标', '安全：依赖 CVE 扫描、密钥泄露检测', '阻断：任一门禁失败即阻止合并', '增量检查：只检查 affected 包提速'], pitfalls: ['门禁过严导致频繁失败', '只跑 lint 不跑测试', '阈值过低无意义'] },
  { type: 'SC', level: 'A', title: '如何保证前端代码评审质量', tags: '代码评审、质量、CR、 checklist', freq: '高频', time: '5-8 分钟', desc: '请说明前端代码评审应关注哪些方面，以及如何提高评审效率。', points: ['关注：正确性、可维护性、性能、安全、测试、可访问性', '使用 Checklist 和自动化工具减少重复提醒', '控制 MR 大小，便于评审', '区分阻塞性问题与建议性意见', '建立评审文化：双向学习，不是挑错', '统计评审时长和缺陷发现率持续改进'], pitfalls: ['只关注代码风格', 'MR 过大无法细看', '评审流于形式'] },
  { type: 'CO', level: 'P', title: '什么是测试驱动开发（TDD）', tags: 'TDD、测试驱动、单元测试、重构', freq: '中频', time: '5-8 分钟', desc: '请解释 TDD 的流程、优势及在前端的适用场景。', points: ['流程：红（写失败测试）-> 绿（实现通过）-> 重构', '优势：明确需求、快速反馈、设计可测试、减少回归', '适用：逻辑清晰、输入输出明确的工具函数、hooks、reducer', '不适用：UI 快速迭代、需求高度不确定的探索性开发', '结合快照测试需谨慎，避免无意义更新'], pitfalls: ['为了 TDD 而写无价值测试', '只写测试不重构', '在 UI 层过度 TDD'] },
  { type: 'EN', level: 'P', title: '前端单元测试如何设计有效的断言', tags: '单元测试、断言、测试用例、边界条件', freq: '中频', time: '5-8 分钟', desc: '请说明如何写出有价值的前端单元测试。', points: ['一个测试验证一个行为，而不是一个函数所有路径', '覆盖正常路径、边界条件、异常输入', '断言要具体，避免 expect(true).toBe(true)', '避免测试实现细节，关注输入输出', '使用参数化测试覆盖多组数据'], pitfalls: ['测试覆盖率 100% 但无意义断言', '测试私有函数', '测试与实现强耦合'] },
  { type: 'SC', level: 'P', title: '前端 E2E 测试不稳定如何治理', tags: 'E2E、测试稳定性、Flaky、Playwright、等待', freq: '高频', time: '8-15 分钟', desc: 'E2E 测试经常出现随机失败，请给出治理方案。', points: ['避免固定等待，使用自动等待和断言重试', '选择稳定的选择器，避免依赖易变文本', '测试数据隔离，避免并发用例互相影响', '环境稳定：统一浏览器版本、网络、时区', '失败分类：环境、数据、用例本身、被测应用 bug', '对 flaky 用例进行隔离、标记、修复'], pitfalls: ['用 sleep 处理异步', '多测试共用同一账号数据', '不稳定用例直接删除'] },
  { type: 'CO', level: 'A', title: '什么是快照测试，何时使用', tags: '快照测试、Snapshot、回归、UI', freq: '中频', time: '3-5 分钟', desc: '请说明快照测试的原理、优势和风险。', points: ['原理：将输出序列化保存，后续对比是否变化', '优势：快速发现 UI 或数据结构回归', '风险：容易无意义更新，掩盖真实 bug', '适用：组件结构稳定、纯函数输出、配置文件', '不适用：频繁变化的数据、随机内容、大型 DOM'], pitfalls: ['所有组件都用快照', 'CI 失败就无脑更新快照', '快照包含动态数据'] },
  { type: 'EN', level: 'A', title: '前端代码覆盖率目标与实践', tags: '覆盖率、测试、Sonar、阈值、质量', freq: '中频', time: '5-8 分钟', desc: '请说明如何设定和达成前端代码覆盖率目标。', points: ['覆盖率是参考指标，不是唯一目标', '优先覆盖核心业务逻辑、边界、异常', '设置门限：行覆盖率、分支覆盖率、函数覆盖率', '使用 Vitest/Jest + Istanbul 采集', '结合变更覆盖率：只要求新增代码达标', '避免为覆盖率写无意义测试'], pitfalls: ['追求 100% 覆盖率', '只看行覆盖忽略分支', '覆盖率达标就认为质量高'] },
  { type: 'SC', level: 'R', title: '设计一个前端质量度量体系', tags: '质量度量、指标、DORA、技术债、质量门禁', freq: '中频', time: '15-30 分钟', desc: '请为公司前端团队设计质量度量体系，能反映交付质量和工程健康度。', points: ['交付质量：缺陷密度、线上故障数、回滚率、MTTR', '工程健康：代码覆盖率、lint 违规、技术债、构建成功率', '流程效率：部署频率、变更前置时间、MR 大小、评审时长', '用户感知：错误率、性能指标、可用性', '可视化看板，按团队/项目/时间维度展示', '避免单一指标，防止数据造假'], pitfalls: ['只度量代码覆盖率', '指标与绩效强挂钩导致造假', '度量维度过多无重点'] },
  { type: 'CO', level: 'A', title: '什么是契约测试', tags: '契约测试、Pact、前后端、API、Consumer', freq: '中频', time: '5-8 分钟', desc: '请解释契约测试在前端中的应用。', points: ['契约测试验证前后端对 API 字段、类型、行为的约定', '前端作为 Consumer 定义期望，后端作为 Provider 验证', 'Pact 是常用工具，生成契约文件并在 CI 中验证', '减少集成测试环境依赖，提前发现接口变更', '适合前后端并行开发、微服务场景'], pitfalls: ['用契约测试替代 E2E', '契约文件不版本管理', '契约过于严格导致正常扩展受阻'] },
  { type: 'EN', level: 'P', title: '如何防止前端代码中的安全漏洞', tags: '安全、XSS、CSRF、CSP、审计', freq: '高频', time: '8-15 分钟', desc: '请说明前端在代码层面如何防范常见安全漏洞。', points: ['XSS：输入校验、输出转义、CSP、避免 innerHTML', 'CSRF：SameSite Cookie、Token、Referer 校验', '依赖安全：定期 audit，锁定版本', '敏感信息：不硬编码密钥，不暴露源码', 'CORS 与鉴权：最小权限原则', '安全扫描加入 CI 门禁'], pitfalls: ['只依赖后端防护', '信任所有用户输入', '第三方依赖不审计'] },
  { type: 'SC', level: 'A', title: '如何设计前端组件的测试策略', tags: '组件测试、Testing Library、Vitest、交互', freq: '高频', time: '5-8 分钟', desc: '请说明如何为业务组件设计测试。', points: ['优先测交互行为而非实现细节', '使用 Testing Library 查询真实 DOM，模拟用户操作', '覆盖：渲染、事件、状态变化、错误状态、加载状态', '对纯展示组件可用快照', '复杂组件拆小，提高可测试性'], pitfalls: ['测组件内部 state', '使用不稳定的 class 选择器', '只渲染不交互'] },
  { type: 'CO', level: 'P', title: '什么是 Mutation Testing', tags: '变异测试、Mutation、测试质量', freq: '低频', time: '5-8 分钟', desc: '请解释变异测试的原理及其对评估测试质量的价值。', points: ['变异测试通过自动修改源代码看测试是否能发现', '变异体被杀死 = 测试有效；存活 = 测试可能不足', '指标：Mutation Score', '价值：评估测试有效性，不只覆盖行数', '工具：Stryker.js；成本高，适合核心模块'], pitfalls: ['用变异测试替代覆盖率', '在变化频繁模块运行导致噪音', '过度追求 100% mutation score'] },
  { type: 'SC', level: 'P', title: '前端如何做视觉回归测试', tags: '视觉回归、Screenshot、Playwright、Chromatic、UI', freq: '中频', time: '5-8 分钟', desc: '请说明视觉回归测试的方案与实践。', points: ['对关键页面和组件截图，与基线对比像素差异', '工具：Playwright screenshot、Chromatic、Applitools、Percy', '环境一致：浏览器版本、视口、字体、动画暂停', '基线审批流程：人工确认有意变更', '注意动态内容：时间、随机数据、广告'], pitfalls: ['所有组件都做视觉回归', '环境不一致导致误报', '动态内容未处理'] },
  { type: 'EN', level: 'A', title: '前端代码规范如何落地', tags: '代码规范、ESLint、Prettier、Stylelint、自动化', freq: '中频', time: '5-8 分钟', desc: '请说明如何制定并推行前端代码规范。', points: ['规范应聚焦可读性、可维护性、常见 bug', '工具化：ESLint、Prettier、Stylelint、commitlint', '固化到 CI，提交前 husky 拦截', '共享配置包，统一团队规则', '定期 review 规则，移除无效规则'], pitfalls: ['规范过细导致开发痛苦', '只定规范无工具', '规则频繁变化'] },
  { type: 'SC', level: 'A', title: '如何保障前端发布质量', tags: '发布质量、灰度、回滚、监控、验证', freq: '高频', time: '5-8 分钟', desc: '请说明前端发布前后的质量保障措施。', points: ['发布前：CI 通过、代码评审、灰度方案', '灰度：按用户/流量/地域逐步放量', '发布后：监控错误率、性能、业务指标', '回滚：保留上一版本产物，快速切换', '验证：自动化 + 人工巡检核心流程'], pitfalls: ['直接全量发布', '发布后不监控', '回滚需要重新构建'] },
  { type: 'CO', level: 'P', title: '可访问性测试如何纳入质量保障', tags: '可访问性、a11y、axe、ARIA、测试', freq: '中频', time: '5-8 分钟', desc: '请说明如何在测试流程中保障前端可访问性。', points: ['自动化：axe-core 集成到单元/E2E 测试', '检查清单：语义化标签、alt、焦点管理、键盘导航、颜色对比度', '手动测试：屏幕阅读器、Tab 导航', '纳入 CI 门禁，对新增 a11y 错误阻断', '培训团队了解 a11y 基础知识'], pitfalls: ['只依赖自动化', '为所有元素加 ARIA 反效果', '忽略键盘用户'] },
  { type: 'EN', level: 'R', title: '设计前端工程化的质量门禁', tags: '质量门禁、CI、类型、测试、构建、安全', freq: '中频', time: '8-15 分钟', desc: '请为一个大型前端 Monorepo 设计完整的质量门禁。', points: ['变更检测：只检查 affected 包，提升效率', '类型检查：全仓 tsc --noEmit', '静态检查：lint、format、命名、导入限制', '测试：单元 + 集成 +  affected E2E', '构建与产物分析：体积、重复依赖', '安全：依赖审计、密钥扫描'], pitfalls: ['门禁过慢导致绕过', '无差异化全量检查', '门禁失败后无清晰日志'] },
  { type: 'SC', level: 'P', title: '如何治理前端技术债', tags: '技术债、重构、度量、优先级、治理', freq: '高频', time: '8-15 分钟', desc: '请说明前端技术债的分类、度量与治理方法。', points: ['分类：代码债、架构债、测试债、文档债、工具债', '度量：扫描重复代码、复杂度、覆盖率、TODO 数量', '优先级：高影响低成本的先处理，绑定业务项目', '建立技术债看板和偿还计划', '防止新增：质量门禁、代码评审、ADR'], pitfalls: ['一次性重构所有技术债', '只列不做', '不区分战略债与坏债'] },
  { type: 'CO', level: 'A', title: '什么是混沌工程在前端中的应用', tags: '混沌工程、故障注入、韧性、测试', freq: '低频', time: '5-8 分钟', desc: '请说明混沌工程理念如何应用到前端。', points: ['主动注入故障验证系统恢复能力', '前端场景：网络延迟、接口失败、CPU 降速、JS 异常', '工具：浏览器 DevTools 网络模拟、自定义故障注入 SDK', '先在测试环境做，生产环境需控制范围和监控', '目标：发现薄弱环节，完善降级和监控'], pitfalls: ['直接在生产大规模注入', '无回滚和监控', '为做而做，不修复发现的问题'] },
  { type: 'SC', level: 'A', title: '前端如何保障兼容性质量', tags: '兼容性、浏览器、Polyfill、测试、Babel', freq: '中频', time: '5-8 分钟', desc: '请说明如何在持续交付中保障多浏览器兼容性。', points: ['明确目标浏览器矩阵，基于用户数据', '使用 Browserslist + Babel 转译', 'CSS 兼容性：Autoprefixer、PostCSS', 'JS API：polyfill.io 或 core-js 按需', '自动化：Playwright 多浏览器 E2E', '真机/云测补充'], pitfalls: ['支持所有浏览器包括 IE6', 'polyfill 全部打包', '只在 Chrome 测试'] },
  { type: 'EN', level: 'A', title: '前端 Monorepo 中的质量保障', tags: 'Monorepo、质量、affected、CI、测试', freq: '中频', time: '5-8 分钟', desc: '请说明 Monorepo 下如何高效保障代码质量。', points: ['变更检测：Nx/Turborepo/Rush affected 只构建测试受影响包', '统一工具链：lint、test、build 配置共享', '依赖图可视化，防止循环依赖', '版本管理：Changeset，影响分析', '跨包契约测试：接口、类型导出'], pitfalls: ['全量测试导致 CI 极慢', '包间边界不清', '变更检测漏测依赖包'] },
  { type: 'SC', level: 'P', title: '如何设计前端错误监控的质量闭环', tags: '错误监控、质量闭环、告警、修复、回归', freq: '中频', time: '8-15 分钟', desc: '请设计从错误发现到修复验证的闭环。', points: ['采集：全局捕获、Source Map 还原、上下文信息', '聚合：按 fingerprint、版本、页面分组', '分级：P0 白屏、P1 核心流程、P2 一般错误', '告警：按影响面和频率告警，避免噪声', '修复：创建工单，关联代码提交', '验证：发布后在监控中确认错误下降'], pitfalls: ['只采集不处理', '告警过多导致疲劳', '修复后不复盘'] },
  { type: 'CO', level: 'B', title: '前端代码评审中应关注的安全点', tags: '代码评审、安全、XSS、输入校验、依赖', freq: '中频', time: '3-5 分钟', desc: '请列出前端 CR 时应特别留意的安全问题。', points: ['用户输入是否转义，避免 XSS', 'DOM 操作是否使用安全 API', '敏感信息是否泄露', '第三方依赖是否可靠', 'CORS/CSRF 相关代码', '权限控制是否在前端绕过'], pitfalls: ['只关注业务逻辑', '认为安全是后端的事', '忽略新引入依赖'] },
  { type: 'SC', level: 'A', title: '如何提升前端测试的可维护性', tags: '测试、可维护性、Page Object、 fixtures、数据工厂', freq: '中频', time: '5-8 分钟', desc: '请说明减少测试维护成本的实践。', points: ['使用 Page Object/Component Object 模式封装选择器和操作', '测试数据工厂生成可控数据', '避免硬编码等待时间', '测试与实现解耦，关注行为', '共享 setup/teardown', '定期清理无用测试'], pitfalls: ['测试里硬编码大量 DOM 结构', '每个测试重复登录等前置步骤', '测试名称与内容不符'] },
  { type: 'CO', level: 'P', title: '什么是持续测试', tags: '持续测试、DevOps、自动化测试、CI/CD', freq: '中频', time: '3-5 分钟', desc: '请解释持续测试的理念及其在前端的实践。', points: ['在软件交付全周期持续执行自动化测试', '左移：在开发阶段跑单元/集成测试', '右移：线上监控、混沌测试', '与 CI/CD 集成，快速反馈', '测试数据与环境管理自动化'], pitfalls: ['只在发布前集中测试', '自动化测试跟不上开发节奏', '测试环境不稳定'] },
  { type: 'EN', level: 'P', title: '前端测试数据管理策略', tags: '测试数据、fixtures、mock、隔离、E2E', freq: '中频', time: '5-8 分钟', desc: '请说明如何管理前端测试中的数据。', points: ['单元/集成：使用 factories 和 mock 服务', 'E2E：独立测试账号、数据库 seed、事务回滚', '避免共享数据导致测试互相影响', '敏感数据脱敏', '数据版本与代码版本同步'], pitfalls: ['多测试共用同一数据', '测试数据写死在代码里', '生产数据用于测试'] },
  { type: 'SC', level: 'R', title: '设计一个前端交付质量保障平台', tags: '质量平台、CI、监控、测试、数据', freq: '低频', time: '15-30 分钟', desc: '请设计一个覆盖测试、构建、发布、监控的前端质量保障平台。', points: ['统一流水线：lint -> type -> test -> build -> deploy preview', '质量数据汇总：覆盖率、缺陷、构建成功率、性能', '测试管理：用例管理、执行历史、失败归因', '发布门禁：灰度、回滚、验证', '问题追踪：错误/缺陷自动创建工单'], pitfalls: ['平台功能大而全无人用', '数据分散无法关联', '强制所有项目一刀切'] },
  { type: 'CO', level: 'A', title: '什么是静态应用安全测试（SAST）', tags: 'SAST、安全、静态扫描、依赖、代码', freq: '低频', time: '3-5 分钟', desc: '请说明 SAST 在前端中的应用。', points: ['SAST 不运行程序，通过分析代码发现安全漏洞', '前端应用：扫描 JS/TS 代码中的 eval、innerHTML、不安全的正则', '依赖扫描：npm audit、Snyk、Trivy', '集成到 CI，阻断高风险漏洞', '需结合 DAST 和人工审计'], pitfalls: ['SAST 报告误报率高不处理', '只扫描不修复', '认为通过 SAST 就绝对安全'] },
  { type: 'PE', level: 'A', title: '性能测试如何纳入质量保障', tags: '性能测试、质量、Lighthouse CI、预算', freq: '中频', time: '5-8 分钟', desc: '请说明如何在 CI 和流程中保障性能不劣化。', points: ['定义性能预算：LCP/INP/CLS、包体积、请求数', 'Lighthouse CI 在 MR 阶段跑分', '与基线对比，超预算阻断', 'RUM 线上监控发布后的真实指标', '性能问题走单独工单修复'], pitfalls: ['只测一次不持续', '预算过松', '忽略真实用户环境'] },
  { type: 'SC', level: 'A', title: '前端如何做回归测试策略', tags: '回归测试、自动化、冒烟、全量、选择', freq: '中频', time: '5-8 分钟', desc: '请说明不同发布场景下的回归测试策略。', points: ['冒烟测试：发布前验证核心路径', '全量回归：大版本或重构后执行完整用例', '选择性回归：根据代码变更范围选择相关测试', '自动化优先，人工补充探索性测试', '记录回归结果，建立基线'], pitfalls: ['每次发布都全量人工回归', '回归用例无优先级', '回归不覆盖关键浏览器'] },
  { type: 'CO', level: 'P', title: '什么是左移测试', tags: '左移、Shift Left、测试、早期发现', freq: '中频', time: '3-5 分钟', desc: '请解释测试左移的理念及前端实践。', points: ['左移：尽早发现和修复缺陷，降低成本', '实践：开发写单元测试、本地 pre-commit 检查', '需求阶段参与可测试性设计', 'API 契约测试在开发阶段建立', '本地可快速运行核心测试'], pitfalls: ['左移等于把所有测试推给开发', '缺少工具和流程支持', '只关注速度不顾覆盖率'] },
  { type: 'EN', level: 'A', title: '前端代码复杂度如何度量与治理', tags: '复杂度、圈复杂度、认知复杂度、Sonar、重构', freq: '中频', time: '5-8 分钟', desc: '请说明如何度量和控制前端代码复杂度。', points: ['圈复杂度：分支数量，建议不超过 10', '认知复杂度：嵌套、短路、递归的难易度', '工具：SonarQube、eslint-plugin-complexity', '重构：拆分函数、提取策略、减少嵌套', 'CI 中设置复杂度阈值'], pitfalls: ['只看行数不看结构', '阈值过严导致频繁失败', '不重构只提高阈值'] },
  { type: 'SC', level: 'P', title: '如何建立前端 bug 预防机制', tags: 'Bug 预防、类型、lint、CR、测试', freq: '高频', time: '8-15 分钟', desc: '请说明从事后修复转向事前预防的机制。', points: ['类型系统：TypeScript 严格模式捕获常见错误', '静态检查：lint 规则禁用危险 API', '代码评审：关注边界和异常处理', '自动化测试：覆盖历史 bug 场景', '复盘：每类线上 bug 补充测试或 lint 规则', '知识库：沉淀常见错误模式'], pitfalls: ['只修 bug 不补测试', '类型系统配置宽松', '复盘流于形式'] },
];


const Q29 = [
  { type: 'CO', level: 'B', title: '前端状态管理要解决什么问题', tags: '状态管理、数据流、组件通信、可预测性', freq: '高频', time: '3-5 分钟', desc: '请说明前端状态管理的本质和常见场景。', points: ['解决跨组件共享状态、避免 prop drilling', '统一数据流向，提升可预测性和可调试性', '常见场景：用户态、主题、购物车、表单、路由参数', '区分 UI 状态与远端状态', '状态应集中必要、分散合理'], pitfalls: ['所有状态都放全局', '状态管理过度导致模板代码多', '远端状态与本地状态混淆'] },
  { type: 'CO', level: 'A', title: 'Redux 与 MobX 的设计哲学差异', tags: 'Redux、MobX、响应式、不可变、状态管理', freq: '高频', time: '5-8 分钟', desc: '请比较 Redux 和 MobX 在数据模型、更新方式和适用场景上的差异。', points: ['Redux：单一不可变状态树，显式 action + reducer，适合复杂协作', 'MobX：响应式对象，自动追踪依赖，更新隐式，适合快速开发', 'Redux 强调可预测和调试；MobX 强调简洁和自动化', 'Redux 模板多但生态强；MobX 学习曲线低但调试需理解依赖', '选型：团队熟悉度、应用规模、可维护性要求'], pitfalls: [' Redux 用于所有项目', 'MobX 任意修改状态难以追踪', '认为两者不能共存'] },
  { type: 'CO', level: 'P', title: '集中式状态与局部状态的边界', tags: '状态、局部状态、全局状态、Context、提升', freq: '高频', time: '5-8 分钟', desc: '请说明哪些状态应该全局管理，哪些应该留在组件局部。', points: ['全局状态：跨页面/模块共享、用户会话、主题、权限、购物车', '局部状态：表单草稿、UI 展开收起、纯组件内部数据', '远端状态：优先交给专门数据层管理', 'Context 适合低频更新、作用域明确的状态', '避免为了共享而过度提升状态'], pitfalls: ['所有状态提升到 Redux', '局部状态滥用导致难以调试', 'Context 高频更新导致大面积渲染'] },
  { type: 'SC', level: 'A', title: '如何设计前端数据缓存策略', tags: '数据缓存、SWR、React Query、过期、失效', freq: '高频', time: '5-8 分钟', desc: '请说明前端请求数据缓存的设计要点。', points: ['区分服务端状态与客户端状态', '使用 SWR/React Query/TanStack Query 管理远端状态', '设置缓存时间、stale-while-revalidate、重新获取策略', '基于 key 做缓存，mutation 后主动失效或乐观更新', '离线场景：持久化缓存 + 重试'], pitfalls: ['所有接口都不缓存', '缓存过期策略一刀切', '更新数据后缓存未失效'] },
  { type: 'SD', level: 'R', title: '设计一个前端数据同步与状态管理方案', tags: '数据同步、状态管理、乐观更新、冲突、离线', freq: '中频', time: '15-30 分钟', desc: '请为一个多端协作应用设计数据同步与状态管理架构。', points: ['分层：本地状态、远端状态、同步层、持久化层', '乐观更新：本地先更新，失败回滚', '冲突处理：最后写入获胜、版本向量、业务合并策略', '离线支持：操作队列 + 幂等 key', '实时同步：WebSocket/SSE 推送变更', '状态可观测：日志、回放、时间旅行'], pitfalls: ['多端直接读写同一全局状态', '乐观更新无回滚机制', '冲突处理交给前端复杂化'] },
  { type: 'CO', level: 'A', title: '什么是 CQRS 与 Event Sourcing', tags: 'CQRS、Event Sourcing、命令、查询、事件', freq: '中频', time: '5-8 分钟', desc: '请解释 CQRS 和 Event Sourcing，并说明前端如何配合。', points: ['CQRS：命令和查询分离，读写模型不同', 'Event Sourcing：以事件序列代替当前状态，状态可重放', '前端配合：命令通过 API 发出，查询使用 BFF 聚合视图', '事件驱动 UI：订阅事件流更新局部状态', '适合审计、复杂业务、实时协作'], pitfalls: ['在小应用强行 CQRS', '前端直接维护事件流所有状态', '忽略最终一致性'] },
  { type: 'SC', level: 'P', title: '如何处理前端表单复杂状态', tags: '表单、状态、React Hook Form、Formik、校验', freq: '高频', time: '5-8 分钟', desc: '请说明复杂表单状态管理的方案。', points: ['字段状态：value、 touched、error、dirty', '使用 React Hook Form / Formik / Formily 等库抽象', '表单级与字段级校验分离', '动态表单：schema 驱动渲染与校验', '提交状态：loading、success、error、retry'], pitfalls: ['每个字段都单独 useState', '校验逻辑散落在组件', '表单状态和业务状态混在一起'] },
  { type: 'CO', level: 'P', title: '乐观更新与悲观更新的取舍', tags: '乐观更新、悲观更新、一致性、回滚、体验', freq: '高频', time: '5-8 分钟', desc: '请比较乐观更新和悲观更新，并说明各自适用场景。', points: ['悲观更新：等服务端返回成功后再更新 UI，安全但慢', '乐观更新：先更新 UI 再请求，体验好但需处理失败', '适用：点赞、收藏、购物车可用乐观；支付、下单用悲观', '失败处理：回滚状态、提示用户、重试', '幂等是乐观更新的基础'], pitfalls: ['所有操作都用乐观更新', '乐观更新失败不提示', '非幂等操作也乐观更新'] },
  { type: 'SC', level: 'A', title: '如何设计跨组件共享的数据源', tags: 'Context、状态管理、依赖注入、作用域', freq: '中频', time: '5-8 分钟', desc: '请设计一个可在组件树中共享、支持作用域隔离的数据源方案。', points: ['使用 Context + useReducer 提供作用域内状态', '状态提升 + props 传递适合小范围', '依赖注入容器：提供可替换的实现', '按业务模块拆分多个 Context，避免全局单 store', '状态变更通过 reducer/action，保持可预测'], pitfalls: ['一个全局 Context 包含所有状态', 'Context 高频更新导致性能问题', '子组件直接修改 Context 值'] },
  { type: 'CO', level: 'A', title: '什么是规范化状态（Normalized State）', tags: '规范化状态、Redux、Entity、关系型数据', freq: '中频', time: '5-8 分钟', desc: '请解释状态规范化及其优势。', points: ['把嵌套数据拆分为独立实体表，通过 ID 引用', '避免数据重复，更新一处全局一致', '便于查询、分页、缓存、乐观更新', '工具：Redux Toolkit createEntityAdapter、Normalizr', '适合列表、关联数据、评论等场景'], pitfalls: ['所有状态都深层嵌套', '规范化过度导致读取复杂', '不使用选择器封装查询'] },
  { type: 'PE', level: 'A', title: '状态管理库的性能优化', tags: '状态管理、性能、选择器、memo、订阅', freq: '中频', time: '5-8 分钟', desc: '请说明如何优化 Redux/Zustand 等状态管理库的性能。', points: ['使用选择器只订阅需要的切片，避免全量渲染', '拆分 store 或按模块组织', '状态更新保持不可变，避免不必要变更', '使用 Reselect 缓存派生状态', '对大型列表做分页或虚拟化'], pitfalls: ['每次返回新对象导致所有组件渲染', '在 selector 中做复杂计算', '把所有状态放一个原子'] },
  { type: 'SC', level: 'P', title: '如何设计前端权限状态与路由联动', tags: '权限、状态、路由、RBAC、守卫', freq: '中频', time: '8-15 分钟', desc: '请设计前端权限数据与路由、菜单、按钮的联动方案。', points: ['权限数据作为远端状态，登录后拉取并缓存', '路由守卫根据权限过滤路由和菜单', '按钮/字段级通过高阶组件或 hook 判断', '权限变更时重新计算可见性', '敏感操作服务端鉴权，前端仅做体验控制'], pitfalls: ['权限判断写死在前端', '前端权限可绕过视为安全控制', '权限状态不同步'] },
  { type: 'CO', level: 'P', title: '前端状态管理中的派生状态', tags: '派生状态、selector、computed、状态', freq: '中频', time: '5-8 分钟', desc: '请说明派生状态应放在哪里计算，如何避免重复。', points: ['派生状态可由原始状态计算得出', '计算位置：组件内 useMemo、selector、store computed', '多次使用应缓存，如 Reselect、MobX computed', '避免把派生状态也存入 store 导致同步问题', '复杂派生可在 BFF 计算后返回'], pitfalls: ['把派生状态写入 store', '每次渲染重新计算', '派生逻辑散落在多处'] },
  { type: 'SD', level: 'R', title: '设计一个支持 Undo/Redo 的前端状态系统', tags: 'Undo、Redo、状态历史、命令模式、不可变', freq: '中频', time: '8-15 分钟', desc: '请设计一个支持撤销/重做的前端状态系统。', points: ['使用命令模式：每个操作封装为 do/undo', '维护历史栈：past、present、future', '状态不可变，undo 时恢复上一个快照', '限制历史长度，避免内存无限增长', '支持分支场景：合并、冲突处理'], pitfalls: ['每次 setState 都记录历史导致噪音', 'undo 时触发副作用未回滚', '可变状态无法正确恢复'] },
  { type: 'SC', level: 'A', title: '如何处理前端分页与无限滚动状态', tags: '分页、无限滚动、状态、缓存、合并', freq: '中频', time: '5-8 分钟', desc: '请设计列表分页或无限滚动的状态管理方案。', points: ['分页状态：page、pageSize、total、items', '无限滚动：游标/cursor、hasMore、items', '数据合并：新页数据追加到列表，避免替换', '缓存：按查询条件 key 缓存分页结果', '刷新：下拉刷新重置状态，上拉加载更多'], pitfalls: ['每次翻页清空已有数据', '页码和游标混用', '重复请求同一页'] },
  { type: 'CO', level: 'B', title: 'useState 与 useReducer 如何选择', tags: 'React、useState、useReducer、状态', freq: '高频', time: '3-5 分钟', desc: '请说明 useState 和 useReducer 的使用场景。', points: ['useState 适合简单独立状态', 'useReducer 适合状态相互依赖、转换逻辑复杂', 'reducer 便于测试和集中管理状态变更', '多个相关状态可用 reducer 统一处理', '复杂表单、多步骤流程适合 useReducer'], pitfalls: ['所有状态都用 useReducer', 'useState 中状态更新依赖前一个状态时出错', 'reducer 中做副作用'] },
  { type: 'SC', level: 'P', title: '前端如何处理多标签页状态同步', tags: '多标签页、BroadcastChannel、localStorage、状态同步', freq: '中频', time: '5-8 分钟', desc: '请设计多标签页间状态同步的方案。', points: ['BroadcastChannel 同源跨标签页通信', 'localStorage/storage 事件做兼容降级', '同步范围：登录态、主题、语言、购物车', '冲突处理：服务端权威版本、时间戳', '注意隐私和安全，避免同步敏感数据'], pitfalls: ['用轮询 polling 同步', '所有状态都跨标签同步', '忽略 storage 事件只在其他标签触发'] },
  { type: 'CO', level: 'P', title: '什么是时间旅行调试', tags: '时间旅行、Redux DevTools、状态回放、调试', freq: '低频', time: '3-5 分钟', desc: '请解释时间旅行调试的原理和价值。', points: ['记录所有状态变更 action 序列', '可以回到任意历史状态查看 UI', '基于不可变状态实现快照回放', '价值：定位 bug、复现问题、理解数据流', 'Redux DevTools、Vue DevTools 支持'], pitfalls: ['可变状态无法回放', '副作用导致回放结果不一致', '记录所有 action 性能开销大'] },
  { type: 'SC', level: 'R', title: '设计一个前端实时协作的状态系统', tags: '实时协作、CRDT、OT、状态同步、冲突', freq: '低频', time: '15-30 分钟', desc: '请设计类似在线文档的实时协作前端状态系统。', points: ['选择 OT 或 CRDT 作为冲突解决算法', '操作本地先执行，再同步给其他用户', '使用 WebSocket 或 WebRTC 传输操作', '版本向量或 Lamport 时钟定序', '离线支持：本地操作队列，联网后合并', 'Undo 需考虑远程操作影响'], pitfalls: ['直接用最后写入获胜', '忽略网络分区', '本地状态与远程状态不一致'] },
  { type: 'CO', level: 'A', title: 'Zustand 与 Redux Toolkit 的取舍', tags: 'Zustand、Redux Toolkit、状态管理、轻量', freq: '高频', time: '5-8 分钟', desc: '请比较 Zustand 和 Redux Toolkit，说明各自适合的场景。', points: ['Zustand：轻量、无样板、适合小到中型应用', 'Redux Toolkit：生态强、DevTools、中间件、适合大型复杂应用', 'Zustand 支持多 store，Redux 通常单 store', 'RTK Query 内置数据获取与缓存', '根据团队规模和需求选型'], pitfalls: ['大项目用 Zustand 无规范导致混乱', '小项目用 Redux 增加样板', '频繁跨 store 通信'] },
  { type: 'PE', level: 'A', title: '前端大数据表格的状态与渲染优化', tags: '大数据、表格、状态、虚拟化、分页', freq: '中频', time: '5-8 分钟', desc: '请说明大数据量表格的状态管理和渲染优化方案。', points: ['数据分页或滚动加载，避免全量持有', '虚拟滚动只渲染可视行', '单元格编辑状态局部管理', '筛选排序在后端或 Web Worker', '选中状态用 Set 存储行 ID', '避免全表 re-render，使用 memo'], pitfalls: ['一次性加载万行数据', '表格全局 state 导致所有单元格渲染', '编辑状态直接修改原数据'] },
  { type: 'CO', level: 'P', title: '前端状态管理中的副作用处理', tags: '副作用、异步、Redux Saga、Thunk、数据流', freq: '中频', time: '5-8 分钟', desc: '请说明前端状态管理中如何处理异步副作用。', points: ['副作用与纯状态更新分离', 'Redux Thunk：简单异步逻辑', 'Redux Saga：复杂流程、竞态处理', 'RTK Query：封装数据获取、缓存、失效', '组件层：useEffect + 数据层库'], pitfalls: ['reducer 中直接发请求', '不处理竞态和取消', '副作用与 UI 强耦合'] },
  { type: 'SC', level: 'A', title: '如何设计前端搜索筛选状态', tags: '搜索、筛选、URL、状态同步、history', freq: '中频', time: '5-8 分钟', desc: '请设计列表页的搜索筛选状态，支持刷新不丢失和分享。', points: ['筛选条件同步到 URL query，刷新/分享可恢复', '状态对象与 URL 互相映射', '防抖处理输入，避免频繁请求', '重置按钮清空本地和 URL 状态', '服务端根据 query 返回结果'], pitfalls: ['筛选状态只存在内存', 'URL 与状态不同步', '每次输入都发请求'] },
  { type: 'CO', level: 'A', title: '什么是不可变数据，为什么重要', tags: '不可变、Immutable、状态、比较、性能', freq: '高频', time: '5-8 分钟', desc: '请解释不可变数据在前端状态管理中的作用。', points: ['不可变：创建新对象而不是修改原对象', '优势：可预测、可回放、便于浅比较', 'React/Vue 依赖不可变或响应式追踪变化', '工具：Immer、Immutable.js、展开运算符', '注意：深层拷贝性能开销，使用结构共享'], pitfalls: ['直接修改 state', '每次更新都深拷贝导致性能差', '认为不可变就是每次都 cloneDeep'] },
  { type: 'SD', level: 'P', title: '设计一个前端配置化表单状态引擎', tags: '表单、配置化、Schema、状态引擎、动态', freq: '中频', time: '8-15 分钟', desc: '请设计一个通过 JSON Schema 驱动表单渲染和状态管理的引擎。', points: ['Schema 描述字段、类型、校验、联动、布局', '状态树按字段路径组织，支持嵌套', '联动规则：字段 A 变化影响字段 B 显隐/值/校验', '校验分层：即时校验、提交校验、异步校验', '扩展：自定义组件注册、自定义校验器'], pitfalls: ['Schema 与组件强耦合', '联动逻辑复杂难以调试', '所有字段都全局状态'] },
  { type: 'SC', level: 'A', title: '前端购物车状态如何设计', tags: '购物车、状态、持久化、同步、乐观更新', freq: '中频', time: '5-8 分钟', desc: '请设计电商前端购物车的状态管理方案。', points: ['本地状态：商品列表、数量、选中、价格计算', '持久化：localStorage/IndexedDB，登录后同步到服务端', '数量加减可乐观更新，失败回滚', '价格等敏感信息以服务端为准', '未登录与登录状态平滑迁移'], pitfalls: ['所有购物车逻辑放全局', '前端计算总价作为结算依据', '离线添加商品丢失'] },
  { type: 'CO', level: 'P', title: '状态管理中的selector模式', tags: 'selector、Reselect、派生状态、缓存', freq: '中频', time: '5-8 分钟', desc: '请说明 selector 模式的作用和最佳实践。', points: ['selector 从 store 中派生数据', '可组合：简单 selector 组合成复杂 selector', '缓存：输入不变输出不变，避免重复计算', '解耦组件与 store 结构', 'Reselect、Zustand selector、Vue getter 都是实现'], pitfalls: ['在组件里直接遍历 store', 'selector 返回新对象导致渲染', '所有派生逻辑写在 reducer'] },
  { type: 'FS', level: 'A', title: '状态更新后 UI 未更新如何排查', tags: '状态、UI、渲染、调试、React', freq: '高频', time: '5-8 分钟', desc: '请给出状态更新后组件未重新渲染的排查思路。', points: ['确认状态确实已更新，检查 DevTools', '检查是否直接修改了原状态', '检查 selector 是否返回相同引用', '检查组件是否被 memo 且 props 未变', '检查状态是否更新到了正确的作用域', '使用日志或时间旅行回放定位'], pitfalls: ['直接修改 state 还以为会更新', '忽略浅比较', '在不相关组件里查找'] },
  { type: 'CO', level: 'B', title: '什么是单向数据流', tags: '单向数据流、Flux、Redux、Vuex、可预测', freq: '高频', time: '3-5 分钟', desc: '请解释单向数据流的概念和优势。', points: ['数据只能从父到子、从 state 到 view，通过 action 改变 state', '代表：Flux、Redux、Vuex', '优势：数据流向清晰、易于追踪、调试', '与双向绑定对比：更可控但代码更多', '现代框架推荐单向数据流为主'], pitfalls: ['子组件直接修改父组件状态', '双向绑定滥用导致数据流混乱', '认为单向数据流性能更好'] },
  { type: 'SC', level: 'P', title: '前端如何处理服务端推送状态', tags: 'SSE、WebSocket、推送、状态更新、实时', freq: '中频', time: '5-8 分钟', desc: '请设计服务端推送数据的前端状态处理方案。', points: ['根据场景选 SSE 或 WebSocket', '连接管理：重连、心跳、断线提示', '推送事件映射到 store action 更新状态', '消息去重与顺序处理', '避免高频消息导致频繁渲染：节流/批量'], pitfalls: ['每条消息都触发全局渲染', '断线不重连', '不处理消息乱序'] },
  { type: 'SD', level: 'R', title: '设计一个跨页面共享的状态层', tags: '跨页面、状态共享、Storage、BroadcastChannel、同步', freq: '低频', time: '15-30 分钟', desc: '请设计一个支持多页面/子应用共享的状态层。', points: ['核心状态抽象为可序列化对象', '存储介质：IndexedDB/localStorage/BroadcastChannel', '状态变更走统一 API，自动同步到存储和其他页面', '冲突解决策略：时间戳、版本号、服务端仲裁', '权限与隐私：敏感状态不共享', 'API 设计：订阅、读取、写入、清除'], pitfalls: ['直接暴露存储对象', '各页面状态版本不一致', '忽略存储容量限制'] },
];


const Q30 = [
  { type: 'CO', level: 'B', title: '可观测性的三大支柱', tags: '可观测、Metrics、Logs、Traces、监控', freq: '高频', time: '3-5 分钟', desc: '请解释 Metrics、Logs、Traces 的区别与联系。', points: ['Metrics：聚合指标，如 QPS、错误率、P99 延迟', 'Logs：离散事件记录，如请求详情、错误堆栈', 'Traces：请求链路，串联跨服务调用', '三者关联：trace_id、时间戳、标签统一', '可观测性目标是快速定位未知问题'], pitfalls: ['只采集一种数据', '三者无关联无法下钻', '日志过多导致存储成本爆炸'] },
  { type: 'CO', level: 'A', title: 'RUM 与 Synthetic 监控的区别', tags: 'RUM、Synthetic、真实用户、模拟、监控', freq: '高频', time: '5-8 分钟', desc: '请比较真实用户监控和合成监控。', points: ['RUM：采集真实用户数据，反映实际体验，数据波动大', 'Synthetic：在固定环境定时跑脚本，可复现、稳定', 'RUM 适合发现长尾问题和业务关联', 'Synthetic 适合基线对比、发布前验证、告警', '两者结合：Synthetic 守门，RUM 看真实影响'], pitfalls: ['只看 RUM 忽略 Synthetic', 'Synthetic 环境太理想', 'RUM 样本不足时做决策'] },
  { type: 'PE', level: 'A', title: '前端 RUM 指标体系设计', tags: 'RUM、Web Vitals、指标、P75、归因', freq: '高频', time: '8-15 分钟', desc: '请设计一套前端真实用户性能监控指标体系。', points: ['加载：LCP、FCP、TTFB、页面加载时间', '交互：INP、FID、点击响应时间', '稳定性：JS 错误率、资源加载失败率、API 错误率', '业务：白屏时间、关键流程耗时', '分位数：P75/P95 而非均值', '归因：按页面、版本、网络、设备拆分'], pitfalls: ['只看均值', '指标过多无重点', '不关联业务指标'] },
  { type: 'EN', level: 'A', title: '前端错误监控 SDK 设计', tags: '错误监控、SDK、Source Map、上报、聚合', freq: '高频', time: '8-15 分钟', desc: '请设计一个前端错误监控 SDK。', points: ['全局捕获：window.onerror、unhandledrejection、框架 Error Boundary', '上下文：URL、userAgent、版本、用户、trace_id', 'Source Map 还原堆栈', '采样与去重：避免相同错误海量上报', '聚合：按 fingerprint、版本、页面分组', '告警：按错误率、影响面分级'], pitfalls: ['只捕获同步错误', '不上传 Source Map', '所有错误都实时告警'] },
  { type: 'SC', level: 'A', title: '页面白屏如何定位', tags: '白屏、排查、监控、错误、资源', freq: '高频', time: '5-8 分钟', desc: '请给出线上页面白屏的排查思路。', points: ['确认范围：个别用户/浏览器/版本还是全部', '查看错误监控：JS 执行错误、资源加载失败', '查看网络：关键 JS/CSS 是否 404 或被拦截', 'Source Map 还原错误堆栈', '检查 CDN、发布回滚、第三方脚本', '用户端复现：同浏览器版本、网络环境'], pitfalls: ['只看网络不看 JS 错误', '没有 Source Map 盲猜', '无法复现就放弃'] },
  { type: 'CO', level: 'P', title: 'Trace 在前端如何与后端关联', tags: 'Trace、OpenTelemetry、trace_id、链路、关联', freq: '中频', time: '5-8 分钟', desc: '请说明前端如何实现分布式链路追踪并与后端串联。', points: ['生成 trace_id 和 span_id，注入请求头', '使用 OpenTelemetry 或自研 SDK 采集 span', '关联：所有请求、资源加载、错误都带 trace_id', '后端服务透传 trace_id', '前端 trace 与 RUM 数据关联'], pitfalls: ['trace_id 只在后端生成', '采样率过高导致成本大', '前后端 trace 格式不统一'] },
  { type: 'SD', level: 'R', title: '设计前端全链路可观测平台', tags: '可观测、平台、Metrics、Logs、Traces、RUM', freq: '高频', time: '15-30 分钟', desc: '请为大型前端应用设计全链路可观测平台。', points: ['采集层：RUM、错误、性能、业务埋点、日志', '关联层：trace_id、release、user_id 打通', '存储层：时序数据库、日志系统、对象存储', '展示层：仪表盘、下钻、告警、事件关联', '治理：采样策略、数据保留、成本优化', '应用：发布回归、故障定位、业务分析'], pitfalls: ['数据孤岛无关联', '全量采集成本失控', '只监控技术不监控业务'] },
  { type: 'CO', level: 'A', title: '前端日志采集的最佳实践', tags: '日志、采集、日志级别、采样、脱敏', freq: '中频', time: '5-8 分钟', desc: '请说明前端日志采集的原则。', points: ['分级：DEBUG/INFO/WARN/ERROR/FATAL', '关键字段：时间、页面、版本、用户、trace_id', '批量上报，减少请求数', '采样：高频日志采样，错误全量', '脱敏：不上传敏感信息', '本地队列与失败重试'], pitfalls: ['所有日志实时全量上报', '日志里包含密码等敏感信息', '无级别导致噪音'] },
  { type: 'PE', level: 'A', title: '前端性能监控如何影响性能', tags: '性能监控、开销、采样、异步、影响', freq: '中频', time: '5-8 分钟', desc: '请分析前端监控 SDK 自身对性能的影响及优化。', points: ['影响：额外 JS、网络请求、主线程计算', '优化：异步加载 SDK、延迟初始化', '采样：只监控部分用户', '批量上报、使用 sendBeacon', '避免在关键路径执行复杂计算', '监控监控 SDK 自身的性能开销'], pitfalls: ['监控脚本阻塞首屏', '全量采集导致大量请求', '忽略 SDK 自身错误'] },
  { type: 'SC', level: 'P', title: '如何设计前端告警策略', tags: '告警、阈值、P75、异常检测、降噪', freq: '中频', time: '8-15 分钟', desc: '请设计前端监控告警策略，避免告警疲劳。', points: ['按业务影响分级：P0 白屏、P1 核心流程、P2 一般', '基于 P75/P95 而非均值', '动态阈值：同比环比、异常波动检测', '告警收敛：同类合并、抑制', ' on-call 响应与升级策略', '定期 review 告警有效性'], pitfalls: ['阈值过严导致告警疲劳', '所有错误都 P0', '只告警不处理'] },
  { type: 'CO', level: 'A', title: 'Source Map 在安全与监控中的权衡', tags: 'Source Map、安全、监控、堆栈、构建', freq: '中频', time: '5-8 分钟', desc: '请说明 Source Map 的使用场景及安全考虑。', points: ['价值：线上错误还原到源码位置', '风险：暴露源码和目录结构', '方案：Source Map 不上传公网，只上传内部监控系统', '使用 hidden source map', '构建时生成并关联版本号'], pitfalls: ['Source Map 公开可访问', '不生成 Source Map 无法定位', 'Source Map 与版本不对应'] },
  { type: 'EN', level: 'A', title: '前端埋点方案对比', tags: '埋点、代码埋点、无埋点、可视化埋点、数据', freq: '高频', time: '5-8 分钟', desc: '请比较代码埋点、无埋点、可视化埋点。', points: ['代码埋点：精确、可控，但侵入业务代码', '无埋点：自动采集所有交互，数据量大、语义弱', '可视化埋点：产品运营通过工具配置，无需发版', '混合方案：关键事件代码埋点，探索性分析无埋点', '数据质量：代码埋点 > 可视化 > 无埋点'], pitfalls: ['所有埋点都用无埋点导致噪音', '代码埋点过多污染业务', '埋点数据不校验'] },
  { type: 'SC', level: 'A', title: '如何监控微前端子应用健康度', tags: '微前端、监控、子应用、加载、错误', freq: '中频', time: '5-8 分钟', desc: '请设计微前端架构下的子应用监控方案。', points: ['基座统一采集各子应用加载耗时、错误、资源', '子应用上报时带上应用名和版本', '区分基座错误与子应用错误', '注册表与版本维度展示', '子应用独立监控也保留'], pitfalls: ['所有错误混在一起', '子应用重复初始化 SDK', '不监控子应用加载失败'] },
  { type: 'CO', level: 'P', title: '什么是 SLO、SLI、SLA', tags: 'SLO、SLI、SLA、可靠性、目标', freq: '中频', time: '5-8 分钟', desc: '请解释 SLO、SLI、SLA 的含义及在前端的应用。', points: ['SLI：服务等级指标，如 LCP P75', 'SLO：目标值，如 LCP P75 ≤2.5s', 'SLA：对外承诺，违反有赔偿', '前端 SLI：可用性、错误率、性能指标', '设定 SLO 要基于用户影响和数据基础'], pitfalls: ['SLO 过高无法实现', 'SLI 与业务无关', '只设不跟踪'] },
  { type: 'PE', level: 'P', title: '前端异常如何归因到具体发布', tags: '异常归因、发布、版本、监控、回归', freq: '中频', time: '5-8 分钟', desc: '请说明如何将线上异常与代码发布关联起来。', points: ['构建产物带版本号或 commit hash', '错误上报携带版本信息', '监控按版本聚合错误率', '发布时间与异常上升时间对比', '灰度阶段加大监控粒度', '快速回滚验证'], pitfalls: ['版本信息缺失', '只在全量后看监控', '不保留历史版本错误率'] },
  { type: 'SC', level: 'R', title: '设计前端监控数据平台架构', tags: '监控平台、数据、采集、存储、查询', freq: '低频', time: '15-30 分钟', desc: '请设计一个前端监控数据平台，支持高性能查询和可视化。', points: ['采集端：SDK 采集 RUM、错误、埋点、日志', '传输层：批量压缩、失败重试、采样', '存储层：时序 DB 存指标、日志系统存日志、对象存储存原始数据', '计算层：实时聚合、离线分析', '查询层：多维下钻、漏斗、留存', '可视化：仪表盘、告警、报告'], pitfalls: ['存储所有原始数据导致成本爆炸', '查询慢无索引', '数据不统一无法关联'] },
  { type: 'CO', level: 'A', title: '前端性能预算如何制定', tags: '性能预算、LCP、包体积、指标、阈值', freq: '中频', time: '5-8 分钟', desc: '请说明如何为前端项目制定合理的性能预算。', points: ['基于当前基线和用户数据设定', '指标：JS/CSS 体积、请求数、LCP/INP/CLS', '预算分级：严格阻断、警告、观察', '纳入 CI 门禁', '定期 review 和调整'], pitfalls: ['预算随意设定', '只在文档里不执行', '预算过松无约束'] },
  { type: 'EN', level: 'A', title: '前端 SDK 版本管理与灰度', tags: '监控 SDK、版本、灰度、回滚、采样', freq: '中频', time: '5-8 分钟', desc: '请说明前端监控 SDK 自身如何灰度和版本管理。', points: ['SDK 版本化，构建产物带版本', '通过配置中心控制采样率和功能开关', '灰度：先小流量，再逐步放量', '错误回滚：切换回旧版本配置', '自监控：监控 SDK 自身的错误和性能'], pitfalls: ['所有用户同版本上线', '灰度无监控', 'SDK bug 污染业务监控'] },
  { type: 'SC', level: 'A', title: '如何利用监控数据驱动性能优化', tags: '监控、数据驱动、性能优化、P75、归因', freq: '中频', time: '5-8 分钟', desc: '请说明如何通过监控数据找到并验证性能优化方向。', points: ['从 P75/P95 找出最差页面和指标', '按网络、设备、地域拆分定位问题', '关联发布版本找回归', '设立优化目标并 A/B 验证', '优化后继续监控确认效果'], pitfalls: ['凭感觉优化', '只看均值', '优化后不验证'] },
  { type: 'CO', level: 'P', title: '前端可观测与业务埋点的关系', tags: '可观测、业务埋点、技术指标、业务指标', freq: '中频', time: '5-8 分钟', desc: '请说明技术可观测与业务埋点的关系与差异。', points: ['技术可观测：系统运行状态、错误、性能', '业务埋点：用户行为、转化、漏斗', '两者可共享采集通道和 ID 体系', '技术问题可通过业务指标发现，如转化率下降', '统一平台展示关联'], pitfalls: ['技术监控和业务数据完全隔离', '业务埋点侵入技术监控', '数据不打通无法归因'] },
  { type: 'FS', level: 'A', title: '线上 JS 错误率突增如何排查', tags: '错误率、排查、发布、第三方、回归', freq: '高频', time: '8-15 分钟', desc: '请给出线上 JS 错误率突然上升的排查步骤。', points: ['确认时间点和影响范围', '关联发布、配置变更、第三方脚本更新', '查看错误聚合和堆栈', '按版本、浏览器、页面拆分', '使用 Source Map 还原', '回滚或热修复验证'], pitfalls: ['不关联发布', '忽略第三方脚本', '只看总量不拆分'] },
  { type: 'PE', level: 'A', title: '如何监控和优化 LCP', tags: 'LCP、最大内容绘制、优化、监控', freq: '高频', time: '5-8 分钟', desc: '请说明 LCP 的构成、监控和优化方法。', points: ['LCP 元素通常是最大图片或文本块', '优化：预加载 LCP 资源、压缩图片、CDN、SSR、减少阻塞资源', '监控：web-vitals 库采集，关注 P75', '归因：按资源类型、页面、网络拆分', '避免布局偏移导致 LCP 元素变化'], pitfalls: ['只优化 FCP 忽略 LCP', 'LCP 资源未 preload', '图片无尺寸导致 CLS'] },
  { type: 'CO', level: 'B', title: '什么是 FID 与 INP', tags: 'FID、INP、交互响应、长任务', freq: '高频', time: '3-5 分钟', desc: '请解释 FID 和 INP 指标的区别。', points: ['FID：首次输入延迟，只测第一次交互', 'INP：交互到下一次绘制，覆盖所有交互，更全面', 'INP 取代 FID 成为 Core Web Vital', '优化：拆分长任务、减少主线程阻塞', '目标是 INP ≤200ms'], pitfalls: ['只看 FID 忽略 INP', '认为无交互页面不用关注', '不监控长任务'] },
  { type: 'SC', level: 'P', title: '如何设计监控采样策略', tags: '采样、监控、成本、代表性、数据', freq: '中频', time: '5-8 分钟', desc: '请设计前端监控的采样策略，平衡成本与数据价值。', points: ['错误全量或高采样，性能 RUM 按用户/会话采样', '高流量页面可降低采样率', '保留关键用户/核心路径高采样', '支持动态调整采样率', '采样后数据需能代表总体分布'], pitfalls: ['所有数据全量采集', '采样率过低无法发现问题', '采样导致长尾问题被忽略'] },
  { type: 'EN', level: 'R', title: '前端可观测工程的落地路径', tags: '可观测、工程化、落地、组织、平台', freq: '中频', time: '8-15 分钟', desc: '请说明如何在组织中落地前端可观测工程。', points: ['统一 SDK 和埋点规范', '建立北极星指标和 SLO', '建设可视化平台和告警机制', '培训团队使用数据定位问题', '将可观测纳入发布流程', '持续优化成本和数据质量'], pitfalls: ['工具分散无统一规范', '只采购平台不落地', '数据多但无人分析'] },
];


const Q31 = [
  { type: 'CO', level: 'B', title: '前端常见安全威胁有哪些', tags: 'XSS、CSRF、安全、前端威胁、注入', freq: '高频', time: '3-5 分钟', desc: '请列举前端常见的安全威胁及基本防护思路。', points: ['XSS：跨站脚本，通过输入注入恶意脚本', 'CSRF：跨站请求伪造，诱导用户发起非预期请求', '点击劫持：通过 iframe 覆盖诱导点击', '敏感信息泄露：密钥、token 写在前端', '供应链攻击：恶意 npm 包', '不安全依赖与过期库'], pitfalls: ['认为安全只是后端的事', '只做输入校验不做输出转义', '把密钥写死在代码里'] },
  { type: 'CO', level: 'A', title: 'XSS 的类型与防护措施', tags: 'XSS、反射型、存储型、DOM 型、CSP', freq: '高频', time: '5-8 分钟', desc: '请说明 XSS 的分类及前端如何防御。', points: ['反射型：恶意参数在 URL 中，服务端返回后执行', '存储型：恶意脚本存入数据库，持久化危害', 'DOM 型：前端 JS 不当下DOM 操作引入', '防御：输入校验、输出转义、CSP、HttpOnly Cookie', '避免 v-html/innerHTML 处理不可信内容', '使用现代框架默认转义'], pitfalls: ['只依赖输入过滤', '允许用户输入直接 innerHTML', 'CSP 配置过宽'] },
  { type: 'CO', level: 'A', title: 'CSRF 的原理与防御', tags: 'CSRF、Token、SameSite、Cookie、防御', freq: '高频', time: '5-8 分钟', desc: '请解释 CSRF 攻击原理及前端配合防御的方法。', points: ['原理：攻击者诱导已登录用户访问恶意站点发起请求', '防御：SameSite Cookie、CSRF Token、Referer 校验', 'SameSite=Strict/Lax 限制第三方 Cookie 携带', '敏感操作加二次验证', '前端避免 GET 请求做写操作'], pitfalls: ['只靠前端校验', 'Cookie 不设置 SameSite', 'CSRF Token 存在 Cookie 中'] },
  { type: 'SE', level: 'P', title: '内容安全策略 CSP 如何配置', tags: 'CSP、XSS、策略、指令、报告', freq: '中频', time: '5-8 分钟', desc: '请说明 CSP 的作用、常用指令及部署建议。', points: ['CSP 限制页面可加载的资源来源，减少 XSS 危害', 'default-src、script-src、style-src、img-src、connect-src', '避免 unsafe-inline 和 unsafe-eval', 'report-uri/report-to 收集违规报告', '先 report-only 模式验证，再 enforcing'], pitfalls: ['CSP 过宽等于没配', '直接 enforcing 导致功能大面积异常', 'unsafe-inline 滥用'] },
  { type: 'SE', level: 'A', title: '前端如何安全存储 Token', tags: 'Token、localStorage、Cookie、HttpOnly、安全', freq: '高频', time: '3-5 分钟', desc: '请比较 Token 存储方式的安全性。', points: ['HttpOnly Cookie：防 XSS 读取，但需防 CSRF', 'localStorage：易受 XSS 窃取，但天然防 CSRF', 'sessionStorage：标签页级，关闭即清', 'Access Token 短有效期，Refresh Token 用 HttpOnly', '敏感操作加绑定设备/IP/指纹验证'], pitfalls: ['所有 Token 放 localStorage', 'Token 长期不过期', 'Refresh Token 也暴露给 JS'] },
  { type: 'SE', level: 'P', title: '前端供应链安全治理', tags: '供应链、npm、审计、SBOM、依赖', freq: '高频', time: '8-15 分钟', desc: '请说明前端如何防范供应链攻击。', points: ['依赖审计：npm audit、Snyk、Trivy', '锁定版本：lockfile、私有仓库', '最小权限：只安装必要依赖', 'SBOM：记录依赖清单', '代码审查：关注新引入依赖和权限请求', '运行时隔离：iframe、CSP、Subresource Integrity'], pitfalls: ['盲目升级最新版本', '不检查依赖源码', 'npm install 任意包'] },
  { type: 'SE', level: 'R', title: '设计一个企业级前端安全体系', tags: '安全体系、XSS、CSRF、CSP、SDL、治理', freq: '中频', time: '15-30 分钟', desc: '请为公司前端设计覆盖开发、发布、运行的安全体系。', points: ['SDL：需求、设计、编码、测试、发布各阶段安全活动', '开发：安全编码规范、依赖审计、密钥管理', '测试：SAST、DAST、渗透测试', '发布：构建签名、Source Map 保护、HTTPS', '运行：CSP、WAF、错误监控、漏洞响应', '组织：安全培训、应急响应、复盘'], pitfalls: ['只在上线前做一次安全检查', '安全与业务对立', '无应急响应流程'] },
  { type: 'CO', level: 'A', title: '什么是点击劫持及防御', tags: '点击劫持、X-Frame-Options、CSP、iframe', freq: '中频', time: '3-5 分钟', desc: '请解释点击劫持攻击和前端防御方法。', points: ['攻击：恶意页面用 iframe 覆盖目标页面诱导点击', '防御：X-Frame-Options: DENY/SAMEORIGIN', 'CSP frame-ancestors 控制嵌入来源', '敏感操作加二次确认', 'UI 设计：关键按钮位置变化'], pitfalls: ['允许任意网站 iframe 嵌入', '只依赖 JS 判断顶层窗口', '忽略 X-Frame-Options'] },
  { type: 'SE', level: 'P', title: '前端如何处理富文本安全', tags: '富文本、XSS、DOMPurify、HTML、白名单', freq: '中频', time: '5-8 分钟', desc: '请设计一个安全的富文本渲染方案。', points: ['不信任用户提交的 HTML', '使用 DOMPurify 等库按白名单过滤标签和属性', '禁止 script、onerror、javascript: 等危险内容', '后端再次清洗，前端只做兜底', '渲染时使用 v-pre 或转义非富文本部分'], pitfalls: ['直接 innerHTML 用户输入', '白名单过宽', '只在前端过滤'] },
  { type: 'SE', level: 'A', title: 'HTTPS 在前端安全中的作用', tags: 'HTTPS、TLS、中间人、加密、HSTS', freq: '高频', time: '3-5 分钟', desc: '请说明 HTTPS 的必要性及前端相关配置。', points: ['HTTPS 防止中间人窃听和篡改', '前端资源全部使用 HTTPS，避免混合内容', 'HSTS 强制浏览器使用 HTTPS', '证书固定和 OCSP Stapling', '敏感接口拒绝 HTTP'], pitfalls: ['主站 HTTPS 但资源 HTTP', '忽略 HSTS', '证书过期未监控'] },
  { type: 'CO', level: 'A', title: '什么是 Subresource Integrity', tags: 'SRI、哈希、CDN、篡改、完整性', freq: '中频', time: '3-5 分钟', desc: '请解释 SRI 的作用和用法。', points: ['SRI 让浏览器验证加载的脚本/样式是否被篡改', '通过 integrity 属性提供哈希值', '与 CDN 结合防止供应链投毒', '哈希算法推荐 sha384', '失败时浏览器不执行资源'], pitfalls: ['不使用 SRI 加载第三方脚本', 'integrity 值与文件不匹配', '版本更新后未更新 integrity'] },
  { type: 'SE', level: 'P', title: '前端如何防止敏感信息泄露', tags: '敏感信息、密钥、环境变量、源码、泄露', freq: '高频', time: '5-8 分钟', desc: '请说明前端项目中如何管理敏感信息。', points: ['不在前端代码中硬编码密钥、密码', '构建时通过环境变量注入的非敏感配置', 'API 密钥放在服务端或 BFF', '使用 git hooks 扫描提交中的密钥', 'Source Map 不上传公网'], pitfalls: ['把私钥放 .env 再打包', '在 GitHub 公开仓库提交密钥', '认为压缩后代码不可读'] },
  { type: 'SE', level: 'A', title: '前端如何处理文件上传安全', tags: '文件上传、XSS、类型校验、大小限制、沙箱', freq: '中频', time: '5-8 分钟', desc: '请说明前端文件上传的安全注意事项。', points: ['校验文件类型：白名单 MIME 和扩展名', '限制文件大小，防止拒绝服务', '图片文件做服务端重新编码防图片木马', '下载文件使用 Content-Disposition', '上传路径不可执行'], pitfalls: ['只依赖前端校验', '允许上传任意可执行文件', '文件名直接使用'] },
  { type: 'CO', level: 'P', title: 'CORS 与前端安全的关系', tags: 'CORS、同源、安全、跨域、预检', freq: '中频', time: '5-8 分钟', desc: '请说明 CORS 机制及前端如何安全地进行跨域请求。', points: ['CORS 是浏览器的安全机制，服务端通过头控制', '简单请求与预检请求区别', '前端不能绕过 CORS，需服务端正确配置', '敏感接口限制 Origin 和 Credentials', '避免通配符 * 配合 credentials'], pitfalls: ['前端用代理绕过 CORS 当解决方案', '服务端允许任意 Origin', 'Credentials 与 * 混用'] },
  { type: 'SE', level: 'P', title: '前端如何防御 DOM Clobbering', tags: 'DOM Clobbering、XSS、HTML、id、安全', freq: '低频', time: '5-8 分钟', desc: '请解释 DOM Clobbering 攻击原理及防御。', points: ['攻击：HTML 元素 id/name 与 JS 变量冲突，覆盖对象', '防御：避免通过全局变量读取 DOM 元素', '使用 const/let 声明，减少全局污染', '不可信内容先 DOMPurify 过滤', '避免依赖全局命名空间'], pitfalls: ['不知道 DOM Clobbering', '用 var 声明全局变量', '直接访问 id 名变量'] },
  { type: 'SE', level: 'A', title: '如何安全使用第三方脚本', tags: '第三方脚本、XSS、SRI、CSP、沙箱', freq: '高频', time: '5-8 分钟', desc: '请说明引入第三方 SDK/脚本时的安全措施。', points: ['评估第三方来源和权限', '使用 SRI 校验完整性', 'CSP 限制脚本来源', '延迟加载非关键脚本', '定期审计第三方脚本变更', '使用 iframe 或 Worker 隔离高敏感脚本'], pitfalls: ['任意引入第三方脚本', '第三方脚本拥有全局权限', '不监控第三方更新'] },
  { type: 'CO', level: 'A', title: '什么是开放重定向漏洞', tags: '开放重定向、URL、钓鱼、校验', freq: '中频', time: '3-5 分钟', desc: '请解释开放重定向漏洞及前端如何防范。', points: ['漏洞：攻击者构造跳转 URL 诱导用户到恶意站点', '前端跳转目标必须是白名单', '不要直接取 URL 参数作为跳转地址', '服务端也做白名单校验', '登录后跳转固定路径'], pitfalls: ['直接 location.href = urlParams.next', '只在前端校验', '使用黑名单'] },
  { type: 'SE', level: 'P', title: '前端如何做权限校验才安全', tags: '权限、前端校验、后端校验、RBAC、绕过', freq: '高频', time: '5-8 分钟', desc: '请说明前端权限校验的定位与边界。', points: ['前端权限用于体验控制，不能替代后端鉴权', '敏感操作和数据必须服务端校验', '权限数据应由服务端下发，前端缓存只读', '防止前端代码被绕过修改权限判断', '权限变更时实时刷新'], pitfalls: ['所有权限判断写死在前端', '前端隐藏按钮就认为安全', '不信任服务端返回数据'] },
  { type: 'SE', level: 'R', title: '设计前端安全开发生命周期', tags: 'SDL、安全、开发、测试、发布', freq: '中频', time: '8-15 分钟', desc: '请设计前端 SDL，覆盖需求到运营的完整流程。', points: ['需求：识别安全风险和合规要求', '设计：威胁建模、数据流图、信任边界', '编码：安全规范、依赖审计、代码评审', '测试：SAST、DAST、渗透、模糊测试', '发布：签名、回滚、监控', '运营：漏洞响应、日志审计、复盘'], pitfalls: ['安全只在测试阶段做', '无威胁建模', '漏洞修复无 SLA'] },
  { type: 'CO', level: 'B', title: 'Cookie 的 SameSite 属性', tags: 'Cookie、SameSite、CSRF、安全', freq: '高频', time: '3-5 分钟', desc: '请说明 SameSite 的三个取值及作用。', points: ['Strict：完全禁止第三方 Cookie，最安全但影响部分体验', 'Lax：允许 top-level 导航 GET 请求携带，平衡安全与体验', 'None：允许第三方，但必须配合 Secure', '有效防止 CSRF', '现代浏览器默认 Lax'], pitfalls: ['SameSite=None 未设置 Secure', 'Strict 导致正常跳转丢失登录态', '不设置 SameSite'] },
  { type: 'SE', level: 'A', title: '前端如何防止原型链污染', tags: '原型链污染、Object.assign、JSON、安全', freq: '中频', time: '5-8 分钟', desc: '请解释原型链污染漏洞及前端防御。', points: ['漏洞：通过修改 Object.prototype 影响所有对象', '来源：合并不可信对象、递归赋值', '防御：使用 Object.create(null)、Map/Set', '避免递归合并用户输入到对象', '使用结构化克隆或 schema 校验'], pitfalls: ['直接 Object.assign 用户输入', '深拷贝函数未过滤 __proto__', '不信任 JSON.parse 结果'] },
  { type: 'SE', level: 'P', title: 'Web Storage 安全使用指南', tags: 'localStorage、sessionStorage、安全、XSS、敏感数据', freq: '中频', time: '5-8 分钟', desc: '请说明 Web Storage 的安全风险和使用建议。', points: ['localStorage 可被 XSS 读取，不放敏感数据', 'sessionStorage 标签页级，适合临时状态', '避免存储密码、token、PII', '对存储数据做序列化和校验', '清理策略：登出清除'], pitfalls: ['localStorage 存 JWT', '不清理过期数据', '存储数据不经校验直接使用'] },
  { type: 'CO', level: 'A', title: '什么是内容嗅探与 MIME 嗅探防御', tags: 'MIME、内容嗅探、X-Content-Type-Options、安全', freq: '低频', time: '3-5 分钟', desc: '请解释 MIME 嗅探攻击及防御。', points: ['浏览器可能忽略 Content-Type 自行判断文件类型', '攻击者上传伪装文件执行脚本', '防御：X-Content-Type-Options: nosniff', '正确设置 Content-Type', '不允许用户上传可执行内容'], pitfalls: ['未设置 nosniff', '允许上传 .html 等可执行文件', '依赖文件扩展名判断'] },
  { type: 'SE', level: 'A', title: '前端如何处理 URL 参数安全', tags: 'URL、参数、XSS、开放重定向、校验', freq: '中频', time: '5-8 分钟', desc: '请说明前端使用 URL 参数时的安全注意事项。', points: ['不要直接将 URL 参数渲染到页面，需转义', '跳转目标校验白名单', '参数做类型和长度校验', '避免把敏感信息放在 URL', '分享链接注意信息泄露'], pitfalls: ['document.write(location.search)', 'URL 参数直接作为跳转地址', 'URL 中暴露 token'] },
  { type: 'SE', level: 'P', title: '如何防御 JSONP 相关安全风险', tags: 'JSONP、XSS、CSP、Callback、安全', freq: '中频', time: '5-8 分钟', desc: '请说明 JSONP 的安全问题及现代替代方案。', points: ['JSONP 允许任意回调执行，存在 XSS 和数据泄露', '回调函数名可能被污染', '替代：CORS + fetch', '如果必须使用，校验回调名白名单、CSP 限制', '避免传输敏感数据'], pitfalls: ['无限制使用 JSONP', '回调名来自用户输入', '把 JSONP 当跨域万能方案'] },
  { type: 'CO', level: 'R', title: '前端零信任安全架构实践', tags: '零信任、前端、身份、验证、最小权限', freq: '低频', time: '8-15 分钟', desc: '请说明零信任理念如何应用到前端架构。', points: ['永不信任，始终验证', '前端默认不可信，后端做最终鉴权', '最小权限：只暴露必要接口和数据', '持续验证：行为异常检测、设备指纹', '微分段：按业务域隔离权限', '假设前端代码可被逆向，不存放机密'], pitfalls: ['前端做最终安全决策', '内网应用默认信任', '过度依赖前端混淆'] },
  { type: 'SE', level: 'A', title: '前端如何应对供应链投毒事件', tags: '供应链、投毒、npm、响应、回滚', freq: '中频', time: '5-8 分钟', desc: '请说明发现依赖包被投毒后的应急响应。', points: ['立即锁定或移除恶意依赖版本', '回滚到上一安全版本并发布', '审计受影响代码和构建产物', '检查是否有密钥泄露或异常网络请求', '建立依赖白名单和审批流程', '事后复盘更新 SCA 策略'], pitfalls: ['继续等待官方修复', '不检查已发布产物', '无依赖审批流程'] },
  { type: 'CO', level: 'P', title: '什么是安全标头及其前端价值', tags: '安全标头、HSTS、CSP、X-Frame、XSS-Protection', freq: '中频', time: '5-8 分钟', desc: '请列举常见的 HTTP 安全响应头及作用。', points: ['HSTS：强制 HTTPS', 'CSP：限制资源加载和脚本执行', 'X-Frame-Options / CSP frame-ancestors：防止点击劫持', 'X-Content-Type-Options: nosniff', 'Referrer-Policy：控制 referrer 泄露', 'Permissions-Policy：限制浏览器 API'], pitfalls: ['安全头配置错误导致功能异常', '只配部分头', '认为前端无法影响响应头'] },
  { type: 'SE', level: 'A', title: '前端日志中的隐私合规', tags: '隐私、GDPR、个人信息、日志、脱敏', freq: '中频', time: '5-8 分钟', desc: '请说明前端日志采集如何避免隐私合规风险。', points: ['不上传姓名、手机号、身份证、地址等 PII', '用户 ID 做哈希或假名化', '地理位置等敏感信息需授权和最小化', '遵守 GDPR、CCPA、个保法等法规', '提供用户删除和导出数据的机制'], pitfalls: ['日志明文记录用户输入', '采集所有用户行为无告知', '数据保留期限过长'] },
];


const Q32 = [
  { type: 'CO', level: 'B', title: 'WebSocket 与 HTTP 长轮询的区别', tags: 'WebSocket、长轮询、实时、SSE、通信', freq: '高频', time: '3-5 分钟', desc: '请比较 WebSocket、SSE 和长轮询的特点和适用场景。', points: ['WebSocket：全双工、低延迟、适合高频双向通信', 'SSE：服务器单向推送，基于 HTTP，自动重连', '长轮询：兼容性好，但实时性差、开销大', 'WebSocket 适合聊天、游戏、协作', 'SSE 适合股票行情、日志流、通知'], pitfalls: ['所有实时场景都用 WebSocket', '忽略 WebSocket 代理和防火墙', '长轮询不设置超时'] },
  { type: 'CO', level: 'A', title: 'WebSocket 连接管理要点', tags: 'WebSocket、重连、心跳、状态、管理', freq: '高频', time: '5-8 分钟', desc: '请说明生产环境使用 WebSocket 需要管理的连接问题。', points: ['连接建立、断开、重连机制', '心跳检测：防止中间件超时断开', '重连策略：指数退避、最大重试次数', '消息队列：断线期间消息暂存', '连接状态暴露给 UI', '多标签页避免重复连接'], pitfalls: ['断线不重连', '无心跳导致假死', '重连风暴'] },
  { type: 'SC', level: 'A', title: '设计一个实时消息推送系统', tags: '实时、推送、WebSocket、SSE、消息队列', freq: '高频', time: '8-15 分钟', desc: '请设计一个支持百万在线用户的实时消息推送系统前端架构。', points: ['连接层：WebSocket 网关负责长连接管理', '接入层：按用户/房间分组，支持广播、组播、单播', '消息协议：JSON/Protobuf，包含 id、type、timestamp、seq', '客户端：连接管理、消息去重、顺序保证、离线缓存', '降级：WebSocket 不可用降级到 SSE/长轮询', '监控：连接数、消息延迟、丢包率'], pitfalls: ['每个用户一条独立连接但无网关', '消息无序号导致乱序', '无降级策略'] },
  { type: 'CO', level: 'P', title: '实时系统中的消息顺序与一致性', tags: '顺序、一致性、seq、CRDT、OT、实时', freq: '中频', time: '8-15 分钟', desc: '请说明实时系统中如何保证消息顺序和最终一致性。', points: ['服务端生成单调递增 seq 或时间戳', '客户端按 seq 排序，缺号时补拉', '版本向量处理并发冲突', 'CRDT/OT 用于协作编辑等强一致性场景', '容忍短暂不一致，关键操作二次确认'], pitfalls: ['依赖客户端时间戳排序', '不处理消息丢失', '对最终一致场景追求强一致'] },
  { type: 'SC', level: 'P', title: '网络分区对实时系统的影响', tags: '网络分区、离线、重连、消息队列、一致性', freq: '中频', time: '5-8 分钟', desc: '请分析网络分区时实时应用前端应如何处理。', points: ['检测：心跳超时、发送失败', '本地缓存未发送消息', '重连后同步离线期间的操作', '冲突解决：LWW、业务合并、用户选择', 'UI 提示用户当前连接状态'], pitfalls: ['断线时直接报错', '重连后消息重复', '忽略本地操作丢失'] },
  { type: 'SD', level: 'R', title: '设计一个实时协作白板', tags: '实时协作、白板、CRDT、WebSocket、性能', freq: '中频', time: '15-30 分钟', desc: '请设计一个多人实时协作白板的前端架构。', points: ['数据模型：图元对象、图层、操作历史', '同步协议：基于 CRDT 或 OT 的操作转换', '传输：WebSocket 广播操作，本地先执行再同步', '渲染：Canvas 或 SVG，增量更新', '冲突处理：CRDT 天然合并，OT 需服务端协调', ' presence：光标、选区、用户头像', '历史与撤销：操作日志 + 版本向量'], pitfalls: ['直接传输完整状态', '不做操作去重', '忽略离线编辑'] },
  { type: 'CO', level: 'A', title: 'SSE 的优缺点与使用限制', tags: 'SSE、服务器推送、HTTP、单向、限制', freq: '中频', time: '3-5 分钟', desc: '请说明 SSE 的适用场景和限制。', points: ['优点：基于 HTTP、自动重连、支持事件 ID', '缺点：只能服务器向客户端推送，浏览器连接数限制', '适合：通知、日志、股票、监控数据流', '限制：每个源连接数受限，HTTP/2 可缓解', '需要设置正确的 MIME 类型和事件格式'], pitfalls: ['需要双向通信却用 SSE', '不处理重连后事件 ID', '忽略浏览器连接数限制'] },
  { type: 'SC', level: 'A', title: '实时系统中的心跳设计', tags: '心跳、WebSocket、超时、重连、保活', freq: '中频', time: '5-8 分钟', desc: '请设计 WebSocket 心跳机制。', points: ['客户端定时发送 ping，服务端回复 pong', '超过一定时间未收到响应判定断线', '心跳间隔应小于代理/网关超时时间', '断线后按指数退避重连', '后台标签页可降低心跳频率省电'], pitfalls: ['心跳间隔过长被代理断开', '没有 pong 确认机制', '重连过于频繁'] },
  { type: 'PE', level: 'A', title: '实时系统前端性能优化', tags: '实时、性能、节流、批量、渲染', freq: '中频', time: '5-8 分钟', desc: '请说明高频率实时数据更新的前端性能优化手段。', points: ['节流/防抖：高频数据批量更新', '批量 DOM 更新，避免每帧 setState', '使用 requestAnimationFrame 对齐渲染', '虚拟化长列表', '数据采样：可视区外降低精度', 'Web Worker 处理数据解析'], pitfalls: ['每条消息都触发渲染', 'UI 线程被数据更新占满', '不区分可见区域'] },
  { type: 'CO', level: 'P', title: '什么是操作转换 OT 与 CRDT', tags: 'OT、CRDT、协作、并发、一致性', freq: '中频', time: '8-15 分钟', desc: '请比较 OT 和 CRDT 在实时协作中的应用。', points: ['OT：操作在服务端转换，保证一致性，依赖中心服务器', 'CRDT：无中心，本地合并，适合点对点', 'OT 实现复杂但成熟，如 Google Docs', 'CRDT 更适合去中心化、离线优先', '选型：强中心用 OT，多端离线用 CRDT'], pitfalls: ['CRDT 数据模型设计不当导致冲突', 'OT 无服务器协调', '忽略两者存储开销'] },
  { type: 'SC', level: 'A', title: '实时聊天前端架构设计', tags: '聊天、WebSocket、消息、历史、未读', freq: '高频', time: '8-15 分钟', desc: '请设计一个实时聊天应用的前端架构。', points: ['消息分层：本地消息、历史消息、实时消息', 'WebSocket 维护连接，接收/发送消息', '消息状态：发送中、已发送、已送达、已读', '历史分页加载，本地缓存最近消息', '未读计数、消息提醒、多设备同步', '富文本与图片安全过滤'], pitfalls: ['所有消息都重新拉取', '消息状态不一致', '断线后消息丢失'] },
  { type: 'FS', level: 'A', title: '实时消息延迟高如何排查', tags: '实时、延迟、排查、网络、服务端', freq: '中频', time: '5-8 分钟', desc: '请给出实时消息延迟高的排查思路。', points: ['区分客户端渲染延迟与网络传输延迟', '测量各阶段耗时：发送 -> 服务端 -> 广播 -> 接收', '检查 WebSocket 是否被降级为轮询', '查看网络质量、丢包、重连', '服务端检查消息队列和广播延迟', '前端检查是否有批量渲染阻塞'], pitfalls: ['只看端到端总延迟', '忽略服务端广播延迟', '未记录消息时间戳'] },
  { type: 'SC', level: 'P', title: '实时系统中如何做消息去重', tags: '去重、消息 ID、幂等、顺序、实时', freq: '中频', time: '5-8 分钟', desc: '请设计实时消息去重机制。', points: ['每条消息带全局唯一 id 或 seq', '客户端维护已接收 id 集合', '重连后根据 lastSeq 拉取缺失消息', '幂等处理：同一消息多次处理结果一致', '清理过期 id 防止内存无限增长'], pitfalls: ['用时间戳做唯一标识', '不重连补漏直接丢弃', '去重集合无上限'] },
  { type: 'CO', level: 'A', title: '实时系统中如何处理 Presence', tags: 'Presence、在线状态、心跳、WebSocket、用户', freq: '中频', time: '5-8 分钟', desc: '请说明实时应用中的在线状态（Presence）设计。', points: ['服务端维护用户在线状态', '心跳机制检测在线/离线', '延迟上线/下线避免频繁抖动', '多设备登录状态合并', '隐私：不在线用户不暴露详细状态'], pitfalls: ['仅依赖 WebSocket 连接状态', '上线下线过于敏感频繁变化', '多设备状态不一致'] },
  { type: 'SD', level: 'R', title: '设计一个实时数据可视化大屏', tags: '实时、数据可视化、WebSocket、性能、Canvas', freq: '中频', time: '8-15 分钟', desc: '请设计一个高频实时数据的可视化大屏。', points: ['数据接入：WebSocket/SSE 接收数据', '数据缓冲与采样：按时间窗口聚合', '渲染：Canvas/WebGL 处理大量元素', '更新策略：批量更新、requestAnimationFrame', '断线重连与历史补录', '告警阈值与异常高亮'], pitfalls: ['每帧都全量重绘', '数据不采样导致卡顿', '断线后数据空洞'] },
  { type: 'CO', level: 'P', title: 'WebRTC 在前端实时系统中的应用', tags: 'WebRTC、P2P、音视频、数据通道、实时', freq: '低频', time: '5-8 分钟', desc: '请说明 WebRTC 的适用场景及前端需要处理的问题。', points: ['适用：音视频通话、P2P 数据传输、低延迟直播', '需要信令服务器建立连接', '处理 NAT 穿透、ICE、STUN/TURN', '前端处理权限、设备选择、码率适配', '信令与媒体分离设计'], pitfalls: ['认为 WebRTC 完全无服务端', '忽略网络穿透', '不做音视频降级'] },
  { type: 'SC', level: 'A', title: '实时系统中如何做限流与降级', tags: '限流、降级、实时、消息、频率', freq: '中频', time: '5-8 分钟', desc: '请设计实时系统的客户端限流与服务端降级策略。', points: ['客户端限流：发送频率限制、合并操作', '服务端限流：按用户/房间限速', '降级：高负载时降低消息频率或采样率', '非关键消息延迟发送', '通知用户当前处于降级模式'], pitfalls: ['无限制发送消息', '服务端过载不降级', '限流导致用户体验极差'] },
  { type: 'CO', level: 'A', title: '长连接服务端的推送策略', tags: '推送、长连接、广播、房间、分组', freq: '中频', time: '5-8 分钟', desc: '请说明服务端如何高效向客户端推送消息。', points: ['按用户/房间/ topic 分组管理连接', '广播时只发给相关连接', '消息合并：同一房间多条更新合并推送', '优先级：重要消息优先发送', '失败重试与离线补偿'], pitfalls: ['全量广播所有连接', '每条消息都单独推送', '不考虑离线用户'] },
  { type: 'PE', level: 'P', title: '实时列表的渲染优化', tags: '实时列表、虚拟化、DOM、渲染、性能', freq: '中频', time: '5-8 分钟', desc: '请说明实时消息列表的渲染优化方案。', points: ['虚拟滚动只渲染可视区', '批量插入新消息', '新消息动画不阻塞列表滚动', '历史消息分页懒加载', '高亮@自己的消息不频繁重排'], pitfalls: ['上万条消息全部渲染', '每条新消息都插入动画', '频繁滚动到底部'] },
  { type: 'SC', level: 'P', title: '实时系统中的断线补偿策略', tags: '断线、补偿、重连、消息队列、同步', freq: '中频', time: '5-8 分钟', desc: '请设计断线重连后的数据补偿机制。', points: ['记录最后接收的消息 seq/ID', '重连后发送 lastSeq 请求补漏', '服务端返回缺失消息', '本地操作队列在重连后批量同步', '冲突时按业务规则合并或提示用户'], pitfalls: ['重连后直接丢弃历史消息', '不记录 lastSeq', '补偿消息与本地操作冲突未处理'] },
  { type: 'CP', level: 'R', title: '实时系统的架构演进路径', tags: '实时、演进、长轮询、WebSocket、CRDT', freq: '低频', time: '8-15 分钟', desc: '请说明一个实时系统从简单到复杂的演进路径。', points: ['阶段一：长轮询满足基本实时性', '阶段二：SSE 单向推送', '阶段三：WebSocket 双向低延迟', '阶段四：引入消息队列、房间、Presence', '阶段五：CRDT/OT 支持协作编辑', '阶段六：多活、边缘节点、全球加速'], pitfalls: ['一开始就上最复杂方案', '忽视用户规模和场景', '演进无数据支撑'] },
  { type: 'CO', level: 'B', title: '什么是 Socket.IO，它解决了什么问题', tags: 'Socket.IO、WebSocket、降级、实时、 rooms', freq: '高频', time: '3-5 分钟', desc: '请解释 Socket.IO 的核心能力。', points: ['Socket.IO 是基于事件的实时通信库', '自动降级：WebSocket -> 长轮询', '内置命名空间、房间、广播、重连', '跨浏览器兼容性好', '适合快速开发实时应用'], pitfalls: ['认为 Socket.IO 就是 WebSocket', '忽略 rooms 与命名空间设计', '过度依赖自动降级'] },
  { type: 'SE', level: 'A', title: '实时系统中的鉴权与安全', tags: '实时、鉴权、Token、WebSocket、安全', freq: '中频', time: '5-8 分钟', desc: '请说明 WebSocket/SSE 连接的鉴权方案。', points: ['连接建立时通过 URL 参数或 Cookie 传递 Token', '优先使用短期 token 或 ticket', '连接后定期校验 token 有效期', '防止未授权用户加入房间', '敏感消息端到端加密'], pitfalls: ['Token 长期有效', '鉴权逻辑只在 HTTP 握手', '房间号可猜测导致越权'] },
  { type: 'SC', level: 'A', title: '实时系统中的多端一致性', tags: '多端、一致性、消息同步、未读、状态', freq: '中频', time: '5-8 分钟', desc: '请设计同一用户在多设备上的实时状态同步方案。', points: ['服务端维护用户级消息状态', '消息已读、未读多端同步', '同步协议：拉取增量 + 推送变更', '设备间状态以服务端为准', '处理设备离线后的状态合并'], pitfalls: ['各设备独立维护未读', '状态不同步导致消息重复提醒', '离线设备上线状态缺失'] },
];


const Q33 = [
  { type: 'CO', level: 'B', title: '前端国际化的核心问题有哪些', tags: '国际化、i18n、翻译、语言、本地化', freq: '高频', time: '3-5 分钟', desc: '请说明前端国际化需要解决的主要问题。', points: ['文本翻译：提取、管理、加载多语言资源', '复数、日期、数字、货币格式化', '布局方向：RTL 语言支持', '语言切换与状态保持', 'SEO 与路由', '文化差异与本地化'], pitfalls: ['硬编码中文', '只翻译文本忽略格式', '忽略 RTL'] },
  { type: 'CO', level: 'A', title: 'i18n 与 l10n 的区别', tags: 'i18n、l10n、国际化、本地化、翻译', freq: '高频', time: '3-5 分钟', desc: '请解释国际化与本地化的区别。', points: ['i18n：设计应用使其可适应不同语言和地区', 'l10n：针对具体地区进行翻译和文化适配', 'i18n 是能力，l10n 是内容', '示例：i18n 框架支持，l10n 提供具体文案'], pitfalls: ['混用两个概念', '只做翻译不做架构适配', '忽略本地化文化'] },
  { type: 'SC', level: 'A', title: '如何设计前端多语言资源管理', tags: '多语言、资源、JSON、命名空间、懒加载', freq: '高频', time: '5-8 分钟', desc: '请设计前端多语言资源的组织、加载和维护方案。', points: ['按页面/模块拆分 namespace，避免全量加载', '资源文件格式：JSON/YAML，键值结构', '按需加载：切换语言或进入路由时加载对应资源', '回退机制：找不到时回退默认语言', '插值与组件：支持变量、HTML、组件替换', '翻译管理平台：Crowdin、Lokalise'], pitfalls: ['所有语言一个文件', '键名无规范导致冲突', '不区分语言包版本'] },
  { type: 'CO', level: 'A', title: 'React/Vue 中常见的 i18n 方案', tags: 'React Intl、vue-i18n、FormatJS、i18next', freq: '高频', time: '5-8 分钟', desc: '请比较主流前端 i18n 库及其特点。', points: ['i18next：跨框架、生态丰富、插件多', 'react-intl/FormatJS：React 官方推荐，ICU 消息格式', 'vue-i18n：Vue 生态，语法简洁', '选型：团队栈、ICU 支持、SSR 需求', '统一消息格式便于翻译平台对接'], pitfalls: ['每个项目用不同库', '消息格式不统一', '忽略 SSR'] },
  { type: 'PE', level: 'A', title: '国际化对前端性能的影响及优化', tags: 'i18n、性能、资源体积、懒加载、打包', freq: '中频', time: '5-8 分钟', desc: '请说明多语言资源对性能的影响及优化手段。', points: ['按需加载语言包，避免打包所有语言', '拆分 namespace，路由级加载', '预加载默认语言，其他语言异步加载', '服务端渲染时注入初始语言数据', '压缩资源，使用 CDN'], pitfalls: ['打包 50 种语言', '切换语言全量刷新', '不做资源缓存'] },
  { type: 'SC', level: 'P', title: '如何处理 ICU 复数与插值', tags: 'ICU、复数、插值、国际化、格式化', freq: '中频', time: '5-8 分钟', desc: '请说明 ICU 消息格式中的复数、选择、插值用法。', points: ['插值：{name} 替换变量', '复数：{count, plural, one {# item} other {# items}}', '选择：{gender, select, male {he} female {she}}', '数字日期：{num, number}、{date, date}', '让翻译人员掌握 ICU 语法'], pitfalls: ['用代码拼接复数', '不同语言复数规则不同硬编码', '插值不转义导致 XSS'] },
  { type: 'CO', level: 'P', title: 'RTL 语言布局如何支持', tags: 'RTL、国际化、布局、CSS、方向', freq: '中频', time: '5-8 分钟', desc: '请说明支持阿拉伯语、希伯来语等 RTL 语言的方案。', points: ['HTML dir 属性设置为 rtl', 'CSS 逻辑属性：margin-inline-start 替代 margin-left', '使用 CSS-in-JS 或 PostCSS 插件自动翻转', '图标和动画方向适配', '测试：镜像布局、文字对齐'], pitfalls: ['写死 left/right', '只做文本翻译不改布局', '忽略数字和标点方向'] },
  { type: 'SC', level: 'A', title: '国际化与路由/SEO 的结合', tags: 'i18n、路由、SEO、hreflang、SSR', freq: '中频', time: '5-8 分钟', desc: '请设计支持多语言的 URL 和 SEO 方案。', points: ['URL 方案：子目录 /zh/ /en/ 或子域名', 'HTML lang 属性与 hreflang 标签', 'SSR 输出对应语言 HTML', '默认语言重定向或 canonical', '搜索引擎可索引各语言版本'], pitfalls: ['用 hash 或 cookie 切换语言无独立 URL', '缺少 hreflang', 'SSR 语言数据不一致'] },
  { type: 'CO', level: 'A', title: '时区与日期时间处理', tags: '时区、日期、国际化、moment、dayjs', freq: '高频', time: '5-8 分钟', desc: '请说明前端如何处理多时区、夏令时和日期格式化。', points: ['存储 UTC 时间，显示按用户时区', '使用 Temporal 或 date-fns/dayjs 等现代库', '避免手写时区转换', '让用户选择时区或按浏览器时区', '注意跨天时间边界'], pitfalls: ['用本地时间存储', '手写时区逻辑', '忽略夏令时'] },
  { type: 'SC', level: 'P', title: '如何设计组件库的多语言支持', tags: '组件库、多语言、i18n、插槽、配置', freq: '中频', time: '5-8 分钟', desc: '请设计一个支持多语言的通用组件库。', points: ['组件内部文案通过 i18n 配置注入', '提供 locale 属性或全局 ConfigProvider', '允许通过 slot/children 覆盖默认文案', '默认语言包可替换', '避免组件库与业务翻译冲突'], pitfalls: ['组件库硬编码中文', '文案与组件强耦合', '不支持覆盖默认文案'] },
  { type: 'CO', level: 'P', title: '翻译管理系统如何与前端集成', tags: 'TMS、翻译、CI/CD、API、Crowdin', freq: '中频', time: '5-8 分钟', desc: '请说明翻译管理平台与前端工程化的集成。', points: ['开发提交源语言 key-value', '翻译人员在 TMS 翻译', 'CI 拉取最新翻译生成语言包', '翻译进度与缺失检查', '回退到源语言或默认语言'], pitfalls: ['手动复制翻译文件', '翻译完成前无法发布', '不同环境翻译不一致'] },
  { type: 'SC', level: 'A', title: '前端如何做语言切换体验', tags: '语言切换、i18n、状态、路由、刷新', freq: '中频', time: '3-5 分钟', desc: '请设计流畅的语言切换体验。', points: ['切换时保存偏好到 localStorage/用户配置', '异步加载新语言包并替换', '必要时刷新页面或路由切换', '图片、日期、数字同步更新', '避免闪烁：先加载资源再切换'], pitfalls: ['切换后部分文案未更新', '语言偏好未持久化', '切换时白屏'] },
  { type: 'CO', level: 'B', title: '什么是伪本地化（Pseudolocalization）', tags: '伪本地化、i18n、测试、占位符', freq: '低频', time: '3-5 分钟', desc: '请解释伪本地化及其在国际化测试中的作用。', points: ['伪本地化：用模拟字符替换原文，测试布局扩展', '帮助发现硬编码文本、布局截断、缺少翻译', '常用：添加前缀、拉长文本、变音符号', '可在开发/测试环境自动启用', '不替代真实翻译测试'], pitfalls: ['未做伪本地化直接上线', '认为伪本地化就是翻译', '只在生产环境发现布局问题'] },
  { type: 'SC', level: 'P', title: '国际化项目的测试策略', tags: 'i18n、测试、RTL、截图、翻译', freq: '中频', time: '5-8 分钟', desc: '请说明如何测试国际化前端应用。', points: ['功能测试：切换语言后所有文案正确', '布局测试：长文本、RTL 不破坏布局', '格式测试：日期、数字、货币、复数', '截图测试：不同语言关键页面', '缺失翻译检测：CI 扫描未翻译 key'], pitfalls: ['只测默认语言', '忽略 RTL 测试', '不测格式规则'] },
  { type: 'PE', level: 'A', title: '多语言包的体积优化', tags: 'i18n、体积、按需加载、压缩、拆分', freq: '中频', time: '5-8 分钟', desc: '请说明如何减小小语言包体积。', points: ['只打包默认语言，其他按需加载', '按路由/页面拆分 namespace', '移除未使用的 key', '压缩 JSON 或转 JS 模块', '服务端提供语言包 CDN'], pitfalls: ['全量语言包打包', '语言包包含大量未用文案', '不压缩传输'] },
  { type: 'CO', level: 'P', title: '货币与数字格式化', tags: '货币、数字、i18n、Intl、格式化', freq: '中频', time: '3-5 分钟', desc: '请说明前端如何正确格式化货币和数字。', points: ['使用 Intl.NumberFormat', '区分货币符号、小数位、千分位', '注意不同地区小数点和千分位符号', '货币单位与汇率由服务端提供', '不要用字符串拼接货币'], pitfalls: ['硬编码 ¥/$', '忽略小数位差异', '用 toFixed 做货币格式化'] },
  { type: 'SC', level: 'A', title: '如何处理翻译中的占位符和 HTML', tags: 'i18n、占位符、HTML、XSS、转义', freq: '中频', time: '5-8 分钟', desc: '请说明翻译文案中包含变量或 HTML 的安全渲染方案。', points: ['变量插值默认转义', '需要 HTML 时使用库提供的富文本组件', '限制允许的标签和属性', '避免用户输入直接放入翻译', '对富文本做 DOMPurify 过滤'], pitfalls: ['直接 v-html 翻译结果', '不过滤用户输入', '翻译人员插入脚本'] },
  { type: 'CO', level: 'A', title: '国际化中的语言回退策略', tags: '回退、语言、方言、默认语言、i18n', freq: '中频', time: '3-5 分钟', desc: '请说明多语言 fallback 策略。', points: ['用户选择 > 浏览器语言 > 默认语言', '方言回退到基础语言：zh-CN -> zh -> en', '回退链可配置', '找不到翻译时显示 key 或默认语言', '避免空字符串'], pitfalls: ['直接回退英文忽略地区', '回退链无限循环', '缺失翻译显示空'] },
  { type: 'SD', level: 'R', title: '设计一个可扩展的国际化架构', tags: 'i18n、架构、插件、多语言、SSR、组件库', freq: '低频', time: '8-15 分钟', desc: '请为公司级前端产品设计国际化架构。', points: ['统一 i18n 库和消息格式', '语言资源分层：基础、业务、组件库', '按需加载与 SSR 注入', '翻译管理系统集成', 'RTL 与本地化适配', '自动化测试与缺失检测'], pitfalls: ['各项目各自为政', '组件库与业务翻译不统一', '上线前才发现 RTL 问题'] },
  { type: 'CO', level: 'B', title: 'Intl API 在前端的使用', tags: 'Intl、DateTimeFormat、RelativeTime、ListFormat', freq: '中频', time: '3-5 分钟', desc: '请说明 Intl API 能解决哪些国际化问题。', points: ['Intl.DateTimeFormat 格式化日期时间', 'Intl.NumberFormat 格式化数字、货币、百分比', 'Intl.RelativeTimeFormat 相对时间', 'Intl.ListFormat 列表连接', 'Intl.Collator 字符串排序', '现代浏览器支持，需 polyfill'], pitfalls: ['手写日期格式化', '忽略浏览器兼容性', '不考虑用户 locale'] },
  { type: 'SC', level: 'P', title: '如何处理多语言下的 SEO 与预渲染', tags: 'i18n、SEO、SSR、预渲染、hreflang', freq: '中频', time: '5-8 分钟', desc: '请说明多语言站点的 SEO 最佳实践。', points: ['每种语言有独立 URL', 'HTML lang 和 hreflang 标签', 'SSR/SSG 输出各语言版本', 'sitemap 包含各语言链接', '避免自动重定向导致爬虫无法索引'], pitfalls: ['用 JS 切换语言无独立 URL', 'hreflang 与 URL 不一致', '重定向所有爬虫到默认语言'] },
  { type: 'PE', level: 'A', title: '国际化对首屏性能的影响', tags: 'i18n、首屏、SSR、语言包、加载', freq: '中频', time: '5-8 分钟', desc: '请说明多语言对首屏性能的影响及优化。', points: ['语言包过大增加请求和解析时间', 'SSR 时注入当前语言数据减少请求', '按需加载 namespace', '语言包缓存和 CDN', '默认语言内联，其他异步'], pitfalls: ['首屏加载所有语言', 'SSR 不注入语言数据', '语言包阻塞渲染'] },
  { type: 'CO', level: 'A', title: '文化本地化与简单翻译的区别', tags: '本地化、文化、颜色、图标、文案', freq: '低频', time: '3-5 分钟', desc: '请举例说明本地化不只是翻译。', points: ['颜色、图标、手势在不同文化含义不同', '日期格式、地址格式、姓名顺序', '支付方式、货币、税务规则', '内容策略：节日、法律、合规', '需要本地团队审核'], pitfalls: ['只做直译', '使用有文化争议的图标', '忽略本地法律法规'] },
  { type: 'SC', level: 'A', title: '如何在前端做翻译质量检查', tags: '翻译、质量、检查、CI、lint', freq: '中频', time: '5-8 分钟', desc: '请说明如何在工程流程中保障翻译质量。', points: ['CI 检测未翻译 key 和占位符不匹配', '伪本地化测试布局', '翻译人员与开发协作平台', '关键页面截图对比', '用户反馈渠道与快速修正'], pitfalls: ['上线前才给翻译', '不检查占位符', '无用户反馈机制'] },
];


const Q34 = [
  { type: 'CO', level: 'B', title: 'SVG、Canvas、WebGL 的适用场景', tags: 'SVG、Canvas、WebGL、渲染、可视化', freq: '高频', time: '3-5 分钟', desc: '请比较三种图形技术的特点和适用场景。', points: ['SVG：矢量、DOM 可操作、适合静态/交互图表、少元素', 'Canvas：位图、性能高、适合动态绘制、中等元素量', 'WebGL：GPU 加速、适合海量数据、3D、复杂渲染', 'SVG 元素多会卡顿，Canvas 元素多可优化', '选型依据：数据量、交互复杂度、是否需要 DOM 事件'], pitfalls: ['海量数据用 SVG', '简单图标用 WebGL', '忽略 Retina 屏幕缩放'] },
  { type: 'CO', level: 'A', title: '图表库选型要考虑哪些因素', tags: '图表库、ECharts、D3、AntV、选型', freq: '高频', time: '5-8 分钟', desc: '请说明选择图表库时的关键考量。', points: ['功能覆盖：是否支持所需图表类型', '性能：大数据量渲染能力', '可定制性：主题、交互、扩展', '生态与文档：社区、维护状态', '框架兼容性：React/Vue 封装', '包体积和许可证'], pitfalls: ['为了炫酷选择过度复杂的库', '忽略包体积', '只看示例不看 API 深度'] },
  { type: 'PE', level: 'A', title: '大数据量图表如何优化', tags: '大数据、图表、抽稀、聚合、Canvas、WebGL', freq: '高频', time: '5-8 分钟', desc: '请说明当数据量超过十万点时图表的优化手段。', points: ['数据抽稀：按像素/区域聚合，减少绘制点', '分层渲染：重要点优先', '使用 Canvas/WebGL 替代 SVG', '视口裁剪：只绘制可见区域', '虚拟滚动或缩放时动态加载', 'Web Worker 预处理数据'], pitfalls: ['直接绘制所有点', '用 SVG 渲染十万点', '每次交互全量重算'] },
  { type: 'SC', level: 'A', title: '如何设计一个可配置的图表组件', tags: '图表组件、配置化、Schema、ECharts、封装', freq: '中频', time: '5-8 分钟', desc: '请设计一个通过配置驱动的图表组件。', points: ['统一配置规范：chartType、data、axis、legend、theme', '基于底层库（ECharts/AntV）封装', '支持事件回调和自定义 tooltip', '主题与样式可配置', '提供默认配置和可覆盖项', '校验配置合法性'], pitfalls: ['封装过度导致灵活性差', '配置与实现强耦合', '不处理异常配置'] },
  { type: 'CO', level: 'P', title: 'D3 与 ECharts 的取舍', tags: 'D3、ECharts、可视化、定制、开发效率', freq: '高频', time: '5-8 分钟', desc: '请比较 D3 和 ECharts 在可视化项目中的适用场景。', points: ['ECharts：开箱即用、配置驱动、适合常规图表', 'D3：底层灵活、适合高度定制和新颖可视化', 'ECharts 开发效率高，D3 可控性强', '复杂交互和自定义布局用 D3', '常规 BI 报表用 ECharts'], pitfalls: ['简单图表用 D3 过度开发', '复杂需求硬套 ECharts', '忽略 D3 学习成本'] },
  { type: 'PE', level: 'P', title: '可视化大屏的渲染性能优化', tags: '大屏、可视化、性能、Canvas、WebGL、动画', freq: '高频', time: '8-15 分钟', desc: '请说明数据可视化大屏的性能优化方案。', points: ['使用 Canvas/WebGL 渲染大量元素', '数据采样和聚合', '动画使用 requestAnimationFrame', '静态区域使用缓存位图', 'WebSocket 数据批量更新', '分层渲染与脏矩形优化'], pitfalls: ['大量 DOM 图表', '每帧全量重绘', '高频数据无节流'] },
  { type: 'SC', level: 'A', title: '如何实现图表的响应式布局', tags: '响应式、图表、ResizeObserver、重绘、自适应', freq: '中频', time: '3-5 分钟', desc: '请说明图表组件如何适应容器尺寸变化。', points: ['监听容器 resize：ResizeObserver 或 window resize', '防抖/节流触发图表 resize', '图表库提供 resize API', '移动端适配：简化图表、调整 legend 位置', '保持比例或重新计算布局'], pitfalls: ['只监听 window resize', '频繁 resize 重绘', '移动端不调整图表'] },
  { type: 'CO', level: 'A', title: '什么是数据可视化中的视觉编码', tags: '视觉编码、位置、颜色、大小、形状、通道', freq: '中频', time: '5-8 分钟', desc: '请解释视觉编码的概念及常用视觉通道。', points: ['视觉编码：将数据映射为视觉属性', '常用通道：位置、长度、角度、面积、颜色、形状', '选择原则：准确性和可分辨性', '避免同时用过多通道导致混乱', '颜色注意色盲友好'], pitfalls: ['用颜色表示数量大小', '过多颜色无意义', '忽略色盲用户'] },
  { type: 'SC', level: 'P', title: '如何设计交互式地图应用', tags: '地图、GIS、Marker、聚合、性能', freq: '中频', time: '8-15 分钟', desc: '请设计一个支持大量 marker 和交互的地图应用。', points: ['地图库选择：Leaflet、Mapbox、高德、百度', 'Marker 聚合：按缩放级别聚合', '视口裁剪：只渲染可见 marker', '数据分层：热力图、点图、区域图按需切换', '事件处理：点击、hover、信息窗', '离线缓存地图瓦片'], pitfalls: ['直接渲染上万 DOM marker', '不聚合不裁剪', '一次性加载全国数据'] },
  { type: 'PE', level: 'A', title: '动画性能优化在可视化中的实践', tags: '动画、可视化、requestAnimationFrame、GPU、性能', freq: '中频', time: '5-8 分钟', desc: '请说明可视化动画的性能优化方法。', points: ['使用 requestAnimationFrame 对齐刷新率', '优先用 transform/opacity', '避免布局属性动画', '减少同时动画元素', '使用 FLIP 技术', '复杂动画用 Canvas/WebGL'], pitfalls: ['用 setInterval 驱动动画', '动画中读取布局属性', '大量 SVG 同时动画'] },
  { type: 'CO', level: 'P', title: '颜色与主题系统在可视化中的设计', tags: '颜色、主题、可视化、色板、暗色模式', freq: '中频', time: '5-8 分钟', desc: '请说明可视化组件库的颜色与主题系统设计。', points: ['定义语义化颜色：主色、辅色、状态色、中性色', '提供分类色板和连续色板', '支持暗色/亮色主题切换', '色盲友好：避免仅依赖红绿', '主题通过 token 或 CSS 变量实现'], pitfalls: ['颜色硬编码', '红绿色盲无法区分', '暗色模式只是反色'] },
  { type: 'SC', level: 'A', title: '如何导出图表为图片/PDF', tags: '图表、导出、Canvas、SVG、图片、PDF', freq: '中频', time: '5-8 分钟', desc: '请设计前端图表导出功能。', points: ['Canvas 用 toDataURL/toBlob', 'SVG 序列化为 data URL', '服务端渲染：Puppeteer 截屏保证一致性', 'PDF：jsPDF 或服务端生成', '处理高清屏：设置缩放比例', '注意跨域图片资源'], pitfalls: ['导出模糊', '跨域图片污染 canvas', '服务端未复用前端样式'] },
  { type: 'CO', level: 'A', title: '可视化中的数据更新策略', tags: '数据更新、图表、增量、动画、性能', freq: '中频', time: '5-8 分钟', desc: '请说明图表数据更新时的优化策略。', points: ['增量更新：只更新变化的数据项', '避免每次都 setOption 全量更新', '使用 diff 算法最小化 DOM/Canvas 重绘', '动画过渡：数据变化时平滑动画', '大数据更新用 Web Worker'], pitfalls: ['每次数据变化都销毁重绘', '不做 diff 全量更新', '高频更新导致闪烁'] },
  { type: 'SD', level: 'R', title: '设计一个可视化搭建平台', tags: '可视化、搭建、低代码、DSL、组件', freq: '低频', time: '15-30 分钟', desc: '请设计一个支持拖拽配置生成看板的可视化搭建平台。', points: ['画布与组件树：拖拽布局、嵌套', '组件库：图表、指标卡、表格、过滤器', '数据绑定：数据源、字段映射、转换', '主题与样式：统一配置', '渲染引擎：根据 DSL 渲染组件', '预览与发布：版本管理、权限'], pitfalls: ['DSL 与组件实现强耦合', '只支持固定图表', '忽略数据源权限'] },
  { type: 'PE', level: 'P', title: 'Canvas 高清屏渲染优化', tags: 'Canvas、DPR、高清屏、模糊、Retina', freq: '中频', time: '3-5 分钟', desc: '请说明 Canvas 在 Retina 屏上模糊的原因和解决方案。', points: ['原因：CSS 像素与物理像素比不同', '设置 canvas width/height 为 DPR 倍', 'CSS 设置为原始尺寸', 'context.scale(dpr, dpr)', '使用 devicePixelRatio 动态计算'], pitfalls: ['只设置 CSS 尺寸', 'DPR 变化未重新计算', '忘记 scale'] },
  { type: 'CO', level: 'B', title: '什么是图表的可访问性', tags: '可视化、a11y、可访问性、ARIA、键盘', freq: '中频', time: '3-5 分钟', desc: '请说明如何让图表对屏幕阅读器和键盘用户友好。', points: ['提供文本摘要和数据表格替代', 'ARIA 标签描述图表类型和关键数据', '键盘可操作：Tab、Enter、方向键', '颜色不是唯一信息通道', '高对比度主题'], pitfalls: ['图表纯视觉无文本', '无键盘支持', '只用颜色区分类别'] },
  { type: 'SC', level: 'A', title: '可视化项目中的数据格式设计', tags: '数据格式、图表、标准、维度、指标', freq: '中频', time: '5-8 分钟', desc: '请设计一种通用的图表数据接口格式。', points: ['区分维度与指标', '标准格式：{ dimensions: [], source: [[...]] }', '支持行/列两种组织方式', '元数据：单位、格式化、颜色映射', '转换层：业务数据 -> 图表数据'], pitfalls: ['每个图表自定义格式', '维度指标混淆', '无元数据导致图表展示错误'] },
  { type: 'PE', level: 'A', title: 'WebGL 在可视化中的使用时机', tags: 'WebGL、GPU、海量数据、Three.js、Deck.gl', freq: '中频', time: '5-8 分钟', desc: '请说明何时应该引入 WebGL 做可视化。', points: ['数据量巨大：百万级点', '复杂 3D 场景', '需要高级渲染效果', '库选择：Three.js、Deck.gl、Filament', '代价：学习成本、兼容性、调试难度'], pitfalls: ['小数据量也上 WebGL', '忽略移动端兼容性', '不做性能基准测试'] },
  { type: 'CO', level: 'P', title: '可视化中的坐标系与投影', tags: '坐标系、投影、地理、极坐标、笛卡尔', freq: '低频', time: '5-8 分钟', desc: '请解释常见坐标系及在可视化中的应用。', points: ['笛卡尔坐标系：常见折线、柱状、散点', '极坐标系：雷达图、饼图、玫瑰图', '地理投影：墨卡托、等积投影', '选择合适的坐标系减少误导', '注意投影带来的面积/距离变形'], pitfalls: ['误导性坐标轴', '地理数据用错误投影', '饼图过多分类'] },
  { type: 'SC', level: 'P', title: '如何设计可视化组件的测试策略', tags: '可视化、测试、截图、回归、交互', freq: '中频', time: '5-8 分钟', desc: '请说明图表组件如何测试。', points: ['单元测试：数据处理、坐标计算', '视觉回归：关键图表截图对比', '交互测试：hover、click、zoom', '数据边界：空数据、极大极小值', '性能测试：大数据渲染耗时'], pitfalls: ['只测数据不测渲染', '视觉回归环境不一致', '不测边界数据'] },
  { type: 'CP', level: 'R', title: '可视化系统的性能与体验平衡', tags: '可视化、性能、体验、精度、交互', freq: '中频', time: '8-15 分钟', desc: '请说明如何在海量数据可视化中平衡性能和交互体验。', points: ['数据聚合降低精度换取性能', '缩放时动态加载细节', '交互响应优先于全精度', '分层展示：概览 + 下钻', '使用 progressive rendering'], pitfalls: ['追求全精度导致卡顿', '过度聚合丢失关键特征', '交互无反馈'] },
  { type: 'CO', level: 'A', title: '什么是图表中的视觉欺骗', tags: '视觉欺骗、坐标轴、比例、数据伦理', freq: '中频', time: '3-5 分钟', desc: '请举例说明常见图表视觉欺骗及如何避免。', points: ['截断 Y 轴夸大差异', '饼图角度和面积误导', '双 Y 轴随意组合', '颜色饱和误导重要性', '避免：从 0 开始、标签清晰、比例一致'], pitfalls: ['为突出效果截断坐标轴', '滥用 3D 效果', '比例尺不统一'] },
  { type: 'PE', level: 'A', title: '3D 可视化性能优化', tags: '3D、WebGL、LOD、纹理、性能', freq: '低频', time: '5-8 分钟', desc: '请说明 WebGL 3D 场景的优化手段。', points: ['LOD：按距离使用不同精度模型', '纹理压缩和 mipmap', '视锥体裁剪', '实例化渲染减少 draw call', '烘焙光照减少实时计算', '使用对象池复用对象'], pitfalls: ['高模 everywhere', '大量 draw call', '实时光照过多'] },
  { type: 'SC', level: 'A', title: '如何设计实时数据可视化', tags: '实时、可视化、WebSocket、更新、动画', freq: '中频', time: '5-8 分钟', desc: '请设计一个展示实时数据的可视化方案。', points: ['数据通道：WebSocket/SSE', '数据缓冲与批量更新', '时间轴/滚动窗口展示最近 N 条', '异常高亮与告警', '暂停/回放历史', '性能优化：节流、采样、Canvas'], pitfalls: ['每帧更新都重绘', '无暂停功能', '数据丢失不补偿'] },
  { type: 'EN', level: 'A', title: '可视化组件库的工程化实践', tags: '可视化、组件库、Monorepo、文档、主题', freq: '中频', time: '5-8 分钟', desc: '请说明可视化组件库的工程化要点。', points: ['Monorepo 管理核心、图表、主题、文档', '统一数据接口和事件规范', '按需引入减少包体积', '文档：Live Demo + API', '主题与样式变量化', '版本管理与兼容性'], pitfalls: ['图表各自为政', '全量打包', '文档缺失'] },
];


const Q35 = [
  { type: 'CO', level: 'B', title: '什么是 Serverless，它解决了什么问题', tags: 'Serverless、FaaS、BaaS、运维、成本', freq: '高频', time: '3-5 分钟', desc: '请解释 Serverless 的核心概念及前端应用场景。', points: ['Serverless 让开发者只关注业务代码，无需管理服务器', 'FaaS：函数即服务，按调用计费', 'BaaS：后端即服务，如数据库、认证', '前端应用：BFF、SSR、边缘渲染、API 聚合', '优势：弹性、按需付费、快速上线'], pitfalls: ['认为 Serverless 没有服务器', '把所有后端逻辑都放函数', '忽略冷启动'] },
  { type: 'CO', level: 'A', title: '边缘计算与 Serverless 的关系', tags: '边缘计算、Serverless、CDN、低延迟、Worker', freq: '高频', time: '5-8 分钟', desc: '请比较边缘计算和传统 Serverless/FaaS 的差异。', points: ['边缘计算运行在 CDN 边缘节点，离用户更近', 'Serverless FaaS 通常运行在中心云', '边缘适合：A/B 测试、个性化渲染、地理路由、API 聚合', 'FaaS 适合：复杂业务逻辑、长任务、数据库操作', '两者可组合：边缘处理请求，FaaS 处理后台'], pitfalls: ['边缘函数做复杂计算', '忽略边缘节点限制', '所有请求都走边缘'] },
  { type: 'SC', level: 'A', title: '前端如何使用边缘函数做 A/B 测试', tags: '边缘函数、A/B、灰度、Vercel、Cloudflare', freq: '中频', time: '5-8 分钟', desc: '请设计一个基于边缘函数的 A/B 测试方案。', points: ['边缘函数根据用户 cookie/id 分桶', '返回不同 HTML 或注入不同配置', '保证分桶一致：同一用户始终同一版本', '实验指标上报到分析平台', '失败回退到默认版本'], pitfalls: ['分桶随机导致用户跳动', '边缘函数无状态难做复杂逻辑', 'A/B 版本资源不隔离'] },
  { type: 'CO', level: 'A', title: '边缘函数的限制与最佳实践', tags: '边缘函数、限制、冷启动、CPU、内存', freq: '中频', time: '5-8 分钟', desc: '请说明边缘函数相比传统服务器的限制。', points: ['执行时间和 CPU 受限', '不支持所有 Node API，环境轻量', '无状态，不能依赖本地文件系统', '网络请求可能受限', '调试和日志相对困难', '适合轻量、快速、低延迟任务'], pitfalls: ['在边缘函数做数据库长连接', '边缘函数执行重计算', '忽略平台限制导致报错'] },
  { type: 'SC', level: 'P', title: '设计一个基于边缘的 SSR 渲染方案', tags: '边缘、SSR、渲染、缓存、Vercel', freq: '中频', time: '8-15 分钟', desc: '请设计在边缘节点执行 SSR 的架构。', points: ['框架支持：Next.js、Nuxt、SvelteKit 边缘运行时', '边缘函数渲染页面并返回 HTML', '缓存：渲染结果按 URL + 参数缓存', '数据获取：边缘直接调 API 或缓存', '降级：渲染失败回退到静态或中心 SSR'], pitfalls: ['在边缘做复杂数据库查询', '缓存策略过短失去意义', '框架不支持边缘运行时'] },
  { type: 'CO', level: 'P', title: 'Serverless 冷启动与温启动', tags: 'Serverless、冷启动、温启动、容器、性能', freq: '中频', time: '5-8 分钟', desc: '请解释冷启动的原因、影响和优化方法。', points: ['冷启动：函数首次调用需初始化运行时', '影响因素：运行时大小、依赖数量、VPC、语言', '优化：减小包体积、复用连接、provisioned concurrency', '边缘函数冷启动通常更低', '对延迟敏感路径预热'], pitfalls: ['完全不考虑冷启动', '函数包体积过大', '每次调用新建数据库连接'] },
  { type: 'SC', level: 'A', title: '前端 BFF 放在 Serverless 的考量', tags: 'BFF、Serverless、FaaS、API 聚合、成本', freq: '中频', time: '5-8 分钟', desc: '请分析把前端 BFF 迁移到 Serverless 的利弊。', points: ['利：弹性扩缩、按需付费、快速部署', '弊：冷启动、调试复杂、供应商锁定', '适合：流量波动大、请求处理轻', '不适合：长连接、重计算、强状态', '设计：函数拆分、共享连接、缓存'], pitfalls: ['把整个单体后端搬上函数', '函数间大量同步调用', '忽略成本模型'] },
  { type: 'CO', level: 'A', title: '什么是 Edge Side Includes', tags: 'ESI、边缘、缓存、动态内容、CDN', freq: '低频', time: '3-5 分钟', desc: '请解释 ESI 及其在边缘动态渲染中的作用。', points: ['ESI 是在 CDN 边缘组装页面的标记语言', '静态部分缓存，动态部分通过 ESI 请求填充', '适合：个性化推荐、用户登录态', '减少全页 SSR 压力', '不是所有 CDN 都支持'], pitfalls: ['在复杂场景滥用 ESI', 'ESI 接口未做缓存', '不支持的平台硬用'] },
  { type: 'SC', level: 'P', title: 'Serverless 下如何管理环境变量和密钥', tags: 'Serverless、密钥、环境变量、KMS、安全', freq: '中频', time: '5-8 分钟', desc: '请说明 Serverless 函数中密钥和环境变量的最佳实践。', points: ['使用平台密钥管理服务或 KMS', '敏感变量不提交代码', '按环境隔离变量', '最小权限原则', '定期轮换密钥', '审计访问日志'], pitfalls: ['密钥硬编码在代码', '所有环境共用密钥', '函数权限过大'] },
  { type: 'SD', level: 'R', title: '设计一个 Serverless 前端部署架构', tags: 'Serverless、部署、静态托管、CDN、边缘', freq: '中频', time: '8-15 分钟', desc: '请为前端应用设计完整的 Serverless 部署架构。', points: ['静态资源托管：对象存储 + CDN', '边缘函数：路由、A/B、鉴权、缓存', 'SSR/ISR：按需渲染或静态生成', 'API：FaaS 聚合后端', '域名、SSL、CI/CD 自动化', '监控：日志、指标、告警'], pitfalls: ['忽略缓存策略', '所有逻辑放边缘函数', '没有回滚策略'] },
  { type: 'CO', level: 'P', title: 'Serverless 的供应商锁定如何应对', tags: 'Serverless、供应商锁定、可移植、标准', freq: '中频', time: '5-8 分钟', desc: '请说明如何降低 Serverless 对云厂商的依赖。', points: ['业务逻辑与平台 SDK 解耦', '使用标准运行时和框架', '封装适配层隐藏平台差异', '避免深度绑定专有 API', '多云部署预案', '基础设施即代码便于迁移'], pitfalls: ['大量使用厂商专属服务', '业务逻辑里调云 SDK', '无迁移成本评估'] },
  { type: 'SC', level: 'A', title: '边缘函数如何做地理位置定向', tags: '边缘、地理、CDN、路由、个性化', freq: '中频', time: '5-8 分钟', desc: '请设计基于用户地理位置的边缘处理方案。', points: ['边缘平台提供请求来源国家/地区信息', '根据地理位置返回不同内容或路由', '结合 CDN 缓存按地区隔离', '合规：按地区限制内容', 'A/B 实验按地区分组'], pitfalls: ['IP 地理位置不准确未处理', '缓存未按地区区分', '合规规则放在前端'] },
  { type: 'CO', level: 'A', title: 'ISR 与 SSG 的区别', tags: 'ISR、SSG、Next.js、静态生成、增量更新', freq: '高频', time: '5-8 分钟', desc: '请解释 ISR 的概念及与 SSG、SSR 的差异。', points: ['SSG：构建时生成所有页面', 'ISR：按需生成并缓存，后台增量更新', 'SSR：每次请求实时渲染', 'ISR 兼顾静态性能和动态内容', '适合内容更新不频繁的站点'], pitfalls: ['ISR 用于强实时数据', '不配置重新验证策略', '首次访问冷渲染慢'] },
  { type: 'PE', level: 'A', title: 'Serverless 成本优化策略', tags: 'Serverless、成本、计费、缓存、优化', freq: '中频', time: '5-8 分钟', desc: '请说明如何控制和优化 Serverless 成本。', points: ['减少冷启动：provisioned concurrency、keep-warm', '缓存：边缘缓存、结果缓存', '减少函数执行时间和内存', '避免函数间循环调用', '监控账单，设置预算告警', '选择合适运行时'], pitfalls: ['完全不监控费用', '每个请求都触发函数', '过度预置资源'] },
  { type: 'SC', level: 'P', title: 'Serverless 函数的测试策略', tags: 'Serverless、测试、本地、模拟、集成', freq: '中频', time: '5-8 分钟', desc: '请说明 Serverless 函数的测试方法。', points: ['单元测试：业务逻辑与 handler 解耦', '本地模拟：serverless-offline、miniflare', '集成测试：部署到测试环境调用', '事件模拟：API Gateway、定时触发器', '监控和日志验证线上行为'], pitfalls: ['只本地测试不上线验证', '业务逻辑与平台强耦合难测', '忽略事件格式差异'] },
  { type: 'CO', level: 'B', title: '什么是 Jamstack', tags: 'Jamstack、静态、CDN、无头、Serverless', freq: '高频', time: '3-5 分钟', desc: '请解释 Jamstack 架构及其优势。', points: ['Jamstack：预渲染页面 + CDN + API', '优势：高性能、高可用、安全、可扩展', '静态生成 + 客户端 API 调用', 'CMS 无头化提供内容', '现代框架：Next.js、Gatsby、Astro'], pitfalls: ['所有页面都静态生成', '忽略动态需求', 'API 过多影响体验'] },
  { type: 'SC', level: 'A', title: '如何在 Serverless 中实现用户鉴权', tags: 'Serverless、鉴权、JWT、Cookie、边缘', freq: '中频', time: '5-8 分钟', desc: '请设计 Serverless 环境下的前端鉴权方案。', points: ['使用 JWT 或 session token', '边缘函数验证 token 并决定是否放行/渲染', '敏感 API 在 FaaS 层再次校验', '刷新 token 逻辑放在安全函数', '登出失效 token'], pitfalls: ['鉴权只在前端', 'Token 长期有效', '边缘和函数鉴权不一致'] },
  { type: 'CO', level: 'P', title: '边缘渲染与中心 SSR 的取舍', tags: '边缘渲染、SSR、延迟、成本、复杂度', freq: '中频', time: '5-8 分钟', desc: '请比较边缘渲染和传统中心 SSR。', points: ['边缘渲染：低延迟、高可用、轻量计算', '中心 SSR：完整能力、易调试、状态重', '选择：内容型站点偏边缘，复杂业务偏中心', '可混合：边缘处理路由和缓存，中心做重逻辑', '注意边缘运行时限制'], pitfalls: ['边缘做所有 SSR', '忽略边缘缓存', '复杂页面强行边缘渲染'] },
  { type: 'SC', level: 'P', title: 'Serverless 下的数据库连接管理', tags: 'Serverless、数据库、连接池、RDS Proxy、无状态', freq: '中频', time: '5-8 分钟', desc: '请说明 Serverless 函数如何高效使用数据库。', points: ['函数无状态，连接不能长期保持', '使用数据库代理：RDS Proxy、PlanetScale', '连接池在函数实例内复用', '优先使用无服务器数据库', '异常时优雅关闭连接'], pitfalls: ['每个请求新建连接', '连接数打满数据库', '事务跨多个函数'] },
  { type: 'CO', level: 'A', title: '什么是 Function as a Service 的触发器', tags: 'FaaS、触发器、API Gateway、定时、事件', freq: '中频', time: '3-5 分钟', desc: '请列举常见的 FaaS 触发器类型。', points: ['HTTP/API Gateway 触发', '定时触发', '对象存储事件', '消息队列触发', '数据库变更触发', 'CDN 日志触发'], pitfalls: ['触发器配置错误导致重复执行', '忽略事件格式', '未做幂等'] },
  { type: 'SC', level: 'A', title: 'Serverless 应用如何做本地开发', tags: 'Serverless、本地开发、模拟、调试、热更新', freq: '中频', time: '5-8 分钟', desc: '请说明 Serverless 项目的本地开发体验优化。', points: ['使用 serverless-offline、miniflare、wrangler', 'Mock 平台服务：数据库、认证', '统一环境变量配置', '本地 HTTPS 和域名模拟', '远程调用真实服务做集成测试'], pitfalls: ['完全依赖线上调试', '本地与线上环境差异大', '缺少 mock'] },
  { type: 'PE', level: 'A', title: '边缘函数的缓存策略', tags: '边缘、缓存、TTL、Vary、失效', freq: '中频', time: '5-8 分钟', desc: '请说明边缘函数如何设计缓存。', points: ['按 URL + header/cookie 生成缓存 key', '设置合适的 Cache-Control 和 TTL', 'Vary 头控制缓存变体', '主动清除或版本化缓存', '缓存动态内容的渲染结果'], pitfalls: ['缓存用户私有数据', 'TTL 过长导致更新延迟', 'Vary 过多降低命中率'] },
  { type: 'CO', level: 'P', title: '什么是分布式跟踪在 Serverless 中的挑战', tags: 'Serverless、分布式跟踪、Trace、无状态、冷启动', freq: '低频', time: '5-8 分钟', desc: '请说明在 Serverless 环境中实现 trace 的挑战。', points: ['函数无状态，trace 上下文需在调用间传递', '冷启动影响 trace 初始化', '平台服务之间 trace 需兼容', '异步触发链路长', '采样和成本控制'], pitfalls: ['忽略函数间 trace 传递', '全量采样成本爆炸', '不关联前端 trace'] },
  { type: 'SC', level: 'R', title: '设计一个 Serverless 实时数据处理前端展示', tags: 'Serverless、实时、WebSocket、FaaS、数据流', freq: '低频', time: '8-15 分钟', desc: '请设计一个基于 Serverless 的实时数据展示系统。', points: ['数据源 -> FaaS 处理 -> 消息队列/WebSocket -> 前端', '使用 Serverless WebSocket API 管理连接', '函数处理数据转换和过滤', '前端订阅并展示', '降级：长轮询或 SSE'], pitfalls: ['用 FaaS 维持大量长连接', '不处理函数超时', '实时性要求过高忽略成本'] },
  { type: 'CO', level: 'A', title: 'Serverless 下的日志与可观测性', tags: 'Serverless、日志、监控、可观测、冷启动', freq: '中频', time: '5-8 分钟', desc: '请说明 Serverless 应用的日志和监控方案。', points: ['平台原生日志服务或转发到统一日志平台', '结构化日志，包含 requestId', '指标：调用次数、错误率、冷启动、耗时', '分布式 trace 串联函数调用', '告警：错误率、延迟、成本'], pitfalls: ['无结构化日志', '不监控冷启动', '日志保留过短'] },
  { type: 'SC', level: 'A', title: 'Serverless 下的 CI/CD 流程', tags: 'Serverless、CI/CD、部署、回滚、基础设施', freq: '中频', time: '5-8 分钟', desc: '请设计 Serverless 项目的持续交付流程。', points: ['基础设施即代码定义函数、触发器、权限', '多环境：dev/test/prod', '自动化测试后部署', '版本别名和流量切换', '回滚：切换别名到旧版本', '预览环境：分支部署'], pitfalls: ['手动修改云控制台', '无环境隔离', '回滚复杂'] },
  { type: 'CO', level: 'P', title: '什么是 OCI 容器与 Serverless 容器', tags: 'Serverless、容器、OCI、镜像、弹性', freq: '低频', time: '5-8 分钟', desc: '请比较函数计算与 Serverless 容器。', points: ['函数计算：事件驱动、粒度细、受限运行时', 'Serverless 容器：可运行任意容器、适合既有应用', '代表：AWS Lambda vs Fargate / Google Cloud Run', '选择：新应用用函数，迁移应用用容器', '两者计费模型不同'], pitfalls: ['所有应用都用函数', '忽略容器启动时间', '成本未对比'] },
];


const Q36 = [
  { type: 'CO', level: 'B', title: '前端数据工程要解决什么问题', tags: '数据工程、ETL、数据质量、可视化、前端', freq: '中频', time: '3-5 分钟', desc: '请说明前端视角下数据工程涉及的主要问题。', points: ['数据采集：埋点、日志、用户行为', '数据清洗与转换：格式化、补全、去重', '数据存储：本地缓存、IndexedDB、服务端仓库', '数据传输：批量、压缩、安全', '数据消费：图表、报表、分析', '数据质量：完整性、准确性、时效性'], pitfalls: ['只关注展示不管数据质量', '采集所有数据无目的', '数据口径不一致'] },
  { type: 'CO', level: 'A', title: 'ETL 与 ELT 的区别', tags: 'ETL、ELT、数据仓库、转换、加载', freq: '中频', time: '5-8 分钟', desc: '请比较 ETL 和 ELT 的适用场景。', points: ['ETL：先抽取转换再加载，适合结构化、严格治理', 'ELT：先加载到仓库再转换，灵活，适合大数据、云仓', '前端应用：轻量 ETL 可在浏览器或 BFF 完成', 'ELT 依赖目标端计算能力', '选择：数据量、复杂度、合规要求'], pitfalls: ['前端做重型 ETL', '混淆两种模式', '忽略数据治理'] },
  { type: 'SC', level: 'A', title: '如何设计前端埋点数据模型', tags: '埋点、数据模型、事件、属性、规范', freq: '高频', time: '5-8 分钟', desc: '请设计一个标准化的前端埋点事件模型。', points: ['事件名：模块_页面_动作，如 click_home_banner', '公共属性：用户、设备、时间、版本、页面路径', '事件属性：与具体动作相关的字段', '用户属性：登录态、会员等级', '预置事件 vs 自定义事件', '版本管理：schema 变更兼容'], pitfalls: ['事件名随意无规范', '缺少公共属性', '属性类型不统一'] },
  { type: 'CO', level: 'A', title: '什么是数据血缘，前端如何应用', tags: '数据血缘、溯源、影响分析、ETL、质量', freq: '中频', time: '5-8 分钟', desc: '请解释数据血缘及其在前端数据工程中的价值。', points: ['数据血缘描述数据从产生到消费的链路', '价值：问题定位、影响分析、合规审计', '前端应用：埋点 -> 清洗 -> 指标 -> 报表', '记录字段来源和转换规则', '变更时评估影响范围'], pitfalls: ['数据链路无文档', '口径变更不知影响面', '血缘只在数据仓库维护'] },
  { type: 'SC', level: 'P', title: '前端如何做数据清洗与校验', tags: '数据清洗、校验、Schema、类型、脏数据', freq: '中频', time: '5-8 分钟', desc: '请说明前端在数据采集和消费时的清洗校验策略。', points: ['Schema 校验：使用 zod/yup/joi 定义数据形状', '类型转换：字符串数字、日期解析', '缺失值处理：默认值、过滤、标记', '异常值检测：范围、枚举、重复', '清洗日志：记录丢弃和修正'], pitfalls: ['完全信任后端数据', '清洗逻辑散落', '异常数据静默忽略'] },
  { type: 'CO', level: 'P', title: '数据湖、数据仓库、数据库的区别', tags: '数据湖、数据仓库、数据库、结构化、非结构化', freq: '中频', time: '5-8 分钟', desc: '请比较三种数据存储方式。', points: ['数据库：面向事务、结构化、行存储', '数据仓库：面向分析、主题化、历史数据', '数据湖：存储原始结构化和非结构化数据', '前端直接接触的通常是数仓聚合后的结果', '现代架构：湖仓一体'], pitfalls: ['把数据库当数仓用', '数据湖变成数据沼泽', '前端直连数据湖'] },
  { type: 'SC', level: 'A', title: '如何设计前端实时数据看板', tags: '数据看板、实时、ETL、缓存、可视化', freq: '高频', time: '8-15 分钟', desc: '请设计一个业务数据实时看板的前端数据流程。', points: ['数据源：业务系统、埋点、日志', '采集：埋点 SDK、API 拉取、消息订阅', '处理：实时聚合（Flink）、分钟级预计算', '存储：时序数据库或缓存', '前端：WebSocket/SSE 消费，可视化展示', '缓存与降级：近实时数据兜底'], pitfalls: ['所有数据实时计算', '前端直接聚合大数据', '不处理数据延迟'] },
  { type: 'CO', level: 'A', title: '什么是数据治理，前端如何参与', tags: '数据治理、口径、质量、安全、合规', freq: '中频', time: '5-8 分钟', desc: '请说明数据治理的核心内容，前端应承担哪些责任。', points: ['数据治理：质量、安全、口径、生命周期、合规', '前端责任：埋点规范、数据安全、口径对齐', '避免前端随意定义业务指标', '参与指标和事件模型评审', '敏感数据脱敏和权限控制'], pitfalls: ['认为数据治理只是数据团队的事', '前端指标口径与 BI 不一致', '埋点随意导致数据不可用'] },
  { type: 'SC', level: 'P', title: '前端如何处理大数据表格', tags: '大数据、表格、分页、虚拟化、排序、筛选', freq: '中频', time: '5-8 分钟', desc: '请设计一个展示百万级数据的表格方案。', points: ['后端分页/游标，避免前端全量加载', '前端虚拟滚动', '排序筛选优先由后端处理', '聚合统计：后端预计算', '导出异步生成文件', '大数据下前端只做展示'], pitfalls: ['前端加载全部数据', '前端做全量排序', '一次性导出大数据'] },
  { type: 'CO', level: 'P', title: '什么是指标口径与维度', tags: '指标、口径、维度、OLAP、数据分析', freq: '中频', time: '5-8 分钟', desc: '请解释数据分析中的指标、口径、维度。', points: ['指标：衡量业务的数值，如 DAU、GMV', '口径：指标的计算规则，如活跃定义、去重方式', '维度：观察角度，如时间、地区、渠道', '口径不一致导致数据打架', '前端展示需明确口径说明'], pitfalls: ['不同页面同一指标口径不同', '只看数值不看口径', '维度过多导致图表混乱'] },
  { type: 'SC', level: 'A', title: '如何设计埋点数据的质量校验', tags: '埋点、质量、校验、监控、事件', freq: '中频', time: '5-8 分钟', desc: '请说明如何保证前端埋点数据的完整和准确。', points: ['Schema 约束：事件名、属性类型、必填项', '自动化测试：验证事件触发时机', '线上监控：事件量突降/突增告警', '采样抽查与人工校验', '埋点版本管理与灰度'], pitfalls: ['埋点代码上线后不验证', '事件名或属性随意改', '缺失关键属性无告警'] },
  { type: 'CO', level: 'A', title: '数据管道中的流处理与批处理', tags: '流处理、批处理、实时、离线、Flink', freq: '中频', time: '5-8 分钟', desc: '请比较流处理和批处理的特点。', points: ['批处理：按批次处理历史数据，吞吐高、延迟高', '流处理：实时处理每条数据，延迟低', '前端看板通常基于流处理或近实时预计算', '批处理适合报表、T+1 分析', 'Lambda/Kappa 架构'], pitfalls: ['所有场景都流处理', '前端直接消费流数据', '忽略数据一致性'] },
  { type: 'SC', level: 'P', title: '前端如何做数据导出与下载', tags: '数据导出、CSV、Excel、异步、大文件', freq: '中频', time: '5-8 分钟', desc: '请设计一个大数据量导出功能。', points: ['小数据：前端直接生成 CSV/Excel 下载', '大数据：服务端异步生成，前端轮询或 SSE 通知', '流式下载：分块返回，前端展示进度', '数据权限校验', '文件格式：CSV、Excel、Parquet'], pitfalls: ['前端导出百万行数据', '无权限校验', '大文件阻塞浏览器'] },
  { type: 'CO', level: 'P', title: '什么是数据质量六性', tags: '数据质量、完整性、准确性、一致性、及时性', freq: '低频', time: '5-8 分钟', desc: '请说明数据质量的六个维度。', points: ['完整性：数据是否缺失', '准确性：数据是否正确', '一致性：不同系统口径是否一致', '及时性：数据是否按时产出', '唯一性：是否重复', '有效性：格式和范围是否合规'], pitfalls: ['只看数据量', '忽略口径一致性', '不及时发现数据问题'] },
  { type: 'SC', level: 'A', title: '如何设计前端数据采集 SDK', tags: '采集 SDK、埋点、队列、上报、采样', freq: '中频', time: '8-15 分钟', desc: '请设计一个前端数据采集 SDK。', points: ['事件定义与注册机制', '队列：本地缓存，批量上报', '上报策略：实时/定时/页面卸载', '采样与去重', '错误处理与重试', '隐私合规：敏感字段过滤'], pitfalls: ['所有事件实时上报', '队列无上限', '不上报公共属性'] },
  { type: 'CO', level: 'A', title: '数据仓库的分层模型', tags: '数据仓库、ODS、DWD、DWS、ADS', freq: '中频', time: '5-8 分钟', desc: '请解释数据仓库常见的 ODS、DWD、DWS、ADS 分层。', points: ['ODS：原始数据层', 'DWD：明细数据层，清洗后', 'DWS：汇总数据层，按主题聚合', 'ADS：应用数据层，面向前端/BI', '分层好处：复用、治理、口径统一'], pitfalls: ['前端直接用 ODS 数据', '分层混乱', 'ADS 口径不一致'] },
  { type: 'SC', level: 'P', title: '前端如何支持多维分析（OLAP）', tags: 'OLAP、多维分析、透视表、钻取、聚合', freq: '中频', time: '5-8 分钟', desc: '请设计前端多维分析报表的交互与数据方案。', points: ['维度选择器：时间、地区、品类', '指标选择器：GMV、订单量', '透视表或交叉表展示', '下钻和上卷交互', '后端预计算聚合结果', '前端缓存查询条件'], pitfalls: ['前端聚合大数据', '每次交互全量查询', '维度过多导致性能差'] },
  { type: 'CO', level: 'P', title: '什么是数据产品化', tags: '数据产品、自助分析、BI、指标、平台', freq: '中频', time: '5-8 分钟', desc: '请解释数据产品化的概念及前端在其中的角色。', points: ['数据产品化：让用户能自助使用数据', '形式：BI 平台、数据看板、分析工具', '前端角色：可视化、交互、低代码配置', '指标中心：统一定义和管理指标', '权限与数据安全'], pitfalls: ['把报表当数据产品', '指标口径不统一', '过度技术化忽略用户'] },
  { type: 'SC', level: 'A', title: '如何保障报表数据的实时性', tags: '报表、实时、缓存、刷新、数据流', freq: '中频', time: '5-8 分钟', desc: '请说明业务报表如何平衡实时性和性能。', points: ['区分实时、近实时、离线指标', '实时指标用流计算 + 缓存', '离线指标预计算', '前端设置刷新策略和手动刷新', '数据延迟提示'], pitfalls: ['所有报表都要求秒级实时', '缓存过短导致数据库压力大', '不提示数据延迟'] },
  { type: 'CO', level: 'B', title: '前端常见的数据格式与序列化', tags: 'JSON、CSV、Parquet、Protocol Buffers、序列化', freq: '中频', time: '3-5 分钟', desc: '请比较前端常用数据格式。', points: ['JSON：通用、可读、体积较大', 'CSV：表格数据、轻量', 'Parquet：列式存储，适合大数据，浏览器解析需库', 'Protobuf：二进制、体积小、需 schema', '前端展示多用 JSON，传输大数据可用 Protobuf'], pitfalls: ['所有场景都用 JSON', '大数据用 JSON 传输', '不压缩'] },
  { type: 'SC', level: 'P', title: '如何设计数据权限在前端的体现', tags: '数据权限、报表、行级、列级、角色', freq: '中频', time: '5-8 分钟', desc: '请设计报表系统的数据权限控制。', points: ['行级权限：用户只能看所属区域/部门数据', '列级权限：敏感字段隐藏', '权限由服务端控制，前端仅展示', '前端根据权限动态渲染菜单和字段', '审计日志记录数据访问'], pitfalls: ['前端隐藏字段就以为安全', '权限规则散落在前端', '服务端无权限校验'] },
  { type: 'CO', level: 'A', title: '什么是数据湖仓一体', tags: '湖仓一体、数据湖、数据仓库、分析', freq: '低频', time: '5-8 分钟', desc: '请解释湖仓一体的概念。', points: ['结合数据湖的灵活性和数据仓库的治理能力', '统一存储，支持结构化和非结构化分析', '降低数据孤岛', '支持 AI/ML 和 BI 统一平台', '前端消费层获取统一视图'], pitfalls: ['把概念当产品', '前端直接操作湖仓', '治理跟不上'] },
  { type: 'SC', level: 'R', title: '设计一个前端自助分析平台', tags: '自助分析、BI、拖拽、指标、可视化', freq: '低频', time: '15-30 分钟', desc: '请设计一个让业务人员能拖拽生成报表的平台。', points: ['数据集管理：选择数据源、维度、指标', '拖拽画布：图表、过滤器、布局', '查询生成：将配置转为 SQL/查询请求', '权限：数据行级/列级控制', '分享与调度：导出、定时邮件', '性能：查询缓存与限流'], pitfalls: ['所有查询实时执行', '无权限控制', '过度灵活导致性能问题'] },
  { type: 'CO', level: 'P', title: '数据工程中的隐私与合规', tags: '隐私、合规、GDPR、数据脱敏、保留', freq: '中频', time: '5-8 分钟', desc: '请说明前端数据工程中的隐私合规要求。', points: ['不上传 PII 明文', '用户同意与授权', '数据最小化原则', '保留期限与删除', '可审计与可追溯'], pitfalls: ['埋点采集敏感信息', '无用户授权', '数据保留无限期'] },
  { type: 'PE', level: 'A', title: '前端大数据可视化的性能策略', tags: '大数据、可视化、聚合、采样、性能', freq: '中频', time: '5-8 分钟', desc: '请说明前端展示大数据图表时的性能策略。', points: ['后端预聚合，前端展示汇总', '按缩放级别采样', '前端 Web Worker 处理数据', '使用 Canvas/WebGL', '分页/虚拟化展示明细'], pitfalls: ['前端接收原始明细', '不做聚合', 'SVG 渲染百万点'] },
  { type: 'SC', level: 'A', title: '如何做埋点事件的归因分析', tags: '归因、埋点、漏斗、转化、分析', freq: '中频', time: '5-8 分钟', desc: '请设计前端埋点支持用户行为归因分析。', points: ['事件携带 session_id、user_id、trace_id', '关键路径埋点：曝光、点击、转化', '归因窗口期定义', '支持首次点击、末次点击、线性归因', '与后端订单数据关联'], pitfalls: ['只有点击无曝光', '归因窗口过长', '前后端数据无法关联'] },
  { type: 'CO', level: 'A', title: '什么是数据目录', tags: '数据目录、元数据、发现、治理、资产', freq: '低频', time: '3-5 分钟', desc: '请解释数据目录的作用。', points: ['数据目录是数据资产的统一索引', '记录表、字段、口径、Owner、血缘', '帮助用户发现和理解数据', '支持权限和合规', '前端可消费数据目录做指标说明'], pitfalls: ['数据目录与实际数据脱节', '无人维护', '只给技术人员用'] },
  { type: 'SC', level: 'P', title: '前端数据异常如何自动发现', tags: '数据异常、监控、告警、波动、质量', freq: '中频', time: '5-8 分钟', desc: '请设计前端数据异常检测机制。', points: ['监控核心指标波动', '同比环比阈值告警', '异常检测算法：3-sigma、孤立森林', '事件量突降/突增告警', '归因下钻：按维度拆分定位'], pitfalls: ['阈值过严告警疲劳', '只看总量不看维度', '发现异常不处理'] },
];


const DOMAINS = {
  25: Q25,
  26: Q26,
  27: Q27,
  28: Q28,
  29: Q29,
  30: Q30,
  31: Q31,
  32: Q32,
  33: Q33,
  34: Q34,
  35: Q35,
  36: Q36,
};

// Adjust arrays to exact target counts
Q25.splice(-3);

Q26.push(
  { type: 'CO', level: 'B', title: '微前端的四种基本集成方式', tags: '微前端、集成、iframe、Web Components、MF', freq: '高频', time: '3-5 分钟', desc: '请列举微前端的四种集成方式及其适用场景。', points: ['iframe：隔离强、体验弱，适合第三方页面', 'Web Components：标准组件化，适合共享 UI', 'Module Federation：同构技术栈组件共享', '路由分发：按路径加载子应用，最常见', '选择依据：技术栈、隔离要求、体验要求'], pitfalls: ['所有场景都用 iframe', '忽视路由和状态管理', '技术栈不一致强行用 MF'] },
  { type: 'SC', level: 'A', title: '微前端中的异常边界如何设计', tags: '微前端、异常边界、降级、基座、子应用', freq: '中频', time: '5-8 分钟', desc: '请设计微前端基座对子应用异常的捕获和降级机制。', points: ['基座包裹子应用加载器，捕获加载和渲染异常', '异常时显示占位 UI 或重试按钮', '记录子应用名、版本、错误堆栈', '不影响其他子应用运行', '严重时通知运维并自动回滚版本'], pitfalls: ['子应用异常导致基座白屏', '不区分加载异常和运行时异常', '缺少错误上下文'] },
  { type: 'CP', level: 'A', title: '微前端落地后的持续治理措施', tags: '微前端、治理、版本、质量、演进', freq: '中频', time: '5-8 分钟', desc: '请说明微前端上线后应建立哪些治理机制。', points: ['子应用注册表和版本管理', '公共依赖升级 RFC 和迁移窗口', '子应用质量评分与下线规则', '跨子应用接口和事件契约维护', '定期复盘集成问题和技术债'], pitfalls: ['上线后无人管理', '子应用版本任意漂移', '契约变更不通知'] }
);

Q27.push(
  { type: 'PE', level: 'A', title: '如何优化前端资源加载优先级', tags: '优先级、preload、预加载、关键资源、性能', freq: '高频', time: '5-8 分钟', desc: '请说明如何通过控制资源优先级提升关键路径性能。', points: ['用 preload 提升 LCP 图片和关键字体优先级', '用 prefetch 预加载下一页资源', '用 preconnect/dns-prefetch 减少连接耗时', 'defer/async 调整脚本优先级', '避免非关键资源阻塞首屏'], pitfalls: ['所有资源都 preload', 'preload 未使用的资源', '忽略 fetchpriority'] }
);

Q29.push(
  { type: 'CO', level: 'A', title: '状态管理中的副作用隔离', tags: '副作用、状态、reducer、异步、可预测', freq: '中频', time: '5-8 分钟', desc: '请说明如何在状态管理中隔离副作用。', points: ['reducer 保持纯函数，不直接发起请求', '副作用集中在 middleware/saga/effect', '组件层使用自定义 hook 封装副作用', '异步取消和竞态处理', '测试时副作用可 mock'], pitfalls: ['reducer 中直接 fetch', '副作用散落在所有组件', '不处理竞态'] },
  { type: 'SC', level: 'A', title: '如何设计前端搜索状态与历史记录', tags: '搜索、历史、状态、URL、撤销', freq: '中频', time: '5-8 分钟', desc: '请设计搜索框的输入状态、历史记录和结果缓存。', points: ['输入状态用受控组件 + 防抖', '历史记录持久化到本地存储', '最近搜索支持删除和快捷填充', '搜索条件同步到 URL', '结果按条件 key 缓存'], pitfalls: ['每次输入都请求', '历史记录无上限', '缓存 key 不包含所有条件'] },
  { type: 'CO', level: 'B', title: '什么是状态提升（Lifting State Up）', tags: '状态提升、React、共享、props、父子', freq: '高频', time: '3-5 分钟', desc: '请解释状态提升的概念和使用场景。', points: ['多个子组件需要共享状态时，把状态放到共同父组件', '子组件通过 props 接收值和回调', '适合层级不深、共享范围小的场景', '过深时用 Context 或状态管理库', '保持单向数据流'], pitfalls: ['状态提升过高导致 prop drilling', '所有状态都提升', '在深层子组件中反向修改'] },
  { type: 'PE', level: 'A', title: '状态更新批处理与性能', tags: '批处理、setState、调度、React、性能', freq: '中频', time: '5-8 分钟', desc: '请说明状态更新批处理如何影响性能。', points: ['React 18 自动批处理多个 setState', '减少渲染次数，提升性能', 'flushSync 可强制同步更新但慎用', '在事件处理、异步代码中行为不同', '合并相关状态更新'], pitfalls: ['手动合并所有 setState', '滥用 flushSync', '不理解自动批处理边界'] }
);

Q30.push(
  { type: 'CO', level: 'B', title: '什么是前端埋点', tags: '埋点、事件、监控、数据采集', freq: '高频', time: '3-5 分钟', desc: '请解释前端埋点的作用和常见类型。', points: ['埋点用于记录用户行为和业务事件', '类型：点击、曝光、页面、自定义事件', '数据用于分析转化、优化产品', '需与业务目标对齐', '保证数据准确和合规'], pitfalls: ['埋点无规范', '埋点过多影响性能', '埋点数据不校验'] },
  { type: 'CO', level: 'A', title: '前端监控采样策略', tags: '采样、监控、RUM、成本、数据', freq: '中频', time: '5-8 分钟', desc: '请说明如何制定前端监控采样策略。', points: ['错误事件高采样或全量', '性能事件按用户/会话采样', '高流量页面降低采样', '保留核心路径高采样', '采样后仍能反映分布'], pitfalls: ['全量采集成本爆炸', '采样过低漏问题', '不同事件采样策略相同'] },
  { type: 'EN', level: 'A', title: '前端监控 SDK 的加载方式', tags: '监控、SDK、异步、性能、加载', freq: '中频', time: '3-5 分钟', desc: '请说明如何加载前端监控 SDK 以减少对业务的影响。', points: ['异步加载，不阻塞首屏', '延迟到关键资源加载后初始化', '使用 CDN 分发', '失败时降级或重试', '配置采样和功能开关'], pitfalls: ['同步加载阻塞', 'SDK 失败导致业务异常', '所有用户都加载完整 SDK'] },
  { type: 'SC', level: 'A', title: '如何利用监控快速定位线上问题', tags: '监控、排查、定位、trace、错误', freq: '高频', time: '5-8 分钟', desc: '请说明通过监控数据定位线上问题的流程。', points: ['从告警中确认影响范围和时间', '查看错误聚合和堆栈', '按版本、页面、浏览器拆分', '通过 trace_id 串联前后端', '关联发布和配置变更', '验证修复后指标回落'], pitfalls: ['不关联发布', '只看总量不拆分', '无 trace 无法下钻'] },
  { type: 'PE', level: 'A', title: '如何监控前端资源加载', tags: '资源、Performance、监控、RUM、失败', freq: '中频', time: '5-8 分钟', desc: '请设计前端资源加载监控方案。', points: ['使用 PerformanceObserver 监听 resource timing', '采集 JS/CSS/图片加载耗时和失败率', '按 CDN、域名、资源类型聚合', '识别慢资源和 404', '结合 RUM 关联用户影响'], pitfalls: ['只监控 API 不监控静态资源', 'PerformanceObserver 不支持时无兜底', '忽略资源缓存命中率'] },
  { type: 'CO', level: 'A', title: '日志级别与使用场景', tags: '日志、级别、DEBUG、INFO、ERROR', freq: '中频', time: '3-5 分钟', desc: '请说明前端日志级别的划分和使用建议。', points: ['DEBUG：开发调试信息', 'INFO：正常运行信息', 'WARN：潜在问题', 'ERROR：可恢复错误', 'FATAL：严重错误需立即处理', '线上一般采集 WARN 及以上'], pitfalls: ['所有日志用 console.log', '线上输出大量 DEBUG', '错误日志无上下文'] },
  { type: 'SC', level: 'A', title: '前端灰度发布监控', tags: '灰度、监控、发布、指标、回滚', freq: '中频', time: '5-8 分钟', desc: '请说明灰度发布时应重点监控哪些指标。', points: ['错误率对比：新版本 vs 旧版本', '核心性能指标：LCP/INP/CLS', '业务转化率', '资源加载失败率', '按灰度组细分', '设置自动回滚阈值'], pitfalls: ['只放量不看指标', '灰度组与全量混统计', '回滚阈值过高'] },
  { type: 'CO', level: 'P', title: '什么是 OpenTelemetry', tags: 'OpenTelemetry、可观测、Trace、Metrics、标准化', freq: '中频', time: '5-8 分钟', desc: '请解释 OpenTelemetry 及其对前端可观测的意义。', points: ['OpenTelemetry 是开源的可观测标准', '统一 Trace、Metrics、Logs 数据采集', '提供跨语言、跨平台的 SDK', '前端可用 OTel Web SDK 采集', '便于与后端链路打通'], pitfalls: ['认为 OTel 只是后端工具', '全量采集不控制成本', '不与现有监控结合'] },
  { type: 'FS', level: 'A', title: '前端错误归因方法', tags: '错误、归因、版本、Source Map、trace', freq: '中频', time: '5-8 分钟', desc: '请说明如何将线上错误归因到具体代码和发布。', points: ['错误上报携带版本和 commit hash', 'Source Map 还原堆栈到源码', '按 fingerprint 聚合', '关联发布时间和变更', '区分第三方脚本错误'], pitfalls: ['无版本信息', 'Source Map 未上传', '忽略第三方脚本影响'] },
  { type: 'EN', level: 'A', title: '监控数据存储与成本控制', tags: '监控、存储、成本、采样、保留', freq: '中频', time: '5-8 分钟', desc: '请说明如何控制前端监控数据的存储成本。', points: ['采样减少数据量', '分级存储：热数据短期，冷数据归档', '聚合指标替代原始日志', '设置数据保留期限', '按业务重要性差异化'], pitfalls: ['永久保存所有原始日志', '采样过低', '不做聚合'] }
);

Q31.push(
  { type: 'CO', level: 'B', title: 'HTTPS 与混合内容安全', tags: 'HTTPS、混合内容、安全、资源', freq: '高频', time: '3-5 分钟', desc: '请解释什么是混合内容及其风险。', points: ['HTTPS 页面加载 HTTP 资源称为混合内容', '被动混合内容：图片/视频，风险较低', '主动混合内容：脚本/样式，可被中间人篡改', '现代浏览器会阻止主动混合内容', '前端应确保所有资源 HTTPS'], pitfalls: ['主站 HTTPS 但资源 HTTP', '忽略 passive mixed content', '不监控资源协议'] },
  { type: 'SE', level: 'A', title: '前端密钥管理', tags: '密钥、安全、环境变量、构建、泄露', freq: '高频', time: '5-8 分钟', desc: '请说明前端如何管理 API 密钥等敏感配置。', points: ['敏感密钥不应写在前端代码', '通过 BFF 代理需要密钥的请求', '使用短有效期 token', '构建时注入非敏感配置', '扫描提交防止密钥泄露'], pitfalls: ['API key 硬编码', '把私钥放 .env 打包', '密钥长期不过期'] },
  { type: 'CO', level: 'A', title: 'XSS 与 CSP 的关系', tags: 'XSS、CSP、内容安全策略、防御', freq: '高频', time: '3-5 分钟', desc: '请说明 CSP 在 XSS 防御中的作用。', points: ['CSP 限制页面可执行脚本的来源', '即使存在 XSS 注入，CSP 可阻止执行', 'default-src、script-src 是关键指令', 'report-only 模式先观察', 'CSP 是纵深防御，不是唯一手段'], pitfalls: ['CSP 配置 unsafe-inline', '认为 CSP 可替代输入校验', '不监控违规报告'] },
  { type: 'SE', level: 'A', title: 'CSP report-only 模式的价值', tags: 'CSP、report-only、安全、部署', freq: '中频', time: '3-5 分钟', desc: '请解释为什么 CSP 要先 report-only。', points: ['避免直接 enforcing 导致功能异常', '收集违规报告，发现内联脚本等', '逐步修复后再启用 enforcing', '降低上线风险', '可监控第三方脚本违规'], pitfalls: ['直接 enforcing', 'report-only 阶段不处理报告', '忽略 report-uri 配置'] },
  { type: 'SC', level: 'A', title: '前端上传文件安全', tags: '文件上传、安全、类型、病毒、沙箱', freq: '中频', time: '5-8 分钟', desc: '请说明前端文件上传的安全注意事项。', points: ['校验扩展名和 MIME 类型白名单', '限制文件大小', '图片做服务端重新编码', '避免直接展示用户上传文件', '敏感文件类型禁止上传'], pitfalls: ['只依赖前端校验', '允许上传可执行文件', '文件名直接用于存储'] },
  { type: 'CO', level: 'P', title: 'HSTS 与前端安全', tags: 'HSTS、HTTPS、安全、预加载', freq: '中频', time: '3-5 分钟', desc: '请说明 HSTS 的作用和配置注意事项。', points: ['HSTS 强制浏览器使用 HTTPS', 'max-age 设置有效期', 'includeSubDomains 保护子域', 'preload 加入浏览器预加载列表', '首次访问仍需 301 跳转'], pitfalls: ['max-age 过短', '子域未 include', '未启用 HTTPS 就加 preload'] }
);

Q32.push(
  { type: 'CO', level: 'B', title: '什么是长连接', tags: '长连接、WebSocket、TCP、HTTP、实时', freq: '高频', time: '3-5 分钟', desc: '请解释长连接的概念及与短连接的区别。', points: ['长连接建立后保持，可多次通信', 'WebSocket 是全双工长连接', 'HTTP keep-alive 也是长连接但半双工', '长连接适合实时、推送场景', '需要心跳保活和重连机制'], pitfalls: ['认为 HTTP 就是长连接', '长连接不管理导致资源泄漏', '忽略网络断开'] },
  { type: 'SC', level: 'A', title: '实时消息队列前端处理', tags: '实时、消息队列、WebSocket、消费、ack', freq: '中频', time: '5-8 分钟', desc: '请设计前端消费实时消息队列的方案。', points: ['维护本地消息队列缓冲', '按顺序处理消息，避免乱序', '消费确认 ack', '失败重试与死信处理', 'UI 展示处理状态'], pitfalls: ['消息处理无队列直接渲染', '不确认导致重复', '乱序不处理'] },
  { type: 'CO', level: 'A', title: 'WebSocket 心跳机制', tags: 'WebSocket、心跳、ping、pong、超时', freq: '高频', time: '3-5 分钟', desc: '请说明 WebSocket 心跳的作用。', points: ['检测连接是否存活', '防止中间件超时断开', '客户端定时发送 ping，服务端回复 pong', '超时未响应触发重连', '后台标签页可降低频率'], pitfalls: ['无心跳导致假死', '心跳过频耗电', '只有 ping 无 pong'] },
  { type: 'PE', level: 'A', title: '实时数据前端采样', tags: '实时、采样、数据、性能、可视化', freq: '中频', time: '5-8 分钟', desc: '请说明实时数据流在前端的采样策略。', points: ['按时间窗口聚合', '按可视区域精度采样', '丢弃超出显示范围的数据', '保留异常点', '在缩放时下钻加载细节'], pitfalls: ['所有数据点都渲染', '采样丢失关键波动', '不区分采样层级'] },
  { type: 'SC', level: 'A', title: '实时白板冲突处理', tags: '白板、实时、冲突、CRDT、OT', freq: '中频', time: '5-8 分钟', desc: '请说明多人协作白板如何合并冲突操作。', points: ['使用 CRDT 或 OT 算法', '本地先执行再同步', '操作带唯一 ID 和时间戳', '冲突时按业务规则合并', '提供用户感知和撤销'], pitfalls: ['直接用 LWW', '无操作 ID', '离线操作丢失'] },
  { type: 'CO', level: 'A', title: 'SSE 与自动重连', tags: 'SSE、自动重连、EventSource、断线', freq: '中频', time: '3-5 分钟', desc: '请说明 SSE 的自动重连机制和如何控制。', points: ['EventSource 自动在断线后重连', '服务端通过 id 字段标记事件', '客户端发送 Last-Event-ID 恢复', '可自定义重连时间 retry', '适合服务器单向推送'], pitfalls: ['不处理 id 导致消息重复', '重连风暴', '需要双向通信却用 SSE'] }
);

Q33.push(
  { type: 'CO', level: 'B', title: 'Locale 与 Language Tag 的区别', tags: 'Locale、Language Tag、i18n、地区、语言', freq: '高频', time: '3-5 分钟', desc: '请解释 locale 和 language tag 的含义。', points: ['Language Tag 如 zh-CN、en-US，标识语言+地区', 'Locale 包含语言、地区、格式约定', 'Locale 影响日期、数字、货币格式', '选择时应区分语言与地区', '回退链基于 language tag'], pitfalls: ['只保存语言不保存地区', 'locale 与格式混用', '忽略方言差异'] },
  { type: 'SC', level: 'A', title: '多语言下的日期格式化', tags: '日期、格式化、i18n、Intl、locale', freq: '中频', time: '3-5 分钟', desc: '请说明前端如何按 locale 格式化日期。', points: ['使用 Intl.DateTimeFormat', '根据用户 locale 选择格式', '区分长、短、数字格式', '存储 UTC，显示本地', '考虑日历差异'], pitfalls: ['手写日期格式', '忽略用户 locale', '时区与 locale 混淆'] },
  { type: 'CO', level: 'A', title: '翻译中的上下文问题', tags: '翻译、上下文、一词多义、i18n', freq: '中频', time: '3-5 分钟', desc: '请说明同一词汇在不同上下文中翻译不同的处理。', points: ['给翻译 key 添加上下文描述', '同一词不同含义用不同 key', '提供截图或使用场景', '使用 ICU select 处理性别等', '避免孤立字符串'], pitfalls: ['同一 key 用于多个含义', '不提供上下文', '直译导致歧义'] },
  { type: 'PE', level: 'A', title: '多语言资源分包策略', tags: 'i18n、资源分包、按需加载、性能', freq: '中频', time: '5-8 分钟', desc: '请说明如何按页面拆分包多语言资源。', points: ['每个页面/模块独立语言包', '进入路由时加载对应包', '公共文案放基础包', '预加载默认语言', '按语言分包打包'], pitfalls: ['所有文案一个文件', '不按需加载', '分包过细请求过多'] },
  { type: 'SC', level: 'A', title: 'RTL 测试要点', tags: 'RTL、测试、布局、方向、i18n', freq: '中频', time: '5-8 分钟', desc: '请说明 RTL 语言界面测试的关键点。', points: ['整体布局是否镜像', '图标和箭头方向是否正确', '文本对齐方式', '表单输入框方向', '数字和标点显示'], pitfalls: ['只翻译文本不测试布局', '使用固定 left/right', '忽略图标方向'] },
  { type: 'CO', level: 'A', title: 'ICU Message Format 简介', tags: 'ICU、message format、国际化、复数、插值', freq: '中频', time: '3-5 分钟', desc: '请说明 ICU Message Format 解决了什么问题。', points: ['统一插值、复数、选择、数字日期格式', '支持不同语言复数规则', '便于翻译平台解析', '如 {count, plural, one {# item}}', '被 react-intl、FormatJS 使用'], pitfalls: ['不用 ICU 自己拼字符串', '翻译人员不懂语法', '未做语法校验'] }
);

Q34.push(
  { type: 'CO', level: 'B', title: '可视化图表的基本元素', tags: '图表、坐标轴、图例、刻度、可视化', freq: '高频', time: '3-5 分钟', desc: '请说明构成一个标准图表的主要元素。', points: ['坐标轴：x/y 轴、刻度、标签', '图例：说明数据系列', '标题和副标题', '数据系列与图形标记', '提示框 tooltip', '网格线辅助阅读'], pitfalls: ['缺少坐标轴标签', '图例与数据不对应', '信息过载'] },
  { type: 'SC', level: 'A', title: '图表响应式适配方案', tags: '响应式、图表、ResizeObserver、移动端', freq: '中频', time: '3-5 分钟', desc: '请说明如何让图表在不同尺寸容器中正确显示。', points: ['监听容器尺寸变化', '图表库 resize 方法', '移动端简化图表元素', '调整 legend 和 label 位置', '保持宽高比或重算布局'], pitfalls: ['只监听 window resize', '小屏幕不隐藏冗余元素', 'resize 不防抖'] },
  { type: 'PE', level: 'A', title: 'Canvas 离屏渲染优化', tags: 'Canvas、离屏渲染、性能、缓存、Worker', freq: '中频', time: '5-8 分钟', desc: '请说明 Canvas 离屏渲染的应用场景。', points: ['在 OffscreenCanvas 预渲染静态内容', '主 Canvas 只需合成', '可在 Worker 中执行', '适合复杂背景、频繁重绘', '注意内存占用'], pitfalls: ['所有绘制都离屏', '主线程与工作线程频繁同步', '离屏画布不释放'] },
  { type: 'CO', level: 'A', title: '数据可视化颜色无障碍', tags: '可视化、颜色、色盲、无障碍、对比度', freq: '中频', time: '3-5 分钟', desc: '请说明如何让图表颜色对色盲用户友好。', points: ['不仅用颜色区分，还加形状/纹理/标签', '避免红绿组合', '使用色盲友好调色板', '确保对比度', '提供数据表格替代'], pitfalls: ['只用颜色区分类别', '红绿对比', '忽略深色模式'] },
  { type: 'SC', level: 'A', title: '图表导出图片方案', tags: '图表、导出、图片、Canvas、SVG', freq: '中频', time: '3-5 分钟', desc: '请说明如何将图表导出为图片。', points: ['Canvas 用 toDataURL/toBlob', 'SVG 序列化为 data URL', '处理高清屏 DPR', '跨域资源需转 base64', '服务端 Puppeteer 做复杂导出'], pitfalls: ['导出模糊', '跨域图片污染', '未处理 DPR'] }
);

Q35.push(
  { type: 'CO', level: 'B', title: '什么是 FaaS', tags: 'FaaS、函数计算、Serverless、事件驱动', freq: '高频', time: '3-5 分钟', desc: '请解释 FaaS 的概念和特点。', points: ['FaaS：函数即服务，开发者只写函数', '事件驱动，按需执行', '自动扩缩容', '按调用次数和执行时间计费', '代表：AWS Lambda、Vercel Functions'], pitfalls: ['FaaS 等同于 Serverless', '用 FaaS 跑长任务', '忽略冷启动'] },
  { type: 'SC', level: 'A', title: 'Serverless 下前端部署流程', tags: 'Serverless、部署、CI/CD、静态资源、函数', freq: '中频', time: '5-8 分钟', desc: '请说明前端应用在 Serverless 平台的部署流程。', points: ['构建静态资源和函数', '上传对象存储/CDN', '部署边缘函数/FaaS', '配置域名和路由', '灰度和回滚'], pitfalls: ['函数与静态资源版本不一致', '无环境隔离', '忽略回滚'] },
  { type: 'CO', level: 'A', title: '边缘函数的限制', tags: '边缘函数、限制、运行时、CPU、内存', freq: '中频', time: '3-5 分钟', desc: '请说明边缘函数相比传统函数的限制。', points: ['执行时间短', 'CPU/内存受限', '支持的 API 有限', '无状态', '部分不支持原生 Node 模块', '调试较困难'], pitfalls: ['在边缘做重计算', '依赖 Node 原生模块', '需要持久化状态'] }
);

Q36.push(
  { type: 'CO', level: 'B', title: '什么是数据管道', tags: '数据管道、ETL、数据流、采集、处理', freq: '中频', time: '3-5 分钟', desc: '请解释数据管道的概念和作用。', points: ['数据管道是把数据从源移动到目的地的流程', '包含采集、处理、转换、加载', '前端埋点数据需要管道进入仓库', '可批处理或流处理', '保证数据质量和可追溯'], pitfalls: ['没有数据管道靠手动导出', '管道无监控', '数据口径在管道中丢失'] },
  { type: 'SC', level: 'A', title: '前端埋点数据采集设计', tags: '埋点、采集、SDK、队列、上报', freq: '中频', time: '5-8 分钟', desc: '请设计前端埋点数据的采集和上报流程。', points: ['事件触发后写入本地队列', '批量压缩后上报', '页面卸载前 flush', '失败重试与本地持久化', '采样和隐私脱敏'], pitfalls: ['实时单条上报', '队列无上限', '页面关闭丢失数据'] }
);

function main() {
  const summary = [];
  for (const domain of Object.keys(DOMAINS).map(Number).sort((a, b) => a - b)) {
    const questions = DOMAINS[domain];
    const seqCounters = getNextSeqs(domain);
    const addedByLevel = { B: 0, A: 0, P: 0, R: 0 };
    let markdown = '';
    for (const q of questions) {
      markdown += formatQuestion(q, domain, seqCounters);
      addedByLevel[q.level] = (addedByLevel[q.level] || 0) + 1;
    }
    appendToFile(domain, markdown, addedByLevel);
    summary.push({ domain, count: questions.length, byLevel: addedByLevel });
  }
  console.log(JSON.stringify(summary, null, 2));
}

main();
