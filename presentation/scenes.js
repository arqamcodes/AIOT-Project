/* Scene compositions for each slide */
const sky=(w,h,a,b,id)=>{const pa=a.match(/\w\w/g).map(x=>parseInt(x,16)),pb=b.match(/\w\w/g).map(x=>parseInt(x,16)),N=14;let o='';
  for(let k=0;k<N;k++){const t=k/(N-1),c='#'+pa.map((v,j)=>Math.round(v+(pb[j]-v)*t).toString(16).padStart(2,'0')).join('');o+=`<rect y="${(h*k/N).toFixed(1)}" width="${w}" height="${(h/N+1).toFixed(1)}" fill="${c}"/>`}return o};
const T=(x,y,t,o)=>{o=o||{};return `<text x="${x}" y="${y}" text-anchor="${o.a||'middle'}" font-family="Manrope" font-weight="${o.w||700}" font-size="${o.s||16}" fill="${o.c||K.ink}">${t}</text>`};
const arrow=(d,c,dash)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round" ${dash?'stroke-dasharray="10 10"':''} marker-end="url(#ah${c.slice(1)})"/>`;
const ahDef=cs=>`<defs>${cs.map(c=>`<marker id="ah${c.slice(1)}" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="${c}"/></marker>`).join('')}</defs>`;
const stars=(w,h,n)=>{let s='';for(let k=0;k<n;k++)s+=`<circle cx="${(k*97)%w}" cy="${(k*53)%h}" r="${1+(k%3)*0.5}" fill="#fff" opacity="${0.4+(k%4)*0.15}"/>`;return s};
const funnel=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 -34 H40 L10 4 V30 L-10 40 V4z" fill="${c}" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/><circle cx="-18" cy="-46" r="6" fill="${K.red}"/><circle cx="4" cy="-52" r="6" fill="${K.leaf}"/><circle cx="22" cy="-44" r="6" fill="${K.leaf}"/></g>`;
const brainChip=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-46" y="-46" width="92" height="92" rx="16" fill="${K.ink}"/>${[0,1,2,3].map(k=>`<path d="M${-30+k*20} -46 v-12 M${-30+k*20} 46 v12 M-46 ${-30+k*20} h-12 M46 ${-30+k*20} h12" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/>`).join('')}${[[-24,-20],[-24,0],[-24,20],[0,-10],[0,10],[24,-20],[24,0],[24,20]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5.5" fill="${p[0]===0?K.pink:K.leaf}"/>`).join('')}<path d="M-24 -20 L0 -10 L24 -20 M-24 0 L0 -10 L24 0 M-24 20 L0 10 L24 20 M-24 0 L0 10 L24 0" stroke="#5E8F2F" stroke-width="1.6" fill="none"/></g>`;
const fanI=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="30" fill="#fff" stroke="${K.ink}" stroke-width="4"/>${[0,120,240].map(a=>`<ellipse cx="0" cy="-13" rx="7" ry="14" fill="${K.teal}" transform="rotate(${a})"/>`).join('')}<circle r="5" fill="${K.ink}"/></g>`;
const heaterI=(x,y,s,on)=>`<g transform="translate(${x} ${y}) scale(${s})">${[0,1,2,3,4].map(k=>`<rect x="${-34+k*15}" y="-24" width="10" height="48" rx="5" fill="${on?K.orange:'#6B7465'}" stroke="${K.ink}" stroke-width="2.5"/>`).join('')}${on?'<path d="M-24 -34 q6 -8 0 -16 M0 -34 q6 -8 0 -16 M24 -34 q6 -8 0 -16" stroke="#EE8A3C" stroke-width="3.5" fill="none" stroke-linecap="round"/>':''}</g>`;
const dbI=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 -30 V30 a40 13 0 0 0 80 0 V-30" fill="${c}" stroke="${K.ink}" stroke-width="3.5"/><ellipse cx="0" cy="-30" rx="40" ry="13" fill="#fff" stroke="${K.ink}" stroke-width="3.5"/><path d="M-40 0 a40 13 0 0 0 80 0" fill="none" stroke="${K.ink}" stroke-width="3"/></g>`;
const laptopI=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-60" y="-44" width="120" height="78" rx="8" fill="${K.ink}"/><rect x="-52" y="-36" width="104" height="62" rx="4" fill="#fff"/><path d="M-44 12 L-22 -6 L-4 4 L20 -22 L44 -12" fill="none" stroke="${K.leaf2}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="-44" y="-30" width="30" height="8" rx="4" fill="${K.sun}"/><path d="M-78 34 H78 L66 46 H-66z" fill="#C8D3A8" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/></g>`;
const phoneI=(x,y,s,txt)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-34" y="-62" width="68" height="124" rx="12" fill="${K.ink}"/><rect x="-28" y="-52" width="56" height="102" rx="6" fill="#fff"/><rect x="-24" y="-40" width="48" height="26" rx="6" fill="#FBE1DE"/><circle cx="-14" cy="-27" r="5" fill="${K.red}"/><rect x="-4" y="-31" width="22" height="4" rx="2" fill="${K.red}"/><rect x="-4" y="-24" width="16" height="4" rx="2" fill="#E8A29B"/><rect x="-24" y="-6" width="48" height="6" rx="3" fill="#E3E8DA"/><rect x="-24" y="6" width="36" height="6" rx="3" fill="#E3E8DA"/>${txt?T(0,90,txt,{s:15}):''}</g>`;
const sirenI=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-26 20 V-6 a26 26 0 0 1 52 0 V20z" fill="${K.red}" stroke="${K.ink}" stroke-width="3.5"/><rect x="-34" y="20" width="68" height="14" rx="5" fill="${K.ink}"/><path d="M-50 -30 l-14 -10 M50 -30 l14 -10 M0 -44 v-16 M-40 -10 h-16 M40 -10 h16" stroke="${K.red}" stroke-width="5" stroke-linecap="round"/><ellipse cx="-8" cy="-6" rx="6" ry="10" fill="#fff" opacity=".5"/></g>`;
const wrenchI=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s}) rotate(-35)"><rect x="-8" y="-10" width="16" height="80" rx="7" fill="#8B9A80" stroke="${K.ink}" stroke-width="3"/><path d="M-22 -22 a24 24 0 1 0 44 0 l-10 0 l0 14 l-24 0 l0 -14z" fill="#8B9A80" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/></g>`;
const ticketI=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-70 -44 H70 V-14 a14 14 0 0 0 0 28 V44 H-70 V14 a14 14 0 0 0 0 -28z" fill="#FFF6DF" stroke="${K.ink}" stroke-width="3"/>${T(0,-8,'MAINTENANCE',{s:15,c:'#8A5A00'})}${T(0,16,'Z2 · RH sensor',{s:14,w:600,c:'#55624B'})}</g>`;
const flag=(x,y,c,lbl,sub)=>`<g><path d="M${x} ${y} V${y-70}" stroke="#E9F2D2" stroke-width="4"/><path d="M${x} ${y-70} L${x+46} ${y-58} L${x} ${y-46}z" fill="${c}"/><circle cx="${x}" cy="${y}" r="9" fill="${c}" stroke="#1B2A14" stroke-width="3"/>${T(x+8,y+40,lbl,{s:22,c:'#fff',a:'start'})}${T(x+8,y+66,sub,{s:16,w:500,c:'#C2D1B0',a:'start'})}</g>`;

