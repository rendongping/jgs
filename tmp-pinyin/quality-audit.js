const fs = require('fs');
const path = require('path');

const byDomainDir = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const outPath = path.join(__dirname, '..', 'interview-bank', 'data', 'quality-audit.json');

// Generic phrases that indicate bulk/template-generated low-quality answers
const genericPatterns = [
  /可以拆分为以下几个关键环节/,
  /需要关注以下方面/,
  /在实际工程中，还需要关注异常处理、可观测性、扩展性和性能瓶颈/,
  /如果候选人答对，可追问/,
  /如果候选人答错，可引导/,
  /MDN \/ 官方文档/,
  /相关基础概念/,
  /只背诵概念，无法结合场景说明/,
  /忽略边界情况和异常处理/,
  /混淆 .+ 与 .+ 的适用场景/,
  /设计支持 .+ 的 .+ 系统，需要关注以下方面/,
  /1\. \*\*功能需求\*\*/,
  /2\. \*\*数据模型\*\*/,
  /3\. \*\*接口与协议\*\*/,
  /4\. \*\*高可用与扩展\*\*/,
  /5\. \*\*安全与合规\*\*/,
  /6\. \*\*可观测性\*\*/,
];

// Minimum reference answer length by type (characters)
const minLenByType = {
  CO: 120,
  CA: 150,
  CD: 200,
  SC: 200,
  SD: 300,
  FS: 200,
  PE: 200,
  SE: 200,
  EN: 200,
  SS: 120,
  CP: 200,
};

function splitQuestions(text) {
  const lines = text.split(/\r?\n/);
  const questions = [];
  let current = null;
  let start = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^###\s+(FB-\d{2}-[A-Z]{2}-[A-Z]-\d+)\s*[：:]\s*(.*)$/);
    if (m) {
      if (current) {
        current.body = lines.slice(start, i).join('\n');
        questions.push(current);
      }
      current = { id: m[1], title: m[2].trim(), start, line: i + 1 };
      start = i;
    }
  }
  if (current) {
    current.body = lines.slice(start).join('\n');
    questions.push(current);
  }
  return questions;
}

function auditQuestion(q) {
  const parts = q.id.split('-');
  const type = parts[2];
  const level = parts[3];
  const issues = [];

  // Generic/template answer detection
  let genericScore = 0;
  for (const p of genericPatterns) {
    if (p.test(q.body)) genericScore++;
  }
  if (genericScore >= 2) issues.push('模板化答案');
  if (genericScore === 1) issues.push('疑似模板化');

  // Missing key sections
  if (!q.body.includes('评分维度')) issues.push('缺少评分维度');
  if (!q.body.includes('常见错误')) issues.push('缺少常见错误');
  if (!q.body.includes('口头回答版')) issues.push('缺少口头回答版');
  if (!q.body.includes('参考答案')) issues.push('缺少参考答案');

  // Answer length check (only inside 参考答案 section)
  const refMatch = q.body.match(/\*\*参考答案\*\*：([\s\S]*?)(?=\*\*评分维度\*\*|\*\*常见错误\*\*|\*\*延伸追问\*\*|\*\*相关题目\*\*|\*\*参考资源\*\*|\*\*口头回答版\*\*|\n---\s*\n###)/);
  const refLen = refMatch ? refMatch[1].replace(/\s/g, '').length : 0;
  const minLen = minLenByType[type] || 150;
  if (refLen < minLen) issues.push(`参考答案过短(${refLen}字)`);

  // Title/question quality
  if (q.title.length < 5) issues.push('标题过短');
  if (/请回答：\s*.+$/.test(q.body) && q.title.includes('请解释')) issues.push('题干可能过于宽泛');

  // Mismatch: answer uses generic "系统" but tags are unrelated (heuristic)
  const tagLine = q.body.match(/\*\*标签\*\*：(.+)/);
  if (tagLine && /设计支持 .+ 的 .+ 系统/.test(q.body)) {
    const tags = tagLine[1].split('、').map(t => t.trim());
    const bodyLower = q.body.toLowerCase();
    const tagHit = tags.some(t => bodyLower.includes(t.toLowerCase()));
    if (!tagHit) issues.push('标签与答案内容不匹配');
  }

  // Determine grade
  let grade = 'ok';
  if (issues.includes('模板化答案') || issues.includes('缺少参考答案') || issues.includes('标签与答案内容不匹配')) {
    grade = 'needs_rewrite';
  } else if (issues.length > 0) {
    grade = 'minor_fix';
  }

  return { id: q.id, title: q.title, type, level, line: q.line, grade, issues, refLen, genericScore };
}

const files = fs.readdirSync(byDomainDir).filter(f => f.endsWith('.md')).sort();
const allAudits = [];
let needsRewrite = 0;
let minorFix = 0;
let ok = 0;

for (const f of files) {
  const text = fs.readFileSync(path.join(byDomainDir, f), 'utf8');
  const questions = splitQuestions(text);
  for (const q of questions) {
    const audit = auditQuestion(q);
    audit.file = f;
    allAudits.push(audit);
    if (audit.grade === 'needs_rewrite') needsRewrite++;
    else if (audit.grade === 'minor_fix') minorFix++;
    else ok++;
  }
}

const summary = {
  total: allAudits.length,
  needsRewrite,
  minorFix,
  ok,
  needsRewritePct: ((needsRewrite / allAudits.length) * 100).toFixed(1),
  minorFixPct: ((minorFix / allAudits.length) * 100).toFixed(1),
  okPct: ((ok / allAudits.length) * 100).toFixed(1),
};

fs.writeFileSync(outPath, JSON.stringify({ summary, audits: allAudits }, null, 2));
console.log('Quality audit written to', outPath);
console.log(JSON.stringify(summary, null, 2));
