# WebGPU / 图形学 面试题

> 本题库共收录 **55** 道面试题（基础 11 / 进阶 19 / 深入 12 / 架构 13）。
> 本文件收录 WebGPU / 图形学相关面试题，目标题量 60 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、性能优化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-50-CO-B-001：WebGPU 与 WebGL 的核心区别是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、WebGL、GPU、3D、图形学
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 WebGPU 与 WebGL 的核心差异，从 API 设计、性能模型、多线程、计算能力、着色器语言等方面说明。

**参考答案**：

WebGPU 是下一代 Web 图形与计算 API，设计上吸收了 Vulkan、Metal、Direct3D 12 的现代特性；WebGL（尤其是 WebGL 2）则基于 OpenGL ES，属于较老的状态机式 API。

核心区别：

| 维度 | WebGL 2 | WebGPU |
|------|---------|--------|
| 底层模型 | OpenGL ES 状态机 | 现代显式 GPU API（Vulkan/Metal/D3D12） |
| 对象管理 | 全局隐式状态，频繁绑定 | 显式创建 Pipeline、Bind Group、Buffer、Texture |
| 多线程 | 主线程操作，难以并行 | 支持 Worker 中的 OffscreenCanvas 与 GPUDevice 共享 |
| GPU 计算 | 需借助 Transform Feedback 或片段着色器“曲线”实现 | 原生 Compute Shader，GPGPU 友好 |
| 着色器语言 | GLSL / ESSL | WGSL（WebGPU Shading Language），语法接近 Rust |
| 错误处理 | 运行时 gl.getError 查询 | 异步错误、Error Scope、Validation 更清晰 |
| 资源描述 | 运行时状态推断 | 显式 Layout、Bind Group、Vertex Buffer Layout |
| 适用场景 | 传统 3D 渲染、兼容性要求高 | 高性能渲染、大规模计算、现代图形引擎 |

最佳实践：
- 新项目且目标浏览器支持 WebGPU 时，优先使用 WebGPU 以获得更好性能和扩展性。
- 需要兼容旧浏览器或移动端 WebGL 成熟场景时，可保留 WebGL 1/2 路径。
- 使用 `@webgpu/glslang` 或 Tint 等工具辅助着色器迁移。

**评分维度**：
- 能说出 WebGPU 基于现代显式 API（30%）
- 能对比状态机 vs 显式对象管理（25%）
- 能说明 Compute Shader 与 WGSL 差异（25%）
- 能给出选型或兼容建议（20%）

**常见错误**：
- 认为 WebGPU 只是 WebGL 的“升级版语法糖”，忽略架构差异。
- 把 WebGPU 的 Buffer/Texture 概念与 WebGL 简单一一对应，忽略 Bind Group 显式 Layout。
- 认为 WebGPU 已完全替代 WebGL，忽视浏览器支持度和移动端差异。

**延伸追问**：
- WebGPU 如何通过 Error Scope 捕获异步错误？
- WebGL 的上下文丢失问题在 WebGPU 中如何缓解？

