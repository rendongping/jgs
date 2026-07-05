const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const byDomainDir = path.join(rootDir, 'interview-bank', 'by-domain');

const dirToDomain = {
  'F01-javascript': { num: '01', dir: 'level-01-foundation/F01-javascript' },
  'F02-typescript': { num: '02', dir: 'level-01-foundation/F02-typescript' },
  'F03-browser': { num: '03', dir: 'level-01-foundation/F03-browser' },
  'F04-network': { num: '04', dir: 'level-01-foundation/F04-network' },
  'F05-security': { num: '05', dir: 'level-01-foundation/F05-security' },
  'F06-html-css': { num: '06', dir: 'level-01-foundation/F06-html-css' },
  'F07-a11y': { num: '07', dir: 'level-01-foundation/F07-a11y' },
  'F08-data-structures-algorithms': { num: '08', dir: 'level-01-foundation/F08-data-structures-algorithms' },
  'F09-design-patterns': { num: '09', dir: 'level-01-foundation/F09-design-patterns' },
  'E01-build-tools': { num: '10', dir: 'level-02-engineering/E01-build-tools' },
  'E02-monorepo': { num: '11', dir: 'level-02-engineering/E02-monorepo' },
  'E03-ci-cd': { num: '12', dir: 'level-02-engineering/E03-ci-cd' },
  'E04-code-quality': { num: '13', dir: 'level-02-engineering/E04-code-quality' },
  'E05-design-system': { num: '14', dir: 'level-02-engineering/E05-design-system' },
  'E06-react': { num: '15', dir: 'level-02-engineering/E06-react' },
  'E07-vue': { num: '16', dir: 'level-02-engineering/E07-vue' },
  'E08-cross-platform': { num: '17', dir: 'level-02-engineering/E08-cross-platform' },
  'E09-ai-engineering': { num: '18', dir: 'level-02-engineering/E09-ai-engineering' },
  'E10-node-bff': { num: '19', dir: 'level-02-engineering/E10-node-bff' },
  'E11-git-workflow': { num: '20', dir: 'level-02-engineering/E11-git-workflow' },
  'E12-developer-experience': { num: '21', dir: 'level-02-engineering/E12-developer-experience' },
  'E13-deployment-sre': { num: '22', dir: 'level-02-engineering/E13-deployment-sre' },
  'E14-package-supply-chain': { num: '23', dir: 'level-02-engineering/E14-package-supply-chain' },
  'A01-system-architecture': { num: '25', dir: 'level-03-architecture/A01-system-architecture' },
  'A02-micro-frontend': { num: '26', dir: 'level-03-architecture/A02-micro-frontend' },
  'A03-performance': { num: '27', dir: 'level-03-architecture/A03-performance' },
  'A04-quality': { num: '28', dir: 'level-03-architecture/A04-quality' },
  'A05-data-state': { num: '29', dir: 'level-03-architecture/A05-data-state' },
  'A06-observability': { num: '30', dir: 'level-03-architecture/A06-observability' },
  'A07-security-architecture': { num: '31', dir: 'level-03-architecture/A07-security-architecture' },
  'A08-real-time': { num: '32', dir: 'level-03-architecture/A08-real-time' },
  'A09-internationalization': { num: '33', dir: 'level-03-architecture/A09-internationalization' },
  'A10-visualization-graphics': { num: '34', dir: 'level-03-architecture/A10-visualization-graphics' },
  'A11-serverless-edge': { num: '35', dir: 'level-03-architecture/A11-serverless-edge' },
  'A12-data-engineering': { num: '36', dir: 'level-03-architecture/A12-data-engineering' },
  'L01-business': { num: '37', dir: 'level-04-leadership/L01-business' },
  'L02-team': { num: '38', dir: 'level-04-leadership/L02-team' },
  'L03-strategy': { num: '39', dir: 'level-04-leadership/L03-strategy' },
  'L04-communication': { num: '40', dir: 'level-04-leadership/L04-communication' },
  'L05-project-management': { num: '41', dir: 'level-04-leadership/L05-project-management' },
  'L06-hiring': { num: '42', dir: 'level-04-leadership/L06-hiring' },
  'L07-tech-branding': { num: '43', dir: 'level-04-leadership/L07-tech-branding' },
  'L08-tech-governance': { num: '44', dir: 'level-04-leadership/L08-tech-governance' },
};

