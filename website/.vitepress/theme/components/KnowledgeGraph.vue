<template>
  <div class="knowledge-graph">
    <div class="graph-controls">
      <button
        v-for="level in levels"
        :key="level.value"
        class="level-filter"
        :class="{ active: activeLevels.includes(level.value) }"
        @click="toggleLevel(level.value)"
      >
        {{ level.label }}
      </button>
      <button class="level-filter" @click="resetView">重置视图</button>
    </div>
    <div ref="chartRef" class="chart-container"></div>
    <p class="graph-tip">提示：点击节点可跳转到对应领域，拖拽可调整布局。</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const chartRef = ref(null);
let chartInstance = null;

const levels = [
  { value: 1, label: '基础层', color: '#52c41a' },
  { value: 2, label: '工程化层', color: '#1890ff' },
  { value: 3, label: '架构层', color: '#722ed1' },
  { value: 4, label: '领导力层', color: '#eb2f96' },
];

const activeLevels = ref([1, 2, 3, 4]);

const nodes = [
  // Level 1
  { id: 'javascript', name: 'JavaScript', level: 1, x: 100, y: 400 },
  { id: 'typescript', name: 'TypeScript', level: 1, x: 250, y: 350 },
  { id: 'browser', name: 'Browser', level: 1, x: 400, y: 400 },
  { id: 'network', name: 'Network', level: 1, x: 550, y: 350 },
  { id: 'security', name: 'Security', level: 1, x: 700, y: 400 },
  // Level 2
  { id: 'build-tools', name: 'Build Tools', level: 2, x: 100, y: 250 },
  { id: 'monorepo', name: 'Monorepo', level: 2, x: 220, y: 200 },
  { id: 'ci-cd', name: 'CI/CD', level: 2, x: 340, y: 250 },
  { id: 'code-quality', name: 'Code Quality', level: 2, x: 460, y: 200 },
  { id: 'design-system', name: 'Design System', level: 2, x: 580, y: 250 },
  { id: 'react', name: 'React', level: 2, x: 160, y: 150 },
  { id: 'vue', name: 'Vue', level: 2, x: 280, y: 120 },
  { id: 'cross-platform', name: 'Cross Platform', level: 2, x: 400, y: 150 },
  { id: 'ai-engineering', name: 'AI Engineering', level: 2, x: 520, y: 120 },
  { id: 'node-bff', name: 'Node.js/BFF', level: 2, x: 640, y: 150 },
  // Level 3
  { id: 'system-architecture', name: 'System Architecture', level: 3, x: 150, y: 50 },
  { id: 'micro-frontend', name: 'Micro Frontend', level: 3, x: 300, y: 20 },
  { id: 'performance', name: 'Performance', level: 3, x: 450, y: 50 },
  { id: 'quality', name: 'Quality', level: 3, x: 600, y: 20 },
  { id: 'data-state', name: 'Data & State', level: 3, x: 200, y: -30 },
  { id: 'observability', name: 'Observability', level: 3, x: 500, y: -30 },
  // Level 4
  { id: 'business', name: 'Business', level: 4, x: 250, y: -120 },
  { id: 'team', name: 'Team', level: 4, x: 400, y: -150 },
  { id: 'strategy', name: 'Strategy', level: 4, x: 550, y: -120 },
];

const edges = [
  // Level 1 internal
  { source: 'javascript', target: 'typescript' },
  { source: 'javascript', target: 'browser' },
  { source: 'javascript', target: 'network' },
  { source: 'javascript', target: 'security' },
  { source: 'browser', target: 'security' },
  { source: 'network', target: 'security' },
  // Level 1 -> Level 2
  { source: 'javascript', target: 'build-tools' },
  { source: 'javascript', target: 'react' },
  { source: 'javascript', target: 'vue' },
  { source: 'typescript', target: 'build-tools' },
  { source: 'typescript', target: 'react' },
  { source: 'typescript', target: 'vue' },
  { source: 'network', target: 'node-bff' },
  { source: 'build-tools', target: 'monorepo' },
  { source: 'build-tools', target: 'ci-cd' },
  { source: 'build-tools', target: 'code-quality' },
  { source: 'build-tools', target: 'design-system' },
  { source: 'react', target: 'cross-platform' },
  { source: 'vue', target: 'cross-platform' },
  { source: 'react', target: 'ai-engineering' },
  { source: 'vue', target: 'ai-engineering' },
  // Level 2 -> Level 3
  { source: 'react', target: 'system-architecture' },
  { source: 'vue', target: 'system-architecture' },
  { source: 'monorepo', target: 'micro-frontend' },
  { source: 'design-system', target: 'micro-frontend' },
  { source: 'react', target: 'micro-frontend' },
  { source: 'vue', target: 'micro-frontend' },
  { source: 'browser', target: 'performance' },
  { source: 'build-tools', target: 'performance' },
  { source: 'react', target: 'performance' },
  { source: 'vue', target: 'performance' },
  { source: 'code-quality', target: 'quality' },
  { source: 'ci-cd', target: 'quality' },
  { source: 'observability', target: 'quality' },
  { source: 'react', target: 'data-state' },
  { source: 'vue', target: 'data-state' },
  { source: 'node-bff', target: 'data-state' },
  { source: 'performance', target: 'observability' },
  { source: 'ci-cd', target: 'observability' },
  { source: 'node-bff', target: 'observability' },
  // Level 3 -> Level 4
  { source: 'system-architecture', target: 'business' },
  { source: 'system-architecture', target: 'team' },
  { source: 'system-architecture', target: 'strategy' },
  { source: 'performance', target: 'strategy' },
  { source: 'quality', target: 'team' },
  { source: 'observability', target: 'strategy' },
  { source: 'business', target: 'strategy' },
  { source: 'team', target: 'strategy' },
];

