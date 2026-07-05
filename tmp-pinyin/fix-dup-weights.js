const fs = require('fs');
const path = require('path');

const dir = path.resolve('interview-bank/by-domain');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let fixed = 0;
for (const f of files) {
  const fp = path.join(dir, f);
  let txt = fs.readFileSync(fp, 'utf8');
  const orig = txt;
  // remove duplicate percentages like （40%）（40%） -> （40%）
  txt = txt.replace(/（(\d+)%）（\d+%）/g, '（$1%）');
  if (txt !== orig) {
    fs.writeFileSync(fp, txt, 'utf8');
    fixed++;
  }
}
console.log('fixed files', fixed);
