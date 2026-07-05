# 小程序面试题

> 本题库共收录 **30** 道面试题（基础 8 / 进阶 8 / 深入 7 / 架构 7）。
> 本文件收录小程序相关面试题，目标题量 100 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、框架原理题、性能优化题、安全题、工程化题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-45-CO-B-001：什么是小程序？它与 H5 / WebView 应用有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：45 小程序
**标签**：小程序、容器、架构、组件化
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释什么是小程序，并对比小程序与传统 H5 / WebView 应用在技术架构、运行环境、能力边界和分发方式上的主要区别。

**参考答案**：

小程序是一种不需要下载安装即可使用的轻量级应用，运行在超级 App（微信、支付宝、抖音等）提供的宿主环境中。它通过离线包 + 双线程模型运行，既能获得接近原生的体验，又具备即用即走、社交分发、平台能力调用等优势。

与 H5 / WebView 应用的核心区别：

| 维度 | 小程序 | H5 / WebView 应用 |
|------|--------|------------------|
| 运行环境 | 宿主 App 提供的独立渲染线程与逻辑线程 | 浏览器内核或普通 WebView |
| 包管理 | 离线包，需上传、审核、下发 | 在线加载，无需审核 |
| 能力边界 | 受平台 SDK 限制，可调用原生能力 | 受浏览器能力限制，部分能力需桥接 |
| 渲染方式 | 自定义组件 + 原生视图混合渲染 | HTML + CSS + JS |
| 开发框架 | WXML / WXSS / JS，或 Taro / UniApp 转译 | Vue / React / 原生 JS |
| 分发方式 | 扫码、搜索、分享、附近的小程序 | 链接、二维码、浏览器 |
| 更新机制 | 平台控制，支持热更新和灰度 | 服务端控制，灵活但缺少平台约束 |

最佳实践：
- 需要强平台能力、社交裂变、离线可用时优先考虑小程序。
- 需要复杂动画、高频自定义交互时，可评估原生 App 或 Web 方案。

**评分维度**：
- 能说明小程序是运行在宿主 App 中的轻应用（30%）
- 能从运行环境、包管理、能力边界等维度对比 H5（40%）
- 能说出分发方式和更新机制的差异（30%）

**常见错误**：
- 认为小程序就是 H5 套壳，忽略双线程和离线包差异。
- 混淆小程序与快应用、PWA 的区别。
- 认为小程序可以任意调用所有系统能力。

**延伸追问**：
- 小程序和快应用有什么本质区别？
- 为什么小程序不直接用浏览器内核渲染？

