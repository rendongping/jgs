import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取生成的侧边栏配置
const sidebarPath = path.join(__dirname, 'sidebar.json');
const sidebar = fs.existsSync(sidebarPath)
  ? JSON.parse(fs.readFileSync(sidebarPath, 'utf-8'))
  : {};

export default defineConfig({
  lang: 'zh-CN',
  title: '前端架构师知识库',
  description: '从初级到架构师的系统化前端学习资料库，覆盖基础、工程化、架构、领导力四大层级。',
  base: '/jgs/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#3c3c43' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/getting-started' },
      {
        text: '知识领域',
        items: [
          { text: '基础层', link: '/foundation/javascript' },
          { text: '工程化层', link: '/engineering/build-tools' },
          { text: '架构层', link: '/architecture/system-architecture' },
          { text: '领导力层', link: '/leadership/business' },
        ]
      },
      {
        text: '学习路径',
        items: [
          { text: '学习路线', link: '/guide/learning-routes' },
          { text: '能力自评', link: '/guide/self-assessment' },
        ]
      },
      {
        text: '测评',
        items: [
          { text: '客观题测评', link: '/learning-path/quizzes' },
          { text: '在线编程题', link: '/learning-path/coding-challenges' },
        ]
      },
      { text: '资源工具', link: '/resources/glossary' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rendongping/jgs' }
    ],

    footer: {
      message: '基于 MIT 协议发布',
      copyright: 'Copyright © 2026 前端架构师知识库'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    outline: {
      label: '页面导航',
      level: [2, 4]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdatedText: '更新时间',

    editLink: {
      pattern: 'https://github.com/rendongping/jgs/edit/master/website/:path',
      text: '在 GitHub 上编辑此页'
    }
  },

  markdown: {
    lineNumbers: true,
    config: (md) => {
      // 可以在这里注册自定义 markdown 插件
    }
  },

  vite: {
    // Vite 配置
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/echarts')) {
              return 'echarts';
            }
          }
        }
      },
      chunkSizeWarningLimit: 2000
    },
    ssr: {
      noExternal: ['echarts']
    },
    optimizeDeps: {
      include: ['echarts']
    }
  }
});
