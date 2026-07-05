const fs = require('fs');
const path = require('path');

const byDomainDir = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const files = fs.readdirSync(byDomainDir).filter(f => f.endsWith('.md')).sort();

const openTagRe = /<([^\s>][^>]*)>/g;
const closeTagRe = /<\/([^>]+)>/g;

function escapeTagsInLine(line) {
  // Avoid double-escaping if already wrapped in backticks
  // Simple heuristic: if the whole tag is inside backticks, skip.
  return line
    .replace(openTagRe, (m, tag, attrs) => {
      if (new RegExp('`' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '`').test(line)) return m;
      return '`<' + tag + (attrs || '') + '>`';
    })
    .replace(closeTagRe, (m, tag) => {
      if (new RegExp('`' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '`').test(line)) return m;
      return '`</' + tag + '>`';
    });
}

let changedTotal = 0;

for (const file of files) {
  const filePath = path.join(byDomainDir, file);
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  let inOral = false;
  let changed = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '**口头回答版**：') {
      inOral = true;
      continue;
    }
    if (inOral) {
      // Stop at next markdown heading, horizontal rule, next section, or next question
      if (/^###\s+FB-/.test(line) || /^##\s/.test(line) || /^---+$/.test(line) || /^\*\*[^*]+\*\*[:：]/.test(line)) {
        inOral = false;
      } else if (/^>/.test(line)) {
        const original = line;
        const updated = escapeTagsInLine(original);
        if (updated !== original) {
          lines[i] = updated;
          changed++;
        }
      }
    }
  }

  if (changed > 0) {
    fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
    changedTotal += changed;
    console.log(`${file}: escaped ${changed} oral-answer tag(s)`);
  }
}

console.log(`\nTotal oral-answer lines changed: ${changedTotal}`);
