# CI/CD 面试题

> 本题库共收录 **120** 道面试题（基础 29 / 进阶 31 / 深入 31 / 架构 29）。
> 本文件收录 CI/CD 相关面试题，目标题量 65 道。
> 题型覆盖：概念题、场景设计题、系统设计题、工程化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（16 道）{#basic}

### FB-12-CO-B-001：什么是 CI/CD？持续集成、持续交付和持续部署有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：12 CI/CD
**标签**：CI、CD、持续集成、持续交付、持续部署
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 CI/CD 的含义，并说明持续集成（CI）、持续交付（CD）和持续部署（CD）之间的区别。

**参考答案**：

1. **CI（Continuous Integration，持续集成）**：开发人员频繁地将代码合并到主干，每次合并都通过自动化构建和测试验证，尽早发现集成错误。
2. **CD（Continuous Delivery，持续交付）**：在 CI 的基础上，将构建产物自动化部署到类生产环境，并保持在可随时发布到生产环境的状态，但需人工审批发布。
3. **CD（Continuous Deployment，持续部署）**：在持续交付的基础上，进一步将通过所有验证的代码自动发布到生产环境，无需人工干预。

简单来说：

- 持续集成关注"代码合并即验证"。
- 持续交付关注"随时可发布"。
- 持续部署关注"自动发布到生产"。

**评分维度**：
- 概念区分清晰度（50%）：能否准确区分 CI / Continuous Delivery / Continuous Deployment
- 流程理解（30%）：是否理解从提交到部署的自动化链路
- 举例说明（20%）：能否结合实际工作流举例

**常见错误**：
- 将 CI/CD 简单等同于"自动化部署"
- 混淆持续交付和持续部署，忽略人工审批环节

**延伸追问**：
- 你们团队目前处在 CI、持续交付还是持续部署阶段？
- 从持续交付演进为持续部署，需要哪些前提条件？

**相关题目**：
- [FB-12-EN-B-002 什么是 Pipeline as Code？](#FB-12-EN-B-002)

**参考资源**：
- [Martin Fowler - Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)
- [Martin Fowler - Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html)

**口头回答版**：
> CI（Continuous Integration，持续集成）：开发人员频繁地将代码合并到主干，每次合并都通过自动化构建和测试验证，尽早发现集成错误。 CD（Continuous Delivery，持续交付）：在 CI 的基础上，将构建产物自动化部署到类生产环境，并保持在可随时发布到生产环境的状态，但需人工审批发布。 CD（Continuous Deployment，持续部署）：在持续交付的基础上，进一步将通过所有验证的代码自动发布到生产环境，无需人工干预。 - 持续集成关注"代码合并即验证"。

---

### FB-12-EN-B-002：什么是 Pipeline as Code？它有什么好处？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：Pipeline as Code、GitLab CI、GitHub Actions、Jenkinsfile
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Pipeline as Code 的概念，并说明它相比传统 UI 配置式流水线有哪些优势。

**参考答案**：

**Pipeline as Code** 是指将 CI/CD 流水线的定义以代码形式（通常是 YAML 或 DSL）存储在版本控制仓库中，与业务代码一起管理。

常见实现：

- GitHub Actions：`.github/workflows/*.yml`
- GitLab CI：`.gitlab-ci.yml`
- Jenkins：Jenkinsfile（Groovy DSL）
- Azure DevOps：`.azure-pipelines.yml`

优势：

1. **版本控制**：流水线变更可追溯、可回滚、可分支。
2. **代码复用**：可通过模板、include、reusable workflow 减少重复。
3. **可审查**：Pipeline 变更可以走 Code Review。
4. **一致性**：不同环境使用同一份定义，避免"本地能跑、线上不行"。
5. **可测试**：部分流水线可以通过 lint 或 dry-run 验证。

```yaml
# GitHub Actions 示例
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

**评分维度**：
- 概念理解（40%）：能否说明 Pipeline as Code 的本质
- 优势列举（40%）：能否说出 3 个以上优势
- 代码示例（20%）：能否写出常见配置片段

**常见错误**：
- 认为 Pipeline as Code 只是"把配置写成 YAML"
- 忽略版本控制带来的可追溯和回滚能力

**延伸追问**：
- Pipeline as Code 的敏感信息如何管理？
- 当流水线本身成为"代码"后，如何防止恶意 PR 篡改流水线？

**相关题目**：
- [FB-12-EN-A-004 几种常见的部署策略有什么区别？](#FB-12-EN-A-004)

**参考资源**：
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitLab CI/CD YAML 参考](https://docs.gitlab.com/ee/ci/yaml/)

**口头回答版**：
> Pipeline as Code 是指将 CI/CD 流水线的定义以代码形式（通常是 YAML 或 DSL）存储在版本控制仓库中，与业务代码一起管理。 - GitHub Actions：.github/workflows/*.yml - GitLab CI：.gitlab-ci.yml - Jenkins：Jenkinsfile（Groovy DSL）

---

### FB-12-EN-B-003：GitHub Actions 的核心概念有哪些？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：GitHub Actions、Workflow、Job、Step、Action
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 GitHub Actions 中 Workflow、Job、Step、Action 的含义及其关系。

**参考答案**：

GitHub Actions 的核心概念：

1. **Workflow（工作流）**：由 `on` 事件触发，定义在 `.github/workflows/*.yml` 中的自动化流程。一个仓库可配置多个 Workflow。
2. **Job（任务）**：一个 Workflow 由一个或多个 Job 组成，默认并行执行，可通过 `needs` 控制依赖。
3. **Step（步骤）**：Job 中的最小执行单元，按顺序执行。每个 Step 可以运行 shell 命令或引用 Action。
4. **Action（动作）**：可复用的封装单元，例如 `actions/checkout@v4`、`actions/setup-node@v4`，可自发布到 Marketplace 或仓库内复用。

关系：`Workflow` 包含多个 `Job`，`Job` 包含多个 `Step`，`Step` 可调用 `Action`。

```yaml
name: example
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4       # Action
      - name: Install
        run: npm ci                     # Step command
      - name: Test
        run: npm test
```

**评分维度**：
- 核心概念区分（50%）：能否清晰解释 4 个概念
- 执行关系（30%）：是否理解并行/串行规则
- 代码示例（20%）：能否写出合法 YAML 结构

**常见错误**：
- 混淆 Job 和 Step：Job 之间默认并行，Step 之间串行
- 认为一个 Workflow 只能有一个 Job

**延伸追问**：
- `runs-on` 和 `strategy.matrix` 的作用是什么？
- 如何在 Job 之间传递数据？

**相关题目**：
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线？](#FB-12-EN-A-001)
- [FB-12-EN-P-008 GitHub Actions 的 Reusable Workflow 与 Composite Action](#FB-12-EN-P-008)

**参考资源**：
- [GitHub Actions 核心概念](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)

**口头回答版**：
> GitHub Actions 的核心概念： Workflow（工作流）：由 on 事件触发，定义在 .github/workflows/*.yml 中的自动化流程。 一个仓库可配置多个 Workflow。 Job（任务）：一个 Workflow 由一个或多个 Job 组成，默认并行执行，可通过 needs 控制依赖。

---

### FB-12-EN-B-004：GitLab CI 的核心概念有哪些？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：GitLab CI、.gitlab-ci.yml、Stage、Job、Runner
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 GitLab CI 中 `.gitlab-ci.yml`、Stage、Job、Runner 的含义及其关系。

**参考答案**：

GitLab CI 的核心概念：

1. **`.gitlab-ci.yml`**：Pipeline as Code 配置文件，定义在项目仓库根目录。
2. **Stage（阶段）**：Pipeline 的逻辑阶段，例如 `build`、`test`、`deploy`。同一 Stage 下的 Job 并行执行，Stage 按顺序执行。
3. **Job（任务）**：Pipeline 的最小执行单元，定义了脚本、镜像、缓存、产物等。
4. **Runner**：执行 Job 的代理，可以是 GitLab 共享 Runner 或自托管 Runner，按标签（tags）匹配 Job。

```yaml
stages:
  - build
  - test
  - deploy

build-job:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

test-job:
  stage: test
  script:
    - npm test

deploy-job:
  stage: deploy
  script:
    - npm run deploy
  only:
    - main
```

**评分维度**：
- 核心概念区分（50%）：能否准确解释 4 个概念
- 执行顺序理解（30%）：是否理解 Stage 顺序与 Job 并行关系
- 配置示例（20%）：能否写出基本 `.gitlab-ci.yml`

**常见错误**：
- 忽略 `stages` 定义导致 Job 默认进入 `test` stage
- 认为 Runner 越多越好，而不考虑标签匹配和安全隔离

**延伸追问**：
- `artifacts` 和 `cache` 有什么区别？
- 自托管 Runner 和共享 Runner 在安全性和性能上有什么不同？

**相关题目**：
- [FB-12-EN-A-002 如何为前端项目设计 GitLab CI 流水线？](#FB-12-EN-A-002)

**参考资源**：
- [GitLab CI/CD 基础](https://docs.gitlab.com/ee/ci/)

**口头回答版**：
> GitLab CI 的核心概念： .gitlab-ci.yml：Pipeline as Code 配置文件，定义在项目仓库根目录。 Stage（阶段）：Pipeline 的逻辑阶段，例如 build、test、deploy。 同一 Stage 下的 Job 并行执行，Stage 按顺序执行。

---

### FB-12-EN-B-005：Jenkins Pipeline 的核心概念有哪些？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：Jenkins、Jenkinsfile、Pipeline、Stage、Step、Agent
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Jenkins Pipeline 中 Jenkinsfile、Pipeline、Stage、Step、Agent 的含义。

**参考答案**：

Jenkins Pipeline 的核心概念：

1. **Jenkinsfile**：以代码形式定义 Pipeline 的文件，可使用 Declarative Pipeline（推荐）或 Scripted Pipeline（Groovy）。
2. **Pipeline**：完整的持续交付流水线，包含多个 Stage。
3. **Stage（阶段）**：Pipeline 中的逻辑阶段，例如 Build、Test、Deploy，用于可视化。
4. **Step（步骤）**：Stage 中的单个任务，例如 `sh 'npm test'`、`archiveArtifacts`。
5. **Agent**：指定 Pipeline 或 Stage 在哪个节点/环境中运行，可以是 Jenkins Master、Slave Node、Docker 容器等。

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'npm run deploy'
            }
        }
    }
}
```

**评分维度**：
- 核心概念区分（50%）：能否准确解释 5 个概念
- Declarative vs Scripted 理解（30%）：是否知道两种 Pipeline 风格
- 示例能力（20%）：能否写出合法 Jenkinsfile 片段

**常见错误**：
- 混淆 Declarative Pipeline 和 Scripted Pipeline 的语法
- 在 `agent any` 场景下忽略构建环境一致性，导致构建结果不稳定

**延伸追问**：
- Declarative Pipeline 和 Scripted Pipeline 各有什么适用场景？
- Jenkins 的 Shared Library 解决了什么问题？

**相关题目**：
- [FB-12-EN-A-003 如何为前端项目配置 Jenkins 多分支流水线？](#FB-12-EN-A-003)

**参考资源**：
- [Jenkins Pipeline 文档](https://www.jenkins.io/doc/book/pipeline/)

**口头回答版**：
> Jenkins Pipeline 的核心概念： Jenkinsfile：以代码形式定义 Pipeline 的文件，可使用 Declarative Pipeline（推荐）或 Scripted Pipeline（Groovy）。 Pipeline：完整的持续交付流水线，包含多个 Stage。 Stage（阶段）：Pipeline 中的逻辑阶段，例如 Build、Test、Deploy，用于可视化。

---

### FB-12-CO-B-006：自动化测试在 CI/CD 中的作用是什么？常见的测试分层有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：自动化测试、单元测试、集成测试、E2E 测试、测试金字塔
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明自动化测试在 CI/CD 中的作用，并介绍测试金字塔中各层的含义。

**参考答案**：

自动化测试是 CI/CD 的质量门禁，用于在代码合并或发布前快速发现回归问题。

**作用**：

1. 提高反馈速度：每次提交即验证，早发现早修复。
2. 保障回归安全：重构和功能迭代时降低破坏风险。
3. 提升发布信心：通过测试的代码才允许进入后续阶段。
4. 支持持续部署：没有稳定自动化测试，无法做到无人值守发布。

**测试金字塔**（自下而上）：

1. **单元测试**：数量最多、执行最快，针对函数/组件最小单元，例如 Jest、Vitest。
2. **集成测试**：验证多个模块/服务之间的交互，例如 React Testing Library + MSW。
3. **E2E 测试**：模拟真实用户操作，验证完整业务流程，例如 Playwright、Cypress。

原则：底层测试应占多数，E2E 少量但覆盖核心路径。

**评分维度**：
- 作用理解（40%）：能否说出 3 个以上作用
- 测试分层理解（40%）：能否准确区分单元/集成/E2E
- 金字塔原则（20%）：是否理解数量分布和执行成本

**常见错误**：
- 过度依赖 E2E 测试，忽略单元测试的快速反馈
- 认为"自动化测试 = 自动化测试脚本"，忽略测试数据和环境管理

**延伸追问**：
- 单元测试和集成测试的边界在哪里？
- E2E 测试不稳定时，通常是什么原因？如何解决？

**相关题目**：
- [FB-12-EN-P-005 如何在 CI/CD 中设置有效的质量门禁？](#FB-12-EN-P-005)

**参考资源**：
- [Martin Fowler - TestPyramid](https://martinfowler.com/bliki/TestPyramid.html)

**口头回答版**：
> 自动化测试是 CI/CD 的质量门禁，用于在代码合并或发布前快速发现回归问题。

---

### FB-12-EN-B-007：Docker 在前端 CI/CD 中通常扮演什么角色？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：Docker、容器化、Dockerfile、构建环境、一致性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Docker 在前端 CI/CD 中的常见用途，并解释它如何解决"在我机器上能跑"的问题。

**参考答案**：

Docker 在前端 CI/CD 中的作用：

1. **构建环境一致性**：将 Node.js、pnpm/npm/yarn、系统依赖封装到镜像中，本地与 CI 使用相同环境。
2. **隔离依赖**：避免不同项目或不同版本在宿主机上互相污染。
3. **标准化运行环境**：测试、构建、部署都在同一镜像或派生镜像中完成。
4. **多阶段构建**：可以在一个 Dockerfile 中完成构建和产物打包，减少最终镜像体积。

示例 Dockerfile：

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

通过 Docker，"在我机器上能跑"的问题被转化为"在相同容器内运行"，从而消除了宿主机环境差异。

**评分维度**：
- 用途理解（50%）：能否说出 3 个以上用途
- 一致性解释（30%）：能否解释如何解决环境差异
- 代码示例（20%）：能否写出基础多阶段 Dockerfile

**常见错误**：
- 认为 Docker 只用于后端服务部署
- 忽略镜像体积优化，导致构建/拉取过慢

**延伸追问**：
- 前端构建产物通常是静态文件，为什么还要用 Docker？
- Docker 镜像体积过大时，有哪些优化手段？

**相关题目**：
- [FB-12-EN-P-004 如何优化前端 Docker 构建与镜像体积？](#FB-12-EN-P-004)

**参考资源**：
- [Docker 官方文档](https://docs.docker.com/)

**口头回答版**：
> Docker 在前端 CI/CD 中的作用： 构建环境一致性：将 Node.js、pnpm/npm/yarn、系统依赖封装到镜像中，本地与 CI 使用相同环境。 隔离依赖：避免不同项目或不同版本在宿主机上互相污染。 标准化运行环境：测试、构建、部署都在同一镜像或派生镜像中完成。

---

### FB-12-CO-B-008：什么是构建产物（Artifact）管理？为什么重要？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：Artifact、构建产物、制品管理、版本化、可追溯
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 CI/CD 中的 Artifact（构建产物）管理，并说明其重要性。

**参考答案**：

**Artifact（构建产物）** 是构建阶段生成的可交付文件，例如前端的 `dist/`、npm tarball、Docker 镜像、Source Map 等。

**Artifact 管理** 是指对这些产物进行存储、版本化、分发、保留策略和访问控制的过程。

重要性：

1. **可复现性**：同一份产物可以部署到测试、预发、生产等多个环境，保证"一次构建，到处部署"。
2. **可追溯性**：通过产物版本可以回溯到具体的代码提交和流水线记录。
3. **回滚能力**：保留历史产物，故障时可快速回滚到上一个稳定版本。
4. **效率提升**：避免每个环境重复构建，减少时间成本和构建差异。

常见工具：Nexus、JFrog Artifactory、GitHub Packages、GitLab Package Registry、Harbor、S3 + CDN。

**评分维度**：
- 概念理解（40%）：能否说明什么是 Artifact
- 重要性理解（40%）：能否说出 3 个以上重要性
- 工具认知（20%）：能否列举常见制品管理工具

**常见错误**：
- 将 Artifact 简单等同于"源码"
- 忽略产物保留策略，导致存储成本飙升或无法回滚

**延伸追问**：
- 如何保证不同环境部署的是同一份产物？
- Source Map 作为 Artifact 应该如何管理？

**相关题目**：
- [FB-12-SD-R-005 如何设计企业级前端制品管理与发布火车？](#FB-12-SD-R-005)

**参考资源**：
- [Azure - What are build artifacts](https://learn.microsoft.com/en-us/azure/devops/pipelines/artifacts/build-artifacts)

**口头回答版**：
> Artifact（构建产物） 是构建阶段生成的可交付文件，例如前端的 dist/、npm tarball、Docker 镜像、Source Map 等。 Artifact 管理 是指对这些产物进行存储、版本化、分发、保留策略和访问控制的过程。 可复现性：同一份产物可以部署到测试、预发、生产等多个环境，保证"一次构建，到处部署"。 可追溯性：通过产物版本可以回溯到具体的代码提交和流水线记录。

---

### FB-12-EN-B-009：前端 CI/CD 中如何设计依赖与构建缓存策略？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：缓存、依赖安装、构建缓存、pnpm、Remote Cache
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请从前端 CI/CD 实践角度，说明如何设计依赖安装缓存和构建缓存，以减少重复工作并缩短流水线时间。

**参考答案**：

缓存设计的核心是"用空间换时间"，同时保证缓存失效的准确性。

1. **依赖安装缓存**
   - 按包管理器选择缓存目录：`node_modules`、`.npm`、`.yarn/cache`、`.pnpm-store`。
   - 缓存 key 应基于 lockfile（`package-lock.json`、`yarn.lock`、`pnpm-lock.yaml`），一旦依赖变化就失效。
   - 示例（GitHub Actions）：
     ```yaml
     - uses: actions/setup-node@v4
       with:
         node-version: 20
         cache: pnpm
     ```

2. **构建工具缓存**
   - 缓存 `.turbo`（Turborepo）、`.cache/vite`、`.cache/webpack`、`.eslintcache`、`.jest/cache`。
   - 使用 Remote Cache（Turborepo Remote Cache / Nx Cloud）让不同 CI Job 和开发者共享缓存。

3. **产物传递**
   - 一次构建后将 `dist/`、Docker 镜像等作为 Artifact 上传，下游 Job 直接下载，避免重复构建。

4. **缓存失效策略**
   - 采用"lockfile + runner OS"作为 primary key；
   - 设置 restore key（如仅按 `package-lock.json` 的前缀）提高命中率；
   - 定期清理过期缓存，防止存储膨胀。

**评分维度**：
- 缓存对象识别（30%）：是否知道依赖缓存和构建缓存的区别
- key 设计（30%）：是否理解基于 lockfile 的缓存失效
- 工具实践（25%）：是否提到 Turborepo Remote Cache、pnpm store 等
- 可维护性（15%）：是否提到缓存清理和 restore key

**常见错误**：
- 缓存 key 用分支名，导致不同 PR 互相污染
- 只缓存 `node_modules` 但忽略包管理器自身缓存目录
- 缓存命中后不做校验，导致旧依赖被错误使用

**延伸追问**：
- Remote Cache 命中率为 0 时，你会如何排查？
- 缓存文件过大导致上传下载比重新构建还慢，怎么办？

**相关题目**：
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线](#FB-12-EN-A-001)
- [FB-12-EN-P-003 如何优化前端 CI/CD 构建流水线的性能](#FB-12-EN-P-003)

**参考资源**：
- [GitHub Actions - Caching dependencies](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [Turborepo - Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)

**口头回答版**：
> CI/CD 缓存主要分两块：依赖安装缓存和构建缓存。依赖缓存要锁 lockfile，比如用 `pnpm-lock.yaml` 做 key，lockfile 一变就失效；构建缓存可以缓存 `.turbo`、Vite 或 ESLint 的 cache。Turborepo 的 Remote Cache 能让不同 Job 共享缓存。还要注意产物传递，一次 build 上传 artifact，下游直接下载，不要重复构建。key 设计不好会污染缓存或命中率低，需要 restore key 和定期清理。

---

### FB-12-CO-B-010：什么是 Trunk-Based Development？它与 Git Flow 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：分支策略、Trunk-Based Development、Git Flow、持续集成
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 Trunk-Based Development（主干开发）的核心思想，并比较它与 Git Flow 在分支模型和发布节奏上的差异。

**参考答案**：

**Trunk-Based Development**：所有开发者都向单一主干（trunk/main）频繁提交代码，分支生命周期很短（通常不超过一天），通过特性开关控制未完成的代码。

**Git Flow**：采用长期分支模型，包含 `main`、`develop`、`feature`、`release`、`hotfix` 等分支，适合固定版本发布节奏。

| 维度 | Trunk-Based Development | Git Flow |
|------|-------------------------|----------|
| 分支数量 | 少，主干为主 | 多，长期分支并存 |
| 提交频率 | 高频，一天多次 | 相对较低 |
| 集成冲突 | 小步快跑，冲突少 | 合并时冲突可能较多 |
| 适合发布 | 持续交付/持续部署 | 计划版本发布 |
| 特性开关 | 常用 | 不一定 |

**选型建议**：
- 团队规模较小、追求持续交付时，优先 Trunk-Based。
- 需要严格版本节奏、多版本并行维护时，可考虑 Git Flow 或其变体。

**评分维度**：
- 概念准确性（40%）：能否说清主干开发和短生命周期分支
- 对比分析（40%）：能否从分支、频率、冲突、发布维度比较
- 选型能力（20%）：能否结合场景给出建议

**常见错误**：
- 把 Trunk-Based 等同于"所有人都直接 push 到 main"
- 认为 Git Flow 一定比 Trunk-Based 更安全，忽略分支合并风险

**延伸追问**：
- 你们的分支策略更接近哪一种？遇到过哪些痛点？
- 在 Trunk-Based 中，未完成的代码如何不影响生产？

**相关题目**：
- [FB-12-EN-A-007 特性开关如何与 CI/CD 结合](#FB-12-EN-A-007)
- [FB-12-CP-R-004 如何在持续交付中平衡发布速度与稳定性](#FB-12-CP-R-004)

**参考资源**：
- [Trunk-Based Development](https://trunkbaseddevelopment.com/)
- [Atlassian - Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

**口头回答版**：
> Trunk-Based Development 就是大家都往主干频繁提交，分支很短命，一般不超过一天，没做完的功能用特性开关藏着。Git Flow 则是长期分支，feature、release、hotfix 都有，适合固定发版节奏。Trunk-Based 更适合持续交付，冲突少；Git Flow 适合需要多版本维护的项目。选型要看团队规模和发布节奏。

---

### FB-12-EN-B-011：CI/CD 中的 Matrix Build 有什么作用？前端如何应用？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：GitHub Actions、Matrix、多浏览器测试、Node 版本
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 CI/CD 中 Matrix Build 的作用，并举例说明前端项目可以如何利用它提升测试覆盖率。

**参考答案**：

**Matrix Build** 允许同一份 Job 定义在多个维度上并行执行，例如不同操作系统、Node.js 版本、浏览器等。

前端常见应用场景：

1. **多 Node 版本验证**：确保代码在 Node 18/20/22 上都能构建和测试。
2. **多浏览器 E2E**：在 Chromium、Firefox、WebKit 上并行运行 Playwright。
3. **多包管理器**：同时验证 npm、yarn、pnpm 的安装结果。

示例（GitHub Actions）：

```yaml
strategy:
  matrix:
    node: [18, 20, 22]
    os: [ubuntu-latest, windows-latest]
runs-on: $&#123;&#123; matrix.os &#125;&#125;
steps:
  - uses: actions/setup-node@v4
    with:
      node-version: $&#123;&#123; matrix.node &#125;&#125;
  - run: npm ci
  - run: npm test
```

**注意事项**：
- 矩阵组合数量会线性增加 CI 时间和成本，需合理裁剪。
- 不同维度的失败应独立报告，避免互相阻塞。

**评分维度**：
- 概念理解（30%）：能否说明 Matrix 的并行维度思想
- 前端场景（40%）：是否提到 Node 版本、浏览器、包管理器
- 成本意识（20%）：是否知道矩阵组合会膨胀
- 配置示例（10%）：能否写出基本 matrix 语法

**常见错误**：
- 矩阵维度过多导致 CI 耗时激增
- 把本可在单 Job 完成的步骤拆成矩阵，浪费资源

**延伸追问**：
- 如果矩阵中某个组合失败率较高，如何单独调试？
- 如何在 GitLab CI 中实现类似的矩阵能力？

**相关题目**：
- [FB-12-EN-B-003 GitHub Actions 的核心概念有哪些](#FB-12-EN-B-003)
- [FB-12-EN-A-011 如何在 CI/CD 中并行化和分片运行 E2E 测试](#FB-12-EN-A-011)

**参考资源**：
- [GitHub Actions - Using a matrix](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)
- [Playwright - Running tests on multiple browsers](https://playwright.dev/docs/browsers)

**口头回答版**：
> Matrix Build 就是把同一个 Job 在多个维度上并行跑，比如 Node 18/20/22、Ubuntu/Windows，或者 Chromium/Firefox。前端常用它来验证多 Node 版本和多浏览器兼容性。配置不复杂，但组合数会爆炸，要注意成本和必要性，不能为了矩阵而矩阵。

---

### FB-12-CO-B-012：什么是部署预览环境（Preview Environment）？它如何提升协作效率？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：部署预览、Preview Environment、PR、协作
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释部署预览环境（Preview Environment / Review Environment）的概念，并说明它在前端协作流程中的价值。

**参考答案**：

**部署预览环境** 是指为每个 Pull Request 或功能分支自动部署的独立运行环境，通常带有唯一 URL，供产品经理、设计师、QA 和开发快速验收。

**价值**：

1. **提前验收**：无需等待合并到主干即可查看效果。
2. **降低沟通成本**：通过 URL 直接复现问题，减少截图和文字描述。
3. **自动化**：与 CI/CD 集成，PR 打开自动创建，合并或关闭后自动销毁。
4. **隔离性**：每个 PR 有独立环境，避免互相影响。

**常见实现**：
- Vercel / Netlify / Cloudflare Pages 的 Deploy Preview。
- GitHub Environments + 自建脚本。
- Kubernetes namespace per PR。

**评分维度**：
- 概念理解（40%）：能否说明 preview env 是一次性的 PR 环境
- 协作价值（30%）：是否提到提前验收和降低沟通成本
- 生命周期（20%）：是否知道自动创建和销毁
- 工具认知（10%）：能否列举常见平台

**常见错误**：
- 把预览环境等同于固定测试环境
- 忽略预览环境的数据源和 Secrets 隔离

**延伸追问**：
- 预览环境访问后端服务时，如何防止污染正式数据？
- 如果每个 PR 都创建预览环境，成本如何控制？

**相关题目**：
- [FB-12-EN-A-014 如何设计前端项目部署到 CDN/OSS 的 CI/CD 流水线](#FB-12-EN-A-014)
- [FB-12-EN-A-016 如何为每个 PR 自动创建和销毁预览环境](#FB-12-EN-A-016)

**参考资源**：
- [Vercel - Deploy Previews](https://vercel.com/docs/concepts/deployments/preview-deployments)
- [Netlify - Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/)

**口头回答版**：
> 部署预览环境就是每个 PR 或分支自动部署一个临时环境，生成一个独立链接。产品经理、设计师和 QA 可以直接点开看效果，不用等合并。它能提前验收、降低沟通成本，PR 关闭后自动销毁。Vercel、Netlify、Cloudflare Pages 都自带这个功能。

---

### FB-12-EN-B-013：CI/CD 中 lockfile 的作用是什么？出现冲突时如何处理？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：lockfile、依赖版本、npm、pnpm、一致性
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `package-lock.json`、`yarn.lock`、`pnpm-lock.yaml` 等 lockfile 在 CI/CD 中的作用，以及当 lockfile 冲突时的处理策略。

**参考答案**：

**lockfile 的作用**：

1. **锁定依赖版本**：记录依赖树中每个包的精确版本和校验信息，保证本地、CI、生产安装结果一致。
2. **可复现构建**：同样的 lockfile 在不同时间、不同机器上得到相同的 `node_modules`。
3. **加速 CI**：CI 可以直接基于 lockfile 安装，无需解析依赖范围。
4. **安全审计**：便于追踪引入了哪些包及其来源。

**冲突处理策略**：

1. **优先接受一方的 lockfile 并重新生成**：
   ```bash
   git checkout --theirs pnpm-lock.yaml
   pnpm install --lockfile-only
   ```
2. **CI 校验 lockfile 一致性**：
   - `pnpm install --frozen-lockfile`：如果 lockfile 与 `package.json` 不匹配会直接失败。
3. **避免手动编辑 lockfile**：应通过包管理器重新生成。
4. **小步合并**：频繁同步主干，减少大规模依赖冲突。

**评分维度**：
- lockfile 作用理解（40%）：能否说明版本锁定和可复现性
- 冲突处理（35%）：是否知道重新生成和 frozen-lockfile
- CI 一致性（15%）：是否理解 CI 应使用 frozen-lockfile
- 安全意识（10%）：是否提到不要手工改 lockfile

**常见错误**：
- 删除 lockfile 重新安装，破坏版本一致性
- 手动合并 lockfile 的 diff，导致校验失败
- 在 CI 中使用 `npm install` 而不是 `npm ci`

**延伸追问**：
- 如果 lockfile 与 `package.json` 不一致，CI 应该直接失败还是自动修复？
- pnpm 的 lockfile 和 npm 的 lockfile 在信息粒度上有什么不同？

**相关题目**：
- [FB-12-EN-B-002 什么是 Pipeline as Code](#FB-12-EN-B-002)
- [FB-12-EN-P-012 如何在大型团队统一和治理 npm/yarn/pnpm 在 CI 中的使用](#FB-12-EN-P-012)

**参考资源**：
- [npm - package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- [pnpm - lockfile](https://pnpm.io/git#lockfiles)

**口头回答版**：
> lockfile 就是把依赖树锁定下来，保证每个人、每台机器、CI 安装出来的 `node_modules` 一模一样。冲突时不要手改，最好接受一方的 lockfile 再用包管理器重新生成，比如 `pnpm install --lockfile-only`。CI 里要用 `npm ci` 或 `pnpm install --frozen-lockfile`，不一致直接失败，不要自动修复。

---

### FB-12-EN-B-014：前端项目在 CI/CD 中如何安全地注入环境变量？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：环境变量、Secrets、构建时配置、运行时配置
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明前端项目在 CI/CD 流水线中注入环境变量的常见方式，并区分公开变量与敏感变量的处理策略。

**参考答案**：

**环境变量分类**：

1. **公开变量**：如 `VITE_API_BASE_URL`、`PUBLIC_ANALYTICS_ID`，可在构建时注入并打包到产物中。
2. **敏感变量**：如 API Key、Token、数据库密码，必须避免泄露到产物或日志。

**注入方式**：

1. **CI 平台变量**：
   - GitHub Actions：`env` 或 `secrets.*`
   - GitLab CI：`variables` 或受保护变量
   - Jenkins：Credentials 插件
2. **构建时注入**：
   ```bash
   VITE_API_URL=https://api.example.com npm run build
   ```
3. **运行时注入**：
   - 前端通过 `window.__APP_CONFIG__` 或 `/config.json` 在运行时读取，不写入构建产物。
   - 适合需要同一产物多环境部署的场景。

**安全注意事项**：

- 不要把 `.env.production` 提交到仓库。
- 敏感变量只出现在 CI 执行环境中，不在浏览器控制台暴露。
- 使用 `envsubst` 或模板替换时，注意避免意外打印到日志。

**评分维度**：
- 分类意识（30%）：能否区分公开变量与敏感变量
- 注入方式（30%）：是否知道 CI 变量、构建时、运行时三种方式
- 安全实践（30%）：是否提到不提交 .env、不泄露到产物
- 场景匹配（10%）：能否说明何时用构建时、何时用运行时

**常见错误**：
- 把生产 API Key 写进前端代码并打包
- 在 `.env` 文件里保存密码并提交
- 认为所有变量都可以 runtime 注入，忽略 SSR 构建时也需要部分变量

**延伸追问**：
- 如果同一产物要部署到 staging 和 prod，环境变量应该怎么处理？
- SSR 项目构建时和运行时都需要同一份变量，如何平衡？

**相关题目**：
- [FB-12-EN-A-008 CI/CD 中的 Secrets 管理有哪些最佳实践](#FB-12-EN-A-008)
- [FB-12-EN-P-001 如何设计一套环境晋升策略](#FB-12-EN-P-001)

**参考资源**：
- [Vite - Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub - Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

**口头回答版**：
> 前端环境变量分公开和敏感两类。公开的比如 API 地址可以构建时注入，打到产物里；敏感的比如 Token 绝对不能进仓库或产物。CI 平台都有变量和 Secrets 机制。更好的做法是把环境相关配置运行时注入，比如通过 `config.json` 或 `window.__APP_CONFIG__`，这样一份产物可以部署多环境。关键是别把 `.env.production` 提交。

---

### FB-12-CO-B-015：语义化版本（SemVer）在前端发布中如何应用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：SemVer、版本管理、发布、changelog
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释语义化版本（Semantic Versioning）的规则，并说明它在前端库或应用发布流程中的应用。

**参考答案**：

**SemVer 格式**：`MAJOR.MINOR.PATCH`

- **MAJOR**：不兼容的 API 变更。
- **MINOR**：向后兼容的功能新增。
- **PATCH**：向后兼容的问题修复。

**前端应用场景**：

1. **组件库 / 工具库**：严格遵循 SemVer，使用者可以根据版本号判断升级风险。
2. **业务应用**：即使不对外发布 npm 包，也可以给构建产物或 Docker 镜像打 SemVer 标签，便于回滚和追踪。
3. **npm dist-tag**：使用 `latest`、`next`、`beta` 等标签区分稳定版和预发布版。
4. **结合 Changelog**：每次版本升级自动生成变更日志，说明 Breaking Change 和迁移指南。

**示例**：

```json
{
  "name": "@my/ui-kit",
  "version": "2.3.1"
}
```

**评分维度**：
- SemVer 规则理解（40%）：能否准确解释 MAJOR/MINOR/PATCH
- 应用能力（30%）：是否提到组件库、业务应用、dist-tag
- 与 CI/CD 结合（20%）：是否说明自动生成版本和 changelog
- 风险意识（10%）：是否提到 Breaking Change 的迁移说明

**常见错误**：
- 每次改动都升 MAJOR，导致版本号快速膨胀
-  Breaking Change 没有升级 MAJOR
- 忽略预发布版本标签的使用

**延伸追问**：
- 一个 Bug 修复同时改了 API 签名，版本号应该怎么升？
- 你们团队如何自动化生成 changelog？

**相关题目**：
- [FB-12-SD-R-005 如何设计企业级前端制品管理与发布火车](#FB-12-SD-R-005)
- [FB-12-EN-P-014 如何为 Monorepo 设计自动化版本发布和 Changelog 生成](#FB-12-EN-P-014)

**参考资源**：
- [SemVer 官方规范](https://semver.org/lang/zh-CN/)
- [npm - dist-tag](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag)

**口头回答版**：
> SemVer 就是 `MAJOR.MINOR.PATCH`，主版本不兼容，次版本加功能，修订版修 bug。前端组件库要严格遵循，业务应用也可以给镜像或产物打 SemVer 标签。发布时配合 dist-tag 和 changelog，用户看到版本号就知道风险。Breaking Change 必须升主版本，并写迁移说明。

---

### FB-12-EN-B-016：如何在 CI/CD 中安全地实现自动化依赖更新？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：依赖更新、Renovate、Dependabot、安全扫描
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何利用 Dependabot、Renovate 等工具实现自动化依赖更新，并保证更新过程不会影响主干的稳定性。

**参考答案**：

**核心流程**：

1. **扫描依赖**：工具定期检查 `package.json`、lockfile、Dockerfile 中的依赖版本。
2. **创建 PR**：发现新版本后自动创建 Pull Request，附带变更日志和安全影响说明。
3. **CI 自动验证**：PR 触发完整的 lint、test、build 流水线。
4. **自动合并策略**：
   - 仅对 patch/minor 且 CI 通过、无重大变更的依赖自动合并；
   - major 版本或 breaking change 需要人工审查。
5. **分组更新**：将同一生态的依赖打包成一个 PR，减少噪音。

**安全与稳定措施**：

- 配置更新时间表，避免发布窗口外大量 PR。
- 对安全漏洞单独高优处理。
- 锁定 registry，防止依赖混淆。
- 保留回滚能力：lockfile 变更可回退。

**常用工具**：Dependabot、Renovate、Snyk。

**评分维度**：
- 工具理解（30%）：是否知道 Dependabot / Renovate 的基本流程
- 安全策略（30%）：是否提到自动合并限制、安全更新优先
- CI 集成（20%）：是否强调必须通过完整测试才能合并
- 噪音控制（20%）：是否提到分组、定时、ignore 列表

**常见错误**：
- 所有依赖都自动合并，导致 major 版本破坏构建
- 忽略 lockfile 更新，只改 package.json
- 没有回滚计划，一旦出问题只能手动排查

**延伸追问**：
- 如果某个依赖的 patch 更新导致测试失败，你会怎么处理？
- 自动合并和 CODEOWNERS 怎么配合？

**相关题目**：
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全](#FB-12-EN-P-007)
- [FB-12-EN-B-013 CI/CD 中 lockfile 的作用是什么](#FB-12-EN-B-013)

**参考资源**：
- [Renovate 官方文档](https://docs.renovatebot.com/)
- [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot)

**口头回答版**：
> 用 Dependabot 或 Renovate 自动扫描依赖并提 PR，PR 里要跑完整 CI。可以设置只有 patch 和 minor 才自动合并，major 版本必须人工审。分组更新能减少 PR 噪音，还要单独处理安全漏洞。关键是 lockfile 也要一起更新，出问题要能回滚。

---

## 进阶题（17 道）{#advanced}

### FB-12-EN-A-001：如何在 GitHub Actions 中为前端 Monorepo 设计一条合理的 CI/CD 流水线？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：GitHub Actions、Monorepo、Turborepo、Nx、变更检测、缓存
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
假设一个前端 Monorepo 项目使用 pnpm workspace + Turborepo，请设计一条 GitHub Actions 流水线，要求：安装依赖、类型检查、Lint、测试、构建，并且只对发生变更的子包执行相关任务。

**参考答案**：

核心思路：

1. **检出代码**：使用 `actions/checkout@v4`，默认 shallow clone 即可；若需基于 `main` 分支 diff 计算变更，可拉取完整历史或 fetch-depth=0。
2. **安装依赖**：使用 `pnpm/action-setup` 安装 pnpm，并通过 `actions/setup-node@v4` 设置 Node 版本和缓存 `pnpm-lock.yaml`。
3. **变更检测**：使用 `dorny/paths-filter` 或 `nx affected` / `turbo run` 的 `--filter` 能力。
4. **任务编排**：
   - `pnpm lint --filter [HEAD~1]` 或 `turbo run lint --filter=...[origin/main]`
   - `turbo run type-check test build --filter=...[origin/main]`
5. **产物上传**：构建产物通过 `actions/upload-artifact` 暂存，供部署 Job 使用。
6. **并行与缓存**：启用 Turborepo Remote Cache 或 GitHub Actions Cache 缓存 `node_modules/.cache/turbo`。

```yaml
name: Monorepo CI
on:
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo run lint type-check test build --filter=...[origin/main]
```

最佳实践：

- 使用 `--filter=...[origin/main]` 只对受影响的包执行。
- 在 CI 中开启 Turborepo Remote Cache 复用缓存。
- 对关键任务设置 `needs` 或统一 job，避免扇出过复杂。

**评分维度**：
- Monorepo 理解（30%）：是否理解变更检测和受影响的包
- GitHub Actions 配置（30%）：能否写出合理的 workflow
- 缓存与性能（25%）：是否提到依赖缓存和构建缓存
- 可维护性（15%）：是否考虑 lint/test/build 的编排顺序

**常见错误**：
- 每次都对整个 Monorepo 全量构建，浪费 CI 资源
- 忽略 `fetch-depth: 0`，导致 affected 无法正确计算
- 未将 `node_modules` 或 turbo cache 缓存，导致安装时间过长

**延伸追问**：
- 如果 Monorepo 中某个包被 80% 的包依赖，变更它时如何控制 CI 时间？
- Turborepo Remote Cache 的缓存命中率受哪些因素影响？

**相关题目**：
- [FB-12-EN-P-003 如何优化前端 CI/CD 构建流水线的性能？](#FB-12-EN-P-003)
- [FB-12-SD-R-003 如何为微前端设计 CI/CD 流水线？](#FB-12-SD-R-003)

**参考资源**：
- [Turborepo CI 集成](https://turbo.build/repo/docs/ci)
- [GitHub Actions 缓存](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)

**口头回答版**：
> 检出代码：使用 actions/checkout@v4，默认 shallow clone 即可；若需基于 main 分支 diff 计算变更，可拉取完整历史或 fetch-depth=0。 安装依赖：使用 pnpm/action-setup 安装 pnpm，并通过 actions/setup-node@v4 设置 Node 版本和缓存 pnpm-lock.yaml。 变更检测：使用 dorny/paths-filter 或 nx affected / turbo run 的 --filter 能力。 - pnpm lint --filter [HEAD~1] 或 turbo run lint --filter=...[origin/main]

---

### FB-12-EN-A-002：如何为前端项目设计一条完整的 GitLab CI 流水线？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：GitLab CI、.gitlab-ci.yml、缓存、产物、部署
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请为一个典型前端项目（React/Vue + npm）设计一条 GitLab CI 流水线，包含依赖安装、Lint、单元测试、构建、产物保存和部署，并说明如何实现环境隔离。

**参考答案**：

```yaml
image: node:20-alpine

stages:
  - install
  - validate
  - build
  - deploy

variables:
  NPM_CONFIG_CACHE: ${CI_PROJECT_DIR}/.npm

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/

install-deps:
  stage: install
  script:
    - npm ci

lint:
  stage: validate
  needs: [install-deps]
  script:
    - npm run lint

unit-test:
  stage: validate
  needs: [install-deps]
  script:
    - npm run test:ci
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'

build:
  stage: build
  needs: [install-deps]
  script:
    - npm run build
  artifacts:
    name: "$CI_JOB_NAME-$CI_COMMIT_REF_NAME"
    paths:
      - dist/
    expire_in: 1 week

deploy-staging:
  stage: deploy
  needs: [build, lint, unit-test]
  environment:
    name: staging
    url: https://staging.example.com
  script:
    - npm run deploy:staging
  only:
    - develop

deploy-prod:
  stage: deploy
  needs: [build, lint, unit-test]
  environment:
    name: production
    url: https://www.example.com
  script:
    - npm run deploy:prod
  when: manual
  only:
    - main
```

设计要点：

1. **Stage 划分**：install → validate → build → deploy，保证逻辑清晰。
2. **缓存策略**：缓存 `node_modules` 和 npm cache，按分支作为 key。
3. **产物传递**：`build` 产物通过 `artifacts` 传递给部署 Job。
4. **环境隔离**：通过 `environment` 和分支保护区分 staging/production；生产部署使用 `when: manual` 控制。
5. **依赖控制**：使用 `needs` 减少等待时间，实现 DAG 编排。

**评分维度**：
- 流水线完整性（30%）：是否覆盖安装/验证/构建/部署
- GitLab CI 特性使用（30%）：是否正确使用 stages/cache/artifacts/environment/needs
- 环境隔离与安全（25%）：是否区分 staging/prod，并设置人工审批
- 性能优化意识（15%）：是否使用缓存和 needs 缩短流水线时间

**常见错误**：
- 未使用 `artifacts` 导致每个 Job 都重复构建
- 生产部署未设置分支保护或人工审批
- 缓存 key 设置不当，导致不同分支/PR 共享缓存引发问题

**延伸追问**：
- 如果需要在不同环境注入不同的 `.env` 文件，你会怎么做？
- 如何实现仅当 PR 合并到 main 时才自动部署生产？

**相关题目**：
- [FB-12-EN-B-004 GitLab CI 的核心概念有哪些？](#FB-12-EN-B-004)
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线？](#FB-12-EN-A-001)

**参考资源**：
- [GitLab CI/CD YAML 参考](https://docs.gitlab.com/ee/ci/yaml/)

**口头回答版**：
> Stage 划分：install → validate → build → deploy，保证逻辑清晰。 缓存策略：缓存 node_modules 和 npm cache，按分支作为 key。 产物传递：build 产物通过 artifacts 传递给部署 Job。 环境隔离：通过 environment 和分支保护区分 staging/production；生产部署使用 when: manual 控制。

---

### FB-12-EN-A-003：如何为前端项目配置 Jenkins 多分支流水线（Multibranch Pipeline）？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：Jenkins、Multibranch Pipeline、Jenkinsfile、分支策略、Webhook
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明如何为前端项目配置 Jenkins Multibranch Pipeline，使其能够自动为每个分支和 PR 创建独立流水线，并在合并后自动清理。

**参考答案**：

**Multibranch Pipeline** 是 Jenkins 的一种项目类型，它会扫描代码仓库中的所有分支和 PR，为每个分支自动创建一条独立的 Pipeline，并在分支被删除后自动清理。

配置步骤：

1. **新建 Multibranch Pipeline 项目**：在 Jenkins 中选择 "Multibranch Pipeline"。
2. **配置源码仓库**：添加 Git 仓库地址和凭证，设置分支发现规则（Discover branches、Discover pull requests）。
3. **Jenkinsfile 位置**：默认读取仓库根目录的 `Jenkinsfile`。
4. **触发方式**：配置 Webhook 或轮询（Scan Repository Triggers）自动检测分支变化。
5. **清理策略**：启用 "Orphaned Item Strategy"，在分支删除后自动清理旧的 Pipeline 记录。

示例 Jenkinsfile：

```groovy
pipeline {
    agent { docker 'node:20-alpine' }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Lint & Test') {
            parallel {
                stage('Lint') {
                    steps { sh 'npm run lint' }
                }
                stage('Test') {
                    steps { sh 'npm run test:ci' }
                }
            }
        }
        stage('Build') {
            steps { sh 'npm run build' }
        }
        stage('Deploy Preview') {
            when {
                changeRequest()
            }
            steps {
                sh 'npm run deploy:preview'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
```

设计要点：

- 使用 Docker agent 保证构建环境一致。
- 使用 `parallel` 并行执行 Lint 和 Test。
- `changeRequest()` 用于 PR 预览部署。
- `cleanWs()` 清理工作空间，避免磁盘占用。

**评分维度**：
- Multibranch 概念（30%）：能否解释自动发现分支/PR 和自动清理
- Jenkinsfile 配置（30%）：能否写出合理 Pipeline
- 分支策略（20%）：是否区分 feature / main / PR
- 环境一致性（20%）：是否使用 Docker agent 或指定 Node 版本

**常见错误**：
- 使用普通 Pipeline 项目，手动为每个分支创建 Job
- 未配置 orphaned item strategy，导致废弃分支 Pipeline 堆积
- 在 Jenkinsfile 中 hard code 敏感信息

**延伸追问**：
- 如何限制 Jenkinsfile 的修改权限，防止恶意 PR 执行危险脚本？
- Jenkins Shared Library 在 Multibranch Pipeline 中如何使用？

**相关题目**：
- [FB-12-EN-B-005 Jenkins Pipeline 的核心概念有哪些？](#FB-12-EN-B-005)

**参考资源**：
- [Jenkins Multibranch Pipeline](https://www.jenkins.io/doc/book/pipeline/multibranch/)

**口头回答版**：
> Multibranch Pipeline 是 Jenkins 的一种项目类型，它会扫描代码仓库中的所有分支和 PR，为每个分支自动创建一条独立的 Pipeline，并在分支被删除后自动清理。 新建 Multibranch Pipeline 项目：在 Jenkins 中选择 "Multibranch Pipeline"。 配置源码仓库：添加 Git 仓库地址和凭证，设置分支发现规则（Discover branches、Discover pull requests）。 Jenkinsfile 位置：默认读取仓库根目录的 Jenkinsfile。

---

### FB-12-EN-A-004：几种常见的部署策略有什么区别？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：部署策略、滚动部署、蓝绿部署、金丝雀发布、重建部署
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较滚动部署（Rolling Deployment）、重建部署（Recreate Deployment）、蓝绿部署（Blue-Green Deployment）和金丝雀发布（Canary Release）的特点、适用场景和前端实现要点。

**参考答案**：

| 策略 | 原理 | 优点 | 缺点 | 适用场景 |
|------|------|------|------|----------|
| **Recreate** | 先停掉旧版本，再启动新版本 | 简单，资源占用低 | 有停机时间 | 开发环境、低频发布 |
| **Rolling** | 逐个/批次替换实例 | 无整体停机，资源占用稳定 | 发布期间同时存在两个版本 | 常规后端服务 |
| **Blue-Green** | 同时部署两套环境，通过流量切换实现发布 | 零停机，可秒级回滚 | 资源成本翻倍 | 对可用性要求高的应用 |
| **Canary** | 先让少量用户访问新版本，再逐步扩大 | 风险可控，可实时监控 | 需要流量控制能力 | 大规模用户、需要灰度验证 |

**前端实现要点**：

- **Blue-Green**：通常通过 CDN 切换入口 HTML 路径或负载均衡切换域名；需要确保新旧版本接口兼容。
- **Canary**：可通过 Nginx/网关按用户 ID / Cookie / Header 分流量，或使用 LaunchDarkly、Unleash 等特性开关实现用户级灰度。
- **Rolling**：对静态资源意义较小，前端通常通过文件名哈希保证新旧资源不冲突。

**评分维度**：
- 策略区分（50%）：能否清晰对比 4 种策略
- 优缺点分析（30%）：能否结合资源、停机、风险分析
- 前端落地能力（20%）：是否提到静态资源、CDN、灰度

**常见错误**：
- 把 Blue-Green 和 Canary 混为一谈
- 忽略前端静态资源长期缓存导致的新旧版本资源不一致问题

**延伸追问**：
- 前端项目做蓝绿部署时，如何保证用户不会加载到旧版本的 JS/CSS？
- 金丝雀发布失败时，如何快速回滚？

**相关题目**：
- [FB-12-EN-A-005 蓝绿部署的原理和前端注意事项](#FB-12-EN-A-005)
- [FB-12-EN-A-006 金丝雀发布的原理和实现要点](#FB-12-EN-A-006)

**参考资源**：
- [Martin Fowler - BlueGreenDeployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Martin Fowler - CanaryRelease](https://martinfowler.com/bliki/CanaryRelease.html)

**口头回答版**：
> | 策略 | 原理 | 优点 | 缺点 | 适用场景 | |------|------|------|------|----------| | Recreate | 先停掉旧版本，再启动新版本 | 简单，资源占用低 | 有停机时间 | 开发环境、低频发布 | | Rolling | 逐个/批次替换实例 | 无整体停机，资源占用稳定 | 发布期间同时存在两个版本 | 常规后端服务 |

---

### FB-12-EN-A-005：蓝绿部署的原理是什么？前端项目做蓝绿部署需要注意什么？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：蓝绿部署、零停机、流量切换、静态资源、回滚
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释蓝绿部署的原理，并说明前端项目在做蓝绿部署时需要特别注意的问题。

**参考答案**：

**原理**：

蓝绿部署同时维护两套完全相同的生产环境：

- **蓝色环境（Blue）**：当前对外提供服务的稳定版本。
- **绿色环境（Green）**：部署新版本，验证通过后通过流量切换（如负载均衡、DNS、CDN 配置）将用户请求切到绿色环境。

如果绿色环境出现问题，可以立即切回蓝色环境，实现快速回滚。

**前端注意事项**：

1. **静态资源隔离**：蓝绿两套环境应使用不同的资源路径或文件名（通过构建时 hash），避免浏览器缓存旧版本 JS/CSS。
2. **入口 HTML 一致性**：用户访问的入口 HTML 必须与新版本资源对应，切换时应同时切换 HTML 和静态资源。
3. **API 兼容性**：新版本前端可能依赖新接口，发布期间需要保证 API 向后兼容。
4. **Session/状态同步**：如果前端状态依赖服务端 Session，两套环境应共享状态存储。
5. **数据兼容性**：避免两套环境同时写入导致数据不一致（前端较少涉及，但需关注）。
6. **长连接/WebSocket**：切换环境时需要优雅断开和重连。

**评分维度**：
- 原理理解（40%）：能否清晰描述蓝绿两套环境和切换过程
- 前端特有问题（40%）：是否提到静态资源、缓存、入口 HTML
- 回滚能力（20%）：是否理解秒级回滚的核心价值

**常见错误**：
- 认为蓝绿部署就是把新版本直接替换旧版本
- 忽略静态资源缓存导致切换后页面白屏或报错

**延伸追问**：
- 蓝绿部署的资源成本是双倍的，如何在成本和可用性之间权衡？
- 如果新版本需要修改数据库 Schema，蓝绿部署还能用吗？

**相关题目**：
- [FB-12-EN-A-004 几种常见的部署策略有什么区别？](#FB-12-EN-A-004)
- [FB-12-EN-A-006 金丝雀发布的原理和实现要点](#FB-12-EN-A-006)

**参考资源**：
- [AWS - Blue/Green Deployments](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/blue-green-deployments.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-A-006：金丝雀发布（Canary Release）的原理是什么？如何实现和观测？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：金丝雀发布、灰度发布、流量切分、指标观测、Kill Switch
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释金丝雀发布的原理，并说明前端项目中如何实现灰度流量切分、如何观测灰度效果以及在出现问题时如何快速止损。

**参考答案**：

**原理**：

金丝雀发布是指将新版本先暴露给一小部分用户，验证稳定后再逐步扩大流量比例，直到全量发布。相比蓝绿部署，它的风险更小、粒度更细。

**前端实现方式**：

1. **网关/负载均衡层切分**：根据 Cookie、Header、用户 ID 取模或地域将部分流量路由到新版。
2. **CDN 层切分**：通过 CDN 边缘脚本或配置让部分请求返回新版 HTML。
3. **特性开关（Feature Flags）**：在代码中通过开关控制新功能对哪些用户可见，实现更细粒度的灰度。

**观测指标**：

- 错误率 / JS Error 数
- 页面加载性能（LCP、FCP、TTI）
- 核心业务指标（转化率、点击率）
- 自定义埋点事件

**止损手段（Kill Switch）**：

- 通过配置中心或特性开关平台一键关闭新功能。
- 通过网关快速回切流量到旧版本。
- 使用 Service Worker 或 CDN 刷新缓存。

**评分维度**：
- 原理理解（30%）：能否解释渐进式扩量
- 实现方式（35%）：是否提到网关/CDN/特性开关
- 观测与止损（35%）：是否提到关键指标和 Kill Switch

**常见错误**：
- 把金丝雀发布等同于 A/B 测试
- 只关注流量比例，忽略业务指标和错误监控

**延伸追问**：
- 金丝雀发布和 A/B 测试有什么区别？
- 如何决定何时从 5% 扩量到 50% 再到 100%？

**相关题目**：
- [FB-12-EN-A-007 特性开关如何与 CI/CD 结合？](#FB-12-EN-A-007)
- [FB-12-EN-A-005 蓝绿部署的原理和前端注意事项](#FB-12-EN-A-005)

**参考资源**：
- [Martin Fowler - CanaryRelease](https://martinfowler.com/bliki/CanaryRelease.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-A-007：特性开关（Feature Flags）如何与 CI/CD 结合？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：特性开关、Feature Flag、灰度、持续交付、解耦发布
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释特性开关在前端 CI/CD 中的作用，并说明如何正确使用特性开关实现"功能提交"与"功能发布"解耦。

**参考答案**：

**特性开关** 是一种在运行时通过配置控制功能可见性的技术，允许代码已经合并并部署，但功能对默认用户隐藏。

**与 CI/CD 的结合**：

1. **解耦代码提交与功能发布**：功能代码可以持续合并到主干，避免长期分支，降低集成风险。
2. **支持持续部署**：即使功能未完全完成，只要默认关闭开关，就不会影响生产用户。
3. **支持灰度发布**：通过开关控制新功能对哪些用户/环境开放。
4. **快速回滚**：功能异常时直接关闭开关，无需重新部署。

**使用方式**：

```js
import { isEnabled } from './feature-flags';

function Checkout() {
  return (
    <div>
      <Cart />
      {isEnabled('new-payment-flow') && <NewPayment />}
    </div>
  );
}
```

**注意事项**：

- 及时清理过期开关，避免代码中开关泛滥。
- 对开关本身做监控和告警，防止异常关闭/开启。
- 开关配置变更应具备审计和版本控制。

常见工具：LaunchDarkly、Unleash、Flagsmith、自研配置中心。

**评分维度**：
- 概念理解（30%）：能否说明特性开关的本质
- 与 CI/CD 结合价值（40%）：能否说出解耦、灰度、回滚等价值
- 实践注意（30%）：是否提到开关清理、监控、配置管理

**常见错误**：
- 把特性开关当成简单的 if/else，不做集中管理
- 上线后忘记清理开关，导致技术债务累积

**延伸追问**：
- 如何保证特性开关在 SSR 和 CSR 环境下的行为一致？
- 如果开关服务宕机，前端应该如何降级？

**相关题目**：
- [FB-12-EN-A-006 金丝雀发布的原理和实现要点](#FB-12-EN-A-006)
- [FB-12-SD-R-001 如何设计基于 GitOps 的前端持续交付系统？](#FB-12-SD-R-001)

**参考资源**：
- [Martin Fowler - Feature Toggle](https://martinfowler.com/articles/feature-toggles.html)

**口头回答版**：
> 特性开关 是一种在运行时通过配置控制功能可见性的技术，允许代码已经合并并部署，但功能对默认用户隐藏。 与 CI/CD 的结合： 解耦代码提交与功能发布：功能代码可以持续合并到主干，避免长期分支，降低集成风险。 支持持续部署：即使功能未完全完成，只要默认关闭开关，就不会影响生产用户。

---

### FB-12-EN-A-008：CI/CD 中的 Secrets 管理有哪些最佳实践？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：Secrets、凭据管理、GitHub Secrets、GitLab CI Variables、Vault
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 CI/CD 流水线中常见的 Secrets 类型，并给出安全管理的最佳实践。

**参考答案**：

**常见 Secrets 类型**：API Key、Token、数据库密码、SSH 私钥、云平台凭证、签名证书、NPM registry token。

**最佳实践**：

1. **不要硬编码**：禁止将 Secrets 直接写入源码、配置文件或流水线日志。
2. **使用平台提供的 Secrets 管理**：
   - GitHub Actions：`Settings > Secrets and variables > Actions`
   - GitLab CI：`Settings > CI/CD > Variables`
   - Jenkins：`Credentials` 插件
3. **最小权限原则**：每个 Secret 只授予完成当前 Job 所需的最小权限。
4. **环境隔离**：生产、预发、测试使用不同的 Secret 集合。
5. **加密传输与存储**：Secrets 在传输和静态存储时都应加密。
6. **定期轮换**：定期更新 Token 和密钥，降低泄露影响。
7. **审计与告警**：记录 Secret 使用情况，异常访问及时告警。
8. **使用专用 Secrets 管理工具**：如 HashiCorp Vault、AWS Secrets Manager、Azure Key Vault，通过动态凭据或短期 Token 减少泄露风险。
9. **避免在日志中打印 Secrets**：CI 平台通常会自动屏蔽，但仍需注意脚本中不要 `echo $SECRET`。

```yaml
# GitHub Actions 示例
- name: Deploy
  env:
    DEPLOY_TOKEN: $&#123;&#123; secrets.DEPLOY_TOKEN &#125;&#125;
  run: npm run deploy
```

**评分维度**：
- Secrets 类型认知（20%）：能否列举常见 Secret
- 平台能力（30%）：是否了解 GitHub/GitLab/Jenkins 的 Secret 管理
- 安全原则（30%）：是否提到最小权限、轮换、环境隔离
- 工具认知（20%）：是否提到 Vault 等专用工具

**常见错误**：
- 将 `.env.production` 提交到仓库
- 认为 CI 平台自动加密后就无需关注权限和轮换

**延伸追问**：
- 如果怀疑某个 Secret 已经泄露，应该采取哪些紧急措施？
- 如何在本地开发和 CI 中统一管理 Secrets？

**相关题目**：
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全？](#FB-12-EN-P-007)

**参考资源**：
- [GitHub - Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [HashiCorp Vault](https://www.vaultproject.io/)

**口头回答版**：
> 常见 Secrets 类型：API Key、Token、数据库密码、SSH 私钥、云平台凭证、签名证书、NPM registry token。

---

### FB-12-EN-A-009：GitHub Actions 的 concurrency 与 cancel-in-progress 有什么作用？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：GitHub Actions、concurrency、cancel-in-progress、流水线优化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 GitHub Actions 中 `concurrency` 和 `cancel-in-progress` 的作用，并说明它们如何帮助优化 CI 资源使用。

**参考答案**：

`concurrency` 用于限制同一 Workflow 或 Job 的并发执行数量，通常按照分支、PR 或自定义 key 分组。

`cancel-in-progress: true` 表示当新的同类工作流启动时，取消正在运行的旧实例。

**典型场景**：

1. **避免同一分支堆积**：开发者在短时间内多次 push，只有最新一次需要跑完，旧的可以取消。
2. **部署环境互斥**：部署到同一环境时，必须串行执行，避免状态冲突。
3. **资源节约**：减少无意义的 CI 分钟消耗。

示例：

```yaml
concurrency:
  group: $&#123;&#123; github.workflow &#125;&#125;-$&#123;&#123; github.ref &#125;&#125;
  cancel-in-progress: true
```

**注意事项**：
- 部署类 Workflow 谨慎使用 `cancel-in-progress`，避免中断正在进行的发布。
- 分组 key 要保证粒度合适，过大会过度串行，过小会失去控制效果。

**评分维度**：
- 概念理解（30%）：能否解释 concurrency 分组和 cancel-in-progress
- 应用场景（35%）：是否提到 PR 快速迭代、部署互斥
- 风险控制（20%）：是否知道部署场景慎用取消
- 配置能力（15%）：能否写出示例

**常见错误**：
- 对所有 Workflow 都开启 cancel-in-progress，导致部署被中断
- 分组 key 只用工单名，导致不同 PR 互相阻塞
- 忽略并发限制导致 Runner 资源被耗尽

**延伸追问**：
- 如果部署 Workflow 也需要并发控制但不希望取消，应该怎么配置？
- GitLab CI 中有没有类似的能力？

**相关题目**：
- [FB-12-EN-B-003 GitHub Actions 的核心概念有哪些](#FB-12-EN-B-003)
- [FB-12-EN-P-003 如何优化前端 CI/CD 构建流水线的性能](#FB-12-EN-P-003)

**参考资源**：
- [GitHub - Using concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency)

**口头回答版**：
> `concurrency` 用来限制同一组 Workflow 同时跑几个，通常按分支或 PR 分组。`cancel-in-progress` 就是新 push 来的时候把旧的取消掉，省 CI 时间和钱。PR 阶段很适合开，但部署流水线要慎用，别把正在发布的给掐了。key 设计要合适，不能让别人互相等。

---

### FB-12-EN-A-010：自托管 Runner 与云托管 Runner 各有什么优劣？如何选择？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：Runner、自托管 Runner、GitHub Actions、GitLab CI、安全性
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 CI/CD 中自托管 Runner（Self-hosted Runner）和云托管 Runner（Hosted Runner）的优缺点，并给出选型建议。

**参考答案**：

| 维度 | 云托管 Runner | 自托管 Runner |
|------|---------------|---------------|
| 维护成本 | 低，平台负责 | 高，需自行维护机器/镜像 |
| 启动速度 | 每次冷启动 | 可保持 warm，启动快 |
| 网络环境 | 公网，访问内部资源受限 | 可加入内网，访问私有服务 |
| 缓存 | 每次清理或需配置外部缓存 | 可本地保留 warm cache |
| 安全性 | 共享基础设施 | 可隔离、自定义安全策略 |
| 可定制性 | 受平台限制 | 高，可装特定软件和授权 |
| 成本 | 按分钟计费 | 固定基础设施成本 |

**选型建议**：
- 团队规模小、无特殊内部依赖：优先云托管，减少运维。
- 需要访问内网服务、使用大型缓存、或有合规隔离要求：使用自托管。
- 混合模式：常规 CI 用云托管，部署到内网或性能敏感任务用自托管。

**评分维度**：
- 对比维度全面性（35%）：能否从维护、网络、缓存、安全、成本比较
- 场景判断（30%）：能否给出明确选型建议
- 安全意识（20%）：是否提到共享 Runner 的风险和隔离
- 成本意识（15%）：是否理解按量与固定成本差异

**常见错误**：
- 认为自托管 Runner 一定比云托管便宜
- 在自托管 Runner 上以 root 运行所有 Job，忽视权限隔离
- 忽略 Runner 的安全补丁和日志审计

**延伸追问**：
- 自托管 Runner 如何处理不同项目之间的缓存隔离？
- 如果云托管 Runner 访问内网资源，有哪些安全方案？

**相关题目**：
- [FB-12-EN-B-004 GitLab CI 的核心概念有哪些](#FB-12-EN-B-004)
- [FB-12-EN-P-010 如何防止 Pipeline as Code 被恶意 PR 篡改或滥用](#FB-12-EN-P-010)

**参考资源**：
- [GitHub - Self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners)
- [GitLab - Runners](https://docs.gitlab.com/runner/)

**口头回答版**：
> 云托管 Runner 省心、弹性好，但访问内网资源和缓存受限；自托管 Runner 能进内网、保留 warm cache、可定制环境，但要自己维护。小公司用云托管够了，有大缓存、内网依赖或合规要求再上自托管。也可以混着用，常规任务云托管，部署或性能敏感任务自托管。

---

### FB-12-EN-A-011：如何在 CI/CD 中并行化和分片运行 E2E 测试？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：E2E 测试、并行、分片、Playwright、Cypress
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
前端 E2E 测试随着用例增多变得越来越慢，请设计一套在 CI/CD 中并行化和分片运行 E2E 测试的方案。

**参考答案**：

**并行化思路**：

1. **单机多 worker**：Playwright/Cypress 支持同一机器多进程并行执行，适合用例数不多时。
2. **多机分片（Sharding）**：将测试集拆成多份，每个 shard 在独立 Job 上运行。
   ```bash
   npx playwright test --shard=1/4
   npx playwright test --shard=2/4
   ```
3. **按用例时长均衡**：使用历史执行时间数据，把慢用例均匀分布到各 shard。
4. **合并报告**：各 shard 生成 junit/json 报告，最后汇总展示。

**CI 配置要点**：

- 使用 Matrix 生成多个 shard Job。
- 每个 shard 复用同一预览环境或独立的 ephemeral 环境。
- 失败时只重跑对应 shard，减少时间浪费。

**评分维度**：
- 并行策略（30%）：是否提到 worker 和 shard 两层并行
- 分片均衡（25%）：是否考虑用例时长分布
- CI 集成（25%）：是否使用 matrix 和 artifact 汇总报告
- 成本意识（20%）：是否知道 shard 增加会消耗更多 Runner

**常见错误**：
- 所有 E2E 都在单 Job 串行跑，时间过长
- 分片后各 shard 用例数不均，导致整体时间取决于最慢的 shard
- 不同 shard 共享测试数据导致互相干扰

**延伸追问**：
- 如果某个 shard 总是失败，如何快速定位是哪个用例导致？
- 分片后总资源消耗增加，如何在速度和成本间取舍？

**相关题目**：
- [FB-12-CO-B-006 自动化测试在 CI/CD 中的作用是什么](#FB-12-CO-B-006)
- [FB-12-EN-B-011 CI/CD 中的 Matrix Build 有什么作用](#FB-12-EN-B-011)

**参考资源**：
- [Playwright - Sharding](https://playwright.dev/docs/test-sharding)
- [Cypress - Parallelization](https://docs.cypress.io/guides/cloud/smart-orchestration)

**口头回答版**：
> E2E 慢了可以分两层并行：单机多 worker，或者把测试拆成 shard 在多机上跑。Playwright 有 `--shard=1/4` 这种参数。分片要尽量按历史执行时间均摊，不然最慢的 shard 决定总时间。CI 里用 matrix 起多个 Job，最后把报告汇总。要注意 shard 之间数据隔离，别互相影响。

---

### FB-12-EN-A-012：如何在 CI/CD 中集成 Lighthouse CI 与性能预算？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：Lighthouse CI、性能预算、Core Web Vitals、CI/CD
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何在 CI/CD 流水线中集成 Lighthouse CI，并通过性能预算（Performance Budget）防止性能回归。

**参考答案**：

**Lighthouse CI 集成步骤**：

1. **安装依赖**：`npm install -D @lhci/cli`。
2. **配置 `lighthouserc.js`**：
   ```js
   module.exports = {
     ci: {
       collect: { url: ['http://localhost:3000/'], numberOfRuns: 3 },
       assert: {
         assertions: {
           'categories:performance': ['warn', { minScore: 0.9 }],
           'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
           'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
         },
       },
       upload: { target: 'temporary-public-storage' },
     },
   };
   ```
3. **在 CI 中启动服务并运行 Lighthouse**：
   ```yaml
   - run: npm run build && npm run start &
   - run: npx lhci autorun
   ```
4. **设置性能预算**：
   - 分数预算：Lighthouse 总分阈值。
   - 资源预算：JS/CSS 文件大小、图片数量、请求数。
   - Core Web Vitals 预算：LCP、FID/INP、CLS。

**失败处理**：
- 软告警：性能下降先提醒，不阻塞合并。
- 硬阻塞：超过严重阈值直接失败。

**评分维度**：
- Lighthouse CI 配置（30%）：能否写出 lighthouserc 关键配置
- 性能预算维度（30%）：是否覆盖分数、资源、CWV
- 与 CI 集成（25%）：是否知道如何收集和断言
- 策略合理性（15%）：是否区分 warn/error 阈值

**常见错误**：
- 只在本地跑一次 Lighthouse，没有多次取中位数
- 把阈值设得过高，导致所有 PR 都失败
- 忽略环境差异，CI 上的性能分数和真实用户数据不一致

**延伸追问**：
- Lighthouse CI 跑在预览环境还是生产镜像？
- 如何处理 Lighthouse 分数波动导致的误报？

**相关题目**：
- [FB-12-EN-P-005 如何在 CI/CD 中设置有效的质量门禁](#FB-12-EN-P-005)
- [FB-12-EN-A-013 如何在 CI/CD 中监控和控制 Bundle Size](#FB-12-EN-A-013)

**参考资源**：
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web.dev - Performance budgets](https://web.dev/performance-budgets-101/)

**口头回答版**：
> Lighthouse CI 就是跑 Lighthouse 并和预算比较，防止性能回归。CI 里先起服务，然后 `npx lhci autorun`。预算可以设总分、资源大小、Core Web Vitals 阈值。建议分 warn 和 error 两级，别一开始就卡太死，否则团队会抵触。要多次跑取中位数，减少波动。

---

### FB-12-EN-A-013：如何在 CI/CD 中监控和控制 Bundle Size？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：Bundle Size、性能优化、webpack、门禁
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一套在 CI/CD 中监控和控制前端 Bundle Size 的方案，防止包体积无序增长。

**参考答案**：

**监控方案**：

1. **体积分析工具**：webpack-bundle-analyzer、rollup-plugin-visualizer、bundlesize、size-limit。
2. **CI 中生成报告**：每次构建后统计总大小和各 chunk 大小。
3. **与基线对比**：将当前 PR 的大小与 `main` 分支对比，计算增量。
4. **PR 评论**：通过 bot 在 PR 中发布体积变化报告，提升可见性。

**控制手段**：

1. **绝对阈值**：整个应用或单个 chunk 不能超过设定值。
2. **相对阈值**：PR 引入的增量不能超过 5% 或固定 KB。
3. **硬阻塞 vs 软告警**：
   - 超过绝对阈值直接失败；
   - 小幅度增长仅评论提醒，需审批。
4. **分包策略**：合理使用 code splitting、lazy loading，避免单个 chunk 过大。

示例（size-limit）：

```json
[
  {
    "path": "dist/assets/*.js",
    "limit": "200 kB"
  }
]
```

**评分维度**：
- 工具选择（25%）：是否知道常用体积分析工具
- 对比策略（25%）：是否提到与 main 分支基线比较
- 阈值设计（25%）：是否区分绝对、相对、硬阻塞、软告警
- 工程实践（25%）：是否结合 code splitting 等优化手段

**常见错误**：
- 只监控总体积，不拆分 chunk
- 阈值设定不合理，导致正常 PR 频繁失败
- 只告警不追踪，导致体积长期增长

**延伸追问**：
- 如果第三方库导致体积突然增加，如何处理？
- 如何区分 gzip 前后的大小阈值？

**相关题目**：
- [FB-12-EN-P-005 如何在 CI/CD 中设置有效的质量门禁](#FB-12-EN-P-005)
- [FB-12-EN-A-012 如何在 CI/CD 中集成 Lighthouse CI 与性能预算](#FB-12-EN-A-012)

**参考资源**：
- [size-limit](https://github.com/ai/size-limit)
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

**口头回答版**：
> 控制 Bundle Size 要在 CI 里跑分析工具，比如 size-limit 或 webpack-bundle-analyzer，然后和 main 分支比增量。可以设绝对上限，也可以设增量上限，超了直接失败或评论提醒。最好 PR 里自动发报告，让开发者看得见。平时还要配合 code splitting 和 lazy loading，不能光靠门禁。

---

### FB-12-EN-A-014：如何设计前端项目部署到 CDN/OSS 的 CI/CD 流水线？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：CDN、OSS、静态资源、部署、缓存刷新
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请为典型前端 SPA 设计一条部署到 CDN/OSS 的 CI/CD 流水线，要求保证静态资源长期缓存、入口 HTML 可更新、支持回滚。

**参考答案**：

**流水线步骤**：

1. **构建**：生成带 hash 的 JS/CSS 资源（如 `main.a3f2b1.js`）和入口 `index.html`。
2. **上传静态资源到 OSS**：
   - 按版本目录上传（如 `/v1.2.3/`），保留历史版本。
   - 设置 `Cache-Control: public, max-age=31536000, immutable`。
3. **上传入口 HTML**：
   - HTML 引用当前版本资源。
   - 设置 `Cache-Control: no-cache` 或短缓存。
4. **CDN 刷新/预热**：
   - 刷新 HTML 对应的 CDN 路径，确保用户访问新版本。
   - 对关键资源做预热。
5. **回滚**：
   - 切换 HTML 指向旧版本目录，或回滚 OSS 中的 HTML。

**关键设计**：

- 静态资源文件名含 hash，长期缓存不会冲突。
- 先传静态资源再更新 HTML，避免用户拿到新 HTML 却找不到旧资源。
- 保留至少两个版本资源，便于秒级回滚。

**评分维度**：
- 部署流程完整性（30%）：是否覆盖构建、上传、刷新、回滚
- 缓存策略（30%）：是否正确区分 HTML 与静态资源缓存
- 原子性与回滚（25%）：是否理解版本目录和秒级回滚
- 工具熟悉度（15%）：是否提到 S3/OSS/CloudFront/阿里云 CDN 等

**常见错误**：
- 直接覆盖同名静态资源，导致新旧版本混合
- HTML 长期缓存，用户无法获取新版本
- 没有保留历史版本，回滚时需要重新构建

**延伸追问**：
- 如果 CDN 边缘节点刷新失败，用户仍访问旧版本怎么办？
- 多地区部署时，如何保证各地 CDN 同步更新？

**相关题目**：
- [FB-12-EN-A-005 蓝绿部署的原理和前端注意事项](#FB-12-EN-A-005)
- [FB-12-SD-R-002 如何设计零停机全球前端部署方案](#FB-12-SD-R-002)

**参考资源**：
- [AWS - Hosting static website on S3 + CloudFront](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [阿里云 CDN 刷新预热](https://help.aliyun.com/zh/cdn/)

**口头回答版**：
> 前端部署到 CDN/OSS，关键是静态资源长期缓存、HTML 短缓存。构建时给 JS/CSS 加 hash，按版本目录上传到 OSS，HTML 引用这个目录。发布时先传静态资源，再更新 HTML，然后刷新 CDN。回滚就切 HTML 到旧版本目录。千万别覆盖同名静态文件，不然用户会加载到混合资源。

---

### FB-12-EN-A-015：Merge Queue 在 CI/CD 中解决了什么问题？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：Merge Queue、Code Review、分支保护、并发合并
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Merge Queue（合并队列）在 CI/CD 流程中的作用，以及它如何解决"主干变红"的问题。

**参考答案**：

**问题背景**：
多个 PR 各自 CI 通过，但合并到主干后因为互相冲突或语义不兼容导致主干构建失败，俗称"主干变红"。

**Merge Queue 的作用**：

1. **串行化合并**：PR 先进入队列，系统会基于最新主干重新跑 CI，通过后才真正合并。
2. **自动重排**：如果队列中前面的 PR 失败，后面的 PR 会自动基于新的主干重新验证。
3. **批量合并**：部分平台支持把多个 PR 打包一起验证，提高效率。

**收益**：
- 保证合并到 main 的代码一定通过最新基线的完整测试。
- 减少开发者反复 rebase 和等待。

**评分维度**：
- 问题理解（30%）：能否解释主干变红的原因
- 机制理解（35%）：是否说明队列会基于最新主干重跑 CI
- 适用场景（20%）：是否知道高并发合并时最有价值
- 工具认知（15%）：是否提到 GitHub Merge Queue、GitLab Merge Trains

**常见错误**：
- 把 Merge Queue 当成普通的分支保护
- 认为 Merge Queue 会降低合并速度，忽略它可以批量优化
- 小团队低并发场景盲目引入，增加复杂度

**延伸追问**：
- Merge Queue 和分支保护中的 "Require branches to be up to date" 有什么区别？
- 使用 Merge Queue 后，PR 作者还需要手动 rebase 吗？

**相关题目**：
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线](#FB-12-EN-A-001)
- [FB-12-EN-A-009 GitHub Actions 的 concurrency 与 cancel-in-progress 有什么作用](#FB-12-EN-A-009)

**参考资源**：
- [GitHub - Managing merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [GitLab - Merge trains](https://docs.gitlab.com/ee/ci/pipelines/merge_trains.html)

**口头回答版**：
> Merge Queue 解决的是多个 PR 各自都能过，但合到 main 后互相冲突导致主干变红的问题。它让 PR 先排队，系统用最新主干再跑一遍 CI，通过了才真正合并。高并发的大仓库特别有用。GitHub 叫 Merge Queue，GitLab 叫 Merge Train。

---

### FB-12-EN-A-016：如何为每个 PR 自动创建和销毁预览环境？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：Preview Environment、PR、自动化、基础设施
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一套方案，使得前端项目的每个 PR 都能自动创建独立的预览环境，并在 PR 合并或关闭后自动销毁。

**参考答案**：

**方案设计**：

1. **触发条件**
   - PR 打开/更新时创建；
   - PR 关闭或合并时销毁。

2. **环境创建**
   - 静态站点：直接上传到对象存储的独立路径（如 `/preview/pr-123/`）。
   - 需要服务端：使用 Kubernetes namespace、Docker Compose 或 Serverless 函数创建临时实例。
   - 基础设施即代码：Terraform / Pulumi / Crossplane 统一管理。

3. **数据与配置隔离**
   - 使用独立的测试数据库或 schema；
   - 通过环境变量注入 PR 专属配置。

4. **信息反馈**
   - 在 PR 评论中返回预览 URL；
   - CI 状态显示环境健康检查。

5. **成本与生命周期**
   - 设置 TTL，超过一定时间无活动自动销毁；
   - 限制并发预览环境数量。

**评分维度**：
- 触发逻辑（20%）：是否覆盖创建和销毁时机
- 部署方式（30%）：是否根据应用类型选择合适方案
- 隔离与安全（25%）：是否考虑数据、配置、Secrets 隔离
- 成本治理（15%）：是否提到 TTL、数量限制
- 反馈机制（10%）：是否返回 URL 和健康状态

**常见错误**：
- 预览环境共享生产数据库，导致数据污染
- 只创建不销毁，造成资源浪费
- 忽略 URL 鉴权，导致未发布内容暴露

**延伸追问**：
- 如果预览环境需要依赖多个后端服务，如何一起创建？
- 如何防止预览环境被搜索引擎收录或外部访问？

**相关题目**：
- [FB-12-CO-B-012 什么是部署预览环境](#FB-12-CO-B-012)
- [FB-12-EN-P-011 如何在 CI/CD 中实现动态测试环境](#FB-12-EN-P-011)

**参考资源**：
- [GitHub - Deployment environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Pulumi - Preview environments](https://www.pulumi.com/docs/using-pulumi/continuous-delivery/)

**口头回答版**：
> 每个 PR 自动创建预览环境，就是 PR 打开时部署一份临时副本，合并或关闭时销毁。静态站点可以传到 OSS 的独立路径；需要后端的用 K8s namespace 或 Serverless。要有独立数据库或 schema，避免污染生产。最后把预览链接回写到 PR 评论，并设置 TTL 和数量上限控制成本。

---

### FB-12-EN-A-017：如何在 CI/CD 中集成可视化回归测试？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：可视化回归、Chromatic、Storybook、测试
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明可视化回归测试（Visual Regression Testing）的原理，并介绍如何在 CI/CD 中集成，以防止 UI 意外变更。

**参考答案**：

**原理**：
对组件或页面在特定状态下截图，与基线（baseline）图片进行像素级对比，检测 UI 是否发生非预期变化。

**集成步骤**：

1. **建立 Storybook 或页面集合**：将需要截图的组件/页面集中管理。
2. **选择工具**：Chromatic、Percy、Loki、Applitools。
3. **CI 中触发截图对比**：
   ```yaml
   - run: npm run build-storybook
   - run: npx chromatic --project-token=$&#123;&#123; secrets.CHROMATIC_TOKEN &#125;&#125;
   ```
4. **审核差异**：
   - 在工具平台中查看 diff；
   - 有意变更接受为新基线，无意变更则修复。
5. **与 PR 流程结合**：
   - 未审核的 UI 差异阻塞 PR 合并。

**注意事项**：
- 截图环境要一致（浏览器版本、字体、时区、窗口尺寸）。
- 动画和动态内容需要禁用或等待稳定后再截图。

**评分维度**：
- 原理理解（25%）：能否说清像素级对比和基线
- 工具认知（25%）：是否知道 Chromatic、Percy 等
- CI 集成（25%）：是否能写出触发截图的命令
- 流程设计（25%）：是否提到人工审核和基线更新

**常见错误**：
- 把可视化回归当成普通功能测试，忽略基线维护
- 在不稳定环境截图，导致大量误报
- 所有差异都自动接受，失去回归意义

**延伸追问**：
- 如何处理组件在不同浏览器下的渲染差异？
- 可视化回归适合测组件还是完整页面？

**相关题目**：
- [FB-12-CO-B-006 自动化测试在 CI/CD 中的作用是什么](#FB-12-CO-B-006)
- [FB-12-EN-A-011 如何在 CI/CD 中并行化和分片运行 E2E 测试](#FB-12-EN-A-011)

**参考资源**：
- [Chromatic](https://www.chromatic.com/)
- [Percy](https://www.browserstack.com/percy)

**口头回答版**：
> 可视化回归就是给组件或页面截图，跟基线做像素对比，发现 UI 意外变化。CI 里一般结合 Storybook 和 Chromatic/Percy 跑，PR 阶段自动截图，差异需要人工审核。环境要一致，动画要禁用，不然会有很多误报。有意的变更接受为新基线，无意的就修掉。

---

## 深入题（17 道）{#proficient}

### FB-12-EN-P-001：如何设计一套环境晋升（Environment Promotion）策略？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：环境晋升、环境隔离、Artifact、不可变产物、多环境
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套前端项目的环境晋升策略，要求实现 Dev → Staging → Production 的流程，并说明如何保证不同环境部署的是同一份构建产物。

**参考答案**：

**环境晋升策略**：

1. **一次构建，到处部署**：在 CI 中只构建一次产物（例如 `dist/` 或 Docker 镜像），将该产物作为 Artifact 保存；在不同环境中使用同一份产物，而不是每个环境重新构建。
2. **环境配置外置**：将环境相关的配置（API 地址、功能开关、埋点 ID）通过运行时注入或环境变量提供，而不是在构建时写死。
3. **镜像/Artifact 版本化**：产物版本与 Git commit SHA 或 Tag 绑定，保证可追溯。
4. **晋升审批**：
   - Dev：自动部署，供开发验证。
   - Staging：合并到 release/main 后自动部署，供 QA 验收。
   - Production：通过人工审批或自动但受金丝雀/错误预算约束后部署。
5. **环境隔离**：每个环境使用独立的 Secrets、域名、CDN 路径。

```yaml
# 示例：GitLab CI 中的产物晋升
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    name: "$CI_COMMIT_SHORT_SHA"
    paths:
      - dist/
    expire_in: 30 days

deploy-staging:
  stage: deploy
  needs: [build]
  environment: staging
  script:
    - ./deploy.sh staging
  only:
    - main

deploy-production:
  stage: deploy
  needs: [build]
  environment:
    name: production
    on_stop: rollback-production
  when: manual
  only:
    - tags
```

**评分维度**：
- 环境晋升概念（30%）：是否理解 Dev/Staging/Prod 的晋升流程
- 产物不可变性（30%）：是否强调一次构建、到处部署
- 配置管理（20%）：是否区分构建时配置和运行时配置
- 审批与回滚（20%）：是否设计人工审批和回滚机制

**常见错误**：
- 每个环境重新构建，导致产物不一致
- 将生产 API 地址写死在代码中，无法复用产物
- 未对产物进行版本化，回滚时找不到对应版本

**延伸追问**：
- 如果不同环境需要不同的编译宏（如条件编译），是否还能使用同一份产物？
- 如何验证 Staging 产物就是即将进入 Production 的那份产物？

**相关题目**：
- [FB-12-CO-B-008 什么是构建产物管理？](#FB-12-CO-B-008)
- [FB-12-SD-R-002 如何设计零停机全球前端部署方案？](#FB-12-SD-R-002)

**参考资源**：
- [The 12-Factor App - Config](https://12factor.net/config)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-SD-P-002：如何设计一个完整的前端 CI/CD 平台？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：12 CI/CD
**标签**：CI/CD 平台、Pipeline、质量门禁、部署、回滚、可观测
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个面向中大型前端团队的 CI/CD 平台，支持多项目、多环境、灰度发布、回滚、质量门禁和可观测，要求说明核心模块和关键技术选型。

**参考答案**：

**核心模块**：

1. **流水线引擎**：负责任务调度、DAG 执行、并行/串行控制。可选 GitHub Actions、GitLab CI、Jenkins、Tekton、Drone。
2. **构建服务**：标准化 Node 镜像、pnpm/npm/yarn 缓存、Monorepo 支持（Turborepo/Nx remote cache）。
3. **制品仓库**：存储构建产物、Docker 镜像、Source Map。可选 Nexus、JFrog、Harbor、S3。
4. **部署服务**：对接 K8s、Serverless、CDN、对象存储，支持 Blue-Green/Canary/滚动部署。
5. **配置中心**：管理环境变量、特性开关、灰度规则。
6. **质量门禁**：Lint、Type Check、单测覆盖率、E2E、SonarQube、Bundle Size、安全扫描。
7. **可观测与告警**：Pipeline 执行状态、部署成功率、错误率、性能指标。
8. **权限与审计**：RBAC、Secret 管理、操作日志。

**关键技术选型建议**：

- 仓库：GitHub/GitLab
- 流水线：GitHub Actions / GitLab CI
- 容器化：Docker + Harbor
- 部署：ArgoCD（GitOps）+ Nginx Ingress（流量切分）
- 灰度：Istio / Nginx 流量镜像 + LaunchDarkly
- 可观测：Prometheus + Grafana + Sentry

**设计要点**：

- Pipeline as Code，统一模板。
- Artifact 不可变，按 commit 版本化。
- 环境配置与代码分离。
- 失败自动阻塞后续阶段。
- 发布过程可观测、可回滚。

**评分维度**：
- 模块完整性（30%）：是否覆盖构建、部署、质量、可观测、权限
- 技术选型合理性（25%）：选型是否符合前端场景
- 可扩展性（20%）：是否支持 Monorepo、多环境、灰度
- 安全与可观测（25%）：是否考虑 Secret、审计、监控

**常见错误**：
- 只关注构建部署，忽略质量门禁和可观测
- 选型过度追求新潮，忽略团队学习成本和维护成本

**延伸追问**：
- 如何衡量这个 CI/CD 平台是否成功？
- 当流水线数量达到上千条时，如何统一治理？

**相关题目**：
- [FB-12-SD-R-001 如何设计基于 GitOps 的前端持续交付系统？](#FB-12-SD-R-001)
- [FB-12-CP-R-006 如何度量并提升 CI/CD 成熟度？](#FB-12-CP-R-006)

**参考资源**：
- [Continuous Delivery Book](https://continuousdelivery.com/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-P-003：如何优化前端 CI/CD 构建流水线的性能？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：构建优化、缓存、并行、增量构建、Monorepo、Remote Cache
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请从依赖安装、Lint/Test/Build 执行、产物管理等角度，系统性地分析如何优化前端 CI/CD 流水线的性能。

**参考答案**：

**1. 依赖安装优化**

- 锁定依赖版本，使用 `npm ci` / `pnpm install --frozen-lockfile` / `yarn install --frozen-lockfile`。
- 缓存 `node_modules`、pnpm store、npm cache、yarn cache。
- 在 CI 中使用私有 registry 镜像或代理，减少公网下载。

**2. 任务并行化**

- 对无依赖的任务使用并行 Job（如 Lint 与 Test 并行）。
- 在 GitHub Actions 使用 `strategy.matrix` 多版本/多浏览器并行。
- 在 Monorepo 中仅对受影响包执行（affected build/test）。

**3. 增量构建与缓存**

- 使用 Turborepo / Nx 的 Local/Remote Cache。
- 缓存 webpack/Vite/Rollup 的 loader/transform cache。
- 缓存 ESLint、Prettier、Jest 的 cache。

**4. 构建产物优化**

- 合理配置 Source Map（CI 中可只生成 hidden sourcemap）。
- 分环境产物，避免非必要 polyfill/transpile。
- 使用 `tsconfig` 增量编译。

**5. 镜像与 Runner 优化**

- 使用预装 Node 和依赖的 Docker 镜像。
- 选择就近 region 的 Runner，减少网络延迟。
- 自托管 Runner 可复用 warm cache。

**6. 产物传递**

- 避免在多个 Job 中重复构建；一次构建，上传 artifact，下游下载使用。
- 对 artifact 进行压缩和分片。

**评分维度**：
- 优化维度全面性（30%）：是否覆盖安装、执行、产物、镜像
- 缓存策略（30%）：是否提到依赖缓存、构建缓存、Remote Cache
- Monorepo/增量构建（20%）：是否理解 affected 和缓存命中率
- 实际经验（20%）：能否结合自身项目说明优化效果

**常见错误**：
- 只关注 npm install 时间，忽略构建本身的缓存
- 为每个 Job 单独构建，不利用 artifact 传递
- 缓存 key 设置不合理，导致缓存频繁失效

**延伸追问**：
- Remote Cache 命中率为 0，可能是什么原因？
- 缓存过大导致上传下载时间超过构建时间，怎么办？

**相关题目**：
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线？](#FB-12-EN-A-001)
- [FB-12-EN-P-004 如何优化前端 Docker 构建与镜像体积？](#FB-12-EN-P-004)

**参考资源**：
- [GitHub Actions 性能优化](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)

**口头回答版**：
> - 锁定依赖版本，使用 npm ci / pnpm install --frozen-lockfile / yarn install --frozen-lockfile。 - 缓存 node_modules、pnpm store、npm cache、yarn cache。 - 在 CI 中使用私有 registry 镜像或代理，减少公网下载。 - 对无依赖的任务使用并行 Job（如 Lint 与 Test 并行）。

---

### FB-12-EN-P-004：如何优化前端 Docker 构建与镜像体积？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：Docker、多阶段构建、镜像体积、Alpine、Distroless、.dockerignore
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端项目在使用 Docker 构建和部署时，如何减少镜像体积、提升构建速度并保证安全性。

**参考答案**：

**优化策略**：

1. **多阶段构建（Multi-stage）**：在 builder 阶段完成依赖安装和构建，最终镜像只保留产物和运行所需的最小文件。
2. **选择轻量基础镜像**：使用 `node:20-alpine` 或 `distroless` 镜像，避免 Debian/Ubuntu 全套系统工具。
3. **优化层缓存顺序**：先复制 `package.json` / lockfile 并安装依赖，再复制源码，充分利用 Docker layer cache。
4. **使用 .dockerignore**：排除 `node_modules`、`.git`、测试文件、本地配置等。
5. **仅安装生产依赖**：构建阶段使用 `npm ci`，运行阶段若需要 Node 服务则只安装 `dependencies`。
6. **压缩产物**：构建产物使用 gzip/brotli，Nginx 镜像直接托管静态文件。
7. **非 root 运行**：最终镜像使用非 root 用户提升安全性。

```dockerfile
# builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# production
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html
EXPOSE 80
USER nginx
```

**评分维度**：
- 多阶段构建理解（30%）：能否说明 builder 与 runtime 镜像分离
- 镜像体积优化（30%）：是否提到 Alpine、.dockerignore、层缓存
- 安全实践（20%）：是否提到非 root、最小权限
- 前端针对性（20%）：是否理解前端产物通常是静态文件

**常见错误**：
- 将 `node_modules` 全部打进最终镜像
- 源码和测试文件未排除，导致镜像体积膨胀
- 未利用 layer cache，每次构建都重新安装依赖

**延伸追问**：
- 如果项目需要 SSR（Next.js/Nuxt），Docker 镜像结构会有什么不同？
- 如何在 CI 中对镜像进行安全扫描？

**相关题目**：
- [FB-12-EN-B-007 Docker 在前端 CI/CD 中通常扮演什么角色？](#FB-12-EN-B-007)
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全？](#FB-12-EN-P-007)

**参考资源**：
- [Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-P-005：如何在 CI/CD 中设置有效的质量门禁（Quality Gates）？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：质量门禁、Lint、测试覆盖率、SonarQube、Bundle Size、安全扫描
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套前端 CI/CD 质量门禁，确保不合格的代码无法进入构建或部署阶段。需要说明检查项、阈值设定和失败处理策略。

**参考答案**：

**质量门禁检查项**：

1. **代码规范**：ESLint、Prettier、Stylelint、TypeScript 类型检查。
2. **单元测试**：Jest/Vitest 测试全部通过。
3. **测试覆盖率**：设定分支/函数/行覆盖率阈值，低于阈值阻塞合并。
4. **E2E 测试**：核心链路自动化测试通过。
5. **代码质量扫描**：SonarQube/SonarCloud 检测重复代码、漏洞、坏味道。
6. **构建产物检查**：Bundle Size 超限告警或阻塞；Source Map 生成检查。
7. **安全扫描**：依赖漏洞扫描（Snyk、npm audit、trivy）、Secret 泄露扫描。
8. **性能预算**：Lighthouse CI 分数、Core Web Vitals 阈值。

**阈值设定原则**：

- 覆盖率阈值应逐步提升，避免一次设定过高导致团队抵触。
- Bundle Size 使用 budgets（如 webpack performance budgets），新增包需审批。
- 安全漏洞按严重等级（critical/high）强制修复。

**失败处理**：

- 硬阻塞：Lint/类型错误/测试失败直接失败流水线，禁止合并。
- 软告警：Bundle Size 增长超过 5% 但低于 10% 可告警并需审批。
- 分级策略：生产分支门禁严于 feature 分支。

```yaml
# 示例：GitHub Actions 质量门禁
- name: Test with coverage
  run: npm run test:ci
- name: Check coverage
  run: npx coverage-threshold --branches 60 --functions 70 --lines 70
- name: Lint
  run: npm run lint
- name: Type check
  run: npm run type-check
```

**评分维度**：
- 检查项全面性（35%）：是否覆盖代码规范、测试、安全、性能
- 阈值合理性（25%）：是否理解阈值需渐进、分级
- 失败处理策略（20%）：是否区分硬阻塞与软告警
- 与流水线集成（20%）：是否说明如何嵌入 CI/CD

**常见错误**：
- 只关注测试覆盖率，忽略代码质量、安全和性能
- 阈值设定过高或一刀切，导致团队绕过门禁
- 门禁失败后没有明确的修复和豁免流程

**延伸追问**：
- 如何处理遗留代码导致覆盖率无法达标？
- 如果业务紧急，是否允许绕过质量门禁？如何审计？

**相关题目**：
- [FB-12-CO-B-006 自动化测试在 CI/CD 中的作用](#FB-12-CO-B-006)
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全？](#FB-12-EN-P-007)

**参考资源**：
- [SonarQube Quality Gates](https://docs.sonarqube.org/latest/user-guide/quality-gates/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-P-006：CI/CD 中的回滚策略有哪些？如何设计快速回滚？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：回滚、Rollback、蓝绿部署、金丝雀、不可变产物、快速恢复
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明 CI/CD 中常见的回滚策略，并设计一套前端项目的快速回滚方案。

**参考答案**：

**常见回滚策略**：

1. **重新部署旧版本**：重新触发旧版本 Pipeline，耗时较长。
2. **Artifact 回滚**：直接部署上一次稳定的 Artifact，速度较快。
3. **蓝绿切换**：流量切回旧环境（Blue），秒级回滚。
4. **金丝雀回滚**：关闭新版本流量，全部切回旧版本。
5. **特性开关回滚**：关闭引发问题的功能开关，无需重新部署。
6. **CDN/Source Map 回滚**：刷新 CDN 缓存或切换入口 HTML 指向旧资源。

**前端快速回滚方案**：

1. **版本化产物**：每次构建产物按 commit SHA / tag 命名，保留历史版本。
2. **CDN + 对象存储**：静态资源上传至 S3/OSS，入口 HTML 决定引用哪个版本；回滚时切换 HTML 即可。
3. **保留 Source Map**：问题定位需要对应版本的 Source Map。
4. **数据库/API 兼容**：回滚前端版本时，后端接口需保持兼容。
5. **自动回滚触发**：当错误率或核心指标超过阈值时，自动切回旧版本（需要配合监控和流量控制）。
6. **演练**：定期进行回滚演练，验证 RTO（恢复时间目标）。

**评分维度**：
- 回滚策略多样性（30%）：能否列举 4 种以上策略
- 前端特化设计（30%）：是否结合 CDN、产物版本化设计
- 速度与可靠性（25%）：是否理解秒级回滚 vs 重新部署
- 可观测与演练（15%）：是否提到监控触发和回滚演练

**常见错误**：
- 回滚方案依赖重新构建，耗时过长
- 忽略 Source Map 保留，导致线上问题无法定位
- 回滚前端版本后，后端接口已不兼容

**延伸追问**：
- 如果新版本已经修改了数据库 Schema，前端回滚后如何处理？
- 如何在 SSR 场景下实现快速回滚？

**相关题目**：
- [FB-12-EN-A-005 蓝绿部署的原理和前端注意事项](#FB-12-EN-A-005)
- [FB-12-EN-A-006 金丝雀发布的原理和实现要点](#FB-12-EN-A-006)

**参考资源**：
- [AWS - Rollback Strategies](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_backing_up_data_recovery.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-P-007：如何保障 CI/CD 软件供应链安全？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：供应链安全、SBOM、依赖扫描、签名、镜像扫描、SLSA
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请从依赖、构建、制品、部署等环节，分析如何保障前端 CI/CD 软件供应链安全。

**参考答案**：

**1. 依赖安全**

- 使用 lockfile（package-lock.json / pnpm-lock.yaml）锁定版本。
- 定期运行 `npm audit`、`pnpm audit`、Snyk、Trivy 扫描依赖漏洞。
- 私有仓库 + 可信 registry，防止依赖混淆和投毒。
- 使用 `overrides` 或补丁及时修复高危漏洞。

**2. 构建安全**

- Pipeline as Code 版本化，禁止非受信脚本执行。
- 使用固定版本的基础镜像和 Action/Runner。
- 自托管 Runner 与外部网络隔离。
- 对 Jenkinsfile / workflow 变更进行 Code Review。

**3. 制品安全**

- 对 Artifact 和 Docker 镜像进行签名（cosign、Notary）。
- 生成 SBOM（Software Bill of Materials），记录所有依赖。
- 镜像扫描：检测基础镜像和运行时漏洞。
- 制品仓库访问控制和审计。

**4. 部署安全**

- 部署前验证 Artifact 签名和哈希。
- 使用短期凭证、OIDC 与云厂商 IAM 集成，避免长期 Access Key。
- 最小权限原则：部署凭证只具备部署所需权限。

**5. 合规与审计**

- 记录每次构建、测试、部署的完整链路。
- 遵循 SLSA 框架，逐步提升 Supply-chain Levels。

**评分维度**：
- 供应链环节覆盖（30%）：是否覆盖依赖、构建、制品、部署
- 安全工具与实践（30%）：是否提到 audit、SBOM、签名、扫描
- 权限与凭证（25%）：是否提到最小权限、OIDC、短期凭证
- 可审计性（15%）：是否提到日志、SLSA、可追溯

**常见错误**：
- 只关注代码安全，忽略依赖和构建环境安全
- 使用长期固定密钥部署到生产
- 未验证第三方 Action 的来源和版本

**延伸追问**：
- 如何检测 lockfile 被篡改？
- SLSA Level 1 到 Level 4 的主要区别是什么？

**相关题目**：
- [FB-12-EN-A-008 CI/CD 中的 Secrets 管理](#FB-12-EN-A-008)
- [FB-12-EN-P-005 如何在 CI/CD 中设置有效的质量门禁](#FB-12-EN-P-005)

**参考资源**：
- [SLSA Framework](https://slsa.dev/)
- [OpenSSF - Securing Software Supply Chains](https://openssf.org/supply-chain/)

**口头回答版**：
> - 使用 lockfile（package-lock.json / pnpm-lock.yaml）锁定版本。 - 定期运行 npm audit、pnpm audit、Snyk、Trivy 扫描依赖漏洞。 - 私有仓库 + 可信 registry，防止依赖混淆和投毒。 - 使用 overrides 或补丁及时修复高危漏洞。

---

### FB-12-EN-P-008：GitHub Actions 的 Reusable Workflow 与 Composite Action 有什么区别？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：GitHub Actions、Reusable Workflow、Composite Action、复用、模板
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 GitHub Actions 中 Reusable Workflow 与 Composite Action 的异同，并说明各自的适用场景。

**参考答案**：

| 维度 | Reusable Workflow | Composite Action |
|------|-------------------|------------------|
| 定义位置 | `.github/workflows/*.yml` | `action.yml`（通常放在单独仓库或子目录） |
| 可包含 Job | 可以包含多个 Job | 不能包含 Job，只能包含 Steps |
| 复用层级 | 复用完整 Workflow | 复用一组 Steps |
| 运行环境 | 调用方提供 Runner，可在其中定义 Job 环境 | 在调用方的 Job 中执行 |
| 输入输出 | 支持 `workflow_call` 的 inputs/outputs | 支持 `inputs` / `outputs` |
|  Marketplace | 不能发布到 Marketplace | 可发布到 GitHub Marketplace |
| 权限 | 可以定义 Job 级权限 | 继承调用方 Job 权限 |

**适用场景**：

- **Reusable Workflow**：多个项目需要复用完整 CI/CD 流程（如统一执行 lint、test、build、deploy）。
- **Composite Action**：多个 Workflow 需要复用一段通用步骤（如登录 Docker、安装 pnpm、发送通知）。

示例：

```yaml
# Reusable Workflow
name: reusable-ci
on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: $&#123;&#123; inputs.node-version &#125;&#125;
      - run: npm test
```

```yaml
# Composite Action
name: setup-pnpm
runs:
  using: composite
  steps:
    - uses: pnpm/action-setup@v2
      with:
        version: 8
```

**评分维度**：
- 概念区分（40%）：能否从结构层面区分 Workflow 与 Action
- 使用场景区分（30%）：能否说明何时选择哪种
- 权限与限制（20%）：是否提到 Job、权限、Marketplace 差异
- 代码示例（10%）：能否写出两种定义片段

**常见错误**：
- 认为 Composite Action 可以包含 Job
- 在需要多 Job 复用时使用 Composite Action，导致能力受限

**延伸追问**：
- 如何实现跨组织共享 Reusable Workflow？
- 当 Reusable Workflow 更新后，如何控制调用方的升级节奏？

**相关题目**：
- [FB-12-EN-B-003 GitHub Actions 的核心概念有哪些？](#FB-12-EN-B-003)
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线？](#FB-12-EN-A-001)

**参考资源**：
- [GitHub - Reusing workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [GitHub - Composite actions](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)

**口头回答版**：
> | 维度 | Reusable Workflow | Composite Action | |------|-------------------|------------------| | 定义位置 | .github/workflows/*.yml | action.yml（通常放在单独仓库或子目录） | | 可包含 Job | 可以包含多个 Job | 不能包含 Job，只能包含 Steps |

---

### FB-12-EN-P-009：CI/CD 中如何识别和治理 Flaky Test？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：Flaky Test、测试稳定性、CI/CD、自动化测试
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明什么是 Flaky Test（不稳定测试），分析其常见原因，并给出在 CI/CD 中识别和治理的系统性方案。

**参考答案**：

**Flaky Test 定义**：同样的测试代码和产物，有时通过、有时失败，没有确定的测试结果。

**常见原因**：

1. **异步等待不当**：缺少显式等待，依赖 setTimeout 或隐式等待。
2. **共享状态污染**：测试之间共用数据库、文件、全局变量、localStorage。
3. **时间/顺序依赖**：依赖当前时间、随机数、数组遍历顺序。
4. **外部依赖不稳定**：第三方 API、网络抖动、浏览器驱动行为差异。
5. **资源竞争**：并发测试中多个用例读写同一资源。

**识别方法**：

1. **重复运行统计**：对可疑用例连续运行 N 次，计算失败率。
2. **Flaky Test Dashboard**：记录每个测试的历史失败和重试次数。
3. **CI 重试标记**：标记"重试后通过"的用例，自动计入 flaky 指标。
4. **Nondeterministic 检测工具**：如 Jest `--detectOpenHandles`、Playwright 的 retry 分析。

**治理方案**：

1. **立即隔离**：将 flaky test 移入隔离组，避免阻塞主干。
2. **根因修复**：补充显式等待、清理共享状态、mock 外部依赖、固定随机种子。
3. **建立规范**：禁止在测试中使用真实时间、禁止测试间共享状态。
4. **量化指标**：团队设定 flaky test 占比目标，如低于 0.5%。
5. **文化**：不要把"加个 retry"当长期解决方案。

**评分维度**：
- 根因分析（30%）：能否列举 4 类以上常见原因
- 识别手段（25%）：是否提到统计、dashboard、重试标记
- 治理策略（30%）：是否提到隔离、修复、规范、指标
- 文化意识（15%）：是否反对滥用 retry

**常见错误**：
- 遇到不稳定测试就提高全局重试次数
- 把 flaky test 删除而不是修复
- 没有统计机制，靠人工感知

**延伸追问**：
- 如果某个 E2E 测试在 CI 上失败率高，但本地很难复现，怎么排查？
- 如何防止新的 flaky test 进入代码库？

**相关题目**：
- [FB-12-CO-B-006 自动化测试在 CI/CD 中的作用是什么](#FB-12-CO-B-006)
- [FB-12-EN-A-011 如何在 CI/CD 中并行化和分片运行 E2E 测试](#FB-12-EN-A-011)

**参考资源**：
- [Google Testing Blog - Flaky Tests](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html)
- [Playwright - Retries](https://playwright.dev/docs/test-retries)

**口头回答版**：
> Flaky Test 就是时好时坏的测试，常见原因有异步等待不够、测试间共享状态、时间依赖、外部网络不稳。识别要靠重复跑和 dashboard，看哪些用例重试后能通过。治理首先把 flaky 用例隔离出来，然后修根因，不能只加 retry。团队要定指标，比如 flaky 率低于 0.5%，并且禁止测试共享状态。

---

### FB-12-EN-P-010：如何防止 Pipeline as Code 被恶意 PR 篡改或滥用？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：Pipeline as Code、安全、权限控制、PR、Code Review
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请分析 Pipeline as Code 带来的安全风险，并给出防止恶意 PR 篡改或滥用流水线的具体措施。

**参考答案**：

**主要风险**：

1. PR 中修改 workflow，窃取 Secrets 或挖矿。
2. Fork 仓库的 PR 触发 CI，消耗目标仓库 Runner 资源。
3. 使用不可信第三方 Action，引入供应链攻击。
4. 默认 GITHUB_TOKEN 权限过大，可写入仓库或发布产物。

**防护措施**：

1. **最小权限原则**
   - 为 Workflow 设置最小 `permissions`：
     ```yaml
     permissions:
       contents: read
       pull-requests: write
     ```
2. **分支保护与 CODEOWNERS**
   - `.github/workflows/` 目录下的变更需指定 reviewer 批准。
3. **限制 Fork PR 触发**
   - 对 Fork PR 不分配 Secrets，或要求 maintainer 手动批准后再运行。
4. **固定 Action 版本**
   - 使用 commit SHA 或固定 major 版本，避免被恶意更新。
5. **自托管 Runner 安全**
   - 不要对公开仓库开放自托管 Runner；私有 Runner 与外部网络隔离。
6. **审计与告警**
   - 监控 workflow 变更、Secrets 访问、异常 Runner 使用。

**评分维度**：
- 风险识别（25%）：能否说出窃取 Secrets、滥用 Runner、供应链攻击
- 权限控制（25%）：是否提到最小 permissions、CODEOWNERS
- Fork PR 处理（20%）：是否知道不泄露 Secrets 给 Fork PR
- Action 安全（15%）：是否提到固定版本和审查第三方 Action
- 审计意识（15%）：是否提到监控和告警

**常见错误**：
- 给所有 Workflow 默认最高权限
- 允许 Fork PR 直接访问仓库 Secrets
- 使用 `@main` 引用的第三方 Action

**延伸追问**：
- 如果一个 Action 被攻陷，如何快速评估受影响范围？
- 如何在保证安全的前提下让外部贡献者的 PR 也能跑 CI？

**相关题目**：
- [FB-12-EN-A-008 CI/CD 中的 Secrets 管理有哪些最佳实践](#FB-12-EN-A-008)
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全](#FB-12-EN-P-007)

**参考资源**：
- [GitHub - Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [OpenSSF - Security Best Practices](https://github.com/ossf/scorecard)

**口头回答版**：
> Pipeline as Code 的风险主要是 PR 能改 workflow，可能偷 Secrets 或挖矿。防护要最小化 Workflow 权限，用 CODEOWNERS 保护 workflow 文件，Fork PR 不要给 Secrets，第三方 Action 要固定版本。自托管 Runner 不要对公开仓库开放。还要审计 workflow 变更和 Secrets 访问。

---

### FB-12-EN-P-011：如何在 CI/CD 中实现动态测试环境（Ephemeral Environment）？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：动态环境、基础设施即代码、Terraform、Pulumi、Preview
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套在 CI/CD 中按需创建和销毁的动态测试环境（Ephemeral Environment），并说明其适用场景、技术选型和成本治理。

**参考答案**：

**核心思想**：
测试环境随用随建、用完即毁，每次测试都在干净、与生产接近的环境中进行。

**适用场景**：
- PR 预览、E2E 测试、性能压测、回归验证、安全扫描。

**技术选型**：

1. **基础设施即代码**：Terraform、Pulumi、CDK、Crossplane。
2. **容器编排**：Kubernetes namespace per branch、Docker Compose、Serverless 容器。
3. **数据库**：
   - 每个环境独立数据库实例；
   - 或使用 schema/database per env + seed 数据。
4. **服务发现与路由**：Ingress/Service Mesh 按分支生成子域名。
5. **配置注入**：通过环境变量、ConfigMap、Vault 动态注入 Secrets。

**生命周期管理**：

- 创建：PR 打开 / 测试任务触发。
- 销毁：PR 合并/关闭、TTL 到期、 nightly 清理任务。
- 成本：设置资源配额、自动休眠、限制并发环境数。

**评分维度**：
- 设计理念（20%）：是否理解 ephemeral 即用即毁
- 技术栈（25%）：是否提到 IaC、容器、数据库、路由
- 数据隔离（20%）：是否考虑 schema/seed/Secrets 隔离
- 生命周期与成本（20%）：是否提到 TTL、自动销毁、配额
- 场景匹配（15%）：能否说明适合 E2E、预览、压测

**常见错误**：
- 动态环境复用生产数据库，导致数据污染
- 只创建不销毁，失去 ephemeral 意义
- 忽略环境启动时间，导致 CI 等待过长

**延伸追问**：
- 动态环境的创建和销毁时间对 CI 总时长影响有多大？
- 如何为动态环境准备真实但不敏感的数据？

**相关题目**：
- [FB-12-EN-A-016 如何为每个 PR 自动创建和销毁预览环境](#FB-12-EN-A-016)
- [FB-12-SD-R-012 如何设计面向 Serverless 与边缘计算的 CI/CD 架构](#FB-12-SD-R-012)

**参考资源**：
- [Pulumi - Ephemeral Environments](https://www.pulumi.com/blog/ephemeral-environments/)
- [Terraform - Workspaces](https://developer.hashicorp.com/terraform/language/state/workspaces)

**口头回答版**：
> 动态测试环境就是随用随建、用完即毁的环境，适合 PR 预览、E2E 和压测。用 Terraform/Pulumi 做基础设施即代码，K8s namespace 或 Serverless 容器承载，数据库要独立 schema 或实例，再加 seed 数据。生命周期由 PR 状态或 TTL 控制，超时自动销毁，还要设资源配额控制成本。

---

### FB-12-EN-P-012：如何在大型团队统一和治理 npm/yarn/pnpm 在 CI 中的使用？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：包管理器、pnpm、npm、治理、lockfile
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在一个大型前端团队中，不同项目可能使用 npm、yarn、pnpm 等不同包管理器。请设计一套统一和治理方案，确保 CI 环境的一致性。

**参考答案**：

**统一策略**：

1. **标准化包管理器**
   - 在 `package.json` 中声明 `packageManager` 字段：
     ```json
     { "packageManager": "pnpm@8.15.0" }
     ```
   - 启用 Corepack（Node 16.10+）自动切换对应包管理器。

2. **CI 校验**
   - 检测 lockfile 格式与声明的包管理器是否匹配。
   - 使用 `corepack enable && corepack prepare` 确保版本一致。
   - 运行 `pnpm install --frozen-lockfile` 校验 lockfile 有效性。

3. **私有 Registry 与代理**
   - 统一配置 `.npmrc` / `.pnpmfile.cjs`，指向私有 registry 或镜像。
   - 禁止直接访问公网 registry，降低供应链风险。

4. **迁移与兼容**
   - 新项目统一使用 pnpm；
   - 老项目逐步迁移，提供迁移脚本和过渡窗口。

5. **监控与审计**
   - 统计各项目包管理器版本；
   - 对异常版本告警，防止"各自为政"。

**评分维度**：
- 标准化手段（30%）：是否提到 packageManager 字段和 Corepack
- CI 校验（25%）：是否设计 lockfile 和包管理器一致性检查
- 安全与治理（25%）：是否提到私有 registry、版本审计
- 迁移策略（20%）：是否考虑老项目过渡

**常见错误**：
- 让开发者自由选择包管理器，CI 却统一用一种，导致 lockfile 不匹配
- 只统一命令，不统一版本
- 忽略 `.npmrc` 配置差异，导致安装结果不同

**延伸追问**：
- 如果某个项目必须用 yarn 1.x，如何在统一治理中兼容？
- 私有 registry 故障时，CI 如何优雅降级？

**相关题目**：
- [FB-12-EN-B-013 CI/CD 中 lockfile 的作用是什么](#FB-12-EN-B-013)
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全](#FB-12-EN-P-007)

**参考资源**：
- [Node.js - Corepack](https://nodejs.org/api/corepack.html)
- [pnpm - packageManager field](https://pnpm.io/npmrc#package-manager-strict)

**口头回答版**：
> 大团队要统一包管理器，首先在 `package.json` 里写 `packageManager` 字段，比如 `pnpm@8.15.0`，再开启 Corepack。CI 要校验 lockfile 格式和声明是否一致，跑 `frozen-lockfile`。还要统一 `.npmrc` 指向私有 registry，定期审计版本。老项目可以逐步迁移，不要一刀切。

---

### FB-12-EN-P-013：如何在 CI/CD 中安全管理和上传 Source Map？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：Source Map、错误监控、Sentry、Artifact、安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Source Map 在生产环境中的管理策略，并设计一套在 CI/CD 中安全上传 Source Map 到错误监控平台的方案。

**参考答案**：

**管理原则**：

1. **不对外暴露 Source Map**
   - 生产构建生成 `hidden sourcemap` 或不上传 `*.map` 到 CDN。
   - 避免攻击者通过 source map 还原源码。

2. **作为 Artifact 保存**
   - 将 source map 与构建产物一同归档到制品仓库，按版本命名。
   - 设置保留策略，如 30-90 天。

3. **上传错误监控平台**
   - CI 中调用 Sentry/SourceMap Upload API，上传 source map 和关联的 release 版本。
   - 使用短期 Token 或 OIDC，避免长期 API Key。

4. **版本关联**
   - 通过 `release` 或 `dist` 字段将线上错误与对应 source map 关联。
   - 保证回滚时 source map 版本也能对应。

示例（Sentry）：

```bash
npx sentry-cli sourcemaps upload dist/ \
  --release=$CI_COMMIT_SHA \
  --url-prefix=~/assets/
```

**评分维度**：
- 安全意识（30%）：是否强调不对外暴露 source map
- 上传流程（25%）：是否说明 CI 中上传和版本关联
- 凭证管理（20%）：是否提到短期 Token/OIDC
- 生命周期（15%）：是否提到保留策略和回滚对应
- 工具认知（10%）：是否知道 Sentry 等错误监控平台

**常见错误**：
- 把 source map 和静态资源一起发布到公网 CDN
- 使用长期不变的 Sentry token 硬编码在 CI 中
- source map 没有按版本管理，线上错误无法映射

**延伸追问**：
- 如果回滚前端版本，source map 如何同步回滚？
- source map 上传失败时，错误监控平台还能工作吗？

**相关题目**：
- [FB-12-CO-B-008 什么是构建产物管理](#FB-12-CO-B-008)
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全](#FB-12-EN-P-007)

**参考资源**：
- [Sentry - Source Maps](https://docs.sentry.io/platforms/javascript/sourcemaps/)
- [Vite - Sourcemap options](https://vitejs.dev/config/build-options.html#build-sourcemap)

**口头回答版**：
> Source Map 绝对不能放到公网 CDN，否则源码会被还原。生产构建可以生成 hidden sourcemap，然后作为 artifact 保存，并在 CI 里上传到 Sentry 这类错误监控平台。上传时要关联 release 版本，用短期 Token 或 OIDC，不要写死长期 key。还要设置保留策略，回滚时能找到对应版本的 source map。

---

### FB-12-EN-P-014：如何为 Monorepo 设计自动化版本发布和 Changelog 生成？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：Monorepo、Changesets、semantic-release、版本发布、Changelog
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请为前端 Monorepo 设计一套自动化版本发布方案，要求支持多包独立/统一版本管理、Changelog 自动生成，并能与 CI/CD 集成。

**参考答案**：

**方案选型**：

1. **Changesets（推荐）**
   - 开发者在 PR 中手动添加 `.changeset/*.md`，描述变更类型和影响包。
   - CI 中 `changeset version` 自动 bump 版本、生成 changelog。
   - 适合需要人工控制版本决策的场景。

2. **semantic-release**
   - 基于 Conventional Commits 自动计算版本和 changelog。
   - 适合提交规范严格、希望全自动化的场景。

**版本策略**：

- **Independent**：每个包独立版本号（如 Babel）。
- **Fixed**：所有包共享同一版本号（如 Angular）。

**CI/CD 集成流程**：

1. PR 阶段：校验 changeset 是否存在（如需要）。
2. 合并后：CI 运行 `changeset version`，生成版本变更 PR。
3. 版本 PR 合并后：CI 运行 `changeset publish`，发布到 npm 并打 Git tag。
4. 产物上传：构建产物、source map、changelog 归档到制品仓库。

**最佳实践**：

- 预发布版本使用 `next`、`beta` dist-tag。
- Breaking Change 必须在 changeset 或 commit 中显式声明。
- 发布失败时支持自动回滚或重试。

**评分维度**：
- 工具理解（25%）：能否对比 Changesets 与 semantic-release
- 版本策略（25%）：是否理解 independent vs fixed
- CI 集成（25%）：是否能描述从 PR 到发布的完整流程
- 风险意识（15%）：是否提到预发布、Breaking Change、回滚
- 实践细节（10%）：是否知道 dist-tag、Git tag、npm publish

**常见错误**：
- 所有包强制统一版本，导致无变更包也被 bump
- 自动化发布没有预发布阶段，直接上 latest
- 忽略 changeset 缺失的校验，导致版本遗漏

**延伸追问**：
- 如果一个 PR 修改了多个包，但只影响其中一个是 breaking，怎么处理？
- 发布过程中 npm 部分成功、部分失败，如何恢复？

**相关题目**：
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线](#FB-12-EN-A-001)
- [FB-12-SD-R-005 如何设计企业级前端制品管理与发布火车](#FB-12-SD-R-005)

**参考资源**：
- [Changesets](https://github.com/changesets/changesets)
- [semantic-release](https://semantic-release.gitbook.io/semantic-release/)

**口头回答版**：
> Monorepo 发布有两种主流方案：Changesets 让开发者在 PR 里手动写变更说明，CI 自动 bump 版本和生成 changelog；semantic-release 则基于 Conventional Commits 全自动。版本策略分 independent 和 fixed。CI 流程一般是：PR 校验 changeset -> 合并后生成版本 PR -> 再合并后自动 publish 到 npm 并打 tag。breaking change 一定要显式声明，先用 next/beta 标签预发布。

---

### FB-12-EN-P-015：如何在 CI/CD 中使用 OIDC 实现云厂商免密登录？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：OIDC、云厂商、Secrets、安全、GitHub Actions
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 OIDC（OpenID Connect）在 CI/CD 中的应用原理，并说明如何使用它替代长期 Access Key 登录云厂商。

**参考答案**：

**传统问题**：
使用长期 Access Key 部署到云厂商，一旦泄露风险极大，且轮换成本高。

**OIDC 原理**：

1. CI 平台（如 GitHub Actions）作为 OIDC 身份提供商，在 Job 运行时签发短期 JWT Token。
2. 云厂商 IAM 配置信任策略，信任特定仓库、分支或环境。
3. CI Job 用 JWT Token 向云厂商换取短期临时凭证（如 AWS STS）。
4. 用临时凭证执行部署，凭证过期后自动失效。

示例（GitHub Actions → AWS）：

```yaml
- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789012:role/my-deploy-role
    aws-region: us-east-1
```

AWS 信任策略中限制 `token.actions.githubusercontent.com` 的 subject 为指定 repo 和环境。

**优势**：
- 无需在 CI 中存储长期密钥。
- 凭证短期有效，泄露影响窗口小。
- 可细粒度限制仓库、分支、环境。

**评分维度**：
- OIDC 原理（30%）：能否说清 JWT Token 和信任策略
- 配置能力（25%）：是否能写出 GitHub Actions 与 AWS 的配置片段
- 安全收益（25%）：是否理解短期凭证和最小权限
- 适用范围（20%）：是否知道 Azure、GCP、阿里云也支持 OIDC

**常见错误**：
- 信任策略范围过宽，如允许所有分支和仓库
- 仍然把临时凭证打印到日志
- 以为 OIDC 完全不需要 IAM 配置

**延伸追问**：
- 如果云厂商不支持 OIDC，有哪些替代方案？
- 如何在多区域部署时限制 OIDC 角色权限？

**相关题目**：
- [FB-12-EN-A-008 CI/CD 中的 Secrets 管理有哪些最佳实践](#FB-12-EN-A-008)
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全](#FB-12-EN-P-007)

**参考资源**：
- [GitHub - Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [AWS - Creating a role for web identity or OIDC](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html)

**口头回答版**：
> OIDC 就是让 CI 平台作为身份提供商，运行时再签发短期 JWT Token，云厂商 IAM 配置信任策略后换临时凭证。GitHub Actions 配 `role-to-assume` 就行。这样不用存长期 Access Key，泄露了也很快过期。关键是信任策略要限制仓库、分支、环境，别写太宽。

---

### FB-12-EN-P-016：如何构建 CI/CD 流水线的可观测性体系？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：可观测、日志、指标、Tracing、流水线
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套 CI/CD 流水线的可观测性体系，帮助团队快速定位构建失败、部署异常和性能瓶颈。

**参考答案**：

**可观测三大支柱**：

1. **Metrics（指标）**
   - Pipeline 执行时长、成功率、失败率。
   - 各阶段耗时（install、lint、test、build、deploy）。
   - DORA 指标：部署频率、变更前置时间、失败率、恢复时间。
   - 队列等待时间、Runner 利用率。

2. **Logs（日志）**
   - 集中收集各 Job 日志，支持关键字检索。
   - 保留失败日志，便于事后分析。
   - 对 Secrets 自动脱敏。

3. **Traces / 事件链**
   - 记录从代码提交到生产部署的完整链路。
   - 关联 PR、commit、build、artifact、deployment、监控告警。

**实现方式**：

- 使用 CI 平台 API 或 webhook 推送事件到监控平台。
- 使用 OpenTelemetry 采集部分自定义指标。
- Dashboard：Grafana / Datadog / 平台自带 insights。
- 告警：Pipeline 失败、部署成功率下降、阶段耗时突增。

**评分维度**：
- 三大支柱覆盖（30%）：是否覆盖 metrics、logs、traces
- 指标设计（25%）：是否提到阶段耗时、DORA、成功率
- 工具集成（20%）：是否知道 Grafana、Datadog、OpenTelemetry
- 告警与响应（15%）：是否设计告警和失败排查流程
- 安全与隐私（10%）：是否提到日志脱敏

**常见错误**：
- 只收集日志，不做指标聚合
- 告警阈值过低，导致大量无效告警
- 没有关联代码提交与部署事件，排查困难

**延伸追问**：
- 如何利用可观测数据持续优化 CI 执行时间？
- Pipeline 日志中如何平衡详细程度与存储成本？

**相关题目**：
- [FB-12-CP-R-006 如何度量并提升 CI/CD 成熟度](#FB-12-CP-R-006)
- [FB-12-SD-P-002 如何设计一个完整的前端 CI/CD 平台](#FB-12-SD-P-002)

**参考资源**：
- [DORA - Metrics](https://dora.dev/guides/dora-metrics-four-keys/)
- [OpenTelemetry](https://opentelemetry.io/)

**口头回答版**：
> CI/CD 可观测性也分 metrics、logs、traces。metrics 要关注总耗时、各阶段耗时、成功率、DORA 指标；logs 要集中收集并脱敏；traces 要把提交、构建、部署、监控串起来。可以用 CI 平台的 webhook 或 API 推到 Grafana/Datadog，设置失败率、阶段耗时突增等告警。关键是把数据用起来，持续优化。

---

### FB-12-EN-P-017：SSR 或边缘渲染项目的 CI/CD 有哪些特殊考虑？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：SSR、边缘渲染、CI/CD、Serverless、CDN
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
相比纯静态前端，SSR（如 Next.js、Nuxt）或边缘渲染（Edge Rendering）项目的 CI/CD 有哪些特殊之处？

**参考答案**：

**特殊考虑**：

1. **运行时与构建时分离**
   - 构建产物不仅是静态文件，还包括 Serverless Function 或 Edge Worker。
   - 需要分别验证静态资源和函数行为。

2. **部署单元不同**
   - 需要部署到支持 Node.js 运行时的平台（Vercel、Netlify Functions、AWS Lambda@Edge、Cloudflare Workers）。
   - 函数有包大小、内存、超时、区域限制。

3. **环境一致性**
   - 构建时使用的 Node 版本、运行时 API 要与目标平台一致。
   - 边缘运行时不支持 Node 原生 API，需要提前识别。

4. **配置与路由**
   - Rewrites、Headers、Middleware 需要在 CI 中验证。
   - 边缘配置（如 Cloudflare KV、Vercel Edge Config）需要单独管理。

5. **回滚复杂性**
   - 回滚时需要同时回滚静态资源和函数代码，保持版本一致。
   - 数据库 schema/API 兼容性问题更突出。

6. **冷启动与性能**
   - CI 中可测试函数包大小、启动时间、依赖数量。

**评分维度**：
- 运行时差异（25%）：是否理解 SSR/Edge 包含函数代码
- 部署平台特性（25%）：是否提到 Serverless/Edge 限制
- 环境一致性（20%）：是否考虑 Node 版本、API 兼容性
- 回滚与配置（20%）：是否提到同时回滚和配置管理
- 性能意识（10%）：是否关注包大小和冷启动

**常见错误**：
- 用纯静态部署方式部署 SSR 项目
- 忽略边缘运行时的 API 限制，导致运行时报错
- 只回滚前端静态资源，不同步回滚函数

**延伸追问**：
- 如何在 CI 中验证 Next.js Middleware 的行为？
- SSR 项目的 Source Map 和日志如何管理？

**相关题目**：
- [FB-12-EN-P-004 如何优化前端 Docker 构建与镜像体积](#FB-12-EN-P-004)
- [FB-12-SD-R-012 如何设计面向 Serverless 与边缘计算的 CI/CD 架构](#FB-12-SD-R-012)

**参考资源**：
- [Next.js - Deployment](https://nextjs.org/docs/deployment)
- [Cloudflare Workers - Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)

**口头回答版**：
> SSR 和边缘渲染不只是静态文件，还要部署 Serverless Function 或 Edge Worker。CI 要分别验证构建产物和函数行为，注意 Node 版本、运行时 API 限制、函数包大小和区域。回滚时要同时回滚静态资源和函数，保持版本一致。Next.js、Nuxt 这类项目部署平台通常是 Vercel、Cloudflare Workers、AWS Lambda@Edge。

---

## 架构题（23 道）{#architect}

### FB-12-SD-R-001：如何设计基于 GitOps 的前端持续交付系统？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：GitOps、ArgoCD、Flux、声明式、不可变、版本控制、K8s
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个基于 GitOps 的前端持续交付系统，要求说明核心组件、交付流程、回滚机制和前端特殊考虑。

**参考答案**：

**GitOps 核心理念**：以 Git 仓库作为唯一可信源（Single Source of Truth），通过控制器（如 ArgoCD、Flux）自动将 Git 中声明的目标状态同步到集群/运行环境。

**核心组件**：

1. **应用代码仓库**：前端源码和 Dockerfile。
2. **GitOps 配置仓库**：存放各环境的部署声明（K8s manifests、Helm charts、Kustomize overlays）。
3. **CI 系统**：GitHub Actions / GitLab CI，负责构建、测试、扫描，生成 Artifact 和镜像。
4. **镜像仓库**：Harbor / Docker Hub / ECR，存储签名镜像。
5. **GitOps 控制器**：ArgoCD / Flux，监听 Git 仓库变化并自动同步。
6. **可观测平台**：Prometheus + Grafana + Sentry，监控部署状态和应用健康。

**交付流程**：

1. 开发者提交代码到 main。
2. CI 构建 Docker 镜像，推送到镜像仓库。
3. CI 更新 GitOps 仓库中对应环境的镜像标签（可通过 PR 或自动提交）。
4. ArgoCD 检测到 Git 变化，拉取最新声明并同步到集群。
5. 部署完成后反馈同步状态到 GitOps 仓库和 CI。

**前端特殊考虑**：

- 静态资源可部署到对象存储 + CDN，GitOps 仓库中声明 CDN 配置或 Ingress 路由。
- 入口 HTML 与静态资源版本绑定，避免缓存问题。
- 使用 ArgoCD 的 ApplicationSet 管理多环境、多租户配置。

**回滚机制**：

- 直接回退 GitOps 仓库中的镜像标签或配置提交，控制器自动同步旧版本。
- 配合金丝雀/蓝绿实现无感知回滚。

**评分维度**：
- GitOps 概念理解（25%）：能否说明以 Git 为唯一可信源
- 组件与流程设计（30%）：是否覆盖代码仓库、配置仓库、CI、控制器、镜像仓库
- 回滚与一致性（25%）：是否理解回退 Git 即回滚
- 前端适配（20%）：是否考虑静态资源、CDN、缓存

**常见错误**：
- 将 GitOps 简单理解为"用 Git 触发部署"
- 忽略配置仓库与应用代码仓库的分离
- 未考虑前端静态资源的特殊性

**延伸追问**：
- GitOps 模式下，Secrets 如何管理？
- 当多个环境需要不同配置时，如何处理配置覆盖？

**相关题目**：
- [FB-12-SD-P-002 如何设计一个完整的前端 CI/CD 平台](#FB-12-SD-P-002)
- [FB-12-SD-R-002 如何设计零停机全球前端部署方案](#FB-12-SD-R-002)

**参考资源**：
- [ArgoCD 文档](https://argo-cd.readthedocs.io/)
- [GitOps 原则](https://opengitops.dev/)

**口头回答版**：
> GitOps 核心理念：以 Git 仓库作为唯一可信源（Single Source of Truth），通过控制器（如 ArgoCD、Flux）自动将 Git 中声明的目标状态同步到集群/运行环境。

---

### FB-12-SD-R-002：如何设计零停机全球前端部署方案？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：零停机、全球部署、CDN、边缘计算、蓝绿部署、DNS、缓存
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套面向全球用户的前端应用零停机部署方案，要求考虑 CDN、DNS、缓存、灰度和回滚。

**参考答案**：

**整体架构**：

```
用户 -> DNS / GSLB -> CDN 边缘节点 -> 对象存储（S3/OSS）/ 边缘函数
```

**核心策略**：

1. **版本化静态资源**
   - JS/CSS 使用内容哈希命名（`main.a3f2b1.js`）。
   - 入口 HTML 不缓存或短缓存，指向当前版本资源。
   - 老版本资源保留一段时间，供已打开页面的用户加载。

2. **对象存储 + CDN**
   - 新版本构建产物上传到对象存储的独立目录（`/v1.2.3/`）。
   - CDN 回源到对象存储，开启 gzip/brotli、HTTP/2。
   - 部署新版本时更新 CDN 的入口 HTML 或回源路径。

3. **DNS / 全局负载均衡（GSLB）**
   - 通过 DNS 或 CDN 边缘规则将不同地区/用户分配到不同版本。
   - 支持按区域灰度（如先亚太再北美）。

4. **蓝绿 / 金丝雀**
   - 在 CDN 或边缘函数层根据 Cookie/Header 分流量。
   - 全球灰度时按区域逐步切量，观测错误率和性能。

5. **缓存策略**
   - 静态资源：`Cache-Control: public, max-age=31536000, immutable`。
   - HTML：`Cache-Control: no-cache` 或短缓存。
   - 部署时主动刷新/预热关键资源。

6. **回滚**
   - 切换 DNS/CDN 配置回旧版本目录，或回滚入口 HTML。
   - 保留至少 2 个版本资源，确保切换时用户不白屏。

**评分维度**：
- 全球架构理解（25%）：是否理解 DNS/CDN/对象存储/边缘函数
- 版本化与缓存策略（25%）：是否正确处理 HTML 与静态资源缓存
- 灰度与回滚（25%）：是否支持全球灰度和快速回滚
- 前端特殊细节（25%）：是否考虑已打开页面、资源保留、入口 HTML

**常见错误**：
- 直接覆盖 CDN 上的同名静态文件，导致用户加载到新旧混合资源
- 忽略 HTML 缓存，导致用户长期访问旧版本
- 全球一次性全量切换，缺乏灰度控制

**延伸追问**：
- 如何在边缘节点实现按用户 ID 的灰度？
- 新版本发布后发现某个地区访问异常，如何只回滚该地区？

**相关题目**：
- [FB-12-EN-A-005 蓝绿部署的原理和前端注意事项](#FB-12-EN-A-005)
- [FB-12-EN-A-006 金丝雀发布的原理和实现要点](#FB-12-EN-A-006)

**参考资源**：
- [Cloudflare - Zero Downtime Deployments](https://developers.cloudflare.com/cache/how-to/purge-cache/)
- [AWS - CloudFront Continuous Deployment](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/continuous-deployment.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-SD-R-003：如何为微前端（Micro-Frontend）设计 CI/CD 流水线？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：微前端、CI/CD、独立部署、版本兼容、集成测试、基座
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请为一个微前端架构设计 CI/CD 流水线，要求支持各子应用独立构建、独立部署，同时保证基座和子应用之间的版本兼容与集成质量。

**参考答案**：

**设计原则**：

1. **独立流水线**：每个子应用和基座拥有自己的仓库或 Monorepo 中的独立 Pipeline。
2. **独立部署**：子应用构建后产出 JS/CSS，上传至 CDN/对象存储指定目录，基座通过配置动态加载。
3. **统一集成测试**：关键链路需要在子应用变更后触发集成/契约测试。
4. **版本兼容**：子应用暴露接口需向后兼容，基座通过版本号或配置指定加载哪个子应用版本。

**流水线设计**：

**子应用 Pipeline**：

```yaml
stages: [install, build, test, deploy]
build:
  script:
    - npm run build
  artifacts:
    paths: [dist/]
deploy:
  script:
    - aws s3 sync dist/ s3://cdn/micro-apps/order/v1.2.3/
    - update-manifest order v1.2.3 staging
```

**基座 Pipeline**：

- 当子应用发布新版本时，可选择自动或手动更新基座的 manifest/registry。
- 基座部署前运行集成测试，验证所有已注册子应用在当前基座版本下正常加载。

**兼容性保障**：

- 子应用使用 SemVer，基座记录最低兼容版本。
- 通过 E2E/契约测试验证基座与子应用接口。
- 特性开关控制子应用是否对新用户可见。

**集成测试策略**：

- 子应用变更后触发基座的集成测试（CI 触发器或 webhook）。
- 使用 Playwright/Cypress 跑全链路 E2E。
- 对共享依赖进行 dedupe 检查，防止版本冲突。

**评分维度**：
- 独立部署能力（30%）：是否支持子应用独立构建、独立部署
- 版本兼容设计（25%）：是否提到 SemVer、manifest、接口兼容
- 集成测试策略（25%）：是否设计基座集成测试和契约测试
- 可维护性（20%）：是否考虑配置管理、回滚、监控

**常见错误**：
- 所有子应用必须同时部署，失去微前端独立发布的优势
- 忽略子应用接口变更对基座的影响
- 未做共享依赖版本对齐，导致运行时冲突

**延伸追问**：
- 子应用独立部署后，如何进行全局灰度？
- 当多个子应用同时需要升级共享库时，如何协调发布？

**相关题目**：
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线](#FB-12-EN-A-001)
- [FB-12-EN-A-007 特性开关如何与 CI/CD 结合](#FB-12-EN-A-007)

**参考资源**：
- [Micro Frontends - Deployment](https://martinfowler.com/articles/micro-frontends.html#Deployment)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-CP-R-004：如何在持续交付中平衡发布速度与稳定性？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：发布速度、稳定性、SRE、错误预算、渐进式交付、DevOps
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
作为前端架构师，你如何在持续交付中平衡发布速度和稳定性？请从流程、技术、组织三个维度阐述。

**参考答案**：

**流程维度**：

1. **分级发布**：Dev → Staging → Canary → Production，逐步扩大影响面。
2. **质量门禁**：Lint、测试、覆盖率、安全扫描、Bundle Size 等硬阻塞。
3. **发布审批**：生产发布需经过人工审批或基于指标的自动审批。
4. **回滚机制**：保留上一个稳定版本，支持一键回滚或自动回滚。

**技术维度**：

1. **特性开关**：代码提前合并，功能按批次开放。
2. **可观测性**：错误率、性能、业务指标实时监控，异常自动告警。
3. **金丝雀/蓝绿**：小流量验证，快速止损。
4. **自动化测试与混沌工程**：提升测试覆盖，定期进行故障演练。

**组织维度**：

1. **SRE 与错误预算**：设定可接受的故障指标（SLO），用错误预算指导发布节奏。
2. **On-Call 机制**：发布窗口内有人值守，快速响应。
3. ** blameless postmortem**：故障后复盘，持续改进流程。
4. **小批量、高频次发布**：降低单次发布风险，快速获得反馈。

**核心观点**：速度不是无限快，而是在可接受的稳定性预算内最大化发布频率。

**评分维度**：
- 流程设计（30%）：是否覆盖分级发布、门禁、审批、回滚
- 技术手段（30%）：是否提到特性开关、可观测、金丝雀
- 组织文化（25%）：是否提到 SRE、错误预算、On-Call、复盘
- 综合能力（15%）：能否表达速度与稳定性的动态平衡

**常见错误**：
- 只强调自动化，忽略人工审批和风险评估
- 把速度和稳定性对立，认为必须牺牲一个
- 没有量化指标，空谈"平衡"

**延伸追问**：
- 你们团队的发布频率和 MTTR 目标是多少？
- 当业务要求紧急上线，但测试未完全通过时，你会怎么决策？

**相关题目**：
- [FB-12-EN-A-004 几种常见的部署策略有什么区别](#FB-12-EN-A-004)
- [FB-12-CP-R-006 如何度量并提升 CI/CD 成熟度](#FB-12-CP-R-006)

**参考资源**：
- [Google SRE Book - Error Budgets](https://sre.google/sre-book/embracing-risk/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-SD-R-005：如何设计企业级前端制品管理与发布火车？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：制品管理、发布火车、Release Train、版本策略、Artifact Registry
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个企业级前端制品管理和发布火车（Release Train）方案，支持多产品、多版本并行、版本兼容和合规审计。

**参考答案**：

**制品管理**：

1. **统一制品仓库**：使用 JFrog Artifactory / Nexus / Harbor 统一管理 npm tarball、Docker 镜像、静态资源包、Source Map。
2. **命名与元数据**：
   - 版本号：`<major>.<minor>.<patch>-<build>.<commit-sha>`
   - 元数据：关联 commit、branch、Pipeline ID、SAST/DAST 报告、SBOM。
3. **生命周期策略**：
   - 开发版本保留 7 天，RC 保留 30 天，Release 长期保留。
4. **访问控制与签名**：按团队/环境设置读取/推送权限；对关键制品签名。

**发布火车（Release Train）**：

1. **固定发版周期**：例如每两周一次 Release Train，所有就绪的 feature 按周期合并。
2. **版本分支**：从 main 切出 `release/v1.2.0`，只接受 bugfix。
3. **多产品协调**：通过发布日历协调多个前端产品和基座的版本。
4. **兼容性矩阵**：记录每个 Release 的依赖版本、浏览器支持、API 兼容范围。
5. **发布审批**：QA 验收、安全扫描、产品负责人审批后才可上车。
6. **灰度与全量**：Release Train 产出后按 Canary → 全量发布。

**合规审计**：

- 所有制品操作可审计。
- 保留构建日志、测试结果、审批记录。
- 满足安全与合规要求（SOX、等保等）。

**评分维度**：
- 制品管理体系（30%）：是否覆盖仓库、命名、元数据、生命周期
- 发布火车设计（30%）：是否理解固定周期、版本分支、审批
- 多产品协调（20%）：是否考虑兼容性矩阵和发布日历
- 合规审计（20%）：是否提到审计、签名、保留策略

**常见错误**：
- 把发布火车等同于普通版本发布
- 制品没有统一规范，导致查找和回滚困难
- 忽略 Source Map 等关键制品的管理

**延伸追问**：
- 发布火车中某个关键 Bug 修复迟到了，如何处理？
- 多产品同时发版时，如何降低集成风险？

**相关题目**：
- [FB-12-CO-B-008 什么是构建产物管理](#FB-12-CO-B-008)
- [FB-12-EN-P-001 如何设计一套环境晋升策略](#FB-12-EN-P-001)

**参考资源**：
- [Scaled Agile - Release Train](https://www.scaledagileframework.com/agile-release-train/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-CP-R-006：如何度量并提升 CI/CD 成熟度？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：DORA、CI/CD 成熟度、MTTR、部署频率、变更前置时间、失败率
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明衡量 CI/CD 成熟度的关键指标（如 DORA），并给出持续提升 CI/CD 能力的思路。

**参考答案**：

**DORA 四个核心指标**：

1. **Deployment Frequency（部署频率）**：单位时间内成功部署到生产的次数。越高越好。
2. **Lead Time for Changes（变更前置时间）**：从代码提交到生产部署所需时间。越短越好。
3. **Mean Time To Recovery（MTTR，恢复时间）**：生产故障后恢复到正常状态所需时间。越短越好。
4. **Change Failure Rate（变更失败率）**：导致生产故障的部署占比。越低越好。

**补充指标**：

- Pipeline 平均执行时间
- 构建/测试成功率
- 代码覆盖率趋势
- 安全漏洞修复时长
- 发布窗口外故障数

**提升思路**：

1. **自动化一切**：从测试、构建、部署到回滚，减少人工干预。
2. **小批量发布**：降低单次变更风险，提升部署频率。
3. **可观测性**：建立从 Pipeline 到应用的完整监控与告警。
4. **标准化模板**：推广 Pipeline as Code 模板，统一最佳实践。
5. **持续反馈**：定期 review DORA 指标，识别瓶颈。
6. **文化与组织**：DevOps 文化、跨团队协作、无责复盘。

**成熟度模型**：

- L1 手动化：主要靠人工部署。
- L2 部分自动化：CI 自动化，部署仍有人工步骤。
- L3 持续交付：自动构建、测试、部署到类生产环境。
- L4 持续部署：自动发布到生产，具备自动回滚能力。
- L5 智能化：基于 AIOps 的异常检测和自愈。

**评分维度**：
- 指标理解（35%）：能否准确解释 DORA 四指标
- 提升思路（35%）：是否覆盖自动化、小批量、可观测、模板、文化
- 成熟度模型（20%）：是否能描述从手动到智能的演进
- 实践结合（10%）：能否结合自身团队说明当前阶段和改进方向

**常见错误**：
- 只关注部署频率，忽略失败率和恢复时间
- 把 CI/CD 成熟度等同于工具链复杂度
- 没有建立指标基线就盲目优化

**延伸追问**：
- 你们团队目前在 DORA 指标上处于哪个水平？
- 如何在业务压力下持续推进 CI/CD 改进？

**相关题目**：
- [FB-12-SD-P-002 如何设计一个完整的前端 CI/CD 平台](#FB-12-SD-P-002)
- [FB-12-CP-R-004 如何在持续交付中平衡发布速度与稳定性](#FB-12-CP-R-004)

**参考资源**：
- [DORA - Accelerate State of DevOps](https://dora.dev/)
- [Google Cloud - DORA metrics](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance)

**口头回答版**：
> DORA 四个核心指标： Deployment Frequency（部署频率）：单位时间内成功部署到生产的次数。 Lead Time for Changes（变更前置时间）：从代码提交到生产部署所需时间。 Mean Time To Recovery（MTTR，恢复时间）：生产故障后恢复到正常状态所需时间。

### FB-12-SD-R-007：如何设计支持多租户、多区域的前端 CI/CD 平台？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：CI/CD 平台、多租户、多区域、安全、可扩展
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个企业级前端 CI/CD 平台，支持多个业务团队（多租户）和多个地理区域部署，要求隔离、安全、可扩展。

**参考答案**：

**核心设计**：

1. **租户隔离**
   - 每个团队/事业群拥有独立的 Project/Group/Namespace。
   - 独立的 Runner 池、Secrets、制品仓库配额。
   - 网络层通过 VPC、Service Mesh 或命名空间隔离。

2. **统一平台层**
   - 统一的 Pipeline as Code 模板和最佳实践。
   - 共享的构建镜像、缓存服务、扫描工具。
   - 统一的可观测大盘和权限审计。

3. **多区域支持**
   - 各地区部署就近的 Runner 和缓存节点，降低网络延迟。
   - 制品仓库跨区域复制，保证一次构建可在多区域部署。
   - 部署目标按区域拆分，支持区域级灰度。

4. **安全与合规**
   - RBAC：按租户和角色分配流水线操作权限。
   - Secrets 隔离：不同租户使用独立的加密密钥或 Vault namespace。
   - 审计日志：记录谁、何时、在哪个租户执行了什么操作。

5. **成本与配额**
   - 按租户设置 CI 分钟、存储、并发数配额。
   - 闲置资源自动缩容，热点资源自动扩容。

**评分维度**：
- 租户隔离设计（25%）：是否从项目、Runner、Secrets、网络维度隔离
- 多区域架构（25%）：是否提到 Runner、缓存、制品复制
- 安全合规（20%）：是否提到 RBAC、审计、加密隔离
- 平台统一性（15%）：是否提供模板、镜像、工具共享
- 成本治理（15%）：是否提到配额和弹性伸缩

**常见错误**：
- 所有租户共享 Runner 和 Secrets，缺乏隔离
- 多区域各自独立构建，导致产物不一致
- 只关注功能，忽略合规审计

**延伸追问**：
- 一个租户被攻破，如何限制对其他租户的影响？
- 如何平衡租户隔离和平台资源共享？

**相关题目**：
- [FB-12-SD-P-002 如何设计一个完整的前端 CI/CD 平台](#FB-12-SD-P-002)
- [FB-12-SD-R-011 如何进行企业级 CI/CD 治理](#FB-12-SD-R-011)

**参考资源**：
- [GitLab - Multi-tenant considerations](https://docs.gitlab.com/ee/administration/reference_architectures/)
- [AWS - Multi-tenant SaaS architecture](https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/introduction.html)

**口头回答版**：
> 多租户 CI/CD 平台要按团队做隔离：独立项目、独立 Runner 池、独立 Secrets，网络也要隔离开。平台层统一提供模板、构建镜像、扫描工具和可观测。多区域要就近布 Runner 和缓存，制品跨区域复制，一次构建到处部署。还要做 RBAC、审计、配额和弹性伸缩，兼顾安全和成本。

---

### FB-12-SD-R-008：如何在 CI/CD 中落地 DevSecOps？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：DevSecOps、安全、供应链、SAST、DAST
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请从流程、工具、组织三个维度，设计一套在 CI/CD 中落地 DevSecOps 的方案，使安全成为开发流程的一部分而非阻力。

**参考答案**：

**核心理念**：安全左移（Shift Left），在最早阶段发现并修复安全问题，同时不过度阻塞开发效率。

**1. 流程维度**

- **提交前**：pre-commit hooks 检测 Secrets、基础 lint。
- **PR 阶段**：SAST、依赖漏洞扫描、License 检查、代码审查。
- **构建阶段**：镜像扫描、SBOM 生成、Artifact 签名。
- **部署阶段**：DAST、配置漂移检查、IAM 权限校验。
- **运行阶段**：RASP、WAF、运行时漏洞响应。

**2. 工具维度**

- SAST：SonarQube、CodeQL、Semgrep。
- SCA：Snyk、OWASP Dependency-Check、npm audit。
- 镜像扫描：Trivy、Grype。
- Secret 扫描：GitLeaks、TruffleHog。
- 策略即代码：OPA、Open Policy Agent。

**3. 组织维度**

- 安全团队提供" guardrails "而非" gates "，给出修复建议和时间窗。
- 建立安全 Champions，培养开发团队安全意识。
- 将安全指标纳入团队 OKR/DORA。
- 定期进行红队演练和漏洞复盘。

**评分维度**：
- 流程覆盖（30%）：是否覆盖提交、PR、构建、部署、运行全阶段
- 工具选型（25%）：是否知道 SAST/SCA/DAST/Secret 扫描工具
- 安全左移（20%）：是否强调早发现早修复
- 组织文化（15%）：是否提到 guardrails、Champions、OKR
- 效率平衡（10%）：是否避免过度阻塞

**常见错误**：
- 把所有扫描放在部署前，导致反馈极慢
- 安全团队只做审批，不提供服务
- 发现高危漏洞没有修复 SLA，长期堆积

**延伸追问**：
- 如何处理大量历史漏洞导致门禁无法通过？
- 安全扫描误报率很高时，如何降低对开发的干扰？

**相关题目**：
- [FB-12-EN-P-007 如何保障 CI/CD 软件供应链安全](#FB-12-EN-P-007)
- [FB-12-EN-A-013 如何在 CI/CD 中监控和控制 Bundle Size](#FB-12-EN-A-013)

**参考资源**：
- [DevSecOps - OWASP](https://owasp.org/www-project-devsecops-guideline/)
- [SLSA Framework](https://slsa.dev/)

**口头回答版**：
> DevSecOps 就是安全左移，把安全嵌入到 CI/CD 每个阶段。提交前扫 Secrets，PR 阶段做 SAST 和依赖漏洞扫描，构建时扫镜像、生成 SBOM，部署前做 DAST。安全团队要提供 guardrails 而不是只卡门禁，还要培养 Champions。关键是早发现早修，但别为了安全把流水线拖得太慢。

---

### FB-12-SD-R-009：如何设计发布编排系统，实现自动灰度、观测与回滚？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：发布编排、自动回滚、灰度、观测、SRE
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一个发布编排系统（Release Orchestrator），能够自动完成灰度发布、实时监控，并在指标异常时自动回滚。

**参考答案**：

**系统组件**：

1. **编排引擎**：管理发布阶段（Staging → Canary → Production），控制流量切换节奏。
2. **制品仓库**：保存不可变 Artifact，按版本索引。
3. **流量控制**：Service Mesh / Ingress / CDN Edge 实现按区域、用户、Header 切流。
4. **观测平台**：实时采集错误率、延迟、业务指标、自定义埋点。
5. **决策模块**：基于 SLO/错误预算判断是否继续扩量或回滚。
6. **执行器**：调用部署 API、特性开关、CDN 刷新完成发布或回滚。

**发布流程**：

1. 验证阶段：Staging 全量验证。
2. 灰度阶段：1% → 5% → 25% → 50% → 100%，每阶段停留并观测。
3. 自动判定：指标全部正常则自动进入下一阶段；异常则自动回滚并告警。
4. 完成：更新基线，记录发布审计日志。

**回滚策略**：

- 流量切回旧版本（蓝绿/金丝雀）。
- 关闭特性开关。
- 触发 PagerDuty/On-Call。

**评分维度**：
- 架构完整性（30%）：是否覆盖编排、流量、观测、决策、执行
- 灰度策略（25%）：是否设计分阶段扩量和观测
- 自动决策（25%）：是否提到基于指标的自动回滚
- 安全与审计（10%）：是否记录审计日志和通知
- 与 CI/CD 集成（10%）：是否说明如何衔接构建和部署

**常见错误**：
- 灰度阶段没有明确的 SLO 和停留时间
- 自动回滚只依赖单一指标，误报率高
- 回滚时没有同步处理数据库/API 兼容问题

**延伸追问**：
- 自动回滚失败时，人工介入的流程是什么？
- 如何处理灰度期间核心业务指标下降但技术指标正常的情况？

**相关题目**：
- [FB-12-EN-A-006 金丝雀发布的原理和实现要点](#FB-12-EN-A-006)
- [FB-12-CP-R-004 如何在持续交付中平衡发布速度与稳定性](#FB-12-CP-R-004)

**参考资源**：
- [Google SRE - Release Engineering](https://sre.google/sre-book/release-engineering/)
- [Argo Rollouts](https://argoproj.github.io/argo-rollouts/)

**口头回答版**：
> 发布编排系统核心是编排引擎、流量控制、观测平台和决策模块。发布分阶段灰度，比如 1%、5%、25% 这样，每个阶段观测错误率、延迟、业务指标，正常就继续扩，异常就自动回滚。流量切换可以用 Service Mesh 或 CDN Edge，回滚可以切流量或关特性开关。关键是要有明确 SLO 和审计日志。

---

### FB-12-SD-R-010：如何设计前端制品的不可变性与全链路可追溯架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：制品管理、不可变产物、可追溯、SBOM、签名
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套前端制品（Artifact）管理体系，要求制品不可变、全链路可追溯，并支持安全审计和快速回滚。

**参考答案**：

**不可变性设计**：

1. 构建产物按内容哈希或 commit SHA 命名，禁止覆盖。
2. 每个 Artifact 对应唯一的 build ID 和 source revision。
3. 发布后，不允许原地修改 Artifact，只能通过发布新版本替换。

**全链路可追溯**：

1. **构建阶段**：记录 commit、branch、构建参数、依赖 lockfile。
2. **测试阶段**：关联测试报告、覆盖率、质量门禁结果。
3. **安全阶段**：记录 SAST/SCA/SBOM、镜像扫描结果、签名信息。
4. **部署阶段**：记录部署目标、部署人/服务、时间、流量比例。
5. **运行阶段**：关联运行时版本、错误监控、日志。

**技术实现**：

- 制品仓库：JFrog Artifactory / Nexus / Harbor / S3。
- 签名：cosign / Notary 对 Artifact 和镜像签名。
- SBOM：生成并保存 SPDX/CycloneDX 格式的物料清单。
- 元数据数据库：记录 Artifact 全生命周期事件，支持查询和审计。

**评分维度**：
- 不可变性（25%）：是否理解不可覆盖、按版本管理
- 可追溯链路（30%）：是否覆盖构建、测试、安全、部署、运行
- 安全机制（20%）：是否提到签名、SBOM、访问控制
- 可审计性（15%）：是否设计审计日志和查询能力
- 回滚能力（10%）：是否支持快速定位并回滚到指定版本

**常见错误**：
- 允许同一版本号对应不同产物
- 只保存产物本身，不保存构建元数据
- 签名和校验只在部署前做一次，没有持续验证

**延伸追问**：
- 如何验证生产部署的 Artifact 就是 CI 中通过测试的那份？
- SBOM 信息如何与运行时漏洞情报联动？

**相关题目**：
- [FB-12-CO-B-008 什么是构建产物管理](#FB-12-CO-B-008)
- [FB-12-SD-R-005 如何设计企业级前端制品管理与发布火车](#FB-12-SD-R-005)

**参考资源**：
- [SLSA - Provenance](https://slsa.dev/spec/v1.0/provenance)
- [cosign](https://github.com/sigstore/cosign)

**口头回答版**：
> 制品不可变就是按 commit SHA 或内容哈希命名，不允许覆盖，发布新版本就换路径。全链路可追溯要把构建参数、测试报告、SBOM、签名、部署记录、运行时错误都关联起来。用制品仓库存储，cosign 签名，生成 SBOM，还要有一个元数据数据库方便查询和审计。这样才能快速回滚和定位问题。

---

### FB-12-SD-R-011：如何进行企业级 CI/CD 治理，实现模板化与度量驱动？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：CI/CD 治理、模板化、DORA、平台化、标准化
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
作为前端架构师，你如何在企业内推进 CI/CD 治理，使各团队的流水线既标准化又能保持灵活性？

**参考答案**：

**治理框架**：

1. **Golden Path（黄金路径）**
   - 提供官方 Pipeline 模板，覆盖常见场景（SPA、Monorepo、SSR、组件库）。
   - 团队可基于模板扩展，但核心阶段和门禁必须保留。

2. **模板即代码**
   - 使用 Reusable Workflow、Shared Library 或 Pipeline Template 管理。
   - 版本化发布，团队可渐进升级。

3. **策略与门禁**
   - 强制要求：测试、Lint、类型检查、安全扫描。
   - 可选增强：Lighthouse CI、Bundle Size、可视化回归。
   - 使用 Policy as Code 检查流水线是否符合规范。

4. **度量驱动**
   - DORA 四指标 + Pipeline 时长、失败率、恢复时间。
   - 团队级仪表盘，定期 review 和改进。

5. **平台化与自助服务**
   - 建立 CI/CD 门户，提供项目创建、Secrets 申请、Runner 管理、问题排查。
   - 降低团队接入门槛。

**评分维度**：
- 标准化策略（25%）：是否提出 Golden Path 和模板即代码
- 灵活性平衡（20%）：是否允许团队在模板基础上扩展
- 度量体系（25%）：是否覆盖 DORA 和流水线指标
- 平台化能力（15%）：是否提到自助服务和门户
- 治理落地（15%）：是否考虑培训、审计、激励机制

**常见错误**：
- 一刀切，不允许任何团队自定义
- 只提供文档，没有可复用的模板
- 度量指标过多，团队无所适从

**延伸追问**：
- 如何推动已有项目迁移到新的标准化模板？
- 当某个团队需要突破标准时，审批流程如何设计？

**相关题目**：
- [FB-12-CP-R-006 如何度量并提升 CI/CD 成熟度](#FB-12-CP-R-006)
- [FB-12-SD-P-002 如何设计一个完整的前端 CI/CD 平台](#FB-12-SD-P-002)

**参考资源**：
- [Spotify - Golden Paths](https://backstage.io/demos/)
- [DORA - Accelerate](https://dora.dev/)

**口头回答版**：
> 企业 CI/CD 治理要做 Golden Path，提供官方模板覆盖常见场景，团队可以扩展但不能删掉核心门禁。模板用 Reusable Workflow 或 Shared Library 管理并版本化。通过 Policy as Code 检查合规，用 DORA 和流水线指标驱动改进。还要做自助门户降低接入门槛。关键是既要标准化，也要给团队留灵活性。

---

### FB-12-SD-R-012：如何设计面向 Serverless 与边缘计算的 CI/CD 架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：Serverless、边缘计算、CDN、CI/CD、无服务器
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套面向 Serverless 函数和边缘计算（Edge Computing）的 CI/CD 架构，要求支持函数与静态资源协同部署、灰度和回滚。

**参考答案**：

**部署单元**：

- 静态资源：JS/CSS/HTML，托管在对象存储 + CDN。
- 边缘函数：Vercel Functions、Cloudflare Workers、AWS Lambda@Edge。
- 配置：KV、环境变量、路由规则、Middleware。

**CI/CD 流程**：

1. **构建**：同时产出静态资源和函数包，生成内容哈希和版本清单。
2. **验证**：
   - 单元/集成测试；
   - 函数包大小、冷启动时间检查；
   - 边缘运行时 API 兼容性检查。
3. **部署**：
   - 静态资源上传到 OSS/CDN；
   - 函数部署到边缘平台；
   - 原子更新路由/KV 配置。
4. **灰度**：通过 CDN Edge 规则或流量百分比切量。
5. **回滚**：回退函数版本和静态资源目录，同步回滚配置。

**关键设计**：

- 函数与静态资源版本绑定，防止版本错位。
- 配置外置，通过 CI 更新并验证。
- 使用区域级部署和灰度，避免全球一次性切换。

**评分维度**：
- 架构完整性（30%）：是否覆盖构建、验证、部署、灰度、回滚
- Serverless 特性（25%）：是否理解函数包大小、冷启动、运行时限制
- 协同部署（20%）：是否保证函数与静态资源版本一致
- 灰度回滚（15%）：是否支持边缘灰度和快速回滚
- 可观测（10%）：是否提到函数日志和边缘指标

**常见错误**：
- 把 Serverless 当传统服务器部署，忽略冷启动和包大小
- 函数和静态资源分开版本管理，导致运行时错误
- 边缘配置变更没有版本化，回滚困难

**延伸追问**：
- 如何在 CI 中模拟边缘运行时的 API 限制？
- 边缘函数部署到全球多个区域，如何控制发布节奏？

**相关题目**：
- [FB-12-EN-P-017 SSR 或边缘渲染项目的 CI/CD 有哪些特殊考虑](#FB-12-EN-P-017)
- [FB-12-SD-R-002 如何设计零停机全球前端部署方案](#FB-12-SD-R-002)

**参考资源**：
- [Cloudflare Workers - Deployment](https://developers.cloudflare.com/workers/)
- [AWS Lambda@Edge](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html)

**口头回答版**：
> Serverless/边缘 CI/CD 要同时部署静态资源和函数。构建产出带 hash 的静态文件和函数包，验证函数包大小、冷启动、API 兼容性。部署时先传静态资源，再部署函数，最后原子更新路由和 KV 配置。灰度用 CDN Edge 切流量，回滚要同步回退函数版本和静态资源。关键是两者版本要绑定。

---

### FB-12-SD-R-013：大型 Monorepo 下如何协调 CI/CD、发布火车与版本兼容？

**题型**：系统设计题
**难度**：⚫ 架构
**面试知识域**：12 CI/CD
**标签**：Monorepo、发布火车、版本兼容、CI/CD、Release Train
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
在包含数百个包的大型 Monorepo 中，如何协调 CI/CD 效率、发布火车（Release Train）节奏以及包之间的版本兼容性？

**参考答案**：

**核心策略**：

1. **分层 CI**
   - 使用 `affected` 或 `--filter` 只构建和测试受影响的包。
   - 关键路径包变更时触发全量回归。

2. **依赖图管理**
   - 维护包之间的依赖图，自动识别变更影响范围。
   - 对核心包的变更设置更严格的 Code Review 和测试。

3. **发布火车**
   - 固定周期（如每两周）发车，聚合已就绪的 changeset。
   - 发车前冻结 feature，只允许 bugfix 上车。
   - 生成 RC 版本跑集成验证。

4. **版本兼容**
   - 公共 API 必须向后兼容，Breaking Change 需走 deprecation 周期。
   - 使用 SemVer 和 dist-tag 区分 stable / next。
   - 运行契约测试和集成测试验证兼容性。

5. **回滚与热修复**
   - 保留 release 分支，支持从 release branch 切热修复。
   - 关键 bug 可单独 patch，不必等下一班车。

**评分维度**：
- CI 效率（25%）：是否使用 affected 和依赖图控制范围
- 发布节奏（25%）：是否理解 Release Train 的发车、冻结、RC
- 版本兼容（25%）：是否提到 SemVer、向后兼容、契约测试
- 热修复机制（15%）：是否支持独立 patch
- 治理与沟通（10%）：是否提到发布日历、变更通知

**常见错误**：
- 任何变更都全量构建，CI 时间过长
- 发布火车没有冻结期，导致变更不断涌入
- Breaking Change 没有 deprecation 周期，下游大面积报错

**延伸追问**：
- 如果核心包变更影响 80% 的包，如何控制 CI 和发布范围？
- 发布火车延误时，如何决定是否延期还是跳过某些 feature？

**相关题目**：
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线](#FB-12-EN-A-001)
- [FB-12-EN-P-014 如何为 Monorepo 设计自动化版本发布和 Changelog 生成](#FB-12-EN-P-014)

**参考资源**：
- [Turborepo - Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Scaled Agile - Release Train](https://www.scaledagileframework.com/agile-release-train/)

**口头回答版**：
> 大 Monorepo 要分层 CI，用 affected 只跑受影响的包，核心包变更再全量回归。发布火车固定周期发车，发车前冻结 feature，只上 bugfix，先生成 RC 验证。版本兼容要 SemVer，公共 API 保持向后兼容，Breaking Change 走 deprecation。还要保留 release branch 做热修复，别什么都等下一班车。

---

### FB-12-SD-R-014：如何设计 CI/CD 系统的灾难恢复与业务连续性方案？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：灾难恢复、业务连续性、备份、RTO、RPO
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请为企业的 CI/CD 系统设计灾难恢复（DR）与业务连续性（BCP）方案，确保在平台故障、数据丢失或区域不可用时仍能恢复发布能力。

**参考答案**：

**关键风险**：
- CI 平台宕机导致无法构建和部署。
- 制品仓库损坏或误删。
- 源代码仓库不可用。
- 区域级故障影响 Runner 和部署目标。

**恢复策略**：

1. **多平台备份**
   - 关键仓库镜像到备用 Git 托管（如 GitHub ↔ GitLab）。
   - Pipeline 定义作为代码天然在 Git 中备份。

2. **制品冗余**
   - Artifact 和镜像跨区域复制。
   - 保留最近 N 个版本的 immutable 产物。

3. **Runner 冗余**
   - 多区域自托管 Runner，支持切换。
   - 关键项目保留本地备用 Runner。

4. **RTO/RPO 目标**
   - 明确恢复时间（RTO）和数据恢复点（RPO）。
   - 核心服务 RTO 小时级，制品 RPO 接近零。

5. **DR 演练**
   - 定期进行灾难恢复演练，验证备份可恢复、备用平台可发布。
   - 更新 runbook 和联系人。

**评分维度**：
- 风险识别（20%）：是否覆盖平台、仓库、制品、区域故障
- 备份策略（25%）：是否设计代码、流水线、制品冗余
- RTO/RPO（20%）：是否设定恢复目标
- Runner 与部署冗余（20%）：是否有多区域 Runner 和切换能力
- 演练与 runbook（15%）：是否定期演练

**常见错误**：
- 只备份代码，不备份制品和部署配置
- 没有备用 CI 平台，单点故障
- 灾难恢复方案只停留在文档，从未演练

**延伸追问**：
- 如果 CI 平台完全不可用，如何手动完成一次紧急发布？
- 制品仓库被误删后，如何从生产环境恢复可部署版本？

**相关题目**：
- [FB-12-SD-P-002 如何设计一个完整的前端 CI/CD 平台](#FB-12-SD-P-002)
- [FB-12-SD-R-010 如何设计前端制品的不可变性与全链路可追溯架构](#FB-12-SD-R-010)

**参考资源**：
- [AWS - Disaster Recovery](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html)
- [Google SRE - Reliability](https://sre.google/sre-book/being-on-call/)

**口头回答版**：
> CI/CD 也要做灾备。代码和流水线在 Git 里本来就有备份，但还要把制品跨区域复制，Runner 多区域部署，关键仓库镜像到备用平台。要定 RTO 和 RPO，比如核心服务几小时内恢复。还要定期演练，验证备用平台真的能发布，不能只在文档里写。

---

### FB-12-CP-R-015：如何看待 AI 在 CI/CD 中的应用？设计智能化流水线需要考虑什么？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：AI、CI/CD、智能化、AIOps、自动化测试
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
随着 AI 技术的发展，CI/CD 流程也开始引入智能化能力。请谈谈你对 AI 在 CI/CD 中应用的看法，并说明设计智能化流水线时需要考虑哪些因素。

**参考答案**：

**AI 可应用的场景**：

1. **失败根因分析**：自动解析日志，定位失败模块和建议修复。
2. **Flaky Test 检测**：基于历史数据识别不稳定测试。
3. **测试生成与补充**：根据代码变更生成单元测试或 E2E 用例。
4. **代码审查辅助**：自动检查变更影响、安全性、性能。
5. **构建优化**：预测缓存命中率，推荐任务拆分和并行策略。
6. **发布决策**：基于历史指标和风险评估推荐是否发布。

**设计考虑**：

1. **信任与可解释性**：AI 建议需要可解释，不能黑盒决策。
2. **数据隐私**：不要把源码、Secrets、用户数据发送给不可信 AI 服务。
3. **人机协同**：AI 辅助而非替代，关键发布仍需人工确认。
4. **幻觉与边界**：AI 可能给出错误建议，需有验证和回退机制。
5. **渐进引入**：从低风险场景（如日志摘要、测试推荐）开始试点。
6. **反馈闭环**：收集人工修正数据，持续优化模型。

**评分维度**：
- 场景理解（30%）：能否列举 4 个以上 AI 应用场景
- 风险意识（25%）：是否提到隐私、幻觉、信任
- 设计原则（25%）：是否强调人机协同、渐进、闭环
- 架构思考（20%）：是否能设计 AI 与现有 CI/CD 的集成方式

**常见错误**：
- 过度依赖 AI 做自动发布决策
- 把源码直接发送给公共 LLM，泄露知识产权
- 忽略 AI 建议的验证，导致错误修复

**延伸追问**：
- 如果 AI 推荐的测试用例大量误报，你会如何调整？
- 在你们团队，哪个 CI/CD 环节最适合先引入 AI？

**相关题目**：
- [FB-12-CP-R-006 如何度量并提升 CI/CD 成熟度](#FB-12-CP-R-006)
- [FB-12-EN-P-009 CI/CD 中如何识别和治理 Flaky Test](#FB-12-EN-P-009)

**参考资源**：
- [GitHub Copilot - PR summaries](https://github.blog/2023-03-22-how-github-copilot-is-getting-better-at-understanding-your-code/)
- [AIOps - Gartner](https://www.gartner.com/en/information-technology/glossary/aiops)

**口头回答版**：
> AI 在 CI/CD 里可以做失败根因分析、识别 flaky test、生成测试、辅助代码审查、优化构建。但设计时要考虑信任、可解释性和数据隐私，不能把源码随便发给公共模型。AI 是辅助不是替代，关键发布还要人确认。建议从低风险场景开始试点，收集反馈持续优化，不能一开始就让 AI 自动决定发布。

---

### FB-12-CO-B-017：CI/CD 中的 Stage 和 Job 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：12 CI/CD
**标签**：CI/CD、Stage、Job、流水线、执行顺序
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 CI/CD 流水线中 Stage（阶段）与 Job（任务）的区别，并说明它们在执行顺序上的关系。

**参考答案**：

**Stage（阶段）**：流水线中的逻辑划分，例如 `build`、`test`、`deploy`。同一 Stage 内的多个 Job 默认并行执行，不同 Stage 按定义顺序串行执行。

**Job（任务）**：Stage 内的最小执行单元，包含实际脚本、环境配置、产物、缓存等。多个 Job 可以在同一 Stage 并行运行。

关系：Pipeline 包含多个 Stage，Stage 包含多个 Job。Stage 控制阶段顺序，Job 负责具体工作。

**评分维度**：
- 概念区分（50%）：能否清晰区分 Stage 与 Job
- 执行顺序（30%）：是否理解 Stage 串行、Job 并行的规则
- 工具映射（20%）：能否对应到 GitLab CI / GitHub Actions 的概念

**常见错误**：
- 把 Stage 和 Job 混为一谈
- 认为 Job 之间默认串行
- 忽略 Stage 失败会阻止后续 Stage 执行

**延伸追问**：
- 如果某个 Stage 中的 Job 全部并行但资源有限，你会如何优化？
- 不同 CI 工具对 Stage/Job 的命名有何差异？

**相关题目**：
- [FB-12-EN-B-003 GitHub Actions 的核心概念有哪些](#FB-12-EN-B-003)
- [FB-12-EN-B-004 GitLab CI 的核心概念有哪些](#FB-12-EN-B-004)

**参考资源**：
- [GitLab CI/CD Stages](https://docs.gitlab.com/ee/ci/yaml/#stages)
- [GitHub Actions Jobs](https://docs.github.com/en/actions/using-jobs)

**口头回答版**：
> Stage（阶段）：流水线中的逻辑划分，例如 build、test、deploy。 同一 Stage 内的多个 Job 默认并行执行，不同 Stage 按定义顺序串行执行。 Job（任务）：Stage 内的最小执行单元，包含实际脚本、环境配置、产物、缓存等。 多个 Job 可以在同一 Stage 并行运行。

---

### FB-12-EN-B-018：Git Hooks 是什么？如何与 CI/CD 配合？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：Git Hooks、pre-commit、husky、代码质量、本地校验
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Git Hooks 的作用，并解释如何在 CI/CD 流程中与本地 pre-commit 校验协同工作。

**参考答案**：

**Git Hooks** 是 Git 在特定事件（如提交、推送、合并）前后触发的脚本，常见钩子包括：

- `pre-commit`：提交前运行，常用于 lint、格式化检查。
- `commit-msg`：校验提交信息格式。
- `pre-push`：推送前运行测试或构建。

与 CI/CD 配合：

1. **本地快速反馈**：pre-commit 拦截 obvious 错误，减少 CI 资源浪费。
2. **CI 最终把关**：CI 中仍要运行完整测试和门禁，不能依赖本地钩子（可被绕过）。
3. **工具统一**：使用 husky、lint-staged 等工具降低配置成本。

```bash
# .husky/pre-commit
npx lint-staged
```

**评分维度**：
- 概念理解（40%）：能否说明常见 Git Hooks 的作用
- 协同意识（30%）：是否理解本地钩子与 CI 的关系
- 实践落地（30%）：能否提到 husky、lint-staged 等工具

**常见错误**：
- 认为 pre-commit 可以替代 CI
- 配置过多钩子导致本地提交过慢
- 忽略团队成员可能绕过本地钩子

**延伸追问**：
- 如果 pre-commit 检查太慢，如何优化体验？
- CI 中如何确保提交信息符合规范？

**相关题目**：
- [FB-12-EN-B-013 CI/CD 中 lockfile 的作用是什么](#FB-12-EN-B-013)
- [FB-12-EN-A-012 如何在 CI 中集成 Lighthouse CI](#FB-12-EN-A-012)

**参考资源**：
- [Git Hooks 文档](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [husky](https://typicode.github.io/husky/)

**口头回答版**：
> Git Hooks 是 Git 在特定事件（如提交、推送、合并）前后触发的脚本，常见钩子包括： - pre-commit：提交前运行，常用于 lint、格式化检查。 - commit-msg：校验提交信息格式。 - pre-push：推送前运行测试或构建。

---

### FB-12-CO-B-019：什么是蓝绿部署？前端应用需要注意什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：蓝绿部署、零停机、版本切换、回滚
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释蓝绿部署（Blue-Green Deployment）的原理，并说明前端应用在实施蓝绿部署时的注意事项。

**参考答案**：

**蓝绿部署**：同时维护两套完全相同的生产环境（蓝色为当前版本，绿色为新版本）。流量先全部指向蓝色，验证绿色版本正常后，一次性切换流量到绿色；若异常，可快速切回蓝色。

前端注意事项：

1. **静态资源版本化**：JS/CSS 使用内容哈希，避免新旧版本资源混合加载。
2. **入口 HTML 一致切换**：HTML 与对应版本的静态资源绑定，避免缓存导致用户拿到旧 HTML 但加载新资源。
3. **Session/状态隔离**：登录态、缓存数据在切换时需保持一致或重新验证。
4. **数据库/API 兼容**：前端切换通常依赖后端 API 向后兼容。

**评分维度**：
- 原理理解（40%）：能否说清蓝绿部署的两套环境和流量切换
- 前端适配（40%）：是否提到资源版本化和 HTML 切换
- 回滚意识（20%）：是否理解快速回滚的价值

**常见错误**：
- 把蓝绿部署等同于滚动更新
- 忽略静态资源缓存导致版本错乱
- 认为蓝绿部署不需要考虑 API 兼容

**延伸追问**：
- 蓝绿部署和金丝雀发布有什么区别？
- 前端资源如何与后端 API 版本对齐？

**相关题目**：
- [FB-12-EN-A-004 几种常见的部署策略有什么区别](#FB-12-EN-A-004)
- [FB-12-EN-A-005 蓝绿部署的原理和前端注意事项](#FB-12-EN-A-005)

**参考资源**：
- [Martin Fowler - BlueGreenDeployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-B-020：什么是 Self-Hosted Runner？什么时候应该使用？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：Self-Hosted Runner、GitHub Actions、GitLab Runner、私有环境
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Self-Hosted Runner 的概念，并说明前端团队在哪些场景下应该使用自托管 Runner。

**参考答案**：

**Self-Hosted Runner** 是由用户自己部署和维护的 CI 执行代理，与云厂商提供的 Shared Runner 相对。它运行在自己的服务器、虚拟机或容器上，执行流水线中的 Job。

适用场景：

1. **访问私有资源**：需要访问内网服务、私有 Registry、内部测试环境。
2. **自定义环境**：需要特定操作系统、GPU、专有许可证或预装软件。
3. **安全合规**：代码或构建产物不能离开公司网络。
4. **成本优化**：大规模构建时使用已有基础设施，降低按分钟计费成本。
5. **性能需求**：需要更大内存、更快磁盘或持久化缓存。

注意事项：

- _runner 安全性_：Runner 可能被恶意 PR 利用，需限制权限和网络访问。
- _维护成本_：需要自行升级、监控、扩容。

**评分维度**：
- 概念理解（40%）：能否说清 Self-Hosted Runner 与 Shared Runner 的区别
- 适用场景（40%）：能否列举 3 个以上使用场景
- 风险意识（20%）：是否提到安全和维护成本

**常见错误**：
- 认为自托管 Runner 一定比 Shared Runner 好
- 忽略 Runner 可能成为安全攻击面
- 自托管 Runner 没有隔离，导致不同 Job 互相污染

**延伸追问**：
- 如何防止 Self-Hosted Runner 执行来自 fork 仓库的恶意代码？
- 自托管 Runner 的缓存和并发如何管理？

**相关题目**：
- [FB-12-SD-R-007 如何设计支持多租户、多区域的前端 CI/CD 平台](#FB-12-SD-R-007)
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线](#FB-12-EN-A-001)

**参考资源**：
- [GitHub - Self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners)
- [GitLab Runner](https://docs.gitlab.com/runner/)

**口头回答版**：
> Self-Hosted Runner 是由用户自己部署和维护的 CI 执行代理，与云厂商提供的 Shared Runner 相对。 它运行在自己的服务器、虚拟机或容器上，执行流水线中的 Job。 访问私有资源：需要访问内网服务、私有 Registry、内部测试环境。 自定义环境：需要特定操作系统、GPU、专有许可证或预装软件。

---

### FB-12-CO-B-021：CI/CD 中的回滚（Rollback）有哪些常见方式？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：回滚、Rollback、蓝绿部署、版本回退、故障恢复
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 CI/CD 中回滚（Rollback）的常见方式，并比较它们的适用场景。

**参考答案**：

回滚是将生产环境恢复到上一个稳定版本的手段，常见方式：

1. **重新部署旧版本**
   - 重新触发旧版本流水线的部署 Job。
   - 适合大多数静态资源或容器化部署。

2. **蓝绿/金丝雀切换**
   - 蓝绿部署中切回蓝色环境；金丝雀中降低新版本流量比例。
   - 恢复最快，但需要预先部署两套环境。

3. **DNS/CDN 切换**
   - 修改 DNS 或 CDN 回源路径指向旧版本目录。
   - 适合全球 CDN 部署。

4. **特性开关关闭**
   - 通过 Feature Flag 关闭出问题的新功能。
   - 适合代码已合并但功能可独立关闭的场景。

5. **GitOps 回退**
   - 回退 GitOps 配置仓库中的镜像或配置版本，控制器自动同步。

**评分维度**：
- 方式覆盖（50%）：能否列举 3 种以上回滚方式
- 场景匹配（30%）：能否根据场景选择合适方式
- 速度意识（20%）：是否理解不同方式的恢复速度差异

**常见错误**：
- 只依赖重新部署，忽略更快的切换方式
- 回滚时忽略数据库/API 兼容性问题
- 没有保留历史版本导致无法回滚

**延伸追问**：
- 如果新版本修改了数据库 schema，回滚时需要注意什么？
- 如何确保回滚后的前端资源版本与入口 HTML 一致？

**相关题目**：
- [FB-12-EN-A-004 几种常见的部署策略有什么区别](#FB-12-EN-A-004)
- [FB-12-SD-R-009 如何设计发布编排系统，实现自动灰度、观测与回滚](#FB-12-SD-R-009)

**参考资源**：
- [AWS - Rollback Strategies](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/rollback-strategies.html)

**口头回答版**：
> 回滚是将生产环境恢复到上一个稳定版本的手段，常见方式： - 重新触发旧版本流水线的部署 Job。 - 适合大多数静态资源或容器化部署。 - 蓝绿部署中切回蓝色环境；金丝雀中降低新版本流量比例。

---

### FB-12-EN-B-022：CI/CD 中的并行（Parallelism）与并发（Concurrency）有什么区别？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：并行、并发、Pipeline、性能、资源
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CI/CD 流水线中并行（Parallelism）与并发（Concurrency）的区别，并说明如何合理使用它们。

**参考答案**：

**并行（Parallelism）**：多个任务在同一时刻同时执行，例如同一 Job 的多个矩阵实例、同一 Stage 的多个 Job。目的是缩短总耗时。

**并发（Concurrency）**：同一时间内可以执行的任务数量，受限于 Runner/Agent 数量、CPU、内存、网络等资源。并发是资源维度的限制。

合理使用：

1. **并行化独立任务**：lint、test、build 相互独立时并行执行。
2. **分片测试**：将测试集拆分到多个 Job 并行运行。
3. **控制并发**：通过 `max-parallel`、`concurrency group` 防止资源耗尽或部署冲突。
4. **避免无意义并行**：大量小任务并行可能因调度开销反而变慢。

**评分维度**：
- 概念区分（50%）：能否说清并行是任务维度、并发是资源维度
- 应用能力（30%）：能否举例说明如何合理使用
- 资源意识（20%）：是否理解并发限制的重要性

**常见错误**：
- 把并行和并发混为一谈
- 无限制并行导致 CI 成本飙升
- 忽略并发控制导致部署冲突

**延伸追问**：
- 如何在 GitHub Actions 中限制同一工作流的并发执行？
- 测试分片时，如何平衡每片的执行时间？

**相关题目**：
- [FB-12-EN-B-011 CI/CD 中的 Matrix Build 有什么作用](#FB-12-EN-B-011)
- [FB-12-EN-A-011 如何在 CI/CD 中并行化和分片运行 E2E 测试](#FB-12-EN-A-011)

**参考资源**：
- [GitHub Actions - Concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency)
- [GitLab CI - Parallel](https://docs.gitlab.com/ee/ci/yaml/#parallel)

**口头回答版**：
> 并行（Parallelism）：多个任务在同一时刻同时执行，例如同一 Job 的多个矩阵实例、同一 Stage 的多个 Job。 并发（Concurrency）：同一时间内可以执行的任务数量，受限于 Runner/Agent 数量、CPU、内存、网络等资源。 并发是资源维度的限制。 并行化独立任务：lint、test、build 相互独立时并行执行。

---

### FB-12-CO-B-023：什么是不可变基础设施（Immutable Infrastructure）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：不可变基础设施、Immutable Infrastructure、容器、版本化
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释不可变基础设施（Immutable Infrastructure）的概念，并说明它如何提升部署的可靠性。

**参考答案**：

**不可变基础设施**：服务器或部署单元一旦创建就不被修改，任何变更都通过创建新的实例并替换旧实例完成。旧实例保留或销毁，不会出现"同一个实例被多次修改"的情况。

在前端 CI/CD 中体现：

1. **Docker 镜像**：构建后镜像只读，部署时拉取新镜像。
2. **静态资源**：JS/CSS/HTML 按版本目录存储，不覆盖旧版本。
3. **配置外置**：运行时通过环境变量或配置中心注入，不修改镜像。

可靠性提升：

- **可预测**：每次部署都是已知状态，避免"雪花服务器"。
- **可回滚**：直接切换回上一个稳定实例或版本。
- **可追溯**：每个版本对应明确的构建产物和元数据。

**评分维度**：
- 概念理解（50%）：能否准确解释不可变基础设施
- 前端映射（30%）：能否对应到 Docker、静态资源版本化
- 价值说明（20%）：是否理解可预测、可回滚、可追溯

**常见错误**：
- 把不可变基础设施等同于容器化
- 认为不可变意味着不能更新配置
- 忽略前端静态资源也需要版本化不可变

**延伸追问**：
- 不可变基础设施与蓝绿部署有什么关系？
- 配置外置后，如何保证配置变更的一致性？

**相关题目**：
- [FB-12-EN-B-007 Docker 在前端 CI/CD 中通常扮演什么角色](#FB-12-EN-B-007)
- [FB-12-SD-R-010 如何设计前端制品的不可变性与全链路可追溯架构](#FB-12-SD-R-010)

**参考资源**：
- [Martin Fowler - ImmutableServer](https://martinfowler.com/bliki/ImmutableServer.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-B-024：CI/CD 中的通知机制应该如何设计？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：通知、告警、Slack、邮件、CI/CD、反馈
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 CI/CD 流水线中通知机制的设计要点，包括通知时机、渠道和降噪策略。

**参考答案**：

通知机制目标：在正确时间把正确信息推送给正确的人。

**通知时机**：

1. **失败立即通知**：Pipeline 失败时通知提交者或负责团队。
2. **恢复通知**：失败恢复后通知，避免团队持续担心。
3. **发布完成通知**：生产部署成功后通知相关方。
4. **长时间挂起**：需要人工审批或超时时提醒。

**通知渠道**：

- IM：Slack、钉钉、飞书、企业微信。
- 邮件：适合正式报告和归档。
- 工单系统：用于审批和故障跟踪。
- Dashboard：长期趋势和详细日志。

**降噪策略**：

- 只通知需要行动的人。
- 合并重复通知，避免轰炸。
- 区分环境（生产失败高优，开发分支失败可聚合）。
- 设置告警疲劳治理规则。

**评分维度**：
- 时机设计（30%）：是否覆盖失败、恢复、完成、挂起
- 渠道选择（30%）：能否根据场景选择合适渠道
- 降噪意识（40%）：是否理解通知疲劳和精准触达

**常见错误**：
- 所有事件都通知所有人
- 只通知失败不通知恢复
- 通知内容缺少上下文，无法快速定位

**延伸追问**：
- 如何避免夜间非生产环境失败打扰团队成员？
- 通知中应该包含哪些关键信息才能快速定位问题？

**相关题目**：
- [FB-12-EN-A-008 CI/CD 中的 Secrets 管理有哪些最佳实践](#FB-12-EN-A-008)
- [FB-12-SD-R-009 如何设计发布编排系统，实现自动灰度、观测与回滚](#FB-12-SD-R-009)

**参考资源**：
- [Slack - GitHub Actions](https://github.com/slackapi/slack-github-actions)

---

## 进阶题（9 道）{#advanced-2}

**口头回答版**：
> 通知机制目标：在正确时间把正确信息推送给正确的人。

### FB-12-SC-A-018：如何设计前端项目的多环境配置管理？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：环境配置、多环境、Runtime Config、构建时配置
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
一个前端项目需要部署到开发、测试、预发、生产等多个环境，请设计一套配置管理方案，避免环境混乱和敏感信息泄露。

**参考答案**：

**核心原则**：

1. **一份产物，多环境运行**：优先使用运行时配置，避免每个环境重新构建。
2. **敏感信息分离**：API Key、密码等不能进入仓库或产物。
3. **配置来源清晰**：每个环境有明确的配置注入方式。

**方案设计**：

1. **运行时配置**
   - 部署时注入 `window.__APP_CONFIG__` 或请求 `/config.json`。
   - 适合 API 地址、功能开关、第三方 Key 等。

2. **构建时配置**
   - 使用 `.env.development`、`.env.production` 等文件，构建时注入。
   - 适合编译期常量，如构建目标、包大小分析开关。

3. **配置中心**
   - 使用 Consul、Nacos、AWS AppConfig、阿里云 ACM 等动态配置。
   - 适合需要热更新的功能开关和灰度配置。

4. **Secrets 管理**
   - CI 平台 Secrets、Vault、AWS Secrets Manager。
   - 构建时或部署时注入，不在代码中硬编码。

**环境晋升**：

- 同一份构建产物从 staging 晋升到 production，仅替换运行时配置和 Secrets。

**评分维度**：
- 运行时 vs 构建时（30%）：能否正确区分两种配置场景
- 敏感信息处理（30%）：是否避免 Secrets 进入仓库/产物
- 多环境一致性（25%）：是否倡导一份产物多环境运行
- 可维护性（15%）：是否考虑配置来源和变更流程

**常见错误**：
- 每个环境单独构建，导致产物不一致
- 把生产 API Key 写入前端代码
- 配置散落在多个文件，难以维护

**延伸追问**：
- 如果 SSR 项目同时需要构建时和运行时配置，如何设计？
- 配置变更后，如何在不重新部署的情况下生效？

**相关题目**：
- [FB-12-EN-B-014 前端项目在 CI/CD 中如何安全地注入环境变量](#FB-12-EN-B-014)
- [FB-12-EN-P-001 如何设计一套环境晋升策略](#FB-12-EN-P-001)

**参考资源**：
- [The Twelve-Factor App - Config](https://12factor.net/config)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-A-019：如何在 GitLab CI 中实现 DAG（有向无环图）编排？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：GitLab CI、DAG、needs、流水线编排、依赖
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明 GitLab CI 中 `needs` 关键字的作用，并举例说明如何通过 DAG 编排提升流水线效率。

**参考答案**：

默认情况下，GitLab CI 按 Stage 顺序串行执行。`needs` 可以打破 Stage 限制，让 Job 只依赖指定的前置 Job，形成 DAG。

```yaml
stages: [build, test, deploy]

build-a:
  stage: build
  script: echo "build a"

build-b:
  stage: build
  script: echo "build b"

test-a:
  stage: test
  needs: [build-a]
  script: echo "test a"

test-b:
  stage: test
  needs: [build-b]
  script: echo "test b"

deploy:
  stage: deploy
  needs: [test-a, test-b]
  script: echo "deploy"
```

收益：

1. **缩短关键路径**：test-a 不必等待 build-b 完成。
2. **提高资源利用率**：独立 Job 尽早释放 Runner。
3. **表达真实依赖**：避免 Stage 顺序带来的虚假依赖。

**评分维度**：
- 概念理解（40%）：能否说清 `needs` 打破 Stage 串行
- 效率提升（30%）：是否理解关键路径缩短
- 配置能力（30%）：能否写出合法 DAG 配置

**常见错误**：
- 用 `needs` 创建循环依赖
- 过度使用 DAG 导致流水线难以理解
- 忽略 `needs` 的 Job 无法使用 earlier stage 的 artifacts 除非显式声明

**延伸追问**：
- DAG 与多 Stage 流水线相比，调试难度有什么变化？
- GitHub Actions 中如何实现类似的依赖编排？

**相关题目**：
- [FB-12-EN-B-004 GitLab CI 的核心概念有哪些](#FB-12-EN-B-004)
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线](#FB-12-EN-A-001)

**参考资源**：
- [GitLab CI - needs](https://docs.gitlab.com/ee/ci/yaml/#needs)

**口头回答版**：
> 默认情况下，GitLab CI 按 Stage 顺序串行执行。 needs 可以打破 Stage 限制，让 Job 只依赖指定的前置 Job，形成 DAG。 缩短关键路径：test-a 不必等待 build-b 完成。 提高资源利用率：独立 Job 尽早释放 Runner。

---

### FB-12-SE-A-020：如何防止 CI/CD 流水线泄露 Secrets？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：Secrets、安全、CI/CD、泄露防护、凭证管理
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明 CI/CD 流水线中 Secrets 泄露的常见风险，并给出防护措施。

**参考答案**：

**常见风险**：

1. **日志打印**：脚本中 `echo $SECRET` 或错误堆栈泄露 Secrets。
2. **恶意 PR**：fork 仓库的 PR 通过打印环境变量窃取 Secrets。
3. **产物泄露**：构建产物中包含 `.env` 或源码中的 Secrets。
4. **缓存污染**：缓存中包含敏感文件被其他 Job 读取。
5. **第三方 Action**：不可信 Action 可能将 Secrets 发送到外部。

**防护措施**：

1. **使用平台 Secrets 管理**：GitHub Secrets、GitLab CI Variables、Vault。
2. **屏蔽日志输出**：CI 平台通常会自动屏蔽已注册 Secrets 的打印。
3. **限制 PR 权限**：fork PR 不触发需要 Secrets 的 Workflow，或使用 `pull_request_target` 谨慎授权。
4. **代码审查**：禁止硬编码 Secrets，使用 pre-commit 扫描（如 GitLeaks）。
5. **最小权限**：Secrets 仅对必要 Job 和分支可用。
6. **审计与轮换**：定期审计 Secrets 使用记录，定期轮换凭证。

**评分维度**：
- 风险识别（40%）：能否列举 3 种以上泄露风险
- 防护能力（40%）：能否给出对应防护措施
- 流程意识（20%）：是否提到审计、轮换、最小权限

**常见错误**：
- 认为 CI 平台自动屏蔽就足够
- 给所有 Job 所有 Secrets 的访问权限
- 忽略第三方 Action 的安全风险

**延伸追问**：
- 如果怀疑 Secrets 已经泄露，应该采取哪些应急措施？
- 如何在本地开发中安全地管理 Secrets？

**相关题目**：
- [FB-12-EN-B-014 前端项目在 CI/CD 中如何安全地注入环境变量](#FB-12-EN-B-014)
- [FB-12-EN-A-008 CI/CD 中的 Secrets 管理有哪些最佳实践](#FB-12-EN-A-008)

**参考资源**：
- [GitHub - Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitLeaks](https://github.com/gitleaks/gitleaks)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-PE-A-021：如何优化前端 CI 流水线的性能？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：CI 性能、缓存、并行、构建优化、Remote Cache
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请从缓存、并行、构建配置等角度，说明如何系统性地优化前端 CI 流水线的执行时间。

**参考答案**：

**1. 依赖缓存**
- 按包管理器缓存 `node_modules`、`.npm`、`.yarn/cache`、`.pnpm-store`。
- key 基于 lockfile，提高命中率。

**2. 构建缓存**
- 缓存 `.turbo`、`.cache/vite`、`.cache/webpack`、`.eslintcache`。
- 使用 Remote Cache（Turborepo Remote Cache / Nx Cloud）跨 Job 共享。

**3. 并行化**
- 独立 Job 并行运行（lint、type-check、test、build）。
- 测试分片（sharding）加速大测试集。

**4. 产物传递**
- build 一次，下游 Job 下载 artifact，避免重复构建。

**5. 构建配置优化**
- 按需加载、减少 Source Map 生成（非生产环境）。
- 使用 `NODE_ENV=production` 跳过开发工具。

**6. Runner 与网络**
- 使用更快的 Runner、就近的 registry、私有 npm mirror。

**评分维度**：
- 缓存策略（30%）：是否覆盖依赖和构建缓存
- 并行设计（25%）：是否理解 Job 并行和测试分片
- 产物复用（20%）：是否提到一次构建多次使用
- 构建优化（15%）：是否从构建配置本身优化
- 工具实践（10%）：是否提到 Turborepo、Nx 等

**常见错误**：
- 只优化单个 Job 而忽略全局关键路径
- 缓存 key 设计不当导致命中率低
- 过度并行导致调度开销超过收益

**延伸追问**：
- 如何衡量 CI 优化是否真的有收益？
- Remote Cache 命中率低时，通常是什么原因？

**相关题目**：
- [FB-12-EN-B-009 前端 CI/CD 中如何设计依赖与构建缓存策略](#FB-12-EN-B-009)
- [FB-12-EN-P-003 如何优化前端 CI/CD 构建流水线的性能](#FB-12-EN-P-003)

**参考资源**：
- [Turborepo - Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [GitHub Actions - Caching](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)

**口头回答版**：
> - 按包管理器缓存 node_modules、.npm、.yarn/cache、.pnpm-store。 - key 基于 lockfile，提高命中率。 - 缓存 .turbo、.cache/vite、.cache/webpack、.eslintcache。 - 使用 Remote Cache（Turborepo Remote Cache / Nx Cloud）跨 Job 共享。

---

### FB-12-EN-A-022：GitHub Actions 的 Reusable Workflow 与 Composite Action 有什么区别？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：GitHub Actions、Reusable Workflow、Composite Action、复用
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请比较 GitHub Actions 中 Reusable Workflow 与 Composite Action 的适用场景和限制。

**参考答案**：

| 维度 | Reusable Workflow | Composite Action |
|------|-------------------|------------------|
| 复用层级 | 整个 Workflow | 多个 Step 的组合 |
| 调用方式 | `uses: owner/repo/.github/workflows/xxx.yml@ref` | `uses: owner/repo/action.yml@ref` 或本地路径 |
| Job 数量 | 可包含多个 Job | 只能包含多个 Step，不能包含 Job |
| Secrets 传递 | 通过 `secrets: inherit` 或显式传入 | 通过 inputs 传入 |
| 使用场景 | 团队级标准流水线模板 | 重复 Step 的封装，如安装依赖 + 缓存 |

**选型建议**：

- 需要复用完整 CI/CD 流程（lint + test + build + deploy）→ Reusable Workflow。
- 需要复用一组操作（如 setup-node + pnpm install + cache）→ Composite Action。
- 两者可以组合使用：Reusable Workflow 中调用 Composite Action。

**评分维度**：
- 概念区分（40%）：能否说清两者复用层级差异
- 场景匹配（35%）：能否根据场景选择合适方案
- 组合能力（25%）：是否理解两者可以组合

**常见错误**：
- 用 Composite Action 做跨 Job 编排
- Reusable Workflow 中嵌套过深导致调试困难
- 忽略 Secrets 传递方式差异

**延伸追问**：
- Reusable Workflow 的版本管理应该注意什么？
- 如何在 Monorepo 中统一管理 Reusable Workflow 和 Composite Action？

**相关题目**：
- [FB-12-EN-B-003 GitHub Actions 的核心概念有哪些](#FB-12-EN-B-003)
- [FB-12-EN-P-008 GitHub Actions 的 Reusable Workflow 与 Composite Action](#FB-12-EN-P-008)

**参考资源**：
- [GitHub - Reusing workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [GitHub - Composite actions](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)

**口头回答版**：
> | 维度 | Reusable Workflow | Composite Action | |------|-------------------|------------------| | 复用层级 | 整个 Workflow | 多个 Step 的组合 | | 调用方式 | uses: owner/repo/.github/workflows/xxx.yml@ref | uses: owner/repo/action.yml@ref 或本地路径 |

---

### FB-12-SC-A-023：如何为前端组件库设计发布流水线？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：组件库、发布流水线、npm、SemVer、Changelog
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请为一套前端组件库设计 CI/CD 发布流水线，要求支持多包管理、版本控制、Changelog 生成和文档发布。

**参考答案**：

**流水线阶段**：

1. **代码提交**
   - 使用 Conventional Commits 规范提交信息。
   - PR 阶段运行 lint、type-check、单元测试、视觉回归测试。

2. **版本规划**
   - 使用 Changesets 或 Lerna + Conventional Commits 确定版本 bump。
   - 人工审查 Changeset 文件。

3. **构建与测试**
   - 构建 ESM/CJS/UMD 产物。
   - 运行组件测试、无障碍测试、构建产物验证（如 Are The Types Wrong）。

4. **发布**
   - 自动 bump 版本、生成 Changelog。
   - 发布到 npm registry，使用 `latest`、`next`、`beta` 等 dist-tag。

5. **文档与站点**
   - 发布 Storybook 或 Docusaurus 站点到 CDN/Preview。

**关键实践**：

- 分支保护：main 分支发布稳定版，next 分支发布预发布版。
- 回滚：保留历史版本，必要时 deprecate 或 unpublish 问题版本。
- Source Map：上传 Source Map 到监控平台。

**评分维度**：
- 阶段完整性（30%）：是否覆盖提交、版本、构建、发布、文档
- 多包管理（25%）：是否提到 Changesets/Lerna
- 版本与 Changelog（25%）：是否理解 SemVer 和自动 Changelog
- 可维护性（20%）：是否考虑分支策略和回滚

**常见错误**：
- 手动修改版本号导致 Changelog 不一致
- 忽略类型定义文件验证
- 预发布版本和稳定版本没有区分 dist-tag

**延伸追问**：
- 如何处理组件库中某个包的 Breaking Change？
- 组件库发布后发现样式回归，如何快速修复？

**相关题目**：
- [FB-12-CO-B-015 语义化版本在前端发布中如何应用](#FB-12-CO-B-015)
- [FB-12-EN-P-014 如何为 Monorepo 设计自动化版本发布和 Changelog 生成](#FB-12-EN-P-014)

**参考资源**：
- [Changesets](https://github.com/changesets/changesets)
- [Semantic Release](https://semantic-release.gitbook.io/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-A-024：如何在 CI 中集成 Lighthouse CI？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：Lighthouse CI、性能、CI/CD、前端、质量门禁
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明如何在 CI/CD 流水线中集成 Lighthouse CI，并设置性能质量门禁。

**参考答案**：

**Lighthouse CI** 可以在 CI 中自动运行 Lighthouse 性能审计，并将结果与基线比较。

```bash
npm install -g @lhci/cli
lhci autorun
```

配置 `.lighthouserc.js`：

```js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'npm run start',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

**CI 集成要点**：

1. 在 build 后启动本地服务器，Lighthouse 访问真实页面。
2. 设置 `assert` 阈值，性能低于阈值时阻塞或告警。
3. 上传报告到 Lighthouse Server 或临时存储，便于查看历史趋势。
4. 对 PR 做 diff 对比，防止性能回归。

**评分维度**：
- 配置能力（35%）：能否写出基本 Lighthouse CI 配置
- 门禁设计（30%）：是否理解如何设置阈值
- CI 集成（20%）：是否知道何时运行和如何产出报告
- 趋势对比（15%）：是否提到 PR diff 和历史趋势

**常见错误**：
- 在开发模式或未优化的构建产物上跑 Lighthouse
- 阈值设置过严导致频繁失败
- 忽略 CI 环境波动对性能分数的影响

**延伸追问**：
- Lighthouse 分数在 CI 中波动较大，如何减少误报？
- 除了 Lighthouse CI，还有哪些前端性能门禁工具？

**相关题目**：
- [FB-12-EN-A-013 如何在 CI/CD 中监控和控制 Bundle Size](#FB-12-EN-A-013)
- [FB-12-PE-A-021 如何优化前端 CI 流水线的性能](#FB-12-PE-A-021)

**参考资源**：
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

**口头回答版**：
> Lighthouse CI 可以在 CI 中自动运行 Lighthouse 性能审计，并将结果与基线比较。 配置 .lighthouserc.js： 在 build 后启动本地服务器，Lighthouse 访问真实页面。 设置 assert 阈值，性能低于阈值时阻塞或告警。

---

### FB-12-SE-A-025：SAST、SCA、DAST 分别是什么？在前端 CI 中如何应用？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：SAST、SCA、DAST、安全扫描、DevSecOps
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请解释 SAST、SCA、DAST 三种安全测试方法的含义，并说明它们在前端 CI/CD 中的典型应用位置。

**参考答案**：

| 类型 | 全称 | 测试方式 | 前端 CI 应用 |
|------|------|----------|--------------|
| SAST | Static Application Security Testing | 静态分析源码 | 代码提交/PR 阶段扫描 XSS、不安全的 eval、敏感信息硬编码 |
| SCA | Software Composition Analysis | 分析依赖组件 | PR 阶段扫描 npm 依赖漏洞、许可证风险 |
| DAST | Dynamic Application Security Testing | 动态扫描运行中的应用 | 部署到测试环境后扫描运行时的安全漏洞 |

**应用位置**：

1. **PR 阶段**：SAST + SCA，快速反馈源码和依赖风险。
2. **构建阶段**：镜像/产物扫描，确保产物无已知漏洞。
3. **部署后**：DAST 针对预发/测试环境做动态扫描。

**常见工具**：

- SAST：SonarQube、CodeQL、Semgrep。
- SCA：Snyk、OWASP Dependency-Check、npm audit。
- DAST：OWASP ZAP、Burp Suite。

**评分维度**：
- 概念区分（40%）：能否清晰解释三种测试
- 应用位置（30%）：是否知道在 CI 的哪个阶段引入
- 工具认知（20%）：能否列举常见工具
- 效率平衡（10%）：是否理解安全左移与速度的平衡

**常见错误**：
- 把三种测试混为一谈
- 只在部署前做一次性安全扫描
- 对扫描结果不设置修复 SLA

**延伸追问**：
- 如果 SCA 扫描出大量历史漏洞，如何推进修复？
- SAST 误报率高时，如何降低对开发的干扰？

**相关题目**：
- [FB-12-SD-R-008 如何在 CI/CD 中落地 DevSecOps](#FB-12-SD-R-008)
- [FB-12-SE-A-020 如何防止 CI/CD 流水线泄露 Secrets](#FB-12-SE-A-020)

**参考资源**：
- [OWASP - SAST](https://owasp.org/www-community/Source_Code_Analysis_Tools)
- [OWASP - SCA](https://owasp.org/www-community/Component_Analysis)

**口头回答版**：
> | 类型 | 全称 | 测试方式 | 前端 CI 应用 | |------|------|----------|--------------| | SAST | Static Application Security Testing | 静态分析源码 | 代码提交/PR 阶段扫描 XSS、不安全的 eval、敏感信息硬编码 | | SCA | Software Composition Analysis | 分析依赖组件 | PR 阶段扫描 npm 依赖漏洞、许可证风险 |

---

### FB-12-EN-A-026：如何在 CI 中实现前端依赖的安全审计？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：12 CI/CD
**标签**：依赖审计、npm audit、pnpm audit、SCA、供应链安全
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明如何在 CI/CD 流水线中对前端依赖进行安全审计，并设置合理的门禁策略。

**参考答案**：

**依赖安全审计流程**：

1. **lockfile 完整性检查**
   - 使用 `npm ci` / `pnpm install --frozen-lockfile`，确保 lockfile 与 `package.json` 一致。

2. **漏洞扫描**
   - `npm audit`、`pnpm audit`、`yarn audit`。
   - 或使用 SCA 工具：Snyk、Trivy、OWASP Dependency-Check。

3. **门禁策略**
   - 对 `critical`、`high` 级别漏洞阻塞构建。
   - 对 `low`、`moderate` 级别告警并设置修复 SLA。
   - 允许通过 `.nsprc` / `audit-ci.json` 临时忽略已评估风险的漏洞。

4. **许可证检查**
   - 使用 `license-checker` 或 FOSSA 检查依赖许可证合规性。

5. **SBOM 生成**
   - 生成并保存 SPDX/CycloneDX 物料清单，便于追溯。

**评分维度**：
- 工具使用（30%）：能否使用常见 audit 工具
- 门禁设计（30%）：是否按漏洞级别设置不同策略
- 流程完整（25%）：是否覆盖 lockfile、扫描、许可证、SBOM
- 风险治理（15%）：是否理解临时忽略和 SLA 机制

**常见错误**：
- 完全忽略 audit 输出
- 任何漏洞都直接阻塞，导致开发停滞
- 不限制 registry，遭受依赖混淆攻击

**延伸追问**：
- 如果某个漏洞在业务代码中实际不可利用，是否还需要修复？
- 如何防止恶意依赖包被引入项目？

**相关题目**：
- [FB-12-EN-B-016 如何在 CI/CD 中安全地实现自动化依赖更新](#FB-12-EN-B-016)
- [FB-12-SE-P-021 如何保障 CI/CD 供应链安全](#FB-12-SE-P-021)

**参考资源**：
- [npm audit](https://docs.npmjs.com/cli/v10/commands/npm-audit)
- [Snyk](https://snyk.io/)

---

## 深入题（9 道）{#proficient-2}

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

### FB-12-SD-P-018：如何优化大型前端 Monorepo 的 CI/CD 效率？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：Monorepo、CI/CD、Turborepo、Nx、affected、Remote Cache
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
在包含数百个包的大型前端 Monorepo 中，CI/CD 流水线往往耗时过长。请设计一套优化方案，兼顾构建速度和正确性。

**参考答案**：

**1. 精准构建**
- 使用 `affected` / `--filter` 只构建和测试受变更影响的包。
- 维护包依赖图，避免全量构建。

**2. 任务编排**
- 使用 Turborepo / Nx 的 pipeline 定义任务依赖。
- 通过 DAG 让无依赖任务并行执行。

**3. 远程缓存**
- 部署 Turborepo Remote Cache 或 Nx Cloud，让不同 CI Job 和开发者共享缓存。
- 缓存 key 基于输入哈希，确保正确性。

**4. 分布式任务执行**
- Nx 支持将任务分发到多个 Agent 并行执行。
- 适合大型测试集或构建任务。

**5. 产物复用**
- 一次构建产出被下游测试、部署 Job 复用。
- 避免每个 Job 重复安装依赖和构建。

**6. 智能门禁**
- 对核心包变更触发全量回归。
- 对边缘包变更只运行受影响路径的测试。

**评分维度**：
- 精准构建（25%）：是否使用 affected / filter
- 缓存设计（25%）：是否提到 Remote Cache
- 任务编排（20%）：是否理解 DAG 和任务依赖
- 分布式执行（15%）：是否提到多 Agent 分发
- 门禁策略（15%）：是否根据影响范围调整测试范围

**常见错误**：
- 任何变更都全量构建
- Remote Cache 配置不当导致命中率为 0
- 为了速度跳过必要的集成测试

**延伸追问**：
- 如果核心包被 80% 的包依赖，如何控制 CI 范围？
- 跨仓库依赖变更时，Monorepo CI 如何联动？

**相关题目**：
- [FB-12-EN-A-001 如何为前端 Monorepo 设计 GitHub Actions 流水线](#FB-12-EN-A-001)
- [FB-12-SD-R-013 大型 Monorepo 下如何协调 CI/CD、发布火车与版本兼容](#FB-12-SD-R-013)

**参考资源**：
- [Turborepo - Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Nx - Distributed Task Execution](https://nx.dev/ci/features/distribute-task-execution)

**口头回答版**：
> - 使用 affected / --filter 只构建和测试受变更影响的包。 - 维护包依赖图，避免全量构建。 - 使用 Turborepo / Nx 的 pipeline 定义任务依赖。 - 通过 DAG 让无依赖任务并行执行。

---

### FB-12-EN-P-019：如何识别和治理 CI 中的 Flaky Test？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：Flaky Test、测试稳定性、CI、治理、自动化测试
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明 CI 中 Flaky Test（不稳定测试）的常见原因、识别方法和治理策略。

**参考答案**：

**常见原因**：

1. **异步等待不足**：未使用 `await` 或正确断言等待条件。
2. **顺序依赖**：测试之间共享状态或依赖执行顺序。
3. **时间相关**：使用真实时间、定时器、日期。
4. **外部依赖**：依赖网络、数据库、第三方服务。
5. **并发问题**：多测试同时读写同一资源。
6. **环境差异**：本地通过但 CI 失败（分辨率、时区、字体）。

**识别方法**：

- 重复运行测试并统计失败率。
- 使用测试框架的 flaky 检测或第三方工具（如 Jest --detectOpenHandles）。
- 记录历史失败数据，识别高频 flaky 测试。

**治理策略**：

1. **立即隔离**：标记并跳过严重 flaky 测试，避免阻塞团队。
2. **根因修复**：mock 外部依赖、消除状态共享、使用 fake timer。
3. **重试机制**：CI 中对失败测试自动重试，但仅作为过渡手段。
4. **数据看板**：跟踪 flaky test 数量和修复进度。
5. **文化**：将修复 flaky test 纳入 sprint。

**评分维度**：
- 原因分析（30%）：能否列举 4 种以上原因
- 识别能力（25%）：是否知道如何统计和检测 flaky
- 治理策略（30%）：能否给出系统性的治理方案
- 文化意识（15%）：是否强调团队责任和持续跟踪

**常见错误**：
- 简单增加重试次数掩盖问题
- 忽略 E2E 测试中的环境差异
- 不记录 flaky 历史，无法量化改进

**延伸追问**：
- 如果一个测试偶尔失败但很难复现，你会怎么处理？
- 如何防止新的 flaky test 进入代码库？

**相关题目**：
- [FB-12-EN-A-011 如何在 CI/CD 中并行化和分片运行 E2E 测试](#FB-12-EN-A-011)
- [FB-12-CP-R-015 如何看待 AI 在 CI/CD 中的应用](#FB-12-CP-R-015)

**参考资源**：
- [Google Testing Blog - Flaky Tests](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html)
- [Jest - Detecting Open Handles](https://jestjs.io/docs/cli#--detectopenhandles)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-SD-P-020：如何设计前端私有 npm Registry 与 CI 集成方案？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：npm Registry、私有包、CI/CD、Verdaccio、JFrog
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一套前端私有 npm Registry 方案，并与 CI/CD 流水线集成，支持私有包发布、安全认证和高可用访问。

**参考答案**：

**Registry 选型**：

- 轻量级：Verdaccio（开源、易部署）。
- 企业级：JFrog Artifactory、GitHub Packages、GitLab Package Registry、AWS CodeArtifact。

**核心设计**：

1. **认证与权限**
   - CI 使用只读或读写 Token，按项目/环境隔离。
   - Token 通过 CI Secrets 注入，不写入代码。
   - 支持双因子认证和 Token 轮换。

2. **上游代理**
   - Registry 代理 npmjs.org，缓存公共包，提升安装速度。
   - 防止依赖混淆：仅允许白名单范围内的包名。

3. **发布流程**
   - CI 在合并到 main 后自动 bump 版本并发布。
   - 使用 dist-tag 区分 stable / next / beta。
   - 发布前运行完整测试和类型检查。

4. **高可用**
   - 多实例部署 + 负载均衡。
   - 存储后端使用 S3/OSS 等对象存储。
   - 跨区域复制保证多区域 CI 访问。

5. **审计与监控**
   - 记录 publish/install 日志。
   - 监控包下载量、异常访问。

**评分维度**：
- 选型能力（20%）：能否根据规模选择合适 Registry
- 认证安全（25%）：是否设计 Token 隔离和轮换
- 发布流程（25%）：是否自动化且可控
- 高可用与审计（20%）：是否考虑 HA 和日志
- 依赖安全（10%）：是否防止依赖混淆

**常见错误**：
- 使用个人 npm Token 给 CI
- 私有包和公共包混用无白名单
- 忽略 Registry 单点故障

**延伸追问**：
- 如何防止内部包名与 npm 公共包冲突？
- 私有包发布失败时，如何不影响业务 CI？

**相关题目**：
- [FB-12-SC-A-023 如何为前端组件库设计发布流水线](#FB-12-SC-A-023)
- [FB-12-SD-R-005 如何设计企业级前端制品管理与发布火车](#FB-12-SD-R-005)

**参考资源**：
- [Verdaccio](https://verdaccio.org/)
- [npm - Creating and publishing scoped public packages](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

**口头回答版**：
> Registry 选型： - 轻量级：Verdaccio（开源、易部署）。 - 企业级：JFrog Artifactory、GitHub Packages、GitLab Package Registry、AWS CodeArtifact。

---

### FB-12-SE-P-021：如何保障 CI/CD 软件供应链安全？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：供应链安全、SLSA、SBOM、签名、依赖混淆
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请从依赖、构建、发布、部署四个阶段，说明如何保障前端 CI/CD 软件供应链安全。

**参考答案**：

**1. 依赖阶段**
- 锁定 lockfile，使用私有 Registry 并配置白名单。
- 定期扫描依赖漏洞，使用 SCA 工具。
- 防止依赖混淆：内部包使用 scope，Registry 不代理内部包名。

**2. 构建阶段**
- 使用固定、可信的构建镜像，定期更新基础镜像。
- 对 Dockerfile / 构建脚本做签名和审计。
- 隔离 Runner，避免不同项目共享构建环境。

**3. 发布阶段**
- 生成 SBOM（SPDX/CycloneDX）。
- 对 Artifact 和镜像签名（cosign、Notary）。
- 使用不可变产物，禁止覆盖已发布版本。

**4. 部署阶段**
- 验证部署产物签名与 SBOM。
- GitOps 模式下，配置仓库变更需审批和审计。
- 部署环境使用最小权限原则。

**框架参考**：

- SLSA：软件供应链安全框架，定义 Build Provenance、签名、可审计等级别。

**评分维度**：
- 阶段覆盖（30%）：是否覆盖依赖、构建、发布、部署
- 具体措施（30%）：能否列举可落地的工具和实践
- 签名与 SBOM（20%）：是否理解产物签名和物料清单
- 框架意识（20%）：是否提到 SLSA 等供应链安全框架

**常见错误**：
- 只关注依赖漏洞，忽略构建和发布阶段
- 使用 latest 标签镜像，缺乏可追溯性
- 不验证部署产物是否被篡改

**延伸追问**：
- 如果构建环境被攻破，如何保证产物仍可被识别？
- 如何在 Monorepo 中管理供应链安全？

**相关题目**：
- [FB-12-EN-A-026 如何在 CI 中实现前端依赖的安全审计](#FB-12-EN-A-026)
- [FB-12-SD-R-010 如何设计前端制品的不可变性与全链路可追溯架构](#FB-12-SD-R-010)

**参考资源**：
- [SLSA Framework](https://slsa.dev/)
- [OWASP - Software Supply Chain Security](https://owasp.org/www-project-software-supply-chain-security/)

**口头回答版**：
> - 锁定 lockfile，使用私有 Registry 并配置白名单。 - 定期扫描依赖漏洞，使用 SCA 工具。 - 防止依赖混淆：内部包使用 scope，Registry 不代理内部包名。 - 使用固定、可信的构建镜像，定期更新基础镜像。

---

### FB-12-EN-P-022：如何设计基于 Changesets 的自动化版本发布？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：Changesets、Monorepo、版本发布、Changelog、自动化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明 Changesets 的工作原理，并设计一套基于 Changesets 的 Monorepo 自动化版本发布流程。

**参考答案**：

**Changesets 工作原理**：

- 开发者提交代码时同时提交一个 `.changeset/*.md` 文件，描述变更内容和影响包。
- 发布时，`changeset version` 根据所有 changeset 自动计算 SemVer bump、更新版本号、生成 Changelog。
- `changeset publish` 按顺序发布变更包到 npm。

**自动化流程**：

1. **PR 阶段**
   - CI 检查 PR 是否包含 changeset（对需要发布的包）。
   - 运行 lint、test、type-check。

2. **合并后**
   - GitHub Action 自动创建 "Version Packages" PR。
   - 该 PR 包含版本号更新和 Changelog 生成。

3. **审批发布**
   - 人工审查并合并 Version Packages PR。
   - 合并后触发 `changeset publish`，发布到 npm。

4. **后续**
   - 自动创建 GitHub Release。
   - 可选触发文档站点、Storybook 重新部署。

**关键设计**：

- 分支保护：Version Packages PR 需 Code Review。
- dist-tag：预发布使用 `next` tag。
- 失败回滚：publish 失败时保留 changeset 不删除，支持重试。

**评分维度**：
- 原理理解（25%）：能否说清 changeset 文件和 version/publish 命令
- 流程设计（30%）：是否覆盖 PR、合并、审批、发布
- 自动化程度（25%）：是否实现 Version Packages PR 自动创建
- 风险控制（20%）：是否考虑审批、失败回滚、dist-tag

**常见错误**：
- 不强制要求 changeset 导致 Changelog 遗漏
- 自动发布未经过人工审批
- 忽略发布顺序导致依赖包版本错误

**延伸追问**：
- 如何处理 Breaking Change 的 changeset？
- 如果发布中途失败，如何安全重试？

**相关题目**：
- [FB-12-EN-P-014 如何为 Monorepo 设计自动化版本发布和 Changelog 生成](#FB-12-EN-P-014)
- [FB-12-SC-A-023 如何为前端组件库设计发布流水线](#FB-12-SC-A-023)

**参考资源**：
- [Changesets](https://github.com/changesets/changesets)

**口头回答版**：
> Changesets 工作原理： - 开发者提交代码时同时提交一个 .changeset/*.md 文件，描述变更内容和影响包。 - 发布时，changeset version 根据所有 changeset 自动计算 SemVer bump、更新版本号、生成 Changelog。 - changeset publish 按顺序发布变更包到 npm。

---

### FB-12-SD-P-023：如何为大型前端团队设计 CI/CD 自助平台？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：CI/CD 平台、自助服务、Golden Path、模板化、治理
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请为包含多个业务团队的大型前端组织设计一个 CI/CD 自助平台，使各团队既能快速接入，又能遵循统一规范。

**参考答案**：

**平台层设计**：

1. **项目模板**
   - 提供 SPA、Monorepo、SSR、组件库等场景的初始化模板。
   - 内置 Golden Path Pipeline，包含标准阶段和门禁。

2. **Pipeline 模板即代码**
   - Reusable Workflow / Shared Library / Pipeline Template。
   - 版本化管理，团队可渐进升级。

3. **自助门户**
   - 项目创建、Runner 申请、Secrets 管理、问题排查。
   - 集成权限审批流程。

4. **可观测与度量**
   - DORA 指标、Pipeline 时长、失败率、恢复时间。
   - 团队级 Dashboard 和排行榜。

5. **治理与合规**
   - Policy as Code 检查流水线是否符合规范。
   - 强制门禁：测试、Lint、安全扫描、Bundle Size。

**多租户隔离**：

- 团队独立 Project/Group、独立 Secrets、独立 Runner 池或标签。
- 统一平台层提供共享工具和最佳实践。

**评分维度**：
- 模板化能力（25%）：是否提供场景化模板
- 自助服务（25%）：是否降低团队接入门槛
- 治理合规（20%）：是否通过 Policy as Code 保证规范
- 可观测（15%）：是否建立度量体系
- 多租户（15%）：是否考虑团队隔离

**常见错误**：
- 平台功能大而全但没人用
- 一刀切禁止团队自定义
- 只有模板没有度量和反馈

**延伸追问**：
- 如何推动老项目迁移到新的自助平台？
- 当某个团队需要突破标准时，如何设计审批流程？

**相关题目**：
- [FB-12-SD-R-011 如何进行企业级 CI/CD 治理，实现模板化与度量驱动](#FB-12-SD-R-011)
- [FB-12-SD-R-007 如何设计支持多租户、多区域的前端 CI/CD 平台](#FB-12-SD-R-007)

**参考资源**：
- [Spotify - Golden Paths](https://backstage.io/demos/)
- [DORA - Accelerate](https://dora.dev/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-P-024：如何在 CI 中实现前端视觉回归测试？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：视觉回归、VRT、Chromatic、Storybook、Percy
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何在 CI/CD 流水线中集成视觉回归测试（Visual Regression Testing），并处理误报和基线更新。

**参考答案**：

**集成方案**：

1. **选择工具**
   - Chromatic（基于 Storybook，适合组件库）。
   - Percy、Applitools、Lost Pixel（支持页面级和组件级）。
   - Playwright/Cypress + pixelmatch（自研方案）。

2. **CI 集成**
   - 在 PR 阶段自动构建 Storybook 或应用，触发视觉回归测试。
   - 将结果上传到平台，生成 diff 报告。

3. **基线管理**
   - main 分支的截图作为基线。
   - PR 中 diff 超过阈值时阻塞合并。
   - 接受变更后更新基线。

4. **误报处理**
   - 统一浏览器版本、字体、时区、分辨率。
   - 对动态内容（时间、随机数据）使用 mock。
   - 设置允许的 diff 阈值，忽略 antialiasing 等微小差异。

**收益**：

- 捕获 UI 回归，尤其是样式、布局、主题变更。
- 减少人工 UI 验收成本。

**评分维度**：
- 工具选型（25%）：能否根据场景选择工具
- CI 集成（25%）：是否知道在 PR 阶段运行
- 基线管理（25%）：是否理解基线更新流程
- 误报控制（25%）：是否有减少误报的具体措施

**常见错误**：
- 在不稳定环境跑 VRT 导致大量误报
- 忽略动态内容导致每次都有 diff
- 基线更新流程不规范，随意接受变更

**延伸追问**：
- 视觉回归测试与功能测试 E2E 如何分工？
- 如果 VRT 成本过高，你会如何裁剪覆盖范围？

**相关题目**：
- [FB-12-EN-A-024 如何在 CI 中集成 Lighthouse CI](#FB-12-EN-A-024)
- [FB-12-SC-A-023 如何为前端组件库设计发布流水线](#FB-12-SC-A-023)

**参考资源**：
- [Chromatic](https://www.chromatic.com/)
- [Percy](https://www.browserstack.com/percy)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-SD-P-025：如何设计跨云 CI/CD 架构？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：跨云、多云、CI/CD、灾备、可移植性
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一套支持多云环境（如 AWS、Azure、阿里云）的前端 CI/CD 架构，要求避免厂商锁定并具备灾备能力。

**参考答案**：

**设计原则**：

1. **Pipeline as Code 标准化**
   - 使用平台无关的流水线定义，核心阶段抽象统一。
   - 通过容器化 Runner 保证执行环境一致。

2. **容器化构建**
   - 使用 Docker 镜像封装构建环境，可在任意云跑。
   - 镜像存储在多云可访问的 Registry。

3. **制品仓库中立**
   - Artifact 存储在对象存储（S3 兼容协议）或 Harbor。
   - 支持跨区域、跨云复制。

4. **多云 Runner**
   - 在各云部署 Self-Hosted Runner，支持就近构建。
   - 控制平面统一调度，执行面分布在多云。

5. **部署抽象**
   - 使用 Terraform/Pulumi 描述基础设施。
   - GitOps 工具（ArgoCD/Flux）管理多云部署。

6. **灾备切换**
   - CI 平台主备：GitHub Actions ↔ GitLab CI。
   - 制品跨区域冗余，故障时切换构建和部署目标。

**评分维度**：
- 可移植性（25%）：是否避免厂商特定语法
- 制品与镜像管理（20%）：是否支持多云访问
- Runner 架构（20%）：是否设计多云执行面
- 部署抽象（20%）：是否使用 IaC 和 GitOps
- 灾备能力（15%）：是否具备平台切换能力

**常见错误**：
- 深度绑定某云厂商的 CI 服务
- 各云独立维护一套流水线，无法复用
- 忽略跨云网络延迟和成本

**延伸追问**：
- 如何保证不同云上的构建产物完全一致？
- 跨云部署时，Secrets 如何统一管理？

**相关题目**：
- [FB-12-SD-R-002 如何设计零停机全球前端部署方案](#FB-12-SD-R-002)
- [FB-12-SD-R-014 如何设计 CI/CD 系统的灾难恢复与业务连续性方案](#FB-12-SD-R-014)

**参考资源**：
- [CNCF - CI/CD in Multi-Cloud](https://www.cncf.io/)
- [Terraform](https://www.terraform.io/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-EN-P-026：如何在 CI/CD 中实现精细化权限与审批？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：12 CI/CD
**标签**：权限控制、审批、RBAC、CI/CD、合规、审计
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一套 CI/CD 权限与审批机制，确保不同角色只能执行被授权的操作，关键发布需经过审批。

**参考答案**：

**权限模型**：

1. **RBAC**
   - 按角色分配权限：开发者、测试、运维、架构师、管理员。
   - 不同角色可触发不同环境部署。

2. **环境保护规则**
   - 生产环境部署需指定人员审批。
   - 限制可部署分支（如仅 main 分支可部署生产）。

3. **Secrets 分级**
   - 生产 Secrets 仅对生产部署 Job 可用。
   - 开发/测试 Secrets 隔离。

4. **Pipeline 修改权限**
   - `.github/workflows` 或 `.gitlab-ci.yml` 变更需 Code Owner 审批。
   - 防止恶意 PR 篡改流水线。

**审批流程**：

1. **发布审批**
   - 生产部署前在工单系统或 CI 平台发起审批。
   - 审批信息关联版本、变更内容、风险说明。

2. **紧急发布**
   - 设立紧急通道，事后补审批和复盘。
   - 记录审批人和原因。

3. **审计日志**
   - 记录谁、何时、触发了什么流水线、部署到哪个环境。
   - 满足合规要求（SOX、等保）。

**评分维度**：
- RBAC 设计（25%）：是否按角色分配权限
- 环境保护（25%）：是否对生产环境设置审批
- Secrets 分级（20%）：是否按环境隔离 Secrets
- 审计合规（20%）：是否记录完整审计日志
- 紧急流程（10%）：是否考虑紧急发布通道

**常见错误**：
- 所有成员都能部署生产环境
- 审批流于形式，没有与流水线联动
- 不记录审计日志

**延伸追问**：
- 如何在 GitHub Actions 中实现生产部署审批？
- 如果审批人不在岗，如何设计备用审批机制？

**相关题目**：
- [FB-12-SE-A-020 如何防止 CI/CD 流水线泄露 Secrets](#FB-12-SE-A-020)
- [FB-12-SD-R-011 如何进行企业级 CI/CD 治理，实现模板化与度量驱动](#FB-12-SD-R-011)

**参考资源**：
- [GitHub - Deployment protection rules](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#deployment-protection-rules)
- [GitLab - Protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

---

## 架构题（29 道）{#architect-2}

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

### FB-12-SD-R-016：如何设计面向 AIOps 的智能 CI/CD 平台？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：AIOps、智能 CI/CD、失败分析、Flaky Test、发布决策
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套面向 AIOps 的智能 CI/CD 平台，能够利用数据驱动的方式提升构建、测试、发布效率与稳定性。

**参考答案**：

**核心能力**：

1. **智能失败根因分析**
   - 收集 Pipeline 日志、测试报告、构建产物。
   - 使用 NLP/规则引擎定位失败模块，推荐修复方案。

2. **Flaky Test 预测**
   - 基于历史执行数据识别不稳定测试。
   - 自动标记、隔离或优先修复。

3. **智能测试选择**
   - 根据代码变更影响范围，动态选择需要运行的测试。
   - 减少不必要的全量回归。

4. **构建优化推荐**
   - 分析缓存命中率、任务耗时，推荐并行策略和缓存改进。

5. **发布风险评估**
   - 综合代码变更、历史故障、业务时段，给出发布建议。
   - 低风险自动发布，高风险人工审批。

**架构组成**：

- 数据采集层：CI 日志、Git 数据、监控数据。
- 特征工程层：构建耗时、失败模式、代码变更范围。
- 模型层：分类、回归、异常检测。
- 应用层：失败分析、测试推荐、发布决策。

**评分维度**：
- 场景覆盖（30%）：能否列举 4 个以上 AI 应用场景
- 数据架构（25%）：是否设计完整的数据采集和特征工程
- 落地路径（25%）：是否从低风险场景渐进引入
- 风险意识（20%）：是否考虑隐私、幻觉、人机协同

**常见错误**：
- 一开始就试图让 AI 自动决定所有发布
- 忽略数据质量和标注成本
- 把源码发送给不可信的公共 AI 服务

**延伸追问**：
- AI 推荐失败原因但工程师不认可，如何处理？
- 如何评估智能 CI/CD 平台的 ROI？

**相关题目**：
- [FB-12-CP-R-015 如何看待 AI 在 CI/CD 中的应用](#FB-12-CP-R-015)
- [FB-12-EN-P-019 如何识别和治理 CI 中的 Flaky Test](#FB-12-EN-P-019)

**参考资源**：
- [DORA - Accelerate](https://dora.dev/)
- [AIOps - Gartner](https://www.gartner.com/en/information-technology/glossary/aiops)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-CP-R-017：如何在组织中推动 CI/CD 文化转型？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：DevOps、CI/CD 文化、组织变革、Golden Path、度量
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
作为技术负责人，你如何在大型组织中推动 CI/CD 文化转型，让团队从"手动发布"走向"持续交付"？

**参考答案**：

**1. 建立共识**
- 用数据说话：当前发布周期、失败率、恢复时间。
- 明确目标：DORA 指标、发布频率、MTTR。

**2. 降低门槛**
- 提供 Golden Path 和模板，让团队零成本接入。
- 建设自助平台和文档，减少学习成本。

**3. 小步快跑**
- 选择 1-2 个先锋团队试点，取得早期胜利。
- 通过案例分享扩大影响力。

**4. 度量驱动**
- 建立团队级 CI/CD 仪表盘。
- 定期 review 指标，识别瓶颈。

**5. 激励机制**
- 将 CI/CD 成熟度纳入团队 OKR 或绩效。
- 表彰高成熟度团队和积极贡献者。

**6. 组织保障**
- 设立平台工程团队负责 CI/CD 平台建设。
- 建立 SRE 和 On-Call 机制，强化发布责任感。

**7. 持续改进**
- 定期进行 blameless postmortem。
- 根据反馈迭代工具和流程。

**评分维度**：
- 战略规划（25%）：是否设定清晰目标和路径
- 落地方法（25%）：是否从小范围试点到规模化推广
- 平台支持（20%）：是否提供 Golden Path 和自助服务
- 度量激励（20%）：是否建立指标和激励机制
- 组织文化（10%）：是否提到无责复盘和持续改进

**常见错误**：
- 一刀切强制所有团队立即转型
- 只提供工具，不关注文化和流程
- 度量指标过多，团队无所适从

**延伸追问**：
- 如何应对团队对自动化的抵触情绪？
- 如果业务压力导致团队无暇改进 CI/CD，你会怎么处理？

**相关题目**：
- [FB-12-SD-R-011 如何进行企业级 CI/CD 治理，实现模板化与度量驱动](#FB-12-SD-R-011)
- [FB-12-CP-R-004 如何在持续交付中平衡发布速度与稳定性](#FB-12-CP-R-004)

**参考资源**：
- [DORA - Accelerate](https://dora.dev/)
- [Spotify - Golden Paths](https://backstage.io/demos/)

**口头回答版**：
> - 用数据说话：当前发布周期、失败率、恢复时间。 - 明确目标：DORA 指标、发布频率、MTTR。 - 提供 Golden Path 和模板，让团队零成本接入。 - 建设自助平台和文档，减少学习成本。

---

### FB-12-SD-R-018：如何设计前端制品的零信任安全架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：零信任、制品安全、签名、SBOM、验证
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请为前端制品（npm 包、Docker 镜像、静态资源包）设计一套零信任安全架构，确保从构建到部署的每个环节都可验证、可审计。

**参考答案**：

**零信任原则**：永不信任，始终验证。每个环节都要验证上游身份、完整性和意图。

**1. 身份与认证**
- 构建服务、发布服务、部署服务都使用短期凭证和 mTLS。
- CI Runner 使用工作负载身份（Workload Identity）。

**2. 构建可信**
- 使用固定的、签名的构建镜像。
- 构建环境隔离，每次构建从零开始（ephemeral runner）。
- 生成 Build Provenance（SLSA）。

**3. 产物签名**
- npm 包：使用 npm provenance / sigstore。
- Docker 镜像：cosign 签名。
- 静态资源包：使用内容哈希 + 签名。

**4. 分发验证**
- 安装/部署时验证签名和 checksum。
- 拒绝未签名或签名不匹配的制品。

**5. 全链路审计**
- 记录谁构建、谁签名、谁部署、部署到何处。
- 保留 SBOM，支持漏洞追溯。

**评分维度**：
- 零信任理解（20%）：能否解释永不信任始终验证
- 身份认证（20%）：是否设计工作负载身份和短期凭证
- 签名验证（25%）：是否覆盖多种制品类型的签名
- 审计追溯（20%）：是否记录全链路日志和 SBOM
- 可落地性（15%）：是否考虑工具链和迁移路径

**常见错误**：
- 只在入口处做一次认证
- 签名密钥长期不轮换
- 忽略静态资源包的签名验证

**延伸追问**：
- 如何验证生产环境运行的产物就是 CI 中签名那份？
- 零信任架构对 CI 性能有何影响，如何优化？

**相关题目**：
- [FB-12-SD-R-010 如何设计前端制品的不可变性与全链路可追溯架构](#FB-12-SD-R-010)
- [FB-12-SE-P-021 如何保障 CI/CD 软件供应链安全](#FB-12-SE-P-021)

**参考资源**：
- [SLSA Framework](https://slsa.dev/)
- [sigstore](https://www.sigstore.dev/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-SD-R-019：如何构建企业级 CI/CD 平台度量体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：CI/CD 度量、DORA、SLI、SLO、平台工程
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套企业级 CI/CD 平台度量体系，帮助组织持续评估和提升交付能力。

**参考答案**：

**1. DORA 四指标**
- 部署频率、变更前置时间、MTTR、变更失败率。
- 作为核心北极星指标。

**2. 流水线效率指标**
- Pipeline 平均执行时间、P50/P90/P99。
- 队列等待时间、Runner 利用率。
- 缓存命中率、测试分片均衡度。

**3. 质量门禁指标**
- 测试覆盖率趋势、lint 通过率、安全漏洞修复时长。
- Bundle Size 变化、Lighthouse 分数。

**4. 稳定性指标**
- Pipeline 失败率、Flaky Test 数量、失败恢复时间。
- 生产回滚次数、发布窗口外故障数。

**5. 平台健康指标**
- Runner 在线率、Queue 积压、Registry 可用性。
- 平台 API 延迟和错误率。

**度量落地**：

- 建立统一数据平台，采集 CI 平台、监控系统、Git 数据。
- 团队级 Dashboard 和趋势报告。
- 定期 review，识别瓶颈并制定改进计划。

**评分维度**：
- 指标全面性（30%）：是否覆盖 DORA、效率、质量、稳定性、平台健康
- 度量落地（25%）：是否设计数据采集和展示
- 团队赋能（20%）：是否建立团队级 Dashboard
- 持续改进（15%）：是否通过度量驱动改进
- 避免滥用（10%）：是否防止指标游戏化

**常见错误**：
- 只关注平均数，忽略 P90/P99
- 指标过多导致团队无所适从
- 用指标惩罚团队而非帮助改进

**延伸追问**：
- 如何防止团队为了优化指标而牺牲质量？
- 度量指标应该多久 review 一次？

**相关题目**：
- [FB-12-CP-R-006 如何度量并提升 CI/CD 成熟度](#FB-12-CP-R-006)
- [FB-12-SD-R-011 如何进行企业级 CI/CD 治理，实现模板化与度量驱动](#FB-12-SD-R-011)

**参考资源**：
- [DORA - Metrics](https://dora.dev/guides/dora-metrics-four-keys/)
- [Google SRE - SLIs, SLOs, SLAs](https://sre.google/sre-book/service-level-objectives/)

**口头回答版**：
> - 部署频率、变更前置时间、MTTR、变更失败率。 - 作为核心北极星指标。 - Pipeline 平均执行时间、P50/P90/P99。 - 队列等待时间、Runner 利用率。

---

### FB-12-CP-R-020：如何评估和选择 CI/CD 工具链？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：CI/CD 工具、选型、GitHub Actions、GitLab CI、Jenkins、评估
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明评估和选择 CI/CD 工具链时应考虑哪些维度，并比较 GitHub Actions、GitLab CI、Jenkins 的适用场景。

**参考答案**：

**评估维度**：

1. **功能匹配**：是否支持 Pipeline as Code、Matrix、Reusable Workflow、审批、Secrets 管理。
2. **生态系统**：Marketplace / Plugin 丰富度，与现有工具集成难度。
3. **可扩展性**：Self-Hosted Runner、自定义执行环境、API。
4. **安全性**：Secrets 管理、权限控制、审计、合规认证。
5. **成本**：授权费用、按分钟计费、自托管成本。
6. **可维护性**：学习曲线、社区活跃度、技术支持。
7. **多租户与规模化**：是否支持企业级多团队、多区域。

**工具对比**：

| 工具 | 适用场景 | 劣势 |
|------|----------|------|
| GitHub Actions | 代码托管在 GitHub，社区生态丰富，适合云原生团队 | 复杂企业治理较弱，自托管 Runner 管理成本 |
| GitLab CI | 需要一体化 DevOps 平台，企业级权限和审计 | 高度定制复杂，部分高级功能付费 |
| Jenkins | 高度定制化、 legacy 系统集成、私有部署 | 插件维护成本高，UI/UX 老旧 |

**评分维度**：
- 评估维度（35%）：能否系统性地评估工具链
- 工具对比（30%）：能否准确对比主流工具
- 场景匹配（25%）：能否根据组织特点推荐
- 迁移风险（10%）：是否考虑现有系统迁移成本

**常见错误**：
- 只根据价格或流行度选择工具
- 忽略团队的现有技能和迁移成本
- 选择后不做 PoC 验证

**延伸追问**：
- 如果团队已经在用 Jenkins，迁移到 GitHub Actions 需要考虑什么？
- 多云环境下，CI/CD 工具选型有什么特殊考虑？

**相关题目**：
- [FB-12-SD-R-007 如何设计支持多租户、多区域的前端 CI/CD 平台](#FB-12-SD-R-007)
- [FB-12-SD-P-025 如何设计跨云 CI/CD 架构](#FB-12-SD-P-025)

**参考资源**：
- [GitHub Actions vs GitLab CI](https://about.gitlab.com/devops-tools/github-vs-gitlab/)
- [Jenkins](https://www.jenkins.io/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-SD-R-021：如何设计 CI/CD 中的混沌工程实践？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：混沌工程、CI/CD、韧性、故障演练、自动化
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套在 CI/CD 中落地混沌工程（Chaos Engineering）的方案，验证前端应用在故障场景下的韧性。

**参考答案**：

**混沌工程目标**：主动注入故障，发现系统薄弱环节，验证自愈和降级能力。

**1. 故障场景设计**
- 网络：延迟、丢包、DNS 故障、CDN 不可用。
- 依赖：API 超时、错误响应、第三方脚本加载失败。
- 浏览器：本地存储异常、Service Worker 失效。
- CI 平台：Runner 中断、缓存失效、Registry 不可用。

**2. 注入方式**
- 使用 Chaos Mesh、Gremlin、Toxiproxy 等工具模拟网络故障。
- 在 E2E 测试中通过 Service Worker / Mock Server 注入故障。
- CI 中随机终止 Job 或删除缓存，验证流水线韧性。

**3. 安全边界**
- 仅在隔离的测试/预发环境注入。
- 定义自动止损条件，如错误率超过阈值立即停止。
- 避开业务高峰和关键发布窗口。

**4. 度量与反馈**
- 记录故障注入后的恢复时间、用户体验影响。
- 将发现的问题纳入 backlog 修复。
- 定期更新故障场景库。

**评分维度**：
- 场景设计（30%）：能否覆盖网络、依赖、浏览器、CI 自身
- 注入手段（25%）：是否知道常见混沌工程工具
- 安全边界（20%）：是否强调隔离和止损
- 度量闭环（15%）：是否记录结果并驱动改进
- 与 CI/CD 集成（10%）：是否将混沌实验嵌入流水线

**常见错误**：
- 在生产环境直接注入故障
- 只做一次性演练，没有常态化
- 注入故障后没有明确的恢复和复盘流程

**延伸追问**：
- 如何验证前端在 CDN 故障时的降级策略？
- 混沌工程与常规测试有什么区别？

**相关题目**：
- [FB-12-SD-R-009 如何设计发布编排系统，实现自动灰度、观测与回滚](#FB-12-SD-R-009)
- [FB-12-CP-R-004 如何在持续交付中平衡发布速度与稳定性](#FB-12-CP-R-004)

**参考资源**：
- [Chaos Engineering - Principles](https://principlesofchaos.org/)
- [Gremlin](https://www.gremlin.com/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-SD-R-022：如何设计前端全链路可观测与发布联动？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：可观测性、发布联动、监控、告警、SRE
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套前端全链路可观测体系，并与 CI/CD 发布流程联动，实现发布即观测、异常即回滚。

**参考答案**：

**可观测三支柱**：

1. **Metrics（指标）**
   - 页面性能：FCP、LCP、CLS、TTFB。
   - 业务指标：转化率、错误率、API 成功率。
   - 发布指标：部署频率、失败率、回滚率。

2. **Logs（日志）**
   - 前端错误日志、用户行为日志、CI 构建日志。
   - 统一收集和关联 Trace ID。

3. **Traces（链路）**
   - 从用户点击到 API 调用到数据库查询的完整链路。
   - 使用 OpenTelemetry 或 APM 工具。

**与发布联动**：

1. **发布即标注**
   - 每次部署在监控平台上自动标注版本号和时间。
   - 方便对比发布前后指标变化。

2. **自动健康检查**
   - 发布后自动跑 smoke test 和关键业务监控。
   - 灰度阶段实时对比新老版本指标。

3. **异常自动回滚**
   - 错误率、业务指标超过 SLO 阈值时自动触发回滚。
   - 结合发布编排系统实现一键/自动回滚。

4. **发布复盘**
   - 自动收集发布前后指标变化，生成发布报告。

**评分维度**：
- 可观测覆盖（30%）：是否覆盖 Metrics/Logs/Traces
- 发布联动（30%）：是否实现发布标注、健康检查、自动回滚
- 指标设计（20%）：是否区分技术、业务、发布指标
- 闭环能力（20%）：是否形成发布-观测-回滚-复盘闭环

**常见错误**：
- 只有技术指标，没有业务指标
- 发布后不观测，等问题爆发才发现
- 自动回滚阈值设置过严导致频繁误回滚

**延伸追问**：
- 业务指标下降但技术指标正常时，是否应该回滚？
- 如何在灰度阶段准确对比新老版本的指标？

**相关题目**：
- [FB-12-SD-R-009 如何设计发布编排系统，实现自动灰度、观测与回滚](#FB-12-SD-R-009)
- [FB-12-A06-observability 相关题目](#)

**参考资源**：
- [OpenTelemetry](https://opentelemetry.io/)
- [Google SRE - Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-12-CP-R-023：如何在 CI/CD 中落地 FinOps 成本优化？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：FinOps、成本优化、CI/CD、资源治理、Runner
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何在 CI/CD 中落地 FinOps，控制和优化构建、测试、部署的成本。

**参考答案**：

**1. 成本可视化**
- 按团队、项目、流水线统计 CI 分钟数、存储、网络流量。
- 建立成本 Dashboard 和预算告警。

**2. 资源优化**
- 按需选择 Runner 规格，避免过度配置。
- 使用 Spot/Preemptible 实例运行非关键 CI Job。
- 及时清理过期 Artifact、缓存和镜像。

**3. 流水线效率**
- 使用 affected/filter 减少不必要构建。
- 优化缓存命中率和 Remote Cache。
- 合理并行，避免资源浪费。

**4. 配额与治理**
- 按团队设置 CI 分钟和存储配额。
- 对高成本 Job（如 E2E、视觉回归）设置审批或限制。
- 定期审查低效流水线和僵尸项目。

**5. 成本分摊与问责**
- 将 CI 成本纳入团队成本中心。
- 激励团队优化流水线效率。

**评分维度**：
- 可视化（25%）：是否建立成本看板
- 资源优化（25%）：是否优化 Runner、缓存、存储
- 流水线效率（25%）：是否从流程上减少浪费
- 治理机制（15%）：是否设置配额和审批
- 文化建设（10%）：是否将成本意识融入团队

**常见错误**：
- 只关注基础设施成本，忽略 CI 分钟和存储
- 过度限制导致开发效率下降
- 不清理过期产物导致存储无限增长

**延伸追问**：
- 如何在不影响速度的前提下降低 CI 成本？
- 视觉回归测试成本很高，你会如何优化？

**相关题目**：
- [FB-12-PE-A-021 如何优化前端 CI 流水线的性能](#FB-12-PE-A-021)
- [FB-12-SD-R-007 如何设计支持多租户、多区域的前端 CI/CD 平台](#FB-12-SD-R-007)

**参考资源**：
- [FinOps Foundation](https://www.finops.org/)
- [AWS - CI/CD Cost Optimization](https://aws.amazon.com/blogs/devops/)

**口头回答版**：
> - 按团队、项目、流水线统计 CI 分钟数、存储、网络流量。 - 建立成本 Dashboard 和预算告警。 - 按需选择 Runner 规格，避免过度配置。 - 使用 Spot/Preemptible 实例运行非关键 CI Job。

---

### FB-12-SD-R-024：如何设计下一代云原生前端交付平台？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：12 CI/CD
**标签**：云原生、前端交付、边缘计算、Serverless、GitOps
**出现频率**：低频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套面向未来的云原生前端交付平台，支持边缘部署、Serverless、动态配置和智能化运维。

**参考答案**：

**1. 构建层**
- 基于容器化构建环境，保证一致性和可移植性。
- 使用 Monorepo 工具精准构建 affected 包。
- 生成内容哈希的静态资源和函数包。

**2. 制品层**
- 不可变 Artifact Registry，支持 npm、Docker、静态资源包。
- 生成 SBOM 和签名，保证供应链安全。

**3. 部署层**
- 静态资源托管到对象存储 + 全球 CDN。
- 边缘函数（Cloudflare Workers、Vercel Functions、Lambda@Edge）托管动态逻辑。
- GitOps 声明式配置，ArgoCD/Flux 同步。

**4. 配置与灰度**
- 运行时配置中心，支持功能开关和按用户灰度。
- 边缘层按区域、Header、Cookie 切流量。

**5. 智能化运维**
- AIOps 失败分析、Flaky Test 检测、发布风险评估。
- 自动扩缩容、异常检测、自动回滚。

**6. 开发者体验**
- 自助门户、Preview Environment、统一可观测。
- Golden Path 模板降低接入成本。

**评分维度**：
- 云原生架构（25%）：是否使用容器、GitOps、边缘部署
- 制品安全（20%）：是否考虑不可变、签名、SBOM
- 灰度能力（20%）：是否支持边缘灰度和动态配置
- 智能化（15%）：是否引入 AIOps
- 开发者体验（20%）：是否降低接入门槛

**常见错误**：
- 只关注部署，忽略构建和制品管理
- 过度追求新技术，忽略团队维护能力
- 边缘和 Serverless 部署不考虑版本一致性

**延伸追问**：
- 云原生交付平台与传统 CDN 发布相比，核心差异是什么？
- 如何评估这样的平台是否值得投入？

**相关题目**：
- [FB-12-SD-R-012 如何设计面向 Serverless 与边缘计算的 CI/CD 架构](#FB-12-SD-R-012)
- [FB-12-SD-R-016 如何设计面向 AIOps 的智能 CI/CD 平台](#FB-12-SD-R-016)

**参考资源**：
- [CNCF - Cloud Native Definition](https://www.cncf.io/about/who-we-are/)
- [Vercel - Edge Network](https://vercel.com/docs/edge-network/overview)

**口头回答版**：
> - 基于容器化构建环境，保证一致性和可移植性。 - 使用 Monorepo 工具精准构建 affected 包。 - 生成内容哈希的静态资源和函数包。 - 不可变 Artifact Registry，支持 npm、Docker、静态资源包。


### FB-12-CO-B-024：什么是 CI/CD 中的 artifact？为什么需要它？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：CI/CD、artifact、构建产物、流水线
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 CI/CD 流水线中 artifact 的概念，并说明它的作用。

**参考答案**：

Artifact（构建产物）是 CI/CD 流水线中某个阶段生成的文件或目录，通常由构建阶段产出，供后续阶段下载使用。

常见 artifact：

- 编译后的 JS/CSS 文件（dist/、build/）。
- 打包后的 Docker image。
- 测试报告、覆盖率报告。
- Source Map 文件。

作用：

1. **阶段间传递**：构建一次，在测试、部署阶段复用同一份产物，避免重复构建。
2. **可追溯**：每个 artifact 可关联到具体的 commit 和 pipeline run。
3. **可回滚**：保留历史 artifact，便于快速回滚到旧版本。
4. **可审计**：测试报告、扫描报告作为合规证据。

示例（GitHub Actions）：

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: dist
    path: dist/
- uses: actions/download-artifact@v4
  with:
    name: dist
```

**评分维度**：
- 说明 artifact 含义（40%）
- 列举常见 artifact 类型（20%）
- 说明核心作用（40%）

**常见错误**：
- 把 artifact 和 raw source code 混淆
- 认为 artifact 只在部署阶段有用

**口头回答版**：
> artifact 就是 CI/CD 流水线里某个阶段生成的产物，比如 dist 目录、Docker image、测试报告。它的作用是在不同阶段之间传递，构建一次后面复用，还能追溯、回滚和审计。GitHub Actions 用 upload-artifact 和 download-artifact 来上传下载。

---

### FB-12-EN-B-025：GitHub Actions 中如何缓存依赖？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：GitHub Actions、缓存、dependencies、pnpm、npm
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明在 GitHub Actions 中如何缓存 node_modules 或 pnpm store，以加速 CI。

**参考答案**：

一、缓存 pnpm store（推荐）：

```yaml
- uses: pnpm/action-setup@v3
  with:
    version: 9
- name: Get pnpm store directory
  shell: bash
  run: echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
- uses: actions/cache@v4
  with:
    path: $&#123;&#123; env.STORE_PATH &#125;&#125;
    key: $&#123;&#123; runner.os &#125;&#125;-pnpm-$&#123;&#123; hashFiles('pnpm-lock.yaml') &#125;&#125;
    restore-keys: |
      $&#123;&#123; runner.os &#125;&#125;-pnpm-
- run: pnpm install --frozen-lockfile
```

二、缓存 npm cache：

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'
- run: npm ci
```

三、缓存策略要点：

1. **缓存键设计**：包含 lockfile hash、runner OS、包管理器类型。
2. **恢复键**：提供前缀匹配，允许部分命中。
3. **精确安装**：使用 `--frozen-lockfile` 或 `npm ci`，避免 CI 中变更 lockfile。
4. **避免缓存 node_modules 全部**：pnpm store 更稳定，占用空间更小。

**评分维度**：
- 能写出缓存配置（40%）
- 说明缓存键设计原则（30%）
- 提到 frozen-lockfile 等最佳实践（30%）

**常见错误**：
- 缓存键不包含 lockfile hash，导致命中过期缓存
- 缓存整个 node_modules 导致缓存过大或不稳定

**口头回答版**：
> GitHub Actions 里缓存依赖可以用 actions/cache，推荐缓存 pnpm store 而不是整个 node_modules。缓存键要包含 lockfile hash 和 runner OS，比如 `$&#123;&#123; runner.os &#125;&#125;-pnpm-$&#123;&#123; hashFiles('pnpm-lock.yaml') &#125;&#125;`。安装时用 `--frozen-lockfile` 保证一致。

---

### FB-12-CO-B-025：什么是 CI 中的 fail-fast 策略？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：CI/CD、fail-fast、并行、矩阵
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 CI 中的 fail-fast 策略，并说明适用场景。

**参考答案**：

Fail-fast 是 CI 中的一种策略：当并行运行的多个任务中有一个失败时，立即取消其他任务，不再等待它们完成。

示例（GitHub Actions matrix）：

```yaml
strategy:
  fail-fast: true
  matrix:
    node: [18, 20, 22]
```

如果 Node 18 的测试失败，Node 20 和 22 的任务会被立即取消。

适用场景：

1. **矩阵测试多版本**：一个版本失败通常意味着其他版本也会失败，没必要继续跑。
2. **快速反馈**：PR 阶段希望尽快知道问题，节省 CI 资源。

不适用场景：

1. **需要收集所有版本失败信息**：有时想知道哪些版本都有问题，应设 `fail-fast: false`。
2. **部署阶段**：部署任务失败后不应取消其他环境的发布验证。

**评分维度**：
- 说明 fail-fast 含义（50%）
- 说明适用和不适用场景（50%）

**常见错误**：
- 所有场景都开 fail-fast，导致信息丢失
- 部署阶段误用 fail-fast

**口头回答版**：
> fail-fast 就是并行任务里有一个失败就取消其他任务。适合矩阵跑多版本测试，快速反馈和省资源。但如果你需要知道所有版本的失败信息，或者部署阶段，就应该关闭 fail-fast。

---

### FB-12-EN-B-026：如何在 CI 中并行执行测试？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：CI/CD、并行测试、分片、矩阵
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何在 CI 中并行执行测试，以缩短反馈时间。

**参考答案**：

一、矩阵并行（GitHub Actions）：

```yaml
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - run: pnpm test --shard=$&#123;&#123; matrix.shard &#125;&#125;/4
```

二、按测试类型并行：

```yaml
jobs:
  unit:
    run: pnpm test:unit
  integration:
    run: pnpm test:integration
  e2e:
    run: pnpm test:e2e
```

三、测试框架内置分片：

- **Vitest**：`vitest --shard=2/4`。
- **Jest**：`jest --shard=2/4` 或第三方包。
- **Playwright**：内置 sharding 和 worker 并发。

四、注意事项：

1. 测试之间必须独立，不能有共享状态。
2. 每个分片的测试数据要隔离。
3. 并行 runner 数量与成本平衡。
4. 汇总各分片覆盖率时可能需要合并。

**评分维度**：
- 能写矩阵分片配置（40%）
- 提到测试框架分片能力（30%）
- 说明独立性和数据隔离（30%）

**常见错误**：
- 并行测试共享数据库导致互相干扰
- 分片数量过多导致 CI 成本飙升

**口头回答版**：
> CI 里并行测试可以用 GitHub Actions 的 matrix 分片，比如把测试分成 4 份跑。也可以按单元、集成、E2E 分 job 并行。Vitest、Jest、Playwright 都支持分片。要注意测试独立、数据隔离，别共享数据库。

---

### FB-12-CO-B-026：什么是 deployment preview？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：12 CI/CD
**标签**：CI/CD、deployment preview、PR、Vercel
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释什么是 deployment preview，它给团队协作带来什么价值。

**参考答案**：

Deployment preview（部署预览）是指每次 PR 或提交自动构建并部署到一个临时的、可访问的 URL，供 reviewer 在线预览变更效果。

典型实现：

- Vercel、Netlify、Cloudflare Pages 会为每个 PR 生成 preview URL。
- GitHub Actions 结合 S3/CDN 也可以自建 preview 环境。

价值：

1. **视觉/交互验证**：设计师、产品经理可直接查看效果，而不是只看代码。
2. **提前发现问题**：在合并前发现跨浏览器、布局问题。
3. **减少本地环境差异**：preview 环境和生产环境一致。
4. **加速 review**：非技术人员也能参与验收。

注意事项：

- preview 环境不应访问真实生产数据。
- 需要控制 preview URL 的访问权限。
- 合并或关闭 PR 后应及时清理 preview 资源。

**评分维度**：
- 说明 deployment preview 含义（40%）
- 列举价值（40%）
- 提到安全和清理（20%）

**常见错误**：
- 把 preview 环境直接接生产数据库
- PR 关闭后不清理 preview 造成资源浪费

**口头回答版**：
> deployment preview 就是每次 PR 自动部署一个临时可访问的 URL，像 Vercel、Netlify 都会做。这样设计师和产品可以直接在线看效果，不用本地跑。能提前发现视觉和交互问题，加速 review。但要注意 preview 别接生产数据，PR 关闭后要清理资源。

---

### FB-12-EN-A-027：如何设计 CI 中的 lint/typecheck/test 任务顺序？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、lint、typecheck、test、任务编排
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个合理的 CI 任务顺序，让 lint、typecheck、test、build 等任务高效执行。

**参考答案**：

推荐顺序：

```
install → lint/typecheck（并行） → build → test → deploy
```

详细说明：

1. **install**：依赖安装是所有任务的基础，必须最先执行。
2. **lint + typecheck 并行**：
   - 两者都不依赖构建产物，可并行。
   - 失败成本低，能快速拦截低级错误。
3. **build**：
   - 在 lint/typecheck 通过后构建。
   - 产物作为 artifact 供后续阶段下载。
4. **test**：
   - 依赖 build 产物（如需要端到端测试）。
   - 单元测试可与 build 并行，如果不需要构建产物。
5. **deploy**：
   - 所有质量 gate 通过后部署。

优化策略：

- 使用 affected 分析，只跑变更相关的任务。
- 使用缓存跳过未变更的 lint/typecheck。
- 测试分片并行执行。

反例：

- 先跑耗时长的 E2E，再跑 lint，低级错误发现太晚。
- 每个 job 都重新 install，不共享依赖缓存。

**评分维度**：
- 任务顺序合理（40%）
- 说明并行和依赖关系（30%）
- 提到缓存和 affected 优化（30%）

**常见错误**：
- 把 build 放在 lint 前面
- 所有任务串行执行，CI 极慢

**口头回答版**：
> CI 顺序一般是 install → lint 和 typecheck 并行 → build → test → deploy。lint 和 typecheck 不依赖产物，先跑能快速拦截问题。build 产物作为 artifact 给 test 和 deploy 用。还可以用 affected 只跑变更相关任务，加缓存提速。

---

### FB-12-CO-A-022：什么是 CI 中的 idempotency（幂等性）？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、幂等性、idempotency、可靠性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 CI/CD 中幂等性的概念，并说明为什么它很重要。

**参考答案**：

幂等性指一个操作执行一次和执行多次产生的结果相同。在 CI/CD 中，pipeline 应该可以被重新触发而不会产生副作用或错误。

为什么重要：

1. **可重试**：网络波动或临时故障后，可以安全重试某个 job。
2. **一致性**：不同的人、不同时间运行同一份 pipeline，得到一致结果。
3. **可预测**：减少“这次能跑、下次失败”的诡异问题。

实现幂等性的方法：

1. **安装依赖用 lockfile**：`pnpm install --frozen-lockfile`、`npm ci`。
2. **构建产物覆盖写入**：每次构建前先清理输出目录。
3. **数据库迁移幂等**：迁移脚本使用 `IF EXISTS`、`CREATE OR REPLACE` 等。
4. **避免重复发布**：发布前检查版本是否已存在。
5. **资源命名唯一**：避免多个 pipeline run 创建同名资源冲突。

反例：

- 构建产物追加而不清理，导致旧文件残留。
- 重复 publish 同一版本号导致 npm 报错。

**评分维度**：
- 说明幂等性含义（40%）
- 说明 CI 中的重要性（30%）
- 给出实现方法（30%）

**常见错误**：
- 认为 CI 天然幂等
- 不清理构建产物导致增量污染

**口头回答版**：
> CI 里的幂等性就是同一个操作跑多次结果一样。很重要，因为 CI 可能要重试，要保证每次结果一致。实现方式包括用 lockfile 安装、构建前清理输出目录、数据库迁移用 IF EXISTS、发布前检查版本是否已存在。

---

### FB-12-SE-A-026：CI 中如何处理 secrets 和 credentials？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、secrets、凭证、安全、GitHub Actions
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 CI/CD 中如何安全地管理 secrets 和 credentials。

**参考答案**：

一、存储方式：

1. **CI 平台 secrets**：GitHub Secrets、GitLab CI Variables、Vault。
2. **环境隔离**：生产、测试、preview 使用不同的 secret set。
3. **最小权限**：只给 CI 必需的最小权限，如只读 registry、只写特定 bucket。

二、使用规范：

1. **不在代码中硬编码**：所有凭证通过环境变量注入。
2. **不在日志中打印**：CI 平台会自动 mask secrets，但要避免自定义 echo。
3. **短期凭证**：使用 OIDC 获取临时 token，避免长期 access key。

三、访问控制：

1. 分支保护，只有 main 分支的部署 job 能访问生产 secrets。
2. PR 来自 fork 时不触发需要 secrets 的 workflow（`pull_request_target` 谨慎使用）。
3. 使用环境审批（GitHub Environments），部署到生产前需要人工审批。

四、轮换与审计：

1. 定期轮换 secrets。
2. 记录谁、何时访问了哪些 secrets。
3. 离职或权限变更时立即回收。

**评分维度**：
- 说明存储方式（30%）
- 使用规范（30%）
- 访问控制（25%）
- 轮换与审计（15%）

**常见错误**：
- 把 secrets 明文存在仓库文件里
- fork PR 也能访问生产 secrets

**口头回答版**：
> CI 里 secrets 存在 GitHub Secrets 或 Vault，生产测试环境分开，给最小权限。不在代码里硬编码，不在日志打印，尽量用 OIDC 拿临时 token。分支保护要限制只有 main 能访问生产 secrets，部署到生产前加人工审批。还要定期轮换和审计。

---

### FB-12-CP-A-021：如何选择 self-hosted runner 和 cloud runner？

**题型**：对比题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、runner、GitHub Actions、self-hosted、cloud
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 self-hosted runner 和 cloud-hosted runner，说明各自的优缺点和适用场景。

**参考答案**：

| 维度 | Cloud Runner | Self-hosted Runner |
|------|--------------|---------------------|
| 维护成本 | 低，平台托管 | 高，需自己维护机器 |
| 启动速度 | 快，按需创建 | 依赖本地资源，可能排队 |
| 隔离性 | 每次新环境，干净 | 可能残留文件，需清理 |
| 网络 | 公网，访问内部服务受限 | 可访问内网、私有 registry |
| 成本 | 按量计费，可能贵 | 固定成本，适合大用量 |
| 安全性 | 平台负责 | 自己负责基线安全 |
| 可定制 | 有限 | 可安装任意软件和硬件 |

选择建议：

- **Cloud Runner**：
  - 团队规模小，不想维护基础设施。
  - 对隔离性要求高。
  - 流量波动大，按需付费更划算。

- **Self-hosted Runner**：
  - 需要访问内网资源、私有 npm registry。
  - 有特定硬件需求（GPU、大内存）。
  - CI 用量大，固定成本更划算。

混合策略：

- 普通 lint/test 用 cloud runner。
- 需要访问内网的 deploy job 用 self-hosted runner。
- 用 runner label 区分不同 runner 池。

**评分维度**：
- 对比维度全面（40%）
- 适用场景判断合理（30%）
- 提到混合策略（30%）

**常见错误**：
- 为了省钱全部用 self-hosted 但维护跟不上
- 在 self-hosted runner 上跑不可信 PR 代码，带来安全风险

**口头回答版**：
> Cloud runner 维护低、隔离好、按量付费，适合大多数场景。Self-hosted 适合要访问内网、有特殊硬件、或者用量大固定成本更划算的情况。也可以混用，普通任务 cloud，部署任务用 self-hosted。但要注意 self-hosted 的安全清理。

---

### FB-12-CO-A-023：什么是 pipeline as code 的优势？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、Pipeline as Code、版本控制、Git
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Pipeline as Code 的优势，并举例说明。

**参考答案**：

Pipeline as Code 指将 CI/CD 配置以代码形式（如 `.github/workflows/ci.yml`、`.gitlab-ci.yml`）存放在版本控制中。

优势：

1. **版本控制**：
   - pipeline 变更随代码一起 review、回滚。
   - 可追溯每次 CI 配置变更的原因。

2. **代码复用**：
   - 使用模板、include、composite actions 减少重复配置。
   - 例如 GitHub reusable workflows、GitLab include。

3. **环境一致性**：
   - 同一份配置在不同分支、不同项目间保持一致。
   - 避免 UI 配置漂移。

4. **协作与 review**：
   - CI 变更需要经过 PR review，减少误操作。
   - 可以发现潜在的安全和成本问题。

5. **可测试**：
   - 可以用工具验证 YAML 语法和 schema。
   - 部分平台支持本地调试 pipeline。

示例：

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    uses: ./.github/workflows/reusable-test.yml
```

**评分维度**：
- 说明 Pipeline as Code 含义（20%）
- 优势列举全面（50%）
- 能举例说明（30%）

**常见错误**：
- 认为 Pipeline as Code 只是 YAML 文件
- 忽略版本控制和 review 价值

**口头回答版**：
> Pipeline as Code 就是把 CI/CD 配置写成代码放在仓库里。好处是可以版本控制、review、回滚，能复用模板，避免 UI 配置漂移，还能本地验证 YAML。比如 GitHub Actions 的 workflow 文件就是典型例子。

---

### FB-12-EN-P-027：如何优化 CI 的缓存命中率？

**题型**：工程化题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、缓存、命中率、性能优化
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明如何设计和优化 CI 缓存策略，提高缓存命中率，缩短流水线时间。

**参考答案**：

一、缓存键设计原则：

1. **精确键（exact key）**：包含 lockfile hash，确保依赖变化时缓存失效。
   ```yaml
   key: $&#123;&#123; runner.os &#125;&#125;-pnpm-$&#123;&#123; hashFiles('pnpm-lock.yaml') &#125;&#125;
   ```
2. **恢复键（restore key）**：提供前缀匹配，允许部分命中。
   ```yaml
   restore-keys: |
     $&#123;&#123; runner.os &#125;&#125;-pnpm-
   ```

二、缓存内容选择：

1. 缓存 pnpm store / npm cache，而不是整个 node_modules。
2. 缓存构建工具（如 Turborepo Remote Cache、Nx cache）。
3. 缓存编译产物（如 TypeScript `*.tsbuildinfo`）。

三、避免缓存污染：

1. 构建前清理输出目录，确保产物可复现。
2. 不缓存包含绝对路径或随机值的文件。
3. 不同 job 使用不同的缓存键，避免互相覆盖。

四、分层缓存：

1. 根依赖一层缓存。
2. 各子包依赖一层缓存（Monorepo 场景）。
3. 构建产物一层缓存。

五、监控命中率：

1. 在 CI 日志中标注 cache hit/miss。
2. 收集缓存命中数据，发现异常下降及时告警。
3. 定期清理过期缓存，避免存储浪费。

六、Turborepo 示例：

```json
{
  "remoteCache": {
    "enabled": true,
    "signature": true
  }
}
```

**评分维度**：
- 缓存键设计合理（30%）
- 缓存内容选择正确（25%）
- 避免污染和分层缓存（25%）
- 命中率监控（20%）

**常见错误**：
- 缓存键不包含 lockfile，命中过期依赖
- 缓存整个 node_modules 导致缓存过大

**口头回答版**：
> 优化 CI 缓存命中率，键要包含 lockfile hash，同时配 restore key 前缀匹配。缓存 pnpm store 或构建工具缓存，不要缓存整个 node_modules。还要避免缓存污染，构建前清输出目录，不同 job 用不同键。可以分层缓存根依赖、子包依赖和产物，并监控 hit/miss 数据。

---

### FB-12-SE-P-022：CI 中如何实现灰度发布？

**题型**：安全/部署题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、灰度发布、canary、部署策略
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明如何在 CI/CD 流水线中实现灰度发布，并说明关键控制点和风险。

**参考答案**：

一、灰度发布流程：

```
构建 → 部署金丝雀环境 → 流量 5% → 观测 → 流量 25% → 观测 → 100% 全量
```

二、实现方式：

1. **流量控制**：
   - 网关层按百分比、地域、用户 ID 哈希分流。
   - Kubernetes 渐进式交付（Argo Rollouts、Flagger）。

2. **CI/CD 控制**：
   - CI 构建产物后触发部署流水线。
   - 部署脚本按阶段调整流量权重。
   - 每个阶段设置暂停和人工审批 gate。

3. **观测指标**：
   - 错误率、P99 延迟、吞吐量。
   - 业务指标：转化率、核心功能成功率。
   - 资源指标：CPU、内存、异常日志。

三、自动回滚条件：

- 错误率超过阈值。
- P99 延迟超过基线。
- 业务指标异常下跌。
- 自定义 SLO  breached。

四、关键控制点：

1. 灰度环境必须和生产环境隔离但等价。
2. 发布窗口期保留快速回滚能力。
3. 发布过程可观测、可审计。
4. 灰度用户选择要有代表性，避免只选内部用户。

**评分维度**：
- 流程设计清晰（30%）
- 流量控制和工具（30%）
- 观测和回滚条件（30%）
- 风险控制（10%）

**常见错误**：
- 没有自动回滚，全靠人工观察
- 灰度环境配置和生产不一致，结果不可信

**口头回答版**：
> 灰度发布就是先小流量验证再全量。CI 构建后部署到金丝雀环境，网关按百分比或用户 ID 分流，比如 5%、25% 逐步放开。每个阶段观测错误率、延迟、业务指标，异常自动回滚。可以用 Argo Rollouts、Flagger 或网关层实现。灰度环境要和生产等价，保留快速回滚能力。

---

### FB-12-CP-P-024：如何设计蓝绿部署的 CI/CD 流水线？

**题型**：综合开放题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、蓝绿部署、零停机、部署策略
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一条蓝绿部署的 CI/CD 流水线，要求零停机发布且支持快速回滚。

**参考答案**：

一、蓝绿部署原理：

- 同时维护两套完全相同的生产环境：Blue（当前流量）和 Green（新版本）。
- 新版本部署到 Green，验证通过后切换流量。
- 切换瞬间完成，用户无感知。

二、CI/CD 流水线设计：

```
Build → Deploy Green → Smoke Test Green → Switch Traffic → Monitor → Keep/Rollback
```

三、实现细节：

1. **构建阶段**：
   - 构建产物、Docker image 并打标签。
   - 推送镜像到 registry。

2. **部署 Green**：
   - 在 Green 环境部署新版本。
   - 数据库迁移通常先执行，且要向后兼容。

3. **验证 Green**：
   - 运行 smoke test、健康检查。
   - 检查关键接口返回正确。

4. **切换流量**：
   - 负载均衡器/DNS/网关切换 100% 流量到 Green。
   - 保留 Blue 运行一段时间（如 1 小时）。

5. **监控与回滚**：
   - 观测错误率、延迟、业务指标。
   - 异常时立即切回 Blue。
   - 稳定后销毁或回收 Blue 资源。

四、数据库注意事项：

- 蓝绿部署最难处理的是数据库 schema 变更。
- 应采用向后兼容的迁移：先加字段，再改代码，再去字段。

五、适用场景：

- 需要零停机发布。
- 资源允许同时运行两套环境。
- 回滚时间要求极短。

**评分维度**：
- 蓝绿部署原理清晰（25%）
- 流水线阶段完整（30%）
- 切换和回滚机制（25%）
- 数据库处理（20%）

**常见错误**：
- 切换流量前没有充分验证 Green
- 数据库迁移不兼容导致无法回滚

**口头回答版**：
> 蓝绿部署是两套相同环境，Blue 跑当前版本，Green 跑新版本。CI 构建后部署到 Green，跑 smoke test，验证通过就切流量，异常马上切回 Blue。数据库迁移要做向后兼容，否则回滚会出问题。稳定后再回收 Blue。

---

### FB-12-EN-P-028：如何设计多环境（dev/staging/prod）部署策略？

**题型**：工程化题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、多环境、dev、staging、prod、部署
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套多环境部署策略，覆盖 dev、staging、production，并说明各环境的作用和差异。

**参考答案**：

一、环境定义：

| 环境 | 作用 | 数据 | 访问权限 |
|------|------|------|---------|
| dev | 开发自测、feature 验证 | 合成数据或脱敏数据 | 开发团队 |
| staging | 集成测试、验收、预发布 | 接近生产的数据快照 | 测试/产品/核心开发 |
| prod | 线上生产 | 真实用户数据 | 受限，运维/SRE |

二、部署策略：

1. **dev**：
   - 每个 feature branch 自动部署，或合并到 develop 后自动部署。
   - 使用 preview URL 或内部域名。

2. **staging**：
   - main 分支合并后自动部署。
   - 跑全量集成测试和 E2E。
   - 作为发布前的最后验证。

3. **prod**：
   - 手动触发或发布火车触发。
   - 使用蓝绿/金丝雀部署。
   - 需要人工审批和监控。

三、配置管理：

- 环境变量通过 CI/CD secrets 注入，不硬编码。
- 使用配置中心或 config map 区分环境。
- 不同环境使用不同域名、数据库、API endpoint。

四、数据隔离：

- dev/staging 严禁连接 prod 数据库。
- staging 数据定期从 prod 脱敏同步。

五、回滚：

- 每个环境保留上一个稳定版本的 artifact。
- prod 回滚需要一键化，并通知相关人员。

**评分维度**：
- 环境定义清晰（25%）
- 部署策略合理（30%）
- 配置和数据隔离（25%）
- 回滚机制（20%）

**常见错误**：
- staging 直接复用生产数据库
- dev 环境手动部署，无法快速验证

**口头回答版**：
> 多环境部署一般是 dev 给开发自测，staging 做集成验收，prod 跑线上。feature branch 自动部署 dev，main 合并后自动部署 staging 跑全量测试，prod 手动或发布火车触发，用蓝绿或金丝雀。环境配置用变量注入，staging 不能连生产数据库，每个环境保留回滚版本。

---

### FB-12-CO-P-025：什么是 CI/CD 中的 observability？

**题型**：概念题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：12 CI/CD
**标签**：CI/CD、可观测性、observability、监控、追踪
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 CI/CD 中的可观测性（observability）概念，并说明应关注哪些指标。

**参考答案**：

CI/CD 可观测性指通过日志、指标、追踪等手段，持续了解和优化流水线运行状态的能力。

关注的指标：

1. **执行时间**：
   - 整体 pipeline 耗时、各阶段耗时。
   - 趋势分析，发现性能回归。

2. **成功率**：
   - pipeline 成功率、各 job 失败率。
   -  flaky test 率。

3. **资源使用**：
   - CPU、内存、磁盘、并发 runner 数。
   - CI 成本。

4. **缓存效率**：
   - cache hit/miss 率。
   - 缓存大小和存储成本。

5. **部署指标**：
   - 部署频率、变更前置时间、恢复时间、变更失败率（DORA 指标）。

实现方式：

- 将 CI 日志和指标发送到 Prometheus/Grafana/Datadog。
- 使用 OpenTelemetry 追踪 pipeline 各阶段。
- 设置告警，如 pipeline 连续失败、耗时突增。

**评分维度**：
- 说明可观测性含义（30%）
- 指标覆盖全面（40%）
- 实现方式具体（30%）

**常见错误**：
- 只关注 pipeline 成功与否，不关注耗时和成本
- 没有趋势分析，无法发现隐性退化

**口头回答版**：
> CI/CD 可观测性就是通过日志、指标、追踪来了解流水线健康状况。要关注 pipeline 耗时、成功率、资源使用、缓存命中率、部署频率这些指标。可以用 Prometheus、Grafana 收集，设置告警，比如连续失败或者耗时突增。

---

### FB-12-SD-R-025：设计一个多环境、多地域的部署平台

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：12 CI/CD
**标签**：CI/CD、部署平台、多地域、多环境、架构
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个支持多环境（dev/staging/prod）和多地域（北京、上海、海外）的前端部署平台。

**参考答案**：

一、核心组件：

```
开发者 → Git → CI Build → Artifact Registry → Deploy Controller → CDN / Edge → 用户
                                      ↓
                                Config Center / Secrets Manager
                                      ↓
                                Monitoring / Alerting
```

二、构建阶段：

1. 代码合并后触发 CI，构建生成静态产物。
2. 产物按 `project/env/commit` 路径上传到对象存储或 artifact registry。
3. Source Map 单独上传监控平台。

三、部署控制器：

1. 接收部署请求，解析目标环境和地域。
2. 从 registry 拉取对应 artifact。
3. 按策略（全量、灰度、蓝绿）分发到 CDN 或 K8s ingress。

四、多环境管理：

- dev/staging 自动部署，prod 需审批。
- 每个环境独立配置、域名、TLS 证书。
- 环境间网络隔离，staging 不能访问 prod 数据。

五、多地域分发：

- 静态资源通过 CDN 分发到多个地域节点。
- API 请求按地域路由到最近的机房。
- 不同地域可独立灰度和回滚。

六、配置与 secrets：

- 使用配置中心（如 Consul、Nacos、Kubernetes ConfigMap）。
- secrets 按环境和地域隔离，通过 Vault 或 KMS 管理。

七、可观测性：

- 部署事件日志记录：谁、何时、部署了什么版本到哪个环境。
- 监控各地域错误率、延迟、流量分布。
- 异常自动告警和回滚。

八、回滚：

- 保留最近 N 个版本的 artifact。
- 支持一键按环境/地域回滚。
- 回滚前自动预热 CDN。

**评分维度**：
- 架构组件完整（30%）
- 多环境多地域策略清晰（30%）
- 配置、安全和可观测性（25%）
- 回滚能力（15%）

**常见错误**：
- 多地域共用同一 artifact 和配置
- 没有按地域独立灰度和回滚能力

**口头回答版**：
> 多环境多地域部署平台要有 CI 构建、artifact registry、部署控制器、CDN 和配置中心。构建产物按项目/环境/commit 存起来，部署控制器按策略分发到不同地域 CDN。dev/staging 自动，prod 要审批。不同地域独立灰度、监控和回滚。配置和 secrets 按环境地域隔离。

---

### FB-12-CP-R-024：如何实现 CI/CD 中的安全左移？

**题型**：综合开放题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：12 CI/CD
**标签**：CI/CD、安全左移、DevSecOps、SAST、SCA
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明如何在 CI/CD 中实现安全左移（Shift Left Security），在开发早期发现并修复安全问题。

**参考答案**：

一、安全左移理念：

将安全检测尽可能前置到开发阶段，而不是等到发布前或上线后才做审计。

二、各阶段实践：

1. **IDE/本地阶段**：
   - 安装安全检测插件（如 Snyk、CodeQL extension）。
   - 提交前运行 `pnpm audit`、secret 扫描。

2. **提交/PR 阶段**：
   - SAST（静态应用安全测试）：扫描代码漏洞。
   - SCA（软件成分分析）：检测依赖漏洞和许可证风险。
   - Secret 扫描：防止把密钥提交到仓库（git-secrets、truffleHog）。
   - Lint 安全规则：如 `eslint-plugin-security`。

3. **构建阶段**：
   - Docker image 扫描（Trivy、Snyk Container）。
   - 产物完整性校验（hash、签名）。

4. **部署阶段**：
   - 部署前进行最后一次安全 gate。
   - 使用最小权限凭证和短期 token。

5. **运行阶段**：
   - 运行时应用安全监控（RASP）。
   - 定期重新扫描已发布版本的依赖漏洞。

三、工具链：

- SAST：SonarQube、CodeQL、Semgrep。
- SCA：Snyk、OWASP Dependency-Check、npm audit。
- Secret：git-secrets、truffleHog、GitHub secret scanning。
- Container：Trivy、Anchore。

四、文化与流程：

- 安全发现的问题要快速响应，不堆积。
- 高危漏洞阻塞发布。
- 安全培训纳入新人 onboarding。

**评分维度**：
- 阶段划分清晰（35%）
- 工具链合理（30%）
- 流程与文化（20%）
- 运行阶段补充（15%）

**常见错误**：
- 只在发布前做一次安全扫描
- 安全工具报警过多，开发团队麻木

**口头回答版**

> 安全左移就是尽早发现安全问题。本地 IDE 跑插件和 audit，PR 阶段做 SAST、SCA、secret 扫描，构建阶段扫 Docker 镜像，部署前做安全 gate，运行后持续监控。高危漏洞要阻塞发布。工具可以选 CodeQL、Semgrep、Snyk、Trivy 这些。

---

### FB-12-EN-R-001：如何设计 CI/CD 的成本优化方案？

**题型**：工程化题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：12 CI/CD
**标签**：CI/CD、成本优化、runner、缓存、并发
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套 CI/CD 成本优化方案，在保证质量的前提下降低运行开销。

**参考答案**：

一、成本来源分析：

1. Runner 运行时间（主要成本）。
2. 存储（artifact、缓存、日志）。
3. 网络（下载依赖、上传产物）。
4. 第三方 SaaS（Snyk、codecov 等）。

二、优化策略：

1. **减少运行时间**：
   - 使用 affected/filter 只构建变更部分。
   - 优化测试，删除慢和无用测试。
   - 并行分片执行测试。

2. **提高缓存命中率**：
   - 合理设计缓存键，缓存 pnpm store 和构建产物。
   - 使用远程缓存共享团队结果。

3. **选择合适的 runner**：
   - 普通任务用 cloud runner。
   - 大用量、稳定任务用 self-hosted runner。
   - 自动缩放 runner 数量，避免空闲浪费。

4. **Artifact 生命周期管理**：
   - 设置 artifact 过期时间（如 30 天）。
   - 大 artifact 压缩后上传。
   - 不缓存 source map 等可重新生成文件。

5. **取消无效任务**：
   - 同分支新提交自动取消旧 CI run。
   - fail-fast 减少失败后的无效运行。

6. **SaaS 用量优化**：
   - 按需启用高级安全扫描。
   - 合并小 PR，减少扫描次数。

三、监控与度量：

- 按项目/团队统计 CI 分钟数和成本。
- 设置成本预算告警。
- 定期审查高成本任务。

**评分维度**：
- 成本来源分析（20%）
- 优化策略全面（50%）
- 监控度量（20%）
- 质量保障不牺牲（10%）

**常见错误**：
- 为了省钱关闭测试或安全扫描
- 缓存策略不当反而增加存储成本

**口头回答版**：
> CI/CD 成本主要在 runner 时间、存储和网络。优化可以只构建 affected 部分，提高缓存命中率，用合适的 runner，管理 artifact 生命周期，取消无效任务。还要按团队统计 CI 分钟数，设成本预算。不能因为省钱降低质量。

---

### FB-12-CO-R-001：CI/CD 的未来趋势是什么？

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：12 CI/CD
**标签**：CI/CD、未来趋势、AI、GitOps、平台工程
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请谈谈 CI/CD 领域未来可能的发展趋势。

**参考答案**：

1. **平台工程（Platform Engineering）**：
   - 企业将 CI/CD 抽象为内部开发者平台（IDP）。
   - 开发者通过自助服务接口使用，无需关心底层 pipeline。

2. **AI 辅助**：
   - AI 自动生成和修复 CI 配置。
   - 智能分析失败日志，推荐修复方案。
   - 自动优化测试选择和执行顺序。

3. **GitOps 深化**：
   - 部署状态由 Git 单点控制，声明式基础设施。
   - ArgoCD、Flux 等工具成为主流。

4. **安全左移与供应链安全**：
   - SBOM、签名、SLSA 框架普及。
   - CI/CD 本身成为攻击目标，安全加固更重要。

5. **可观测性增强**：
   - CI/CD 作为软件交付价值流，被纳入全局可观测。
   - DORA 指标成为团队衡量标准。

6. **边缘和云原生部署**：
   - 构建产物直接分发到边缘节点。
   - 与 Kubernetes、serverless 深度集成。

7. **低碳 CI**：
   - 优化资源使用，选择绿色能源数据中心。
   - 减少无效构建和冗余测试。

**评分维度**：
- 趋势覆盖全面（40%）
- 能结合实际工具或框架（30%）
- 对安全、AI、平台工程有深入理解（30%）

**常见错误**：
- 只谈速度提升，忽略安全和可观测性
- 把趋势当现实，忽略落地成本

**口头回答版**：
> CI/CD 未来会往平台工程方向发展，企业搭建内部开发者平台。AI 会辅助生成配置、分析失败、优化测试。GitOps 和声明式部署会更普及，安全左移和供应链安全也会加强，SBOM、SLSA 会成为标配。可观测性也会更强，DORA 指标会用来衡量团队交付能力。

---

### FB-12-SC-R-001：如何设计 CI/CD 的灾难恢复方案？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：12 CI/CD
**标签**：CI/CD、灾难恢复、备份、回滚、高可用
**出现频率**：低频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计 CI/CD 系统的灾难恢复方案，确保在 CI 平台故障、artifact 丢失或配置误删时能快速恢复。

**参考答案**：

一、风险识别：

1. CI 平台服务中断（GitHub Actions、GitLab CI 故障）。
2. Artifact registry 数据损坏或误删。
3. Pipeline 配置被误改或删除。
4. Secrets 泄露或丢失。
5. Runner 池大面积不可用。

二、备份策略：

1. **Pipeline 配置**：
   - 所有 CI 配置存放在 Git，天然版本化。
   - 定期备份仓库到异地或不同平台。

2. **Artifact**：
   - 重要 artifact 多地备份（对象存储跨区复制）。
   - 保留最近 N 个稳定版本的 artifact。

3. **Secrets**：
   - 使用 Vault/KMS，启用版本历史和定期备份。
   - 关键 secrets 由多个管理员分管。

三、恢复流程：

1. **CI 平台故障**：
   - 切换到备用 CI 平台或本地 runner。
   - 关键发布路径支持手动执行。

2. **Artifact 丢失**：
   - 从备份恢复或基于稳定 tag 重新构建。
   - 重新构建产物 hash 可能与原 artifact 不同，需验证。

3. **配置误删**：
   - 通过 Git 回滚到上一个稳定版本。

4. **Secrets 泄露**：
   - 立即轮换所有受影响凭证。
   - 审计访问日志，评估影响范围。

四、演练：

- 每季度做一次灾难恢复演练。
- 记录 RTO（恢复时间目标）和 RPO（恢复点目标）。
- 根据演练结果更新预案。

**评分维度**：
- 风险识别全面（25%）
- 备份策略具体（30%）
- 恢复流程清晰（30%）
- 演练和度量（15%）

**常见错误**：
- 没有 artifact 备份，丢失后只能重新构建
- 灾难恢复方案只停留在文档，没有演练

**口头回答版**：
> CI/CD 灾难恢复要备份 pipeline 配置、artifact 和 secrets。配置在 Git 里天然版本化，artifact 要异地多副本，secrets 用 Vault 并启用版本历史。平台故障时切换到备用平台或手动发布，artifact 丢了从备份恢复或重构建。还要定期演练，记录 RTO 和 RPO。

---

