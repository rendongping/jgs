# 微前端练习册

## 一、选择题

### 1. 微前端最适合解决以下哪个问题？

A. 单个小型页面的样式美化
B. 大型应用多团队独立开发、独立部署
C. 减少前端代码的行数
D. 替代后端微服务架构

**答案：B**

**解析**：微前端主要解决大型前端应用在组织和规模上的复杂度问题，支持多团队独立开发、独立部署、技术栈自治。

---

### 2. 以下哪种方案基于 Webpack 5 的模块联邦机制实现运行时模块共享？

A. qiankun
B. single-spa
C. Module Federation
D. iframe

**答案：C**

**解析**：Module Federation 是 Webpack 5 提供的模块共享能力，支持运行时跨应用共享模块和依赖。

---

### 3. qiankun 的子应用需要向主应用暴露哪些生命周期函数？

A. init、render、destroy
B. bootstrap、mount、unmount
C. start、load、stop
D. create、update、remove

**答案：B**

**解析**：qiankun 基于 single-spa，子应用需要暴露 bootstrap、mount、unmount 三个生命周期函数。

---

### 4. 以下哪项不是微前端常见的样式隔离方案？

A. CSS Modules
B. Shadow DOM
C. 全局样式表
D. Scoped CSS

**答案：C**

**解析**：全局样式表会加剧样式冲突，不是隔离方案。CSS Modules、Shadow DOM、Scoped CSS 都是常见的样式隔离方案。

---

### 5. 在微前端架构中，子应用之间最推荐的通信方式是什么？

A. 子应用之间直接互相调用内部方法
B. 通过主应用中转的全局状态或事件机制
C. 直接操作彼此的 DOM
D. 通过修改全局变量实时同步

**答案：B**

**解析**：子应用之间应保持松耦合，通过主应用中转或统一的事件总线/全局状态通信，避免直接依赖。

---

## 二、填空题

### 6. 微前端将一个大前端应用拆分为多个独立 ______、独立 ______、独立 ______ 的小型前端应用。

**答案**：开发、部署、运行

**解析**：微前端的三大独立特征是独立开发、独立部署、独立运行。

---

### 7. qiankun 是基于 ______ 框架封装而来的微前端解决方案。

**答案**：single-spa

**解析**：qiankun 在 single-spa 的基础上提供了 JS 沙箱、样式隔离、HTML Entry、预加载等增强能力。

---

### 8. Module Federation 中，通过 ______ 字段可以把模块暴露给其他应用使用。

**答案**：exposes

**解析**：ModuleFederationPlugin 的 exposes 配置用于声明哪些模块可以远程暴露。

---

### 9. 微前端中，子应用修改 window 对象可能导致 ______ 问题。

**答案**：全局变量污染 / JS 隔离失效

**解析**：多个子应用共享同一个 window 对象，随意修改全局变量会互相影响，需要通过沙箱或规范约束。

---

### 10. Web Components 利用 ______ 实现原生的 DOM 和样式隔离。

**答案**：Shadow DOM

**解析**：Shadow DOM 可以创建封装的 DOM 子树，样式和结构不会与外部互相影响。

---

## 三、代码分析题

### 11. 分析以下 qiankun 主应用配置，指出潜在问题。

```javascript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:3001',
    container: '#subapp',
    activeRule: '/'
  },
  {
    name: 'app2',
    entry: '//localhost:3002',
    container: '#subapp',
    activeRule: '/'
  }
]);

start();
```

**答案与解析**：

问题：

1. **activeRule 冲突**：两个子应用都匹配 `/`，会同时触发或只有一个生效，导致路由混乱。
2. **同名 container**：两个子应用挂载到同一个 DOM 节点，切换时可能残留旧应用内容。
3. **开发环境硬编码**：entry 写死 localhost，生产环境无法使用。

改进：

```javascript
registerMicroApps([
  {
    name: 'app1',
    entry: process.env.APP1_ENTRY,
    container: '#subapp-container',
    activeRule: '/app1'
  },
  {
    name: 'app2',
    entry: process.env.APP2_ENTRY,
    container: '#subapp-container',
    activeRule: '/app2'
  }
]);
```

---

### 12. 下面是一个子应用的生命周期实现，存在什么问题？

```javascript
export function bootstrap() {
  console.log('bootstrap');
}

export function mount(props) {
  ReactDOM.render(<App />, document.getElementById('root'));
}

export function unmount() {
  console.log('unmount');
}
```

**答案与解析**：

问题：

1. **硬编码挂载点**：使用 `document.getElementById('root')`，在微前端中子应用应该挂载到主应用提供的 `props.container` 中。
2. **未处理卸载**：unmount 中没有调用 ReactDOM.unmountComponentAtNode，会导致内存泄漏和事件未清理。
3. **缺少 props 透传**：子应用可能需要接收主应用下发的全局状态和路由信息。

