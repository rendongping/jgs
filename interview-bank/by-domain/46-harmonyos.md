# 鸿蒙 ArkTS / HarmonyOS 面试题

> 本题库共收录 **31** 道面试题（基础 8 / 进阶 8 / 深入 8 / 架构 7）。
> 本文件收录鸿蒙（HarmonyOS）前端开发相关面试题，目标题量 80 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、框架原理题、性能优化题、工程化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-46-CO-B-001：HarmonyOS 的系统架构是怎样的？它相比传统移动操作系统有哪些核心特性？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：HarmonyOS、系统架构、分布式、微内核、全场景
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请简述 HarmonyOS 的整体系统架构，并说明它相比 Android / iOS 等传统移动操作系统的核心特性。

**参考答案**：

HarmonyOS 采用“1+8+N”全场景战略，系统架构自上而下大致分为四层：

1. **应用层（Applications）**：系统应用、第三方应用、原子化服务（Atomic Service）、卡片（Form/Widget）。
2. **应用框架层（Application Framework）**：Ability 框架、ArkUI、用户程序框架、多模输入等。
3. **系统服务层（System Service）**：分布式任务调度、图形、多媒体、安全、AI、资源管理等。
4. **内核层（Kernel）**：支持多内核设计，包括鸿蒙微内核（HarmonyOS Microkernel）、Linux 内核、LiteOS 等，按设备能力弹性选择。

相比 Android / iOS 的核心特性：

| 维度 | HarmonyOS | Android / iOS |
|------|-----------|---------------|
| 内核 | 多内核、微内核能力 | Linux / BSD |
| 应用形态 | 应用 + 原子化服务 + 卡片 | 以传统应用为主 |
| 跨设备 | 分布式软总线，多设备协同原生支持 | 依赖云端或蓝牙/Wi-Fi 手动配对 |
| 开发语言 | ArkTS、C/C++、JavaScript | Kotlin/Java、Swift/Obj-C |
| UI 范式 | ArkUI 声明式 | 命令式为主 |
| 一次开发 | 多端部署（手机、平板、车机、穿戴、IoT） | 需单独适配 |

最佳实践：
- 面向 HarmonyOS 开发时应优先拥抱声明式 ArkUI 与 Stage 模型。
- 设计 UI 时要考虑多端一致性，使用响应式布局与栅格系统。

**评分维度**：
- 能说出四层架构或关键分层（30%）
- 能对比分布式、原子化服务、多内核等核心特性（40%）
- 能说明一次开发多端部署的优势（30%）

**常见错误**：
- 把 HarmonyOS 简单等同于“安卓换皮”。
- 只讲手机开发，忽略 IoT / 车机 / 穿戴等多设备场景。
- 混淆 OpenHarmony 与 HarmonyOS（商用版）。

**延伸追问**：
- OpenHarmony 和 HarmonyOS 有什么关系和区别？
- 微内核和宏内核在安全性、性能上的取舍是什么？