**相关题目**：
- [FB-45-CO-A-001 小程序的双线程模型](#FB-45-CO-A-001)
- [FB-45-CO-A-003 各平台小程序架构对比](#FB-45-CO-A-003)

**参考资源**：
- [微信小程序官方文档 - 小程序简介](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [支付宝小程序官方文档](https://opendocs.alipay.com/mini/introduce)

**口头回答版**：
> 小程序是运行在超级 App 里的轻应用，不用下载安装，扫码或搜索就能打开。它和 H5 最大的区别是：小程序有独立的渲染线程和 JS 逻辑线程，用离线包运行；H5 是在浏览器或 WebView 里在线加载页面。小程序能更方便地调用微信、支付宝的平台能力，比如支付、扫码、分享，但能力受平台限制，更新也要走平台审核。

---

### FB-45-CO-B-002：微信小程序的项目结构和主要文件类型有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：45 小程序
**标签**：小程序、工程化、组件化
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明微信小程序的标准项目结构，并解释 `.json`、`.wxml`、`.wxss`、`.js` 四类文件的作用。

**参考答案**：

微信小程序的标准目录结构如下：

```text
project/
├── app.js              # 小程序逻辑入口
├── app.json            # 全局配置
├── app.wxss            # 全局样式
├── project.config.json # 项目配置
├── sitemap.json        # 搜索索引配置
├── pages/
│   ├── index/
│   │   ├── index.wxml  # 页面结构
│   │   ├── index.wxss  # 页面样式
│   │   ├── index.js    # 页面逻辑
│   │   └── index.json  # 页面配置
│   └── logs/
│       └── ...
├── components/
│   └── my-component/
│       ├── my-component.wxml
│       ├── my-component.wxss
│       ├── my-component.js
│       └── my-component.json
└── utils/
    └── util.js
```

四类核心文件：

| 文件类型 | 作用 | 类比 |
|----------|------|------|
| `.wxml` | 描述页面结构，使用小程序标签和 Mustache 语法 | HTML / 模板 |
| `.wxss` | 描述页面样式，支持 rpx、部分 CSS 选择器 | CSS |
| `.js` | 页面或组件逻辑，包括 data、生命周期、事件处理 | JavaScript |
| `.json` | 页面或全局配置，如导航栏、窗口表现、使用组件 | 配置文件 |

注意：
- `app.json` 中 `pages` 数组的第一项为首页。
- 页面 `.json` 配置会覆盖 `app.json` 中的同名配置。
- `.wxss` 不支持所有 CSS 特性，如部分伪类、属性选择器需谨慎使用。

**评分维度**：
- 能说出四类文件的作用（50%）
- 能描述标准项目结构（30%）
- 能说明 app.json 与页面 json 的覆盖关系（20%）

**常见错误**：
- 把 `.wxss` 当成完全兼容 CSS 使用。
- 忘记在页面 json 中注册自定义组件。
- 在 app.json 中配错 pages 顺序导致首页不对。

**延伸追问**：
- `sitemap.json` 的作用是什么？
- 全局样式和页面样式的优先级如何？

**相关题目**：
- [FB-45-CO-B-006 小程序自定义组件](#FB-45-CO-B-006)
- [FB-45-PE-A-005 小程序性能优化](#FB-45-PE-A-005)

**参考资源**：
- [微信小程序官方文档 - 代码构成](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/code.html)

**口头回答版**：
> 微信小程序主要由四类文件组成：wxml 是结构，相当于 HTML；wxss 是样式，相当于 CSS，但支持 rpx；js 是逻辑；json 是配置。全局有 app.js、app.json、app.wxss，页面一般在 pages 目录下，每个页面也各有这四个文件。app.json 里的 pages 第一项就是首页，页面 json 可以覆盖全局配置。

---

### FB-45-CO-B-003：小程序的 MVVM 数据绑定原理是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：45 小程序
**标签**：小程序、数据绑定、响应式
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释小程序中数据绑定的基本用法，并说明其背后的 MVVM 实现原理。

**参考答案**：

小程序采用类 MVVM 架构：视图层（View）和逻辑层（ViewModel）分离，开发者只需在逻辑层修改 `data`，框架会自动把变化同步到视图层。

基本用法：

```xml
<!-- index.wxml -->
<view class="container">
  <text>&#123;&#123;message&#125;&#125;</text>
  <button bindtap="onTap">修改文案</button>
</view>
```

```javascript
// index.js
Page({
  data: {
    message: 'Hello Mini Program',
  },
  onTap() {
    this.setData({
      message: 'Hello World',
    });
  },
});
```

实现原理：

1. **数据劫持/观察**：小程序逻辑层维护一份 `data` 对象，框架在初始化时对其做响应式处理。
2. **setData 驱动更新**：开发者调用 `this.setData(newData)` 时，框架会计算差异（diff）。
3. **跨线程通信**：逻辑层通过 JSBridge 把 diff 数据序列化后发送到渲染线程。
4. **视图更新**：渲染线程根据 diff 数据更新虚拟 DOM 树，最终映射到原生视图。

注意：
- 不要直接修改 `this.data`，应使用 `this.setData`。
- `setData` 有单次数据量和频率限制，频繁大量调用会影响性能。
- 建议只 setData 必要字段，避免一次性更新整个对象。

**评分维度**：
- 能写出基本数据绑定示例（30%）
- 能解释 View / ViewModel 分离和 setData 作用（40%）
- 能说明数据通过 JSBridge 跨线程同步到视图（30%）

**常见错误**：
- 直接 `this.data.xxx = yyy` 后期待视图更新。
- 在 setData 中一次性传入过大的数据对象。
- 在循环中高频调用 setData。

**延伸追问**：
- setData 为什么不能直接修改深层对象？
- 小程序数据绑定和 Vue 的响应式系统有什么异同？

**相关题目**：
- [FB-45-CO-A-001 小程序的双线程模型](#FB-45-CO-A-001)
- [FB-45-FS-P-001 小程序 Exparser 和虚拟 DOM](#FB-45-FS-P-001)

**参考资源**：
- [微信小程序官方文档 - WXML](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/)
- [微信小程序官方文档 - 响应的数据绑定](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/)

**口头回答版**：
> 小程序的数据绑定是 MVVM 模式，我们在 JS 里写 data，在 wxml 里用双花括号 {{}} 绑定。要更新视图必须调用 this.setData，框架会算出差异，通过 JSBridge 把变化发给渲染线程，再更新到原生视图。不能直接改 this.data，那样视图不会更新。还要注意 setData 不要传太多数据，性能会有影响。

---

### FB-45-CO-B-004：小程序页面生命周期有哪些？执行顺序是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：45 小程序
**标签**：小程序、生命周期、路由
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列出微信小程序页面的主要生命周期函数，并说明它们的执行顺序和常见使用场景。

**参考答案**：

微信小程序页面生命周期：

| 生命周期 | 触发时机 | 常见用途 |
|----------|----------|----------|
| `onLoad` | 页面加载时，只触发一次 | 获取页面参数、初始化数据 |
| `onShow` | 页面显示/切入前台时 | 恢复状态、埋点上报 |
| `onReady` | 页面初次渲染完成 | 获取节点信息、操作 DOM |
| `onHide` | 页面隐藏/切入后台时 | 暂停计时器、保存草稿 |
| `onUnload` | 页面卸载时 | 清理资源、取消订阅 |

执行顺序：

```text
onLoad -> onShow -> onReady -> (onHide -> onShow 循环) -> onUnload
```

页面 A 跳转到页面 B 时的典型流程：

```text
页面 A: onHide
页面 B: onLoad -> onShow -> onReady
返回页面 A:
  页面 B: onUnload
  页面 A: onShow
```

示例：

```javascript
Page({
  onLoad(options) {
    console.log('页面参数:', options.id);
  },
  onShow() {
    this.reportPageView();
  },
  onReady() {
    const query = wx.createSelectorQuery();
    query.select('#box').boundingClientRect();
    query.exec(res => console.log(res));
  },
  onHide() {
    clearInterval(this.timer);
  },
  onUnload() {
    this.unsubscribe && this.unsubscribe();
  },
});
```

注意：
- `onLoad` 中可获取打开页面时传入的参数。
- `onShow` 会多次触发，不要在其中做一次性初始化。
- `onReady` 后才能安全获取节点尺寸。

**评分维度**：
- 能列出 5 个主要生命周期（40%）
- 能正确描述执行顺序（30%）
- 能说明每个生命周期的典型用途（30%）

**常见错误**：
- 在 `onShow` 中做只应执行一次的初始化。
- 在 `onLoad` 中访问 DOM 节点。
- 忘记在 `onUnload` 或 `onHide` 中清理副作用。

**延伸追问**：
- 页面生命周期和 App 生命周期有什么关系？
- 自定义组件的生命周期和页面生命周期如何配合？

**相关题目**：
- [FB-45-CO-B-006 小程序自定义组件](#FB-45-CO-B-006)
- [FB-45-CO-A-006 自定义组件间通信](#FB-45-CO-A-006)

**参考资源**：
- [微信小程序官方文档 - 页面生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html)

**口头回答版**：
> 小程序页面生命周期主要有 onLoad、onShow、onReady、onHide、onUnload。顺序是 onLoad 先执行，然后 onShow、onReady。页面隐藏时走 onHide，重新显示再走 onShow，卸载时走 onUnload。onLoad 一般拿页面参数和初始化，onShow 做恢复和埋点，onReady 后操作 DOM，onHide 和 onUnload 清理资源。

---

### FB-45-CO-B-005：小程序路由跳转方式有哪些？各有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：45 小程序
**标签**：小程序、路由、生命周期
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举小程序中常用的页面跳转 API，并说明它们在页面栈行为、跳转方式、使用场景上的区别。

**参考答案**：

微信小程序主要路由 API：

| API | 作用 | 页面栈行为 | 使用场景 |
|-----|------|-----------|----------|
| `wx.navigateTo` | 保留当前页，跳转到新页面 | 新页面入栈 | 普通页面跳转，可返回 |
| `wx.redirectTo` | 关闭当前页，跳转到新页面 | 当前页出栈，新页入栈 | 登录后跳转首页，不需要返回 |
| `wx.reLaunch` | 关闭所有页面，打开新页面 | 清空栈，新页入栈 | 切换 Tab、重启流程 |
| `wx.switchTab` | 跳转到 TabBar 页面 | 清空非 Tab 页面栈 | Tab 切换 |
| `wx.navigateBack` | 返回上一级或多级 | 页面出栈 | 返回上一页 |

页面栈限制：
- 小程序页面栈最多 10 层。
- 超过 10 层后 `navigateTo` 会失败，应改用 `redirectTo` 或 `reLaunch`。

示例：

```javascript
// 普通跳转
wx.navigateTo({ url: '/pages/detail/detail?id=123' });

// 不需要返回的跳转
wx.redirectTo({ url: '/pages/home/home' });

// 返回上一页
wx.navigateBack({ delta: 1 });

// 切换到 Tab 页
wx.switchTab({ url: '/pages/index/index' });
```

带参数跳转：
- URL 参数通过 `onLoad(options)` 接收。
- 参数需 encode，复杂对象建议只传 id，到目标页再请求详情。

最佳实践：
- 避免页面栈过深，必要时做栈管理。
- Tab 页之间切换用 `switchTab`，不能用 `navigateTo`。
- 返回传参可通过全局状态、事件总线或页面实例方法。

**评分维度**：
- 能说出 5 种主要路由 API（40%）
- 能说明页面栈行为和栈深度限制（30%）
- 能给出不同场景的选择建议（30%）

**常见错误**：
- 用 `navigateTo` 跳 TabBar 页面导致失败。
- 页面栈超过 10 层后没有降级处理。
- 在 `onLoad` 外直接读取页面参数。

**延伸追问**：
- 返回上一页时如何传递数据？
- 小程序页面栈和浏览器 History 有什么异同？

**相关题目**：
- [FB-45-CO-B-004 小程序页面生命周期](#FB-45-CO-B-004)
- [FB-45-SC-P-007 小程序全局状态管理](#FB-45-SC-P-007)

**参考资源**：
- [微信小程序官方文档 - 路由](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html)

**口头回答版**：
> 小程序主要有五种跳转方式：navigateTo 是保留当前页跳新页，普通场景最常用；redirectTo 是关闭当前页再跳，适合不需要返回的；reLaunch 是关掉所有页面重新打开；switchTab 是跳 TabBar 页；navigateBack 是返回。页面栈最多 10 层，超过要用 redirectTo。跳 Tab 必须用 switchTab，用 navigateTo 会失败。

---

### FB-45-CO-B-006：小程序自定义组件的基本结构和生命周期是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：45 小程序
**标签**：小程序、组件化、生命周期
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明微信小程序自定义组件的目录结构、四个核心文件，以及组件生命周期的执行顺序。

**参考答案**：

自定义组件目录结构：

```text
components/
└── my-component/
    ├── my-component.js   # 组件逻辑
    ├── my-component.json # 组件配置
    ├── my-component.wxml # 组件模板
    └── my-component.wxss # 组件样式
```

组件 `json` 配置：

```json
{
  "component": true,
  "usingComponents": {}
}
```

页面或父组件中注册使用：

```json
{
  "usingComponents": {
    "my-component": "/components/my-component/my-component"
  }
}
```

组件核心生命周期：

| 生命周期 | 触发时机 | 用途 |
|----------|----------|------|
| `created` | 组件实例刚创建 | 不应用 setData，适合初始化纯数据 |
| `attached` | 组件挂载到页面节点树 | 可访问 this.data，适合发起请求 |
| `ready` | 组件布局完成 | 可获取节点信息 |
| `moved` | 组件移动到另一节点 | 较少使用 |
| `detached` | 组件被移除 | 清理副作用 |
| `error` | 组件方法抛出错误 | 错误处理 |

执行顺序：

```text
created -> attached -> ready -> (moved) -> detached
```

组件定义示例：

```javascript
Component({
  properties: {
    title: {
      type: String,
      value: '默认标题',
    },
  },
  data: {
    count: 0,
  },
  lifetimes: {
    attached() {
      console.log('组件挂载', this.properties.title);
    },
    detached() {
      console.log('组件卸载');
    },
  },
  methods: {
    onTap() {
      this.setData({ count: this.data.count + 1 });
      this.triggerEvent('change', { count: this.data.count });
    },
  },
});
```

注意：
- 组件 `data` 和 `properties` 都可以用于模板渲染，properties 由外部传入。
- 组件样式默认隔离，可通过 `options.addGlobalClass` 或 `externalClasses` 做样式穿透。

**评分维度**：
- 能说出自定义组件四个文件和 json 配置（30%）
- 能列出主要生命周期及顺序（40%）
- 能区分 properties 和 data，并写出基本组件（30%）

**常见错误**：
- 忘记在组件 json 中声明 `"component": true`。
- 在 `created` 中调用 `setData`。
- 混淆页面生命周期和组件生命周期。

**延伸追问**：
- 组件样式隔离是如何实现的？
- 父组件如何监听子组件事件？

**相关题目**：
- [FB-45-CO-A-006 自定义组件间通信](#FB-45-CO-A-006)
- [FB-45-FS-P-004 组件 behaviors / relations / slot](#FB-45-FS-P-004)

**参考资源**：
- [微信小程序官方文档 - 自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

**口头回答版**：
> 小程序自定义组件和页面一样，也有 js、json、wxml、wxss 四个文件，但 json 里要声明 component: true。生命周期有 created、attached、ready、detached，顺序是 created 先，attached 挂载，ready 布局完成，detached 卸载。外部传数据用 properties，内部状态用 data，组件样式默认是隔离的。

---

### FB-45-CO-B-007：小程序中 rpx 是什么？与 px / rem 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：45 小程序
**标签**：小程序、响应式、数据绑定
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释小程序中 rpx 的作用，并对比 rpx、px 和 rem 在小程序中的使用差异。

**参考答案**：

`rpx`（responsive pixel）是小程序定义的响应式长度单位。它以 750rpx 为屏幕总宽度进行等比缩放，开发者可以用固定数值适配不同屏幕宽度。

换算规则：

```text
1rpx = 屏幕宽度 / 750 px
```

例如：
- iPhone 6 屏幕宽度 375px，则 1rpx = 0.5px，750rpx = 375px。
- iPhone 6 Plus 屏幕宽度 414px，则 1rpx ≈ 0.552px，750rpx = 414px。

三者对比：

| 单位 | 含义 | 小程序支持 | 使用建议 |
|------|------|-----------|----------|
| `px` | 物理像素或 CSS 像素 | 支持 | 边框、阴影等固定尺寸可用 |
| `rpx` | 响应式像素，按 750 宽度缩放 | 支持 | 布局、宽高、间距首选 |
| `rem` | 相对根元素字体大小 | 不支持 | 小程序无根字体概念，不可用 |

示例：

```css
/* 设计稿宽度 750px，直接使用 rpx */
.container {
  width: 750rpx;
  padding: 20rpx;
}

/* 1px 边框建议用 px，避免 rpx 换算出现小数 */
.border {
  border-bottom: 1px solid #eee;
}
```

最佳实践：
- 布局尺寸优先使用 rpx。
- 边框、细线等可用 px 避免模糊。
- 字体大小通常也使用 rpx 或 px，视设计规范而定。

**评分维度**：
- 能说明 rpx 的换算规则（40%）
- 能对比 rpx、px、rem（40%）
- 能给出使用建议（20%）

**常见错误**：
- 认为 rpx 完全等价于 px。
- 在所有场景都使用 rpx，导致 1px 边框变模糊。
- 试图在小程序中使用 rem / vw / vh。

**延伸追问**：
- 小程序如何实现横屏适配？
- 如果设计稿是 375px，应该如何使用 rpx？

**相关题目**：
- [FB-45-CO-B-002 微信小程序项目结构](#FB-45-CO-B-002)
- [FB-45-PE-A-005 小程序性能优化](#FB-45-PE-A-005)

**参考资源**：
- [微信小程序官方文档 - 尺寸单位](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)

**口头回答版**：
> rpx 是小程序的响应式单位，规定屏幕宽度就是 750rpx，所以写一个固定数值可以自动适配不同屏幕。比如 iPhone 6 宽 375px，1rpx 就是 0.5px。px 是绝对单位，小程序里也支持；rem 不支持。布局、宽高、间距一般用 rpx，1px 边框建议用 px，避免 rpx 换算后变模糊。

---

### FB-45-CO-B-008：小程序用户登录和获取用户信息的流程是怎样的？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：45 小程序
**标签**：小程序、权限、安全
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请描述小程序中获取用户登录态和用户信息的标准流程，并说明 `wx.login`、`wx.getUserProfile` / `wx.getUserInfo`、服务端 session 的关系。

**参考答案**：

小程序登录流程基于 OAuth2 风格的 Code 换 Token 机制，核心步骤如下：

```text
1. 小程序前端调用 wx.login() 获取临时登录凭证 code
2. 前端把 code 发送给业务服务端
3. 服务端用 code + appid + secret 请求微信 auth.code2Session 接口
4. 微信返回 openid、unionid（如有）、session_key
5. 服务端生成自定义登录态（如 token / session）并返回给前端
6. 前端保存 token，后续请求携带 token 进行身份识别
```

获取用户信息：

- **wx.getUserProfile**：微信推荐的方式，每次调用都会弹窗授权，可获取加密数据。
- **wx.getUserInfo**：旧接口，已不再推荐，基础库 2.27.1 起默认返回匿名数据。
- **button open-type="chooseAvatar" / "getPhoneNumber"**：获取头像、手机号等敏感信息。

代码示例：

```javascript
// 登录
async function login() {
  const { code } = await wx.login();
  const res = await request('/api/login', { code });
  wx.setStorageSync('token', res.token);
}

// 获取用户信息
wx.getUserProfile({
  desc: '用于完善会员资料',
  success(res) {
    console.log(res.userInfo);
    // 如需手机号，需用 button 触发 getPhoneNumber
  },
});
```

安全注意：
- `session_key` 必须保存在服务端，不能返回前端。
- 用户敏感数据（如手机号）需用 `session_key` 解密。
- 建议对登录接口做频率限制和风控校验。

**评分维度**：
- 能描述 code -> session -> token 的登录流程（40%）
- 能区分 wx.login 和 getUserProfile / getUserInfo（30%）
- 能说明 session_key 的安全存储要求（30%）

**常见错误**：
- 认为 `wx.login` 直接返回 openid。
- 把 `session_key` 存在前端。
- 用旧版 `getUserInfo` 获取用户信息，不符合平台新规。

**延伸追问**：
- 如何实现登录态的无感刷新？
- 多账号体系下 unionid 和 openid 怎么使用？

**相关题目**：
- [FB-45-SE-A-007 小程序权限管理](#FB-45-SE-A-007)
- [FB-45-SE-R-006 小程序安全架构](#FB-45-SE-R-006)

**参考资源**：
- [微信小程序官方文档 - 登录流程](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
- [微信小程序官方文档 - 用户信息接口](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html)

**口头回答版**：
> 小程序登录是前端调 wx.login 拿到一个临时 code，把 code 发给服务端，服务端用 code 去微信接口换 openid 和 session_key，然后生成自己的 token 返回给前端。前端保存 token，后面请求都带上。用户信息用 getUserProfile，会弹窗授权。session_key 必须放服务端，不能给前端，敏感数据要靠它解密。

---
## 进阶题（8 道）{#advanced}

### FB-45-CO-A-001：小程序的双线程模型是什么？为什么采用这种架构？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：45 小程序
**标签**：小程序、容器、架构、数据绑定
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请详细解释小程序的双线程模型，包括渲染线程和逻辑线程的职责、通信方式，以及这种架构设计的优缺点。

**参考答案**：

小程序采用双线程架构：逻辑层（Logic Layer）和渲染层（Render Layer）分别运行在不同线程中，彼此隔离，通过 JSBridge 进行异步通信。

架构示意：

```text
+---------------------+         +---------------------+
|     渲染层           |         |      逻辑层          |
|  (WebView / 原生视图) |         |    (JSCore / V8)     |
|                     |         |                     |
|  WXML / WXSS 渲染    |         |  JS 业务逻辑         |
|  原生组件同层渲染     |         |  setData / 生命周期  |
|                     |         |                     |
+----------+----------+         +----------+----------+
           |                              |
           +----------- JSBridge ---------+
```

职责划分：

| 线程 | 运行环境 | 职责 |
|------|----------|------|
| 渲染层 | WebView | 解析 WXML/WXSS，构建 DOM 树，响应用户事件 |
| 逻辑层 | JSCore / V8 | 执行 JS，管理数据、生命周期、平台 API 调用 |

通信机制：
- 逻辑层通过 `setData` 把数据 diff 发送到渲染层。
- 渲染层通过事件系统把用户交互传递到逻辑层。
- 通信是异步、序列化的，数据需经过 JSON 化。

采用双线程的原因：

1. **安全隔离**：JS 逻辑无法直接操作 DOM，避免 XSS、恶意脚本破坏页面。
2. **可控性**：平台可以限制和管控逻辑层能力，统一审核和灰度。
3. **稳定性**：逻辑错误不会直接导致渲染层崩溃。
4. **原生能力统一调度**：平台 API 由逻辑层统一转发到客户端原生能力。

缺点：
- `setData` 频繁调用或数据量过大时会产生性能瓶颈。
- 跨线程通信有延迟，不适合高频实时交互。
- 开发者无法直接操作 DOM，灵活性受限。

最佳实践：
- 减少 `setData` 调用次数，合并字段更新。
- 避免一次性 setData 大量列表数据，使用分页或虚拟列表。
- 复杂动画优先使用 CSS 动画或原生组件，而非 JS 逐帧驱动。

**评分维度**：
- 能说明双线程分别是渲染层和逻辑层（30%）
- 能解释 JSBridge 通信和 setData 机制（30%）
- 能分析双线程架构的安全、性能优缺点（40%）

**常见错误**：
- 认为小程序和 H5 一样运行在同一个 WebView 线程。
- 忽略跨线程通信带来的性能开销。
- 认为逻辑层可以直接操作 DOM。

**延伸追问**：
- 双线程模型下如何实现原生组件同层渲染？
- setData 的数据量上限是多少？如何规避？

**相关题目**：
- [FB-45-CO-B-003 小程序 MVVM 数据绑定](#FB-45-CO-B-003)
- [FB-45-FS-P-001 小程序 Exparser 和虚拟 DOM](#FB-45-FS-P-001)

**参考资源**：
- [微信小程序官方文档 - 小程序框架](https://developers.weixin.qq.com/miniprogram/dev/framework/MINA.html)

**口头回答版**：
> 小程序是双线程模型，渲染层跑在 WebView 里负责界面，逻辑层跑在 JSCore 或 V8 里负责 JS 逻辑。两边通过 JSBridge 异步通信。逻辑层调用 setData，会把数据 diff 传给渲染层更新视图；用户点击等事件则从渲染层传回逻辑层。这样设计主要是为了安全和可控，JS 不能直接操作 DOM，平台也更好管控。缺点是跨线程通信有开销，setData 太频繁或数据量太大会卡。

---

### FB-45-CO-A-002：JSBridge 在小程序中如何工作？有哪些通信方式？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：45 小程序
**标签**：小程序、容器、架构、数据绑定
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 JSBridge 在小程序中的作用、常见实现方式，并说明逻辑层与原生能力之间是如何通过 JSBridge 交互的。

**参考答案**：

JSBridge 是连接 JavaScript 运行环境与客户端原生能力的桥梁。在小程序中，它负责连接逻辑层 JS 与宿主 App 的原生能力（如扫码、支付、定位、蓝牙等），同时也负责逻辑层与渲染层之间的通信。

JSBridge 主要通信场景：

1. **JS 调用原生能力**：如 `wx.scanCode`、`wx.requestPayment`。
2. **原生能力回调 JS**：如扫码结果、定位结果、网络状态变化。
3. **逻辑层与渲染层通信**：如 `setData`、事件分发。

常见实现方式：

| 方式 | 原理 | 特点 |
|------|------|------|
| URL Scheme | JS 通过修改 `iframe.src` 或 `location.href` 携带协议，客户端拦截并解析 | 兼容性好，但有长度限制 |
| 注入全局对象 | 客户端在 JS 上下文中注入 `wx` / `my` / `tt` 等对象 | 调用方便，性能较好 |
| 原生方法注入 | 客户端把原生方法绑定到 JS 对象上，JS 直接调用 | 适合同步调用 |
| 消息队列 | JS 把调用信息放入队列，客户端定时轮询或主动拉取 | 适合大量异步调用 |

微信小程序调用示意：

```javascript
// JS 调用原生扫码能力
wx.scanCode({
  success(res) {
    console.log(res.result);
  },
  fail(err) {
    console.error(err);
  },
});
```

内部流程：

```text
1. JS 调用 wx.scanCode(options)
2. JSBridge 把方法名和参数序列化
3. 通过 JSCore / WebView 桥接协议发送到客户端
4. 客户端调用原生扫码 SDK
5. 扫码完成后，客户端把结果通过 JSBridge 回调给 JS
6. JS 执行 success / fail / complete 回调
```

通信特点：
- 异步为主，部分能力支持同步调用（如 `wx.getSystemInfoSync`）。
- 参数和结果都需 JSON 序列化，复杂对象可能丢失类型信息。
- 调用有频率和并发限制，过度调用会影响性能。

最佳实践：
- 调用原生能力前先做能力检测和版本兼容。
- 避免在循环中高频调用 JSBridge 接口。
- 对异步调用结果做超时和错误兜底。

**评分维度**：
- 能说明 JSBridge 连接 JS 与原生能力的作用（30%）
- 能列举至少 3 种实现方式（30%）
- 能描述一次完整调用流程并指出异步特性（40%）

**常见错误**：
- 认为 JSBridge 只在小程序中使用，忽略 H5  hybrid 场景也有。
- 认为所有 JSBridge 调用都是同步的。
- 忽略版本兼容性，直接调用高版本 API。

**延伸追问**：
- 小程序中 setData 为什么不走同步 JSBridge？
- 如何实现自定义 JSBridge 扩展宿主能力？

**相关题目**：
- [FB-45-CO-A-001 小程序的双线程模型](#FB-45-CO-A-001)
- [FB-45-SD-R-007 多平台小程序容器架构](#FB-45-SD-R-007)

**参考资源**：
- [微信小程序官方文档 - API](https://developers.weixin.qq.com/miniprogram/dev/api/)

**口头回答版**：
> JSBridge 就是小程序里 JS 和原生能力之间的桥梁。我们调用 wx.scanCode、wx.request 这些 API，背后都是通过 JSBridge 把消息发给宿主 App 的原生层，原生层执行完再把结果回调给 JS。实现方式有 URL Scheme、注入全局对象、消息队列等。小程序里大多是异步调用，参数要序列化，调用太频繁会有性能问题。

---

### FB-45-CO-A-003：微信、支付宝、抖音、百度小程序的架构有什么异同？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：45 小程序
**标签**：小程序、容器、架构、组件化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比微信小程序、支付宝小程序、抖音小程序、百度小程序在运行架构、组件规范、API 命名、生态能力等方面的异同。

**参考答案**：

四大主流小程序平台都基于"离线包 + 双线程 + JSBridge"思想，但在技术细节、组件规范和生态能力上存在差异。

架构对比：

| 维度 | 微信小程序 | 支付宝小程序 | 抖音小程序 | 百度小程序 |
|------|-----------|-------------|-----------|-----------|
| 渲染层 | WebView + 原生组件同层 | UC WebView + 原生 | WebView | WebView |
| 逻辑层 | JSCore / V8 | V8 | V8 | V8 |
| 组件规范 | WXML / WXSS | AXML / ACSS | TTML / TTSS | SWAN / CSS |
| 全局对象 | `wx` | `my` | `tt` | `swan` |
| 包体积限制 | 主包 2MB，总包 20MB | 主包 2MB | 主包 2MB | 主包 2MB |
| 分包加载 | 支持 | 支持 | 支持 | 支持 |
| 核心优势 | 社交生态、支付 | 金融、生活服 | 内容、短视频 | 搜索、信息流 |

共性：

1. **双线程模型**：渲染与逻辑分离。
2. **离线包机制**：代码包下载后本地运行。
3. **平台审核与灰度**：上线需审核，支持热更新。
4. **原生能力调用**：扫码、支付、定位、分享等。
5. **自定义组件**：支持组件化开发。

差异：

- **微信小程序**：生态最成熟，组件和 API 最丰富，社交裂变能力最强。
- **支付宝小程序**：强金融属性，会员、卡包、信用能力突出。
- **抖音小程序**：内容分发能力强，短视频挂载和直播场景多。
- **百度小程序**：搜索入口强，信息流推荐和自然流量获取有优势。

跨端框架：
- Taro、UniApp 等框架通过编译时/运行时抹平差异，一份代码输出多端产物。
- 但平台特有 API 和组件仍需条件编译或运行时适配。

**评分维度**：
- 能说明四大平台都基于双线程 + 离线包架构（30%）
- 能对比渲染/逻辑层、组件规范、全局对象差异（40%）
- 能分析各平台生态能力差异（30%）

**常见错误**：
- 认为所有小程序完全等价，可以零成本迁移。
- 忽略各平台审核规范和开放能力的差异。
- 认为跨端框架能 100% 抹平平台差异。

**延伸追问**：
- Taro 和 UniApp 是如何实现跨端编译的？
- 如果某平台不支持某个组件，跨端框架会如何处理？

**相关题目**：
- [FB-45-SD-R-001 跨端小程序框架设计](#FB-45-SD-R-001)
- [FB-45-CO-A-002 JSBridge 在小程序中如何工作](#FB-45-CO-A-002)

**参考资源**：
- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [支付宝小程序官方文档](https://opendocs.alipay.com/mini/introduce)
- [抖音小程序官方文档](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/overview/)
- [百度智能小程序官方文档](https://smartprogram.baidu.com/docs/introduction/register/)

**口头回答版**：
> 微信、支付宝、抖音、百度小程序底层都是双线程加离线包，但各自组件语法和全局对象不同：微信是 WXML/WXSS 和 wx，支付宝是 AXML/ACSS 和 my，抖音是 TTML/TTSS 和 tt，百度是 SWAN 和 swan。生态上微信社交强，支付宝金融强，抖音内容分发强，百度搜索入口强。跨端框架像 Taro、UniApp 能一套代码转多端，但平台特有 API 还是要做适配。

---

### FB-45-PE-A-004：小程序分包加载的原理是什么？如何配置？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：45 小程序
**标签**：小程序、性能优化、工程化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释小程序分包加载的原理，说明普通分包和独立分包的区别，并给出配置示例。

**参考答案**：

小程序分包加载是为了解决主包体积限制和首屏启动速度问题。启动时只下载主包，用户进入分包页面时再按需下载对应分包。

分包类型：

| 类型 | 特点 | 使用场景 |
|------|------|----------|
| 普通分包 | 依赖主包运行，按需下载 | 按业务模块拆分 |
| 独立分包 | 不依赖主包即可启动 | 活动页、广告投放页 |
| 分包预下载 | 进入某页面时预加载其他分包 | 预测用户下一步路径 |

配置示例：

```json
// app.json
{
  "pages": [
    "pages/index/index",
    "pages/logs/logs"
  ],
  "subPackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/cat",
        "pages/dog"
      ]
    },
    {
      "root": "packageB",
      "pages": [
        "pages/apple",
        "pages/banana"
      ],
      "independent": true
    }
  ],
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["packageA"]
    }
  }
}
```

分包加载流程：

```text
1. 用户打开小程序，下载主包
2. 进入分包页面时，判断分包是否已下载
3. 未下载则异步下载分包，下载完成后执行页面逻辑
4. 独立分包可直接启动，不下载主包
5. 预下载规则可在用户进入某页面时提前加载指定分包
```

分包限制（以微信为例）：
- 主包体积不超过 2MB。
- 整个小程序所有分包合计不超过 20MB。
- 单个分包/独立分包不超过 2MB。

最佳实践：
- 按业务域拆分分包，如首页、商城、个人中心各自成包。
- 独立分包适合广告投放、分享入口等活动页。
- 利用分包预下载优化二级页面打开速度。
- 公共模块抽到主包，避免分包重复打包。

**评分维度**：
- 能解释分包加载按需下载的原理（30%）
- 能区分普通分包、独立分包、分包预下载（30%）
- 能写出 app.json 分包配置（20%）
- 能说明体积限制和拆分原则（20%）

**常见错误**：
- 把主包页面放到 subPackages 中。
- 独立分包引用了主包资源导致启动失败。
- 公共代码没有抽到主包，导致多个分包重复。

**延伸追问**：
- 分包和主包之间如何共享组件和工具函数？
- 分包加载失败如何降级处理？

**相关题目**：
- [FB-45-PE-P-003 小程序包体积优化](#FB-45-PE-P-003)
- [FB-45-EN-R-002 小程序工程化与 Monorepo](#FB-45-EN-R-002)

**参考资源**：
- [微信小程序官方文档 - 分包加载](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)

**口头回答版**：
> 小程序分包是为了控制主包体积和加快启动。启动时只下主包，用户进分包页面时再按需下载。分包分普通分包和独立分包，普通分包依赖主包，独立分包可以不依赖主包直接启动。还有分包预下载，能在用户进某个页面时提前加载下一个分包。主包一般 2MB 上限，总分包 20MB。配置时在 app.json 里写 subPackages，还可以配 preloadRule 做预下载。

---

### FB-45-PE-A-005：小程序性能优化有哪些常用手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：45 小程序
**标签**：小程序、性能优化、生命周期
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举小程序性能优化的常见手段，涵盖启动、渲染、网络、包体积等方面。

**参考答案**：

小程序性能优化可从启动、渲染、网络、包体积、运行时五个维度入手。

一、启动优化：
- 控制主包体积，优先使用分包。
- 减少 `app.js` / 首页 `onLoad` 中的同步初始化。
- 延迟加载非必要 SDK、插件和统计脚本。
- 利用独立分包投放活动页，缩短广告落地页路径。

二、渲染优化：
- 减少 `setData` 调用次数，合并字段更新。
- `setData` 只传必要字段，避免更新整个对象或长列表。
- 长列表使用虚拟列表或分页加载，避免一次性渲染大量节点。
- 复杂动画优先使用 CSS 动画或原生组件（如 `swiper`、`video`）。

三、网络优化：
- 合并请求，避免并发过多。
- 图片使用 CDN 压缩、懒加载、占位图。
- 合理使用缓存（storage、内存缓存）。
- 接口失败重试和超时兜底。

四、包体积优化：
- 删除未引用代码和图片资源。
- 使用 Terser 压缩、Tree Shaking。
- 大型依赖按分包或按需加载。
- 图标用字体图标或 SVG 替代 PNG。

五、运行时优化：
- 避免内存泄漏：页面卸载时清理定时器、事件监听。
- 页面隐藏时暂停不必要的任务。
- 使用 `wx.nextTick` 合并 DOM 操作。

示例：合并 setData：

```javascript
// 不推荐：多次 setData
this.setData({ a: 1 });
this.setData({ b: 2 });

// 推荐：合并为一次
this.setData({ a: 1, b: 2 });
```

最佳实践：
- 使用小程序开发者工具的"性能面板"和"Audits"定期检测。
- 建立包体积门禁，防止大文件合入。
- 对关键页面做首屏时间监控。

**评分维度**：
- 能从启动、渲染、网络、包体积、运行时五个维度展开（40%）
- 能重点说明 setData 优化和长列表处理（30%）
- 能给出具体代码示例和监控建议（30%）

**常见错误**：
- 只关注包体积，忽略 setData 和渲染性能。
- 在 onLoad 中同步阻塞初始化大量逻辑。
- 长列表一次性 setData 上千条数据。

**延伸追问**：
- 如何检测小程序首屏时间？
- setData 数据量超过限制时怎么处理？

**相关题目**：
- [FB-45-PE-P-002 小程序启动与白屏优化](#FB-45-PE-P-002)
- [FB-45-PE-P-003 小程序包体积优化](#FB-45-PE-P-003)

**参考资源**：
- [微信小程序官方文档 - 性能优化](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/)

**口头回答版**：
> 小程序性能优化可以从五个方面说：启动上控制主包体积、用分包、延迟加载 SDK；渲染上减少 setData 次数，只更新必要字段，长列表做虚拟列表或分页；网络上合并请求、图片懒加载、接口缓存；包体积上删无用资源、压缩、Tree Shaking；运行时上注意内存泄漏，页面卸载清理定时器。最核心的是 setData 要合并、要克制，不要一次传太多数据。

---

### FB-45-CO-A-006：小程序自定义组件间的数据传递和事件通信方式有哪些？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：45 小程序
**标签**：小程序、组件化、数据绑定、生命周期
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明小程序中父子组件、兄弟组件、跨层级组件之间进行数据传递和事件通信的方式，并给出示例。

**参考答案**：

小程序组件通信方式：

| 场景 | 方式 | 说明 |
|------|------|------|
| 父传子 | properties | 通过属性向下传递数据 |
| 子传父 | triggerEvent | 子组件触发事件，父组件监听 |
| 兄弟组件 | 父组件中转 / 全局状态 | 通过共同父组件或状态管理 |
| 跨层级 | relations / 全局状态 | 父子关系组件用 relations，复杂场景用状态管理 |
| 全局通信 | globalData / storage / 状态库 | 跨页面或深层组件共享数据 |

父传子示例：

```xml
<!-- parent.wxml -->
<my-component title="&#123;&#123;pageTitle&#125;&#125;" count="&#123;&#123;3&#125;&#125;" />
```

```javascript
// my-component.js
Component({
  properties: {
    title: String,
    count: {
      type: Number,
      value: 0,
    },
  },
});
```

子传父示例：

```xml
<!-- my-component.wxml -->
<button bindtap="handleTap">点击</button>
```

```javascript
// my-component.js
Component({
  methods: {
    handleTap() {
      this.triggerEvent('onTap', { msg: 'hello' }, { bubbles: false });
    },
  },
});
```

```xml
<!-- parent.wxml -->
<my-component bind:onTap="onChildTap" />
```

```javascript
// parent.js
Page({
  onChildTap(e) {
    console.log(e.detail.msg);
  },
});
```

跨层级 relations 示例：

```javascript
// parent.js
Component({
  relations: {
    './child.js': {
      type: 'child',
      linked(target) {
        this.children = this.children || [];
        this.children.push(target);
      },
    },
  },
  methods: {
    broadcast(msg) {
      this.children.forEach(child => child.receive(msg));
    },
  },
});
```

最佳实践：
- 优先使用 properties + triggerEvent 做父子通信。
- 兄弟组件避免直接通信，应通过父组件或状态管理中转。
- 跨多层级且数据复杂时，使用 MobX、GlobalData 或自定义状态库。

**评分维度**：
- 能说明父子组件 properties / triggerEvent 通信（40%）
- 能说明兄弟和跨层级通信方案（30%）
- 能写出基本通信代码示例（30%）

**常见错误**：
- 子组件直接修改 properties。
- 事件名写错或大小写不匹配。
- 滥用全局状态管理简单父子通信。

**延伸追问**：
- triggerEvent 的 bubbles 和 composed 有什么区别？
- relations 适合什么场景？有什么限制？

**相关题目**：
- [FB-45-CO-B-006 小程序自定义组件](#FB-45-CO-B-006)
- [FB-45-FS-P-004 组件 behaviors / relations / slot](#FB-45-FS-P-004)

**参考资源**：
- [微信小程序官方文档 - 组件间通信](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)

**口头回答版**：
> 小程序组件通信和 Vue、React 类似：父传子用 properties，子传父用 triggerEvent 触发事件。兄弟组件可以通过共同父组件中转，或者用全局状态。跨层级复杂场景可以用 relations 定义父子关系，也可以用 MobX、globalData 这些状态管理。最常用还是 properties 加 triggerEvent，不要乱用全局状态。

---

### FB-45-SE-A-007：小程序的权限管理和用户授权如何处理？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：45 小程序
**标签**：小程序、权限、安全
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明小程序中用户授权的机制，包括权限类型、授权流程、最佳实践，以及如何处理用户拒绝授权的情况。

**参考答案**：

小程序权限分为普通权限和敏感权限。普通权限无需用户授权即可调用；敏感权限需要用户主动授权，部分还需通过按钮组件触发。

常见权限分类：

| 类型 | 示例 | 授权方式 |
|------|------|----------|
| 普通权限 | 网络请求、获取系统信息 | 无需授权 |
| 一次性敏感权限 | 获取手机号、选择头像 | 必须由 button 组件触发 |
| 持久性敏感权限 | 地理位置、相册、摄像头 | 弹窗授权，可后续在设置页管理 |
| 后台权限 | 后台定位、蓝牙 | 需在 app.json 声明并引导用户开启 |

授权流程：

```text
1. 调用 wx.authorize 或相关 API
2. 如果用户未授权，弹出授权弹窗
3. 用户同意后获得权限
4. 用户拒绝后，后续调用直接失败
5. 可引导用户到设置页重新开启权限
```

地理位置授权示例：

```javascript
wx.getLocation({
  type: 'wgs84',
  success(res) {
    console.log(res.latitude, res.longitude);
  },
  fail(err) {
    if (err.errMsg.includes('auth deny')) {
      wx.showModal({
        title: '需要位置权限',
        content: '请前往设置开启位置权限',
        success(r) {
          if (r.confirm) {
            wx.openSetting();
          }
        },
      });
    }
  },
});
```

手机号授权示例：

```xml
<button open-type="getPhoneNumber" bind:getphonenumber="getPhoneNumber">获取手机号</button>
```

```javascript
Page({
  getPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 把 encryptedData、iv 发给服务端解密
      wx.request({
        url: '/api/decrypt-phone',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        },
      });
    }
  },
});
```

最佳实践：
- 只在必要时请求权限，并提前说明用途。
- 用户拒绝后不要反复弹窗，提供手动开启入口。
- 敏感数据（如手机号）必须服务端解密，前端不保存。
- 在 `app.json` 中声明需要的权限（如 `permission`、`requiredPrivateInfos`）。

**评分维度**：
- 能区分普通权限和敏感权限（30%）
- 能描述授权流程和拒绝后处理（30%）
- 能写出地理位置或手机号授权示例（40%）

**常见错误**：
- 未授权就调用敏感 API 导致功能异常。
- 用户拒绝后没有引导入口。
- 前端直接解密敏感数据。

**延伸追问**：
- 用户关闭授权弹窗后再次进入，如何判断授权状态？
- 小程序隐私协议如何配置？

**相关题目**：
- [FB-45-CO-B-008 小程序登录流程](#FB-45-CO-B-008)
- [FB-45-SE-R-006 小程序安全架构](#FB-45-SE-R-006)

**参考资源**：
- [微信小程序官方文档 - 授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)

**口头回答版**：
> 小程序权限分普通权限和敏感权限。普通权限比如网络请求不用授权；敏感权限比如位置、相册、摄像头要弹窗授权，手机号、头像这种必须由 button 触发。用户拒绝后不能反复弹窗，要引导他去设置页手动开。调用 wx.getLocation 失败时判断是不是 auth deny，然后用 wx.openSetting 引导。手机号授权拿到 encryptedData 和 iv 后要发给服务端解密，前端不能自己解密。

---

### FB-45-CO-A-008：小程序的版本更新机制是怎样的？如何做到强制更新？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：45 小程序
**标签**：小程序、生命周期、工程化
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明小程序的版本更新机制，包括静默更新、启动时更新、强制更新的实现方式，以及开发中如何调试新版本。

**参考答案**：

小程序的版本更新由平台控制，分为以下几种情况：

| 更新类型 | 触发时机 | 特点 |
|----------|----------|------|
| 冷启动更新 | 用户完全退出后重新打开 | 平台自动下载最新版本 |
| 热启动更新 | 从后台切回前台 | 有一定时间间隔才会检查更新 |
| 开发版 / 体验版 | 开发者或体验者扫码打开 | 直接加载最新预览版本 |

微信提供了 `wx.getUpdateManager` API 让开发者感知更新：

```javascript
const updateManager = wx.getUpdateManager();

updateManager.onCheckForUpdate(res => {
  console.log('是否有新版本:', res.hasUpdate);
});

updateManager.onUpdateReady(() => {
  wx.showModal({
    title: '更新提示',
    content: '新版本已准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        updateManager.applyUpdate();
      }
    },
  });
});

updateManager.onUpdateFailed(() => {
  wx.showModal({
    title: '更新失败',
    content: '新版本下载失败，请检查网络后重试',
  });
});
```

强制更新策略：
- 服务端维护最低可用版本号。
- 启动时调用接口获取当前最新版本和最低版本。
- 如果本地版本低于最低版本，调用 `applyUpdate` 强制重启或引导用户。
- 对于关键业务修复，可在页面内弹窗拦截，提示必须更新。

调试新版本：
- 开发工具中开启"上传代码时自动更新"或手动清缓存。
- 真机预览使用"开发版"或"体验版"。
- 线上版本可通过"小程序助手"查看版本号。

**评分维度**：
- 能说明冷启动、热启动更新机制（30%）
- 能使用 wx.getUpdateManager 写出更新监听代码（40%）
- 能说明强制更新和调试方法（30%）

**常见错误**：
- 认为小程序会实时自动更新到最新版。
- 忽略用户拒绝重启导致旧版本继续运行。
- 没有在更新失败时做兜底提示。

**延伸追问**：
- 如果用户一直不更新，如何兼容旧版本接口？
- 小程序版本号和业务版本号如何统一管理？

**相关题目**：
- [FB-45-PE-P-002 小程序启动与白屏优化](#FB-45-PE-P-002)
- [FB-45-SD-R-003 小程序监控埋点与灰度](#FB-45-SD-R-003)

**参考资源**：
- [微信小程序官方文档 - 更新机制](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/update-mechanism.html)

**口头回答版**：
> 小程序更新是平台控制的。冷启动时会自动下新版，热启动时过段时间才会检查。开发者可以用 wx.getUpdateManager 监听更新，onUpdateReady 时弹窗让用户重启，applyUpdate 是强制应用新版。如果要更强制，可以让服务端配一个最低版本，启动时比版本号，低于就强制更新。调试新版本用开发版、体验版，或者清缓存。

---
## 深入题（7 道）{#proficient}

### FB-45-FS-P-001：小程序 Exparser 组件框架和虚拟 DOM 渲染原理是什么？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：45 小程序
**标签**：小程序、组件化、容器、架构
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入分析微信小程序的 Exparser 组件框架，以及小程序从 WXML 到原生视图的渲染流程。

**参考答案**：

Exparser 是微信小程序的组件组织框架，负责管理自定义组件的生命周期、属性、事件、模板解析和 Shadow Tree 构建。它在概念上类似 Web Components，但底层实现针对小程序双线程架构做了大量定制。

核心能力：

1. **组件注册与实例化**：解析组件定义，管理 properties、data、methods、lifetimes。
2. **Shadow Tree 构建**：每个组件有独立的 Shadow Tree，与页面节点树组合成完整渲染树。
3. **模板解析**：把 WXML 编译为可执行的渲染函数。
4. **数据响应与 diff**：监听 setData，生成最小差异集。
5. **事件系统**：封装触摸、点击等事件，跨线程派发到逻辑层。

渲染流程：

```text
1. 开发者编写 WXML / WXSS / JS
2. 编译阶段：WXML 被编译为渲染函数，WXSS 解析为样式规则
3. 运行阶段：逻辑层初始化 data，构建组件实例树
4. setData 触发：逻辑层 diff 数据，生成 patch
5. JSBridge 传输：patch 序列化后发送到渲染层
6. 渲染层应用 patch，更新虚拟 DOM / Shadow Tree
7. 渲染层把节点映射为原生视图（WebView DOM + 原生组件同层）
```

关键概念：

- **Virtual DOM 差异更新**：小程序并非完全复用 React / Vue 的 VDOM，而是基于 Shadow Tree 做增量更新。
- **Shadow Tree**：组件内部节点树，与 Composed Tree 组合后形成最终渲染树。
- **原生组件同层渲染**：部分组件（如 video、map、canvas）通过原生视图直接渲染，插入到 WebView 的同一层级。

示例：setData 的 diff 与更新

```javascript
Page({
  data: {
    list: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }],
  },
  updateName() {
    // 框架只把 list[1].name 的变化发送到渲染层
    this.setData({
      'list[1].name': 'C',
    });
  },
});
```

最佳实践：
- 避免过深的组件嵌套，减少 Shadow Tree 构建开销。
- 列表渲染使用稳定 key，帮助框架做节点复用。
- 减少不必要的 setData，避免跨线程通信压力。

**评分维度**：
- 能说明 Exparser 管理组件生命周期和 Shadow Tree（30%）
- 能描述从 WXML 到原生视图的完整渲染流程（40%）
- 能解释同层渲染和数据 diff 机制（30%）

**常见错误**：
- 认为小程序完全使用浏览器原生 DOM。
- 把小程序 VDOM 和 React VDOM 完全等同。
- 忽略 Shadow Tree 与页面节点树的组合关系。

**延伸追问**：
- 同层渲染解决了什么问题？又有哪些限制？
- 为什么小程序不使用真实 DOM 操作？

**相关题目**：
- [FB-45-CO-A-001 小程序的双线程模型](#FB-45-CO-A-001)
- [FB-45-FS-P-005 小程序同层渲染原理](#FB-45-FS-P-005)

**参考资源**：
- [微信小程序官方文档 - Exparser](https://developers.weixin.qq.com/miniprogram/dev/framework/view/exparser.html)
- [微信小程序官方文档 - 自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

**口头回答版**：
> Exparser 是微信小程序的组件框架，负责组件的注册、生命周期、属性、事件和模板解析。每个组件有自己的 Shadow Tree，组合起来形成页面渲染树。WXML 会被编译成渲染函数，运行时在逻辑层初始化数据。setData 后框架会做 diff，把最小变化通过 JSBridge 发给渲染层，渲染层更新 Shadow Tree，再映射到原生视图。像 video、map 这些原生组件是同层渲染的，直接插到 WebView 里。

---

### FB-45-PE-P-002：小程序启动性能优化和白屏优化有哪些方案？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：45 小程序
**标签**：小程序、性能优化、生命周期
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请从启动流程分析小程序首屏和白屏产生的原因，并给出系统性的优化方案。

**参考答案**：

小程序启动流程：

```text
1. 用户点击图标或扫码
2. 宿主 App 加载小程序运行时
3. 下载或校验主包资源
4. 初始化逻辑层（app.js）
5. 渲染首页（page onLoad -> onShow -> onReady）
6. 发起首页数据请求
7. 请求返回后 setData 更新视图
```

白屏原因：

- 主包过大导致下载和解析慢。
- `app.js` 同步初始化阻塞。
- 首页接口慢或串行请求多。
- 首屏数据量大，setData 慢。
- 模板复杂、节点多，渲染慢。

优化方案：

一、包层面：
- 控制主包 2MB 以内，非核心页面放入分包。
- 使用独立分包作为广告和活动落地页。
- 删除冗余资源、未使用组件和图片。

二、代码层面：
- 把非必要初始化逻辑延迟到首页加载后或异步执行。
- 首页 onLoad 中并行发起多个独立请求。
- 使用骨架屏或默认数据占位，减少白屏时间。
- 对首屏非关键资源做懒加载。

三、数据层面：
- 首页接口做缓存优先策略，先展示缓存再刷新。
- 接口返回数据做精简，只渲染首屏必要字段。
- 分页加载长列表，避免一次性 setData 大量数据。

四、渲染层面：
- 首屏模板节点控制在合理范围，避免过深嵌套。
- 使用 CSS 动画替代 JS 动画。
- 对复杂区域使用原生组件或 cover-view。

骨架屏示例：

```xml
<!-- index.wxml -->
<view wx:if="&#123;&#123;loading&#125;&#125;" class="skeleton">
  <view class="skeleton-title"></view>
  <view class="skeleton-item" wx:for="&#123;&#123;5&#125;&#125;"></view>
</view>

<view wx:else class="content">
  <view wx:for="&#123;&#123;list&#125;&#125;">&#123;&#123;item.name&#125;&#125;</view>
</view>
```

```javascript
Page({
  data: {
    loading: true,
    list: [],
  },
  async onLoad() {
    const cached = wx.getStorageSync('home_list');
    if (cached) {
      this.setData({ list: cached, loading: false });
    }
    const fresh = await fetchHomeList();
    this.setData({ list: fresh, loading: false });
    wx.setStorageSync('home_list', fresh);
  },
});
```

监控指标：
- 启动总耗时、首屏渲染时间（FMP）。
- 接口耗时、setData 耗时、节点数量。
- 用户白屏率和退出率。

**评分维度**：
- 能分析启动流程和白屏原因（30%）
- 能从包、代码、数据、渲染四个层面给出方案（40%）
- 能写出骨架屏或缓存优先代码示例（30%）

**常见错误**：
- 只优化包体积，忽略首屏接口和渲染性能。
- 在 app.js 中同步初始化大量 SDK。
- 首屏一次性请求过多串行接口。

**延伸追问**：
- 如何精确测量小程序首屏时间？
- 独立分包对广告投放场景有什么价值？

**相关题目**：
- [FB-45-PE-A-005 小程序性能优化](#FB-45-PE-A-005)
- [FB-45-PE-P-003 小程序包体积优化](#FB-45-PE-P-003)

**参考资源**：
- [微信小程序官方文档 - 启动性能](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips/start.html)

**口头回答版**：
> 小程序启动要经过加载运行时、下载主包、初始化 app.js、渲染首页、请求数据、setData 更新。白屏通常是因为主包大、app.js 阻塞、首屏接口慢、setData 数据多。优化可以从四个方面做：包层面控制主包、用分包；代码层面延迟初始化、并行请求；数据层面做缓存优先、分页加载；渲染层面用骨架屏、减少节点。最常用的是骨架屏加缓存先展示，接口回来再刷新。

---

### FB-45-PE-P-003：小程序包体积优化有哪些手段？如何分析体积？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：45 小程序
**标签**：小程序、性能优化、工程化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明小程序包体积的限制和优化手段，并介绍如何分析包体积构成。

**参考答案**：

微信小程序包体积限制：

| 类型 | 限制 |
|------|------|
| 主包 | 2MB |
| 单个分包 | 2MB |
| 所有包总计 | 20MB |

超过主包限制会导致无法预览和上传，因此体积优化是小程序工程化的核心工作。

常用优化手段：

一、代码层面：
- Tree Shaking：移除未引用的模块和函数。
- 代码压缩：Terser / Uglify 压缩 JS。
- 按需加载：大型库按功能分包或按需引入。
- 图片资源：压缩、转 WebP、CDN 外联、使用字体图标。
- 样式精简：删除无用 WXSS，避免全局样式污染。

二、架构层面：
- 分包加载：按业务域拆包。
- 独立分包：活动页单独成包。
- 组件复用：公共组件抽到主包，避免重复打包。

三、平台能力：
- 使用小程序插件替代内置代码。
- 利用「分包异步化」能力延迟加载非必要模块。

体积分析方法：

1. **开发者工具**：
   - 点击"上传"或"详情"查看主包、分包大小。
   - 使用"代码依赖分析"查看文件体积。

2. **构建产物分析**：
   - Webpack Bundle Analyzer：分析 JS 依赖。
   - 自定义脚本统计 wxml / wxss / js / 图片占比。

3. **CI 门禁**：
   - 在流水线中统计包体积，超过阈值阻断合并。

示例：构建脚本统计体积

```javascript
// scripts/analyze-size.js
const fs = require('fs');
const path = require('path');

function getDirSize(dir) {
  let total = 0;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const full = path.join(dir, file.name);
    if (file.isDirectory()) {
      total += getDirSize(full);
    } else {
      total += fs.statSync(full).size;
    }
  }
  return total;
}

const dist = path.join(__dirname, '../dist');
console.log(`总包体积: ${(getDirSize(dist) / 1024 / 1024).toFixed(2)} MB`);
```

最佳实践：
- 建立体积预算（Bundle Budget），主包控制在 1.5MB 以内留出余量。
- 每次迭代前 review 新增依赖体积。
- 对图片资源统一上 CDN，不在包内放原图。

**评分维度**：
- 能说明主包 2MB / 总分包 20MB 的限制（20%）
- 能从代码、架构、平台能力三个层面给出优化手段（40%）
- 能介绍体积分析工具和 CI 门禁（40%）

**常见错误**：
- 只压缩 JS 不处理图片资源。
- 分包拆分后公共代码没有抽到主包。
- 等上传失败才关注体积。

**延伸追问**：
- 如何分析单个 npm 包对体积的贡献？
- 分包异步化适合什么场景？

**相关题目**：
- [FB-45-PE-A-004 小程序分包加载](#FB-45-PE-A-004)
- [FB-45-EN-R-002 小程序工程化与 Monorepo](#FB-45-EN-R-002)

**参考资源**：
- [微信小程序官方文档 - 包大小优化](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)

**口头回答版**：
> 微信小程序主包不能超过 2MB，所有包加起来 20MB。优化手段很多：代码上做 Tree Shaking、压缩、按需引入；图片压缩、转 WebP、上 CDN；架构上按业务分包，公共组件和工具放主包；还可以用分包异步化。分析体积可以用开发者工具的代码依赖分析，也可以用 Webpack Bundle Analyzer，CI 里加个体积门禁，超阈值就阻断合并。主包最好控制在 1.5MB 以内留余量。

---

### FB-45-FS-P-004：小程序自定义组件的 behaviors、relations 和 slot 实现机制是什么？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：45 小程序
**标签**：小程序、组件化、生命周期、数据绑定
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入分析小程序自定义组件中的 behaviors、relations 和 slot 机制，说明它们解决了什么问题，以及使用时的注意事项。

**参考答案**：

一、behaviors：

`behaviors` 是小程序的代码复用机制，类似于 Vue 的 mixin 或 React 的高阶组件。它可以把一组 properties、data、methods、生命周期注入到多个组件中。

示例：

```javascript
// behaviors/share.js
module.exports = Behavior({
  properties: {
    sharedProp: {
      type: String,
      value: 'default',
    },
  },
  data: {
    sharedData: 0,
  },
  methods: {
    sharedMethod() {
      console.log('来自 behavior');
    },
  },
  attached() {
    console.log('behavior attached');
  },
});
```

```javascript
// components/my-comp/my-comp.js
const shareBehavior = require('../../behaviors/share');

Component({
  behaviors: [shareBehavior],
  methods: {
    onTap() {
      this.sharedMethod();
    },
  },
});
```

注意事项：
- 同名字段以组件自身为准，可用 `behaviorPriority` 控制优先级。
- 多个 behavior 有同名字段时会覆盖或合并。
- 适合抽离公共逻辑，但不宜滥用，避免来源不清晰。

二、relations：

`relations` 用于建立组件之间的父子/兄弟关系，常用于表单、列表、树形组件等场景。

示例：

```javascript
// components/radio-group/radio-group.js
Component({
  relations: {
    '../radio/radio': {
      type: 'child',
      linked(target) {
        this.children = this.children || [];
        this.children.push(target);
      },
      unlinked(target) {
        this.children = this.children.filter(c => c !== target);
      },
    },
  },
  methods: {
    changeSelect(selected) {
      this.children.forEach(child => {
        child.setData({ checked: child.data.value === selected });
      });
    },
  },
});
```

```javascript
// components/radio/radio.js
Component({
  relations: {
    '../radio-group/radio-group': {
      type: 'parent',
      linked(target) {
        this.parent = target;
      },
    },
  },
  methods: {
    onTap() {
      this.parent.changeSelect(this.data.value);
    },
  },
});
```

三、slot：

小程序 slot 类似 Vue 插槽，支持默认插槽和命名插槽（基础库 2.1.0+）。

```xml
<!-- components/card/card.wxml -->
<view class="card">
  <view class="header">
    <slot name="header"></slot>
  </view>
  <view class="body">
    <slot></slot>
  </view>
</view>
```

```xml
<!-- page.wxml -->
<card>
  <view slot="header">标题</view>
  <view>内容区域</view>
</card>
```

注意：
- slot 中传入的节点会渲染在组件的 Shadow Tree 中。
- 可通过 `slot` 实现内容分发和布局复用。
- 作用域插槽小程序支持有限，复杂场景建议用 properties 传递数据。

**评分维度**：
- 能说明 behaviors 的复用机制和注意事项（30%）
- 能说明 relations 的父子关系建立和应用场景（30%）
- 能说明 slot 的内容分发机制（30%）
- 能指出 Shadow Tree 对这些机制的影响（10%）

**常见错误**：
- behaviors 中定义与组件同名字段导致覆盖困惑。
- relations 中没有处理 unlinked，导致组件卸载后状态残留。
- 在 slot 里使用复杂作用域导致数据流混乱。

**延伸追问**：
- behaviors 和 Vue mixin 有什么异同？
- relations 能否跨多层嵌套使用？

**相关题目**：
- [FB-45-CO-B-006 小程序自定义组件](#FB-45-CO-B-006)
- [FB-45-CO-A-006 自定义组件间通信](#FB-45-CO-A-006)

**参考资源**：
- [微信小程序官方文档 - behaviors](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html)
- [微信小程序官方文档 - relations](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/relations.html)
- [微信小程序官方文档 - slot](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6-slot)

**口头回答版**：
> behaviors 是小程序的代码复用机制，像 mixin，可以把 properties、data、methods、生命周期注入多个组件，但要注意字段覆盖。relations 用来建立组件之间的父子关系，比如 radio-group 和 radio，父组件通过 type child 收集子组件，子组件通过 type parent 找到父组件，适合表单、树形组件。slot 就是插槽，支持默认插槽和命名插槽，可以在组件里留位置让外部填内容。这些机制都和 Shadow Tree 有关，要注意组件树和页面树的组合关系。

---

### FB-45-FS-P-005：小程序的同层渲染原理是什么？解决了什么问题？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：45 小程序
**标签**：小程序、容器、架构、组件化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释小程序中"同层渲染"的概念、原理，以及它解决了什么问题。并举例说明哪些组件需要同层渲染。

**参考答案**：

小程序渲染层运行在 WebView 中，普通组件通过 HTML 节点渲染。但部分组件（如 `video`、`map`、`canvas`、`camera`）如果也用 HTML 实现，性能和体验会受限，因此平台用原生视图直接渲染这些组件。

传统覆盖模式的问题：
- 原生组件默认覆盖在 WebView 之上，层级最高。
- 无法被普通 WXML 元素覆盖（如弹窗、遮罩层失效）。
- 滚动时原生组件不会跟随 WebView 内容一起移动。

同层渲染原理：

```text
1. WebView 渲染普通 WXML 节点
2. 遇到原生组件标签时，在 WebView 中预留一个占位区域
3. 客户端在占位区域对应位置插入原生视图
4. 原生视图与 WebView 内容处于同一层级
5. 普通 WXML 元素可以覆盖原生组件，滚动时原生组件跟随移动
```

同层渲染的优势：
- 原生组件可以像普通组件一样被覆盖和定位。
- 支持 CSS 动画、transform、overflow 等部分样式。
- 解决了覆盖层级和滚动跟随问题。

典型需要同层渲染的组件：

| 组件 | 原因 |
|------|------|
| video | 视频解码和播放性能 |
| map | 地图渲染需要原生 SDK |
| canvas 2d | 高性能绘图 |
| camera | 调用系统相机 |
| live-player / live-pusher | 直播推拉流 |

注意事项：
- 同层渲染需要基础库版本支持，低版本会降级为覆盖模式。
- 部分 CSS 属性在同层渲染下仍有限制。
- 原生组件的层级关系仍需用 `cover-view` / `cover-image` 做兼容兜底。

最佳实践：
- 使用原生组件前检测基础库版本，必要时提示升级。
- 弹窗覆盖 video 时优先使用同层渲染，低版本用 cover-view。
- 避免在原生组件上叠加过多复杂交互。

**评分维度**：
- 能解释同层渲染解决原生组件覆盖层级问题（30%）
- 能说明同层渲染的占位 + 原生视图插入原理（40%）
- 能列举典型同层渲染组件和兼容注意事项（30%）

**常见错误**：
- 认为所有组件都是同层渲染。
- 在低版本基础库上依赖同层渲染效果。
- 忽略 cover-view 的兼容兜底。

**延伸追问**：
- 同层渲染和 cover-view 有什么区别？
- 为什么 canvas 传统 API 和同层渲染 API 有差异？

**相关题目**：
- [FB-45-CO-A-001 小程序的双线程模型](#FB-45-CO-A-001)
- [FB-45-FS-P-001 小程序 Exparser 和虚拟 DOM](#FB-45-FS-P-001)

**参考资源**：
- [微信小程序官方文档 - 原生组件说明](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)
- [微信小程序官方文档 - 同层渲染](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html#%E5%90%8C%E5%B1%82%E6%B8%B2%E6%9F%93)

**口头回答版**：
> 小程序里 video、map、canvas 这些是原生组件，直接由客户端渲染，性能更好。早期它们是覆盖在 WebView 上面的，层级最高，普通元素盖不住，滚动还不跟随。同层渲染就是在 WebView 里给原生组件留个占位，然后把原生视图插到同一层，这样普通元素就能盖住它，滚动也能跟随。但同层渲染要基础库支持，低版本会降级，所以覆盖原生组件时还要准备 cover-view 兜底。

---

### FB-45-PE-P-006：小程序 SSR、预渲染和骨架屏的实践方案是什么？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：45 小程序
**标签**：小程序、性能优化、生命周期、数据绑定
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请分析小程序中 SSR、预渲染和骨架屏三种首屏优化方案的原理、适用场景和实现方式，并说明它们的局限性。

**参考答案**：

小程序首屏优化方案对比：

| 方案 | 原理 | 优点 | 局限性 |
|------|------|------|--------|
| 骨架屏 | 用占位 UI 模拟真实页面结构 | 实现简单，体验好 | 无真实数据，需配合接口请求 |
| 预渲染 | 构建时生成页面静态快照 | 首屏快，SEO 友好 | 动态内容无法预渲染 |
| SSR | 服务端实时渲染页面数据 | 首屏有真实数据 | 服务端成本高，小程序 SSR 生态弱 |

一、骨架屏：

最常用的小程序首屏优化方案。在数据返回前展示灰色占位块，减少白屏焦虑。

实现方式：
- 手动编写骨架屏 WXML / WXSS。
- 使用构建插件自动生成骨架屏代码。
- 首页数据加载完成前显示 skeleton，加载完成后切换真实内容。

二、预渲染：

在构建阶段针对部分页面生成静态 HTML 或 JSON 数据快照，启动时直接渲染。

小程序预渲染实践：
- 把不常变的页面数据（如分类、配置）打包进主包或分包。
- 首页 onLoad 时先读本地静态数据渲染，再异步刷新。
- 结合 CDN 预渲染页面 JSON，启动时直接 setData。

三、SSR（服务端渲染）：

传统 SSR 在小程序中应用较少，因为小程序本身运行在客户端离线包中。但可以通过以下方式模拟 SSR 效果：

- 服务端提前组装首屏数据，接口一次性返回完整渲染数据。
- 使用云函数或 BFF 层做首屏数据聚合。
- 把首屏数据通过 URL 参数或 storage 预置到小程序中。

混合方案示例：

```javascript
Page({
  data: {
    pageReady: false,
    homeData: null,
  },
  async onLoad() {
    // 1. 先展示骨架屏
    // 2. 尝试读取本地缓存数据
    const cached = wx.getStorageSync('home_data');
    if (cached) {
      this.setData({ homeData: cached, pageReady: true });
    }
    // 3. 请求最新数据
    const fresh = await fetchHomeData();
    this.setData({ homeData: fresh, pageReady: true });
    wx.setStorageSync('home_data', fresh);
  },
});
```

最佳实践：
- 骨架屏适合所有需要接口请求的页面。
- 预渲染适合内容变化不频繁的展示型页面。
- SSR 适合服务端能力强、对首屏 SEO 有要求的场景（如百度小程序）。
- 三者可以组合使用：骨架屏 + 缓存/预渲染 + 接口刷新。

**评分维度**：
- 能对比骨架屏、预渲染、SSR 的原理和适用场景（40%）
- 能说明小程序 SSR 的特殊性和实现思路（30%）
- 能给出混合方案和代码示例（30%）

**常见错误**：
- 把所有页面都做成 SSR，忽略小程序离线包特性。
- 骨架屏和真实页面结构差异大，切换时闪烁明显。
- 预渲染数据过期没有及时刷新。

**延伸追问**：
- 百度小程序的搜索收录和 SSR 有什么关系？
- 骨架屏如何自动生成？有哪些工具？

**相关题目**：
- [FB-45-PE-P-002 小程序启动与白屏优化](#FB-45-PE-P-002)
- [FB-45-SC-R-004 小程序 SEO 与搜索优化](#FB-45-SC-R-004)

**参考资源**：
- [微信小程序官方文档 - 骨架屏](https://developers.weixin.qq.com/miniprogram/dev/framework/view/skeleton.html)

**口头回答版**：
> 小程序首屏优化常用三种方案。骨架屏最简单，数据没回来前先显示占位块，减少白屏感。预渲染是构建时生成静态快照，启动直接渲染，适合内容不常变的页面。SSR 在小程序里用得少，因为小程序是离线包跑在客户端，但可以让服务端把首屏数据拼好一次性返回，或者用云函数聚合。实际项目中我一般是骨架屏加本地缓存，接口回来再刷新，三者可以组合用。

---

### FB-45-SC-P-007：小程序全局状态管理有哪些方案？如何选择？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：45 小程序
**标签**：小程序、数据绑定、组件化、架构
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请分析小程序中常见的全局状态管理方案，包括 App.globalData、storage、EventBus、MobX、Redux、自研 Store 等，并说明各自的适用场景和选型建议。

**参考答案**：

小程序全局状态管理方案对比：

| 方案 | 特点 | 适用场景 |
|------|------|----------|
| App.globalData | 简单全局对象，页面通过 getApp() 访问 | 少量共享状态，如用户信息 |
| wx.storage | 本地持久化存储 | 缓存数据、用户偏好 |
| EventBus | 发布订阅模式 | 简单跨页面事件通知 |
| MobX | 响应式状态管理，自动触发视图更新 | 中大型项目 |
| Redux / Zustand |  predictable 状态流 | 复杂状态、需要调试工具 |
| 自研 Store | 完全可控，轻量 | 对包体积敏感、有定制需求 |

一、App.globalData：

```javascript
// app.js
App({
  globalData: {
    userInfo: null,
  },
});

// page.js
const app = getApp();
Page({
  onLoad() {
    console.log(app.globalData.userInfo);
  },
});
```

优点：简单，无需引入库。
缺点：非响应式，修改后不会自动更新页面；数据在内存中，重启丢失。

二、EventBus：

```javascript
// utils/eventBus.js
class EventBus {
  constructor() {
    this.events = {};
  }
  on(name, cb) {
    (this.events[name] || (this.events[name] = [])).push(cb);
  }
  emit(name, data) {
    (this.events[name] || []).forEach(cb => cb(data));
  }
}
export default new EventBus();
```

优点：轻量，适合跨页面事件。
缺点：事件来源难以追踪，容易内存泄漏。

三、MobX：

小程序官方推荐的响应式状态管理库，通过 observable 自动触发 setData。

```javascript
// store.js
import { observable, action } from 'mobx-miniprogram';

export const store = observable({
  count: 0,
  add: action(function() {
    this.count++;
  }),
});
```

优点：响应式，开发体验接近 Vue / React。
缺点：引入额外依赖，增加包体积。

选型建议：
- 简单项目：App.globalData + storage 缓存。
- 中等项目：MobX 或自研 Store。
- 大型项目：MobX / Redux + 自研中间件 + 模块化。
- 对包体积极度敏感：自研轻量 Store。

最佳实践：
- 状态尽量按领域模块拆分。
- 持久化状态与内存状态分离。
- 页面卸载时取消订阅，避免内存泄漏。

**评分维度**：
- 能列举至少 4 种状态管理方案（30%）
- 能对比各自优缺点和适用场景（40%）
- 能给出选型建议和代码示例（30%）

**常见错误**：
- 所有状态都放 globalData，导致数据流混乱。
- EventBus 不取消订阅，造成内存泄漏。
- 在小型项目中引入重型状态库。

**延伸追问**：
- 如何实现 Store 的持久化和恢复？
- 多分包之间如何共享状态？

**相关题目**：
- [FB-45-CO-A-006 自定义组件间通信](#FB-45-CO-A-006)
- [FB-45-SD-R-001 跨端小程序框架设计](#FB-45-SD-R-001)

**参考资源**：
- [微信小程序官方文档 - 全局状态管理](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html)
- [mobx-miniprogram 文档](https://github.com/wechat-miniprogram/mobx-miniprogram)

**口头回答版**：
> 小程序状态管理方案有好几种：简单场景用 App.globalData，修改后不会自动更新视图；缓存用 wx.storage；跨页面通知可以用 EventBus，但要注意取消订阅；中大型项目推荐 MobX，响应式，自动触发 setData；更复杂可以用 Redux 或自研 Store。我一般小项目 globalData 加 storage，中大项目用 MobX。状态要按模块拆分，页面卸载记得取消订阅。

---
## 架构题（7 道）{#architect}

### FB-45-SD-R-001：如何设计一个跨端小程序框架（如 Taro / UniApp 的思路）？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：45 小程序
**标签**：小程序、架构、组件化、工程化
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
如果你要设计一个跨端小程序框架，让开发者用一套代码同时产出微信、支付宝、抖音、百度等多个平台的小程序，你会如何设计整体架构、编译流程和运行时适配层？

**参考答案**：

跨端小程序框架的核心目标是用统一的开发范式（通常是 React / Vue 语法）编译或运行出多个平台的小程序产物。典型代表有 Taro（以 React 语法为主）和 UniApp（以 Vue 语法为主）。

整体架构分层：

```text
+---------------------------+
|       开发者源码           |
|  React / Vue 组件 + 业务逻辑 |
+---------------------------+
|       编译时层             |
|  AST 解析、模板转译、组件映射  |
+---------------------------+
|       运行时层             |
|  组件适配、API 适配、路由适配  |
+---------------------------+
|       目标平台             |
|  微信 / 支付宝 / 抖音 / 百度  |
+---------------------------+
```

一、编译时层：

1. **AST 解析**：
   - 用 Babel / SWC 解析 JSX / Vue SFC。
   - 把 JSX 编译为目标平台的 WXML / AXML / TTML。

2. **模板转译**：
   - 把 `div` 映射为 `view`，`span` 映射为 `text`。
   - 处理事件绑定：`onClick` -> `bindtap`。
   - 处理条件渲染：`v-if` / JSX 条件表达式 -> `wx:if`。

3. **样式处理**：
   - CSS 转 WXSS / ACSS，处理 rpx、选择器兼容。

4. **代码拆分**：
   - 按平台配置生成 pages、subPackages、usingComponents。

二、运行时层：

1. **API 适配**：
   - 统一封装 `request`、`navigateTo`、`getStorage` 等。
   - 运行时判断平台，调用对应 `wx` / `my` / `tt` / `swan`。

```javascript
// 运行时适配示例
const api = {
  request(options) {
    if (typeof wx !== 'undefined') return wx.request(options);
    if (typeof my !== 'undefined') return my.request(options);
    // ...
  },
};
```

2. **组件适配**：
   - 统一组件接口，平台差异用 props 或 slot 兜底。
   - 对不支持的组件提供降级方案或警告。

3. **生命周期适配**：
   - 把 React / Vue 生命周期映射到小程序页面和组件生命周期。

4. **状态与事件**：
   - 实现跨平台的 setData、事件系统、ref 访问。

三、平台差异处理：

| 差异类型 | 处理方式 |
|----------|----------|
| 组件差异 | 条件编译 + 运行时组件映射 |
| API 差异 | 运行时 polyfill + 能力检测 |
| 样式差异 | 编译时转换 + 平台后缀文件 |
| 生命周期差异 | 运行时封装统一生命周期 |
| 包体积限制 | 按平台分包、Tree Shaking |

最佳实践：
- 优先用标准 API 和组件，平台特有功能通过条件编译隔离。
- 建立平台能力矩阵，明确各平台支持度。
- 运行时适配层保持轻量，复杂转换放编译时。
- 提供良好的调试工具和错误提示。

**评分维度**：
- 能画出编译时 + 运行时两层架构（30%）
- 能说明 AST 转译、组件映射、API 适配核心机制（40%）
- 能提出平台差异处理策略和最佳实践（30%）

**常见错误**：
- 认为跨端框架能 100% 抹平平台差异。
- 把所有适配逻辑都放在运行时，导致包体积过大。
- 忽略编译时错误提示和调试体验。

**延伸追问**：
- Taro 3 的编译时和运行时和 Taro 1/2 有什么区别？
- 如何处理某个平台独有的组件或 API？

**相关题目**：
- [FB-45-CO-A-003 各平台小程序架构对比](#FB-45-CO-A-003)
- [FB-45-SD-R-007 多平台小程序容器架构](#FB-45-SD-R-007)

**参考资源**：
- [Taro 官方文档](https://docs.taro.zone/)
- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)

**口头回答版**：
> 设计跨端小程序框架主要分两层：编译时和运行时。编译时用 AST 把 React 或 Vue 代码转成各平台的 WXML/AXML 这些模板，组件做映射，比如 div 转 view。运行时做 API 适配，统一封装 request、navigateTo 这些，运行时再判断是 wx、my、tt 还是 swan。平台差异用条件编译加运行时 polyfill 处理。要注意不是所有差异都能抹平，特有 API 要单独处理，复杂转换尽量放编译时，保持运行时轻量。

---

### FB-45-EN-R-002：小程序团队的工程化建设和 Monorepo 多包管理方案是什么？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：45 小程序
**标签**：小程序、工程化、Monorepo、组件化
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套适合中大型小程序团队的工程化方案，包括目录结构、组件库管理、构建流程、CI/CD、Monorepo 组织方式，以及多环境发布策略。

**参考答案**：

中大型小程序团队工程化需要解决代码复用、多人协作、版本管理、多环境发布等问题。Monorepo 是常用组织方式。

一、Monorepo 目录结构：

```text
mini-program-monorepo/
├── apps/
│   ├── main-app/            # 主小程序
│   ├── activity-app/        # 活动小程序
│   └── vendor-app/          # 商家端小程序
├── packages/
│   ├── ui-components/       # 组件库
│   ├── utils/               # 工具函数
│   ├── api-sdk/             # 接口 SDK
│   ├── auth/                # 登录鉴权
│   └── eslint-config/       # 共享 ESLint 配置
├── scripts/
│   └── build.js             # 构建脚本
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

二、包管理工具：
- pnpm workspace：节省磁盘空间，依赖关系清晰。
- Turborepo / Nx：任务调度、缓存、并行构建。
- Changesets：版本管理和 CHANGELOG 生成。

三、构建流程：

```text
1. lint / type-check
2. 组件库 / SDK 构建
3. 各小程序编译（微信 / 支付宝 / 抖音）
4. 包体积检测
5. 上传体验版 / 提交审核
```

四、CI/CD 流程：

```yaml
# .github/workflows/build.yml
name: Mini Program CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm build
      - run: pnpm size-limit
      - run: pnpm upload:preview --app=main-app
```

五、多环境发布策略：

| 环境 | 用途 | 发布方式 |
|------|------|----------|
| 开发环境 | 本地调试 | 开发者工具真机预览 |
| 测试环境 | QA 测试 | 上传体验版，扫码体验 |
| 预发布 | 灰度验证 | 分阶段放量、白名单 |
| 生产环境 | 全量用户 | 提交平台审核后发布 |

六、组件库管理：
- 组件库单独发包到私有 npm 或 workspace 引用。
- 提供示例小程序和文档站点。
- 使用 Storybook 或自研小程序组件文档工具。

最佳实践：
- 统一编码规范：ESLint、Prettier、commitlint。
- 组件库和 SDK 独立版本号，避免一个改动全量发布。
- 建立包体积门禁和性能基线。
- 关键流程自动化：上传体验版、收集测试二维码。

**评分维度**：
- 能设计 Monorepo 目录结构（30%）
- 能说明构建、CI/CD、多环境发布流程（40%）
- 能提出组件库管理和版本控制策略（30%）

**常见错误**：
- 所有小程序和组件都放在一个仓库但没有任何 workspace 管理。
- 组件库版本混乱，导致各小程序依赖不一致。
- 忽略多环境配置，生产测试混用。

**延伸追问**：
- 如何处理多个小程序之间的公共依赖版本冲突？
- 小程序自动化测试有哪些方案？

**相关题目**：
- [FB-45-PE-P-003 小程序包体积优化](#FB-45-PE-P-003)
- [FB-45-SD-R-003 小程序监控埋点与灰度](#FB-45-SD-R-003)

**参考资源**：
- [Turborepo 官方文档](https://turbo.build/repo)
- [pnpm workspace 文档](https://pnpm.io/workspaces)

**口头回答版**：
> 中大型小程序团队我建议用 Monorepo，把 apps 和 packages 分开。apps 放各个小程序，packages 放组件库、工具、SDK。用 pnpm workspace 管理依赖，Turborepo 做任务调度和缓存。CI 流程里做 lint、类型检查、构建、包体积检测，然后自动上传体验版。多环境分开发、测试、预发布、生产。组件库独立发包、独立版本，避免一改全量发布。还要加包体积门禁和性能基线。

---

### FB-45-SD-R-003：如何构建小程序的监控、埋点与灰度发布体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：45 小程序
**标签**：小程序、监控、埋点、灰度、架构
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套小程序的监控、埋点与灰度发布体系，包括技术架构、数据采集方案、核心指标、告警机制和灰度策略。

**参考答案**：

一、监控体系：

监控分层：

| 层级 | 监控内容 | 采集方式 |
|------|----------|----------|
| 性能监控 | 启动耗时、首屏时间、setData 耗时、包体积 | 小程序 Performance API、自定义打点 |
| 错误监控 | JS 异常、API 失败、渲染异常 | try/catch、wx.onError、接口拦截 |
| 业务监控 | 转化率、漏斗、关键路径 | 埋点 SDK |
| 可用性监控 | 页面白屏、接口可用性 | 心跳探测、用户反馈 |

性能监控示例：

```javascript
// utils/perf.js
function reportPerformance(metric, value) {
  wx.request({
    url: '/log/perf',
    method: 'POST',
    data: { metric, value, page: getCurrentPageRoute(), timestamp: Date.now() },
  });
}

Page({
  onReady() {
    const now = Date.now();
    reportPerformance('page_ready', now - this.startTime);
  },
});
```

二、埋点体系：

埋点类型：
- 代码埋点：精确，但侵入性强。
- 可视化埋点：运营可配置，适合活动页。
- 全埋点：自动采集点击、页面浏览，数据量大。

埋点 SDK 设计：

```text
1. 事件采集：page view、click、exposure
2. 本地缓存：达到一定条数或时间窗口后批量上报
3. 数据压缩：JSON 序列化，必要时压缩
4. 失败重试：网络失败时落盘，下次启动补报
5. 去重与采样：避免重复上报，支持采样率配置
```

三、灰度发布：

灰度维度：
- 用户维度：按 userId、openId、设备号分桶。
- 地域维度：按城市、省份逐步放量。
- 版本维度：按小程序版本号灰度。
- 业务维度：按页面、功能开关控制。

灰度架构：

```text
1. 配置中心维护灰度规则和功能开关
2. 小程序启动时拉取配置
3. 根据用户特征计算是否命中实验
4. 命中则启用新逻辑 / 新页面 / 新接口
5. 监控灰度组和对照组的核心指标差异
```

功能开关示例：

```javascript
// services/config.js
async function getFeatureFlags() {
  const config = await fetch('/api/config');
  return config.featureFlags;
}

// page.js
Page({
  async onLoad() {
    const flags = await getFeatureFlags();
    if (flags.newHomepage) {
      this.setData({ useNewHomepage: true });
    }
  },
});
```

四、告警机制：
- 核心指标超过阈值时触发告警（如错误率 > 1%、首屏时间 > 3s）。
- 告警分级：P0 电话、P1 企业微信、P2 邮件。
- 告警收敛：同类型告警聚合，避免轰炸。

最佳实践：
- 埋点数据格式统一，便于分析。
- 性能数据定期 review，建立性能基线。
- 灰度发布要有回滚预案和监控对照组。
- 遵守隐私合规，不上报敏感用户信息。

**评分维度**：
- 能设计性能、错误、业务、可用性四层监控（30%）
- 能说明埋点 SDK 的核心模块（30%）
- 能设计灰度策略和功能开关机制（40%）

**常见错误**：
- 埋点上报过于频繁，影响性能。
- 灰度没有对照组，无法判断效果。
- 监控只关注错误，忽略性能和业务指标。

**延伸追问**：
- 如何保证埋点数据的准确性和完整性？
- 小程序崩溃和 JS 错误如何区分和采集？

**相关题目**：
- [FB-45-EN-R-002 小程序工程化与 Monorepo](#FB-45-EN-R-002)
- [FB-45-SC-R-005 小程序留存与分享裂变](#FB-45-SC-R-005)

**参考资源**：
- [微信小程序官方文档 - 性能监控](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/report.html)

**口头回答版**：
> 小程序监控体系我分四层：性能监控启动耗时、首屏时间、setData 耗时；错误监控 JS 异常和接口失败；业务监控转化漏斗；可用性监控白屏。埋点有代码埋点、可视化埋点和全埋点，SDK 要做本地缓存、批量上报、失败重试和采样。灰度发布靠配置中心和功能开关，可以按用户、地域、版本分桶，灰度组和对照组对比核心指标。还要有告警和回滚预案，注意隐私合规。

---

### FB-45-SC-R-004：小程序 SEO / 搜索优化和内容索引方案如何设计？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：45 小程序
**标签**：小程序、SEO、架构、生命周期
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计小程序的 SEO 和搜索优化方案，包括 sitemap 配置、页面内容可被搜索索引、关键词优化、内容预渲染，以及百度小程序和微信小程序的差异。

**参考答案**：

小程序 SEO 的目标是让平台搜索引擎能够抓取、理解并索引小程序页面，从而在自然搜索、信息流推荐中获得流量。

一、基础配置：

1. **sitemap.json**：
   - 告诉搜索引擎哪些页面可以索引。
   - 配置索引规则和优先级。

```json
{
  "desc": "关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html",
  "rules": [
    {
      "action": "allow",
      "page": "*"
    },
    {
      "action": "disallow",
      "page": "pages/secret/*"
    }
  ]
}
```

2. **页面标题和描述**：
   - 每个页面配置清晰的 `navigationBarTitleText`。
   - 页面内容包含核心关键词。

二、内容可索引化：

1. **页面参数语义化**：
   - URL 参数使用有意义的字段名，如 `?id=123&keyword=手机`。
   - 避免纯哈希或加密参数。

2. **结构化数据**：
   - 使用 JSON-LD 或平台定义的结构化数据标记页面内容。
   - 便于搜索引擎理解商品、文章、视频等实体。

3. **内容预渲染**：
   - 对文章、商品详情等页面，服务端提前渲染内容数据。
   - 搜索引擎抓取时返回完整 HTML 或结构化数据。

三、关键词与内容优化：
- 标题、摘要、正文围绕核心关键词展开。
- 保持内容原创、更新频繁。
- 图片加 alt 描述，视频加标题和标签。

四、百度小程序 vs 微信小程序：

| 维度 | 百度小程序 | 微信小程序 |
|------|-----------|-----------|
| 搜索入口 | 百度搜索、信息流 | 微信搜一搜、发现 |
| SEO 权重 | 非常高，天然搜索基因 | 社交属性强，搜索权重相对较低 |
| 内容收录 | 支持页面 URL 直接收录 | 依赖 sitemap 和页面质量 |
| SSR 需求 | 强，建议服务端直出 | 相对弱，可用骨架屏 + 缓存 |

五、数据监控：
- 监控收录量、搜索曝光量、点击率。
- 分析热搜词，调整内容策略。
- A/B 测试标题和摘要，提升点击率。

最佳实践：
- 重点页面优先配置 sitemap。
- 内容页 URL 稳定，避免频繁变化。
- 服务端渲染或预渲染关键内容。
- 定期提交页面到平台搜索资源平台。

**评分维度**：
- 能说明 sitemap 和页面基础配置（25%）
- 能设计内容可索引化和结构化数据方案（35%）
- 能对比百度和微信小程序 SEO 差异（25%）
- 能提出数据监控和优化策略（15%）

**常见错误**：
- 所有页面都 allow，导致低质量页面被索引。
- URL 参数无意义，搜索引擎无法识别内容。
- 忽略百度小程序的 SSR 优势。

**延伸追问**：
- 如何让搜索引擎抓取小程序中的动态内容？
- 小程序页面 URL 和 H5 URL 如何统一做 SEO？

**相关题目**：
- [FB-45-PE-P-006 小程序 SSR 与骨架屏](#FB-45-PE-P-006)
- [FB-45-SD-R-003 小程序监控埋点与灰度](#FB-45-SD-R-003)

**参考资源**：
- [微信小程序官方文档 - sitemap](https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html)
- [百度智能小程序 - 搜索优化](https://smartprogram.baidu.com/docs/operations/)

**口头回答版**：
> 小程序 SEO 首先要配 sitemap.json，告诉搜索引擎哪些页面可以索引。页面标题要清晰，URL 参数要有意义，比如 ?id=123&keyword=手机，别用加密参数。内容页最好做预渲染或 SSR，方便搜索引擎抓取。还要加结构化数据标记商品、文章这些实体。百度小程序搜索权重更高，更建议服务端直出；微信小程序社交属性强，搜索权重相对低一些。最后要监控收录量、曝光、点击，定期优化标题和内容。

---

### FB-45-SC-R-005：如何设计小程序的用户留存、分享裂变和运营增长方案？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：45 小程序
**标签**：小程序、留存、架构、数据绑定
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请从技术和产品结合的角度，设计一套小程序用户留存、分享裂变和运营增长方案，包括触达渠道、数据指标、技术实现和风控策略。

**参考答案**：

一、留存策略：

1. **消息触达**：
   - 订阅消息：用户授权后可在服务场景下发。
   - 公众号关联：通过公众号模板消息或图文触达。
   - 服务通知：订单状态、物流提醒等。

2. **首页个性化**：
   - 根据用户历史行为推荐内容。
   - 本地缓存用户偏好，减少二次进入加载时间。

3. **会员与积分体系**：
   - 签到、积分、等级、优惠券。
   - 把用户资产数据同步到 storage 和服务端。

二、分享裂变：

1. **分享能力**：
   - `onShareAppMessage` 自定义分享卡片。
   - 分享参数带用户邀请码或商品 ID。

```javascript
Page({
  onShareAppMessage() {
    return {
      title: '邀请你领取新人礼包',
      path: '/pages/index/index?inviter=USER123',
      imageUrl: '/images/share.png',
    };
  },
});
```

2. **裂变玩法**：
   - 拼团、砍价、助力、邀请返利。
   - 分享后解锁内容或优惠券。

3. **短链与二维码**：
   - 生成带参数二维码，便于线下投放。
   - URL Scheme 支持外部跳转回小程序。

三、运营增长技术架构：

```text
1. 数据采集：埋点 SDK 采集用户行为
2. 用户画像：标签体系、分群、RFM 模型
3. 增长实验：A/B 测试、功能开关
4. 触达引擎：订阅消息、PUSH、短信、公众号
5. 效果分析：漏斗、留存、LTV、CAC
```

四、核心数据指标：

| 指标 | 含义 |
|------|------|
| DAU / MAU | 日活 / 月活 |
| 次日留存 / 7 日留存 | 用户回访比例 |
| 分享率 | 分享用户数 / 总用户数 |
| 裂变系数 K | 每个用户带来新用户数 |
| 转化率 | 关键行为转化比例 |
| LTV / CAC | 用户终身价值 / 获客成本 |

五、风控策略：
- 邀请关系反作弊：检测同一设备、同一 IP、异常时间集中的邀请。
- 分享内容审核：避免诱导分享、虚假宣传。
- 频率限制：限制单个用户分享和助力次数。
- 数据对账：奖励发放与业务数据核对。

最佳实践：
- 留存和增长要基于数据，避免拍脑袋做活动。
- 分享卡片要突出利益点，提高点击率。
- 用户路径要短，减少转化流失。
- 合规使用平台能力，避免被封禁。

**评分维度**：
- 能设计留存触达和分享裂变玩法（30%）
- 能画出增长技术架构（30%）
- 能提出核心指标和风控策略（40%）

**常见错误**：
- 只关注拉新，不关注留存和转化。
- 分享参数不带追踪标识，无法归因。
- 裂变活动没有反作弊，被羊毛党薅垮。

**延伸追问**：
- 订阅消息触达率下降如何应对？
- 如何衡量一次裂变活动的真实 ROI？

**相关题目**：
- [FB-45-SD-R-003 小程序监控埋点与灰度](#FB-45-SD-R-003)
- [FB-45-SE-R-006 小程序安全架构](#FB-45-SE-R-006)

**参考资源**：
- [微信小程序官方文档 - 订阅消息](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html)
- [微信小程序官方文档 - 转发](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html)

**口头回答版**：
> 小程序留存主要靠消息触达，比如订阅消息、公众号关联，再加上首页个性化、会员积分体系。分享裂变用 onShareAppMessage 自定义分享卡片，带上邀请参数，做拼团、砍价、助力这些玩法。技术架构上要有埋点采集、用户画像、增长实验、触达引擎和效果分析。核心指标看 DAU、留存、分享率、裂变系数、转化率。风控要做好反作弊、内容审核和频率限制，别让羊毛党薅垮了。

---

### FB-45-SE-R-006：小程序安全架构应考虑哪些方面？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：45 小程序
**标签**：小程序、安全、权限、架构
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请从数据安全、接口安全、代码安全、运行安全、合规安全等维度，设计小程序的整体安全架构。

**参考答案**：

小程序安全架构需要从客户端、服务端、通信链路和平台合规四个层面考虑。

一、数据安全：

1. **敏感数据加密**：
   - 本地 storage 中 token、用户信息加密存储。
   - 敏感字段传输使用 HTTPS + 业务层加密。

2. **密钥管理**：
   - AppSecret、API Key 不能写在前端。
   - 使用服务端代理或 KMS 管理密钥。

3. **隐私合规**：
   - 获取用户信息前展示隐私协议。
   - 仅采集业务必需的字段，遵循最小必要原则。

二、接口安全：

1. **身份鉴权**：
   - 每次请求携带 token，服务端校验签名和有效期。
   - 登录态失效后引导重新登录。

2. **防重放与防篡改**：
   - 请求加时间戳、nonce、签名。
   - 关键接口做幂等处理。

3. **频率限制**：
   - 登录、验证码、助力等接口限制调用频率。
   - 防止暴力破解和薅羊毛。

三、代码安全：

1. **代码混淆**：
   - 小程序代码可被反编译，需做 JS 混淆和压缩。
   - 关键逻辑放到服务端。

2. **反调试**：
   - 检测开发者工具、模拟器环境。
   - 敏感页面增加风控校验。

3. **安全扫描**：
   - 平台上传代码时会做安全检测。
   - CI 中集成静态安全扫描。

四、运行安全：

1. **输入校验**：
   - 前端做基础校验，服务端做最终校验。
   - 防止 XSS、SQL 注入等攻击。

2. **跳转安全**：
   - 外部链接使用 web-view 白名单。
   - 避免被钓鱼页面劫持。

3. **支付安全**：
   - 支付签名在服务端生成，前端只负责调起。
   - 支付结果以服务端回调为准。

五、合规安全：
- 小程序隐私保护指引配置。
- 用户授权明确告知用途。
- 未成年人保护、内容审核。

安全架构示意：

```text
+------------------+
|    小程序客户端   |
|  加密存储 / 输入校验 |
+------------------+
         | HTTPS + 签名
+------------------+
|     API 网关      |
|  鉴权 / 限流 / WAF |
+------------------+
         |
+------------------+
|     业务服务      |
|  敏感逻辑 / 数据加密 |
+------------------+
```

**评分维度**：
- 能从数据、接口、代码、运行、合规五个维度展开（40%）
- 能说明登录鉴权、签名、限流等关键机制（30%）
- 能给出安全架构图和代码示例（30%）

**常见错误**：
- 把 AppSecret 或支付密钥写在前端。
- 只依赖前端校验，忽略服务端校验。
- 认为小程序代码不可被反编译。

**延伸追问**：
- 如何防止小程序被反编译后泄露业务逻辑？
- 小程序登录凭证 code 被截获有什么风险？

**相关题目**：
- [FB-45-CO-B-008 小程序登录流程](#FB-45-CO-B-008)
- [FB-45-SE-A-007 小程序权限管理](#FB-45-SE-A-007)

**参考资源**：
- [微信小程序官方文档 - 安全](https://developers.weixin.qq.com/miniprogram/dev/framework/security.html)

**口头回答版**：
> 小程序安全要从五个维度考虑：数据安全上敏感信息加密存储，AppSecret 不能放前端；接口安全上做 token 鉴权、请求签名、防重放、频率限制；代码安全上做 JS 混淆，关键逻辑放服务端；运行安全上做输入校验、跳转白名单、支付签名服务端生成；合规安全上配隐私协议、最小必要采集。前端校验只是第一道防线，最终一定要服务端校验。小程序代码是可以被反编译的，所以核心逻辑不要放前端。

---

### FB-45-SD-R-007：如何设计一个多平台小程序容器架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：45 小程序
**标签**：小程序、容器、架构、组件化
**出现频率**：低频
**预计回答时长**：15-30 分钟

**题目描述**：
假设你要在一个超级 App 中设计一个小程序容器，支持运行多种小程序（类似微信、支付宝的宿主能力），请说明整体架构、运行时设计、安全沙箱、能力扩展和性能隔离方案。

**参考答案**：

多平台小程序容器是超级 App 运行第三方小程序的基础能力，需要兼顾安全、性能、扩展性和开发体验。

一、整体架构：

```text
+-----------------------------+
|         宿主 App             |
|  账号 / 支付 / 推送 / 原生能力  |
+-----------------------------+
|        小程序容器            |
|  包管理 / 运行时 / JSBridge   |
+-----------------------------+
|      沙箱隔离层              |
|  进程隔离 / 权限控制 / 资源限制 |
+-----------------------------+
|    渲染引擎 + JS 引擎         |
|  WebView / 原生视图 / JSCore   |
+-----------------------------+
|        小程序应用            |
|  WXML / WXSS / JS / JSON      |
+-----------------------------+
```

二、核心模块：

1. **包管理器**：
   - 下载、校验、解压、缓存小程序包。
   - 版本管理、增量更新、灰度下发。

2. **运行时**：
   - 页面栈管理、路由调度。
   - 组件系统（类似 Exparser）。
   - 生命周期管理。

3. **JSBridge**：
   - 统一 API 网关，连接 JS 与宿主能力。
   - 权限校验、调用频率限制、版本兼容。

4. **渲染引擎**：
   - WebView 负责普通组件渲染。
   - 原生组件同层渲染。
   - 可选自研渲染引擎替代 WebView。

三、安全沙箱：

| 层面 | 方案 |
|------|------|
| 进程隔离 | 小程序运行在独立进程，崩溃不影响主 App |
| 文件隔离 | 每个小程序有独立存储空间，不能访问其他小程序 |
| 网络隔离 | 域名白名单、请求签名、HTTPS 强制 |
| 能力隔离 | API 按权限分级，敏感能力需用户授权 |
| 代码隔离 | JS 运行在独立 JSCore，不能直接访问 DOM |

四、能力扩展：

1. **插件化**：
   - 宿主提供基础插件，小程序按需引入。
   - 第三方开发者可注册自定义能力。

2. **JSBridge 扩展**：
   - 定义标准扩展协议。
   - 新能力通过注册表动态注入。

3. **组件市场**：
   - 提供审核后的公共组件库。
   - 版本管理和安全扫描。

五、性能隔离：

- 每个小程序分配内存上限、CPU 使用限制。
- 后台小程序暂停执行，释放资源。
- 长时间未使用的小程序包可清理。
- 异常小程序可快速降级或关闭。

六、监控与治理：

- 运行时性能监控：启动耗时、内存、CPU。
- 异常监控：崩溃、JS 错误、API 违规调用。
- 内容安全：图片、文字、视频审核。
- 开发者信用体系：根据历史表现分配资源和权限。

**评分维度**：
- 能画出容器整体架构（30%）
- 能说明包管理、运行时、JSBridge、渲染引擎职责（30%）
- 能设计安全沙箱和性能隔离方案（40%）

**常见错误**：
- 认为容器就是简单套一个 WebView。
- 忽略进程隔离和文件隔离的重要性。
- 能力扩展没有权限审核机制。

**延伸追问**：
- 小程序容器和 Flutter、RN 容器有什么异同？
- 如何实现小程序之间的数据隔离和通信？

**相关题目**：
- [FB-45-CO-A-001 小程序的双线程模型](#FB-45-CO-A-001)
- [FB-45-SD-R-001 跨端小程序框架设计](#FB-45-SD-R-001)

**参考资源**：
- [微信小程序官方文档 - 小程序框架](https://developers.weixin.qq.com/miniprogram/dev/framework/MINA.html)

**口头回答版**：
> 多平台小程序容器核心要分几层：最下面是小程序应用包，上面有渲染引擎和 JS 引擎，再上是小程序运行时负责页面栈、组件、生命周期，然后是 JSBridge 连接宿主能力，最外面是宿主 App。安全上要做进程隔离、文件隔离、网络白名单、能力分级授权。性能上要限制每个小程序的内存和 CPU，后台暂停，长时间不用清理。能力扩展通过插件化和 JSBridge 注册表实现，还要有监控、异常处理和内容审核。

