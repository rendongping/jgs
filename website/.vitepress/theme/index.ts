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

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('KnowledgeGraph', KnowledgeGraph);
    app.component('SelfAssessment', SelfAssessment);
    app.component('InterviewCard', InterviewCard);
    app.component('ProgressTracker', ProgressTracker);
    app.component('LearningPath', LearningPath);
    app.component('MarkComplete', MarkComplete);
    app.component('QuizPlayer', QuizPlayer);
    app.component('CodingChallenge', CodingChallenge);
  }
} as Theme;
