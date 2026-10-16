# Catnap Escape · 猫咪解堵

A cozy, original browser puzzle. Tap a cat to send it forward. Clear its path, then clear the room.

**Play:** https://dtao35477-ui.github.io/-/catnap/

## 玩法

猫咪只能沿鼻子和箭头的朝向走。它前方直到棋盘边缘没有其他猫咪时，点击即可送它离开。把所有猫咪送回家即可过关。

- 30 个原创关卡，三个章节，5×5 到 8×8 棋盘。
- 确定性每日挑战，以 UTC 日期为准，可分享指定日期的题目。
- 手机、鼠标和键盘操作；Tab 选择猫咪，Enter / Space 移动。
- 撤回、重来、提示、星级、浏览器本地存档、中英文、可选合成音效。
- 无倒计时、无广告、无账号，不收集玩家数据。
- 3 星：没有碰撞且不用提示。2 星：不用提示且碰撞不超过 2 次。其他通关为 1 星。
- 撤回和未完成时重来会保留本次碰撞／提示次数；通关后重来开始新一轮评分。保留历史最好成绩。
- 全部关卡都可自由选择。存档仅属于当前浏览器；换设备不会同步。

## Run locally

Open `index.html` directly, or use Node.js:

```sh
node scripts/serve.cjs
```

Then visit http://127.0.0.1:4174/ . No package installation or build step is needed.

## Checks

```sh
node --test tests/engine.test.cjs
node --check app.js
```

The suite verifies all 30 rooms, 120 consecutive daily seeds, no overlapping/off-board cats, solvability under different legal move orders, blockers, save validation, date validation and scoring.

Levels use reverse construction: every newly inserted cat can leave before later cats are inserted. Reversing insertion order therefore provides a solution. Any legal removal can only clear more space, so it cannot make a solvable board unsolvable.

## Publish

GitHub Pages: upload this directory as `catnap/` within the existing `dtao35477-ui/-` repository. Main/root is already the publishing source. Keep relative asset paths.

For itch.io: upload a ZIP with `index.html`, `style.css`, `app.js`, `engine.js`, `favicon.svg` and `LICENSE` at the archive root. Choose an HTML/browser game, enable the uploaded file for browser play and mobile support. Test in the platform preview before publication.

## License and assets

MIT. All game code, SVG cat artwork, interface artwork, procedural levels and synthesized sound effects were made for this project. No third-party game source, art, fonts or sound files are bundled. The game uses the general directional escape puzzle mechanic and has its own name and visual identity.
