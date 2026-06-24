<template>
  <div class="mark-complete-wrapper">
    <button
      class="mark-complete-btn"
      :class="{ completed: isCompleted }"
      @click="toggleComplete"
    >
      {{ isCompleted ? '✓ 已完成本领域学习' : '标记本领域为已完成' }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useLearningData } from '../composables/useLearningData.js';

const props = defineProps({
  domainId: {
    type: String,
    required: true
  }
});

const { isDomainCompleted, setDomainCompleted } = useLearningData();
const isCompleted = ref(false);

function sync() {
  isCompleted.value = isDomainCompleted(props.domainId);
}

function toggleComplete() {
  const next = !isCompleted.value;
  setDomainCompleted(props.domainId, next);
  isCompleted.value = next;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('progress-updated'));
  }
}

watch(() => props.domainId, sync, { immediate: true });
</script>

<style scoped>
.mark-complete-wrapper {
  margin: 24px 0 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--vp-c-divider);
}

.mark-complete-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-brand-1);
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.mark-complete-btn:hover {
  background: var(--vp-c-brand-soft);
}

.mark-complete-btn.completed {
  background: var(--vp-c-brand-1);
  color: white;
}
</style>