function devSvg(kind){
  const bg='';
  if(kind==='d_sht')return `<rect x="58" y="56" width="104" height="80" rx="14" fill="${K.teal}" stroke="${K.ink}" stroke-width="3"/><rect x="92" y="78" width="36" height="36" rx="6" fill="#fff"/>${[0,1,2,3,4].map(k=>`<rect x="${70+k*18}" y="136" width="6" height="16" fill="#9AA58E"/>`).join('')}${thermo(40,70,0.42,0.6,K.red)}<path d="M180 50 q12 18 0 26 q-12 -8 0 -26z" fill="#5B8DEF" stroke="${K.ink}" stroke-width="2"/>`;
  if(kind==='d_scd')return `<rect x="50" y="50" width="120" height="92" rx="16" fill="${K.pink}" stroke="${K.ink}" stroke-width="3"/><circle cx="110" cy="96" r="28" fill="#fff"/><circle cx="110" cy="96" r="12" fill="${K.pink}"/>${[[36,36,10],[188,40,13],[176,150,9]].map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="#E3E8DA" stroke="${K.ink}" stroke-width="2"/>`).join('')}${T(188,45,'CO₂',{s:10})}`;
  if(kind==='d_soil')return `<path d="M10 150 q100 -40 200 0 V190 H10z" fill="${K.soil}"/><path d="M10 150 q100 -40 200 0" fill="none" stroke="${K.ink}" stroke-width="2"/><path d="M96 26 h28 v104 l-14 20 l-14 -20z" fill="${K.wood2}" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/><path d="M102 50 h16 M102 66 h16 M102 82 h16" stroke="#fff" stroke-width="3" opacity=".7"/>${plant(160,138,0.55,1)}${[0,1,2].map(k=>`<path d="M${40+k*14} ${160+k*6} q4 6 0 10 q-4 -4 0 -10z" fill="#5B8DEF"/>`).join('')}`;
  if(kind==='d_lux')return `${sunI(110,58,20)}<rect x="60" y="96" width="100" height="70" rx="14" fill="${K.sun}" stroke="${K.ink}" stroke-width="3"/><circle cx="110" cy="131" r="16" fill="#fff"/>${[-60,-30,0,30,60].map(a=>`<path d="M110 58 l0 -36" stroke="${K.sun}" stroke-width="4" stroke-linecap="round" transform="rotate(${a} 110 58)"/>`).join('')}`;
  if(kind==='d_esp')return `<rect x="36" y="50" width="148" height="96" rx="10" fill="${K.ink}"/><rect x="58" y="70" width="70" height="56" rx="6" fill="#56614C"/><path d="M140 64 h28 v14 h-18 v14 h18 v14 h-28" stroke="${K.leaf}" stroke-width="3" fill="none"/>${[0,1,2,3,4,5,6,7].map(k=>`<rect x="${44+k*17}" y="146" width="6" height="14" fill="#9AA58E"/>`).join('')}<g fill="none" stroke="${K.teal}" stroke-width="4" stroke-linecap="round"><path d="M176 40 q10 -10 20 0"/><path d="M170 30 q16 -18 32 0"/></g>`;
}

const SC={
title:()=>sky(900,632,'#CFE3EE','#EEF4E4','sk1')+sunI(120,110,34)+softCloud(300,90,1)+softCloud(620,150,.8)+hills(900,632)+
  `<g stroke="${K.ink}" stroke-width="3" fill="none" stroke-linecap="round"><path d="M220 60 q10 -10 20 0 q10 -10 20 0"/><path d="M270 92 q7 -7 14 0 q7 -7 14 0"/></g>`+
  greenhouse(420,540,580,{plants:5,sensors:1,tags:1})+gatewayI(810,420,1.05)+cloudI(800,130,1.35,'CLOUD')+
  `<path d="M825 345 C850 270 840 200 810 160" fill="none" stroke="${K.teal}" stroke-width="3.5" stroke-dasharray="8 9"/>`+
  envelope(620,250,.75,ZC[0])+envelope(700,300,.75,ZC[3])+envelope(836,250,.65,K.teal)+ground(900,540,92),
night:()=>sky(540,340,'#1C2B47','#33506E','sk2')+stars(540,170,38)+moonI(470,62,22)+hills(540,340,true)+
  greenhouse(230,300,320,{night:1,frost:1,heaterBroken:1,plants:3,stress:'cold'})+thermo(460,250,1.05,0.12,'#5B8DEF')+
  badge(90,48,'2:00 AM','#fff','#1C2B47',16)+`<rect y="300" width="540" height="40" fill="#2E4A33"/>`,
heat:()=>sky(540,340,'#FDEBC8','#F7F2E4','sk3')+sunI(470,72,32)+hills(540,340)+
  greenhouse(230,300,320,{heat:1,ventLocked:1,plants:3,stress:'hot'})+thermo(460,250,1.05,0.96,K.red)+
  badge(90,48,'10:30 AM','#fff',K.ink,16)+ground(540,300,40),
offline:()=>sky(540,340,'#E3EEF3','#F3F6EC','sk4')+hills(540,340)+gatewayI(110,200,1.15)+cloudI(420,100,1.7,'CLOUD')+
  `<path d="M135 115 C220 40 300 60 360 95" fill="none" stroke="${K.red}" stroke-width="4" stroke-dasharray="8 10"/>`+
  `<g stroke="${K.red}" stroke-width="7" stroke-linecap="round"><path d="M232 52 l26 26 M258 52 l-26 26"/></g>`+
  `<g transform="translate(300 182) scale(.95)">${ICON.box(K.teal)}</g>`+envelope(230,246,.6,K.teal)+envelope(262,226,.6,ZC[0])+envelope(250,268,.6,ZC[3])+
  T(357,318,'24 h buffer',{s:16})+ground(540,320,20),
mqtt:()=>{let s=sky(1080,700,'#EAF3F2','#F6F8F0','sk5')+ahDef([K.leaf2,K.teal]);
  for(let i=0;i<5;i++){const y=140+i*118;s+=greenhouse(110,y,130,{plants:2,stress:null})+badge(110,y+20,'Zone '+(i+1),ZC[i],K.ink,12);
    s+=`<path d="M180 ${y-36} C330 ${y-36} 360 330 470 340" fill="none" stroke="#C8D3A8" stroke-width="3" stroke-dasharray="6 8"/>`+envelope(300+((i*37)%60),y-36+(340-y+36)*0.45,.62,ZC[i])}
  s+=gatewayI(540,380,1.5)+T(540,620,'Edge gateway',{s:22})+T(540,646,'Mosquitto · AI · 24 h buffer',{s:16,w:500,c:'#55624B'});
  s+=`<path d="M590 270 C700 160 780 170 860 200" fill="none" stroke="${K.teal}" stroke-width="4" stroke-dasharray="10 9"/>`+lockI(720,190,1.5,K.ink)+T(720,240,'TLS 1.2+',{s:18});
  s+=cloudI(900,220,2.4,'CLOUD');
  s+=`<g transform="translate(370 560)"><rect x="-150" y="-30" width="300" height="60" rx="30" fill="#fff" stroke="#C8D3A8" stroke-width="2"/>${envelope(-110,0,.6,K.leaf2)}<path d="M-96 0 l6 6 l12 -12" stroke="${K.leaf2}" stroke-width="3" fill="none"/>${T(20,6,'QoS 1 · every message acked',{s:16})}</g>`;
  return s},
flow:()=>{let s=sky(1744,250,'#F7F9F2','#F7F9F2','sk6')+ahDef([K.leaf2]);
  const items=[[150,'106 B','one message'],[520,'2,880','per node / day'],[890,'14,400','5 nodes / day'],[1260,'432,000','per month'],[1600,'1.53 MB','payload / day']];
  items.forEach((it,k)=>{const n=k===0?1:k===1?3:k===2?5:k===3?7:4;for(let j=0;j<n;j++)s+=envelope(it[0]-((n-1)*10)+j*20,80-j*4,.9,ZC[j%5]);
    s+=T(it[0],168,it[1],{s:40,w:500})+T(it[0],204,it[2],{s:19,w:500,c:'#55624B'});
    if(k<4)s+=arrow(`M${it[0]+110} 90 H${items[k+1][0]-110}`,K.leaf2)+T((it[0]+items[k+1][0])/2,76,['× 2,880','× 5','× 30','× 106 B'][k],{s:18,c:K.leaf2})});
  return s},
buffer:()=>sky(520,330,'#EEF5EA','#F8FAF3','sk7')+`<g transform="translate(150 80) scale(1.6)">${ICON.chip(K.leaf)}</g>`+T(246,290,'1 MB flash · 2,880 × 20 B',{s:18})+
  envelope(400,90,.8,ZC[0])+envelope(430,140,.8,ZC[1])+envelope(395,190,.8,ZC[3])+`<g transform="translate(330 40) scale(.55)">${ICON.stopwatch(K.teal)}</g>`+T(420,40,'24 h',{s:22,c:K.teal}),
thr:()=>{const W=1744,H=600,L=70,R=30,Tp=90,B=70;const X=h=>L+(h/72)*(W-L-R),Y=v=>Tp+(1-v/36)*(H-Tp-B);
  const sm=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};const base=h=>{const k=sm((h-40)/10);return (25-10*k)+(7-2*k)*Math.sin(2*Math.PI*((h%24)-9)/24)};
  const act=h=>{let v=base(h);if(h>=50&&h<=58)v-=Math.min(4.4,(h-50)*1.8)*(h>55?Math.max(0,1-(h-55)/3):1);return v};
  let s=`<rect width="${W}" height="${H}" fill="#FBFCF7"/>`;
  for(let d=0;d<3;d++){[[d*24,d*24+6],[d*24+18,d*24+24]].forEach(([a,b])=>s+=`<rect x="${X(a)}" y="${Tp}" width="${X(b)-X(a)}" height="${H-Tp-B}" fill="#E6ECF5"/>`);
    s+=sunI(X(d*24+12),48,16)+moonI(X(d*24+3),48,13,'#FBFCF7','#8FA6C9')+T(X(d*24+12),H-26,`Day ${d+1} · ${d<2?'Summer':'Autumn'}`,{s:20,w:600,c:'#55624B'})}
  let up='',dn='';for(let h=0;h<=72;h+=0.5)up+=(h?'L':'M')+X(h)+' '+Y(base(h)+2.5);for(let h=72;h>=0;h-=0.5)dn+='L'+X(h)+' '+Y(base(h)-2.5);
  s+=`<path d="${up+dn}Z" fill="${K.leaf}" opacity=".3"/>`;
  [0,10,20,30].forEach(v=>s+=`<path d="M${L} ${Y(v)} H${W-R}" stroke="#E9EEDD" stroke-width="2"/>`+T(L-12,Y(v)+6,v+'°',{s:18,a:'end',c:'#8A9680'}));
  let p='';for(let h=0;h<=72;h+=0.25)p+=(h?'L':'M')+X(h).toFixed(1)+' '+Y(act(h)).toFixed(1);
  s+=`<path d="${p}" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linejoin="round"/>`;
  s+=`<circle cx="${X(55)}" cy="${Y(act(55))}" r="16" fill="${K.red}" stroke="#fff" stroke-width="5"/>`+T(X(55)+150,Y(act(55))+8,'heater failure → alert',{s:20,c:K.red});
  s+=`<g transform="translate(${X(49)-260} ${Y(act(49))+10})"><circle r="22" fill="${K.leaf2}"/><path d="M-10 0 l7 7 l13 -14" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>`+T(X(49)-230,Y(act(49))+18,'leaves the normal band',{s:19,c:K.leaf2,a:'start'});
  s+=`<g transform="translate(${W-380} 76)"><rect width="350" height="80" rx="14" fill="#fff" stroke="#E2E7D6" stroke-width="2"/><path d="M20 26 H60" stroke="${K.ink}" stroke-width="4"/>${T(72,32,'zone temperature',{s:16,a:'start',w:600})}<rect x="20" y="48" width="40" height="14" rx="4" fill="${K.leaf}" opacity=".45"/>${T(72,60,'learned normal band',{s:16,a:'start',w:600})}</g>`;
  return s},
m_z:()=>sky(540,280,'#F3F7EA','#FFFFFF','sk8')+`<path d="M60 220 C160 220 190 60 270 60 C350 60 380 220 480 220" fill="${K.leaf}" opacity=".25" stroke="${K.leaf2}" stroke-width="4"/><path d="M60 220 H480" stroke="${K.ink}" stroke-width="3"/>${[150,390].map(x=>`<path d="M${x} 230 V70" stroke="${K.teal}" stroke-width="3" stroke-dasharray="8 8"/>`).join('')}${T(150,256,'−3σ',{s:18,c:K.teal})}${T(390,256,'+3σ',{s:18,c:K.teal})}<circle cx="455" cy="200" r="12" fill="${K.red}"/>${T(455,176,'spike',{s:16,c:K.red})}`,
m_if:()=>sky(540,280,'#F3F7EA','#FFFFFF','sk9')+[[110,1],[200,.85],[290,1.05]].map(([x,s])=>`<g transform="translate(${x} 230) scale(${s})"><rect x="-8" y="-30" width="16" height="30" fill="${K.wood}"/><path d="M0 -150 L50 -80 H25 L60 -30 H-60 L-25 -80 H-50z" fill="${K.leaf2}" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/></g>`).join('')+
  `<path d="M0 232 H540" stroke="${K.ink}" stroke-width="3"/><circle cx="440" cy="150" r="18" fill="${K.red}" stroke="${K.ink}" stroke-width="3"/><path d="M440 132 q4 -10 12 -12" stroke="${K.leaf3}" stroke-width="4" fill="none"/>`+T(440,200,'isolated fast',{s:16,c:K.red}),
m_cloud:()=>sky(540,280,'#F3F7EA','#FFFFFF','sk14')+ahDef([K.teal,K.pink])+cloudI(170,120,2.3,'')+T(172,132,'History',{s:18,c:'#17675E'})+dbI(170,215,.6,'#D8F0EC')+brainChip(420,140,.75)+T(420,226,'edge model',{s:16,c:'#55624B'})+`<path d="M260 80 C320 30 380 40 410 82" fill="none" stroke="${K.pink}" stroke-width="4" stroke-dasharray="10 9" marker-end="url(#ahE0567A)"/>`+T(335,34,'weekly retrain',{s:16,c:K.pink})+`<path d="M372 170 C330 200 290 200 256 175" fill="none" stroke="${K.teal}" stroke-width="4" marker-end="url(#ah2A9D8F)"/>`+T(318,226,'new data',{s:16,c:'#17675E'}),
m_ae:()=>{let s=sky(540,280,'#F3F7EA','#FFFFFF','sk10');const cols=[[110,5],[190,3],[270,2],[350,3],[430,5]];
  cols.forEach(([x,n],ci)=>{for(let k=0;k<n;k++){const y=140+(k-(n-1)/2)*36;if(ci<4){const nx=cols[ci+1];for(let j=0;j<nx[1];j++)s+=`<path d="M${x} ${y} L${nx[0]} ${140+(j-(nx[1]-1)/2)*36}" stroke="#D8E3C3" stroke-width="2"/>`}}});
  cols.forEach(([x,n],ci)=>{for(let k=0;k<n;k++)s+=`<circle cx="${x}" cy="${140+(k-(n-1)/2)*36}" r="13" fill="${ci===2?K.pink:K.leaf}" stroke="${K.ink}" stroke-width="2.5"/>`});
  return s+T(110,250,'sensors in',{s:16,c:'#55624B'})+T(270,250,'squeeze',{s:16,c:K.pink})+T(430,250,'rebuild',{s:16,c:'#55624B'})},
broken:()=>sky(860,420,'#FFF7E6','#FFFDF6','sk11')+`<g transform="translate(250 200)"><rect x="-130" y="-100" width="260" height="190" rx="24" fill="${K.teal}" stroke="${K.ink}" stroke-width="4"/><rect x="-90" y="-66" width="180" height="96" rx="12" fill="#1E2A1B"/>${T(0,2,'0 %',{s:56,c:K.sun,w:600})}<path d="M40 -100 l-20 40 l26 20 l-30 46" stroke="#fff" stroke-width="5" fill="none" stroke-linejoin="round"/>${T(0,64,'RH sensor stuck',{s:20,c:'#fff'})}</g>`+
  wrenchI(470,110,1.4)+ticketI(640,250,1.25)+`<g transform="translate(640 110)"><circle r="46" fill="#FCEFD2" stroke="${K.sun}" stroke-width="5"/>${T(0,-4,'NO',{s:20,c:'#8A5A00'})}${T(0,20,'ALARM',{s:16,c:'#8A5A00'})}</g>`,
emergency:()=>sky(860,420,'#1C2B47','#33506E','sk12')+stars(860,150,40)+moonI(800,60,22)+
  greenhouse(300,380,400,{night:1,frost:1,plants:3,stress:'cold',heaterBroken:1})+`<rect y="380" width="860" height="40" fill="#2E4A33"/>`+
  thermo(600,280,1.15,0.15,'#5B8DEF')+`<path d="M640 150 V250" stroke="#8FC3FF" stroke-width="6" marker-end="url(#ahD8453A)"/>`+ahDef([K.red,K.leaf])+
  `<path d="M710 120 q14 22 0 32 q-14 -10 0 -32z" fill="#8FC3FF" stroke="#fff" stroke-width="2"/><path d="M710 250 V170" stroke="${K.leaf}" stroke-width="6" marker-end="url(#ah8CC63F)"/>`+T(710,280,'RH ↑',{s:18,c:'#fff'})+T(660,320,'witness',{s:15,w:600,c:'#C2D1B0'})+sirenI(780,330,1),
arch:()=>{let s=`<rect width="1744" height="640" fill="#FBFCF7"/>`+ahDef([K.leaf2,K.teal,K.red,K.pink]);
  s+=`<rect x="24" y="24" width="1010" height="592" rx="30" fill="#F1F6E8" stroke="#C8D3A8" stroke-width="3" stroke-dasharray="12 10"/>`+T(529,70,'EDGE · inside the greenhouse',{s:22,c:K.leaf2});
  s+=`<rect x="1080" y="24" width="640" height="592" rx="30" fill="#EAF4F1" stroke="#A9D6CE" stroke-width="3" stroke-dasharray="12 10"/>`+T(1400,70,'CLOUD · history & learning',{s:22,c:'#17675E'});
  s+=greenhouse(170,330,230,{plants:3,sensors:1})+T(170,372,'Sensors',{s:22})+T(170,398,'5 zones × 5',{s:16,w:500,c:'#55624B'});
  s+=arrow('M300 260 H370',K.leaf2)+funnel(440,250,1.3,K.sun)+T(440,340,'Stage 5 clean',{s:22})+T(440,366,'quarantine faults',{s:16,w:500,c:'#55624B'});
  s+=arrow('M520 260 H590',K.leaf2)+brainChip(670,250,1.1)+T(670,350,'Edge AI',{s:22})+T(670,376,'rules + autoencoder',{s:16,w:500,c:'#55624B'});
  s+=arrow('M670 400 V450',K.red)+fanI(610,520,1.1)+heaterI(730,520,1.1,true)+T(670,590,'Act in < 15 s',{s:20,c:K.red});
  s+=arrow('M760 250 H830',K.leaf2)+`<g transform="translate(875 200) scale(1.05)">${ICON.box(K.teal)}</g>`+T(938,350,'24 h buffer',{s:20});
  s+=gatewayI(960,470,.9);
  s+=arrow('M1000 250 C1060 240 1100 240 1150 250',K.teal)+lockI(1060,226,1.2,K.ink);
  s+=cloudI(1260,250,2.4,'')+T(1262,262,'Broker',{s:20});
  s+=arrow('M1330 250 H1420',K.teal)+dbI(1490,250,1.3,'#D8F0EC')+T(1490,340,'TimescaleDB',{s:20});
  s+=arrow('M1490 350 V390',K.teal)+laptopI(1400,470,1.1)+T(1400,560,'Dashboards',{s:20})+phoneI(1620,470,.95,'')+T(1620,560,'Alerts',{s:20});
  s+=`<path d="M1490 180 C1490 110 900 100 690 170" fill="none" stroke="${K.pink}" stroke-width="4" stroke-dasharray="10 10" marker-end="url(#ahE0567A)"/>`+T(1100,96,'weekly retrain → OTA model update',{s:18,c:K.pink});
  return s},
result:()=>sky(1100,740,'#1C2B47','#3A5A78','sk13')+stars(1100,240,60)+moonI(1000,80,30)+hills(1100,740,true)+
  greenhouse(470,650,760,{night:1,plants:5,sensors:1,tags:1,alertZone:2,heaterOn:1,alert:'Z3 heater failed → backup heater ON',alertBg:K.leaf2})+`<rect y="650" width="1100" height="90" fill="#2E4A33"/>`+
  gatewayI(950,560,1.2)+`<g transform="translate(980 300)"><rect x="-90" y="-62" width="180" height="96" rx="18" fill="#fff"/>${T(0,-26,'⚠ Z3 frost risk',{s:17,c:K.red})}${T(0,0,'auto-fixed in 6 s',{s:15,w:600,c:'#55624B'})}<path d="M-20 34 l20 22 l20 -22" fill="#fff"/></g>`+
  `<g transform="translate(150 82)"><rect x="-100" y="-50" width="200" height="100" rx="18" fill="#FCEFD2"/>${T(0,-12,'Z2 RH sensor',{s:16,c:'#8A5A00'})}${T(0,16,'FILTERED · no alarm',{s:16,c:'#8A5A00'})}</g>`,
go:()=>`<g transform="translate(280 215)"><circle r="168" fill="none" stroke="#B9E27A" stroke-width="7" stroke-dasharray="14 12"/><path d="M0 -120 L100 -80 V10 C100 80 50 120 0 140 C-50 120 -100 80 -100 10 V-80z" fill="#2F5E1A" stroke="#B9E27A" stroke-width="6"/><path d="M-40 10 l28 28 l56 -64" stroke="#B9E27A" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${T(0,-150,'',{})}</g>`+`<text x="280" y="434" text-anchor="middle" font-family="Manrope" font-weight="700" font-size="34" letter-spacing="5" fill="#B9E27A">S-GH</text>`,
road:()=>{let s=`<path d="M40 120 C300 40 520 160 760 100 S1220 60 1480 110 S1700 120 1720 100" fill="none" stroke="#3E5E2E" stroke-width="26" stroke-linecap="round"/><path d="M40 120 C300 40 520 160 760 100 S1220 60 1480 110 S1700 120 1720 100" fill="none" stroke="#B9E27A" stroke-width="3" stroke-dasharray="14 14"/>`;
  [[90,110,'G0 Simulation','all scenarios pass'],[460,108,'G1 Shadow','14 days, AE silent'],[820,96,'G2 Pilot','1 zone · recall ≥ 0.95'],[1180,82,'G3 Scale','5 zones · 0 gaps'],[1540,112,'G4 Operate','uptime ≥ 99 %']].forEach((g,i)=>s+=flag(g[0],g[1]-20,['#C2D1B0','#F2B33D','#2A9D8F','#E0567A','#B9E27A'][i],g[2],g[3]));
  return s},
};
['d_sht','d_scd','d_soil','d_lux','d_esp'].forEach(k=>SC[k]=()=>devSvg(k));

document.querySelectorAll('svg[data-scene]').forEach(el=>{const fn=SC[el.dataset.scene];if(fn)el.innerHTML=fn();else el.innerHTML='<text x="20" y="40">missing '+el.dataset.scene+'</text>'});
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon,el.dataset.c,+(el.dataset.s||110))});
