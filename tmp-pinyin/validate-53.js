const fs = require('fs');

const txt = fs.readFileSync('interview-bank/by-domain/53-computer-science.md', 'utf8');
const idRe = /^### (FB-53-[A-Z]{2}-[BAPR]-\d{3})/gm;
const ids = [...txt.matchAll(idRe)].map(m => m[1]);
const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log('ids', ids.length, 'unique', new Set(ids).size, 'dup', [...new Set(dup)]);

const blocks = txt.split(/\n---\s*\n/);
const badWeights = [];
const weightRe = /[(（](\d+)%[)）]/g;
for (const b of blocks) {
  const m = b.match(/^### (FB-53-[A-Z]{2}-[BAPR]-\d{3})/m);
  if (!m) continue;
  const qid = m[1];
  const ws = [...b.matchAll(weightRe)];
  if (ws.length) {
    const total = ws.reduce((s, x) => s + parseInt(x[1], 10), 0);
    if (total !== 100) badWeights.push([qid, total]);
  }
}
console.log('bad weights', badWeights);

// tags registered?
const tags = JSON.parse(fs.readFileSync('interview-bank/data/tags.json', 'utf8')).tags;
const tagSet = new Set(tags.map(t => t.name));
const lines = txt.match(/^\*\*标签\*\*：(.+)$/gm) || [];
const missing = [];
lines.forEach(line => {
  const raw = line.replace(/^\*\*标签\*\*：/, '');
  raw.split(/[,，、]/).forEach(s => {
    const name = s.trim();
    if (name && !tagSet.has(name)) missing.push(name);
  });
});
console.log('missing tags', [...new Set(missing)]);
