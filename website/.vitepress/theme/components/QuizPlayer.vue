<template>
  <div class="quiz-player">
    <div v-if="!quizState.started" class="quiz-setup">
      <h4>客观题测评</h4>
      <p class="quiz-desc">选择知识领域，系统将随机抽取题目生成测评。测评结果可用于定位薄弱点并推荐学习路径。</p>
      <div class="quiz-domain-select">
        <label for="quiz-domain">选择领域：</label>
        <select id="quiz-domain" v-model="selectedDomain" class="quiz-select">
          <option value="">全部综合测评（随机跨领域）</option>
          <option v-for="d in domains" :key="d.id" :value="d.id">{{ d.name }}</option>
        </select>
      </div>
      <div class="quiz-config">
        <label>题目数量：</label>
        <div class="quiz-count-options">
          <button
            v-for="n in [5, 10, 15, 20]"
            :key="n"
            class="quiz-count-btn"
            :class="{ active: questionCount === n }"
            @click="questionCount = n"
          >{{ n }} 题</button>
        </div>
      </div>
      <button class="quiz-start-btn" :disabled="loading" @click="startQuiz">
        {{ loading ? '加载中...' : '开始测评' }}
      </button>
      <div v-if="error" class="quiz-error">{{ error }}</div>

      <div v-if="history.length" class="quiz-history">
        <h5>历史测评</h5>
        <ul>
          <li v-for="(h, idx) in history.slice(0, 5)" :key="idx">
            <span>{{ formatDate(h.date) }}</span>
            <span>{{ h.domainName || '综合测评' }}</span>
            <span class="quiz-score" :class="scoreClass(h.score)">{{ h.score }}%</span>
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="quizState.finished" class="quiz-result">
      <h4>测评结果</h4>
      <div class="quiz-result-score" :class="scoreClass(quizState.score)">
        {{ quizState.score }}%
      </div>
      <p class="quiz-result-summary">
        答对 {{ quizState.correctCount }} / {{ quizState.questions.length }} 题
      </p>
      <div class="quiz-result-actions">
        <button class="quiz-start-btn" @click="resetQuiz">再测一次</button>
        <button class="quiz-start-btn secondary" @click="goToAssessment">查看自评雷达</button>
        <button class="quiz-start-btn secondary" @click="goToDashboard">学习数据中心</button>
      </div>

      <div v-if="weakTags.length" class="quiz-weak-tags">
        <h5>薄弱知识点</h5>
        <div class="tag-list">
          <span v-for="tag in weakTags" :key="tag" class="weak-tag">{{ tag }}</span>
        </div>
      </div>

      <div class="quiz-review">
        <h5>答案解析</h5>
        <div
          v-for="(q, idx) in quizState.questions"
          :key="q.id"
          class="quiz-review-item"
          :class="{ correct: isCorrect(q), wrong: !isCorrect(q) }"
        >
          <div class="quiz-review-title">
            <span>{{ idx + 1 }}. {{ q.question }}</span>
            <span class="quiz-review-badge" :class="isCorrect(q) ? 'correct' : 'wrong'">
              {{ isCorrect(q) ? '正确' : '错误' }}
            </span>
          </div>
          <div class="quiz-review-answer">
            你的答案：{{ formatAnswer(userAnswer(q)) || '未作答' }}
            <br>
            正确答案：{{ formatAnswer(q.answer) }}
          </div>
          <div v-if="q.explanation" class="quiz-review-explanation">{{ q.explanation }}</div>
        </div>
      </div>
    </div>

    <div v-else class="quiz-in-progress">
      <div class="quiz-progress">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <span class="quiz-progress-text">{{ currentIndex + 1 }} / {{ quizState.questions.length }}</span>
      </div>

      <div class="quiz-question">
        <div class="quiz-question-header">
          <span class="quiz-level">{{ levelText(currentQuestion.level) }}</span>
          <span class="quiz-type">{{ typeText(currentQuestion.type) }}</span>
        </div>
        <div class="quiz-question-body">{{ currentQuestion.question }}</div>

        <div v-if="currentQuestion.type === 'true-false'" class="quiz-options">
          <button
            v-for="opt in ['true', 'false']"
            :key="opt"
            class="quiz-option-btn"
            :class="{ selected: isSelected(opt) }"
            @click="selectTrueFalse(opt)"
          >{{ opt === 'true' ? '正确' : '错误' }}</button>
        </div>

        <div v-else-if="currentQuestion.type === 'single-choice'" class="quiz-options">
          <button
            v-for="opt in currentQuestion.options"
            :key="opt"
            class="quiz-option-btn"
            :class="{ selected: isSelected(opt) }"
            @click="selectSingle(opt)"
          >{{ opt }}</button>
        </div>

        <div v-else-if="currentQuestion.type === 'multiple-choice'" class="quiz-options">
          <button
            v-for="opt in currentQuestion.options"
            :key="opt"
            class="quiz-option-btn"
            :class="{ selected: isSelected(opt) }"
            @click="selectMultiple(opt)"
          >{{ opt }}</button>
        </div>
      </div>

      <div class="quiz-nav">
        <button
          class="quiz-nav-btn"
          :disabled="currentIndex === 0"
          @click="prevQuestion"
        >上一题</button>
        <button
          v-if="currentIndex < quizState.questions.length - 1"
          class="quiz-nav-btn primary"
          @click="nextQuestion"
        >下一题</button>
        <button
          v-else
          class="quiz-nav-btn primary"
          @click="submitQuiz"
        >提交答案</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLearningData } from '../composables/useLearningData.js';

