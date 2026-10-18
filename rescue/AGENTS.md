# Relic Rush

- Original static browser game. Keep all assets local and index.html directly playable.
- Pure rules in engine.js, UI/scenes in app.js. Keep Chinese and English messages aligned.
- Keep the rescue causal: matching next to rubble excavates it, opens cells, settles the scene rubble and advances the explorer along a non-flat terrain route. Hard rubble takes two hits.
- Never advance danger while paused, before Start, during resolution or in a hidden tab.
- Preserve the original six hazards plus the animated serpent in level 7, original explorer art and best-score storage.
- Test match generation, swap validity, powers, cascades, rubble conservation, two-hit rubble, loss and win after engine changes.
- Preserve the original generated character poses, gem atlas and temple assets. The runtime uses WebP assets; do not publish the large source PNG files.
- Browser-check a real win, pause/resume, restart, scene selection and mobile layout before publication.
- No third-party characters/assets, trackers, advertisements, accounts or payments without user request.
- Publish under rescue/ in dtao35477-ui/-; leave existing games intact.

- Keep material effects tied to the original tile value/color; use actual atlas fragments and matching secondary particles.
- Keep hero/snake frames, particles and danger frozen while paused. Respect reduced-motion preferences and bound particle count.
