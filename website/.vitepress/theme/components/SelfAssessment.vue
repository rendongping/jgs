<template>
  <div class="self-assessment">
    <div class="assessment-summary">
      <h3>能力分布概览</h3>
      <div class="summary-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalDomains }}</span>
          <span class="stat-label">知识领域</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ ratedCount }}</span>
          <span class="stat-label">已评估</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ averageLevel }}</span>
          <span class="stat-label">平均等级</span>
        </div>
      </div>
      <div class="radar-chart" ref="radarChartRef" v-if="isClient"></div>
      <div class="recommendation" v-if="weakAreas.length > 0">
        <strong>优先补强：</strong>
        <span v-for="(area, index) in weakAreas" :key="area.id">
          <a :href="area.link">{{ area.name }}</a>
          <span v-if="index < weakAreas.length - 1">、</span>
        </span>
      </div>
      <div class="assessment-quick-links">
        <a href="/learning-path/quizzes" class="quick-link">去客观题测评</a>
        <a href="/learning-path/coding-challenges" class="quick-link">去在线编程题</a>
        <a href="/learning-path/dashboard" class="quick-link">学习数据中心</a>
      </div>
    </div>

    <div class="evidence-panel" v-if="selectedDomainForEvidence">
      <div class="evidence-header">
        <strong>{{ selectedDomainForEvidence.name }} — 可观察行为证据</strong>
        <button class="evidence-close" @click="selectedDomainForEvidence = null" aria-label="关闭">×</button>
      </div>
      <div class="evidence-list">
        <div
          v-for="level in 6"
          :key="level"
          class="evidence-item"
          :class="{ active: ratings[selectedDomainForEvidence.id] === level }"
        >
          <span class="evidence-level">L{{ level }}</span>
          <span class="evidence-text">{{ evidenceFor(selectedDomainForEvidence.id, level) }}</span>
        </div>
      </div>
    </div>

    <div class="assessment-table-wrapper">
      <table class="assessment-table" role="grid" aria-label="能力自评表">
        <thead>
          <tr>
            <th scope="col">领域</th>
            <th v-for="level in 6" :key="level" scope="col">
              L{{ level }}
              <span class="level-hint" :title="levelDescriptions[level - 1]">{{ levelLabels[level - 1] }}</span>
            </th>
            <th scope="col">证据</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="domain in domains" :key="domain.id">
            <td class="domain-name">
              <a :href="domain.link">{{ domain.name }}</a>
            </td>
            <td v-for="level in 6" :key="level">
              <button
                class="level-btn"
                :class="{ active: ratings[domain.id] === level }"
                @click="setRating(domain.id, level)"
                :aria-label="`${domain.name} 等级 ${level}`"
                :aria-pressed="ratings[domain.id] === level"
                :title="evidenceFor(domain.id, level)"
              >
                {{ level }}
              </button>
            </td>
            <td class="evidence-cell">
              <button
                class="evidence-toggle"
                @click="toggleEvidence(domain)"
                :aria-label="`查看 ${domain.name} 行为证据`"
              >
                查看
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="assessment-actions">
      <button class="action-btn" @click="resetRatings">重置评估</button>
      <button class="action-btn primary" @click="saveRatings">保存评估</button>
      <button class="action-btn" @click="exportRatings">导出 JSON</button>
      <button class="action-btn" @click="triggerImport">导入 JSON</button>
      <input
        type="file"
        ref="fileInputRef"
        accept="application/json"
        style="display: none"
        @change="importRatings"
        aria-label="导入评估 JSON 文件"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useLearningData } from '../composables/useLearningData.js';

const levelLabels = ['了解', '理解', '应用', '分析', '评估', '创造'];
const levelDescriptions = [
  '听说过概念',
  '能解释概念',
  '能在项目中独立使用',
  '能指导他人并排查复杂问题',
  '能设计体系化方案',
  '能在组织层面推广并量化价值'
];

