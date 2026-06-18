<template>
  <div class="progress-tracker">
    <div class="progress-header">
      <span class="progress-title">学习进度</span>
      <span class="progress-text">{{ completedCount }} / {{ totalCount }} （{{ progressPercent }}%）</span>
    </div>
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{ width: `${progressPercent}%` }"></div>
    </div>
    <button v-if="showReset" class="progress-reset" @click="resetProgress">重置进度</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  totalCount: {
    type: Number,
    default: 24
  },
  showReset: {
    type: Boolean,
    default: false
  }
});

const completedCount = ref(0);

const progressPercent = computed(() => {
  if (props.totalCount === 0) return 0;
  return Math.round((completedCount.value / props.totalCount) * 100);
});

function updateProgress() {
  let count = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('domain-completed-')) {
      count++;
    }
  }
  completedCount.value = count;
}

function resetProgress() {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('domain-completed-')) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
  completedCount.value = 0;
  window.dispatchEvent(new CustomEvent('progress-updated'));
}

onMounted(() => {
  updateProgress();
  // 监听其他组件的进度更新
  window.addEventListener('progress-updated', updateProgress);
});
</script>

<style scoped>
.progress-tracker {
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin: 16px 0;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-title {
  font-weight: 600;
}

.progress-text {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.progress-bar-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}

.progress-reset {
  margin-top: 8px;
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  border-radius: 4px;
  cursor: pointer;
}

.progress-reset:hover {
  color: var(--vp-c-danger-1);
  border-color: var(--vp-c-danger-1);
}
</style>
