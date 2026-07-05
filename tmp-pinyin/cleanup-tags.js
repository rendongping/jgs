const fs = require('fs');
const path = require('path');

// Map old tag name -> canonical { id, name }
const canonicalMap = new Map([
  ['动态规划', { id: 'dong-tai-gui-hua', name: '动态规划' }],
  ['时间复杂度', { id: 'shi-jian-fu-za-du', name: '时间复杂度' }],
  ['Big O', { id: 'shi-jian-fu-za-du', name: '时间复杂度' }],
  ['API Gateway', { id: 'api-gateway', name: 'API 网关' }],
  ['design system', { id: 'design-system', name: 'Design System' }],
  ['map', { id: 'map', name: 'Map' }],
  ['monorepo', { id: 'monorepo', name: 'Monorepo' }],
  ['readonly', { id: 'readonly', name: 'Readonly' }],
  ['typescript', { id: 'typescript', name: 'TypeScript' }],
  ['原型链', { id: 'yuan-xing-lian', name: '原型链' }],
  ['链接', { id: 'lian-jie-url', name: '链接' }],
]);

const tagsPath = path.resolve('interview-bank/data/tags.json');
const data = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));

// First rename entries based on canonicalMap
const renamed = [];
data.tags.forEach(t => {
  const c = canonicalMap.get(t.name);
  if (c) {
    t.id = c.id;
    t.name = c.name;
    renamed.push(t.name);
  }
});

// Merge entries by id
const byId = new Map();
data.tags.forEach(t => {
  const existing = byId.get(t.id);
  if (existing) {
    existing.domainIds = [...new Set([...existing.domainIds, ...t.domainIds])].sort();
  } else {
    byId.set(t.id, { id: t.id, name: t.name, domainIds: [...t.domainIds].sort() });
  }
});

const arr = [...byId.values()];
const undef = arr.filter(t => !t.id);
if (undef.length) { console.error('Undefined ids:', undef); process.exit(1); }
data.tags = arr.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(tagsPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Renamed tags:', [...new Set(renamed)]);
console.log('Total tags after cleanup:', data.tags.length);

// Now normalize tag names in markdown files
const dir = path.resolve('interview-bank/by-domain');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
for (const f of files) {
  const fp = path.join(dir, f);
  let txt = fs.readFileSync(fp, 'utf8');
  let changed = false;
  txt = txt.replace(/^(\*\*标签\*\*：)(.+)$/gm, (match, prefix, names) => {
    const parts = names.split(/([,，、])/);
    const newParts = parts.map(part => {
      const c = canonicalMap.get(part.trim());
      if (c) {
        changed = true;
        return c.name;
      }
      return part;
    });
    return prefix + newParts.join('');
  });
  if (changed) {
    fs.writeFileSync(fp, txt, 'utf8');
    console.log('Updated tags in', f);
  }
}
