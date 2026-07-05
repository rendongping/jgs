#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const IB_DIR = path.resolve(__dirname, '..', 'interview-bank', 'by-domain');
const files = [
  '01-javascript.md',
  '02-typescript.md',
  '03-browser.md',
  '04-network.md',
  '05-security.md',
  '06-html-css.md',
  '07-a11y.md',
  '08-algorithms.md',
  '09-design-patterns.md',
];

const LEVEL_MAP = {
  B: '基础题',
  A: '进阶题',
  P: '深入题',
  R: '架构题',
};

function updateFile(fileName) {
  const filePath = path.join(IB_DIR, fileName);
  let text = fs.readFileSync(filePath, 'utf8');

  // Count per level
  const counts = { B: 0, A: 0, P: 0, R: 0 };
  const re = /^### FB-\d{2}-[A-Z]{2}-([A-Z])-\d{3}/gm;
  let m;
  while ((m = re.exec(text)) !== null) {
    counts[m[1]] = (counts[m[1]] || 0) + 1;
  }
  const total = counts.B + counts.A + counts.P + counts.R;

  // Update top summary line
  const summaryLine = `> 本题库共收录 **${total}** 道面试题（基础 ${counts.B} / 进阶 ${counts.A} / 深入 ${counts.P} / 架构 ${counts.R}）。`;
  text = text.replace(/^> 本题库共收录 \*\*\d+\*\* 道面试题（基础 \d+ \/ 进阶 \d+ \/ 深入 \d+ \/ 架构 \d+）。$/m, summaryLine);

  // Update section headings
  for (const [level, name] of Object.entries(LEVEL_MAP)) {
    const headingRe = new RegExp(`^## ${name}（\\d+ 道）`, 'm');
    text = text.replace(headingRe, `## ${name}（${counts[level]} 道）`);
  }

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`${fileName}: ${total} 题（基础 ${counts.B} / 进阶 ${counts.A} / 深入 ${counts.P} / 架构 ${counts.R}）`);
}

for (const f of files) updateFile(f);
