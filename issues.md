# Issues

[x] Fix `npm run dev` errors  
**Solution:** Resolved Tailwind CSS v4 compatibility issue by removing the `@astrojs/tailwind` integration (designed for v3) from astro.config.mjs and uninstalling the package. With Tailwind v4, PostCSS configuration with `@tailwindcss/postcss` is used directly instead of the Astro integration. Updated tests to reflect the new architecture where `@astrojs/tailwind` should not be present.

[x] Upgrade to Astro 5.11. Research documentation of Astro and dependencies to ensure everything works well together. 
**Solution:** Used official upgrade tools (`npx @astrojs/upgrade` and `npx @tailwindcss/upgrade`) to migrate from Astro 4.15.0→5.11.0 and Tailwind CSS 3.4.0→4.1.11. Updated configurations for v4 compatibility, resolved dependency conflicts, and implemented comprehensive test coverage to verify upgrades work correctly.

[x] Scaffold the treddit.com project based on CLAUDE.md. Setup development, build, test, run environment, project structure, dependencies, minimal files to run the scaffold and evaluate using a local server
