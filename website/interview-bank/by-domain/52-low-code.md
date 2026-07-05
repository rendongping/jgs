# 低代码 面试题

> 本题库共收录 **32** 道面试题（基础 8 / 进阶 8 / 深入 8 / 架构 8）。
> 本文件收录低代码（Low-Code / No-Code）相关面试题，目标题量 32 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、框架原理题、性能优化题、安全题、工程化题、软技能题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-52-CO-B-001：低代码（Low-Code）和无代码（No-Code）有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：52 低代码
**标签**：低代码、无代码、概念对比、开发模式
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释低代码（Low-Code）和无代码（No-Code）的核心区别，并说明它们各自适合什么样的场景和人群。

**参考答案**：

低代码和无代码都强调通过可视化、拖拽、配置等方式减少手写代码量，但目标人群和灵活度不同。

| 维度 | 低代码（Low-Code） | 无代码（No-Code） |
|------|-------------------|------------------|
| 目标用户 | 专业开发者、IT 人员 | 业务人员、 citizen developer |
| 代码参与度 | 仍需写代码处理复杂逻辑、扩展、集成 | 尽量不写代码，完全配置化 |
| 灵活性 | 高，可二次开发、出码、写自定义插件 | 低，受平台能力限制 |
| 典型场景 | 企业级应用、复杂审批、与中后台系统集成 | 简单表单、H5、营销页、轻量小程序 |
| 可维护性 | 较强，有版本、代码仓库、CI/CD | 依赖平台，迁移成本高 |
| 代表产品 | OutSystems、Mendix、宜搭、微搭 | Notion、Airtable、简道云 |

核心差异一句话概括：
- 低代码是“少写代码”，用可视化提升开发效率，但保留专业开发入口。
- 无代码是“不写代码”，让业务人员自助搭建，但扩展天花板低。

最佳实践：
- 复杂业务系统优先选低代码，保证可扩展和可出码。
- 临时性、轻量、个人或部门级应用可选无代码。
- 企业内两者常组合使用：无代码做轻量表单，低代码做核心系统。

**评分维度**：
- 能准确区分目标用户和代码参与度（40%）
- 能说出典型场景和代表产品（30%）
- 能结合企业实践给出选型建议（30%）

**常见错误**：
- 认为低代码就是完全不用写代码。
- 把低代码和无代码混为一谈。
- 忽略无代码在复杂场景下的扩展瓶颈。

**延伸追问**：
- 如果业务人员用无代码搭了一个关键流程，后期要接入公司统一权限体系，你会怎么处理？
- 低代码平台如何保证生成的应用可维护？

