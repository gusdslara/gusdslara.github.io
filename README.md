
### Ultra-Fast, SEO and GEO optimized, Premium Portfolio Landing Page built with SvelteKit, SvelteMotion, GSAP & Three.js

[![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.dot-js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)


---

- **Core**: [SvelteKit](https://kit.svelte.dev/) for server-side rendering and lightning-fast client-side navigation.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust, type-safe development.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first responsive design, complemented by **SCSS** for complex custom animations and styles.
- **Animations**: 
    - **[GSAP](https://greensock.com/gsap/)**: Powering complex scroll-triggered animations and high-performance sequencing.
    - **[SvelteMotion](https://github.com/immannino/svelte-motion)**: Orchestrating seamless component-level transitions and interactive UI feedback (Framer Motion equivalent for Svelte).
- **3D Graphics**: [Three.js](https://threejs.org/) for integrating interactive 3D models.
- **Build System**: [Vite](https://vitejs.dev/) for a near-instant development experience and optimized production bundles.

---

## ✨ Key Features

- 📱 **Fully Responsive**: Optimized for every screen size, from mobile devices to ultra-wide monitors.
- 🎨 **Premium UI/UX**: Minimalist and rounded components with smooth animations.
- 🚀 **Performance Optimized**: Lazy-loaded components, optimized asset delivery, and minimal bundle size.
- 📦 **Modular Architecture**: Highly organized component structure for scalability and maintainability.
- 🌍 **Internationalization (i18n)**: Ready for multi-language support (PT-BR / EN / ES).
- 🏗️ **SSG (Static Site Generation)**: Pre-rendered pages for maximum speed and SEO.
- 🏗️ **CI/CD Ready**: Configured for seamless deployment via GitHub Pages using GitHub Actions.
- 🤖 **AI & SEO Optimized**: Advanced Open Graph, Twitter Cards, GEO tags for regional targeting (Brazil), and rich JSON-LD schema for accurate indexing by Google's AI Overviews and ChatGPT Web Search.

---

## 📂 Project Structure

```bash
/src
├── lib
│   ├── components   # Atomic and complex UI components
│   │   ├── common   # Reusable elements (buttons, modals, etc.)
│   │   ├── home     # Section-specific components for the landing page
│   │   └── layout   # Core layout parts like Navbar and Footer
│   ├── config       # Global settings and constants
│   ├── data         # Static content (projects, experience, education)
│   ├── services     # External API integrations or complex logic
│   └── utils        # Helper functions and shared utilities
├── routes           # SvelteKit page routes
├── styles           # Global SCSS and Tailwind directives
└── app.html         # Main HTML entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gusdslara/gustavodslara.github.io.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server with HMR:
```bash
npm run dev
```

### Build

Compile the project for production:
```bash
npm run build
```
The static assets will be generated in the `/docs` directory, ready for deployment.

---

## 🛠️ GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages via **GitHub Actions**.

### Deployment Workflow:
1. **Trigger**: Push to the `main` branch.
2. **Build**: Runs `npm run build` using SvelteKit's `@sveltejs/adapter-static`.
3. **Output**: Generates static files into the `/docs` folder.
4. **Deploy**: GitHub Pages is configured to serve content from the `/docs` folder.

You can monitor the deployment status in the **Actions** tab of this repository.

---

## 🤖 SEO & AI Indexation Optimization

This portfolio is heavily optimized for modern search engines and AI parsers. The following optimizations have been deployed:

- **Advanced Metadata**: Includes comprehensive **Open Graph (OG)** and **Twitter Card** tags ensuring rich, visual previews when shared on social media and communication platforms.
- **GEO Targeted Tags**: Configured with `geo.region`, `geo.placename`, `geo.position`, and `ICBM` metatags focused on Brazil, explicitly boosting local/regional search ranking.
- **Rich JSON-LD Schema (AI Indexation)**: Injects an `application/ld+json` schema defining a `Person` and a `WebSite` within the `<svelte:head>`. This semantic structure explicitly provides context to AI crawlers (e.g., Google's AI Overview, ChatGPT Search) regarding the author, expertise (Software Architecture, Microservices, SvelteKit, etc.), external profiles (GitHub/LinkedIn), and general portfolio details.

---