const domains = [
  // Level 01
  { id: 'javascript', name: 'JavaScript', link: '/foundation/javascript', level: 1 },
  { id: 'typescript', name: 'TypeScript', link: '/foundation/typescript', level: 1 },
  { id: 'browser', name: 'Browser', link: '/foundation/browser', level: 1 },
  { id: 'network', name: 'Network', link: '/foundation/network', level: 1 },
  { id: 'security', name: 'Security', link: '/foundation/security', level: 1 },
  { id: 'html-css', name: 'HTML/CSS', link: '/foundation/html-css', level: 1 },
  { id: 'a11y', name: 'Accessibility', link: '/foundation/a11y', level: 1 },
  // Level 02
  { id: 'build-tools', name: 'Build Tools', link: '/engineering/build-tools', level: 2 },
  { id: 'monorepo', name: 'Monorepo', link: '/engineering/monorepo', level: 2 },
  { id: 'ci-cd', name: 'CI/CD', link: '/engineering/ci-cd', level: 2 },
  { id: 'code-quality', name: 'Code Quality', link: '/engineering/code-quality', level: 2 },
  { id: 'design-system', name: 'Design System', link: '/engineering/design-system', level: 2 },
  { id: 'react', name: 'React', link: '/engineering/react', level: 2 },
  { id: 'vue', name: 'Vue', link: '/engineering/vue', level: 2 },
  { id: 'cross-platform', name: 'Cross Platform', link: '/engineering/cross-platform', level: 2 },
  { id: 'ai-engineering', name: 'AI Engineering', link: '/engineering/ai-engineering', level: 2 },
  { id: 'node-bff', name: 'Node.js/BFF', link: '/engineering/node-bff', level: 2 },
  { id: 'git-workflow', name: 'Git Workflow', link: '/engineering/git-workflow', level: 2 },
  { id: 'developer-experience', name: 'Developer Experience', link: '/engineering/developer-experience', level: 2 },
  // Level 03
  { id: 'system-architecture', name: 'System Architecture', link: '/architecture/system-architecture', level: 3 },
  { id: 'micro-frontend', name: 'Micro Frontend', link: '/architecture/micro-frontend', level: 3 },
  { id: 'performance', name: 'Performance', link: '/architecture/performance', level: 3 },
  { id: 'quality', name: 'Quality', link: '/architecture/quality', level: 3 },
  { id: 'data-state', name: 'Data & State', link: '/architecture/data-state', level: 3 },
  { id: 'observability', name: 'Observability', link: '/architecture/observability', level: 3 },
  { id: 'security-architecture', name: 'Security Architecture', link: '/architecture/security-architecture', level: 3 },
  { id: 'real-time', name: 'Real-time', link: '/architecture/real-time', level: 3 },
  { id: 'internationalization', name: 'Internationalization', link: '/architecture/internationalization', level: 3 },
  // Level 04
  { id: 'business', name: 'Business', link: '/leadership/business', level: 4 },
  { id: 'team', name: 'Team', link: '/leadership/team', level: 4 },
  { id: 'strategy', name: 'Strategy', link: '/leadership/strategy', level: 4 },
  { id: 'communication', name: 'Communication', link: '/leadership/communication', level: 4 },
  { id: 'project-management', name: 'Project Management', link: '/leadership/project-management', level: 4 },
  { id: 'hiring', name: 'Hiring', link: '/leadership/hiring', level: 4 },
];

