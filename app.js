// Global theme state for matching cybernetic telemetry elements
let currentTheme = 'azure';

document.addEventListener('DOMContentLoaded', () => {
    initSitePreloader();
    initEcosystemChambers();
    initHashRouter();
    initOperatingModel();
    initSecondBrainGraph();
    initModelRoutingFilter();
    initDocketExplorer();
    initAssessmentForm();
    initAuraThemeSelector();
    initVideoDemoPlayer();
    initAmbientParticles();
    initCardGlowEffects();
    initExpandableSections();
    initSandboxFactory();
    initControlPlaneExplorer();
    initOrcaCompanion();
    initBrandChamber();
});

/* ==========================================================================
   Aura Theme Selector (Real-time Custom Property Injection)
   ========================================================================== */
function initAuraThemeSelector() {
    const themeButtons = document.querySelectorAll('.theme-selector-btn');
    
    // Theme profile mappings
    const themes = {
        cyberpunk: {
            '--color-cyan-500': '#bc34fa',
            '--color-navy-900': '#071A44',
            '--color-ink-950': '#041026',
            '--glow-cyan': 'rgba(188, 52, 250, 0.4)'
        },
        emerald: {
            '--color-cyan-500': '#16A37B',
            '--color-navy-900': '#062B21',
            '--color-ink-950': '#021610',
            '--glow-cyan': 'rgba(22, 163, 123, 0.4)'
        },
        twilight: {
            '--color-cyan-500': '#E9A11B',
            '--color-navy-900': '#291404',
            '--color-ink-950': '#170a01',
            '--glow-cyan': 'rgba(233, 161, 27, 0.4)'
        },
        azure: {
            '--color-cyan-500': '#12B8D7',
            '--color-navy-900': '#071A44',
            '--color-ink-950': '#041026',
            '--glow-cyan': 'rgba(18, 184, 215, 0.4)'
        }
    };

    // Set initial theme based on active button
    const activeBtn = document.querySelector('.theme-selector-btn.active');
    if (activeBtn) {
        currentTheme = activeBtn.dataset.theme;
        document.body.classList.add(`theme-${currentTheme}`);
    }

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const themeName = btn.dataset.theme;
            const themeTokens = themes[themeName];
            
            if (themeTokens) {
                // Update global state
                currentTheme = themeName;

                // Apply variables to root document
                Object.keys(themeTokens).forEach(key => {
                    document.documentElement.style.setProperty(key, themeTokens[key]);
                });
                
                // Toggle global dark-active and theme classes
                themeButtons.forEach(b => {
                    document.body.classList.remove(`theme-${b.dataset.theme}`);
                });
                document.body.classList.add(`theme-${themeName}`);

                if (themeName !== 'azure') {
                    document.body.classList.add('dark-active');
                } else {
                    document.body.classList.remove('dark-active');
                }
            }
        });
    });
}

/* ==========================================================================
   Operating Model Interactive Step Controller
   ========================================================================== */
