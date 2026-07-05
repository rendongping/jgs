const fs = require('fs');
const path = require('path');

const tagNames = new Set(require(path.resolve('interview-bank/data/tags.json')).tags.map(t => t.name));
const dir = path.resolve('interview-bank/by-domain');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
let missingTotal = 0;
const missingSet = new Set();
for (const f of files) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = txt.match(/^\*\*标签\*\*：(.+)$/gm) || [];
  for (const line of lines) {
    const raw = line.replace(/^\*\*标签\*\*：/, '');
    raw.split(/[,，、]/).forEach(s => {
      const name = s.trim();
      if (name && !tagNames.has(name)) {
        missingTotal++;
        missingSet.add(name);
        console.log('MISSING', f, name);
      }
    });
  }
}
console.log('missing unique', missingSet.size, 'total occurrences', missingTotal);
if (missingSet.size) process.exit(1);
