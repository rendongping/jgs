# Git 工作流与版本控制：团队协作的基石

> 目标：掌握 Git 高级操作、分支策略、Code Review 流程与大型仓库治理方法。

---

## 核心要点（TL;DR）

- Git 不仅是代码备份工具，更是团队协作、代码质量和发布节奏的基础设施。
- 分支策略没有银弹，应根据团队规模、发布频率和协作模式选择 Git Flow、GitHub Flow 或 Trunk-Based Development。
- Code Review 是质量门禁和知识传播的核心环节，应建立可执行的流程和文化。
- Commit Message 规范、CHANGELOG 自动化和版本号管理是可持续发布的基础。
- 大型仓库需要关注性能（clone、checkout、log）、权限治理和 Monorepo 协同。

---

## 学习时长与前置知识

- **建议学习时长**：2-3 周（每周投入 5-7 小时）
- **前置知识**：Git 基础命令、团队协作经验、CI/CD 基础（E03）

---

## 一、Git 在工程化中的位置

Git 是现代软件开发的事实标准，贯穿整个研发流程：

```
需求 → 开发分支 → Commit → Push → Pull Request → Code Review → Merge → 发布 → Tag
```

前端架构师需要关注的不仅是会用 Git，而是：
- 设计适合团队的协作流程。
- 通过 Git 保障代码质量和可追溯性。
- 优化大型仓库的访问性能。
- 将 Git 与 CI/CD、发布、回滚打通。

---

## 二、Git 高级操作

### 2.1 Rebase vs Merge

| 场景 | Merge | Rebase |
|------|-------|--------|
| 保留完整历史 | ✅ | ❌（改写历史） |
| 历史线性清晰 | ❌ | ✅ |
| 已推送的公共分支 | ✅ | ❌（危险） |
| 本地整理提交 | 可选 | ✅ |

**建议**：
- 功能分支合并到主分支时，使用 `--no-ff` 保留功能边界。
- 本地分支整理提交历史时，使用 interactive rebase。
- 不要对已经推送到远程的公共分支做 rebase。

### 2.2 Cherry-pick 与 Revert

```bash
# 将某个提交应用到当前分支
git cherry-pick <commit-hash>

# 撤销某个提交（生成反向提交）
git revert <commit-hash>
```

Cherry-pick 适合 hotfix；Revert 适合安全回滚，不改写历史。

### 2.3 Stash、Reset、Checkout

```bash
# 临时保存当前修改
git stash push -m "临时保存登录逻辑"

# 恢复最近一次 stash
git stash pop

# 软重置，保留改动到暂存区
git reset --soft HEAD~1

# 硬重置，丢弃改动（谨慎）
git reset --hard HEAD~1

# 切换并创建分支
git checkout -b feature/login
```

### 2.4 Bisect：二分查找 Bug

```bash
# 启动 bisect
git bisect start

# 标记当前版本为 bad
git bisect bad HEAD

# 标记已知的 good 版本
git bisect good v1.0.0

# Git 会检出一个中间提交，测试后标记：
git bisect good   # 如果当前版本没有 bug
git bisect bad    # 如果当前版本有 bug

# 重复标记，Git 会不断缩小范围，最终定位到引入 bug 的提交
# 结束 bisect
git bisect reset
```

**自动化 bisect**：可以编写脚本自动测试，让 bisect 全自动运行。

```bash
git bisect start HEAD v1.0.0
git bisect run npm test   # 自动运行测试脚本，根据退出码判断 good/bad
git bisect reset
```

### 2.5 Reflog：事故恢复利器

`git reflog` 记录了所有 HEAD 的移动历史，是恢复误操作的最后手段。

```bash
# 查看 reflog 历史
git reflog

# 输出示例：
# e5a3b2f HEAD@{0}: commit: fix(auth): 修复登录超时
# c8d9e1a HEAD@{1}: reset: moving to HEAD~1
# f1a2b3c HEAD@{2}: commit: feat(cart): 添加购物车功能

# 恢复被 reset 丢弃的提交
git reset --hard HEAD@{1}

# 恢复被误删的分支
git checkout -b recovered-branch HEAD@{2}
```

