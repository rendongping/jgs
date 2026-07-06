# 前端可视化与图形架构练习册

> 通过练习掌握可视化选型、渲染原理和性能优化。

---

## 难度分级

- 🟢 基础：理解概念。
- 🟡 进阶：能选型和优化。
- 🔴 深入：能设计图形架构。

---

## 一、选择题

### 第 1 题（🟢）

以下哪种技术最适合大规模 3D 渲染？

A. SVG  
B. Canvas 2D  
C. WebGL  
D. CSS

### 第 2 题（🟢）

SVG 的主要优势是？

A. 适合海量数据渲染  
B. 矢量缩放、DOM 可交互  
C. 像素级控制  
D. GPU 加速

### 第 3 题（🟡）

Canvas 渲染大量图形时，性能瓶颈通常是什么？

A. 内存不足  
B. 绘制调用过多  
C. CPU 计算慢  
D. 网络延迟

### 第 4 题（🟡）

以下哪种策略最适合 10 万点散点图？

A. SVG 渲染每个点  
B. Canvas 批量绘制  
C. 用 DOM 节点表示  
D. 直接渲染原始数据

### 第 5 题（🔴）

虚拟化在可视化中的主要作用是？

A. 提高代码可读性  
B. 只渲染可视区域数据  
C. 增加交互效果  
D. 简化数据结构

### 第 6 题（🟢）

在 D3.js 中，`.enter()` 方法返回的是什么？

A. 需要被移除的 DOM 元素  
B. 为新数据创建的占位节点  
C. 所有现有的 DOM 节点  
D. 父容器选择集

### 第 7 题（🟢）

以下哪种方式最适合以 60fps 平滑驱动图表动画？

A. `setInterval(fn, 16)`  
B. `setTimeout(fn, 16)`  
C. `requestAnimationFrame(fn)`  
D. `setImmediate(fn)`

### 第 8 题（🟡）

ECharts 底层使用什么渲染引擎？

A. 纯 SVG  
B. Canvas 2D（通过 ZRender）  
C. 纯 WebGL  
D. DOM + CSS3

### 第 9 题（🟡）

在 WebGL 渲染管线中，哪个着色器阶段负责确定每个像素的最终颜色？

A. 顶点着色器  
B. 片元着色器  
C. 几何着色器  
D. 计算着色器

### 第 10 题（🟡）

OffscreenCanvas 的主要优势是什么？

A. 更高的色彩深度  
B. 可在 Web Worker 中离线程渲染  
C. 自动 GPU 加速  
D. 更好的 SVG 兼容性

### 第 11 题（🟡）

在选择可视化库时，评估地理/地图支持能力的关键指标是？

A. 包体积大小  
B. 是否内置地图投影和 GeoJSON 支持  
C. 动画流畅度  
D. React 兼容性

### 第 12 题（🟡）

减少 Canvas 高频绘制开销的最佳策略是？

A. 降低 Canvas 分辨率  
B. 合并路径和形状，减少绘制调用次数  
C. 使用多个 Canvas 元素分层  
D. 增大字号避免缩放

### 第 13 题（🔴）

Web Worker 在大型数据可视化中的主要作用是什么？

A. 直接操作 Canvas 进行渲染  
B. 在离线程处理数据聚合和计算  
C. 管理 DOM 更新  
D. 处理 WebSocket 连接

### 第 14 题（🔴）

在包含 100+ 图表的实时看板中，最高效的数据更新策略是？

A. 每次数据变化时全部重新渲染  
B. 使用图表库的增量更新 / 局部更新 API  
C. 销毁并重建图表  
D. 每个图表使用独立的 iframe

### 第 15 题（🔴）

要使 SVG 图形对屏幕阅读器可访问，推荐的做法是？

A. 在 SVG 元素上添加 `aria-label` 和 `role` 属性，配合 `title`/`desc` 元素  
B. 仅提供独立的文本描述  
C. 使用 Canvas 替代 SVG  
D. 只添加 `<title>` 标签

---

## 二、场景分析题

### 第 16 题（🟡）

一个实时监控大屏需要展示 5000 个设备的在线状态，每个设备是一个可点击的节点。选择什么技术？

### 第 17 题（🟡）

一个折线图有 100 万个数据点，直接渲染卡顿。如何优化？

### 第 18 题（🔴）

设计一个支持 SVG / Canvas / WebGL 三种渲染后端的图表库架构。

