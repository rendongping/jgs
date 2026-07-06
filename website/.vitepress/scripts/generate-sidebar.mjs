import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const websiteDir = path.resolve(__dirname, '../..');

function getInterviewDomainMap() {
  const domainsPath = path.join(websiteDir, 'interview-bank/data/domains.json');
  if (!fs.existsSync(domainsPath)) return {};
  try {
    const data = JSON.parse(fs.readFileSync(domainsPath, 'utf-8'));
    const map = {};
    for (const d of data.domains) {
      map[d.file.replace('.md', '')] = d.name;
    }
    return map;
  } catch (e) {
    return {};
  }
}

const interviewDomainMap = getInterviewDomainMap();

const interviewTypeMap = {
  '01-concept': '概念题',
  '02-code-analysis': '代码分析题',
  '03-coding': '手写代码题',
  '04-scenario': '场景设计题',
  '05-system-design': '系统设计题',
  '06-framework-source': '框架原理题',
  '07-performance': '性能优化题',
  '08-security': '安全题',
  '09-engineering': '工程化题',
  '10-soft-skill': '软技能题',
  '11-comprehensive': '综合开放题',
};

const interviewLevelMap = {
  'junior': '初级前端工程师',
  'senior': '高级前端工程师',
  'expert': '前端专家',
  'architect': '前端架构师',
};

const textMap = {
  'javascript': 'JavaScript 语言基础',
  'typescript': 'TypeScript 类型系统',
  'browser': '浏览器原理',
  'network': '计算机网络',
  'security': 'Web 安全',
  'html-css': 'HTML/CSS 工程化',
  'a11y': 'Web 无障碍',
  'data-structures-algorithms': '数据结构与算法',
  'design-patterns': '设计模式与软件工程基础',
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
  'git-workflow': 'Git 工作流与版本控制',
  'developer-experience': 'Developer Experience',
  'deployment-sre': '前端部署与运维（SRE）',
  'package-supply-chain': '前端包管理与供应链安全',
  'system-architecture': '系统架构设计',
  'micro-frontend': '微前端',
  'performance': '性能工程',
  'quality': '质量保障',
  'data-state': '数据与状态管理',
  'observability': '可观测性与稳定性工程',
  'security-architecture': '前端安全架构',
  'real-time': '实时与协同架构',
  'internationalization': '国际化与本地化架构',
  'visualization-graphics': '前端可视化与图形架构',
  'serverless-edge': 'Serverless / Edge 架构',
  'data-engineering': '前端数据工程',
  'business': '业务洞察',
  'team': '团队领导力',
  'strategy': '技术战略',
  'communication': '沟通表达与影响力',
  'project-management': '项目管理与交付',
  'hiring': '招聘培养与组织发展',
  'tech-branding': '技术品牌与社区影响力',
  'tech-governance': '技术治理与变革管理',
  'adr-001-monorepo-adoption': 'ADR-001：Monorepo 采用',
  'adr-002-ai-sdk-selection': 'ADR-002：AI SDK 选型',
  'code-review-sample': 'Code Review 示例',
  'performance-sop-sample': '性能优化 SOP 示例',
  'tech-debt-sample': '技术债登记册示例',
};

function getFiles(dir) {
  const fullDir = path.join(websiteDir, dir);
  if (!fs.existsSync(fullDir)) return [];

  const isInterviewBank = dir.startsWith('interview-bank/');

  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .sort((a, b) => {
      if (isInterviewBank) return a.localeCompare(b, undefined, { numeric: true });
      // 学习文档优先，然后是练习册，最后是面试题
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

      let text = textMap[name] || name;
      if (isInterviewBank) {
        text = interviewDomainMap[name] || interviewTypeMap[name] || interviewLevelMap[name] || name;
      } else if (name.endsWith('-exercises')) {
        const base = name.replace('-exercises', '');
        text = `${textMap[base] || base} — 练习册`;
      } else if (name.endsWith('-interview')) {
        const base = name.replace('-interview', '');
        text = `${textMap[base] || base} — 面试题`;
      }

      return { text, link: `/${dir}/${name}` };
    });
}

function getGroupedFiles(dir) {
  const files = getFiles(dir);
  const docs = [];
  const exercises = [];
  const interviews = [];

  for (const item of files) {
    const name = item.link.split('/').pop();
    if (name.endsWith('-exercises')) exercises.push(item);
    else if (name.endsWith('-interview')) interviews.push(item);
    else docs.push(item);
  }

  return [
    { text: '学习文档', collapsed: false, items: docs },
    { text: '练习册', collapsed: true, items: exercises },
    { text: '面试题', collapsed: true, items: interviews },
  ].filter(group => group.items.length > 0);
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
      items: getGroupedFiles('foundation')
    }
  ],
  '/engineering/': [
    {
      text: 'Level 02 工程化层',
      collapsed: false,
      items: getGroupedFiles('engineering')
    }
  ],
  '/architecture/': [
    {
      text: 'Level 03 架构层',
      collapsed: false,
      items: getGroupedFiles('architecture')
    }
  ],
  '/leadership/': [
    {
      text: 'Level 04 领导力层',
      collapsed: false,
      items: getGroupedFiles('leadership')
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
        { text: 'AI Native 数据看板', link: '/cases/ai-native-dashboard' },
        { text: '跨端电商平台架构演进', link: '/cases/cross-platform-commerce' },
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
    },
    {
      text: '示例',
      collapsed: true,
      items: getFiles('templates/examples')
    }
  ],
  '/contribute/': [
    {
      text: '社区',
      collapsed: false,
      items: [
        { text: '参与贡献', link: '/contribute' },
      ]
    }
  ],
  '/learning-path/': [
    {
      text: '学习数据',
      collapsed: false,
      items: [
        { text: '学习数据中心', link: '/learning-path/dashboard' },
      ]
    },
    {
      text: '测评与练习',
      collapsed: false,
      items: [
        { text: '客观题测评', link: '/learning-path/quizzes' },
        { text: '在线编程题', link: '/learning-path/coding-challenges' },
        { text: '面试题抽测', link: '/learning-path/interview-practice' },
      ]
    },
    {
      text: 'AI 助手',
      collapsed: false,
      items: [
        { text: 'AI 学习助手', link: '/learning-path/ai-assistant' },
      ]
    }
  ],
  '/interview-bank/': [
    {
      text: '前端面试题总库',
      collapsed: false,
      items: [
        { text: '题库首页', link: '/interview-bank/' },
        {
          text: '按岗位层级',
          collapsed: true,
          items: getFiles('interview-bank/by-level')
        },
        {
          text: '按题型',
          collapsed: true,
          items: getFiles('interview-bank/by-type')
        },
        {
          text: '按面试知识域',
          collapsed: true,
          items: getFiles('interview-bank/by-domain')
        },
        {
          text: '模拟试卷',
          collapsed: true,
          items: getFiles('interview-bank/mock-papers')
        },
        {
          text: '快问快答',
          collapsed: true,
          items: getFiles('interview-bank/flashcards')
        }
      ]
    }
  ],
};

const outputPath = path.join(__dirname, '../sidebar.json');
fs.writeFileSync(outputPath, JSON.stringify(sidebar, null, 2));
console.log('✅ 侧边栏配置已生成');
