# 前端面试题总库（Interview Bank）

> 本模块是面向前端工程师求职与面试官出题的**独立、全面、结构化**面试题库。
> 它不局限于知识库的 43 个领域，而是按"面试真实考察域"重新组织，覆盖从应届生到前端架构师的全层级面试场景。
> 目标题量：**3000-5000 题**；每道题均附带参考答案、评分维度、延伸追问与常见错误。

---

## 一、模块定位

### 1.1 解决什么问题？

- 学习者：面试前能按题型、难度、岗位、公司类型快速定位薄弱环节。
- 面试官：能按轮次、岗位、领域快速组卷，统一团队面试标准。
- 贡献者：每道题有统一格式和唯一 ID，便于维护、检索和交叉引用。

### 1.2 与现有内容的关系

| 内容 | 作用 | 本模块的作用 |
|------|------|-------------|
| `level-XX-xxx/03-面试题.md` | 按领域教学，配合学习文档使用 | 本模块可引用或聚合其中高频题目，按面试场景重新编排 |
| `quizzes/*.json` | 客观选择题 | 本模块以主观面试题为主，客观题仅作为补充 |
| `website/learning-path/interview-practice` | 旧版面试抽测 | 将基于本模块升级为可筛选、可组卷、可导出的面试系统 |

**核心原则**：
- 各领域 `03-面试题.md` 继续保留，承担"学习伴侣"角色。
- `interview-bank/` 承担"求职/面试工具"角色，是独立模块，**不严格受限于 43 个知识领域**。

---

## 二、目录结构

```text
interview-bank/
├── README.md                    # 本文件
├── SCHEMA.md                    # 题目数据规范（必读）
├── index.json                   # 题库总索引：按分类、难度、题型聚合
├── by-domain/                   # 按面试知识域分类（55+ 个领域）
│   ├── 01-javascript.md
│   ├── 02-typescript.md
│   ├── 03-browser.md
│   ├── ...
│   ├── 44-mini-program.md
│   ├── 45-harmonyos.md
│   ├── 46-flutter.md
│   ├── 47-electron.md
│   ├── 48-webassembly.md
│   ├── 49-webgpu-graphics.md
│   ├── 50-multimedia.md
│   ├── 51-low-code.md
│   ├── 52-computer-science.md
│   ├── 53-behavioral.md
│   ├── 54-resume-interview.md
│   └── 55-industry.md
├── by-type/                     # 按题型聚合（视图，不重复存放题目）
│   ├── 01-concept.md
│   ├── 02-code-analysis.md
│   ├── 03-coding.md
│   ├── 04-scenario.md
│   ├── 05-system-design.md
│   ├── 06-framework-source.md
│   ├── 07-performance.md
│   ├── 08-security.md
│   ├── 09-engineering.md
│   ├── 10-soft-skill.md
│   └── 11-comprehensive.md
├── by-level/                    # 按岗位层级聚合（视图）
│   ├── junior.md
│   ├── senior.md
│   ├── expert.md
│   └── architect.md
├── by-company/                  # 按公司类型/面试风格聚合（视图）
│   ├── big-tech.md
│   ├── foreign-company.md
│   ├── startup.md
│   ├── bank-ops.md
│   ├── ecommerce.md
│   ├── fintech.md
│   └── gaming.md
├── by-round/                    # 按面试轮次聚合（视图）
│   ├── 01-screening.md
│   ├── 02-technical-1.md
│   ├── 03-technical-2.md
│   ├── 04-system-design.md
│   ├── 05-manager.md
│   └── 06-hr.md
├── mock-papers/                 # 模拟试卷
│   ├── junior-frontend-60min.md
│   ├── senior-react-90min.md
│   ├── architect-system-design-120min.md
│   └── ...
├── flashcards/                  # 快问快答（面试前速记）
│   ├── js-core.md
│   ├── react-core.md
│   ├── browser-core.md
│   └── ...
└── data/                        # 结构化数据（供网站和工具使用）
    ├── questions.json           # 所有题目结构化汇总
    ├── tags.json                # 标签体系
    └── domains.json             # 面试知识域定义
```

