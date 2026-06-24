# ADR-002：AI 客服项目选择 LLM SDK

## 状态

已采纳（Adopted）

## 背景

公司计划开发一个 AI 客服系统，需要在前端集成大模型能力。候选 SDK 包括：

- Vercel AI SDK
- LangChain.js
- 直接调用 OpenAI API

## 决策目标

- 快速实现流式对话界面。
- 支持 Function Calling 和工具调用。
- 便于切换不同模型供应商（OpenAI、Claude、Qwen）。
- 降低前端与 LLM 交互的复杂度。

## 备选方案

### 方案 1：直接调用 OpenAI API

- **优点**：最简单，无额外依赖。
- **缺点**：需自行处理流式输出、错误重试、多供应商切换。

### 方案 2：Vercel AI SDK

- **优点**：专为前端流式 AI 交互设计，支持 React/Vue/Svelte，内置 SSE 处理。
- **缺点**：生态相对较新，部分高级功能需要结合其他库。

### 方案 3：LangChain.js

- **优点**：功能丰富，支持 RAG、Agent、Prompt 管理。
- **缺点**：学习曲线陡峭，前端 bundle 体积较大。

## 决策

采用 **方案 2：Vercel AI SDK**。

## 权衡（Trade-off）

| 维度 | 影响 | 说明 |
|------|------|------|
| 开发效率 | ✅ 高 | 内置流式渲染、hooks、错误处理 |
| 供应商切换 | ✅ 易 | 统一接口适配多模型 |
| 功能丰富度 | ⚠️ 中 | 复杂 RAG/Agent 需后端或 LangChain 补充 |
| 学习成本 | ✅ 低 | API 简洁，文档清晰 |
| Bundle 体积 | ✅ 小 | 相比 LangChain 更轻量 |

## 实施计划

1. 第 1 周：用 Vercel AI SDK 实现基础聊天界面。
2. 第 2 周：接入 Function Calling，实现订单查询工具。
3. 第 3 周：支持多模型切换（OpenAI / Claude / Qwen）。
4. 第 4 周：接入 RAG，支持基于知识库的回答。

## 决策人

- 前端架构师：张三
- AI 项目负责人：王五

## 日期

2026-04-15

## 最后更新

2026-06-24