### 第 19 题（🟡）

构建一个实时金融 K 线图，数据源通过 WebSocket 推送逐笔成交数据，需聚合并展示为 K 线。要求支持缩放、平移和十字光标。选择什么技术方案？

### 第 20 题（🔴）

需要在 3D 空间中展示 50 万个点（散点图），每个点有位置和颜色属性，用户可旋转、缩放视角。如何设计渲染架构？

### 第 21 题（🔴）

设计一个多人实时协作白板（类似 Figma / Miro），需支持高效同步和流畅渲染。

### 第 22 题（🟡）

地图上需要展示 10 万个 POI（兴趣点）标记，用户可缩放平移。如何实现高性能渲染？

### 第 23 题（🔴）

高频股票行情仪表板，每秒推送 20 次行情数据，包含 6 个不同维度的图表。如何设计前端架构？

### 第 24 题（🔴）

力导向图需要展示 10000 个节点之间的关联关系，要求布局稳定、交互流畅。

### 第 25 题（🔴）

在一个视频播放器上叠加展示 AI 物体检测结果（检测框、跟踪轨迹、热力图），如何设计渲染方案？

---

## 三、设计 / 开放题

### 第 26 题（🟡）

为一个电商后台设计数据看板，包含折线图、饼图、地图。请给出技术选型理由。

### 第 27 题（🔴）

设计一个地图瓦片系统，支持海量 POI 点的快速渲染和交互。

### 第 28 题（🔴）

如何实现一个 Canvas 图表的事件命中检测系统？

### 第 29 题（🟡）

使用 Canvas 实现一个简单的柱状图组件，支持动画入场和数据更新。请写出核心实现代码。

### 第 30 题（🔴）

使用 Canvas 实现一个粒子系统，支持 10000+ 粒子的运动、碰撞和鼠标交互。请写出核心实现思路和关键代码。

### 第 31 题（🔴）

使用 D3.js 实现一个力导向图布局，并讨论在大规模节点下的优化策略。请写出核心代码。

---

## 参考答案

### 第 1 题

::: details 查看答案与解析
**答案：C**

WebGL 利用 GPU 并行渲染，适合大规模 3D 场景。SVG 和 Canvas 的 2D 渲染在性能和功能上不足以胜任复杂 3D 渲染。
:::

### 第 2 题

::: details 查看答案与解析
**答案：B**

SVG 是矢量图形，缩放不失真，每个图形都是 DOM 节点，易于绑定事件和实现交互。Canvas 是像素级渲染，不适合高交互场景。
:::

### 第 3 题

::: details 查看答案与解析
**答案：B**

Canvas 的性能瓶颈通常是绘制调用（draw call）过多。每次 `fill()` / `stroke()` 都会触发一次底层图形上下文的状态切换。应合并路径、使用批量绘制来减少调用次数。
:::

### 第 4 题

::: details 查看答案与解析
**答案：B**

10 万点散点图应使用 Canvas 批量绘制或 WebGL。SVG 创建 10 万个 DOM 节点会造成严重的性能问题。Canvas 可以将所有点合并到一次绘制调用中。
:::

### 第 5 题

::: details 查看答案与解析
**答案：B**

虚拟化（Virtualization）只渲染可视区域内或可见层级的数据元素，大幅减少绘制量和 DOM 节点数。常用于大数据量列表和分层地图。
:::

### 第 6 题

::: details 查看答案与解析
**答案：B**

`.enter()` 返回一个占位选择集，包含与新增数据对应的占位节点。配合 `.append()` 可以为每个新数据创建 DOM 元素。这是 D3 数据驱动文档（Data-Driven Documents）的核心机制。
:::

### 第 7 题

::: details 查看答案与解析
**答案：C**

`requestAnimationFrame` 由浏览器在每次重绘前调用，自动与显示器的刷新率同步（通常 60fps），且在页面不可见时自动暂停以节省资源。`setInterval` / `setTimeout` 无法与 VSync 对齐，容易造成丢帧。
:::

### 第 8 题

::: details 查看答案与解析
**答案：B**

ECharts 底层使用 ZRender 作为 Canvas 2D 渲染引擎。ZRender 是一个轻量级的 Canvas 绘图库，提供了图形元素管理、事件系统和动画支持。ECharts 5+ 也支持 SVG 渲染器作为备选。
:::

### 第 9 题

::: details 查看答案与解析
**答案：B**

