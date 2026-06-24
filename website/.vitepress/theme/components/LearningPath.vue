<template>
  <div class="learning-path">
    <div class="path-selector">
      <button
        v-for="route in routes"
        :key="route.id"
        class="path-btn"
        :class="{ active: selectedRoute === route.id }"
        @click="selectRoute(route.id)"
      >
        {{ route.name }}
      </button>
    </div>

    <div v-if="recommendations.length" class="recommendation-panel">
      <h5>🎯 个性化学习推荐</h5>
      <p class="recommendation-desc">
        基于你的能力自评（{{ ratedCount }}/24 领域）和测评历史，以下领域建议优先补强：
      </p>
      <div class="recommendation-list">
        <a
          v-for="item in recommendations.slice(0, 6)"
          :key="item.id"
          :href="item.link"
          class="recommendation-item"
          :class="item.source"
        >
          <span class="recommendation-name">{{ item.name }}</span>
          <span class="recommendation-meta">
            <span v-if="item.rating" class="recommendation-rating">自评 L{{ item.rating }}</span>
            <span v-if="item.score !== undefined" class="recommendation-score">测评 {{ item.score }}%</span>
            <span class="recommendation-source">{{ sourceText(item.source) }}</span>
          </span>
        </a>
      </div>
      <div class="recommendation-actions">
        <a href="/learning-path/capability-self-assessment" class="recommendation-link">去自评</a>
        <a href="/learning-path/quizzes" class="recommendation-link">去测评</a>
      </div>
    </div>

    <div v-if="currentRoute" class="path-detail">
      <h4>{{ currentRoute.name }}</h4>
      <p>{{ currentRoute.description }}</p>

      <div class="path-levels">
        <div
          v-for="(level, index) in currentRoute.levels"
          :key="index"
          class="path-level"
        >
          <div class="level-title">{{ level.title }}</div>
          <div class="level-domains">
            <a
              v-for="domain in level.domains"
              :key="domain.id"
              :href="domain.link"
              class="domain-tag"
              :class="{ weak: isWeak(domain.id) }"
            >
              {{ domain.name }}
              <span v-if="ratings[domain.id]" class="domain-rating">L{{ ratings[domain.id] }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const routes = [
  {
    id: 'business',
    name: '业务型架构师',
    description: '深入理解业务，设计可扩展的业务架构，适合中台、低代码、复杂业务系统方向。',
    levels: [
      {
        title: '基础层',
        domains: [
          { id: 'javascript', name: 'JavaScript', link: '/foundation/javascript' },
          { id: 'typescript', name: 'TypeScript', link: '/foundation/typescript' },
          { id: 'browser', name: 'Browser', link: '/foundation/browser' },
        ]
      },
      {
        title: '工程化层',
        domains: [
          { id: 'design-system', name: 'Design System', link: '/engineering/design-system' },
          { id: 'react', name: 'React', link: '/engineering/react' },
          { id: 'node-bff', name: 'Node.js/BFF', link: '/engineering/node-bff' },
          { id: 'monorepo', name: 'Monorepo', link: '/engineering/monorepo' },
          { id: 'ai-engineering', name: 'AI Engineering', link: '/engineering/ai-engineering' },
        ]
      },
      {
        title: '架构与领导力层',
        domains: [
          { id: 'system-architecture', name: 'System Architecture', link: '/architecture/system-architecture' },
          { id: 'data-state', name: 'Data & State', link: '/architecture/data-state' },
          { id: 'micro-frontend', name: 'Micro Frontend', link: '/architecture/micro-frontend' },
          { id: 'business', name: 'Business', link: '/leadership/business' },
          { id: 'strategy', name: 'Strategy', link: '/leadership/strategy' },
        ]
      }
    ]
  },
  {
    id: 'engineering',
    name: '工程型架构师',
    description: '专注工程化、性能、质量、可观测性，打造高效稳定的前端工程体系。',
    levels: [
      {
        title: '基础层',
        domains: [
          { id: 'javascript', name: 'JavaScript', link: '/foundation/javascript' },
          { id: 'typescript', name: 'TypeScript', link: '/foundation/typescript' },
          { id: 'browser', name: 'Browser', link: '/foundation/browser' },
        ]
      },
      {
        title: '工程化层',
        domains: [
          { id: 'build-tools', name: 'Build Tools', link: '/engineering/build-tools' },
          { id: 'monorepo', name: 'Monorepo', link: '/engineering/monorepo' },
          { id: 'ci-cd', name: 'CI/CD', link: '/engineering/ci-cd' },
          { id: 'code-quality', name: 'Code Quality', link: '/engineering/code-quality' },
        ]
      },
      {
        title: '架构与领导力层',
        domains: [
          { id: 'performance', name: 'Performance', link: '/architecture/performance' },
          { id: 'quality', name: 'Quality', link: '/architecture/quality' },
          { id: 'observability', name: 'Observability', link: '/architecture/observability' },
          { id: 'system-architecture', name: 'System Architecture', link: '/architecture/system-architecture' },
          { id: 'team', name: 'Team', link: '/leadership/team' },
        ]
      }
    ]
  },
  {
    id: 'platform',
    name: '平台型架构师',
    description: '建设跨端能力、组件生态、可视化平台，支持多业务线高效开发。',
    levels: [
      {
        title: '基础与工程化层',
        domains: [
          { id: 'javascript', name: 'JavaScript', link: '/foundation/javascript' },
          { id: 'typescript', name: 'TypeScript', link: '/foundation/typescript' },
          { id: 'design-system', name: 'Design System', link: '/engineering/design-system' },
          { id: 'cross-platform', name: 'Cross Platform', link: '/engineering/cross-platform' },
          { id: 'monorepo', name: 'Monorepo', link: '/engineering/monorepo' },
        ]
      },
      {
        title: '架构与领导力层',
        domains: [
          { id: 'micro-frontend', name: 'Micro Frontend', link: '/architecture/micro-frontend' },
          { id: 'system-architecture', name: 'System Architecture', link: '/architecture/system-architecture' },
          { id: 'data-state', name: 'Data & State', link: '/architecture/data-state' },
          { id: 'performance', name: 'Performance', link: '/architecture/performance' },
          { id: 'strategy', name: 'Strategy', link: '/leadership/strategy' },
        ]
      }
    ]
  },
  {
    id: 'management',
    name: '管理型负责人',
    description: '制定技术战略，建设团队和文化，具备跨职能影响力。',
    levels: [
      {
        title: '技术基础',
        domains: [
          { id: 'javascript', name: 'JavaScript', link: '/foundation/javascript' },
          { id: 'typescript', name: 'TypeScript', link: '/foundation/typescript' },
          { id: 'build-tools', name: 'Build Tools', link: '/engineering/build-tools' },
          { id: 'react', name: 'React', link: '/engineering/react' },
          { id: 'node-bff', name: 'Node.js/BFF', link: '/engineering/node-bff' },
        ]
      },
      {
        title: '架构能力',
        domains: [
          { id: 'system-architecture', name: 'System Architecture', link: '/architecture/system-architecture' },
          { id: 'performance', name: 'Performance', link: '/architecture/performance' },
          { id: 'quality', name: 'Quality', link: '/architecture/quality' },
          { id: 'observability', name: 'Observability', link: '/architecture/observability' },
        ]
      },
      {
        title: '领导力',
        domains: [
          { id: 'business', name: 'Business', link: '/leadership/business' },
          { id: 'team', name: 'Team', link: '/leadership/team' },
          { id: 'strategy', name: 'Strategy', link: '/leadership/strategy' },
        ]
      }
    ]
  }
];

const allDomains = routes.flatMap(r => r.levels.flatMap(l => l.domains));
const idToDomain = Object.fromEntries(allDomains.map(d => [d.id, d]));

const selectedRoute = ref('business');
const ratings = ref({});
const quizHistory = ref([]);

const currentRoute = computed(() => {
  return routes.find(r => r.id === selectedRoute.value);
});

const ratedCount = computed(() => Object.keys(ratings.value).length);

const recommendations = computed(() => {
  const list = [];

  // 1. 自评 <= 2 的薄弱领域
  Object.entries(ratings.value).forEach(([id, rating]) => {
    const d = idToDomain[id];
    if (d && rating <= 2) {
      list.push({ id, name: d.name, link: d.link, rating, source: 'self-rating' });
    }
  });

  // 2. 测评历史得分 < 60 的领域
  const latestByDomain = {};
  quizHistory.value.forEach(h => {
    if (h.domainId && !latestByDomain[h.domainId]) {
      latestByDomain[h.domainId] = h;
    }
  });
  Object.entries(latestByDomain).forEach(([id, h]) => {
    const d = idToDomain[id];
    if (d && h.score < 60) {
      list.push({ id, name: d.name, link: d.link, score: h.score, source: 'quiz' });
    }
  });

  // 3. 当前路径中尚未自评的领域（优先级较低）
  const currentIds = currentRoute.value?.levels.flatMap(l => l.domains.map(d => d.id)) || [];
  currentIds.forEach(id => {
    if (!ratings.value[id] && !list.find(item => item.id === id)) {
      const d = idToDomain[id];
      if (d) list.push({ id, name: d.name, link: d.link, source: 'route-gap' });
    }
  });

  // 4. 去除重复，按优先级排序
  const seen = new Set();
  return list.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  }).sort((a, b) => {
    // 自评薄弱 > 测评低分 > 路径缺口
    const priority = { 'self-rating': 0, quiz: 1, 'route-gap': 2 };
    return priority[a.source] - priority[b.source];
  });
});