**重要**：reflog 只在本地有效，不会推送到远程。未追踪（untracked）的文件无法通过 reflog 恢复。

### 2.6 Rerere：重复冲突的救星

`rerere` (Reuse Recorded Resolution) 能记住你如何解决冲突，并在下次遇到相同冲突时自动应用。

```bash
# 启用 rerere
git config --global rerere.enabled true
```

**使用场景**：
- 长期存在的功能分支，需要反复 rebase main。
- 合并多个互相依赖的分支。
- 团队中多人频繁修改同一组文件。

启用后，Git 会自动记录冲突解决的过程。下次遇到相同的冲突时，Git 会提示 "Resolved 'file.txt' using previous resolution." 并自动应用。

---

## 三、分支策略选型

### 3.1 Git Flow

```
main    ────●────────────────────●──────────
              \                  /
develop  ──────●──●──●──●──●──●────────────
                 \    /
feature/*         ●──●

hotfix/*     ●────●
              \  /
main          ●──●──────────────────●────────
```

特点：
- 有 main、develop、feature、release、hotfix 五种分支。
- 适合有固定发布周期的项目。
- 分支较多，管理复杂。

**完整工作流**：
1. 从 `develop` 切出 `feature/*` 分支开发新功能。
2. 功能完成后通过 PR 合并回 `develop`。
3. 发布前从 `develop` 切出 `release/*` 分支，冻结新功能，只修 Bug。
4. `release` 分支测试稳定后，合并到 `main` 并打上版本 Tag。
5. `release` 同时合并回 `develop`，确保修复同步。
6. 线上紧急问题从 `main` 切出 `hotfix/*`，修复后合并回 `main` 和 `develop`。

**适用团队**：有固定发布周期的中大型团队（如每两周发版一次）。

**常见问题**：
- 分支过多，流程繁琐。
- hotfix 合并容易遗漏同步到 develop。
- 不适合持续部署场景。

### 3.2 GitHub Flow

```
main  ────────────────────────────────────
        \                         /
feature  ●──●──●──●──●──●──●──●
```

特点：
- 只有 `main` 和 `feature` 分支。
- 通过 Pull Request 合并。
- 适合持续部署、发布频繁的项目。

**完整工作流**：
1. 从 `main` 切出 `feature` 分支。
2. 在 feature 分支上提交修改。
3. 创建 Pull Request，发起 Code Review。
4. Review 通过后合并到 `main`。
5. 合并后立即部署。

**适用团队**：持续部署的团队，发布频率高（每天多次）。

**优缺点**：
- 流程简单，学习成本低。
- 没有 develop 和 release 分支，版本管理需要 Tag 支撑。
- 多版本并行发布较困难。

### 3.3 GitLab Flow

GitLab Flow 在 GitHub Flow 基础上增加了环境分支和环境集成：

```
main ──●──●──●──●──●──●────────────
        \     \     \
staging  ●────●────●────●────●──────
                      \
production            ●────●────●───
```

特点：
- 支持环境分支（staging、pre-production、production）。
- 支持版本分支（适用于需要维护多个版本的场景）。
- 按环境逐步晋升（promotion）。

**适用团队**：有多个部署环境的团队，需要环境隔离的发布流程。

### 3.4 Trunk-Based Development

```
main  ──●──●──●──●──●──●──●──●──●──●──
         \  /   \  /   \  /   \  /
short     ●      ●      ●      ●
(branch lifetime < 1-2 days)
```

特点：
- 所有开发者直接在 `main` 或非常短生命周期的分支（< 1-2 天）上工作。
- 要求高频集成、特性开关（Feature Toggle）。
- 适合大型团队和快速迭代。

