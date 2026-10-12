(function(){
  var STEPS = [
    {t:'Детали после распила', sec:'распил', x:'17 деталей 2700×500 и 4 детали 2700×100, разрезанные по картам: 4 целые боковины, карты 1–5 и царги. Серые куски — отход. Дальше детали по группам встанут на свои места.'},
    {t:'Боковины Б', sec:'4 шт', x:'Четыре целые детали 2700×500 без распила становятся боковинами модулей М1 и М2. Кромка оказывается спереди и сзади.'},
    {t:'Горизонтали модулей Г', sec:'6 шт', x:'Шесть деталей 1518 (из карт 1, 2 и 3): в каждом модуле полка на 320, полка на 2112 и крышка на 2700. Все встают между боковинами.'},
    {t:'Стойки перегородки П1–П3', sec:'6 шт', x:'Из карты 5 (по панели на модуль): П2 1776 между полками 320 и 2112, П3 572 между полкой 2112 и крышкой, П1 304 под полкой 320. Встают по центру модуля.'},
    {t:'Царги Ц', sec:'4 шт', x:'Из деталей 2700×100 отрезается 1550. По две сзади на каждый модуль: на 220–320 и на 2600–2700. Остатки ~1130 — отход.'},
    {t:'Антресоли', sec:'10 шт', x:'Дно и крыша: ещё 4 детали 1518 (карта 3). Боковины А 400 из карты 1, перегородки П4 368 из карты 2. Два короба на крышках модулей.'},
    {t:'Полки Р', sec:'12 шт', x:'Регулируемые полки 749 из карт 1–4. По 4 в секциях 3 и 4 и по одной в верхней зоне каждой секции. Тринадцатая полка остаётся в запасе.'},
    {t:'Шкаф целиком', sec:'готово', x:'Все детали на местах, на полу остались только отход и запасная полка. Можно покрутить модель и нажать на любую деталь.'}
  ];
  var N=STEPS.length, pre='a3d';
  var $=function(id){ return document.getElementById(pre+'-'+id); };
  var board=$('board'), imgs=[];
  STEPS.forEach(function(st,i){
    var li=document.createElement('li');
    var b=document.createElement('button'); b.type='button'; b.className='board-img'; b.setAttribute('aria-label','Показать шаг '+(i+1)+' в 3D');
    var im=document.createElement('img'); im.alt='Шаг '+(i+1)+': '+st.t; im.width=720; im.height=450; b.appendChild(im); imgs.push(im);
    var cap=document.createElement('div'); cap.className='board-cap';
    cap.innerHTML='<div class="board-h"><b>'+(i+1)+'</b><span>'+st.t+'</span><em>'+st.sec+'</em></div><p>'+st.x+'</p>';
    li.appendChild(b); li.appendChild(cap); board.appendChild(li);
    b.addEventListener('click',function(){ stopPlay(); go(i+1); document.getElementById(pre).scrollIntoView({behavior:'smooth',block:'start'}); });
  });
  var dots=$('dots');
  for(var d=1; d<=N; d++){ (function(k){ var b=document.createElement('button'); b.type='button'; b.textContent=k; b.setAttribute('role','tab'); b.addEventListener('click',function(){ stopPlay(); go(k); }); dots.appendChild(b); })(d); }
  function ui(s){
    var st=STEPS[s-1];
    $('n').textContent='Шаг '+s+' из '+N; $('sec').textContent=st.sec; $('title').textContent=st.t; $('text').textContent=st.x;
    Array.prototype.forEach.call(dots.children,function(b,i){ b.setAttribute('aria-selected', i===s-1?'true':'false'); });
    $('prev').disabled=s===1; $('next').disabled=s===N;
  }
  var cur=1, playTimer=null;
  var go=function(s){ cur=s; ui(s); };
  function stopPlay(){ if(playTimer){ clearInterval(playTimer); playTimer=null; $('play').textContent='▶ Проиграть всё'; } }
  $('prev').addEventListener('click',function(){ stopPlay(); go(Math.max(1,cur-1)); });
  $('next').addEventListener('click',function(){ stopPlay(); go(Math.min(N,cur+1)); });
  $('play').addEventListener('click',function(){
    if(playTimer){ stopPlay(); return; }
    $('play').textContent='❚❚ Пауза';
    go(1);
    playTimer=setInterval(function(){ if(cur>=N){ stopPlay(); return; } go(cur+1); }, 3400);
  });
  document.getElementById(pre).addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'){ stopPlay(); go(Math.min(N,cur+1)); e.preventDefault(); }
    if(e.key==='ArrowLeft'){ stopPlay(); go(Math.max(1,cur-1)); e.preventDefault(); }
  });
  ui(1);

  var LBL_KEY='wardrobe-labels';
  var showLbl=(function(){ try{ var v=localStorage.getItem(LBL_KEY); return v===null ? true : v==='1'; }catch(e){ return true; } })();
  var lblBtn=document.getElementById('a3d-lbl');
  function lblUi(){ lblBtn.textContent='Обозначения: '+(showLbl?'вкл':'выкл'); lblBtn.setAttribute('aria-pressed', showLbl?'true':'false'); }
  lblUi();
  lblBtn.addEventListener('click', function(){
    showLbl=!showLbl; try{ localStorage.setItem(LBL_KEY, showLbl?'1':'0'); }catch(e){}
    window.dispatchEvent(new CustomEvent('wardrobe-labels', {detail:showLbl}));
  });
  var onLbl=null;
  window.addEventListener('wardrobe-labels', function(e){ showLbl=e.detail; lblUi(); if(onLbl) onLbl(); });

  function fail(){ $('fallback').hidden=false; document.getElementById(pre).classList.add('no3d'); }
  if(!window.THREE){ fail(); return; }
  var T=window.THREE, V=T.Vector3;
  var wrap=$('canvas'), renderer;
  try{ renderer=new T.WebGLRenderer({antialias:true, preserveDrawingBuffer:true}); }catch(e){ fail(); return; }
  if(!renderer||!renderer.getContext()){ fail(); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  wrap.appendChild(renderer.domElement);
  var overlay=document.createElement('canvas'); overlay.className='d3d-overlay'; wrap.appendChild(overlay);
  var scene=new T.Scene(), camera=new T.PerspectiveCamera(35,1.6,10,90000);
  scene.add(new T.HemisphereLight(0xffffff,0x8a938f,0.85));
  var dl=new T.DirectionalLight(0xffffff,0.5); dl.position.set(3000,7000,6000); scene.add(dl);
  var dl2=new T.DirectionalLight(0xffffff,0.25); dl2.position.set(-5000,3000,1000); scene.add(dl2);
  var fl=new T.Mesh(new T.PlaneGeometry(30000,30000), new T.MeshLambertMaterial({color:0xd3d9d5})); fl.rotation.x=-Math.PI/2; fl.position.y=-2; scene.add(fl);
  var wall=new T.Mesh(new T.BoxGeometry(3306,3300,100), new T.MeshLambertMaterial({color:0xaeb8b3, transparent:true, opacity:0.2, depthWrite:false})); wall.position.set(0,1650,-318); scene.add(wall);

  var COL={'Б':0xeef0ee,'Г':0x8fcbb9,'Р':0xc4b5e6,'А':0xecc27c,'П':0xc9bea8,'Ц':0x9dbbe0,'x':0x9aa3a0};
  var MATS={}; Object.keys(COL).forEach(function(k){ MATS[k]=new T.MeshLambertMaterial({color:COL[k]}); });
  var SEL=new T.MeshLambertMaterial({color:0xffd43b, emissive:0x664d00});
  var EDGE=new T.LineBasicMaterial({color:0x33403b});
  var pieces=[], labels=[];
  var qFlat=new T.Quaternion();
  var qVert=new T.Quaternion().setFromAxisAngle(new V(0,0,1), Math.PI/2);
  var qRail=new T.Quaternion().setFromAxisAngle(new V(1,0,0), Math.PI/2);

  // очереди мест назначения
  var cx=[-775,775];
  var DEST={
    'Б':[], 'Гм':[], 'Га':[], 'П1':[], 'П2':[], 'П3':[], 'П4':[], 'А':[], 'Ц':[], 'Р':[]
  };
  [0,1].forEach(function(m){
    [-1,1].forEach(function(sd){ DEST['Б'].push({p:[cx[m]+sd*767,1350,0], q:qVert, d:'боковина '+(sd<0?'левая':'правая')+' М'+(m+1), step:2}); });
  });
  [0,1].forEach(function(m){
    [[312,'полка на 320'],[2104,'полка на 2112'],[2692,'крышка']].forEach(function(a){ DEST['Гм'].push({p:[cx[m],a[0],0], q:qFlat, d:a[1]+' М'+(m+1), step:3}); });
  });
  [0,1].forEach(function(m){
    DEST['П1'].push({p:[cx[m],152,0], q:qVert, d:'стойка П1 (низ) М'+(m+1), step:4});
    DEST['П2'].push({p:[cx[m],1208,0], q:qVert, d:'стойка П2 (середина) М'+(m+1), step:4});
    DEST['П3'].push({p:[cx[m],2398,0], q:qVert, d:'стойка П3 (верх) М'+(m+1), step:4});
    DEST['Ц'].push({p:[cx[m],2650,-258], q:qRail, d:'верхняя царга М'+(m+1), step:5});
    DEST['Ц'].push({p:[cx[m],270,-258], q:qRail, d:'нижняя царга М'+(m+1), step:5});
    DEST['Га'].push({p:[cx[m],2708,0], q:qFlat, d:'дно антресоли '+(m+1), step:6});
    DEST['Га'].push({p:[cx[m],3092,0], q:qFlat, d:'крыша антресоли '+(m+1), step:6});
    DEST['П4'].push({p:[cx[m],2900,0], q:qVert, d:'перегородка П4 антресоли '+(m+1), step:6});
    [-1,1].forEach(function(sd){ DEST['А'].push({p:[cx[m]+sd*767,2900,0], q:qVert, d:'боковина антресоли '+(m+1)+' '+(sd<0?'левая':'правая'), step:6}); });
  });
  var secC=[-775-383.5,-775+383.5,775-383.5,775+383.5];
  secC.forEach(function(x,j){ DEST['Р'].push({p:[x,2416,0], q:qFlat, d:'полка верхней зоны, секция '+(j+1), step:7}); });
  [2,3].forEach(function(j){ [677,1029,1381,1733].forEach(function(h){ DEST['Р'].push({p:[secC[j],h+11,0], q:qFlat, d:'полка на '+h+', секция '+(j+1), step:7}); }); });

  function take(key){ return DEST[key].shift(); }
  // раскладка на полу: 3 колонки × 6 рядов
  var COLX=[-2950,0,2950], ROW0=1500, ROWD=720, slot=0;
  function slotPos(){ var c=slot%3, r=Math.floor(slot/3); slot++; return {x:COLX[c]-1350, z:ROW0+r*ROWD}; }
  function mk(code,L,W,x,z,dest,src,lc){
    var g=new T.BoxGeometry(L,16,W), m=new T.Mesh(g,MATS[code]); m.add(new T.LineSegments(new T.EdgesGeometry(g),EDGE));
    m.position.set(x,8,z); scene.add(m);
    var p={mesh:m, code:code, lc:(lc||code), L:L, W:W, start:new V(x,8,z), dest:dest, src:src};
    m.userData.piece=p; pieces.push(p); return p;
  }
  function panel(name,list,rail){
    var sp=slotPos(); var x=sp.x;
    labels.push({p:new V(sp.x-230,20,sp.z), text:name.replace('Б — боковина ','Б-').replace('Карта ','К').replace(' · ','-').replace('Царги 2700×100','Ц'), kind:'note', steps:[1]});
    if(rail){
      [0,1,2,3].forEach(function(k){
        var z=sp.z-190+k*125;
        var d=take('Ц'); mk('Ц',1550,100,x+10+775,z,d,'деталь 2700×100 № '+(k+1));
        mk('x',1130,100,x+10+1550+20+565,z,null,'остаток царги');
      });
      return;
    }
    var cursor=x+10, used=10;
    list.forEach(function(it){
      var code=it[0], L=it[1], key=it[2];
      var d=key?take(key):null;
      mk(code,L,500,cursor+L/2,sp.z,d,name,(code==='П'&&key)?key:code);
      cursor+=L+22; used+=L+4;
    });
    var rest=2700-used;
    if(rest>60) mk('x',rest,500,cursor+rest/2,sp.z,null,'остаток '+name);
  }
  for(var i=0;i<4;i++) panel('Б — боковина '+(i+1),[['Б',2700,'Б']]);
  for(i=0;i<4;i++) panel('Карта 1 · '+(i+1),[['Г',1518,'Гм'],['Р',749,'Р'],['А',400,'А']]);
  for(i=0;i<2;i++) panel('Карта 2 · '+(i+1),[['Г',1518,i===0?'Гм':'Гм'],['Р',749,'Р'],['П',368,'П4']]);
  for(i=0;i<4;i++) panel('Карта 3 · '+(i+1),[['Г',1518,i<0?'Гм':'Га'],['Р',749,'Р']]);
  panel('Карта 4',[['Р',749,'Р'],['Р',749,'Р'],['Р',749,null]]);
  for(i=0;i<2;i++) panel('Карта 5 · '+(i+1),[['П',1776,'П2'],['П',572,'П3'],['П',304,'П1']]);
  panel('Царги 2700×100',null,true);
  // запасная полка
  pieces.forEach(function(p){ if(p.code==='Р' && !p.dest) p.spare=true; });
  // горизонтали: карты 1 и 2 дают 6 шт на модули, карта 3 — 4 шт на антресоли (очереди уже распределены)

  function placeAt(p,s){
    if(p.dest && s>=p.dest.step){ p.mesh.position.fromArray(p.dest.p); p.mesh.quaternion.copy(p.dest.q); }
    else { p.mesh.position.copy(p.start); p.mesh.quaternion.copy(qFlat); }
  }
  var W1={t:[0,700,2600],d:14500,th:0.28,ph:0.95};
  var CAMS={
    1:{t:[0,0,3350],d:10200,th:0,ph:0.26}, 2:W1, 3:W1, 4:W1, 5:{t:[0,900,2000],d:12500,th:-0.55,ph:0.95}, 6:W1, 7:W1,
    8:{t:[0,1550,300],d:7200,th:0.45,ph:1.2}
  };
  var cam={t:new V(),d:9000,th:0,ph:1};
  function setCam(c){ cam.t.set(c.t[0],c.t[1],c.t[2]); cam.d=c.d; cam.th=c.th; cam.ph=c.ph; }
  function placeCam(){ var sp=Math.sin(cam.ph); camera.position.set(cam.t.x+cam.d*sp*Math.sin(cam.th), cam.t.y+cam.d*Math.cos(cam.ph), cam.t.z+cam.d*sp*Math.cos(cam.th)); camera.lookAt(cam.t); }
  var selected=null;
  function applyInstant(s){ pieces.forEach(function(p){ placeAt(p,s); }); setCam(CAMS[s]); placeCam(); }

  var octx=overlay.getContext('2d');
  function tok(n,d){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||d; }
  function drawLabels(ctx,w,h,scale,s){
    var surf=tok('--surface','#fff'), ink=tok('--ink','#1b211e');
    ctx.font='600 '+Math.round(11*scale)+'px "JetBrains Mono", Consolas, monospace'; ctx.textBaseline='middle';
    var list=[];
    if(showLbl){
      labels.forEach(function(l){ if(l.steps.indexOf(s)>=0) list.push({p:l.p, text:l.text, col:ink}); });
      pieces.forEach(function(p){
        if(p.code==='x') return;
        var moving=p.dest && p.dest.step===s;
        if(s===1 || moving || (p.dest && p.dest.step<s) || p.spare) list.push({p:p.mesh.position, text:p.lc+' '+p.L+(p.spare&&s===N?' — запас':''), col:moving?'#1f7a66':ink});
      });
    }
    if(selected) list.push({p:selected.mesh.position, text:selected.lc+' '+selected.L+'×'+selected.W, col:'#b8860b'});
    list.forEach(function(l){
      var v=l.p.clone().project(camera); if(v.z>1) return;
      var x=(v.x+1)/2*w, y=(1-v.y)/2*h, tw=ctx.measureText(l.text).width, px=5*scale, bh=18*scale;
      if(x<-50||x>w+50||y<-20||y>h+20) return;
      ctx.fillStyle=surf; ctx.globalAlpha=0.9; ctx.beginPath();
      if(ctx.roundRect) ctx.roundRect(x-tw/2-px,y-bh/2,tw+2*px,bh,3*scale); else ctx.rect(x-tw/2-px,y-bh/2,tw+2*px,bh);
      ctx.fill(); ctx.globalAlpha=1; ctx.strokeStyle=l.col; ctx.lineWidth=scale; ctx.stroke();
      ctx.fillStyle=l.col; ctx.textAlign='center'; ctx.fillText(l.text,x,y+0.5);
    });
  }
  function drawOverlay(){
    var w=overlay.clientWidth, h=overlay.clientHeight, pr=Math.min(window.devicePixelRatio||1,2);
    if(overlay.width!==Math.round(w*pr)){ overlay.width=Math.round(w*pr); overlay.height=Math.round(h*pr); }
    octx.setTransform(pr,0,0,pr,0,0); octx.clearRect(0,0,w,h); drawLabels(octx,w,h,1,cur);
  }

  var anim=null, dirty=true, userMoved=false;
  function ease(k){ return k<0.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2; }
  function clamp(x){ return x<0?0:x>1?1:x; }
  go=function(s){
    var prev=cur; cur=s; ui(s);
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    pieces.forEach(function(p){ placeAt(p, s===prev+1 ? prev : s); });
    var moving=pieces.filter(function(p){ return p.dest && p.dest.step===s; });
    anim={cf:{t:cam.t.clone(),d:cam.d,th:cam.th,ph:cam.ph}, ct:CAMS[s], t0:performance.now(), dur:reduce?1:2600, fwd:s===prev+1, moving:moving};
    if(!anim.fwd) pieces.forEach(function(p){ placeAt(p,s); });
    userMoved=false; dirty=true;
  };
  function frame(now){
    requestAnimationFrame(frame);
    if(anim){
      var k=Math.min(1,(now-anim.t0)/anim.dur);
      if(anim.fwd){
        var n=anim.moving.length;
        anim.moving.forEach(function(p,i){
          var dly=n>1 ? i/(n-1)*0.45 : 0, q=ease(clamp((k-dly)/0.55));
          var a=p.start, b=new V().fromArray(p.dest.p);
          p.mesh.position.lerpVectors(a,b,q); p.mesh.position.y+=Math.sin(Math.PI*q)*900;
          p.mesh.quaternion.copy(qFlat).slerp(p.dest.q,q);
        });
      }
      if(!userMoved){
        var c=anim.cf,t=anim.ct, ce=ease(clamp(k/0.5));
        cam.t.set(c.t.x+(t.t[0]-c.t.x)*ce, c.t.y+(t.t[1]-c.t.y)*ce, c.t.z+(t.t[2]-c.t.z)*ce);
        cam.d=c.d+(t.d-c.d)*ce; cam.th=c.th+(t.th-c.th)*ce; cam.ph=c.ph+(t.ph-c.ph)*ce;
      }
      if(k>=1){ pieces.forEach(function(p){ placeAt(p,cur); }); anim=null; }
      dirty=true;
    }
    if(dirty){ placeCam(); renderer.render(scene,camera); drawOverlay(); dirty=false; }
  }
  // вращение, масштаб, выбор детали
  var cv=renderer.domElement, drag=null, moved=0, ray=new T.Raycaster(), mouse=new T.Vector2();
  overlay.style.pointerEvents='none';
  cv.addEventListener('pointerdown',function(e){ drag={x:e.clientX,y:e.clientY}; moved=0; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove',function(e){ if(!drag) return; var dx=e.clientX-drag.x, dy=e.clientY-drag.y; moved+=Math.abs(dx)+Math.abs(dy); cam.th-=dx*0.006; cam.ph=Math.max(0.12,Math.min(1.55,cam.ph-dy*0.006)); drag={x:e.clientX,y:e.clientY}; userMoved=true; dirty=true; });
  cv.addEventListener('pointerup',function(e){
    drag=null;
    if(moved>4) return;
    var r=cv.getBoundingClientRect(); mouse.set((e.clientX-r.left)/r.width*2-1, -(e.clientY-r.top)/r.height*2+1);
    ray.setFromCamera(mouse,camera);
    var hit=ray.intersectObjects(pieces.map(function(p){ return p.mesh; }), false)[0];
    if(selected) selected.mesh.material=MATS[selected.code];
    selected=hit ? hit.object.userData.piece : null;
    var info=$('info');
    if(selected){
      selected.mesh.material=SEL;
      var name={'Б':'Боковина','Г':'Горизонталь','Р':'Полка','А':'Боковина антресоли','П':'Стойка','Ц':'Царга','x':'Отход'}[selected.code];
      info.innerHTML='<b>'+(selected.code==='x'?'':selected.lc+' · ')+name+' '+selected.L+'×'+selected.W+'</b><br>откуда: '+selected.src+'<br>куда: '+(selected.dest?selected.dest.d+' (шаг '+selected.dest.step+')':(selected.spare?'запасная полка':'не используется'));
    } else info.textContent='Нажми на деталь, и здесь появится, откуда она и куда встаёт.';
    dirty=true;
  });
  cv.addEventListener('pointercancel',function(){ drag=null; });
  cv.addEventListener('wheel',function(e){ e.preventDefault(); cam.d=Math.max(1500,Math.min(20000,cam.d*(e.deltaY>0?1.1:0.9))); userMoved=true; dirty=true; },{passive:false});
  function bg(){ try{ scene.background=new T.Color(tok('--sheet','#F7F8F6')); }catch(e){ scene.background=new T.Color('#F7F8F6'); } dirty=true; }
  function size(){ var w=wrap.clientWidth||640, h=Math.round(w/1.6); renderer.setSize(w,h); overlay.style.width=w+'px'; overlay.style.height=h+'px'; camera.aspect=w/h; camera.updateProjectionMatrix(); dirty=true; }
  var comp=document.createElement('canvas'); comp.width=720; comp.height=450; var cctx=comp.getContext('2d');
  function snapshots(){
    var pr=renderer.getPixelRatio(), sz=renderer.getSize(new T.Vector2()), keep=cur, kc={t:cam.t.clone(),d:cam.d,th:cam.th,ph:cam.ph}, ksel=selected;
    if(selected){ selected.mesh.material=MATS[selected.code]; selected=null; }
    renderer.setPixelRatio(1); renderer.setSize(720,450,false); camera.aspect=1.6; camera.updateProjectionMatrix();
    for(var s=1;s<=N;s++){ cur=s; applyInstant(s); renderer.render(scene,camera); cctx.clearRect(0,0,720,450); cctx.drawImage(renderer.domElement,0,0); drawLabels(cctx,720,450,1.05,s); try{ imgs[s-1].src=comp.toDataURL('image/jpeg',0.88); }catch(e){} }
    cur=keep; pieces.forEach(function(p){ placeAt(p,keep); }); cam.t.copy(kc.t); cam.d=kc.d; cam.th=kc.th; cam.ph=kc.ph;
    if(ksel){ selected=ksel; selected.mesh.material=SEL; }
    renderer.setPixelRatio(pr); renderer.setSize(sz.x,sz.y,false); camera.aspect=sz.x/sz.y; camera.updateProjectionMatrix(); dirty=true;
  }
  onLbl=function(){ dirty=true; snapshots(); };
  bg(); size(); applyInstant(1); snapshots();
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){ snapshots(); });
  if(window.ResizeObserver) new ResizeObserver(size).observe(wrap); else window.addEventListener('resize',size);
  function retheme(){ bg(); snapshots(); }
  if(window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',retheme);
  new MutationObserver(retheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  requestAnimationFrame(frame);
})();