onMounted(() => {
  loadRatings();
  loadQuizHistory();
});

function selectRoute(id) {
  selectedRoute.value = id;
}

function isWeak(id) {
  const r = ratings.value[id];
  return r !== undefined && r <= 2;
}

function sourceText(source) {
  const map = { 'self-rating': '自评薄弱', quiz: '测评低分', 'route-gap': '路径缺口' };
  return map[source] || source;
}

function loadRatings() {
  const result = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('self-rating-')) {
      const id = key.replace('self-rating-', '');
      const value = parseInt(localStorage.getItem(key), 10);
      if (!isNaN(value)) result[id] = value;
    }
  }
  ratings.value = result;
}

function loadQuizHistory() {
  try {
    const raw = localStorage.getItem('quiz-history');
    if (raw) quizHistory.value = JSON.parse(raw);
  } catch {}
}
</script>

<style scoped>
.learning-path {
  margin: 16px 0;
}

.path-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.path-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.path-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.path-btn.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.recommendation-panel {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
}

.recommendation-panel h5 {
  margin-top: 0;
  margin-bottom: 8px;
}

.recommendation-desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-bottom: 12px;
}

.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.recommendation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.recommendation-item:hover {
  border-color: var(--vp-c-brand-1);
}

.recommendation-name {
  font-weight: 500;
}

.recommendation-meta {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
}

.recommendation-rating,
.recommendation-score,
.recommendation-source {
  padding: 2px 8px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.recommendation-source {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.recommendation-actions {
  display: flex;
  gap: 12px;
}

.recommendation-link {
  font-size: 14px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.recommendation-link:hover {
  text-decoration: underline;
}

.path-detail {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
}

.path-detail h4 {
  margin-top: 0;
  margin-bottom: 8px;
}

.path-detail p {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.path-levels {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.path-level {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.level-title {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.level-domains {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.domain-tag {
  padding: 4px 12px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.domain-tag:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.domain-tag.weak {
  border-color: #e53935;
  color: #e53935;
}

.domain-rating {
  font-size: 11px;
  padding: 1px 5px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .path-selector {
    flex-direction: column;
  }
  .recommendation-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