**完整工作流**：
1. 从 `main` 切出短生命周期分支。
2. 开发者在小分支上提交（通常每天 1-2 次提交）。
3. 分支生命周期不超过 1-2 天，避免与 main 偏离过远。
4. 通过 PR + CI 后快速合并到 main。
5. 未完成的功能通过 Feature Toggle 隐藏。

**Feature Toggle 实现方式**：

```javascript
// 通过配置文件控制功能开关
const features = {
  newCheckout: process.env.FEATURE_NEW_CHECKOUT === 'true',
  recommendationEngine: process.env.FEATURE_RECOMMENDATION === 'true',
};

if (features.newCheckout) {
  renderNewCheckout();
} else {
  renderOldCheckout();
}
```

**开发中隐藏未完成功能**：
1. 配置文件中的 toggle 默认关闭。
2. 开发完成并测试通过后，打开 toggle。
3. 确认稳定后，清理 toggle 代码。

**优缺点**：
- 减少合并冲突，提高交付速度。
- 需要高度自动化的 CI/CD 和测试覆盖。
- 需要严格维护 Feature Toggle，避免遗留技术债。
- 对团队纪律要求高，不适合随意 push 的团队。

### 3.5 选型建议

| 团队规模 | 发布频率 | 推荐策略 | 关键配套 |
|---------|---------|---------|---------|
| 小团队（1-5 人） | 高频 | GitHub Flow | CI + Code Review |
| 中团队（5-20 人） | 固定周期 | Git Flow 简化版 | Release 分支 + Tag |
| 大团队（20+ 人） | 持续交付 | Trunk-Based + Feature Toggle | 自动化测试 + Feature Flag 管理 |
| 多环境部署团队 | 环境晋升 | GitLab Flow | 环境分支 + 部署流水线 |

---

## 四、Commit Message 规范

### 4.1 Conventional Commits 完整规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**type（必填）**：

| type | 说明 | 是否触发版本更新 |
|------|------|----------------|
| `feat` | 新功能 | 次版本号 (MINOR) |
| `fix` | 修复 Bug | 修订号 (PATCH) |
| `docs` | 仅文档变更 | 否 |
| `style` | 代码格式（空格、分号等） | 否 |
| `refactor` | 重构（既不修复 bug 也不增加功能） | 否 |
| `perf` | 性能优化 | 否（但值得关注） |
| `test` | 添加或修改测试 | 否 |
| `chore` | 构建过程或辅助工具变动 | 否 |
| `build` | 影响构建系统或外部依赖 | 否 |
| `ci` | CI 配置变更 | 否 |

**scope（可选）**：影响范围，如组件名、模块名、包名。

**subject（必填）**：简短描述，不超过 50 个字符，首字母小写，不加句号。

**body（可选）**：详细描述变化内容，可以包含列表。

**footer（可选）**：关联的 Issue、Breaking Changes 说明。

### 4.2 完整示例

```git
feat(auth): 实现 OAuth 2.0 登录流程

- 支持 GitHub 和 Google OAuth 登录
- 添加登录状态持久化（localStorage + cookie 双重保障）
- 实现 token 刷新机制，过期自动刷新

Closes #123, #456
```

```git
fix(api): 修复用户列表接口分页参数错误

page 参数从 0 开始索引导致第一页数据被跳过

Closes #789
```

```git
feat(api)!: 重构用户认证返回格式

BREAKING CHANGE: 登录接口返回格式从 `{ token }` 改为 `{ accessToken, refreshToken, expiresIn }`

旧的集成代码需要更新为新的字段名
```

**注意**：`!` 在 type 后面表示 breaking change，等价于 footer 中的 `BREAKING CHANGE`。两者都会触发 MAJOR 版本更新。

### 4.3 为什么要规范？

- 自动生成 CHANGELOG（通过 standard-version、semantic-release）。
- 通过提交历史快速定位问题。
- 支撑语义化版本（Semantic Versioning）的自动化管理。
- 便于 Code Review 和理解变更意图。
- 新人可以快速了解项目历史和变更模式。

