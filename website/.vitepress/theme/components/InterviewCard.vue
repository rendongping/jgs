<template>
  <div class="interview-card">
    <div class="interview-card-header">
      <span class="interview-card-title">{{ title }}</span>
      <span class="difficulty-badge" :class="difficultyClass">{{ difficultyText }}</span>
    </div>
    <div v-if="questionHtml.trim()" class="interview-content vp-doc" v-html="questionHtml"></div>
    <div class="interview-actions">
      <button class="interview-toggle-btn" @click="toggleAnswer" :aria-expanded="showAnswer">
        {{ showAnswer ? '隐藏答案' : '查看答案' }}
      </button>
      <button class="interview-toggle-btn" @click="toggleMastered">
        {{ mastered ? '已掌握 ✓' : '标记掌握' }}
      </button>
    </div>
    <div v-if="showAnswer" class="interview-answer vp-doc" v-html="answerHtml"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useLearningData } from '../composables/useLearningData.js';

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  difficulty: { type: String, default: '' },
  questionHtml: { type: String, default: '' },
  answerHtml: { type: String, default: '' },
  questionBase64: { type: String, default: '' },
  answerBase64: { type: String, default: '' },
});

const { isQuestionMastered, setQuestionMastered } = useLearningData();

const showAnswer = ref(false);
const mastered = ref(false);

const difficultyClass = computed(() => {
  if (props.difficulty.includes('🔴')) return 'difficulty-advanced';
  if (props.difficulty.includes('🟡')) return 'difficulty-intermediate';
  return 'difficulty-basic';
});

const difficultyText = computed(() => {
  if (props.difficulty.includes('🔴')) return '深入';
  if (props.difficulty.includes('🟡')) return '进阶';
  return '基础';
});

function decodeBase64(value) {
  if (!value) return '';
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'base64').toString('utf-8');
  }
  return decodeURIComponent(escape(atob(value)));
}

const questionHtml = computed(() => props.questionHtml || decodeBase64(props.questionBase64));
const answerHtml = computed(() => props.answerHtml || decodeBase64(props.answerBase64));

function toggleAnswer() {
  showAnswer.value = !showAnswer.value;
}

function toggleMastered() {
  const next = !mastered.value;
  setQuestionMastered(props.id, next);
  mastered.value = next;
}

watch(() => props.id, (newId) => {
  mastered.value = isQuestionMastered(newId);
}, { immediate: true });
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
}

.interview-card-title {
  font-weight: 600;
  font-size: 15px;
}

.difficulty-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.difficulty-basic {
  background: #e8f5e9;
  color: #43a047;
}

.difficulty-intermediate {
  background: #fff3e0;
  color: #fb8c00;
}

.difficulty-advanced {
  background: #ffebee;
  color: #e53935;
}

.interview-content {
  margin-bottom: 12px;
}

.interview-actions {
  display: flex;
  gap: 8px;
}

.interview-toggle-btn {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.interview-toggle-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.interview-answer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-divider);
}
</style>
