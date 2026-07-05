#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate and append architecture-domain interview questions to by-domain/*.md."""

import re
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOMAIN_DIR = ROOT / "interview-bank" / "by-domain"

FILES = {
    "25": "25-system-architecture.md",
    "26": "26-micro-frontend.md",
    "27": "27-performance.md",
    "28": "28-quality.md",
    "29": "29-data-state.md",
    "30": "30-observability.md",
    "31": "31-security-architecture.md",
    "32": "32-real-time.md",
    "33": "33-internationalization.md",
    "34": "34-visualization-graphics.md",
    "35": "35-serverless-edge.md",
    "36": "36-data-engineering.md",
}

LEVEL_EMOJI = {"B": "🟢 基础", "A": "🟡 进阶", "P": "🔴 深入", "R": "⚫ 架构"}
LEVEL_NAME = {"B": "初级", "A": "高级", "P": "专家", "R": "架构师"}
TYPE_NAME = {
    "CO": "概念题", "CA": "代码分析题", "CD": "手写代码题",
    "SC": "场景设计题", "SD": "系统设计题", "FS": "框架原理题",
    "PE": "性能优化题", "SE": "安全题", "EN": "工程化题",
    "SS": "软技能题", "CP": "综合开放题",
}

DEFAULT_SCORING = {
    "CO": ["概念准确性（40%）：是否准确说出核心定义与原理", "前端映射/举例能力（40%）：能否结合实际场景或框架说明", "边界与权衡（20%）：是否理解适用场景和限制"],
    "CA": ["问题定位能力（40%）：能否快速找出代码缺陷", "优化/修复方案（40%）：是否给出具体、可落地的改进", "代码质量意识（20%）：边界、可读性、健壮性"],
    "CD": ["实现正确性（40%）：代码能否满足需求并处理边界", "设计合理性（30%）：数据结构、算法、API 设计", "代码质量（30%）：可读性、可维护性、性能"],
    "SC": ["场景分析（30%）：能否识别关键约束和风险", "方案设计（40%）：架构/流程是否清晰、可扩展", "落地细节（30%）：异常处理、监控、灰度、回滚"],
    "SD": ["架构分层与模块划分（30%）：是否职责清晰", "核心设计能力（35%）：数据流、状态、通信、扩展性", "可观测与治理（35%）：监控、灰度、回滚、安全、成本"],
    "FS": ["原理理解（40%）：是否抓住源码核心机制", "实现细节（35%）：对关键代码路径、边界情况的把握", "应用能力（25%）：能否举一反三解决实际问题"],
    "PE": ["问题定位（30%）：能否准确判断性能瓶颈", "优化手段（40%）：方案是否具体、有效、可落地", "度量验证（30%）：是否建立指标、监控和回归机制"],
    "SE": ["风险识别（40%）：能否发现潜在安全威胁", "防御方案（40%）：是否给出多层、可落地的防护", "安全意识（20%）：是否理解纵深防御和最小权限"],
    "EN": ["工具/流程理解（40%）：是否熟悉 CI/CD、构建、测试等实践", "方案合理性（35%）：是否匹配团队规模与业务场景", "效率与安全（25%）：是否考虑缓存、增量、权限、回滚"],
    "SS": ["思路清晰（40%）：是否有结构化表达", "沟通协作（35%）：是否体现跨团队推动能力", "可落地性（25%）：方案是否现实、有度量"],
    "CP": ["思维深度（40%）：能否穿透表层看本质", "维度覆盖（30%）：是否考虑技术、组织、成本、风险", "落地可行性（30%）：是否有具体步骤和度量方式"],
}


def get_max_seq(filepath: Path) -> dict:
    text = filepath.read_text(encoding="utf-8")
    pattern = re.compile(r"FB-(\d{2})-([A-Z]{2})-([BAPR])-(\d{3})")
    max_seq = {}
    for _, t, l, s in pattern.findall(text):
        key = (t, l)
        n = int(s)
        if n > max_seq.get(key, 0):
            max_seq[key] = n
    return max_seq