**相关题目**：
- [FB-52-CO-B-002 什么是搭建协议 Schema](#FB-52-CO-B-002)
- [FB-52-CP-R-006 低代码平台自研还是采购](#FB-52-CP-R-006)

**参考资源**：
- [Gartner - Low-Code Application Platforms](https://www.gartner.com/en/newsroom/low-code-application-platforms)
- [Forrester - Low-Code Development Platforms](https://www.forrester.com/low-code-development-platforms/)

**口头回答版**：
> 低代码和无代码都是减少手写代码、用可视化方式搭应用，但目标人群不一样。低代码主要给开发者用，复杂逻辑还能写代码扩展，适合企业级系统；无代码面向业务人员，尽量不写代码，适合做简单表单、H5。简单说，低代码是“少写代码”，无代码是“不写代码”。复杂业务我建议用低代码，保证能扩展、能出码、能进 CI/CD。

---

### FB-52-CO-B-002：什么是搭建协议（Schema）？它在低代码平台中起什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：52 低代码
**标签**：低代码、Schema、搭建协议、DSL、JSON
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释低代码平台中的“搭建协议”或“Schema”是什么，并说明它在设计态和运行态分别起什么作用。

**参考答案**：

搭建协议（Schema）是低代码平台用来描述页面、组件、数据、交互的**结构化数据协议**，通常以 JSON 形式存在。它是设计器、渲染器、出码器之间的“通用语言”。

Schema 的核心作用：

1. **设计态**：设计器读取和写入 Schema。
   - 拖拽组件时，向 Schema 中插入节点。
   - 属性面板修改时，更新对应节点的 props。
   - 画布根据 Schema 实时渲染预览。

2. **运行态**：渲染器解析 Schema 生成真实 UI。
   - 根据 `componentName` 查找组件映射表。
   - 将 `props`、`children`、`style` 等注入组件。
   - 处理事件绑定、数据绑定、联动逻辑。

3. **出码态**：代码生成器将 Schema 转译为可维护源码。
   - 例如转译为 React / Vue / 小程序代码。

一个最简单的页面 Schema 示例：

```json
{
  "componentName": "Page",
  "props": { "title": "用户列表" },
  "children": [
    {
      "componentName": "Button",
      "props": { "type": "primary", "text": "新增用户" },
      "events": {
        "onClick": { "action": "openModal", "args": ["addUser"] }
      }
    },
    {
      "componentName": "Table",
      "props": { "dataSource": "&#123;&#123; users &#125;&#125;" }
    }
  ]
}
```

Schema 设计的关键原则：
- **稳定**：协议升级要向后兼容。
- **完整**：能表达页面结构、样式、交互、数据、生命周期。
- **可扩展**：支持自定义组件、自定义属性、自定义动作。
- **可迁移**：尽量对齐社区标准（如 JSON Schema、React/Vue 组件结构）。

**评分维度**：
- 能说明 Schema 是结构化协议并用于描述页面（40%）
- 能区分设计态、运行态、出码态三个作用（40%）
- 能给出 Schema 示例并说明关键字段（20%）

**常见错误**：
- 认为 Schema 只是组件树，忽略数据、事件、生命周期。
- 把 Schema 和 UI 代码混为一谈。
- 设计 Schema 时不考虑版本兼容性。

**延伸追问**：
- Schema 和 JSX / Vue SFC 有什么本质区别？
- 如果 Schema 协议要升级，如何做到向后兼容？

**相关题目**：
- [FB-52-CO-B-003 组件物料的构成](#FB-52-CO-B-003)
- [FB-52-CD-B-007 手写 Schema 渲染器](#FB-52-CD-B-007)

**参考资源**：
- [JSON Schema](https://json-schema.org/)
- [阿里巴巴低代码引擎 - 协议栈](https://lowcode-engine.cn/site/docs/guide/design/protocol)

**口头回答版**：
> 搭建协议，也叫 Schema，就是低代码平台用 JSON 来描述页面长什么样、有什么组件、组件什么属性、绑了什么数据、有什么交互。它是设计器、渲染器和出码器之间的通用语言。设计态设计器读写它，运行态渲染器根据它生成真实页面，出码态把它转成 React 或 Vue 代码。设计 Schema 要稳定、可扩展、向后兼容。

---

### FB-52-CO-B-003：低代码平台的组件物料一般由哪些部分组成？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：52 低代码
**标签**：低代码、组件物料、元数据、属性面板、设计器
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明低代码平台中“组件物料”的构成，以及每个部分分别服务于设计器、渲染器还是出码器。

**参考答案**：

组件物料是低代码平台可拖拽、可渲染的最小单元。一个完整的物料通常包含三部分：运行时组件、物料元数据、配置描述。

1. **运行时组件（Runtime Component）**
   - 真实负责 UI 渲染的组件，通常是 React / Vue / 原生 Web Component。
   - 服务**渲染器**和**画布预览**。
   - 示例：`Input`、`Button`、`Table` 等。

2. **物料元数据（Material Meta）**
   - 描述组件的基本信息：组件名、图标、分组、包名、版本、依赖。
   - 服务**设计器组件面板**，决定组件展示在哪里、如何分组。

3. **配置描述（Configure / Setter Schema）**
   - 描述属性面板如何渲染该组件的属性。
   - 包括每个属性的类型、默认值、可选值、联动显示规则。
   - 服务**属性面板**。

示例：一个 Input 物料的完整定义

```json
{
  "componentName": "Input",
  "title": "输入框",
  "icon": "InputIcon",
  "group": "基础组件",
  "npm": {
    "package": "@alilc/lowcode-materials",
    "version": "1.0.0",
    "exportName": "Input"
  },
  "props": [
    {
      "name": "placeholder",
      "title": "占位提示",
      "setter": "StringSetter",
      "defaultValue": "请输入"
    },
    {
      "name": "size",
      "title": "尺寸",
      "setter": {
        "componentName": "SelectSetter",
        "props": { "options": ["small", "middle", "large"] }
      },
      "defaultValue": "middle"
    }
  ],
  "configure": {
    "supports": { "events": ["onChange", "onFocus", "onBlur"] }
  }
}
```

设计器、渲染器、出码器分别使用物料的不同部分：

| 工具 | 使用物料的哪部分 |
|------|-----------------|
| 设计器组件面板 | 物料元数据 |
| 属性面板 | 配置描述（Setter Schema） |
| 画布预览 / 运行态 | 运行时组件 |
| 出码器 | 运行时组件名 + props 映射 |

最佳实践：
- 运行时组件与物料描述解耦，同一组件可配多套物料描述。
- 物料元数据要支持版本管理，避免组件升级后旧 Schema 无法解析。
- Setter 要尽量复用，不要为每个组件重复造轮子。

**评分维度**：
- 能说出运行时组件、物料元数据、配置描述三部分（40%）
- 能说明每部分服务的工具（30%）
- 能给出物料定义的示例并解释关键字段（30%）

**常见错误**：
- 只关注运行时组件，忽略物料元数据和配置描述。
- 把组件 props 和 Setter 配置混为一谈。
- 物料没有版本字段，导致升级后无法回滚。

**延伸追问**：
- 如果一个组件在渲染器和设计器里行为不一样，怎么设计？
- 物料如何进行版本管理和灰度发布？

**相关题目**：
- [FB-52-CO-B-002 什么是搭建协议 Schema](#FB-52-CO-B-002)
- [FB-52-CO-A-002 属性面板设计](#FB-52-CO-A-002)

**参考资源**：
- [低代码引擎 - 物料设计](https://lowcode-engine.cn/site/docs/guide/design/material)
- [Ant Design 组件设计](https://ant.design/docs/spec/introduce)

**口头回答版**：
> 低代码平台的组件物料一般包括三部分：运行时组件、物料元数据、配置描述。运行时组件是真正渲染 UI 的；物料元数据告诉设计器组件叫什么名字、图标、分组；配置描述告诉属性面板这个组件有哪些属性、怎么编辑。设计器用元数据和配置描述，渲染器用运行时组件，出码器把它们拼成代码。物料一定要解耦，还要做版本管理。

---

### FB-52-CO-B-004：属性面板（Setter）在低代码平台中的作用是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：52 低代码
**标签**：低代码、属性面板、Setter、表单、配置
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明低代码平台中属性面板的作用，以及常见的 Setter 类型有哪些。

**参考答案**：

属性面板（Setter Panel）是低代码设计器中用于**编辑选中组件属性**的区域。用户选中画布上的组件后，属性面板根据该组件物料的 `props` 配置动态生成表单，让用户通过填写、选择、绑定变量等方式配置组件行为。

属性面板的核心职责：

1. **动态渲染配置表单**：根据物料配置描述生成对应的表单控件。
2. **数据绑定支持**：支持把属性绑定到变量、表达式、数据源。
3. **联动与校验**：根据其他属性值动态显示/隐藏/禁用某些配置项。
4. **实时同步**：修改属性后实时更新 Schema 和画布预览。

常见 Setter 类型：

| Setter | 用途 |
|--------|------|
| StringSetter | 字符串输入 |
| NumberSetter | 数字输入 |
| BooleanSetter | 开关 |
| SelectSetter | 下拉选择 |
| RadioSetter / CheckboxSetter | 单选 / 多选 |
| ColorSetter | 颜色选择 |
| JSONSetter | JSON 编辑器 |
| ExpressionSetter | 表达式输入，如 `&#123;&#123; user.name &#125;&#125;` |
| EventSetter | 事件动作编排 |
| ImageSetter / IconSetter | 图片 / 图标选择 |

数据绑定示例：

```json
{
  "name": "title",
  "title": "标题",
  "setter": "StringSetter",
  "defaultValue": "默认标题",
  "supportVariable": true
}
```

用户在属性面板里可以输入普通文本，也可以输入 `&#123;&#123; currentUser.name &#125;&#125;` 绑定到变量。

最佳实践：
- Setter 要组件化、可注册，便于扩展自定义 Setter。
- 属性变更最好走统一的 `onChange` 通道，避免各个 Setter 各自改 Schema。
- 复杂属性支持表达式和变量绑定，但不能让用户随意写任意 JS，防止 XSS。

**评分维度**：
- 能说明属性面板是编辑组件属性的区域（40%）
- 能列举 4 种以上常见 Setter（30%）
- 能提到数据绑定和实时同步（30%）

**常见错误**：
- 认为属性面板就是静态表单，忽略动态生成和数据绑定。
- 表达式输入不做任何安全过滤。
- Setter 设计得过于零散，无法复用。

**延伸追问**：
- 如果某个属性的可选项依赖另一个属性，Setter 怎么设计？
- 属性面板里的表达式如何安全执行？

**相关题目**：
- [FB-52-CO-B-003 组件物料的构成](#FB-52-CO-B-003)
- [FB-52-SC-A-005 如何实现字段联动](#FB-52-SC-A-005)

**参考资源**：
- [低代码引擎 - Setter 设计](https://lowcode-engine.cn/site/docs/guide/design/setter)
- [Formily - 表单设计器](https://formilyjs.org/)

**口头回答版**：
> 属性面板就是设计器右边用来编辑选中组件属性的地方。用户选中一个组件，属性面板根据这个组件物料的配置描述动态生成表单，比如字符串输入、下拉选择、颜色选择这些 Setter。它还支持把属性绑定到变量或表达式，改了之后要实时同步到 Schema 和画布。常见 Setter 有 StringSetter、SelectSetter、BooleanSetter、ExpressionSetter、EventSetter 等。

---

### FB-52-CO-B-005：低代码平台中的数据绑定有哪些常见方式？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：52 低代码
**标签**：低代码、数据绑定、表达式、变量、数据源
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明低代码平台中常见的数据绑定方式，并对比它们的优缺点和适用场景。

**参考答案**：

数据绑定是把页面元素和数据源关联起来的机制，让 UI 能随数据变化自动更新。低代码平台常见的绑定方式有四种：静态值绑定、变量绑定、表达式绑定、数据源绑定。

| 绑定方式 | 说明 | 示例 | 适用场景 |
|---------|------|------|---------|
| 静态值 | 直接写死值 | `"hello"` | 固定文案、默认配置 |
| 变量绑定 | 绑定到上下文变量 | `&#123;&#123; user.name &#125;&#125;` | 表单回显、用户信息展示 |
| 表达式绑定 | 支持简单运算和函数调用 | `&#123;&#123; items.length > 0 ? '有数据' : '无数据' &#125;&#125;` | 条件渲染、简单计算 |
| 数据源绑定 | 绑定到 API / 远程数据源 | `dataSource: "api://users/list"` | 表格、列表、远程搜索 |

示例对比：

```json
{
  "componentName": "Text",
  "props": {
    "content": {
      "type": "variable",
      "value": "user.name"
    }
  }
}
```

```json
{
  "componentName": "Table",
  "props": {
    "dataSource": {
      "type": "dataSource",
      "id": "ds_userList",
      "params": { "pageSize": 10 }
    }
  }
}
```

数据绑定的实现要点：

1. **解析器（Parser）**：把 `&#123;&#123; &#125;&#125;` 或 `dataSource://` 语法解析为可执行表达式。
2. **上下文（Context）**：维护页面可用变量，如 `state`、`props`、`context`、`urlParams`。
3. **响应式更新**：数据变化后通知依赖该数据的组件重新渲染。
4. **错误处理**：表达式执行失败时不能导致整个页面崩溃，要有降级展示。

最佳实践：
- 简单场景用静态值或变量绑定，复杂计算用表达式绑定。
- 远程数据统一抽象为数据源，便于做缓存、分页、错误处理、权限控制。
- 表达式执行要沙箱化，避免用户输入任意代码带来的安全风险。

**评分维度**：
- 能说出 4 种常见数据绑定方式（40%）
- 能对比优缺点和适用场景（30%）
- 能说明解析器和上下文的作用（30%）

**常见错误**：
- 所有数据都走表达式绑定，导致可读性差、难以调试。
- 数据源和变量没有统一抽象，每个组件各自管理请求。
- 表达式执行没有错误边界，一个字段写错导致整页白屏。

**延伸追问**：
- 如果表达式里访问了一个不存在的变量，应该怎么处理？
- 数据源绑定如何做缓存和去重请求？

**相关题目**：
- [FB-52-CO-B-002 什么是搭建协议 Schema](#FB-52-CO-B-002)
- [FB-52-SC-A-005 如何实现字段联动](#FB-52-SC-A-005)

**参考资源**：
- [Formily - 响应式表单](https://formilyjs.org/)
- [低代码引擎 - 数据绑定](https://lowcode-engine.cn/site/docs/guide/design/datasource)

**口头回答版**：
> 低代码平台数据绑定主要有四种：静态值、变量绑定、表达式绑定、数据源绑定。静态值就是写死；变量绑定是 `&#123;&#123; user.name &#125;&#125;` 这种；表达式可以做简单运算；数据源绑定是接 API。简单展示用变量，复杂计算用表达式，远程数据统一走数据源。实现时要有一个解析器、一个上下文管理变量，表达式执行要沙箱化、要有错误处理。

---

### FB-52-CA-B-006：下面 Schema 渲染后的结果是什么？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：52 低代码
**标签**：低代码、Schema、渲染器、代码分析、表达式
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

某低代码平台的 Schema 如下：

```json
{
  "componentName": "Page",
  "state": {
    "count": 1,
    "visible": false
  },
  "children": [
    {
      "componentName": "Text",
      "props": {
        "content": "&#123;&#123; count + 1 &#125;&#125;"
      }
    },
    {
      "componentName": "Button",
      "condition": "&#123;&#123; visible &#125;&#125;",
      "props": {
        "text": "提交"
      }
    },
    {
      "componentName": "Button",
      "props": {
        "text": "增加",
        "onClick": {
          "action": "setState",
          "args": ["count", "&#123;&#123; count + 1 &#125;&#125;"]
        }
      }
    }
  ]
}
```

假设平台支持 `&#123;&#123; &#125;&#125;` 表达式绑定、`condition` 条件渲染、`setState` 动作，请问：
1. 页面初次渲染时，`Text` 组件显示什么内容？`提交` 按钮是否显示？
2. 点击`增加`按钮一次后，`Text` 内容变成什么？

**参考答案**：

1. 初次渲染：
   - `Text` 的 `content` 绑定 `&#123;&#123; count + 1 &#125;&#125;`，`count` 初始为 1，所以显示 **2**。
   - `提交` 按钮的 `condition` 绑定 `&#123;&#123; visible &#125;&#125;`，`visible` 初始为 `false`，所以**不显示**。

2. 点击`增加`按钮后：
   - 执行 `setState`，将 `count` 更新为 `&#123;&#123; count + 1 &#125;&#125;`，即 2。
   - `Text` 重新渲染，显示 `2 + 1 = 3`。

关键点：
- `condition` 控制组件是否渲染，值为 falsy 时不渲染。
- `setState` 的 `args` 里第二个参数是表达式，需要先解析再赋值。
- 表达式中的变量来自页面 `state`。

常见执行流程：

```text
初始化 state -> 解析表达式 -> 渲染组件 -> 触发动作 -> 更新 state -> 重新解析表达式 -> 重新渲染
```

**评分维度**：
- 正确判断初次渲染结果（40%）
- 正确判断点击后结果（40%）
- 能解释 condition 和 setState 的执行机制（20%）

**常见错误**：
- 认为 `condition` 是 CSS 显示隐藏，实际是是否渲染。
- 忽略 `setState` 的第二个参数是表达式，需要先求值。
- 认为 `count + 1` 是字符串拼接而不是数值运算。

**延伸追问**：
- 如果 `condition` 写成 `"&#123;&#123; !visible &#125;&#125;"`，结果会怎样？
- `setState` 动作为什么不直接写死为 `2`，而是用表达式？

**相关题目**：
- [FB-52-CO-B-005 数据绑定方式](#FB-52-CO-B-005)
- [FB-52-CD-B-007 手写 Schema 渲染器](#FB-52-CD-B-007)

**参考资源**：
- [JSONata - JSON 查询和转换表达式](http://jsonata.org/)
- [低代码引擎 - 渲染器](https://lowcode-engine.cn/site/docs/guide/design/renderer)

**口头回答版**：
> 初次渲染时，Text 显示 2，因为 count 是 1，`count + 1` 等于 2；提交按钮不显示，因为 visible 是 false，condition 为 false 时不渲染。点击增加按钮后，count 变成 2，Text 会重新渲染显示 3。这里要注意 condition 是控制是否渲染，不是 display none；setState 的第二个参数是表达式，要先求值再更新。

---

### FB-52-CD-B-007：请手写一个简单的 Schema 渲染器

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：52 低代码
**标签**：低代码、Schema、渲染器、React、递归
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
给定一个低代码 Schema 和组件映射表，请用 React 实现一个递归渲染器 `Renderer`，支持解析 `componentName`、`props`、`children`、`condition`。

**参考答案**：

假设 Schema 结构如下：

```json
{
  "componentName": "Page",
  "props": { "title": "首页" },
  "children": [
    {
      "componentName": "Text",
      "props": { "content": "Hello Low-Code" }
    },
    {
      "componentName": "Button",
      "condition": "&#123;&#123; showBtn &#125;&#125;",
      "props": { "text": "点击我" }
    }
  ]
}
```

组件映射表：

```jsx
const components = {
  Page: ({ children, title }) => (
    <div className="page">
      <h1>{title}</h1>
      {children}
    </div>
  ),
  Text: ({ content }) => <p>{content}</p>,
  Button: ({ text, onClick }) => <button onClick={onClick}>{text}</button>
};
```

渲染器实现：

```jsx
import React from 'react';

// 简易表达式解析器：把 &#123;&#123; expr &#125;&#125; 替换成 context 中的值
function parseExpression(value, context = {}) {
  if (typeof value !== 'string') return value;
  const match = value.trim().match(/^\{\{\s*(.+?)\s*\}\}$/);
  if (!match) return value;
  const expr = match[1];
  try {
    // 简易实现：用 new Function 在 context 上下文中执行
    const keys = Object.keys(context);
    const values = keys.map(k => context[k]);
    const fn = new Function(...keys, `return (${expr})`);
    return fn(...values);
  } catch (e) {
    console.error('表达式解析失败', expr, e);
    return undefined;
  }
}

// 递归解析 props 中的表达式
function parseProps(props, context) {
  if (!props) return {};
  const result = {};
  for (const key of Object.keys(props)) {
    result[key] = parseExpression(props[key], context);
  }
  return result;
}

function Renderer({ schema, context = {} }) {
  const { componentName, props, children, condition } = schema;

  // 条件渲染
  if (condition !== undefined) {
    const visible = parseExpression(condition, context);
    if (!visible) return null;
  }

  const Component = components[componentName];
  if (!Component) {
    console.warn(`未找到组件: ${componentName}`);
    return null;
  }

  const parsedProps = parseProps(props, context);
  const renderedChildren = Array.isArray(children)
    ? children.map((child, index) => (
        <Renderer key={index} schema={child} context={context} />
      ))
    : children;

  return <Component {...parsedProps}>{renderedChildren}</Component>;
}

export default Renderer;
```

使用方式：

```jsx
<Renderer
  schema={pageSchema}
  context=&#123;&#123; showBtn: true &#125;&#125;
/>
```

关键点：
- 用递归处理 `children`。
- `condition` 先求值，为 falsy 时直接返回 null。
- `parseProps` 递归或遍历处理 props 中的表达式。
- 生产环境建议用更安全的沙箱表达式引擎替换 `new Function`。

**评分维度**：
- 能实现递归渲染 children（30%）
- 能解析 props 中的表达式（30%）
- 能处理 condition 条件渲染（20%）
- 能提到安全沙箱和错误处理（20%）

**常见错误**：
- 没有递归处理 children，只渲染一层。
- 表达式解析用 `eval`，存在安全风险。
- 没有处理组件找不到的兜底情况。
- `key` 使用数组 index，在列表动态变化时可能有问题。

**延伸追问**：
- 如果 props 里嵌套对象也有表达式，怎么递归解析？
- 如何避免 `new Function` 带来的 XSS 风险？

**相关题目**：
- [FB-52-CA-B-006 Schema 渲染结果分析](#FB-52-CA-B-006)
- [FB-52-FS-P-001 渲染引擎原理](#FB-52-FS-P-001)

**参考资源**：
- [React 官方文档 - 组件组合](https://react.dev/learn/thinking-in-react)
- [低代码引擎 - 渲染器设计](https://lowcode-engine.cn/site/docs/guide/design/renderer)

**口头回答版**：
> 手写 Schema 渲染器，核心是递归。拿到一个 Schema 节点，先看 condition 满不满足；不满足就不渲染。然后用 componentName 去组件映射表里找组件，解析 props 里的表达式，再递归渲染 children。表达式解析我示例里用了 new Function，但生产环境要换成安全的沙箱引擎。还要注意组件找不到时的兜底处理。

---

### FB-52-SC-B-008：如何设计一个低代码表单设计器？

**题型**：场景设计题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：52 低代码
**标签**：低代码、表单设计器、Schema、拖拽、场景设计
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请设计一个低代码表单设计器，支持从左侧组件面板拖拽字段到画布、编辑字段属性、预览表单效果。请说明核心模块和它们之间的关系。

**参考答案**：

表单设计器可以拆分为五个核心模块：组件面板、画布、属性面板、Schema 状态管理、预览渲染器。

1. **组件面板（Component Panel）**
   - 展示可用字段组件，如输入框、下拉框、日期选择、单选、多选等。
   - 支持拖拽（Drag & Drop）到画布。
   - 每个组件对应一个物料定义，包含字段默认值和 Setter 配置。

2. **画布（Canvas）**
   - 渲染当前表单 Schema 的预览效果。
   - 支持选中字段、拖拽排序、删除字段。
   - 区分设计态和运行态：设计态显示拖拽手柄、选中态、删除按钮。

3. **属性面板（Setter Panel）**
   - 选中字段后，根据字段的物料配置渲染属性表单。
   - 支持编辑 label、字段名、默认值、占位符、校验规则、联动规则等。

4. **Schema 状态管理**
   - 维护当前表单的 JSON Schema，是各模块的单一数据源。
   - 提供增删改查字段的 API，如 `addField`、`removeField`、`updateField`、`moveField`。

5. **预览渲染器（Preview Renderer）**
   - 根据 Schema 渲染真实表单，通常复用运行时渲染器。
   - 支持表单校验、提交、重置。

模块关系图：

```text
组件面板 ──拖拽──> 画布 ──选中──> 属性面板
     │                │              │
     └──── 操作 Schema 状态 <─────────┘
                   │
              预览渲染器
```

示例 Schema：

```json
{
  "fields": [
    {
      "key": "name",
      "label": "姓名",
      "component": "Input",
      "props": { "placeholder": "请输入姓名" },
      "rules": [{ "required": true, "message": "姓名不能为空" }]
    },
    {
      "key": "gender",
      "label": "性别",
      "component": "Select",
      "props": {
        "options": [
          { "label": "男", "value": "male" },
          { "label": "女", "value": "female" }
        ]
      }
    }
  ]
}
```

最佳实践：
- Schema 是单一数据源，避免各模块各自维护状态。
- 组件面板和属性面板都要基于物料配置，便于扩展新字段。
- 画布拖拽排序要实时更新 Schema 中字段顺序。
- 预览功能要和最终运行态使用同一套渲染器，保证所见即所得。

**评分维度**：
- 能说出 4 个以上核心模块（30%）
- 能说明模块之间的关系（30%）
- 能给出表单 Schema 示例（20%）
- 能提到设计态和运行态的区分（20%）

**常见错误**：
- 画布和预览渲染器用两套实现，导致预览和实际运行不一致。
- 属性面板写死字段配置，无法扩展新组件。
- 没有统一的 Schema 状态管理，数据流混乱。

**延伸追问**：
- 表单设计器里怎么做字段拖拽排序？
- 如果字段配置里要支持自定义校验规则，Setter 怎么设计？

**相关题目**：
- [FB-52-CO-B-004 属性面板的作用](#FB-52-CO-B-004)
- [FB-52-SC-A-005 如何实现字段联动](#FB-52-SC-A-005)

**参考资源**：
- [Formily - 表单设计器](https://formilyjs.org/)
- [Vue Formulate](https://vueformulate.com/)

**口头回答版**：
> 表单设计器主要分五个模块：组件面板、画布、属性面板、Schema 状态管理、预览渲染器。组件面板提供可拖拽字段；画布展示表单并支持选中、排序、删除；属性面板编辑选中字段的属性；Schema 状态管理是单一数据源；预览渲染器根据 Schema 渲染真实表单。关键是预览和运行要用同一套渲染器，保证所见即所得，Schema 要统一维护。

---
## 进阶题（8 道）{#advanced}

### FB-52-CO-A-001：低代码平台中的事件与动作编排机制是如何工作的？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：52 低代码
**标签**：低代码、事件编排、动作编排、Action、事件总线
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明低代码平台中事件与动作编排的设计思路，包括事件如何触发、动作如何定义和执行、动作之间如何传递数据。

**参考答案**：

事件与动作编排是低代码平台实现交互逻辑的核心。用户不需要写代码，而是通过配置“当什么事件发生时，执行什么动作”来完成交互。

核心概念：

1. **事件（Event）**
   - 组件对外暴露的触发点，如 `onClick`、`onChange`、`onSubmit`。
   - 事件由用户操作或组件内部状态变化触发。

2. **动作（Action）**
   - 事件触发后执行的逻辑单元，如 `setState`、`openModal`、`callDataSource`、`navigate`。
   - 每个动作有类型和参数。

3. **动作链（Action Chain）**
   - 一个事件可以触发多个动作，按顺序执行。
   - 支持条件分支、循环、异常处理。

4. **上下文（Context）**
   - 动作执行时共享的数据环境，包含 `state`、`props`、`eventArgs`、`dataSource` 结果等。

示例 Schema：

```json
{
  "componentName": "Button",
  "props": {
    "text": "查询"
  },
  "events": {
    "onClick": [
      {
        "actionType": "validate",
        "args": ["searchForm"]
      },
      {
        "actionType": "callDataSource",
        "args": ["ds_userList"],
        "outputs": { "list": "result.data" }
      },
      {
        "actionType": "setState",
        "args": ["users", "&#123;&#123; list &#125;&#125;"]
      }
    ]
  }
}
```

动作执行器（Action Executor）的核心逻辑：

```js
async function executeActions(actions, context) {
  for (const action of actions) {
    const handler = actionRegistry[action.actionType];
    if (!handler) throw new Error(`未知动作: ${action.actionType}`);

    // 解析动作参数中的表达式
    const parsedArgs = action.args.map(arg => parseExpression(arg, context));

    // 执行动作，并更新上下文
    const result = await handler(...parsedArgs);
    Object.assign(context, result);

    // 处理动作输出映射
    if (action.outputs) {
      for (const [key, expr] of Object.entries(action.outputs)) {
        context[key] = parseExpression(expr, context);
      }
    }
  }
}
```

最佳实践：
- 动作要注册化，便于扩展自定义动作。
- 动作执行支持同步和异步，支持 `await`。
- 复杂业务逻辑建议支持“自定义动作”或“脚本动作”，但要在沙箱中执行。
- 动作链要有错误处理和中断机制。

**评分维度**：
- 能说明事件、动作、动作链、上下文四个概念（40%）
- 能给出事件编排的 Schema 示例（30%）
- 能说明动作执行器的基本逻辑（30%）

**常见错误**：
- 事件和动作混在一起，概念不清晰。
- 动作之间没有上下文传递，导致数据无法流转。
- 异步动作没有 await，导致执行顺序混乱。
- 自定义动作没有沙箱隔离，存在安全风险。

**延伸追问**：
- 如果某个动作执行失败，后面的动作还执行吗？
- 动作链里如何做条件分支和循环？

**相关题目**：
- [FB-52-CO-B-005 数据绑定方式](#FB-52-CO-B-005)
- [FB-52-SC-A-005 如何实现字段联动](#FB-52-SC-A-005)

**参考资源**：
- [低代码引擎 - 事件与动作](https://lowcode-engine.cn/site/docs/guide/design/event)
- [阿里巴巴 Formily - 联动](https://formilyjs.org/)

**口头回答版**：
> 事件与动作编排就是“当组件发生什么事件，就执行一系列动作”。事件比如 onClick、onChange；动作比如设状态、调接口、打开弹窗。一个事件可以配多个动作组成动作链，按顺序执行。动作之间靠上下文传数据，比如前一个动作调接口拿到结果，后一个动作把结果设到状态里。动作要注册化，支持同步异步，自定义动作要放沙箱里执行。

---

### FB-52-CO-A-002：低代码表单设计器中的关键技术点有哪些？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：52 低代码
**标签**：低代码、表单设计器、校验、联动、字段模型
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明设计一个低代码表单设计器时需要重点关注哪些技术点，如字段模型、校验、联动、布局等。

**参考答案**：

低代码表单设计器的技术点可以分为六个方面：字段模型、校验体系、联动机制、布局系统、数据源、扩展机制。

1. **字段模型（Field Model）**
   - 每个表单字段对应一个模型，包含 `key`、`label`、`component`、`props`、`rules`、`value`。
   - 表单数据通常用集中式模型管理，如 Formily 的 Field / Form 模型。
   - 支持字段级状态：touched、dirty、validating、errors。

2. **校验体系（Validation）**
   - 支持必填、正则、长度、范围、自定义函数校验。
   - 支持字段级校验和表单级校验。
   - 支持同步校验和异步校验。
   - 校验规则可配置化，用 JSON 描述：

```json
{
  "rules": [
    { "required": true, "message": "必填" },
    { "pattern": "^1[3-9]\\d{9}$", "message": "手机号格式错误" }
  ]
}
```

3. **联动机制（Linkage）**
   - 字段显示/隐藏、禁用、选项变化、值变化等依赖其他字段。
   - 联动规则可用表达式或函数描述：

```json
{
  "key": "companyName",
  "visible": "&#123;&#123; type === 'enterprise' &#125;&#125;"
}
```

4. **布局系统（Layout）**
   - 支持栅格布局、分组、标签页、卡片。
   - Schema 中引入容器组件，如 `Grid`、`FormItem`、`Card`。

5. **数据源（Data Source）**
   - 下拉框、单选、多选的选项可来自静态数据或远程接口。
   - 支持字段级数据加载、分页、搜索。

6. **扩展机制（Extension）**
   - 支持注册自定义字段组件。
   - 支持注册自定义校验规则。
   - 支持自定义联动函数。

最佳实践：
- 字段模型和 UI 渲染解耦，便于同一份 Schema 渲染不同 UI。
- 校验规则尽量用成熟库（如 yup、zod、ajv）解析。
- 联动规则尽量用响应式机制实现，避免轮询或手动触发。
- 大数据表单注意虚拟化或分片渲染。

**评分维度**：
- 能说出 4 个以上关键技术点（30%）
- 能详细说明校验和联动机制（35%）
- 能提到字段模型和扩展机制（20%）
- 能给出 JSON 示例（15%）

**常见错误**：
- 直接用 UI 组件的 state 管理表单数据，导致校验和联动难以实现。
- 联动规则写死成一堆 if-else，难以维护。
- 忽略异步校验和表单级校验。

**延伸追问**：
- 表单的联动规则很多时，如何避免性能问题？
- 如果两个字段互相联动，会不会出现循环依赖？

**相关题目**：
- [FB-52-SC-B-008 设计一个表单设计器](#FB-52-SC-B-008)
- [FB-52-SC-A-005 如何实现字段联动](#FB-52-SC-A-005)

**参考资源**：
- [Formily - 表单解决方案](https://formilyjs.org/)
- [React Hook Form](https://react-hook-form.com/)

**口头回答版**：
> 表单设计器关键技术点有六个：字段模型、校验、联动、布局、数据源、扩展。字段模型要集中管理每个字段的状态和值；校验支持必填、正则、异步、表单级；联动用表达式控制显示隐藏禁用；布局用栅格和容器组件；选项可以接远程数据源；还要支持自定义组件和规则。核心是字段模型和 UI 解耦，校验用成熟库。

---

### FB-52-CO-A-003：低代码表格设计器需要解决哪些核心问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：52 低代码
**标签**：低代码、表格设计器、列配置、分页、数据源
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明设计一个低代码表格设计器时需要解决的核心问题，包括列配置、数据源、分页、排序、操作列等。

**参考答案**：

表格是低代码平台最常用的数据展示组件之一。表格设计器需要解决以下核心问题：

1. **列配置（Column Configuration）**
   - 每列对应一个字段，配置标题、字段名、宽度、对齐方式、格式化、渲染组件。
   - 支持列的增删改、拖拽排序、固定列、合并列。
   - 列渲染可绑定自定义组件，如 Tag、Button、Link、Image。

2. **数据源绑定（Data Source Binding）**
   - 表格数据通常来自远程 API，需要配置数据源 ID、请求参数、分页参数。
   - 支持静态数据作为调试数据。

3. **分页与加载（Pagination & Loading）**
   - 支持前端分页和后端分页。
   - 配置分页器位置、每页条数、快速跳转。
   - 加载状态、空状态、错误状态处理。

4. **排序与筛选（Sort & Filter）**
   - 列头排序：支持单字段排序、多字段排序。
   - 列头筛选：支持枚举筛选、范围筛选。
   - 排序和筛选参数需要同步到数据源请求中。

5. **操作列（Action Column）**
   - 每行可配置操作按钮，如编辑、删除、查看详情。
   - 操作按钮可绑定事件和动作编排。
   - 支持根据行数据动态显示/隐藏按钮。

6. **行选择与批量操作（Row Selection & Batch Actions）**
   - 支持单选、多选、全选。
   - 批量操作按钮如批量删除、批量导出。

示例 Schema：

```json
{
  "componentName": "Table",
  "props": {
    "dataSource": "ds_userList",
    "pagination": { "pageSize": 10, "showQuickJumper": true },
    "rowSelection": { "type": "checkbox" }
  },
  "columns": [
    { "title": "姓名", "dataIndex": "name", "width": 120 },
    { "title": "状态", "dataIndex": "status", "component": "Tag" },
    {
      "title": "操作",
      "type": "action",
      "actions": [
        { "text": "编辑", "event": "onEdit" },
        { "text": "删除", "event": "onDelete", "visible": "&#123;&#123; status !== 'deleted' &#125;&#125;" }
      ]
    }
  ]
}
```

最佳实践：
- 列配置和表格数据解耦，列配置变更不触发数据重新请求。
- 远程数据统一走数据源层，便于做权限、缓存、错误处理。
- 大数据量表格要考虑虚拟滚动。
- 操作列的权限要和平台权限体系打通。

**评分维度**：
- 能说出 5 个以上核心问题（30%）
- 能详细说明列配置和数据源（30%）
- 能说明分页、排序、筛选、操作列设计（25%）
- 能给出表格 Schema 示例（15%）

**常见错误**：
- 表格列配置写死，无法动态扩展。
- 前端分页处理大数据量，导致页面卡顿。
- 操作列按钮权限没有控制。
- 排序筛选参数和数据源没有打通。

**延伸追问**：
- 表格列很多时，如何优化首屏渲染性能？
- 如果表格数据量达到 10 万行，应该怎么设计？

**相关题目**：
- [FB-52-CO-B-005 数据绑定方式](#FB-52-CO-B-005)
- [FB-52-PE-P-006 低代码表格性能优化](#FB-52-PE-P-006)

**参考资源**：
- [Ant Design Table](https://ant.design/components/table)
- [AG Grid 高性能表格](https://www.ag-grid.com/)

**口头回答版**：
> 表格设计器要解决几个核心问题：列怎么配置，包括标题、字段、宽度、渲染组件；数据源怎么绑定，通常是远程 API；分页是前端还是后端；排序筛选参数怎么同步到请求；操作列怎么做编辑删除按钮；还有行选择、批量操作。列配置要和数据解耦，远程数据统一走数据源层，大数据量要虚拟滚动。

---

### FB-52-CD-A-004：请实现一个属性面板配置解析器

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：52 低代码
**标签**：低代码、属性面板、Setter、解析器、手写代码
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
给定一个组件的物料配置描述，请实现一个 `SetterRenderer`，能够根据配置渲染对应的表单控件，并支持表达式的显示与编辑切换。

**参考答案**：

假设物料配置描述如下：

```json
{
  "props": [
    {
      "name": "title",
      "title": "标题",
      "setter": "StringSetter",
      "defaultValue": "默认标题"
    },
    {
      "name": "size",
      "title": "尺寸",
      "setter": {
        "componentName": "SelectSetter",
        "props": { "options": ["small", "middle", "large"] }
      },
      "defaultValue": "middle"
    },
    {
      "name": "visible",
      "title": "是否显示",
      "setter": "BooleanSetter",
      "defaultValue": true
    }
  ]
}
```

Setter 组件注册表：

```jsx
const setterComponents = {
  StringSetter: ({ value, onChange }) => (
    <input value={value} onChange={e => onChange(e.target.value)} />
  ),
  NumberSetter: ({ value, onChange }) => (
    <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} />
  ),
  BooleanSetter: ({ value, onChange }) => (
    <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />
  ),
  SelectSetter: ({ value, onChange, options }) => (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  )
};
```

SetterRenderer 实现：

```jsx
import React, { useState } from 'react';

function SetterRenderer({ config, value, onChange }) {
  const { name, title, setter, defaultValue, supportVariable = true } = config;
  const [isVariable, setIsVariable] = useState(false);

  // 统一 setter 格式
  const setterConfig = typeof setter === 'string'
    ? { componentName: setter, props: {} }
    : setter;

  const SetterComponent = setterComponents[setterConfig.componentName];
  if (!SetterComponent) {
    return <div>未知 Setter: {setterConfig.componentName}</div>;
  }

  const displayValue = value !== undefined ? value : defaultValue;

  return (
    <div className="setter-item">
      <label>{title}</label>
      {supportVariable && (
        <button onClick={() => setIsVariable(!isVariable)}>
          {isVariable ? '普通值' : '变量'}
        </button>
      )}
      {isVariable ? (
        <input
          value={typeof displayValue === 'string' ? displayValue : ''}
          placeholder="&#123;&#123; variable &#125;&#125;"
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <SetterComponent
          {...setterConfig.props}
          value={displayValue}
          onChange={onChange}
        />
      )}
    </div>
  );
}

// 属性面板入口
function PropsPanel({ propsConfig, values, onChange }) {
  return (
    <div className="props-panel">
      {propsConfig.map(config => (
        <SetterRenderer
          key={config.name}
          config={config}
          value={values[config.name]}
          onChange={newValue => onChange(config.name, newValue)}
        />
      ))}
    </div>
  );
}
```

关键点：
- Setter 配置支持字符串简写和对象完整写法。
- 支持变量表达式和普通值的切换。
- 属性变更统一通过 `onChange(name, value)` 回调。
- 未注册 Setter 要有兜底提示。

**评分维度**：
- 能根据配置动态选择 Setter 组件（30%）
- 能处理 setter 的字符串和对象两种格式（20%）
- 能实现普通值和变量表达式的切换（25%）
- 能统一属性变更通道（15%）
- 有错误兜底（10%）

**常见错误**：
- 每个属性单独处理，没有统一的 Setter 注册表。
- 变量表达式和普通值混用，没有切换机制。
- Setter props 透传不完整。
- 没有默认值处理。

**延伸追问**：
- 如果某个属性的 Setter 要根据另一个属性值动态变化，怎么实现？
- Setter 的值变更如何实时同步到 Schema？

**相关题目**：
- [FB-52-CO-B-004 属性面板的作用](#FB-52-CO-B-004)
- [FB-52-SC-A-005 如何实现字段联动](#FB-52-SC-A-005)

**参考资源**：
- [低代码引擎 - Setter](https://lowcode-engine.cn/site/docs/guide/design/setter)
- [React 受控组件](https://react.dev/learn/thinking-in-react)

**口头回答版**：
> 实现属性面板解析器，首先要有一个 Setter 注册表，把 StringSetter、SelectSetter 这些注册进去。然后根据物料配置里的 setter 字段动态渲染对应组件。Setter 配置可能是字符串简写，也可能是对象形式。还要支持普通值和变量表达式的切换。属性变更统一走 onChange，没注册的 Setter 要兜底提示。

---

### FB-52-SC-A-005：如何实现低代码表单中的字段联动？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：52 低代码
**标签**：低代码、表单联动、表达式、响应式、场景设计
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
在低代码表单中，经常需要根据一个字段的值动态控制另一个字段的显示、禁用、选项或值。请设计一个字段联动机制。

**参考答案**：

字段联动是表单设计器的高频需求。常见的联动类型有：显示/隐藏、禁用/启用、选项变化、值变化、校验规则变化。

联动机制可以抽象为三个要素：

1. **被依赖字段（Source）**：值变化时触发联动。
2. **联动规则（Rule）**：描述在什么条件下做什么动作。
3. **目标字段（Target）**：受规则影响的字段。

联动规则 Schema 示例：

```json
{
  "key": "companyName",
  "label": "公司名称",
  "component": "Input",
  "reactions": [
    {
      "when": "&#123;&#123; type === 'enterprise' &#125;&#125;",
      "then": { "visible": true, "required": true }
    },
    {
      "when": "&#123;&#123; type !== 'enterprise' &#125;&#125;",
      "then": { "visible": false, "value": "" }
    }
  ]
}
```

联动执行流程：

```text
源字段值变化 -> 匹配依赖该字段的规则 -> 求值 when 表达式 -> 执行 then 动作 -> 更新目标字段状态
```

实现方案：

方案一：集中式联动引擎

```js
class FormLinkageEngine {
  constructor(formModel, rules) {
    this.formModel = formModel;
    this.rules = rules;
    this.formModel.subscribe(this.run.bind(this));
  }

  run(changedField) {
    this.rules.forEach(rule => {
      if (rule.dependencies.includes(changedField)) {
        const value = this.formModel.getValue(changedField);
        const shouldApply = evaluate(rule.when, this.formModel.values);
        if (shouldApply) {
          this.applyEffect(rule.target, rule.effect);
        }
      }
    });
  }

  applyEffect(targetKey, effect) {
    const field = this.formModel.getField(targetKey);
    if ('visible' in effect) field.setVisible(effect.visible);
    if ('disabled' in effect) field.setDisabled(effect.disabled);
    if ('value' in effect) field.setValue(effect.value);
    if ('options' in effect) field.setOptions(effect.options);
  }
}
```

方案二：响应式联动（Formily 风格）
- 每个字段是响应式对象，依赖字段变化自动触发 effect。
- 用 `@formily/reactive` 或 MobX 实现。

最佳实践：
- 联动规则尽量声明式，避免写大量命令式代码。
- 支持表达式和函数两种写法，简单场景用表达式，复杂场景用函数。
- 避免循环依赖，联动引擎要能检测并告警。
- 隐藏字段的值和校验要正确处理：隐藏时不参与提交，但重新显示时要保留原值。

**评分维度**：
- 能抽象出源字段、规则、目标字段三个要素（30%）
- 能给出联动规则 Schema 示例（25%）
- 能说明集中式或响应式实现方案（30%）
- 能提到循环依赖和隐藏字段处理（15%）

**常见错误**：
- 用大量 if-else 手动控制字段状态，难以维护。
- 隐藏字段仍然参与校验和提交。
- 联动规则没有依赖声明，任何字段变化都全量重新计算。
- 两个字段互相依赖导致死循环。

**延伸追问**：
- 如果 A 字段控制 B 字段显示，B 字段控制 C 字段显示，这种链式联动怎么保证顺序？
- 联动规则很多时，如何优化性能？

**相关题目**：
- [FB-52-CO-A-002 表单设计器关键技术](#FB-52-CO-A-002)
- [FB-52-CD-A-004 属性面板配置解析器](#FB-52-CD-A-004)

**参考资源**：
- [Formily - 联动方案](https://formilyjs.org/)
- [低代码引擎 - 表单联动](https://lowcode-engine.cn/site/docs/guide/design/form)

**口头回答版**：
> 字段联动可以抽象成三个东西：被依赖字段、联动规则、目标字段。比如用户类型选了企业，公司名称字段才显示。规则用声明式 Schema 写，when 是条件表达式，then 是要做的动作，比如 visible、disabled、value、options。实现可以用集中式联动引擎，字段值变了就扫描依赖它的规则，求值后更新目标字段；也可以用响应式方案。要注意隐藏字段不参与提交，还要避免循环依赖。

---

### FB-52-PE-A-006：低代码平台有哪些常见的性能优化手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：52 低代码
**标签**：低代码、性能优化、渲染、Schema、懒加载
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明低代码平台在设计态和运行态分别可能遇到哪些性能问题，以及对应的优化手段。

**参考答案**：

低代码平台的性能问题分为设计态和运行态两个层面。

一、设计态性能优化

1. **画布渲染优化**
   - 复杂页面组件多，画布容易卡顿。
   - 用大节点树做虚拟化或按需渲染可视区域。
   - 选中态、hover 态用 CSS 而不是重渲染整个树。

2. **属性面板优化**
   - 避免每个属性变化都触发全量 Schema 序列化。
   - 用防抖（debounce）处理输入型 Setter。
   - 属性面板和画布用统一不可变数据模型，减少不必要重渲染。

3. **拖拽排序优化**
   - 拖拽过程中不要实时修改 Schema，拖拽结束后再更新。
   - 用 placeholder 占位，避免频繁 DOM 操作。

4. **Schema 体积控制**
   - 避免把运行时不需要的信息塞进 Schema。
   - 对历史版本 Schema 做压缩存储。

二、运行态性能优化

1. **渲染器优化**
   - 解析 Schema 时做缓存，相同结构复用虚拟 DOM。
   - 用 `React.memo` / `Vue` 的 `v-memo` 减少不必要重渲染。
   - 大数据列表/表格使用虚拟滚动。

2. **表达式执行优化**
   - 表达式解析结果缓存，避免每次渲染重新编译。
   - 复杂表达式提前预编译为函数。

3. **数据源优化**
   - 接口请求去重、缓存、分页。
   - 表格滚动加载、搜索防抖。

4. **按需加载**
   - 组件和物料按路由或功能懒加载。
   - 设计器功能模块按需加载。

5. **JSON 操作优化**
   - 大 Schema 用 Immutable 更新，避免深拷贝。
   - 用路径更新代替全量替换。

最佳实践：
- 性能优化前先测量，用 Chrome Performance、React DevTools Profiler 定位瓶颈。
- 设计态和运行态的性能策略不同，要分开考虑。
- 尽量减少设计态 Schema 的序列化和反序列化次数。

**评分维度**：
- 能区分设计态和运行态性能问题（30%）
- 能说出 3 个以上设计态优化手段（25%）
- 能说出 3 个以上运行态优化手段（25%）
- 能提到先测量再优化（20%）

**常见错误**：
- 一遇到卡顿就加 memo，不做根因分析。
- 设计态和运行态用同一套优化策略。
- 忽略大数据表单和表格的虚拟滚动。
- 每次属性变更都全量保存 Schema。

**延伸追问**：
- 如果画布有 1000 个组件，如何优化交互响应？
- 低代码渲染器如何避免每次表达式都重新编译？

**相关题目**：
- [FB-52-FS-P-001 渲染引擎原理](#FB-52-FS-P-001)
- [FB-52-PE-P-006 低代码表格性能优化](#FB-52-PE-P-006)

**参考资源**：
- [React 性能优化](https://react.dev/learn/render-and-commit)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance)

**口头回答版**：
> 低代码平台性能分设计态和运行态。设计态要注意画布大节点树的渲染、属性面板的防抖、拖拽排序不要实时改 Schema、Schema 体积控制。运行态要优化渲染器，用 memo 和虚拟滚动；表达式解析结果缓存；数据源做去重缓存分页；组件按需加载；Schema 更新用不可变数据。优化前一定要先测量，用 Profiler 找瓶颈。

---

### FB-52-EN-A-007：低代码平台的组件物料如何做版本管理？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：52 低代码
**标签**：低代码、物料版本、热更新、工程化、兼容性
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明低代码平台中组件物料的版本管理策略，包括如何支持多版本共存、旧 Schema 兼容、以及热更新机制。

**参考答案**：

组件物料的版本管理是低代码平台工程化的重要部分，关系到存量应用能否稳定运行。

一、版本管理策略

1. **物料包语义化版本**
   - 物料以 npm 包形式发布，遵循 SemVer（主版本.次版本.修订号）。
   - 主版本升级通常对应 Breaking Change，次版本新增特性，修订号修复 bug。

2. **Schema 中记录物料版本**
   - 每个组件节点在 Schema 中记录使用的物料包名和版本：

```json
{
  "componentName": "Button",
  "npm": {
    "package": "@company/lowcode-materials",
    "version": "1.2.3"
  },
  "props": { "type": "primary" }
}
```

3. **多版本共存**
   - 平台同时注册多个版本的物料包。
   - 渲染器根据 Schema 中的版本号加载对应版本的运行时组件。
   - 设计器也根据版本号加载对应版本的物料元数据和 Setter 配置。

4. **版本兼容层**
   - 对旧版本 Schema 做迁移（migration）处理。
   - 物料包提供 `migrate` 函数，把旧 Schema 转换到新版本。

```js
// 迁移示例：把 v1 的 size 字段映射到 v2 的 size 字段
function migrateV1ToV2(node) {
  if (node.props.size === 'default') {
    node.props.size = 'middle';
  }
  return node;
}
```

二、热更新机制

1. **设计态热更新**
   - 物料包更新后，设计器重新加载物料元数据。
   - 已经拖拽到画布的组件保持原版本，新拖拽的组件使用新版本。
   - 或提示用户一键升级存量组件到新版。

2. **运行态热更新**
   - 运行时通过 CDN 动态加载物料包的 UMD 资源。
   - 更新物料包后刷新页面即可生效，不需要重新发布应用。
   - 关键业务应用建议锁定版本，避免物料更新带来线上风险。

三、灰度发布

- 新物料版本先在小范围应用灰度。
- 通过应用配置控制使用哪个物料版本。
- 观察错误率和性能指标后再全量推广。

最佳实践：
- Schema 必须记录物料版本，不能依赖运行时默认版本。
- 物料升级要提供迁移脚本和回滚方案。
- 关键应用锁定物料版本，避免非预期更新。
- 建立物料发布审批流程和变更日志。

**评分维度**：
- 能说明 SemVer 和 Schema 中记录版本的重要性（30%）
- 能说明多版本共存和兼容层方案（30%）
- 能说明设计态和运行态热更新机制（25%）
- 能提到灰度和回滚（15%）

**常见错误**：
- Schema 不记录物料版本，依赖运行时最新版本。
- 物料 Breaking Change 不做迁移，导致旧应用报错。
- 热更新没有版本锁定，关键应用被意外更新。
- 忽略物料包的依赖版本冲突。

**延伸追问**：
- 如果两个物料包依赖同一个底层库的不同版本，怎么处理？
- 物料升级后，旧应用的 Schema 如何自动迁移？

**相关题目**：
- [FB-52-CO-B-003 组件物料的构成](#FB-52-CO-B-003)
- [FB-52-SD-R-007 低代码平台扩展性与插件化](#FB-52-SD-R-007)

**参考资源**：
- [Semantic Versioning](https://semver.org/)
- [低代码引擎 - 物料版本](https://lowcode-engine.cn/site/docs/guide/design/material)

**口头回答版**：
> 物料版本管理首先要用 SemVer 发布 npm 包，Schema 里要记录每个组件用的物料包名和版本。渲染器和设计器根据版本号加载对应版本，实现多版本共存。旧 Schema 要做迁移，物料包提供 migrate 函数。热更新方面，设计态新拖拽的组件可以用新版本，运行态通过 CDN 动态加载；但关键应用要锁定版本。还要有灰度发布和回滚机制。

---

### FB-52-SE-A-008：低代码平台需要考虑哪些安全问题？

**题型**：安全题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：52 低代码
**标签**：低代码、安全、XSS、表达式、权限
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明低代码平台在设计和运行阶段需要重点关注的安全问题，包括表达式执行、数据展示、权限控制等方面。

**参考答案**：

低代码平台因为允许用户配置页面和逻辑，扩大了攻击面，需要重点关注以下安全问题：

1. **表达式/脚本执行安全（XSS & RCE）**
   - 用户可能在表达式或自定义脚本中注入恶意代码。
   - 风险：`eval`、`new Function`、直接执行用户输入字符串。
   - 防御：
     - 使用沙箱执行表达式，限制可访问的全局变量。
     - 白名单机制，只允许访问特定上下文变量。
     - 禁止访问 `window`、`document`、`localStorage` 等敏感对象。

```js
// 危险示例
eval(userExpression);

// 安全示例：使用沙箱解析器
function safeEvaluate(expr, context) {
  const sandbox = new Proxy(context, {
    has: () => true,
    get: (target, key) => {
      if (key in target) return target[key];
      throw new Error(`禁止访问: ${String(key)}`);
    }
  });
  return new Function('context', `with(context) { return (${expr}) }`)(sandbox);
}
```

2. **数据展示安全（XSS）**
   - 用户输入的数据通过组件渲染到页面时，如果没有转义，可能触发 XSS。
   - 防御：组件默认对文本内容做 HTML 转义，富文本组件使用白名单过滤标签。

3. **接口调用安全**
   - 用户配置的数据源可能访问未授权接口。
   - 防御：
     - 数据源接口需要走平台网关，统一鉴权。
     - 后端接口自己做权限校验，不能信任前端参数。
     - 禁止前端直接配置跨域请求到任意第三方域名。

4. **权限控制**
   - 页面、按钮、数据行、字段级别都需要权限控制。
   - 权限规则应该由服务端校验，前端只作为展示控制。

5. **上传安全**
   - 图片、文件上传要限制类型、大小，服务端扫描恶意文件。
   - 上传后文件访问路径要控制权限。

6. **SSRF（服务端请求伪造）**
   - 如果平台代表用户发起请求，要限制可请求的 URL 白名单。
   - 不能让用户配置任意后端代理请求。

最佳实践：
- 安全策略默认开启，不能让用户关闭。
- 关键操作需要后端二次校验。
- 定期进行安全审计和渗透测试。
- 对用户上传、用户配置的表达式做输入校验和输出转义。

**评分维度**：
- 能说出 4 个以上安全维度（30%）
- 能详细说明表达式沙箱和 XSS 防御（35%）
- 能说明接口和权限安全（20%）
- 能提到上传和 SSRF（15%）

**常见错误**：
- 直接用 `eval` 执行用户表达式。
- 认为 XSS 只存在于输入框，忽略组件渲染的数据绑定。
- 前端做权限控制就认为安全，忽略后端校验。
- 允许用户配置任意第三方接口。

**延伸追问**：
- 如何设计一个既安全又灵活的表达式引擎？
- 如果业务需要执行自定义 JavaScript，怎么做沙箱隔离？

**相关题目**：
- [FB-52-SE-R-008 低代码平台安全架构](#FB-52-SE-R-008)
- [FB-52-CD-B-007 手写 Schema 渲染器](#FB-52-CD-B-007)

**参考资源**：
- [OWASP XSS 防御](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Google Caja - JS 沙箱](https://developers.google.com/caja/)

**口头回答版**：
> 低代码平台安全问题比较多。第一是表达式执行安全，不能用 eval，要用沙箱执行，限制能访问的变量；第二是数据展示 XSS，组件默认要转义；第三是接口调用安全，数据源要走网关鉴权，后端要二次校验；第四是页面、按钮、字段级别的权限控制；第五是上传安全；第六是 SSRF，不能让平台代理用户请求任意地址。安全策略要默认开启，关键操作后端再验。

---
## 深入题（8 道）{#proficient}

### FB-52-FS-P-001：低代码渲染引擎的核心原理是什么？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：52 低代码
**标签**：低代码、渲染引擎、Schema、虚拟 DOM、运行时
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入说明低代码渲染引擎的核心原理，包括它是如何解析 Schema、处理数据绑定、事件绑定、条件渲染和循环渲染的。

**参考答案**：

低代码渲染引擎是连接 Schema 和真实 UI 的桥梁。它的核心任务是把 JSON 描述的页面结构转换为可交互的界面。

一、核心模块

1. **Schema 解析器（Parser）**
   - 把原始 Schema 解析为内部节点树。
   - 处理循环渲染（`loop`）、条件渲染（`condition`）、插槽（slot）等语法糖。

2. **表达式引擎（Expression Engine）**
   - 解析 `&#123;&#123; &#125;&#125;` 表达式，从上下文中取值。
   - 支持变量、运算符、函数调用、过滤器。
   - 必须在沙箱中执行。

3. **组件映射表（Component Map）**
   - 根据 `componentName` 查找运行时组件。
   - 支持运行时动态注册组件。

4. **渲染器（Renderer）**
   - 递归遍历节点树，创建组件实例并传递 props。
   - 处理 children、循环、条件、事件绑定。

5. **上下文管理器（Context Manager）**
   - 维护页面级状态、URL 参数、全局变量、数据源结果。
   - 提供 `getValue`、`setValue`、`callDataSource` 等 API。

二、关键渲染流程

```text
Schema -> Parser 解析 -> 节点树
                        |
                        v
                  Renderer 递归渲染
                        |
        +---------------+---------------+
        |               |               |
   解析 props      解析 condition    解析 loop
        |               |               |
        v               v               v
   表达式求值       判断是否渲染      循环生成子节点
        |               |               |
        +---------------+---------------+
                        |
                        v
              查找组件并创建 React/Vue 节点
```

三、条件渲染与循环渲染示例

```json
{
  "componentName": "List",
  "condition": "&#123;&#123; items.length > 0 &#125;&#125;",
  "loop": "&#123;&#123; items &#125;&#125;",
  "loopArgs": ["item", "index"],
  "props": {
    "title": "&#123;&#123; item.name &#125;&#125;"
  }
}
```

渲染器处理逻辑：

```js
function renderNode(node, context) {
  // 1. 条件渲染
  if (node.condition !== undefined) {
    const visible = evaluate(node.condition, context);
    if (!visible) return null;
  }

  // 2. 循环渲染
  if (node.loop) {
    const list = evaluate(node.loop, context);
    if (!Array.isArray(list)) return null;
    return list.map((item, index) => {
      const loopContext = {
        ...context,
        [node.loopArgs[0]]: item,
        [node.loopArgs[1]]: index
      };
      return renderSingleNode(node, loopContext);
    });
  }

  return renderSingleNode(node, context);
}
```

四、事件绑定

事件绑定把组件事件映射为动作链：

```js
function bindEvents(nodeProps, eventsConfig, context) {
  const events = {};
  for (const [eventName, actions] of Object.entries(eventsConfig || {})) {
    events[eventName] = (...args) => {
      context.eventArgs = args;
      executeActions(actions, context);
    };
  }
  return events;
}
```

最佳实践：
- 渲染器和设计器画布尽量复用同一套实现，保证所见即所得。
- 表达式引擎要预编译缓存，避免每次渲染重新解析。
- 大页面使用虚拟化或分片渲染。
- 节点树解析结果可缓存，相同 Schema 不再重复解析。

**评分维度**：
- 能说出渲染引擎的 4 个以上核心模块（25%）
- 能说明 Schema 到 UI 的完整渲染流程（25%）
- 能解释条件渲染、循环渲染、事件绑定的实现（30%）
- 能提到表达式沙箱和性能优化（20%）

**常见错误**：
- 认为渲染引擎只是递归创建组件，忽略解析器和表达式引擎。
- 条件渲染用 CSS 隐藏而不是控制渲染。
- 循环渲染没有提供独立的上下文，导致变量污染。
- 事件绑定直接执行字符串代码，没有做动作编排抽象。

**延伸追问**：
- 渲染引擎如何处理组件错误边界？
- 如何实现渲染器与设计器画布共享同一套代码？

**相关题目**：
- [FB-52-CD-B-007 手写 Schema 渲染器](#FB-52-CD-B-007)
- [FB-52-SD-P-002 设计一个页面渲染引擎](#FB-52-SD-P-002)

**参考资源**：
- [低代码引擎 - 渲染器](https://lowcode-engine.cn/site/docs/guide/design/renderer)
- [React 组件组合](https://react.dev/learn/thinking-in-react)

**口头回答版**：
> 低代码渲染引擎核心是把 JSON Schema 转成真实 UI。主要模块有 Schema 解析器、表达式引擎、组件映射表、渲染器、上下文管理器。解析器把 Schema 转成节点树；表达式引擎解析 `&#123;&#123; &#125;&#125;` 里的变量；渲染器递归遍历节点树，处理条件渲染、循环渲染、事件绑定；最后根据 componentName 找到组件创建出来。循环渲染要给每次迭代创建独立上下文，事件绑定要映射到动作链。表达式要在沙箱里执行，还要做预编译缓存。

---

### FB-52-SD-P-002：如何设计一个低代码页面渲染引擎？

**题型**：系统设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：52 低代码
**标签**：低代码、渲染引擎、系统设计、运行时、组件映射
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个低代码页面渲染引擎，要求支持组件渲染、数据绑定、事件动作、生命周期、错误处理，并能够与设计态共享核心能力。

**参考答案**：

一、整体架构

```text
+---------------------+
|       Schema        |
+---------------------+
          |
          v
+---------------------+
|   Schema Parser     |  解析循环、条件、插槽
+---------------------+
          |
          v
+---------------------+
|  Expression Engine  |  解析 &#123;&#123; &#125;&#125; 表达式
+---------------------+
          |
          v
+---------------------+
|      Renderer       |  递归渲染组件树
+---------------------+
          |
          v
+---------------------+
|   Component Map     |  componentName -> 组件
+---------------------+
          |
          v
+---------------------+
|      Real UI        |
+---------------------+
```

二、核心设计

1. **Schema 协议层**
   - 定义统一的节点结构：`componentName`、`props`、`children`、`condition`、`loop`、`loopArgs`、`events`、`lifeCycles`。
   - 协议要向后兼容，升级时提供 migrate 能力。

2. **解析器（Parser）**
   - 把 Schema 解析为内部渲染节点树。
   - 处理语法糖：`loop` 展开为多个子节点，`condition` 标记跳过渲染。
   - 校验节点合法性，如 `componentName` 必填、props 类型校验。

3. **表达式引擎**
   - 支持 `&#123;&#123; &#125;&#125;` 语法。
   - 提供上下文：state、props、urlParams、dataSource、循环变量。
   - 沙箱执行，禁止访问危险全局变量。
   - 支持预编译缓存。

4. **组件映射与加载**
   - 组件映射表维护 `componentName -> Component`。
   - 支持按物料包版本加载不同组件。
   - 组件未找到时显示占位组件，不能白屏。

5. **渲染器（Renderer）**
   - 递归渲染节点树。
   - 处理 props 中的表达式、事件绑定、children。
   - 支持 Fragment、Portal、Suspense 等特殊组件。

6. **动作执行器**
   - 事件触发后按动作链顺序执行。
   - 动作类型：`setState`、`callDataSource`、`openModal`、`navigate`、`validate`。
   - 支持同步/异步、条件分支、错误处理。

7. **生命周期管理**
   - 页面级生命周期：`onPageLoad`、`onPageShow`、`onPageHide`。
   - 组件级生命周期：`onMount`、`onUnmount`、`onUpdate`。

8. **错误处理**
   - 组件错误边界捕获渲染异常。
   - 表达式执行失败返回默认值并记录日志。
   - 数据源请求失败显示友好错误状态。

三、与设计态共享

- 把解析器、表达式引擎、组件映射表抽成独立包。
- 设计态画布复用运行时渲染器，只是额外注入设计态高亮、选中等能力。
- 设计态和运行态用同一套 Schema 协议。

四、扩展机制

- 组件注册：`engine.registerComponent(name, Component, meta)`。
- 动作注册：`engine.registerAction(type, handler)`。
- 表达式函数注册：`engine.registerFunction(name, fn)`。

最佳实践：
- 渲染引擎不要依赖具体框架，核心逻辑用纯 JS 实现，UI 层用 React/Vue 适配。
- 大数据页面要支持分片渲染和虚拟滚动。
- 表达式执行失败不能阻断整页渲染。

**评分维度**：
- 能设计完整的渲染引擎架构（25%）
- 能说明解析器、表达式引擎、渲染器、动作执行器（30%）
- 能说明生命周期、错误处理、扩展机制（25%）
- 能提到与设计态共享（20%）

**常见错误**：
- 渲染引擎和框架强耦合，无法迁移。
- 没有错误边界，一个组件报错整页白屏。
- 表达式引擎直接 eval，存在安全风险。
- 设计态和运行态各写一套渲染逻辑。

**延伸追问**：
- 如果渲染引擎要同时支持 React 和 Vue，架构上怎么抽象？
- 如何处理页面级生命周期的顺序和依赖？

**相关题目**：
- [FB-52-FS-P-001 渲染引擎核心原理](#FB-52-FS-P-001)
- [FB-52-CD-B-007 手写 Schema 渲染器](#FB-52-CD-B-007)

**参考资源**：
- [低代码引擎 - 渲染器设计](https://lowcode-engine.cn/site/docs/guide/design/renderer)
- [Microcosm - 可嵌入的 JS 表达式引擎](https://github.com/josdejong/mathjs)

**口头回答版**：
> 设计渲染引擎，我会分成几层：Schema 协议层、解析器、表达式引擎、渲染器、组件映射表、动作执行器。Schema 协议要定义清楚节点结构，解析器处理循环条件这些语法糖，表达式引擎解析 `&#123;&#123; &#125;&#125;` 并在沙箱里执行，渲染器递归生成组件树，动作执行器处理事件。还要加生命周期、错误边界、扩展机制。核心逻辑尽量和框架解耦，设计态画布直接复用运行时渲染器，保证所见即所得。

---

### FB-52-CO-P-003：低代码平台的出码（Code Generation）和二次开发如何设计？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：52 低代码
**标签**：低代码、出码、二次开发、代码生成、ProCode
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明低代码平台的出码机制设计思路，包括如何把 Schema 转译为可维护代码，以及如何支持用户在生成代码基础上进行二次开发。

**参考答案**：

出码（Code Generation）是低代码平台从“配置”走向“可维护源码”的关键能力，也是企业级低代码平台区别于无代码平台的重要标志。

一、出码的目标

1. **可维护**：生成的代码符合团队编码规范，结构清晰。
2. **可读**：变量命名、组件结构、注释要友好。
3. **可扩展**：支持二次开发，用户可以在生成代码上写自定义逻辑。
4. **可回滚**：修改后可以选择回滚到 Schema 重新生成。

二、出码流程

```text
Schema -> AST 转换 -> 代码模板渲染 -> 生成源码文件 -> 格式化/校验
```

1. **Schema 解析**
   - 把 Schema 节点树转换为中间表示（IR）。
   - 识别页面结构、状态、数据源、事件、生命周期。

2. **代码生成**
   - 根据目标框架（React / Vue / 小程序）选择代码模板。
   - 生成页面组件、状态管理、样式文件、类型定义。

3. **格式化与校验**
   - 用 Prettier 格式化，ESLint 校验。
   - 生成符合团队规范的代码。

三、生成代码示例

Schema：

```json
{
  "componentName": "Page",
  "state": { "count": 0 },
  "children": [
    {
      "componentName": "Text",
      "props": { "content": "&#123;&#123; count &#125;&#125;" }
    },
    {
      "componentName": "Button",
      "props": {
        "text": "增加",
        "onClick": {
          "actionType": "setState",
          "args": ["count", "&#123;&#123; count + 1 &#125;&#125;"]
        }
      }
    }
  ]
}
```

生成 React 代码：

```jsx
import { useState } from 'react';
import { Text, Button } from '@company/ui';

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <Text content={count} />
      <Button text="增加" onClick={() => setCount(count + 1)} />
    </div>
  );
}
```

四、二次开发机制

1. **保护区（Safe Zone）**
   - 在生成的代码中划分“可手写区”和“不可手写区”。
   - 可手写区用注释标记，重新出码时保留。

```jsx
// --- CUSTOM CODE START ---
function customValidator(value) {
  return value.length > 6;
}
// --- CUSTOM CODE END ---
```

2. **扩展点（Extension Points）**
   - 在 Schema 中预留自定义脚本、自定义组件、自定义 Hook 的入口。
   - 出码时把这些扩展点渲染为真实代码。

3. **双向同步（可选）**
   - 简单修改：在代码上改完后，反向解析回 Schema。
   - 复杂修改：建议单向出码，后续在 ProCode 模式维护。

最佳实践：
- 出码不是唯一目标，平台应同时支持运行时渲染和出码两种模式。
- 出码代码质量要高，能直接进代码仓库和 CI/CD。
- 明确平台能力和二次开发的边界，避免无限兜底。

**评分维度**：
- 能说明出码的目标和流程（25%）
- 能给出 Schema 转代码的示例（25%）
- 能说明保护区、扩展点、双向同步等二次开发机制（30%）
- 能提到出码代码要符合团队规范（20%）

**常见错误**：
- 生成的代码不可读，无法维护。
- 出码后用户手写代码，重新出码时全部覆盖。
- 认为所有应用都应该出码，忽略运行时渲染的优势。
- 出码代码没有类型定义和单元测试。

**延伸追问**：
- 出码和运行时渲染各有什么优缺点？
- 如何设计保护区，让手写代码在重新出码时不丢失？

**相关题目**：
- [FB-52-FS-P-001 渲染引擎核心原理](#FB-52-FS-P-001)
- [FB-52-CP-P-008 低代码与 ProCode 的边界](#FB-52-CP-P-008)

**参考资源**：
- [低代码引擎 - 出码器](https://lowcode-engine.cn/site/docs/guide/design/code-generator)
- [Babel - AST 操作](https://babeljs.io/docs/babel-plugin-transform-react-jsx)

**口头回答版**：
> 出码就是把 Schema 转成可维护的源码。流程是 Schema 解析成中间表示，再根据目标框架选模板生成代码，最后用 Prettier 和 ESLint 格式化校验。生成代码要可读、可维护、可扩展。二次开发可以用保护区机制，把用户手写代码包在注释标记里，重新出码时保留；也可以预留扩展点让用户写自定义脚本。出码和运行时渲染不是互斥的，复杂应用出码后可能进 ProCode 模式维护。

---

### FB-52-CD-P-004：请实现一个 JSON Schema 到 React 组件的简易出码器

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：52 低代码
**标签**：低代码、出码、代码生成、React、AST
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
给定一个低代码页面 Schema，请用 JavaScript 实现一个简易出码器，将 Schema 转换为 JSX 字符串。要求支持状态声明、props 传递、事件绑定。

**参考答案**：

假设 Schema：

```json
{
  "componentName": "Page",
  "state": {
    "count": 0,
    "user": { "name": "Alice" }
  },
  "children": [
    {
      "componentName": "Text",
      "props": { "content": "&#123;&#123; user.name &#125;&#125;" }
    },
    {
      "componentName": "Button",
      "props": {
        "text": "增加",
        "onClick": {
          "actionType": "setState",
          "args": ["count", "&#123;&#123; count + 1 &#125;&#125;"]
        }
      }
    }
  ]
}
```

出码器实现：

```js
function generateCode(schema) {
  const { state = {}, children = [] } = schema;

  // 1. 生成 useState 声明
  const stateDeclares = Object.entries(state)
    .map(([key, value]) => {
      const initialValue = JSON.stringify(value);
      return `const [${key}, set${capitalize(key)}] = useState(${initialValue});`;
    })
    .join('\n  ');

  // 2. 递归生成 JSX
  const jsx = children.map(child => renderNode(child)).join('\n      ');

  return `
import { useState } from 'react';
import { Text, Button } from '@company/ui';

export default function Page() {
  ${stateDeclares}

  return (
    <div className="page">
      ${jsx}
    </div>
  );
}
`.trim();
}

function renderNode(node) {
  const { componentName, props = {}, children = [] } = node;
  const propStr = Object.entries(props)
    .map(([key, value]) => renderProp(key, value))
    .join(' ');

  const childrenJsx = Array.isArray(children)
    ? children.map(child => renderNode(child)).join('\n      ')
    : '';

  if (childrenJsx) {
    return `<${componentName} ${propStr}>\n        ${childrenJsx}\n      </${componentName}>`;
  }
  return `<${componentName} ${propStr} />`;
}

function renderProp(key, value) {
  // 表达式绑定
  if (typeof value === 'string' && value.startsWith('&#123;&#123;') && value.endsWith('&#125;&#125;')) {
    const expr = value.slice(2, -2).trim();
    // onXxx 事件绑定为函数
    if (key.startsWith('on')) {
      const action = parseAction(expr); // 假设解析动作
      return `${key}={() => ${action&#125;&#125;`;
    }
    return `${key}={${expr&#125;&#125;`;
  }
  // 普通值
  return `${key}={${JSON.stringify(value)&#125;&#125;`;
}

function parseAction(expr) {
  // 简易示例：把 setState 动作映射为 setCount(count + 1)
  return expr;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 输出
console.log(generateCode(schema));
```

生成结果：

```jsx
import { useState } from 'react';
import { Text, Button } from '@company/ui';

export default function Page() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({"name":"Alice"});

  return (
    <div className="page">
      <Text content={user.name} />
      <Button text="增加" onClick={() => setCount(count + 1)} />
    </div>
  );
}
```

关键点：
- 状态生成要支持对象、数组、基本类型。
- props 要区分普通值、表达式、事件函数。
- children 递归处理。
- 生产环境建议用 AST 生成（如 `@babel/generator`），而不是字符串拼接。

**评分维度**：
- 能生成 useState 状态声明（25%）
- 能递归生成 JSX（25%）
- 能处理表达式和事件绑定（30%）
- 能提到 AST 生成更安全可靠（20%）

**常见错误**：
- 字符串拼接导致 JSX 语法错误。
- 事件绑定直接写成字符串而不是函数。
- 嵌套对象状态生成错误的 useState 声明。
- 没有处理 children 为空的情况。

**延伸追问**：
- 如果 Schema 支持循环渲染，出码时怎么生成？
- 为什么要用 AST 而不是字符串拼接？

**相关题目**：
- [FB-52-CO-P-003 出码与二次开发](#FB-52-CO-P-003)
- [FB-52-SD-P-002 设计页面渲染引擎](#FB-52-SD-P-002)

**参考资源**：
- [Babel Handbook - AST 操作](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
- [低代码引擎 - 出码器](https://lowcode-engine.cn/site/docs/guide/design/code-generator)

**口头回答版**：
> 简易出码器可以基于字符串拼接实现。先遍历 state 生成 useState 声明；然后递归遍历 children 生成 JSX。props 要分情况：普通值直接 JSON.stringify；表达式 `&#123;&#123; &#125;&#125;` 把内容取出来；onXxx 事件要包成函数。最后拼接成完整文件字符串。但生产环境最好用 Babel AST 来生成代码，更健壮，不容易拼错。

---

### FB-52-SC-P-005：如何设计一个低代码流程设计器？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：52 低代码
**标签**：低代码、流程设计器、BPMN、DAG、节点编排
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个低代码流程设计器，支持拖拽节点、连线、配置节点属性、校验流程合法性，并能够与后端流程引擎对接。

**参考答案**：

流程设计器用于让用户通过可视化方式编排业务流程，如审批流、工作流、自动化规则。

一、核心模型

1. **节点（Node）**
   - 表示流程中的一个步骤，如开始、结束、审批、条件判断、任务。
   - 节点属性：id、type、name、x、y、config。

2. **边（Edge）**
   - 表示节点之间的流转关系。
   - 边属性：id、source、target、condition。

3. **流程图（Graph）**
   - 由节点和边组成的有向图。
   - 常用 DAG（有向无环图）模型，避免循环死锁。

二、技术选型

| 能力 | 方案 |
|------|------|
| 画布渲染 | SVG / Canvas / HTML + CSS + 库（如 ReactFlow、@antv/x6、BPMN.js） |
| 节点拖拽 | HTML5 Drag & Drop 或库内置能力 |
| 连线 | 锚点连接 + 贝塞尔曲线 |
| 数据模型 | 节点数组 + 边数组，可导出为 BPMN 或自定义 JSON |
| 后端对接 | 调用工作流引擎 API，如 Activiti、Flowable、Camunda |

三、流程合法性校验

1. **连通性校验**：开始节点必须能到达结束节点。
2. **环检测**：流程不能出现死循环（除非明确支持循环）。
3. **分支覆盖**：条件分支必须有默认分支。
4. **节点必填校验**：每个节点的必要配置是否完整。
5. **唯一性校验**：节点 id、边 id 不能重复。

```js
function hasCycle(nodes, edges) {
  const graph = buildAdjacencyList(edges);
  const visited = new Set();
  const recStack = new Set();

  function dfs(nodeId) {
    visited.add(nodeId);
    recStack.add(nodeId);
    for (const next of graph[nodeId] || []) {
      if (!visited.has(next)) {
        if (dfs(next)) return true;
      } else if (recStack.has(next)) {
        return true;
      }
    }
    recStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id) && dfs(node.id)) return true;
  }
  return false;
}
```

四、节点属性配置

- 选中节点后，属性面板显示该节点的配置表单。
- 审批节点：配置审批人、审批方式、抄送人。
- 条件节点：配置分支条件表达式。
- 任务节点：配置任务类型、执行人、表单字段。

五、与后端流程引擎对接

- 把流程图 JSON 转换为后端引擎可识别的格式，如 BPMN 2.0 XML。
- 后端部署流程定义，前端支持版本管理和发布。
- 运行时根据流程实例展示当前节点、审批历史、待办任务。

最佳实践：
- 流程模型尽量对齐 BPMN 2.0，便于和成熟工作流引擎对接。
- 画布操作要支持撤销/重做、自动保存。
- 复杂流程支持子流程和分组。
- 流程发布前必须强制校验通过。

**评分维度**：
- 能抽象出节点、边、图三个核心模型（25%）
- 能说明画布技术选型和节点拖拽连线（25%）
- 能说明流程合法性校验（25%）
- 能说明与后端引擎对接方式（15%）
- 能提到撤销重做和版本管理（10%）

**常见错误**：
- 流程模型设计过于简单，无法表达分支、并行、子流程。
- 忽略环检测，导致流程死循环。
- 前端只画流程图，不和后端引擎数据模型对齐。
- 没有撤销重做，用户体验差。

**延伸追问**：
- 如果流程支持会签（多人审批），节点模型怎么设计？
- 流程设计器如何保证前端画布和后端引擎状态一致？

**相关题目**：
- [FB-52-SC-B-008 设计表单设计器](#FB-52-SC-B-008)
- [FB-52-SD-R-003 平台化治理体系](#FB-52-SD-R-003)

**参考资源**：
- [BPMN 2.0 规范](https://www.omg.org/spec/BPMN/2.0/)
- [React Flow](https://reactflow.dev/)
- [AntV X6](https://x6.antv.vision/)

**口头回答版**：
> 流程设计器核心是节点和边组成的有向图。节点是流程步骤，边是流转关系。画布可以用 SVG 或 ReactFlow、X6 这些库实现拖拽和连线。关键要做合法性校验：连通性、环检测、分支默认、节点必填。流程图数据可以导出成 BPMN 或自定义 JSON，然后转成后端工作流引擎能识别的格式部署。还要支持撤销重做、自动保存、版本管理。

---

### FB-52-PE-P-006：如何优化低代码平台中大数据量表格的性能？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：52 低代码
**标签**：低代码、表格性能、虚拟滚动、分页、大数据
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
在低代码平台中，表格经常需要展示大量数据。请说明如何从数据层、渲染层、交互层三个维度优化大数据量表格的性能。

**参考答案**：

一、数据层优化

1. **后端分页**
   - 数据量大时优先使用后端分页，只请求当前页数据。
   - 配合排序、筛选参数，减少传输数据量。

2. **滚动加载（Infinite Scroll）**
   - 适合不需要精确分页号的场景。
   - 用户滚动到底部时自动加载下一页。

3. **数据缓存**
   - 同一页数据避免重复请求。
   - 使用 SWR 或 React Query 等缓存策略。

4. **字段精简**
   - 只请求表格展示需要的字段，不要一次性拉全量字段。

二、渲染层优化

1. **虚拟滚动（Virtual Scroll）**
   - 只渲染可视区域内的行，DOM 节点数量固定。
   - 常用库：`react-window`、`react-virtualized`、`AG Grid`。

```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualTable({ rows, rowHeight, height }) {
  return (
    <List
      height={height}
      itemCount={rows.length}
      itemSize={rowHeight}
    >
      {({ index, style }) => (
        <div style={style}>
          <TableRow data={rows[index]} />
        </div>
      )}
    </List>
  );
}
```

2. **行级 Memo**
   - 行组件用 `React.memo` 或 `Vue` 的 `v-memo` 避免不必要的重渲染。
   - 只有数据变化的行才重新渲染。

3. **列渲染按需**
   - 复杂列（如自定义组件、图片）按需渲染。
   - 不可见列不渲染或延迟渲染。

4. **减少 re-render**
   - 表格状态（如选中行）不要和提升为整个表格的 state，避免整表重渲染。
   - 用 selector 模式按需订阅。

三、交互层优化

1. **搜索防抖**
   - 搜索输入延迟 300-500ms 再触发请求。

2. **批量操作**
   - 选中大量行时，不要为每一行都创建响应式状态。
   - 用 Set 存储选中行的 id。

3. **列宽调整、排序优化**
   - 列宽调整只做本地状态更新，不重新请求数据。
   - 排序参数变更后再请求后端数据。

4. **骨架屏和占位**
   - 数据加载时显示骨架屏，避免白屏和布局抖动。

最佳实践：
- 10 万行以上必须虚拟滚动。
- 性能优化前先测量，用 Chrome Performance 看主线程长任务。
- 表格配置（列、排序、筛选）变更时，区分哪些需要重新请求，哪些只更新本地状态。

**评分维度**：
- 能从数据层说出 2 个以上优化手段（25%）
- 能从渲染层说出 2 个以上优化手段（35%）
- 能从交互层说出 2 个以上优化手段（25%）
- 能结合具体数据量给出方案选型（15%）

**常见错误**：
- 数据量大还用前端分页，一次性加载所有数据。
- 虚拟滚动和表格内置样式冲突，导致表头不同步。
- 每个单元格都用复杂自定义组件，渲染性能差。
- 搜索输入每次变化都发请求，不做防抖。

**延伸追问**：
- 表格列很多（比如 100 列）时，除了虚拟滚动还要做什么？
- 虚拟滚动和表格的排序、筛选怎么结合？

**相关题目**：
- [FB-52-CO-A-003 表格设计器核心问题](#FB-52-CO-A-003)
- [FB-52-PE-A-006 低代码平台性能优化](#FB-52-PE-A-006)

**参考资源**：
- [AG Grid 虚拟滚动](https://www.ag-grid.com/)
- [react-window](https://github.com/bvaughn/react-window)
- [Web Vitals](https://web.dev/vitals/)

**口头回答版**：
> 大数据量表格优化分三层。数据层优先后端分页，配合排序筛选；数据做缓存，只请求需要的字段。渲染层用虚拟滚动，只渲染可视区域；行组件 memo；复杂列按需渲染；减少整表 re-render。交互层搜索要防抖，批量操作用 Set 存选中 id，列宽调整只更新本地状态。10 万行以上必须用虚拟滚动，优化前先测量。

---

### FB-52-EN-P-007：低代码平台的多人协作与实时同步如何实现？

**题型**：工程化题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：52 低代码
**标签**：低代码、多人协作、实时同步、OT、CRDT
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个低代码平台的多人协作方案，支持多个用户同时编辑同一个应用，并保证数据一致性和冲突处理。

**参考答案**：

低代码平台多人协作的核心是让多个用户实时看到彼此的修改，并正确处理冲突。

一、技术方案选型

| 方案 | 原理 | 优点 | 缺点 | 适用场景 |
|------|------|------|------|---------|
| OT（Operational Transformation） | 操作转换，把并发操作转换为可顺序执行的操作 | 成熟，文本协作常用 | 实现复杂，对 JSON 树结构支持有限 | 文本、简单 JSON |
| CRDT（Conflict-free Replicated Data Types） | 无冲突复制数据类型，每个操作天然可合并 | 适合分布式，离线支持好 | 数据量大时可能有性能开销 | 复杂数据结构、离线协作 |
| 乐观锁 + 版本号 | 每次保存检查版本号，冲突时提示用户 | 简单，易实现 | 实时性差，冲突率高时体验差 | 低并发、简单场景 |
| 锁机制 | 编辑某部分时加锁，其他人只读 | 实现简单，无冲突 | 并发低，体验差 | 强一致性要求 |

二、基于 OT/CRDT 的协作架构

```text
用户 A 编辑 -> 本地应用操作 -> WebSocket -> 服务端 -> 广播给其他用户
                                          |
                                          v
                                    OT/CRDT 协调中心
```

1. **操作抽象**
   - 把用户对 Schema 的修改抽象为原子操作：addNode、removeNode、updateProp、moveNode。
   - 每个操作包含：type、path、value、timestamp、userId、operationId。

2. **实时通信**
   - 使用 WebSocket 或 SSE 推送操作。
   - 消息到达后本地应用操作，更新视图。

3. **冲突处理**
   - OT：服务端根据已有操作转换新操作，再广播。
   - CRDT：本地直接合并，保证最终一致性。

4. **光标与选区同步**
   - 显示其他用户当前选中的组件或属性。
   - 用不同颜色标识不同用户。

三、简化方案：基于版本号的乐观锁

```js
async function saveSchema(schema, baseVersion) {
  const response = await fetch('/api/app/save', {
    method: 'POST',
    body: JSON.stringify({ schema, baseVersion })
  });
  if (response.status === 409) {
    // 版本冲突，提示用户合并或覆盖
    showConflictDialog();
  }
}
```

四、最佳实践

- 优先采用“协作粒度控制”：不同用户编辑不同页面或不同组件时避免冲突。
- 对 Schema 做细粒度变更追踪，不要整份 Schema 替换。
- 提供操作历史（undo/redo）和版本快照。
- 离线编辑时本地缓存操作，联网后同步。

**评分维度**：
- 能对比 OT、CRDT、乐观锁等方案（30%）
- 能说明协作架构和操作抽象（25%）
- 能说明冲突处理策略（25%）
- 能提到光标同步、版本快照等细节（20%）

**常见错误**：
- 直接全量替换 Schema 做同步，导致冲突频繁。
- 忽略离线场景和断网重连。
- 冲突时直接覆盖，不提示用户。
- 没有操作粒度控制，所有人编辑同一份大 JSON。

**延伸追问**：
- 如果两个用户同时修改同一个组件的同一个属性，怎么合并？
- CRDT 在低代码场景下有什么优缺点？

**相关题目**：
- [FB-52-EN-A-007 物料版本管理](#FB-52-EN-A-007)
- [FB-52-SD-R-003 平台化治理体系](#FB-52-SD-R-003)

**参考资源**：
- [Yjs - CRDT 协作框架](https://docs.yjs.dev/)
- [Operational Transformation](https://operational-transformation.github.io/)

**口头回答版**：
> 多人协作常见方案有 OT、CRDT、乐观锁、锁机制。OT 适合文本，CRDT 适合复杂数据且支持离线，乐观锁实现简单但实时性差。低代码平台建议把对 Schema 的修改抽象成原子操作，比如 addNode、updateProp，通过 WebSocket 实时同步，服务端用 OT 或 CRDT 协调冲突。还要做光标同步、版本快照、undo/redo。简单场景可以用版本号乐观锁，冲突时提示用户合并。

---

### FB-52-CP-P-008：低代码开发和传统 ProCode 开发的边界在哪里？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家 / 架构师
**面试知识域**：52 低代码
**标签**：低代码、ProCode、边界、选型、综合开放
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请分析低代码开发和传统 ProCode 开发的边界，什么样的场景适合低代码，什么样的场景必须坚持 ProCode？

**参考答案**：

低代码和 ProCode 不是非此即彼，而是各有边界。合理划分边界是平台成功的关键。

一、适合低代码的场景

1. **标准化、重复性高的页面**
   - 表单页、列表页、详情页、审批流。
   - 页面结构相似，通过配置即可生成。

2. **变化快、生命周期短的应用**
   - 运营活动页、问卷调查、临时审批。
   - 需要快速上线、快速迭代。

3. **业务人员能理解的逻辑**
   - 简单的数据展示、表单提交、条件分支。
   - 不需要复杂算法和底层优化。

4. **已经有成熟物料和规范的中后台系统**
   - 组件库、设计系统、接口规范已经统一。
   - 低代码平台可以快速组装。

二、必须坚持 ProCode 的场景

1. **高度定制化的交互和动画**
   - 复杂的可视化编辑、游戏、创意 H5。
   - 低代码平台难以表达细粒度交互。

2. **复杂算法和数据处理**
   - 图像处理、音视频编解码、复杂计算。
   - 需要专业开发者用原生代码实现。

3. **高性能要求的场景**
   - 大规模数据实时渲染、复杂 3D 场景。
   - 需要针对性能做深度优化。

4. **强依赖底层能力的系统**
   - 浏览器插件、桌面应用、嵌入式系统。
   - 低代码平台通常无法覆盖这些运行环境。

5. **核心基础架构**
   - 组件库、渲染引擎、框架本身。
   - 需要高可维护性和可测试性。

三、边界划分原则

| 维度 | 低代码 | ProCode |
|------|--------|---------|
| 开发效率 | 高 | 相对低 |
| 灵活性 | 中低 | 高 |
| 可维护性 | 依赖平台 | 高 |
| 复杂业务 | 不适合 | 适合 |
| 迭代速度 | 快 | 取决于团队 |
| 人员要求 | 业务人员也可参与 | 需要专业开发 |

四、混合开发模式

1. **低代码搭骨架，ProCode 填血肉**
   - 用低代码快速搭建页面结构和数据流。
   - 复杂组件用 ProCode 开发后注册为自定义物料。

2. **出码后 ProCode 维护**
   - 初期用低代码快速验证。
   - 业务稳定后出码，进入常规工程化维护。

3. **扩展点机制**
   - 低代码平台预留脚本、自定义 Hook、自定义组件入口。
   - 让 ProCode 能无缝接入低代码流程。

最佳实践：
- 不要把低代码当成万能方案。
- 平台能力要有明确边界，超过边界引导用户出码或写自定义代码。
- 建立低代码应用评审机制，避免把不适合的应用硬搬到低代码平台。

**评分维度**：
- 能清晰划分适合低代码和 ProCode 的场景（35%）
- 能从效率、灵活性、可维护性等维度对比（25%）
- 能说明混合开发模式（25%）
- 能给出实际案例或选型建议（15%）

**常见错误**：
- 认为低代码可以替代所有开发。
- 把复杂业务硬搬到低代码平台，导致平台不堪重负。
- 完全排斥低代码，忽略其在标准化场景下的效率优势。

**延伸追问**：
- 你们团队如何决定一个新项目用低代码还是 ProCode？
- 如果低代码平台无法表达某个需求，你怎么引导业务方？

**相关题目**：
- [FB-52-CO-P-003 出码与二次开发](#FB-52-CO-P-003)
- [FB-52-CP-R-006 低代码平台自研还是采购](#FB-52-CP-R-006)

**参考资源**：
- [OutSystems - Low-Code vs Traditional Development](https://www.outsystems.com/)
- [Gartner - 低代码平台魔力象限](https://www.gartner.com/)

**口头回答版**：
> 低代码和 ProCode 不是对立的。标准化、重复性高的页面，比如表单、列表、审批流，变化快的临时应用，适合低代码。高度定制化交互、复杂算法、高性能要求、底层架构、核心系统，必须坚持 ProCode。实际项目中常是混合模式：低代码搭骨架，复杂逻辑用 ProCode 自定义组件或脚本，稳定后也可以出码维护。关键是平台要有清晰边界，不要什么都在低代码里做。

---
## 架构题（8 道）{#architect}

### FB-52-SD-R-001：如何设计一个企业级低代码平台的整体架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：52 低代码
**标签**：低代码、平台架构、企业级、系统设计、分层
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个企业级低代码平台的整体架构，包括设计态、运行态、出码、物料、数据源、权限、监控等核心子系统，并说明它们之间的关系。

**参考答案**：

一、整体架构分层

```text
┌─────────────────────────────────────────────┐
│              应用层（Applications）            │
│  设计器  │  预览/运行  │  应用门户  │  管理后台  │
├─────────────────────────────────────────────┤
│              平台能力层（Platform）            │
│  页面设计  │  流程设计  │  表单设计  │  数据建模  │
├─────────────────────────────────────────────┤
│              引擎层（Engines）                 │
│  渲染引擎  │  出码引擎  │  表达式引擎  │  动作引擎  │
├─────────────────────────────────────────────┤
│              基础服务层（Foundation）          │
│  物料中心  │  数据源中心  │  权限中心  │  用户中心  │
├─────────────────────────────────────────────┤
│              基础设施层（Infrastructure）      │
│  存储  │  缓存  │  消息队列  │  网关  │  监控  │
└─────────────────────────────────────────────┘
```

二、核心子系统

1. **设计器（Designer）**
   - 组件面板、画布、属性面板、大纲树、数据源配置、动作编排。
   - 产出 Schema，保存到应用仓库。

2. **渲染引擎（Renderer）**
   - 解析 Schema 生成真实页面。
   - 设计态和运行态复用同一套渲染能力。

3. **出码引擎（Code Generator）**
   - 将 Schema 转译为 React / Vue / 小程序代码。
   - 支持出码后二次开发。

4. **物料中心（Material Center）**
   - 管理组件物料包，包括元数据、运行时组件、Setter 配置、版本。
   - 支持物料注册、发布、灰度、版本管理。

5. **数据源中心（Data Source Center）**
   - 统一管理 API、数据库、第三方服务。
   - 提供参数、缓存、错误处理、权限控制能力。

6. **权限中心（Auth Center）**
   - 页面权限、按钮权限、数据权限、字段权限。
   - 与组织用户中心对接，支持角色、部门、岗位。

7. **流程引擎（Flow Engine）**
   - 对接 BPMN 工作流引擎，支持审批流、自动化规则。

8. **应用管理与发布**
   - 应用版本管理、环境管理（开发/测试/生产）、一键发布、回滚。

9. **监控与治理**
   - 运行时性能监控、错误监控、Schema 合规检查、应用健康度评估。

三、数据流转

```text
设计器 -> Schema -> 渲染引擎 -> 运行时页面
              |
              v
         出码引擎 -> 源码仓库 -> CI/CD -> 线上部署
```

四、关键技术决策

1. **Schema 协议统一**
   - 所有子系统围绕统一 Schema 协作。
   - Schema 升级必须向后兼容。

2. **设计态与运行态解耦**
   - 设计态关注交互体验，运行态关注渲染性能。
   - 但核心渲染逻辑共享。

3. **扩展机制**
   - 组件、动作、Setter、数据源、校验规则都可注册扩展。
   - 插件化架构便于生态建设。

4. **多租户与隔离**
   - 企业级平台通常多租户，应用、数据、物料需要隔离。

最佳实践：
- 不要一开始就做大而全，先围绕核心场景（如表单、列表）跑通闭环。
- 平台各层边界清晰，避免子系统之间直接耦合。
- 重视 Schema 的长期演进和迁移能力。

**评分维度**：
- 能设计清晰的分层架构（25%）
- 能说明 6 个以上核心子系统（30%）
- 能说明子系统间数据流转（20%）
- 能提到扩展机制、多租户、Schema 演进（15%）
- 能给出演进路径（10%）

**常见错误**：
- 架构设计过于庞大，没有 MVP 思路。
- 各子系统直接操作 Schema，没有统一协议。
- 设计态和运行态完全独立开发，导致不一致。
- 忽略企业级特性：权限、多租户、审计。

**延伸追问**：
- 如果平台要同时支持 React 和 Vue，架构上怎么抽象？
- 如何评估一个企业级低代码平台的成熟度？

**相关题目**：
- [FB-52-SD-P-002 设计页面渲染引擎](#FB-52-SD-P-002)
- [FB-52-SD-R-002 与业务系统集成](#FB-52-SD-R-002)

**参考资源**：
- [低代码引擎 - 架构设计](https://lowcode-engine.cn/site/docs/guide/design/overview)
- [Mendix Platform Architecture](https://www.mendix.com/)

**口头回答版**：
> 企业级低代码平台我会分成五层：应用层、平台能力层、引擎层、基础服务层、基础设施层。核心子系统包括设计器、渲染引擎、出码引擎、物料中心、数据源中心、权限中心、流程引擎、应用管理、监控治理。所有子系统围绕统一 Schema 协作，设计态和运行态共享渲染能力。要有组件、动作、数据源这些扩展机制，还要考虑多租户、权限、Schema 长期演进。平台不要一开始就做大而全，先跑通核心场景。

---

### FB-52-SD-R-002：低代码平台如何与企业现有业务系统集成？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：52 低代码
**标签**：低代码、系统集成、SSO、网关、数据中台
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个低代码平台与企业现有业务系统（如 ERP、CRM、OA、数据中台）集成的方案，包括单点登录、数据集成、流程集成、权限集成。

**参考答案**：

企业级低代码平台不可能孤立存在，必须能接入现有 IT 体系。

一、单点登录（SSO）集成

1. **统一身份认证**
   - 对接企业 IAM、LDAP、AD、OAuth2 / OIDC、SAML。
   - 用户登录后获取 Token，平台所有请求携带 Token。

2. **账号同步**
   - 通过 SCIM 协议或企业组织架构接口同步用户、部门、角色。
   - 平台本地缓存组织数据，定期同步。

二、数据集成

1. **API 网关接入**
   - 企业已有业务系统通过 API 网关暴露接口。
   - 低代码平台的数据源中心统一调用网关，不直连业务系统。

```text
低代码应用 -> 数据源中心 -> 企业 API 网关 -> ERP/CRM/OA
```

2. **数据库直连（受控）**
   - 对允许的场景，低代码平台可配置只读或受限的数据库连接。
   - 需要严格的 SQL 审计和权限控制。

3. **数据中台 / 数据湖**
   - 对接数据中台的元数据服务，自动发现可用数据表和字段。
   - 支持数据模型自动生成表单和表格。

4. **消息队列集成**
   - 通过 Kafka / RabbitMQ / RocketMQ 接收业务系统事件。
   - 低代码应用可订阅事件触发流程或页面刷新。

三、流程集成

1. **工作流引擎对接**
   - 低代码流程设计器生成 BPMN 后，部署到企业统一工作流引擎。
   - 运行时任务、审批状态回写到低代码应用。

2. **事件驱动集成**
   - 业务系统事件触发低代码应用的自动化流程。
   - 例如：CRM 客户状态变更 -> 低代码平台发送通知。

四、权限集成

1. **角色权限同步**
   - 企业统一权限中心管理角色，低代码平台拉取角色列表。
   - 页面、按钮、数据行、字段级权限绑定角色。

2. **数据权限**
   - 通过用户上下文（部门、岗位、项目）控制数据可见范围。
   - 数据权限规则由业务系统或数据中台提供，低代码平台透传。

3. **审计日志**
   - 所有数据操作记录审计日志，对接企业安全审计系统。

五、集成规范

- 统一协议：REST / GraphQL / gRPC。
- 统一数据格式：JSON。
- 统一错误码和错误处理。
- 统一超时、重试、熔断策略。

最佳实践：
- 优先通过网关和消息队列集成，不要直接暴露业务系统内部接口。
- 数据权限和敏感操作必须由后端最终校验。
- 建立集成标准和连接器市场，降低后续接入成本。

**评分维度**：
- 能说明 SSO、数据、流程、权限四个集成维度（35%）
- 能说明 API 网关、消息队列、数据中台等集成方式（25%）
- 能强调数据权限和审计安全（20%）
- 能给出集成架构图或数据流向（20%）

**常见错误**：
- 低代码平台直连业务数据库，缺乏权限控制。
- 前端做权限判断，后端不做校验。
- 接口没有统一网关，导致安全边界模糊。
- 忽略审计日志和企业安全合规要求。

**延伸追问**：
- 如果企业系统接口不规范，低代码平台怎么快速适配？
- 低代码平台如何支持跨系统的数据编排（一个页面调用多个系统接口）？

**相关题目**：
- [FB-52-SD-R-001 企业级低代码平台架构](#FB-52-SD-R-001)
- [FB-52-SE-R-008 低代码平台安全架构](#FB-52-SE-R-008)

**参考资源**：
- [OAuth 2.0 / OIDC](https://oauth.net/2/)
- [BPMN 2.0](https://www.omg.org/spec/BPMN/2.0/)

**口头回答版**：
> 低代码平台集成企业系统主要从四块入手。单点登录对接 IAM、OAuth2、LDAP；数据集成走企业 API 网关，也可以对接数据中台，通过消息队列接收事件；流程集成把 BPMN 部署到统一工作流引擎；权限集成拉取企业角色，做页面、按钮、数据行、字段级权限，数据权限由后端最终校验。所有操作要有审计日志。关键是不要直连业务系统内部接口，要走统一网关。

---

### FB-52-SD-R-003：如何建立低代码平台的平台化治理体系？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：52 低代码
**标签**：低代码、平台治理、规范、质量、生态
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何对低代码平台进行治理，包括应用生命周期管理、物料管理、质量管控、性能基线、安全合规、运营分析等方面。

**参考答案**：

平台化治理是低代码平台从“能用”到“好用、可控”的关键。

一、应用生命周期治理

1. **创建审批**
   - 应用创建需要申请，明确负责人、业务域、安全等级。

2. **版本管理**
   - Schema 版本、应用版本、发布版本分离。
   - 支持版本对比、回滚、分支管理。

3. **环境管理**
   - 开发、测试、预发、生产环境隔离。
   - 发布流程需要审批和自动化测试。

4. **下线与归档**
   - 长期不用的应用自动识别并归档。
   - 下线前通知相关方，保留历史数据。

二、物料治理

1. **物料准入**
   - 组件发布前需通过代码评审、测试、性能、安全扫描。
   - 建立物料评分和认证机制。

2. **物料版本与灰度**
   - 新物料版本先灰度到部分应用。
   - 监控异常后全量或回滚。

3. **物料复用与淘汰**
   - 统计物料使用频率，淘汰低质量、低使用率的物料。
   - 推动业务使用官方推荐物料。

三、质量管控

1. **Schema 合规检查**
   - 校验 Schema 是否符合平台协议。
   - 检测异常：缺失必填属性、循环依赖、未注册组件。

2. **自动化测试**
   - 单元测试、集成测试、E2E 测试。
   - 低代码应用发布前跑自动化用例。

3. **代码/配置审查**
   - 关键应用发布前需要 Code Review。
   - 自定义脚本、数据源配置需要重点审查。

四、性能基线

1. **性能指标采集**
   - 首屏时间、交互响应时间、内存占用、接口耗时。
   - 建立应用性能评分。

2. **性能门禁**
   - 发布前性能不达标禁止上线。
   - 定期巡检存量应用性能。

五、安全合规

1. **安全扫描**
   - 表达式、自定义脚本沙箱扫描。
   - 数据源接口权限校验。

2. **合规审计**
   - 记录设计、发布、访问、数据操作日志。
   - 满足等保、GDPR、SOC2 等合规要求。

六、运营分析

1. **应用大盘**
   - 应用数量、活跃用户、页面访问量、错误率。

2. **用户行为分析**
   - 哪些组件、动作、数据源使用最多。
   - 识别平台能力缺口。

最佳实践：
- 治理要“软硬结合”：既有规范和流程，也有自动化工具和门禁。
- 治理规则要可配置，不同业务线可以有不同严格程度。
- 从应用、物料、质量、性能、安全、运营六个维度建立指标体系。

**评分维度**：
- 能从 4 个以上维度说明治理体系（35%）
- 能详细说明应用生命周期和物料治理（25%）
- 能提到质量门禁和性能基线（20%）
- 能说明安全合规和运营分析（20%）

**常见错误**：
- 只关注平台建设，忽略治理体系建设。
- 治理规则过于死板，影响业务效率。
- 没有自动化工具，全靠人工检查。
- 忽略存量应用的持续治理。

**延伸追问**：
- 如何平衡治理规范和业务交付效率？
- 如果某个业务团队一直不遵守平台规范，你怎么处理？

**相关题目**：
- [FB-52-SD-R-001 企业级低代码平台架构](#FB-52-SD-R-001)
- [FB-52-SE-R-008 低代码平台安全架构](#FB-52-SE-R-008)

**参考资源**：
- [ITIL - 服务管理](https://www.axelos.com/certifications/itil-service-management/)
- [FinOps - 云成本治理](https://www.finops.org/)

**口头回答版**：
> 低代码平台治理要从六个维度做：应用生命周期、物料管理、质量管控、性能基线、安全合规、运营分析。应用创建、发布、下线要走审批和版本管理；物料发布前要做评审、测试、灰度；Schema 要做合规检查；发布前跑自动化测试和性能门禁；表达式和数据源要做安全扫描；操作要记审计日志。治理要软硬结合，有规范也有自动化门禁，规则可配置，不能影响业务效率。

---

### FB-52-SS-R-004：作为架构师，你如何推动业务团队使用低代码平台？

**题型**：软技能题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：52 低代码
**标签**：低代码、推动落地、软技能、组织变革、架构师
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
假设你负责企业低代码平台建设，但业务团队对采用低代码有疑虑。请说明你会如何推动业务团队接受并使用低代码平台。

**参考答案**：

推动低代码平台落地不仅是技术问题，更是组织变革问题。需要从价值证明、降低门槛、建立信任、激励机制、持续运营五个方面入手。

一、价值证明

1. **找试点场景**
   - 选择 1-2 个标准化程度高、需求迫切、业务团队愿意配合的场景做试点。
   - 例如：内部审批流、运营配置后台、数据报表。

2. **量化收益**
   - 对比低代码开发和传统开发的周期、人力、缺陷率。
   - 用真实数据证明效率提升，如“某表单页从 5 人天降到 0.5 人天”。

二、降低门槛

1. **培训与赋能**
   - 提供分层培训：业务人员学配置，开发人员学扩展和出码。
   - 提供模板市场、最佳实践文档、视频教程。

2. **贴身支持**
   - 初期派驻“低代码专家”到业务团队，手把手解决问题。
   - 建立答疑群和快速响应机制。

3. **完善物料和模板**
   - 根据业务线特点预置常用模板和组件。
   - 让业务团队感觉“搭起来很快”。

三、建立信任

1. **保证稳定性**
   - 平台 SLA 要明确，发布流程要可靠。
   - 建立应急响应和回滚机制。

2. **数据安全承诺**
   - 明确数据归属、访问范围、审计能力。
   - 消除业务团队对安全和合规的顾虑。

3. **成功案例分享**
   - 定期举办内部分享会，让已经成功的业务团队讲经验。

四、激励机制

1. **认可与奖励**
   - 对积极使用低代码的团队和个人给予表彰。
   - 纳入绩效考核或技术影响力评估。

2. **降低维护负担**
   - 让业务团队感受到低代码应用维护成本更低。
   - 提供持续的运营和优化支持。

五、持续运营

1. **收集反馈**
   - 建立反馈渠道，定期访谈业务团队。
   - 根据反馈迭代平台能力。

2. **能力开放**
   - 让业务团队能贡献物料、模板、最佳实践。
   - 形成平台共建氛围。

最佳实践：
- 不要强行推广，先用成功案例说话。
- 尊重业务团队的现有流程和习惯，平滑过渡。
- 平台团队要有服务意识，把业务团队当客户。

**评分维度**：
- 能从价值证明、降低门槛、建立信任、激励、运营五个维度回答（35%）
- 能给出具体可执行的措施（30%）
- 能体现对业务团队顾虑的理解（20%）
- 能提到度量指标和反馈闭环（15%）

**常见错误**：
- 只讲技术先进性，不讲业务收益。
- 强行要求所有团队使用，引发抵触。
- 平台建设完就不管，缺乏运营和支持。
- 忽略业务人员对数据安全和系统稳定性的担忧。

**延伸追问**：
- 如果业务团队说“低代码做不出我要的效果”，你怎么回应？
- 如何度量低代码平台对业务的真实价值？

**相关题目**：
- [FB-52-SD-R-003 平台化治理体系](#FB-52-SD-R-003)
- [FB-52-CP-P-008 低代码与 ProCode 边界](#FB-52-CP-P-008)

**参考资源**：
- [麦肯锡 - 数字化变革管理](https://www.mckinsey.com/)
- [ADKAR 变革管理模型](https://www.prosci.com/methodology/adkar)

**口头回答版**：
> 推低代码平台落地，关键是让业务团队看到价值。我会先找标准化高、需求急的试点场景，量化效率收益；然后降低门槛，做培训、给模板、派驻专家支持；同时保证平台稳定和数据安全，建立信任；对积极使用的团队给认可和激励；最后持续收集反馈迭代平台。不能硬推，要把业务团队当客户，用成功案例说话。

---

### FB-52-SD-R-005：如何设计 AI 辅助搭建能力？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：52 低代码
**标签**：低代码、AI、辅助搭建、LLM、智能化
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个低代码平台的 AI 辅助搭建能力，支持通过自然语言生成页面、智能推荐组件、自动填充数据绑定、辅助生成逻辑等。

**参考答案**：

AI 辅助搭建是低代码平台的重要演进方向，可以显著降低使用门槛、提升搭建效率。

一、AI 辅助搭建的核心能力

1. **自然语言生成页面（NL2Page）**
   - 用户输入“创建一个用户管理页面，包含查询、表格、新增按钮”。
   - AI 解析意图，生成完整页面 Schema。

2. **智能推荐组件 / 属性**
   - 根据用户当前操作推荐下一步可能需要的组件。
   - 根据字段名推荐对应组件类型，如 `phone` -> `Input` + 手机号校验。

3. **自动数据绑定**
   - 根据接口文档或数据模型，自动把字段绑定到表单/表格列。
   - 根据字段类型推荐 Setter 和校验规则。

4. **逻辑辅助生成**
   - 根据自然语言描述生成动作链、联动规则、校验规则。
   - 例如：“当状态为审核中时，隐藏删除按钮”。

5. **智能纠错与优化**
   - 检测 Schema 中的常见问题，如未绑定数据源、字段名冲突。
   - 推荐性能优化和可访问性改进。

二、系统架构

```text
用户输入 -> 意图识别层 -> Schema 生成层 -> 校验/优化层 -> 设计器应用
                |
                v
          RAG 知识库（物料、模板、最佳实践）
                |
                v
          LLM（GPT / 文心一言 / 通义千问）
```

三、关键技术点

1. **意图识别**
   - 用 LLM 解析用户自然语言，提取实体和动作。
   - 示例：{"pageType": "list", "entity": "user", "features": ["search", "create", "edit"]}

2. **Schema 生成**
   - 基于模板 + LLM 生成 Schema。
   - 模板保证结构正确，LLM 负责填充细节。

3. **RAG 增强**
   - 把物料定义、模板库、最佳实践、接口文档作为知识库。
   - 生成 Schema 时检索相关知识，提高准确性。

4. **校验与回滚**
   - AI 生成结果必须经过 Schema 校验。
   - 生成结果作为建议，用户确认后才应用到设计器。
   - 支持一键撤销。

5. **平台安全与合规**
   - AI 生成内容不能包含恶意代码或越权接口。
   - 敏感数据不上传给外部 LLM，或做脱敏处理。

四、实现示例

自然语言生成页面：

```text
用户：创建一个商品列表页，支持按名称搜索和分页。

AI 输出 Schema：
{
  "componentName": "Page",
  "children": [
    { "componentName": "SearchForm", "fields": ["name"] },
    { "componentName": "Table", "dataSource": "productList", "columns": ["name", "price", "status"] },
    { "componentName": "Pagination", "dataSource": "productList" }
  ]
}
```

最佳实践：
- AI 不是替代用户，而是辅助用户，最终决策权在用户。
- 生成结果要可解释，让用户知道 AI 做了什么。
- 从高频、标准化场景切入，逐步扩展能力边界。

**评分维度**：
- 能说出 4 个以上 AI 辅助搭建能力（30%）
- 能设计 AI 辅助搭建的系统架构（25%）
- 能说明意图识别、RAG、Schema 生成、校验等关键技术（30%）
- 能提到安全和用户确认机制（15%）

**常见错误**：
- 认为 AI 可以完全替代人工搭建。
- AI 生成结果不经过校验直接应用。
- 忽略敏感数据隐私，直接上传给外部 LLM。
- AI 能力范围过大，导致生成质量不稳定。

**延伸追问**：
- AI 生成的页面如何保持与团队设计规范一致？
- 如果 AI 推荐错了，用户怎么快速修正？

**相关题目**：
- [FB-52-SD-R-001 企业级低代码平台架构](#FB-52-SD-R-001)
- [FB-52-SD-R-003 平台化治理体系](#FB-52-SD-R-003)

**参考资源**：
- [OpenAI - Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [LangChain - RAG 应用](https://js.langchain.com/docs/use_cases/question_answering/)

**口头回答版**：
> AI 辅助搭建可以做几件事：自然语言生成页面、智能推荐组件和属性、自动数据绑定、辅助生成联动和校验逻辑、智能纠错优化。架构上用户输入先过意图识别，再基于模板和 LLM 生成 Schema，然后用 RAG 检索物料和最佳实践增强结果，最后经过校验再应用到设计器。AI 是辅助不是替代，生成结果要用户确认，敏感数据要脱敏或本地处理。

---

### FB-52-CP-R-006：企业应该自研低代码平台还是采购商业化产品？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：52 低代码
**标签**：低代码、自研、采购、选型、综合开放
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请分析企业建设低代码平台时，自研和采购商业化产品各自的优缺点，并给出选型决策框架。

**参考答案**：

自研和采购没有绝对优劣，关键看企业自身情况。

一、采购商业化产品

优点：
- 上线快，省去大量研发成本。
- 产品成熟，功能完整，文档和社区支持好。
- 有专业团队持续维护和升级。

缺点：
- 源码不可控，深度定制受限。
- 与企业内部系统集成成本高。
- 授权费用和扩展费用可能较高。
- 数据安全和合规风险（特别是 SaaS 产品）。

适用场景：
- 企业没有足够研发资源。
- 需求标准化，行业产品能覆盖 80% 以上。
- 需要快速验证低代码价值。

二、自研低代码平台

优点：
- 完全可控，能深度适配企业业务和技术栈。
- 与内部系统、组件库、规范无缝集成。
- 长期看，边际成本低，可成为企业核心资产。

缺点：
- 投入大，周期长，技术门槛高。
- 需要持续投入维护，容易成为“烂尾”项目。
- 对架构师和核心团队要求高。

适用场景：
- 企业有独特业务模型，商业化产品难以满足。
- 有长期技术投入意愿和能力。
- 需要把低代码平台作为基础设施或产品对外输出。

三、混合路线

- 初期采购商业化产品做试点，验证价值。
- 同时抽调小团队自研核心引擎和物料体系。
- 业务成熟后逐步迁移到自研平台。

四、选型决策框架

| 评估维度 | 自研 | 采购 |
|---------|------|------|
| 业务独特性 | 高 | 低 |
| 技术能力 | 强 | 中弱 |
| 投入预算 | 充足 | 有限 |
| 上线时间要求 | 宽松 | 紧迫 |
| 长期战略价值 | 高 | 中 |
| 数据安全要求 | 高 | 需评估 |
| 集成复杂度 | 可控 | 可能高 |

决策建议：
- 如果业务独特、技术强、预算足、长期做，选自研。
- 如果资源有限、需求标准、要快速见效，选采购。
- 很多中大厂最终走“自研核心 + 采购补充”的混合路线。

**评分维度**：
- 能客观对比自研和采购的优缺点（35%）
- 能给出清晰的适用场景（25%）
- 能提出决策框架和评估维度（25%）
- 能提到混合路线和风险控制（15%）

**常见错误**：
- 不考虑企业实际情况，一味主张自研或采购。
- 低估自研平台的长期维护成本。
- 忽略商业化产品的集成和定制限制。
- 没有明确的成功标准和退出机制。

**延伸追问**：
- 如果采购产品后发现无法满足核心需求，怎么止损？
- 自研平台如何防止做成只有技术团队自嗨的项目？

**相关题目**：
- [FB-52-SD-R-001 企业级低代码平台架构](#FB-52-SD-R-001)
- [FB-52-SS-R-004 推动业务团队使用低代码](#FB-52-SS-R-004)

**参考资源**：
- [Gartner Magic Quadrant for Enterprise Low-Code Application Platforms](https://www.gartner.com/)
- [Forrester Wave - Low-Code Development Platforms](https://www.forrester.com/)

**口头回答版**：
> 自研还是采购要看企业情况。采购上线快、成熟度高，但定制受限、集成成本高、数据安全要评估；自研可控性强、能深度适配，但投入大、周期长、维护成本高。我的决策框架看几个维度：业务独特性、技术能力、预算、上线时间、长期战略价值、数据安全、集成复杂度。业务独特且技术强就自研；资源有限要快速见效就采购。实际很多中大厂走混合路线，先采购验证，同时小团队自研核心，再逐步迁移。

---

### FB-52-SD-R-007：如何设计低代码平台的扩展性与插件化架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：52 低代码
**标签**：低代码、扩展性、插件化、架构、生态
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个低代码平台的扩展性与插件化架构，使平台能够持续接入新组件、新功能、新集成能力，而不需要修改平台核心代码。

**参考答案**：

低代码平台要长期发展，必须具备良好的扩展性。插件化架构是实现扩展性的核心手段。

一、可扩展的能力点

1. **组件扩展**
   - 自定义组件注册到平台，作为物料使用。
   - 组件包可以独立开发、测试、发布。

2. **Setter 扩展**
   - 自定义属性编辑器，如地图选择器、颜色渐变器、公式编辑器。

3. **动作扩展**
   - 自定义动作，如发送企微消息、调用特殊硬件、生成 PDF。

4. **数据源扩展**
   - 支持接入新的数据源类型，如 GraphQL、MQTT、WebSocket、私有协议。

5. **设计器插件**
   - 扩展设计器 UI，如新增面板、快捷键、右键菜单、导出能力。

6. **出码扩展**
   - 支持生成不同目标框架代码，如 React、Vue、小程序、Flutter。

二、插件化架构

```text
┌─────────────────────────────────────┐
│           平台核心（Core）            │
│  Schema 协议 │ 渲染引擎 │ 事件总线 │ 插件管理器 │
└─────────────────────────────────────┘
                   │
       ┌───────────┼───────────┐
       v           v           v
  组件插件    Setter 插件    动作插件
  数据源插件  设计器插件     出码插件
```

三、插件注册与管理

1. **插件协议**
   - 每个插件需要实现统一接口：

```ts
interface Plugin {
  name: string;
  version: string;
  activate: (ctx: PluginContext) => void;
  deactivate?: () => void;
}
```

2. **插件上下文（PluginContext）**
   - 暴露平台 API：注册组件、注册 Setter、注册动作、订阅事件、扩展面板。

3. **插件加载方式**
   - 静态加载：构建时打包进平台。
   - 动态加载：运行时通过 CDN 或微前端加载 UMD 包。

4. **插件隔离**
   - 样式隔离：CSS Modules、Shadow DOM。
   - JS 隔离：微前端沙箱、iframe。
   - 依赖共享：通过共享 scope 避免重复加载。

四、扩展机制示例

注册自定义组件：

```js
ctx.registerComponent({
  componentName: 'MapPicker',
  component: MapPicker,
  meta: { title: '地图选点', icon: 'MapIcon', group: '业务组件' },
  props: [
    { name: 'longitude', title: '经度', setter: 'NumberSetter' },
    { name: 'latitude', title: '纬度', setter: 'NumberSetter' }
  ]
});
```

注册自定义动作：

```js
ctx.registerAction('sendMessage', async (args, context) => {
  const { userId, content } = args;
  await messageService.send(userId, content);
});
```

最佳实践：
- 平台核心要稳定，插件接口要向后兼容。
- 插件之间尽量减少直接依赖，通过事件总线通信。
- 建立插件市场和认证机制，保证插件质量。
- 插件也要有版本管理和灰度发布。

**评分维度**：
- 能说出 4 个以上可扩展能力点（25%）
- 能设计插件化架构和插件协议（30%）
- 能说明插件注册、加载、隔离机制（25%）
- 能提到插件市场和版本管理（20%）

**常见错误**：
- 平台核心和扩展能力耦合，改一个功能要动核心。
- 插件没有隔离机制，导致样式冲突或 JS 污染。
- 插件接口不稳定，升级时大量插件失效。
- 忽略插件的安全审核。

**延伸追问**：
- 如何保证插件的质量和安全性？
- 如果两个插件都想扩展同一个设计器面板，怎么协调？

**相关题目**：
- [FB-52-EN-A-007 物料版本管理](#FB-52-EN-A-007)
- [FB-52-SD-R-001 企业级低代码平台架构](#FB-52-SD-R-001)

**参考资源**：
- [低代码引擎 - 插件机制](https://lowcode-engine.cn/site/docs/guide/design/plugin)
- [VS Code Extension API](https://code.visualstudio.com/api)

**口头回答版**：
> 低代码平台扩展性可以从组件、Setter、动作、数据源、设计器插件、出码插件几个点做。架构上平台核心保持稳定，通过插件管理器加载各种插件。插件要实现统一接口，平台暴露 PluginContext 让插件注册能力。插件可以静态打包，也可以运行时动态加载，加载后要做好样式和 JS 隔离。核心接口要向后兼容，插件也要有版本管理和质量认证。

---

### FB-52-SE-R-008：如何设计低代码平台的安全架构？

**题型**：安全题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：52 低代码
**标签**：低代码、安全架构、XSS、RCE、零信任、审计
**出现频率**：高频
**预计回答时长**：10-15 分钟

**题目描述**：
请设计一个企业级低代码平台的安全架构，覆盖设计态、运行态、数据、网络、权限、审计等层面，并说明如何防止常见攻击。

**参考答案**：

低代码平台的安全架构需要覆盖全链路，因为平台本身允许用户创建和发布应用，攻击面比普通应用更大。

一、分层安全架构

```text
┌─────────────────────────────────────────┐
│  应用层安全：输入校验、输出转义、组件安全    │
├─────────────────────────────────────────┤
│  平台层安全：权限、沙箱、表达式安全、审计   │
├─────────────────────────────────────────┤
│  服务层安全：网关鉴权、接口权限、数据脱敏   │
├─────────────────────────────────────────┤
│  基础设施安全：网络隔离、WAF、DDoS、加密   │
└─────────────────────────────────────────┘
```

二、各层安全措施

1. **应用层安全**
   - XSS 防御：组件默认转义输出，富文本用 DOMPurify 白名单过滤。
   - 表达式/脚本沙箱：禁止 `eval`、`new Function`，使用受限表达式引擎或 Web Worker 沙箱。
   - 上传安全：限制文件类型和大小，服务端扫描病毒，文件访问加权限控制。

2. **平台层安全**
   - 权限模型：RBAC + ABAC，支持页面、按钮、字段、数据行级权限。
   - 设计器权限：谁能编辑、谁能发布、谁能查看。
   - 物料审核：自定义组件和插件发布前做安全扫描。
   - 沙箱隔离：自定义组件用 iframe 或 Shadow DOM 隔离。

3. **服务层安全**
   - API 网关统一鉴权，所有请求必须携带有效 Token。
   - 接口权限校验：后端不信任前端传参，按用户身份校验数据访问范围。
   - 数据源安全：数据源配置加密存储，连接串不暴露给前端。
   - SSRF 防护：限制平台代理请求的 URL 白名单。

4. **基础设施安全**
   - 网络隔离：生产环境数据库不直接暴露。
   - WAF：防御 SQL 注入、XSS、CSRF 等 Web 攻击。
   - 传输加密：HTTPS/TLS 全链路加密。
   - 数据加密：敏感数据静态加密。

三、零信任原则

- 永不信任，始终验证。
- 每个请求都要做身份、权限、上下文校验。
- 最小权限原则：用户只能访问自己需要的数据和功能。

四、安全审计

- 记录用户登录、设计、发布、数据访问、权限变更等操作。
- 日志集中存储，支持追溯和分析。
- 异常行为告警，如大量数据导出、频繁登录失败。

五、常见攻击防御

| 攻击类型 | 防御手段 |
|---------|---------|
| XSS | 输出转义、CSP、DOMPurify |
| CSRF | Token 校验、SameSite Cookie |
| SQL 注入 | 参数化查询、ORM |
| SSRF | URL 白名单、禁止内网请求 |
| RCE | 表达式沙箱、禁止任意脚本执行 |
| 越权访问 | 后端严格校验数据权限 |
| 文件上传漏洞 | 白名单、大小限制、服务端扫描 |

最佳实践：
- 安全左移：在设计阶段就考虑安全，物料和插件发布前扫描。
- 默认安全：所有安全策略默认开启，不可关闭。
- 定期渗透测试和漏洞扫描。
- 建立安全事件响应机制。

**评分维度**：
- 能设计分层安全架构（25%）
- 能从应用、平台、服务、基础设施四层说明安全措施（35%）
- 能说明零信任和审计机制（20%）
- 能列出常见攻击及防御手段（20%）

**常见错误**：
- 只关注运行态安全，忽略设计态和物料安全。
- 前端做权限控制就认为是安全的。
- 允许用户执行任意 JavaScript 或 SQL。
- 数据源配置明文存储在前端。

**延伸追问**：
- 如果业务必须用自定义脚本，怎么保证安全？
- 低代码平台多租户场景下，如何保证租户间数据隔离？

**相关题目**：
- [FB-52-SE-A-008 低代码平台安全问题](#FB-52-SE-A-008)
- [FB-52-SD-R-001 企业级低代码平台架构](#FB-52-SD-R-001)

**参考资源**：
- [OWASP Low-Code/No-Code Top 10](https://owasp.org/www-project-top-10-low-code-no-code-security-risks/)
- [CSP - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

**口头回答版**：
> 低代码平台安全要分层做。应用层防 XSS、表达式沙箱、上传安全；平台层做权限模型、物料审核、沙箱隔离；服务层走 API 网关统一鉴权，后端校验数据权限，数据源配置加密，防 SSRF；基础设施层做网络隔离、WAF、HTTPS、数据加密。还要遵循零信任原则，所有请求都校验身份和权限。审计日志记录关键操作，异常行为告警。安全策略默认开启，定期做渗透测试。