const levelMap = {
  '基础': 'B', '基础题': 'B', '基础概念': 'B',
  '进阶': 'A', '中级': 'A', '进阶题': 'A',
  '高级': 'P', '深入': 'P', '高级题': 'P', '深入题': 'P',
  '架构': 'R', '架构题': 'R', '专家': 'R',
};

const typeKeywords = [
  { codes: ['CA'], re: /分析以下|下面代码|这段代码|会发生什么|输出结果/ },
  { codes: ['CD'], re: /手写|实现一个|封装一个|写一个|用.*实现|代码实现/ },
  { codes: ['SD'], re: /如何设计|设计一个|设计支持|架构.*设计|系统.*设计/ },
  { codes: ['SC'], re: /场景|如果|假设|你遇到|实际项目|线上|生产环境/ },
  { codes: ['PE'], re: /性能|优化|缓存|加载|渲染|耗时|慢/ },
  { codes: ['SE'], re: /安全|漏洞|攻击|XSS|CSRF|CORS|鉴权|加密/ },
  { codes: ['EN'], re: /工程化|构建|部署|CI|CD|Webpack|Vite|Babel|ESLint|Git|Monorepo|Docker|K8s|SRE/ },
  { codes: ['SS'], re: /经历|冲突|沟通|团队|管理|压力|成长|项目|面试|晋升|跨部门/ },
  { codes: ['CP'], re: /区别|对比|比较|versus|vs|异同|选型|选择/ },
];

function inferLevel(sectionName) {
  for (const [k, v] of Object.entries(levelMap)) {
    if (sectionName.includes(k)) return v;
  }
  return 'A';
}

function inferType(title) {
  for (const item of typeKeywords) {
    if (item.re.test(title)) return item.codes[0];
  }
  return 'CO';
}

function getDomainName(filePath) {
  const first = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)[0] || '';
  const m = first.match(/^#\s*(.+?)\s*面试题$/);
  return m ? m[1].trim() : '';
}

function getExistingTags(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const tagCounts = {};
  const matches = text.matchAll(/\*\*标签\*\*[:：]\s*(.+)/g);
  for (const ma of matches) {
    for (const t of ma[1].split('、')) {
      const tt = t.trim();
      if (tt) tagCounts[tt] = (tagCounts[tt] || 0) + 1;
    }
  }
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(x => x[0]);
}

function getMaxSeq(filePath, prefix) {
  const text = fs.readFileSync(filePath, 'utf8');
  const re = new RegExp(`^### ${prefix}-(\\d{3})`, 'gm');
  let max = 0;
  for (const m of text.matchAll(re)) {
    max = Math.max(max, parseInt(m[1], 10));
  }
  return max;
}

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '（代码示例）')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();
}

function genOral(refText) {
  const plain = stripMarkdown(refText);
  if (!plain) return '可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。';
  const parts = plain.split(/([。！？])/).filter(Boolean);
  const sents = [];
  for (let i = 0; i < parts.length; i += 2) {
    const s = parts[i] + (parts[i + 1] || '');
    if (s.trim()) sents.push(s.trim());
  }
  const picked = [];
  for (const s of sents) {
    if (picked.length >= 4) break;
    if (s.length >= 10) picked.push(s);
  }
  let text = picked.join(' ');
  if (text.length > 350) text = text.slice(0, 350) + '……';
  if (text.length < 30) text = plain.slice(0, 300);
  return text;
}

