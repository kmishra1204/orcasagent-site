# Orcas Brand Asset Package & Logo Suite

Welcome to the official, trademark-ready brand asset repository for **Orcas (Enterprise Agentic Transformations)**. This directory contains high-fidelity, scalable vector graphic (SVG) assets meticulously reconstructed from official specifications.

These files are fully synchronized with the website's live design system, header, footer, cybernetic preloader, and canvas background swimming engines.

---

## 🎨 Brand Color Palette

| Color Role | Hex Code | RGB Value | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **Primary Blue/Cyan** | `#12b8d7` | `rgb(18, 184, 215)` | Main body color, core brand identity, primary interactive glows |
| **Underbelly Lime Green** | `#a2f51f` | `rgb(162, 245, 31)` | Stomach accent, stitched pattern underbelly, secondary brand highlights |
| **Accent Salmon/Pink** | `#ff7c80` | `rgb(255, 124, 128)` | Flipper highlights, tail fluke liners, cute blushing cheeks |
| **Contrasting Navy Outline** | `#081635` | `rgb(8, 22, 53)` | High-contrast structural boundaries, text lockup, telemetry elements |
| **Tongue Pink** | `#ff5d7d` | `rgb(255, 93, 125)` | Cute mouth interior smile highlight |
| **Telemetry Pink-Red** | `#e60067` | `rgb(230, 0, 103)` | Blinking grid indicators, diagnostic status markers |
| **Grid Pale-Green/Mint** | `#e8f8f0` | `rgb(232, 248, 240)` | High-end technical drafting background blocks |

---

## 📦 Asset Deliverables

### 1. 🐳 Primary Mascot (`orcas-cute.svg`)
*   **Path**: `C:\Users\rdpadmin\.gemini\antigravity\scratch\orcasagent-site\logo\orcas-cute.svg`
*   **Description**: The official, standalone brand symbol of the adorable smiling cartoon Orca. 
*   **Design Details**: Contains the cyan body, pink-lined flippers and fluke margins, dashed/stitched lime green stomach pattern, large high-contrast anime eyes with white dual reflections, blushing cheeks, and a smiling mouth.
*   **Scalability**: High-definition vector SVG, rendering perfectly from `16x16px` favicons up to massive billboard prints.

### 2. 📐 Complete Grid Lockup (`orcas-logo-full.svg`)
*   **Path**: `C:\Users\rdpadmin\.gemini\antigravity\scratch\orcasagent-site\logo\orcas-logo-full.svg`
*   **Description**: Replicates the signature landing page layout. Features the cute mascot centered on a light-mint technical grid background with blinking telemetry indicators, aligned brand typography, and subtitle lockups.
*   **Text lockup**:
    *   **Main**: `ORCAS` in premium high-tracking bold sans-serif (`'Outfit'`)
    *   **Sub**: `ENTERPRISE AGENTIC TRANSFORMATIONS` in wide technical mono-spaced sans-serif (`'Space Grotesk'`)

### 3. 🌀 Interactive Loader Spinner (`spinner.svg`)
*   **Path**: `C:\Users\rdpadmin\.gemini\antigravity\scratch\orcasagent-site\logo\spinner.svg`
*   **Description**: Fully animated, self-contained SVG spinner utilized in the website's preloader screen.
*   **Native CSS Animations**:
    *   `spin`: Spints the outer dual-stop gradient ring (`#12b8d7` to `#a2f51f`) smoothly at `1.8s` cycles.
    *   `swimBob`: Subjects the cute mascot inside the ring to a gentle bobbing/swimming cycle.
    *   `bubbleUp1` / `bubbleUp2`: Streams rising translucent bubble particles out of the blowhole.
*   **Performance**: Zero external dependencies; runs on hardware-accelerated GPU layers directly inside any browser.

---

## 🛠 Integration Guide

### HTML Image Embedding
```html
<!-- Embed Standalone Cute Orca -->
<img src="logo/orcas-cute.svg" width="120" height="100" alt="Orcas Mascot" />

<!-- Embed Animated Loader Spinner -->
<img src="logo/spinner.svg" width="200" height="200" alt="Loading..." />
```

### Inline SVG (Recommended for performance and styling control)
Inline integration allows you to dynamically manipulate gradients and strokes using CSS variables:
```html
<svg class="orcas-icon" viewBox="0 0 240 200">
  <!-- Copy paste path contents from logo/orcas-cute.svg -->
</svg>
```

### CSS Background Usage
```css
.brand-header-bg {
    background-image: url('logo/orcas-cute.svg');
    background-size: contain;
    background-repeat: no-repeat;
}
```

---

*Licensed and Trademark-Ready under Orcas Corporate Identity Guidelines. Built with luxury UX/UI standards.*
