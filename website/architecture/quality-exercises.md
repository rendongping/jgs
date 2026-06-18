# 质量保障练习册

## 一、选择题

### 1. 测试金字塔中，哪一层应该数量最多、执行最快？

A. E2E 测试
B. 集成测试
C. 单元测试
D. 视觉回归测试

**答案：C**

**解析**：单元测试数量最多、执行最快、成本最低，是测试金字塔的底座。

---

### 2. 以下哪项不属于前端可观测性的三大支柱？

A. 日志（Logs）
B. 指标（Metrics）
C. 链路追踪（Traces）
D. 单元测试（Unit Tests）

**答案：D**

**解析**：可观测性三大支柱是日志、指标、链路追踪。单元测试属于质量保障手段，不是可观测性。

---

### 3. 契约测试最适合解决以下哪个问题？

A. 前端组件样式一致性
B. 前后端接口约定被单方面破坏
C. 页面加载速度优化
D. 数据库性能问题

**答案：B**

**解析**：契约测试确保前后端遵守 API 契约，防止一方修改后另一方不知情而报错。

---

### 4. 灰度发布的主要目的是什么？

A. 完全替代测试环境
B. 降低新版本全量上线风险
C. 减少代码量
D. 提高开发速度

**答案：B**

**解析**：灰度发布先让小部分用户体验新版本，验证稳定后再扩大范围，降低风险。

---

### 5. 以下哪个工具主要用于前端错误追踪？

A. Webpack
B. Sentry
C. ESLint
D. Lighthouse

**答案：B**

**解析**：Sentry 是常用的前端错误监控和追踪平台。Webpack 是构建工具，ESLint 是代码检查工具，Lighthouse 是性能审计工具。

---

## 二、填空题

### 6. 前端自动化测试通常分为单元测试、______ 测试、______ 测试三个层级。

**答案**：集成、E2E / 端到端

**解析**：测试金字塔的三层是单元测试、集成测试、E2E 测试。

---

### 7. ______ 测试通过模拟真实用户操作，验证完整业务流程。

**答案**：E2E / 端到端

**解析**：E2E（End-to-End）测试模拟用户在浏览器中的真实操作。

---

### 8. 前端全局 JS 错误可以通过 window 的 ______ 事件捕获。

**答案**：error

**解析**：`window.addEventListener('error', ...)` 可以捕获全局 JS 错误。

---

### 9. ______ 是一种把新版本先发布给少量用户验证的发布策略。

**答案**：灰度发布 / 金丝雀发布

**解析**：灰度发布/金丝雀发布通过小流量验证新版本稳定性。

---

### 10. 代码覆盖率通常包括行覆盖率、______ 覆盖率和函数覆盖率。

**答案**：分支

**解析**：常见的代码覆盖率指标包括行覆盖率、分支覆盖率、函数覆盖率。

---

## 三、代码分析题

### 11. 以下测试用例有什么问题？如何改进？

```javascript
test('user login', async () => {
  const result = await login('admin', '123456');
  expect(result).toBeTruthy();
});
```

**答案与解析**：

问题：

1. **测试名不具体**：不知道测的是什么。
2. **断言太弱**：`toBeTruthy` 无法验证返回内容。
3. **可能依赖真实服务**：如果 login 调用真实 API，测试不稳定。
4. **缺少边界测试**：错误密码、空输入等场景未覆盖。

改进：

```javascript
describe('login', () => {
  beforeEach(() => {
    // Mock API
    jest.spyOn(api, 'login').mockResolvedValue({
      success: true,
      token: 'fake-token',
      user: { id: '1', name: 'admin' }
    });
  });

  test('returns user info and token when credentials are valid', async () => {
    const result = await login('admin', 'correct-password');
    expect(result.success).toBe(true);
    expect(result.token).toBe('fake-token');
    expect(result.user.name).toBe('admin');
  });

  test('throws error when password is empty', async () => {
    await expect(login('admin', '')).rejects.toThrow('密码不能为空');
  });
});
```

---

### 12. 分析以下错误捕获代码，指出潜在问题。

```javascript
window.addEventListener('error', (event) => {
  console.error(event.message);
});
```

**答案与解析**：

问题：

1. **只打印到控制台**：没有上报到监控平台。
2. **缺少关键信息**：没有记录堆栈、文件名、行号、用户环境。
3. **未捕获 Promise 错误**：需要同时监听 `unhandledrejection`。
4. **可能遗漏跨域脚本错误**：需要配置 `crossorigin` 属性。

