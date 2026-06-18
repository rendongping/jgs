import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const websiteDir = path.resolve(__dirname, '../..');

function getFiles(dir) {
  const fullDir = path.join(websiteDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .sort((a, b) => {
      // 学习文档优先，然后是练习册，最后是面试题
      const order = { '': 0, '-exercises': 1, '-interview': 2 };
      const getOrder = name => {
        const base = name.replace('.md', '');
        if (base.endsWith('-exercises')) return 1;
        if (base.endsWith('-interview')) return 2;
        return 0;
      };
      return getOrder(a) - getOrder(b);
    })
    .map(f => {
      const name = f.replace('.md', '');
      const textMap = {
        'javascript': 'JavaScript 语言基础',
        'typescript': 'TypeScript 类型系统',
        'browser': '浏览器原理',
        'network': '计算机网络',
        'security': 'Web 安全',
        'build-tools': '构建工具',
        'monorepo': 'Monorepo 工程管理',
        'ci-cd': 'CI/CD 与 DevOps',
        'code-quality': '代码质量与测试体系',
        'design-system': '设计体系与组件库',
        'react': 'React 原理与生态',
        'vue': 'Vue 原理与生态',
        'cross-platform': '跨端技术',
        'ai-engineering': 'AI 工程化',
        'node-bff': 'Node.js / BFF 服务端',
        'system-architecture': '系统架构设计',
        'micro-frontend': '微前端',
        'performance': '性能工程',
        'quality': '质量保障',
        'data-state': '数据与状态管理',
        'observability': '可观测性与稳定性工程',
        'business': '业务洞察',
        'team': '团队领导力',
        'strategy': '技术战略',
      };

      let text = textMap[name] || name;
      if (name.endsWith('-exercises')) {
        const base = name.replace('-exercises', '');
        text = `${textMap[base] || base} — 练习册`;
      } else if (name.endsWith('-interview')) {
        const base = name.replace('-interview', '');
        text = `${textMap[base] || base} — 面试题`;
      }

      return { text, link: `/${dir}/${name}` };
    });
}

const sidebar = {
  '/guide/': [
    {
      text: '开始学习',
      items: [
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '知识依赖图', link: '/guide/knowledge-map' },
        { text: '能力自评', link: '/guide/self-assessment' },
        { text: '学习路线', link: '/guide/learning-routes' },
        { text: '架构师工作流', link: '/guide/workflow' },
      ]
    }
  ],
  '/foundation/': [
    {
      text: 'Level 01 基础层',
      collapsed: false,
      items: getFiles('foundation')
    }
  ],
  '/engineering/': [
    {
      text: 'Level 02 工程化层',
      collapsed: false,
      items: getFiles('engineering')
    }
  ],
  '/architecture/': [
    {
      text: 'Level 03 架构层',
      collapsed: false,
      items: getFiles('architecture')
    }
  ],
  '/leadership/': [
    {
      text: 'Level 04 领导力层',
      collapsed: false,
      items: getFiles('leadership')
    }
  ],
  '/resources/': [
    {
      text: '资源与工具',
      collapsed: false,
      items: [
        { text: '术语表', link: '/resources/glossary' },
        { text: '技术雷达', link: '/resources/tech-radar' },
        { text: '精选资源', link: '/resources/resources' },
        { text: '通关项目手册', link: '/resources/project-handbook' },
        { text: '工作流与面试模拟', link: '/resources/architect-workflow' },
      ]
    }
  ],
  '/cases/': [
    {
      text: '跨领域综合案例',
      collapsed: false,
      items: [
        { text: '从输入 URL 到页面可交互', link: '/cases/from-url-to-interactive' },
        { text: '设计大型中后台系统', link: '/cases/large-admin-system' },
        { text: '一次完整的技术选型', link: '/cases/technology-selection' },
      ]
    }
  ],
  '/templates/': [
    {
      text: '工具箱模板',
      collapsed: false,
      items: [
        { text: 'ADR 模板', link: '/templates/adr' },
        { text: '技术选型评分卡', link: '/templates/tech-selection' },
        { text: 'Code Review 清单', link: '/templates/code-review' },
        { text: '性能优化 SOP', link: '/templates/performance-sop' },
        { text: '技术债登记册', link: '/templates/tech-debt' },
      ]
    }
  ],
};

const outputPath = path.join(__dirname, '../sidebar.json');
fs.writeFileSync(outputPath, JSON.stringify(sidebar, null, 2));
console.log('✅ 侧边栏配置已生成');
