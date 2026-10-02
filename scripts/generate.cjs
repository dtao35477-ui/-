const fs=require('node:fs');
const path=require('node:path');
const E=require('../engine.js');
const bank={};
for(const [difficulty,size] of [['calm',4],['focus',5],['deep',6]]) {
  bank[difficulty]=[];
  for(let level=0;level<40;level++) {
    const random=E.rng(E.hash(`starpath-v1-${difficulty}-${level}`));
    let route=[];
    for(let y=0;y<size;y++) for(let x=0;x<size;x++) route.push(y*size+(y%2?size-1-x:x));
    for(let mix=0;mix<size*size*60;mix++) {
      if(random()<.5) route.reverse();
      const options=route.map((c,i)=>i>1 && E.adjacent(c,route[0],size)?i:-1).filter(i=>i>1);
      if(options.length) { const k=options[Math.floor(random()*options.length)]; route=[...route.slice(0,k).reverse(),...route.slice(k)]; }
    }
    const cpCount=size+1;
    const checkpoints=Array.from({length:cpCount},(_,i)=>route[Math.round(i*(route.length-1)/(cpCount-1))]);
    const p={size,solution:route,checkpoints,walls:[]};
    const routeEdges=new Set(route.slice(1).map((c,i)=>E.edgeKey(c,route[i])));
    const candidates=[];
    for(let a=0;a<size*size;a++) for(const b of [a+1,a+size]) if(b<size*size && E.adjacent(a,b,size) && !routeEdges.has(E.edgeKey(a,b))) candidates.push([a,b]);
    // Remove ambiguous routes with a wall, without touching the intended solution.
    for(let tries=0;tries<100;tries++) {
      const result=E.solve(p,2,100000);
      if(!result.exhausted && result.solutions.length===1) break;
      const alternate=result.solutions.find(s=>s.some((c,i)=>c!==route[i]));
      let choices=candidates.filter(([a,b])=>!p.walls.some(e=>E.edgeKey(...e)===E.edgeKey(a,b)));
      if(alternate) {
        const alternateEdges=new Set(alternate.slice(1).map((c,i)=>E.edgeKey(c,alternate[i])));
        choices=choices.filter(e=>alternateEdges.has(E.edgeKey(...e)));
      }
      if(!choices.length) throw new Error('No wall available');
      p.walls.push(choices[Math.floor(random()*choices.length)]);
    }
    const check=E.solve(p,2,500000);
    if(!E.validate(p) || check.exhausted || check.solutions.length!==1) throw new Error('Invalid level');
    bank[difficulty].push(p);
  }
  console.log(`${difficulty}: ${bank[difficulty].length} unique-solution puzzles`);
}
fs.writeFileSync(path.join(__dirname,'../levels.js'),'// 120 original puzzles. Generated and uniqueness-checked by scripts/generate.cjs.\n(function(root){const levels='+JSON.stringify(bank)+';if(typeof module==="object"&&module.exports)module.exports=levels;else root.STARPATH_LEVELS=levels;})(typeof globalThis!=="undefined"?globalThis:this);\n');
