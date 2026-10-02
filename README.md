# Starpath · 星轨

**One path. Every star.** A calm, bilingual browser puzzle. Connect numbered stars in order, visit every square exactly once, and finish at the last star.

Original implementation and 120 generated, uniqueness-checked puzzles. Inspired by the daily path-puzzle genre popularized by [LinkedIn Zip](https://news.linkedin.com/2025/linkedin-announces-zip-); not affiliated with LinkedIn. No copied game code, branding, assets or published puzzles.

## Play locally

Open `index.html` directly in a modern browser. No installation, account or build step is needed. For a local web server, with Node.js installed:

```sh
node scripts/serve.cjs
```

Open http://127.0.0.1:4173. All assets are local; no font CDN, analytics or backend requests are made.

## Publish on GitHub Pages

The repository is ready for **branch-based publishing**:

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose **main** and **/ (root)**, then **Save**.
4. Wait for GitHub to finish deployment. The Pages settings page will show the live URL.

For the current repository, the expected URL after activation is `https://dtao35477-ui.github.io/-/`. This URL is not a claim that deployment has already been activated. If the repository is renamed, use the new URL shown by GitHub.

## Features

- Daily challenge: the same puzzle for all players on the same UTC date and difficulty. Rolls over at 00:00 UTC (08:00 Beijing).
- Explore mode: numbered, shareable practice puzzles.
- Calm 4×4, Focus 5×5 and Deep 6×6; 40 original layouts per difficulty.
- Eight rotations/reflections of each layout; 320 variants per difficulty. The sequence cycles after 320 days or practice editions. This is a curated bank, not unlimited fresh content.
- Pointer dragging, individual taps, arrow keys and Backspace/Z to undo.
- Walls, ordered checkpoints, early-finish protection, rewind, undo and a next-step hint.
- Hints rewind a divergent route to the correct prefix before revealing a step.
- Device-local progress, language, sound preferences and completion records.
- Restart keeps elapsed time and hints. Timer pauses when hidden or while a dialog is open.
- Optional synthesized sounds, no audio downloads.
- English / 简体中文, mobile layout and reduced-motion support.
- Shareable puzzle URLs and spoiler-free result text. Clipboard fallback included.

## 开始使用

双击 `index.html` 就能试玩，也可以按上面的步骤发布。右上角可切换中英文。

从数字 1 开始，上下左右画线；按顺序连接数字，走遍所有格子，最后停在最大的数字。浅色墙壁不能穿过。走错时点击已走过的格子回退，或使用“撤回”“给点提示”。

成绩只保存在当前浏览器，没有在线排行榜或账号同步。清除浏览器数据会清除本地记录。

## Development

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and dialogs |
| `style.css` | Colors, typography, desktop/mobile layout |
| `app.js` | Interaction, translation, saving, sharing and audio |
| `engine.js` | Pure rules, bounded solver and deterministic puzzle selection |
| `levels.js` | Generated original puzzle bank |
| `scripts/generate.cjs` | Reproducible offline generator |
| `tests/engine.test.cjs` | Core rules and complete bank validation |

```sh
node --test tests/engine.test.cjs
node scripts/generate.cjs
```

The test suite validates all 120 boards, proves uniqueness by exhaustive search, checks all 960 rotated/reflected solutions, and covers invalid movement, undo, hints, restoration and URL validation. Generation is deterministic.

To change the theme, edit the color variables at the top of `style.css`. Text lives in the two translation dictionaries in `app.js`. The game has no npm dependencies. Commit changes to `main` to update GitHub Pages once Pages is enabled.

## License

MIT. See [LICENSE](LICENSE).