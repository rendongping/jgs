const fs = require('fs');
const path = require('path');

const SCRIPT = path.join(__dirname, 'add_interview_questions.py');
const BASE = path.join(__dirname, '..', 'interview-bank', 'by-domain');

const DOMAIN_MAP = {
  '37': '37-business.md',
  '38': '38-team.md',
  '39': '39-strategy.md',
  '40': '40-communication.md',
  '41': '41-project-management.md',
  '42': '42-hiring.md',
  '43': '43-tech-branding.md',
  '44': '44-tech-governance.md',
  '45': '45-mini-program.md',
  '46': '46-harmonyos.md',
  '47': '47-flutter.md',
  '48': '48-electron.md',
  '49': '49-webassembly.md',
  '50': '50-webgpu-graphics.md',
  '51': '51-multimedia.md',
  '52': '52-low-code.md',
  '53': '53-computer-science.md',
  '54': '54-behavioral.md',
  '55': '55-resume-interview.md',
  '56': '56-industry.md',
};

const TYPE_LABELS = {
  CO: '概念题', CA: '代码分析题', CD: '手写代码题', SC: '场景设计题',
  SD: '系统设计题', FS: '框架原理题', PE: '性能优化题', SE: '安全题',
  EN: '工程化题', SS: '软技能题', CP: '综合开放题'
};

const LEVEL_LABELS = { B: '🟢 基础', A: '🟡 进阶', P: '🔴 深入', R: '🔵 架构' };
const ROLE_LABELS = { B: '初级', A: '高级', P: '专家', R: '架构师' };

function parseField(block, name) {
  // Match name="""...""" first (multiline)
  const reTriple = new RegExp(`${name}=[""""""]([\\s\\S]*?)[""""""]`, 'g');
  const triples = [...block.matchAll(reTriple)];
  if (triples.length) return triples[triples.length - 1][1].trim();
  // Match name="..." single-line
  const reDouble = new RegExp(`${name}="([^"\\n]*)"`, 'g');
  const doubles = [...block.matchAll(reDouble)];
  if (doubles.length) return doubles[doubles.length - 1][1].trim();
  // Match name='...' single-line
  const reSingle = new RegExp(`${name}='([^'\\n]*)'`, 'g');
  const singles = [...block.matchAll(reSingle)];
  if (singles.length) return singles[singles.length - 1][1].trim();
  return '';
}

function escapeCode(text) {
  return text
    .replace(/`\{\{`/g, '`<span v-pre>{{</span>`')
    .replace(/`\{\{([^`]*)\}\}`/g, '`<span v-pre>{{$1}}</span>`')
    .replace(/`<T>`/g, '`<span v-pre><T></span>`')
    .replace(/`<T([^`]*)>`/g, '`<span v-pre><T$1></span>`');
}

function renderQuestion(qid, meta) {
  const qtype = meta.qtype || TYPE_LABELS[meta.type_code] || '概念题';
  const levelText = LEVEL_LABELS[meta.level] || '🟡 进阶';
  const roleText = meta.role || ROLE_LABELS[meta.level] || '高级 / 专家';
  const lines = [
    `### ${qid}：${meta.title}`,
    '',
    `**题型**：${qtype}`,
    `**难度**：${levelText}`,
    `**岗位层级**：${roleText}`,
    `**面试知识域**：${meta.domain_name}`,
    `**标签**：${meta.tags}`,
    `**出现频率**：${meta.freq || '高频'}`,
    `**预计回答时长**：${meta.duration || '5-8 分钟'}`,
    '',
    '**题目描述**：',
    meta.desc,
    '',
    '**参考答案**：',
    escapeCode(meta.answer),
    '',
  ];
  if (meta.scoring) {
    lines.push('**评分维度**：', meta.scoring, '');
  }
  if (meta.mistakes) {
    lines.push('**常见错误**：', meta.mistakes, '');
  }
  if (meta.follow) {
    lines.push('**延伸追问**：', meta.follow, '');
  }
  if (meta.related) {
    lines.push('**相关题目**：', meta.related, '');
  }
  if (meta.resources) {
    lines.push('**参考资源**：', meta.resources, '');
  }
  lines.push('**口头回答版**：', `> ${meta.oral}`, '', '---', '');
  return lines.join('\n');
}

