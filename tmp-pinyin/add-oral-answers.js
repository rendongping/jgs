const fs = require('fs');
const path = require('path');

const byDomainDir = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const files = fs.readdirSync(byDomainDir).filter(f => f.endsWith('.md')).sort();

function splitQuestions(lines) {
  const questions = [];
  let current = null;
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^###\s+(FB-\d{2}-[A-Z]{2}-[A-Z]-\d+)\s*[：:]/);
    if (m) {
      if (current) {
        questions.push({ ...current, end: i });
      }
      current = { id: m[1], start: i };
    }
  }
  if (current) {
    questions.push({ ...current, end: lines.length });
  }
  return questions;
}

function extractReference(lines) {
  let inRef = false;
  const ref = [];
  for (const line of lines) {
    if (/^\*\*参考答案\*\*[:：]/.test(line)) {
      inRef = true;
      continue;
    }
    if (inRef && /^\*\*[A-Z\u4e00-\u9fa5]+\*\*[:：]/.test(line)) {
      break;
    }
    if (inRef) ref.push(line);
  }
  return ref.join('\n').trim();
}

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '（见代码示例）')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-\d]+[.)、．]\s*/gm, '')
    .replace(/\n+/g, '\n')
    .trim();
}

function generateOral(refText) {
  const plain = stripMarkdown(refText);
  if (!plain) return '可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。';

  const paragraphs = plain.split(/\n/).map(s => s.trim()).filter(Boolean);
  const sentences = [];
  for (const p of paragraphs) {
    const parts = p.split(/([。！？])/).filter(Boolean);
    for (let i = 0; i < parts.length; i += 2) {
      const s = parts[i] + (parts[i + 1] || '');
      if (s.trim()) sentences.push(s.trim());
    }
  }

  // Pick first meaningful sentence and up to 3 bullet-like key points
  const selected = [];
  if (sentences[0] && sentences[0].length >= 10) selected.push(sentences[0]);
  for (const s of sentences.slice(1)) {
    if (selected.length >= 4) break;
    if (s.length >= 10 && !selected.includes(s)) selected.push(s);
  }

  let text = selected.join(' ');
  if (text.length > 400) text = text.slice(0, 400) + '……';
  if (text.length < 30) text = plain.slice(0, 300);

  return text;
}

let addedTotal = 0;

for (const file of files) {
  const filePath = path.join(byDomainDir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const questions = splitQuestions(lines);
  if (questions.length === 0) continue;

  let added = 0;
  const newLines = [];
  let cursor = 0;

  for (const q of questions) {
    // append preface / separator before question
    for (let i = cursor; i < q.start; i++) newLines.push(lines[i]);

    const blockLines = lines.slice(q.start, q.end);
    const blockText = blockLines.join('\n');

    if (!blockText.includes('口头回答版')) {
      const ref = extractReference(blockLines);
      const oral = generateOral(ref);
      // Insert oral section before trailing separators/blank lines at end of block
      let insertPos = blockLines.length;
      while (insertPos > 0 && (/^---+$/.test(blockLines[insertPos - 1]) || blockLines[insertPos - 1].trim() === '')) {
        insertPos--;
      }
      blockLines.splice(insertPos, 0, '', `**口头回答版**：`, `> ${oral.replace(/\n/g, '\n> ')}`);
      added++;
    }

    for (const l of blockLines) newLines.push(l);
    cursor = q.end;
  }
  // append trailing content
  for (let i = cursor; i < lines.length; i++) newLines.push(lines[i]);

  if (added > 0) {
    fs.writeFileSync(filePath, newLines.join('\n') + '\n', 'utf8');
    addedTotal += added;
    console.log(`${file}: added ${added} oral answers`);
  }
}

console.log(`\nTotal oral answers added: ${addedTotal}`);
