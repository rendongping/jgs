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

### 第 7 题（🟡）

以下哪个 Git Hook 适合用来校验 Commit Message 格式？

A. pre-commit  
B. commit-msg  
C. pre-push  
D. post-commit

### 第 8 题（🔴）

团队使用 Git Flow，线上发现紧急 Bug，正确的操作顺序是？

A. 从 main 切 hotfix 分支 → 修复 → 合并到 main 和 develop  
B. 从 develop 切 hotfix 分支 → 修复 → 合并到 main  
C. 直接在 main 上修复 → 推送  
D. 从 feature 切 hotfix 分支 → 修复 → 合并到 feature

---

## 二、代码分析题

### 第 9 题（🟡）

分析以下 Git 操作是否存在问题：

```bash
git checkout main
git pull origin main
git rebase feature/login
git push origin main
```

### 第 10 题（🟡）

以下 Commit Message 是否符合 Conventional Commits 规范？如何改进？

```
update login page

fixed some bugs and changed styles
```

### 第 11 题（🔴）

团队使用 Trunk-Based Development，某开发者将以下代码推送到 main：

```javascript
if (featureFlags.newCheckout) {
  // 新结账流程，尚未完成
  renderNewCheckout();
} else {
  renderOldCheckout();
}
```

请问这个做法存在什么问题？如何改进？

### 第 12 题（🟡）

分析以下场景的冲突原因和解决方案：

Alice 在 `feature/a` 分支上修改了 `src/styles/button.css` 的第 50 行，Bob 在 `feature/b` 分支上修改了同一文件的第 55 行。两人都基于 main 分支开发。Bob 先合并到 main，Alice 合并时遇到冲突：

```bash
git checkout main
git merge feature/a
# 提示：Auto-merging src/styles/button.css
# CONFLICT (content): Merge conflict in src/styles/button.css
```

请问：
1. 冲突的可能原因是什么？
2. 正确的解决步骤是什么？
3. 如何避免此类冲突？

### 第 13 题（🔴）

一个团队经常出现以下问题：
- main 分支频繁被打断，无法稳定发布。
- PR 平均 500+ 行改动，Review 效率低。
- Commit Message 混乱，无法生成 CHANGELOG。

请分析问题根源并给出改进方案。

### 第 14 题（🟡）

以下 Husky pre-commit hook 配置是否正确？如果不正确，请指出问题：

```bash
# .husky/pre-commit
npm run test
npm run lint
npm run build
git add .
```

### 第 15 题（🔴）

开发者执行了以下命令后，发现丢失了重要代码：

```bash
git reset --hard HEAD~3
```

请问如何找回丢失的提交？请给出完整的恢复步骤。

---

## 三、设计/开放题

### 第 16 题（🟡）

为一个 10 人前端团队设计 Git 工作流，要求：
- 每周发布一次
- 支持 hotfix
- 需要 Code Review
- 能自动生成 CHANGELOG

### 第 17 题（🔴）

设计一套大型 Monorepo 的 Git 治理方案，包括：
- 分支策略
- Code Review 规则
- 版本管理（Changesets）
- 权限与 CODEOWNERS
- 性能优化（浅克隆、稀疏检出）

### 第 18 题（🔴）

你作为前端负责人，发现团队 Code Review 流于形式，经常出现：
- Reviewer 只关注代码格式
- 大 PR 一次性合并
- Review 响应慢，阻塞发布

请设计一个可落地的 Code Review 改进计划。

### 第 19 题（🟡）

团队有两个长期并行的功能分支（feature-a 和 feature-b），都已经开发了 3 周。现在 feature-a 需要合并 feature-b 的最新改动，但两者都与 main 产生了大量冲突。

请设计一种使用 `git rerere` 来减少合并痛苦的具体实施方案。

### 第 20 题（🔴）

设计一个 50 人团队的 Git 分支策略和发布管理方案，要求：

团队背景：
- 前端 20 人，后端 20 人，QA 5 人，DevOps 5 人。
- 产品有 Web、Mobile Web 和 WeChat Mini Program 三个端。
- 每周一个版本，每季度一个大版本。
- 需要支持多个历史版本的 hotfix（至少维护最近两个版本）。

请给出：
1. 分支策略选择及理由。
2. 版本 Tag 命名规范。
3. Release 管理流程。
4. 多版本 Hotfix 策略。
5. 代码所有权（CODEOWNERS）设计。

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

::: details 查看答案与解析
**答案：B**

`commit-msg` hook 在提交信息被创建之后、提交完成之前触发，适合校验 commit message 格式。`pre-commit` 在 commit 前触发，适合代码检查；`pre-push` 在 push 前触发，适合运行测试。
:::

### 第 8 题

::: details 查看答案与解析
**答案：A**

