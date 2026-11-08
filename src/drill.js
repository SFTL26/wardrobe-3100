(function(){
  var STEPS = [
    {t:'Разметить точки', sec:'конфирматы', x:'На наружной пласти боковины провести линию оси: посередине толщины полки, на 8 мм ниже её верхней плоскости (для полки на 320 это 312 от низа). На линии три точки: 50, 250 и 450 мм от передней кромки. Модуль при сборке лежит лицом вниз, поэтому эти точки окажутся на высоте 50, 250 и 450 от пола. Сначала попробовать весь узел на обрезке.'},
    {t:'Прижать и проверить угол', sec:'конфирматы', x:'Боковины и полка стоят на передних кромках на полу, полка между линиями. Ремень (оранжевый) снаружи вокруг обеих боковин на уровне полки, затянуть до плотного прижима: модуль шириной 1550 мм стягивает только он. Чтобы полка не съезжала с линий, под неё по линии кладётся брусок-упор, прижатый к боковине маленькой струбциной у кромки, или полку придерживает помощник. Угольником проверить 90° сверху и снизу. Пока угол не прямой, не сверлить.'},
    {t:'Сверлить ступенчатым сверлом', sec:'конфирматы', x:'Сверло 7×50 в шуруповёрте, режим сверления, быстрая скорость. Начать со средней точки (250). Дрель строго горизонтально и под 90° к боковине: угольник на полу ребром к сверлу, помощник смотрит сбоку. Одним проходом: Ø4,5 в торец полки (~36 мм), Ø7 сквозь боковину (16 мм), зенковка утопить на 1–2 мм. На полпути вынуть и выбросить стружку, в конце не давить.'},
    {t:'Вкрутить конфирмат', sec:'конфирматы', x:'Сразу после сверления: бита HEX4, муфта на средний момент (8–10 из 20), почти до конца, последние пол-оборота ключом 4 мм рукой. Головка вровень с пластью: к ней прижмётся соседний модуль. Ещё раз проверить угол угольником, потом точки 50 и 450, затем другая сторона полки. Перетянешь, резьба в ДСП сорвётся.'},
    {t:'Так нельзя', sec:'конфирматы', x:'Если дрель наклонена или ось ушла от середины толщины, сверло выходит на пласть полки или раскалывает торец. Такой конфирмат не держит. Сверло ведётся по оси 8 мм, дрель держится горизонтально, для контроля рядом ставится угольник. Если резьба сорвалась, сдвинуться на 15–20 мм и сделать новое отверстие.'},
    {t:'Кондуктор МК-20', sec:'полкодержатели', x:'Кондуктор-угольник: голова-упор, носик и 17 закалённых втулок Ø5 с шагом 32. Первая втулка в 37 мм от упора, последняя в 549. Голова упирается в торец детали, носик ставится на риску. Это заменяет самодельный шаблон и сверлит точнее.'},
    {t:'Флажок глубины', sec:'полкодержатели', x:'Отверстие нужно 9 мм. Измерить толщину кондуктора у втулки (t) и поставить флажок из малярного скотча на t + 9 от кончика сверла 5 мм. Сверлить до касания флажком кондуктора.'},
    {t:'Упереть в нижний торец', sec:'полкодержатели', x:'Деталь лежит внутренней пластью вверх. У нижнего торца провести короткую риску в 37 мм от передней кромки. Голову кондуктора прижать к нижнему торцу, носик поставить на риску, прижать струбциной.'},
    {t:'Сверлить нужные втулки', sec:'полкодержатели', x:'Втулки 1–10 попадают ниже полки, их пропускаем. Сверлить через втулки 11–17: это 357…549 мм от низа. Сверло вертикально, до флажка, стружку выдувать.'},
    {t:'Продолжить ряд', sec:'полкодержатели', x:'Дальше торца нет. Кондуктор переворачивается головой вверх, в его первую втулку и в последнее отверстие вставляется упор (полкодержатель или хвостовик сверла 5 мм). Ряд выровнять по риске, сверлить втулки 2–17. Повторять до 1957.'},
    {t:'Второй ряд', sec:'полкодержатели', x:'Риска в 37 мм от задней кромки, голова снова в нижний торец, носик на риску. Сверлить те же втулки и продолжить так же.'},
    {t:'Перегородки с двух сторон', sec:'полкодержатели', x:'Стойки П2 и П3 сверлятся так же, головой в нижний торец стойки. На одной стороне риска в 37 мм от кромок, на другой в 60 мм, иначе отверстия встретятся в толще 16 мм. У П2 первая втулка сразу даёт 357 от пола.'},
    {t:'Проверить', sec:'полкодержатели', x:'Вставить 4 полкодержателя в отверстия на одной высоте спереди и сзади и положить линейку. Она должна лежать без качания.'}
  ];
  var N=STEPS.length, pre='d3d';
  var $=function(id){ return document.getElementById(pre+'-'+id); };
  var board=$('board'), imgs=[];
  STEPS.forEach(function(st,i){
    var li=document.createElement('li');
    var b=document.createElement('button'); b.type='button'; b.className='board-img'; b.setAttribute('aria-label','Показать шаг '+(i+1)+' в 3D');
    var im=document.createElement('img'); im.alt='Шаг '+(i+1)+': '+st.t; im.width=720; im.height=450; b.appendChild(im); imgs.push(im);
    var cap=document.createElement('div'); cap.className='board-cap';
    cap.innerHTML='<div class="board-h"><b>'+(i+1)+'</b><span>'+st.t+'</span><em>'+st.sec+'</em></div><p>'+st.x+'</p>';
    li.appendChild(b); li.appendChild(cap); board.appendChild(li);
    b.addEventListener('click',function(){ go(i+1); document.getElementById(pre).scrollIntoView({behavior:'smooth',block:'start'}); });
  });
  var dots=$('dots');
  for(var d=1; d<=N; d++){ (function(k){ var b=document.createElement('button'); b.type='button'; b.textContent=k; b.setAttribute('role','tab'); b.addEventListener('click',function(){ go(k); }); dots.appendChild(b); })(d); }
  function ui(s){
    var st=STEPS[s-1];
    $('n').textContent='Шаг '+s+' из '+N; $('sec').textContent=st.sec; $('title').textContent=st.t; $('text').textContent=st.x;
    Array.prototype.forEach.call(dots.children,function(b,i){ b.setAttribute('aria-selected', i===s-1?'true':'false'); });
    $('prev').disabled=s===1; $('next').disabled=s===N;
  }
  var cur=1;
  var go=function(s){ cur=s; ui(s); };
  $('prev').addEventListener('click',function(){ go(Math.max(1,cur-1)); });
  $('next').addEventListener('click',function(){ go(Math.min(N,cur+1)); });
  document.getElementById(pre).addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'){ go(Math.min(N,cur+1)); e.preventDefault(); }
    if(e.key==='ArrowLeft'){ go(Math.max(1,cur-1)); e.preventDefault(); }
  });
  ui(1);

  var LBL_KEY='wardrobe-labels';
  var showLbl=(function(){ try{ var v=localStorage.getItem(LBL_KEY); return v===null ? true : v==='1'; }catch(e){ return true; } })();
  var lblBtn=document.getElementById('d3d-lbl');
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
  var scene=new T.Scene(), camera=new T.PerspectiveCamera(35,1.6,1,20000);
  scene.add(new T.HemisphereLight(0xffffff,0x8a938f,0.85));
  var dl=new T.DirectionalLight(0xffffff,0.5); dl.position.set(-800,1500,1200); scene.add(dl);
  var dl2=new T.DirectionalLight(0xffffff,0.25); dl2.position.set(1500,600,-500); scene.add(dl2);

  var MAT={
    ldsp:new T.MeshLambertMaterial({color:0xeef0ee}),
    xray:new T.MeshLambertMaterial({color:0xdfe5e2, transparent:true, opacity:0.32, depthWrite:false}),
    hl:new T.MeshLambertMaterial({color:0x5cc8ad}),
    hlx:new T.MeshLambertMaterial({color:0x5cc8ad, transparent:true, opacity:0.4, depthWrite:false}),
    hole:new T.MeshBasicMaterial({color:0x23292a}),
    steel:new T.MeshLambertMaterial({color:0x8d979b}),
    brass:new T.MeshLambertMaterial({color:0xc9a44a}),
    body:new T.MeshLambertMaterial({color:0x2e3735}),
    accent:new T.MeshLambertMaterial({color:0xe0a21b}),
    tape:new T.MeshLambertMaterial({color:0xf2d36b}),
    red:new T.MeshBasicMaterial({color:0xe03131, transparent:true, opacity:0.45, depthWrite:false}),
    pencil:new T.MeshBasicMaterial({color:0x4a5552}),
    floor:new T.MeshLambertMaterial({color:0xd3d9d5})
  };
  var EDGE=new T.LineBasicMaterial({color:0x33403b});
  var DIM=new T.LineBasicMaterial({color:0xd6336c, depthTest:false});
  var parts=[], groups=[], labels=[];

  function vis(o,s){ if(o.steps) return o.steps.indexOf(s)>=0; return s>=o.appear && s<=o.until; }
  function box(w,h,dp,x,y,z,mat,noEdge){ var g=new T.BoxGeometry(w,h,dp), m=new T.Mesh(g,mat); if(!noEdge) m.add(new T.LineSegments(new T.EdgesGeometry(g),EDGE)); m.position.set(x,y,z); return m; }
  // цилиндр вдоль оси от точки start длиной len (+x или -y)
  function cyl(r,len,axis,mat,r2){
    var g=new T.CylinderGeometry(r2===undefined?r:r2, r, len, 20);
    if(axis==='x'){ g.translate(0,len/2,0); g.rotateZ(-Math.PI/2); }
    else if(axis==='-y'){ g.translate(0,-len/2,0); }
    else { g.translate(0,len/2,0); }
    return new T.Mesh(g,mat);
  }
  function add(parent,mesh,o){
    parent.add(mesh); o=o||{};
    var p={mesh:mesh, base:mesh.material, appear:o.appear||1, until:o.until||99, steps:o.steps, home:mesh.position.clone(),
      off:o.off||null, hl:!!o.hl, xr:o.xr||[], grow:o.grow||null, delay:o.delay||0, win:o.win||1, spin:!!o.spin};
    parts.push(p); return p;
  }
  function grp(o){ var g=new T.Group(); scene.add(g); g.userData=o; groups.push(g); return g; }
  function dim(a,b,off,text,o){
    var A=new V().fromArray(a), B=new V().fromArray(b), O=new V().fromArray(off), A2=A.clone().add(O), B2=B.clone().add(O);
    var tk=O.clone().normalize().multiplyScalar(5);
    var pts=[A,A2.clone().add(tk), B,B2.clone().add(tk), A2,B2];
    var dir=B2.clone().sub(A2).normalize(), n=new V().crossVectors(dir,O).normalize();
    var d45=dir.clone().add(O.clone().normalize()).normalize().multiplyScalar(5);
    pts.push(A2.clone().sub(d45),A2.clone().add(d45),B2.clone().sub(d45),B2.clone().add(d45));
    var g=new T.BufferGeometry().setFromPoints(pts), l=new T.LineSegments(g,DIM); l.renderOrder=10;
    scene.add(l); parts.push({mesh:l, base:null, appear:o.appear||1, until:o.until||o.appear||99, steps:o.steps, home:l.position.clone(), xr:[]});
    labels.push({p:A2.clone().add(B2).multiplyScalar(0.5), text:text, kind:'dim', appear:o.appear, until:o.until||o.appear, steps:o.steps});
  }
  function label(p,text,kind,o){ labels.push({p:new V().fromArray(p), text:text, kind:kind||'note', appear:o.appear, until:o.until||o.appear, steps:o.steps}); }

  var fl=new T.Mesh(new T.PlaneGeometry(6000,6000),MAT.floor); fl.rotation.x=-Math.PI/2; fl.position.y=-60; scene.add(fl);
  var flCon={appear:1,until:5}, flPin={appear:6,until:12};
  function floorFor(s){ fl.position.y = s<=5 ? -40 : -2; }

  // ---------- Узел под конфирмат (шаги 1–5) ----------
  var J=grp({pose:function(){ return {pos:new V(), q:new T.Quaternion()}; }});
  add(J, box(16,240,500,-8,120,0,MAT.ldsp), {appear:1, until:5, xr:[3,4,5], hl:false});
  add(J, box(320,16,500,160,232,0,MAT.ldsp), {appear:2, until:5, xr:[3,4,5], hl:true, off:new V(260,0,0)});
  add(J, box(0.6,1.2,520,-16.4,232,0,MAT.pencil,true), {appear:1, until:2});
  [200,0,-200].forEach(function(z){
    add(J, box(0.6,1.2,24,-16.5,232,z,MAT.pencil,true), {appear:1, until:2});
    add(J, box(0.6,24,1.2,-16.5,232,z,MAT.pencil,true), {appear:1, until:2});
  });
  // ремень вокруг обеих боковин (уходит за край фрагмента к другой боковине)
  var STRAP=new T.MeshLambertMaterial({color:0xd9822b});
  [box(2,25,524,-18,180,0,STRAP,true), box(360,25,2,162,180,263,STRAP,true), box(360,25,2,162,180,-263,STRAP,true)].forEach(function(m){ add(J,m,{appear:2, until:5, off:new V(-120,0,0)}); });
  [box(46,34,16,120,180,-271,MAT.body), box(30,10,18,120,201,-271,MAT.accent)].forEach(function(m){ add(J,m,{appear:2, until:5, off:new V(-120,0,0)}); });
  // брусок-упор по линии полки, прижат к боковине маленькой струбциной 300 мм у задней кромки
  add(J, box(40,30,200,20,209,150,MAT.ldsp), {appear:2, until:5, off:new V(0,0,200)});
  [box(110,12,14,12,209,272,MAT.body), box(10,22,60,-26,209,235,MAT.body), box(10,22,60,48,209,235,MAT.accent), box(6,16,20,-19,209,220,MAT.body), box(6,16,20,43,209,220,MAT.body)].forEach(function(m){ add(J,m,{appear:2, until:5, off:new V(0,0,200)}); });
  // угольник
  add(J, box(3,200,20,1.5,124,258,MAT.steel), {appear:2, until:2, off:new V(0,0,120)});
  add(J, box(200,3,20,100,222.5,258,MAT.steel), {appear:2, until:2, off:new V(0,0,120)});
  // отверстия
  [200,0,-200].forEach(function(z,i){
    var h7=cyl(3.5,16,'x',MAT.hole); h7.position.set(-16,232,z);
    var h4=cyl(2.25,36,'x',MAT.hole); h4.position.set(0,232,z);
    var ap=i===0?3:4;
    add(J,h7,{appear:ap, until:5, grow:i===0?'x':null, delay:0.51, win:0.12});
    add(J,h4,{appear:ap, until:5, grow:i===0?'x':null, delay:0.63, win:0.27});
  });
  // конфирматы
  [200,0,-200].forEach(function(z,i){
    var c=new T.Group(); c.position.set(-16,232,z);
    var head=cyl(5,4,'x',MAT.brass,5); head.position.x=0; c.add(head);
    var sh=cyl(3.5,12,'x',MAT.brass); sh.position.x=4; c.add(sh);
    var th=cyl(3.5,34,'x',MAT.steel); th.position.x=16; c.add(th);
    var slot=box(1,6,1.2,-0.3,0,0,MAT.body,true); c.add(slot);
    add(J,c,{appear:4, until:4, off:i===0?new V(-160,0,0):null, spin:i===0});
  });
  // дрель со ступенчатым сверлом (кончик в начале координат, тело по -x)
  function drillH(mat){
    var g=new T.Group();
    var tip=cyl(2.25,36,'x',mat||MAT.steel); tip.position.x=-36; g.add(tip);
    var st=cyl(3.5,16,'x',mat||MAT.steel); st.position.x=-52; g.add(st);
    var cone=cyl(6,4,'x',mat||MAT.steel,3.5); cone.position.x=-56; g.add(cone);
    var sh=cyl(4,74,'x',mat||MAT.steel); sh.position.x=-130; g.add(sh);
    var ch=cyl(22,60,'x',mat||MAT.body); ch.position.x=-190; g.add(ch);
    g.add(box(150,70,60,-265,0,0,mat||MAT.body,!!mat));
    g.add(box(40,110,44,-280,-80,0,mat||MAT.accent,!!mat));
    return g;
  }
  var DH=grp({pose:function(s){ return {pos:new V(36,232,200), q:new T.Quaternion()}; }, enter:{3:new V(-120,0,0)}, lin:true});
  add(DH, drillH(), {appear:3, until:3});
  var ghostQ=new T.Quaternion().setFromAxisAngle(new V(0,0,1), 0.14);
  var DG=grp({pose:function(){ return {pos:new V(30,226,0), q:ghostQ}; }});
  add(DG, drillH(MAT.red), {appear:5, until:5});

  dim([-16,240,250],[-16,240,200],[0,40,0],'50',{appear:1,until:1});
  dim([-16,240,250],[-16,240,0],[0,80,0],'250',{appear:1,until:1});
  dim([-16,240,250],[-16,240,-200],[0,120,0],'450',{appear:1,until:1});
  dim([-16,240,250],[-16,232,250],[0,0,40],'8',{appear:1,until:1});
  dim([-16,240,-250],[0,240,-250],[0,30,0],'16',{appear:1,until:1});
  label([-16,150,60],'ось = середина полки','note',{appear:1});
  label([60,150,260],'90°','ok',{appear:2});
  label([260,215,275],'ремень вокруг обеих боковин','note',{appear:2});
  label([60,120,330],'брусок-упор + струбцина 300','note',{appear:2});
  dim([-16,232,200],[0,232,200],[0,95,0],'Ø7 · 16',{appear:3,until:3});
  dim([0,232,200],[36,232,200],[0,50,0],'Ø4,5 · 36',{appear:3,until:3});
  label([-16,200,235],'зенковка до упора','note',{appear:3});
  label([-16,205,225],'головка вровень','ok',{appear:4});
  label([40,265,200],'конфирмат 7×50','note',{appear:4});
  label([-200,330,0],'перекос: сверло выйдет на пласть','warn',{appear:5});
  label([40,180,130],'ниже оси: торец лопнет','warn',{appear:5});
  label([-16,285,230],'правильно: по оси, горизонтально','ok',{appear:5});
  dim([-16,240,200],[-16,232,200],[0,0,40],'8',{appear:5,until:5});

  // ---------- Полкодержатели кондуктором МК-20 (шаги 6–13) ----------
  var S=grp({pose:function(){ return {pos:new V(), q:new T.Quaternion()}; }});
  add(S, box(1200,16,500,600,8,0,MAT.ldsp), {appear:6, until:13, xr:[]});
  add(S, box(60,0.6,1.4,30,16.3,213,MAT.pencil,true), {appear:8, until:10});
  add(S, box(60,0.6,1.4,30,16.3,-213,MAT.pencil,true), {appear:11, until:11});
  add(S, box(60,0.6,1.4,30,16.3,190,MAT.pencil,true), {appear:12, until:12});
  var MK={
    yellow:new T.MeshLambertMaterial({color:0xf2c230}),
    black:new T.MeshLambertMaterial({color:0x22282a})
  };
  var flipQ=new T.Quaternion().setFromAxisAngle(new V(1,0,0), Math.PI);
  var JG=grp({arc:120, pose:function(s){
    if(s<=7) return {pos:new V(0,200,213), q:new T.Quaternion()};
    if(s===10) return {pos:new V(512,28,213), q:flipQ};
    if(s===11) return {pos:new V(0,16,-213), q:new T.Quaternion()};
    if(s===12) return {pos:new V(0,16,190), q:new T.Quaternion()};
    return {pos:new V(0,16,213), q:new T.Quaternion()};
  }});
  (function(){
    var jp=function(m){ JG.add(m); parts.push({mesh:m, base:m.material, appear:6, until:12, home:m.position.clone(), xr:[]}); };
    jp(box(22,28,190,-11,-2,0,MK.black));
    jp(box(580,12,30,290,6,0,MK.yellow));
    var br=box(250,12,16,118,6,-60,MK.yellow); br.rotation.y=0.46; jp(br);
    var nose=box(10,12,10,4,6,21,MK.black); nose.rotation.y=Math.PI/4; jp(nose);
    for(var k=0;k<17;k++){ var b=cyl(2.6,12.8,'y',MAT.hole); b.position.set(37+32*k,-0.4,0); jp(b); }
  })();
  function sideHole(x,z,ap,dl){ var h=cyl(2.5,9.3,'-y',MAT.hole); h.position.set(x,16.3,z); add(S,h,{appear:ap, until:13, grow:'y', delay:dl, win:0.16}); }
  var k2;
  for(k2=10;k2<=16;k2++) sideHole(37+32*k2, 213, 9, 0.3+(k2-10)/7*0.5);
  for(k2=1;k2<=16;k2++) sideHole(549+32*k2, 213, 10, 0.45+(k2-1)/16*0.4);
  for(k2=10;k2<=16;k2++) sideHole(37+32*k2, -213, 11, 0.35+(k2-10)/7*0.45);
  for(k2=10;k2<=16;k2++){ var hh=cyl(2.5,9.3,'-y',MAT.hole); hh.position.set(37+32*k2,16.3,190); add(S,hh,{appear:12, until:12, grow:'y', delay:0.35+(k2-10)/7*0.45, win:0.16}); }
  // упор-полкодержатель в последнем отверстии при перестановке
  var pin=cyl(2.5,40,'y',MAT.steel); pin.position.set(549,7,213); add(S,pin,{appear:10, until:10, off:new V(0,90,0), hl:true});
  // проверка
  [213,-213].forEach(function(z){ var p=cyl(2.5,24,'y',MAT.steel); p.position.set(485,7,z); add(S,p,{appear:13, until:13, off:new V(0,60,0)}); add(S,box(10,2,16,485,31,z,MAT.steel,true),{appear:13, until:13, off:new V(0,60,0)}); });
  add(S, box(30,3,520,485,33.5,0,MAT.accent), {appear:13, until:13, off:new V(0,120,0), hl:true});
  // сверло 5 мм
  var DV=grp({enter:{9:new V(0,150,0)}, pose:function(s){ return s===7 ? {pos:new V(357,245,213), q:new T.Quaternion()} : {pos:new V(357,7,213), q:new T.Quaternion()}; }});
  (function(){
    var dv=function(m){ DV.add(m); parts.push({mesh:m, base:m.material, steps:[7,9], home:m.position.clone(), xr:[]}); };
    dv(cyl(2.5,70,'y',MAT.steel));
    dv(box(16,7,1.5,9,21,0,MAT.tape));
    var ch=cyl(20,50,'y',MAT.body); ch.position.y=70; dv(ch);
    dv(box(60,140,70,0,190,0,MAT.body));
    dv(box(44,40,110,0,170,-80,MAT.accent));
  })();

  dim([0,212,250],[37,212,250],[0,0,40],'37',{appear:6,until:6});
  dim([37,212,250],[69,212,250],[0,0,80],'32',{appear:6,until:6});
  dim([0,212,-20],[549,212,-20],[0,0,-90],'17 втулок · до 549',{appear:6,until:6});
  label([-60,280,60],'голова-упор','note',{appear:6});
  label([60,170,330],'носик','note',{appear:6});
  dim([357,245,213],[357,266,213],[-40,0,0],'t + 9',{appear:7,until:7});
  label([470,300,213],'t — толщина кондуктора у втулки','note',{appear:7});
  dim([0,16,260],[37,16,260],[0,0,50],'37 от торца',{appear:8,until:8});
  dim([80,16,250],[80,16,213],[0,40,0],'37 от кромки',{appear:8,until:8});
  label([10,60,213],'носик на риске','ok',{appear:8});
  label([-30,40,40],'голова в нижний торец','note',{appear:8});
  label([450,70,213],'втулки 11–17 = 357…549 от низа','note',{appear:9});
  label([357,50,300],'Ø5 · глубина 9','note',{appear:9});
  dim([549,28,265],[1061,28,265],[0,0,50],'+512 = 16 × 32',{appear:10,until:10});
  label([549,90,213],'упор в последнем отверстии','ok',{appear:10});
  label([800,110,100],'кондуктор перевёрнут головой вверх','note',{appear:10});
  dim([80,16,-250],[80,16,-213],[0,40,0],'37 от задней кромки',{appear:11,until:11});
  dim([80,16,250],[80,16,190],[0,40,0],'60',{appear:12,until:12});
  label([450,70,190],'перегородка, вторая сторона: 60 от кромок','note',{appear:12});
  label([485,70,0],'лежит без качания','ok',{appear:13});
  label([485,40,260],'485 · перед и зад одинаково','note',{appear:13});


  label([-16,90,-120],'Б 2700','code',{appear:1,until:5});
  label([240,232,-160],'Г 1518','code',{appear:2,until:5});
  label([1000,16,-150],'Б 2700 (низ боковины)','code',{steps:[6,7,8,9,10,11,13]});
  label([1000,16,-150],'П2 1776 (низ стойки)','code',{steps:[12]});
  var CAMS={
    1:{t:[-16,210,30],d:1150,th:-1.05,ph:1.2}, 2:{t:[30,200,170],d:720,th:0.7,ph:1.15},
    3:{t:[-30,232,200],d:520,th:-0.45,ph:1.12}, 4:{t:[-8,232,170],d:430,th:-0.8,ph:1.1}, 5:{t:[-40,232,60],d:720,th:-0.35,ph:1.08},
    6:{t:[290,190,140],d:1050,th:0.35,ph:0.85}, 7:{t:[357,265,213],d:560,th:0.7,ph:1.2}, 8:{t:[150,20,160],d:760,th:0.55,ph:0.82},
    9:{t:[330,20,160],d:900,th:0.4,ph:0.78}, 10:{t:[720,30,150],d:1350,th:0.3,ph:0.72}, 11:{t:[330,20,-120],d:950,th:0.4,ph:0.72},
    12:{t:[300,20,190],d:820,th:0.4,ph:0.78}, 13:{t:[485,20,0],d:800,th:1.15,ph:0.95}
  };
  var cam={t:new V(),d:1000,th:0,ph:1};
  function setCam(c){ cam.t.set(c.t[0],c.t[1],c.t[2]); cam.d=c.d; cam.th=c.th; cam.ph=c.ph; }
  function placeCam(){ var sp=Math.sin(cam.ph); camera.position.set(cam.t.x+cam.d*sp*Math.sin(cam.th), cam.t.y+cam.d*Math.cos(cam.ph), cam.t.z+cam.d*sp*Math.cos(cam.th)); camera.lookAt(cam.t); }
  function applyParts(s){
    floorFor(s);
    parts.forEach(function(p){
      p.mesh.visible=vis(p,s);
      if(p.base){
        var x=p.xr.indexOf(s)>=0, h=p.hl&&s===p.appear;
        p.mesh.material = h ? (x?MAT.hlx:MAT.hl) : (x?MAT.xray:p.base);
      }
      p.mesh.position.copy(p.home); p.mesh.scale.set(1,1,1); if(p.spin) p.mesh.rotation.x=0;
    });
  }
  function applyInstant(s){ applyParts(s); groups.forEach(function(g){ var q=g.userData.pose(s); g.position.copy(q.pos); g.quaternion.copy(q.q); }); setCam(CAMS[s]); placeCam(); }

  // подписи поверх 3D
  var octx=overlay.getContext('2d');
  function tok(n,d){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||d; }
  function drawLabels(ctx,w,h,scale){
    var surf=tok('--surface','#fff'), ink=tok('--ink','#1b211e');
    ctx.font='600 '+Math.round(12*scale)+'px "JetBrains Mono", Consolas, monospace';
    ctx.textBaseline='middle';
    labels.forEach(function(l){
      if(!vis(l,cur)) return;
      if(l.kind==='code' && !showLbl) return;
      var v=l.p.clone().project(camera); if(v.z>1) return;
      var x=(v.x+1)/2*w, y=(1-v.y)/2*h, tw=ctx.measureText(l.text).width, px=6*scale, bh=20*scale;
      var col = l.kind==='dim' ? '#d6336c' : l.kind==='warn' ? '#e03131' : l.kind==='ok' ? '#1f9a7e' : l.kind==='code' ? '#1f7a66' : ink;
      x=Math.max(tw/2+px+2, Math.min(w-tw/2-px-2, x)); y=Math.max(bh/2+2, Math.min(h-bh/2-2, y));
      ctx.fillStyle=surf; ctx.globalAlpha=0.92; ctx.beginPath();
      if(ctx.roundRect) ctx.roundRect(x-tw/2-px, y-bh/2, tw+2*px, bh, 3*scale); else ctx.rect(x-tw/2-px, y-bh/2, tw+2*px, bh);
      ctx.fill(); ctx.globalAlpha=1; ctx.strokeStyle=col; ctx.lineWidth=1*scale; ctx.stroke();
      ctx.fillStyle=col; ctx.textAlign='center'; ctx.fillText(l.text, x, y+0.5);
    });
  }
  function drawOverlay(){
    var w=overlay.clientWidth, h=overlay.clientHeight, pr=Math.min(window.devicePixelRatio||1,2);
    if(overlay.width!==Math.round(w*pr)){ overlay.width=Math.round(w*pr); overlay.height=Math.round(h*pr); }
    octx.setTransform(pr,0,0,pr,0,0); octx.clearRect(0,0,w,h); drawLabels(octx,w,h,1);
  }

  var anim=null, dirty=true, userMoved=false;
  function ease(k){ return k<0.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2; }
  function clamp(x){ return x<0?0:x>1?1:x; }
  go=function(s){
    var prev=cur; cur=s; ui(s);
    var from=groups.map(function(g){ return {pos:g.position.clone(), q:g.quaternion.clone()}; });
    applyParts(s);
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var jump=(prev<=5)!==(s<=5);
    anim={from:from, cf:{t:cam.t.clone(),d:cam.d,th:cam.th,ph:cam.ph}, ct:CAMS[s], t0:performance.now(), dur:reduce?1:1800, fwd:s===prev+1, jump:jump};
    if(jump){ setCam(CAMS[s]); }
    userMoved=false; dirty=true;
  };
  function frame(now){
    requestAnimationFrame(frame);
    if(anim){
      var k=Math.min(1,(now-anim.t0)/anim.dur), e=ease(k);
      groups.forEach(function(g,idx){
        var tp=g.userData.pose(cur), fp=anim.from[idx].pos, fq=anim.from[idx].q, en=g.userData.enter&&g.userData.enter[cur];
        if(anim.jump){ fp=tp.pos; fq=tp.q; }
        if(anim.fwd && en){ fp=tp.pos.clone().add(en); fq=tp.q; }
        var ke = en&&anim.fwd ? (g.userData.lin ? clamp(k/0.9) : ease(clamp(k/0.45))) : e;
        g.position.lerpVectors(fp,tp.pos,ke); g.quaternion.copy(fq).slerp(tp.q,ke);
        if(g.userData.arc && (fq.angleTo(tp.q)>0.01 || fp.distanceTo(tp.pos)>50)) g.position.y+=Math.sin(Math.PI*ke)*g.userData.arc;
      });
      parts.forEach(function(p){
        if(!anim.fwd || p.appear!==cur || !p.mesh.visible) return;
        if(p.off) p.mesh.position.copy(p.home).addScaledVector(p.off, 1-ease(clamp(k/0.5)));
        if(p.grow){ var q=clamp((k-p.delay)/p.win); if(p.grow==='x') p.mesh.scale.x=Math.max(0.001,q); else p.mesh.scale.y=Math.max(0.001,q); }
        if(p.spin) p.mesh.rotation.x=(1-e)*30;
      });
      if(!userMoved && !anim.jump){
        var c=anim.cf,t=anim.ct, ce=ease(clamp(k/0.6));
        cam.t.set(c.t.x+(t.t[0]-c.t.x)*ce, c.t.y+(t.t[1]-c.t.y)*ce, c.t.z+(t.t[2]-c.t.z)*ce);
        cam.d=c.d+(t.d-c.d)*ce; cam.th=c.th+(t.th-c.th)*ce; cam.ph=c.ph+(t.ph-c.ph)*ce;
      }
      if(k>=1) anim=null;
      dirty=true;
    }
    if(dirty){ placeCam(); renderer.render(scene,camera); drawOverlay(); dirty=false; }
  }
  var cv=renderer.domElement, drag=null;
  overlay.style.pointerEvents='none';
  cv.addEventListener('pointerdown',function(e){ drag={x:e.clientX,y:e.clientY}; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove',function(e){ if(!drag) return; cam.th-=(e.clientX-drag.x)*0.006; cam.ph=Math.max(0.12,Math.min(1.55,cam.ph-(e.clientY-drag.y)*0.006)); drag={x:e.clientX,y:e.clientY}; userMoved=true; dirty=true; });
  function end(){ drag=null; }
  cv.addEventListener('pointerup',end); cv.addEventListener('pointercancel',end);
  cv.addEventListener('wheel',function(e){ e.preventDefault(); cam.d=Math.max(200,Math.min(4000,cam.d*(e.deltaY>0?1.1:0.9))); userMoved=true; dirty=true; },{passive:false});
  function bg(){ try{ scene.background=new T.Color(tok('--sheet','#F7F8F6')); }catch(e){ scene.background=new T.Color('#F7F8F6'); } dirty=true; }
  function size(){ var w=wrap.clientWidth||640, h=Math.round(w/1.6); renderer.setSize(w,h); overlay.style.width=w+'px'; overlay.style.height=h+'px'; camera.aspect=w/h; camera.updateProjectionMatrix(); dirty=true; }
  var comp=document.createElement('canvas'); comp.width=720; comp.height=450; var cctx=comp.getContext('2d');
  function snapshots(){
    var pr=renderer.getPixelRatio(), sz=renderer.getSize(new T.Vector2()), keep=cur, kc={t:cam.t.clone(),d:cam.d,th:cam.th,ph:cam.ph};
    renderer.setPixelRatio(1); renderer.setSize(720,450,false); camera.aspect=1.6; camera.updateProjectionMatrix();
    for(var s=1;s<=N;s++){ cur=s; applyInstant(s); renderer.render(scene,camera); cctx.clearRect(0,0,720,450); cctx.drawImage(renderer.domElement,0,0); drawLabels(cctx,720,450,1.15); try{ imgs[s-1].src=comp.toDataURL('image/jpeg',0.88); }catch(e){} }
    cur=keep; applyInstant(keep); cam.t.copy(kc.t); cam.d=kc.d; cam.th=kc.th; cam.ph=kc.ph;
    renderer.setPixelRatio(pr); renderer.setSize(sz.x,sz.y,false); camera.aspect=sz.x/sz.y; camera.updateProjectionMatrix(); dirty=true;
  }
  onLbl=function(){ dirty=true; snapshots(); };
  bg(); size(); applyInstant(1); snapshots();
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){ snapshots(); dirty=true; });
  if(window.ResizeObserver) new ResizeObserver(size).observe(wrap); else window.addEventListener('resize',size);
  function retheme(){ bg(); snapshots(); }
  if(window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',retheme);
  new MutationObserver(retheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  requestAnimationFrame(frame);
})();