片元着色器（Fragment Shader）针对每个像素（片元）执行，决定其最终颜色。顶点着色器处理顶点位置变换，计算着色器用于通用 GPU 计算，几何着色器可以增删顶点。
:::

### 第 10 题

::: details 查看答案与解析
**答案：B**

OffscreenCanvas 允许在 Web Worker 中执行 Canvas 渲染操作，避免阻塞主线程。渲染完成后通过 `transferControlToOffscreen()` 或 `transferToImageBitmap()` 将结果提交到主线程显示。
:::

### 第 11 题

::: details 查看答案与解析
**答案：B**

地图可视化需要处理 GeoJSON 数据的解析和地图投影转换。内置投影支持（如 Mercator、Albers）和 GeoJSON 集成是评估地图能力的关键指标。ECharts 和 AntV L7 在这方面有较好支持。
:::

### 第 12 题

::: details 查看答案与解析
**答案：B**

减少 Canvas 绘制调用的最有效方式是合并路径：将多个图形路径合并到一个 `beginPath()` / `fill()` / `stroke()` 周期中。批量绘制可以显著降低 CPU-GPU 通信开销。
:::

### 第 13 题

::: details 查看答案与解析
**答案：B**

Web Worker 不能直接操作 DOM 或 Canvas（除非使用 OffscreenCanvas），但在大型数据可视化中，它们负责离线程处理数据聚合、过滤、降采样和布局计算，避免主线程阻塞。
:::

### 第 14 题

::: details 查看答案与解析
**答案：B**

对于 100+ 图表的实时看板，全量重绘是不可接受的。现代图表库（如 ECharts 的 `setOption` 增量更新、Apache ECharts 的 appendData）支持仅更新变化的数据系列，大幅减少渲染开销。
:::

### 第 15 题

::: details 查看答案与解析
**答案：A**

无障碍访问需要组合使用 `role="img"`、`aria-label` 描述图表含义、`<title>` 提供简短标题、`<desc>` 提供详细数据描述。WCAG 指南建议为复杂数据可视化提供多重文本替代方案。
:::

### 第 16 题

::: details 查看答案与解析
**参考思路**：

- 5000 个可点击节点，SVG 仍可行但需分层设计或虚拟化。
- 若交互复杂（拖拽、右键菜单），可使用 Canvas + 自定义命中检测（几何碰撞检测、R-tree 空间索引）。
- 若设备节点数量预期增长到数万以上，应使用 WebGL + 拾取（picking）技术实现交互。
- 推荐方案：Canvas 渲染 + R-tree 加速命中检测，或使用 Three.js / PixiJS 作为中间层。
:::

### 第 17 题

::: details 查看答案与解析
**参考思路**：

1. **数据降采样**：使用 LTTB（Largest-Triangle-Three-Buckets）算法，将百万点压缩到几千点，保留视觉特征。
2. **渲染技术**：使用 Canvas 或 WebGL 替代 SVG。
3. **分层渲染**：坐标轴、网格线等静态元素渲染到离屏 Canvas 缓存，只有数据层需要重绘。
4. **渐进式加载**：首次渲染降采样数据，用户缩放时逐步加载更多细节。
5. **交互设计**：鼠标悬停 / 点击时查询原始数据局部细节，通过 Web Worker 处理数据查找。
:::

### 第 18 题

::: details 查看答案与解析
**参考思路**：

- 定义抽象渲染接口 `Renderer`，包含 `drawLine`、`drawRect`、`drawCircle`、`drawText`、`clear` 等方法。
- 实现三个具体渲染器：`SVGRenderer`（操作 DOM 元素）、`CanvasRenderer`（2D Context API）、`WebGLRenderer`（WebGL / Three.js）。
- 上层图表组件（LineChart、BarChart、PieChart）依赖 `Renderer` 接口，不关心具体实现。
- 根据数据量、交互要求和浏览器兼容性自动选择或手动指定渲染后端。
- 数据流：原始数据 → 比例尺映射 → 图形属性 → 渲染器绘制。
:::

### 第 19 题

::: details 查看答案与解析
**参考思路**：