Git Flow 的 hotfix 流程：
1. 从 `main` 切出 `hotfix/*` 分支。
2. 在 hotfix 分支上修复 Bug。
3. 修复后合并回 `main`（打上补丁版本 Tag）。
4. 同时合并到 `develop`，确保修复同步到开发分支。

B 错误：hotfix 应该从 main 而不是 develop 切出。C 错误：直接在 main 上修改变更了受保护分支。D 错误：hotfix 不应该从 feature 分支切出。
:::

### 第 9 题

::: details 查看答案与解析
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
:::

### 第 10 题

::: details 查看答案与解析
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
:::

### 第 11 题

::: details 查看答案与解析
**存在的问题**：
1. 将未完成的功能代码（newCheckout 流程）推送到了 main 分支。
2. 如果 feature flag 意外开启，用户会看到未完成的功能。

**改进方案**：

1. **使用合适的 toggle 类型**：对于未完成的功能，toggle 应该默认关闭，且值存储在服务端配置或环境变量中，而非硬编码在代码中。

2. **添加 toggle 守卫**：

```javascript
// 使用环境变量控制，确保生产环境关闭
const features = {
  newCheckout: process.env.FEATURE_NEW_CHECKOUT === 'true',
};

// 添加守卫逻辑，即使 toggle 打开，也检查功能完整性
if (features.newCheckout && isFeatureComplete('newCheckout')) {
  renderNewCheckout();
} else {
  renderOldCheckout();
}
```

3. **短期分支策略**：即使使用 Trunk-Based Development，也建议通过短生命周期分支 + PR 合入 main，而非直接推送。

4. **自动清理**：功能完成后及时清理 toggle 和相关条件分支，保持代码整洁。
:::

### 第 12 题

::: details 查看答案与解析
**1. 冲突的可能原因**：
- 虽然两人修改了同一文件的不同行号，但如果附近的代码上下文（如函数调用、导入语句等）发生了变化，Git 无法确定合并顺序，可能产生冲突。
- 也可能是因为一方修改的行涉及到了另一方改动的上下文区域。

**2. 正确的解决步骤**：

```bash
# 1. 拉取最新的 main
git checkout main
git pull origin main

# 2. 合并 feature/a 到 main
git merge feature/a

# 3. 手动解决冲突文件
# 编辑 src/styles/button.css，保留双方的合理修改

# 4. 标记冲突已解决
git add src/styles/button.css

# 5. 提交合并
git commit

# 6. 推送
git push origin main
```

**3. 避免此类冲突的方法**：
- 小步提交、频繁集成，减少分支偏离时间。
- 与团队成员沟通，避免多人同时修改同一文件。
- 明确模块边界，使用文件拆分减少冲突概率。
- 使用 `git rerere` 记住冲突解决方案，减少重复处理。
:::

### 第 13 题

::: details 查看答案与解析
**问题根源**：
1. 缺少分支保护，允许直接推送 main。
2. PR 规模过大，Review 难以深入。
3. 缺少 Commit Message 规范。

**改进方案**：
1. 启用 main 分支保护，强制通过 PR 合并。
2. 设定 PR 大小上限（如 300 行），超过需拆分。
3. 引入 Conventional Commits 和 commitlint 检查。
4. 使用 Changesets 或 semantic-release 自动生成 CHANGELOG。
5. 设定 Review SLA，纳入团队绩效考核。
6. 引入 Husky pre-commit hook 自动检查代码格式。
:::

### 第 14 题

::: details 查看答案与解析
**存在两个问题**：

1. **命令执行时机错误**：`test`、`lint`、`build` 在 pre-commit 中运行会导致 commit 前等待较长时间，使开发者产生挫败感。建议将 build 移至 pre-push，test 放在 CI 中。

2. **`git add .` 不应该在 hook 中使用**：自动添加所有文件可能导致意外文件被提交。如果配合 `lint-staged`，应该由 lint-staged 管理 staged 文件的添加。

**改进后的配置**：

```bash
# .husky/pre-commit — 只做轻量检查
npx lint-staged
```

```bash
# .husky/pre-push — 运行耗时操作
npm run test
npm run build
```

**lint-staged 配置**：
```json
{
  "lint-staged": {
    "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```
:::

### 第 15 题

::: details 查看答案与解析
**恢复步骤**：

```bash
# 1. 查看 reflog，找到被 reset 之前的 HEAD 位置
git reflog

# 输出示例：
# a1b2c3d HEAD@{1}: reset: moving to HEAD~3
# e5f6g7h HEAD@{2}: commit: feat(cart): 添加购物车计算逻辑
# i9j0k1l HEAD@{3}: commit: fix(checkout): 修复价格显示问题
# m2n3o4p HEAD@{4}: commit: feat(user): 添加用户等级展示

# 2. 从 reflog 中找到 reset 之前的最新提交（HEAD@{1} 或直接使用 e5f6g7h）
git reset --hard HEAD@{1}
# 或
git reset --hard e5f6g7h

# 3. 验证恢复结果
git log --oneline -5
```

