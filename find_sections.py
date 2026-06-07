import re

path = r"C:\Users\rdpadmin\.gemini\antigravity\scratch\orcasagent-site\index.html"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print("=== Sections & IDs ===")
for i, line in enumerate(lines, 1):
    # look for section tags, id attributes, or main containers
    if "<section" in line or "id=" in line or "class=\"chamber\"" in line or "class=\"card\"" in line:
        # extract id, class, or section tag if present
        cleaned = line.strip()
        if len(cleaned) > 120:
            cleaned = cleaned[:117] + "..."
        print(f"Line {i:5d}: {cleaned}")