const evidenceMap = {
  javascript: {
    1: '能列出 JS 基本数据类型与变量声明方式',
    2: '能解释闭包、原型链、事件循环等核心概念',
    3: '能独立完成 DOM 操作、异步请求与常见工具函数封装',
    4: '能手写符合 Promise/A+ 的 Promise，分析事件循环与异步边界',
    5: '能设计并落地框架级工具库，制定团队编码规范',
    6: '能推动语言标准与工程实践演进，输出具有行业影响力的方案'
  },
  typescript: {
    1: '能说明 TypeScript 与 JavaScript 的关系',
    2: '能解释类型注解、接口、泛型的基本用法',
    3: '能在项目中使用类型推断、联合类型与常用工具类型',
    4: '能编写条件类型、映射类型与类型守卫，解决复杂类型问题',
    5: '能设计类型安全的 SDK 与 DSL，建立类型约束规范',
    6: '能推动类型系统架构演进，提升大型项目可维护性'
  },
  browser: {
    1: '能说出浏览器的主要组成',
    2: '能解释渲染流程、事件冒泡捕获、跨域基本概念',
    3: '能使用 DevTools 定位性能与兼容性问题',
    4: '能分析关键渲染路径、重排重绘与内存泄漏根因',
    5: '能制定浏览器兼容性策略与性能优化体系',
    6: '能主导浏览器新技术落地，建立跨团队最佳实践'
  },
  network: {
    1: '能说出 HTTP 与 HTTPS 的区别',
    2: '能解释请求方法、状态码、缓存机制的基本含义',
    3: '能独立完成接口联调、错误处理与简单缓存配置',
    4: '能分析网络时延、并发限制与安全传输细节',
    5: '能设计高可用接口方案、CDN 策略与容灾机制',
    6: '能主导网络架构升级，量化传输性能与稳定性收益'
  },
  security: {
    1: '能列举常见前端安全问题',
    2: '能解释 XSS、CSRF、CSP 的基本原理',
    3: '能在项目中应用输入校验、转义与安全头部配置',
    4: '能进行安全漏洞审计并制定修复方案',
    5: '能建立安全开发流程与自动化检测体系',
    6: '能推动企业安全文化，主导安全治理与合规落地'
  },
  'build-tools': {
    1: '能说出常见构建工具名称',
    2: '能解释 Webpack/Vite/Rollup 的基本概念',
    3: '能配置常用 Loader、Plugin 与开发服务器',
    4: '能优化构建性能、拆分产物并排查构建问题',
    5: '能设计构建工程化体系，支撑多业务线需求',
    6: '能主导下一代构建方案选型，持续降低构建成本'
  },
  monorepo: {
    1: '能说明 Monorepo 与 Multirepo 的区别',
    2: '能解释 pnpm workspace、Changesets 等基础概念',
    3: '能在 Monorepo 中管理依赖、版本与脚本',
    4: '能设计模块边界、构建顺序与私有包发布流程',
    5: '能建立 Monorepo 治理规范与自动化变更管理',
    6: '能推动大规模 Monorepo 架构演进，提升协作效率'
  },
  'ci-cd': {
    1: '能说出 CI/CD 的基本含义',
    2: '能解释 GitHub Actions / GitLab CI 的基本流程',
    3: '能编写简单流水线实现构建、测试、部署',
    4: '能设计多环境部署、灰度发布与回滚策略',
    5: '能建立端到端交付体系与安全门禁',
    6: '能主导 DevOps 文化落地，持续优化交付效率'
  },
  'code-quality': {
    1: '能列举代码质量相关工具',
    2: '能解释 ESLint、Prettier、单元测试的作用',
    3: '能在项目中配置规范与测试并坚持执行',
    4: '能设计质量门禁、覆盖率目标与重构计划',
    5: '能建立团队代码质量治理体系',
    6: '能推动质量文化，将质量指标纳入组织考核'
  },
  'design-system': {
    1: '能说出设计系统的组成部分',
    2: '能解释组件库、Token、设计规范的关系',
    3: '能使用现有设计系统完成页面开发',
    4: '能参与设计系统组件开发与文档维护',
    5: '能主导设计系统架构与多平台适配',
    6: '能推动设计系统生态建设，提升跨团队一致性'
  },
  react: {
    1: '能说出 React 核心概念',
    2: '能解释组件、Props、State、生命周期/Hook',
    3: '能独立完成 React 项目开发与状态管理',
    4: '能优化渲染性能、封装高复用 Hooks',
    5: '能设计 React 应用架构与工程化规范',
    6: '能推动 React 技术栈演进，输出框架级方案'
  },
  vue: {
    1: '能说出 Vue 的核心特性',
    2: '能解释响应式、组件、指令与生命周期',
    3: '能独立完成 Vue 项目开发与状态管理',
    4: '能优化 Vue 性能、封装可复用组合式函数',
    5: '能设计 Vue 应用架构与工程化规范',
    6: '能推动 Vue 技术栈演进，主导大型项目落地'
  },
  'cross-platform': {
    1: '能列举常见跨端技术',
    2: '能解释 Hybrid、小程序、RN/Flutter 的基本原理',
    3: '能使用跨端框架完成业务开发',
    4: '能处理跨端性能、兼容性与原生通信问题',
    5: '能设计跨端架构与组件复用方案',
    6: '能主导跨端技术选型，构建跨业务线能力中台'
  },
  'ai-engineering': {
    1: '能说出 AI 工程化的基本概念',
    2: '能解释 Prompt Engineering、RAG、Agent 等概念',
    3: '能在项目中调用 LLM API 并实现简单应用',
    4: '能设计 AI 应用架构、评估与可观测方案',
    5: '能建立 AI 工程化流程与安全治理规范',
    6: '能推动 AI 与业务深度融合，量化 AI 投入产出'
  },
  'node-bff': {
    1: '能说明 Node.js 在前端的应用场景',
    2: '能解释 Express/Koa/Nest 的基本概念',
    3: '能独立完成 BFF 接口开发与部署',
    4: '能设计 BFF 架构、错误处理与性能优化',
    5: '能建立 Node 工程化与可观测体系',
    6: '能主导全栈架构演进，支撑业务高速增长'
  },
  'system-architecture': {
    1: '能列举常见架构模式',
    2: '能解释 MVC、MVVM、微前端等基本概念',
    3: '能在项目中应用成熟架构模式',
    4: '能主持架构评审，输出 ADR 并推动团队共识',
    5: '能设计企业级前端架构并权衡多维度方案',
    6: '能主导技术战略，推动组织级架构治理'
  },
  'micro-frontend': {
    1: '能说出微前端要解决什么问题',
    2: '能解释 qiankun、Module Federation 等方案',
    3: '能在项目中接入微前端框架',
    4: '能解决微前端样式隔离、通信、加载性能问题',
    5: '能设计微前端基座与拆分策略',
    6: '能主导微前端平台化建设，支撑多团队协作'
  },
  performance: {
    1: '能说出常见性能指标',
    2: '能解释 FCP、LCP、CLS 等指标含义',
    3: '能使用 Lighthouse 定位并修复基础性能问题',
    4: '能制定性能优化方案并量化收益',
    5: '能建立性能监控、预算与持续优化机制',
    6: '能主导性能体系建设，将性能融入组织流程'
  },
  quality: {
    1: '能列举软件质量相关维度',
    2: '能解释测试金字塔、自动化测试基本概念',
    3: '能编写单元测试与集成测试',
    4: '能设计质量保障体系与缺陷预防流程',
    5: '能建立全链路质量门禁与度量体系',
    6: '能推动质量文化，实现质量驱动的工程组织'
  },
  'data-state': {
    1: '能说出状态管理的作用',
    2: '能解释 Redux/Vuex/Pinia/Zustand 等概念',
    3: '能在项目中使用状态管理库',
    4: '能设计状态建模、异步流与性能优化方案',
    5: '能建立跨应用状态同步与数据一致性规范',
    6: '能主导数据架构演进，支撑复杂业务场景'
  },
  observability: {
    1: '能说出可观测性的三大支柱',
    2: '能解释日志、指标、追踪的基本概念',
    3: '能在项目中接入监控工具并配置告警',
    4: '能设计可观测方案并定位线上问题',
    5: '能建立统一可观测平台与故障响应流程',
    6: '能推动可观测文化，提升系统韧性与恢复能力'
  },
  business: {
    1: '能描述自己所负责的业务',
    2: '能理解需求背景与业务目标',
    3: '能与产品经理协作评估技术可行性',
    4: '能将业务目标拆解为技术方案与里程碑',
    5: '能通过技术驱动业务增长与创新',
    6: '能参与商业决策，用技术构建竞争壁垒'
  },
  team: {
    1: '能说明团队协作基本规范',
    2: '能进行有效的代码评审与技术分享',
    3: '能指导初级成员并推动任务落地',
    4: '能建设团队梯队与人才培养机制',
    5: '能打造高效技术团队与文化',
    6: '能制定组织人才战略，支撑业务长期发展'
  },
  strategy: {
    1: '能说出技术规划的重要性',
    2: '能理解团队或项目的技术目标',
    3: '能参与技术选型与优先级讨论',
    4: '能制定领域级技术演进路线',
    5: '能制定 1-3 年技术战略并推动落地',
    6: '能主导组织级技术战略，获得业务方高度认可'
  },
  'html-css': {
    1: '能说出 HTML 标签和 CSS 选择器的基本作用',
    2: '能解释语义化 HTML、盒模型、布局流等核心概念',
    3: '能独立实现响应式页面和常见 UI 组件',
    4: '能设计 CSS 架构（BEM/ITCSS/Atomic CSS）并优化渲染性能',
    5: '能制定团队 HTML/CSS 规范，推动可维护性与一致性',
    6: '能主导前端样式体系演进，构建跨项目设计基础设施'
  },
  a11y: {
    1: '能说出无障碍对用户体验的重要性',
    2: '能解释 WCAG、ARIA、键盘导航等基础概念',
    3: '能在项目中实现基本的可访问性修复',
    4: '能进行无障碍审计并制定改进计划',
    5: '能建立团队无障碍规范与测试流程',
    6: '能推动组织级无障碍文化，影响产品设计与开发标准'
  },
  'git-workflow': {
    1: '能说出 Git 的基本命令',
    2: '能解释分支、合并、冲突解决等基本概念',
    3: '能在团队中遵循既定分支策略开展工作',
    4: '能设计适合团队的 Git 工作流与 Code Review 流程',
    5: '能建立变更管理、发布节奏与大仓库治理规范',
    6: '能推动组织级研发协作标准，持续提升交付质量与效率'
  },
  'developer-experience': {
    1: '能说出开发体验的重要性',
    2: '能解释脚手架、IDE、文档等对效率的影响',
    3: '能配置本地开发环境并参与工具链优化',
    4: '能设计开发者工具链、文档体系与内循环优化方案',
    5: '能建立 DX 度量体系并持续改进研发效率',
    6: '能主导组织级开发者平台与文化，显著提升团队幸福感与产出'
  },
  'security-architecture': {
    1: '能列举前端安全威胁类型',
    2: '能解释威胁建模、SDL、供应链安全等基本概念',
    3: '能在项目中应用安全扫描、依赖审计与基础防御',
    4: '能设计前端安全架构并进行风险评估',
    5: '能建立安全开发生命周期与合规治理体系',
    6: '能主导企业级安全战略，推动零信任与隐私架构落地'
  },
  'real-time': {
    1: '能说出实时通信的常见方式',
    2: '能解释 WebSocket、SSE、长轮询的基本原理',
    3: '能在项目中实现简单的实时功能',
    4: '能设计长连接治理、消息可靠性与协同编辑方案',
    5: '能建立实时系统架构与可观测体系',
    6: '能主导大规模实时平台架构，支撑高并发与低延迟业务'
  },
  internationalization: {
    1: '能说出国际化与本地化的区别',
    2: '能解释 i18n、RTL、时区等基础概念',
    3: '能在项目中实现多语言切换与基础本地化',
    4: '能设计国际化架构、内容管理与本地化工作流',
    5: '能建立跨地区合规与多语言治理规范',
    6: '能主导全球化产品技术体系，支撑多市场快速扩张'
  },
  communication: {
    1: '能清楚表达个人技术观点',
    2: '能进行有效的技术文档写作与一对一沟通',
    3: '能在团队中主持技术讨论并推动共识',
    4: '能进行跨部门沟通、向上管理与冲突调解',
    5: '能通过公开演讲与写作建立技术影响力',
    6: '能成为组织技术布道者，推动文化与战略共识'
  },
  'project-management': {
    1: '能说明项目管理的基本概念',
    2: '能理解敏捷/Scrum、里程碑、风险管理等概念',
    3: '能参与项目计划并跟踪个人任务进度',
    4: '能主导中小型项目的排期、风险管控与交付',
    5: '能管理多项目组合，平衡资源与优先级',
    6: '能建立组织级项目治理体系，持续提升交付成功率'
  },
  hiring: {
    1: '能说明招聘对团队的重要性',
    2: '能参与面试并给出基础评价',
    3: '能独立进行技术面试并识别人才画像',
    4: '能设计招聘流程、面试评估与培养体系',
    5: '能建设团队梯队、晋升通道与绩效管理机制',
    6: '能制定组织人才战略，塑造高绩效技术文化与雇主品牌'
  }
};

