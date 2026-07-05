const fs = require('fs');
const path = require('path');

const dir = path.resolve('interview-bank/by-domain');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
const idRe = /^### (FB-\d{2}-[A-Z]{2}-[BAPR]-\d{3})/m;
const weightRe = /[(（](\d+)%[)）]/g;
const allIds = new Set();
const duplicates = [];
const badWeights = [];
const unescaped = [];
const allowedTags = new Set(['br','img','a','code','pre','span','div','strong','em','sub','sup','table','tr','td','th','thead','tbody','li','ul','ol','p','h1','h2','h3','h4','h5','h6','blockquote','hr']);
const htmlRe = /<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;

for (const f of files) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  const ids = [...txt.matchAll(/^### (FB-\d{2}-[A-Z]{2}-[BAPR]-\d{3})/gm)].map(m => m[1]);
  ids.forEach(id => {
    if (allIds.has(id)) duplicates.push(id);
    allIds.add(id);
  });
  // split by question headings
  const matches = [...txt.matchAll(/^### (FB-\d{2}-[A-Z]{2}-[BAPR]-\d{3})/gm)];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : txt.length;
    const b = txt.slice(start, end);
    const qid = matches[i][1];
    const textWithoutCode = b.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '');
    const ws = [...textWithoutCode.matchAll(weightRe)];
    if (ws.length) {
      const total = ws.reduce((s, x) => s + parseInt(x[1], 10), 0);
      if (total !== 100) badWeights.push([qid, total, f]);
    }
    const lines = b.split(/\r?\n/);
    let inCode = false;
    for (const l of lines) {
      if (l.trim().startsWith('```') || l.trim().startsWith('~~~')) {
        inCode = !inCode;
        continue;
      }
      if (inCode) continue;
      const stripped = l.replace(/`[^`]+`/g, '');
      let hm;
      while ((hm = htmlRe.exec(stripped)) !== null) {
        const tag = hm[1].toLowerCase();
        if (!allowedTags.has(tag)) {
          unescaped.push([qid, f, l.trim()]);
          break;
        }
      }
      htmlRe.lastIndex = 0;
    }
  }
}

console.log('files', files.length);
console.log('total ids', allIds.size);
console.log('duplicates', duplicates);
console.log('bad weights', badWeights.length);
badWeights.slice(0, 20).forEach(b => console.log(b));
console.log('unescaped-like', unescaped.length);
unescaped.slice(0, 20).forEach(u => console.log(u));

if (duplicates.length || badWeights.length || unescaped.length) process.exit(1);
