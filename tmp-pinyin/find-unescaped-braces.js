const fs = require('fs');
const file = process.argv[2] || 'interview-bank/by-domain/18-ai-engineering.md';
const txt = fs.readFileSync(file, 'utf8');
const lines = txt.split(/\r?\n/);
lines.forEach((l, i) => {
  if (/\{\{/.test(l) && !/`\{\{/.test(l)) {
    console.log(i + 1, l.trim().slice(0, 120));
  }
});