const levelGroups = [
  { name: '基础层', key: 'level01', ids: domains.filter(d => d.level === 1).map(d => d.id) },
  { name: '工程化层', key: 'level02', ids: domains.filter(d => d.level === 2).map(d => d.id) },
  { name: '架构层', key: 'level03', ids: domains.filter(d => d.level === 3).map(d => d.id) },
  { name: '领导力层', key: 'level04', ids: domains.filter(d => d.level === 4).map(d => d.id) },
];

const { data, setRating: saveRating, exportData, importData, resetData } = useLearningData();
const isClient = ref(false);
const radarChartRef = ref(null);
const fileInputRef = ref(null);
const selectedDomainForEvidence = ref(null);
let chartInstance = null;
let echartsLib = null;

const ratings = computed(() => data.value?.ratings || {});
const totalDomains = computed(() => domains.length);

const ratedCount = computed(() => {
  return Object.values(ratings.value).filter(r => r > 0).length;
});

const averageLevel = computed(() => {
  const values = Object.values(ratings.value).filter(r => r > 0);
  if (values.length === 0) return '-';
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
});

const levelAverages = computed(() => {
  return levelGroups.map(group => {
    const values = group.ids
      .map(id => ratings.value[id])
      .filter(r => r > 0);
    if (values.length === 0) return 0;
    return Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1));
  });
});

