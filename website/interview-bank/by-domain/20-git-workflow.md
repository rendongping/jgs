# Git 工作流与变更管理 面试题

> 本题库共收录 **75** 道面试题（基础 21 / 进阶 21 / 深入 17 / 架构 16）。
> 本文件收录 Git 工作流与变更管理相关面试题，目标题量 30 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、工程化题、安全题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-20-CO-B-001：请简述 Git 中工作区、暂存区和本地仓库的关系

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、工作区、暂存区、本地仓库、基本概念
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 Git 的“工作区（Working Directory）”、“暂存区（Staging Area/Index）”和“本地仓库（Local Repository）”分别是什么，以及一次完整的 `git add` → `git commit` 过程中文件状态如何变化。

**参考答案**：

Git 将代码管理划分为三个核心区域：

1. **工作区**：项目目录中实际看到的文件，是直接编辑的地方。
2. **暂存区（Index/Stage）**：位于 `.git/index`，用于临时存放准备提交的改动，可理解为“下一次 commit 的快照”。
3. **本地仓库**：位于 `.git/objects`，保存项目的完整历史、分支、标签等元数据。

一次完整提交流程：

```bash
# 编辑文件后，改动只存在于工作区
vim README.md

# 将改动添加到暂存区
git add README.md

# 将暂存区内容写入本地仓库，生成一次 commit
git commit -m "docs: update README"

# 将本地提交同步到远程仓库
git push origin main
```

状态变化：

| 阶段 | 文件状态 |
|------|---------|
| 未修改 | 工作区与 HEAD 一致 |
| 已修改（Modified） | 工作区与暂存区不一致 |
| 已暂存（Staged） | 暂存区与 HEAD 不一致 |
| 已提交（Committed） | 本地仓库生成新 commit |

**评分维度**：
- 能说明三个区域各自的含义（40%）
- 能按顺序描述 add / commit / push 的状态流转（35%）
- 能区分 modified / staged / committed 三种状态（25%）

**常见错误**：
- 认为 `git commit` 直接提交工作区的所有修改，忽略暂存区。
- 混淆 `.git` 目录与本地仓库的概念。
- 认为 `git add` 之后改动就永久保存了。

**延伸追问**：
- 如果只想提交部分修改，应该怎么做？
- `git commit -a` 和先 `git add` 再 `git commit` 有什么区别？

