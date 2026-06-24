<template>
  <div class="ai-assistant">
    <div class="ai-settings">
      <div class="ai-setting-row">
        <label>AI 服务：</label>
        <select v-model="preferences.aiProvider" class="ai-select">
          <option value="none">离线模式（仅检索知识库）</option>
          <option value="openrouter">OpenRouter</option>
          <option value="github">GitHub Models</option>
          <option value="ollama">Ollama 本地</option>
        </select>
      </div>
      <div v-if="preferences.aiProvider !== 'none'" class="ai-setting-row">
        <label>API Key：</label>
        <input
          v-model="preferences.aiApiKey"
          type="password"
          class="ai-input"
          placeholder="输入你的 API Key（仅保存在本地浏览器）"
        />
      </div>
      <div v-if="preferences.aiProvider !== 'none'" class="ai-setting-row">
        <label>模型：</label>
        <input
          v-model="preferences.aiModel"
          class="ai-input"
          placeholder="如 openai/gpt-3.5-turbo 或 llama3"
        />
      </div>
      <div v-if="preferences.aiProvider === 'ollama'" class="ai-setting-row">
        <label>Ollama 地址：</label>
        <input v-model="preferences.ollamaUrl" class="ai-input" placeholder="http://localhost:11434" />
      </div>
      <button class="ai-save-btn" @click="savePreferences">保存设置</button>
    </div>

    <div class="ai-chat">
      <div class="ai-messages" ref="messagesRef">
        <div v-if="!messages.length" class="ai-empty">
          <p>👋 我是前端架构师知识库 AI 助手。</p>
          <p>你可以问我：</p>
          <ul>
            <li>「什么是闭包？」</li>
            <li>「帮我出 3 道 React 面试题」</li>
            <li>「微前端有哪些方案？」</li>
          </ul>
        </div>
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="ai-message"
          :class="msg.role"
        >
          <div class="ai-message-role">{{ msg.role === 'user' ? '你' : 'AI 助手' }}</div>
          <div class="ai-message-content" v-html="renderMarkdown(msg.content)"></div>
          <div v-if="msg.chunks && msg.chunks.length" class="ai-message-sources">
            <div class="ai-sources-title">参考来源：</div>
            <a
              v-for="(chunk, idx) in msg.chunks.slice(0, 3)"
              :key="idx"
              :href="chunk.url"
              class="ai-source-link"
            >{{ chunk.title }}{{ chunk.heading ? ' · ' + chunk.heading : '' }}</a>
          </div>
        </div>
        <div v-if="loading" class="ai-message assistant">
          <div class="ai-message-role">AI 助手</div>
          <div class="ai-message-content">正在思考...</div>
        </div>
      </div>

      <div class="ai-input-area">
        <textarea
          v-model="input"
          class="ai-textarea"
          rows="2"
          placeholder="输入你的问题..."
          @keydown.enter.prevent="send"
        ></textarea>
        <button class="ai-send-btn" :disabled="!input.trim() || loading" @click="send">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useLearningData } from '../composables/useLearningData.js';
import { useRAG, retrieveChunks } from '../composables/useRAG.js';

const { data, addAiChat } = useLearningData();
const { loading, error, ask } = useRAG();

const preferences = ref({
  aiProvider: 'none',
  aiApiKey: '',
  aiModel: '',
  ollamaUrl: 'http://localhost:11434',
});

const messages = computed(() => data.value?.aiChats || []);
const input = ref('');
const messagesRef = ref(null);

onMounted(() => {
  if (data.value?.preferences) {
    preferences.value = { ...preferences.value, ...data.value.preferences };
  }
});

function savePreferences() {
  data.value.preferences = { ...preferences.value };
  if (typeof window !== 'undefined') {
    window.alert('设置已保存到本地');
  }
}

function renderMarkdown(text) {
  // 简单渲染：代码块、加粗、列表
  if (!text) return '';
  return text
    .replace(/```([\s\S]*?)```/g, '<pre class="ai-code-block"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n/g, '<br>');
}

async function scrollToBottom() {
  await nextTick();
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
  }
}

async function send() {
  const question = input.value.trim();
  if (!question || loading.value) return;

  addAiChat({ role: 'user', content: question });
  input.value = '';
  await scrollToBottom();

  try {
    if (preferences.value.aiProvider === 'none') {
      // 离线模式：只检索并返回相关片段
      const chunks = await retrieveChunks(question, 5);
      let content = '当前为离线模式，我为你找到了以下相关知识点：\n\n';
      chunks.forEach((c, i) => {
        content += `${i + 1}. **${c.title}${c.heading ? ' - ' + c.heading : ''}**\n${c.text.slice(0, 300)}...\n\n`;
      });
      if (!chunks.length) content = '未找到相关知识库片段，请尝试其他关键词。';
      addAiChat({ role: 'assistant', content, chunks });
    } else {
      const result = await ask(question, preferences.value);
      addAiChat({ role: 'assistant', content: result.answer, chunks: result.chunks });
    }
  } catch (e) {
    addAiChat({ role: 'assistant', content: `请求失败：${e.message || '未知错误'}` });
  }
  await scrollToBottom();
}

watch(messages, scrollToBottom, { deep: true });
</script>

<style scoped>
.ai-assistant {
  margin: 16px 0;
}

.ai-settings {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
}

.ai-setting-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.ai-setting-row label {
  font-size: 14px;
  font-weight: 500;
  min-width: 80px;
}

.ai-select,
.ai-input {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  flex: 1;
  min-width: 200px;
}

.ai-save-btn {
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.ai-save-btn:hover {
  opacity: 0.9;
}

.ai-chat {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.ai-messages {
  height: 400px;
  overflow-y: auto;
  padding: 16px;
}

.ai-empty {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.ai-empty ul {
  margin: 8px 0;
  padding-left: 20px;
}

.ai-message {
  margin-bottom: 16px;
}

.ai-message.user {
  text-align: right;
}

.ai-message.assistant {
  text-align: left;
}

.ai-message-role {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.ai-message-content {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 14px;
  line-height: 1.6;
  max-width: 90%;
  text-align: left;
}

.ai-message.user .ai-message-content {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.ai-message-sources {
  margin-top: 6px;
  font-size: 12px;
}

.ai-sources-title {
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.ai-source-link {
  display: inline-block;
  margin-right: 8px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.ai-source-link:hover {
  text-decoration: underline;
}

.ai-input-area {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.ai-textarea {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  resize: none;
}

.ai-send-btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.ai-send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .ai-setting-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .ai-input-area {
    flex-direction: column;
  }
  .ai-send-btn {
    width: 100%;
  }
}
</style>
