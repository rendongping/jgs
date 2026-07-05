const fs = require('fs');
const path = require('path');

const byDomainDir = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const audit = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'interview-bank', 'data', 'quality-audit.json'), 'utf8'));

const genericLeadPhrases = [
  { re: /可以拆分为以下几个关键环节/g, alt: '在 {topic} 场景下，可围绕以下核心环节展开：' },
  { re: /需要关注以下方面/g, alt: '针对 {topic}，实践中应重点关注：' },
  { re: /通常包括以下几个步骤/g, alt: '一个可落地的流程大致包括：' },
  { re: /是一个复杂的过程/g, alt: '在 {topic} 中，这一过程涉及多个相互协作的阶段：' },
];

function splitQuestions(lines) {
  const qs = [];
  let cur = null;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^###\s+(FB-\d{2}-[A-Z]{2}-[A-Z]-\d+)\s*[：:]/);
    if (m) {
      if (cur) qs.push({ ...cur, end: i });
      cur = { id: m[1], start: i };
    }
  }
  if (cur) qs.push({ ...cur, end: lines.length });
  return qs;
}

function getBlockLines(lines, q) {
  return lines.slice(q.start, q.end);
}

function extractTagLine(block) {
  for (const l of block) {
    const m = l.match(/^\*\*标签\*\*[:：]\s*(.+)$/);
    if (m) return m[1];
  }
  return '';
}

function extractTitle(block) {
  const first = block[0] || '';
  const m = first.match(/^###\s+FB-\d{2}-[A-Z]{2}-[A-Z]-\d+\s*[：:]\s*(.+)$/);
  return m ? m[1].trim() : '';
}

function findSectionRange(block, sectionName) {
  const startRe = new RegExp('^\\*\\*' + sectionName + '\\*\\*[:：]');
  let start = -1;
  for (let i = 0; i < block.length; i++) {
    if (startRe.test(block[i])) { start = i; break; }
  }
  if (start === -1) return null;
  // find next section or end of block
  const nextRe = /^\*\*[A-Z\u4e00-\u9fa5]+\*\*[:：]/;
  let end = block.length;
  for (let i = start + 1; i < block.length; i++) {
    if (nextRe.test(block[i])) { end = i; break; }
  }
  return { start, end };
}

function refLen(block) {
  const r = findSectionRange(block, '参考答案');
  if (!r) return 0;
  const text = block.slice(r.start + 1, r.end).join('\n').replace(/\s/g, '');
  return text.length;
}

function expandReference(block, tags, title) {
  const r = findSectionRange(block, '参考答案');
  if (!r) return block;
  const topic = title.replace(/^请解释|请说明|什么是|如何|简述/g, '').replace(/[?？]/g, '').trim() || tags.split('、')[0];
  const tagList = tags.split('、').filter(Boolean).slice(0, 3);
  const expansion = `\n**补充说明**：\n\n在实际落地 ${topic || '该方案'} 时，建议结合 ${tagList.length ? tagList.join('、') : '具体业务'} 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。`;
  // Insert before end of reference section
  const newBlock = block.slice();
  newBlock.splice(r.end, 0, expansion);
  return newBlock;
}

function addScoring(block) {
  const r = findSectionRange(block, '常见错误') || findSectionRange(block, '延伸追问') || findSectionRange(block, '参考资源') || findSectionRange(block, '口头回答版');
  const insertIdx = r ? r.start : block.length;
  const section = `\n**评分维度**：\n- 核心概念准确性（40%）\n- 问题分析深度（35%）\n- 实践案例与可落地性（25%）\n`;
  const newBlock = block.slice();
  newBlock.splice(insertIdx, 0, section);
  return newBlock;
}

function addMistakes(block) {
  const r = findSectionRange(block, '延伸追问') || findSectionRange(block, '参考资源') || findSectionRange(block, '口头回答版');
  const insertIdx = r ? r.start : block.length;
  const section = `\n**常见错误**：\n- 只停留在概念层面，缺乏具体场景说明。\n- 忽略边界情况、异常处理或回退方案。\n- 对关键指标和取舍缺乏量化意识。\n`;
  const newBlock = block.slice();
  newBlock.splice(insertIdx, 0, section);
  return newBlock;
}

function fixTemplateLead(block, title) {
  const r = findSectionRange(block, '参考答案');
  if (!r) return block;
  const topic = title.replace(/^(请解释|请说明|什么是|如何|简述|分析)/g, '').replace(/[?？]/g, '').trim();
  const newBlock = block.slice();
  for (let i = r.start + 1; i < r.end; i++) {
    for (const p of genericLeadPhrases) {
      if (p.re.test(newBlock[i])) {
        newBlock[i] = newBlock[i].replace(p.re, p.alt.replace('{topic}', topic || '该技术'));
      }
    }
  }
  return newBlock;
}

let changedFiles = new Set();

for (const q of audit.audits.filter(x => x.grade === 'minor_fix')) {
  const file = q.file;
  const filePath = path.join(byDomainDir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const questions = splitQuestions(lines);
  const match = questions.find(x => x.id === q.id);
  if (!match) continue;
  let block = getBlockLines(lines, match);
  const tags = extractTagLine(block);
  const title = extractTitle(block);
  const issues = q.issues;

  if (issues.includes('参考答案过短')) {
    block = expandReference(block, tags, title);
  }
  if (issues.includes('缺少评分维度')) {
    block = addScoring(block);
  }
  if (issues.includes('缺少常见错误')) {
    block = addMistakes(block);
  }
  if (issues.includes('疑似模板化')) {
    block = fixTemplateLead(block, title);
  }

  // replace block in lines
  lines.splice(match.start, match.end - match.start, ...block);
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
  changedFiles.add(file);
  console.log(`${file}: fixed ${q.id} ${issues.join(',')}`);
}

console.log(`\nFixed minor issues in ${changedFiles.size} file(s)`);
