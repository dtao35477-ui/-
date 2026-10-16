(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CatEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const DIRS = { E: [1, 0], S: [0, 1], W: [-1, 0], N: [0, -1] };
  function rng(seed) { let a = seed >>> 0; return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hash(s) { let h = 2166136261; for (const c of String(s)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }
  function cells(cat) { const [dx, dy] = DIRS[cat.dir]; return Array.from({ length: cat.len }, (_, i) => [cat.x - dx * i, cat.y - dy * i]); }
  function inside(level, x, y) { return x >= 0 && y >= 0 && x < level.size && y < level.size; }
  function occupancy(level, removed = []) {
    const gone = new Set(removed), map = new Map();
    for (const c of level.cats) if (!gone.has(c.id)) for (const [x, y] of cells(c)) map.set(x + ',' + y, c.id);
    return map;
  }
  function exitCheck(level, id, removed = []) {
    const cat = level.cats.find(c => c.id === id);
    if (!cat || removed.includes(id)) return { ok: false, reason: 'missing', path: [] };
    const occupied = occupancy(level, removed), [dx, dy] = DIRS[cat.dir], path = [];
    for (let x = cat.x + dx, y = cat.y + dy; inside(level, x, y); x += dx, y += dy) {
      path.push([x, y]);
      if (occupied.has(x + ',' + y)) return { ok: false, reason: 'blocked', blocker: occupied.get(x + ',' + y), path };
    }
    return { ok: true, path };
  }
  function available(level, removed = []) { return level.cats.filter(c => !removed.includes(c.id) && exitCheck(level, c.id, removed).ok).map(c => c.id); }
  function solve(level) { const order = []; while (order.length < level.cats.length) { const next = available(level, order)[0]; if (next === undefined) return null; order.push(next); } return order; }
  function generate(seed, size, count) {
    let best = null, bestScore = -Infinity;
    for (let attempt = 0; attempt < 24; attempt++) {
      const random = rng(hash(seed + ':' + attempt)), level = { size, cats: [] };
      for (let tries = 0; tries < 1800 && level.cats.length < count; tries++) {
        const dir = ['E', 'S', 'W', 'N'][Math.floor(random() * 4)];
        const cat = { id: level.cats.length, x: Math.floor(random() * size), y: Math.floor(random() * size), len: random() < .17 && size > 5 ? 3 : 2, dir, color: Math.floor(random() * 6) };
        const occupied = occupancy(level);
        if (cells(cat).some(([x,y]) => !inside(level,x,y) || occupied.has(x + ',' + y))) continue;
        level.cats.push(cat);
        if (!exitCheck(level, cat.id).ok) level.cats.pop();
      }
      // Insertion checks ensure the reverse insertion order is always a solution.
      const score = level.cats.length * 100 - available(level).length * 3;
      if (score > bestScore) { best = level; bestScore = score; }
    }
    return best;
  }
  const tutorial = { size: 5, cats: [
    { id: 0, x: 4, y: 1, len: 2, dir: 'E', color: 0 },
    { id: 1, x: 3, y: 2, len: 2, dir: 'N', color: 1 },
    { id: 2, x: 1, y: 3, len: 2, dir: 'E', color: 2 },
    { id: 3, x: 1, y: 0, len: 2, dir: 'W', color: 3 },
    { id: 4, x: 4, y: 4, len: 2, dir: 'S', color: 4 }
  ] };
  const cache = new Map();
  function getLevel(number) {
    const n = Math.max(1, Math.min(30, Math.floor(Number(number)) || 1));
    if (!cache.has(n)) {
      const size = n <= 3 ? 5 : n <= 10 ? 6 : n <= 20 ? 7 : 8;
      const count = n <= 3 ? 5 + n : n <= 10 ? 8 + Math.floor((n-4)/2) : n <= 20 ? 13 + Math.floor((n-11)/3) : 18 + Math.floor((n-21)/3);
      cache.set(n, n === 1 ? tutorial : generate('catnap-level-v1-' + n, size, count));
    }
    return cache.get(n);
  }
  function validDate(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0,10) === s; }
  function daily(date) { const d = validDate(date) ? date : new Date().toISOString().slice(0,10); if (!cache.has(d)) cache.set(d, generate('catnap-daily-v1-' + d, 7, 15)); return cache.get(d); }
  function validateRun(level, input) {
    if (!input || !Array.isArray(input.removed)) return { removed: [], mistakes: 0, hints: 0 };
    const removed = [];
    for (const id of input.removed) { if (!exitCheck(level, id, removed).ok) break; removed.push(id); }
    const safe = n => Number.isSafeInteger(n) && n >= 0 ? Math.min(n, 9999) : 0;
    return { removed, mistakes: safe(input.mistakes), hints: safe(input.hints) };
  }
  function stars(run) { return run.hints > 0 || run.mistakes > 2 ? 1 : run.mistakes > 0 ? 2 : 3; }
  return { DIRS, cells, occupancy, exitCheck, available, solve, generate, getLevel, daily, validDate, validateRun, stars, hash };
});
