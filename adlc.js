/**
 * OrcasAgent™ Standalone ADLC Lifecycle Simulation Engine
 * Completely standalone, theme-aware, and premium-logic-driven.
 */

let activeGlowColor = '#D112BA';
const themeGlowMap = {
    'theme-cyberpunk': '#D112BA',
    'theme-azure': '#12B8D7',
    'theme-emerald': '#16A37B',
    'theme-twilight': '#9B5DE5'
};

document.addEventListener('DOMContentLoaded', () => {
    initResponsiveDrawer();
    initThemeEngine();
    initSRECompanion();
    initADLCLifecycle();
});

// === SHARED UTILITIES ===
function initResponsiveDrawer() {
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const navItems = document.querySelectorAll('.nav-item');

    function openDrawer() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    }

    function closeDrawer() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDrawer();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeDrawer);
    }

    // Tab items switcher inside sidebar
    const tabPanes = document.querySelectorAll('.tab-pane');
    const headerTitle = document.getElementById('active-tab-title');
    const headerDesc = document.getElementById('active-tab-desc');

    const tabDescriptions = {
        'mission-control': 'Global telemetry and mesh health',
        'swarm-topology': 'Visualizing the 20 programmatic operations',
        'integrations': 'Data, compute, and workflow pathways',
        'docket-vault': 'Immutable audit trails from evidence_refs',
        'fleet-routing': 'Governing active LLM model aliases',
        'governance': 'Budget limits and approval gates',
        'runbooks': 'Auto-generated SRE documentation',
        'adlc': 'Controlled multi-cloud Agentic Development Life Cycle'
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active state
            navItems.forEach(n => n.classList.remove('active'));
            tabPanes.forEach(t => t.classList.remove('active'));

            // Add active state to selected
            item.classList.add('active');
            const targetTab = item.getAttribute('data-tab');
            const targetSection = document.getElementById(`tab-${targetTab}`);
            if (targetSection) targetSection.classList.add('active');

            // Update Header labels
            const titleLabel = item.querySelector('span').innerText;
            if (headerTitle) headerTitle.innerText = titleLabel;
            if (headerDesc) headerDesc.innerText = tabDescriptions[targetTab] || '';

            // Close mobile drawer after selection
            closeDrawer();
            
            // Dispatch resize event to let canvas redraw immediately
            window.dispatchEvent(new Event('resize'));
        });
    });
}

function initThemeEngine() {
    const themeBtns = document.querySelectorAll('.theme-btn');
    const body = document.body;

    // Load initial theme from localStorage or default to azure
    let savedTheme = localStorage.getItem('orcas-theme') || 'azure';
    savedTheme = savedTheme.replace('theme-', '');
    const initialPrefixedTheme = `theme-${savedTheme}`;

    // Apply saved theme class to body on startup
    body.classList.remove('theme-cyberpunk', 'theme-azure', 'theme-emerald', 'theme-twilight');
    body.classList.add(initialPrefixedTheme);

    // Set button active status
    themeBtns.forEach(btn => {
        const btnTheme = btn.getAttribute('data-theme');
        if (btnTheme === initialPrefixedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Set initial glow color state
    activeGlowColor = themeGlowMap[initialPrefixedTheme] || '#12B8D7';
    document.documentElement.style.setProperty('--color-primary', activeGlowColor);

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.getAttribute('data-theme'); // e.g. "theme-cyberpunk"
            
            // Reset theme classes on body
            body.classList.remove('theme-cyberpunk', 'theme-azure', 'theme-emerald', 'theme-twilight');
            body.classList.add(selectedTheme);

            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Align active JS accent color
            activeGlowColor = themeGlowMap[selectedTheme] || '#12B8D7';
            document.documentElement.style.setProperty('--color-primary', activeGlowColor);

            // Save clean theme name without prefix to match index.html
            const cleanTheme = selectedTheme.replace('theme-', '');
            localStorage.setItem('orcas-theme', cleanTheme);

            // Re-render any active visuals
            window.dispatchEvent(new Event('themeChanged'));
        });
    });
}

function initSRECompanion() {
    const avatar = document.getElementById('companion-avatar');
    const bubble = document.getElementById('companion-bubble');
    const closeBtn = document.getElementById('btn-companion-close');
    const textEl = document.getElementById('companion-text');

    if (!avatar || !bubble || !closeBtn || !textEl) return;

    const insights = [
        "Insight: Swarm analytical models (Claude Sonnet) are consuming 74% of the operational budget. Consider shifting low-tier extractions to Gemini Flash.",
        "Warning: Domain 'shady-api.ru' was intercepted twice by boundary controls during Docker sandboxing. Intrusion logs saved to webui_gateway.db.",
        "SRE Alert: High concurrency detected on orchestrator.db state spine. Performance locks may VACUUM gateway schemas.",
        "Budget Optimizer: 34% of database query intents were blocked today. Adjust human approval rules to reduce dev latency gates."
    ];

    let currentInsightIndex = 0;

    avatar.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const activeInsight = insights[currentInsightIndex];
        textEl.innerText = activeInsight;
        currentInsightIndex = (currentInsightIndex + 1) % insights.length;

        bubble.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        bubble.classList.add('hidden');
    });

    document.addEventListener('click', () => {
        bubble.classList.add('hidden');
    });
}

