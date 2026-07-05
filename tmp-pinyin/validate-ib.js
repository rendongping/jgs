const fs = require('fs');
const path = require('path');

const dir = path.resolve('interview-bank/by-domain');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
const ids = [];
const dup = new Set();
const badWeights = [];
const unescaped = [];
const idRe = /^### (FB-\d{2}-[A-Z]{2}-[BAPR]-\d{3})/m;
const weightRe = /[(（](\d+)%[)）]/g;
const allowedTags = new Set(['br','img','a','code','pre','span','div','strong','em','sub','sup','table','tr','td','th','thead','tbody','li','ul','ol','p','h1','h2','h3','h4','h5','h6','blockquote','hr']);
const htmlRe = /<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;

for (const f of files) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  let m;
  while ((m = idRe.exec(txt)) !== null) {
    const id = m[1];
    if (ids.includes(id)) dup.add(id);
    ids.push(id);
  }
  const blocks = txt.split(/\n---\s*\n/);
  for (const b of blocks) {
    const bm = b.match(idRe);
    if (!bm) continue;
    const qid = bm[1];
    const ws = [...b.matchAll(weightRe)];
    if (ws.length) {
      const total = ws.reduce((s, x) => s + parseInt(x[1], 10), 0);
      if (total !== 100) badWeights.push([qid, total]);
    }
    const lines = b.split('\n');
    let inCode = false;
    for (const l of lines) {
      if (l.trim().startsWith('```')) {
        inCode = !inCode;
        continue;
      }
      if (inCode) continue;
      let hm;
      while ((hm = htmlRe.exec(l)) !== null) {
        const tag = hm[1].toLowerCase();
        if (!allowedTags.has(tag)) {
          unescaped.push([qid, l.trim()]);
          break;
        }
      }
      htmlRe.lastIndex = 0;
    }
  }
}

console.log('total ids', ids.length);
console.log('unique', new Set(ids).size);
console.log('duplicates', [...dup]);
console.log('bad weight count', badWeights.length);
badWeights.slice(0, 20).forEach(b => console.log(b));
console.log('unescaped-like count', unescaped.length);
unescaped.slice(0, 20).forEach(u => console.log(u));

if (dup.size || badWeights.length) process.exit(1);
