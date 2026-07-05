# Electron 面试题

> 本题库共收录 **55** 道面试题（基础 11 / 进阶 23 / 深入 11 / 架构 10）。
> 本文件收录 Electron 相关面试题，目标题量 30 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、工程化题、性能优化题、安全题、综合开放题、软技能题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-48-CO-B-001：Electron 主进程与渲染进程有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：48 Electron
**标签**：Electron、平台、通信
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Electron 中主进程（Main Process）与渲染进程（Renderer Process）的职责、运行环境及通信方式。

**参考答案**：

1. **核心要点**
   - 一个 Electron 应用有且只有一个主进程，负责应用生命周期、窗口管理与系统级 API 调用。
   - 每个 `BrowserWindow` 会创建一个独立的渲染进程，负责运行页面 JavaScript、渲染 UI。
   - 两者通过 IPC（Inter-Process Communication）交换数据，渲染进程默认不能直接访问 Node.js 和系统 API。

2. **详细解释**

   | 维度 | 主进程 | 渲染进程 |
   |------|--------|----------|
   | 入口 | `package.json` 中的 `main` 字段 | `BrowserWindow.loadURL/loadFile` 加载的 HTML |
   | 运行环境 | Node.js + Chromium 嵌入层 | Chromium 渲染引擎 |
   | 权限 | 可访问文件、网络、系统 API、原生模块 | 默认只能访问 Web API，Node 能力受 `webPreferences` 控制 |
   | 崩溃影响 | 主进程崩溃会导致应用退出 | 单个渲染进程崩溃通常只影响对应窗口 |
   | 数量 | 全局唯一 | 通常每个窗口一个，可配置多窗口复用 |

3. **代码示例**

   ```js
   // main.js（主进程）
   const { app, BrowserWindow, ipcMain } = require('electron');

   function createWindow() {
     const win = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
         preload: `${__dirname}/preload.js`,
         contextIsolation: true,
         nodeIntegration: false,
       },
     });
     win.loadFile('index.html');
   }

   app.whenReady().then(createWindow);
   ```

4. **最佳实践**
   - 敏感操作（文件读写、数据库、网络请求）尽量放在主进程或受控的 preload 脚本中。
   - 渲染进程应通过 `contextBridge` 暴露的有限 API 与主进程通信，遵循最小权限原则。

**评分维度**：
- 能准确区分主进程与渲染进程的职责（40%）
- 能说明两者运行环境与权限差异（30%）
- 能指出通过 IPC 通信并提及安全隔离（30%）

**常见错误**：
- 认为渲染进程默认可以像 Node.js 一样使用 `fs`、`path`。
- 把主进程当作“后台线程”，混淆进程与线程概念。
- 忽略主进程崩溃会导致整个应用退出。

**延伸追问**：
- 如果渲染进程需要读取本地文件，应该怎么做？
- `nodeIntegration: true` 会带来哪些安全风险？

