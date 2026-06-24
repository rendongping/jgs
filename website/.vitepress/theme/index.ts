import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import './style.css';

// 导入自定义组件
import KnowledgeGraph from './components/KnowledgeGraph.vue';
import SelfAssessment from './components/SelfAssessment.vue';
import InterviewCard from './components/InterviewCard.vue';
import ProgressTracker from './components/ProgressTracker.vue';
import LearningPath from './components/LearningPath.vue';
import MarkComplete from './components/MarkComplete.vue';
import QuizPlayer from './components/QuizPlayer.vue';
import CodingChallenge from './components/CodingChallenge.vue';
import LearningDashboard from './components/LearningDashboard.vue';
import AIAssistant from './components/AIAssistant.vue';
import InterviewPractice from './components/InterviewPractice.vue';
import ContentFeedback from './components/ContentFeedback.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册 Service Worker（PWA 离线支持）
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/jgs/sw.js').catch(err => {
          console.warn('Service Worker 注册失败', err);
        });
      });
    }

    // 注册全局组件
    app.component('KnowledgeGraph', KnowledgeGraph);
    app.component('SelfAssessment', SelfAssessment);
    app.component('InterviewCard', InterviewCard);
    app.component('ProgressTracker', ProgressTracker);
    app.component('LearningPath', LearningPath);
    app.component('MarkComplete', MarkComplete);
    app.component('QuizPlayer', QuizPlayer);
    app.component('CodingChallenge', CodingChallenge);
    app.component('LearningDashboard', LearningDashboard);
    app.component('AIAssistant', AIAssistant);
    app.component('InterviewPractice', InterviewPractice);
    app.component('ContentFeedback', ContentFeedback);
  }
} as Theme;