改进：

```javascript
window.addEventListener('error', (event) => {
  reportError({
    type: 'js-error',
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack,
    userAgent: navigator.userAgent,
    timestamp: Date.now()
  });
});

window.addEventListener('unhandledrejection', (event) => {
  reportError({
    type: 'unhandledrejection',
    reason: event.reason?.message || event.reason
  });
});
```

---

### 13. 以下 CI 配置有什么问题？如何改进？

```yaml
jobs:
  build:
    steps:
      - run: npm install
      - run: npm run build
```

**答案与解析**：

问题：

1. **缺少 Lint 检查**：代码规范无法保证。
2. **缺少测试**：没有自动验证正确性。
3. **缺少覆盖率检查**：无法度量测试质量。
4. **没有缓存**：npm install 每次都重新下载依赖。
5. **缺少构建产物分析**：无法发现体积异常。

改进：

```yaml
jobs:
  ci:
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test -- --coverage --coverageThreshold=80
      - run: npm run build
      - run: npm run analyze:bundle
```

---

## 四、架构设计题

### 14. 设计一个前端质量保障体系，覆盖开发、测试、发布、运维四个阶段。

**参考答案**：

**开发阶段**：
- TypeScript 静态类型检查。
- ESLint/Prettier/Stylelint 代码规范。
- Code Review 制度，使用 checklist。
- 单元测试与组件测试。

**测试阶段**：
- 单元测试（Jest/Vitest）覆盖核心逻辑。
- 集成测试（React Testing Library）覆盖组件组合。
- E2E 测试（Cypress/Playwright）覆盖核心流程。
- 视觉回归测试防止 UI 意外变化。
- 契约测试保证前后端接口一致。

**发布阶段**：
- CI 流水线自动执行 Lint、类型检查、测试、构建。
- 代码覆盖率门禁。
- 灰度发布，按用户比例逐步全量。
- 发布窗口和回滚机制。

**运维阶段**：
- 错误监控（Sentry）。
- 性能监控（Web Vitals）。
- 业务指标监控（转化率、白屏率）。
- 告警分级和 on-call 机制。
- 全链路日志和 Trace。

---

### 15. 你如何推动一个团队从“不重视测试”转变为“有良好测试文化”？

**参考答案**：

1. **建立共识**：用数据和案例说明测试的价值（减少回归、提升信心、加速重构）。
2. **从核心模块开始**：不要要求一步到位，先在核心模块写测试。
3. **工具简化**：提供测试模板、Mock 工具、CI 集成，降低写测试成本。
4. **纳入流程**：PR 必须包含测试，CI 失败不能合并。
5. **度量与反馈**：展示覆盖率、回归 Bug 数等指标变化。
6. **培训与分享**：组织测试工作坊，分享优秀测试案例。
7. **激励机制**：表扬写测试和重构测试的同学。

---

### 16. 线上出现白屏故障，你会如何排查和恢复？

**参考答案**：

**排查**：

1. 查看错误监控平台，定位异常类型和堆栈。
2. 查看最近发布记录，判断是否与版本相关。
3. 复现问题：相同浏览器、版本、网络、用户路径。
4. 查看网络面板：JS/CSS 资源是否加载失败。
5. 查看 API 监控：是否接口返回异常导致渲染失败。

**恢复**：

1. 如果确认是版本问题，立即回滚到上一个稳定版本。
2. 如果是配置问题，通过配置中心快速修复。
3. 如果是第三方服务问题，启用降级方案。
4. 通知用户并持续跟踪。

**复盘**：

1. 分析根因，补充测试和监控。
2. 优化灰度和发布流程。
3. 更新应急预案。

---

### 17. 对比单元测试、集成测试、E2E 测试的优缺点和适用场景。

**参考答案**：

| 类型 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| 单元测试 | 快、成本低、定位准 | 无法发现集成问题 | 函数、工具、组件逻辑 |
| 集成测试 | 验证模块协作 | 速度中等、依赖较多 | 组件 + API、多个模块组合 |
| E2E 测试 | 最接近真实用户 | 慢、贵、不稳定 | 核心业务流程 |

建议：三者结合，形成测试金字塔。

---

> **领域编号**：A04 质量保障  
> **最后更新**：2026-06-18
