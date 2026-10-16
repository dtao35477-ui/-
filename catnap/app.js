/* Original Catnap Escape UI and artwork. No external assets or runtime dependencies. */
(() => {
  'use strict';
  const E = window.CatEngine, $ = id => document.getElementById(id), STORAGE = 'catnap.escape.v1';
  const TEXT = {
    zh: {
      playArea:'游戏区域',gameMode:'游戏模式',selectRoom:'选择关卡',shareContent:'分享内容',
      title:'小猫，该回家啦<span>。</span>', subtitle:'挪开一点点，快乐多一点。把房间里的猫咪都送出去。',
      roomCaption:'THE COZIEST WAY OUT', roomBottom:'每只猫，都有自己的方向', undo:'撤回', restart:'重来', hint:'帮我一下', journey:'闯关之旅', daily:'每日挑战', levelsDone:'已完成关卡',
      dailyCopy:'全世界，同一道小难题。每天 UTC 零点更新。', shareChallenge:'分享今日挑战 ↗', saved:'进度自动保存在当前浏览器', unsaved:'浏览器无法存档；本次仍可正常游玩',
      howTitle:'跟着小鼻子的方向', howCopy:'点击猫咪，它会向前走。前面有同伴？先帮同伴离开。', learn:'看看怎么玩 →', slow:'没有倒计时，慢慢来就好。', footer:'给大脑一个温柔的小休息', share:'邀请朋友来玩 ↗',
      helpTitle:'让每一只猫咪回家', help1:'看猫咪鼻子和身上的箭头，确认它的朝向。', help2:'点击猫咪。前方直到房间边缘都没有其他猫咪，它就能离开。', help3:'被挡住也没关系，先移动其他猫咪。清空房间即可过关。',
      helpExtra:'不用提示、没有碰撞可得 3 星；不用提示且碰撞不超过 2 次可得 2 星。其他通关也有 1 星。键盘可用 Tab 选猫咪，Enter 或空格送它出门。', gotIt:'知道啦，开始吧',
      winKicker:'EVERY CAT IS HOME', winTitle:'好啦，全都回家了！', shareResult:'分享我的成绩 ↗', shareTitle:'把快乐分享出去', copyManual:'复制下面的文字，发给朋友：', done:'完成',
      chapter:['午后的窗边','软软的客厅','热闹的猫咖'], chapterCopy:['从一小步开始，找到出门的顺序。','房间更热闹了，先观察，再出发。','猫咪们挤在一起，试着解开小小的拥堵。'], room:['阳光小屋','薄荷客厅','猫咪咖啡馆'],
      dailyTitle:'今天，也要好心情', dailySub:'每天一间新房间，给自己几分钟小休息。', chapterLabel:'CHAPTER', dailyLabel:'DAILY MOMENT', level:n=>`第 ${String(n).padStart(2,'0')} / 30 关`,
      tap:'点击一只猫咪，送它回家。', first:'先试试右上角朝右的橘猫 →', blocked:'前方有猫咪挡住啦，先帮它离开。', escaped:'又一只小猫回家了！', finished:'房间清空啦，做得真好。', hintStatus:'发光的猫咪现在可以离开。', hintToast:'提示已使用，本次通关可获得 1 星。',
      noUndo:'还没有可以撤回的移动。', restarted:'重新开始啦。已用提示和碰撞次数会保留。', next:'下一间小屋 →', again:'再玩一次', allDone:'继续自由选关 →', dailyBack:'继续闯关之旅 →',
      winCopy:(n,m,h)=>`送 ${n} 只猫咪回家 · 碰撞 ${m} 次 · 提示 ${h} 次`, allCopy:'30 个关卡全部完成！欢迎明天来玩每日挑战。', copied:'分享文字已复制，可以发给朋友啦。',
      shareGame:'来玩「猫咪解堵」：点击小猫，帮它们找到回家的路！', shareWin:(s,l)=>`我在「猫咪解堵」${l}获得了 ${s} 星！你也来试试：`, dailyName:'每日挑战', levelName:n=>`第 ${n} 关`,
      dirs:{E:'向右',W:'向左',N:'向上',S:'向下'}, colors:['橘','薄荷','奶油','紫','蓝','桃'], cat:(id,color,dir)=>`${id+1}号${color}猫，${dir}`, enableSound:'开启音效', disableSound:'关闭音效', help:'玩法说明', close:'关闭', board:'猫咪棋盘', levelSelect:n=>`进入第 ${n} 关`, progress:n=>`已完成 ${n} 关`, dateExpired:'已切换到新的每日挑战。',
    },
    en: {
      playArea:'Play area',gameMode:'Game mode',selectRoom:'Choose a room',shareContent:'Text to share',
      title:'A little room.<br>A lot of cats<span>.</span>', subtitle:'One small move, one happy cat. Help everyone find their way home.',
      roomCaption:'THE COZIEST WAY OUT', roomBottom:'Every cat has a direction of its own', undo:'Undo', restart:'Restart', hint:'A little hint', journey:'The journey', daily:'Daily puzzle', levelsDone:'rooms cleared',
      dailyCopy:'One little puzzle for everyone. A fresh room every day at 00:00 UTC.', shareChallenge:'Share today’s puzzle ↗', saved:'Progress saved in this browser', unsaved:'Storage unavailable; you can still play this session',
      howTitle:'Follow that little nose', howCopy:'Tap a cat to send it forward. Someone in the way? Help that friend out first.', learn:'Show me how →', slow:'No ticking clock. Take your time.', footer:'A soft little break for your brain', share:'Bring a friend along ↗',
      helpTitle:'Help every cat get home', help1:'The little nose and arrow show which way a cat is facing.', help2:'Tap a cat. It can leave when its entire path to the edge is clear.', help3:'A friend in the way? Move that friend first. Clear the room to win.',
      helpExtra:'Earn 3 stars with no hints or bumps; 2 stars with no hints and up to 2 bumps; 1 star for any other clear. Keyboard: Tab to a cat, then press Enter or Space.', gotIt:'Got it. Let’s play!',
      winKicker:'EVERY CAT IS HOME', winTitle:'Home, sweet home.', shareResult:'Share my little victory ↗', shareTitle:'A little joy to share', copyManual:'Copy this text and send it to a friend:', done:'Done',
      chapter:['A sunny beginning','The cozy living room','A very busy cat café'], chapterCopy:['Start small. Find a little space to move.','More friends, a little more to untangle.','A full house. A quiet moment to figure it out.'], room:['The sunshine room','The mint lounge','The neighborhood café'],
      dailyTitle:'Your daily little escape', dailySub:'A fresh room, a few quiet minutes, and some very lovely cats.', chapterLabel:'CHAPTER', dailyLabel:'DAILY MOMENT', level:n=>`ROOM ${String(n).padStart(2,'0')} / 30`,
      tap:'Tap a cat to help it get home.', first:'Try the orange cat facing right, near the top →', blocked:'A friend is in the way. Help them out first.', escaped:'Another little cat is home!', finished:'A happy ending for every cat.', hintStatus:'The glowing cat has a clear way out.', hintToast:'Hint used. This clear can earn 1 star.',
      noUndo:'No moves to undo just yet.', restarted:'A fresh start. Hints and bumps still count for this attempt.', next:'The next little room →', again:'Play again', allDone:'Explore the rooms again →', dailyBack:'Back to the journey →',
      winCopy:(n,m,h)=>`${n} cats home · ${m} bumps · ${h} hints`, allCopy:'All 30 rooms cleared! Come back for a new daily puzzle tomorrow.', copied:'Copied! Send a little puzzle to a friend.',
      shareGame:'Come play Catnap Escape. A little room, a lot of cats, and one cozy way out!', shareWin:(s,l)=>`I earned ${s} stars on ${l} in Catnap Escape! Your turn:`, dailyName:'the daily puzzle', levelName:n=>`room ${n}`,
      dirs:{E:'facing right',W:'facing left',N:'facing up',S:'facing down'}, colors:['orange','mint','cream','lilac','blue','peach'], cat:(id,color,dir)=>`Cat ${id+1}, ${color}, ${dir}`, enableSound:'Turn sound on', disableSound:'Turn sound off', help:'How to play', close:'Close', board:'Cat puzzle board', levelSelect:n=>`Play room ${n}`, progress:n=>`${n} rooms cleared`, dateExpired:'A fresh daily puzzle is ready.',
    }
  };
  const palette = [ ['#dca077','#bd805d','#f2c4a2'], ['#a8b6a0','#81957c','#cbd4b9'], ['#e4ca8c','#c5a762','#f5e3b7'], ['#bbb0ca','#9688ac','#d4c9df'], ['#9fbbc4','#7499a6','#c6dbe0'], ['#dda9a2','#bf8580','#f2cbc3'] ];
  function catSvg(cat, decorative = false) {
    const [fur, stripe, ear] = palette[cat.color], w = cat.len * 100, head = w-48;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 100" aria-hidden="true"><ellipse cx="${w/2}" cy="59" rx="${w/2-13}" ry="32" fill="#6e6449" opacity=".12"/><path d="M29 49C5 57 5 23 25 24" fill="none" stroke="${stripe}" stroke-width="12" stroke-linecap="round"/><rect x="20" y="20" width="${w-55}" height="61" rx="29" fill="${fur}"/><path d="M52 22v12m20-12v12m-20 45V68m20 11V68" stroke="${stripe}" stroke-width="6" stroke-linecap="round" opacity=".65"/><ellipse cx="${head}" cy="50" rx="35" ry="34" fill="${fur}"/><path d="M${head-10} 23L${head+14} 8L${head+24} 34M${head-10} 77L${head+14} 92L${head+24} 66" fill="${fur}" stroke="${fur}" stroke-width="5" stroke-linejoin="round"/><path d="m${head+3} 24 10-8 5 15m-15 45 10 8 5-15" fill="${ear}"/><ellipse cx="${head+17}" cy="50" rx="20" ry="18" fill="${ear}" opacity=".65"/><path d="M${head+9} 34q5-4 9 0m-9 32q5 4 9 0" fill="none" stroke="#465049" stroke-width="3" stroke-linecap="round"/><path d="m${head+28} 46 5 4-5 4q-3-4 0-8" fill="#935e59"/><path d="m${head+20} 42 17-4m-17 20 17 4" stroke="#8a7465" stroke-width="1.5" opacity=".6"/>${decorative ? '' : `<path d="m${Math.min(w/2-12,76)} 43 8 7-8 7" fill="none" stroke="#fffaf0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>`}</svg>`;
  }
  let memory = {}, storageOK = true;
  try { const raw = JSON.parse(localStorage.getItem(STORAGE) || '{}'); if (raw && typeof raw === 'object' && !Array.isArray(raw)) memory = raw; } catch (_) { storageOK = false; }
  const object = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  memory.records = object(memory.records); memory.runs = object(memory.runs);
  let lang = memory.lang === 'en' ? 'en' : 'zh', sound = memory.sound === true;
  let mode = 'journey', number = 1, date = new Date().toISOString().slice(0,10), level, run, key, busy = false, epoch = 0, hinted = null, lastStatus = '', audioContext;
  const today = () => new Date().toISOString().slice(0,10), t = () => TEXT[lang];
  function record(keyName) { const r = memory.records[keyName]; return Number.isInteger(r) && r >= 1 && r <= 3 ? r : 0; }
  function save() {
    memory.lang = lang; memory.sound = sound;
    if (key && run) {
      memory.runs[key] = { ...run, removed: [...run.removed] };
      // Finalize a clear before animation so a reload or mode change cannot lose it.
      if (level && run.removed.length === level.cats.length) memory.records[key] = Math.max(record(key), E.stars(run));
    }
    const dates = Object.keys(memory.runs).filter(k=>k.startsWith('daily:')).sort().reverse();
    for (const k of dates.slice(60)) delete memory.runs[k];
    try {
      // Merge best scores from other tabs before saving this tab's active run.
      const other = object(JSON.parse(localStorage.getItem(STORAGE) || '{}'));
      for (const [k, value] of Object.entries(object(other.records))) if (Number.isInteger(value) && value>=1 && value<=3) memory.records[k] = Math.max(record(k),value);
      localStorage.setItem(STORAGE, JSON.stringify(memory));
    } catch (_) { storageOK = false; }
    $('save-note').textContent = storageOK ? t().saved : t().unsaved;
  }
  function playTone(kind) {
    if (!sound) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      audioContext.resume().catch(()=>{});
      const frequencies = kind === 'win' ? [523,659,784,1047] : kind === 'bump' ? [165,140] : [620,820];
      frequencies.forEach((f,i)=>{ const osc = audioContext.createOscillator(), gain = audioContext.createGain(), time = audioContext.currentTime+i*.085; osc.type='sine'; osc.frequency.setValueAtTime(f,time); gain.gain.setValueAtTime(0,time); gain.gain.linearRampToValueAtTime(.06,time+.01); gain.gain.exponentialRampToValueAtTime(.001,time+.15); osc.connect(gain).connect(audioContext.destination); osc.start(time); osc.stop(time+.16); });
    } catch (_) {}
  }
  function toast(message) { $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toast.timer); toast.timer = setTimeout(()=>$('toast').classList.remove('visible'),3000); }
  function setStatus(type) { lastStatus = type; $('status').textContent = t()[type] || type; }
  function translate() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'; document.title = lang === 'zh' ? '猫咪解堵 Catnap Escape' : 'Catnap Escape · A cozy cat puzzle';
    document.querySelectorAll('[data-i18n]').forEach(el=>{ const text=t()[el.dataset.i18n]; if (el.dataset.i18n==='title') el.innerHTML=text; else el.textContent=text; });
    document.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t()[el.dataset.i18nAria]));
    $('level-grid').setAttribute('aria-label',t().selectRoom);$('share-text').setAttribute('aria-label',t().shareContent);
    $('language').textContent = lang === 'zh' ? 'EN' : '中文';
    $('sound').setAttribute('aria-label', sound ? t().disableSound : t().enableSound); $('sound').setAttribute('aria-pressed',String(sound));
    $('sound').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9h4l5-4v14l-5-4H4z"/>${sound?'<path d="M16 8q5 4 0 8m2-11q8 7 0 14"/>':'<path d="m17 9 5 6m0-6-5 6"/>'}</svg>`;
    $('help').setAttribute('aria-label',t().help); $('board').setAttribute('aria-label',t().board); document.querySelectorAll('.close-dialog').forEach(b=>b.setAttribute('aria-label',t().close));
    render();
  }
  function syncURL() { if (location.protocol === 'file:') return; const url=new URL(location.href); url.search=''; if(mode==='daily'){url.searchParams.set('mode','daily');url.searchParams.set('date',date);}else url.searchParams.set('level',String(number)); history.replaceState(null,'',url); }
  function start(nextMode, n = number, restore = true) {
    if(run)save(); epoch++; busy=false; hinted=null;
    mode=nextMode; number=Math.min(30,Math.max(1,Math.floor(Number(n))||1));
    level=mode==='daily'?E.daily(date):E.getLevel(number); key=mode==='daily'?'daily:'+date:'level:'+number;
    run=E.validateRun(level,restore?memory.runs[key]:null);
    if(mode==='journey')memory.last=number;
    $('win-dialog').close(); syncURL();
    lastStatus=run.removed.length===level.cats.length?'finished':mode==='journey'&&number===1&&!run.removed.length?'first':'tap';
    render();save();renderRecords();
  }
  function render() {
    if(!level)return;
    const board=$('board');board.style.setProperty('--n',level.size);board.replaceChildren();
    for (const cat of level.cats) {
      if(run.removed.includes(cat.id))continue;
      const c=E.cells(cat), minX=Math.min(...c.map(p=>p[0])),minY=Math.min(...c.map(p=>p[1])),vertical=cat.dir==='N'||cat.dir==='S';
      const b=document.createElement('button');b.type='button';b.className='cat'+(cat.id===hinted?' hinted':'');b.dataset.cat=cat.id;
      b.setAttribute('aria-label',t().cat(cat.id,t().colors[cat.color],t().dirs[cat.dir]));
      Object.assign(b.style,{left:minX*100/level.size+'%',top:minY*100/level.size+'%',width:(vertical?1:cat.len)*100/level.size+'%',height:(vertical?cat.len:1)*100/level.size+'%'});
      b.style.setProperty('--dx',E.DIRS[cat.dir][0]);b.style.setProperty('--dy',E.DIRS[cat.dir][1]);b.innerHTML=catSvg(cat);
      const angle={E:0,S:90,W:180,N:270}[cat.dir];Object.assign(b.firstElementChild.style,{left:'50%',top:'50%',width:vertical?cat.len*100+'%':'100%',height:vertical?100/cat.len+'%':'100%',transform:`translate(-50%, -50%) rotate(${angle}deg)`});
      b.addEventListener('click',()=>move(cat.id));board.append(b);
    }
    const chapter=Math.floor((number-1)/10),dailyMode=mode==='daily',count=run.removed.length;
    $('room-name').textContent=dailyMode?t().dailyName:t().room[chapter];$('level-label').textContent=dailyMode?date:t().level(number);
    $('progress-count').textContent=`${count} / ${level.cats.length}`;$('progress-bar').style.width=count/level.cats.length*100+'%';
    $('undo').disabled=!count;$('hint').disabled=count===level.cats.length;
    setStatus(lastStatus||'tap');
    $('journey').classList.toggle('active',!dailyMode);$('daily').classList.toggle('active',dailyMode);$('journey').setAttribute('aria-pressed',String(!dailyMode));$('daily').setAttribute('aria-pressed',String(dailyMode));
    $('chapter-kicker').textContent=dailyMode?t().dailyLabel:`${t().chapterLabel} 0${chapter+1} / 03`;
    $('chapter-name').textContent=dailyMode?t().dailyTitle:t().chapter[chapter];$('chapter-copy').textContent=dailyMode?t().dailySub:t().chapterCopy[chapter];
    renderRecords(); $('level-grid').hidden=dailyMode;$('daily-card').hidden=!dailyMode;$('daily-date').textContent=date;
    $('save-note').textContent=storageOK?t().saved:t().unsaved;
  }
  function renderRecords() {
    const records=Array.from({length:30},(_,i)=>record('level:'+(i+1)));$('solved-count').innerHTML=records.filter(Boolean).length+'<small>/ 30</small>';$('total-stars').textContent='☆ '+records.reduce((a,b)=>a+b,0);
    $('level-grid').replaceChildren();
    records.forEach((stars,i)=>{const n=i+1,b=document.createElement('button');b.className='level-button'+(stars?' completed':'')+(n===number&&mode==='journey'?' current':'');b.setAttribute('aria-label',t().levelSelect(n)+(stars?`, ${stars} ★`:''));if(n===number&&mode==='journey')b.setAttribute('aria-current','step');b.innerHTML=n+`<span class="level-stars">${'★'.repeat(stars)}</span>`;b.addEventListener('click',()=>start('journey',n));$('level-grid').append(b);});
  }
  function move(id) {
    if(busy)return; const result=E.exitCheck(level,id,run.removed),button=$('board').querySelector(`[data-cat="${id}"]`);if(!button)return;
    if(!result.ok){
      run.mistakes++;save();setStatus('blocked');playTone('bump');button.classList.remove('bump');void button.offsetWidth;button.classList.add('bump');
      $('board').querySelectorAll('.path-cell,.blocker').forEach(el=>el.classList.contains('path-cell')?el.remove():el.classList.remove('blocker'));
      const blocker=$('board').querySelector(`[data-cat="${result.blocker}"]`);if(blocker)blocker.classList.add('blocker');
      for(const[x,y]of result.path){const mark=document.createElement('span');mark.className='path-cell';mark.style.left=x*100/level.size+'%';mark.style.top=y*100/level.size+'%';$('board').append(mark);}
      const token=epoch;setTimeout(()=>{if(token!==epoch)return;$('board').querySelectorAll('.path-cell').forEach(el=>el.remove());$('board').querySelectorAll('.blocker,.bump').forEach(el=>el.classList.remove('blocker','bump'));},650);return;
    }
    busy=true;hinted=null;run.removed.push(id);save();playTone('move');button.classList.add('leaving');button.disabled=true;
    const token=epoch,keyboardFocus=document.activeElement===button;
    setTimeout(()=>{
      if(token!==epoch)return;busy=false;lastStatus=run.removed.length===level.cats.length?'finished':'escaped';render();
      if(run.removed.length===level.cats.length)win();else if(keyboardFocus)$('board').querySelector('.cat')?.focus({preventScroll:true});
    },matchMedia('(prefers-reduced-motion: reduce)').matches?25:400);
  }
  function win() {
    const stars=E.stars(run);memory.records[key]=Math.max(record(key),stars);save();renderRecords();playTone('win');
    $('win-art').innerHTML=catSvg({len:2,color:0},true);$('win-stars').textContent='★'.repeat(stars)+'☆'.repeat(3-stars);
    $('win-copy').textContent=t().winCopy(level.cats.length,run.mistakes,run.hints)+(mode==='journey'&&Object.keys(memory.records).filter(k=>k.startsWith('level:')&&record(k)).length===30?' '+t().allCopy:'');
    $('next').textContent=mode==='daily'?t().dailyBack:number===30?t().allDone:t().next;$('win-dialog').showModal();
  }
  function shareLink() {const url=new URL(location.href);url.hash='';url.search='';if(mode==='daily'){url.searchParams.set('mode','daily');url.searchParams.set('date',date);}else url.searchParams.set('level',number);return url.href;}
  async function share(result=false) {
    const label=mode==='daily'?`${t().dailyName} (${date})`:t().levelName(number);
    const content=(result?t().shareWin(E.stars(run),label):t().shareGame)+'\n'+shareLink();
    try{await navigator.clipboard.writeText(content);toast(t().copied);}catch(_){$('share-text').value=content;$('share-dialog').showModal();$('share-text').select();}
  }
  $('language').addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';epoch++;busy=false;translate();save();});
  $('sound').addEventListener('click',()=>{sound=!sound;translate();save();if(sound)playTone('move');});
  ['help','help-inline'].forEach(id=>$(id).addEventListener('click',()=>$('help-dialog').showModal()));
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
  document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const rect=d.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)d.close();}}));
  $('journey').addEventListener('click',()=>start('journey',memory.last||1));$('daily').addEventListener('click',()=>{date=today();start('daily');});
  $('undo').addEventListener('click',()=>{if(!run.removed.length){toast(t().noUndo);return;}epoch++;busy=false;run.removed.pop();hinted=null;lastStatus='tap';render();save();});
  $('restart').addEventListener('click',()=>{epoch++;busy=false;const complete=run.removed.length===level.cats.length;run={removed:[],mistakes:complete?0:run.mistakes,hints:complete?0:run.hints};hinted=null;lastStatus='tap';render();save();if(!complete)toast(t().restarted);});
  $('hint').addEventListener('click',()=>{if(busy)return;const id=E.available(level,run.removed)[0];if(id===undefined)return;hinted=id;run.hints++;lastStatus='hintStatus';render();save();toast(t().hintToast);$('board').querySelector(`[data-cat="${id}"]`)?.focus({preventScroll:true});});
  $('next').addEventListener('click',()=>{const oldMode=mode;$('win-dialog').close();if(oldMode==='daily')start('journey',memory.last||1);else if(number<30)start('journey',number+1);else{start('journey',1);$('level-grid').scrollIntoView({behavior:'smooth',block:'center'});}});
  $('share').addEventListener('click',()=>share());$('share-daily').addEventListener('click',()=>share());$('share-result').addEventListener('click',()=>share(true));
  window.addEventListener('storage',event=>{if(event.key!==STORAGE)return;try{const incoming=object(JSON.parse(event.newValue||'{}'));for(const[k,v]of Object.entries(object(incoming.records)))if(Number.isInteger(v)&&v>=1&&v<=3)memory.records[k]=Math.max(record(k),v);renderRecords();}catch(_){}});
  window.addEventListener('pagehide',save);
  const params=new URLSearchParams(location.search);if(E.validDate(params.get('date')||''))date=params.get('date');
  start(params.get('mode')==='daily'?'daily':'journey',params.get('level')||memory.last||1);translate();
})();
