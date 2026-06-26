# SynapseFlow AI - Advanced Real-Time Data Automation Platform

SynapseFlow AI is a premium, developer-first SaaS landing page demonstrating a real-time data automation platform. Built with a high-fidelity obsidian dark theme, custom glowing gradients, and smooth native micro-animations.

## 🚀 Live Demo
Live Deployment: [SynapseFlow AI Live on Vercel](YOUR_LIVE_VERCEL_LINK_HERE)

---

## 🛠️ Tech Stack & Architecture
* **Framework**: React 19 + Vite + TypeScript
* **Styling**: Tailwind CSS (Strictly utility-only classes)
* **Custom Properties**: Custom brand tokens (Obsidian backgrounds, Violet primary, Cyan secondary, Cyber-Pink accents) configured via CSS variables inside `src/index.css` and mapped inside `tailwind.config.js`.

---

## ✨ Premium Features
1. **Isolated DOM Pricing Updates**:
   * Multi-dimensional pricing config with rates, currency multipliers (USD / INR / EUR), and billing cycle multipliers (Monthly vs. Annual 20% off).
   * Completely bypasses the React state cycle on pricing switcher clicks. Direct DOM manipulation using React refs updates the specific text nodes directly, guaranteeing zero React component re-renders or layout reflows on pricing adjustments.
2. **Bento-to-Accordion with Context Transfer**:
   * Uses a native `ResizeObserver` to detect when viewport width crosses the `768px` mobile breakpoint.
   * Desktop layout renders a 3-column asymmetric CSS bento grid of interactive graphics.
   * Mobile layout switches to a touch-friendly accordion.
   * Features seamless **context transfer**: The active index carries over between bento hover state and accordion expanded panels when resizing the screen.
3. **Semantic HTML & High-Ranking SEO**:
   * Fully structured using descriptive semantic tags (`header`, `nav`, `main`, `section`, `article`, `footer`).
   * Meta properties, canonical URL, and Open Graph tags configured in `index.html`.
4. **Smooth Native Transitions**:
   * 150ms–200ms ease-out transitions for interactive controls, buttons, and switches.
   * 300ms–400ms ease-in-out height transitions for accordion panel folding.
   * CSS-only animations (drifting glow points, stream paths) to maintain sub-500ms time-to-interactive.

---

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Installation
1. Clone the repository and navigate to the directory:
   ```bash
   cd synapseflow-ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
