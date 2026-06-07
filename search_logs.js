const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\rdpadmin\\.gemini\\antigravity\\brain\\55a68191-d27e-43c6-b94d-726ff7a7431c\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(logPath)) {
    console.error('Log file does not exist');
    process.exit(1);
}

const lines = fs.readFileSync(logPath, 'utf-8').split('\n');
const foundSvgs = [];

for (let line of lines) {
    if (!line.trim()) continue;
    try {
        const data = JSON.parse(line);
        if (data.tool_calls) {
            for (let tc of data.tool_calls) {
                let args = tc.arguments;
                if (typeof args === 'string') {
                    try {
                        args = JSON.parse(args);
                    } catch (e) {}
                }
                if (args && typeof args === 'object') {
                    const target = args.TargetFile || args.targetFile || '';
                    if (target.includes('orcas-cute.svg') || target.includes('orcas-logo-full.svg') || target.includes('spinner.svg')) {
                        const content = args.CodeContent || args.ReplacementContent || '';
                        foundSvgs.push({
                            target,
                            step: data.step_index,
                            tool: tc.name,
                            content: content.length > 300 ? content.slice(0, 300) + '...' : content
                        });
                    }
                }
            }
        }
    } catch (e) {
        // ignore JSON errors
    }
}

console.log(`Found ${foundSvgs.length} files matching:`);
for (let i = 0; i < foundSvgs.length; i++) {
    const s = foundSvgs[i];
    console.log(`[${i}] Step ${s.step}: ${s.target} (${s.tool})`);
    console.log(s.content);
    console.log('-'.repeat(40));
}
