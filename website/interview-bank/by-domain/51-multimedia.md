# 多媒体（Multimedia）面试题

> 本题库共收录 **31** 道面试题（基础 8 / 进阶 8 / 深入 8 / 架构 7）。
> 本文件收录前端多媒体相关面试题，目标题量 30 道。
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

### FB-51-CO-B-001：视频编码和封装有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：51 Multimedia
**标签**：视频编码、封装格式、音视频基础、MP4、H.264
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释视频编码（Codec）和封装（Container）的区别，并各举两个常见格式。

**参考答案**：

视频编码和封装是多媒体处理中的两个不同层次。

- **编码（Codec）**：负责把原始音视频数据压缩成更小的码流。它决定视频的画质、码率和兼容性。
  - 常见视频编码：H.264 / AVC、H.265 / HEVC、AV1、VP9。
  - 常见音频编码：AAC、MP3、Opus。

- **封装（Container）**：负责把编码后的音视频轨道、字幕、元数据等打包成一个文件。它决定文件结构和播放时的解复用方式。
  - 常见封装格式：MP4、MKV、WebM、MOV、FLV、TS。

以 MP4 文件为例：

```text
MP4 文件（容器）
├── 视频轨道（H.264 编码）
├── 音频轨道（AAC 编码）
├── 字幕轨道（WebVTT / mov_text）
└── 元数据（时长、分辨率、旋转角度等）
```

关系类比：

| 维度 | 编码 | 封装 |
|------|------|------|
| 作用 | 压缩数据 | 组织数据 |
| 类比 | 压缩算法（如 zip） | 文件夹 + 目录 |
| 关注点 | 压缩率、画质、解码性能 | 轨道管理、兼容性、元数据 |

最佳实践：
- Web 场景优先使用 H.264 + AAC 封装为 MP4，兼容性最好。
- 直播场景常用 H.264 + AAC 封装为 TS 分片，配合 HLS 播放。

**评分维度**：
- 能区分编码和封装的作用（40%）
- 能各举出至少 2 个常见格式（30%）
- 能说明容器内可以包含多个轨道（30%）

**常见错误**：
- 把 MP4 当成视频编码格式。
- 认为 H.264 是封装格式。
- 忽略音频编码和字幕轨道也属于容器内容。

**延伸追问**：
- 为什么 HLS 直播常用 TS 而不是 MP4 作为分片？
- WebM 和 MP4 在浏览器中的兼容性有什么差异？

