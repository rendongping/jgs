import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import MarkdownIt from 'markdown-it';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../../../');
const websiteDir = path.resolve(__dirname, '../../');
const siteBaseUrl = 'https://rendongping.github.io/jgs';

const md = new MarkdownIt({ html: true, breaks: false, linkify: false });

// 定义内容映射规则：从原项目路径到 website 路径
const contentMapping = [
  // Level 01 基础层
  { from: 'level-01-foundation/F01-javascript/01-学习文档.md', to: 'foundation/javascript.md' },
  { from: 'level-01-foundation/F01-javascript/02-练习册.md', to: 'foundation/javascript-exercises.md' },
  { from: 'level-01-foundation/F01-javascript/03-面试题.md', to: 'foundation/javascript-interview.md' },
  { from: 'level-01-foundation/F02-typescript/01-学习文档.md', to: 'foundation/typescript.md' },
  { from: 'level-01-foundation/F02-typescript/02-练习册.md', to: 'foundation/typescript-exercises.md' },
  { from: 'level-01-foundation/F02-typescript/03-面试题.md', to: 'foundation/typescript-interview.md' },
  { from: 'level-01-foundation/F03-browser/01-学习文档.md', to: 'foundation/browser.md' },
  { from: 'level-01-foundation/F03-browser/02-练习册.md', to: 'foundation/browser-exercises.md' },
  { from: 'level-01-foundation/F03-browser/03-面试题.md', to: 'foundation/browser-interview.md' },
  { from: 'level-01-foundation/F04-network/01-学习文档.md', to: 'foundation/network.md' },
  { from: 'level-01-foundation/F04-network/02-练习册.md', to: 'foundation/network-exercises.md' },
  { from: 'level-01-foundation/F04-network/03-面试题.md', to: 'foundation/network-interview.md' },
  { from: 'level-01-foundation/F05-security/01-学习文档.md', to: 'foundation/security.md' },
  { from: 'level-01-foundation/F05-security/02-练习册.md', to: 'foundation/security-exercises.md' },
  { from: 'level-01-foundation/F05-security/03-面试题.md', to: 'foundation/security-interview.md' },

  // Level 02 工程化层
  { from: 'level-02-engineering/E01-build-tools/01-学习文档.md', to: 'engineering/build-tools.md' },
  { from: 'level-02-engineering/E01-build-tools/02-练习册.md', to: 'engineering/build-tools-exercises.md' },
  { from: 'level-02-engineering/E01-build-tools/03-面试题.md', to: 'engineering/build-tools-interview.md' },
  { from: 'level-02-engineering/E02-monorepo/01-学习文档.md', to: 'engineering/monorepo.md' },
  { from: 'level-02-engineering/E02-monorepo/02-练习册.md', to: 'engineering/monorepo-exercises.md' },
  { from: 'level-02-engineering/E02-monorepo/03-面试题.md', to: 'engineering/monorepo-interview.md' },
  { from: 'level-02-engineering/E03-ci-cd/01-学习文档.md', to: 'engineering/ci-cd.md' },
  { from: 'level-02-engineering/E03-ci-cd/02-练习册.md', to: 'engineering/ci-cd-exercises.md' },
  { from: 'level-02-engineering/E03-ci-cd/03-面试题.md', to: 'engineering/ci-cd-interview.md' },
  { from: 'level-02-engineering/E04-code-quality/01-学习文档.md', to: 'engineering/code-quality.md' },
  { from: 'level-02-engineering/E04-code-quality/02-练习册.md', to: 'engineering/code-quality-exercises.md' },
  { from: 'level-02-engineering/E04-code-quality/03-面试题.md', to: 'engineering/code-quality-interview.md' },
  { from: 'level-02-engineering/E05-design-system/01-学习文档.md', to: 'engineering/design-system.md' },
  { from: 'level-02-engineering/E05-design-system/02-练习册.md', to: 'engineering/design-system-exercises.md' },
  { from: 'level-02-engineering/E05-design-system/03-面试题.md', to: 'engineering/design-system-interview.md' },
  { from: 'level-02-engineering/E06-react/01-学习文档.md', to: 'engineering/react.md' },
  { from: 'level-02-engineering/E06-react/02-练习册.md', to: 'engineering/react-exercises.md' },
  { from: 'level-02-engineering/E06-react/03-面试题.md', to: 'engineering/react-interview.md' },
  { from: 'level-02-engineering/E07-vue/01-学习文档.md', to: 'engineering/vue.md' },
  { from: 'level-02-engineering/E07-vue/02-练习册.md', to: 'engineering/vue-exercises.md' },
  { from: 'level-02-engineering/E07-vue/03-面试题.md', to: 'engineering/vue-interview.md' },
  { from: 'level-02-engineering/E08-cross-platform/01-学习文档.md', to: 'engineering/cross-platform.md' },
  { from: 'level-02-engineering/E08-cross-platform/02-练习册.md', to: 'engineering/cross-platform-exercises.md' },
  { from: 'level-02-engineering/E08-cross-platform/03-面试题.md', to: 'engineering/cross-platform-interview.md' },
  { from: 'level-02-engineering/E09-ai-engineering/01-学习文档.md', to: 'engineering/ai-engineering.md' },
  { from: 'level-02-engineering/E09-ai-engineering/02-练习册.md', to: 'engineering/ai-engineering-exercises.md' },
  { from: 'level-02-engineering/E09-ai-engineering/03-面试题.md', to: 'engineering/ai-engineering-interview.md' },
  { from: 'level-02-engineering/E10-node-bff/01-学习文档.md', to: 'engineering/node-bff.md' },
  { from: 'level-02-engineering/E10-node-bff/02-练习册.md', to: 'engineering/node-bff-exercises.md' },
  { from: 'level-02-engineering/E10-node-bff/03-面试题.md', to: 'engineering/node-bff-interview.md' },

  // Level 03 架构层
  { from: 'level-03-architecture/A01-system-architecture/01-学习文档.md', to: 'architecture/system-architecture.md' },
  { from: 'level-03-architecture/A01-system-architecture/02-练习册.md', to: 'architecture/system-architecture-exercises.md' },
  { from: 'level-03-architecture/A01-system-architecture/03-面试题.md', to: 'architecture/system-architecture-interview.md' },
  { from: 'level-03-architecture/A02-micro-frontend/01-学习文档.md', to: 'architecture/micro-frontend.md' },
  { from: 'level-03-architecture/A02-micro-frontend/02-练习册.md', to: 'architecture/micro-frontend-exercises.md' },
  { from: 'level-03-architecture/A02-micro-frontend/03-面试题.md', to: 'architecture/micro-frontend-interview.md' },
  { from: 'level-03-architecture/A03-performance/01-学习文档.md', to: 'architecture/performance.md' },
  { from: 'level-03-architecture/A03-performance/02-练习册.md', to: 'architecture/performance-exercises.md' },
  { from: 'level-03-architecture/A03-performance/03-面试题.md', to: 'architecture/performance-interview.md' },
  { from: 'level-03-architecture/A04-quality/01-学习文档.md', to: 'architecture/quality.md' },
  { from: 'level-03-architecture/A04-quality/02-练习册.md', to: 'architecture/quality-exercises.md' },
  { from: 'level-03-architecture/A04-quality/03-面试题.md', to: 'architecture/quality-interview.md' },
  { from: 'level-03-architecture/A05-data-state/01-学习文档.md', to: 'architecture/data-state.md' },
  { from: 'level-03-architecture/A05-data-state/02-练习册.md', to: 'architecture/data-state-exercises.md' },
  { from: 'level-03-architecture/A05-data-state/03-面试题.md', to: 'architecture/data-state-interview.md' },
  { from: 'level-03-architecture/A06-observability/01-学习文档.md', to: 'architecture/observability.md' },
  { from: 'level-03-architecture/A06-observability/02-练习册.md', to: 'architecture/observability-exercises.md' },
  { from: 'level-03-architecture/A06-observability/03-面试题.md', to: 'architecture/observability-interview.md' },

  // Level 04 领导力层
  { from: 'level-04-leadership/L01-business/01-学习文档.md', to: 'leadership/business.md' },
  { from: 'level-04-leadership/L01-business/02-练习册.md', to: 'leadership/business-exercises.md' },
  { from: 'level-04-leadership/L01-business/03-面试题.md', to: 'leadership/business-interview.md' },
  { from: 'level-04-leadership/L02-team/01-学习文档.md', to: 'leadership/team.md' },
  { from: 'level-04-leadership/L02-team/02-练习册.md', to: 'leadership/team-exercises.md' },
  { from: 'level-04-leadership/L02-team/03-面试题.md', to: 'leadership/team-interview.md' },
  { from: 'level-04-leadership/L03-strategy/01-学习文档.md', to: 'leadership/strategy.md' },
  { from: 'level-04-leadership/L03-strategy/02-练习册.md', to: 'leadership/strategy-exercises.md' },
  { from: 'level-04-leadership/L03-strategy/03-面试题.md', to: 'leadership/strategy-interview.md' },

  // docs 资源文档
  { from: 'docs/glossary.md', to: 'resources/glossary.md' },
  { from: 'docs/tech-radar.md', to: 'resources/tech-radar.md' },
  { from: 'docs/resources.md', to: 'resources/resources.md' },
  { from: 'docs/project-handbook.md', to: 'resources/project-handbook.md' },
  { from: 'docs/architect-workflow.md', to: 'resources/architect-workflow.md' },
  { from: 'docs/case-studies/01-from-url-to-interactive.md', to: 'cases/from-url-to-interactive.md' },
  { from: 'docs/case-studies/02-large-admin-system.md', to: 'cases/large-admin-system.md' },
  { from: 'docs/case-studies/03-technology-selection.md', to: 'cases/technology-selection.md' },
  { from: 'docs/learning-path/01-knowledge-dependency-map.md', to: 'guide/knowledge-map.md' },
  { from: 'docs/learning-path/02-capability-self-assessment.md', to: 'guide/self-assessment.md' },
  { from: 'docs/learning-path/03-learning-routes.md', to: 'guide/learning-routes.md' },

  // 工具模板
  { from: 'templates/ADR-TEMPLATE.md', to: 'templates/adr.md' },
  { from: 'templates/TECH-SELECTION-SCORECARD.md', to: 'templates/tech-selection.md' },
  { from: 'templates/CODE-REVIEW-CHECKLIST.md', to: 'templates/code-review.md' },
  { from: 'templates/PERFORMANCE-OPTIMIZATION-SOP.md', to: 'templates/performance-sop.md' },
  { from: 'templates/TECH-DEBT-REGISTER.md', to: 'templates/tech-debt.md' },
];

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function syncContent() {
  let syncedCount = 0;

  for (const { from, to } of contentMapping) {
    const sourcePath = path.join(rootDir, from);
    const targetPath = path.join(websiteDir, to);

    if (!fs.existsSync(sourcePath)) {
      console.warn(`⚠️  源文件不存在：${from}`);
      continue;
    }

    ensureDir(targetPath);
    fs.copyFileSync(sourcePath, targetPath);

    // 对特定文件插入增强组件
    postProcess(targetPath, from);

    syncedCount++;
  }

  console.log(`✅ 已同步 ${syncedCount} 个文件`);
  generateSitemap();
}

