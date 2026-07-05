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

for (const file of files) {
  const filePath = path.join(byDomainDir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const questions = splitQuestions(lines);
  if (questions.length === 0) continue;

  const seen = new Map();
  const duplicates = [];
  for (const q of questions) {
    if (seen.has(q.id)) {
      duplicates.push(q);
    } else {
      seen.set(q.id, q);
    }
  }
  if (duplicates.length === 0) continue;

  // Find max seq per prefix
  const maxSeq = {};
  for (const id of seen.keys()) {
    const prefix = id.slice(0, -3);
    const seq = parseInt(id.slice(-3), 10);
    maxSeq[prefix] = Math.max(maxSeq[prefix] || 0, seq);
  }

  for (const q of duplicates) {
    const prefix = q.id.slice(0, -3);
    maxSeq[prefix] = (maxSeq[prefix] || 0) + 1;
    const newId = prefix + String(maxSeq[prefix]).padStart(3, '0');
    // Replace heading line
    lines[q.start] = lines[q.start].replace(/^###\s+FB-\d{2}-[A-Z]{2}-[A-Z]-\d+/, `### ${newId}`);
    console.log(`${file}: renamed ${q.id} -> ${newId}`);
  }

  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
}
