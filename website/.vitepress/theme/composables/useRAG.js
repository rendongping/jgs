import { ref } from 'vue';

let indexCache = null;
let indexPromise = null;

async function loadIndex() {
  if (indexCache) return indexCache;
  if (indexPromise) return indexPromise;
  indexPromise = fetch('/knowledge-index.json')
    .then(res => res.json())
    .then(data => {
      indexCache = data;
      return data;
    });
  return indexPromise;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function scoreChunk(chunk, terms) {
  const titleTokens = tokenize(chunk.title + ' ' + chunk.heading);
  const textTokens = tokenize(chunk.text);
  let score = 0;
  for (const term of terms) {
    const inTitle = titleTokens.filter(t => t.includes(term)).length;
    const inText = textTokens.filter(t => t.includes(term)).length;
    score += inTitle * 4 + inText * 1;
  }
  return score;
}

export async function retrieveChunks(question, topK = 5) {
  const index = await loadIndex();
  const terms = tokenize(question);
  if (!terms.length) return [];

  const scored = index.chunks
    .map(chunk => ({ chunk, score: scoreChunk(chunk, terms) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored.map(item => item.chunk);
}

export function buildPrompt(question, chunks) {
  const context = chunks
    .map((c, i) => `[${i + 1}] ${c.title}${c.heading ? ' - ' + c.heading : ''}\n${c.text.slice(0, 500)}`)
    .join('\n\n');

  return `你是前端架构师知识库的 AI 学习助手。请基于以下知识库片段回答用户问题。如果知识库中没有相关信息，请明确说明，不要编造。

知识库片段：
${context}

用户问题：${question}

请用中文回答，尽量简洁、结构化。如果适用，可以引用相关知识点并推荐进一步阅读对应链接。`;
}

export async function askLLM(question, preferences) {
  const provider = preferences?.aiProvider || 'none';
  const apiKey = preferences?.aiApiKey || '';
  const model = preferences?.aiModel || '';
  const ollamaUrl = preferences?.ollamaUrl || 'http://localhost:11434';

  if (provider === 'none' || !apiKey) {
    throw new Error('未配置 AI 服务，请在设置中填写 API Key 或选择离线模式');
  }

  const chunks = await retrieveChunks(question, 5);
  const prompt = buildPrompt(question, chunks);

  if (provider === 'openrouter') {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
      },
      body: JSON.stringify({
        model: model || 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'OpenRouter 请求失败');
    return {
      answer: data.choices?.[0]?.message?.content || '',
      chunks,
    };
  }

  if (provider === 'github') {
    const res = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'GitHub Models 请求失败');
    return {
      answer: data.choices?.[0]?.message?.content || '',
      chunks,
    };
  }

  if (provider === 'ollama') {
    const res = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model || 'llama3',
        messages: [{ role: 'user', content: prompt }],
        stream: false,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ollama 请求失败');
    return {
      answer: data.message?.content || '',
      chunks,
    };
  }

  throw new Error('不支持的 AI 服务提供商');
}

export function useRAG() {
  const loading = ref(false);
  const error = ref('');

  async function ask(question, preferences) {
    loading.value = true;
    error.value = '';
    try {
      const result = await askLLM(question, preferences);
      return result;
    } catch (e) {
      error.value = e.message || '请求失败';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, ask, retrieveChunks };
}

export default useRAG;
