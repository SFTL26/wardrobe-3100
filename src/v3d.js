(function(){
  var STEPS = [
    {t:'Боковины на ребро', sec:'этап 6', x:'Постелить картон на площади примерно 3 × 2 м. Две боковины М1 поставить на передние кромки, пластями «ВНУТРЬ» друг к другу, на расстоянии около 1518 мм. Модуль собирается лёжа лицом вниз, задом кверху.'},
    {t:'Крышка', sec:'этап 6', x:'Крышку 1518 вставить вровень с верхними торцами и передними кромками. Прижать струбцинами, проверить угольник. Сверлить насквозь через боковину в торец и вкрутить по 3 конфирмата с каждой стороны (50, 250, 450 мм от переда).'},
    {t:'Полка на 2112', sec:'этап 6', x:'Полку поставить по линиям 2096–2112 на боковинах, 3 + 3 конфирмата.'},
    {t:'Полка на 320', sec:'этап 6', x:'Полку поставить по линиям 304–320, 3 + 3 конфирмата. Пока полки длинные и провисают, под середину подложить обрезок.'},
    {t:'Средняя стойка', sec:'этап 6', x:'Стойку П2 (1776) поставить между полками 320 и 2112 точно по центру: 751 мм от каждой боковины. Через полку 2112 сверху 3 конфирмата в её торец, через полку 320 снизу ещё 3. Нижняя стойка П1 пока не стоит, поэтому снизу место свободно.'},
    {t:'Нижняя и верхняя стойки', sec:'этап 6', x:'П3 (572) поставить между полкой 2112 и крышкой по той же оси. Сверху через крышку 3 конфирмата, низ закрепить двумя уголками 20×20. П1 (304) вставить под полку 320 по оси, её держат полка и нижняя царга.'},
    {t:'Царги', sec:'этап 6', x:'Проверить диагонали: около 3113 мм, разница не больше 2 мм. Царги 1550×100 положить на задние кромки: одну вровень с верхом (2600–2700), другую на 220–320. Конфирматы сзади: по 2 в каждую боковину, 2 в стойку, 2 в кромку полки.'},
    {t:'М1 в нишу', sec:'этап 8.1', x:'Вдвоём поднять модуль, он весит около 75 кг. Задвинуть к левой стене, царгами к задней стене. Выставить по уровню клиньями под торцами боковин и стойки П1.'},
    {t:'М2 и стяжка', sec:'этап 8.1', x:'М2 собрать так же, поставить вплотную к М1, передние кромки и верх заподлицо. Стянуть 8 саморезами 4×25: 4 из М1 у переда, 4 из М2 у зада, на высотах 150, 1000, 1700 и 2400. Общая ширина 3100.'},
    {t:'Антресоль', sec:'этап 7', x:'Две боковины 400, дно и крыша 1518, по центру перегородка П4 368. Боковины на 12 конфирматах, перегородка на 3 сверху и 3 снизу. Диагональ около 1601 мм. Собрать 2 короба.'},
    {t:'Антресоли наверх', sec:'этап 8.2', x:'Вдвоём со стремянок поставить короба на крышки модулей, перегородка антресоли над стойкой модуля. Изнутри модуля прикрутить снизу через крышку 6 саморезами 4×25. Короба стянуть между собой 4 саморезами.'},
    {t:'Крепление к стенам', sec:'этап 9', x:'Главное крепление через царги к задней стене: в каждую стойку каркаса по 2 самореза 6×90. Дополнительно крайние боковины к боковым стенам: 4 точки внизу и 1 в антресоли, в стойку или в ОСП. В каждый зазор ставится проставка.'},
    {t:'Штанги и полки', sec:'этап 10', x:'Штанги: секция 1 на 2000, секция 2 на 1950 и 1100, центр в 250 мм от переда. Полки секций 3–4 на 677, 1029, 1381 и 1733, в верхней зоне всех секций на 2405.'},
    {t:'Готово', sec:'этап 11', x:'Приёмка: шкаф не качается, фасадная плоскость ровная, ничего не выступает за передние кромки. Мастеру по дверям передать глубину 516 мм по царгам.'}
  ];
  var N = STEPS.length;
  var board = document.getElementById('board');
  var imgs = [];
  STEPS.forEach(function(st, i){
    var li = document.createElement('li');
    var b = document.createElement('button'); b.type='button'; b.className='board-img'; b.setAttribute('aria-label','Показать шаг '+(i+1)+' в 3D');
    var im = document.createElement('img'); im.alt = 'Шаг '+(i+1)+': '+st.t; im.width=720; im.height=450;
    b.appendChild(im); imgs.push(im);
    var cap = document.createElement('div'); cap.className='board-cap';
    cap.innerHTML = '<div class="board-h"><b>'+(i+1)+'</b><span>'+st.t+'</span><em>'+st.sec+'</em></div><p>'+st.x+'</p>';
    li.appendChild(b); li.appendChild(cap); board.appendChild(li);
    b.addEventListener('click', function(){ go(i+1); document.getElementById('v3d').scrollIntoView({behavior:'smooth', block:'start'}); });
  });
  var elN=document.getElementById('v3d-n'), elSec=document.getElementById('v3d-sec'), elT=document.getElementById('v3d-title'), elX=document.getElementById('v3d-text');
  var dots=document.getElementById('v3d-dots');
  for(var d=1; d<=N; d++){ (function(k){ var b=document.createElement('button'); b.type='button'; b.textContent=k; b.setAttribute('role','tab'); b.addEventListener('click', function(){ go(k); }); dots.appendChild(b); })(d); }
  function ui(s){
    var st=STEPS[s-1];
    elN.textContent='Шаг '+s+' из '+N; elSec.textContent=st.sec; elT.textContent=st.t; elX.textContent=st.x;
    Array.prototype.forEach.call(dots.children, function(b,i){ b.setAttribute('aria-selected', i===s-1 ? 'true':'false'); });
    document.getElementById('v3d-prev').disabled = s===1;
    document.getElementById('v3d-next').disabled = s===N;
  }
  var cur = 1;
  var go = function(s){ cur=s; ui(s); };
  document.getElementById('v3d-prev').addEventListener('click', function(){ go(Math.max(1, cur-1)); });
  document.getElementById('v3d-next').addEventListener('click', function(){ go(Math.min(N, cur+1)); });
  document.getElementById('v3d').addEventListener('keydown', function(e){
    if(e.key==='ArrowRight'){ go(Math.min(N,cur+1)); e.preventDefault(); }
    if(e.key==='ArrowLeft'){ go(Math.max(1,cur-1)); e.preventDefault(); }
  });
  ui(1);

  var LBL_KEY='wardrobe-labels';
  var showLbl=(function(){ try{ var v=localStorage.getItem(LBL_KEY); return v===null ? true : v==='1'; }catch(e){ return true; } })();
  var lblBtn=document.getElementById('v3d-lbl');
  function lblUi(){ lblBtn.textContent='Обозначения: '+(showLbl?'вкл':'выкл'); lblBtn.setAttribute('aria-pressed', showLbl?'true':'false'); }
  lblUi();
  lblBtn.addEventListener('click', function(){
    showLbl=!showLbl; try{ localStorage.setItem(LBL_KEY, showLbl?'1':'0'); }catch(e){}
    window.dispatchEvent(new CustomEvent('wardrobe-labels', {detail:showLbl}));
  });
  var onLbl=null;
  window.addEventListener('wardrobe-labels', function(e){ showLbl=e.detail; lblUi(); if(onLbl) onLbl(); });

  function fail(){ document.getElementById('v3d-fallback').hidden=false; document.getElementById('v3d').classList.add('no3d'); }
  if(!window.THREE){ fail(); return; }
  var T = window.THREE, V = T.Vector3;
  var wrap = document.getElementById('v3d-canvas');
  var renderer;
  try { renderer = new T.WebGLRenderer({antialias:true, preserveDrawingBuffer:true}); } catch(e){ fail(); return; }
  if(!renderer || !renderer.getContext()){ fail(); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  wrap.appendChild(renderer.domElement);
  var overlay=document.createElement('canvas'); overlay.className='d3d-overlay'; overlay.style.pointerEvents='none'; wrap.appendChild(overlay); var octx=overlay.getContext('2d');
  var scene = new T.Scene();
  var camera = new T.PerspectiveCamera(35, 1.6, 10, 80000);
  scene.add(new T.HemisphereLight(0xffffff, 0x8a938f, 0.85));
  var dl = new T.DirectionalLight(0xffffff, 0.5); dl.position.set(3000,6000,5000); scene.add(dl);
  var dl2 = new T.DirectionalLight(0xffffff, 0.25); dl2.position.set(-5000,2500,1500); scene.add(dl2);

  var MAT = {
    ldsp: new T.MeshLambertMaterial({color:0xeef0ee}),
    hl: new T.MeshLambertMaterial({color:0x5cc8ad}),
    rod: new T.MeshLambertMaterial({color:0xa9b2b6}),
    conf: new T.MeshBasicMaterial({color:0x0d6b59}),
    screw: new T.MeshBasicMaterial({color:0xe0a21b}),
    corner: new T.MeshLambertMaterial({color:0x8d979b}),
    wall: new T.MeshLambertMaterial({color:0xaeb8b3, transparent:true, opacity:0.22, depthWrite:false}),
    stud: new T.MeshLambertMaterial({color:0xc9a46a, transparent:true, opacity:0.55, depthWrite:false}),
    floor: new T.MeshLambertMaterial({color:0xcfd6d1})
  };
  var EDGE = new T.LineBasicMaterial({color:0x33403b});
  var parts = [];
  function box(w,h,dp,x,y,z,mat,noEdge){
    var g = new T.BoxGeometry(w,h,dp), m = new T.Mesh(g, mat);
    if(!noEdge) m.add(new T.LineSegments(new T.EdgesGeometry(g), EDGE));
    m.position.set(x,y,z); return m;
  }
  function dot(r,x,y,z,mat){ var m=new T.Mesh(new T.SphereGeometry(r,14,10), mat); m.position.set(x,y,z); return m; }
  function add(group, mesh, appear, o){
    o=o||{}; group.add(mesh);
    parts.push({mesh:mesh, base:mesh.material, appear:appear, until:(o.until||99), home:mesh.position.clone(), off:(o.off||new V()), hl:o.hl!==false, code:o.code||null});
  }

  var env = new T.Group(); scene.add(env);
  var fl = new T.Mesh(new T.PlaneGeometry(12000,12000), MAT.floor); fl.rotation.x=-Math.PI/2; fl.position.y=-2; env.add(fl);
  env.add(box(100,3300,780,-1603,1650,122,MAT.wall,true));
  env.add(box(100,3300,780,1603,1650,122,MAT.wall,true));
  env.add(box(3306,3300,100,0,1650,-318,MAT.wall,true));
  var fx = new T.Group(); scene.add(fx);
  [-1500,-900,-300,300,900,1500].forEach(function(x){ add(fx, box(50,3300,80,x,1650,-318,MAT.stud,true), 12, {until:12, hl:false}); });

  var MW=1550, OW=751, I=new T.Quaternion();
  var lyingQ = new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(new V(0,0,-1), new V(1,0,0), new V(0,-1,0)));
  var groups = [];
  function P(x,y,z,q){ return {pos:new V(x,y,z), q:q||I}; }
  var secX = [-(OW/2+8), (OW/2+8)];

  for(var i=0;i<2;i++){
    var g = new T.Group(); scene.add(g); groups.push(g);
    var first = i===0;
    var st = function(n){ return first ? n : 9; };
    var of = function(v){ return first ? v : new V(); };
    var up = new V(0,0,-800);
    add(g, box(16,2700,500,-MW/2+8,1350,0,MAT.ldsp), st(1), {off:of(new V(-300,0,-800)), code:'Б 2700'});
    add(g, box(16,2700,500, MW/2-8,1350,0,MAT.ldsp), st(1), {off:of(new V(300,0,-800)), code:'Б 2700'});
    add(g, box(1518,16,500,0,2692,0,MAT.ldsp), st(2), {off:of(up), code:'Г 1518'});
    add(g, box(1518,16,500,0,2104,0,MAT.ldsp), st(3), {off:of(up), code:'Г 1518'});
    add(g, box(1518,16,500,0,312,0,MAT.ldsp), st(4), {off:of(up), code:'Г 1518'});
    add(g, box(16,1776,500,0,1208,0,MAT.ldsp), st(5), {off:of(up), code:'П2 1776'});
    add(g, box(16,572,500,0,2398,0,MAT.ldsp), st(6), {off:of(up), code:'П3 572'});
    add(g, box(16,304,500,0,152,0,MAT.ldsp), st(6), {off:of(up), code:'П1 304'});
    add(g, box(1550,100,16,0,2650,-258,MAT.ldsp), st(7), {off:of(up), code:'Ц 1550'});
    add(g, box(1550,100,16,0,270,-258,MAT.ldsp), st(7), {off:of(up), code:'Ц 1550'});
    if(first){
      var cf = function(x,y,z,step,rotAxis){ var c=new T.Mesh(new T.CylinderGeometry(12,12,6,14), MAT.conf); if(rotAxis==='x') c.rotation.z=Math.PI/2; if(rotAxis==='z') c.rotation.x=Math.PI/2; c.position.set(x,y,z); add(g,c,step,{until:step, hl:false}); };
      [[2700,2],[2112,3],[320,4]].forEach(function(a){ [-1,1].forEach(function(sx){ [200,0,-200].forEach(function(z){ cf(sx*(MW/2+3), a[0]-8, z, a[1], 'x'); }); }); });
      [200,0,-200].forEach(function(z){ cf(0, 2115, z, 5); cf(0, 301, z, 5); cf(0, 2703, z, 6); });
      [-1,1].forEach(function(sx){ add(g, box(20,20,20, sx*18, 2122, 100, MAT.corner), 6, {until:6, hl:false}); });
      [[-767,[2630,2670]],[767,[2630,2670]],[0,[2630,2670]],[-475,[2692]],[475,[2692]],
       [-767,[250,290]],[767,[250,290]],[0,[250,290]],[-475,[312]],[475,[312]]].forEach(function(a){
        a[1].forEach(function(y){ cf(a[0], y, -269, 7, 'z'); });
      });
    }
    var fill = new V(0,0,800);
    secX.forEach(function(cx, k){
      add(g, box(749,16,500,cx,2416,0,MAT.ldsp), 13, {off:fill, code:'Р 749'});
      if(i===1) [677,1029,1381,1733].forEach(function(h){ add(g, box(749,16,500,cx,h+11,0,MAT.ldsp), 13, {off:fill, code:'Р 749'}); });
      var rods = i===0 ? (k===0?[2000]:[1950,1100]) : [];
      rods.forEach(function(h){
        var r=new T.Mesh(new T.CylinderGeometry(10,10,745,20), MAT.rod); r.rotation.z=Math.PI/2; r.scale.set(1.5,1,0.75); r.position.set(cx,h,0);
        add(g, r, 13, {off:fill});
      });
    });
    g.userData = first
      ? {appear:1, enter:new V(), pose:function(s){ return s<=7 ? P(-1350,252,1550,lyingQ) : P(-775,0,0); }}
      : {appear:9, enter:new V(0,0,1800), pose:function(){ return P(775,0,0); }};
  }
  for(var j=0;j<2;j++){
    var a = new T.Group(); scene.add(a); groups.push(a);
    var f = j===0, aap = f?10:11;
    var ao = function(v){ return f ? v : new V(); };
    add(a, box(16,400,500,-MW/2+8,200,0,MAT.ldsp), aap, {off:ao(new V(-300,0,0)), code:'А 400'});
    add(a, box(16,400,500, MW/2-8,200,0,MAT.ldsp), aap, {off:ao(new V(300,0,0)), code:'А 400'});
    add(a, box(1518,16,500,0,8,0,MAT.ldsp), aap, {off:ao(new V(0,0,700)), code:'Г 1518'});
    add(a, box(1518,16,500,0,392,0,MAT.ldsp), aap, {off:ao(new V(0,500,0)), code:'Г 1518'});
    add(a, box(16,368,500,0,200,0,MAT.ldsp), aap, {off:ao(new V(0,700,0)), code:'П4 368'});
    a.userData = f
      ? {appear:10, enter:new V(), pose:function(s){ return s<=10 ? P(-775,0,1300) : P(-775,2700,0); }}
      : {appear:11, enter:new V(0,800,0), pose:function(){ return P(775,2700,0); }};
  }
  [150,1000,1700,2400].forEach(function(y){ [170,-170].forEach(function(z){ add(fx, dot(30, 0, y, z, MAT.screw), 9, {until:9, hl:false}); }); });
  [-775,775].forEach(function(cx){ [-500,0,500].forEach(function(dx){ [170,-170].forEach(function(z){ add(fx, dot(30, cx+dx+(dx===0?40:0), 2700, z, MAT.screw), 11, {until:11, hl:false}); }); }); });
  [-1500,-900,-300,300,900,1500].forEach(function(x){ [2630,2670,250,290].forEach(function(y){ add(fx, dot(24, x, y, -268, MAT.screw), 12, {until:12, hl:false}); }); });
  [-1,1].forEach(function(sx){ [150,1000,1700,2450,2900].forEach(function(y){ add(fx, dot(40, sx*1553, y, 0, MAT.screw), 12, {until:12, hl:false}); }); });

  var L = {t:[0,270,1550],d:4300,th:0.55,ph:0.85};
  var CAMS = {
    1:L, 2:L, 3:L, 4:L, 5:L, 6:L, 7:{t:[0,270,1550],d:4100,th:0.3,ph:0.55},
    8:{t:[-500,1400,500],d:6800,th:0.5,ph:1.2}, 9:{t:[0,1450,0],d:6600,th:0.45,ph:1.25},
    10:{t:[-775,260,1300],d:3300,th:0.6,ph:0.95}, 11:{t:[0,2300,300],d:6200,th:0.4,ph:1.02},
    12:{t:[0,1550,0],d:6600,th:-2.6,ph:1.2}, 13:{t:[0,1550,0],d:5800,th:0.12,ph:1.4}, 14:{t:[0,1550,0],d:6200,th:-0.45,ph:1.3}
  };
  var cam = {t:new V(), d:5000, th:0, ph:1};
  function setCam(c){ cam.t.set(c.t[0],c.t[1],c.t[2]); cam.d=c.d; cam.th=c.th; cam.ph=c.ph; }
  function placeCam(){
    var sp=Math.sin(cam.ph);
    camera.position.set(cam.t.x+cam.d*sp*Math.sin(cam.th), cam.t.y+cam.d*Math.cos(cam.ph), cam.t.z+cam.d*sp*Math.cos(cam.th));
    camera.lookAt(cam.t);
  }
  function wallsFor(s){ env.children.forEach(function(m,idx){ if(idx===3) m.visible = s!==12; }); }
  function applyParts(s){
    wallsFor(s);
    parts.forEach(function(p){
      p.mesh.visible = s>=p.appear && s<=p.until;
      p.mesh.material = (p.hl && s===p.appear) ? MAT.hl : p.base;
      p.mesh.position.copy(p.home);
    });
  }
  function applyInstant(s){
    applyParts(s);
    groups.forEach(function(g){ var q=g.userData.pose(s); g.position.copy(q.pos); g.quaternion.copy(q.q); });
    setCam(CAMS[s]); placeCam();
  }

  var _wp=new V();
  function tok(n,d){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||d; }
  function drawLabels(ctx,w,h,scale){
    if(!showLbl) return;
    var surf=tok('--surface','#fff'), ink=tok('--ink','#1b211e');
    ctx.font='600 '+Math.round(10*scale)+'px "JetBrains Mono", Consolas, monospace'; ctx.textBaseline='middle'; ctx.textAlign='center';
    parts.forEach(function(p){
      if(!p.code || !p.mesh.visible) return;
      p.mesh.getWorldPosition(_wp); var v=_wp.project(camera); if(v.z>1) return;
      var x=(v.x+1)/2*w, y=(1-v.y)/2*h; if(x<0||x>w||y<0||y>h) return;
      var tw=ctx.measureText(p.code).width, px=4*scale, bh=15*scale, col=(p.appear===cur)?'#1f7a66':ink;
      ctx.fillStyle=surf; ctx.globalAlpha=0.88; ctx.beginPath();
      if(ctx.roundRect) ctx.roundRect(x-tw/2-px,y-bh/2,tw+2*px,bh,3*scale); else ctx.rect(x-tw/2-px,y-bh/2,tw+2*px,bh);
      ctx.fill(); ctx.globalAlpha=1; ctx.strokeStyle=col; ctx.lineWidth=scale; ctx.stroke(); ctx.fillStyle=col; ctx.fillText(p.code,x,y+0.5);
    });
  }
  function drawOverlay(){
    var w=overlay.clientWidth, h=overlay.clientHeight, pr=Math.min(window.devicePixelRatio||1,2);
    if(overlay.width!==Math.round(w*pr)){ overlay.width=Math.round(w*pr); overlay.height=Math.round(h*pr); }
    octx.setTransform(pr,0,0,pr,0,0); octx.clearRect(0,0,w,h); drawLabels(octx,w,h,1);
  }
  var anim=null, dirty=true, userMoved=false;
  function ease(k){ return k<0.5 ? 4*k*k*k : 1-Math.pow(-2*k+2,3)/2; }
  go = function(s){
    var prev=cur; cur=s; ui(s);
    var from = groups.map(function(g){ return {pos:g.position.clone(), q:g.quaternion.clone()}; });
    applyParts(s);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    anim = {from:from, cf:{t:cam.t.clone(), d:cam.d, th:cam.th, ph:cam.ph}, ct:CAMS[s], t0:performance.now(), dur:reduce?1:1100, fwd:s>prev};
    userMoved=false; dirty=true;
  };
  window.__v3dGo = go;
  function frame(now){
    requestAnimationFrame(frame);
    if(anim){
      var k=Math.min(1,(now-anim.t0)/anim.dur), e=ease(k);
      groups.forEach(function(g,idx){
        var tp=g.userData.pose(cur), fp=anim.from[idx].pos, fq=anim.from[idx].q;
        if(anim.fwd && g.userData.appear===cur){ fp=tp.pos.clone().add(g.userData.enter); fq=tp.q; }
        g.position.lerpVectors(fp, tp.pos, e);
        g.quaternion.copy(fq).slerp(tp.q, e);
        if(fq.angleTo(tp.q)>0.01) g.position.y += Math.sin(Math.PI*e)*700;
      });
      parts.forEach(function(p){
        if(anim.fwd && p.appear===cur && p.mesh.visible) p.mesh.position.copy(p.home).addScaledVector(p.off, 1-e);
      });
      if(!userMoved){
        var c=anim.cf, t=anim.ct;
        cam.t.set(c.t.x+(t.t[0]-c.t.x)*e, c.t.y+(t.t[1]-c.t.y)*e, c.t.z+(t.t[2]-c.t.z)*e);
        cam.d=c.d+(t.d-c.d)*e; cam.th=c.th+(t.th-c.th)*e; cam.ph=c.ph+(t.ph-c.ph)*e;
      }
      if(k>=1) anim=null;
      dirty=true;
    }
    if(dirty){ placeCam(); renderer.render(scene,camera); drawOverlay(); dirty=false; }
  }
  var cv = renderer.domElement, drag=null;
  cv.addEventListener('pointerdown', function(e){ drag={x:e.clientX,y:e.clientY}; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', function(e){
    if(!drag) return;
    cam.th -= (e.clientX-drag.x)*0.006; cam.ph = Math.max(0.12, Math.min(1.55, cam.ph-(e.clientY-drag.y)*0.006));
    drag={x:e.clientX,y:e.clientY}; userMoved=true; dirty=true;
  });
  function end(){ drag=null; }
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  cv.addEventListener('wheel', function(e){ e.preventDefault(); cam.d=Math.max(1200, Math.min(16000, cam.d*(e.deltaY>0?1.1:0.9))); userMoved=true; dirty=true; }, {passive:false});
  function bg(){
    var c=getComputedStyle(document.documentElement).getPropertyValue('--sheet').trim()||'#F7F8F6';
    try{ scene.background=new T.Color(c); }catch(e){ scene.background=new T.Color('#F7F8F6'); }
    dirty=true;
  }
  function size(){ var w=wrap.clientWidth||640, h=Math.round(w/1.6); renderer.setSize(w,h); overlay.style.width=w+'px'; overlay.style.height=h+'px'; camera.aspect=w/h; camera.updateProjectionMatrix(); dirty=true; }
  function snapshots(){
    var pr=renderer.getPixelRatio(), sz=renderer.getSize(new T.Vector2()), keep=cur, kc={t:cam.t.clone(),d:cam.d,th:cam.th,ph:cam.ph};
    renderer.setPixelRatio(1); renderer.setSize(720,450,false); camera.aspect=1.6; camera.updateProjectionMatrix();
    var comp=document.createElement('canvas'); comp.width=720; comp.height=450; var cctx=comp.getContext('2d');
    for(var s=1;s<=N;s++){ cur=s; applyInstant(s); renderer.render(scene,camera); cctx.clearRect(0,0,720,450); cctx.drawImage(renderer.domElement,0,0); drawLabels(cctx,720,450,1); try{ imgs[s-1].src=comp.toDataURL('image/jpeg',0.88); }catch(e){} }
    cur=keep; applyInstant(keep); cam.t.copy(kc.t); cam.d=kc.d; cam.th=kc.th; cam.ph=kc.ph;
    renderer.setPixelRatio(pr); renderer.setSize(sz.x,sz.y,false); camera.aspect=sz.x/sz.y; camera.updateProjectionMatrix(); dirty=true;
  }
  onLbl=function(){ dirty=true; snapshots(); };
  bg(); size(); applyInstant(1); snapshots();
  if(window.ResizeObserver) new ResizeObserver(size).observe(wrap); else window.addEventListener('resize', size);
  function retheme(){ bg(); snapshots(); }
  if(window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', retheme);
  new MutationObserver(retheme).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
  requestAnimationFrame(frame);
})();