function generateSitemap() {
  const urls = new Set();
  const addUrl = url => urls.add(url.replace(/\/$/, '') || '/');

  addUrl('/');
  addUrl('/guide/getting-started');
  addUrl('/guide/knowledge-map');
  addUrl('/guide/self-assessment');
  addUrl('/guide/learning-routes');
  addUrl('/guide/workflow');

  for (const { to } of contentMapping) {
    if (to.endsWith('.md')) {
      addUrl('/' + to.replace(/\.md$/, ''));
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...urls].sort().map(url =>
      `  <url>\n` +
      `    <loc>${siteBaseUrl}${url}</loc>\n` +
      `    <changefreq>weekly</changefreq>\n` +
      `    <priority>${url === '/' ? '1.0' : '0.7'}</priority>\n` +
      `  </url>`
    ).join('\n') +
    '\n</urlset>\n';

  const publicDir = path.join(websiteDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ 已生成 sitemap.xml');
}

function escapeVueInterpolationsInCode(content) {
  // 对 fenced code block 中的 {{ }} 做转义，避免被 Vue SSR 解析为模板插值
  content = content.replace(
    /(```[a-zA-Z0-9+-]*\n)([\s\S]*?)(```)/g,
    (match, opener, code, closer) => {
      return (
        opener +
        code
          .replace(/\{\{/g, '&#123;&#123;')
          .replace(/\}\}/g, '&#125;&#125;') +
        closer
      );
    }
  );

  // 对行内代码中的 {{ }} 做同样转义
  content = content.replace(/`([^`]*)`/g, (match, code) => {
    return (
      '`' +
      code
        .replace(/\{\{/g, '&#123;&#123;')
        .replace(/\}\}/g, '&#125;&#125;') +
      '`'
    );
  });

  return content;
}