// Helper: Hex to RGB converter for Canvas opacity mapping
function hexToRgb(hex) {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

// === ADLC CORE ENGINE ===
// ==========================================================================
// 14. ADLC (Agentic Development Life Cycle) Interactive Pipeline Controller
// ==========================================================================
function initADLCLifecycle() {
    // Pipeline visualizer navigation steps
    const steps = document.querySelectorAll('#tab-adlc .pipeline-step');
    const connectors = document.querySelectorAll('#tab-adlc .pipeline-connector-line');
    const panels = document.querySelectorAll('#tab-adlc .adlc-step-panel');
    
    const workspaceTitle = document.getElementById('adlc-workspace-title');
    const workspaceBadge = document.getElementById('adlc-workspace-badge');
    const statusIndicator = document.getElementById('adlc-stage-status-indicator');

    // Step 1 Elements
    const brdBtns = document.querySelectorAll('.brd-btn');
    const btnAnalyze = document.getElementById('btn-adlc-analyze');
    const console1 = document.getElementById('adlc-console-1');
    
    // Step 2 Elements
    const btnGotoSandbox = document.getElementById('btn-adlc-goto-sandbox');
    const docketCodeView = document.getElementById('adlc-docket-code-view');
    const docketIdVal = document.getElementById('docket-id-val');
    const docketSaVal = document.getElementById('docket-sa-val');
    const docketToolsVal = document.getElementById('docket-tools-val');
    const docketLlmVal = document.getElementById('docket-llm-val');
    
    // Step 3 Elements
    const btnEval = document.getElementById('btn-adlc-eval');
    const console3 = document.getElementById('adlc-console-3');
    const fillSafety = document.getElementById('eval-fill-safety');
    const fillSmoke = document.getElementById('eval-fill-smoke');
    const fillLatency = document.getElementById('eval-fill-latency');
    
    // Step 4 Elements
    const btnSign = document.getElementById('btn-adlc-sign');
    const console4 = document.getElementById('adlc-console-4');
    const sigNameInput = document.getElementById('adlc-signature-name');
    const sigWave = document.getElementById('sig-wave-animation');
    const sigPlaceholder = document.getElementById('sig-placeholder');
    const sigStamp = document.getElementById('sig-stamp-seal');
    
    // Step 5 Elements
    const cloudBtns = document.querySelectorAll('.cloud-btn');
    const btnDeploy = document.getElementById('btn-adlc-deploy');
    const cloudNotes = document.getElementById('cloud-integration-summary');
    const iacCodeView = document.getElementById('adlc-iac-code-view');
    const iacViewerLabel = document.getElementById('iac-viewer-label');
    
    // Step 6 Elements
    const btnComplete = document.getElementById('btn-adlc-complete');
    const console6 = document.getElementById('adlc-console-6');

    // Global Active Step tracker
    let activeStepNum = 1;
    let completedSteps = new Set();
    let selectedBrd = 'telco';
    let selectedCloud = 'gcp';
    let currentTypingInterval = null;
    let metricInterval = null;
    let tickerInterval = null;

    // BRD Template Data
    const brdData = {
        telco: {
            name: "TelcoQuoteReadinessAgent",
            docket_id: "DCK-TELCO-7105",
            workload_identity: "sa-telco-readiness@nsam-prod.iam",
            least_privilege_tools: ["sim_billing_lookup", "check_catalog_inventory"],
            authorized_llm: "gemini-2.5-flash@enterprise",
            budget_limit: "500,000 tokens / hour",
            capabilities: ["Billing Reads", "Product Catalog Access", "Quote Verification"]
        },
        finance: {
            name: "FinCreditSanctionsAgent",
            docket_id: "DCK-FIN-9204",
            workload_identity: "sa-fin-scoring@nsam-prod.iam",
            least_privilege_tools: ["kyc_audit_verification", "credit_bureau_query", "sanction_list_checker"],
            authorized_llm: "gemini-2.5-pro-highconcurrency",
            budget_limit: "200,000 tokens / hour",
            capabilities: ["KYC Audits", "Credit Score Lookup", "Risk Boundary Verification", "Sanctions Screening"]
        },
        healthcare: {
            name: "HealthCarePlanValidator",
            docket_id: "DCK-HEALTH-5812",
            workload_identity: "sa-health-policy@nsam-prod.iam",
            least_privilege_tools: ["phi_masking_proxy", "insurance_rule_evaluator", "hcls_spec_conformer"],
            authorized_llm: "gemini-2.5-flash-phi-compliant",
            budget_limit: "800,000 tokens / hour",
            capabilities: ["Patient Data Masking", "Policy Rules Engine", "Encryption Gateway", "HIPAA Proxy Validation"]
        }
    };

    // This state object carries over the active workload context (Preset OR custom parsed NLP requirements)
    let compiledDocketData = { ...brdData.telco };

    // Tab details for header text overrides
    const stepHeaders = {
        1: { title: "Intent Analysis & Requirement Decomposition", badge: "STAGE 1 ACTIVE" },
        2: { title: "Declarative Docket Packaging & Envelope Compilation", badge: "STAGE 2 ACTIVE" },
        3: { title: "Isolated Sandbox & Automated Safety Evaluations", badge: "STAGE 3 ACTIVE" },
        4: { title: "CISO Authority Desk & Cryptographic Ledger Signing", badge: "STAGE 4 ACTIVE" },
        5: { title: "Multi-Cloud Infrastructure-as-Code Compilation", badge: "STAGE 5 ACTIVE" },
        6: { title: "Dynamic Attestation & Active Solace Mesh Ingestion", badge: "STAGE 6 ACTIVE" }
    };

    // Helper: Dynamic JSON Syntax Highlighter
    function highlightJSON(jsonStr) {
        return jsonStr
            .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")(\s*:)/g, '<span class="syn-key">$1</span>$3')
            .replace(/"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"/g, (match) => {
                if (match.includes('syn-key')) return match;
                return `<span class="syn-str">${match}</span>`;
            })
            .replace(/\b(true|false)\b/g, '<span class="syn-bool">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="syn-num">$1</span>');
    }

    // Helper: Terminal Typing simulation
    function simulateTerminalTyping(consoleEl, lines, onCompleteCallback) {
        if (currentTypingInterval) clearTimeout(currentTypingInterval);
        consoleEl.innerHTML = '';
        let lineIndex = 0;
        
        statusIndicator.innerText = "PROCESSING";
        statusIndicator.className = "badge text-glow-cyan animate-pulse";

        function printNextLine() {
            if (lineIndex < lines.length) {
                const lineData = lines[lineIndex];
                const span = document.createElement('span');
                span.className = `line ${lineData.type || ''}`;
                
                // Typing effect for the text
                span.innerHTML = lineData.text;
                consoleEl.appendChild(span);
                consoleEl.scrollTop = consoleEl.scrollHeight;
                
                lineIndex++;
                currentTypingInterval = setTimeout(printNextLine, lineData.delay || 400);
            } else {
                statusIndicator.innerText = "SUCCESS";
                statusIndicator.className = "badge text-glow-green";
                if (onCompleteCallback) onCompleteCallback();
            }
        }
        
        printNextLine();
    }

    // Switch Panel
    function switchToStep(stepNum) {
        activeStepNum = stepNum;
        
        // Update visualizer steps
        steps.forEach(s => {
            const num = parseInt(s.getAttribute('data-step'));
            s.classList.remove('active');
            if (num === stepNum) {
                s.classList.add('active');
            }
            if (completedSteps.has(num)) {
                s.classList.add('completed');
            } else {
                s.classList.remove('completed');
            }
        });

        // Update connectors
        connectors.forEach((conn, index) => {
            const stepBefore = index + 1;
            conn.classList.remove('active', 'completed');
            if (completedSteps.has(stepBefore)) {
                if (stepBefore < stepNum) {
                    conn.classList.add('completed');
                } else {
                    conn.classList.add('active');
                }
            }
        });

        // Toggle step panels
        panels.forEach(panel => {
            if (panel.id === `adlc-panel-${stepNum}`) {
                panel.classList.remove('hidden');
            } else {
                panel.classList.add('hidden');
            }
        });

        // Update titles
        if (stepHeaders[stepNum]) {
            workspaceTitle.innerHTML = `<i class="fa-solid ${getStepIcon(stepNum)}"></i> ${stepHeaders[stepNum].title}`;
            workspaceBadge.innerText = stepHeaders[stepNum].badge;
        }

        // Set status text
        if (completedSteps.has(stepNum)) {
            statusIndicator.innerText = "COMPLETED";
            statusIndicator.className = "badge text-glow-green";
        } else {
            statusIndicator.innerText = "STANDBY";
            statusIndicator.className = "badge";
        }
    }

    function getStepIcon(stepNum) {
        const icons = {
            1: "fa-wand-magic-sparkles",
            2: "fa-box-archive",
            3: "fa-vial-virus",
            4: "fa-signature",
            5: "fa-cloud-arrow-up",
            6: "fa-arrows-spin"
        };
        return icons[stepNum] || "fa-gear";
    }

    // Allow user to click completed or active steps in the tracker
    steps.forEach(s => {
        s.addEventListener('click', () => {
            const targetNum = parseInt(s.getAttribute('data-step'));
            if (completedSteps.has(targetNum) || targetNum === activeStepNum || completedSteps.has(targetNum - 1)) {
                switchToStep(targetNum);
            }
        });
    });

    // ==========================================
    // STEP 1: Intent Decomposition
    // ==========================================
    brdBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            brdBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedBrd = btn.getAttribute('data-brd');
            
            // Clear custom input if switching templates to avoid confusion
            const customTextarea = document.getElementById('custom-intent-textarea');
            if (customTextarea) customTextarea.value = '';
        });
    });

    if (btnAnalyze) {
        btnAnalyze.addEventListener('click', () => {
            // Check if user entered a custom intent in the textarea
            let customText = "";
            const customTextarea = document.getElementById('custom-intent-textarea');
            if (customTextarea) {
                customText = customTextarea.value.trim();
            }

            let data = { ...brdData[selectedBrd] };
            if (customText.length > 0) {
                // Parse the custom requirement string to configure a dynamic custom docket!
                data.name = "CustomOrchestratedAgent";
                data.docket_id = "DCK-CUSTOM-" + Math.floor(1000 + Math.random() * 9000);
                data.workload_identity = "sa-custom-agent@nsam-prod.iam";
                
                const tools = [];
                const capabilities = [];
                
                if (/mysql|postgres|db|database|sql|log/i.test(customText)) {
                    tools.push("query_secure_database", "validate_schema_bounds");
                    capabilities.push("Database Queries", "Schema Integrity Auditing");
                }
                if (/slack|teams|alert|notify|mail|email|pagerduty/i.test(customText)) {
                    tools.push("dispatch_slack_alert", "pagerduty_incident_trigger");
                    capabilities.push("Outbound Alert Notification Routing");
                }
                if (/s3|bucket|gcs|azure blob|storage|file|upload/i.test(customText)) {
                    tools.push("read_storage_object", "write_secure_blob");
                    capabilities.push("Object Storage Sync");
                }
                
                if (tools.length === 0) {
                    tools.push("execute_limited_subshell", "read_transient_logs");
                    capabilities.push("Generic Task Sandbox Execution");
                }
                
                let model = "gemini-2.5-flash@enterprise";
                if (/pro|complex|reasoning|critical/i.test(customText)) {
                    model = "gemini-2.5-pro-highconcurrency";
                } else if (/compliant|hipaa|phi/i.test(customText)) {
                    model = "gemini-2.5-flash-phi-compliant";
                }
                
                data.least_privilege_tools = tools;
                data.authorized_llm = model;
                data.budget_limit = "300,000 tokens / hour";
                data.capabilities = capabilities;
            }

            // Save state globally so stages 2-6 consume the exact compiled context!
            compiledDocketData = { ...data };

            const logs = [
                { text: `[ORCHESTRATOR] Initializing Requirement Decomposition Engine...`, type: 'system', delay: 250 },
                { text: `[ORCHESTRATOR] Input Method: ${customText.length > 0 ? "Custom Natural Intent" : "Preset Enterprise BRD Blueprint"}`, type: 'system', delay: 250 },
                { text: `[ORCHESTRATOR] Selected Business Requirement Target: <span class='highlight'>${data.name}</span>`, type: 'system', delay: 250 },
                { text: `[ORCHESTRATOR] Decomposing plain-text natural intent into declarative schemas...`, type: 'text', delay: 400 },
                { text: `[ORCHESTRATOR] Identified target platform service actions: [${data.least_privilege_tools.join(', ')}]`, type: 'text', delay: 350 },
                { text: `[ORCHESTRATOR] Hardening capability bounds to least-privilege matrix...`, type: 'warning', delay: 300 },
                { text: `[ORCHESTRATOR] Generating transient workload identity: <span class='highlight'>${data.workload_identity}</span>`, type: 'text', delay: 350 },
                { text: `[ORCHESTRATOR] Binding secure foundational model target: ${data.authorized_llm}`, type: 'text', delay: 250 },
                { text: `[SUCCESS] Immutable envelope boundaries established! Generated Docket ID: ${data.docket_id}`, type: 'success', delay: 300 }
            ];

            btnAnalyze.disabled = true;
            btnAnalyze.innerHTML = `<i class="fa-solid fa-arrows-spin fa-spin"></i> Compiling...`;

            simulateTerminalTyping(console1, logs, () => {
                completedSteps.add(1);
                
                // Hydrate Step 2 elements immediately
                docketIdVal.innerText = `"${data.docket_id}"`;
                docketSaVal.innerText = `"${data.workload_identity}"`;
                docketToolsVal.innerText = JSON.stringify(data.least_privilege_tools);
                docketLlmVal.innerText = `"${data.authorized_llm}"`;

                const rawDocket = {
                    "docket_version": "1.0.0",
                    "docket_id": data.docket_id,
                    "metadata": {
                        "agent_name": data.name,
                        "owner": "kmishra1204@users.noreply.github.com",
                        "created_at": new Date().toISOString()
                    },
                    "runtime_constraints": {
                        "authorized_llm_endpoints": [data.authorized_llm],
                        "workload_identity": data.workload_identity,
                        "least_privilege_tools": data.least_privilege_tools,
                        "token_budget_limit_hour": parseInt(data.budget_limit.replace(/,/g, '').split(' ')[0])
                    },
                    "compliance": {
                        "phi_conformant": selectedBrd === 'healthcare' || /hipaa|phi/i.test(customText),
                        "financial_fiduciary_audit": selectedBrd === 'finance',
                        "data_leak_shield": true
                    }
                };

                docketCodeView.innerHTML = highlightJSON(JSON.stringify(rawDocket, null, 2));

                btnAnalyze.disabled = false;
                btnAnalyze.innerHTML = `<i class="fa-solid fa-gears animate-spin-slow"></i> Re-Analyze Requirements`;
                
                // Update sandbox id in stage 3 template
                const sandboxIdDisplay = document.getElementById('sandbox-id-display');
                if (sandboxIdDisplay) sandboxIdDisplay.innerText = data.docket_id;

                // Prompt progression
                setTimeout(() => {
                    switchToStep(2);
                }, 1000);
            });
        });
    }

    // ==========================================
    // STEP 2: Docket Review
    // ==========================================
    if (btnGotoSandbox) {
        btnGotoSandbox.addEventListener('click', () => {
            completedSteps.add(2);
            switchToStep(3);
        });
    }

    // ==========================================
    // STEP 3: Sandbox Evals
    // ==========================================
    if (btnEval) {
        btnEval.addEventListener('click', () => {
            const data = compiledDocketData;
            
            // Boot Visual Container Widget
            const statusInd = document.getElementById('sandbox-status-indicator');
            if (statusInd) {
                statusInd.innerText = "BOOTING";
                statusInd.className = "badge text-glow-cyan animate-pulse";
            }

            const shield = document.getElementById('gvisor-shield');
            const boxIcon = document.getElementById('container-box-icon');
            const firewallLogs = document.getElementById('sandbox-firewall-logs');

            if (shield) {
                shield.style.borderColor = 'var(--color-primary)';
                shield.style.boxShadow = '0 0 15px var(--color-glow)';
                shield.style.borderStyle = 'solid';
                shield.classList.add('animate-pulse');
            }
            if (boxIcon) {
                boxIcon.style.color = 'var(--color-primary)';
            }
            if (firewallLogs) {
                firewallLogs.innerText = "Loading micro-kernel boundaries...";
                firewallLogs.style.color = '#9ca3af';
            }

            const logs = [
                { text: `[SANDBOX] Provisioning hermetically sealed sandbox on gVisor runtime...`, type: 'system', delay: 250 },
                { text: `[SANDBOX] Pulling secure foundational image 'orcas-sandbox-node:latest'...`, type: 'text', delay: 350 },
                { text: `[SANDBOX] Loading compiled docket envelope <span class='highlight'>${data.docket_id}</span>`, type: 'text', delay: 250 },
                { text: `[SANDBOX] Initializing Test Suite 1: Safety & Prompt Injection Shield`, type: 'system', delay: 200 },
                { text: `[TEST] Fuzzing system endpoints with adversarial prompt matrices...`, type: 'text', delay: 450 },
                { text: `[TEST] Prompt Injection Shield: 100% of leaked intents blocked. (Confidence score: 0.998)`, type: 'success', delay: 250 },
                { text: `[SANDBOX] Initializing Test Suite 2: Functional Smoke Loops`, type: 'system', delay: 200 },
                { text: `[TEST] Simulating capabilities: [${data.least_privilege_tools.join(', ')}]`, type: 'text', delay: 350 },
                { text: `[TEST] System mock responses verified. Mock Database integrity matched.`, type: 'success', delay: 250 },
                { text: `[SANDBOX] Initializing Test Suite 3: Latency & Budget Throttles`, type: 'system', delay: 200 },
                { text: `[TEST] Simulating concurrency loads (100 parallel mock sessions)...`, type: 'text', delay: 350 },
                { text: `[TEST] Latency performance standard: Median 120ms, Peak 310ms (Within SLA).`, type: 'success', delay: 250 },
                { text: `[SUCCESS] Sandbox assertions passed completely! Evidence payload hashes compiled.`, type: 'success', delay: 350 }
            ];

            btnEval.disabled = true;
            btnEval.innerHTML = `<i class="fa-solid fa-arrows-spin fa-spin"></i> Executing Evals...`;

            // Reset progress fills
            fillSafety.style.width = '0%';
            fillSmoke.style.width = '0%';
            fillLatency.style.width = '0%';

            // Active metrics updater interval
            if (metricInterval) clearInterval(metricInterval);
            metricInterval = setInterval(() => {
                const cpu = Math.floor(25 + Math.random() * 50);
                const mem = Math.floor(135 + Math.random() * 70);
                
                const cpuVal = document.getElementById('sandbox-cpu-val');
                const cpuFill = document.getElementById('sandbox-cpu-fill');
                if (cpuVal) cpuVal.innerText = `${cpu}%`;
                if (cpuFill) cpuFill.style.width = `${cpu}%`;

                const memVal = document.getElementById('sandbox-mem-val');
                const memFill = document.getElementById('sandbox-mem-fill');
                if (memVal) memVal.innerText = `${mem} MB`;
                if (memFill) memFill.style.width = `${(mem / 256) * 100}%`;

                const netVal = document.getElementById('sandbox-network-val');
                if (netVal) {
                    netVal.innerText = Math.random() > 0.3 ? "ISOLATED" : "FILTERED";
                    netVal.style.color = "var(--color-primary)";
                }

                // Simulate Firewall Blockingexfiltration attempts
                if (firewallLogs) {
                    const blocklist = ["evil-sink.ru", "data-exfil.net", "attacker-dns.org", "shady-domain.co"];
                    const randomBlocked = blocklist[Math.floor(Math.random() * blocklist.length)];
                    firewallLogs.innerHTML = `<span style="color: var(--color-red-500); font-weight: bold;"><i class="fa-solid fa-ban"></i> Intercepted & Blocked Outbound Connection to ${randomBlocked}</span>`;
                }
            }, 600);

            simulateTerminalTyping(console3, logs, () => {
                completedSteps.add(3);
                btnEval.disabled = false;
                btnEval.innerHTML = `<i class="fa-solid fa-vial"></i> Re-Run Sandbox Evals`;
                
                if (statusInd) {
                    statusInd.innerText = "VERIFIED";
                    statusInd.className = "badge text-glow-green";
                }
                if (shield) {
                    shield.classList.remove('animate-pulse');
                    shield.style.borderColor = '#10B981';
                    shield.style.boxShadow = '0 0 15px rgba(16,185,129,0.3)';
                }
                if (boxIcon) {
                    boxIcon.style.color = '#10B981';
                }
                if (firewallLogs) {
                    firewallLogs.innerHTML = `<span style="color: #10B981; font-weight: bold;"><i class="fa-solid fa-circle-check"></i> gVisor Isolation Verified (Zero leaks detected)</span>`;
                }

                clearInterval(metricInterval);

                setTimeout(() => {
                    switchToStep(4);
                }, 1000);
            });

            // Animate progress bars synchronously with typing logs
            setTimeout(() => fillSafety.style.width = '100%', 1000);
            setTimeout(() => fillSmoke.style.width = '100%', 2000);
            setTimeout(() => fillLatency.style.width = '100%', 3000);
        });
    }

    // ==========================================
    // STEP 4: CISO Authority Signing
    // ==========================================
    if (sigNameInput) {
        sigNameInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            const statusEl = document.getElementById('keypair-status');
            const pubEl = document.getElementById('pub-key-hash');
            const privEl = document.getElementById('priv-key-hash');

            if (val.length > 0) {
                sigWave.classList.add('active');
                sigPlaceholder.innerHTML = `<span style="font-family: 'Mrs Saint Delafield', 'Caveat', cursive; font-size: 2.8rem; color: var(--color-primary); font-weight: 500; text-shadow: 0 0 10px var(--color-glow);">${val}</span>`;
                
                if (statusEl) {
                    statusEl.innerText = "KEYPAIR COMPILED";
                    statusEl.style.color = "var(--color-primary)";
                    statusEl.className = "text-glow-cyan animate-pulse";
                }

                // Create a deterministic hash from the typed signature name
                let hashNum = 0;
                for (let i = 0; i < val.length; i++) {
                    hashNum = val.charCodeAt(i) + ((hashNum << 5) - hashNum);
                    hashNum = hashNum & hashNum; // Convert to 32bit integer
                }
                const seedPub = Math.abs(hashNum).toString(16).padEnd(16, 'f').slice(0, 16);
                const seedPriv = Math.abs(hashNum * 1204).toString(16).padEnd(16, 'a').slice(0, 16);

                if (pubEl) pubEl.innerText = `0x3a4b${seedPub}89c2de${seedPub}ef01`;
                if (privEl) privEl.innerText = `0x9e12${seedPriv}1a4b${seedPriv}cd89`;

                if (val.length >= 3) {
                    btnSign.removeAttribute('disabled');
                } else {
                    btnSign.setAttribute('disabled', 'true');
                }
            } else {
                sigWave.classList.remove('active');
                sigPlaceholder.innerText = "Awaiting signature...";
                if (statusEl) {
                    statusEl.innerText = "UNGENERATED";
                    statusEl.style.color = "#6b7280";
                    statusEl.className = "";
                }
                if (pubEl) pubEl.innerText = "0x0000000000000000000000000000000000000000000000000000000000000000...";
                if (privEl) privEl.innerText = "0x0000000000000000000000000000000000000000000000000000000000000000";
                btnSign.setAttribute('disabled', 'true');
            }
        });
    }

    if (btnSign) {
        btnSign.addEventListener('click', () => {
            const data = compiledDocketData;
            const sigName = sigNameInput.value.trim();
            const logs = [
                { text: `[LEDGER] Contacting decentralized authority key broker...`, type: 'system', delay: 250 },
                { text: `[LEDGER] Verifying authority credential matching identity: <span class='highlight'>${sigName}</span>`, type: 'text', delay: 350 },
                { text: `[LEDGER] Digesting sandboxed evidence bundle with docket DCK-${data.docket_id}`, type: 'text', delay: 250 },
                { text: `[LEDGER] Hashing algorithm: SHA-256`, type: 'text', delay: 150 },
                { text: `[LEDGER] Signing with cryptographic ECDSA Secp256k1 key-pair...`, type: 'warning', delay: 400 },
                { text: `[LEDGER] Generated Signature hash: 0x${Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')}`, type: 'success', delay: 350 },
                { text: `[SUCCESS] Seal registered in Audit Ledger! Payload locked dynamically.`, type: 'success', delay: 250 }
            ];

            btnSign.disabled = true;
            btnSign.innerHTML = `<i class="fa-solid fa-arrows-spin fa-spin"></i> Sealing Docket...`;

            simulateTerminalTyping(console4, logs, () => {
                completedSteps.add(4);
                btnSign.disabled = false;
                btnSign.innerHTML = `<i class="fa-solid fa-signature"></i> CISO Authorize & Seal`;
                
                // Show Holographic Approved Stamp
                sigStamp.classList.remove('hidden');
                sigStamp.classList.add('sealed');

                const statusEl = document.getElementById('keypair-status');
                if (statusEl) {
                    statusEl.innerText = "AUDIT SECURED";
                    statusEl.style.color = "#10B981";
                    statusEl.className = "text-glow-green";
                }

                setTimeout(() => {
                    switchToStep(5);
                    // Generate Initial IaC notes and code based on selectedCloud
                    updateCloudIntegrationPanel();
                    updateCloudTopologySVG();
                }, 2000);
            });
        });
    }

    // ==========================================
    // STEP 5: Infrastructure as Code Compilation
    // ==========================================
    cloudBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cloudBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedCloud = btn.getAttribute('data-cloud');
            updateCloudIntegrationPanel();
            updateCloudTopologySVG();
        });
    });

    const cloudConfigs = {
        gcp: {
            label: "GCP Terraform Variables (agent.tfvars.json)",
            notes: "GCP implementation enforces **Workload Identity Federation** inside GKE clusters. Maps GCP service accounts to container pods automatically. Enforces strict container containment inside gVisor secured node-pools.",
            code: (data) => `{
  "google_project_id": "nsam-enterprise-prod",
  "region": "us-central1",
  "gke_cluster_name": "nsam-gke-core",
  "agent_docket_id": "${data.docket_id}",
  "workload_identity_sa": "${data.workload_identity}",
  "capabilities_bound": ${JSON.stringify(data.capabilities)},
  "gvisor_sandbox_enabled": true,
  "enforce_egress_restrictions": true,
  "solace_ingress_proxy_ip": "10.128.4.15",
  "tags": {
    "orchestrated_by": "OrcasAgent",
    "owner": "kmishra1204"
  }
}`
        },
        azure: {
            label: "Azure Helm Configurations (agent-values.yaml)",
            notes: "Azure integration relies on **Microsoft Entra Workload ID** and maps federated credentials to Azure Key Vault secrets provider. Employs AKS pods isolated inside security-hardened Fargate-style system configurations.",
            code: (data) => `# Azure AKS Entra Workload Identity values
agentName: "${data.name}"
docketId: "${data.docket_id}"
azureServiceAccount: "${data.workload_identity}"
keyVaultName: "nsam-prod-kv"
secretsBound:
  - "authorized-llm-token"
  - "solace-broker-credentials"
capabilities: ${JSON.stringify(data.capabilities)}
podAnnotations:
  azure.workload.identity/use: "true"
securityContext:
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  allowPrivilegeEscalation: false`
        },
        aws: {
            label: "AWS CloudFormation & TF Configuration (agent-eks.tfvars.json)",
            notes: "AWS deployment consumes **IAM Roles for Service Accounts (IRSA)** for least-privilege AWS SDK calls. Container executes inside AWS EKS Fargate profiles with locked secure AWS security group bounds.",
            code: (data) => `{
  "aws_account_id": "120412041204",
  "aws_region": "us-east-1",
  "eks_cluster_id": "nsam-eks-prod",
  "iam_role_arn": "arn:aws:iam::120412041204:role/nsam-${data.name}-irsa",
  "fargate_profile_name": "fargate-agents-restricted",
  "docket_ref": "${data.docket_id}",
  "solace_mesh_endpoint": "tcp://broker-vpc-endpoint.us-east-1.elb.amazonaws.com:55555",
  "subnets": ["subnet-0123456789abcdef0", "subnet-0123456789abcdef1"],
  "kms_key_arn": "arn:aws:kms:us-east-1:120412041204:key/nsam-agent-storage-key"
}`
        },
        hybrid: {
            label: "Rancher & On-Premises Config (agent-rancher.yaml)",
            notes: "Hybrid deployments run inside virtualized bare-metal Rancher environments. Enforces on-prem gateway routing and encrypts data-at-rest. Syncs directly via secure Solace dynamic event channels.",
            code: (data) => `# Rancher Custom Deployment manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: "${data.name.toLowerCase()}"
  namespace: "nsam-agents"
  labels:
    orcasagent.ai/governed-by: "NSAM"
    orcasagent.ai/docket-id: "${data.docket_id}"
spec:
  replicas: 3
  template:
    metadata:
      annotations:
        solace.mesh/egress-topic: "nsam/deployments/${data.docket_id.toLowerCase()}"
    spec:
      containers:
        - name: agent-container
          image: "orcasagent-registry.local/${data.name.toLowerCase()}:latest"
          env:
            - name: WORKLOAD_IDENTITY
              value: "${data.workload_identity}"
            - name: LLM_GATEWAY_URL
              value: "https://llm-gateway.nsam.local"
            - name: MAX_TOKENS_HOUR
              value: "300000"
`
        }
    };

    function updateCloudIntegrationPanel() {
        const data = compiledDocketData;
        const config = cloudConfigs[selectedCloud];
        
        iacViewerLabel.innerText = config.label;
        cloudNotes.innerHTML = `<i class="fa-solid fa-circle-info text-glow-cyan" style="font-size: 1rem; margin-top: 2px;"></i><div>${config.notes}</div>`;
        iacCodeView.innerHTML = highlightJSON(config.code(data));
    }

    function updateCloudTopologySVG() {
        const label = document.getElementById('target-cloud-label');
        const iconContainer = document.getElementById('target-cloud-icon-div');
        if (!label || !iconContainer) return;

        if (selectedCloud === 'gcp') {
            label.innerText = 'GCP GKE';
            iconContainer.innerHTML = '<i id="target-cloud-icon" class="fa-brands fa-google" style="font-size: 11px; color: #4285F4;"></i>';
        } else if (selectedCloud === 'azure') {
            label.innerText = 'AZURE AKS';
            iconContainer.innerHTML = '<i id="target-cloud-icon" class="fa-brands fa-microsoft" style="font-size: 11px; color: #00A4EF;"></i>';
        } else if (selectedCloud === 'aws') {
            label.innerText = 'AWS EKS';
            iconContainer.innerHTML = '<i id="target-cloud-icon" class="fa-brands fa-aws" style="font-size: 11px; color: #FF9900;"></i>';
        } else if (selectedCloud === 'hybrid') {
            label.innerText = 'HYBRID RANCHER';
            iconContainer.innerHTML = '<i id="target-cloud-icon" class="fa-solid fa-network-wired" style="font-size: 10px; color: var(--color-primary);"></i>';
        }
    }

    if (btnDeploy) {
        btnDeploy.addEventListener('click', () => {
            const data = compiledDocketData;
            
            btnDeploy.disabled = true;
            btnDeploy.innerHTML = `<i class="fa-solid fa-arrows-spin fa-spin"></i> Triggering Dev Pipelines...`;

            // Display standard DevOps logs on IaC compile console
            const iacLogs = [
                `[IAC] Fetching infrastructure templates for selected cluster archetype...`,
                `[IAC] Injecting secure metadata context: ${data.docket_id}`,
                `[IAC] Verified: Docker secure base image digest verified to be on white-list.`,
                `[IAC] Executing dry-run syntax audit: 'terraform validate' / 'helm lint'`,
                `[SUCCESS] 0 syntax errors detected. Template is sound.`,
                `[IAC] Pushing compiled dynamic deployment matrices to pre-approved CI/CD pipelines...`,
                `[SUCCESS] Deployment payload dispatched successfully! Awaiting cluster synchronization.`
            ];

            // Animate glowing path packet traversal in SVG!
            const glowingPath = document.getElementById('svg-flow-path-glowing');
            if (glowingPath) {
                glowingPath.style.display = 'block';
                glowingPath.style.strokeDashoffset = '320';
                glowingPath.style.transition = 'none';
                
                // Trigger reflow
                glowingPath.getBoundingClientRect();
                
                glowingPath.style.transition = 'stroke-dashoffset 2.5s linear';
                glowingPath.style.strokeDashoffset = '0';
            }

            // Render sequentially
            let index = 0;
            iacCodeView.innerHTML = '';
            
            function printIaCLog() {
                if (index < iacLogs.length) {
                    const span = document.createElement('span');
                    span.className = `line ${iacLogs[index].includes('SUCCESS') ? 'success' : 'system'}`;
                    span.innerHTML = iacLogs[index];
                    iacCodeView.appendChild(span);
                    iacCodeView.scrollTop = iacCodeView.scrollHeight;
                    index++;
                    setTimeout(printIaCLog, 350);
                } else {
                    completedSteps.add(5);
                    btnDeploy.disabled = false;
                    btnDeploy.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Re-Generate IaC & Promote`;
                    
                    setTimeout(() => {
                        switchToStep(6);
                        triggerMeshSyncSimulation();
                    }, 1000);
                }
            }
            printIaCLog();
        });
    }

    // ==========================================
    // STEP 6: Solace Mesh Synchronization
    // ==========================================
    function triggerMeshSyncSimulation() {
        const data = compiledDocketData;
        const logs = [
            { text: `[SOLACE] Ingress connection open. Dynamic event broker ready on port 55555.`, type: 'system', delay: 250 },
            { text: `[SOLACE] Ingesting deployment audit payload for DCK envelope <span class='highlight'>${data.docket_id}</span>`, type: 'text', delay: 350 },
            { text: `[SOLACE] Cryptographic hash verified. CISO signature: APPROVED.`, type: 'success', delay: 250 },
            { text: `[SOLACE] Mapping agent workload identity inside live Mesh Topology...`, type: 'text', delay: 400 },
            { text: `[SOLACE] Synchronization event dispatched to all gateway routing brokers.`, type: 'system', delay: 250 },
            { text: `[SOLACE] Hydrating local capability table in 'webui_gateway.db' registry.`, type: 'text', delay: 400 },
            { text: `[SOLACE] Registered agent service: '${data.name}' with authorized tools.`, type: 'success', delay: 300 },
            { text: `[SOLACE] Live heartbeat synchronized! Emitting operations pulse telemetry.`, type: 'system', delay: 250 },
            { text: `[SYSTEM] OrcasAgent™ ADLC Deployment lifecycle successfully synchronized!`, type: 'success', delay: 300 }
        ];

        simulateTerminalTyping(console6, logs, () => {
            completedSteps.add(6);
        });

        // Initialize Live Mesh Event Ticker Stream
        const streamContainer = document.getElementById('mesh-event-ticker-stream');
        if (streamContainer) {
            streamContainer.innerHTML = '';
            if (tickerInterval) clearInterval(tickerInterval);

            let eventCount = 1;
            tickerInterval = setInterval(() => {
                const span = document.createElement('div');
                span.className = 'line';
                span.style.fontFamily = 'var(--font-mono)';
                span.style.fontSize = '0.65rem';
                span.style.color = '#10B981';
                span.style.borderLeft = '2px solid var(--color-cyan-500)';
                span.style.paddingLeft = '6px';
                span.style.marginBottom = '4px';
                span.style.animation = 'fadeInSlide 0.2s ease';

                const timestamp = new Date().toISOString();
                const latency = Math.floor(10 + Math.random() * 40);
                const mockEvent = {
                    "event_id": `evt-mesh-${1000 + eventCount}`,
                    "timestamp": timestamp,
                    "publisher": data.name,
                    "docket_id": data.docket_id,
                    "telemetry": {
                        "heartbeat_ms": latency,
                        "status": "HEALTHY",
                        "active_sessions": Math.floor(1 + Math.random() * 8)
                    }
                };

                span.innerHTML = `<span style="color: #6b7280;">[${timestamp.split('T')[1].slice(0,8)}]</span> <span style="color: var(--color-cyan-500); font-weight: bold;">PUBLISH</span> <span style="color: #ffffff;">${JSON.stringify(mockEvent)}</span>`;
                streamContainer.appendChild(span);
                streamContainer.scrollTop = streamContainer.scrollHeight;

                eventCount++;
                
                // Limit maximum stream elements to 10 to prevent overflow
                if (streamContainer.children.length > 8) {
                    streamContainer.removeChild(streamContainer.firstChild);
                }
            }, 1200);
        }
    }

    if (btnComplete) {
        btnComplete.addEventListener('click', () => {
            // Show premium success overlay modal
            showCustomSuccessModal();
        });
    }

    function showCustomSuccessModal() {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.backdropFilter = 'blur(10px)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.style.animation = 'fadeInSlide 0.3s ease';

        const card = document.createElement('div');
        card.className = 'widget card-glass';
        card.style.maxWidth = '500px';
        card.style.width = '90%';
        card.style.padding = '30px';
        card.style.textAlign = 'center';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'center';
        card.style.gap = '16px';
        card.style.border = '1px solid var(--color-primary)';
        card.style.boxShadow = '0 0 30px var(--color-glow)';

        const successIcon = document.createElement('div');
        successIcon.innerHTML = `<i class="fa-solid fa-circle-check" style="font-size: 4rem; color: #10B981; filter: drop-shadow(0 0 10px rgba(16,185,129,0.4));"></i>`;
        
        const title = document.createElement('h3');
        title.innerText = 'ADLC RELEASE COMPLETE';
        title.style.fontSize = '1.4rem';
        title.style.fontWeight = '800';
        title.style.letterSpacing = '0.05em';
        title.style.color = '#FFF';

        const bodyText = document.createElement('p');
        bodyText.innerHTML = `Orchestrator agent <span style="color: var(--color-primary); font-weight: bold;">${compiledDocketData.name}</span> has been successfully designed, vetted, signed, provisioned via Infrastructure-as-Code templates, and synchronised within the Solace Event Mesh!`;
        bodyText.style.fontSize = '0.88rem';
        bodyText.style.lineHeight = '1.5';
        bodyText.style.color = 'rgba(255,255,255,0.75)';

        const closeButton = document.createElement('button');
        closeButton.className = 'btn-primary';
        closeButton.style.padding = '10px 24px';
        closeButton.style.borderRadius = '6px';
        closeButton.style.fontSize = '0.85rem';
        closeButton.style.fontWeight = '600';
        closeButton.style.cursor = 'pointer';
        closeButton.innerText = 'Back to Pipeline Control';
        
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
            
            // Clear intervals
            if (tickerInterval) clearInterval(tickerInterval);
            if (metricInterval) clearInterval(metricInterval);

            // Reset state
            completedSteps.clear();
            sigNameInput.value = '';
            sigWave.classList.remove('active');
            sigPlaceholder.innerText = "Awaiting signature...";
            sigStamp.className = "sig-stamp hidden";
            btnSign.setAttribute('disabled', 'true');
            
            // Clean consoles
            console1.innerHTML = `<span class="line text-muted">[SYSTEM] Ready for requirements analysis.</span>`;
            console3.innerHTML = `<span class="line text-muted">[SYSTEM] Sandbox idle. Awaiting test initiation.</span>`;
            console4.innerHTML = `<span class="line text-muted">[SYSTEM] Awaiting signature. Audit trail initialized.</span>`;
            console6.innerHTML = `<span class="line text-muted">[SYSTEM] Listening on topic: "nsam/deployment/registry"</span>`;
            
            const streamContainer = document.getElementById('mesh-event-ticker-stream');
            if (streamContainer) {
                streamContainer.innerHTML = `<span class="line text-muted" style="color: #6b7280; font-style: italic;">Awaiting mesh handshake attestation...</span>`;
            }

            const glowingPath = document.getElementById('svg-flow-path-glowing');
            if (glowingPath) {
                glowingPath.style.display = 'none';
            }

            const keypairStatus = document.getElementById('keypair-status');
            const pubHash = document.getElementById('pub-key-hash');
            const privHash = document.getElementById('priv-key-hash');
            if (keypairStatus) {
                keypairStatus.innerText = "UNGENERATED";
                keypairStatus.style.color = "#6b7280";
                keypairStatus.className = "";
            }
            if (pubHash) pubHash.innerText = "0x0000000000000000000000000000000000000000000000000000000000000000...";
            if (privHash) privHash.innerText = "0x0000000000000000000000000000000000000000000000000000000000000000";

            fillSafety.style.width = '0%';
            fillSmoke.style.width = '0%';
            fillLatency.style.width = '0%';

            compiledDocketData = { ...brdData.telco };
            switchToStep(1);
        });

        card.appendChild(successIcon);
        card.appendChild(title);
        card.appendChild(bodyText);
        card.appendChild(closeButton);
        modal.appendChild(card);
        document.body.appendChild(modal);
    }
}


