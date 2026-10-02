const test=require('node:test');
const assert=require('node:assert/strict');
const E=require('../engine.js');
const bank=require('../levels.js');
test('all 120 original puzzles have one solution, for all 8 visual orientations',()=>{
  let count=0;
  for(const list of Object.values(bank))for(const p of list){
    assert.ok(E.validate(p));const result=E.solve(p,2,500000);assert.equal(result.exhausted,false);assert.equal(result.solutions.length,1);
    for(let orientation=0;orientation<8;orientation++){
      const rotated=E.transform(p,orientation);assert.ok(E.validate(rotated));
      const game=new E.Game(rotated);for(const c of rotated.solution.slice(1))assert.equal(game.move(c).ok,true);assert.equal(game.won,true);
    }count++;
  }assert.equal(count,120);
});
const sample={size:3,checkpoints:[0,4,8],solution:[0,1,2,5,4,3,6,7,8],walls:[[1,4]]};
test('invalid movement: bounds, adjacency, walls and checkpoint order',()=>{
  const game=new E.Game(sample);assert.equal(game.move(-1).reason,'outside');assert.equal(game.move(4).reason,'adjacent');
  game.move(1);assert.equal(game.move(4).reason,'wall');game.move(2);game.move(5);assert.equal(game.move(8).reason,'order');assert.deepEqual(game.path,[0,1,2,5]);
});
test('final checkpoint is unavailable until all cells have been visited',()=>{
  const p={size:3,checkpoints:[0,8],solution:sample.solution,walls:[]},game=new E.Game(p);
  [1,2,5].forEach(c=>game.move(c));assert.equal(game.move(8).reason,'early');assert.equal(game.won,false);
});
test('backtracking, undo, hint correction, restart and legal restore',()=>{
  const game=new E.Game(sample);game.move(3);game.move(6);
  assert.deepEqual(game.hint(),{changed:true,reset:true});assert.deepEqual(game.path,[0,1]);assert.equal(game.undo(),true);assert.deepEqual(game.path,[0,3,6]);
  assert.equal(game.move(0).backtrack,true);assert.deepEqual(game.path,[0]);game.undo();assert.deepEqual(game.path,[0,3,6]);
  assert.equal(game.restore([0,4,8]),false);assert.deepEqual(game.path,[0,3,6]);assert.equal(game.restore([0,1,2]),true);
  game.restart();assert.deepEqual(game.path,[0]);assert.equal(game.undo(),false);
});
test('winning, reloading a finished board, and hints cannot mutate a solved path',()=>{
  const game=new E.Game(sample);for(let i=0;i<8;i++)game.hint();assert.ok(game.won);assert.equal(game.hint().changed,false);
  const restored=new E.Game(sample);assert.ok(restored.restore(game.path));assert.ok(restored.won);assert.equal(restored.move(0).reason,'complete');
  assert.equal(restored.restore([0,1,0]),false);
});
test('malformed URL parameters fall back safely; valid leap days work',()=>{
  const bad=E.parseOptions('?mode=oops&difficulty=evil&date=2026-02-31&p=-1');assert.equal(bad.mode,'daily');assert.equal(bad.difficulty,'focus');assert.equal(bad.date,E.today());assert.equal(bad.practice,1);
  assert.equal(E.parseOptions('?date=2028-02-29').date,'2028-02-29');assert.equal(E.parseOptions('?mode=practice&p=12').practice,12);
});
test('daily puzzles are deterministic; consecutive practice variants do not repeat',()=>{
  const o={mode:'daily',date:'2026-10-02',difficulty:'focus',practice:1};assert.deepEqual(E.puzzleFor(bank,o),E.puzzleFor(bank,{...o,practice:100}));
  const seen=new Set();for(let p=1;p<=320;p++){const puzzle=E.puzzleFor(bank,{...o,mode:'practice',practice:p});assert.ok(E.validate(puzzle));seen.add(JSON.stringify(puzzle));}assert.equal(seen.size,320);
});
