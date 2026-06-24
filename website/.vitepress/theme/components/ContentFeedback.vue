<template>
  <div class="content-feedback">
    <h4>💡 发现内容可以改进？</h4>
    <p class="feedback-desc">填写以下信息，我们将帮你生成 GitHub Issue 草稿。</p>
    <div class="feedback-form">
      <label>
        <span>问题类型</span>
        <select v-model="form.type" class="feedback-select">
          <option value="content-error">内容错误</option>
          <option value="new-domain">新增领域/题目建议</option>
          <option value="feature">网站功能建议</option>
        </select>
      </label>
      <label>
        <span>页面路径</span>
        <input v-model="form.page" class="feedback-input" placeholder="如 /foundation/javascript" />
      </label>
      <label>
        <span>具体描述</span>
        <textarea v-model="form.description" class="feedback-textarea" rows="4" placeholder="请描述问题或建议..."></textarea>
      </label>
      <button class="feedback-btn" @click="generateIssue">生成 Issue 草稿</button>
    </div>
    <div v-if="issueUrl" class="feedback-result">
      <a :href="issueUrl" target="_blank" rel="noopener noreferrer" class="feedback-link">前往 GitHub 提交 Issue →</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const form = ref({
  type: 'content-error',
  page: '',
  description: '',
});

const issueUrl = ref('');

onMounted(() => {
  if (typeof window !== 'undefined') {
    form.value.page = window.location.pathname.replace(/^\/jgs/, '') || '/';
  }
});

function generateIssue() {
  const templateMap = {
    'content-error': 'content-error.yml',
    'new-domain': 'new-domain.yml',
    'feature': 'feature.yml',
  };
  const template = templateMap[form.value.type] || 'feature.yml';
  const title = encodeURIComponent(`[反馈] ${form.value.page}`);
  const body = encodeURIComponent(`## 问题描述\n${form.value.description}\n\n## 相关页面\n${form.value.page}`);
  issueUrl.value = `https://github.com/rendongping/jgs/issues/new?template=${template}&title=${title}&body=${body}`;
}
</script>

<style scoped>
.content-feedback {
  margin: 24px 0;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.content-feedback h4 {
  margin-top: 0;
  margin-bottom: 8px;
}

.feedback-desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-bottom: 12px;
}

.feedback-form label {
  display: block;
  margin-bottom: 12px;
}

.feedback-form label span {
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
}

.feedback-select,
.feedback-input,
.feedback-textarea {
  width: 100%;
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.feedback-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.feedback-btn:hover {
  opacity: 0.9;
}

.feedback-result {
  margin-top: 12px;
}

.feedback-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.feedback-link:hover {
  text-decoration: underline;
}
</style>
