# CI/CD 面试题

> 本文件收录 CI/CD 相关面试题，目标题量 30 道。
> 题型覆盖：概念题、场景设计题、系统设计题、工程化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#基础题)
- [进阶题](#进阶题)
- [深入题](#深入题)
- [架构题](#架构题)

---

## 基础题

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

---

## 进阶题

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
    DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
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

---

## 深入题

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
          node-version: ${{ inputs.node-version }}
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

---

## 架构题

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
