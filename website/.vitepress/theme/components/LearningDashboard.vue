<template>
  <div class="learning-dashboard">
    <div v-if="!isReady" class="dashboard-loading">正在加载学习数据...</div>
    <div v-else>
      <div class="dashboard-summary">
        <div class="summary-card">
          <div class="summary-value">{{ completedCount }}/24</div>
          <div class="summary-label">已完成领域</div>
        </div>
        <div class="summary-card">
          <div class="summary-value">{{ ratedCount }}/24</div>
          <div class="summary-label">已自评领域</div>
        </div>
        <div class="summary-card">
          <div class="summary-value">{{ averageRating }}</div>
          <div class="summary-label">平均自评等级</div>
        </div>
        <div class="summary-card">
          <div class="summary-value">{{ weeklyMinutes }}</div>
          <div class="summary-label">本周学习分钟</div>
        </div>
      </div>

      <div class="dashboard-section">
        <h4>📅 今日推荐</h4>
        <div v-if="todayRecommendations.length" class="recommendation-cards">
          <a
            v-for="item in todayRecommendations"
            :key="item.id"
            :href="item.link"
            class="recommendation-card"
          >
            <div class="recommendation-card-name">{{ item.name }}</div>
            <div class="recommendation-card-reason">{{ item.reason }}</div>
          </a>
        </div>
        <div v-else class="empty-tip">已完成当前阶段推荐，继续保持！</div>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-section">
          <h4>🔥 学习热力图</h4>
          <div ref="heatmapRef" class="chart-box"></div>
        </div>

        <div class="dashboard-section">
          <h4>📊 四层能力雷达</h4>
          <div ref="radarRef" class="chart-box"></div>
        </div>
      </div>

      <div class="dashboard-section">
        <h4>📈 测评分数趋势</h4>
        <div ref="trendRef" class="chart-box tall"></div>
      </div>

      <div class="dashboard-section">
        <h4>⚙️ 数据管理</h4>
        <div class="data-actions">
          <button class="dashboard-btn" @click="exportData">导出学习数据</button>
          <button class="dashboard-btn" @click="triggerImport">导入学习数据</button>
          <button class="dashboard-btn danger" @click="resetData">重置所有数据</button>
          <input
            ref="fileInputRef"
            type="file"
            accept="application/json"
            style="display: none"
            @change="importData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useLearningData } from '../composables/useLearningData.js';
import * as echarts from 'echarts';

const domainGroups = [
  { name: '基础层', ids: ['javascript','typescript','browser','network','security'] },
  { name: '工程化层', ids: ['build-tools','monorepo','ci-cd','code-quality','design-system','react','vue','cross-platform','ai-engineering','node-bff'] },
  { name: '架构层', ids: ['system-architecture','micro-frontend','performance','quality','data-state','observability'] },
  { name: '领导力层', ids: ['business','team','strategy'] }
];

const domainMeta = domainGroups.flatMap(g => g.ids.map(id => ({ id, group: g.name })));
const domainMap = Object.fromEntries(domainMeta.map(d => [d.id, d]));

const { data, isReady, completedCount, ratedCount, averageRating, exportData: exportLearningData, importData: importLearningData, resetData: resetLearningData } = useLearningData();

const heatmapRef = ref(null);
const radarRef = ref(null);
const trendRef = ref(null);
const fileInputRef = ref(null);
let heatmapChart = null;
let radarChart = null;
let trendChart = null;

const weeklyMinutes = computed(() => {
  const records = data.value?.studyTime || {};
  let total = 0;
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    total += records[key] || 0;
  }
  return total;
});

