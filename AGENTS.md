# Starpath maintenance

- This is a static, dependency-free game. Preserve direct `index.html` support.
- Do not copy proprietary puzzles, branding or assets. Keep new content original.
- Change both `en` and `zh` translation dictionaries for user-facing text.
- Keep game rules in `engine.js`; the browser shell is `app.js`.
- When rules, level selection or saved-state handling change, run `node --test tests/engine.test.cjs` and test the affected browser flows.
- Level regeneration must prove a unique solution for every board. Keep generation deterministic.
- Test keyboard input and narrow layouts when changing board interaction or layout.
- No analytics, tracking, advertising, accounts, paid services or online leaderboard without an explicit user request.
- GitHub Pages publishes from `main` at repository root. Use relative asset URLs.