**相关题目**：
- [FB-20-CO-B-006 git reset 的三种模式](#FB-20-CO-B-006)
- [FB-20-CO-A-013 git rebase 交互式用法](#FB-20-CO-A-013)

**参考资源**：
- [Pro Git - 基础](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)
- [Git 官方文档 - git-add](https://git-scm.com/docs/git-add)

**口头回答版**：
> Git 有三个主要区域：工作区就是我们实际改代码的地方；暂存区是 `git add` 之后临时放改动的地方；本地仓库是 `git commit` 之后真正保存历史的地方。改完文件先 `git add` 到暂存区，再 `git commit` 写入本地仓库，最后 `git push` 推送到远程。

---

### FB-20-CO-B-002：Git 中 branch 是什么？如何创建和切换分支？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、branch、分支、HEAD、指针
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 Git 分支的本质，并写出创建、切换、合并、删除分支的常用命令。

**参考答案**：

Git 分支本质上是一个指向某个 commit 的可移动指针。创建分支时，Git 只是新建了一个引用（ref），并不会复制整个项目历史，因此开销极小。`HEAD` 是一个特殊指针，指向当前所在的分支或 commit。

常用命令：

```bash
# 创建新分支
git branch feature/login

# 切换分支
git checkout feature/login
# 或更现代的命令
git switch feature/login

# 创建并切换
git checkout -b feature/login
# 或
git switch -c feature/login

# 合并分支到当前分支
git merge feature/login

# 删除已合并分支
git branch -d feature/login

# 强制删除未合并分支
git branch -D feature/login
```

最佳实践：
- 分支命名要有语义，如 `feature/login`、`fix/header-overflow`。
- 功能完成后及时合并并删除临时分支，避免分支爆炸。
- 合并前先拉取主分支最新代码，减少冲突。

**评分维度**：
- 能说明分支是指向 commit 的轻量指针（40%）
- 能正确写出创建、切换、合并、删除命令（40%）
- 能提到分支命名规范和及时清理（20%）

**常见错误**：
- 认为创建分支会复制大量文件或历史。
- 删除分支时忘记确认是否已合并。
- 直接在 `main` 分支上开发新功能。

**延伸追问**：
- `git checkout` 和 `git switch` 有什么区别？
-  detached HEAD 是什么状态？

**相关题目**：
- [FB-20-CO-B-003 merge 与 rebase 的区别](#FB-20-CO-B-003)
- [FB-20-CO-A-009 Git Flow 等分支策略对比](#FB-20-CO-A-009)

**参考资源**：
- [Pro Git - 分支简介](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%AE%80%E4%BB%8B)
- [Git 官方文档 - git-branch](https://git-scm.com/docs/git-branch)

**口头回答版**：
> Git 分支其实就是指向某个 commit 的指针，创建分支非常快，因为不需要复制代码。常用命令：`git branch` 创建，`git checkout` 或 `git switch` 切换，`git merge` 合并，`git branch -d` 删除。分支名最好有意义，比如 feature/xxx、fix/xxx。

---

### FB-20-CO-B-003：merge 和 rebase 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、merge、rebase、分支、历史
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 `git merge` 和 `git rebase` 的工作原理、结果差异以及各自的适用场景。

**参考答案**：

`git merge` 和 `git rebase` 都是将不同分支的改动整合到一起的方式，但生成历史的方式不同。

**merge（合并）**：
- 保留两条分支的历史，生成一个新的 merge commit。
- 不修改原有 commit。
- 历史图呈分叉再汇合的网状结构。

```bash
git checkout main
git merge feature/login
```

**rebase（变基）**：
- 将当前分支的 commit 逐个“摘下来”，在目标分支最新 commit 上重新应用。
- 生成线性的历史，但会改变当前分支的 commit hash。
- 历史图呈直线。

```bash
git checkout feature/login
git rebase main
```

对比：

| 维度 | merge | rebase |
|------|-------|--------|
| 历史形状 | 网状，保留完整上下文 | 线性，更清晰 |
| commit hash | 原 commit 不变 | 当前分支 commit 改变 |
| 是否产生 merge commit | 会 | 默认不会 |
| 冲突处理 | 一次解决 | 可能需要逐 commit 解决 |
| 适用场景 | 公共分支、需要保留协作历史 | 本地分支清理、提交前整理 |

最佳实践：
- 已经 push 到远程并被他人基于其工作的分支，**不要 rebase**。
- 本地个人功能分支在合并前可用 rebase 保持历史整洁。
- 团队应统一约定主分支使用 merge 还是 rebase。

**评分维度**：
- 能说明 merge 保留分叉历史、rebase 生成线性历史（40%）
- 能指出 rebase 会改变 commit hash（30%）
- 能给出适用场景和团队约定（30%）

**常见错误**：
- 认为 rebase 比 merge 更安全，忽略其重写历史的风险。
- 在公共分支上执行 rebase，导致他人代码混乱。
- 混淆 fast-forward merge 与普通 merge。

**延伸追问**：
- fast-forward merge 是什么？如何禁用？
- rebase 时出现冲突，应该如何处理？

**相关题目**：
- [FB-20-CO-B-002 分支的创建与切换](#FB-20-CO-B-002)
- [FB-20-CP-P-024 rebase 与 merge 的团队协作策略](#FB-20-CP-P-024)

**参考资源**：
- [Pro Git - 变基](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)
- [Git 官方文档 - git-rebase](https://git-scm.com/docs/git-rebase)

**口头回答版**：
> merge 是把两个分支的历史合并，会产生一个 merge commit，历史是网状的；rebase 是把当前分支的提交重新放到目标分支最新提交后面，历史变成直线，但会改变当前分支提交的 hash。本地分支整理历史可以用 rebase，已经 push 出去并且别人在用的分支千万别 rebase。

---

### FB-20-CO-B-004：git stash 是什么？有哪些常见用法？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、stash、暂存、切换分支、工作区
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `git stash` 的作用，并列举常见子命令及使用场景。

**参考答案**：

`git stash` 用于临时保存工作区和暂存区中未提交的改动，使工作区恢复到干净状态，便于切换分支或拉取代码，之后可以随时恢复。

常见命令：

```bash
# 临时保存当前改动（包括已暂存和未暂存）
git stash push -m "wip: login form"

# 简写形式
git stash

# 只保存未跟踪的新文件
git stash -u

# 保存包括忽略文件
git stash -a

# 查看 stash 列表
git stash list

# 恢复最近一次 stash 并从列表删除
git stash pop

# 恢复但不删除
git stash apply

# 删除最近一次 stash
git stash drop

# 清空所有 stash
git stash clear
```

stash 栈结构：
- 多次 stash 会形成一个栈，最新 stash 为 `stash@{0}`。
- 恢复时默认操作 `stash@{0}`。

使用场景：
- 临时切换分支处理紧急 bug，又不想提交半成品。
- 拉取远程更新前临时存放本地改动。
- 代码审查前快速清理工作区。

**评分维度**：
- 能说明 stash 临时保存未提交改动的作用（40%）
- 能列举 push / pop / apply / list / drop 等命令（40%）
- 能给出典型使用场景（20%）

**常见错误**：
- 用 stash 长期存放改动，导致遗忘。
- 忘记 `pop` 会删除 stash，`apply` 不会删除。
- 需要保存新增文件时忘记加 `-u`。

**延伸追问**：
- stash 和 commit 有什么区别？
- 如何只恢复 stash 中的部分文件？

**相关题目**：
- [FB-20-CO-B-001 工作区、暂存区、本地仓库](#FB-20-CO-B-001)
- [FB-20-CO-A-013 git rebase 交互式用法](#FB-20-CO-A-013)

**参考资源**：
- [Pro Git - 储藏与清理](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%82%A8%E8%97%8F%E4%B8%8E%E6%B8%85%E7%90%86)
- [Git 官方文档 - git-stash](https://git-scm.com/docs/git-stash)

**口头回答版**：
> git stash 就是把当前没提交的改动临时存起来，让工作区变干净。常用命令：`git stash` 存起来，`git stash list` 看列表，`git stash pop` 恢复并删除，`git stash apply` 恢复不删除。适合临时切换分支或者拉代码前暂存一下半成品的改动。

---

### FB-20-CO-B-005：git cherry-pick 是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、cherry-pick、commit、移植
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `git cherry-pick` 的作用，并给出一个命令示例及注意事项。

**参考答案**：

`git cherry-pick` 用于将指定的一个或多个 commit 从一个分支“移植”到当前分支，而不需要合并整个分支。

基本用法：

```bash
# 将某个 commit 移植到当前分支
git cherry-pick abc1234

# 移植一段连续的 commit
git cherry-pick abc1234..def5678

# 只移植改动内容，不保留原 commit 信息
git cherry-pick -n abc1234
```

注意事项：
- cherry-pick 会生成新的 commit hash，即使内容相同。
- 如果目标分支已包含相同改动，可能产生空提交或冲突。
- 常用于 hotfix 同步到多个发布分支。
- 多次 cherry-pick 同一批改动容易导致后续 merge 冲突，可考虑 `git rebase --onto`。

典型场景：
- `main` 上修复了一个 bug，需要把该修复同步到 `release/1.x` 分支。

**评分维度**：
- 能说明 cherry-pick 是将指定 commit 移植到当前分支（50%）
- 能写出基本命令示例（30%）
- 能提到新 hash 和冲突风险（20%）

**常见错误**：
- 用 cherry-pick 代替正常的分支合并。
- 忽略 cherry-pick 后需要解决冲突。
- 认为 cherry-pick 会保留原 commit 的 hash。

**延伸追问**：
- cherry-pick 和 rebase 有什么异同？
- 如果 cherry-pick 后需要撤销，应该怎么做？

**相关题目**：
- [FB-20-CO-B-003 merge 与 rebase 的区别](#FB-20-CO-B-003)
- [FB-20-CO-A-015 git bisect 二分查找回归](#FB-20-CO-A-015)

**参考资源**：
- [Pro Git - 重写历史](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)
- [Git 官方文档 - git-cherry-pick](https://git-scm.com/docs/git-cherry-pick)

**口头回答版**：
> git cherry-pick 就是把某个分支上的一个或几个 commit 单独拿到当前分支来。比如 main 上修了个 bug，想同步到 release 分支，就可以 cherry-pick 那个 commit。注意 cherry-pick 会生成新的 commit hash，也可能有冲突。

---

### FB-20-CO-B-006：git reset 的 --soft、--mixed、--hard 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、reset、soft、mixed、hard、HEAD
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `git reset` 三种常用模式 `--soft`、`--mixed`、`--hard` 的区别，并给出各自的使用场景。

**参考答案**：

`git reset` 用于移动当前分支的 HEAD 指针，并根据模式决定是否保留工作区和暂存区的改动。三种模式对比：

| 模式 | HEAD | 暂存区 | 工作区 | 说明 |
|------|------|--------|--------|------|
| `--soft` | 回退 | 保留改动 | 保留改动 | 只撤销 commit，改动仍在暂存区 |
| `--mixed`（默认） | 回退 | 清空暂存区 | 保留改动 | 撤销 commit 和暂存，改动保留在工作区 |
| `--hard` | 回退 | 清空 | 清空 | 彻底丢弃改动，不可恢复（需谨慎） |

命令示例：

```bash
# 撤销最近一次 commit，但改动仍保留在暂存区
git reset --soft HEAD~1

# 撤销最近一次 commit，改动退回到工作区
git reset --mixed HEAD~1

# 彻底回退到指定 commit，丢弃之后所有改动
git reset --hard abc1234
```

使用场景：
- `--soft`：刚 commit 完发现漏写信息，想重新 commit。
- `--mixed`：commit 后发现有些东西不该提交，想重新选择哪些进入暂存区。
- `--hard`：确认要丢弃某段改动，例如回滚到稳定版本。

**评分维度**：
- 能正确区分三种模式对 HEAD、暂存区、工作区的影响（50%）
- 能给出各自的使用场景（30%）
- 能强调 `--hard` 的风险（20%）

**常见错误**：
- 误用 `--hard` 导致代码丢失。
- 认为 `git reset` 只能回退，也能用于前进（指定更新的 commit）。
- 忘记 `--mixed` 是默认模式。

**延伸追问**：
- `--hard` 之后还能恢复吗？
- `git reset` 和 `git revert` 有什么区别？

**相关题目**：
- [FB-20-CO-B-007 git revert 与 git reset 区别](#FB-20-CO-B-007)
- [FB-20-CO-P-023 git reflog 恢复误操作](#FB-20-CO-P-023)

**参考资源**：
- [Pro Git - 撤销操作](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)
- [Git 官方文档 - git-reset](https://git-scm.com/docs/git-reset)

**口头回答版**：
> git reset 三种模式：`--soft` 只回退 HEAD，改动还在暂存区；`--mixed` 是默认，把改动从暂存区退到工作区；`--hard` 最危险，工作区和暂存区都清空，彻底回到那个 commit。一般 `--hard` 要慎用，用之前确保不需要那些改动。

---

### FB-20-CO-B-007：git revert 和 git reset 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、revert、reset、撤销、历史
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请对比 `git revert` 和 `git reset` 的用途、实现方式及适用场景。

**参考答案**：

| 维度 | git revert | git reset |
|------|-----------|-----------|
| 实现方式 | 生成一个新的 commit，反向应用指定 commit 的改动 | 移动 HEAD 指针，可能丢弃或保留后续 commit |
| 历史影响 | 不修改历史，安全性高 | 修改历史，公共分支使用有风险 |
| commit hash | 原 commit 保留 | 可能改变或丢弃后续 commit |
| 适用场景 | 公共分支回滚、已 push 的提交 | 本地分支整理、未 push 的提交 |

示例：

```bash
# 生成一个反向 commit，撤销 abc1234 的改动
git revert abc1234

# 撤销最近三次 commit，生成三个 revert commit
git revert HEAD~3..HEAD

# 本地撤销最近一次 commit，改动回到工作区
git reset --mixed HEAD~1
```

最佳实践：
- 已经 push 到远程的提交，优先使用 `git revert`，避免改写公共历史。
- 仅本地未 push 的提交，可用 `git reset` 整理。
- 主分支、发布分支的回滚应通过 revert 完成，便于审计。

**评分维度**：
- 能说明 revert 是新增反向 commit、reset 是移动 HEAD（40%）
- 能指出 revert 不修改历史、reset 修改历史（30%）
- 能给出公共分支用 revert、本地用 reset 的建议（30%）

**常见错误**：
- 在已 push 的分支上用 `git reset --hard` 再强制推送。
- 认为 revert 会删除原有 commit。
- revert 冲突时不了解如何解决。

**延伸追问**：
- revert 一个 merge commit 需要注意什么？
- 如何撤销一次 revert？

**相关题目**：
- [FB-20-CO-B-006 git reset 的三种模式](#FB-20-CO-B-006)
- [FB-20-CO-P-023 git reflog 恢复误操作](#FB-20-CO-P-023)

**参考资源**：
- [Pro Git - 撤销操作](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)
- [Git 官方文档 - git-revert](https://git-scm.com/docs/git-revert)

**口头回答版**：
> git revert 是生成一个新的 commit，把原来某个 commit 的改动反向抵消掉，不修改历史，适合已经 push 的公共分支；git reset 是移动 HEAD 指针，可能会丢弃后面的提交，适合本地还没 push 的整理。主分支回滚一般用 revert。

---

### FB-20-CO-B-008：.gitignore 的工作原理和规则有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、gitignore、忽略文件、匹配规则
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `.gitignore` 文件的作用、匹配规则，并解释为什么有时候已经添加到 `.gitignore` 的文件仍会被 Git 追踪。

**参考答案**：

`.gitignore` 用于告诉 Git 哪些文件或目录不应被追踪。它本身会被 Git 追踪并提交到仓库。

常用规则：

```gitignore
# 注释
node_modules/

# 忽略所有 .log 文件
*.log

# 但不忽略 important.log
!important.log

# 忽略 build 目录下所有内容
build/

# 只忽略根目录下的 config.json
/config.json

# 忽略所有 temp 开头的文件和目录
temp*
```

匹配规则要点：
- 空行和以 `#` 开头的行被忽略。
- `*` 匹配任意字符（除 `/`），`**` 匹配任意层目录。
- 以 `/` 开头表示从仓库根目录开始匹配。
- 以 `/` 结尾表示只匹配目录。
- `!` 表示取反，重新包含被忽略的内容。

为什么已加入 `.gitignore` 的文件仍被追踪：
- `.gitignore` 只对未追踪的文件生效。
- 如果文件已经 `git add` 并 commit 过，Git 会继续追踪它。
- 解决：先从索引中移除但不删除本地文件，再提交 `.gitignore`。

```bash
# 停止追踪已提交的文件，但保留本地文件
git rm --cached config.local.js
git commit -m "chore: stop tracking config.local.js"
```

**评分维度**：
- 能说明 .gitignore 控制不追踪文件（30%）
- 能列举 *、/、! 等常用规则（40%）
- 能解释已追踪文件不受 .gitignore 影响的原因及处理（30%）

**常见错误**：
- 认为 `.gitignore` 会删除本地文件。
- 用 `.gitignore` 忽略已经提交到仓库的文件而不移除索引。
- 规则顺序写错，导致 `!` 取反不生效。

**延伸追问**：
- 全局 `.gitignore` 和仓库级 `.gitignore` 有什么区别？
- 如何忽略已经追踪的文件变更？

**相关题目**：
- [FB-20-CO-B-001 工作区、暂存区、本地仓库](#FB-20-CO-B-001)
- [FB-20-SE-P-021 Git 安全签名与 secrets scanning](#FB-20-SE-P-021)

**参考资源**：
- [Git 官方文档 - gitignore](https://git-scm.com/docs/gitignore)
- [GitHub - gitignore 模板](https://github.com/github/gitignore)

**口头回答版**：
> .gitignore 用来告诉 Git 哪些文件不要追踪，比如 node_modules、日志文件、构建产物。常用规则有 `*` 通配、`/` 开头从根目录匹配、`!` 取反。已经 add 并 commit 过的文件，即使加进 .gitignore 还会继续追踪，需要先用 `git rm --cached` 移除索引。

---

## 进阶题（8 道）{#advanced}

### FB-20-CO-A-009：Git Flow、GitHub Flow 和 Trunk-Based Development 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、Git Flow、GitHub Flow、Trunk-Based、分支策略
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比三种主流分支策略 Git Flow、GitHub Flow、Trunk-Based Development 的核心流程、优缺点及适用场景。

**参考答案**：

| 维度 | Git Flow | GitHub Flow | Trunk-Based Development |
|------|---------|-------------|------------------------|
| 分支数量 | 多：main、develop、feature、release、hotfix | 少：main + feature | 极少：main + 短期 feature |
| 发布节奏 | 按 release 分支管理版本 | 持续部署，合并即发布 | 持续集成，频繁提交到主干 |
| 复杂度 | 高，适合版本化发布 | 低，适合快速迭代 | 最低，需要强自动化测试 |
| 适用团队 | 传统软件、多版本并行 | 互联网产品、Web 应用 | 大型工程、DevOps 成熟团队 |

**Git Flow**：
- `main`：稳定发布分支。
- `develop`：日常开发分支。
- `feature/*`：功能分支从 develop 切出，完成后合并回 develop。
- `release/*`：发布前从 develop 切出，修复 bug 后合并到 main 和 develop。
- `hotfix/*`：从 main 切出，修复后合并到 main 和 develop。

**GitHub Flow**：
- 只有 `main` 和 `feature/*`。
- 功能分支开发完成后发 Pull Request，审查通过合并到 main。
- 适合持续部署环境。

**Trunk-Based Development**：
- 所有开发者直接基于 `main`（trunk）工作。
- 功能通过短期分支（几小时到一天）或 feature flags 开发。
- 强调高频集成、自动化测试、CI/CD。

选型建议：
- 发布周期长、需要多版本维护：Git Flow。
- 中小型团队、持续部署：GitHub Flow。
- 大型团队、自动化能力强：Trunk-Based。

**评分维度**：
- 能说明三种策略的分支结构差异（40%）
- 能分析各自的优缺点（30%）
- 能结合团队规模和发布节奏给出选型建议（30%）

**常见错误**：
- 盲目推崇 Git Flow，忽略其带来的分支维护成本。
- 在自动化测试不足时强行 Trunk-Based，导致主干不稳定。
- 混淆 GitHub Flow 与 Git Flow。

**延伸追问**：
- 你们团队目前用哪种分支策略？遇到过什么问题？
- Trunk-Based 中如何管理未完成的特性？

**相关题目**：
- [FB-20-SD-R-025 设计千人团队的 Git 分支策略](#FB-20-SD-R-025)
- [FB-20-CP-P-024 rebase 与 merge 的团队协作策略](#FB-20-CP-P-024)

**参考资源**：
- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow 官方文档](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Trunk-Based Development](https://trunkbaseddevelopment.com/)

**口头回答版**：
> Git Flow 分支很多，有 main、develop、feature、release、hotfix，适合版本化发布；GitHub Flow 更简单，只有 main 加 feature 分支，发 PR 合并后持续部署；Trunk-Based 是大家都在主干上干活，用短分支或特性开关，适合自动化测试很强的大型团队。选型看发布节奏和团队规模。

---

### FB-20-EN-A-010：什么是 Conventional Commits？它能带来哪些自动化收益？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、Conventional Commits、提交规范、自动化、版本号
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Conventional Commits 规范，并说明它在自动化版本管理、生成 CHANGELOG 和 CI 流程中的作用。

**参考答案**：

Conventional Commits 是一种提交信息规范，格式为：

```text
<type>(<scope>): <subject>

<body>

<footer>
```

常见 type：

| Type | 含义 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响逻辑） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具/依赖等杂项 |
| `ci` | CI/CD 配置变更 |
| `build` | 构建系统变更 |

示例：

```text
feat(auth): add OAuth2 login support

fix(api): resolve null pointer in user query

BREAKING CHANGE: drop support for Node.js 14
```

自动化收益：
1. **自动生成版本号**：`standard-version` / `semantic-release` 根据 type 自动 bump 版本。
2. **自动生成 CHANGELOG**：按 type 归类生成变更日志。
3. **CI 自动化**：根据 commit type 决定构建、测试、发布策略。
4. **代码审查**：统一提交信息，便于快速理解改动意图。

示例自动化流程：

```bash
# 安装工具
npm install -D @commitlint/config-conventional @commitlint/cli

# commitlint.config.js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

**评分维度**：
- 能说出 Conventional Commits 的基本格式和主要 type（40%）
- 能说明自动生成版本号和 CHANGELOG 的收益（30%）
- 能提到 commitlint 等工具落地（30%）

**常见错误**：
- type 使用混乱，比如把重构写成 feat。
- 提交信息只写“修复 bug”，没有说明影响范围。
- 认为 Conventional Commits 只是“格式好看”，忽略自动化价值。

**延伸追问**：
- 如何处理破坏性变更（BREAKING CHANGE）？
- 如果团队不习惯写规范提交，如何推动落地？

**相关题目**：
- [FB-20-EN-A-011 Git Hooks 与 Husky](#FB-20-EN-A-011)
- [FB-20-EN-P-017 Monorepo 变更管理 Changesets](#FB-20-EN-P-017)

**参考资源**：
- [Conventional Commits 官网](https://www.conventionalcommits.org/)
- [commitlint 文档](https://commitlint.js.org/)

**口头回答版**：
> Conventional Commits 是一种提交信息规范，格式是 type(scope): subject，比如 feat(auth): add login。type 有 feat、fix、docs、refactor 这些。它的好处是可以自动生成版本号、自动生成 CHANGELOG、在 CI 里做不同处理。配合 commitlint 和 Husky 可以在提交时自动校验格式。

---

### FB-20-EN-A-011：Git Hooks 是什么？常见钩子有哪些？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、Git Hooks、Husky、pre-commit、commit-msg
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Git Hooks 的作用、常见钩子及使用场景，并说明 Husky 等工具解决了什么问题。

**参考答案**：

Git Hooks 是 Git 在特定事件发生时自动执行的脚本，位于 `.git/hooks/` 目录下。通过钩子可以在提交、推送等关键节点执行自定义检查或操作。

常见客户端钩子：

| 钩子 | 触发时机 | 用途 |
|------|---------|------|
| `pre-commit` | 执行 `git commit` 前 | 运行 lint、格式化、单元测试 |
| `prepare-commit-msg` | 打开编辑器前 | 自动生成或修改提交信息模板 |
| `commit-msg` | 提交信息编辑完成后 | 校验提交信息格式 |
| `post-commit` | commit 完成后 | 发送通知、统计 |
| `pre-push` | 执行 `git push` 前 | 运行集成测试、检查分支名 |
| `pre-rebase` | rebase 前 | 阻止对公共分支 rebase |

服务端钩子（如 `pre-receive`、`update`、`post-receive`）：
- 在远程仓库接收推送时触发，可用于强制代码审查、限制推送分支等。

Husky 的作用：
- Git 默认钩子不随仓库提交，团队成员需要手动配置。
- Husky 将钩子脚本纳入项目版本控制，通过 `package.json` 或 `.husky/` 目录统一管理，保证团队一致性。

示例（Husky v9）：

```bash
# 初始化 Husky
npx husky init

# 添加 pre-commit 钩子
echo "npx lint-staged" > .husky/pre-commit

# 添加 commit-msg 钩子
echo 'npx --no -- commitlint --edit ${1}' > .husky/commit-msg
```

**评分维度**：
- 能说明 Git Hooks 是在特定事件触发的脚本（30%）
- 能列举 pre-commit、commit-msg、pre-push 等常见钩子及用途（40%）
- 能说明 Husky 解决钩子无法版本控制的问题（30%）

**常见错误**：
- 在 pre-commit 中运行过重的全量测试，导致提交体验差。
- 忽略服务端钩子，只依赖客户端校验（客户端钩子可被绕过）。
- 认为安装了 Husky 后就不需要 CI 校验。

**延伸追问**：
- 客户端钩子能被绕过，如何保证规范落地？
- lint-staged 和 pre-commit 有什么区别？

**相关题目**：
- [FB-20-EN-A-010 Conventional Commits 规范](#FB-20-EN-A-010)
- [FB-20-EN-R-027 Git 工作流与自动化质量门禁](#FB-20-EN-R-027)

**参考资源**：
- [Pro Git - Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
- [Husky 官方文档](https://typicode.github.io/husky/)

**口头回答版**：
> Git Hooks 是 Git 在特定操作时自动执行的脚本，比如 pre-commit 在提交前跑 lint，commit-msg 校验提交信息格式，pre-push 在推送前跑测试。Husky 的作用是让这些钩子可以随项目一起管理，不用每个人手动去 .git/hooks 下面配。服务端钩子还能在远程仓库做强制检查。

---

### FB-20-SC-A-012：遇到 Git 冲突时，你的解决流程是什么？如何预防冲突？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、冲突、merge、rebase、团队协作
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述一次 Git 冲突的完整解决流程，并说明在团队协作中如何减少冲突发生。

**参考答案**：

冲突产生的原因：两个分支对同一文件的同一区域做了不同修改，Git 无法自动合并。

解决流程：

```bash
# 1. 执行合并或 rebase 时提示冲突
git merge feature/login
# Auto-merging src/api.js
# CONFLICT (content): Merge conflict in src/api.js

# 2. 查看冲突文件列表
git status

# 3. 打开文件，定位冲突标记 <<<<<<< / ======= / >>>>>>>
# 手动保留正确代码

# 4. 标记冲突已解决
git add src/api.js

# 5. 完成合并
git commit  # merge 场景
# 或
git rebase --continue  # rebase 场景
```

冲突标记示例：

```javascript
<<<<<<< HEAD
const API_URL = 'https://api.old.com';
=======
const API_URL = 'https://api.new.com';
>>>>>>> feature/login
```

预防冲突的方法：
1. **小步快跑**：功能拆小，缩短分支生命周期。
2. **频繁同步**：每天至少一次 `git pull --rebase` 或 `git rebase main`。
3. **明确职责**：按模块划分任务，减少多人同时修改同一文件。
4. **代码格式化统一**：使用 Prettier、EditorConfig 减少因格式差异导致的冲突。
5. **提前沟通**：大规模重构前先同步方案。

**评分维度**：
- 能按步骤描述冲突解决流程（40%）
- 能正确解释冲突标记含义（25%）
- 能提出至少 3 条预防冲突的实践经验（35%）

**常见错误**：
- 冲突解决时只保留自己的代码，忽略他人改动。
- 冲突标记未完全清理就提交。
- 长期不拉取主分支更新，导致冲突集中爆发。

**延伸追问**：
- 二进制文件冲突怎么解决？
- 如果冲突解决后发现有问题，如何撤销合并？

**相关题目**：
- [FB-20-CO-B-003 merge 与 rebase 的区别](#FB-20-CO-B-003)
- [FB-20-CP-P-024 rebase 与 merge 的团队协作策略](#FB-20-CP-P-024)

**参考资源**：
- [Pro Git - 分支的新建与合并](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)
- [Git 官方文档 - 冲突解决](https://git-scm.com/docs/git-merge#_how_to_resolve_conflicts)

**口头回答版**：
> 遇到冲突先 `git status` 看哪些文件冲突，打开文件找到 `<<<<<<<` 这些标记，手动选择保留哪部分代码，然后 `git add` 标记解决，最后 `git commit` 或 `git rebase --continue`。预防冲突就要小步提交、每天同步主分支、按模块分工、统一代码格式，重构前和大家对齐。

---

### FB-20-CO-A-013：git rebase -i（交互式变基）有哪些常见用法？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、rebase、interactive、历史整理、commit
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 `git rebase -i` 的用途，并列举常见的子命令如 pick、reword、squash、fixup、drop 等的作用。

**参考答案**：

`git rebase -i`（interactive rebase）用于交互式地修改当前分支的 commit 历史，是整理本地提交的有力工具。

启动方式：

```bash
# 对最近 3 个 commit 进行交互式整理
git rebase -i HEAD~3

# 基于 main 分支整理当前分支
git rebase -i main
```

常见子命令：

| 命令 | 作用 |
|------|------|
| `pick`（p） | 保留该 commit，可调整顺序 |
| `reword`（r） | 保留 commit，但修改提交信息 |
| `squash`（s） | 将该 commit 合并到上一个 commit，保留提交信息 |
| `fixup`（f） | 将该 commit 合并到上一个 commit，丢弃该 commit 信息 |
| `drop`（d） | 删除该 commit |
| `edit`（e） | 保留 commit，但在应用后暂停，允许修改 |

典型使用场景：
1. **合并多个小 commit**：将 `fix typo`、`update test`、`refactor` 合并为 `feat: add login`。
2. **修改历史提交信息**：将不清晰的提交信息改得更规范。
3. **删除误提交**：移除包含敏感信息或调试代码的 commit。
4. **调整 commit 顺序**：让依赖关系更清晰。

示例：把最近 4 个 commit 合并为 1 个

```bash
git rebase -i HEAD~4
# 将后三个 pick 改为 squash 或 fixup
# 保存后编辑合并后的提交信息
```

**评分维度**：
- 能说明 interactive rebase 用于整理本地历史（30%）
- 能解释 pick / squash / fixup / reword / drop 等命令（40%）
- 能给出合并 commit 或修改提交信息的实际例子（30%）

**常见错误**：
- 在已 push 的分支上使用 interactive rebase。
- 随意 drop 包含他人依赖的 commit。
- 合并 commit 后导致代码审查历史丢失。

**延伸追问**：
- 如何只修改更早某个 commit 的内容？
- rebase 时每个 commit 都冲突，如何高效处理？

**相关题目**：
- [FB-20-CO-B-003 merge 与 rebase 的区别](#FB-20-CO-B-003)
- [FB-20-EN-A-010 Conventional Commits 规范](#FB-20-EN-A-010)

**参考资源**：
- [Pro Git - 重写历史](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)
- [Git 官方文档 - git-rebase](https://git-scm.com/docs/git-rebase)

**口头回答版**：
> `git rebase -i` 是交互式变基，用来整理本地 commit 历史。常用命令有 pick 保留、reword 改提交信息、squash 合并并保留信息、fixup 合并丢弃信息、drop 删除。适合在 push 前把多个小提交合并成一个规范的提交。已经 push 的分支不要这么做，会改写历史。

---

### FB-20-EN-A-014：Pull Request / Merge Request 的代码审查流程如何设计？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、PR、MR、代码审查、Code Review
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一套基于 Pull Request（或 Merge Request）的代码审查流程，包括分支保护、审查者选择、合并策略和冲突处理。

**参考答案**：

一套完整的 PR/MR 审查流程应包含以下环节：

1. **分支创建与开发**
   - 从主分支（如 `main`）切出功能分支 `feature/xxx`。
   - 本地开发完成后推送到远程。

2. **提交 PR/MR**
   - 填写清晰的标题和描述，说明改动背景、影响范围、测试情况。
   - 关联 Issue 或需求文档。

3. **自动化检查**
   - CI 流水线自动运行 lint、单元测试、构建、安全扫描。
   - 检查不通过则无法合并。

4. **人工审查**
   - 至少一名相关模块的维护者审查。
   - 审查维度：正确性、可读性、性能、安全性、测试覆盖。
   - 使用 suggest change、comment、approve、request changes 等状态。

5. **修改与确认**
   - 作者根据反馈修改，审查者再次确认。
   - 建议使用 `git commit --fixup` + `git rebase -i --autosquash` 整理 fixup commit。

6. **合并策略**
   - 推荐 Squash Merge：将功能分支的多个 commit 合并为一个清晰的 commit。
   - 或 Rebase Merge：保持线性历史。
   - 不推荐普通 Merge 产生大量无意义 merge commit。

7. **合并后清理**
   - 删除远程功能分支。
   - 触发部署流水线。

**评分维度**：
- 能描述从分支创建到合并的完整流程（35%）
- 能说明自动化检查与人工审查的结合（30%）
- 能给出合并策略和分支保护建议（35%）

**常见错误**：
- PR 描述为空或只写“修复 bug”。
- 审查只关注代码风格，忽略业务正确性。
- 强制合并未通过 CI 的分支。

**延伸追问**：
- 如何平衡审查速度与代码质量？
- 大型 PR 难以审查，如何拆分？

**相关题目**：
- [FB-20-EN-A-011 Git Hooks 与 Husky](#FB-20-EN-A-011)
- [FB-20-SS-R-029 代码审查文化构建](#FB-20-SS-R-029)

**参考资源**：
- [GitHub - About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitLab - Merge requests](https://docs.gitlab.com/ee/user/project/merge_requests/)

**口头回答版**：
> PR 流程一般是从 main 切 feature 分支，开发完推上去提 PR，CI 自动跑 lint 和测试，然后找相关模块的同学 review。审查通过后用 squash merge 或 rebase merge 合并，合并后删掉远程分支。分支要设置保护，比如必须通过 CI、至少一个 approve 才能合并。PR 描述要写清楚背景和测试情况。

---

### FB-20-CO-A-015：git bisect 如何定位引入 bug 的提交？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、bisect、二分查找、调试、回归
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `git bisect` 的工作原理和使用步骤，以及它在什么场景下最有效。

**参考答案**：

`git bisect` 利用二分查找算法，在已知的“好 commit”和“坏 commit”之间快速定位引入问题的 commit。

使用步骤：

```bash
# 1. 开始二分查找
git bisect start

# 2. 标记当前代码有问题
git bisect bad

# 3. 标记某个历史提交是正常的
git bisect good v1.0.0

# 4. Git 自动检出中间 commit，测试后标记好坏
git bisect good   # 当前版本正常
git bisect bad    # 当前版本有问题

# 5. 重复直到定位到第一个 bad commit

# 6. 结束二分查找
git bisect reset
```

自动模式（使用脚本）：

```bash
git bisect start HEAD v1.0.0
git bisect run npm test
# 脚本退出码 0 表示 good，1-127（除 125）表示 bad
```

适用场景：
- 不知道具体哪个 commit 引入了 bug，但知道某个历史版本正常。
- 历史提交较多，手动排查效率低。
- 问题可自动化测试判断好坏。

**评分维度**：
- 能说明 git bisect 使用二分查找定位问题提交（40%）
- 能按顺序写出 start / bad / good / reset 流程（35%）
- 能提到自动模式 `git bisect run`（25%）

**常见错误**：
- 没有准备好明确的“好”和“坏”边界就开始 bisect。
- 在测试不稳定的 commit 上标记，导致结果错误。
- bisect 结束后忘记 `git bisect reset`。

**延伸追问**：
- 如果某个中间 commit 无法测试，应该怎么做？
- bisect 和 blame 在定位问题上有何不同？

**相关题目**：
- [FB-20-CO-A-016 git blame 与变更追踪](#FB-20-CO-A-016)
- [FB-20-CO-B-005 git cherry-pick 是什么](#FB-20-CO-B-005)

**参考资源**：
- [Pro Git - 使用 Git 调试](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E4%BD%BF%E7%94%A8-Git-%E8%B0%83%E8%AF%95)
- [Git 官方文档 - git-bisect](https://git-scm.com/docs/git-bisect)

**口头回答版**：
> git bisect 是用二分查找来定位哪个 commit 引入了 bug。先 git bisect start，然后 git bisect bad 标记当前有问题，git bisect good 标记某个旧版本正常，Git 会自动跳到中间版本让你测试，反复标记好坏，最后定位到第一个坏提交。还可以用 git bisect run 加脚本自动判断。

---

### FB-20-CO-A-016：git blame 和 git log 在追踪变更时如何使用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、blame、log、变更追踪、历史
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `git blame` 和 `git log` 在代码变更追踪中的作用，并给出常用命令示例。

**参考答案**：

`git blame` 用于逐行显示某文件中每一行最后是由哪个 commit、哪个作者修改的。

```bash
# 基本用法
git blame src/utils.js

# 只看某几行
git blame -L 10,30 src/utils.js

# 忽略空白变更
git blame -w src/utils.js

# 显示更短的 commit hash
git blame -s src/utils.js
```

`git log` 用于查看 commit 历史，结合参数可以追踪文件或行的变更历史。

```bash
# 查看某文件的历史
git log -- src/utils.js

# 查看某文件每次改动的 diff
git log -p src/utils.js

# 查看某行代码何时引入
git log -S "functionName" -- src/utils.js

# 查看某文件改名历史
git log --follow -- src/utils.js

# 图形化显示分支历史
git log --oneline --graph --all
```

`git log -S`（pickaxe）用于查找某段代码何时被引入或删除；`git log -G` 支持正则匹配。

实际场景：
- 想知道某行 bug 是谁改的、什么时候改的：用 `git blame`。
- 想知道某个函数或变量何时被加入或移除：用 `git log -S`。
- 想了解文件完整演变历史：用 `git log --follow`。

**评分维度**：
- 能说明 blame 用于逐行定位最后修改者（35%）
- 能说明 log 用于查看 commit 历史和文件变更（35%）
- 能给出 -L、-S、--follow 等实用参数示例（30%）

**常见错误**：
- 用 blame 找“谁写了这行代码”来追责，忽略代码可能经过多次重构。
- 不知道 `-S` 可以查找代码片段引入/删除。
- 文件重命名后没有使用 `--follow` 导致历史断裂。

**延伸追问**：
- blame 显示的是最后一次修改，如何看某行最初是谁引入的？
- 如何过滤掉格式化提交对 blame 结果的干扰？

**相关题目**：
- [FB-20-CO-A-015 git bisect 二分查找回归](#FB-20-CO-A-015)
- [FB-20-CO-P-023 git reflog 恢复误操作](#FB-20-CO-P-023)

**参考资源**：
- [Pro Git - 使用 Git 调试](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E4%BD%BF%E7%94%A8-Git-%E8%B0%83%E8%AF%95)
- [Git 官方文档 - git-blame](https://git-scm.com/docs/git-blame)

**口头回答版**：
> git blame 可以看文件里每一行最后是谁在哪个 commit 改的，适合定位某行代码的变更来源；git log 是看提交历史，可以查某个文件的历史改动，`-S` 能查某段代码什么时候被加入或删掉，`--follow` 能追踪文件重命名。blame 找的是最后修改者，追责之前要结合 log 看完整历史。

---

## 深入题（8 道）{#proficient}

### FB-20-EN-P-017：Monorepo 中如何使用 Changesets 管理版本和发布？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理、11 Monorepo
**标签**：Git、Monorepo、Changesets、版本管理、发布
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明在 Monorepo 中，为什么需要 Changesets 这样的工具，以及它的核心工作流程。

**参考答案**：

Monorepo 包含多个独立包，如果统一版本号（如 Lerna fixed mode）会迫使所有包同时升级，即使某些包没有改动。Changesets 提供了一种声明式、可审计的变更管理方式，让每个包独立或按策略升级。

核心概念：

1. **Changeset 文件**：开发者在提交 PR 时生成 `.changeset/{uuid}.md`，描述本次变更影响的包、变更类型（major/minor/patch）和摘要。

```markdown
---
"@scope/button": minor
"@scope/theme": patch
---

Add dark mode support to Button component.
```

2. **版本聚合**：发布时 `changeset version` 读取所有未消费的 changeset，自动更新 `package.json` 版本号、生成 CHANGELOG。

3. **发布执行**：`changeset publish` 将需要发布的包推送到 npm registry。

工作流程：

```bash
# 开发完成，生成 changeset
npx changeset

# 提交 changeset 文件到仓库
git add .changeset/
git commit -m "chore: add changeset for button dark mode"

# CI 中聚合版本（通常在 release PR 中执行）
npx changeset version

# 发布
npx changeset publish
```

优势：
- 每个包的变更和版本升级可追溯。
- PR 审查时可以单独审查版本升级决策。
- 支持 snapshot 发布、prerelease 模式。
- 与 GitHub Actions 集成，自动生成 release PR。

**评分维度**：
- 能说明 Monorepo 独立版本管理的需求（30%）
- 能解释 changeset 文件结构和 major/minor/patch 含义（30%）
- 能描述从开发到发布的完整工作流（25%）
- 能提到与 CI/CD 集成的实践（15%）

**常见错误**：
- 认为 Changesets 只是自动生成 CHANGELOG。
- 在 PR 中遗漏 changeset，导致发布时漏掉版本升级。
- 混淆 Changesets 与 Lerna 的 fixed / independent 模式。

**延伸追问**：
- Changesets 如何处理依赖关系升级？
- 如果某个改动不应该触发版本发布，如何标记？

**相关题目**：
- [FB-20-SD-R-026 Monorepo vs Polyrepo 选型](#FB-20-SD-R-026)
- [FB-20-EN-A-010 Conventional Commits 规范](#FB-20-EN-A-010)

**参考资源**：
- [Changesets 官方文档](https://github.com/changesets/changesets)
- [pnpm workspace 与 Changesets 实践](https://pnpm.io/using-changesets)

**口头回答版**：
> Monorepo 里多个包如果统一版本号会很不灵活，Changesets 就是用来独立管理每个包版本和变更的。开发时运行 `npx changeset` 生成一个 markdown 文件，说明改了哪些包、是 major、minor 还是 patch。发布时用 `changeset version` 自动更新版本号和 CHANGELOG，再用 `changeset publish` 发布。好处是每次版本升级都有记录，PR 里也能审查。

---

### FB-20-PE-P-018：面对超大型仓库，Git 有哪些优化手段？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、大仓库、sparse-checkout、partial-clone、性能
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明在超大型仓库（如大型 Monorepo）中，Git 提供了哪些优化手段来降低克隆时间、减少磁盘占用和提升日常操作性能。

**参考答案**：

超大型仓库常见痛点：完整克隆时间长、磁盘占用大、`git status` 和 `git log` 等操作变慢。Git 提供了多种机制缓解这些问题。

1. **Shallow Clone（浅克隆）**
   - 只克隆最近 N 层历史。
   - `git clone --depth 1 https://github.com/org/repo.git`
   - 适合 CI 构建，不适合长期开发。

2. **Partial Clone（部分克隆，Git 2.22+）**
   - 不一次性下载所有 blob/tree，按需拉取。
   - `--filter=blob:none`：不下载 blob，打开文件时按需获取。
   - `--filter=tree:0`：不下载 tree，查看目录时按需获取。

```bash
git clone --filter=blob:none --no-checkout https://github.com/org/repo.git
git sparse-checkout init --cone
git sparse-checkout set packages/app-a
```

3. **Sparse Checkout（稀疏检出）**
   - 只检出工作区中需要的子目录，其他文件在本地仓库中存在但不显示在工作区。
   - `cone` 模式适合目录级稀疏检出，性能更好。

4. **Git LFS（Large File Storage）**
   - 将大文件（图片、视频、二进制）替换为指针文件，实际文件存储在 LFS 服务器。
   - 减少仓库体积和历史膨胀。

5. **Commit Graph（提交图）**
   - `git commit-graph write` 预计算提交关系，加速 `git log`、`git blame`。

6. **FSMonitor（文件系统监视器）**
   - 监听文件变化，加速 `git status`。
   - `git config core.fsmonitor true`

7. **多包仓库拆分**
   - 长期看可考虑按业务域拆分为多个仓库或子模块。

**评分维度**：
- 能列举 shallow clone、partial clone、sparse checkout、LFS 等手段（40%）
- 能说明 partial clone 和 sparse checkout 的区别与组合使用（30%）
- 能提到 commit-graph、fsmonitor 等性能优化配置（20%）
- 能结合场景给出选型建议（10%）

**常见错误**：
- 只 clone `--depth 1` 给开发者长期使用，导致无法查看完整历史。
- 混淆 sparse checkout 和 submodule 的适用场景。
- 大文件直接提交到 Git 而不使用 LFS。

**延伸追问**：
- sparse checkout 的 cone 模式和旧模式有什么区别？
- partial clone 下离线工作会有什么问题？

**相关题目**：
- [FB-20-CO-P-019 Git LFS 大文件管理](#FB-20-CO-P-019)
- [FB-20-SD-R-028 大规模仓库的 Git 治理方案](#FB-20-SD-R-028)

**参考资源**：
- [Git 官方文档 - partial clone](https://git-scm.com/docs/partial-clone)
- [Git 官方文档 - sparse-checkout](https://git-scm.com/docs/git-sparse-checkout)
- [GitHub - Large File Storage](https://git-lfs.com/)

**口头回答版**：
> 大仓库优化有几种手段：`--depth 1` 浅克隆适合 CI；`--filter=blob:none` 部分克隆只按需下载文件内容；sparse checkout 只检出需要的目录；LFS 把大文件放到外部存储；还有 commit-graph 加速 log、fsmonitor 加速 status。开发者本地常用 partial clone 加 sparse checkout 组合。

---

### FB-20-CO-P-019：Git LFS 是什么？什么时候应该使用？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、LFS、大文件、二进制、存储
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Git LFS（Large File Storage）的工作原理，并说明它的优缺点及配置方式。

**参考答案**：

Git LFS 是 Git 的扩展，用于管理大文件。它将大文件替换为轻量级指针文件存入 Git 仓库，实际文件内容存储在 LFS 服务器上。

工作原理：

1. 安装 LFS 并追踪某类文件：

```bash
git lfs install
git lfs track "*.psd"
git lfs track "*.mp4"
```

2. 这会生成或更新 `.gitattributes`：

```gitattributes
*.psd filter=lfs diff=lfs merge=lfs -text
```

3. 提交时，Git 只保存一个指针文件到仓库，大文件上传到 LFS 服务器。

4. checkout 时，LFS 客户端根据指针文件下载实际内容。

指针文件示例：

```text
version https://git-lfs.github.com/spec/v1
oid sha256:abc123...
size 12345678
```

适用场景：
- 设计稿、视频、音频、模型文件、大型二进制资源。
- 任何超过 Git 推荐大小（通常 100MB）的文件。

优缺点：

| 优点 | 缺点 |
|------|------|
| 减小仓库体积 | 需要额外安装 LFS 客户端 |
| 加快 clone 速度 | 依赖 LFS 服务器可用性 |
| 大文件版本仍可追溯 | 部分 Git 托管平台收费 |

**评分维度**：
- 能说明 LFS 用指针文件替换大文件（40%）
- 能写出 install / track 基本配置（30%）
- 能分析优缺点和适用场景（30%）

**常见错误**：
- 大文件已经提交到仓库后才启用 LFS，未清理历史。
- 忘记将 `.gitattributes` 提交到仓库。
- 认为 LFS 会压缩或优化大文件内容本身。

**延伸追问**：
- 已经提交大文件到仓库后，如何迁移到 LFS？
- LFS 和 submodule 管理大文件各有什么优劣？

**相关题目**：
- [FB-20-PE-P-018 大仓库优化手段](#FB-20-PE-P-018)
- [FB-20-CO-P-020 submodule 与 subtree 选型](#FB-20-CO-P-020)

**参考资源**：
- [Git LFS 官网](https://git-lfs.com/)
- [GitHub - 关于 Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage)

**口头回答版**：
> Git LFS 用来管理大文件。它在 Git 仓库里存一个指针文件，实际的大文件内容存在 LFS 服务器上。配置就是 `git lfs install`，然后 `git lfs track "*.psd"` 这类文件，会生成 `.gitattributes`。适合设计稿、视频、二进制资源，能减小仓库体积，但需要额外安装客户端和依赖服务器。

---

### FB-20-CO-P-020：Git submodule 和 subtree 有什么区别？如何选择？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、submodule、subtree、依赖管理、子仓库
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Git submodule 和 Git subtree 的工作方式、优缺点，并说明在项目中如何选择。

**参考答案**：

两者都用于在一个 Git 仓库中引入另一个 Git 仓库，但设计哲学不同。

**Git submodule**：
- 在主仓库中保存子仓库的引用（commit hash）。
- 子仓库是独立的 Git 仓库，需要单独克隆、提交和管理。
- 主仓库只记录子仓库应处于哪个 commit。

```bash
# 添加 submodule
git submodule add https://github.com/example/lib.git libs/lib

# 克隆包含 submodule 的仓库
git clone --recurse-submodules https://github.com/org/monorepo.git
```

优点：
- 子仓库完全独立，版本锁定精确。
- 适合第三方依赖或共享库。

缺点：
- 操作复杂，容易忘记更新 submodule。
- 对新手不友好，容易误提交子仓库到错误状态。

**Git subtree**：
- 将子仓库的代码直接合并到主仓库的某个目录。
- 对外呈现为一个普通目录，对开发者透明。
- 可以通过 `git subtree push/pull` 双向同步。

```bash
# 添加 subtree
git subtree add --prefix=libs/lib https://github.com/example/lib.git main --squash

# 拉取更新
git subtree pull --prefix=libs/lib https://github.com/example/lib.git main --squash
```

优点：
- 对团队成员透明，不需要额外学习成本。
- 子仓库代码随主仓库一起 clone。

缺点：
- 主仓库历史会变长（除非用 `--squash`）。
- 双向同步命令较复杂。

选型建议：
- 子仓库需要独立演进、精确版本控制：submodule。
- 希望团队无感知、子仓库只是代码复用：subtree。
- 现代 Monorepo 中，也可以考虑包管理工具替代（如 pnpm workspace、npm workspace）。

**评分维度**：
- 能说明 submodule 保存引用、subtree 合并代码的本质区别（40%）
- 能对比两者的优缺点（30%）
- 能给出选型建议和替代方案（30%）

**常见错误**：
- 在需要频繁双向同步的场景错误选择 submodule。
- subtree 未加 `--squash` 导致主仓库历史被子仓库 commit 塞满。
- 认为 submodule 和 subtree 可以互相无缝迁移。

**延伸追问**：
- submodule 更新后，主仓库如何同步？
- subtree 双向同步时如何解决冲突？

**相关题目**：
- [FB-20-PE-P-018 大仓库优化手段](#FB-20-PE-P-018)
- [FB-20-SD-R-026 Monorepo vs Polyrepo 选型](#FB-20-SD-R-026)

**参考资源**：
- [Pro Git - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
- [Git 官方文档 - git-subtree](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt)

**口头回答版**：
> submodule 是在主仓库里记录子仓库的 commit 引用，子仓库独立管理；subtree 是把子仓库代码直接合并到主仓库的某个目录里，对开发者透明。submodule 适合需要精确版本控制的第三方库，subtree 适合想让团队无感知的代码复用。不过现在很多场景用 Monorepo 的包管理工具更合适。

---

### FB-20-SE-P-021：Git 中如何保障提交安全和防止敏感信息泄露？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理、05 安全
**标签**：Git、安全、GPG、签名、secrets-scanning、敏感信息
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Git 提交安全的主要手段，包括提交签名、敏感信息扫描和误提交后的补救措施。

**参考答案**：

1. **GPG/SSH 签名提交（Commit Signing）**
   - 验证提交者身份，防止伪造。
   - GitHub/GitLab 可配置要求签名提交（vigilant mode / signed commits required）。

```bash
# 配置签名密钥
git config --global user.signingkey <key-id>
git config --global commit.gpgsign true

# 签名提交
git commit -S -m "feat: secure commit"

# 使用 SSH 密钥签名（Git 2.34+）
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
```

2. **敏感信息扫描**
   - 客户端：pre-commit 钩子使用 `detect-secrets`、`git-secrets`、`gitleaks` 扫描密钥、token、密码。
   - 服务端：GitHub secret scanning、GitLab secret detection、TruffleHog 等。

```bash
# pre-commit 配置示例
repos:
  - repo: https://github.com/Yelp/detect-secrets
    hooks:
      - id: detect-secrets
```

3. **误提交后的补救**
   - 如果敏感信息已提交但未 push：用 `git reset` 或 `git rebase -i` 移除。
   - 如果已 push：必须轮换凭据，然后使用 `git filter-repo` 或 BFG Repo-Cleaner 从历史中清除。
   - 切勿只 revert，因为历史中的敏感信息仍然可见。

```bash
# 使用 filter-repo 移除敏感文件（推荐替代 git filter-branch）
git filter-repo --path secrets.env --invert-paths
```

**评分维度**：
- 能说明 GPG/SSH 签名的作用和配置（35%）
- 能列举 pre-commit 和 CI 中的 secrets 扫描工具（30%）
- 能给出误提交后的正确补救流程（25%）
- 能强调已 push 后需轮换凭据（10%）

**常见错误**：
- 认为 `.gitignore` 能防止已提交敏感信息的泄露。
- 敏感信息 push 后仅做 revert，未清理历史。
- 未轮换已泄露的凭据。

**延伸追问**：
- 如何验证某个提交确实经过签名？
- GitHub 的 secret scanning 和 pre-commit 扫描有什么区别？

**相关题目**：
- [FB-20-EN-A-011 Git Hooks 与 Husky](#FB-20-EN-A-011)
- [FB-20-EN-R-030 Git 灾难恢复与备份策略](#FB-20-EN-R-030)

**参考资源**：
- [GitHub - Signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)
- [git-filter-repo 文档](https://github.com/newren/git-filter-repo)
- [gitleaks 工具](https://github.com/gitleaks/gitleaks)

**口头回答版**：
> Git 安全主要靠三点：一是用 GPG 或 SSH 密钥给提交签名，防止身份伪造；二是在 pre-commit 和 CI 里用 gitleaks、detect-secrets 这些工具扫描敏感信息；三是万一泄露了，已 push 的话不能只做 revert，要轮换凭据并用 filter-repo 清理历史。记住 `.gitignore` 防不住已经提交的东西。

---

### FB-20-EN-P-022：Git 如何与 CI/CD 流水线集成？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理、12 CI/CD
**标签**：Git、CI/CD、GitHub Actions、GitLab CI、自动化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Git 在 CI/CD 流水线中的典型集成方式，包括触发条件、环境变量、分支策略和发布流程。

**参考答案**：

Git 与 CI/CD 的集成是现代交付的核心，常见触发条件和实践如下：

1. **触发条件**
   - `push`：提交到指定分支触发构建。
   - `pull_request`：PR 创建/更新时触发检查。
   - `tag`：打 tag 时触发发布。
   - `schedule`：定时触发。
   - `workflow_dispatch`：手动触发。

2. **环境变量**
   - `GITHUB_SHA` / `CI_COMMIT_SHA`：当前 commit hash。
   - `GITHUB_REF` / `CI_COMMIT_REF_NAME`：分支或 tag。
   - 用于生成版本号、埋点、报告。

3. **分支策略**
   - PR 必须经过 CI 检查才能合并。
   - 主分支设置保护，禁止直接 push。
   - hotfix 分支走同样的审查流程。

4. **典型工作流示例（GitHub Actions）**

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

5. **发布流程**
   - 合并到 main 后自动生成 release PR（Changesets）。
   - 合并 release PR 后自动打 tag、发布 npm、部署。

**评分维度**：
- 能列举 push / PR / tag 等触发条件（30%）
- 能说明主分支保护和 PR 必须过 CI 的实践（25%）
- 能写出基础 CI 配置示例（25%）
- 能描述发布自动化的链路（20%）

**常见错误**：
- 在 CI 中使用 `npm install` 而非 `npm ci`，导致依赖不锁定。
- CI 触发条件过于宽泛，造成资源浪费。
- 主分支未设置保护，可直接绕过 CI 合并。

**延伸追问**：
- 如何保证 CI 中使用的 Node.js 版本与开发环境一致？
- 多包 Monorepo 的 CI 如何做到按需构建？

**相关题目**：
- [FB-20-EN-A-014 Pull Request 审查流程](#FB-20-EN-A-014)
- [FB-20-EN-R-027 Git 工作流与自动化质量门禁](#FB-20-EN-R-027)

**参考资源**：
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitLab CI/CD 文档](https://docs.gitlab.com/ee/ci/)

**口头回答版**：
> Git 和 CI/CD 集成主要靠 push、PR、tag 这些事件触发流水线。PR 要跑 lint、测试、构建，通过了才能合并；主分支要设置保护不能直接 push。发布可以结合 Changesets，合并 release PR 后自动打 tag、发 npm、部署。环境变量像 `GITHUB_SHA`、`GITHUB_REF` 可以拿到当前 commit 和分支信息。

---

### FB-20-CO-P-023：git reflog 能帮你恢复哪些误操作？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、reflog、恢复、HEAD、误操作
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `git reflog` 的作用，并举例说明它能恢复哪些常见的误操作。

**参考答案**：

`git reflog` 记录了 HEAD 和分支引用的所有移动历史，包括 commit、reset、checkout、rebase、merge、cherry-pick 等操作。即使某些 commit 不再被任何分支引用，只要 reflog 还没过期，就可以找回。

常见可恢复的误操作：

1. **误用 `git reset --hard`**

```bash
# 查看 reflog 找到 reset 之前的 commit
git reflog
# 输出示例：
# abc1234 HEAD@{0}: reset: moving to HEAD~3
# def5678 HEAD@{1}: commit: feat: important feature

# 恢复到该 commit
git checkout def5678
# 或重置当前分支到该 commit
git reset --hard def5678
```

2. **误删分支**

```bash
git reflog | grep "checkout: moving from feature to main"
# 找到 feature 分支最后的 commit
git checkout -b feature-recovered abc1234
```

3. **rebase 出错**

```bash
# 找到 rebase 开始前的状态
git reflog
# 用 ORIG_HEAD 或 reflog 条目恢复
git reset --hard ORIG_HEAD
```

注意事项：
- reflog 默认保存 90 天（不可达对象 30 天），会过期。
- reflog 是本地记录，不会随 push 同步到远程。
- 定期 push 到远程是防止本地数据丢失的最佳保险。

**评分维度**：
- 能说明 reflog 记录 HEAD 和分支引用移动历史（40%）
- 能举例恢复 reset --hard、误删分支、rebase 出错（40%）
- 能提到 reflog 本地有效且会过期（20%）

**常见错误**：
- 误操作后立刻 panic，不知道用 reflog 找回。
- 认为 reflog 可以恢复任意时间的历史（受过期时间限制）。
- 将 reflog 当作远程备份工具。

**延伸追问**：
- reflog 和 `git fsck` 在恢复丢失对象时有什么区别？
- 如何延长或缩短 reflog 的保存时间？

**相关题目**：
- [FB-20-CO-B-006 git reset 的三种模式](#FB-20-CO-B-006)
- [FB-20-CO-B-007 git revert 与 git reset 区别](#FB-20-CO-B-007)

**参考资源**：
- [Pro Git - 数据恢复](https://git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-%E7%BB%B4%E6%8A%A4%E4%B8%8E%E6%95%B0%E6%8D%AE%E6%81%A2%E5%A4%8D)
- [Git 官方文档 - git-reflog](https://git-scm.com/docs/git-reflog)

**口头回答版**：
> git reflog 记录了 HEAD 和分支的所有移动，比如 commit、reset、rebase、切换分支这些。误用了 `git reset --hard`、误删了分支、rebase 搞砸了，都可以通过 reflog 找到之前的 commit 恢复。但它只存在本地，默认保存 90 天，过期就没了，所以重要改动还是要 push 到远程。

---

### FB-20-CP-P-024：在团队协作中，如何约定 rebase 和 merge 的使用策略？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、rebase、merge、团队协作、规范
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一套团队中 rebase 和 merge 的使用策略，包括本地分支整理、功能分支合并到主分支、hotfix 处理等场景。

**参考答案**：

策略核心：**本地可 rebase，公共只 merge（或 squash merge）**。

1. **本地功能分支整理**
   - 在 push 到远程之前，开发者可以自由使用 `git rebase -i` 整理 commit。
   - 合并琐碎的 fixup commit，修正提交信息。
   - 在提交 PR 前将功能分支 rebase 到最新 main，保持线性历史。

```bash
git checkout feature/login
git rebase -i main
```

2. **功能分支合并到主分支**
   - 使用 Pull Request / Merge Request 合并。
   - 推荐 **Squash Merge**：将分支上所有 commit 合并为一个语义清晰的 commit。
   - 或 **Rebase Merge**：保持每个 commit 但生成线性历史。
   - 避免普通 merge 产生大量无意义 merge commit。

3. **主分支和发布分支**
   - 禁止对主分支 rebase。
   - hotfix 直接在 release 分支修复，完成后 cherry-pick 或 merge 回 main。

4. **冲突处理**
   - 本地 rebase 时产生的冲突由开发者自行解决。
   - 合并到主分支前确保 CI 通过。

5. **文档化**
   - 将策略写入团队规范文档。
   - 在 CI 或分支保护中强制执行（如禁止 force push 到 main）。

**评分维度**：
- 能明确本地可 rebase、公共只 merge 的原则（35%）
- 能给出 squash merge / rebase merge 的合并建议（25%）
- 能说明 hotfix 和主分支保护策略（25%）
- 能提到文档化和工具 enforcement（15%）

**常见错误**：
- 允许开发者 force push 主分支。
- 团队内一半人用 rebase 一半人用 merge，历史混乱。
- PR 合并时不清理 commit 历史，导致主分支可读性差。

**延伸追问**：
- 如果历史已经混乱，如何渐进式治理？
- 多人协作的功能分支如何处理彼此的 rebase？

**相关题目**：
- [FB-20-CO-B-003 merge 与 rebase 的区别](#FB-20-CO-B-003)
- [FB-20-SD-R-025 设计千人团队的 Git 分支策略](#FB-20-SD-R-025)

**参考资源**：
- [Pro Git - 变基](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)
- [GitHub - About merge methods](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github)

**口头回答版**：
> 我的原则是：本地功能分支随便 rebase 整理历史，但公共分支只 merge。PR 合并推荐 squash merge，把分支 commit 合成一个清晰的提交；也可以用 rebase merge 保持线性。主分支禁止 force push，hotfix 在 release 分支修完再同步回 main。最重要的是写成规范，用分支保护强制执行。

---

## 架构题（7 道）{#architect}

### FB-20-SD-R-025：如何为千人规模的前端团队设计 Git 分支策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、分支策略、大规模团队、治理、Monorepo
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
假设你是前端架构师，需要为一个千人规模、多业务线、使用 Monorepo 的前端团队设计 Git 分支策略。请从分支模型、合并策略、权限控制、CI/CD 集成、冲突治理等方面给出完整方案。

**参考答案**：

1. **分支模型选择**
   - 采用 **Trunk-Based Development** 为主，辅以短期 feature 分支。
   - 主干 `main` 必须随时可构建、可部署。
   - 未完成的特性通过 feature flags 控制，不阻塞集成。

2. **分支命名规范**
   - `feature/{owner}-{description}`：功能开发，生命周期不超过 3 天。
   - `fix/{owner}-{description}`：bug 修复。
   - `release/{version}`：发布分支（如需多版本维护）。
   - `hotfix/{description}`：紧急修复。

3. **合并策略**
   - 所有合并必须通过 PR/MR。
   - 采用 Squash Merge，主历史保持简洁。
   - 合并前必须 rebase 到最新 main，确保线性可审查历史。

4. **权限与保护**
   - `main` 和 `release/*` 设置分支保护。
   - 禁止 force push，禁止直接 push。
   - 必须至少 1-2 个 approve，且 CI 全部通过。
   - CODEOWNERS 文件确保关键目录由对应负责人审查。

5. **CI/CD 集成**
   - PR 触发：lint、type check、单元测试、依赖影响分析、构建受影响的包。
   - main 合并后：全量构建、集成测试、生成 release PR（Changesets）。
   - 发布：合并 release PR 后自动打 tag、发布、部署。

6. **冲突与性能治理**
   - 按业务域划分目录和包 ownership。
   - 使用 sparse checkout、partial clone 降低大仓库成本。
   - 强制统一代码格式化，减少无意义冲突。
   - 建立冲突协调人和升级机制。

7. **工具链**
   - GitHub / GitLab Enterprise。
   - Changesets 管理 Monorepo 版本。
   - Husky + lint-staged + commitlint 保障提交质量。
   - Backstage / 内部文档记录分支策略。

**评分维度**：
- 能选择适合大规模团队的分支模型（25%）
- 能设计分支命名、合并策略和权限控制（25%）
- 能说明与 CI/CD、Changesets 的集成（20%）
- 能提出冲突治理和性能优化方案（20%）
- 能考虑文档化和工具 enforcement（10%）

**常见错误**：
- 直接照搬 Git Flow，忽视千人团队的分支爆炸问题。
- 忽略分支保护和 CODEOWNERS 的重要性。
- 没有考虑大仓库性能对开发者体验的影响。

**延伸追问**：
- 如果业务线之间需要独立发布周期，如何调整策略？
- 如何处理跨业务线的大规模重构？

**相关题目**：
- [FB-20-CO-A-009 Git Flow 等分支策略对比](#FB-20-CO-A-009)
- [FB-20-CP-P-024 rebase 与 merge 的团队协作策略](#FB-20-CP-P-024)

**参考资源**：
- [Trunk-Based Development](https://trunkbaseddevelopment.com/)
- [Google 工程实践 - 代码审查](https://google.github.io/eng-practices/review/)
- [Monorepo.tools](https://monorepo.tools/)

**口头回答版**：
> 千人团队我推荐 Trunk-Based Development 加短周期 feature 分支。主干 main 必须随时可部署，没做完的功能用 feature flag 藏起来。所有合并走 PR，用 squash merge，合并前要 rebase 到最新 main。主分支设置保护，禁止直接 push 和 force push，关键目录配 CODEOWNERS。CI 要做影响分析，只构建受影响的包，发布用 Changesets 自动管理版本。大仓库还要用 sparse checkout、partial clone 这些优化。

---

### FB-20-SD-R-026：Monorepo 和 Polyrepo 如何选型？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、11 Monorepo
**标签**：Git、Monorepo、Polyrepo、仓库治理、选型
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请对比 Monorepo 和 Polyrepo 的优缺点，并说明在不同组织规模、业务阶段和技术需求下如何选型。

**参考答案**：

**Monorepo**：所有代码放在同一个仓库中管理。

优点：
- 跨项目重构原子提交，保证一致性。
- 共享代码、组件库、工具链容易。
- 统一的 CI/CD、代码规范、依赖版本。
- 便于全局搜索和依赖分析。

缺点：
- 仓库规模大，clone 和操作变慢。
- 权限粒度粗，所有开发者理论上可访问全部代码。
- 一次误操作可能影响全局。
- 需要专门的工具链（Nx、Turborepo、Bazel、Changesets）。

**Polyrepo**：每个项目独立仓库。

优点：
- 仓库小，clone 快，自治性强。
- 权限控制更细，不同团队独立演进。
- 技术栈可以自由选择。

缺点：
- 跨仓库改动作业成本高。
- 依赖版本同步困难。
- 重复建设和规范不统一。
- 工具链和 CI 配置重复。

选型建议：

| 场景 | 推荐 |
|------|------|
| 小型团队、产品早期 | Monorepo |
| 大型团队、强平台型产品 | Monorepo + 分层治理 |
| 多独立产品线、弱耦合 | Polyrepo |
| 收购合并的多团队 | Polyrepo 或 federation |

折中方案：
- **Monorepo + 子目录权限**：通过 CODEOWNERS、目录级 CI 缓解权限问题。
- **Polyrepo + 统一工具模板**：通过 scaffolding 和共享 action 统一规范。
- **Federation**：核心平台 Monorepo，业务线 Polyrepo。

**评分维度**：
- 能从至少 4 个维度对比 Monorepo 和 Polyrepo（35%）
- 能结合团队规模和业务耦合度给出选型建议（30%）
- 能提出折中或演进方案（20%）
- 能提到工具链配套要求（15%）

**常见错误**：
- 盲目追求 Monorepo，忽视大仓库治理成本。
- 在高度耦合的业务中强行 Polyrepo，导致同步困难。
- 认为 Monorepo 和 Polyrepo 是非黑即白的选择。

**延伸追问**：
- 从 Polyrepo 迁移到 Monorepo 的关键步骤是什么？
- Monorepo 中如何防止一个团队的改动影响全仓库？

**相关题目**：
- [FB-20-EN-P-017 Monorepo 变更管理 Changesets](#FB-20-EN-P-017)
- [FB-20-PE-P-018 大仓库优化手段](#FB-20-PE-P-018)

**参考资源**：
- [Monorepo.tools](https://monorepo.tools/)
- [Google - Why Google Stores Billions of Lines of Code in a Single Repository](https://research.google/pubs/pub45424/)
- [Segment - Goodbye Microservices](https://segment.com/blog/goodbye-microservices/)

**口头回答版**：
> Monorepo 是所有代码放一个仓库，方便跨项目重构、共享代码、统一规范；缺点是大仓库慢、权限粗。Polyrepo 是每个项目独立仓库，自治强、clone 快，但跨仓库改动麻烦、依赖同步难。选型看组织规模和业务耦合度：小团队或强平台型产品适合 Monorepo；多独立产品线适合 Polyrepo。也可以折中，比如核心平台 Monorepo、业务线 Polyrepo。

---

### FB-20-EN-R-027：如何构建 Git 工作流中的自动化质量门禁？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、12 CI/CD、13 代码质量
**标签**：Git、CI、质量门禁、自动化、分支保护
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套基于 Git 的自动化质量门禁体系，覆盖提交前、PR 审查、合并后、发布前四个阶段。

**参考答案**：

质量门禁应贯穿代码变更全生命周期：

1. **提交前（pre-commit）**
   - Husky + lint-staged：只检查本次提交改动的文件。
   - commitlint：校验 Conventional Commits 格式。
   - secrets 扫描：detect-secrets / gitleaks。
   - 轻量级单元测试。

2. **PR 审查阶段**
   - CI 流水线：lint、type check、单元测试、构建。
   - 依赖影响分析：Monorepo 中只跑受影响包的测试。
   - 代码覆盖率门槛：新增代码覆盖率不低于 80%。
   - 安全扫描：SAST、依赖漏洞扫描。
   - 自动化审查：size-limit、bundle-analyzer 报告。

3. **合并到主分支后**
   - 全量测试和构建。
   - 发布候选版本（canary / snapshot）。
   - 自动更新 CHANGELOG、生成 release PR。

4. **发布前**
   - 手动或自动审批。
   - 端到端测试、性能基准测试。
   - 发布 gate：必须通过的 checklist。

示例分支保护规则：

```yaml
# GitHub 分支保护示例规则
required_status_checks:
  - ci/lint
  - ci/test
  - ci/build
  - coverage-check
required_pull_request_reviews:
  required_approving_review_count: 2
restrictions:
  users: []
  teams: []
```

关键原则：
- 门禁应快速反馈，PR 阶段 5-10 分钟内给出结果。
- 失败信息清晰，指引开发者修复。
- 避免门禁过多导致开发者绕过。

**评分维度**：
- 能按四阶段设计门禁（35%）
- 能列举各阶段的具体检查项（30%）
- 能说明分支保护和 CI 配置（20%）
- 能提到反馈速度和开发者体验（15%）

**常见错误**：
- pre-commit 运行全量测试，提交体验极差。
- 只有人工审查，没有自动化门禁。
- 门禁失败后没有清晰的修复指引。

**延伸追问**：
- 如何处理 flaky test 导致的门禁失败？
- 紧急 hotfix 如何在不破坏质量的前提下快速放行？

**相关题目**：
- [FB-20-EN-A-011 Git Hooks 与 Husky](#FB-20-EN-A-011)
- [FB-20-EN-A-014 Pull Request 审查流程](#FB-20-EN-A-014)

**参考资源**：
- [GitHub - About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Google SRE - Eliminating Toil](https://sre.google/sre-book/eliminating-toil/)

**口头回答版**：
> 质量门禁分四段：提交前用 Husky 跑 lint-staged、commitlint、secrets 扫描；PR 阶段 CI 跑 lint、测试、构建、覆盖率、安全扫描；合并到 main 后跑全量测试、生成快照或 release PR；发布前做审批、端到端测试和性能基准。分支保护要设置必须通过 CI 和 review 才能合并。关键是反馈要快、失败信息要清楚。

---

### FB-20-SD-R-028：如何治理大规模 Git 仓库的性能和可维护性？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、大仓库、治理、性能、Monorepo
**出现频率**：低频
**预计回答时长**：15-30 分钟

**题目描述**：
请从仓库结构、工具链、工作流、监控治理等方面，设计一套大规模 Git 仓库的治理方案。

**参考答案**：

大规模仓库治理需要技术、流程、工具三管齐下。

1. **仓库结构治理**
   - 按业务域和职责划分目录，避免所有代码平铺。
   - 建立清晰的 ownership（CODEOWNERS）。
   - 定期清理死代码、过期依赖、旧分支。

2. **工具链优化**
   - 使用 partial clone + sparse checkout 降低 clone 成本。
   - 大文件使用 Git LFS，避免历史膨胀。
   - 启用 commit-graph、fsmonitor 加速日常操作。
   - 构建系统使用远程缓存（Turborepo remote cache、Bazel remote cache）。

3. **工作流优化**
   - 控制分支生命周期，定期清理过期分支。
   - PR 只做影响分析，避免全量构建。
   - 限制单次 PR 大小，便于审查和回滚。

4. **监控与治理**
   - 监控仓库体积增长、大文件提交、CI 耗时。
   - 设置提交大小限制（如单个 commit 不超过 10MB）。
   - 定期 run `git-sizer` 评估仓库健康度。

```bash
# 评估仓库健康
npx git-sizer

# 找出最大的 blob
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {print $3, $4}' | sort -rn | head -20
```

5. **治理组织**
   - 成立仓库治理小组，定期审查仓库健康指标。
   - 制定大文件和敏感信息提交规范。
   - 对违规提交进行教育和流程改进。

**评分维度**：
- 能从结构、工具、工作流、监控四方面设计方案（35%）
- 能提出 partial clone、LFS、commit-graph 等具体技术（25%）
- 能说明 ownership 和分支清理等流程治理（20%）
- 能提到监控指标和治理组织（20%）

**常见错误**：
- 只关注技术优化，忽略流程和组织治理。
- 让仓库无限增长，不清理历史。
- 大文件反复提交后才想起 LFS。

**延伸追问**：
- 如果仓库已经严重膨胀，如何瘦身？
- 如何在不破坏历史的前提下拆分仓库？

**相关题目**：
- [FB-20-PE-P-018 大仓库优化手段](#FB-20-PE-P-018)
- [FB-20-CO-P-019 Git LFS 大文件管理](#FB-20-CO-P-019)

**参考资源**：
- [git-sizer](https://github.com/github/git-sizer)
- [Git 官方文档 - partial clone](https://git-scm.com/docs/partial-clone)
- [Microsoft - How Microsoft Builds Software](https://www.microsoft.com/en-us/research/publication/the-seven-properties-of-highly-secure-devices/)

**口头回答版**：
> 大仓库治理要从结构、工具、流程、监控四方面做。结构上按业务域分目录，配好 CODEOWNERS；工具上用 partial clone、sparse checkout、LFS、commit-graph、fsmonitor 这些；流程上控制分支寿命、PR 做影响分析；监控上用 git-sizer 看仓库健康，限制单次提交大小。还要有人定期治理，不能放任仓库一直膨胀。

---

### FB-20-SS-R-029：如何在团队中建立健康的代码审查文化？

**题型**：软技能题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、L04 沟通
**标签**：Git、Code Review、团队文化、沟通、软技能
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请从流程、工具、沟通、激励等角度，谈谈如何在团队中建立健康的代码审查文化。

**参考答案**：

健康的代码审查文化是把审查当作学习和质量保障，而不是挑错或审批。

1. **流程设计**
   - 明确审查清单：正确性、可读性、性能、安全、测试。
   - 限制 PR 大小，建议每次 PR 不超过 400 行变更。
   - 设定审查响应时间 SLA（如 4 小时内首次响应）。
   - 关键路径强制 2 人审查。

2. **工具支持**
   - 使用 GitHub / GitLab PR 功能。
   - 集成自动化检查，减少人工重复劳动。
   - 使用 Suggested Changes 直接提出修改建议。
   - 保留审查历史，便于复盘。

3. **沟通方式**
   - 评论针对代码，不针对人。
   - 提问用开放式，如“这里是否考虑过 XX 场景？”
   - 区分 blocking 和 non-blocking 意见。
   - 及时回复和感谢审查者。

4. **激励与学习**
   - 把高质量审查纳入绩效和晋升考察。
   - 定期组织审查复盘会，分享典型案例。
   - 鼓励新人参与审查，培养代码 Ownership。
   - 设立“本周最佳审查”等正向激励。

5. **文化建设**
   - 领导层以身作则参与审查。
   - 允许合理的“不完美”合并，避免过度审查。
   - 建立心理安全感，允许提出幼稚问题。

**评分维度**：
- 能从流程、工具、沟通、激励多角度回答（35%）
- 能给出具体的 SLA、PR 大小等可落地指标（25%）
- 能强调审查是学习和质量保障而非挑错（20%）
- 能提到心理安全感和领导示范作用（20%）

**常见错误**：
- 把审查当成找 bug 工具，忽略知识传递。
- 审查标准不统一，因人而异。
- PR 过大导致审查流于形式。
- 审查评论语气生硬，影响团队氛围。

**延伸追问**：
- 如何处理审查者和作者意见不一致？
- 新人不敢评论，如何引导？

**相关题目**：
- [FB-20-EN-A-014 Pull Request 审查流程](#FB-20-EN-A-014)
- [FB-20-EN-R-027 Git 工作流与自动化质量门禁](#FB-20-EN-R-027)

**参考资源**：
- [Google 工程实践 - 代码审查](https://google.github.io/eng-practices/review/)
- [SmartBear - Best Practices for Peer Code Review](https://www.smartbear.com/resources/ebooks/the-state-of-code-review/)

**口头回答版**：
> 健康的代码审查文化要把审查当学习和质量保障，而不是挑错。流程上 PR 要小、审查响应要快、关键路径要两人审；工具上让自动化做重复检查，人工专注业务逻辑；沟通上对代码不对人，区分必须改和建议改；激励上把好的审查纳入绩效，定期复盘分享。最重要的是领导带头，团队有心理安全感，不怕问问题。

---

### FB-20-EN-R-030：Git 灾难恢复和备份策略应该如何设计？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理
**标签**：Git、灾难恢复、备份、reflog、高可用
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一套 Git 仓库的灾难恢复和备份策略，覆盖远程仓库故障、误删分支、敏感信息泄露、历史被改写等场景。

**参考答案**：

1. **远程仓库备份**
   - 使用托管平台（GitHub/GitLab）本身的多副本和审计日志。
   - 关键仓库配置镜像仓库（mirror），同步到异地或不同平台。
   - 定期导出裸仓库备份：

```bash
git clone --mirror https://github.com/org/repo.git
tar czvf repo-backup-$(date +%Y%m%d).tar.gz repo.git
```

2. **误删分支恢复**
   - 本地 reflog 恢复最近操作。
   - 远程仓库事件日志（GitHub Events API、GitLab Audit Events）定位被删分支的 commit。
   - 恢复分支：

```bash
git fetch origin
# 从 reflog 或事件日志找到 commit
git checkout -b recovered-branch <commit-hash>
git push origin recovered-branch
```

3. **敏感信息泄露处理**
   - 立即轮换泄露的凭据。
   - 使用 `git filter-repo` 或 BFG 从历史中移除敏感文件。
   - 强制所有开发者重新 clone 仓库。
   - 通知安全团队，评估影响范围。

4. **历史被改写（force push）**
   - 分支保护禁止 force push 到 main / release。
   - 一旦发生，从其他开发者本地副本或备份恢复。
   - 使用 GitHub/GitLab 的 branch restore 功能。

5. **灾难恢复演练**
   - 定期进行恢复演练，验证备份可用性。
   - 文档化恢复流程，明确责任人和联系方式。
   - 监控仓库健康指标，及时发现异常。

**评分维度**：
- 能提出远程镜像和裸仓库备份方案（25%）
- 能说明误删分支和敏感信息泄露的恢复流程（30%）
- 能强调分支保护防止 force push（20%）
- 能提到演练和文档化（15%）
- 能指出轮换凭据比清理历史更优先（10%）

**常见错误**：
- 认为 Git 托管平台天然安全，不做额外备份。
- 敏感信息泄露后只清理历史，不轮换凭据。
- 恢复流程只存在于某人脑中，没有文档。

**延伸追问**：
- 如果 main 分支被 force push 清空，如何最快恢复？
- 备份频率和保留周期应该如何设定？

**相关题目**：
- [FB-20-SE-P-021 Git 安全签名与 secrets scanning](#FB-20-SE-P-021)
- [FB-20-CO-P-023 git reflog 恢复误操作](#FB-20-CO-P-023)

**参考资源**：
- [Pro Git - 数据恢复](https://git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-%E7%BB%B4%E6%8A%A4%E4%B8%8E%E6%95%B0%E6%8D%AE%E6%81%A2%E5%A4%8D)
- [git-filter-repo 文档](https://github.com/newren/git-filter-repo)

**口头回答版**：
> Git 灾难恢复要分层做：远程仓库用托管平台多副本，关键仓库做镜像备份；误删分支用 reflog 或平台事件日志恢复；敏感信息泄露要先轮换凭据，再用 filter-repo 清理历史，然后让大家重新 clone；主分支设置保护禁止 force push。还要定期演练恢复流程，不能只是嘴上说说。

---

### FB-20-CP-R-031：Git 工作流如何与合规审计要求结合？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、L08 技术治理
**标签**：Git、合规、审计、签名、日志、治理
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
在金融、医疗等强监管行业，Git 工作流需要满足合规审计要求。请说明如何从提交身份、变更历史、访问控制、审计日志等方面设计可审计的 Git 工作流。

**参考答案**：

1. **提交身份可验证**
   - 强制 GPG 或 SSH 签名提交。
   - 禁止未签名提交合并到主分支。
   - 用户邮箱必须与内部身份系统一致。

2. **变更历史不可篡改**
   - 主分支和发布分支设置保护，禁止 force push、禁止删除。
   - 所有变更通过 PR/MR 合并，保留审查记录。
   - 使用 squash merge 或 rebase merge 保持清晰历史。

3. **访问控制**
   - 基于团队和业务域的仓库权限控制。
   - CODEOWNERS 确保关键文件由指定人员审查。
   - 离职人员及时移除权限。

4. **审计日志**
   - 启用 GitHub/GitLab 审计日志（Audit Log）。
   - 保留 push、merge、权限变更、分支保护变更等事件。
   - 将审计日志同步到 SIEM 系统长期保存。

5. **变更可追溯**
   - PR 必须关联需求 ID、Issue、Jira Ticket。
   - 提交信息包含变更原因和影响范围。
   - 发布 tag 与审批记录关联。

6. **定期审计与合规检查**
   - 定期扫描未签名提交、未授权访问、过期分支。
   - 自动化合规报告生成。

示例服务端保护规则：

```yaml
# 禁止删除主分支和 force push
protected_branches:
  - main
  - release/*
allow_force_push: false
allow_deletion: false
require_signed_commits: true
```

**评分维度**：
- 能说明签名提交和身份一致性（25%）
- 能强调分支保护和不可篡改历史（25%）
- 能提到访问控制和审计日志（25%）
- 能说明变更可追溯和定期合规检查（15%）
- 能结合行业场景举例（10%）

**常见错误**：
- 只关注代码规范，忽略审计日志保留。
- 允许管理员绕过分支保护。
- 提交信息中没有业务上下文，无法追溯。

**延伸追问**：
- 如果审计要求保留 7 年历史，Git 仓库如何长期归档？
- 如何防止内部人员通过修改本地历史绕过审计？

**相关题目**：
- [FB-20-SE-P-021 Git 安全签名与 secrets scanning](#FB-20-SE-P-021)
- [FB-20-EN-R-030 Git 灾难恢复与备份策略](#FB-20-EN-R-030)

**参考资源**：
- [GitHub - Audit log](https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization)
- [GitLab - Audit events](https://docs.gitlab.com/ee/administration/audit_events.html)
- [SOC 2 合规与版本控制](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-governance-and-management/soc-2)

**口头回答版**：
> 强监管行业 Git 合规主要做几件事：提交必须 GPG 或 SSH 签名，用户身份要统一；主分支禁止 force push 和删除，所有改动走 PR 保留审查记录；权限按团队和目录控制，关键文件配 CODEOWNERS；平台审计日志要长期保留；PR 和需求单号关联，提交信息写清楚变更原因。定期做合规扫描和报告。

## 基础题（8 道）{#basic-2}

### FB-20-CO-B-032：git log 有哪些常用参数？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、log、commit、log、log
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请列举 `git log` 的常用参数，并说明它们分别用于什么场景。

**参考答案**：

`git log` 用于查看提交历史，常见参数：

```bash
# 一行显示每个提交
git log --oneline

# 图形化显示分支历史
git log --graph --oneline --all

# 显示文件改动统计
git log --stat

# 显示具体 patch
git log -p

# 按作者过滤
git log --author="zhangsan"

# 按时间范围过滤
git log --since="1 week ago"

# 限制显示条数
git log -n 5

# 只查看某个文件的提交历史
git log -- src/app.js
```

**评分维度**：
- 能列举 4 个以上常用参数（50%）
- 能说明每个参数的典型使用场景（30%）
- 能提到 `--graph` 对理解分支合并历史的帮助（20%）

**常见错误**：
- 只会 `git log` 不加参数，面对长历史时效率低。
- 混淆 `--stat` 与 `-p` 的输出差异。
- 忘记 `--author` 等过滤参数。

**延伸追问**：
- 如何查看某个文件的每一行最后由谁修改？
- `git log --grep` 和 `git log -S` 有什么区别？

**相关题目**：
- [FB-20-CO-A-016 git blame 与变更追踪](#FB-20-CO-A-016)
- [FB-20-CO-A-045 git reflog 与 git log 的区别](#FB-20-CO-A-045)

**参考资源**：
- [Git 官方文档 - git-log](https://git-scm.com/docs/git-log)
- [Pro Git - 查看提交历史](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2)

**口头回答版**：
> `git log` 常用参数有 `--oneline` 一行显示，`--graph` 图形化分支历史，`--stat` 看改动统计，`-p` 看具体 patch，`--author` 按作者过滤，`--since` 按时间过滤，`-n` 限制条数。日常排查问题用 `--oneline --graph --all` 最直观。

---

### FB-20-CO-B-033：Git 中轻量标签和附注标签有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、commit、branch、fa-bu、git
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 Git 中轻量标签（lightweight tag）和附注标签（annotated tag）的区别，并给出创建命令。

**参考答案**：

| 维度 | 轻量标签 | 附注标签 |
|------|---------|---------|
| 本质 | 指向 commit 的引用 | 独立的 Git 对象，含标签信息 |
| 包含信息 | 仅指向某个 commit | 含打标者、邮箱、日期、附注 |
| 是否可签名 | 不可 GPG 签名 | 可 GPG 签名 |
| 适用场景 | 临时本地标记 | 正式发布版本 |

```bash
# 轻量标签
git tag v0.1.0

# 附注标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 签名标签
git tag -s v1.0.0 -m "Signed release"

# 推送标签到远程
git push origin v1.0.0

# 推送所有标签
git push origin --tags
```

**评分维度**：
- 能说明两种标签的本质差异（40%）
- 能给出创建命令（30%）
- 能指出附注标签可签名、适合发布（30%）

**常见错误**：
- 在发布版本时只打轻量标签，缺少审计信息。
- 打了标签后忘记 `git push --tags`。
- 认为标签和分支一样会移动。

**延伸追问**：
- 如何删除本地和远程的标签？
- 标签推送到远程后还能修改吗？

**相关题目**：
- [FB-20-CO-B-002 分支的创建与切换](#FB-20-CO-B-002)
- [FB-20-EN-A-010 Conventional Commits 规范](#FB-20-EN-A-010)

**参考资源**：
- [Pro Git - 标签](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%A0%87%E7%AD%BE)
- [Git 官方文档 - git-tag](https://git-scm.com/docs/git-tag)

**口头回答版**：
> 轻量标签就是一个指向 commit 的引用，没有额外信息；附注标签是一个独立对象，包含打标人、日期、说明，还可以 GPG 签名。发布版本一般用附注标签。创建用 `git tag -a v1.0.0 -m "说明"`，推送到远程要 `git push origin --tags`。

---

### FB-20-CO-B-034：git remote 和 git clone 分别是做什么的？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、git、commit、branch、git
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `git remote` 和 `git clone` 的作用，并写出常用命令。

**参考答案**：

`git clone` 用于从远程仓库复制一份完整项目到本地，默认会创建 origin 远程别名并检出默认分支。

```bash
# 克隆仓库
git clone https://github.com/example/project.git

# 克隆指定分支
git clone -b develop https://github.com/example/project.git

# 克隆到指定目录
git clone https://github.com/example/project.git my-project
```

`git remote` 用于管理本地仓库关联的远程仓库。

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add upstream https://github.com/original/project.git

# 修改远程 URL
git remote set-url origin https://github.com/example/project.git

# 删除远程仓库
git remote remove upstream

# 获取远程分支信息
git remote show origin
```

**评分维度**：
- 能说明 clone 是复制远程仓库到本地（40%）
- 能说明 remote 是管理远程别名和 URL（40%）
- 能写出常用命令示例（20%）

**常见错误**：
- 混淆 `git remote` 与 `git clone` 的作用。
- 修改远程 URL 时直接编辑 `.git/config` 而不使用命令。
- 忘记 `git remote -v` 查看当前远程地址。

**延伸追问**：
- `git clone --depth 1` 有什么作用？
- 如何给同一个本地仓库配置多个远程？

**相关题目**：
- [FB-20-CO-B-036 git fetch 与 git pull 的区别](#FB-20-CO-B-036)
- [FB-20-CO-P-019 Git LFS 大文件管理](#FB-20-CO-P-019)

**参考资源**：
- [Pro Git - 远程仓库的使用](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8)
- [Git 官方文档 - git-remote](https://git-scm.com/docs/git-remote)

**口头回答版**：
> `git clone` 是把远程仓库复制到本地，会创建一个 origin 别名。`git remote` 是管理这些远程别名，比如 `git remote -v` 查看地址，`git remote add` 添加，`git remote set-url` 修改地址。常用的是配置 origin 和 upstream。

---

### FB-20-CO-B-035：git diff 有哪些常见用法？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、commit、chong-tu、git、git
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `git diff` 的常见用法，包括比较工作区、暂存区和不同 commit 之间的差异。

**参考答案**：

`git diff` 用于显示不同区域或不同 commit 之间的差异。

```bash
# 工作区 vs 暂存区
git diff

# 暂存区 vs HEAD
git diff --cached
# 或
git diff --staged

# 工作区 vs HEAD
git diff HEAD

# 两个 commit 之间的差异
git diff abc1234 def5678

# 查看某个文件的差异
git diff src/app.js

# 查看分支差异
git diff main feature/login
```

对比关系：

| 命令 | 对比双方 |
|------|---------|
| `git diff` | 工作区 ↔ 暂存区 |
| `git diff --cached` | 暂存区 ↔ HEAD |
| `git diff HEAD` | 工作区 ↔ HEAD |

**评分维度**：
- 能区分工作区、暂存区、HEAD 之间的 diff（50%）
- 能写出比较两个 commit 或分支的命令（30%）
- 能说明 `--cached` 与 `--staged` 等价（20%）

**常见错误**：
- `git diff` 看不到已经 `git add` 的内容。
- 混淆 `--cached` 和 `HEAD` 的差异方向。
- 在需要看已暂存差异时忘记加参数。

**延伸追问**：
- `git diff --stat` 输出什么？
- 如何只查看某个文件的差异？

**相关题目**：
- [FB-20-CO-B-001 工作区、暂存区、本地仓库](#FB-20-CO-B-001)
- [FB-20-CO-B-037 git status 中文件状态](#FB-20-CO-B-037)

**参考资源**：
- [Git 官方文档 - git-diff](https://git-scm.com/docs/git-diff)
- [Pro Git - 查看已暂存和未暂存的修改](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2)

**口头回答版**：
> `git diff` 默认比较工作区和暂存区；加 `--cached` 或 `--staged` 比较暂存区和 HEAD；加 `HEAD` 比较工作区和 HEAD。也可以比较两个 commit 或两个分支。看单个文件就在后面跟文件名。

---

### FB-20-CO-B-036：git fetch 和 git pull 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、branch、merge、commit、git
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请对比 `git fetch` 和 `git pull` 的区别，并说明各自的适用场景。

**参考答案**：

| 维度 | git fetch | git pull |
|------|-----------|----------|
| 操作 | 下载远程分支最新状态到本地远程跟踪分支 | fetch + merge/rebase |
| 是否修改当前分支 | 否 | 是 |
| 安全性 | 高，可先查看再决定合并 | 可能直接产生冲突 |
| 等价命令 | `git fetch origin` | `git fetch + git merge` |

```bash
# 仅下载远程更新
git fetch origin

# 查看远程 main 分支状态
git log HEAD..origin/main --oneline

# 拉取并合并
git pull origin main

# 拉取并使用 rebase 方式合并
git pull --rebase origin main
```

最佳实践：
- 想先了解远程改动再合并：用 `git fetch`。
- 确认无冲突或希望直接同步：用 `git pull`。
- 本地有未 push 提交时，推荐 `git pull --rebase` 保持线性历史。

**评分维度**：
- 能说明 fetch 只下载不合并、pull 会合并（50%）
- 能指出 `git pull` 等价于 fetch + merge（30%）
- 能给出适用场景建议（20%）

**常见错误**：
- 认为 `git fetch` 会自动更新本地分支。
- 本地有未提交改动时直接 `git pull` 导致冲突。
- 不知道 `git pull --rebase` 的存在。

**延伸追问**：
- `git pull --rebase` 和 `git pull` 在历史形状上有什么区别？
- `git fetch --prune` 是做什么的？

**相关题目**：
- [FB-20-CO-B-003 merge 与 rebase 的区别](#FB-20-CO-B-003)
- [FB-20-CO-B-034 git remote 和 git clone](#FB-20-CO-B-034)

**参考资源**：
- [Pro Git - 从远程仓库中抓取与拉取](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E4%BB%8E%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E4%B8%AD%E6%8A%93%E5%8F%96%E4%B8%8E%E6%8B%89%E5%8F%96)
- [Git 官方文档 - git-pull](https://git-scm.com/docs/git-pull)

**口头回答版**：
> `git fetch` 只是把远程仓库的更新下载到本地的远程跟踪分支，不会改当前分支；`git pull` 是 fetch 再加 merge，会改当前分支。想先看清楚再合并就用 fetch，确定要同步就用 pull。本地有提交时用 `git pull --rebase` 历史更干净。

---

### FB-20-CO-B-037：git status 输出中的文件状态有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、commit、git、commit、git
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `git status` 输出中常见的文件状态，如 untracked、modified、staged 等。

**参考答案**：

`git status` 用于查看工作区和暂存区的当前状态，常见输出：

```bash
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/app.js

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   src/utils.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        docs/new-guide.md
```

状态说明：

| 状态 | 含义 |
|------|------|
| Untracked | 新文件，未被 Git 追踪 |
| Modified | 文件已修改，但未暂存 |
| Staged | 文件已暂存，等待提交 |
| Renamed | 文件被重命名并已暂存 |
| Deleted | 文件被删除 |

**评分维度**：
- 能说明 untracked / modified / staged 三种核心状态（60%）
- 能结合 `git status` 输出解释含义（25%）
- 能提到 renamed / deleted 状态（15%）

**常见错误**：
- 认为 `git status` 显示的是远程仓库状态。
- 混淆 modified 和 staged 的区别。
- 新文件未 add 就直接 commit，导致遗漏。

**延伸追问**：
- `git status --short` 输出什么？
- 如何快速将 modified 文件恢复到 HEAD 状态？

**相关题目**：
- [FB-20-CO-B-001 工作区、暂存区、本地仓库](#FB-20-CO-B-001)
- [FB-20-CO-B-035 git diff 常见用法](#FB-20-CO-B-035)

**参考资源**：
- [Git 官方文档 - git-status](https://git-scm.com/docs/git-status)
- [Pro Git - 检查当前文件状态](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%A3%80%E6%9F%A5%E5%BD%93%E5%89%8D%E6%96%87%E4%BB%B6%E7%8A%B6%E6%80%81)

**口头回答版**：
> `git status` 看工作区和暂存区状态。常见状态有：untracked 是新增还没被追踪的文件；modified 是改过了但还没 add；staged 是已经 add 等待 commit。还有 renamed、deleted 这些。`git status --short` 可以一行显示更简洁。

---

### FB-20-CO-B-038：git config 的作用域有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、commit、zhi-li、git、git
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `git config` 的三个作用域及其优先级，并给出常用配置示例。

**参考答案**：

Git 配置有三个作用域，优先级从低到高：

| 作用域 | 配置文件位置 | 命令参数 |
|--------|-------------|---------|
| 系统级 | `/etc/gitconfig` | `--system` |
| 全局级 | `~/.gitconfig` 或 `~/.config/git/config` | `--global` |
| 仓库级 | `.git/config` | `--local` |

```bash
# 设置全局用户名和邮箱
git config --global user.name "张三"
git config --global user.email "zhangsan@example.com"

# 设置当前仓库用户名
git config --local user.email "zhangsan@project.com"

# 设置默认编辑器
git config --global core.editor "vim"

# 查看配置
git config --list

# 查看某一项配置来源
git config --show-origin user.email
```

优先级：仓库级 > 全局级 > 系统级。

**评分维度**：
- 能说出三个作用域及配置文件位置（50%）
- 能说明优先级顺序（25%）
- 能给出常用配置命令（25%）

**常见错误**：
- 在公司仓库用个人邮箱提交，导致提交信息混乱。
- 使用 `--global` 配置后惊讶于所有仓库都生效。
- 多人共用机器时覆盖他人全局配置。

**延伸追问**：
- 如何为某个目录下的所有仓库统一配置？
- `git config --global init.defaultBranch main` 有什么作用？

**相关题目**：
- [FB-20-CO-B-001 工作区、暂存区、本地仓库](#FB-20-CO-B-001)
- [FB-20-SE-P-021 Git 安全签名与 secrets scanning](#FB-20-SE-P-021)

**参考资源**：
- [Pro Git - 初次运行 Git 前的配置](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)
- [Git 官方文档 - git-config](https://git-scm.com/docs/git-config)

**口头回答版**：
> `git config` 有三个作用域：系统级、全局级、仓库级。仓库级优先级最高，全局次之，系统最低。常用 `git config --global user.name` 和 `user.email`。公司项目可以用 `--local` 单独配工作邮箱。

---

### FB-20-CO-B-039：什么是 detached HEAD？如何进入和退出？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、branch、commit、branch、git
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `detached HEAD` 状态是什么，如何进入该状态，以及如何安全退出。

**参考答案**：

`detached HEAD` 指 HEAD 直接指向某个 commit，而不是指向某个分支。此时在该状态下的提交不会更新任何分支，切换分支后可能丢失。

进入方式：

```bash
# 检出某个具体 commit
git checkout abc1234

# 检出某个 tag
git checkout v1.0.0
```

退出方式：

```bash
# 方式一：创建新分支保留提交
git switch -c new-branch

# 方式二：切回已有分支（放弃 detached HEAD 上的提交）
git switch main

# 方式三：使用 git checkout 的旧语法
git checkout -b new-branch
```

注意事项：
- detached HEAD 适合做临时查看、实验性修改。
- 如果做了提交想保留，一定要新建分支。

**评分维度**：
- 能说明 detached HEAD 是 HEAD 直接指向 commit（40%）
- 能说明如何进入和退出（30%）
- 能强调提交需要新建分支才能保留（30%）

**常见错误**：
- 在 detached HEAD 状态下做了一系列提交后直接切分支，导致提交丢失。
- 认为 detached HEAD 是错误状态。
- 不会用 `git switch -c` 创建分支保留工作。

**延伸追问**：
- detached HEAD 下的提交如何找回？
- `git checkout tag` 和 `git checkout branch` 有什么区别？

**相关题目**：
- [FB-20-CO-B-002 分支的创建与切换](#FB-20-CO-B-002)
- [FB-20-CO-P-023 git reflog 恢复误操作](#FB-20-CO-P-023)

**参考资源**：
- [Pro Git - HEAD 分离](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)
- [Git 官方文档 - git-checkout](https://git-scm.com/docs/git-checkout)

**口头回答版**：
> detached HEAD 就是 HEAD 不指向任何分支，而是直接指向某个 commit。比如 `git checkout abc1234` 或切到某个 tag 就会进入。这个状态下做的提交不会属于任何分支，想保留就要 `git switch -c` 新建分支，不然切走后可能找不到。

---

## 进阶题（9 道）{#advanced-2}

### FB-20-CO-A-040：fast-forward merge 和 --no-ff 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、merge、branch、commit、log
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `fast-forward merge` 与 `git merge --no-ff` 的区别，并说明在什么场景下应该禁用 fast-forward。

**参考答案**：

**fast-forward merge**：
- 当前分支没有新的提交，目标分支直接在当前分支之后。
- Git 直接将当前分支指针移动到目标分支最新 commit，不产生新的 merge commit。
- 历史呈线性。

**--no-ff merge**：
- 即使可以 fast-forward，也强制生成一个新的 merge commit。
- 保留功能分支存在过的痕迹。
- 历史呈分叉再合并状。

```bash
# 默认，如果可以则 fast-forward
git merge feature/login

# 强制生成 merge commit
git merge --no-ff feature/login

# 禁用 fast-forward 的默认行为
git config --global merge.ff false
```

选型建议：
- 功能分支合并到主分支：建议 `--no-ff`，保留上下文。
- 个人本地临时同步：fast-forward 更简洁。

**评分维度**：
- 能说明 fast-forward 不生成 merge commit（40%）
- 能说明 `--no-ff` 保留功能分支上下文（30%）
- 能给出主分支用 `--no-ff` 的建议（30%）

**常见错误**：
- 认为 `--no-ff` 总是比 fast-forward 好。
- 在需要线性历史的分支上滥用 `--no-ff`。
- 不理解 merge commit 的审计价值。

**延伸追问**：
- 如何只使用 fast-forward 合并？
- squash merge 和 `--no-ff` 有什么区别？

**相关题目**：
- [FB-20-CO-B-003 merge 与 rebase 的区别](#FB-20-CO-B-003)
- [FB-20-CP-P-024 rebase 与 merge 的团队协作策略](#FB-20-CP-P-024)

**参考资源**：
- [Pro Git - 分支的新建与合并](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)
- [Git 官方文档 - git-merge](https://git-scm.com/docs/git-merge)

**口头回答版**：
> fast-forward 合并就是当前分支没新提交，直接把指针移到目标分支最新 commit，不产生 merge commit；`--no-ff` 是强制生成 merge commit，保留功能分支的上下文。主分支合功能分支建议用 `--no-ff`，这样能看到这个功能是从哪个分支合进来的。

---

### FB-20-SC-A-041：代码审查中发现敏感信息已提交到仓库，如何处理？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、min-gan-xin-xi、an-quan、commit、log
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
在代码审查时，你发现某个 PR 中不小心提交了密码、API Key 或私钥等敏感信息。请描述完整的应急处理流程。

**参考答案**：

处理流程：

1. **立即阻断合并**
   - 如果 PR 还未合并，要求作者关闭或强制推送清理后的分支。
   - 如果已合并，需要进一步清理历史。

2. **轮换凭证**
   - 无论是否已清理 Git 历史，被泄露的密钥必须立即失效并重新生成。
   - 通知相关服务 owner 检查日志。

3. **清理提交历史**
   - 未 push：用 `git reset` 或 `git rebase -i` 移除敏感提交。
   - 已 push 但范围可控：使用 `git filter-repo` 或 `BFG Repo-Cleaner` 重写历史。
   - 强制推送清理后的分支（仅限个人/功能分支）。

4. **公共分支处理**
   - 主分支禁止 force push。
   - 使用 `git revert` 先撤销改动，再按平台流程申请历史清理。

5. **预防复发**
   - 引入 pre-commit 钩子扫描 secrets。
   - CI 中集成 `gitleaks`、`truffleHog` 等工具。
   - 将敏感配置移出仓库，使用环境变量或密钥管理系统。

**评分维度**：
- 能强调先轮换凭证再清理历史（30%）
- 能给出不同阶段的清理方案（35%）
- 能提到公共分支禁止 force push 和 revert 策略（20%）
- 能提出预防措施（15%）

**常见错误**：
- 只删除文件就认为安全，忽略历史仍可查看。
- 在公共分支上 force push 清理历史。
- 忘记轮换已泄露的密钥。

**延伸追问**：
- `git filter-repo` 和 `git rebase -i` 各适用于什么场景？
- 如果敏感信息已经发布到 GitHub 公开仓库，还需要做什么？

**相关题目**：
- [FB-20-SE-P-021 Git 安全签名与 secrets scanning](#FB-20-SE-P-021)
- [FB-20-SE-P-056 密钥泄露后的应急处理](#FB-20-SE-P-056)

**参考资源**：
- [GitHub - 从仓库中删除敏感数据](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

**口头回答版**：
> 发现敏感信息提交后，第一步是立刻让 PR 别合并，如果已经合并了要停掉。最关键的是先轮换泄露的密钥，不能指望清理 Git 历史。然后看情况用 `git reset`、rebase 或 `git filter-repo` 清理历史。公共分支不能 force push，先用 revert 撤销，再走平台流程申请清理。最后加 pre-commit 和 CI 扫描防止再发生。

---

### FB-20-EN-A-042：git worktree 有什么用？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、branch、git、commit、git
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `git worktree` 的作用，并给出典型使用场景和常用命令。

**参考答案**：

`git worktree` 允许一个仓库拥有多个独立的工作目录，每个工作目录可以检出不同的分支，互不干扰。

```bash
# 为 bugfix 分支创建新工作目录
git worktree add ../project-bugfix bugfix/login

# 创建新分支并建立工作目录
git worktree add -b feature/pay ../project-feature main

# 查看所有工作目录
git worktree list

# 删除工作目录
git worktree remove ../project-bugfix

# 清理无效工作目录
git worktree prune
```

典型场景：
- 同时处理多个分支，避免频繁 `git stash` 和 `git switch`。
- 在独立目录跑不同分支的 CI 或测试。
- 大型项目避免重复 clone 多个仓库。

注意事项：
- 同一个分支不能在多个 worktree 中同时检出。
- 主 worktree 删除后，附加 worktree 仍可独立使用。

**评分维度**：
- 能说明 worktree 是多工作目录机制（40%）
- 能写出 add / list / remove 命令（30%）
- 能给出多分支并行开发的场景（30%）

**常见错误**：
- 用多次 clone 代替 worktree，浪费磁盘空间。
- 试图在多个 worktree 中检出同一分支。
- 删除 worktree 目录后忘记 `git worktree prune`。

**延伸追问**：
- worktree 和 clone 多个仓库有什么区别？
- 如何在 CI 中使用 worktree 提高效率？

**相关题目**：
- [FB-20-CO-B-004 git stash 常见用法](#FB-20-CO-B-004)
- [FB-20-PE-P-050 大仓库 clone 加速策略](#FB-20-PE-P-050)

**参考资源**：
- [Pro Git - git worktree](https://git-scm.com/book/zh/v2/Git-Tools-Multiple-Worktrees)
- [Git 官方文档 - git-worktree](https://git-scm.com/docs/git-worktree)

**口头回答版**：
> `git worktree` 就是给一个仓库创建多个工作目录，每个目录可以 checkout 不同分支。比如同时修 bug 和开发新功能，就不用来回 stash 和 switch 了。命令是 `git worktree add ../目录名 分支名`，用 `list` 查看，`remove` 删除。注意同一个分支不能在多个 worktree 里同时检出。

---

### FB-20-CO-A-043：git rebase --onto 的使用场景是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、rebase、branch、commit、log
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `git rebase --onto` 的用途，并给出一个具体示例。

**参考答案**：

`git rebase --onto` 用于将某一段 commit 从一个基分支移植到另一个基分支，常用于分支基线变更。

语法：

```bash
git rebase --onto <new-base> <old-base> <branch>
```

示例场景：
- 你基于 `feature/A` 开发了 `feature/B`。
- 现在 `feature/A` 被废弃，`feature/B` 需要直接基于 `main`。

```bash
# 将 feature/B 上不在 feature/A 中的提交移植到 main
git rebase --onto main feature/A feature/B
```

等价于：取出 `feature/A..feature/B` 的 commit，在 `main` 上重新应用。

另一个场景：删除中间某个 commit 范围。

```bash
# 将当前分支从 commit C 之后的提交移植到 A，相当于移除 B..C
git rebase --onto A B C
```

**评分维度**：
- 能说明 `--onto` 用于 transplant 一段 commit（40%）
- 能写出正确语法 `git rebase --onto new old branch`（30%）
- 能给出基线变更或删除中间 commit 的示例（30%）

**常见错误**：
- 参数顺序记错，导致 rebase 到错误基线。
- 在已 push 的分支上使用 `--onto`。
- 不理解 `old-base` 是排他边界。

**延伸追问**：
- `git rebase --onto` 和 cherry-pick 多个 commit 有什么异同？
- 使用 `--onto` 后如何验证移植结果？

**相关题目**：
- [FB-20-CO-A-013 git rebase 交互式用法](#FB-20-CO-A-013)
- [FB-20-CO-B-005 git cherry-pick 是什么](#FB-20-CO-B-005)

**参考资源**：
- [Git 官方文档 - git-rebase](https://git-scm.com/docs/git-rebase#_onto)
- [Pro Git - 变基](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)

**口头回答版**：
> `git rebase --onto` 用来把一段 commit 从一个基线移到另一个基线。语法是 `git rebase --onto 新基线 旧基线 分支`。比如你基于 feature/A 做了 feature/B，后来 feature/A 不要了，想直接把 feature/B 接到 main 上，就可以用这个命令。

---

### FB-20-SC-A-044：线上发现缺陷，如何回滚已合并到 main 的提交？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、revert、commit、branch、fa-bu
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
某次发布后发现 main 分支上的一次合并引入了线上缺陷，需要尽快回滚。请描述完整流程并说明注意事项。

**参考答案**：

处理流程：

1. **确认问题提交**
   - 通过监控、日志或 `git bisect` 定位引入缺陷的 commit 或 merge commit。

2. **选择回滚策略**
   - 公共分支 main 禁止 force push，优先使用 `git revert`。
   - 如果是 merge commit，需要指定父分支 `-m 1`。

3. **执行 revert**

```bash
# 回滚普通 commit
git revert abc1234

# 回滚 merge commit，指定主分支为父分支
git revert -m 1 def5678
```

4. **验证并发布**
   - 在 staging 环境验证回滚后的版本。
   - 走发布流程重新部署。

5. **修复后重新合并**
   - 在功能分支修复缺陷。
   - 由于原 merge commit 已被 revert，重新合并时可能需要先 revert 之前的 revert：

```bash
# 先撤销之前的 revert，再合并修复后的分支
git revert <revert-commit-hash>
git merge feature/fix-bug
```

**评分维度**：
- 能指出公共分支用 revert 而非 reset（30%）
- 能说明 merge commit revert 需要 `-m 1`（25%）
- 能描述验证和发布流程（25%）
- 能说明修复后重新合并的处理（20%）

**常见错误**：
- 在 main 分支 force push 回滚。
- revert merge commit 时不指定 `-m` 导致失败。
- 回滚后没有验证就上线。

**延伸追问**：
- 如果 revert 后需要重新合入修复，为什么通常要先 revert the revert？
- 如何快速定位是哪次 commit 引入的缺陷？

**相关题目**：
- [FB-20-CO-B-007 git revert 与 git reset 区别](#FB-20-CO-B-007)
- [FB-20-CO-A-015 git bisect 二分查找回归](#FB-20-CO-A-015)

**参考资源**：
- [Git 官方文档 - git-revert](https://git-scm.com/docs/git-revert)
- [Pro Git - 撤销操作](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)

**口头回答版**：
> main 分支的回滚不能用 force push，要用 `git revert`。普通 commit 直接 revert；merge commit 要加 `-m 1` 指定主分支。回滚后在 staging 验证，再重新发布。修好之后，因为原来的 merge 被 revert 了，通常要先 revert 那个 revert，再合入修复分支。

---

### FB-20-CO-A-045：git reflog 和 git log 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、reflog、log、commit、hui-fu
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 `git reflog` 和 `git log` 的记录对象、使用场景和有效期。

**参考答案**：

| 维度 | git log | git reflog |
|------|---------|------------|
| 记录对象 | commit 历史 | HEAD 和分支引用的变动记录 |
| 是否包含已删除提交 | 否 | 是 |
| 是否本地特有 | 否（可 push） | 是（仅本地） |
| 默认有效期 | 永久 | 默认 90 天 |
| 典型用途 | 查看项目历史 | 恢复误操作 |

```bash
# 查看 HEAD 引用日志
git reflog

# 查看某个分支的引用日志
git reflog show main

# 恢复到某个历史状态
git reset --hard HEAD@{5}
```

使用场景：
- `git log`：查看项目演进、生成 CHANGELOG。
- `git reflog`：`git reset --hard`、删除分支、rebase 后恢复。

**评分维度**：
- 能说明 log 记录 commit、reflog 记录引用变动（40%）
- 能指出 reflog 是本地记录且有过期时间（30%）
- 能给出恢复误操作的示例（30%）

**常见错误**：
- 误删分支后没有立即用 reflog 恢复，导致过期。
- 认为 reflog 会同步到远程。
- 用 `git log` 找不到被 reset 的提交就认为彻底丢失。

**延伸追问**：
- reflog 过期后还能恢复误删的提交吗？
- 如何配置 reflog 的过期时间？

**相关题目**：
- [FB-20-CO-B-032 git log 常用参数](#FB-20-CO-B-032)
- [FB-20-CO-P-023 git reflog 恢复误操作](#FB-20-CO-P-023)

**参考资源**：
- [Git 官方文档 - git-reflog](https://git-scm.com/docs/git-reflog)
- [Pro Git - 数据恢复](https://git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-%E7%BB%B4%E6%8A%A4%E4%B8%8E%E6%95%B0%E6%8D%AE%E6%81%A2%E5%A4%8D)

**口头回答版**：
> `git log` 看 commit 历史，`git reflog` 看 HEAD 和分支引用的变动记录。reflog 是本地的，默认保存 90 天，能找回被 reset、被删分支的提交。误操作后先用 `git reflog` 找到那个 commit hash，再用 `git reset --hard` 或新建分支恢复。

---

### FB-20-EN-A-046：Monorepo 中如何锁定依赖变更与源码变更的一致性？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、monorepo、commit、changesets、monorepo
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在 Monorepo 中，一个包的依赖升级可能影响多个包。请说明如何通过 Git 工作流保证 lock 文件与源码变更一致。

**参考答案**：

核心做法：

1. **lock 文件必须提交**
   - `pnpm-lock.yaml`、`package-lock.json`、`yarn.lock` 必须纳入版本控制。
   - CI 安装依赖时严格使用 lock 文件，确保构建可复现。

2. **依赖变更单独 review**
   - 升级依赖的 PR 应包含 lock 文件 diff。
   - 使用 `pnpm --filter` 限定影响范围，避免全局 lock 抖动。

3. **原子提交原则**
   - 同一功能涉及的源码改动、依赖升级、lock 文件更新应放在同一 commit 或同一 PR。
   - 避免源码改了但 lock 没更新，导致 CI 和他人本地不一致。

4. **CI 校验**
   - 在 CI 中运行 `pnpm install --frozen-lockfile`。
   - 检查 lock 文件是否有未提交变更。

```bash
# 示例：升级某个包的依赖
pnpm --filter @scope/pkg add lodash@latest

# 提交时包含源码和 lock 文件
git add packages/pkg-a/ pnpm-lock.yaml
git commit -m "chore(pkg-a): bump lodash to latest"
```

**评分维度**：
- 能强调 lock 文件必须提交并用于 CI（30%）
- 能说明依赖变更应单独可见、可 review（25%）
- 能提到原子提交原则（25%）
- 能给出 CI 校验方法（20%）

**常见错误**：
- lock 文件未提交，导致不同环境依赖版本不一致。
- 依赖升级 PR 只改 package.json 不改 lock 文件。
- 多人同时改依赖导致 lock 冲突，手动合并出错。

**延伸追问**：
- lock 文件冲突时应该如何解决？
- 如何处理依赖升级导致的 transitive dependency 变化？

**相关题目**：
- [FB-20-EN-P-017 Monorepo 变更管理 Changesets](#FB-20-EN-P-017)
- [FB-20-SD-R-026 Monorepo vs Polyrepo 选型](#FB-20-SD-R-026)

**参考资源**：
- [pnpm - workspace](https://pnpm.io/workspaces)
- [npm - package-lock.json](https://docs.npmjs.com/cli/configuring-npm/package-lock-json)

**口头回答版**：
> Monorepo 里 lock 文件一定要提交，CI 用 `--frozen-lockfile` 安装保证一致。依赖升级要单独 review，lock diff 也要看。源码改动、依赖升级、lock 更新最好放同一个 PR。这样能避免别人拉代码后依赖和你不一样，也能防止 lock 冲突。

---

### FB-20-CO-A-047：git commit --amend 有什么用？需要注意什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、commit、log、conventional-commits、zhi-li
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `git commit --amend` 的作用，并说明使用时的注意事项。

**参考答案**：

`git commit --amend` 用于修改最近一次提交，可以修改提交信息、追加/移除文件，或者同时修改两者。

```bash
# 修改最近一次提交信息
git commit --amend -m "feat(auth): add OAuth2 login"

# 追加漏提的文件到最近一次提交
git add forgotten.js
git commit --amend --no-edit

# 修改提交信息同时追加文件
git add forgotten.js
git commit --amend
```

注意事项：
- `commit --amend` 会改变最近一次 commit 的 hash。
- 已经 push 到远程的提交不要 amend，会改写公共历史。
- 仅适用于本地未 push 的提交修正。

**评分维度**：
- 能说明 amend 用于修改最近一次提交（40%）
- 能给出修改信息、追加文件的命令（30%）
- 能强调已 push 的提交不能 amend（30%）

**常见错误**：
- 在团队协作分支上 amend 已 push 的提交。
- 忘记 `--no-edit` 导致每次都要重新输入提交信息。
- 认为 amend 会保留原 commit hash。

**延伸追问**：
- 如果已经 push 了才发现提交信息写错，应该怎么处理？
- 如何修改更早的提交信息？

**相关题目**：
- [FB-20-CO-A-013 git rebase 交互式用法](#FB-20-CO-A-013)
- [FB-20-EN-A-010 Conventional Commits 规范](#FB-20-EN-A-010)

**参考资源**：
- [Git 官方文档 - git-commit](https://git-scm.com/docs/git-commit#_amend)
- [Pro Git - 撤销操作](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)

**口头回答版**：
> `git commit --amend` 用来改最近一次提交。可以改提交信息，也可以追加漏掉的文件。比如漏了一个文件，先 `git add`，再 `git commit --amend --no-edit`。注意这会改变 commit hash，已经 push 的提交千万别 amend。

---

### FB-20-SC-A-048：多人协作时，如何优雅地处理 rebase 后的冲突？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、rebase、chong-tu、branch、zhi-li
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
在团队协作中，你对功能分支执行 `git rebase main` 后遇到多次冲突。请描述你的处理流程和与团队的沟通方式。

**参考答案**：

处理流程：

1. **理解 rebase 冲突特点**
   - rebase 是逐个 commit 应用，同一冲突可能在多个 commit 中重复出现。

2. **逐 commit 解决**

```bash
# 解决当前冲突
git status
git add .
git rebase --continue

# 如果当前 commit 无法继续，可跳过
git rebase --skip

# 放弃 rebase
git rebase --abort
```

3. **利用 rerere 减少重复冲突**
   - 启用 `git config --global rerere.enabled true`。
   - Git 会记录冲突解决方式，下次自动应用。

4. **团队沟通**
   - rebase 前在团队频道同步，避免他人在同一分支工作。
   - 只 rebase 个人功能分支，公共分支禁止 rebase。
   - rebase 完成后如果已 push 过，需要 `git push --force-with-lease`。

5. **验证**
   - rebase 完成后运行测试，确保每次 commit 都是可编译、可测试状态。

**评分维度**：
- 能描述逐 commit 解决冲突的流程（30%）
- 能提到 `--abort` 和 `--continue` 的使用（20%）
- 能说明 rerere 减少重复冲突（20%）
- 能强调公共分支不 rebase 和 force-with-lease（30%）

**常见错误**：
- 冲突解决时只保留自己代码。
- rebase 失败后直接用 `git push -f` 强制推送。
- 在公共分支上 rebase，导致他人工作混乱。

**延伸追问**：
- `git push --force-with-lease` 和 `--force` 有什么区别？
- 如果 rebase 后发现某个 commit 解决冲突错了，如何回退？

**相关题目**：
- [FB-20-CO-B-003 merge 与 rebase 的区别](#FB-20-CO-B-003)
- [FB-20-CP-P-024 rebase 与 merge 的团队协作策略](#FB-20-CP-P-024)

**参考资源**：
- [Pro Git - rerere](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-Rerere)
- [Git 官方文档 - git-rebase](https://git-scm.com/docs/git-rebase)

**口头回答版**：
> rebase 冲突要逐个 commit 解决，每次解决完 `git add` 然后 `git rebase --continue`。可以开 rerere 记住解决方式，省得重复解决。如果搞不定可以 `--abort` 放弃。重要是只在个人功能分支 rebase，公共分支不要动，push 时用 `--force-with-lease`，并且提前和团队说一声。

---

## 深入题（9 道）{#proficient-2}

### FB-20-EN-P-049：partial clone 和 sparse checkout 能解决什么问题？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、partial-clone、sparse-checkout、da-cang-ku、xing-neng
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Git 的 `partial clone` 和 `sparse checkout` 机制，以及它们在大仓库中的应用。

**参考答案**：

**partial clone**：
- 克隆时不下载所有 blob，仅按需获取。
- 减少初始 clone 时间和磁盘占用。

```bash
# 不下载 blob，只下载 tree 和 commit
git clone --filter=blob:none <repo>

# 不下载大文件
git clone --filter=tree:0 <repo>
```

**sparse checkout**：
- 只 checkout 指定目录到工作区，其他文件不出现在工作目录。

```bash
git sparse-checkout init --cone
git sparse-checkout set packages/app-a
```

组合使用：

```bash
git clone --filter=blob:none --sparse <repo>
cd <repo>
git sparse-checkout set packages/app-a
```

适用场景：
- 大型 Monorepo 中，开发者只关注部分包。
- 仓库历史中有大量大文件或旧分支。

**评分维度**：
- 能说明 partial clone 减少下载对象（35%）
- 能说明 sparse checkout 减少工作区文件（35%）
- 能给出组合命令和适用场景（30%）

**常见错误**：
- 认为 partial clone 后所有操作都和普通仓库一样快。
- sparse checkout 配置错误导致文件缺失。
- 在需要全量历史分析的场景使用 partial clone。

**延伸追问**：
- partial clone 下 `git blame` 是否会变慢？
- sparse checkout 和 git submodule 各适用于什么场景？

**相关题目**：
- [FB-20-PE-P-050 大仓库 clone 加速策略](#FB-20-PE-P-050)
- [FB-20-PE-P-055 shallow clone 与 filter-repo](#FB-20-PE-P-055)

**参考资源**：
- [Git 官方文档 - partial clone](https://git-scm.com/docs/partial-clone)
- [Git 官方文档 - sparse-checkout](https://git-scm.com/docs/git-sparse-checkout)

**口头回答版**：
> partial clone 是克隆时不下载所有文件内容，按需获取；sparse checkout 是只把部分目录 checkout 到工作区。大 Monorepo 里可以组合用：`git clone --filter=blob:none --sparse`，然后 `git sparse-checkout set packages/app-a`。这样开发者只拉自己需要的部分，省时间和空间。

---

### FB-20-PE-P-050：面对超大型仓库，有哪些 Git clone 加速策略？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、da-cang-ku、xing-neng、partial-clone、sparse-checkout
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
当仓库体积达到数 GB 或历史提交数十万时，`git clone` 非常慢。请列举可落地的加速策略。

**参考答案**：

策略分层：

1. **浅克隆**
   ```bash
   git clone --depth 1 <repo>
   ```
   - 只拉取最近一层历史，适合 CI 和只读场景。

2. **partial clone**
   ```bash
   git clone --filter=blob:none <repo>
   ```
   - 不下载文件内容，按需获取。

3. **sparse checkout**
   ```bash
   git clone --sparse <repo>
   git sparse-checkout set packages/core
   ```
   - 只 checkout 需要的目录。

4. **使用 CDN / 镜像 / 分布式 Git 服务器**
   - 在多地部署 Git 仓库镜像。
   - 使用 GitHub/GitLab 的 geo-replication。

5. **大文件迁出**
   - 使用 Git LFS 将大文件从 Git 历史迁出。
   - 使用 `git filter-repo` 清理历史大文件。

6. **缓存与并发**
   - 配置 `http.version HTTP/2`。
   - 使用 `git clone --jobs` 提高并发。

**评分维度**：
- 能列举浅克隆、partial clone、sparse checkout（40%）
- 能说明每种策略的适用场景（30%）
- 能提到 LFS 和历史清理（20%）
- 能提到 CI 专用 clone 策略（10%）

**常见错误**：
- 只追求 clone 快，忽略后续操作性能。
- 浅克隆后开发人员无法查看完整历史。
- 大文件未迁移导致仓库持续膨胀。

**延伸追问**：
- 浅克隆对 `git blame` 和 `git log` 有什么影响？
- 如何评估仓库体积瓶颈来自历史还是大文件？

**相关题目**：
- [FB-20-EN-P-049 partial clone 和 sparse checkout](#FB-20-EN-P-049)
- [FB-20-CO-P-019 Git LFS 大文件管理](#FB-20-CO-P-019)

**参考资源**：
- [GitHub - 处理大型文件](https://docs.github.com/en/repositories/working-with-files/managing-large-files)
- [Git 官方文档 - git-clone](https://git-scm.com/docs/git-clone)

**口头回答版**：
> 大仓库加速 clone 有几个层次：浅克隆 `--depth 1` 适合 CI；partial clone `--filter=blob:none` 按需下载内容；sparse checkout 只 checkout 需要的目录；还可以用 CDN 镜像、Git LFS 迁出大文件、`git filter-repo` 清理历史。要根据场景组合用，比如开发用 partial clone + sparse checkout，CI 用 shallow clone。

---

### FB-20-SE-P-051：客户端 Git Hooks 能被绕过，如何保证规范落地？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、husky、zhi-liang-men-jin、zi-dong-hua、an-quan
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
团队用 Husky 配置了 pre-commit 和 commit-msg 钩子，但候选人绕过钩子直接 push。请说明如何建立服务端和 CI 双层防护。

**参考答案**：

客户端钩子只能提升体验，不能作为安全边界。必须配合服务端和 CI：

1. **服务端保护规则**
   - 禁止直接 push 到主分支。
   - 所有变更必须通过 Pull Request/Merge Request。
   - 要求至少 1-2 个审批。

2. **CI 质量门禁**
   - 在 CI 中运行 lint、单元测试、类型检查。
   - 集成 commitlint 校验提交信息。
   - 集成 secrets scanning（gitleaks、truffleHog）。

```yaml
# .github/workflows/quality-gate.yml 示例
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npx commitlint --from HEAD~1 --to HEAD --verbose
```

3. **分支保护策略**
   - 要求 status checks 通过才能合并。
   - 要求分支保持最新才能合并。
   - 禁止 force push。

4. **审计与教育**
   - 记录绕过行为的审计日志。
   - 定期培训，让团队理解规范的价值。

**评分维度**：
- 能指出客户端钩子不可信（25%）
- 能说明 PR/MR 强制审查（25%）
- 能设计 CI 门禁（30%）
- 能提到分支保护和审计（20%）

**常见错误**：
- 只依赖 Husky，不在 CI 中重复校验。
- 允许管理员绕过分支保护。
- commitlint 只跑在本地，CI 不跑。

**延伸追问**：
- 如果 CI 运行时间过长，如何设计分层门禁？
- 如何防止候选人通过 `--no-verify` 绕过本地钩子？

**相关题目**：
- [FB-20-EN-A-011 Git Hooks 与 Husky](#FB-20-EN-A-011)
- [FB-20-EN-R-027 Git 工作流与自动化质量门禁](#FB-20-EN-R-027)

**参考资源**：
- [GitHub - 管理分支保护规则](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [commitlint CI 用法](https://commitlint.js.org/guides/ci-setup.html)

**口头回答版**：
> 客户端钩子不靠谱，因为可以用 `--no-verify` 绕过。必须靠服务端和 CI：强制走 PR，主分支不能直接 push；CI 里跑 lint、测试、commitlint、secrets scan；分支保护要求 checks 通过才能合并。教育和审计也要跟上。

---

### FB-20-CP-P-052：跨团队协作时，如何约定分支命名、权限和合并策略？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理、L04 沟通协作
**标签**：git、branch、zhi-li、zhi-li、zhi-li
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
一个大型前端团队拆分为多个子团队，共同维护一个 Monorepo。请设计跨团队的分支命名、权限控制和合并策略约定。

**参考答案**：

1. **分支命名约定**
   ```text
   feature/<team>/<scope>/<desc>
   fix/<team>/<scope>/<desc>
   chore/<team>/<scope>/<desc>
   release/<version>
   hotfix/<version>/<desc>
   ```
   - 通过 team 前缀明确责任团队。
   - 通过 scope 前缀避免命名冲突。

2. **权限控制**
   - 按团队划分 CODEOWNERS 规则。
   - 关键目录需要对应团队 + 架构组双审。
   - 发布分支仅限 release manager 操作。

3. **合并策略**
   - 功能分支 → develop/main：squash merge，保持主历史整洁。
   - release 分支 → main：merge commit，保留发布上下文。
   - hotfix：cherry-pick 到所有受影响的 release 分支。

4. **沟通机制**
   - 跨团队改动需要 RFC 或技术方案评审。
   - 在 PR 描述中明确影响范围和回滚方案。
   - 建立升级路径：小改动直接 PR，大改动走 RFC。

5. **自动化保障**
   - 分支名不符合规范时 CI 报错。
   - 按分支前缀自动分配 reviewer。

**评分维度**：
- 能设计可扩展的分支命名规范（25%）
- 能说明 CODEOWNERS 和权限分层（25%）
- 能给出不同分支的合并策略（25%）
- 能提到跨团队沟通和自动化保障（25%）

**常见错误**：
- 分支命名自由度高，导致无法识别责任团队。
- 所有目录统一审批，降低效率。
- 缺少 hotfix 跨分支同步机制。

**延伸追问**：
- 如果两个团队同时修改同一个公共包，如何协调？
- 分支命名规范如何与 CI/CD 流水线联动？

**相关题目**：
- [FB-20-CP-P-024 rebase 与 merge 的团队协作策略](#FB-20-CP-P-024)
- [FB-20-SD-R-025 设计千人团队的 Git 分支策略](#FB-20-SD-R-025)

**参考资源**：
- [GitHub - CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [Trunk-Based Development - Branching Strategy](https://trunkbaseddevelopment.com/branch-by-abstraction/)

**口头回答版**：
> 跨团队 Monorepo 的分支命名要带团队和业务域前缀，比如 `feature/team-a/payment/xxx`。权限用 CODEOWNERS 按目录分，关键目录要双审。合并策略看分支：功能分支用 squash merge 到 main，release 用 merge commit，hotfix 要 cherry-pick 到多个版本分支。跨团队大改动走 RFC，PR 里写清楚影响和回滚方案。

---

### FB-20-EN-P-053：Git 工作流如何与 npm/yarn/pnpm 变更联动？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、monorepo、commit、changesets、fa-bu
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在前端项目中，依赖升级、包版本发布通常与 Git 工作流紧密相关。请说明如何将 Git 提交、PR 审查与包管理变更联动起来。

**参考答案**：

1. **依赖变更 PR 模板**
   - 必须说明升级原因、影响范围、兼容性风险。
   - 必须包含 lock 文件 diff。

2. **Changesets 管理版本**
   - 每个影响版本的改动提交对应的 changeset 文件。
   - 发布时由 CI 根据 changesets 自动 bump 版本、生成 CHANGELOG。

```bash
# 添加 changeset
npx changeset

# 提交 changeset 和源码改动
git add .changeset/ packages/pkg-a/
git commit -m "feat(pkg-a): add new API"
```

3. **CI 联动**
   - PR 中检测 changeset 是否缺失。
   - 合并后自动触发版本发布流程。
   - 发布失败时自动回滚 tag 和 npm 版本。

4. **lock 文件一致性**
   - PR 中必须包含 lock 文件更新。
   - CI 使用 `--frozen-lockfile` 校验。

5. **发布与 Git tag 绑定**
   - 每个 npm 版本对应一个 Git tag，如 `pkg-a@1.2.0`。
   - tag 由 CI 自动打，避免人工操作。

**评分维度**：
- 能说明依赖变更 PR 需要包含 lock diff（25%）
- 能解释 Changesets 与版本发布的联动（35%）
- 能说明 CI 如何校验 changeset 和 lock（25%）
- 能提到 Git tag 与 npm 版本绑定（15%）

**常见错误**：
- 版本发布由人工本地执行，缺少审计。
- 依赖升级不改 lock 文件。
- changeset 和实际代码改动不一致。

**延伸追问**：
- 如何处理紧急补丁版本的发布？
- 如果 npm 发布成功但 Git tag 推送失败，如何保持一致性？

**相关题目**：
- [FB-20-EN-P-017 Monorepo 变更管理 Changesets](#FB-20-EN-P-017)
- [FB-20-EN-A-046 Monorepo 依赖锁定](#FB-20-EN-A-046)

**参考资源**：
- [Changesets 官方文档](https://github.com/changesets/changesets)
- [semantic-release 文档](https://semantic-release.gitbook.io/)

**口头回答版**：
> Git 和包管理要结合：依赖升级 PR 必须说明原因并带 lock diff；用 Changesets 管理版本，每个改版本的 PR 要提交 changeset 文件；CI 检测 changeset 是否漏了，合并后自动 bump 版本、生成 CHANGELOG、打 Git tag、发布 npm。发布失败要有回滚机制。

---

### FB-20-CO-P-054：git rerere 是什么？如何减少重复冲突？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、rebase、chong-tu、merge、git
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `git rerere`（Reuse Recorded Resolution）机制，并说明如何开启和使用它。

**参考答案**：

`git rerere` 会记录冲突解决方式，当相同冲突再次出现时自动应用之前的解决结果。

启用：

```bash
git config --global rerere.enabled true
```

工作流程：

```bash
# 第一次遇到冲突，手动解决
git merge feature/A
# 解决冲突
git add .
git commit -m "merge feature A"

# rerere 已记录解决方式
# 后续 rebase 或 merge 再次遇到相同冲突时自动应用
```

查看记录：

```bash
git rerere status
git rerere diff
```

适用场景：
- 长期功能分支需要频繁 rebase main。
- 同一冲突在 cherry-pick、merge、rebase 中反复出现。

**评分维度**：
- 能说明 rerere 记录冲突解决方案（40%）
- 能给出启用命令（20%）
- 能说明适用场景（25%）
- 能提到需要验证自动解决结果（15%）

**常见错误**：
- 开启后完全信任自动解决，不人工检查。
- 在临时项目上也开启，增加不必要的复杂度。
- 清理 `.git/rr-cache` 后丢失记录。

**延伸追问**：
- rerere 记录存储在哪里？
- 自动应用的冲突解决如果出错，如何撤销？

**相关题目**：
- [FB-20-SC-A-012 遇到 Git 冲突的解决流程](#FB-20-SC-A-012)
- [FB-20-SC-A-048 多人协作 rebase 冲突处理](#FB-20-SC-A-048)

**参考资源**：
- [Pro Git - rerere](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-Rerere)
- [Git 官方文档 - git-rerere](https://git-scm.com/docs/git-rerere)

**口头回答版**：
> `git rerere` 就是记住你怎么解决冲突，下次再遇到同样的冲突自动帮你解决。用 `git config --global rerere.enabled true` 开启。适合长期分支经常 rebase main 的情况。但自动解决后还是要检查一下，别直接提交。

---

### FB-20-PE-P-055：shallow clone 和 git filter-repo 各适用于什么场景？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、da-cang-ku、xing-neng、commit、log
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 `git clone --depth` 和 `git filter-repo` 的作用，并说明它们在大仓库治理中的不同定位。

**参考答案**：

| 维度 | shallow clone | git filter-repo |
|------|---------------|-----------------|
| 作用 | 限制拉取的历史深度 | 重写仓库历史，移除不需要的内容 |
| 影响范围 | 本地/单次 clone | 整个仓库历史 |
| 是否修改远程 | 否 | 需要 force push |
| 适用场景 | CI、临时查看、开发只读 | 清理大文件、拆分仓库、脱敏 |
| 可逆性 | 可获取完整历史 | 历史被永久重写 |

```bash
# 浅克隆最近 10 次提交
git clone --depth 10 <repo>

# 清理历史中的大文件
pip install git-filter-repo
git filter-repo --strip-blobs-bigger-than 10M

# 按路径拆分历史
git filter-repo --path packages/app-a
```

选型建议：
- CI 构建：shallow clone。
- 仓库历史臃肿：filter-repo 清理后强制推送。
- 临时开发：可结合 shallow + sparse checkout。

**评分维度**：
- 能区分 shallow clone 是临时策略、filter-repo 是历史重写（40%）
- 能给出各自典型命令（30%）
- 能说明 force push 风险和适用边界（30%）

**常见错误**：
- 用 shallow clone 解决仓库历史臃肿问题。
- 在生产仓库直接使用 filter-repo 未做备份。
- 清理历史后发现其他分支或 tag 受影响。

**延伸追问**：
- filter-repo 和 BFG Repo-Cleaner 有什么区别？
- 清理历史后，其他开发者如何同步？

**相关题目**：
- [FB-20-PE-P-050 大仓库 clone 加速策略](#FB-20-PE-P-050)
- [FB-20-CO-P-020 submodule 与 subtree 选型](#FB-20-CO-P-020)

**参考资源**：
- [git-filter-repo 文档](https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html)
- [Git 官方文档 - shallow](https://git-scm.com/docs/shallow)

**口头回答版**：
> shallow clone 是只拉最近几层历史，适合 CI 和临时用，不解决仓库本身臃肿。filter-repo 是重写整个仓库历史，用来清理大文件、拆分目录，会改所有 commit hash，需要 force push。清理前一定要备份，并让团队知道。

---

### FB-20-SE-P-056：Git 仓库中发生密钥泄露后，完整的应急处理流程是什么？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理、A07 安全架构
**标签**：git、min-gan-xin-xi、an-quan、qian-ming、shen-ji
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
某开发者在公开仓库中误提交了 AWS 密钥，且已经被 push 到远程。请描述从发现到处置的完整流程。

**参考答案**：

1. **立即轮换凭证**
   - 在云平台禁用或删除泄露的密钥。
   - 生成新密钥并更新到密钥管理系统。
   - 检查访问日志，评估影响范围。

2. **阻止进一步扩散**
   - 如果是私有仓库，限制访问并审计最近拉取记录。
   - 如果是公开仓库，通知安全团队，启动事件响应流程。

3. **清理 Git 历史**
   - 使用 `git filter-repo` 或 BFG Repo-Cleaner 从历史中移除密钥。
   - 对公共仓库，联系 GitHub/GitLab 支持清除缓存和 fork。

4. **公共分支处理**
   - 主分支不能 force push，先 `git revert` 撤销当前提交。
   - 在功能分支清理历史后重新提交干净版本。

5. **验证与复盘**
   - 确认仓库历史、tag、fork 中不再包含密钥。
   - 引入 pre-commit secrets scanning 和 CI 扫描。
   - 复盘事件，完善教育和流程。

**评分维度**：
- 能强调先轮换凭证再清理历史（30%）
- 能给出 filter-repo / BFG 清理方案（25%）
- 能区分公共分支和个人分支的处理（25%）
- 能提到验证和预防措施（20%）

**常见错误**：
- 只删除文件就认为安全，忽略历史缓存。
- 未轮换密钥直接清理历史。
- 在公开仓库事件中没有评估影响范围。

**延伸追问**：
- GitHub 收到清理请求后通常需要多长时间？
- 如果密钥被搜索引擎缓存，还需要做什么？

**相关题目**：
- [FB-20-SC-A-041 代码审查中发现敏感信息](#FB-20-SC-A-041)
- [FB-20-SE-P-021 Git 安全签名与 secrets scanning](#FB-20-SE-P-021)

**参考资源**：
- [AWS - 删除访问密钥](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)
- [GitHub - 删除敏感数据](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

**口头回答版**：
> 密钥泄露第一件事是轮换凭证，old key 立刻禁用，new key 换上去，查访问日志。然后清理 Git 历史，用 filter-repo 或 BFG。主分支不能 force push，先 revert。公开仓库还要联系平台清缓存和 fork。最后加 pre-commit 和 CI 扫描，做复盘。

---

### FB-20-EN-P-057：如何设计 Git 操作的原子性和可回滚脚本？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、zi-dong-hua、zhi-li、commit、fa-bu
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
团队在发布流程中需要自动执行多个 Git 操作，如打 tag、合并 release 分支、推送。如何设计脚本保证原子性和可回滚？

**参考答案**：

1. **操作前快照**
   - 记录当前分支、HEAD、远程状态。
   - 使用 `git rev-parse HEAD` 保存回滚点。

2. **分阶段执行与校验**
   ```bash
   set -euo pipefail
   BACKUP_HEAD=$(git rev-parse HEAD)
   
   git checkout release/1.0
   git merge --no-ff feature/xxx -m "release: merge feature"
   git tag -a v1.0.0 -m "Release 1.0.0"
   
   # 推送前校验
   git push origin release/1.0
   git push origin v1.0.0
   ```

3. **失败回滚**
   - 任何步骤失败时，回退本地分支到 `BACKUP_HEAD`。
   - 已 push 的 tag 需要 `git push --delete origin v1.0.0`。

4. **幂等设计**
   - 脚本应能检测重复运行，避免重复打 tag。
   - 使用 `--force-with-lease` 防止覆盖他人提交。

5. **日志与审计**
   - 记录每个操作的结果和回滚点。
   - 将日志发送到监控系统。

**评分维度**：
- 能说明操作前保存 HEAD 快照（25%）
- 能设计分阶段执行和失败检测（25%）
- 能给出回滚策略（25%）
- 能提到幂等和审计（25%）

**常见错误**：
- 脚本中没有 `set -e`，失败继续执行后续步骤。
- 推送 tag 成功但推送分支失败，导致 tag 孤立。
- 没有记录回滚点，出问题后无法恢复。

**延伸追问**：
- 如果推送过程中网络中断，脚本如何恢复？
- 如何保证 tag 和 npm 发布版本的原子性？

**相关题目**：
- [FB-20-EN-R-030 Git 灾难恢复和备份策略](#FB-20-EN-R-030)
- [FB-20-EN-P-053 Git 与包管理变更联动](#FB-20-EN-P-053)

**参考资源**：
- [Git 官方文档 - git-rev-parse](https://git-scm.com/docs/git-rev-parse)
- [Conventional Commits - 自动化发布](https://www.conventionalcommits.org/)

**口头回答版**：
> 自动化 Git 脚本要先保存当前 HEAD 作为回滚点，分步骤执行，每步校验。失败了就回退本地分支，已经 push 的 tag 要删掉。脚本要幂等，避免重复打 tag，push 用 `--force-with-lease`。还要记日志，方便审计和排查。

---

## 架构题（18 道）{#architect-2}

### FB-20-SD-R-058：如何为全球多地域团队设计 Git 工作流？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、A01 系统架构
**标签**：git、zhi-li、zhi-li、da-cang-ku、xing-neng
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
团队分布在中国、欧洲、美国三地，网络延迟和时区差异明显。请设计一套适合全球多地域协作的 Git 工作流和基础设施方案。

**参考答案**：

1. **仓库托管与镜像**
   - 使用 GitHub/GitLab 企业版，配置 geo-replication。
   - 在各地部署只读镜像或缓存节点。
   - 大型仓库使用 CDN 加速 raw 文件访问。

2. **分支策略**
   - 采用 Trunk-Based 或 GitHub Flow，减少长生命周期的功能分支。
   - 主干频繁集成，避免多地团队长时间 diverge。

3. **异步协作机制**
   - PR 审查采用轮班制，确保每个时区都有 reviewer。
   - 明确 SLA：PR 必须在 24 小时内得到初步反馈。

4. **减少仓库体积**
   - 大文件使用 Git LFS。
   - 推广 partial clone 和 sparse checkout。
   - 历史清理与归档策略。

5. **CI/CD 就近执行**
   - 各地部署 runner，代码 push 后触发最近 runner。
   - 缓存依赖和构建产物，减少跨国下载。

6. **沟通与文化**
   - 建立清晰的提交规范和沟通语言。
   - 使用异步文档记录决策，减少实时会议依赖。

**评分维度**：
- 能设计 geo-replication 和镜像方案（25%）
- 能选择适合多地域的分支策略（25%）
- 能提出异步审查和 SLA（20%）
- 能说明大仓库优化和 CI 就近执行（20%）
- 能提到跨文化协作（10%）

**常见错误**：
- 忽略网络延迟，所有操作都直连单一中心仓库。
- 长周期功能分支导致各地团队冲突频繁。
- 没有考虑时区差异下的 on-call 和 review 机制。

**延伸追问**：
- 如果某地域网络不稳定，如何设计离线工作模式？
- 多地域团队中，Git 服务器选型有哪些考虑？

**相关题目**：
- [FB-20-SD-R-025 设计千人团队的 Git 分支策略](#FB-20-SD-R-025)
- [FB-20-PE-P-050 大仓库 clone 加速策略](#FB-20-PE-P-050)

**参考资源**：
- [GitHub Enterprise - Geo-replication](https://docs.github.com/en/enterprise-server/admin/installation/setting-up-a-github-enterprise-server-instance)
- [Trunk-Based Development](https://trunkbaseddevelopment.com/)

**口头回答版**：
> 全球团队要做 geo-replication 或镜像，让各地拉代码快。分支策略用短周期分支或 Trunk-Based，避免长时间 diverge。PR 审查要跨时区轮班，定 SLA。大仓库用 LFS、partial clone、sparse checkout。CI runner 就近部署。还要注意异步沟通和文化差异。

---

### FB-20-EN-R-059：Git 工作流如何与 DORA 指标联动？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、L03 技术战略
**标签**：git、zhi-li、ci-cd、zi-dong-hua、zhi-liang-men-jin
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
DORA 指标包括部署频率、变更前置时间、变更失败率、服务恢复时间。请说明 Git 工作流如何影响并支撑这些指标。

**参考答案**：

| DORA 指标 | Git 工作流支撑 |
|-----------|---------------|
| 部署频率 | 主干开发 + CI/CD 自动触发部署 |
| 变更前置时间 | 小 PR、快速 review、自动化测试 |
| 变更失败率 | 分支保护、质量门禁、回滚策略 |
| 服务恢复时间 | revert 能力、hotfix 分支、自动化回滚 |

具体措施：

1. **小步快跑**
   - 限制 PR 大小，建议不超过 400 行变更。
   - 功能开关控制未完成的特性。

2. **自动化质量门禁**
   - pre-commit、CI 测试、SonarQube、secrets scan。
   - 未通过 checks 禁止合并。

3. **主干发布**
   - 合并到 main 即触发部署流水线。
   - tag 与生产版本一一对应。

4. **可观测回滚**
   - 每个部署对应唯一 commit/tag。
   - 一键 revert 或回滚到上一个 tag。

5. **度量与改进**
   - 采集 PR 合并时长、构建时长、回滚次数。
   - 定期复盘，优化流程瓶颈。

**评分维度**：
- 能对应四个 DORA 指标与 Git 工作流（40%）
- 能提出小 PR 和自动化门禁（25%）
- 能说明主干发布和回滚能力（20%）
- 能提到度量与持续改进（15%）

**常见错误**：
- 只关注部署频率，忽略变更失败率。
- PR 过大导致 review 和测试周期变长。
- 没有将 Git 数据接入度量平台。

**延伸追问**：
- 如何防止质量门禁过度降低部署频率？
- 如果团队发布周期是月度，如何逐步向持续部署演进？

**相关题目**：
- [FB-20-EN-R-027 Git 工作流与自动化质量门禁](#FB-20-EN-R-027)
- [FB-20-EN-A-014 Pull Request 审查流程](#FB-20-EN-A-014)

**参考资源**：
- [DORA - DevOps Capabilities](https://dora.dev/devops-capabilities/)
- [Google Cloud - DORA metrics](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance)

**口头回答版**：
> Git 工作流直接影响 DORA：部署频率靠主干开发加 CI/CD 自动部署；变更前置时间靠小 PR 和快速 review；变更失败率靠分支保护和质量门禁；恢复时间靠 revert 和 hotfix 能力。我们还要采集 PR 合并时长、构建时长这些数据，持续优化。

---

### FB-20-SD-R-060：多产品线的统一代码仓应该如何治理？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、L08 技术治理
**标签**：git、monorepo、polyrepo、zhi-li、zhi-li、zhi-li
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
公司拥有多条产品线，既有共享组件也有独立业务。请设计一套统一代码仓的 Git 治理方案，包括分支模型、权限、发布和归档策略。

**参考答案**：

1. **仓库结构**
   - Monorepo：共享组件、工具库、文档统一存放。
   - 按 `products/`、`packages/`、`tools/` 分层。
   - 每个产品线有独立的发布流水线。

2. **分支模型**
   - `main`：稳定主干。
   - `release/<product>-<version>`：产品线发布分支。
   - `feature/<product>/<desc>`：功能分支。
   - `hotfix/<product>/<desc>`：紧急修复。

3. **权限与 CODEOWNERS**
   - 产品线目录由对应团队负责。
   - 共享目录需要跨团队审批。
   - 架构组对 `arch/`、`docs/adr/` 有最终审批权。

4. **发布策略**
   - 每个产品线独立版本号。
   - 使用 Changesets 或独立版本脚本。
   - 发布 tag 格式：`product-a@1.2.0`。

5. **归档与清理**
   - 长期不维护的产品线迁移到归档仓库。
   - 定期清理旧 release 分支和 tag。
   - 大文件和历史清理按年度计划执行。

6. **工具链**
   - Nx/Turborepo/Rush 管理依赖和构建。
   - CI 中按 affected 范围运行测试和构建。

**评分维度**：
- 能设计仓库分层结构（25%）
- 能给出多产品线分支模型（25%）
- 能说明权限和审批分层（20%）
- 能提出独立发布和归档策略（20%）
- 能提到工具链选型（10%）

**常见错误**：
- 所有产品线共用同一个版本号。
- 权限过粗，导致无关团队互相影响。
- 缺少归档策略，仓库无限膨胀。

**延伸追问**：
- 如果两条产品线依赖不同版本的共享组件，如何处理？
- 多产品线 Monorepo 中，如何控制 CI 成本？

**相关题目**：
- [FB-20-SD-R-026 Monorepo 和 Polyrepo 选型](#FB-20-SD-R-026)
- [FB-20-CP-P-052 跨团队协作约定](#FB-20-CP-P-052)

**参考资源**：
- [Monorepo.tools](https://monorepo.tools/)
- [Nx - Monorepo Concepts](https://nx.dev/concepts/decisions/monorepos)

**口头回答版**：
> 多产品线统一仓要分层：共享组件、各产品线、工具分开。分支用 `release/product-version` 这种带产品线前缀的，权限按目录用 CODEOWNERS。每个产品线独立发版，tag 用 `product@version`。长期不维护的归档出去，定期清理大文件和历史。工具链用 Nx 或 Turborepo 按 affected 跑 CI。

---

### FB-20-SS-R-061：如何推动团队从旧工作流迁移到新 Git 工作流？

**题型**：软技能题
**难度**：⚫ 架构
**岗位层级**：架构师 / 技术负责人
**面试知识域**：20 Git 工作流与变更管理、L04 沟通协作
**标签**：git、zhi-li、zhi-li、zhi-li、zhi-li
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
团队长期使用集中式工作流或旧分支模型，现在希望迁移到基于 PR 的 GitHub Flow。请说明你的推动策略。

**参考答案**：

1. **诊断现状**
   - 访谈开发、测试、运维，了解痛点。
   - 统计当前冲突频率、发布周期、回滚次数。

2. **设计目标工作流**
   - 明确分支模型、PR 规范、合并策略。
   - 制定过渡期方案，允许并行运行旧流程一段时间。

3. **工具与自动化先行**
   - 配置分支保护、CI checks、Husky 钩子。
   - 提供脚手架和模板，降低学习成本。

4. **分阶段推广**
   - 先在试点团队运行 2-4 周。
   - 收集反馈，调整规范。
   - 再逐步推广到其他团队。

5. **培训与文档**
   - 举办工作坊，演示常见场景。
   - 编写 FAQ 和故障排查手册。
   - 指定 Git 工作流负责人解答问题。

6. **度量与持续优化**
   - 跟踪 PR 合并时长、冲突率、缺陷率。
   - 定期回顾，庆祝改进成果。

**评分维度**：
- 能说明现状诊断和痛点收集（20%）
- 能设计过渡方案（20%）
- 能强调工具自动化降低阻力（20%）
- 能提出分阶段推广和培训（20%）
- 能提到度量与持续优化（20%）

**常见错误**：
- 一刀切强制切换，导致团队抵触。
- 只改流程不改工具，增加手动负担。
- 缺少反馈机制，规范与实际脱节。

**延伸追问**：
- 如果资深工程师反对新工作流，如何应对？
- 迁移过程中出现生产力下降，如何向管理层解释？

**相关题目**：
- [FB-20-SS-R-029 建立健康的代码审查文化](#FB-20-SS-R-029)
- [FB-20-EN-R-059 Git 与 DORA 指标联动](#FB-20-EN-R-059)

**参考资源**：
- [Atlassian - 版本控制工作流](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Pro Git - 分布式工作流](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E5%B8%83%E5%BC%8F-Git-%E5%88%86%E5%B8%83%E5%BC%8F%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)

**口头回答版**：
> 推工作流迁移不能一刀切。先访谈团队，了解痛点；然后设计目标流程和过渡期方案；工具自动化先跟上，比如分支保护、CI、Husky。找一个小团队试点几周，收集反馈再推广。培训和文档很重要，还要指定负责人答疑。最后看数据：PR 合并时长、冲突率、缺陷率，持续优化。

---

### FB-20-EN-R-062：GitOps 如何与 Git 工作流结合？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、A01 系统架构
**标签**：git、zhi-li、ci-cd、zi-dong-hua、fa-bu
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请解释 GitOps 的核心理念，并说明如何设计前端部署的 GitOps 工作流。

**参考答案**：

GitOps 核心理念：
- 将基础设施和应用的期望状态以声明式配置存储在 Git 中。
- 通过监控 Git 仓库变更自动同步到实际环境。
- 所有变更可审计、可回滚。

前端 GitOps 工作流：

1. **源码与配置分离**
   - 源码仓库：应用代码、构建脚本。
   - 配置仓库：环境变量、部署清单、Ingress 规则。

2. **构建与产物提交**
   - CI 在源码合并后构建产物。
   - 将产物信息（如 Docker image tag）提交到配置仓库对应环境分支。

3. **环境分支模型**
   - `config/main`：开发环境。
   - `config/staging`：预发环境。
   - `config/production`：生产环境。

4. **自动同步**
   - ArgoCD/Flux 监听配置仓库，自动部署到 Kubernetes。
   - 回滚时直接 revert 配置仓库提交。

5. **安全与审计**
   - 生产环境变更需要审批。
   - 所有部署对应唯一 Git commit。

**评分维度**：
- 能说明 GitOps 声明式和以 Git 为单一事实来源（25%）
- 能设计源码与配置分离（25%）
- 能说明 CI 提交产物信息和环境分支模型（25%）
- 能提到回滚和安全审计（25%）

**常见错误**：
- 将构建产物直接提交到源码仓库。
- 生产环境变更没有审批和审计。
- 忽略配置仓库与源码仓库版本不一致问题。

**延伸追问**：
- GitOps 下如何实现蓝绿部署？
- 如果配置仓库和源码仓库版本不一致，如何排查？

**相关题目**：
- [FB-20-EN-P-022 Git 如何与 CI/CD 流水线集成](#FB-20-EN-P-022)
- [FB-20-EN-R-027 Git 工作流与自动化质量门禁](#FB-20-EN-R-027)

**参考资源**：
- [GitOps 原则](https://opengitops.dev/)
- [ArgoCD 官方文档](https://argo-cd.readthedocs.io/)

**口头回答版**：
> GitOps 就是把系统期望状态放在 Git 里，改动自动同步到环境。前端可以做源码仓库和配置仓库分离，CI 构建完把镜像 tag 写到配置仓库对应环境分支，ArgoCD 或 Flux 自动部署。回滚就 revert 配置仓库。生产环境要审批，每次部署对应一个 Git commit，便于审计。

---

### FB-20-SD-R-063：微前端仓库应该如何拆分或统一管理？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、A02 微前端
**标签**：git、monorepo、polyrepo、monorepo、zhi-li
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
一个微前端应用由多个子应用和共享组件组成。请从 Git 工作流角度分析 Monorepo 和 Polyrepo 的选型，并给出推荐方案。

**参考答案**：

**Monorepo 方案**：
- 优点：共享组件一处修改、全量可见；统一构建和版本管理；跨子应用重构方便。
- 缺点：仓库体积大；CI 复杂；权限边界模糊。
- 适用：子应用数量适中、共享依赖多、团队沟通成本低。

**Polyrepo 方案**：
- 优点：子应用独立演进；权限清晰；CI 简单。
- 缺点：共享组件版本同步复杂；跨仓库改动成本高；一致性难保证。
- 适用：子应用团队独立、发布节奏差异大。

**推荐混合方案**：
- 核心框架和共享组件放 Monorepo。
- 业务子应用可独立仓库，通过 npm 或 Module Federation 集成。
- 使用 Changesets 管理共享包版本。

Git 工作流设计：
- 共享包改动触发所有依赖它的子应用 CI。
- 子应用独立部署，通过 tag 标记版本。
- 大版本升级通过 RFC 协调。

**评分维度**：
- 能对比 Monorepo 和 Polyrepo 在微前端场景的优劣（35%）
- 能给出混合方案（25%）
- 能设计共享包和子应用的 Git 工作流（25%）
- 能提到版本协调和 CI 策略（15%）

**常见错误**：
- 盲目选择 Monorepo 导致仓库治理困难。
- 独立仓库过多导致共享组件版本碎片化。
- 忽略跨子应用改动的协调能力。

**延伸追问**：
- 如果子应用之间需要共享状态，仓库结构应如何调整？
- 微前端 Monorepo 中，如何控制子应用的独立发布？

**相关题目**：
- [FB-20-SD-R-026 Monorepo 和 Polyrepo 选型](#FB-20-SD-R-026)
- [FB-20-CP-P-052 跨团队协作约定](#FB-20-CP-P-052)

**参考资源**：
- [Micro-frontends.org](https://micro-frontends.org/)
- [Module Federation](https://module-federation.io/)

**口头回答版**：
> 微前端的仓库选型要看情况：共享组件多、团队沟通好就用 Monorepo；子应用独立、发布节奏不一样就用 Polyrepo。实际推荐混合：核心框架和共享组件放 Monorepo，业务子应用独立仓库。共享包用 Changesets 发版，改动要触发依赖它的子应用 CI。大版本升级走 RFC 协调。

---

### FB-20-CP-R-064：公司并购后，如何整合多代码平台的 Git 工作流？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、L03 技术战略
**标签**：git、zhi-li、zhi-li、he-gui、zhi-li
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
公司收购了一家使用不同 Git 平台和分支策略的团队。请设计一个整合方案，兼顾业务连续性、合规要求和团队文化差异。

**参考答案**：

1. **现状盘点**
   - 梳理两个平台的仓库数量、分支策略、CI/CD、权限模型。
   - 识别关键系统和依赖关系。

2. **平台统一策略**
   - 短期：保持双平台运行，通过 mirror 或 API 同步关键仓库。
   - 中期：选定主平台，将非关键仓库迁移。
   - 长期：全部迁移到统一平台，旧平台归档。

3. **分支与工作流统一**
   - 制定统一的分支命名、提交规范、PR 流程。
   - 提供迁移工具和培训，允许过渡期并行使用。

4. **权限与合规**
   - 统一身份认证（SSO）。
   - 保留审计日志，满足合规要求。
   - 关键仓库设置分支保护和 CODEOWNERS。

5. **文化与沟通**
   - 成立联合工作组，包含双方核心成员。
   - 尊重原有优秀实践，避免一刀切。
   - 通过 RFC 和试点项目建立信任。

6. **风险管理**
   - 制定回滚方案，迁移失败可快速恢复。
   - 保留旧平台只读访问一段时间。

**评分维度**：
- 能设计分阶段迁移策略（25%）
- 能说明双平台同步和过渡方案（20%）
- 能强调权限、合规和审计（20%）
- 能提到文化融合和试点（20%）
- 能给出风险管理措施（15%）

**常见错误**：
- 强制立即切换平台，导致业务中断。
- 忽略被收购团队的工作习惯和文化。
- 迁移后没有保留审计日志。

**延伸追问**：
- 如果两个团队使用不同的提交规范，如何统一？
- 并购后如何平衡短期业务交付和长期平台整合？

**相关题目**：
- [FB-20-SS-R-061 推动团队迁移新工作流](#FB-20-SS-R-061)
- [FB-20-CP-R-031 Git 工作流与合规审计](#FB-20-CP-R-031)

**参考资源**：
- [GitLab - 迁移到 GitLab](https://docs.gitlab.com/ee/user/project/import/)
- [GitHub - 迁移最佳实践](https://docs.github.com/en/migrations)

**口头回答版**：
> 并购后整合要分阶段：先盘点现状，双平台短期并存，关键仓库做镜像同步；中期选定主平台，把非关键仓库迁过去；长期全部统一。分支规范、提交规范、权限、SSO、审计日志都要统一。要成立联合工作组，尊重对方习惯，用试点项目建立信任。还要留好回滚方案。

---

### FB-20-EN-R-065：AI 辅助代码生成场景下，如何治理 Git 提交和审查？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：20 Git 工作流与变更管理、E09 AI 工程化
**标签**：git、zhi-li、zi-dong-hua、dai-ma-shen-cha、zhi-liang-men-jin
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
团队越来越多地使用 AI 辅助生成代码。请设计 Git 提交和 PR 审查流程，确保 AI 生成代码的可追溯性、安全性和质量。

**参考答案**：

1. **提交信息规范**
   - 强制要求提交信息注明是否包含 AI 生成内容。
   - 使用 Conventional Commits 扩展字段，如 `AI-assisted: true`。

2. **PR 审查强化**
   - AI 生成代码必须由人工审查，不能自动合并。
   - 关键模块增加安全审查和架构审查。

3. **安全扫描**
   - CI 中对 AI 生成代码进行 secrets scan、依赖扫描。
   - 检测是否存在已知漏洞模式或幻觉代码。

4. **可追溯性**
   - 记录使用的 AI 模型、提示词版本（如适用）。
   - 在 PR 描述中说明 AI 参与的范围。

5. **质量门禁**
   - AI 生成代码必须通过 lint、单元测试、类型检查。
   - 关键路径要求覆盖率达到团队基线。

6. **文化与教育**
   - 培训开发者识别 AI 常见错误。
   - 建立 AI 代码审查 checklist。

**评分维度**：
- 能设计 AI 生成内容的提交标注（25%）
- 能强化 PR 审查和安全扫描（25%）
- 能提到可追溯性和模型记录（20%）
- 能说明质量门禁和文化建设（20%）
- 能平衡效率与风险（10%）

**常见错误**：
- 完全信任 AI 生成代码，跳过人工审查。
- 不记录 AI 参与范围，导致问题无法追溯。
- 安全扫描规则未针对 AI 代码更新。

**延伸追问**：
- 如果 AI 生成的代码引入了安全漏洞，责任如何界定？
- 如何防止 AI 生成代码中出现版权或许可证问题？

**相关题目**：
- [FB-20-EN-A-010 Conventional Commits 规范](#FB-20-EN-A-010)
- [FB-20-SE-P-051 客户端钩子绕过与防护](#FB-20-SE-P-051)

**参考资源**：
- [OWASP - AI 安全](https://owasp.org/www-project-ai-security-and-privacy-guide/)
- [GitHub Copilot - 负责任使用](https://docs.github.com/en/copilot/responsible-use-of-github-copilot)

**口头回答版**：
> AI 生成代码要在提交信息里标注，比如扩展 Conventional Commits。PR 必须人工审，不能自动合。CI 要加安全扫描、依赖扫描，检测 AI 常见错误。PR 描述要说明用了什么模型、AI 参与了哪些部分。还要培训团队识别 AI 幻觉，关键模块增加安全和架构审查。

---

### FB-20-SS-R-066：如何在团队中构建 blameless 的提交与发布文化？

**题型**：软技能题
**难度**：⚫ 架构
**岗位层级**：架构师 / 技术负责人
**面试知识域**：20 Git 工作流与变更管理、L02 团队建设
**标签**：git、zhi-li、zhi-li、zhi-li、zhi-li
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
团队在遇到线上故障时常常互相指责。请说明如何通过 Git 工作流和文化建设，构建 blameless 的提交与发布文化。

**参考答案**：

1. **以流程和系统为改进对象**
   - 故障复盘关注“流程哪里可以改进”，而不是“谁犯了错”。
   - 用 `git blame` 定位代码来源，但不用于追责。

2. **清晰的提交和发布记录**
   - 每个提交关联需求 ID、PR、审批记录。
   - 发布 tag 与 CI/CD 流水线、审批记录绑定。

3. **快速回滚能力**
   - 建立一键 revert 和回滚机制。
   - 减少故障影响时间，降低心理压力。

4. **心理安全**
   - 鼓励成员主动承认和报告问题。
   - 领导层率先示范，不因为故障处罚个人。

5. **持续改进机制**
   - 定期举行 blameless postmortem。
   - 将改进项录入 backlog 并跟踪闭环。

6. **工具支持**
   - 自动化测试、质量门禁、灰度发布。
   - 让问题在到达生产前被发现。

**评分维度**：
- 能说明 blameless 文化的核心是改进流程而非追责（30%）
- 能设计可追溯但非追责的提交记录（20%）
- 能提到快速回滚和心理安全（20%）
- 能说明 postmortem 和持续改进（20%）
- 能提到工具对文化的支撑（10%）

**常见错误**：
- 用 `git blame` 在复盘会上追责。
- 故障后只处罚个人，不改进流程。
- 缺少快速回滚机制，导致故障影响扩大。

**延伸追问**：
- 如果高层要求明确责任人，如何平衡 blameless 与问责？
- 如何衡量团队文化是否真正变得 blameless？

**相关题目**：
- [FB-20-SS-R-029 建立健康的代码审查文化](#FB-20-SS-R-029)
- [FB-20-EN-R-030 Git 灾难恢复和备份策略](#FB-20-EN-R-030)

**参考资源**：
- [Google SRE - Blameless Postmortem](https://sre.google/sre-book/postmortem-culture/)
- [Etsy - Blameless Culture](https://www.etsy.com/codeascraft/blameless-postmortems)

**口头回答版**：
> blameless 文化就是复盘时关注流程怎么改进，而不是找人背锅。Git blame 可以用来定位代码，但不能用来追责。提交和发布记录要清晰，关联需求和审批，方便追溯。要有快速回滚能力，减少故障影响。领导要带头不处罚个人，鼓励大家主动报告问题。定期做 blameless postmortem，把改进项跟进闭环。
### FB-20-SC-B-001：解释 git merge 和 git rebase 的区别及适用场景。

**题型**：场景设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、Git、zhi-li、commit、branch
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
解释 git merge 和 git rebase 的区别及适用场景。。

**参考答案**：

- **Merge**：将两个分支的历史合并，生成一个新的合并提交。保留完整历史，适合公共分支。
- **Rebase**：将当前分支的提交应用到目标分支顶端，使历史线性。适合本地整理提交历史。

适用场景：
- 已推送到远程的公共分支：用 merge。
- 本地功能分支整理历史：用 rebase。
- 想保留功能边界：用 `git merge --no-ff`。


**补充说明**：

在实际落地 解释 git merge 和 git rebase 的区别及适用场景。 时，建议结合 git、Git、zhi-li 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 说清两者区别（50%）
- 给出适用场景（40%）
- 提到风险（10%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - Merge：将两个分支的历史合并，生成一个新的合并提交。 保留完整历史，适合公共分支。 - Rebase：将当前分支的提交应用到目标分支顶端，使历史线性。 适合本地整理提交历史。

---

### FB-20-CO-B-040：什么是 Conventional Commits？为什么要用它？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、Git、zhi-li、commit、branch
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是 Conventional Commits？为什么要用它。

**参考答案**：

Conventional Commits 是一种提交消息规范，格式为 `<type>(<scope>): <subject>`。

常见 type：feat、fix、docs、style、refactor、test、chore。

价值：
- 自动生成 CHANGELOG。
- 支撑语义化版本。
- 提升提交历史可读性。
- 便于问题追踪和回滚。

**评分维度**：
- 解释规范格式（40%）
- 列举 type（30%）
- 说明价值（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> Conventional Commits 是一种提交消息规范，格式为 `<type37>`(`<scope44>`): `<subject54>`。 常见 type：feat、fix、docs、style、refactor、test、chore。 价值： - 自动生成 CHANGELOG。 - 支撑语义化版本。

---

### FB-20-EN-B-001：描述 Git Flow 的主要分支和流程。

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、Git、zhi-li、commit、branch
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
描述 Git Flow 的主要分支和流程。。

**参考答案**：

主要分支：
- `main`：稳定分支。
- `develop`：日常开发集成分支。
- `feature/*`：功能分支。
- `release/*`：发布分支。
- `hotfix/*`：紧急修复分支。

流程：
1. 从 develop 切出 feature 分支开发。
2. 完成后合并回 develop。
3. 发布前切 release 分支测试修复。
4. release 合并到 main 并打 Tag。
5. hotfix 从 main 切出，修复后合并回 main 和 develop。

**评分维度**：
- 说清分支类型（40%）
- 描述流程（40%）
- 说明适用场景（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 主要分支： - main：稳定分支。 - develop：日常开发集成分支。 - feature/*：功能分支。 - release/*：发布分支。

---

### FB-20-CO-B-041：Code Review 应该关注哪些方面？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、Git、zhi-li、commit、branch
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
Code Review 应该关注哪些方面。

**参考答案**：

- 功能正确性：是否满足需求。
- 代码质量：可读性、可维护性、是否符合规范。
- 测试覆盖：是否有单元测试、集成测试。
- 性能：是否有明显性能问题。
- 安全：是否有注入、XSS 等风险。
- 可访问性：是否符合 a11y 要求。
- 设计合理性：是否引入不必要复杂度。

**评分维度**：
- 列举关注点（60%）
- 强调 Review 的文化价值（20%）
- 结合自身经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 功能正确性：是否满足需求。 - 代码质量：可读性、可维护性、是否符合规范。 - 测试覆盖：是否有单元测试、集成测试。 - 性能：是否有明显性能问题。

---

### FB-20-CO-B-042：语义化版本 SemVer 中 MAJOR、MINOR、PATCH 分别代表什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、Git、zhi-li、commit、branch
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
语义化版本 SemVer 中 MAJOR、MINOR、PATCH 分别代表什么。

**参考答案**：

- **MAJOR**：不兼容的 API 修改。
- **MINOR**：向下兼容的功能新增。
- **PATCH**：向下兼容的问题修复。

例如 `2.1.3`：2 是主版本，1 是次版本，3 是补丁版本。


**补充说明**：

在实际落地 语义化版本 SemVer 中 MAJOR、MINOR、PATCH 分别代表什么 时，建议结合 git、Git、zhi-li 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 准确解释三者（60%）
- 举例说明（25%）
- 说明与 Conventional Commits 的关系（15%）

---

## 二、进阶题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - MAJOR：不兼容的 API 修改。 - MINOR：向下兼容的功能新增。 - PATCH：向下兼容的问题修复。 例如 2.1.3：2 是主版本，1 是次版本，3 是补丁版本。

---

### FB-20-EN-A-047：如何为一个团队选择合适的 Git 工作流？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、Git、zhi-li、commit、branch
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何为一个团队选择合适的 Git 工作流。

**参考答案**：

选择因素：
- 团队规模：小团队适合 GitHub Flow，大团队适合 Trunk-Based。
- 发布频率：持续部署选 GitHub Flow/Trunk-Based，固定周期选 Git Flow。
- 项目复杂度：复杂项目可能需要 release 分支。
- 团队成熟度：Trunk-Based 要求高频率集成和自动化测试。

没有银弹，应根据实际情况选型，并定期 review。


**补充说明**：

在实际落地 为一个团队选择合适的 Git 工作流 时，建议结合 git、Git、zhi-li 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 列举选择因素（50%）
- 给出不同场景推荐（30%）
- 强调持续优化（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 选择因素： - 团队规模：小团队适合 GitHub Flow，大团队适合 Trunk-Based。 - 发布频率：持续部署选 GitHub Flow/Trunk-Based，固定周期选 Git Flow。 - 项目复杂度：复杂项目可能需要 release 分支。 - 团队成熟度：Trunk-Based 要求高频率集成和自动化测试。

---

### FB-20-CO-A-048：什么是 Feature Toggle？什么时候使用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、Git、zhi-li、commit、branch
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是 Feature Toggle？什么时候使用。

**参考答案**：

Feature Toggle（特性开关）是一种在代码中通过配置控制功能是否启用的技术。

使用场景：
- Trunk-Based Development 中隐藏未完成功能。
- A/B 测试。
- 渐进式发布（Canary）。
- 紧急回滚某个功能而不回滚代码。

注意：需要定期清理已稳定的开关，避免技术债。

**评分维度**：
- 解释概念（30%）
- 使用场景（50%）
- 提到维护成本（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> Feature Toggle（特性开关）是一种在代码中通过配置控制功能是否启用的技术。 使用场景： - Trunk-Based Development 中隐藏未完成功能。 - 渐进式发布（Canary）。 - 紧急回滚某个功能而不回滚代码。

---

### FB-20-PE-A-001：大型 Git 仓库有哪些性能优化手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、Git、zhi-li、commit、branch
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
大型 Git 仓库有哪些性能优化手段。

**参考答案**：

- **浅克隆**：`git clone --depth 1` 只拉取最近历史。
- **稀疏检出**：`git sparse-checkout` 只拉取需要的目录。
- **Git LFS**：大文件交给 LFS 管理。
- **拆分仓库**：必要时拆分子仓库或迁移到 Monorepo 工具。
- **优化 CI**：只构建 affected 的包。
- **定期清理**：`git gc`、删除无用分支。


**补充说明**：

在实际落地 大型 Git 仓库有哪些性能优化手段 时，建议结合 git、Git、zhi-li 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 浅克隆与稀疏检出（40%）
- LFS 与大文件管理（25%）
- CI 与 Monorepo 优化（25%）
- 表达清晰度（10%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 浅克隆：git clone --depth 1 只拉取最近历史。 - 稀疏检出：git sparse-checkout 只拉取需要的目录。 - Git LFS：大文件交给 LFS 管理。 - 拆分仓库：必要时拆分子仓库或迁移到 Monorepo 工具。

---

### FB-20-SS-A-001：如何处理代码冲突？

**题型**：软技能题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：20 Git 工作流与变更管理
**标签**：git、Git、zhi-li、commit、branch
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何处理代码冲突。

**参考答案**：

1. 先拉取最新目标分支代码。
2. 在本地合并或 rebase。
3. 手动解决冲突，保留双方合理改动。
4. 与相关开发者沟通，确认冲突部分的设计意图。
5. 测试通过后再提交。

避免冲突的方法：
- 小步提交、频繁集成。
- 明确模块边界。
- 避免多人同时修改同一文件。

**评分维度**：
- 解决步骤（50%）
- 预防措施（30%）
- 沟通协作意识（20%）

---

## 三、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 1. 先拉取最新目标分支代码。 2. 在本地合并或 rebase。 3. 手动解决冲突，保留双方合理改动。 4. 与相关开发者沟通，确认冲突部分的设计意图。