const todayRecommendations = computed(() => {
  const ratings = data.value?.ratings || {};
  const completed = new Set(data.value?.completedDomains || []);
  const list = [];

  // 优先推荐自评低且未完成的领域
  Object.entries(ratings).forEach(([id, rating]) => {
    if (rating <= 2 && !completed.has(id) && domainMap[id]) {
      list.push({ id, name: id, link: getDomainLink(id), reason: `自评 L${rating}，建议优先补强` });
    }
  });

  // 其次推荐未完成但未评级的领域
  domainMeta.forEach(({ id }) => {
    if (!completed.has(id) && !ratings[id] && list.length < 5) {
      list.push({ id, name: id, link: getDomainLink(id), reason: '尚未学习，建议开始探索' });
    }
  });

  return list.slice(0, 4).map(item => ({
    ...item,
    name: formatDomainName(item.id),
  }));
});

const ratingsComputed = computed(() => data.value?.ratings || {});
const quizHistoryComputed = computed(() => data.value?.quizHistory || []);
const studyTimeComputed = computed(() => data.value?.studyTime || {});

function formatDomainName(id) {
  const map = {
    javascript: 'JavaScript', typescript: 'TypeScript', browser: 'Browser', network: 'Network', security: 'Security',
    'build-tools': 'Build Tools', monorepo: 'Monorepo', 'ci-cd': 'CI/CD', 'code-quality': 'Code Quality',
    'design-system': 'Design System', react: 'React', vue: 'Vue', 'cross-platform': 'Cross Platform',
    'ai-engineering': 'AI Engineering', 'node-bff': 'Node.js/BFF',
    'system-architecture': 'System Architecture', 'micro-frontend': 'Micro Frontend',
    performance: 'Performance', quality: 'Quality', 'data-state': 'Data & State', observability: 'Observability',
    business: 'Business', team: 'Team', strategy: 'Strategy'
  };
  return map[id] || id;
}

function getDomainLink(id) {
  const groupMap = {
    javascript: 'foundation', typescript: 'foundation', browser: 'foundation', network: 'foundation', security: 'foundation',
    'build-tools': 'engineering', monorepo: 'engineering', 'ci-cd': 'engineering', 'code-quality': 'engineering',
    'design-system': 'engineering', react: 'engineering', vue: 'engineering', 'cross-platform': 'engineering',
    'ai-engineering': 'engineering', 'node-bff': 'engineering',
    'system-architecture': 'architecture', 'micro-frontend': 'architecture',
    performance: 'architecture', quality: 'architecture', 'data-state': 'architecture', observability: 'architecture',
    business: 'leadership', team: 'leadership', strategy: 'leadership'
  };
  return `/${groupMap[id]}/${id}`;
}

function getLastNDates(n) {
  const dates = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

function renderHeatmap() {
  if (!heatmapRef.value) return;
  if (heatmapChart) heatmapChart.dispose();
  heatmapChart = echarts.init(heatmapRef.value);

  const dates = getLastNDates(28);
  const records = studyTimeComputed.value;
  const values = dates.map(date => [date, records[date] || 0]);

  const option = {
    tooltip: {
      formatter: (params) => `${params.value[0]}: ${params.value[1]} 分钟`
    },
    visualMap: {
      min: 0,
      max: 60,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: { color: ['#e8f5e9', '#43a047'] },
      show: false,
    },
    calendar: {
      top: 20,
      left: 30,
      right: 10,
      cellSize: ['auto', 20],
      range: [dates[0], dates[dates.length - 1]],
      itemStyle: { borderWidth: 2, borderColor: 'var(--vp-c-bg)' },
      splitLine: { show: false },
      yearLabel: { show: false },
      dayLabel: { color: 'var(--vp-c-text-2)', firstDay: 1 },
      monthLabel: { color: 'var(--vp-c-text-2)' }
    },
    series: [{
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: values
    }]
  };
  heatmapChart.setOption(option);
}

function renderRadar() {
  if (!radarRef.value) return;
  if (radarChart) radarChart.dispose();
  radarChart = echarts.init(radarRef.value);

  const averages = domainGroups.map(group => {
    const values = group.ids.map(id => ratingsComputed.value[id]).filter(v => v > 0);
    if (!values.length) return 0;
    return Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1));
  });

  const option = {
    tooltip: {},
    radar: {
      indicator: domainGroups.map(g => ({ name: g.name, max: 6 })),
      radius: '60%',
      axisName: { color: 'var(--vp-c-text-1)' },
      splitLine: { lineStyle: { color: 'var(--vp-c-divider)' } },
      splitArea: { areaStyle: { color: ['var(--vp-c-bg-soft)', 'var(--vp-c-bg)'] } },
      axisLine: { lineStyle: { color: 'var(--vp-c-divider)' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: averages,
        name: '当前能力',
        areaStyle: { color: 'rgba(100, 108, 255, 0.3)' },
        lineStyle: { color: 'var(--vp-c-brand-1)' },
        itemStyle: { color: 'var(--vp-c-brand-1)' }
      }]
    }]
  };
  radarChart.setOption(option);
}

