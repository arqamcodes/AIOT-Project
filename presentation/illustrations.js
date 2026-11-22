/* S-GH illustration kit — flat greenhouse style, matching the website hero */
const K={wood:'#9A4F2B',wood2:'#B9663D',woodD:'#7A3E22',ink:'#1E2A1B',leaf:'#8CC63F',leaf2:'#5E8F2F',leaf3:'#3E6B25',l4:'#7DB043',l5:'#B5DB7A',
  sun:'#F2B33D',red:'#D8453A',teal:'#2A9D8F',pink:'#E0567A',orange:'#EE8A3C',sky:'#DCEBF2',cream:'#FBFCF4',grass:'#8CC63F',soil:'#9C6B43',blue:'#5B8DEF'};
const ZC=['#F2B33D','#3FB6A8','#EE8A3C','#E0567A','#9CCB5A'];
const f=n=>+n.toFixed(1);

function leaf(x,y,rx,ry,rot,c){return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="${c}" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`}
function plant(x,y,s,type,stress){
  const G=stress==='cold'?['#7FA7A8','#9DBFC0','#6E9A9C','#B7D3D3']:stress==='hot'?['#B8A44A','#C9B85A','#A89640','#D6C873']:[K.leaf2,K.l4,K.leaf,K.leaf3];
  let o='';
  if(type===0){o+=`<path d="M${x} ${y} C${x-4*s} ${y-30*s} ${x+6*s} ${y-55*s} ${x} ${y-80*s}" stroke="${K.leaf3}" stroke-width="${3*s}" fill="none"/>`;
    for(let k=0;k<6;k++){const yy=y-10*s-k*12*s;o+=leaf(x+(k%2?11:-11)*s,yy,12*s,5.5*s,k%2?-25:25,G[k%4])}
    if(stress!=='cold')[[x-8*s,y-40*s],[x+9*s,y-55*s],[x-5*s,y-68*s]].forEach(p=>o+=`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${5.5*s}" fill="${K.red}" stroke="${K.ink}" stroke-width="${1.2*s}"/>`)}
  else if(type===1){o+=`<path d="M${x} ${y} V${y-45*s}" stroke="${K.leaf3}" stroke-width="${3*s}"/>`;
    for(let k=0;k<13;k++){const a=k*0.95,r=(6+(k%4)*5)*s;o+=leaf(x+Math.cos(a)*r,y-30*s-Math.sin(a)*r*0.8-(k%3)*5*s,8*s,5*s,k*30,G[k%4])}}
  else if(type===2){for(let k=0;k<9;k++){o+=leaf(x+Math.cos(k*.7)*12*s,y-10*s-Math.abs(Math.sin(k*.7))*11*s,13*s,8*s,k*40,k%2?G[2]:G[3]==='#3E6B25'?K.l5:G[3])}
    o+=leaf(x,y-16*s,9*s,7*s,0,stress?G[3]:'#CDEB95')}
  else{o+=`<path d="M${x} ${y} V${y-60*s} M${x} ${y-30*s} l${-14*s} ${-14*s} M${x} ${y-44*s} l${14*s} ${-14*s}" stroke="${K.leaf3}" stroke-width="${3*s}" fill="none"/>`;
    for(let k=0;k<7;k++){const yy=y-8*s-k*9*s;o+=leaf(x+(k%2?10:-10)*s,yy,10*s,5*s,k%2?-20:20,G[k%4])}
    if(stress!=='cold')[[x-12*s,y-38*s],[x+12*s,y-50*s]].forEach(p=>o+=`<path d="M${f(p[0])} ${f(p[1])} q${5*s} ${2*s} ${2*s} ${14*s} q${-7*s} ${-4*s} ${-2*s} ${-14*s}z" fill="${K.orange}"/>`)}
  return `<g>${o}</g>`;
}
function sensor(x,y,s,c){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M10 0 V-12" stroke="#8B9A80" stroke-width="1.5"/><rect width="22" height="15" rx="3.5" fill="#1E2A1B"/><circle cx="16" cy="7.5" r="3" fill="${c||K.leaf}"/></g>`}
function snow(x,y,s,c){c=c||'#fff';return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${c}" stroke-width="2.2" stroke-linecap="round"><path d="M0 -10V10M-8.7 -5L8.7 5M-8.7 5L8.7 -5"/><path d="M-3 -7L0 -10L3 -7M-3 7L0 10L3 7" fill="none"/></g>`}
function sunI(x,y,r){let o=`<circle cx="${x}" cy="${y}" r="${r*1.9}" fill="${K.sun}" opacity=".18"/><circle cx="${x}" cy="${y}" r="${r}" fill="${K.sun}"/>`;return o}
function moonI(x,y,r,bg,mc){return `<circle cx="${x}" cy="${y}" r="${r}" fill="${mc||'#F4F1E2'}"/><circle cx="${x+r*0.45}" cy="${y-r*0.3}" r="${r*0.9}" fill="${bg||'#1F3050'}"/>`}
function cloudI(x,y,s,label,fill){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 18 a18 18 0 0 1 4 -35 a26 26 0 0 1 48 -6 a20 20 0 0 1 22 41z" fill="${fill||'#fff'}" stroke="${K.ink}" stroke-width="2.2"/>${label?`<text x="2" y="8" text-anchor="middle" font-family="Manrope" font-weight="700" font-size="11" fill="#2F5E1A">${label}</text>`:''}</g>`}
function softCloud(x,y,s){return `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".9"><ellipse cx="0" cy="0" rx="58" ry="17"/><ellipse cx="26" cy="-13" rx="32" ry="19"/><ellipse cx="-20" cy="-8" rx="22" ry="13"/></g>`}
function gatewayI(x,y,s,off){return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="0" width="10" height="120" rx="3" fill="${K.woodD}"/><rect x="-28" y="-40" width="56" height="42" rx="9" fill="#1E2A1B"/><circle cx="-12" cy="-19" r="4" fill="${off?K.sun:K.leaf}"/><circle cx="2" cy="-19" r="4" fill="${K.teal}"/><path d="M14 -40 v-26" stroke="#1E2A1B" stroke-width="4" stroke-linecap="round"/><circle cx="14" cy="-68" r="5" fill="#1E2A1B"/>${off?'':`<g fill="none" stroke="${K.teal}" stroke-width="3" stroke-linecap="round"><path d="M24 -80 q10 12 0 24"/><path d="M30 -88 q18 20 0 40"/></g>`}</g>`}
function envelope(x,y,s,c,txt){return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-22" y="-15" width="44" height="30" rx="5" fill="#fff" stroke="${K.ink}" stroke-width="2"/><path d="M-20 -12 L0 3 L20 -12" fill="none" stroke="${c||K.leaf2}" stroke-width="2.4"/>${txt?`<text x="0" y="33" text-anchor="middle" font-family="Manrope" font-weight="700" font-size="11" fill="${K.ink}">${txt}</text>`:''}</g>`}
function thermo(x,y,s,lvl,c){return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-9" y="-80" width="18" height="86" rx="9" fill="#fff" stroke="${K.ink}" stroke-width="2.5"/><circle cx="0" cy="12" r="15" fill="${c}" stroke="${K.ink}" stroke-width="2.5"/><rect x="-4" y="${f(-74+(1-lvl)*70)}" width="8" height="${f(84-(-74+(1-lvl)*70)-2)}" rx="4" fill="${c}"/>${[0,1,2,3].map(k=>`<path d="M9 ${-66+k*16} h7" stroke="${K.ink}" stroke-width="2"/>`).join('')}</g>`}
function lockI(x,y,s,c){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-9 -4 V-12 a9 9 0 0 1 18 0 V-4" fill="none" stroke="${c||K.ink}" stroke-width="3.5"/><rect x="-14" y="-5" width="28" height="22" rx="5" fill="${c||K.ink}"/><circle cx="0" cy="5" r="3.5" fill="#fff"/></g>`}
function badge(x,y,txt,bg,fg,fs){fs=fs||13;const w=txt.length*fs*0.62+26;return `<g><rect x="${f(x-w/2)}" y="${y-fs}" width="${f(w)}" height="${fs*2}" rx="${fs}" fill="${bg}"/><text x="${x}" y="${y+fs*0.36}" text-anchor="middle" font-family="Manrope" font-weight="700" font-size="${fs}" fill="${fg||'#fff'}">${txt}</text></g>`}
function hills(w,h,dark){return `<path d="M0 ${h*0.62} C${w*0.14} ${h*0.46} ${w*0.27} ${h*0.5} ${w*0.38} ${h*0.6} S${w*0.62} ${h*0.52} ${w*0.75} ${h*0.58} S${w*0.92} ${h*0.48} ${w} ${h*0.55} V${h} H0Z" fill="${dark?'#2C4A3A':'#DDE8C6'}"/><path d="M0 ${h*0.74} C${w*0.18} ${h*0.64} ${w*0.3} ${h*0.68} ${w*0.47} ${h*0.72} S${w*0.78} ${h*0.66} ${w} ${h*0.7} V${h} H0Z" fill="${dark?'#25402F':'#CBDDA3'}"/>`}
function ground(w,y,h){let g=`<rect x="0" y="${y}" width="${w}" height="${h}" fill="${K.grass}"/><rect x="0" y="${y+h*0.45}" width="${w}" height="${h*0.55}" fill="${K.soil}"/>`;for(let x=0;x<w;x+=16)g+=`<path d="M${x} ${y+2} l4 -11 l3 11 l4 -8 l3 8z" fill="#74AE33"/>`;return g}

/* greenhouse: cx, baseY, width, options {night, frost, heat, plants, sensors, alert, heaterBroken, heaterOn, ventLocked, stress} */
function greenhouse(cx,base,w,o){
  o=o||{};const h=w*0.56,L=cx-w/2,R=cx+w/2,eave=base-h*0.6,apex=base-h,lw=Math.max(6,w*0.03);
  const gf=o.night?'#9FC1D8':o.heat?'#FBD8C2':'#E6F5F0',go=o.night?.28:.75;
  let s=`<rect x="${L}" y="${eave}" width="${w}" height="${base-eave}" fill="${gf}" opacity="${go}"/><polygon points="${L-w*0.05},${eave+lw*0.6} ${cx},${apex} ${R+w*0.05},${eave+lw*0.6}" fill="${gf}" opacity="${go}"/>`;
  if(o.heat)s+=`<rect x="${L}" y="${eave}" width="${w}" height="${base-eave}" fill="${K.orange}" opacity=".18"/>`;
  for(let k=1;k<5;k++)s+=`<path d="M${f(L+k*w/5)} ${eave} V${base}" stroke="#fff" stroke-opacity=".7" stroke-width="${lw*0.25}"/>`;
  // trough + plants
  const ty=base-h*0.17,n=o.plants||5;
  for(let k=0;k<n;k++){const px=L+w*0.1+k*(w*0.8/(n-1||1));s+=plant(px,ty,w/560*1.05,k%4,o.stress)}
  s+=`<rect x="${f(L+w*0.03)}" y="${f(ty)}" width="${f(w*0.94)}" height="${f(h*0.1)}" rx="4" fill="${K.wood}" stroke="${K.ink}" stroke-width="2"/><rect x="${f(L+w*0.03)}" y="${f(ty)}" width="${f(w*0.94)}" height="${f(h*0.025)}" fill="${K.wood2}"/>`;
  if(o.sensors)for(let k=0;k<n;k++){const px=L+w*0.1+k*(w*0.8/(n-1||1));s+=sensor(px+w*0.03,ty-h*0.07,w/560*1.1,o.alertZone===k?K.red:o.faultZone===k?K.sun:K.leaf)}
  // heater
  if(o.heaterBroken||o.heaterOn){const hy=base-h*0.05;s+=`<g>${[0,1,2,3,4,5].map(k=>`<rect x="${f(cx-w*0.12+k*w*0.045)}" y="${f(hy-h*0.05)}" width="${f(w*0.03)}" height="${f(h*0.06)}" rx="2" fill="${o.heaterOn?K.orange:'#6B7465'}"/>`).join('')}</g>`;
    if(o.heaterOn)s+=`<ellipse cx="${cx}" cy="${f(hy-h*0.05)}" rx="${f(w*0.28)}" ry="${f(h*0.14)}" fill="#FFB36B" opacity=".35"/>`;
    if(o.heaterBroken)s+=`<path d="M${f(cx-w*0.05)} ${f(hy-h*0.13)} l${f(w*0.1)} ${f(h*0.12)} M${f(cx+w*0.05)} ${f(hy-h*0.13)} l${f(-w*0.1)} ${f(h*0.12)}" stroke="${K.red}" stroke-width="${lw*0.9}" stroke-linecap="round"/>`}
  // frame
  s+=`<g fill="none" stroke="${K.wood2}" stroke-linejoin="round" stroke-linecap="round"><polyline points="${f(L-w*0.05)},${f(eave+lw*0.6)} ${cx},${apex} ${f(R+w*0.05)},${f(eave+lw*0.6)}" stroke-width="${lw*1.3}"/><path d="M${L} ${eave} V${base} M${R} ${eave} V${base}" stroke-width="${lw*1.1}"/><path d="M${cx} ${apex} V${eave}" stroke-width="${lw*0.7}"/><path d="M${L} ${eave} H${R}" stroke-width="${lw*0.7}"/></g>`;
  s+=`<path d="M${f(L-w*0.05)} ${f(eave+lw*0.6)} L${cx} ${apex} L${f(R+w*0.05)} ${f(eave+lw*0.6)}" fill="none" stroke="${K.ink}" stroke-width="${lw*0.35}" stroke-linejoin="round"/>`;
  // vent
  const vx=cx+w*0.2,vy=apex+(eave-apex)*0.42;
  s+=`<rect x="${f(vx-w*0.06)}" y="${f(vy-h*0.025)}" width="${f(w*0.12)}" height="${f(h*0.05)}" fill="#CFE8E1" stroke="${K.woodD}" stroke-width="2.5" transform="rotate(-28 ${f(vx)} ${f(vy)})"/>`;
  if(o.ventLocked)s+=lockI(vx+w*0.02,vy-h*0.13,w/560*1.3,K.red);
  // frost
  if(o.frost){for(let k=0;k<9;k++)s+=snow(L+w*0.08+(k*137%100)/100*w*0.84,eave+h*0.05+(k*71%100)/100*h*0.3,w/560*(0.7+(k%3)*0.25));
    for(let k=0;k<10;k++){const ix=L+w*0.04+k*w*0.1;s+=`<path d="M${f(ix)} ${f(eave+lw*0.4)} l${f(w*0.008)} ${f(h*(0.03+(k%3)*0.02))} l${f(w*0.008)} ${f(-h*(0.03+(k%3)*0.02))}z" fill="#E8F6FF"/>`}
    s+=`<path d="M${L} ${f(eave+h*0.02)} l${f(w*0.06)} ${f(h*0.06)} M${R} ${f(eave+h*0.02)} l${f(-w*0.06)} ${f(h*0.06)}" stroke="#fff" stroke-width="2" opacity=".9"/>`}
  if(o.heat){for(let k=0;k<3;k++){const hx=L+w*(0.3+k*0.2);s+=`<path d="M${f(hx)} ${f(eave-h*0.02)} q${f(w*0.02)} ${f(-h*0.06)} 0 ${f(-h*0.12)} q${f(-w*0.02)} ${f(-h*0.06)} 0 ${f(-h*0.12)}" fill="none" stroke="${K.orange}" stroke-width="${lw*0.5}" stroke-linecap="round" opacity=".8"/>`}}
  if(o.tags)for(let k=0;k<n;k++){const px=L+w*0.1+k*(w*0.8/(n-1||1));s+=`<g transform="translate(${f(px)} ${f(eave+h*0.06)}) rotate(${k%2?3:-3})"><rect x="${f(-w*0.065)}" y="${f(-h*0.035)}" width="${f(w*0.13)}" height="${f(h*0.07)}" rx="3" fill="${ZC[k%5]}" stroke="${K.ink}" stroke-width="1.5"/><text x="0" y="${f(h*0.014)}" text-anchor="middle" font-family="Manrope" font-weight="800" font-size="${f(w*0.026)}" fill="${K.ink}">Z${k+1}</text></g>`}
  if(o.alert)s+=badge(cx,apex-h*0.1,o.alert,o.alertBg||K.red,'#fff',Math.max(11,w*0.03));
  return s;
}
/* small icon set (used in tiles) */
const ICON={
  stopwatch:c=>`<circle cx="60" cy="66" r="38" fill="#fff" stroke="${K.ink}" stroke-width="5"/><rect x="52" y="14" width="16" height="10" rx="3" fill="${K.ink}"/><path d="M60 66 V40" stroke="${c}" stroke-width="6" stroke-linecap="round"/><path d="M60 66 L78 76" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="66" r="5" fill="${K.ink}"/>`,
  box:c=>`<path d="M22 44 L60 26 L98 44 L60 62Z" fill="#E7C49A" stroke="${K.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M22 44 V88 L60 106 V62Z" fill="#D7A774" stroke="${K.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M98 44 V88 L60 106 V62Z" fill="#C8955F" stroke="${K.ink}" stroke-width="4" stroke-linejoin="round"/><circle cx="88" cy="30" r="20" fill="#fff" stroke="${K.ink}" stroke-width="4"/><path d="M88 30 V19 M88 30 L96 35" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
  env:c=>`<rect x="14" y="30" width="92" height="64" rx="10" fill="#fff" stroke="${K.ink}" stroke-width="5"/><path d="M18 36 L60 68 L102 36" fill="none" stroke="${c}" stroke-width="5" stroke-linejoin="round"/>`,
  chip:c=>`<rect x="30" y="30" width="60" height="60" rx="10" fill="${K.ink}"/><rect x="44" y="44" width="32" height="32" rx="5" fill="${c}"/>${[0,1,2,3].map(k=>`<path d="M${40+k*13} 30 v-12 M${40+k*13} 90 v12 M30 ${40+k*13} h-12 M90 ${40+k*13} h12" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`).join('')}`,
  bell:c=>`<path d="M60 18 c-22 0 -32 18 -32 38 v18 l-10 14 h84 l-10 -14 v-18 c0 -20 -10 -38 -32 -38z" fill="#fff" stroke="${K.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M50 94 a10 10 0 0 0 20 0" fill="none" stroke="${K.ink}" stroke-width="5"/><circle cx="90" cy="30" r="16" fill="${c}"/><path d="M83 30 l5 5 l9 -10" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
};
function icon(name,c,size){return `<svg viewBox="0 0 120 120" width="${size}" height="${size}">${ICON[name](c)}</svg>`}
