<template>
  <div class="interview-practice">
    <div v-if="!session.started" class="practice-setup">
      <h4>面试题随机抽测</h4>
      <p class="practice-desc">按领域和难度随机抽取面试题，模拟真实面试场景，训练表达与深度思考。</p>
      <div class="practice-config">
        <label>选择领域：</label>
        <select v-model="selectedDomain" class="practice-select">
          <option value="">全部领域</option>
          <option v-for="d in domains" :key="d.id" :value="d.id">{{ d.name }}</option>
        </select>
      </div>
      <div class="practice-config">
        <label>题目数量：</label>
        <div class="practice-counts">
          <button
            v-for="n in [3, 5, 10]"
            :key="n"
            class="practice-count-btn"
            :class="{ active: count === n }"
            @click="count = n"
          >{{ n }} 题</button>
        </div>
      </div>
      <button class="practice-start-btn" :disabled="loading" @click="startSession">
        {{ loading ? '加载中...' : '开始抽测' }}
      </button>
      <div v-if="error" class="practice-error">{{ error }}</div>
    </div>

    <div v-else-if="session.finished" class="practice-result">
      <h4>抽测完成</h4>
      <p>本轮共练习 {{ session.questions.length }} 题，建议对照参考答案组织语言表达。</p>
      <button class="practice-start-btn" @click="resetSession">再来一轮</button>
      <div class="practice-review-list">
        <div v-for="(q, idx) in session.questions" :key="q.id" class="practice-review-item">
          <div class="practice-review-title">{{ idx + 1 }}. {{ q.title }}</div>
          <div class="practice-review-difficulty">{{ difficultyText(q.difficulty) }}</div>
          <div class="practice-review-question">{{ q.question }}</div>
          <button class="practice-toggle-btn" @click="q.showAnswer = !q.showAnswer">
            {{ q.showAnswer ? '隐藏参考答案' : '查看参考答案' }}
          </button>
          <div v-if="q.showAnswer" class="practice-review-answer">{{ q.answer }}</div>
        </div>
      </div>
    </div>

    <div v-else class="practice-in-progress">
      <div class="practice-progress">
        <span>{{ currentIndex + 1 }} / {{ session.questions.length }}</span>
        <span class="practice-timer">⏱ {{ elapsed }} 秒</span>
      </div>
      <div class="practice-card">
        <div class="practice-card-header">
          <span class="practice-card-title">{{ currentQuestion.title }}</span>
          <span class="practice-difficulty-badge" :class="difficultyClass(currentQuestion.difficulty)">
            {{ difficultyText(currentQuestion.difficulty) }}
          </span>
        </div>
        <div class="practice-card-body">{{ currentQuestion.question }}</div>
      </div>
      <div class="practice-controls">
        <button class="practice-control-btn" @click="toggleCurrentAnswer">
          {{ currentQuestion.showAnswer ? '隐藏答案' : '查看答案' }}
        </button>
        <button class="practice-control-btn" @click="toggleSpeech" v-if="speechSupported">
          {{ isRecording ? '停止录音' : '语音回答' }}
        </button>
      </div>
      <div v-if="currentQuestion.showAnswer" class="practice-answer-panel">
        {{ currentQuestion.answer }}
      </div>
      <div class="practice-nav">
        <button class="practice-nav-btn" :disabled="currentIndex === 0" @click="prev">上一题</button>
        <button v-if="currentIndex < session.questions.length - 1" class="practice-nav-btn primary" @click="next">下一题</button>
        <button v-else class="practice-nav-btn primary" @click="finish">完成</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const domains = [
  // Level 01 基础层
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'browser', name: 'Browser' },
  { id: 'network', name: 'Network' },
  { id: 'security', name: 'Security' },
  { id: 'html-css', name: 'HTML/CSS' },
  { id: 'a11y', name: 'Accessibility' },
  { id: 'data-structures-algorithms', name: 'Data Structures & Algorithms' },
  { id: 'design-patterns', name: 'Design Patterns' },
  // Level 02 工程化层
  { id: 'build-tools', name: 'Build Tools' },
  { id: 'monorepo', name: 'Monorepo' },
  { id: 'ci-cd', name: 'CI/CD' },
  { id: 'code-quality', name: 'Code Quality' },
  { id: 'design-system', name: 'Design System' },
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
  { id: 'cross-platform', name: 'Cross Platform' },
  { id: 'ai-engineering', name: 'AI Engineering' },
  { id: 'node-bff', name: 'Node.js/BFF' },
  { id: 'git-workflow', name: 'Git Workflow' },
  { id: 'developer-experience', name: 'Developer Experience' },
  { id: 'deployment-sre', name: 'Frontend SRE' },
  { id: 'package-supply-chain', name: 'Package & Supply Chain' },
  // Level 03 架构层
  { id: 'system-architecture', name: 'System Architecture' },
  { id: 'micro-frontend', name: 'Micro Frontend' },
  { id: 'performance', name: 'Performance' },
  { id: 'quality', name: 'Quality' },
  { id: 'data-state', name: 'Data & State' },
  { id: 'observability', name: 'Observability' },
  { id: 'security-architecture', name: 'Security Architecture' },
  { id: 'real-time', name: 'Real-time' },
  { id: 'internationalization', name: 'Internationalization' },
  { id: 'visualization-graphics', name: 'Visualization & Graphics' },
  { id: 'serverless-edge', name: 'Serverless & Edge' },
  { id: 'data-engineering', name: 'Data Engineering' },
  // Level 04 领导力层
  { id: 'business', name: 'Business' },
  { id: 'team', name: 'Team' },
  { id: 'strategy', name: 'Strategy' },
  { id: 'communication', name: 'Communication' },
  { id: 'project-management', name: 'Project Management' },
  { id: 'hiring', name: 'Hiring' },
  { id: 'tech-branding', name: 'Tech Brand & Community' },
  { id: 'tech-governance', name: 'Tech Governance' },
];