改进：

```javascript
export function bootstrap() {
  console.log('bootstrap');
}

export function mount(props) {
  const container = props.container.querySelector('#root');
  ReactDOM.render(<App {...props} />, container);
}

export function unmount(props) {
  const container = props.container.querySelector('#root');
  ReactDOM.unmountComponentAtNode(container);
}
```

---

### 13. 分析以下 Module Federation 配置，说明 shared 中 singleton 的作用。

```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    app1: 'app1@http://localhost:3001/remoteEntry.js'
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true }
  }
});
```

**答案与解析**：

- **singleton: true**：表示该依赖在多个应用之间只加载一个实例，避免 React Context、Hooks 等因多实例导致的问题。
- **requiredVersion**：声明当前应用需要的版本范围，如果远程应用版本不兼容会给出警告。
- 作用：保证共享依赖（如 React）全局唯一，避免子应用各自加载一份 React 导致的运行时异常。

---

## 四、架构设计题

### 14. 某公司有一个大型电商后台管理系统，包含商品管理、订单管理、用户管理、营销管理四大模块，由四个独立团队维护。请设计一套微前端架构方案，包括技术选型、子应用划分、通信方式和公共依赖管理。

**参考答案**：

**技术选型**：qiankun
- 原因：国内生态成熟、文档完善、对子应用改造小、支持 JS/样式隔离。

**子应用划分**：
- 主应用（portal）：统一登录、菜单、路由、全局状态。
- app-product：商品管理。
- app-order：订单管理。
- app-user：用户管理。
- app-marketing：营销管理。

**路由设计**：
- `/product/*` → app-product
- `/order/*` → app-order
- `/user/*` → app-user
- `/marketing/*` → app-marketing

**通信方式**：
- 主应用通过 `initGlobalState` 维护用户、权限、通知等全局状态。
- 子应用通过 props 接收主应用下发的状态和路由信息。
- 业务事件通过自定义事件总线通信，避免直接耦合。

**公共依赖管理**：
- React、React DOM、Ant Design 通过主应用加载，子应用配置 externals。
- 公共工具函数封装成 npm 包或 Module Federation 共享。
- 统一 UI 组件库和设计规范。

---

### 15. 微前端项目中，子应用 A 需要调用子应用 B 的某个功能，你会如何设计？

**参考答案**：

不推荐子应用 A 直接调用子应用 B 的内部方法，这会导致强耦合。推荐方案：

1. **能力抽象到主应用或公共模块**：把公共能力（如用户选择器、地址选择器）抽成独立组件或服务，供各子应用调用。
2. **通过事件总线通信**：A 发布事件，B 订阅事件，双方不直接依赖。
3. **URL 驱动**：通过主应用路由跳转到 B 的对应页面，带必要参数。
4. **如果必须共享 UI**：把 B 的功能拆分为 Web Component 或 Module Federation 暴露的组件，A 按需加载。

---

### 16. 微前端上线后，用户反馈页面切换偶尔空白或报错。请列出排查思路和解决方案。

**参考答案**：

排查思路：

1. **查看网络面板**：子应用资源是否 404 或加载超时。
2. **查看控制台**：是否有 JS 报错、跨域问题、沙箱异常。
3. **确认路由匹配**：当前路径是否正确匹配到子应用。
4. **检查生命周期**：子应用是否正确导出了 bootstrap/mount/unmount。
5. **查看样式冲突**：是否因为样式丢失或覆盖导致空白。
6. **查看公共依赖版本**：React 等共享依赖是否版本冲突。

解决方案：

- 配置资源预加载。
- 增加子应用加载失败的兜底 UI。
- 统一错误边界处理。
- 建立子应用健康检查和监控告警。
- 灰度发布，先小流量验证。

---

### 17. 对比 qiankun 和 Module Federation，说明各自的适用场景。

**参考答案**：

| 维度 | qiankun | Module Federation |
|------|---------|-------------------|
| 集成粒度 | 应用级 | 模块级 |
| 技术栈要求 | 可异构 | 通常需要一致或兼容 |
| 独立部署 | 强 | 弱（共享模块需要版本协调） |
| 隔离能力 | 提供 JS/样式沙箱 | 较弱，依赖代码约束 |
| 上手成本 | 较低 | 较高 |

**适用场景**：
- qiankun：多团队、异构技术栈、需要强隔离的大型系统。
- Module Federation：技术栈统一、需要模块级复用、希望减少重复打包的场景。

---

> **领域编号**：A02 微前端  
> **最后更新**：2026-06-18
