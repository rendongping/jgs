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
import { ref, onMounted } from 'vue';

const props = defineProps({
  domainId: {
    type: String,
    required: true
  }
});

const isCompleted = ref(false);

function toggleComplete() {
  isCompleted.value = !isCompleted.value;
  const key = `domain-completed-${props.domainId}`;
  if (isCompleted.value) {
    localStorage.setItem(key, 'true');
  } else {
    localStorage.removeItem(key);
  }
  window.dispatchEvent(new CustomEvent('progress-updated'));
}

onMounted(() => {
  const key = `domain-completed-${props.domainId}`;
  isCompleted.value = localStorage.getItem(key) === 'true';
});
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