const selectedDomain = ref('');
const count = ref(5);
const loading = ref(false);
const error = ref('');
const currentIndex = ref(0);
const elapsed = ref(0);
const isRecording = ref(false);
const timer = ref(null);
const recognition = ref(null);
const session = ref({ started: false, finished: false, questions: [] });

const currentQuestion = computed(() => session.value.questions[currentIndex.value] || {});
const speechSupported = computed(() => typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window));

function difficultyClass(difficulty) {
  if (difficulty?.includes('🔴')) return 'advanced';
  if (difficulty?.includes('🟡')) return 'intermediate';
  return 'basic';
}

function difficultyText(difficulty) {
  if (difficulty?.includes('🔴')) return '深入';
  if (difficulty?.includes('🟡')) return '进阶';
  return '基础';
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function startSession() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch('/interview-index.json');
    if (!res.ok) throw new Error('面试题索引加载失败');
    const data = await res.json();
    let questions = data.questions || [];
    if (selectedDomain.value) {
      questions = questions.filter(q => q.slug === selectedDomain.value || q.slug.startsWith(`${selectedDomain.value}-`));
    }
    if (!questions.length) throw new Error('未找到匹配题目');
    const selected = shuffle(questions).slice(0, count.value).map(q => ({ ...q, showAnswer: false }));
    session.value = { started: true, finished: false, questions: selected };
    currentIndex.value = 0;
    elapsed.value = 0;
    startTimer();
  } catch (e) {
    error.value = e.message || '抽测启动失败';
  } finally {
    loading.value = false;
  }
}

function startTimer() {
  stopTimer();
  timer.value = setInterval(() => elapsed.value++, 1000);
}

function stopTimer() {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
}

function next() {
  if (currentIndex.value < session.value.questions.length - 1) {
    currentIndex.value++;
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function toggleCurrentAnswer() {
  currentQuestion.value.showAnswer = !currentQuestion.value.showAnswer;
}

function finish() {
  stopTimer();
  session.value.finished = true;
}

function resetSession() {
  stopTimer();
  session.value = { started: false, finished: false, questions: [] };
  currentIndex.value = 0;
  elapsed.value = 0;
}

function toggleSpeech() {
  if (!speechSupported.value) return;
  if (isRecording.value) {
    recognition.value?.stop();
    isRecording.value = false;
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition.value = new SpeechRecognition();
  recognition.value.lang = 'zh-CN';
  recognition.value.continuous = false;
  recognition.value.interimResults = false;
  recognition.value.onstart = () => isRecording.value = true;
  recognition.value.onend = () => isRecording.value = false;
  recognition.value.onresult = () => {
    // 仅作为练习辅助，不保存语音文本
  };
  recognition.value.start();
}
</script>

<style scoped>
.interview-practice {
  margin: 16px 0;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.practice-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.practice-config {
  margin-bottom: 12px;
}

.practice-config label {
  font-weight: 600;
  margin-right: 8px;
}

.practice-select {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  min-width: 180px;
}

.practice-counts {
  display: inline-flex;
  gap: 8px;
}

.practice-count-btn,
.practice-start-btn,
.practice-control-btn,
.practice-nav-btn,
.practice-toggle-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.practice-count-btn:hover,
.practice-start-btn:hover:not(:disabled),
.practice-control-btn:hover,
.practice-nav-btn:hover:not(:disabled),
.practice-toggle-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.practice-count-btn.active,
.practice-nav-btn.primary {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.practice-start-btn {
  margin-top: 8px;
}

.practice-start-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.practice-error {
  color: #e53935;
  margin-top: 12px;
}

.practice-progress {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.practice-timer {
  font-family: monospace;
}

.practice-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 12px;
}

.practice-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.practice-card-title {
  font-weight: 600;
}

.practice-difficulty-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.practice-difficulty-badge.basic {
  background: #e8f5e9;
  color: #43a047;
}

.practice-difficulty-badge.intermediate {
  background: #fff3e0;
  color: #fb8c00;
}

.practice-difficulty-badge.advanced {
  background: #ffebee;
  color: #e53935;
}

.practice-card-body {
  font-size: 15px;
  line-height: 1.6;
}

.practice-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.practice-answer-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
}

.practice-nav {
  display: flex;
  justify-content: space-between;
}

.practice-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.practice-review-list {
  margin-top: 16px;
}

.practice-review-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid var(--vp-c-divider);
}

.practice-review-title {
  font-weight: 600;
  margin-bottom: 6px;
}

.practice-review-difficulty {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.practice-review-question {
  font-size: 14px;
  margin-bottom: 10px;
}

.practice-review-answer {
  margin-top: 10px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 14px;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .practice-controls {
    flex-direction: column;
  }
  .practice-nav {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
