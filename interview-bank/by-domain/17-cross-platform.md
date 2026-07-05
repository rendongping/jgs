# 跨端技术 面试题

> 本题库共收录 **85** 道面试题（基础 20 / 进阶 22 / 深入 22 / 架构 21）。
> 本文件收录跨端技术相关面试题，目标题量 120 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、框架原理题、性能优化题、安全题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（7 道）{#basic}

### FB-17-CO-B-001：什么是跨端开发？与原生开发相比有哪些优缺点？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：17 跨端技术
**标签**：跨端开发、原生开发、Hybrid、效率、性能
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释什么是跨端开发，并对比跨端开发与原生开发的优缺点及适用场景。

**参考答案**：

跨端开发是指使用同一套或相近的代码库，同时构建多个平台应用（iOS、Android、Web、小程序、桌面端等）的开发方式。

与原生开发的对比：

| 维度 | 跨端开发 | 原生开发 |
|------|---------|---------|
| 开发成本 | 低，一套代码多平台 | 高，需为每个平台单独开发 |
| 开发效率 | 高，热更新、快速迭代 | 相对较低 |
| 性能 | 通常低于原生 | 最优 |
| 体验一致性 | 容易保持一致 | 各平台体验可能不同 |
| 系统新特性支持 | 依赖框架更新 | 可第一时间使用 |
| 团队要求 | 前端技术栈即可 | 需 iOS/Android 原生开发能力 |

常见跨端方案：

- **Web 容器类**：H5 + WebView、小程序。
- **原生渲染类**：React Native、Weex。
- **自绘引擎类**：Flutter。
- **编译转换类**：Taro、UniApp、鸿蒙 ArkTS。
- **桌面端**：Electron、Tauri。

适用场景：
- 业务迭代快、预算有限、对极致性能要求不高的场景。
- 需要同时覆盖多个平台的 ToC 应用。
- 原生适合性能敏感、强交互、需深度调用系统能力的场景。

**评分维度**：
- 能说明跨端开发的核心目标（30%）
- 能对比至少 4 个维度（40%）
- 能列举常见跨端方案并说明适用场景（30%）

**常见错误**：
- 认为跨端开发一定能完全替代原生开发。
- 忽略性能、系统能力、体验差异等 trade-off。
- 混淆跨端框架和跨端渲染原理。

**延伸追问**：
- 你们项目为什么选择当前跨端方案？
- 跨端应用在启动速度和流畅度上通常有哪些瓶颈？

**相关题目**：
- [FB-17-CO-B-002 常见跨端方案分类](#FB-17-CO-B-002)
- [FB-17-SD-R-024 大型跨端应用架构设计](#FB-17-SD-R-024)

**参考资源**：
- [Taro 官方文档](https://taro.zone/)
- [React Native 官方文档](https://reactnative.dev/)
- [Flutter 官方文档](https://flutter.dev/)

**口头回答版**：
> 跨端开发就是用一套或相近的代码同时做多个平台，比如 iOS、Android、Web、小程序。优点是省人、迭代快、体验容易一致；缺点是性能通常不如原生，系统新特性支持也慢。常见方案有 WebView 类比如 H5 和小程序，原生渲染类比如 React Native，自绘引擎类比如 Flutter，编译转换类比如 Taro、UniApp。业务迭代快、预算有限时适合跨端；性能敏感、要深度调用系统能力就优先原生。

---

### FB-17-CO-B-002：常见的跨端方案可以分为哪几类？各有什么代表技术？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：17 跨端技术
**标签**：跨端方案、WebView、原生渲染、自绘引擎、编译转换
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对常见的跨端技术方案进行分类，并说明每类的代表技术和核心原理。

**参考答案**：

跨端方案主要分为四类：

1. **Web 容器类（WebView / Hybrid）**：
   - 原理：使用原生 App 内嵌 WebView，加载 H5 页面。
   - 代表：Cordova、PhoneGap、 Ionic、微信小程序、支付宝小程序。
   - 优点：开发成本低，Web 技术栈，热更新方便。
   - 缺点：性能受 WebView 限制，交互体验弱于原生。

2. **原生渲染类**：
   - 原理：JS 代码通过 Bridge 映射到原生组件渲染。
   - 代表：React Native、Weex。
   - 优点：接近原生的性能和体验。
   - 缺点：Bridge 通信有开销，复杂动画和手势受限。

3. **自绘引擎类**：
   - 原理：使用自己的渲染引擎（如 Skia）直接绘制 UI，不依赖原生组件。
   - 代表：Flutter。
   - 优点：高度一致的跨平台体验，动画性能强。
   - 缺点：包体积大，与原生混合开发有成本。

4. **编译转换类**：
   - 原理：将一种 DSL / 框架代码编译成多端目标代码。
   - 代表：Taro（React/Vue -> 小程序/H5/RN）、UniApp（Vue -> 多端）、鸿蒙 ArkTS。
   - 优点：一套代码覆盖多平台，生态丰富。
   - 缺点：受目标平台能力限制，调试链路长。

**评分维度**：
- 能正确分类（40%）
- 能说明每类原理（30%）
- 能列举代表技术并简要对比（30%）

**常见错误**：
- 把小程序归为原生渲染类。
- 认为 Flutter 使用原生组件渲染。
- 混淆编译转换类和 Web 容器类。

**延伸追问**：
- Taro 属于哪一类？它的编译目标有哪些？
- 为什么 Flutter 的自绘引擎能做到高帧率动画？

**相关题目**：
- [FB-17-CO-B-001 跨端开发优缺点](#FB-17-CO-B-001)
- [FB-17-FS-P-016 小程序渲染原理](#FB-17-FS-P-016)

**参考资源**：
- [移动端跨平台开发方案对比](https://juejin.cn/post/6844903840885604360)

**口头回答版**：
> 跨端方案分四类：Web 容器类，内嵌 WebView 跑 H5，比如小程序、Cordova；原生渲染类，JS 通过 Bridge 调原生组件，比如 React Native、Weex；自绘引擎类，自己用 Skia 画 UI，比如 Flutter；编译转换类，把一套代码编译成多端，比如 Taro、UniApp、鸿蒙 ArkTS。每类在性能、包体积、开发成本上各有取舍。

---

### FB-17-CO-B-003：小程序的运行机制是什么？为什么会有逻辑层和渲染层分离？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨端技术
**标签**：小程序、逻辑层、渲染层、双线程、WebView
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释微信小程序等主流小程序的双线程模型，并说明逻辑层和渲染层分离的原因。

**参考答案**：

主流小程序（微信、支付宝、百度）采用双线程架构：

- **逻辑层（Logic Layer）**：
  - 运行在 JSCore / V8 等 JS 引擎中。
  - 负责数据管理、业务逻辑、生命周期、网络请求。
  - 不能操作 DOM。

- **渲染层（Render Layer）**：
  - 运行在 WebView 中。
  - 负责页面渲染、事件响应、动画。
  - 通过虚拟 DOM 和 Native 层通信。

通信方式：

- 逻辑层和渲染层通过 Native 层桥接通信。
- 数据变化时，逻辑层通过 `setData` 将差异数据传递给渲染层。

分离原因：

1. **安全性**：JS 不能直接操作页面 DOM，防止恶意脚本。
2. **稳定性**：逻辑错误不会直接导致页面崩溃。
3. **性能隔离**：JS 执行和页面渲染互不阻塞。
4. **可控性**：平台可以管控 DOM 操作和 API 调用。

**评分维度**：
- 能说明双线程的组成（40%）
- 能说明各自职责（30%）
- 能解释分离的原因（30%）

**常见错误**：
- 认为小程序是单线程运行。
- 认为逻辑层可以直接操作 DOM。
- 混淆逻辑层和渲染层的执行环境。

**延伸追问**：
- setData 传递的数据量过大会有什么影响？
-  Skyline 渲染引擎和传统 WebView 渲染有什么区别？

**相关题目**：
- [FB-17-CO-B-004 小程序生命周期](#FB-17-CO-B-004)
- [FB-17-PE-A-009 小程序性能优化](#FB-17-PE-A-009)

**参考资源**：
- [微信小程序官方文档 - 运行机制](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/framework.html)
- [微信小程序 Skyline 渲染引擎](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/introduction.html)

**口头回答版**：
> 小程序是双线程架构：逻辑层跑在 JS 引擎里，负责数据和业务逻辑；渲染层跑在 WebView 里，负责页面渲染。两层通过 Native 桥接通信，数据变化靠 setData 传过去。分开主要是为了安全，JS 不能直接操作 DOM，也为了性能和稳定性，两边互不阻塞。

---

### FB-17-CO-B-004：小程序的页面生命周期有哪些？App 生命周期呢？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：17 跨端技术
**标签**：小程序、生命周期、Page、App、onLoad
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请分别说明微信小程序中 Page 页面生命周期和 App 应用生命周期有哪些，以及它们的主要用途。

**参考答案**：

App 生命周期（在 `app.js` / `app.ts` 中）：

| 生命周期 | 触发时机 |
|---------|---------|
| onLaunch | 小程序初始化完成，只触发一次 |
| onShow | 小程序启动或从后台进入前台 |
| onHide | 小程序从前台进入后台 |
| onError | 小程序发生脚本错误 |

Page 生命周期（在页面中）：

| 生命周期 | 触发时机 |
|---------|---------|
| onLoad | 页面加载，可获取页面参数 |
| onShow | 页面显示 |
| onReady | 页面初次渲染完成 |
| onHide | 页面隐藏 |
| onUnload | 页面卸载 |

其他常用生命周期：

- `onPullDownRefresh`：下拉刷新。
- `onReachBottom`：页面上拉触底。
- `onShareAppMessage`：用户点击右上角分享。
- `onPageScroll`：页面滚动。

最佳实践：
- 数据初始化放在 `onLoad`。
- 页面可见时刷新数据放在 `onShow`。
- 清理定时器、订阅放在 `onUnload` 或 `onHide`。

**评分维度**：
- 能列出 App 主要生命周期（30%）
- 能列出 Page 主要生命周期（40%）
- 能说明常用场景（30%）

**常见错误**：
- 把 `onReady` 当成 `onLoad` 使用。
- 在 `onLoad` 中执行 DOM 操作（小程序无 DOM）。
- 忘记在 `onUnload` 中清理副作用。

**延伸追问**：
- 小程序页面跳转后，原页面会触发哪些生命周期？
- 如何实现页面返回时的数据刷新？

**相关题目**：
- [FB-17-CO-B-003 小程序运行机制](#FB-17-CO-B-003)
- [FB-17-CO-A-010 小程序与 H5 的区别](#FB-17-CO-A-010)

**参考资源**：
- [微信小程序 Page 生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html)
- [微信小程序 App 生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app-life-cycle.html)

**口头回答版**：
> 小程序 App 生命周期有 onLaunch、onShow、onHide、onError；页面生命周期有 onLoad、onShow、onReady、onHide、onUnload。onLoad 做初始化拿参数，onShow 做页面可见刷新，onUnload 清理定时器订阅。还有下拉刷新、上拉触底、分享这些事件钩子。

---

### FB-17-CO-B-005：React Native 的基本原理是什么？JS 和 Native 如何通信？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨端技术
**标签**：React Native、Bridge、JSI、原生组件、通信
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请简述 React Native 的基本原理，并说明 JavaScript 代码和 Native 代码之间的通信机制。

**参考答案**：

React Native 基本原理：

1. **JS 线程**：
   - 运行 JS 代码，包括 React 组件、业务逻辑。
   - 通过 Yoga 布局引擎计算布局。

2. **Shadow Thread（影子线程）**：
   - 将 JS 中的组件树转换为 Native 可以理解的布局信息。

3. **Native 线程**：
   - 根据布局信息创建和操作原生组件（View、Text、Image 等）。
   - 处理用户事件并通过 Bridge 回传给 JS。

JS 与 Native 通信：

- **传统 Bridge（RN 旧架构）**：
  - JS 和 Native 通过异步 JSON 序列化消息队列通信。
  - 优点：解耦；缺点：通信有延迟，不适合高频调用。

- **新架构（Fabric + TurboModules + JSI）**：
  - JSI（JavaScript Interface）允许 JS 直接持有 C++ 对象引用。
  - 支持同步调用，大幅提升性能。
  - Fabric 是新渲染器，TurboModules 是新模块系统。

**评分维度**：
- 能说明 RN 的三层线程结构（40%）
- 能说明 Bridge 异步通信原理（30%）
- 能提到新架构 JSI / Fabric / TurboModules（30%）

**常见错误**：
- 认为 RN 使用 WebView 渲染。
- 认为 JS 和 Native 是同步直接调用。
- 混淆 Yoga 和 React Native 本身。

**延伸追问**：
- 为什么 RN 的 List 组件大数据量时会卡顿？
- 新架构相比旧架构具体提升了哪些方面？

**相关题目**：
- [FB-17-FS-P-017 React Native 新架构](#FB-17-FS-P-017)
- [FB-17-CO-B-006 Flutter 基本原理](#FB-17-CO-B-006)

**参考资源**：
- [React Native 官方文档 - Architecture](https://reactnative.dev/docs/architecture-overview)
- [React Native 新架构介绍](https://reactnative.dev/docs/the-new-architecture/why)

**口头回答版**：
> React Native 不是用 WebView，而是 JS 写组件，通过 Bridge 映射到原生组件渲染。JS 线程负责逻辑和 React 组件，Shadow 线程算布局，Native 线程创建原生 View。JS 和 Native 老架构通过 Bridge 异步传 JSON，新架构用 JSI，可以直接持有 C++ 对象引用，支持同步调用，性能更好。

---

### FB-17-CO-B-006：Flutter 的基本原理是什么？它和 React Native 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨端技术
**标签**：Flutter、Dart、Skia、Widget、自绘引擎
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Flutter 的基本原理，并对比 Flutter 与 React Native 的核心差异。

**参考答案**：

Flutter 基本原理：

1. **Dart 语言**：
   - 使用 Dart 编写业务代码和 UI。
   - Dart VM 或 AOT 编译为机器码。

2. **Widget**：
   - 一切皆 Widget，包括布局、样式、交互。
   - Widget 分为 StatelessWidget、StatefulWidget、RenderObjectWidget 等。

3. **自绘引擎**：
   - 不依赖平台原生组件，使用 Skia 直接绘制像素。
   - 渲染流程：Widget -> Element -> RenderObject -> Layer -> Skia。

4. **三棵树**：
   - Widget Tree：描述 UI 配置。
   - Element Tree：连接 Widget 和 RenderObject，管理生命周期。
   - RenderObject Tree：负责布局和绘制。

Flutter vs React Native：

| 维度 | Flutter | React Native |
|------|---------|--------------|
| 渲染方式 | 自绘 Skia | 原生组件 |
| 语言 | Dart | JavaScript |
| 性能 | 更接近原生 | 依赖 Bridge，略逊 |
| 包体积 | 较大 | 相对较小 |
| 热更新 | 受限（iOS 审核限制） | 较灵活 |
| 生态 | 较年轻 | 较成熟 |

**评分维度**：
- 能说明 Flutter 自绘原理和三棵树（40%）
- 能说明 Dart/Skia 的作用（20%）
- 能对比 Flutter 和 RN 的核心差异（40%）

**常见错误**：
- 认为 Flutter 使用原生组件渲染。
- 混淆 Widget 和 Element 的职责。
- 认为 Flutter 完全不能做热更新。

**延伸追问**：
- Flutter 的 Widget 是不可变的，状态变化时如何更新？
- 为什么 Flutter 在 iOS 上热更新受限？

**相关题目**：
- [FB-17-CO-B-005 React Native 原理](#FB-17-CO-B-005)
- [FB-17-FS-P-018 Flutter 渲染管线](#FB-17-FS-P-018)

**参考资源**：
- [Flutter 官方文档 - Widgets](https://docs.flutter.dev/ui/widgets-intro)
- [Flutter 官方文档 - Rendering](https://docs.flutter.dev/resources/inside-flutter)

**口头回答版**：
> Flutter 是用 Dart 写 UI 和逻辑，自带 Skia 渲染引擎直接绘制像素，不依赖原生组件。核心有三棵树：Widget Tree 描述 UI，Element Tree 连接生命周期，RenderObject Tree 负责布局绘制。和 React Native 最大区别是 RN 用原生组件，Flutter 自绘；Flutter 性能更接近原生，但包体积更大，热更新也受限制。

---

### FB-17-CO-B-007：Electron 的主进程和渲染进程有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨端技术
**标签**：Electron、主进程、渲染进程、IPC、桌面端
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Electron 中主进程（Main Process）和渲染进程（Renderer Process）的职责，以及它们如何通信。

**参考答案**：

Electron 基于 Chromium 和 Node.js，采用多进程架构：

- **主进程（Main Process）**：
  - 每个 Electron 应用有且只有一个主进程。
  - 负责创建和管理窗口（BrowserWindow）。
  - 可以访问 Node.js 和系统 API。
  - 不直接渲染 UI。

- **渲染进程（Renderer Process）**：
  - 每个 BrowserWindow 对应一个独立的渲染进程。
  - 负责页面 UI 渲染，运行 Web 技术（HTML/CSS/JS）。
  - 默认不能直接访问 Node.js API（可通过 contextBridge 暴露）。

通信方式：

1. **ipcMain / ipcRenderer**：
   - 渲染进程通过 `ipcRenderer.send` 发送消息。
   - 主进程通过 `ipcMain.on` 监听消息。

2. **contextBridge**：
   - 在 preload 脚本中安全暴露主进程能力给渲染进程。

3. **remote 模块（已废弃）**：
   - 不推荐在新项目中使用。

最佳实践：
- 敏感操作放在主进程。
- 渲染进程通过 preload 和 IPC 与主进程交互。
- 启用 `contextIsolation` 和 `sandbox`，禁用 `nodeIntegration`。

**评分维度**：
- 能说明主进程和渲染进程的职责（40%）
- 能说明 ipcMain / ipcRenderer 通信（30%）
- 能提到安全最佳实践（30%）

**常见错误**：
- 认为渲染进程可以直接访问所有 Node.js API。
- 混淆主进程和渲染进程的数量关系。
- 忽略 contextIsolation 导致安全问题。

**延伸追问**：
- 为什么 Electron 渲染进程默认不能访问 Node.js？
- 如何在 Electron 中实现文件拖拽读取？

**相关题目**：
- [FB-17-SE-A-014 Electron 安全](#FB-17-SE-A-014)
- [FB-17-CO-A-013 JSBridge 设计](#FB-17-CO-A-013)

**参考资源**：
- [Electron 官方文档 - Process Model](https://www.electronjs.org/docs/latest/tutorial/process-model)
- [Electron 官方文档 - IPC](https://www.electronjs.org/docs/latest/tutorial/ipc)

**口头回答版**：
> Electron 有主进程和渲染进程。主进程只有一个，负责创建窗口、访问系统 API；渲染进程每个窗口一个，负责 UI。它们通过 ipcMain 和 ipcRenderer 通信。渲染进程默认不能直接访问 Node.js，要用 preload 脚本通过 contextBridge 安全暴露能力。安全上建议开启 contextIsolation，禁用 nodeIntegration。


---

## 进阶题（8 道）{#advanced}

### FB-17-CO-A-008：Taro 和 UniApp 有什么异同？各自适合什么场景？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：Taro、UniApp、跨端框架、小程序、编译转换
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Taro 和 UniApp 的设计理念、技术栈、编译目标，并说明各自的适用场景。

**参考答案**：

Taro 和 UniApp 都是国内流行的跨端开发框架，目标是“一次编写，多端运行”。

| 维度 | Taro | UniApp |
|------|------|--------|
| 开发语言 / DSL | React / Vue / Vue3 / Nerv | Vue / Vue3（主推） |
| 编译目标 | 微信小程序、H5、RN、鸿蒙、百度/支付宝/字节等小程序 | H5、小程序、App（Hybrid/原生渲染）、快应用 |
| 设计思路 | 以 React/Vue 语法为主，编译到各端 | 以 Vue 语法为主，提供统一 API |
| 生态 | 京东系，插件丰富 | DCloud 系，市场模板多 |
| 性能 | 各端表现均衡 | App 端有原生渲染引擎（weex/uvue） |
| 学习成本 | 需会 React/Vue | 较低，类似 Vue 开发 |

Taro 适用场景：
- 团队熟悉 React/Vue。
- 需要同时支持小程序和 RN。
- 对代码可控性要求较高。

UniApp 适用场景：
- 团队熟悉 Vue，快速上线。
- 需要一套代码覆盖 H5 + 小程序 + App。
- 希望使用 DCloud 生态的云函数、插件市场。

最佳实践：
- 根据团队技术栈选型。
- 不要过度使用跨端能力，平台差异部分用条件编译处理。

**评分维度**：
- 能说明两者的技术栈差异（30%）
- 能说明编译目标差异（30%）
- 能给出适用场景建议（30%）
- 能提到条件编译（10%）

**常见错误**：
- 认为 Taro 只能编译到小程序。
- 认为 UniApp 和 Taro 使用的 DSL 完全相同。
- 忽略平台差异，盲目追求一套代码。

**延伸追问**：
- Taro 如何实现 React 代码编译到小程序？
- UniApp 的 App 端和 H5 端在渲染上有什么不同？

**相关题目**：
- [FB-17-CO-B-002 跨端方案分类](#FB-17-CO-B-002)
- [FB-17-FS-P-016 小程序渲染原理](#FB-17-FS-P-016)

**参考资源**：
- [Taro 官方文档](https://taro.zone/)
- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)

**口头回答版**：
> Taro 和 UniApp 都是国内跨端框架。Taro 支持 React 和 Vue，能编译到小程序、H5、RN 等；UniApp 主要基于 Vue，覆盖 H5、小程序、App。Taro 适合熟悉 React/Vue、需要小程序加 RN 的团队；UniApp 适合熟悉 Vue、想快速做 H5 小程序 App 的团队。平台差异部分建议用条件编译处理。

---

### FB-17-PE-A-009：小程序有哪些常见的性能优化手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：小程序、性能优化、setData、包体积、懒加载
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请从启动、渲染、运行时等方面，说明微信小程序的性能优化手段。

**参考答案**：

一、启动优化

1. **控制主包体积**：
   - 主包大小不超过 2MB（微信小程序限制）。
   - 使用分包加载、独立分包、分包预下载。

2. **代码优化**：
   - 移除无用代码，压缩 JS/WXML/WXSS。
   - 使用按需加载和懒加载组件。

3. **资源优化**：
   - 图片压缩、使用 CDN、雪碧图。
   - 字体图标替代图片。

二、渲染优化

1. **减少 setData 频率和数据量**：
   - 合并多次 setData。
   - 只传递变化的数据，避免全量更新。

2. **避免频繁创建对象**：
   - setData 数据尽量保持结构稳定。

3. **列表优化**：
   - 使用 `recycle-view` 或虚拟列表。
   - 稳定 key，避免用 index。

4. **减少节点层级**：
   - WXML 节点过多会影响渲染性能。

三、运行时优化

1. **按需请求数据**：
   - 分页加载、图片懒加载。

2. **合理使用缓存**：
   - Storage 缓存接口数据、用户配置。

3. **避免内存泄漏**：
   - 页面卸载时清理定时器、事件监听。

4. **使用 Skyline**：
   - 新渲染引擎可提升同层渲染和动画性能。

**评分维度**：
- 能从启动、渲染、运行时三个角度回答（30%）
- 能说明 setData 优化（30%）
- 能说明分包和包体积控制（20%）
- 能提到 Skyline 等新特性（20%）

**常见错误**：
- 每次数据变化都 setData 整个对象。
- 主包体积过大导致无法上传。
- 忽略页面卸载时的清理工作。

**延伸追问**：
- 分包加载和独立分包有什么区别？
- 如何定位小程序的启动耗时瓶颈？

**相关题目**：
- [FB-17-CO-B-003 小程序运行机制](#FB-17-CO-B-003)
- [FB-17-FS-P-016 小程序渲染原理](#FB-17-FS-P-016)

**参考资源**：
- [微信小程序性能优化](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/)
- [微信小程序分包加载](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)

**口头回答版**：
> 小程序性能优化分三块。启动上控制主包体积，用分包、压缩代码、图片优化。渲染上重点优化 setData，合并调用、只传变化的数据、避免频繁创建对象；列表用稳定 key，节点层级不要太深。运行时上按需请求、缓存数据、清理定时器，新引擎 Skyline 也能提升性能。

---

### FB-17-CO-A-010：小程序和 H5 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：小程序、H5、WebView、生态、能力
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比小程序和 H5 在运行环境、能力、开发体验、发布流程等方面的区别。

**参考答案**：

| 维度 | 小程序 | H5 |
|------|--------|-----|
| 运行环境 | App 提供的 JSRuntime + WebView | 浏览器 |
| 入口 | 搜索、扫码、分享、下拉 | URL |
| 能力 | 调用摄像头、蓝牙、支付、通讯录等原生能力 | 受浏览器安全限制 |
| 包体积 | 主包 2MB，总包 20MB | 无严格限制 |
| 发布审核 | 需要平台审核 | 直接部署 |
| 用户留存 | 可留存在聊天列表，便于召回 | 依赖收藏/历史记录 |
| 开发框架 | WXML/WXSS/JS，双线程 | HTML/CSS/JS，单线程 |
| SEO | 差 | 好 |

适用场景：
- 小程序：社交裂变、工具类、轻服务、需要调用原生能力。
- H5：营销活动、内容展示、需要搜索引擎流量。

最佳实践：
- 核心功能用小程序，营销传播用 H5。
- 统一设计规范和业务组件库。

**评分维度**：
- 能说明运行环境差异（25%）
- 能说明能力和入口差异（25%）
- 能说明发布和留存差异（25%）
- 能给出适用场景（25%）

**常见错误**：
- 认为小程序就是 H5。
- 认为小程序可以随意跳转任意外部链接。
- 忽略小程序的审核和包体积限制。

**延伸追问**：
- 小程序如何打开 H5 页面？
- H5 如何调用小程序能力？

**相关题目**：
- [FB-17-CO-B-003 小程序运行机制](#FB-17-CO-B-003)
- [FB-17-CO-A-011 Hybrid 应用](#FB-17-CO-A-011)

**参考资源**：
- [微信小程序官方文档 - 简介](https://developers.weixin.qq.com/miniprogram/dev/framework/)

**口头回答版**：
> 小程序和 H5 最大区别是运行环境：小程序在 App 提供的 JSRuntime 和 WebView 里跑，能调摄像头、支付等原生能力；H5 在浏览器里跑，能力受浏览器限制。小程序有包体积限制，发布要审核，但用户留存和社交分享更好；H5 更适合营销活动和 SEO。一般核心功能放小程序，传播活动放 H5。

---

### FB-17-CO-A-011：什么是 Hybrid App？它的核心问题是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：Hybrid、WebView、JSBridge、Native、H5
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Hybrid App 的概念，并说明其核心问题 JSBridge 的设计思路。

**参考答案**：

Hybrid App 是原生应用内嵌 WebView，通过 WebView 加载 H5 页面，实现部分或全部业务功能。典型代表是早期的 Cordova、PhoneGap，以及现在许多 App 中的 H5 页面。

核心组成：

- **Native 容器**：提供 WebView、原生能力、路由导航。
- **H5 页面**：使用 Web 技术开发业务界面。
- **JSBridge**：连接 H5 和 Native 的通信桥梁。

JSBridge 设计思路：

1. **H5 调用 Native**：
   - Android：通过 `WebView.addJavascriptInterface` 注入对象，或通过 URL Scheme / prompt 拦截。
   - iOS：通过 `WKWebView` 的 `WKScriptMessageHandler`，或 URL Scheme 拦截。

2. **Native 调用 H5**：
   - 通过 `WebView.evaluateJavascript` 执行 JS 代码。

3. **回调处理**：
   - 使用唯一 callbackId 关联调用和回调。
   - Native 执行完后通过 callbackId 回传结果。

示例流程：

```text
H5 -> JSBridge.call('getDeviceInfo', {}, cb)
JSBridge -> Native 拦截 -> 执行原生方法
Native -> JSBridge.callback(callbackId, result)
JSBridge -> 执行 H5 回调函数
```

核心问题：

- 通信异步，复杂调用链难以维护。
- WebView 性能瓶颈。
- 安全问题（JSBridge 暴露过多原生能力）。
- 版本兼容和降级处理。

**评分维度**：
- 能说明 Hybrid App 的组成（30%）
- 能说明 JSBridge 双向通信原理（40%）
- 能指出核心问题（30%）

**常见错误**：
- 认为 Hybrid App 就是纯 H5。
- 忽略 iOS 和 Android WebView 的差异。
- JSBridge 设计不考虑安全和回调管理。

**延伸追问**：
- 如何防止 JSBridge 被恶意调用？
- WebView 内存占用过大如何优化？

**相关题目**：
- [FB-17-CO-B-007 Electron 主进程和渲染进程](#FB-17-CO-B-007)
- [FB-17-CD-A-012 手写 JSBridge](#FB-17-CD-A-012)

**参考资源**：
- [Hybrid App 开发实践](https://juejin.cn/post/6844903512251736071)

**口头回答版**：
> Hybrid App 就是原生应用里嵌 WebView 跑 H5。核心是通过 JSBridge 让 H5 调原生能力。H5 调 Native 可以用 URL Scheme 拦截或注入对象；Native 调 H5 用 evaluateJavascript。JSBridge 要维护 callbackId 做回调，还要处理安全、异步、版本兼容这些问题。

---

### FB-17-CD-A-012：请手写一个简单的 JSBridge

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：JSBridge、Hybrid、JavaScript、Native、通信
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请手写一个简单的 JSBridge，支持 H5 调用 Native 方法并接收回调，Native 调用 H5 方法。

**参考答案**：

H5 端实现：

```js
(function () {
  const callbacks = {};
  let callbackId = 0;

  window.JSBridge = {
    call(method, params, callback) {
      const id = ++callbackId;
      callbacks[id] = callback;

      const message = JSON.stringify({ method, params, callbackId: id });

      // iOS WKWebView
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.jsBridge.postMessage(message);
      }
      // Android addJavascriptInterface
      else if (window.AndroidBridge && window.AndroidBridge.send) {
        window.AndroidBridge.send(message);
      }
      // URL Scheme fallback
      else {
        const iframe = document.createElement('iframe');
        iframe.src = `jsbridge://call?data=${encodeURIComponent(message)}`;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        setTimeout(() => iframe.remove(), 100);
      }
    },

    // 供 Native 调用，返回结果
    onCallback(id, result) {
      const cb = callbacks[id];
      if (cb) {
        cb(result);
        delete callbacks[id];
      }
    },

    // 供 Native 调用 H5 方法
    onNativeCall(method, params) {
      if (JSBridge.api[method]) {
        return JSBridge.api[method](params);
      }
    },

    api: {
      // H5 暴露给 Native 的方法
      getUserInfo() {
        return { name: 'Tom' };
      }
    }
  };
})();
```

Native 端伪代码（iOS）：

```swift
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    let body = message.body as! String
    let data = JSON.parse(body)
    let method = data["method"]
    let params = data["params"]
    let callbackId = data["callbackId"]

    let result = handleNativeMethod(method, params)

    let js = "JSBridge.onCallback(\(callbackId), \(JSON.stringify(result)))"
    webView.evaluateJavaScript(js, completionHandler: nil)
}
```

关键点：
- callbackId 唯一，回调后清理。
- 支持多种注入方式，做 fallback。
- 防止内存泄漏，限制回调超时。

**评分维度**：
- 能设计 callbackId 和回调映射（30%）
- 能写出 H5 调用 Native 的多种方式（30%）
- 能写出 Native 回调 H5 的方式（20%）
- 能考虑清理和 fallback（20%）

**常见错误**：
- 回调不清理导致内存泄漏。
- 不考虑 iOS/Android 差异。
- URL Scheme 编码错误。

**延伸追问**：
- 如果 Native 调用是异步的，回调怎么设计？
- 如何保证 JSBridge 调用的安全性？

**相关题目**：
- [FB-17-CO-A-011 Hybrid App 与 JSBridge](#FB-17-CO-A-011)
- [FB-17-SE-A-014 Electron 安全](#FB-17-SE-A-014)

**参考资源**：
- [JSBridge 实现原理](https://juejin.cn/post/6844903512251736071)

**口头回答版**：
> 手写 JSBridge 主要分 H5 端和 Native 端。H5 端维护一个 callbacks 对象，每次 call 生成唯一 callbackId，把 method、params、callbackId 拼成消息发给 Native。Native 执行完通过 JSBridge.onCallback 把结果和 callbackId 传回来，H5 找到对应回调执行并删除。要兼容 iOS 的 WKScriptMessageHandler、Android 的 addJavascriptInterface，以及 URL Scheme 兜底。

---

### FB-17-SE-A-013：Electron 应用有哪些安全注意事项？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：Electron、安全、contextIsolation、CSP、preload
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 桌面应用开发中的常见安全风险和最佳实践。

**参考答案**：

Electron 桌面应用的安全风险主要来自于渲染进程可以加载远程内容或执行不可信脚本。

最佳实践：

1. **禁用 nodeIntegration，启用 contextIsolation**：
   - 渲染进程默认不应能访问 Node.js。
   - `contextIsolation: true` 保证 preload 和页面 JS 上下文隔离。

2. **使用 preload + contextBridge**：
   - 只暴露必要的 API 给渲染进程。
   - 不要暴露完整 Node.js 模块。

3. **内容安全策略（CSP）**：
   - 限制脚本来源，防止 XSS。
   - 例如 `script-src 'self'`。

4. **不加载远程内容**：
   - 优先使用本地打包资源。
   - 必须加载远程内容时使用 `webview` 并做隔离。

5. **HTTPS**：
   - 所有网络请求使用 HTTPS。

6. **禁用 allowRunningInsecureContent**：
   - 防止 HTTPS 页面加载 HTTP 资源。

7. **及时更新 Electron**：
   - Electron 包含 Chromium 和 Node.js，需跟进安全更新。

8. **代码签名**：
   - Windows/macOS 使用证书签名，防止篡改。

**评分维度**：
- 能说明 contextIsolation 和 nodeIntegration（30%）
- 能说明 contextBridge 的安全暴露方式（25%）
- 能提到 CSP 和 HTTPS（25%）
- 能提到更新和签名（20%）

**常见错误**：
- 开启 nodeIntegration 并直接暴露所有 Node API。
- 忽略 contextIsolation 导致页面脚本访问 Node。
- 加载不可信远程内容。

**延伸追问**：
- 如果必须加载远程页面，如何降低风险？
- Electron 的 `sandbox` 模式有什么作用？

**相关题目**：
- [FB-17-CO-B-007 Electron 主进程和渲染进程](#FB-17-CO-B-007)
- [FB-17-CO-A-011 Hybrid App](#FB-17-CO-A-011)

**参考资源**：
- [Electron 安全最佳实践](https://www.electronjs.org/docs/latest/tutorial/security)

**口头回答版**：
> Electron 安全最重要的是隔离渲染进程。要禁用 nodeIntegration，开启 contextIsolation，通过 preload 的 contextBridge 只暴露必要 API。还要配 CSP 限制脚本来源，尽量不用远程内容，必须用就用 webview 隔离。所有请求走 HTTPS，及时升级 Electron，发布时做代码签名。

---

### FB-17-CO-A-014：鸿蒙 ArkTS / ArkUI 是什么？对跨端开发有什么影响？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：鸿蒙、ArkTS、ArkUI、HarmonyOS、跨端
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍鸿蒙 HarmonyOS 的 ArkTS 和 ArkUI，并说明它们对前端跨端开发的影响。

**参考答案**：

ArkTS 是华为基于 TypeScript 扩展的声明式开发语言，主要用于 HarmonyOS 应用开发。ArkUI 是鸿蒙的声明式 UI 开发框架。

核心特性：

- **声明式 UI**：类似 SwiftUI / Flutter / Vue 3，通过状态驱动 UI。
- **TypeScript 超集**：前端开发者学习成本低。
- **Stage 模型**：新的应用开发模型，强调组件化和Ability。
- **分布式能力**：支持跨设备流转、多端协同。
- **ArkUI-X**：支持跨设备、跨平台能力扩展。

对跨端开发的影响：

1. **新增目标平台**：
   - 鸿蒙成为继 iOS、Android、小程序之后的重要端。
   - Taro、UniApp 等框架开始支持编译到鸿蒙。

2. **技术栈趋同**：
   - ArkTS 接近 TS/JS，前端团队可快速切入。

3. **差异化能力**：
   - 鸿蒙的分布式、原子化服务是独特优势。

4. **生态挑战**：
   - 第三方库、UI 组件库需要重新适配。

**评分维度**：
- 能说明 ArkTS / ArkUI 的定位（40%）
- 能说明声明式 UI 和 Stage 模型（30%）
- 能分析对跨端开发的影响（30%）

**常见错误**：
- 认为 ArkTS 就是标准 TypeScript。
- 认为鸿蒙只能跑鸿蒙原生应用。
- 忽略鸿蒙的分布式能力。

**延伸追问**：
- ArkUI 和 Flutter 有什么异同？
- 现有 Vue/React 项目如何迁移到鸿蒙？

**相关题目**：
- [FB-17-CO-B-002 跨端方案分类](#FB-17-CO-B-002)
- [FB-17-SD-R-026 跨端组件库设计](#FB-17-SD-R-026)

**参考资源**：
- [HarmonyOS 开发者文档](https://developer.harmonyos.com/)
- [ArkTS 语言指南](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-get-started-0000001454080613-V3)

**口头回答版**：
> 鸿蒙的 ArkTS 是基于 TypeScript 扩展的声明式开发语言，ArkUI 是声明式 UI 框架，接近 Vue 3 / Flutter 的风格。它对跨端开发的影响是多了一个重要目标平台，Taro、UniApp 都开始支持编译到鸿蒙；前端团队因为熟悉 TS 能更快上手；同时鸿蒙的分布式能力也是独特优势。

---

### FB-17-SC-A-015：跨端技术选型时应该考虑哪些因素？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、技术选型、决策、业务场景
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
假设你要为一个新业务选择跨端技术方案，请说明你会考虑哪些因素，并给出一个决策思路。

**参考答案**：

选型考虑因素：

1. **业务需求**：
   - 需要覆盖哪些平台？iOS/Android/Web/小程序/桌面端？
   - 对性能、体验的要求有多高？
   - 是否需要调用特殊原生能力？

2. **团队能力**：
   - 团队熟悉 React、Vue 还是 Flutter/Dart？
   - 是否有原生开发资源？

3. **生态成熟度**：
   - 第三方库、UI 组件、社区活跃度。
   - 框架更新频率和稳定性。

4. **性能和包体积**：
   - 启动速度、页面流畅度。
   - App 包大小限制。

5. **发布和运维**：
   - 热更新能力。
   - 平台审核要求。
   - 灰度、监控、错误上报。

6. **长期可维护性**：
   - 框架生命力、迁移成本。
   - 是否有大厂背书。

决策思路示例：

```text
ToC 电商 App：
- 需 iOS/Android + 小程序 + H5
- 优先 Flutter 或 React Native 做 App，Taro/UniApp 做小程序和 H5
- 公共业务逻辑下沉到 Monorepo 共享
```

```text
企业内部工具：
- 需 iOS/Android/桌面端
- 可选 Electron + WebView，或 Tauri
```

**评分维度**：
- 能从业务、团队、生态、性能、发布、维护等维度分析（50%）
- 能给出具体场景的决策示例（30%）
- 能提到风险 trade-off（20%）

**常见错误**：
- 只看技术热度，忽略团队能力和业务需求。
- 追求一套代码覆盖所有平台，忽视平台差异。
- 忽略长期维护成本。

**延伸追问**：
- 如果业务只需要小程序和 H5，你会怎么选？
- 如何在项目中期切换跨端框架？

**相关题目**：
- [FB-17-CO-B-001 跨端开发优缺点](#FB-17-CO-B-001)
- [FB-17-SD-R-024 大型跨端应用架构](#FB-17-SD-R-024)

**参考资源**：
- [跨端技术选型方法论](https://juejin.cn/post/6844903840885604360)

**口头回答版**：
> 跨端选型我会先看业务要覆盖哪些平台、对性能和原生能力的要求，再看团队技术栈，然后评估生态成熟度、包体积、热更新、长期维护。比如 ToC 电商要 iOS、Android、小程序、H5，可能 App 用 Flutter 或 RN，小程序 H5 用 Taro/UniApp。不能只看热度，要平衡开发效率和体验。


---

## 深入题（8 道）{#proficient}

### FB-17-FS-P-016：小程序的底层渲染原理是什么？Skyline 和 WebView 渲染有什么区别？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：小程序、渲染原理、Skyline、WebView、Exparser
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明微信小程序的底层渲染原理，并对比 WebView 渲染和 Skyline 渲染引擎的差异。

**参考答案**：

小程序底层渲染流程：

1. **Exparser 框架**：
   - 微信自研组件框架，负责将 WXML/WXSS 解析为自定义组件树。

2. **逻辑层执行**：
   - JS 在 JSCore 中运行，生成页面数据。

3. **setData 通信**：
   - 数据变化通过 Native 层桥接到渲染层。

4. **渲染层绘制**：
   - 渲染层根据数据更新虚拟 DOM，最终通过 WebView 绘制。

WebView 渲染：

- 页面运行在 WebView 中。
- 使用浏览器内核解析 HTML/CSS/JS。
- 同层渲染能力有限，复杂动画性能受限。

Skyline 渲染引擎（微信新渲染引擎）：

- 不依赖 WebView，使用自研渲染管线。
- 支持更原生的动画和手势。
- 减少逻辑层和渲染层通信开销。
- 对 WXML/WXSS 的支持有差异，需要适配。

对比：

| 维度 | WebView 渲染 | Skyline 渲染 |
|------|-------------|--------------|
| 运行环境 | WebView | 自研渲染引擎 |
| 动画性能 | 一般 | 更强 |
| 启动速度 | 受 WebView 初始化影响 | 更快 |
| 兼容性 | 最好 | 部分特性需适配 |
| 包体积 | 无额外增加 | 可能增加 |

**评分维度**：
- 能说明小程序渲染流程（30%）
- 能说明 Exparser 和 setData 的作用（30%）
- 能对比 WebView 和 Skyline（30%）
- 能提到适配成本（10%）

**常见错误**：
- 认为小程序直接用浏览器内核渲染。
- 认为 Skyline 完全兼容所有 WebView 特性。
- 忽略同层渲染限制。

**延伸追问**：
- 小程序如何实现 video 组件的同层渲染？
- Skyline 对 CSS 的支持程度如何？

**相关题目**：
- [FB-17-CO-B-003 小程序运行机制](#FB-17-CO-B-003)
- [FB-17-PE-A-009 小程序性能优化](#FB-17-PE-A-009)

**参考资源**：
- [微信小程序 Skyline 介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/introduction.html)
- [小程序 Exparser 框架解析](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/)

**口头回答版**：
> 小程序底层有 Exparser 把 WXML/WXSS 解析成组件树，逻辑层在 JSCore 跑，数据变化通过 setData 传到渲染层，最后 WebView 绘制。Skyline 是微信新渲染引擎，不依赖 WebView，动画性能更好、启动更快，但部分特性要适配。目前 WebView 兼容性最好，Skyline 适合对动画和性能要求高的页面。

---

### FB-17-FS-P-017：React Native 新架构（New Architecture）解决了什么问题？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：React Native、New Architecture、JSI、Fabric、TurboModules、Hermes
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请介绍 React Native 新架构的核心组成部分，并说明它相比旧架构解决了什么问题。

**参考答案**：

React Native 新架构主要解决旧架构 Bridge 异步通信带来的性能瓶颈和类型安全问题。

核心组成：

1. **JSI（JavaScript Interface）**：
   - 允许 JS 直接持有 C++ 对象引用。
   - 支持同步调用，突破 Bridge 的异步限制。
   - 使用 C++ 共享层，统一 iOS/Android 实现。

2. **Fabric**：
   - 新渲染器。
   - 支持同步布局、优先级渲染、更好的并发处理。
   - 渲染流程更贴近现代 React 架构。

3. **TurboModules**：
   - 新原生模块系统。
   - 使用类型安全的 C++ 接口定义模块。
   - 按需加载原生模块，启动更快。

4. **Hermes**：
   - Facebook 自研 JS 引擎。
   - 支持字节码预编译，启动速度更快。
   - 内存占用更低，适合移动端。

5. **Codegen**：
   - 根据 TypeScript / Flow 类型定义自动生成 JSI/TurboModules 绑定代码。

解决的问题：

| 旧架构问题 | 新架构方案 |
|-----------|-----------|
| Bridge 异步 JSON 序列化，通信慢 | JSI 同步直接调用 |
| 模块启动时全部加载 | TurboModules 按需加载 |
| 布局异步，可能掉帧 | Fabric 同步布局 |
| 类型不安全 | Codegen 自动生成类型绑定 |
| JS 引擎启动慢 | Hermes 字节码预编译 |

**评分维度**：
- 能说明 JSI 的核心作用（30%）
- 能说明 Fabric 和 TurboModules（30%）
- 能说明 Hermes 和 Codegen（20%）
- 能对比新旧架构差异（20%）

**常见错误**：
- 认为新架构只是换了 JS 引擎。
- 认为 JSI 等同于 Bridge 的替代品但功能相同。
- 忽略 Codegen 的作用。

**延伸追问**：
- 新架构对现有 RN 项目升级有哪些影响？
- Fabric 和 Yoga 布局引擎是什么关系？

**相关题目**：
- [FB-17-CO-B-005 React Native 基本原理](#FB-17-CO-B-005)
- [FB-17-FS-P-018 Flutter 渲染管线](#FB-17-FS-P-018)

**参考资源**：
- [React Native 新架构官方文档](https://reactnative.dev/docs/the-new-architecture/why)
- [JSI 介绍](https://reactnative.dev/docs/architecture-glossary#javascript-interface-jsi)

**口头回答版**：
> React Native 新架构主要解决旧架构 Bridge 异步通信慢的问题。核心有 JSI，让 JS 能直接持有 C++ 对象引用，支持同步调用；Fabric 是新渲染器，支持同步布局；TurboModules 是按需加载的原生模块系统；Hermes 是预编译字节码的 JS 引擎，启动更快；Codegen 根据类型自动生成绑定代码。整体性能、类型安全和启动速度都有提升。

---

### FB-17-FS-P-018：Flutter 的渲染管线是怎样的？三棵树分别负责什么？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：Flutter、渲染管线、Widget、Element、RenderObject
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请详细说明 Flutter 的渲染管线，以及 Widget Tree、Element Tree、RenderObject Tree 三棵树的职责。

**参考答案**：

Flutter 渲染管线：

```text
Widget Tree -> Element Tree -> RenderObject Tree -> Layer Tree -> Skia -> GPU
```

1. **Widget Tree**：
   - 描述 UI 的配置信息。
   - Widget 是不可变的，状态变化会重建 Widget Tree。
   - 轻量，创建和销毁成本低。

2. **Element Tree**：
   - 连接 Widget Tree 和 RenderObject Tree。
   - 管理 Widget 的生命周期，维护状态。
   - 状态变化时复用 Element，更新子树。

3. **RenderObject Tree**：
   - 负责布局（layout）和绘制（paint）。
   - 每个 RenderObject 有大小、位置、绘制指令。
   - 处理约束（constraints）和尺寸（size）。

渲染流程：

1. **Build 阶段**：
   - 根据状态生成 Widget Tree，创建或更新 Element Tree。

2. **Layout 阶段**：
   - RenderObject 自顶向下传递约束，自底向上返回尺寸。

3. **Paint 阶段**：
   - RenderObject 将绘制指令记录到 Layer。

4. **Rasterization 阶段**：
   - Skia 将 Layer 合成并提交到 GPU 渲染。

关键概念：

- **Constraints go down, sizes go up**：约束向下传，尺寸向上回。
- **Repaint Boundary**：通过 `RepaintBoundary` 减少重绘范围。
- **Layer**：缓存绘制结果，支持复杂合成。

**评分维度**：
- 能说明三棵树的职责（40%）
- 能说明渲染管线各阶段（30%）
- 能提到 layout 约束和 paint 边界（20%）
- 能说明 Skia 的作用（10%）

**常见错误**：
- 认为 Widget Tree 直接负责绘制。
- 混淆 Element 和 RenderObject 的职责。
- 认为 Flutter 使用原生组件。

**延伸追问**：
- 为什么 Flutter 的 Widget 要设计为不可变？
- 如何优化 Flutter 长列表的渲染性能？

**相关题目**：
- [FB-17-CO-B-006 Flutter 基本原理](#FB-17-CO-B-006)
- [FB-17-FS-P-019 Flutter 状态管理](#FB-17-FS-P-019)

**参考资源**：
- [Flutter 官方文档 - Inside Flutter](https://docs.flutter.dev/resources/inside-flutter)
- [Flutter 渲染流程解析](https://book.flutterchina.club/chapter14/flutter_app_startup.html)

**口头回答版**：
> Flutter 渲染管线是 Widget -> Element -> RenderObject -> Layer -> Skia -> GPU。Widget Tree 是 UI 配置，不可变；Element Tree 管理生命周期和状态，连接 Widget 和 RenderObject；RenderObject Tree 负责布局和绘制。布局阶段约束向下传、尺寸向上回，绘制阶段记录到 Layer，最后 Skia 合成提交 GPU。

---

### FB-17-CO-P-019：Flutter 中常见的状态管理方案有哪些？如何选择？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：Flutter、状态管理、Provider、Riverpod、Bloc、GetX
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 Flutter 中常见的状态管理方案，并说明它们的适用场景和选型建议。

**参考答案**：

Flutter 状态管理方案：

| 方案 | 特点 | 适用场景 |
|------|------|---------|
| **setState** | 最基础，适合局部状态 | 简单 Widget 内部状态 |
| **InheritedWidget** | 跨组件传递数据，Flutter 内置 | 小型应用、主题/语言 |
| **Provider** | 基于 InheritedWidget，API 友好 | 中小型项目 |
| **Riverpod** | Provider 作者新作，编译安全，支持异步 | 中大型项目 |
| **Bloc / Cubit** | 基于事件流，强调可预测性 | 复杂业务逻辑 |
| **GetX** | 功能全面但侵入性强 | 快速开发，但大型项目谨慎 |
| **MobX / Redux** | 成熟方案，生态丰富 | 有对应经验的团队 |

选型建议：

- **简单页面**：setState。
- **跨组件共享少量状态**：Provider。
- **中大型项目、需要类型安全**：Riverpod。
- **复杂状态机、强调测试和可维护性**：Bloc。
- **避免滥用 GetX**，可能导致代码难以测试。

Provider 示例：

```dart
class Counter with ChangeNotifier {
  int _count = 0;
  int get count => _count;
  void increment() {
    _count++;
    notifyListeners();
  }
}

ChangeNotifierProvider(
  create: (_) => Counter(),
  child: MyApp(),
);
```

**评分维度**：
- 能列举 4 种以上状态管理方案（30%）
- 能对比各自特点（30%）
- 能给出选型建议（30%）
- 能写出 Provider 基本用法（10%）

**常见错误**：
- 所有页面都使用 BloC，过度设计。
- 认为 Provider 和 Riverpod 完全相同。
- 在 setState 中处理全局状态。

**延伸追问**：
- Riverpod 相比 Provider 有什么本质改进？
- Bloc 中的 Stream 如何处理内存泄漏？

**相关题目**：
- [FB-17-CO-B-006 Flutter 基本原理](#FB-17-CO-B-006)
- [FB-17-SD-R-025 大型跨端应用状态设计](#FB-17-SD-R-025)

**参考资源**：
- [Flutter 官方文档 - State Management](https://docs.flutter.dev/data-and-backend/state-mgmt)
- [Riverpod 官方文档](https://riverpod.dev/)

**口头回答版**：
> Flutter 状态管理方案很多：简单用 setState；跨组件少量状态用 Provider；中大型项目推荐 Riverpod，类型更安全；复杂业务逻辑和状态机用 Bloc；GetX 功能全但侵入性强，大项目慎用。选型看项目规模和团队熟悉度，不要过度设计。

---

### FB-17-PE-P-020：跨端动画性能如何保证一致性？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：跨端、动画、性能、一致性、60fps
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在跨端开发中，如何保证动画在不同平台/框架上的性能和一致性。

**参考答案**：

跨端动画挑战：

- 不同平台渲染机制不同（WebView、原生组件、自绘引擎）。
- 帧率、手势响应、合成方式存在差异。
- 低端设备上容易掉帧。

保证一致性的策略：

1. **选择合适的动画实现方式**：
   - 小程序：优先使用 CSS 动画，复杂动画用 Lottie 或逐帧。
   - React Native：使用 Animated API、React Native Reanimated。
   - Flutter：使用 AnimationController、Tween，动画在 UI 线程运行。
   - Web/H5：优先使用 transform 和 opacity，触发 GPU 加速。

2. **避免布局抖动**：
   - 动画只修改 transform、opacity，避免触发 layout 和 paint。

3. **使用 Lottie / Rive**：
   - 复杂矢量动画跨平台一致渲染。
   - 但包体积和运行时性能需评估。

4. **降级策略**：
   - 低端设备关闭复杂动画。
   - 提供静态占位或简化版动画。

5. **性能监控**：
   - 使用平台性能工具监控 FPS。
   - 建立帧率基线。

6. **统一设计规范**：
   - 设计稿明确动画时长、缓动曲线。
   - 各端按统一规范实现。

**评分维度**：
- 能说明不同端动画实现差异（30%）
- 能说明避免布局抖动的原则（25%）
- 能提到 Lottie/Rive 等跨平台动画方案（20%）
- 能提到降级和监控（25%）

**常见错误**：
- 所有端强制使用同一动画库。
- 动画触发频繁 layout 导致掉帧。
- 忽略低端设备适配。

**延伸追问**：
- 小程序中 CSS 动画和 canvas 动画如何选择？
- Flutter 的 Reanimated 和原生 Animated 有什么区别？

**相关题目**：
- [FB-17-PE-A-009 小程序性能优化](#FB-17-PE-A-009)
- [FB-17-FS-P-018 Flutter 渲染管线](#FB-17-FS-P-018)

**参考资源**：
- [Lottie 官方文档](https://airbnb.io/lottie/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

**口头回答版**：
> 跨端动画要保证性能和一致性，首先要按平台选实现：小程序用 CSS 动画，RN 用 Animated 或 Reanimated，Flutter 用 AnimationController，H5 用 transform 和 opacity 触发 GPU。动画尽量只改 transform 和 opacity，避免 layout。复杂动画可以用 Lottie 统一，但要看包体积。低端设备做降级，还要监控 FPS。

---

### FB-17-SC-P-021：跨端应用如何做好路由管理和深层链接（Deep Link）？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：跨端、路由、Deep Link、Universal Link、导航
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在跨端应用中，如何设计统一的路由管理体系，并支持 Deep Link / Universal Link 跳转到指定页面。

**参考答案**：

跨端路由管理挑战：

- 不同平台路由实现不同（小程序页面栈、RN Navigation、Flutter Navigator、Web URL）。
- 需要统一路由配置和参数规范。
- Deep Link 需要处理 App 未启动和已启动两种情况。

设计方案：

1. **统一路由表**：
   - 定义平台无关的路由名和参数协议。
   - 各平台根据路由名映射到具体页面。

2. **路由中间层**：
   - 封装 `navigator.push('/product', { id: 123 })`。
   - 内部根据当前平台调用对应实现。

3. **参数序列化**：
   - Web/Deep Link 使用 query string。
   - Native 使用 route arguments。
   - 小程序使用页面参数。

4. **Deep Link 处理**：
   - iOS：Universal Link / URL Scheme。
   - Android：App Links / URL Scheme。
   - 小程序：通过分享卡片、二维码、公众号菜单跳转。
   - H5：标准 URL。

5. **路由守卫**：
   - 跳转前校验登录、权限。
   - 统一处理错误页、降级页。

示例：

```js
// 统一路由 API
navigator.push('product', { id: 123 });

// 内部映射
const routeMap = {
  product: {
    h5: '/product.html?id={id}',
    mini: '/pages/product/index?id={id}',
    app: 'ProductPage?id={id}'
  }
};
```

**评分维度**：
- 能说明统一路由表和中间层（30%）
- 能说明不同平台 Deep Link 方案（30%）
- 能说明参数序列化和路由守卫（20%）
- 能给出示例（20%）

**常见错误**：
- 各端路由硬编码，无法统一管理。
- Deep Link 只处理 App 启动状态。
- 忽略参数类型转换和校验。

**延伸追问**：
- 小程序页面栈超过 10 层怎么办？
- 如何在 Deep Link 中传递复杂对象？

**相关题目**：
- [FB-17-CO-A-015 跨端技术选型](#FB-17-CO-A-015)
- [FB-17-SD-R-024 大型跨端应用架构](#FB-17-SD-R-024)

**参考资源**：
- [React Navigation Deep Linking](https://reactnavigation.org/docs/deep-linking/)
- [Flutter Deep Linking](https://docs.flutter.dev/development/ui/navigation/deep-linking)

**口头回答版**：
> 跨端路由要建统一路由表，定义平台无关的路由名和参数，然后封装一个 navigator 中间层，根据当前平台调用具体实现。Deep Link 各平台不一样：iOS 用 Universal Link，Android 用 App Links，小程序用页面参数，H5 用 URL。还要做路由守卫处理登录权限，以及冷启动和热启动都要能正确跳转。

---

### FB-17-SC-P-022：如何为 React Native / Flutter / Electron 开发原生模块？

**题型**：场景设计题 / 手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：React Native、Flutter、Electron、原生模块、Native Module
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明在 React Native、Flutter、Electron 中扩展原生能力的思路，并简述实现方式。

**参考答案**：

一、React Native 原生模块

旧架构：

```java
// Android
@ReactMethod
public void getDeviceInfo(Promise promise) {
  WritableMap map = Arguments.createMap();
  map.putString("brand", Build.BRAND);
  promise.resolve(map);
}
```

```objc
// iOS
RCT_EXPORT_METHOD(getDeviceInfo:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(@{@"brand": [[UIDevice currentDevice] model]});
}
```

新架构（TurboModules）：
- 使用 TypeScript 定义接口。
- Codegen 生成 C++ / Java / ObjC 绑定。
- 实现 TurboModule 接口。

二、Flutter 原生插件

```kotlin
// Android
class DeviceInfoPlugin : FlutterPlugin, MethodCallHandler {
  override fun onMethodCall(call: MethodCall, result: Result) {
    when (call.method) {
      "getDeviceInfo" -> result.success(mapOf("brand" to Build.BRAND))
      else -> result.notImplemented()
    }
  }
}
```

```dart
// Dart 端
class DeviceInfo {
  static const platform = MethodChannel('device_info');
  static Future getDeviceInfo() async {
    return await platform.invokeMethod('getDeviceInfo');
  }
}
```

三、Electron 原生能力

- Electron 主进程可直接使用 Node.js 和系统 API。
- 渲染进程通过 IPC 调用主进程能力。
- 复杂原生功能可用 Node-API 调用 C++ 插件。

```js
// main process
ipcMain.handle('get-device-info', () => {
  return { platform: process.platform };
});

// renderer
const info = await ipcRenderer.invoke('get-device-info');
```

**评分维度**：
- 能说明 RN 原生模块实现（30%）
- 能说明 Flutter MethodChannel（30%）
- 能说明 Electron IPC 调用原生能力（20%）
- 能提到新架构 TurboModules / Codegen（20%）

**常见错误**：
- 在 UI 线程执行耗时原生操作。
- 忽略错误处理和平台差异。
- 原生模块 API 设计不一致。

**延伸追问**：
- 原生模块如何实现事件流（EventEmitter / EventChannel）？
- 原生模块如何调试和测试？

**相关题目**：
- [FB-17-CO-B-005 React Native 基本原理](#FB-17-CO-B-005)
- [FB-17-CO-B-006 Flutter 基本原理](#FB-17-CO-B-006)

**参考资源**：
- [React Native Native Modules](https://reactnative.dev/docs/native-modules-intro)
- [Flutter Platform Channels](https://docs.flutter.dev/platform/platform-channels)
- [Electron IPC](https://www.electronjs.org/docs/latest/tutorial/ipc)

**口头回答版**：
> RN 扩展原生能力写 Native Module，旧架构用 RCT_EXPORT_METHOD 或 @ReactMethod，新架构用 TurboModules 加 Codegen 生成绑定。Flutter 用 MethodChannel，Dart 端调 invokeMethod，原生端实现 MethodCallHandler。Electron 最简单，主进程直接调 Node.js 和系统 API，渲染进程通过 IPC 调用。耗时操作要放子线程，注意错误处理。

---

### FB-17-SC-P-023：跨端应用如何适配不同屏幕尺寸、安全区和暗黑模式？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：跨端、适配、屏幕尺寸、安全区、暗黑模式、响应式
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明跨端应用在不同平台下，如何做好屏幕尺寸、安全区、暗黑模式的统一适配。

**参考答案**：

一、屏幕尺寸适配

1. **相对单位**：
   - 小程序/H5：使用 rpx / rem / vw / vh。
   - RN：使用 PixelRatio、Dimensions。
   - Flutter：使用 MediaQuery、LayoutBuilder、Flexible。

2. **断点设计**：
   - 定义手机、平板、折叠屏、桌面端的断点。
   - 不同尺寸使用不同布局。

3. **组件响应式**：
   - 使用 Grid、Flex 布局。
   - 避免写死宽高。

二、安全区适配

- 获取设备安全区信息：
  - 小程序：`safe-area-inset-bottom` 等 CSS env。
  - RN：`SafeAreaView`、`react-native-safe-area-context`。
  - Flutter：`SafeArea` Widget。
  - H5：`env(safe-area-inset-*)`。

- 底部固定按钮、TabBar 留出安全区高度。

三、暗黑模式适配

1. **设计 Token**：
   - 定义颜色变量，支持 light/dark 两套值。

2. **媒体查询 / 系统监听**：
   - H5/小程序：`prefers-color-scheme`。
   - RN：`useColorScheme`。
   - Flutter：`ThemeMode` + `MediaQuery.platformBrightness`。

3. **图片和图标**：
   - 提供两套资源或使用矢量图标。

4. **统一主题系统**：
   - 各端共享 Design Token。
   - 通过配置文件或主题上下文注入。

**评分维度**：
- 能说明屏幕尺寸适配方案（30%）
- 能说明安全区适配方案（30%）
- 能说明暗黑模式适配方案（30%）
- 能提到 Design Token（10%）

**常见错误**：
- 写死 px 单位导致不同设备显示异常。
- 忽略刘海屏、灵动岛、底部手势条。
- 暗黑模式只改背景色，忽略文字、边框、图标。

**延伸追问**：
- 如何在小程序中实现主题切换？
- 折叠屏展开态如何适配？

**相关题目**：
- [FB-17-SD-R-026 跨端组件库设计](#FB-17-SD-R-026)
- [FB-17-CO-A-008 Taro 与 UniApp](#FB-17-CO-A-008)

**参考资源**：
- [Flutter 响应式布局](https://docs.flutter.dev/ui/layout/responsive)
- [iOS 安全区适配](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)

**口头回答版**：
> 跨端适配屏幕尺寸要用相对单位，比如小程序的 rpx、RN 的 PixelRatio、Flutter 的 MediaQuery，避免写死宽高；安全区用各自平台 API 获取，比如小程序的 env、RN 的 SafeAreaView、Flutter 的 SafeArea。暗黑模式建议用 Design Token 定义两套颜色，监听系统主题变化，图片图标也准备两套或矢量图。


---

## 架构题（7 道）{#architect}

### FB-17-SD-R-024：如何设计一个大型跨端应用的架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、架构设计、Monorepo、业务层、共享层
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请从代码组织、业务复用、构建发布、性能监控等方面，说明如何设计一个支持多平台的大型跨端应用架构。

**参考答案**：

一、代码组织

推荐 Monorepo 结构：

```text
packages/
├── core/           # 跨端共享：网络、存储、埋点、错误监控、业务逻辑
├── ui-kit/         # 跨端 UI 组件库
├── utils/          # 工具函数
├── app-rn/         # React Native App
├── app-flutter/    # Flutter App
├── app-mini/       # 小程序
├── app-h5/         # H5
└── app-electron/   # 桌面端
```

二、业务复用

1. **共享业务逻辑**：
   - 使用 TypeScript 编写平台无关的业务逻辑。
   - 通过 Monorepo 或私有 npm 包共享。

2. **共享网络层**：
   - 统一封装请求、拦截器、缓存、错误处理。
   - 各端适配底层网络 API。

3. **共享数据层**：
   - 统一数据模型、状态管理规范。
   - 使用 RxJS、Riverpod、Redux Toolkit 等。

三、构建与发布

- 统一 CI/CD 流水线，按平台触发构建。
- 产物隔离，独立版本管理。
- 热更新策略：RN CodePush、小程序云开发、Flutter 动态化方案。

四、性能监控

- 统一埋点和错误上报 SDK。
- 启动耗时、FPS、内存、Crash 率监控。
- 灰度发布和回滚机制。

五、工程化

- TypeScript 全量覆盖。
- 统一 ESLint、Prettier、Commit 规范。
- 自动化测试：单元测试、E2E、视觉回归。

**评分维度**：
- 能设计 Monorepo 分层结构（30%）
- 能说明业务复用和共享层（25%）
- 能说明构建发布和热更新（20%）
- 能说明性能监控和工程化（25%）

**常见错误**：
- 所有代码写在一个仓库，没有平台隔离。
- 共享代码过度依赖平台 API。
- 忽略各端构建和发布差异。

**延伸追问**：
- 如何处理共享代码中的平台差异？
- 跨端 Monorepo 如何选择构建工具？

**相关题目**：
- [FB-17-CO-A-015 跨端技术选型](#FB-17-CO-A-015)
- [FB-17-SD-R-026 跨端组件库设计](#FB-17-SD-R-026)

**参考资源**：
- [Monorepo 工具对比](https://monorepo.tools/)
- [Taro 官方文档 - 多端开发](https://taro.zone/)

**口头回答版**：
> 大型跨端应用我建议用 Monorepo，把共享业务逻辑、UI 组件、工具函数抽成独立包，各端 app 独立目录。核心层写平台无关代码，网络、存储、埋点统一封装，各端做适配。CI/CD 按平台触发构建，配合热更新和灰度。监控启动耗时、FPS、Crash 率。工程化上全 TS、统一规范、自动化测试。

---

### FB-17-SD-R-025：跨端应用的数据层和状态共享如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、数据层、状态共享、Repository、缓存
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个跨端应用的数据层，使其在小程序、H5、RN、Flutter 等端之间共享业务数据和状态。

**参考答案**：

设计原则：

1. **平台无关的数据层**：
   - 使用 TypeScript 或 Dart 编写业务模型、Repository、Service。
   - 将平台相关操作抽象成接口，由各端实现。

2. **统一数据模型**：
   - 定义跨端一致的 Entity / DTO。
   - 统一序列化和反序列化规则。

3. **Repository 模式**：
   - 数据来源（网络、缓存、本地存储）对上层透明。
   - 支持缓存策略、过期刷新、离线优先。

4. **状态管理分层**：
   - 全局状态：用户、权限、配置。
   - 模块状态：购物车、订单列表。
   - 局部状态：页面级 UI。

5. **跨端同步机制**：
   - 使用事件总线或消息通道同步关键状态。
   - 小程序和 H5 可通过 Storage + 事件通知同步。

架构示例：

```text
Data Layer
├── Network Adapter（各端实现：fetch / axios / dio / httpClient）
├── Storage Adapter（localStorage / mmkv / shared_preferences）
├── Cache Manager
├── Repository（UserRepo / OrderRepo）
└── State Manager（Redux / Riverpod / Pinia）
```

**评分维度**：
- 能说明平台无关数据层设计（30%）
- 能说明 Repository 模式和缓存策略（25%）
- 能说明状态分层（25%）
- 能说明跨端同步机制（20%）

**常见错误**：
- 各端各自维护数据模型，导致不一致。
- 状态管理滥用，所有状态都放全局。
- 忽略离线场景和缓存失效。

**延伸追问**：
- 小程序和 H5 如何共享登录状态？
- 跨端数据层如何处理版本兼容？

**相关题目**：
- [FB-17-SD-R-024 大型跨端应用架构](#FB-17-SD-R-024)
- [FB-17-CO-A-011 Hybrid App](#FB-17-CO-A-011)

**参考资源**：
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

**口头回答版**：
> 跨端数据层要把平台相关操作抽象成接口，各端实现网络、存储适配器。业务模型、Repository、Service 写平台无关代码。Repository 对上层隐藏数据来源，支持缓存和离线。状态分全局、模块、局部三层。跨端同步可以用事件总线或 Storage 事件，比如小程序和 H5 共享登录态。

---

### FB-17-SD-R-026：如何设计一个跨端组件库？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、组件库、设计系统、可扩展性、一致性
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何设计一个同时支持小程序、H5、RN、Flutter 等平台的跨端组件库。

**参考答案**：

一、设计原则

1. **统一 Design Token**：
   - 颜色、字体、间距、圆角、阴影等跨平台一致。
   - 支持主题定制和暗黑模式。

2. **抽象公共 API**：
   - 组件 Props、Events、Slots 在各平台语义一致。

3. **平台适配层**：
   - 公共逻辑放在 core。
   - 各平台实现具体渲染（Taro、React Native、Flutter Widget）。

二、技术方案

1. **Taro / UniApp 组件**：
   - 一套代码编译到小程序和 H5。
   - 适合 Web 容器类平台。

2. **React Native 组件**：
   - 基于 React Native 原生组件封装。

3. **Flutter Widget**：
   - 基于 Flutter 自绘能力实现。

4. **Monorepo 组织**：

```text
packages/
├── core/           # 公共逻辑、类型、样式变量
├── components-taro/   # Taro 实现
├── components-rn/     # RN 实现
├── components-flutter/ # Flutter 实现
└── theme/             # Design Token
```

三、测试与文档

- 各平台独立测试：单元测试、真机测试。
- Storybook / 小程序组件示例 / Flutter Gallery。
- 统一的 API 文档和视觉规范。

四、发布

- 各平台独立发版，版本统一对齐。
- 使用 Changesets 管理版本。

**评分维度**：
- 能说明统一 Design Token 和 API（30%）
- 能说明平台适配层设计（30%）
- 能说明 Monorepo 组织方式（20%）
- 能提到测试和文档（20%）

**常见错误**：
- 试图用一套代码覆盖所有平台，忽略平台差异。
- 组件 API 各平台不一致。
- 忽略各端渲染性能差异。

**延伸追问**：
- 如何处理小程序和 H5 的样式差异？
- 跨端组件库如何保证视觉一致性？

**相关题目**：
- [FB-17-SD-R-024 大型跨端应用架构](#FB-17-SD-R-024)
- [FB-17-SC-P-023 屏幕适配](#FB-17-SC-P-023)

**参考资源**：
- [Ant Design Mobile 跨端实践](https://mobile.ant.design/)
- [Taro UI 设计](https://taro-ui.jd.com/)

**口头回答版**：
> 跨端组件库先统一 Design Token 和组件 API，再把公共逻辑抽到 core 包，各平台写具体渲染实现，比如 Taro 负责小程序 H5，RN 和 Flutter 各自实现。用 Monorepo 管理，各端独立发版但版本对齐。测试要在各端真机跑，文档统一。不要妄图一套代码完全覆盖所有平台差异。

---

### FB-17-SD-R-027：跨端应用的性能监控和错误处理如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、性能监控、错误处理、APM、埋点
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个跨端应用的性能监控和错误处理体系，覆盖小程序、H5、RN、Flutter 等平台。

**参考答案**：

一、性能监控

1. **通用指标**：
   - 启动耗时（冷启动、热启动）。
   - 页面加载时间。
   - FPS / 卡顿率。
   - 内存占用、CPU 使用率。
   - 网络请求耗时和成功率。

2. **平台特有指标**：
   - 小程序：setData 耗时、包体积、首屏时间。
   - RN：Bridge 通信耗时、JS 线程 FPS。
   - Flutter：UI 线程 / Raster 线程耗时。
   - Electron：主进程内存、渲染进程数量。

3. **实现方式**：
   - 封装统一监控 SDK，各端实现采集器。
   - 数据上报到 APM 平台（Sentry、Firebase、自建）。

二、错误处理

1. **全局错误捕获**：
   - H5：window.onerror、window.onunhandledrejection。
   - 小程序：App.onError。
   - RN：ErrorUtils.setGlobalHandler。
   - Flutter：FlutterError.onError、Zone。

2. **错误分级**：
   - Fatal：崩溃、白屏。
   - Warning：接口失败、非阻塞异常。

3. **告警和回滚**：
   - 错误率超过阈值触发告警。
   - 支持热修复、版本回滚。

三、日志规范

- 统一日志格式和级别。
- 支持用户行为链路回溯。
- 脱敏处理敏感信息。

**评分维度**：
- 能说明通用和平台特有性能指标（30%）
- 能说明监控 SDK 设计思路（25%）
- 能说明全局错误捕获方案（25%）
- 能提到告警和日志规范（20%）

**常见错误**：
- 只监控 H5，忽略原生端。
- 错误上报不做采样，数据量过大。
- 日志中泄露用户隐私。

**延伸追问**：
- 如何监控小程序的启动耗时？
- RN 的 JS 错误和 Native 崩溃如何统一上报？

**相关题目**：
- [FB-17-PE-A-009 小程序性能优化](#FB-17-PE-A-009)
- [FB-17-SD-R-024 大型跨端应用架构](#FB-17-SD-R-024)

**参考资源**：
- [Sentry 跨平台 SDK](https://docs.sentry.io/)
- [Firebase Performance Monitoring](https://firebase.google.com/docs/perf-mon)

**口头回答版**：
> 跨端监控要封装统一 SDK，各端实现采集器。通用指标有启动耗时、页面加载、FPS、网络请求；平台特有指标比如小程序 setData、RN Bridge 通信、Flutter UI/Raster 线程。错误捕获各端有各自的钩子，小程序 App.onError、RN ErrorUtils、Flutter FlutterError.onError。还要做错误分级、告警、日志脱敏和回溯。

---

### FB-17-SD-R-028：跨端应用的 CI/CD 和热更新策略如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、CI/CD、热更新、灰度发布、构建
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明跨端应用如何设计 CI/CD 流水线和热更新机制，以支持多平台快速迭代。

**参考答案**：

一、CI/CD 设计

1. **代码管理**：
   - Monorepo 管理，按 package 触发构建。
   - 分支策略：main、release、feature。

2. **自动化流水线**：
   - 代码提交触发 lint、类型检查、单元测试。
   - 合并后触发各端构建。
   - 产物上传：IPA/APK、小程序代码包、H5 CDN、Flutter 产物。

3. **多平台构建环境**：
   - iOS 需要 macOS + Xcode。
   - Android 需要 JDK + Android SDK。
   - 小程序使用各平台开发者工具或 CLI。

4. **版本管理**：
   - 语义化版本，各端独立但统一规划。
   - Changesets / Lerna / Rush 管理版本。

二、热更新策略

| 平台 | 热更新方案 | 限制 |
|------|-----------|------|
| 小程序 | 微信/支付宝官方热更新 | 审核机制 |
| H5 | CDN 部署，刷新即更新 | 无限制 |
| React Native | CodePush / Expo Updates | iOS 审核风险 |
| Flutter | shorebird / 自定义动态化 | 受限于官方政策 |
| Electron | 自动更新（electron-updater） | 需签名 |

三、灰度发布

- 按用户 ID、地域、设备、版本号灰度。
- 实时监控灰度指标，异常自动回滚。

**评分维度**：
- 能说明 CI/CD 流水线设计（30%）
- 能说明各端热更新方案（30%）
- 能说明版本和灰度策略（25%）
- 能提到平台构建环境差异（15%）

**常见错误**：
- 各端使用同一套构建脚本，忽略差异。
- 热更新不做灰度，全量发布。
- 忽略 iOS 热更新审核风险。

**延伸追问**：
- 小程序热更新和 H5 热更新有什么本质区别？
- 如何保证热更新失败后的回滚？

**相关题目**：
- [FB-17-SD-R-024 大型跨端应用架构](#FB-17-SD-R-024)
- [FB-17-SD-R-027 性能监控](#FB-17-SD-R-027)

**参考资源**：
- [GitHub Actions](https://docs.github.com/en/actions)
- [CodePush 官方文档](https://microsoft.github.io/code-push/)

**口头回答版**：
> 跨端 CI/CD 建议用 Monorepo，按包触发构建，iOS 要 macOS 环境，Android 要 JDK。代码提交跑 lint、测试、类型检查，合并后构建各端产物。热更新各端不一样：小程序官方热更新，H5 直接 CDN，RN 用 CodePush，Flutter 用 shorebird，Electron 用 electron-updater。发布要做灰度，按用户或版本放量，异常自动回滚。

---

### FB-17-SD-R-029：如何将一个原生或 H5 项目迁移到跨端框架？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、迁移、重构、原生、H5、渐进式
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明将一个现有的原生 App 或 H5 项目迁移到跨端框架的策略、步骤和风险。

**参考答案**：

迁移策略：

1. **评估现状**：
   - 统计现有页面数量、依赖库、原生能力使用情况。
   - 识别不可迁移部分（如特定硬件能力、复杂动画）。

2. **渐进式迁移**：
   - 不一次性重写，优先迁移独立、低耦合模块。
   - 新功能直接用跨端框架开发。
   - 旧功能逐步替换。

3. **原生与跨端共存**：
   - 原生 App 内嵌跨端页面（RN / Flutter / WebView）。
   - 跨端框架内嵌原生模块处理特殊能力。

4. **业务逻辑下沉**：
   - 将业务逻辑抽离为跨平台共享模块。
   - 各端 UI 层独立，业务层复用。

5. **数据与状态对齐**：
   - 统一用户态、登录态。
   - 共享缓存和存储方案。

迁移步骤：

```text
1. 搭建跨端基座和工具链
2. 选择试点页面/模块
3. 实现共享数据层和组件库
4. 逐步替换原生/H5 页面
5. 全量灰度并监控稳定性
6. 下线旧代码
```

风险：

- 性能不达预期。
- 第三方库不支持。
- 团队学习成本。
- 原生能力缺失。
- 迁移过程中的双端维护成本。

**评分维度**：
- 能说明渐进式迁移策略（30%）
- 能说明原生与跨端共存方案（25%）
- 能说明业务逻辑下沉（25%）
- 能识别迁移风险（20%）

**常见错误**：
- 一次性全量重写。
- 忽略不可迁移的原生能力。
- 迁移后不监控性能 regressions。

**延伸追问**：
- 如何评估一个页面是否适合迁移？
- 迁移过程中如何保持双端数据一致？

**相关题目**：
- [FB-17-SD-R-028 热更新策略](#FB-17-SD-R-028)
- [FB-17-SD-R-024 大型跨端应用架构](#FB-17-SD-R-024)

**参考资源**：
- [Airbnb React Native 迁移经验](https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c)
- [渐进式迁移策略](https://martinfowler.com/bliki/StranglerFigApplication.html)

**口头回答版**：
> 迁移跨端不要一次性重写，先评估页面和依赖，选低耦合模块做试点。新功能直接跨端，旧功能逐步替换。原生和跨端可以共存，比如原生里嵌 RN/Flutter 页面。业务逻辑下沉成共享模块，UI 层各端独立。风险有性能、第三方库、团队学习成本和原生能力缺失，要灰度监控。

---

### FB-17-SD-R-030：设计一个从 URL 到小程序/H5/App 任意页面打开的通用跳转系统。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、路由、Deep Link、跳转系统、URL 路由
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个通用跳转系统，能够根据 URL 路由到 H5、小程序、RN/Flutter App 的对应页面，并支持参数传递和降级策略。

**参考答案**：

一、URL 协议设计

统一 URL 规范：

```text
scheme://host/path?query
```

示例：

```text
myapp://product/detail?id=123
https://m.myapp.com/product/detail?id=123
weixin://miniapp/product/detail?id=123
```

二、路由解析器

- 解析 URL 得到 path 和参数。
- 根据 path 查询路由表，获取目标平台映射。

三、路由表

```json
{
  "product/detail": {
    "h5": "/pages/product/detail.html",
    "mini": "/pages/product/detail",
    "app": "ProductDetailPage"
  }
}
```

四、跳转执行器

根据当前环境选择跳转方式：

- **App 内**：使用原生导航打开目标页面。
- **H5 内**：`location.href` 或单页路由。
- **小程序内**：`wx.navigateTo`。
- **外部浏览器**：唤起 App 或跳转到 H5 降级页。

五、降级策略

- App 未安装：跳 H5 或应用商店。
- 小程序未打开：引导扫码或搜索。
- 目标页面不存在：跳 404 或首页。

六、安全校验

- URL 签名校验，防止伪造跳转。
- 参数白名单和类型校验。

**评分维度**：
- 能设计统一 URL 协议（25%）
- 能说明路由解析和路由表（25%）
- 能说明各端跳转执行方式（25%）
- 能说明降级和安全策略（25%）

**常见错误**：
- 各端 URL 规范不统一。
- 忽略 App 未安装场景。
- 跳转参数不做校验导致安全风险。

**延伸追问**：
- 如何处理小程序和 App 之间的互相跳转？
- 如何统计各端跳转转化率？

**相关题目**：
- [FB-17-SC-P-021 路由和 Deep Link](#FB-17-SC-P-021)
- [FB-17-SD-R-024 大型跨端应用架构](#FB-17-SD-R-024)

**参考资源**：
- [URL Routing Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/URL)

**口头回答版**：
> 通用跳转系统先定统一 URL 规范，比如 myapp://product/detail?id=123。然后路由解析器解析 path 和参数，查路由表拿到各端目标地址，再按当前环境执行：App 内原生导航、H5 里跳转、小程序 navigateTo、外部浏览器唤起 App 或 H5 降级。还要做安全校验、参数白名单、未安装降级。


---

## 基础题（8 道）{#basic-2}

### FB-17-CO-B-031：小程序中父子组件和兄弟组件如何通信？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：17 跨端技术
**标签**：小程序、组件通信、自定义组件、事件、状态管理
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明微信小程序中父子组件、兄弟组件之间常用的通信方式及各自适用场景。

**参考答案**：

1. **父子组件通信**
   - **Props 向下传**：父组件通过属性向子组件传递数据，子组件在 `properties` 中声明。
   - **事件向上抛**：子组件通过 `this.triggerEvent('eventName', data)` 触发自定义事件，父组件在 WXML 中绑定并接收。

2. **兄弟组件通信**
   - **共同父组件中转**：一个子组件通过事件通知父组件，父组件再修改数据传递给另一个子组件。
   - **全局状态管理**：使用 MobX、Westore 或小程序全局 `getApp().globalData`（简单场景）。

3. **其他方式**
   - `selectComponent`：父组件直接获取子组件实例并调用方法（不推荐滥用）。
   - 页面级事件总线：通过 `wx.emit/wx.on` 或自定义 EventBus（注意生命周期内解绑）。

最佳实践：
- 优先使用 props + 事件，保持数据单向流动。
- 避免过多使用全局状态，防止数据流难以追踪。

**评分维度**：
- 能说明 props 和 triggerEvent（40%）
- 能说明兄弟组件通信方式（30%）
- 能提到 selectComponent 和全局状态的使用边界（30%）

**常见错误**：
- 子组件直接修改父组件传入的 props。
- 事件名大小写或绑定方式写错。
- 全局事件总线不取消监听导致内存泄漏。

**延伸追问**：
- 如果组件层级很深，如何避免层层传递 props？
- 全局状态和小程序全局数据各有什么优缺点？

**相关题目**：
- [FB-17-CO-B-004 小程序生命周期](#FB-17-CO-B-004)
- [FB-17-SD-R-052 跨端组件库设计](#FB-17-SD-R-052)

**参考资源**：
- [微信小程序组件间通信](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)

**口头回答版**：
> 小程序父子组件通信用 props 向下传数据，用 triggerEvent 向上抛事件。兄弟组件可以通过共同父组件中转，也可以用全局状态管理。复杂场景还能用 selectComponent 直接拿子组件实例，或者页面级事件总线。推荐优先 props + 事件，保持单向数据流。

---

### FB-17-CO-B-032：Taro 中 React/Vue 组件生命周期如何映射到小程序？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：17 跨端技术
**标签**：Taro、生命周期、小程序、跨端、组件
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Taro 框架下，React 或 Vue 组件的生命周期是如何与小程序页面生命周期对应和转换的。

**参考答案**：

Taro 通过编译 + 运行时适配，将 React/Vue 生命周期映射到小程序生命周期：

1. **React 组件**
   - `componentDidMount` 映射到小程序 `onReady`。
   - `componentWillUnmount` 映射到 `onUnload`。
   - `componentDidShow` / `componentDidHide` 是 Taro 提供的扩展，对应 `onShow` / `onHide`。
   - 路由参数通过 `getCurrentInstance().router.params` 获取。

2. **Vue 组件**
   - `mounted` 对应 `onReady`。
   - `unmounted` 对应 `onUnload`。
   - Taro 提供 `onShow`、`onHide`、`onPullDownRefresh` 等页面生命周期钩子，可在 Vue 组合式 API 中使用。

3. **差异处理**
   - 小程序页面和组件生命周期不完全等同于 Web，Taro 通过 Page/Component 基类和事件转发实现映射。
   - 多端输出时，H5 端直接使用浏览器事件，小程序端使用映射后的小程序生命周期。

**评分维度**：
- 能说明 React 生命周期映射关系（40%）
- 能说明 Vue 生命周期映射关系（30%）
- 能提到多端差异和 Taro 扩展钩子（30%）

**常见错误**：
- 在 `componentDidMount` 中执行需要页面Ready后才能做的操作（小程序里对应 onReady）。
- 把 Web 端路由参数获取方式直接搬到 Taro。
- 混淆 Taro 页面生命周期和组件生命周期。

**延伸追问**：
- Taro 如何实现 useReady 或 useDidShow 这类 Hooks？
- 多端场景下，如何处理 H5 不存在 onShow/onHide 的问题？

**相关题目**：
- [FB-17-CO-B-004 小程序生命周期](#FB-17-CO-B-004)
- [FB-17-CO-A-008 Taro 与 UniApp](#FB-17-CO-A-008)

**参考资源**：
- [Taro 生命周期文档](https://docs.taro.zone/docs/lifecycle)

**口头回答版**：
> Taro 把 React 和 Vue 的生命周期映射到小程序生命周期。React 的 componentDidMount 对应小程序 onReady，componentWillUnmount 对应 onUnload，Taro 还扩展了 componentDidShow 和 componentDidHide 对应 onShow/onHide。Vue 的 mounted 对应 onReady，unmounted 对应 onUnload。多端输出时 H5 直接用浏览器事件，小程序用映射后的事件。

---

### FB-17-CO-B-033：React Native 中内置组件和原生模块有什么关系？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：17 跨端技术
**标签**：React Native、Native、组件、Bridge、原生渲染
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 React Native 中内置组件（如 View、Text、Image）和原生模块（Native Modules）的关系与区别。

**参考答案**：

1. **内置组件**
   - 对应原生 UI 组件，如 `<View>` 映射到 iOS UIView / Android View。
   - 由 RN 核心提供，负责页面渲染和基础交互。
   - 通过 Bridge/JSI 将 JS 中的组件树同步到原生层。

2. **原生模块**
   - 提供非 UI 的系统能力，如相机、定位、蓝牙、传感器、文件存储等。
   - 需要开发者用 Objective-C/Swift/Java/Kotlin 编写，并注册到 RN 中。
   - JS 层通过 `NativeModules.ModuleName.method()` 调用。

3. **关系**
   - 内置组件关注“渲染什么”，原生模块关注“能做什么”。
   - 两者都通过 Bridge/JSI 与 JS 层通信。
   - 新架构中，TurboModules 替代旧 NativeModules，Fabric 替代旧 View Manager。

**评分维度**：
- 能区分内置组件和原生模块的职责（40%）
- 能说明两者与 JS 的通信方式（30%）
- 能提到新架构 TurboModules/Fabric（30%）

**常见错误**：
- 认为内置组件就是原生模块。
- 认为 RN 所有能力都靠 JS 实现。
- 忽略原生模块需要原生端开发能力。

**延伸追问**：
- 如何在 RN 中引入第三方原生 UI 组件？
- TurboModules 相比旧 NativeModules 有什么好处？

**相关题目**：
- [FB-17-CO-B-005 React Native 基本原理](#FB-17-CO-B-005)
- [FB-17-SC-P-022 原生模块开发](#FB-17-SC-P-022)

**参考资源**：
- [React Native Native Modules](https://reactnative.dev/docs/native-modules-intro)

**口头回答版**：
> RN 内置组件像 View、Text、Image 对应原生 UI 组件，负责渲染；原生模块提供非 UI 的系统能力，比如相机、定位、蓝牙。JS 通过 Bridge 或 JSI 调它们。新架构里 TurboModules 替代原生模块，Fabric 替代视图管理。

---

### FB-17-CO-B-034：Flutter 中 StatelessWidget 和 StatefulWidget 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：17 跨端技术
**标签**：Flutter、Widget、Dart、状态管理、生命周期
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Flutter 中 StatelessWidget 和 StatefulWidget 的区别，并举例说明各自适用场景。

**参考答案**：

1. **StatelessWidget**
   - 无状态，创建后不可变（immutable）。
   - 仅依赖构造时传入的配置，自身不维护可变状态。
   - 适用：展示型组件，如纯文本、图标、静态卡片。

2. **StatefulWidget**
   - 可维护状态，由 `State` 对象持有可变数据。
   - 调用 `setState()` 会触发重建，更新 UI。
   - 适用：交互型组件，如计数器、表单输入、动画。

3. **生命周期差异**
   - StatefulWidget 有 `createState`、`initState`、`didUpdateWidget`、`dispose` 等生命周期。
   - StatelessWidget 只有 `build`。

4. **最佳实践**
   - 优先使用 StatelessWidget，减少不必要的重建。
   - 状态提升，避免深层嵌套 setState。

**评分维度**：
- 能说明两者核心区别（40%）
- 能说明 setState 和重建机制（30%）
- 能举例适用场景（30%）

**常见错误**：
- 在 StatelessWidget 中尝试修改状态。
- 把所有组件都写成 StatefulWidget。
- 在 setState 中执行异步操作或大量计算。

**延伸追问**：
- InheritedWidget 和 StatefulWidget 如何配合做状态共享？
- setState 调用后具体发生了什么？

**相关题目**：
- [FB-17-CO-B-006 Flutter 基本原理](#FB-17-CO-B-006)
- [FB-17-CO-P-019 Flutter 状态管理](#FB-17-CO-P-019)

**参考资源**：
- [Flutter StatelessWidget vs StatefulWidget](https://docs.flutter.dev/ui/interactivity)

**口头回答版**：
> StatelessWidget 没有状态，创建后不可变，适合纯展示；StatefulWidget 有 State 对象，可以 setState 更新 UI，适合交互组件。优先用 StatelessWidget，需要交互和状态再用 StatefulWidget。

---

### FB-17-CO-B-035：UniApp 中如何处理平台差异？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：17 跨端技术
**标签**：UniApp、平台差异、编译转换、跨端、组件
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 UniApp 中处理 H5、小程序、App 等平台差异的常用方式。

**参考答案**：

1. **条件编译**
   - 使用 `// #ifdef H5`、`// #ifndef MP-WEIXIN`、`// #endif` 等注释语法。
   - 编译时只保留目标平台代码，减小包体积。
   - 支持模板、样式、JS、pages.json 的条件编译。

2. **运行时判断**
   - `uni.getSystemInfoSync().platform` 获取当前平台。
   - `process.env.VUE_APP_PLATFORM` 在编译时注入。

3. **统一 API 封装**
   - 对 `uni.request`、`uni.showToast` 等做二次封装，统一错误处理和加载状态。
   - 不同平台能力差异通过适配层屏蔽。

4. **样式适配**
   - 使用 rpx、upx 等跨端单位。
   - 平台专属样式通过条件编译或 CSS 类名前缀处理。

最佳实践：
- 能条件编译就条件编译，减少运行时判断开销。
- 把平台差异收敛到 adapter 层，业务代码保持平台无关。

**评分维度**：
- 能说明条件编译语法和场景（40%）
- 能说明运行时判断方式（20%）
- 能说明统一 API 封装和样式适配（40%）

**常见错误**：
- 运行时判断写得太分散，难以维护。
- 条件编译范围过大，导致代码可读性差。
- 忽略小程序和 App 端 API 差异。

**延伸追问**：
- 条件编译和运行时判断各有什么优缺点？
- 如何实现一套请求库同时适配 H5 和小程序？

**相关题目**：
- [FB-17-CO-A-008 Taro 与 UniApp](#FB-17-CO-A-008)
- [FB-17-SC-P-023 屏幕适配](#FB-17-SC-P-023)

**参考资源**：
- [UniApp 条件编译文档](https://uniapp.dcloud.net.cn/tutorial/platform.html)

**口头回答版**：
> UniApp 处理平台差异主要靠条件编译，用 // #ifdef H5 这种注释，编译时只保留目标平台代码。也可以用运行时判断拿当前平台。另外建议把请求、弹窗等封装成统一 API，样式用 rpx 适配。差异尽量收敛到 adapter 层。

---

### FB-17-CO-B-036：Electron 的 preload 脚本有什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨端技术
**标签**：Electron、preload、contextIsolation、安全、桌面端
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Electron preload 脚本的作用，以及为什么推荐通过 contextBridge 暴露 API。

**参考答案**：

1. **preload 脚本作用**
   - 在渲染进程加载页面之前执行，可访问 Node.js 和 Electron API。
   - 用于在渲染进程和主进程之间建立安全的通信桥梁。
   - 通常配合 `ipcRenderer` 和 `contextBridge` 使用。

2. **contextBridge 暴露 API**
   - 把主进程能力有限地暴露给渲染进程。
   - 渲染进程通过 `window.electronAPI.xxx()` 调用预定义方法。
   - 避免直接开放整个 Node.js 环境，降低安全风险。

3. **安全建议**
   - 启用 `contextIsolation: true`，让 preload 和页面 JS 运行在不同上下文。
   - 禁用 `nodeIntegration`，不直接暴露 Node API。
   - 只暴露最小必要能力，参数做校验。

示例：

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  onUpdate: (cb) => ipcRenderer.on('update', cb)
});
```

**评分维度**：
- 能说明 preload 脚本作用（40%）
- 能说明 contextBridge 的使用方式（30%）
- 能提到 contextIsolation 和 nodeIntegration 的安全配置（30%）

**常见错误**：
- 在 preload 中直接暴露 `ipcRenderer` 全部能力。
- 关闭 contextIsolation 以图方便。
- 渲染进程直接 require Node 模块。

**延伸追问**：
- 如果必须让渲染进程访问 Node API，如何尽量安全？
- preload 脚本能使用 ES Module 吗？

**相关题目**：
- [FB-17-CO-B-007 Electron 主进程和渲染进程](#FB-17-CO-B-007)
- [FB-17-SE-A-013 Electron 安全](#FB-17-SE-A-013)

**参考资源**：
- [Electron Preload Scripts](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload)

**口头回答版**：
> preload 脚本在 Electron 渲染进程加载页面前执行，能访问 Node 和 Electron API，用来给渲染进程安全暴露主进程能力。推荐用 contextBridge 暴露 window.electronAPI，只开放最小必要方法，同时开启 contextIsolation、关闭 nodeIntegration，降低安全风险。

---

### FB-17-CO-B-037：微信小程序的分包加载和独立分包有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：17 跨端技术
**标签**：小程序、包体积、预加载、性能优化、懒加载
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明微信小程序中分包加载、独立分包和分包预下载的区别及使用场景。

**参考答案**：

1. **普通分包**
   - 将代码拆分到多个子包，用户进入分包页面时才下载。
   - 主包体积不超过 2MB，总包不超过 20MB。
   - 依赖主包代码，不能独立运行。

2. **独立分包**
   - 不依赖主包即可运行，可以单独启动。
   - 适合从特定入口直接打开的场景，如分享页、广告落地页。
   - 有访问限制：不能依赖主包资源，包内页面不能跳转主包页面除非先加载主包。

3. **分包预下载**
   - 用户进入某页面时，提前下载可能用到的分包。
   - 在 `app.json` 中配置 `preloadRule`。
   - 提升后续页面打开速度，但增加流量消耗。

4. **最佳实践**
   - 按业务模块拆包，低频页面放分包。
   - 分享入口、广告页用独立分包加速启动。
   - 合理配置预下载，避免一次性下载过多分包。

**评分维度**：
- 能说明普通分包和独立分包区别（40%）
- 能说明分包预下载机制（30%）
- 能给出使用场景建议（30%）

**常见错误**：
- 独立分包依赖主包代码导致报错。
- 分包路径配置错误，页面找不到。
- 预下载规则配置过多，影响首包。

**延伸追问**：
- 主包体积超过 2MB 有哪些优化手段？
- 如何统计各分包的访问量和加载耗时？

**相关题目**：
- [FB-17-PE-A-009 小程序性能优化](#FB-17-PE-A-009)
- [FB-17-CO-B-004 小程序生命周期](#FB-17-CO-B-004)

**参考资源**：
- [微信小程序分包加载](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)

**口头回答版**：
> 小程序普通分包是进入页面时才下载，依赖主包；独立分包可以不依赖主包单独启动，适合分享页、广告落地页；分包预下载是进入某个页面时提前下载可能用到的分包。按业务模块拆包，分享入口用独立分包，合理配预下载。

---

### FB-17-CO-B-038：跨端开发中处理平台差异有哪些常见思路？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨端技术
**标签**：跨端、平台差异、编译转换、组件、API
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请总结跨端开发中处理不同平台（iOS/Android、小程序/H5/App）差异的常见思路。

**参考答案**：

1. **编译时抹平**
   - 条件编译：Taro、UniApp 在编译阶段根据目标平台保留/删除代码。
   - 平台专属文件：如 `index.weapp.tsx`、`index.h5.tsx`。

2. **运行时适配**
   - 通过 `process.env.TARO_ENV`、`uni.getSystemInfo` 判断平台。
   - 封装平台能力适配层，对外暴露统一 API。

3. **组件/样式抽象**
   - 设计跨端组件库，内部处理平台差异，业务层无感知。
   - 使用相对单位、安全区适配、暗黑模式变量。

4. **能力降级**
   - 某平台不支持某功能时，提供替代方案或友好提示。
   - 例如小程序不支持 WebSocket 某些特性时回退到轮询。

5. **原生扩展**
   - 通过原生模块、自定义组件补齐特定平台能力。

最佳实践：
- 把平台判断收敛到少数 adapter 文件。
- 业务代码保持平台无关，优先使用框架统一 API。

**评分维度**：
- 能说明编译时和运行时两种思路（40%）
- 能说明组件抽象和能力降级（30%）
- 能提到原生扩展（30%）

**常见错误**：
- 平台判断代码散落在业务各处。
- 为了统一而统一，牺牲平台原生体验。
- 忽略能力降级，导致低端设备或特殊平台不可用。

**延伸追问**：
- 如何设计一个跨端文件选择器，同时适配 H5、小程序和 App？
- 平台差异较多时，如何平衡代码复用率和平台体验？

**相关题目**：
- [FB-17-CO-B-035 UniApp 平台差异](#FB-17-CO-B-035)
- [FB-17-SD-R-058 跨端统一设计系统](#FB-17-SD-R-058)

**参考资源**：
- [Taro 多端开发实践](https://docs.taro.zone/docs/envs)

**口头回答版**：
> 跨端处理平台差异主要有编译时抹平，比如条件编译和平台专属文件；运行时适配，用环境变量判断平台再封装统一 API；还有组件和样式抽象、能力降级、原生扩展。关键是把平台判断收敛到 adapter 层，业务代码尽量平台无关。

---

## 进阶题（9 道）{#advanced-2}

### FB-17-PE-A-039：跨端应用的首屏加载可以从哪些方面优化？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：跨端、性能优化、包体积、预加载、懒加载
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请从代码、资源、架构等角度，说明跨端应用（小程序、RN、Flutter、H5）的首屏加载优化手段。

**参考答案**：

1. **包体积控制**
   - 小程序：主包不超过 2MB，使用分包、独立分包、代码压缩、图片资源 CDN 化。
   - RN/Flutter：Tree Shaking、移除调试代码、图片和字体按需加载、Hermes/Dart AOT。
   - H5：代码分割、路由懒加载、Gzip/Brotli、CDN。

2. **资源预加载**
   - 小程序：分包预下载、图片预加载、数据预请求。
   - H5：`<link rel="preload">`、DNS 预解析、关键资源预加载。
   - App：启动时预加载下一页数据和资源。

3. **渲染优化**
   - 减少首屏 setData/状态更新次数，合并请求。
   - 骨架屏替代白屏，提升用户感知。
   - 优先渲染首屏可见区域，非首屏内容延迟加载。

4. **启动链路优化**
   - 并行化初始化任务，减少串行阻塞。
   - 延迟加载非核心 SDK、统计库。
   - 使用离线包或热更新缓存最新资源。

5. **监控与度量**
   - 定义首屏时间指标（FCP、LCP、自定义首屏点）。
   - 分平台、分机型、分网络建立性能基线。

**评分维度**：
- 能从包体积、预加载、渲染三个角度回答（40%）
- 能结合具体跨端平台说明（30%）
- 能提到启动链路和监控度量（30%）

**常见错误**：
- 只关注代码压缩，忽略资源加载顺序。
- 预加载过多资源，反而拖慢首屏。
- 没有建立统一的首屏度量标准。

**延伸追问**：
- 如何衡量小程序的首屏时间？
- Flutter 的 AOT 编译对启动速度有什么影响？

**相关题目**：
- [FB-17-PE-A-009 小程序性能优化](#FB-17-PE-A-009)
- [FB-17-SD-R-064 跨端性能度量基线](#FB-17-SD-R-064)

**参考资源**：
- [Web 性能优化](https://web.dev/performance/)

**口头回答版**：
> 跨端首屏优化主要从包体积、资源预加载、渲染和启动链路入手。控制主包大小，用分包、CDN、懒加载；预加载关键资源和数据；首屏只渲染可见区域，用骨架屏；并行化初始化，延迟非核心 SDK；最后定义首屏指标做监控。

---

### FB-17-CO-A-040：React Native 的 Fabric 渲染器解决了什么问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：React Native、Fabric、原生渲染、JSI、性能优化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React Native 新架构中 Fabric 渲染器相比旧架构有哪些改进。

**参考答案**：

1. **旧架构问题**
   - 通过 Shadow Thread 和 JSON 序列化与原生通信。
   - 布局计算在 JS 侧完成，跨线程通信有延迟。
   - UI 操作异步，复杂动画和手势响应不够流畅。

2. **Fabric 改进**
   - 新的 C++ 渲染层，统一 iOS/Android 渲染管线。
   - 支持同步渲染，JS 可以直接调用原生 UI 方法。
   - 基于 JSI，JS 可持有 C++ 对象引用，减少序列化开销。

3. **核心变化**
   - 渲染逻辑下沉到 C++，两端共享更多代码。
   - 优先级调度：支持高优先级交互响应，低优先级后台任务。
   - 更好的并发和内存管理。

4. **与 TurboModules 配合**
   - TurboModules 提供同步/异步 Native API。
   - Fabric + TurboModules + JSI 构成 RN 新架构三件套。

**评分维度**：
- 能说明旧架构的通信瓶颈（30%）
- 能说明 Fabric 的同步渲染和 C++ 层（40%）
- 能提到 JSI 和 TurboModules 配合（30%）

**常见错误**：
- 认为 Fabric 只是重写了 UI 组件。
- 忽略 JSI 在 Fabric 中的关键作用。
- 混淆 Fabric 和 Yoga 的职责。

**延伸追问**：
- Fabric 下 Yoga 布局是在哪一层计算？
- 新架构对现有 RN 应用升级有哪些挑战？

**相关题目**：
- [FB-17-CO-B-005 React Native 基本原理](#FB-17-CO-B-005)
- [FB-17-FS-P-017 React Native 新架构](#FB-17-FS-P-017)

**参考资源**：
- [React Native Fabric Renderer](https://reactnative.dev/docs/architecture/fabric-renderer)

**口头回答版**：
> RN 旧架构靠 Shadow Thread 和 JSON 序列化通信，有延迟。Fabric 是新渲染器，渲染逻辑下沉到 C++，支持同步调用和优先级调度，配合 JSI 可以直接持有 C++ 对象，减少序列化。和 TurboModules 一起构成新架构。

---

### FB-17-CA-A-041：分析以下小程序 setData 代码的执行结果和性能影响

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：小程序、setData、性能优化、双向绑定、组件
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请分析下面小程序代码的执行结果，并指出性能问题和优化方向。

```js
Page({
  data: { list: [] },
  onLoad() {
    const newList = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `item-${i}` }));
    for (let i = 0; i < newList.length; i++) {
      this.setData({
        [`list[${i}]`]: newList[i]
      });
    }
  }
});
```

**参考答案**：

1. **执行结果**
   - 页面会尝试渲染 1000 条数据。
   - 由于循环调用 1000 次 setData，逻辑层和渲染层会频繁通信，导致严重卡顿甚至白屏。

2. **性能问题**
   - 每次 setData 都会触发一次跨线程通信和可能的重新渲染。
   - 1000 次短间隔调用会塞满通信队列。
   - 一次性设置大量数据会增加序列化和 diff 开销。

3. **优化方向**
   - 合并 setData：一次设置整个 list。
   - 分页加载：先加载首屏数据，滚动到底再加载更多。
   - 使用虚拟列表或 recycle-view 减少渲染节点。
   - 只传递变化字段，避免全量对象。

优化后示例：

```js
this.setData({ list: newList.slice(0, 20) });
```

**评分维度**：
- 能指出循环 setData 的问题（40%）
- 能说明跨线程通信和渲染开销（30%）
- 能给出合并、分页、虚拟列表等优化方案（30%）

**常见错误**：
- 认为 setData 是同步的。
- 只答“合并 setData”但不解释原因。
- 忽略大数据量下渲染层节点过多的问题。

**延伸追问**：
- setData 的数据量上限大概是多少？
- 虚拟列表在小程序中如何实现？

**相关题目**：
- [FB-17-CO-B-003 小程序运行机制](#FB-17-CO-B-003)
- [FB-17-PE-A-009 小程序性能优化](#FB-17-PE-A-009)

**参考资源**：
- [微信小程序 setData](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)

**口头回答版**：
> 这段代码循环调了 1000 次 setData，每次都会触发逻辑层和渲染层通信，严重卡顿。优化要合并成一次 setData，或者先只加载首屏数据，用分页或虚拟列表。大数据量还要注意渲染节点数。

---

### FB-17-SC-A-042：跨端应用的登录态如何同步和保持一致？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：跨端、鉴权、Token、状态同步、数据同步
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个跨端应用（H5、小程序、App）的登录态同步方案，保证多端登录态一致和安全。

**参考答案**：

1. **Token 机制**
   - 使用 Access Token + Refresh Token 双 Token 机制。
   - Access Token 有效期短（如 15 分钟），Refresh Token 有效期长但可吊销。

2. **多端存储**
   - H5：localStorage / cookie（注意 Safari ITP）。
   - 小程序：wx.setStorage，敏感信息建议加密。
   - App：Keychain/Keystore 或原生加密存储。

3. **登录态同步**
   - 同端多页面：通过全局状态管理或事件总线同步。
   - 多端之间：依赖服务端统一会话，登录/登出时推送通知或下次请求时刷新。
   - 小程序和 H5 互跳：通过 URL 临时 Token 或统一登录中心回调。

4. **安全策略**
   - Token 加密存储，不长期存放在内存。
   - HTTPS 传输，防止中间人攻击。
   - 单点登录/单点登出，异常设备强制下线。

5. **登出处理**
   - 清除本地 Token，广播登录态变更，刷新需要鉴权的页面。

**评分维度**：
- 能说明 Token 机制（25%）
- 能说明多端存储差异（25%）
- 能说明登录态同步方式（25%）
- 能提到安全和登出处理（25%）

**常见错误**：
- Token 长期不过期或只存内存。
- 多端使用同一套存储方案忽略平台差异。
- 登录态变更不通知各页面，导致数据不一致。

**延伸追问**：
- 小程序和 App 同时登录时，如何感知另一端的登出？
- Token 被盗用后如何快速吊销？

**相关题目**：
- [FB-17-SC-A-011 Hybrid App](#FB-17-SC-A-011)
- [FB-17-SD-R-025 跨端状态共享](#FB-17-SD-R-025)

**参考资源**：
- [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749)

**口头回答版**：
> 跨端登录态一般用 Access Token 加 Refresh Token。不同端存储方式不一样，H5 用 localStorage，小程序用 wx.setStorage，App 用 Keychain。同端内用全局状态同步，多端靠服务端统一会话。Token 要加密、HTTPS 传、支持吊销和单点登出。

---

### FB-17-EN-A-043：跨端项目如何使用 Monorepo 组织代码？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：跨端、Monorepo、CI/CD、组件、工程化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明跨端项目采用 Monorepo 组织的常见目录结构、工具选择和关键实践。

**参考答案**：

1. **目录结构**

```text
packages/
  shared/          # 共享工具、常量、类型、API 封装
  ui-components/   # 跨端组件库
  h5-app/          # H5 应用
  mini-app/        # 小程序应用
  rn-app/          # React Native 应用
  flutter-app/     # Flutter 应用（可选）
```

2. **工具选择**
   - pnpm workspace / Yarn workspace / Lerna / Nx。
   - Turborepo 做任务编排和缓存。
   - Changesets 做版本管理和发布。

3. **关键实践**
   - 共享包通过 workspace 协议引用，避免版本漂移。
   - 统一 ESLint、Prettier、TypeScript 配置。
   - 组件库按平台输出不同产物（.weapp、.h5、.rn）。
   - CI 中按变更包执行构建和测试，避免全量构建。

4. **依赖管理**
   - 区分 `dependencies` 和 `peerDependencies`。
   - 平台专属依赖下沉到各自应用包。

5. **发布流程**
   - 共享包变更触发版本发布。
   - 应用包变更触发对应平台的打包/上架/热更新。

**评分维度**：
- 能给出合理的目录结构（30%）
- 能说明 Monorepo 工具选择（20%）
- 能说明跨端共享和平台隔离的实践（30%）
- 能提到 CI/CD 和发布流程（20%）

**常见错误**：
- 所有代码放一个包，平台差异无法隔离。
- 共享包过度依赖某平台 API。
- 没有版本管理，导致应用引用不一致的共享包版本。

**延伸追问**：
- 如何处理 shared 包中不同平台 API 的差异？
- Monorepo 下如何保证组件库改动不影响所有端？

**相关题目**：
- [FB-17-SD-R-052 跨端组件库设计](#FB-17-SD-R-052)
- [FB-17-SD-R-028 跨端 CI/CD](#FB-17-SD-R-028)

**参考资源**：
- [Turborepo 文档](https://turbo.build/repo)

**口头回答版**：
> 跨端 Monorepo 一般把共享工具、组件库、各端应用分 packages 管理，用 pnpm workspace 或 Nx，Turborepo 做任务缓存。关键是共享包平台无关，组件库按平台输出产物，CI 按变更包构建，用 Changesets 管理版本发布。

---

### FB-17-CO-A-044：Flutter 的热重载（Hot Reload）和热重启（Hot Restart）有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：Flutter、热更新、Dart、状态管理、开发效率
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Flutter 中 Hot Reload 和 Hot Restart 的原理及使用场景差异。

**参考答案**：

1. **Hot Reload（热重载）**
   - 将更新后的 Dart 代码注入到运行中的 Dart VM。
   - 保留应用状态，不需要重新构建 Widget 树以上的状态。
   - 耗时通常在毫秒级。
   - 限制：不支持 main() 修改、全局变量初始化、枚举修改等。

2. **Hot Restart（热重启）**
   - 重新启动 Dart VM，重新加载代码，不重新编译原生代码。
   - 应用状态会丢失，相当于重新启动应用。
   - 耗时比重载长，但比冷启动短。
   - 适用于需要重置状态或热重载不生效的场景。

3. **与生产热更新区别**
   - Hot Reload/Restart 只在开发调试时使用。
   - 生产环境 Flutter 热更新受限（iOS 审核限制），常用 Code Push 需合规。

**评分维度**：
- 能说明 Hot Reload 原理和状态保留（40%）
- 能说明 Hot Restart 和热重载的区别（30%）
- 能提到生产环境限制（30%）

**常见错误**：
- 认为热重载会重新初始化所有状态。
- 把 Flutter 热重载等同于生产热更新。
- 热重载失效时不知道用热重启。

**延伸追问**：
- 为什么 Flutter 在 iOS 上生产热更新受限？
- 哪些代码改动热重载无法生效？

**相关题目**：
- [FB-17-CO-B-006 Flutter 基本原理](#FB-17-CO-B-006)
- [FB-17-SD-R-059 跨端热更新平台](#FB-17-SD-R-059)

**参考资源**：
- [Flutter Hot Reload](https://docs.flutter.dev/tools/hot-reload)

**口头回答版**：
> Flutter 热重载是把新代码注入运行中的 Dart VM，保留状态，速度很快；热重启是重新启动 Dart VM，状态会丢失，比热重载慢但比冷启动快。它们只在开发时用，生产热更新 Flutter 受 iOS 审核限制。

---

### FB-17-SE-A-045：小程序有哪些常见安全风险？如何防御？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：小程序、安全、XSS、注入攻击、鉴权
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举微信小程序等跨端小程序常见的安全风险，并给出防御措施。

**参考答案**：

1. **数据注入与 XSS**
   - 风险：富文本、用户输入直接渲染导致脚本注入。
   - 防御：使用 `rich-text` 组件时过滤危险标签；用户输入做转义和校验。

2. **敏感信息泄露**
   - 风险：把 AppSecret、Token、密钥硬编码在小程序包中。
   - 防御：敏感逻辑放服务端，本地只保留临时 Token。

3. **接口鉴权绕过**
   - 风险：前端只依赖 `openid` 做权限判断，接口未做服务端鉴权。
   - 防御：所有敏感操作必须服务端鉴权，不信任前端数据。

4. **URL 参数篡改**
   - 风险：页面参数被修改，导致越权访问或数据错误。
   - 防御：关键参数做签名或后端校验。

5. **WebView 跳转风险**
   - 风险：打开不可信外部 H5，可能钓鱼或窃取信息。
   - 防御：限制业务域名白名单，使用 `web-view` 时校验 URL。

6. **setData 数据安全**
   - 风险：把敏感数据 setData 到视图层可能被恶意脚本读取。
   - 防御：敏感数据不进入 data，只在逻辑层处理。

**评分维度**：
- 能说明 XSS 和注入防御（30%）
- 能说明敏感信息保护（25%）
- 能说明接口鉴权和参数校验（25%）
- 能提到 WebView 和 setData 安全（20%）

**常见错误**：
- 认为小程序运行在沙箱中就绝对安全。
- 把密钥放在前端代码里。
- 前端做权限判断，服务端不校验。

**延伸追问**：
- 小程序代码被反编译后如何保护业务逻辑？
- 如何防止小程序被爬虫抓取数据？

**相关题目**：
- [FB-17-CO-B-003 小程序运行机制](#FB-17-CO-B-003)
- [FB-17-SE-A-013 Electron 安全](#FB-17-SE-A-013)

**参考资源**：
- [微信小程序安全](https://developers.weixin.qq.com/miniprogram/dev/framework/security.html)

**口头回答版**：
> 小程序安全风险主要有 XSS 注入、敏感信息泄露、接口鉴权绕过、URL 参数篡改、WebView 跳转风险。防御要过滤富文本、不把密钥放前端、服务端做鉴权、关键参数签名、限制 WebView 域名、敏感数据不 setData。

---

### FB-17-CD-A-046：请手写一个跨端 Storage 封装

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：跨端、存储、持久化、缓存、请求封装
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请实现一个跨端 Storage 封装，统一支持 H5（localStorage）、小程序（wx.setStorage）、RN（AsyncStorage）的 set/get/remove/clear 方法。

**参考答案**：

```ts
// storage.ts
const isH5 = typeof window !== 'undefined' && window.localStorage;
const isMiniProgram = typeof wx !== 'undefined' && wx.setStorageSync;
const isRN = typeof global !== 'undefined' && !isH5 && !isMiniProgram;

let RNStorage: any;
if (isRN) {
  RNStorage = require('@react-native-async-storage/async-storage').default;
}

const storage = {
  async set<T>(key: string, value: T): Promise<void> {
    const data = JSON.stringify(value);
    if (isH5) {
      localStorage.setItem(key, data);
    } else if (isMiniProgram) {
      wx.setStorageSync(key, value);
    } else if (isRN) {
      await RNStorage.setItem(key, data);
    }
  },

  async get<T>(key: string): Promise<T | null> {
    let data: any = null;
    if (isH5) {
      const raw = localStorage.getItem(key);
      data = raw ? JSON.parse(raw) : null;
    } else if (isMiniProgram) {
      data = wx.getStorageSync(key);
    } else if (isRN) {
      const raw = await RNStorage.getItem(key);
      data = raw ? JSON.parse(raw) : null;
    }
    return data as T | null;
  },

  async remove(key: string): Promise<void> {
    if (isH5) {
      localStorage.removeItem(key);
    } else if (isMiniProgram) {
      wx.removeStorageSync(key);
    } else if (isRN) {
      await RNStorage.removeItem(key);
    }
  },

  async clear(): Promise<void> {
    if (isH5) {
      localStorage.clear();
    } else if (isMiniProgram) {
      wx.clearStorageSync();
    } else if (isRN) {
      await RNStorage.clear();
    }
  }
};

export default storage;
```

关键点：
- 运行时判断平台，避免编译时条件编译。
- 统一使用 Promise 接口，H5 同步 API 也包装成 Promise。
- 数据序列化/反序列化做容错处理。
- 敏感数据可扩展加密层。

**评分维度**：
- 能设计统一 API（30%）
- 能正确处理平台差异（30%）
- 能处理同步/异步一致性（20%）
- 能考虑容错和扩展性（20%）

**常见错误**：
- 平台判断错误，导致 H5 和小程序混用 API。
- 没有 JSON 序列化，导致存储对象失败。
- 忽略异常处理，存储满或禁用时崩溃。

**延伸追问**：
- 如果要在 Storage 中加密敏感数据，如何设计？
- 如何实现 Storage 的过期清理机制？

**相关题目**：
- [FB-17-CD-A-012 手写 JSBridge](#FB-17-CD-A-012)
- [FB-17-SC-A-042 登录态同步](#FB-17-SC-A-042)

**参考资源**：
- [React Native AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

**口头回答版**：
> 跨端 Storage 封装要先判断平台是 H5、小程序还是 RN，然后统一暴露 set/get/remove/clear 四个 Promise 方法。H5 用 localStorage，小程序用 wx.setStorageSync，RN 用 AsyncStorage。数据存取做 JSON 序列化，还要考虑容错和敏感数据加密扩展。

---

### FB-17-PE-A-047：React Native 长列表如何优化性能？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：17 跨端技术
**标签**：React Native、ListView、虚拟列表、性能优化、内存
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React Native 中实现高性能长列表的方案，以及 FlatList 的关键优化配置。

**参考答案**：

1. **使用 FlatList / SectionList**
   - 替代 ScrollView + map，FlatList 自带虚拟化，只渲染可见区域。
   - 支持 `getItemLayout`、`initialNumToRender`、`windowSize` 等优化配置。

2. **关键配置**
   - `keyExtractor`：稳定唯一 key，避免用 index。
   - `getItemLayout`：提前告知 item 高度，减少布局计算。
   - `initialNumToRender`：控制首屏渲染数量。
   - `windowSize`：控制可视区域外缓存的屏数。
   - `removeClippedSubviews`：移除屏幕外视图，降低内存占用（iOS 谨慎使用）。
   - `maxToRenderPerBatch` 和 `updateCellsBatchingPeriod`：控制渲染节奏。

3. **Item 优化**
   - 使用 `React.memo` 或 `PureComponent` 减少不必要重绘。
   - 避免在 renderItem 中创建新函数或对象。
   - 图片使用合适尺寸，启用缓存。

4. **数据优化**
   - 分页加载，避免一次性请求大量数据。
   - 合并更新，减少 setState 次数。

**评分维度**：
- 能说明 FlatList 虚拟化原理（30%）
- 能说明关键配置项作用（35%）
- 能说明 Item 和数据优化（35%）

**常见错误**：
- 用 ScrollView 渲染长列表。
- keyExtractor 使用 index。
- 忽略 getItemLayout 导致大量 onLayout 计算。
- 所有列表项都使用复杂动画。

**延伸追问**：
- FlatList 和 SectionList 有什么区别？
- 列表项高度不固定时如何优化？

**相关题目**：
- [FB-17-CO-B-005 React Native 基本原理](#FB-17-CO-B-005)
- [FB-17-PE-P-020 跨端动画一致性](#FB-17-PE-P-020)

**参考资源**：
- [React Native FlatList](https://reactnative.dev/docs/flatlist)

**口头回答版**：
> RN 长列表要用 FlatList，它自带虚拟化只渲染可见区。关键配置有 keyExtractor 用稳定 key、getItemLayout 告诉高度、initialNumToRender 控制首屏、windowSize 控制缓存、removeClippedSubviews 减少内存。Item 用 memo，避免 renderItem 里创建新对象，数据分页加载。

---

## 深入题（9 道）{#proficient-2}

### FB-17-FS-P-048：小程序 Skyline 渲染引擎相比 WebView 有哪些改进？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：小程序、Skyline、渲染引擎、性能优化、原生渲染
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请深入说明微信小程序 Skyline 渲染引擎的架构，以及相比传统 WebView 渲染的优势和限制。

**参考答案**：

1. **传统 WebView 渲染**
   - 逻辑层 JSCore 通过 setData 把数据传给渲染层 WebView。
   - WebView 内使用浏览器内核解析 WXML/WXSS 并渲染。
   - 性能受 WebView 启动和 CSS/Layout 计算影响。

2. **Skyline 渲染引擎**
   - 自研渲染引擎，脱离 WebView，直接对接系统图形 API。
   - 逻辑层和渲染层通信更高效，支持同步调用和更细粒度更新。
   - 支持同层渲染、Worklet 动画、手势系统，动画性能接近原生。

3. **核心改进**
   - 启动更快：减少 WebView 初始化时间。
   - 渲染更流畅：布局计算和绘制在原生线程执行。
   - 动画能力增强：支持 Worklet 在渲染线程运行 JS 逻辑。
   - 内存优化：按需创建渲染节点。

4. **限制**
   - 部分 WebView 特性不兼容，需要适配。
   - 样式能力有差异，复杂 CSS 可能不支持。
   - 调试工具和生态不如 WebView 成熟。

**评分维度**：
- 能对比 WebView 和 Skyline 架构（35%）
- 能说明 Skyline 性能改进点（35%）
- 能提到限制和适配成本（30%）

**常见错误**：
- 认为 Skyline 就是升级了 WebView。
- 忽略 Skyline 的样式兼容性问题。
- 认为所有小程序页面都应该切到 Skyline。

**延伸追问**：
- Skyline 的同层渲染解决了什么问题？
- Worklet 和 Web Animations API 有什么异同？

**相关题目**：
- [FB-17-CO-B-003 小程序运行机制](#FB-17-CO-B-003)
- [FB-17-FS-P-016 小程序渲染原理](#FB-17-FS-P-016)

**参考资源**：
- [微信小程序 Skyline](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/introduction.html)

**口头回答版**：
> Skyline 是微信自研的小程序渲染引擎，不再用 WebView，直接对接系统图形 API。启动更快、渲染更流畅，支持 Worklet 动画和同层渲染。但部分 WebView 特性和复杂 CSS 不兼容，需要评估后迁移。

---

### FB-17-FS-P-049：React Native 的 JSI 和 TurboModules 解决了什么问题？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：React Native、JSI、TurboModules、Fabric、性能优化
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请深入解释 React Native 新架构中 JSI（JavaScript Interface）和 TurboModules 的设计原理及解决的问题。

**参考答案**：

1. **旧架构 Bridge 的问题**
   - JS 和 Native 通过异步 JSON 消息队列通信。
   - 所有调用必须序列化/反序列化，开销大。
   - 不支持同步调用，UI 操作和原生能力调用有延迟。

2. **JSI 设计原理**
   - 提供 C++ 层抽象接口，让 JS 引擎可以直接持有 Native/C++ 对象引用。
   - 支持同步调用：JS 可以直接调用 C++ 暴露的方法。
   - 不绑定特定 JS 引擎，可替换 JSC、Hermes、V8。

3. **TurboModules**
   - 基于 JSI 的新一代原生模块系统。
   - 模块懒加载：只有 JS 调用时才加载对应 Native Module。
   - 支持类型安全的接口定义（通过 Codegen 生成）。
   - 同步和异步调用都支持。

4. **与旧架构对比**
   - 启动更快：模块按需加载，不需要启动时全量初始化。
   - 调用更快：减少序列化和线程切换。
   - 类型安全：接口定义共享，减少运行时错误。

**评分维度**：
- 能说明旧 Bridge 瓶颈（25%）
- 能说明 JSI 的同步调用和对象引用（35%）
- 能说明 TurboModules 懒加载和 Codegen（25%）
- 能对比新旧架构差异（15%）

**常见错误**：
- 认为 JSI 是新的 Bridge。
- 认为 JSI 只能用于 UI 渲染。
- 忽略 TurboModules 的懒加载优势。

**延伸追问**：
- JSI 如何支持 JS 引擎替换？
- Codegen 在 TurboModules 中起什么作用？

**相关题目**：
- [FB-17-CO-B-005 React Native 基本原理](#FB-17-CO-B-005)
- [FB-17-CO-A-040 Fabric 渲染器](#FB-17-CO-A-040)

**参考资源**：
- [React Native JSI](https://reactnative.dev/docs/architecture/glossary#javascript-interface-jsi)

**口头回答版**：
> 旧 RN 靠 Bridge 异步传 JSON，性能差。JSI 让 JS 引擎直接持有 C++ 对象引用，支持同步调用。TurboModules 基于 JSI，模块懒加载，Codegen 生成类型安全接口。启动更快、调用更快，还能替换 JS 引擎。

---

### FB-17-FS-P-050：Flutter 的渲染管线是怎样的？Impeller 替代 Skia 有什么意义？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：Flutter、Impeller、渲染引擎、Skia、性能优化
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请深入说明 Flutter 的渲染管线流程，以及 Impeller 相比 Skia 的优势和迁移意义。

**参考答案**：

1. **Flutter 渲染管线**
   - **Widget Tree**：声明式 UI 配置，不可变。
   - **Element Tree**：连接 Widget 和 RenderObject，管理生命周期和复用。
   - **RenderObject Tree**：负责布局、绘制、合成。
   - **Layer Tree**：将绘制结果分层，提交给 GPU。
   - **Skia/Impeller**：底层图形引擎，将 Layer 转换为 GPU 指令。

2. **Skia 的问题**
   - 运行时编译着色器，导致首帧和动画启动时卡顿（jank）。
   - 依赖设备端 Skia 版本，行为和性能不一致。

3. **Impeller 优势**
   - 预编译着色器：大部分着色器在构建时生成，减少运行时编译。
   - 统一渲染后端：iOS 用 Metal，Android/Vulkan 用 Vulkan，降低平台差异。
   - 更明确的对象生命周期和线程模型，便于调试和优化。
   - 更好的性能可预测性，减少掉帧。

4. **迁移意义**
   - 解决 Flutter 长期存在的“首次打开页面掉帧”问题。
   - 为未来高级渲染特性（如 3D、复杂特效）打下基础。

**评分维度**：
- 能说明 Flutter 三棵树到 GPU 的管线（35%）
- 能说明 Skia 运行时编译着色器问题（25%）
- 能说明 Impeller 预编译和统一后端优势（30%）
- 能提到迁移意义（10%）

**常见错误**：
- 认为 Impeller 只是 Skia 的升级版本。
- 忽略着色器编译对首帧的影响。
- 认为 Impeller 完全消除了所有平台差异。

**延伸追问**：
- Impeller 目前还有哪些平台或特性不支持？
- 如何验证 Impeller 是否带来了性能提升？

**相关题目**：
- [FB-17-CO-B-006 Flutter 基本原理](#FB-17-CO-B-006)
- [FB-17-FS-P-018 Flutter 渲染管线](#FB-17-FS-P-018)

**参考资源**：
- [Flutter Impeller](https://docs.flutter.dev/perf/impeller)

**口头回答版**：
> Flutter 渲染管线是 Widget -> Element -> RenderObject -> Layer -> GPU。Skia 运行时编译着色器会掉帧，Impeller 改成预编译着色器，统一用 Metal/Vulkan 后端，性能更可预测，能解决首帧卡顿问题。

---

### FB-17-PE-P-051：跨端应用的内存优化和泄漏治理怎么做？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：跨端、内存优化、内存、性能监控、错误处理
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请从检测、预防和治理三个层面，说明跨端应用如何进行内存优化和泄漏治理。

**参考答案**：

1. **常见内存问题**
   - 小程序：页面未卸载时持有大图、定时器、事件监听未清理。
   - RN：组件卸载未取消订阅、闭包引用、图片缓存过大。
   - Flutter：Widget 重建过多、图片未释放、Isolate 资源泄漏。
   - Electron：渲染进程过多、主进程持有窗口引用。

2. **检测手段**
   - 平台自带工具：小程序性能面板、Android Profiler、Xcode Instruments、Flutter DevTools。
   - 线上监控：内存峰值、OOM 率、页面级内存趋势。
   - 静态分析：检测未清理的订阅、定时器、全局监听。

3. **预防策略**
   - 生命周期内成对创建/销毁：定时器、监听、动画控制器。
   - 避免全局单例持有页面上下文。
   - 图片使用合适尺寸和缓存策略。
   - 大数据列表使用虚拟化。

4. **治理流程**
   - 建立内存基线，超过阈值告警。
   - 线上 OOM 时自动上报堆栈和内存快照（脱敏）。
   - 定期灰度验证，修复后回归测试。

**评分维度**：
- 能列举跨端常见内存问题（30%）
- 能说明检测手段（25%）
- 能说明预防和治理策略（35%）
- 能提到监控和基线（10%）

**常见错误**：
- 只在开发时用 DevTools 看一次内存，没有线上监控。
- 页面卸载不清理副作用。
- 把页面实例传给全局工具函数。

**延伸追问**：
- 小程序中如何定位 setData 导致的内存上涨？
- RN 中如何排查由于闭包导致的组件无法释放？

**相关题目**：
- [FB-17-SD-R-027 性能监控设计](#FB-17-SD-R-027)
- [FB-17-PE-A-047 RN 列表优化](#FB-17-PE-A-047)

**参考资源**：
- [Flutter DevTools Memory](https://docs.flutter.dev/tools/devtools/memory)

**口头回答版**：
> 跨端内存问题包括页面副作用没清理、图片缓存大、闭包引用等。检测用工具体具加线上 OOM 监控，预防要在生命周期内成对创建销毁、避免全局持有上下文、图片按需缓存。治理要建立内存基线，超阈值告警，定期回归。

---

### FB-17-SD-P-052：如何设计一个跨端组件库？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：跨端、组件库、组件、设计系统、Monorepo
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个同时支持 H5、微信小程序、React Native 的跨端组件库，说明架构分层、平台适配和发布策略。

**参考答案**：

1. **架构分层**
   - **Design Tokens**：颜色、字体、间距、阴影、圆角等变量。
   - **Core 层**：平台无关的逻辑、类型、工具函数。
   - **Adapter 层**：封装平台差异（事件、动画、布局、API）。
   - **Component 层**：基于 Core + Adapter 实现组件。
   - **Platform 层**：按平台输出产物（h5、weapp、rn）。

2. **平台适配**
   - 公共 API 抽象：统一 Props 和事件回调。
   - 平台专属实现：如弹层在 H5 用 div fixed，小程序用原生组件，RN 用 Modal。
   - 条件编译或运行时判断：Taro/UniApp 用条件编译，RN 用平台文件 `.ios.js` / `.android.js`。

3. **样式方案**
   - 使用 Design Tokens 保证视觉一致。
   - H5/RN 用 CSS-in-JS 或 StyleSheet，小程序用 WXSS/SCSS。
   - 响应式和安全区、暗黑模式统一适配。

4. **工程化和发布**
   - Monorepo 管理，Changesets 版本发布。
   - 每个平台单独构建产物，按需引入。
   - 文档站 + 示例工程 + 视觉回归测试。

5. **质量保障**
   - 单元测试覆盖核心逻辑。
   - 各端示例应用人工 + 自动化验证。
   - API 变更走破坏性变更评审。

**评分维度**：
- 能给出清晰分层设计（30%）
- 能说明平台适配策略（30%）
- 能说明样式和 Design Token 方案（20%）
- 能提到工程化和质量保障（20%）

**常见错误**：
- 组件库直接依赖某平台 API，无法迁移。
- 各端样式各自维护，视觉不一致。
- 没有版本管理，导致应用引用混乱。

**延伸追问**：
- 如何处理 Button 组件在各端的默认样式差异？
- 组件库更新后如何通知所有应用升级？

**相关题目**：
- [FB-17-SD-R-026 跨端组件库设计](#FB-17-SD-R-026)
- [FB-17-SD-R-058 跨端统一设计系统](#FB-17-SD-R-058)

**参考资源**：
- [Atomic Design](https://atomicdesign.bradfrost.com/)

**口头回答版**：
> 跨端组件库分 Design Tokens、Core、Adapter、Component、Platform 五层。公共 API 统一，平台差异在 Adapter 层用条件编译或平台文件处理。样式用 Design Tokens 保持一致，Monorepo 管理，按平台发产物，配套文档、示例和测试。

---

### FB-17-CD-P-053：手写一个跨端网络请求库封装

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：跨端、网络请求、请求封装、错误处理、鉴权
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请实现一个跨端请求库，统一封装 H5 的 fetch、小程序的 wx.request、RN 的 fetch，支持拦截器、统一错误处理和 Token 注入。

**参考答案**：

```ts
// request.ts
const isMiniProgram = typeof wx !== 'undefined' && wx.request;

type RequestConfig = {
  url: string;
  method?: 'GET' | 'POST';
  data?: any;
  headers?: Record<string, string>;
};

type Interceptor = {
  request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  response?: (res: any) => any;
  error?: (err: any) => any;
};

class CrossPlatformRequest {
  private interceptors: Interceptor[] = [];

  use(interceptor: Interceptor) {
    this.interceptors.push(interceptor);
  }

  async request<T = any>(config: RequestConfig): Promise<T> {
    let cfg = config;
    for (const ic of this.interceptors) {
      if (ic.request) cfg = await ic.request(cfg);
    }

    try {
      let res: any;
      if (isMiniProgram) {
        res = await new Promise((resolve, reject) => {
          wx.request({
            url: cfg.url,
            method: cfg.method || 'GET',
            data: cfg.data,
            header: cfg.headers,
            success: resolve,
            fail: reject
          });
        });
      } else {
        res = await fetch(cfg.url, {
          method: cfg.method || 'GET',
          headers: cfg.headers,
          body: cfg.data ? JSON.stringify(cfg.data) : undefined
        }).then(r => r.json());
      }

      for (const ic of this.interceptors) {
        if (ic.response) res = await ic.response(res);
      }
      return res;
    } catch (err) {
      for (const ic of this.interceptors) {
        if (ic.error) err = await ic.error(err);
      }
      throw err;
    }
  }
}

const http = new CrossPlatformRequest();

// 注入 Token
http.use({
  request: async (config) => {
    const token = await storage.get('token');
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  },
  error: (err) => {
    if (err.statusCode === 401) {
      // 触发登录态失效
    }
    throw err;
  }
});

export default http;
```

关键点：
- 统一配置和响应格式。
- 拦截器链按顺序执行。
- 错误处理统一收口。
- 平台差异收敛到请求底层。

**评分维度**：
- 能设计统一 API 和拦截器链（30%）
- 能正确处理平台差异（30%）
- 能实现 Token 注入和错误处理（25%）
- 代码可扩展性和类型安全（15%）

**常见错误**：
- 拦截器顺序混乱导致 Token 未注入。
- 小程序和 H5 响应结构不一致。
- 401 错误没有统一处理导致多处重复。

**延伸追问**：
- 如何实现请求取消和防抖？
- 如何处理小程序并发请求数限制？

**相关题目**：
- [FB-17-CD-A-046 跨端 Storage 封装](#FB-17-CD-A-046)
- [FB-17-SC-A-042 登录态同步](#FB-17-SC-A-042)

**参考资源**：
- [Axios 拦截器设计](https://axios-http.com/docs/interceptors)

**口头回答版**：
> 跨端请求库要统一封装 H5 fetch、小程序 wx.request、RN fetch，支持拦截器、统一错误处理和 Token 注入。先让拦截器处理请求配置，再按平台发请求，最后走响应拦截。错误统一收口，401 时触发登录态失效。

---

### FB-17-FS-P-054：Electron 的进程模型和上下文隔离机制是怎样的？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：Electron、进程、contextIsolation、安全、沙箱
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请深入说明 Electron 的进程模型、contextIsolation 的作用机制，以及为什么它是安全关键。

**参考答案**：

1. **Electron 进程模型**
   - **主进程**：唯一，负责创建窗口、系统 API、生命周期。
   - **渲染进程**：每个 BrowserWindow 一个，运行 Web 内容。
   - **GPU 进程**：处理 GPU 渲染，类似 Chromium。
   - **工具进程 / Node 集成**：preload 脚本可访问 Node.js。

2. **contextIsolation 机制**
   - 开启后，preload 脚本的 JavaScript 上下文与页面 JavaScript 上下文隔离。
   - 页面脚本无法直接访问 preload 中的变量和 Node.js API。
   - `contextBridge.exposeInMainWorld` 是唯一安全暴露通道。

3. **为什么关键**
   - 防止外部网页或 XSS 脚本通过页面 JS 访问 Node.js。
   - 即使页面被注入恶意脚本，也无法执行文件系统操作或启动子进程。
   - 是 Electron 安全最佳实践的核心。

4. **与 sandbox 配合**
   - `sandbox: true` 进一步限制渲染进程的系统调用。
   - 结合 `contextIsolation` 和 `nodeIntegration: false` 构成纵深防御。

**评分维度**：
- 能说明 Electron 多进程模型（25%）
- 能说明 contextIsolation 的隔离机制（35%）
- 能解释其对安全的意义（25%）
- 能提到 sandbox 和 nodeIntegration 配合（15%）

**常见错误**：
- 认为 contextIsolation 会阻止 preload 访问 Node.js。
- 关闭 contextIsolation 导致页面脚本可访问 Node API。
- 混淆 contextIsolation 和 sandbox 的作用。

**延伸追问**：
- 如果 preload 需要暴露一个复杂对象给页面，如何安全实现？
- Electron 的 sandbox 模式对原生模块有什么影响？

**相关题目**：
- [FB-17-CO-B-007 Electron 主进程和渲染进程](#FB-17-CO-B-007)
- [FB-17-SE-A-013 Electron 安全](#FB-17-SE-A-013)

**参考资源**：
- [Electron Context Isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation)

**口头回答版**：
> Electron 有主进程、渲染进程、GPU 进程。contextIsolation 让 preload 和页面 JS 上下文隔离，页面无法直接访问 Node.js，只能通过 contextBridge 暴露的方法访问。这是安全关键，配合 sandbox 和关闭 nodeIntegration 形成纵深防御。

---

### FB-17-SC-P-055：跨端应用中的音视频播放方案如何设计？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：跨端、动画、原生渲染、性能优化、混合开发
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个跨端音视频播放方案，覆盖 H5、小程序、React Native/Flutter App，并说明各端技术选型和一致性保证。

**参考答案**：

1. **H5 端**
   - 使用 HTML5 `<video>` / `<audio>` 或 Video.js、DPlayer。
   - 支持 HLS、DASH、MP4。
   - 注意自动播放策略、全屏兼容、画中画。

2. **小程序端**
   - 使用 `<video>` / `<audio>` 原生组件。
   - 支持同层渲染，注意 cover-view 覆盖问题。
   - 视频预加载和缓存策略受平台限制。

3. **RN 端**
   - 使用 react-native-video，支持 ExoPlayer/Android MediaPlayer 和 iOS AVPlayer。
   - 复杂场景可用原生模块封装。

4. **Flutter 端**
   - 使用 video_player + chewie，或自研基于 PlatformView 的原生播放器。
   - 追求性能可用原生视图嵌入。

5. **一致性保证**
   - 统一播放器状态机：idle、loading、playing、paused、error、ended。
   - 统一播放事件和错误码映射。
   - 统一进度、音量、全屏、倍速 API。
   - 播放器 UI 层基于跨端组件库实现。

6. **性能与体验**
   - 首帧预加载、码率自适应、缓存策略。
   - 后台播放、音频焦点、耳机控制统一处理。

**评分维度**：
- 能给出各端技术选型（30%）
- 能设计统一状态机和 API（30%）
- 能说明一致性保证方案（25%）
- 能提到性能和后台播放（15%）

**常见错误**：
- 各端播放器事件不一致，业务层难以复用。
- 忽略小程序原生组件的层级限制。
- 没有统一错误处理，用户体验不一致。

**延伸追问**：
- 如何实现跨端播放器进度同步（如同一个账号多端续播）？
- 小程序视频全屏时如何叠加自定义控件？

**相关题目**：
- [FB-17-SC-P-022 原生模块开发](#FB-17-SC-P-022)
- [FB-17-SD-R-052 跨端组件库设计](#FB-17-SD-R-052)

**参考资源**：
- [微信小程序 video 组件](https://developers.weixin.qq.com/miniprogram/dev/component/video.html)

**口头回答版**：
> 跨端音视频 H5 用 video 标签或 Video.js，小程序用原生 video 组件，RN 用 react-native-video，Flutter 用 video_player。统一播放器状态机和事件，统一进度、音量、全屏、倍速 API。注意小程序层级限制、各端后台播放和缓存策略。

---

### FB-17-PE-P-056：跨端应用的包体积优化有哪些深入手段？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：17 跨端技术
**标签**：跨端、包体积、资源优化、懒加载、性能优化
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请从代码、资源、框架、构建等角度，深入说明跨端应用（小程序、RN、Flutter、H5）的包体积优化手段。

**参考答案**：

1. **代码优化**
   - Tree Shaking / Dead Code Elimination。
   - 按需引入库，避免全量引入（如 lodash -> lodash-es）。
   - 代码压缩、混淆、拆分 vendor 和业务代码。

2. **资源优化**
   - 图片：压缩、WebP/AVIF、CDN、雪碧图、SVG 替代。
   - 字体：子集化、使用系统字体。
   - 音视频：按需加载，预加载策略控制。

3. **框架和运行时**
   - 小程序：分包、独立分包、组件按需注入。
   - RN：Hermes 引擎减小包体积和提升启动速度。
   - Flutter：移除未使用字体、图片压缩、split-debug-info、deferred components（Android）。
   - H5：路由懒加载、Prefetch/Preload 策略。

4. **构建优化**
   - 分析包体积：webpack-bundle-analyzer、Flutter devtools。
   - 产物去重，避免多版本依赖。
   - 动态加载非核心模块。

5. **监控与治理**
   - CI 中设置包体积阈值，超标阻断。
   - 建立包体积增长趋势图，按模块归因。
   - 定期清理历史遗留代码和资源。

**评分维度**：
- 能从代码和资源角度优化（30%）
- 能结合具体跨端平台说明（35%）
- 能说明构建分析和监控治理（25%）
- 能提到按需加载和动态组件（10%）

**常见错误**：
- 只压缩代码，忽略图片和字体。
- 全量引入第三方库。
- 没有 CI 包体积门禁，体积持续膨胀。

**延伸追问**：
- Flutter 包体积大的主要原因是什么？
- 如何评估分包对启动速度的影响？

**相关题目**：
- [FB-17-PE-A-039 首屏加载优化](#FB-17-PE-A-039)
- [FB-17-SD-R-064 跨端性能度量基线](#FB-17-SD-R-064)

**参考资源**：
- [Flutter 包体积优化](https://docs.flutter.dev/perf/app-size)

**口头回答版**：
> 跨端包体积优化要从代码 Tree Shaking、按需引入、资源压缩，到框架层的小程序分包、RN Hermes、Flutter 字体图片优化，再到构建分析和 CI 体积门禁。关键是定期分析、按模块归因、超标阻断。

---

## 架构题（29 道）{#architect-2}

### FB-17-SD-R-057：如何设计跨端微前端架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、微前端、架构、组件、设计系统
**出现频率**：低频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个跨端（H5、小程序、RN/Flutter App）微前端架构，说明子应用拆分、通信、部署和治理策略。

**参考答案**：

1. **拆分策略**
   - 按业务域拆分子应用：首页、商品、订单、我的等。
   - 按平台输出不同产物：H5 用 qiankun/single-spa，小程序用分包/插件，App 用 RN 动态加载或 Flutter deferred components。

2. **运行时容器**
   - H5：微前端框架提供沙箱、路由、生命周期管理。
   - 小程序：主包作为基座，分包或独立分包作为子应用。
   - App：原生导航 + 跨端引擎动态加载业务 Bundle。

3. **子应用通信**
   - 全局状态中心：登录态、用户信息、主题配置。
   - 事件总线：跨子应用广播。
   - URL 路由参数：页面级传参。

4. **部署和版本**
   - 各子应用独立 CI/CD，独立发布。
   - 基座应用维护子应用版本映射表。
   - 支持灰度发布和回滚。

5. **治理策略**
   - 统一设计系统和组件库，避免视觉割裂。
   - 统一错误监控和性能采集。
   - 子应用接入规范和契约测试。

**评分维度**：
- 能给出合理的拆分策略（25%）
- 能说明各端运行时容器（25%）
- 能说明通信和部署方案（25%）
- 能提到治理和一致性（25%）

**常见错误**：
- 子应用拆分过细，管理成本爆炸。
- 各子应用各自维护 UI，体验不一致。
- 没有版本映射，基座和子应用版本不匹配。

**延伸追问**：
- 微前端在小程序中如何避免子应用样式污染？
- 子应用独立发布后，基座如何感知并加载最新版本？

**相关题目**：
- [FB-17-SD-R-024 大型跨端应用架构](#FB-17-SD-R-024)
- [FB-17-SD-R-052 跨端组件库设计](#FB-17-SD-R-052)

**参考资源**：
- [Micro Frontends](https://micro-frontends.org/)

**口头回答版**：
> 跨端微前端按业务域拆分子应用，H5 用微前端框架，小程序用分包/插件，App 动态加载 Bundle。通信用全局状态和事件总线，各子应用独立 CI/CD，基座维护版本映射。还要统一设计系统、监控和接入规范。

---

### FB-17-SD-R-058：如何构建跨端统一设计系统？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、设计系统、组件库、暗黑模式、安全区
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个跨端统一设计系统，覆盖 Design Tokens、组件、图标、字体、主题和响应式适配。

**参考答案**：

1. **Design Tokens**
   - 颜色、字体、间距、圆角、阴影、动效等原子变量。
   - 用 JSON/YAML/JSON5 定义，输出到各端：CSS 变量、Dart ThemeData、JS 对象。

2. **跨端组件库**
   - 基于 Tokens 构建 Button、Input、Dialog、List 等组件。
   - 统一 API 设计，平台差异下沉到 Adapter。
   - 支持 H5、小程序、RN、Flutter 多平台输出。

3. **图标和字体**
   - 图标使用 SVG/IconFont，按平台输出字体文件或组件。
   - 字体子集化，控制包体积。

4. **主题和模式**
   - 支持浅色/深色模式、高对比度模式。
   - 主题切换通过 Tokens 重新映射实现。

5. **响应式与安全区**
   - 定义断点和适配规则。
   - 安全区、刘海屏、折叠屏统一适配。

6. **治理与交付**
   - Figma 设计稿与代码 Tokens 同步。
   - 视觉回归测试和自动化验收。
   - 版本化发布，文档和示例站点。

**评分维度**：
- 能说明 Design Tokens 和输出方式（25%）
- 能说明跨端组件库设计（25%）
- 能说明主题和响应式适配（25%）
- 能提到治理和交付流程（25%）

**常见错误**：
- Tokens 只定义在代码里，设计稿不同步。
- 组件 API 各端差异大，业务无法复用。
- 忽略无障碍和暗黑模式。

**延伸追问**：
- 如何保证设计 Tokens 在设计和开发之间同步更新？
- 跨端组件库如何处理不同平台的交互差异？

**相关题目**：
- [FB-17-SD-R-026 跨端组件库设计](#FB-17-SD-R-026)
- [FB-17-SD-R-057 跨端微前端](#FB-17-SD-R-057)

**参考资源**：
- [Design Tokens W3C](https://www.w3.org/community/design-tokens/)

**口头回答版**：
> 跨端设计系统核心是 Design Tokens，颜色、字体、间距等原子变量输出到各端。基于 Tokens 建跨端组件库，统一 API，平台差异下沉。还要支持暗黑模式、响应式、安全区适配。设计稿和代码要同步，配套视觉回归测试和文档站。

---

### FB-17-SD-R-059：如何设计跨端应用的灰度发布和热更新平台？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、热更新、灰度、CI/CD、安全
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个支持 H5、小程序、RN/Flutter 的跨端灰度发布和热更新平台，说明发布流程、灰度策略、回滚机制和安全校验。

**参考答案**：

1. **平台架构**
   - 发布控制台：管理版本、灰度规则、回滚。
   - 分发服务：按平台、版本、用户群下发 Bundle。
   - 客户端 SDK：拉取、校验、安装、加载热更新包。

2. **发布流程**
   - 代码提交 -> CI 构建 -> 测试环境验证 -> 预发布 -> 灰度 -> 全量。
   - 各端产物：H5 静态资源、小程序分包、RN Bundle、Flutter patch。

3. **灰度策略**
   - 按用户维度：白名单、用户 ID 取模、设备 ID、地域、版本号。
   - 按流量维度：百分比放量、时间段、AB 实验。
   - 按平台维度：iOS/Android、微信/支付宝小程序。

4. **热更新机制**
   - 客户端启动时查询更新，下载差量包。
   - 校验包签名和完整性，防止篡改。
   - 支持立即生效或下次启动生效。

5. **回滚与监控**
   - 实时采集崩溃率、错误率、性能指标。
   - 超过阈值自动熔断回滚。
   - 支持一键全量回滚到上一个稳定版本。

6. **合规与安全**
   - 遵守 iOS 审核规则，避免热更新被下架。
   - 热更新包签名、HTTPS、加密传输。

**评分维度**：
- 能说明平台整体架构（25%）
- 能说明灰度策略（25%）
- 能说明热更新和回滚机制（25%）
- 能提到安全和合规（25%）

**常见错误**：
- 灰度维度单一，无法精细控制。
- 热更新包不做签名校验。
- 没有自动熔断，问题版本扩散快。

**延伸追问**：
- 如何实现小程序的差量热更新？
- iOS 对热更新有哪些限制，如何合规？

**相关题目**：
- [FB-17-SD-R-028 跨端 CI/CD](#FB-17-SD-R-028)
- [FB-17-CO-A-044 Flutter 热重载](#FB-17-CO-A-044)

**参考资源**：
- [CodePush](https://github.com/microsoft/code-push)

**口头回答版**：
> 跨端热更新平台要有发布控制台、分发服务和客户端 SDK。发布走 CI 构建、测试、灰度、全量。灰度按用户、流量、平台多维控制。客户端下载差量包并签名校验，实时监控崩溃率自动熔断回滚。还要注意 iOS 审核合规。

---

### FB-17-SD-R-060：如何设计跨端应用的监控告警体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、性能监控、错误处理、埋点、日志
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个覆盖 H5、小程序、RN/Flutter App 的跨端监控告警体系，包含性能、错误、业务和稳定性监控。

**参考答案**：

1. **数据采集**
   - 性能：启动时间、首屏时间、FPS、内存、包体积、网络耗时。
   - 错误：JS 异常、Native 崩溃、Promise 未捕获、API 错误。
   - 业务：PV/UV、页面停留、转化率、关键路径漏斗。
   - 稳定性：ANR、白屏、卡死、OOM。

2. **数据上报**
   - SDK 统一封装，支持批量、采样、断网缓存。
   - 平台差异：小程序用 wx.request，H5 用 fetch/beacon，App 用原生网络。
   - 用户维度关联：设备 ID、用户 ID、会话 ID、页面路径。

3. **存储与分析**
   - 实时流：Flink/Spark 处理异常和性能事件。
   - 时序数据库：性能指标存储和趋势分析。
   - 日志存储：ELK/SLS，支持链路追踪。

4. **告警与可视化**
   - 按指标设置阈值：错误率 > 1%、P99 启动时间 > 3s 等。
   - 多渠道告警：企业微信、钉钉、邮件、电话。
   - 可视化大盘：分平台、版本、业务域展示。

5. **治理闭环**
   - 异常自动归因：按错误堆栈、版本、机型聚类。
   - 工单流转：自动创建故障单，跟踪修复进度。
   - 复盘机制：P0/P1 故障复盘，沉淀知识库。

**评分维度**：
- 能说明监控指标体系（25%）
- 能说明数据采集和上报方案（25%）
- 能说明存储分析和告警（25%）
- 能提到治理闭环（25%）

**常见错误**：
- 只监控错误，不监控性能。
- 上报数据过多导致用户流量消耗和服务器压力。
- 告警阈值设置不合理，造成告警风暴。

**延伸追问**：
- 如何定位小程序线上的首屏慢问题？
- 跨端错误堆栈如何统一解析和符号化？

**相关题目**：
- [FB-17-SD-R-027 性能监控设计](#FB-17-SD-R-027)
- [FB-17-PE-P-051 内存优化](#FB-17-PE-P-051)

**参考资源**：
- [Sentry Cross Platform](https://docs.sentry.io/platforms/)

**口头回答版**：
> 跨端监控体系要采性能、错误、业务、稳定性四类数据。SDK 统一封装，按平台用不同网络方式上报，关联用户和会话。后端实时流处理，时序库存指标，日志存详情。设置阈值告警，可视化大盘，异常自动归因并流转工单。

---

### FB-17-SD-R-061：跨端技术选型应该建立怎样的决策框架？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、技术选型、架构、团队、成本
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个跨端技术选型决策框架，帮助团队在多个跨端方案中做出合理选择。

**参考答案**：

1. **业务维度**
   - 目标平台：iOS/Android、小程序、H5、桌面端。
   - 业务复杂度：页面数量、交互深度、动画/音视频需求。
   - 迭代速度：是否需要热更新、AB 实验、灰度发布。

2. **技术维度**
   - 性能：启动速度、运行时帧率、内存占用、包体积。
   - 能力：原生 API 支持、第三方生态、社区活跃度。
   - 可维护性：调试体验、测试能力、构建速度。
   - 风险：框架长期维护、大厂背书、升级成本。

3. **团队维度**
   - 技术栈匹配：团队熟悉 React/Vue/Dart/原生。
   - 人员储备：是否需要招聘原生开发。
   - 学习成本和培训投入。

4. **成本维度**
   - 开发成本：一套代码 vs 多套代码。
   - 运维成本：热更新、监控、崩溃处理。
   - 机会成本：上线时间、用户体验折损。

5. **决策流程**
   - 明确目标和约束。
   - 列出候选方案，制作评分卡。
   - 做 POC 验证关键场景（如长列表、动画、原生能力）。
   - 综合打分，形成 ADR 文档，定期复盘。

**评分维度**：
- 能从业务、技术、团队、成本多维分析（40%）
- 能给出具体评估指标（30%）
- 能说明决策流程和 POC 验证（20%）
- 能提到 ADR 和复盘（10%）

**常见错误**：
- 只看开发成本，忽略长期维护和性能。
- 盲目追求一套代码，牺牲用户体验。
- 不做 POC，直接按经验选型。

**延伸追问**：
- 如果业务要求同时支持小程序和 App，Taro 和 Flutter 怎么选？
- 如何说服团队接受一个学习成本较高的方案？

**相关题目**：
- [FB-17-CO-A-015 跨端技术选型](#FB-17-CO-A-015)
- [FB-17-SD-R-057 跨端微前端](#FB-17-SD-R-057)

**参考资源**：
- [Architecture Decision Records](https://adr.github.io/)

**口头回答版**：
> 跨端选型要从业务目标平台、复杂度和迭代速度，技术性能、生态、可维护性，团队技术栈和学习成本，以及开发运维成本来评估。流程是先明确约束，列候选方案做评分卡，关键场景做 POC，最后形成 ADR 并定期复盘。

---

### FB-17-SD-R-062：跨端应用的国际化与本地化架构如何设计？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、国际化、本地化、设计系统、组件
**出现频率**：低频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个跨端应用的国际化（i18n）和本地化（l10n）架构，覆盖语言、时区、货币、排版和合规。

**参考答案**：

1. **文案管理**
   - 使用 ICU MessageFormat 或类似标准定义多语言文案。
   - 文案按模块/页面组织，支持平台覆盖（如小程序和 H5 文案差异）。
   - 翻译平台与代码仓库同步，支持翻译版本管理。

2. **运行时切换**
   - 语言包按地区拆分，按需加载。
   - 支持运行时切换语言，状态不丢失。
   - 兜底策略：找不到翻译时回退到默认语言。

3. **本地化适配**
   - 日期/时间/数字/货币使用 Intl API 或平台原生格式化。
   - 复数规则、性别、敬语等特殊语法。
   - RTL（从右到左）语言布局适配。

4. **跨端一致**
   - 文案和设计 Tokens 结合，避免硬编码。
   - 组件库内部支持 i18n，业务层传入语言包。
   - 错误码统一映射为本地化提示。

5. **合规与测试**
   - 敏感文案走法务审核。
   - 伪本地化测试（pseudolocalization）提前发现布局问题。
   - 自动化检查未翻译文案和占位符错误。

**评分维度**：
- 能说明文案管理和运行时加载（25%）
- 能说明本地化和 RTL 适配（25%）
- 能说明跨端一致方案（25%）
- 能提到合规和测试（25%）

**常见错误**：
- 文案散落在代码各处，难以维护。
- 只翻译文字，不处理日期/货币/复数。
- 忽略 RTL 布局导致的显示问题。

**延伸追问**：
- 如何处理不同地区对同一功能的文案合规差异？
- 小程序和 H5 如何实现语言包共享？

**相关题目**：
- [FB-17-SD-R-058 跨端统一设计系统](#FB-17-SD-R-058)
- [FB-17-SC-P-023 屏幕适配](#FB-17-SC-P-023)

**参考资源**：
- [ICU MessageFormat](https://unicode-org.github.io/icu/userguide/format_parse/messages/)

**口头回答版**：
> 跨端国际化要用标准格式管理文案，按模块组织，支持按需加载和运行时切换。本地化要处理日期、货币、复数、RTL 布局。组件库内部支持 i18n，业务层传语言包。还要做法务审核、伪本地化测试和未翻译检查。

---

### FB-17-SD-R-063：跨端应用如何与原生应用形成混合架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、混合开发、Native、原生渲染、迁移
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个既有原生应用又有跨端模块的混合架构，说明集成方式、通信协议、迁移策略和风险控制。

**参考答案**：

1. **集成方式**
   - RN/Flutter Add-to-App：在原生工程中嵌入跨端页面/模块。
   - WebView 嵌入 H5：适合营销活动、内容展示。
   - 原生小程序：原生 App 内嵌小程序运行时。

2. **通信协议**
   - 定义统一路由协议，原生和跨端模块通过 URL/Schema 互相跳转。
   - 事件总线或 Native Bridge 传递状态和事件。
   - 共享登录态、用户信息等全局状态。

3. **迁移策略**
   - 从低频、低耦合页面开始试点迁移。
   - 新业务优先用跨端，老业务逐步替换。
   - 建立共享业务层，UI 层各端独立。

4. **架构分层**
   - 基础层：网络、存储、埋点、登录等统一 SDK。
   - 业务中台：跨端共享的业务逻辑和数据层。
   - 表现层：原生 / RN / Flutter / H5 各自实现。

5. **风险控制**
   - 性能基线：跨端模块性能不得低于原生的可接受阈值。
   - 灰度发布：小流量验证后再全量。
   - 降级方案：跨端页面异常时回退到原生或 H5。

**评分维度**：
- 能说明集成方式（25%）
- 能说明通信和状态共享（25%）
- 能说明迁移策略（25%）
- 能提到风险控制和分层（25%）

**常见错误**：
- 一次性全量迁移，风险不可控。
- 跨端模块直接依赖原生实现细节。
- 没有性能基线和降级方案。

**延伸追问**：
- RN/Flutter 和原生页面跳转时如何保持导航栈一致？
- 原生能力缺失时，跨端模块如何优雅降级？

**相关题目**：
- [FB-17-SD-R-029 原生/H5 迁移跨端](#FB-17-SD-R-029)
- [FB-17-SC-P-022 原生模块开发](#FB-17-SC-P-022)

**参考资源**：
- [React Native Add to App](https://reactnative.dev/docs/integration-with-existing-apps)

**口头回答版**：
> 跨端和原生混合可以用 RN/Flutter Add-to-App、WebView 或原生小程序。统一路由协议跳转，事件总线共享状态。迁移从低频低耦合页面试点，新业务优先跨端。分层是基础 SDK、业务中台共享、表现层各端独立，同时设性能基线和降级方案。

---

### FB-17-SD-R-064：跨端应用如何建立性能度量体系和性能基线？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、性能监控、性能优化、APM、指标
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个跨端应用的性能度量体系，定义关键指标、采集方案、基线建设和持续优化机制。

**参考答案**：

1. **关键指标**
   - 启动：冷启动时间、首屏时间、可交互时间。
   - 运行时：FPS、卡顿率、内存峰值、CPU 占用、网络耗时。
   - 包体积：主包大小、总包大小、单页面资源大小。
   - 稳定性：崩溃率、OOM 率、ANR 率、白屏率。

2. **采集方案**
   - 自动埋点：页面生命周期、setData/render、网络请求。
   - 手动埋点：业务自定义首屏点、关键操作耗时。
   - 平台差异：小程序用 Performance API，H5 用 Web Vitals，App 用原生性能接口。

3. **基线建设**
   - 按平台、机型、网络、版本建立分位基线（P50/P90/P99）。
   - 新功能上线前做性能预算（Performance Budget）。
   - CI 中集成包体积、启动耗时门禁。

4. **分析与优化**
   - 性能看板：趋势、同比、环比、异常预警。
   - 慢启动/卡顿归因：链路追踪、资源加载瀑布图。
   - A/B 实验验证优化效果。

5. **持续机制**
   - 定期性能巡检和竞品对标。
   - 性能优化纳入迭代计划，设立 SLA。
   - 重大性能问题纳入故障复盘。

**评分维度**：
- 能定义关键指标体系（30%）
- 能说明采集方案（25%）
- 能说明基线和门禁建设（25%）
- 能提到持续优化机制（20%）

**常见错误**：
- 指标定义不统一，各端口径不一致。
- 只采集不分析，没有优化闭环。
- 没有性能预算，体积和耗时持续增长。

**延伸追问**：
- 如何衡量小程序的“首屏时间”才算准确？
- 性能优化后如何排除网络波动等干扰因素？

**相关题目**：
- [FB-17-SD-R-060 监控告警体系](#FB-17-SD-R-060)
- [FB-17-PE-P-056 包体积优化](#FB-17-PE-P-056)

**参考资源**：
- [Web Vitals](https://web.dev/vitals/)

**口头回答版**：
> 跨端性能度量要定义启动、运行时、包体积、稳定性四类指标，按平台机型网络建立 P50/P90/P99 基线。采集用自动加手动埋点，CI 设性能门禁。通过看板归因、A/B 实验验证优化，定期巡检并对标竞品。

---

### FB-17-SD-R-065：跨端应用的长期演进和技术债务如何治理？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师 / 专家
**面试知识域**：17 跨端技术
**标签**：跨端、重构、工程化、架构、治理
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个跨端应用的长期演进和技术债务治理方案，保证架构可持续演进。

**参考答案**：

1. **债务识别**
   - 代码层面：圈复杂度、重复代码、过时依赖、硬编码平台判断。
   - 架构层面：边界模糊、共享层膨胀、组件库版本分裂。
   - 工程层面：构建慢、测试覆盖低、文档缺失。

2. **债务登记**
   - 建立技术债务登记册，记录影响范围、风险等级、预估成本。
   - 定期 Review，和业务需求一起排期。

3. **治理策略**
   - 高息债务优先：影响稳定性、性能、安全的优先处理。
   - 增量控制：新代码必须满足质量门禁，避免新增债务。
   - 重构计划：大重构拆小步，灰度验证，保留回滚能力。

4. **架构演进**
   - 模块化/微前端：按业务域拆分，降低耦合。
   - 共享层治理：明确共享包职责，版本化管理。
   - 平台抽象：把平台判断收敛到 adapter，业务代码平台无关。

5. **文化和机制**
   - 预留技术债偿还时间，如 20% 迭代带宽。
   - 代码所有权和评审质量。
   - 定期架构 Review 和 ADR 更新。

**评分维度**：
- 能说明债务识别和登记（25%）
- 能说明治理策略和优先级（25%）
- 能说明架构演进方向（25%）
- 能提到文化和机制保障（25%）

**常见错误**：
- 只还新债不还旧债，债务越积越多。
- 一次性大规模重构，风险不可控。
- 没有预留重构时间，永远被业务需求拖着走。

**延伸追问**：
- 如何平衡业务交付压力和技术债务偿还？
- 跨端债务中哪些是最“高息”的？

**相关题目**：
- [FB-17-SD-R-061 跨端技术选型](#FB-17-SD-R-061)
- [FB-17-SD-R-057 跨端微前端](#FB-17-SD-R-057)

**参考资源**：
- [Technical Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)

**口头回答版**：
> 跨端技术债务治理要先识别代码、架构、工程层面的债务，建立登记册按影响和风险排序。高息债务优先还，新代码严把质量关，大重构拆小步灰度验证。同时通过模块化、共享层治理、平台抽象推进架构演进，预留迭代带宽做偿还。

### FB-17-CO-B-039：小程序的 rpx 和 px 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨平台
**标签**：小程序、rpx、px、响应式、单位
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明小程序中 `rpx` 和 `px` 的区别，以及使用场景。

**参考答案**：

一、px：

- 固定像素单位，1px 对应屏幕上的一个物理像素点（不考虑 DPR 时）。
- 在不同设备上显示大小可能不一致。

二、rpx：

- 小程序特有的响应式像素单位。
- 规定屏幕宽度为 750 rpx，自动根据设备宽度进行换算。
- 不同设备上能保持视觉比例一致。

换算关系：

```
1 rpx = 设备屏幕宽度 / 750 px
```

三、使用建议：

- 布局宽度、间距、字体大小优先使用 rpx。
- 边框 1px 等细线可保留 px，避免在某些设备上过粗。
- 大图背景可按设计稿宽度使用 rpx，高度自适应。

四、注意事项：

- rpx 是基于屏幕宽度，不是容器宽度。
- iPad 等宽屏设备上，rpx 会让元素显得过大，需要特殊处理。

**评分维度**：
- px 含义（20%）
- rpx 含义和换算（35%）
- 使用建议（30%）
- 注意事项（15%）

**常见错误**：
- 所有尺寸都写死 px，导致不同设备显示不一致
- 边框也用 rpx，导致细线变粗

**口头回答版**：
> px 是固定像素，rpx 是小程序的响应式单位，把屏幕宽度定为 750 rpx，自动换算。布局尺寸推荐用 rpx 保持比例一致，但 1px 边框建议保留 px。注意 rpx 基于屏幕宽度，iPad 上可能显得大。

---

### FB-17-CO-B-040：React Native 的 Flexbox 布局和 Web 有什么不同？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨平台
**标签**：React Native、Flexbox、布局、跨端
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 React Native 中 Flexbox 与 Web CSS Flexbox 的主要区别。

**参考答案**：

一、默认 flexDirection：

- Web 默认 `flex-direction: row`。
- React Native 默认 `flex-direction: column`。

二、默认 flex：

- React Native 中 `flex` 只接受数字，表示 flex-grow。
- Web 中 flex 是复合属性。

三、不支持的部分属性：

- React Native 不支持 `display: grid`、float、position: fixed（部分支持）、z-index 等。
- 不支持 CSS 继承，很多属性需要在每个组件上单独设置。

四、单位差异：

- React Native 中尺寸一般使用数字（dp），不需要 px。
- 百分比在某些场景支持有限。

五、平台差异：

- Android 和 iOS 对 Yoga 布局引擎的实现基本一致，但仍有细微差异。
- 需要做真机测试。

六、样式写法：

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
```

**评分维度**：
- 默认方向（25%）
- flex 差异（20%）
- 不支持属性（25%）
- 单位差异（15%）
- 平台差异（15%）

**常见错误**：
- 直接照搬 Web CSS 到 React Native
- 使用 React Native 不支持的 CSS 属性

**口头回答版**：
> React Native 的 Flexbox 默认方向是 column，Web 是 row。flex 只接受数字。不支持 grid、float、继承等。尺寸用数字 dp，不写 px。Android 和 iOS 基本一致但要做真机测试。样式用 StyleSheet.create 写。

---

### FB-17-CO-B-041：Flutter 中的 Widget、Element、RenderObject 有什么关系？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨平台
**标签**：Flutter、Widget、Element、RenderObject、三棵树
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Flutter 中 Widget、Element、RenderObject 三者的关系和作用。

**参考答案**：

Flutter 框架使用三棵树来管理 UI：

一、Widget 树：

- Widget 是 UI 的描述，是不可变的轻量对象。
- 每次 setState 都会重建 Widget 树。
- 类似 React 中的 Virtual DOM。

二、Element 树：

- Element 是 Widget 的实例，是可变的。
- 负责连接 Widget 和 RenderObject，管理生命周期。
- StatefulElement 对应 StatefulWidget，持有 State。

三、RenderObject 树：

- RenderObject 负责真正的布局和绘制。
- 处理尺寸、位置、绘制、命中测试等。
- 只有需要渲染的 Widget 才会创建 RenderObject。

关系：

```
Widget（配置） → Element（实例） → RenderObject（渲染）
```

四、更新流程：

1. setState 触发 Widget 重建。
2. Element 对比新 Widget 和旧 Widget（canUpdate）。
3. 如果类型和 key 相同，复用 Element 和 RenderObject。
4. 不同则销毁旧 Element，创建新的。

**评分维度**：
- Widget 作用（25%）
- Element 作用（25%）
- RenderObject 作用（25%）
- 更新流程（25%）

**常见错误**：
- 认为 Widget 就是真正的 UI 元素
- 不理解三棵树的分工

**口头回答版**：
> Flutter 有三棵树：Widget 是不可变的配置描述，Element 是 Widget 实例管理生命周期，RenderObject 负责布局和绘制。Widget 重建时 Element 用 canUpdate 判断能否复用，类型和 key 相同就复用 Element 和 RenderObject。

---

### FB-17-CO-B-042：Electron 中主进程和渲染进程如何通信？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨平台
**标签**：Electron、IPC、主进程、渲染进程、通信
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Electron 中主进程和渲染进程之间的通信方式。

**参考答案**：

一、ipcMain / ipcRenderer：

1. **渲染进程发送，主进程接收**：
   ```js
   // 渲染进程
   ipcRenderer.send('channel', data);
   
   // 主进程
   ipcMain.on('channel', (event, data) => { ... });
   ```

2. **渲染进程调用，主进程返回（invoke/handle）**：
   ```js
   // 渲染进程
   const result = await ipcRenderer.invoke('get-data', params);
   
   // 主进程
   ipcMain.handle('get-data', async (event, params) => { return data; });
   ```

二、preload 脚本：

- 渲染进程不直接访问 ipcRenderer，通过 preload 暴露安全的 API。
- 推荐启用 `contextIsolation: true`。

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  getData: (params) => ipcRenderer.invoke('get-data', params)
});
```

三、其他方式：

1. **localStorage / IndexedDB**：共享存储。
2. **MessagePort**：主进程和渲染进程间建立双向通信通道。

四、安全建议：

- 不要暴露完整的 ipcRenderer 给渲染进程。
- 对 IPC 消息做校验。
- 使用 `invoke/handle` 替代 `send/on` 做请求响应。

**评分维度**：
- ipcMain/ipcRenderer（40%）
- invoke/handle（25%）
- preload 安全封装（20%）
- 安全建议（15%）

**常见错误**：
- 直接把 ipcRenderer 暴露给渲染进程
- IPC 通道不做权限控制

**口头回答版**：
> Electron 主进程和渲染进程用 ipcMain/ipcRenderer 通信。渲染进程用 invoke 调用，主进程用 handle 处理并返回。通过 preload 脚本暴露安全 API，不要直接把 ipcRenderer 给渲染进程。还要对消息做校验，启用 contextIsolation。

---

### FB-17-CO-B-043：什么是小程序的 setData？为什么要避免频繁调用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：17 跨平台
**标签**：小程序、setData、性能、跨线程通信
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释小程序中 `setData` 的作用，以及为什么要避免频繁调用。

**参考答案**：

一、setData 作用：

- 小程序逻辑层调用 `setData` 将数据发送到渲染层。
- 渲染层收到数据后更新 DOM/视图。

```js
this.setData({
  name: 'Tom'
});
```

二、为什么要避免频繁调用：

1. **跨线程通信开销**：
   - 逻辑层和渲染层在不同线程/进程，每次 setData 都要序列化数据并通过 JSBridge 传递。

2. **数据量过大**：
   - 传递大数据对象会占用内存和带宽。

3. **阻塞渲染**：
   - 频繁的 setData 会导致渲染层来不及处理，造成卡顿。

4. **setData 是同步调用异步渲染**：
   - 连续多次 setData 无法保证立即生效。

三、优化方法：

1. 合并多次 setData：
   ```js
   this.setData({ a: 1, b: 2, c: 3 });
   ```

2. 只更新必要字段，避免传整个对象。
3. 列表数据分页加载，不要一次性 setData 大量数据。
4. 动画等高频更新考虑使用 CSS 动画或 canvas。

**评分维度**：
- setData 作用（25%）
- 避免频繁原因（40%）
- 优化方法（35%）

**常见错误**：
- 每个字段变化都单独 setData
- setData 里传大量无关数据

**口头回答版**：
> 小程序 setData 把逻辑层数据发到渲染层更新视图。因为逻辑层和渲染层跨线程通信，频繁调用会序列化大量数据、阻塞渲染。优化要合并 setData、只传必要字段、分页加载，高频动画用 CSS 或 canvas。

---

### FB-17-CO-A-045：Taro 和 UniApp 的运行时适配层是怎么工作的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：Taro、UniApp、运行时、适配层、跨端编译
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Taro 和 UniApp 的运行时适配层是如何将 React/Vue 代码转换为各小程序平台可运行的代码的。

**参考答案**：

一、编译阶段：

1. **Taro**：
   - 使用 Babel 将 React/Vue 组件编译为小程序的 WXML/WXSS/JS/JSON。
   - JSX 模板编译为小程序模板语法。

2. **UniApp**：
   - 使用 Vue 单文件组件作为源码。
   - 编译为各平台的页面和组件文件。

二、运行时适配层：

1. **组件映射**：
   - React/Vue 组件映射为小程序原生组件。
   - 例如 `<View>` → `<view>`、`<Text>` → `<text>`。

2. **事件系统**：
   - 将 React/Vue 事件绑定转换为小程序事件绑定。
   - 处理事件委托和事件对象差异。

3. **状态管理**：
   - 在小程序逻辑层维护 React/Vue 的运行时状态。
   - 数据变化时通过 setData 同步到渲染层。

4. **生命周期映射**：
   - React/Vue 生命周期映射到小程序页面/组件生命周期。

5. **API 封装**：
   - 提供统一的 API 层（Taro API / uni API）。
   - 内部根据平台调用对应原生 API。

三、差异：

- Taro 更强调 React/Vue 语法一致性，运行时较重。
- UniApp 以 Vue 为主，编译产物更接近小程序原生。

**评分维度**：
- 编译阶段（20%）
- 运行时适配层（50%）
- API 和生命周期（15%）
- Taro/UniApp 差异（15%）

**常见错误**：
- 认为 Taro/UniApp 只是简单替换标签名
- 不了解运行时状态同步机制

**口头回答版**：
> Taro 和 UniApp 先把 React/Vue 代码编译成小程序的页面文件，运行时通过适配层做组件映射、事件转换、生命周期映射、API 封装。数据变化时在逻辑层维护状态，通过 setData 同步到渲染层。Taro 更强调语法一致，UniApp 编译产物更接近原生。

---

### FB-17-CO-A-046：小程序的双线程模型有什么优势和限制？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：小程序、双线程、逻辑层、渲染层、安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明小程序双线程模型的优势和限制。

**参考答案**：

一、双线程模型：

小程序将逻辑层（JS）和渲染层（WebView/Skyline）分离，运行在不同线程/进程，通过 JSBridge 通信。

二、优势：

1. **安全性**：
   - JS 无法直接访问 DOM，降低 XSS 等攻击风险。
   - 沙箱化运行，隔离不同小程序。

2. **稳定性**：
   - JS 执行不会阻塞页面渲染。
   - 单个小程序崩溃不影响宿主应用。

3. **可控性**：
   - 平台可以精确控制 JS 执行时机和资源使用。
   - 便于实现预加载、分包等优化。

三、限制：

1. **通信开销**：
   - 逻辑层和渲染层通信需要序列化数据，setData 频繁时性能下降。

2. **DOM 操作受限**：
   - 无法像 H5 那样自由操作 DOM。
   - 一些 Web API 不可用。

3. **开发体验差异**：
   - 不能直接使用 npm 生态的所有库。
   - 调试工具不如浏览器完善。

4. **内存限制**：
   - 每个小程序有独立的 JS 运行环境，内存受限。

**评分维度**：
- 双线程模型说明（20%）
- 优势（35%）
- 限制（35%）
- 结合实际影响（10%）

**常见错误**：
- 只谈优势不谈限制
- 认为双线程模型没有性能开销

**口头回答版**：
> 小程序双线程把逻辑层和渲染层分开，优势是安全、稳定、可控，JS 不会阻塞渲染。限制是跨线程通信有开销，setData 频繁会卡，不能自由操作 DOM，Web API 受限，内存也有限制。

---

### FB-17-CO-A-047：React Native 的 Hermes 引擎有什么优势？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：React Native、Hermes、JS 引擎、性能
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 React Native 使用 Hermes 引擎的优势。

**参考答案**：

Hermes 是 Facebook 为 React Native 开发的 JavaScript 引擎，替代原来的 JSC（JavaScriptCore）。

优势：

1. **启动速度更快**：
   - Hermes 采用 AOT（Ahead-of-Time）编译，在打包时预编译字节码。
   - 运行时不需要解析完整 JS，减少启动时间。

2. **包体积更小**：
   - 预编译后的字节码比原始 JS 更小。
   - 同时 Hermes 引擎自身体积也小于 JSC。

3. **内存占用更低**：
   - 垃圾回收策略针对移动设备优化。
   - 减少内存峰值和抖动。

4. **更好的调试支持**：
   - 支持 Flipper 调试。
   - 崩溃堆栈更友好。

5. **TTI 优化**：
   - 显著降低 Time To Interactive。

注意事项：

- Hermes 不支持 JIT（Just-in-Time），纯 CPU 密集型计算可能略慢于 JSC。
- 需要 Android 5.0+。

**评分维度**：
- 启动速度（25%）
- 包体积（20%）
- 内存（20%）
- 调试支持（15%）
- 注意事项（20%）

**常见错误**：
- 认为 Hermes 所有场景都比 JSC 快
- 忽略 Hermes 不支持 JIT 的代价

**口头回答版**：
> Hermes 是 React Native 专门的 JS 引擎。优势是启动快，因为打包时预编译字节码；包体积小；内存占用低；调试支持好，崩溃堆栈清晰。但它不支持 JIT，纯计算场景可能不如 JSC。

---

### FB-17-CO-A-048：Flutter 的 Dart 语言有什么特点？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：Flutter、Dart、语言特性、跨端
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Dart 语言的主要特点，以及它为什么适合 Flutter。

**参考答案**：

一、Dart 特点：

1. **面向对象**：
   - 一切皆对象，支持类、接口、混入（mixin）、泛型。

2. **强类型**：
   - 支持静态类型检查，同时允许 `dynamic` 和 `var` 简化代码。

3. **支持 JIT 和 AOT**：
   - 开发时用 JIT 支持热重载（Hot Reload）。
   - 发布时用 AOT 编译为机器码，性能接近原生。

4. **单线程事件循环**：
   - 使用 isolate 实现并发，避免共享内存问题。
   - 异步编程通过 async/await 和 Future/Stream。

5. **垃圾回收**：
   - 分代垃圾回收，UI 线程和 GC 线程并行。

二、为什么适合 Flutter：

1. AOT 编译保证高性能。
2. JIT 支持开发时热重载，提升开发效率。
3. 单线程模型简化 UI 编程，避免多线程竞争。
4. Dart 可以直接编译为 ARM/x86 机器码，不需要 JS bridge。

**评分维度**：
- 面向对象和类型（25%）
- JIT/AOT（30%）
- 异步模型（20%）
- 适合 Flutter 的原因（25%）

**常见错误**：
- 认为 Dart 是解释型语言
- 不理解 JIT/AOT 对 Flutter 的意义

**口头回答版**：
> Dart 是面向对象、强类型语言，支持 JIT 和 AOT。开发时用 JIT 支持热重载，发布用 AOT 编译机器码。单线程事件循环加 isolate 并发，async/await 处理异步。适合 Flutter 是因为高性能、热重载、单线程模型简单、不需要 JS bridge。

---

### FB-17-CO-A-049：Electron 应用如何打包和自动更新？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：Electron、打包、自动更新、electron-builder、Squirrel
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用的打包和自动更新方案。

**参考答案**：

一、打包工具：

1. **electron-builder**：
   - 配置简单，支持多平台打包。
   - 自动生成安装包（exe、dmg、AppImage 等）。

2. **electron-forge**：
   - 官方推荐，插件化更强。

二、打包配置示例：

```json
{
  "build": {
    "appId": "com.example.app",
    "productName": "MyApp",
    "directories": {
      "output": "dist"
    },
    "mac": { "target": "dmg" },
    "win": { "target": "nsis" }
  }
}
```

三、自动更新方案：

1. **electron-updater**：
   - 配合 electron-builder 使用。
   - 支持从私有服务器、S3、GitHub Releases 获取更新。

2. **更新流程**：
   ```js
   const { autoUpdater } = require('electron-updater');
   autoUpdater.checkForUpdatesAndNotify();
   ```

3. **增量更新**：
   - Windows 可用 differential updater。
   - macOS 受限于 Apple 签名，通常全量更新。

四、注意事项：

1. 应用需要代码签名，否则自动更新会被系统拦截。
2. 更新服务器需要稳定可靠，支持断点续传。
3. 大版本更新建议引导用户手动下载。
4. 更新前做好数据备份提示。

**评分维度**：
- 打包工具（25%）
- 打包配置（15%）
- 自动更新（35%）
- 注意事项（25%）

**常见错误**：
- 没有代码签名就部署自动更新
- 更新服务器不稳定导致用户无法升级

**口头回答版**：
> Electron 打包常用 electron-builder，配置简单，支持多平台。自动更新用 electron-updater，可以从服务器或 GitHub Releases 拉更新。Windows 支持增量更新，macOS 一般需要全量。注意要做代码签名，更新服务器要稳定，大版本引导用户手动下载。

---

### FB-17-FS-P-055：小程序 Skyline 的架构演进是怎样的？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：小程序、Skyline、渲染引擎、架构
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明微信小程序 Skyline 渲染引擎相比 WebView 的架构变化。

**参考答案**：

一、WebView 渲染：

1. 逻辑层 JS 在 JSCore/V8 中运行。
2. 渲染层使用 WebView 解析 WXML/WXSS。
3. 通过 setData 和 JSBridge 通信，存在序列化和线程间通信开销。

二、Skyline 渲染：

1. **移除 WebView**：
   - 使用自绘渲染引擎直接绘制 UI。
   - 减少 WebView 的内存占用和启动耗时。

2. **同层渲染优化**：
   - 原生组件（如 video、map）与 Skyline 渲染层更紧密结合。

3. **更好的动画性能**：
   - 支持更复杂的动画和手势。
   - Worklet 可以在渲染线程直接执行动画逻辑。

4. **按需渲染**：
   - 只渲染可视区域和变化区域。

三、架构变化：

- 从“JS 逻辑 + WebView 渲染”演进为“JS 逻辑 + Skyline 自绘引擎”。
- 逻辑层和渲染层通信机制优化，降低 setData 开销。

四、注意事项：

- Skyline 目前仍在完善，部分 CSS 和组件特性不支持。
- 需要根据业务场景选择 WebView 还是 Skyline。

**评分维度**：
- WebView 架构（20%）
- Skyline 改进（40%）
- 架构演进（20%）
- 注意事项（20%）

**常见错误**：
- 认为 Skyline 完全替代 WebView
- 忽略 Skyline 的兼容性问题

**口头回答版**：
> 小程序传统用 WebView 渲染，逻辑层和渲染层通过 setData 通信。Skyline 是自绘渲染引擎，移除 WebView，减少内存和启动耗时，动画性能更好，支持 Worklet。但还在完善，有些特性不兼容，要根据场景选择。

---

### FB-17-FS-P-056：React Native 的 Fabric 和 TurboModules 解决了什么问题？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：React Native、Fabric、TurboModules、新架构
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 React Native 新架构中的 Fabric 渲染器和 TurboModules 解决了什么问题。

**参考答案**：

一、旧架构问题：

1. **Bridge 瓶颈**：
   - JS 和 Native 通过异步 JSON 序列化通信，高频交互卡顿。

2. **Native Modules 加载慢**：
   - 所有 Native Modules 在启动时全部初始化，即使未使用。

3. **线程模型限制**：
   - UI 操作必须在主线程，难以利用多核。

二、Fabric 渲染器：

1. 新渲染层，使用 C++ 的 Shadow Tree 统一 iOS/Android 渲染逻辑。
2. 支持同步测量和布局，减少布局抖动。
3. 更好的并发和优先级支持。

三、TurboModules：

1. 按需加载 Native Modules，启动更快。
2. 使用 JSI 直接调用 Native 方法，类型安全，性能更高。
3. 支持 C++ 共享代码，减少双端重复实现。

四、JSI（JavaScript Interface）：

- 替代旧的 Bridge，允许 JS 直接持有 C++ 对象引用。
- 实现同步调用和共享内存。

五、收益：

- 启动速度提升。
- 动画和手势更流畅。
- 大型应用性能更好。

**评分维度**：
- 旧架构问题（25%）
- Fabric 作用（25%）
- TurboModules 作用（25%）
- JSI 作用（15%）
- 收益（10%）

**常见错误**：
- 把 Fabric 和 TurboModules 混为一谈
- 不知道 JSI 是新架构的基础

**口头回答版**：
> React Native 旧架构通过 Bridge 异步通信，有性能瓶颈，Native Modules 启动时全加载。新架构里 Fabric 是统一渲染层，支持同步布局；TurboModules 按需加载原生模块，用 JSI 直接调用；JSI 让 JS 能持有 C++ 对象引用，支持同步调用。整体启动更快、动画更流畅。

---

### FB-17-FS-P-057：Flutter Impeller 渲染引擎是什么？

**题型**：原理题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：Flutter、Impeller、渲染引擎、Skia
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 的 Impeller 渲染引擎及其相比 Skia 的优势。

**参考答案**：

一、背景：

Flutter 传统使用 Skia 作为 2D 图形引擎，在运行时编译着色器，导致首次打开页面或动画时出现卡顿（shader compilation jank）。

二、Impeller 是什么：

Impeller 是 Flutter 自研的渲染引擎，目标是替代 Skia，解决着色器编译卡顿问题。

三、核心优势：

1. **预编译着色器**：
   - 着色器在应用构建时预编译，运行时直接加载。
   - 避免运行时编译导致的卡顿。

2. **更现代的架构**：
   - 针对 Flutter 的渲染管线专门设计。
   - 更好地支持 Metal 和 Vulkan。

3. **更低的首帧延迟**：
   - 减少首次渲染所需的准备工作。

4. **一致的跨平台表现**：
   - 降低不同 GPU 驱动带来的差异。

四、现状：

- iOS 已默认启用 Impeller。
- Android 正在逐步推进。
- 部分高级 Skia 特性可能尚未完全支持。

五、注意事项：

- 迁移到 Impeller 后需测试图像、文字、阴影等效果。
- 自定义 Shader 需要调整。

**评分维度**：
- Skia 问题（20%）
- Impeller 作用（25%）
- 预编译着色器（25%）
- 现状和注意事项（20%）
- 跨平台表现（10%）

**常见错误**：
- 认为 Impeller 只是 Skia 的简单升级
- 忽略 Android 尚未完全默认启用

**口头回答版**：
> Flutter 原本用 Skia，运行时编译着色器会卡顿。Impeller 是 Flutter 自研渲染引擎，预编译着色器，避免首帧和动画卡顿。架构更现代，更好支持 Metal/Vulkan，跨平台表现更一致。iOS 已默认启用，Android 在推进。

---

### FB-17-PE-P-057：跨端应用包体积优化有哪些深入手段？

**题型**：性能题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：跨端、包体积、优化、分包、资源
**出现频率**：高频
**预计回答时长**：8-12 分钟

**题目描述**：
请说明跨端应用（小程序、React Native、Flutter、Electron）在包体积优化上的深入手段。

**参考答案**：

一、通用手段：

1. **Tree Shaking**：
   - 移除未使用代码。
   - 组件库避免全量引入。

2. **代码分割**：
   - 路由懒加载、动态 import。

3. **压缩**：
   - JS/CSS 压缩、图片压缩、字体子集化。

二、小程序：

1. 分包加载、独立分包。
2. 图片资源放 CDN。
3. 精简 npm 依赖，移除不需要的 polyfill。
4. 使用本地缓存存储大资源。

三、React Native：

1. Hermes 引擎减少包体积。
2. 图片资源外置或按需加载。
3. 原生库按需链接，移除未使用的 native modules。
4. 使用 ProGuard/R8 压缩 Android 包。

四、Flutter：

1. `flutter build apk --split-debug-info`。
2. 移除未使用的 assets 和字体。
3. 使用 deferred components 延迟加载模块。
4. 配置 `shrink` 和 `minifyEnabled`。

五、Electron：

1. 使用 asar 打包。
2. 移除不需要的 Chromium 功能（需自定义 Electron 构建）。
3. 按需加载 node_modules。
4. 使用 differential updater 减少更新包体积。

六、监控：

- 使用包体积分析工具。
- CI 中设置包体积阈值告警。

**评分维度**：
- 通用手段（20%）
- 各平台具体手段（50%）
- 监控（15%）
- 实际经验（15%）

**常见错误**：
- 只压缩 JS，忽略图片和字体
- 过度优化导致功能缺失

**口头回答版**：
> 跨端包体积优化要 Tree Shaking、代码分割、压缩资源。小程序用分包和 CDN 图片；React Native 用 Hermes、按需链接原生库；Flutter 移除未用资源、延迟加载；Electron 用 asar、按需加载 node_modules。CI 里设包体积阈值告警。

---

### FB-17-SC-P-056：跨端应用中的 JSBridge 设计

**题型**：场景设计题
**难度**：🟠 高级
**岗位层级**：高级 / 专家
**面试知识域**：17 跨平台
**标签**：JSBridge、跨端、通信、安全、设计
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一个跨端应用中的 JSBridge，支持 H5 调用原生能力，并保证安全性和可扩展性。

**参考答案**：

一、通信协议：

1. **URL Scheme**：早期方案，有长度限制和效率问题。
2. **WKWebView / WebView 注入对象**：现代方案，iOS 用 `WKScriptMessageHandler`，Android 用 `@JavascriptInterface`。
3. **iframe / prompt**：兼容旧版本。

二、协议设计：

```json
{
  "id": "uuid",
  "module": "device",
  "method": "getDeviceInfo",
  "params": {},
  "callbackId": "cb_123"
}
```

三、SDK 分层：

1. **Core**：
   - 消息发送、接收、回调管理。
   - Promise 封装。

2. **Module**：
   - 按能力分模块：device、network、storage、media。

3. **Plugin**：
   - 业务方可注册自定义模块。

四、安全性：

1. 白名单域名控制。
2. 敏感 API 需要鉴权。
3. 参数校验和消毒。
4. HTTPS 强制。

五、可扩展性：

1. 新能力通过插件注册，不改核心。
2. 版本协商，旧客户端忽略不支持的 API。
3. 统一错误码和降级策略。

六、示例：

```js
bridge.invoke('device.getDeviceInfo').then(info => {
  console.log(info);
}).catch(err => {
  console.error(err.code, err.message);
});
```

**评分维度**：
- 通信方式（20%）
- 协议设计（20%）
- SDK 分层（20%）
- 安全性（20%）
- 可扩展性（20%）

**常见错误**：
- 使用 URL Scheme 做大量数据传输
- 没有白名单和鉴权

**口头回答版**：
> JSBridge 可以用 WKScriptMessageHandler 或 @JavascriptInterface 注入对象。协议要包含 id、module、method、params、callbackId。SDK 分 core、module、plugin 三层。安全上要做域名白名单、敏感 API 鉴权、参数校验。新能力用插件注册，旧客户端做版本协商。

---

### FB-17-SD-R-066：跨端应用安全架构

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：17 跨平台
**标签**：跨端、安全、XSS、JSBridge、数据保护
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个跨端应用的安全架构，覆盖 H5、小程序、React Native、Flutter、Electron 等场景。

**参考答案**：

一、通用安全原则：

1. 最小权限原则，仅暴露必要的原生能力。
2. 所有输入校验，不信任客户端。
3. 敏感操作服务端鉴权。
4. 通信加密，使用 HTTPS。

二、H5/WebView 安全：

1. CSP、X-Frame-Options、HSTS 等安全头。
2. 防止 XSS，谨慎使用 innerHTML/v-html。
3. JSBridge 白名单和鉴权。

三、小程序安全：

1. 服务端校验用户身份和数据。
2. 敏感接口需要登录态和权限校验。
3. 防止反编译，代码混淆。
4. 数据存储加密，避免明文保存敏感信息。

四、React Native / Flutter 安全：

1. 防止反编译和代码篡改。
2. 本地存储使用 Keychain/Keystore 加密。
3. 证书固定（SSL Pinning）防止中间人攻击。
4. 隐藏调试入口，防止运行时分析。

五、Electron 安全：

1. 启用 contextIsolation、sandbox、nodeIntegration: false。
2. preload 脚本最小化暴露 API。
3. 自动更新签名验证。
4. 内容安全策略限制加载外部资源。

六、监控与响应：

1. 安全事件日志和上报。
2. 定期安全审计和渗透测试。
3. 漏洞应急响应流程。

**评分维度**：
- 通用原则（20%）
- H5/WebView（15%）
- 小程序（15%）
- RN/Flutter（20%）
- Electron（15%）
- 监控响应（15%）

**常见错误**：
- 只关注 H5 安全，忽略原生端
- 敏感数据明文存储在本地

**口头回答版**：
> 跨端安全要遵循最小权限、输入校验、服务端鉴权、HTTPS。H5 配 CSP 防 XSS；小程序服务端鉴权、代码混淆；RN/Flutter 防反编译、本地加密、SSL Pinning；Electron 开 contextIsolation、nodeIntegration false、preload 最小化。还要监控和定期审计。

---

### FB-17-SD-R-067：跨端应用 CI/CD 与热更新

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：17 跨平台
**标签**：跨端、CI/CD、热更新、发布、灰度
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个跨端应用的 CI/CD 和热更新方案，支持小程序、React Native、Flutter、H5。

**参考答案**：

一、CI/CD 流程：

```
代码提交 → 静态检查 → 单元测试 → 构建 → 产物上传 → 灰度发布 → 全量发布
```

二、各平台构建：

1. **H5**：Vite/Webpack 构建，上传到 CDN。
2. **小程序**：Taro/UniApp 编译，上传到微信/支付宝后台。
3. **React Native**：打包 JS bundle，配合 CodePush / Expo Updates。
4. **Flutter**：构建 apk/ipa，上传到应用商店或私有分发。
5. **Electron**：打包并签名，配合 electron-updater。

三、热更新：

1. **H5**：直接更新 CDN 资源，刷新即生效。
2. **小程序**：微信后台提交新版本，用户自动更新。
3. **React Native**：CodePush 推送 bundle 更新。
4. **Flutter**：自定义热更新方案（需符合商店政策）。

四、灰度发布：

1. 按用户 ID、地域、版本号灰度。
2. A/B 测试验证新功能。
3. 监控崩溃率、错误率、性能指标。

五、回滚：

1. 保留上一个稳定版本 bundle。
2. 一键回滚到旧版本。
3. 异常时自动熔断。

六、安全：

1. 热更新包签名验证。
2. HTTPS 传输。
3. 更新包完整性校验（hash）。

**评分维度**：
- CI/CD 流程（20%）
- 各平台构建（25%）
- 热更新策略（25%）
- 灰度和回滚（15%）
- 安全（15%）

**常见错误**：
- 热更新不签名，存在安全风险
- 没有回滚能力，发布失败无法快速恢复

**口头回答版**：
> 跨端 CI/CD 要先跑静态检查和测试，再构建各平台产物。H5 上 CDN，小程序上平台后台，RN 用 CodePush，Flutter 构建安装包。热更新按平台策略，H5 直接刷新，RN 用 CodePush。灰度按用户、地域、版本，保留回滚能力。热更新包要签名和校验。

---

### FB-17-SD-R-068：跨端应用性能度量体系

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：17 跨平台
**标签**：跨端、性能度量、指标、监控、基线
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个跨端应用的性能度量体系，建立性能基线并持续优化。

**参考答案**：

一、核心指标：

| 维度 | 指标 |
|------|------|
| 启动 | 冷启动时间、首屏时间、TTI |
| 渲染 | FPS、掉帧率、长任务 |
| 内存 | 内存占用、内存泄漏、OOM 率 |
| 包体积 | 安装包大小、JS bundle 大小、资源大小 |
| 网络 | 请求耗时、失败率、重试率 |
| 交互 | 点击响应延迟、动画流畅度 |

二、分平台指标：

1. **小程序**：setData 频次、页面切换耗时、包体积、启动耗时。
2. **React Native**：JS bundle 加载、Native 模块初始化、渲染帧率。
3. **Flutter**：首帧时间、jank、shader 编译卡顿。
4. **Electron**：窗口启动、内存占用、主进程 CPU。

三、采集方式：

1. 框架内置 API（Flutter Performance Overlay、React Native Systrace）。
2. 自定义 Performance API。
3. 真机自动化测试。
4. 用户真实环境采样上报。

四、基线建立：

1. 选择代表性设备和网络环境。
2. 记录关键页面 P50/P75/P95 数据。
3. 设置红黄绿灯阈值。

五、持续优化：

1. 每次发布对比基线，发现回归。
2. 定期性能专项优化。
3. 性能报告同步给团队。

**评分维度**：
- 指标体系（30%）
- 分平台指标（25%）
- 采集方式（20%）
- 基线和优化（15%）
- 报告机制（10%）

**常见错误**：
- 只关注启动时间，忽略渲染和内存
- 指标没有分平台细化

**口头回答版**：
> 跨端性能度量要覆盖启动、渲染、内存、包体积、网络、交互。小程序关注 setData 和包体积，RN 关注 bundle 加载和帧率，Flutter 关注首帧和 jank。用框架 API、自定义采集、真机测试、用户采样建立基线，每次发布对比，发现回归及时优化。

---

### FB-17-SD-R-069：跨端应用与原生应用混合架构

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：17 跨平台
**标签**：跨端、原生、混合架构、集成、通信
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个跨端应用与原生应用混合的架构方案，说明集成方式和通信机制。

**参考答案**：

一、混合模式：

1. **跨端页面嵌入原生应用**：
   - 小程序嵌入 App（微信/支付宝小程序）。
   - H5/RN/Flutter 页面通过原生容器加载。

2. **原生模块嵌入跨端应用**：
   - RN/Flutter 调用原生模块处理特定能力。

二、通信机制：

1. **JSBridge**：H5 与原生双向通信。
2. **RN TurboModules / Flutter Platform Channel**：跨端与原生模块通信。
3. **事件总线**：应用内全局事件通知。
4. **Deep Link / Universal Link**：页面间跳转。

三、数据共享：

1. 统一登录态和 Token 管理。
2. 共享本地存储抽象层。
3. 统一用户信息和配置中心。

四、导航与路由：

1. 原生路由和跨端路由统一协调。
2. 使用 scheme 路由表映射。
3. 返回栈管理一致。

五、发布与治理：

1. 跨端页面可独立发布。
2. 原生壳版本和跨端 bundle 版本匹配。
3. 灰度和回滚能力。

**评分维度**：
- 混合模式（20%）
- 通信机制（25%）
- 数据共享（20%）
- 导航路由（15%）
- 发布治理（10%）
- 版本匹配（10%）

**常见错误**：
- 跨端和原生各自维护登录态
- 路由跳转不一致导致返回栈混乱

**口头回答版**：
> 跨端和原生混合可以把跨端页面嵌入原生容器，也可以把原生模块嵌入跨端应用。通信用 JSBridge、TurboModules、Platform Channel。要统一登录态、存储、路由。跨端页面可独立发布，但要和原生壳版本匹配，支持灰度回滚。

---

### FB-17-SD-R-070：跨端技术长期演进规划

**题型**：系统设计题
**难度**：🔴 架构
**岗位层级**：专家 / 架构
**面试知识域**：17 跨平台
**标签**：跨端、演进、技术规划、技术债务、选型
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
请为一个企业的跨端技术栈制定长期演进规划。

**参考答案**：

一、现状评估：

1. 梳理现有跨端项目和技术栈。
2. 识别性能、维护性、开发效率痛点。
3. 统计各平台用户占比和业务重要性。

二、短期（0-6 个月）：

1. 统一开发规范和代码质量门禁。
2. 建立跨端组件库和工具库。
3. 优化构建和发布流程。
4. 补齐监控和性能基线。

三、中期（6-18 个月）：

1. 推进 RN/Flutter 新架构升级。
2. 沉淀跨端共享层（网络、存储、埋点、登录）。
3. 小程序探索 Skyline 等新技术。
4. 建立跨端性能度量体系。

四、长期（18-36 个月）：

1. 评估鸿蒙等新兴平台的支持。
2. 探索自研渲染引擎或跨端框架。
3. 构建企业级跨端平台（组件库、低代码、发布平台）。
4. 形成技术选型和迁移的决策框架。

五、治理机制：

1. 定期技术雷达更新。
2. ADR 记录重大技术决策。
3. 技术债登记和偿还计划。
4. 跨团队技术委员会评审。

**评分维度**：
- 现状评估（15%）
- 短中长期规划（45%）
- 共享层建设（15%）
- 治理机制（15%）
- 新兴平台考虑（10%）

**常见错误**：
- 盲目追新，频繁换框架
- 没有分阶段规划，一次性推倒重来

**口头回答版**：
> 跨端技术演进要先评估现状和痛点。短期统一规范、建组件库、补监控；中期升级新架构、沉淀共享层、探索新技术；长期支持鸿蒙等新兴平台，建企业级跨端平台。要有技术雷达、ADR、技术债治理机制，不能盲目追新。

---
