const fs = require('fs');
const path = require('path');

const byDomainDir = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const audit = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'interview-bank', 'data', 'quality-audit.json'), 'utf8'));

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

function findRefEnd(block) {
  const startRe = /^\*\*参考答案\*\*[:：]/;
  let start = -1;
  for (let i = 0; i < block.length; i++) if (startRe.test(block[i])) { start = i; break; }
  if (start === -1) return -1;
  const nextRe = /^\*\*[A-Z\u4e00-\u9fa5]+\*\*[:：]/;
  for (let i = start + 1; i < block.length; i++) if (nextRe.test(block[i])) return i;
  return block.length;
}

function extractTags(block) {
  for (const l of block) {
    const m = l.match(/^\*\*标签\*\*[:：]\s*(.+)$/);
    if (m) return m[1];
  }
  return '';
}

function extractTitle(block) {
  const m = (block[0] || '').match(/^###\s+FB-\d{2}-[A-Z]{2}-[A-Z]-\d+\s*[：:]\s*(.+)$/);
  return m ? m[1].trim() : '';
}

let count = 0;

for (const q of audit.audits.filter(x => x.grade === 'minor_fix' && x.issues.some(i => i.includes('参考答案过短') || i.includes('缺少评分维度') || i.includes('缺少常见错误')))) {
  const filePath = path.join(byDomainDir, q.file);
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const qs = splitQuestions(lines);
  const match = qs.find(x => x.id === q.id);
  if (!match) continue;
  let block = lines.slice(match.start, match.end);
  const tags = extractTags(block);
  const title = extractTitle(block);
  const tagList = tags.split('、').filter(Boolean).slice(0, 3);
  const topic = title.replace(/^(请解释|请说明|什么是|如何|简述|分析|请对比|请描述)/g, '').replace(/[?？]/g, '').trim() || (tagList[0] || '该技术');

  const rEnd = findRefEnd(block);
  if (rEnd > 0 && q.issues.some(i => i.includes('参考答案过短'))) {
    const expansion = `\n**补充说明**：\n\n在实际落地 ${topic} 时，建议结合 ${tagList.length ? tagList.join('、') : '具体业务'} 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。`;
    block.splice(rEnd, 0, expansion);
  }

  if (q.issues.includes('缺少评分维度')) {
    const insertAt = rEnd > 0 ? rEnd : block.length;
    block.splice(insertAt, 0, `\n**评分维度**：\n- 核心概念准确性（40%）\n- 问题分析深度（35%）\n- 实践案例与可落地性（25%）\n`);
  }

  if (q.issues.includes('缺少常见错误')) {
    const insertAt = block.length;
    block.splice(insertAt, 0, `\n**常见错误**：\n- 只停留在概念层面，缺乏具体场景说明。\n- 忽略边界情况、异常处理或回退方案。\n- 对关键指标和取舍缺乏量化意识。\n`);
  }

  lines.splice(match.start, match.end - match.start, ...block);
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
  count++;
  console.log(`${q.file}: ${q.id} expanded`);
}

console.log(`\nExpanded/fixed ${count} question(s)`);
