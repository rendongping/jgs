# 质量保障 面试题

> 本题库共收录 **88** 道面试题（基础 10 / 进阶 33 / 深入 28 / 架构 17）。
> 本文件收录质量保障相关面试题，目标题量 100 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、性能优化题、工程化题、软技能题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-28-CO-B-001：什么是测试金字塔？前端如何应用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障
**标签**：测试策略、测试金字塔、单元测试、集成测试、E2E
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释测试金字塔（Test Pyramid）的含义，并说明前端项目中单元测试、集成测试、E2E 测试的占比与职责。

**参考答案**：

**核心要点**：测试金字塔强调测试应分层，越靠近底层的测试数量越多、运行越快、成本越低，越靠近顶层的测试数量越少但业务信心越高。

**详细解释**：

| 层级 | 测试类型 | 关注点 | 运行速度 | 维护成本 | 推荐占比 |
|------|----------|--------|----------|----------|----------|
| 底层 | 单元测试 | 函数、组件、Hook、工具类 | 毫秒级 | 低 | 60%-70% |
| 中层 | 集成测试 | 模块协作、API + UI、数据流 | 秒级 | 中 | 20%-30% |
| 顶层 | E2E 测试 | 真实用户路径、关键业务流程 | 分钟级 | 高 | 5%-10% |

前端应用示例：

```js
// 单元测试：纯函数
export const calcTotal = (items) => items.reduce((s, i) => s + i.price * i.qty, 0);

test('calcTotal sums items', () => {
  expect(calcTotal([{ price: 10, qty: 2 }, { price: 5, qty: 1 }])).toBe(25);
});

// E2E：核心用户路径
test('user completes checkout', async ({ page }) => {
  await page.goto('/checkout');
  await page.fill('[name="card"]', '4111111111111111');
  await page.click('text=Pay');
  await expect(page.locator('text=Order confirmed')).toBeVisible();
});
```

**最佳实践**：
- 尽量把缺陷拦截在单元层，避免把简单逻辑留到 E2E 验证。
- E2E 优先覆盖登录、支付、核心工作流等不可逆路径。
- 各层之间职责清晰，避免用 E2E 代替单元测试。

**评分维度**：
- 概念准确性（40%）：能说明分层结构与成本/信心关系
- 前端占比建议（30%）：给出合理比例并解释原因
- 举例能力（30%）：能用代码或场景说明各层职责

**常见错误**：
- 把 E2E 比例放得过大，导致流水线缓慢、抖动严重。
- 认为测试金字塔只适用于后端。
- 混淆集成测试和 E2E 的边界。

**延伸追问**：
- 如果团队 E2E 占比已经超过 50%，你会怎么治理？
- 什么时候测试金字塔之外还需要契约测试、视觉回归测试？

