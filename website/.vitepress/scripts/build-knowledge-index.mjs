import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../../');
const publicDir = path.resolve(__dirname, '../../public');

const sourceDirs = [
  'docs',
  'level-01-foundation',
  'level-02-engineering',
  'level-03-architecture',
  'level-04-leadership',
  'templates',
];

const MAX_CHUNK_LENGTH = 800;

function walk(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizeUrl(filePath) {
  const rel = path.relative(rootDir, filePath).replace(/\\/g, '/');
  // docs/learning-path/xxx.md -> /guide/xxx or /resources/xxx etc.
  // level-01-foundation/F01-javascript/01-学习文档.md -> /foundation/javascript
  const contentMapping = {
    'docs/learning-path/01-knowledge-dependency-map.md': '/guide/knowledge-map',
    'docs/learning-path/02-capability-self-assessment.md': '/guide/self-assessment',
    'docs/learning-path/03-learning-routes.md': '/guide/learning-routes',
    'docs/glossary.md': '/resources/glossary',
    'docs/tech-radar.md': '/resources/tech-radar',
    'docs/resources.md': '/resources/resources',
    'docs/project-handbook.md': '/resources/project-handbook',
    'docs/architect-workflow.md': '/resources/architect-workflow',
    'docs/CONTRIBUTING.md': '/resources/contributing',
    'docs/STYLE-GUIDE.md': '/resources/style-guide',
  };
  if (contentMapping[rel]) return contentMapping[rel];

  if (rel.startsWith('docs/case-studies/')) {
    const name = path.basename(rel, '.md');
    return `/cases/${name}`;
  }
  if (rel.startsWith('templates/examples/')) {
    const name = path.basename(rel, '.md');
    return `/templates/examples/${name}`;
  }
  if (rel.startsWith('templates/')) {
    const name = path.basename(rel, '.md');
    return `/templates/${name}`;
  }
  if (rel.startsWith('level-')) {
    const parts = rel.split('/');
    if (parts.length >= 3) {
      const domainId = parts[1];
      const domain = domainId.replace(/^F\d+-|^E\d+-|^A\d+-|^L\d+-/, '');
      const fileName = parts[2];
      const groupMap = {
        'level-01-foundation': 'foundation',
        'level-02-engineering': 'engineering',
        'level-03-architecture': 'architecture',
        'level-04-leadership': 'leadership',
      };
      const group = groupMap[parts[0]];
      if (fileName.startsWith('01-')) {
        return `/${group}/${domain}`;
      } else if (fileName.startsWith('02-')) {
        return `/${group}/${domain}-exercises`;
      } else if (fileName.startsWith('03-')) {
        return `/${group}/${domain}-interview`;
      }
    }
  }
  return '';
}

function extractChunks(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
  const lines = content.split('\n');
  const chunks = [];
  let current = null;

  function flush() {
    if (current && current.text.trim()) {
      const text = current.text.trim();
      if (text.length > MAX_CHUNK_LENGTH) {
        for (let i = 0; i < text.length; i += MAX_CHUNK_LENGTH) {
          chunks.push({
            ...current,
            text: text.slice(i, i + MAX_CHUNK_LENGTH),
          });
        }
      } else {
        chunks.push(current);
      }
    }
    current = null;
  }

  for (const line of lines) {
    if (line.startsWith('# ')) {
      flush();
      current = {
        title: line.replace(/^#\s*/, '').trim(),
        heading: '',
        text: line + '\n',
        url: normalizeUrl(filePath),
      };
    } else if (line.startsWith('## ') || line.startsWith('### ')) {
      flush();
      current = {
        title: current ? current.title : '',
        heading: line.replace(/^#+\s*/, '').trim(),
        text: line + '\n',
        url: normalizeUrl(filePath),
      };
    } else if (current) {
      current.text += line + '\n';
    }
  }
  flush();

  return chunks;
}

export function buildIndex() {
  const chunks = [];
  for (const dir of sourceDirs) {
    const fullDir = path.join(rootDir, dir);
    const files = walk(fullDir);
    for (const file of files) {
      const fileChunks = extractChunks(file);
      chunks.push(...fileChunks);
    }
  }

  const index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    totalChunks: chunks.length,
    chunks: chunks.map((c, i) => ({
      id: i,
      title: c.title,
      heading: c.heading,
      text: c.text.slice(0, 1200),
      url: c.url,
    })).filter(c => c.text.length > 30),
  };

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, 'knowledge-index.json'), JSON.stringify(index, null, 2));
  console.log(`✅ 已生成知识库索引：${index.totalChunks} 个片段`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildIndex();
}