function initOperatingModel() {
    const stepBtns = document.querySelectorAll('.model-step-btn');
    const stepPanels = document.querySelectorAll('.model-step-panel');
    const heroNodes = document.querySelectorAll('.hero-flow-node');

    function setActiveStep(stepId) {
        // Toggle step tab buttons
        stepBtns.forEach(btn => {
            if (btn.dataset.step === stepId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Toggle corresponding text/graphic panels
        stepPanels.forEach(panel => {
            if (panel.id === `step-panel-${stepId}`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        // Highlight matching hero SVG node if present
        heroNodes.forEach(node => {
            if (node.dataset.step === stepId) {
                node.classList.add('active');
                node.setAttribute('stroke', 'var(--color-cyan-500)');
                node.setAttribute('stroke-width', '3');
            } else {
                node.classList.remove('active');
                node.setAttribute('stroke', 'var(--color-border-200)');
                node.setAttribute('stroke-width', '1.5');
            }
        });
    }

    // Attach tab button listeners
    stepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveStep(btn.dataset.step);
        });
    });

    // Attach hero SVG flow nodes listener
    heroNodes.forEach(node => {
        node.addEventListener('click', () => {
            setActiveStep(node.dataset.step);
            // Smooth scroll to the operating model explanation if clicked from hero
            document.querySelector('#operating-model').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* ==========================================================================
   Second Brain Node Graph Interaction (Click to inspect Neo4j node evidence)
   ========================================================================== */
function initSecondBrainGraph() {
    const graphNodes = document.querySelectorAll('.svg-node');
    const nodeTitle = document.getElementById('selected-node-title');
    const nodeType = document.getElementById('selected-node-type');
    const nodeDesc = document.getElementById('selected-node-desc');
    const nodeProof = document.getElementById('selected-node-proof');
    
    // Mock Node Metadata matching content briefs
    const nodeDetails = {
        project: {
            title: 'Project Context Node: "SRE-Runbook-Automate"',
            type: 'Core Workspace',
            desc: 'Defines the workspace context inside NSAM, linking technical targets and owner boundaries.',
            proof: 'Authenticated by FDE-Identity Signature G-0923'
        },
        knowledge: {
            title: 'Knowledge Node: "Service-SLA-Policy.pdf"',
            type: 'Vectorized Memory',
            desc: 'Contains semantic chunks and metadata of corporate compliance bounds, ingested into the Neo4j Graph.',
            proof: 'Matched via OpenAI Text-Embedding-3, 94.2% confidence'
        },
        agent: {
            title: 'Agent Node: "OrcasAgent&trade;-Orchestrator"',
            type: 'Active Orchestrator',
            desc: 'Coordinates the multi-agent task execution, managing sub-agent spawning and model routing.',
            proof: 'Active ID: OA-PROD-90324'
        },
        docket: {
            title: 'Docket Node: "DK-RUNBOOK-87391"',
            type: 'Governed Work Record',
            desc: 'The official block-docket containing task scope, parameters, verification plan, and approval status.',
            proof: 'Signed by platform lead: RELEASE_APPROVED'
        },
        proof: {
            title: 'Proof Node: "Sandbox-Validation-Log"',
            type: 'Dry-run Outcome',
            desc: 'Captured output logs, CLI return codes, and system telemetry proving safety compliance inside the sandboxed runtime.',
            proof: 'All 12 security validation assertions PASSED'
        },
        evidence: {
            title: 'Evidence Node: "Runtime-Network-Audit"',
            type: 'Observation Artifact',
            desc: 'Persistent graph logs detailing precisely what API calls were made and which file systems were mutated.',
            proof: 'Recorded to irreversible local audit-docket'
        },
        outcome: {
            title: 'Outcome Node: "Runbook-Executed-OK"',
            type: 'Operational Result',
            desc: 'The operational result validating that the original intent was fully delivered and saved into persistent memory.',
            proof: 'SLA metric achieved. Response time restored under 200ms'
        }
    };

    graphNodes.forEach(node => {
        node.addEventListener('click', () => {
            // Manage UI selected state
            graphNodes.forEach(n => n.classList.remove('selected'));
            node.classList.add('selected');
            
            const nodeId = node.dataset.node;
            const data = nodeDetails[nodeId];
            
            if (data) {
                // Update display panel
                nodeTitle.textContent = data.title;
                nodeType.textContent = data.type;
                nodeDesc.textContent = data.desc;
                nodeProof.textContent = data.proof;
                
                // Add a dynamic highlight animation
                const detailBox = document.querySelector('.graph-node-details');
                detailBox.style.animation = 'none';
                detailBox.offsetHeight; // trigger reflow
                detailBox.style.animation = 'modalSlideUp 0.3s ease-out';
            }
        });
    });
}

/* ==========================================================================
   Model Choice Routing Table Filter Logic
   ========================================================================== */
function initModelRoutingFilter() {
    const filterButtons = document.querySelectorAll('.table-filter-btn');
    const tableRows = document.querySelectorAll('.routing-row');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active filter button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.filter;
            
            tableRows.forEach(row => {
                if (category === 'all' || row.dataset.category === category) {
                    row.style.display = '';
                    row.style.opacity = '1';
                } else {
                    row.style.opacity = '0';
                    row.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   Interactive Docket Work Record Inspector
   ========================================================================== */
function initDocketExplorer() {
    const docketData = {
        sre: {
            title: "Docket ID: DK-SRE-RUNBOOK-912A",
            date: "2026-06-05",
            objective: "Recover MySQL Master replication lag in staging environment",
            scope: "Read latency parameters, execute replica reset commands on isolated dev lanes",
            assumptions: "MySQL slave replica is online but stuck on packet boundary error",
            model: "Claude 3.5 Sonnet (Governed Provider Lane)",
            approval: "Approved by Platform lead [ID: AD-901]",
            proof: "Sandbox verification exit code: 0. Output logs captured.",
            status: "RELEASED_TO_SANDBOX"
        },
        cloud: {
            title: "Docket ID: DK-CLOUD-COST-8812B",
            date: "2026-06-05",
            objective: "Perform cost audit & terminate unattached disks in GCP",
            scope: "Identify volume attachments in zone us-central1-a, trigger cleanup",
            assumptions: "Disks with status 'UNATTACHED' for > 30 days are safe to purge",
            model: "Gemini 1.5 Pro (Cost-Controlled Lane)",
            approval: "Approved via SRE Slack Gateway (Automated Slack approval token)",
            proof: "Estimated Monthly Savings: $1,420. Volume screenshots saved.",
            status: "RELEASED_TO_PRODUCTION"
        },
        compliance: {
            title: "Docket ID: DK-COMP-AUDIT-701X",
            date: "2026-06-04",
            objective: "Audit public buckets for customer PII patterns",
            scope: "Recursively check file headers in gs://client-assets-bucket/",
            assumptions: "Must not store unencrypted files containing string 'SSN'",
            model: "SRE-Specialist Fine-Tuned Model (Private Local Runtime)",
            approval: "Security Team Release authorization signed [ID: SC-304]",
            proof: "0 compliance violations detected across 1,200 elements.",
            status: "COMPLETED"
        }
    };

    const tabButtons = document.querySelectorAll('.docket-tab-btn');
    
    const dTitle = document.getElementById('docket-title');
    const dDate = document.getElementById('docket-date');
    const dObjective = document.getElementById('docket-objective');
    const dScope = document.getElementById('docket-scope');
    const dAssumptions = document.getElementById('docket-assumptions');
    const dModel = document.getElementById('docket-model');
    const dApproval = document.getElementById('docket-approval');
    const dProof = document.getElementById('docket-proof');
    const dStatus = document.getElementById('docket-status');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.dataset.docket;
            const data = docketData[key];

            if (data) {
                dTitle.textContent = data.title;
                dDate.textContent = data.date;
                dObjective.textContent = data.objective;
                dScope.textContent = data.scope;
                dAssumptions.textContent = data.assumptions;
                dModel.textContent = data.model;
                dApproval.textContent = data.approval;
                dProof.textContent = data.proof;
                dStatus.textContent = data.status;

                // Toggle status class color
                dStatus.className = 'docket-stamp';
                if (data.status === 'COMPLETED') {
                    dStatus.style.backgroundColor = 'rgba(22, 163, 123, 0.1)';
                    dStatus.style.color = 'var(--color-green-500)';
                    dStatus.style.borderColor = 'var(--color-green-500)';
                } else if (data.status === 'RELEASED_TO_PRODUCTION') {
                    dStatus.style.backgroundColor = 'rgba(18, 184, 215, 0.1)';
                    dStatus.style.color = 'var(--color-cyan-500)';
                    dStatus.style.borderColor = 'var(--color-cyan-500)';
                } else {
                    dStatus.style.backgroundColor = 'rgba(233, 161, 27, 0.1)';
                    dStatus.style.color = 'var(--color-amber-500)';
                    dStatus.style.borderColor = 'var(--color-amber-500)';
                }
            }
        });
    });
}

/* ==========================================================================
   Assessment Form Validation & Modal Success Receipt Generator
   ========================================================================== */
function initAssessmentForm() {
    const form = document.getElementById('assessment-request-form');
    const modal = document.getElementById('receipt-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal-trigger');
    
    // Receipt element bindings
    const rDocketId = document.getElementById('receipt-docket-id');
    const rName = document.getElementById('receipt-name');
    const rEmail = document.getElementById('receipt-email');
    const rOrg = document.getElementById('receipt-org');
    const rMaturity = document.getElementById('receipt-maturity');
    const rEnv = document.getElementById('receipt-env');
    const rKey = document.getElementById('receipt-key');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form fields
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const organization = document.getElementById('form-organization').value.trim();
            const role = document.getElementById('form-role').value.trim();
            const interest = document.getElementById('form-interest').value;
            const maturity = document.getElementById('form-maturity').value;
            const env = document.getElementById('form-env').value;
            const message = document.getElementById('form-message').value.trim();

            // Perform simple verification
            let hasError = false;
            const fields = [
                { id: 'form-name', val: name },
                { id: 'form-email', val: email },
                { id: 'form-organization', val: organization },
                { id: 'form-role', val: role }
            ];

            fields.forEach(field => {
                const element = document.getElementById(field.id);
                if (!field.val) {
                    element.style.borderColor = 'var(--color-red-500)';
                    element.style.boxShadow = '0 0 0 3px rgba(214, 69, 69, 0.15)';
                    hasError = true;
                } else {
                    element.style.borderColor = 'var(--color-border-200)';
                    element.style.boxShadow = 'none';
                }
            });

            if (hasError) {
                alert('Please fill out all required fields marked with a border.');
                return;
            }

            // Generate an Assessment Docket ID (DK-ASSESS-XXXXXX)
            const randomId = Math.floor(100000 + Math.random() * 900000);
            const docketId = `DK-ASSESS-${randomId}`;

            // Populate the interactive validation receipt modal
            rDocketId.textContent = docketId;
            rName.textContent = name;
            rEmail.textContent = email;
            rOrg.textContent = organization;
            rMaturity.textContent = maturity;
            rEnv.textContent = env;
            
            // Create a security verification hash representing the cryptographic seal
            rKey.textContent = `SHA256:FDE902${randomId}DA837BE0938...`;

            // Open the Success Receipt Modal
            modal.classList.add('active');
            
            // Reset form fields
            form.reset();
        });
    }

    // Modal Close Triggers
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });

    // Close on clicking outside the modal content card
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/* ==========================================================================
   Video Player Demo Chapter Marker Control
   ========================================================================== */
function initVideoDemoPlayer() {
    const video = document.getElementById('orcasagent-video');
    const chapterButtons = document.querySelectorAll('.chapter-marker-btn');
    
    // Chapters timings in seconds
    const chapterTimes = {
        'intro': 0,
        'intake': 12,
        'knowledge': 28,
        'docket': 45,
        'coordination': 65,
        'graph': 84,
        'runtime': 105,
        'outcome': 125
    };

    chapterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            chapterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const chapterKey = btn.dataset.chapter;
            const targetTime = chapterTimes[chapterKey];

            // Toggle active terminal simulator panel
            const panels = document.querySelectorAll('.sim-panel');
            panels.forEach(p => p.classList.remove('active'));
            const targetPanel = document.getElementById(`sim-panel-${chapterKey}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Re-trigger typing and log fade-in animations on click
                const animatedElements = targetPanel.querySelectorAll('.cli-line, .cli-log');
                animatedElements.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // force reflow
                    el.style.animation = '';
                });
            }

            if (video && typeof targetTime === 'number') {
                video.currentTime = targetTime;
                video.play();
            }

            // Show floating visual indicator
            const indicator = document.getElementById('video-now-playing');
            if (indicator) {
                const titleEl = btn.querySelector('.chapter-title');
                const titleText = titleEl ? titleEl.textContent : btn.textContent;
                indicator.textContent = `Now Playing: ${titleText.trim()}`;
            }
        });
    });
}

/* ==========================================================================
   Cybernetic Signal Telemetry System (HTML5 Canvas Engine)
   ========================================================================== */
class Particle {
    constructor(w, h, rgb) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 3.5 + 1.25;
        this.baseAlpha = Math.random() * 0.3 + 0.15;
        this.alpha = this.baseAlpha;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseAngle = Math.random() * Math.PI * 2;
    }

    update(w, h, targetRgb) {
        this.x += this.vx;
        this.y += this.vy;

        // Soft screen bounce bounds
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Smooth color interpolation (morphing on theme switch)
        this.r += (targetRgb.r - this.r) * 0.05;
        this.g += (targetRgb.g - this.g) * 0.05;
        this.b += (targetRgb.b - this.b) * 0.05;

        // Cybernetic telemetry signal pulsing
        this.pulseAngle += this.pulseSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.1;
    }

    draw(ctx) {
        // High-performance double-circle bloom glow (no shadowBlur convolutions!)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.alpha * 0.22})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.alpha})`;
        ctx.fill();
    }
}

/* ==========================================================================
   Procedural Orca (Killer Whale) Swimming Animation
   ========================================================================== */
class CanvasOrca {
    constructor(w, h, rgb, offsetX = 0, offsetY = 0, scale = null, swimPhaseOffset = null) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Swim from left to right at various speeds
        this.vx = Math.random() * 0.4 + 0.35;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.scale = scale !== null ? scale : (Math.random() * 0.45 + 0.45); // Varying realistic size ratios
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.swimCycle = swimPhaseOffset !== null ? swimPhaseOffset : (Math.random() * Math.PI * 2);

        // Pod offsets
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    update(w, h, targetRgb, wakeParticles) {
        this.x += this.vx;
        this.y += this.vy;
        this.swimCycle += 0.04;

        // Wrap edges smoothly
        if (this.x > w + 120) {
            this.x = -120;
            this.y = Math.random() * h;
        }
        if (this.y < -60 || this.y > h + 60) {
            this.vy *= -1;
        }

        // Color blending with active theme
        this.r += (targetRgb.r - this.r) * 0.05;
        this.g += (targetRgb.g - this.g) * 0.05;
        this.b += (targetRgb.b - this.b) * 0.05;

        // Emit bioluminescent wake particles trailing from tail flukes
        if (wakeParticles && Math.random() < 0.4) {
            const theta = Math.atan2(this.vy, this.vx);
            const tailSway = Math.sin(this.swimCycle) * 8;
            const relX = -65 * this.scale;
            const relY = tailSway * this.scale;

            // Trigonometric transformation from relative coordinates to absolute canvas coordinates
            const absX = this.x + (relX * Math.cos(theta) - relY * Math.sin(theta));
            const absY = this.y + (relX * Math.sin(theta) + relY * Math.cos(theta));

            wakeParticles.push(new OrcaWakeParticle(absX, absY, { r: this.r, g: this.g, b: this.b }));
        }
    }

    updateFromPod(leaderX, leaderY, vx, vy, targetRgb, wakeParticles) {
        this.vx = vx;
        this.vy = vy;
        this.swimCycle += 0.04;

        // Position is leader position plus rotated offset
        const theta = Math.atan2(this.vy, this.vx);
        const rotatedOffsetX = this.offsetX * Math.cos(theta) - this.offsetY * Math.sin(theta);
        const rotatedOffsetY = this.offsetX * Math.sin(theta) + this.offsetY * Math.cos(theta);

        this.x = leaderX + rotatedOffsetX;
        this.y = leaderY + rotatedOffsetY;

        // Color blending with active theme
        this.r += (targetRgb.r - this.r) * 0.05;
        this.g += (targetRgb.g - this.g) * 0.05;
        this.b += (targetRgb.b - this.b) * 0.05;

        // Emit bioluminescent wake particles trailing from tail flukes
        if (wakeParticles && Math.random() < 0.4) {
            const tailSway = Math.sin(this.swimCycle) * 8;
            const relX = -65 * this.scale;
            const relY = tailSway * this.scale;

            // Trigonometric transformation from relative coordinates to absolute canvas coordinates
            const absX = this.x + (relX * Math.cos(theta) - relY * Math.sin(theta));
            const absY = this.y + (relX * Math.sin(theta) + relY * Math.cos(theta));

            wakeParticles.push(new OrcaWakeParticle(absX, absY, { r: this.r, g: this.g, b: this.b }));
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.atan2(this.vy, this.vx));
        ctx.scale(this.scale, this.scale);

        // Compute tail movement based on swim phase
        const tailSway = Math.sin(this.swimCycle) * 8;

        // Draw primary sleek Orca body path (dark dorsal, light ventral split)
        ctx.beginPath();
        ctx.moveTo(40, 0); // Rounded snout
        ctx.bezierCurveTo(25, -15, -10, -22, -40, -4); // Back line
        ctx.lineTo(-65, tailSway); // Tail joint sways
        
        // Flukes (tail fins)
        ctx.lineTo(-72, tailSway - 14);
        ctx.lineTo(-67, tailSway);
        ctx.lineTo(-72, tailSway + 14);
        ctx.lineTo(-40, 6); // Lower tail
        ctx.bezierCurveTo(-15, 18, 20, 14, 40, 0); // White belly curved transition
        ctx.closePath();
        
        // Solid black-slate base fill
        ctx.fillStyle = "rgba(10, 17, 34, 0.88)";
        ctx.fill();
        
        // Glowing brand outline (matches theme color!)
        ctx.strokeStyle = `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, 0.45)`;
        ctx.lineWidth = 1.75;
        ctx.stroke();

        // 1. Sleek Dorsal Fin (The prominent tall triangular fin of a killer whale!)
        ctx.beginPath();
        ctx.moveTo(-12, -14);
        ctx.quadraticCurveTo(-16, -38, -25, -42); // Curved point
        ctx.quadraticCurveTo(-22, -16, -26, -10);
        ctx.closePath();
        ctx.fillStyle = "rgba(10, 17, 34, 0.95)";
        ctx.fill();
        ctx.stroke();

        // 2. White Eye Patch (Anatomical marking)
        ctx.beginPath();
        ctx.ellipse(18, -4, 6, 2.2, -Math.PI/12, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.fill();

        // 3. Gray Saddle Patch (Behind dorsal fin)
        ctx.beginPath();
        ctx.ellipse(-28, -6, 8, 3, Math.PI/6, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.fill();

        // 4. White Ventral/Belly Patch
        ctx.beginPath();
        ctx.moveTo(10, 6);
        ctx.bezierCurveTo(-10, 11, -30, 8, -45, 1);
        ctx.bezierCurveTo(-30, 3, -10, 1, 10, 6);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.fill();

        // 5. Stylized glowing eye node (makes it look cybernetic yet biological)
        ctx.beginPath();
        ctx.arc(26, -2, 1.25, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, 0.9)`;
        ctx.fill();

        ctx.restore();
    }
}

class OrcaPod {
    constructor(w, h, rgb) {
        // Base coordinate of the pod center/leader (randomly distributed)
        this.leaderX = Math.random() * (w + 200) - 100;
        this.leaderY = Math.random() * h;
        
        // Shared velocity of the pod
        this.vx = Math.random() * 0.35 + 0.35; // 0.35 to 0.70 px/frame
        this.vy = (Math.random() - 0.5) * 0.1; // gentle vertical drift
        
        this.orcas = [];
        // Define pod members:
        // Leader (largest, in front)
        this.orcas.push(new CanvasOrca(w, h, rgb, 0, 0, 0.85, 0));
        // Companion 1 (slightly behind and above, medium size)
        this.orcas.push(new CanvasOrca(w, h, rgb, -80, -35, 0.65, -0.6));
        // Companion 2 (further behind and below, smaller)
        this.orcas.push(new CanvasOrca(w, h, rgb, -140, 25, 0.5, 0.5));
    }

    update(w, h, targetRgb, wakeParticles) {
        this.leaderX += this.vx;
        this.leaderY += this.vy;

        // Apply a gentle secondary wave oscillation to the entire pod
        this.leaderY += Math.sin(Date.now() * 0.001) * 0.08;

        // Edges wrapping: if the trailing companion is off the screen, wrap the whole pod
        if (this.leaderX > w + 220) {
            this.leaderX = -220;
            this.leaderY = Math.random() * h;
            this.vx = Math.random() * 0.35 + 0.35;
            this.vy = (Math.random() - 0.5) * 0.1;
        }
        if (this.leaderY < -120 || this.leaderY > h + 120) {
            this.vy *= -1;
        }

        // Update each pod member relative to the leader's position & velocity
        this.orcas.forEach(o => {
            o.updateFromPod(this.leaderX, this.leaderY, this.vx, this.vy, targetRgb, wakeParticles);
        });
    }

    draw(ctx) {
        // Draw the smallest ones first so they render under the leader
        const sortedOrcas = [...this.orcas].sort((a, b) => a.scale - b.scale);
        sortedOrcas.forEach(o => {
            o.draw(ctx);
        });
    }
}

function initAmbientParticles() {
    const canvas = document.getElementById('ambient-particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const themeColorsRGB = {
        azure: { r: 18, g: 184, b: 215 },
        cyberpunk: { r: 188, g: 52, b: 250 },
        emerald: { r: 22, g: 163, b: 123 },
        twilight: { r: 233, g: 161, b: 27 }
    };

    const particles = [];
    const particleCount = 20; // Slightly reduced to balance performance with OrcasAgent&trade;

    const orcaPods = [];
    const podCount = 1; // Two family pods of 3 orcas each (6 total background orcas)
    const wakeParticles = []; // Bioluminescent wake trails behind OrcasAgent&trade;

    // Seed particles
    for (let i = 0; i < particleCount; i++) {
        const rgb = themeColorsRGB[currentTheme] || themeColorsRGB.azure;
        particles.push(new Particle(width, height, rgb));
    }

    // Seed family swimming Orca Pods
    for (let i = 0; i < podCount; i++) {
        const rgb = themeColorsRGB[currentTheme] || themeColorsRGB.azure;
        orcaPods.push(new OrcaPod(width, height, rgb));
    }

    // Window Resize with debounced trigger
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, 150);
    });

    // Hardware accelerated paint cycle
    function paintFrame() {
        ctx.clearRect(0, 0, width, height);

        const targetRgb = themeColorsRGB[currentTheme] || themeColorsRGB.azure;

        // Draw and update signal trace particles
        particles.forEach(p => {
            p.update(width, height, targetRgb);
            p.draw(ctx);
        });

        // Draw and update wake particles (rendered underneath OrcasAgent&trade;)
        for (let i = wakeParticles.length - 1; i >= 0; i--) {
            const wp = wakeParticles[i];
            wp.update();
            wp.draw(ctx);
            if (wp.life <= 0) {
                wakeParticles.splice(i, 1);
            }
        }

        // Draw and update swimming Orca Pods (passing wakeParticles array to let them emit trails)
        orcaPods.forEach(pod => {
            pod.update(width, height, targetRgb, []);
            pod.draw(ctx);
        });

        document.paintFrameActive = requestAnimationFrame(paintFrame);
    }

    document.paintFrameActive = requestAnimationFrame(paintFrame);
}

/* ==========================================================================
   Throttled Radial-Gradient Card Mouse Tracking Glow
   ========================================================================== */
function initCardGlowEffects() {
    const cards = document.querySelectorAll('.component-card, .problem-card, .use-case-card, .trust-card, .proof-tile');
    
    cards.forEach(card => {
        let hoverActive = false;
        let animationFrameId = null;
        let lastEvent = null;

        card.addEventListener('mouseenter', () => {
            hoverActive = true;
        });

        card.addEventListener('mousemove', (e) => {
            if (!hoverActive) return;
            lastEvent = e;

            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(() => {
                    if (lastEvent) {
                        const rect = card.getBoundingClientRect();
                        const x = lastEvent.clientX - rect.left;
                        const y = lastEvent.clientY - rect.top;
                        card.style.backgroundImage = `radial-gradient(circle 220px at ${x}px ${y}px, var(--glow-cyan) 0%, transparent 80%)`;
                    }
                    animationFrameId = null;
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            hoverActive = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            card.style.backgroundImage = '';
        });
    });
}

/* ==========================================================================
   Expandable Sections Drawer Controller (Apple/Stripe Spacious Minimalism)
   ========================================================================== */
function initExpandableSections() {
    const expandButtons = document.querySelectorAll('.expand-trigger-btn');
    expandButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const target = document.getElementById(targetId);
            if (target) {
                const isExpanded = target.classList.toggle('expanded');
                btn.classList.toggle('active');
                
                const openText = btn.dataset.textCollapse || "Collapse Detailed View";
                const closeText = btn.dataset.textExpand || "Expand Detailed View";
                btn.textContent = isExpanded ? openText : closeText;
            }
        });
    });
}

/* ==========================================================================
   Orca Bioluminescent Wake Particle Class
   ========================================================================== */
class OrcaWakeParticle {
    constructor(x, y, rgb) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.7) * 0.4; // Drag slightly behind
        this.vy = -Math.random() * 0.15 - 0.05; // Buoyancy floating upwards
        this.radius = Math.random() * 1.5 + 0.75;
        this.alpha = Math.random() * 0.4 + 0.4;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.maxLife = Math.random() * 60 + 50;
        this.life = this.maxLife;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.radius += 0.02; // Slow expansion
        this.life--;
        this.alpha = (this.life / this.maxLife) * 0.55;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.alpha * 0.25})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.alpha})`;
        ctx.fill();
    }
}

/* ==========================================================================
   Cybernetic Preloader Controller
   ========================================================================== */
function initSitePreloader() {
    const preloader = document.getElementById('site-preloader');
    if (!preloader) return;

    const startTime = Date.now();
    const minDisplayTime = 800; // ms minimum display for visual satisfaction

    const fadeOut = () => {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, minDisplayTime - elapsed);

        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); // matches transition time
        }, delay);
    };

    if (document.readyState === 'complete') {
        fadeOut();
    } else {
        window.addEventListener('load', fadeOut);
        setTimeout(fadeOut, 3000); // Safety fallback
    }
}

/* ==========================================================================
   Ecosystem Chamber Drawer Controller
   ========================================================================== */
function initEcosystemChambers() {
    const cards = document.querySelectorAll('.gateway-card');
    const drawers = document.querySelectorAll('.chamber-drawer');
    const closeBtns = document.querySelectorAll('.chamber-close-btn');
    const btnExpandAll = document.getElementById('btn-expand-all');
    const btnCollapseAll = document.getElementById('btn-collapse-all');

    function toggleChamber(targetId, forceState = null) {
        const targetDrawer = document.getElementById(targetId);
        const card = document.querySelector(`.gateway-card[data-target="${targetId}"]`);
        if (!targetDrawer) return;

        const isCurrentlyExpanded = targetDrawer.classList.contains('expanded');
        const shouldExpand = forceState !== null ? forceState : !isCurrentlyExpanded;

        if (shouldExpand) {
            if (forceState === null) {
                // Collapse sibling drawers to maintain clean spacious viewport
                drawers.forEach(d => {
                    if (d.id !== targetId) {
                        d.classList.remove('expanded');
                    }
                });
                cards.forEach(c => {
                    if (c.dataset.target !== targetId) {
                        c.classList.remove('active');
                    }
                });
            }

            targetDrawer.classList.add('expanded');
            if (card) card.classList.add('active');

            // Scroll smoothly centered on the newly opened chamber
            setTimeout(() => {
                targetDrawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 250);
        } else {
            targetDrawer.classList.remove('expanded');
            if (card) card.classList.remove('active');
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.dataset.target;
            toggleChamber(targetId);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = btn.dataset.target;
            const targetDrawer = document.getElementById(targetId);
            if (targetDrawer) {
                targetDrawer.classList.remove('expanded');
                const card = document.querySelector(`.gateway-card[data-target="${targetId}"]`);
                if (card) card.classList.remove('active');
                
                // Return smoothly back to the ecosystem explorer grid
                document.getElementById('platform-explorer').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    if (btnExpandAll) {
        btnExpandAll.addEventListener('click', () => {
            drawers.forEach(d => d.classList.add('expanded'));
            cards.forEach(c => c.classList.add('active'));
            if (drawers.length > 0) {
                drawers[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    if (btnCollapseAll) {
        btnCollapseAll.addEventListener('click', () => {
            drawers.forEach(d => d.classList.remove('expanded'));
            cards.forEach(c => c.classList.remove('active'));
            document.getElementById('platform-explorer').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
}

/* ==========================================================================
   Deep-Link Hash Router
   ========================================================================== */
function initHashRouter() {
    const chamberMap = {
        'problem': 'chamber-architecture',
        'platform': 'chamber-architecture',
        'orcas-core': 'chamber-architecture',
        'private-mesh': 'chamber-architecture',
        'operating-model': 'chamber-operations',
        'video-demo': 'chamber-operations',
        'second-brain': 'chamber-governance',
        'docket': 'chamber-governance',
        'model-choice': 'chamber-governance',
        'trust': 'chamber-governance',
        'use-cases': 'chamber-evidence',
        'proof-artifacts': 'chamber-evidence',
        'competitive': 'chamber-evidence'
    };

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        if (hash.startsWith('chamber-')) {
            const drawer = document.getElementById(hash);
            if (drawer) {
                drawer.classList.add('expanded');
                const card = document.querySelector(`.gateway-card[data-target="${hash}"]`);
                if (card) card.classList.add('active');
                setTimeout(() => {
                    drawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
            }
            return;
        }

        const parentChamberId = chamberMap[hash];
        if (parentChamberId) {
            const parentDrawer = document.getElementById(parentChamberId);
            if (parentDrawer) {
                parentDrawer.classList.add('expanded');
                const card = document.querySelector(`.gateway-card[data-target="${parentChamberId}"]`);
                if (card) card.classList.add('active');

                setTimeout(() => {
                    const targetSection = document.getElementById(hash);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 250);
            }
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetHash = anchor.getAttribute('href');
            if (targetHash && targetHash !== '#') {
                e.preventDefault();
                history.pushState(null, null, targetHash);
                handleHashChange();
            }
        });
    });

    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash) {
        setTimeout(handleHashChange, 500);
    }
}

/* ==========================================================================
   OrcasAgent&trade; Control Plane Sandbox Factory Implementation (Animate 20 Capabilities)
   ========================================================================== */
function initSandboxFactory() {
    const btnTrigger = document.getElementById('btn-trigger-factory');
    if (!btnTrigger) return;

    const selectIntent = document.getElementById('factory-intent');
    const selectModel = document.getElementById('factory-model');
    const stream = document.getElementById('factory-log-stream');
    const stampContainer = document.getElementById('factory-stamp-container');
    const hashText = document.getElementById('sealed-hash');
    const cardContainer = document.getElementById('factory-agent-card-container');
    const cardName = document.getElementById('f-card-name');
    const cardDesc = document.getElementById('f-card-desc');
    const cardLane = document.getElementById('f-card-lane');
    const telemetryStatus = document.getElementById('telemetry-status');

    let isRunning = false;

    // Simulation Config Dataset
    const intentData = {
        telco_quote: {
            name: "TelcoQuoteReadinessAgent",
            desc: "Simulated order-to-quote analysis agent promoted to the local Solace mesh configuration.",
            version: "v0.1.0-local-sandbox",
            hash: "SHA256:4FB557C175E3DB6BE84FE06014D195DD14850C90D775397C3A4C44FDC542E77",
            docketId: "DCK-TELCO-QUOTE-557C",
            logs: [
                { step: 1, text: "[INFO] classify_user_intent() matched request. Intent: docket_or_release_planning.", delay: 400 },
                { step: 1, text: "[INFO] summarize_project_context() parsed 8 source documents inside 'local-sandbox-project'.", delay: 900 },
                { step: 2, text: "[INFO] plan_runtime_capabilities() matched 'telco-quote-analysis' with capability matrix.", delay: 1500 },
                { step: 2, text: "[INFO] Model configured: Gemini 1.5 Flash (SRE Low-Latency Lane). GPU=disabled.", delay: 2000 },
                { step: 3, text: "[INFO] prepare_docket() initialized. Signed draft Docket created: DCK-TELCO-QUOTE-557C", delay: 2600 },
                { step: 3, text: "[INFO] bind_capability_plan_to_docket() generated checksum contract. SEALING ACTIVE.", delay: 3100 },
                { step: 4, text: "[INFO] Spawning isolated Docker Compose container local_docker://telcoquotereadinessagent...", delay: 3800 },
                { step: 4, text: "[INFO] Sandbox boot-up completed. Virtual port binded to localhost:18082. Network ingress=blocked.", delay: 4400 },
                { step: 5, text: "[INFO] Executing 41 SRE safety checks (nsam_controlled_sandbox_execution_eval_runner)...", delay: 5100 },
                { step: 5, text: "[PASS] Assertion 1: Schema Conformity Check ... OK", delay: 5500 },
                { step: 5, text: "[PASS] Assertion 2: Memory Bound Limit (512MB) ... OK", delay: 5900 },
                { step: 5, text: "[PASS] Assertion 3: Production Mutation Boundary ... OK", delay: 6300 },
                { step: 5, text: "[INFO] Recording evaluation PASS evidence inside the local platform.db registry.", delay: 6800 },
                { step: 5, text: "[SUCCESS] promote_sandbox_agent_to_local_mesh() completed. Broadcast reload sent.", delay: 7400 }
            ]
        },
        cloud_pii: {
            name: "CloudPIIAuditAgent",
            desc: "Automated public storage bucket compliance auditor scanning for unencrypted customer PII files.",
            version: "v0.1.0-sandbox-compliance",
            hash: "SHA256:8ACD4D32E92C22F6E91F165E63080FF03F191B29A4BE2983B1028723C28A2A19",
            docketId: "DCK-CLOUD-PII-8ACD",
            logs: [
                { step: 1, text: "[INFO] classify_user_intent() matched request. Intent: validation_or_gap_assessment.", delay: 400 },
                { step: 1, text: "[INFO] summarize_project_context() mapped cloud assets catalog inside 'gcp-compliance-sandbox'.", delay: 900 },
                { step: 2, text: "[INFO] plan_runtime_capabilities() matched 'compliance-pii-scan' with capability matrix.", delay: 1500 },
                { step: 2, text: "[INFO] Model configured: Gemini 1.5 Pro (Cost-Controlled Lane). Private read-only access active.", delay: 2000 },
                { step: 3, text: "[INFO] prepare_docket() initialized. Signed draft Docket created: DCK-CLOUD-PII-8ACD", delay: 2600 },
                { step: 3, text: "[INFO] bind_capability_plan_to_docket() locked down asset scan scopes. SEALING ACTIVE.", delay: 3100 },
                { step: 4, text: "[INFO] Spawning isolated Docker Compose container local_docker://cloudpiiauditagent...", delay: 3800 },
                { step: 4, text: "[INFO] Sandbox booted. Active boundary policies: Egress=blocked, Local Storage Driver=read-only.", delay: 4400 },
                { step: 5, text: "[INFO] Running compliance preflight tests (nsam_integration_lifecycle_eval_runner)...", delay: 5100 },
                { step: 5, text: "[PASS] Assertion 1: Secret Key Redaction ... OK", delay: 5500 },
                { step: 5, text: "[PASS] Assertion 2: Bucket Leak Prevention ... OK", delay: 5900 },
                { step: 5, text: "[PASS] Assertion 3: Token Budget Bounds ... OK", delay: 6300 },
                { step: 5, text: "[INFO] Recording compliance evaluation PASS evidence inside local webui_gateway.db.", delay: 6800 },
                { step: 5, text: "[SUCCESS] Agent card reload signal broadcast completed. CloudPIIAuditAgent is live!", delay: 7400 }
            ]
        },
        sre_replica: {
            name: "SreReplicaResetAgent",
            desc: "Autonomous MySQL replica synchronization recovery assistant. Runs inside bounded, finite TTL lanes.",
            version: "v0.1.0-sandbox-sre",
            hash: "SHA256:9E324EF28A011BA2CF3A56EFCA94C9D5F302E1B1239C094FFCB570A2569C760B",
            docketId: "DCK-SRE-REPLICA-9E32",
            logs: [
                { step: 1, text: "[INFO] classify_user_intent() matched request. Intent: deployment_planning.", delay: 400 },
                { step: 1, text: "[INFO] summarize_project_context() parsed MySQL cluster topologies from SRE runbooks.", delay: 900 },
                { step: 2, text: "[INFO] plan_runtime_capabilities() matched 'replica-reset-plan' with capability matrix.", delay: 1500 },
                { step: 2, text: "[INFO] Model configured: Claude 3.5 Sonnet (Specialist Planning Lane). Execution sandbox ready.", delay: 2000 },
                { step: 3, text: "[INFO] prepare_docket() initialized. Signed draft Docket created: DCK-SRE-REPLICA-9E32", delay: 2600 },
                { step: 3, text: "[INFO] bind_capability_plan_to_docket() compiled exact CLI tool regex limits. SEALING ACTIVE.", delay: 3100 },
                { step: 4, text: "[INFO] Spawning isolated Docker Compose container local_docker://srereplicaresetagent...", delay: 3800 },
                { step: 4, text: "[INFO] Sandbox booted. Mock replica DB attached. Network namespace bounded with strict TTL policy.", delay: 4400 },
                { step: 5, text: "[INFO] Executing 41 SRE safety validations (nsam_model_routing_readiness_policy_eval_runner)...", delay: 5100 },
                { step: 5, text: "[PASS] Assertion 1: Command Injection Regex Blockers ... OK", delay: 5500 },
                { step: 5, text: "[PASS] Assertion 2: Replication Sync Reconciliation ... OK", delay: 5900 },
                { step: 5, text: "[PASS] Assertion 3: Bounded Runtime TTL Timeout (15 mins) ... OK", delay: 6300 },
                { step: 5, text: "[INFO] Evidence archived to platform.db. Sandbox container scheduled for auto-termination.", delay: 6800 },
                { step: 5, text: "[SUCCESS] SSE api/v1/agentCards reload signal broadcast completed. SreReplicaResetAgent active!", delay: 7400 }
            ]
        }
    };

    function appendLog(text, type = "normal") {
        const logLine = document.createElement('div');
        logLine.textContent = text;
        if (type === "success") {
            logLine.style.color = "var(--color-green-500)";
            logLine.style.fontWeight = "bold";
        } else if (type === "pass") {
            logLine.style.color = "var(--color-cyan-500)";
        }
        stream.appendChild(logLine);
        stream.scrollTop = stream.scrollHeight;
    }

    btnTrigger.addEventListener('click', () => {
        if (isRunning) return;

        isRunning = true;
        btnTrigger.disabled = true;
        selectIntent.disabled = true;
        selectModel.disabled = true;

        // Toggle state styling of button
        const btnText = btnTrigger.querySelector('.btn-text');
        const btnSpinner = btnTrigger.querySelector('.btn-spinner');
        btnText.textContent = "Orchestrating Runtime...";
        btnSpinner.style.display = "inline-block";

        // Reset Telemetry UI Components
        telemetryStatus.textContent = "ORCHESTRATING...";
        telemetryStatus.style.color = "var(--color-cyan-500)";
        stampContainer.style.display = "none";
        cardContainer.style.display = "none";
        stream.innerHTML = "";
        appendLog("[SYSTEM] Received trigger from active Solace Mesh interface...");
        appendLog("[SYSTEM] Mapping high-level intent against the 20 Programmatic Operations...");

        // Reset Steps Opacity
        for (let i = 1; i <= 5; i++) {
            const stepEl = document.getElementById(`f-step-${i}`);
            stepEl.style.opacity = "0.35";
            const ind = stepEl.querySelector('.f-indicator');
            ind.innerHTML = i;
            ind.style.borderColor = "rgba(255, 255, 255, 0.3)";
            ind.style.backgroundColor = "transparent";
            ind.style.color = "var(--color-white)";
            ind.style.boxShadow = "none";
        }

        // Get Configuration data
        const intentKey = selectIntent.value;
        const currentData = intentData[intentKey];
        const selectedModelLabel = selectModel.options[selectModel.selectedIndex].text;

        // Drive the step-by-step telemetry animation
        currentData.logs.forEach(log => {
            setTimeout(() => {
                // Determine step indicator highlight
                const stepEl = document.getElementById(`f-step-${log.step}`);
                if (stepEl && parseFloat(stepEl.style.opacity) < 1.0) {
                    stepEl.style.opacity = "1.0";
                    const ind = stepEl.querySelector('.f-indicator');
                    ind.style.borderColor = "var(--color-cyan-500)";
                    ind.style.color = "var(--color-ink-950)";
                    ind.style.backgroundColor = "var(--color-cyan-500)";
                    ind.style.boxShadow = "0 0 10px var(--color-cyan-500)";
                }

                // Append corresponding logs to SRE console
                let lineType = "normal";
                if (log.text.startsWith("[SUCCESS]")) lineType = "success";
                if (log.text.startsWith("[PASS]")) lineType = "pass";
                appendLog(log.text, lineType);

                // Reveal Docket Stamp when Step 3 is reached
                if (log.step === 3 && log.text.includes("SEALING ACTIVE")) {
                    setTimeout(() => {
                        hashText.textContent = `${currentData.docketId} | ${currentData.hash}`;
                        stampContainer.style.display = "flex";
                        appendLog(`[INFO] Docket stamped and sealed with SHA256 integrity-token. See stamp below.`, "pass");
                    }, 500);
                }

                // Highlight completed checklist steps
                if (log.step < 5) {
                    const nextLog = currentData.logs.find(l => l.delay > log.delay);
                    if (nextLog && nextLog.step > log.step) {
                        // Previous step is done, change indicator to a checkmark!
                        const prevInd = document.getElementById(`f-step-${log.step}`).querySelector('.f-indicator');
                        prevInd.innerHTML = "✓";
                        prevInd.style.backgroundColor = "var(--color-green-500)";
                        prevInd.style.borderColor = "var(--color-green-500)";
                        prevInd.style.boxShadow = "0 0 10px var(--color-green-500)";
                    }
                }
            }, log.delay);
        });

        // final reveal sequence (Success!)
        setTimeout(() => {
            // Checkmark last step
            const lastInd = document.getElementById(`f-step-5`).querySelector('.f-indicator');
            lastInd.innerHTML = "✓";
            lastInd.style.backgroundColor = "var(--color-green-500)";
            lastInd.style.borderColor = "var(--color-green-500)";
            lastInd.style.boxShadow = "0 0 10px var(--color-green-500)";

            // Update dynamically generated agent card details
            cardName.textContent = currentData.name;
            cardDesc.textContent = currentData.desc;
            cardLane.textContent = `LANE: ${selectedModelLabel}`;

            // Reveal the card
            cardContainer.style.display = "flex";
            appendLog(`[SUCCESS] Mesh database registry update completed. SSE channel reloaded.`, "success");

            // Reset Button
            btnText.textContent = "Spawn Another Sandbox";
            btnSpinner.style.display = "none";
            btnTrigger.disabled = false;
            selectIntent.disabled = false;
            selectModel.disabled = false;
            isRunning = false;

            telemetryStatus.textContent = "MESH ACTIVE";
            telemetryStatus.style.color = "var(--color-green-500)";
        }, 8000);
    });
}

/* ==========================================================================
   20-Capability Control Plane Explorer Implementation
   ========================================================================== */
function initControlPlaneExplorer() {
    const grid = document.getElementById('cp-capabilities-grid');
    if (!grid) return;

    const capabilities = [
        {
            category: "Category I: Core Registry & Agent Mesh Operations",
            items: [
                {
                    title: "1. Agent Discovery and Inspection",
                    desc: "Programmatic queries to extract live state of active agents, tools, workflows, gateways, and models across the Solace broker and local runtime config.",
                    seam: "nsam_orchestrator_tools.py#L1678-L1734",
                    uat: "nsam_agent_registry_refresh_eval_runner.py",
                    logs: [
                        "[INFO] Executing discover_mesh_registry()...",
                        "[INFO] Scanning /configs/agents/ for static YAML declarations.",
                        "[INFO] Querying webui_gateway.db (nsam_sandbox_agent_registry).",
                        "[PASS] Merged 14 static and 2 sandbox agents into unified mesh state."
                    ]
                },
                {
                    title: "2. Deterministic Intent Classification",
                    desc: "Classifies incoming user prompts into request types to route queries and block unsafe mutating requests.",
                    seam: "nsam_orchestrator_tools.py#L897-L932",
                    uat: "nsam_intent_classification_eval_runner.py",
                    logs: [
                        "[INFO] Executing classify_user_intent()...",
                        "[INFO] Analyzing prompt: 'deploy a new python sandbox'",
                        "[INFO] Token routing heuristics applied.",
                        "[PASS] Intent mapped to: docket_or_release_planning"
                    ]
                },
                {
                    title: "3. Model Configuration Auditing & Redaction",
                    desc: "Fetches inventory of configured models, including max token constraints and capability hints, while stripping credentials.",
                    seam: "nsam_orchestrator_tools.py#L2822-L2929",
                    uat: "nsam_model_routing_readiness_policy_eval_runner.py",
                    logs: [
                        "[INFO] Executing list_configured_models()...",
                        "[INFO] Querying model_configurations table in platform.db.",
                        "[INFO] Redacting API keys and sensitive auth tokens.",
                        "[PASS] Returned 4 active model routing lanes safely."
                    ]
                },
                {
                    title: "4. Agent Mesh Integration & Configuration Matching",
                    desc: "Detects differences between static agent YAML configs and active DB-registered sandbox runtimes to flag mismatches.",
                    seam: "nsam_orchestrator_tools.py#L1459-L1500",
                    uat: "nsam_agent_registry_refresh_eval_runner.py",
                    logs: [
                        "[INFO] Executing _discover_configured_agents()...",
                        "[INFO] Cross-checking filesystem YAMLs with webui_gateway.db.",
                        "[WARN] Found 1 un-promoted local sandbox agent.",
                        "[PASS] Mismatch flagged. Reload Registry broadcast scheduled."
                    ]
                }
            ]
        },
        {
            category: "Category II: Project Context & Knowledge Management",
            items: [
                {
                    title: "5. Project Context Summarization",
                    desc: "Provides a compact, machine-readable summary of project file matrix health and search index availability without loading high-byte content.",
                    seam: "nsam_orchestrator_tools.py#L1991-L2081",
                    uat: "nsam_project_diagnostics_eval_runner.py",
                    logs: [
                        "[INFO] Executing summarize_project_context(project_id='prj-alpha')...",
                        "[INFO] Scanning \\app\\artifacts\\user\\prj-alpha...",
                        "[INFO] Found 12 doc artifacts, 1 vector index.",
                        "[PASS] Context summary generated (145 bytes)."
                    ]
                },
                {
                    title: "6. Project Template Matching & Recommendations",
                    desc: "Recommends standard project templates based on raw user requirement inputs.",
                    seam: "nsam_orchestrator_tools.py#L2155-L2200",
                    uat: "nsam_template_matching_eval_runner.py",
                    logs: [
                        "[INFO] Executing recommend_project_template()...",
                        "[INFO] Scoring requirements against _PROJECT_TEMPLATE_LIBRARY.",
                        "[PASS] Recommended: 'SRE Ops Runbook' template."
                    ]
                },
                {
                    title: "7. Semantic BM25 Index Verification",
                    desc: "Validates search index package structures and extracts listed source files for grounding agent chat answers.",
                    seam: "nsam_orchestrator_tools.py#L1944-L1989",
                    uat: "nsam_semantic_index_health_eval_runner.py",
                    logs: [
                        "[INFO] Executing _read_project_index_summary()...",
                        "[INFO] Unzipping project_bm25_index.zip manifest.json...",
                        "[INFO] Validating document chunk offsets.",
                        "[PASS] BM25 Index verified: 100% healthy."
                    ]
                },
                {
                    title: "8. Project Diagnostics & Hygiene Scans",
                    desc: "Audits active and soft-deleted project count integrity, owner associations, stale fallback rules, and orphaned folders.",
                    seam: "nsam_project_diagnostics_eval_runner.py",
                    uat: "nsam_project_diagnostics_eval_runner.py",
                    logs: [
                        "[INFO] Executing Project Diagnostics pipeline...",
                        "[INFO] Parsing SQL record shapes in webui_gateway.db.",
                        "[INFO] Verifying orphaned artifacts...",
                        "[PASS] 0 orphans found. Database drift is 0%."
                    ]
                }
            ]
        },
        {
            category: "Category III: Docket & Lifecycle Governance",
            items: [
                {
                    title: "9. Runtime Capability Planning",
                    desc: "Examining intent texts to identify expensive resource needs (e.g., GPU, Cloud RAG) and defining required security gates.",
                    seam: "nsam_orchestrator_tools.py#L935-L1179",
                    uat: "nsam_model_routing_readiness_policy_eval_runner.py",
                    logs: [
                        "[INFO] Executing plan_runtime_capabilities()...",
                        "[INFO] Scoring against NSAM_RUNTIME_CAPABILITY_MATRIX.json.",
                        "[INFO] GPU requested but denied by policy.",
                        "[PASS] Generated controlled capability runtime plan."
                    ]
                },
                {
                    title: "10. Docket Capability Binding",
                    desc: "Programmatically pairs a completed capability plan with a target Docket, creating a checksum-signed planning evidence artifact.",
                    seam: "nsam_orchestrator_tools.py#L1182-L1368",
                    uat: "nsam_docket_lifecycle_eval_runner.py",
                    logs: [
                        "[INFO] Executing bind_capability_plan_to_docket()...",
                        "[INFO] Hashing JSON payloads and generating signatures.",
                        "[INFO] SHA-256 Checksum: E8B4F92... locked.",
                        "[PASS] Docket contract mathematically sealed."
                    ]
                },
                {
                    title: "11. Docket Packaging and Generation",
                    desc: "Packages requirements, new component declarations, and test plans into a standardized v2 Docket object.",
                    seam: "nsam_orchestrator_tools.py#L3009-L3303",
                    uat: "nsam_docket_lifecycle_eval_runner.py",
                    logs: [
                        "[INFO] Executing prepare_docket(stage='draft')...",
                        "[INFO] Compiling multi-field contracts...",
                        "[INFO] Writing versioned JSON and MD artifacts.",
                        "[PASS] v2 Docket object successfully generated."
                    ]
                },
                {
                    title: "12. Docket Lifecycle Phase Validation",
                    desc: "Enforces transition gates as a Docket shifts across phase rankings (in_discussion, draft, sandbox) to prevent premature execution.",
                    seam: "nsam_orchestrator_tools.py#L2729-L2820",
                    uat: "nsam_docket_lifecycle_eval_runner.py",
                    logs: [
                        "[INFO] Executing validate_docket_lifecycle()...",
                        "[INFO] Evaluating transition: draft -> sandbox.",
                        "[INFO] Checking mandatory security controls...",
                        "[PASS] Transition approved. Sandbox generation unlocked."
                    ]
                }
            ]
        },
        {
            category: "Category IV: Sandbox & Provider Postures",
            items: [
                {
                    title: "13. Controlled Local Sandbox Containerization",
                    desc: "Spawns and monitors local Docker sandbox environments, mounting repository volumes and setting isolation boundaries.",
                    seam: "nsam_controlled_sandbox_execution_eval_runner.py",
                    uat: "nsam_controlled_sandbox_execution_eval_runner.py",
                    logs: [
                        "[INFO] Triggering Sandbox Containerization Eval Runner...",
                        "[INFO] Validating docker-compose.yml network bounds.",
                        "[INFO] Spawning isolated namespace.",
                        "[PASS] Container online. Public ingress explicitly blocked."
                    ]
                },
                {
                    title: "14. Preflight Provider Reachability Auditing",
                    desc: "Performs ping and credential checks against Vertex AI, GCP cloud runs, or RunPod endpoints before sandbox deployment.",
                    seam: "nsam_live_workbench_sandbox_attachment_smoke.py",
                    uat: "nsam_live_workbench_sandbox_attachment_smoke.py",
                    logs: [
                        "[INFO] Executing Provider Reachability Smoke Test...",
                        "[INFO] Testing TCP handshake on local broker port 55555...",
                        "[INFO] Verifying cloud egress connectivity...",
                        "[PASS] Brokers reachable. Sandbox attachment authorized."
                    ]
                },
                {
                    title: "15. Integration Pack Mutation & Leak Prevention",
                    desc: "Programmatically registers/unregisters integration packs and guarantees disabled packs do not leak agents.",
                    seam: "nsam_orchestrator_tools.py#L1518-L1604",
                    uat: "nsam_packs_ui_eval_runner.py",
                    logs: [
                        "[INFO] Executing _read_integration_registry_summary()...",
                        "[INFO] Cross-referencing list_capability_packs().",
                        "[INFO] Filtering disabled integrations...",
                        "[PASS] Integration leak prevention validated."
                    ]
                }
            ]
        },
        {
            category: "Category V: Identity, RBAC & Security Governance",
            items: [
                {
                    title: "16. Project Membership Auditing",
                    desc: "Programmatically inspects the owner, editor, and viewer records across project IDs, preventing session-reference leaks.",
                    seam: "nsam_orchestrator_tools.py#L2202-L2295",
                    uat: "nsam_local_auth_admin_eval_runner.py",
                    logs: [
                        "[INFO] Executing inspect_project_membership_model()...",
                        "[INFO] Extracting relationships from project_users table...",
                        "[INFO] Auditing editor permissions...",
                        "[PASS] No session-reference leaks detected."
                    ]
                },
                {
                    title: "17. Project RBAC Posture Analysis",
                    desc: "Explains active native Project sharing and owner constraints, outlining the mapping strategy for migrating to an enterprise IdP.",
                    seam: "nsam_orchestrator_tools.py#L2298-L2384",
                    uat: "nsam_local_auth_admin_eval_runner.py",
                    logs: [
                        "[INFO] Executing explain_project_rbac_policy()...",
                        "[INFO] Mapping permissions across create, read, delete, share...",
                        "[INFO] Evaluating Enterprise IdP migration rules.",
                        "[PASS] RBAC posture analysis complete."
                    ]
                },
                {
                    title: "18. Local Admin Auth and Token Management",
                    desc: "Validates and hardens local lightweight auth, reset lifecycles, and user-role permissions for local admin boundaries.",
                    seam: "nsam_local_auth_admin_eval_runner.py",
                    uat: "nsam_local_auth_admin_eval_runner.py",
                    logs: [
                        "[INFO] Triggering Local Admin Auth Eval Runner...",
                        "[INFO] Simulating local admin login tokens...",
                        "[INFO] Validating password-reset TTL vectors...",
                        "[PASS] Local admin boundary hardened and secure."
                    ]
                }
            ]
        },
        {
            category: "Category VI: Automated Testing & Sandbox Lifecycles",
            items: [
                {
                    title: "19. Model Modality & Routing Policy Readiness",
                    desc: "Enforces routing rules and latency fallback bounds, ensuring queries match capability requirements.",
                    seam: "nsam_model_routing_readiness_policy_eval_runner.py",
                    uat: "nsam_model_routing_readiness_policy_eval_runner.py",
                    logs: [
                        "[INFO] Triggering Model Modality Readiness Eval...",
                        "[INFO] Dry-running latency fallback schemas.",
                        "[INFO] Enforcing routing budgets...",
                        "[PASS] Model routing schemas fully validated."
                    ]
                },
                {
                    title: "20. Automated Regression Suite Execution",
                    desc: "Executes a comprehensive run across the 41-script python evaluator catalog to guarantee workspace continuity.",
                    seam: "C:\\sam-native-review\\evals\\*",
                    uat: "nsam-health-check.ps1",
                    logs: [
                        "[INFO] Initiating Automated Regression Suite Execution...",
                        "[INFO] Sourcing Python Virtual Environment (.venv)...",
                        "[INFO] Triggering 41 evaluation runners sequentially...",
                        "[PASS] 100% Evaluation Success. System green."
                    ]
                }
            ]
        }
    ];

    let activeSimTimeout = null;

    capabilities.forEach(cat => {
        // Create Category Header
        const catHeader = document.createElement('div');
        catHeader.className = 'cp-category-header';
        catHeader.textContent = cat.category;
        
        const catWrapper = document.createElement('div');
        catWrapper.className = 'cp-category';
        catWrapper.appendChild(catHeader);

        const cardGrid = document.createElement('div');
        cardGrid.className = 'cp-cards';

        cat.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'cp-card';
            card.innerHTML = `
                <div class="cp-card-title">${item.title}</div>
                <div class="cp-card-desc">${item.desc}</div>
            `;
            
            card.addEventListener('click', () => {
                // Remove active state from all
                document.querySelectorAll('.cp-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                // Update right panel
                document.getElementById('cp-active-title').textContent = item.title;
                document.getElementById('cp-active-desc').textContent = item.desc;
                document.getElementById('cp-active-seam').textContent = item.seam;
                document.getElementById('cp-active-uat').textContent = item.uat;
                
                document.getElementById('cp-console-status').textContent = "READY FOR SIMULATION";
                document.getElementById('cp-console-status').style.color = "var(--color-amber-500)";
                
                const btnSimulate = document.getElementById('btn-cp-simulate');
                btnSimulate.style.display = "flex";
                
                const stream = document.getElementById('cp-terminal-stream');
                stream.innerHTML = `<div style="color: rgba(255,255,255,0.3);">[SYSTEM] Target capability selected. Ready to dry-run SRE simulation.</div>`;
                
                // Clear any existing simulation
                if (activeSimTimeout) {
                    clearTimeout(activeSimTimeout);
                    btnSimulate.disabled = false;
                    btnSimulate.querySelector('.btn-spinner').style.display = "none";
                    btnSimulate.querySelector('.btn-text').textContent = "Simulate Operation";
                }

                btnSimulate.onclick = () => {
                    btnSimulate.disabled = true;
                    btnSimulate.querySelector('.btn-spinner').style.display = "block";
                    btnSimulate.querySelector('.btn-text').textContent = "Simulating...";
                    
                    document.getElementById('cp-console-status').textContent = "SIMULATION RUNNING";
                    document.getElementById('cp-console-status').style.color = "var(--color-cyan-500)";
                    
                    stream.innerHTML = `<div style="color: var(--color-cyan-500);">[EXEC] Executing SRE dry-run for: ${item.title}...</div>`;
                    
                    let delay = 600;
                    item.logs.forEach((logText, index) => {
                        activeSimTimeout = setTimeout(() => {
                            const line = document.createElement('div');
                            line.textContent = logText;
                            if (logText.includes("[PASS]")) {
                                line.style.color = "var(--color-green-500)";
                            } else if (logText.includes("[WARN]")) {
                                line.style.color = "var(--color-amber-500)";
                            }
                            stream.appendChild(line);
                            stream.scrollTop = stream.scrollHeight;
                            
                            // Last item
                            if (index === item.logs.length - 1) {
                                btnSimulate.disabled = false;
                                btnSimulate.querySelector('.btn-spinner').style.display = "none";
                                btnSimulate.querySelector('.btn-text').textContent = "Re-run Simulation";
                                
                                document.getElementById('cp-console-status').textContent = "SIMULATION COMPLETE";
                                document.getElementById('cp-console-status').style.color = "var(--color-green-500)";
                            }
                        }, delay);
                        delay += 800 + Math.random() * 500;
                    });
                };
            });

            cardGrid.appendChild(card);
        });

        catWrapper.appendChild(cardGrid);
        grid.appendChild(catWrapper);
    });
}

/* ==========================================================================
   Floating SRE Orca Companion Logic
   ========================================================================== */
function initOrcaCompanion() {
    const bubble = document.getElementById('companion-bubble');
    const bubbleText = document.getElementById('companion-bubble-text');
    const avatar = document.getElementById('companion-avatar');
    const btnClose = document.getElementById('btn-close-bubble');
    
    if (!bubble || !avatar) return;

    const sreTips = [
        "Did you know? The NSAM platform uses checksum-signed Dockets to mathematically prove agent intentions.",
        "Pro Tip: Use the '/goal' command if you want me to pursue a complex operation autonomously!",
        "Security First! All sandbox agents are deployed into isolated Docker networks with zero egress by default.",
        "SRE Advice: Always run the 'nsam_model_routing_readiness_policy_eval_runner.py' before updating production models.",
        "I can help you build custom integration packs! Just ask or use the '/grill-me' command to start an interview.",
        "Remember: Capability Planning checks the 'NSAM_RUNTIME_CAPABILITY_MATRIX.json' to prevent over-allocating GPUs."
    ];

    let tipIndex = 0;

    // Jumping animation on click
    avatar.addEventListener('click', () => {
        // Jump
        const svgElement = avatar.querySelector('svg');
        svgElement.classList.remove('jumping');
        void svgElement.offsetWidth; // trigger reflow
        svgElement.classList.add('jumping');
        
        // Show bubble
        bubble.classList.remove('hide');
        
        // Update tip
        tipIndex = (tipIndex + 1) % sreTips.length;
        bubbleText.innerHTML = `<strong>SRE Insight:</strong><br/>${sreTips[tipIndex]}`;
        
        // Subtle haptic feel
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });

    // Close bubble
    btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        bubble.classList.add('hide');
    });
    
    // Periodically jump for attention if bubble is closed
    setInterval(() => {
        if (bubble.classList.contains('hide')) {
            if (Math.random() > 0.7) { // 30% chance every interval
                const svgElement = avatar.querySelector('svg');
                svgElement.classList.remove('jumping');
                void svgElement.offsetWidth;
                svgElement.classList.add('jumping');
            }
        }
    }, 15000);
}

/* ==========================================================================
   Brand & Assets Chamber Controller (Showcase, Clipboard Copy, Backdrop Switcher)
   ========================================================================== */
function initBrandChamber() {
    // Clipboard Copy Buttons for SVG code
    const copyBtns = document.querySelectorAll('.copy-svg-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const svgId = btn.dataset.svgId;
            const textarea = document.getElementById(svgId);
            if (textarea) {
                // Temporary reveal to let browser copy
                textarea.style.display = 'block';
                textarea.select();
                try {
                    document.execCommand('copy');
                    const originalText = btn.textContent;
                    btn.textContent = '✓ SVG Code Copied!';
                    btn.style.borderColor = 'var(--color-green-500)';
                    btn.style.color = 'var(--color-green-500)';
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.borderColor = '';
                        btn.style.color = '';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy SVG code', err);
                }
                textarea.style.display = 'none';
            }
        });
    });

    // Backdrop Switcher for Spinner Playground
    const backdropBtns = document.querySelectorAll('.backdrop-btn');
    const panel = document.getElementById('spinner-playground-panel');
    const statusText = document.getElementById('playground-status-text');
    
    if (backdropBtns && panel) {
        backdropBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                backdropBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const bg = btn.dataset.bg;
                panel.style.background = bg;
                
                // If it is light theme (slate white), adjust borders and text colors
                if (bg === '#f8fafc') {
                    panel.style.border = '1px solid rgba(0,0,0,0.1)';
                    if (statusText) {
                        statusText.style.color = '#020617';
                        statusText.textContent = 'SECURE ENCLAVE LOCAL RUNTIME';
                    }
                } else {
                    panel.style.border = '';
                    if (statusText) {
                        statusText.style.color = 'var(--color-cyan-500)';
                        statusText.textContent = 'SYSTEM LOADING SECURE ENCLAVE';
                    }
                }
            });
        });
    }
}