**相关题目**：
- [FB-28-CO-B-002 单元测试、集成测试、E2E 的区别](#FB-28-CO-B-002)
- [FB-28-SD-R-025 设计前端质量保障体系](#FB-28-SD-R-025)

**参考资源**：
- [Martin Fowler - TestPyramid](https://martinfowler.com/bliki/TestPyramid.html)
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)

**口头回答版**：
> 测试金字塔就是测试要分层，底层单元测试写得最多、跑得最快、成本最低；中间集成测试看模块之间能不能配合；最上面 E2E 只覆盖最关键的用户流程，因为它最慢、最难维护。前端我一般建议单元测试占六七成，集成测试二三十，E2E 占个 5% 到 10%。这样能以最小成本获得最大业务信心。

---

### FB-28-CO-B-002：单元测试、集成测试、E2E 测试有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障
**标签**：测试策略、单元测试、集成测试、E2E、自动化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比单元测试、集成测试、E2E 测试的测试对象、依赖范围、运行速度和适用场景。

**参考答案**：

**核心要点**：三者的本质区别在于“隔离范围”——单元测试隔离外部依赖，集成测试验证协作，E2E 在真实环境中模拟用户。

**详细解释**：

| 维度 | 单元测试 | 集成测试 | E2E 测试 |
|------|----------|----------|----------|
| 测试对象 | 函数、类、组件、Hook | 多个模块 + 真实/模拟依赖 | 完整应用 + 真实浏览器/后端 |
| 依赖处理 | 全面 Mock | 部分 Mock（如数据库、API） | 尽量真实 |
| 运行速度 | 极快（毫秒） | 较快（秒级） | 较慢（分钟级） |
| 定位能力 | 精确到函数/行 | 定位到模块交互 | 定位到用户路径 |
| 维护成本 | 低 | 中 | 高 |
| 代表工具 | Jest、Vitest | React Testing Library + MSW | Cypress、Playwright |

示例：

```js
// 单元测试：只测排序逻辑
function sortByPrice(items) { return [...items].sort((a, b) => a.price - b.price); }

test('sortByPrice', () => {
  expect(sortByPrice([{ price: 3 }, { price: 1 }])).toEqual([{ price: 1 }, { price: 3 }]);
});

// 集成测试：组件 + API Mock
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import ProductList from './ProductList';

test('renders products from API', async () => {
  server.use(rest.get('/api/products', (req, res, ctx) => res(ctx.json([{ name: 'Book' }]))));
  render(<ProductList />);
  await waitFor(() => expect(screen.getByText('Book')).toBeInTheDocument());
});

// E2E：真实浏览器操作
test('add to cart', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="add-1"]');
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
});
```

**最佳实践**：
- 单元测试覆盖核心算法、状态转换、边界条件。
- 集成测试覆盖组件与 API/Store 的协作。
- E2E 覆盖主流程，避免测试所有分支。

**评分维度**：
- 隔离范围理解（40%）：能否从依赖、环境角度区分
- 工具与示例（30%）：能举出前端常用工具并给出示例
- 场景选择（30%）：能说明不同 bug 适合在哪一层捕获

**常见错误**：
- 认为单元测试必须 100% 无依赖（适度使用 Mock 工具是正常的）。
- 把组件测试当作 E2E，导致加载真实后端。
- 在 E2E 中验证大量边界条件。

**延伸追问**：
- 组件测试属于单元测试还是集成测试？
- 测试一个 Redux + React 组件，应该在哪一层做？

**相关题目**：
- [FB-28-CO-B-001 测试金字塔](#FB-28-CO-B-001)
- [FB-28-CD-A-016 手写测试数据工厂](#FB-28-CD-A-016)

**参考资源**：
- [Kent C. Dodds - Static vs Unit vs Integration vs E2E](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests)
- [Google Testing Blog - Test Sizes](https://testing.googleblog.com/2010/12/test-sizes.html)

**口头回答版**：
> 单元测试只测最小单元，比如一个函数或组件，所有外部依赖都 Mock，跑得非常快；集成测试看多个模块能不能一起工作，比如组件调 API，但 API 可以用 MSW 这类工具 Mock；E2E 是在真实浏览器里模拟用户点击，覆盖最完整但也最慢、最难维护。选型看你要验证什么：算法逻辑放单元，模块协作放集成，用户流程放 E2E。

---

### FB-28-CO-B-003：Jest 与 Vitest 有什么核心区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障
**标签**：Jest、Vitest、测试框架、Vite、工程化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 Jest 和 Vitest 的核心差异，并说明在什么场景下会优先选择 Vitest。

**参考答案**：

**核心要点**：Jest 是生态最成熟的测试框架；Vitest 是基于 Vite 的现代化替代方案，配置更简洁、运行更快、对 ESM/TypeScript 更友好。

**详细解释**：

| 维度 | Jest | Vitest |
|------|------|--------|
| 构建工具 | 自研 transformer，依赖 Babel | 复用 Vite 的 transform  pipeline |
| 配置复杂度 | 需单独配置 Babel/SWC/ts-jest | 与 Vite 共用配置，开箱即用 |
| ESM 支持 | 历史包袱，需 experimental 配置 | 原生 ESM 支持 |
| TypeScript | 通常需要 ts-jest 或 @swc/jest | 原生支持 |
| 运行速度 | 快，但启动和 transform 有开销 | 基于 Vite 的按需编译，热更新快 |
| 兼容性 | API 与 Vitest 高度兼容 | 兼容 Jest API，迁移成本低 |
| 生态 | 插件、Preset 丰富 | 快速追赶中 |

示例：Vitest 配置

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: { lines: 80, functions: 80 },
    },
  },
});
```

**最佳实践**：
- 项目已使用 Vite 时优先 Vitest，可减少一套 transform 配置。
- 已有大型 Jest 项目且无迁移收益时可保持 Jest。
- 需要 snapshot、mock 能力时两者差异不大。

**评分维度**：
- 架构差异理解（40%）：能说出 Vitest 复用 Vite transformer
- 场景判断（30%）：能根据项目技术栈给出选型建议
- 配置/示例（30%）：能写出基础配置或迁移要点

**常见错误**：
- 认为 Vitest 完全替代 Jest 的所有生态。
- 忽略 Jest 在大型存量项目中的稳定性优势。
- 在 CommonJS 项目中盲目选择 Vitest。

**延伸追问**：
- Vitest 的 `vi` 与 Jest 的 `jest` 全局对象有什么区别？
- 如果要把 Jest 迁移到 Vitest，主要改哪些文件？

**相关题目**：
- [FB-28-CO-A-009 前端测试框架选型](#FB-28-CO-A-009)
- [FB-28-CO-B-004 好的单元测试特征](#FB-28-CO-B-004)

**参考资源**：
- [Vitest 官方文档](https://vitest.dev/)
- [Jest 官方文档](https://jestjs.io/)

**口头回答版**：
> Jest 是老牌的测试框架，生态最成熟；Vitest 是后来基于 Vite 做的，最大的好处是和 Vite 共用 transform 配置，对 ESM 和 TypeScript 支持更自然，启动和热更新也更快。如果项目已经用 Vite，我一般会优先选 Vitest；如果是大型存量 Jest 项目，迁移收益不明显就可以继续用 Jest。两者 API 很接近，迁移成本不高。

---

### FB-28-CO-B-004：好的单元测试应具备哪些特征？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障
**标签**：单元测试、FIRST、AAA、可测试性、测试质量
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明高质量单元测试应具备的特征，常用 FIRST 原则和 AAA 模式分别指什么？

**参考答案**：

**核心要点**：好的单元测试应快速、独立、可重复、自验证、及时，并通过 Arrange-Act-Assert 结构保持可读性。

**详细解释**：

FIRST 原则：

- **F**ast（快速）：单元测试应在毫秒级完成，避免网络、文件、真实数据库。
- **I**ndependent（独立）：测试之间不共享状态，可任意顺序执行。
- **R**epeatable（可重复）：任何环境、任何时间运行结果一致。
- **S**elf-validating（自验证）：通过断言自动判定成功/失败，不需要人工查看日志。
- **T**imely（及时）：与生产代码同步编写，最好在功能开发时或之前完成。

AAA 模式：

```js
test('discount applies for VIP', () => {
  // Arrange
  const user = { level: 'vip' };
  const cart = { total: 100 };

  // Act
  const result = applyDiscount(cart, user);

  // Assert
  expect(result.finalTotal).toBe(90);
});
```

其他特征：
- 单一职责：一个测试只验证一个概念。
- 可读性强：命名能描述行为而非实现。
- 可维护：避免过度依赖内部实现细节。

**最佳实践**：
- 使用 `test('should...')` 或 `test('given...when...then...')` 命名。
- 避免一个测试里连续多个不相关的断言。
- Mock 稳定的外部边界，不 Mock 被测单元内部细节。

**评分维度**：
- FIRST 解释（40%）：能准确说出五项含义
- AAA 示例（30%）：能写出符合 AAA 的测试
- 命名与可维护性（30%）：能说明命名规范和避免过度 Mock

**常见错误**：
- 测试中依赖全局状态或测试执行顺序。
- 一个测试断言过多，失败时难以定位。
- 为了覆盖率写无意义的测试。

**延伸追问**：
- 什么是“测试异味”（test smell）？能举几个例子吗？
- 如何测试私有函数？

**相关题目**：
- [FB-28-CO-A-014 TDD 与 BDD](#FB-28-CO-A-014)
- [FB-28-CO-P-018 测试覆盖率的陷阱](#FB-28-CO-P-018)

**参考资源**：
- [FIRST Unit Tests](https://agileinaflash.blogspot.com/2009/02/first.html)
- [Arrange-Act-Assert](https://xp123.com/articles/3a-arrange-act-assert/)

**口头回答版**：
> 好单元测试我一般用 FIRST 原则来记：Fast 要快，Independent 互相独立，Repeatable 在哪跑结果都一样，Self-validating 自动断言通过还是失败，Timely 要及时写。另外结构上用 AAA：Arrange 准备数据，Act 执行动作，Assert 断言结果。命名要说清楚行为，比如 “VIP 用户应享受 9 折”，而不是 “test1”。还要注意不要测私有实现细节，避免测试一重构就挂。

---
### FB-28-CO-B-005：代码评审应该关注哪些方面？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障
**标签**：代码评审、静态分析、质量门禁、团队协作
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明一次有效的代码评审应关注哪些维度，除了代码正确性还应检查什么？

**参考答案**：

**核心要点**：代码评审不仅是找 bug，更是保障可维护性、一致性、安全性和知识传递的过程。

**详细解释**：

代码评审常见维度：

| 维度 | 检查点 |
|------|--------|
| 正确性 | 功能是否满足需求、边界条件是否处理、是否有明显逻辑错误 |
| 可测试性 | 函数是否可独立测试、依赖是否可注入、是否有隐藏状态 |
| 可读性 | 命名是否清晰、函数是否过长、注释是否必要且准确 |
| 可维护性 | 是否遵循单一职责、重复代码、圈复杂度、硬编码 |
| 性能 | 是否有明显低效算法、重复渲染、不必要请求 |
| 安全性 | 是否有 XSS、CSRF、敏感信息泄露、不安全的 DOM 操作 |
| 一致性 | 是否遵循项目规范、设计模式、编码风格 |
| 工程化 | 是否包含对应测试、是否更新文档、是否引入新的依赖风险 |

Checklist 示例：

```markdown
- [ ] 需求理解正确，边界条件覆盖
- [ ] 单元测试/集成测试已补充并通过
- [ ] 无 console.log、debugger 等调试代码
- [ ] 无敏感信息硬编码
- [ ] ESLint / TypeScript 无新增错误
- [ ] 命名和注释清晰
- [ ] 大变更已同步文档或 ADR
```

**最佳实践**：
- 小批量提交，单次 MR/PR 控制在 400 行以内。
- 使用自动化工具处理风格问题，评审聚焦设计与逻辑。
- 保持建设性语气，说明“为什么”而不是只给结论。

**评分维度**：
- 维度完整性（40%）：能列出 5 个以上评审维度
- 优先级判断（30%）：能区分自动化可解决与必须人工判断的部分
- 团队协作意识（30%）：能体现知识共享和建设性反馈

**常见错误**：
- 只关注代码风格，忽略设计和安全。
- 在评审中人身攻击或只写“改一下”。
- 对大型 MR 一次性通过，导致问题遗漏。

**延伸追问**：
- 如果作者坚持不改某个建议，你会怎么处理？
- 代码评审和静态分析工具如何分工？

**相关题目**：
- [FB-28-CO-B-006 ESLint 与 Prettier 的区别](#FB-28-CO-B-006)
- [FB-28-SS-P-017 处理代码评审分歧](#FB-28-SS-P-017)

**参考资源**：
- [Google Code Review Developer Guide](https://google.github.io/eng-practices/review/)
- [Mozilla Code Review Checklist](https://mozilla.github.io/firefox-browser-architecture/experiments/code-review-checklist.html)

**口头回答版**：
> 代码评审不只是看有没有 bug，我会从几个维度看：功能对不对、有没有边界条件、代码可不可读、是不是单一职责、有没有安全隐患、性能有没有明显问题、测试和文档有没有跟上。另外，风格问题交给 ESLint、Prettier 自动化，评审时重点看设计和逻辑。评审语气要建设性，说明为什么建议改，而不只是下命令。

---

### FB-28-CO-B-006：ESLint 与 Prettier 的定位有什么不同？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障
**标签**：ESLint、Prettier、静态分析、代码风格
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请对比 ESLint 和 Prettier 在前端项目中的定位，并说明如何避免它们冲突。

**参考答案**：

**核心要点**：ESLint 负责代码质量和潜在错误规则；Prettier 负责代码格式化。两者职责应分离，避免规则重叠。

**详细解释**：

| 维度 | ESLint | Prettier |
|------|--------|----------|
| 核心目标 | 发现错误、保证代码质量、统一规范 | 自动格式化代码风格 |
| 规则类型 | 可配置、可自定义、可写插件 | 配置项有限，强调“无争议” |
| 是否可修复 | 部分可自动修复（--fix） | 全部可自动格式化 |
| 典型规则 | no-unused-vars、eqeqeq、react-hooks/exhaustive-deps | printWidth、singleQuote、trailingComma |
| 运行时机 | CI 门禁、IDE 保存 | 保存/提交前格式化 |

避免冲突的方式：

```js
// eslint-config-prettier 关闭与 Prettier 冲突的 ESLint 规则
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // 放在最后，覆盖冲突规则
  ],
  rules: {
    // 项目自定义质量规则
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**最佳实践**：
- 不要靠 ESLint 做格式化，让 Prettier 专注于格式。
- 提交前使用 `lint-staged` 先跑 Prettier 再跑 ESLint。
- CI 中同时校验 ESLint 和 Prettier，防止格式化遗漏。

**评分维度**：
- 职责区分（50%）：能准确区分质量规则与格式化规则
- 冲突解决（30%）：能说出 eslint-config-prettier 或类似方案
- 工程化落地（20%）：能提到 lint-staged、CI 门禁

**常见错误**：
- 用 ESLint 规则控制换行、引号等格式细节。
- 同时开启 ESLint 格式规则和 Prettier 导致反复报错。
- 忽略 Prettier 在 CI 中的校验。

**延伸追问**：
- 如果团队有人关闭了 Prettier 自动格式化，CI 如何兜底？
- Stylelint 与 ESLint/Prettier 之间如何分工？

**相关题目**：
- [FB-28-CO-B-007 TypeScript 如何提升代码质量](#FB-28-CO-B-007)
- [FB-28-EN-P-024 质量门禁设计](#FB-28-EN-P-024)

**参考资源**：
- [Prettier - Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

**口头回答版**：
> ESLint 是查代码质量的，比如有没有未使用变量、是不是用了 ==、hooks 依赖对不对；Prettier 是专门格式化代码风格的，比如换行、引号、尾逗号。它们会冲突，所以一般让 eslint-config-prettier 关闭 ESLint 里和格式相关的规则，先跑 Prettier 再跑 ESLint，CI 两门都卡。

---

### FB-28-CO-B-007：TypeScript 如何提升前端代码质量？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障、02 TypeScript
**标签**：TypeScript、静态类型、可维护性、工程化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 TypeScript 在前端质量保障中的价值，以及如何通过配置增强项目质量。

**参考答案**：

**核心要点**：TypeScript 通过静态类型在编译期捕获错误、提升 IDE 体验、约束接口契约，是前端最重要的静态分析手段之一。

**详细解释**：

质量提升点：

1. **编译期发现错误**：空值、类型不匹配、属性拼写错误在运行前暴露。
2. **自描述接口**：函数签名、组件 Props 即文档，降低协作成本。
3. **重构安全**：重命名、改结构时编译器可提示所有影响点。
4. **约束外部契约**：API 返回类型与前端消费类型一致，配合契约测试效果更佳。
5. **IDE 体验**：自动补全、跳转定义、内联文档减少低级错误。

示例：

```ts
// 编译期即可捕获字段缺失
interface User {
  id: number;
  name: string;
  email: string;
}

function greet(user: User) {
  return `Hello, ${user.name}`;
}

greet({ id: 1, name: 'Tom' }); // Error: Property 'email' is missing
```

推荐配置：

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**最佳实践**：
- 新项目直接开启 `strict`；老项目可逐步开启 strict flags。
- 关键 API 返回类型与后端共享或生成（OpenAPI → TypeScript）。
- 不要把 `any` 当作通用类型，建立禁用规则。

**评分维度**：
- 类型价值理解（40%）：能说明编译期发现错误、重构安全、接口契约
- 配置实践（30%）：能列出 strict 相关关键选项
- 工程化结合（30%）：能提到与 API 契约、ESLint any 规则结合

**常见错误**：
- 认为 TypeScript 只在 IDE 里有用，CI 不校验。
- 过度使用 `any` 导致类型系统失效。
- 类型定义与实际运行数据结构不一致。

**延伸追问**：
- strict 模式对团队接入成本有什么影响？
- 如何保证 TS 类型和运行时数据一致？

**相关题目**：
- [FB-28-CO-A-013 可测试性设计](#FB-28-CO-A-013)
- [FB-28-CA-P-020 ESLint 配置分析](#FB-28-CA-P-020)

**参考资源**：
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [Total TypeScript - Zod for Runtime Validation](https://www.totaltypescript.com/tutorials/zod)

**口头回答版**：
> TypeScript 最大的价值是把很多运行时错误提前到编译期发现，比如空值、类型不匹配、字段拼错。它还能让函数签名和组件 Props 自己就是文档，重构的时候也安全。我一般新项目直接开 strict，老项目逐步加严格选项；关键 API 类型最好和后端共享或者用 OpenAPI 生成，避免手写类型和实际数据对不上。

---

### FB-28-CO-B-008：测试覆盖率有哪些指标？如何正确看待覆盖率？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障
**标签**：覆盖率、单元测试、质量度量、CI
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释行覆盖率、分支覆盖率、函数覆盖率、语句覆盖率的含义，并说明覆盖率是否越高越好。

**参考答案**：

**核心要点**：覆盖率衡量测试执行了多少代码，但不能衡量测试质量；应把它当作健康指标而非唯一目标。

**详细解释**：

| 指标 | 含义 | 适用场景 |
|------|------|----------|
| 语句覆盖率（Statement） | 被执行的语句占总语句比例 | 最基础，但可能遗漏未覆盖分支 |
| 分支覆盖率（Branch） | if/switch/三元等分支被覆盖比例 | 能发现逻辑分支遗漏，建议重点关注 |
| 函数覆盖率（Function） | 被调用的函数比例 | 防止新增函数未测试 |
| 行覆盖率（Line） | 被执行的代码行比例 | 最常用，但一行可能含多个分支 |
| 条件覆盖率（Condition） | 布尔子条件所有结果是否都被覆盖 | 更严格，成本更高 |

示例：

```js
function classify(num) {
  if (num > 0 && num < 10) return 'small'; // 两个子条件
  return 'other';
}

// 仅测试 classify(5) 时行/语句覆盖 100%，但条件覆盖不足
```

正确看待覆盖率：
- 覆盖率是“测试是否执行到代码”的指标，不是“代码是否正确”的指标。
- 高覆盖率 + 弱断言 = 虚假安全感。
- 建议设定合理阈值并重点关注分支覆盖率，而非追求 100%。

**最佳实践**：
- 新代码增量覆盖率阈值高于全量（如增量 80%，全量 60%）。
- 对核心模块提高阈值，对 UI 布局/配置类放宽。
- 把未覆盖代码作为风险清单，而不是数字游戏。

**评分维度**：
- 指标解释（40%）：能清晰区分行/分支/函数/语句覆盖
- 价值认知（30%）：能说明覆盖率不是质量本身
- 阈值设计（30%）：能给出合理阈值与增量覆盖策略

**常见错误**：
- 把 100% 覆盖率当作唯一目标。
- 为了凑覆盖率写无断言测试。
- 只关注行覆盖，忽略分支覆盖。

**延伸追问**：
- 如何防止“为了覆盖率而测试”？
- 增量覆盖率怎么在 CI 里实现？

**相关题目**：
- [FB-28-CO-P-018 测试覆盖率的陷阱](#FB-28-CO-P-018)
- [FB-28-EN-P-024 质量门禁设计](#FB-28-EN-P-024)

**参考资源**：
- [Istanbul - Coverage Reports](https://istanbul.js.org/)
- [Google Testing Blog - Measuring Coverage](https://testing.googleblog.com/2014/07/measuring-coverage-at-google.html)

**口头回答版**：
> 覆盖率常见有行覆盖、分支覆盖、函数覆盖、语句覆盖。分支覆盖比行覆盖更能发现逻辑遗漏，因为一行 if 可能包含多个条件。覆盖率不是越高越好，它是看测试有没有跑到这段代码，不等于代码就是对的。我见过为了 100% 覆盖写一堆没断言的测试，那叫自欺欺人。一般我会给核心模块设高一点的阈值，更看重新增代码的分支覆盖。

---

## 进阶题（8 道）{#advanced}

### FB-28-CO-A-009：前端测试框架如何选型？

**题型**：概念题 / 场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：28 质量保障
**标签**：测试策略、Jest、Vitest、选型、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
假设你要为一个新的中后台前端项目选择测试框架，请说明单元测试和 E2E 测试的选型思路，并给出推荐理由。

**参考答案**：

**核心要点**：测试框架选型应基于团队技术栈、构建工具、测试目标、维护成本四个维度综合评估，而不是追求最新工具。

**详细解释**：

单元测试选型维度：

| 维度 | 考虑点 | 推荐倾向 |
|------|--------|----------|
| 构建工具 | Vite / Webpack / esbuild | Vite 项目优先 Vitest |
| 生态与迁移 | 存量用例、插件依赖 | 大量 Jest 用例可保留 Jest |
| ESM 支持 | 是否需要原生 ESM | Vitest/Node Test Runner 更友好 |
| TypeScript | 是否需要额外 transform | Vitest 原生，Jest 需 ts-jest/swc |
| 并行能力 | 大仓库需要 shard/worker | Vitest 内置多线程体验好 |

E2E 选型维度：

| 工具 | 优势 | 劣势 | 适用场景 |
|------|------|------|----------|
| Cypress | 实时调试、生态成熟、API 友好 | 单线程、跨浏览器需付费、iframe 支持弱 | 中后台、调试体验优先 |
| Playwright | 多浏览器原生、并行强、自动等待稳定、trace 诊断强 | 生态相对新 | 复杂场景、多端一致性 |
| Puppeteer | Chrome DevTools 协议、轻量 | 只支持 Chromium、维护成本上升 | Chrome 扩展、爬虫、PDF |

示例决策：

```markdown
项目背景：Vite + React + TypeScript 中后台
决策：
- 单元测试：Vitest + React Testing Library + jsdom
- E2E：Playwright（多浏览器 + 并行 + trace）
- Mock：MSW 统一处理 API
```

**最佳实践**：
- 先定测试策略，再选工具；避免为工具改流程。
- 保持团队技术栈统一，减少心智负担。
- 选型后制定一套最小可运行的测试模板和示例。

**评分维度**：
- 选型维度全面性（40%）：能从技术栈、目标、成本等维度分析
- 工具对比深度（30%）：能说出 Jest/Vitest、Cypress/Playwright 的核心差异
- 场景匹配（30%）：能根据项目背景给出合理方案

**常见错误**：
- 盲目追新，忽略团队学习成本和存量用例。
- 只选一个工具覆盖所有测试层级。
- 忽略 E2E 的调试、稳定性、并行能力差异。

**延伸追问**：
- 如果项目需要从 Jest 迁移到 Vitest，你会怎么评估 ROI？
- Playwright 的 auto-waiting 机制如何提升测试稳定性？

**相关题目**：
- [FB-28-CO-B-003 Jest 与 Vitest 的区别](#FB-28-CO-B-003)
- [FB-28-CO-A-010 Cypress 与 Playwright 的差异](#FB-28-CO-A-010)

**参考资源**：
- [Vitest 官方文档 - Why Vitest](https://vitest.dev/guide/why.html)
- [Playwright vs Cypress](https://playwright.dev/docs/why-playwright)

**口头回答版**：
> 选型我会先看技术栈和构建工具：Vite 项目我倾向 Vitest，因为配置少、对 ESM 和 TS 友好；如果是 Webpack 老项目且有很多 Jest 用例，就没必要硬迁。E2E 方面，Cypress 调试体验好、生态成熟，但单线程；Playwright 多浏览器原生支持、并行和 trace 很强。中后台 Vite 项目我通常选 Vitest + Playwright，API Mock 用 MSW 统一管。

---

### FB-28-CO-A-010：Cypress 与 Playwright 有什么核心差异？如何选型？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：28 质量保障
**标签**：Cypress、Playwright、E2E、自动化、测试框架
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Cypress 与 Playwright 在架构、运行方式、稳定性、生态等方面的差异，并给出选型建议。

**参考答案**：

**核心要点**：Cypress 采用在浏览器内运行测试的架构，调试体验优秀；Playwright 采用 out-of-process 多浏览器协议，并行和跨浏览器能力更强。

**详细解释**：

| 维度 | Cypress | Playwright |
|------|---------|------------|
| 架构 | 测试代码在浏览器内与 App 同域执行 | 测试代码在 Node 进程，通过协议驱动浏览器 |
| 浏览器支持 | Chromium/Firefox/WebKit（部分需商业版） | Chromium/Firefox/WebKit 原生支持 |
| 并发 | 单线程 inside browser，文件级并行 | 进程级并行，worker 数量可配 |
| 自动等待 | 有，但部分场景需显式等待 | 基于 actionability checks 的自动重试 |
| 跨域/多标签 | 历史上有较多限制 | 原生支持多标签、多 origin |
| iframe | 支持较弱 | 支持较好 |
| 调试 | 时间旅行、截图、视频、API 友好 | Trace viewer、network/UI log |
| 生态 | 插件、Dashboard 成熟 | 快速增长，官方工具链完整 |
| CI 性能 | 文件级并行，多机器需 Orchestration | 单机即可高并行 |

示例：Playwright 并行配置

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  workers: process.env.CI ? 4 : undefined,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
```

**最佳实践**：
- 重视调试体验和团队熟悉度选 Cypress。
- 需要多浏览器、高并行、复杂流程选 Playwright。
- 新项目更推荐 Playwright，长期维护和 CI 成本更优。

**评分维度**：
- 架构差异（40%）：能说明 in-browser vs out-of-process 的区别
- 稳定性与并发（30%）：能对比自动等待、并行能力
- 选型建议（30%）：能根据场景给出明确选择

**常见错误**：
- 认为 Cypress 天然支持所有浏览器并行。
- 忽略 Cypress 跨域/iframe 的历史限制。
- 只根据 popularity 选型而不看场景。

**延伸追问**：
- Playwright 的 auto-waiting 具体是怎么实现的？
- Cypress 组件测试和 Playwright 组件测试有什么区别？

**相关题目**：
- [FB-28-CO-A-009 前端测试框架选型](#FB-28-CO-A-009)
- [FB-28-PE-P-019 提升 E2E 测试稳定性](#FB-28-PE-P-019)

**参考资源**：
- [Cypress Architecture](https://docs.cypress.io/guides/overview/why-cypress#Architecture)
- [Playwright - Actionability](https://playwright.dev/docs/actionability)

**口头回答版**：
> Cypress 的测试代码是跑在浏览器里的，调试体验很好，有时间旅行；但它主要是单线程，跨域和多标签 historically 麻烦一点。Playwright 是 Node 进程通过协议控制浏览器，天生支持 Chromium、Firefox、WebKit，单机并行能力强，自动等待也更稳。如果团队很熟 Cypress、调试体验优先可以选它；新项目或需要多端一致性我倾向 Playwright。

---

### FB-28-CO-A-011：什么是契约测试？前端为什么需要它？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：28 质量保障
**标签**：契约测试、Pact、API、前后端协作、测试策略
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释契约测试（Contract Testing）的概念，并说明它在前后端分离项目中的价值、典型流程和常用工具。

**参考答案**：

**核心要点**：契约测试通过验证消费者与提供者之间的契约（接口结构、字段、状态码）来提前发现集成问题，避免依赖真实后端或 E2E 测试。

**详细解释**：

为什么需要契约测试：

- 前后端并行开发时，字段变更经常导致联调失败。
- E2E 测试依赖真实环境，维护成本高、反馈慢。
- 集成测试可以 Mock 后端，但无法保证 Mock 与真实后端一致。
- 契约测试把接口约定固化为可执行的测试，任何一方破坏契约立即暴露。

典型流程（消费者驱动契约，CDC）：

```text
1. 前端（消费者）定义期望：请求/响应结构、字段类型、状态码
2. 使用 Pact 生成契约文件（JSON）
3. 契约提交到 Pact Broker 共享
4. 后端（提供者）拉取契约并验证是否满足
5. CI 中任何一方破坏契约即失败
```

示例：Pact 消费者测试

```js
import { Pact } from '@pact-foundation/pact';

const provider = new Pact({
  consumer: 'web-app',
  provider: 'user-service',
  port: 1234,
});

test('get user by id', async () => {
  await provider.addInteraction({
    state: 'user with id 1 exists',
    uponReceiving: 'a request for user 1',
    withRequest: { method: 'GET', path: '/users/1' },
    willRespondWith: {
      status: 200,
      body: {
        id: 1,
        name: like('Alice'),
        email: like('alice@example.com'),
      },
    },
  });

  const user = await fetchUser(1); // 调用本地 Mock Server
  expect(user.name).toBe('Alice');
});
```

**最佳实践**：
- 优先对核心、高频、易变的接口做契约测试。
- 把契约文件纳入版本控制或 Pact Broker。
- CI 中设置“能否部署”门禁，如 Pact 的 can-i-deploy。

**评分维度**：
- 概念理解（40%）：能说清契约测试的定义和 CDC 流程
- 价值阐述（30%）：能说明与 E2E、集成测试的区别与互补
- 工具/示例（30%）：能使用 Pact 等工具给出示例

**常见错误**：
- 把契约测试当成接口全量功能测试。
- 忽视提供者验证，只做消费者端生成契约。
- 试图用契约测试替代单元测试或 E2E。

**延伸追问**：
- 契约测试与 OpenAPI/Swagger 校验有什么关系？
- 如果后端需要删除一个字段，契约测试如何推动沟通？

**相关题目**：
- [FB-28-CO-B-002 单元/集成/E2E 区别](#FB-28-CO-B-002)
- [FB-28-SD-R-025 设计前端质量保障体系](#FB-28-SD-R-025)

**参考资源**：
- [Pact 官方文档](https://docs.pact.io/)
- [Martin Fowler - Consumer-Driven Contracts](https://martinfowler.com/articles/consumer-driven-contracts.html)

**口头回答版**：
> 契约测试就是前后端先把接口约定写下来，变成可执行的测试。前端作为消费者定义我期望的返回结构，后端去验证它能不能满足。这样字段一改就能在 CI 里发现，不用等到联调或 E2E 才报错。常用工具是 Pact，流程是前端写消费者测试生成契约文件，放到 Pact Broker，后端拉去验证。它不能替代单元测试，但能大幅减少前后端集成问题。

---

### FB-28-CO-A-012：视觉回归测试的原理与实践是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：28 质量保障
**标签**：视觉回归、Chromatic、Percy、UI 测试、Storybook
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释视觉回归测试（Visual Regression Testing）的原理、适用场景，并说明如何在前端组件库中落地。

**参考答案**：

**核心要点**：视觉回归测试通过对比页面/组件截图的像素差异，发现 UI 走样、样式回归、主题错误等常规测试难以捕捉的问题。

**详细解释**：

工作原理：

1. **基线截图**：在主干或指定分支生成标准截图。
2. **对比截图**：在 MR/PR 或发布前对同一组件/页面截图。
3. **差异检测**：像素级 diff，标记变化区域。
4. **人工确认**：评审差异，接受为新基线或标记为 bug。

适用场景：

- 组件库主题、Token 变更。
- CSS 改动可能影响多页面布局。
- 国际化、暗色模式、不同浏览器渲染差异。
- 复杂图表、Canvas、SVG 的可视化结果。

常用工具：

| 工具 | 特点 |
|------|------|
| Chromatic | 与 Storybook 深度集成，组件级截图 |
| Percy | 支持多浏览器/响应式，CI 集成方便 |
| Applitools | AI 辅助差异判断，支持复杂视觉场景 |
| Playwright | 内置 screenshot + pixelmatch，可自研 |

示例：Storybook + Chromatic

```ts
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary', children: 'Submit' } };
export const Disabled: Story = { args: { disabled: true, children: 'Submit' } };
```

**最佳实践**：
- 先覆盖核心组件和关键页面，避免全量截图导致成本爆炸。
- 配合设计 Token 和主题切换做矩阵截图。
- 对动态内容（时间、随机数）进行 mask 或 stub。
- 把视觉回归作为 MR 评审的一部分，而非仅依赖自动化判定。

**评分维度**：
- 原理理解（40%）：能说清基线、对比、diff、确认流程
- 场景与工具（30%）：能说明适用场景并列举工具
- 落地实践（30%）：能提到 Storybook、mask、阈值、人工确认

**常见错误**：
- 用视觉回归替代功能测试。
- 对大量动态内容直接截图导致误报。
- 忽略基线维护，导致差异累积。

**延伸追问**：
- 如何处理字体加载、动画导致的视觉抖动？
- 视觉回归测试的成本和收益如何平衡？

**相关题目**：
- [FB-28-CO-A-011 契约测试](#FB-28-CO-A-011)
- [FB-28-SD-R-026 微前端/Monorepo 测试策略](#FB-28-SD-R-026)

**参考资源**：
- [Chromatic 官方文档](https://www.chromatic.com/)
- [Percy 官方文档](https://percy.io/)

**口头回答版**：
> 视觉回归测试就是给页面或组件截图，和基线对比像素差异，发现样式走样。它特别适合组件库主题改动、CSS 大改、暗色模式这种普通断言测不到的场景。工具上 Storybook + Chromatic 很常见，Playwright 也能自研截图对比。要注意对动态内容做 mask，比如时间、随机图，不然全是误报。它不能替代功能测试，一般作为 MR 评审的辅助。

---

### FB-28-CO-A-013：如何设计可测试性良好的前端代码？

**题型**：概念题 / 场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：28 质量保障
**标签**：可测试性、依赖注入、单一职责、设计模式、单元测试
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明什么是可测试性（Testability），并给出前端代码中提升可测试性的常见设计原则与代码示例。

**参考答案**：

**核心要点**：可测试性是指代码能够被方便、稳定、快速地验证的程度。好的可测试性通常来自清晰的职责边界、可控的依赖和可观察的输出。

**详细解释**：

提升可测试性的原则：

| 原则 | 说明 | 反例 |
|------|------|------|
| 单一职责 | 一个模块只负责一件事 | 一个组件既管 UI 又管数据请求又管埋点 |
| 依赖注入 | 依赖从外部传入，而非内部硬编码 | 函数内部直接 `fetch('/api/...')` |
| 避免全局状态 | 减少隐式依赖和时间耦合 | 测试顺序影响结果 |
| 纯函数优先 | 相同输入永远得到相同输出 | 结果依赖 `Date.now()` 或随机数 |
| 可观察输出 | 通过返回值、回调、DOM 暴露结果 | 副作用散落无断言 |

示例：依赖注入改造

```ts
// 可测试性差：依赖内部直接 fetch
export async function getUserName() {
  const res = await fetch('/api/user');
  const data = await res.json();
  return data.name;
}

// 可测试性好：注入请求函数
export async function getUserName(fetchUser: () => Promise<{ name: string }>) {
  const data = await fetchUser();
  return data.name;
}

// 测试
import { getUserName } from './user';

test('returns user name', async () => {
  const result = await getUserName(async () => ({ name: 'Alice' }));
  expect(result).toBe('Alice');
});
```

示例：使用 Port/Adapter 隔离副作用

```ts
// ports.ts
export interface Logger {
  log: (msg: string) => void;
}

// service.ts
export function createOrder(items: string[], logger: Logger) {
  logger.log(`creating order: ${items.join(',')}`);
  // ...
}

// test
test('logs order creation', () => {
  const logs: string[] = [];
  createOrder(['book'], { log: (m) => logs.push(m) });
  expect(logs).toContain('creating order: book');
});
```

**最佳实践**：
- 把业务逻辑从 UI 框架中剥离，优先写成纯函数。
- 用 MSW 统一管理网络依赖，而不是每个测试单独 Mock。
- 避免在组件内部直接引用全局单例。

**评分维度**：
- 原则理解（40%）：能说出单一职责、依赖注入、纯函数等
- 代码示例（30%）：能给出前后对比的可运行示例
- 测试收益（30%）：能说明可测试性对稳定性、速度的影响

**常见错误**：
- 认为可测试性只是“多写测试”。
- 用大量私有方法和复杂闭包隐藏状态。
- 测试中过度使用 `jest.spyOn` 修改被测对象内部。

**延伸追问**：
- 如何处理 React Hook 中的外部依赖？
- 可测试性与封装性是否冲突？

**相关题目**：
- [FB-28-CO-B-004 好的单元测试特征](#FB-28-CO-B-004)
- [FB-28-CD-A-016 手写测试数据工厂](#FB-28-CD-A-016)

**参考资源**：
- [Google Testing Blog - Testability](https://testing.googleblog.com/2014/02/testability-is-testability.html)
- [Growing Object-Oriented Software Guided by Tests](http://www.growing-object-oriented-software.com/)

**口头回答版**：
> 可测试性就是代码容不容易测。我一般会从几个原则入手：单一职责，一个模块别干太多事；依赖注入，把 fetch、logger 这类东西从外部传进来，不要内部硬编码；尽量写纯函数，同样输入同样输出；少用全局状态。这样单元测试写起来快，Mock 也少，重构的时候也安心。

---

### FB-28-CO-A-014：TDD 与 BDD 有什么区别？如何实践？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：28 质量保障
**标签**：TDD、BDD、测试驱动、行为驱动、敏捷
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 TDD（测试驱动开发）与 BDD（行为驱动开发）的核心理念、工作流程和适用场景，并说明它们在前端如何落地。

**参考答案**：

**核心要点**：TDD 关注“如何通过测试驱动正确实现”，BDD 关注“如何用业务语言描述行为并驱动协作”。

**详细解释**：

TDD 流程（Red-Green-Refactor）：

```text
1. Red：写一个会失败的测试，明确期望行为
2. Green：写最少代码让测试通过
3. Refactor：重构代码，保持测试通过
```

BDD 流程（Given-When-Then）：

```text
Given 初始上下文
When  用户执行某个动作
Then  系统应产生什么结果
```

对比：

| 维度 | TDD | BDD |
|------|-----|-----|
| 关注点 | 代码正确性 | 业务行为与协作 |
| 表达语言 | 技术术语 | 业务术语（Given/When/Then） |
| 参与者 | 开发者 | 产品、测试、开发 |
| 测试粒度 | 单元测试为主 | 可延伸至单元、集成、E2E |
| 典型工具 | Jest、Vitest、xUnit | Cucumber、Jest 的 describe/it |

前端落地示例：

```ts
// TDD：先写测试，再实现 discount
test('VIP 用户享受 9 折', () => {
  expect(calculateDiscount(100, 'vip')).toBe(90);
});

export function calculateDiscount(amount: number, level: string) {
  return level === 'vip' ? amount * 0.9 : amount;
}
```

```ts
// BDD：用业务语言表达
import { describe, it, expect } from 'vitest';
import { addToCart } from './cart';

describe('购物车', () => {
  it('当用户把商品加入购物车时，购物车数量应增加', () => {
    const cart = addToCart([], { id: 1, name: 'Book' });
    expect(cart).toHaveLength(1);
  });
});
```

**最佳实践**：
- TDD 适合算法、工具函数、状态机等确定性逻辑。
- BDD 适合需求澄清、跨职能协作、E2E 场景。
- 不要拘泥于形式，关键是测试先行和持续反馈。

**评分维度**：
- 理念区分（40%）：能准确区分 TDD 与 BDD 的关注点
- 流程掌握（30%）：能说明 Red-Green-Refactor 和 Given-When-Then
- 落地能力（30%）：能给出前端代码示例并说明适用场景

**常见错误**：
- 把 TDD 等同于“先写测试后写代码”而忽略重构阶段。
- 把 BDD 当成只写 E2E 测试。
- 在 UI 频繁变动的早期强行 TDD，导致测试大量返工。

**延伸追问**：
- TDD 是否适合所有前端场景？什么时候不适合？
- BDD 如何避免变成“用自然语言写代码”的形式主义？

**相关题目**：
- [FB-28-CO-B-004 好的单元测试特征](#FB-28-CO-B-004)
- [FB-28-CO-A-013 可测试性设计](#FB-28-CO-A-013)

**参考资源**：
- [Test Driven Development by Example](https://www.oreilly.com/library/view/test-driven-development/0321146530/)
- [BDD in Action](https://www.manning.com/books/bdd-in-action)

**口头回答版**：
> TDD 是测试驱动开发，流程是 Red-Green-Refactor：先写一个 failing test，再写最少代码让它过，最后重构。BDD 是行为驱动开发，用 Given-When-Then 这种业务语言描述系统行为，让产品、测试、开发都能看懂。TDD 更适合算法和工具函数，BDD 更适合需求澄清和 E2E。前端落地时我会结合：核心逻辑用 TDD，用户故事用 BDD 描述。

---

### FB-28-EN-A-015：如何设计一条 CI 中的质量流水线？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：28 质量保障、12 CI/CD
**标签**：CI、流水线、质量门禁、自动化、ESLint
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一条适合前端项目的 CI 质量流水线，说明阶段划分、质量门禁和失败处理策略。

**参考答案**：

**核心要点**：一条好的前端 CI 流水线应从快到慢、从静态到动态、从本地到集成，尽早发现问题，并设置明确的质量门禁。

**详细解释**：

推荐阶段：

```text
检出代码
  → 依赖安装（缓存 node_modules / pnpm-store）
  → 代码风格与静态检查（Prettier/ESLint/Stylelint/TypeScript）
  → 单元测试 + 覆盖率（Jest/Vitest）
  → 构建产物（Build）
  → 集成测试 / 组件测试（可选）
  → E2E 测试（可选，按变更范围）
  → 产物上传 / 部署预览
```

质量门禁示例：

| 阶段 | 门禁 | 失败策略 |
|------|------|----------|
| Lint | ESLint 0 error，warn 可设阈值 | 立即失败 |
| Type Check | `tsc --noEmit` 无错误 | 立即失败 |
| 单元测试 | 全量通过，增量分支覆盖 ≥ 80% | 立即失败 |
| 构建 | 构建成功、产物大小未暴涨 | 立即失败 |
| E2E | 核心流程通过 | 可重试后失败 |

示例：GitHub Actions 流水线片段

```yaml
name: Quality Gate
on: [pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm test:unit --coverage
      - run: pnpm build
      - run: pnpm test:e2e
```

**最佳实践**：
- 静态检查放在最前面，失败成本低。
- 单元测试并行执行，利用 shard 加速大仓库。
- 使用 lint-staged + husky 在本地预检，减少 CI 失败。
- E2E 失败可自动重试，并保存 trace/video 便于诊断。

**评分维度**：
- 阶段设计（40%）：能从静态检查到测试到构建合理排序
- 质量门禁（30%）：能给出具体阈值和失败策略
- 工程化细节（30%）：能提到缓存、并行、本地预检、产物诊断

**常见错误**：
- 把 E2E 放在最前面，导致反馈极慢。
- 只跑测试不卡覆盖率，质量门禁形同虚设。
- 不缓存依赖，每次 CI 重新安装。

**延伸追问**：
- 大仓库如何加速单元测试？
- CI 中如何处理 flaky test？

**相关题目**：
- [FB-28-CO-B-006 ESLint 与 Prettier 的区别](#FB-28-CO-B-006)
- [FB-28-EN-P-024 质量门禁设计](#FB-28-EN-P-024)

**参考资源**：
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Trunk-Based Development - CI](https://trunkbaseddevelopment.com/)

**口头回答版**：
> 我会把 CI 流水线从快到慢排：先装依赖并缓存，然后跑 Prettier、ESLint、TypeScript 这些静态检查，最快发现低级错误；接着跑单元测试并卡覆盖率；再构建；最后才是 E2E。每个阶段都设门禁，比如 ESLint 0 error、分支覆盖 80%、构建成功。E2E 不稳定可以重试并保留截图视频。本地再用 lint-staged 预检，减少 CI 排队失败。

---

### FB-28-CD-A-016：手写一个测试数据工厂与 API Mock 封装

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：28 质量保障
**标签**：测试数据、Mock、MSW、工厂模式、单元测试
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请手写一个可复用的测试数据工厂（Factory）和一个基于 MSW 的 API Mock 封装，使得测试代码不依赖真实后端且数据构建灵活。

**参考答案**：

**核心要点**：测试数据工厂通过默认值 + 覆盖机制快速构造合法对象；MSW 封装将 API Mock 集中管理，保证测试稳定可维护。

**详细解释**：

Factory 实现：

```ts
// factories/user.ts
import { faker } from '@faker-js/faker';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'user',
    ...overrides,
  };
}

// 使用
const admin = createUser({ role: 'admin', name: 'Alice' });
const users = Array.from({ length: 10 }, () => createUser());
```

MSW 封装：

```ts
// mocks/handlers/users.ts
import { http, HttpResponse } from 'msw';
import { createUser } from '../../factories/user';

export const userHandlers = [
  http.get('/api/users', () => {
    return HttpResponse.json({ data: [createUser(), createUser()] });
  }),

  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      data: createUser({ id: params.id as string }),
    });
  }),

  http.post('/api/users', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ data: createUser(payload as Partial<User>) }, { status: 201 });
  }),
];
```

测试中使用：

```ts
// test/setup.ts
import { setupServer } from 'msw/node';
import { userHandlers } from './mocks/handlers/users';

export const server = setupServer(...userHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

覆盖特定场景：

```ts
test('shows empty state when no users', async () => {
  server.use(
    http.get('/api/users', () => HttpResponse.json({ data: [] }))
  );
  render(<UserList />);
  expect(await screen.findByText('No users')).toBeInTheDocument();
});
```

**最佳实践**：
- Factory 只负责数据构造，不负责业务状态。
- MSW 处理器按领域拆分，集中管理而非散落在测试里。
- 每个测试只覆盖自己需要的行为，用 `server.use` 局部覆盖。

**评分维度**：
- Factory 设计（40%）：能写出默认值 + 覆盖的灵活工厂
- MSW 封装（40%）：能正确设置 server、handlers、resetHandlers
- 可维护性（20%）：能按领域拆分处理器，避免测试内重复 Mock

**常见错误**：
- Factory 返回的数据与真实接口字段不一致。
- MSW handler 未重置，导致测试间互相污染。
- 每个测试都手写完整的 Mock 响应。

**延伸追问**：
- 如何保证 Factory 数据与后端 schema 同步？
- 测试数据工厂和 fixture 文件各有什么优劣？

**相关题目**：
- [FB-28-CO-A-013 可测试性设计](#FB-28-CO-A-013)
- [FB-28-SD-R-028 大规模 E2E 测试并行与稳定性](#FB-28-SD-R-028)

**参考资源**：
- [MSW 官方文档](https://mswjs.io/)
- [faker-js 官方文档](https://fakerjs.dev/)

**口头回答版**：
> 手写测试数据工厂就是给一个对象提供默认值，同时允许传入字段覆盖，比如 createUser 默认生成随机 id、name、email，但我可以传 { role: 'admin' } 得到管理员。API Mock 我用 MSW，把所有 handler 按领域拆到单独文件，测试 setup 里启动 server，每个测试后用 resetHandlers 清状态。这样测试不依赖真实后端，数据构造也灵活，还能局部覆盖某个接口返回空数组或错误。

---

## 深入题（8 道）{#proficient}

### FB-28-SS-P-017：如何处理代码评审中的分歧？

**题型**：软技能题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：28 质量保障
**标签**：代码评审、软技能、团队协作、沟通、技术决策
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在代码评审中，如果评审者提出一条修改建议，但作者认为当前实现更优，双方僵持不下，你会如何处理？

**参考答案**：

**核心要点**：代码评审分歧应以代码质量和项目目标为导向，通过聚焦事实、引入标准、升级决策来化解，而不是演变为个人争论。

**详细解释**：

处理步骤：

1. **回到事实**：用具体代码、数据或规范说话，避免主观判断。
   - “这里的圈复杂度是 15，项目规范要求 ≤10。”
   - “这个实现没有处理空数组边界，测试用例 X 会失败。”

2. **明确影响**：讨论改动对用户、维护成本、性能、安全的影响。
   - 如果影响小且可后续优化，可记录 TODO。
   - 如果影响大，应坚持修改。

3. **寻找中间方案**：
   - 提取公共函数而非完全重写。
   - 加注释、补测试、改命名，保留核心思路。

4. **引入第三方**：
 - 在小型团队可直接语音/会议快速对齐。
   - 在大型团队可引入 tech lead 或架构师做最终决策。

5. **升级机制**：
   - 使用 MR 评论的 “Resolve” 标记达成共识。
   - 对重大争议形成 ADR（Architecture Decision Record），避免反复争论。

示例回复：

```markdown
@author 我理解你当前实现性能更好。不过从可维护性看，这段逻辑和 A 模块重复，
如果后续需求变化需要同时改两处，风险较高。建议先抽一个公共函数，
如果担心性能，我们可以在抽离后补一个基准测试对比，你看可以吗？
```

**最佳实践**：
- 评审意见要区分 “必须改”（阻塞）和 “建议改”（非阻塞）。
- 避免在评论中使用 “你错了”，改为 “这段代码可能会……”。
- 记录团队评审规范和常见决策，减少重复争议。

**评分维度**：
- 沟通策略（40%）：能否体现建设性、聚焦问题而非人
- 决策机制（30%）：能否提到规范、数据、升级路径
- 团队视角（30%）：能否平衡代码质量、进度和成员成长

**常见错误**：
- 坚持己见导致僵持，阻塞合并。
- 为了避免冲突直接通过，留下技术债。
- 把技术分歧升级为人际矛盾。

**延伸追问**：
- 如果 tech lead 也拿不准，你会怎么决策？
- 如何在团队中建立评审文化，减少分歧？

**相关题目**：
- [FB-28-CO-B-005 代码评审关注哪些方面](#FB-28-CO-B-005)
- [FB-28-SS-R-030 Bug 管理与复盘机制](#FB-28-SS-R-030)

**参考资源**：
- [Google Code Review - How to Handle Reviewer Comments](https://google.github.io/eng-practices/review/reviewer/comments.html)
- [The Art of Giving and Receiving Code Reviews](https://www.alexkras.com/the-art-of-giving-and-receiving-code-reviews/)

**口头回答版**：
> 遇到分歧我一般会先把讨论拉回事实：代码规范怎么说、有没有具体 bug、性能数据怎么样。然后评估影响，如果是小问题可以记 TODO，影响大就要改。再去找中间方案，比如抽公共函数而不是重写。如果还是僵持，就请 tech lead 或架构师拍板，并把结论形成 ADR。关键是就事论事，避免人身攻击，评审意见要分清楚阻塞和非阻塞。

---

### FB-28-CO-P-018：测试覆盖率有哪些常见陷阱？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：28 质量保障
**标签**：覆盖率、测试质量、单元测试、度量、质量门禁
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明把覆盖率当作质量目标时容易陷入的陷阱，并给出正确的使用方式。

**参考答案**：

**核心要点**：覆盖率只能证明代码被执行过，不能证明代码行为正确；追求数字容易导致无意义测试和虚假安全感。

**详细解释**：

常见陷阱：

| 陷阱 | 说明 | 示例 |
|------|------|------|
| 100% 崇拜 | 为未覆盖行补无断言测试 | `expect(fn()).toBeDefined()` |
| 只看行覆盖 | 忽略分支/条件覆盖 | `if (a && b)` 只测 a=true,b=true |
| 忽略断言质量 | 测试执行了但无有效断言 | 只调用函数，不验证结果 |
| 覆盖无价值代码 | 对简单 getter、常量、类型定义要求覆盖 | 大量时间花在低风险代码 |
| 数字攀比 | 团队之间比较覆盖率 | 不同模块风险不同，不能一刀切 |
| 静态分支不可达 | 为防御性分支硬凑测试 | `if (!env) throw` 在正常 CI 难触发 |

正确用法：

1. **分层阈值**：核心模块 > 业务模块 > UI/配置。
2. **增量覆盖优先**：MR 要求新增代码分支覆盖 ≥ 80%。
3. **关注未覆盖原因**：是真的不可达，还是遗漏？
4. **结合变异测试（Mutation Testing）**：验证测试是否能发现代码改动。
5. **把覆盖率作为风险雷达，而非目标本身**。

示例：无意义测试 vs 有意义测试

```ts
// 无意义：只执行，不断言
function add(a: number, b: number) { return a + b; }
test('add runs', () => { add(1, 2); });

// 有意义：验证行为
function add(a: number, b: number) { return a + b; }
test('add returns sum of two numbers', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(-1, 1)).toBe(0);
  expect(add(0, 0)).toBe(0);
});
```

**最佳实践**：
- 在 CI 中同时展示行覆盖、分支覆盖、函数覆盖。
- 对核心模块设定分支覆盖目标，UI 展示层可放宽。
- 使用 Stryker 等变异测试工具定期校验测试有效性。

**评分维度**：
- 陷阱识别（40%）：能说出 4 个以上陷阱
- 正确度量（30%）：能提出分层阈值、增量覆盖、变异测试
- 代码示例（30%）：能用对比示例说明无意义与有意义测试

**常见错误**：
- 把覆盖率作为 KPI，导致测试质量下降。
- 只关注全量覆盖率，不关注新增代码。
- 认为覆盖率高就等于 bug 少。

**延伸追问**：
- 如何防止团队“刷覆盖率”？
- 变异测试的原理是什么？前端如何落地？

**相关题目**：
- [FB-28-CO-B-008 测试覆盖率指标](#FB-28-CO-B-008)
- [FB-28-EN-P-024 质量门禁设计](#FB-28-EN-P-024)

**参考资源**：
- [Test Coverage is a Useless Metric](https://blog.ploeh.dk/2019/03/18/test-coverage-is-a-useless-metric/)
- [Stryker Mutator](https://stryker-mutator.io/)

**口头回答版**：
> 覆盖率最大的陷阱是大家把它当质量目标。你写个测试调用函数但不断言，覆盖率也能上去，但测了个寂寞。还有人只看行覆盖，忽略分支覆盖；或者为了 100% 去给 getter、常量补测试。正确做法是覆盖率当风险雷达：核心模块分支覆盖要求高，新增代码优先卡增量覆盖，同时关注未覆盖的原因。还可以用变异测试看看你的测试能不能真的发现代码被改坏。

---

### FB-28-PE-P-019：如何提升 E2E 测试的稳定性？

**题型**：性能优化题 / 场景设计题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：28 质量保障
**标签**：E2E、Playwright、稳定性、自动等待、Flaky Test
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请分析 E2E 测试不稳定（Flaky）的常见原因，并给出系统性的治理方案。

**参考答案**：

**核心要点**：E2E 测试不稳定主要源于非确定性等待、动态内容、资源竞争和环境差异；应通过自动等待、稳定选择器、隔离数据和重试机制综合治理。

**详细解释**：

常见不稳定原因：

| 原因 | 表现 | 对策 |
|------|------|------|
| 硬编码等待 | `sleep(1000)` 导致超时或提前 | 使用框架自动等待或显式条件 |
| 动态内容 | 列表、图表、广告位随机变化 | 用 data-testid、mock 数据、mask |
| 竞态条件 | 先点击后断言，元素尚未就绪 | 自动等待元素可交互 |
| 测试数据冲突 | 多个测试共用账号/订单 | 每个测试独立造数据、清理 |
| 环境差异 | 分辨率、时区、语言、浏览器 | 统一配置、矩阵覆盖 |
| 外部依赖 | 第三方服务、CDN 波动 | Mock 或 stub 外部依赖 |

Playwright 稳定性实践：

```ts
// 1. 优先使用 data-testid，避免依赖文案
await page.click('[data-testid="submit-button"]');

// 2. 使用 web-first 断言，自动重试
await expect(page.locator('[data-testid="success"]')).toBeVisible();

// 3. 用测试步骤隔离
import { test } from '@playwright/test';

test('checkout flow', async ({ page }) => {
  await test.step('login', async () => { /* ... */ });
  await test.step('add to cart', async () => { /* ... */ });
  await test.step('pay', async () => { /* ... */ });
});

// 4. 失败重试 + trace
// playwright.config.ts
export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  use: { trace: 'on-first-retry' },
});
```

综合治理方案：

1. **选择器策略**：统一使用 `data-testid`，禁用易变属性。
2. **数据策略**：每个测试用唯一账号/数据，结束后清理。
3. **等待策略**：全部使用自动等待和 web-first 断言。
4. **诊断策略**：失败自动截图、录屏、保留 trace 和 console 日志。
5. **度量策略**：记录 flaky 率，定期清理 top flaky 测试。

**最佳实践**：
- 不稳定测试立即隔离或标记，避免污染整体结果。
- 不要在测试里写 `setTimeout`。
- 对关键页面做视觉/网络请求 Mock，减少外部波动。

**评分维度**：
- 原因分析（40%）：能列出 4 类以上不稳定原因
- 技术对策（30%）：能给出自动等待、data-testid、独立数据等具体方案
- 治理体系（30%）：能提到 flaky 率度量、重试、诊断、隔离

**常见错误**：
- 用 `sleep` 或固定等待解决时序问题。
- 通过选择文案定位元素，导致国际化后失败。
- 多个测试共用账号导致状态互相影响。

**延伸追问**：
- 如果某个测试反复不稳定，但查不出原因，你会怎么处理？
- Playwright 的 auto-waiting 与 Cypress 的 retry 有什么区别？

**相关题目**：
- [FB-28-CO-A-010 Cypress 与 Playwright 差异](#FB-28-CO-A-010)
- [FB-28-SD-R-028 大规模 E2E 测试并行与稳定性](#FB-28-SD-R-028)

**参考资源**：
- [Playwright - Auto-waiting](https://playwright.dev/docs/actionability)
- [Google Testing Blog - Flaky Tests at Google](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html)

**口头回答版**：
> E2E 不稳定常见原因有：硬编码 sleep、元素定位依赖会变文案、测试数据互相冲突、外部依赖波动。治理的话，选择器统一用 data-testid；等待全部改成自动等待或显式断言，别写 setTimeout；每个测试独立造数据并清理；失败时自动截图录屏留 trace。还要度量 flaky 率，定期清理最 unstable 的用例。遇到真搞不定的测试，宁可先隔离也别让它一直失败。

---

### FB-28-CA-P-020：分析下面这段 ESLint 配置，指出潜在问题

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：28 质量保障
**标签**：ESLint、静态分析、TypeScript、配置、代码质量
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
下面是一个前端项目的 ESLint 配置，请分析其中可能存在的问题，并给出改进建议。

```js
module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks'],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'off',
  },
};
```

**参考答案**：

**核心要点**：该配置存在规则过度宽松、缺少关键推荐配置、未关闭冲突规则等问题，会降低静态分析对代码质量的保障能力。

**详细解释**：

潜在问题：

| 问题 | 说明 | 建议 |
|------|------|------|
| 未引入 TS 推荐规则 | 仅 extend `eslint:recommended`，缺少 `@typescript-eslint/recommended` | 增加 TS 推荐配置 |
| `no-console: off` | 生产代码可能残留调试日志 | 设为 `warn` 或 `error`，允许特定场景用 eslint-disable |
| `no-explicit-any: off` | any 会绕过类型系统 | 至少设为 `warn`，逐步收敛 |
| 缺少 Prettier 兼容 | 可能出现格式规则与 Prettier 冲突 | 添加 `prettier` 到 extends 末尾 |
| `no-unused-vars: off` | 不检测未使用变量，易留死代码 | 开启 `@typescript-eslint/no-unused-vars` |
| 未设置 env | 浏览器/Node 全局变量可能报错 | 配置 `env: { browser: true, es2022: true }` |
| 缺少 React 相关配置 | JSX/React 规则未启用 | 根据项目引入 `plugin:react/recommended` 或 `plugin:react-hooks/recommended` |

改进后配置：

```js
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // 关闭与 Prettier 冲突的格式规则
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    'no-console': ['warn', { allow: ['error'] }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react-hooks/exhaustive-deps': 'error',
  },
};
```

**最佳实践**：
- 规则要分阶段收紧：新项目直接 strict，老项目先 warn 再 error。
- 关键 hooks、TS、安全规则应设为 error。
- 使用 `eslint --max-warnings=0` 在 CI 中卡住 warn。

**评分维度**：
- 问题识别（50%）：能指出 4 个以上配置缺陷
- 改进方案（30%）：能给出合理的配置修正
- 治理思路（20%）：能说明分阶段收紧、CI 门禁

**常见错误**：
- 只指出 any 问题，忽略其他宽松规则。
- 建议把所有规则一次性设为 error，忽略老项目迁移成本。
- 未提到 Prettier 冲突。

**延伸追问**：
- 老项目有大量 any，如何逐步收敛？
- 如何为 Monorepo 设计分层 ESLint 配置？

**相关题目**：
- [FB-28-CO-B-006 ESLint 与 Prettier 的区别](#FB-28-CO-B-006)
- [FB-28-CO-B-007 TypeScript 如何提升代码质量](#FB-28-CO-B-007)

**参考资源**：
- [typescript-eslint Recommended Configs](https://typescript-eslint.io/linting/configs/)
- [ESLint Configuration Best Practices](https://eslint.org/docs/latest/use/configure/configuration-files)

**口头回答版**：
> 这段配置有几个明显问题：只 extend 了 eslint:recommended，没加 TS 推荐；no-console 关了容易留调试代码；no-explicit-any 关了类型系统就废了；no-unused-vars 关了会留死代码；还没配 env 和 Prettier 兼容。我会改成加 @typescript-eslint/recommended、prettier 放最后、any 和 console 设 warn、unused-vars 开起来、hooks 依赖设 error。老项目可以分阶段收紧，别一刀切。

---

### FB-28-SC-P-021：灰度发布中如何保障前端质量？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：28 质量保障
**标签**：灰度、发布、质量保障、监控、回滚
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一套前端灰度发布方案，说明如何控制灰度范围、验证质量、发现问题后快速回滚。

**参考答案**：

**核心要点**：前端灰度发布应结合流量控制、功能开关、埋点监控和自动告警，实现小范围验证、快速回滚、全量可控。

**详细解释**：

灰度控制维度：

| 维度 | 控制方式 | 说明 |
|------|----------|------|
| 用户比例 | 1% → 10% → 50% → 100% | 按流量逐步放开 |
| 用户属性 | 白名单、地域、设备、业务线 | 针对特定群体验证 |
| 功能开关 | Feature Flag | 同一版本内按用户灰度功能 |
| 资源灰度 | CDN 分路径、版本号 | 部分用户访问新资源 |

验证指标体系：

```text
功能指标：核心路径转化率、按钮点击率、表单完成率
技术指标：JS 错误率、API 失败率、资源加载失败率、白屏率、LCP/CLS
业务指标：订单量、支付成功率、客诉量
```

回滚策略：

1. **功能开关回滚**：关闭 Feature Flag，流量立即回到旧逻辑。
2. **CDN 回滚**：切换 CDN 路径或版本号，让用户加载旧资源。
3. **配置回滚**：通过 Nginx/Edge Config 切换默认版本。
4. **代码回滚**：重新部署上一个版本，作为最后手段。

示例：基于 LaunchDarkly 的 Feature Flag

```ts
import { useFlags } from 'launchdarkly-react-client-sdk';

function Checkout() {
  const { newPaymentFlow } = useFlags();
  return newPaymentFlow ? <NewPayment /> : <OldPayment />;
}
```

**最佳实践**：
- 灰度期间核心监控告警要实时，关键指标异常自动通知。
- 每个灰度阶段设定明确的通过标准（如错误率 < 0.1%）。
- 保留一键回滚能力，并在演练中验证。

**评分维度**：
- 灰度策略设计（40%）：能从比例、属性、开关、资源等维度设计
- 质量验证（30%）：能提出功能、技术、业务三类指标
- 回滚能力（30%）：能给出开关回滚、CDN 回滚、代码回滚等方案

**常见错误**：
- 只有百分比灰度，没有用户维度隔离。
- 灰度期间缺少实时监控，发现问题滞后。
- 回滚依赖重新发版，耗时过长。

**延伸追问**：
- 如何处理灰度用户访问到新 API 但后端还没灰度的情况？
- 前端灰度和后端灰度如何配合？

**相关题目**：
- [FB-28-SC-P-022 蓝绿与金丝雀部署](#FB-28-SC-P-022)
- [FB-28-SD-R-031 生产发布策略](#FB-28-SD-R-031)

**参考资源**：
- [LaunchDarkly - Feature Flagging Best Practices](https://docs.launchdarkly.com/home/getting-started/feature-flags)
- [AWS Blue/Green Deployments](https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/blue-green-deployments.html)

**口头回答版**：
> 前端灰度我一般从几个维度控制：流量比例、用户属性比如地域或白名单、功能开关 Feature Flag、CDN 资源路径。发布时先切 1%，看核心指标：JS 错误率、API 失败率、转化率、白屏率。每阶段设通过标准，比如错误率低于 0.1% 再放大。回滚优先用功能开关或切 CDN 版本，最快；实在不行再代码回滚。灰度期间必须有实时告警和一键回滚能力。

---

### FB-28-SC-P-022：蓝绿部署与金丝雀部署有什么区别？前端如何选择？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：28 质量保障、22 部署与 SRE
**标签**：蓝绿、金丝雀、发布策略、DevOps、灰度
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比蓝绿部署（Blue-Green Deployment）和金丝雀部署（Canary Deployment）的原理、优缺点，并说明前端发布时如何组合使用。

**参考答案**：

**核心要点**：蓝绿部署通过两套环境快速切换实现零停机回滚；金丝雀通过逐步切量暴露风险。前端常与 Feature Flag、CDN 缓存策略结合使用。

**详细解释**：

| 维度 | 蓝绿部署 | 金丝雀部署 |
|------|----------|------------|
| 资源占用 | 需维护两套环境 | 主要利用同一套环境逐步放量 |
| 切换速度 | 路由切换，瞬间完成 | 按流量比例渐进 |
| 风险暴露 | 全量切换，风险集中 | 小范围暴露，可控 |
| 回滚 | 切回旧环境即可 | 降低流量比例或关闭 Feature Flag |
| 适用场景 | 需要快速回滚、资源充足 | 需要观察用户真实反馈 |
| 前端实现 | CDN 双版本、Edge 路由 | 功能开关、AB Test、灰度网关 |

前端组合使用示例：

```text
日常迭代：
  1. 通过 Feature Flag 在现网小范围开启新功能（金丝雀）
  2. 观察指标，逐步放大到 100%
  3. 清理开关，代码中保留主逻辑

重大改版：
  1. 部署新版本到绿环境
  2. 切 5% 流量到绿环境（金丝雀 + 蓝绿）
  3. 验证通过全量切绿，旧环境保留观察期
  4. 观察期后回收旧环境
```

**最佳实践**：
- 前端静态资源使用版本化路径，避免缓存污染。
- API 变更遵循兼容性原则，避免新版本调用旧接口失败。
- 结合 SRE 的 SLO/SLI，设定明确的通过/回滚标准。

**评分维度**：
- 原理对比（40%）：能清晰区分两种部署方式
- 优缺点分析（30%）：能从资源、风险、回滚等角度分析
- 组合落地（30%）：能给出前端与 Feature Flag、CDN 结合的方案

**常见错误**：
- 认为蓝绿和金丝雀互斥，不能组合。
- 忽略前端静态资源缓存对回滚的影响。
- 只切换流量，不验证后端接口兼容性。

**延伸追问**：
- 蓝绿部署下前端版本切换如何实现零缓存问题？
- 如果新版本依赖新的后端接口，灰度时如何兼容？

**相关题目**：
- [FB-28-SC-P-021 灰度发布质量保障](#FB-28-SC-P-021)
- [FB-28-SD-R-031 生产发布策略](#FB-28-SD-R-031)

**参考资源**：
- [Martin Fowler - BlueGreenDeployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Canary Release](https://martinfowler.com/bliki/CanaryRelease.html)

**口头回答版**：
> 蓝绿部署是准备两套环境，新版验证完一次性切换流量，旧环境保留方便秒回滚，但资源占用高。金丝雀是逐步放量，比如 1%、5%、20%，风险分散但需要时间观察。前端发布我常把它们和 Feature Flag、CDN 版本路径结合：小功能用 Feature Flag 金丝雀；大改版用蓝绿部署，先切小流量验证，再全量切新环境。一定要注意静态资源缓存和 API 兼容性，不然回滚也可能失效。

---

### FB-28-SC-P-023：故障演练与混沌工程在前端如何落地？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：28 质量保障、30 可观测性
**标签**：混沌工程、故障演练、韧性、可观测性、SRE
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明混沌工程（Chaos Engineering）的核心理念，并给出前端可以开展的故障演练类型和实施步骤。

**参考答案**：

**核心要点**：混沌工程通过在生产或准生产环境主动注入故障，验证系统在异常下的韧性，而不是等问题发生后再被动修复。

**详细解释**：

核心理念（Netflix Principles）：

1. 建立稳态假设（Define Steady State）。
2. 假设真实环境会失效。
3. 在生产环境引入真实但可控的故障。
4. 最小化爆炸半径（Blast Radius）。
5. 持续自动化运行。

前端可演练的故障类型：

| 故障类型 | 注入方式 | 观察指标 |
|----------|----------|----------|
| API 延迟/超时 | MSW、Chaos Mesh、Proxy | 降级 UI、超时提示、重试次数 |
| API 错误 | Mock 5xx/4xx | 错误边界、兜底页面、用户提示 |
| 网络中断 | Chrome DevTools、Throttling | 离线提示、缓存命中、队列行为 |
| CDN/资源失败 | 拦截或阻塞部分资源 | 白屏率、fallback 策略 |
| 浏览器异常 | 内存泄漏、长任务 | FPS、INP、崩溃率 |
| 第三方脚本故障 | 屏蔽或延迟加载 | 页面功能影响范围 |

实施步骤：

```text
1. 识别关键用户路径（登录、下单、支付）
2. 定义稳态指标（成功率、错误率、LCP）
3. 选择可控故障和最小爆炸半径
4. 在预发或生产小范围注入
5. 观察监控、日志、用户反馈
6. 修复薄弱环节并自动化回归
```

示例：MSW 模拟 API 超时

```ts
import { http, HttpResponse, delay } from 'msw';

export const chaosHandlers = [
  http.get('/api/orders', async () => {
    await delay('infinite'); // 模拟超时
    return HttpResponse.error();
  }),
];
```

**最佳实践**：
- 永远有终止开关（Abort Switch），一旦影响真实用户立即停止。
- 故障演练要有值班、回滚和公告机制。
- 与可观测性结合，确保能实时看到影响面。

**评分维度**：
- 理念理解（30%）：能说出稳态假设、爆炸半径、生产演练
- 前端场景（40%）：能列举 4 类以上前端可演练故障
- 实施步骤（30%）：能给出可落地的步骤和终止机制

**常见错误**：
- 把混沌工程等同于随机搞破坏。
- 在没有监控和回滚能力的情况下做生产演练。
- 只演练后端，忽略前端对网络、CDN、第三方依赖的脆弱点。

**延伸追问**：
- 如何评估一次故障演练是否成功？
- 前端错误边界（Error Boundary）在故障演练中起什么作用？

**相关题目**：
- [FB-28-SC-P-021 灰度发布质量保障](#FB-28-SC-P-021)
- [FB-28-SD-R-032 构建韧性工程质量体系](#FB-28-SD-R-032)

**参考资源**：
- [Principles of Chaos Engineering](https://principlesofchaos.org/)
- [Chaos Mesh](https://chaos-mesh.org/)

**口头回答版**：
> 混沌工程不是乱搞，而是主动往系统里注入可控故障，看系统能不能扛住。前端可以演练的故障包括 API 超时、5xx、网络断开、CDN 资源失败、第三方脚本挂掉等。实施时先定好关键用户路径和稳态指标，比如成功率、LCP，然后小范围注入，实时看监控，一有异常就停。一定要有终止开关和回滚方案，最好在预发先跑。

---

### FB-28-EN-P-024：如何设计质量门禁？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：28 质量保障、12 CI/CD
**标签**：质量门禁、Sonar、覆盖率、CI/CD、静态分析
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一套前端质量门禁（Quality Gate），说明包含哪些检查项、阈值设定原则和失败处理策略。

**参考答案**：

**核心要点**：质量门禁是代码进入主干或发布前的自动检查集合，应在速度与质量之间平衡，并随项目成熟度动态演进。

**详细解释**：

质量门禁层级：

| 层级 | 检查项 | 工具示例 | 失败策略 |
|------|--------|----------|----------|
| 本地提交前 | Prettier、ESLint、类型检查、单测 | husky、lint-staged | 阻塞提交 |
| MR/PR | 全量静态检查、单测、覆盖率、构建 | GitHub Actions、GitLab CI | 禁止合并 |
| 预发环境 | 集成测试、E2E 核心路径、安全扫描 | SonarQube、Snyk、Trivy | 禁止部署 |
| 生产发布 | 灰度指标、监控告警、人工审批 | 发布平台、可观测系统 | 禁止全量 |

阈值设定原则：

- **分层**：核心模块 > 通用模块 > UI/配置。
- **增量优先**：新增代码覆盖率高于全量，避免老代码拖后腿。
- **渐进收紧**：新项目直接 strict，老项目分阶段提升。
- **可量化**：用 SonarQube 指标如 bugs、vulnerabilities、code smells、duplications。

示例：SonarQube Quality Gate

```yaml
# sonar-project.properties
sonar.qualitygate.wait=true
sonar.coverage.exclusions=**/*.stories.tsx,**/*.test.ts
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

```text
Quality Gate 条件：
- Coverage ≥ 70%
- Duplicated Lines ≤ 3%
- Maintainability Rating ≥ A
- Reliability Rating ≥ A
- Security Rating ≥ A
- 0 New Blocker/Critical Issues
```

失败处理：

- 立即阻断合并/发布。
- 生成报告，标注责任人和修复期限。
- 对老项目遗留问题建立豁免清单，限期清理。

**最佳实践**：
- 不要把所有规则一次性设死，避免团队抵触。
- 质量门禁要与奖励机制结合，鼓励提升而非惩罚。
- 定期 review 阈值，根据线上质量数据调整。

**评分维度**：
- 门禁层级（40%）：能设计本地/MR/预发/生产多层门禁
- 阈值设计（30%）：能给出分层、增量、渐进收紧原则
- 工具与治理（30%）：能结合 Sonar、ESLint、覆盖率、CI

**常见错误**：
- 只在 CI 卡 Lint，不卡测试和覆盖率。
- 阈值一刀切，导致无法落地。
- 门禁失败后没有修复责任人机制。

**延伸追问**：
- 老项目遗留大量 Sonar 告警，如何推动修复？
- 质量门禁会不会拖慢交付？如何平衡？

**相关题目**：
- [FB-28-CO-B-008 测试覆盖率指标](#FB-28-CO-B-008)
- [FB-28-EN-A-015 CI 质量流水线](#FB-28-EN-A-015)

**参考资源**：
- [SonarQube Quality Gates](https://docs.sonarqube.org/latest/user-guide/quality-gates/)
- [CI/CD Quality Gates](https://www.redhat.com/architect/ci-cd-quality-gates)

**口头回答版**：
> 质量门禁就是代码进主干或发布前必须过的自动检查。我一般会分四层：本地提交前用 husky 卡 Prettier、ESLint、类型和单测；MR 时 CI 卡全量静态检查、单元测试、增量覆盖率、构建；预发环境跑集成和 E2E、安全扫描；生产发布看灰度指标和监控。阈值要分层，新增代码比老代码严，核心模块比 UI 层严。老项目别一刀切，可以分阶段收紧，给豁免清单限期清理。

---

## 架构题（64 道）{#architect}

### FB-28-SD-R-025：如何为一家中型互联网公司设计前端质量保障体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：28 质量保障
**标签**：质量保障、测试策略、CI/CD、架构设计、质量文化
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
假设你负责一家中型互联网公司前端团队的质量保障体系建设，请从组织、流程、技术三个维度给出整体方案。

**参考答案**：

**核心要点**：前端质量保障体系应覆盖“防、测、控、治”四个环节：防是规范和工具，测是分层自动化，控是发布和门禁，治是度量和复盘。

**详细解释**：

一、组织维度

| 措施 | 说明 |
|------|------|
| 质量负责人 | 各业务线设 QA/TL 负责质量策略落地 |
| 代码所有者 | 核心模块明确 Owner，负责评审和事故复盘 |
| 质量文化 | 鼓励写测试、分享故障案例、设立质量改进奖 |
| 培训机制 | 定期举办测试工作坊、混沌演练 |

二、流程维度

```text
需求评审 → 技术方案评审（含测试方案） → 开发（TDD/单元测试）
  → 代码评审 → CI 质量门禁 → 预发集成/E2E → 灰度发布 → 线上监控 → 复盘
```

关键流程：
- 技术方案必须包含可测试性设计、测试范围和回滚方案。
- 代码合并前至少 1 人评审通过，关键模块 2 人。
- 线上事故 24h 内复盘，输出改进项。

三、技术维度

```text
静态检查层：ESLint、Prettier、Stylelint、TypeScript、SonarQube
单元/集成层：Vitest + React Testing Library + MSW
E2E 层：Playwright/Cypress 覆盖核心路径
契约层：Pact 保证前后端接口一致
视觉层：Chromatic/Percy 覆盖组件库关键状态
发布层：Feature Flag + 灰度/金丝雀 + 一键回滚
监控层：Sentry + 可观测平台 + 业务指标告警
```

度量指标：

- 交付类：构建成功率、MR 合并周期、发布频率。
- 质量类：线上故障数、MTTR、缺陷逃逸率、测试覆盖率。
- 效率类：CI 平均耗时、Flaky Test 率、自动化节省人天。

**最佳实践**：
- 从痛点出发，先解决最影响效率的问题，而不是一次性建全体系。
- 平台化：统一测试脚手架、Mock 平台、发布平台、监控平台。
- 把质量指标纳入团队 OKR，但避免唯指标论。

**评分维度**：
- 体系完整性（40%）：能从组织、流程、技术三维度展开
- 技术深度（30%）：能结合前端特点给出分层测试和发布策略
- 可落地性（30%）：能量化指标、分阶段建设、避免过度设计

**常见错误**：
- 只谈工具，不谈组织和流程。
- 一上来就追求 100% 覆盖和全量 E2E。
- 忽略度量与持续改进。

**延伸追问**：
- 如何说服业务方投入时间写测试？
- 质量体系和交付速度如何平衡？

**相关题目**：
- [FB-28-EN-P-024 质量门禁设计](#FB-28-EN-P-024)
- [FB-28-SD-R-032 构建韧性工程质量体系](#FB-28-SD-R-032)

**参考资源**：
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/)
- [Accelerate - DORA Metrics](https://dora.dev/)

**口头回答版**：
> 我会从组织、流程、技术三个维度来建。组织上设质量负责人和模块 Owner，营造质量文化；流程上让测试方案进入技术评审，代码必须评审，CI 设门禁，上线后灰度并复盘；技术上分层：静态检查、单元/集成、E2E、契约、视觉回归，再结合 Feature Flag、灰度、监控和一键回滚。度量指标包括线上故障数、MTTR、缺陷逃逸率、CI 耗时。关键是先从最痛的点开始，逐步建，不要一上来就铺大全量。

---

### FB-28-SD-R-026：微前端或 Monorepo 场景下如何制定测试策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：28 质量保障、11 Monorepo、26 微前端
**标签**：微前端、Monorepo、测试策略、CI/CD、架构
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请为微前端或 Monorepo 架构设计一套测试策略，说明如何平衡全量测试与增量测试、如何处理子应用/包之间的集成。

**参考答案**：

**核心要点**：大粒度前端架构的测试策略核心是用“影响面分析”减少无效测试，用契约/集成测试保证模块协作，用统一工具链降低维护成本。

**详细解释**：

Monorepo 测试策略：

| 层级 | 策略 | 工具 |
|------|------|------|
| 单包测试 | 只测变更包及其依赖包 | Nx affected、Turborepo pipeline |
| 依赖图分析 | 基于依赖图确定测试范围 | `nx affected:test` |
| 集成测试 | 对共享包、公共 API 做集成 | Vitest workspace、Jest projects |
| 全量回归 |  nightly 或发布前全量跑 | CI schedule |
| 缓存 | 测试结果和构建产物缓存 | Turborepo Remote Cache、Nx Cache |

微前端测试策略：

| 层级 | 关注点 |
|------|--------|
| 子应用独立测试 | 每个微应用单独跑单元/集成/E2E |
| 基座测试 | 验证路由、生命周期、全局状态、通信机制 |
| 集成测试 | 组合多个子应用的关键用户路径 |
| 契约测试 | 子应用与基座、子应用之间的接口契约 |
| E2E | 在主应用内跑端到端，覆盖跨子应用流程 |

示例：Nx affected 命令

```json
{
  "scripts": {
    "test:affected": "nx affected -t test --base=origin/main --head=HEAD",
    "lint:affected": "nx affected -t lint --base=origin/main --head=HEAD",
    "build:affected": "nx affected -t build --base=origin/main --head=HEAD"
  }
}
```

微前端集成测试：

```ts
// 验证子应用挂载与卸载
test('micro-app lifecycle', async () => {
  const container = document.createElement('div');
  await mountMicroApp('order', container);
  expect(container.innerHTML).toContain('Order Module');
  await unmountMicroApp('order', container);
  expect(container.innerHTML).toBe('');
});
```

**最佳实践**：
- 变更时只测受影响包， nightly 跑全量。
- 共享库提高单元测试和分支覆盖要求。
- 子应用之间用契约测试约定通信协议和全局数据。
- E2E 在 Monorepo 中按项目拆分，避免一次性跑全量。

**评分维度**：
- 增量测试设计（40%）：能说清 affected、依赖图、缓存策略
- 集成策略（30%）：能说明子应用独立测试与组合测试
- 工具与治理（30%）：能结合 Nx/Turborepo、契约测试、CI 分层

**常见错误**：
- 任何改动都跑全量测试，导致 CI 极慢。
- 只测单个子应用，忽略基座和跨应用流程。
- 缺少共享包的契约约束，导致升级破坏下游。

**延伸追问**：
- 微前端子应用版本独立发布，E2E 如何选基线？
- Monorepo 中如何防止一个包的测试污染另一个包？

**相关题目**：
- [FB-28-CO-A-011 契约测试](#FB-28-CO-A-011)
- [FB-28-CD-A-016 手写测试数据工厂](#FB-28-CD-A-016)

**参考资源**：
- [Nx Affected Commands](https://nx.dev/features/run-tasks#run-tasks-affected-by-a-pr)
- [Micro Frontends Testing](https://martinfowler.com/articles/micro-frontends.html#Testing)

**口头回答版**：
> Monorepo 关键是增量测试，用 Nx 或 Turborepo 分析依赖图，只跑受影响的包和依赖它的包，结果缓存起来，nightly 再跑全量。微前端则每个子应用独立测，然后测基座生命周期、路由和全局通信，再用契约测试约定子应用之间接口，最后 E2E 跑跨应用主流程。这样能避免任何小改动都跑全量，同时保证模块协作不出问题。

---

### FB-28-CP-R-027：如何评估自动化测试的 ROI？有哪些常见反模式？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：28 质量保障
**标签**：自动化、ROI、测试反模式、工程化、质量文化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何评估前端自动化测试的投入产出比（ROI），并列举团队中常见的测试反模式及应对策略。

**参考答案**：

**核心要点**：自动化测试 ROI = 节省的人工成本 + 线上故障损失降低 + 发布信心提升 - 编写与维护成本。应持续度量并清理负收益测试。

**详细解释**：

ROI 评估维度：

| 维度 | 度量指标 |
|------|----------|
| 收益 | 回归节省人天、缺陷逃逸率下降、发布频率提升、MTTR 缩短 |
| 成本 | 写测试时间、维护时间、CI 运行时间、调试 flaky 时间 |
| 风险 | 测试覆盖不足导致的线上故障损失 |

评估方法：

```text
1. 选定核心用户路径作为基线
2. 统计上线前人工回归耗时 vs 自动化运行耗时
3. 统计自动化发现的历史 bug 数和线上逃逸数
4. 计算 CI 运行成本和人员维护成本
5. 定期 review：哪些测试长期稳定且发现过问题？哪些只消耗成本？
```

常见反模式：

| 反模式 | 表现 | 应对 |
|--------|------|------|
| 测试直升机 | 测试只验证 happy path，不触边界 | 补边界、错误分支、异常输入 |
| 脆弱的 E2E | 一改动页面就批量失败 | 用 data-testid、稳定选择器、减少 E2E 数量 |
| 测试重复 | 同一逻辑在单元/集成/E2E 重复验证 | 按金字塔分层，避免重复 |
|  Mock 过度 | 所有依赖都 Mock，测不到真实问题 | 关键路径保留集成/E2E |
| 测试僵尸 | 代码已删但测试还在，长期失败被忽略 | 定期清理与代码同步 |
| 覆盖迷信 | 只追数字，断言无意义 | 看分支覆盖 + 变异测试 |

**最佳实践**：
- 建立测试资产台账，标注价值、稳定性、维护成本。
- 对 ROI 低的测试进行重构、降级或删除。
- 把测试设计纳入技术方案评审，避免事后补测试。

**评分维度**：
- ROI 框架（40%）：能给出多维收益与成本评估方法
- 反模式识别（30%）：能列举 4 个以上反模式并给出应对
- 治理思路（30%）：能提出测试资产 review、持续清理机制

**常见错误**：
- 只计算写测试时间，忽略维护和 flaky 成本。
- 认为测试越多越好，不删除无价值测试。
- 用 ROI 为借口拒绝写测试。

**延伸追问**：
- 如何向管理层证明自动化测试值得投入？
- 一个测试运行稳定但从来没发现过 bug，是否该删除？

**相关题目**：
- [FB-28-CO-P-018 测试覆盖率陷阱](#FB-28-CO-P-018)
- [FB-28-SD-R-025 设计前端质量保障体系](#FB-28-SD-R-025)

**参考资源**：
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)

**口头回答版**：
> 自动化测试 ROI 要看收益和成本。收益包括省掉的人工回归时间、线上 bug 减少、发布更快；成本包括写测试、维护、CI 运行和修 flaky 的时间。我会定期 review 测试资产，看哪些测试稳定且发现过问题保留，哪些长期没价值就重构或删掉。常见反模式有：只测 happy path、E2E 太脆弱、同一逻辑重复测、Mock 过度、测试僵尸、只看覆盖率数字。关键是不要为了写测试而写测试。

---

### FB-28-SD-R-028：如何架构大规模 E2E 测试的并行与稳定性？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：28 质量保障
**标签**：E2E、并行、稳定性、架构、Playwright
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请设计一套可支撑数百条 E2E 用例、每日多次运行的测试架构，重点解决并行执行、稳定性、失败诊断和资源成本问题。

**参考答案**：

**核心要点**：大规模 E2E 需要通过测试分层、并行调度、独立数据、失败隔离和诊断平台来平衡速度与稳定性。

**详细解释**：

整体架构：

```text
CI 触发
  → 用例集拆分（按标签/文件/时长）
  → 多个 Worker/容器并行执行
  → 独立测试数据与账号池
  → 结果聚合与 flaky 检测
  → 失败自动重试 + 诊断报告
  → 历史趋势分析与用例分级
```

关键设计：

| 问题 | 方案 |
|------|------|
| 并行慢 | 按文件或时长分片；Playwright sharding；Kubernetes Job |
| 数据冲突 | 每个 worker 分配独立账号/租户/测试数据 |
| 不稳定 | 自动重试、web-first 断言、统一选择器、禁用动画 |
| 诊断难 | 保存 trace、video、HAR、console、network log |
| 成本高 | 只对核心流程跑全量，其他按变更影响选跑 |
| 用例膨胀 | 按 P0/P1/P2 分级，P0 必须过，P1/P2 可异步 |

示例：Playwright 分片

```ts
// playwright.config.ts
export default defineConfig({
  workers: 4,
  shard: {
    total: parseInt(process.env.CI_SHARD_TOTAL || '1'),
    current: parseInt(process.env.CI_SHARD_INDEX || '0'),
  },
});
```

测试数据池：

```ts
// 从池中获取隔离账号
const account = await testAccountPool.acquire();
try {
  await runTest(account);
} finally {
  await testAccountPool.release(account);
}
```

失败诊断平台：

- 聚合失败用例、失败原因分类（选择器、网络、数据、环境）。
- 自动标记 flaky 率，触发修复任务。
- 支持按 commit/branch 回溯。

**最佳实践**：
- E2E 用例按业务域拆分到不同项目，避免全部串行。
- 关键路径每日跑全量，长尾流程每周跑或按需跑。
- 建立 E2E 稳定性 Owner，定期清理 top flaky 用例。

**评分维度**：
- 并行架构（40%）：能说出分片、worker、数据隔离方案
- 稳定性治理（30%）：能提到重试、选择器、数据池、分级
- 诊断与成本（30%）：能给出 trace 诊断、用例分级、成本优化

**常见错误**：
- 所有用例串行跑，CI 时间无法接受。
- 多个 worker 共用账号导致互相影响。
- 失败不保存诊断信息，无法定位。

**延伸追问**：
- 如何在多浏览器矩阵下进一步降低成本？
- E2E 用例分级的标准是什么？

**相关题目**：
- [FB-28-PE-P-019 提升 E2E 稳定性](#FB-28-PE-P-019)
- [FB-28-CP-R-027 自动化测试 ROI](#FB-28-CP-R-027)

**参考资源**：
- [Playwright Sharding](https://playwright.dev/docs/test-sharding)
- [Google Testing Blog - Test Flakiness](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html)

**口头回答版**：
> 大规模 E2E 要先把用例拆片并行跑，比如 Playwright 的 sharding，多个容器同时跑。每个 worker 要有独立账号和数据池，避免互相污染。稳定性上统一用 data-testid、自动等待、禁用动画、失败自动重试。诊断要保留 trace、视频、HAR 和 console。成本方面按 P0/P1/P2 分级，核心流程每次跑，长尾每周跑，失败结果聚合分析，定期清理 flaky 用例。

---

### FB-28-CP-R-029：如何建立全链路质量度量体系？DORA 指标如何应用？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：28 质量保障、38 团队领导力
**标签**：DORA、质量度量、DevOps、工程效能、数据驱动
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何从前端视角建立全链路质量度量体系，并解释 DORA 四个核心指标在质量改进中的作用。

**参考答案**：

**核心要点**：质量度量应覆盖交付效率、交付质量、系统稳定性和团队能力四个象限，用数据驱动改进，而不是为了排名。

**详细解释**：

DORA 核心指标：

| 指标 | 含义 | 前端应用 |
|------|------|----------|
| 部署频率（Deployment Frequency） | 单位时间发布次数 | 前端独立部署能力、CDN 发布次数 |
| 变更前置时间（Lead Time for Changes） | 从代码提交到上线时间 | CI 耗时、构建速度、MR 合并周期 |
| 变更失败率（Change Failure Rate） | 导致故障的发布占比 | 发布后回滚/热修比例 |
| 服务恢复时间（MTTR） | 故障发生后恢复时间 | 一键回滚、CDN 刷新、Feature Flag 关闭速度 |

前端质量度量指标体系：

```text
交付效率：构建时长、CI 排队时间、MR 合并周期、自动化率
交付质量：线上缺陷数、缺陷逃逸率、测试覆盖率、E2E 通过率
系统稳定：JS 错误率、白屏率、资源加载失败率、LCP/CLS
工程能力：Flaky Test 率、代码重复率、技术债占比、单测占比
```

建立步骤：

1. **定义目标**：例如降低缺陷逃逸率 30%。
2. **选取指标**：目标导向，避免指标过多。
3. **数据采集**：CI 平台、APM、Sentry、发布系统、代码仓库。
4. **可视化**：Dashboard 展示趋势、同比、环比。
5. **复盘改进**：双周质量会议，针对异常指标制定行动项。

**最佳实践**：
- 指标要与团队目标对齐，避免“刷指标”。
- 核心指标公开透明，但不要用单一指标考核个人。
- 定期审视指标有效性，淘汰失去敏感度的指标。

**评分维度**：
- DORA 理解（30%）：能解释四个指标及前端映射
- 指标体系（40%）：能构建覆盖效率/质量/稳定的度量框架
- 数据驱动（30%）：能说明采集、可视化、复盘闭环

**常见错误**：
- 只度量覆盖率、bug 数等滞后指标，忽略效率指标。
- 指标过多导致团队无所适从。
- 用指标进行个人排名，破坏协作文化。

**延伸追问**：
- 如何防止团队为了指标而指标？
- 质量度量和研发效能度量有什么区别？

**相关题目**：
- [FB-28-EN-P-024 质量门禁设计](#FB-28-EN-P-024)
- [FB-28-SS-R-030 Bug 管理与复盘机制](#FB-28-SS-R-030)

**参考资源**：
- [DORA Metrics](https://dora.dev/guides/dora-metrics-four-keys/)
- [Accelerate Book](https://itrevolution.com/accelerate-book/)

**口头回答版**：
> 全链路质量度量我会从交付效率、交付质量、系统稳定、工程能力四个象限定指标。DORA 四个指标很经典：部署频率、变更前置时间、变更失败率、恢复时间。前端可以映射成发布次数、CI 和 MR 周期、发布后回滚比例、一键回滚速度。具体指标比如线上缺陷数、缺陷逃逸率、JS 错误率、E2E 通过率、Flaky Test 率。关键是数据要可视化、定期复盘，指标和目标对齐，别拿来 ranking 个人。

---

### FB-28-SS-R-030：如何设计 Bug 管理与复盘机制？

**题型**：软技能题 / 场景设计题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：28 质量保障、41 项目管理
**标签**：Bug 管理、复盘、团队、流程、质量文化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一套适合前端团队的 Bug 管理与线上事故复盘机制，说明分级、流转、复盘模板和防止复发的措施。

**参考答案**：

**核心要点**：Bug 管理应以“快速止血、根因修复、知识沉淀、防止复发”为目标，把事故复盘当作改进系统的机会。

**详细解释**：

Bug 分级：

| 级别 | 定义 | 响应时间 | 示例 |
|------|------|----------|------|
| P0 | 核心功能不可用，大面积用户受影响 | 立即响应，1h 内修复 | 支付无法完成、白屏 |
| P1 | 重要功能受影响，有 workaround | 当天修复 | 部分表单提交失败 |
| P2 | 一般体验问题 | 排期内修复 | UI 错位、文案错误 |
| P3 | 建议优化 |  backlog | 性能优化、交互改进 |

流转状态：

```text
新建 → 确认 → 处理中 → 待验证 → 关闭
        ↓
      重复/非缺陷/挂起
```

复盘模板（5 Whys + 改进项）：

```markdown
1. 事故现象与影响面
2. 时间线：发现、定位、止血、修复、验证
3. 根因分析（至少问到第 5 个 Why）
4. 改进项：技术、流程、工具、培训
5. 责任人 + 完成时间
6. 经验沉淀：更新 checklist、测试用例、SOP
```

防止复发：

- **测试左移**：把事故场景补为单元/E2E 用例。
- **监控告警**：关键路径增加业务/技术指标告警。
- **发布策略**：增加灰度、Feature Flag、回滚能力。
- **知识库**：建立“故障案例库”，新人培训必学。

**最佳实践**：
- 线上事故 24h 内复盘，P0 事故 2h 内止血。
- 复盘不追责，聚焦系统和流程改进。
- 改进项要可验收，纳入迭代跟踪。

**评分维度**：
- 分级与流转（30%）：能给出合理分级和状态机
- 复盘方法（35%）：能使用时间线、5 Whys、改进项模板
- 防复发机制（35%）：能结合测试、监控、发布策略形成闭环

**常见错误**：
- 复盘变成追责大会，导致成员隐瞒问题。
- 只修 bug 不补测试，同样问题反复出现。
- 改进项没有责任人和 deadline，流于形式。

**延伸追问**：
- 如何平衡修复线上 bug 和交付新需求？
- 如果同一个根因反复出现，说明什么问题？

**相关题目**：
- [FB-28-SC-P-021 灰度发布质量保障](#FB-28-SC-P-021)
- [FB-28-CP-R-029 全链路质量度量](#FB-28-CP-R-029)

**参考资源**：
- [Google SRE - Postmortem Culture](https://sre.google/sre-book/postmortem-culture/)
- [Blameless Postmortems](https://www.etsy.com/codeascraft/blameless-postmortems/)

**口头回答版**：
> Bug 管理我会先分级：P0 是核心功能挂了必须立即修，P1 重要功能有 workaround 当天修，P2 一般问题排期修，P3 建议优化 backlog。复盘模板包括现象、时间线、根因用 5 Whys、改进项、责任人和 deadline。复盘不追责，重点是防止复发：把事故场景补成测试、加监控告警、发布加灰度和回滚、沉淀到故障案例库。P0 事故 2h 内止血，24h 内复盘。

---

### FB-28-SD-R-031：如何设计一套生产环境发布策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：28 质量保障、22 部署与 SRE
**标签**：发布策略、蓝绿、金丝雀、灰度、DevOps
**出现频率**：高频
**预计回答时长**：15-25 分钟

**题目描述**：
请为一款日活百万级的 Web 应用设计生产环境发布策略，综合考虑回滚能力、灰度控制、成本、前端特性。

**参考答案**：

**核心要点**：生产发布策略应实现“可灰度、可监控、可回滚、可审计”，前端重点关注静态资源版本化、Feature Flag、CDN 缓存和浏览器兼容性。

**详细解释**：

发布策略分层：

```text
1. 开发环境：每次提交自动部署预览
2. 测试环境：每日自动集成，跑全量自动化测试
3. 预发环境：镜像生产配置，运行核心 E2E 和性能基线
4. 生产灰度：1% → 10% → 50% → 100%，按用户/地域/业务线
5. 全量发布：灰度通过后切换默认版本
6. 监控与回滚：关键指标异常触发自动/人工回滚
```

前端关键技术：

| 技术 | 作用 |
|------|------|
| 版本化资源路径 | `/static/v1.2.3/app.js`，避免缓存污染 |
| HTML 入口控制 | 通过网关/Edge 决定返回哪个版本的 HTML |
| Feature Flag | 同一版本内按用户灰度功能 |
| Service Worker | 控制缓存更新和离线回滚 |
| CDN 预热/刷新 | 新版本资源提前分发，回滚时切换路径 |

灰度通过标准示例：

```text
- 5 分钟内 JS 错误率增幅 < 0.05%
- API 失败率无异常跳升
- 核心转化率波动在 ±2% 以内
- 页面加载时间（LCP）劣化 < 10%
- 客诉量无显著上升
```

回滚方案：

1. **最快**：关闭 Feature Flag，秒级生效。
2. **较快**：切换网关/Edge 默认版本号，用户访问旧 HTML。
3. **兜底**：重新部署上一版本。

**最佳实践**：
- 发布窗口避开业务高峰，重要发布需双人复核。
- 所有发布操作留痕，便于审计和回溯。
- 发布后保留旧版本资源一段时间，确保回滚可用。

**评分维度**：
- 发布流程（40%）：能从开发到生产全链路设计
- 前端技术细节（30%）：能结合版本化、Feature Flag、CDN、Service Worker
- 回滚与监控（30%）：能给出分级回滚和灰度通过标准

**常见错误**：
- 新版本直接覆盖旧 CDN 资源，导致无法回滚。
- 灰度只按比例，不观察业务指标。
- 发布策略只关注后端，忽略前端缓存和浏览器特性。

**延伸追问**：
- 如何处理浏览器缓存导致的版本不一致？
- 如果发布到 50% 发现核心指标异常，如何快速定位是新版本还是旧版本问题？

**相关题目**：
- [FB-28-SC-P-021 灰度发布质量保障](#FB-28-SC-P-021)
- [FB-28-SC-P-022 蓝绿与金丝雀部署](#FB-28-SC-P-022)

**参考资源**：
- [AWS Blue/Green Deployments](https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/blue-green-deployments.html)
- [Feature Flags Best Practices](https://docs.launchdarkly.com/home/getting-started/feature-flags)

**口头回答版**：
> 生产发布策略要做到可灰度、可监控、可回滚、可审计。前端关键是资源版本化，HTML 入口由网关控制，功能用 Feature Flag，CDN 做预热和切换。发布时从 1% 逐步放量，观察 JS 错误率、API 失败率、转化率、LCP 和客诉。回滚优先关 Feature Flag，其次切网关版本，最后重新部署。发布窗口避开高峰，操作留痕，旧版本资源保留一段时间。

---

### FB-28-SD-R-032：如何构建韧性工程质量体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：专家 / 架构师
**面试知识域**：28 质量保障、30 可观测性
**标签**：韧性工程、混沌工程、SRE、质量文化、可观测性
**出现频率**：中频
**预计回答时长**：15-25 分钟

**题目描述**：
请从系统韧性角度设计一套前端工程质量体系，说明如何识别脆弱点、注入故障、验证恢复能力并形成持续改进闭环。

**参考答案**：

**核心要点**：韧性工程质量体系不仅关注“不出错”，更关注“出错后快速恢复”，通过可观测性、混沌演练、降级设计和组织文化实现。

**详细解释**：

体系架构：

```text
识别脆弱点
  → 设计防御与降级（错误边界、超时、重试、兜底）
  → 可观测性覆盖（日志、指标、链路、告警）
  → 故障演练验证（混沌工程、Game Day）
  → 复盘与改进（ADR、测试补齐、SLO 调整）
  → 文化落地（不追责、分享、持续学习）
```

脆弱点识别：

| 脆弱点 | 防御措施 |
|--------|----------|
| API 超时 | 设置合理 timeout、重试、超时降级 UI |
| 第三方脚本挂掉 | 异步加载、超时检测、功能降级 |
| CDN 故障 | 多 CDN、资源完整性校验、fallback 路径 |
| 浏览器崩溃 | 错误边界、状态恢复、崩溃上报 |
| 长任务阻塞 | 任务拆分、Scheduler、Web Worker |
| 单点发布 | 蓝绿/金丝雀、Feature Flag、一键回滚 |

可观测性设计：

```text
指标：LCP、INP、CLS、JS Error Rate、API Error Rate、资源失败率
日志：结构化日志，统一 traceId
链路：用户操作到 API 请求全链路追踪
告警：多维度阈值 + 异常检测 + 值班响应
```

混沌工程落地：

- 每月一次 Game Day，选择低风险时段。
- 从预发环境开始，逐步到生产小流量。
- 演练后必须输出改进项并跟踪。

组织文化：

- 奖励发现隐患和主动修复的行为。
- 复盘聚焦系统改进，不追责。
- 建立“韧性手册”，沉淀降级策略和应急预案。

**最佳实践**：
- 把韧性设计纳入技术方案评审，与功能同等重要。
- 关键路径必须有降级方案，避免单点失败导致全站不可用。
- 演练要真实，不要只在 PPT 上做。

**评分维度**：
- 韧性理念（30%）：能区分可靠性与韧性
- 技术设计（40%）：能给出防御、降级、可观测、演练方案
- 组织闭环（30%）：能说明文化、复盘、持续改进机制

**常见错误**：
- 只关注测试通过，不关注异常场景。
- 把混沌工程当成一次性的活动。
- 复盘时追责，导致团队隐瞒问题。

**延伸追问**：
- 韧性工程质量体系与传统 QA 体系有什么区别？
- 如何评估一个前端应用的韧性等级？

**相关题目**：
- [FB-28-SC-P-023 故障演练与混沌工程](#FB-28-SC-P-023)
- [FB-28-SD-R-025 设计前端质量保障体系](#FB-28-SD-R-025)

**参考资源**：
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/)
- [Chaos Engineering Book](https://www.oreilly.com/library/view/chaos-engineering/9781491983850/)

**口头回答版**：
> 韧性工程不是保证不出错，而是出错后能快速恢复。我会先识别脆弱点：API 超时、第三方脚本、CDN、浏览器崩溃等，然后设计防御和降级，比如错误边界、超时重试、兜底 UI。接着铺可观测性：性能指标、错误率、链路、日志、告警。再用混沌工程和 Game Day 主动注入故障验证恢复能力。最后复盘形成改进项，沉淀到韧性手册。文化上要不追责、奖励发现隐患，让团队从怕出错变成主动找脆弱点。
### FB-28-CO-A-015：前端质量保障体系包括哪些方面？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
前端质量保障体系包括哪些方面。

**参考答案**：

前端质量保障体系包括：

1. 代码质量：规范、审查、静态类型、架构约束。
2. 测试体系：单元测试、集成测试、E2E 测试、契约测试、视觉回归。
3. 发布与运维：灰度发布、监控告警、错误追踪、可观测性。
4. 持续改进：质量度量、复盘、流程优化。


**补充说明**：

在实际落地 前端质量保障体系包括哪些方面 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能系统覆盖多个方面（50%）
- 能说明各阶段重点（30%）
- 有整体性思维（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 前端质量保障体系包括： 1. 代码质量：规范、审查、静态类型、架构约束。 2. 测试体系：单元测试、集成测试、E2E 测试、契约测试、视觉回归。 3. 发布与运维：灰度发布、监控告警、错误追踪、可观测性。 4. 持续改进：质量度量、复盘、流程优化。

---

### FB-28-CO-A-016：测试金字塔是什么？前端如何实践？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
测试金字塔是什么？前端如何实践。

**参考答案**：

测试金字塔强调测试分层：底层是大量快速廉价的单元测试，中层是集成测试，顶层是少量昂贵的 E2E 测试。

前端实践：

- 单元测试：用 Jest/Vitest 测试工具函数、hooks、纯组件。
- 集成测试：用 React Testing Library 测试组件与状态、API 的组合。
- E2E 测试：用 Cypress/Playwright 测试登录、下单等核心流程。

**评分维度**：
- 理解金字塔结构（40%）
- 能对应前端测试类型（40%）
- 能说明比例建议（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 测试金字塔强调测试分层：底层是大量快速廉价的单元测试，中层是集成测试，顶层是少量昂贵的 E2E 测试。 前端实践： - 单元测试：用 Jest/Vitest 测试工具函数、hooks、纯组件。 - 集成测试：用 React Testing Library 测试组件与状态、API 的组合。 - E2E 测试：用 Cypress/Playwright 测试登录、下单等核心流程。

---

### FB-28-CO-A-017：单元测试应该覆盖哪些内容？什么不应该测？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
单元测试应该覆盖哪些内容？什么不应该测。

**参考答案**：

应该覆盖：

- 核心业务逻辑和算法。
- 边界条件和异常分支。
- 公共工具函数和 hooks。
- 组件的关键交互和渲染结果。

不应该测：

- 框架内部实现。
- 第三方库。
- 过于简单且无变化的代码（如纯样式）。
- 已经由 E2E 覆盖的完整流程细节。


**补充说明**：

在实际落地 单元测试应该覆盖哪些内容什么不应该测 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能清晰区分应测和不应测（50%）
- 有边界条件意识（30%）
- 能结合实际案例（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 应该覆盖： - 核心业务逻辑和算法。 - 边界条件和异常分支。 - 公共工具函数和 hooks。 - 组件的关键交互和渲染结果。

---

### FB-28-CP-A-001：E2E 测试有哪些优缺点？如何选择测试范围？

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
E2E 测试有哪些优缺点？如何选择测试范围。

**参考答案**：

优点：最接近真实用户、覆盖完整流程、能发现集成问题。

缺点：执行慢、成本高、不稳定（受网络、环境、时序影响）。

选择范围：优先覆盖核心业务流程，如登录、注册、下单、支付、关键表单提交。不要试图用 E2E 覆盖所有边界条件。


**补充说明**：

在实际落地 E2E 测试有哪些优缺点如何选择测试范围 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 优缺点分析清晰（40%）
- 能给出选择原则（40%）
- 有成本控制意识（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 优点：最接近真实用户、覆盖完整流程、能发现集成问题。 缺点：执行慢、成本高、不稳定（受网络、环境、时序影响）。 选择范围：优先覆盖核心业务流程，如登录、注册、下单、支付、关键表单提交。 不要试图用 E2E 覆盖所有边界条件。

---

### FB-28-CO-A-018：什么是契约测试？前端为什么需要它？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是契约测试？前端为什么需要它。

**参考答案**：

契约测试是验证服务提供方和消费方是否遵守共同接口约定的测试。前端需要它是因为：

- 前后端并行开发时，接口容易变化。
- 后端修改字段可能导致前端报错。
- 契约测试可以提前发现不兼容变更。

工具：Pact、Spring Cloud Contract。


**补充说明**：

在实际落地 契约测试前端为什么需要它 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能解释契约测试概念（40%）
- 能说明前端价值（40%）
- 能列举工具（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 契约测试是验证服务提供方和消费方是否遵守共同接口约定的测试。 前端需要它是因为： - 前后端并行开发时，接口容易变化。 - 后端修改字段可能导致前端报错。 - 契约测试可以提前发现不兼容变更。

---

### FB-28-CO-A-019：什么是灰度发布？前端如何实现？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是灰度发布？前端如何实现。

**参考答案**：

灰度发布是先把新版本发布给少量用户验证，稳定后再逐步扩大范围的发布策略。

前端实现：

- 按用户 ID hash 取模决定是否在灰度组。
- 按地域、设备、业务属性灰度。
- 通过配置中心或功能开关控制。

```javascript
function isGrayUser(userId, percent) {
  return hash(userId) % 100 < percent;
}
```

**评分维度**：
- 能解释灰度发布（30%）
- 能给出实现方式（40%）
- 能说明配套监控回滚（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 灰度发布是先把新版本发布给少量用户验证，稳定后再逐步扩大范围的发布策略。 前端实现： - 按用户 ID hash 取模决定是否在灰度组。 - 按地域、设备、业务属性灰度。 - 通过配置中心或功能开关控制。

---

### FB-28-CO-A-020：前端错误监控应该覆盖哪些类型？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
前端错误监控应该覆盖哪些类型。

**参考答案**：

应覆盖：

- JS 运行时错误。
- Promise 未捕获异常。
- 资源加载错误（JS/CSS/图片）。
- 接口错误。
- 自定义业务错误。
- 白屏/卡顿等体验问题。


**补充说明**：

在实际落地 前端错误监控应该覆盖哪些类型 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 类型全面（50%）
- 能说明上报信息（30%）
- 有经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 应覆盖： - JS 运行时错误。 - Promise 未捕获异常。 - 资源加载错误（JS/CSS/图片）。 - 自定义业务错误。

---

### FB-28-CO-A-021：可观测性是什么？前端如何实现？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
可观测性是什么？前端如何实现。

**参考答案**：

可观测性是通过日志、指标、链路追踪理解系统运行状态的能力。

前端实现：

- 日志：记录用户行为、错误、关键路径。
- 指标：Web Vitals、业务指标、错误率。
- 链路追踪：生成 trace ID，关联前后端请求。


**补充说明**：

在实际落地 可观测性是什么前端如何实现 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 理解可观测性三大支柱（40%）
- 能结合前端实现（40%）
- 有全链路意识（20%）

---
## 二、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 可观测性是通过日志、指标、链路追踪理解系统运行状态的能力。 前端实现： - 日志：记录用户行为、错误、关键路径。 - 指标：Web Vitals、业务指标、错误率。 - 链路追踪：生成 trace ID，关联前后端请求。

---

### FB-28-SD-P-001：如何设计一个高效的 Code Review 流程？

**题型**：系统设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何设计一个高效的 Code Review 流程。

**参考答案**：

流程设计：

1. 小批量提交，单次 Review 不超过 400 行。
2. 使用 Review Checklist：正确性、可读性、可测试性、性能、安全。
3. 明确 Reviewer 责任，避免流于形式。
4. 区分阻塞性问题和建议性问题。
5. 24 小时内响应 Review 请求。
6. 定期统计 Review 发现的问题类型，反哺培训和规范。
7. 鼓励正面反馈，营造学习型文化。


**补充说明**：

在实际落地 设计一个高效的 Code Review 流程 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 流程具体可执行（40%）
- 有 checklist 意识（30%）
- 有文化建设和反馈机制（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 流程设计： 1. 小批量提交，单次 Review 不超过 400 行。 2. 使用 Review Checklist：正确性、可读性、可测试性、性能、安全。 3. 明确 Reviewer 责任，避免流于形式。 4. 区分阻塞性问题和建议性问题。

---

### FB-28-CO-P-019：你如何保证前端代码的可测试性？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
你如何保证前端代码的可测试性。

**参考答案**：

方法：

1. 业务逻辑与 UI 分离。
2. 依赖注入，避免硬编码依赖。
3. 减少全局状态和副作用。
4. 函数纯化，输入输出明确。
5. 避免过深的组件嵌套和紧耦合。
6. 为复杂逻辑编写可独立测试的模块。


**补充说明**：

在实际落地 你如何保证前端代码的可测试性 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 方法全面（50%）
- 能结合架构设计（30%）
- 有实际经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 方法： 1. 业务逻辑与 UI 分离。 2. 依赖注入，避免硬编码依赖。 3. 减少全局状态和副作用。 4. 函数纯化，输入输出明确。

---

### FB-28-CO-P-020：代码覆盖率高是否等于代码质量高？为什么？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
代码覆盖率高是否等于代码质量高？为什么。

**参考答案**：

不等于。高覆盖率只说明测试执行了代码，但不说明测试有效。

反例：

- 测试没有断言，只是调用了一下函数。
- 测试覆盖了代码但忽略了边界条件。
- 测试大量覆盖简单 getter/setter，核心业务逻辑反而覆盖不足。

覆盖率是有用指标，但不能作为唯一目标。应关注测试的有效性和核心路径覆盖。

**评分维度**：
- 能明确区分（40%）
- 能举反例（30%）
- 能说明正确态度（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 高覆盖率只说明测试执行了代码，但不说明测试有效。 反例： - 测试没有断言，只是调用了一下函数。 - 测试覆盖了代码但忽略了边界条件。 - 测试大量覆盖简单 getter/setter，核心业务逻辑反而覆盖不足。

---

### FB-28-SC-P-024：线上出现 Bug 后，除了修复，你还应该做什么？

**题型**：场景设计题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
线上出现 Bug 后，除了修复，你还应该做什么。

**参考答案**：

1. 快速止损：回滚、降级、热修复。
2. 定位根因：日志、监控、复现路径。
3. 修复并验证：本地、测试环境、灰度环境。
4. 补充测试：增加回归测试，防止再次出错。
5. 复盘会议：分析原因、改进流程、明确 owner。
6. 更新文档：应急预案、排查手册。
7. 通知相关方：用户、客服、业务方。


**补充说明**：

在实际落地 线上出现 Bug 后，除了修复，你还应该做什么 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 流程完整（50%）
- 强调复盘和预防（30%）
- 有沟通意识（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 1. 快速止损：回滚、降级、热修复。 2. 定位根因：日志、监控、复现路径。 3. 修复并验证：本地、测试环境、灰度环境。 4. 补充测试：增加回归测试，防止再次出错。

---

### FB-28-CP-P-001：如何选择前端测试框架和工具？

**题型**：综合开放题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何选择前端测试框架和工具。

**参考答案**：

选择维度：

1. 团队技术栈（React/Vue/Angular）。
2. 测试类型需求（单元/集成/E2E）。
3. 执行速度和稳定性。
4. 生态与社区活跃度。
5. CI/CD 集成难度。
6. 学习成本。

常见组合：

- 单元/集成：Jest/Vitest + React Testing Library。
- E2E：Cypress、Playwright、Selenium。
- 视觉回归：Chromatic、Percy。
- 契约测试：Pact。

**评分维度**：
- 选择维度合理（40%）
- 能给出工具组合（40%）
- 不盲目追新（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 选择维度： 1. 团队技术栈（React/Vue/Angular）。 2. 测试类型需求（单元/集成/E2E）。 3. 执行速度和稳定性。 4. 生态与社区活跃度。

---

### FB-28-CO-P-021：什么是功能开关（Feature Toggle）？它和质量保障有什么关系？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
什么是功能开关（Feature Toggle）？它和质量保障有什么关系。

**参考答案**：

功能开关是在运行时控制功能开启或关闭的机制。它和质量保障的关系：

- 支持灰度发布，降低新功能风险。
- 支持 A/B 测试，验证功能效果。
- 出问题可快速关闭，无需重新发布。
- 支持持续集成，未完成代码可以先合并但关闭。


**补充说明**：

在实际落地 功能开关（Feature Toggle）它和质量保障有什么关系 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 理解功能开关（30%）
- 能说明与质量的关系（50%）
- 有实际使用经验（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 功能开关是在运行时控制功能开启或关闭的机制。 它和质量保障的关系： - 支持灰度发布，降低新功能风险。 - 支持 A/B 测试，验证功能效果。 - 出问题可快速关闭，无需重新发布。

---

### FB-28-CO-P-022：如何度量前端代码质量？

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：资深 / 架构
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：7-10 分钟

**题目描述**：
如何度量前端代码质量。

**参考答案**：

度量维度：

1. 代码规范合规率（Lint 错误数）。
2. 测试覆盖率（行/分支/函数）。
3. 圈复杂度和重复代码率。
4. 线上 Bug 数和 Bug 密度。
5. 平均修复时间（MTTR）。
6. 代码审阅发现的问题数。
7. 性能指标达标率。

注意：质量度量是辅助手段，不能替代工程师的判断。

**评分维度**：
- 维度全面（50%）
- 能量化指标（30%）
- 有正确态度（20%）

---
## 三、架构级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 度量维度： 1. 代码规范合规率（Lint 错误数）。 2. 测试覆盖率（行/分支/函数）。 3. 圈复杂度和重复代码率。 4. 线上 Bug 数和 Bug 密度。

---

### FB-28-SD-R-033：设计一个前端质量保障平台，你会包含哪些模块？

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
设计一个前端质量保障平台，你会包含哪些模块。

**参考答案**：

模块设计：

1. **代码质量模块**：Lint、类型检查、重复代码、复杂度分析。
2. **测试模块**：单元/集成/E2E 测试执行、覆盖率报告、测试趋势。
3. **发布模块**：CI/CD 流水线、灰度开关、版本管理。
4. **监控模块**：错误监控、性能监控、业务监控。
5. **可观测模块**：日志查询、链路追踪、指标看板。
6. **告警模块**：分级告警、on-call 管理、告警收敛。
7. **复盘模块**：事故记录、根因分析、改进跟踪。
8. **报表模块**：质量分数、趋势分析、团队排名。


**补充说明**：

在实际落地 设计一个前端质量保障平台，你会包含哪些模块 时，建议结合 单元测试、测试策略、E2E 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 模块设计全面（50%）
- 能说明模块间关系（30%）
- 有平台化思维（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 模块设计： 1. 代码质量模块：Lint、类型检查、重复代码、复杂度分析。 2. 测试模块：单元/集成/E2E 测试执行、覆盖率报告、测试趋势。 3. 发布模块：CI/CD 流水线、灰度开关、版本管理。 4. 监控模块：错误监控、性能监控、业务监控。

---

### FB-28-CO-R-001：你如何平衡“快速迭代”和“高质量”？

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
你如何平衡“快速迭代”和“高质量”。

**参考答案**：

平衡策略：

1. 质量左移：在开发阶段预防问题，减少后期修复成本。
2. 自动化：把重复检查交给 CI，减少人工负担。
3. 风险分层：核心功能严格把关，实验性功能灵活处理。
4. 灰度和开关：快速上线但控制风险。
5. 持续交付小变更：降低单次发布风险。
6. 度量反馈：用数据判断是否过快牺牲了质量。

**评分维度**：
- 不极端化（30%）
- 有具体策略（50%）
- 有度量意识（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 平衡策略： 1. 质量左移：在开发阶段预防问题，减少后期修复成本。 2. 自动化：把重复检查交给 CI，减少人工负担。 3. 风险分层：核心功能严格把关，实验性功能灵活处理。 4. 灰度和开关：快速上线但控制风险。

---

### FB-28-CO-R-002：前端在 DevOps 中应该承担什么角色？

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
前端在 DevOps 中应该承担什么角色。

**参考答案**：

前端在 DevOps 中的角色：

1. 把构建、测试、部署流程自动化。
2. 参与监控和可观测性建设。
3. 负责前端发布策略（灰度、回滚）。
4. 与后端、运维协作，打通全链路追踪。
5. 推动前端工程质量文化。
6. 参与 CI/CD 流水线设计和优化。

前端不应只关注“把代码写完”，而应关注“代码如何安全、高效地到达用户”。

**评分维度**：
- 角色认知清晰（40%）
- 能说明跨团队协作（30%）
- 有全链路意识（30%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 前端在 DevOps 中的角色： 1. 把构建、测试、部署流程自动化。 2. 参与监控和可观测性建设。 3. 负责前端发布策略（灰度、回滚）。 4. 与后端、运维协作，打通全链路追踪。

---

### FB-28-SS-R-031：如何建立团队的工程质量文化？

**题型**：软技能题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
如何建立团队的工程质量文化。

**参考答案**：

1. 领导层重视，把质量纳入团队目标。
2. 建立规范和工具，降低遵循成本。
3. 把质量指标可视化，让团队看到进步。
4. 奖励写测试、做重构、发现问题的人。
5. 定期分享质量案例和最佳实践。
6. 让每个人都有 ownership，不是测试团队一个人的事。
7. 从事故中学习，而不是追责。

**评分维度**：
- 文化建设思路全面（50%）
- 强调工具和文化结合（30%）
- 有激励机制（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 1. 领导层重视，把质量纳入团队目标。 2. 建立规范和工具，降低遵循成本。 3. 把质量指标可视化，让团队看到进步。 4. 奖励写测试、做重构、发现问题的人。

---

### FB-28-CO-R-003：前端质量保障中，最容易被忽视但影响巨大的问题是什么？

**题型**：概念题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
前端质量保障中，最容易被忽视但影响巨大的问题是什么。

**参考答案**：

常见被忽视的问题：

1. **第三方脚本**：广告、统计脚本导致性能和安全问题。
2. **异常路径**：网络超时、接口报错、数据为空时的处理。
3. **浏览器兼容性**：旧版本浏览器、低网速环境。
4. **可访问性（A11y）**：视障用户无法使用。
5. **国际化**：日期、货币、多语言布局问题。
6. **监控盲区**：只监控 JS 错误，忽略白屏、卡顿、接口慢。
7. **发布流程**：没有灰度和回滚能力。

**评分维度**：
- 能指出多个被忽视点（50%）
- 能说明影响（30%）
- 有改进建议（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 常见被忽视的问题： 1. 第三方脚本：广告、统计脚本导致性能和安全问题。 2. 异常路径：网络超时、接口报错、数据为空时的处理。 3. 浏览器兼容性：旧版本浏览器、低网速环境。 4. 可访问性（A11y）：视障用户无法使用。

---

### FB-28-SC-R-002：如果团队完全没有测试，你会如何推动测试落地？

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：架构 / 专家
**面试知识域**：28 质量保障
**标签**：单元测试、测试策略、E2E、自动化、工程化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
如果团队完全没有测试，你会如何推动测试落地。

**参考答案**：

推动步骤：

1. **获得支持**：向团队和管理层说明测试的长期价值。
2. **选择试点**：从核心、稳定、少依赖的模块开始。
3. **提供基础设施**：测试环境、Mock 工具、CI 集成。
4. **编写示例**：写几个高质量测试作为样板。
5. **纳入流程**：PR 必须包含测试，CI 失败不能合并。
6. **循序渐进**：先单元测试，再集成测试，最后 E2E。
7. **度量反馈**：展示覆盖率提升和回归 Bug 减少。
8. **持续培训**：组织测试工作坊和分享。

**评分维度**：
- 有循序渐进策略（40%）
- 强调基础设施和流程（40%）
- 有度量反馈机制（20%）

---

> **领域编号**：A04 质量保障  
> **最后更新**：2026-06-18

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 推动步骤： 1. 获得支持：向团队和管理层说明测试的长期价值。 2. 选择试点：从核心、稳定、少依赖的模块开始。 3. 提供基础设施：测试环境、Mock 工具、CI 集成。 4. 编写示例：写几个高质量测试作为样板。

### FB-28-CO-B-009：前端质量保障的核心维度

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障
**标签**：质量保障、测试、代码质量、可维护性、监控
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明前端质量保障应覆盖哪些维度。

**参考答案**：

核心思路如下：

1. 功能质量：单元测试、集成测试、E2E 测试
2. 代码质量：lint、类型检查、代码评审、复杂度
3. 性能质量：性能预算、监控、回归
4. 安全质量：依赖审计、XSS/CSRF 防护
5. 可观测性：错误监控、埋点、日志
6. 流程质量：CI/CD、变更管理、发布回滚

需要避免的典型误区：

- 只依赖人工测试
- 只写单元测试不做 E2E
- 代码质量无标准

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：功能质量、代码质量 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只依赖人工测试
- 只写单元测试不做 E2E
- 代码质量无标准

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 功能质量；代码质量；性能质量；安全质量；可观测性；流程质量。同时要避免只依赖人工测试。

---

### FB-28-CO-A-022：单元测试、集成测试、E2E 测试的边界

**题型**：概念题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：测试金字塔、单元测试、集成测试、E2E
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释三种测试类型的职责、成本与覆盖建议。

**参考答案**：

核心思路如下：

1. 单元测试：测最小单元，快、稳定、成本低，覆盖核心逻辑
2. 集成测试：测模块间交互，验证数据流和 API 契约
3. E2E：模拟真实用户路径，成本高、稳定性低，覆盖核心链路
4. 比例遵循测试金字塔，单元最多，E2E 精而不多
5. 选型：Jest/Vitest 单元，Testing Library 集成，Playwright/Cypress E2E

需要避免的典型误区：

- E2E 占比过高导致 CI 慢
- 单元测试只测简单函数
- 没有集成测试导致模块各自正常但联调失败

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：单元测试、集成测试 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- E2E 占比过高导致 CI 慢
- 单元测试只测简单函数
- 没有集成测试导致模块各自正常但联调失败

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 单元测试；集成测试；E2E；比例遵循测试金字塔，单元最多，E2E 精而不多；选型。同时要避免E2E 占比过高导致 CI 慢。

---

### FB-28-EN-A-016：前端 CI 中的质量门禁设计

**题型**：工程化题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：CI、质量门禁、lint、测试、覆盖率
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计 CI 中的前端质量门禁，确保劣质代码不进入主干。

**参考答案**：

核心思路如下：

1. 静态检查：ESLint、Prettier、Stylelint、TypeScript
2. 测试：单元测试通过、覆盖率不低于阈值
3. 构建：构建成功、产物体积不超标
4. 安全：依赖 CVE 扫描、密钥泄露检测
5. 阻断：任一门禁失败即阻止合并
6. 增量检查：只检查 affected 包提速

需要避免的典型误区：

- 门禁过严导致频繁失败
- 只跑 lint 不跑测试
- 阈值过低无意义


**补充说明**：

在实际落地 前端 CI 中的质量门禁设计 时，建议结合 CI、质量门禁、lint 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：静态检查、测试 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 门禁过严导致频繁失败
- 只跑 lint 不跑测试
- 阈值过低无意义

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 静态检查；测试；构建；安全；阻断；增量检查。同时要避免门禁过严导致频繁失败。

---

### FB-28-SC-A-001：如何保证前端代码评审质量

**题型**：场景设计题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：代码评审、质量、CR、 checklist
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端代码评审应关注哪些方面，以及如何提高评审效率。

**参考答案**：

核心思路如下：

1. 关注：正确性、可维护性、性能、安全、测试、可访问性
2. 使用 Checklist 和自动化工具减少重复提醒
3. 控制 MR 大小，便于评审
4. 区分阻塞性问题与建议性意见
5. 建立评审文化：双向学习，不是挑错
6. 统计评审时长和缺陷发现率持续改进

需要避免的典型误区：

- 只关注代码风格
- MR 过大无法细看
- 评审流于形式


**补充说明**：

在实际落地 保证前端代码评审质量 时，建议结合 代码评审、质量、CR 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：关注、使用 Checklist 和自动化工具减少重复提醒 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只关注代码风格
- MR 过大无法细看
- 评审流于形式

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 关注；使用 Checklist 和自动化工具减少重复提醒；控制 MR 大小，便于评审；区分阻塞性问题与建议性意见；建立评审文化；统计评审时长和缺陷发现率持续改进。同时要避免只关注代码风格。

---

### FB-28-CO-P-023：什么是测试驱动开发（TDD）

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：TDD、测试驱动、单元测试、重构
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 TDD 的流程、优势及在前端的适用场景。

**参考答案**：

核心思路如下：

1. 流程：红（写失败测试）-> 绿（实现通过）-> 重构
2. 优势：明确需求、快速反馈、设计可测试、减少回归
3. 适用：逻辑清晰、输入输出明确的工具函数、hooks、reducer
4. 不适用：UI 快速迭代、需求高度不确定的探索性开发
5. 结合快照测试需谨慎，避免无意义更新

需要避免的典型误区：

- 为了 TDD 而写无价值测试
- 只写测试不重构
- 在 UI 层过度 TDD

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：流程、优势 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 为了 TDD 而写无价值测试
- 只写测试不重构
- 在 UI 层过度 TDD

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 流程；优势；适用；不适用；结合快照测试需谨慎，避免无意义更新。同时要避免为了 TDD 而写无价值测试。

---

### FB-28-EN-P-025：前端单元测试如何设计有效的断言

**题型**：工程化题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：单元测试、断言、测试用例、边界条件
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何写出有价值的前端单元测试。

**参考答案**：

核心思路如下：

1. 一个测试验证一个行为，而不是一个函数所有路径
2. 覆盖正常路径、边界条件、异常输入
3. 断言要具体，避免 expect(true).toBe(true)
4. 避免测试实现细节，关注输入输出
5. 使用参数化测试覆盖多组数据

需要避免的典型误区：

- 测试覆盖率 100% 但无意义断言
- 测试私有函数
- 测试与实现强耦合


**补充说明**：

在实际落地 前端单元测试如何设计有效的断言 时，建议结合 单元测试、断言、测试用例 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：一个测试验证一个行为，而不是一个函数所有路径、覆盖正常路径、边界条件、异常输入 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 测试覆盖率 100% 但无意义断言
- 测试私有函数
- 测试与实现强耦合

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 一个测试验证一个行为，而不是一个函数所有路径；覆盖正常路径、边界条件、异常输入；断言要具体，避免 expect(true).toBe(true)；避免测试实现细节，关注输入输出；使用参数化测试覆盖多组数据。同时要避免测试覆盖率 100% 但无意义断言。

---

### FB-28-SC-P-025：前端 E2E 测试不稳定如何治理

**题型**：场景设计题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：E2E、测试稳定性、Flaky、Playwright、等待
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
E2E 测试经常出现随机失败，请给出治理方案。

**参考答案**：

核心思路如下：

1. 避免固定等待，使用自动等待和断言重试
2. 选择稳定的选择器，避免依赖易变文本
3. 测试数据隔离，避免并发用例互相影响
4. 环境稳定：统一浏览器版本、网络、时区
5. 失败分类：环境、数据、用例本身、被测应用 bug
6. 对 flaky 用例进行隔离、标记、修复

需要避免的典型误区：

- 用 sleep 处理异步
- 多测试共用同一账号数据
- 不稳定用例直接删除


**补充说明**：

在实际落地 前端 E2E 测试不稳定如何治理 时，建议结合 E2E、测试稳定性、Flaky 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：避免固定等待，使用自动等待和断言重试、选择稳定的选择器，避免依赖易变文本 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 用 sleep 处理异步
- 多测试共用同一账号数据
- 不稳定用例直接删除

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> E2E 测试经常出现随机失败，避免固定等待，使用自动等待和断言重试；选择稳定的选择器，避免依赖易变文本；测试数据隔离，避免并发用例互相影响；环境稳定；失败分类；对 flaky 用例进行隔离、标记、修复。同时要避免用 sleep 处理异步。

---

### FB-28-CO-A-023：什么是快照测试，何时使用

**题型**：概念题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：快照测试、Snapshot、回归、UI
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明快照测试的原理、优势和风险。

**参考答案**：

核心思路如下：

1. 原理：将输出序列化保存，后续对比是否变化
2. 优势：快速发现 UI 或数据结构回归
3. 风险：容易无意义更新，掩盖真实 bug
4. 适用：组件结构稳定、纯函数输出、配置文件
5. 不适用：频繁变化的数据、随机内容、大型 DOM

需要避免的典型误区：

- 所有组件都用快照
- CI 失败就无脑更新快照
- 快照包含动态数据

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：原理、优势 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 所有组件都用快照
- CI 失败就无脑更新快照
- 快照包含动态数据

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 原理；优势；风险；适用；不适用。同时要避免所有组件都用快照。

---

### FB-28-EN-A-017：前端代码覆盖率目标与实践

**题型**：工程化题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：覆盖率、测试、Sonar、阈值、质量
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何设定和达成前端代码覆盖率目标。

**参考答案**：

核心思路如下：

1. 覆盖率是参考指标，不是唯一目标
2. 优先覆盖核心业务逻辑、边界、异常
3. 设置门限：行覆盖率、分支覆盖率、函数覆盖率
4. 使用 Vitest/Jest + Istanbul 采集
5. 结合变更覆盖率：只要求新增代码达标
6. 避免为覆盖率写无意义测试

需要避免的典型误区：

- 追求 100% 覆盖率
- 只看行覆盖忽略分支
- 覆盖率达标就认为质量高


**补充说明**：

在实际落地 前端代码覆盖率目标与实践 时，建议结合 覆盖率、测试、Sonar 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：覆盖率是参考指标，不是唯一目标、优先覆盖核心业务逻辑、边界、异常 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 追求 100% 覆盖率
- 只看行覆盖忽略分支
- 覆盖率达标就认为质量高

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 覆盖率是参考指标，不是唯一目标；优先覆盖核心业务逻辑、边界、异常；设置门限；使用 Vitest/Jest + Istanbul 采集；结合变更覆盖率；避免为覆盖率写无意义测试。同时要避免追求 100% 覆盖率。

---

### FB-28-SC-R-003：设计一个前端质量度量体系

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：架构师 / 专家
**面试知识域**：28 质量保障
**标签**：质量度量、指标、DORA、技术债、质量门禁
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请为公司前端团队设计质量度量体系，能反映交付质量和工程健康度。

**参考答案**：

核心思路如下：

1. 交付质量：缺陷密度、线上故障数、回滚率、MTTR
2. 工程健康：代码覆盖率、lint 违规、技术债、构建成功率
3. 流程效率：部署频率、变更前置时间、MR 大小、评审时长
4. 用户感知：错误率、性能指标、可用性
5. 可视化看板，按团队/项目/时间维度展示
6. 避免单一指标，防止数据造假

需要避免的典型误区：

- 只度量代码覆盖率
- 指标与绩效强挂钩导致造假
- 度量维度过多无重点


**补充说明**：

在实际落地 设计一个前端质量度量体系 时，建议结合 质量度量、指标、DORA 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：交付质量、工程健康 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只度量代码覆盖率
- 指标与绩效强挂钩导致造假
- 度量维度过多无重点

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 交付质量；工程健康；流程效率；用户感知；可视化看板，按团队/项目/时间维度展示；避免单一指标，防止数据造假。同时要避免只度量代码覆盖率。

---

### FB-28-CO-A-024：什么是契约测试

**题型**：概念题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：契约测试、Pact、前后端、API、Consumer
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释契约测试在前端中的应用。

**参考答案**：

核心思路如下：

1. 契约测试验证前后端对 API 字段、类型、行为的约定
2. 前端作为 Consumer 定义期望，后端作为 Provider 验证
3. Pact 是常用工具，生成契约文件并在 CI 中验证
4. 减少集成测试环境依赖，提前发现接口变更
5. 适合前后端并行开发、微服务场景

需要避免的典型误区：

- 用契约测试替代 E2E
- 契约文件不版本管理
- 契约过于严格导致正常扩展受阻

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：契约测试验证前后端对 API 字段、类型、行为的约定、前端作为 Consumer 定义期望，后端作为 Provider 验证 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 用契约测试替代 E2E
- 契约文件不版本管理
- 契约过于严格导致正常扩展受阻

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 契约测试验证前后端对 API 字段、类型、行为的约定；前端作为 Consumer 定义期望，后端作为 Provider 验证；Pact 是常用工具，生成契约文件并在 CI 中验证；减少集成测试环境依赖，提前发现接口变更；适合前后端并行开发、微服务场景。同时要避免用契约测试替代 E2E。

---

### FB-28-EN-P-026：如何防止前端代码中的安全漏洞

**题型**：工程化题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：安全、XSS、CSRF、CSP、审计
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明前端在代码层面如何防范常见安全漏洞。

**参考答案**：

核心思路如下：

1. XSS：输入校验、输出转义、CSP、避免 innerHTML
2. CSRF：SameSite Cookie、Token、Referer 校验
3. 依赖安全：定期 audit，锁定版本
4. 敏感信息：不硬编码密钥，不暴露源码
5. CORS 与鉴权：最小权限原则
6. 安全扫描加入 CI 门禁

需要避免的典型误区：

- 只依赖后端防护
- 信任所有用户输入
- 第三方依赖不审计


**补充说明**：

在实际落地 防止前端代码中的安全漏洞 时，建议结合 安全、XSS、CSRF 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：XSS、CSRF 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只依赖后端防护
- 信任所有用户输入
- 第三方依赖不审计

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> XSS；CSRF；依赖安全；敏感信息；CORS 与鉴权；安全扫描加入 CI 门禁。同时要避免只依赖后端防护。

---

### FB-28-SC-A-002：如何设计前端组件的测试策略

**题型**：场景设计题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：组件测试、Testing Library、Vitest、交互
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何为业务组件设计测试。

**参考答案**：

核心思路如下：

1. 优先测交互行为而非实现细节
2. 使用 Testing Library 查询真实 DOM，模拟用户操作
3. 覆盖：渲染、事件、状态变化、错误状态、加载状态
4. 对纯展示组件可用快照
5. 复杂组件拆小，提高可测试性

需要避免的典型误区：

- 测组件内部 state
- 使用不稳定的 class 选择器
- 只渲染不交互


**补充说明**：

在实际落地 设计前端组件的测试策略 时，建议结合 组件测试、Testing Library、Vitest 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：优先测交互行为而非实现细节、使用 Testing Library 查询真实 DOM，模拟用户操作 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 测组件内部 state
- 使用不稳定的 class 选择器
- 只渲染不交互

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 优先测交互行为而非实现细节；使用 Testing Library 查询真实 DOM，模拟用户操作；覆盖；对纯展示组件可用快照；复杂组件拆小，提高可测试性。同时要避免测组件内部 state。

---

### FB-28-CO-P-024：什么是 Mutation Testing

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：变异测试、Mutation、测试质量
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释变异测试的原理及其对评估测试质量的价值。

**参考答案**：

核心思路如下：

1. 变异测试通过自动修改源代码看测试是否能发现
2. 变异体被杀死 = 测试有效；存活 = 测试可能不足
3. 指标：Mutation Score
4. 价值：评估测试有效性，不只覆盖行数
5. 工具：Stryker.js；成本高，适合核心模块

需要避免的典型误区：

- 用变异测试替代覆盖率
- 在变化频繁模块运行导致噪音
- 过度追求 100% mutation score

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：变异测试通过自动修改源代码看测试是否能发现、变异体被杀死 = 测试有效；存活 = 测试可能不足 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 用变异测试替代覆盖率
- 在变化频繁模块运行导致噪音
- 过度追求 100% mutation score

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 变异测试通过自动修改源代码看测试是否能发现；变异体被杀死 = 测试有效；存活 = 测试可能不足；指标；价值；工具。同时要避免用变异测试替代覆盖率。

---

### FB-28-SC-P-026：前端如何做视觉回归测试

**题型**：场景设计题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：视觉回归、Screenshot、Playwright、Chromatic、UI
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明视觉回归测试的方案与实践。

**参考答案**：

核心思路如下：

1. 对关键页面和组件截图，与基线对比像素差异
2. 工具：Playwright screenshot、Chromatic、Applitools、Percy
3. 环境一致：浏览器版本、视口、字体、动画暂停
4. 基线审批流程：人工确认有意变更
5. 注意动态内容：时间、随机数据、广告

需要避免的典型误区：

- 所有组件都做视觉回归
- 环境不一致导致误报
- 动态内容未处理


**补充说明**：

在实际落地 前端如何做视觉回归测试 时，建议结合 视觉回归、Screenshot、Playwright 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：对关键页面和组件截图，与基线对比像素差异、工具 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 所有组件都做视觉回归
- 环境不一致导致误报
- 动态内容未处理

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 对关键页面和组件截图，与基线对比像素差异；工具；环境一致；基线审批流程；注意动态内容。同时要避免所有组件都做视觉回归。

---

### FB-28-EN-A-018：前端代码规范如何落地

**题型**：工程化题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：代码规范、ESLint、Prettier、Stylelint、自动化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何制定并推行前端代码规范。

**参考答案**：

核心思路如下：

1. 规范应聚焦可读性、可维护性、常见 bug
2. 工具化：ESLint、Prettier、Stylelint、commitlint
3. 固化到 CI，提交前 husky 拦截
4. 共享配置包，统一团队规则
5. 定期 review 规则，移除无效规则

需要避免的典型误区：

- 规范过细导致开发痛苦
- 只定规范无工具
- 规则频繁变化


**补充说明**：

在实际落地 前端代码规范如何落地 时，建议结合 代码规范、ESLint、Prettier 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：规范应聚焦可读性、可维护性、常见 bug、工具化 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 规范过细导致开发痛苦
- 只定规范无工具
- 规则频繁变化

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 规范应聚焦可读性、可维护性、常见 bug；工具化；固化到 CI，提交前 husky 拦截；共享配置包，统一团队规则；定期 review 规则，移除无效规则。同时要避免规范过细导致开发痛苦。

---

### FB-28-SC-A-003：如何保障前端发布质量

**题型**：场景设计题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：发布质量、灰度、回滚、监控、验证
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端发布前后的质量保障措施。

**参考答案**：

核心思路如下：

1. 发布前：CI 通过、代码评审、灰度方案
2. 灰度：按用户/流量/地域逐步放量
3. 发布后：监控错误率、性能、业务指标
4. 回滚：保留上一版本产物，快速切换
5. 验证：自动化 + 人工巡检核心流程

需要避免的典型误区：

- 直接全量发布
- 发布后不监控
- 回滚需要重新构建


**补充说明**：

在实际落地 保障前端发布质量 时，建议结合 发布质量、灰度、回滚 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：发布前、灰度 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 直接全量发布
- 发布后不监控
- 回滚需要重新构建

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 发布前；灰度；发布后；回滚；验证。同时要避免直接全量发布。

---

### FB-28-CO-P-025：可访问性测试如何纳入质量保障

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：可访问性、a11y、axe、ARIA、测试
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何在测试流程中保障前端可访问性。

**参考答案**：

核心思路如下：

1. 自动化：axe-core 集成到单元/E2E 测试
2. 检查清单：语义化标签、alt、焦点管理、键盘导航、颜色对比度
3. 手动测试：屏幕阅读器、Tab 导航
4. 纳入 CI 门禁，对新增 a11y 错误阻断
5. 培训团队了解 a11y 基础知识

需要避免的典型误区：

- 只依赖自动化
- 为所有元素加 ARIA 反效果
- 忽略键盘用户

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：自动化、检查清单 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只依赖自动化
- 为所有元素加 ARIA 反效果
- 忽略键盘用户

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 自动化；检查清单；手动测试；纳入 CI 门禁，对新增 a11y 错误阻断；培训团队了解 a11y 基础知识。同时要避免只依赖自动化。

---

### FB-28-EN-R-001：设计前端工程化的质量门禁

**题型**：工程化题
**难度**：🔴 架构
**岗位层级**：架构师 / 专家
**面试知识域**：28 质量保障
**标签**：质量门禁、CI、类型、测试、构建、安全
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请为一个大型前端 Monorepo 设计完整的质量门禁。

**参考答案**：

核心思路如下：

1. 变更检测：只检查 affected 包，提升效率
2. 类型检查：全仓 tsc --noEmit
3. 静态检查：lint、format、命名、导入限制
4. 测试：单元 + 集成 +  affected E2E
5. 构建与产物分析：体积、重复依赖
6. 安全：依赖审计、密钥扫描

需要避免的典型误区：

- 门禁过慢导致绕过
- 无差异化全量检查
- 门禁失败后无清晰日志


**补充说明**：

在实际落地 设计前端工程化的质量门禁 时，建议结合 质量门禁、CI、类型 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：变更检测、类型检查 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 门禁过慢导致绕过
- 无差异化全量检查
- 门禁失败后无清晰日志

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 变更检测；类型检查；静态检查；测试；构建与产物分析；安全。同时要避免门禁过慢导致绕过。

---

### FB-28-SC-P-027：如何治理前端技术债

**题型**：场景设计题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：技术债、重构、度量、优先级、治理
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明前端技术债的分类、度量与治理方法。

**参考答案**：

核心思路如下：

1. 分类：代码债、架构债、测试债、文档债、工具债
2. 度量：扫描重复代码、复杂度、覆盖率、TODO 数量
3. 优先级：高影响低成本的先处理，绑定业务项目
4. 建立技术债看板和偿还计划
5. 防止新增：质量门禁、代码评审、ADR

需要避免的典型误区：

- 一次性重构所有技术债
- 只列不做
- 不区分战略债与坏债


**补充说明**：

在实际落地 治理前端技术债 时，建议结合 技术债、重构、度量 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：分类、度量 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 一次性重构所有技术债
- 只列不做
- 不区分战略债与坏债

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 分类；度量；优先级；建立技术债看板和偿还计划；防止新增。同时要避免一次性重构所有技术债。

---

### FB-28-CO-A-025：什么是混沌工程在前端中的应用

**题型**：概念题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：混沌工程、故障注入、韧性、测试
**出现频率**：低频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明混沌工程理念如何应用到前端。

**参考答案**：

核心思路如下：

1. 主动注入故障验证系统恢复能力
2. 前端场景：网络延迟、接口失败、CPU 降速、JS 异常
3. 工具：浏览器 DevTools 网络模拟、自定义故障注入 SDK
4. 先在测试环境做，生产环境需控制范围和监控
5. 目标：发现薄弱环节，完善降级和监控

需要避免的典型误区：

- 直接在生产大规模注入
- 无回滚和监控
- 为做而做，不修复发现的问题

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：主动注入故障验证系统恢复能力、前端场景 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 直接在生产大规模注入
- 无回滚和监控
- 为做而做，不修复发现的问题

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 主动注入故障验证系统恢复能力；前端场景；工具；先在测试环境做，生产环境需控制范围和监控；目标。同时要避免直接在生产大规模注入。

---

### FB-28-SC-A-004：前端如何保障兼容性质量

**题型**：场景设计题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：兼容性、浏览器、Polyfill、测试、Babel
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何在持续交付中保障多浏览器兼容性。

**参考答案**：

核心思路如下：

1. 明确目标浏览器矩阵，基于用户数据
2. 使用 Browserslist + Babel 转译
3. CSS 兼容性：Autoprefixer、PostCSS
4. JS API：polyfill.io 或 core-js 按需
5. 自动化：Playwright 多浏览器 E2E
6. 真机/云测补充

需要避免的典型误区：

- 支持所有浏览器包括 IE6
- polyfill 全部打包
- 只在 Chrome 测试


**补充说明**：

在实际落地 前端如何保障兼容性质量 时，建议结合 兼容性、浏览器、Polyfill 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：明确目标浏览器矩阵，基于用户数据、使用 Browserslist + Babel 转译 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 支持所有浏览器包括 IE6
- polyfill 全部打包
- 只在 Chrome 测试

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 明确目标浏览器矩阵，基于用户数据；使用 Browserslist + Babel 转译；CSS 兼容性；JS API；自动化；真机/云测补充。同时要避免支持所有浏览器包括 IE6。

---

### FB-28-EN-A-019：前端 Monorepo 中的质量保障

**题型**：工程化题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：Monorepo、质量、affected、CI、测试
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Monorepo 下如何高效保障代码质量。

**参考答案**：

核心思路如下：

1. 变更检测：Nx/Turborepo/Rush affected 只构建测试受影响包
2. 统一工具链：lint、test、build 配置共享
3. 依赖图可视化，防止循环依赖
4. 版本管理：Changeset，影响分析
5. 跨包契约测试：接口、类型导出

需要避免的典型误区：

- 全量测试导致 CI 极慢
- 包间边界不清
- 变更检测漏测依赖包


**补充说明**：

在实际落地 前端 Monorepo 中的质量保障 时，建议结合 Monorepo、质量、affected 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：变更检测、统一工具链 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 全量测试导致 CI 极慢
- 包间边界不清
- 变更检测漏测依赖包

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 变更检测；统一工具链；依赖图可视化，防止循环依赖；版本管理；跨包契约测试。同时要避免全量测试导致 CI 极慢。

---

### FB-28-SC-P-028：如何设计前端错误监控的质量闭环

**题型**：场景设计题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：错误监控、质量闭环、告警、修复、回归
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计从错误发现到修复验证的闭环。

**参考答案**：

核心思路如下：

1. 采集：全局捕获、Source Map 还原、上下文信息
2. 聚合：按 fingerprint、版本、页面分组
3. 分级：P0 白屏、P1 核心流程、P2 一般错误
4. 告警：按影响面和频率告警，避免噪声
5. 修复：创建工单，关联代码提交
6. 验证：发布后在监控中确认错误下降

需要避免的典型误区：

- 只采集不处理
- 告警过多导致疲劳
- 修复后不复盘


**补充说明**：

在实际落地 设计前端错误监控的质量闭环 时，建议结合 错误监控、质量闭环、告警 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：采集、聚合 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只采集不处理
- 告警过多导致疲劳
- 修复后不复盘

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 采集；聚合；分级；告警；修复；验证。同时要避免只采集不处理。

---

### FB-28-CO-B-010：前端代码评审中应关注的安全点

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：28 质量保障
**标签**：代码评审、安全、XSS、输入校验、依赖
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请列出前端 CR 时应特别留意的安全问题。

**参考答案**：

核心思路如下：

1. 用户输入是否转义，避免 XSS
2. DOM 操作是否使用安全 API
3. 敏感信息是否泄露
4. 第三方依赖是否可靠
5. CORS/CSRF 相关代码
6. 权限控制是否在前端绕过

需要避免的典型误区：

- 只关注业务逻辑
- 认为安全是后端的事
- 忽略新引入依赖

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：用户输入是否转义，避免 XSS、DOM 操作是否使用安全 API 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只关注业务逻辑
- 认为安全是后端的事
- 忽略新引入依赖

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 用户输入是否转义，避免 XSS；DOM 操作是否使用安全 API；敏感信息是否泄露；第三方依赖是否可靠；CORS/CSRF 相关代码；权限控制是否在前端绕过。同时要避免只关注业务逻辑。

---

### FB-28-SC-A-005：如何提升前端测试的可维护性

**题型**：场景设计题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：测试、可维护性、Page Object、 fixtures、数据工厂
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明减少测试维护成本的实践。

**参考答案**：

核心思路如下：

1. 使用 Page Object/Component Object 模式封装选择器和操作
2. 测试数据工厂生成可控数据
3. 避免硬编码等待时间
4. 测试与实现解耦，关注行为
5. 共享 setup/teardown
6. 定期清理无用测试

需要避免的典型误区：

- 测试里硬编码大量 DOM 结构
- 每个测试重复登录等前置步骤
- 测试名称与内容不符


**补充说明**：

在实际落地 提升前端测试的可维护性 时，建议结合 测试、可维护性、Page Object 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：使用 Page Object/Component Object 模式封装选择器和操作、测试数据工厂生成可控数据 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 测试里硬编码大量 DOM 结构
- 每个测试重复登录等前置步骤
- 测试名称与内容不符

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 使用 Page Object/Component Object 模式封装选择器和操作；测试数据工厂生成可控数据；避免硬编码等待时间；测试与实现解耦，关注行为；共享 setup/teardown；定期清理无用测试。同时要避免测试里硬编码大量 DOM 结构。

---

### FB-28-CO-P-026：什么是持续测试

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：持续测试、DevOps、自动化测试、CI/CD
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释持续测试的理念及其在前端的实践。

**参考答案**：

核心思路如下：

1. 在软件交付全周期持续执行自动化测试
2. 左移：在开发阶段跑单元/集成测试
3. 右移：线上监控、混沌测试
4. 与 CI/CD 集成，快速反馈
5. 测试数据与环境管理自动化

需要避免的典型误区：

- 只在发布前集中测试
- 自动化测试跟不上开发节奏
- 测试环境不稳定

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：在软件交付全周期持续执行自动化测试、左移 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只在发布前集中测试
- 自动化测试跟不上开发节奏
- 测试环境不稳定

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 在软件交付全周期持续执行自动化测试；左移；右移；与 CI/CD 集成，快速反馈；测试数据与环境管理自动化。同时要避免只在发布前集中测试。

---

### FB-28-EN-P-027：前端测试数据管理策略

**题型**：工程化题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：测试数据、fixtures、mock、隔离、E2E
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何管理前端测试中的数据。

**参考答案**：

核心思路如下：

1. 单元/集成：使用 factories 和 mock 服务
2. E2E：独立测试账号、数据库 seed、事务回滚
3. 避免共享数据导致测试互相影响
4. 敏感数据脱敏
5. 数据版本与代码版本同步

需要避免的典型误区：

- 多测试共用同一数据
- 测试数据写死在代码里
- 生产数据用于测试


**补充说明**：

在实际落地 前端测试数据管理策略 时，建议结合 测试数据、fixtures、mock 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：单元/集成、E2E 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 多测试共用同一数据
- 测试数据写死在代码里
- 生产数据用于测试

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 单元/集成；E2E；避免共享数据导致测试互相影响；敏感数据脱敏；数据版本与代码版本同步。同时要避免多测试共用同一数据。

---

### FB-28-SC-R-004：设计一个前端交付质量保障平台

**题型**：场景设计题
**难度**：🔴 架构
**岗位层级**：架构师 / 专家
**面试知识域**：28 质量保障
**标签**：质量平台、CI、监控、测试、数据
**出现频率**：低频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个覆盖测试、构建、发布、监控的前端质量保障平台。

**参考答案**：

核心思路如下：

1. 统一流水线：lint -> type -> test -> build -> deploy preview
2. 质量数据汇总：覆盖率、缺陷、构建成功率、性能
3. 测试管理：用例管理、执行历史、失败归因
4. 发布门禁：灰度、回滚、验证
5. 问题追踪：错误/缺陷自动创建工单

需要避免的典型误区：

- 平台功能大而全无人用
- 数据分散无法关联
- 强制所有项目一刀切


**补充说明**：

在实际落地 设计一个前端交付质量保障平台 时，建议结合 质量平台、CI、监控 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：统一流水线、质量数据汇总 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 平台功能大而全无人用
- 数据分散无法关联
- 强制所有项目一刀切

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 统一流水线；质量数据汇总；测试管理；发布门禁；问题追踪。同时要避免平台功能大而全无人用。

---

### FB-28-CO-A-026：什么是静态应用安全测试（SAST）

**题型**：概念题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：SAST、安全、静态扫描、依赖、代码
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 SAST 在前端中的应用。

**参考答案**：

核心思路如下：

1. SAST 不运行程序，通过分析代码发现安全漏洞
2. 前端应用：扫描 JS/TS 代码中的 eval、innerHTML、不安全的正则
3. 依赖扫描：npm audit、Snyk、Trivy
4. 集成到 CI，阻断高风险漏洞
5. 需结合 DAST 和人工审计

需要避免的典型误区：

- SAST 报告误报率高不处理
- 只扫描不修复
- 认为通过 SAST 就绝对安全

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：SAST 不运行程序，通过分析代码发现安全漏洞、前端应用 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- SAST 报告误报率高不处理
- 只扫描不修复
- 认为通过 SAST 就绝对安全

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> SAST 不运行程序，通过分析代码发现安全漏洞；前端应用；依赖扫描；集成到 CI，阻断高风险漏洞；需结合 DAST 和人工审计。同时要避免SAST 报告误报率高不处理。

---

### FB-28-PE-A-001：性能测试如何纳入质量保障

**题型**：性能优化题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：性能测试、质量、Lighthouse CI、预算
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何在 CI 和流程中保障性能不劣化。

**参考答案**：

核心思路如下：

1. 定义性能预算：LCP/INP/CLS、包体积、请求数
2. Lighthouse CI 在 MR 阶段跑分
3. 与基线对比，超预算阻断
4. RUM 线上监控发布后的真实指标
5. 性能问题走单独工单修复

需要避免的典型误区：

- 只测一次不持续
- 预算过松
- 忽略真实用户环境


**补充说明**：

在实际落地 性能测试如何纳入质量保障 时，建议结合 性能测试、质量、Lighthouse CI 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：定义性能预算、Lighthouse CI 在 MR 阶段跑分 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只测一次不持续
- 预算过松
- 忽略真实用户环境

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 定义性能预算；Lighthouse CI 在 MR 阶段跑分；与基线对比，超预算阻断；RUM 线上监控发布后的真实指标；性能问题走单独工单修复。同时要避免只测一次不持续。

---

### FB-28-SC-A-006：前端如何做回归测试策略

**题型**：场景设计题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：回归测试、自动化、冒烟、全量、选择
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明不同发布场景下的回归测试策略。

**参考答案**：

核心思路如下：

1. 冒烟测试：发布前验证核心路径
2. 全量回归：大版本或重构后执行完整用例
3. 选择性回归：根据代码变更范围选择相关测试
4. 自动化优先，人工补充探索性测试
5. 记录回归结果，建立基线

需要避免的典型误区：

- 每次发布都全量人工回归
- 回归用例无优先级
- 回归不覆盖关键浏览器


**补充说明**：

在实际落地 前端如何做回归测试策略 时，建议结合 回归测试、自动化、冒烟 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：冒烟测试、全量回归 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 每次发布都全量人工回归
- 回归用例无优先级
- 回归不覆盖关键浏览器

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 冒烟测试；全量回归；选择性回归；自动化优先，人工补充探索性测试；记录回归结果，建立基线。同时要避免每次发布都全量人工回归。

---

### FB-28-CO-P-027：什么是左移测试

**题型**：概念题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：左移、Shift Left、测试、早期发现
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释测试左移的理念及前端实践。

**参考答案**：

核心思路如下：

1. 左移：尽早发现和修复缺陷，降低成本
2. 实践：开发写单元测试、本地 pre-commit 检查
3. 需求阶段参与可测试性设计
4. API 契约测试在开发阶段建立
5. 本地可快速运行核心测试

需要避免的典型误区：

- 左移等于把所有测试推给开发
- 缺少工具和流程支持
- 只关注速度不顾覆盖率

**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：左移、实践 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 左移等于把所有测试推给开发
- 缺少工具和流程支持
- 只关注速度不顾覆盖率

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 左移；实践；需求阶段参与可测试性设计；API 契约测试在开发阶段建立；本地可快速运行核心测试。同时要避免左移等于把所有测试推给开发。

---

### FB-28-EN-A-020：前端代码复杂度如何度量与治理

**题型**：工程化题
**难度**：🔵 进阶
**岗位层级**：中级 / 高级
**面试知识域**：28 质量保障
**标签**：复杂度、圈复杂度、认知复杂度、Sonar、重构
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何度量和控制前端代码复杂度。

**参考答案**：

核心思路如下：

1. 圈复杂度：分支数量，建议不超过 10
2. 认知复杂度：嵌套、短路、递归的难易度
3. 工具：SonarQube、eslint-plugin-complexity
4. 重构：拆分函数、提取策略、减少嵌套
5. CI 中设置复杂度阈值

需要避免的典型误区：

- 只看行数不看结构
- 阈值过严导致频繁失败
- 不重构只提高阈值


**补充说明**：

在实际落地 前端代码复杂度如何度量与治理 时，建议结合 复杂度、圈复杂度、认知复杂度 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：圈复杂度、认知复杂度 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只看行数不看结构
- 阈值过严导致频繁失败
- 不重构只提高阈值

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 圈复杂度；认知复杂度；工具；重构；CI 中设置复杂度阈值。同时要避免只看行数不看结构。

---

### FB-28-SC-P-029：如何建立前端 bug 预防机制

**题型**：场景设计题
**难度**：🟣 深入
**岗位层级**：高级 / 资深
**面试知识域**：28 质量保障
**标签**：Bug 预防、类型、lint、CR、测试
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明从事后修复转向事前预防的机制。

**参考答案**：

核心思路如下：

1. 类型系统：TypeScript 严格模式捕获常见错误
2. 静态检查：lint 规则禁用危险 API
3. 代码评审：关注边界和异常处理
4. 自动化测试：覆盖历史 bug 场景
5. 复盘：每类线上 bug 补充测试或 lint 规则
6. 知识库：沉淀常见错误模式

需要避免的典型误区：

- 只修 bug 不补测试
- 类型系统配置宽松
- 复盘流于形式


**补充说明**：

在实际落地 建立前端 bug 预防机制 时，建议结合 Bug 预防、类型、lint 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 问题理解与分析（35%）：是否抓住核心矛盾
- 方案设计（45%）：类型系统、静态检查 等关键点
- 落地与优化（20%）：是否考虑监控、回滚、演进

**常见错误**：
- 只修 bug 不补测试
- 类型系统配置宽松
- 复盘流于形式

**延伸追问**：
- 如果候选人答对了，可追问：能否举一个你实际项目中遇到的具体例子，并说明当时的取舍？
- 如果候选人答错了，可引导：如果从“稳定性、可维护性、性能”三个维度再看，你还会补充哪些点？

**相关题目**：
- 暂无

**参考资源**：
- [Testing JavaScript](https://testingjavascript.com)
- [Google Testing Blog](https://testing.googleblog.com)

**口头回答版**：
> 类型系统；静态检查；代码评审；自动化测试；复盘；知识库。同时要避免只修 bug 不补测试。

---
