**相关题目**：
- [FB-50-CO-A-016 浏览器支持与降级策略](#FB-50-CO-A-016)
- [FB-50-CP-R-026 WebGPU 项目技术选型](#FB-50-CP-R-026)

**参考资源**：
- [WebGPU 官方规范](https://www.w3.org/TR/webgpu/)
- [MDN - WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WebGPU Fundamentals](https://webgpufundamentals.org/)

**口头回答版**：
> WebGPU 和 WebGL 最大的区别是底层模型。WebGL 是 OpenGL 风格的状态机，很多东西靠全局隐式状态；WebGPU 是现代显式 API，像 Vulkan、Metal，所有资源都要显式创建 Pipeline、Bind Group、Buffer、Texture。WebGPU 原生支持 Compute Shader，可以做通用 GPU 计算；WebGL 要做 GPGPU 比较麻烦。着色器语言也不一样，WebGL 用 GLSL，WebGPU 用 WGSL。新项目如果浏览器支持，我更倾向 WebGPU。

---

### FB-50-CO-B-002：简述 WebGPU 的渲染管线主要阶段。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、渲染管线、顶点着色器、片元着色器
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请简述从 JavaScript 提交绘制命令到屏幕显示像素，WebGPU 渲染管线经历的主要阶段。

**参考答案**：

WebGPU 渲染管线分为**应用层准备**和**GPU 固定功能/可编程阶段**两大部分。

1. **应用层准备**：
   - 创建 `GPUDevice` 与 `GPUQueue`。
   - 创建 Buffer（顶点、索引、Uniform）、Texture（颜色/深度附件）、Sampler。
   - 编写 WGSL 着色器模块，配置 `GPURenderPipelineDescriptor`。
   - 通过 `GPUCommandEncoder` 编码 `GPURenderPassEncoder` 命令，最后 `submit`。

2. **GPU 阶段**：
   - **输入装配（Input Assembler）**：按 `vertexBuffers` 和 `primitive.topology` 读取顶点数据。
   - **顶点着色器（Vertex Shader）**：对每个顶点执行，输出裁剪空间位置与插值数据。
   - **图元装配（Primitive Assembly）**：将顶点组织成点/线/三角形，进行视口变换与裁剪。
   - **光栅化（Rasterization）**：将图元离散为片元（fragment），进行透视校正插值。
   - **片元着色器（Fragment Shader）**：计算每个片元颜色、深度，可采样纹理。
   - **输出合并（Output Merger / Blend）**：深度/模板测试，颜色混合，写入 `colorAttachments`。

可编程阶段只有顶点着色器和片元着色器；中间阶段为固定功能，通过 `GPURenderPipeline` 描述符配置。

**评分维度**：
- 能说出应用层主要准备步骤（30%）
- 能按顺序说出 GPU 阶段（40%）
- 能区分可编程阶段与固定功能阶段（30%）

**常见错误**：
- 漏掉输入装配或输出合并阶段。
- 把 Compute Shader 混进渲染管线阶段。
- 认为片元着色器直接写屏，忽略 Framebuffer 与附件概念。

**延伸追问**：
- `GPURenderPipeline` 中哪些状态属于固定功能？
- 如何在 WGSL 中获取顶点索引与实例索引？

**相关题目**：
- [FB-50-CO-A-012 GPURenderPipeline 配置要点](#FB-50-CO-A-012)
- [FB-50-CD-A-010 用 WebGPU 绘制三角形完整流程](#FB-50-CD-A-010)

**参考资源**：
- [WebGPU 规范 - Render Pipeline](https://www.w3.org/TR/webgpu/#render-pipeline)
- [WebGPU Fundamentals - The Basics](https://webgpufundamentals.org/webgpu/lessons/webgpu-fundamentals.html)

**口头回答版**：
> WebGPU 渲染管线先是在 JavaScript 里准备好 Device、Queue、Buffer、Texture，写好 WGSL，配置好 RenderPipeline，然后用 CommandEncoder 编码命令提交。GPU 拿到命令后，先做输入装配读取顶点，再跑顶点着色器，把顶点变成裁剪空间坐标；然后图元装配、裁剪，光栅化成片元；再跑片元着色器算颜色；最后做深度测试、颜色混合，写到颜色附件上。可编程的只有顶点和片元着色器，中间都是固定功能。

---

### FB-50-CO-B-003：`GPUAdapter`、`GPUDevice` 和 `GPUQueue` 之间是什么关系？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、GPUAdapter、GPUDevice、GPUQueue
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 `navigator.gpu.requestAdapter()`、`adapter.requestDevice()` 和 `device.queue` 三者的层级关系与职责。

**参考答案**：

三者为层级关系，分别对应“物理/逻辑适配器 → 逻辑设备 → 命令队列”。

- **GPUAdapter**：
  - 通过 `navigator.gpu.requestAdapter()` 获取。
  - 代表一块可用的 GPU 硬件或软件渲染器。
  - 可查询能力（limits、features、isFallbackAdapter 等）。
  - 不直接用于创建资源，必须先请求 Device。

- **GPUDevice**：
  - 通过 `adapter.requestDevice(descriptor)` 获取，可指定所需 limits 和 features。
  - 逻辑设备，拥有独立的命令编码、资源创建、管线创建能力。
  - 支持设置 `lost` 回调处理上下文丢失。
  - 可以创建多个内部对象（Buffer、Texture、BindGroup、Pipeline 等）。

- **GPUQueue**：
  - 通过 `device.queue` 访问。
  - 负责提交已编码的 `GPUCommandBuffer`。
  - 也提供 `writeBuffer`、`writeTexture` 等便捷上传接口。

示例：

```javascript
const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
const device = await adapter.requestDevice({
  requiredFeatures: [],
  requiredLimits: { maxStorageBufferBindingSize: 128 * 1024 * 1024 },
});
const queue = device.queue;

// 创建资源、编码命令、提交
const buffer = device.createBuffer({ size: 1024, usage: GPUBufferUsage.UNIFORM });
```

**评分维度**：
- 能说明 Adapter 代表 GPU 硬件/软件适配器（30%）
- 能说明 Device 是逻辑设备并负责创建资源（35%）
- 能说明 Queue 负责提交命令与上传数据（35%）

**常见错误**：
- 在 Adapter 上直接创建 Buffer 或 Texture。
- 混淆 Adapter 的 `features` 与 Device 的 `features`。
- 忽略 `device.lost` 事件处理。

**延伸追问**：
- `requestDevice` 失败时如何降级？
- 多个 `canvas` 是否可以共享同一个 Device？

**相关题目**：
- [FB-50-CO-A-016 浏览器支持与降级策略](#FB-50-CO-A-016)
- [FB-50-CD-A-010 用 WebGPU 绘制三角形完整流程](#FB-50-CD-A-010)

**参考资源**：
- [MDN - GPUAdapter](https://developer.mozilla.org/en-US/docs/Web/API/GPUAdapter)
- [MDN - GPUDevice](https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice)

**口头回答版**：
> 这三层是递进关系。Adapter 是通过 `navigator.gpu.requestAdapter()` 拿到的，代表一块 GPU；然后向 Adapter 要一个 Device，`adapter.requestDevice()`，Device 是逻辑设备，负责创建 Buffer、Texture、Pipeline 这些资源；Device 上有一个 Queue，`device.queue`，负责把编码好的命令提交给 GPU，也提供 writeBuffer、writeTexture 这种上传接口。实际干活的是 Device 和 Queue。

---

### FB-50-CO-B-004：WebGPU 中 Buffer 有哪些主要用途和 Usage 标志？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Buffer、Vertex Buffer、Uniform Buffer、Storage Buffer
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举 WebGPU 中 `GPUBuffer` 的常见用途，并说明 `GPUBufferUsage` 中的关键标志。

**参考答案**：

`GPUBuffer` 是 GPU 可见的线性内存块，通过 `device.createBuffer(descriptor)` 创建，必须显式指定 `usage`。

常见用途与 Usage 标志：

| 用途 | Usage 标志 | 说明 |
|------|-----------|------|
| 顶点数据 | `VERTEX` | 顶点着色器读取的顶点属性数据 |
| 索引数据 | `INDEX` | 用于 `drawIndexed` 的索引数据 |
| Uniform 常量 | `UNIFORM` | 顶点和片元着色器共享的只读常量，通常较小 |
| 可读可写存储 | `STORAGE` | Compute Shader 或片元着色器读写的大块数据 |
| 间接绘制参数 | `INDIRECT` | 存放 `drawIndirect` / `drawIndexedIndirect` 参数 |
| 查询结果 | `QUERY_RESOLVE` | 存放遮挡查询、时间戳查询结果 |
| CPU 上传 | `MAP_WRITE` / `COPY_SRC` | 通过 `writeBuffer` 或映射上传数据 |
| CPU 回读 | `MAP_READ` / `COPY_DST` | 通过 `readBuffer` 或映射读取 GPU 结果 |

使用规则：
- `usage` 可以按位或组合，例如 `VERTEX | COPY_DST`。
- 创建后大小固定，不能动态扩容。
- 大数组或 Compute 结果常用 `STORAGE` Buffer。

示例：

```javascript
const vertexBuffer = device.createBuffer({
  size: vertices.byteLength,
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  mappedAtCreation: true,
});
new Float32Array(vertexBuffer.getMappedRange()).set(vertices);
vertexBuffer.unmap();
```

**评分维度**：
- 能列举至少 5 种 Buffer 用途（40%）
- 能说明 Usage 可组合（30%）
- 能写出创建 Buffer 的代码示例（30%）

**常见错误**：
- 创建 Buffer 时忘记指定 COPY_DST，导致 `writeBuffer` 失败。
- 把 Uniform Buffer 当 Storage Buffer 用，超出 size 限制。
- 试图通过 Map 访问未设置 MAP_READ/MAP_WRITE 的 Buffer。

**延伸追问**：
- `mappedAtCreation: true` 与 `mapAsync` 有什么区别？
- 为什么 Uniform Buffer 通常需要按 256 字节对齐？

**相关题目**：
- [FB-50-CD-A-010 用 WebGPU 绘制三角形完整流程](#FB-50-CD-A-010)
- [FB-50-CO-A-011 Uniform Buffer 与 Storage Buffer 区别](#FB-50-CO-A-011)

**参考资源**：
- [MDN - GPUBuffer](https://developer.mozilla.org/en-US/docs/Web/API/GPUBuffer)
- [WebGPU Fundamentals - Buffers](https://webgpufundamentals.org/webgpu/lessons/webgpu-points.html)

**口头回答版**：
> WebGPU 的 Buffer 就是 GPU 上的一块线性内存，创建时必须指定 usage。常见有 VERTEX 顶点数据、INDEX 索引数据、UNIFORM 常量、STORAGE 可读写存储、INDIRECT 间接绘制参数，还有 MAP_READ/MAP_WRITE 用来和 CPU 交互。usage 可以用位运算组合，比如 VERTEX 加 COPY_DST。要注意创建后大小固定，Uniform Buffer 一般比较小，Storage Buffer 可以很大。

---

### FB-50-CO-B-005：`GPUTexture` 与 `GPUSampler` 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Texture、Sampler、采样、纹理
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 WebGPU 中 Texture 与 Sampler 的职责差异，以及为什么通常需要同时创建两者。

**参考答案**：

- **GPUTexture**：
  - 实际存储图像或附件数据的 GPU 资源。
  - 包含维度（2D、2DArray、3D、Cube）、格式（rgba8unorm、depth24plus 等）、mipmap 层级、Usage。
  - 可作为颜色附件、深度附件，或绑定到着色器读取。

- **GPUSampler**：
  - 描述“如何采样 Texture”的状态对象。
  - 包含过滤方式（nearest / linear）、寻址模式（clamp-to-edge / repeat）、mipmap 过滤等。
  - 不存储像素，只定义采样行为。

二者关系：
- Texture 是“数据”，Sampler 是“读取数据的方式”。
- 在 WGSL 中通常配合 `texture_2d` 与 `sampler` 使用：

```wgsl
@group(0) @binding(0) var myTexture: texture_2d<f32>;
@group(0) @binding(1) var mySampler: sampler;

@fragment
fn fsMain(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  return textureSample(myTexture, mySampler, uv);
}
```

最佳实践：
- 多个 Texture 可以共享同一个 Sampler，只要采样行为相同。
- 为不同用途（UI、3D 模型、后处理）创建独立的 Sampler。

**评分维度**：
- 能区分 Texture 是数据、Sampler 是采样状态（50%）
- 能说明常见 Sampler 参数（25%）
- 能写出 WGSL 中二者绑定示例（25%）

**常见错误**：
- 认为 Sampler 也存储像素数据。
- 为每个 Texture 都创建独立 Sampler，造成资源浪费。
- 在 Compute Shader 中错误使用 `textureSample`（Compute 中应使用 `textureLoad` / `textureStore`）。

**延伸追问**：
- 为什么在 Compute Shader 中通常不能用 `textureSample`？
- Mipmap 的生成方式在 WebGPU 中有哪些？

**相关题目**：
- [FB-50-CO-B-006 Bind Group 作用](#FB-50-CO-B-006)
- [FB-50-CD-P-023 后处理流程实现](#FB-50-CD-P-023)

**参考资源**：
- [MDN - GPUTexture](https://developer.mozilla.org/en-US/docs/Web/API/GPUTexture)
- [MDN - GPUSampler](https://developer.mozilla.org/en-US/docs/Web/API/GPUSampler)

**口头回答版**：
> Texture 是真正存图像像素数据的地方，有格式、尺寸、mipmap；Sampler 是描述怎么读这个 Texture，比如用最近邻还是线性过滤，边缘是重复还是截断。它们是数据和读取方式的关系。WGSL 里要分别声明 `texture_2d` 和 `sampler`，然后 `textureSample` 一起用。多个 Texture 可以共用一个 Sampler。

---

### FB-50-CO-B-006：Bind Group 在 WebGPU 中起什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Bind Group、Binding、资源绑定、Layout
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `GPUBindGroup` 和 `GPUBindGroupLayout` 的作用，以及为什么 WebGPU 要求显式声明资源绑定布局。

**参考答案**：

- **GPUBindGroupLayout**：
  - 描述一组绑定槽位的类型与可见性（vertex / fragment / compute）。
  - 例如：槽位 0 是 uniform buffer，槽位 1 是 sampled texture，槽位 2 是 sampler。
  - 由 Pipeline Layout 引用，保证管线与绑定组结构一致。

- **GPUBindGroup**：
  - 是 Bind Group Layout 的具体实例，把真实资源（Buffer、Texture、Sampler）绑定到对应槽位。
  - 可以在多帧或多 Draw Call 间复用，只需切换 Bind Group 即可切换材质、参数。

显式布局的好处：
- 驱动可在创建管线时完成校验与优化，避免运行时状态推断开销。
- 多材质场景下，材质切换只需换 Bind Group，Pipeline 可保持不变。
- 资源可见性精确到 Shader Stage，减少不必要的绑定开销。

示例：

```javascript
const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
    { binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
    { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: {} },
  ],
});

const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    { binding: 0, resource: { buffer: uniformBuffer } },
    { binding: 1, resource: sampler },
    { binding: 2, resource: texture.createView() },
  ],
});
```

**评分维度**：
- 能说明 Bind Group Layout 定义槽位结构（35%）
- 能说明 Bind Group 绑定真实资源（35%）
- 能解释显式布局对性能与校验的意义（30%）

**常见错误**：
- 把 Bind Group 和 Pipeline Layout 混为一谈。
- 绑定资源类型与 Layout 声明不一致，导致 validation error。
- 在每一帧都重新创建 Bind Group，忽略复用。

**延伸追问**：
- 多个 Bind Group 如何配合不同的 `@group` 编号？
- 动态偏移（dynamic offsets）在 Uniform Buffer 中有什么用？

**相关题目**：
- [FB-50-CO-B-005 Texture 与 Sampler 区别](#FB-50-CO-B-005)
- [FB-50-CD-A-010 用 WebGPU 绘制三角形完整流程](#FB-50-CD-A-010)

**参考资源**：
- [MDN - GPUBindGroup](https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroup)
- [MDN - GPUBindGroupLayout](https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroupLayout)

**口头回答版**：
> Bind Group Layout 是“模板”，定义有哪些槽位、每个槽位是什么类型、对哪些着色器阶段可见；Bind Group 是“实例”，把真正的 Buffer、Texture、Sampler 填到这些槽位里。WebGPU 要求显式声明布局，这样驱动在创建管线时就能校验和优化，运行时切换 Bind Group 也很快。多材质场景下，通常 Pipeline 不变，只换 Bind Group。

---

### FB-50-CD-B-007：手写一个最简单的 WGSL 顶点着色器和片元着色器。

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、WGSL、顶点着色器、片元着色器、着色器
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请手写一个 WGSL 顶点着色器和片元着色器，实现：顶点输入包含位置和颜色，输出裁剪空间位置与插值颜色，片元阶段直接输出插值颜色。

**参考答案**：

WGSL 程序示例：

```wgsl
// 顶点着色器：输入位置与颜色，输出裁剪空间位置与插值颜色
struct VertexInput {
  @location(0) position: vec3<f32>,
  @location(1) color: vec3<f32>,
};

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec3<f32>,
};

@vertex
fn vsMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = vec4<f32>(input.position, 1.0);
  output.color = input.color;
  return output;
}

// 片元着色器：接收插值颜色并输出
@fragment
fn fsMain(input: VertexOutput) -> @location(0) vec4<f32> {
  return vec4<f32>(input.color, 1.0);
}
```

关键语法点：
- `@vertex` / `@fragment` 标明入口函数。
- `@location(n)` 用于自定义顶点属性与阶段间插值数据。
- `@builtin(position)` 是顶点着色器必须输出的裁剪空间位置。
- 片元着色器返回值用 `@location(0)` 指定写入第几个颜色附件。

JavaScript 侧顶点布局对应：

```javascript
const pipeline = device.createRenderPipeline({
  vertex: {
    module: shaderModule,
    entryPoint: 'vsMain',
    buffers: [{
      arrayStride: 6 * 4,
      attributes: [
        { shaderLocation: 0, offset: 0, format: 'float32x3' },
        { shaderLocation: 1, offset: 3 * 4, format: 'float32x3' },
      ],
    }],
  },
  fragment: {
    module: shaderModule,
    entryPoint: 'fsMain',
    targets: [{ format: presentationFormat }],
  },
  primitive: { topology: 'triangle-list' },
});
```

**评分维度**：
- 能正确书写 vertex / fragment 入口（30%）
- 能正确使用 @builtin(position) 和 @location（30%）
- 能匹配 JavaScript 顶点布局（25%）
- 能解释 WGSL 基本语法（15%）

**常见错误**：
- 顶点着色器忘记输出 `@builtin(position)`。
- 片元着色器返回颜色没用 `@location(0)`。
- `arrayStride` 或 `offset` 计算错误。
- 把 GLSL 的 `in/out` 语法直接套用到 WGSL。

**延伸追问**：
- 如果要传入 MVP 矩阵，应该在 WGSL 中如何声明 Uniform？
- `@location` 和 `@binding` 有什么区别？

**相关题目**：
- [FB-50-CO-B-002 WebGPU 渲染管线主要阶段](#FB-50-CO-B-002)
- [FB-50-CA-A-013 着色器代码分析](#FB-50-CA-A-013)

**参考资源**：
- [WGSL 官方规范](https://www.w3.org/TR/WGSL/)
- [WebGPU Fundamentals - WGSL](https://webgpufundamentals.org/webgpu/lessons/webgpu-wgsl.html)

**口头回答版**：
> 顶点着色器用 `@vertex` 标注，入口函数里接收 `@location(0)` 的位置和 `@location(1)` 的颜色，输出一个结构体，里面必须包含 `@builtin(position)` 的裁剪空间位置，颜色再用 `@location(0)` 传给片元。片元着色器用 `@fragment`，接收这个颜色，返回 `@location(0)` 的 `vec4` 颜色。JavaScript 那边要配置 `arrayStride` 和 attributes，让 shaderLocation 和 WGSL 里的 location 对应起来。

---

### FB-50-CO-B-008：Three.js / Babylon.js 与 WebGPU 是什么关系？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Three.js、Babylon.js、3D、渲染引擎
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Three.js、Babylon.js 这类高层 3D 库与 WebGPU 的关系。它们是否直接“等于”WebGPU？

**参考答案**：

Three.js / Babylon.js 是**高层渲染引擎/框架**，WebGPU 是**底层图形 API**，二者不是同一层。

关系：
- Three.js 和 Babylon.js 内部可以基于 WebGLRenderer 或 WebGPURenderer 将场景图、材质、灯光等高级对象翻译成底层的绘制命令。
- 对开发者而言，大部分 API 保持不变；底层渲染器切换即可利用 WebGPU 的新特性。

差异：

| 维度 | Three.js / Babylon.js | WebGPU |
|------|------------------------|--------|
| 抽象层级 | 场景、相机、材质、灯光 | Buffer、Texture、Pipeline、Command Encoder |
| 使用难度 | 低，快速构建 3D 应用 | 高，需要理解 GPU 管线 |
| 性能上限 | 受框架抽象开销影响 | 可精细化控制，性能上限更高 |
| 灵活性 | 受框架约束 | 完全自定义渲染管线 |

选型建议：
- 业务项目、快速原型：用 Three.js / Babylon.js，并开启 WebGPU 后端。
- 自研引擎、重度性能优化、Compute Shader 特殊需求：直接使用 WebGPU。

**评分维度**：
- 能说明高层库与底层 API 的层级关系（40%）
- 能对比抽象层级与灵活性（30%）
- 能给出合理选型建议（30%）

**常见错误**：
- 认为学了 Three.js 就等于掌握了 WebGPU。
- 认为 WebGPU 出现后会立刻淘汰 Three.js（实际上是互补关系）。
- 在不需要底层控制的项目中直接裸写 WebGPU，导致维护成本过高。

**延伸追问**：
- Three.js 的 WebGPURenderer 目前成熟度如何？
- 自研 WebGPU 引擎时，如何借鉴 Three.js 的场景图设计？

**相关题目**：
- [FB-50-SD-R-028 与 Three.js / Babylon 集成架构](#FB-50-SD-R-028)
- [FB-50-CP-R-026 WebGPU 项目技术选型](#FB-50-CP-R-026)

**参考资源**：
- [Three.js WebGPU 支持](https://threejs.org/docs/?q=webgpu#api/en/renderers/webgpu/WebGPURenderer)
- [Babylon.js WebGPU 文档](https://doc.babylonjs.com/setup/support/webGPU)

**口头回答版**：
> Three.js 和 Babylon.js 是高层 3D 引擎，WebGPU 是底层图形 API，它们不是一回事。这些引擎可以把场景、模型、材质翻译成 WebGPU 或 WebGL 的绘制命令，开发者大部分时候不用改代码，换 backend 就行。Three.js 适合快速做业务，WebGPU 适合要做深度优化、自定义管线或者用 Compute Shader 的场景。它们是互补关系。


---

## 进阶题（8 道）{#advanced}

### FB-50-CO-A-009：`GPUCommandEncoder` 与 `GPURenderPassEncoder` 的关系是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、CommandEncoder、RenderPassEncoder、命令编码、提交
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 WebGPU 中 `GPUCommandEncoder`、`GPURenderPassEncoder` 与 `GPUQueue.submit` 的关系，以及为什么采用显式命令编码模型。

**参考答案**：

三者构成“编码 → 结束 → 提交”的命令录制流程：

1. **GPUCommandEncoder**：
   - 通过 `device.createCommandEncoder()` 创建。
   - 负责录制一帧或一批 GPU 命令，可包含多个 Render Pass、Compute Pass、Copy 命令。
   - 是命令缓冲区的构建器。

2. **GPURenderPassEncoder**：
   - 通过 `commandEncoder.beginRenderPass(descriptor)` 创建。
   - 对应一次渲染通道，设置 viewport、scissor、Pipeline、Bind Group、Vertex Buffer 后执行 `draw`。
   - 调用 `end()` 关闭通道，命令写入 CommandEncoder。

3. **GPUQueue.submit**：
   - 通过 `device.queue.submit([commandBuffer])` 提交。
   - `commandBuffer` 由 `commandEncoder.finish()` 生成。
   - 提交后 GPU 异步执行命令。

显式命令编码的优势：
- 所有命令预先记录，驱动可优化调度、减少每帧 CPU 验证。
- 天然支持多线程 Worker 编码命令（未来扩展方向）。
- Copy、Render、Compute 命令可交错组织在同一 Command Buffer 中。

示例：

```javascript
const encoder = device.createCommandEncoder();
const pass = encoder.beginRenderPass({
  colorAttachments: [{
    view: textureView,
    loadOp: 'clear',
    storeOp: 'store',
    clearValue: { r: 0, g: 0, b: 0, a: 1 },
  }],
});
pass.setPipeline(pipeline);
pass.setBindGroup(0, bindGroup);
pass.setVertexBuffer(0, vertexBuffer);
pass.draw(3);
pass.end();
const commandBuffer = encoder.finish();
device.queue.submit([commandBuffer]);
```

**评分维度**：
- 能说明 CommandEncoder 是命令录制器（30%）
- 能说明 RenderPassEncoder 对应一次渲染通道（30%）
- 能解释显式编码的优势（25%）
- 能写出完整编码提交代码（15%）

**常见错误**：
- 在 Render Pass 未 `end()` 时就 `finish()` CommandEncoder。
- 混淆 `loadOp` / `storeOp` 的语义。
- 以为 `draw()` 调用后立即执行（实际是命令录制，提交后才执行）。

**延伸追问**：
- Compute Pass 与 Render Pass 能否共用同一个 CommandEncoder？
- 为什么 WebGPU 推荐每帧都创建新的 CommandEncoder？

**相关题目**：
- [FB-50-CD-A-010 用 WebGPU 绘制三角形完整流程](#FB-50-CD-A-010)
- [FB-50-CO-P-017 Compute Shader 与渲染管线区别](#FB-50-CO-P-017)

**参考资源**：
- [MDN - GPUCommandEncoder](https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder)
- [MDN - GPURenderPassEncoder](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder)

**口头回答版**：
> CommandEncoder 是用来录制命令的，可以把它理解成一张纸；RenderPassEncoder 是一次渲染通道，比如 `beginRenderPass` 相当于在这张纸上新开一页，画完调用 `end()`。最后 `encoder.finish()` 得到 commandBuffer，再通过 `device.queue.submit` 提交给 GPU。这样所有命令都是预先录好的，驱动可以做优化，也更容易做并行编码。

---

### FB-50-CD-A-010：请写出用 WebGPU 绘制一个三角形的完整流程。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、三角形、绘制流程、RenderPipeline、CommandEncoder
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请写出从获取 GPU 适配器到在 `canvas` 上绘制一个彩色三角形的完整 JavaScript + WGSL 代码，并说明关键步骤。

**参考答案**：

完整流程分为：初始化 → 准备资源 → 配置管线 → 编码绘制 → 提交。

```javascript
async function init() {
  const canvas = document.querySelector('canvas');
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();
  const context = canvas.getContext('webgpu');
  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({ device, format });

  // 1. 顶点数据
  const vertices = new Float32Array([
    // x, y, r, g, b
     0.0,  0.5, 1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 1.0, 0.0,
     0.5, -0.5, 0.0, 0.0, 1.0,
  ]);
  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true,
  });
  new Float32Array(vertexBuffer.getMappedRange()).set(vertices);
  vertexBuffer.unmap();

  // 2. WGSL 着色器
  const shaderCode = `
    struct VOut {
      @builtin(position) pos: vec4<f32>,
      @location(0) color: vec3<f32>,
    };
    @vertex
    fn vs(@location(0) pos: vec2<f32>, @location(1) color: vec3<f32>) -> VOut {
      var out: VOut;
      out.pos = vec4<f32>(pos, 0.0, 1.0);
      out.color = color;
      return out;
    }
    @fragment
    fn fs(in: VOut) -> @location(0) vec4<f32> {
      return vec4<f32>(in.color, 1.0);
    }
  `;
  const shaderModule = device.createShaderModule({ code: shaderCode });

  // 3. 渲染管线
  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: shaderModule,
      entryPoint: 'vs',
      buffers: [{
        arrayStride: 5 * 4,
        attributes: [
          { shaderLocation: 0, offset: 0, format: 'float32x2' },
          { shaderLocation: 1, offset: 2 * 4, format: 'float32x3' },
        ],
      }],
    },
    fragment: {
      module: shaderModule,
      entryPoint: 'fs',
      targets: [{ format }],
    },
    primitive: { topology: 'triangle-list' },
  });

  // 4. 绘制
  function frame() {
    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [{
        view: context.getCurrentTexture().createView(),
        loadOp: 'clear',
        storeOp: 'store',
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
      }],
    });
    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, vertexBuffer);
    pass.draw(3);
    pass.end();
    device.queue.submit([encoder.finish()]);
    requestAnimationFrame(frame);
  }
  frame();
}
init();
```

关键步骤说明：
1. `context.configure` 把 canvas 与 device、swapchain format 绑定。
2. `mappedAtCreation` 在创建时映射 CPU 内存，快速写入顶点数据。
3. `layout: 'auto'` 让管线根据着色器中的 `@group` / `@binding` 自动生成 Bind Group Layout。
4. `colorAttachments` 指定本次渲染写入的 canvas 纹理视图。

**评分维度**：
- 能完成适配器/设备/上下文初始化（20%）
- 能正确创建 Buffer 并写入顶点数据（20%）
- 能编写匹配的 WGSL 与管线配置（25%）
- 能正确编码 RenderPass 并提交（25%）
- 能说明 `layout: 'auto'` 和 `context.configure`（10%）

**常见错误**：
- `arrayStride` 或 attribute offset 算错。
- `context.getCurrentTexture()` 在 `configure` 之前调用。
- 忘记 `unmap()` 导致 Buffer 无法被 GPU 使用。
- `draw` 数量与顶点数据不匹配。

**延伸追问**：
- 如果要加入 Uniform MVP 矩阵，流程需要改哪些地方？
- `loadOp: 'load'` 与 `loadOp: 'clear'` 有什么区别？

**相关题目**：
- [FB-50-CO-A-009 Command Encoder 与 Render Pass](#FB-50-CO-A-009)
- [FB-50-CO-A-012 GPURenderPipeline 配置要点](#FB-50-CO-A-012)

**参考资源**：
- [WebGPU Fundamentals - Triangle](https://webgpufundamentals.org/webgpu/lessons/webgpu-from-webgl.html)
- [MDN - Drawing a triangle](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

**口头回答版**：
> 画三角形要先拿到 adapter、device，给 canvas 配置 webgpu context。然后创建 vertex buffer 写顶点数据，写 WGSL 顶点和片元着色器，创建 render pipeline，指定顶点布局。最后用 command encoder 开始 render pass，设置 viewport，绑定 pipeline 和 vertex buffer，调用 draw，end 之后 finish 成 command buffer 提交给 queue。注意 `context.configure`、`arrayStride` 和 attribute offset 要对齐。

---

### FB-50-CO-A-011：Uniform Buffer 与 Storage Buffer 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Uniform Buffer、Storage Buffer、WGSL、资源绑定
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 WebGPU 中 Uniform Buffer 与 Storage Buffer 的差异，包括使用场景、大小限制、读写权限和对齐要求。

**参考答案**：

| 维度 | Uniform Buffer | Storage Buffer |
|------|---------------|----------------|
| WGSL 类型 | `uniform` | `storage, read` / `storage, read_write` |
| 读写权限 | 只读 | 可读、可读写（Compute） |
| 典型大小 | 较小（通常 64KB 左右，具体看 limits） | 较大（可达数百 MB） |
| 使用阶段 | Vertex / Fragment / Compute | Vertex / Fragment / Compute |
| 对齐要求 | minUniformBufferOffsetAlignment（通常 256B） | minStorageBufferOffsetAlignment（通常 4B） |
| 动态偏移 | 支持 dynamic offsets | 支持 dynamic offsets |
| 典型用途 | MVP 矩阵、灯光参数、材质常量 | 粒子数据、大规模计算结果、SSBO |

使用建议：
- 小批量、只读、频繁共享的数据用 Uniform Buffer。
- 大批量、需要 Compute Shader 读写、或超出 Uniform 限制的数据用 Storage Buffer。
- 在 Fragment Shader 中使用 Storage Buffer 读取大表（如 LUT）时要注意性能与平台支持。

WGSL 示例：

```wgsl
@group(0) @binding(0)
var<uniform> uParams: Params;

@group(0) @binding(1)
var<storage, read> sParticles: array<Particle>;

@group(0) @binding(2)
var<storage, read_write> sCounter: atomic<u32>;
```

**评分维度**：
- 能说明 Uniform 只读、Storage 可读写（30%）
- 能对比大小限制与对齐要求（30%）
- 能给出典型使用场景（25%）
- 能写出 WGSL 声明示例（15%）

**常见错误**：
- 在 Fragment Shader 中用 Uniform Buffer 存大量顶点数据，超过限制。
- 把需要 Compute 写的 Buffer 声明为 `uniform`。
- 忽略 Uniform Buffer 的动态偏移对齐要求，导致 validation 错误。

**延伸追问**：
- 为什么 Storage Buffer 在 Fragment Shader 中的随机访问可能比 Texture 慢？
- `atomic` 操作在 Storage Buffer 中有什么限制？

**相关题目**：
- [FB-50-CO-B-004 Buffer 主要用途和 Usage 标志](#FB-50-CO-B-004)
- [FB-50-CD-P-018 手写 Compute Shader 实现矩阵乘法](#FB-50-CD-P-018)

**参考资源**：
- [WebGPU 规范 - Buffer Binding](https://www.w3.org/TR/webgpu/#buffer-binding)
- [WGSL - Storage Class](https://www.w3.org/TR/WGSL/#storage-class)

**口头回答版**：
> Uniform Buffer 是只读的小缓冲区，适合放 MVP 矩阵、灯光参数这些常量，有 256 字节左右的对齐要求；Storage Buffer 可以很大，Compute Shader 里还能读写，适合做粒子数据、计算结果这种大批量数据。WGSL 里 Uniform 用 `var<uniform>`，Storage 用 `var<storage, read>` 或 `read_write`，还可以用 atomic。

---

### FB-50-CO-A-012：配置 `GPURenderPipeline` 时需要指定哪些关键状态？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、RenderPipeline、图元装配、深度模板、颜色混合
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 `GPURenderPipelineDescriptor` 中必须或常见的配置项，以及它们对渲染结果的影响。

**参考答案**：

`GPURenderPipeline` 是 WebGPU 中“几乎不可变”的对象，创建时即确定大部分渲染状态，运行时切换开销小。关键配置项：

1. **layout**：
   - 管线使用的 Bind Group Layout，可显式指定或 `layout: 'auto'`。

2. **vertex**：
   - `module`、`entryPoint`：顶点着色器模块与入口。
   - `buffers`：顶点缓冲布局（arrayStride、attributes、stepMode）。

3. **fragment**：
   - `module`、`entryPoint`：片元着色器模块与入口。
   - `targets`：颜色附件格式、混合模式（blend）、写掩码（writeMask）。

4. **primitive**：
   - `topology`：点/线/三角形列表/条带（point-list、line-list、triangle-list、triangle-strip）。
   - `cullMode`：面剔除（none/front/back）。
   - `frontFace`：定义正面方向（ccw/cw）。

5. **depthStencil**（可选）：
   - `depthWriteEnabled`、`depthCompare`：深度写入与比较函数。
   - `format`：深度附件格式（depth24plus、depth32float 等）。
   - 模板测试相关配置。

6. **multisample**（可选）：
   - `count`：MSAA 采样数。
   - `mask`、`alphaToCoverageEnabled`。

完整示例：

```javascript
const pipeline = device.createRenderPipeline({
  layout: 'auto',
  vertex: {
    module: shaderModule,
    entryPoint: 'vsMain',
    buffers: [{
      arrayStride: 8 * 4,
      attributes: [
        { shaderLocation: 0, offset: 0, format: 'float32x3' },
        { shaderLocation: 1, offset: 3 * 4, format: 'float32x2' },
        { shaderLocation: 2, offset: 5 * 4, format: 'float32x3' },
      ],
    }],
  },
  fragment: {
    module: shaderModule,
    entryPoint: 'fsMain',
    targets: [{
      format: 'bgra8unorm',
      blend: {
        color: { srcFactor: 'src-alpha', dstFactor: 'one-minus-src-alpha', operation: 'add' },
        alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
      },
      writeMask: GPUColorWrite.ALL,
    }],
  },
  primitive: {
    topology: 'triangle-list',
    cullMode: 'back',
    frontFace: 'ccw',
  },
  depthStencil: {
    format: 'depth24plus',
    depthWriteEnabled: true,
    depthCompare: 'less',
  },
  multisample: { count: 4 },
});
```

**评分维度**：
- 能说明 vertex / fragment / primitive 必填配置（30%）
- 能解释 depthStencil 与颜色混合作用（25%）
- 能说明 layout 与 Bind Group 关系（25%）
- 能写出典型 descriptor 示例（20%）

**常见错误**：
- `fragment.targets` 的 `format` 与 canvas/context 实际格式不一致。
- `depthStencil.format` 与深度附件 Texture 格式不一致。
- 运行时频繁创建 Pipeline，忽略复用。

**延伸追问**：
- 如果要实现透明排序，Pipeline 的哪些状态需要调整？
- `frontFace: 'cw'` 与 `cullMode: 'back'` 组合会剔除哪些三角形？

**相关题目**：
- [FB-50-CO-B-002 WebGPU 渲染管线主要阶段](#FB-50-CO-B-002)
- [FB-50-CD-A-010 用 WebGPU 绘制三角形完整流程](#FB-50-CD-A-010)

**参考资源**：
- [MDN - GPURenderPipeline](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPipeline)
- [WebGPU 规范 - Render Pipeline Descriptor](https://www.w3.org/TR/webgpu/#render-pipeline-creation)

**口头回答版**：
> RenderPipeline 创建时就要定好大部分状态。主要有 layout、vertex 配置顶点布局和着色器入口、fragment 配置片元着色器和颜色附件格式与混合、primitive 里设置 topology、cullMode、frontFace。可选的还有 depthStencil 深度比较和写入、multisample 多重采样。因为管线几乎不可变，运行时切换开销小，所以不要每帧重复创建，要尽量复用。

---

### FB-50-CA-A-013：分析下面 WGSL 代码的输出与潜在问题。

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、WGSL、代码分析、着色器、插值
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：

```wgsl
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs(@location(0) pos: vec2<f32>, @location(1) uv: vec2<f32>) -> VSOut {
  var out: VSOut;
  out.pos = vec4<f32>(pos, 0.0, 1.0);
  out.uv = uv * 2.0;
  return out;
}

@group(0) @binding(0) var tex: texture_2d<f32>;
@group(0) @binding(1) var smp: sampler;

@fragment
fn fs(in: VSOut) -> @location(0) vec4<f32> {
  var color = textureSample(tex, smp, in.uv);
  if (color.r < 0.1) {
    discard;
  }
  return color;
}
```

请分析这段 WGSL 代码的功能，并指出潜在问题或平台差异风险。

**参考答案**：

功能：
- 顶点着色器将 2D 位置扩展到裁剪空间，并将 UV 坐标放大 2 倍。
- 片元着色器采样纹理，如果红色通道小于 0.1 则丢弃该片元，否则输出纹理颜色。

潜在问题：

1. **UV 越界**：
   - `uv * 2.0` 可能使 UV 超出 `[0, 1]` 范围。
   - 如果 Sampler 的 addressModeU/V 是 `clamp-to-edge`，边缘会拉伸；如果是 `repeat`，会平铺。
   - 这通常不是 bug，但需要确认是否为预期效果。

2. **`discard` 与 Early-Z / Early-Fragment-Test**：
   - 使用 `discard` 会禁用部分 GPU 的 Early-Z 优化，可能影响性能。
   - 如果同时启用了深度写入，discard 后不会写入深度。

3. **Texture 与 Sampler 的绑定匹配**：
   - JavaScript 侧 Bind Group Layout 必须声明 `@binding(0)` 为 texture、`@binding(1)` 为 sampler。
   - 若 `textureSample` 的采样类型与 Sampler 的 magFilter/minFilter/mipmapFilter 不匹配，属于运行时错误。

4. **`textureSample` 只能在 Fragment Shader 使用**：
   - 该函数依赖 GPU 的纹理采样单元，不能在 Vertex Shader 或 Compute Shader 中调用。

5. **`discard` 在片元着色器中的分支**：
   - 如果纹理大部分区域红色通道低，会导致大量 discard，降低 Early-Z 效益。

**评分维度**：
- 能正确解释代码功能（30%）
- 能指出 UV 越界与 addressMode 关系（25%）
- 能说明 discard 对 Early-Z 和性能的影响（25%）
- 能指出 textureSample 的使用限制（20%）

**常见错误**：
- 认为 `discard` 只是简单不绘制，忽略对 Early-Z 的影响。
- 在 Compute Shader 中误用 `textureSample`。
- 忽略 `uv * 2.0` 导致的寻址模式差异。

**延伸追问**：
- 如果要用 alpha 测试替代 discard，深度写入应如何配置？
- 如何在 Compute Shader 中读取纹理像素？

**相关题目**：
- [FB-50-CD-B-007 手写 WGSL 顶点/片元着色器](#FB-50-CD-B-007)
- [FB-50-CO-A-012 GPURenderPipeline 配置要点](#FB-50-CO-A-012)

**参考资源**：
- [WGSL 官方规范 - discard](https://www.w3.org/TR/WGSL/#discard-statement)
- [WGSL - textureSample](https://www.w3.org/TR/WGSL/#texturesample)

**口头回答版**：
> 这段 WGSL 画一个带纹理的矩形，顶点里把 UV 放大了两倍，片元里采样纹理，红色通道小于 0.1 就 discard。潜在问题：UV 乘 2 可能越界，看 Sampler 的 addressMode 是 repeat 还是 clamp；discard 会禁用 Early-Z，影响性能；textureSample 只能在 Fragment Shader 用，Compute 里要用 textureLoad。还要注意绑定 layout 要和 WGSL 里的 @group/@binding 对应。

---

### FB-50-CO-A-014：3D 渲染中常用的坐标系和 MVP 变换是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、3D 数学、MVP、坐标系、矩阵
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 3D 渲染中局部空间、世界空间、观察空间、裁剪空间、屏幕空间的含义，以及 MVP 矩阵的作用。

**参考答案**：

3D 渲染中常见的坐标空间变换链：

| 空间 | 含义 | 变换 |
|------|------|------|
| 局部空间（Local / Model Space） | 模型自身坐标系，原点在模型中心 | 无 |
| 世界空间（World Space） | 场景全局坐标系 | Model 矩阵 |
| 观察空间（View / Camera Space） | 以相机为原点的坐标系 | View 矩阵 |
| 裁剪空间（Clip Space） | 透视/正交投影后的齐次坐标 | Projection 矩阵 |
| 屏幕空间（Screen Space） | 最终像素坐标 | 视口变换 |

MVP 变换：
- **Model（M）**：将顶点从局部空间变换到世界空间，包含平移、旋转、缩放。
- **View（V）**：将世界空间变换到观察空间，相机位置与朝向决定。
- **Projection（P）**：将观察空间变换到裁剪空间，分为透视投影（perspective）和正交投影（orthographic）。
- 顶点着色器中通常计算 `clipPosition = projection * view * model * localPosition`。

WebGPU 的 NDC 范围：
- 裁剪空间经透视除法后得到 NDC，WebGPU 的 NDC 范围是 `x ∈ [-1, 1]`、`y ∈ [-1, 1]`、`z ∈ [0, 1]`。
- 注意与 OpenGL 的 `z ∈ [-1, 1]` 区分。

WGSL 示例：

```wgsl
@group(0) @binding(0)
var<uniform> uMVP: mat4x4<f32>;

@vertex
fn vs(@location(0) pos: vec3<f32>) -> @builtin(position) vec4<f32> {
  return uMVP * vec4<f32>(pos, 1.0);
}
```

**评分维度**：
- 能按顺序说明五个坐标空间（30%）
- 能解释 M、V、P 各自作用（35%）
- 能指出 WebGPU 的 NDC z 范围是 [0, 1]（20%）
- 能写出 WGSL 中应用 MVP 的示例（15%）

**常见错误**：
- 矩阵乘法顺序写反（应为 P * V * M * v）。
- 混淆 WebGPU 与 OpenGL 的 NDC z 范围。
- 在局部空间直接做透视除法，忽略裁剪空间的意义。

**延伸追问**：
- 为什么 WebGPU 使用左手或右手坐标系取决于具体矩阵？
- 法线变换为什么要用 Model 矩阵的逆转置？

**相关题目**：
- [FB-50-CD-A-010 用 WebGPU 绘制三角形完整流程](#FB-50-CD-A-010)
- [FB-50-CD-P-018 手写 Compute Shader 实现矩阵乘法](#FB-50-CD-P-018)

**参考资源**：
- [WebGPU Fundamentals - Coordinate Systems](https://webgpufundamentals.org/webgpu/lessons/webgpu-coordinate-systems.html)
- [Learn OpenGL - Coordinate Systems](https://learnopengl.com/Getting-started/Coordinate-Systems)

**口头回答版**：
> 3D 渲染里顶点要经过局部空间、世界空间、观察空间、裁剪空间，最后到屏幕空间。MVP 就是 Model、View、Projection 三个矩阵：Model 把模型放到世界，View 把世界转到相机视角，Projection 做透视或正交投影得到裁剪空间。顶点着色器里通常是 `projection * view * model * position`。要注意 WebGPU 的 NDC z 范围是 0 到 1，和 OpenGL 的 -1 到 1 不一样。

---

### FB-50-PE-A-015：WebGPU 应用有哪些常见性能优化手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、性能优化、Buffer、Texture、管线、命令提交
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举在 WebGPU 应用中常见的性能优化方向，并说明具体做法。

**参考答案**：

WebGPU 性能优化应围绕“减少 CPU 开销、减少 GPU 等待、提高并行度、降低带宽”展开。

常见优化手段：

1. **减少每帧的资源创建**：
   - Pipeline、Buffer、Texture、Bind Group 尽量创建一次并复用。
   - 动态数据使用 `writeBuffer` / `writeTexture` 更新，而非重新创建 Buffer。

2. **合批与实例化**：
   - 相同材质/几何体使用 `drawIndexedInstanced` 批量绘制，减少 Draw Call。
   - 使用 Instanced Buffer 存放每个实例的变换或颜色。

3. **合理使用 Uniform / Storage / Dynamic Offset**：
   - 把多个对象的 Uniform 合并到同一个大 Buffer，通过 dynamic offset 切换。
   - 减少 Bind Group 切换次数。

4. **遮挡剔除与视锥剔除**：
   - 在 CPU 侧做视锥剔除，避免提交不可见物体的 Draw Call。
   - 必要时使用 GPU 遮挡查询（Occlusion Query）。

5. **Mipmap 与纹理压缩**：
   - 为 Texture 生成 Mipmap，使用合适的 min/mag/mipmapFilter。
   - 使用 BC/ETC/ASTC 压缩纹理减少显存与带宽。

6. **减少 GPU ↔ CPU 同步**：
   - 避免频繁 `mapAsync` 回读数据。
   - 使用 Triple Buffering 或 ping-pong Buffer 减少等待。

7. **延迟渲染与 Cluster / Tiled 策略**：
   - 复杂光照场景使用 Deferred Shading 或 Tiled Forward Shading。

8. **Compute Shader 预处理**：
   - 粒子更新、布料模拟、后处理等放到 Compute Shader，释放 VS/FS 压力。

**评分维度**：
- 能说出资源复用与减少创建（25%）
- 能说明实例化与合批（25%）
- 能说明剔除与纹理优化（25%）
- 能说明 CPU/GPU 同步与 Compute 卸载（25%）

**常见错误**：
- 每帧重新创建 Pipeline 或 Bind Group。
- 盲目使用 Storage Buffer 而忽略 Uniform 的缓存友好性。
- 忽视纹理格式与压缩对移动端带宽的影响。

**延伸追问**：
- 如何测量 WebGPU 应用的 CPU 与 GPU 耗时？
- 实例化渲染时，实例数据如何组织最利于缓存？

**相关题目**：
- [FB-50-PE-P-021 粒子系统设计](#FB-50-PE-P-021)
- [FB-50-SC-R-025 大型 3D 场景性能优化](#FB-50-SC-R-025)

**参考资源**：
- [WebGPU 最佳实践 - Performance](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [Toji - WebGPU optimization tips](https://toji.github.io/webgpu-best-practices/)

**口头回答版**：
> WebGPU 优化主要是减少 CPU 开销和 GPU 等待。一是资源复用，Pipeline、Buffer、Bind Group 不要每帧创建；二是用实例化合批减少 Draw Call；三是把多个 Uniform 合并，用 dynamic offset 切换；四是做视锥剔除和遮挡剔除；五是纹理用 Mipmap 和压缩；六是少做 mapAsync 回读，避免 CPU GPU 同步；七是能放到 Compute Shader 的预处理就放过去，比如粒子更新、后处理。

---

### FB-50-CO-A-016：WebGPU 目前的浏览器支持情况如何？如何降级？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、浏览器支持、降级、WebGL、兼容性
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 WebGPU 的浏览器支持现状，并讨论在生产环境中如何为不支持 WebGPU 的用户提供降级方案。

**参考答案**：

支持现状（截至近期）：
- **Chrome / Edge**：已正式支持 WebGPU（Windows、macOS、Linux、Android）。
- **Firefox**：实验性支持，部分功能需开启 flag。
- **Safari**：在 iOS / macOS 上逐步支持，可用 `gpu` 对象检测。
- **移动端**：Android 版 Chrome 支持，iOS 支持逐步完善。
- **Worker**：支持 OffscreenCanvas + WebGPU，可在 Worker 中运行。

检测与降级：

```javascript
async function getGPUDevice() {
  if (!navigator.gpu) {
    console.warn('WebGPU not supported, fallback to WebGL');
    return null;
  }
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    console.warn('No suitable adapter');
    return null;
  }
  return adapter.requestDevice();
}
```

降级策略：
- **功能检测优先**：用 `navigator.gpu` 和 `requestAdapter` 检测，不要依赖 UA。
- **双后端渲染器**：引擎内部同时实现 WebGLRenderer 与 WebGPURenderer，运行时选择。
- **降低效果**：WebGL 路径关闭复杂后处理、Compute 特效、高 MSAA。
- **提示用户**：对完全不支持的浏览器给出友好提示或静态降级页面。
- **Polyfill 有限**：WebGPU 与 WebGL 架构差异大，无法完全 polyfill，只能写两套实现。

**评分维度**：
- 能说明主流浏览器支持情况（30%）
- 能写出功能检测代码（25%）
- 能说明双后端、效果降级等策略（30%）
- 能指出不能简单 polyfill（15%）

**常见错误**：
- 用 User-Agent 判断支持，而不是特性检测。
- 认为 WebGPU 已全平台普及，忽略 iOS 和旧版浏览器。
- 不做降级，导致不支持用户直接白屏。

**延伸追问**：
- 如果项目强制使用 WebGPU，如何优雅地引导用户升级浏览器？
- WebGPU 在 Worker 中的支持与主线程有何差异？

**相关题目**：
- [FB-50-CO-B-001 WebGPU 与 WebGL 核心区别](#FB-50-CO-B-001)
- [FB-50-CP-R-026 WebGPU 项目技术选型](#FB-50-CP-R-026)

**参考资源**：
- [Can I use - WebGPU](https://caniuse.com/webgpu)
- [MDN - WebGPU Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#browser_compatibility)

**口头回答版**：
> WebGPU 在 Chrome、Edge 上已经正式支持，Firefox 是实验性，Safari 也在逐步跟上，移动端 Android Chrome 支持，iOS 还在完善。生产环境要先做特性检测，看 `navigator.gpu` 和 `requestAdapter`。不支持就回退到 WebGL，引擎里最好实现双后端。WebGPU 和 WebGL 差异太大，不能简单 polyfill，只能写两套渲染路径，WebGL 那边可以关一些高级效果。


---

## 深入题（7 道）{#proficient}

### FB-50-CO-P-017：Compute Shader 与渲染管线有什么关系和区别？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Compute Shader、GPGPU、渲染管线、并行计算
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 WebGPU 中 Compute Shader 与 Render Pipeline 的关系与区别。为什么 Compute Shader 更适合做 GPGPU 计算？

**参考答案**：

关系：
- Compute Shader 与 Render Pipeline 共用同一个 `GPUDevice`、Buffer、Texture、Bind Group 等资源。
- 两者通过 `GPUCommandEncoder` 分别编码为 Compute Pass 和 Render Pass，按顺序提交到 Queue。
- Compute Shader 的输出（Storage Buffer / Texture）可以作为 Render Pass 的输入。

区别：

| 维度 | Render Pipeline | Compute Shader |
|------|----------------|----------------|
| 入口 | @vertex / @fragment | @compute |
| 执行单元 | 顶点/片元 | 计算线程（workgroup） |
| 输出 | 颜色/深度附件 | Storage Buffer / Texture |
| 固定功能 | 光栅化、深度测试、混合 | 无，完全可编程 |
| 适用任务 | 3D/2D 渲染 | 通用并行计算、模拟、后处理 |
| 数据访问 | 顶点属性、纹理采样 | 全局线程 ID、共享内存、原子操作 |

为什么 Compute Shader 更适合 GPGPU：
- 不受顶点/片元语义约束，可自由读写任意位置数据。
- 可利用 `workgroup` 内共享内存（`var<workgroup>`）和 `barrier()` 同步。
- 支持 `atomic` 操作，方便计数、累加等并行算法。
- 不需要光栅化开销，也不受屏幕分辨率限制。

典型应用：
- 粒子系统更新、物理模拟、矩阵乘法、前缀和、图像滤波、后处理。

**评分维度**：
- 能说明二者共用 Device 和资源（20%）
- 能从入口、输出、固定功能等维度对比（35%）
- 能解释 Compute Shader 适合做 GPGPU 的原因（30%）
- 能列举典型应用场景（15%）

**常见错误**：
- 认为 Compute Shader 是 Render Pipeline 的一个阶段。
- 在 Compute Shader 中使用 `textureSample` 或 `@builtin(position)`。
- 忽略 workgroup 内共享内存与同步机制。

**延伸追问**：
- Compute Shader 中的 `@workgroup_size` 如何影响性能？
- 同一个 Command Encoder 中 Compute Pass 和 Render Pass 如何协同？

**相关题目**：
- [FB-50-CD-P-018 手写 Compute Shader 实现矩阵乘法](#FB-50-CD-P-018)
- [FB-50-CO-P-019 Workgroup 与线程模型](#FB-50-CO-P-019)

**参考资源**：
- [WebGPU 规范 - Compute Pipeline](https://www.w3.org/TR/webgpu/#compute-pipeline)
- [WGSL - Compute Shaders](https://www.w3.org/TR/WGSL/#compute-shader)

**口头回答版**：
> Compute Shader 和 Render Pipeline 共用 Device 和资源，但彼此独立。Render Pipeline 有顶点、片元着色器，走光栅化、深度测试这些固定功能；Compute Shader 没有固定功能，只有 `@compute` 入口，按 workgroup 线程并行执行，输出到 Storage Buffer 或 Texture。它适合做通用计算，因为可以自由读写、用共享内存、原子操作，不用受渲染管线的限制。典型应用是粒子更新、矩阵乘、图像后处理。

---

### FB-50-CD-P-018：请手写一个 WebGPU Compute Shader 实现矩阵乘法。

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Compute Shader、矩阵乘法、WGSL、Storage Buffer
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请用 WebGPU 实现 C = A × B 的矩阵乘法，包括 JavaScript 侧资源创建、WGSL Compute Shader 代码，以及命令提交流程。

**参考答案**：

假设 A 为 M×K，B 为 K×N，C 为 M×N。使用朴素全局内存算法：每个线程计算 C 的一个元素。

WGSL：

```wgsl
@group(0) @binding(0)
var<storage, read> a: array<f32>;

@group(0) @binding(1)
var<storage, read> b: array<f32>;

@group(0) @binding(2)
var<storage, read_write> c: array<f32>;

struct Params {
  m: u32,
  k: u32,
  n: u32,
};

@group(0) @binding(3)
var<uniform> params: Params;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let row = gid.y;
  let col = gid.x;
  if (row >= params.m || col >= params.n) {
    return;
  }
  var sum: f32 = 0.0;
  for (var i: u32 = 0u; i < params.k; i = i + 1u) {
    let aIndex = row * params.k + i;
    let bIndex = i * params.n + col;
    sum = sum + a[aIndex] * b[bIndex];
  }
  let cIndex = row * params.n + col;
  c[cIndex] = sum;
}
```

JavaScript 侧：

```javascript
async function matmul(A, B, M, K, N) {
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  const aBuffer = device.createBuffer({
    size: A.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  const bBuffer = device.createBuffer({
    size: B.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  const cBuffer = device.createBuffer({
    size: M * N * 4,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
  });
  const paramsBuffer = device.createBuffer({
    size: 3 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(aBuffer, 0, A);
  device.queue.writeBuffer(bBuffer, 0, B);
  device.queue.writeBuffer(paramsBuffer, 0, new Uint32Array([M, K, N]));

  const shaderModule = device.createShaderModule({
    code: /* WGSL code above */
  });

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
    ],
  });

  const pipeline = device.createComputePipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
    compute: { module: shaderModule, entryPoint: 'main' },
  });

  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: aBuffer } },
      { binding: 1, resource: { buffer: bBuffer } },
      { binding: 2, resource: { buffer: cBuffer } },
      { binding: 3, resource: { buffer: paramsBuffer } },
    ],
  });

  const encoder = device.createCommandEncoder();
  const pass = encoder.beginComputePass();
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.dispatchWorkgroups(Math.ceil(N / 16), Math.ceil(M / 16), 1);
  pass.end();

  // 回读结果
  const readBuffer = device.createBuffer({
    size: M * N * 4,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  });
  encoder.copyBufferToBuffer(cBuffer, 0, readBuffer, 0, M * N * 4);
  device.queue.submit([encoder.finish()]);

  await readBuffer.mapAsync(GPUMapMode.READ);
  const result = new Float32Array(readBuffer.getMappedRange());
  readBuffer.unmap();
  return result;
}
```

优化方向：
- 使用 shared memory tiling 减少全局内存访问。
- 调整 workgroup size 以匹配 GPU wave/warp 大小（如 8×8、16×16、32×8）。
- 对 K 维度循环展开或使用向量化加载。

**评分维度**：
- 能正确设计线程到输出元素的映射（25%）
- 能正确声明 storage/uniform 绑定（25%）
- 能写出完整的 JS 资源创建与提交流程（30%）
- 能提到 shared memory 或 workgroup size 优化（20%）

**常见错误**：
- 矩阵索引计算错误（行优先 vs 列优先）。
- `dispatchWorkgroups` 参数顺序与矩阵维度不匹配。
- Storage Buffer 未声明为 `read_write`，导致无法写入。
- 忘记处理边界条件（矩阵维度不是 16 的倍数）。

**延伸追问**：
- 如何用 shared memory 优化这个矩阵乘法？
- 当矩阵非常大时，如何拆分成多次 dispatch？

**相关题目**：
- [FB-50-CO-A-011 Uniform Buffer 与 Storage Buffer 区别](#FB-50-CO-A-011)
- [FB-50-CO-P-019 Workgroup 与线程模型](#FB-50-CO-P-019)

**参考资源**：
- [WebGPU Fundamentals - Compute Shaders](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html)
- [CUDA Matrix Multiplication Optimization](https://developer.nvidia.com/blog/using-shared-memory-cuda-cc/)

**口头回答版**：
> 矩阵乘法的 Compute Shader 里，每个线程算 C 的一个元素，用 `@workgroup_size(16,16,1)`。WGSL 里声明 A、B 为 read-only-storage，C 为 storage 可读写，参数用 uniform。JavaScript 侧创建 buffer、写数据、创建 compute pipeline 和 bind group，然后 `dispatchWorkgroups` 网格大小是 `(N/16, M/16)`。最后把结果复制到 MAP_READ buffer 回读。边界情况要判断 row、m、col、n。进阶优化可以用 shared memory tiling。

---

### FB-50-CO-P-019：Compute Shader 中的 Workgroup 与线程模型是怎样的？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Compute Shader、Workgroup、线程模型、并行
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 WGSL 中 `@workgroup_size`、`@builtin(global_invocation_id)`、`@builtin(local_invocation_id)` 和 `var<workgroup>` 的含义与关系。

**参考答案**：

Compute Shader 的执行模型：

- **线程（Invocation）**：单个执行单元，对应一个 `@compute` 入口函数调用。
- **Workgroup**：一组线程，大小由 `@workgroup_size(x, y, z)` 定义。一个 workgroup 内的线程可以访问共享内存并通过 `workgroupBarrier()` 同步。
- **Dispatch**：调用 `pass.dispatchWorkgroups(gx, gy, gz)` 启动 `gx × gy × gz` 个 workgroup，总线程数为 `gx×gy×gz × wx×wy×wz`。

内置变量：

| 变量 | 含义 |
|------|------|
| `local_invocation_id` | 线程在 workgroup 内的三维坐标 |
| `workgroup_id` | 当前 workgroup 在 dispatch 网格中的三维坐标 |
| `global_invocation_id` | 全局唯一线程 ID，等于 `workgroup_id * workgroup_size + local_invocation_id` |
| `num_workgroups` | dispatch 的 workgroup 数量 |
| `local_invocation_index` | 线程在 workgroup 内的线性索引 |

共享内存：
- 用 `var<workgroup>` 声明，大小受 `maxComputeWorkgroupStorageSize` 限制。
- 同一 workgroup 内线程可读写，速度通常比 global memory 快。
- 使用 `storageBarrier()` / `workgroupBarrier()` 同步，避免读写竞争。

示例：

```wgsl
@group(0) @binding(0)
var<storage, read> input: array<f32>;

@group(0) @binding(1)
var<storage, read_write> output: array<f32>;

var<workgroup> sharedData: array<f32, 256>;

@compute @workgroup_size(256, 1, 1)
fn main(
  @builtin(global_invocation_id) gid: vec3<u32>,
  @builtin(local_invocation_id) lid: vec3<u32>,
) {
  let idx = gid.x;
  let localIdx = lid.x;
  sharedData[localIdx] = input[idx];
  workgroupBarrier();
  // 使用共享内存做归约、前缀和等操作
  output[idx] = sharedData[localIdx] * 2.0;
}
```

**评分维度**：
- 能解释 workgroup 是线程组（25%）
- 能区分 global/local/workgroup ID（30%）
- 能说明 shared memory 的作用与同步（30%）
- 能写出 workgroup 内置变量示例（15%）

**常见错误**：
- 把 `global_invocation_id` 与 `local_invocation_id` 混淆。
- 在 workgroup 外访问 `var<workgroup>` 数据。
- 使用共享内存却不加 barrier，导致数据竞争。
- workgroup size 超过设备 limits（如 maxComputeInvocationsPerWorkgroup）。

**延伸追问**：
- 为什么 workgroup size 通常取 64、128、256？
- 如何利用 `subgroup` 或 `wave` 操作进一步优化？

**相关题目**：
- [FB-50-CD-P-018 手写 Compute Shader 实现矩阵乘法](#FB-50-CD-P-018)
- [FB-50-CO-P-017 Compute Shader 与渲染管线区别](#FB-50-CO-P-017)

**参考资源**：
- [WGSL - Compute Shader Built-in Values](https://www.w3.org/TR/WGSL/#compute-shader-built-in-values)
- [WebGPU Fundamentals - Workgroup](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html)

**口头回答版**：
> Compute Shader 的线程按 workgroup 组织，`@workgroup_size` 定义一个 workgroup 里有几个线程。`dispatchWorkgroups` 是启动多少个 workgroup。每个线程有 local_invocation_id，是它在自己 workgroup 里的坐标；global_invocation_id 是全局坐标，等于 workgroup_id 乘 workgroup_size 加 local_id。同一个 workgroup 里的线程可以用 `var<workgroup>` 共享内存，并通过 `workgroupBarrier` 同步，比读全局内存快很多。

---

### FB-50-CO-P-020：哪些任务适合用 GPU 计算，哪些仍应留在 CPU？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、GPU 计算、CPU、GPGPU、并行计算
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请分析 WebGPU 中 GPU 计算（Compute Shader）与 CPU 计算的适用边界。什么样的任务应该 offload 到 GPU？

**参考答案**：

适合 GPU（Compute Shader）的任务特征：
- **数据并行度高**：同样的操作作用于大量数据，如图像处理、矩阵运算、粒子模拟。
- **计算密集**：算法复杂度高，CPU 会成为瓶颈。
- **数据局部性好**：访问模式规则，可合并内存访问（coalesced access）。
- **可容忍延迟**：GPU 调度有开销，批量处理才有优势。
- **不需要频繁 CPU 同步**：中间结果尽量留在 GPU，减少 map/read-back。

适合 CPU 的任务特征：
- **强顺序依赖/分支复杂**：如复杂业务逻辑、递归、动态图遍历。
- **数据量小**：GPU 调度开销可能超过收益。
- **需要低延迟交互**：如每帧都需要根据用户输入立即改变少量状态。
- **需要复杂数据结构**：如哈希表、树、图的动态操作在 GPU 上实现复杂。
- **串行算法**：如某些排序、字符串处理。

常见权衡：

| 任务 | 推荐位置 | 原因 |
|------|---------|------|
| 粒子位置更新 | GPU | 大量并行 |
| 物理碰撞检测（粗略） | GPU | 空间索引 + 并行 |
| 精确碰撞响应 | CPU | 分支复杂、需要确定性的复杂逻辑 |
| 骨骼动画蒙皮 | GPU（Vertex Shader）或 Compute | 每顶点并行 |
| 寻路、AI 决策 | CPU | 图遍历、分支复杂 |
| 图像模糊、Bloom | GPU | 像素级并行 |

**评分维度**：
- 能说出数据并行、计算密集等 GPU 适用特征（35%）
- 能说出分支复杂、低延迟等 CPU 适用特征（30%）
- 能给出至少 3 个具体任务的选型（25%）
- 能提到 CPU/GPU 同步开销（10%）

**常见错误**：
- 认为所有计算都应放到 GPU。
- 忽略 GPU 调度和小数据量带来的 overhead。
- 频繁回读 GPU 结果，造成性能瓶颈。

**延伸追问**：
- 如何在 WebGPU 中实现 CPU 与 GPU 的流水线并行？
- 当任务既有并行部分又有串行部分时，如何拆分？

**相关题目**：
- [FB-50-CO-P-017 Compute Shader 与渲染管线区别](#FB-50-CO-P-017)
- [FB-50-PE-P-021 粒子系统设计](#FB-50-PE-P-021)

**参考资源**：
- [WebGPU Fundamentals - When to use compute](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html)
- [GPGPU Best Practices](https://developer.nvidia.com/gpugems/gpugems2/part-general-purpose-computation-gpus-primer/chapter-32-tips-optimizing-cuda-applications)

**口头回答版**：
> 适合 GPU 的是数据并行度高、计算密集、访问模式规则、能批量做的任务，比如图像处理、矩阵运算、粒子更新。CPU 更适合分支复杂、数据量小、需要低延迟、或者数据结构很复杂的任务，比如寻路、AI 决策、精确碰撞响应。关键还要看 CPU GPU 同步开销，如果老是要把数据读回来，GPU 优势就被抵消了。

---

### FB-50-PE-P-021：如何用 WebGPU 设计一个高性能粒子系统？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、粒子系统、Compute Shader、GPU 计算、性能优化
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个基于 WebGPU 的粒子系统，支持大量粒子（10万+）的更新与渲染，说明数据流、Compute Shader 设计与渲染策略。

**参考答案**：

系统架构：

1. **数据存储**：
   - 使用两个 `Storage Buffer` 存储粒子状态（位置、速度、生命周期、大小、颜色等）。
   - 采用 ping-pong 双缓冲：当前帧读取 buffer A，写入 buffer B，下一帧交换。

2. **Compute Shader 更新**：
   - 每个线程处理一个粒子。
   - 在 Compute Shader 中计算重力、风力、碰撞、生命周期衰减。
   - 使用 `atomic` 管理粒子发射计数，或预留固定数量粒子由 CPU 决定激活索引。

3. **渲染阶段**：
   - 使用 `drawIndirect` 或 `drawIndexedInstanced`，通过 Storage Buffer 中的粒子数据驱动 billboarding。
   - 顶点着色器读取粒子位置，生成面向相机的四边形（billboard）。

4. **排序与混合**：
   - 透明粒子需要按深度排序，可在 Compute Shader 中实现 bitonic sort 或 radix sort。
   - 不透明粒子可直接按 add/blend 模式渲染。

关键数据结构：

```wgsl
struct Particle {
  position: vec3<f32>,
  pad0: f32,
  velocity: vec3<f32>,
  pad1: f32,
  color: vec4<f32>,
  life: f32,
  size: f32,
  pad2: vec2<f32>,
};

@group(0) @binding(0)
var<storage, read> particlesIn: array<Particle>;

@group(0) @binding(1)
var<storage, read_write> particlesOut: array<Particle>;

@group(0) @binding(2)
var<uniform> params: SimParams;
```

渲染端 WGSL：

```wgsl
@vertex
fn vs(@builtin(instance_index) i: u32, @location(0) quad: vec2<f32>) -> VSOut {
  let p = particles[i];
  let worldPos = billboard(p.position, quad, p.size);
  return project(worldPos);
}
```

优化点：
- 粒子更新完全在 GPU，CPU 只负责发射事件与参数 Uniform。
- 使用 Indirect Draw 减少 CPU 干预。
- 对透明粒子按需排序，不排序时使用 additive blend。
- 合并相同材质的粒子批次，减少 Bind Group 切换。

**评分维度**：
- 能说明使用 Storage Buffer 与 ping-pong 双缓冲（30%）
- 能说明 Compute Shader 更新每个粒子的策略（25%）
- 能说明 billboard 渲染与 instancing（25%）
- 能提到排序、混合与 indirect draw 优化（20%）

**常见错误**：
- 每帧用 CPU 更新所有粒子再上传。
- 粒子数量大时不做视锥剔除或 LOD。
- 透明粒子不做深度排序导致混合错误。
- 忽略粒子生命周期结束后的回收。

**延伸追问**：
- 如何在粒子系统中实现 GPU 遮挡剔除？
- 粒子碰撞检测如何做空间索引？

**相关题目**：
- [FB-50-CO-P-020 GPU 计算与 CPU 适用边界](#FB-50-CO-P-020)
- [FB-50-CO-P-022 空间索引 BVH / Octree / Grid](#FB-50-CO-P-022)

**参考资源**：
- [WebGPU Fundamentals - Particles](https://webgpufundamentals.org/webgpu/lessons/webgpu-points.html)
- [NVIDIA GPU Gems - Particle Systems](https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-23-high-speed-screen-particles)

**口头回答版**：
> 大量粒子系统最好全部放 GPU。用两个 Storage Buffer 做 ping-pong，Compute Shader 每个线程更新一个粒子的位置、速度、生命周期，然后渲染阶段用 instanced billboard，顶点着色器根据粒子位置和大小生成面向相机的四边形。透明粒子要按深度排序，可以在 Compute 里做 bitonic sort。CPU 只负责发事件和更新参数 Uniform。还可以用 indirect draw 减少 CPU 参与。

---

### FB-50-CO-P-022：3D 场景中常用的空间索引结构有哪些？如何在 GPU 中使用？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、空间索引、BVH、Octree、Grid、GPU
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请介绍 BVH、Octree、Uniform Grid 等空间索引结构的特点，并说明它们如何在 WebGPU 的光线追踪、粒子碰撞或剔除中应用。

**参考答案**：

常见空间索引结构：

| 结构 | 构建方式 | 查询方式 | 适用场景 |
|------|---------|---------|---------|
| Uniform Grid | 将空间划分为等大小格子 | O(1) 定位所在格子，遍历邻近格子 | 粒子、稀疏均匀分布 |
| Octree | 递归八叉划分 | 自顶向下遍历 | 静态场景、LOD、视锥剔除 |
| BVH | 按轴包围盒层次划分 | 自顶向下遍历 | 光线追踪、碰撞检测 |
| KD-Tree | 按轴交替划分 | 最近邻/光线遍历 | 光线追踪、最近邻查询 |

在 WebGPU 中的应用：
- **光线追踪（离线/实时）**：
  - 将 BVH 节点数组化，存入 Storage Buffer。
  - Compute Shader 中每个线程发射一条光线，遍历 BVH 求交。
- **粒子碰撞**：
  - 使用 Uniform Grid 或 Spatial Hash，将粒子位置哈希到格子。
  - Compute Shader 中只检测同格或邻格粒子，避免 O(n²)。
- **视锥剔除 / 遮挡剔除**：
  - 用 BVH 或 Octree 组织场景对象，CPU 或 Compute Shader 快速剔除不可见节点。

GPU 数据结构注意事项：
- 树结构需要展平为数组（如左右子节点索引、包围盒 min/max）。
- 避免指针，使用索引引用。
- 注意分支发散对 GPU 并行效率的影响；可分组处理相近的光线或粒子。

示例：Uniform Grid 碰撞检测伪代码：

```wgsl
fn hashCell(pos: vec3<f32>) -> vec3<i32> {
  return vec3<i32>(floor(pos / cellSize));
}

@compute @workgroup_size(256)
fn collide(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  let cell = hashCell(particles[i].position);
  // 遍历 27 邻域格子
  for (var dx = -1; dx <= 1; dx++) {
    for (var dy = -1; dy <= 1; dy++) {
      for (var dz = -1; dz <= 1; dz++) {
        let neighbor = cell + vec3<i32>(dx, dy, dz);
        // 查询格子中的粒子列表并检测碰撞
      }
    }
  }
}
```

**评分维度**：
- 能对比 Uniform Grid、Octree、BVH 特点（35%）
- 能说明在 GPU 中如何展平树结构（25%）
- 能给出光线追踪或粒子碰撞的应用示例（25%）
- 能提到分支发散与性能影响（15%）

**常见错误**：
- 在 GPU 中保留指针或递归结构。
- 对所有粒子做两两比较，忽略空间索引。
- 选择过于复杂的结构（如 BVH）处理均匀分布的简单粒子。

**延伸追问**：
- BVH 在 GPU 上如何动态更新？
- 空间索引结构与 Compute Shader 的共享内存如何结合？

**相关题目**：
- [FB-50-PE-P-021 粒子系统设计](#FB-50-PE-P-021)
- [FB-50-SC-R-025 大型 3D 场景性能优化](#FB-50-SC-R-025)

**参考资源**：
- [PBRT - Bounding Volume Hierarchies](https://pbr-book.org/4ed/Primitives_and_Intersection_Acceleration/Bounding_Volume_Hierarchies)
- [GPU Gems 2 - Spatial Hashing](https://developer.nvidia.com/gpugems/gpugems2/part-iv-image-effects/chapter-32-tips-optimizing-cuda-applications)

**口头回答版**：
> 常用空间索引有 Uniform Grid、Octree、BVH、KD-Tree。Uniform Grid 适合粒子这种均匀分布，查询快；Octree 适合静态场景做视锥剔除和 LOD；BVH 适合光线追踪和碰撞检测。在 GPU 里用这些结构，需要把树展平成数组，用索引代替指针，放到 Storage Buffer 里。Compute Shader 里每个线程遍历索引数组做查询。要注意 GPU 分支发散，尽量让同组线程访问相近节点。

---

### FB-50-CD-P-023：如何用 WebGPU 实现后处理流程？

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、后处理、Render Pass、Texture、Fullscreen Quad
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请描述并实现一个 WebGPU 后处理流程：先渲染场景到 offscreen texture，再用 fullscreen quad 加片元着色器做高斯模糊，最后输出到屏幕。

**参考答案**：

后处理流程包含两个 Render Pass：

1. **场景渲染 Pass**：
   - 创建与 canvas 大小一致的 `GPUTexture` 作为 color attachment（offscreen render target）。
   - 渲染场景到该 texture。

2. **后处理 Pass**：
   - 创建 fullscreen quad（两个三角形覆盖 NDC [-1, 1]）。
   - 片元着色器读取场景 texture，执行高斯模糊。
   - 输出到 `canvas.getCurrentTexture()`。

高斯模糊片元着色器（单 pass 简化版）：

```wgsl
@group(0) @binding(0) var sceneTex: texture_2d<f32>;
@group(0) @binding(1) var samp: sampler;

@fragment
fn fs(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  let offset = 1.0 / vec2<f32>(textureDimensions(sceneTex));
  var color = vec4<f32>(0.0);
  let weights = array<f32, 5>(0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);
  color = color + textureSample(sceneTex, samp, uv) * weights[0];
  for (var i = 1; i < 5; i++) {
    let o = f32(i) * offset;
    color = color + textureSample(sceneTex, samp, uv + vec2<f32>(o.x, 0.0)) * weights[i];
    color = color + textureSample(sceneTex, samp, uv - vec2<f32>(o.x, 0.0)) * weights[i];
  }
  return color;
}
```

生产环境优化：
- 使用 **Ping-Pong Texture** 做 separable 高斯模糊：先水平模糊，再垂直模糊。
- 降采样（downsample）到 1/2 或 1/4 分辨率减少计算。
- 多个后处理效果按顺序链式组合，每个效果读写同一个或交替的纹理。

JavaScript 关键代码：

```javascript
const sceneTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: presentationFormat,
  usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
});

// 场景 Pass
const scenePass = encoder.beginRenderPass({
  colorAttachments: [{
    view: sceneTexture.createView(),
    loadOp: 'clear',
    storeOp: 'store',
    clearValue: { r: 0, g: 0, b: 0, a: 1 },
  }],
});
// ... 绘制场景
scenePass.end();

// 后处理 Pass
const postPass = encoder.beginRenderPass({
  colorAttachments: [{
    view: context.getCurrentTexture().createView(),
    loadOp: 'clear',
    storeOp: 'store',
    clearValue: { r: 0, g: 0, b: 0, a: 1 },
  }],
});
postPass.setPipeline(postPipeline);
postPass.setBindGroup(0, postBindGroup);
postPass.setVertexBuffer(0, fullscreenQuadBuffer);
postPass.draw(6);
postPass.end();
```

**评分维度**：
- 能说明 offscreen texture 与两个 pass 的结构（30%）
- 能写出 fullscreen quad 与片元着色器示例（30%）
- 能提到 ping-pong、separable、downsample 优化（25%）
- 能说明 texture usage 需同时包含 RENDER_ATTACHMENT 和 TEXTURE_BINDING（15%）

**常见错误**：
- 场景 texture 的 usage 未包含 TEXTURE_BINDING，导致后处理采样失败。
- 后处理 shader 中 UV 方向或纹理尺寸计算错误。
- 单 pass 做大方核高斯模糊，性能差。
- 未处理 canvas resize 时 texture 尺寸更新。

**延伸追问**：
- 如何实现 Bloom、Tone Mapping、FXAA 等多种后效果的链式组合？
- 后处理中如何复用深度附件？

**相关题目**：
- [FB-50-CO-B-005 Texture 与 Sampler 区别](#FB-50-CO-B-005)
- [FB-50-SC-R-025 大型 3D 场景性能优化](#FB-50-SC-R-025)

**参考资源**：
- [WebGPU Fundamentals - Render to Texture](https://webgpufundamentals.org/webgpu/lessons/webgpu-render-to-texture.html)
- [Learn OpenGL - Framebuffers](https://learnopengl.com/Advanced-OpenGL/Framebuffers)

**口头回答版**：
> 后处理一般分两个 pass：第一个 pass 把场景画到 offscreen texture，第二个 pass 画一个全屏四边形，片元着色器里读取这个 texture 做效果。高斯模糊可以单 pass 做，但生产环境用 separable blur 加 ping-pong texture，先水平后垂直，还可以降采样减少计算。要注意场景 texture 的 usage 必须同时有 RENDER_ATTACHMENT 和 TEXTURE_BINDING，后处理 pass 输出到 canvas 的 current texture。


---

## 架构题（32 道）{#architect}

### FB-50-SD-R-024：如何设计一个基于 WebGPU 的轻量级渲染引擎？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、渲染引擎、系统设计、架构、资源管理
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个基于 WebGPU 的轻量级渲染引擎的核心架构，包括资源管理、渲染抽象、材质系统、命令提交与生命周期管理。

**参考答案**：

核心分层：

```
Application Layer
    |
Renderer / Scene Graph
    |
Render Graph / Pass Scheduler
    |
Material System ── Shader Library (WGSL)
    |
Resource Manager ── Buffer / Texture / Sampler / Pipeline Pool
    |
WebGPU Backend ── Device / Queue / CommandEncoder
```

关键模块：

1. **Device Manager**：
   - 封装 `requestAdapter` / `requestDevice`、上下文配置、丢失处理。
   - 提供 capabilities 查询与降级路径。

2. **Resource Manager / Pool**：
   - Buffer、Texture、Sampler 按 usage/format/size 缓存与复用。
   - Pipeline 按 shader + vertex layout + blend/depth 状态哈希缓存。
   - Bind Group 按 layout + 资源集合缓存。

3. **Shader Library**：
   - 管理 WGSL 源码或预编译二进制。
   - 支持宏定义、变体（variant）与热重载。
   - 提供通用 include 机制（如 PBR、Lighting、Shadow）。

4. **Material System**：
   - 材质 = Shader + 参数 + 纹理引用。
   - 参数通过 Uniform Buffer 或 Push Constant（WebGPU 无 push constant，可用 dynamic offset 或 small storage）更新。
   - 支持透明队列、深度队列、阴影队列排序。

5. **Render Graph / Pass Scheduler**：
   - 以 Pass 为节点、Resource 为边，自动处理 barrier 与 layout transition。
   - 每个 Pass 声明读写的 color/depth texture，引擎负责分配 transient resource。

6. **Scene Graph**：
   - 节点树管理 transform、相机、灯光。
   - 每帧收集可见 Renderable，按材质/Shader 排序后提交。

7. **Command Submission**：
   - 每帧一个 CommandEncoder，按 Pass 顺序编码。
   - 支持多线程编码（未来 Worker + shared device）。

数据流示例：

```
Scene Update → Cull/Sort → RenderGraph Build → Resource Bind → Encode Passes → Submit
```

**评分维度**：
- 能划分清晰分层（25%）
- 能说明资源管理与缓存策略（25%）
- 能设计材质与 Shader 抽象（20%）
- 能说明 Render Graph / Pass 调度作用（20%）
- 能提到生命周期与丢失处理（10%）

**常见错误**：
- 直接暴露 WebGPU 对象给业务层，缺乏抽象。
- 每帧重新创建 Pipeline 和 Bind Group。
- 没有统一的资源生命周期管理，导致内存泄漏。
- Render Graph 设计过度复杂，超出轻量引擎需求。

**延伸追问**：
- 如何在不暴露 WebGPU API 的情况下支持自定义后处理？
- 多线程 Worker 编码命令时，资源如何同步？

**相关题目**：
- [FB-50-SD-R-028 与 Three.js / Babylon 集成架构](#FB-50-SD-R-028)
- [FB-50-CP-R-026 WebGPU 项目技术选型](#FB-50-CP-R-026)

**参考资源**：
- [Filament Engine Architecture](https://google.github.io/filament/Filament.html)
- [Render Graphs in Modern Engines](https://www.gdcvault.com/play/1024612/FrameGraph-Extensible-Rendering-Architecture-in)

**口头回答版**：
> 我会把引擎分成几层：最下面是 WebGPU backend，封装 device、queue、command encoder；上面是 resource manager，缓存 buffer、texture、pipeline、bind group；再上是 shader library 和 material system，负责 WGSL 变体和材质参数；然后是 render graph 或 pass scheduler，管理渲染顺序和资源依赖；最上面是 scene graph 和 renderer。关键要缓存 pipeline 和 bind group，不要每帧创建；render graph 自动处理 pass 之间的 resource barrier。还要处理 device lost 和浏览器降级。

---

### FB-50-SC-R-025：如何优化一个包含百万级对象的大型 3D 场景？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、3D、大型场景、性能优化、剔除、LOD
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
假设有一个 WebGPU 应用需要渲染百万级静态物体（如城市、森林），请设计一套完整的性能优化方案，从 CPU 到 GPU 逐层说明。

**参考答案**：

优化分 CPU 层、提交层、GPU 层三个维度。

**CPU 层**：
1. **层次化场景管理**：
   - 使用 BVH、Quadtree 或 Spatial Hash 组织场景。
   - 快速剔除不可见物体。
2. **LOD（Level of Detail）**：
   - 根据距离选择不同精度的模型或 impostor（billboard）。
3. **实例化（Instancing）**：
   - 同类物体合并为一次 instanced draw call。
   - 使用 GPU-driven rendering：CPU 只提交可见性 buffer，GPU 决定画哪些实例。

**提交层**：
4. **多 Pass 排序**：
   - 不透明物体从前到后（利于 Early-Z），透明物体从后到前。
5. **Bind Group / Pipeline 排序**：
   - 按 Pipeline、Bind Group、Vertex Buffer 排序，减少状态切换。
6. **Indirect Draw / Multi-Draw**：
   - 使用 `drawIndirect` / `drawIndexedIndirect` 把 Draw Call 参数放到 GPU buffer。
   - 配合 Compute Shader 做可见性裁剪，实现 GPU-driven pipeline。

**GPU 层**：
7. **遮挡查询（Occlusion Query）**：
   - 先用低成本 proxy 几何体查询可见性，再渲染真实物体。
8. **Hi-Z Culling**：
   - 生成 hierarchical depth buffer，在 Compute Shader 中快速剔除小物体。
9. **纹理与材质**：
   - Texture Array / Atlas 减少 Bind Group 切换。
   - 压缩纹理、Mipmap、遮挡剔除后的低分辨率 fallback。
10. **内存与带宽**：
    - 合并顶点缓冲，使用索引缓冲减少重复顶点。
    - 延迟渲染或 Cluster-Based Forward 处理大量光源。

架构数据流：

```
Scene Data → Spatial Index → CPU Frustum Cull → LOD Select
    → GPU Hi-Z / Occlusion Cull → Indirect Draw Buffer
    → Render Pass Sorted by State → Submit
```

**评分维度**：
- 能提出 CPU 层空间索引与 LOD（25%）
- 能说明实例化与 GPU-driven rendering（25%）
- 能说明排序与 Indirect Draw 优化（20%）
- 能说明 GPU 层遮挡剔除与 Hi-Z（20%）
- 能考虑纹理、内存与带宽（10%）

**常见错误**：
- 只关注 Draw Call 数量，忽略遮挡剔除。
- 所有物体用最高 LOD，没有距离分级。
- 透明物体与不透明物体混排，导致 overdraw。
- 忽略 CPU 端空间索引构建开销。

**延伸追问**：
- 如何实现 GPU-driven 的可见性裁剪？
- 城市级别场景中，流式加载与卸载如何设计？

**相关题目**：
- [FB-50-PE-A-015 WebGPU 常见性能优化手段](#FB-50-PE-A-015)
- [FB-50-CO-P-022 空间索引 BVH / Octree / Grid](#FB-50-CO-P-022)

**参考资源**：
- [GPU-Driven Rendering Pipelines](https://advances.realtimerendering.com/s2015/aaltonenhaar_siggraph2015_combined_final_footer_220dpi.pdf)
- [Unreal Engine 5 Nanite Overview](https://docs.unrealengine.com/5.0/en-US/nanite-virtualized-geometry-in-unreal-engine/)

**口头回答版**：
> 百万级物体要从 CPU、提交、GPU 三层优化。CPU 层用 BVH 或四叉树做空间索引，快速视锥剔除，按距离选 LOD，同类型物体实例化。提交层按材质和 pipeline 排序，用 instanced draw 和 indirect draw 减少 Draw Call。GPU 层用遮挡查询、Hi-Z 剔除，小物体先画 proxy 查可见性。纹理用 atlas 或 array、压缩、Mipmap。透明物体单独排序从后到前画。最终目标是把大部分裁剪和排序放到 GPU，CPU 只负责粗粒度管理。

---

### FB-50-CP-R-026：在新建一个 3D 项目时，如何选择 WebGPU、WebGL、Three.js、Babylon.js 或自研引擎？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、WebGL、Three.js、Babylon.js、技术选型
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请从项目需求、团队能力、性能目标、浏览器兼容、维护成本等维度，给出 WebGPU、WebGL、Three.js、Babylon.js 与自研引擎的选型建议。

**参考答案**：

选型矩阵：

| 方案 | 适用场景 | 优势 | 劣势 |
|------|---------|------|------|
| Three.js + WebGL | 快速原型、兼容性要求高、中小 3D | 生态丰富、文档多、兼容性好 | 性能上限受框架与 WebGL 限制 |
| Three.js + WebGPU | 现代浏览器、想利用 Compute Shader | 保留 Three.js 生态，底层升级 | 支持度仍在完善，部分功能不稳定 |
| Babylon.js | 游戏、复杂交互、工具链完善 | 功能全面、编辑器/调试工具强 | 学习曲线较陡 |
| 裸 WebGPU | 自研引擎、极致性能、Compute 需求 | 完全控制、性能最高 | 开发成本高、兼容性差 |
| 裸 WebGL | 兼容性第一、老旧设备 | 支持最广 | 现代特性缺失、性能低 |
| 自研引擎（WebGPU） | 大型产品、长期投入 | 可定制、可沉淀资产 | 团队成本高、周期长 |

选型决策流程：

1. **业务复杂度**：
   - 简单 3D 展示 → Three.js / Babylon.js。
   - 重度性能敏感（数字孪生、CAD、游戏）→ 自研或 Three.js WebGPU backend。

2. **浏览器兼容性**：
   - 必须支持旧浏览器/移动端 WebGL → WebGL backend。
   - 可控环境（企业内网、Electron）→ WebGPU。

3. **团队能力**：
   - 前端团队图形经验少 → Three.js。
   - 有图形学/引擎团队 → 自研 WebGPU。

4. **性能目标**：
   - 百万级物体、Compute 模拟、复杂后处理 → WebGPU。
   - 常规 PBR 场景、少量交互 → WebGL 足够。

5. **维护成本**：
   - 使用成熟框架可降低长期维护成本。
   - 自研引擎需要持续投入渲染、工具链、文档。

推荐组合：
- 大多数业务：Three.js + WebGPU（支持时）/ WebGL（降级）。
- 游戏或工具型产品：Babylon.js。
- 长期重度产品：自研 WebGPU 引擎 + Three.js 兼容层。

**评分维度**：
- 能从多维度对比方案（30%）
- 能给出清晰的决策流程（25%）
- 能结合业务场景给出推荐（25%）
- 能提到风险与维护成本（20%）

**常见错误**：
- 不加分析直接选择最新技术（WebGPU）。
- 忽视团队学习与维护成本。
- 认为 Three.js 性能一定不足，忽略优化空间。

**延伸追问**：
- 如果项目三年后才会上线，选型会有什么不同？
- 自研引擎如何平衡灵活性与开发成本？

**相关题目**：
- [FB-50-CO-B-008 Three.js / Babylon.js 与 WebGPU 关系](#FB-50-CO-B-008)
- [FB-50-CO-A-016 浏览器支持与降级策略](#FB-50-CO-A-016)

**参考资源**：
- [Three.js WebGPU Renderer](https://threejs.org/docs/?q=webgpu#api/en/renderers/webgpu/WebGPURenderer)
- [Babylon.js Feature Comparison](https://doc.babylonjs.com/setup/support/webGPU#feature-support)

**口头回答版**：
> 选型要看业务复杂度、兼容性、团队能力和性能目标。快速做业务、团队图形经验少，用 Three.js，底层根据浏览器自动切 WebGPU 或 WebGL。要做游戏或复杂工具链，Babylon.js 更全面。如果对性能要求极高、需要 Compute Shader、百万级物体，就裸写 WebGPU 或自研引擎。必须兼容旧浏览器就用 WebGL。我一般推荐 Three.js 双后端，重度产品再考虑自研。

---

### FB-50-PE-R-027：如何对 WebGPU 应用进行 GPU 性能剖析与瓶颈定位？

**题型**：性能优化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、性能剖析、GPU、Timestamp Query、瓶颈分析
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请说明如何定位 WebGPU 应用的性能瓶颈，包括 CPU 侧、GPU 侧、带宽侧和命令提交侧的常用方法与工具。

**参考答案**：

性能剖析应分层进行：

1. **CPU 侧**：
   - 使用 Chrome DevTools Performance 面板，关注 JavaScript 执行、CommandEncoder 编码时间。
   - 检查是否每帧创建大量资源、是否频繁 map/unmap。
   - 优化：资源池化、减少每帧分配、Worker 编码。

2. **GPU 执行侧**：
   - 使用 WebGPU Timestamp Query（`GPUQuerySet` 类型 `'timestamp'`）测量 Pass 耗时。
   - 需要 `timestamp-query` feature，并注意精度与开销。

   ```javascript
   const querySet = device.createQuerySet({ type: 'timestamp', count: 2 });
   const pass = encoder.beginRenderPass({
     colorAttachments: [...],
     timestampWrites: {
       querySet,
       beginningOfPassWriteIndex: 0,
       endOfPassWriteIndex: 1,
     },
   });
   pass.end();
   ```

3. **带宽侧**：
   - 使用 Chrome `chrome://gpu` 和 DevTools Memory 面板观察显存占用。
   - 关注大纹理、未压缩纹理、频繁 CPU↔GPU 数据传输。
   - 优化：纹理压缩、Mipmap、减少回读、合并 Buffer 上传。

4. **命令提交侧**：
   - 减少 Command Buffer 数量，合并 Render Pass。
   - 使用 `renderBundle`（WebGPU Render Bundle）预录静态场景命令，每帧直接执行。
   - 分析 Draw Call 数量、状态切换次数。

5. **GPU 利用率与瓶颈类型**：
   - **Vertex Bound**：顶点数过多、顶点着色器复杂。
   - **Fragment Bound**：overdraw、片元着色器复杂、大纹理采样。
   - **Bandwidth Bound**：大量纹理/Buffer 读写。
   - **Compute Bound**：Compute Shader 占用过高。

常用工具：
- Chrome DevTools Performance / GPU panels。
- Chrome `chrome://gpu` 查看 renderer、limits。
- RenderDoc（如果应用可导出到 native 或进行底层分析）。
- 自定义 timestamp query 框架。

**评分维度**：
- 能分层说明 CPU/GPU/带宽/提交瓶颈（30%）
- 能使用 Timestamp Query 测量 Pass 耗时（25%）
- 能识别 Vertex/Fragment/Bandwidth/Compute Bound（25%）
- 能提到 Render Bundle 等命令优化手段（20%）

**常见错误**：
- 只凭 FPS 低就优化，不做分层定位。
- 在发布环境开启大量 timestamp query，带来额外开销。
- 忽视 CPU 端编码耗时，只盯着 GPU。

**延伸追问**：
- 如何通过调整 workgroup size 优化 Compute Shader 瓶颈？
- Render Bundle 适合什么场景？不适合什么场景？

**相关题目**：
- [FB-50-PE-A-015 WebGPU 常见性能优化手段](#FB-50-PE-A-015)
- [FB-50-SC-R-025 大型 3D 场景性能优化](#FB-50-SC-R-025)

**参考资源**：
- [WebGPU 规范 - Timestamp Query](https://www.w3.org/TR/webgpu/#timestamp-query)
- [Chrome DevTools - GPU](https://developer.chrome.com/docs/devtools/rendering/performance/)

**口头回答版**：
> 性能分析要分层。CPU 侧用 DevTools 看 JS 执行和编码时间，避免每帧创建资源；GPU 侧用 Timestamp Query 测每个 Pass 耗时，需要 `timestamp-query` feature；带宽侧看显存和纹理大小，用压缩和 Mipmap；命令提交侧减少 Command Buffer、用 Render Bundle 预录静态命令。还要判断瓶颈类型：顶点重、片元重、带宽重还是计算重，再针对性优化。

---

### FB-50-SD-R-028：如何设计 Three.js 与自研 WebGPU 引擎的集成架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Three.js、集成架构、渲染引擎、迁移
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
假设团队已有基于 Three.js 的大型项目，但部分模块需要自研 WebGPU 引擎以获得更高性能。请设计一种平滑迁移与集成架构。

**参考答案**：

目标：在不推翻现有 Three.js 场景、资产、工作流的前提下，逐步引入自研 WebGPU 渲染能力。

架构设计：

1. **抽象渲染后端（Render Backend）**：
   - 定义统一接口：`IRenderer` 包含 `render(scene, camera)`、`resize()`、`dispose()`。
   - 实现 `ThreeRenderer` 与 `CustomWebGPURenderer` 两个后端。
   - 业务层只依赖接口，不直接依赖具体实现。

2. **场景桥接（Scene Bridge）**：
   - 自研引擎消费 Three.js 的 Scene、Camera、Mesh、Geometry、Material 数据。
   - 每帧将 Three.js 对象转换为自研引擎的 Renderable 列表。
   - 对不支持的高级材质，回退到 Three.js 渲染。

3. **混合渲染（Hybrid Rendering）**：
   - 主画布由自研引擎渲染高性能部分（如大地形、粒子、后处理）。
   - Three.js 渲染 UI、复杂交互组件、兼容插件。
   - 通过共享 depth buffer 或合成 texture 实现深度一致。

4. **资源复用**：
   - 共享 Geometry Buffer、Texture、GLTF 解析结果。
   - 使用 Three.js 的加载器解析模型，再上传到 WebGPU Buffer/Texture。

5. **渐进式迁移**：
   - 按模块迁移：先迁移性能瓶颈模块（大规模实例、Compute 粒子）。
   - 保持 Three.js 作为 fallback 与编辑器工作流。
   - 建立 A/B 渲染对比与回归测试。

数据流：

```
Three.js Scene
    ↓ Scene Bridge 提取数据
Custom Render Graph
    ↓ Resource Manager / Pipeline Cache
WebGPU Command Encoder
    ↓ Submit
Canvas
```

**评分维度**：
- 能设计抽象渲染接口（25%）
- 能说明场景桥接与数据转换（25%）
- 能提出混合渲染与资源共享方案（25%）
- 能说明渐进式迁移与 fallback 策略（15%）
- 能考虑深度一致与合成问题（10%）

**常见错误**：
- 直接替换所有 Three.js 代码，导致项目风险过大。
- 自研引擎与 Three.js 同时写同一个 canvas，缺乏同步。
- 忽略材质、灯光、后处理的不兼容。

**延伸追问**：
- 如何保证混合渲染时的深度一致性？
- Three.js 的场景图更新如何在自研引擎中复用？

**相关题目**：
- [FB-50-CO-B-008 Three.js / Babylon.js 与 WebGPU 关系](#FB-50-CO-B-008)
- [FB-50-SD-R-024 设计轻量级 WebGPU 渲染引擎](#FB-50-SD-R-024)

**参考资源**：
- [Three.js WebGPURenderer 源码](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/renderers/webgpu)
- [glTF in WebGPU](https://github.com/KhronosGroup/glTF/tree/main/specification/2.0)

**口头回答版**：
> 我会先定义一个统一的渲染接口，Three.js 和自研 WebGPU 引擎都实现这个接口。业务层只调接口。然后做场景桥接，把 Three.js 的 mesh、camera、geometry 数据转成自研引擎的 renderable。高风险模块先用混合渲染：自研引擎画高性能部分，Three.js 画 UI 和复杂组件，通过共享 depth 或合成保证一致。资源用 Three.js 的 loader 解析，再上传到 WebGPU。迁移是渐进的，Three.js 作为 fallback 保留。

---

### FB-50-CP-R-029：你怎么看 WebGPU 未来的发展趋势和主要挑战？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、趋势、挑战、WebGL、3D、AI
**出现频率**：中频
**预计回答时长**：10-15 分钟

**题目描述**：
请从技术演进、生态成熟度、应用场景等角度，谈谈 WebGPU 未来的发展趋势和当前面临的主要挑战。

**参考答案**：

发展趋势：

1. **逐步替代 WebGL**：
   - 随着浏览器支持完善，WebGPU 将成为复杂 3D、可视化、游戏的首选。
   - 高层库（Three.js、Babylon.js、PlayCanvas）全面迁移到 WebGPU backend。

2. **GPGPU 与 AI 推理**：
   - WebGPU 的 Compute Shader 使其成为浏览器端运行 AI 模型（如 Transformer、Diffusion）的重要后端。
   - ONNX Runtime Web、TensorFlow.js 等已开始支持 WebGPU。

3. **Worker 与多线程**：
   - WebGPU 天然适合 Worker + OffscreenCanvas，未来会出现更多多线程渲染与计算框架。

4. **WebGPU 与 WebAssembly 结合**：
   - 复杂场景管理、物理模拟、空间索引在 WASM 中执行，GPU 负责并行渲染与计算。

5. **标准化与扩展**：
   - 新扩展如 ray tracing、mesh shaders、subgroup operations 可能在后续规范中引入。

主要挑战：

1. **浏览器兼容性**：
   - iOS Safari、Firefox 支持仍在推进，企业环境旧浏览器多。

2. **调试与工具链**：
   - 相比 WebGL，WebGPU 调试工具仍不够成熟，RenderDoc 等 native 工具集成复杂。

3. **学习曲线陡峭**：
   - 需要理解现代 GPU API、管线、同步、内存布局，前端团队转型成本高。

4. **性能一致性**：
   - 不同 GPU 厂商、驱动、操作系统的 limits 和行为有差异，需要大量适配。

5. **安全与隐私**：
   - GPU 计算能力可能被用于指纹追踪或恶意挖矿，浏览器需严格限制。

**评分维度**：
- 能说出 3 个以上发展趋势（30%）
- 能分析 3 个以上挑战（30%）
- 能结合 AI/GPGPU 等热点场景（20%）
- 能给出团队应对策略（20%）

**常见错误**：
- 只谈优势，忽略兼容性挑战。
- 认为 WebGPU 会立即完全替代 WebGL。
- 忽略安全隐私问题。

**延伸追问**：
- 如果团队现在启动一个长期项目，应该如何为 WebGPU 演进做准备？
- WebGPU 对前端工程师的技能要求有哪些变化？

**相关题目**：
- [FB-50-CO-A-016 浏览器支持与降级策略](#FB-50-CO-A-016)
- [FB-50-CP-R-026 WebGPU 项目技术选型](#FB-50-CP-R-026)

**参考资源**：
- [W3C WebGPU Roadmap](https://github.com/gpuweb/gpuweb/blob/main/meetings/roadmap.md)
- [WebGPU and AI](https://developer.chrome.com/docs/web-platform/webgpu/)

**口头回答版**：
> WebGPU 未来会慢慢替代 WebGL，Three.js 这些库都在迁移 backend。Compute Shader 让它在浏览器端跑 AI 推理也很有潜力，加上 Worker 多线程、和 WASM 配合，能做很重的事。挑战主要是兼容性还没全平台普及，调试工具不如 WebGL 成熟，学习曲线陡，不同 GPU 行为有差异，还要考虑安全和指纹追踪。团队可以现在就用抽象层封装，底层支持 WebGL/WebGPU 双后端，为未来演进留空间。

---

### FB-50-SC-R-030：如何为一个跨平台 3D 可视化产品选择 WebGPU 与 Native 图形方案？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：50 WebGPU / 图形学
**标签**：WebGPU、Native、3D、跨平台、技术选型、可视化
**出现频率**：低频
**预计回答时长**：10-15 分钟

**题目描述**：
假设要开发一个跨平台 3D 可视化产品，目标平台包括 Web、桌面（Windows/macOS/Linux）、移动端（iOS/Android）。请讨论 WebGPU、WebGL、Native（OpenGL/Vulkan/Metal/D3D12）以及跨平台框架（Flutter、React Native、Electron、Tauri）的选型思路。

**参考答案**：

选型需权衡**交付形态、性能、团队能力、维护成本**。

方案对比：

| 方案 | 交付形态 | 性能 | 跨平台 | 适用场景 |
|------|---------|------|--------|---------|
| WebGPU + Web | 浏览器 | 高 | 最好 | 无需安装、SaaS、数字孪生 |
| WebGL + Web | 浏览器 | 中 | 最好 | 兼容旧浏览器 |
| Electron/Tauri + WebGPU | 桌面应用 | 高 | 较好 | 桌面工具、需要本地能力 |
| React Native / Flutter + Native GL | 移动端 App | 高 | 中等 | 需要原生移动端体验 |
| Native（Unity/Unreal/Godot） | 桌面/移动/主机 | 最高 | 中等 | 游戏、重度可视化 |
| Native C++（bgfx/Dawn/wgpu） | 桌面/移动 | 最高 | 中等 | 自研引擎、跨平台产品 |

决策思路：

1. **如果核心目标是 Web 交付**：
   - 首选 WebGPU + WebGL fallback。
   - 复杂 UI 用 React/Vue，3D 用 Three.js/Babylon.js 或自研引擎。

2. **如果需要桌面安装包**：
   - Electron/Tauri 包装 WebGPU 应用，复用 Web 代码。
   - 若性能不足，可用 Tauri + Rust + wgpu 做混合模块。

3. **如果需要移动端原生体验**：
   - 若已有 Web 技术栈，可用 Capacitor/Cordova 包装，但性能受限。
   - 重度 3D 建议 Flutter + native 插件（如_filament_）或 React Native + native GL 模块。

4. **如果目标是游戏或重度模拟**：
   - Unity/Unreal/Godot 仍是最高效选择，WebGPU 可作为 Web 导出后端。

5. **长期演进**：
   - 用 wgpu（Rust）或 Dawn（C++）可在 Native 与 Web 间共享核心渲染代码。

**评分维度**：
- 能按平台拆分选型（30%）
- 能对比 Web、桌面、移动端不同方案（25%）
- 能说明性能与维护成本的权衡（25%）
- 能提出长期演进策略（20%）

**常见错误**：
- 一刀切选择 WebGPU，不考虑移动端兼容性。
- 为了技术栈统一而牺牲产品体验。
- 忽视桌面端 Native 方案在性能与功耗上的优势。

**延伸追问**：
- 如果用 Electron 包装 WebGPU，需要注意哪些安全与性能问题？
- 在 Web 与 Native 之间共享渲染代码，有哪些可行技术？

**相关题目**：
- [FB-50-CP-R-026 WebGPU 项目技术选型](#FB-50-CP-R-026)
- [FB-50-SC-R-025 大型 3D 场景性能优化](#FB-50-SC-R-025)

**参考资源**：
- [wgpu - Rust WebGPU implementation](https://wgpu.rs/)
- [Dawn - WebGPU Native](https://dawn.googlesource.com/dawn)

**口头回答版**：
> 跨平台 3D 产品要先看交付形态。纯 Web 就用 WebGPU 加 WebGL 降级；桌面安装包可以用 Electron 或 Tauri 包 WebGPU；移动端原生体验好的话，Flutter 或 React Native 加 native 图形模块，重度 3D 直接用 Unity。如果团队想 Web 和 Native 共享核心渲染代码，可以用 wgpu 或 Dawn。关键是不要为了统一技术栈牺牲体验，按平台特点选型。





### FB-50-CO-A-017：WebGPU 是什么？与 WebGL 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、WebGL、图形、GPU、区别
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 的基本概念，以及它与 WebGL 的主要区别。

**参考答案**：
WebGPU（Wasm）是下一代 Web 图形和计算 API，旨在提供现代 GPU 的低级访问能力。

与 WebGL 区别：

| 特性 | WebGL | WebGPU |
|------|-------|--------|
| API 设计 | 基于 OpenGL ES | 基于 Vulkan/Metal/D3D12 |
| 多线程 | 受限于主线程 | 支持 Worker 和异步操作 |
| 计算能力 | 较弱，需借助 fragment shader | 原生支持 Compute Shader |
| 资源管理 | 隐式，较简单 | 显式，更灵活 |
| 性能 | 较好 | 更接近原生 GPU 性能 |
| 错误处理 | 全局状态机，难调试 | 显式对象生命周期，易调试 |
| 现代特性 | 受限 | 支持 bind groups、render bundles 等 |

WebGPU 优势：
- 更好的性能和可预测性。
- 支持通用 GPU 计算（GPGPU）。
- 更符合现代 GPU API 设计。

浏览器支持：
- Chrome、Edge、Firefox 等逐步支持。
- 需要通过 `navigator.gpu` 检测可用性。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 是现代 Web GPU API，基于 Vulkan/Metal/D3D12。比 WebGL 支持多线程、原生 Compute Shader、显式资源管理、性能更高、更易调试。浏览器通过 navigator.gpu 检测。

---

### FB-50-CO-A-018：WebGPU 的核心对象有哪些？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、对象、GPUDevice、GPURenderPipeline
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中的核心对象及其作用。

**参考答案**：
WebGPU 核心对象：

1. **GPU**
   - `navigator.gpu`，入口对象。
   - 用于请求适配器。

2. **GPUAdapter**
   - 代表一个物理 GPU 适配器。
   - 用于创建逻辑设备。

3. **GPUDevice**
   - 代表逻辑设备，是主要工作对象。
   - 创建资源、pipeline、buffer、texture 等。

4. **GPUQueue**
   - 提交命令缓冲区。
   - 执行 GPU 命令。

5. **GPUCommandEncoder**
   - 编码 GPU 命令。
   - 创建 render pass 和 compute pass。

6. **GPURenderPassEncoder**
   - 编码渲染命令（draw、set pipeline 等）。

7. **GPUComputePassEncoder**
   - 编码计算命令（dispatchWorkgroups 等）。

8. **GPURenderPipeline / GPUComputePipeline**
   - 渲染/计算管线，描述 shader 和状态配置。

9. **GPUBuffer / GPUTexture**
   - GPU 内存资源（缓冲区和纹理）。

10. **GPUBindGroup**
    - 绑定资源（buffer、texture、sampler）到 shader。

11. **GPUSampler / GPUShaderModule**
    - 采样器和着色器模块。

关系：
GPU -> Adapter -> Device -> Queue/Encoder -> Pass -> Draw/Dispatch。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 核心对象有 GPU、Adapter、Device、Queue、CommandEncoder、RenderPassEncoder、ComputePassEncoder、Pipeline、Buffer、Texture、BindGroup、Sampler、ShaderModule。Device 是主要工作对象。

---

### FB-50-CO-A-019：WebGPU 的渲染管线（Render Pipeline）包含哪些阶段？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、渲染管线、Vertex、Fragment、Pipeline
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 渲染管线的主要阶段。

**参考答案**：
WebGPU 渲染管线主要阶段：

1. **Vertex Shader**
   - 处理顶点数据。
   - 输出裁剪空间位置。

2. **Primitive Assembly**
   - 根据拓扑结构（point/line/triangle）组装图元。

3. **Rasterization**
   - 光栅化，将图元转换为片段（fragment）。

4. **Fragment Shader**
   - 计算每个片段的颜色。
   - 可采样纹理、计算光照。

5. **Depth/Stencil Test**
   - 深度测试和模板测试。

6. **Color Blending**
   - 片段颜色与目标纹理混合。

配置对象：
- `vertex`：顶点着色器、缓冲区布局。
- `primitive`：图元拓扑、剔除模式。
- `depthStencil`：深度/模板配置。
- `fragment`：片段着色器、颜色目标、混合模式。
- `multisample`：多重采样。
- `layout`：bind group 布局。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 渲染管线包括顶点着色、图元装配、光栅化、片段着色、深度模板测试、颜色混合。通过 createRenderPipeline 配置各阶段。

---

### FB-50-CO-A-020：WebGPU 中的 Buffer 和 Texture 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、Buffer、Texture、资源
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中 Buffer 和 Texture 的区别及使用场景。

**参考答案**：
Buffer 与 Texture 区别：

| 特性 | GPUBuffer | GPUTexture |
|------|-----------|------------|
| 用途 | 通用数据存储 | 图像/纹理数据 |
| 访问 | 线性内存，可读写 | 采样、渲染目标 |
| 维度 | 一维字节数组 | 1D/2D/3D |
| 格式 | 无特定格式 | 有像素格式（rgba8unorm 等） |
| 常见用途 | 顶点、索引、uniform、storage | 图片、颜色附件、深度附件 |

使用场景：
- Buffer：顶点数据、索引数据、uniform 常量、compute shader 的 storage buffer。
- Texture：贴图、渲染目标、深度图、数据纹理。

转换：
- 可通过 copyBufferToTexture / copyTextureToBuffer 互转。
- Texture 数据通常需要特定对齐和格式。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Buffer 是通用线性数据存储，用于顶点、索引、uniform、storage。Texture 是图像纹理数据，用于贴图、渲染目标、深度图。两者可互相拷贝。

---

### FB-50-CO-A-021：WebGPU 的着色器语言是什么？与 GLSL 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、WGSL、GLSL、着色器
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 使用的着色器语言 WGSL，以及它与 GLSL 的区别。

**参考答案**：
WebGPU 着色器语言：

- **WGSL（WebGPU Shading Language）**
- 是 WebGPU 官方指定的着色器语言。
- 设计目标：安全、可移植、易编译到各平台底层着色器（SPIR-V、DXIL、MSL）。

与 GLSL 区别：

| 特性 | GLSL | WGSL |
|------|------|------|
| 语法 | C 风格 | Rust/TypeScript 风格 |
| 入口点 | 通过名字或 layout 指定 | 通过 `@vertex`、`@fragment`、`@compute` 显式标记 |
| 变量修饰 | layout(location=0) | @location(0)、@binding(0) |
| 类型系统 | 较宽松 | 更严格，显式类型转换 |
| 内置变量 | gl_Position | @builtin(position) |
| 跨平台 | 需转译 | 原生支持 WebGPU |

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 用 WGSL 着色器语言，语法像 Rust/TS，入口点用 @vertex/@fragment/@compute 标记，类型更严格。与 GLSL 在语法、入口点、变量修饰上有区别。

---

### FB-50-CO-B-009：WebGPU 中如何实现一个基本的三角形渲染？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、三角形、渲染、入门
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明使用 WebGPU 渲染一个彩色三角形的核心步骤。

**参考答案**：
WebGPU 渲染三角形步骤：

1. **请求适配器和设备**
2. **配置 Canvas**
3. **创建 Shader Module**
4. **创建顶点缓冲区**
5. **创建 Render Pipeline**
6. **编码渲染命令**
7. **提交命令**

关键点：
- 顶点坐标范围 [-1, 1]。
- render pass 必须正确配置 colorAttachments。
- 所有 GPU 操作都是异步提交。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 渲染三角形：请求 adapter/device，配置 canvas，创建 shader module 和 vertex buffer，创建 render pipeline，编码 render pass 设置 pipeline 和 buffer 并 draw，提交命令。

---

### FB-50-CO-B-010：WebGPU 的 BindGroup 是什么？有什么作用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、BindGroup、资源绑定、着色器
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中 BindGroup 的概念和作用。

**参考答案**：
BindGroup：

- 是一组 GPU 资源的集合。
- 用于将 buffer、texture、sampler 等资源绑定到着色器。
- 让着色器可以访问 uniform、采样器等数据。

组成：
- BindGroupLayout：描述资源布局和绑定槽位。
- BindGroup：具体资源的绑定实例。

作用：
- 显式管理资源绑定，提高可预测性。
- 支持动态切换不同的 BindGroup。

着色器中使用 `@group(0) @binding(0)` 访问。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> BindGroup 是 GPU 资源集合，绑定 buffer/texture/sampler 到着色器。包含 BindGroupLayout 描述布局和 BindGroup 具体实例。着色器用 @group 和 @binding 访问。

---

### FB-50-CO-B-011：WebGPU 如何实现通用计算（GPGPU）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、GPGPU、Compute Shader、计算
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中使用 Compute Shader 进行通用计算的基本流程。

**参考答案**：
WebGPU GPGPU 流程：

1. **编写 Compute Shader**
2. **创建 Compute Pipeline**
3. **创建 Storage Buffer**
4. **创建 BindGroup**
5. **编码计算命令**
6. **读取结果**

应用场景：
- 矩阵运算、图像处理、粒子模拟、机器学习推理。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU GPGPU 写 compute shader，创建 compute pipeline，准备 storage buffer，绑定资源，dispatch workgroups，提交后读取结果。适合矩阵、图像、粒子、ML 推理。

---

### FB-50-CO-P-023：WebGPU 的 Render Bundle 是什么？有什么优化作用？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、Render Bundle、优化、性能
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中 Render Bundle 的概念及其性能优化作用。

**参考答案**：
Render Bundle：

- 是一组预录制的渲染命令。
- 可在多个帧中重复执行，减少 CPU 开销。

作用：

1. **减少 CPU 命令编码开销**
   - 静态场景的命令只编码一次，多次复用。

2. **减少 JS 与 GPU 进程通信**
   - 录制好的命令直接提交，减少每帧数据传输。

3. **适合静态几何体**
   - 如背景、UI、静态场景物体。

限制：
- 录制时不能依赖动态状态。
- 适合变化少的渲染内容。
- 变化频繁的内容仍需每帧编码。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Render Bundle 是预录制的渲染命令，可复用减少 CPU 编码和进程通信开销，适合静态几何体。变化频繁的内容不适合。

---

### FB-50-CO-P-024：WebGPU 中如何处理多采样抗锯齿（MSAA）？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、MSAA、抗锯齿、多重采样
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中实现 MSAA 的方法。

**参考答案**：
WebGPU MSAA 实现：

1. **创建多重采样纹理**
2. **配置 Render Pipeline**
3. **Render Pass 配置 resolveTarget**

关键点：
- `sampleCount` 通常取 4。
- `resolveTarget` 指定解析后的目标纹理。
- Pipeline 的 `multisample.count` 要与纹理一致。

注意事项：
- MSAA 只处理几何边缘锯齿，不处理纹理或 shader 锯齿。
- 会增加显存和性能开销。
- 移动端慎用。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU MSAA 需要创建 sampleCount 4 的纹理，pipeline 配置 multisample.count，render pass 中把 msaaTexture 作为 view，context 纹理作为 resolveTarget。

---

### FB-50-CO-P-025：WebGPU 的 Occlusion Query 和 Timestamp Query 有什么作用？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、Occlusion Query、Timestamp Query、查询
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中 Occlusion Query 和 Timestamp Query 的作用。

**参考答案**：
查询功能：

1. **Occlusion Query（遮挡查询）**
   - 查询某组绘制调用有多少片段通过了深度测试。
   - 用于判断物体是否可见。
   - 常用于 LOD、遮挡剔除优化。

2. **Timestamp Query（时间戳查询）**
   - 测量 GPU 命令执行时间。
   - 用于性能分析。
   - 需要 `timestamp-query` 特性支持。

注意：
- 查询结果是异步的，通常延迟一帧获取。
- 时间戳查询精度受 GPU 限制。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Occlusion Query 查询片段通过深度测试数量，用于遮挡剔除。Timestamp Query 测量 GPU 执行时间用于性能分析。通过 GPUQuerySet 创建，结果异步获取。

---

### FB-50-CO-P-026：WebGPU 中如何实现阴影映射（Shadow Mapping）？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、阴影、Shadow Mapping、深度图
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中实现基础 Shadow Mapping 的思路。

**参考答案**：
WebGPU Shadow Mapping 思路：

1. **生成深度图**
   - 从光源视角渲染场景。
   - 只写入深度，不输出颜色。
   - 使用深度纹理（depth32float）作为 attachment。

2. **配置深度 Pipeline**
   - 顶点着色器输出光源视角裁剪空间位置。
   - 无 fragment shader 或只输出深度。

3. **主渲染 Pass**
   - 正常渲染场景。
   - 顶点着色器计算世界坐标和光源视角坐标。
   - 片段着色器采样深度图，比较当前片元深度与阴影图深度。

4. **Bias 和 PCF**
   - 添加 shadow bias 减少 shadow acne。
   - 使用 Percentage-Closer Filtering 软化阴影边缘。

5. **优化**
   - 使用 cascade shadow map 提高质量。
   - 只更新变化的光源或物体。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Shadow Mapping 先从光源视角渲染深度图，主渲染时比较片元在光源空间的深度与深度图，用 sampler_comparison 采样。要加 bias 和 PCF，可用 cascade 优化。

---

### FB-50-PE-A-016：WebGPU 中如何减少 Draw Call 数量？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、Draw Call、批处理、Instancing
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中减少 Draw Call 的常用技术。

**参考答案**：
减少 Draw Call 技术：

1. **合并网格（Mesh Batching）**
2. **Instancing**
3. **Texture Atlas**
4. **Bindless 资源**
5. **合并 Render Pass**
6. **LOD**
7. **遮挡剔除**
8. **Render Bundle**

注意：
- 减少 draw call 要平衡 CPU 和 GPU 开销。
- 过度合并可能导致 culling 效率下降。


**补充说明**：

在实际落地 WebGPU 中如何减少 Draw Call 数量 时，建议结合 WebGPU、Draw Call、批处理 的真实场景做验证。重点关注可观测性埋点、异常降级路径和性能基线回归；同时通过灰度发布、指标看板和复盘机制持续迭代，确保方案从“能跑”演进为“可维护、可扩展”。
**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> 减少 Draw Call 用 mesh batching、instancing、texture atlas、bindless、合并 render pass、LOD、遮挡剔除、render bundle。要平衡 CPU GPU。

---

### FB-50-CP-R-030：WebGPU 与 Three.js、Babylon.js 等引擎的关系是什么？

**题型**：综合开放题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、Three.js、Babylon.js、渲染引擎
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 与现有 Web 3D 引擎的关系，以及引擎如何适配 WebGPU。

**参考答案**：
关系：

- WebGPU 是底层图形 API。
- Three.js、Babylon.js 是高层 3D 引擎，构建在底层 API 之上。
- 引擎内部会封装 WebGL 和 WebGPU 两种渲染后端。

适配方式：
- 引擎定义统一的材质、几何、纹理接口。
- 内部根据环境选择 WebGLRenderer 或 WebGPURenderer。
- 用户提供材质系统，自动生成 WGSL 或 GLSL。

选择建议：
- 大多数应用继续使用 Three.js/Babylon.js 高层 API。
- 需要极致控制或 GPGPU 时直接使用 WebGPU。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 是底层 API，Three.js/Babylon.js 是高层引擎，会封装 WebGL 和 WebGPU 后端。用户一般用引擎 API，需要极致控制或 GPGPU 时直接用 WebGPU。

---

### FB-50-CP-R-031：设计一个基于 WebGPU 的浏览器端粒子系统。

**题型**：综合开放题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、粒子系统、Compute Shader、GPGPU
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个高性能的浏览器端粒子系统，使用 WebGPU 实现。

**参考答案**：
WebGPU 粒子系统设计：

1. **数据存储**
   - 使用 storage buffer 存储粒子属性：位置、速度、生命周期。
   - 双缓冲 ping-pong 结构，避免读写冲突。

2. **计算更新（Compute Shader）**
   - 每帧 dispatch workgroups 更新粒子。
   - 计算重力、速度、碰撞、生命周期衰减。

3. **渲染（Render Pipeline）**
   - 顶点着色器从 buffer 读取粒子位置。
   - 扩展为 billboard 四边形。
   - 片段着色器采样粒子纹理。

4. **排序**
   - 透明粒子需要按深度排序。
   - 可在 GPU 中使用 bitonic sort 或回读 CPU 排序。

5. **发射器与交互**
   - 支持点、球、盒等多种发射形状。
   - 鼠标/触摸影响粒子力场。

6. **性能优化**
   - 使用 instancing 或 compute 生成顶点。
   - 控制粒子数量，使用 LOD。
   - GPU frustum culling。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> 粒子系统用 storage buffer 存属性，compute shader 更新，双缓冲避免冲突，render pipeline 绘制 billboard，透明粒子要排序，支持发射器和交互，用 instancing 和 culling 优化。

---

### FB-50-CP-R-032：WebGPU 在 AI/机器学习推理中的应用有哪些？

**题型**：综合开放题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、AI、机器学习、推理、GPGPU
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 如何用于浏览器端 AI/机器学习推理。

**参考答案**：
WebGPU 在 AI/ML 推理中的应用：

1. **模型推理加速**
   - 用 Compute Shader 实现矩阵乘法、卷积、激活函数。

2. **现有框架支持**
   - TensorFlow.js WebGPU 后端。
   - ONNX Runtime Web with WebGPU。
   - Transformers.js 等模型库。

3. **Transformer 模型**
   - 浏览器中运行 BERT、GPT、CLIP 等模型。

4. **图像处理**
   - 图像分割、目标检测、风格迁移。

5. **实时应用**
   - 摄像头实时姿态识别、手势识别。

6. **隐私优势**
   - 数据不离开浏览器，保护隐私。

挑战：
- 浏览器内存限制。
- 模型量化、剪枝以适配浏览器。
- 首次加载模型大。
- 不同 GPU 性能差异大。

优化方向：
- 使用 4-bit/8-bit 量化。
- 算子融合。
- 分块计算减少内存占用。
- 缓存编译后的 shader/pipeline。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 可用于浏览器端 AI 推理，TensorFlow.js、ONNX Runtime、Transformers.js 都支持 WebGPU 后端。适合做实时图像、隐私保护推理。挑战是内存和模型大小，需量化、算子融合、分块。

---

### FB-50-CP-R-033：WebGPU 的安全性设计有哪些特点？

**题型**：综合开放题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、安全、GPU、验证
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 在安全性方面的设计特点。

**参考答案**：
WebGPU 安全设计：

1. **显式资源管理**
   - 资源生命周期明确，减少悬空引用和内存损坏。

2. **类型安全**
   - WGSL 类型系统严格，防止未定义行为。

3. **边界检查**
   - Buffer/Texture 访问有边界保护。

4. **验证层**
   - 浏览器在提交前验证命令和状态。
   - 无效命令会被拒绝，不会导致 GPU 崩溃。

5. **沙箱隔离**
   - GPU 进程隔离，防止恶意 shader 影响系统。

6. **无隐式全局状态**
   - 相比 WebGL，WebGPU 没有全局上下文状态机。

7. **内存初始化要求**
   - 新分配的 buffer/texture 必须清除或明确初始化。
   - 防止信息泄露。

8. **安全上下文**
   - WebGPU 只在安全上下文（HTTPS/localhost）可用。

9. **限制循环和递归**
   - WGSL 不允许无界循环和递归，防止 GPU 挂起。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 安全特点包括显式资源管理、类型安全、边界检查、验证层、沙箱隔离、无全局状态、内存初始化、安全上下文、限制无界循环。

---

### FB-50-PE-A-017：WebGPU 应用如何调试性能问题？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、调试、性能、Profiler
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 应用中性能调试的方法和工具。

**参考答案**：
WebGPU 性能调试：

1. **Chrome DevTools**
   - Performance 面板捕获 GPU 活动。

2. **Timestamp Query**
   - 测量 GPU 命令执行时间。

3. **RenderDoc**
   - 捕获帧，查看 draw call、shader、资源状态。

4. **Spector.js**
   - WebGL/WebGPU 调试工具。

5. **内置验证**
   - 开启 `device.popErrorScope()` 捕获错误。

6. **常见瓶颈**
   - 过多 draw call。
   - 频繁的 buffer/texture 上传。
   - 复杂的 fragment shader。
   - 不合理的 render pass 拆分。

7. **优化方向**
   - 合并 draw call，使用 instancing。
   - 减少 CPU-GPU 数据传输。
   - 简化 shader，使用 LOD。
   - 使用 render bundle 复用命令。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 调试用 Chrome DevTools、Timestamp Query、RenderDoc、Spector.js、popErrorScope。关注 draw call、资源上传、shader 复杂度，优化合并 draw call、减少传输、简化 shader、用 render bundle。

---

### FB-50-PE-A-018：WebGPU 中如何高效管理 Uniform Buffer？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、Uniform Buffer、性能、资源管理
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 WebGPU 中 Uniform Buffer 的高效管理策略。

**参考答案**：
Uniform Buffer 管理策略：

1. **合并 Uniform 数据**
2. **对齐要求**
   - 遵循 WGSL 对齐规则（vec3/vec4 16 字节对齐）。
3. **Dynamic Offset**
   - 一个 buffer 存多个对象的 uniform，通过 offset 切换。
4. **Buffer 池**
5. **只更新变化的数据**
6. **使用 Storage Buffer 替代**
7. **Batch Draw**

注意：
- Uniform buffer 有最小对齐要求（通常是 256 字节）。
- 动态 offset 必须是 minUniformBufferOffsetAlignment 的倍数。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Uniform Buffer 管理要合并数据、对齐、用 dynamic offset 一个 buffer 存多个对象、buffer 池、只更新变化数据、大数据用 storage buffer、批量 draw。注意对齐和 offset 倍数。

---

### FB-50-SC-R-031：设计一个基于 WebGPU 的浏览器端 3D 数据可视化引擎。

**题型**：场景设计题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、3D、数据可视化、引擎
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请设计一个浏览器端 3D 数据可视化引擎，使用 WebGPU 渲染大量数据点。

**参考答案**：
WebGPU 3D 数据可视化引擎架构：

1. **数据层**
   - 加载和解析大规模数据集。
   - 数据压缩和分块。

2. **计算层（Compute Shader）**
   - 数据聚合、过滤、变换。
   - 大规模点的位置计算。

3. **渲染层**
   - 点云、散点图、体渲染、热力图。
   - 使用 instancing 绘制大量点。
   - LOD 和 frustum culling。

4. **交互层**
   - 相机控制、拾取、刷选过滤。

5. **UI 层**
   - 图例、控制面板、时间轴。

6. **性能优化**
   - Storage buffer 存储数据。
   - Compute shader 做数据预处理。
   - 使用 level-of-detail 减少远距离点数量。
   - Occlusion culling 和 early-z。

7. **可扩展性**
   - 插件化渲染器。
   - 支持自定义着色器和可视化类型。

8. **调试工具**
   - 统计点数量、draw call、帧率。
   - Timestamp query 分析性能。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> 引擎分数据层、计算层用 compute shader 处理、渲染层用 instancing 和 LOD、交互层做相机和 picking、UI 层、性能优化用 storage buffer 和 culling、可扩展插件、调试工具。

---

### FB-50-SC-R-032：WebGPU 的未来发展趋势是什么？

**题型**：场景设计题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、未来、趋势、Web 图形
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请谈谈 WebGPU 未来的发展方向和可能带来的变化。

**参考答案**：
WebGPU 未来发展趋势：

1. **浏览器普及**
   - 所有主流浏览器全面支持 WebGPU。

2. **AI 推理主流化**
   - 浏览器端 ML 推理越来越依赖 WebGPU。

3. **游戏和 3D 应用**
   - 高品质 Web 游戏、元宇宙、数字孪生。

4. **计算任务扩展**
   - 科学计算、仿真、音视频处理在浏览器运行。

5. **工具链成熟**
   - 更多 WGSL 工具、调试器、性能分析工具。

6. **引擎生态**
   - Three.js、Babylon.js、PlayCanvas 等全面支持。

7. **标准化**
   - W3C 标准不断完善。
   - 与 WebNN、WebAssembly 协同。

8. **移动端优化**
   - 针对移动 GPU 的功耗和性能优化。

9. **新的图形技术**
   - 光线追踪、网格着色器、VRS 等高级特性可能逐步引入。

总结：
- WebGPU 将大幅提升 Web 平台的图形和计算能力。
- 前端开发者需要掌握 GPU 编程基础。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 未来会全面普及，成为 Web 图形计算标准，推动浏览器 AI、游戏、3D、科学计算发展，工具链和引擎生态成熟，与 WebNN/WebAssembly 协同，移动端优化，引入更多高级图形特性。

---

### FB-50-CO-A-022：WebGPU 中如何管理纹理内存和避免泄漏？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGPU、纹理、内存管理、泄漏
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在 WebGPU 应用中如何有效管理纹理内存。

**参考答案**：
WebGPU 纹理内存管理：

1. **显式销毁**
   - 纹理使用完毕后调用 `texture.destroy()` 释放 GPU 内存。
   - 不要依赖 GC，GPU 内存不会立即释放。

2. **引用计数**
   - 对共享纹理使用引用计数，确保无引用时才销毁。

3. **纹理池**
   - 对动态渲染目标（如 shadow map、post-processing）使用对象池复用。
   - 避免每帧创建和销毁纹理。

4. **尺寸压缩**
   - 根据用途选择合适的纹理格式和 mipmaps。
   - 使用压缩纹理格式（BC、ETC、ASTC）减少显存占用。

5. **生命周期管理**
   - 将纹理生命周期与场景/对象绑定。
   - 场景切换时统一清理不再使用的纹理。

6. **监控**
   - 使用 `navigator.gpu.requestAdapterInfo` 和自定义统计跟踪显存使用。
   - 设置预算告警，防止移动端 OOM。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGPU 纹理要显式销毁，用引用计数和纹理池复用，选择合适格式和压缩，绑定生命周期，场景切换统一清理，还要监控显存预算。

---

### FB-50-CO-P-027：什么是 PBR 渲染？前端如何实现简化版 PBR？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：WebGPU/Graphics
**标签**：PBR、渲染、WebGPU、材质
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 PBR（基于物理的渲染）原理，并说明前端实现思路。

**参考答案**：
PBR 原理：
- 基于物理的渲染模拟光与材质的真实交互。
- 核心方程：反射率方程（Reflectance Equation）。
- 主要输入：反照率（Albedo）、金属度（Metallic）、粗糙度（Roughness）、法线（Normal）、AO。

微表面模型：
- 金属/非金属工作流。
- 菲涅尔效应（Fresnel）：边缘反射更强。
- 法线分布函数（NDF）：描述表面微平面朝向。
- 几何遮挡函数：模拟微表面间的阴影和遮挡。

前端简化实现：
1. **Cook-Torrance BRDF**
   - DFG 三项：D（法线分布）、F（菲涅尔）、G（几何）。
   - 常用 GGX 分布、Schlick Fresnel、Smith 几何函数。

2. **光照模型**
   - 直接光：方向光/点光源 + 阴影。
   - 间接光：IBL（Image-Based Lighting）用环境贴图预计算漫反射和镜面反射。

3. **WebGPU 实现**
   - 用 WGSL 编写 PBR shader。
   - 预计算 BRDF LUT 和 irradiance map。
   - 使用 uniform buffer 传递材质参数。

4. **优化**
   - 移动端可降低采样数、简化 IBL。
   - 对非金属使用更简单的 Lambert 漫反射。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> PBR 模拟真实光与材质交互，核心输入是反照率、金属度、粗糙度、法线、AO。前端可用 Cook-Torrance BRDF，直接光加 IBL 间接光，用 WGSL 实现，移动端可简化。

---

### FB-50-CP-A-001：如何处理 3D 场景中的大量相同对象（Instancing）？

**题型**：综合开放题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：Instancing、3D、WebGPU、性能
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 3D 渲染中 Instancing 技术的原理和用法。

**参考答案**：
Instancing 原理：
- 使用同一份几何数据渲染大量相同对象。
- 通过 per-instance 数据（位置、旋转、缩放、颜色）区分每个实例。
- 只需一次 draw call，极大减少 CPU 开销。

WebGPU 实现：
1. **创建实例缓冲区**
   - 存储每个实例的变换矩阵和自定义属性。
   - 使用 `GPUBufferUsage.VERTEX`。

2. **顶点着色器**
   - 除了模型顶点，再绑定 instance 顶点属性。
   - 用 instance 数据计算 MVP 矩阵。

3. **绘制调用**
   - `passEncoder.draw(vertexCount, instanceCount)`。
   - 第二个参数指定实例数量。

4. **LOD 与 Culling**
   - 远距离实例可用更低 LOD。
   - 视锥剔除和遮挡剔除减少实际绘制实例数。

5. **GPU 驱动实例化**
   - WebGPU 原生支持 instancing，无需扩展。

适用场景：
- 草地、树木、粒子、建筑重复元素、大量敌人/道具。

注意：
- 实例数据更新要尽量减少 CPU-GPU 传输。
- 动态实例可使用 compute shader 批量更新。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Instancing 用同一份几何数据渲染大量相同对象，通过 per-instance 数据区分。WebGPU 里创建实例缓冲区，顶点着色器绑定 instance 属性，draw 时传 instanceCount。适合草地、树木、粒子等。

---

### FB-50-CO-A-023：WebGL 与 WebGPU 在 shader 编写上有什么主要区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：WebGPU/Graphics
**标签**：WebGL、WebGPU、Shader、GLSL、WGSL
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请比较 WebGL 的 GLSL 和 WebGPU 的 WGSL 在 shader 编写上的差异。

**参考答案**：
主要区别：

| 特性 | WebGL/GLSL | WebGPU/WGSL |
|------|-----------|-------------|
| 语言 | GLSL ES | WGSL |
| 语法 | C-like | Rust-like |
| 入口点 | main() | @vertex/@fragment/@compute 函数 |
| 变量修饰 | attribute/varying/uniform | @location、@binding、@group |
| 坐标系 | Y 轴向上（NDC） | 同 WebGL，但纹理坐标原点左上/左下需留意 |
| 纹理采样 | texture2D/sampler | textureSample(texture, sampler, uv) |
| 矩阵 | 列主序 | 列主序 |
| 计算着色器 | 不支持 | 支持 |
| 错误处理 | 编译信息较简略 | 更详细的编译错误 |

WGSL 示例：
```wgsl
@vertex
fn vsMain(@location(0) pos: vec3<f32>) -> @builtin(position) vec4<f32> {
  return vec4<f32>(pos, 1.0);
}

@fragment
fn fsMain() -> @location(0) vec4<f32> {
  return vec4<f32>(1.0, 0.0, 0.0, 1.0);
}
```

迁移注意：
- 需要将 GLSL 的 attribute/varying/uniform 映射到 WGSL 的 location/binding。
- Mipmap 生成和纹理格式需要显式指定。
- 渲染管线的创建更显式。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> WebGL 用 GLSL，WebGPU 用 WGSL。WGSL 语法像 Rust，入口点用 @vertex/@fragment，变量用 @location/@binding，支持计算着色器，纹理采样函数也不同。迁移时要重新映射变量修饰。

---