function parseQuestions() {
  const src = fs.readFileSync(SCRIPT, 'utf8');
  const lines = src.split('\n');
  const questions = [];
  let currentDomain = null;
  let buffer = [];
  let inCall = false;
  let callName = null;

  function flush() {
    if (!inCall || !currentDomain || !callName) return;
    const block = buffer.join('\n');
    const title = parseField(block, 'title');
    if (!title) return;
    const type_code = parseField(block, 'type_code') || 'CO';
    const level = parseField(block, 'level') || 'A';
    const meta = {
      title,
      type_code,
      level,
      qtype: parseField(block, 'qtype'),
      domain_name: parseField(block, 'domain_name'),
      tags: parseField(block, 'tags'),
      freq: parseField(block, 'freq'),
      duration: parseField(block, 'duration'),
      role: parseField(block, 'role'),
      desc: parseField(block, 'desc'),
      answer: parseField(block, 'answer'),
      scoring: parseField(block, 'scoring'),
      mistakes: parseField(block, 'mistakes'),
      follow: parseField(block, 'follow'),
      related: parseField(block, 'related'),
      resources: parseField(block, 'resources'),
      oral: parseField(block, 'oral'),
    };
    questions.push({ domain: currentDomain, meta });
  }

  for (const line of lines) {
    const header = line.match(/^#\s+(\d{2})\s+/);
    if (header) {
      const num = header[1];
      if (DOMAIN_MAP[num]) currentDomain = num;
    }
    const start = line.match(/^\s*(make_meta|quick_question)\(/);
    if (start) {
      flush();
      inCall = true;
      callName = start[1];
      buffer = [line];
      continue;
    }
    if (inCall) {
      buffer.push(line);
      if (/^    \),$/.test(line)) {
        flush();
        inCall = false;
        callName = null;
        buffer = [];
      }
    }
  }
  flush();
  return questions;
}

function getMaxSeq(content, typeCode, level) {
  const re = new RegExp(`FB-\\d{2}-${typeCode}-${level}-(\\d{3})`, 'g');
  let max = 0;
  let m;
  while ((m = re.exec(content)) !== null) {
    max = Math.max(max, parseInt(m[1], 10));
  }
  return max;
}

function main() {
  const questions = parseQuestions();
  console.log(`Parsed ${questions.length} questions from script`);

  const byFile = {};
  for (const q of questions) {
    const filename = DOMAIN_MAP[q.domain];
    if (!byFile[filename]) byFile[filename] = [];
    byFile[filename].push(q);
  }

  const stats = [];
  for (const filename of Object.keys(byFile).sort()) {
    const filePath = path.join(BASE, filename);
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    const seqMap = {};
    let appended = 0;
    let skipped = 0;
    const chunks = [];

    for (const q of byFile[filename]) {
      const { type_code, level, title } = q.meta;
      if (content.includes(title)) {
        skipped++;
        continue;
      }
      const key = `${type_code}-${level}`;
      if (seqMap[key] === undefined) {
        seqMap[key] = getMaxSeq(content, type_code, level);
      }
      seqMap[key]++;
      const domainNum = parseInt(q.domain, 10);
      const qid = `FB-${domainNum.toString().padStart(2, '0')}-${type_code}-${level}-${seqMap[key].toString().padStart(3, '0')}`;
      chunks.push(renderQuestion(qid, q.meta));
      appended++;
    }

    if (chunks.length > 0) {
      // Ensure separation from existing content
      const separator = content.endsWith('\n') ? '\n' : '\n\n';
      fs.appendFileSync(filePath, separator + chunks.join('\n'));
    }

    // Re-count unique IDs
    const newContent = fs.readFileSync(filePath, 'utf8');
    const uniqueIds = new Set([...newContent.matchAll(/FB-\d{2}-[A-Z]{2}-[BAPR]-\d{3}/g)].map(m => m[0]));
    stats.push({ filename, appended, skipped, total: uniqueIds.size });
  }

  console.log('\n=== Summary ===');
  for (const s of stats) {
    console.log(`${s.filename}: appended ${s.appended}, skipped ${s.skipped}, total unique IDs ${s.total}`);
  }
}

main();
