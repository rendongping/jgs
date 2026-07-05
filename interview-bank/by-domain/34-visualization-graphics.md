# 可视化与图形 面试题

> 本题库共收录 **35** 道面试题（基础 11 / 进阶 10 / 深入 7 / 架构 7）。
> 本文件收录 可视化与图形 相关面试题，目标题量 100 道。
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

### FB-34-CO-B-001：Canvas、SVG、WebGL、WebGPU 有什么区别？如何选择？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：34 可视化与图形
**标签**：Canvas、SVG、WebGL、WebGPU、技术选型
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请从渲染对象、接口层级、性能特征、适用场景等维度，对比 `canvas`、`svg`、`webgl`、`webgpu`，并给出选型建议。

**参考答案**：

核心区别：

| 维度 | Canvas 2D | SVG | WebGL | WebGPU |
|------|-----------|-----|-------|--------|
| 渲染模型 | 位图（立即模式） | 矢量 DOM | GPU 光栅化 | 现代 GPU 计算/图形 |
| API 层级 | 较高，命令式绘图 | 声明式 DOM | 较低，接近 GPU | 更低，显式管线 |
| 元素数量 | 适合大量简单图形 | 元素过多 DOM 重 | 可处理百万级顶点 | 可处理更大量计算 |
| 交互实现 | 手动命中检测 | DOM 事件天然支持 | 手动射线检测 | 手动射线检测 |
| 缩放清晰度 | 依赖分辨率 | 无损矢量 | 依赖分辨率/抗锯齿 | 依赖分辨率/抗锯齿 |
| 浏览器支持 | 广泛 | 广泛 | 较广，IE 需 polyfill | 较新，现代浏览器 |

选型建议：

- **SVG**：静态图标、简单图表、需要 CSS/ARIA 与 DOM 事件、元素数量 < 几千。
- **Canvas 2D**：动态 2D 游戏、复杂自定义图表、需要频繁重绘、对 DOM 节点数量敏感。
- **WebGL**：3D 场景、大规模 2D/3D 散点、热力图、粒子系统、需要 GPU 并行加速。
- **WebGPU**：下一代计算密集型可视化（大规模体渲染、GPU 聚类、AI 推理可视化），适合长期演进项目。

最佳实践：

- 先用高层图表库（ECharts、AntV）评估，不满足性能/定制需求再下沉到 Canvas/WebGL。
- 同屏元素超过 1-2 万时，优先考虑 Canvas/WebGL；超过 10 万时，考虑 WebGL 或数据聚合。

**评分维度**：
- 能准确区分四种技术的渲染模型与 API 层级（40%）
- 能结合元素数量、交互方式、缩放需求给出选型（35%）
- 能提到“先高层库再下沉”的工程思路（25%）

**常见错误**：
- 认为 Canvas 一定比 SVG 快（SVG 在少量元素+DOM 事件时开发效率更高）。
- 把 WebGL 当作“更快的 Canvas 2D”，忽略显存、着色器、管线等复杂度。
- 忽略 WebGPU 目前生态与浏览器兼容性成本。

**延伸追问**：
- 如果要在 Canvas 中支持 10 万个点的鼠标悬停，你会怎么做命中检测？
- 移动端对 WebGL/WebGPU 的支持和功耗有什么影响？

