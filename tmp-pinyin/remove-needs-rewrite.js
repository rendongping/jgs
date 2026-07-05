const fs = require('fs');
const path = require('path');

const byDomainDir = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const auditPath = path.join(__dirname, '..', 'interview-bank', 'data', 'quality-audit.json');

const audit = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
const toRemove = new Set(audit.audits.filter(q => q.grade === 'needs_rewrite').map(q => q.id));

const files = fs.readdirSync(byDomainDir).filter(f => f.endsWith('.md')).sort();

let removedTotal = 0;

for (const file of files) {
  const filePath = path.join(byDomainDir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);

  const questions = [];
  let current = null;
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^###\s+(FB-\d{2}-[A-Z]{2}-[A-Z]-\d+)\s*[：:]\s*(.*)$/);
    if (m) {
      if (current) {
        questions.push({ ...current, end: i });
      }
      current = { id: m[1], title: m[2].trim(), start: i };
    }
  }
  if (current) {
    questions.push({ ...current, end: lines.length });
  }

  if (questions.length === 0) continue;

  const removedIds = [];
  const keepRanges = [];
  let cursor = 0;
  for (const q of questions) {
    if (toRemove.has(q.id)) {
      removedIds.push(q.id);
      // Keep preface lines before this question
      if (q.start > cursor) {
        keepRanges.push({ start: cursor, end: q.start });
      }
      cursor = q.end;
    }
  }
  // Keep trailing content after last kept question
  if (cursor < lines.length) {
    keepRanges.push({ start: cursor, end: lines.length });
  }

  if (removedIds.length === 0) continue;

  const keptLines = [];
  for (const r of keepRanges) {
    for (let i = r.start; i < r.end; i++) {
      keptLines.push(lines[i]);
    }
  }

  // Trim trailing separators/blank lines
  while (keptLines.length > 0 && (/^---+$/.test(keptLines[keptLines.length - 1]) || keptLines[keptLines.length - 1].trim() === '')) {
    keptLines.pop();
  }
  // Ensure file ends with newline
  if (keptLines.length > 0 && keptLines[keptLines.length - 1] !== '') {
    keptLines.push('');
  }

  fs.writeFileSync(filePath, keptLines.join('\n') + '\n', 'utf8');
  removedTotal += removedIds.length;
  console.log(`${file}: removed ${removedIds.length} placeholder questions`);
}

console.log(`\nTotal removed: ${removedTotal}`);