### 4.4 Commit Message 最佳实践

| 反例 | 问题 | 正例 |
|------|------|------|
| `fix bug` | 不明确 fix 什么 | `fix(login): 修复密码输入长度校验错误` |
| `update code` | 无意义 | `refactor(utils): 提取日期格式化工具函数` |
| `add new stuff` | 太模糊 | `feat(dashboard): 添加数据导出 CSV 功能` |
| `fix things and update styles` | 混合多个变更 | 拆分为两个 commit |
| `WIP` | 不应出现在主分支 | 本地 squash 后再推送 |
| `Merge branch 'xxx'` | 自动生成，应避免过多合并提交 | rebase 后再合并 |

---

## 五、版本号管理与发布自动化

### 5.1 语义化版本（SemVer）

```
MAJOR.MINOR.PATCH (e.g., 2.1.3)
```

- **MAJOR**：不兼容的 API 修改（如 1.x → 2.x）。
- **MINOR**：向下兼容的功能新增（如 1.1.0 → 1.2.0）。
- **PATCH**：向下兼容的问题修复（如 1.1.0 → 1.1.1）。

**预发布版本和构建元数据**：

```
1.0.0-alpha.1       # 内测版本
1.0.0-beta.2        # 公测版本
1.0.0-rc.1          # 候选发布版本
1.0.0+build.20210601 # 构建元数据（不影响优先级）
```

### 5.2 自动化版本管理工具

| 工具 | 作用 | 适用场景 |
|------|------|---------|
| Changesets | Monorepo 版本管理和 CHANGELOG 生成 | Monorepo 项目 |
| semantic-release | 基于 Conventional Commits 全自动发布 | 成熟的项目，CI 集成 |
| standard-version | 自动生成版本号和 CHANGELOG | 简单项目，手动触发 |
| commit-and-tag-version | standard-version 的维护分支 | 需要最新功能兼容 |

### 5.3 standard-version 使用示例

```bash
# 安装
npm install --save-dev standard-version

# package.json 配置
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch",
    "release:major": "standard-version --release-as major",
    "publish": "git push --follow-tags origin main"
  }
}
```

**执行流程**：
1. 运行 `npm run release`。
2. 从 Conventional Commits 分析版本变更类型。
3. 自动更新版本号（package.json）。
4. 生成/更新 CHANGELOG.md。
5. 创建版本 Tag。
6. 运行 `npm run publish` 推送 Tag 到远程。

### 5.4 semantic-release 配置示例

```bash
# 安装
npm install --save-dev semantic-release

# .releaserc 配置文件
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

### 5.5 Commitizen：规范提交的交互工具

```bash
# 全局安装
npm install -g commitizen

# 项目安装 cz-conventional-changelog
npm install --save-dev cz-conventional-changelog

# package.json 配置
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "scripts": {
    "commit": "cz"
  }
}
```

之后使用 `npm run commit` 或 `npx cz` 启动交互式提交界面，引导开发者填写规范的 commit message。

---

## 六、Git Hooks 与 Husky

### 6.1 Git Hooks 概述

Git Hooks 是在 Git 特定事件发生时自动触发的脚本，位于 `.git/hooks/` 目录。

| Hook | 触发时机 | 常用来做 |
|------|---------|---------|
| pre-commit | 执行 `git commit` 前 | 代码格式化、lint 检查 |
| commit-msg | commit 完成后 | 检查 commit message 格式 |
| pre-push | 执行 `git push` 前 | 运行测试、构建检查 |
| post-commit | commit 提交后 | 通知、生成文档 |
| post-merge | merge 完成后 | 自动安装依赖 |
| prepare-commit-msg | 默认 commit 信息生成后 | 自动添加 Jira 编号 |
| post-checkout | checkout 完成后 | 更新子模块、安装依赖 |

### 6.2 Husky 配置

Husky 让 Git Hooks 可以配置在 `package.json` 或项目中，并随项目共享。

```bash
# 安装
npm install --save-dev husky