function escapeProp(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '&#10;')
    .replace(/\r/g, '');
}

function base64Encode(value) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'utf-8').toString('base64');
  }
  return btoa(unescape(encodeURIComponent(value)));
}

function getDifficultyBySection(title) {
  if (title.includes('基础')) return '🟢';
  if (title.includes('进阶')) return '🟡';
  if (title.includes('高级') || title.includes('深入')) return '🔴';
  return '';
}

function transformInterviewFile(content, slug) {
  // 统一处理 CRLF / LF
  content = content.replace(/\r\n/g, '\n');
  const lines = content.split('\n');
  const output = [];
  let i = 0;

  // 1. 保留标题与描述部分（直到第一个 ## ）
  while (i < lines.length && !lines[i].startsWith('# ')) {
    output.push(lines[i]);
    i++;
  }
  if (i >= lines.length) return content;
  output.push(lines[i]); // # 标题
  i++;

  while (i < lines.length && !lines[i].startsWith('## ')) {
    output.push(lines[i]);
    i++;
  }

  // 2. 按章节处理
  while (i < lines.length) {
    if (lines[i].startsWith('## ')) {
      const sectionTitle = lines[i].substring(3).trim();
      const difficulty = getDifficultyBySection(sectionTitle);

      output.push('');
      output.push(lines[i]);
      i++;

      const sectionBody = [];
      while (i < lines.length && !lines[i].startsWith('## ')) {
        sectionBody.push(lines[i]);
        i++;
      }

      const hasQuestions = sectionBody.some(line => line.startsWith('### '));
      if (hasQuestions) {
        output.push(...transformQuestions(sectionBody, slug, difficulty));
      } else {
        output.push(...sectionBody);
      }
    } else {
      output.push(lines[i]);
      i++;
    }
  }

  return output.join('\n');
}

