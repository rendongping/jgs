<template>
  <div class="interview-card" role="region" :aria-label="`面试题：${title}`">
    <div class="interview-card-header">
      <span class="interview-card-title">{{ title }}</span>
      <span class="difficulty-badge" :class="difficultyClass" aria-label="难度">{{ difficultyText }}</span>
    </div>

    <div v-if="decodedQuestionHtml.trim()" class="interview-content vp-doc" v-html="decodedQuestionHtml"></div>

    <div class="interview-actions">
      <button
        class="interview-toggle-btn"
        @click="toggleAnswer"
        :aria-expanded="showAnswer"
        :aria-controls="answerId"
      >
        {{ showAnswer ? '隐藏答案' : '查看答案' }}
      </button>
      <button
        class="interview-toggle-btn"
        @click="toggleMastered"
        :aria-pressed="mastered"
      >
        {{ mastered ? '已掌握 ✓' : '标记掌握' }}
      </button>
    </div>

    <div
      v-if="showAnswer"
      :id="answerId"
      class="interview-answer vp-doc"
      v-html="decodedAnswerHtml"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: '面试题'
  },
  difficulty: {
    type: String,
    default: ''
  },
  questionHtml: {
    type: String,
    default: ''
  },
  answerHtml: {
    type: String,
    default: ''
  },
  questionBase64: {
    type: String,
    default: ''
  },
  answerBase64: {
    type: String,
    default: ''
  }
});

const showAnswer = ref(false);
const mastered = ref(false);
const answerId = computed(() => `interview-answer-${props.id}`);

function decodeBase64(value) {
  if (!value) return '';
  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(value, 'base64').toString('utf-8');
    }
    return decodeURIComponent(escape(atob(value)));
  } catch (err) {
    console.warn('Failed to decode base64:', err);
    return '';
  }
}

const decodedQuestionHtml = computed(() => {
  return props.questionBase64 ? decodeBase64(props.questionBase64) : props.questionHtml;
});

const decodedAnswerHtml = computed(() => {
  return props.answerBase64 ? decodeBase64(props.answerBase64) : props.answerHtml;
});

const difficultyClass = computed(() => {
  const map = {
    '🟢': 'easy',
    '🟡': 'medium',
    '🔴': 'hard'
  };
  return map[props.difficulty] || '';
});

const difficultyText = computed(() => {
  const map = {
    '🟢': '基础',
    '🟡': '进阶',
    '🔴': '深入'
  };
  return map[props.difficulty] || props.difficulty;
});

function toggleAnswer() {
  showAnswer.value = !showAnswer.value;
}

function toggleMastered() {
  mastered.value = !mastered.value;
  const key = `interview-mastered-${props.id}`;
  if (mastered.value) {
    localStorage.setItem(key, 'true');
  } else {
    localStorage.removeItem(key);
  }
}

onMounted(() => {
  const key = `interview-mastered-${props.id}`;
  mastered.value = localStorage.getItem(key) === 'true';
});
</script>

<style scoped>
.interview-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.interview-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.interview-card-title {
  font-weight: 600;
  font-size: 16px;
  line-height: 1.4;
}

.difficulty-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  white-space: nowrap;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.difficulty-badge.easy {
  color: #52c41a;
  border-color: #52c41a;
}

.difficulty-badge.medium {
  color: #faad14;
  border-color: #faad14;
}

.difficulty-badge.hard {
  color: #f5222d;
  border-color: #f5222d;
}

.interview-content {
  margin-bottom: 12px;
}

.interview-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.interview-toggle-btn {
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-brand-1);
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.interview-toggle-btn:hover {
  background: var(--vp-c-brand-soft);
}

.interview-toggle-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.interview-answer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--vp-c-divider);
}

@media (max-width: 768px) {
  .interview-card-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