**相关题目**：
- [FB-46-CO-B-005 Stage 模型与 FA 模型的区别](#FB-46-CO-B-005)
- [FB-46-SD-R-026 鸿蒙应用从 0 到 1 技术选型](#FB-46-SD-R-026)

**参考资源**：
- [HarmonyOS 开发者文档 - 系统架构](https://developer.harmonyos.com/)
- [OpenHarmony 项目](https://www.openharmony.cn/)

**口头回答版**：
> HarmonyOS 架构从上到下分应用层、应用框架层、系统服务层和内核层。它最大的特点是全场景分布式，手机、平板、车机、手表、IoT 设备能原生协同；应用形态除了传统 App，还有原子化服务和卡片；开发上主推 ArkTS + ArkUI 声明式 UI，一次开发可以部署到多端。它和安卓、iOS 最大的区别就是分布式软总线和多设备协同是系统级能力，而不是靠应用自己实现。

---

### FB-46-CO-B-002：ArkTS 是什么？它与 TypeScript 有什么关系和区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：ArkTS、TypeScript、鸿蒙、静态类型、声明式 UI
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 ArkTS 的定位，并说明它与 TypeScript 的关系和主要区别。

**参考答案**：

ArkTS 是 HarmonyOS 主推的应用开发语言，由华为基于 TypeScript 扩展而来，专为声明式 UI 和状态管理做了增强，并与 ArkUI 框架深度集成。

关系：
- ArkTS 是 TypeScript 的超集（Superset），保留了 TS 的类型系统、接口、泛型等能力。
- 在 ArkTS 中可以使用绝大部分 TypeScript 语法，但为了保证高性能与确定性，**强制使用静态类型**，并裁剪了部分动态特性。

主要区别：

| 维度 | TypeScript | ArkTS |
|------|------------|-------|
| 类型约束 | 可选静态类型 | 强制静态类型 |
| 动态特性 | 支持 `any`、动态属性访问 | 限制 `any`，限制动态属性 |
| 运行环境 | 浏览器 / Node.js | ArkCompiler / 鸿蒙运行态 |
| UI 绑定 | 依赖 React / Vue 等框架 | 原生支持 ArkUI 声明式与状态装饰器 |
| 并发模型 | 依赖事件循环 / Worker | 支持 TaskPool / Worker / Sendable |
| 编译器 | tsc / babel 等 | ArkCompiler 静态编译 AOT |

典型限制：
- 避免使用 `any`，应使用显式类型或联合类型。
- 对象属性应在声明时确定，避免运行时动态增删。
- 箭头函数和普通函数在装饰器状态绑定中需注意 `this` 指向。

最佳实践：
- 为所有变量、函数参数、返回值显式声明类型。
- 使用 `interface` 或 `class` 描述业务模型。
- 状态变量必须结合 ArkTS 装饰器（如 `@State`）使用。

**评分维度**：
- 能说明 ArkTS 基于 TypeScript 扩展（30%）
- 能说出强制静态类型、AOT 编译、与 ArkUI 集成等差异（40%）
- 能指出开发时应避免 `any`、动态属性等限制（30%）

**常见错误**：
- 认为 ArkTS 与 TypeScript 完全等价。
- 写 ArkTS 时大量使用 `any`，导致编译告警或运行时异常。
- 把浏览器 / Node.js 的运行时习惯照搬到 ArkTS。

**延伸追问**：
- ArkTS 的状态装饰器和普通 TypeScript 类属性有什么区别？
- 为什么 ArkTS 要限制动态属性访问？

**相关题目**：
- [FB-46-CO-A-012 ArkTS 状态装饰器](#FB-46-CO-A-012)
- [FB-46-FS-P-017 ArkUI 渲染原理](#FB-46-FS-P-017)

**参考资源**：
- [HarmonyOS 开发者文档 - ArkTS 语言](https://developer.harmonyos.com/)

**口头回答版**：
> ArkTS 是华为基于 TypeScript 扩展出来的鸿蒙应用开发语言，它是 TS 的超集，但做了针对鸿蒙的增强。最大的区别是 ArkTS 强制静态类型，限制了 any 和动态属性访问，保证能被 ArkCompiler 静态编译和高效运行。同时它原生支持 ArkUI 的声明式 UI 和状态装饰器，写 UI 非常像 SwiftUI 或 Flutter。

---

### FB-46-CO-B-003：什么是 Ability？HarmonyOS 中的 Ability 有哪些分类？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：Ability、UIAbility、ExtensionAbility、HarmonyOS、生命周期
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 HarmonyOS 中 Ability 的概念，并列举主要的 Ability 类型及其作用。

**参考答案**：

Ability 是 HarmonyOS 应用的基本组成单元，表示应用能够对外提供的一种能力。每个 Ability 对应一个独立的功能入口，可以拥有自己的生命周期的实例。

主要分类：

| Ability 类型 | 作用 | 典型场景 |
|-------------|------|---------|
| **UIAbility** | 包含用户界面的 Ability | 页面、主入口 |
| **ExtensionAbility** | 无界面的扩展能力基类 | 服务、后台扩展 |
| **ServiceExtensionAbility** | 后台运行服务 | 音乐播放、定位、下载 |
| **FormExtensionAbility** | 提供卡片服务 | 桌面卡片、负一屏卡片 |
| **DataShareExtensionAbility** | 数据共享 | 跨应用数据读写 |
| **InputMethodExtensionAbility** | 输入法 | 自定义输入法 |
| **BackupExtensionAbility** | 备份恢复 | 应用数据备份 |

核心概念：
- **UIAbility**：类似 Android 的 Activity，承载界面，有 `onCreate`、`onForeground`、`onBackground`、`onDestroy` 等生命周期。
- **ExtensionAbility**：通常没有独立界面，运行在后台，为系统或其他应用提供能力。
- 一个应用可以包含多个 Ability，通过 `module.json5` 中的 `abilities` 数组声明。

示例 `module.json5` 片段：

```json
{
  "module": {
    "abilities": [
      {
        "name": "EntryAbility",
        "srcEntry": "./ets/entryability/EntryAbility.ets",
        "description": "$string:EntryAbility_desc",
        "icon": "$media:icon",
        "label": "$string:EntryAbility_label",
        "startWindowIcon": "$media:icon",
        "startWindowBackground": "$color:start_window_background"
      }
    ]
  }
}
```

最佳实践：
- 界面能力使用 UIAbility，后台服务使用 ServiceExtensionAbility。
- 不要把所有功能都塞进 UIAbility，按能力拆分 Ability 有助于多设备协同。

**评分维度**：
- 能解释 Ability 是应用能力单元（30%）
- 能列举 UIAbility、ServiceExtensionAbility、FormExtensionAbility 等（40%）
- 能在 module.json5 中识别 Ability 配置（30%）

**常见错误**：
- 把 Ability 等同于 Android 的 Activity 或 Service，忽略其“能力”抽象。
- 混淆 UIAbility 和 ExtensionAbility 的使用场景。
- 在 UIAbility 中执行长时间后台任务。

**延伸追问**：
- UIAbility 的生命周期和页面的生命周期有什么关系？
- 多个 Ability 之间如何跳转和传参？

**相关题目**：
- [FB-46-CO-B-006 鸿蒙应用生命周期](#FB-46-CO-B-006)
- [FB-46-CO-A-011 卡片服务 FormExtensionAbility](#FB-46-CO-A-011)

**参考资源**：
- [HarmonyOS 开发者文档 - Ability](https://developer.harmonyos.com/)

**口头回答版**：
> Ability 是鸿蒙应用的基本能力单元，每个 Ability 代表一个功能入口。最常见的是 UIAbility，带界面的，类似安卓的 Activity；还有 ExtensionAbility 系列，比如 ServiceExtensionAbility 做后台服务、FormExtensionAbility 做桌面卡片、DataShareExtensionAbility 做数据共享。它们都在 module.json5 里声明。

---

### FB-46-CO-B-004：什么是 ArkUI？它的声明式 UI 有什么特点？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：ArkUI、声明式 UI、ArkTS、组件、状态驱动
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请介绍 ArkUI 是什么，并说明 HarmonyOS 声明式 UI 的开发方式与传统命令式 UI 的区别。

**参考答案**：

ArkUI 是 HarmonyOS 提供的声明式 UI 开发框架，开发者使用 ArkTS（或 JS）描述界面“应该长什么样”，由框架负责把状态映射到视图，自动完成创建、更新、销毁。

声明式 UI 与命令式 UI 对比：

| 维度 | 命令式 UI（Android / iOS 传统） | 声明式 UI（ArkUI / SwiftUI / Flutter） |
|------|-------------------------------|--------------------------------------|
| 开发方式 | 手动创建、更新、销毁视图 | 描述状态与视图的映射关系 |
| 状态变更 | 手动 findViewById 修改 | 状态驱动自动刷新 |
| 代码组织 | 代码与视图分离 | UI 结构即代码 |
| 可读性 | 需要阅读多处才能理解界面 | 结构清晰，所见即所得 |
| 跨设备适配 | 需要多套布局 | 响应式声明式布局更自然 |

ArkUI 基础示例：

```ets
@Entry
@Component
struct Index {
  @State message: string = 'Hello HarmonyOS';

  build() {
    Column({ space: 12 }) {
      Text(this.message)
        .fontSize(24)
        .fontColor(Color.Blue);

      Button('点击切换')
        .onClick(() => {
          this.message = 'Hello ArkUI';
        });
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center);
  }
}
```

核心概念：
- `@Entry`：页面入口装饰器，标记可被路由跳转的页面。
- `@Component`：自定义组件装饰器。
- `build()`：构建 UI 的方法。
- `@State`：组件内部状态，变化会自动触发 UI 刷新。

最佳实践：
- 用状态驱动 UI，避免直接操作组件实例。
- 合理拆分 `@Component`，提高复用性和可维护性。
- 复杂布局使用 `Row`、`Column`、`Flex`、`Grid`、`List` 等容器。

**评分维度**：
- 能解释 ArkUI 是声明式 UI 框架（30%）
- 能对比声明式与命令式 UI 的区别（40%）
- 能写出基础 ArkUI 组件结构（30%）

**常见错误**：
- 在 ArkUI 中通过 `findComponentById` 手动改 UI。
- `build()` 中写复杂业务逻辑。
- 忽略 `@State` 等装饰器，导致状态变化不刷新。

**延伸追问**：
- 声明式 UI 的性能优势在哪里？
- ArkUI 的状态更新机制是怎样的？

**相关题目**：
- [FB-46-CO-A-012 ArkTS 状态装饰器](#FB-46-CO-A-012)
- [FB-46-FS-P-017 ArkUI 渲染原理](#FB-46-FS-P-017)

**参考资源**：
- [HarmonyOS 开发者文档 - ArkUI](https://developer.harmonyos.com/)

**口头回答版**：
> ArkUI 是鸿蒙的声明式 UI 开发框架。声明式 UI 就是你只描述界面“应该长什么样”，状态变了框架自动帮你刷新，不用像传统安卓那样手动 findViewById 去改。写法和 Flutter、SwiftUI 很像，用 @Entry 表示页面入口，@Component 表示自定义组件，build 方法里用 Column、Text、Button 这些组件拼界面，状态用 @State 管理。

---

### FB-46-CO-B-005：Stage 模型与 FA 模型有什么区别？为什么推荐 Stage 模型？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：Stage 模型、FA 模型、Ability、HarmonyOS、生命周期
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 HarmonyOS 中的 Stage 模型与 FA 模型，并说明为什么现在推荐 Stage 模型。

**参考答案**：

Stage 模型和 FA（Feature Ability）模型是 HarmonyOS 不同时期的应用模型：

| 维度 | FA 模型 | Stage 模型 |
|------|---------|-----------|
| 设计目标 | 早期兼容传统应用 | 面向全场景分布式 |
| Ability | PageAbility / ServiceAbility / DataAbility | UIAbility / ExtensionAbility |
| 生命周期 | 较为简单，依赖 AMS | 更完整，支持前后台、多实例 |
| 进程模型 | 多 Ability 可能共享进程 | 更清晰，UIAbility 与 ExtensionAbility 分离 |
| 存储 | 私有文件、数据库分散 | 统一的应用级 Context |
| 并发 | 较弱 | 支持 TaskPool、Worker、Sendable |
| 官方推荐 | 已停止演进，不推荐使用 | 当前主推 |

为什么推荐 Stage 模型：
- **面向分布式**：Stage 模型为跨设备流转、接续（Continuation）原生设计。
- **生命周期更完善**：能更好管理应用在前台、后台、销毁等状态。
- **内存和功耗更优**：进程与 Ability 职责清晰，后台能力受限，降低功耗。
- **工程结构统一**：`AbilityStage` 作为 Ability 的舞台，统一管理生命周期。

关键类：
- `AbilityStage`：Ability 的舞台，每个 HAP 有一个 `EntryAbilityStage` 或自定义 AbilityStage。
- `UIAbility`：Stage 模型中的界面能力，继承自 `Ability`。
- `WindowStage`：管理窗口生命周期，与 UIAbility 关联。

代码示例：自定义 AbilityStage

```ets
import { AbilityStage, Want } from '@kit.AbilityKit';

export default class EntryAbilityStage extends AbilityStage {
  onCreate(): void {
    console.info('EntryAbilityStage onCreate');
  }

  onAcceptWant(want: Want): string {
    return 'EntryAbilityStage';
  }
}
```

最佳实践：
- 新项目全部使用 Stage 模型。
- 存量 FA 项目应按官方迁移指南升级到 Stage 模型。

**评分维度**：
- 能说明 FA 模型与 Stage 模型的核心差异（40%）
- 能解释 Stage 模型面向分布式和全场景的优势（30%）
- 能指出 AbilityStage、UIAbility、WindowStage 等关键概念（30%）

**常见错误**：
- 认为 FA 模型和 Stage 模型可以随意混用。
- 把 PageAbility 与 UIAbility 简单等同。
- 忽略 AbilityStage 在生命周期管理中的作用。

**延伸追问**：
- AbilityStage 的生命周期在什么时机触发？
- Stage 模型下如何管理应用级全局状态？

**相关题目**：
- [FB-46-CO-B-003 什么是 Ability](#FB-46-CO-B-003)
- [FB-46-CO-B-006 鸿蒙应用生命周期](#FB-46-CO-B-006)

**参考资源**：
- [HarmonyOS 开发者文档 - Stage 模型](https://developer.harmonyos.com/)

**口头回答版**：
> FA 模型是鸿蒙早期的应用模型，类似 PageAbility、ServiceAbility；Stage 模型是现在主推的，面向全场景分布式。Stage 模型用 UIAbility 承载界面，用 ExtensionAbility 做后台扩展，还有一个 AbilityStage 统一管生命周期。推荐 Stage 模型是因为它生命周期更完善、更适合跨设备流转、内存和功耗管理也更好。新项目都应该用 Stage 模型。

---

### FB-46-CO-B-006：请简述鸿蒙应用（UIAbility）的生命周期。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：UIAbility、生命周期、Stage 模型、前台、后台
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请描述 HarmonyOS Stage 模型下 UIAbility 的主要生命周期回调，并说明每个阶段适合做什么。

**参考答案**：

UIAbility 生命周期主要回调：

| 回调 | 触发时机 | 适合做的事 |
|------|---------|-----------|
| `onCreate()` | Ability 创建时 | 初始化资源、恢复状态 |
| `onWindowStageCreate()` | 窗口舞台创建时 | 设置主页面 `windowStage.loadContent()` |
| `onForeground()` | 进入前台时 | 恢复动画、刷新数据、注册传感器等 |
| `onBackground()` | 退到后台时 | 暂停播放、保存临时状态、释放前台资源 |
| `onWindowStageDestroy()` | 窗口舞台销毁时 | 释放 UI 相关资源 |
| `onDestroy()` | Ability 销毁时 | 释放全部资源、取消订阅、停止服务 |

生命周期流转：

```text
onCreate
  ↓
onWindowStageCreate → loadContent 设置主页面
  ↓
onForeground ←→ onBackground
  ↓
onWindowStageDestroy
  ↓
onDestroy
```

示例代码：

```ets
import { UIAbility, Want, AbilityConstant } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    console.info('EntryAbility onCreate');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    console.info('EntryAbility onWindowStageCreate');
    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        console.error('loadContent failed');
        return;
      }
      console.info('loadContent success');
    });
  }

  onForeground(): void {
    console.info('EntryAbility onForeground');
  }

  onBackground(): void {
    console.info('EntryAbility onBackground');
  }

  onWindowStageDestroy(): void {
    console.info('EntryAbility onWindowStageDestroy');
  }

  onDestroy(): void {
    console.info('EntryAbility onDestroy');
  }
}
```

最佳实践：
- 在 `onCreate` 初始化，在 `onForeground` 恢复，在 `onBackground` 暂停。
- 不要在 `onCreate` 中做耗时操作，避免启动慢。
- `onWindowStageCreate` 中必须调用 `loadContent` 加载主页面。

**评分维度**：
- 能按顺序说出主要生命周期回调（40%）
- 能说明每个回调适合做什么（40%）
- 能在代码中指出 loadContent 的位置（20%）

**常见错误**：
- 把 `onCreate` 当成页面显示时机，在里面对 DOM 做操作。
- 混淆 `onBackground` 和 `onDestroy`，未正确释放资源。
- 在生命周期中执行耗时同步操作。

**延伸追问**：
- UIAbility 生命周期和 Page 页面生命周期有什么关系？
- 后台 Ability 被系统回收时如何保存状态？

**相关题目**：
- [FB-46-CO-B-003 什么是 Ability](#FB-46-CO-B-003)
- [FB-46-CO-B-005 Stage 模型与 FA 模型](#FB-46-CO-B-005)

**参考资源**：
- [HarmonyOS 开发者文档 - UIAbility 生命周期](https://developer.harmonyos.com/)

**口头回答版**：
> UIAbility 的生命周期主要有 onCreate、onWindowStageCreate、onForeground、onBackground、onWindowStageDestroy、onDestroy。onCreate 初始化，onWindowStageCreate 里要 loadContent 加载主页面，onForeground 是到前台，onBackground 是到后台，onDestroy 是销毁。适合在 onForeground 恢复数据、在 onBackground 暂停播放或保存临时状态。

---

### FB-46-CO-B-007：鸿蒙应用的包结构是怎样的？HAP、HSP、HAR 分别是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：HAP、HSP、HAR、包结构、模块化、HarmonyOS
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 HarmonyOS 应用的包结构，以及 HAP、HSP、HAR 三种包类型的区别和用途。

**参考答案**：

HarmonyOS 应用包结构：

```text
App Pack (.app)
  └── entry.hap          # 主模块，必须存在
  └── feature.hap        # 特性模块，可选
  └── library.hsp        # 动态共享模块，可选（HSP）
  └── resources.index    # 资源索引
```

| 包类型 | 全称 | 用途 | 是否独立运行 |
|--------|------|------|-------------|
| **HAP** | HarmonyOS Ability Package | 应用主模块或特性模块 | 可独立运行（Entry HAP） |
| **HSP** | Harmony Shared Package | 动态共享包，多个 HAP 共享 | 不可独立运行 |
| **HAR** | Harmony Archive | 静态共享包，编译时打包进 HAP | 不可独立运行 |

详细说明：
- **Entry HAP**：应用入口，每个应用至少有一个，可独立安装运行。
- **Feature HAP**：应用特性模块，按需动态下载（类似 Android App Bundle 的 dynamic feature）。
- **HSP**：运行时可以共享的模块，适合多个 HAP 复用同一份代码和资源，减少包体积。
- **HAR**：静态库，编译期合并到引用方 HAP 中，适合组件库、工具库封装。

工程结构示例：

```text
MyApplication
├── entry/                 # Entry HAP
│   ├── src/main/ets/
│   ├── src/main/resources/
│   └── module.json5
├── feature_cart/          # Feature HAP
│   └── ...
├── library_common/        # HAR 静态共享包
│   └── ...
└── build-profile.json5
```

配置文件：
- `module.json5`：声明 HAP 的 Ability、权限、依赖等。
- `build-profile.json5`：模块编译配置，可声明 HSP/HAR 依赖。

最佳实践：
- 公共 UI 组件、工具函数封装为 HAR。
- 多个 HAP 共享的代码和资源使用 HSP，避免重复打包。
- 按业务拆分 Feature HAP，实现按需下载。

**评分维度**：
- 能区分 HAP、HSP、HAR 的概念（40%）
- 能说明 Entry HAP 与 Feature HAP 的区别（30%）
- 能给出何时使用 HAR、何时使用 HSP 的建议（30%）

**常见错误**：
- 把 HAP 和 APK 完全等同，忽略 Feature HAP 的按需加载。
- 所有公共代码都用 HAR，导致多 HAP 体积膨胀。
- 混淆 HSP 和 HAR 的加载时机。

**延伸追问**：
- Feature HAP 如何实现按需下载？
- HSP 中的资源如何在多个 HAP 间共享？

**相关题目**：
- [FB-46-EN-A-016 鸿蒙工程化与模块化](#FB-46-EN-A-016)
- [FB-46-SD-R-026 鸿蒙应用从 0 到 1 技术选型](#FB-46-SD-R-026)

**参考资源**：
- [HarmonyOS 开发者文档 - 包结构](https://developer.harmonyos.com/)

**口头回答版**：
> 鸿蒙应用最终打包成 .app，里面包含 HAP。HAP 是鸿蒙 Ability 包，Entry HAP 是入口，Feature HAP 是可选特性模块。HSP 是动态共享包，多个 HAP 运行时可以共享；HAR 是静态共享包，编译期打包进 HAP。一般公共组件库用 HAR，多个 HAP 共享的代码用 HSP 来减包体积。

---

### FB-46-CO-B-008：鸿蒙的权限管理有哪些类型？如何声明和申请权限？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：权限管理、ACL、用户授权、module.json5、HarmonyOS
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 HarmonyOS 权限管理的基本类型，并介绍如何在配置文件中声明权限以及如何向用户申请运行时权限。

**参考答案**：

HarmonyOS 权限按授权方式分为三类：

| 类型 | 授权时机 | 典型权限 | 说明 |
|------|---------|---------|------|
| **system_grant** | 安装时自动授予 | 网络访问、Wi-Fi 状态 | 用户无需感知 |
| **user_grant** | 运行时弹窗申请 | 相机、麦克风、位置、通讯录 | 需用户同意 |
| **ACL（Access Control List）** | 特殊能力，需签名/审核 | 读取系统日志、某些系统 API | 需申请对应证书 |

权限声明：
- 在 `module.json5` 的 `requestPermissions` 中声明。

```json
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET",
        "reason": "$string:internet_reason",
        "usedScene": {
          "abilities": ["EntryAbility"],
          "when": "always"
        }
      },
      {
        "name": "ohos.permission.CAMERA",
        "reason": "$string:camera_reason",
        "usedScene": {
          "abilities": ["EntryAbility"],
          "when": "inuse"
        }
      }
    ]
  }
}
```

运行时申请 `user_grant` 权限示例：

```ets
import { abilityAccessCtrl, Permissions } from '@kit.AbilityKit';

async function requestCameraPermission(): Promise<void> {
  const permissions: Permissions[] = ['ohos.permission.CAMERA'];
  const atManager = abilityAccessCtrl.createAtManager();
  const grantStatus = await atManager.requestPermissionsFromUser(getContext(), permissions);
  if (grantStatus.authResults[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
    console.info('Camera permission granted');
  } else {
    console.warn('Camera permission denied');
  }
}
```

最佳实践：
- 只申请业务必需权限，遵循最小权限原则。
- `user_grant` 权限需要在用户触发相关功能时再申请，不要启动时批量弹窗。
- 用户拒绝后应友好引导，不要直接崩溃。

**评分维度**：
- 能区分 system_grant、user_grant、ACL 三类权限（40%）
- 能在 module.json5 中正确声明权限（30%）
- 能写出运行时申请权限的代码（30%）

**常见错误**：
- 只声明权限而不在运行时申请 user_grant 权限。
- 把 user_grant 权限当成 system_grant 使用。
- 用户拒绝后不做兜底处理。

**延伸追问**：
- 用户选择“禁止后不再询问”该如何处理？
- ACL 权限和普通权限在发布审核上有什么区别？

**相关题目**：
- [FB-46-SE-P-021 鸿蒙安全架构与权限治理](#FB-46-SE-P-021)
- [FB-46-SD-R-025 设计一个鸿蒙多端协同应用](#FB-46-SD-R-025)

**参考资源**：
- [HarmonyOS 开发者文档 - 权限管理](https://developer.harmonyos.com/)

**口头回答版**：
> 鸿蒙权限分三类：system_grant 是安装时自动给的，比如网络；user_grant 是运行时弹窗申请的，比如相机、位置、麦克风；ACL 是更高级的系统能力，需要特殊签名或审核。权限要在 module.json5 的 requestPermissions 里声明，user_grant 还要在代码里调用 requestPermissionsFromUser 向用户申请。要遵循最小权限原则，不要一上来就申请一堆权限。

---

## 进阶题（8 道）{#advanced}


### FB-46-CO-A-009：什么是 HarmonyOS 的分布式能力？分布式软总线如何工作？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：分布式、软总线、Distributed、跨设备、HarmonyOS
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 HarmonyOS 的分布式能力，重点说明分布式软总线（Distributed Soft Bus）的作用和工作原理。

**参考答案**：

HarmonyOS 的分布式能力让多个运行鸿蒙系统的设备在逻辑上形成“超级终端”，应用可以跨设备调用硬件、共享数据、迁移任务，而无需关心底层网络细节。

核心分布式能力：

| 能力 | 说明 |
|------|------|
| **分布式软总线** | 设备间自发现、自组网、高速传输的基础通道 |
| **分布式数据管理** | 跨设备数据库、文件、偏好设置共享 |
| **分布式任务调度** | 跨设备启动 Ability、迁移任务 |
| **分布式硬件** | 调用附近设备的相机、屏幕、麦克风、传感器等 |
| **分布式安全** | 设备互信认证、统一身份与权限管理 |

分布式软总线工作原理：

1. **设备发现**：通过蓝牙、Wi-Fi、NFC、有线等协议发现附近鸿蒙设备。
2. **设备认证**：基于华为账号或本地 PIN 码建立信任关系。
3. **自组网**：自动选择最优链路（P2P、WLAN、软总线协议）建立虚拟总线。
4. **透明传输**：上层应用通过统一 API 发送消息、传输数据，软总线负责路由和 QoS。
5. **设备管理**：设备上线、离线、网络切换时自动重连。

开发者使用方式：

```ets
import { distributedDeviceManager } from '@kit.DistributedServiceKit';

// 获取设备管理器实例
const dmInstance = distributedDeviceManager.createDeviceManager('bundleName');

// 获取可信设备列表
const deviceList = dmInstance.getAvailableDeviceListSync();
deviceList.forEach(device => {
  console.info(`deviceId=${device.deviceId}, deviceName=${device.deviceName}`);
});
```

最佳实践：
- 使用 `continuationManager` 做任务迁移。
- 跨设备传输敏感数据时要启用加密。
- 网络状态变化时做好降级处理。

**评分维度**：
- 能解释分布式软总线的自发现、自组网、透明传输（40%）
- 能列举至少 3 项分布式能力（30%）
- 能说明分布式场景下的安全与降级考虑（30%）

**常见错误**：
- 认为分布式能力只是“同一 Wi-Fi 下传文件”。
- 忽略设备认证和权限控制。
- 把分布式等同于简单的 WebSocket / MQTT。

**延伸追问**：
- 跨设备启动 Ability 需要哪些条件和权限？
- 分布式数据同步的冲突如何解决？

**相关题目**：
- [FB-46-CO-P-022 应用状态流转与 Continuation](#FB-46-CO-P-022)
- [FB-46-SD-R-025 设计一个鸿蒙多端协同应用](#FB-46-SD-R-025)

**参考资源**：
- [HarmonyOS 开发者文档 - 分布式能力](https://developer.harmonyos.com/)

**口头回答版**：
> HarmonyOS 的分布式能力让多台鸿蒙设备像一个超级终端一样协同工作。核心是分布式软总线，它负责设备的发现、认证、组网和透明传输，上层应用不需要关心设备之间具体怎么连的。基于软总线可以做跨设备启动 Ability、共享数据、调用其他设备的硬件。对开发者来说，主要是通过 DistributedServiceKit 提供的 API 去发现设备、迁移任务、同步数据。

---

### FB-46-CO-A-010：什么是原子化服务（Atomic Service）？它与传统应用有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：原子化服务、Atomic Service、免安装、卡片、HarmonyOS
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 HarmonyOS 中的原子化服务，并对比它与传统安装型应用的区别、适用场景和开发要点。

**参考答案**：

原子化服务（Atomic Service）是 HarmonyOS 推出的一种轻量级应用形态，用户无需安装即可使用，通过系统入口（如搜索、扫码、碰一碰、卡片）触发，用完即走。

与传统应用对比：

| 维度 | 原子化服务 | 传统应用 |
|------|-----------|---------|
| 安装方式 | 免安装，即用即走 | 需要下载安装 |
| 包形态 | HAP / HSP，体积更小 | 完整 App Pack |
| 入口 | 卡片、搜索、NFC、二维码、分享 | 桌面图标 |
| 生命周期 | 更短，快速启动销毁 | 长驻后台 |
| 能力范围 | 聚焦单一高频场景 | 功能全面 |
| 分发 | 华为应用市场 / 服务中心 | 应用市场为主 |

开发要点：
- 需要在 `module.json5` 中声明 `installationFree: true`。
- 通常以卡片（Form）作为主要入口和交互载体。
- 需要快速完成核心功能，首屏加载要快。
- 支持账号体系打通，可与传统应用共享数据。

配置示例：

```json
{
  "module": {
    "type": "atomicService",
    "installationFree": true,
    "abilities": [
      {
        "name": "EntryAbility",
        "srcEntry": "./ets/entryability/EntryAbility.ets"
      }
    ]
  }
}
```

最佳实践：
- 原子化服务适合订咖啡、查快递、点餐、乘车码等高频短时场景。
- 入口体验要极致，卡片信息要实时准确。
- 复杂流程可引导用户跳转到传统应用。

**评分维度**：
- 能说明原子化服务免安装、即用即走的特点（40%）
- 能对比传统应用在入口、生命周期、体积上的差异（30%）
- 能指出开发配置和适用场景（30%）

**常见错误**：
- 把原子化服务当成“小程序”完全等同，忽略其系统级入口和卡片能力。
- 在原子化服务中堆砌复杂功能。
- 忽略首屏性能对原子化服务的重要性。

**延伸追问**：
- 原子化服务和快应用、微信小程序有什么异同？
- 原子化服务如何实现商业闭环？

**相关题目**：
- [FB-46-CO-A-011 卡片服务 FormExtensionAbility](#FB-46-CO-A-011)
- [FB-46-SD-R-027 鸿蒙卡片与原子化服务架构设计](#FB-46-SD-R-027)

**参考资源**：
- [HarmonyOS 开发者文档 - 原子化服务](https://developer.harmonyos.com/)

**口头回答版**：
> 原子化服务是鸿蒙的一种免安装应用形态，用户不用下载安装，通过卡片、搜索、扫码、碰一碰就能直接打开使用，用完即走。它比传统应用更轻量、入口更多、生命周期更短，适合点餐、乘车码、查快递这种高频短时场景。开发时要在 module.json5 里声明 installationFree: true，通常以卡片作为主要入口。

---

### FB-46-CO-A-011：什么是卡片服务（Form / Widget）？它的生命周期是怎样的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：卡片、Form、Widget、FormExtensionAbility、HarmonyOS
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 HarmonyOS 的卡片服务，说明卡片的主要类型、生命周期以及更新机制。

**参考答案**：

卡片（Form / Widget）是 HarmonyOS 上一种轻量级信息展示和交互单元，可以添加到桌面、负一屏、状态栏等系统入口，用户无需打开应用即可获取信息或执行简单操作。

卡片类型：

| 类型 | 说明 | 典型尺寸 |
|------|------|---------|
| **静态卡片** | 仅展示固定内容，更新频率低 | 1x2、2x2、2x4、4x4 |
| **动态卡片** | 可定时刷新或接收推送更新 | 同上 |
| **JS / ArkTS 卡片** | 使用 ArkTS / JS 编写 UI | 视系统支持 |
| **HTML 卡片** | 早期方案，现已逐步被 ArkTS 卡片替代 | - |

卡片生命周期（FormExtensionAbility）：

| 回调 | 触发时机 |
|------|---------|
| `onAddForm()` | 卡片被添加到桌面时 |
| `onCastToNormalForm()` | 卡片从临时态转为常态 |
| `onUpdateForm()` | 卡片需要更新时 |
| `onFormEvent()` | 卡片触发指定事件时 |
| `onRemoveForm()` | 卡片被移除时 |
| `onAcquireFormState()` | 查询卡片状态 |

卡片更新方式：
- **定时刷新**：在 `form_config.json` 中配置 `updateDuration`。
- **主动更新**：应用侧调用 `updateForm()` 推送数据。
- **事件触发**：点击卡片按钮通过 `callEventNotify` 通知服务。

示例：卡片配置文件 `form_config.json`

```json
{
  "forms": [
    {
      "name": "WeatherCard",
      "displayName": "$string:weather_card",
      "description": "$string:weather_card_desc",
      "src": "./ets/weatherform/pages/WeatherCard.ets",
      "uiSyntax": "arkts",
      "window": {
        "designWidth": 720,
        "autoDesignWidth": true
      },
      "colorMode": "auto",
      "isDefault": true,
      "updateEnabled": true,
      "scheduledUpdateTime": "10:30",
      "updateDuration": 1,
      "defaultDimension": "2*2",
      "supportDimensions": ["2*2", "2*4"]
    }
  ]
}
```

最佳实践：
- 卡片应聚焦关键信息展示，避免复杂交互。
- 合理使用定时刷新，避免频繁唤醒导致功耗问题。
- 卡片 UI 要适配不同尺寸和深色模式。

**评分维度**：
- 能说明卡片的定位和入口（30%）
- 能描述 FormExtensionAbility 生命周期（30%）
- 能说出定时刷新、主动更新、事件触发三种更新方式（40%）

**常见错误**：
- 把卡片当成应用内的一个普通页面。
- 在卡片中做复杂业务逻辑或长时间任务。
- 更新频率设置过高，导致耗电。

**延伸追问**：
- 卡片和原子化服务是什么关系？
- 卡片点击后如何跳转到应用指定页面？

**相关题目**：
- [FB-46-CO-A-010 原子化服务](#FB-46-CO-A-010)
- [FB-46-SD-R-027 鸿蒙卡片与原子化服务架构设计](#FB-46-SD-R-027)

**参考资源**：
- [HarmonyOS 开发者文档 - 卡片开发](https://developer.harmonyos.com/)

**口头回答版**：
> 鸿蒙卡片是一种轻量级的信息展示单元，可以放到桌面、负一屏，不用打开应用就能看到信息。卡片背后由 FormExtensionAbility 管理生命周期，主要有 onAddForm、onUpdateForm、onRemoveForm 这些回调。更新方式有定时刷新、应用主动调用 updateForm、还有卡片事件触发更新。卡片要尽量轻，不要做复杂交互，避免耗电。

---

### FB-46-CO-A-012：ArkTS 中的状态装饰器有哪些？它们之间有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：ArkTS、状态装饰器、@State、@Prop、@Link、@Provide、@Consume
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 ArkTS 中常用的状态装饰器，并说明 `@State`、`@Prop`、`@Link`、`@Provide`、`@Consume` 的区别和使用场景。

**参考答案**：

状态装饰器是 ArkTS / ArkUI 中实现状态驱动 UI 的核心机制，不同装饰器决定数据在组件树中的流动方向、可修改性和通知范围。

常见装饰器对比：

| 装饰器 | 数据方向 | 是否可在子组件修改 | 同步方式 | 作用范围 |
|--------|---------|------------------|---------|---------|
| `@State` | 组件内部 | 是 | 自身状态变化刷新 | 当前组件 |
| `@Prop` | 父 → 子 | 否（单向同步） | 父变子变，子变不影响父 | 父子单向 |
| `@Link` | 父 ↔ 子 | 是（双向同步） | 双向同步 | 父子双向 |
| `@Provide` / `@Consume` | 祖先 ↔ 后代 | 是 | 双向同步 | 跨层级 |
| `@ObjectLink` | 父 → 子 | 是（对象属性） | 观察对象内部属性 | 父子 |
| `@Observed` | 标记类 | - | 使类实例可被深度观察 | 类级别 |
| `@Watch` | 监听 | - | 状态变化时执行回调 | 任意 |

示例：

```ets
@Component
struct Child {
  @Prop title: string;          // 父传子，只读
  @Link count: number;          // 父传子，双向

  build() {
    Column() {
      Text(this.title);
      Button(`count: ${this.count}`)
        .onClick(() => {
          this.count++;         // 双向同步会通知父组件
        });
    }
  }
}

@Entry
@Component
struct Parent {
  @State message: string = 'Hello';
  @State counter: number = 0;

  build() {
    Column() {
      Child({ title: this.message, count: $counter });
      Text(`parent counter: ${this.counter}`);
    }
  }
}
```

注意：
- `@Link` 传参时使用 `$变量名` 语法。
- `@Prop` 只能接受父组件的 `@State`、`@Link`、`@Provide` 等装饰过的变量。
- `@Provide` / `@Consume` 通过 key 匹配，适合主题、语言等跨层级数据。

最佳实践：
- 组件自有状态用 `@State`。
- 父子单向传递用 `@Prop`，双向同步用 `@Link`。
- 跨层级少量全局数据用 `@Provide` / `@Consume`，复杂全局状态用 AppStorage 或状态管理库。

**评分维度**：
- 能区分 @State、@Prop、@Link 的数据方向（40%）
- 能说明 @Provide / @Consume 的跨层级作用（30%）
- 能在代码中正确使用 $counter 等传参语法（30%）

**常见错误**：
- `@Link` 传参时不使用 `$` 语法。
- 在子组件中直接修改 `@Prop`。
- `@State` 修饰复杂对象时未加 `@Observed` / `@ObjectLink`，导致深层属性变化不刷新。

**延伸追问**：
- 如果 @State 修饰的是一个数组，push 元素会刷新吗？
- @ObjectLink 和 @Link 有什么区别？

**相关题目**：
- [FB-46-CO-B-004 ArkUI 声明式 UI](#FB-46-CO-B-004)
- [FB-46-CA-A-013 代码分析：状态绑定](#FB-46-CA-A-013)

**参考资源**：
- [HarmonyOS 开发者文档 - 状态管理](https://developer.harmonyos.com/)

**口头回答版**：
> ArkTS 状态装饰器有 @State、@Prop、@Link、@Provide、@Consume 这些。@State 是组件内部状态；@Prop 是父传子单向同步，子组件不能改；@Link 是双向同步，子组件改了父组件也会变，传参要用 $counter 这种写法；@Provide 和 @Consume 是跨层级的双向同步，适合主题、语言这种。要注意 @Prop 不能在子组件里直接修改。

---

### FB-46-CA-A-013：下面代码中，点击按钮后父组件的 counter 会变化吗？为什么？

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：ArkTS、@Prop、@Link、状态同步、代码分析
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```ets
@Component
struct ChildA {
  @Prop counter: number;

  build() {
    Button(`ChildA: ${this.counter}`)
      .onClick(() => {
        this.counter++;
      });
  }
}

@Component
struct ChildB {
  @Link counter: number;

  build() {
    Button(`ChildB: ${this.counter}`)
      .onClick(() => {
        this.counter++;
      });
  }
}

@Entry
@Component
struct Parent {
  @State counter: number = 0;

  build() {
    Column({ space: 20 }) {
      Text(`Parent counter: ${this.counter}`).fontSize(24);
      ChildA({ counter: this.counter });
      ChildB({ counter: $counter });
    }
    .width('100%')
    .padding(20);
  }
}
```

分别点击 ChildA 和 ChildB 的按钮，父组件的 `counter` 会变化吗？为什么？

**参考答案**：

- **点击 ChildA**：父组件 `counter` **不会**变化。
- **点击 ChildB**：父组件 `counter` **会**变化。

原因：

1. **ChildA 使用 `@Prop`**：`@Prop` 是单向同步，子组件中修改 `counter` 只是修改子组件自己的副本，不会反向同步给父组件。同时 ArkTS 对 `@Prop` 的修改不会触发父组件刷新。
2. **ChildB 使用 `@Link`**：`@Link` 是双向同步，子组件和父组件共享同一个状态引用。子组件中 `this.counter++` 会同步到父组件的 `@State counter`，父组件会重新渲染。

正确的双向同步写法：

```ets
ChildB({ counter: $counter });
```

如果希望 ChildA 也能影响父组件，应改为 `@Link`：

```ets
@Component
struct ChildA {
  @Link counter: number;
  // ...
}

// 父组件
ChildA({ counter: $counter });
```

最佳实践：
- 需要子组件修改父组件数据时，使用 `@Link` 或事件回调。
- 只读展示使用 `@Prop`，避免意外修改。

**评分维度**：
- 正确判断 ChildA 不影响父组件、ChildB 影响父组件（40%）
- 能解释 @Prop 单向同步和 @Link 双向同步的区别（40%）
- 能正确写出 @Link 的传参语法（20%）

**常见错误**：
- 认为 `@Prop` 修改后会同步给父组件。
- `@Link` 传参时不使用 `$counter` 而写成 `this.counter`。
- 在 `@Prop` 修饰的变量上做复杂双向绑定。

**延伸追问**：
- 如果用 `@Prop` 又想通知父组件更新，应该怎么做？
- `@ObjectLink` 在这个场景下能否替代 `@Link`？

**相关题目**：
- [FB-46-CO-A-012 ArkTS 状态装饰器](#FB-46-CO-A-012)
- [FB-46-CD-A-014 手写 ArkTS 自定义组件](#FB-46-CD-A-014)

**参考资源**：
- [HarmonyOS 开发者文档 - @Prop](https://developer.harmonyos.com/)
- [HarmonyOS 开发者文档 - @Link](https://developer.harmonyos.com/)

**口头回答版**：
> 点击 ChildA 父组件不会变，因为 ChildA 用的是 @Prop，单向同步，子组件改的只是自己的副本。点击 ChildB 父组件会变，因为 ChildB 用的是 @Link，双向同步，父子共享同一个状态。双向同步传参时要用 $counter 这种写法。

---

### FB-46-CD-A-014：请手写一个可复用的 ArkTS 自定义按钮组件。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：ArkTS、自定义组件、@Component、@Prop、@Event、复用
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请手写一个可复用的 ArkTS 自定义按钮组件 `PrimaryButton`，支持自定义文案、是否禁用、加载态，并能够向父组件暴露点击事件。

**参考答案**：

```ets
// components/PrimaryButton.ets
@Component
export struct PrimaryButton {
  @Prop text: string;
  @Prop disabled: boolean = false;
  @Prop loading: boolean = false;
  @Prop bgColor: ResourceColor = Color.Blue;
  @Prop textColor: ResourceColor = Color.White;

  // 通过回调向父组件暴露点击事件
  onClick?: () => void;

  build() {
    Button() {
      Row({ space: 8 }) {
        if (this.loading) {
          LoadingProgress()
            .width(16)
            .height(16)
            .color(this.textColor);
        }
        Text(this.text)
          .fontSize(16)
          .fontColor(this.textColor)
          .fontWeight(FontWeight.Medium);
      }
      .justifyContent(FlexAlign.Center);
    }
    .width('100%')
    .height(48)
    .backgroundColor(this.disabled || this.loading ? Color.Gray : this.bgColor)
    .enabled(!(this.disabled || this.loading))
    .borderRadius(8)
    .onClick(() => {
      if (!this.disabled && !this.loading && this.onClick) {
        this.onClick();
      }
    });
  }
}
```

父组件使用：

```ets
import { PrimaryButton } from '../components/PrimaryButton';

@Entry
@Component
struct LoginPage {
  @State isLoading: boolean = false;

  handleLogin(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  build() {
    Column({ space: 20 }) {
      PrimaryButton({
        text: '登录',
        loading: this.isLoading,
        onClick: () => this.handleLogin()
      });

      PrimaryButton({
        text: '禁用状态',
        disabled: true
      });
    }
    .width('100%')
    .padding(20);
  }
}
```

设计要点：
- 使用 `@Prop` 接收外部配置，保证组件无状态或低状态。
- 通过 `onClick` 回调而非直接修改父组件状态，遵循单向数据流。
- `loading` 和 `disabled` 同时影响视觉与可点击状态。
- 组件导出使用 `export struct`，可被其他文件 `import`。

最佳实践：
- 通用组件尽量只接收 props，不依赖外部全局状态。
- 复杂事件可使用 `CustomEvent` 或多参数回调。
- 组件参数提供合理默认值。

**评分维度**：
- 能正确使用 @Component 和 @Prop（30%）
- 能实现禁用、加载态及点击回调（30%）
- 能在父组件中正确使用该组件（20%）
- 代码风格清晰、可复用（20%）

**常见错误**：
- 子组件直接修改 `@Prop` 状态。
- 回调传参不使用箭头函数，导致 `this` 指向错误。
- 组件内部硬编码文案和颜色。

**延伸追问**：
- 如何在自定义组件中暴露更复杂的事件数据？
- 这个组件如果要支持图标前缀，应该怎么扩展？

**相关题目**：
- [FB-46-CO-A-012 ArkTS 状态装饰器](#FB-46-CO-A-012)
- [FB-46-CA-A-013 代码分析：状态绑定](#FB-46-CA-A-013)

**参考资源**：
- [HarmonyOS 开发者文档 - 自定义组件](https://developer.harmonyos.com/)

**口头回答版**：
> 我会写一个 PrimaryButton 组件，用 @Component 声明，@Prop 接收 text、disabled、loading、颜色这些配置。里面放一个 Button，Button 里用 Row 包 LoadingProgress 和 Text。当 loading 或 disabled 时，背景变灰并设置 enabled 为 false。点击通过 onClick 回调给父组件处理。父组件用的时候传 text 和回调就行。这样组件无状态、只接收配置，复用性强。

---

### FB-46-PE-A-015：鸿蒙中如何进行列表渲染？有哪些性能优化手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：List、ListItem、LazyForEach、性能优化、长列表、ArkUI
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 ArkUI 中的列表渲染方式，并说明长列表场景下应如何优化性能。

**参考答案**：

ArkUI 常用列表组件：

| 组件 | 适用场景 |
|------|---------|
| `List` | 垂直 / 水平滚动长列表 |
| `Grid` | 网格布局 |
| `Swiper` | 轮播 |
| `Scroll` + `Column` | 少量静态内容 |

基础列表示例（适合短列表）：

```ets
List({ space: 12 }) {
  ForEach(this.items, (item: ItemModel) => {
    ListItem() {
      Text(item.name).fontSize(16);
    }
  }, (item: ItemModel) => item.id);
}
.width('100%')
.height('100%');
```

长列表优化：使用 `LazyForEach` + `List` 实现懒加载：

```ets
import { BasicDataSource } from '../data/BasicDataSource';

@Entry
@Component
struct LongListPage {
  private dataSource: BasicDataSource = new BasicDataSource();

  aboutToAppear(): void {
    for (let i = 0; i < 1000; i++) {
      this.dataSource.pushData({ id: i, name: `Item ${i}` });
    }
  }

  build() {
    List({ space: 10 }) {
      LazyForEach(this.dataSource, (item: ItemModel) => {
        ListItem() {
          Text(item.name)
            .fontSize(16)
            .height(60);
        }
      }, (item: ItemModel) => item.id.toString());
    }
    .width('100%')
    .height('100%')
    .cachedCount(5);   // 预加载上下各 5 个 item
  }
}
```

性能优化手段：

1. **使用 `LazyForEach` 替代 `ForEach`**：只渲染可视区 item。
2. **提供稳定的 key**：基于业务 ID，避免使用 index。
3. **设置 `cachedCount`**：预加载上下若干 item，平衡流畅度与内存。
4. **固定 item 高度**：减少布局测量开销。
5. **避免复杂嵌套**：减少 `Column` / `Row` 层级。
6. **组件复用**：列表项尽量使用相同结构，利于 ArkUI 复用节点。
7. **图片懒加载与缓存**：`Image` 组件设置 `objectFit`，使用网络图片缓存。
8. **避免在 item 中创建大量 `@State`**：状态越少，刷新范围越小。

最佳实践：
- 数据量超过一屏必须使用 `LazyForEach`。
- 列表项有图片时，优先使用缩略图或占位图。
- 分页加载配合 `onReachEnd` 事件。

**评分维度**：
- 能正确使用 List + LazyForEach（30%）
- 能提供稳定 key 和 cachedCount（30%）
- 能说出至少 4 种长列表优化手段（40%）

**常见错误**：
- 长列表使用 `ForEach` 一次性渲染全部数据。
- 用数组 index 作为 key，导致状态错位。
- item 高度不固定，导致滑动卡顿。

**延伸追问**：
- LazyForEach 的数据源为什么需要实现 IDataSource？
- 列表中嵌套复杂自定义组件时如何减少重绘？

**相关题目**：
- [FB-46-PE-P-018 鸿蒙性能与功耗优化](#FB-46-PE-P-018)
- [FB-46-PE-R-030 鸿蒙应用性能体系建设](#FB-46-PE-R-030)

**参考资源**：
- [HarmonyOS 开发者文档 - 长列表优化](https://developer.harmonyos.com/)

**口头回答版**：
> ArkUI 列表主要用 List 和 ListItem。短列表可以用 ForEach，长列表一定要用 LazyForEach，只渲染可视区。性能优化要点：给 item 提供稳定唯一的 key，不要用 index；设置 cachedCount 预加载；item 高度尽量固定；减少嵌套层级；列表项状态尽量少；图片做懒加载和缓存。这样能保证长列表流畅。

---

### FB-46-EN-A-016：鸿蒙工程化中有哪些模块化方案？如何选择 HAR、HSP、Feature HAP？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：HAR、HSP、Feature HAP、工程化、模块化、Monorepo
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍鸿蒙工程化中 HAR、HSP、Feature HAP 三种模块化方案，并说明各自的选型依据。

**参考答案**：

鸿蒙工程化中的三种模块形态：

| 模块 | 加载方式 | 运行独立性 | 适用场景 |
|------|---------|-----------|---------|
| **HAR** | 编译期静态链接到 HAP | 不可独立运行 | 组件库、工具库、常量配置 |
| **HSP** | 运行期动态共享 | 不可独立运行 | 多 HAP 共享代码/资源 |
| **Feature HAP** | 运行期动态下载安装 | 可独立运行 | 大业务模块、按需下载 |

选型依据：

1. **HAR 静态库**：
   - 通用 UI 组件、工具函数、网络封装、常量定义。
   - 适合被单个或多个 HAP 引用，编译期合并。
   - 缺点是多个 HAP 各自引用同一份 HAR 会重复打包。

2. **HSP 动态共享包**：
   - 多个 HAP 需要共享同一套代码或资源时使用。
   - 运行期只存在一份，减少包体积。
   - 适合公共资源、多 HAP 共享的页面或组件。

3. **Feature HAP**：
   - 大业务模块按功能拆分，用户未使用时无需下载。
   - 可独立运行，有自己的 Ability 和生命周期。
   - 适合电商、金融、游戏等按业务线拆分的大型应用。

工程组织示例：

```text
MyApp
├── entry/                  # Entry HAP（入口）
├── feature_payment/        # Feature HAP（支付模块，按需下载）
├── feature_live/           # Feature HAP（直播模块）
├── library_ui/             # HAR（公共 UI 组件库）
├── library_utils/          # HAR（工具库）
└── shared_common/          # HSP（公共资源）
```

依赖声明示例：

```json
// entry/build-profile.json5
{
  "apiType": "stageMode",
  "buildOption": {},
  "targets": [
    {
      "name": "default",
      "runtimeOS": "HarmonyOS"
    }
  ],
  "entryModules": ["entry"]
}
```

最佳实践：
- 基础工具、UI 组件优先 HAR。
- 多 HAP 共享内容优先 HSP。
- 大业务、低频功能使用 Feature HAP 按需加载。
- 建立统一的模块规范、版本管理和依赖审计。

**评分维度**：
- 能区分 HAR、HSP、Feature HAP 的加载与运行特性（40%）
- 能给出具体选型建议（30%）
- 能说明模块化对包体积和启动速度的影响（30%）

**常见错误**：
- 所有公共代码都用 HAR，导致重复打包。
- 该拆 Feature HAP 的业务还全部塞进 Entry HAP。
- HSP 中引用 HAR 时出现循环依赖。

**延伸追问**：
- HSP 和 HAR 在代码引用上有什么限制？
- Feature HAP 如何被 Entry HAP 动态拉起？

**相关题目**：
- [FB-46-CO-B-007 HAP、HSP、HAR 包结构](#FB-46-CO-B-007)
- [FB-46-SD-R-026 鸿蒙应用从 0 到 1 技术选型](#FB-46-SD-R-026)

**参考资源**：
- [HarmonyOS 开发者文档 - HAR 与 HSP](https://developer.harmonyos.com/)

**口头回答版**：
> 鸿蒙工程化里 HAR 是静态库，编译期打进 HAP，适合 UI 组件、工具库；HSP 是动态共享包，运行期多 HAP 共享，适合公共资源；Feature HAP 是独立功能模块，可以按需下载安装。选型上：基础组件和工具用 HAR，多 HAP 共享内容用 HSP，大业务模块用 Feature HAP。这样能减包体积、加快启动。

---

## 深入题（8 道）{#proficient}


### FB-46-FS-P-017：ArkUI 的渲染原理是什么？状态变化后如何触发 UI 更新？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：ArkUI、渲染原理、状态管理、VDOM、diff、鸿蒙
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入介绍 ArkUI 的渲染原理，包括声明式 UI 如何转换为实际界面、状态变化后框架如何检测并更新 UI。

**参考答案**：

ArkUI 渲染流程：

1. **源码编译**：
   - ArkTS 代码经过 ArkCompiler 进行 AOT 静态编译，生成高效的机器码或字节码。
   - 声明式 UI 语法在编译期被解析为 UI 描述信息。

2. **UI 描述构建**：
   - 运行期执行 `build()` 方法，生成组件树（Component Tree）。
   - 组件树是轻量的 UI 描述，不是直接渲染节点。

3. **渲染树构建**：
   - ArkUI 引擎将组件树转换为渲染树（Render Tree）。
   - 渲染树包含具体的渲染节点（RenderNode），负责布局、绘制、事件分发。

4. **布局与绘制**：
   - 布局阶段：计算每个渲染节点的位置和尺寸。
   - 绘制阶段：将节点绘制到屏幕上，可能使用 GPU 加速。

5. **状态变化与刷新**：
   - 被装饰器（`@State`、`@Prop`、`@Link` 等）修饰的变量会被框架观察。
   - 状态变化时，框架标记相关组件为脏（dirty）。
   - 下一帧渲染时，重新执行 `build()`，生成新的组件树。
   - ArkUI 进行 diff，只更新发生变化的渲染节点，而不是全量重建。

状态观察机制：

| 装饰器 | 观察粒度 |
|--------|---------|
| `@State` | 组件内部状态 |
| `@Prop` | 父传子，值级别 |
| `@Link` | 引用级别双向同步 |
| `@ObjectLink` | 对象属性级别 |
| `@Observed` | 类级别，使对象可被深度观察 |
| `AppStorage` / `LocalStorage` | 全局存储 |

性能优化点：
- 状态要尽量放在离使用它最近的组件，避免大范围刷新。
- 复杂对象用 `@Observed` + `@ObjectLink` 避免整体替换。
- 减少 `build()` 中的条件分支变化，提升 diff 效率。
- 长列表使用 `LazyForEach`，减少节点创建。

最佳实践：
- 不要手动操作渲染树节点，除非做非常底层的自定义绘制。
- 状态变化应批量处理，避免一帧内多次触发刷新。

**评分维度**：
- 能描述编译、组件树、渲染树、布局绘制流程（40%）
- 能解释状态装饰器的观察与脏标记机制（30%）
- 能给出性能优化建议（30%）

**常见错误**：
- 认为 ArkUI 和浏览器 DOM 一样有完整虚拟 DOM。
- 在 `build()` 中直接修改状态。
- 对 `@State` 修饰的深层对象属性变化不刷新感到困惑。

**延伸追问**：
- ArkUI 的 diff 算法和 React / Vue 的 diff 有什么异同？
- 自定义绘制时如何直接操作 RenderNode？

**相关题目**：
- [FB-46-CO-A-012 ArkTS 状态装饰器](#FB-46-CO-A-012)
- [FB-46-PE-P-018 鸿蒙性能与功耗优化](#FB-46-PE-P-018)

**参考资源**：
- [HarmonyOS 开发者文档 - ArkUI 渲染](https://developer.harmonyos.com/)

**口头回答版**：
> ArkUI 渲染分几步：ArkTS 源码被 ArkCompiler 静态编译，运行期 build 方法生成组件树，引擎再转成渲染树，然后布局、绘制到屏幕。状态变化时，框架会观察被装饰器修饰的变量，标记相关组件为脏，下一帧重新 build 并 diff，只更新变化的节点。所以状态要尽量放在最贴近使用的组件，减少刷新范围；复杂对象要用 @Observed 和 @ObjectLink 来观察内部属性。

---

### FB-46-PE-P-018：鸿蒙应用如何进行性能与功耗优化？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：性能优化、功耗、启动速度、内存、ArkUI、HarmonyOS
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请从启动性能、运行时性能、内存、功耗四个维度，说明鸿蒙应用常见的优化手段。

**参考答案**：

一、启动性能优化：

| 方向 | 手段 |
|------|------|
| 减少主包体积 | 使用 HSP / Feature HAP 拆分，移除无用资源 |
| 延迟加载 | 非首屏模块动态 import、HAP 按需下载 |
| 减少 Ability 初始化 | `onCreate` 不做耗时操作，异步初始化 |
| 预加载 | 合理使用 `aboutToAppear` 与异步数据请求 |
| ArkCompiler AOT | 利用静态编译提升启动和执行速度 |

二、运行时性能优化：

| 方向 | 手段 |
|------|------|
| 列表优化 | `LazyForEach`、稳定 key、`cachedCount`、固定高度 |
| 减少重绘 | 状态精准定位，避免大范围 `@State` 刷新 |
| 图片优化 | 使用合适分辨率、缓存、占位图、WebP |
| 动画优化 | 使用属性动画而非布局动画，避免触发 relayout |
| 避免阻塞主线程 | 耗时任务放入 TaskPool / Worker |

三、内存优化：

| 方向 | 手段 |
|------|------|
| 避免内存泄漏 | 页面销毁时取消订阅、清理定时器 |
| 大对象管理 | 及时释放 Bitmap、长列表复用节点 |
| 避免循环引用 | 注意匿名函数、闭包中的对象引用 |
| 全局状态谨慎 | AppStorage 中不要存放大量数据 |

四、功耗优化：

| 方向 | 手段 |
|------|------|
| 后台限制 | 不在后台常驻 Service，使用短时任务或延迟任务 |
| 传感器/定位 | 用完即停，使用低功耗模式 |
| 网络请求 | 合并请求、断点续传、使用长连接替代频繁短连接 |
| 卡片刷新 | 合理设置 `updateDuration`，避免频繁唤醒 |

示例：TaskPool 执行耗时任务

```ets
import { taskpool } from '@kit.ArkTS';

@Concurrent
function heavyCompute(data: number[]): number {
  return data.reduce((sum, v) => sum + v, 0);
}

async function runTask(): Promise<void> {
  const task = new taskpool.Task(heavyCompute, [1, 2, 3, 4, 5]);
  const result = await taskpool.execute(task) as number;
  console.info(`result: ${result}`);
}
```

最佳实践：
- 性能优化要先通过 Profiler 定位瓶颈，再针对性优化。
- 鸿蒙对后台管控严格，不要试图“保活”。
- 多设备场景下要考虑低端设备的性能差异。

**评分维度**：
- 能从启动、运行时、内存、功耗四个维度展开（40%）
- 能给出具体优化手段和代码示例（30%）
- 能提到 TaskPool / Worker / Profiler 等工具（30%）

**常见错误**：
- 一上来就做“感知不强”的微观优化，未先测量。
- 把 Web 端优化手段直接套用到鸿蒙，忽略系统限制。
- 滥用后台 Service 导致应用被系统限制或下架。

**延伸追问**：
- 鸿蒙 Profiler 能看到哪些指标？
- TaskPool 和 Worker 有什么区别？

**相关题目**：
- [FB-46-PE-A-015 列表渲染与性能优化](#FB-46-PE-A-015)
- [FB-46-PE-R-030 鸿蒙应用性能体系建设](#FB-46-PE-R-030)

**参考资源**：
- [HarmonyOS 开发者文档 - 性能优化](https://developer.harmonyos.com/)

**口头回答版**：
> 鸿蒙性能和功耗优化我分四块来看。启动性能要减包体积、延迟加载、不在 onCreate 做耗时操作；运行时性能主要用 LazyForEach 做列表、状态精准定位避免大范围刷新、图片优化、耗时任务放 TaskPool；内存上注意取消订阅、释放大对象、避免循环引用；功耗上不要后台保活，传感器用完停，卡片刷新频率别太高。优化前最好先用 Profiler 定位瓶颈。

---

### FB-46-CO-P-019：鸿蒙中如何进行 NDK / C++ 开发？适用场景有哪些？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：NDK、C++、Native、鸿蒙、性能、JNI、NAPI
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 HarmonyOS 的 NDK / C++ 开发方式，包括如何与 ArkTS 交互，以及适合使用 Native 开发的场景。

**参考答案**：

HarmonyOS 支持使用 NDK（Native Development Kit）进行 C / C++ 开发，并通过 NAPI（Native API）或 Node-API 与 ArkTS 通信。

NDK 开发流程：

1. **创建 Native 模块**：在工程中创建 C++ 模块，目录结构包含 `cpp`、`include`、`CMakeLists.txt`。
2. **编写 C++ 代码**：实现业务逻辑，使用 `napi` 头文件暴露函数。
3. **配置 CMake / ndk**：`build-profile.json5` 中声明 native 编译配置。
4. **ArkTS 调用**：通过 `import xxx from 'libentry.so'` 加载 so 库并调用。

C++ 暴露函数示例：

```cpp
// hello.cpp
#include "napi/native_api.h"

static napi_value Add(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2] = {nullptr};
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  double value0, value1;
  napi_get_value_double(env, args[0], &value0);
  napi_get_value_double(env, args[1], &value1);

  napi_value sum;
  napi_create_double(env, value0 + value1, &sum);
  return sum;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports) {
  napi_property_descriptor desc[] = {
    { "add", nullptr, Add, nullptr, nullptr, nullptr, napi_default, nullptr }
  };
  napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
  return exports;
}
EXTERN_C_END

static napi_module demoModule = {
  .nm_version = 1,
  .nm_flags = 0,
  .nm_filename = nullptr,
  .nm_register_func = Init,
  .nm_modname = "entry",
  .nm_priv = nullptr,
  .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterEntryModule() {
  napi_module_register(&demoModule);
}
```

ArkTS 调用：

```ets
import testNapi from 'libentry.so';

let result: number = testNapi.add(1, 2);
console.info(`add result: ${result}`);
```

适用场景：

| 场景 | 原因 |
|------|------|
| 音视频编解码 | 复用成熟 C/C++ 库，如 FFmpeg |
| 图像处理 | 高性能像素计算 |
| 游戏引擎 | 需要直接操作 GPU、物理引擎 |
| 加密算法 | 复用 OpenSSL 等库 |
| 性能敏感算法 | C++ 执行效率更高 |
| 跨平台复用 | 复用已有 C++ 业务逻辑 |

最佳实践：
- 仅在确实有性能或复用需求时使用 NDK，否则优先 ArkTS。
- 注意 C++ 内存管理，避免泄漏和崩溃。
- 跨语言传输大数据时使用 TypedArray 减少拷贝。

**评分维度**：
- 能说明 NDK 与 ArkTS 通过 NAPI 交互（30%）
- 能描述 NDK 开发基本流程（30%）
- 能给出适用场景和最佳实践（40%）

**常见错误**：
- 为了“性能”把所有业务都放到 C++，增加维护成本。
- NAPI 参数校验不严格，导致崩溃。
- 忽略 C++ 与 ArkTS 之间的线程模型差异。

**延伸追问**：
- NAPI 和 JNI 有什么异同？
- Native 层如何进行异步回调到 ArkTS？

**相关题目**：
- [FB-46-PE-P-018 鸿蒙性能与功耗优化](#FB-46-PE-P-018)
- [FB-46-SD-R-028 跨平台到鸿蒙迁移策略](#FB-46-SD-R-028)

**参考资源**：
- [HarmonyOS 开发者文档 - NDK 开发](https://developer.harmonyos.com/)

**口头回答版**：
> 鸿蒙支持 NDK C++ 开发，通过 NAPI 和 ArkTS 交互。基本流程是创建 C++ 模块、写 C++ 代码、用 napi 暴露函数、配置 CMake、然后在 ArkTS 里 import so 库调用。适合音视频编解码、图像处理、游戏引擎、加密算法、性能敏感计算，或者复用已有的 C++ 库。但一般业务优先用 ArkTS，只有确实有性能或复用需求才上 NDK。

---

### FB-46-CO-P-020：鸿蒙应用如何做跨设备适配？响应式布局有哪些关键能力？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：跨设备适配、响应式布局、栅格、断点、HarmonyOS
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 HarmonyOS 应用面向手机、平板、折叠屏、车机等多设备时的适配方案，重点说明响应式布局和断点系统。

**参考答案**：

鸿蒙强调“一次开发，多端部署”，跨设备适配依赖以下能力：

1. **响应式布局组件**：
   - `Row`、`Column`、`Flex`、`Grid`、`List`、`Stack`、`Swiper` 等。
   - 组件尺寸使用百分比、`vp`、`fp`、`lpx` 等相对单位。

2. **断点系统（Breakpoint）**：
   - 根据屏幕宽度自动匹配 `xs`、`sm`、`md`、`lg`、`xl` 等断点。
   - 可配合 `mediaQuery` 或 `display` 能力监听窗口变化。

3. **栅格系统（GridRow / GridCol）**：
   - 类似 Bootstrap 的 12 列栅格，按断点分配列数。
   - 适合复杂页面从手机到平板的自适应。

4. **原子化布局能力**：
   - `layoutWeight`：按比例分配剩余空间。
   - `expandSafeArea`：适配刘海、挖孔屏安全区。
   - `windowSize` / `screenSize` 获取窗口尺寸。

栅格示例：

```ets
@Entry
@Component
struct ResponsivePage {
  @State currentBp: string = 'md';

  build() {
    GridRow({ breakpoints: { value: ['320vp', '520vp', '840vp', '1280vp'] } }) {
      GridCol({ span: { xs: 12, sm: 12, md: 6, lg: 4 } }) {
        Column() {
          Text('Card 1').fontSize(20);
        }
        .width('100%')
        .height(120)
        .backgroundColor('#f0f0f0');
      }

      GridCol({ span: { xs: 12, sm: 12, md: 6, lg: 4 } }) {
        Column() {
          Text('Card 2').fontSize(20);
        }
        .width('100%')
        .height(120)
        .backgroundColor('#e0e0e0');
      }

      GridCol({ span: { xs: 12, sm: 12, md: 12, lg: 4 } }) {
        Column() {
          Text('Card 3').fontSize(20);
        }
        .width('100%')
        .height(120)
        .backgroundColor('#d0d0d0');
      }
    }
    .width('100%')
    .padding(16);
  }
}
```

多设备适配策略：

| 场景 | 方案 |
|------|------|
| 手机 vs 平板 | 使用栅格 + 断点，调整列数 |
| 折叠屏展开/折叠 | 监听窗口尺寸变化，重新布局 |
| 横竖屏切换 | 使用响应式单位，避免硬编码 |
| 车机 | 考虑远距离交互，按钮尺寸更大 |
| 手表 / IoT | 精简界面，使用专用 Ability |

最佳实践：
- 设计稿以 720vp 为基准，使用 `vp` 单位。
- 避免使用绝对像素和硬编码尺寸。
- 复杂页面拆分为“大纲-详情”两套布局，根据断点切换。

**评分维度**：
- 能说出响应式组件、断点、栅格等关键能力（40%）
- 能写出 GridRow / GridCol 示例（30%）
- 能给出手机、平板、车机等不同设备的适配策略（30%）

**常见错误**：
- 用固定 px 写布局，导致不同设备显示异常。
- 忽略折叠屏和窗口多开场景。
- 在车机上直接复用手机 UI，不考虑交互距离。

**延伸追问**：
- 如何监听窗口尺寸变化并动态调整布局？
- 鸿蒙的断点和 CSS Media Query 有什么异同？

**相关题目**：
- [FB-46-CO-B-004 ArkUI 声明式 UI](#FB-46-CO-B-004)
- [FB-46-SD-R-025 设计一个鸿蒙多端协同应用](#FB-46-SD-R-025)

**参考资源**：
- [HarmonyOS 开发者文档 - 响应式布局](https://developer.harmonyos.com/)

**口头回答版**：
> 鸿蒙跨设备适配主要靠响应式布局。核心能力有：用百分比、vp 这些相对单位；用 GridRow / GridCol 栅格系统；用断点系统 xs/sm/md/lg 根据屏幕宽度切换列数；还有 layoutWeight 按比例分配空间、expandSafeArea 适配安全区。设计时尽量不用固定像素，复杂页面可以拆成手机版和平板版两套布局，按断点切换。车机、手表这些特殊设备还要单独考虑交互距离和屏幕大小。

---

### FB-46-SE-P-021：鸿蒙应用的安全架构是怎样的？如何做好权限治理？

**题型**：安全题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：鸿蒙安全、权限治理、签名、加密、沙箱、ACL
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 HarmonyOS 应用安全架构的核心机制，并说明在实际开发中如何做好权限治理。

**参考答案**：

HarmonyOS 安全架构核心机制：

1. **应用沙箱**：
   - 每个应用运行在独立的进程和文件沙箱中，默认不能访问其他应用数据。
   - 通过 `context.filesDir`、`context.cacheDir` 等访问私有目录。

2. **应用签名**：
   - 所有 HAP 必须签名后才能安装运行。
   - 发布签名和调试签名分开管理，防止私钥泄露。

3. **权限分级**：
   - `system_grant`：安装时自动授予。
   - `user_grant`：运行时申请。
   - `ACL`：受控权限，需特殊签名或上架审核。

4. **分布式安全**：
   - 设备间通过信任环（Trust Zone / 华为账号）认证。
   - 跨设备传输默认加密。

5. **SELinux / 强制访问控制**：
   - 系统服务受强制访问控制策略保护。

权限治理实践：

| 方向 | 措施 |
|------|------|
| 最小权限 | 只声明业务必需的权限 |
| 按需申请 | user_grant 权限在功能触发时申请 |
| 用户告知 | 申请前说明权限用途 |
| 拒绝兜底 | 用户拒绝后提供降级方案 |
| 动态撤销 | 监听权限变化，及时释放相关资源 |
| 审计 | 上线前用安全扫描工具检查越权调用 |

代码示例：检查并申请权限

```ets
import { abilityAccessCtrl, Permissions } from '@kit.AbilityKit';

async function checkAndRequestPermission(permission: Permissions): Promise<boolean> {
  const atManager = abilityAccessCtrl.createAtManager();
  const grantStatus = await atManager.checkAccessToken(getContext().applicationInfo.accessTokenId, permission);
  if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
    return true;
  }
  const result = await atManager.requestPermissionsFromUser(getContext(), [permission]);
  return result.authResults[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
}
```

最佳实践：
- 权限申请文案要明确、具体，符合隐私合规要求。
- 敏感操作（拍照、录音、定位）要有明显提示。
- 跨设备调用硬件时也要校验权限和身份。

**评分维度**：
- 能说明沙箱、签名、权限分级、分布式安全等机制（40%）
- 能给出权限治理的具体措施（30%）
- 能写出权限检查和申请的代码（30%）

**常见错误**：
- 一次性申请所有权限，导致用户反感。
- 敏感数据明文存储在私有目录。
- 忽略用户拒绝权限后的体验兜底。

**延伸追问**：
- 鸿蒙如何实现跨设备数据传输的端到端加密？
- 应用沙箱和 Android 的沙箱机制有什么异同？

**相关题目**：
- [FB-46-CO-B-008 鸿蒙权限管理](#FB-46-CO-B-008)
- [FB-46-SD-R-025 设计一个鸿蒙多端协同应用](#FB-46-SD-R-025)

**参考资源**：
- [HarmonyOS 开发者文档 - 安全指南](https://developer.harmonyos.com/)

**口头回答版**：
> 鸿蒙安全架构有应用沙箱、应用签名、权限分级、分布式安全和强制访问控制。每个应用运行在独立沙箱里，HAP 必须签名，权限分 system_grant、user_grant 和 ACL。权限治理要做到最小权限、按需申请、明确告知用户、拒绝后有降级方案，还要动态监听权限变化。敏感数据不要明文存，跨设备传输默认是加密的。

---

### FB-46-CO-P-022：鸿蒙应用状态流转（Continuation）是什么？如何实现？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：Continuation、状态流转、分布式、迁移、HarmonyOS
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 HarmonyOS 中的应用状态流转（Continuation / 迁移），并说明实现任务迁移的关键步骤和注意事项。

**参考答案**：

应用状态流转（Continuation）是 HarmonyOS 分布式能力的核心特性之一，允许用户在一个设备上未完成的操作，无缝迁移到另一个设备继续。例如：手机上编辑的文档迁移到平板继续编辑。

核心概念：

| 概念 | 说明 |
|------|------|
| **源端** | 发起迁移的设备 |
| **目标端** | 接收迁移的设备 |
| **Mission** | 任务记录，包含 Ability 状态 |
| **迁移数据** | 应用自定义的业务状态 |

实现步骤：

1. **声明分布式迁移能力**：
   - 在 `module.json5` 中声明 `continuable: true`。

2. **实现 `onContinue()` 回调**：
   - 在源端 UIAbility 中保存当前业务状态。
   - 返回 `AGREE` 表示同意迁移。

3. **在目标端恢复状态**：
   - 目标端 UIAbility 通过 `want` 参数获取迁移数据，恢复界面。

4. **调用迁移 API**：
   - 使用 `continueManager` 或系统手势触发迁移。

示例代码：

```ets
import { UIAbility, Want, AbilityConstant } from '@kit.AbilityKit';
import { continuationManager } from '@kit.ContinuationManagerKit';

export default class EditorAbility extends UIAbility {
  private draftContent: string = '';

  onContinue(wantParam: Record<string, Object>): AbilityConstant.OnContinueResult {
    wantParam['draftContent'] = this.draftContent;
    return AbilityConstant.OnContinueResult.AGREE;
  }

  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    if (want.parameters && want.parameters['draftContent']) {
      this.draftContent = want.parameters['draftContent'] as string;
    }
  }

  async startContinue(): Promise<void> {
    try {
      await continuationManager.startContinuationDeviceManager();
    } catch (err) {
      console.error(`start continuation failed: ${JSON.stringify(err)}`);
    }
  }
}
```

注意事项：
- 迁移数据应尽量轻量，大文件通过分布式文件系统传递 URI。
- 两端设备需要登录同一华为账号或完成配对。
- 目标端应用版本需要兼容源端数据结构。
- 迁移过程中要处理网络中断、用户取消等异常。

最佳实践：
- 只迁移必要状态，不要迁移临时缓存。
- 迁移前后保持用户体验一致，避免数据丢失。
- 对敏感业务迁移数据进行加密。

**评分维度**：
- 能解释 Continuation 的源端、目标端、迁移数据（30%）
- 能说出实现迁移的关键步骤（30%）
- 能指出大文件、账号、版本兼容等注意事项（40%）

**常见错误**：
- 把全部页面栈和业务数据都序列化迁移，导致数据过大。
- 忽略目标端版本不兼容的问题。
- 未处理迁移失败时的回退逻辑。

**延伸追问**：
- 迁移和普通的跨设备启动 Ability 有什么区别？
- 鸿蒙的分布式数据库能否替代 Continuation 保存状态？

**相关题目**：
- [FB-46-CO-A-009 分布式软总线](#FB-46-CO-A-009)
- [FB-46-SD-R-025 设计一个鸿蒙多端协同应用](#FB-46-SD-R-025)

**参考资源**：
- [HarmonyOS 开发者文档 - 应用续接](https://developer.harmonyos.com/)

**口头回答版**：
> Continuation 是鸿蒙的分布式迁移能力，比如手机上写到一半的文档可以无缝迁移到平板继续编辑。实现步骤：在 module.json5 声明 continuable，源端 UIAbility 的 onContinue 里保存业务状态并返回 AGREE，目标端 onCreate 里从 want 参数恢复状态。注意迁移数据要轻量，大文件传 URI，两端要同账号或已配对，目标端版本要兼容，还要处理失败回退。

---

### FB-46-CD-P-023：请手写一个鸿蒙网络请求与状态管理结合的示例。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：网络请求、HTTP、状态管理、@State、Promise、ArkTS
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请手写一个鸿蒙页面，实现从网络加载用户列表并展示，包含加载中、空态、错误重试三种状态，并说明如何处理并发和内存泄漏。

**参考答案**：

```ets
// models/UserModel.ets
export interface UserModel {
  id: number;
  name: string;
  avatar: string;
}

// api/UserApi.ets
import { http } from '@kit.NetworkKit';
import { UserModel } from '../models/UserModel';

export class UserApi {
  static async fetchUsers(): Promise<UserModel[]> {
    const httpRequest = http.createHttp();
    try {
      const response = await httpRequest.request(
        'https://api.example.com/users',
        {
          method: http.RequestMethod.GET,
          header: { 'Content-Type': 'application/json' }
        }
      );
      if (response.responseCode === 200 && response.result) {
        return JSON.parse(response.result.toString()) as UserModel[];
      }
      throw new Error(`HTTP ${response.responseCode}`);
    } finally {
      httpRequest.destroy();
    }
  }
}
```

```ets
// pages/UserListPage.ets
import { UserApi } from '../api/UserApi';
import { UserModel } from '../models/UserModel';

@Entry
@Component
struct UserListPage {
  @State users: UserModel[] = [];
  @State loading: boolean = false;
  @State errorMsg: string = '';

  private isActive: boolean = true;

  aboutToAppear(): void {
    this.loadUsers();
  }

  aboutToDisappear(): void {
    this.isActive = false;
  }

  async loadUsers(): Promise<void> {
    this.loading = true;
    this.errorMsg = '';
    try {
      const data = await UserApi.fetchUsers();
      if (this.isActive) {
        this.users = data;
      }
    } catch (err) {
      if (this.isActive) {
        this.errorMsg = err instanceof Error ? err.message : '加载失败';
      }
    } finally {
      if (this.isActive) {
        this.loading = false;
      }
    }
  }

  build() {
    Column() {
      if (this.loading && this.users.length === 0) {
        LoadingProgress().width(40).height(40);
        Text('加载中...').margin({ top: 12 });
      } else if (this.errorMsg) {
        Text(this.errorMsg).fontColor(Color.Red);
        Button('重试')
          .margin({ top: 12 })
          .onClick(() => this.loadUsers());
      } else if (this.users.length === 0) {
        Text('暂无用户');
      } else {
        List({ space: 12 }) {
          ForEach(this.users, (user: UserModel) => {
            ListItem() {
              Row({ space: 12 }) {
                Image(user.avatar)
                  .width(48)
                  .height(48)
                  .borderRadius(24);
                Text(user.name).fontSize(16);
              }
              .width('100%')
              .padding(12);
            }
          }, (user: UserModel) => user.id.toString());
        }
        .width('100%')
        .layoutWeight(1);
      }
    }
    .width('100%')
    .height('100%')
    .padding(16);
  }
}
```

关键点：
- 使用 `isActive` 标志位避免页面销毁后还更新状态。
- `httpRequest.destroy()` 释放网络请求资源。
- 使用 `try / finally` 确保 loading 状态正确结束。
- 列表使用稳定 key。

最佳实践：
- 网络请求封装到独立模块，统一处理 token、超时、重试。
- 使用 `AbortController` 或类似机制取消未完成的请求。
- 全局状态可使用 AppStorage 或状态管理库。

**评分维度**：
- 能正确发起 HTTP 请求并解析数据（30%）
- 能实现加载、空态、错误、成功四种 UI 状态（30%）
- 能处理页面销毁后的状态更新与资源释放（20%）
- 代码结构清晰，有错误处理和重试（20%）

**常见错误**：
- 页面销毁后还继续更新 `@State`，导致异常。
- 不释放 `httpRequest` 造成资源泄漏。
- 网络请求直接写在 `build()` 中。

**延伸追问**：
- 如何实现请求取消和竞态处理？
- 如果要做下拉刷新和上拉加载更多，如何扩展？

**相关题目**：
- [FB-46-PE-A-015 列表渲染与性能优化](#FB-46-PE-A-015)
- [FB-46-SD-R-026 鸿蒙应用从 0 到 1 技术选型](#FB-46-SD-R-026)

**参考资源**：
- [HarmonyOS 开发者文档 - HTTP 请求](https://developer.harmonyos.com/)

**口头回答版**：
> 我会分三层：Model 定义 User 结构，Api 层用 NetworkKit 的 http 发请求并 destroy 释放，页面层用 @State 管理 users、loading、errorMsg。aboutToAppear 时加载，aboutToDisappear 时把 isActive 置 false，防止页面销毁后还更新状态。UI 上分加载中、错误重试、空态、列表成功四个分支。列表用 ForEach 加稳定 key。网络请求最好再封装一层统一处理 token 和超时。

---

### FB-46-FS-P-024：鸿蒙与 Android / iOS / 小程序 / Flutter 在技术范式上有哪些本质差异？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS、17 跨端技术
**标签**：鸿蒙、Android、iOS、Flutter、小程序、跨端、对比
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请从系统架构、UI 范式、开发语言、应用形态、分发方式等维度，对比鸿蒙与 Android / iOS / 小程序 / Flutter 的本质差异。

**参考答案**：

| 维度 | HarmonyOS | Android | iOS | 小程序 | Flutter |
|------|-----------|---------|-----|--------|---------|
| 系统内核 | 多内核（微内核 + Linux + LiteOS） | Linux 内核 | XNU / BSD | 依赖宿主 App | 依赖宿主操作系统 |
| 开发语言 | ArkTS、C/C++ | Kotlin / Java | Swift / Obj-C | JavaScript / WXML | Dart |
| UI 范式 | ArkUI 声明式 | 命令式 + Compose 声明式 | 命令式 + SwiftUI 声明式 | 受限的声明式 | Skia 自绘，声明式 |
| 应用形态 | 应用 + 原子化服务 + 卡片 | 传统应用为主 | 传统应用 + Widget | 轻应用 | 应用 |
| 跨设备 | 系统级分布式能力 | 依赖应用层实现 | 依赖 Handoff / AirDrop | 受限于微信生态 | 依赖框架能力 |
| 包结构 | HAP / HSP / HAR | APK / AAB | IPA | 小程序包 | 平台产物 |
| 渲染引擎 | ArkUI 自研渲染管线 | Skia / HWUI | Skia / UIKit | WebView / Skyline | Skia / Impeller |
| 后台管控 | 严格，禁止保活 | 较严格 | 严格 | 受宿主限制 | 较严格 |
| 一次开发多端 | 原生支持 | 需单独适配 | 需单独适配 | 依赖各平台小程序 | Android/iOS 较好 |

本质差异：

1. **系统级分布式**：鸿蒙把多设备协同作为系统原生能力，而不是应用层协议。
2. **原子化服务**：鸿蒙有独立的免安装服务形态，入口不仅限于桌面。
3. **声明式 UI 原生集成**：ArkUI 是鸿蒙第一方 UI 框架，与系统服务深度整合。
4. **Stage 模型**：以“能力”为中心组织应用，支持跨设备迁移。
5. **编译优化**：ArkCompiler 对 ArkTS 做 AOT 静态编译，提升启动和运行效率。

迁移考虑：
- 从 Android / iOS 迁移：界面需重写为 ArkUI，业务逻辑可复用部分 TS / C++ 代码。
- 从小程序迁移：需重新设计应用结构，但 JS/TS 经验可复用。
- 从 Flutter 迁移：UI 范式接近，但 Widget 树要转为 ArkUI 组件树。

最佳实践：
- 不要简单照搬其他平台的架构，要利用鸿蒙的分布式和卡片能力。
- 复杂业务模块优先用 ArkTS 实现，性能瓶颈处使用 NDK。

**评分维度**：
- 能从至少 5 个维度进行对比（40%）
- 能指出鸿蒙系统级分布式、原子化服务、Stage 模型等本质差异（30%）
- 能给出不同平台迁移到鸿蒙的注意事项（30%）

**常见错误**：
- 把鸿蒙简单理解为 Android 换壳。
- 认为 Flutter / 小程序代码可以直接在鸿蒙运行。
- 忽略鸿蒙对后台和权限的严格管控。

**延伸追问**：
- 如果要把一个大型 Flutter 应用迁移到鸿蒙，你会怎么规划？
- 鸿蒙的 ArkUI 和 Flutter 的 Widget 在渲染管线上的差异是什么？

**相关题目**：
- [FB-46-CO-B-001 HarmonyOS 系统架构](#FB-46-CO-B-001)
- [FB-46-SD-R-028 跨平台到鸿蒙迁移策略](#FB-46-SD-R-028)

**参考资源**：
- [HarmonyOS 开发者文档 - 应用模型](https://developer.harmonyos.com/)

**口头回答版**：
> 鸿蒙和 Android、iOS、小程序、Flutter 最大的区别是系统级分布式能力，多设备协同是原生的。应用形态上除了传统 App，还有原子化服务和卡片。开发语言是 ArkTS，UI 用 ArkUI 声明式。包结构是 HAP/HSP/HAR。对比安卓，鸿蒙不是换壳，内核、应用模型、生命周期、权限管控都不同。Flutter 是自绘引擎，鸿蒙是 ArkUI 自研渲染管线。迁移时 UI 基本要重写，但 TS/JS 经验和部分 C++ 库可以复用。

---

## 架构题（7 道）{#architect}


### FB-46-SD-R-025：如何设计一个鸿蒙多端协同的阅读应用？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：多端协同、架构设计、阅读应用、分布式、Continuation、卡片
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个鸿蒙多端协同阅读应用，要求支持手机、平板、车机三种设备，包含书架、阅读器、听书、桌面卡片等功能，并说明关键技术选型和数据同步方案。

**参考答案**：

一、整体架构：

```text
┌─────────────────────────────────────────┐
│  多端协同阅读应用                          │
├─────────────┬─────────────┬─────────────┤
│   手机端     │   平板端     │   车机端     │
│  书架/阅读器 │  沉浸式阅读  │  听书/语音   │
├─────────────┴─────────────┴─────────────┤
│      公共 HAR：UI 组件 / 网络 / 存储        │
├─────────────────────────────────────────┤
│      HSP：阅读引擎 / 用户中心 / 书籍资源      │
├─────────────────────────────────────────┤
│  分布式数据 │  Continuation  │  卡片服务    │
├─────────────────────────────────────────┤
│  云端：用户数据 / 书籍内容 / 听书服务 / 推荐   │
└─────────────────────────────────────────┘
```

二、模块划分：

| 模块 | 形态 | 说明 |
|------|------|------|
| Entry HAP | 主入口 | 书架、个人中心 |
| Feature Reader | Feature HAP | 阅读器，按需下载 |
| Feature Audio | Feature HAP | 听书模块，按需下载 |
| library_ui | HAR | 通用 UI 组件 |
| library_network | HAR | 网络、缓存、拦截 |
| shared_reader | HSP | 阅读引擎、排版、字体 |
| shared_account | HSP | 账号、阅读进度同步 |

三、多端适配策略：

| 设备 | 重点能力 | UI 策略 |
|------|---------|---------|
| 手机 | 便携阅读、书架管理 | 单列布局，底部导航 |
| 平板 | 沉浸式大屏阅读 | 双栏书架 + 全屏阅读 |
| 车机 | 听书、语音控制 | 大按钮、语音交互为主 |

四、数据同步方案：

- **阅读进度**：使用分布式数据库（DistributedDataObject）或云端同步。
- **书签/笔记**：云端数据库为主，本地缓存兜底。
- **书籍资源**：大文件存分布式文件或云端 CDN，本地只保留索引。

五、跨设备迁移：

- 手机阅读到一半，通过 Continuation 迁移到平板继续阅读。
- `onContinue` 中保存当前章节、页码、字体设置等轻量状态。
- 目标端从 `want.parameters` 恢复状态，拉取对应章节内容。

六、卡片服务：

- 桌面卡片展示“最近阅读”和“今日推荐”。
- 点击卡片直接进入阅读器指定章节。
- 定时刷新推荐内容，但控制频率避免耗电。

七、安全与隐私：

- 阅读记录等敏感数据本地加密存储。
- 跨设备同步使用加密通道。
- 用户账号体系与华为账号打通。

最佳实践：
- 公共能力下沉到 HAR / HSP，业务功能用 Feature HAP 按需加载。
- 多端共享状态优先使用鸿蒙分布式数据能力，减少对云端的实时依赖。
- 车机端重点做语音交互和听书，不要做复杂阅读 UI。

**评分维度**：
- 能合理划分 HAP / HSP / HAR 模块（25%）
- 能给出手机、平板、车机的差异化方案（25%）
- 能设计数据同步和 Continuation 方案（25%）
- 能考虑卡片、安全、性能等非功能需求（25%）

**常见错误**：
- 所有功能塞进一个 Entry HAP，无法按需加载。
- 多端使用完全相同的 UI，未做针对性适配。
- 跨设备同步时全量传输书籍内容，造成流量和延迟问题。

**延伸追问**：
- 如果用户离线，阅读进度如何同步？
- 听书模块在后台被系统限制时如何处理？

**相关题目**：
- [FB-46-CO-P-022 应用状态流转与 Continuation](#FB-46-CO-P-022)
- [FB-46-CO-P-020 跨设备适配与响应式布局](#FB-46-CO-P-020)

**参考资源**：
- [HarmonyOS 开发者文档 - 分布式数据](https://developer.harmonyos.com/)

**口头回答版**：
> 我会把应用拆成 Entry HAP 做主入口和书架，阅读器和听书做成 Feature HAP 按需下载，公共 UI 和网络库做成 HAR，阅读引擎和账号数据做成 HSP 多 HAP 共享。手机端侧重便携阅读和书架，平板端做双栏沉浸阅读，车机端主要做听书和语音控制。阅读进度、书签用鸿蒙分布式数据库或云端同步；手机读到一半可以通过 Continuation 迁移到平板。还要有桌面卡片展示最近阅读和今日推荐。安全和离线场景也要考虑。

---

### FB-46-SD-R-026：一个鸿蒙应用从 0 到 1，你会如何做技术选型？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：技术选型、鸿蒙、架构、ArkTS、HAP、工程化
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
如果你要负责一个中大型鸿蒙应用从 0 到 1 的建设，请从技术栈、应用模型、工程结构、状态管理、网络、数据、测试、CI/CD 等方面说明你的选型思路。

**参考答案**：

一、技术栈：

| 层面 | 选型 | 说明 |
|------|------|------|
| 开发语言 | ArkTS | 官方主推，强类型，AOT 编译 |
| UI 框架 | ArkUI 声明式 | 原生性能，多端适配 |
| 应用模型 | Stage 模型 | 面向全场景分布式 |
| 跨平台复用 | 仅在性能瓶颈处使用 NDK | 不优先引入跨端框架 |

二、工程结构：

```text
MyApp
├── entry/                  # 主入口 HAP
├── features/               # 业务 Feature HAP
│   ├── feature_home/
│   ├── feature_mine/
│   └── feature_search/
├── libraries/              # HAR 静态库
│   ├── library_ui/
│   ├── library_network/
│   ├── library_storage/
│   └── library_utils/
├── shared/                 # HSP 动态共享包
│   ├── shared_common/
│   └── shared_account/
└── build-scripts/          # 构建脚本
```

三、状态管理：

- 组件内状态：`@State`、`@Prop`、`@Link`。
- 跨组件少量状态：`@Provide` / `@Consume`、AppStorage。
- 复杂全局状态：自研 Store 或参考 Redux / Pinia 思想的轻量状态库。
- 避免把所有状态都放在 AppStorage。

四、网络层：

- 基于 `@kit.NetworkKit` 的 http 模块封装。
- 统一处理 baseURL、token、签名、超时、重试、错误码。
- 使用拦截器模式处理日志和缓存。

五、数据持久化：

- 轻量 KV：Preferences。
- 结构化数据：RelationalStore（关系型数据库）。
- 跨设备同步：DistributedKVStore / DistributedDataObject。
- 大文件：DistributedFile 或云端对象存储。

六、测试：

- 单元测试：ArkTS 单元测试框架。
- UI 测试：UiTest 框架。
- 兼容性测试：覆盖手机、平板、折叠屏、车机等设备。

七、CI/CD：

- 代码提交触发静态扫描、类型检查、单元测试。
- 构建产物按环境签名：debug、release、上架。
- 使用华为 AppGallery Connect 分发和灰度。

八、质量门禁：

- 包体积、启动时间、内存占用、功耗纳入 CI 指标。
- 权限最小化和隐私合规审计。

最佳实践：
- 优先使用官方 SDK 和最佳实践，避免引入不成熟第三方库。
- 架构上预留 Feature HAP 扩展点，便于业务线独立演进。
- 建立鸿蒙专属组件库和设计规范。

**评分维度**：
- 能覆盖语言、模型、工程结构、状态、网络、数据、测试、CI/CD（30%）
- 能给出具体选型和理由（30%）
- 能考虑鸿蒙多端、分布式、包体积等特殊因素（25%）
- 能提出质量门禁和可持续演进方案（15%）

**常见错误**：
- 直接照搬 Web 或小程序架构。
- 忽视 HAP / HSP / HAR 的选型，导致后期重构。
- 全局状态管理过度设计。

**延伸追问**：
- 如果团队之前只有 Android 经验，如何快速切换到鸿蒙？
- 鸿蒙目前生态不如安卓成熟，遇到官方 API 缺失怎么办？

**相关题目**：
- [FB-46-CO-B-005 Stage 模型与 FA 模型](#FB-46-CO-B-005)
- [FB-46-EN-A-016 鸿蒙工程化与模块化](#FB-46-EN-A-016)

**参考资源**：
- [HarmonyOS 开发者文档 - 应用开发指南](https://developer.harmonyos.com/)

**口头回答版**：
> 从 0 到 1 做鸿蒙应用，语言用 ArkTS，UI 用 ArkUI 声明式，模型用 Stage。工程上 entry 做主入口，业务拆 Feature HAP，公共 UI 和工具做成 HAR，多 HAP 共享的做成 HSP。状态管理看规模，小组件用 @State/@Link，跨层级用 @Provide/@Consume 或 AppStorage，复杂全局状态做轻量 Store。网络用 NetworkKit 封装统一拦截器，数据持久化用 Preferences、RelationalStore 或分布式数据库。测试要有单元测试和 UiTest，CI/CD 做静态检查、签名打包、灰度发布。还要把包体积、启动时间、功耗纳入质量门禁。

---

### FB-46-SD-R-027：如何设计鸿蒙卡片与原子化服务的整体架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：卡片、原子化服务、架构设计、Form、Widget、分发
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个面向鸿蒙的卡片与原子化服务架构，要求覆盖卡片的入口设计、数据刷新、点击跳转、与主应用的协同，以及原子化服务的商业闭环。

**参考答案**：

一、整体架构：

```text
┌──────────────────────────────────────────┐
│          系统入口：桌面 / 负一屏 / 搜索 / 扫码     │
├──────────────────────────────────────────┤
│  卡片层（Form）                            │
│  ├── 信息展示卡片：天气、待办、快递              │
│  ├── 快捷操作卡片：扫一扫、乘车码、播放控制       │
│  └── 推荐卡片：今日新闻、今日歌单               │
├──────────────────────────────────────────┤
│  原子化服务层（Atomic Service）              │
│  ├── 轻量交互页面                          │
│  └── 引导安装完整应用或转化付费               │
├──────────────────────────────────────────┤
│  主应用层（Full Application）               │
│  ├── 完整功能                              │
│  ├── 账号 / 数据 / 订单                      │
│  └── 商业闭环                              │
├──────────────────────────────────────────┤
│  云端：内容服务 / 推荐引擎 / 推送 / 数据分析     │
└──────────────────────────────────────────┘
```

二、卡片分类与职责：

| 卡片类型 | 职责 | 刷新策略 |
|---------|------|---------|
| 信息展示型 | 展示关键数据 | 定时 + 云端推送 |
| 快捷操作型 | 一键完成高频操作 | 事件触发 |
| 推荐型 | 引导用户进入服务 | 算法推荐 + 定时 |

三、数据刷新机制：

- **定时刷新**：通过 `form_config.json` 的 `updateDuration` 配置。
- **主动刷新**：应用后台通过 `updateForm()` 推送。
- **事件刷新**：卡片内按钮点击触发 `callEventNotify`。
- **推送刷新**：通过 Push Kit 下发卡片数据更新。

四、点击跳转与协同：

- 点击卡片打开原子化服务或主应用指定页面。
- 使用 `Router` 或 `want` 携带参数跳转。
- 原子化服务与主应用共享同一账号和数据体系。

五、原子化服务商业闭环：

| 阶段 | 做法 |
|------|------|
| 获客 | 卡片作为系统级入口，降低使用门槛 |
| 激活 | 即用即走，快速完成核心价值 |
| 转化 | 复杂流程引导至主应用或 H5 落地页 |
| 留存 | 卡片定时更新保持曝光，PUSH 召回 |
| 变现 | 主应用内完成订阅、购买、广告 |

六、工程组织：

- 卡片 UI 和逻辑封装为独立 HAR，便于多 HAP 复用。
- FormExtensionAbility 与主应用 Ability 分离，保证卡片轻量。
- 卡片数据接口独立，避免直接依赖主应用业务代码。

最佳实践：
- 卡片信息要“一眼可见”，交互要“一触即达”。
- 卡片刷新频率要平衡实时性和功耗。
- 原子化服务不要做成完整应用的缩水版，而要聚焦核心场景。

**评分维度**：
- 能清晰划分卡片层、原子化服务层、主应用层（25%）
- 能设计卡片分类、刷新、跳转机制（25%）
- 能说明原子化服务的商业闭环（25%）
- 能考虑工程组织和功耗、体验平衡（25%）

**常见错误**：
- 卡片信息过多，失去轻量意义。
- 原子化服务没有明确的转化路径，无法形成闭环。
- 卡片刷新频率过高导致耗电。

**延伸追问**：
- 如何衡量卡片和原子化服务的 ROI？
- 卡片和主应用之间如何安全共享数据？

**相关题目**：
- [FB-46-CO-A-010 原子化服务](#FB-46-CO-A-010)
- [FB-46-CO-A-011 卡片服务 FormExtensionAbility](#FB-46-CO-A-011)

**参考资源**：
- [HarmonyOS 开发者文档 - 原子化服务设计](https://developer.harmonyos.com/)

**口头回答版**：
> 我会分三层：系统入口下面是卡片层，负责轻量信息展示和快捷操作；中间是原子化服务层，免安装、聚焦核心场景；下面是主应用层，做完整功能和商业闭环。卡片分信息展示、快捷操作、推荐三类，刷新可以用定时、主动推送、事件触发。点击卡片跳到原子化服务或主应用，数据和账号打通。商业闭环就是卡片获客、原子化服务激活、主应用转化变现。工程上卡片 UI 单独封 HAR，FormExtensionAbility 独立，保证轻量。

---

### FB-46-SD-R-028：将现有跨平台应用迁移到鸿蒙，你会如何制定策略？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS、17 跨端技术
**标签**：迁移、鸿蒙、跨平台、兼容、重写、策略
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
公司现有一个基于 Flutter / React Native / 小程序 / H5 的跨平台应用，计划迁移到鸿蒙。请制定一个可行的迁移策略，包括技术评估、迁移路径、风险控制和验收标准。

**参考答案**：

一、迁移前评估：

| 评估维度 | 内容 |
|---------|------|
| 现有技术栈 | Flutter / RN / 小程序 / H5 |
| 业务复杂度 | 页面数、自定义组件数、Native 依赖 |
| 核心能力 | 支付、地图、音视频、蓝牙、推送等 |
| 性能要求 | 启动时间、帧率、包体积 |
| 第三方依赖 | SDK 是否有鸿蒙版本 |
| 团队能力 | ArkTS / ArkUI 储备 |

二、迁移策略：

| 来源 | 推荐策略 |
|------|---------|
| **Flutter** | UI 重写为 ArkUI，业务逻辑 TS/JS 可复用，Dart 侧核心算法可用 NDK 重写或保留 C++ |
| **React Native** | JSX 组件转 ArkUI，JS 业务逻辑迁移较平滑，原生模块需重新实现 |
| **小程序** | 应用结构需重新设计，WXML/JS 经验可复用，但生命周期和路由差异大 |
| **H5** | 整体重构为原生 ArkUI，H5 页面可临时用 Web 组件内嵌过渡 |

三、推荐迁移路径：

1. **Phase 1：基础搭建**
   - 建立鸿蒙工程，确定 HAP / HAR / HSP 结构。
   - 搭建公共组件库、网络层、状态管理、埋点。

2. **Phase 2：核心链路迁移**
   - 优先迁移首页、列表、详情、登录、支付等核心页面。
   - 关键 Native 能力用 NDK 或鸿蒙官方 SDK 替换。

3. **Phase 3：能力补齐**
   - 迁移二级功能、运营活动、推送、分享等。
   - 引入卡片、原子化服务等鸿蒙特有能力。

4. **Phase 4：优化与上线**
   - 性能优化、包体积治理、功耗优化。
   - 灰度发布、AB 测试、数据监控。

四、风险控制：

| 风险 | 应对措施 |
|------|---------|
| 鸿蒙 SDK 缺失 | 寻找官方替代方案，或自研过渡，评估是否需要降级 |
| 团队学习成本 | 制定培训计划，建立代码规范，Code Review 强化 |
| 双端并行维护 | 抽象公共业务逻辑，建立跨平台共享层 |
| 性能不达标 | 分阶段 Profiling，设立性能基线 |
| 上架审核 | 提前了解华为应用市场政策，权限最小化 |

五、验收标准：

- 功能覆盖率 ≥ 95%。
- 核心链路启动时间、帧率不低于原平台。
- 包体积、功耗、崩溃率满足上线要求。
- 通过华为应用市场上架审核。

最佳实践：
- 不要追求一次性完全重写，优先保障核心链路可用。
- 迁移过程中保留原有应用运行，降低业务风险。
- 充分利用鸿蒙卡片、分布式等能力创造差异化价值。

**评分维度**：
- 能按来源给出差异化迁移策略（25%）
- 能制定分阶段迁移路径（25%）
- 能识别 SDK 缺失、性能、团队等风险并给出应对（25%）
- 能设定合理的验收标准（25%）

**常见错误**：
- 要求所有功能一次性迁移完成，导致周期过长。
- 完全照搬原有架构，未利用鸿蒙特有能力。
- 忽略第三方 SDK 的鸿蒙适配情况。

**延伸追问**：
- 如果某个核心第三方 SDK 暂时没有鸿蒙版本，你会怎么处理？
- 迁移过程中如何与原应用共享业务逻辑，避免重复开发？

**相关题目**：
- [FB-46-FS-P-024 鸿蒙与 Android/iOS/Flutter 差异](#FB-46-FS-P-024)
- [FB-46-SD-R-026 鸿蒙应用从 0 到 1 技术选型](#FB-46-SD-R-026)

**参考资源**：
- [HarmonyOS 开发者文档 - 迁移指南](https://developer.harmonyos.com/)

**口头回答版**：
> 迁移前先评估现有技术栈、业务复杂度、Native 依赖、第三方 SDK 和团队能力。Flutter 过来 UI 要重写，业务逻辑和 C++ 算法可复用；RN 和小程序也是 UI 重写，JS 逻辑能复用一部分；H5 建议整体重构。我推荐分四步走：先搭鸿蒙工程基础，再迁移核心链路，然后补齐二级功能，最后优化上线。风险主要是 SDK 缺失、团队学习成本和性能，要提前找替代方案、做培训、设性能基线。验收看功能覆盖、启动帧率、包体积、崩溃率和上架审核。

---

### FB-46-CP-R-029：如何看待鸿蒙生态的发展？作为前端架构师应如何布局？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：鸿蒙生态、技术战略、前端架构、全场景、布局
**出现频率**：中频
**预计回答时长**：10-20 分钟

**题目描述**：
请结合鸿蒙生态现状，谈谈你对鸿蒙未来发展的判断，并说明作为前端架构师应如何在团队、技术、产品上布局鸿蒙。

**参考答案**：

一、鸿蒙生态现状判断：

| 维度 | 现状 |
|------|------|
| 设备覆盖 | 手机、平板、车机、穿戴、IoT 快速增长 |
| 开发者生态 | 官方投入大，文档和工具持续完善 |
| 应用数量 | 头部应用加速适配，长尾应用仍在观望 |
| 技术成熟度 | ArkUI、Stage 模型、分布式能力趋于稳定 |
| 商业模式 | 应用市场、原子化服务、硬件联动带来新机会 |

二、发展机遇：

- **系统级分布式**：多设备协同是鸿蒙最大差异化，适合 IoT、车机、办公协同。
- **原子化服务与卡片**：降低用户使用门槛，创造新入口。
- **自主可控**：政企、金融、关键行业有强烈适配诉求。
- **新流量红利**：早期适配者可获得官方推荐和流量扶持。

三、前端架构师布局建议：

1. **团队层面**：
   - 组建鸿蒙专项小组，培养 ArkTS / ArkUI 核心开发者。
   - 建立鸿蒙代码规范、组件库、最佳实践文档。
   - 与华为技术团队、生态伙伴保持沟通。

2. **技术层面**：
   - 搭建鸿蒙基础脚手架和公共库。
   - 建立跨端组件抽象层，降低未来多端维护成本。
   - 关注 NDK、卡片、分布式等高级能力。

3. **产品层面**：
   - 识别适合鸿蒙特有能力的产品场景（多设备协同、卡片）。
   - 推动核心产品优先适配鸿蒙，抢占流量红利。
   - 设计原子化服务和卡片，提升用户触达效率。

4. **生态层面**：
   - 参与开源社区和鸿蒙开发者活动。
   - 输出技术博客、开源组件，建立技术品牌。
   - 推动第三方 SDK 鸿蒙化，完善生态。

四、风险与挑战：

- 生态成熟度仍在发展中，部分第三方能力缺失。
- 多设备碎片化带来适配和测试成本。
- 团队需要学习新的语言、框架、工具链。

最佳实践：
- 不要盲目 All-in，应结合业务优先级逐步投入。
- 先落地“标杆项目”，积累经验后再大规模推广。
- 保持对 OpenHarmony 和行业动态的关注。

**评分维度**：
- 能对鸿蒙生态现状有客观判断（25%）
- 能从团队、技术、产品、生态四个维度给出布局建议（35%）
- 能识别发展机遇与风险（25%）
- 表达有战略高度和可落地性（15%）

**常见错误**：
- 一味唱衰或一味吹捧，缺乏客观分析。
- 只谈技术，不谈团队培养和产品价值。
- 忽视生态不成熟带来的实际风险。

**延伸追问**：
- 你认为鸿蒙最大的竞争对手是谁？差异化在哪里？
- 如果公司资源有限，你会优先投入哪些鸿蒙能力？

**相关题目**：
- [FB-46-SD-R-026 鸿蒙应用从 0 到 1 技术选型](#FB-46-SD-R-026)
- [FB-46-SD-R-028 跨平台到鸿蒙迁移策略](#FB-46-SD-R-028)

**参考资源**：
- [HarmonyOS 开发者文档 - 生态白皮书](https://developer.harmonyos.com/)

**口头回答版**：
> 我认为鸿蒙生态正处于快速成长期，设备覆盖越来越广，头部应用开始适配，官方投入也很大。最大的机会是系统级分布式、原子化服务和卡片带来的新入口。作为前端架构师，团队上要培养 ArkTS/ArkUI 核心人才；技术上要搭脚手架、公共库，关注 NDK 和分布式能力；产品上要找到适合鸿蒙特有能力的高价值场景；生态上要参与社区、输出技术品牌。但也要看到第三方 SDK 不成熟、多设备适配成本高等风险，建议结合业务优先级逐步投入，先落地标杆项目。

---

### FB-46-PE-R-030：如何为鸿蒙应用建立一套完整的性能工程体系？

**题型**：性能优化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：性能工程、鸿蒙、Profiler、指标体系、CI、性能基线
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套适用于鸿蒙应用的性能工程体系，覆盖性能指标定义、监控、分析、优化和防止劣化。

**参考答案**：

一、性能指标体系：

| 类别 | 核心指标 |
|------|---------|
| 启动性能 | 冷启动时间、首屏时间、Ability onCreate 耗时 |
| 运行时 | 列表帧率、页面切换时长、手势响应延迟 |
| 内存 | 峰值内存、Native 内存、泄漏率 |
| 功耗 | 后台唤醒次数、CPU 占用、卡片刷新频率 |
| 包体积 | Entry HAP 体积、资源占比、Feature HAP 下载大小 |

二、性能监控体系：

1. **本地 Profiling**：
   - 使用 DevEco Studio 自带的 Profiler：CPU、Memory、GPU、Network。
   - 关键路径手动埋点，记录启动、页面加载、接口耗时。

2. **线上监控**：
   - 接入 APM SDK，采集启动时间、崩溃率、ANR、慢帧。
   - 分设备、分系统版本、分场景聚合数据。

3. **卡片与原子化服务专项**：
   - 监控卡片加载时长、更新成功率、耗电占比。

三、性能分析流程：

```text
发现问题 → 复现定位 → Profiler 采样 → 根因分析 → 制定优化 → 验证收益 → 固化基线
```

四、优化闭环：

| 阶段 | 动作 |
|------|------|
| 日常 | Code Review 中关注性能风险 |
| 迭代 | 新功能上线前做性能测试 |
| 灰度 | 对比旧版本关键指标 |
| 复盘 | 重大性能问题写 Postmortem |

五、防止劣化：

- **性能基线**：每个核心页面/Ability 设定启动、帧率、内存基线。
- **CI 门禁**：合并请求触发性能测试，超过基线阻止合并。
- **包体积门禁**：HAP 体积增长超过阈值自动告警。
- **功耗门禁**：后台任务、卡片刷新纳入审核清单。

六、组织架构：

- 设立性能 Owner，负责指标建设和优化推进。
- 各业务线指定性能接口人。
- 定期召开性能复盘会。

最佳实践：
- 性能优化要数据驱动，避免拍脑袋。
- 关键指标要可量化、可对比、可回溯。
- 性能文化需要长期建设，不是一次性项目。

**评分维度**：
- 能定义合理的性能指标体系（25%）
- 能设计本地 + 线上监控方案（25%）
- 能给出优化闭环和防止劣化机制（30%）
- 能考虑组织保障和持续运营（20%）

**常见错误**：
- 只关注启动时间，忽略帧率、功耗、内存。
- 性能数据缺乏分场景、分设备聚合。
- 没有性能基线和 CI 门禁，劣化无法及时发现。

**延伸追问**：
- 鸿蒙 Profiler 和传统 Android Profiler 在使用上有什么不同？
- 如何在低版本鸿蒙设备上保持性能一致性？

**相关题目**：
- [FB-46-PE-A-015 列表渲染与性能优化](#FB-46-PE-A-015)
- [FB-46-PE-P-018 鸿蒙性能与功耗优化](#FB-46-PE-P-018)

**参考资源**：
- [HarmonyOS 开发者文档 - 性能分析](https://developer.harmonyos.com/)

**口头回答版**：
> 我会从指标体系、监控、分析、优化、防止劣化五个层面来建性能工程体系。指标包括启动、运行时帧率、内存、功耗、包体积。监控分本地 Profiler 和线上 APM。分析流程是发现问题、复现、采样、根因、优化、验证、固化基线。防止劣化主要靠性能基线、CI 门禁、包体积和功耗审核。还要有性能 Owner 和定期复盘，把性能当成持续运营的事。

---

### FB-46-SD-R-031：设计一个面向企业内部的鸿蒙办公协同平台架构。

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：46 鸿蒙 ArkTS / HarmonyOS
**标签**：企业架构、办公协同、鸿蒙、安全、多端、私有化
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个面向企业内部的鸿蒙办公协同平台，要求支持即时通讯、日程、审批、文档预览、会议投屏、多端协同，并重点考虑安全合规和私有化部署。

**参考答案**：

一、整体架构：

```text
┌─────────────────────────────────────────────┐
│  终端层：手机 / 平板 / PC / 车机 / 智慧屏        │
├─────────────────────────────────────────────┤
│  鸿蒙应用：IM / 日程 / 审批 / 文档 / 会议 / 投屏   │
├─────────────────────────────────────────────┤
│  公共 HAR/HSP：UI 组件 / 网络 / 安全 / 推送 / 存储 │
├─────────────────────────────────────────────┤
│  网关层：API Gateway / 推送网关 / 文件网关        │
├─────────────────────────────────────────────┤
│  业务中台：IM / 日程 / 审批 / 文档 / 会议 / 搜索   │
├─────────────────────────────────────────────┤
│  数据中台：用户中心 / 权限中心 / 审计日志 / 知识库  │
├─────────────────────────────────────────────┤
│  基础设施：私有化服务器 / 对象存储 / 数据库 / 缓存  │
└─────────────────────────────────────────────┘
```

二、鸿蒙特有能力应用：

| 场景 | 鸿蒙能力 |
|------|---------|
| 会议投屏 | 分布式软总线，手机一键投屏到智慧屏 |
| 多端协同 | Continuation，手机上编辑文档迁移到平板 |
| 日程提醒 | 卡片服务，桌面展示今日会议 |
| 审批待办 | 原子化服务 + 卡片，快速审批 |
| 文档预览 | ServiceExtensionAbility 后台渲染 |

三、安全合规设计：

- **数据安全**：端到端加密、国密算法、本地数据加密存储。
- **身份安全**：统一身份认证（SSO）、多因素认证、设备绑定。
- **访问控制**：RBAC / ABAC 权限模型，敏感操作审计。
- **合规**：满足等保、数据本地化、隐私合规要求。
- **应用安全**：防截屏、防录屏、安全键盘、水印。

四、私有化部署：

- 支持企业私有服务器部署，不与公网直连。
- 推送网关可对接企业自有推送服务。
- 文件存储支持私有对象存储或 NAS。
- 支持离线模式，弱网环境下基本功能可用。

五、多端一致性：

- 核心数据通过企业数据中台同步。
- 使用鸿蒙分布式数据库实现跨设备实时同步。
- 复杂 UI 按设备形态自适应。

六、工程组织：

- Entry HAP：工作台入口。
- Feature HAP：IM、日程、审批、文档、会议独立模块。
- HAR：企业级 UI 组件、安全 SDK、网络 SDK。
- HSP：公共业务模型、账号体系。

最佳实践：
- 企业场景优先保证安全和稳定，其次才是体验。
- 敏感数据不出企业内网，所有外发需审计。
- 建立灾备和回滚机制。

**评分维度**：
- 能合理划分业务模块和鸿蒙特有能力（25%）
- 能设计安全合规和私有化部署方案（30%）
- 能说明多端协同和数据同步机制（25%）
- 能考虑工程组织和可运维性（20%）

**常见错误**：
- 忽视企业场景对安全和合规的严格要求。
- 所有业务模块耦合在一个 HAP 中。
- 跨设备同步时不考虑弱网和离线场景。

**延伸追问**：
- 如果企业要求数据完全不出内网，推送怎么做？
- 如何防止企业内部应用被截图或录屏泄露？

**相关题目**：
- [FB-46-SE-P-021 鸿蒙安全架构与权限治理](#FB-46-SE-P-021)
- [FB-46-SD-R-025 设计一个鸿蒙多端协同应用](#FB-46-SD-R-025)

**参考资源**：
- [HarmonyOS 开发者文档 - 企业开发](https://developer.harmonyos.com/)

**口头回答版**：
> 企业办公协同平台我会分层设计：终端层是鸿蒙各种设备，应用层按 IM、日程、审批、文档、会议拆成 Feature HAP，公共能力下沉到 HAR/HSP。鸿蒙特有能力方面：会议投屏用分布式软总线、文档编辑用 Continuation 迁移、日程和审批用卡片和原子化服务。安全和私有化是关键：数据端到端加密、国密、本地加密、SSO、审计、防截屏；支持私有化部署、离线模式、企业自有推送。企业场景优先保安全和稳定。

