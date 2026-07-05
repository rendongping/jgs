const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin');

function toSlug(name) {
  return pinyin(name, { style: pinyin.STYLE_NORMAL })
    .flat()
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

const tagIds = new Set(require(path.resolve('interview-bank/data/tags.json')).tags.map(t => t.id));
const dir = path.resolve('interview-bank/by-domain');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
let missing = 0;
const missingSet = new Set();
for (const f of files) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = txt.match(/^\*\*标签\*\*：(.+)$/gm) || [];
  for (const line of lines) {
    const raw = line.replace(/^\*\*标签\*\*：/, '');
    raw.split(/[,，、]/).forEach(s => {
      const name = s.trim();
      if (!name) return;
      const slug = toSlug(name);
      if (!tagIds.has(slug)) {
        missing++;
        missingSet.add(name);
        console.log('MISSING', f, name, '->', slug);
      }
    });
  }
}
console.log('missing unique', missingSet.size, 'occurrences', missing);
if (missingSet.size) process.exit(1);