# 初始化（生成 .husky 目录）
npx husky init
```

**pre-commit 示例**（格式化 + lint）：

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**lint-staged 配置**：

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["stylelint --fix", "prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

**commit-msg 示例**（校验 Conventional Commits）：

```bash
# .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

**commitlint 配置**：

```bash
# 安装
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'chore', 'build', 'ci'
    ]],
    'subject-case': [2, 'never', ['start-case', 'pascal-case']]
  }
};
```

**pre-push 示例**（运行测试）：

```bash
# .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test
npm run build
```

---

## 七、Code Review 流程

### 7.1 Review 的目标

不仅是找 Bug，还包括：
- 代码是否符合团队规范。
- 设计是否合理，是否引入技术债。
- 是否有测试覆盖。
- 是否影响性能或可访问性。
- 知识共享和团队成长。

### 7.2 Review 流程设计

```
开发者提交 PR
    ↓
CI 自动运行（lint/test/build）
    ↓
指定 Reviewer（1-2 人）
    ↓
Review 反馈 → 修改 → 再次 Review
    ↓
Approver 批准
    ↓
合并到主分支
```

### 7.3 Review 文化

| ❌ 反模式 | ✅ 最佳实践 |
|----------|-----------|
| 只挑风格问题 | 关注设计、测试、安全 |
| 人身攻击 | 对事不对人，给出改进建议 |
| 长时间不 Review | 规定 SLA，如 24 小时内响应 |
| 大 PR 一次性 review | 鼓励小步提交，控制 PR 规模 |

### 7.4 Review Checklist

- [ ] 代码是否满足需求？
- [ ] 是否有单元测试或 E2E 测试？
- [ ] 是否引入新的依赖？安全性如何？
- [ ] 是否有性能隐患？
- [ ] 是否有可访问性问题？
- [ ] Commit Message 是否规范？

---

## 八、分支保护与仓库治理

### 8.1 分支保护规则

**GitHub/GitLab 分支保护配置**：

| 规则 | 说明 | 推荐设置 |
|------|------|---------|
| Require pull request reviews | 必须通过 PR 合并 | 开启，至少 1 人审批 |
| Dismiss stale reviews | 新提交后自动清除旧 approve | 开启 |
| Require status checks | CI 必须通过 | 开启（test/lint/build） |
| Require branches up to date | 分支必须基于最新 main | 开启 |
| Include administrators | 管理员也受此约束 | 开启 |
| Allow force pushes | 允许强制推送 | 关闭 |
| Allow deletions | 允许删除分支 | 关闭 |

### 8.2 CODEOWNERS

CODEOWNERS 文件定义了代码库中各目录/文件的负责人，PR 会自动请求他们 Review。

```
# GitHub: .github/CODEOWNERS
# GitLab: .gitlab/CODEOWNERS

# 全局默认负责人：前端团队
*                          @team/frontend

# UI 组件库团队专属权限
/packages/ui/**           @team/design-system

# 核心工具库需要更严格的审查
/packages/utils/**        @team/core

# 文档团队成员负责
/docs/**                  @team/docs

# CI/CD 配置变更需要 DevOps 审核
/.github/workflows/**     @team/devops
/.gitlab-ci.yml           @team/devops

# 安全相关文件需要安全团队审批
**/SECURITY.md            @team/security
**/*.pem                  @team/security
```

**最佳实践**：
- 每个目录设置 1-2 个团队（或具体成员）。
- 关键目录（如 security）要求多人审批。
- 定期 review CODEOWNERS，随团队变动更新。

---

## 九、合并策略深度对比

### 9.1 三种合并方式

```bash
# 1. 普通合并（保留完整历史）
git merge feature/login
# 或保留功能分支的提交链
git merge --no-ff feature/login

# 2. Squash 合并（压缩为一个提交）
git merge --squash feature/login
git commit -m "feat(auth): 实现登录功能（squashed）"

# 3. Rebase 后再合并（线性历史）
git checkout feature/login
git rebase main
git checkout main
git merge feature/login   # 快进合并
```