const domains = [
  { id: 'F01-javascript', name: 'JavaScript' },
  { id: 'F02-typescript', name: 'TypeScript' },
  { id: 'F03-browser', name: 'Browser' },
  { id: 'F04-network', name: 'Network' },
  { id: 'F05-security', name: 'Security' },
  { id: 'E01-build-tools', name: 'Build Tools' },
  { id: 'E02-monorepo', name: 'Monorepo' },
  { id: 'E03-ci-cd', name: 'CI/CD' },
  { id: 'E04-code-quality', name: 'Code Quality' },
  { id: 'E05-design-system', name: 'Design System' },
  { id: 'E06-react', name: 'React' },
  { id: 'E07-vue', name: 'Vue' },
  { id: 'E08-cross-platform', name: 'Cross Platform' },
  { id: 'E09-ai-engineering', name: 'AI Engineering' },
  { id: 'E10-node-bff', name: 'Node.js/BFF' },
  { id: 'A01-system-architecture', name: 'System Architecture' },
  { id: 'A02-micro-frontend', name: 'Micro Frontend' },
  { id: 'A03-performance', name: 'Performance' },
  { id: 'A04-quality', name: 'Quality' },
  { id: 'A05-data-state', name: 'Data & State' },
  { id: 'A06-observability', name: 'Observability' },
  { id: 'L01-business', name: 'Business' },
  { id: 'L02-team', name: 'Team' },
  { id: 'L03-strategy', name: 'Strategy' },
];

const { data, addQuizRecord } = useLearningData();
const history = computed(() => data.value?.quizHistory || []);

const selectedDomain = ref('');
const questionCount = ref(10);
const loading = ref(false);
const error = ref('');
const currentIndex = ref(0);
const answers = ref({});
const quizState = ref({
  started: false,
  finished: false,
  questions: [],
  score: 0,
  correctCount: 0,
});

const currentQuestion = computed(() => quizState.value.questions[currentIndex.value] || {});
const progressPercent = computed(() => {
  if (!quizState.value.questions.length) return 0;
  return ((currentIndex.value + 1) / quizState.value.questions.length) * 100;
});

const weakTags = computed(() => {
  const tagSet = new Set();
  quizState.value.questions.forEach(q => {
    if (!isCorrect(q) && q.tags && q.tags.length) {
      q.tags.forEach(t => tagSet.add(t));
    }
  });
  return Array.from(tagSet).slice(0, 10);
});

function levelText(level) {
  const map = { basic: '基础', intermediate: '进阶', advanced: '深入' };
  return map[level] || level;
}

function typeText(type) {
  const map = { 'single-choice': '单选', 'multiple-choice': '多选', 'true-false': '判断' };
  return map[type] || type;
}

function formatDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function scoreClass(score) {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'pass';
  return 'fail';
}

