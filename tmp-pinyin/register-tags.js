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

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node register-tags.js <path-to-domain.md>');
    process.exit(1);
  }
  const domainId = path.basename(filePath, '.md').split('-')[0];
  const content = fs.readFileSync(filePath, 'utf8');
  const tagLines = content.match(/^\*\*标签\*\*：(.+)$/gm) || [];
  const names = new Set();
  tagLines.forEach(line => {
    const raw = line.replace(/^\*\*标签\*\*：/, '');
    raw.split(/[,，、]/).forEach(s => {
      const name = s.trim();
      if (name) names.add(name);
    });
  });

  const tagsPath = path.resolve('interview-bank/data/tags.json');
  const tagsData = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));
  const byId = new Map();
  const byName = new Map();
  tagsData.tags.forEach(tag => {
    byId.set(tag.id, tag);
    byName.set(tag.name, tag);
  });

  let added = 0;
  let updated = 0;
  names.forEach(name => {
    const slug = toSlug(name);
    if (!slug) return;
    if (byName.has(name)) {
      const tag = byName.get(name);
      if (!tag.domainIds.includes(domainId)) {
        tag.domainIds.push(domainId);
        updated++;
      }
    } else {
      tagsData.tags.push({ id: slug, name, domainIds: [domainId] });
      byName.set(name, tagsData.tags[tagsData.tags.length - 1]);
      byId.set(slug, tagsData.tags[tagsData.tags.length - 1]);
      added++;
    }
  });

  tagsData.tags.sort((a, b) => a.id.localeCompare(b.id));
  fs.writeFileSync(tagsPath, JSON.stringify(tagsData, null, 2) + '\n', 'utf8');
  console.log(`Domain ${domainId}: ${names.size} unique tags, ${added} added, ${updated} domain updated.`);
}

main();
