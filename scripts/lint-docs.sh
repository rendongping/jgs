#!/bin/bash
# 前端架构师知识库文档规范检查脚本
# 用法：bash scripts/lint-docs.sh

set -e

echo "=== 开始文档规范检查 ==="

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

ERRORS=0
WARNINGS=0

# 检查 24 个领域的三件套完整性
echo ""
echo "[检查 1/6] 三件套完整性"
for dir in $(find level-* -mindepth 1 -maxdepth 1 -type d); do
  for file in "01-学习文档.md" "02-练习册.md" "03-面试题.md"; do
    if [ ! -f "$dir/$file" ]; then
      echo "缺少文件：$dir/$file"
      ERRORS=$((ERRORS + 1))
    fi
  done
done
if [ "$ERRORS" -eq 0 ]; then
  echo "三件套完整"
fi

# 检查学习文档是否包含 TL;DR
echo ""
echo "[检查 2/6] 学习文档 TL;DR"
missing_tldr=0
for file in level-*/**/01-学习文档.md; do
  if ! grep -q "## 核心要点（TL;DR）" "$file"; then
    echo "缺少 TL;DR：$file"
    missing_tldr=$((missing_tldr + 1))
  fi
done
if [ "$missing_tldr" -eq 0 ]; then
  echo "所有学习文档都有 TL;DR"
else
  ERRORS=$((ERRORS + missing_tldr))
fi

# 检查面试题是否包含评分维度
echo ""
echo "[检查 3/6] 面试题评分维度"
missing_score=0
for file in level-*/**/03-面试题.md; do
  if ! grep -q "评分维度" "$file"; then
    echo "缺少评分维度：$file"
    missing_score=$((missing_score + 1))
  fi
done
if [ "$missing_score" -eq 0 ]; then
  echo "所有面试题都有评分维度"
else
  ERRORS=$((ERRORS + missing_score))
fi

# 检查文档末尾是否有最后更新时间
echo ""
echo "[检查 4/6] 最后更新时间"
missing_update=0
for file in level-*/**/*.md; do
  if ! grep -q "最后更新" "$file"; then
    echo "缺少最后更新时间：$file"
    missing_update=$((missing_update + 1))
  fi
done
if [ "$missing_update" -eq 0 ]; then
  echo "所有文档都有最后更新时间"
else
  ERRORS=$((ERRORS + missing_update))
fi

# 检查文档标题层级是否超过四级
echo ""
echo "[检查 5/6] 标题层级"
too_deep=0
for file in level-*/**/*.md docs/*.md; do
  if grep -qE "^#####+ " "$file"; then
    echo "标题层级超过四级：$file"
    too_deep=$((too_deep + 1))
  fi
done
if [ "$too_deep" -eq 0 ]; then
  echo "标题层级符合规范"
else
  WARNINGS=$((WARNINGS + too_deep))
fi

# 检查 README 和进阶规划是否存在
echo ""
echo "[检查 6/6] 索引文件"
for file in README.md 前端架构师进阶规划.md CHANGELOG.md docs/STYLE-GUIDE.md docs/CONTRIBUTING.md; do
  if [ ! -f "$file" ]; then
    echo "缺少文件：$file"
    ERRORS=$((ERRORS + 1))
  fi
done
if [ "$ERRORS" -eq 0 ]; then
  echo "索引文件齐全"
fi

# 统计
echo ""
echo "=== 检查完成 ==="
echo "错误数：$ERRORS"
echo "警告数：$WARNINGS"

if [ "$ERRORS" -gt 0 ]; then
  echo "检查未通过，请修复错误"
  exit 1
else
  echo "检查通过"
  exit 0
fi
