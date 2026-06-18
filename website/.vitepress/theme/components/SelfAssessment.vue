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
      <div class="recommendation" v-if="weakAreas.length > 0">
        <strong>优先补强：</strong>
        <span v-for="(area, index) in weakAreas" :key="area.id">
          <a :href="area.link">{{ area.name }}</a>
          <span v-if="index < weakAreas.length - 1">、</span>
        </span>
      </div>
    </div>

    <div class="assessment-table-wrapper">
      <table class="assessment-table">
        <thead>
          <tr>
            <th>领域</th>
            <th>L1 了解</th>
            <th>L2 理解</th>
            <th>L3 应用</th>
            <th>L4 分析</th>
            <th>L5 评估</th>
            <th>L6 创造</th>
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

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

const ratings = ref({});

const totalDomains = computed(() => domains.length);

const ratedCount = computed(() => {
  return Object.values(ratings.value).filter(r => r > 0).length;
});

const averageLevel = computed(() => {
  const values = Object.values(ratings.value).filter(r => r > 0);
  if (values.length === 0) return '-';
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
});

const weakAreas = computed(() => {
  return domains
    .filter(d => !ratings.value[d.id] || ratings.value[d.id] <= 2)
    .slice(0, 5)
    .map(d => ({ id: d.id, name: d.name, link: d.link }));
});

function setRating(domainId, level) {
  ratings.value[domainId] = level;
  localStorage.setItem(`self-rating-${domainId}`, String(level));
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
  domains.forEach(d => {
    localStorage.removeItem(`self-rating-${d.id}`);
  });
  ratings.value = {};
}

function saveRatings() {
  alert('评估结果已自动保存到浏览器本地存储');
}

onMounted(() => {
  loadRatings();
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
  margin-bottom: 12px;
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
}

.action-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}

.action-btn.primary {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
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
}
</style>
