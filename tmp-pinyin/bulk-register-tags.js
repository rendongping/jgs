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

const tagsPath = path.resolve('interview-bank/data/tags.json');
const data = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));
const byId = new Map();
data.tags.forEach(t => { byId.set(t.id, t); });

const dir = path.resolve('interview-bank/by-domain');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
let added = 0;
let updated = 0;
for (const f of files) {
  const domainId = path.basename(f, '.md').split('-')[0];
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = txt.match(/^\*\*标签\*\*：(.+)$/gm) || [];
  for (const line of lines) {
    const raw = line.replace(/^\*\*标签\*\*：/, '');
    raw.split(/[,，、]/).forEach(s => {
      const name = s.trim();
      if (!name) return;
      const slug = toSlug(name);
      if (!slug) return;
      const existing = byId.get(slug);
      if (existing) {
        if (!existing.domainIds.includes(domainId)) {
          existing.domainIds.push(domainId);
          updated++;
        }
      } else {
        const tag = { id: slug, name, domainIds: [domainId] };
        data.tags.push(tag);
        byId.set(slug, tag);
        added++;
      }
    });
  }
}

data.tags.forEach(t => { t.domainIds.sort(); });
data.tags.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(tagsPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`Added ${added} new tags, updated ${updated} existing domain lists.`);
console.log('Total tags:', data.tags.length);
