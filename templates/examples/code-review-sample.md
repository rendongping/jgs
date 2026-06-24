# Code Review 记录示例

> 本文件展示一次完整的 PR Review 记录，供团队参考。

## PR 信息

- **PR 标题**：feat: 优化商品详情页图片加载
- **PR 链接**：#1234
- **作者**：李四
- **Review 者**：张三
- **分支**：`feature/pdp-image-optimization` → `main`

## Review 结论

✅ **通过，但需修改后合并（Approve with comments）**

## 发现的问题

### 1. 性能问题：图片懒加载缺少占位符

**位置**：`src/components/ProductImage/index.tsx:45`

**问题描述**：
图片懒加载时未设置占位符尺寸，导致图片进入视口前布局抖动（CLS 增加）。

**建议修改**：
```tsx
// 修改前
<img src={placeholder} data-src={src} loading="lazy" />

// 修改后
<div style={{ aspectRatio: `${width}/${height}` }}>
  <img src={placeholder} data-src={src} loading="lazy" width={width} height={height} />
</div>
```

**作者回复**：已修复，使用 aspect-ratio 容器包裹图片。

### 2. 可维护性问题：魔法数字未定义常量

**位置**：`src/utils/image.ts:12`

**问题描述**：
图片压缩阈值使用硬编码 `500 * 1024`，建议提取为命名常量。

**建议修改**：
```typescript
const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
```

**作者回复**：已提取常量。

### 3. 安全问题：URL 拼接未做校验

**位置**：`src/utils/image.ts:28`

**问题描述**：
直接使用模板字符串拼接 CDN URL，如果 `imageId` 包含特殊字符可能导致安全问题。

**建议修改**：
```typescript
const encodedId = encodeURIComponent(imageId);
return `https://cdn.example.com/${encodedId}`;
```

**作者回复**：已添加 `encodeURIComponent`。

## 正面反馈

- 图片 AVIF 降级策略设计合理，兼容旧浏览器。
- 使用 `srcset` 实现响应式图片，值得推广。
- 单元测试覆盖了主要场景。

## 最终检查清单

- [x] 功能正确
- [x] 代码可读性良好
- [x] 性能优化有效
- [x] 安全问题已修复
- [x] 测试覆盖充分
- [x] 文档已更新

## 合并时间

2026-01-20 14:30

---

**Review 者**：张三  
**最后更新**：2026-06-24
