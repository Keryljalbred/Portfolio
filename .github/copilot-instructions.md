# Copilot Instructions for Portfolio Project

## Architecture Overview

This is a **React 19 portfolio website** using Create React App, emphasizing smooth animations and interactive visual effects. Three key architectural patterns define the codebase:

1. **Provider-based Context Architecture**: `DarkModeProvider` (wraps App) and `SmoothScrollProvider` manage global state—theme persistence with localStorage and system preference detection, and Lenis-powered smooth scrolling
2. **Lazy-loaded Components**: Heavy components (`Projects`, `TechStackCarousel`, `Links`) use React.lazy to improve initial load performance
3. **Animation Stack**: Framer Motion (CSS/DOM), GSAP with ScrollTrigger (scroll-linked effects), and Lenis (scroll physics) are layered—use each for its specialty:
   - **Framer Motion**: Component-level entrance/exit animations, button interactions, conditional rendering transitions
   - **GSAP**: Complex scroll-triggered sequences (zoom, pin, stagger text) — see `Hero.jsx` for scroll-linked patterns
   - **Lenis**: Platform-wide smooth scroll inertia (auto-initialized in App.js via SmoothScrollProvider)

## Key Developer Workflows

### Development
```bash
npm start          # Runs on localhost:3000 with hot reload
npm run build      # Builds to /build for GitHub Pages deployment
npm test           # Jest runner (Create React App)
```

### Deployment
```bash
npm run predeploy  # Runs build automatically
npm run deploy     # Pushes /build to gh-pages branch via gh-pages package
# Deploys to https://axlankakar.github.io/portfolio (set in package.json `homepage`)
```

**Critical**: `npm run deploy` requires `/build` to exist. Always build before deploying.

## Project-Specific Conventions & Patterns

### Component Structure
- **`.jsx` extension** for all component files (in `/src/components/`)
- **Functional components with hooks** exclusively (no class components except ErrorBoundary)
- **Dark mode styling**: Use Tailwind's `dark:` prefix and `useDarkMode()` hook to access `{ isDark, toggleTheme }` state

### Tailwind Extensions
Custom values in [tailwind.config.js](tailwind.config.js):
- **Sizing**: `text-hero` (4.5rem), `text-display` (3.5rem), `text-title` (2.5rem)
- **Colors**: `primary` (purple) and `accent` (pink) with 50-900 scales
- **Spacing**: `w-88`, `h-128` (common in layout)
- **Animations**: `animate-gradient` (defined in keyframes)

### Custom Hooks Pattern
[useDarkMode.js](src/hooks/useDarkMode.js) demonstrates the pattern:
1. Create context + provider wrapper
2. Export context hook for components to consume
3. Handle localStorage persistence and system preference fallback

Wrap App with `<DarkModeProvider>` in [index.js](src/index.js).

### Scroll Animation Pattern (GSAP)
[Hero.jsx](src/components/Hero.jsx) shows the standard approach:
1. Register plugins: `gsap.registerPlugin(ScrollTrigger)`
2. Create `gsap.context()` in `useEffect` to scope animations to refs
3. Use `scrollTrigger` config for scroll-linking (start, end, scrub, pin)
4. Return cleanup context: `return () => ctx.revert()`
5. **Never** mix Lenis scroll with manual scroll listeners—Lenis handles all scroll physics

### Particles Integration
[App.js](src/App.js) and [Hero.jsx](src/components/Hero.jsx) use `@tsparticles/react`:
- Always call `loadFull(engine)` in `particlesInit` callback
- Configure via `options` prop (patterns, size, color, interaction rules)
- Error boundary catches load failures

### Dark Mode Theme Application
[DarkModeToggle.jsx](src/components/DarkModeToggle.jsx) demonstrates:
- Box shadows and gradients animate based on `isDark` state
- Conditional color classes: `from-yellow-400/30 dark:from-blue-400/30`
- `toggleTheme()` updates localStorage and `document.documentElement.classList`

## Integration Points & External Dependencies

| Package | Purpose | Key Pattern |
|---------|---------|------------|
| **@tsparticles/react** | Interactive particle backgrounds | Async `loadFull(engine)` in init callback |
| **framer-motion** | Component animations, transitions | `LazyMotion` + `domAnimation` for bundle optimization (see App.js) |
| **gsap** | Scroll-linked and timeline animations | Always use `gsap.context()` for safe ref cleanup |
| **lenis** | Smooth scroll physics (iOS-like inertia) | Initialized once in `SmoothScrollProvider` — no manual scroll listeners needed |
| **@emailjs/browser** | Contact form backend (if implemented) | Imported but usage not visible in main files |

### Cross-Component Communication
- **Top-level state**: `DarkModeProvider` (theme) and `SmoothScrollProvider` (scroll) via Context API
- **Ref passing**: Lenis ref passed through `LenisContext` to components that need scroll control
- **Lazy component boundary**: `Suspense` wraps lazy imports; `ErrorBoundary` catches render failures

## Critical Implementation Notes

1. **Always preserve Lenis**: Do not add window scroll listeners or `scroll` event handlers—Lenis hijacks scroll and provides RAF-based updates
2. **GSAP cleanup**: Every `gsap.context()` must return its cleanup function to prevent animation memory leaks on re-renders
3. **Dark mode class**: Tailwind looks for `dark` class on `<html>`—sync with `isDark` state in localStorage
4. **Build artifact path**: GitHub Pages deployment expects `/build` folder at repo root; `homepage` field in package.json routes to `/portfolio` subdirectory
5. **Responsive breakpoints**: Tailwind defaults (sm: 640px, md: 768px, lg: 1024px) — no custom breakpoints configured