**注意事项**：
- reflog 只在本地有效，如果已经执行了 `git gc` 或 reflog 超时（默认 90 天），可能无法恢复。
- 如果丢失的提交已经推送到远程，可以直接从远程拉取。
- 建议立即执行恢复操作，不要在 reset 后做其他可能导致 reflog 被覆盖的操作。
:::

### 第 16 题

::: details 查看答案与解析
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
:::

### 第 17 题

::: details 查看答案与解析
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
:::

### 第 18 题

::: details 查看答案与解析
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
:::

### 第 19 题

::: details 查看答案与解析
**实施方案**：

**第一步：启用 rerere**

```bash
# 全局启用 git rerere
git config --global rerere.enabled true
```

**第二步：feature-b 先合并到 feature-a（第一次解决冲突）**

```bash
git checkout feature-a
git merge feature-b
# 遇到冲突，手动解决
# Git rerere 会记录这次冲突解决方案
git add .
git merge --continue
```

**第三步：后续频繁同步时，rerere 自动应用已记录的解决方案**

```bash
# 当 feature-b 有新的提交时，再次合并
git merge feature-b
# Git 会提示：Resolved 'path/to/file' using previous resolution.
# 只处理新增的冲突部分
```

**第四步：合并到 main 前的最终同步**

```bash
# rebase main 时 rerere 同样有效
git rebase main
# 已解决的冲突自动应用，只需处理新增冲突
```

**注意事项**：
- rerere 记录保存在 `.git/rr-cache` 目录中，不会推送到远程。
- 如果冲突解决方案在后续需要调整，rerere 会自动更新记录。
- 团队成员都需要启用 rerere 才能享受完整收益。
:::

### 第 20 题

::: details 查看答案与解析
**参考方案**：

**1. 分支策略选择（Trunk-Based Development + 版本分支）**

选择理由：
- 50 人团队并发高，需要减少合并冲突（TBD 的短分支策略）。
- 三个端共享核心代码，TBD 的频繁集成有助于发现跨端兼容问题。
- 需要维护历史版本，引入版本分支支持 LTS。

```
main ──●──●──●──●──●──●──●──●──●─────  (始终可发布)
         \  /  \  /  \  /  \  /
short     ●    ●    ●    ●              (feature 分支 < 2 天)
                                       
v1.x ─────●────●────●────●────●─────    (LTS 分支，仅修 Bug)
v2.x ───────────●────●────●────●─────   (当前大版本)
```

**2. 版本 Tag 命名规范**

```
v<MAJOR>.<MINOR>.<PATCH>-<端标识>.<构建号>

示例：
v2.1.0                  # 全端统一版本
v2.1.0-web              # Web 端特定版本
v2.1.1-wechat           # 小程序端补丁
v2.1.0-rc.1             # 候选发布版本
```

**3. Release 管理流程**

```
周一至周三：功能开发（feature 分支 → main）
周四：冻结新功能，只修 Bug
周五上午：从 main 切出 release 分支进行回归测试
周五下午：release 合并到 main，打 Tag，部署生产
```

**4. 多版本 Hotfix 策略**

```bash
# 当前最新版本 v2.1.0 有 Bug，同时需要修复 v1.5.0 LTS

# 修复最新版本
git checkout -b hotfix/v2.1.1 main
# 修复、提交
git checkout main
git merge hotfix/v2.1.1
git tag v2.1.1

# 修复 LTS 版本
git checkout -b hotfix/v1.5.1 v1.x
# 修复、提交
git checkout v1.x
git merge hotfix/v1.5.1
git tag v1.5.1

# 如果有必要，将修复 cherry-pick 到 main
git checkout main
git cherry-pick <hotfix-commit-hash>
```

**5. CODEOWNERS 设计**

```
# 全局默认负责人
*                          @team/frontend-core

# 各端代码负责人
/packages/web/**          @team/frontend-web
/packages/mobile/**       @team/frontend-mobile
/packages/wechat/**       @team/frontend-wechat

# 共享工具库
/packages/shared/**       @team/frontend-core

# CI/CD 配置
/.github/workflows/**     @team/devops

# 安全相关
**/security/**            @team/security
**/auth/**                @team/security @team/backend-auth

# 测试
/tests/e2e/**             @team/qa
```

**关键成功因素**：
- 高度自动化的 CI/CD 流水线（每个 PR 自动构建、测试、部署预览环境）。
- Feature Toggle 管理系统（支持灰度发布和 A/B 测试）。
- 清晰的包划分和模块边界，减少跨团队冲突。
- 定期（每季度）回顾和调整工作流。
:::

---

**标签**：`#git` `#version-control` `#code-review` `#branching-strategy` `#monorepo`

> **最后更新**：2026-07-06
