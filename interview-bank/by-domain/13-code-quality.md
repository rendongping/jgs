# 代码质量与测试 面试题

> 本文件收录代码质量与测试相关面试题，目标题量 40 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、工程化题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#基础题)
- [进阶题](#进阶题)
- [深入题](#深入题)
- [架构题](#架构题)

---

## 基础题

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

---

## 进阶题

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

---

## 深入题

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

---

## 架构题

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
