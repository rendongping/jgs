const fs = require('fs');
const path = require('path');

const byDomainDir = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const files = fs.readdirSync(byDomainDir).filter(f => f.endsWith('.md')).sort();

const levelNames = {
  B: { name: '基础', suffix: 'basic' },
  A: { name: '进阶', suffix: 'advanced' },
  P: { name: '深入', suffix: 'proficient' },
  R: { name: '架构', suffix: 'architect' },
};

for (const file of files) {
  const filePath = path.join(byDomainDir, file);
  let text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);

  const counts = { B: 0, A: 0, P: 0, R: 0 };
  for (const line of lines) {
    const m = line.match(/^###\s+(FB-\d{2}-[A-Z]{2}-([A-Z])-\d+)\s*[：:]/);
    if (m) {
      counts[m[2]] = (counts[m[2]] || 0) + 1;
    }
  }
  const total = counts.B + counts.A + counts.P + counts.R;

  // Update top summary line: > 本题库共收录 **X** 道题（基础 X / 进阶 X / 深入 X / 架构 X）。
  text = text.replace(
    /^(> 本题库共收录 \*\*)\d+(\*\* 道题（基础 \d+ \/ 进阶 \d+ \/ 深入 \d+ \/ 架构 \d+）。)$/m,
    `$1${total}$2`
  );
  text = text.replace(
    /^(> 本题库共收录 \*\*)\d+(\*\* 道题 \(基础 \d+ \/ 进阶 \d+ \/ 深入 \d+ \/ 架构 \d+\)\。)$/m,
    `$1${total}$2`
  );

  // Update section headers like ## 基础题（8 道）{#basic}
  for (const [code, info] of Object.entries(levelNames)) {
    const re = new RegExp(`^(## ${info.name}题（)\\d+( 道）\\{\\#${info.suffix}\\})$`, 'm');
    text = text.replace(re, `$1${counts[code]}$2`);
  }

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`${file}: total=${total} B=${counts.B} A=${counts.A} P=${counts.P} R=${counts.R}`);
}