function renderTrend() {
  if (!trendRef.value) return;
  if (trendChart) trendChart.dispose();
  trendChart = echarts.init(trendRef.value);

  const history = [...quizHistoryComputed.value].reverse();
  const dates = history.map(h => h.date?.slice(0, 10) || '-');
  const scores = history.map(h => h.score || 0);

  const option = {
    tooltip: { trigger: 'axis' },
    grid: { top: 30, bottom: 30, left: 40, right: 20 },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: 'var(--vp-c-divider)' } },
      axisLabel: { color: 'var(--vp-c-text-2)' }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLine: { lineStyle: { color: 'var(--vp-c-divider)' } },
      axisLabel: { color: 'var(--vp-c-text-2)' },
      splitLine: { lineStyle: { color: 'var(--vp-c-divider)' } }
    },
    series: [{
      type: 'line',
      data: scores,
      smooth: true,
      areaStyle: { color: 'rgba(100, 108, 255, 0.2)' },
      lineStyle: { color: 'var(--vp-c-brand-1)' },
      itemStyle: { color: 'var(--vp-c-brand-1)' }
    }]
  };
  trendChart.setOption(option);
}

function renderCharts() {
  nextTick(() => {
    renderHeatmap();
    renderRadar();
    renderTrend();
  });
}

function handleResize() {
  heatmapChart?.resize();
  radarChart?.resize();
  trendChart?.resize();
}

watch([isReady, ratingsComputed, quizHistoryComputed, studyTimeComputed], () => {
  if (isReady.value) renderCharts();
}, { deep: true });

onMounted(() => {
  if (isReady.value) renderCharts();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  heatmapChart?.dispose();
  radarChart?.dispose();
  trendChart?.dispose();
});

function exportData() {
  const blob = new Blob([JSON.stringify(exportLearningData(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jgs-learning-data-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function triggerImport() {
  fileInputRef.value?.click();
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      importLearningData(e.target.result);
      alert('学习数据导入成功');
    } catch (err) {
      alert('导入失败：文件格式不正确');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function resetData() {
  if (!confirm('确定要重置所有学习数据吗？此操作不可恢复。')) return;
  resetLearningData();
  alert('数据已重置');
}
</script>

<style scoped>
.learning-dashboard {
  margin: 16px 0;
}

.dashboard-loading {
  padding: 24px;
  text-align: center;
  color: var(--vp-c-text-2);
}

.dashboard-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.summary-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.summary-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.dashboard-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.dashboard-section h4 {
  margin-top: 0;
  margin-bottom: 12px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.dashboard-grid .dashboard-section {
  margin-bottom: 0;
}

.chart-box {
  width: 100%;
  height: 220px;
}

.chart-box.tall {
  height: 260px;
}

.recommendation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.recommendation-card {
  display: block;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.recommendation-card:hover {
  border-color: var(--vp-c-brand-1);
}

.recommendation-card-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.recommendation-card-reason {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.empty-tip {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.data-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.dashboard-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
}

.dashboard-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.dashboard-btn.danger:hover {
  border-color: #e53935;
  color: #e53935;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .data-actions {
    flex-direction: column;
  }
}
</style>
