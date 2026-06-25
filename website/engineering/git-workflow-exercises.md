# Git 工作流与版本控制练习册

> 通过练习掌握 Git 高级操作、分支策略、Code Review 与版本管理。

---

## 难度分级

- 🟢 基础：理解概念，能执行基本命令。
- 🟡 进阶：能应用知识解决协作问题。
- 🔴 深入：能设计团队级 Git 工作流和治理方案。

---

## 一、选择题

### 第 1 题（🟢）

以下哪个命令用于将当前修改临时保存，切换到其他分支？

A. `git reset`  
B. `git stash`  
C. `git rebase`  
D. `git cherry-pick`

### 第 2 题（🟢）

Conventional Commits 中，`feat` 表示什么类型？

A. 修复 Bug  
B. 新功能  
C. 文档更新  
D. 代码重构

### 第 3 题（🟡）

Git Flow 中，用于修复线上紧急问题的分支是？

A. feature/*  
B. release/*  
C. hotfix/*  
D. develop

### 第 4 题（🟡）

以下哪种情况适合使用 `git rebase`？

A. 已推送到远程的公共分支  
B. 本地功能分支整理提交历史  
C. 合并两个长期分支并保留完整历史  
D. 撤销某个已发布提交

### 第 5 题（🟡）

语义化版本 `2.1.3` 中，`1` 代表什么？

A. 主版本号  
B. 次版本号  
C. 修订号  
D. 预发布版本

### 第 6 题（🔴）

在 Trunk-Based Development 中，未完成的功能如何管理？

A. 长期 feature 分支  
B. 特性开关（Feature Toggle）  
C. 不提交代码  
D. 单独 release 分支

---

## 二、代码分析题

### 第 7 题（🟡）

分析以下 Git 操作是否存在问题：

```bash
git checkout main
git pull origin main
git rebase feature/login
git push origin main
```

### 第 8 题（🟡）

以下 Commit Message 是否符合 Conventional Commits 规范？如何改进？

```
update login page

fixed some bugs and changed styles
```

### 第 9 题（🔴）

一个团队经常出现以下问题：
- main 分支频繁被打断，无法稳定发布。
- PR 平均 500+ 行改动，Review 效率低。
- Commit Message 混乱，无法生成 CHANGELOG。

请分析问题根源并给出改进方案。

---

## 三、设计/开放题

### 第 10 题（🟡）

为一个 10 人前端团队设计 Git 工作流，要求：
- 每周发布一次
- 支持 hotfix
- 需要 Code Review
- 能自动生成 CHANGELOG

### 第 11 题（🔴）

设计一套大型 Monorepo 的 Git 治理方案，包括：
- 分支策略
- Code Review 规则
- 版本管理（Changesets）
- 权限与 CODEOWNERS
- 性能优化（浅克隆、稀疏检出）

### 第 12 题（🔴）

你作为前端负责人，发现团队 Code Review 流于形式，经常出现：
- Reviewer 只关注代码格式
- 大 PR 一次性合并
- Review 响应慢，阻塞发布

请设计一个可落地的 Code Review 改进计划。

---

## 参考答案

### 第 1 题

::: details 查看答案与解析
**答案：B**

`git stash` 用于临时保存当前工作目录的修改，方便切换到其他分支处理紧急任务。
:::

### 第 2 题

::: details 查看答案与解析
**答案：B**

`feat` 表示新增功能（feature）。
:::

### 第 3 题

::: details 查看答案与解析
**答案：C**

`hotfix/*` 分支用于从 main 分出来修复线上紧急问题，修复后合并回 main 和 develop。
:::

### 第 4 题

::: details 查看答案与解析
**答案：B**

`git rebase` 适合在本地整理提交历史，使历史更线性。不应对已推送的公共分支执行 rebase。
:::

### 第 5 题

::: details 查看答案与解析
**答案：B**

语义化版本 `MAJOR.MINOR.PATCH` 中，`1` 是 MINOR（次版本号），表示向下兼容的功能新增。
:::

### 第 6 题

::: details 查看答案与解析
**答案：B**

Trunk-Based Development 通过特性开关（Feature Toggle）管理未完成的功能，实现高频集成。
:::

### 第 7 题

**问题分析**：
1. `git rebase feature/login` 是在 main 上 rebase feature/login 的提交，方向反了。
2. 如果 main 是公共分支且已经推送到远程，`git push` 会因为历史不一致而失败。

**正确操作**：

```bash
# 在 feature/login 分支上 rebase main，然后合并到 main
git checkout feature/login
git rebase main

git checkout main
git merge feature/login --no-ff
git push origin main
```

### 第 8 题

**问题**：
- 没有 type（feat/fix 等）。
- subject 不够具体。
- body 中混合了多个类型的变更。

**改进示例**：

```
fix(login): 修复登录页样式错位

- 修复移动端下登录按钮被遮挡的问题
- 调整表单间距以匹配设计规范

Closes #456
```

### 第 9 题

**问题根源**：
1. 缺少分支保护，允许直接推送 main。
2. PR 规模过大，Review 难以深入。
3. 缺少 Commit Message 规范。

**改进方案**：
1. 启用 main 分支保护，强制通过 PR 合并。
2. 设定 PR 大小上限（如 300 行），超过需拆分。
3. 引入 Conventional Commits 和 lint 检查。
4. 使用 Changesets 或 semantic-release 自动生成 CHANGELOG。
5. 设定 Review SLA，纳入团队绩效考核。

### 第 10 题

**参考方案**：

采用**简化版 Git Flow**：

```
main：稳定分支，始终可发布
develop：集成分支，日常开发合并到这里
feature/*：功能分支，从 develop 切出
release/*：发布分支，从 develop 切出，测试后合并到 main
hotfix/*：从 main 切出，修复后合并回 main 和 develop
```

**配套流程**：
- 每个功能分支通过 PR 合并到 develop。
- 发布前从 develop 切出 release 分支，只修复 Bug，不新增功能。
- release 合并到 main 后打 Tag。
- 使用 Changesets 生成 CHANGELOG。
- hotfix 合并后立即发布补丁版本。

### 第 11 题

**参考方案**：

**分支策略**：
- main：受保护，只接受 PR 合并。
- feature/*：短生命周期，完成后删除。
- 考虑 Trunk-Based Development，配合 Feature Toggle。

**Code Review 规则**：
- 每个 PR 至少 1 名 CODEOWNERS 批准。
- PR 必须通过 CI（lint/test/build）。
- 单 PR 改动不超过 400 行。

**版本管理**：
- 使用 Changesets 管理多包版本。
- CI 自动发布变更的包。

**权限与 CODEOWNERS**：
- 按目录划分负责人。
- 关键目录（如 core、utils）需要多人批准。

**性能优化**：
- 新成员使用 `--depth 1` 浅克隆。
- 使用 `git sparse-checkout` 只检出需要的包。
- 大文件使用 Git LFS。

### 第 12 题

**改进计划**：

1. **建立 Review 检查清单**：明确 Review 应关注的维度（设计、测试、安全、性能、可访问性），不只是格式。
2. **控制 PR 大小**：设定 300-400 行上限，超过需说明原因或拆分。
3. **设定 Review SLA**：如 24 小时内必须响应，阻塞超过 12 小时升级。
4. **引入自动化检查**：lint、test、format 由 CI 完成，Reviewer 专注于设计问题。
5. **建立 Review 文化**：
   - 对事不对人。
   - Reviewer 也承担质量责任。
   - 定期 Review Review，分析常见遗漏。
6. **工具支持**：使用 GitHub/GitLab 的 Review 工具，支持 suggestion、thread、approval 流程。

---

**标签**：`#git` `#version-control` `#code-review` `#branching-strategy` `#monorepo`

> **最后更新**：2026-06-25