async function startQuiz() {
  loading.value = true;
  error.value = '';
  try {
    let allQuestions = [];
    if (selectedDomain.value) {
      const res = await fetch(`/quizzes/${selectedDomain.value}.json`);
      if (!res.ok) throw new Error('题库加载失败');
      const data = await res.json();
      allQuestions = (data.questions || []).map(q => ({ ...q, domainId: data.domainId, domainName: data.domainName }));
    } else {
      const files = domains.map(d => `/quizzes/${d.id}.json`);
      const results = await Promise.all(files.map(f => fetch(f).then(r => r.json()).catch(() => ({ questions: [] }))));
      results.forEach(data => {
        const qs = (data.questions || []).map(q => ({ ...q, domainId: data.domainId, domainName: data.domainName }));
        const perDomain = Math.max(1, Math.floor(questionCount.value / domains.length));
        allQuestions.push(...shuffle(qs).slice(0, perDomain));
      });
    }

    if (!allQuestions.length) {
      throw new Error('未找到可用题目');
    }

    const selected = shuffle(allQuestions).slice(0, questionCount.value);
    quizState.value = {
      started: true,
      finished: false,
      questions: selected,
      score: 0,
      correctCount: 0,
    };
    currentIndex.value = 0;
    answers.value = {};
  } catch (e) {
    error.value = e.message || '测评启动失败';
  } finally {
    loading.value = false;
  }
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isSelected(opt) {
  const ans = answers.value[currentQuestion.value.id];
  if (currentQuestion.value.type === 'multiple-choice') {
    return ans && ans.includes(opt);
  }
  return ans === opt;
}

function userAnswer(q) {
  return answers.value[q.id];
}

function selectSingle(opt) {
  answers.value[currentQuestion.value.id] = opt;
}

function selectTrueFalse(opt) {
  answers.value[currentQuestion.value.id] = opt;
}

function selectMultiple(opt) {
  const current = answers.value[currentQuestion.value.id] || [];
  const idx = current.indexOf(opt);
  if (idx > -1) {
    current.splice(idx, 1);
  } else {
    current.push(opt);
  }
  answers.value[currentQuestion.value.id] = [...current];
}

function nextQuestion() {
  if (currentIndex.value < quizState.value.questions.length - 1) {
    currentIndex.value++;
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function isCorrect(q) {
  const ans = answers.value[q.id];
  if (q.type === 'multiple-choice') {
    if (!Array.isArray(ans)) return false;
    const correct = q.answer.slice().sort();
    const given = ans.slice().sort();
    return correct.length === given.length && correct.every((v, i) => v === given[i]);
  }
  return ans === q.answer[0];
}

function submitQuiz() {
  let correct = 0;
  quizState.value.questions.forEach(q => {
    if (isCorrect(q)) correct++;
  });
  const score = Math.round((correct / quizState.value.questions.length) * 100);
  quizState.value.finished = true;
  quizState.value.score = score;
  quizState.value.correctCount = correct;

  const record = {
    date: new Date().toISOString(),
    domainId: selectedDomain.value,
    domainName: selectedDomain.value ? domains.find(d => d.id === selectedDomain.value)?.name : '',
    score,
    total: quizState.value.questions.length,
    correct,
  };
  addQuizRecord(record);
}

function resetQuiz() {
  quizState.value = { started: false, finished: false, questions: [], score: 0, correctCount: 0 };
  answers.value = {};
  currentIndex.value = 0;
}

function goToAssessment() {
  if (typeof window !== 'undefined') {
    window.location.href = '/guide/self-assessment';
  }
}

function goToDashboard() {
  if (typeof window !== 'undefined') {
    window.location.href = '/learning-path/dashboard';
  }
}

function formatAnswer(ans) {
  if (Array.isArray(ans)) return ans.join('、');
  if (ans === 'true') return '正确';
  if (ans === 'false') return '错误';
  return ans;
}
</script>

<style scoped>
.quiz-player {
  margin: 16px 0;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.quiz-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.quiz-domain-select {
  margin-bottom: 16px;
}

.quiz-domain-select label,
.quiz-config label {
  font-weight: 600;
  margin-right: 8px;
}

.quiz-select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  min-width: 240px;
}

.quiz-config {
  margin-bottom: 16px;
}

.quiz-count-options {
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
}

.quiz-count-btn,
.quiz-start-btn,
.quiz-nav-btn,
.quiz-option-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.quiz-count-btn:hover,
.quiz-start-btn:hover:not(:disabled),
.quiz-nav-btn:hover:not(:disabled),
.quiz-option-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.quiz-count-btn.active,
.quiz-option-btn.selected,
.quiz-nav-btn.primary {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.quiz-start-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}

.quiz-start-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.quiz-start-btn.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
}

.quiz-error {
  color: #e53935;
  margin-top: 12px;
}

.quiz-history {
  margin-top: 20px;
}

.quiz-history ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quiz-history li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 14px;
}

.quiz-score {
  font-weight: 700;
}

.quiz-score.excellent,
.quiz-result-score.excellent {
  color: #43a047;
}

.quiz-score.pass,
.quiz-result-score.pass {
  color: #fb8c00;
}

.quiz-score.fail,
.quiz-result-score.fail {
  color: #e53935;
}

.quiz-result {
  text-align: center;
}

.quiz-result-score {
  font-size: 48px;
  font-weight: 700;
  margin: 16px 0;
}

.quiz-result-summary {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.quiz-result-actions {
  margin-bottom: 24px;
}

.quiz-weak-tags {
  text-align: left;
  margin-bottom: 24px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.weak-tag {
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.quiz-review {
  text-align: left;
}

.quiz-review-item {
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.quiz-review-item.correct {
  border-left: 4px solid #43a047;
}

.quiz-review-item.wrong {
  border-left: 4px solid #e53935;
}

.quiz-review-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.quiz-review-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

.quiz-review-badge.correct {
  background: #e8f5e9;
  color: #43a047;
}

.quiz-review-badge.wrong {
  background: #ffebee;
  color: #e53935;
}

.quiz-review-answer {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.quiz-review-explanation {
  font-size: 14px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 8px;
  border-radius: 4px;
}

.quiz-in-progress {
  max-width: 720px;
  margin: 0 auto;
}

.quiz-progress {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.quiz-progress-bar {
  flex: 1;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.quiz-progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.3s;
}

.quiz-progress-text {
  font-size: 14px;
  color: var(--vp-c-text-2);
  min-width: 48px;
  text-align: right;
}

.quiz-question {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}

.quiz-question-header {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.quiz-level,
.quiz-type {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.quiz-question-body {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
  line-height: 1.6;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quiz-option-btn {
  text-align: left;
  padding: 12px 16px;
}

.quiz-nav {
  display: flex;
  justify-content: space-between;
}

.quiz-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .quiz-select {
    width: 100%;
  }
  .quiz-result-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .quiz-start-btn {
    margin-right: 0;
  }
}
</style>
