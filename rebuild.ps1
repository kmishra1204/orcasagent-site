$htmlPath = Join-Path $PSScriptRoot "index.html"
$lines = [System.IO.File]::ReadAllLines($htmlPath)

# Function to get the line range of a section by its ID
function Get-SectionLines($id) {
    $startIndex = -1
    $endIndex = -1
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -match "<section\s+[^>]*?id=`"$id`"") {
            # Find the start line, scanning backwards to capture the comment block
            $startLine = $i
            # Walk back up to 6 lines to find the comment block
            for ($k = 1; $k -le 6; $k++) {
                if ($i - $k -ge 0) {
                    $prevLine = $lines[$i - $k]
                    if ($prevLine -match "=====" -or $prevLine -match "<!--" -or $prevLine -match "-->") {
                        # We found a comment boundary, let's include it
                        # Go back until we find the start of the comment block
                        $candidateStart = $i - $k
                        while ($candidateStart -gt 0 -and -not ($lines[$candidateStart] -match "<!--")) {
                            $candidateStart--
                        }
                        $startLine = $candidateStart
                        break
                    }
                }
            }
            $startIndex = $startLine
            
            # Find the closing </section>
            for ($j = $i; $j -lt $lines.Length; $j++) {
                if ($lines[$j] -match "</section>") {
                    $endIndex = $j
                    break
                }
            }
            break
        }
    }
    
    if ($startIndex -eq -1 -or $endIndex -eq -1) {
        Write-Error "Could not find section $id"
        exit 1
    }
    
    $content = $lines[$startIndex..$endIndex] -join "`r`n"
    return @{
        Content = $content
        StartIndex = $startIndex
        EndIndex = $endIndex
    }
}

Write-Host "Extracting sections..."
$problemData = Get-SectionLines "problem"
$platformData = Get-SectionLines "platform"
$operatingModelData = Get-SectionLines "operating-model"
$orcasCoreData = Get-SectionLines "orcas-core"
$videoDemoData = Get-SectionLines "video-demo"
$secondBrainData = Get-SectionLines "second-brain"
$docketData = Get-SectionLines "docket"
$privateMeshData = Get-SectionLines "private-mesh"
$modelChoiceData = Get-SectionLines "model-choice"
$trustData = Get-SectionLines "trust"
$useCasesData = Get-SectionLines "use-cases"
$proofArtifactsData = Get-SectionLines "proof-artifacts"
$competitiveData = Get-SectionLines "competitive"
$assessmentData = Get-SectionLines "assessment"

Write-Host "Verifying extracted indices..."
Write-Host "problem:      " $problemData.StartIndex "to" $problemData.EndIndex "length:" $problemData.Content.Length
Write-Host "platform:     " $platformData.StartIndex "to" $platformData.EndIndex "length:" $platformData.Content.Length
Write-Host "orcas-core:   " $orcasCoreData.StartIndex "to" $orcasCoreData.EndIndex "length:" $orcasCoreData.Content.Length
Write-Host "private-mesh: " $privateMeshData.StartIndex "to" $privateMeshData.EndIndex "length:" $privateMeshData.Content.Length

# The header is from line 0 to the line right before problem section's start
$headerLines = $lines[0..($problemData.StartIndex - 1)] -join "`r`n"

# The footer is from the line right after assessment section's end to the end of the file
$footerLines = $lines[($assessmentData.EndIndex + 1)..($lines.Length - 1)] -join "`r`n"

# Platform Explorer Grid
$platformExplorerGrid = @"

        <!-- ==========================================================================
           EXPLORER GATEWAY: ECOSYSTEM EXPLORER GRID
           ========================================================================== -->
        <section class="band-white" id="platform-explorer" style="border-bottom: 1px solid var(--color-border-200); padding: 4rem 0;">
            <div class="container">
                <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
                    <span class="mono" style="color: var(--color-cyan-500); text-transform: uppercase; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.05em;">Interactive Ecosystem Explorer</span>
                    <h2 style="margin-top: 0.5rem; font-size: 2.25rem;">Explore the NSAM Ecosystem Chambers</h2>
                    <p style="max-width: 600px; margin: 0.5rem auto 0 auto; color: var(--color-slate-600);">Click any chamber below to enter, expand deep technical structures, and view live governed operations.</p>
                </div>
                
                <div class="gateway-grid">
                    <!-- Card 1 -->
                    <div class="gateway-card" data-target="chamber-architecture">
                        <div>
                            <div class="gateway-icon">⚃</div>
                            <h3>Core Architecture</h3>
                            <p>Understand the problem, platform components, OrcasAgent core capabilities, and private mesh security layout.</p>
                        </div>
                        <div class="gateway-action">Explore Architecture →</div>
                    </div>
                    
                    <!-- Card 2 -->
                    <div class="gateway-card" data-target="chamber-operations">
                        <div>
                            <div class="gateway-icon">⚙</div>
                            <h3>Operating Sequence</h3>
                            <p>See the controlled execution flow from intent to runtime, and watch the SRE terminal simulator in action.</p>
                        </div>
                        <div class="gateway-action">Watch Sequence →</div>
                    </div>
                    
                    <!-- Card 3 -->
                    <div class="gateway-card" data-target="chamber-governance">
                        <div>
                            <div class="gateway-icon">☊</div>
                            <h3>Sovereign Controls</h3>
                            <p>Inspect Neo4j memory graphs, examine live SRE block Dockets, review cost routing, and check compliance metrics.</p>
                        </div>
                        <div class="gateway-action">Inspect Controls →</div>
                    </div>
                    
                    <!-- Card 4 -->
                    <div class="gateway-card" data-target="chamber-evidence">
                        <div>
                            <div class="gateway-icon">⎘</div>
                            <h3>Proof &amp; Use Cases</h3>
                            <p>Explore real-world enterprise use cases, review recorded audit artifacts, and compare platform specifications.</p>
                        </div>
                        <div class="gateway-action">View Evidence →</div>
                    </div>

                    <!-- Card 5 -->
                    <div class="gateway-card" data-target="chamber-brand">
                        <div>
                            <div class="gateway-icon">🐬</div>
                            <h3>Brand &amp; Assets</h3>
                            <p>Explore the cybernetic design system, view high-res brand icons, download assets, and inspect the dynamic Orca spinner.</p>
                        </div>
                        <div class="gateway-action">Enter Brand Chamber →</div>
                    </div>
                </div>

                <div class="global-expansion-controls" style="display: flex; justify-content: center; gap: 1rem; margin-top: 2.5rem;">
                    <button class="btn btn-secondary" id="btn-expand-all" style="padding: 0.6rem 1.25rem; font-size: 0.8rem; font-family: var(--font-mono); text-transform: uppercase;">[+] Expand All Chambers</button>
                    <button class="btn btn-secondary" id="btn-collapse-all" style="padding: 0.6rem 1.25rem; font-size: 0.8rem; font-family: var(--font-mono); text-transform: uppercase;">[-] Collapse All Chambers</button>
                </div>
            </div>
        </section>
"@

$chamber1 = @"

        <!-- ==========================================================================
           CHAMBER 1: CORE ARCHITECTURE & PLATFORM (COLLAPSIBLE DRAWER)
           ========================================================================== -->
        <div class="chamber-drawer" id="chamber-architecture">
            <div class="chamber-drawer-header">
                <div class="chamber-title-badge">
                    <span>⚃</span> Chamber 1: Core Architecture &amp; Platform
                </div>
                <button class="chamber-close-btn" data-target="chamber-architecture">Close [X]</button>
            </div>
$($problemData.Content)
$($platformData.Content)
$($orcasCoreData.Content)
$($privateMeshData.Content)
        </div>
"@

$chamber2 = @"

        <!-- ==========================================================================
           CHAMBER 2: OPERATING SEQUENCE (COLLAPSIBLE DRAWER)
           ========================================================================== -->
        <div class="chamber-drawer" id="chamber-operations">
            <div class="chamber-drawer-header">
                <div class="chamber-title-badge">
                    <span>⚙</span> Chamber 2: Operating Sequence &amp; Flows
                </div>
                <button class="chamber-close-btn" data-target="chamber-operations">Close [X]</button>
            </div>
$($operatingModelData.Content)
$($videoDemoData.Content)
        </div>
"@

$chamber3 = @"

        <!-- ==========================================================================
           CHAMBER 3: SOVEREIGN CONTROLS (COLLAPSIBLE DRAWER)
           ========================================================================== -->
        <div class="chamber-drawer" id="chamber-governance">
            <div class="chamber-drawer-header">
                <div class="chamber-title-badge">
                    <span>☊</span> Chamber 3: Sovereign Memory &amp; Controls
                </div>
                <button class="chamber-close-btn" data-target="chamber-governance">Close [X]</button>
            </div>
$($secondBrainData.Content)
$($docketData.Content)
$($modelChoiceData.Content)
$($trustData.Content)
        </div>
"@

$chamber4 = @"

        <!-- ==========================================================================
           CHAMBER 4: PROOF & USE CASES (COLLAPSIBLE DRAWER)
           ========================================================================== -->
        <div class="chamber-drawer" id="chamber-evidence">
            <div class="chamber-drawer-header">
                <div class="chamber-title-badge">
                    <span>⎘</span> Chamber 4: Verified Proof &amp; Use Cases
                </div>
                <button class="chamber-close-btn" data-target="chamber-evidence">Close [X]</button>
            </div>
$($useCasesData.Content)
$($proofArtifactsData.Content)
$($competitiveData.Content)
        </div>
"@

# Read Brand Vector SVGs for interactive showcase
$iconsPath = Join-Path $PSScriptRoot "icons"
$agentKnowledgeSvg = [System.IO.File]::ReadAllText((Join-Path $iconsPath "agent-knowledge.svg"), [System.Text.Encoding]::UTF8)
$agentMeshSvg = [System.IO.File]::ReadAllText((Join-Path $iconsPath "agent-mesh.svg"), [System.Text.Encoding]::UTF8)
$orcasJumpingSvg = [System.IO.File]::ReadAllText((Join-Path $iconsPath "orcas-jumping.svg"), [System.Text.Encoding]::UTF8)
$spinnerJumpingSvg = [System.IO.File]::ReadAllText((Join-Path $iconsPath "spinner-jumping.svg"), [System.Text.Encoding]::UTF8)

# Strip SVG height/width in container for responsiveness if needed
$agentKnowledgeSvgResp = $agentKnowledgeSvg -replace 'width="\d+%"\s+height="\d+%"', 'width="100%" height="100%"'
$agentMeshSvgResp = $agentMeshSvg -replace 'width="\d+%"\s+height="\d+%"', 'width="100%" height="100%"'
$orcasJumpingSvgResp = $orcasJumpingSvg -replace 'width="\d+%"\s+height="\d+%"', 'width="100%" height="100%"'
$spinnerJumpingSvgResp = $spinnerJumpingSvg -replace 'width="\d+%"\s+height="\d+%"', 'width="100%" height="100%"'

# Define Chamber 5: Brand Identity & Cybernetic Assets
$chamber5 = @"

        <!-- ==========================================================================
           CHAMBER 5: BRAND IDENTITY & CYBERNETIC ASSETS (COLLAPSIBLE DRAWER)
           ========================================================================== -->
        <div class="chamber-drawer" id="chamber-brand">
            <div class="chamber-drawer-header">
                <div class="chamber-title-badge">
                    <span>🐬</span> Chamber 5: Brand Identity &amp; Cybernetic Assets
                </div>
                <button class="chamber-close-btn" data-target="chamber-brand">Close [X]</button>
            </div>
            
            <section class="band-white" id="brand-identity" style="padding: 5rem 0; border-bottom: 1px solid var(--color-border-200);">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 4rem;">
                        <span class="mono" style="color: var(--color-cyan-500); text-transform: uppercase; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.05em;">Visual Identity &amp; Assets</span>
                        <h2 style="margin-top: 0.5rem; font-size: 2.25rem;">Enterprise Brand &amp; Vector Icon Package</h2>
                        <p style="max-width: 650px; margin: 0.5rem auto 0 auto; color: var(--color-slate-600);">Explore the core brand elements of OrcasAgent&trade;. Beautiful, hand-crafted scalable vector graphics (SVG) and 3D glassmorphic brand assets designed for high-performance, compliant, and sovereign operations.</p>
                    </div>

                    <!-- Row 1: High Fidelity Generated Logos -->
                    <div class="brand-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 3rem; margin-bottom: 5rem;">
                        <!-- Logo Card 1 -->
                        <div class="brand-showcase-card" style="background: rgba(255, 255, 255, 0.5); border: 1px solid var(--color-border-200); border-radius: 12px; padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.02); transition: all 0.4s ease; position: relative;">
                            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-cyan-500); font-weight: bold; letter-spacing: 0.05em;">BRAND SYMBOL</div>
                            <h3 style="font-size: 1.5rem; margin: 0;">Sleek Cybernetic Orca Logo</h3>
                            <p style="color: var(--color-slate-600); font-size: 0.9rem; line-height: 1.5; margin: 0;">The primary brand symbol representing OrcasAgent&trade;. Combines clean geometric contours, vibrant electric-cyan highlights, and an obsidian silhouette reflecting speed, intelligence, and apex command capability.</p>
                            <div style="background: radial-gradient(circle at center, #07193b 0%, #02091c 100%); border-radius: 8px; padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 240px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden;">
                                <img src="logo/orcas_logo_new.png" alt="Cybernetic Orca Logo" style="max-width: 180px; height: auto; filter: drop-shadow(0 0 15px rgba(0, 240, 255, 0.4)); transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            </div>
                            <div style="display: flex; gap: 1rem;">
                                <a href="logo/orcas_logo_new.png" download class="btn btn-secondary" style="flex-grow: 1; text-align: center; font-size: 0.75rem; padding: 0.6rem; font-family: var(--font-mono);">[↓] Download PNG</a>
                            </div>
                        </div>

                        <!-- Logo Card 2 -->
                        <div class="brand-showcase-card" style="background: rgba(255, 255, 255, 0.5); border: 1px solid var(--color-border-200); border-radius: 12px; padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.02); transition: all 0.4s ease; position: relative;">
                            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-cyan-500); font-weight: bold; letter-spacing: 0.05em;">SRE CERTIFICATE</div>
                            <h3 style="font-size: 1.5rem; margin: 0;">Sovereign Docket Seal</h3>
                            <p style="color: var(--color-slate-600); font-size: 0.9rem; line-height: 1.5; margin: 0;">A 3D glassmorphic shield verification seal designed for SRE sandbox spawners. Represents secure, tamper-proof, and certified cryptographic governance over active execution checkpoints.</p>
                            <div style="background: radial-gradient(circle at center, #01141a 0%, #00040a 100%); border-radius: 8px; padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 240px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden;">
                                <img src="logo/docket_verification_seal.png" alt="Sovereign Cryptographic Docket Seal" style="max-width: 160px; height: auto; filter: drop-shadow(0 0 15px rgba(22, 163, 123, 0.4)); transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            </div>
                            <div style="display: flex; gap: 1rem;">
                                <a href="logo/docket_verification_seal.png" download class="btn btn-secondary" style="flex-grow: 1; text-align: center; font-size: 0.75rem; padding: 0.6rem; font-family: var(--font-mono);">[↓] Download PNG</a>
                            </div>
                        </div>
                    </div>

                    <!-- Row 2: Scalable Vector Icons Package -->
                    <div style="margin-bottom: 5rem;">
                        <h3 style="font-size: 1.75rem; margin-bottom: 2rem; text-align: center;">Scalable Vector Icon Package</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
                            <!-- Icon 1: Neural Core -->
                            <div class="vector-icon-card" style="background: rgba(255,255,255,0.4); border: 1px solid var(--color-border-200); border-radius: 8px; padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.25rem;">
                                <div style="width: 100px; height: 100px; background: rgba(0,0,0,0.02); border-radius: 50%; padding: 0.5rem; display: flex; justify-content: center; align-items: center; transition: all 0.3s ease;" class="vector-icon-container">
                                    $agentKnowledgeSvgResp
                                </div>
                                <h4 style="margin: 0; font-size: 1.15rem;">Neural Core / Profiles</h4>
                                <p style="font-size: 0.8rem; color: var(--color-slate-600); margin: 0; line-height: 1.4;">Represents multi-profile enterprise knowledge, unified platform understanding, and agent-level SRE operations.</p>
                                <button class="btn btn-secondary copy-svg-btn" data-svg-id="svg-agent-knowledge" style="width: 100%; font-size: 0.7rem; font-family: var(--font-mono); padding: 0.5rem;">[ ] Copy SVG Code</button>
                                <textarea id="svg-agent-knowledge" style="display:none;">$agentKnowledgeSvg</textarea>
                            </div>

                            <!-- Icon 2: Connected Mesh -->
                            <div class="vector-icon-card" style="background: rgba(255,255,255,0.4); border: 1px solid var(--color-border-200); border-radius: 8px; padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.25rem;">
                                <div style="width: 100px; height: 100px; background: rgba(0,0,0,0.02); border-radius: 50%; padding: 0.5rem; display: flex; justify-content: center; align-items: center; transition: all 0.3s ease;" class="vector-icon-container">
                                    $agentMeshSvgResp
                                </div>
                                <h4 style="margin: 0; font-size: 1.15rem;">Connected Mesh Network</h4>
                                <p style="font-size: 0.8rem; color: var(--color-slate-600); margin: 0; line-height: 1.4;">Represents secure, distributed, and multi-agent Solace mesh nodes executing coordinated sovereign tasks.</p>
                                <button class="btn btn-secondary copy-svg-btn" data-svg-id="svg-agent-mesh" style="width: 100%; font-size: 0.7rem; font-family: var(--font-mono); padding: 0.5rem;">[ ] Copy SVG Code</button>
                                <textarea id="svg-agent-mesh" style="display:none;">$agentMeshSvg</textarea>
                            </div>

                            <!-- Icon 3: Orcas Jumping -->
                            <div class="vector-icon-card" style="background: rgba(255,255,255,0.4); border: 1px solid var(--color-border-200); border-radius: 8px; padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.25rem;">
                                <div style="width: 100px; height: 100px; background: rgba(0,0,0,0.02); border-radius: 50%; padding: 0.5rem; display: flex; justify-content: center; align-items: center; transition: all 0.3s ease;" class="vector-icon-container">
                                    $orcasJumpingSvgResp
                                </div>
                                <h4 style="margin: 0; font-size: 1.15rem;">Orcas Leaping Emblem</h4>
                                <p style="font-size: 0.8rem; color: var(--color-slate-600); margin: 0; line-height: 1.4;">Represents agility, speed, and continuous leaps of platform intelligence in and out of the secure telemetry waves.</p>
                                <button class="btn btn-secondary copy-svg-btn" data-svg-id="svg-orcas-jumping" style="width: 100%; font-size: 0.7rem; font-family: var(--font-mono); padding: 0.5rem;">[ ] Copy SVG Code</button>
                                <textarea id="svg-orcas-jumping" style="display:none;">$orcasJumpingSvg</textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Row 3: Animated Jumping Orca Spinner Demonstration Playground -->
                    <div style="border-top: 1px solid var(--color-border-200); padding-top: 4rem;">
                        <h3 style="font-size: 1.75rem; margin-bottom: 1rem; text-align: center;">Animated Jumping Orca Preloader Playground</h3>
                        <p style="text-align: center; max-width: 600px; margin: 0 auto 3rem auto; color: var(--color-slate-600); font-size: 0.9rem;">Test the responsiveness, visual styles, and background backdrops of the animated Jumping Orca preloader spinner in real-time.</p>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                            <!-- Controls and Copy -->
                            <div style="display: flex; flex-direction: column; gap: 1.5rem; justify-content: center;">
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    <label style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: bold; color: var(--color-slate-600);">SELECT BACKDROP THEME</label>
                                    <div style="display: flex; gap: 0.5rem;">
                                        <button class="btn btn-secondary backdrop-btn active" data-bg="#030e22" style="font-size: 0.75rem; font-family: var(--font-mono); padding: 0.5rem 1rem;">Navy Deep</button>
                                        <button class="btn btn-secondary backdrop-btn" data-bg="#020617" style="font-size: 0.75rem; font-family: var(--font-mono); padding: 0.5rem 1rem;">Slate Black</button>
                                        <button class="btn btn-secondary backdrop-btn" data-bg="#f8fafc" style="font-size: 0.75rem; font-family: var(--font-mono); padding: 0.5rem 1rem;">Slate White</button>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    <label style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: bold; color: var(--color-slate-600);">SPINNER INTEGRITY CHECKS</label>
                                    <p style="font-size: 0.8rem; color: var(--color-slate-600); line-height: 1.45; margin: 0;">The loader is hardware-accelerated via CSS keyframe triggers, scaling dynamically to any view-port and maintaining 60 FPS under heavy rendering loads.</p>
                                </div>
                                <button class="btn btn-secondary copy-svg-btn" data-svg-id="svg-spinner-jumping" style="font-size: 0.75rem; font-family: var(--font-mono); padding: 0.65rem 1.25rem;">[ ] Copy Spinner SVG Code</button>
                                <textarea id="svg-spinner-jumping" style="display:none;">$spinnerJumpingSvg</textarea>
                            </div>

                            <!-- Live Playground Render Panel -->
                            <div id="spinner-playground-panel" style="background: #030e22; border: 1px solid var(--color-border-200); border-radius: 12px; min-height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 1.5rem; transition: background 0.4s ease; box-shadow: inset 0 4px 30px rgba(0,0,0,0.3); position: relative; padding: 2rem;">
                                <div style="width: 140px; height: 140px; filter: drop-shadow(0 0 15px rgba(12, 210, 228, 0.4));">
                                    $spinnerJumpingSvgResp
                                </div>
                                <div style="font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em; color: var(--color-cyan-500); text-align: center; text-transform: uppercase;" id="playground-status-text">SYSTEM LOADING SECURE ENCLAVE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
"@

Write-Host "Assembling final HTML..."
$finalHtml = $headerLines + "`r`n" + $platformExplorerGrid + "`r`n" + $chamber1 + "`r`n" + $chamber2 + "`r`n" + $chamber3 + "`r`n" + $chamber4 + "`r`n" + $chamber5 + "`r`n" + $($assessmentData.Content) + "`r`n" + $footerLines

# Write final html
[System.IO.File]::WriteAllText($htmlPath, $finalHtml, [System.Text.Encoding]::UTF8)
Write-Host "Successfully restructured index.html using Line-Scanning and saved!"