const weakAreas = computed(() => {
  return domains
    .map(d => ({ ...d, score: ratings.value[d.id] || 0 }))
    .filter(d => d.score <= 2)
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map(d => ({ id: d.id, name: d.name, link: d.link }));
});

function evidenceFor(domainId, level) {
  return evidenceMap[domainId]?.[level] || '暂无描述';
}

function toggleEvidence(domain) {
  if (selectedDomainForEvidence.value?.id === domain.id) {
    selectedDomainForEvidence.value = null;
  } else {
    selectedDomainForEvidence.value = domain;
  }
}

function setRating(domainId, level) {
  saveRating(domainId, level);
  updateRadarChart();
}

function resetRatings() {
  if (typeof window !== 'undefined' && !window.confirm('确定要重置所有评估结果吗？')) {
    return;
  }
  resetData();
  updateRadarChart();
}

function saveRatings() {
  if (typeof window !== 'undefined') {
    window.alert('评估结果已自动保存到浏览器本地存储');
  }
}

function exportRatings() {
  if (typeof window === 'undefined') return;
  const blob = new Blob([JSON.stringify(exportData(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `frontend-architect-assessment-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function triggerImport() {
  fileInputRef.value?.click();
}

function importRatings(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      importData(e.target.result);
      updateRadarChart();
      if (typeof window !== 'undefined') {
        window.alert('评估数据导入成功');
      }
    } catch (err) {
      if (typeof window !== 'undefined') {
        window.alert('导入失败：文件格式不正确');
      }
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

async function initRadarChart() {
  if (!radarChartRef.value || typeof window === 'undefined') return;
  if (!echartsLib) {
    echartsLib = await import('echarts');
  }
  if (chartInstance) {
    chartInstance.dispose();
  }
  chartInstance = echartsLib.init(radarChartRef.value);
  updateRadarChart();
  window.addEventListener('resize', handleResize);
}

function updateRadarChart() {
  if (!chartInstance || !echartsLib) return;
  const averages = levelAverages.value;
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: () => {
        return levelGroups
          .map((group, i) => `${group.name}: ${averages[i] || 0}`)
          .join('<br>');
      }
    },
    radar: {
      indicator: levelGroups.map(group => ({
        name: group.name,
        max: 6
      })),
      radius: '65%',
      splitNumber: 6,
      axisName: {
        color: 'var(--vp-c-text-1)'
      },
      splitLine: {
        lineStyle: {
          color: 'var(--vp-c-divider)'
        }
      },
      splitArea: {
        areaStyle: {
          color: ['var(--vp-c-bg-soft)', 'var(--vp-c-bg)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'var(--vp-c-divider)'
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: averages,
            name: '当前能力',
            areaStyle: {
              color: 'rgba(100, 108, 255, 0.3)'
            },
            lineStyle: {
              color: 'var(--vp-c-brand-1)'
            },
            itemStyle: {
              color: 'var(--vp-c-brand-1)'
            }
          }
        ]
      }
    ]
  };
  chartInstance.setOption(option);
}

function handleResize() {
  chartInstance?.resize();
}

onMounted(() => {
  isClient.value = true;
  nextTick(() => {
    initRadarChart();
  });
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
  chartInstance?.dispose();
  chartInstance = null;
});
</script>

<style scoped>
.self-assessment {
  margin: 16px 0;
}

.assessment-summary {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.assessment-summary h3 {
  margin-top: 0;
  margin-bottom: 12px;
}

.summary-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.radar-chart {
  width: 100%;
  height: 320px;
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
}

.recommendation {
  font-size: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  margin-bottom: 12px;
}

.recommendation a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.recommendation a:hover {
  text-decoration: underline;
}

.assessment-quick-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.quick-link {
  font-size: 14px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.quick-link:hover {
  text-decoration: underline;
}

.evidence-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
}

.evidence-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.evidence-close {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  color: var(--vp-c-text-2);
}

.evidence-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evidence-item {
  display: flex;
  gap: 12px;
  padding: 10px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}

.evidence-item.active {
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.evidence-level {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  min-width: 32px;
}

.evidence-text {
  font-size: 14px;
  line-height: 1.5;
}

.assessment-table-wrapper {
  overflow-x: auto;
}

.assessment-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.assessment-table th,
.assessment-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 8px;
  text-align: center;
}

.assessment-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  white-space: nowrap;
}

.level-hint {
  display: block;
  font-size: 11px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.domain-name {
  text-align: left !important;
  white-space: nowrap;
}

.domain-name a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.domain-name a:hover {
  color: var(--vp-c-brand-1);
}

.level-btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.level-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.level-btn.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.evidence-cell {
  padding: 0 !important;
}

.evidence-toggle {
  width: 100%;
  height: 100%;
  padding: 8px;
  border: none;
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-size: 13px;
}

.evidence-toggle:hover {
  background: var(--vp-c-brand-soft);
}

.assessment-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 14px;
}

.action-btn.primary {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.action-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .assessment-table {
    font-size: 12px;
  }

  .level-btn {
    width: 24px;
    height: 24px;
    padding: 0;
  }

  .level-hint {
    display: none;
  }

  .radar-chart {
    height: 260px;
  }

  .evidence-item {
    flex-direction: column;
    gap: 4px;
  }

  .assessment-quick-links {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
