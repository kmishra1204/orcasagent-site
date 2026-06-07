# Load index.html
$path = "C:\Users\rdpadmin\.gemini\antigravity\scratch\orcasagent-site\index.html"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Preloader HTML Definition (Using New Geometric Trademark Orca)
$preloaderHtml = @"
<body>

    <!-- Site-Wide Cybernetic Preloader -->
    <div id="site-preloader" class="preloader-overlay">
        <div class="preloader-content">
            <div class="preloader-spinner">
                <!-- INLINE SPINNER SVG (Premium Jumping Orca) -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%" fill="none" style="display: block;">
                    <defs>
                        <style>
                            @keyframes spinRing {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                            @keyframes wavesFlow {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-60px); }
                            }
                            @keyframes orcaLeap {
                                0% {
                                    transform: translate(30px, 90px) rotate(-30deg) scale(0.65);
                                    opacity: 0;
                                }
                                5% { opacity: 1; }
                                25% { transform: translate(55px, 20px) rotate(-15deg) scale(0.65); }
                                50% { transform: translate(90px, 5px) rotate(5deg) scale(0.65); }
                                75% { transform: translate(125px, 35px) rotate(35deg) scale(0.65); opacity: 1; }
                                82% { transform: translate(135px, 75px) rotate(45deg) scale(0.65); opacity: 0; }
                                100% {
                                    transform: translate(30px, 90px) rotate(-30deg) scale(0.65);
                                    opacity: 0;
                                }
                            }
                            @keyframes splashLeft {
                                0%, 15% { transform: scale(0); opacity: 0; }
                                20% { transform: scale(1); opacity: 1; }
                                35% { transform: scale(1.8); opacity: 0; }
                                100% { transform: scale(0); opacity: 0; }
                            }
                            @keyframes splashRight {
                                0%, 68% { transform: scale(0); opacity: 0; }
                                73% { transform: scale(1); opacity: 1; }
                                88% { transform: scale(1.8); opacity: 0; }
                                100% { transform: scale(0); opacity: 0; }
                            }
                            .outer-loader-ring {
                                transform-origin: 100px 100px;
                                animation: spinRing 2.2s linear infinite;
                            }
                            .animated-waves {
                                animation: wavesFlow 1.2s linear infinite;
                            }
                            .jumping-orca {
                                transform-origin: center;
                                animation: orcaLeap 3.2s cubic-bezier(0.4, 0.0, 0.6, 1) infinite;
                            }
                            .splash-group-left {
                                transform-origin: 65px 120px;
                                animation: splashLeft 3.2s ease-out infinite;
                            }
                            .splash-group-right {
                                transform-origin: 135px 125px;
                                animation: splashRight 3.2s ease-out infinite;
                            }
                            .color-navy-bg { fill: #030e22; fill-opacity: 0.85; }
                            .color-ring { stroke: url(#ringGlowGradient); }
                            .color-wave-back { fill: none; stroke: #154573; stroke-width: 3; stroke-linecap: round; }
                            .color-wave-mid { fill: none; stroke: #1d5c9c; stroke-width: 4; stroke-linecap: round; }
                            .color-wave-front { fill: none; stroke: #2a7cd1; stroke-width: 4.5; stroke-linecap: round; }
                            .color-splash { fill: #2a7cd1; }
                            .orca-black { fill: #20232c; }
                            .orca-white { fill: #e5e8f0; }
                            .orca-accent { fill: #82a4d6; }
                        </style>
                        <linearGradient id="ringGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.1" />
                            <stop offset="50%" stop-color="#00f0ff" stop-opacity="0.85" />
                            <stop offset="100%" stop-color="#39ff14" />
                        </linearGradient>
                        <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <circle class="color-navy-bg" cx="100" cy="100" r="92" stroke="#1d5c9c" stroke-width="1" />
                    <circle class="outer-loader-ring" cx="100" cy="100" r="80" fill="none" stroke="url(#ringGlowGradient)" stroke-width="3" stroke-dasharray="320 120" stroke-linecap="round" filter="url(#glowEffect)" />
                    <clipPath id="platterClip">
                        <circle cx="100" cy="100" r="76" />
                    </clipPath>
                    <g clip-path="url(#platterClip)">
                        <g class="splash-group-left">
                            <circle class="color-splash" cx="62" cy="115" r="3" />
                            <circle class="color-splash" cx="54" cy="110" r="2.5" />
                            <circle class="color-splash" cx="70" cy="108" r="2" />
                            <path d="M 62,118 Q 50,95 45,102" stroke="#2a7cd1" stroke-width="2" fill="none" stroke-linecap="round" />
                            <path d="M 65,118 Q 75,98 80,105" stroke="#2a7cd1" stroke-width="1.5" fill="none" stroke-linecap="round" />
                        </g>
                        <g class="splash-group-right">
                            <circle class="color-splash" cx="138" cy="118" r="3" />
                            <circle class="color-splash" cx="130" cy="112" r="2.5" />
                            <circle class="color-splash" cx="146" cy="114" r="2" />
                            <path d="M 134,120 Q 125,100 120,106" stroke="#2a7cd1" stroke-width="1.5" fill="none" stroke-linecap="round" />
                            <path d="M 138,120 Q 150,102 155,108" stroke="#2a7cd1" stroke-width="2" fill="none" stroke-linecap="round" />
                        </g>
                        <g class="jumping-orca">
                            <path class="orca-black" d="M -10,60 C -15,40, 10,0, 35,-30 C 60,-55, 100,-60, 130,-45 C 160,-40, 175,-15, 170,5 C 160,20, 130,30, 105,30 C 75,30, 50,38, 20,58 C 2,70, -5,75, -10,60 Z" />
                            <path class="orca-white" d="M 105,30 C 130,30, 160,20, 168,5 C 170,2, 160,-2, 145,0 C 120,4, 85,12, 60,20 C 35,28, 10,50, -2,62 C 5,55, 30,38, 60,30 C 78,27, 92,28, 105,30 Z" />
                            <ellipse class="orca-white" cx="112" cy="-25" rx="16" ry="5" transform="rotate(-15 112 -25)" />
                            <path class="orca-black" d="M 50,-30 C 51,-60, 42,-100, 45,-105 C 50,-95, 65,-60, 72,-42 Z" />
                            <path class="orca-black" d="M 85,15 C 72,15, 60,35, 58,48 C 62,42, 80,28, 85,15 Z" />
                            <path class="orca-black" d="M -5,58 C -15,58, -30,40, -40,35 C -35,45, -20,62, -5,65 Z" />
                        </g>
                        <g class="animated-waves">
                            <path class="color-wave-back" d="M 0,118 Q 15,110 30,118 T 60,118 T 90,118 T 120,118 T 150,118 T 180,118 T 210,118 T 240,118 T 270,118 T 300,118" />
                            <path class="color-wave-mid" d="M -15,124 Q 0,116 15,124 T 45,124 T 75,124 T 105,124 T 135,124 T 165,124 T 195,124 T 225,124 T 255,124 T 285,124" opacity="0.75" />
                            <path class="color-wave-front" d="M -30,130 Q -15,122 0,130 T 30,130 T 60,130 T 90,130 T 120,130 T 150,130 T 180,130 T 210,130 T 240,130 T 270,130" />
                        </g>
                    </g>
                </svg>
            </div>
            <div class="preloader-text">ORCAS PLATFORM SECURE TELEMETRY</div>
            <div class="preloader-subtext">Initializing governed autonomous agent operating system...</div>
        </div>
    </div>
"@

# 2. Header Logo SVG Definition (Using New Geometric Trademark Orca)
$headerLogoSvg = @"
                    <svg viewBox="0 0 200 200" width="28" height="28" fill="none" style="display: block;">
                        <defs>
                            <linearGradient id="emblemDarkHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#03112a" />
                                <stop offset="100%" stop-color="#081a38" />
                            </linearGradient>
                            <linearGradient id="emblemCyanHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#00f0ff" />
                                <stop offset="100%" stop-color="#00a3ff" />
                            </linearGradient>
                            <linearGradient id="emblemLimeHeader" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#39ff14" />
                                <stop offset="100%" stop-color="#a2f51f" />
                            </linearGradient>
                            <filter id="glowEmblemHeader" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <g transform="translate(100, 100) scale(1.15)">
                            <!-- Dorsal Fin -->
                            <path d="M -5 -15 C -8 -45, -28 -55, -28 -55 C -22 -35, -20 -20, -18 -10 Z" fill="url(#emblemDarkHeader)" stroke="#00f0ff" stroke-width="1.5" stroke-linejoin="round" />
                            <!-- Main Body -->
                            <path d="M -60 10 C -40 -15, 5 -25, 45 -5 C 55 -1, 58 10, 42 12 C 15 15, -25 25, -60 10 Z" fill="url(#emblemDarkHeader)" stroke="#00f0ff" stroke-width="1.5" stroke-linejoin="round" />
                            <!-- White Belly -->
                            <path d="M -40 12 C -20 18, 10 15, 30 10 C 35 9, 32 6, 25 7 C 5 10, -20 10, -40 12 Z" fill="#ffffff" opacity="0.9" filter="url(#glowEmblemHeader)" />
                            <!-- Tail -->
                            <path d="M -58 11 C -68 10, -78 2, -85 -5 C -80 -5, -76 -10, -82 -18 C -78 -10, -70 -2, -58 8 Z" fill="url(#emblemDarkHeader)" stroke="#00f0ff" stroke-width="1.5" stroke-linejoin="round" />
                            <!-- Accents -->
                            <path d="M -30 -4 C 0 -12, 20 -8, 32 -2" fill="none" stroke="url(#emblemLimeHeader)" stroke-width="3" stroke-linecap="round" filter="url(#glowEmblemHeader)" />
                            <path d="M -42 4 C -18 2, 5 -1, 18 -2" fill="none" stroke="url(#emblemCyanHeader)" stroke-width="2.5" stroke-linecap="round" />
                            <!-- Eye -->
                            <circle cx="28" cy="-5" r="3" fill="#ffffff" />
                            <circle cx="28" cy="-5" r="1.5" fill="#00f0ff" />
                            <!-- Flipper -->
                            <path d="M 0 10 C -5 25, -18 35, -22 35 C -20 28, -8 18, -4 10 Z" fill="url(#emblemDarkHeader)" stroke="#00f0ff" stroke-width="1.25" stroke-linejoin="round" />
                            <path d="M -3 11 C -6 20, -12 26, -14 26 C -13 22, -6 16, -4 11 Z" fill="url(#emblemCyanHeader)" opacity="0.8" />
                        </g>
                    </svg>
"@

# 3. Footer Logo SVG Definition (Using New Geometric Trademark Orca)
$footerLogoSvg = @"
                    <svg viewBox="0 0 200 200" width="28" height="28" fill="none" style="display: block;">
                        <defs>
                            <linearGradient id="emblemDarkFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#03112a" />
                                <stop offset="100%" stop-color="#081a38" />
                            </linearGradient>
                            <linearGradient id="emblemCyanFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#00f0ff" />
                                <stop offset="100%" stop-color="#00a3ff" />
                            </linearGradient>
                            <linearGradient id="emblemLimeFooter" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#39ff14" />
                                <stop offset="100%" stop-color="#a2f51f" />
                            </linearGradient>
                            <filter id="glowEmblemFooter" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <g transform="translate(100, 100) scale(1.15)">
                            <!-- Dorsal Fin -->
                            <path d="M -5 -15 C -8 -45, -28 -55, -28 -55 C -22 -35, -20 -20, -18 -10 Z" fill="url(#emblemDarkFooter)" stroke="#00f0ff" stroke-width="1.5" stroke-linejoin="round" />
                            <!-- Main Body -->
                            <path d="M -60 10 C -40 -15, 5 -25, 45 -5 C 55 -1, 58 10, 42 12 C 15 15, -25 25, -60 10 Z" fill="url(#emblemDarkFooter)" stroke="#00f0ff" stroke-width="1.5" stroke-linejoin="round" />
                            <!-- White Belly -->
                            <path d="M -40 12 C -20 18, 10 15, 30 10 C 35 9, 32 6, 25 7 C 5 10, -20 10, -40 12 Z" fill="#ffffff" opacity="0.9" filter="url(#glowEmblemFooter)" />
                            <!-- Tail -->
                            <path d="M -58 11 C -68 10, -78 2, -85 -5 C -80 -5, -76 -10, -82 -18 C -78 -10, -70 -2, -58 8 Z" fill="url(#emblemDarkFooter)" stroke="#00f0ff" stroke-width="1.5" stroke-linejoin="round" />
                            <!-- Accents -->
                            <path d="M -30 -4 C 0 -12, 20 -8, 32 -2" fill="none" stroke="url(#emblemLimeFooter)" stroke-width="3" stroke-linecap="round" filter="url(#glowEmblemFooter)" />
                            <path d="M -42 4 C -18 2, 5 -1, 18 -2" fill="none" stroke="url(#emblemCyanFooter)" stroke-width="2.5" stroke-linecap="round" />
                            <!-- Eye -->
                            <circle cx="28" cy="-5" r="3" fill="#ffffff" />
                            <circle cx="28" cy="-5" r="1.5" fill="#00f0ff" />
                            <!-- Flipper -->
                            <path d="M 0 10 C -5 25, -18 35, -22 35 C -20 28, -8 18, -4 10 Z" fill="url(#emblemDarkFooter)" stroke="#00f0ff" stroke-width="1.25" stroke-linejoin="round" />
                            <path d="M -3 11 C -6 20, -12 26, -14 26 C -13 22, -6 16, -4 11 Z" fill="url(#emblemCyanFooter)" opacity="0.8" />
                        </g>
                    </svg>
"@

# Normalize line endings before exact matching
$contentNorm = $content -replace "`r`n", "`n"
$preloaderHtmlNorm = $preloaderHtml -replace "`r`n", "`n"

# Replace <body> tag with Preloader (Clear previous preloader if it exists first)
# We can do this safely by first replacing any existing site-preloader with nothing or replacing body tag
if ($contentNorm -match "<!-- Site-Wide Cybernetic Preloader -->") {
    # If preloader is already there, strip it out so we can inject clean
    $contentNorm = [regex]::Replace($contentNorm, "(?s)<body>.*?<!-- Site-Wide Cybernetic Preloader -->.*?</div>\s*</div>", "<body>")
}

if ($contentNorm -match "<body>") {
    $contentNorm = $contentNorm.Replace("<body>", $preloaderHtmlNorm)
    Write-Host "Injected Site Preloader!"
}

# Regex replace header logo symbol inner SVG
$headerRegex = '(?s)(<div class="logo-symbol"\s+aria-label="OrcasAgent(?:&trade;|™)? Logo"\s*>)\s*<svg.*?</svg>\s*(</div>)'
if ($contentNorm -match $headerRegex) {
    $contentNorm = [regex]::Replace($contentNorm, $headerRegex, "`$1`r`n$headerLogoSvg`r`n`$2")
    Write-Host "Replaced Header Logo via Regex!"
} else {
    Write-Warning "Could not match header logo via Regex"
}

# Regex replace footer logo symbol inner SVG
$footerRegex = '(?s)(<div class="logo-symbol"\s+style="background-color:\s*var\(--color-white\);\s*color:\s*var\(--color-navy-900\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;"\s*>)\s*<svg.*?</svg>\s*(</div>)'
if ($contentNorm -match $footerRegex) {
    $contentNorm = [regex]::Replace($contentNorm, $footerRegex, "`$1`r`n$footerLogoSvg`r`n`$2")
    Write-Host "Replaced Footer Logo via Regex!"
} else {
    Write-Warning "Could not match footer logo via Regex"
}

# Convert back to Windows line endings
$contentFinal = $contentNorm -replace "`n", "`r`n"

# Save index.html
[System.IO.File]::WriteAllText($path, $contentFinal, [System.Text.Encoding]::UTF8)
Write-Host "Successfully modified index.html!"
