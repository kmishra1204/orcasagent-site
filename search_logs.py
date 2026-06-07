import json
import re

log_path = r"C:\Users\rdpadmin\.gemini\antigravity\brain\55a68191-d27e-43c6-b94d-726ff7a7431c\.system_generated\logs\transcript.jsonl"

found_svgs = []
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            # check if tool calls are present
            if 'tool_calls' in data:
                for tc in data['tool_calls']:
                    # check if write_to_file or replace_file_content for orcas-cute.svg or similar
                    args = tc.get('arguments', {})
                    if isinstance(args, str):
                        try:
                            args = json.loads(args)
                        except:
                            pass
                    if isinstance(args, dict):
                        target = args.get('TargetFile', '') or args.get('targetFile', '')
                        if 'orcas-cute.svg' in target or 'orcas-logo-full.svg' in target or 'spinner.svg' in target:
                            content = args.get('CodeContent', '') or args.get('ReplacementContent', '')
                            found_svgs.append({
                                'target': target,
                                'step': data.get('step_index'),
                                'tool': tc.get('name'),
                                'content': content[:200] + '...' if len(content) > 200 else content
                            })
        except Exception as e:
            pass

print(f"Found {len(found_svgs)} files matching:")
for idx, s in enumerate(found_svgs):
    print(f"[{idx}] Step {s['step']}: {s['target']} ({s['tool']})")
    print(s['content'])
    print("-" * 40)