- **数据层**：WebSocket 接收逐笔数据 → Web Worker 聚合为 1min / 5min / 日 K 线 → 通过 `postMessage` 传递到主线程。
- **渲染层**：使用 Canvas 2D（ECharts / LightweightCharts）或 WebGL（对于高频数据）。
- **交互层**：
  - 缩放：基于时间范围的数据过滤，只渲染可视窗口内的 K 线数量（控制在 200-500 根）。
  - 平移：维护视口偏移量，触发数据请求或本地数据切片切换。
  - 十字光标：在 Canvas 上叠加 `lineTo` 绘制十字线，或使用 SVG overlay 实现。
- **内存管理**：使用环形缓冲区（Ring Buffer）存储最近 N 根 K 线，避免内存无限增长。
:::

### 第 20 题

::: details 查看答案与解析
**参考思路**：

1. **渲染技术**：使用 WebGL（Three.js / Deck.gl / Regl），利用 GPU 点精灵（Point Sprites）或粒子系统渲染散点。
2. **数据结构**：使用 `Float32Array` 存储位置和颜色数据，上传到 GPU 缓冲区。
3. **空间索引**：构建八叉树（Octree）进行视锥体裁剪，只渲染视口内的点。
4. **LOD 分层**：根据相机距离动态切换点的显示密度和大小。
5. **渐进式渲染**：首次加载时先渲染降采样版本，逐步加载全部数据。
6. **交互**：使用射线拾取（Raycaster）检测鼠标指向的点，显示 tooltip。
:::

### 第 21 题

::: details 查看答案与解析
**参考思路**：

- **数据同步**：使用 CRDT（Conflict-free Replicated Data Types）或 OT（Operational Transform）解决冲突，WebSocket / WebRTC 传输操作。
- **渲染引擎**：Canvas 2D 渲染图形元素，维护一个图形对象数组（矩形、椭圆、路径、文本等）。
- **增量更新**：每次收到远程操作时，只更新受影响的图形对象的属性，调用 `requestAnimationFrame` 批量渲染。
- **优化策略**：
  - 脏区域标记：只重绘发生变化的区域。
  - 离屏 Canvas 缓存静态元素。
  - 对于高频绘制操作（如画笔），使用点采样 + 贝塞尔曲线拟合减少数据量。
- **撤销 / 重做**：基于操作历史的命令模式（Command Pattern）。
:::

### 第 22 题

::: details 查看答案与解析
**参考思路**：

1. **聚类聚合**：使用 SuperCluster 或 MarkerClusterer 在缩放级别切换时动态聚合 / 拆分 POI 标记。
2. **瓦片化**：将地图切分为 256x256 瓦片，只加载可视区域的瓦片数据。
3. **渲染**：
   - 低缩放级别（聚合）：Canvas 绘制聚合圆，显示数量。
   - 高缩放级别（单体）：Canvas 或 SVG overlay 绘制标记图标。
4. **空间索引**：使用四叉树快速检索可视区域内的 POI。
5. **交互**：点击聚合圆时放大到下一级别；点击单体标记时弹出信息窗口。
:::

### 第 23 题

::: details 查看答案与解析
**参考思路**：

- **数据流**：WebSocket 接收行情数据 → Web Worker 解析和格式化 → 通过 SharedArrayBuffer 或 `postMessage` 传递给主线程。
- **渲染策略**：
  - 主看板帧率控制在 30fps，避免过度绘制。
  - 使用增量更新（appendData）而非全量重绘。
  - 静态元素（背景、网格、坐标轴）渲染到离屏 Canvas 缓存。
- **内存管理**：维护最近 N 个数据点的环形缓冲区，丢弃过期数据。
- **图表分层**：将高频更新的图表（如分时图）与低频更新的图表（如技术指标）分离到不同的渲染层。
- **虚拟化**：若看板包含大量图表卡片，使用虚拟滚动只渲染可视区域的图表。
:::

### 第 24 题

::: details 查看答案与解析
**参考思路**：

1. **力模拟**：使用 D3-force 或自定义力算法（弹簧力、库仑力、向心力）。对于 10000 节点，需使用四叉树（QuadTree）加速力计算（Barnes-Hut 近似）。
2. **渲染**：使用 Canvas 或 WebGL 替代 SVG。D3 的力模拟可配合 Canvas 渲染，只使用 D3 的 simulation 部分。
3. **分层布局**：先聚类（社区发现算法如 Louvain），在聚类层面布局，再布局内部节点。
4. **渐进式渲染**：力模拟的每次 tick 增量更新 Canvas，tick 之间使用 `requestAnimationFrame` 控制帧率。
5. **交互优化**：
   - 拖拽固定节点时暂停模拟，释放后恢复。
   - 使用节流控制高频率的 mouseover 事件。
   - 缩放时使用 Canvas transform 而非重绘。
