const fs = require('fs');
const path = require('path');

const byDomainDir = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const files = fs.readdirSync(byDomainDir).filter(f => f.endsWith('.md')).sort();

const allowedTags = new Set(['br','img','a','code','pre','span','div','strong','em','sub','sup','table','tr','td','th','thead','tbody','li','ul','ol','p','h1','h2','h3','h4','h5','h6','blockquote','hr']);

const tagLikeRe = /<([a-zA-Z][^>]*)>/g;
const closeTagRe = /<\/([a-zA-Z][a-zA-Z0-9]*)>/g;

function isAllowedTag(tagLike) {
  const first = tagLike.split(/\s|,/)[0].toLowerCase();
  return allowedTags.has(first);
}

function escapeLine(line) {
  // Preserve inline code spans by temporarily replacing them
  const codes = [];
  let protectedLine = line.replace(/`[^`]*`/g, (m) => {
    codes.push(m);
    return `\x00${codes.length - 1}\x00`;
  });

  protectedLine = protectedLine
    .replace(tagLikeRe, (m, inner) => {
      if (isAllowedTag(inner)) return m;
      return '&lt;' + inner + '&gt;';
    })
    .replace(closeTagRe, (m, tag) => {
      if (allowedTags.has(tag.toLowerCase())) return m;
      return '&lt;/' + tag + '&gt;';
    });

  // Restore inline code
  protectedLine = protectedLine.replace(/\x00(\d+)\x00/g, (_, i) => codes[parseInt(i, 10)]);
  return protectedLine;
}

let changedTotal = 0;
let lineTotal = 0;

for (const file of files) {
  const filePath = path.join(byDomainDir, file);
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  let inCode = false;
  let changed = 0;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const updated = escapeLine(lines[i]);
    if (updated !== lines[i]) {
      lines[i] = updated;
      changed++;
    }
  }
  if (changed > 0) {
    fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
    changedTotal += changed;
    console.log(`${file}: escaped ${changed} line(s)`);
  }
}

console.log(`\nTotal lines changed: ${changedTotal}`);
