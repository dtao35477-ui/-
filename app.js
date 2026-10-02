(() => {
  'use strict';
  const E=window.Starpath, $=id=>document.getElementById(id), NS='http://www.w3.org/2000/svg';
  const translations={
    en:{dailyRitual:'YOUR DAILY MOMENT OF CLARITY',how:'How to play',eyebrow:'A SMALL DAILY DISCOVERY',headline:'One path.<br>Every <em>star.</em>',intro:'Connect the numbers. Fill every square. Find a little clarity along the way.',solved:'puzzles solved',best:'best · this level',local:'Your progress stays on this device.',daily:'Daily',practice:'Explore',calm:'Calm',focus:'Focus',deep:'Deep',undo:'Undo',reset:'Restart',hint:'A little hint',nextPuzzle:'Next expedition',footer:'NO RUSH. JUST YOU AND THE STARS.',share:'Share this puzzle',welcome:'A LITTLE GUIDANCE',howTitle:'Find your path.',rule1:'Start at 1. Drag or tap neighboring squares to draw a path.',rule2:'Visit every number in order, and fill every square exactly once.',rule3:'Finish at the last number. Pale walls cannot be crossed.',rule4:'Tap an earlier square to rewind. On a keyboard, use arrow keys and Backspace. A hint reveals the next step; it may rewind a wrong turn.',letsPlay:'Let’s find a path',credits:'An independent path puzzle, inspired by the daily logic genre. Original code and puzzles. Not affiliated with LinkedIn or Zip.',complete:'CONSTELLATION COMPLETE',winTitle:'Beautifully connected.',winCopy:'Every square, every star. A moment well spent.',yourTime:'your time',hintsUsed:'hints used',shareResult:'Share your constellation',keepExploring:'Keep exploring',shareFallback:'Copy & share.',copyHelp:'Copy the text below and send it to a friend.',selectText:'Select text',next:'NEXT STAR',finished:'ALL STARS CONNECTED',start:'Start at 1. Drag or tap to trace your path.',playing:'Follow the numbers in order. Leave no square behind.',won:'Constellation complete. Beautifully done.',adjacent:'One square at a time — up, down, left or right.',wall:'A pale wall blocks this route. Try another direction.',order:'Visit the numbered stars in order.',early:'Fill the other squares before reaching the final star.',hinted:'One step revealed. Follow the glow.',corrected:'Rewound a wrong turn and revealed the next step.',restarted:'A fresh path. Your timer and hint count keep running.',saved:'Welcome back. Your path is right where you left it.',copied:'Copied! Share it with a friend.',copiedLink:'Puzzle link copied.',storage:'Progress cannot be saved in this browser session.',dailyLabel:'TODAY’S EXPEDITION',archiveLabel:'DAILY EXPEDITION',practiceLabel:'FREE EXPLORATION',calmName:'A gentle beginning',focusName:'The quiet orbit',deepName:'Beyond the familiar',soundOn:'Turn sound off',soundOff:'Turn sound on',gridLabel:'Puzzle grid. Use arrow keys to move and Backspace to undo.',close:'Close',dailyTag:'DAILY / UTC',practiceTag:'EXPLORE',row:'Row',column:'column',star:'star',wallLabel:'walls',up:'up',down:'down',left:'left',right:'right',visited:'visited',restoredWin:'You have already completed this constellation.',dateNote:'New daily puzzles at 00:00 UTC.'},
    zh:{dailyRitual:'每天，给思绪一点留白',how:'玩法说明',eyebrow:'每天一点小小的发现',headline:'一笔相连，<br><em>点亮星轨。</em>',intro:'按顺序连接数字，走遍每个格子。在星与星之间，找到思绪的宁静。',solved:'已完成关卡',best:'本关最快',local:'进度仅保存在当前设备。',daily:'每日挑战',practice:'自由探索',calm:'轻松',focus:'专注',deep:'深空',undo:'撤回',reset:'重来',hint:'给点提示',nextPuzzle:'下一段星轨',footer:'不必着急，慢慢连起你的星空。',share:'分享这道谜题',welcome:'一点小小的指引',howTitle:'找到你的星轨。',rule1:'从 1 出发，拖动或点击相邻格子画出路线。',rule2:'按数字顺序经过每颗星，每个格子都要走过，且只能走一次。',rule3:'最后到达最大的数字。浅色的墙壁不能穿过。',rule4:'点击走过的格子可以回退。键盘方向键移动，退格键撤回。提示会展示下一步；如果走错了，会先退回正确路线。',letsPlay:'开始连线',credits:'独立制作的连线解谜游戏，代码与关卡均为原创。灵感来自每日逻辑解谜类型，与 LinkedIn 或 Zip 无关联。',complete:'星轨已全部点亮',winTitle:'每颗星，都有了归属。',winCopy:'走遍每个格子，连起每颗星。又完成了一次小小的探索。',yourTime:'完成用时',hintsUsed:'使用提示',shareResult:'分享我的星轨',keepExploring:'继续探索',shareFallback:'复制，分享。',copyHelp:'复制下面的文字，发给朋友一起挑战。',selectText:'选中文字',next:'下一颗星',finished:'全部星星已连接',start:'从 1 出发，拖动或点击相邻格子。',playing:'按数字顺序前进，不要漏掉任何格子。',won:'星轨已完成，连接得很漂亮。',adjacent:'每次移动一格，只能上下左右前进。',wall:'这里有一堵浅色墙，请换个方向。',order:'请按数字顺序连接星星。',early:'先走完其他格子，再到达最后一颗星。',hinted:'已揭示下一步，沿着亮起的路线继续吧。',corrected:'已退回走错的岔路，并揭示正确的下一步。',restarted:'路线已清空，用时和提示次数继续累计。',saved:'欢迎回来，已经恢复上次的路线。',copied:'已复制，可以分享给朋友了。',copiedLink:'谜题链接已复制。',storage:'当前浏览器无法保存进度，关闭页面后进度会丢失。',dailyLabel:'今日星轨',archiveLabel:'每日星轨',practiceLabel:'自由探索',calmName:'轻轻启程',focusName:'静谧轨道',deepName:'深空回响',soundOn:'关闭音效',soundOff:'开启音效',gridLabel:'谜题棋盘。方向键移动，退格键撤回。',close:'关闭',dailyTag:'每日 / UTC',practiceTag:'探索',row:'第',column:'列',star:'数字',wallLabel:'墙壁',up:'上',down:'下',left:'左',right:'右',visited:'已走过',restoredWin:'你已完成这段星轨，可以切换难度或继续探索。',dateNote:'每日关卡于北京时间 08:00 更新（UTC 00:00）。'}
  };
  let storageOK=true;
  function read(key,fallback) {try{const item=localStorage.getItem(key);return item?JSON.parse(item):fallback;}catch{storageOK=false;return fallback;}}
  function write(key,value) {try{localStorage.setItem(key,JSON.stringify(value));}catch{storageOK=false;}}
  let lang=read('starpath-language',null);
  if(!['en','zh'].includes(lang)) lang=navigator.language.startsWith('zh')?'zh':'en';
  let sound=read('starpath-sound',false)===true;
  let options=E.parseOptions(location.search), game, elapsed=0, hints=0, started=false, lastTick=performance.now(), pointer=null, lastCell=null, statusKey='start', statusError=false;
  let scores=read('starpath-scores-v1',{});if(!scores || typeof scores!=='object' || Array.isArray(scores))scores={};
  let audioContext;
  const t=key=>translations[lang][key]||key;
  const time=ms=>{const secs=Math.floor(ms/1000);return `${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}`;};
  function tone(win=false) {
    if(!sound)return;
    try{
      audioContext??=new(window.AudioContext||window.webkitAudioContext)();
      audioContext.resume().catch(()=>{});
      const notes=win?[440,554.37,659.25,880]:[280+game.nextCheckpoint*45];
      notes.forEach((frequency,i)=>{const osc=audioContext.createOscillator(),gain=audioContext.createGain(),at=audioContext.currentTime+i*.12;osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(.065,at+.015);gain.gain.exponentialRampToValueAtTime(.0001,at+.24);osc.connect(gain);gain.connect(audioContext.destination);osc.start(at);osc.stop(at+.25);});
    }catch{}
  }
  function anyDialog(){return [...document.querySelectorAll('dialog')].some(d=>d.open);}
  function tick(){const now=performance.now();if(started&&!game.won&&!document.hidden&&!anyDialog())elapsed+=Math.min(now-lastTick,1500);lastTick=now;$('timer').textContent=time(elapsed);}
  function save(){if(!game)return;write('starpath-progress:'+E.gameKey(options),{path:game.path,elapsed,hints,started});}
  function syncURL(){const q=new URLSearchParams({mode:options.mode,difficulty:options.difficulty});q.set(options.mode==='daily'?'date':'p',options.mode==='daily'?options.date:options.practice);try{history.replaceState(null,'','?'+q);}catch{}}
  function announce(key,error=false){statusKey=key;statusError=error;$('status').textContent=t(key);$('status').classList.toggle('error',error);}
  function translate(){
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.title=lang==='zh'?'星轨 Starpath · 每日连线解谜':'Starpath · A daily path puzzle';
    for(const el of document.querySelectorAll('[data-i18n]'))el.textContent=t(el.dataset.i18n);
    for(const el of document.querySelectorAll('[data-i18n-html]'))el.innerHTML=t(el.dataset.i18nHtml).replace('<br>','<br> ');
    $('language').textContent=lang==='en'?'中文':'EN';$('language').setAttribute('aria-label',lang==='en'?'切换为中文':'Switch to English');
    $('sound').setAttribute('aria-label',t(sound?'soundOn':'soundOff'));$('sound').setAttribute('aria-pressed',sound);$('sound').classList.toggle('sound-off',!sound);
    document.querySelectorAll('[data-close]').forEach(el=>{if(el.classList.contains('modal-close'))el.setAttribute('aria-label',t('close'));});
    $('board').setAttribute('aria-label',t('gridLabel'));
    if(game){updateLabels();render();announce(statusKey,statusError);}
  }
  function scoreEntries(){return Object.entries(scores).filter(([,v])=>v&&typeof v==='object'&&Number.isFinite(v.time)&&v.time>=0);}
  function recordScore(){
    const current=read('starpath-scores-v1',{});
    if(current&&typeof current==='object'&&!Array.isArray(current))scores=current;
    const key=E.gameKey(options),old=scores[key];
    if(!old||!Number.isFinite(old.time)||elapsed<old.time)scores[key]={time:elapsed,hints};
    const entries=scoreEntries();if(entries.length>1500)scores=Object.fromEntries(entries.slice(-1500));
    write('starpath-scores-v1',scores);
  }
  function updateLabels(){
    const daily=options.mode==='daily';
    document.querySelectorAll('[data-mode]').forEach(el=>{const active=el.dataset.mode===options.mode;el.classList.toggle('active',active);el.setAttribute('aria-pressed',active);});
    document.querySelectorAll('[data-difficulty]').forEach(el=>{const active=el.dataset.difficulty===options.difficulty;el.classList.toggle('active',active);el.setAttribute('aria-pressed',active);});
    $('mission-label').textContent=t(daily?(options.date===E.today()?'dailyLabel':'archiveLabel'):'practiceLabel');
    $('mission-name').textContent=t(options.difficulty+'Name');
    $('puzzle-date').textContent=daily?new Intl.DateTimeFormat(lang==='zh'?'zh-CN':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(options.date+'T00:00:00Z')):`${t('practiceTag')} ${String(options.practice).padStart(3,'0')}`;
    $('grid-size').textContent=`${game.puzzle.size} × ${game.puzzle.size}`;
    $('edition').textContent=daily?`${options.date.slice(5).replace('-',' / ')} · UTC`:`${t('practiceTag')} / ${String(options.practice).padStart(3,'0')}`;
    $('edition').title=daily?t('dateNote'):t('practiceLabel');
    $('solved-count').textContent=scoreEntries().length;
    const best=scores[E.gameKey(options)];$('best-time').textContent=best&&Number.isFinite(best.time)&&best.time>=0?time(best.time):'—';
    $('next-puzzle').hidden=daily&&!game.won;
  }
  function buildBoard(){
    const n=game.puzzle.size;const board=$('board');board.replaceChildren();board.style.setProperty('--size',n);board.parentElement.dataset.size=n;
    for(let c=0;c<n*n;c++){
      const el=document.createElement('button');el.type='button';el.className='cell';el.dataset.cell=c;el.tabIndex=-1;
      if(c%n===n-1)el.style.borderRight='0';if(c>=n*(n-1))el.style.borderBottom='0';board.append(el);
    }
    $('checkpoint-layer').replaceChildren();
    game.puzzle.checkpoints.forEach((c,i)=>{const el=document.createElement('span');el.className='checkpoint';el.textContent=i+1;el.style.left=`${(c%n+.5)/n*100}%`;el.style.top=`${(Math.floor(c/n)+.5)/n*100}%`;el.dataset.checkpoint=c;if(i===game.puzzle.checkpoints.length-1)el.classList.add('finish');$('checkpoint-layer').append(el);});
    for(const id of ['wall-layer','path-layer'])$(id).setAttribute('viewBox',`0 0 ${n*100} ${n*100}`);
    $('wall-layer').replaceChildren();
    for(const [a,b] of game.puzzle.walls){
      const line=document.createElementNS(NS,'line');const x=a%n,y=Math.floor(a/n),xx=b%n,yy=Math.floor(b/n);
      const coords=y===yy?[Math.max(x,xx)*100,y*100+8,Math.max(x,xx)*100,y*100+92]:[x*100+8,Math.max(y,yy)*100,x*100+92,Math.max(y,yy)*100];
      ['x1','y1','x2','y2'].forEach((attr,i)=>line.setAttribute(attr,coords[i]));$('wall-layer').append(line);
    }
  }
  function render(){
    const n=game.puzzle.size,visited=new Set(game.path),last=game.path.at(-1),next=game.nextCheckpoint;
    for(const el of $('board').children){
      const c=Number(el.dataset.cell),cp=game.puzzle.checkpoints.indexOf(c);el.classList.toggle('visited',visited.has(c));
      const walls=game.puzzle.walls.filter(e=>e.includes(c)).map(e=>{const b=e[0]===c?e[1]:e[0];return t(b===c-n?'up':b===c+n?'down':b===c-1?'left':'right');});
      el.setAttribute('aria-label',`${t('row')} ${Math.floor(c/n)+1}, ${t('column')} ${c%n+1}${cp>=0?', '+t('star')+' '+(cp+1):''}${visited.has(c)?', '+t('visited'):''}${walls.length?', '+t('wallLabel')+': '+walls.join(', '):''}`);
    }
    const layer=$('path-layer');layer.replaceChildren();
    const line=document.createElementNS(NS,'polyline');line.setAttribute('class','path-line');line.setAttribute('points',game.path.map(c=>`${c%n*100+50},${Math.floor(c/n)*100+50}`).join(' '));layer.append(line);
    const head=document.createElementNS(NS,'circle');head.setAttribute('class','path-head');head.setAttribute('cx',last%n*100+50);head.setAttribute('cy',Math.floor(last/n)*100+50);head.setAttribute('r',11);layer.append(head);
    for(const el of $('checkpoint-layer').children){const c=Number(el.dataset.checkpoint);el.classList.toggle('visited',visited.has(c));el.classList.toggle('next',game.puzzle.checkpoints[next]===c);el.classList.toggle('head',last===c);}
    $('next-star').replaceChildren();const label=document.createElement('span');label.textContent=t(game.won?'finished':'next');$('next-star').append(label);if(!game.won){const value=document.createElement('strong');value.textContent=next+1;$('next-star').append(value);}
    $('progress-count').textContent=`${game.path.length} / ${n*n}`;$('progress-fill').style.width=`${game.path.length/(n*n)*100}%`;
    $('undo').disabled=game.history.length===0||game.won;$('hint').disabled=game.won;$('reset').disabled=!started&&!game.won;
    $('timer').textContent=time(elapsed);$('next-puzzle').hidden=options.mode==='daily'&&!game.won;
  }
  function load(){
    game=new E.Game(E.puzzleFor(window.STARPATH_LEVELS,options));elapsed=0;hints=0;started=false;pointer=null;lastCell=null;lastTick=performance.now();
    const previous=read('starpath-progress:'+E.gameKey(options),null);
    let restored=false;
    if(previous&&game.restore(previous.path)){elapsed=Number.isFinite(previous.elapsed)?Math.max(0,Math.min(previous.elapsed,31536000000)):0;hints=Number.isInteger(previous.hints)?Math.max(0,Math.min(previous.hints,100000)):0;started=previous.started===true||game.path.length>1;restored=game.path.length>1;}
    if(game.won)recordScore();
    buildBoard();updateLabels();render();syncURL();announce(!storageOK?'storage':game.won?'restoredWin':restored?'saved':'start');
  }
  function openDialog(id){tick();const dialog=$(id);if(!dialog.open)dialog.showModal();}
  function finish(){
    recordScore();save();updateLabels();announce('won');tone(true);
    $('win-time').textContent=time(elapsed);$('win-hints').textContent=hints;$('win-share-status').textContent='';openDialog('win-dialog');
  }
  function perform(cell,quiet=false){
    tick();const result=game.move(cell);
    if(!result.ok){if(!quiet&&!['same','complete','outside'].includes(result.reason))announce(result.reason,true);return false;}
    started=true;render();save();if(result.won)finish();else{announce('playing');if(!result.backtrack)tone();}return true;
  }
  function undo(){if(game.won)return;if(game.undo()){render();save();announce('playing');}}
  function nextPuzzle(){save();document.querySelectorAll('dialog[open]').forEach(d=>d.close());if(options.mode==='daily'){options.mode='practice';options.practice=1;}else options.practice=options.practice%1000000+1;load();}
  function pointCell(e){const rect=$('board').getBoundingClientRect();if(e.clientX<rect.left||e.clientX>=rect.right||e.clientY<rect.top||e.clientY>=rect.bottom)return null;const n=game.puzzle.size;return Math.floor((e.clientY-rect.top)/rect.height*n)*n+Math.floor((e.clientX-rect.left)/rect.width*n);}
  $('board').addEventListener('pointerdown',e=>{
    if(e.button!==0||game.won)return;pointer=e.pointerId;lastCell=pointCell(e);$('board').setPointerCapture(e.pointerId);$('board').focus({preventScroll:true});if(lastCell!==null)perform(lastCell);e.preventDefault();
  });
  $('board').addEventListener('pointermove',e=>{
    if(pointer!==e.pointerId||game.won)return;const cell=pointCell(e);if(cell===null||cell===lastCell)return;lastCell=cell;
    const n=game.puzzle.size,from=game.path.at(-1),dx=cell%n-from%n,dy=Math.floor(cell/n)-Math.floor(from/n);
    if((dx===0||dy===0)&&!game.path.includes(cell)){
      const step=dx?Math.sign(dx):Math.sign(dy)*n;for(let c=from+step;c!==cell+step;c+=step){if(!perform(c,true))break;}
    }else perform(cell,true);
  });
  function release(e){if(pointer===e.pointerId){pointer=null;lastCell=null;}}
  ['pointerup','pointercancel','lostpointercapture'].forEach(name=>$('board').addEventListener(name,release));
  // Screen-reader generated click events have detail=0 and no pointerdown.
  $('board').addEventListener('click',e=>{if(e.detail===0&&e.target.dataset.cell)perform(Number(e.target.dataset.cell));});
  $('board').addEventListener('keydown',e=>{
    const n=game.puzzle.size,last=game.path.at(-1),steps={ArrowUp:-n,ArrowDown:n,ArrowLeft:-1,ArrowRight:1};
    if(e.key in steps){e.preventDefault();const cell=last+steps[e.key];if(E.adjacent(last,cell,n))perform(cell);}
    else if(e.key==='Backspace'||e.key.toLowerCase()==='z'){e.preventDefault();undo();}
  });
  $('undo').addEventListener('click',undo);
  $('reset').addEventListener('click',()=>{tick();game.restart();started=true;render();save();announce('restarted');});
  $('hint').addEventListener('click',()=>{tick();const result=game.hint();if(!result.changed)return;hints++;started=true;render();save();if(game.won)finish();else{announce(result.reset?'corrected':'hinted');tone();}});
  document.querySelectorAll('[data-mode]').forEach(el=>el.addEventListener('click',()=>{if(el.dataset.mode===options.mode)return;tick();save();options.mode=el.dataset.mode;if(options.mode==='daily')options.date=E.today();load();}));
  document.querySelectorAll('[data-difficulty]').forEach(el=>el.addEventListener('click',()=>{if(el.dataset.difficulty===options.difficulty)return;tick();save();options.difficulty=el.dataset.difficulty;load();}));
  $('next-puzzle').addEventListener('click',nextPuzzle);$('win-next').addEventListener('click',nextPuzzle);
  $('language').addEventListener('click',()=>{lang=lang==='en'?'zh':'en';write('starpath-language',lang);translate();});
  $('sound').addEventListener('click',()=>{sound=!sound;write('starpath-sound',sound);translate();if(sound)tone();});
  $('help').addEventListener('click',()=>openDialog('help-dialog'));
  document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',()=>el.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog=>{dialog.addEventListener('close',()=>{lastTick=performance.now();});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});});
  async function share(){
    const isFile=location.protocol==='file:';
    const title=`✦ Starpath · ${t(options.difficulty)}\n${options.mode==='daily'?options.date:t('practice')+' #'+options.practice}`;
    const result=game.won?`\n${time(elapsed)} · ${hints} ${t('hintsUsed')}\n✦ ━ ✦ ━ ✦`:`\n${lang==='zh'?'你能一笔连接所有星星吗？':'Can you connect every star in one path?'}`;
    const content=`${title}${result}${isFile?'':'\n'+location.href}`;
    try{if(isFile)throw new Error('Local file');await navigator.clipboard.writeText(content);announce(game.won?'copied':'copiedLink');$('win-share-status').textContent=t('copied');}
    catch{$('share-text').value=content;openDialog('share-dialog');$('share-text').select();}
  }
  $('share').addEventListener('click',share);$('share-result').addEventListener('click',share);$('select-share').addEventListener('click',()=>{$('share-text').focus();$('share-text').select();});
  document.addEventListener('visibilitychange',()=>{lastTick=performance.now();save();});window.addEventListener('pagehide',save);
  window.addEventListener('storage',event=>{if(event.key==='starpath-scores-v1'){const current=read(event.key,{});if(current&&typeof current==='object'&&!Array.isArray(current)){scores=current;updateLabels();}}});
  translate();load();setInterval(()=>{tick();if(started&&!game.won&&!document.hidden&&!anyDialog())save();},1000);
})();