def generate_answer(points: list, extra: str = "") -> str:
    lines = ["核心要点："]
    for p in points:
        lines.append(f"- {p}")
    if extra:
        lines.append("")
        lines.append(extra)
    return "\n".join(lines)


def build_q(spec: dict) -> dict:
    if "answer" in spec:
        return spec
    points = spec.get("points", [])
    extra = spec.get("extra", "")
    spec["answer"] = generate_answer(points, extra)
    if "scoring" not in spec:
        spec["scoring"] = DEFAULT_SCORING.get(spec["type"], DEFAULT_SCORING["CO"])
    if "errors" not in spec:
        spec["errors"] = spec.get("pitfalls", ["忽视边界条件", "理论与实践脱节"])
    if "oral" not in spec:
        spec["oral"] = f"{spec['title']}的关键在于{'、'.join(points[:2]) if points else '理解核心原理'}，同时注意{'、'.join(spec['errors'][:2]) if spec.get('errors') else '常见陷阱'}。"
    if "freq" not in spec:
        spec["freq"] = "中频"
    if "time" not in spec:
        spec["time"] = "5-8 分钟"
    if "follow_up_right" not in spec:
        spec["follow_up_right"] = "如果深入到这个方案的生产落地，还需要考虑哪些监控和回滚点？"
    if "follow_up_wrong" not in spec:
        spec["follow_up_wrong"] = "如果从实际约束（团队规模、业务规模）出发，这个方案哪些部分可以先简化？"
    if "related" not in spec:
        spec["related"] = []
    if "resources" not in spec:
        spec["resources"] = []
    return spec


def render_question(domain: str, qid: str, q: dict) -> str:
    q = build_q(q)
    lines = [
        f"### {qid}：{q['title']}",
        "",
        f"**题型**：{TYPE_NAME[q['type']]}",
        f"**难度**：{LEVEL_EMOJI[q['level']]}",
        f"**岗位层级**：{q.get('role', LEVEL_NAME[q['level']])}",
        f"**面试知识域**：{domain} {q['domain_name']}",
        f"**标签**：{q['tags']}",
        f"**出现频率**：{q['freq']}",
        f"**预计回答时长**：{q['time']}",
        "",
        "**题目描述**：",
        q["desc"],
        "",
        "**参考答案**：",
        q["answer"].strip(),
        "",
        "**评分维度**：",
    ]
    for dim in q["scoring"]:
        lines.append(f"- {dim}")
    lines.extend(["", "**常见错误**："])
    for err in q["errors"]:
        lines.append(f"- {err}")
    lines.extend(["", "**延伸追问**：", f"- 如果候选人答对了，可追问：{q['follow_up_right']}", f"- 如果候选人答错了，可引导：{q['follow_up_wrong']}"])
    lines.extend(["", "**相关题目**："])
    for rel in q.get("related", []):
        lines.append(f"- {rel}")
    lines.extend(["", "**参考资源**："])
    for res in q.get("resources", []):
        lines.append(f"- {res}")
    lines.extend(["", "**口头回答版**：", f"> {q['oral'].strip()}", ""])
    return "\n".join(lines)


def append_questions(domain: str, questions: list):
    filename = FILES[domain]
    filepath = DOMAIN_DIR / filename
    max_seq = get_max_seq(filepath)
    next_seq = {k: v + 1 for k, v in max_seq.items()}
    blocks = []
    for q in questions:
        q = build_q(q)
        t, l = q["type"], q["level"]
        key = (t, l)
        seq = next_seq.get(key, 1)
        next_seq[key] = seq + 1
        qid = f"FB-{domain}-{t}-{l}-{seq:03d}"
        blocks.append(render_question(domain, qid, q))
    with filepath.open("a", encoding="utf-8") as f:
        f.write("\n".join(blocks))
    print(f"[{domain}] appended {len(questions)} questions to {filename}")


if __name__ == "__main__":
    pass