function parseQuestions(sourceText) {
  const lines = sourceText.split(/\r?\n/);
  let currentLevel = 'A';
  const rawQuestions = [];
  for (let i = 0; i < lines.length; i++) {
    const sectionMatch = lines[i].match(/^##\s*[一二三四五六七八九十]+、(.+)$/);
    if (sectionMatch) {
      currentLevel = inferLevel(sectionMatch[1]);
      continue;
    }
    const qm = lines[i].match(/^###\s*\d+\.\s*(.+)$/);
    if (qm) {
      rawQuestions.push({ title: qm[1].trim(), level: currentLevel, startLine: i });
    }
  }

  const questions = [];
  for (let idx = 0; idx < rawQuestions.length; idx++) {
    const q = rawQuestions[idx];
    const start = q.startLine;
    const end = idx + 1 < rawQuestions.length ? rawQuestions[idx + 1].startLine : lines.length;
    const block = lines.slice(start, end).join('\n');
    const parts = block.split(/\n?\*\*参考答案\*\*[:：]\n?/);
    const title = parts[0].replace(/^###\s*\d+\.\s*/, '').trim();
    const rest = parts.slice(1).join('\n**参考答案**：');
    const scoringSplit = rest.split(/\n?\*\*评分维度\*\*[:：]\n?/);
    const ref = scoringSplit[0].trim();
    const scoring = scoringSplit.slice(1).join('\n**评分维度**：').trim();
    questions.push({ title, level: q.level, ref, scoring });
  }
  return questions;
}

let totalAdded = 0;

for (const [base, info] of Object.entries(dirToDomain)) {
  const sourceFile = path.join(rootDir, info.dir, '03-面试题.md');
  if (!fs.existsSync(sourceFile)) continue;
  const sourceText = fs.readFileSync(sourceFile, 'utf8');
  const rawQuestions = parseQuestions(sourceText);
  if (rawQuestions.length === 0) continue;

  const domainFile = path.join(byDomainDir, `${info.num}-${base.replace(/^[A-Z]\d+-/, '')}.md`);
  if (!fs.existsSync(domainFile)) continue;

  const domainName = getDomainName(domainFile);
  const tags = getExistingTags(domainFile);
  const tagStr = tags.slice(0, 5).join('、') || domainName;

  const counters = {};
  const blocks = [];
  for (const q of rawQuestions) {
    const type = inferType(q.title);
    const key = `${type}-${q.level}`;
    counters[key] = (counters[key] || 0) + 1;
    const seq = getMaxSeq(domainFile, `FB-${info.num}-${type}-${q.level}`) + counters[key];
    const id = `FB-${info.num}-${type}-${q.level}-${String(seq).padStart(3, '0')}`;
    const levelName = { B: '基础', A: '进阶', P: '深入', R: '架构' }[q.level];
    const levelEmoji = { B: '🟢', A: '🟡', P: '🟣', R: '🔴' }[q.level];
    const roleMap = { B: '初级 / 高级', A: '高级 / 资深', P: '资深 / 架构', R: '架构 / 专家' };
    const freq = '中频';
    const duration = { B: '3-5', A: '5-8', P: '7-10', R: '10-15' }[q.level];

    if (!q.ref || q.ref.replace(/\s/g, '').length < 30) continue;
    const refBlock = q.ref;
    const scoringBlock = q.scoring
      ? `**评分维度**：\n${q.scoring}`
      : `**评分维度**：\n- 核心概念准确性（40%）\n- 问题分析深度（35%）\n- 实践案例与可落地性（25%）`;
    const oral = genOral(refBlock);

    const block = `### ${id}：${q.title}\n\n**题型**：${type === 'CO' ? '概念题' : type === 'CA' ? '代码分析题' : type === 'CD' ? '手写代码题' : type === 'SC' ? '场景设计题' : type === 'SD' ? '系统设计题' : type === 'FS' ? '框架原理题' : type === 'PE' ? '性能优化题' : type === 'SE' ? '安全题' : type === 'EN' ? '工程化题' : type === 'SS' ? '软技能题' : '综合开放题'}\n**难度**：${levelEmoji} ${levelName}\n**岗位层级**：${roleMap[q.level]}\n**面试知识域**：${info.num} ${domainName}\n**标签**：${tagStr}\n**出现频率**：${freq}\n**预计回答时长**：${duration} 分钟\n\n**题目描述**：\n${q.title.replace(/[?？]$/, '')}。\n\n**参考答案**：\n\n${refBlock}\n\n${scoringBlock}\n\n**常见错误**：\n- 只停留在概念层面，无法结合场景说明。\n- 忽略边界情况和异常处理。\n- 对关键指标和取舍缺乏量化意识。\n\n**口头回答版**：\n> ${oral}\n`;
    blocks.push(block);
    totalAdded++;
  }

  if (blocks.length === 0) continue;

  let fileText = fs.readFileSync(domainFile, 'utf8');
  fileText = fileText.replace(/\n*$/, '\n');
  if (!fileText.endsWith('\n')) fileText += '\n';
  fs.writeFileSync(domainFile, fileText + blocks.join('\n---\n\n') + '\n', 'utf8');
  console.log(`${path.basename(domainFile)}: added ${blocks.length} questions`);
}

console.log(`\nTotal added: ${totalAdded}`);