> **说明**：`by-domain/` 是主库，存放所有题目实体；其他目录是**视图/索引**，只放精选题目和 ID 引用，避免重复维护。

---

## 三、面试知识域分类（55+ 个）

### 基础层（9 个）

| 编号 | 文件名 | 领域 | 目标题量 |
|------|--------|------|---------|
| 01 | `01-javascript.md` | JavaScript | 250-300 |
| 02 | `02-typescript.md` | TypeScript | 150-200 |
| 03 | `03-browser.md` | 浏览器原理 | 150-200 |
| 04 | `04-network.md` | 计算机网络 | 120-150 |
| 05 | `05-security.md` | Web 安全 | 100-120 |
| 06 | `06-html-css.md` | HTML / CSS | 120-150 |
| 07 | `07-a11y.md` | 可访问性 | 50-80 |
| 08 | `08-algorithms.md` | 数据结构与算法 | 150-200 |
| 09 | `09-design-patterns.md` | 设计模式 | 80-100 |

### 工程化层（15 个）

| 编号 | 文件名 | 领域 | 目标题量 |
|------|--------|------|---------|
| 10 | `10-build-tools.md` | 构建工具 | 100-120 |
| 11 | `11-monorepo.md` | Monorepo | 60-80 |
| 12 | `12-ci-cd.md` | CI/CD | 60-80 |
| 13 | `13-code-quality.md` | 代码质量与测试 | 80-100 |
| 14 | `14-design-system.md` | 设计体系与组件库 | 80-100 |
| 15 | `15-react.md` | React | 200-250 |
| 16 | `16-vue.md` | Vue | 150-200 |
| 17 | `17-cross-platform.md` | 跨端技术 | 100-120 |
| 18 | `18-ai-engineering.md` | AI 工程化 | 80-100 |
| 19 | `19-node-bff.md` | Node.js / BFF | 100-120 |
| 20 | `20-git-workflow.md` | Git 工作流 | 50-70 |
| 21 | `21-dx.md` | 开发者体验 | 40-60 |
| 22 | `22-deployment-sre.md` | 部署与 SRE | 60-80 |
| 23 | `23-package-supply-chain.md` | 包管理与供应链安全 | 60-80 |
| 24 | `24-frontend-operations.md` | 前端运维与监控 | 60-80 |

### 架构层（12 个）

| 编号 | 文件名 | 领域 | 目标题量 |
|------|--------|------|---------|
| 25 | `25-system-architecture.md` | 系统架构设计 | 120-150 |
| 26 | `26-micro-frontend.md` | 微前端 | 80-100 |
| 27 | `27-performance.md` | 性能工程 | 120-150 |
| 28 | `28-quality.md` | 质量保障 | 80-100 |
| 29 | `29-data-state.md` | 数据与状态管理 | 80-100 |
| 30 | `30-observability.md` | 可观测性 | 60-80 |
| 31 | `31-security-architecture.md` | 安全架构 | 60-80 |
| 32 | `32-real-time.md` | 实时与协同 | 60-80 |
| 33 | `33-internationalization.md` | 国际化 | 40-60 |
| 34 | `34-visualization-graphics.md` | 可视化与图形 | 80-100 |
| 35 | `35-serverless-edge.md` | Serverless / Edge | 60-80 |
| 36 | `36-data-engineering.md` | 前端数据工程 | 60-80 |

### 领导力与软技能层（8 个）

| 编号 | 文件名 | 领域 | 目标题量 |
|------|--------|------|---------|
| 37 | `37-business.md` | 业务洞察 | 40-60 |
| 38 | `38-team.md` | 团队领导力 | 60-80 |
| 39 | `39-strategy.md` | 技术战略 | 40-60 |
| 40 | `40-communication.md` | 沟通表达 | 40-60 |
| 41 | `41-project-management.md` | 项目管理 | 40-60 |
| 42 | `42-hiring.md` | 招聘与组织 | 40-60 |
| 43 | `43-tech-branding.md` | 技术品牌 | 30-50 |
| 44 | `44-tech-governance.md` | 技术治理 | 30-50 |

