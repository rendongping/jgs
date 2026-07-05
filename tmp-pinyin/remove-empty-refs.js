const fs = require('fs');
const path = require('path');

const byDomainDir = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const files = fs.readdirSync(byDomainDir).filter(f => f.endsWith('.md')).sort();

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

function findRefRange(block) {
  const startRe = /^\*\*参考答案\*\*[:：]/;
  let start = -1;
  for (let i = 0; i < block.length; i++) if (startRe.test(block[i])) { start = i; break; }
  if (start === -1) return null;
  const nextRe = /^\*\*[A-Z\u4e00-\u9fa5]+\*\*[:：]/;
  let end = block.length;
  for (let i = start + 1; i < block.length; i++) if (nextRe.test(block[i])) { end = i; break; }
  return { start, end };
}

let removedTotal = 0;

for (const file of files) {
  const filePath = path.join(byDomainDir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const questions = splitQuestions(lines);
  if (questions.length === 0) continue;

  const toRemove = new Set();
  for (const q of questions) {
    const block = lines.slice(q.start, q.end);
    const r = findRefRange(block);
    if (!r) { toRemove.add(q.id); continue; }
    const refText = block.slice(r.start + 1, r.end).join('\n').replace(/\s/g, '');
    if (refText.includes('（待补充）') || refText.length < 30) {
      toRemove.add(q.id);
    }
  }

  if (toRemove.size === 0) continue;

  const keptLines = [];
  let cursor = 0;
  for (const q of questions) {
    for (let i = cursor; i < q.start; i++) keptLines.push(lines[i]);
    if (!toRemove.has(q.id)) {
      for (let i = q.start; i < q.end; i++) keptLines.push(lines[i]);
    }
    cursor = q.end;
  }
  for (let i = cursor; i < lines.length; i++) keptLines.push(lines[i]);

  // trim trailing separators/blanks
  while (keptLines.length > 0 && (/^---+$/.test(keptLines[keptLines.length - 1]) || keptLines[keptLines.length - 1].trim() === '')) {
    keptLines.pop();
  }
  if (keptLines.length > 0 && keptLines[keptLines.length - 1] !== '') keptLines.push('');

  fs.writeFileSync(filePath, keptLines.join('\n') + '\n', 'utf8');
  removedTotal += toRemove.size;
  console.log(`${file}: removed ${toRemove.size} empty-reference questions`);
}

console.log(`\nTotal removed: ${removedTotal}`);
