const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const files = [
  '37-business.md','38-team.md','39-strategy.md','40-communication.md','41-project-management.md','42-hiring.md','43-tech-branding.md','44-tech-governance.md',
  '45-mini-program.md','46-harmonyos.md','47-flutter.md','48-electron.md','49-webassembly.md','50-webgpu-graphics.md','51-multimedia.md','52-low-code.md',
  '53-computer-science.md','54-behavioral.md','55-resume-interview.md','56-industry.md'
];

for (const f of files) {
  const filePath = path.join(BASE, f);
  const content = fs.readFileSync(filePath, 'utf8');
  // Match malformed headings: ### FB-XX-TT-L", ...
  const match = content.match(/\n### FB-\d{2}-[A-Z]{2}-[BAPR]",/);
  if (match) {
    const idx = match.index;
    const cleaned = content.substring(0, idx);
    fs.writeFileSync(filePath, cleaned);
    console.log(`Cleaned ${f}: removed ${content.length - cleaned.length} bytes`);
  } else {
    console.log(`No malformed content in ${f}`);
  }
}
