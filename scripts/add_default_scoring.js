const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'interview-bank', 'by-domain');
const files = [
  '37-business.md','38-team.md','39-strategy.md','40-communication.md','41-project-management.md','42-hiring.md','43-tech-branding.md','44-tech-governance.md',
  '45-mini-program.md','46-harmonyos.md','47-flutter.md','48-electron.md','49-webassembly.md','50-webgpu-graphics.md','51-multimedia.md','52-low-code.md',
  '53-computer-science.md','54-behavioral.md','55-resume-interview.md','56-industry.md'
];

const DEFAULT_SCORING = `- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）`;

const DEFAULT_MISTAKES = `- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。`;

for (const f of files) {
  const filePath = path.join(BASE, f);
  let content = fs.readFileSync(filePath, 'utf8');
  const blocks = content.split(/\n(?=### FB-\d{2}-[A-Z]{2}-[BAPR]-\d{3})/);
  let updated = 0;
  const newBlocks = blocks.map(block => {
    if (!block.startsWith('### FB-')) return block;
    let changed = false;
    if (!block.includes('**评分维度**：')) {
      block = block.replace(
        /\n\*\*口头回答版\*\*：/,
        `\n**评分维度**：\n${DEFAULT_SCORING}\n\n**口头回答版**：`
      );
      changed = true;
    }
    if (!block.includes('**常见错误**：')) {
      block = block.replace(
        /\n\*\*口头回答版\*\*：/,
        `\n**常见错误**：\n${DEFAULT_MISTAKES}\n\n**口头回答版**：`
      );
      changed = true;
    }
    if (changed) updated++;
    return block;
  });
  fs.writeFileSync(filePath, newBlocks.join('\n'));
  console.log(`${f}: updated ${updated} blocks`);
}