**相关题目**：
- [FB-51-CO-A-009 HLS 的 m3u8 文件结构](#FB-51-CO-A-009)
- [FB-51-CP-P-024 MSE 在流媒体播放器中的作用](#FB-51-CP-P-024)

**参考资源**：
- [MDN - Web video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Web_video_codecs_guide)
- [MDN - Video file formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs)

**口头回答版**：
> 编码和封装是两回事。编码负责把音视频原始数据压缩，比如 H.264、H.265、AAC、Opus 这些都是编码格式。封装则是把压缩后的音视频轨道、字幕、元数据打包成一个文件，比如 MP4、WebM、MKV、TS。MP4 不是编码格式，它是一个容器，里面可以放 H.264 视频和 AAC 音频。

---

### FB-51-CO-B-002：HLS 和 DASH 流媒体协议的基本原理是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：51 Multimedia
**标签**：HLS、DASH、流媒体、自适应码率、M3U8
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 HLS 和 DASH 两种流媒体协议的基本原理，并说明它们各自的特点。

**参考答案**：

HLS（HTTP Live Streaming）和 DASH（Dynamic Adaptive Streaming over HTTP）都是基于 HTTP 的自适应码率流媒体协议。

**HLS**：
- 由 Apple 提出，最初用于 iOS 生态。
- 服务器把视频切分成多个小 TS 分片，生成一个索引文件 `.m3u8`。
- 播放器下载 m3u8 后，根据带宽动态选择不同码率的分片播放。
- 天然兼容 Safari、iOS，延迟通常在 10-30 秒。

**DASH**：
- 由 MPEG 制定的国际标准，也叫 MPEG-DASH。
- 使用 `.mpd`（Media Presentation Description）作为索引文件。
- 分片格式更灵活，常用 `.m4s`（fragmented MP4）。
- 各浏览器支持较好，但 Safari 对 DASH 支持不如 HLS 原生。

对比：

| 维度 | HLS | DASH |
|------|-----|------|
| 索引文件 | .m3u8 | .mpd |
| 分片格式 | TS / fMP4 | fMP4 为主 |
| 发起方 | Apple | MPEG |
| Safari 兼容性 | 原生支持 | 需 polyfill / 第三方库 |
| 低延迟扩展 | LL-HLS | LL-DASH |
| 标准开放性 | 相对封闭 | 开放标准 |

最佳实践：
- 如果目标用户主要是 iOS / Safari，优先使用 HLS。
- 如果需要跨平台统一方案，可用 DASH 或双协议兼容。

**评分维度**：
- 能说明 HLS 基于 m3u8 + TS 分片（35%）
- 能说明 DASH 基于 mpd + fMP4 分片（35%）
- 能对比两者在 Safari 兼容性和标准开放性上的差异（30%）

**常见错误**：
- 认为 HLS 和 DASH 都需要特殊流媒体服务器（实际上基于 HTTP 即可）。
- 混淆索引文件和分片文件的作用。
- 认为 HLS 只能在 Apple 设备上使用。

**延伸追问**：
- 为什么直播场景下 HLS 延迟比 WebRTC 高？
- LL-HLS 通过哪些机制降低延迟？

**相关题目**：
- [FB-51-CO-A-009 HLS 的 m3u8 文件结构](#FB-51-CO-A-009)
- [FB-51-FS-P-017 HLS 直播低延迟优化方案](#FB-51-FS-P-017)

**参考资源**：
- [Apple - HTTP Live Streaming](https://developer.apple.com/streaming/)
- [MDN - DASH Adaptive Streaming](https://developer.mozilla.org/en-US/docs/Web/Media/DASH)

**口头回答版**：
> HLS 是苹果推出的流媒体协议，把视频切成很多小 TS 文件，用一个 m3u8 索引文件告诉播放器按顺序下载。DASH 是国际标准的 MPEG-DASH，用 mpd 文件做索引，分片通常是 fMP4。两者都能根据网速自动切换清晰度。HLS 在 Safari 和 iOS 上原生支持最好，DASH 更开放、跨平台更统一。

---

### FB-51-CO-B-003：如何使用 getUserMedia 获取摄像头和麦克风？

**题型**：概念题 / 手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：51 Multimedia
**标签**：getUserMedia、MediaStream、摄像头、麦克风、权限
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请写出使用 `navigator.mediaDevices.getUserMedia` 获取摄像头和麦克风的基本代码，并说明需要注意的权限和兼容性问题。

**参考答案**：

`getUserMedia` 是 WebRTC 相关 API 的一部分，用于获取用户本地的音视频媒体流。

基本用法：

```javascript
async function getMedia() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const videoElement = document.getElementById('localVideo');
    videoElement.srcObject = stream;
  } catch (err) {
    console.error('获取媒体失败:', err.name, err.message);
  }
}
```

常用约束配置：

```javascript
const constraints = {
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'user', // 前置摄像头
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
  },
};
```

注意事项：
- **HTTPS 环境**：`getUserMedia` 必须在安全上下文（HTTPS 或 localhost）中使用。
- **用户授权**：浏览器会弹出权限提示，用户拒绝后会抛出 `NotAllowedError`。
- **设备枚举**：可通过 `navigator.mediaDevices.enumerateDevices()` 获取可用设备列表。
- **释放资源**：停止使用时需要调用 `stream.getTracks().forEach(track => track.stop())` 释放摄像头和麦克风。

最佳实践：
- 在页面 unload 或组件卸载时停止轨道，避免摄像头指示灯常亮。
- 使用 `ideal` 而非 `exact` 约束，提高获取成功率。

**评分维度**：
- 能写出 getUserMedia 基本调用（40%）
- 能说明 HTTPS 和用户授权要求（30%）
- 能说明如何停止轨道释放资源（30%）

**常见错误**：
- 在 HTTP 环境下调用导致 API 不可用。
- 用户拒绝后没有错误处理。
- 忘记停止 track，导致摄像头麦克风持续占用。

**延伸追问**：
- 如何切换前置和后置摄像头？
- getUserMedia 和 getDisplayMedia 有什么区别？

**相关题目**：
- [FB-51-CO-A-011 WebRTC 建立连接的基本流程](#FB-51-CO-A-011)
- [FB-51-SC-R-028 跨浏览器统一媒体录制方案](#FB-51-SC-R-028)

**参考资源**：
- [MDN - MediaDevices.getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [MDN - Constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#parameters)

**口头回答版**：
> getUserMedia 用来获取用户的摄像头和麦克风。调用时传一个约束对象，比如 `{ video: true, audio: true }`，返回的是一个 MediaStream。拿到 stream 后赋给 video 标签的 srcObject 就能预览。要注意必须在 HTTPS 或 localhost 下使用，还要用户授权。用完一定要调用 stream.getTracks().forEach(track => track.stop()) 释放设备，不然摄像头灯会一直亮。

---

### FB-51-CO-B-004：Canvas 上绘制视频帧的基本步骤是什么？

**题型**：概念题 / 手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：51 Multimedia
**标签**：Canvas、video、drawImage、视频帧、图像处理
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明如何在 HTMLCanvasElement 上绘制 `<video>` 标签当前帧的内容，并写出关键代码。

**参考答案**：

在 Canvas 上绘制视频帧的核心是使用 `CanvasRenderingContext2D.drawImage()`，把 video 元素作为图像源传入。

基本步骤：

1. 创建 `<video>` 和 `<canvas>` 元素。
2. 加载视频并播放。
3. 使用 `requestAnimationFrame` 循环调用 `ctx.drawImage(video, 0, 0, width, height)`。

代码示例：

```html
<video id="video" src="example.mp4" crossOrigin="anonymous" controls></video>
<canvas id="canvas" width="640" height="360"></canvas>
```

```javascript
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function renderFrame() {
  if (!video.paused && !video.ended) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(renderFrame);
}

video.addEventListener('play', renderFrame);
```

关键说明：
- `drawImage` 可以把 `<video>`、`<img>`、`<canvas>`、ImageBitmap 等作为源。
- 如果视频是跨域资源，需要设置 `crossOrigin="anonymous"`，否则调用 `toDataURL` 或 `getImageData` 会报错。
- 在 `requestAnimationFrame` 中绘制，帧率和显示器刷新率同步，避免过度绘制。

最佳实践：
- 仅在视频播放时绘制，暂停时停止绘制以节省性能。
- 如需截图，可调用 `canvas.toDataURL('image/png')`。

**评分维度**：
- 能写出 drawImage 绘制 video 的核心代码（50%）
- 能说明 requestAnimationFrame 的使用（30%）
- 能提到跨域问题和 crossOrigin（20%）

**常见错误**：
- 在视频还没准备好时就调用 drawImage，导致绘制失败。
- 忘记处理跨域，导致 toDataURL 抛出安全错误。
- 不使用 requestAnimationFrame，导致不必要的重绘。

**延伸追问**：
- 如何用 Canvas 给视频添加水印？
- Canvas 截图时如何保持原始视频分辨率？

**相关题目**：
- [FB-51-CD-A-012 用 Canvas 实现视频截图](#FB-51-CD-A-012)
- [FB-51-CD-P-020 requestVideoFrameCallback 精确帧处理](#FB-51-CD-P-020)

**参考资源**：
- [MDN - CanvasRenderingContext2D.drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
- [MDN - HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement)

**口头回答版**：
> 在 Canvas 上画视频帧很简单，用 ctx.drawImage(video, 0, 0, width, height) 就行，video 元素可以直接作为图像源。通常放在 requestAnimationFrame 里循环绘制，这样和屏幕刷新率同步。要注意如果视频跨域，要给 video 标签加 crossOrigin="anonymous"，不然截图或取像素会报安全错误。

---

### FB-51-CO-B-005：Web Audio API 中的 AudioContext 是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：51 Multimedia
**标签**：Web Audio、AudioContext、音频图、音频节点
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Web Audio API 中 `AudioContext` 的作用，并说明如何播放一个音频文件。

**参考答案**：

`AudioContext` 是 Web Audio API 的核心对象，代表一个音频处理图。所有音频操作都在这个上下文中进行。

主要作用：
- 管理音频节点的创建和连接。
- 控制音频的播放、暂停、恢复。
- 提供高精度的时间调度能力。
- 作为音频渲染的终点（destination）。

播放音频文件的基本流程：

```javascript
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

async function playSound(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  source.start(0);
}
```

音频图示意：

```text
AudioBufferSourceNode -> AudioContext.destination
```

关键说明：
- `AudioContext` 创建后可能处于 `suspended` 状态，需要在用户交互后调用 `audioCtx.resume()`。
- Safari 需要使用 `webkitAudioContext` 前缀。
- 节点通过 `connect()` 方法连接，形成处理链。

最佳实践：
- 一个页面通常只创建一个 AudioContext，避免资源浪费。
- 在页面可见性变化或用户离开时考虑 suspend / close。

**评分维度**：
- 能说明 AudioContext 是音频处理上下文（40%）
- 能写出加载、解码、播放音频的基本代码（40%）
- 能提到用户交互后才能 resume 的约束（20%）

**常见错误**：
- 每次播放都创建新的 AudioContext。
- 在 AudioContext 处于 suspended 状态时直接播放，导致没有声音。
- 混淆 Web Audio API 和 HTMLAudioElement。

**延伸追问**：
- Web Audio API 和 HTMLAudioElement 有什么区别？
- 如何实现音频的可视化？

**相关题目**：
- [FB-51-CO-A-014 Web Audio 音频可视化](#FB-51-CO-A-014)
- [FB-51-FS-P-023 AudioWorklet 与 ScriptProcessorNode](#FB-51-FS-P-023)

**参考资源**：
- [MDN - Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MDN - AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)

**口头回答版**：
> AudioContext 是 Web Audio API 的核心，相当于一个音频处理的环境。你要播放声音，就先创建一个 AudioContext，然后创建音频节点，比如 BufferSource，把音频数据解码成 AudioBuffer 赋给它，再连接到 destination 也就是扬声器。要注意的是，AudioContext 刚创建时可能是 suspended 状态，必须在用户点击等交互之后调用 resume 才能出声。

---

### FB-51-PE-B-006：video 标签的 preload 和 autoplay 属性有什么作用？

**题型**：性能优化题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：51 Multimedia
**标签**：video、preload、autoplay、首帧、性能优化
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 `<video>` 标签的 `preload` 和 `autoplay` 属性的作用，以及它们对性能和用户体验的影响。

**参考答案**：

**preload**：
- 控制浏览器在页面加载时预加载多少视频数据。
- 取值：
  - `none`：不预加载，点击播放后再加载。
  - `metadata`：只加载元数据（时长、尺寸、首帧等）。
  - `auto`：由浏览器决定是否预加载较多数据。

**autoplay**：
- 控制视频是否在加载后自动播放。
- 现代浏览器通常只允许静音自动播放（`muted autoplay`），带声音的自动播放会被阻止。

对性能和体验的影响：

| 属性 | 优点 | 缺点 |
|------|------|------|
| preload="none" | 节省带宽和内存 | 点击播放后可能需要等待缓冲 |
| preload="metadata" | 平衡，能显示首帧和时长 | 仍会有少量请求 |
| preload="auto" | 播放更流畅 | 消耗更多带宽，可能影响首屏 |
| autoplay | 自动吸引注意力 | 带声音自动播放被浏览器阻止，且可能浪费流量 |

最佳实践：
- 首屏非核心视频使用 `preload="none"` 或 `preload="metadata"`。
- 需要自动播放的静音视频使用 `autoplay muted playsinline`。
- 移动端注意 `playsinline` 属性，避免视频全屏播放打断体验。

**评分维度**：
- 能说明 preload 三个取值的含义（40%）
- 能说明 autoplay 的浏览器限制（30%）
- 能根据场景给出合理建议（30%）

**常见错误**：
- 认为 `preload="auto"` 一定会预加载完整视频。
- 认为设置 autoplay 就能在所有浏览器自动带声音播放。
- 忽略移动端 playsinline 的使用。

**延伸追问**：
- 如何检测浏览器是否阻止了自动播放？
- 预加载策略和 CDN 流量成本如何平衡？

**相关题目**：
- [FB-51-PE-A-010 视频播放卡顿如何排查和优化](#FB-51-PE-A-010)
- [FB-51-PE-P-021 图片和视频的前端压缩方案](#FB-51-PE-P-021)

**参考资源**：
- [MDN - HTMLMediaElement.preload](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/preload)
- [Google - Autoplay policy](https://developer.chrome.com/blog/autoplay/)

**口头回答版**：
> preload 控制视频预加载多少数据，none 是不预加载，metadata 只加载元数据，auto 让浏览器自己决定。autoplay 是自动播放，但现代浏览器基本只允许静音自动播放。所以要做自动播放，通常要写 autoplay muted playsinline。首屏不重要的视频我建议 preload="metadata"，能省带宽又能显示首帧。

---

### FB-51-CO-B-007：字幕文件 WebVTT 和 SRT 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：51 Multimedia
**标签**：字幕、WebVTT、SRT、多语言、无障碍
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请对比 WebVTT 和 SRT 两种字幕文件格式，并说明前端如何为 video 标签添加字幕。

**参考答案**：

**SRT（SubRip Subtitle）**：
- 最古老的纯文本字幕格式之一。
- 结构简单：序号、时间码（`00:00:01,000 --> 00:00:03,000`）、字幕文本。
- 不支持样式、定位和元数据扩展。
- 浏览器原生不支持，需要前端解析后渲染。

**WebVTT（Web Video Text Tracks）**：
- W3C 标准，专为 Web 设计。
- 时间码使用点号分隔毫秒（`00:00:01.000 --> 00:00:03.000`）。
- 支持 `v` 标识说话人、`<c>` 样式类、`line` / `position` 定位、`region` 区域等。
- 浏览器原生支持，可通过 `<track>` 标签直接加载。

对比：

| 维度 | SRT | WebVTT |
|------|-----|--------|
| 浏览器原生支持 | 不支持 | 支持 |
| 样式与定位 | 不支持 | 支持 |
| 时间码分隔符 | 逗号 | 点号 |
| 适用场景 | 简单字幕、离线编辑 | Web 播放、复杂样式 |

前端添加字幕：

```html
<video controls>
  <source src="movie.mp4" type="video/mp4" />
  <track kind="subtitles" src="subtitle.vtt" srclang="zh" label="中文" default />
  <track kind="subtitles" src="subtitle-en.vtt" srclang="en" label="English" />
</video>
```

最佳实践：
- Web 场景优先使用 WebVTT，减少前端解析成本。
- 提供多语言字幕时，通过 `srclang` 和 `label` 区分。
- 使用 `kind="captions"` 表示带音效说明的字幕，提升无障碍体验。

**评分维度**：
- 能对比两种格式的时间码和样式支持（40%）
- 能说明 WebVTT 是浏览器原生标准（30%）
- 能写出 track 标签的基本用法（30%）

**常见错误**：
- 把 SRT 直接作为 track 标签的 src，期望浏览器原生渲染。
- 混淆 `kind="subtitles"` 和 `kind="captions"`。
- 忽略 `default` 属性的使用。

**延伸追问**：
- 如何自定义字幕样式？
- 如何实现字幕的实时翻译或双语显示？

**相关题目**：
- [FB-51-SC-P-022 支持多音轨切换的视频播放器](#FB-51-SC-P-022)
- [FB-51-SD-R-029 支持 DRM 的商业视频播放器安全架构](#FB-51-SD-R-029)

**参考资源**：
- [MDN - WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
- [W3C - WebVTT](https://www.w3.org/TR/webvtt1/)

**口头回答版**：
> SRT 和 WebVTT 都是字幕格式。SRT 结构简单，但浏览器不原生支持，也不支持样式和定位。WebVTT 是 W3C 标准，浏览器原生支持，能写样式、定位和区域。前端用 track 标签加载 WebVTT 就行，比如 `<track kind="subtitles" src="subtitle.vtt" srclang="zh" label="中文" default />`。

---

### FB-51-CO-B-008：多媒体内容的无障碍访问需要注意什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：51 Multimedia
**标签**：无障碍、a11y、字幕、键盘、屏幕阅读器
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明在网页中提供音视频内容时，应如何保障无障碍访问（Accessibility）。

**参考答案**：

多媒体无障碍的核心是让听障、视障、运动障碍用户都能感知和操作内容。

主要注意点：

1. **字幕（Captions）**：
   - 为所有有意义的音频内容提供同步字幕。
   - 使用 `<track kind="captions">` 而非仅 `subtitles`，captions 包含音效说明。

2. **键盘可操作**：
   - 播放、暂停、音量、进度条等控件必须可用键盘操作。
   - 自定义播放器要管理好 tabindex 和焦点状态。

3. **屏幕阅读器支持**：
   - 使用语义化标签和 ARIA 属性，如 `aria-label`、`aria-pressed`、`role="slider"`。
   - 视频状态变化时通过 `aria-live` 区域通知用户。

4. **高对比度与可缩放**：
   - 控件颜色对比度符合 WCAG 标准。
   - 字幕和控件字体大小应支持缩放。

5. **减少自动播放**：
   - 避免带声音的自动播放，尊重用户偏好。
   - 提供明显的播放/暂停控制。

6. **手势替代**：
   - 移动端触摸操作应提供键盘或语音替代方式。

示例：

```html
<video controls crossOrigin="anonymous">
  <source src="movie.mp4" type="video/mp4" />
  <track kind="captions" src="captions.vtt" srclang="zh" label="中文字幕" default />
</video>
```

最佳实践：
- 优先使用浏览器原生 `<video controls>`，它自带无障碍支持。
- 自定义播放器时，参考 WAI-ARIA 媒体播放器规范。

**评分维度**：
- 能提到字幕和 track 的使用（30%）
- 能提到键盘操作和焦点管理（30%）
- 能提到屏幕阅读器和 ARIA（20%）
- 能提到对比度和自动播放（20%）

**常见错误**：
- 只加 subtitles 不加 captions，忽略音效说明。
- 自定义播放器完全不用键盘事件。
- 认为原生 video 标签已经满足所有无障碍需求，忽略业务自定义控件的测试。

**延伸追问**：
- 如何测试自定义播放器的无障碍性？
- 语音朗读视频内容有哪些方案？

**相关题目**：
- [FB-51-CO-B-007 WebVTT 与 SRT 区别](#FB-51-CO-B-007)
- [FB-51-SD-R-030 多媒体前端平台质量评估](#FB-51-SD-R-030)

**参考资源**：
- [MDN - Web accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [W3C - Media Accessibility User Requirements](https://www.w3.org/TR/media-accessibility-reqs/)

**口头回答版**：
> 多媒体无障碍主要是让所有人都能用。要给视频加同步字幕，最好是用 kind="captions" 这样还能描述音效；播放控件要能用键盘操作；自定义控件要加 ARIA 标签让屏幕阅读器能读；颜色对比度要够；不要自动播放带声音的视频。优先用浏览器原生 video controls，它自带很多无障碍支持。


---

## 进阶题（8 道）{#advanced}

### FB-51-CO-A-009：HLS 的 m3u8 文件结构是怎样的？TS 分片的优势是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：51 Multimedia
**标签**：HLS、m3u8、TS、流媒体、自适应码率
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 HLS 中 m3u8 索引文件的基本结构，并解释为什么直播场景常用 TS 作为分片格式。

**参考答案**：

**m3u8 基本结构**：

```text
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0

#EXTINF:9.009,
segment_0.ts
#EXTINF:9.009,
segment_1.ts
#EXTINF:9.009,
segment_2.ts
#EXT-X-ENDLIST
```

关键标签说明：

| 标签 | 含义 |
|------|------|
| `#EXTM3U` | 文件头，表明是 m3u8 文件 |
| `#EXT-X-VERSION` | HLS 协议版本 |
| `#EXT-X-TARGETDURATION` | 最大分片时长（秒） |
| `#EXT-X-MEDIA-SEQUENCE` | 第一个分片的序号，直播时随时间递增 |
| `#EXTINF` | 当前分片的精确时长 |
| `#EXT-X-ENDLIST` | 点播文件结束标记，直播通常没有 |

主播放列表（多码率）：

```text
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
low.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720
high.m3u8
```

**TS 分片的优势**：

1. **自包含**：每个 TS 分片都包含完整的 PES 包头和音视频数据，可以从任意分片开始独立解码。
2. **容错性好**：某个分片损坏只影响该分片，不会导致后续无法播放。
3. **与广播标准兼容**：TS（Transport Stream）是 DVB/ATSC 数字电视标准，生态成熟。
4. **适合直播**：分片边界清晰，服务器可以边生成边下发。

现代演进：
- LL-HLS 开始使用 fMP4（fragmented MP4）分片以降低延迟。
- HLS CMAF 规范允许同一分片同时服务 HLS 和 DASH。

**评分维度**：
- 能说明 m3u8 基本标签含义（40%）
- 能解释多码率主播放列表的作用（20%）
- 能说明 TS 自包含、容错、适合直播的优势（40%）

**常见错误**：
- 认为 m3u8 本身包含视频数据（它只包含索引）。
- 混淆 `#EXT-X-TARGETDURATION` 和实际分片时长。
- 认为 HLS 只能用 TS，不知道 fMP4 也可以。

**延伸追问**：
- 直播 m3u8 和点播 m3u8 有什么区别？
- CMAF 如何统一 HLS 和 DASH 的分片？

**相关题目**：
- [FB-51-CO-B-002 HLS 和 DASH 基本原理](#FB-51-CO-B-002)
- [FB-51-FS-P-017 HLS 直播低延迟优化方案](#FB-51-FS-P-017)

**参考资源**：
- [Apple - HLS Authoring Specification](https://developer.apple.com/documentation/http_live_streaming/hls_authoring_specification_for_apple_devices)
- [RFC 8216 - HTTP Live Streaming](https://datatracker.ietf.org/doc/html/rfc8216)

**口头回答版**：
> m3u8 是 HLS 的索引文件，里面用 #EXTM3U 开头，#EXT-X-TARGETDURATION 表示最大分片时长，#EXT-X-MEDIA-SEQUENCE 表示第一个分片序号，#EXTINF 是每个分片的时长，#EXT-X-ENDLIST 表示点播结束。多码率时还有一个主播放列表，用 #EXT-X-STREAM-INF 列出不同码率的 m3u8。TS 分片的好处是自包含，每个分片都能独立解码，某个分片坏了不影响后面，所以特别适合直播。

---

### FB-51-PE-A-010：视频播放卡顿如何排查和优化？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：51 Multimedia
**标签**：卡顿、缓冲、性能优化、CDN、码率、缓冲区
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请描述视频播放卡顿的常见原因，以及前端可以从哪些方面进行排查和优化。

**参考答案**：

视频卡顿通常发生在下载、解码或渲染三个阶段。

**常见原因**：

1. **网络带宽不足**：
   - 码率超过可用带宽，导致下载速度跟不上播放速度。
   - CDN 节点距离远或回源慢。

2. **缓冲区耗尽**：
   - `buffered` 区间不足以支撑后续播放。
   - 首屏缓冲时间太短就强行播放。

3. **解码性能不足**：
   - 高分辨率或高码率视频在低端设备上软解压力大。
   - 浏览器不支持硬解，占用 CPU。

4. **渲染卡顿**：
   - 页面 JS 执行阻塞主线程。
   - 自定义播放器 UI 过度重绘。

**排查方法**：

```javascript
const video = document.querySelector('video');

// 查看已缓冲区间
console.log(video.buffered);

// 查看当前播放位置
console.log(video.currentTime);

// 查看网络状态
console.log(video.networkState);
console.log(video.readyState);

// 监听缓冲和等待事件
video.addEventListener('waiting', () => console.log('缓冲中，即将卡顿'));
video.addEventListener('stalled', () => console.log('下载停滞'));
video.addEventListener('playing', () => console.log('恢复播放'));
```

**优化方案**：

| 方向 | 措施 |
|------|------|
| 网络 | CDN 就近分发、P2P 加速、多码率自适应 |
| 码率 | 根据带宽动态切换清晰度 |
| 预加载 | 合理设置 preload，保证足够缓冲 |
| 解码 | 提供多种编码格式，优先使用设备硬解支持的格式 |
| 渲染 | 避免主线程阻塞，复杂 UI 用 requestAnimationFrame |
| 监控 | 采集 waiting、stalled、error 事件做埋点 |

最佳实践：
- 对长视频采用自适应码率（ABR）策略，如 BOLA、Throughput-based。
- 设置最小缓冲阈值，低于阈值时降级清晰度或暂停加载。

**评分维度**：
- 能从网络、缓冲、解码、渲染四个维度分析原因（40%）
- 能说出至少 3 种排查方法或事件（30%）
- 能给出具体优化措施（30%）

**常见错误**：
- 只关注网络，忽略解码和渲染瓶颈。
- 盲目提高预加载，导致首屏和流量成本增加。
- 不采集用户端真实数据，只依赖本地测试。

**延伸追问**：
- 如何设计自适应码率切换策略？
- 低端设备上如何降级视频清晰度？

**相关题目**：
- [FB-51-PE-B-006 video 标签 preload 和 autoplay](#FB-51-PE-B-006)
- [FB-51-SD-R-025 多协议播放器架构](#FB-51-SD-R-025)

**参考资源**：
- [MDN - HTMLMediaElement events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events)
- [Google - Media buffering and playback](https://developer.android.com/media/media3/ui/playerview)

**口头回答版**：
> 视频卡顿一般有三个层面：网络下载慢、解码性能不够、渲染阻塞。排查时可以看 video.buffered 缓冲区、监听 waiting 和 stalled 事件。优化可以从 CDN 分发、多码率自适应、合理预加载、优先使用硬解格式、避免主线程阻塞这些方面入手。长视频最好用 ABR 自动根据带宽切换清晰度。

---

### FB-51-CO-A-011：WebRTC 建立连接的基本流程是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：51 Multimedia
**标签**：WebRTC、RTC、P2P、信令、ICE、SDP
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请简述 WebRTC 建立点对点连接的主要流程，并说明信令服务器的作用。

**参考答案**：

WebRTC 建立连接主要分为三个步骤：媒体协商、网络发现和连接建立、数据传输。

**1. 获取本地媒体流**：

```javascript
const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
```

**2. 创建 RTCPeerConnection**：

```javascript
const pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
});
```

**3. 交换 SDP（媒体协商）**：

- 一方创建 Offer，设置本地描述（setLocalDescription）。
- 通过信令服务器发送 Offer 给对方。
- 对方设置远端描述（setRemoteDescription），创建 Answer。
- Answer 通过信令服务器返回，双方完成 SDP 交换。

**4. ICE 候选交换和网络穿透**：

- 双方通过 ICE 框架收集候选地址（host、srflx、relay）。
- STUN 用于获取公网地址，TURN 用于中继。
- 候选地址交换后，选择最优路径建立连接。

**5. 连接建立并传输数据**：

- 完成连接后，音视频数据通过 RTP/RTCP 传输。
- 数据通道（DataChannel）通过 SCTP 传输任意数据。

信令服务器的作用：
- 转发 Offer / Answer / ICE candidate。
- 本身不传输媒体数据，只负责协商阶段的消息中转。
- 常用 WebSocket 或 SSE 实现。

连接流程图：

```text
A                     信令服务器                     B
| createOffer          |                            |
| setLocalDescription  |                            |
|--------------------->|        offer               |
|                      |--------------------------->|
|                      |                            | setRemoteDescription
|                      |                            | createAnswer
|                      |        answer              |
|                      |<---------------------------|
| setRemoteDescription |                            |
| ICE candidate        |                            |
|--------------------->|      candidate             |
|                      |--------------------------->|
|                      |     candidate              |
|                      |<---------------------------|
|              建立 P2P 连接，直接传输媒体数据         |
```

最佳实践：
- 生产环境部署 TURN 服务器，保证对称型 NAT 也能连通。
- 使用 trickle ICE 实时交换候选，缩短连接建立时间。

**评分维度**：
- 能说明 SDP Offer/Answer 交换流程（35%）
- 能说明 ICE/STUN/TURN 的作用（35%）
- 能说明信令服务器只负责协商不传输媒体（30%）

**常见错误**：
- 认为信令服务器也传输媒体数据。
- 忽略 TURN 服务器在对称 NAT 下的必要性。
- 混淆 SDP 和 ICE candidate 的作用。

**延伸追问**：
- Trickle ICE 和 Vanilla ICE 有什么区别？
- WebRTC 如何保证音视频同步？

**相关题目**：
- [FB-51-CO-B-003 getUserMedia 获取摄像头麦克风](#FB-51-CO-B-003)
- [FB-51-PE-P-018 WebRTC 延迟抖动和拥塞控制](#FB-51-PE-P-018)

**参考资源**：
- [MDN - WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [WebRTC.org - Getting Started](https://webrtc.org/getting-started/)

**口头回答版**：
> WebRTC 建立连接分几步：先 getUserMedia 拿到本地媒体流，加到 RTCPeerConnection 里；然后一方创建 Offer，通过信令服务器发给对方，对方回 Answer；同时双方收集 ICE candidate 也经信令交换。SDP 负责媒体协商，ICE 负责找网络通路，STUN 拿公网地址，TURN 做中继。最后媒体数据走 P2P 直连。信令服务器只传控制消息，不传媒体。

---

### FB-51-CD-A-012：用 Canvas 实现视频截图功能

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：51 Multimedia
**标签**：Canvas、视频截图、drawImage、toDataURL、crossOrigin
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请手写一个函数，接收 video 元素和期望的输出格式，返回当前帧的 Base64 图片数据。注意处理跨域和分辨率问题。

**参考答案**：

```javascript
function captureFrame(video, options = {}) {
  const {
    type = 'image/png',
    quality = 0.92,
    width = video.videoWidth,
    height = video.videoHeight,
  } = options;

  // 创建离屏 canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 绘制当前帧
  ctx.drawImage(video, 0, 0, width, height);

  // 输出 Base64
  return canvas.toDataURL(type, quality);
}
```

使用示例：

```javascript
const video = document.querySelector('video');

// 按原始分辨率截图
const full = captureFrame(video);

// 输出压缩后的 JPEG
const compressed = captureFrame(video, {
  type: 'image/jpeg',
  quality: 0.8,
  width: 640,
  height: 360,
});
```

跨域处理：

```html
<video src="https://cdn.example.com/video.mp4" crossOrigin="anonymous" controls></video>
```

如果视频资源没有配置 CORS，`toDataURL` 会抛出安全错误：

```text
SecurityError: The operation is insecure.
```

增强版：支持下载和 Blob 输出

```javascript
async function captureFrameAsBlob(video, options = {}) {
  const dataUrl = captureFrame(video, options);
  const res = await fetch(dataUrl);
  return res.blob();
}

function downloadFrame(video, filename = 'screenshot.png') {
  const dataUrl = captureFrame(video, { type: 'image/png' });
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
```

最佳实践：
- 截图前检查 `video.readyState >= 2`（HAVE_CURRENT_DATA），确保有可用帧。
- 高清截图使用原始 `videoWidth/videoHeight`，避免被 CSS 尺寸影响。
- 跨域视频务必配置 CORS 并使用 `crossOrigin="anonymous"`。

**评分维度**：
- 能写出 drawImage + toDataURL 核心逻辑（40%）
- 能处理分辨率参数（20%）
- 能说明跨域问题和解决方案（20%）
- 能补充下载或 Blob 输出（20%）

**常见错误**：
- 使用 CSS 宽高设置 canvas，导致截图变形。
- 忽略跨域，导致安全错误。
- 在视频尚未加载完成时调用截图。

**延伸追问**：
- 如何截出不带控件和叠加层的纯净视频帧？
- 如果需要批量截图，如何优化性能？

**相关题目**：
- [FB-51-CO-B-004 Canvas 绘制视频帧](#FB-51-CO-B-004)
- [FB-51-CD-P-020 requestVideoFrameCallback 精确帧处理](#FB-51-CD-P-020)

**参考资源**：
- [MDN - HTMLCanvasElement.toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
- [MDN - CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin)

**口头回答版**：
> 视频截图就是创建一个 canvas，把 video 当前帧 drawImage 上去，然后调用 canvas.toDataURL 拿到 Base64。要注意 canvas 的宽高用 video.videoWidth 和 video.videoHeight，保证分辨率正确。如果视频跨域，要给 video 标签加 crossOrigin="anonymous"，并且 CDN 要配 CORS，否则 toDataURL 会报安全错误。还可以封装成下载功能。

---

### FB-51-CO-A-013：MediaRecorder API 如何录制音视频？

**题型**：概念题 / 手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：51 Multimedia
**标签**：MediaRecorder、录制、Blob、MediaStream、WebM
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 MediaRecorder API 的基本用法，并写出从 MediaStream 录制音视频并导出 Blob 的代码。

**参考答案**：

`MediaRecorder` 用于将 `MediaStream` 录制成 Blob 数据，常用于前端录制摄像头、屏幕或音频。

基本流程：

```javascript
let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9,opus',
  });

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    a.click();
    URL.revokeObjectURL(url);
  };

  mediaRecorder.start(1000); // 每秒触发一次 ondataavailable
}

function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder.stream.getTracks().forEach(track => track.stop());
}
```

常用事件：

| 事件 | 触发时机 |
|------|---------|
| `ondataavailable` | 有数据可用时触发 |
| `onstop` | 录制停止时触发 |
| `onpause` / `onresume` | 暂停/恢复录制 |
| `onerror` | 录制出错 |

常用 MIME Type：
- `video/webm;codecs=vp9,opus`
- `video/webm;codecs=vp8,opus`
- `video/mp4`（部分浏览器支持）

可通过 `MediaRecorder.isTypeSupported()` 检测支持情况：

```javascript
if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
  // 使用 VP9
}
```

最佳实践：
- 录制前调用 `isTypeSupported` 做兼容性降级。
- 根据场景选择合理的 `timeslice`，避免内存中堆积过多数据。
- 停止录制后释放所有 track，关闭摄像头/麦克风。

**评分维度**：
- 能写出 MediaRecorder 创建和事件处理（40%）
- 能说明 ondataavailable 和 onstop 的作用（30%）
- 能提到 mimeType 兼容性和 isTypeSupported（30%）

**常见错误**：
- 不释放 stream track，导致设备持续占用。
- 使用浏览器不支持的 mimeType 直接 new MediaRecorder。
- 把每次 ondataavailable 的数据都转成 Blob，导致性能问题。

**延伸追问**：
- 如何实现录制暂停和恢复？
- MediaRecorder 和 Canvas 录制有什么区别？

**相关题目**：
- [FB-51-CO-B-003 getUserMedia 获取摄像头麦克风](#FB-51-CO-B-003)
- [FB-51-SD-R-027 浏览器端音视频剪辑工具架构](#FB-51-SD-R-027)

**参考资源**：
- [MDN - MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [MDN - MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API)

**口头回答版**：
> MediaRecorder 用来把 MediaStream 录成 Blob。用法是先拿到 getUserMedia 的 stream，然后 new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' })。监听 ondataavailable 收集数据块，onstop 时把所有块合并成 Blob，再用 URL.createObjectURL 生成下载链接。要注意浏览器支持哪些 mimeType，可以用 MediaRecorder.isTypeSupported 检测。录完一定要停止 track 释放设备。

---

### FB-51-CO-A-014：Web Audio API 如何处理音频可视化？

**题型**：概念题 / 手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：51 Multimedia
**标签**：Web Audio、可视化、AnalyserNode、FFT、频谱
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明如何使用 Web Audio API 获取音频的频率数据，并在 Canvas 上绘制频谱图。

**参考答案**：

音频可视化的核心是使用 `AnalyserNode` 提取时域或频域数据，然后在 Canvas 上绘制。

基本流程：

```javascript
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.querySelector('audio');

// 创建源节点
const source = audioCtx.createMediaElementSource(audioElement);

// 创建分析节点
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

// 连接：源 -> 分析器 -> 输出
source.connect(analyser);
analyser.connect(audioCtx.destination);
```

绘制频谱：

```javascript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const bufferLength = analyser.frequencyBinCount; // fftSize / 2
const dataArray = new Uint8Array(bufferLength);

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] / 255 * canvas.height;
    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}

audioElement.addEventListener('play', () => {
  audioCtx.resume();
  draw();
});
```

关键 API：

| 方法 | 说明 |
|------|------|
| `getByteFrequencyData` | 获取频域数据，范围 0-255 |
| `getFloatFrequencyData` | 获取频域数据，单位为 dB |
| `getByteTimeDomainData` | 获取时域波形数据 |
| `getFloatTimeDomainData` | 获取时域波形浮点数据 |

`fftSize` 说明：
- 值越大，频谱分辨率越高，但时间精度越低。
- 必须是 2 的幂次方，如 256、512、1024、2048。
- `frequencyBinCount = fftSize / 2`。

最佳实践：
- 在 `requestAnimationFrame` 中绘制，和屏幕刷新同步。
- 音频播放前需要用户交互恢复 AudioContext。
- 低频到高频的数据按 index 递增，可据此做分频色彩映射。

**评分维度**：
- 能写出 AnalyserNode 创建和连接（40%）
- 能用 getByteFrequencyData 获取数据（30%）
- 能在 Canvas 上绘制频谱（30%）

**常见错误**：
- 忘记调用 audioCtx.resume()，导致没有声音。
- fftSize 设置不是 2 的幂次方。
- 没有连接 analyser 到 destination，导致只有可视化没有声音。

**延伸追问**：
- 如何实现波形图而不是频谱图？
- 可视化性能差时如何优化？

**相关题目**：
- [FB-51-CO-B-005 AudioContext 是什么](#FB-51-CO-B-005)
- [FB-51-FS-P-023 AudioWorklet 与 ScriptProcessorNode](#FB-51-FS-P-023)

**参考资源**：
- [MDN - AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)
- [MDN - Visualizations with Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API)

**口头回答版**：
> 音频可视化要用 AnalyserNode。先创建 AudioContext，把 audio 元素用 createMediaElementSource 接到分析节点上，再连到 destination。分析节点设置 fftSize 决定频谱精度，然后用 getByteFrequencyData 拿到 0 到 255 的频率数据，在 requestAnimationFrame 里用 Canvas 画成柱状图。记得用户交互后调用 audioCtx.resume()，不然没声音。

---

### FB-51-CO-A-015：内容保护 DRM 在前端有哪些常见方案？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：51 Multimedia
**标签**：DRM、内容保护、Widevine、FairPlay、PlayReady
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明前端视频内容保护中 DRM 的基本概念，以及常见的浏览器端 DRM 方案。

**参考答案**：

DRM（Digital Rights Management，数字版权管理）用于保护数字内容不被未授权复制、传播或播放。前端 DRM 的核心是加密视频流，并通过许可证服务器控制解密密钥的分发。

浏览器端 DRM 标准：

**EME（Encrypted Media Extensions）**：
- W3C 标准 API，允许 Web 应用与内容解密模块（CDM）交互。
- `navigator.requestMediaKeySystemAccess()` 用于检测和选择 CDM。
- 不直接处理解密，由浏览器内置的 CDM 完成。

常见 DRM 方案：

| 方案 | 厂商 | 支持平台 | 关键系统 |
|------|------|---------|---------|
| Widevine | Google | Chrome、Firefox、Android | Widevine CDM |
| FairPlay | Apple | Safari、iOS、tvOS | FairPlay Streaming |
| PlayReady | Microsoft | Edge、Windows、Xbox | PlayReady CDM |

前端基本流程：

```javascript
const config = [{
  initDataTypes: ['cenc'],
  audioCapabilities: [{ contentType: 'audio/mp4;codecs="mp4a.40.2"' }],
  videoCapabilities: [{ contentType: 'video/mp4;codecs="avc1.42E01E"' }],
}];

const access = await navigator.requestMediaKeySystemAccess('com.widevine.alpha', config);
const keys = await access.createMediaKeys();
```

加密流程：

```text
原始视频 -> 加密打包（CENC/Common Encryption）-> 分发加密流
播放器请求许可证 -> 许可证服务器验证用户权限 -> 返回解密密钥
CDM 解密 -> 解码渲染
```

最佳实践：
- 使用 DASH / HLS 配合 CENC 通用加密，实现一套内容多 DRM 分发。
- 对许可证请求做用户身份校验和防止共享。
- 结合 HTTPS、CORS、Token 验证增强安全性。

**评分维度**：
- 能说明 DRM 通过加密和许可证保护内容（30%）
- 能列举 Widevine/FairPlay/PlayReady 三种方案及平台（40%）
- 能说明 EME API 的作用（30%）

**常见错误**：
- 认为前端 JS 直接持有解密密钥。
- 混淆 DRM 和简单防盗链（Referer、Token）。
- 认为一种 DRM 可以覆盖所有浏览器。

**延伸追问**：
- DRM 和 CENC 通用加密有什么关系？
- 如何防止录屏和浏览器开发者工具抓取？

**相关题目**：
- [FB-51-CO-P-019 Widevine/FairPlay/PlayReady 对比](#FB-51-CO-P-019)
- [FB-51-SD-R-029 支持 DRM 的商业视频播放器安全架构](#FB-51-SD-R-029)

**参考资源**：
- [MDN - Encrypted Media Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
- [W3C - EME](https://www.w3.org/TR/encrypted-media/)

**口头回答版**：
> DRM 就是数字版权管理，保护视频不被随便下载或传播。浏览器里通过 EME 标准和 CDM 内容解密模块来工作。常见的方案有 Google 的 Widevine 支持 Chrome 和 Android，Apple 的 FairPlay 支持 Safari 和 iOS，Microsoft 的 PlayReady 支持 Edge 和 Windows。视频流是加密的，播放器通过许可证服务器拿到密钥才能解密播放，密钥不会直接暴露给前端 JS。

---

### FB-51-CO-A-016：Web Codecs API 解决了什么问题？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级 / 专家
**面试知识域**：51 Multimedia
**标签**：Web Codecs、编解码、VideoFrame、EncodedVideoChunk、低延迟
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Web Codecs API 的作用，以及它相比传统 video 标签和 MSE 的优势。

**参考答案**：

Web Codecs API 是一组浏览器底层 API，允许 Web 应用直接访问系统的音视频编解码器，进行编码、解码、图像格式转换等操作。

核心接口：

| 接口 | 作用 |
|------|------|
| `VideoDecoder` | 解码压缩视频帧为 `VideoFrame` |
| `VideoEncoder` | 把 `VideoFrame` 编码为压缩数据 |
| `AudioDecoder` / `AudioEncoder` | 音频编解码 |
| `EncodedVideoChunk` / `EncodedAudioChunk` | 表示已编码的数据块 |
| `VideoFrame` | 表示一帧解码后的图像，可绘制到 Canvas |

相比 `<video>` 和 MSE 的优势：

1. **低延迟**：
   - 不经过播放器缓冲和 demuxer 的完整管线，可直接控制每一帧。
   - 适合云游戏、视频编辑、实时处理。

2. **细粒度控制**：
   - 可以逐帧解码、编码、处理。
   - 支持把 `VideoFrame` 直接传入 WebGL、Canvas、WebRTC。

3. **灵活性**：
   - 不依赖容器格式，可直接处理裸码流。
   - 支持自定义协议和私有封装。

基本解码示例：

```javascript
const decoder = new VideoDecoder({
  output: (frame) => {
    ctx.drawImage(frame, 0, 0);
    frame.close();
  },
  error: (e) => console.error(e),
});

decoder.configure({ codec: 'avc1.42E01E' });
decoder.decode(new EncodedVideoChunk({
  type: 'key',
  timestamp: 0,
  data: encodedData,
}));
```

最佳实践：
- 使用 `VideoFrame.close()` 及时释放资源，避免内存泄漏。
- 生产环境注意浏览器支持度，Chrome 86+ 开始支持。
- 结合 WebTransport 或 WebRTC 可实现超低延迟传输。

**评分维度**：
- 能说明 Web Codecs 提供底层编解码能力（35%）
- 能列举 VideoDecoder/VideoEncoder 等核心接口（35%）
- 能对比 video/MSE 说明低延迟和细粒度控制优势（30%）

**常见错误**：
- 认为 Web Codecs 可以替代 video 标签的所有场景。
- 忘记关闭 VideoFrame 导致内存泄漏。
- 忽略浏览器兼容性和安全上下文要求。

**延伸追问**：
- Web Codecs 和 WebAssembly 软解相比有什么优劣？
- Web Codecs 在云游戏场景如何配合 WebTransport 使用？

**相关题目**：
- [FB-51-CD-P-020 requestVideoFrameCallback 精确帧处理](#FB-51-CD-P-020)
- [FB-51-SD-R-026 低延迟直播系统前端方案](#FB-51-SD-R-026)

**参考资源**：
- [MDN - Web Codecs API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API)
- [W3C - WebCodecs](https://www.w3.org/TR/webcodecs/)

**口头回答版**：
> Web Codecs API 让前端可以直接调用系统的音视频编解码器，比如 VideoDecoder、VideoEncoder。相比 video 标签和 MSE，它能逐帧控制解码和编码，延迟更低，适合云游戏、视频编辑这些场景。解码出来的 VideoFrame 可以直接画到 Canvas 或 WebGL 上。用完记得 close 释放，不然容易内存泄漏。


---

## 深入题（8 道）{#proficient}

### FB-51-FS-P-017：HLS 直播低延迟优化方案（LL-HLS）的原理是什么？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：51 Multimedia
**标签**：LL-HLS、低延迟直播、HLS、fMP4、CMAF
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请解释 HLS 直播延迟高的原因，以及 LL-HLS 如何通过协议优化降低延迟。

**参考答案**：

**传统 HLS 直播延迟高的原因**：

1. **分片时长较大**：
   - 传统 HLS 推荐分片时长 6-10 秒。
   - 播放器通常需要缓存 3 个分片才开始播放，延迟可达 18-30 秒。

2. **分片完全生成后才能下载**：
   - 播放器必须等待整个 TS 分片生成并上传到 CDN 后才能下载。
   - 这个等待时间直接累加到延迟中。

3. **m3u8 更新频率低**：
   - 播放器按固定间隔轮询 m3u8，新分片信息不能即时获取。

**LL-HLS（Low-Latency HLS）优化原理**：

1. **更短的分片 / 部分分片（Partial Segment）**：
   - 分片可以继续细分为多个 Partial Segment，每个约 200ms-1s。
   - 播放器无需等待完整分片生成，可以边生成边下载。

2. **阻塞式 m3u8 加载（Blocking Playlist Reload）**：
   - 播放器请求 m3u8 时，服务器保持连接阻塞，直到有新分片信息才返回。
   - 减少轮询空转，更快拿到最新分片。

3. **预加载提示（Preload Hints）**：
   - m3u8 中通过 `#EXT-X-PRELOAD-HINT` 预告即将生成的分片。
   - 播放器可以提前发起 HTTP 请求，分片一生成即可下载。

4. **报道分片（Report）**：
   - 服务器主动推送分片生成事件，减少轮询延迟。

5. **使用 fMP4 替代 TS**：
   - fMP4 更适合低延迟场景，与 CMAF 标准兼容，可同时服务 HLS 和 DASH。

LL-HLS m3u8 示例片段：

```text
#EXTM3U
#EXT-X-VERSION:10
#EXT-X-TARGETDURATION:4
#EXT-X-PART-INF:PART-TARGET=0.5

#EXT-X-PART:DURATION=0.5,URI="segment0_part0.m4s"
#EXT-X-PART:DURATION=0.5,URI="segment0_part1.m4s"
#EXTINF:1.0,
segment0.m4s

#EXT-X-PRELOAD-HINT:TYPE=PART,URI="segment0_part2.m4s"
```

延迟对比：

| 方案 | 典型延迟 |
|------|---------|
| 传统 HLS | 10-30 秒 |
| LL-HLS | 2-8 秒 |
| WebRTC / WebTransport | < 1 秒 |

最佳实践：
- 对端侧播放器使用支持 LL-HLS 的库，如 hls.js 1.0+、Video.js 7+。
- 服务端需要支持阻塞加载和快速生成 Partial Segment。
- 极低延迟场景考虑 WebRTC 或 WebTransport 替代 HLS。

**评分维度**：
- 能分析传统 HLS 延迟高的原因（30%）
- 能说明 Partial Segment、Blocking Reload、Preload Hint 三个核心机制（40%）
- 能对比 LL-HLS 和其他低延迟方案的延迟量级（30%）

**常见错误**：
- 认为 LL-HLS 只是缩短分片时长。
- 忽略服务端需要支持阻塞加载和新 m3u8 语义。
- 认为 LL-HLS 可以替代 WebRTC 做超低延迟互动直播。

**延伸追问**：
- LL-HLS 和 LL-DASH 有什么异同？
- 阻塞式 m3u8 加载对服务端连接数有什么影响？

**相关题目**：
- [FB-51-CO-A-009 HLS 的 m3u8 文件结构](#FB-51-CO-A-009)
- [FB-51-SD-R-026 低延迟直播系统前端方案](#FB-51-SD-R-026)

**参考资源**：
- [Apple - HLS Authoring Specification](https://developer.apple.com/documentation/http_live_streaming/hls_authoring_specification_for_apple_devices)
- [hls.js - Low-Latency HLS](https://github.com/video-dev/hls.js/blob/master/docs/API.md#low-latency-mode)

**口头回答版**：
> 传统 HLS 延迟高主要是因为分片长，播放器要等 3 个分片才开始播，而且必须等整个分片生成好才能下载。LL-HLS 把分片再切成 Partial Segment，大概几百毫秒一个，播放器不用等完整分片；同时用阻塞式 m3u8 加载，服务器有新分片再返回，减少轮询；还有 Preload Hint 让播放器提前请求。配合 fMP4 可以把延迟降到 2 到 8 秒。但要超低延迟，比如互动直播，还是 WebRTC 更合适。

---

### FB-51-PE-P-018：WebRTC 中的延迟、抖动和拥塞控制如何实现？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：51 Multimedia
**标签**：WebRTC、延迟、抖动、拥塞控制、JitterBuffer、GCC
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入说明 WebRTC 中影响实时音视频质量的关键因素（延迟、抖动、丢包），以及前端/端侧如何配合进行拥塞控制和优化。

**参考答案**：

WebRTC 实时音视频质量主要受三个网络指标影响：

1. **延迟（Latency）**：
   - 端到端音频/视频传输时间。
   - 目标通常 < 400ms，互动场景 < 200ms。

2. **抖动（Jitter）**：
   - 数据包到达时间的不稳定。
   - 需要通过 Jitter Buffer 吸收抖动，平滑播放。

3. **丢包（Packet Loss）**：
   - 网络拥塞或链路质量差导致数据包丢失。
   - WebRTC 使用 NACK、FEC、PLC 等机制恢复。

**关键技术机制**：

**Jitter Buffer（抖动缓冲区）**：
- 接收端缓存一定数量的音频/视频包，等齐后再播放。
- 缓冲越大，抗抖动能力越强，但延迟越大。
- WebRTC 会动态调整 Jitter Buffer 大小。

**拥塞控制（Congestion Control）**：
- WebRTC 使用 GCC（Google Congestion Control）算法。
- 结合延迟梯度（delay-based）和丢包（loss-based）两种信号估计带宽。
- 根据带宽动态调整编码码率和分辨率。

```text
发送端 -> 探测网络 -> 接收端反馈 TMMBR/REMB/Transport-CC -> 发送端调整码率
```

**前向纠错 FEC 与丢包重传 NACK**：
- FEC：发送冗余数据，少量丢包可自行恢复。
- NACK：接收端发现丢包后请求重传。
- PLC（Packet Loss Concealment）：音频丢包时插值补偿。

**前端可做的优化**：

| 方向 | 措施 |
|------|------|
| 采集 | 降低分辨率、帧率，减少上行码率 |
| 编码 | 使用动态码率，配合拥塞控制反馈 |
| 渲染 | 合理设置 Jitter Buffer，平衡延迟与流畅 |
| 网络 | 部署边缘 TURN，优化路由 |
| 体验 | 弱网时降级为音频优先、降低分辨率 |

最佳实践：
- 使用 `RTCRtpSender.setParameters` 动态调整编码参数。
- 通过 `getStats()` 获取实时统计信息，监控延迟、抖动、丢包。

```javascript
const stats = await pc.getStats();
stats.forEach(report => {
  if (report.type === 'inbound-rtp') {
    console.log('packetLoss:', report.packetsLost / report.packetsReceived);
    console.log('jitter:', report.jitter);
  }
});
```

**评分维度**：
- 能分析延迟、抖动、丢包的影响（30%）
- 能说明 Jitter Buffer 和 GCC 拥塞控制原理（35%）
- 能列举 FEC/NACK/PLC 等恢复机制（20%）
- 能通过 getStats 做监控（15%）

**常见错误**：
- 认为 WebRTC 的延迟只由网络决定，忽略编解码和缓冲区延迟。
- 把 Jitter Buffer 调得过大，导致延迟增加。
- 弱网时不做任何降级，导致卡顿和花屏。

**延伸追问**：
- SVC（可伸缩视频编码）在 WebRTC 弱网中有什么作用？
- Simulcast 和单流自适应有什么区别？

**相关题目**：
- [FB-51-CO-A-011 WebRTC 建立连接的基本流程](#FB-51-CO-A-011)
- [FB-51-SD-R-026 低延迟直播系统前端方案](#FB-51-SD-R-026)

**参考资源**：
- [WebRTC.org - Congestion Control](https://webrtc.googlesource.com/src/+/refs/heads/main/modules/congestion_controller/)
- [RFC 8698 - Test Cases for Evaluating RCC](https://datatracker.ietf.org/doc/html/rfc8698)

**口头回答版**：
> WebRTC 里影响质量的主要有三个：延迟、抖动、丢包。延迟是端到端传输时间；抖动是包到达时间不稳定，需要用 Jitter Buffer 吸收；丢包要靠 FEC 冗余、NACK 重传、PLC 插值来恢复。拥塞控制主要用 GCC 算法，结合延迟变化和丢包情况估计带宽，然后动态调整码率。前端可以通过 getStats 监控这些指标，弱网时降分辨率、降帧率，甚至优先保音频。

---

### FB-51-CO-P-019：Widevine、FairPlay、PlayReady 三种 DRM 方案有什么区别？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：51 Multimedia
**标签**：DRM、Widevine、FairPlay、PlayReady、EME、CDM
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Widevine、FairPlay、PlayReady 三种主流 DRM 方案，包括支持平台、安全级别和前端接入方式。

**参考答案**：

三种 DRM 分别对应 Google、Apple、Microsoft 的生态系统，浏览器端都通过 EME 与 CDM 交互。

| 维度 | Widevine | FairPlay | PlayReady |
|------|----------|----------|-----------|
| 厂商 | Google | Apple | Microsoft |
| 主要平台 | Chrome、Firefox、Android、Android TV | Safari、iOS、macOS、tvOS | Edge、Windows、Xbox、部分 Smart TV |
| EME Key System | `com.widevine.alpha` | `com.apple.fps.1_0` | `com.microsoft.playready` |
| CDM | Widevine CDM | FairPlay Streaming | PlayReady CDM |
| 安全级别 | L1（硬件解密）、L2（软件解密）、L3 | 硬件安全 + SPC 证书 | SL2000、SL3000 等 |
| 流媒体格式 | DASH / HLS + CENC | HLS + SAMPLE-AES | DASH / HLS + CENC |
| 许可证服务器 | 自建或第三方 | Apple FPS Server | 自建或 Azure |

**安全级别说明**：

- **Widevine L1**：解密和渲染都在 TEE（可信执行环境）中，安全性最高。
- **Widevine L2**：解密在 TEE，渲染在普通环境。
- **Widevine L3**：纯软件解密，安全性最低，但兼容性最好。

**前端接入差异**：

**Widevine**：
- 使用标准 EME 流程。
- 许可证请求直接发往许可证服务器。

```javascript
const access = await navigator.requestMediaKeySystemAccess('com.widevine.alpha', config);
const keys = await access.createMediaKeys();
```

**FairPlay**：
- 需要额外处理 SPC（Server Playback Context）和 CKC（Content Key Context）。
- 需要向 Apple 申请 FPS 证书。
- 通常配合 HLS + SAMPLE-AES。

**PlayReady**：
- Edge 原生支持 PlayReady。
- 许可证请求格式为 PlayReady Object。
- 常与 Windows / Xbox 生态结合。

最佳实践：
- 商业视频平台通常同时集成三种 DRM，根据浏览器选择对应方案。
- 使用 Shaka Player、Bitmovin、THEOplayer 等播放器简化多 DRM 接入。
- 对 L3 设备进行风险提示或限制高清内容播放。

**评分维度**：
- 能对应三个方案到各自厂商和主要平台（30%）
- 能说明 Key System 和安全级别差异（30%）
- 能说明 FairPlay 需要额外证书和 SPC/CKC 流程（20%）
- 能给出多 DRM 同时接入的建议（20%）

**常见错误**：
- 认为只要集成一种 DRM 就能覆盖所有浏览器。
- 混淆 CENC 通用加密和各家 DRM 的关系。
- 忽略不同安全级别对高清内容的限制。

**延伸追问**：
- 如何判断当前浏览器支持哪种 DRM？
- DRM 和 ClearKey 有什么区别？

**相关题目**：
- [FB-51-CO-A-015 前端 DRM 常见方案](#FB-51-CO-A-015)
- [FB-51-SD-R-029 支持 DRM 的商业视频播放器安全架构](#FB-51-SD-R-029)

**参考资源**：
- [Google - Widevine](https://www.widevine.com/)
- [Apple - FairPlay Streaming](https://developer.apple.com/streaming/fps/)
- [Microsoft - PlayReady](https://learn.microsoft.com/en-us/playready/)

**口头回答版**：
> 三种 DRM 分别对应三个大厂。Widevine 是 Google 的，支持 Chrome、Firefox、Android；FairPlay 是 Apple 的，支持 Safari、iOS、tvOS；PlayReady 是微软的，支持 Edge、Windows、Xbox。浏览器里都通过 EME 和各自的 CDM 交互。Widevine 分 L1、L2、L3 安全级别，L1 是硬件解密最安全。FairPlay 接入最麻烦，要向 Apple 申请证书，处理 SPC 和 CKC。商业平台一般要三种都接，根据浏览器自动选择。

---

### FB-51-CD-P-020：如何用 requestVideoFrameCallback 实现精确的视频帧处理？

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：51 Multimedia
**标签**：requestVideoFrameCallback、RVFC、帧同步、Canvas、性能优化
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请说明 `requestVideoFrameCallback`（RVFC）的作用，并写出用它实现视频帧精准同步绘制的代码。

**参考答案**：

`requestVideoFrameCallback` 是 `<video>` 元素的专用回调，它在视频帧实际提交给合成器时触发，比 `requestAnimationFrame` 更准确。

与 `requestAnimationFrame` 的区别：

| 维度 | requestAnimationFrame | requestVideoFrameCallback |
|------|----------------------|---------------------------|
| 触发时机 | 显示器刷新 | 视频帧提交 |
| 同步对象 | 显示器 | 视频帧率 |
| 回调参数 | DOMHighResTimeStamp | metadata（含 mediaTime、presentedFrames 等） |
| 丢帧感知 | 无 | 可获取 presentedFrames、expectedDisplayTime |
| 适用场景 | 一般动画 | 视频帧处理、特效、字幕同步 |

基本用法：

```javascript
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function drawFrame(now, metadata) {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 精准字幕同步：metadata.mediaTime 表示当前帧的媒体时间
  renderSubtitle(metadata.mediaTime);

  // 继续请求下一帧
  video.requestVideoFrameCallback(drawFrame);
}

video.requestVideoFrameCallback(drawFrame);
```

metadata 字段：

```javascript
{
  mediaTime: 12.345,        // 当前帧媒体时间
  presentedFrames: 370,     // 已呈现帧数
  expectedDisplayTime: ..., // 预计显示时间
  width: 1920,              // 帧宽
  height: 1080,             // 帧高
}
```

结合 Canvas 做滤镜处理：

```javascript
function processFrame(now, metadata) {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 获取像素数据做处理
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  applyGrayscale(imageData.data);
  ctx.putImageData(imageData, 0, 0);

  video.requestVideoFrameCallback(processFrame);
}
```

最佳实践：
- 视频帧处理优先使用 RVFC，避免 rAF 和视频帧率不匹配导致的重复绘制或丢帧。
- 对像素级处理使用 WebGL / WebGPU 比 2D Canvas getImageData 性能更好。
- 注意浏览器支持度：Chrome 83+、Edge 83+、部分 Firefox。

**评分维度**：
- 能说明 RVFC 相比 rAF 的帧同步优势（30%）
- 能写出 requestVideoFrameCallback 循环绘制（40%）
- 能利用 metadata.mediaTime 做同步处理（30%）

**常见错误**：
- 在 rAF 中做视频帧处理，导致和实际视频帧不同步。
- 忽略 RVFC 的浏览器兼容性。
- 在回调中做大量同步计算，阻塞下一帧。

**延伸追问**：
- RVFC 和 HTMLVideoElement.requestVideoFrameCallback 与 Web Codecs 的 VideoFrame 如何配合？
- 如何检测和处理 RVFC 丢帧？

**相关题目**：
- [FB-51-CO-B-004 Canvas 绘制视频帧](#FB-51-CO-B-004)
- [FB-51-CO-A-016 Web Codecs API](#FB-51-CO-A-016)

**参考资源**：
- [W3C - requestVideoFrameCallback](https://wicg.github.io/video-rvfc/)
- [Chrome Developers - requestVideoFrameCallback](https://developer.chrome.com/blog/requestvideoframecallback/)

**口头回答版**：
> requestVideoFrameCallback 是 video 元素专用的回调，比 requestAnimationFrame 更准，因为它是在视频帧真正要显示的时候触发，回调里还能拿到 metadata，比如 mediaTime 当前帧时间、presentedFrames 已显示帧数。用它来做 Canvas 绘制、字幕同步、滤镜处理都很合适。用法就是 video.requestVideoFrameCallback(drawFrame)，在回调里继续请求下一帧。

---

### FB-51-PE-P-021：图片和视频的前端压缩方案对比？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：51 Multimedia
**标签**：图片压缩、视频压缩、Canvas、WebP、ffmpeg.wasm、上传优化
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比前端图片压缩和视频压缩的常见方案，说明各自的实现方式、优缺点和适用场景。

**参考答案**：

**图片压缩方案**：

| 方案 | 实现方式 | 优点 | 缺点 |
|------|---------|------|------|
| Canvas 压缩 | drawImage 后 toBlob/toDataURL | 浏览器原生，兼容好 | 格式受限，质量不可控 |
| WebP 编码 | canvas.toBlob('image/webp') | 压缩率高 | 部分浏览器不支持 |
| 第三方库 | compressorjs、browser-image-compression | 功能丰富 | 增加包体积 |
| Web Worker | 在 Worker 中处理 | 不阻塞主线程 | 通信有开销 |

Canvas 压缩示例：

```javascript
function compressImage(file, maxWidth = 1280, quality = 0.8) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    img.src = URL.createObjectURL(file);
  });
}
```

**视频压缩方案**：

| 方案 | 实现方式 | 优点 | 缺点 |
|------|---------|------|------|
| Canvas + MediaRecorder | 抽帧后用 Canvas 绘制再录制 | 纯前端 | 画质损失大、速度慢 |
| ffmpeg.wasm | WebAssembly 版 FFmpeg | 功能强大、格式多 | 包体积大、性能有限 |
| 服务端压缩 | 上传到服务端转码 | 质量高、性能好 | 依赖后端、上传耗时 |
| WebCodecs | 浏览器原生编解码 | 速度快 | 兼容性和功能有限 |

ffmpeg.wasm 压缩示例：

```javascript
const { FFmpeg } = FFmpegWASM;
const ffmpeg = new FFmpeg();
await ffmpeg.load();

await ffmpeg.writeFile('input.mp4', await fetchFile(file));
await ffmpeg.exec(['-i', 'input.mp4', '-vcodec', 'libx264', '-crf', '28', 'output.mp4']);
const data = await ffmpeg.readFile('output.mp4');
```

对比总结：

- **图片压缩**：前端方案成熟，Canvas 压缩足够应对大多数上传场景。
- **视频压缩**：前端压缩能力有限，简单场景可用 Canvas + MediaRecorder，高质量压缩建议后端处理或 ffmpeg.wasm。
- **通用原则**：压缩前尽量读取文件元数据，避免无效处理；大文件使用分片上传和断点续传。

最佳实践：
- 图片上传前先压缩和转换格式（如 JPEG、WebP）。
- 视频压缩考虑服务端预转码 + 多码率自适应。
- 压缩任务尽量放在 Web Worker 或 WASM 中，避免阻塞 UI。

**评分维度**：
- 能对比图片压缩的 Canvas、WebP、第三方库方案（35%）
- 能对比视频压缩的 Canvas+MediaRecorder、ffmpeg.wasm、服务端方案（35%）
- 能根据场景给出选型建议（30%）

**常见错误**：
- 用 Canvas 压缩视频期望达到专业转码质量。
- 不考虑 Web Worker，导致压缩时页面卡顿。
- 对所有文件使用同一压缩参数，忽略文件大小和分辨率差异。

**延伸追问**：
- 如何在压缩过程中显示进度？
- 如何在前端判断文件是否还需要压缩？

**相关题目**：
- [FB-51-CD-A-012 用 Canvas 实现视频截图](#FB-51-CD-A-012)
- [FB-51-SD-R-027 浏览器端音视频剪辑工具架构](#FB-51-SD-R-027)

**参考资源**：
- [MDN - HTMLCanvasElement.toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)
- [ffmpeg.wasm 文档](https://ffmpegwasm.netlify.app/)

**口头回答版**：
> 图片压缩前端比较成熟，常用 Canvas 画小之后 toBlob 输出 JPEG 或 WebP，也可以用 compressorjs 这类库。视频压缩就复杂一些，简单压缩可以抽帧到 Canvas 再 MediaRecorder 录制，但质量一般；专业一点用 ffmpeg.wasm，在浏览器里跑 FFmpeg，功能强但包大、慢；高质量还是建议传服务端转码。压缩任务最好放 Worker 里，别卡主线程。

---

### FB-51-SC-P-022：如何实现一个支持多音轨切换的视频播放器？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：51 Multimedia
**标签**：多音轨、音频切换、MSE、HLS、DASH、MediaSource
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个支持多音轨切换的网页视频播放器，说明前端如何实现音轨列表获取、切换和无缝衔接。

**参考答案**：

多音轨切换常见于多语言影视、导演评论、不同解说版本等场景。

**整体方案**：

1. **内容准备阶段**：
   - 视频使用 HLS 或 DASH 封装，每个音轨作为独立 media playlist（HLS）或 Adaptation Set（DASH）。
   - 或者使用 MSE 手动管理多个音频 SourceBuffer。

2. **音轨列表获取**：
   - 解析 m3u8 中的 `#EXT-X-MEDIA` 标签（HLS）。
   - 解析 mpd 中的 `<AdaptationSet>`（DASH）。

HLS 多音轨示例：

```text
#EXTM3U
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="中文",DEFAULT=YES,URI="audio_cn.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="English",URI="audio_en.m3u8"
#EXT-X-STREAM-INF:BANDWIDTH=2800000,AUDIO="audio"
video.m3u8
```

3. **切换实现**：
   - 使用播放器库（hls.js、shaka-player、dash.js）时，调用其音频 track API。
   - 自定义 MSE 实现时，切换音频 SourceBuffer 的内容。

hls.js 切换示例：

```javascript
hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
  const audioTracks = hls.audioTracks;
  console.log(audioTracks); // [{ id, name, lang, default }, ...]
});

// 切换到第二个音轨
hls.audioTrack = 1;
```

4. **无缝衔接**：
   - 以当前视频时间戳为基准，从对应位置加载新音轨数据。
   - 使用 MSE 的 `appendWindowStart` / `appendWindowEnd` 或 `timestampOffset` 对齐时间线。
   - 保持旧音频 buffer 到当前播放位置，新音轨从下一分片开始填充。

5. **UI 交互**：
   - 提供音轨选择菜单，显示语言名称和当前选中状态。
   - 切换时给出短暂 loading 提示，避免用户误以为卡顿。

最佳实践：
- 优先使用成熟播放器库处理多音轨，避免自己解析 m3u8 / mpd。
- 切换音轨时保持视频连续播放，只替换音频轨道。
- 考虑无障碍，给音轨菜单加 ARIA 属性和键盘操作。

**评分维度**：
- 能说明 HLS/DASH 中多音轨的封装方式（30%）
- 能说明如何获取和切换音轨（30%）
- 能说明无缝衔接的时间对齐策略（25%）
- 能考虑 UI 和无障碍（15%）

**常见错误**：
- 重新加载整个视频来切换音轨，导致播放中断。
- 忽略音视频时间戳对齐，导致音画不同步。
- 音轨切换后没有更新 UI 状态。

**延伸追问**：
- 多音轨和字幕轨道切换在实现上有什么异同？
- 如果播放器使用 MSE，切换音轨时 SourceBuffer 怎么管理？

**相关题目**：
- [FB-51-CO-B-007 WebVTT 与 SRT 区别](#FB-51-CO-B-007)
- [FB-51-CP-P-024 MSE 在流媒体播放器中的作用](#FB-51-CP-P-024)

**参考资源**：
- [hls.js - audioTracks](https://github.com/video-dev/hls.js/blob/master/docs/API.md#audiotracks)
- [DASH-IF - Multi-Track](https://dashif.org/docs/)

**口头回答版**：
> 多音轨切换首先要内容层支持，比如 HLS 用 #EXT-X-MEDIA 声明多个音频，DASH 用多个 Adaptation Set。前端解析 manifest 拿到音轨列表，用户切换时只换音频轨道，不换视频。成熟播放器像 hls.js 有 audioTracks 和 audioTrack API 可以直接切。无缝衔接的关键是时间戳对齐，新音轨要从当前播放位置开始加载，可以用 MSE 的 timestampOffset 对齐。最好保持视频连续，只替换音频 buffer。

---

### FB-51-FS-P-023：Web Audio 中的 AudioWorklet 和 ScriptProcessorNode 有什么区别？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：51 Multimedia
**标签**：Web Audio、AudioWorklet、ScriptProcessorNode、实时音频、Worker
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Web Audio API 中 AudioWorklet 和 ScriptProcessorNode 两种自定义音频处理节点，说明它们的优缺点和迁移建议。

**参考答案**：

两者都用于自定义音频处理，但实现机制有本质区别。

| 维度 | ScriptProcessorNode | AudioWorklet |
|------|---------------------|--------------|
| 执行线程 | 主线程 | 独立的音频渲染线程（AudioWorkletGlobalScope） |
| 延迟 | 高（128-2048 样本缓冲） | 低（固定 128 样本） |
| 性能 | 主线程阻塞会导致爆音、卡顿 | 不阻塞主线程，更稳定 |
| 现代性 | 已废弃，不推荐使用 | 现代标准推荐方案 |
| 状态共享 | 可与主线程直接共享数据 | 通过 MessagePort 通信 |
| 浏览器支持 | 广泛但已废弃 | Chrome 66+、Edge、Firefox 76+ |

**ScriptProcessorNode 的问题**：
- 运行在主线程，主线程繁忙时无法及时生成音频，导致爆音（glitch）。
- 缓冲区大小不固定，延迟不可控。
- Web Audio 规范已将其标记为 deprecated。

**AudioWorklet 的优势**：
- 在独立的音频渲染线程执行，和主线程解耦。
- 固定 128 样本的处理块，保证低延迟。
- 可以自定义 AudioParam、多输入输出、共享缓冲区。

AudioWorklet 基本用法：

```javascript
// 注册 processor
await audioCtx.audioWorklet.addModule('noise-processor.js');

const noiseNode = new AudioWorkletNode(audioCtx, 'noise-processor');
noiseNode.connect(audioCtx.destination);
```

`noise-processor.js`：

```javascript
class NoiseProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    for (let channel = 0; channel < output.length; channel++) {
      const channelData = output[channel];
      for (let i = 0; i < channelData.length; i++) {
        channelData[i] = Math.random() * 2 - 1;
      }
    }
    return true; // 保持节点活跃
  }
}

registerProcessor('noise-processor', NoiseProcessor);
```

迁移建议：
- 新项目直接使用 AudioWorklet。
- 旧项目中的 ScriptProcessorNode 应逐步迁移。
- 需要与主线程通信时，使用 AudioWorkletNode.port.postMessage。

**评分维度**：
- 能从线程模型对比两者（35%）
- 能说明延迟和性能差异（30%）
- 能写出 AudioWorklet 基本代码（20%）
- 能给出迁移建议（15%）

**常见错误**：
- 在新项目中继续使用 ScriptProcessorNode。
- 认为 AudioWorklet 也运行在主线程。
- 在 process 方法中做耗时同步计算，导致音频线程阻塞。

**延伸追问**：
- AudioWorklet 如何与 WebAssembly 配合做高性能音频处理？
- AudioWorklet 中如何处理 AudioParam 的参数渐变？

**相关题目**：
- [FB-51-CO-B-005 AudioContext 是什么](#FB-51-CO-B-005)
- [FB-51-CO-A-014 Web Audio 音频可视化](#FB-51-CO-A-014)

**参考资源**：
- [MDN - AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet)
- [Google - AudioWorklet](https://developers.google.com/web/updates/2017/12/audio-worklet)

**口头回答版**：
> ScriptProcessorNode 是在主线程跑自定义音频处理的，主线程一卡就会爆音，已经被废弃了。AudioWorklet 是在独立的音频渲染线程里跑，延迟低、不卡主线程，是现在推荐的方式。用法是先用 audioCtx.audioWorklet.addModule 注册一个 processor 文件，然后创建 AudioWorkletNode。process 方法里处理 inputs 和 outputs，返回 true 表示保持活跃。新项目都应该用 AudioWorklet。

---

### FB-51-CP-P-024：MSE（Media Source Extensions）在流媒体播放器中的作用是什么？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：51 Multimedia
**标签**：MSE、MediaSource、SourceBuffer、流媒体、HLS、DASH
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入说明 MSE 的作用和工作原理，并解释为什么 hls.js、dash.js 等播放器库需要依赖 MSE。

**参考答案**：

**MSE 的作用**：

MSE（Media Source Extensions）是 W3C 标准，允许 JavaScript 动态构建媒体流并喂给 `<video>` 标签播放。它把传统 `<video src="...">` 的被动播放模式，转变为由 JS 主动控制数据推送的模式。

核心对象：

| 对象 | 作用 |
|------|------|
| `MediaSource` | 媒体数据源，可以附加到 video 标签 |
| `SourceBuffer` | 实际接收和解析媒体片段的缓冲区 |
| `URL.createObjectURL(mediaSource)` | 生成 MediaSource 的 blob URL |

基本流程：

```javascript
const video = document.querySelector('video');
const mediaSource = new MediaSource();
video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', () => {
  const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"');

  fetch('segment1.m4s')
    .then(res => res.arrayBuffer())
    .then(data => {
      sourceBuffer.appendBuffer(data);
    });
});
```

**为什么 hls.js / dash.js 依赖 MSE**：

1. **浏览器原生不支持 HLS/DASH**：
   - 除了 Safari 原生支持 HLS，Chrome、Firefox、Edge 需要 JS 层解析 m3u8 / mpd。
   - MSE 提供了把解析后的分片喂给 video 的入口。

2. **自适应码率（ABR）**：
   - MSE 允许 JS 根据网络状况动态切换不同码率的分片。
   - 通过切换 SourceBuffer 中的数据实现无缝清晰度切换。

3. **DRM 解密**：
   - MSE 配合 EME，可以在 JS 层处理许可证请求后，把解密数据送入 SourceBuffer。

4. **动态内容拼接**：
   - 可以在播放过程中动态插入广告、精彩片段回看等内容。

SourceBuffer 管理要点：

| 操作 | 说明 |
|------|------|
| `addSourceBuffer(mimeType)` | 添加视频或音频 SourceBuffer |
| `appendBuffer(data)` | 追加媒体数据 |
| `remove(start, end)` | 移除已播放数据，控制内存 |
| `timestampOffset` | 调整时间戳，实现拼接 |
| `abort()` | 取消当前 append 操作 |

最佳实践：
- SourceBuffer 的 `update` 状态是异步的，append 和 remove 必须串行执行。
- 定期 `remove` 已播放内容，避免内存无限增长。
- 使用 `sourceBuffers[0].buffered` 监控当前缓冲区。

**评分维度**：
- 能说明 MSE 让 JS 动态喂数据给 video（30%）
- 能写出 MediaSource 和 SourceBuffer 基本用法（30%）
- 能解释播放器库依赖 MSE 的原因（25%）
- 能说明 SourceBuffer 状态管理和内存控制（15%）

**常见错误**：
- 在 sourceopen 事件外提前操作 SourceBuffer。
- 并发调用 appendBuffer 导致错误。
- 忘记 remove 旧数据，导致内存泄漏。

**延伸追问**：
- MSE 和 Web Codecs 有什么互补关系？
- 多音轨切换时 SourceBuffer 如何管理？

**相关题目**：
- [FB-51-CO-A-009 HLS 的 m3u8 文件结构](#FB-51-CO-A-009)
- [FB-51-SC-P-022 支持多音轨切换的视频播放器](#FB-51-SC-P-022)
- [FB-51-SD-R-025 多协议播放器架构](#FB-51-SD-R-025)

**参考资源**：
- [MDN - Media Source Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)
- [W3C - Media Source Extensions](https://www.w3.org/TR/media-source-2/)

**口头回答版**：
> MSE 是浏览器标准，让 JavaScript 可以动态把媒体数据喂给 video 标签播放。核心是用 MediaSource 生成一个 blob URL 给 video.src，然后在 sourceopen 后用 addSourceBuffer 创建 SourceBuffer，用 appendBuffer 塞分片数据。hls.js、dash.js 这些库依赖 MSE 是因为除了 Safari，其他浏览器不原生支持 HLS/DASH，需要 JS 解析 m3u8/mpd 后再通过 MSE 播放。MSE 还能做 ABR 自适应码率、DRM 解密、动态插广告等。


---

## 架构题（7 道）{#architect}

### FB-51-SD-R-025：设计一个支持 HLS/DASH/WebRTC 的多协议播放器架构

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：51 Multimedia
**标签**：播放器、HLS、DASH、WebRTC、MSE、架构设计
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个网页端视频播放器 SDK，要求同时支持 HLS、DASH、WebRTC 三种协议，并说明核心模块划分和协议切换策略。

**参考答案**：

**整体架构分层**：

```text
┌─────────────────────────────────────────┐
│           Player UI / Controls          │
├─────────────────────────────────────────┤
│           Player Core API               │
│  (load, play, pause, seek, switchStream)│
├─────────────────────────────────────────┤
│  Protocol Adapters  │  DRM / EME Module │
│  HLS  DASH  WebRTC  │  Widevine/FairPlay│
├─────────────────────────────────────────┤
│      Buffer Manager  │  ABR Controller   │
├─────────────────────────────────────────┤
│      MSE Manager     │  MediaSource      │
├─────────────────────────────────────────┤
│      <video> Element / WebRTC Peer      │
└─────────────────────────────────────────┘
```

**核心模块**：

1. **Player Core API**：
   - 统一对外接口：`load(url)`、`play()`、`pause()`、`seek(time)`、`destroy()`。
   - 内部根据 URL 或配置选择对应 Protocol Adapter。

2. **Protocol Adapter**：
   - HLS Adapter：解析 m3u8，管理 TS/fMP4 分片下载。
   - DASH Adapter：解析 mpd，管理 fMP4 分片下载。
   - WebRTC Adapter：管理 RTCPeerConnection、信令、音视频轨。
   - 每个 Adapter 实现统一的 `IMediaAdapter` 接口，返回标准化的媒体段和时间线。

3. **MSE Manager**：
   - 负责创建 MediaSource、SourceBuffer。
   - 处理 append、remove、timestampOffset 等操作。
   - WebRTC 不经过 MSE，直接渲染 MediaStream。

4. **ABR Controller（自适应码率）**：
   - 收集带宽、缓冲区、设备性能数据。
   - 决策切换清晰度，HLS/DASH 生效。

5. **Buffer Manager**：
   - 维护当前缓冲区范围。
   - 预加载策略、追帧策略、seek 后重新加载。

6. **DRM / EME Module**：
   - 根据平台和内容选择 Widevine / FairPlay / PlayReady。
   - 处理许可证请求和密钥更新。

7. **UI / Controls**：
   - 自定义播放控件、字幕、音轨选择、画质菜单。
   - 与 Core 通过事件通信，保持解耦。

**协议切换策略**：

| 协议 | 适用场景 | 延迟 |
|------|---------|------|
| HLS | 点播、直播、Safari/iOS | 10-30 秒 |
| DASH | 点播、直播、跨平台 | 10-30 秒 |
| WebRTC | 互动直播、连麦、超低延迟 | < 1 秒 |

- 根据业务 URL scheme 自动选择：`webrtc://`、`.m3u8`、`.mpd`。
- 允许业务通过配置强制指定协议。
- WebRTC 失败时降级为 LL-HLS/DASH。

最佳实践：
- Adapter 层完全抽象，新增协议只需实现接口。
- 核心状态机管理播放生命周期，避免多协议状态混乱。
- 统一埋点，记录不同协议的播放成功率和质量指标。

**评分维度**：
- 能合理划分核心模块（30%）
- 能说明 Adapter 抽象和统一 API 设计（25%）
- 能说明 MSE 和 WebRTC 的渲染差异（20%）
- 能给出协议选型和降级策略（15%）
- 能考虑埋点和可观测性（10%）

**常见错误**：
- 把三种协议的实现耦合在一个大文件里。
- 忽略 WebRTC 和 HLS/DASH 在延迟和缓冲策略上的本质差异。
- 不做协议降级，导致 WebRTC 失败时直接播放失败。

**延伸追问**：
- 如果业务要求同一播放器内从 WebRTC 平滑切换到 HLS，应如何设计？
- 如何在 SDK 中支持插件化扩展？

**相关题目**：
- [FB-51-CP-P-024 MSE 在流媒体播放器中的作用](#FB-51-CP-P-024)
- [FB-51-SD-R-026 低延迟直播系统前端方案](#FB-51-SD-R-026)

**参考资源**：
- [hls.js 架构](https://github.com/video-dev/hls.js/blob/master/docs/design.md)
- [dash.js 架构](https://github.com/Dash-Industry-Forum/dash.js/wiki/Low-Latency)

**口头回答版**：
> 我会把播放器 SDK 分成几层：最上面是 UI 控件，中间是统一的核心 API 层，下面是协议适配器，每个协议一个 Adapter，比如 HLS Adapter 解析 m3u8，DASH Adapter 解析 mpd，WebRTC Adapter 管 RTCPeerConnection。HLS 和 DASH 通过 MSE 喂给 video 标签，WebRTC 直接渲染 MediaStream。还有 ABR 控制器、Buffer Manager、DRM 模块。协议切换可以根据 URL 自动判断，比如 .m3u8 走 HLS，.mpd 走 DASH，webrtc:// 走 WebRTC。WebRTC 失败可以降级到 LL-HLS。核心是用统一接口抽象，新增协议只加 Adapter 就行。

---

### FB-51-SD-R-026：设计一个低延迟直播系统的前端方案

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：51 Multimedia
**标签**：低延迟直播、WebRTC、LL-HLS、WebTransport、实时音视频
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个低延迟直播系统的前端方案，要求延迟在 1-3 秒内，支持万人以上同时观看，并说明技术选型和关键优化点。

**参考答案**：

**延迟与方案选型**：

| 方案 | 典型延迟 | 适用规模 | 复杂度 |
|------|---------|---------|--------|
| 传统 HLS/DASH | 10-30s | 大规模 | 低 |
| LL-HLS / LL-DASH | 2-8s | 大规模 | 中 |
| WebRTC | <1s | 小房间 | 高 |
| WebTransport + WebCodecs | <1s | 中等规模 | 高 |
| SRT/RTMP + 边缘转 WebRTC | 1-3s | 大规模 | 高 |

对于万人以上、1-3 秒延迟的场景，推荐 **分层混合方案**：

**1. 主播端**：
- 使用 OBS / 专业推流工具，RTMP/SRT 推流到 CDN 或直播服务器。
- 或使用浏览器 WebRTC 直接推流。

**2. 服务端**：
- 边缘节点接收 RTMP/SRT，快速转封装为 WebRTC、LL-HLS、DASH。
- 对首屏要求极高的用户走 WebRTC。
- 对并发要求极高的用户走 LL-HLS / LL-DASH。

**3. 前端播放器**：
- 优先尝试 WebRTC，失败或超量时降级到 LL-HLS。
- 播放器内部维护协议降级状态机。

**前端关键模块**：

```text
┌────────────────────────────────────┐
│         LowLatencyPlayer           │
├────────────────────────────────────┤
│  Connection Manager                │
│  WebRTC -> LL-HLS -> HLS fallback  │
├────────────────────────────────────┤
│  Latency Controller                │
│  目标延迟、追帧、倍速播放            │
├────────────────────────────────────┤
│  Jitter / Buffer Manager           │
│  动态缓冲、卡顿预测                  │
├────────────────────────────────────┤
│  Metrics & Analytics               │
│  端到端延迟、首帧、卡顿率            │
└────────────────────────────────────┘
```

**关键优化点**：

1. **目标延迟控制**：
   - 根据当前缓冲和网速，动态控制目标延迟。
   - 延迟过大时通过快进、跳帧追赶；过小时增加缓冲。

2. **首帧优化**：
   - 服务端缓存最新 GOP，播放器接入时直接下发关键帧。
   - WebRTC 通过 ICE 快速建连，LL-HLS 使用 Preload Hint 快速起播。

3. **弱网降级**：
   - WebRTC 自动降码率、分辨率。
   - LL-HLS 自动降清晰度。
   - 极端弱网只保留音频。

4. **大规模并发**：
   - WebRTC 用 SFU/MCU 架构，观众多时切换到 LL-HLS。
   - CDN 分发 LL-HLS 分片，支持海量并发。

5. **延迟度量**：
   - 播放器发送 UTC 时间戳，服务端回传接收时间，计算端到端延迟。
   - 通过 `video.currentTime` 与 UTC 时间差估算播放延迟。

最佳实践：
- 采用多协议自动降级，避免单点失败。
- 对实时互动场景用 WebRTC，对大规模观看用 LL-HLS。
- 埋点监控端到端延迟、卡顿率、协议分布。

**评分维度**：
- 能根据延迟和规模选择合理技术栈（25%）
- 能设计协议降级和连接管理（25%）
- 能说明延迟控制和首帧优化（20%）
- 能说明弱网和大规模并发策略（20%）
- 能说明延迟度量方案（10%）

**常见错误**：
- 想用单一协议同时满足超低延迟和超大规模。
- 忽略 WebRTC 在万人场景下的服务器和带宽成本。
- 只做播放器优化，不和服务端协同设计。

**延伸追问**：
- 如果要求延迟 < 500ms，方案会有什么变化？
- 万人直播间如何保证音画同步？

**相关题目**：
- [FB-51-FS-P-017 HLS 直播低延迟优化方案](#FB-51-FS-P-017)
- [FB-51-PE-P-018 WebRTC 延迟抖动和拥塞控制](#FB-51-PE-P-018)

**参考资源**：
- [WebTransport 草案](https://www.w3.org/TR/webtransport/)
- [Cloudflare - Low Latency HLS](https://www.cloudflare.com/stream/)

**口头回答版**：
> 万人以上、1 到 3 秒延迟，我建议分层混合方案。主播推流用 RTMP 或 SRT 到服务端，服务端边缘转成 WebRTC、LL-HLS、DASH。前端播放器优先 WebRTC，失败或人太多就降级到 LL-HLS。关键要做一个连接管理器做协议降级，一个延迟控制器动态追帧，一个 Jitter Buffer 管理器动态调缓冲。还要和服务端一起做首帧优化，比如缓存最新 GOP。大规模并发主要靠 LL-HLS 走 CDN，WebRTC 只给首屏要求高的用户。延迟度量可以通过 UTC 时间戳对时。

---

### FB-51-SD-R-027：设计一个浏览器端音视频剪辑工具的技术架构

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：51 Multimedia
**标签**：音视频剪辑、WebCodecs、ffmpeg.wasm、时间线、Web Worker
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个可在浏览器中运行的音视频剪辑工具，支持素材导入、时间线编辑、实时预览、导出渲染，说明核心技术选型和性能优化策略。

**参考答案**：

**功能模块划分**：

```text
┌─────────────────────────────────────────┐
│         Timeline UI / 交互层             │
│  轨道、剪辑、转场、特效、字幕              │
├─────────────────────────────────────────┤
│         Preview Engine 预览引擎          │
│  Canvas / WebGL 实时合成                   │
├─────────────────────────────────────────┤
│         Composition Model 合成模型        │
│  时间线、片段、属性、关键帧                 │
├─────────────────────────────────────────┤
│         Decoder 解码层                    │
│  WebCodecs / VideoDecoder / AudioDecoder │
├─────────────────────────────────────────┤
│         Encoder 编码层                    │
│  WebCodecs / ffmpeg.wasm                 │
├─────────────────────────────────────────┤
│         Storage 存储层                    │
│  IndexedDB / OPFS / 服务端                │
└─────────────────────────────────────────┘
```

**核心技术选型**：

| 功能 | 推荐方案 | 备选方案 |
|------|---------|---------|
| 素材解码 | WebCodecs VideoDecoder/AudioDecoder | ffmpeg.wasm |
| 预览渲染 | Canvas 2D / WebGL | 纯 CSS 不可行 |
| 音频处理 | Web Audio API + AudioWorklet | ScriptProcessorNode |
| 视频编码导出 | ffmpeg.wasm | WebCodecs VideoEncoder |
| 存储 | Origin Private File System (OPFS) | IndexedDB |
| 大文件上传 | 分片上传 + 断点续传 | 整文件上传 |

**实时预览方案**：

1. **解码**：
   - 使用 WebCodecs 按时间线需要的片段逐帧解码。
   - 预解码关键帧附近的数据，放入帧缓存池。

2. **合成**：
   - 在时间轴当前位置，根据所有可见轨道计算合成帧。
   - 使用 WebGL 做多图层混合、缩放、旋转、滤镜。
   - 音频用 Web Audio Graph 实时混音。

3. **同步**：
   - 以时间轴时钟驱动渲染，不依赖原视频播放。
   - 拖动时间线时直接seek到对应帧。

**导出渲染方案**：

```text
Composition Model
      |
      v
逐帧合成 (Canvas/WebGL)
      |
      v
VideoEncoder 编码 / ffmpeg.wasm 封装
      |
      v
MP4/WebM 文件输出
```

性能优化策略：

1. **Web Worker**：
   - 解码、编码、文件读写放 Worker，不阻塞 UI。

2. **帧缓存池**：
   - 缓存关键帧和附近帧，避免频繁 seek 解码。
   - 使用 LRU 策略管理内存。

3. **代理剪辑（Proxy Editing）**：
   - 编辑时使用低分辨率代理文件，导出时用原始高分辨率素材。

4. **增量渲染**：
   - 只渲染时间线变化的部分，静态片段可复用。

5. **OPFS**：
   - 大文件素材直接写入 Origin Private File System，避免内存占用。

最佳实践：
- 优先使用 WebCodecs 做解码，性能优于 ffmpeg.wasm。
- 导出任务复杂或浏览器不支持时， fallback 到服务端渲染。
- 自动保存时间线状态，防止崩溃丢失。

**评分维度**：
- 能合理划分功能模块（25%）
- 能给出解码、渲染、编码、存储的技术选型（30%）
- 能说明实时预览和导出渲染流程（25%）
- 能提出至少 3 项性能优化策略（20%）

**常见错误**：
- 试图用 video 标签播放多个片段来做剪辑预览，无法精确同步。
- 所有处理放在主线程，导致 UI 卡顿。
- 高清素材全部加载到内存，导致浏览器崩溃。

**延伸追问**：
- 如何实现多轨道音频的实时混音？
- 如果浏览器不支持 WebCodecs，如何优雅降级？

**相关题目**：
- [FB-51-PE-P-021 图片和视频的前端压缩方案](#FB-51-PE-P-021)
- [FB-51-CO-A-013 MediaRecorder 录制音视频](#FB-51-CO-A-013)

**参考资源**：
- [W3C - WebCodecs](https://www.w3.org/TR/webcodecs/)
- [OPFS 文档](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)

**口头回答版**：
> 浏览器端剪辑工具我会分成：时间线 UI 层、预览引擎、合成模型、解码层、编码层、存储层。解码用 WebCodecs 的 VideoDecoder/AudioDecoder，预览用 Canvas 或 WebGL 做实时合成，音频用 Web Audio 混音。导出时可以用 WebCodecs VideoEncoder 或 ffmpeg.wasm 编码封装。性能方面，解码和编码放 Web Worker，用帧缓存池避免反复 seek，大文件用 OPFS 存本地，编辑时先用低分辨率代理文件。这样能保证实时预览不卡，导出质量也高。

---

### FB-51-SC-R-028：如何实现跨浏览器的统一媒体录制方案？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：51 Multimedia
**标签**：MediaRecorder、跨浏览器、录制、兼容性、降级方案
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一个跨浏览器统一的音视频录制方案，覆盖桌面端 Chrome/Edge/Firefox/Safari，说明如何检测能力、处理格式差异和保证录制质量。

**参考答案**：

**浏览器能力检测层**：

```javascript
function getSupportedMimeTypes() {
  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ];
  return types.filter(type => MediaRecorder.isTypeSupported(type));
}
```

主要浏览器录制支持：

| 浏览器 | 推荐格式 | 备注 |
|--------|---------|------|
| Chrome / Edge | webm (VP8/VP9 + Opus) | 功能完整 |
| Firefox | webm (VP8/VP9 + Opus) | 支持良好 |
| Safari | mp4 (H.264 + AAC) | 对 webm 支持有限 |

**统一录制 SDK 架构**：

```text
┌─────────────────────────────────────┐
│         Record SDK API              │
│  start / stop / pause / resume      │
├─────────────────────────────────────┤
│      Capability Detection           │
│  isTypeSupported / feature test     │
├─────────────────────────────────────┤
│      Format Adapter                 │
│  WebM Adapter  │  MP4 Adapter       │
├─────────────────────────────────────┤
│      MediaRecorder / CanvasRecord   │
├─────────────────────────────────────┤
│      Output Normalization           │
│  统一输出 Blob + metadata            │
└─────────────────────────────────────┘
```

**关键设计点**：

1. **能力检测**：
   - 使用 `MediaRecorder.isTypeSupported()` 检测浏览器支持的 MIME 类型。
   - 对不支持 MediaRecorder 的旧浏览器，提示升级或使用插件。

2. **格式选择策略**：
   - Safari 优先选择 `video/mp4`。
   - Chrome/Firefox 优先选择 `video/webm;codecs=vp9,opus`。
   - 统一降级到最基础的支持格式。

3. **Canvas 录制兜底**：
   - 当需要录制复杂合成内容时，使用 `canvas.captureStream()` + MediaRecorder。
   - 注意帧率限制和性能开销。

4. **质量与性能平衡**：
   - 根据设备性能动态选择分辨率、帧率、码率。
   - 高端设备用 1080p 30fps，低端设备降级到 720p 15fps。

5. **输出归一化**：
   - 不同浏览器输出格式不同，但 SDK 对外返回统一的 `{ blob, mimeType, duration }` 结构。
   - 后续服务端统一转码为 MP4/WebM。

6. **异常处理**：
   - 监听 `onerror`、`onwarning`。
   - 录制失败时自动重试或降级格式。

最佳实践：
- 录制前做权限和设备检测，避免中途失败。
- 长时间录制时定期触发 `ondataavailable`，分片保存数据。
- 提供服务端转码兜底，统一最终输出格式。

**评分维度**：
- 能检测浏览器录制能力并选择格式（30%）
- 能说明不同浏览器格式差异（20%）
- 能设计统一 SDK 架构和输出归一化（25%）
- 能给出质量和异常处理策略（25%）

**常见错误**：
- 所有浏览器强制使用 webm，导致 Safari 无法播放或录制。
- 不做能力检测，直接 new MediaRecorder。
- 忽略 MediaRecorder 不同浏览器对 timeslice 和行为的支持差异。

**延伸追问**：
- 如何在录制过程中实时上传分片？
- 录制失败后如何恢复未保存的数据？

**相关题目**：
- [FB-51-CO-A-013 MediaRecorder API](#FB-51-CO-A-013)
- [FB-51-SD-R-027 浏览器端音视频剪辑工具架构](#FB-51-SD-R-027)

**参考资源**：
- [MDN - MediaRecorder.isTypeSupported](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported_static)
- [caniuse - MediaRecorder](https://caniuse.com/mediarecorder)

**口头回答版**：
> 跨浏览器录制要先做能力检测，用 MediaRecorder.isTypeSupported 看支持哪些格式。Chrome 和 Firefox 支持 webm，Safari 更偏向 mp4。我会设计一个 SDK，里面有 Capability Detection、Format Adapter，根据浏览器自动选格式，对外统一返回 Blob 和 metadata。如果录制复杂内容，可以用 canvas.captureStream 兜底。还要注意不同设备的性能差异，动态降分辨率帧率。最后输出格式不统一的话，可以让服务端再转码一次。

---

### FB-51-SD-R-029：设计一个支持 DRM 的商业视频播放器安全架构

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：51 Multimedia
**标签**：DRM、安全架构、EME、许可证、防盗录、内容保护
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个支持 DRM 的商业视频播放器安全架构，包括内容加密、许可证获取、播放解密、防盗录和防篡改等关键环节。

**参考答案**：

**整体安全架构**：

```text
                    内容分发网络 CDN
                           │
              加密视频流（CENC / SAMPLE-AES）
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    许可证服务器        业务鉴权服务          播放器 SDK
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    用户设备 + CDM
```

**关键环节设计**：

1. **内容加密**：
   - 使用 CENC（Common Encryption）对视频进行通用加密。
   - 同一加密内容可同时用于 Widevine、PlayReady、FairPlay。
   - 密钥（Key）不随内容分发，只存在许可证服务器。

2. **许可证服务器**：
   - 接收播放器发起的许可证请求。
   - 验证用户 Token、设备信息、权限。
   - 返回仅对当前会话有效的解密密钥。
   - 记录许可证发放日志，用于审计和风控。

3. **播放器 SDK**：
   - 通过 EME `requestMediaKeySystemAccess` 选择合适 CDM。
   - 处理 license 请求，附加用户凭证和设备信息。
   - 不直接持有密钥，解密由浏览器 CDM 完成。

4. **业务鉴权**：
   - 播放前校验用户登录态、会员权限、地域限制。
   - 使用短期 Token，过期后需重新获取。
   - 防止 Token 共享和重放攻击。

5. **防盗录**：
   - 使用 DRM 的 HDCP（High-bandwidth Digital Content Protection）输出保护。
   - 检测到录屏软件时提示或停止播放（部分平台支持）。
   - 在画面上叠加用户唯一水印，用于溯源。

6. **防篡改**：
   - 播放器 JS 做代码混淆和完整性校验。
   - 关键 API 调用做签名验证。
   - 检测到开发者工具或模拟器时降级或阻止播放。

7. **HTTPS 与 CORS**：
   - 所有请求走 HTTPS，防止中间人攻击。
   - 许可证接口严格限制 CORS 来源。

最佳实践：
- 采用多 DRM 方案覆盖不同平台。
- 许可证请求做限频和设备绑定。
- 安全策略分层：内容加密 + 传输安全 + 客户端防护 + 业务风控。

**评分维度**：
- 能说明 CENC 通用加密和多 DRM 分发（25%）
- 能设计许可证服务器和鉴权流程（25%）
- 能说明 EME/CDM 解密流程（20%）
- 能提出防盗录和防篡改措施（20%）
- 能考虑 HTTPS/CORS 等传输安全（10%）

**常见错误**：
- 认为前端 JS 可以直接拿到解密密钥。
- 只做 DRM 加密，忽略业务鉴权和 Token 安全。
- 过度依赖前端防录屏，忽略水印等溯源手段。

**延伸追问**：
- 如何防止用户通过浏览器开发者工具下载加密分片？
- 多设备登录共享账号时，DRM 和业务层如何协同限制？

**相关题目**：
- [FB-51-CO-A-015 前端 DRM 常见方案](#FB-51-CO-A-015)
- [FB-51-CO-P-019 Widevine/FairPlay/PlayReady 对比](#FB-51-CO-P-019)

**参考资源**：
- [W3C - EME](https://www.w3.org/TR/encrypted-media/)
- [Google - Widevine Security](https://www.widevine.com/solutions)

**口头回答版**：
> 商业 DRM 播放器安全要分多层。内容层用 CENC 通用加密，一套加密内容可以分发到 Widevine、FairPlay、PlayReady。许可证服务器负责验证用户和设备，返回解密密钥，密钥不直接给前端 JS，解密在浏览器 CDM 里完成。播放前业务层要鉴权，发短期 Token。还要做防盗录，比如 HDCP、用户水印、检测到录屏提示；前端 JS 做混淆和完整性校验，防止篡改。所有请求走 HTTPS，许可证接口严格限制 CORS。

---

### FB-51-SD-R-030：如何评估和监控一个多媒体前端平台的质量？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：51 Multimedia
**标签**：多媒体监控、QoE、QoS、可观测性、埋点、质量评估
**出现频率**：中频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一套多媒体前端平台的质量评估与监控体系，覆盖播放体验、性能、稳定性、无障碍等多个维度。

**参考答案**：

**质量指标体系**：

```text
┌─────────────────────────────────────────────────┐
│              多媒体平台质量指标                  │
├───────────────┬─────────────────────────────────┤
│   QoS 指标     │  首帧时间、卡顿率、失败率、码率  │
├───────────────┼─────────────────────────────────┤
│   QoE 指标     │  清晰度、延迟、音画同步、交互响应 │
├───────────────┼─────────────────────────────────┤
│   稳定性指标   │  崩溃率、异常率、错误恢复成功率   │
├───────────────┼─────────────────────────────────┤
│   性能指标     │  CPU/GPU、内存、电量、网络消耗   │
├───────────────┼─────────────────────────────────┤
│   无障碍指标   │  字幕覆盖率、键盘可操作率         │
└───────────────┴─────────────────────────────────┘
```

**核心监控项**：

1. **播放质量（QoE/QoS）**：
   - 首帧时间（TTFB、TTFP）。
   - 卡顿次数、卡顿时长、卡顿率。
   - 播放失败率、错误码分类。
   - 清晰度分布和切换次数。
   - 端到端延迟（直播场景）。

2. **技术实现指标**：
   - 协议分布：HLS/DASH/WebRTC 占比。
   - DRM 触发率和许可证成功率。
   - MSE Buffer 长度、SourceBuffer append 耗时。
   - WebRTC 丢包、抖动、RTT。

3. **性能与资源**：
   - CPU / GPU 占用。
   - 内存占用和增长趋势。
   - 移动设备电量消耗和发热。
   - 网络流量消耗。

4. **稳定性**：
   - JS 错误、Promise 异常。
   - 播放器 SDK 崩溃和自动恢复。
   - 浏览器兼容性分布。

5. **无障碍**：
   - 字幕开关率、字幕正确率。
   - 键盘操作路径覆盖率。
   - 屏幕阅读器兼容性。

**监控架构**：

```text
播放器 SDK 埋点
      │
      v
边缘日志网关 -> 消息队列 Kafka
                    │
        ┌───────────┼───────────┐
        v           v           v
    实时计算    离线数仓      告警平台
        │           │           │
        v           v           v
    实时监控看板   质量报告     异常告警
```

**关键实现方式**：

```javascript
// 播放器事件埋点
video.addEventListener('waiting', () => report('buffer_stall', { currentTime }));
video.addEventListener('error', (e) => report('playback_error', { code: e.target.error.code }));
video.addEventListener('loadeddata', () => report('first_frame', { ttfp }));

// 定时采样性能
setInterval(() => {
  report('performance', {
    buffered: video.buffered.length,
    currentTime: video.currentTime,
    memory: performance.memory?.usedJSHeapSize,
  });
}, 5000);
```

**质量评估方法**：

1. **健康分模型**：
   - 综合首帧、卡顿、失败、延迟等指标，计算 0-100 的健康分。
   - 按地区、运营商、设备、版本下钻分析。

2. **A/B 实验**：
   - 对比不同播放器版本、不同协议、不同缓冲策略的效果。

3. **用户反馈闭环**：
   - 收集用户上报的播放问题，与监控数据关联定位。

最佳实践：
- 埋点要轻量，避免影响播放性能。
- 关键指标实时告警，如失败率突增、卡顿率异常。
- 建立 SLA，如 99.9% 播放成功率、P99 首帧 < 2s。

**评分维度**：
- 能建立 QoS/QoE/稳定性/性能/无障碍多维指标体系（30%）
- 能说明关键监控项和采集方式（25%）
- 能设计监控架构和数据链路（20%）
- 能提出健康分模型和 SLA（15%）
- 能考虑埋点性能开销（10%）

**常见错误**：
- 只关注播放成功率，忽略用户体验指标。
- 埋点过多或采样不当，影响播放性能。
- 监控数据没有按维度下钻，难以定位问题。

**延伸追问**：
- 如何区分网络问题和服务端问题导致的卡顿？
- 如何建立播放器 SDK 的版本灰度监控？

**相关题目**：
- [FB-51-PE-A-010 视频播放卡顿排查和优化](#FB-51-PE-A-010)
- [FB-51-CO-B-008 多媒体内容无障碍访问](#FB-51-CO-B-008)

**参考资源**：
- [Google - Core Web Vitals](https://web.dev/vitals/)
- [W3C - Media Playback Quality](https://www.w3.org/TR/media-playback-quality/)

**口头回答版**：
> 多媒体平台质量监控要从几个维度建指标体系：QoS 看首帧、卡顿、失败率；QoE 看清晰度、延迟、音画同步；稳定性看崩溃和异常；性能看 CPU、内存、电量；还要看无障碍。播放器 SDK 里埋点采集这些事件和定时性能数据，经过日志网关到 Kafka，再做实时计算和离线分析。可以做一个健康分模型综合评估，按地区、运营商、版本下钻。关键指标要设 SLA 和实时告警，比如播放成功率 99.9%、P99 首帧小于 2 秒。埋点要轻量，别影响播放。

---

### FB-51-CP-R-031：多媒体前端技术未来 3-5 年的演进趋势是什么？

**题型**：综合开放题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：51 Multimedia
**标签**：多媒体趋势、WebCodecs、WebTransport、AI、AV1、云游戏
**出现频率**：低频
**预计回答时长**：8-15 分钟

**题目描述**：
请谈谈你对多媒体前端技术未来 3-5 年演进趋势的看法，以及这些趋势对前端架构师的能力要求。

**参考答案**：

**主要演进趋势**：

1. **浏览器原生多媒体能力增强**：
   - WebCodecs 成熟，前端可直接编解码，推动云端渲染、云游戏、视频编辑。
   - WebTransport 提供低延迟可靠/不可靠传输，替代 WebRTC DataChannel 部分场景。
   - WebGPU 用于高性能视频处理和 AI 推理。

2. **新编码格式普及**：
   - AV1、H.266/VVC 逐渐落地，同等画质下码率更低。
   - 浏览器对 AV1 硬解支持持续提升，前端需做 fallback 策略。

3. **低延迟直播常态化**：
   - WebRTC、LL-HLS、LL-DASH、WebTransport 多协议并存。
   - 互动直播、电商直播、云游戏对延迟要求越来越高。

4. **AI 与多媒体结合**：
   - 实时字幕、翻译、智能剪辑、画质增强。
   - WebNN / ONNX Runtime Web 让前端能跑轻量 AI 模型。
   - AIGC 内容生成和审核需求增加。

5. **沉浸式体验**：
   - WebXR 与 360 视频、VR/AR 直播结合。
   - 空间音频、光场视频等新技术逐步进入 Web。

6. **隐私和安全强化**：
   - DRM 方案更复杂，隐私计算与内容保护结合。
   - 浏览器对指纹、摄像头、麦克风权限更严格。

**对前端架构师的能力要求**：

| 能力 | 说明 |
|------|------|
| 多媒体底层原理 | 深入理解编解码、流媒体协议、传输协议 |
| 性能工程 | 能从端到端角度优化延迟、卡顿、功耗 |
| 跨平台架构 | 设计 Web/小程序/桌面/移动端统一方案 |
| AI 集成能力 | 了解模型部署、推理优化、AI 与媒体结合点 |
| 安全合规 | DRM、隐私、内容审核、数据合规 |
| 可观测性 | 建立多维质量监控和快速定位能力 |

**前端架构师应对建议**：
- 持续跟进 W3C 多媒体相关标准和 Chrome 实验性功能。
- 在业务中逐步引入 WebCodecs、WebTransport 等新技术做 POC。
- 建立多媒体技术中台，沉淀播放器、录制、剪辑、直播等能力。
- 培养团队对 FFmpeg、GStreamer 等底层工具的理解。

**评分维度**：
- 能提到 WebCodecs、WebTransport、AV1、AI 等至少 3 个趋势（40%）
- 能分析趋势对业务的影响（25%）
- 能说明对前端架构师的能力要求（25%）
- 能给出具体落地建议（10%）

**常见错误**：
- 只谈技术概念，不谈业务价值和落地路径。
- 过度追新，忽略浏览器兼容性和稳定性。
- 忽视安全和隐私趋势。

**延伸追问**：
- 如何在现有业务中渐进式引入 WebCodecs？
- 云游戏前端架构和普通视频播放器有什么本质区别？

**相关题目**：
- [FB-51-CO-A-016 Web Codecs API](#FB-51-CO-A-016)
- [FB-51-SD-R-025 多协议播放器架构](#FB-51-SD-R-025)

**参考资源**：
- [W3C - WebCodecs](https://www.w3.org/TR/webcodecs/)
- [W3C - WebTransport](https://www.w3.org/TR/webtransport/)
- [AOMedia - AV1](https://aomedia.org/av1/)

**口头回答版**：
> 未来 3 到 5 年，多媒体前端会有几个明显趋势：一是浏览器原生能力越来越强，WebCodecs 让前端能直接编解码，WebTransport 提供更低延迟传输；二是 AV1 这些新编码格式会普及，同等画质更省码率；三是低延迟直播会变成常态，WebRTC、LL-HLS、WebTransport 并用；四是 AI 和多媒体结合更紧密，比如实时字幕、翻译、智能剪辑；五是 WebXR 带来沉浸式体验。对架构师来说，不能只懂前端框架，要懂编解码、协议、性能工程、AI 部署、安全合规，还要能建立多媒体中台和监控体系。