### 前端细分领域（8 个）

| 编号 | 文件名 | 领域 | 目标题量 |
|------|--------|------|---------|
| 45 | `45-mini-program.md` | 小程序 | 80-100 |
| 46 | `46-harmonyos.md` | 鸿蒙 ArkTS / HarmonyOS | 50-80 |
| 47 | `47-flutter.md` | Flutter | 60-80 |
| 48 | `48-electron.md` | Electron | 50-70 |
| 49 | `49-webassembly.md` | WebAssembly | 40-60 |
| 50 | `50-webgpu-graphics.md` | WebGPU / 图形学 | 40-60 |
| 51 | `51-multimedia.md` | 音视频前端 | 40-60 |
| 52 | `52-low-code.md` | 低代码 / 搭建 | 60-80 |

### 通用基础与职业层（3 个）

| 编号 | 文件名 | 领域 | 目标题量 |
|------|--------|------|---------|
| 53 | `53-computer-science.md` | 计算机基础（OS/DB/编译原理） | 80-100 |
| 54 | `54-behavioral.md` | 行为面试 | 60-80 |
| 55 | `55-resume-interview.md` | 简历与面试技巧 | 40-60 |
| 56 | `56-industry.md` | 行业特化（电商/金融/游戏/SaaS） | 60-80 |

---

## 四、题量目标

| 区域 | 目标题量 | 占比 |
|------|---------|------|
| 基础层 | 1200-1500 | ~35% |
| 工程化层 | 1000-1200 | ~28% |
| 架构层 | 800-1000 | ~22% |
| 领导力与软技能 | 300-400 | ~8% |
| 前端细分领域 | 400-600 | ~10% |
| 通用基础与职业 | 200-300 | ~6% |
| **总计** | **3000-5000** | **100%** |

> 注意：实际建设中允许一部分题目采用"精炼答案 + 延伸阅读"模式，优先保证高频题质量。

---

## 五、使用方式

### 5.1 学习者

1. 按岗位层级选择：`by-level/junior.md`、`by-level/senior.md` 等。
2. 按薄弱领域选择：`by-domain/01-javascript.md`。
3. 按题型突破：`by-type/05-system-design.md`。
4. 考前速记：`flashcards/js-core.md`。
5. 全真模拟：`mock-papers/` 下选择对应试卷。

### 5.2 面试官

1. 按岗位 JD 选 `by-level/` + `by-type/`。
2. 按轮次组卷：`by-round/02-technical-1.md`。
3. 按公司风格筛选：`by-company/big-tech.md`。

---

## 六、贡献规范

1. 所有新增题目必须遵循 `SCHEMA.md` 中的格式。
2. 每道题必须有**唯一 ID**：`FB-{domain}-{type}-{level}-{seq}`。
3. `by-domain/` 是主库，其他目录只放精选和引用。
4. 优先补充高频、高质量题目，不追求数量堆砌。
5. 新增领域需先在 `data/domains.json` 和本 README 中注册。

---

## 七、统计概览

> 本表格随建设进度更新。

| 指标 | 当前数量 | 目标数量 |
|------|---------|---------|
| 面试知识域 | 0 | 56 |
| 题目总数 | 0 | 3000-5000 |
| 模拟试卷 | 0 | 30+ |
| 快问快答 | 0 | 12+ |
| 覆盖岗位层级 | 0 | 4 |

---

## 八、近期建设路线

1. **第一阶段**：建立 `SCHEMA.md`、本 README、`index.json`、第一个示例领域 `01-javascript.md`。
2. **第二阶段**：填充基础层 9 个领域。
3. **第三阶段**：填充工程化层 15 个领域。
4. **第四阶段**：填充架构层 + 领导力层。
5. **第五阶段**：补充前端细分领域、通用基础、模拟试卷、快问快答。
6. **第六阶段**：网站集成与抽测工具升级。

---

> 本模块追求：**题目全面、分类清晰、答案可评分、使用场景明确**。
