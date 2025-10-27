# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website for Kitale Wilson built with Vite, vanilla JavaScript, and Webflow integration. The site features custom page transitions using Barba.js and animations using GSAP with premium plugins (SplitText, GSDevTools).

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

### Entry Point and Routing
- **src/main.js**: Main entry point that initializes the Barba.js handler
- **src/features/barbaHandler.js**: Configures Barba.js with view-based routing using namespaces
- Routes are matched by Barba namespace attributes in Webflow HTML (`data-barba-namespace`)
- Views/Routes: `home`, `about`, `stills`, `contact`, `project` (project template)
- Each view calls its corresponding page function in the `beforeEnter()` hook

### Page Module Pattern
Each page follows a consistent pattern:
- Export a default function that sets up page-specific functionality
- Use GSAP's `matchMedia()` to handle responsive behavior (desktop vs tablet breakpoints at 992px)
- Initialize animations using GSAP timelines
- Return cleanup functions to properly remove event listeners and revert GSAP effects

**Pages directory** (`src/pages/`):
- `pageHome.js`: Preloader animation, bio reveal, project navigation setup
- `pageAbout.js`: About page animations with SplitText effects
- `pageStills.js`: Stills gallery page
- `pageContact.js`: Contact page
- `pageProjectTemplate.js`: Individual project pages

### Features Module Pattern
Reusable features live in `src/features/`:
- `barbaHandler.js`: Barba.js initialization with view-based routing (transitions currently disabled)
- `projectNav.js`: Project list hover effects and mouse-tracking preview
- `stillsHover.js`: Hover interactions for stills gallery
- `updateBristolDateTime.js`: Dynamic time display

Features are imported and called from page modules where needed. The `barbaHandler` is called once from `main.js`.

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

- **@barba/core**: Page transitions
- **gsap**: Animation library with premium plugins (SplitText, GSDevTools)
- **jquery**: Available as external dependency from Webflow
- **vite**: Build tool and dev server

## Important Notes

- GSAP premium plugins (SplitText, GSDevTools) are used - ensure these are properly licensed
- The build creates a UMD module, not ES modules, for Webflow compatibility
- All page modules must handle their own cleanup to prevent memory leaks
- Barba.js handles routing and view initialization via `barbaHandler.js`
- Webflow HTML must include `data-barba="wrapper"` and `data-barba="container"` attributes, plus `data-barba-namespace` on the container to match view names in `barbaHandler.js`