function transformQuestions(bodyLines, slug, difficulty) {
  const output = [];
  let currentQuestion = [];
  let currentQNum = '';
  let currentTitle = '';

  function flushQuestion() {
    if (currentQuestion.length === 0 || !currentQNum) {
      currentQuestion = [];
      currentQNum = '';
      currentTitle = '';
      return;
    }

    const qContent = currentQuestion.join('\n');

    const answerRegex = /\n?\*\*参考答案\*\*[：:]?\n/;
    const dimensionRegex = /\n?\*\*评分维度\*\*[：:]?\n/;

    const answerIdx = qContent.search(answerRegex);
    const dimensionIdx = qContent.search(dimensionRegex);

    let questionBody = '';
    let answerBody = '';
    let dimensionBody = '';

    if (answerIdx !== -1) {
      questionBody = qContent.substring(0, answerIdx).trim();
      if (dimensionIdx !== -1) {
        answerBody = qContent.substring(answerIdx, dimensionIdx).replace(answerRegex, '').trim();
        dimensionBody = qContent.substring(dimensionIdx).replace(dimensionRegex, '').trim();
      } else {
        answerBody = qContent.substring(answerIdx).replace(answerRegex, '').trim();
      }
    } else {
      questionBody = qContent.trim();
    }

    // 移除题目标题本身
    questionBody = questionBody.replace(/^### \d+\. .*$/m, '').trim();

    const id = `${slug}-q${currentQNum}`;
    const title = `${currentQNum}. ${currentTitle}`;

    const answerMarkdown = [
      answerBody && '**参考答案：**\n\n' + answerBody,
      dimensionBody && '**评分维度：**\n\n' + dimensionBody
    ].filter(Boolean).join('\n\n');

    const questionHtml = md.render(questionBody || ' ');
    const answerHtml = md.render(answerMarkdown || ' ');

    output.push('');
    output.push(
      `<InterviewCard id="${id}" title="${escapeProp(title)}" difficulty="${difficulty}" questionBase64="${base64Encode(questionHtml)}" answerBase64="${base64Encode(answerHtml)}" />`
    );

    currentQuestion = [];
    currentQNum = '';
    currentTitle = '';
  }

  for (const line of bodyLines) {
    if (line.startsWith('### ')) {
      flushQuestion();
      const match = line.match(/^### (\d+)\.\s*(.*)$/);
      if (match) {
        currentQNum = match[1];
        currentTitle = match[2];
      } else {
        currentQNum = '0';
        currentTitle = line.substring(4);
      }
      currentQuestion.push(line);
    } else if (currentQuestion.length > 0) {
      currentQuestion.push(line);
    }
  }

  flushQuestion();

  return output;
}

function postProcess(filePath, from) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // 在第一段描述后插入增强组件
  if (from.includes('01-knowledge-dependency-map.md')) {
    if (!content.includes('<KnowledgeGraph')) {
      content = content.replace(
        /^(# .*\n\n> .*\n)/,
        '$1\n<KnowledgeGraph />\n'
      );
    }
  }

  if (from.includes('02-capability-self-assessment.md')) {
    if (!content.includes('<SelfAssessment')) {
      content = content.replace(
        /^(# .*\n\n> .*\n)/,
        '$1\n<SelfAssessment />\n'
      );
    }
  }

  if (from.includes('03-learning-routes.md')) {
    if (!content.includes('<LearningPath')) {
      content = content.replace(
        /^(# .*\n\n> .*\n)/,
        '$1\n<LearningPath />\n'
      );
    }
  }

  // 通用转义：代码块/行内代码中的 Vue 模板表达式，避免 SSR 构建失败
  content = escapeVueInterpolationsInCode(content);

  // 将 Shiki 不支持的 wxml 语言映射为 xml，消除构建警告
  content = content.replace(/```wxml\n/g, '```xml\n');

  // 对面试题文件做卡片化转换
  if (from.includes('/03-面试题.md') && filePath.endsWith('-interview.md')) {
    const slug = path.basename(filePath, '.md');
    content = transformInterviewFile(content, slug);
  }

  // 在学习文档页面底部注入完成标记与进度追踪
  const baseName = path.basename(filePath, '.md');
  const normalizedFilePath = filePath.replace(/\\/g, '/');
  const isLearningDoc =
    /\/(foundation|engineering|architecture|leadership)\//.test(normalizedFilePath) &&
    !baseName.endsWith('-exercises') &&
    !baseName.endsWith('-interview');

  if (isLearningDoc && !content.includes('<MarkComplete')) {
    const domainId = baseName;
    content += `\n\n---\n\n## 本领域学习进度\n\n<MarkComplete domainId="${domainId}" />\n<ProgressTracker />\n`;
  }

  fs.writeFileSync(filePath, content);
}

syncContent();
