# 代码质量练习册

## 一、选择题

### 1. ESLint 的主要作用是什么？

A. 压缩代码
B. 静态代码检查
C. 格式化代码
D. 打包代码

**答案：B**

**解析：** ESLint 是静态代码检查工具，用于发现代码中的潜在问题和不规范写法。

---

### 2. Prettier 的主要作用是什么？

A. 检查代码逻辑错误
B. 代码格式化
C. 运行测试
D. 管理 Git 提交

**答案：B**

**解析：** Prettier 是代码格式化工具，负责统一代码风格。

---

### 3. 下列哪个工具可以在 Git 提交前运行脚本？

A. ESLint
B. Prettier
C. Husky
D. Jest

**答案：C**

**解析：** Husky 用于管理 Git 钩子，可以在提交前、提交后等时机执行脚本。

---

### 4. lint-staged 的作用是什么？

A. 检查整个项目的代码
B. 只检查暂存区的代码
C. 自动生成测试
D. 修复所有 Bug

**答案：B**

**解析：** lint-staged 只对 `git add` 的文件运行检查，提高效率。

---

### 5. TDD 的核心循环是什么？

A. 红-绿-重构
B. 写代码-测试-部署
C. 设计-开发-测试
D. 红-黄-绿

**答案：A**

**解析：** TDD 遵循红（写失败测试）、绿（写通过代码）、重构的循环。

---

## 二、填空题

### 6. Jest 中用于判断两个值严格相等的断言是 ______。

**答案：toBe**

**解析：** `expect(value).toBe(expected)` 进行严格相等判断。

---

### 7. E2E 测试中常用的两个框架是 Cypress 和 ______。

**答案：Playwright**

**解析：** Cypress 和 Playwright 是当前最流行的 E2E 测试框架。

---

### 8. 规范的提交信息格式中，`feat` 表示 ______。

**答案：新功能**

**解析：** Conventional Commits 中，`feat` 表示新增功能。

---

### 9. 测试覆盖率中，衡量分支是否都被执行的指标是 ______ 覆盖率。

**答案：分支**

**解析：** 分支覆盖率（Branch Coverage）衡量代码中所有分支是否都被执行过。

---

### 10. BDD 的中文名称是 ______ 驱动开发。

**答案：行为**

**解析：** BDD（Behavior-Driven Development）即行为驱动开发。

---

## 三、代码分析题

### 11. 分析以下 ESLint 配置：

```javascript
module.exports = {
  env: { browser: true, es2021: true },
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'warn',
    'eqeqeq': 'error'
    }
};
```

**答案与解析：**

- `env` 声明运行环境为浏览器，支持 ES2021
- `extends` 继承 ESLint 推荐规则
- `no-console: 'warn'` 对 `console` 使用发出警告
- `eqeqeq: 'error'` 强制使用 `===`，使用 `==` 时报错

---

### 12. 分析以下测试代码：

```javascript
test('should filter active users', () => {
  const users = [
    { name: 'Tom', active: true },
    { name: 'Jerry', active: false }
  ];
  const result = users.filter(u => u.active);
  expect(result).toEqual([{ name: 'Tom', active: true }]);
});
```

**答案与解析：**

- 测试过滤出 active 为 true 的用户
- `toEqual` 用于深度比较对象数组
- 测试用例名称清晰描述了测试目的

---

### 13. 分析以下 Husky 配置：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx lint-staged
```

**答案与解析：**

- 这是一个 `pre-commit` 钩子脚本
- 提交前会执行 `npx lint-staged`
- lint-staged 只对暂存区文件运行 lint

---

## 四、编程实践题

### 14. 编写一个 Jest 测试用例，测试数组求和函数。

**答案：**

```javascript
// sum.js
export const sum = (arr) => arr.reduce((a, b) => a + b, 0);

// sum.test.js
import { sum } from './sum';

test('sums array of numbers', () => {
  expect(sum([1, 2, 3])).toBe(6);
});

test('returns 0 for empty array', () => {
  expect(sum([])).toBe(0);
});
```

**解析：**

- 测试正常数组求和
- 测试边界情况（空数组）
- 使用 `toBe` 进行严格相等判断

---

### 15. 配置 `.husky/pre-commit` 在提交前运行 lint 和测试。

**答案：**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run test
```

**解析：**

- 提交前自动运行 lint 和 test
- 任何失败都会阻止提交
- 也可以改用 lint-staged 提高效率

---

### 16. 编写一个 Playwright 测试，验证登录流程。

**答案：**

```javascript
import { test, expect } from '@playwright/test';

test('login successfully', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

**解析：**

- 打开登录页
- 填写用户名密码
- 点击提交
- 验证跳转到 dashboard

---

### 17. 编写一个 Vitest 的 Mock 示例。

**答案：**

```javascript
import { vi, test, expect } from 'vitest';
import { fetchUser } from './api';

vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: 'Tom' }))
}));

test('fetchUser returns mocked data', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Tom');
});
```

**解析：**

- 使用 `vi.mock` 模拟模块
- `fetchUser` 返回模拟数据
- 测试中验证返回结果

---

### 18. 配置 Prettier 使用单引号、2 空格缩进、行尾逗号。

**答案：**

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

**解析：**

- `singleQuote: true` 使用单引号
- `tabWidth: 2` 两个空格缩进
- `trailingComma: "es5"` 在 ES5 有效的地方添加尾逗号

---

### 19. 编写一个 Cypress 测试，验证搜索功能。

**答案：**

```javascript
describe('Search', () => {
  it('should search and display results', () => {
    cy.visit('/');
    cy.get('input[data-testid="search"]').type('React{enter}');
    cy.url().should('include', 'q=React');
    cy.get('[data-testid="result-item"]').should('have.length.at.least', 1);
  });
});
```

**解析：**

- 访问首页
- 在搜索框输入关键词并回车
- 验证 URL 包含搜索参数
- 验证结果列表至少有一项

---

### 20. 如何在 CI 中设置测试覆盖率阈值？

**答案：**

在 Jest 配置中：

```javascript
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

或在 package.json 中：

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

**解析：**

- 设置覆盖率阈值后，低于阈值时测试会失败
- 可以设置全局阈值，也可以针对特定目录设置
- 覆盖率阈值应该根据项目实际情况设定

---

> **领域编号**：E04 代码质量  
> **最后更新**：2026-06-18
