# 代码质量与测试 面试题

> 本题库共收录 **114** 道面试题（基础 26 / 进阶 34 / 深入 30 / 架构 24）。
> 本文件收录代码质量与测试相关面试题，目标题量 75 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、工程化题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（18 道）{#basic}

### FB-13-CO-B-001：ESLint 和 Prettier 有什么区别？能否只用一个？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：ESLint、Prettier、静态分析、代码风格、格式化
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 ESLint 和 Prettier 的区别，并说明项目中是否可以只使用其中一个。

**参考答案**：

- **ESLint**：静态代码分析工具，主要职责是发现潜在错误（如未使用变量、`==` 误用）、约束代码规范、保证代码质量，支持自定义规则。
- **Prettier**：代码格式化工具，主要职责是统一代码风格（换行、引号、尾逗号、分号等），不关心代码逻辑对错。

两者职责不同，推荐配合使用：

- 用 ESLint 保证代码正确性与规范。
- 用 Prettier 保证风格一致。
- 为避免规则冲突，可用 `eslint-config-prettier` 关闭与 Prettier 冲突的 ESLint 格式规则，再用 `eslint-plugin-prettier` 把 Prettier 差异作为 ESLint 问题暴露。

是否可以只用一个：

- 可以只用 ESLint，但配置格式规则成本高、效果弱。
- 可以只用 Prettier，但无法发现逻辑错误。

**评分维度**：
- 职责区分（50%）：是否清楚一个管质量、一个管风格
- 配合方案（30%）：是否提到 eslint-config-prettier
- 单工具局限性（20%）：能否说明只用一个的问题

**常见错误**：
- 认为 ESLint 可以完全替代 Prettier 的格式化能力
- 同时开启 ESLint 格式规则与 Prettier 导致冲突，却不知道关闭冲突规则

**延伸追问**：
- 如果 ESLint 和 Prettier 规则冲突，如何排查？
- 在保存时自动修复，如何配置？

**相关题目**：
- [FB-13-EN-B-001 ESLint 的 extends、plugins、rules、presets 有什么区别？](#FB-13-EN-B-001)

**参考资源**：
- [ESLint 官方文档](https://eslint.org/docs/latest/)
- [Prettier 官方文档](https://prettier.io/docs/en/)

**口头回答版**：
> - ESLint：静态代码分析工具，主要职责是发现潜在错误（如未使用变量、== 误用）、约束代码规范、保证代码质量，支持自定义规则。 - Prettier：代码格式化工具，主要职责是统一代码风格（换行、引号、尾逗号、分号等），不关心代码逻辑对错。 两者职责不同，推荐配合使用： - 用 ESLint 保证代码正确性与规范。

---

### FB-13-CO-B-002：Husky 和 lint-staged 在代码提交前分别做了什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：Husky、lint-staged、Git Hook、pre-commit、代码提交
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 Husky 和 lint-staged 在前端工程化中的作用，以及它们如何配合工作。

**参考答案**：

- **Husky**：用于在 Git 生命周期钩子（如 `pre-commit`、`commit-msg`、`pre-push`）中执行脚本，阻止不符合规范的代码进入仓库。
- **lint-staged**：只对 Git 暂存区（staged）中的文件运行指定命令，避免全量检查导致提交过慢。

典型配合流程：

```bash
# .husky/pre-commit
npx lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

提交时：

1. 开发者执行 `git commit`。
2. Husky 触发 `pre-commit` 钩子。
3. lint-staged 仅对本次暂存文件运行 ESLint 和 Prettier。
4. 若有错误无法自动修复，提交被阻止。

**评分维度**：
- Husky 作用（30%）：是否说清 Git Hook 机制
- lint-staged 作用（40%）：是否强调仅检查 staged 文件
- 协作流程（30%）：能否描述从 commit 到拦截的完整链路

**常见错误**：
- 认为 lint-staged 会检查整个项目
- 混淆 pre-commit 和 pre-push 的触发时机

**延伸追问**：
- 如果团队项目很大，lint-staged 执行还是很慢，怎么优化？
- commit-msg 钩子通常做什么？

**参考资源**：
- [Husky 官方文档](https://typicode.github.io/husky/)
- [lint-staged 官方文档](https://github.com/lint-staged/lint-staged)

**口头回答版**：
> - Husky：用于在 Git 生命周期钩子（如 pre-commit、commit-msg、pre-push）中执行脚本，阻止不符合规范的代码进入仓库。 - lint-staged：只对 Git 暂存区（staged）中的文件运行指定命令，避免全量检查导致提交过慢。 开发者执行 git commit。 Husky 触发 pre-commit 钩子。

---

### FB-13-CO-B-003：单元测试、集成测试、端到端测试有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：13 代码质量与测试
**标签**：单元测试、集成测试、E2E 测试、测试分层、测试金字塔
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明单元测试、集成测试、端到端测试的区别，并各举一个前端场景例子。

**参考答案**：

| 类型 | 范围 | 速度 | 维护成本 | 示例 |
|------|------|------|----------|------|
| 单元测试 | 最小可测试单元（函数、组件） | 快 | 低 | 测试一个工具函数 `formatDate` |
| 集成测试 | 多个单元协作 | 中等 | 中等 | 测试表单组件与验证逻辑的组合 |
| 端到端测试（E2E） | 完整用户流程 | 慢 | 高 | 测试用户从登录到下单的完整流程 |

前端场景示例：

- **单元测试**：`utils/currency.ts` 中的 `formatMoney(1234.5)` 返回 `¥1,234.50`。
- **集成测试**：点击搜索按钮后，搜索组件、请求拦截、状态管理、结果列表能正确协作。
- **E2E 测试**：用户登录 → 添加商品到购物车 → 结算 → 确认订单成功。

**评分维度**：
- 三种测试定义区分（50%）
- 速度/成本差异（25%）
- 能举出前端实例（25%）

**常见错误**：
- 把所有组件测试都叫单元测试
- 认为 E2E 越多越好，忽视维护成本

**延伸追问**：
- 一个组件渲染测试，属于单元测试还是集成测试？
- 什么时候应该选择 E2E 而不是单元测试？

**相关题目**：
- [FB-13-CO-B-007 什么是测试金字塔？](#FB-13-CO-B-007)

**参考资源**：
- [Google Testing Blog - Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)

**口头回答版**：
> | 类型 | 范围 | 速度 | 维护成本 | 示例 | |------|------|------|----------|------| | 单元测试 | 最小可测试单元（函数、组件） | 快 | 低 | 测试一个工具函数 formatDate | | 集成测试 | 多个单元协作 | 中等 | 中等 | 测试表单组件与验证逻辑的组合 |

---

### FB-13-CA-B-001：下面 Jest 测试的输出和结果是什么？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：13 代码质量与测试
**标签**：Jest、单元测试、断言、toBe、toEqual
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```js
function add(a, b) {
  return a + b;
}

const obj1 = { x: 1 };
const obj2 = { x: 1 };

test('basic matchers', () => {
  expect(add(1, 2)).toBe(3);
  expect(obj1).toBe(obj2);
  expect(obj1).toEqual(obj2);
  expect([1, 2]).toEqual([1, 2]);
  expect(null).toBeNull();
  expect(undefined).toBeDefined();
});
```

请指出上述测试中哪些断言会通过，哪些会失败，并说明原因。

**参考答案**：

- `expect(add(1, 2)).toBe(3)`：通过。基本类型按值比较。
- `expect(obj1).toBe(obj2)`：失败。`toBe` 使用 `Object.is` / 严格相等，两个对象引用不同。
- `expect(obj1).toEqual(obj2)`：通过。`toEqual` 进行深度递归比较对象属性值。
- `expect([1, 2]).toEqual([1, 2])`：通过。数组内容相同。
- `expect(null).toBeNull()`：通过。
- `expect(undefined).toBeDefined()`：失败。`toBeDefined` 要求值不是 `undefined`。

**评分维度**：
- 正确区分 `toBe` 与 `toEqual`（50%）
- 正确分析 `toBeNull` / `toBeDefined`（30%）
- 能解释引用类型比较规则（20%）

**常见错误**：
- 认为 `toEqual` 和 `toBe` 完全一样
- 误以为 `toBeDefined` 对 `undefined` 也返回 true

**延伸追问**：
- `toBe` 和 `toEqual` 在数字、字符串、对象上分别有什么区别？
- 如何比较浮点数？

**参考资源**：
- [Jest - Using Matchers](https://jestjs.io/docs/using-matchers)

**口头回答版**：
> - expect(add(1, 2)).toBe(3)：通过。 - expect(obj1).toBe(obj2)：失败。 toBe 使用 Object.is / 严格相等，两个对象引用不同。 - expect(obj1).toEqual(obj2)：通过。

---

### FB-13-CO-B-004：什么是代码覆盖率？常用指标有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：代码覆盖率、Jest、测试指标、质量度量
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释代码覆盖率的含义，并说明常见的覆盖率指标。

**参考答案**：

代码覆盖率用于衡量测试对源代码的覆盖程度，常见指标：

- **行覆盖率（Line Coverage）**：被测试执行到的代码行占总代码行的比例。
- **分支覆盖率（Branch Coverage）**：条件分支（如 `if`/`else`、`switch`/`case`）中被执行到的分支比例。
- **函数覆盖率（Function Coverage）**：被调用过的函数占总函数的比例。
- **语句覆盖率（Statement Coverage）**：被执行的语句占总语句的比例。

以 Jest 为例，运行 `jest --coverage` 会生成覆盖报告：

```text
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   85.71 |    66.66 |   80    |   85.71 |
```

**评分维度**：
- 说出 4 个核心指标（60%）
- 能读懂 Jest 覆盖率报告（25%）
- 知道如何生成报告（15%）

**常见错误**：
- 认为 100% 覆盖率等于没有 bug
- 只关注行覆盖率，忽略分支覆盖

**延伸追问**：
- 覆盖率高是否意味着质量好？为什么？
- 如何设置覆盖率阈值？

**相关题目**：
- [FB-13-CO-A-006 覆盖率阈值应该如何设置？只看覆盖率有什么陷阱？](#FB-13-CO-A-006)

**口头回答版**：
> 代码覆盖率用于衡量测试对源代码的覆盖程度，常见指标： - 行覆盖率（Line Coverage）：被测试执行到的代码行占总代码行的比例。 - 分支覆盖率（Branch Coverage）：条件分支（如 if/else、switch/case）中被执行到的分支比例。 - 函数覆盖率（Function Coverage）：被调用过的函数占总函数的比例。

---

### FB-13-CO-B-005：Mock 在前端测试中的作用是什么？有哪些常见方式？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：Mock、Jest、spy、stub、依赖隔离、单元测试
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释前端测试中 Mock 的作用，并列举常见 Mock 方式。

**参考答案**：

**作用**：

1. 隔离被测单元，避免依赖外部模块、网络请求、时间、随机数等不确定因素。
2. 控制依赖行为，构造正常/异常场景。
3. 提升测试速度，避免真实 I/O。
4. 验证交互行为，确认函数被正确调用。

**常见方式（Jest）**：

- **函数 Mock**：`jest.fn()`
- **模块 Mock**：`jest.mock('./api')`
- **Spy**：`jest.spyOn(obj, 'method')`，保留原实现并监听调用
- **Timer Mock**：`jest.useFakeTimers()`
- **全局对象 Mock**：`window.location`、`localStorage`

```js
import { fetchUser } from './api';
jest.mock('./api');

fetchUser.mockResolvedValue({ id: 1, name: 'Tom' });
```

**评分维度**：
- 说出 Mock 的核心作用（40%）
- 列举 3 种以上 Mock 方式（40%）
- 能写出简单示例（20%）

**常见错误**：
- 把所有 Mock 混为一谈，分不清 spy 和 stub
- 过度 Mock，导致测试失去真实意义

**延伸追问**：
- Mock 和 Stub 有什么区别？
- 什么时候不应该 Mock？

**相关题目**：
- [FB-13-CA-A-001 Jest 中如何使用 fake timers 测试定时器？](#FB-13-CA-A-001)

**参考资源**：
- [Jest - Mock Functions](https://jestjs.io/docs/mock-functions)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-13-CO-B-006：什么是 TDD？它的基本流程是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：TDD、测试驱动开发、单元测试、敏捷开发
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 TDD（测试驱动开发）是什么，并说明其基本流程。

**参考答案**：

TDD（Test-Driven Development）是一种先写测试、再写实现、最后重构的开发方式。

基本流程常被称为 **Red-Green-Refactor**：

1. **Red**：写一个会失败的测试，明确需求。
2. **Green**：编写最小实现让测试通过。
3. **Refactor**：重构代码，保持测试通过，提升代码质量。

优点：

- 需求更明确，测试即文档。
- 代码可测试性高，设计更解耦。
- 回归有保障。

缺点：

- 对需求不稳定场景不友好。
- 初期开发速度可能变慢。

**评分维度**：
- 说出 Red-Green-Refactor 三个阶段（50%）
- 能说明 TDD 优缺点（30%）
- 能结合业务场景说明（20%）

**常见错误**：
- 认为 TDD 就是多写测试
- 忽略重构阶段，只写实现不优化设计

**延伸追问**：
- TDD 适合所有场景吗？什么情况下不适合？
- TDD 和 BDD 有什么区别？

**相关题目**：
- [FB-13-CO-A-003 TDD 和 BDD 有什么区别？](#FB-13-CO-A-003)

**口头回答版**：
> TDD（Test-Driven Development）是一种先写测试、再写实现、最后重构的开发方式。 基本流程常被称为 Red-Green-Refactor： Red：写一个会失败的测试，明确需求。 Green：编写最小实现让测试通过。

---

### FB-13-CO-B-007：什么是测试金字塔？它给前端测试什么指导？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：测试金字塔、单元测试、集成测试、E2E 测试、测试策略
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释测试金字塔，并说明它在前端测试策略中的指导意义。

**参考答案**：

测试金字塔由 Mike Cohn 提出，将测试按数量和成本分层：

```
        /\
       /  \
      / E2E \         少、慢、维护成本高
     /--------\
    / 集成测试 \      中等
   /------------\
  /   单元测试    \    多、快、维护成本低
 /----------------\
```

指导意义：

1. **多写单元测试**：快速、稳定、定位问题精准。
2. **适量集成测试**：验证模块协作。
3. **少量 E2E 测试**：覆盖关键用户路径，作为最终保障。

前端中常把单元测试扩展为：

- 纯函数/工具单元测试
- 组件单元测试
- 页面/流程 E2E 测试

**评分维度**：
- 能画出或描述金字塔结构（40%）
- 解释各层特点（30%）
- 能给出前端测试比例建议（30%）

**常见错误**：
- 把测试金字塔倒过来，大量 E2E 少量单元测试
- 认为金字塔比例是固定不变的

**延伸追问**：
- 测试金字塔和测试奖杯（Testing Trophy）有什么区别？
- 你们项目里各类测试比例是多少？为什么？

**相关题目**：
- [FB-13-SD-R-004 如何理解测试金字塔与 Testing Trophy？](#FB-13-SD-R-004)

**口头回答版**：
> 测试金字塔由 Mike Cohn 提出，将测试按数量和成本分层： 多写单元测试：快速、稳定、定位问题精准。 适量集成测试：验证模块协作。 少量 E2E 测试：覆盖关键用户路径，作为最终保障。

---

### FB-13-CO-B-008：什么是 Snapshot Testing？适用于什么场景？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：Snapshot Testing、Jest、React、UI 回归、组件测试
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释前端测试中的 Snapshot Testing，并说明它的适用场景和注意事项。

**参考答案**：

Snapshot Testing（快照测试）会把被测输出序列化后保存为 `.snap` 文件，后续运行与快照对比，不一致则报错。

适用场景：

- React/Vue 组件渲染输出稳定对比。
- 配置文件、AST、错误信息输出。
- 复杂数据结构的可读化回归验证。

示例：

```js
import renderer from 'react-test-renderer';
import Link from './Link';

it('renders correctly', () => {
  const tree = renderer.create(<Link page="https://example.com">Example</Link>).toJSON();
  expect(tree).toMatchSnapshot();
});
```

注意事项：

- 快照文件需纳入版本控制。
- 快照更新需谨慎，避免把错误输出固化。
- 快照失败时要人工 review，不要无脑 `-u` 更新。
- 对不稳定数据（时间、随机数）要做处理，避免频繁失败。

**评分维度**：
- 解释快照测试原理（40%）
- 说出 2 个以上适用场景（30%）
- 提到更新和版本控制注意事项（30%）

**常见错误**：
- 把快照测试当唯一测试手段
- 盲目使用 `-u` 更新快照而不 review

**延伸追问**：
- 快照测试和视觉回归测试有什么区别？
- 如何测试包含随机 ID 的组件快照？

**参考资源**：
- [Jest - Snapshot Testing](https://jestjs.io/docs/snapshot-testing)

**口头回答版**：
> Snapshot Testing（快照测试）会把被测输出序列化后保存为 .snap 文件，后续运行与快照对比，不一致则报错。 - React/Vue 组件渲染输出稳定对比。 - 配置文件、AST、错误信息输出。 - 复杂数据结构的可读化回归验证。

---

### FB-13-EN-B-001：ESLint 的 extends、plugins、rules、presets 有什么区别？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：ESLint、配置、extends、plugins、rules、presets
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 ESLint 配置中 `extends`、`plugins`、`rules` 的区别，以及 preset 的含义。

**参考答案**：

- **extends**：继承一组已有的规则配置（如 `eslint:recommended`、`airbnb`、`plugin:@typescript-eslint/recommended`），相当于批量引入规则。
- **plugins**：加载插件，扩展 ESLint 能力。插件可以提供新的规则、解析器、环境等，但加载后默认不启用其规则。
- **rules**：显式开启/关闭/调整具体规则的严重级别（`"off"`、`"warn"`、`"error"` 或 `0/1/2`）。
- **presets**：通常指打包好的配置集合，如 `@vue/eslint-config-prettier`，本质还是 extends 的封装。

示例：

```js
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-uses-react': 'error',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
};
```

**评分维度**：
- 区分 extends/plugins/rules（60%）
- 能写出配置示例（25%）
- 理解 preset 与 extends 的关系（15%）

**常见错误**：
- 在 plugins 中引入后忘记在 rules 中启用规则
- 认为 extends 会加载插件，其实 extends 只是继承规则配置

**延伸追问**：
- 如何共享团队 ESLint 配置？
- overrides 字段在什么场景使用？

**参考资源**：
- [ESLint - Configuring](https://eslint.org/docs/latest/use/configure/)

**口头回答版**：
> - extends：继承一组已有的规则配置（如 eslint:recommended、airbnb、plugin:@typescript-eslint/recommended），相当于批量引入规则。 - plugins：加载插件，扩展 ESLint 能力。 插件可以提供新的规则、解析器、环境等，但加载后默认不启用其规则。 - rules：显式开启/关闭/调整具体规则的严重级别（"off"、"warn"、"error" 或 0/1/2）。

---

### FB-13-CO-B-009：什么是单元测试？为什么要写单元测试？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：单元测试、测试、Jest、质量
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释单元测试的含义，并说明在项目中写单元测试的价值。

**参考答案**：

单元测试（Unit Testing）是对软件中最小可测试单元（如一个函数、一个类的方法、一个独立组件）进行验证的测试。它的核心目标是隔离被测单元，确认给定输入能产生预期输出。

写单元测试的价值：

1. **快速反馈**：在开发阶段就能发现回归问题，不用等到集成或上线。
2. **安全重构**：后续改代码时，有测试兜底，可以放心重构。
3. **代码设计**：难写测试的代码往往耦合严重，单元测试倒逼更清晰的接口和职责。
4. **活文档**：好的测试用例能说明函数的行为和边界。

示例：

```js
test('formats currency', () => {
  expect(formatMoney(1234.5)).toBe('¥1,234.50');
});
```

**评分维度**：
- 定义准确（40%）：能说清最小可测试单元和隔离性
- 价值说明（40%）：能说出 3 个以上价值
- 能举例（20%）：能写出或描述一个简单单元测试

**常见错误**：
- 把组件渲染测试、集成测试都称为单元测试
- 认为单元测试只是 QA 的工作

**延伸追问**：
- 单元测试一定能发现所有 bug 吗？
- 一个函数依赖了 DOM 或网络，还能单元测试吗？

**相关题目**：
- [FB-13-CO-B-003 单元测试、集成测试、端到端测试有什么区别？](#FB-13-CO-B-003)

**参考资源**：
- [Jest - Getting Started](https://jestjs.io/docs/getting-started)

**口头回答版**：
> 单元测试就是测最小单元，比如一个函数或一个组件，给定输入看输出对不对。写单元测试能快速发现问题、防止改代码时把老功能搞坏，还能倒逼我们把代码写得更可测试、更解耦。本质上是一种投资，前期多花点时间，后期维护会轻松很多。

---

### FB-13-CO-B-010：Prettier 的 singleQuote、trailingComma 等配置有什么用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：Prettier、工程化、质量
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 Prettier 中 `singleQuote`、`trailingComma`、`semi`、`printWidth` 等常用配置的作用。

**参考答案**：

Prettier 是代码格式化工具，这些配置决定如何统一代码风格：

- **`singleQuote`**：`true` 时使用单引号，`false` 时使用双引号。
- **`trailingComma`**：控制是否打印尾逗号，`none`/`es5`/`all`。
- **`semi`**：是否在语句末尾打印分号。
- **`printWidth`**：一行代码超过多少字符时换行。
- **`tabWidth`**：一个缩进等于几个空格。

它们的价值是减少团队因风格不一致产生的无意义争论，保持 diff 干净，降低 code review 成本。

**评分维度**：
- 配置含义（60%）：能说明 4 个以上常用配置
- 统一风格价值（20%）：提到减少团队争论
- 保持 diff 干净（20%）：提到代码审查效率

**常见错误**：
- 在 Prettier 里配置大量业务规则
- 团队未统一配置，各成员自行修改

**延伸追问**：
- Prettier 和 ESLint 的规则冲突如何解决？
- 是否应该在所有项目强制 semi？

**相关题目**：
- [FB-13-CO-B-001 ESLint 和 Prettier 有什么区别？能否只用一个？](#FB-13-CO-B-001)

**参考资源**：
- [Prettier - Options](https://prettier.io/docs/en/options.html)

**口头回答版**：
> Prettier 这些配置就是统一代码风格，比如 singleQuote 决定用单引号还是双引号，trailingComma 决定要不要尾逗号。核心目的是让团队代码看起来一样，减少因为格式问题产生的 review 噪音，diff 也更干净。

---

### FB-13-CO-B-011：git commit message 规范有什么意义？常用格式是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：工程化、CI/CD、质量
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明统一 commit message 规范的意义，并介绍一种常用的提交格式。

**参考答案**：

统一 commit message 的意义：

1. **可读性**：快速了解每次提交做了什么。
2. **生成 changelog**：自动化提取 `feat`、`fix` 等生成版本日志。
3. **定位问题**：规范的 message 配合 `git blame` 更容易追踪 bug 来源。
4. **触发 CI/CD**：按类型触发不同的构建或发布流程。

常用格式是 Conventional Commits：

```text
<type>(<scope>): <subject>

<body>

<footer>
```

常见 type：`feat`、`fix`、`docs`、`style`、`refactor`、`test`、`chore`。

**评分维度**：
- 意义说明（50%）：能说出 3 个以上价值
- 格式说明（30%）：能说清 type/scope/subject
- 工具/自动化（20%）：提到 commitlint 或 changelog

**常见错误**：
- 提交信息只写“fix bug”或“更新代码”
- 中英文混用、无 scope 和 type

**延伸追问**：
- commitlint 如何配置？
- 多人协作时如何强制 commit message 规范？

**相关题目**：
- [FB-13-CO-B-002 Husky 和 lint-staged 在代码提交前分别做了什么？](#FB-13-CO-B-002)

**参考资源**：
- [Conventional Commits](https://www.conventionalcommits.org/)

**口头回答版**：
> 统一 commit message 主要是让大家一看就知道这次提交是 feature、bugfix 还是重构，方便生成 changelog 和定位问题。最常用的是 Conventional Commits，格式是 type(scope): subject，比如 feat(user): add login。

---

### FB-13-CO-B-012：什么是 lint 错误和 warning？提交时能否允许 warning？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：ESLint、质量、工程化
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 ESLint 等工具中 error 和 warning 的区别，并说明提交时是否应该允许 warning。

**参考答案**：

- **Error**：可能引发 bug 或严重违反规范的问题，必须修复。
- **Warning**：建议改进但通常不会直接导致错误的问题。

能否允许 warning 取决于团队阶段：

- **新项目**：建议 zero warning，防止技术债累积。
- **老项目**：可以分阶段治理，先阻止新增 warning，再逐步清零。
- **CI 门禁**：建议把 `max-warnings` 设为 0 或当前基线，避免回退。

**评分维度**：
- 区分 error/warning（40%）
- 团队治理策略（40%）：能根据项目阶段给出建议
- CI 门禁（20%）：提到 max-warnings 或基线

**常见错误**：
- 认为 warning 可以永远无视
- 一次性在老项目开启 zero warning 导致无法提交

**延伸追问**：
- 如何处理第三方代码或历史代码中的 warning？
- ESLint 的 `--max-warnings` 怎么用？

**相关题目**：
- [FB-13-EN-B-001 ESLint 的 extends、plugins、rules、presets 有什么区别？](#FB-13-EN-B-001)

**参考资源**：
- [ESLint - Configure Rules](https://eslint.org/docs/latest/use/configure/rules)

**口头回答版**：
> Error 是必须要修的问题，warning 是建议修。提交时最好不要允许新增 warning，但老项目可以设一个基线，先阻止恶化，再慢慢清零。否则 warning 会越积越多，最后没人看。

---

### FB-13-CO-B-013：什么是测试替身（Test Double）？SUT 是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：Mock、stub、spy、单元测试、质量
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释测试替身和 SUT 的概念，并说明常见测试替身的区别。

**参考答案**：

- **SUT（System Under Test）**：被测系统/单元。
- **Test Double（测试替身）**：替代真实依赖的对象，用于隔离 SUT。

常见类型：

| 类型 | 用途 |
|------|------|
| Dummy | 仅填充参数，不会被使用 |
| Fake | 简化实现，如内存数据库 |
| Stub | 返回固定响应，控制输入 |
| Spy | 记录调用信息，保留原实现 |
| Mock | 预设期望调用行为并验证 |

前端常用 Jest 的 `jest.fn()`、`jest.mock()`、`jest.spyOn()` 实现。

**评分维度**：
- SUT 概念（20%）
- 测试替身分类（50%）：能区分 dummy/fake/stub/spy/mock
- 前端工具对应（30%）：能对应到 Jest API

**常见错误**：
- 把 mock、stub、spy 混为一谈
- 过度使用 mock 导致测试失去真实性

**延伸追问**：
- Mock 和 Stub 的核心区别是什么？
- 什么时候不应该使用测试替身？

**相关题目**：
- [FB-13-CO-B-005 Mock 在前端测试中的作用是什么？有哪些常见方式？](#FB-13-CO-B-005)

**参考资源**：
- [Jest - Mock Functions](https://jestjs.io/docs/mock-functions)

**口头回答版**：
> SUT 就是被测的那个单元。测试替身是用来替代真实依赖的，比如 stub 给固定返回值，mock 还能验证有没有被调用。Jest 里的 jest.fn、jest.mock、jest.spyOn 就是干这些事的。

---

### FB-13-CO-B-014：如何理解断言（Assertion）在测试中的作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：单元测试、Jest、质量
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明断言在测试中的作用，以及没有断言的测试有什么问题。

**参考答案**：

断言是测试的核心，用于验证被测代码的输出是否符合预期。没有断言的测试只是执行了代码，无法证明行为正确。

好的断言应该：

1. **聚焦行为**：验证用户或调用方可观察的结果。
2. **避免过度断言**：不要一次性断言所有内部细节。
3. **覆盖边界**：包含正常、异常、空值等情况。

示例：

```js
test('divide by zero throws', () => {
  expect(() => divide(1, 0)).toThrow('Cannot divide by zero');
});
```

**评分维度**：
- 断言作用（50%）
- 无断言问题（30%）：能说明“执行不等于验证”
- 边界覆盖（20%）：提到异常和空值

**常见错误**：
- 写测试只有执行没有 expect
- 断言内部实现细节而非结果

**延伸追问**：
- `toBe` 和 `toEqual` 在断言对象时有什么区别？
- 如何对异步结果做断言？

**相关题目**：
- [FB-13-CA-B-001 下面 Jest 测试的输出和结果是什么？](#FB-13-CA-B-001)

**参考资源**：
- [Jest - Using Matchers](https://jestjs.io/docs/using-matchers)

**口头回答版**：
> 断言就是测试里的判断语句，expect 什么等于什么。没有断言的测试跑再多遍也说明不了问题。写断言要关注外部可观察的行为，而不是内部实现细节。

---

### FB-13-CO-B-015：什么是回归测试（Regression Testing）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：测试、质量、单元测试
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释回归测试的概念，并说明它在前端项目中的典型应用场景。

**参考答案**：

回归测试是指在代码发生变更后，重新运行已有测试，确认原有功能没有因为改动而引入新的缺陷。

前端典型场景：

1. **重构组件**：重写实现后跑组件测试，保证行为一致。
2. **升级依赖**：升级 React、Vue、工具库后跑全量测试。
3. **修复 bug**：修复 A bug 后，验证没有破坏 B 功能。
4. **CI 合并前**：自动跑回归测试，阻止回归代码进主分支。

自动化回归测试是持续集成的基础。

**评分维度**：
- 概念说明（40%）
- 典型场景（40%）：能说出 3 个以上
- 与 CI 关系（20%）

**常见错误**：
- 把回归测试当作一种特定测试类型，而不是测试执行策略
- 只在上线前手动做回归

**延伸追问**：
- 回归测试用例越来越多时怎么提速？
- 哪些改动需要跑全量回归，哪些只需跑相关测试？

**相关题目**：
- [FB-13-CO-B-003 单元测试、集成测试、端到端测试有什么区别？](#FB-13-CO-B-003)

**参考资源**：
- [Google Testing Blog](https://testing.googleblog.com/)

**口头回答版**：
> 回归测试就是改了代码之后，把老的测试再跑一遍，看看有没有把以前好的功能弄坏。前端重构、升级依赖、修 bug 之后都要做。自动化程度越高，心里越踏实。

---

### FB-13-CO-B-016：什么是 CI？前端为什么要在 CI 中跑测试？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：CI/CD、工程化、质量、测试
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释持续集成（CI）的概念，并说明前端项目把测试放到 CI 中执行的价值。

**参考答案**：

CI（Continuous Integration，持续集成）是指频繁地将代码集成到主干，并通过自动化构建和测试来尽早发现问题。

前端在 CI 中跑测试的价值：

1. **保证主分支健康**：每次合并前自动验证，防止坏代码入库。
2. **统一环境**：避免“我本地能跑”的问题。
3. **快速反馈**：开发者提交后立即知道是否通过。
4. **质量门禁**：可以设置覆盖率、lint、类型检查等门槛。

典型 CI 步骤：install → lint → typecheck → unit test → build。

**评分维度**：
- CI 概念（40%）
- 价值说明（40%）：能说出 3 个以上
- 典型流程（20%）

**常见错误**：
- 只在本地跑测试，不在 CI 跑
- CI 只跑构建不跑测试

**延伸追问**：
- CI 和 CD 有什么区别？
- 单元测试在 CI 中失败应该怎么处理？

**相关题目**：
- [FB-13-CO-B-002 Husky 和 lint-staged 在代码提交前分别做了什么？](#FB-13-CO-B-002)

**参考资源**：
- [GitHub Actions 文档](https://docs.github.com/en/actions)

**口头回答版**：
> CI 就是持续集成，提交代码后自动构建、跑测试。前端在 CI 里跑测试能保证主分支不会坏掉，避免“我本地可以”的尴尬。一般顺序是安装依赖、lint、类型检查、单元测试、构建。

---

## 进阶题（21 道）{#advanced}

### FB-13-CO-A-001：Vitest 和 Jest 有什么主要区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：Vitest、Jest、Vite、ESM、测试框架
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 Vitest 和 Jest 的主要区别，并说明在什么情况下优先选择 Vitest。

**参考答案**：

| 维度 | Jest | Vitest |
|------|------|--------|
| 底层构建 | 基于 Babel / 自定义转换 | 基于 Vite，原生支持 ESM |
| 配置 | 独立 `jest.config.js` | 与 Vite 共享插件生态和配置 |
| 速度 | 快，但 ESM 支持较曲折 | 利用 Vite 的 HMR，启动和重跑极快 |
| 语法兼容 | 接近 | Vitest 兼容大部分 Jest API（describe/it/expect/mock） |
| 生态 | 更成熟，插件丰富 | 快速追赶，适合 Vite 项目 |

优先选择 Vitest 的场景：

- 项目本身使用 Vite。
- 希望原生 ESM 支持，避免 Jest 的 `ts-jest`/`babel-jest` 配置。
- 看重测试热更新（HMR）体验。
- 项目使用现代前端工具链，希望统一构建与测试工具。

Jest 仍适合：

- 大型遗留项目或 Node 项目。
- 需要非常成熟的生态和大量自定义 transformer。

**评分维度**：
- 底层架构差异（30%）
- ESM/配置/速度差异（40%）
- 能给出选型建议（30%）

**常见错误**：
- 认为 Vitest 完全不兼容 Jest API
- 忽视项目已有工具链，盲目追新

**延伸追问**：
- Vitest 的 UI 模式有什么优势？
- 从 Jest 迁移到 Vitest 需要注意什么？

**参考资源**：
- [Vitest 官方文档](https://vitest.dev/)

**口头回答版**：
> | 维度 | Jest | Vitest | |------|------|--------| | 底层构建 | 基于 Babel / 自定义转换 | 基于 Vite，原生支持 ESM | | 配置 | 独立 jest.config.js | 与 Vite 共享插件生态和配置 |

---

### FB-13-CO-A-002：Playwright 和 Cypress 各有什么优劣？如何选择？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：Playwright、Cypress、E2E 测试、浏览器自动化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 Playwright 和 Cypress，说明它们各自的优势和适用场景。

**参考答案**：

| 维度 | Cypress | Playwright |
|------|---------|------------|
| 浏览器架构 | 基于 Chromium/Firefox 的 Electron 应用，单进程 | 多语言、多浏览器，基于 CDP / WebDriver BiDi |
| 跨浏览器 | Chrome、Edge、Firefox、WebKit（部分） | Chromium、Firefox、WebKit 原生支持 |
| 并发 | 商业版 Cypress Cloud 支持更好，开源版受限 | 原生支持多 worker 并行 |
| 运行位置 | 在浏览器内运行，对 iframe/多窗口支持弱 | 进程外驱动，支持多标签页、多窗口、移动端模拟 |
| 调试 | 优秀的 Time Travel 调试、可视化 | Trace Viewer、断点调试 |
| 生态 | 插件丰富，社区大 | 官方 API 全面，增长快 |

选择建议：

- **Cypress**：中小项目、重视可视化调试、团队前端主导、插件生态丰富。
- **Playwright**：大型项目、需要跨浏览器/多窗口、CI 并行要求高、多语言团队。

**评分维度**：
- 架构差异理解（30%）
- 跨浏览器/并发/调试对比（40%）
- 能给出选型建议（30%）

**常见错误**：
- 只凭流行度选择，不考虑项目实际需求
- 认为 Cypress 不能跑 Firefox/WebKit

**延伸追问**：
- 你们的 E2E 测试在 CI 上怎么跑？多久跑一次？
- 如何处理 E2E 测试中的登录态？

**口头回答版**：
> | 维度 | Cypress | Playwright | |------|---------|------------| | 浏览器架构 | 基于 Chromium/Firefox 的 Electron 应用，单进程 | 多语言、多浏览器，基于 CDP / WebDriver BiDi | | 跨浏览器 | Chrome、Edge、Firefox、WebKit（部分） | Chromium、Firefox、WebKit 原生支持 |

---

### FB-13-CO-A-003：TDD 和 BDD 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：TDD、BDD、测试驱动开发、行为驱动开发、敏捷
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TDD 和 BDD 的区别，并说明它们在前端项目中的典型应用方式。

**参考答案**：

| 维度 | TDD | BDD |
|------|-----|-----|
| 关注点 | 代码实现正确性 | 业务行为正确性 |
| 描述方式 | 以测试用例为中心 | 以 Given-When-Then 场景描述为中心 |
| 参与角色 | 主要是开发者 | 开发者、测试、产品共同参与 |
| 工具示例 | Jest、Vitest | Cucumber、Jest 的 `describe/test` 也可模拟 |

TDD 流程：Red-Green-Refactor，强调先写测试再实现。

BDD 流程：先写可执行的业务场景，再实现让场景通过。

前端应用方式：

- TDD：写组件前先写 `it('should render button')`，再实现组件。
- BDD：用 Cucumber 写 `Given 用户已登录 When 点击提交 Then 显示成功提示`，再实现步骤定义。

两者并非互斥，BDD 可视为 TDD 在业务表达上的延伸。

**评分维度**：
- 关注点和描述方式差异（50%）
- 参与角色差异（25%）
- 能给出前端实践示例（25%）

**常见错误**：
- 认为 BDD 就是写更多测试
- 混淆 TDD 与单元测试、BDD 与 E2E 测试

**延伸追问**：
- 在 React 组件开发中，你更倾向于 TDD 还是 BDD？
- BDD 的 Given-When-Then 有什么缺点？

**口头回答版**：
> | 维度 | TDD | BDD | |------|-----|-----| | 关注点 | 代码实现正确性 | 业务行为正确性 | | 描述方式 | 以测试用例为中心 | 以 Given-When-Then 场景描述为中心 |

---

### FB-13-CA-A-001：Jest 中如何使用 fake timers 测试下面的代码？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：Jest、fake timers、定时器、异步测试、Mock
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
// debounce.js
export function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

请用 Jest fake timers 写出该防抖函数的测试用例，并解释关键步骤。

**参考答案**：

```js
import { debounce } from './debounce';

jest.useFakeTimers();

it('should debounce function calls', () => {
  const fn = jest.fn();
  const debounced = debounce(fn, 1000);

  debounced('a');
  debounced('b');
  debounced('c');

  // 立即执行时，fn 不应被调用
  expect(fn).not.toHaveBeenCalled();

  // 前进 1000ms
  jest.advanceTimersByTime(1000);

  // 只应以最后一次参数被调用一次
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith('c');
});
```

关键步骤：

1. `jest.useFakeTimers()` 替换全局定时器。
2. 触发多次防抖函数。
3. 用 `jest.advanceTimersByTime(1000)` 控制时间推进。
4. 验证回调只执行一次且参数正确。

**评分维度**：
- 正确使用 fake timers（40%）
- 验证防抖逻辑（30%）
- 解释时间推进和调用次数验证（30%）

**常见错误**：
- 使用真实定时器导致测试变慢或不稳定
- 没有验证回调只执行一次
- 忘记 `jest.useFakeTimers()` 或没恢复真实定时器

**延伸追问**：
- 如果函数内部使用 `Date.now()`，该如何 Mock？
- Vitest 中如何实现相同效果？

**参考资源**：
- [Jest - Timer Mocks](https://jestjs.io/docs/timer-mocks)

**口头回答版**：
> jest.useFakeTimers() 替换全局定时器。 用 jest.advanceTimersByTime(1000) 控制时间推进。 验证回调只执行一次且参数正确。

---

### FB-13-SC-A-001：如何为一个包含 API 调用的表单组件设计集成测试？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：集成测试、React Testing Library、Mock、表单、API
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
现有一个登录表单组件，包含用户名、密码输入框和提交按钮。点击提交会调用 `loginAPI`，成功后跳转首页，失败时显示错误提示。请设计一套集成测试方案。

**参考答案**：

测试策略：

1. 使用 React Testing Library 渲染组件。
2. Mock `loginAPI` 模块，避免真实网络请求。
3. 模拟用户输入和点击提交。
4. 验证 UI 反馈（loading、成功跳转、错误提示）。

示例：

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { loginAPI } from './api';
import LoginForm from './LoginForm';

jest.mock('./api');

it('shows error message when login fails', async () => {
  loginAPI.mockRejectedValue(new Error('Invalid credentials'));

  render(<LoginForm />);

  fireEvent.change(screen.getByLabelText(/用户名/i), { target: { value: 'tom' } });
  fireEvent.change(screen.getByLabelText(/密码/i), { target: { value: 'wrong' } });
  fireEvent.click(screen.getByRole('button', { name: /登录/i }));

  await waitFor(() => {
    expect(screen.getByText(/登录失败/i)).toBeInTheDocument();
  });
});
```

关键要点：

- 优先查询 `role`、`label`、`text`，避免依赖 CSS 选择器。
- 用 `waitFor` 处理异步 UI 更新。
- 测试的是用户行为，而非组件内部状态。

**评分维度**：
- 测试范围合理（30%）：集成组件与 API，不测试实现细节
- Mock 使用正确（25%）
- 异步断言正确（25%）
- 遵循 Testing Library 查询最佳实践（20%）

**常见错误**：
- 直接测试组件内部 state 或方法
- 用 `setTimeout` 等待异步结果
- 没有清理 Mock 状态导致测试互相影响

**延伸追问**：
- 如果登录成功后需要跳转，如何验证？
- 如果表单有字段校验，测试如何组织？

**参考资源**：
- [Testing Library - Guiding Principles](https://testing-library.com/docs/guiding-principles/)

**口头回答版**：
> 使用 React Testing Library 渲染组件。 Mock loginAPI 模块，避免真实网络请求。 模拟用户输入和点击提交。 验证 UI 反馈（loading、成功跳转、错误提示）。

---

### FB-13-CO-A-004：代码审查（Code Review）时你通常关注哪些方面？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：Code Review、代码审查、质量、团队协作、最佳实践
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请分享你在进行 Code Review 时重点关注的方面，并说明为什么。

**参考答案**：

关注点可分为几个维度：

1. **功能正确性**：是否满足需求，边界条件是否处理，是否有明显 bug。
2. **代码可维护性**：命名是否清晰、函数是否单一职责、是否有重复代码。
3. **可测试性**：是否方便写单元测试，依赖是否可注入，是否过度耦合。
4. **性能**：是否有不必要的重渲染、大数据量处理是否优化、是否有内存泄漏风险。
5. **安全性**：是否有 XSS、CSRF、敏感信息泄露风险。
6. **规范与风格**：是否遵循项目 ESLint/Prettier/团队约定。
7. **测试覆盖**：新增功能是否配套单元/集成测试。

审查原则：

- 对事不对人，评论聚焦代码。
- 区分阻塞性问题（must fix）和建议性意见（nit）。
- 大改动分批 review，避免疲劳。

**评分维度**：
- 覆盖 4 个以上维度（50%）
- 能区分严重问题与建议（25%）
- 提到团队协作与沟通方式（25%）

**常见错误**：
- 只关注代码风格，忽略功能和安全
- 过度挑剔或完全放水

**延伸追问**：
- 如何推动团队建立 Code Review 文化？
- Review 中发现大量问题时如何反馈？

**口头回答版**：
> 关注点可分为几个维度： 功能正确性：是否满足需求，边界条件是否处理，是否有明显 bug。 代码可维护性：命名是否清晰、函数是否单一职责、是否有重复代码。 可测试性：是否方便写单元测试，依赖是否可注入，是否过度耦合。

---

### FB-13-CO-A-005：除了 ESLint，前端还有哪些静态分析工具？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：静态分析、TypeScript、SonarQube、Knip、dep-graph、代码质量
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举前端项目中常用的静态分析工具，并说明它们解决的问题。

**参考答案**：

- **TypeScript**：通过静态类型检查在编译期发现类型错误。
- **ESLint**：发现代码风格、潜在错误、最佳实践问题。
- **Prettier**：统一代码格式（虽不算严格静态分析，但常与质量工具链结合）。
- **SonarQube / SonarLint**：全面的代码质量与漏洞扫描，覆盖重复代码、复杂度、安全漏洞。
- **Knip**：检测未使用的文件、依赖、导出。
- **depcheck / npm-check**：检测未使用或缺失的 npm 依赖。
- **Lighthouse CI**：静态/运行时分析性能、可访问性、SEO。
- **Bundle Analyzer（webpack-bundle-analyzer）**：分析产物体积，发现冗余依赖。
- **Semantic Pull Request / commitlint**：规范提交信息。

选择建议：

- 小型项目：TypeScript + ESLint + Prettier。
- 中大型项目：引入 SonarQube、Knip、Bundle Analyzer 做定期扫描。

**评分维度**：
- 列举 4 种以上工具（40%）
- 说明每种工具解决的问题（40%）
- 能给出组合建议（20%）

**常见错误**：
- 把 Prettier 等同于静态代码分析
- 只列举工具，说不清解决的问题

**延伸追问**：
- 静态分析能否发现所有 bug？有什么局限？
- 如何在 CI 中集成 SonarQube？

**口头回答版**：
> - TypeScript：通过静态类型检查在编译期发现类型错误。 - ESLint：发现代码风格、潜在错误、最佳实践问题。 - Prettier：统一代码格式（虽不算严格静态分析，但常与质量工具链结合）。 - SonarQube / SonarLint：全面的代码质量与漏洞扫描，覆盖重复代码、复杂度、安全漏洞。

---

### FB-13-CO-A-006：覆盖率阈值应该如何设置？只看覆盖率有什么陷阱？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：代码覆盖率、阈值、质量指标、测试有效性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何设置代码覆盖率阈值，并解释只看覆盖率指标可能带来的问题。

**参考答案**：

阈值设置建议：

- 新代码/核心模块：行覆盖率 ≥ 80%，分支覆盖率 ≥ 70%。
- 通用工具库：接近 90% 以上。
- UI 展示/配置型代码：可适当降低要求。
- 使用 Jest `coverageThreshold` 按目录差异化配置。

```json
{
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 80,
      "lines": 80,
      "statements": 80
    },
    "./src/utils/": {
      "branches": 90,
      "functions": 90,
      "lines": 90,
      "statements": 90
    }
  }
}
```

只看覆盖率的陷阱：

1. 高覆盖率不等于高正确性，测试可能没有断言。
2. 容易为了凑覆盖率写无意义测试。
3. 覆盖行数不等于覆盖所有分支和边界。
4. 可能忽略异常路径、并发、交互等复杂场景。

**评分维度**：
- 能给出合理阈值建议（40%）
- 能写出阈值配置（20%）
- 说出 3 个以上覆盖率陷阱（40%）

**常见错误**：
- 强制 100% 覆盖率，导致团队抵触
- 只看行覆盖率，不关注分支覆盖

**延伸追问**：
- 如何防止为凑覆盖率而写无效测试？
- 除了覆盖率，还有哪些测试质量指标？

**相关题目**：
- [FB-13-CO-P-003 什么是变异测试？它如何弥补覆盖率的不足？](#FB-13-CO-P-003)

**口头回答版**：
> - 新代码/核心模块：行覆盖率 ≥ 80%，分支覆盖率 ≥ 70%。 - 通用工具库：接近 90% 以上。 - UI 展示/配置型代码：可适当降低要求。 - 使用 Jest coverageThreshold 按目录差异化配置。

---

### FB-13-CO-A-007：测试中的 Arrange-Act-Assert 模式是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：AAA、Arrange-Act-Assert、测试结构、可读性
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 Arrange-Act-Assert（AAA）模式，并说明它给测试代码带来的好处。

**参考答案**：

AAA 是单元测试的经典结构：

1. **Arrange（准备）**：初始化数据、Mock 依赖、创建被测对象。
2. **Act（执行）**：调用被测函数或触发被测行为。
3. **Assert（断言）**：验证结果是否符合预期。

示例：

```js
test('calculates discount for VIP', () => {
  // Arrange
  const user = { level: 'vip' };
  const cart = { total: 200 };

  // Act
  const result = calculateDiscount(user, cart);

  // Assert
  expect(result).toBe(20);
});
```

好处：

- 结构清晰，易于阅读和维护。
- 每个测试只验证一个概念。
- 方便定位失败阶段。

**评分维度**：
- 解释 AAA 三阶段（60%）
- 能写出符合 AAA 的示例（25%）
- 说出好处（15%）

**常见错误**：
- 一个测试中混杂多个 Act 和大量 Assert
- Arrange 部分过于冗长，隐藏了测试意图

**延伸追问**：
- 当 Arrange 非常复杂时，如何优化？
- AAA 和 Given-When-Then 有什么关系？

**口头回答版**：
> AAA 是单元测试的经典结构： Arrange（准备）：初始化数据、Mock 依赖、创建被测对象。 Act（执行）：调用被测函数或触发被测行为。 Assert（断言）：验证结果是否符合预期。

---

### FB-13-CO-A-008：什么是视觉回归测试？有哪些实现方案？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：视觉回归、VRT、Percy、Chromatic、Playwright、截图对比
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释视觉回归测试（Visual Regression Testing）的原理，并列举前端常用方案。

**参考答案**：

视觉回归测试通过截图对比发现 UI 层面的意外变化。

原理：

1. 在基准版本生成页面/组件截图（baseline）。
2. 后续运行生成新截图。
3. 像素级对比两张截图，标记差异区域。
4. 人工确认差异是预期变更还是回归 bug。

常用方案：

- **Chromatic**：基于 Storybook，专为组件视觉回归设计。
- **Percy**：BrowserStack 出品，支持多浏览器、响应式截图。
- **Applitools**：AI 驱动的视觉测试平台。
- **Playwright / Cypress 截图对比**：原生支持 `toHaveScreenshot` / `cy.screenshot` + 第三方对比工具。
- **Loki**：基于 Storybook 和 Docker 的低成本方案。

注意事项：

- 截图容易受字体、动画、动态数据影响，需要冻结相关变量。
- 应聚焦关键组件和页面，避免全量截图导致维护成本过高。

**评分维度**：
- 解释视觉回归原理（40%）
- 列举 3 种以上方案（35%）
- 提到稳定性和维护性注意事项（25%）

**常见错误**：
- 把视觉回归测试等同于快照测试
- 忽视动态内容导致的大量误报

**延伸追问**：
- 如何减少视觉回归测试的误报？
- 视觉回归测试应该放在 CI 的哪个阶段？

**口头回答版**：
> 视觉回归测试通过截图对比发现 UI 层面的意外变化。 在基准版本生成页面/组件截图（baseline）。 后续运行生成新截图。 像素级对比两张截图，标记差异区域。

---

### FB-13-CD-A-001：请手写一个 Jest 测试，验证一个 HTTP 请求工具函数的错误重试逻辑。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：Jest、手写测试、HTTP、重试、Mock、fetch
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：

```js
// request.js
export async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let lastError;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
```

请为 `fetchWithRetry` 编写 Jest 测试，覆盖成功、最终失败、重试次数三种情况。

**参考答案**：

```js
import { fetchWithRetry } from './request';

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test('returns response on first success', async () => {
  fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1 }) });

  const res = await fetchWithRetry('/api/user');
  expect(res.ok).toBe(true);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('retries on failure and eventually succeeds', async () => {
  fetch
    .mockRejectedValueOnce(new Error('network'))
    .mockRejectedValueOnce(new Error('network'))
    .mockResolvedValueOnce({ ok: true });

  const res = await fetchWithRetry('/api/user', {}, 3);
  expect(res.ok).toBe(true);
  expect(fetch).toHaveBeenCalledTimes(3);
});

test('throws after exhausting retries', async () => {
  fetch.mockRejectedValue(new Error('network'));

  await expect(fetchWithRetry('/api/user', {}, 2)).rejects.toThrow('network');
  expect(fetch).toHaveBeenCalledTimes(3); // 初始 1 次 + 重试 2 次
});
```

**评分维度**：
- 覆盖成功/失败/重试次数三种场景（50%）
- Mock fetch 正确（25%）
- 断言准确（25%）

**常见错误**：
- 使用真实 fetch 发起网络请求
- 没有清理 Mock 导致测试间互相影响
- 重试次数计算错误

**延伸追问**：
- 如果要测试指数退避逻辑，该如何设计？
- 如果改用 axios，测试会有什么不同？

**口头回答版**：
> （见代码示例）

---

### FB-13-EN-A-001：如何配置 lint-staged + Husky 实现提交前只检查本次修改？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：lint-staged、Husky、pre-commit、Git Hook、工程化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何在项目中配置 lint-staged 与 Husky，使得 `git commit` 时只检查本次暂存的文件，并自动修复 ESLint 和 Prettier 问题。

**参考答案**：

以 Husky v9 + lint-staged 为例：

1. 安装依赖：

```bash
npm install -D husky lint-staged eslint prettier eslint-config-prettier
```

2. 初始化 Husky：

```bash
npx husky init
```

3. 配置 `.husky/pre-commit`：

```bash
npx lint-staged
```

4. 在 `package.json` 中配置 lint-staged：

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

5. 为避免 ESLint 与 Prettier 冲突，配置 `.eslintrc`：

```js
module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
};
```

提交流程：

- `git commit` → `pre-commit` 钩子 → lint-staged 仅对 staged 文件运行 ESLint --fix 和 Prettier --write → 修复后重新 add → 提交。

**评分维度**：
- 安装和初始化步骤正确（25%）
- pre-commit 钩子配置正确（25%）
- lint-staged 配置正确（30%）
- 提到 ESLint/Prettier 冲突处理（20%）

**常见错误**：
- lint-staged 命令写成 `eslint .` 导致检查全项目
- 未关闭 ESLint 与 Prettier 的冲突规则
- 忘记将 Prettier 修复后的文件重新 stage

**延伸追问**：
- 如果 lint-staged 修复后导致提交内容与暂存区不一致，怎么办？
- 如何对 commit message 做校验？

**口头回答版**：
> 以 Husky v9 + lint-staged 为例： 初始化 Husky： 配置 .husky/pre-commit： 在 package.json 中配置 lint-staged：

---

### FB-13-CO-A-009：MSW 是什么？它如何帮助前端测试？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：MSW、Mock、集成测试、质量
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍 MSW（Mock Service Worker）的作用，并说明它在前端测试和开发中的典型用法。

**参考答案**：

MSW 是一个基于 Service Worker 和 Node 请求拦截库的 API Mock 工具。它可以在浏览器和 Node 环境中拦截 HTTP 请求并返回模拟响应。

对前端测试的帮助：

1. **不侵入业务代码**：不需要在每个测试里 mock `fetch` 或 axios。
2. **统一 Mock 定义**：把 handler 集中管理，测试和开发环境复用。
3. **真实请求路径**：测试代码调用真实 API URL，只是响应被拦截。
4. **开发体验**：后端未就绪时也能并行开发。

示例：

```js
// mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/user', () => HttpResponse.json({ id: 1, name: 'Tom' })),
];
```

**评分维度**：
- MSW 原理（30%）
- 测试价值（40%）：能说出 3 个以上帮助
- 开发复用（30%）

**常见错误**：
- 把 MSW 当作后端服务替代品用于生产环境
- handler 散落在各个测试文件里，无法复用

**延伸追问**：
- MSW 和 jest.mock('./api') 各适合什么场景？
- 如何为不同测试用例返回不同响应？

**相关题目**：
- [FB-13-SC-A-001 如何为一个包含 API 调用的表单组件设计集成测试？](#FB-13-SC-A-001)

**参考资源**：
- [MSW 官方文档](https://mswjs.io/)

**口头回答版**：
> MSW 是 Mock Service Worker，用来拦截 HTTP 请求。测试时不用改业务代码，直接定义 handler 返回假数据。它最大的好处是浏览器和 Node 都能用，测试和本地开发可以共用同一套 mock。

---

### FB-13-CA-A-002：下面 React 测试为什么会报 “not wrapped in act(...)” 警告？如何修复？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：React、组件、异步、Jest
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```jsx
// Counter.jsx
import { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Counter.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments', () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('button').textContent).toBe('1');
});
```

请分析上述测试可能触发的警告及原因，并给出修复方案。

**参考答案**：

当 `fireEvent.click` 触发状态更新后，React 会异步更新 DOM。如果测试在 `act(...)` 边界外读取 DOM，React 会发出警告。

修复方案：

1. **使用 `userEvent` 并 await**：

```js
import userEvent from '@testing-library/user-event';

test('increments', async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('button')).toHaveTextContent('1');
});
```

2. **使用 `waitFor` 包裹断言**：

```js
await waitFor(() => {
  expect(screen.getByRole('button')).toHaveTextContent('1');
});
```

3. **将 fireEvent 包在 act 中**（不推荐，Testing Library 已自动处理大部分场景）。

核心原则：所有可能触发状态更新的交互都要在 `act` 覆盖范围内完成。

**评分维度**：
- 指出异步更新原因（40%）
- 修复方案（40%）：能给出 2 种以上
- 推荐做法（20%）：说明 userEvent/waitFor 优先

**常见错误**：
- 忽视警告，认为测试通过即可
- 到处手动包 `act` 而不使用 `userEvent`

**延伸追问**：
- `act` 和 `render`/`fireEvent` 内部有什么关系？
- 为什么 Testing Library 推荐 `userEvent` 而不是 `fireEvent`？

**相关题目**：
- [FB-13-CO-P-007 使用 React Testing Library 测试组件时应避免哪些反模式？](#FB-13-CO-P-007)

**参考资源**：
- [React Testing Library - act](https://testing-library.com/docs/react-testing-library/api/#act)

**口头回答版**：
> 这个警告一般是因为点击后 React 状态更新还没完成，测试就去读 DOM 了。最简单的方法是 await userEvent.click，因为它内部已经包了 act。也可以用 waitFor 等 DOM 更新完再断言。

---

### FB-13-SC-A-002：如何测试一个上传文件组件？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：组件、React、测试、Mock
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
现有一个文件上传组件，支持选择文件、显示进度、上传成功后展示结果、失败时显示错误。请设计一套测试方案。

**参考答案**：

测试方案：

1. **构造文件**：用 `new File([...], 'test.png', { type: 'image/png' })` 模拟用户选择文件。
2. **模拟用户交互**：使用 `userEvent.upload(input, file)`。
3. **Mock 上传接口**：MSW 或 `jest.mock` 拦截上传请求，返回成功/失败/进度。
4. **验证 UI 状态**：初始态 → 上传中进度 → 成功结果/错误提示。
5. **清理**：如果组件使用 `URL.createObjectURL`，在 `afterEach` 中清理。

示例：

```js
import userEvent from '@testing-library/user-event';

test('uploads file successfully', async () => {
  render(<Uploader />);
  const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
  const input = screen.getByLabelText(/上传文件/i);

  await userEvent.upload(input, file);
  await waitFor(() => {
    expect(screen.getByText(/上传成功/i)).toBeInTheDocument();
  });
});
```

关键点：不要直接调用组件内部上传函数；从用户视角验证行为。

**评分维度**：
- 文件构造与交互（30%）
- Mock 上传接口（30%）
- UI 状态验证（30%）
- 清理（10%）

**常见错误**：
- 直接调用组件内部方法上传
- 使用真实文件系统或真实上传接口
- 未清理 object URL 导致内存泄漏

**延伸追问**：
- 如何测试多文件上传和拖拽上传？
- 上传进度条如何验证？

**参考资源**：
- [Testing Library - Upload](https://testing-library.com/docs/ecosystem-user-event/#upload)

**口头回答版**：
> 测试上传组件要用 File 对象模拟用户选择的文件，再用 userEvent.upload 触发。然后 mock 掉上传接口，验证上传中、成功、失败三种状态。不要直接调用组件内部函数，要从用户角度测。

---

### FB-13-CD-A-002：请手写一个节流函数并为其编写单元测试。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：单元测试、Jest、Mock、质量
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请实现一个 `throttle(fn, wait, options)` 函数，支持 `leading` 和 `trailing` 选项，并写出对应的单元测试。

**参考答案**：

实现：

```js
export function throttle(fn, wait, options = {}) {
  const { leading = true, trailing = true } = options;
  let lastArgs, lastThis, result;
  let timeout = null;
  let previous = 0;

  const later = () => {
    previous = leading === false ? 0 : Date.now();
    timeout = null;
    result = fn.apply(lastThis, lastArgs);
    lastArgs = lastThis = undefined;
  };

  return function (...args) {
    const now = Date.now();
    if (!previous && leading === false) previous = now;
    const remaining = wait - (now - previous);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = fn.apply(this, args);
      lastArgs = lastThis = undefined;
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
```

测试：

```js
jest.useFakeTimers();

test('throttle calls immediately and then at most once per wait', () => {
  const fn = jest.fn();
  const throttled = throttle(fn, 1000);

  throttled(1);
  throttled(2);
  expect(fn).toHaveBeenCalledTimes(1);

  jest.advanceTimersByTime(1000);
  expect(fn).toHaveBeenCalledTimes(2);
});
```

**评分维度**：
- 实现正确（40%）
- 边界处理（30%）：leading/trailing
- 测试覆盖（30%）

**常见错误**：
- 忽略 leading/trailing 配置
- 使用真实定时器导致测试慢且不稳定
- 未验证最后一次调用

**延伸追问**：
- 节流和防抖有什么区别？
- 如果函数需要返回最后一次调用的结果，怎么改？

**相关题目**：
- [FB-13-CA-A-001 Jest 中如何使用 fake timers 测试下面的代码？](#FB-13-CA-A-001)

**参考资源**：
- [Lodash - throttle](https://lodash.com/docs/4.17.15#throttle)

**口头回答版**：
> 节流就是在一段时间内最多执行一次。实现时要记录上一次执行时间，用 setTimeout 处理 trailing 调用。测试用 jest.useFakeTimers 控制时间，验证立即执行和间隔执行的次数。

---

### FB-13-EN-A-002：如何在前端项目中引入 commitlint + Conventional Commits？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：工程化、Husky、CI/CD、质量
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何配置 commitlint 与 Conventional Commits，使提交信息符合团队规范。

**参考答案**：

配置步骤：

1. **安装依赖**：

```bash
npm install -D @commitlint/config-conventional @commitlint/cli
```

2. **创建配置文件** `commitlint.config.js`：

```js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

3. **添加 Husky commit-msg 钩子**：

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

4. **验证**：

```bash
echo 'feat(auth): add login' | npx commitlint
```

可进一步在 CI 中运行 `commitlint --from=origin/main --to=HEAD` 校验 PR 的所有提交。

**评分维度**：
- 安装配置（30%）
- Husky 集成（30%）
- 校验命令（20%）
- CI 扩展（20%）

**常见错误**：
- 只配置了本地钩子但 CI 不校验
- 规则过严导致正常提交被拦截

**延伸追问**：
- 如何允许特定分支的提交绕过 commitlint？
- 提交信息写错了如何修改？

**相关题目**：
- [FB-13-CO-B-011 git commit message 规范有什么意义？常用格式是什么？](#FB-13-CO-B-011)

**参考资源**：
- [commitlint 官方文档](https://commitlint.js.org/)

**口头回答版**：
> 先装 @commitlint/config-conventional，然后写 commitlint.config.js，再用 Husky 的 commit-msg 钩子跑 commitlint。这样每次提交都会检查 message 格式，PR 里也可以在 CI 校验所有提交。

---

### FB-13-CO-A-010：什么是测试夹具（fixture）？如何管理？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：单元测试、测试、质量、Jest
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释测试夹具的概念，并说明前端项目中如何组织和管理测试数据。

**参考答案**：

测试夹具（Fixture）是测试中使用的固定数据或对象。它为测试提供稳定、可复用的输入，避免每个测试都重复构造数据。

管理建议：

1. **集中存放**：放在 `__fixtures__` 或 `tests/fixtures` 目录。
2. **使用工厂函数**：用 `factory` 生成不同变体，而不是硬编码大量对象。
3. **faker 动态数据**：对格式固定但值无关的测试使用 `@faker-js/faker`。
4. **版本控制**：fixtures 随代码一起提交，保证测试可复现。
5. **隔离修改**：测试内部不要直接修改共享 fixture，先深拷贝。

示例：

```js
export const userFixture = { id: 1, name: 'Tom', role: 'admin' };
export const createUser = (overrides) => ({ ...userFixture, ...overrides });
```

**评分维度**：
- fixture 概念（30%）
- 管理方法（40%）：能说出 3 个以上
- 复用与隔离（30%）

**常见错误**：
- 每个测试都重复写相同数据
- 多个测试共享可变 fixture 导致互相影响

**延伸追问**：
- fixture 和 mock 数据有什么区别？
- 如何为不同环境准备不同的 fixture？

**参考资源**：
- [Jest - Setup and Teardown](https://jestjs.io/docs/setup-teardown)

**口头回答版**：
> 测试夹具就是测试用的固定数据，比如一个用户对象。管理时最好集中放，用工厂函数生成变体，不要随便改共享数据，否则测试会互相影响。

---

### FB-13-CO-A-011：前端代码的可测试性有哪些特征？如何提升？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：单元测试、质量、Mock、TypeScript
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明什么样的前端代码容易被测试，以及如何在日常开发中提升可测试性。

**参考答案**：

可测试性特征：

1. **单一职责**：函数/组件只做一件事。
2. **依赖可注入**：外部依赖通过参数传入，而不是在内部硬编码。
3. **纯函数优先**：相同输入一定得到相同输出，无副作用。
4. **避免全局状态**：不依赖全局变量、单例、localStorage。
5. **接口清晰**：输入输出明确，少用隐式依赖。

提升方法：

- 将业务逻辑从 UI 中抽离到 hooks 或纯函数。
- 用依赖注入替代直接 import API 模块。
- 使用 TypeScript 类型约束输入输出。
- 写代码时先想“这个怎么测”，倒逼设计更简洁。

**评分维度**：
- 特征说明（50%）：能说出 4 个以上
- 提升方法（30%）
- 能举例（20%）

**常见错误**：
- 所有逻辑都写在组件里，导致必须渲染整页才能测
- 直接调用全局 fetch 或第三方 SDK

**延伸追问**：
- 不可测试的代码通常有哪些坏味道？
- 如何在遗留项目中逐步提升可测试性？

**参考资源**：
- [Writing Testable Code](https://testing.googleblog.com/)

**口头回答版**：
> 可测试的代码一般是职责单一、依赖能注入、没有副作用。提升可测试性就要把业务逻辑从 UI 抽出来，外部依赖通过参数传入，少用全局状态。写的时候多想想这个函数怎么测，设计就会更干净。

---

### FB-13-CO-A-012：什么是 Component Testing？它和单元测试、E2E 测试的关系是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：组件、单元测试、集成测试、E2E、测试
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Component Testing 的概念，并说明它在前端测试金字塔中的位置。

**参考答案**：

Component Testing 是在浏览器或类浏览器环境中单独渲染和交互组件的测试。它比纯函数单元测试更贴近用户，又比 E2E 更轻量。

关系：

- **单元测试**：验证纯函数、工具、hooks。
- **Component Testing**：验证组件渲染、事件、props 变化。
- **集成测试**：验证多个组件/模块协作。
- **E2E 测试**：验证完整用户流程。

常用工具：

- React/Vue：Testing Library + JSDOM/Vitest。
- 真实浏览器：Cypress Component Testing、Playwright Component Tests。

Component Testing 填补了单元测试和 E2E 之间的空白，是现代前端测试的重要一环。

**评分维度**：
- 概念（40%）
- 与单元/E2E 区别（40%）
- 工具（20%）

**常见错误**：
- 把所有组件测试都叫单元测试
- 用 E2E 覆盖所有组件交互

**延伸追问**：
- Component Testing 需要 Mock 路由和状态管理吗？
- 视觉回归测试属于 Component Testing 吗？

**相关题目**：
- [FB-13-CO-B-003 单元测试、集成测试、端到端测试有什么区别？](#FB-13-CO-B-003)

**参考资源**：
- [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/overview)

**口头回答版**：
> Component Testing 就是单独测一个组件，模拟用户点击、输入，看渲染结果对不对。它在单元测试和 E2E 之间，比单元测试更真实，又比 E2E 快很多。

---

### FB-13-CO-A-013：测试覆盖率报告中的 “Uncovered Line #s” 怎么看？如何据此补测试？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：13 代码质量与测试
**标签**：质量、测试、Jest、单元测试
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何阅读覆盖率报告中的未覆盖行，并制定补测试的优先级。

**参考答案**：

`Uncovered Line #s` 列出了没有被任何测试执行到的代码行。补测试时应优先关注：

1. **核心业务流程**：用户最常走的路径。
2. **分支条件**：if/else、switch 的未覆盖分支。
3. **异常路径**：错误处理、边界条件。
4. **recently changed code**：新增或修改的代码。

注意事项：

- 不是所有未覆盖行都值得补，比如防御性日志、模板代码。
- 优先补分支覆盖率，行覆盖容易灌水。
- 结合业务风险，低价值代码可以放低优先级。

操作步骤：打开 HTML 覆盖率报告 → 定位未覆盖分支 → 编写针对该分支的测试 → 重新跑覆盖率。

**评分维度**：
- 报告阅读（30%）
- 优先级判断（40%）
- 补测策略（30%）

**常见错误**：
- 只追求行覆盖率，忽视分支覆盖
- 为无法命中的代码硬写无意义测试

**延伸追问**：
- 如何设置增量覆盖率门禁？
- 未覆盖行就一定有质量风险吗？

**相关题目**：
- [FB-13-CO-B-004 什么是代码覆盖率？常用指标有哪些？](#FB-13-CO-B-004)

**参考资源**：
- [Istanbul - Coverage Reports](https://istanbul.js.org/)

**口头回答版**：
> Uncovered Line 就是没被测试跑到的行。补测试不要只看行，优先补核心流程和分支条件，尤其是异常分支。有些模板代码或日志行没覆盖也没关系。

---

## 深入题（21 道）{#proficient}

### FB-13-CO-P-001：Jest 中 Mock 模块有哪些常见陷阱？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：Jest、Mock、模块、ESM、hoisting、jest.mock
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Jest 中 `jest.mock` 和 `jest.spyOn` 使用过程中容易遇到的陷阱。

**参考答案**：

常见陷阱：

1. **模块提升（hoisting）问题**：`jest.mock` 会被提升到文件顶部，无法使用顶层变量，除非使用 `jest.mock('./path', () => { ... }, { virtual: true })` 或 `jest.unstable_mockModule`（ESM）。

2. **Mock 覆盖不彻底**：部分导出未 Mock，导致真实依赖被调用。

3. **ESM Mock 困难**：Jest 默认 CommonJS，对 ESM 的 `jest.mock` 支持有限，需要使用 `jest.unstable_mockModule` 或在 `package.json` 配置 transform。

4. **spyOn 后未 restore**：`jest.spyOn` 默认保留原实现，但修改返回值后可能影响其他测试，需在 `afterEach` 中 `mockRestore()`。

5. **循环依赖 Mock 失效**：被测模块与 Mock 模块存在循环依赖时，Mock 可能不生效。

6. **工厂函数访问外部变量**：

```js
const mockValue = 1;
jest.mock('./api', () => ({
  fetch: () => mockValue // ReferenceError: mockValue 未被初始化
}));
```

解决：`jest.mock` 工厂中只能用 `require` 引入外部内容，或改用 `jest.doMock`。

**评分维度**：
- 说出 4 个以上陷阱（50%）
- 能解释 hoisting 原因（25%）
- 能给出规避方案（25%）

**常见错误**：
- 认为 `jest.mock` 和普通代码按顺序执行
- 忘记在测试间清理 Mock

**延伸追问**：
- 如何 Mock 一个 ES Module 的默认导出？
- `jest.spyOn` 和 `jest.fn` 替换对象方法有什么区别？

**参考资源**：
- [Jest - Manual Mocks](https://jestjs.io/docs/manual-mocks)

**口头回答版**：
> 模块提升（hoisting）问题：jest.mock 会被提升到文件顶部，无法使用顶层变量，除非使用 jest.mock('./path', () => { ... }, { virtual: true }) 或 jest.unstable_mockModule（ESM）。 Mock 覆盖不彻底：部分导出未 Mock，导致真实依赖被调用。 ESM Mock 困难：Jest 默认 CommonJS，对 ESM 的 jest.mock 支持有限，需要使用 jest.unstable_mockModule 或在 package.json 配置 transform。 spyOn 后未 restore：jest.spyOn 默认保留原实现，但修改返回值后可能影响其他测试，需在 afterEach 中 mockRestore()。

---

### FB-13-SC-P-001：测试不稳定（Flaky Test）有哪些常见原因？如何解决？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：Flaky Test、测试稳定性、异步、并发、Mock、E2E
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请分析前端测试中 Flaky Test（不稳定测试）的常见原因，并给出系统性解决方案。

**参考答案**：

常见原因：

1. **异步等待不当**：用 `setTimeout` 或固定等待，而非显式等待条件。
2. **未隔离的状态**：测试共享全局状态、localStorage、DOM，导致互相影响。
3. **并发问题**：多个测试同时读写同一资源。
4. **时间/随机数依赖**：未 Mock `Date`、`Math.random`、动画。
5. **网络依赖**：真实请求或 Mock 不稳定。
6. **E2E 环境不稳定**：页面加载慢、元素动态渲染、资源竞争。
7. **测试顺序依赖**：测试 A 依赖测试 B 的副作用。

解决方案：

1. 用 `waitFor` / `findBy` 替代固定等待。
2. 每个测试前后清理环境（`beforeEach`/`afterEach`）。
3. 避免测试间共享可变状态。
4. Mock 不稳定依赖（时间、随机、网络）。
5. E2E 中设置合理的超时、重试，使用稳定的测试账号和数据。
6. 对反复失败的测试先标记跳过并单独修复，不姑息。
7. 建立 Flaky Test 追踪机制，定期清理。

**评分维度**：
- 说出 5 个以上原因（40%）
- 给出 4 个以上解决方案（40%）
- 能结合 E2E 和单元测试分别说明（20%）

**常见错误**：
- 遇到 Flaky Test 直接重试或删除
- 用 `await new Promise(r => setTimeout(r, 1000))` 处理异步

**延伸追问**：
- 如何设计 E2E 测试账号避免互相影响？
- Playwright/Cypress 中如何处理动态加载的元素？

**口头回答版**：
> 异步等待不当：用 setTimeout 或固定等待，而非显式等待条件。 未隔离的状态：测试共享全局状态、localStorage、DOM，导致互相影响。 并发问题：多个测试同时读写同一资源。 时间/随机数依赖：未 Mock Date、Math.random、动画。

---

### FB-13-CO-P-002：什么是契约测试（Contract Testing）？前端如何应用？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：Contract Testing、Pact、契约测试、前后端协作、API
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释契约测试的概念，并说明前端团队如何与后端团队协作使用契约测试。

**参考答案**：

契约测试用于验证服务间（如前端与后端）的接口契约是否一致，而不需要启动完整依赖服务。

核心思想：

- 消费者（前端）定义期望的请求和响应格式。
- 提供者（后端）验证能否满足这些契约。
- 使用 Pact 等工具生成契约文件，双方共享。

前端应用方式（以 Pact 为例）：

```js
import { Pact } from '@pact-foundation/pact';

const provider = new Pact({
  consumer: 'frontend',
  provider: 'user-service',
  port: 1234
});

it('gets user by id', async () => {
  await provider.addInteraction({
    state: 'user exists',
    uponReceiving: 'a request for user 1',
    withRequest: { method: 'GET', path: '/users/1' },
    willRespondWith: {
      status: 200,
      body: { id: 1, name: 'Tom' }
    }
  });

  const user = await fetchUser(1);
  expect(user.name).toBe('Tom');
});
```

价值：

- 前后端可独立开发和测试。
- 接口变更时提前发现兼容性问题。
- 减少集成阶段的问题。

**评分维度**：
- 解释契约测试核心思想（40%）
- 能说明消费者/提供者关系（25%）
- 能写出或描述 Pact 使用方式（25%）
- 说出应用价值（10%）

**常见错误**：
- 把契约测试等同于 E2E 测试
- 认为契约测试可以替代单元测试

**延伸追问**：
- 契约测试和 Mock Server 有什么区别？
- 后端接口升级破坏契约时，如何处理？

**口头回答版**：
> 契约测试用于验证服务间（如前端与后端）的接口契约是否一致，而不需要启动完整依赖服务。 - 消费者（前端）定义期望的请求和响应格式。 - 提供者（后端）验证能否满足这些契约。 - 使用 Pact 等工具生成契约文件，双方共享。

---

### FB-13-CO-P-003：什么是变异测试（Mutation Testing）？它如何弥补覆盖率的不足？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：Mutation Testing、Stryker、测试有效性、覆盖率、质量指标
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释变异测试的原理，并说明它为什么能弥补代码覆盖率的不足。

**参考答案**：

变异测试通过对源代码进行微小改动（变异体，mutant），然后运行测试，检查测试是否能发现这些改动。

流程：

1. 生成变异体：如把 `>` 改为 `>=`、`true` 改为 `false`、删除函数调用。
2. 运行测试套件。
3. 如果测试失败，说明变异体被“杀死”，测试有效。
4. 如果测试通过，说明变异体“存活”，测试存在缺陷。

指标：

- **Mutation Score**：被杀死的变异体比例，越高说明测试越有效。

为什么弥补覆盖率：

- 覆盖率只说明代码被执行过，不说明测试有断言验证。
- 变异测试验证测试是否真的在检查行为，发现“无效测试”。

前端工具：

- **Stryker**：支持 JavaScript/TypeScript、React/Vue/Angular。

**评分维度**：
- 解释变异测试原理（40%）
- 能说明与覆盖率的区别（35%）
- 提到 Mutation Score 和工具（25%）

**常见错误**：
- 认为变异测试替代单元测试
- 把 Mutation Score 和 Coverage 混为一谈

**延伸追问**：
- 等价变异体（Equivalent Mutant）是什么？如何处理？
- 变异测试运行慢，如何在 CI 中使用？

**参考资源**：
- [Stryker Mutator](https://stryker-mutator.io/)

**口头回答版**：
> 变异测试通过对源代码进行微小改动（变异体，mutant），然后运行测试，检查测试是否能发现这些改动。 生成变异体：如把 > 改为 >=、true 改为 false、删除函数调用。 如果测试失败，说明变异体被“杀死”，测试有效。 如果测试通过，说明变异体“存活”，测试存在缺陷。

---

### FB-13-SC-P-002：E2E 测试中如何设计可维护的页面对象（POM）？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：E2E、POM、Page Object Model、Playwright、Cypress、可维护性
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明 Page Object Model（POM）在 E2E 测试中的作用，并给出一种可维护的实现方式。

**参考答案**：

POM 将页面元素定位和操作逻辑封装到对象中，使测试用例与页面实现解耦。

作用：

- 元素选择器集中管理，UI 变更时只需修改一处。
- 测试用例更聚焦业务行为，可读性更高。
- 便于复用页面操作。

可维护实现方式：

```ts
// pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  get usernameInput() { return this.page.getByLabel('用户名'); }
  get passwordInput() { return this.page.getByLabel('密码'); }
  get submitButton() { return this.page.getByRole('button', { name: '登录' }); }
  get errorMessage() { return this.page.getByText('登录失败'); }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

```ts
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/login');
  await loginPage.login('tom', 'secret');
  await expect(page).toHaveURL('/dashboard');
});
```

进阶建议：

- 不在测试用例中直接写选择器。
- 使用 `data-testid` 或语义化 role 而非 CSS 类名。
- 把公共操作提取为 BasePage / Component Object。
- 避免在 POM 中写断言，断言留在测试层。

**评分维度**：
- 解释 POM 作用（30%）
- 给出清晰的分层结构（35%）
- 提到选择器策略和复用（25%）
- 提到断言分层（10%）

**常见错误**：
- POM 中塞满业务断言
- 使用不稳定选择器如 `.btn-primary > div:nth-child(2)`
- 一个页面类过大，没有按组件拆分

**延伸追问**：
- POM 和 App Actions 模式有什么区别？
- 如何处理多个页面组合而成的复杂流程？

**口头回答版**：
> POM 将页面元素定位和操作逻辑封装到对象中，使测试用例与页面实现解耦。 - 元素选择器集中管理，UI 变更时只需修改一处。 - 测试用例更聚焦业务行为，可读性更高。 - 便于复用页面操作。

---

### FB-13-CO-P-004：什么是属性化测试（Property-Based Testing）？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：Property-Based Testing、fast-check、模糊测试、测试生成、边界
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释属性化测试的概念，并说明它适合什么场景，前端如何实践。

**参考答案**：

属性化测试不手写具体输入，而是定义数据生成器和应满足的属性，由框架自动生成大量随机输入进行验证。

与传统测试对比：

- 传统：给定输入 2 和 3，期望输出 5。
- 属性化：对于任意整数 a、b，`add(a, b) === add(b, a)`。

前端工具：

- **fast-check**：JS/TS 属性化测试库，可与 Jest/Vitest 集成。

示例：

```js
import fc from 'fast-check';

test('addition is commutative', () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (a, b) => {
      return add(a, b) === add(b, a);
    })
  );
});
```

适用场景：

- 算法/工具函数（排序、加密、解析器）。
- 需要覆盖大量边界条件的输入。
- 发现手写用例难以想到的边界 bug。

注意事项：

- 需要定义清晰的数学属性或不变量。
- 失败时会给出最小反例（shrinking）。
- 不能替代业务场景测试。

**评分维度**：
- 解释属性化测试与传统测试差异（40%）
- 能写出简单示例（30%）
- 说出适用场景和限制（30%）

**常见错误**：
- 把属性化测试用于所有业务场景
- 属性定义模糊，无法有效验证

**延伸追问**：
- 属性化测试生成的随机数据如何复现失败？
- 和模糊测试（Fuzzing）有什么关系？

**口头回答版**：
> 属性化测试不手写具体输入，而是定义数据生成器和应满足的属性，由框架自动生成大量随机输入进行验证。 - 传统：给定输入 2 和 3，期望输出 5。 - 属性化：对于任意整数 a、b，add(a, b) === add(b, a)。 - fast-check：JS/TS 属性化测试库，可与 Jest/Vitest 集成。

---

### FB-13-CO-P-005：大规模测试套件如何加速执行？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：测试性能、并行、分片、缓存、CI、测试优化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明当单元测试和 E2E 测试数量庞大、执行缓慢时，可以从哪些层面进行加速。

**参考答案**：

单元测试加速：

1. **并行执行**：Jest `--maxWorkers`、Vitest 多线程。
2. **按需运行**：只运行变更相关测试（`--changedSince`、 `git diff`）。
3. **隔离昂贵操作**：减少不必要的 IO、数据库、网络 Mock。
4. **缓存 transform**：Jest `cacheDirectory`、持久化 Babel/SWC 缓存。
5. **SWC / esbuild**：替换 ts-jest 加速转译。
6. **拆分测试文件**：避免单个超大测试文件。
7. **Mock 重型依赖**：避免加载完整 UI 库或图表库。

E2E 加速：

1. **并行分片**：CI 多 job 分片运行（`--shard=1/4`）。
2. **复用登录态**：提前登录后保存 storage state。
3. **减少不必要的页面导航**：合并相关场景。
4. **使用 API 准备测试数据**：替代 UI 操作前置步骤。
5. **选择性执行**：只跑受影响的 E2E 用例。

通用策略：

- 在 CI 中分层执行：PR 跑单元+集成，夜间跑全量 E2E。
- 引入测试影响分析，优先运行相关测试。

**评分维度**：
- 单元测试优化手段（40%）
- E2E 优化手段（35%）
- CI 分层策略（25%）

**常见错误**：
- 单纯增加 worker 而不解决 I/O 瓶颈
- 全量跑 E2E 导致 CI 过长

**延伸追问**：
- Jest 中 worker 越多越好吗？瓶颈在哪？
- 如何识别最慢的测试文件？

**口头回答版**：
> 并行执行：Jest --maxWorkers、Vitest 多线程。 按需运行：只运行变更相关测试（--changedSince、 git diff）。 隔离昂贵操作：减少不必要的 IO、数据库、网络 Mock。 缓存 transform：Jest cacheDirectory、持久化 Babel/SWC 缓存。

---

### FB-13-CO-P-006：代码覆盖率是如何被收集的？简单说明 Istanbul 的原理。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：Istanbul、覆盖率、Instrument、AST、源码转换
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Jest/Vitest 中的代码覆盖率是如何收集的，Istanbul 是如何工作的。

**参考答案**：

覆盖率收集流程：

1. **Instrument（插桩）**：在编译/转译阶段，Istanbul 把源码转换成带有计数器的代码。
2. **执行测试**：每执行到一行、一个分支、一个函数，计数器加一。
3. **生成报告**：测试结束后汇总计数器数据，生成 HTML/LCOV/JSON 报告。

Istanbul 原理：

- 基于 AST 解析源码。
- 在语句、分支、函数位置插入计数逻辑。

转换前：

```js
function add(a, b) {
  return a + b;
}
```

转换后（简化）：

```js
var coverage = globalThis.__coverage__ || {};
function add(a, b) {
  coverage.fn[1]++;
  coverage.stmt[1]++;
  return a + b;
}
```

Jest 默认使用 Istanbul（通过 `babel-plugin-istanbul` 或 V8 coverage）。
Vitest 也支持 Istanbul 和原生 V8 coverage。

**评分维度**：
- 说明覆盖率收集三步骤（40%）
- 解释 Instrument 原理（35%）
- 知道 Jest/Vitest 的实现方式（25%）

**常见错误**：
- 认为覆盖率是通过运行时解析源码逐行比对
- 分不清 Istanbul 与 V8 coverage 的差异

**延伸追问**：
- V8 coverage 和 Istanbul coverage 有什么区别？
- 为什么 source map 对 TypeScript 覆盖率很重要？

**口头回答版**：
> Instrument（插桩）：在编译/转译阶段，Istanbul 把源码转换成带有计数器的代码。 执行测试：每执行到一行、一个分支、一个函数，计数器加一。 生成报告：测试结束后汇总计数器数据，生成 HTML/LCOV/JSON 报告。 Istanbul 原理：

---

### FB-13-EN-P-001：如何在 CI/CD 流程中设计前端测试流水线？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：13 代码质量与测试
**标签**：CI/CD、流水线、GitHub Actions、测试策略、自动化
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请设计一个前端项目的 CI/CD 测试流水线，要求保证质量的同时控制反馈时长。

**参考答案**：

推荐流水线阶段：

1. **Install**：依赖安装，使用 lockfile 缓存（pnpm/npm/yarn cache）。
2. **Lint & Format**：ESLint、Prettier、TypeScript 类型检查。
3. **Unit Test**：运行单元测试，要求通过且覆盖率达标。
4. **Build**：构建产物，检查构建是否成功。
5. **Integration Test**：运行组件/集成测试。
6. **E2E Test（可选/夜间）**：在 PR 中可只跑关键路径，全量 E2E 定时运行。
7. **Deploy Preview**：部署预览环境，供人工验收。
8. **Production Deploy**：合并到主分支后自动部署。

示例（GitHub Actions 简化）：

```yaml
name: CI
on: [pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test:unit --coverage
      - run: pnpm build
```

优化策略：

- 使用缓存加速 install 和 build。
- 单元测试失败时立即终止，缩短反馈时间。
- E2E 使用并行分片和预置测试数据。
- 覆盖率阈值不达标时阻止合并。

**评分维度**：
- 阶段设计完整（40%）
- 考虑到反馈时长优化（25%）
- 缓存/并行/失败策略合理（25%）
- 能写出示例配置（10%）

**常见错误**：
- 把 E2E 放在每次提交都全量运行
- 没有类型检查或 lint 阶段
- 没有缓存依赖导致 CI 过慢

**延伸追问**：
- 如何在 CI 中处理视觉回归测试？
- 测试失败时如何快速定位责任人？

**口头回答版**：
> Install：依赖安装，使用 lockfile 缓存（pnpm/npm/yarn cache）。 Lint & Format：ESLint、Prettier、TypeScript 类型检查。 Unit Test：运行单元测试，要求通过且覆盖率达标。 Build：构建产物，检查构建是否成功。

---

### FB-13-PE-P-001：前端如何做性能测试？请列举指标和工具。

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：性能测试、Lighthouse、Web Vitals、CI、性能指标
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明前端性能测试的主要指标、常用工具，以及如何在 CI 中防止性能退化。

**参考答案**：

核心性能指标（Web Vitals）：

- **LCP（Largest Contentful Paint）**：最大内容绘制，目标 < 2.5s。
- **INP（Interaction to Next Paint）**：交互到下一次绘制，目标 < 200ms。
- **CLS（Cumulative Layout Shift）**：累积布局偏移，目标 < 0.1。
- **FCP（First Contentful Paint）**：首次内容绘制。
- **TTFB（Time to First Byte）**：首字节时间。

常用工具：

- **Lighthouse**：综合性能、可访问性、SEO 评分。
- **WebPageTest**：多地区、多设备、多网络条件下的详细分析。
- **Chrome DevTools Performance**：本地分析运行时性能。
- **Lighthouse CI**：在 CI 中运行 Lighthouse 并设置阈值。
- **Sitespeed.io**：可定制的性能监控平台。

防止性能退化：

1. 在 CI 中运行 Lighthouse CI，设置 LCP/CLS 阈值。
2. 监控产物体积，设置 bundle size 阈值（如 `bundlesize`）。
3. 对比每次构建的性能基线，发现回归立即告警。
4. 建立性能 Dashboard，长期追踪趋势。

**评分维度**：
- 说出 4 个以上核心指标（40%）
- 列举 3 种以上工具（30%）
- 能说明 CI 防退化策略（30%）

**常见错误**：
- 只关注 Lighthouse 总分，不关注具体 Web Vitals
- 在本地一次跑分就下结论，忽视网络和环境波动

**延伸追问**：
- Lighthouse 分数和真实用户体验有什么差距？
- 如何做运行时性能监控（RUM）？

**口头回答版**：
> 核心性能指标（Web Vitals）： - LCP（Largest Contentful Paint）：最大内容绘制，目标 < 2.5s。 - INP（Interaction to Next Paint）：交互到下一次绘制，目标 < 200ms。 - CLS（Cumulative Layout Shift）：累积布局偏移，目标 < 0.1。

---

### FB-13-CA-P-001：下面异步测试代码存在什么问题？如何修复？

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：异步测试、Jest、Promise、done、async-await
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
// fetchUser.js
export async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

// fetchUser.test.js
import { fetchUser } from './fetchUser';

test('fetch user', () => {
  fetchUser(1).then(user => {
    expect(user.name).toBe('Tom');
  });
});
```

请指出上述测试的问题，并给出两种修复方式。

**参考答案**：

**问题**：测试在 Promise 的 `then` 回调中执行断言，但 Jest 不会等待 Promise 完成。如果断言失败或 Promise 未 resolve，测试可能错误地通过。

**修复方式一：使用 async/await**

```js
test('fetch user', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Tom');
});
```

**修复方式二：return Promise**

```js
test('fetch user', () => {
  return fetchUser(1).then(user => {
    expect(user.name).toBe('Tom');
  });
});
```

**修复方式三：使用 resolves/rejects**

```js
test('fetch user', () => {
  return expect(fetchUser(1)).resolves.toEqual({ name: 'Tom' });
});
```

进阶建议：

- 优先使用 `async/await`，可读性最好。
- 测试失败场景时使用 `await expect(...).rejects.toThrow(...)`。

**评分维度**：
- 指出测试不等待 Promise 的问题（40%）
- 给出两种以上修复方式（40%）
- 提到错误场景测试写法（20%）

**常见错误**：
- 认为 Promise 回调中的断言会自动被 Jest 捕获
- 在 async 测试中没有 await 也没有 return

**延伸追问**：
- 如果 `fetchUser` 抛出异常，如何测试？
- `done` 回调在现代测试中是否还推荐使用？

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-13-CO-P-007：使用 React Testing Library 测试组件时应避免哪些反模式？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：React Testing Library、组件测试、反模式、测试哲学
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明使用 React Testing Library 测试组件时应该避免哪些反模式，并解释原因。

**参考答案**：

常见反模式：

1. **测试实现细节**：
   - 不要测试组件内部 state、方法调用顺序、useEffect 依赖。
   - 应该测试用户可见的结果。

2. **使用 CSS 类名或 ID 查询元素**：
   - 避免 `getByClassName`、`getById`。
   - 优先使用 `getByRole`、`getByLabelText`、`getByText`、`getByTestId`。

3. **用 `fireEvent` 代替 `userEvent`**：
   - `userEvent` 更接近真实用户交互，会触发完整事件链。

4. **断言 DOM 结构而非内容**：
   - 不要 `expect(container.innerHTML).toMatchSnapshot()`，容易误报。

5. **一个测试验证多个不相关行为**：
   - 保持每个测试聚焦一个概念，便于定位失败。

6. **忽略清理**：
   - 测试中使用 `MockDate`、全局变量后要在 `afterEach` 恢复。

7. **测试覆盖率而非行为**：
   - 不要为了覆盖某行代码而写无意义断言。

**评分维度**：
- 说出 4 个以上反模式（50%）
- 能解释每个反模式的危害（30%）
- 能给出正确写法（20%）

**常见错误**：
- 认为 Testing Library 的 `container.querySelector` 是推荐做法
- 过度使用 snapshot 代替具体断言

**延伸追问**：
- 什么时候可以使用 `data-testid`？
- 如何测试异步加载的数据？

**参考资源**：
- [Testing Library - Common Mistakes](https://testing-library.com/docs/guiding-principles/)

**口头回答版**：
> - 不要测试组件内部 state、方法调用顺序、useEffect 依赖。 - 应该测试用户可见的结果。 使用 CSS 类名或 ID 查询元素： - 避免 getByClassName、getById。

---

### FB-13-CO-P-008：如何评估一套测试套件是否“有效”？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：测试、质量、单元测试、集成测试
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
除了覆盖率，还应该从哪些维度评价测试套件的质量和有效性？

**参考答案**：

有效测试套件的评估维度：

1. **信心度**：重构后敢不敢直接跑测试，还是必须手动验证？
2. **反馈速度**：CI 是否在合理时间内返回结果。
3. **失败可解释性**：测试失败时能否快速定位根因。
4. **Flaky 率**：不稳定测试占比，高 flaky 会侵蚀信任。
5. **行为覆盖**：是否覆盖关键用户路径和异常场景。
6. **维护成本**：测试代码是否稳定，是否随业务变动频繁失效。
7. **变异分数（Mutation Score）**：测试是否能发现代码改动。

不要只看覆盖率，要关注测试是否真正在验证有价值的行为。

**评分维度**：
- 多维度评估（50%）：能说出 5 个以上维度
- 覆盖行为 vs 覆盖代码（30%）
- 可落地指标（20%）：提到 flaky 率、mutation score 等

**常见错误**：
- 只看覆盖率判断测试好坏
- 忽视 flaky 测试对团队信心的影响

**延伸追问**：
- 如何用数据说服团队重视测试有效性？
- 测试运行很慢但覆盖率高，说明什么？

**相关题目**：
- [FB-13-CO-A-006 覆盖率阈值应该如何设置？只看覆盖率有什么陷阱？](#FB-13-CO-A-006)

**参考资源**：
- [Stryker Mutator](https://stryker-mutator.io/)

**口头回答版**：
> 一套测试有没有效，不能只看覆盖率。更重要的是大家敢不敢重构、CI 反馈快不快、失败了好不好定位、有没有覆盖关键路径。flaky 测试多、维护成本高的测试套件，覆盖率再高也不可信。

---

### FB-13-SC-P-003：如何设计一个前端 Mock 平台供多个团队使用？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：13 代码质量与测试
**标签**：Mock、工程化、集成测试、API、质量
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
假设公司内多个前端团队都需要 Mock 后端接口，请设计一个可复用的 Mock 平台。

**参考答案**：

设计要点：

1. **契约驱动**：Mock 数据基于 OpenAPI/Swagger 或 GraphQL Schema 生成，保证与真实接口结构一致。
2. **多环境支持**：本地开发、测试、CI 使用不同数据集。
3. **场景管理**：支持成功、失败、空数据、慢响应等多种场景切换。
4. **权限与版本**：按业务域划分 namespace，接口版本化。
5. **与工具链集成**：提供 CLI、IDE 插件、MSW handler 生成。
6. **可观测**：记录哪些接口被 Mock、命中次数，便于发现过期契约。
7. **热更新**：修改 Mock 数据后无需重启服务。

架构草图：

```text
前端项目 → Mock SDK → 本地 Mock Server / MSW → Mock 数据仓库
                              ↑
                        接口契约中心
```

收益：降低重复造轮子、保证前后端契约一致、提升本地开发效率。

**评分维度**：
- 平台能力完整（40%）：能说出 5 个以上能力
- 多团队协作（30%）
- 工具集成与可观测（30%）

**常见错误**：
- 把 Mock 平台做成静态 JSON 文件仓库，缺乏版本和场景管理
- 与真实接口契约脱节，导致联调时大量返工

**延伸追问**：
- Mock 数据和真实后端不一致时如何发现？
- 平台应该由前端团队还是后端团队维护？

**参考资源**：
- [OpenAPI Specification](https://swagger.io/specification/)

**口头回答版**：
> 多团队 Mock 平台要基于接口契约生成数据，支持不同环境和场景，比如成功、失败、超时。还要按业务域分 namespace、做版本管理，和本地开发、CI 工具链集成。关键是别让 mock 和后端真实接口脱节。

---

### FB-13-CO-P-009：什么是测试污染（Test Pollution）？有哪些表现和治理方法？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：测试、质量、Mock、Jest
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释测试污染的概念，列举前端测试中的典型表现，并给出治理方案。

**参考答案**：

测试污染是指测试之间通过共享状态互相影响，导致测试单独通过、一起跑失败，或结果不稳定。

典型表现：

1. **全局变量/单例未重置**：测试 A 修改了全局配置，测试 B 读到脏值。
2. **DOM 未清理**：React/Vue 组件挂载后未 unmount。
3. **localStorage/sessionStorage 残留**。
4. **Mock 状态未清理**：`jest.fn()` 调用次数跨测试累积。
5. **共享可变 fixture**。
6. **时间/随机数未恢复**。

治理方法：

- 每个测试前后重置环境：`beforeEach`/`afterEach`。
- 使用测试框架的 `cleanup`（如 Testing Library）。
- 避免测试间共享可变状态，优先深拷贝 fixture。
- Mock 后在 `afterEach` 中 `mockRestore`/`clearAllMocks`。
- 对 Math.random、Date、定时器统一 Mock 并恢复。

**评分维度**：
- 概念与表现（40%）：能说出 4 个以上表现
- 治理方法（40%）
- 能举例（20%）

**常见错误**：
- 遇到 flaky 测试直接重试
- 认为测试应该按固定顺序执行

**延伸追问**：
- Testing Library 的 cleanup 在什么情况下会自动执行？
- 如何检测测试污染？

**相关题目**：
- [FB-13-SC-P-001 测试不稳定（Flaky Test）有哪些常见原因？如何解决？](#FB-13-SC-P-001)

**参考资源**：
- [Testing Library - cleanup](https://testing-library.com/docs/react-testing-library/api/#cleanup)

**口头回答版**：
> 测试污染就是测试之间互相影响，比如全局变量没清、mock 调用次数没重置。治理办法是每个测试前后清理环境，fixture 要深拷贝，mock 要 restore。不能让测试依赖执行顺序。

---

### FB-13-CO-P-010：什么是测试债务（Test Debt）？如何偿还？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：测试、质量、技术债、TDD
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释测试债务的概念，并说明如何在项目中识别和偿还测试债务。

**参考答案**：

测试债务是指为了短期速度而积累的低质量、缺失或过度复杂的测试，最终拖累交付效率。

常见形式：

1. **缺失测试**：关键路径没有自动化测试，只能手动回归。
2. **脆弱测试**：经常因为实现细节变动而失败。
3. **低价值测试**：只覆盖 trivial 代码，没有断言。
4. **过时的测试**：业务已改，测试仍在验证旧行为。
5. **慢测试**：拖慢 CI 反馈。

偿还方法：

- **停止新增债务**：PR 必须配套测试。
- **按风险排序**：优先补充核心路径和缺陷高发区。
- **重构或删除脆弱测试**：把测试目标转向行为而非实现。
- **引入契约/快照/视觉回归**：逐步补全关键覆盖。
- **持续监控**：记录 flaky 和慢测试，定期清理。

**评分维度**：
- 债务识别（40%）：能说出 4 种以上形式
- 偿还策略（40%）
- 预防机制（20%）

**常见错误**：
- 认为测试越多越好，不敢删过时测试
- 一次性重写全部测试导致项目停滞

**延伸追问**：
- 测试债务和技术债务有什么关系？
- 如何在业务紧张时争取偿还测试债务的时间？

**参考资源**：
- [Tech Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)

**口头回答版**：
> 测试债务就是测试写得差、缺失或者过时，拖累后续开发。偿还时要先停掉新增债务，再按风险优先级补核心路径的测试，脆弱和过时的测试该重构就重构、该删就删。

---

### FB-13-EN-P-002：如何在 CI/CD 中实现前端测试失败自动分类与告警？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：13 代码质量与测试
**标签**：CI/CD、工程化、可观测性、质量
**出现频率**：低频
**预计回答时长**：5-10 分钟

**题目描述**：
请设计一套方案，对 CI/CD 流水线中的前端测试失败进行自动分类、归因和告警。

**参考答案**：

方案设计：

1. **统一测试报告格式**：使用 JUnit XML，统一单元测试、E2E 输出。
2. **失败信息采集**：收集失败用例、堆栈、截图、日志、环境信息。
3. **自动分类规则**：
   - 历史 flaky：近 N 次有成功有失败。
   - 环境异常：大量用例同时失败、网络超时。
   - 产品 bug：断言明确指向业务逻辑。
   - 测试 bug：测试本身写法问题。
4. **归因**：结合最近代码变更、测试用例 owner、模块映射。
5. **告警**：即时通讯通知 owner，高危失败阻塞合并。
6. **看板**：统计 flaky 率、失败趋势、修复时长。
7. **自愈**：对 flaky 用例自动重试，但仍记录并安排修复。

工具：CI 平台（GitHub Actions/GitLab CI）、Sentry、自研分类服务、IM webhook。

**评分维度**：
- 信息采集与标准化（30%）
- 分类规则（30%）
- 归因与告警（25%）
- 看板与自愈（15%）

**常见错误**：
- 所有失败都直接通知全群，导致告警疲劳
- 没有区分 flaky 和真实失败

**延伸追问**：
- 如何定义和度量 flaky 率？
- 自动重试会不会掩盖真实问题？

**参考资源**：
- [JUnit XML Format](https://github.com/testmoapp/junitxml)

**口头回答版**：
> CI 测试失败要先统一报告格式，然后按规则自动分类：是 flaky、环境异常、产品 bug 还是测试 bug。再通知相关负责人，并在看板里统计趋势。对 flaky 可以自动重试，但不能放任不管，要定期修。

---

### FB-13-CO-P-011：前端测试如何处理浏览器兼容性与设备差异？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：测试、Playwright、Cypress、组件、质量
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明前端自动化测试在覆盖不同浏览器、分辨率和设备时，应采取的方案。

**参考答案**：

处理策略：

1. **目标浏览器矩阵**：根据用户数据确定需要覆盖的浏览器和版本。
2. **工具选择**：
   - Playwright 原生支持 Chromium、Firefox、WebKit。
   - Cypress 支持 Chrome、Edge、Firefox。
   - 手动/探索性测试用 BrowserStack/Sauce Labs。
3. **组件测试**：在关键浏览器跑组件测试，捕获渲染差异。
4. **视觉回归**：按浏览器/分辨率建立 baseline。
5. **功能检测优先**：对浏览器 API 做特性检测，减少 UA 判断。
6. **模拟设备**：使用 viewport、userAgent、touch 事件模拟移动端。
7. **优先级**：核心流程覆盖主要浏览器，边缘浏览器抽样或人工验证。

成本控制：

- CI 中不必每次跑全矩阵，可在 nightly 或发布前跑。
- 使用 Playwright sharding 并行执行。

**评分维度**：
- 矩阵定义（25%）
- 工具与并行（25%）
- 视觉回归（25%）
- 成本策略（25%）

**常见错误**：
- 所有浏览器都全量跑，导致 CI 极慢
- 只测 Chrome，忽视 Safari 的兼容性差异

**延伸追问**：
- 如何处理浏览器特有 bug 的回归测试？
- 移动端和桌面端测试应该共享用例吗？

**参考资源**：
- [Playwright - Browsers](https://playwright.dev/docs/browsers)

**口头回答版**：
> 浏览器兼容性测试要先定目标浏览器矩阵，用 Playwright 或 Cypress 多浏览器跑。关键流程要覆盖，视觉回归可以按浏览器建基线。不用每次 CI 都跑全矩阵，可以夜间或发布前跑，兼顾成本和覆盖。

---

### FB-13-CO-P-012：什么是 Living Documentation？测试如何作为活文档？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：BDD、TDD、测试、质量
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Living Documentation 的概念，并说明如何让测试成为可执行的文档。

**参考答案**：

Living Documentation 是指随着代码变更自动更新的文档。测试天然是活文档，因为它能验证系统当前行为。

实践方法：

1. **使用领域语言命名测试**：测试名直接描述业务行为。
2. **BDD 场景**：Given-When-Then 让非技术人员也能读懂。
3. **结构化测试**：Arrange-Act-Assert 清晰展示输入、动作、预期。
4. **生成报告**：从 BDD 或测试输出生成可读文档。
5. **与需求关联**：测试 ID 或标签映射到需求 ticket。
6. **持续维护**：测试随需求变更而更新，避免文档与实际行为脱节。

注意事项：

- 活文档的质量取决于测试本身是否清晰。
- 不要把所有细节都塞进测试名，保持可读性。

**评分维度**：
- 概念（30%）
- 命名与结构（40%）
- 与需求/报告结合（30%）

**常见错误**：
- 测试名写成 `test1`、`test2`
- 活文档只生成不维护，导致与实际系统不一致

**延伸追问**：
- BDD 场景和单元测试作为文档各有什么优劣？
- 如何让产品同学也参与到活文档维护中？

**相关题目**：
- [FB-13-CO-A-003 TDD 和 BDD 有什么区别？](#FB-13-CO-A-003)

**参考资源**：
- [Living Documentation by Cyrille Martraire](https://www.goodreads.com/book/show/22677312-living-documentation)

**口头回答版**：
> Living Documentation 就是跟着代码一起更新的文档。测试本身就是活文档，如果测试名用业务语言写、结构清楚，非技术人员也能看懂系统行为。关键是测试要持续维护，不能变成过期的文档。

---

### FB-13-CO-P-013：如何设计前端异常监控与可观测性测试？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：错误监控、可观测性、Sentry、测试、质量
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何在前端建立异常监控，并通过测试验证监控链路的有效性。

**参考答案**：

异常监控体系：

1. **采集**：捕获 JS Error、Promise reject、资源加载失败、API 异常、性能指标。
2. **上报**：通过 Sentry 等 SDK 上报，注意脱敏和采样。
3. **上下文**：记录用户环境、版本、路由、操作路径。
4. **告警**：按错误率、影响用户数分级告警。

可观测性测试：

1. **错误边界测试**：验证 React Error Boundary 能捕获并上报。
2. **集成测试**：触发错误，断言监控 SDK 被调用。
3. **E2E 验证**：在 staging 注入异常，确认告警链路打通。
4. **Source map**：构建时上传 source map，确保堆栈可读。
5. **RUM 指标**：验证 LCP、INP、CLS 采集正常。

持续改进：

- 建立错误分类和修复 SLA。
- 定期 review 高频错误，反向补充测试。

**评分维度**：
- 监控体系（35%）
- 可观测性测试（35%）
- 持续改进（30%）

**常见错误**：
- 只采集错误数量，不关注影响用户数和错误分类
- 上线后才发现监控链路没通

**延伸追问**：
- 如何处理用户隐私与异常上报的平衡？
- 异常采样率应该如何设置？

**参考资源**：
- [Sentry 官方文档](https://docs.sentry.io/)

**口头回答版**：
> 前端异常监控要采集 JS 错误、API 失败和性能指标，用 Sentry 上报并带上下文。可观测性测试就是验证错误边界、上报链路和 source map 是否有效。staging 里可以主动注入异常，看能不能收到告警。

---

### FB-13-CA-P-002：下面的测试代码存在什么时序问题？如何修复？

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：异步、Promise、Jest、质量
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：

```js
// poll.js
export function poll(fetchData, interval) {
  return new Promise((resolve) => {
    const id = setInterval(async () => {
      const data = await fetchData();
      if (data) {
        clearInterval(id);
        resolve(data);
      }
    }, interval);
  });
}

// poll.test.js
import { poll } from './poll';

test('polls until data is ready', () => {
  let count = 0;
  const fetchData = () => Promise.resolve(++count === 3 ? { ok: true } : null);

  poll(fetchData, 1000).then(data => {
    expect(data).toEqual({ ok: true });
  });
});
```

请指出测试的问题并给出修复。

**参考答案**：

问题：测试没有等待 `poll` 完成，也没有控制定时器。如果 `poll` 是异步的，Jest 可能在断言执行前结束测试；且使用真实 `setInterval` 会让测试变慢。

修复：

```js
jest.useFakeTimers();

test('polls until data is ready', async () => {
  let count = 0;
  const fetchData = jest.fn(() =>
    Promise.resolve(++count === 3 ? { ok: true } : null)
  );

  const promise = poll(fetchData, 1000);

  await jest.advanceTimersByTimeAsync(1000);
  await jest.advanceTimersByTimeAsync(1000);

  const data = await promise;
  expect(data).toEqual({ ok: true });
  expect(fetchData).toHaveBeenCalledTimes(3);
});
```

关键点：

- `jest.useFakeTimers()` 替代真实定时器。
- 使用 `async/await` 等待 Promise。
- 推进时间并等待微任务完成。

**评分维度**：
- 指出时序问题（40%）
- 使用 fake timers（30%）
- 等待 Promise（30%）

**常见错误**：
- 使用真实定时器等待
- 不等待 Promise 就结束测试
- 没有验证 fetchData 调用次数

**延伸追问**：
- 如果 `fetchData` 本身有延迟，怎么测？
- 如何防止 poll 无限循环？

**相关题目**：
- [FB-13-CA-A-001 Jest 中如何使用 fake timers 测试下面的代码？](#FB-13-CA-A-001)

**参考资源**：
- [Jest - Timer Mocks](https://jestjs.io/docs/timer-mocks)

**口头回答版**：
> 这个测试的问题是没有等异步完成，也没用 fake timers。修复时用 jest.useFakeTimers 控制时间，再用 await 等 Promise resolve，同时验证 fetchData 调了几次。

---

## 架构题（54 道）{#architect}

### FB-13-SD-R-001：如何为大型前端项目设计一套完整的测试策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：测试策略、大型项目、分层测试、CI/CD、质量门禁
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
假设你负责一个大型前端项目（数百个页面、微前端架构、多团队并行开发），请设计一套完整的测试策略，包括测试分层、工具选型、CI 集成和质量保障机制。

**参考答案**：

一、测试分层：

1. **单元测试**：
   - 覆盖工具函数、hooks、纯组件。
   - 工具：Vitest / Jest。
   - 占比：60-70%。

2. **集成测试**：
   - 覆盖组件组合、页面局部交互、API 协作。
   - 工具：React Testing Library + MSW。
   - 占比：20-30%。

3. **E2E 测试**：
   - 覆盖核心用户流程（登录、支付、关键业务链路）。
   - 工具：Playwright / Cypress。
   - 占比：5-10%。

4. **视觉回归测试**：
   - 覆盖关键 UI 组件和页面。
   - 工具：Chromatic / Percy。

5. **性能测试**：
   - 工具：Lighthouse CI、WebPageTest。

二、工具选型：

- 构建工具 Vite → 测试用 Vitest。
- 类型安全 → TypeScript 严格模式。
- 代码规范 → ESLint + Prettier + Husky + lint-staged。
- API Mock → MSW（Mock Service Worker）。

三、CI/CD 集成：

- PR 阶段：lint、typecheck、unit、integration、build。
- 合并后：全量 E2E、视觉回归、性能基线。
- 定时任务：全量回归 + 外部依赖健康检查。

四、质量保障机制：

- 覆盖率阈值 + 增量覆盖率检查。
- 代码审查必须包含测试。
- Feature 必须有测试验收标准（DoD）。
- 建立 Flaky Test 监控和修复流程。
- 测试数据与测试环境独立管理。

**评分维度**：
- 分层清晰且比例合理（30%）
- 工具选型有理有据（25%）
- CI 阶段设计合理（25%）
- 质量保障机制完整（20%）

**常见错误**：
- 忽视微前端之间的集成测试
- 测试策略与团队规模不匹配，过度设计

**延伸追问**：
- 多个团队共享组件库时，测试如何协作？
- 如何平衡测试投入与交付速度？

**口头回答版**：
> - 覆盖工具函数、hooks、纯组件。 - 工具：Vitest / Jest。 - 占比：60-70%。 - 覆盖组件组合、页面局部交互、API 协作。

---

### FB-13-SD-R-002：Monorepo 中的测试策略与单仓库有什么不同？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：Monorepo、测试策略、Nx、Turborepo、依赖图、缓存
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明在 Monorepo 中设计测试策略时，相比单仓库需要考虑哪些额外问题，并给出解决方案。

**参考答案**：

额外考虑问题：

1. **跨包依赖影响分析**：
   - 一个包的改动可能影响多个依赖它的包。
   - 解决：利用 Nx / Turborepo 的依赖图，只运行受影响包的测试。

2. **测试范围选择**：
   - 不能每次提交都跑全量测试。
   - 解决：基于 affected 图谱运行测试（`nx affected:test`）。

3. **版本一致性与工具链统一**：
   - 多个包可能使用不同版本的测试框架。
   - 解决：统一 workspace 根目录依赖，使用 pnpm workspace / npm workspaces。

4. **测试数据与环境隔离**：
   - 多个包的集成测试可能共用数据库/服务。
   - 解决：每个测试套件独立初始化与清理，使用 Docker Compose 或 MSW。

5. **缓存与并行**：
   - Monorepo 测试量大，需要远程缓存和并行执行。
   - 解决：Nx Cloud / Turborepo Remote Cache。

6. **发布前的回归策略**：
   - 发布前需要跑全量回归。
   - 解决： nightly CI 跑全量，PR 只跑 affected。

7. **统一覆盖率报告**：
   - 需要聚合多包覆盖率。
   - 解决：nyc / Istanbul 合并覆盖率数据，统一上报 SonarQube。

**评分维度**：
- 说出 4 个以上 Monorepo 特有问题（40%）
- 给出具体工具或方案（35%）
- 能区分 PR 和全量测试策略（25%）

**常见错误**：
- 每次提交都全量跑所有包测试
- 忽视包之间的依赖传播

**延伸追问**：
- Nx 和 Turborepo 在测试调度上有什么差异？
- 如何处理 Monorepo 中循环依赖导致的测试问题？

**口头回答版**：
> - 一个包的改动可能影响多个依赖它的包。 - 解决：利用 Nx / Turborepo 的依赖图，只运行受影响包的测试。 - 不能每次提交都跑全量测试。 - 解决：基于 affected 图谱运行测试（nx affected:test）。

---

### FB-13-SD-R-003：如何建立一个可观测的前端质量度量体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：质量度量、Dashboard、SonarQube、DORA、质量门禁
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个前端质量度量体系，能够持续监控代码质量、测试质量、发布质量和线上稳定性，并指导团队改进。

**参考答案**：

一、度量维度：

1. **代码质量**：
   - 代码覆盖率（行/分支/函数）。
   - 静态分析问题数（ESLint/SonarQube 严重级别 bug）。
   - 技术债务（TODO 数量、复杂度过高函数、重复代码）。
   - 类型覆盖率（TypeScript `any` 比例）。

2. **测试质量**：
   - Flaky Test 数量和修复率。
   - 测试执行时长和成功率。
   - 变异测试分数（可选）。
   - 测试失败分类（产品 bug、测试 bug、环境波动）。

3. **发布质量**：
   - 构建成功率。
   - 回滚次数 / 热修次数。
   - 缺陷逃逸率（线上 bug / 总 bug）。

4. **线上稳定性**：
   - JS 错误率、API 错误率。
   - Web Vitals（LCP、INP、CLS）。
   - 核心业务流程成功率（埋点统计）。

二、工具和采集：

- 代码质量：SonarQube、ESLint、Coverage 报告。
- 测试质量：CI 测试报告、Lighthouse CI。
- 发布质量：CI/CD 平台、Issue 系统。
- 线上稳定性：Sentry、Datadog、自研埋点平台。

三、呈现与改进：

- 建立统一 Dashboard，按周/月展示趋势。
- 设置质量门禁（coverage 阈值、Flaky Test 上限）。
- 定期复盘高逃逸率模块，针对性加固测试。
- 把质量指标纳入团队 OKR 或绩效考核的一部分。

**评分维度**：
- 维度覆盖全面（40%）
- 工具选型合理（25%）
- 能建立从采集到改进的闭环（25%）
- 提到质量门禁和团队机制（10%）

**常见错误**：
- 只关注代码覆盖率一个指标
- 采集数据后没有跟进改进动作

**延伸追问**：
- 如何避免质量指标变成形式主义？
- 如何平衡质量投入和业务交付？

**口头回答版**：
> - 代码覆盖率（行/分支/函数）。 - 静态分析问题数（ESLint/SonarQube 严重级别 bug）。 - 技术债务（TODO 数量、复杂度过高函数、重复代码）。 - 类型覆盖率（TypeScript any 比例）。

---

### FB-13-SD-R-004：如何理解测试金字塔与 Testing Trophy？前端应该如何取舍？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：测试金字塔、Testing Trophy、集成测试、单元测试、E2E
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请比较测试金字塔（Testing Pyramid）和测试奖杯（Testing Trophy），并说明前端项目应如何取舍。

**参考答案**：

**测试金字塔**：

- 强调单元测试最多、E2E 最少。
- 优点是成本低、速度快、定位问题精准。
- 缺点是在 UI 密集型前端中，大量单元测试可能无法覆盖用户真实交互。

**Testing Trophy（Kent C. Dodds 提出）**：

```
        /
       /  \
      / E2E \         小量
     /--------\
    / 集成测试  \       大量
   /------------\
  /  静态分析    \      最大量
 /----------------\
```

- 底层是静态分析（TypeScript、ESLint）。
- 中间是大量的集成测试。
- 顶端是少量 E2E。
- 强调从用户视角出发，集成测试最具性价比。

前端取舍：

- 现代前端组件化、UI 交互复杂，纯函数相对较少，集成测试往往比细粒度单元测试更有价值。
- 推荐：静态分析 + 大量组件/集成测试 + 适量单元测试 + 少量 E2E。
- 具体比例应根据项目类型调整：
  - 工具库：单元测试为主。
  - 业务应用：集成测试为主。
  - 关键链路：E2E 保障。

**评分维度**：
- 准确解释两种模型（40%）
- 分析各自优缺点（25%）
- 给出前端取舍原则和比例建议（25%）
- 能结合项目类型说明（10%）

**常见错误**：
- 把两种模型完全对立
- 不区分项目类型，机械套用比例

**延伸追问**：
- 在你们项目中，哪一层测试投入产出比最高？
- 如何说服团队增加集成测试投入？

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-13-SD-R-005：微前端架构下如何做好测试？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：微前端、集成测试、E2E、契约测试、模块联邦
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
在一个微前端项目中，有基座应用和多个子应用，分别由不同团队维护。请设计一套适合微前端的测试策略。

**参考答案**：

一、子应用内部测试：

- 每个子应用独立运行单元测试、集成测试。
- 保证子应用自身业务正确性。
- 工具：Vitest/Jest + React Testing Library。

二、基座应用测试：

- 测试路由注册、生命周期调度、全局状态、错误边界。
- 对子应用加载失败、加载超时等异常场景做测试。
- 子应用可用 Mock 或轻量 stub 替代。

三、集成测试：

- 在集成环境中把真实子应用组合起来跑关键流程。
- 使用 Playwright/Cypress 覆盖跨子应用的用户流程。
- 验证子应用间通信、状态共享、样式隔离。

四、契约测试：

- 子应用与基座之间约定注册协议、props、事件格式。
- 使用 Pact 或简单的接口 schema 校验。
- 防止子应用升级破坏基座。

五、E2E 测试：

- 覆盖完整业务流程（如：在子应用 A 选择商品 → 子应用 B 下单 → 子应用 C 查看订单）。
- 使用统一测试账号和数据环境。

六、部署与发布：

- 独立部署子应用后触发集成环境冒烟测试。
- 使用 feature flag + 灰度发布降低风险。

**评分维度**：
- 分层测试策略完整（35%）
- 考虑子应用独立性和集成（30%）
- 提到契约和异常场景（20%）
- 考虑发布与灰度策略（15%）

**常见错误**：
- 只测子应用，忽略基座与子应用集成
- 用 E2E 覆盖所有子应用组合，成本过高

**延伸追问**：
- 子应用独立部署后，如何快速发现集成问题？
- 模块联邦（Module Federation）下如何做单元测试？

**口头回答版**：
> 一、子应用内部测试： - 每个子应用独立运行单元测试、集成测试。 - 保证子应用自身业务正确性。 - 工具：Vitest/Jest + React Testing Library。

---

### FB-13-CP-R-001：如何在团队中推动质量左移（Shift-Left）文化？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：质量左移、团队文化、Shift-Left、CI/CD、质量门禁
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
作为前端架构师，你如何在团队中推动质量左移（Shift-Left），让质量问题尽早被发现？

**参考答案**：

一、流程左移：

1. **需求阶段**：测试/QA 提前参与需求评审，明确验收标准（AC）。
2. **设计阶段**：架构师识别高风险点，要求关键模块必须有设计评审。
3. **开发阶段**：
   - 推行 TDD/BDD，功能代码与测试代码同时提交。
   - 本地 pre-commit 钩子跑 lint、format、单元测试。
   - 提交前必须自测并通过 Code Review。
4. **CI 阶段**：PR 即跑全量静态检查、单元测试、集成测试。
5. **发布阶段**：自动化回归、灰度发布、监控告警。

二、工程能力：

- 搭建统一测试框架和 Mock 平台，降低写测试门槛。
- 提供可复用的测试工具和 fixture。
- 建立可视化测试报告和覆盖率 Dashboard。

三、文化与机制：

- 把测试纳入 Definition of Done。
- 设立质量指标并与团队目标绑定。
- 定期举办测试技术分享和 Bug 复盘。
- 对高质量测试和主动发现缺陷给予认可。

四、避免反模式：

- 不盲目追求 100% 覆盖率。
- 不把测试责任完全推给 QA。
- 不惩罚发现 bug 的人，鼓励暴露问题。

**评分维度**：
- 覆盖需求到发布的全流程（40%）
- 提到工程能力和工具支撑（25%）
- 团队文化机制合理（25%）
- 能识别常见反模式（10%）

**常见错误**：
- 只强调工具，不推动流程和文化
- 左移变成增加开发者负担，没有减负措施

**延伸追问**：
- 如果团队成员抵触写测试，你怎么推动？
- 如何度量质量左移的成效？

**口头回答版**：
> 需求阶段：测试/QA 提前参与需求评审，明确验收标准（AC）。 设计阶段：架构师识别高风险点，要求关键模块必须有设计评审。 - 推行 TDD/BDD，功能代码与测试代码同时提交。 - 本地 pre-commit 钩子跑 lint、format、单元测试。

### FB-13-SD-R-006：如何为大型前端项目设计分层测试架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：测试金字塔、集成测试、E2E、架构、系统设计
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
假设你负责一个大型前端项目，请设计一套分层测试架构，并说明各层职责、工具选型和运行策略。

**参考答案**：

分层测试架构：

```
静态分析 / 类型检查
        ↓
单元测试（纯函数、hooks、工具）
        ↓
组件测试 / 集成测试（组件组合、页面局部、API）
        ↓
契约测试（前后端接口契约）
        ↓
E2E 测试（核心用户流程）
        ↓
视觉回归 / 性能测试
```

各层职责与工具：

| 层级 | 工具 | 运行频率 | 占比 |
|------|------|----------|------|
| 静态分析 | TypeScript、ESLint | 每次提交 | 最大 |
| 单元测试 | Vitest/Jest | PR/本地 | 30-40% |
| 组件/集成测试 | RTL + MSW | PR | 30-40% |
| 契约测试 | Pact | PR/夜间 | 5% |
| E2E | Playwright/Cypress | 发布前/夜间 | 5-10% |
| 视觉/性能 | Chromatic/Lighthouse CI | 发布前 | 少量 |

运行策略：

- **本地**：pre-commit 跑 lint + 相关单元测试。
- **PR**：静态检查 + 单元 + 集成 + 构建。
- **发布前/夜间**：全量 E2E、视觉回归、性能基线。

质量门禁：每层都有明确的通过标准和超时策略。

**评分维度**：
- 分层清晰（30%）
- 工具选型合理（25%）
- 运行策略（25%）
- 质量门禁（20%）

**常见错误**：
- 所有测试都放到 E2E 层
- 忽视静态分析在分层架构中的基础作用

**延伸追问**：
- 如何根据项目类型调整各层比例？
- 微前端架构下分层测试有什么不同？

**相关题目**：
- [FB-13-SD-R-001 如何为大型前端项目设计一套完整的测试策略？](#FB-13-SD-R-001)

**参考资源**：
- [Testing Trophy - Kent C. Dodds](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)

**口头回答版**：
> 大型前端项目的测试要分层：底层是静态分析和单元测试，中间是组件和集成测试，顶层是 E2E、视觉和性能测试。越底层跑得越频繁、占比越大，越高层成本越高、跑得越少。PR 跑底层和集成，发布前跑全量。

---

### FB-13-SD-R-007：如何评估并提升团队测试成熟度？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：质量、架构、系统设计、工程化
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套评估和提升前端团队测试成熟度的方案。

**参考答案**：

成熟度模型（参考 CMMI）：

| 等级 | 特征 |
|------|------|
| 1 初始级 | 测试随机、依赖个人 |
| 2 管理级 | 有基本测试规范和 CI 门禁 |
| 3 定义级 | 测试策略、分层、工具链标准化 |
| 4 量化级 | 有覆盖率、flaky 率、修复时长等指标 |
| 5 优化级 | 持续改进，自动化生成和维护测试 |

评估方法：

1. **问卷与访谈**：了解团队当前测试实践、痛点。
2. **数据收集**：覆盖率、flaky 率、CI 失败率、测试执行时长。
3. **代码审计**：抽查测试代码质量、Mock 使用、断言有效性。
4. **痛点排序**：高缺陷逃逸、慢反馈、测试债务严重区。

提升路径：

- 制定测试规范与模板。
- 搭建统一测试框架和 fixture 库。
- 引入质量门禁和 Dashboard。
- 培训与结对，推广 TDD/BDD。
- 定期复盘缺陷逃逸，反向补测试。

**评分维度**：
- 成熟度模型（30%）
- 评估方法（30%）
- 提升路径（30%）
- 量化指标（10%）

**常见错误**：
- 一开始就追求 100% 覆盖率
- 只推工具，不解决团队写测试的痛点

**延伸追问**：
- 测试成熟度低通常有哪些根因？
- 如何度量测试带来的业务价值？

**参考资源**：
- [CMMI Institute](https://cmmiinstitute.com/)

**口头回答版**：
> 评估团队测试成熟度可以从规范、工具、数据、文化几个维度看。可以分五级，从随机测试到持续优化。提升时不要一上来追 100% 覆盖，而是先统一框架、设质量门禁、解决大家写测试的痛点，再逐步量化。

---

### FB-13-SD-R-008：如何设计前端“测试即文档”体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：BDD、TDD、测试、质量、架构
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套让测试成为可执行文档的体系，帮助团队降低文档维护成本。

**参考答案**：

体系设计：

1. **规范层**：
   - 统一测试命名规范：`<行为>_<条件>_<期望结果>`。
   - 使用 BDD 场景描述关键业务。
2. **工具层**：
   - BDD：Cucumber / Jest + `given-when-then` 风格。
   - 文档生成：从 feature 文件或测试注释生成 HTML 文档。
3. **关联层**：
   - 测试标签与需求 ID 关联。
   - PR 模板要求说明对应需求。
4. **维护层**：
   - 文档和测试同库维护，需求变更必须更新测试。
   - CI 中运行测试，文档随代码自动更新。
5. **消费层**：
   - 新成员通过测试用例了解业务规则。
   - QA/产品通过 feature 文件验收。

关键原则：

- 文档不是测试的副产品，测试是行为规范的体现。
- 保持文档可读性，避免过度技术细节。

**评分维度**：
- 规范与命名（25%）
- 工具与生成（25%）
- 与需求关联（25%）
- 维护机制（25%）

**常见错误**：
- 测试写得很技术化，非技术人员读不懂
- 文档和测试分开维护，导致不一致

**延伸追问**：
- 如何避免“为了文档而写测试”的形式主义？
- 哪些文档适合用测试表达，哪些不适合？

**参考资源**：
- [Cucumber](https://cucumber.io/)

**口头回答版**：
> 让测试成为文档，首先要用业务语言写测试名，关键流程用 BDD 的 Given-When-Then。然后把这些测试和需求 ID 关联，能自动生成可读文档。最重要的是测试和文档一起维护，需求变了测试也要跟着变。

---

### FB-13-SD-R-009：如何在大型组织中建立共享测试服务与平台？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：工程化、Monorepo、架构、质量、系统设计
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套面向大型组织的共享测试服务与平台，降低各业务团队写测试和维护测试的成本。

**参考答案**：

平台能力：

1. **统一测试框架**：封装 Vitest/Jest 配置、Playwright 配置、常用 matchers。
2. **Mock 服务**：共享接口契约和 Mock 数据，按环境/场景切换。
3. **测试数据工厂**：提供用户、订单等常用实体的生成和清理。
4. **CI/CD 模板**：标准化 GitHub Actions / GitLab CI pipeline。
5. **报告中心**：聚合覆盖率、失败分析、flaky 追踪。
6. **视觉回归服务**：提供截图对比、baseline 管理。
7. **权限与成本**：按团队配额管理 CI 资源。

架构：

```text
业务仓库
   ↓
共享测试 SDK（配置、工具、fixture）
   ↓
共享 Mock / 数据平台
   ↓
统一测试报告与告警中心
```

治理：

- 平台团队负责基础设施，业务团队负责业务测试。
- 通过 RFC 和 SLA 保证平台迭代满足业务需求。
- 定期收集使用数据和反馈，优化平台体验。

**评分维度**：
- 平台能力（35%）：能说出 5 个以上能力
- 架构与集成（30%）
- 治理与运营（20%）
- 成本与权限（15%）

**常见错误**：
- 平台包办所有测试，业务团队没有 ownership
- 平台功能过度设计，业务团队学习成本过高

**延伸追问**：
- 如何衡量共享测试平台的投资回报率？
- 平台能力应该集中还是允许各团队自定义？

**参考资源**：
- [Internal Developer Platform](https://internaldeveloperplatform.org/)

**口头回答版**：
> 大型组织要建立共享测试平台，统一测试框架、mock 服务、测试数据和 CI 模板，让业务团队专注于写业务测试。平台团队负责基础设施和报告中心，业务团队负责具体用例。要注意别过度设计，保持使用简单。

---

### FB-13-SD-R-010：如何设计前端混沌测试与故障演练方案？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：架构、质量、测试、可观测性
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套前端混沌测试与故障演练方案，验证系统在异常场景下的表现。

**参考答案**：

方案目标：

- 发现单点故障和恢复能力不足。
- 验证降级、兜底、超时、重试策略。
- 提升团队对故障的响应能力。

注入场景：

1. **网络层**：延迟、丢包、API 500、CORS 错误。
2. **运行时**：JS 异常、内存泄漏、长时间任务阻塞主线程。
3. **依赖故障**：CDN 不可用、第三方 SDK 失败。
4. **浏览器环境**：离线、低带宽、存储受限。

实施方式：

- **E2E 注入**：用 Playwright/Cypress 拦截请求模拟异常。
- **代理层**：Charles/Fiddler/Clumsy 模拟弱网。
- **故障演练平台**：定时在 staging 注入故障并观察 SLO。

观测指标：

- 错误率、恢复时间、用户影响范围。
- 核心流程成功率、页面可用性。

流程：

1. 定义故障场景和预期恢复行为。
2. 在非生产环境演练，逐步到生产小流量。
3. 演练后复盘，补充测试和预案。

**评分维度**：
- 故障场景设计（30%）
- 注入方式（25%）
- 观测指标（25%）
- 演练流程（20%）

**常见错误**：
- 直接在生产环境大规模注入故障
- 只关注故障注入，不定义恢复预期

**延伸追问**：
- 前端混沌测试和后端混沌测试有什么差异？
- 如何评估一次演练的收益？

**参考资源**：
- [Chaos Mesh](https://chaos-mesh.org/)

**口头回答版**：
> 前端混沌测试就是主动注入故障，看系统能不能恢复。可以模拟网络延迟、API 失败、CDN 故障等。先在 staging 做，定义好恢复预期和观测指标，演练完要复盘并补测试。

---

### FB-13-SD-R-011：AI 辅助编码下，前端测试策略应如何演进？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：AI、测试、质量、架构
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
随着 AI 辅助编码工具的普及，前端测试策略应该发生哪些变化？请给出你的思考。

**参考答案**：

演进方向：

1. **AI 生成测试**：利用 AI 为已有函数生成初始测试，降低写测试门槛。
2. **人类审查重点转移**：从“写测试”转向“验证测试是否覆盖正确行为”。
3. **强化高价值测试**：把人力集中在复杂业务、异常路径、E2E 等 AI 难以覆盖的领域。
4. **引入变异测试**：用 mutation testing 检查 AI 生成测试的有效性。
5. **测试作为 Prompt**：用现有测试约束 AI 生成代码，防止幻觉。
6. **持续维护**：AI 生成代码变更后，自动触发测试并提示需要更新的用例。
7. **质量门禁升级**：CI 中增加对 AI 生成代码的静态检查和测试覆盖要求。

注意事项：

- AI 生成的测试可能只覆盖 happy path。
- 安全、合规、核心算法仍需人工设计测试。
- 保持测试的可读性和可维护性，避免生成大量脆弱测试。

**评分维度**：
- AI 与测试协作（30%）
- 高价值测试聚焦（25%）
- 质量验证机制（25%）
- 维护与门禁（20%）

**常见错误**：
- 完全依赖 AI 生成测试，放弃人工 review
- 让 AI 生成大量低质量、重复测试

**延伸追问**：
- 如何防止 AI 生成的测试变成新的测试债务？
- AI 能否替代探索性测试？

**参考资源**：
- [GitHub Copilot - Testing](https://github.com/features/copilot)

**口头回答版**：
> AI 可以帮我们生成基础测试，但人要把关测试是否覆盖了正确行为。应该把精力放在复杂业务、异常路径这些 AI 容易漏的地方，同时用变异测试验证 AI 生成测试的有效性。核心和安全相关的测试必须人工设计。

---

### FB-13-SD-R-012：如何为前端组件库设计测试策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：component library、组件、测试、质量、架构
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请为一套面向多框架或多项目使用的前端组件库设计测试策略。

**参考答案**：

测试策略：

1. **单元测试**：
   - 工具函数、hooks、纯逻辑。
   - 工具：Vitest。

2. **组件测试**：
   - 每个组件的渲染、props、事件、状态。
   - 工具：Testing Library + JSDOM / 真实浏览器。

3. **无障碍测试**：
   - ARIA 属性、键盘导航、屏幕阅读器。
   - 工具：jest-axe、@axe-core/playwright。

4. **视觉回归测试**：
   - 关键组件在不同主题、尺寸下的截图对比。
   - 工具：Chromatic、Percy。

5. **跨框架/版本兼容性**：
   - 组件库 React 17/18/19 兼容。
   - 在 matrix 中跑组件测试。

6. **文档与示例测试**：
   - Storybook 交互测试，保证文档示例可运行。

7. **发布流程**：
   - PR 必须全量通过组件测试。
   - 发布前跑视觉回归和兼容性测试。

CI 策略：

- 单元/组件测试每个 PR 跑。
- 视觉回归在发布分支或 nightly 跑。
- 兼容性矩阵在发布前跑。

**评分维度**：
- 测试分层完整（30%）
- 无障碍与视觉（25%）
- 兼容性（25%）
- CI 策略（20%）

**常见错误**：
- 只测组件渲染，不测交互和无障碍
- 忽视多版本兼容性导致升级时大面积 break

**延伸追问**：
- 组件库的视觉回归基线如何管理？
- 如何平衡组件库测试覆盖率和发布速度？

**参考资源**：
- [Storybook - Testing](https://storybook.js.org/docs/writing-tests/)

**口头回答版**：
> 组件库要测单元、组件交互、无障碍、视觉回归和跨版本兼容性。单元和组件测试每次 PR 跑，视觉回归和兼容性在发布前跑。关键是组件被多个项目使用，一点小改动影响面很大，所以测试要比业务项目更严格。

---

### FB-13-SD-R-013：跨团队前端项目如何统一质量标准与门禁？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：架构、质量、工程化、系统设计
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
在多个前端团队并行开发的项目中，如何统一质量标准并设置合理的质量门禁？

**参考答案**：

统一质量标准：

1. **共享配置**：
   - 统一的 ESLint、Prettier、TypeScript、commitlint 配置包。
   - 统一的测试框架模板和 CI pipeline。

2. **质量门禁**：
   - PR 必须通过 lint、类型检查、单元测试、覆盖率阈值。
   - 新增代码覆盖率不低于团队约定。
   - 阻塞严重安全漏洞和高危依赖。

3. **度量体系**：
   - 覆盖率、flaky 率、缺陷逃逸率、构建成功率。
   - 统一 Dashboard，按团队/模块展示趋势。

4. **流程保障**：
   - Code Review 必须有测试相关检查点。
   - 需求评审定义验收标准（AC）和测试策略。
   - 架构评审对高风险模块提出测试要求。

5. **文化与激励**：
   - 把质量指标纳入团队 OKR。
   - 表彰高质量测试和主动发现缺陷。
   - 定期复盘线上事故，反向优化门禁。

灵活性：

- 允许团队在规定基线之上自定义增强规则。
- 老项目和新项目分阶段达标，避免一刀切。

**评分维度**：
- 共享配置与门禁（30%）
- 度量体系（25%）
- 流程保障（25%）
- 文化机制（20%）

**常见错误**：
- 所有团队用完全相同的规则，忽视项目差异
- 只设门禁不配套工具和培训

**延伸追问**：
- 如何处理老项目无法立即达标的问题？
- 质量标准应该由中央团队还是各团队共同制定？

**参考资源**：
- [SonarQube Quality Gates](https://docs.sonarsource.com/sonarqube/latest/user-guide/quality-gates/)

**口头回答版**：
> 跨团队项目要统一 ESLint、TS、测试框架这些基础配置，PR 必须过 lint、类型检查、单元测试和覆盖率门槛。同时要有统一的质量看板，把 Code Review、需求验收标准和测试策略结合起来。老项目可以分阶段达标，不要一刀切。

---

### FB-13-CP-R-002：作为架构师，如何在业务压力下守住质量底线？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：架构、质量、质量左移、系统设计
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
在业务需求紧急、排期紧张的情况下，你会如何平衡交付速度和质量，守住必须的质量底线？

**参考答案**：

策略：

1. **定义不可妥协的底线**：
   - 安全漏洞、核心流程必须有测试覆盖。
   - TypeScript 类型检查、lint、构建不能失败。
   - 发布前必须通过核心 E2E。

2. **风险分层**：
   - 高风险模块：强制完整测试和 Code Review。
   - 低风险模块：允许在监督下临时降低要求，但必须记录技术债。

3. **自动化降低摩擦**：
   - pre-commit 自动跑 lint、format、单元测试。
   - CI 失败自动通知并阻塞合并。
   - 用 AI 生成基础测试，人工 focus 关键路径。

4. **增量交付**：
   - 大需求拆小，逐步上线，每个增量都带测试。
   - feature flag 控制发布范围，降低风险。

5. **数据说话**：
   - 用缺陷逃逸率、线上事故证明质量投入的价值。
   - 把“省下的测试时间”和“后续修复成本”对比给业务方看。

6. **团队共识**：
   - 与产品、QA 共同定义 Definition of Done。
   - 让质量成为团队共同责任，而不是架构师单方面要求。

底线思维：不是每个需求都要 100% 覆盖，但核心用户路径和安全绝不能妥协。

**评分维度**：
- 底线定义（30%）
- 风险分层与自动化（30%）
- 增量交付与数据（25%）
- 团队共识（15%）

**常见错误**：
- 所有情况都一刀切要求完整测试，导致业务方对抗
- 为了速度完全放弃测试，积累大量技术债

**延伸追问**：
- 如果产品方坚持砍掉测试时间，你怎么沟通？
- 如何在 KPI 中体现质量价值？

**相关题目**：
- [FB-13-CP-R-001 如何在团队中推动质量左移（Shift-Left）文化？](#FB-13-CP-R-001)

**参考资源**：
- [Accelerate - DORA](https://dora.dev/)

**口头回答版**：
> 业务压力下要守住核心底线：安全、核心流程必须有测试，CI 门禁不能松。不同模块按风险分层，高风险严格，低风险可以临时降要求但要记债。用自动化减少 friction，把大需求拆小增量交付，用线上事故数据说明质量投入的价值。

---

### FB-13-CO-B-017：.gitignore 与 .eslintignore 的作用和区别是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：gitignore、ESLint、工程化、代码质量
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `.gitignore` 与 `.eslintignore` 分别控制什么，并举例说明哪些文件应该只进其中一个。

**参考答案**：

- **`.gitignore`**：告诉 Git 哪些文件/目录不应纳入版本控制，如 `node_modules`、`.env`、`dist`、编辑器配置、临时文件等。
- **`.eslintignore`**：告诉 ESLint 哪些文件不应参与静态分析，如构建产物、自动生成的类型声明、测试覆盖率报告、第三方代码等。

关键区别：

- 作用域不同：一个管版本控制，一个管代码检查。
- 被 `.gitignore` 忽略的文件如果仍在工作区，ESLint 仍可能扫描；被 `.eslintignore` 忽略的文件仍可能被 Git 跟踪。
- 典型配合：`dist` 通常既在 `.gitignore` 也在 `.eslintignore`；而 `src/generated/` 可能需提交但不应被 lint。

**评分维度**：
- 职责区分（50%）：是否说清版本控制与静态分析的不同
- 举例准确（30%）：能否给出只进其中一个的典型文件
- 配合使用（20%）：是否提到两者可以互补而非重复

**常见错误**：
- 把 `.eslintignore` 当成 `.gitignore` 使用
- 认为 `node_modules` 被 Git 忽略后 ESLint 也不会分析，混淆原因

**延伸追问**：
- 如何让 ESLint 忽略单行代码？
- `.prettierignore` 和它们又是什么关系？

**相关题目**：
- [FB-13-EN-B-001 ESLint 的 extends、plugins、rules、presets 有什么区别？](#FB-13-EN-B-001)

**参考资源**：
- [Git - gitignore](https://git-scm.com/docs/gitignore)
- [ESLint - Ignore Files](https://eslint.org/docs/latest/use/configure/ignore)

**口头回答版**：
> - .gitignore：告诉 Git 哪些文件/目录不应纳入版本控制，如 node_modules、.env、dist、编辑器配置、临时文件等。 - .eslintignore：告诉 ESLint 哪些文件不应参与静态分析，如构建产物、自动生成的类型声明、测试覆盖率报告、第三方代码等。 - 作用域不同：一个管版本控制，一个管代码检查。 - 被 .gitignore 忽略的文件如果仍在工作区，ESLint 仍可能扫描；被 .eslintignore 忽略的文件仍可能被 Git 跟踪。

---

### FB-13-CO-B-018：为什么测试文件常用 `__tests__` 或 `*.test.ts` 命名？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：单元测试、Jest、工程化、测试
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释前端测试文件为什么通常命名为 `*.test.ts` / `*.spec.ts`，或放在 `__tests__` 目录下。

**参考答案**：

原因有三点：

1. **工具默认匹配**：Jest、Vitest 等框架默认通过 `testMatch` 匹配 `*.test.*`、`*.spec.*` 和 `__tests__/**` 中的文件，零配置即可识别。
2. **约定优于配置**：统一命名让开发者一眼识别测试文件，降低协作成本。
3. **组织内聚**：与源码同目录可快速定位对应测试；`__tests__` 目录适合聚合跨模块的集成测试或快照。

示例：

```text
src/
  utils/
    formatDate.ts
    formatDate.test.ts
  components/
    __tests__/
      Button.integration.test.tsx
```

**评分维度**：
- 工具匹配机制（40%）：是否提到 Jest/Vitest 默认规则
- 约定价值（30%）：是否强调可读性与协作
- 组织方式（30%）：能否比较同目录与 `__tests__` 的适用场景

**常见错误**：
- 认为测试文件必须放在 `__tests__` 目录
- 命名不统一，导致 CI 漏跑测试

**延伸追问**：
- 如果项目同时用 Jest 和 Playwright，如何区分它们的测试文件？
- 测试文件是否应该随源码一起发布到 npm？

**相关题目**：
- [FB-13-CO-B-009 什么是单元测试？为什么要写单元测试？](#FB-13-CO-B-009)

**参考资源**：
- [Jest - Configuration](https://jestjs.io/docs/configuration#testmatch-arraystring)

**口头回答版**：
> 工具默认匹配：Jest、Vitest 等框架默认通过 testMatch 匹配 .test.、.spec. 和 __tests__/ 中的文件，零配置即可识别。 约定优于配置：统一命名让开发者一眼识别测试文件，降低协作成本。 组织内聚**：与源码同目录可快速定位对应测试；__tests__ 目录适合聚合跨模块的集成测试或快照。

---

### FB-13-CO-B-019：什么是测试环境（test environment）？为什么需要配置它？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：单元测试、Jest、测试、Node.js
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 Jest/Vitest 中 `testEnvironment` 的含义，并说明 `node` 与 `jsdom` 两种环境的区别。

**参考答案**：

测试环境决定测试运行时的全局 API 与行为。以 Jest 为例：

- **`node`**：在 Node.js 环境中运行，适合纯函数、工具类、BFF 逻辑，启动快、资源少。
- **`jsdom`**：提供浏览器 DOM API 模拟，适合测试 React/Vue 组件、事件、DOM 操作。

配置示例：

```js
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom'
};
```

选错环境会导致测试失败：在 `node` 环境中访问 `window` 会报错；在 `jsdom` 中运行大量 Node 工具会减慢速度。现代项目也常按文件通过 `@jest-environment` 注释覆盖。

**评分维度**：
- 概念说明（40%）：是否说清测试环境决定可用 API
- node 与 jsdom 区别（35%）：能否从适用场景和性能角度区分
- 配置影响（25%）：是否提到按文件覆盖或全局配置

**常见错误**：
- 所有测试都使用 `jsdom`，导致套件运行缓慢
- 在 `node` 环境中测试组件，报 `document is not defined`

**延伸追问**：
- 如何为某个测试文件单独指定 jsdom 环境？
- Vitest 的 `environment` 配置与 Jest 有何不同？

**相关题目**：
- [FB-13-CO-B-003 单元测试、集成测试、端到端测试有什么区别？](#FB-13-CO-B-003)

**参考资源**：
- [Jest - testEnvironment](https://jestjs.io/docs/configuration#testenvironment-string)

**口头回答版**：
> 测试环境决定测试运行时的全局 API 与行为。 以 Jest 为例： - node：在 Node.js 环境中运行，适合纯函数、工具类、BFF 逻辑，启动快、资源少。 - jsdom：提供浏览器 DOM API 模拟，适合测试 React/Vue 组件、事件、DOM 操作。

---

### FB-13-CO-B-020：什么是测试用例（test case）？一条好的测试用例有哪些特征？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：单元测试、测试、代码质量、可测试性
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明测试用例的含义，并列举好的测试用例应具备的特征。

**参考答案**：

测试用例是为验证某个功能或行为而设计的一组输入、执行步骤和预期结果。

好的测试用例通常具备以下特征：

1. **聚焦单一行为**：一个测试只验证一个概念，失败时定位精准。
2. **独立可重复**：不依赖其他测试的执行顺序或外部状态。
3. **命名清晰**：通过测试名即可读出场景与预期，如 `throws when divide by zero`。
4. **覆盖边界与异常**：除正常路径外，包含空值、越界、错误输入等。
5. **断言明确**：避免弱断言，直接验证调用方可观察的结果。
6. **可读性高**：Arrange-Act-Assert 结构清晰，数据与断言一眼可见。

**评分维度**：
- 定义准确（30%）：能说清输入、步骤、预期结果
- 特征列举（50%）：能说出 4 个以上特征
- 命名与结构（20%）：能否给出命名或结构示例

**常见错误**：
- 一个测试里断言过多，导致失败时难以定位
- 只测正常路径，忽略异常和边界

**延伸追问**：
- 测试用例是否需要覆盖私有方法？
- 如何判断测试用例是否过度设计？

**相关题目**：
- [FB-13-CO-B-014 如何理解断言在测试中的作用？](#FB-13-CO-B-014)

**参考资源**：
- [Google Testing Blog - What Makes a Good Test?](https://testing.googleblog.com/)

**口头回答版**：
> 测试用例是为验证某个功能或行为而设计的一组输入、执行步骤和预期结果。 好的测试用例通常具备以下特征： 聚焦单一行为：一个测试只验证一个概念，失败时定位精准。 独立可重复：不依赖其他测试的执行顺序或外部状态。

---

### FB-13-CA-B-002：下面 Jest 测试的输出和结果是什么？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：Jest、生命周期、单元测试、测试
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```js
let count = 0;

beforeEach(() => {
  count++;
});

afterEach(() => {
  count = 0;
});

test('first', () => {
  expect(count).toBe(1);
  count += 10;
});

test('second', () => {
  expect(count).toBe(1);
});
```

请指出上述两个测试是否都会通过，并说明原因。

**参考答案**：

两个测试都会通过。

执行顺序：

1. `first` 测试前：`beforeEach` 将 `count` 从 0 加到 1。
2. `first` 测试中：`expect(count).toBe(1)` 通过，随后 `count` 变为 11。
3. `first` 测试后：`afterEach` 将 `count` 重置为 0。
4. `second` 测试前：`beforeEach` 再次将 `count` 从 0 加到 1。
5. `second` 测试中：`expect(count).toBe(1)` 通过。

这说明 `beforeEach` / `afterEach` 在每个测试前后都会执行，是测试隔离的重要机制。如果缺少 `afterEach`，`second` 会因 `count` 为 11 而失败。

**评分维度**：
- 生命周期执行顺序（50%）：是否理解每个测试前后都会执行
- 测试隔离意识（30%）：能否指出 afterEach 的作用
- 结果判断（20%）：两个测试都判断正确

**常见错误**：
- 认为 `beforeEach` / `afterEach` 只在整个文件开始和结束时执行一次
- 忽视 `afterEach` 重置状态的重要性

**延伸追问**：
- `beforeAll` 和 `beforeEach` 的区别是什么？
- 如果 `count` 是共享的复杂对象，如何确保测试隔离？

**相关题目**：
- [FB-13-CA-A-001 Jest 中如何使用 fake timers 测试定时器？](#FB-13-CA-A-001)

**参考资源**：
- [Jest - Setup and Teardown](https://jestjs.io/docs/setup-teardown)

**口头回答版**：
> first 测试前：beforeEach 将 count 从 0 加到 1。 first 测试中：expect(count).toBe(1) 通过，随后 count 变为 11。 first 测试后：afterEach 将 count 重置为 0。 second 测试前：beforeEach 再次将 count 从 0 加到 1。

---

### FB-13-CA-B-003：下面这段 Jest 代码中的断言会成功吗？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：Jest、spy、Mock、单元测试
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```js
const user = {
  greet: () => 'hello'
};

jest.spyOn(user, 'greet').mockReturnValue('hi');

user.greet();

it('should track call', () => {
  expect(user.greet).toHaveBeenCalledTimes(1);
  expect(user.greet()).toBe('hi');
});
```

请判断两个断言是否都会通过，并解释原因。

**参考答案**：

两个断言都会通过。

- `jest.spyOn(user, 'greet')` 会包装原始方法，保留原实现并记录调用信息。
- `.mockReturnValue('hi')` 将后续调用的返回值替换为 `'hi'`。
- 在测试之前已经调用过一次 `user.greet()`，因此 `toHaveBeenCalledTimes(1)` 通过。
- 测试内再次调用 `user.greet()`，返回 `'hi'`，所以 `toBe('hi')` 通过，调用次数随后变为 2。

注意：`mockReturnValue` 改变的是 spy 的返回值，而非原始实现；如需恢复原始方法，可调用 `.mockRestore()`。

**评分维度**：
- spy 机制理解（50%）：是否理解 spy 会记录调用并允许 mock 返回值
- mock 与原实现关系（30%）：能否区分原始实现和 mock 返回值
- 断言判断（20%）：两个断言均判断正确

**常见错误**：
- 认为 `jest.spyOn` 不会修改返回值
- 混淆 `toHaveBeenCalledTimes` 的计数时机

**延伸追问**：
- `jest.spyOn` 和 `jest.fn()` 有什么区别？
- 如何在测试结束后恢复被 spy 的方法？

**相关题目**：
- [FB-13-CO-B-005 Mock 在前端测试中的作用是什么？有哪些常见方式？](#FB-13-CO-B-005)

**参考资源**：
- [Jest - Mock Functions](https://jestjs.io/docs/mock-functions)

**口头回答版**：
> - jest.spyOn(user, 'greet') 会包装原始方法，保留原实现并记录调用信息。 - .mockReturnValue('hi') 将后续调用的返回值替换为 'hi'。 - 在测试之前已经调用过一次 user.greet()，因此 toHaveBeenCalledTimes(1) 通过。 - 测试内再次调用 user.greet()，返回 'hi'，所以 toBe('hi') 通过，调用次数随后变为 2。

---

### FB-13-EN-B-002：如何用 npm scripts 一键运行 lint、format 与测试？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：npm、工程化、CI/CD、测试
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明如何配置 `package.json` 中的 scripts，让开发者通过一条命令完成 lint、format 检查和单元测试。

**参考答案**：

在 `package.json` 中组合 scripts：

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --check .",
    "format:write": "prettier --write .",
    "test": "jest",
    "check": "npm run lint && npm run format && npm run test"
  }
}
```

关键点：

- 使用 `&&` 串联命令，前一步失败会阻止后续步骤执行，确保问题不会被忽略。
- `check` 作为统一入口，既可在本地跑，也可在 CI 中复用。
- 建议将格式化写操作与只读检查分开，避免 CI 自动修改文件。

**评分维度**：
- scripts 组合能力（40%）：能否正确组合 lint/format/test
- 失败传递意识（30%）：是否使用 `&&` 或等效机制
- CI 复用（30%）：是否提到该命令可直接用于持续集成

**常见错误**：
- 使用 `;` 串联命令，导致前面失败仍继续执行
- 在 CI 中运行 `prettier --write` 而非 `--check`

**延伸追问**：
- 如果 lint 和 test 都需要较长时间，如何在 CI 中并行执行？
- 如何限制只检查本次变更的文件？

**相关题目**：
- [FB-13-CO-B-002 Husky 和 lint-staged 在代码提交前分别做了什么？](#FB-13-CO-B-002)

**参考资源**：
- [npm - scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)

**口头回答版**：
> 在 package.json 中组合 scripts： - 使用 && 串联命令，前一步失败会阻止后续步骤执行，确保问题不会被忽略。 - check 作为统一入口，既可在本地跑，也可在 CI 中复用。 - 建议将格式化写操作与只读检查分开，避免 CI 自动修改文件。

---

### FB-13-EN-B-003：.editorconfig 与 Prettier 有什么区别？

**题型**：工程化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：13 代码质量与测试
**标签**：代码风格、工程化、Prettier、代码质量
**出现频率**：低频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `.editorconfig` 与 Prettier 各自的作用，以及它们在前端项目中如何配合。

**参考答案**：

- **`.editorconfig`**：编辑器配置协议，定义缩进、换行符、字符集等基础格式。它作用于开发者在编辑器中新建或保存文件时的行为，不修改历史文件。
- **Prettier**：强意见代码格式化工具，负责详细的代码风格（引号、尾逗号、分号、换行等），可以批量重写文件。

配合方式：

- 先用 `.editorconfig` 统一团队编辑器的基础行为。
- 再用 Prettier 作为最终格式化与 CI 检查依据。
- Prettier 可以读取 `.editorconfig` 中的部分配置（如 `indent_size`、`max_line_length`），减少重复配置。

**评分维度**：
- 职责区分（50%）：是否说清编辑器行为与格式化工具的不同
- 互补配合（30%）：是否提到 Prettier 可读取 EditorConfig
- 配置示例（20%）：能否举例说明各自配置项

**常见错误**：
- 认为 `.editorconfig` 可以替代 Prettier
- 两者配置冲突，如缩进宽度不一致

**延伸追问**：
- 如果团队有人用 VS Code，有人用 WebStorm，如何保证风格一致？
- `.editorconfig`、Prettier、ESLint 三者的职责边界是什么？

**相关题目**：
- [FB-13-CO-B-001 ESLint 和 Prettier 有什么区别？能否只用一个？](#FB-13-CO-B-001)

**参考资源**：
- [EditorConfig](https://editorconfig.org/)
- [Prettier - Configuration](https://prettier.io/docs/en/configuration.html)

**口头回答版**：
> - .editorconfig：编辑器配置协议，定义缩进、换行符、字符集等基础格式。 它作用于开发者在编辑器中新建或保存文件时的行为，不修改历史文件。 - Prettier：强意见代码格式化工具，负责详细的代码风格（引号、尾逗号、分号、换行等），可以批量重写文件。 - 先用 .editorconfig 统一团队编辑器的基础行为。

---

### FB-13-CO-A-014：TDD 中 Fake 与 Mock 的选择原则是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：TDD、Mock、stub、spy、单元测试、依赖隔离
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
在测试驱动开发中，什么时候应该选择 Fake，什么时候应该选择 Mock？请结合前端场景说明。

**参考答案**：

选择原则取决于依赖的性质和测试目标：

- **Fake**：用于替代复杂但有真实行为的对象，提供简化但可用的实现。适合有状态依赖，如内存数据库、假时钟、内存版 localStorage。
- **Stub**：用于返回固定响应，控制被测单元的输入。
- **Mock**：用于验证被测单元与依赖之间的交互行为，如某个函数是否被调用、调用参数是什么。

前端场景：

- 测试购物车逻辑时，用 Fake 的 `localStorage` 模拟持久化，比 Mock 更真实。
- 测试提交表单时，用 Mock 验证 `reportError` 是否在异常时被调用。

过度使用 Mock 会导致测试与实现细节耦合，.Fake 能让测试更关注行为结果。

**评分维度**：
- Fake 与 Mock 的区分（40%）：能否从行为真实性和验证目标上区分
- 选择原则（35%）：能否根据依赖是否有状态、是否需要验证交互来选择
- 过度 Mock 的反思（25%）：是否提到避免与实现细节耦合

**常见错误**：
- 所有依赖一律 Mock，导致测试脆弱
- 把 Fake 当成 Stub 或 Mock 使用

**延伸追问**：
- 如果一个 API 客户端返回的数据很复杂，用 Fake 还是 Mock 更合适？
- 测试 React 组件时，`render` 的结果算 Fake 还是 Stub？

**相关题目**：
- [FB-13-CO-B-013 什么是测试替身？SUT 是什么？](#FB-13-CO-B-013)

**参考资源**：
- [Martin Fowler - Test Double](https://martinfowler.com/bliki/TestDouble.html)

**口头回答版**：
> 选择原则取决于依赖的性质和测试目标： - Fake：用于替代复杂但有真实行为的对象，提供简化但可用的实现。 适合有状态依赖，如内存数据库、假时钟、内存版 localStorage。 - Stub：用于返回固定响应，控制被测单元的输入。

---

### FB-13-CO-A-015：为什么测试必须是 Deterministic（确定性的）？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：测试稳定性、flaky-test、单元测试、质量
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释什么是测试的确定性，以及非确定性测试会给团队带来哪些问题。

**参考答案**：

**确定性测试**：在相同代码状态下，无论何时何地运行，结果都相同。

非确定性测试（flaky test）的危害：

1. **侵蚀信任**：开发者开始忽略失败，导致真实缺陷被掩盖。
2. **浪费 CI 资源**：反复重试增加成本和反馈时间。
3. **阻塞合并**：间歇性失败让 PR 无法稳定通过。
4. **定位困难**：失败与代码变更无关，排查成本高。

常见原因与治理：

- 异步等待：使用 `await` 或 fake timers。
- 共享状态：每个测试后清理。
- 随机数据：固定种子或工厂生成。
- 外部依赖：用 MSW、Mock 隔离。

**评分维度**：
- 概念解释（40%）：是否说清确定性含义
- 危害说明（30%）：能否说出 3 个以上危害
- 治理方法（30%）：能否给出针对性的解决方案

**常见错误**：
- 认为偶尔失败的测试可以忽略
- 用重试掩盖 flaky，而不去修复根因

**延伸追问**：
- 你们的 CI 中 flaky 率是多少？如何统计？
- 如果一个测试依赖真实网络，如何改造成确定性的？

**相关题目**：
- [FB-13-SC-P-001 测试不稳定（Flaky Test）有哪些常见原因？如何解决？](#FB-13-SC-P-001)

**参考资源**：
- [Google Testing Blog - Flaky Tests](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html)

**口头回答版**：
> 可以结合自己的项目经验，分点说明核心概念、关键流程和注意事项。

---

### FB-13-CO-A-016：什么是测试中的 Happy Path 与 Unhappy Path？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：单元测试、测试、边界、可测试性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Happy Path 与 Unhappy Path 的含义，并说明为什么测试不能只覆盖 Happy Path。

**参考答案**：

- **Happy Path**：程序在预期输入和正常流程下的行为路径。例如用户输入合法邮箱并点击提交。
- **Unhappy Path**：异常、错误、边界或非法输入下的行为路径。例如邮箱为空、网络超时、权限不足。

不能只覆盖 Happy Path 的原因：

1. 真实用户行为充满异常，Happy Path 无法暴露鲁棒性问题。
2. 只测正常路径会带来虚假安全感，覆盖率虽高但质量仍差。
3. 异常分支往往包含更多业务规则和安全检查。

设计建议：

- 为每个功能列出等价类，包括有效、无效、边界值。
- 显式测试异常抛出、错误提示、降级行为。

**评分维度**：
- 定义区分（40%）：能否清晰解释两者
- 场景举例（35%）：能否给出前端具体示例
- 重要性说明（25%）：是否指出只测 Happy Path 的风险

**常见错误**：
- 测试只验证正常输入
- 把异常分支视为“不会发生的场景”

**延伸追问**：
- 如何为表单验证设计 Unhappy Path 测试？
- 覆盖率 100% 是否能保证 Happy Path 和 Unhappy Path 都覆盖了？

**相关题目**：
- [FB-13-CO-A-006 覆盖率阈值应该如何设置？只看覆盖率有什么陷阱？](#FB-13-CO-A-006)

**参考资源**：
- [ISTQB - Test Design Techniques](https://www.istqb.org/)

**口头回答版**：
> - Happy Path：程序在预期输入和正常流程下的行为路径。 例如用户输入合法邮箱并点击提交。 - Unhappy Path：异常、错误、边界或非法输入下的行为路径。 例如邮箱为空、网络超时、权限不足。

---

### FB-13-CA-A-003：下面 React Testing Library 的测试为什么没有触发 onChange？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：React Testing Library、组件测试、React、交互
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```jsx
import { render, fireEvent } from '@testing-library/react';

const onChange = jest.fn();
const { getByRole } = render(<input onChange={onChange} />);
const input = getByRole('textbox');

input.value = 'hello';
fireEvent.change(input, { target: { value: 'hello' } });

it('calls onChange', () => {
  expect(onChange).toHaveBeenCalled();
});
```

请分析 `onChange` 没有被调用的原因，并给出修复方式。

**参考答案**：

原因：直接对 DOM 元素的 `.value` 赋值不会触发 React 的合成事件系统。React 监听的是 `input` 事件，而直接设置 `value` 属性不会派发该事件，随后 `fireEvent.change` 在已经更新的值上再次触发 change，但 React 可能未感知到值的实际变化。

修复方式：

- 推荐：使用 `@testing-library/user-event`：

```js
import userEvent from '@testing-library/user-event';
await userEvent.type(input, 'hello');
expect(onChange).toHaveBeenCalled();
```

- 或使用 `fireEvent.input`：

```js
fireEvent.input(input, { target: { value: 'hello' } });
```

**评分维度**：
- React 合成事件理解（40%）：是否理解直接赋值不触发事件
- 正确修复（40%）：能否给出 user-event 或 input 事件方案
- Testing Library 理念（20%）：是否提到优先模拟用户真实交互

**常见错误**：
- 认为 `fireEvent.change` 一定会触发 React onChange
- 直接操作 DOM 属性而不模拟真实输入事件

**延伸追问**：
- `fireEvent` 和 `userEvent` 的核心区别是什么？
- 如何测试受控组件的 onChange？

**相关题目**：
- [FB-13-CO-P-007 使用 React Testing Library 测试组件时应避免哪些反模式？](#FB-13-CO-P-007)

**参考资源**：
- [Testing Library - user-event](https://testing-library.com/docs/user-event/intro)

**口头回答版**：
> 原因：直接对 DOM 元素的 .value 赋值不会触发 React 的合成事件系统。 React 监听的是 input 事件，而直接设置 value 属性不会派发该事件，随后 fireEvent.change 在已经更新的值上再次触发 change，但 React 可能未感知到值的实际变化。 - 推荐：使用 @testing-library/user-event： - 或使用 fireEvent.input：

---

### FB-13-CA-A-004：下面这段 Jest 异步测试为什么会出问题？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：Jest、异步、async-await、单元测试
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```js
function fetchData() {
  return Promise.resolve({ id: 1 });
}

test('fetch data', () => {
  fetchData().then(data => {
    expect(data).toEqual({ id: 1 });
  });
});
```

请指出上述测试的潜在问题，并给出修复后的写法。

**参考答案**：

问题：测试函数没有返回 Promise，也没有使用 `async/await`。Jest 会认为测试在同步代码执行完后就结束了，而 `.then` 中的断言可能在测试报告通过后才执行，导致断言失败不被捕获，甚至测试被错误地标记为通过。

修复方式：

```js
test('fetch data', async () => {
  const data = await fetchData();
  expect(data).toEqual({ id: 1 });
});
```

或：

```js
test('fetch data', () => {
  return fetchData().then(data => {
    expect(data).toEqual({ id: 1 });
  });
});
```

**评分维度**：
- 异步测试规则（50%）：是否理解必须返回 Promise 或 await
- 修复能力（30%）：能否给出 async/await 或 return Promise 写法
- 风险意识（20%）：是否指出可能出现“假通过”或断言未执行

**常见错误**：
- 认为只要写了 `expect` 测试就会等待它执行
- 在 `then` 里断言但不返回 Promise

**延伸追问**：
- 如果 `fetchData` 失败，如何测试它的异常分支？
- `expect.assertions(1)` 在这种场景下有什么用？

**相关题目**：
- [FB-13-CA-P-001 下面异步测试代码存在什么问题？如何修复？](#FB-13-CA-P-001)

**参考资源**：
- [Jest - Testing Asynchronous Code](https://jestjs.io/docs/asynchronous)

**口头回答版**：
> 问题：测试函数没有返回 Promise，也没有使用 async/await。 Jest 会认为测试在同步代码执行完后就结束了，而 .then 中的断言可能在测试报告通过后才执行，导致断言失败不被捕获，甚至测试被错误地标记为通过。

---

### FB-13-SC-A-003：如何为一个带防抖的搜索输入框设计测试？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：debounce、单元测试、定时器、组件测试
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
页面有一个搜索输入框，输入后 300ms 防抖才会发起搜索请求。请设计完整的测试方案。

**参考答案**：

测试要点：

1. **使用 fake timers**：`jest.useFakeTimers()` 控制时间，避免真实等待。
2. **触发输入**：连续输入多个字符，验证搜索函数没有被立即调用。
3. **推进时间**：`jest.advanceTimersByTime(300)`，验证只在防抖结束后调用一次，并传入最新值。
4. **边界场景**：
   - 在防抖期间继续输入，是否重置计时。
   - 组件卸载时是否取消未触发的定时器。
   - leading edge 配置下首次输入是否立即触发。

示例：

```js
jest.useFakeTimers();
const onSearch = jest.fn();
render(<SearchInput onSearch={onSearch} delay={300} />);

fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ab' } });
expect(onSearch).not.toHaveBeenCalled();

jest.advanceTimersByTime(300);
expect(onSearch).toHaveBeenCalledTimes(1);
expect(onSearch).toHaveBeenLastCalledWith('ab');
```

**评分维度**：
- fake timers 使用（30%）：是否使用假时钟而非真实等待
- 防抖逻辑覆盖（35%）：能否验证防抖只触发一次并取最新值
- 边界场景（35%）：是否考虑卸载、leading edge、连续输入

**常见错误**：
- 使用真实 `setTimeout` 等待，导致测试缓慢且不稳定
- 只测一次输入，不验证防抖行为

**延伸追问**：
- 如果防抖函数在 hook 里，如何单独测试这个 hook？
- 搜索请求失败时，UI 应该如何反馈？

**相关题目**：
- [FB-13-CD-A-002 请手写一个节流函数并为其编写单元测试](#FB-13-CD-A-002)

**参考资源**：
- [Jest - Timer Mocks](https://jestjs.io/docs/timer-mocks)

**口头回答版**：
> 使用 fake timers：jest.useFakeTimers() 控制时间，避免真实等待。 触发输入：连续输入多个字符，验证搜索函数没有被立即调用。 推进时间：jest.advanceTimersByTime(300)，验证只在防抖结束后调用一次，并传入最新值。 - 在防抖期间继续输入，是否重置计时。

---

### FB-13-SC-A-004：如何为一个使用 localStorage 的自定义 Hook 设计测试？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：localstorage、React Testing Library、Mock、组件测试
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
项目中有一个 `useLocalStorage` Hook，负责从 localStorage 读写数据并同步状态。请设计测试方案。

**参考答案**：

测试方案：

1. **Mock Storage**：使用 `jest.spyOn(Storage.prototype, 'getItem')` 和 `setItem`，避免污染真实浏览器存储。
2. **每个测试清理**：在 `afterEach` 中调用 `localStorage.clear()` 并恢复 spy，保证测试隔离。
3. **场景覆盖**：
   - 无缓存时返回默认值并写入。
   - 有缓存时读取并反序列化。
   - 值更新时同步写入 localStorage。
   - Storage 事件跨标签页同步（可 mock `window.dispatchEvent`）。
   - JSON 解析失败时降级处理。
4. **SSR 安全**：Hook 在服务端渲染时不应直接访问 `localStorage`。

示例：

```js
afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

test('reads cached value', () => {
  localStorage.setItem('key', JSON.stringify('cached'));
  const { result } = renderHook(() => useLocalStorage('key', 'default'));
  expect(result.current[0]).toBe('cached');
});
```

**评分维度**：
- Storage Mock（35%）：是否正确 mock 而非使用真实 localStorage
- 场景覆盖（40%）：是否覆盖读、写、更新、异常、SSR
- 清理隔离（25%）：是否在每个测试后清理状态

**常见错误**：
- 直接读写真实 localStorage，导致测试相互影响
- 不测试 JSON 解析异常和 SSR 场景

**延伸追问**：
- 如果要模拟 Storage 事件跨标签同步，应该怎么写？
- localStorage 容量超限怎么处理？

**相关题目**：
- [FB-13-CO-A-010 什么是测试夹具？如何管理？](#FB-13-CO-A-010)

**参考资源**：
- [Testing Library - renderHook](https://react-hooks-testing-library.com/)

**口头回答版**：
> Mock Storage：使用 jest.spyOn(Storage.prototype, 'getItem') 和 setItem，避免污染真实浏览器存储。 每个测试清理：在 afterEach 中调用 localStorage.clear() 并恢复 spy，保证测试隔离。 - 无缓存时返回默认值并写入。 - 有缓存时读取并反序列化。

---

### FB-13-CD-A-003：请手写一个数组去重函数并为其编写单元测试

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：数组、单元测试、Jest
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请实现一个 `unique` 函数，对数组去重并保持原始顺序。支持可选的 `key` 函数用于对象数组按字段去重。并为其编写单元测试。

**参考答案**：

实现：

```js
function unique(arr, keyFn = x => x) {
  const seen = new Set();
  return arr.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
```

测试：

```js
describe('unique', () => {
  test('removes duplicates and keeps order', () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
  });

  test('handles empty array', () => {
    expect(unique([])).toEqual([]);
  });

  test('handles all same values', () => {
    expect(unique([1, 1, 1])).toEqual([1]);
  });

  test('deduplicates objects by key', () => {
    const users = [{ id: 1 }, { id: 2 }, { id: 1 }];
    expect(unique(users, u => u.id)).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
```

**评分维度**：
- 实现正确性（40%）：去重并保持顺序，key 函数可用
- 测试覆盖（40%）：是否覆盖空数组、全重复、基础类型、对象 key
- 边界处理（20%）：是否考虑 NaN、undefined、引用类型等

**常见错误**：
- 使用 `Set` 直接转换导致对象数组按引用去重，不符合预期
- 测试只覆盖基础类型，忽略对象数组和空数组

**延伸追问**：
- 如果要支持深比较去重，应如何调整？
- 大数组场景下如何优化性能？

**相关题目**：
- [FB-13-CA-B-001 下面 Jest 测试的输出和结果是什么？](#FB-13-CA-B-001)

**参考资源**：
- [MDN - Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

**口头回答版**：
> 实现：
> （见代码示例）
> 测试：
> （见代码示例）

---

### FB-13-EN-A-003：如何在 CI 中并行运行测试以缩短反馈时间？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：13 代码质量与测试
**标签**：CI/CD、Jest、并发、测试
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
随着项目测试用例增多，CI 中单测耗时越来越长。请说明可以如何并行运行测试以缩短反馈时间。

**参考答案**：

并行策略：

1. **进程内并行**：Jest 使用 `--maxWorkers=2` 或 `--workers` 控制 worker 数量，充分利用多核 CPU。
2. **分片（Sharding）**：使用 `--shard=1/3` 将测试拆分到多个 CI job，再用矩阵汇总结果。
3. **任务级并行**：在 CI workflow 中把 lint、typecheck、unit test、e2e 设为独立 job 并行执行。
4. **缓存**：缓存 `node_modules`、Jest cache、编译产物，减少重复准备时间。
5. **按需执行**：只跑受影响的测试或相关测试，避免全量回归。

注意事项：

- worker 过多会增加进程切换开销，需根据 CI 容器核数调优。
- 并行测试必须保证无共享状态和全局副作用，否则 flaky 增加。

**评分维度**：
- workers / sharding（40%）：是否提到进程内并行和分片
- CI 任务并行（30%）：是否把 lint/test/e2e 拆为并行 job
- 缓存与按需（30%）：是否提到缓存和影响面分析

**常见错误**：
- 在资源受限的 CI 容器里开过多 worker，反而更慢
- 并行后测试因共享状态 flaky，却未做隔离

**延伸追问**：
- Jest 的 `--runInBand` 在什么场景下反而更快？
- 如何在 Monorepo 里实现按包并行测试？

**相关题目**：
- [FB-13-EN-P-001 如何在 CI/CD 流程中设计前端测试流水线？](#FB-13-EN-P-001)

**参考资源**：
- [Jest - CLI Options](https://jestjs.io/docs/cli#--maxworkersnumstring)

**口头回答版**：
> 进程内并行：Jest 使用 --maxWorkers=2 或 --workers 控制 worker 数量，充分利用多核 CPU。 分片（Sharding）：使用 --shard=1/3 将测试拆分到多个 CI job，再用矩阵汇总结果。 任务级并行：在 CI workflow 中把 lint、typecheck、unit test、e2e 设为独立 job 并行执行。 缓存：缓存 node_modules、Jest cache、编译产物，减少重复准备时间。

---

### FB-13-CO-P-014：什么是 Hermetic Test（密封测试）？前端如何实现？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：测试稳定性、Mock、依赖隔离、flaky-test
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请解释什么是 Hermetic Test，并说明前端测试中如何实现密封性。

**参考答案**：

**Hermetic Test**：测试在完全受控的环境中运行，不依赖外部系统、网络、时间、随机数等不确定因素，给定相同输入总是产生相同输出。

前端实现方式：

1. **网络密封**：使用 MSW、Jest mock、`fetch` mock 替代真实后端。
2. **时间密封**：`jest.useFakeTimers()` 控制 `setTimeout`、Date.now。
3. **随机密封**：固定随机种子或 Mock `Math.random`。
4. **全局状态密封**：每个测试前后重置 store、localStorage、路由、window 对象。
5. **浏览器密封**：在稳定的 headless 环境（Playwright）中运行 E2E，避免真实设备差异。

收益：降低 flaky、提升可重复性、加快执行速度。

**评分维度**：
- 概念理解（40%）：能否说清密封测试的本质
- 实现手段（40%）：能否从网络、时间、随机、状态多角度说明
- 收益与代价（20%）：是否提到 flaky 降低和实现成本

**常见错误**：
- 认为 E2E 测试必须连真实后端才算有效
- 只 mock 网络却忽略时间和全局状态

**延伸追问**：
- 完全密封的测试是否会漏掉环境兼容性问题？
- 在什么情况下应该引入非密封的集成测试？

**相关题目**：
- [FB-13-SC-P-001 测试不稳定（Flaky Test）有哪些常见原因？如何解决？](#FB-13-SC-P-001)

**参考资源**：
- [Google Testing Blog - Hermetic Servers](https://testing.googleblog.com/2012/10/hermetic-servers.html)

**口头回答版**：
> Hermetic Test：测试在完全受控的环境中运行，不依赖外部系统、网络、时间、随机数等不确定因素，给定相同输入总是产生相同输出。 网络密封：使用 MSW、Jest mock、fetch mock 替代真实后端。 时间密封：jest.useFakeTimers() 控制 setTimeout、Date.now。 随机密封：固定随机种子或 Mock Math.random。

---

### FB-13-CO-P-015：如何评估一套测试套件是否“有效”？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：技术债、测试、质量度量、可维护性
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
除了覆盖率，还有哪些指标和方法可以评估一套测试套件是否真正有效？

**参考答案**：

评估维度：

1. **缺陷逃逸率**：线上 bug 中有多少是测试未覆盖到的，越低越好。
2. **Flaky 率**：不稳定测试占总测试的比例，应持续下降。
3. **测试运行时间**：单测应在分钟级反馈，过长说明需要优化或拆分。
4. **变异测试得分（Mutation Score）**：主动注入 bug 后测试能否发现，衡量测试的断言强度。
5. **测试维护成本**：新增功能时测试修改量是否过大。
6. **测试与实现耦合度**：测试是否频繁因重构而失败。
7. **可读性与命名**：新成员能否快速理解失败原因。

方法：

- 建立质量看板，持续追踪上述指标趋势。
- 定期进行测试回顾，删除无效测试，补强薄弱环节。

**评分维度**：
- 评估维度全面（50%）：能否说出 4 个以上有效指标
- 指标含义清晰（30%）：能否解释缺陷逃逸率、flaky 率、变异测试等
- 改进方法（20%）：是否提到度量看板和测试回顾

**常见错误**：
- 只看代码覆盖率判断测试好坏
- 忽视测试维护成本和可读性

**延伸追问**：
- 缺陷逃逸率如何收集和计算？
- 如果测试覆盖率很高但变异得分很低，说明什么问题？

**相关题目**：
- [FB-13-CO-P-008 如何评估一套测试套件是否“有效”？](#FB-13-CO-P-008)

**参考资源**：
- [Mutation Testing - Stryker](https://stryker-mutator.io/)

**口头回答版**：
> 缺陷逃逸率：线上 bug 中有多少是测试未覆盖到的，越低越好。 Flaky 率：不稳定测试占总测试的比例，应持续下降。 测试运行时间：单测应在分钟级反馈，过长说明需要优化或拆分。 变异测试得分（Mutation Score）：主动注入 bug 后测试能否发现，衡量测试的断言强度。

---

### FB-13-CO-P-016：什么是 Smoke Test 与 Canary Test？前端如何设计？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：测试策略、CI/CD、灰度发布、质量门禁
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请解释 Smoke Test 与 Canary Test 的区别，并说明前端项目中如何落地。

**参考答案**：

- **Smoke Test（冒烟测试）**：部署后快速验证核心功能是否可用，如页面能否加载、登录是否正常、关键 API 是否返回 200。目标是“快速发现致命问题”。
- **Canary Test（金丝雀测试）**：将新版本发布给少量真实用户或流量，监控错误率、性能、业务指标，决定是否全量发布。目标是“在小范围验证真实环境表现”。

前端落地：

1. **Smoke**：在部署后运行一组关键路径 E2E（如首页、登录、下单），失败则阻断发布。
2. **Canary**：配合 Feature Flag 或灰度路由，将 5% 流量切到新版本；使用 RUM、Sentry、监控平台观察指标。
3. **自动回滚**：当错误率或核心指标超过阈值时自动切回旧版本。

**评分维度**：
- 定义区分（35%）：能否从目标、范围、触发时机区分
- 前端实践（40%）：能否给出具体的实现方式和工具
- 工具与阈值（25%）：是否提到 RUM、Sentry、自动回滚

**常见错误**：
- 把 Smoke Test 和 Canary Test 混为一谈
- Canary 只观察功能是否可用，忽视性能和业务指标

**延伸追问**：
- Smoke Test 和 E2E 回归测试的区别是什么？
- 如何确定 Canary 的流量比例和观察时长？

**相关题目**：
- [FB-13-SD-R-017 如何设计前端灰度发布与线上质量验证机制？](#FB-13-SD-R-017)

**参考资源**：
- [Google SRE - Canary Releases](https://sre.google/workbook/canary-releases/)

**口头回答版**：
> - Smoke Test（冒烟测试）：部署后快速验证核心功能是否可用，如页面能否加载、登录是否正常、关键 API 是否返回 200。 目标是“快速发现致命问题”。 - Canary Test（金丝雀测试）：将新版本发布给少量真实用户或流量，监控错误率、性能、业务指标，决定是否全量发布。 目标是“在小范围验证真实环境表现”。

---

### FB-13-SC-P-004：如何为一个多步骤表单 Wizard 设计 E2E 测试？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：E2E 测试、Playwright、表单、测试数据
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
一个包含 4 步的申请表单 Wizard，每步有校验、数据暂存和前后导航。请设计可维护的 E2E 测试方案。

**参考答案**：

设计方案：

1. **页面对象（POM）**：为每个 Step 创建 Page Object，封装选择器和交互方法。
2. **数据驱动**：将不同申请数据放在 fixture 或 factory 中，避免硬编码。
3. **流程覆盖**：
   - 正常走完 4 步并提交。
   - 第 2 步返回第 1 步，数据保留。
   - 每步校验失败时的提示与阻断。
   - 浏览器刷新后是否恢复已填数据（若支持）。
4. **状态检查点**：每步完成后断言当前步骤高亮、数据摘要正确。
5. **清理**：提交后清理测试数据，避免污染后续测试。

示例结构：

```text
e2e/
  pages/
    wizard.page.ts
    step1.page.ts
    step2.page.ts
  fixtures/
    application.json
  specs/
    wizard.spec.ts
```

**评分维度**：
- 页面对象（25%）：是否使用 POM 封装交互
- 数据管理（25%）：是否使用 fixture/factory 解耦数据
- 流程覆盖（30%）：是否覆盖前进、后退、校验、刷新
- 稳定性（20%）：是否考虑清理和等待策略

**常见错误**：
- 把所有步骤写在单个测试中，失败难以定位
- 直接依赖真实账号数据，导致测试不可重复

**延伸追问**：
- 如果第 3 步依赖外部 API，如何在 E2E 中保持稳定？
- Wizard 中某一步改动后，如何最小化测试维护成本？

**相关题目**：
- [FB-13-SC-P-002 E2E 测试中如何设计可维护的页面对象（POM）？](#FB-13-SC-P-002)

**参考资源**：
- [Playwright - POM](https://playwright.dev/docs/pom)

**口头回答版**：
> 页面对象（POM）：为每个 Step 创建 Page Object，封装选择器和交互方法。 数据驱动：将不同申请数据放在 fixture 或 factory 中，避免硬编码。 - 正常走完 4 步并提交。 - 第 2 步返回第 1 步，数据保留。

---

### FB-13-SC-P-005：如何为一个基于 WebSocket 的实时消息列表设计测试？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：websocket、Mock、组件测试、异步
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
一个聊天页面通过 WebSocket 接收消息并渲染列表。请设计前端测试方案，覆盖连接、消息、异常和重连等场景。

**参考答案**：

测试方案：

1. **Mock WebSocket Server**：在测试中用 Node 的 `ws` 库或内存 mock 启动一个 WebSocket 服务器，避免依赖真实服务。
2. **连接场景**：
   - 初始连接成功显示加载态。
   - 连接失败显示重试按钮。
3. **消息场景**：
   - 收到单条消息后列表更新。
   - 收到多条消息保持顺序。
   - 自己发送的消息 optimistically 更新。
4. **异常与重连**：
   - 服务端主动断开，前端自动重连。
   - 心跳超时触发重连。
5. **组件卸载**：关闭页面时 WebSocket 是否正确关闭，避免内存泄漏。

示例：

```js
const server = new WS('ws://localhost:1234');
render(<ChatRoom />);
await server.connected;
server.send(JSON.stringify({ id: 1, text: 'hi' }));
expect(await screen.findByText('hi')).toBeInTheDocument();
server.close();
```

**评分维度**：
- WS Mock（40%）：是否能用 mock server 隔离真实依赖
- 消息时序断言（30%）：是否能验证接收、顺序、乐观更新
- 边界场景（30%）：是否覆盖重连、断开、卸载

**常见错误**：
- 直接连接真实 WebSocket 服务，导致测试不稳定
- 忽略组件卸载后的资源清理

**延伸追问**：
- 如何测试重连时的消息去重？
- 如果 WebSocket 消息量很大，如何验证虚拟滚动性能？

**相关题目**：
- [FB-13-CA-A-004 下面这段 Jest 异步测试为什么会出问题？](#FB-13-CA-A-004)

**参考资源**：
- [Mock WebSocket - jest-websocket-mock](https://github.com/romgain/jest-websocket-mock)

**口头回答版**：
> Mock WebSocket Server：在测试中用 Node 的 ws 库或内存 mock 启动一个 WebSocket 服务器，避免依赖真实服务。 - 初始连接成功显示加载态。 - 连接失败显示重试按钮。 - 收到单条消息后列表更新。

---

### FB-13-EN-P-003：如何在 Monorepo 中设计增量测试策略？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：Monorepo、并发、CI/CD、测试策略
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
在 Monorepo 中，全量测试越来越慢。请设计一套增量测试策略，只运行受变更影响的包及其依赖的测试。

**参考答案**：

策略设计：

1. **依赖图分析**：使用 Nx、Turborepo、Rush 或 pnpm workspace 计算受影响项目。
2. **测试范围**：
   - 仅运行变更包及其下游依赖包的测试。
   - 上游依赖未变更时，可跳过重复测试。
3. **缓存**：缓存已通过的测试结果和构建产物，命中缓存则直接复用。
4. **分片与并行**：对受影响的大包进行分片，多 job 并行执行。
5. **兜底**：夜间或发布前运行全量回归，弥补增量策略可能遗漏的集成问题。

注意事项：

- 必须保证依赖图准确，共享配置变更可能影响所有包。
- 测试之间不能共享全局状态，否则缓存会失效或导致 flaky。

**评分维度**：
- 受影响图（40%）：是否理解依赖图与受影响范围
- 缓存机制（30%）：是否提到测试结果缓存和构建缓存
- 策略权衡（30%）：是否提到夜间全量兜底和共享配置影响

**常见错误**：
- 只按文件路径匹配，忽略跨包依赖
- 过度依赖缓存，导致共享配置变更漏测

**延伸追问**：
- 如果一个基础工具包被大量包依赖，变更它时如何控制测试成本？
- 增量测试和全量回归如何平衡？

**相关题目**：
- [FB-13-SD-R-002 Monorepo 中的测试策略与单仓库有什么不同？](#FB-13-SD-R-002)

**参考资源**：
- [Nx - Affected](https://nx.dev/ci/features/affected)

**口头回答版**：
> 依赖图分析：使用 Nx、Turborepo、Rush 或 pnpm workspace 计算受影响项目。 - 仅运行变更包及其下游依赖包的测试。 - 上游依赖未变更时，可跳过重复测试。 缓存：缓存已通过的测试结果和构建产物，命中缓存则直接复用。

---

### FB-13-EN-P-004：如何在 CI/CD 中实现测试失败自动重试与 flaky 标记？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：flaky-test、CI/CD、自动化、测试稳定性
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请设计一个 CI/CD 中的机制：测试失败时自动重试，多次失败则标记为 flaky 并告警，同时避免掩盖真实缺陷。

**参考答案**：

机制设计：

1. **失败重试**：配置 `jest --retry` 或 CI 级别的重试次数（如 2 次），区分“首次失败但重试通过”与“持续失败”。
2. **Flaky 标记**：建立 flaky 测试清单，将通过重试的测试自动加入候选清单，人工 review 后确认。
3. **告警与隔离**：对确认的 flaky 测试发出告警，可临时跳过（quarantine）但必须记录技术债并限期修复。
4. **根因治理**：收集 flaky 日志、截图、时序信息，定位共享状态、异步、环境问题等根因。
5. **防止掩盖缺陷**：重试仅用于识别 flaky，不能用于让有真实缺陷的测试通过；持续失败的测试必须修复。

**评分维度**：
- 重试策略（35%）：是否设计合理的重试次数和判定逻辑
- flaky 识别（35%）：是否建立清单、告警和隔离机制
- 根因治理（30%）：是否强调收集日志和修复而非一味重试

**常见错误**：
- 无限重试直到通过，掩盖真实 bug
- 把 flaky 测试直接删除而不修复根因

**延伸追问**：
- 如果一个测试重试 3 次才通过，是否应该阻塞合并？
- 如何防止开发者故意把不稳定测试加入重试策略？

**相关题目**：
- [FB-13-SC-P-001 测试不稳定（Flaky Test）有哪些常见原因？如何解决？](#FB-13-SC-P-001)

**参考资源**：
- [Jest - Retry Times](https://jestjs.io/docs/jest-object#jestretrytimesnumretries-options)

**口头回答版**：
> 失败重试：配置 jest --retry 或 CI 级别的重试次数（如 2 次），区分“首次失败但重试通过”与“持续失败”。 Flaky 标记：建立 flaky 测试清单，将通过重试的测试自动加入候选清单，人工 review 后确认。 告警与隔离：对确认的 flaky 测试发出告警，可临时跳过（quarantine）但必须记录技术债并限期修复。 根因治理：收集 flaky 日志、截图、时序信息，定位共享状态、异步、环境问题等根因。

---

### FB-13-CA-P-003：下面这段异步测试代码存在竞态条件吗？

**题型**：代码分析题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：异步、并发、Jest、单元测试
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：

```js
let result;

function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id }), 100 - id * 10);
  });
}

test('latest request wins', async () => {
  fetchUser(1).then(data => { result = data; });
  fetchUser(2).then(data => { result = data; });
  await new Promise(r => setTimeout(r, 200));
  expect(result.id).toBe(2);
});
```

请指出测试中的问题，并给出更稳定的写法。

**参考答案**：

问题：测试依赖请求完成的先后顺序（id 越小延迟越大），存在竞态条件。一旦网络延迟或实现变化，结果可能变成 1，导致 flaky。

修复方向：

1. **顺序执行**：确保第二个请求在第一个完成后发起，避免竞态。
2. **使用可控 mock**：让 `fetchUser` 的返回顺序由测试决定。
3. **验证竞争策略本身**：如果业务逻辑要求“最新请求获胜”，应显式测试取消或忽略旧请求的逻辑。

修复示例：

```js
test('latest request wins', async () => {
  const fetchUser = jest.fn()
    .mockResolvedValueOnce({ id: 1 })
    .mockResolvedValueOnce({ id: 2 });

  const r1 = fetchUser(1);
  const r2 = fetchUser(2);
  const results = await Promise.all([r1, r2]);
  expect(results[1]).toEqual({ id: 2 });
});
```

**评分维度**：
- 竞态识别（50%）：能否指出测试依赖不可控的执行顺序
- 修复能力（30%）：能否用 mock 或顺序执行消除竞态
- 测试设计（20%）：是否区分“测试业务竞争策略”与“测试不确定顺序”

**常见错误**：
- 通过增加等待时间来掩盖竞态
- 认为 `setTimeout` 延迟固定就一定是确定性的

**延伸追问**：
- 在 React 中如何处理“最新请求”取消旧请求？
- 如果确实要测并发，如何让测试稳定？

**相关题目**：
- [FB-13-CA-A-004 下面这段 Jest 异步测试为什么会出问题？](#FB-13-CA-A-004)

**参考资源**：
- [JavaScript - Race Conditions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

**口头回答版**：
> 问题：测试依赖请求完成的先后顺序（id 越小延迟越大），存在竞态条件。 一旦网络延迟或实现变化，结果可能变成 1，导致 flaky。 顺序执行：确保第二个请求在第一个完成后发起，避免竞态。 使用可控 mock：让 fetchUser 的返回顺序由测试决定。

---

### FB-13-PE-P-002：如何对前端构建产物进行体积回归测试？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：13 代码质量与测试
**标签**：bundle-size、性能测试、构建产物、CI/CD
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明如何在 CI 中监控前端构建产物体积，防止某次提交导致包体积极剧膨胀。

**参考答案**：

方案：

1. **体积测量**：构建后统计 JS/CSS/图片总大小，以及首屏关键 chunk 大小。
2. **工具选择**：
   - `size-limit`：可设置阈值并支持运行时间评估。
   - `bundlesize`：简单配置大小上限。
   - `webpack-bundle-analyzer` / `source-map-explorer`：可视化分析。
3. **CI 集成**：在 PR 中比较当前分支与基线的体积差异，超过阈值或增幅时失败。
4. **基线管理**：将主分支体积数据持久化到数据库或 CI cache，作为下次比较基准。
5. **告警与修复**：超限后自动评论 PR，提示新增依赖或重复代码。

**评分维度**：
- 工具与阈值（40%）：能否选择合适的体积监控工具
- CI 集成（35%）：是否能在 PR 中比较基线并阻断
- 分析定位（25%）：是否提到 bundle analyzer 定位原因

**常见错误**：
- 只看总体积，不关注首屏关键资源大小
- 阈值一成不变，未根据业务增长调整

**延伸追问**：
- 如何区分业务代码增长和依赖引入导致的体积变化？
- 如果某个 PR 必须引入大依赖，如何处理阈值？

**相关题目**：
- [FB-13-PE-P-001 前端如何做性能测试？请列举指标和工具](#FB-13-PE-P-001)

**参考资源**：
- [size-limit](https://github.com/ai/size-limit)
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

**口头回答版**：
> 体积测量：构建后统计 JS/CSS/图片总大小，以及首屏关键 chunk 大小。 - size-limit：可设置阈值并支持运行时间评估。 - bundlesize：简单配置大小上限。 - webpack-bundle-analyzer / source-map-explorer：可视化分析。

---

### FB-13-SD-R-014：如何为大型前端项目设计自动化回归测试体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：回归、测试策略、CI/CD、架构
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请为一家拥有多条业务线、代码量巨大的前端团队设计一套自动化回归测试体系。

**参考答案**：

体系设计：

1. **测试分层**：
   - 单元测试：工具函数、hooks、纯逻辑，覆盖率高、运行快。
   - 组件/集成测试：Testing Library + JSDOM/真实浏览器，验证模块协作。
   - E2E 测试：覆盖核心用户路径，数量少而精。
   - 视觉回归：关键页面和组件截图对比。
2. **影响面分析**：通过依赖图或变更文件分析，PR 只跑相关测试，夜间跑全量。
3. **环境一致性**：容器化测试环境，统一 Node、浏览器、系统依赖版本。
4. **稳定性治理**：flaky 测试隔离、重试策略、状态隔离、Mock 外部依赖。
5. **度量与反馈**：覆盖率、flaky 率、缺陷逃逸率、测试耗时等指标看板；失败自动通知责任人。
6. **数据与配置管理**：测试数据工厂化、环境隔离、配置版本化。

**评分维度**：
- 测试分层（25%）：是否合理划分单元/集成/E2E/视觉回归
- 影响面分析（25%）：是否通过增量测试控制成本
- 稳定性与效率（25%）：是否有 flaky 治理、环境一致性和并行策略
- 度量体系（25%）：是否有指标看板和持续反馈机制

**常见错误**：
- 追求全量 E2E 覆盖，导致维护成本爆炸
- 只关注测试数量，忽视运行稳定性和反馈速度

**延伸追问**：
- 如何说服业务方接受回归测试带来的研发成本？
- 多条业务线技术栈不同，如何统一测试平台？

**相关题目**：
- [FB-13-SD-R-001 如何为大型前端项目设计一套完整的测试策略？](#FB-13-SD-R-001)

**参考资源**：
- [Google Testing Blog - Test Size](https://testing.googleblog.com/2010/12/test-sizes.html)

**口头回答版**：
> - 单元测试：工具函数、hooks、纯逻辑，覆盖率高、运行快。 - 组件/集成测试：Testing Library + JSDOM/真实浏览器，验证模块协作。 - E2E 测试：覆盖核心用户路径，数量少而精。 - 视觉回归：关键页面和组件截图对比。

---

### FB-13-SD-R-015：如何设计前端测试数据管理体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：测试数据、测试策略、E2E 测试、质量
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
在大型前端项目的 E2E 和集成测试中，测试数据常常混乱、重复、难以维护。请设计一套测试数据管理体系。

**参考答案**：

体系设计：

1. **数据分层**：
   - **Factories**：动态生成基础实体，如用户、订单，支持覆盖属性。
   - **Fixtures**：静态数据集，用于稳定场景和回归基线。
   - **Seed Scripts**：在测试前置步骤中初始化数据库或服务状态。
2. **隔离与清理**：
   - 每个测试或每个 worker 使用独立的数据租户/沙箱。
   - 测试结束后清理数据，或采用一次性测试环境。
3. **可维护性**：
   - 数据定义与业务模型同步，避免硬编码 ID 和 magic value。
   - 使用版本控制管理 fixture 变更。
4. **安全合规**：
   - 敏感信息脱敏，禁止在测试代码中写入真实密码、token。
   - 测试数据与生产数据物理隔离。
5. **工具链**：FactoryBot-js、faker、@mswjs/data、数据库迁移工具。

**评分维度**：
- 数据分层（30%）：是否能区分 factory、fixture、seed
- 隔离与清理（30%）：是否保证测试之间数据不互相污染
- 可维护性（25%）：是否避免硬编码、支持版本管理
- 安全合规（15%）：是否提到脱敏和生产隔离

**常见错误**：
- 所有测试共享同一组静态数据，导致并行冲突
- 测试失败后遗留脏数据，影响后续测试

**延伸追问**：
- 如何为跨服务依赖的 E2E 测试准备一致的数据？
- 测试数据变更频率高时，如何降低维护成本？

**相关题目**：
- [FB-13-SC-P-004 如何为一个多步骤表单 Wizard 设计 E2E 测试？](#FB-13-SC-P-004)

**参考资源**：
- [FactoryBot](https://github.com/thoughtbot/factory_bot)

**口头回答版**：
> - Factories：动态生成基础实体，如用户、订单，支持覆盖属性。 - Fixtures：静态数据集，用于稳定场景和回归基线。 - Seed Scripts：在测试前置步骤中初始化数据库或服务状态。 - 每个测试或每个 worker 使用独立的数据租户/沙箱。

---

### FB-13-SD-R-016：如何在前端落地契约测试与 API 版本治理？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：契约测试、API、版本管理、质量门禁
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
前端作为 API 消费者，经常因后端接口变更导致线上故障。请设计一套契约测试与 API 版本治理方案。

**参考答案**：

方案设计：

1. **契约测试**：
   - 使用 Pact 等工具，由前端定义消费者契约并生成契约文件。
   - 后端在 CI 中验证提供者是否满足契约。
   - 契约变更必须通过双方 review，避免单方面破坏。
2. **版本治理**：
   - API 显式声明版本号（如 URL `/v1/users` 或 Header `Accept-Version`）。
   - 定义 breaking / non-breaking 变更标准，禁止随意删除字段或修改类型。
   - 使用 OpenAPI / JSON Schema 作为接口规范，并纳入版本控制。
3. **CI 集成**：
   - PR 阶段跑契约测试，阻断不兼容变更。
   - 发布前对比当前版本与生产版本契约差异。
4. **降级与兼容**：
   - 前端对关键字段做缺省处理，后端保留废弃字段的兼容期。

**评分维度**：
- 契约测试原理（30%）：是否理解消费者驱动契约
- 版本治理（30%）：是否有版本号、breaking 定义、Schema 管理
- CI 集成（25%）：是否将契约验证纳入门禁
- 变更管理（15%）：是否提到兼容期与降级策略

**常见错误**：
- 只在后端做单元测试，忽视消费者契约
- API 版本混乱，前后端通过口头约定字段含义

**延伸追问**：
- 如果后端必须做 breaking 变更，前后端如何协同发布？
- 契约测试能否完全替代集成测试？

**相关题目**：
- [FB-13-CO-P-002 什么是契约测试（Contract Testing）？前端如何应用？](#FB-13-CO-P-002)

**参考资源**：
- [Pact](https://pact.io/)
- [OpenAPI Specification](https://swagger.io/specification/)

**口头回答版**：
> - 使用 Pact 等工具，由前端定义消费者契约并生成契约文件。 - 后端在 CI 中验证提供者是否满足契约。 - 契约变更必须通过双方 review，避免单方面破坏。 - API 显式声明版本号（如 URL /v1/users 或 Header Accept-Version）。

---

### FB-13-SD-R-017：如何设计前端灰度发布与线上质量验证机制？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：灰度发布、可观测性、质量门禁、E2E 测试
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套前端灰度发布方案，并说明如何在灰度阶段验证线上质量、发现问题后自动回滚。

**参考答案**：

方案设计：

1. **灰度流量控制**：
   - 通过 Feature Flag 或 CDN/网关路由，按用户 ID、地域、设备、业务线逐步放量（如 1% → 10% → 50% → 100%）。
2. **线上质量验证**：
   - **合成监控（Synthetic Monitoring）**：模拟关键用户路径，定时探测新版本可用性。
   - **真实用户监控（RUM）**：收集 JS 错误、性能指标、业务转化率。
   - **核心业务指标**：下单成功率、支付转化率、关键按钮点击率。
3. **自动回滚**：
   - 设定阈值（错误率 > 0.5%、P99 延迟 > 基线 20%、核心转化下降 > 5%）。
   - 触发阈值后自动切换流量回旧版本，并通知值班人员。
4. **发布流程**：
   - 预发环境 Smoke → 小流量灰度 → 观察窗口 → 全量 → 持续监控。

**评分维度**：
- 灰度机制（30%）：是否有清晰的流量控制策略
- 质量验证（30%）：是否结合合成监控、RUM 和业务指标
- 自动回滚（25%）：是否有阈值和自动回滚设计
- 组织流程（15%）：是否区分预发、灰度、全量阶段

**常见错误**：
- 灰度只观察功能可用性，忽视性能和业务指标
- 没有自动回滚，发现问题后手动切换慢

**延伸追问**：
- 灰度期间如何对比新旧版本指标？
- 如果前端资源是静态部署，如何实现按用户灰度？

**相关题目**：
- [FB-13-CO-P-016 什么是 Smoke Test 与 Canary Test？前端如何设计？](#FB-13-CO-P-016)

**参考资源**：
- [LaunchDarkly - Feature Flags](https://launchdarkly.com/)

**口头回答版**：
> - 通过 Feature Flag 或 CDN/网关路由，按用户 ID、地域、设备、业务线逐步放量（如 1% → 10% → 50% → 100%）。 - 合成监控（Synthetic Monitoring）：模拟关键用户路径，定时探测新版本可用性。 - 真实用户监控（RUM）：收集 JS 错误、性能指标、业务转化率。 - 核心业务指标：下单成功率、支付转化率、关键按钮点击率。

---

### FB-13-SD-R-018：如何设计前端全链路可观测的质量保障体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：可观测性、APM、质量度量、指标
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套覆盖日志、指标、链路的前端可观测体系，并将其与质量保障流程联动。

**参考答案**：

体系设计：

1. **可观测三支柱**：
   - **日志**：结构化日志记录用户操作、错误堆栈、上下文信息。
   - **指标**：页面性能（FCP、LCP、CLS、INP）、JS 错误率、API 成功率、业务转化率。
   - **链路**：追踪用户请求从页面点击到后端服务的完整路径，定位慢节点。
2. **质量联动**：
   - 线上异常自动创建工单并关联到发布版本。
   - 缺陷逃逸率、MTTR、MTTD 纳入团队质量看板。
   - 高频错误自动触发告警和回滚。
3. **数据消费**：
   - 开发阶段：用 Sentry、Datadog 等工具快速定位问题。
   - 测试阶段：用线上数据反哺用例设计，补强遗漏场景。
   - 复盘阶段：通过事故链路分析改进测试策略。
4. **隐私与性能**：采样率控制、敏感字段脱敏、避免过度上报影响用户体验。

**评分维度**：
- 可观测三支柱（30%）：是否覆盖日志、指标、链路
- 前端指标（30%）：是否提到 Core Web Vitals 等关键性能指标
- 质量联动（25%）：是否与缺陷管理、发布、复盘结合
- 隐私与性能（15%）：是否考虑采样和脱敏

**常见错误**：
- 只收集错误日志，不收集性能指标和业务指标
- 告警过多导致团队麻木，形成告警疲劳

**延伸追问**：
- 如何从前端链路追踪中识别后端慢接口？
- 可观测数据如何指导测试用例优先级？

**相关题目**：
- [FB-13-CO-P-013 如何设计前端异常监控与可观测性测试？](#FB-13-CO-P-013)

**参考资源**：
- [Google - Core Web Vitals](https://web.dev/vitals/)

**口头回答版**：
> - 日志：结构化日志记录用户操作、错误堆栈、上下文信息。 - 指标：页面性能（FCP、LCP、CLS、INP）、JS 错误率、API 成功率、业务转化率。 - 链路：追踪用户请求从页面点击到后端服务的完整路径，定位慢节点。 - 线上异常自动创建工单并关联到发布版本。

---

### FB-13-SD-R-019：如何为前端低代码平台设计测试策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：低代码、组件测试、E2E 测试、测试策略
**出现频率**：低频
**预计回答时长**：15-30 分钟

**题目描述**：
一个前端低代码平台包含组件库、设计器、渲染引擎和 DSL。请为其设计分层测试策略。

**参考答案**：

测试策略：

1. **元组件层**：
   - 每个基础组件有独立的单元测试和快照测试。
   - 验证 props、事件、样式、可访问性。
2. **DSL 与 Schema 层**：
   - 对页面 Schema 做 JSON Schema 校验。
   - 测试 DSL 版本升级时的迁移逻辑和兼容性。
3. **渲染引擎层**：
   - 测试不同 Schema 输入的渲染输出。
   - 验证事件绑定、数据源解析、条件渲染。
4. **设计器层**：
   - E2E 测试拖拽、属性面板、撤销重做、画布交互。
   - 使用真实浏览器测试复杂的鼠标/键盘操作。
5. **生成应用层**：
   - 对典型业务模板做 Smoke 测试。
   - 验证发布后的产物能独立运行。
6. **平台级**：
   - 插件市场、多租户、权限、版本回滚的集成测试。

**评分维度**：
- 元组件测试（25%）：是否覆盖组件独立行为
- 渲染与 Schema（25%）：是否验证 DSL 和渲染引擎
- 设计器测试（25%）：是否覆盖画布交互和复杂操作
- 版本兼容（25%）：是否考虑 DSL 升级和回滚

**常见错误**：
- 只测基础组件，忽视渲染引擎和 DSL 变更
- 用单元测试覆盖设计器拖拽交互，导致场景遗漏

**延伸追问**：
- 如何测试低代码平台生成的应用在不同终端上的表现？
- DSL 版本不兼容时，如何保证旧项目不 break？

**相关题目**：
- [FB-13-SD-R-012 如何为前端组件库设计测试策略？](#FB-13-SD-R-012)

**参考资源**：
- [Storybook - Testing](https://storybook.js.org/docs/writing-tests/)

**口头回答版**：
> - 每个基础组件有独立的单元测试和快照测试。 - 验证 props、事件、样式、可访问性。 DSL 与 Schema 层： - 对页面 Schema 做 JSON Schema 校验。

---

### FB-13-CP-R-003：如何在团队中推动“测试优先”的工程文化？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：质量左移、团队治理、敏捷、测试
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
作为技术负责人，你希望在团队中推动“测试优先”文化，但遇到业务压力大、成员习惯难改等问题。你会怎么做？

**参考答案**：

推动策略：

1. **以身作则**：核心模块、公共组件先写测试，形成可模仿的范本。
2. **降低门槛**：提供测试模板、工具链、文档和培训，让写测试比不写更方便。
3. **机制保障**：
   - CI 设置覆盖率、lint、类型检查门禁。
   - Code Review 必须有测试相关检查点。
   - 需求评审时同步定义验收标准（AC）和测试策略。
4. **度量与反馈**：
   - 公开覆盖率、缺陷逃逸率趋势，让团队看到投入产出。
   - 对高质量测试和主动发现缺陷的行为给予认可。
5. **循序渐进**：
   - 新项目严格执行，老项目分阶段达标。
   - 用 AI 辅助生成基础测试，减少重复劳动。
6. **文化共识**：让 QA、产品、开发共同承担质量责任，而不是测试由某一方负责。

**评分维度**：
- 文化策略（35%）：是否有以身作则和降低门槛的举措
- 机制保障（30%）：是否通过 CI 和 Code Review 固化流程
- 度量激励（20%）：是否建立反馈和激励机制
- 沟通协作（15%）：是否让质量成为共同责任

**常见错误**：
- 一上来就强制 100% 覆盖，导致团队抵触
- 只提要求不配套工具和培训

**延伸追问**：
- 如果业务方要求砍掉测试时间，你如何沟通？
- 如何平衡测试投入与交付速度？

**相关题目**：
- [FB-13-CP-R-001 如何在团队中推动质量左移（Shift-Left）文化？](#FB-13-CP-R-001)

**参考资源**：
- [Accelerate - DORA](https://dora.dev/)

**口头回答版**：
> 以身作则：核心模块、公共组件先写测试，形成可模仿的范本。 降低门槛：提供测试模板、工具链、文档和培训，让写测试比不写更方便。 - CI 设置覆盖率、lint、类型检查门禁。 - Code Review 必须有测试相关检查点。

---

### FB-13-CP-R-004：历史项目测试覆盖率极低，如何制定分阶段治理方案？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：技术债、覆盖率、团队治理、测试
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
你接手一个历史项目，测试覆盖率不足 10%，每次发布都依赖人工回归。请制定分阶段治理方案。

**参考答案**：

治理方案：

1. **基线建立**：
   - 统计当前覆盖率、flaky 率、线上缺陷分布，识别高风险模块。
2. **优先覆盖核心路径**：
   - 从支付、登录、权限、关键业务流开始补充测试。
   - 先写 Characterization Tests 锁定现有行为，再逐步重构。
3. **重构提升可测试性**：
   - 拆分大函数、依赖注入、解耦 UI 与逻辑，让代码更容易测试。
4. **分阶段门禁**：
   - 第一阶段：只阻止覆盖率下降。
   - 第二阶段：设定逐步提升的目标（如每季度 +10%）。
   - 第三阶段：达到团队约定的目标阈值。
5. **文化与激励**：
   - 把补测试纳入迭代计划，而不是全部压在一个人身上。
   - 对关键模块补测试给予绩效认可。
6. **度量与调整**：
   - 持续跟踪覆盖率、缺陷逃逸率、发布回归工时，用数据验证效果。

**评分维度**：
- 风险评估（30%）：是否先识别高风险模块和建立基线
- 分阶段策略（35%）：是否有循序渐进的覆盖目标和门禁
- 组织保障（20%）：是否将任务分解并纳入迭代
- 度量调整（15%）：是否用数据验证治理效果

**常见错误**：
- 要求一个月内达到 80% 覆盖，导致大量低质量测试
- 只补测试而不重构，测试难以维护

**延伸追问**：
- 如何处理没有文档、业务逻辑复杂的历史代码？
- 覆盖率提升到多少可以停止？

**相关题目**：
- [FB-13-CO-P-010 什么是测试债务（Test Debt）？如何偿还？](#FB-13-CO-P-010)

**参考资源**：
- [Working Effectively with Legacy Code](https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052)

**口头回答版**：
> - 统计当前覆盖率、flaky 率、线上缺陷分布，识别高风险模块。 - 从支付、登录、权限、关键业务流开始补充测试。 - 先写 Characterization Tests 锁定现有行为，再逐步重构。 - 拆分大函数、依赖注入、解耦 UI 与逻辑，让代码更容易测试。

---

### FB-13-CP-R-005：如何向非技术决策者证明质量投入的价值？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：13 代码质量与测试
**标签**：质量、沟通、DORA、指标
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
业务方希望压缩测试和重构时间以加快上线。作为技术负责人，你如何向非技术决策者证明质量投入的价值？

**参考答案**：

沟通策略：

1. **用业务语言翻译技术指标**：
   - 缺陷逃逸率 → 线上事故数量和客户投诉。
   - MTTR → 故障恢复时间和业务损失。
   - 测试覆盖率 → 变更时的风险暴露面。
2. **量化 ROI**：
   - 对比“修复线上 bug 的成本”和“在开发阶段发现问题的成本”。
   - 引用行业数据：越晚发现缺陷，修复成本呈指数级增长。
3. **试点数据**：
   - 选一个模块做质量改进试点，对比改进前后的 bug 数、返工工时、发布频率。
4. **DORA / SPACE 指标**：
   - 部署频率、变更前置时间、服务恢复时间、变更失败率。
   - 展示高质量工程实践如何提升团队交付能力。
5. **风险框架**：
   - 不是追求 100% 测试，而是识别不可妥协的核心路径（如支付、安全）。
   - 让决策者理解“不做测试”不是省钱，而是在赌风险不发生。

**评分维度**：
- 指标选择（35%）：能否把技术指标翻译成业务影响
- 沟通方式（30%）：是否用 ROI、试点、行业数据说话
- 案例/试点（20%）：是否提到小范围验证
- 风险量化（15%）：是否区分核心路径与可接受风险

**常见错误**：
- 只讲技术术语，让决策者难以理解
- 用完美主义要求所有需求都 100% 测试

**延伸追问**：
- 如果决策者仍然坚持压缩测试时间，你会如何妥协？
- 质量投入如何在 KPI 或 OKR 中体现？

**相关题目**：
- [FB-13-CP-R-002 作为架构师，如何在业务压力下守住质量底线？](#FB-13-CP-R-002)

**参考资源**：
- [DORA - DevOps Capabilities](https://dora.dev/)

**口头回答版**：
> 用业务语言翻译技术指标： - 缺陷逃逸率 → 线上事故数量和客户投诉。 - MTTR → 故障恢复时间和业务损失。 - 测试覆盖率 → 变更时的风险暴露面。
### FB-13-EN-A-010：Biome / Oxc 与传统 ESLint + Prettier 相比有什么优势和局限？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：13 代码质量与测试
**标签**：质量、单元测试、测试、Jest、Mock
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
Biome / Oxc 与传统 ESLint + Prettier 相比有什么优势和局限。

**参考答案**：

优势：

- **速度更快**：Rust 编写，解析和格式化速度远超 JS 工具。
- **配置简化**：Biome 一个配置文件替代 ESLint + Prettier 多个配置。
- **统一体验**：未来可能整合 Lint、Format、Compile、Bundle 等。

局限：

- **生态成熟度**：ESLint 插件生态更丰富，Biome/Oxc 规则还在完善。
- **迁移成本**：老项目从 ESLint/Prettier 迁移需要评估规则兼容性。
- **定位差异**：Oxc 更偏底层基础设施，Biome 走一体化工具链路线。

选型：

- 成熟项目继续 ESLint + Prettier。
- 新项目追求速度和简化配置可尝试 Biome。
- 自研构建工具可关注 Oxc 作为解析/Resolve 基础。

**评分维度**：
- 能说明性能优势（30%）。
- 能对比生态成熟度（30%）。
- 能给出选型建议（40%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 优势： - 速度更快：Rust 编写，解析和格式化速度远超 JS 工具。 - 配置简化：Biome 一个配置文件替代 ESLint + Prettier 多个配置。 - 统一体验：未来可能整合 Lint、Format、Compile、Bundle 等。 局限： - 生态成熟度：ESLint 插件生态更丰富，Biome/Oxc 规则还在完善。

---

### FB-13-CO-A-017：什么是 Codemod？什么时候应该使用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：13 代码质量与测试
**标签**：质量、单元测试、测试、Jest、Mock
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是 Codemod？什么时候应该使用。

**参考答案**：

Codemod 是通过脚本批量修改代码的技术，常用于：

- API 变更后的调用点迁移。
- 框架升级（如 Vue 2 → Vue 3，React Class → Hooks）。
- 代码规范统一（如命名、引入路径）。

常用工具：

- **jscodeshift**：基于 recast 的 AST 转换。
- **ts-morph**：基于 TypeScript AST，类型感知更安全。
- **ESLint --fix**：规则级自动修复。

注意事项：

- 先写测试验证转换规则。
- 小范围试点再全量执行。
- 结果仍需 Code Review。
- 尽量用 AST 转换，避免正则替换误伤。

**评分维度**：
- 能解释 Codemod 概念（30%）。
- 能说出 2 个以上使用场景（30%）。
- 能提到工具和注意事项（40%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> Codemod 是通过脚本批量修改代码的技术，常用于： - API 变更后的调用点迁移。 - 框架升级（如 Vue 2 → Vue 3，React Class → Hooks）。 - 代码规范统一（如命名、引入路径）。 常用工具： - jscodeshift：基于 recast 的 AST 转换。

---

### FB-13-CO-A-018：什么是属性测试（Property-Based Testing）？举一个 fast-check 的例子。

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：13 代码质量与测试
**标签**：质量、单元测试、测试、Jest、Mock
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是属性测试（Property-Based Testing）？举一个 fast-check 的例子。。

**参考答案**：

属性测试不编写具体用例，而是定义对所有输入都成立的属性，由工具自动生成随机输入验证。

示例：

```ts
import * as fc from "fast-check";

fc.assert(
  fc.property(fc.array(fc.integer()), (arr) => {
    return JSON.stringify(arr) === JSON.stringify(arr.reverse().reverse());
  })
);
```

优势：

- 更容易发现边界情况和隐藏 Bug。
- 失败时会 shrink 出最小反例。

局限：

- 需要抽象出正确的属性。
- 不适合业务语义复杂的场景。

属性测试是对单元测试的补充，不是替代。

**评分维度**：
- 能解释属性测试概念（30%）。
- 能写出 fast-check 示例（40%）。
- 能说明优缺点和适用场景（30%）。

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 属性测试不编写具体用例，而是定义对所有输入都成立的属性，由工具自动生成随机输入验证。 示例： （代码示例） 优势： - 更容易发现边界情况和隐藏 Bug。 - 失败时会 shrink 出最小反例。 局限： - 需要抽象出正确的属性。

---

### FB-13-CO-A-019：什么是架构测试？如何用 ts-arch 约束模块依赖？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：13 代码质量与测试
**标签**：质量、单元测试、测试、Jest、Mock
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
什么是架构测试？如何用 ts-arch 约束模块依赖。

**参考答案**：

架构测试是把项目的架构约定（如分层、依赖方向）写成可执行测试，防止代码结构劣化。

ts-arch 示例：

```ts
import { filesOfProject } from "ts-arch";

it("domain 层不应依赖 ui 层", async () => {
  const rule = filesOfProject()
    .inFolder("src/domain")
    .shouldNot()
    .dependOnFiles()
    .inFolder("src/ui");

  await expect(rule).toPass();
});
```

收益：

- 把架构文档变成自动化约束。
- 新成员快速理解项目边界。
- CI 拦截违规依赖，防止技术债务积累。

**评分维度**：
- 能解释架构测试价值（30%）。
- 能写出 ts-arch 规则示例（40%）。
- 能说明常见规则类型（30%）。

---

> **领域编号**：E04 代码质量  
> **最后更新**：2026-06-24

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> 架构测试是把项目的架构约定（如分层、依赖方向）写成可执行测试，防止代码结构劣化。 ts-arch 示例： （代码示例） 收益： - 把架构文档变成自动化约束。 - 新成员快速理解项目边界。 - CI 拦截违规依赖，防止技术债务积累。

