# 代码质量学习文档

---

## 核心要点（TL;DR）

- 代码质量是系统工程，需通过静态检查、自动化测试、Code Review 与 Git 规范在每个环节把关。
- ESLint 负责逻辑与风格问题，Prettier 负责格式，Husky + lint-staged 在提交前只检查暂存区，避免冲突。
- 测试金字塔指导资源分配：大量单元测试、适量集成测试、少量 E2E 覆盖核心路径。
- Conventional Commits 与 Commitizen 统一提交信息，支撑 changelog 与版本管理。
- 不要迷信覆盖率，应关注测试有效性、核心路径与边界条件，并通过质量门禁持续改进。

## 学习时长与前置知识

- **建议学习时长**：2-3 周（每周投入 6-8 小时）
- **前置知识**：TypeScript、工程化基础、单元测试概念

## 一、前言：为什么代码质量如此重要？

写代码就像写文章。一篇文章如果错别字连篇、逻辑混乱、段落不清，读者读起来会很痛苦。代码也是如此。低质量的代码会带来：

- 难以维护和扩展
- Bug 频出
- 新人上手困难
- 协作效率低下
- 技术债务越积越多

代码质量不是一朝一夕的事情，而是一整套工程实践。它包括静态检查、格式化、测试、代码评审、Git 工作流、提交规范等多个方面。本章将带你系统了解如何打造高质量的代码。

## 二、ESLint / Prettier / Husky / lint-staged

### 2.1 ESLint：代码的"语法老师"

ESLint 是 JavaScript/TypeScript 最常用的静态代码检查工具。它会检查代码中的潜在问题，如未使用变量、类型错误、不符合规范的写法等。

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'eqeqeq': 'error'
  }
};
```

ESLint 的价值：

- 在编码阶段发现错误
- 统一团队代码风格
- 避免常见的 JavaScript 陷阱

### 2.2 Prettier：代码的"美容师"

Prettier 是代码格式化工具。与 ESLint 不同，Prettier 不关心代码逻辑，只关心代码外观（缩进、换行、引号等）。

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### 2.3 ESLint 与 Prettier 的关系

两者容易冲突。推荐方案：

- ESLint 负责代码质量和风格规则
- Prettier 负责纯格式化
- 使用 `eslint-config-prettier` 关闭与 Prettier 冲突的 ESLint 规则

### 2.4 Husky：Git 钩子的"管家"

Husky 可以在 Git 钩子（如 pre-commit、commit-msg）中执行脚本。最常见的用法是在提交前运行代码检查。

```bash
npx husky-init && npm install
```

```bash
# .husky/pre-commit
npm run lint
```

### 2.5 lint-staged：只检查暂存区

`lint-staged` 配合 Husky 使用，只对 `git add` 的文件运行检查，避免每次提交都检查整个项目。

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

生活化比喻：ESLint 是老师检查作业对错，Prettier 是誊写员整理字迹，Husky 是门口的安检，lint-staged 是只检查你当天带的包。

## 三、单元测试：Jest 与 Vitest

### 3.1 为什么需要单元测试？

单元测试是对代码最小单元的验证。它能：

- 保证核心逻辑正确
- 方便重构，改完代码敢跑测试
- 作为代码的使用文档

### 3.2 Jest

Jest 是 Facebook 开源的测试框架，功能全面，配置简单。

```javascript
// sum.js
export const sum = (a, b) => a + b;

// sum.test.js
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

常用断言：

- `toBe`：严格相等
- `toEqual`：深度相等
- `toBeTruthy` / `toBeFalsy`
- `toContain`
- `toThrow`

### 3.3 Vitest

Vitest 是 Vite 生态的测试框架，语法与 Jest 高度兼容，但速度更快，原生支持 ESM 和 TypeScript。

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
```

### 3.4 Mock

Mock 是测试中的重要概念。它用假的对象替代真实的依赖，避免测试受到外部系统影响。

```javascript
import { vi } from 'vitest';

const fetchUser = vi.fn(() => Promise.resolve({ name: 'Tom' }));
```

## 四、E2E 测试：Cypress 与 Playwright

### 4.1 什么是 E2E 测试？

E2E（End-to-End）测试模拟真实用户从打开页面到完成操作的完整流程。它最接近真实场景，但执行速度较慢。

### 4.2 Cypress

Cypress 是老牌 E2E 测试工具，以调试体验好著称。

```javascript
describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