:::

### 第 25 题

::: details 查看答案与解析
**参考思路**：

- **基础渲染**：视频使用 `<video>` 元素播放，检测结果使用 Canvas 叠加层。将 Canvas 定位在视频上方，尺寸对齐。
- **检测框**：使用 `strokeRect` 绘制矩形框 + `fillText` 标注类别和置信度。
- **跟踪轨迹**：维护每个目标的轨迹点数组，使用 `lineTo` 绘制轨迹线，配合渐变透明度表示时间先后。
- **热力图**：
  - 对每个检测框中心点应用高斯模糊核，叠加到离屏 Canvas 上。
  - 使用 `getImageData` 和 `putImageData` 生成热力图纹理。
  - 或使用 WebGL（通过 Three.js 的纹理更新）获得更高帧率。
- **性能优化**：
  - 使用 `requestAnimationFrame` 同步视频帧率。
  - 离屏 Canvas 预处理检测框和文字，减少主循环绘制量。
  - 对于跟踪轨迹，超出时间窗口的旧轨迹点自动移除。
:::

### 第 26 题

::: details 查看答案与解析
**参考选型**：

- **折线图 / 饼图**：ECharts 或 AntV G2。开发效率高、文档完善、社区活跃，内置丰富交互。
- **地图**：ECharts 的地图系列配合 GeoJSON 数据，或 AntV L7 结合 Mapbox / AMap 底图。
- **Canvas 渲染**：对于数据量较大的时间序列图，采用 Canvas 渲染模式。
- **理由**：电商看板注重开发速度和维护成本，数据量在万级以内，ECharts 的配置化开发模式最适合。
:::

### 第 27 题

::: details 查看答案与解析
**参考思路**：

- 地图按缩放级别切分为 256x256 瓦片（符合 Slippy Map 标准）。
- 只加载可视区域 + 周边缓冲区的瓦片。
- POI 按四叉树或 GeoHash 网格索引组织。
- 视口外的 POI 不渲染，缩放级别低时聚合相近 POI。
- 使用 Canvas 或 WebGL 渲染 POI，离屏 Canvas 缓存静态瓦片。
- 交互时查询原始数据（通过空间索引定位），显示详细信息。
:::

### 第 28 题

::: details 查看答案与解析
**参考思路**：

1. **图形对象管理**：维护一个图形对象数组，每个对象记录类型、位置（x, y）、尺寸（width, height）、形状信息和自定义数据。
2. **坐标转换**：监听鼠标事件（click、mousemove），将事件坐标转换为 Canvas 坐标系（考虑 `getBoundingClientRect` 和 scale/translate 变换）。
3. **几何检测**：
   - 点与矩形：`x >= left && x <= right && y >= top && y <= bottom`
   - 点与圆：`distance < radius`
   - 点与多边形：射线法（Ray Casting）
4. **性能优化**：
   - 使用 R-tree 或网格索引，分批检测而非遍历所有图形。
   - 首先检测包围盒（AABB），再执行精确几何检测。
   - 离屏 Canvas 以颜色编码（Color Picking）辅助检测：每个图形渲染色块，通过像素颜色反查图形。
:::

### 第 29 题

::: details 查看答案与解析
**核心实现代码**：

```javascript
class BarChart {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.data = [];
    this.options = {
      barWidth: 40,
      gap: 10,
      color: '#4A90D9',
      animationDuration: 500,
      ...options,
    };
    this.animationId = null;
  }

  setData(data) {
    this.data = data;
    this.animateBars();
  }

  animateBars() {
    const startTime = performance.now();
    const startHeights = new Array(this.data.length).fill(0);
    const targetHeights = this.data.map((v) => (v / Math.max(...this.data)) * (this.canvas.height - 40));

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.options.animationDuration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);

      this.draw(startHeights.map((_, i) => {
        const target = targetHeights[i];
        return startHeights[i] + (target - startHeights[i]) * eased;
      }));

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      }
    };

    cancelAnimationFrame(this.animationId);
    this.animationId = requestAnimationFrame(animate);
  }

  draw(heights) {
    const { ctx, data, options } = this;
    const { barWidth, gap, color } = options;
    const width = ctx.canvas.width;
    const totalWidth = data.length * (barWidth + gap);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 绘制坐标轴
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(40, ctx.canvas.height - 30);
    ctx.lineTo(ctx.canvas.width - 10, ctx.canvas.height - 30);
    ctx.stroke();

    // 绘制柱状
    data.forEach((value, i) => {
      const x = 50 + i * (barWidth + gap);
      const y = ctx.canvas.height - 30 - heights[i];
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, heights[i]);

      // 标签
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value, x + barWidth / 2, ctx.canvas.height - 12);
    });
  }
}
```

