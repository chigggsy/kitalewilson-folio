# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website for Kitale Wilson built with Vite, vanilla JavaScript, and Webflow integration. The site features custom page transitions and animations using GSAP with premium plugins (SplitText, GSDevTools).

## Development Commands

### Local Development
```sh
yarn dev
```
Starts Vite dev server on localhost with HMR enabled.

### Production Build
```sh
yarn build
```
Builds for production. Output goes to `/dist` as a UMD module with jQuery as external dependency. The build produces a single `main.js` file that can be hosted on a CDN (like Netlify) and referenced in Webflow.

### Linting
```sh
yarn lint:fix
```
Runs ESLint with Prettier auto-fix on all `.js` files in `/src`.

### Clean Build
```sh
yarn clean
```
Removes the `/dist` folder.

## Architecture

### Entry Point
- **src/main.js**: Main entry point that initializes page-specific functionality and global features
- Page routing is handled by Webflow's native navigation
- Each page has its own module in `src/pages/` that gets initialized based on the current page

### Page Module Pattern
Each page follows a consistent pattern:
- Export a default function that sets up page-specific functionality
- Use GSAP's `matchMedia()` to handle responsive behavior (desktop vs tablet breakpoints at 992px)
- Initialize animations using GSAP timelines
- Return cleanup functions to properly remove event listeners and revert GSAP effects

**Pages directory** (`src/pages/`):
- `pageGlobal.js`: Global features that run on all pages (navbar)
- `pageHome.js`: Preloader animation, bio reveal, project navigation setup
- `pageAbout.js`: About page animations with SplitText effects
- `pageStills.js`: Stills gallery page
- `pageContact.js`: Contact page
- `pageProjectTemplate.js`: Individual project pages

### Features Module Pattern
Reusable features live in `src/features/`:
- `navbar.js`: Navigation functionality
- `projectNav.js`: Project list hover effects and mouse-tracking preview
- `stillsHover.js`: Hover interactions for stills gallery
- `updateBristolDateTime.js`: Dynamic time display

Features are imported and called from page modules where needed. Global features are initialized from `pageGlobal.js`.

### Animation Patterns

**GSAP Timeline Structure**:
- Use `gsap.timeline()` with `onComplete` callbacks for cleanup
- Call `SplitText.revert()` after animations complete to restore original DOM
- Desktop-specific animations are conditionally added based on `isDesktop` flag
- Timelines use position parameters (e.g., `0`, `2.5`) for precise sequencing

**Cleanup Pattern**:
Page functions return cleanup functions that:
- Remove event listeners added via `context.add()`
- Call cleanup functions from features (e.g., `cleanupProjectNav()`)
- Properly clean up GSAP MatchMedia contexts

**GSAP Context Pattern**:
```js
const mm = gsap.matchMedia()
mm.add({ isDesktop: '(min-width: 992px)' }, (context) => {
  // Animation code
  return () => {
    // Cleanup code
  }
})
```

### Webflow Integration

The Vite build is configured to output UMD format compatible with Webflow:
- jQuery is marked as external (Webflow provides it)
- Single bundle output: `main.js`
- Host the built file on a CDN (Netlify) and reference in Webflow custom code

## Key Dependencies

- **gsap**: Animation library with premium plugins (SplitText, GSDevTools)
- **hls.js**: HLS video streaming support
- **jquery**: Available as external dependency from Webflow
- **vite**: Build tool and dev server

## Important Notes

- GSAP premium plugins (SplitText, GSDevTools) are used - ensure these are properly licensed
- The build creates a UMD module, not ES modules, for Webflow compatibility
- Page-specific cleanup functions handle removal of event listeners and GSAP effects to prevent memory leaks
