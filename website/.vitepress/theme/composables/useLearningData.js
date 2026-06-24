import { ref, computed, onMounted } from 'vue';

const STORAGE_KEY = 'jgs-learning-data-v2';

const LEGACY_PREFIXES = {
  selfRating: 'self-rating-',
  domainCompleted: 'domain-completed-',
  challengeCode: 'challenge-code-',
  mastered: 'mastered-',
};

const LEGACY_KEYS = {
  quizHistory: 'quiz-history',
};

function createDefaultData() {
  return {
    version: 2,
    ratings: {},
    completedDomains: [],
    quizHistory: [],
    challengeCode: {},
    masteredQuestions: [],
    studyTime: {}, // YYYY-MM-DD -> minutes
    checkins: [], // { date: YYYY-MM-DD, minutes: number }
    goals: { dailyMinutes: 30, weeklyDays: 5 },
    aiChats: [], // { id, role, content, timestamp }
    preferences: {
      aiProvider: 'openrouter', // openrouter | github | ollama | none
      aiModel: '',
      aiApiKey: '',
      ollamaUrl: 'http://localhost:11434',
    },
  };
}

function isClient() {
  return typeof window !== 'undefined';
}

function readLegacyData() {
  if (!isClient()) return {};

  const legacy = {
    ratings: {},
    completedDomains: [],
    quizHistory: [],
    challengeCode: {},
    masteredQuestions: [],
  };

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    if (key.startsWith(LEGACY_PREFIXES.selfRating)) {
      const domainId = key.slice(LEGACY_PREFIXES.selfRating.length);
      const value = parseInt(localStorage.getItem(key), 10);
      if (!isNaN(value)) legacy.ratings[domainId] = value;
    } else if (key.startsWith(LEGACY_PREFIXES.domainCompleted)) {
      const domainId = key.slice(LEGACY_PREFIXES.domainCompleted.length);
      if (localStorage.getItem(key) === 'true') {
        legacy.completedDomains.push(domainId);
      }
    } else if (key.startsWith(LEGACY_PREFIXES.challengeCode)) {
      const challengeId = key.slice(LEGACY_PREFIXES.challengeCode.length);
      legacy.challengeCode[challengeId] = localStorage.getItem(key) || '';
    } else if (key.startsWith(LEGACY_PREFIXES.mastered)) {
      const questionId = key.slice(LEGACY_PREFIXES.mastered.length);
      if (localStorage.getItem(key) === 'true') {
        legacy.masteredQuestions.push(questionId);
      }
    }
  }

  try {
    const raw = localStorage.getItem(LEGACY_KEYS.quizHistory);
    if (raw) {
      const parsed = JSON.parse(raw);
      legacy.quizHistory = Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    legacy.quizHistory = [];
  }

  return legacy;
}

function clearLegacyData() {
  if (!isClient()) return;
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    if (
      key.startsWith(LEGACY_PREFIXES.selfRating) ||
      key.startsWith(LEGACY_PREFIXES.domainCompleted) ||
      key.startsWith(LEGACY_PREFIXES.challengeCode) ||
      key.startsWith(LEGACY_PREFIXES.mastered) ||
      key === LEGACY_KEYS.quizHistory
    ) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
}

export function useLearningData() {
  const data = ref(createDefaultData());
  const isReady = ref(false);

  function load() {
    if (!isClient()) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        data.value = { ...createDefaultData(), ...parsed };
      } else {
        // 首次使用 v2.0，尝试迁移 v1.x 数据
        const legacy = readLegacyData();
        data.value = { ...createDefaultData(), ...legacy };
        save();
        clearLegacyData();
      }
    } catch (e) {
      console.error('加载学习数据失败', e);
      data.value = createDefaultData();
    }
    isReady.value = true;
  }

  function save() {
    if (!isClient()) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value));
    } catch (e) {
      console.error('保存学习数据失败', e);
    }
  }

  function persist() {
    save();
  }

  // 能力自评
  function setRating(domainId, level) {
    data.value.ratings[domainId] = level;
    persist();
  }

  function getRating(domainId) {
    return data.value.ratings[domainId] || 0;
  }

  // 领域完成
  function setDomainCompleted(domainId, completed) {
    const set = new Set(data.value.completedDomains);
    if (completed) set.add(domainId);
    else set.delete(domainId);
    data.value.completedDomains = Array.from(set);
    persist();
  }

  function isDomainCompleted(domainId) {
    return data.value.completedDomains.includes(domainId);
  }

  // 测评历史
  function addQuizRecord(record) {
    data.value.quizHistory.unshift(record);
    if (data.value.quizHistory.length > 50) {
      data.value.quizHistory = data.value.quizHistory.slice(0, 50);
    }
    persist();
  }

  function getQuizHistory() {
    return data.value.quizHistory;
  }

  // 编程题代码
  function setChallengeCode(challengeId, code) {
    data.value.challengeCode[challengeId] = code;
    persist();
  }

  function getChallengeCode(challengeId) {
    return data.value.challengeCode[challengeId] || '';
  }

  // 面试题掌握
  function setQuestionMastered(questionId, mastered) {
    const set = new Set(data.value.masteredQuestions);
    if (mastered) set.add(questionId);
    else set.delete(questionId);
    data.value.masteredQuestions = Array.from(set);
    persist();
  }

  function isQuestionMastered(questionId) {
    return data.value.masteredQuestions.includes(questionId);
  }

  // 学习时长
  function recordStudyMinutes(minutes) {
    const date = new Date().toISOString().slice(0, 10);
    data.value.studyTime[date] = (data.value.studyTime[date] || 0) + minutes;
    persist();
  }

  function getStudyTime(date) {
    return data.value.studyTime[date] || 0;
  }

  // 打卡
  function addCheckin(checkin) {
    data.value.checkins.unshift(checkin);
    if (data.value.checkins.length > 365) {
      data.value.checkins = data.value.checkins.slice(0, 365);
    }
    persist();
  }

  // AI 对话
  function addAiChat(message) {
    data.value.aiChats.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...message,
      timestamp: new Date().toISOString(),
    });
    if (data.value.aiChats.length > 200) {
      data.value.aiChats = data.value.aiChats.slice(-200);
    }
    persist();
  }

  function clearAiChats() {
    data.value.aiChats = [];
    persist();
  }

  // 导出 / 导入
  function exportData() {
    return {
      ...data.value,
      exportedAt: new Date().toISOString(),
    };
  }

  function importData(raw) {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed || typeof parsed !== 'object') throw new Error('数据格式错误');
    data.value = { ...createDefaultData(), ...parsed, version: 2 };
    persist();
  }

  function resetData() {
    data.value = createDefaultData();
    persist();
  }

  // 计算属性
  const completedCount = computed(() => data.value.completedDomains.length);
  const ratedCount = computed(() => Object.keys(data.value.ratings).length);
  const averageRating = computed(() => {
    const values = Object.values(data.value.ratings).filter(v => v > 0);
    if (!values.length) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  });

  onMounted(() => {
    load();
  });

  return {
    data,
    isReady,
    completedCount,
    ratedCount,
    averageRating,
    load,
    save,
    setRating,
    getRating,
    setDomainCompleted,
    isDomainCompleted,
    addQuizRecord,
    getQuizHistory,
    setChallengeCode,
    getChallengeCode,
    setQuestionMastered,
    isQuestionMastered,
    recordStudyMinutes,
    getStudyTime,
    addCheckin,
    addAiChat,
    clearAiChats,
    exportData,
    importData,
    resetData,
  };
}

export default useLearningData;
