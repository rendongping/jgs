const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const byDomainDir = path.join(root, 'interview-bank', 'by-domain');
const outDir = path.join(root, 'interview-bank');

const typeFileMap = {
  '01-concept': 'CO',
  '02-code-analysis': 'CA',
  '03-coding': 'CD',
  '04-scenario': 'SC',
  '05-system-design': 'SD',
  '06-framework-source': 'FS',
  '07-performance': 'PE',
  '08-security': 'SE',
  '09-engineering': 'EN',
  '10-soft-skill': 'SS',
  '11-comprehensive': 'CP',
};

const levelMap = {
  B: '基础题',
  A: '进阶题',
  P: '深入题',
  R: '架构题',
};

const levelNames = ['B', 'A', 'P', 'R'];

function sanitizeTitle(raw) {
  return raw
    .replace(/`/g, '')
    .replace(/\{\{/g, '{\u200B{')
    .replace(/\}\}/g, '}\u200B}')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
}

function parseDomainFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const basename = path.basename(file); // 01-javascript.md
  const domainNum = basename.split('-')[0];
  let domainTitle = '';
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)$/);
    if (m) {
      domainTitle = m[1].replace(/面试题$/, '').trim();
      break;
    }
  }
  const questions = [];
  for (const line of lines) {
    const m = line.match(/^###\s+(FB-\d{2}-[A-Z]{2}-[A-Z]-\d+)\s*[：:]\s*(.*)$/);
    if (m) {
      const id = m[1];
      const titleRaw = m[2].trim();
      const parts = id.split('-');
      const type = parts[2];
      const level = parts[3];
      questions.push({
        id,
        title: sanitizeTitle(titleRaw),
        domainNum,
        domainFile: basename,
        domainTitle,
        type,
        level,
      });
    }
  }
  return { basename, domainNum, domainTitle, questions };
}

function groupByDomain(items) {
  const map = new Map();
  for (const q of items) {
    if (!map.has(q.domainNum)) map.set(q.domainNum, []);
    map.get(q.domainNum).push(q);
  }
  return Array.from(map.values()).sort((a, b) => a[0].domainNum.localeCompare(b[0].domainNum, undefined, { numeric: true }));
}

function renderLinks(grouped, includeDomainHeading = true) {
  const lines = [];
  for (const group of grouped) {
    if (includeDomainHeading) {
      lines.push(`### ${group[0].domainTitle}（${group.length} 道）`);
      lines.push('');
    }
    for (const q of group) {
      lines.push(`- [${q.id} ${q.title}](../by-domain/${q.domainFile}#${q.id})`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

const sectionAnchorMap = {
  '基础题': 'basic',
  '进阶题': 'advanced',
  '深入题': 'proficient',
  '架构题': 'architect',
};

function countByLevel(items) {
  const counts = { B: 0, A: 0, P: 0, R: 0 };
  for (const q of items) counts[q.level]++;
  return counts;
}

function generateByLevel(allQuestions, levelCode, fileName, displayName) {
  // 岗位层级索引不再只过滤目标难度，而是按难度分组展示全量题目，
  // 目标层级作为阅读重点，其他难度作为扩展/回顾参考。
  const total = allQuestions.length;
  const counts = countByLevel(allQuestions);
  const lines = [];
  lines.push(`# ${displayName}`);
  lines.push('');
  lines.push(`> 本文件按岗位层级 **${displayName}** 组织前端面试题索引，并按难度分组。`);
  lines.push(`> 共收录 **${total}** 道题（基础 ${counts.B} / 进阶 ${counts.A} / 深入 ${counts.P} / 架构 ${counts.R}）。`);
  lines.push(`> **${displayName}** 难度为推荐阅读重点，其他难度可作为基础回顾或进阶扩展。`);
  lines.push(`> 每道题都附带完整参考答案与评分维度，点击链接可查看原文。`);
  lines.push('');

  for (const level of levelNames) {
    const sectionName = levelMap[level];
    const items = allQuestions.filter((q) => q.level === level);
    const grouped = groupByDomain(items);
    lines.push(`## ${sectionName}（${items.length} 道）{#${sectionAnchorMap[sectionName]}}`);
    lines.push('');
    lines.push(renderLinks(grouped));
  }
  return lines.join('\n') + '\n';
}

function generateByType(allQuestions, typeCode, fileName, displayName) {
  const filtered = allQuestions.filter((q) => q.type === typeCode);
  const total = filtered.length;
  const counts = countByLevel(filtered);
  const lines = [];
  lines.push(`# ${displayName}`);
  lines.push('');
  lines.push(`> 本文件按题型收录 **${displayName}** 相关前端面试题索引。`);
  lines.push(`> 共收录 **${total}** 道题（基础 ${counts.B} / 进阶 ${counts.A} / 深入 ${counts.P} / 架构 ${counts.R}）。`);
  lines.push(`> 每道题都附带完整参考答案与评分维度，点击链接可查看原文。`);
  lines.push('');

  for (const level of levelNames) {
    const sectionName = levelMap[level];
    const items = filtered.filter((q) => q.level === level);
    const grouped = groupByDomain(items);
    lines.push(`## ${sectionName}（${items.length} 道）{#${sectionAnchorMap[sectionName]}}`);
    lines.push('');
    lines.push(renderLinks(grouped));
  }
  return lines.join('\n') + '\n';
}

function fillConceptFile(allQuestions, filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace each "> 待补充" block under a domain heading with CO questions of that domain
  const lines = content.split(/\r?\n/);
  const out = [];
  let currentDomain = null;
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const dm = line.match(/^###\s+(.+)$/);
    if (dm) {
      currentDomain = dm[1].trim();
    }
    if (line.trim() === '> 待补充' && currentDomain) {
      // find domain by title
      const domain = allQuestions.find((q) => q.domainTitle === currentDomain || q.domainTitle.includes(currentDomain));
      if (domain) {
        const items = allQuestions.filter((q) => q.type === 'CO' && q.domainNum === domain.domainNum);
        if (items.length) {
          out.push('');
          for (const q of items) {
            out.push(`- [${q.id} ${q.title}](../by-domain/${q.domainFile}#${q.id})`);
          }
          out.push('');
        } else {
          out.push(line);
        }
      } else {
        out.push(line);
      }
      i++;
      continue;
    }
    out.push(line);
    i++;
  }
  fs.writeFileSync(filePath, out.join('\n'));
}

function generateMockPaper(filePath, displayName, levelPicker) {
  const selected = levelPicker(allQuestions);
  const total = levelNames.reduce((sum, lvl) => sum + (selected[lvl] || []).length, 0);
  const lines = [];
  lines.push(`# ${displayName}`);
  lines.push('');
  lines.push(`> 本文件是一份 **${displayName}** 模拟试卷，从面试总库中按难度与知识面筛选组成。`);
  lines.push(`> 本卷共包含 **${total}** 道题目。`);
  lines.push('> 建议闭卷作答，参考答案点击题目链接查看。');
  lines.push('');

  for (const level of levelNames) {
    const sectionName = levelMap[level];
    const items = selected[level] || [];
    lines.push(`## ${sectionName}（${items.length} 道）{#${sectionAnchorMap[sectionName]}}`);
    lines.push('');
    if (items.length === 0) {
      lines.push('> 本卷未收录该难度题目。');
      lines.push('');
    } else {
      for (let idx = 0; idx < items.length; idx++) {
        const q = items[idx];
        lines.push(`${idx + 1}. [${q.id} ${q.title}](../by-domain/${q.domainFile}#${q.id})`);
      }
      lines.push('');
    }
  }
  return lines.join('\n') + '\n';
}

function generateFlashcards(filePath, displayName, picker) {
  const items = picker(allQuestions);
  const total = levelNames.reduce((sum, lvl) => sum + (items[lvl] || []).length, 0);
  const lines = [];
  lines.push(`# ${displayName}`);
  lines.push('');
  lines.push(`> 本文件是 **${displayName}** 核心知识快闪卡，每道题对应面试总库中的完整题目。`);
  lines.push(`> 本套快闪卡共 **${total}** 张。`);
  lines.push('> 正面为问题，背面为参考答案链接，可用于快速自测。');
  lines.push('');

  for (const level of levelNames) {
    const sectionName = levelMap[level];
    const group = items[level] || [];
    lines.push(`## ${sectionName}（${group.length} 道）{#${sectionAnchorMap[sectionName]}}`);
    lines.push('');
    if (group.length === 0) {
      lines.push('> 暂无该难度快闪卡。');
      lines.push('');
    } else {
      for (const q of group) {
        lines.push(`- **Q**：${q.title}  `);
        lines.push(`  **A**：见完整参考答案 [${q.id}](../by-domain/${q.domainFile}#${q.id})`);
      }
      lines.push('');
    }
  }
  return lines.join('\n') + '\n';
}

function annotateDomainFile(domain) {
  const filePath = path.join(byDomainDir, domain.basename);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  // First pass: locate difficulty sections and count their questions
  const sections = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(##)\s+(基础题|进阶题|深入题|架构题)(?:（\d+\s*道）)?(?:\{#[^}]*\})?\s*$/);
    if (m) {
      sections.push({ name: m[2], start: i, count: 0 });
    }
  }

  for (let s = 0; s < sections.length; s++) {
    const sec = sections[s];
    const end = s + 1 < sections.length ? sections[s + 1].start : lines.length;
    for (let i = sec.start + 1; i < end; i++) {
      if (lines[i].match(/^###\s+FB-\d{2}-[A-Z]{2}-[A-Z]-\d+/)) {
        sec.count++;
      }
    }
  }

  const total = sections.reduce((sum, sec) => sum + sec.count, 0);
  const levelCounts = countByLevel(domain.questions);

  // Track unique anchors per section name
  const sectionCounters = {};
  const firstAnchor = {};
  function getAnchor(sectionName) {
    const base = sectionAnchorMap[sectionName];
    sectionCounters[sectionName] = (sectionCounters[sectionName] || 0) + 1;
    const anchor = sectionCounters[sectionName] === 1 ? base : `${base}-${sectionCounters[sectionName]}`;
    if (!(sectionName in firstAnchor)) {
      firstAnchor[sectionName] = anchor;
    }
    return anchor;
  }

  let sectionIndex = 0;
  let titleInserted = false;
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Insert/overwrite count line right after the title heading
    if (!titleInserted && line.startsWith('# ')) {
      out.push(line);
      let j = i + 1;
      const preserved = [];
      while (j < lines.length && (lines[j].trim() === '' || lines[j].startsWith('>'))) {
        if (lines[j].startsWith('>')) {
          if (!lines[j].includes('共收录')) {
            preserved.push(lines[j]);
          }
        }
        j++;
      }
      out.push('');
      out.push(`> 本题库共收录 **${total}** 道面试题（基础 ${levelCounts.B} / 进阶 ${levelCounts.A} / 深入 ${levelCounts.P} / 架构 ${levelCounts.R}）。`);
      out.push(...preserved);
      out.push('');
      i = j - 1;
      titleInserted = true;
      continue;
    }

    const sectionMatch = line.match(/^(##)\s+(基础题|进阶题|深入题|架构题)(?:（\d+\s*道）)?(?:\{#[^}]*\})?\s*$/);
    if (sectionMatch && sectionIndex < sections.length) {
      const sec = sections[sectionIndex++];
      const anchor = getAnchor(sec.name);
      out.push(`## ${sec.name}（${sec.count} 道）{#${anchor}}`);
      continue;
    }

    const tocMatch = line.match(/^(\s*-\s*\[)(基础题|进阶题|深入题|架构题)(\]\s*\()#[^)]*(\)\s*)$/);
    if (tocMatch) {
      const sectionName = tocMatch[2];
      const anchor = firstAnchor[sectionName] || sectionAnchorMap[sectionName];
      out.push(`${tocMatch[1]}${sectionName}${tocMatch[3]}#${anchor}${tocMatch[4]}`);
      continue;
    }

    out.push(line);
  }

  fs.writeFileSync(filePath, out.join('\n'));
}

// Main
const domainFiles = fs.readdirSync(byDomainDir).filter((f) => f.endsWith('.md')).sort();
const domains = [];
let allQuestions = [];
for (const f of domainFiles) {
  const parsed = parseDomainFile(path.join(byDomainDir, f));
  domains.push(parsed);
  allQuestions = allQuestions.concat(parsed.questions);
}

// Annotate source domain files with question counts
for (const domain of domains) {
  annotateDomainFile(domain);
}

// Sort questions globally by domain then id
allQuestions.sort((a, b) => {
  const c = a.domainNum.localeCompare(b.domainNum, undefined, { numeric: true });
  if (c !== 0) return c;
  return a.id.localeCompare(b.id);
});

console.log('Total questions parsed:', allQuestions.length);

// by-level
const levelDisplay = {
  junior: 'Junior（初级）',
  senior: 'Senior（高级）',
  expert: 'Expert（专家）',
  architect: 'Architect（架构师）',
};
for (const [key, name] of Object.entries(levelDisplay)) {
  const code = key === 'junior' ? 'B' : key === 'senior' ? 'A' : key === 'expert' ? 'P' : 'R';
  const outPath = path.join(outDir, 'by-level', `${key}.md`);
  fs.writeFileSync(outPath, generateByLevel(allQuestions, code, `${key}.md`, name));
  console.log('Generated', outPath);
}

// by-type
const typeDisplay = {
  '01-concept': '概念题',
  '02-code-analysis': '代码分析题',
  '03-coding': '手写代码题',
  '04-scenario': '场景设计题',
  '05-system-design': '系统设计题',
  '06-framework-source': '框架原理题',
  '07-performance': '性能优化题',
  '08-security': '安全题',
  '09-engineering': '工程化题',
  '10-soft-skill': '软技能题',
  '11-comprehensive': '综合开放题',
};
for (const [fileBase, typeCode] of Object.entries(typeFileMap)) {
  const fileName = `${fileBase}.md`;
  const outPath = path.join(outDir, 'by-type', fileName);
  fs.writeFileSync(outPath, generateByType(allQuestions, typeCode, fileName, typeDisplay[fileBase]));
  console.log('Generated', outPath);
}

// mock papers
const juniorPicker = (qs) => ({
  B: qs.filter((q) => q.level === 'B').slice(0, 6),
  A: qs.filter((q) => q.level === 'A').slice(0, 3),
  P: [],
  R: [],
});
const seniorPicker = (qs) => ({
  B: qs.filter((q) => q.level === 'B').slice(0, 3),
  A: qs.filter((q) => q.level === 'A').slice(0, 4),
  P: qs.filter((q) => q.level === 'P').slice(0, 2),
  R: [],
});
const architectPicker = (qs) => ({
  B: [],
  A: qs.filter((q) => q.level === 'A').slice(0, 2),
  P: qs.filter((q) => q.level === 'P').slice(0, 3),
  R: qs.filter((q) => q.level === 'R').slice(0, 3),
});
fs.writeFileSync(
  path.join(outDir, 'mock-papers', 'junior-frontend-60min.md'),
  generateMockPaper('interview-bank/mock-papers/junior-frontend-60min.md', 'Junior 前端模拟卷（60 分钟）', juniorPicker)
);
fs.writeFileSync(
  path.join(outDir, 'mock-papers', 'senior-frontend-90min.md'),
  generateMockPaper('interview-bank/mock-papers/senior-frontend-90min.md', 'Senior 前端模拟卷（90 分钟）', seniorPicker)
);
fs.writeFileSync(
  path.join(outDir, 'mock-papers', 'architect-system-design-120min.md'),
  generateMockPaper(
    'interview-bank/mock-papers/architect-system-design-120min.md',
    '架构师系统设计与综合卷（120 分钟）',
    architectPicker
  )
);
console.log('Generated mock papers');

// flashcards
const jsPicker = (qs) => {
  const domainQs = qs.filter((q) => q.domainNum === '01');
  return {
    B: domainQs.filter((q) => q.level === 'B').slice(0, 3),
    A: domainQs.filter((q) => q.level === 'A').slice(0, 3),
    P: domainQs.filter((q) => q.level === 'P').slice(0, 2),
    R: domainQs.filter((q) => q.level === 'R').slice(0, 1),
  };
};
const reactPicker = (qs) => {
  const domainQs = qs.filter((q) => q.domainNum === '15');
  return {
    B: domainQs.filter((q) => q.level === 'B').slice(0, 3),
    A: domainQs.filter((q) => q.level === 'A').slice(0, 3),
    P: domainQs.filter((q) => q.level === 'P').slice(0, 2),
    R: domainQs.filter((q) => q.level === 'R').slice(0, 1),
  };
};
const browserPicker = (qs) => {
  const domainQs = qs.filter((q) => q.domainNum === '03');
  return {
    B: domainQs.filter((q) => q.level === 'B').slice(0, 3),
    A: domainQs.filter((q) => q.level === 'A').slice(0, 3),
    P: domainQs.filter((q) => q.level === 'P').slice(0, 2),
    R: domainQs.filter((q) => q.level === 'R').slice(0, 1),
  };
};
const performancePicker = (qs) => {
  const domainQs = qs.filter((q) => q.domainNum === '27');
  return {
    B: domainQs.filter((q) => q.level === 'B').slice(0, 2),
    A: domainQs.filter((q) => q.level === 'A').slice(0, 2),
    P: domainQs.filter((q) => q.level === 'P').slice(0, 2),
    R: domainQs.filter((q) => q.level === 'R').slice(0, 2),
  };
};
fs.writeFileSync(path.join(outDir, 'flashcards', 'js-core.md'), generateFlashcards('interview-bank/flashcards/js-core.md', 'JavaScript 核心', jsPicker));
fs.writeFileSync(path.join(outDir, 'flashcards', 'react-core.md'), generateFlashcards('interview-bank/flashcards/react-core.md', 'React 核心', reactPicker));
fs.writeFileSync(path.join(outDir, 'flashcards', 'browser-core.md'), generateFlashcards('interview-bank/flashcards/browser-core.md', '浏览器核心', browserPicker));
fs.writeFileSync(path.join(outDir, 'flashcards', 'performance-core.md'), generateFlashcards('interview-bank/flashcards/performance-core.md', '性能优化核心', performancePicker));
console.log('Generated flashcards');

console.log('Done');