**相关题目**：
- [FB-34-CO-B-002 矢量与栅格](#FB-34-CO-B-002)
- [FB-34-CP-P-017 底层渲染技术权衡](#FB-34-CP-P-017)

**参考资源**：
- [MDN - Canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
- [MDN - SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)
- [MDN - WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)
- [MDN - WebGPU](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGPU_API)

**口头回答版**：
> Canvas 是位图命令式绘图，适合频繁重绘的自定义图形；SVG 是矢量 DOM，适合静态图标、可缩放、需要 DOM 事件的场景；WebGL 调用 GPU，适合 3D 和超大规模数据点；WebGPU 是下一代更底层的 GPU API，适合计算密集型可视化但兼容性还在成熟。选型时先看元素数量和交互复杂度，少量元素用 SVG，多了用 Canvas，海量用 WebGL/WebGPU，业务优先从高层库开始。

---

### FB-34-CO-B-002：矢量图形与栅格图形有何区别？SVG 和 Canvas 分别适合什么场景？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：34 可视化与图形
**标签**：SVG、Canvas、矢量、栅格、响应式
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释矢量图形与栅格图形的本质区别，并说明 SVG 和 Canvas 2D 在可视化项目中的典型适用场景。

**参考答案**：

- **矢量图形**：由几何描述（点、线、曲线、填充规则）定义，缩放时不会失真，文件通常较小，适合图标、图表、地图。
- **栅格图形**：由像素矩阵定义，缩放会模糊或锯齿，适合照片、复杂纹理、实时渲染输出。

SVG 与 Canvas 场景对比：

| 场景 | SVG | Canvas 2D |
|------|-----|-----------|
| 元素数量 | 少量到几千 | 几千到几十万 |
| 交互 | DOM 事件直接绑定 | 手动坐标命中检测 |
| 样式控制 | CSS / 属性 | 绘图 API 或程序化生成 |
| 可访问性 | 原生支持 `title`、`aria-*` | 需额外实现 |
| 动态重绘 | DOM 局部更新 | 全屏位图重绘 |
| 导出 | 矢量文件（.svg） | 位图（.png/.jpg） |

最佳实践：

- 业务图表、仪表板、可缩放插图优先 SVG 或基于 SVG 的库。
- 游戏、图像处理、大规模数据渲染、需要每帧重绘的动画优先 Canvas。

**评分维度**：
- 能解释矢量/栅格的本质差异（40%）
- 能从元素数量、交互、可访问性对比 SVG/Canvas（35%）
- 能给出典型场景举例（25%）

**常见错误**：
- 认为 SVG 性能永远优于 Canvas（SVG DOM 节点多时重排很重）。
- 忽略 Canvas 在可访问性上的短板。
- 把“矢量”等同于“小文件”，复杂 SVG 滤镜和路径也可能很大。

**延伸追问**：
- 在 Retina/高 DPR 屏幕上，Canvas 如何避免模糊？
- SVG 的 `viewBox` 和 `preserveAspectRatio` 如何配合实现响应式？

**相关题目**：
- [FB-34-CO-B-001 Canvas vs SVG vs WebGL vs WebGPU](#FB-34-CO-B-001)
- [FB-34-CO-B-006 响应式图表设计](#FB-34-CO-B-006)

**参考资源**：
- [MDN - SVG 教程](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)
- [MDN - Canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

**口头回答版**：
> 矢量图是用几何公式描述的，放大不会失真；栅格图是像素点阵，放大会模糊。SVG 是矢量，适合元素不多、需要交互和可访问性的图表；Canvas 是位图，适合元素很多、需要频繁重绘的动画和游戏场景。

---

### FB-34-CO-B-003：D3.js 的核心思想是什么？为什么它被称为“数据驱动文档”？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：34 可视化与图形
**标签**：D3.js、数据驱动、数据绑定、DOM
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 D3.js 的核心理念“数据驱动文档（Data-Driven Documents）”，并说明它与其他高层图表库的本质区别。

**参考答案**：

D3.js 不是“图表模板库”，而是一套将数据映射到 DOM（或 Canvas/SVG）的工具集。它的核心思想：

1. **数据绑定（Data Binding）**：把数组中的每个数据项与 DOM 元素一一对应。
2. **数据驱动更新（Data-Driven Update）**：数据变化时，通过 enter/update/exit 模式增删改 DOM。
3. **声明式转换（Transformations, not Representations）**：提供比例尺、布局、插值、选择器等原语，由开发者组合出任意图表。

与其他图表库的区别：

| 维度 | D3.js | ECharts / AntV / Highcharts |
|------|-------|-----------------------------|
| 抽象层级 | 底层工具集 | 高层封装 |
| 灵活性 | 可绘制任意可视化 | 受限于内置图表类型 |
| 学习成本 | 高 | 低 |
| 适用场景 | 定制可视化、探索性项目 | 标准业务图表 |

最佳实践：

- 当业务需要非标准、高度定制的可视化时用 D3；标准线图/柱状图/饼图用高层库更快。
- D3 可以与 React/Vue 结合，但需注意 DOM 所有权冲突，常用“D3 计算 + React 渲染”模式。

**评分维度**：
- 能说明“数据驱动文档”的含义（40%）
- 能解释数据绑定与 enter/update/exit 模式（35%）
- 能对比 D3 与高层图表库（25%）

**常见错误**：
- 把 D3 当作“另一种 ECharts”，只会调用封装好的组件。
- 在 React 中直接用 D3 操作 DOM 而不做生命周期隔离。
- 忽略 D3 的模块化和版本差异（v4+ 模块化、v6/v7 API 变化）。

**延伸追问**：
- D3 的 `selection.join()` 做了什么？
- 在 React 里使用 D3，应该如何避免冲突？

**相关题目**：
- [FB-34-CD-A-014 D3 比例尺与选择器](#FB-34-CD-A-014)
- [FB-34-FS-P-018 D3 join 模式演进](#FB-34-FS-P-018)

**参考资源**：
- [D3 官方文档](https://d3js.org/)
- [D3 数据绑定与 join](https://observablehq.com/@d3/selection-join)

**口头回答版**：
> D3.js 的核心是“数据驱动文档”，就是把数据绑定到 DOM 元素上，数据变了，DOM 就按 enter、update、exit 模式更新。它不是固定图表库，而是一套工具集，比例尺、布局、选择器可以自由组合。和 ECharts 比，D3 更灵活但学习成本高，适合定制化可视化。

---

### FB-34-CO-B-004：ECharts、AntV、Highcharts 等高层图表库与 D3.js 的本质区别是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：34 可视化与图形
**标签**：ECharts、AntV、图表库、技术选型
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 ECharts、AntV、Highcharts 等高层图表库与 D3.js，说明它们的抽象层级、使用方式与适用场景差异。

**参考答案**：

高层图表库提供“图表类型”抽象，开发者通过配置 `option` 或 `spec` 即可生成图表；D3.js 提供“图形原语”，开发者自己组合生成图表。

常见高层库特点：

| 库 | 渲染后端 | 特色 | 典型场景 |
|----|----------|------|----------|
| ECharts | Canvas/SVG 可选 | 配置驱动、生态丰富、中文文档 | 业务仪表板、大屏 |
| AntV（G2/G2Plot/L7） | Canvas/SVG/WebGL | 图形语法、地理、关系图 | 阿里系业务、复杂关系/地理 |
| Highcharts | SVG | 商业支持、兼容性好 | 企业报表、付费项目 |

与 D3 的区别：

- **开发效率**：高层库快，D3 慢。
- **可定制性**：D3 高，高层库受 schema 限制。
- **性能上限**：D3 可优化到接近底层，高层库受框架约束。
- **维护成本**：高层库社区维护，D3 自定义代码需自行维护。

最佳实践：

- 80% 的标准图表用高层库；20% 的特殊需求再用 D3 或自定义渲染。
- 选型时考虑团队熟悉度、国际化、商业授权、扩展机制。

**评分维度**：
- 能区分“配置型图表库”与“底层工具集”（40%）
- 能简述 ECharts/AntV/Highcharts 的特点（30%）
- 能给出选型建议（30%）

**常见错误**：
- 认为高层库性能一定差（ECharts Canvas 模式可处理大量数据）。
- 在简单场景硬上 D3，增加不必要成本。
- 忽略商业授权（Highcharts、FusionCharts 等）。

**延伸追问**：
- ECharts 的 `option` 和 AntV G2 的 `spec` 在理念上有什么不同？
- 高层图表库的扩展机制（如 ECharts 自定义 series、AntV 自定义 shape）如何实现？

**相关题目**：
- [FB-34-CO-B-003 D3 核心思想](#FB-34-CO-B-003)
- [FB-34-FS-A-011 ECharts 更新机制](#FB-34-FS-A-011)

**参考资源**：
- [ECharts 文档](https://echarts.apache.org/zh/option.html)
- [AntV 文档](https://antv.antgroup.com/)

**口头回答版**：
> ECharts、AntV、Highcharts 属于高层图表库，开发者传一个配置对象就能出图；D3 是底层工具集，需要自己绑定数据、画图形。高层库开发快、适合标准业务图表；D3 灵活、适合高度定制。选型看团队熟悉度和定制需求，大部分业务优先用高层库。

---

### FB-34-CA-B-005：下面两段代码分别用 Canvas 和 SVG 绘制一个矩形，二者在事件处理、缩放和样式修改上有何不同？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：34 可视化与图形
**标签**：Canvas、SVG、代码分析、交互
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```html
<!-- SVG -->
<svg width="200" height="200">
  <rect id="svgRect" x="10" y="10" width="100" height="80" fill="blue" />
</svg>
```

```js
// Canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 80);
```

请分析两种方式在事件处理、缩放清晰度、动态修改样式三个方面的差异。

**参考答案**：

- **事件处理**：
  - SVG：`rect` 是独立 DOM 节点，可直接绑定 `click`、`mouseenter` 等事件。
  - Canvas：矩形只是像素颜色，没有对象，需要手动做命中检测（如判断鼠标坐标是否在 `10,10,100,80` 内）。

- **缩放清晰度**：
  - SVG：矢量，放大不失真。
  - Canvas：位图，放大后边缘锯齿，高 DPR 屏需手动缩放 `canvas` 尺寸和 `ctx.scale`。

- **样式修改**：
  - SVG：直接修改属性或 CSS 类，浏览器局部重绘。
  - Canvas：需要清空画布并重绘，无法单独修改一个已绘制图形的属性。

示例：Canvas 命中检测

```js
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const hit = x >= 10 && x <= 110 && y >= 10 && y <= 90;
  console.log('hover rect?', hit);
});
```

**评分维度**：
- 正确指出 SVG 可事件绑定、Canvas 需命中检测（40%）
- 正确说明矢量/位图缩放差异（30%）
- 正确说明 Canvas 需重绘、SVG 可局部更新（30%）

**常见错误**：
- 认为 Canvas 也能直接给矩形绑定事件。
- 忽略 Canvas 的坐标系与 CSS 尺寸差异导致命中检测偏移。
- 认为 SVG 动画一定比 Canvas 快。

**延伸追问**：
- 如果 Canvas 里有 1000 个矩形需要分别绑定事件，怎样优化命中检测？
- 高 DPR 屏幕下 Canvas 如何保持清晰？

**相关题目**：
- [FB-34-CO-B-001 Canvas vs SVG](#FB-34-CO-B-001)
- [FB-34-CD-B-008 Canvas 柱状图 Tooltip](#FB-34-CD-B-008)

**参考资源**：
- [MDN - getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

**口头回答版**：
> SVG 的矩形是 DOM 节点，可以直接绑定事件，改属性或 CSS 就行；Canvas 画完就是像素，要自己做命中检测，改样式必须清空重绘。放大时 SVG 是矢量不会失真，Canvas 是位图会锯齿。

---

### FB-34-CO-B-006：响应式图表设计的基本原则有哪些？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：34 可视化与图形
**标签**：响应式、图表、SVG、Canvas
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明在设计响应式图表时应遵循的基本原则，以及 SVG 与 Canvas 在响应式实现上的差异。

**参考答案**：

响应式图表设计原则：

1. **容器感知**：图表组件应监听容器尺寸变化（`ResizeObserver` 或窗口 resize），而非仅监听窗口事件。
2. **比例尺/布局自适应**：坐标轴、边距、字体大小、图例位置随宽度变化动态调整。
3. **密度降级**：小屏幕时减少标签、隐藏次要元素、简化图例。
4. **矢量 vs 位图重绘**：SVG 通过 `viewBox` 可自动缩放；Canvas 需要重新设置宽高并 redraw。
5. **性能边界**：频繁 resize 时防抖/节流，避免每帧重算布局。

SVG 响应式示例：

```html
<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
  <!-- shapes -->
</svg>
```

Canvas 响应式示例：

```js
function resize() {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  draw(); // 重绘
}
```

最佳实践：

- 在 React/Vue 中封装图表容器组件，统一处理 resize、DPR、主题。
- 对移动端做手指缩放/平移适配，事件坐标需做 DPR 校正。

**评分维度**：
- 能列出 3 条以上响应式原则（40%）
- 能区分 SVG viewBox 与 Canvas 重绘机制（35%）
- 能提到 ResizeObserver 与防抖（25%）

**常见错误**：
- 只在 `window.resize` 中处理，忽略容器自身变化。
- Canvas 不处理 DPR，导致高清屏模糊。
- 小屏直接等比压缩，导致文字和标签重叠。

**延伸追问**：
- 如何在 SVG 中实现小屏幕自动隐藏坐标轴标签？
- Canvas 在 resize 时如何保存用户当前的缩放/平移状态？

**相关题目**：
- [FB-34-CO-B-002 SVG vs Canvas](#FB-34-CO-B-002)
- [FB-34-SC-A-010 大数据散点图优化](#FB-34-SC-A-010)

**参考资源**：
- [MDN - ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)

**口头回答版**：
> 响应式图表首先要监听容器尺寸变化，用 ResizeObserver 最好；然后比例尺、边距、标签要自适应，小屏要降级简化。SVG 靠 viewBox 自动缩放，Canvas 得重新设置宽高并按 DPR 缩放后重绘。

---

### FB-34-CO-B-007：图表可访问性需要关注哪些方面？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：34 可视化与图形、07 可访问性
**标签**：可访问性、a11y、图表、交互
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明在数据可视化中，应如何保障视障用户、色盲用户和键盘用户的需求。

**参考答案**：

可视化可访问性要点：

1. **语义化数据**：提供可聚焦的数据表格或 ARIA 描述，使屏幕阅读器能朗读数据。
2. **键盘导航**：所有交互元素（图例开关、数据点、Tooltip 触发区）支持 `Tab` / `Enter` / 方向键。
3. **颜色安全**：避免仅用颜色传递信息；使用图案、标签、形状辅助；选择色盲友好配色（如避免红绿对比）。
4. **对比度**：文字、轴线、关键数据满足 WCAG 4.5:1 对比度。
5. **动态内容提示**：Tooltip、筛选结果通过 `aria-live` 区域通知屏幕阅读器。
6. **可缩放**：支持浏览器缩放 200% 不丢失信息。

示例：SVG 条形图 ARIA

```html
<svg role="img" aria-label="2024 年各季度销售额">
  <rect role="graphics-symbol" aria-label="Q1 销售额 120 万" tabindex="0" ... />
</svg>
```

最佳实践：

- Canvas 需额外提供屏幕阅读器可访问的隐藏数据表格或 `aria-label`。
- 提供“下载数据”入口，让用户可用自己的工具分析。

**评分维度**：
- 能覆盖语义化、键盘、颜色、对比度至少 3 个方面（50%）
- 能给出 SVG/Canvas 的具体做法（30%）
- 能提到 WCAG 与色盲友好配色（20%）

**常见错误**：
- 认为可视化天然是“看的”，忽略无障碍。
- 用颜色作为唯一信息通道。
- Canvas 未做任何 ARIA 或替代文本。

**延伸追问**：
- 如何为 Canvas 热力图提供屏幕阅读器支持？
- 动态图表数据更新时，如何通知读屏软件？

**相关题目**：
- [FB-34-CO-P-023 颜色与视觉编码](#FB-34-CO-P-023)
- [FB-34-SD-R-026 可视化组件库设计](#FB-34-SD-R-026)

**参考资源**：
- [WCAG 2.2 可视化指南](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [ECharts ARIA](https://echarts.apache.org/zh/tutorial.html#%E6%97%A0%E9%9A%9C%E7%A2%8D%E6%B5%8B%E8%AF%95)

**口头回答版**：
> 图表可访问性要关注三点：给屏幕阅读器提供数据语义或表格，让键盘能操作图例和数据点，不要只用颜色表达信息，要配合图案和标签，还要注意对比度和色盲友好。Canvas 因为没有 DOM，需要额外做 aria-label 或隐藏数据表。

---

### FB-34-CD-B-008：用 Canvas 手写一个简易柱状图，支持鼠标悬停显示当前柱数值。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：34 可视化与图形
**标签**：Canvas、手写代码、图表、交互
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
给定如下数据，请用 Canvas 2D API 绘制一个柱状图，并实现鼠标悬停时在控制台打印当前柱子对应的数据。

```js
const data = [
  { label: 'A', value: 30 },
  { label: 'B', value: 80 },
  { label: 'C', value: 45 },
  { label: 'D', value: 60 },
];
```

**参考答案**：

```html
<canvas id="chart" width="400" height="300"></canvas>
```

```js
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const data = [
  { label: 'A', value: 30 },
  { label: 'B', value: 80 },
  { label: 'C', value: 45 },
  { label: 'D', value: 60 },
];

const padding = 40;
const chartW = canvas.width - padding * 2;
const chartH = canvas.height - padding * 2;
const maxValue = Math.max(...data.map(d => d.value));
const barWidth = chartW / data.length * 0.6;
const gap = chartW / data.length * 0.4;

const bars = [];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#333';
  data.forEach((d, i) => {
    const x = padding + i * (barWidth + gap) + gap / 2;
    const h = (d.value / maxValue) * chartH;
    const y = canvas.height - padding - h;
    ctx.fillRect(x, y, barWidth, h);
    bars[i] = { x, y, w: barWidth, h, data: d };
  });
}

draw();

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const hit = bars.find(b => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h);
  if (hit) {
    console.log(hit.data.label, hit.data.value);
  }
});
```

要点：

- 计算每根柱子的坐标和尺寸，保存在 `bars` 数组中用于命中检测。
- 鼠标事件坐标需用 `getBoundingClientRect` 转换到 canvas 内部坐标。
- 生产环境应补 Tooltip 渲染、DPR 缩放、resize 重绘等。

**评分维度**：
- 能正确绘制柱状图并计算坐标（40%）
- 能实现鼠标命中检测（35%）
- 能处理坐标转换与 redraw 边界（25%）

**常见错误**：
- 事件坐标未做 `getBoundingClientRect` 校正。
- 每次 `mousemove` 都重绘（未做优化或无需重绘时仍重绘）。
- 不保存柱子位置，导致无法命中检测。

**延伸追问**：
- 如果柱子数量达到 1 万，这种命中检测会有什么问题？
- 如何实现一个跟随鼠标的 Tooltip 而不闪烁？

**相关题目**：
- [FB-34-CA-B-005 Canvas vs SVG 矩形](#FB-34-CA-B-005)
- [FB-34-PE-A-012 Canvas 性能优化](#FB-34-PE-A-012)

**参考资源**：
- [MDN - CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)

**口头回答版**：
> 先用 Canvas 画好柱子的坐标和高度，同时把每根柱子的位置信息存到一个数组里。然后在 mousemove 里把鼠标坐标换算到 canvas 内，去数组里找落在哪个柱子区域，找到了就输出对应数据。要注意坐标转换，不然 CSS 尺寸和 canvas 分辨率不一致会偏移。

---
## 进阶题（8 道）{#advanced}

### FB-34-CO-A-009：Canvas 2D 渲染管线、像素操作与离屏缓存分别是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：34 可视化与图形
**标签**：Canvas、渲染管线、离屏渲染、像素操作
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Canvas 2D 的渲染管线、像素操作能力（`getImageData` / `putImageData`）以及离屏缓存（Offscreen Canvas）的作用与使用场景。

**参考答案**：

Canvas 2D 渲染管线可简化为：

1. **构建绘制指令队列**：`fillRect`、`strokePath` 等调用不会立即绘制，而是进入 2D 上下文的内部状态机。
2. **光栅化**：浏览器将矢量指令转换为像素，写入 backing store（位图缓冲区）。
3. **合成**：Canvas 作为单一图层与页面其他 DOM 合成。

像素操作：

- `ctx.getImageData(x, y, w, h)`：读取像素 RGBA 数组。
- `ctx.putImageData(imageData, x, y)`：写回像素。
- 典型用途：滤镜、颜色拾取、碰撞检测、图像处理。

注意：`getImageData` 会触发 CPU 回读（readback），在频繁调用时性能差。

离屏缓存：

- 使用 `new OffscreenCanvas(w, h)` 或 `document.createElement('canvas')` 创建不挂载到 DOM 的 canvas。
- 将静态背景、复杂图形预先绘制到离屏 canvas，主 canvas 用 `drawImage` 快速拷贝。
- 适用：地图底图、网格、坐标轴、图例等更新频率低的元素。

示例：

```js
const off = document.createElement('canvas');
off.width = 800;
off.height = 600;
const offCtx = off.getContext('2d');
// 绘制复杂但静态的背景
offCtx.fillStyle = '#f5f5f5';
offCtx.fillRect(0, 0, 800, 600);

// 主循环
function draw() {
  ctx.clearRect(0, 0, 800, 600);
  ctx.drawImage(off, 0, 0); // 拷贝静态层
  drawDynamicData(ctx);      // 只重绘动态数据
}
```

最佳实践：

- 分层渲染：静态层、动态层、交互层分离，减少每帧重绘面积。
- 避免频繁 `getImageData`，可改用空间索引做命中检测。

**评分维度**：
- 能说明 Canvas 2D 渲染管线（30%）
- 能解释 getImageData/putImageData 及 readback 代价（35%）
- 能给出离屏缓存与分层渲染方案（35%）

**常见错误**：
- 认为 `getImageData` 是零成本操作。
- 离屏 canvas 绘制完成后仍每次都重绘静态内容。
- 忽略 `OffscreenCanvas` 可在 Web Worker 中使用以解耦主线程。

**延伸追问**：
- `OffscreenCanvas` 和 `document.createElement('canvas')` 在 Worker 中的区别是什么？
- 如何利用 `putImageData` 实现一个像素级热力图？

**相关题目**：
- [FB-34-PE-A-012 Canvas 性能调优](#FB-34-PE-A-012)
- [FB-34-SC-A-010 10 万散点图优化](#FB-34-SC-A-010)

**参考资源**：
- [MDN - OffscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas)
- [MDN - ImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)

**口头回答版**：
> Canvas 2D 的渲染管线是把绘图指令转成位图像素，再和页面合成。像素操作可以用 getImageData 读、putImageData 写，但会触发 CPU 回读，比较贵。离屏缓存就是另外创建一个不显示的 canvas，把静态背景提前画好，主 canvas 每帧 drawImage 贴过来，这样动态部分只需重绘一次。

---

### FB-34-SC-A-010：一个 10 万数据点的散点图在 SVG/Canvas 中卡顿，你会从哪些层面优化？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：34 可视化与图形
**标签**：性能优化、大数据、Canvas、WebGL
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
某 BI 系统需要展示 10 万个数据点的散点图，用户在 SVG 实现中遇到缩放、平移严重卡顿。请给出系统性的优化方案。

**参考答案**：

优化分层：

1. **数据层**：
   - **聚合/降采样**：按像素网格合并点（如 1px×1px 一个桶），避免 oversampling。
   - **LOD**：不同缩放级别加载不同粒度数据；放大后才展示完整数据。
   - **数据分片**：只加载视口内数据，结合服务端裁剪。

2. **渲染层**：
   - **换 Canvas/WebGL**：SVG 1 万个节点已是瓶颈，10 万必须 GPU 渲染。
   - **WebGL 点精灵**：每个点用一个 sprite，利用 GPU instancing 绘制百万点。
   - **分层渲染**：背景网格、坐标轴用离屏缓存；动态数据单独一层。

3. **交互层**：
   - **空间索引**：用 R-tree、KD-tree 或网格索引加速命中检测。
   - **节流/防抖**：缩放平移事件 16ms 一帧，避免每鼠标事件都重算。
   - **延迟 Tooltip**：鼠标停稳 100ms 后再查询最近点。

4. **视觉层**：
   - **半透明混合**：大量重叠点时使用半透明，展示密度。
   - **热力图替代**：过密区域用核密度估计转热力图。

示例：简单网格聚合

```js
function aggregate(points, cellSize, width, height) {
  const grid = new Map();
  for (const p of points) {
    const gx = Math.floor(p.x / cellSize);
    const gy = Math.floor(p.y / cellSize);
    const key = `${gx},${gy}`;
    grid.set(key, (grid.get(key) || 0) + 1);
  }
  // 每个网格只画一个代表点或颜色深浅
  return Array.from(grid.entries()).map(([k, count]) => {
    const [gx, gy] = k.split(',').map(Number);
    return { x: gx * cellSize, y: gy * cellSize, count };
  });
}
```

最佳实践：

- 先用 Chrome Performance 面板定位瓶颈（是 CPU 数据处理还是 GPU 绘制）。
- 优化前先定义可接受延迟：首次渲染 < 1s，交互帧率 > 30fps。

**评分维度**：
- 能从数据、渲染、交互、视觉四个层面给出方案（40%）
- 能提出聚合、LOD、空间索引等关键技术（35%）
- 能给出从 SVG 迁移到 Canvas/WebGL 的理由（25%）

**常见错误**：
- 只关注渲染，忽略数据聚合。
- 用 SVG group 装 10 万个 circle，期待通过 CSS 优化解决。
- 命中检测时遍历全部点，O(n) 查找。

**延伸追问**：
- 如果 10 万点需要支持框选，怎样快速得到选中集合？
- WebGL 点精灵做 hover 高亮的难点是什么？

**相关题目**：
- [FB-34-PE-A-012 Canvas 性能调优](#FB-34-PE-A-012)
- [FB-34-PE-P-019 地图瓦片化与 LOD](#FB-34-PE-P-019)

**参考资源**：
- [ECharts 大数据散点图](https://echarts.apache.org/examples/zh/editor.html?c=scatter-large)
- [deck.gl 大数据可视化](https://deck.gl/)

**口头回答版**：
> 10 万点 SVG 基本跑不动，首先从数据层做聚合和 LOD，按像素网格合并点；然后渲染层切到 Canvas 或 WebGL，用点精灵批量绘制；交互层用 R-tree 或网格索引做命中检测，缩放平移事件要节流。视觉上太密可以换成热力图或半透明点。

---

### FB-34-FS-A-011：ECharts 的 series、data、option 更新机制是怎样的？如何避免“全量更新”？

**题型**：框架原理题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：34 可视化与图形
**标签**：ECharts、框架原理、性能优化、数据驱动
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 ECharts 中 `option`、`series`、`data` 的更新机制，并解释为什么“每次 setOption 传全新对象”会导致性能问题，如何避免。

**参考答案**：

ECharts 更新机制：

1. **option diff**：调用 `setOption(option, { notMerge: false })` 时，ECharts 会对比新旧 option，尽可能复用 series、组件实例。
2. **series 映射**：默认按 `series.id` 或数组索引识别 series，命中则更新，未命中则创建/销毁。
3. **data 更新**：在 series 内部，数据变化会触发图表重算布局、分片、绘制。

全量更新的问题：

- 每次传入全新 option 对象，即使内容相同，diff 也可能误判为变化，导致 series、graphic、坐标轴重建。
- 大数据 series 重建会重新计算 `points`、`layout`，造成主线程卡顿。
- 动画状态丢失、交互选中状态重置。

避免策略：

- **保持 option 引用稳定**：只修改需要变化的字段，不要深拷贝整个 option。
- **使用 `series.id`**：给 series 固定 `id`，避免按索引匹配错位。
- **增量更新数据**：使用 `chart.appendData`（部分系列支持）或只修改 `series.data` 引用。
- **关闭不必要的动画/合并**：高频更新时设置 `animation: false`，必要时 `notMerge: true` 明确控制。

示例：

```js
// 不推荐：每次生成新 option
chart.setOption({
  series: [{ data: newData }]
});

// 推荐：指定 id，局部更新
chart.setOption({
  series: [{ id: 'sales', data: newData }]
});
```

最佳实践：

- 将 ECharts option 的“静态配置”与“动态数据”分离，避免无关字段参与 diff。
- 对实时流数据，使用 `appendData` 或手动维护数据窗口（滑动窗口）。

**评分维度**：
- 能说明 setOption 的 diff 与 series 匹配机制（35%）
- 能指出全量更新的性能与状态问题（30%）
- 能给出 id、增量更新、引用稳定等解决方案（35%）

**常见错误**：
- 每次 `setOption` 都设置 `notMerge: true`。
- 用 `JSON.parse(JSON.stringify(option))` 生成全新配置。
- 实时更新时同时开启动画和频繁 setOption。

**延伸追问**：
- ECharts 的 `setOption` 第二个参数有哪些选项？
- 在 React 中把 ECharts option 放在 state 里，如何避免不必要重渲染？

**相关题目**：
- [FB-34-CO-B-004 高层图表库对比](#FB-34-CO-B-004)
- [FB-34-SC-P-021 实时数据流可视化](#FB-34-SC-P-021)

**参考资源**：
- [ECharts setOption API](https://echarts.apache.org/zh/api.html#echartsInstance.setOption)
- [ECharts 动态数据](https://echarts.apache.org/zh/tutorial.html#%E5%BC%82%E6%AD%A5%E6%95%B0%E6%8D%AE%E5%8A%A0%E8%BD%BD%E5%92%8C%E6%9B%B4%E6%96%B0)

**口头回答版**：
> ECharts 的 setOption 会对比新旧 option 做 diff，默认按 series 索引或 id 匹配，命中就更新，没命中就重建。如果每次都传全新的 option，会导致 series 重建、动画和选中状态丢失。优化办法是给 series 加固定 id、保持 option 引用稳定、用 appendData 增量更新数据，高频更新时关掉动画。

---

### FB-34-PE-A-012：Canvas 大数据量渲染性能调优：离屏渲染、分层、脏矩形、requestAnimationFrame

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：34 可视化与图形
**标签**：性能优化、Canvas、大数据、离屏渲染
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Canvas 渲染大数据量图形时，离屏渲染、分层、脏矩形和 `requestAnimationFrame` 各自的作用，并给出一个组合优化思路。

**参考答案**：

四项技术：

| 技术 | 作用 | 典型场景 |
|------|------|----------|
| 离屏渲染 | 预渲染静态内容，主 canvas 只拷贝 | 背景、网格、坐标轴 |
| 分层 | 多个 canvas/上下文按更新频率分离 | 背景层、数据层、交互层 |
| 脏矩形 | 只重绘变化区域 | 局部高亮、选中框、Tooltip |
| requestAnimationFrame | 与显示器刷新同步，避免过度绘制 | 动画、连续交互 |

组合思路：

1. **背景层（低频）**：用离屏 canvas 绘制网格、坐标轴、图例，只在 resize/主题变化时重绘。
2. **数据层（中频）**：主 canvas 绘制数据点/线；缩放平移时通过 `setTransform` 或重采样避免全量重绘。
3. **交互层（高频）**：单独一个透明 canvas 或 SVG 叠加层，只绘制 hover、选区、brush 等局部元素，配合脏矩形重绘。
4. **调度**：所有动画和连续事件统一放进 `requestAnimationFrame` 队列，避免一事件一帧。

示例：双 canvas 分层

```html
<div style="position:relative; width:800px; height:600px;">
  <canvas id="bg" width="800" height="600" style="position:absolute;"></canvas>
  <canvas id="data" width="800" height="600" style="position:absolute;"></canvas>
</div>
```

```js
function renderLoop() {
  // 背景层只在需要时重绘
  // dataCtx 绘制动态数据
  requestAnimationFrame(renderLoop);
}
```

最佳实践：

- 用 `transform` 实现缩放平移时，先确认是否只需重绘视口内的数据。
- 脏矩形需要维护每个图元的最小包围盒，复杂形状可近似为矩形。

**评分维度**：
- 能解释四项技术各自含义（40%）
- 能给出分层架构设计（30%）
- 能结合 requestAnimationFrame 说明绘制调度（30%）

**常见错误**：
- 把所有元素都画在一个 canvas，每次交互全量 clearRect。
- 脏矩形实现不完善，留下残影或漏绘。
- 在 `mousemove` 中直接 draw，未使用 rAF 合并。

**延伸追问**：
- 脏矩形重叠时如何合并重绘区域？
- 离屏 canvas 占用显存/内存过大时怎么办？

**相关题目**：
- [FB-34-CO-A-009 渲染管线与离屏缓存](#FB-34-CO-A-009)
- [FB-34-SC-A-010 10 万散点图优化](#FB-34-SC-A-010)

**参考资源**：
- [MDN - requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)
- [HTML5 Canvas 性能优化](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)

**口头回答版**：
> Canvas 大数据优化通常用四层：离屏 canvas 预画静态背景，分层把背景和数据分开，脏矩形只重绘变化的小块，requestAnimationFrame 统一调度避免一事件一帧。这样每一帧只画最少的内容，保持流畅。

---

### FB-34-CO-A-013：可视化中的缩放、平移、刷选、Tooltip 有哪些实现要点？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：34 可视化与图形
**标签**：交互、Canvas、SVG、图表
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请分别说明数据可视化中缩放（Zoom）、平移（Pan）、刷选（Brush）、提示框（Tooltip）的实现要点与常见陷阱。

**参考答案**：

- **缩放/平移**：
  - 维护一个视图变换矩阵（或 scale/translate），把屏幕坐标映射到数据坐标。
  - 在 Canvas 中可用 `ctx.save/restore` + `ctx.scale/translate`，或用 shader 变换。
  - 对大数据需做 LOD / 数据裁剪，避免全量重绘。
  - 鼠标滚轮缩放要以光标位置为中心，需先转换坐标再调整 transform。

- **刷选（Brush）**：
  - 记录鼠标按下和抬起时的屏幕坐标，转换为数据域范围。
  - 提供矩形、套索、时间范围等多种刷选模式。
  - 刷选结果通过事件通知其他视图联动（cross-filtering）。

- **Tooltip**：
  - 命中检测：对 SVG 直接事件委托；对 Canvas 用空间索引或最近邻搜索。
  - 定位：避免超出视口，可自动调整上下左右。
  - 内容：支持格式化、异步加载、数据钻取。

坐标变换示例：

```js
function screenToData(x, y, transform, xScale, yScale) {
  const dataX = xScale.invert((x - transform.x) / transform.k);
  const dataY = yScale.invert((y - transform.y) / transform.k);
  return { x: dataX, y: dataY };
}
```

最佳实践：

- 把交互状态（transform、brush range、hover index）独立成状态机，便于联动和回退。
- 缩放/平移事件节流到 rAF；Tooltip 查询防抖 50-100ms。

**评分维度**：
- 能分别说明四种交互的实现要点（40%）
- 能正确处理屏幕坐标与数据坐标转换（30%）
- 能提到大数据下的 LOD、空间索引等优化（30%）

**常见错误**：
- 缩放中心点计算错误，导致“跳变”。
- 刷选时未处理坐标系方向（如 SVG y 轴向下）。
- Tooltip 每次鼠标移动都重查全量数据。

**延伸追问**：
- 如何实现双指触摸缩放？
- 多个图表联动刷选时，如何防止循环更新？

**相关题目**：
- [FB-34-CD-B-008 Canvas 柱状图 Tooltip](#FB-34-CD-B-008)
- [FB-34-SC-P-021 实时数据流交互](#FB-34-SC-P-021)

**参考资源**：
- [D3 Zoom 行为](https://github.com/d3/d3-zoom)
- [D3 Brush 行为](https://github.com/d3/d3-brush)

**口头回答版**：
> 缩放平移要维护一个变换矩阵，把屏幕坐标映射回数据坐标，大数据时要结合 LOD。刷选就是记录鼠标框选范围转成数据区间，用来联动过滤。Tooltip 要做命中检测，SVG 直接事件委托，Canvas 要用空间索引或最近邻。注意缩放中心不要跳变，Tooltip 查询要防抖。

---

### FB-34-CD-A-014：用 D3.js 的 scale 和 selection 将一组数据绑定到一组矩形上，并实现 enter/update/exit 更新。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：34 可视化与图形
**标签**：D3.js、手写代码、数据绑定、数据驱动
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
给定数据数组，请用 D3.js v7 的 `scaleLinear`、`selectAll`、`data`、`join` 绘制一组随数据变化的矩形。

```js
const data = [
  { id: 'a', value: 30 },
  { id: 'b', value: 80 },
  { id: 'c', value: 45 },
];
```

**参考答案**：

```html
<svg id="chart" width="400" height="200"></svg>
```

```js
import * as d3 from 'd3';

const svg = d3.select('#chart');
const width = 400;
const height = 200;
const margin = { top: 10, right: 10, bottom: 20, left: 30 };

const xScale = d3.scaleBand()
  .domain(data.map(d => d.id))
  .range([margin.left, width - margin.right])
  .padding(0.2);

const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height - margin.bottom, margin.top]);

function update(newData) {
  svg.selectAll('rect')
    .data(newData, d => d.id)
    .join(
      enter => enter.append('rect')
        .attr('x', d => xScale(d.id))
        .attr('y', height - margin.bottom)
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('fill', 'steelblue')
        .call(enter => enter.transition().duration(500)
          .attr('y', d => yScale(d.value))
          .attr('height', d => yScale(0) - yScale(d.value))),
      update => update.call(update => update.transition().duration(500)
        .attr('x', d => xScale(d.id))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale(0) - yScale(d.value))),
      exit => exit.call(exit => exit.transition().duration(500)
        .attr('y', height - margin.bottom)
        .attr('height', 0)
        .remove())
    );
}

update(data);
```

要点：

- `data(newData, d => d.id)` 用 `id` 做 key，确保数据项与 DOM 元素稳定对应。
- `join` 同时处理 enter/update/exit，避免手动调用 `enter/exit`。
- 比例尺将数据域映射为屏幕像素，`range` 方向需注意 SVG y 轴向下。

**评分维度**：
- 能正确使用 scaleBand/scaleLinear（30%）
- 能用 join 处理 enter/update/exit（40%）
- 能用 key function 稳定数据绑定（30%）

**常见错误**：
- 不写 key function，导致数据顺序变化时 DOM 被错误复用。
- 未处理 exit，旧矩形残留。
- y 轴方向搞反，柱子从顶部向下长。

**延伸追问**：
- D3 v6/v7 的 `selection.join` 与 v5 的 enter/merge 写法有何不同？
- 在 React 中如何封装这段逻辑以避免 DOM 冲突？

**相关题目**：
- [FB-34-CO-B-003 D3 核心思想](#FB-34-CO-B-003)
- [FB-34-FS-P-018 D3 join 模式演进](#FB-34-FS-P-018)

**参考资源**：
- [D3 Scales](https://d3js.org/d3-scale)
- [D3 Selection Join](https://d3js.org/d3-selection/joining)

**口头回答版**：
> 用 D3 先定义 band 和 linear 比例尺，把 id 映射到 x，value 映射到 y。然后用 selectAll('rect').data(data, d => d.id).join() 做数据绑定，enter 时 append 矩形并动画进入，update 时更新位置和高度，exit 时动画移除。记得用 id 做 key，否则数据顺序一变 DOM 会错位。

---

### FB-34-CO-A-015：WebGL 与 Canvas 2D 的本质区别是什么？请简述顶点着色器、片元着色器和缓冲区的角色。

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：34 可视化与图形、50 WebGPU / 图形学
**标签**：WebGL、GPU、渲染管线、着色器
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 WebGL 与 Canvas 2D 在渲染模型上的本质区别，并说明顶点着色器、片元着色器和缓冲区在 WebGL 管线中的作用。

**参考答案**：

本质区别：

- **Canvas 2D**：CPU 端命令式 2D API，浏览器在 CPU 上做路径、填充、光栅化，结果写入位图。
- **WebGL**：基于 OpenGL ES 的浏览器 3D/2D GPU API，开发者显式定义顶点、着色器、缓冲区，由 GPU 并行光栅化。

WebGL 管线角色：

- **顶点着色器（Vertex Shader）**：
  - 输入：顶点位置、颜色、纹理坐标等属性。
  - 输出：裁剪空间坐标 `gl_Position`，以及传给片元着色器的 varyings。
  - 典型工作：模型-视图-投影变换、顶点颜色插值。

- **片元着色器（Fragment Shader）**：
  - 输入：由顶点着色器插值后的 varyings。
  - 输出：像素颜色 `gl_FragColor`（或颜色附件）。
  - 典型工作：纹理采样、光照计算、颜色映射。

- **缓冲区（Buffer）**：
  - GPU 显存中的数据块，用于存储顶点属性（位置、颜色、UV）。
  - 通过 `gl.bufferData` 上传，绘制时按 `gl.drawArrays` / `gl.drawElements` 读取。

示例：最简单的顶点着色器

```glsl
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  gl_PointSize = 10.0;
}
```

最佳实践：

- WebGL 适合大量重复图元（点、线、三角形），用 instancing 可减少 draw call。
- 学习曲线陡峭，复杂业务可先用 Three.js、deck.gl、luma.gl 等库封装。

**评分维度**：
- 能说明 WebGL 与 Canvas 2D 的 CPU/GPU 渲染差异（35%）
- 能解释顶点着色器、片元着色器、缓冲区的作用（40%）
- 能提到 instancing 或高层封装库（25%）

**常见错误**：
- 认为 WebGL 只能做 3D（2D 点精灵、线图同样高效）。
- 把顶点着色器和片元着色器职责混淆。
- 忽略 buffer 创建/上传/释放对显存的影响。

**延伸追问**：
- WebGL 的绘制调用 draw call 过多会有什么性能问题？
- 如何在 WebGL 中实现 2D 点的高亮 hover？

**相关题目**：
- [FB-34-CO-P-020 GPU 加速与着色器](#FB-34-CO-P-020)
- [FB-34-CP-P-017 底层渲染技术权衡](#FB-34-CP-P-017)

**参考资源**：
- [MDN - WebGL 基础](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL)
- [WebGL Fundamentals](https://webglfundamentals.org/)

**口头回答版**：
> Canvas 2D 是 CPU 画图的 2D API，WebGL 是调用 GPU 的底层 API。顶点着色器把模型坐标转成裁剪空间坐标，片元着色器决定每个像素的颜色，缓冲区是存在显存里的顶点数据。WebGL 适合大量重复图元，做 2D 散点、3D 场景都很高效。

---

### FB-34-EN-A-016：可视化工程架构中，如何分离组件、数据、样式与渲染器？

**题型**：工程化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：34 可视化与图形
**标签**：工程化、组件化、架构设计、分层
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在构建一个中大型可视化应用时，应该如何拆分“组件层、数据层、样式层、渲染器层”？请给出目录结构与关键接口设计思路。

**参考答案**：

分层职责：

| 层级 | 职责 | 示例模块 |
|------|------|----------|
| 组件层 | 容器、生命周期、事件转发、主题注入 | `ChartContainer`、`Legend`、`Tooltip` |
| 数据层 | 数据解析、转换、聚合、比例尺 | `DataModel`、`Scales`、`Aggregator` |
| 样式层 | 主题、token、尺寸、颜色映射 | `ThemeProvider`、`StyleSheet`、`ColorPalette` |
| 渲染器层 | 抽象绘制接口，屏蔽 SVG/Canvas/WebGL | `SvgRenderer`、`CanvasRenderer`、`WebGLRenderer` |

关键接口设计：

```ts
interface Renderer {
  render(scene: SceneGraph, viewport: Viewport): void;
  destroy(): void;
  pick(x: number, y: number): Element[];
}

interface SceneGraph {
  nodes: Node[];
  scales: { x: Scale; y: Scale };
  styles: StyleSheet;
}
```

目录示例：

```text
src/
  components/        # React/Vue 组件
  data/              # 数据模型、转换、聚合
  renderer/          # SVG/Canvas/WebGL 渲染器
  theme/             # 主题与样式 token
  interaction/       # 缩放、平移、刷选、Tooltip
  utils/             # 坐标转换、空间索引
```

最佳实践：

- 渲染器层通过统一接口支持切换后端，便于根据数据规模降级或升级。
- 样式层使用 design token，保证主题、暗色模式、可访问性颜色一致。
- 数据层与渲染层解耦，便于单元测试和 server-side 预处理。

**评分维度**：
- 能清晰划分四个层级的职责（40%）
- 能给出渲染器抽象接口（30%）
- 能说明解耦带来的测试与可维护性收益（30%）

**常见错误**：
- 把所有逻辑塞进一个巨型 Chart 组件。
- 渲染器与 DOM 框架深度耦合，无法迁移到 Canvas/WebGL。
- 样式硬编码，无法换肤。

**延伸追问**：
- 如果未来要支持 WebGPU，渲染器接口需要怎样演进？
- 如何设计主题 token 才能让 SVG 和 Canvas 共享同一份颜色配置？

**相关题目**：
- [FB-34-SD-R-026 可视化组件库设计](#FB-34-SD-R-026)
- [FB-34-SD-R-024 BI 可视化平台架构](#FB-34-SD-R-024)

**参考资源**：
- [AntV 架构设计](https://antv.antgroup.com/)
- [Observable Plot 架构](https://observablehq.com/plot/)

**口头回答版**：
> 可视化工程应该分四层：组件层负责容器和生命周期，数据层负责解析、聚合和比例尺，样式层负责主题和颜色 token，渲染器层负责真正画图。渲染器要抽象统一接口，让 SVG、Canvas、WebGL 可以互换。这样数据层好测试，渲染层好升级，样式好换肤。

---
## 深入题（7 道）{#proficient}

### FB-34-CP-P-017：为一款 BI 数据产品选择底层渲染技术，如何权衡 Canvas/SVG/WebGL/WebGPU？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：34 可视化与图形
**标签**：技术选型、BI、Canvas、WebGL、WebGPU
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
你正在设计一款 BI 数据产品的可视化引擎，需要支持常见统计图表、地理热力图、关系网络和实时大屏。请说明如何在 Canvas、SVG、WebGL、WebGPU 之间做权衡，并给出迁移路径。

**参考答案**：

权衡维度：

| 维度 | SVG | Canvas 2D | WebGL | WebGPU |
|------|-----|-----------|-------|--------|
| 标准图表 | 极佳 | 好 | 中（过度） | 差（过度） |
| 大数据 | 差 | 中 | 极佳 | 极佳 |
| 3D/地理 | 差 | 中 | 极佳 | 极佳 |
| 可访问性 | 极佳 | 差 | 差 | 差 |
| 浏览器兼容 | 极佳 | 极佳 | 好 | 新 |
| 团队成本 | 低 | 中 | 高 | 高 |

BI 产品分层策略：

1. **默认 SVG**：柱状图、折线图、饼图等标准图表，优先保证可访问性、导出、主题、交互。
2. **Canvas 兜底**：当同屏元素 > 1 万、或需要复杂自定义绘制时切换 Canvas。
3. **WebGL 专项**：地理热力图、关系网络、百万级散点、3D 大屏。
4. **WebGPU 前瞻**：在实验性功能（实时体渲染、GPU 聚合、AI 可视化）中预研。

迁移路径：

- 通过统一的 **Renderer 抽象层**屏蔽后端差异，数据模型和比例尺不变。
- 先实现 SVG 和 Canvas 双后端，覆盖 90% 业务；再引入 WebGL 处理极端场景。
- WebGPU 待生态成熟后替换部分 WebGL 计算管线。

最佳实践：

- 不要让用户选择渲染技术，而是根据数据量、图表类型自动降级/升级。
- 提供“导出为 SVG/图片/PDF”的统一 API，不同后端各自实现。

**评分维度**：
- 能从 BI 场景出发给出分层策略（35%）
- 能说明四者在可访问性、兼容性、团队成本上的权衡（35%）
- 能给出迁移路径和 Renderer 抽象思路（30%）

**常见错误**：
- 一开始就全量上 WebGL，导致开发效率低、bug 多。
- 忽略 BI 对导出、打印、可访问性的强需求。
- 没有抽象层，迁移时需要重写业务代码。

**延伸追问**：
- 同一图表在 SVG 和 Canvas 下如何保证像素级一致？
- 自动切换渲染后端时，如何保持用户交互状态？

**相关题目**：
- [FB-34-CO-B-001 Canvas vs SVG vs WebGL vs WebGPU](#FB-34-CO-B-001)
- [FB-34-SD-R-024 BI 可视化平台架构](#FB-34-SD-R-024)

**参考资源**：
- [Observable Plot - Renderers](https://observablehq.com/plot/)
- [deck.gl 大数据渲染](https://deck.gl/)

**口头回答版**：
> BI 产品建议分层：普通统计图用 SVG，保证可访问和导出；数据量大或自定义绘制用 Canvas；地理热力图、关系图、百万点用 WebGL；WebGPU 先预研。关键是做一个渲染器抽象层，数据模型不变，后端可切换，用户无感知。

---

### FB-34-FS-P-018：D3.js 的 join 模式、数据绑定与 enter/update/exit 在 v5/v6/v7 中有何演进？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：34 可视化与图形
**标签**：D3.js、框架原理、数据绑定、数据驱动
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请深入说明 D3.js 中数据绑定、enter/update/exit 模式的设计思想，以及 v5、v6、v7 在 API 上的演进。

**参考答案**：

数据绑定核心：

- `selection.data(data, key)` 将数据数组与已有 DOM 元素集合做“连接（join）”。
- 连接结果分为三类：
  - **enter**：有数据无 DOM，需要创建。
  - **update**：数据与 DOM 一一对应，需要更新。
  - **exit**：有 DOM 无数据，需要移除。

v5 写法：

```js
const u = svg.selectAll('circle').data(data, d => d.id);
u.enter().append('circle')
  .merge(u)
  .attr('cx', d => x(d.x))
  .attr('cy', d => y(d.y));
u.exit().remove();
```

v6/v7 演进：

- **v6**：引入 `selection.join(enter, update, exit)`，一次性处理三种状态，语义更清晰。
- **v7**：在 v6 基础上继续模块化，支持更细粒度的 d3-* 包引入，性能微调。
- 默认事件监听从 `d3.event` 改为原生事件对象 `event`（v6）。

v7 join 示例：

```js
svg.selectAll('circle')
  .data(data, d => d.id)
  .join(
    enter => enter.append('circle').attr('r', 0)
      .call(enter => enter.transition().attr('r', 5)),
    update => update.call(update => update.transition().attr('cx', d => x(d.x))),
    exit => exit.call(exit => exit.transition().attr('r', 0).remove())
  );
```

最佳实践：

- 必须提供稳定的 key function，否则数据顺序变化会导致 DOM 重建。
- 动画尽量在 enter/update/exit 各自阶段内处理，避免状态错乱。
- 在 React/Vue 中，可用 `useRef` 保存容器，让 D3 仅负责计算，DOM 由框架渲染。

**评分维度**：
- 能解释 enter/update/exit 的设计思想（35%）
- 能写出 v5 与 v6/v7 的 join 差异（35%）
- 能指出 key function 和事件对象变化的重要性（30%）

**常见错误**：
- 不写 key function，导致 enter/update/exit 行为不可预测。
- 在 React 中直接用 D3 append，造成虚拟 DOM 与真实 DOM 冲突。
- 混淆 v5 的 `d3.event` 与 v6+ 的原生事件。

**延伸追问**：
- `selection.join()` 返回的是哪个选择集？
- 如何用 D3 数据绑定实现一个排序动画？

**相关题目**：
- [FB-34-CO-B-003 D3 核心思想](#FB-34-CO-B-003)
- [FB-34-CD-A-014 D3 比例尺与选择器](#FB-34-CD-A-014)

**参考资源**：
- [D3 v6 Release Notes](https://github.com/d3/d3/releases/tag/v6.0.0)
- [D3 Selection Join](https://d3js.org/d3-selection/joining)

**口头回答版**：
> D3 的数据绑定是把数据数组和 DOM 元素做连接，分成 enter（有数据没 DOM）、update（对应上）、exit（有 DOM 没数据）三种状态。v5 要分别写 enter().append、merge、exit.remove；v6/v7 提供了 join 一次性处理，语义更清晰。一定要给数据配稳定的 key，否则顺序一变 DOM 会重建。

---

### FB-34-PE-P-019：地理/地图可视化中，如何处理大规模 GeoJSON、投影变换与瓦片化？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：34 可视化与图形
**标签**：地理、地图、性能优化、瓦片化、LOD
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在地图可视化中，面临 GeoJSON 文件过大、投影计算慢、绘制卡顿等问题。请给出数据预处理、投影变换和瓦片化的优化方案。

**参考答案**：

1. **数据预处理**：
   - **简化（Simplification）**：使用 TopoJSON、mapshaper 降低几何精度。
   - **拓扑合并**：相邻多边形共享边，减少冗余顶点。
   - **分层分块**：按行政级别（国家/省/市/区县）分文件，按需加载。

2. **投影变换**：
   - 在服务端或 Web Worker 中预投影，前端直接使用屏幕坐标。
   - 使用 D3 `geoPath` + `geoProjection`，缓存投影后的 path 数据。
   - 对于大规模点数据，使用 GPU 投影（deck.gl GeoJsonLayer）。

3. **瓦片化（Tiling）**：
   - 将地图切分为固定大小的瓦片（如 256×256），按视口和缩放级别加载。
   - 矢量瓦片（MVT/Mapbox Vector Tile）在客户端根据缩放级别动态简化。
   - 栅格瓦片适合底图，矢量瓦片适合数据叠加与交互。

4. **LOD 与裁剪**：
   - 只绘制视口内的要素（viewport culling）。
   - 不同缩放级别使用不同精度数据：小比例尺看轮廓，大比例尺看细节。

示例：mapshaper 简化命令

```bash
mapshaper china.geojson -simplify 5% -o china-light.geojson
```

最佳实践：

- 不要把全国精细 GeoJSON 一次性加载，按需按级别加载。
- 地理数据和业务数据分离，业务数据可通过 ID 关联，避免重复携带几何信息。

**评分维度**：
- 能给出 GeoJSON 简化、分层、预投影方案（35%）
- 能解释瓦片化原理与矢量瓦片优势（35%）
- 能结合视口裁剪与 LOD 说明渲染优化（30%）

**常见错误**：
- 前端直接加载完整精细 GeoJSON 并实时投影。
- 把栅格底图和业务数据混在同一层处理。
- 忽略地图坐标系与业务数据坐标系的统一（WGS84、GCJ-02、BD-09）。

**延伸追问**：
- 如何处理地图坐标系偏移问题？
- 矢量瓦片的前端解析和样式化有哪些常用工具？

**相关题目**：
- [FB-34-SC-A-010 10 万散点图优化](#FB-34-SC-A-010)
- [FB-34-SD-R-025 3D 数字孪生大屏](#FB-34-SD-R-025)

**参考资源**：
- [D3 Geo Projections](https://d3js.org/d3-geo)
- [Mapbox Vector Tile Specification](https://github.com/mapbox/vector-tile-spec)
- [mapshaper](https://mapshaper.org/)

**口头回答版**：
> 大规模 GeoJSON 要先简化、分层、按需加载，投影最好在服务端或 Worker 里预算好。地图瓦片化是把地图切成 256 像素的小块，按视口和缩放级别加载；矢量瓦片能在客户端动态简化，交互性更好。绘制时只画视口内的要素，小比例尺用粗轮廓，大比例尺再加载细节。

---

### FB-34-CO-P-020：GPU 加速原理是什么？WebGL 中顶点着色器与片元着色器如何协同工作？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：34 可视化与图形、50 WebGPU / 图形学
**标签**：GPU、WebGL、着色器、渲染管线
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释为什么 GPU 适合大规模图形并行渲染，并说明 WebGL 顶点着色器与片元着色器的输入输出、执行顺序与协同方式。

**参考答案**：

GPU 加速原理：

- **大规模并行**：GPU 拥有成百上千个核心，可同时处理大量顶点和像素。
- **SIMD/SIMT**：同一指令作用于多个数据，适合顶点变换、像素填充等重复计算。
- **专用管线**：顶点处理、光栅化、片元处理在硬件中高度流水线化。

WebGL 管线与着色器协同：

1. **顶点着色器**执行阶段：
   - 每个顶点并行执行一次。
   - 输入：attribute（顶点属性）、uniform（全局常量）。
   - 输出：`gl_Position`（裁剪空间位置），以及 varying 变量。

2. **图元装配与光栅化**：
   - GPU 根据顶点组装成点/线/三角形。
   - 光栅化生成片元（候选像素），并插值 varying。

3. **片元着色器**执行阶段：
   - 每个片元并行执行一次。
   - 输入：插值后的 varying、uniform、纹理采样器。
   - 输出：像素颜色（`gl_FragColor`），经深度/模板测试后写入帧缓冲。

示例：颜色渐变三角形

```glsl
// vertex
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = a_position * 0.5 + 0.5;
}
```

```glsl
// fragment
precision mediump float;
varying vec2 v_uv;
void main() {
  gl_FragColor = vec4(v_uv, 0.5, 1.0);
}
```

最佳实践：

- 减少 draw call、合并顶点缓冲、使用 instancing 提升 GPU 利用率。
- 避免在片元着色器做复杂分支和循环，保持 ALU 高效。

**评分维度**：
- 能解释 GPU 并行与 SIMD 优势（30%）
- 能描述顶点着色器、片元着色器的输入输出（40%）
- 能说明光栅化插值与写入帧缓冲过程（30%）

**常见错误**：
- 认为顶点着色器直接输出像素颜色。
- 忽略 varying 的插值过程。
- 把 uniform 和 attribute 混淆。

**延伸追问**：
- 什么是 fragment shader 中的 overdraw，如何减少？
- WebGL 中的深度测试和透明渲染有什么矛盾？

**相关题目**：
- [FB-34-CO-A-015 WebGL 基础](#FB-34-CO-A-015)
- [FB-34-SD-R-028 游戏图形架构启发](#FB-34-SD-R-028)

**参考资源**：
- [WebGL 渲染管线](https://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html)
- [GPU 加速原理 - Google's Fundamentals](https://www.html5rocks.com/zh/tutorials/speed/layers/)

**口头回答版**：
> GPU 强在并行，成百上千个核心可以同时处理顶点和像素。WebGL 管线里，顶点着色器先跑，把顶点坐标转成裁剪空间并输出 varying；然后 GPU 组装图元、光栅化，插值 varying；最后片元着色器每个像素跑一遍，决定颜色。顶点着色器管位置，片元着色器管颜色，协同完成渲染。

---

### FB-34-SC-P-021：实时数据流驱动的可视化大屏每秒新增数千点，如何保证不丢帧？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：34 可视化与图形
**标签**：实时、性能优化、Canvas、WebGL、大数据
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
某工业大屏通过 WebSocket 每秒收到 5000 个数据点，需要在折线图/散点图上实时更新。请设计一套不丢帧的渲染与数据管理方案。

**参考答案**：

数据层：

- **滑动窗口**：只保留最近 N 秒/ N 个点（如最近 60 秒），旧数据归档或丢弃。
- **批处理**：WebSocket 消息按 50-100ms 批量合并，避免每来一条消息都触发渲染。
- **增量存储**：维护环形缓冲区，新数据 push、旧数据 shift，O(1) 更新。

渲染层：

- **Canvas/WebGL**：避免 SVG DOM 暴增；WebGL 点精灵可承载百万级点。
- **增量绘制**：折线图在离屏 canvas 上先画好历史线段，主 canvas 只追加新段。
- **双缓冲**：准备下一帧时写在离屏 buffer，渲染时整体 swap。
- **rAF 调度**：数据更新只更新状态，绘制统一在 `requestAnimationFrame` 中进行。

交互与状态：

- **暂停/回放**：提供数据缓存与播放条，允许用户暂停实时流查看历史。
- **降采样**：实时模式下对高密度区域做 LTTB 或聚合，保证视觉稳定。

示例：环形缓冲区

```js
class RingBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.data = new Array(capacity);
    this.head = 0;
    this.size = 0;
  }
  push(item) {
    this.data[this.head] = item;
    this.head = (this.head + 1) % this.capacity;
    if (this.size < this.capacity) this.size++;
  }
  toArray() {
    const out = [];
    for (let i = 0; i < this.size; i++) {
      out.push(this.data[(this.head - this.size + i + this.capacity) % this.capacity]);
    }
    return out;
  }
}
```

最佳实践：

- 设置预算：主线程 JS 执行 + 渲染 < 16ms；超标时降级为聚合/抽稀。
- 用 Chrome Performance 分析长任务，必要时把数据解析放到 Web Worker。

**评分维度**：
- 能给出滑动窗口、批处理、环形缓冲区方案（35%）
- 能结合 Canvas/WebGL 与 rAF 设计渲染层（35%）
- 能提到降级、暂停、性能预算（30%）

**常见错误**：
- 每次收到消息都 setState 并全量 setOption。
- 不限制数据总量，导致内存和渲染双双爆炸。
- 在 React 中把实时数据直接放到 state，引发大量重渲染。

**延伸追问**：
- 如果数据是乱序到达的，如何排序并绘制？
- 实时流中如何做异常点闪烁告警而不影响主性能？

**相关题目**：
- [FB-34-FS-A-011 ECharts 更新机制](#FB-34-FS-A-011)
- [FB-34-PE-A-012 Canvas 性能调优](#FB-34-PE-A-012)

**参考资源**：
- [ECharts 实时数据](https://echarts.apache.org/zh/tutorial.html#%E5%AE%9E%E6%97%B6%E6%95%B0%E6%8D%AE)
- [LTTB 降采样算法](https://skemman.is/bitstream/1946/15343/3/SS_MSc_Thesis.pdf)

**口头回答版**：
> 实时大屏关键是控总量和降频率：用滑动窗口只保留最近的数据，WebSocket 消息批量合并，状态更新放进 requestAnimationFrame。渲染用 Canvas 或 WebGL，折线图可以增量追加，历史线画到离屏 canvas。再设一个 16ms 性能预算，超了就降级聚合。

---

### FB-34-PE-P-022：可视化动画与性能：requestAnimationFrame、补间、时间轴与 Web Animations API 如何选型？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：34 可视化与图形
**标签**：动画、性能优化、Canvas、WebGL
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
在数据可视化动画中，常用 `requestAnimationFrame`、补间库（Tween.js / d3-transition）、时间轴和 Web Animations API。请说明它们的特点、适用场景与性能差异。

**参考答案**：

| 方案 | 特点 | 适用场景 | 性能 |
|------|------|----------|------|
| requestAnimationFrame | 浏览器刷新同步，手动插值 | 自定义动画、游戏循环、Canvas/WebGL | 高，可控 |
| d3-transition | 与 D3 数据绑定深度集成 | D3 enter/update/exit 动画 | 中，依赖 DOM |
| Tween.js / GSAP | 丰富缓动、时间轴、交错 | 复杂 UI 动画、叙事式可视化 | 高（GSAP 优化好） |
| Web Animations API | 浏览器原生，接近 CSS 动画 | DOM/SVG 元素的属性/变换动画 | 高，可 off-main-thread |

选型建议：

- **Canvas/WebGL 自定义动画**：直接用 rAF + 手工插值，最灵活。
- **D3 数据更新动画**：用 `d3-transition` 或 `join` 里的 transition。
- **复杂编排**：GSAP Timeline 或 WAAPI 的 `Animation` 序列。
- **简单 SVG 属性动画**：WAAPI 可享受合成器优化。

性能注意：

- 避免在 rAF 中做大量 DOM 操作或重计算；只做绘制。
- SVG/CSS 动画尽量只动 `transform` 和 `opacity`，触发合成层。
- 同时运行过多补间时，使用对象池或统一时间轴管理。

最佳实践：

- 为动画设置时长上限和打断机制，防止数据快速变化时动画堆积。
- 大数据图表中，优先减少动画数量，使用 opacity/scale 过渡代替 path 重绘。

**评分维度**：
- 能对比四种动画方案的特点（40%）
- 能给出具体选型建议（30%）
- 能指出性能陷阱（30%）

**常见错误**：
- 在 rAF 里做 setState 导致 React 重渲染链。
- 对大量 SVG 节点同时做 CSS transition，导致布局抖动。
- 动画未做打断，数据频繁更新时动画排队。

**延伸追问**：
- 如何实现一个可暂停、可拖拽进度的时间轴？
- WAAPI 和 CSS animation 在合成线程上有什么区别？

**相关题目**：
- [FB-34-CO-A-013 交互实现要点](#FB-34-CO-A-013)
- [FB-34-SC-P-021 实时数据流](#FB-34-SC-P-021)

**参考资源**：
- [MDN - Web Animations API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API)
- [GSAP](https://greensock.com/gsap/)

**口头回答版**：
> 自定义 Canvas/WebGL 动画用 requestAnimationFrame 最灵活；D3 数据更新用 d3-transition；复杂编排用 GSAP 或 WAAPI；简单 SVG 动画用 Web Animations API 可以享受硬件加速。要注意只在 rAF 里做绘制，不要在里面 setState，大数据动画优先做 opacity、scale 过渡。

---

### FB-34-CO-P-023：颜色映射、视觉编码与感知均匀性在数据可视化中有何影响？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：34 可视化与图形
**标签**：颜色、视觉编码、可访问性、数据可视化
**出现频率**：低频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明数据可视化中颜色映射的基本原则、视觉编码的选择顺序，以及“感知均匀性（perceptually uniform）”为何重要。

**参考答案**：

颜色映射原则：

1. **语义匹配**：顺序数据用连续色阶，分类数据用离散色板，发散数据用双色阶。
2. **感知均匀**：相同数值差在视觉上应产生相似的色相差。例如 CIELAB、OKLab、viridis 比彩虹色（rainbow）更均匀。
3. **色盲友好**：避免红-绿、蓝-黄等常见色盲难以区分的组合；提供图案/标签辅助。
4. **文化与品牌**：正红负绿在中文语境表示涨跌，但可能对色盲不友好。

视觉编码选择顺序（Cleveland & McGill）：

位置 > 长度 > 角度/斜率 > 面积 > 体积 > 颜色亮度/饱和度 > 颜色色相

感知均匀性重要性：

- 人眼对亮度的感知是非线性的；感知均匀色空间能让数值差异在视觉上保持一致。
- 使用 `viridis`、`plasma`、`cividis` 等 Matplotlib 色板，或 D3 的 `interpolateViridis`。

最佳实践：

- 不要对连续数据使用彩虹色阶，会产生虚假边界。
- 对关键阈值使用明确的分段色阶，并提供图例说明。

**评分维度**：
- 能说明连续/分类/发散数据的颜色选择（35%）
- 能解释感知均匀性（35%）
- 能提到色盲友好与视觉编码层级（30%）

**常见错误**：
- 用彩虹色表示连续变量。
- 仅用颜色 hue 表示顺序数据。
- 忽略背景色对对比度的影响。

**延伸追问**：
- 如何在可视化中同时服务色盲用户和普通用户？
- OKLab 与 HSL 在插值时有什么不同？

**相关题目**：
- [FB-34-CO-B-007 图表可访问性](#FB-34-CO-B-007)
- [FB-34-SD-R-026 可视化组件库设计](#FB-34-SD-R-026)

**参考资源**：
- [Color Brewer](https://colorbrewer2.org/)
- [viridis 色板](https://bids.github.io/colormap/)
- [OKLab color space](https://bottosson.github.io/posts/oklab/)

**口头回答版**：
> 颜色映射要匹配数据类型：顺序数据用连续色阶，分类用离散色板，发散用双色阶。感知均匀性是指数值差一样时，颜色看起来变化也差不多，这样不会误导人。viridis、OKLab 都比彩虹色好。还要注意色盲友好，别只依赖红绿对比。

---
## 架构题（12 道）{#architect}

### FB-34-SD-R-024：设计一个 BI 可视化平台的前端架构

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：34 可视化与图形
**标签**：BI、架构设计、系统架构、数据驱动
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个 BI 可视化平台的前端架构，覆盖数据源接入、图表选型、拖拽搭建、图表联动、导出与权限控制等核心模块。

**参考答案**：

整体架构：

```text
┌──────────────────────────────────────────────────────────┐
│  应用层：Dashboard / 报表 / 大屏 / 移动端                │
├──────────────────────────────────────────────────────────┤
│  搭建层：拖拽画布、组件物料、属性面板、数据源绑定        │
├──────────────────────────────────────────────────────────┤
│  渲染层：Chart Engine（SVG/Canvas/WebGL）                │
├──────────────────────────────────────────────────────────┤
│  数据层：Data Model、Query Builder、缓存、聚合           │
├──────────────────────────────────────────────────────────┤
│  服务层：数据集 API、权限、导出、元数据                  │
└──────────────────────────────────────────────────────────┘
```

核心模块设计：

1. **数据源接入**：
   - 支持 SQL、Excel、API、OLAP 等多种数据源。
   - 通过 Query Builder 把用户拖拽字段转为查询语句或请求参数。
   - 数据模型抽象为维度/度量，统一字段类型、聚合方式。

2. **图表选型**：
   - 提供图表推荐引擎：根据字段类型和数量推荐最佳图表。
   - 内置标准图表库 + 自定义图表注册机制。

3. **拖拽搭建**：
   - 画布使用绝对/网格布局；组件 JSON Schema 描述位置、尺寸、配置。
   - 组件树与渲染树分离，支持撤销重做、版本快照。

4. **图表联动**：
   - 全局事件总线或状态管理维护筛选器、刷选范围、下钻路径。
   - 每个图表订阅相关筛选条件，通过依赖图避免循环更新。

5. **导出与权限**：
   - 导出支持 PNG/PDF/Excel/嵌入式 iframe。
   - 权限控制到数据集、字段、图表、操作（查看/编辑/导出）。

关键技术选型：

- 渲染引擎：ECharts/AntV 满足 80% 图表；自定义 D3/WebGL 满足极端场景。
- 状态管理：Redux / Zustand 管理全局筛选；局部图表状态自治。
- 数据缓存：TanStack Query / SWR 缓存查询结果；Web Worker 做聚合。

最佳实践：

- Schema 驱动：页面、组件、数据查询都 JSON 化，便于序列化、迁移、低代码。
- 性能预算：设定图表最大数据量、刷新频率，超限自动提示或切换渲染后端。

**评分维度**：
- 能划分清晰的分层与模块（35%）
- 能说明数据接入、联动、权限的关键设计（35%）
- 能结合性能、可扩展性给出技术选型（30%）

**常见错误**：
- 把 BI 平台做成纯图表展示，忽略数据建模和查询构建。
- 图表联动没有依赖管理，导致循环刷新。
- 所有图表共享同一数据源，缺少字段级权限。

**延伸追问**：
- 如何实现跨数据集的图表联动？
- 当用户保存一个复杂报表时，Schema 应该如何设计以支持版本回退？

**相关题目**：
- [FB-34-CP-P-017 底层渲染技术权衡](#FB-34-CP-P-017)
- [FB-34-SD-R-026 可视化组件库设计](#FB-34-SD-R-026)

**参考资源**：
- [Apache Superset 架构](https://superset.apache.org/)
- [Metabase 设计文档](https://www.metabase.com/learn/)

**口头回答版**：
> BI 平台前端可以分成五层：应用层、搭建层、渲染层、数据层、服务层。数据源接入要做字段抽象和 Query Builder；图表选型可以内置推荐；拖拽搭建用 JSON Schema 描述组件；联动通过全局事件总线或状态管理维护筛选器；导出和权限要细化到字段。渲染引擎先用 ECharts/AntV，特殊场景下沉到 WebGL。

---

### FB-34-SD-R-025：设计一个 3D 数字孪生大屏的渲染架构

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：34 可视化与图形
**标签**：3D、WebGL、Three.js、架构设计、实时
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个 3D 数字孪生大屏的前端渲染架构，需要支持工厂/楼宇模型展示、实时 IoT 数据叠加、摄像机漫游、性能监控与热更新。

**参考答案**：

系统分层：

```text
┌─────────────────────────────────────────────┐
│  交互层：摄像机控制、漫游路径、热点标注      │
├─────────────────────────────────────────────┤
│  业务层：IoT 数据绑定、告警、时间轴          │
├─────────────────────────────────────────────┤
│  渲染层：Three.js / WebGL / PBR 材质         │
├─────────────────────────────────────────────┤
│  资源层：模型加载（glTF/Draco）、纹理、LOD   │
├─────────────────────────────────────────────┤
│  数据层：WebSocket、数据缓存、空间索引       │
└─────────────────────────────────────────────┘
```

核心设计点：

1. **模型与资源管理**：
   - 使用 glTF + Draco 压缩，减少模型体积。
   - LOD（Level of Detail）：远距离低模、近距离高模。
   - 模型分块按需加载，视锥体裁剪（frustum culling）。

2. **实时数据叠加**：
   - IoT 数据通过 WebSocket 推送，使用空间索引（如八叉树）快速定位设备。
   - 动态纹理/材质更新（如温度云图、设备状态色）。
   - 热更新：模型数据分离，业务数据变化时不重新加载模型。

3. **渲染循环与性能**：
   - 统一 rAF 循环，分离逻辑更新（固定步长）与渲染帧。
   - 阴影、反射、后期效果按需开启，提供画质档位。
   - GPU 性能监控：帧时间、draw call、显存占用。

4. **交互与摄像机**：
   - 支持轨道控制、第一人称漫游、预设路径动画。
   - 热点标注使用 HTML overlay + 3D 投影坐标，避免所有标注都进 3D 管线。

最佳实践：

- 对静态场景烘焙光照贴图（lightmap），减少实时光照计算。
- 使用 instance mesh 渲染大量重复设备（如管道、传感器）。
- 将非关键 IoT 数据聚合后再驱动视觉变化，避免每帧更新材质。

**评分维度**：
- 能划分渲染/资源/数据/交互层（30%）
- 能说明模型压缩、LOD、视锥体裁剪等性能手段（35%）
- 能设计实时数据绑定与热更新机制（35%）

**常见错误**：
- 一次性加载完整高模场景，导致首屏巨慢。
- 每个 IoT 点都创建独立 mesh，draw call 爆炸。
- 在 rAF 中处理所有 WebSocket 消息，阻塞渲染。

**延伸追问**：
- 如何实现 3D 标注跟随模型移动且不被遮挡？
- 如果要在 VR 中展示同一场景，渲染架构需要哪些调整？

**相关题目**：
- [FB-34-CO-P-020 GPU 加速与着色器](#FB-34-CO-P-020)
- [FB-34-SD-R-028 游戏图形架构启发](#FB-34-SD-R-028)

**参考资源**：
- [Three.js 官方文档](https://threejs.org/)
- [glTF 2.0 规范](https://www.khronos.org/gltf/)

**口头回答版**：
> 3D 数字孪生大屏分成交互、业务、渲染、资源、数据五层。模型用 glTF+Draco 压缩、LOD 和视锥体裁剪；实时数据用 WebSocket 推过来，通过空间索引定位设备；渲染循环用 rAF，逻辑更新和渲染帧分离。静态场景可以烘焙光照，重复设备用 instance mesh，标注用 HTML overlay 减少 3D 绘制压力。

---

### FB-34-SD-R-026：如何设计一个可扩展的可视化组件库？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：34 可视化与图形
**标签**：组件库、架构设计、插件化、工程化
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个可扩展的可视化组件库，要求支持多种图表类型、主题换肤、自定义渲染器、插件机制，并能在 React/Vue/Angular 中复用。

**参考答案**：

架构分层：

```text
┌──────────────────────────────────────────────┐
│  框架适配层：React/Vue/Angular wrapper        │
├──────────────────────────────────────────────┤
│  组件层：Line/Bar/Pie/Scatter/Geo/Custom      │
├──────────────────────────────────────────────┤
│  图形语法层：Grammar of Graphics（mark/scale）│
├──────────────────────────────────────────────┤
│  渲染器层：SVG / Canvas / WebGL / WebGPU      │
├──────────────────────────────────────────────┤
│  主题/样式层：Design Tokens                   │
├──────────────────────────────────────────────┤
│  插件层：Tooltip/Legend/Zoom/Brush/Export     │
└──────────────────────────────────────────────┘
```

关键设计：

1. **核心与框架解耦**：
   - 核心库使用原生 TS，只依赖渲染器和数据抽象。
   - 框架适配层负责生命周期绑定、props 映射、事件转发。

2. **图形语法抽象**：
   - 用 `mark` + `encoding` + `scale` 描述图表，便于扩展新图表类型。
   - 示例：`mark: 'bar', encoding: { x: 'category', y: 'value', color: 'type' }`。

3. **渲染器抽象**：
   - 定义统一 `Renderer` 接口，不同后端实现绘制、命中检测、导出。
   - 组件不感知后端，只操作抽象 scene graph。

4. **主题与样式**：
   - 使用 design token（颜色、字号、间距、圆角）。
   - 支持 CSS variables 或运行时主题切换。

5. **插件机制**：
   - 插件实现 `install(chart)` 接口，可注册交互、组件、渲染 hook。
   - 核心插件：Tooltip、Legend、Zoom、Brush、Export、ARIA。

6. **跨框架复用**：
   - 核心不依赖框架；React/Vue 分别提供包装组件。
   - 事件与 ref 暴露统一 API。

最佳实践：

- 新图表类型尽量通过配置组合，而非继承类。
- 提供单元测试、视觉回归测试、性能基准测试。
- 文档与 playground 一体化，降低接入成本。

**评分维度**：
- 能划分清晰分层并说明职责（30%）
- 能设计渲染器与图形语法抽象（35%）
- 能说明主题、插件、跨框架复用（35%）

**常见错误**：
- 组件库强耦合 React，Vue 用户无法复用。
- 每个图表独立实现，缺少抽象，重复代码多。
- 插件直接修改内部状态，导致不可维护。

**延伸追问**：
- 如何设计 mark 的自定义 shape 扩展点？
- 如果要在 SSR 场景下使用，渲染器层需要做哪些改动？

**相关题目**：
- [FB-34-EN-A-016 可视化工程分层](#FB-34-EN-A-016)
- [FB-34-SD-R-024 BI 可视化平台架构](#FB-34-SD-R-024)

**参考资源**：
- [AntV 组件库设计](https://antv.antgroup.com/)
- [Observable Plot](https://observablehq.com/plot/)
- [The Grammar of Graphics](https://www.springer.com/gp/book/9780387245447)

**口头回答版**：
> 可视化组件库要分层：框架适配层、组件层、图形语法层、渲染器层、主题层、插件层。核心用原生 TS，不绑定框架；渲染器抽象出统一接口，支持 SVG/Canvas/WebGL；图形语法用 mark+encoding 描述图表。主题用 design token，插件通过 install 钩子扩展。这样 React/Vue/Angular 都能复用。

---

### FB-34-CP-R-027：在大型可视化项目中，如何制定可测试、可维护、可协同的工程规范？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：34 可视化与图形、28 质量保障
**标签**：工程化、可测试性、代码质量、团队协作
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请从代码组织、测试策略、文档规范、CI/CD、代码评审等方面，说明如何保障大型可视化项目的工程质量与团队协作效率。

**参考答案**：

1. **代码组织**：
   - 按领域分层：`data/`、`renderer/`、`components/`、`interaction/`、`theme/`。
   - 禁止跨层直接引用，通过统一接口通信。
   - 数据转换函数纯函数化，便于单元测试。

2. **测试策略**：
   - **单元测试**：比例尺、数据聚合、坐标转换、工具函数。
   - **组件测试**：图表组件渲染、事件响应、props 变化。
   - **视觉回归**：使用 Chromatic/Storybook 捕获图表渲染差异。
   - **性能基准**：用 Playwright/Benchmark.js 监控关键场景 FPS 和内存。

3. **文档规范**：
   - API 文档自动化（TypeDoc / VitePress）。
   - 每个图表提供示例、配置说明、数据格式、可访问性要求。
   - ADR（架构决策记录）记录重大技术选型。

4. **CI/CD**：
   - 提交前 lint、type-check、单元测试。
   - PR 必须附带视觉回归报告和性能基准对比。
   - 发布时自动生成 changelog、tag、npm 包。

5. **代码评审**：
   - 评审清单：是否正确处理 resize/DPR、是否污染全局状态、是否有内存泄漏、是否可访问。
   - 强制至少一名可视化领域专家 approve。

最佳实践：

- 建立“可视化模式库”和“反模式清单”，沉淀团队知识。
- 对核心渲染路径保持性能预算，超标自动告警。

**评分维度**：
- 能覆盖代码、测试、文档、CI/CD、评审至少 4 个方面（40%）
- 能给出视觉回归、性能基准等可视化特有测试方案（30%）
- 能说明可访问性和内存泄漏等评审要点（30%）

**常见错误**：
- 只测业务逻辑，不测渲染结果。
- 缺少统一的坐标/比例尺规范，各组件各写一套。
- 没有性能预算，项目越写越卡。

**延伸追问**：
- 如何对 Canvas/WebGL 渲染结果做视觉回归？
- 如果团队成员不熟悉图形学，如何降低代码评审门槛？

**相关题目**：
- [FB-34-EN-R-029 大型可视化应用构建与 CI/CD](#FB-34-EN-R-029)
- [FB-34-SD-R-026 可视化组件库设计](#FB-34-SD-R-026)

**参考资源**：
- [Storybook for visual testing](https://storybook.js.org/docs/react/writing-tests/visual-testing)
- [Chromatic](https://www.chromatic.com/)

**口头回答版**：
> 大型可视化项目要分层组织代码，数据转换写纯函数方便单测；测试要有单元测试、组件测试、视觉回归和性能基准；文档用自动化工具加 ADR；CI 里跑 lint、类型检查、测试和视觉回归；代码评审要检查 resize/DPR、内存泄漏、可访问性。核心渲染路径设性能预算，超标告警。

---

### FB-34-SD-R-028：游戏图形中的场景图、ECS、渲染循环、LOD 对前端可视化架构有何启发？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：34 可视化与图形
**标签**：游戏图形、架构设计、3D、性能优化
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
游戏引擎中的场景图（Scene Graph）、ECS（Entity-Component-System）、渲染循环和 LOD 等技术，对前端数据可视化架构设计有哪些可借鉴之处？

**参考答案**：

借鉴点：

1. **场景图（Scene Graph）**：
   - 用树形结构组织图形对象，父节点变换自动作用于子节点。
   - 可视化中可用于组合图表：坐标轴组、数据系列组、标注组。
   - 便于做层级变换、批量隐藏、按层导出。

2. **ECS（Entity-Component-System）**：
   - 实体只是 ID，数据存在组件中，系统按组件类型批量处理。
   - 适合大规模可视化：每个数据点是一个 entity，位置、颜色、大小是 component，渲染系统批量处理。
   - 提升缓存友好性和并行度，便于扩展新系统（如选择系统、动画系统）。

3. **渲染循环**：
   - 游戏典型的 update → render → present 循环。
   - 可视化中可分离“数据更新”与“绘制”，固定时间步长处理数据，rAF 处理绘制。
   - 避免一帧内既做重计算又做大量绘制。

4. **LOD（Level of Detail）**：
   - 根据视图距离/缩放使用不同精度模型。
   - 可视化中对应数据聚合、抽样、简化几何：远看聚合，近看细节。

架构启发：

- 将可视化对象抽象为 Entity + Component，Renderer 作为 System 批量绘制。
- 维护场景图处理分组变换，LOD 控制数据精度，渲染循环保证稳定帧率。

最佳实践：

- 不要过度设计：简单图表用组件树即可，ECS 在超大规模场景下才显优势。
- 场景图深度不宜过深，避免遍历开销。

**评分维度**：
- 能解释场景图、ECS、渲染循环、LOD 的含义（40%）
- 能映射到可视化架构设计（35%）
- 能指出适用边界，避免过度设计（25%）

**常见错误**：
- 对简单 BI 图表强行上 ECS，增加复杂度。
- 场景图层级过深导致遍历和事件冒泡低效。
- 把游戏引擎所有概念照搬，忽略可视化的数据驱动特性。

**延伸追问**：
- 如何在一个 ECS 架构里实现图表联动？
- 渲染循环中“固定时间步长”对实时可视化有什么好处？

**相关题目**：
- [FB-34-CO-P-020 GPU 加速与着色器](#FB-34-CO-P-020)
- [FB-34-SD-R-025 3D 数字孪生大屏](#FB-34-SD-R-025)

**参考资源**：
- [Game Programming Patterns - Game Loop](https://gameprogrammingpatterns.com/game-loop.html)
- [ECS FAQ](https://github.com/SanderMertens/ecs-faq)

**口头回答版**：
> 游戏里的场景图可以用来组织图表的层级变换；ECS 把数据和逻辑分离，适合大规模数据点批量渲染；渲染循环把数据更新和绘制分开，保证帧率稳定；LOD 就是根据缩放用不同精度数据。可视化架构可以借鉴这些思想，但不要过度设计，简单图表用普通组件树就够了。

---

### FB-34-EN-R-029：大型可视化应用的构建、CI/CD、产物优化与多版本兼容策略如何设计？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：34 可视化与图形
**标签**：工程化、CI/CD、构建、性能优化
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明大型可视化应用在工程化方面的关注点，包括构建配置、CI/CD 流程、产物优化、多版本兼容与回滚策略。

**参考答案**：

1. **构建配置**：
   - 使用 Vite / Rollup / Webpack 按需加载图表包和渲染器。
   - 多入口：core、react、vue、echarts-renderer、webgl-renderer，减少未使用代码。
   - 开启 tree-shaking、压缩、拆包（vendor、renderer、locale）。

2. **CI/CD 流程**：
   - 提交前：lint、type-check、单元测试、视觉回归基线对比。
   - PR 阶段：构建产物体积报告、性能基准、依赖扫描。
   - 发布阶段：自动化 changelog、语义化版本、npm publish、CDN 推送。

3. **产物优化**：
   - 压缩 glTF/纹理、代码分割、懒加载 heavy renderer。
   - 对 WebGL/WebGPU shader 做预编译或字符串压缩。
   - 使用 CDN + 缓存策略，主包控制在合理大小。

4. **多版本兼容**：
   - 对外 API 遵循语义化版本，breaking change 提供迁移脚本。
   - 内部 monorepo 中通过 changeset 管理包间依赖版本。
   - 提供 LTS 版本支持，关键客户可锁定大版本。

5. **回滚策略**：
   - CDN 保留多个版本，异常时切换资源路径。
   - 平台端配置“渲染器降级开关”，如 WebGL 异常时自动切 Canvas。
   - 关键指标监控：错误率、白屏率、FPS，触发自动告警。

最佳实践：

- 产物体积可视化（bundle analyzer），定期清理无用依赖。
- 对核心图表库做兼容性测试矩阵（Chrome/Firefox/Safari/Edge/移动端）。

**评分维度**：
- 能说明构建拆分与产物优化（30%）
- 能设计 CI/CD 与版本管理（30%）
- 能给出降级与回滚策略（40%）

**常见错误**：
- 把所有图表和渲染器打包成一个巨大 bundle。
- 没有版本兼容计划，升级导致业务方大量改动。
- 忽略异常降级，WebGL 不支持时直接白屏。

**延伸追问**：
- 如何评估新增一个 WebGL renderer 对包体积的影响？
- 在 monorepo 中，多个图表包版本如何统一发布？

**相关题目**：
- [FB-34-CP-R-027 工程规范](#FB-34-CP-R-027)
- [FB-34-SD-R-026 可视化组件库设计](#FB-34-SD-R-026)

**参考资源**：
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Changesets](https://github.com/changesets/changesets)

**口头回答版**：
> 大型可视化工程要按渲染器和框架拆包，做 tree-shaking 和懒加载；CI 里跑 lint、单测、视觉回归和体积报告；发布用语义化版本和 changeset。产物要压缩、CDN 多版本缓存、加异常降级开关，WebGL 不行就切 Canvas。版本升级要提供迁移脚本，关键客户可锁大版本。

---

### FB-34-CP-R-030：从 0 到 1 落地一个数据可视化产品，如何在业务价值、性能、团队成本、可维护性之间做权衡？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：34 可视化与图形
**标签**：技术选型、架构权衡、产品、数据可视化
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
假设你要从 0 到 1 负责一个数据可视化产品，请说明你会如何在业务价值、渲染性能、团队学习成本和长期可维护性之间做取舍，并给出分阶段演进路线。

**参考答案**：

核心权衡原则：

1. **先验证业务价值，再优化技术**：
   - 用最快的方式做出可演示的 MVP，确认用户需求和数据故事。
   - 优先高层图表库（ECharts/AntV），避免过早底层优化。

2. **性能是约束而非目标**：
   - 定义可接受指标：首屏 < 2s、交互 > 30fps、内存不泄漏。
   - 只在数据量或交互复杂度突破阈值时下沉到 Canvas/WebGL。

3. **控制团队成本**：
   - 选择团队熟悉的栈，WebGL/WebGPU 需要专门人才储备。
   - 通过培训、Code Review、模板工程逐步提升团队图形能力。

4. **可维护性优先于炫技**：
   - 统一数据模型、渲染抽象、主题体系，避免每个项目各自为政。
   - 文档、测试、ADR 同步建立，降低人员流动风险。

分阶段演进：

- **MVP（0-3 个月）**：高层图表库 + 标准组件 + 基础主题。
- **成长期（3-12 个月）**：抽象渲染器、引入 Canvas 优化大数据、建立组件库和测试体系。
- **成熟期（1-2 年）**：WebGL 专项优化、地理/3D 能力、BI 搭建平台、性能监控体系。
- **前沿期（2 年+）**：WebGPU 预研、AI 辅助可视化、低代码搭建。

风险与回退：

- 每个阶段都保留“降级路径”：WebGL 异常回 Canvas，复杂定制回高层库。
- 建立技术债登记册，定期评估底层重构 ROI。

**评分维度**：
- 能从四个维度给出明确取舍原则（35%）
- 能给出分阶段演进路线（35%）
- 能提到风险回退和技术债管理（30%）

**常见错误**：
- 一开始就自研底层渲染引擎，导致交付慢、bug 多。
- 只追求效果炫酷，忽略业务真实需求。
- 团队能力不足时硬上 WebGL，维护成本失控。

**延伸追问**：
- 如果 CEO 要求三个月内上线一个 3D 大屏，你会怎么排期？
- 如何向非技术负责人解释“为什么不能用 ECharts 直接做 3D”？

**相关题目**：
- [FB-34-CP-P-017 底层渲染技术权衡](#FB-34-CP-P-017)
- [FB-34-SD-R-024 BI 可视化平台架构](#FB-34-SD-R-024)

**参考资源**：
- [The MVP Pattern](https://www.amazon.com/Lean-Startup-Eric-Ries/dp/0307887898)
- [技术选型决策框架](https://martinfowler.com/articles/frontend-architecture.html)

**口头回答版**：
> 从 0 到 1 要先验证业务价值，先用 ECharts/AntV 做 MVP；性能是约束，定义好 FPS 和内存指标，超了再下沉到 Canvas/WebGL；团队成本要考虑，WebGL 需要专人；可维护性靠统一数据模型、渲染抽象和文档测试。分阶段走：先做标准图表，再抽象渲染器和组件库，再做 WebGL 和 3D，最后预研 WebGPU。每个阶段留降级路径。

---
# 可视化与图形面试题

> 本文件收录可视化与图形相关面试题，目标题量 150 道。
> 题型覆盖：概念题、场景设计题、系统设计题、工程化题、性能优化题、安全题、软技能题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)
### FB-34-CP-B-001：SVG 和 Canvas 的主要区别是什么？

**题型**：综合开放题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：34 可视化与图形
**标签**：Canvas、WebGL、性能优化、SVG、数据驱动
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
SVG 和 Canvas 的主要区别是什么。

**参考答案**：

SVG 是矢量图形，基于 DOM，适合交互和样式控制；Canvas 是位图渲染，通过脚本绘制像素，适合大量图形和动画。



**补充说明**：

在实际落地 SVG 和 Canvas 的主要区别是什么 时，建议结合 Canvas、WebGL、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 SVG 和 Canvas 的主要区别是什么 时，建议结合 Canvas、WebGL、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 渲染方式（40%）
- 性能差异（30%）
- 交互差异（20%）
- 适用场景（10%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> SVG 是矢量图形，基于 DOM，适合交互和样式控制；Canvas 是位图渲染，通过脚本绘制像素，适合大量图形和动画。

---

### FB-34-CO-B-008：什么是 WebGL？前端什么时候需要它？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：34 可视化与图形
**标签**：Canvas、WebGL、性能优化、SVG、数据驱动
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
什么是 WebGL？前端什么时候需要它。

**参考答案**：

WebGL 是在浏览器中使用 GPU 进行 2D/3D 渲染的 API。需要处理大规模数据点、3D 场景、实时渲染时使用。


**补充说明**：

在实际落地 WebGL前端什么时候需要它 时，建议结合 Canvas、WebGL、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 原理（40%）
- 适用场景（40%）
- 复杂度（20%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> WebGL 是在浏览器中使用 GPU 进行 2D/3D 渲染的 API。 需要处理大规模数据点、3D 场景、实时渲染时使用。

---

### FB-34-PE-B-001：如何解决大数据量可视化性能问题？

**题型**：性能优化题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：34 可视化与图形
**标签**：Canvas、WebGL、性能优化、SVG、数据驱动
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
如何解决大数据量可视化性能问题。

**参考答案**：

- 数据降采样。
- Canvas/WebGL 替代 SVG。
- 虚拟化/瓦片化。
- 分层渲染和离屏渲染。
- 减少绘制调用和状态切换。



**补充说明**：

在实际落地 解决大数据量可视化性能问题 时，建议结合 Canvas、WebGL、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 解决大数据量可视化性能问题 时，建议结合 Canvas、WebGL、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 方案覆盖（50%）
- 具体实现（30%）
- 取舍分析（20%）

---

## 二、进阶题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - Canvas/WebGL 替代 SVG。 - 虚拟化/瓦片化。 - 分层渲染和离屏渲染。 - 减少绘制调用和状态切换。

---

### FB-34-SD-A-001：设计一个实时数据可视化大屏，需要关注哪些方面？

**题型**：系统设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：34 可视化与图形
**标签**：Canvas、WebGL、性能优化、SVG、数据驱动
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
设计一个实时数据可视化大屏，需要关注哪些方面。

**参考答案**：

- 数据源和推送方式（WebSocket/SSE）。
- 渲染性能：Canvas/WebGL、增量更新。
- 内存管理：避免数据无限增长。
- 交互：缩放、刷选、下钻。
- 容错：断线重连、数据补偿。



**补充说明**：

在实际落地 设计一个实时数据可视化大屏，需要关注哪些方面 时，建议结合 Canvas、WebGL、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 设计一个实时数据可视化大屏，需要关注哪些方面 时，建议结合 Canvas、WebGL、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 数据流（25%）
- 渲染性能（25%）
- 内存管理（20%）
- 交互（15%）
- 容错（15%）

---

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 数据源和推送方式（WebSocket/SSE）。 - 渲染性能：Canvas/WebGL、增量更新。 - 内存管理：避免数据无限增长。 - 交互：缩放、刷选、下钻。

---

### FB-34-SD-A-002：如何设计一个可扩展的图表库？

**题型**：系统设计题
**难度**：🟡 进阶
**岗位层级**：高级 / 资深
**面试知识域**：34 可视化与图形
**标签**：Canvas、WebGL、性能优化、SVG、数据驱动
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
如何设计一个可扩展的图表库。

**参考答案**：

- 抽象渲染层，支持多后端。
- 数据 → 比例尺 → 图形属性的管道。
- 插件化扩展：坐标系、组件、交互。
- 主题系统和响应式布局。
- 完整的类型定义和文档。



**补充说明**：

在实际落地 设计一个可扩展的图表库 时，建议结合 Canvas、WebGL、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**补充说明**：

在实际落地 设计一个可扩展的图表库 时，建议结合 Canvas、WebGL、性能优化 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 架构抽象（30%）
- 扩展性（25%）
- 数据流（20%）
- 主题/布局（15%）
- 工程化（10%）

---

## 三、高级题

**常见错误**：
- 回答停留在定义复述，缺少真实项目中的取舍与折中。
- 只讲正常路径，不提超时、降级、兼容等边界情况。
- 对关键指标和取舍缺乏量化意识。

**口头回答版**：
> - 抽象渲染层，支持多后端。 - 数据 → 比例尺 → 图形属性的管道。 - 插件化扩展：坐标系、组件、交互。 - 主题系统和响应式布局。










