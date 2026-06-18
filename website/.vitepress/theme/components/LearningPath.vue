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
            >
              {{ domain.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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

const selectedRoute = ref('business');

const currentRoute = computed(() => {
  return routes.find(r => r.id === selectedRoute.value);
});

function selectRoute(id) {
  selectedRoute.value = id;
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
}

.domain-tag:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .path-selector {
    flex-direction: column;
  }
}
</style>
