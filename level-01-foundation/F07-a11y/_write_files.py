#!/usr/bin/env python3
"""Write expanded a11y files."""

import base64, sys

# File 1: 01-学习文档.md content encoded as base64
file1_b64 = ""

# File 2: 02-练习册.md content encoded as base64
file2_b64 = ""

# File 3: 03-面试题.md content encoded as base64
file3_b64 = ""

if len(sys.argv) > 1 and sys.argv[1] == "write":
    import os
    d = "D:/111/front/level-01-foundation/F07-a11y"
    for fname, b64 in [("01-学习文档.md", file1_b64), ("02-练习册.md", file2_b64), ("03-面试题.md", file3_b64)]:
        path = os.path.join(d, fname)
        content = base64.b64decode(b64).decode("utf-8")
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Written {len(content)} bytes to {path}")
else:
    print("Script loaded. Run with 'write' argument to write files.")
