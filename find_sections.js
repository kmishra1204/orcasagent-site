const fs = require('fs');
const path = 'C:\\Users\\rdpadmin\\.gemini\\antigravity\\scratch\\orcasagent-site\\index.html';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log('=== Sections & IDs in index.html ===');
lines.forEach((line, i) => {
    const lineNum = i + 1;
    if (line.includes('<section') || line.includes('id=') || line.includes('class="chamber"') || line.includes('class="card"')) {
        let cleaned = line.trim();
        if (cleaned.length > 120) {
            cleaned = cleaned.substring(0, 117) + '...';
        }
        console.log(`Line ${lineNum.toString().padStart(5, ' ')}: ${cleaned}`);
    }
});