### 9.2 对比表

| 维度 | --no-ff 合并 | Squash 合并 | Rebase 合并 |
|------|-------------|-------------|-------------|
| 历史完整度 | 保留所有提交和分支信息 | 压缩为单个提交，丢失中间细节 | 保留所有提交，但改写历史 |
| 历史可追溯性 | 最强，能看到完整分支脉络 | 较弱，只能看到最终结果 | 中等，线性但保留粒度 |
| 回滚能力 | 可整体回滚 PR，也可部分回滚 | 只能整体回滚 | 可精确回滚到某个提交 |
| 阅读复杂度 | 合并提交多，历史图复杂 | 最清晰，历史最简洁 | 线性清晰但提交较多 |
| 适用场景 | 功能分支合并到 develop/main | 小功能或修复合并到 main | 本地分支整理后合并 |

### 9.3 何时使用哪种？

- **--no-ff 合并**：大型功能分支、需要保留开发完整脉络的场景。推荐作为团队默认策略。
- **Squash 合并**：原子化的单次修改、修复。PR 内的中间提交（如 "fix typo"、"wip"）不适合保留在主分支。
- **Rebase 合并**：开发者本地整理历史，保持主分支线性。适合对历史清晰度要求高的项目。

### 9.4 混合策略

实践中，许多团队采用混合策略：

```
# 本地：在 feature 分支上 rebase main，保持与最新代码同步
git checkout feature/login
git rebase main

# 合并到 develop：使用 --no-ff 保留功能边界
git checkout develop
git merge --no-ff feature/login

# 从 release 合并到 main：使用 squash 压缩修复提交
git checkout main
git merge --squash release/1.0
```

---

## 十、大型仓库治理

### 10.1 性能优化

```bash
# 浅克隆，只拉取最近历史
git clone --depth 1 <repo>

# 拉取指定深度的历史
git clone --depth 50 <repo>   # 最近 50 次提交

# 部分克隆（Git 2.19+），只拉取需要的对象
git clone --filter=blob:none <repo>          # 不拉取文件内容
git clone --filter=tree:0 <repo>             # 不拉取目录树

# 稀疏检出，只拉取部分目录
git sparse-checkout init --cone
git sparse-checkout set packages/ui packages/utils

# 大文件管理
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.mp4"
```

**各方案速度对比**：

| 方案 | clone 时间 | 磁盘占用 | 适用场景 |
|------|-----------|---------|---------|
| 完整 clone | 基准 | 基准 | 核心贡献者 |
| 浅克隆 --depth 1 | -70% | -80% | CI 环境、新成员初次 clone |
| 部分克隆 | -50% | -60% | 仅需要代码分析的场景 |
| 稀疏检出 | -30% | -40% | Monorepo 中的特定包开发者 |

### 10.2 Git Worktree：多分支并行工作

`git worktree` 允许你在同一个仓库中同时检出多个分支到不同目录，无需频繁切换分支。

```bash
# 创建一个新 worktree，检出一个新分支
git worktree add ../project-feature feature/login

# 为 hotfix 创建 worktree
git worktree add ../project-hotfix hotfix/critical-bug

# 列出所有 worktree
git worktree list

# 删除 worktree
git worktree remove ../project-feature

# 清理残留的 worktree 引用
git worktree prune
```

**优势**：
- 无需 stash 当前工作，可同时处理多个任务。
- 可以同时运行多个分支的开发环境（如一个分支跑 dev server，另一个切过来 review）。
- 比 `git clone` 多个仓库更节省磁盘（共享对象存储）。

### 10.3 权限与保护

- 主分支保护：禁止直接推送，必须通过 PR。
- Required Reviews：至少 1-2 人批准。
- Status Checks：CI 通过才能合并。
- CODEOWNERS：指定目录的负责人。

