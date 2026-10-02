(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Starpath = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const edgeKey = (a, b) => a < b ? `${a}-${b}` : `${b}-${a}`;
  const adjacent = (a, b, n) => Math.abs(a % n - b % n) + Math.abs(Math.floor(a / n) - Math.floor(b / n)) === 1;
  function rng(seed) {
    let x = seed >>> 0;
    return () => { x += 0x6D2B79F5; let t = x; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function hash(text) { let h = 2166136261; for (const c of String(text)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }
  function transformCell(c, n, symmetry) {
    let x = c % n, y = Math.floor(c / n);
    if (symmetry >= 4) x = n - 1 - x;
    for (let i = 0; i < symmetry % 4; i++) [x, y] = [n - 1 - y, x];
    return y * n + x;
  }
  function transform(p, symmetry) {
    const cell = c => transformCell(c, p.size, symmetry);
    return { size: p.size, checkpoints: p.checkpoints.map(cell), solution: p.solution.map(cell), walls: p.walls.map(([a,b]) => [cell(a),cell(b)]) };
  }
  function isDate(s) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s || '')) return false;
    const d = new Date(s + 'T00:00:00Z');
    return Number.isFinite(+d) && d.toISOString().slice(0,10) === s;
  }
  const today = () => new Date().toISOString().slice(0,10);
  function parseOptions(search) {
    const q = new URLSearchParams(search);
    const mode = q.get('mode') === 'practice' ? 'practice' : 'daily';
    const difficulty = ['calm','focus','deep'].includes(q.get('difficulty')) ? q.get('difficulty') : 'focus';
    const date = isDate(q.get('date')) ? q.get('date') : today();
    const num = Number(q.get('p'));
    const practice = Number.isSafeInteger(num) && num >= 1 && num <= 1000000 ? num : 1;
    return { mode, difficulty, date, practice };
  }
  function puzzleFor(bank, options) {
    const levels = bank[options.difficulty];
    const sequence = options.mode === 'daily' ? Math.floor(Date.parse(options.date+'T00:00:00Z')/86400000) : options.practice-1;
    const variants = levels.length*8;
    const index = ((sequence*73+hash(options.difficulty))%variants+variants)%variants;
    return transform(levels[index % levels.length], Math.floor(index / levels.length));
  }
  const gameKey = o => `${o.mode}:${o.difficulty}:${o.mode === 'daily' ? o.date : o.practice}`;
  function validate(p) {
    const n = p.size, count = n*n;
    if (!Number.isInteger(n) || n < 2 || n > 9) return false;
    if (p.solution.length !== count || new Set(p.solution).size !== count || p.solution.some(c => !Number.isInteger(c) || c < 0 || c >= count)) return false;
    if (p.checkpoints.length < 2 || new Set(p.checkpoints).size !== p.checkpoints.length || p.checkpoints[0] !== p.solution[0] || p.checkpoints.at(-1) !== p.solution.at(-1)) return false;
    const walls = new Set(p.walls.map(([a,b]) => edgeKey(a,b)));
    if (p.walls.some(([a,b]) => !adjacent(a,b,n) || a < 0 || b < 0 || a >= count || b >= count)) return false;
    if (p.solution.some((c,i) => i && (!adjacent(c,p.solution[i-1],n) || walls.has(edgeKey(c,p.solution[i-1]))))) return false;
    return p.checkpoints.every((c,i) => !i || p.solution.indexOf(c) > p.solution.indexOf(p.checkpoints[i-1]));
  }
  class Game {
    constructor(puzzle) {
      this.puzzle = puzzle;
      this.wallSet = new Set(puzzle.walls.map(([a,b])=>edgeKey(a,b)));
      this.path = [puzzle.checkpoints[0]];
      this.history = [];
    }
    get nextCheckpoint() { return this.path.filter(c=>this.puzzle.checkpoints.includes(c)).length; }
    get won() { return this.path.length === this.puzzle.size ** 2 && this.path.at(-1) === this.puzzle.checkpoints.at(-1) && this.nextCheckpoint === this.puzzle.checkpoints.length; }
    move(cell) {
      if (this.won) return { ok:false, reason:'complete' };
      if (!Number.isInteger(cell) || cell < 0 || cell >= this.puzzle.size**2) return {ok:false,reason:'outside'};
      const last = this.path.at(-1);
      if (last === cell) return {ok:false,reason:'same'};
      const old = this.path.indexOf(cell);
      if (old >= 0) {
        this.history.push([...this.path]);
        this.path = this.path.slice(0,old+1);
        return {ok:true,backtrack:true};
      }
      if (!adjacent(last,cell,this.puzzle.size)) return {ok:false,reason:'adjacent'};
      if (this.wallSet.has(edgeKey(last,cell))) return {ok:false,reason:'wall'};
      const cp = this.puzzle.checkpoints.indexOf(cell);
      if (cp >= 0 && cp !== this.nextCheckpoint) return {ok:false,reason:'order'};
      if (cell === this.puzzle.checkpoints.at(-1) && this.path.length !== this.puzzle.size**2-1) return {ok:false,reason:'early'};
      this.history.push([...this.path]);
      this.path.push(cell);
      return {ok:true,won:this.won};
    }
    undo() { if (!this.history.length) return false; this.path = this.history.pop(); return true; }
    restart() { this.path = [this.puzzle.checkpoints[0]]; this.history = []; }
    hint() {
      if (this.won) return { changed:false, reset:false };
      let prefix = 0;
      while (prefix < this.path.length && this.path[prefix] === this.puzzle.solution[prefix]) prefix++;
      const reset = prefix < this.path.length;
      this.history.push([...this.path]);
      this.path = this.puzzle.solution.slice(0,Math.min(this.puzzle.solution.length,prefix+1));
      return {changed:true,reset};
    }
    restore(path) {
      if (!Array.isArray(path) || path[0] !== this.puzzle.checkpoints[0] || new Set(path).size !== path.length || path.length > this.puzzle.size**2) return false;
      const candidate = new Game(this.puzzle);
      for (const cell of path.slice(1)) if (!candidate.move(cell).ok) return false;
      this.path = candidate.path; this.history = candidate.history; return true;
    }
  }
  // Exhaustive, bounded uniqueness check used only by the offline level generator and tests.
  function solve(p, limit=2, nodeLimit=250000) {
    const n=p.size, total=n*n, wallSet=new Set(p.walls.map(e=>edgeKey(...e)));
    const links = Array.from({length:total},(_,a)=>[a-n,a+1,a+n,a-1].filter(b=>b>=0 && b<total && adjacent(a,b,n) && !wallSet.has(edgeKey(a,b))));
    const cps=new Map(p.checkpoints.map((c,i)=>[c,i]));
    const visited=new Uint8Array(total), path=[p.checkpoints[0]], solutions=[];
    visited[path[0]]=1;
    let nodes=0, exhausted=false;
    function dfs(a,next) {
      if (++nodes > nodeLimit) { exhausted=true; return; }
      if (path.length===total) { if(a===p.checkpoints.at(-1) && next===p.checkpoints.length) solutions.push([...path]); return; }
      // The unvisited cells must remain connected, and none may be isolated.
      if (path.length < total-1) {
        const unseen=[]; for(let c=0;c<total;c++) if(!visited[c]) unseen.push(c);
        for(const c of unseen) if(!links[c].some(b=>!visited[b])) return;
        const reached=new Set([unseen[0]]), queue=[unseen[0]];
        for(let i=0;i<queue.length;i++) for(const b of links[queue[i]]) if(!visited[b] && !reached.has(b)) {reached.add(b);queue.push(b);}
        if(reached.size!==unseen.length) return;
      }
      for(const b of links[a]) {
        if(visited[b]) continue;
        const cp=cps.get(b);
        if(cp!==undefined && cp!==next) continue;
        if(b===p.checkpoints.at(-1) && path.length!==total-1) continue;
        visited[b]=1; path.push(b); dfs(b,cp===undefined?next:next+1); path.pop();visited[b]=0;
        if(solutions.length>=limit || exhausted) return;
      }
    }
    dfs(path[0],1);
    return {solutions,nodes,exhausted};
  }
  return {Game,edgeKey,adjacent,rng,hash,transform,validate,solve,parseOptions,puzzleFor,gameKey,today};
});