**相关题目**：
- [FB-48-CO-B-005 contextIsolation 与 nodeIntegration](#FB-48-CO-B-005)
- [FB-48-CD-B-006 手写简单 IPC 调用](#FB-48-CD-B-006)

**参考资源**：
- [Electron 官方文档 - 进程模型](https://www.electronjs.org/docs/latest/tutorial/process-model)
- [Electron 安全最佳实践](https://www.electronjs.org/docs/latest/tutorial/security)

**口头回答版**：
> Electron 里主进程只有一个，跑的是 Node.js，管应用生命周期、创建窗口和调系统 API；渲染进程是每个 BrowserWindow 对应一个，跑页面 JS、渲染 UI。两者不能直接共享数据，要通过 IPC 通信。为了安全，渲染进程默认不能直接用 Node.js API，需要走 preload 和 contextBridge。

---

### FB-48-CO-B-002：Electron 应用的启动流程是怎样的？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：48 Electron
**标签**：Electron、生命周期
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请描述一个 Electron 应用从执行到窗口显示的主要流程，并说明 `app` 模块中常用生命周期事件的作用。

**参考答案**：

1. **核心要点**
   - Electron 启动时先进入主进程，读取 `package.json` 的 `main` 字段加载入口脚本。
   - 主进程等待 `app.whenReady()` 后创建 `BrowserWindow` 并加载页面。
   - 常用生命周期事件包括 `ready`、`window-all-closed`、`activate`、`before-quit`、`quit`。

2. **详细解释**

   典型启动流程：

   ```text
   执行 electron . → 启动主进程 → 加载 main.js
   → app.whenReady() 触发 → 创建 BrowserWindow
   → loadFile/loadURL 加载页面 → 渲染进程启动 → 窗口显示
   ```

   常用事件：
   - `ready` / `whenReady()`：应用初始化完成，可以安全创建窗口。
   - `window-all-closed`：所有窗口关闭时触发；Windows/Linux 通常退出应用，macOS 通常保持运行。
   - `activate`：macOS 点击 Dock 或重新激活应用时触发，用于重新创建窗口。
   - `before-quit` / `quit`：应用即将退出 / 已经退出，用于清理资源。

3. **代码示例**

   ```js
   const { app, BrowserWindow } = require('electron');

   function createWindow() {
     const win = new BrowserWindow({ width: 800, height: 600 });
     win.loadFile('index.html');
   }

   app.whenReady().then(createWindow);

   app.on('window-all-closed', () => {
     if (process.platform !== 'darwin') app.quit();
   });

   app.on('activate', () => {
     if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });
   ```

4. **最佳实践**
   - 使用 `app.whenReady()` 而不是 `app.on('ready', ...)`，避免事件已触发导致回调不执行。
   - macOS 与 Windows/Linux 的窗口关闭行为不同，需要分别处理。

**评分维度**：
- 能按顺序描述启动流程（40%）
- 能说明 `whenReady`、`window-all-closed`、`activate` 的作用（40%）
- 能写出跨平台兼容的处理（20%）

**常见错误**：
- 在 `app.whenReady()` 之前就创建 `BrowserWindow`。
- macOS 上点击 Dock 图标无法重新打开窗口。
- 混淆 `before-quit` 和 `will-quit` 的触发时机。

**延伸追问**：
- `app.whenReady()` 返回 Promise 有什么好处？
- 如果需要在启动时只运行单个实例，应该怎么做？

**相关题目**：
- [FB-48-CO-B-003 BrowserWindow 常用配置](#FB-48-CO-B-003)
- [FB-48-SC-A-004 多窗口管理](#FB-48-SC-A-004)

**参考资源**：
- [Electron app 模块文档](https://www.electronjs.org/docs/latest/api/app)

**口头回答版**：
> Electron 启动时先跑主进程，读取 package.json 里的 main 字段进入 main.js；等 app.whenReady() 触发后创建 BrowserWindow，加载页面，渲染进程启动，窗口显示。常用事件有 window-all-closed，所有窗口关掉时退出应用，但 macOS 一般不退；activate 是 macOS 重新点 Dock 时用来再创建窗口。

---

### FB-48-CO-B-003：BrowserWindow 有哪些常用配置项？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：48 Electron
**标签**：Electron、平台、用户体验
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举 `BrowserWindow` 中常用的配置项，并说明 `webPreferences` 下关键安全相关选项的作用。

**参考答案**：

1. **核心要点**
   - `BrowserWindow` 用于创建应用窗口，其配置影响窗口外观、行为及渲染进程能力。
   - `webPreferences` 决定渲染进程的安全模型与可用能力，是最需要重点关注的配置区域。

2. **详细解释**

   常用窗口配置：

   | 配置项 | 作用 |
   |--------|------|
   | `width` / `height` | 窗口初始尺寸 |
   | `minWidth` / `minHeight` | 最小尺寸 |
   | `x` / `y` | 窗口初始位置 |
   | `show` | 是否立即显示；可配合 `ready-to-show` 事件避免白屏 |
   | `frame` | 是否显示系统标题栏；false 用于自定义标题栏 |
   | `transparent` | 是否支持透明背景 |
   | `alwaysOnTop` | 是否置顶 |
   | `icon` | 窗口图标 |
   | `titleBarStyle` | macOS 标题栏样式 |

   `webPreferences` 关键安全项：

   | 配置项 | 推荐值 | 说明 |
   |--------|--------|------|
   | `preload` | 必填（需要时） | 指定 preload 脚本路径 |
   | `contextIsolation` | `true` | 隔离 preload 与页面 JS 上下文 |
   | `nodeIntegration` | `false` | 禁止渲染进程直接使用 Node.js |
   | `sandbox` | `true` | 启用 Chromium 沙箱 |
   | `webSecurity` | `true` | 禁止跨域等不安全 Web 行为 |
   | `allowRunningInsecureContent` | `false` | 禁止 HTTPS 页面加载 HTTP 资源 |

3. **代码示例**

   ```js
   const win = new BrowserWindow({
     width: 1200,
     height: 800,
     show: false,
     webPreferences: {
       preload: `${__dirname}/preload.js`,
       contextIsolation: true,
       nodeIntegration: false,
       sandbox: true,
       webSecurity: true,
     },
   });

   win.once('ready-to-show', () => win.show());
   ```

4. **最佳实践**
   - 生产环境务必开启 `contextIsolation` 并关闭 `nodeIntegration`。
   - 使用 `ready-to-show` 事件后再显示窗口，提升首屏体验。

**评分维度**：
- 能列举 4 个以上常用窗口配置（40%）
- 能说明 `webPreferences` 中安全相关选项（40%）
- 能给出 `show` + `ready-to-show` 的最佳实践（20%）

**常见错误**：
- 将 `nodeIntegration` 设为 `true` 以图方便。
- 忽略 `contextIsolation`，导致页面脚本可篡改 preload 全局对象。
- 在 `show: true` 时直接加载大量资源，造成白屏。

**延伸追问**：
- `frame: false` 后如何实现窗口拖拽和关闭按钮？
- `sandbox: true` 对 preload 脚本有什么影响？

**相关题目**：
- [FB-48-CO-B-004 preload 脚本](#FB-48-CO-B-004)
- [FB-48-SE-A-003 安全最佳实践](#FB-48-SE-A-003)

**参考资源**：
- [BrowserWindow API 文档](https://www.electronjs.org/docs/latest/api/browser-window)

**口头回答版**：
> BrowserWindow 配置分两类：一类是窗口外观和行为，比如 width、height、show、frame、alwaysOnTop；另一类是 webPreferences，决定渲染进程能力。安全方面要重点关注 contextIsolation 开 true、nodeIntegration 关 false、sandbox 开 true、webSecurity 开 true。另外推荐 show 先设 false，等 ready-to-show 再显示，避免白屏。

---

### FB-48-CO-B-004：preload 脚本是什么？为什么要使用它？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：48 Electron
**标签**：Electron、安全、沙箱
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Electron 中 preload 脚本的作用、执行时机，以及它为什么是实现安全 IPC 的关键。

**参考答案**：

1. **核心要点**
   - preload 脚本在页面脚本执行之前加载，运行在渲染进程中，但拥有访问部分 Electron/Node API 的权限。
   - 它作为渲染进程与主进程之间的“受控桥梁”，通过 `contextBridge` 向页面暴露有限、白名单化的能力。

2. **详细解释**
   - 执行时机：preload 在 DOM 构建前、页面 JS 执行前运行。
   - 权限差异：preload 可以访问 `ipcRenderer`、`process` 等 Electron API；页面脚本默认不能。
   - 安全作用：将“需要 Node/Electron 能力”的操作收敛到 preload，渲染进程只调用暴露的接口，降低攻击面。
   - 配合 `contextIsolation: true` 时，preload 与页面运行在不同 V8 上下文中，页面无法直接读取或篡改 preload 内部变量。

3. **代码示例**

   ```js
   // preload.js
   const { contextBridge, ipcRenderer } = require('electron');

   contextBridge.exposeInMainWorld('electronAPI', {
     readConfig: (key) => ipcRenderer.invoke('read-config', key),
   });
   ```

   ```js
   // renderer.js
   window.electronAPI.readConfig('theme').then((value) => {
     console.log(value);
   });
   ```

4. **最佳实践**
   - preload 中只暴露最小必要 API，禁止暴露 `ipcRenderer.sendSync`、shell 打开任意 URL 等高危能力。
   - 对 IPC 频道做白名单校验，避免页面调用未授权的频道。

**评分维度**：
- 能说明 preload 的执行时机和运行环境（30%）
- 能理解 preload 作为安全桥梁的作用（40%）
- 能写出使用 `contextBridge` 暴露 API 的示例（30%）

**常见错误**：
- 把大量业务逻辑写到 preload，使其变成“第二主进程”。
- 在 preload 中直接挂载对象到 `window`，未使用 `contextBridge`。
- 暴露 `ipcRenderer` 全部能力给页面。

**延伸追问**：
- `contextIsolation` 关闭时，preload 如何向页面暴露对象？为什么不推荐？
- preload 脚本能不能直接操作 DOM？

**相关题目**：
- [FB-48-CO-B-005 contextIsolation 与 nodeIntegration](#FB-48-CO-B-005)
- [FB-48-CD-A-002 用 contextBridge 暴露安全 API](#FB-48-CD-A-002)

**参考资源**：
- [Electron preload 脚本文档](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload)

**口头回答版**：
> preload 是在页面 JS 之前运行的一个脚本，它还在渲染进程里，但能访问 Electron 和 Node 的部分 API。我们用它来做渲染进程和主进程之间的安全桥梁：在 preload 里通过 contextBridge 把需要的能力挂到 window 上，页面只能调用这些暴露出来的方法，不能直接访问 ipcRenderer。这样攻击面就小很多。

---

### FB-48-CO-B-005：contextIsolation 和 nodeIntegration 各有什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：48 Electron
**标签**：Electron、安全、沙箱
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `webPreferences` 中 `contextIsolation` 与 `nodeIntegration` 的含义、默认值及安全影响。

**参考答案**：

1. **核心要点**
   - `contextIsolation` 决定 preload 脚本与页面脚本是否共享同一个 JavaScript 上下文。
   - `nodeIntegration` 决定渲染进程是否可以直接使用 Node.js API。
   - 现代 Electron 推荐 `contextIsolation: true`、`nodeIntegration: false`。

2. **详细解释**

   | 配置项 | `contextIsolation` | `nodeIntegration` |
   |--------|--------------------|--------------------|
   | 含义 | 是否将 preload 运行在独立的 V8 上下文中 | 是否将 Node.js 注入到渲染进程全局 |
   | 默认值 | Electron 12+ 为 `true` | `false` |
   | 安全影响 | true 时页面无法污染 preload 全局变量 | false 时页面无法直接使用 `require('fs')` 等 |
   | 使用场景 | 需要保护 preload 内部逻辑时使用 | 仅在受信任、无用户内容的场景才开启 |

   危险组合：`nodeIntegration: true` + `contextIsolation: false` 会让页面脚本获得完整 Node.js 能力，任意 XSS 都可演变为任意代码执行。

3. **代码示例**

   ```js
   const win = new BrowserWindow({
     webPreferences: {
       contextIsolation: true,
       nodeIntegration: false,
       preload: `${__dirname}/preload.js`,
     },
   });
   ```

4. **最佳实践**
   - 永远不要为加载远程或不可信内容的窗口关闭 `contextIsolation` 或开启 `nodeIntegration`。
   - 如果旧代码依赖 `require`，应迁移到 `contextBridge` + `ipcRenderer.invoke`。

**评分维度**：
- 能准确解释两个配置的含义（40%）
- 能说明默认值和安全影响（30%）
- 能指出危险组合及迁移方案（30%）

**常见错误**：
- 认为 `nodeIntegration: false` 后 preload 也不能用 Node.js API。
- 把 `contextIsolation` 关闭后直接用 `window.api = { ... }` 暴露能力。
- 为兼容旧版本同时开启 `nodeIntegration` 和 `contextIsolation: false`。

**延伸追问**：
- `contextIsolation: true` 时，preload 中的全局变量页面能访问到吗？
- 如果业务确实需要渲染进程使用 Node API，有哪些更安全的替代方案？

**相关题目**：
- [FB-48-CO-B-004 preload 脚本](#FB-48-CO-B-004)
- [FB-48-SE-A-003 安全最佳实践](#FB-48-SE-A-003)

**参考资源**：
- [Electron contextIsolation 文档](https://www.electronjs.org/docs/latest/tutorial/context-isolation)
- [Electron nodeIntegration 文档](https://www.electronjs.org/docs/latest/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content)

**口头回答版**：
> contextIsolation 控制 preload 和页面脚本是不是在同一个 JS 上下文里。设为 true 时，它们互相隔离，页面污染不了 preload 里的东西。nodeIntegration 控制渲染进程能不能直接用 Node.js API，默认 false。推荐 contextIsolation true、nodeIntegration false。如果两者都关掉，XSS 就可能直接执行任意 Node 代码，非常危险。

---

### FB-48-CD-B-006：请手写一个渲染进程调用主进程的完整 IPC 示例

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：48 Electron
**标签**：Electron、通信
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请写出主进程、preload 脚本和渲染进程三方协作，实现“渲染进程向主进程请求用户数据并等待返回”的代码。

**参考答案**：

1. **核心要点**
   - 主进程使用 `ipcMain.handle` 注册异步处理函数。
   - preload 通过 `contextBridge` 暴露一个调用方法。
   - 渲染进程调用暴露的 API，得到 Promise 结果。

2. **代码示例**

   ```js
   // main.js
   const { app, BrowserWindow, ipcMain } = require('electron');
   const path = require('path');

   ipcMain.handle('get-user', async (event, userId) => {
     // 模拟查询
     return { id: userId, name: 'Alice' };
   });

   function createWindow() {
     const win = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
         contextIsolation: true,
         nodeIntegration: false,
       },
     });
     win.loadFile('index.html');
   }

   app.whenReady().then(createWindow);
   ```

   ```js
   // preload.js
   const { contextBridge, ipcRenderer } = require('electron');

   contextBridge.exposeInMainWorld('electronAPI', {
     getUser: (userId) => ipcRenderer.invoke('get-user', userId),
   });
   ```

   ```html
   <!-- index.html -->
   <script>
     window.electronAPI.getUser(42).then((user) => {
       console.log(user); // { id: 42, name: 'Alice' }
     });
   </script>
   ```

3. **最佳实践**
   - 使用 `invoke/handle` 替代 `send/on` 的请求响应模式，代码更直观且避免事件泄漏。
   - preload 中应避免将 `ipcRenderer` 整体暴露，只暴露具体方法。

**评分维度**：
- 主进程正确使用 `ipcMain.handle`（30%）
- preload 正确使用 `contextBridge` 暴露方法（30%）
- 渲染进程调用方式正确（20%）
- 安全选项配置正确（20%）

**常见错误**：
- 主进程用 `ipcMain.on` 处理请求但没有通过 `event.reply` 返回结果。
- preload 直接写 `window.api = { ... }` 而不是使用 `contextBridge`。
- 渲染进程直接 `require('electron')`，忽略 `nodeIntegration` 限制。

**延伸追问**：
- 如果主进程处理耗时很长，渲染进程如何取消这次调用？
- 多个渲染进程同时调用同一个 handle，主进程如何区分来源？

**相关题目**：
- [FB-48-CO-A-001 IPC 通信方式](#FB-48-CO-A-001)
- [FB-48-CD-A-002 用 contextBridge 暴露安全 API](#FB-48-CD-A-002)

**参考资源**：
- [ipcMain 文档](https://www.electronjs.org/docs/latest/api/ipc-main)
- [ipcRenderer 文档](https://www.electronjs.org/docs/latest/api/ipc-renderer)

**口头回答版**：
> 主进程用 ipcMain.handle 注册一个叫 get-user 的处理器，返回用户数据；preload 里通过 contextBridge 暴露一个 getUser 方法，内部调用 ipcRenderer.invoke('get-user', userId)；渲染进程直接调 window.electronAPI.getUser，拿到 Promise 结果。推荐用 invoke/handle，比 send/on 更直观，也不容易漏掉返回。

---

### FB-48-CO-B-007：Electron 中如何调试主进程和渲染进程？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：48 Electron
**标签**：Electron、调试
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请分别说明 Electron 主进程与渲染进程的调试方式，并推荐一种高效的开发调试工作流。

**参考答案**：

1. **核心要点**
   - 渲染进程调试与 Chrome 类似，可直接打开 DevTools。
   - 主进程调试需要借助 `--inspect` 参数或 VSCode 的 attach 配置。

2. **详细解释**

   渲染进程：
   - 代码中调用 `win.webContents.openDevTools()`。
   - 或使用快捷键 `Ctrl+Shift+I` / `Cmd+Option+I`。
   - DevTools 中可查看 Elements、Console、Network、Performance、Memory 等面板。

   主进程：
   - 启动时添加 `--inspect=5858`：
     ```bash
     electron --inspect=5858 .
     ```
   - 在 Chrome 中打开 `chrome://inspect` 并连接。
   - 或在 VSCode `launch.json` 中配置 attach：
     ```json
     {
       "type": "node",
       "request": "attach",
       "name": "Attach to Main Process",
       "port": 5858,
       "restart": true,
       "sourceMaps": true
     }
     ```

   preload 脚本：
   - 可在 preload 中打 `console.log`，日志会出现在对应窗口的 DevTools Console。

3. **最佳实践**
   - 开发环境使用 `electronmon` 或 `nodemon` 自动重启主进程。
   - 渲染进程使用热更新（如 Vite + `vite-plugin-electron`）。
   - 生产环境关闭 DevTools，避免暴露源码。

**评分维度**：
- 能说出渲染进程打开 DevTools 的方法（30%）
- 能说明主进程 `--inspect` 调试方式（30%）
- 能给出 VSCode attach 配置或高效工作流（40%）

**常见错误**：
- 只会在渲染进程打断点，不知道主进程怎么调试。
- 生产包中忘记关闭 DevTools。
- 调试主进程时端口冲突没有检查。

**延伸追问**：
- 如何在 preload 脚本中打断点？
- 调试生产环境崩溃时，你会采用哪些手段？

**相关题目**：
- [FB-48-CO-B-002 启动流程](#FB-48-CO-B-002)
- [FB-48-CP-P-006 崩溃报告与错误监控](#FB-48-CP-P-006)

**参考资源**：
- [Electron 调试指南](https://www.electronjs.org/docs/latest/tutorial/debugging-main-process)

**口头回答版**：
> 渲染进程调试最简单，直接 win.webContents.openDevTools() 或者按快捷键，和 Chrome 一样。主进程要启动时加 --inspect=5858，然后在 Chrome 的 chrome://inspect 连上，或者在 VSCode 里配 attach。preload 里的 console.log 会出现在对应窗口的 Console 里。开发时可以用 electronmon 自动重启主进程，渲染用 Vite 热更新。

---

### FB-48-CO-B-008：Menu、Tray 和 Notification 的基本用法是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：48 Electron
**标签**：Electron、平台、用户体验
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Electron 中应用菜单（Menu）、系统托盘（Tray）和通知（Notification）的基本用法及平台差异。

**参考答案**：

1. **核心要点**
   - Menu 用于构建应用菜单和上下文菜单。
   - Tray 用于在系统托盘/菜单栏显示图标和菜单。
   - Notification 用于发送系统通知，通常由主进程发起。

2. **详细解释**

   应用菜单：
   ```js
   const { Menu } = require('electron');
   const template = [
     {
       label: 'File',
       submenu: [
         { label: 'Open', click: () => { /* ... */ } },
         { role: 'quit' },
       ],
     },
   ];
   Menu.setApplicationMenu(Menu.buildFromTemplate(template));
   ```

   系统托盘：
   ```js
   const { Tray, Menu } = require('electron');
   const tray = new Tray('/path/to/icon.png');
   const contextMenu = Menu.buildFromTemplate([
     { label: 'Show', click: () => win.show() },
     { label: 'Quit', click: () => app.quit() },
   ]);
   tray.setToolTip('My App');
   tray.setContextMenu(contextMenu);
   ```

   通知：
   ```js
   const { Notification } = require('electron');
   new Notification({ title: 'Hello', body: 'You have a message' }).show();
   ```

3. **平台差异**
   - macOS：应用菜单默认显示在屏幕顶部；Tray 图标显示在菜单栏；通知需要 app bundle ID。
   - Windows：Tray 在任务栏右下角；通知需要应用被固定到开始屏幕或具有有效签名。
   - Linux：通知依赖桌面环境（GNOME/KDE）和 `libnotify`。

4. **最佳实践**
   - 主进程负责创建 Menu、Tray、Notification，避免渲染进程直接调用系统级 UI。
   - 使用 `role` 遵循平台原生语义（如 `copy`、`paste`、`quit`）。

**评分维度**：
- 能分别说明 Menu、Tray、Notification 的作用（40%）
- 能写出基本使用示例（30%）
- 能提及平台差异和最佳实践（30%）

**常见错误**：
- 在渲染进程中直接创建 Tray 或 Notification。
- macOS 上最小化到托盘后点击 Dock 无法恢复窗口。
- 忽略不同平台通知权限和图标尺寸要求。

**延伸追问**：
- 如何实现点击托盘图标显示/隐藏窗口？
- 通知点击后如何激活对应窗口？

**相关题目**：
- [FB-48-SC-A-004 多窗口管理](#FB-48-SC-A-004)
- [FB-48-SD-R-001 大型应用整体架构](#FB-48-SD-R-001)

**参考资源**：
- [Menu 文档](https://www.electronjs.org/docs/latest/api/menu)
- [Tray 文档](https://www.electronjs.org/docs/latest/api/tray)
- [Notification 文档](https://www.electronjs.org/docs/latest/api/notification)

**口头回答版**：
> Menu 是应用菜单，用 Menu.buildFromTemplate 和 Menu.setApplicationMenu 设置；Tray 是系统托盘图标，创建 Tray 实例并设置右键菜单；Notification 是系统通知，主进程 new Notification 然后 show。平台差异要注意：macOS 菜单在顶部，Windows 托盘在右下角，通知权限和签名要求也不一样。这些一般都在主进程做。

---
## 进阶题（8 道）{#advanced}

### FB-48-CO-A-001：Electron IPC 有哪些通信方式？如何选择？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：48 Electron
**标签**：Electron、通信
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 Electron 中常见的 IPC 通信方式，包括 `ipcRenderer.send`、`ipcRenderer.invoke`、`ipcMain.on`、`ipcMain.handle` 等，并说明各自的适用场景。

**参考答案**：

1. **核心要点**
   - IPC 通信分为“单向发送”和“请求-响应”两种模式。
   - `send/on` 适合事件广播或无需返回结果的场景。
   - `invoke/handle` 适合需要返回 Promise 的调用，语义更接近函数调用。
   - `remote` 模块已废弃，应避免使用。

2. **详细解释**

   | 方式 | 调用方 | 处理方 | 返回值 | 适用场景 |
   |------|--------|--------|--------|----------|
   | `ipcRenderer.send(channel, ...args)` | 渲染进程 | `ipcMain.on(channel, handler)` | 无 | 通知主进程执行某个动作 |
   | `ipcRenderer.invoke(channel, ...args)` | 渲染进程 | `ipcMain.handle(channel, handler)` | Promise | 需要等待结果，如读取配置、查询数据 |
   | `webContents.send(channel, ...args)` | 主进程 | `ipcRenderer.on(channel, handler)` | 无 | 主进程向指定渲染进程广播 |
   | `ipcRenderer.once(channel, handler)` | 渲染进程 | - | 无 | 只监听一次，避免内存泄漏 |

3. **代码示例**

   ```js
   // 单向发送
   // renderer
   window.electronAPI.sendLog('page-mounted');

   // main
   ipcMain.on('log', (event, message) => {
     logger.info(message);
   });
   ```

   ```js
   // 请求-响应
   // renderer
   const user = await window.electronAPI.getUser(1);

   // main
   ipcMain.handle('get-user', async (event, id) => {
     return db.users.findById(id);
   });
   ```

4. **最佳实践**
   - 优先使用 `invoke/handle`，因为它天然支持 `async/await` 和错误透传。
   - 使用 `once` 或手动 `removeListener` 清理一次性监听。
   - 避免在 `ipcMain.on` 中执行同步阻塞操作，防止主进程卡顿。

**评分维度**：
- 能区分 send/on 与 invoke/handle 的语义差异（40%）
- 能说明主进程向渲染进程通信的方式（30%）
- 能指出 remote 已废弃并给出替代方案（30%）

**常见错误**：
- 用 `send/on` 模拟请求响应，结果需要维护回调 ID，容易出错。
- 忘记清理 `ipcRenderer.on` 监听器，导致渲染进程内存泄漏。
- 误认为 `remote` 仍然推荐。

**延伸追问**：
- 如果需要在多个渲染进程之间广播消息，怎么做？
- `ipcMain.handle` 中抛出的错误如何被渲染进程捕获？

**相关题目**：
- [FB-48-CD-B-006 手写简单 IPC 调用](#FB-48-CD-B-006)
- [FB-48-CD-A-002 用 contextBridge 暴露安全 API](#FB-48-CD-A-002)

**参考资源**：
- [Electron IPC 教程](https://www.electronjs.org/docs/latest/tutorial/ipc)

**口头回答版**：
> Electron IPC 主要分单向和请求响应。单向用 ipcRenderer.send 配合 ipcMain.on，适合通知；请求响应用 invoke 配合 handle，返回 Promise，更像函数调用。主进程给渲染进程发消息用 webContents.send。remote 已经废弃，不要用。优先 invoke/handle，记得清理监听器。

---

### FB-48-CD-A-002：如何在 preload 中通过 contextBridge 安全地暴露 API？

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：48 Electron
**标签**：Electron、安全、沙箱、通信
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请手写一个 preload 脚本，向渲染进程暴露一组受控 API，要求对 IPC 频道做白名单校验，并支持事件订阅与取消订阅。

**参考答案**：

1. **核心要点**
   - 使用 `contextBridge.exposeInMainWorld` 暴露 API。
   - 对 `send` 和 `on` 的频道做白名单校验，防止页面调用未授权频道。
   - 订阅函数需要包装，确保 `ipcRenderer.removeListener` 能正确移除。

2. **代码示例**

   ```js
   // preload.js
   const { contextBridge, ipcRenderer } = require('electron');

   const VALID_SEND_CHANNELS = ['save-file', 'open-dialog'];
   const VALID_RECEIVE_CHANNELS = ['file-saved', 'theme-changed'];

   contextBridge.exposeInMainWorld('electronAPI', {
     // 发送（单向）
     send: (channel, data) => {
       if (VALID_SEND_CHANNELS.includes(channel)) {
         ipcRenderer.send(channel, data);
       } else {
         console.error(`Unauthorized send channel: ${channel}`);
       }
     },

     // 请求响应
     invoke: (channel, ...args) => {
       if (VALID_SEND_CHANNELS.includes(channel)) {
         return ipcRenderer.invoke(channel, ...args);
       }
       return Promise.reject(new Error(`Unauthorized invoke channel: ${channel}`));
     },

     // 订阅事件
     on: (channel, callback) => {
       if (!VALID_RECEIVE_CHANNELS.includes(channel)) {
         console.error(`Unauthorized receive channel: ${channel}`);
         return () => {};
       }

       const wrapper = (event, ...args) => callback(...args);
       ipcRenderer.on(channel, wrapper);

       // 返回取消订阅函数
       return () => {
         ipcRenderer.removeListener(channel, wrapper);
       };
     },
   });
   ```

   ```js
   // renderer.js
   window.electronAPI.send('save-file', { content: 'hello' });

   const unsubscribe = window.electronAPI.on('theme-changed', (theme) => {
     document.body.className = theme;
   });

   // 组件卸载时取消订阅
   unsubscribe();
   ```

3. **最佳实践**
   - 白名单应放在 preload 脚本中，而不是渲染进程，防止被绕过。
   - 不要在 preload 中暴露 `ipcRenderer.sendSync`，它会阻塞渲染进程。
   - 暴露的回调函数需要封装，避免直接把页面函数传给 `ipcRenderer.on`。

**评分维度**：
- 正确使用 `contextBridge` 暴露 API（30%）
- 对发送和接收频道做白名单校验（30%）
- 正确实现订阅/取消订阅封装（25%）
- 安全选项与最小权限意识（15%）

**常见错误**：
- 把白名单逻辑放在渲染进程，页面可篡改。
- 直接暴露 `ipcRenderer.on` 给页面，导致页面可以监听任意频道。
- 取消订阅时传入原函数不一致，导致监听器未移除。

**延伸追问**：
- 如果渲染进程需要传递回调给主进程，怎么做才安全？
- 如何避免 preload 脚本被重复加载导致事件重复注册？

**相关题目**：
- [FB-48-CO-B-005 contextIsolation 与 nodeIntegration](#FB-48-CO-B-005)
- [FB-48-SE-A-003 安全最佳实践](#FB-48-SE-A-003)

**参考资源**：
- [contextBridge 文档](https://www.electronjs.org/docs/latest/api/context-bridge)

**口头回答版**：
> 在 preload 里用 contextBridge.exposeInMainWorld 暴露 API。要对 IPC 频道做白名单，只有允许的频道才能 send 或 invoke。对于 on 订阅，要在 preload 里包一层 wrapper，然后返回一个取消订阅函数，让渲染进程在组件卸载时调用。不要把 ipcRenderer 整个暴露出去。

---

### FB-48-SE-A-003：Electron 应用应该遵循哪些安全最佳实践？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：48 Electron
**标签**：Electron、安全、CSP、沙箱
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请从进程隔离、渲染策略、内容安全策略、更新与签名等方面，说明 Electron 应用应采取的安全措施。

**参考答案**：

1. **核心要点**
   - Electron 的安全目标是让渲染进程即使被攻破，也无法危及用户系统。
   - 核心手段：隔离、沙箱、最小权限、CSP、签名更新、禁用危险 API。

2. **详细解释**

   进程与渲染安全：
   - `contextIsolation: true` + `nodeIntegration: false` + `sandbox: true` 是基线。
   - 禁用 `enableRemoteModule` 和 `allowRunningInsecureContent`。
   - 不要加载远程不可信内容到主窗口；如需加载，使用 `<webview>` 或 `BrowserView` 并开启沙箱。

   内容安全策略（CSP）：
   - 通过 HTTP 头或 `<meta>` 标签设置 CSP：
     ```html
     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self';">
     ```
   - 禁止 `unsafe-inline`、`unsafe-eval`，限制只能加载本地资源。

   链接与弹窗：
   - 拦截 `window.open` 和新窗口请求，统一用 `shell.openExternal` 打开外部链接。
   - 对 `will-navigate` 和 `new-window` 事件做 URL 白名单校验。

   更新与签名：
   - 启用自动更新并校验签名，防止中间人替换安装包。
   - 使用 HTTPS 分发更新文件和更新服务器。

3. **最佳实践清单**

   ```js
   const win = new BrowserWindow({
     webPreferences: {
       nodeIntegration: false,
       contextIsolation: true,
       sandbox: true,
       enableRemoteModule: false,
       allowRunningInsecureContent: false,
       webSecurity: true,
       preload: path.join(__dirname, 'preload.js'),
     },
   });
   ```

**评分维度**：
- 能说出渲染进程安全基线配置（40%）
- 能说明 CSP 的作用和配置方式（25%）
- 能说明链接拦截、签名更新等防御措施（20%）
- 能解释“最小权限”原则（15%）

**常见错误**：
- 为省事开启 `nodeIntegration: true`。
- CSP 设置过宽，允许 `unsafe-inline` 或远程脚本。
- 直接信任用户输入并用于 `shell.openExternal`。

**延伸追问**：
- 如果应用必须加载第三方网页，如何最大程度降低风险？
- Electron 的 `sandbox` 和 Chromium 的沙箱是什么关系？

**相关题目**：
- [FB-48-CO-B-005 contextIsolation 与 nodeIntegration](#FB-48-CO-B-005)
- [FB-48-SE-P-002 preload 与上下文隔离安全模型](#FB-48-SE-P-002)

**参考资源**：
- [Electron 安全最佳实践](https://www.electronjs.org/docs/latest/tutorial/security)
- [Electron CSP 指南](https://www.electronjs.org/docs/latest/tutorial/security#content-security-policy)

**口头回答版**：
> Electron 安全核心就是让渲染进程即使被攻破也动不了系统。基线配置是 contextIsolation true、nodeIntegration false、sandbox true，禁用 remote。还要配 CSP，禁止 inline 和 eval，限制只加载本地资源。外部链接用 shell.openExternal 打开，并对 will-navigate 做白名单。最后更新包要签名、走 HTTPS。

---

### FB-48-SC-A-004：如何实现 Electron 多窗口管理与状态同步？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：48 Electron
**标签**：Electron、平台、模块化、通信
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
在一个需要支持多个独立窗口的 Electron 应用中，你如何管理窗口生命周期、实现窗口间通信，并保持关键状态同步？

**参考答案**：

1. **核心要点**
   - 使用一个窗口管理器集中维护 `BrowserWindow` 实例，避免直接散落创建逻辑。
   - 状态同步以主进程为“唯一数据源”，通过 IPC 广播变更。
   - 不同窗口通过唯一 ID 标识，便于定向通信。

2. **详细解释**

   窗口管理器示例：

   ```js
   // window-manager.js
   const { BrowserWindow } = require('electron');
   const windows = new Map();

   function createWindow(name, options = {}) {
     const win = new BrowserWindow({
       width: 800,
       height: 600,
       show: false,
       ...options,
     });
     win.loadFile(`${name}.html`);
     win.once('ready-to-show', () => win.show());

     const id = win.id;
     windows.set(id, { name, win });

     win.on('closed', () => windows.delete(id));
     return win;
   }

   function broadcast(channel, ...args) {
     for (const { win } of windows.values()) {
       if (!win.isDestroyed()) {
         win.webContents.send(channel, ...args);
       }
     }
   }

   module.exports = { createWindow, broadcast, windows };
   ```

   状态同步：
   - 主进程维护一份应用状态（如当前登录用户、主题、未读消息数）。
   - 窗口创建时主动推送一次当前状态；状态变更时通过 `broadcast` 通知所有窗口。
   - 渲染进程通过 `window.electronAPI.on('state-changed', handler)` 订阅。

3. **最佳实践**
   - 不要在窗口之间直接通信，统一经过主进程中转，便于管控和日志。
   - 关闭窗口前保存布局/状态，下次启动恢复。
   - macOS 下所有窗口关闭后保持应用活跃，通过 `activate` 事件恢复窗口。

**评分维度**：
- 能设计窗口管理器并维护窗口集合（30%）
- 能以主进程为中心实现状态同步（30%）
- 能实现窗口间广播与定向通信（25%）
- 能考虑生命周期与跨平台行为（15%）

**常见错误**：
- 在多个文件里直接 `new BrowserWindow`，窗口状态无法统一管理。
- 渲染进程之间直接通过 `localStorage` 或 BroadcastChannel 同步，绕过主进程管控。
- 窗口关闭后未清理引用，导致内存泄漏。

**延伸追问**：
- 如果窗口数量很多，如何避免主进程成为性能瓶颈？
- 如何实现“只运行一个实例”并激活已有窗口？

**相关题目**：
- [FB-48-CO-B-002 启动流程](#FB-48-CO-B-002)
- [FB-48-SC-R-005 多窗口状态同步架构](#FB-48-SC-R-005)

**参考资源**：
- [BrowserWindow 管理示例](https://www.electronjs.org/docs/latest/tutorial/window-customization)

**口头回答版**：
> 多窗口我会做一个窗口管理器，统一管理所有 BrowserWindow 实例，用 Map 存起来，给每个窗口一个 ID。状态同步以主进程为唯一数据源，窗口创建时推送一次当前状态，状态变了就广播给所有还活着的窗口。窗口之间不直接通信，统一走主进程，方便管控和日志。macOS 所有窗口关了应用还跑着，要点 Dock 能恢复。

---

### FB-48-PE-A-005：Electron 应用有哪些性能优化手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：48 Electron
**标签**：Electron、性能优化、用户体验
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请从启动速度、包体积、运行时内存与渲染流畅度四个维度，介绍 Electron 应用的常见性能优化方案。

**参考答案**：

1. **核心要点**
   - Electron 应用性能问题常集中在“启动慢、包体大、内存高、渲染卡”。
   - 优化需要兼顾主进程、渲染进程、构建产物和分发策略。

2. **详细解释**

   启动速度：
   - 使用 `show: false` + `ready-to-show` 避免白屏。
   - 延迟加载非首屏模块，首页只加载必要资源。
   - 主进程避免在 `ready` 回调中执行同步初始化。

   包体积：
   - 使用 `electron-builder` 的 `files` 白名单，只打包必要文件。
   - 移除未使用的依赖，使用 `npm prune --production`。
   - 按平台分包，避免 Windows 用户下载 macOS 资源。
   - 使用 asar 打包，但避免把大资源文件放入 asar。

   运行时内存：
   - 及时关闭不用的 `BrowserWindow` 和 `BrowserView`。
   - 清理 IPC 监听器，避免闭包长期持有窗口引用。
   - 对大数据分页/虚拟滚动，避免一次性渲染大量 DOM。

   渲染流畅度：
   - 避免在主进程执行耗时计算，使用 Worker 或隐藏窗口。
   - 使用 `requestAnimationFrame` 做动画，减少重排重绘。
   - 复杂页面使用路由懒加载和代码分割。

3. **代码示例**

   ```js
   // 延迟展示窗口，提升首屏体验
   const win = new BrowserWindow({ show: false });
   win.loadFile('index.html');
   win.once('ready-to-show', () => win.show());
   ```

4. **最佳实践**
   - 使用 Performance 和 Memory DevTools 定期分析渲染进程。
   - 使用 `process.memoryUsage()` 和 `app.getAppMetrics()` 监控主进程与渲染进程内存。

**评分维度**：
- 能从启动、包体积、内存、渲染四个维度分析（40%）
- 能给出具体优化措施和代码示例（30%）
- 能提到监控与度量的手段（30%）

**常见错误**：
- 只优化渲染进程，忽略主进程阻塞导致的卡顿。
- 把 node_modules 全部打进 asar，导致包体巨大。
- 窗口隐藏后仍保留大量引用和监听器。

**延伸追问**：
- 如何测量 Electron 应用的真实启动时间？
- `BrowserView` 和 `webview` 在性能上有什么区别？

**相关题目**：
- [FB-48-PE-P-003 内存管理与泄漏排查](#FB-48-PE-P-003)
- [FB-48-SD-R-001 大型应用整体架构](#FB-48-SD-R-001)

**参考资源**：
- [Electron 性能优化指南](https://www.electronjs.org/docs/latest/tutorial/performance)

**口头回答版**：
> Electron 性能优化主要从四块入手：启动速度、包体积、内存、渲染。启动时用 show false 加 ready-to-show 再显示，延迟加载非首屏。包体积用 builder 白名单、删无用依赖、按平台分包。内存要及时关窗口、清理监听器。渲染避免主进程阻塞，复杂页面做懒加载和虚拟滚动。还要用 DevTools 和 app.getAppMetrics 做监控。

---

### FB-48-CO-A-006：Electron 自动更新是如何工作的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：48 Electron
**标签**：Electron、发布、部署
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 自动更新的常见实现方案、核心事件及 macOS 与 Windows 在更新流程上的差异。

**参考答案**：

1. **核心要点**
   - Electron 官方提供 `autoUpdater` 模块，但只支持 macOS 和 Windows。
   - 社区常用 `electron-updater`（`electron-builder` 配套），支持更多发布目标（S3、GitHub、Generic）。
   - Linux 通常通过包管理器（deb/rpm/AppImage/snap）分发更新。

2. **详细解释**

   基本流程：

   ```text
   应用启动 → 检查更新服务器 → 发现新版本 → 下载更新包 →
   通知用户 → 退出并安装（Windows：silent；macOS：next-launch）
   ```

   核心事件（electron-updater）：

   | 事件 | 说明 |
   |------|------|
   | `checking-for-update` | 正在检查更新 |
   | `update-available` | 发现新版本 |
   | `update-not-available` | 当前已是最新 |
   | `download-progress` | 下载进度 |
   | `update-downloaded` | 下载完成，可调用 quitAndInstall |
   | `error` | 更新出错 |

3. **代码示例**

   ```js
   const { autoUpdater } = require('electron-updater');

   function setupUpdater() {
     autoUpdater.checkForUpdatesAndNotify();

     autoUpdater.on('update-available', (info) => {
       console.log('Update available', info.version);
     });

     autoUpdater.on('update-downloaded', () => {
       autoUpdater.quitAndInstall();
     });
   }
   ```

4. **平台差异**
   - macOS：应用必须经过签名和公证（notarization），否则 `autoUpdater` 无法替换应用。
   - Windows：使用 Squirrel.Windows 打包的 `.exe` 安装包支持自动更新；签名可避免 SmartScreen 拦截。
   - Linux：一般不使用 autoUpdater，依赖系统包管理器。

**评分维度**：
- 能说明自动更新的基本流程（30%）
- 能列举核心事件及含义（30%）
- 能说明 macOS/Windows 签名与平台差异（25%）
- 能给出配置或代码示例（15%）

**常见错误**：
- 在 macOS 上未签名/未公证就期望自动更新生效。
- 更新服务器返回 HTTP，导致中间人劫持。
- Linux 也使用 autoUpdater，结果无效。

**延伸追问**：
- 如何实现灰度更新，只让部分用户收到更新？
- 如果用户拒绝更新，如何保证旧版本仍可用？

**相关题目**：
- [FB-48-EN-A-007 打包与代码签名](#FB-48-EN-A-007)
- [FB-48-SD-R-003 自动更新与灰度分发策略](#FB-48-SD-R-003)

**参考资源**：
- [electron-updater 文档](https://www.electron.build/auto-update.html)
- [Electron autoUpdater 文档](https://www.electronjs.org/docs/latest/api/auto-updater)

**口头回答版**：
> Electron 自动更新常用 electron-updater，它配合 electron-builder 可以从 S3、GitHub 或 generic 服务器拉更新。流程是检查更新、发现新版本、下载、通知、退出安装。常用事件有 update-available、download-progress、update-downloaded。macOS 必须签名和公证才能自动更新，Windows 也要签名避免拦截，Linux 一般走包管理器。

---

### FB-48-EN-A-007：Electron 打包与代码签名的流程是什么？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：48 Electron
**标签**：Electron、构建、签名
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍使用 `electron-builder` 打包 Electron 应用的基本流程，并说明 macOS 和 Windows 代码签名的要求与实践。

**参考答案**：

1. **核心要点**
   - `electron-builder` 通过读取 `package.json` 的 `build` 字段生成安装包。
   - 代码签名用于证明应用来源可信，是自动更新、系统信任的前提。
   - macOS 需要 Apple Developer ID 证书 + 公证；Windows 需要代码签名证书（EV/OV）。

2. **详细解释**

   打包配置示例：

   ```json
   {
     "build": {
       "appId": "com.example.myapp",
       "productName": "MyApp",
       "directories": {
         "output": "dist"
       },
       "files": [
         "build/**/*",
         "main/**/*",
         "node_modules/**/*",
         "package.json"
       ],
       "mac": {
         "category": "public.app-category.productivity",
         "target": "dmg"
       },
       "win": {
         "target": "nsis"
       },
       "publish": {
         "provider": "github"
       }
     }
   }
   ```

   打包命令：
   ```bash
   electron-builder --mac --win --linux
   ```

   代码签名：
   - macOS：配置 `CSC_LINK`（p12 文件）和 `CSC_KEY_PASSWORD`；Electron-builder 会自动签名。公证需额外配置 `APPLE_ID`、`APPLE_APP_SPECIFIC_PASSWORD`、`APPLE_TEAM_ID`。
   - Windows：配置 `CSC_LINK`（p12）或 `WIN_CSC_LINK`；EV 证书通常通过硬件令牌或 CI 签名服务调用。

3. **最佳实践**
   - 将证书密码、Apple 专用密码通过 CI  Secrets 注入，不要提交到仓库。
   - 本地开发关闭签名，CI 构建时启用签名。
   - 打包前运行测试并做依赖审计，避免把开发依赖打进产物。

**评分维度**：
- 能说明 electron-builder 基本配置（30%）
- 能说明 macOS 签名与公证要求（30%）
- 能说明 Windows 签名证书类型（20%）
- 能给出 CI/安全实践（20%）

**常见错误**：
- 把签名证书和密码直接放在代码仓库。
- 混淆 macOS 的 App Store 证书与 Developer ID 证书。
- Windows 使用自签名证书期望消除 SmartScreen。

**延伸追问**：
- 未签名的 macOS 应用如何分发？有什么限制？
- CI 中如何安全地存储和使用签名证书？

**相关题目**：
- [FB-48-CO-A-006 自动更新机制](#FB-48-CO-A-006)
- [FB-48-EN-R-006 CI/CD 签名公证流水线](#FB-48-EN-R-006)

**参考资源**：
- [electron-builder 代码签名](https://www.electron.build/code-signing)
- [Apple 公证指南](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution)

**口头回答版**：
> 用 electron-builder 打包时，在 package.json 的 build 字段里配 appId、productName、files、mac/win/linux 目标。打包命令是 electron-builder --mac --win。代码签名方面，macOS 需要 Apple Developer ID 证书，还要公证，配 CSC_LINK、APPLE_ID 这些环境变量；Windows 用代码签名证书，EV 最好。证书密码一定要走 CI Secrets，别提交到仓库。

---

### FB-48-EN-A-008：Electron 应用如何制定测试策略？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：48 Electron
**标签**：Electron、测试框架、自动化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请为 Electron 应用设计一套测试策略，覆盖单元测试、集成测试和端到端测试，并说明如何选择工具。

**参考答案**：

1. **核心要点**
   - Electron 测试应分层：单元测试测渲染/主进程逻辑，集成测试测 IPC 契约，E2E 测完整用户流程。
   - 优先使用 Playwright 或 Spectron 继任方案进行 E2E；单元测试可用 Jest/Vitest。

2. **详细解释**

   单元测试：
   - 渲染进程组件/工具函数：使用 Vitest + jsdom 或 happy-dom。
   - 主进程纯函数：在 Node 环境下直接 Jest/Vitest 测试。
   - Electron API 依赖使用 mock，避免真正启动 Electron。

   IPC 集成测试：
   - 启动 Electron 应用，通过 `ipcRenderer.invoke` 或暴露的测试钩子调用主进程服务。
   - 验证主进程对渲染进程请求的响应是否符合契约。

   E2E 测试：
   - Playwright：支持 Electron 应用启动和页面操作，示例：
     ```js
     const { electronLauncher } = require('playwright');
     const electronApp = await electronLauncher.launch({ args: ['.'] });
     const page = await electronApp.firstWindow();
     await page.click('text=Open');
     await expect(page.locator('text=File loaded')).toBeVisible();
     await electronApp.close();
     ```
   - Spectron 已停止维护，新项目不推荐。

3. **最佳实践**
   - 将业务逻辑与 Electron API 解耦，便于 mock 和单元测试。
   - 在 CI 中使用 headless 模式运行 E2E，设置合理的超时。
   - 对关键 IPC 频道编写契约测试，防止主/渲染接口不同步。

**评分维度**：
- 能设计分层测试策略（30%）
- 能说明各层工具选择及原因（30%）
- 能给出 IPC 契约测试或 E2E 示例（25%）
- 能提到 CI 与 mock 实践（15%）

**常见错误**：
- 只写 E2E，导致测试慢且不稳定。
- 在单元测试中直接引入 Electron 模块，环境配置复杂。
- 主进程与渲染进程接口变更后没有同步更新测试。

**延伸追问**：
- 如何测试 preload 脚本中的白名单逻辑？
- 主进程崩溃如何用 E2E 捕获？

**相关题目**：
- [FB-48-CD-A-002 用 contextBridge 暴露安全 API](#FB-48-CD-A-002)
- [FB-48-CP-P-006 崩溃报告与错误监控](#FB-48-CP-P-006)

**参考资源**：
- [Playwright Electron 测试](https://playwright.dev/docs/api/class-electron)
- [Electron 测试文档](https://www.electronjs.org/docs/latest/tutorial/automated-testing)

**口头回答版**：
> Electron 测试我分三层：单元测试用 Vitest/Jest，渲染组件和主进程纯逻辑分别跑；IPC 集成测试启动应用后验证主/渲染契约；E2E 用 Playwright，它能直接启动 Electron 应用并操作页面。Spectron 已经废弃，新项目别用。关键是把业务逻辑和 Electron API 解耦，好 mock。

---
## 深入题（7 道）{#proficient}

### FB-48-FS-P-001：Electron 的进程模型与 Chromium 有什么关系？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：48 Electron
**标签**：Electron、平台、生命周期
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请从架构层面说明 Electron 的进程模型，并解释它如何利用 Chromium 的多进程架构，以及主进程在其中的角色。

**参考答案**：

1. **核心要点**
   - Electron 将 Chromium 的“浏览器进程”替换为主进程（Node.js + Electron 嵌入层）。
   - 每个 `BrowserWindow` 对应 Chromium 的一个渲染进程（Renderer Process）。
   - Electron 还包含 GPU 进程、网络服务进程、工具进程等辅助进程。

2. **详细解释**

   Chromium 原始模型：
   - Browser Process：负责 UI、标签页管理、网络、存储等。
   - Renderer Process：每个标签页一个，负责页面渲染与 JS 执行。
   - GPU Process：负责图形渲染。
   - Network Service：负责网络请求。

   Electron 模型：
   - 主进程 ≈ Chromium Browser Process + Node.js 运行时 + 系统 API 访问能力。
   - 渲染进程 ≈ Chromium Renderer Process，但 Electron 注入 Node.js/Electron API（受 `webPreferences` 控制）。
   - 主进程通过 `webContents` 控制渲染进程，与 Chromium Browser Process 控制标签页类似。

   关键差异：
   - Chromium 的 Browser Process 不运行页面 JS，而 Electron 主进程可以运行任意 Node.js 代码。
   - Electron 渲染进程默认与 Node.js 隔离，但可通过配置打破隔离，这也是安全模型的关键。

3. **最佳实践**
   - 理解主进程不能阻塞，否则所有渲染进程的交互都会卡顿。
   - 大量计算应放到 Worker、隐藏窗口或原生模块，而不是主进程。

**评分维度**：
- 能说明 Electron 主进程替代 Chromium Browser Process 的角色（40%）
- 能描述渲染进程、GPU 进程、网络服务进程的关系（30%）
- 能指出主进程阻塞对所有渲染进程的影响（30%）

**常见错误**：
- 认为主进程就是 Chromium 的渲染进程。
- 忽略 GPU 进程和网络服务进程在 Electron 中的存在。
- 在主进程中执行耗时操作而不自知。

**延伸追问**：
- 一个 `BrowserWindow` 一定对应一个渲染进程吗？什么情况下会复用？
- Electron 的 Service Worker 和 Shared Worker 行为与浏览器有什么不同？

**相关题目**：
- [FB-48-CO-B-001 主进程与渲染进程](#FB-48-CO-B-001)
- [FB-48-SD-R-001 大型应用整体架构](#FB-48-SD-R-001)

**参考资源**：
- [Electron 进程模型](https://www.electronjs.org/docs/latest/tutorial/process-model)
- [Chromium 多进程架构](https://www.chromium.org/developers/design-documents/multi-process-architecture/)

**口头回答版**：
> Electron 基于 Chromium 的多进程架构，但把 Chromium 的 Browser Process 换成了我们自己的主进程，主进程里有 Node.js 和系统 API。每个 BrowserWindow 对应一个 Chromium 的渲染进程。此外还有 GPU 进程、网络服务进程等。主进程一旦阻塞，所有窗口都会卡，所以重活要放到 Worker 或隐藏窗口。

---

### FB-48-SE-P-002：preload 与 contextIsolation 的底层安全模型是怎样的？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：48 Electron
**标签**：Electron、安全、沙箱、CSP
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请深入解释 preload 脚本与 `contextIsolation` 在 V8 层面是如何工作的，以及 `contextBridge` 为何能安全地在两个上下文之间传递数据。

**参考答案**：

1. **核心要点**
   - `contextIsolation: true` 时，preload 脚本与页面脚本运行在不同的 V8 上下文中（World）。
   - `contextBridge` 使用结构化克隆算法（Structured Clone Algorithm）在两个 World 之间复制数据，避免共享引用。
   - 这种机制类似 Chrome 扩展的内容脚本隔离。

2. **详细解释**

   V8 上下文隔离：
   - 渲染进程内部可以存在多个 V8 Context（World）。
   - 页面脚本运行在“主 World”，preload 脚本运行在独立的“preload World”。
   - 两个 World 的全局对象（`window`）互不相同，prototype chain 也隔离。

   `contextBridge.exposeInMainWorld`：
   - 将 preload World 中的对象“克隆”到主 World 的 `window` 上。
   - 复制过程使用 Structured Clone Algorithm，函数会被包装为可调用句柄，但无法传递原型链、DOM 节点、Promise 等。
   - 暴露后的对象在主 World 中是只读/不可扩展的，页面无法篡改其结构。

   安全意义：
   - 即使页面脚本存在 XSS，攻击者也无法访问 preload 内部变量或 `require`。
   - 页面只能调用经 `contextBridge` 暴露且白名单化的接口。

3. **代码示例**

   ```js
   // preload.js
   const { contextBridge, ipcRenderer } = require('electron');

   contextBridge.exposeInMainWorld('api', {
     // 暴露的函数在主 World 中可被调用
     readFile: (path) => ipcRenderer.invoke('read-file', path),
   });
   ```

4. **最佳实践**
   - 永远不要关闭 `contextIsolation` 来绕过通信限制。
   - 暴露的 API 应尽量保持幂等、参数校验严格，避免传递函数回调。

**评分维度**：
- 能说明 V8 World / Context 隔离的概念（35%）
- 能解释 contextBridge 使用结构化克隆传递数据（35%）
- 能分析该模型对 XSS 攻击的防御价值（30%）

**常见错误**：
- 认为 `contextBridge` 只是简单的 `window.api = ...`。
- 在 `contextIsolation: false` 下使用 `contextBridge`，此时隔离已失效。
- 暴露复杂对象或 DOM 节点，导致克隆失败或行为异常。

**延伸追问**：
- `contextBridge` 暴露的 Promise 为什么不能直接返回？
- 如果需要在两个 World 之间共享一个单例对象，应该怎么做？

**相关题目**：
- [FB-48-CO-B-004 preload 脚本](#FB-48-CO-B-004)
- [FB-48-SE-A-003 安全最佳实践](#FB-48-SE-A-003)

**参考资源**：
- [Electron Context Isolation 深入文档](https://www.electronjs.org/docs/latest/tutorial/context-isolation)
- [Chromium Isolated Worlds](https://www.chromium.org/blink/webcomponents/#Isolated-Worlds)

**口头回答版**：
> contextIsolation 为 true 时，preload 和页面脚本跑在不同的 V8 上下文里，互相看不到对方的 window 和原型链。contextBridge 通过结构化克隆把 preload 里的对象复制一份到页面的 window 上，页面只能拿到暴露出来的只读接口。这样即使页面被 XSS，也拿不到 preload 内部的 require 和 ipcRenderer。

---

### FB-48-PE-P-003：Electron 如何进行内存管理与泄漏排查？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：48 Electron
**标签**：Electron、内存泄漏、性能优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用的内存模型，并给出常见的内存泄漏场景、排查工具及优化方案。

**参考答案**：

1. **核心要点**
   - Electron 应用内存由主进程和多个渲染进程共同占用，进程级隔离使泄漏通常局限在单个窗口。
   - 常见泄漏：IPC 监听器未清理、窗口引用被长期持有、DOM/闭包累积、原生模块未释放。

2. **详细解释**

   内存模型：
   - 主进程：管理窗口、处理系统事件，泄漏会全局影响应用。
   - 渲染进程：每个窗口独立，JavaScript 堆、DOM、V8 引擎都在其中。
   - 原生模块：C++ 扩展可能产生 V8 堆外内存泄漏。

   常见泄漏场景：
   - 在 `ipcRenderer.on` 中注册监听器，窗口关闭前未移除。
   - 主进程持有已关闭窗口的引用，导致窗口对象无法回收。
   - 使用 `BrowserView` 或 `webContents` 后未调用 `destroy()`。
   - 大数组/对象长期缓存在内存中且无淘汰策略。

   排查工具：
   - 渲染进程：DevTools Memory 面板，抓取 Heap Snapshot 对比差异。
   - 主进程：`--inspect` 启动后用 Chrome DevTools 附加，抓取 Heap Snapshot。
   - 进程级监控：`app.getAppMetrics()`、`process.memoryUsage()`。

3. **代码示例**

   ```js
   // 及时清理监听器
   const { ipcRenderer } = require('electron');

   function onThemeChange(handler) {
     const wrapper = (event, theme) => handler(theme);
     ipcRenderer.on('theme-change', wrapper);
     return () => ipcRenderer.removeListener('theme-change', wrapper);
   }
   ```

4. **最佳实践**
   - 窗口关闭时清理所有 IPC 监听、定时器和订阅。
   - 避免在主进程中缓存整个窗口对象，必要时使用 WeakRef。
   - 对大数据使用分页、虚拟滚动或磁盘缓存。
   - 定期使用 Heap Snapshot 做回归测试。

**评分维度**：
- 能说明主进程与渲染进程的内存模型（30%）
- 能列举 3 个以上常见泄漏场景（30%）
- 能使用 DevTools Heap Snapshot 等工具排查（25%）
- 能给出预防和清理方案（15%）

**常见错误**：
- 只在渲染进程中排查，忽略主进程泄漏。
- 关闭窗口后仍通过全局变量持有 `BrowserWindow` 实例。
- 使用 `setInterval` 未清理，导致渲染进程持续运行。

**延伸追问**：
- 如何判断是主进程还是渲染进程内存泄漏？
- 原生模块导致的堆外内存泄漏如何定位？

**相关题目**：
- [FB-48-PE-A-005 性能优化](#FB-48-PE-A-005)
- [FB-48-SC-A-004 多窗口管理](#FB-48-SC-A-004)

**参考资源**：
- [Electron 性能指南 - 内存](https://www.electronjs.org/docs/latest/tutorial/performance#memory)
- [Chrome DevTools Memory 面板](https://developer.chrome.com/docs/devtools/memory/)

**口头回答版**：
> Electron 内存分主进程和各个渲染进程。泄漏常见有几种：IPC 监听没清、窗口关了但主进程还引用着、BrowserView 没 destroy、闭包里 hoard 大对象。排查时渲染进程直接用 DevTools Memory 抓 Heap Snapshot，主进程要加 --inspect 用 Chrome 附加。预防措施是窗口关闭时清理监听器和引用，大数据分页或虚拟滚动。

---

### FB-48-CD-P-004：请手写一个带超时控制和类型安全的 IPC 调用封装

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：48 Electron
**标签**：Electron、通信、模块化
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请在 preload 和渲染进程侧手写一个 IPC 调用封装，要求：
1. 支持调用超时自动拒绝；
2. 渲染进程侧有类型约束；
3. 频道名做白名单校验。

**参考答案**：

1. **核心要点**
   - 使用 `Promise.race` 实现超时控制。
   - 使用 TypeScript 泛型定义 IPC 频道契约，让渲染侧调用时获得类型提示。
   - 白名单校验放在 preload 中，避免被页面绕过。

2. **代码示例**

   ```ts
   // ipc-channels.ts（渲染进程与 preload 共享的契约）
   export interface IpcChannels {
     'get-user': { args: [id: number]; return: { id: number; name: string } };
     'save-file': { args: [content: string]; return: boolean };
   }
   ```

   ```ts
   // preload.ts
   import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
   import type { IpcChannels } from './ipc-channels';

   type Channel = keyof IpcChannels;
   const VALID_CHANNELS: Channel[] = ['get-user', 'save-file'];

   function isValidChannel(channel: string): channel is Channel {
     return VALID_CHANNELS.includes(channel as Channel);
   }

   const api = {
     invoke: <K extends Channel>(
       channel: K,
       ...args: IpcChannels[K]['args']
     ): Promise<IpcChannels[K]['return']> => {
       if (!isValidChannel(channel)) {
         return Promise.reject(new Error(`Unauthorized channel: ${channel}`));
       }
       return ipcRenderer.invoke(channel, ...args) as Promise<IpcChannels[K]['return']>;
     },

     on: <K extends Channel>(
       channel: K,
       callback: (...args: IpcChannels[K]['args']) => void
     ) => {
       if (!isValidChannel(channel)) return () => {};
       const wrapper = (_event: IpcRendererEvent, ...args: IpcChannels[K]['args']) =>
         callback(...args);
       ipcRenderer.on(channel, wrapper);
       return () => ipcRenderer.removeListener(channel, wrapper);
     },
   };

   contextBridge.exposeInMainWorld('electronAPI', api);
   ```

   ```ts
   // renderer.ts
   import type { IpcChannels } from './ipc-channels';

   declare global {
     interface Window {
       electronAPI: {
         invoke: <K extends keyof IpcChannels>(
           channel: K,
           ...args: IpcChannels[K]['args']
         ) => Promise<IpcChannels[K]['return']>;
       };
     }
   }

   async function invokeWithTimeout<K extends keyof IpcChannels>(
     channel: K,
     timeoutMs: number,
     ...args: IpcChannels[K]['args']
   ): Promise<IpcChannels[K]['return']> {
     return Promise.race([
       window.electronAPI.invoke(channel, ...args),
       new Promise<never>((_, reject) =>
         setTimeout(() => reject(new Error(`IPC timeout: ${channel}`)), timeoutMs)
       ),
     ]);
   }

   // 使用
   const user = await invokeWithTimeout('get-user', 5000, 1);
   ```

3. **最佳实践**
   - IPC 契约文件由主进程、preload、渲染进程共享，确保三端一致。
   - 超时时间应根据操作合理设置，避免过短导致正常请求失败。
   - 对超时 Promise 做取消或忽略后续结果处理，防止竞态。

**评分维度**：
- preload 实现白名单校验和类型安全（35%）
- 渲染侧实现超时封装（30%）
- 能说明 IPC 契约共享方案（20%）
- 考虑取消/竞态处理（15%）

**常见错误**：
- 超时只 reject，但没有阻止后续 IPC 响应被处理。
- 白名单放在渲染进程，可被绕过。
- TypeScript 泛型约束错误，导致调用端失去类型提示。

**延伸追问**：
- 如果主进程处理时间确实超过超时时间，如何优雅降级？
- 如何在 preload 中支持取消一个正在进行的 invoke？

**相关题目**：
- [FB-48-CD-A-002 用 contextBridge 暴露安全 API](#FB-48-CD-A-002)
- [FB-48-CO-A-001 IPC 通信方式](#FB-48-CO-A-001)

**参考资源**：
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Promise.race MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

**口头回答版**：
> 我会先定义一个 IpcChannels 类型契约，主进程、preload 和渲染进程共享。preload 里用泛型把 invoke 和 on 的类型绑到契约上，并对 channel 做白名单校验。渲染进程再包一层 invokeWithTimeout，用 Promise.race 加 setTimeout 实现超时拒绝。这样调用 window.electronAPI.invoke 时有类型提示，写错频道或参数类型会直接报错。

---

### FB-48-CO-P-005：Electron 如何集成原生模块（Native Addon）？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：48 Electron
**标签**：Electron、构建、平台
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 集成 C/C++ 原生模块的原理、常见问题及解决方式，并比较 N-API 与 NAN 的优劣。

**参考答案**：

1. **核心要点**
   - Electron 使用自己的 Node.js ABI，因此 npm 上预编译的 Node 原生模块通常不能直接在 Electron 中使用。
   - 需要通过 `electron-rebuild` 或 `prebuild-install` 按 Electron 的 Node 版本和 ABI 重新编译。
   - 推荐使用 N-API，ABI 稳定性更好。

2. **详细解释**

   原生模块编译：
   - Node.js 版本与 Electron 内嵌 Node 版本的 ABI 不同。
   - `electron-rebuild -f -w <module>` 会根据当前 Electron 版本的 headers 重新编译。
   - 或使用 `prebuild-install` 下载为 Electron 预编译好的二进制。

   N-API vs NAN：

   | 维度 | N-API | NAN |
   |------|-------|-----|
   | ABI 稳定性 | 稳定，跨 Node/Electron 版本 | 依赖 V8/Node 内部 API，需针对版本重新编译 |
   | 学习成本 | 较低，API 更抽象 | 需要熟悉 V8 API |
   | 维护性 | 更好，官方推荐 | 较复杂 |
   | 适用场景 | 新模块首选 |  legacy 模块 |

   常见问题：
   - 启动时报 `NODE_MODULE_VERSION` 不匹配：说明模块 ABI 与 Electron 不一致。
   - Windows 上缺少 Python/Visual Studio 构建工具。
   - 原生模块在渲染进程中加载时，受 `nodeIntegration` 与 `sandbox` 限制。

3. **最佳实践**
   - 尽量在主进程中加载原生模块，通过 IPC 向渲染进程暴露能力。
   - 对原生模块使用上下文感知（context-aware）初始化，支持 Worker 和重载。
   - CI 中按平台矩阵预编译二进制，避免用户本地编译。

**评分维度**：
- 能说明 Electron 与 Node.js ABI 差异（30%）
- 能说明 N-API 与 NAN 的区别（30%）
- 能说明 electron-rebuild/prebuild 的使用（25%）
- 能给出主进程加载原生模块的安全建议（15%）

**常见错误**：
- 直接用 npm install 的模块在 Electron 中 require，忽略 ABI 不匹配。
- 在渲染进程中直接加载原生模块并开启 `nodeIntegration`。
- 未考虑不同操作系统和 CPU 架构的预编译问题。

**延伸追问**：
- 原生模块崩溃会导致整个应用退出吗？如何隔离？
- 如何在 Electron 中调试 C++ 扩展的崩溃？

**相关题目**：
- [FB-48-CO-B-001 主进程与渲染进程](#FB-48-CO-B-001)
- [FB-48-CP-P-006 崩溃报告与错误监控](#FB-48-CP-P-006)

**参考资源**：
- [Electron 原生模块文档](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules)
- [Node-API 文档](https://nodejs.org/api/n-api.html)

**口头回答版**：
> Electron 自带一个特定版本的 Node.js，ABI 和普通 Node 不一样，所以原生模块一般要重新编译。用 electron-rebuild 或下载预编译二进制。推荐新模块用 N-API，ABI 稳定，不用每个 Electron 版本都重编。原生模块最好在主进程加载，通过 IPC 暴露给渲染，避免在渲染进程开 nodeIntegration。常见错误是看到 NODE_MODULE_VERSION 不匹配，就是 ABI 问题。

---

### FB-48-CP-P-006：如何设计 Electron 的崩溃报告与错误监控方案？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：48 Electron
**标签**：Electron、错误监控、监控、日志
**出现频率**：中频
**预计回答时长**：8-12 分钟

**题目描述**：
请设计一套 Electron 应用的崩溃报告与错误监控方案，覆盖主进程崩溃、渲染进程崩溃、JS 异常和用户行为日志。

**参考答案**：

1. **核心要点**
   - 崩溃报告使用 `crashReporter` 模块或 Sentry 等第三方服务。
   - JS 异常通过 `process.on('uncaughtException')` 和 `window.onerror` 捕获。
   - 需要将 symbol 文件上传，才能在服务端还原堆栈。

2. **详细解释**

   crashReporter：
   ```js
   const { crashReporter } = require('electron');
   crashReporter.start({
     productName: 'MyApp',
     companyName: 'MyCompany',
     submitUrl: 'https://submit.backtrace.io/...',
     uploadToServer: true,
     compress: true,
   });
   ```
   - 主进程和渲染进程都可以调用 `crashReporter.start`。
   - 崩溃时会生成 minidump 文件并上传到服务器。

   JS 异常捕获：
   - 主进程：`process.on('uncaughtException', handler)` 和 `unhandledRejection`。
   - 渲染进程：`window.onerror`、`window.onunhandledrejection`、Vue/React 错误边界。

   Sentry 集成：
   - 使用 `@sentry/electron` 同时捕获主进程与渲染进程异常。
   - 配置 `dsn`、`release`、`environment` 和 `beforeSend` 做隐私脱敏。

   用户行为日志：
   - 在 preload 中封装日志 API，记录关键操作和页面跳转。
   - 日志本地落盘并定期上传，避免网络问题丢失。

3. **最佳实践**
   - 对敏感信息（文件路径、用户 Token）做脱敏处理。
   - 崩溃报告服务使用 HTTPS，并做速率限制。
   - 保留 symbol 文件，便于符号化崩溃堆栈。

**评分维度**：
- 能覆盖主进程/渲染进程崩溃与 JS 异常（35%）
- 能说明 crashReporter 或 Sentry 的使用（30%）
- 能说明符号化与隐私脱敏（20%）
- 能给出日志与行为追踪方案（15%）

**常见错误**：
- 只监控渲染进程，忽略主进程崩溃。
- 崩溃堆栈未符号化，无法定位问题。
- 未做隐私脱敏，上传了用户敏感信息。

**延伸追问**：
- 如何防止崩溃报告服务本身不可用导致应用启动变慢？
- 如果崩溃发生在启动早期，如何保证能收集到日志？

**相关题目**：
- [FB-48-PE-P-003 内存管理与泄漏排查](#FB-48-PE-P-003)
- [FB-48-SD-R-001 大型应用整体架构](#FB-48-SD-R-001)

**参考资源**：
- [Electron crashReporter 文档](https://www.electronjs.org/docs/latest/api/crash-reporter)
- [Sentry Electron SDK](https://docs.sentry.io/platforms/electron/)

**口头回答版**：
> 崩溃监控我分几块：主进程和渲染进程都用 crashReporter 或 Sentry 的 @sentry/electron 捕获崩溃；JS 异常主进程用 uncaughtException，渲染用 window.onerror。崩溃上传要配 HTTPS 和限速，上传 symbol 文件才能还原堆栈。还要做隐私脱敏，别把用户路径、Token 传上去。平时操作日志本地落盘，定期上传。

---

### FB-48-SC-P-007：Electron 跨平台兼容性如何处理？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：48 Electron
**标签**：Electron、平台、用户体验
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在开发需要同时支持 Windows、macOS 和 Linux 的 Electron 应用时，你会如何处理平台差异、路径、协议、窗口行为和系统 API？

**参考答案**：

1. **核心要点**
   - 通过 `process.platform` 区分平台，并在业务层做平台适配层。
   - 路径统一使用 Node.js 的 `path` 模块；外部链接使用 `shell.openExternal`。
   - 不同平台的窗口行为、通知、托盘、菜单需要分别处理。

2. **详细解释**

   平台判断：
   ```js
   const isMac = process.platform === 'darwin';
   const isWin = process.platform === 'win32';
   const isLinux = process.platform === 'linux';
   ```

   路径处理：
   - 使用 `path.join` / `path.resolve`，避免硬编码斜杠。
   - 用户数据目录使用 `app.getPath('userData')`。

   协议与外部链接：
   - 自定义协议注册使用 `app.setAsDefaultProtocolClient`。
   - 外部链接统一通过 `shell.openExternal(url)` 打开系统浏览器。

   窗口行为：
   - macOS：关闭最后一个窗口通常不退出应用，点击 Dock 重新激活。
   - Windows/Linux：最后一个窗口关闭即退出。
   - 自定义标题栏时，注意三个平台的最小化/最大化/关闭按钮位置不同。

   通知与托盘：
   - Windows 通知需要应用 ID 和有效签名。
   - macOS 通知需要 bundle identifier；托盘图标尺寸建议 16x16 / 22x22。
   - Linux 通知依赖桌面环境，部分发行版可能不支持某些特性。

3. **最佳实践**
   - 将平台差异封装到 `platform.ts` 或 `platform-*.ts` 模块中，业务代码不直接判断 `process.platform`。
   - 使用 CI 矩阵构建三个平台安装包，避免在单一平台上交叉打包。
   - 对关键平台相关功能做功能检测（feature detection）而非仅平台判断。

**评分维度**：
- 能使用 platform/path/shell 等模块处理差异（30%）
- 能说明窗口、通知、托盘的平台行为（30%）
- 能设计平台适配层（25%）
- 能提及 CI 构建和功能检测（15%）

**常见错误**：
- 硬编码 Windows 路径分隔符 `\`。
- 在 macOS 上关闭最后一个窗口后误调用 `app.quit()`。
- 未在不同平台测试自定义协议和通知行为。

**延伸追问**：
- 如何处理 Windows 上 UAC 提权与 macOS 上辅助功能权限？
- Linux 下 AppImage、deb、rpm、snap 各有什么兼容性取舍？

**相关题目**：
- [FB-48-CO-B-008 Menu/Tray/Notification](#FB-48-CO-B-008)
- [FB-48-SD-R-001 大型应用整体架构](#FB-48-SD-R-001)

**参考资源**：
- [Electron process.platform](https://www.electronjs.org/docs/latest/api/process#processplatform-readonly)
- [Electron shell 文档](https://www.electronjs.org/docs/latest/api/shell)

**口头回答版**：
> 跨平台我会封装一个 platform 适配层，用 process.platform 判断。路径统一用 path.join 和 app.getPath；外部链接用 shell.openExternal。窗口行为 macOS 关闭最后一个窗口不退出，Windows/Linux 退出。通知、托盘图标尺寸和权限各平台也不一样，要分别测。CI 里用矩阵构建三个平台安装包，不要在一台机器上交叉打包。

---
## 架构题（32 道）{#architect}

### FB-48-SD-R-001：如何设计一个大型 Electron 桌面应用的整体架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：48 Electron
**标签**：Electron、模块化、组件化、生命周期
**出现频率**：高频
**预计回答时长**：15-20 分钟

**题目描述**：
假设你要从零设计一个面向企业用户的大型 Electron 桌面应用，包含多个业务模块、多窗口、离线能力、自动更新和数据分析。请给出整体架构设计，包括目录结构、进程职责、通信机制、状态管理和更新策略。

**参考答案**：

1. **核心要点**
   - 采用 Monorepo 组织主进程、渲染进程、共享契约和原生扩展。
   - 主进程作为“控制中心”，负责窗口、系统 API、数据持久化和更新。
   - 渲染进程只负责 UI，通过受限 IPC 契约与主进程交互。

2. **详细解释**

   目录结构示例：

   ```text
   my-electron-app/
   ├── apps/
   │   ├── main/          # 主进程（Node.js/Electron）
   │   └── renderer/      # 渲染进程（React/Vue）
   ├── packages/
   │   ├── shared-ipc/    # IPC 类型契约与常量
   │   ├── shared-ui/     # 共享 UI 组件
   │   └── native-bridge/ # 原生模块封装
   ├── scripts/
   └── electron-builder.yml
   ```

   进程职责：
   - 主进程：应用生命周期、窗口管理、系统菜单/托盘、数据库/文件访问、自动更新、崩溃报告、数据分析上传。
   - 渲染进程：页面路由、组件状态、用户交互、调用 preload 暴露的 API。
   - preload 脚本：IPC 白名单、平台能力封装、安全边界。

   通信机制：
   - 所有 IPC 频道在 `shared-ipc` 中定义类型契约。
   - 主进程提供 Service 层，渲染进程通过 `invoke/handle` 调用。
   - 状态变更使用发布订阅：主进程广播 `state-changed`，渲染进程订阅更新。

   状态管理：
   - 全局状态（用户、配置、权限）由主进程持久化并同步到各窗口。
   - 局部 UI 状态由各渲染进程自行管理（Redux/Zustand/Pinia）。

   更新策略：
   - 使用 electron-updater + 私有更新服务器。
   - 支持 Stable/Beta 通道和灰度发布。

3. **最佳实践**
   - 主进程代码按功能模块化（services/window-manager/ipc-handlers/updater）。
   - 渲染进程代码分割，按业务路由懒加载。
   - 关键操作记录审计日志，满足企业合规要求。

**评分维度**：
- 能设计合理的 Monorepo 与目录结构（25%）
- 能清晰划分主/渲染进程职责（25%）
- 能设计 IPC 契约与状态同步机制（25%）
- 能考虑更新、安全、可观测性等企业级诉求（25%）

**常见错误**：
- 把所有业务逻辑放在渲染进程，主进程只负责启动。
- 没有共享 IPC 契约，导致主/渲染接口频繁不同步。
- 忽略离线能力与企业合规审计需求。

**延伸追问**：
- 如果某个业务模块需要独立迭代，如何做到不重启应用即可更新？
- 如何衡量这个架构的可扩展性和可维护性？

**相关题目**：
- [FB-48-SC-A-004 多窗口管理](#FB-48-SC-A-004)
- [FB-48-SD-R-003 自动更新与灰度分发策略](#FB-48-SD-R-003)

**参考资源**：
- [Electron 企业应用架构参考](https://www.electronjs.org/blog)
- [Monorepo 工具选型](https://monorepo.tools/)

**口头回答版**：
> 大型 Electron 应用我会用 Monorepo，主进程、渲染进程、共享 IPC 契约分开。主进程是控制中心，管窗口、系统 API、数据、更新；渲染进程只负责 UI。IPC 类型契约放在 shared-ipc，主进程提供 Service，渲染用 invoke/handle 调用。全局状态主进程持久化并广播给各窗口。更新用 electron-updater，支持多通道和灰度。还要考虑审计日志和崩溃监控。

---

### FB-48-SD-R-002：如何设计一个安全的 Electron 应用架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：48 Electron
**标签**：Electron、安全、沙箱、CSP
**出现频率**：高频
**预计回答时长**：15-20 分钟

**题目描述**：
请从架构层面设计一个安全的 Electron 应用，覆盖进程隔离、权限模型、数据保护、更新安全和供应链安全。

**参考答案**：

1. **核心要点**
   - 采用“纵深防御”策略：每一层都假设上一层可能被攻破。
   - 渲染进程默认不可信，主进程和 preload 是安全边界。
   - 敏感数据、凭证、系统调用必须留在主进程，并通过最小 API 暴露。

2. **详细解释**

   进程隔离与沙箱：
   - 所有窗口启用 `contextIsolation: true`、`nodeIntegration: false`、`sandbox: true`。
   - 需要加载外部内容的窗口使用 `BrowserView` 或 `<webview>` 并严格沙箱化。
   - 禁止 `enableRemoteModule` 和 `allowRunningInsecureContent`。

   权限模型：
   - 定义能力矩阵：哪些渲染进程/页面可以调用哪些 IPC 频道。
   - preload 中按频道白名单校验，主进程 handler 中再次校验来源窗口 ID 和权限。
   - 对文件系统、剪贴板、摄像头等敏感能力做显式授权。

   数据保护：
   - 用户凭证使用系统钥匙链（keytar 或 safeStorage）存储，不落入渲染进程。
   - 本地数据库加密，密钥派生自系统凭证或用户密码。
   - 日志和崩溃报告中对 Token、路径、用户 ID 脱敏。

   更新与供应链：
   - 自动更新包必须签名，更新服务器使用 HTTPS。
   - 使用 lockfile 和依赖扫描工具（Snyk/Dependabot）防止供应链攻击。
   - CI 构建产物做哈希校验和签名审计。

3. **架构示意图**

   ```text
   ┌─────────────────────────────────────┐
   │  Renderer (Untrusted)               │
   │  - Limited API via contextBridge    │
   └──────────────┬──────────────────────┘
                  │ IPC (whitelisted)
   ┌──────────────▼──────────────────────┐
   │  Preload (Trusted Bridge)           │
   │  - Channel whitelist, validation    │
   └──────────────┬──────────────────────┘
                  │
   ┌──────────────▼──────────────────────┐
   │  Main Process (Trusted)             │
   │  - File/DB/Network/System API       │
   │  - Auth, Encryption, Updates        │
   └─────────────────────────────────────┘
   ```

**评分维度**：
- 能设计分层防御架构（30%）
- 能说明权限模型与 IPC 白名单（25%）
- 能说明数据保护与凭证存储（25%）
- 能说明更新安全与供应链安全（20%）

**常见错误**：
- 只关注 CSP，忽略进程隔离和权限模型。
- 把用户 Token 存在 localStorage 或渲染进程内存。
- 认为签名只影响用户体验，不影响安全。

**延伸追问**：
- 如果应用需要加载用户提供的第三方网页，如何设计隔离？
- 如何进行 Electron 安全审计和渗透测试？

**相关题目**：
- [FB-48-SE-A-003 安全最佳实践](#FB-48-SE-A-003)
- [FB-48-SE-P-002 preload 与上下文隔离安全模型](#FB-48-SE-P-002)

**参考资源**：
- [Electron 安全最佳实践](https://www.electronjs.org/docs/latest/tutorial/security)
- [OWASP Desktop Security](https://owasp.org/www-project-desktop-app-security-top-10/)

**口头回答版**：
> 安全架构要纵深防御：渲染进程默认不可信，所有窗口开 contextIsolation、sandbox，关 nodeIntegration。IPC 做频道白名单，主进程 handler 再校验窗口和权限。敏感数据和凭证只留在主进程，用系统钥匙链存。日志和崩溃报告脱敏。更新包签名、HTTPS 分发，依赖做扫描。这样即使渲染被攻破，也拿不到系统和用户核心数据。

---

### FB-48-SD-R-003：如何设计 Electron 的自动更新与灰度分发策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：48 Electron
**标签**：Electron、发布、部署
**出现频率**：中频
**预计回答时长**：15-20 分钟

**题目描述**：
请设计一套 Electron 应用的自动更新与灰度分发方案，要求支持版本通道、增量更新、回滚、签名验证和用户可控升级。

**参考答案**：

1. **核心要点**
   - 使用私有更新服务器或对象存储作为更新源，按通道和百分比控制分发。
   - 更新包必须签名，客户端校验签名和哈希后再安装。
   - 支持强制更新、可选更新和回滚策略。

2. **详细解释**

   版本通道：
   - Stable：全量用户，更新最谨慎。
   - Beta：内测用户，提前验证新功能。
   - Nightly：开发/自动化测试使用。
   - 每个通道对应独立的更新清单（latest.yml / latest-mac.yml）。

   灰度分发：
   - 更新服务器根据用户 ID 哈希或设备 ID 决定灰度比例（如 5%、20%、100%）。
   - 提供 override 接口，允许测试用户或白名单用户提前获取新版本。

   增量更新：
   - Windows 使用 differential update（如 electron-updater 支持 blockmap 差分）。
   - macOS 通常下载完整 dmg/zip；可结合 App 自身增量机制。
   - 大资源文件可单独热更新，不必每次重打安装包。

   签名与回滚：
   - 客户端下载后校验签名和 SHA256，失败则丢弃。
   - 服务端保留最近 N 个版本的更新清单，发现新版严重 Bug 时切换清单指向旧版，实现回滚。

   用户可控：
   - 提供“立即更新”、“稍后提醒”、“跳过此版本”选项。
   - 企业环境可关闭自动更新，改用管理员推送。

3. **架构流程**

   ```text
   应用启动 → 上报版本/通道/设备 ID → 更新服务器
   → 返回是否更新、下载 URL、签名信息
   → 客户端下载 → 校验签名/哈希 → 静默下载或提示用户
   → quitAndInstall 或下次启动生效
   ```

**评分维度**：
- 能设计多通道更新架构（25%）
- 能说明灰度百分比与白名单机制（25%）
- 能说明签名、校验与回滚策略（25%）
- 能考虑用户可控与企业环境（25%）

**常见错误**：
- 所有用户同时推送新版本，导致问题扩散。
- 客户端不校验更新包签名，存在中间人攻击风险。
- 没有回滚能力，出现严重 Bug 只能发新版修复。

**延伸追问**：
- 如何实现 A/B 测试与更新策略联动？
- 如果用户长期离线，如何保证其 eventually 能更新到安全版本？

**相关题目**：
- [FB-48-CO-A-006 自动更新机制](#FB-48-CO-A-006)
- [FB-48-EN-A-007 打包与代码签名](#FB-48-EN-A-007)

**参考资源**：
- [electron-updater 自动更新](https://www.electron.build/auto-update.html)
- [Semantic Versioning](https://semver.org/)

**口头回答版**：
> 我会设 Stable/Beta/Nightly 三个通道，每个通道有独立的 latest.yml。更新服务器根据用户或设备 ID 做灰度，比如先 5%，再 20%，最后全量。更新包必须签名，客户端校验哈希和签名。服务端保留最近几个版本，出问题切回旧版清单即可回滚。用户侧提供立即更新、稍后、跳过选项，企业环境可关自动更新。Windows 可以做差量更新，大资源文件单独热更。

---

### FB-48-CP-R-004：electron-builder 与 electron-forge 如何选型？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：48 Electron
**标签**：Electron、构建、CI/CD
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在启动一个新的 Electron 项目时，你会如何在 `electron-builder`、`electron-forge` 和自定义构建方案之间做选型？请比较它们的优缺点并给出决策依据。

**参考答案**：

1. **核心要点**
   - `electron-builder` 配置驱动、生态成熟、自动更新集成好，适合快速交付。
   - `electron-forge` 是 Electron 官方推荐，插件化、与 Vite/Webpack 集成更灵活。
   - 自定义方案适合有极强打包控制和私有基础设施的团队。

2. **详细解释**

   | 维度 | electron-builder | electron-forge | 自定义构建 |
   |------|--------------------|----------------|------------|
   | 配置方式 | package.json / yml 声明式 | 代码/插件式 | 完全自定义 |
   | 自动更新 | electron-updater 成熟 | 需自行集成 | 完全自行实现 |
   | 打包目标 | dmg、nsis、AppImage 等非常丰富 | 通过 maker 插件扩展 | 取决于实现 |
   | 构建速度 | 较快，缓存成熟 | 依赖插件配置 | 可极致优化 |
   | 与 Monorepo | 配置需调整 | 与 Vite/Webpack 集成更好 | 完全可控 |
   | 社区与文档 | 生态大，问题多可查 | 官方维护，更新快 | 无社区支持 |

   选型建议：
   - 中小型项目、需要快速上线自动更新：选 `electron-builder`。
   - 需要深度定制构建流程、使用 Vite、重视官方路线：选 `electron-forge`。
   - 有自研签名/分发/更新基础设施的大型企业：可考虑自定义或基于 builder/forge 二次封装。

3. **最佳实践**
   - 不要同时混用 builder 和 forge，避免配置冲突。
   - 将构建配置与源码分离，便于 CI 注入环境变量。
   - 无论选哪个，都要把自动更新、签名、公证流程纳入 CI。

**评分维度**：
- 能从配置、更新、扩展性等维度比较两者（40%）
- 能给出明确选型建议及理由（30%）
- 能说明自定义方案的适用场景与风险（20%）
- 能提及 CI 集成实践（10%）

**常见错误**：
- 只根据“用的人多”选型，忽略团队技术栈。
- 选择 electron-forge 后期发现缺少成熟自动更新方案。
- 自定义构建导致维护成本失控。

**延伸追问**：
- 如果使用 Vite 作为渲染进程构建工具，哪个方案更顺手？
- 自定义构建方案中最容易踩的坑是什么？

**相关题目**：
- [FB-48-EN-A-007 打包与代码签名](#FB-48-EN-A-007)
- [FB-48-EN-R-006 CI/CD 签名公证流水线](#FB-48-EN-R-006)

**参考资源**：
- [electron-builder 文档](https://www.electron.build/)
- [electron-forge 文档](https://www.electronforge.io/)

**口头回答版**：
> electron-builder 配置简单、生态成熟，自动更新配套好，适合快速交付；electron-forge 是官方推荐，插件化，和 Vite/Webpack 集成更灵活。中小型项目要自动更新我倾向 builder；项目要长期维护、深度定制就用 forge。自定义构建适合有大基础设施的团队，但维护成本高。不管选哪个，签名、公证、自动更新都要进 CI。

---

### FB-48-SC-R-005：如何设计多窗口/多标签 Electron 应用的状态共享方案？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：48 Electron
**标签**：Electron、通信、模块化
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
在一个类似 IDE 的 Electron 应用中，存在多个窗口或标签页，需要共享项目状态、用户配置和实时协作数据。请设计一套状态共享方案。

**参考答案**：

1. **核心要点**
   - 以主进程为状态中枢，维护全局状态并持久化。
   - 渲染进程不直接共享状态，通过订阅主进程广播获取更新。
   - 对高频变更数据使用增量同步，避免全量广播。

2. **详细解释**

   状态分层：
   - 全局状态：用户配置、登录态、主题、许可证，由主进程持久化到本地文件/数据库。
   - 项目状态：当前打开的项目、文件树、最近打开列表，由主进程管理并广播。
   - 局部状态：每个窗口/标签内的 UI 状态，由各渲染进程自行维护。

   同步机制：
   - 主进程维护状态对象和变更日志（patch log）。
   - 状态变更时，主进程计算 patch，通过 `webContents.send('state-patch', patch)` 广播。
   - 渲染进程应用 patch 到本地 store，保持 UI 一致。
   - 新窗口创建时，主进程先推送一次完整快照，再订阅后续 patch。

   冲突处理：
   - 对于用户操作导致的冲突（如两个窗口同时修改同一文件），采用“最后写入 wins”或版本向量（version vector）。
   - 对于关键配置修改，使用乐观锁：提交时携带版本号，主进程校验后应用。

3. **代码示例**

   ```js
   // 主进程状态管理
   const state = loadState();

   function setState(patch) {
     Object.assign(state, patch);
     persistState(state);
     broadcast('state-patch', patch);
   }

   function broadcast(channel, payload) {
     for (const win of BrowserWindow.getAllWindows()) {
       if (!win.isDestroyed()) {
         win.webContents.send(channel, payload);
       }
     }
   }
   ```

4. **最佳实践**
   - 避免把大量状态放在 localStorage 或 BroadcastChannel，绕过主进程管控。
   - 对状态变更做防抖/节流，防止高频操作导致 IPC 拥塞。
   - 为状态同步设计幂等 patch，便于重放和恢复。

**评分维度**：
- 能以主进程为状态中枢设计架构（30%）
- 能区分全局/项目/局部状态（20%）
- 能设计增量同步与快照恢复机制（30%）
- 能处理冲突和性能问题（20%）

**常见错误**：
- 让渲染进程直接共享 Redux store，导致状态变更不可控。
- 每次状态变更都广播整个状态对象，造成 IPC 和渲染性能问题。
- 没有考虑离线或崩溃后的状态恢复。

**延伸追问**：
- 如果窗口跨机器（协作场景），这套方案如何扩展？
-  Electron 的 Shared Worker 能否替代主进程状态中枢？

**相关题目**：
- [FB-48-SC-A-004 多窗口管理](#FB-48-SC-A-004)
- [FB-48-SD-R-001 大型应用整体架构](#FB-48-SD-R-001)

**参考资源**：
- [Electron IPC Patterns](https://www.electronjs.org/docs/latest/tutorial/ipc)
- [CRDT 协同状态同步](https://crdt.tech/)

**口头回答版**：
> 多窗口状态共享以主进程为中枢。全局状态和项目状态由主进程持有并持久化，状态变更时计算 patch 广播给所有窗口；新窗口先推一次完整快照，再订阅 patch。各窗口本地只维护 UI 状态。冲突处理可以用版本号乐观锁或最后写入 wins。不要把状态放 localStorage 共享，要走主进程。

---

### FB-48-EN-R-006：如何设计 Electron 的 CI/CD、签名、公证与自动发布流水线？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：48 Electron
**标签**：Electron、CI/CD、构建、签名
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一条 Electron 应用的持续交付流水线，覆盖代码提交后的构建、测试、签名、公证、发布和自动更新推送。

**参考答案**：

1. **核心要点**
   - 使用 GitHub Actions / GitLab CI 等矩阵构建 macOS、Windows、Linux 安装包。
   - 签名和公证凭证通过 CI Secrets 注入，不进入仓库。
   - 发布产物到 GitHub Releases 或私有存储，并更新 latest.yml 清单。

2. **详细解释**

   流水线阶段：

   ```text
   代码提交 → Lint/Test → 构建渲染产物 → 矩阵打包（mac/win/linux）
   → 代码签名 → macOS 公证 → 生成 latest.yml → 上传 Release
   → 更新服务器/CDN 生效 → 客户端拉取更新
   ```

   CI 配置要点：
   - macOS runner：导入 p12 证书，配置 `CSC_LINK`、`CSC_KEY_PASSWORD`、`APPLE_ID`、`APPLE_APP_SPECIFIC_PASSWORD`、`APPLE_TEAM_ID`。
   - Windows runner：配置 `CSC_LINK` 或调用云端签名服务（如 Azure Key Vault / DigiCert KeyLocker）。
   - Linux runner：打包 deb/rpm/AppImage，无需签名但可配置 GPG。

   公证：
   - macOS 使用 `notarytool` 在 CI 中自动提交并等待结果。
   - 公证失败时流水线标记为失败，阻止发布。

   发布与更新：
   - electron-builder 的 `publish` 配置自动上传 GitHub Releases。
   - 更新服务器解析 latest.yml 并按通道/灰度返回给客户端。

3. **最佳实践**
   - 每次发布打 tag，版本号与 git tag 一致。
   - 在 CI 中运行 Playwright E2E 测试，确保打包后核心流程可用。
   - 对发布产物计算 SHA256 并公开，便于客户端校验。

**评分维度**：
- 能设计矩阵构建流水线（25%）
- 能说明签名与公证凭证管理（25%）
- 能说明发布产物与更新清单生成（25%）
- 能考虑测试、回滚与安全性（25%）

**常见错误**：
- 在本地手动签名后上传到仓库。
- 未对 macOS 应用做公证，导致用户无法打开。
- CI 中没有 E2E 验证，导致发布版本存在严重问题。

**延伸追问**：
- 如何保护签名私钥不被 CI 日志泄露？
- 如果某平台构建失败，如何做到部分发布？

**相关题目**：
- [FB-48-EN-A-007 打包与代码签名](#FB-48-EN-A-007)
- [FB-48-SD-R-003 自动更新与灰度分发策略](#FB-48-SD-R-003)

**参考资源**：
- [GitHub Actions Electron 示例](https://github.com/electron-react-boilerplate/electron-react-boilerplate/blob/main/.github/workflows/publish.yml)
- [Apple notarytool 文档](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution)

**口头回答版**：
> CI/CD 用 GitHub Actions 矩阵构建 mac、win、linux。先跑 lint 和测试，再打包。mac 和 win 要签名，证书和密码走 Secrets；mac 还要公证，用 notarytool。打包完生成 latest.yml，上传到 Release 或私有存储，更新服务器按通道灰度下发。每次发布要打 tag，CI 里还要跑 Playwright E2E 验证，避免发出去才发现问题。

---

### FB-48-SS-R-007：作为技术负责人，你如何推动 Electron 项目落地与团队治理？

**题型**：软技能题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：48 Electron
**标签**：Electron、自动化、用户体验
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请从团队能力建设、开发规范、安全治理、性能基线和跨职能协作五个方面，说明作为技术负责人如何推动 Electron 项目成功落地。

**参考答案**：

1. **核心要点**
   - Electron 项目不仅是前端项目，还涉及桌面客户端、系统 API、安全和发布运维。
   - 需要通过规范、工具、培训和度量降低团队认知成本。

2. **详细解释**

   团队能力建设：
   - 组织 Electron 安全、IPC、打包签名的专项培训。
   - 建立 Electron 技术雷达，定期评估 builder/forge/测试工具版本。
   - 指定“安全 Owner”和“构建 Owner”，避免责任分散。

   开发规范：
   - 强制 `contextIsolation: true`、`nodeIntegration: false` 的基线配置，代码审查中重点检查。
   - IPC 频道必须在共享契约文件中注册，禁止随意新增频道。
   - 统一目录结构和命名，主进程代码按 service/handler/manager 分层。

   安全治理：
   - 建立安全 checklist：CSP、白名单、签名、更新校验、凭证存储。
   - 引入依赖扫描和 SAST，防止供应链风险。
   - 定期做安全评审和桌面端渗透测试。

   性能基线：
   - 定义启动时间、包体积、内存占用的 SLI/SLO。
   - CI 中自动采集性能指标，超过阈值阻断发布。
   - 建立性能回归测试用例。

   跨职能协作：
   - 与产品经理对齐平台特性（macOS 菜单栏、Windows 托盘、Linux 包格式）。
   - 与运维/安全团队明确签名证书、更新服务器、崩溃上报的归属。
   - 建立用户反馈通道，对崩溃和更新失败做闭环跟踪。

3. **最佳实践**
   - 使用模板仓库和脚手架统一新项目创建流程。
   - 每月举行一次 Electron 技术分享和事故复盘。
   - 将 Electron 安全与性能纳入绩效和代码评审标准。

**评分维度**：
- 能从五个维度系统阐述治理方案（40%）
- 能给出可落地的规范和工具（30%）
- 能体现跨职能协作和度量意识（30%）

**常见错误**：
- 只关注技术实现，忽略团队培训和规范。
- 安全基线只在项目初期强调，后续逐渐松懈。
- 性能指标不量化，无法判断是否退化。

**延伸追问**：
- 如何说服团队接受更严格的安全基线（如禁用 nodeIntegration）？
- 如果业务要求快速上线，安全和性能基线如何取舍？

**相关题目**：
- [FB-48-SD-R-002 安全架构设计](#FB-48-SD-R-002)
- [FB-48-EN-R-006 CI/CD 签名公证流水线](#FB-48-EN-R-006)

**参考资源**：
- [Electron 团队安全清单](https://www.electronjs.org/docs/latest/tutorial/security)
- [SRE 服务水平指标](https://sre.google/sre-book/service-level-objectives/)

**口头回答版**：
> 推动 Electron 项目落地要从人、规范、安全、性能、协作五方面抓。团队上要培训 Electron 特性和安全要点，指定 Owner。规范上强制 contextIsolation true、nodeIntegration false，IPC 频道必须注册。安全上建立 checklist，做依赖扫描和渗透测试。性能上定义启动时间、包体积、内存的 SLO，CI 自动采集。还要和产品、运维、安全团队对齐签名、更新、崩溃上报这些职责。


### FB-48-CO-A-007：Electron 是什么？它的基本架构是怎样的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、架构、Chromium、Node.js、桌面应用
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 的基本概念和架构组成。

**参考答案**：
Electron 是使用 Web 技术（HTML、CSS、JS）构建跨平台桌面应用的框架。

基本架构：

1. **主进程（Main Process）**
   - 运行 Node.js，管理应用生命周期、窗口、系统级 API。
   - 一个 Electron 应用只有一个主进程。
   - 负责创建 BrowserWindow。

2. **渲染进程（Renderer Process）**
   - 每个 BrowserWindow 对应一个独立的渲染进程。
   - 运行 Chromium，负责页面渲染和用户交互。
   - 默认无法直接访问 Node.js API（需配置 contextIsolation、nodeIntegration）。

3. **预加载脚本（Preload Script）**
   - 在渲染进程加载页面之前执行。
   - 运行在具有 Node.js 和 DOM 访问权限的上下文中。
   - 用于安全地桥接主进程和渲染进程。

4. **IPC 通信**
   - 主进程与渲染进程通过 `ipcMain` / `ipcRenderer` 通信。

5. **Chromium + Node.js 集成**
   - 前端用 Chromium 渲染。
   - 后端能力用 Node.js 实现。

示例：
```js
// 主进程
const { app, BrowserWindow } = require('electron');
app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL('https://example.com');
});
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 是用 Web 技术构建桌面应用的框架。有主进程管理应用和窗口，渲染进程负责页面，预加载脚本桥接两者，通过 IPC 通信。底层是 Chromium 加 Node.js。

---

### FB-48-CO-A-008：Electron 主进程和渲染进程有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、主进程、渲染进程、区别
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 主进程和渲染进程的区别及各自职责。

**参考答案**：
主进程 vs 渲染进程：

| 特性 | 主进程 | 渲染进程 |
|------|--------|---------|
| 数量 | 一个应用一个 | 每个窗口一个 |
| 运行环境 | Node.js | Chromium |
| 职责 | 应用生命周期、窗口管理、系统 API | 页面渲染、用户交互 |
| 访问 DOM | 不能 | 能 |
| 访问 Node.js | 能 | 默认不能，需配置 |
| 崩溃影响 | 主进程崩溃应用退出 | 单个窗口崩溃不影响其他 |

职责：
- 主进程：创建窗口、菜单、托盘、系统通知、文件操作、网络请求等。
- 渲染进程：展示 UI、处理用户输入、调用预加载脚本暴露的 API。

通信：
- 两者不能直接共享数据，需通过 IPC（ipcMain/ipcRenderer）异步通信。

安全最佳实践：
- 渲染进程不直接访问 Node.js。
- 通过 preload 暴露有限的、白名单化的 API。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> 主进程一个应用一个，跑 Node.js，管生命周期和系统 API；渲染进程每个窗口一个，跑 Chromium，负责 UI。两者通过 IPC 通信，渲染进程默认不直接访问 Node.js。

---

### FB-48-CO-A-009：Electron 的预加载脚本（Preload Script）有什么作用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、Preload、安全、IPC
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 中预加载脚本的作用和安全意义。

**参考答案**：
预加载脚本作用：

1. **桥接主进程和渲染进程**
   - 在页面加载前执行，可以访问 Node.js 和 DOM。
   - 将主进程能力安全地暴露给渲染进程。

2. **安全隔离**
   - 通过 `contextBridge.exposeInMainWorld` 暴露有限 API。
   - 渲染进程无法直接访问完整的 Node.js 和 Electron API。

3. **API 封装**
   - 把复杂的 IPC 调用封装成简单的方法供前端调用。

安全意义：
- 默认 `contextIsolation: true` 时，预加载脚本和渲染进程上下文隔离。
- 防止渲染进程中的恶意代码直接访问系统能力。
- 是 Electron 安全模型的核心。

示例：
```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  onUpdate: (callback) => ipcRenderer.on('update', callback)
});
```

渲染进程使用：
```js
const path = await window.electronAPI.openFile();
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> 预加载脚本在页面加载前执行，桥接主进程和渲染进程，用 contextBridge 暴露有限 API。它让渲染进程在安全隔离环境中运行，是 Electron 安全模型的核心。

---

### FB-48-CO-A-010：Electron 中主进程和渲染进程如何通信？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、IPC、通信、主进程、渲染进程
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 中主进程与渲染进程之间通信的方式。

**参考答案**：
Electron IPC 通信方式：

1. **渲染 → 主（请求-响应）**
   - 渲染：`ipcRenderer.invoke('channel', args)`
   - 主进程：`ipcMain.handle('channel', (event, args) => result)`
   - 推荐方式，支持 Promise。

2. **渲染 → 主（单向）**
   - 渲染：`ipcRenderer.send('channel', args)`
   - 主进程：`ipcMain.on('channel', (event, args) => { ... })`

3. **主 → 渲染（单向）**
   - 主进程：`win.webContents.send('channel', args)`
   - 渲染：`ipcRenderer.on('channel', (event, args) => { ... })`

4. **渲染 → 渲染**
   - 通过主进程转发。
   - 渲染 A 发给主进程，主进程再发给渲染 B。

示例：
```js
// 渲染进程
const result = await window.electronAPI.invoke('get-data');

// 主进程
ipcMain.handle('get-data', async () => {
  return await fetchDataFromDB();
});
```

安全注意：
- 不要在主进程中执行渲染进程传入的任意代码。
- 对 IPC 参数做校验。
- 避免暴露过多能力。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron IPC 有渲染 invoke 主进程 handle 的请求响应，send/on 单向通信，主进程通过 webContents.send 发消息给渲染。渲染间通信经主进程转发。要注意参数校验，不执行任意代码。

---

### FB-48-CO-A-011：Electron 的 BrowserWindow 有哪些常用配置？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、BrowserWindow、窗口、配置
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 中创建窗口时常用的 BrowserWindow 配置项。

**参考答案**：
BrowserWindow 常用配置：

```js
const win = new BrowserWindow({
  width: 1200,
  height: 800,
  x: 100,
  y: 100,
  show: false,              // 初始不显示，加载完成后再 show
  frame: false,             // 无边框窗口
  transparent: true,        // 透明窗口
  resizable: true,
  minimizable: true,
  maximizable: true,
  fullscreen: false,
  alwaysOnTop: false,
  webPreferences: {
    nodeIntegration: false,       // 不建议开启
    contextIsolation: true,       // 安全，建议开启
    preload: path.join(__dirname, 'preload.js'),
    sandbox: true,                // 进一步隔离
    allowRunningInsecureContent: false,
    webSecurity: true,            // 启用同源策略
  }
});
```

常用事件：
- `ready-to-show`：页面加载完成可显示。
- `closed`：窗口关闭。
- `minimize`、`maximize`、`resize`：窗口状态变化。

最佳实践：
- 先 `show: false`，等 `ready-to-show` 再显示，避免白屏。
- `contextIsolation: true` 和 `nodeIntegration: false` 保障安全。
- 通过 preload 暴露必要 API。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> BrowserWindow 常用配置有尺寸、位置、show、frame、transparent、resizable、webPreferences 等。建议 show:false 等 ready-to-show 再显示，contextIsolation 开，nodeIntegration 关，用 preload 暴露 API。

---

### FB-48-CO-B-009：Electron 应用如何做自动更新？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：Electron
**标签**：Electron、自动更新、autoUpdater、Squirrel
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用实现自动更新的常见方案。

**参考答案**：
Electron 自动更新方案：

1. **electron-updater**
   - 最常用的自动更新库。
   - 支持 Windows、macOS、Linux。
   - 可与 GitHub Releases、S3、私有服务器配合。

2. **electron.autoUpdater**
   - Electron 内置 API。
   - Windows 需要 Squirrel.Windows，macOS 需要 Squirrel.Mac。

3. **更新流程**
   - 应用启动或定期检查更新。
   - 下载更新包。
   - 提示用户重启安装，或静默安装。

4. **electron-updater 示例**
   ```js
   const { autoUpdater } = require('electron-updater');
   autoUpdater.checkForUpdatesAndNotify();
   ```

5. **服务端配置**
   - 需要部署更新服务器或静态文件服务。
   - 提供 latest.yml / latest-mac.yml 等更新元数据。

6. **签名要求**
   - macOS 和 Windows 更新需要应用签名。
   - 未签名应用可能无法自动更新。

7. **灰度发布**
   - 可通过更新服务器控制发布范围。
   - 支持 staged rollout。

注意事项：
- 更新过程要做好错误处理和用户提示。
- 大版本更新可能需要全量安装包。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 自动更新常用 electron-updater，支持多平台，流程是检查、下载、提示重启。需要更新服务器、签名，可灰度发布。

---

### FB-48-CO-B-010：Electron 如何打包和分发应用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：Electron
**标签**：Electron、打包、electron-builder、分发
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用的打包和分发方式。

**参考答案**：
Electron 打包分发方式：

1. **electron-builder**
   - 最流行的打包工具。
   - 支持打包为 exe、dmg、pkg、deb、rpm、AppImage 等。
   - 可配置自动签名、自动更新。

2. **electron-forge**
   - Electron 官方推荐的构建工具。
   - 集成了打包、发布、开发等功能。

3. **打包配置**
   - 在 package.json 中配置 build 字段。
   - 指定应用图标、名称、版本、输出目录等。

4. **签名与公证**
   - Windows 需要代码签名证书。
   - macOS 需要 Apple Developer ID 签名和公证（notarization）。

5. **分发渠道**
   - 官网下载。
   - GitHub Releases。
   - 应用商店（Mac App Store、Microsoft Store）。
   - 企业内部部署。

6. **增量更新**
   - electron-builder 支持 differential download。
   - 减小更新包体积。

示例配置：
```json
"build": {
  "appId": "com.example.app",
  "productName": "MyApp",
  "directories": { "output": "dist" },
  "mac": { "target": "dmg" },
  "win": { "target": "nsis" }
}
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 打包常用 electron-builder 或 electron-forge，支持多平台格式。要配置签名公证，通过官网、GitHub Releases、应用商店分发。

---

### FB-48-CO-B-011：Electron 应用如何调用系统原生能力？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：Electron
**标签**：Electron、原生能力、系统API、dialog、shell
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 中如何调用文件选择、系统通知、打开浏览器等原生能力。

**参考答案**：
Electron 调用原生能力：

1. **文件对话框**
   ```js
   const { dialog } = require('electron');
   const result = await dialog.showOpenDialog({ properties: ['openFile'] });
   ```

2. **系统通知**
   ```js
   const { Notification } = require('electron');
   new Notification({ title: '提示', body: '消息内容' }).show();
   ```

3. **打开浏览器**
   ```js
   const { shell } = require('electron');
   await shell.openExternal('https://example.com');
   ```

4. **剪贴板**
   ```js
   const { clipboard } = require('electron');
   clipboard.writeText('hello');
   ```

5. **系统托盘**
   ```js
   const { Tray } = require('electron');
   const tray = new Tray('icon.png');
   ```

6. **文件/路径操作**
   - Node.js fs、path 模块。

7. **硬件信息**
   - Node.js os 模块获取系统信息。

安全注意：
- 系统能力在主进程中调用。
- 通过 IPC 暴露给渲染进程时要最小化权限。
- 避免渲染进程直接触发危险操作。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 用 dialog、Notification、shell、clipboard、Tray 等模块调用原生能力，配合 Node.js 的 fs、os。系统能力在主进程调用，通过 IPC 安全暴露给渲染进程。

---

### FB-48-EN-A-009：Electron 应用的安全最佳实践有哪些？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、安全、最佳实践、CSP
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用开发中的安全注意事项。

**参考答案**：
Electron 安全最佳实践：

1. **开启 contextIsolation**
   - 默认应为 true，隔离预加载和渲染上下文。

2. **关闭 nodeIntegration**
   - 渲染进程默认不应访问 Node.js。

3. **使用 preload 和 contextBridge**
   - 只暴露必要的、白名单化的 API。

4. **启用 CSP**
   - 配置 Content-Security-Policy，限制脚本来源。

5. **不信任远程内容**
   - 不要直接加载不可信第三方 URL。
   - 如果必须加载，使用 `<webview>` 并启用 sandbox。

6. **校验 IPC 输入**
   - 对渲染进程传入主进程的参数做校验。
   - 不执行任意代码。

7. **禁用 allowRunningInsecureContent**
   - HTTPS 页面不加载 HTTP 资源。

8. **保持 Electron 版本更新**
   - 及时升级以修复 Chromium 和 Node.js 安全漏洞。

9. **代码签名**
   - 应用发布前做代码签名，防止篡改。

10. **安全审计**
    - 定期扫描依赖漏洞。
    - 审查 preload 暴露的 API。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 安全要开 contextIsolation、关 nodeIntegration、用 preload 暴露有限 API、启用 CSP、不信任远程内容、校验 IPC 输入、禁用不安全内容、保持版本更新、代码签名、安全审计。

---

### FB-48-EN-A-010：Electron 应用如何做崩溃收集和日志记录？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、崩溃、日志、监控、Sentry
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用中崩溃收集和日志记录的方案。

**参考答案**：
Electron 崩溃收集和日志：

1. **崩溃报告**
   - 使用 Electron 内置 `crashReporter`。
   - 收集崩溃堆栈、操作系统信息。
   - 可上传到 Sentry、Backtrace 等服务。

2. **Sentry**
   - 成熟的错误监控服务，支持 Electron。
   - 自动收集主进程和渲染进程错误。
   - 支持 source map 还原堆栈。

3. **日志记录**
   - 使用 electron-log、winston 等日志库。
   - 区分主进程和渲染进程日志。
   - 日志写入本地文件，便于排查。

4. **日志分级**
   - info、warn、error、debug。
   - 生产环境只记录 warn 和 error。

5. **用户反馈**
   - 崩溃时提示用户上报。
   - 收集操作步骤和截图。

6. **性能监控**
   - 监控启动时间、内存占用、CPU 使用。
   - 发现异常及时告警。

7. **隐私保护**
   - 日志中脱敏用户敏感信息。
   - 遵守隐私政策。

示例：
```js
const { crashReporter } = require('electron');
crashReporter.start({
  submitUrl: 'https://submit.backtrace.io/...',
  uploadToServer: true
});
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 崩溃收集用 crashReporter 或 Sentry，日志用 electron-log/winston，分主进程和渲染进程，日志分级，生产只记录 warn/error，注意脱敏和隐私。

---

### FB-48-EN-A-011：Electron 应用启动白屏如何优化？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、白屏、启动优化、性能
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用启动时出现白屏的原因及优化方法。

**参考答案**：
白屏原因：
- 窗口创建后立即显示，但页面尚未加载完成。
- 首屏资源大、JS 执行慢、同步初始化阻塞。

优化方法：

1. **延迟显示窗口**
   - `show: false` 创建窗口。
   - 监听 `ready-to-show` 后再 `win.show()`。

2. **使用启动屏/ splash**
   - 先显示一个轻量 splash 窗口。
   - 主窗口准备好后关闭 splash。

3. **优化首屏加载**
   - 压缩 JS/CSS/HTML。
   - 延迟加载非首屏资源。

4. **避免主进程阻塞**
   - 初始化逻辑异步化。
   - 复杂计算放 worker 或延迟执行。

5. **预加载关键资源**
   - 本地缓存常用资源。
   - 使用 service worker（如使用 PWA 方式）。

6. **骨架屏**
   - 页面内先展示骨架屏或 loading。

7. **禁用 DevTools 自动打开**
   - 生产环境不要自动打开开发者工具。

8. **使用 v8CacheOptions**
   - 配置代码缓存，加速启动。

示例：
```js
const win = new BrowserWindow({ show: false });
win.once('ready-to-show', () => win.show());
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> 白屏是因为窗口显示时页面未加载好。优化方法有 show:false 等 ready-to-show、启动屏 splash、优化首屏、异步初始化、预加载资源、骨架屏、代码缓存。

---

### FB-48-SC-A-005：Electron 中如何实现多窗口管理？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、多窗口、BrowserWindow、管理
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用中如何创建和管理多个窗口。

**参考答案**：
Electron 多窗口管理：

1. **创建窗口**
   - 主进程中通过 `new BrowserWindow()` 创建。
   - 每个窗口对应独立渲染进程。

2. **窗口引用管理**
   - 用 Map 或数组保存窗口引用。
   - 关闭时从集合中移除，防止内存泄漏。

3. **窗口 ID**
   - 为每个窗口分配唯一 ID。
   - 方便后续通过 ID 查找和操作窗口。

4. **单实例应用**
   - 使用 `app.requestSingleInstanceLock()` 防止多开。
   - 第二次启动时聚焦已有窗口。

5. **窗口间通信**
   - 通过主进程转发 IPC 消息。

6. **窗口状态恢复**
   - 保存窗口位置和大小，下次启动恢复。

7. **父子窗口**
   - 设置 `parent` 属性创建模态窗口。
   - `modal: true` 时阻塞父窗口交互。

示例：
```js
const windows = new Map();

function createWindow(id, options) {
  const win = new BrowserWindow(options);
  windows.set(id, win);
  win.on('closed', () => windows.delete(id));
  return win;
}

function getWindow(id) {
  return windows.get(id);
}
```

注意：
- 窗口关闭后引用要清理。
- 避免窗口对象被意外回收导致的问题。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 多窗口在主进程创建，用 Map/数组管理引用，分配唯一 ID，单实例用 requestSingleInstanceLock，窗口间通信经主进程转发，保存状态，可创建父子模态窗口。

---

### FB-48-SC-A-006：Electron 应用如何实现自定义标题栏？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、自定义标题栏、无边框、UI
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 中实现自定义标题栏的方案。

**参考答案**：
自定义标题栏方案：

1. **无边框窗口**
   - 创建窗口时设置 `frame: false`。
   - 隐藏系统默认标题栏。

2. **HTML/CSS 实现标题栏**
   - 在渲染进程中用 div 模拟标题栏。
   - 包含标题、最小化、最大化、关闭按钮。

3. **窗口控制按钮**
   - 通过 IPC 调用主进程窗口控制方法。
   ```js
   // 渲染进程
   window.electronAPI.minimizeWindow();
   
   // 主进程
   ipcMain.on('minimize-window', () => win.minimize());
   ```

4. **拖拽区域**
   - 用 `-webkit-app-region: drag` 设置可拖拽区域。
   - 按钮区域设置 `-webkit-app-region: no-drag` 避免被拖拽。

5. **系统按钮样式**
   - Windows 和 macOS 按钮位置不同。
   - 根据平台显示不同布局。

6. **最大化/还原状态**
   - 监听窗口最大化事件，切换按钮图标。

7. **双击最大化**
   - 在标题栏区域监听双击事件，调用 maximize/unmaximize。

8. **注意**
   - 自定义标题栏会损失部分系统原生行为。
   - 需要处理右键菜单、窗口吸附等。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> 自定义标题栏用 frame:false 无边框，HTML/CSS 模拟，按钮通过 IPC 调主进程控制窗口，拖拽区用 -webkit-app-region:drag，注意平台差异和最大化状态。

---

### FB-48-SC-A-007：Electron 中如何实现托盘图标和菜单？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、托盘、Tray、菜单
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 中实现系统托盘图标和右键菜单的方法。

**参考答案**：
Electron 托盘实现：

1. **创建 Tray**
   ```js
   const { Tray, Menu } = require('electron');
   const tray = new Tray('path/to/icon.png');
   ```

2. **设置提示和菜单**
   ```js
   const contextMenu = Menu.buildFromTemplate([
     { label: '打开', click: () => win.show() },
     { label: '退出', click: () => app.quit() }
   ]);
   tray.setToolTip('My App');
   tray.setContextMenu(contextMenu);
   ```

3. **点击托盘图标显示窗口**
   ```js
   tray.on('click', () => {
     win.isVisible() ? win.hide() : win.show();
   });
   ```

4. **最小化到托盘**
   - 窗口最小化或关闭时隐藏到托盘。
   - 点击托盘图标恢复。

5. **平台差异**
   - macOS 托盘图标建议用模板图。
   - Windows/Linux 支持右键菜单和左键点击。

6. **右键菜单动态更新**
   - 根据应用状态动态生成菜单项。

注意：
- 退出应用前要销毁 tray，避免残留。
- 图标尺寸和格式要适配各平台。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 用 Tray 创建托盘图标，Menu.buildFromTemplate 创建右键菜单，监听 click 显示/隐藏窗口。可实现最小化到托盘，注意平台差异和退出时销毁 tray。

---

### FB-48-SC-A-008：Electron 如何与本地数据库交互？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、数据库、SQLite、本地存储
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用中本地数据存储和数据库交互的方案。

**参考答案**：
Electron 本地数据库方案：

1. **SQLite**
   - 使用 better-sqlite3、sqlite3 等 Node.js 包。
   - 在主进程中操作数据库。
   - 轻量、无需单独服务。

2. **IndexedDB / LocalStorage**
   - 渲染进程中可用浏览器存储。
   - 适合小量结构化数据。
   - 容量受限。

3. **文件存储**
   - 使用 Node.js fs 读写 JSON 文件。
   - 适合配置、缓存等小数据。

4. **LevelDB / RocksDB**
   - 键值对数据库，高性能。
   - 适合大量键值数据。

5. **ORM 封装**
   - 使用 TypeORM、Sequelize 等 ORM。
   - 但 Electron 中使用需注意兼容性和打包。

最佳实践：
- 数据库操作在主进程完成。
- 通过 IPC 暴露增删改查接口给渲染进程。
- 注意数据安全和备份。
- 数据库文件放在用户数据目录（app.getPath('userData')）。

示例：
```js
const Database = require('better-sqlite3');
const db = new Database(path.join(app.getPath('userData'), 'app.db'));
db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 本地数据库常用 SQLite，在主进程操作，通过 IPC 暴露接口。也可用 IndexedDB、文件存储、LevelDB。数据库文件放 userData 目录。

---

### FB-48-SC-P-008：Electron 应用的性能优化有哪些方向？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：Electron
**标签**：Electron、性能优化、内存、启动、包体积
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 桌面应用的性能优化方向。

**参考答案**：
Electron 性能优化方向：

1. **包体积优化**
   - 移除无用依赖。
   - 按需打包 native 模块。
   - 压缩资源文件。

2. **启动速度**
   - 延迟显示窗口，使用 splash。
   - 异步初始化，避免主进程阻塞。
   - 减少首屏资源。

3. **内存优化**
   - 及时关闭不用的窗口。
   - 避免内存泄漏（监听、定时器清理）。
   - 限制渲染进程数量。

4. **渲染性能**
   - 前端页面按 Web 性能优化手段优化。
   - 减少 DOM 操作，使用虚拟列表等。

5. **IPC 优化**
   - 减少 IPC 通信次数。
   - 批量传输数据，避免大数据频繁传递。

6. **多进程利用**
   - 复杂计算使用 Node.js worker_threads。
   - 避免阻塞主进程。

7. **懒加载**
   - 功能模块按需加载。
   - 窗口按需创建。

8. **更新策略**
   - 增量更新，减少下载体积。

9. **监控**
   - 使用 DevTools、Sentry、自定义监控。
   - 定位性能瓶颈。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 性能优化包括包体积、启动速度、内存、渲染性能、IPC、多进程、懒加载、增量更新、监控。要综合运用 Web 优化和桌面端特有优化。

---

### FB-48-SC-P-009：Electron 应用如何做进程间状态共享？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：Electron
**标签**：Electron、状态共享、IPC、主进程
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 中多窗口或多进程间共享状态的方案。

**参考答案**：
Electron 状态共享方案：

1. **主进程作为单一数据源**
   - 状态保存在主进程。
   - 各渲染进程通过 IPC 读写状态。
   - 状态变更后广播给所有相关窗口。

2. **本地存储共享**
   - 使用 SQLite、文件、IndexedDB 等持久化存储。
   - 各进程读取同一数据源。
   - 需要处理并发写入和同步。

3. **Redux + electron-redux**
   - 在主进程维护 Redux store。
   - 渲染进程通过 IPC 同步状态。

4. **自定义事件总线**
   - 主进程维护事件总线。
   - 各窗口订阅和发布状态变更。

5. **shared workers**
   - 渲染进程间可通过 SharedWorker 共享内存（有限支持）。

最佳实践：
- 优先使用主进程作为状态中心。
- 避免各渲染进程各自维护不一致的状态副本。
- 状态变更要有明确的 owner 和广播机制。
- 注意 IPC 性能，避免频繁同步大数据。

示例：
```js
// 主进程
const state = { user: null };
ipcMain.handle('get-state', () => state);
ipcMain.on('set-state', (event, newState) => {
  state = { ...state, ...newState };
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.send('state-changed', state);
  });
});
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 状态共享常用主进程作为单一数据源，IPC 读写并广播；或用本地存储、Redux、事件总线。要避免各窗口状态不一致，注意 IPC 性能。

---

### FB-48-SC-P-010：Electron 如何集成 WebRTC 或音视频能力？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：Electron
**标签**：Electron、WebRTC、音视频、桌面捕获
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 中实现音视频通话或屏幕录制功能的方案。

**参考答案**：
Electron 音视频能力：

1. **WebRTC**
   - Electron 基于 Chromium，天然支持 WebRTC。
   - 渲染进程中可直接使用 navigator.mediaDevices.getUserMedia。
   - 需要处理麦克风和摄像头权限。

2. **桌面捕获**
   - 使用 `desktopCapturer` 模块获取屏幕/窗口源。
   - 与 WebRTC 结合实现屏幕共享。
   ```js
   const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
   ```

3. **原生音视频库**
   - 通过 Node.js 调用 ffmpeg、GStreamer 等。
   - 适合复杂处理，但集成成本高。

4. **第三方 SDK**
   - 集成声网、腾讯云、Twilio 等音视频 SDK。
   - 有 Electron 版本或 Web SDK。

5. **权限处理**
   - macOS 需要 info.plist 配置摄像头、麦克风权限。
   - Windows 需要处理系统权限弹窗。

6. **性能优化**
   - 视频渲染使用硬件加速。
   - 控制码率和分辨率。
   - 多窗口共享时减少重复编码。

示例：
```js
// 获取摄像头
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
videoElement.srcObject = stream;
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 支持 WebRTC，可用 desktopCapturer 做屏幕共享，也可集成 ffmpeg 或第三方音视频 SDK。要处理权限，macOS 需配置 plist，注意性能优化。

---

### FB-48-SC-P-011：Electron 应用如何做国际化（i18n）？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：Electron
**标签**：Electron、国际化、i18n、多语言
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用实现多语言国际化的方案。

**参考答案**：
Electron 国际化方案：

1. **渲染进程 i18n**
   - 使用 i18next、react-intl、vue-i18n 等前端国际化库。
   - 根据用户选择或系统语言切换。

2. **主进程 i18n**
   - 菜单、托盘提示、系统对话框文案需要多语言。
   - 使用 i18next-node 或自定义多语言模块。

3. **语言检测**
   - 使用 `app.getLocale()` 获取系统语言。
   - 用户可手动覆盖。

4. **资源管理**
   - 语言文件放在本地 resources 目录。
   - 按语言分文件管理。

5. **动态切换**
   - 切换语言后重新加载菜单和窗口内容。
   - 部分文案需要重启生效。

6. **日期数字格式化**
   - 使用 Intl API 或 moment/dayjs 处理。

7. **RTL 支持**
   - 阿拉伯语、希伯来语等从右到左布局。
   - 需要 CSS 和布局适配。

最佳实践：
- 主进程和渲染进程共享语言配置。
- 所有用户可见文案都走 i18n。
- 提供语言切换入口。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 国际化渲染进程用前端 i18n 库，主进程菜单等用 node i18n 库，通过 app.getLocale 检测系统语言，资源分文件管理，注意动态切换和 RTL 支持。

---

### FB-48-SE-A-004：Electron 应用如何防止 XSS 和 RCE 攻击？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、XSS、RCE、安全
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用中防止 XSS 和远程代码执行攻击的措施。

**参考答案**：
防护措施：

1. **开启 contextIsolation**
   - 隔离预加载脚本和页面上下文。
   - 防止页面脚本访问 Electron API。

2. **关闭 nodeIntegration**
   - 渲染进程不能直接访问 Node.js，降低 RCE 风险。

3. **使用 contextBridge 暴露有限 API**
   - 只暴露必要功能，避免暴露危险 API。

4. **启用 CSP**
   - 限制脚本来源，防止内联脚本执行。

5. **输入输出转义**
   - 渲染用户输入时做转义，防止 XSS。

6. **不加载不可信远程内容**
   - 避免直接加载第三方网页。
   - 使用 webview 并启用 sandbox。

7. **禁用 eval 和 new Function**
   - 配置 CSP 禁止不安全的脚本执行。

8. **及时更新 Electron**
   - 修复 Chromium 和 Node.js 漏洞。

9. **代码签名和完整性校验**
   - 防止应用被篡改。

10. **安全审计**
    - 定期审查 preload 暴露的 API。
    - 扫描依赖漏洞。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 防 XSS 和 RCE 要开 contextIsolation、关 nodeIntegration、用 contextBridge 暴露有限 API、启用 CSP、输入转义、不加载不可信内容、禁用 eval、及时更新、代码签名、安全审计。

---

### FB-48-SE-A-005：Electron 应用的代码签名流程是怎样的？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、代码签名、证书、发布
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用在不同平台做代码签名的流程。

**参考答案**：
代码签名流程：

**Windows**：
1. 购买代码签名证书（OV/EV）。
2. 安装证书到本地存储。
3. 在 electron-builder 配置 `certificateFile` 和 `certificatePassword`。
4. 打包时自动签名 exe 和 installer。
5. EV 证书可消除 SmartScreen 警告。

**macOS**：
1. 加入 Apple Developer Program。
2. 生成 Developer ID Application 证书。
3. 配置 electron-builder 的 `identity` 和 `hardenedRuntime`。
4. 打包时签名 .app。
5. 提交 Apple 公证（notarization）。
6. 用户下载后可正常运行，不被 Gatekeeper 拦截。

**Linux**：
- 通常不需要代码签名。
- 部分发行版可用 GPG 签名包。

electron-builder 配置示例：
```json
"build": {
  "win": {
    "certificateFile": "cert.p12",
    "certificatePassword": "xxx"
  },
  "mac": {
    "identity": "Developer ID Application: XXX",
    "hardenedRuntime": true,
    "gatekeeperAssess": false,
    "entitlements": "entitlements.mac.plist"
  }
}
```

注意：
- 证书和密码要安全保管。
- CI/CD 中可通过环境变量传入。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Windows 用代码签名证书配置 electron-builder 自动签名；macOS 用 Apple Developer ID 证书签名并公证；Linux 一般不需要。证书要安全保管，CI 中用环境变量。

---

### FB-48-SE-A-006：Electron 应用如何保护本地敏感数据？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Electron
**标签**：Electron、敏感数据、加密、安全存储
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Electron 应用中如何安全存储用户敏感数据。

**参考答案**：
保护本地敏感数据：

1. **使用系统密钥链**
   - Windows：DPAPI / Credential Locker。
   - macOS：Keychain。
   - Linux：Secret Service API / libsecret。
   - 使用 keytar、safe-storage 等库。

2. **加密存储**
   - 敏感数据加密后再写入文件或 storage。
   - 密钥可派生自机器特征或用户密码。

3. **不长期保存敏感信息**
   - Token 设置过期时间。
   - 敏感操作重新验证。

4. **限制 preload API**
   - 渲染进程无法直接读写敏感文件。
   - 通过 IPC 暴露受控接口。

5. **日志脱敏**
   - 日志中不记录密码、token、身份证号等。

6. **存储位置**
   - 使用 `app.getPath('userData')`，不要放安装目录。

7. **安全删除**
   - 注销或卸载时清理敏感数据。

示例（safeStorage）：
```js
const { safeStorage } = require('electron');
const encrypted = safeStorage.encryptString('secret');
const decrypted = safeStorage.decryptString(encrypted);
```

注意：
- 安全存储依赖操作系统，换设备后可能无法解密。
- 关键密钥不要硬编码在代码中。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 保护敏感数据用系统密钥链、加密存储、不长期保存、限制 preload API、日志脱敏、数据放 userData、安全删除。可用 safeStorage 模块。

---

### FB-48-SS-R-008：Electron 与 Tauri 相比各有什么优缺点？

**题型**：软技能题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：Electron
**标签**：Electron、Tauri、对比、桌面开发
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Electron 和 Tauri 两种桌面应用开发框架。

**参考答案**：
Electron vs Tauri：

| 维度 | Electron | Tauri |
|------|---------|-------|
| 技术栈 | Chromium + Node.js | 系统 WebView + Rust |
| 包体积 | 较大（约 100MB+） | 较小（通常 3-10MB） |
| 内存占用 | 较高 | 较低 |
| 性能 | 好 | 很好 |
| 开发语言 | JS/TS | JS/TS + Rust |
| 原生能力 | 丰富，Node.js 生态 | Rust 实现，需自己写或找插件 |
| 安全性 | 成熟，需注意配置 | 默认更安全，Rust 内存安全 |
| 社区生态 | 非常成熟 | 快速增长 |
| 学习曲线 | 低 | 需要 Rust 基础 |

选择建议：
- 追求小包体积、低内存、高性能：Tauri。
- 需要丰富原生能力、Node.js 生态、快速开发：Electron。
- 团队有 Rust 经验可尝试 Tauri。
- 复杂业务、成熟产品 Electron 更稳妥。

趋势：
- Tauri 是新兴框架，受到轻量应用青睐。
- Electron 仍在大量生产环境使用，生态成熟。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 用 Chromium+Node.js，包大、生态成熟；Tauri 用系统 WebView+Rust，包小、内存低、更安全，但需要 Rust。复杂项目选 Electron，追求轻量选 Tauri。

---

### FB-48-SS-R-009：Electron 应用的未来演进方向有哪些？

**题型**：软技能题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：Electron
**标签**：Electron、未来、演进、趋势
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请谈谈 Electron 框架的未来发展趋势和可能的演进方向。

**参考答案**：
Electron 未来演进方向：

1. **性能优化**
   - 持续跟进 Chromium 性能改进。
   - 减小包体积和内存占用。

2. **安全性增强**
   - 默认安全配置更严格。
   - 加强与操作系统安全机制的集成。

3. **更好的跨平台支持**
   - Windows、macOS、Linux 体验更一致。
   - 对新系统特性更快适配。

4. **与 Web 标准对齐**
   - 支持更多现代 Web API。
   - PWA 能力融合。

5. **替代方案竞争**
   - Tauri、Flutter Desktop、WebView2 等竞争。
   - Electron 需持续保持生态优势。

6. **企业级能力**
   - 更强的部署、更新、管理、监控能力。
   - 适合大规模企业应用。

7. **开发体验**
   - 更好的调试工具、构建工具、模板。

8. **AI 集成**
   - 桌面端 AI 能力调用和本地模型集成。

建议：
- Electron 仍将是桌面 Web 技术栈的主流选择之一。
- 同时关注 Tauri 等轻量方案，根据场景选择。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron 未来会聚焦性能优化、安全增强、跨平台一致性、Web 标准对齐，同时面临 Tauri 等竞争。企业级能力、开发体验、AI 集成也是方向。

---

### FB-48-SS-R-010：设计一个 Electron 跨平台 IDE 的核心架构。

**题型**：软技能题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：Electron
**标签**：Electron、IDE、架构、桌面应用
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个基于 Electron 的跨平台 IDE 的核心架构。

**参考答案**：
Electron IDE 核心架构：

1. **主进程**
   - 应用生命周期、窗口管理、菜单、托盘。
   - 文件系统访问、进程管理、插件宿主。
   - LSP/Language Server 通信。

2. **渲染进程**
   - 编辑器 UI：侧边栏、标签页、状态栏、终端面板。
   - 使用 Monaco Editor / CodeMirror 实现代码编辑。
   - 主题、布局、插件 UI。

3. **预加载脚本**
   - 暴露文件读写、执行命令、IPC 等有限 API。
   - 隔离渲染进程与 Node.js。

4. **工作区管理**
   - 项目打开、文件树、搜索、Git 集成。
   - 状态持久化到本地数据库或 JSON。

5. **扩展系统**
   - 插件 API 设计，支持 UI 扩展和后台任务。
   - 插件运行在独立 worker 或子进程，避免阻塞主进程。

6. **终端集成**
   - 使用 node-pty 在渲染进程中嵌入终端。
   - 注意安全和跨平台兼容。

7. **构建与调试**
   - 调用外部构建工具和调试器。
   - 通过 IPC 传递任务输出和调试信息。

8. **性能优化**
   - 大文件分片加载，虚拟滚动文件树。
   - 多进程并行处理任务。
   - 内存监控和泄漏防护。

9. **安全**
   - 插件沙箱、代码签名、CSP、权限最小化。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Electron IDE 架构分主进程管生命周期和系统能力，渲染进程做编辑器 UI，preload 桥接，工作区管项目文件，插件系统独立运行，终端用 node-pty，注意性能和安全。

---
