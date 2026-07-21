# Ecosia Search Bot

A **userscript** (Tampermonkey / Violentmonkey / Greasemonkey) that runs **randomized Ecosia searches** on demand. Ecosia plants trees from search ad revenue — this script automates casual search volume when you explicitly start it.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install

1. Install a userscript manager (e.g. [Violentmonkey](https://violentmonkey.github.io/)).
2. Create a new script and paste `index.js`, **or** open the raw file and install if hosted as a userscript.
3. Visit [https://www.ecosia.org](https://www.ecosia.org).
4. Use the userscript menu:
   - **Start Searching (Randomized)**
   - **Clear Search History**
   - **Display Search Words**

## How it works

1. Fetches random words from a public word API.
2. Schedules 10–30 searches with 7–20s delays.
3. Navigates to Ecosia search URLs for each word.
4. Uses a process id (`GM_getValue` / `GM_setValue`) to avoid overlapping runs.

## Responsible use

- **Manual start only** — the script does not run until you choose the menu command.
- Respect Ecosia’s [terms of service](https://www.ecosia.org/terms) and fair-use expectations.
- Do not run aggressive loops, proxies for abuse, or automated farming at scale.
- Prefer genuine searches when possible; this is a convenience tool for light personal use.

## Files

| File | Role |
|------|------|
| `index.js` | Userscript source |
| `LICENSE` | MIT |

## License

MIT © 2026 Stijnman