### 4.3 Playwright

Playwright 是微软开源的 E2E 测试工具，支持多浏览器（Chromium、Firefox、WebKit）、多语言、并行执行。

```javascript
import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

### 4.4 选择建议

- Cypress：调试体验好，社区成熟
- Playwright：速度快，多浏览器支持好，现代化

## 五、测试覆盖率

测试覆盖率衡量代码被测试覆盖的程度。常见指标：

- **行覆盖率（Line Coverage）**
- **分支覆盖率（Branch Coverage）**
- **函数覆盖率（Function Coverage）**
- **语句覆盖率（Statement Coverage）**

```bash
npm run test -- --coverage
```

注意：覆盖率不是越高越好。100% 覆盖率不等于没有 Bug。关键是覆盖核心逻辑和边界情况。

## 六、代码评审规范

### 6.1 Code Review 的价值

- 发现潜在问题
- 传播知识和最佳实践
- 统一代码风格
- 避免个人单点故障

### 6.2 Review  checklist

- 功能是否正确
- 是否有明显的性能问题
- 是否有安全风险
- 是否好懂、好维护
- 是否有对应的测试
- 命名是否清晰

### 6.3 Review 心态

- 对代码不对人
- 提出建议而非命令
- 及时响应，不要拖延

## 七、Git 工作流

### 7.1 Git Flow

Git Flow 是一种经典分支模型：

- `main`：稳定分支
- `develop`：开发分支
- `feature/*`：功能分支
- `release/*`：发布分支
- `hotfix/*`：热修复分支

### 7.2 GitHub Flow / GitLab Flow

更轻量的分支模型：

- 主分支随时可部署
- 新功能从主分支切出 feature 分支
- 通过 Pull Request / Merge Request 合并

### 7.3 选择合适的模型

- 小型团队：GitHub Flow
- 需要版本发布：Git Flow
- 持续交付：GitLab Flow

## 八、Commit 规范

### 8.1 Conventional Commits

规范的提交信息便于生成 changelog 和版本号。

```
<type>(<scope>): <subject>

<body>

<footer>
```

常见 type：

- `feat`：新功能
- `fix`：修复
- `docs`：文档
- `style`：格式
- `refactor`：重构
- `test`：测试
- `chore`：构建/工具

示例：

```
feat(auth): add login with WeChat
```

### 8.2 Commitizen

Commitizen 是辅助生成规范提交信息的工具。

```bash
npx cz
```

## 九、TDD 与 BDD

### 9.1 TDD（测试驱动开发）

TDD 的核心是"先写测试，再写代码"，遵循红-绿-重构循环：

1. 写一个会失败的测试（红）
2. 写最少代码让测试通过（绿）
3. 重构代码保持测试通过

### 9.2 BDD（行为驱动开发）

BDD 更关注业务行为，常用自然语言描述测试场景。

```gherkin
Feature: User login
  Scenario: Login with valid credentials
    Given the user is on the login page
    When the user enters valid credentials
    Then the user should be redirected to dashboard
```

## 十、常见误区与最佳实践

### 误区一：测试是测试团队的事

前端代码的单元测试和 E2E 测试应该由前端工程师负责。

### 误区二：追求 100% 覆盖率

覆盖率只是参考，更重要的是测试用例的质量。

### 误区三：Code Review 流于形式

Review 要真正发现问题，而不是简单地点个赞。

### 最佳实践

1. 提交前自动运行 lint 和测试
2. CI 中设置测试门禁
3. 使用 Conventional Commits
4. 核心模块优先写单元测试
5. 关键用户路径必须有 E2E 测试
6. 定期回顾和更新测试用例

## 十一、总结

代码质量是团队协作的基石。通过 ESLint、Prettier、Husky、lint-staged 把好代码风格关，通过 Jest/Vitest、Cypress/Playwright 把好功能正确性关，通过 Code Review、Git 工作流、Commit 规范把好协作流程关，才能构建出高质量、可维护的前端项目。

## 十二、前端测试策略

### 12.1 测试分层

前端测试通常分为三层：

**单元测试**：测试函数、组件的最小单元。特点是快速、独立、定位准确。

**集成测试**：测试多个模块协同工作。比如表单组件与验证逻辑的组合。

**E2E 测试**：模拟真实用户操作，验证完整业务流程。

### 12.2 组件测试

对于 React/Vue 组件，可以使用 React Testing Library 或 Vue Test Utils：

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter', () => {
  render(<Counter />);
  fireEvent.click(screen.getByText('Increase'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 12.3 快照测试

快照测试可以捕获组件的渲染结果，用于检测意外变更。但不要滥用，因为快照容易失效。

## 十三、代码评审文化

### 13.1 建立 Review 规范

- 每个 PR 至少需要一个人 Review
- Reviewer 应该理解改动的背景和目的
- 提交者要积极回应评论

### 13.2 Review 的技巧

- 先看测试：改动是否有测试覆盖
- 再看设计：实现是否符合项目架构
- 最后看细节：命名、注释、边界处理

### 13.3 处理分歧

当 Review 出现分歧时，应该：

- 基于代码质量和项目规范讨论
- 必要时引入第三方仲裁
- 把共识沉淀为团队规范

## 十四、Git 提交规范进阶

### 14.1 Commit Message 结构

```
<type>(<scope>): <subject>

<body>

<footer>
```

好的提交信息应该：

- 描述清楚做了什么、为什么做
- 一行不超过 72 个字符
- 使用祈使句，如 "Add" 而不是 "Added"

### 14.2 Commitizen 与 Husky 配合

```json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

## 十五、技术债务管理

### 15.1 什么是技术债务？

技术债务是为了快速交付而做出的技术妥协。短期看加快了速度，长期看会增加维护成本。

### 15.2 如何管理技术债务？

- 定期重构：预留时间偿还债务
- 记录 TODO：用 issue 或注释标记
- 避免完美主义：不是所有债务都需要立即偿还
- 量化影响：评估债务对开发效率和稳定性的影响

## 十六、总结

代码质量是一个系统工程。它不是靠某一个人或某一个工具就能解决的，而是需要团队形成共识，建立规范，使用合适的工具，持续改进。通过 ESLint、Prettier、测试、Code Review、Git 工作流等手段，我们可以把代码质量牢牢把控在每一个环节。

## 十七、ESLint 规则定制

### 17.1 自定义规则

团队可以根据项目特点编写自定义 ESLint 规则。

```javascript
// rules/no-console-in-prod.js
module.exports = {
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.object?.name === 'console') {
          context.report({ node, message: '生产环境避免使用 console' });
        }
      }
    };
  }
};
```

### 17.2 规则分级

- `off`：关闭
- `warn`：警告
- `error`：错误，会阻断 CI

## 十八、Prettier 与编辑器集成

### 18.1 保存时自动格式化

在 VS Code 中配置 `editor.formatOnSave` 和 `editor.defaultFormatter`，可以在保存时自动调用 Prettier。

### 18.2 忽略文件

`.prettierignore` 文件可以指定不需要格式化的文件或目录。

```
node_modules
dist
coverage
```

## 十九、测试中的最佳实践

### 19.1 测试数据管理

避免测试之间共享状态。每个测试用例应该独立准备数据、执行断言、清理环境。

### 19.2 Mock 外部依赖

单元测试应该隔离外部依赖，如网络请求、定时器、随机数等。

```javascript
vi.useFakeTimers();
vi.spyOn(global, 'fetch').mockResolvedValue({ json: () => ({}) });
```

### 19.3 测试即文档

好的测试用例可以说明代码的预期行为。测试名称应该清晰描述场景。

## 二十、代码质量度量

### 20.1 常用指标

- 测试覆盖率
- 代码重复率
- 圈复杂度
- 技术债务率

### 20.2 不要迷信指标

指标是参考，不是目标。高覆盖率不代表高质量，低复杂度也不代表好设计。

## 二十一、构建质量门禁

### 21.1 CI 中的门禁

在 CI 流水线中设置门禁：

- Lint 必须通过
- 单元测试必须通过
- 覆盖率不能低于阈值
- 构建不能失败

### 21.2 预提交检查

通过 Husky 和 lint-staged 在提交前自动检查暂存区文件。

## 二十二、总结

代码质量是一个持续改进的过程。通过 ESLint、Prettier、测试、Code Review、Git 规范等手段，我们可以在开发的每一个环节把好质量关。最终目标是让代码易于理解、易于维护、易于扩展，让团队能够高效协作，持续交付高质量的产品。

## 二十三、Playwright 进阶

### 23.1 多浏览器测试

Playwright 原生支持 Chromium、Firefox、WebKit，可以在配置中指定多个浏览器。

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
```

### 23.2 截图与录屏

Playwright 可以在测试失败时自动截图和录屏，便于排查问题。

```javascript
test('example', async ({ page }, testInfo) => {
  await page.goto('https://example.com');
  await testInfo.attach('screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png'
  });
});
```

## 二十四、Cypress 的特点

### 24.1 实时重载

Cypress 测试运行时可以看到应用实时状态，调试体验非常好。

### 24.2 网络请求控制

Cypress 可以方便地 Mock 网络请求。

```javascript
cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');
```

### 24.3 与 Playwright 的对比

Cypress 更适合调试和小型项目，Playwright 更适合大规模、多浏览器、并行测试场景。

## 二十五、前端性能测试

### 25.1 Lighthouse CI

Lighthouse CI 可以把性能评分纳入 CI 流程。

```yaml
- name: Audit URLs using Lighthouse
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: 'https://example.com'
```

### 25.2 性能预算

为项目设置性能预算，如首屏加载时间、JS 体积等，超出预算时 CI 失败。

## 二十六、代码质量的持续改进

### 26.1 定期回顾

团队应该定期回顾代码质量实践，讨论遇到的问题和改进方案。

### 26.2 知识分享

通过技术分享、文档、Code Review 等方式传播代码质量意识。

### 26.3 工具升级

及时升级 ESLint、测试框架等工具，利用新特性提升效率和准确性。

## 二十七、总结

代码质量不是终点，而是一个持续追求的目标。通过 ESLint、Prettier、测试、Code Review、Git 规范等手段，我们可以在日常开发中不断打磨代码质量。最终目标是建立一种团队文化：每个人都关心代码质量，每个人都为高质量代码负责。

## 二十八、前端安全测试

### 28.1 XSS 防护

前端代码要注意防范 XSS 攻击：

- 不要直接拼接 HTML
- 对用户输入进行转义
- 使用 Content Security Policy
- 避免使用 `dangerouslySetInnerHTML` 等危险 API

### 28.2 CSRF 防护

- 使用 SameSite Cookie
- 添加 CSRF Token
- 验证 Referer/Origin

### 28.3 依赖安全

使用 `npm audit` 或 Snyk 定期检查依赖漏洞，及时升级有问题的包。

## 二十九、代码质量工具链整合

### 29.1 一体化配置

建议在项目初始化时就配置好完整的质量工具链：

- ESLint：代码检查
- Prettier：代码格式化
- Husky：Git 钩子
- lint-staged：暂存区检查
- Jest/Vitest：单元测试
- Cypress/Playwright：E2E 测试

### 29.2 脚手架模板

团队可以维护一套项目脚手架模板，新项目的质量工具链一键生成。

## 三十、代码评审中的软技能

### 30.1 如何提出建设性意见

- 解释为什么这样改更好
- 提供具体示例
- 区分必要修改和可选建议

### 30.2 如何接受反馈

- 保持开放心态
- 不要急于辩护
- 把反馈当作学习机会

## 三十一、度量与改进

### 31.1 质量指标

- 缺陷密度
- 测试覆盖率
- Code Review 平均时间
- 技术债务比例

### 31.2 持续改进

定期回顾指标，识别薄弱环节，制定改进计划。代码质量提升是一个持续的过程。

## 三十二、总结

代码质量是软件工程永恒的话题。通过合理的工具配置、严格的流程规范和积极的团队文化，我们可以在日常开发中不断提升代码质量。高质量的代码不仅能够减少 Bug、提高开发效率，更能让团队成员在维护和扩展时感到愉悦。这是每一位前端工程师都应该追求的目标。

---

> **领域编号**：E04 代码质量与测试体系  
> **最后更新**：2026-06-18


---

## 本领域学习进度

<MarkComplete domainId="code-quality" />
<ProgressTracker />
