import re

files = [
    r"C:\Users\rdpadmin\.gemini\antigravity\scratch\orcasagent-site\index.html",
    r"C:\Users\rdpadmin\.gemini\antigravity\scratch\orcasagent-site\app.js"
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace "OrcasAgent" without trademark
    content = re.sub(r'OrcasAgent(?!(™|&trade;))', 'OrcasAgent&trade;', content)
    
    # Replace standalone "Orcas " with "OrcasAgent&trade; "
    # But carefully not replacing within words or inside CSS/HTML tags/classes if possible
    # We'll just replace "Orcas " (with space) or "Orcas." 
    content = re.sub(r'\bOrcas(\s+|\.)', r'OrcasAgent&trade;\1', content)

    # For performance in app.js
    if "app.js" in file:
        content = content.replace("const particleCount = 65;", "const particleCount = 20;")
        content = content.replace("const podCount = 2;", "const podCount = 1;")
        # Fix the wake particles so it's not rendered or pushed
        content = content.replace("pod.update(width, height, targetRgb, wakeParticles);", "pod.update(width, height, targetRgb, []);")
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Branding and performance fixes applied.")