const linkMap = {
  javascript: '/foundation/javascript',
  typescript: '/foundation/typescript',
  browser: '/foundation/browser',
  network: '/foundation/network',
  security: '/foundation/security',
  'build-tools': '/engineering/build-tools',
  monorepo: '/engineering/monorepo',
  'ci-cd': '/engineering/ci-cd',
  'code-quality': '/engineering/code-quality',
  'design-system': '/engineering/design-system',
  react: '/engineering/react',
  vue: '/engineering/vue',
  'cross-platform': '/engineering/cross-platform',
  'ai-engineering': '/engineering/ai-engineering',
  'node-bff': '/engineering/node-bff',
  'system-architecture': '/architecture/system-architecture',
  'micro-frontend': '/architecture/micro-frontend',
  performance: '/architecture/performance',
  quality: '/architecture/quality',
  'data-state': '/architecture/data-state',
  observability: '/architecture/observability',
  business: '/leadership/business',
  team: '/leadership/team',
  strategy: '/leadership/strategy',
};

function initChart() {
  if (!chartRef.value) return;

  import('echarts').then(echarts => {
    chartInstance = echarts.init(chartRef.value);
    renderChart();

    chartInstance.on('click', params => {
      if (params.dataType === 'node' && linkMap[params.data.id]) {
        window.location.href = linkMap[params.data.id];
      }
    });

    window.addEventListener('resize', handleResize);
  });
}

function renderChart() {
  if (!chartInstance) return;

  const filteredNodes = nodes.filter(n => activeLevels.value.includes(n.level));
  const nodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredEdges = edges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: params => {
        if (params.dataType === 'node') {
          return `${params.data.name}<br/>点击查看详情`;
        }
        return '';
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        roam: true,
        label: {
          show: true,
          fontSize: 11,
          position: 'bottom'
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 8],
        data: filteredNodes.map(n => ({
          id: n.id,
          name: n.name,
          x: n.x,
          y: n.y,
          itemStyle: {
            color: levels.find(l => l.value === n.level)?.color
          }
        })),
        links: filteredEdges.map(e => ({
          source: e.source,
          target: e.target,
          lineStyle: {
            color: '#999',
            width: 1,
            curveness: 0.1
          }
        })),
        lineStyle: {
          opacity: 0.6,
          curveness: 0.1
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 3
          }
        }
      }
    ]
  };

  chartInstance.setOption(option, true);
}

function toggleLevel(level) {
  if (activeLevels.value.includes(level)) {
    if (activeLevels.value.length > 1) {
      activeLevels.value = activeLevels.value.filter(l => l !== level);
    }
  } else {
    activeLevels.value = [...activeLevels.value, level].sort();
  }
  renderChart();
}

function resetView() {
  activeLevels.value = [1, 2, 3, 4];
  renderChart();
}

function handleResize() {
  chartInstance && chartInstance.resize();
}

onMounted(() => {
  nextTick(() => {
    initChart();
  });
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.knowledge-graph {
  margin: 16px 0;
}

.graph-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.level-filter {
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.level-filter:hover {
  border-color: var(--vp-c-brand-1);
}

.level-filter.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.chart-container {
  width: 100%;
  height: 500px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.graph-tip {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 8px;
}

@media (max-width: 768px) {
  .chart-container {
    height: 400px;
  }
}
</style>