**关键要点**：
- 使用 `requestAnimationFrame` 驱动动画循环。
- 缓动函数（easing）让动画更自然。
- `clearRect` 全清后重绘，适合数据量不大的场景。
- 大数据量时需改为脏区域增量更新。
:::

### 第 30 题

::: details 查看答案与解析
**核心实现思路和关键代码**：

```javascript
class ParticleSystem {
  constructor(canvas, count = 10000) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.initParticles(count);
    this.bindEvents();
    this.animate();
  }

  initParticles(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1,
        color: `hsla(${Math.random() * 360}, 80%, 60%, 0.8)`,
      });
    }
  }

  bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }

  update() {
    const { width, height } = this.canvas;
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      // 边界反弹
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // 鼠标排斥
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100 * 2;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 批量绘制：合并路径减少状态切换
    ctx.beginPath();
    for (const p of this.particles) {
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    }
    ctx.fillStyle = 'rgba(100, 150, 255, 0.6)';
    ctx.fill();
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}
```

**优化要点**：

1. **合并路径**：所有粒子在同一个 `beginPath` / `fill` 周期中绘制，极大减少 draw call。
2. **使用 `Float32Array`**：对于 10 万+ 粒子，使用类型化数组管理位置和速度，减少 GC 压力。
3. **空间哈希网格**：粒子间碰撞检测时使用空间哈希（Spatial Hashing）避免 O(n^2) 遍历。
4. **离屏 Canvas**：将静态背景缓存到离屏 Canvas，主循环只绘制粒子层。
5. **WebGL 替代**：当粒子数超过 5 万时，切换到 WebGL Point Sprites 以获得更好的 GPU 性能。
:::

### 第 31 题

::: details 查看答案与解析
**核心实现代码**：

```javascript
// 使用 D3-force 进行力模拟，Canvas 渲染
class ForceGraph {
  constructor(canvas, nodes, links) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = nodes;
    this.links = links;

    this.simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter(canvas.width / 2, canvas.height / 2))
      .force('collision', d3.forceCollide(10))
      .alphaDecay(0.02)
      .on('tick', () => this.draw());

    this.render();
  }

  draw() {
    const ctx = this.ctx;
    const { width, height } = this.canvas;

    ctx.clearRect(0, 0, width, height);

    // 绘制连线
    ctx.strokeStyle = 'rgba(150, 150, 150, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const link of this.links) {
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);
    }
    ctx.stroke();

    // 绘制节点
    for (const node of this.nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r || 5, 0, Math.PI * 2);
      ctx.fillStyle = node.color || '#4A90D9';
      ctx.fill();

      // 标签
      if (node.label && node.r > 8) {
        ctx.fillStyle = '#333';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.r + 12);
      }
    }
  }

  destroy() {
    this.simulation.stop();
  }
}
```

**大规模节点（10000+）优化策略**：

1. **Barnes-Hut 四叉树近似**：D3-force 默认使用四叉树加速 `forceManyBody` 计算，将 O(n^2) 降为 O(n log n)。
2. **Canvas 渲染替代 SVG**：避免创建大量 DOM 节点，使用 Canvas 的 `arc` 和 `moveTo/lineTo` 批量绘制。
3. **增量 Tick**：力模拟的每次 tick 只更新位置属性，增量绘制而非全量清空。
4. **边绑定（Edge Bundling）**：对于大量边，使用边绑定算法减少视觉杂乱。
5. **节点聚合**：对密集区域的节点进行聚类，展开/折叠交互。
6. **WebGL 渲染**：节点数超过 5000 时考虑使用 PixiJS 或 Three.js 进行 GPU 加速。
7. **交互节流**：拖拽 / hover 事件使用 `requestAnimationFrame` 节流，避免高频触发。
:::

---

**标签**：`#visualization` `#svg` `#canvas` `#webgl` `#d3` `#echarts` `#performance`

> **最后更新**：2026-07-06
