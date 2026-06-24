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
              >
                {{ level }}
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
  // Level 03
  { id: 'system-architecture', name: 'System Architecture', link: '/architecture/system-architecture', level: 3 },
  { id: 'micro-frontend', name: 'Micro Frontend', link: '/architecture/micro-frontend', level: 3 },
  { id: 'performance', name: 'Performance', link: '/architecture/performance', level: 3 },
  { id: 'quality', name: 'Quality', link: '/architecture/quality', level: 3 },
  { id: 'data-state', name: 'Data & State', link: '/architecture/data-state', level: 3 },
  { id: 'observability', name: 'Observability', link: '/architecture/observability', level: 3 },
  // Level 04
  { id: 'business', name: 'Business', link: '/leadership/business', level: 4 },
  { id: 'team', name: 'Team', link: '/leadership/team', level: 4 },
  { id: 'strategy', name: 'Strategy', link: '/leadership/strategy', level: 4 },
];

const levelGroups = [
  { name: '基础层', key: 'level01', ids: domains.filter(d => d.level === 1).map(d => d.id) },
  { name: '工程化层', key: 'level02', ids: domains.filter(d => d.level === 2).map(d => d.id) },
  { name: '架构层', key: 'level03', ids: domains.filter(d => d.level === 3).map(d => d.id) },
  { name: '领导力层', key: 'level04', ids: domains.filter(d => d.level === 4).map(d => d.id) },
];

const ratings = ref({});
const isClient = ref(false);
const radarChartRef = ref(null);
const fileInputRef = ref(null);
let chartInstance = null;
let echartsLib = null;

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

function setRating(domainId, level) {
  ratings.value[domainId] = level;
  localStorage.setItem(`self-rating-${domainId}`, String(level));
  updateRadarChart();
}

function loadRatings() {
  const newRatings = {};
  domains.forEach(d => {
    const saved = localStorage.getItem(`self-rating-${d.id}`);
    if (saved) {
      newRatings[d.id] = parseInt(saved, 10);
    }
  });
  ratings.value = newRatings;
}

function resetRatings() {
  if (typeof window !== 'undefined' && !window.confirm('确定要重置所有评估结果吗？')) {
    return;
  }
  domains.forEach(d => {
    localStorage.removeItem(`self-rating-${d.id}`);
  });
  ratings.value = {};
  updateRadarChart();
}

function saveRatings() {
  if (typeof window !== 'undefined') {
    window.alert('评估结果已自动保存到浏览器本地存储');
  }
}

function exportRatings() {
  if (typeof window === 'undefined') return;
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    ratings: ratings.value
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
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
      const data = JSON.parse(e.target.result);
      if (!data.ratings || typeof data.ratings !== 'object') {
        throw new Error('Invalid format');
      }
      ratings.value = { ...data.ratings };
      domains.forEach(d => {
        const value = ratings.value[d.id];
        if (value && value >= 1 && value <= 6) {
          localStorage.setItem(`self-rating-${d.id}`, String(value));
        } else {
          localStorage.removeItem(`self-rating-${d.id}`);
        }
      });
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
  loadRatings();
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
}

.recommendation a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.recommendation a:hover {
  text-decoration: underline;
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
}
</style>