```
# CODEOWNERS 示例
*                 @team/frontend
/packages/ui      @team/design-system
/docs             @team/docs
```

### 10.4 Monorepo 协作

- 使用 Changesets 管理多包版本。
- 通过 CI 的 affected 检测只构建变更的包。
- 明确包边界和代码所有权。

---

## 十一、常见误区与反模式

| 误区 | 说明 | 正确做法 |
|------|------|---------|
| "所有团队都应该用 Git Flow" | 不同团队适合不同策略 | 根据发布频率和团队规模选型 |
| "Code Review 太慢，影响效率" | 短期看慢，长期减少返工 | 控制 PR 大小，设定 Review SLA |
| "Commit Message 随便写" | 影响 CHANGELOG 和问题追踪 | 使用 Conventional Commits |
| "大文件直接提交 Git" | 仓库膨胀，clone 变慢 | 使用 Git LFS 或外部存储 |
| "直接在 main 分支开发" | 破坏主分支稳定性 | 使用分支保护和 PR 流程 |
| "rebase 是万能的" | 改写已经推送的公共分支历史 | 只 rebase 本地分支，公共分支用 merge |
| "测试不通过也可以合并" | 主分支质量下降 | 设置 required status checks |
| "一个 PR 可以包含多个需求" | Review 困难，回滚复杂 | 一个 PR 只解决一个问题 |

---

## 十二、最佳实践

1. **主干稳定**：main 分支应始终可发布。
2. **小步提交**：每个 PR 聚焦一个变更点。
3. **规范 Commit**：使用 Conventional Commits + commitlint 强制校验。
4. **强制 Review**：关键代码必须经过人工 Review，至少 1 人批准。
5. **自动化检查**：CI 中跑 lint、test、build 作为合并前置条件。
6. **版本可追溯**：每个发布都有 Tag 和 CHANGELOG。
7. **文档化流程**：团队 Git 工作流应写成文档并定期 review。
8. **使用 Husky**：通过 Git Hooks 自动化执行 pre-commit 和 pre-push 检查。
9. **配置分支保护**：通过平台功能强制实施安全策略。
10. **定期清理**：删除已经合并的分支，执行 `git gc` 优化仓库性能。
11. **培训新人**：确保所有团队成员理解并遵循 Git 工作流规范。
12. **度量流程**：统计 CI 通过率、Review 响应时间、发布周期等指标持续改进。

---

## 十三、相关领域

- [E01 Build Tools](./build-tools)：构建与发布流程
- [E02 Monorepo](./monorepo)：多包版本管理与变更集
- [E03 CI/CD](./ci-cd)：自动化流水线与分支保护
- [E04 Code Quality](./code-quality)：lint、测试与质量门禁
- [L02 Team Leadership](../leadership/team)：Code Review 文化与团队规范

---

## 十四、延伸阅读

- 🟢 [Pro Git 中文文档](https://git-scm.com/book/zh/v2)
- 🟢 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
- 🟢 [Trunk-Based Development](https://trunkbaseddevelopment.com/)
- 🟡 [GitHub Flow 文档](https://docs.github.com/en/get-started/quickstart/github-flow)
- 🟡 [GitLab Flow 文档](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
- 🟡 [Husky 官方文档](https://typicode.github.io/husky/)
- 🟡 [commitlint](https://commitlint.js.org/)
- 🔴 [Git Internals](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
- 🔴 [Git Worktree 文档](https://git-scm.com/docs/git-worktree)
- 🔴 [Git Rerere](https://git-scm.com/book/en/v2/Git-Tools-Rerere)

---

**标签**：`#git` `#version-control` `#code-review` `#branching-strategy` `#monorepo` `#trunk-based-dev` `#git-hooks` `#semver`

> **最后更新**：2026-07-06


---

## 本领域学习进度

<MarkComplete domainId="git-workflow" />
<ProgressTracker />
