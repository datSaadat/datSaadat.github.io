// Shared navigation: every page also works without JavaScript.
const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('#mobile-menu');
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';menu.hidden=open;toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open menu':'Close menu');});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu&&!menu.hidden){closeMenu();toggle.focus();}});
window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
const cite=document.querySelector('.cite-button');
cite?.addEventListener('click',()=>{const panel=document.querySelector('#citation');panel.hidden=!panel.hidden;cite.setAttribute('aria-expanded',String(!panel.hidden));cite.textContent=panel.hidden?'Cite +':'Cite −';});
document.querySelector('#copy-citation')?.addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(document.querySelector('#citation pre').textContent);status.textContent='Copied!';}catch{status.textContent='Select the citation above to copy it.';}});
// Publication search combines with the selected type filter.
const search=document.querySelector('#publication-search');
if(search){let filter='all';const papers=[...document.querySelectorAll('[data-kind]')],buttons=[...document.querySelectorAll('[data-filter]')];
 const update=()=>{const term=search.value.trim().toLocaleLowerCase();let count=0;papers.forEach(p=>{p.hidden=!((filter==='all'||p.dataset.kind===filter)&&p.textContent.toLocaleLowerCase().includes(term));if(!p.hidden)count++;});document.querySelector('#publication-count').textContent=`${count} publication${count===1?'':'s'}`;document.querySelector('#no-results').hidden=count!==0;};
 search.addEventListener('input',update);buttons.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));update();}));}
// Native dialog provides focus trapping, Escape dismissal, and focus return.
const dialog=document.querySelector('#photo-dialog');
if(dialog){document.querySelectorAll('.gallery-open').forEach(b=>b.addEventListener('click',()=>{const original=b.querySelector('img'),full=document.querySelector('#full-photo');full.src=original.src;full.alt=original.alt;document.querySelector('#photo-caption').textContent=original.alt;dialog.showModal();}));document.querySelector('#close-photo').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});}
// Decorative neural field: linked neurons and continuous signals, not a brain simulation.
(()=>{const canvas=document.querySelector('#neural-canvas'),control=document.querySelector('#motion-toggle');if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx){if(control)control.hidden=true;return;}
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,stored=false;
try{const v=localStorage.getItem('saquib-motion');if(v!==null){paused=v==='paused';stored=true;}}catch{}
let width=0,height=0,nodes=[],edges=[],pulses=[],frame=0,last=0,elapsed=0;const pointer={x:-1000,y:-1000};
let seed=1298;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
function setup(){width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);seed=1298;nodes=[];edges=[];pulses=[];
 // Two interwoven hemispheres give the field an organic brain-like silhouette.
 const count=width<700?48:92;for(let i=0;i<count;i++){const side=i%2===0?-1:1,a=random()*Math.PI*2,r=Math.sqrt(random());nodes.push({x:width*.5+side*width*.17+Math.cos(a)*width*.31*r,y:height*.49+Math.sin(a)*height*.43*r,phase:random()*Math.PI*2,flash:0});}
 const seen=new Set();nodes.forEach((a,i)=>{const near=nodes.map((b,j)=>({j,d:Math.hypot(a.x-b.x,a.y-b.y)})).filter(o=>o.j!==i).sort((a,b)=>a.d-b.d).slice(0,3);near.forEach(({j,d})=>{const key=[i,j].sort((a,b)=>a-b).join('-');if(seen.has(key))return;seen.add(key);edges.push({a:i,b:j,d,curve:(random()-.5)*45});});});
 for(let i=0;i<(width<700?9:18);i++)pulses.push({edge:Math.floor(random()*edges.length),t:random(),speed:.14+random()*.12});draw(0);}
function point(edge,t){const a=nodes[edge.a],b=nodes[edge.b],mx=(a.x+b.x)/2+edge.curve,my=(a.y+b.y)/2-edge.curve;return{x:(1-t)*(1-t)*a.x+2*(1-t)*t*mx+t*t*b.x,y:(1-t)*(1-t)*a.y+2*(1-t)*t*my+t*t*b.y};}
function draw(dt){ctx.clearRect(0,0,width,height);elapsed+=dt;
 ctx.lineWidth=.8;edges.forEach(e=>{const a=nodes[e.a],b=nodes[e.b];ctx.strokeStyle='rgba(103,46,54,0.10)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo((a.x+b.x)/2+e.curve,(a.y+b.y)/2-e.curve,b.x,b.y);ctx.stroke();});
 pulses.forEach(p=>{p.t+=dt*p.speed;if(p.t>=1){const end=edges[p.edge].b;nodes[end].flash=1;const options=edges.map((e,i)=>({e,i})).filter(o=>o.e.a===end);p.edge=options.length?options[Math.floor(random()*options.length)].i:Math.floor(random()*edges.length);p.t=0;}
 const pos=point(edges[p.edge],p.t);const glow=ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,10);glow.addColorStop(0,'rgba(162,85,60,.35)');glow.addColorStop(1,'rgba(162,85,60,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(pos.x,pos.y,10,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(103,46,54,.45)';ctx.beginPath();ctx.arc(pos.x,pos.y,1.7,0,Math.PI*2);ctx.fill();});
 nodes.forEach(n=>{n.flash=Math.max(0,n.flash-dt*.7);const near=Math.max(0,1-Math.hypot(n.x-pointer.x,n.y-pointer.y)/140),strength=Math.max(n.flash,near*.65),radius=2+strength*2;ctx.fillStyle=`rgba(103,46,54,${.16+strength*.3})`;ctx.beginPath();ctx.arc(n.x,n.y,radius,0,Math.PI*2);ctx.fill();
 // Short dendrite branches around each cell body.
 ctx.strokeStyle=`rgba(103,46,54,${.09+strength*.17})`;for(let k=0;k<3;k++){const a=n.phase+k*2.094,dx=Math.cos(a),dy=Math.sin(a);ctx.beginPath();ctx.moveTo(n.x+dx*3,n.y+dy*3);ctx.lineTo(n.x+dx*11,n.y+dy*11);ctx.lineTo(n.x+dx*15-dy*4,n.y+dy*15+dx*4);ctx.moveTo(n.x+dx*8,n.y+dy*8);ctx.lineTo(n.x+dx*11+dy*4,n.y+dy*11-dx*4);ctx.stroke();}});}
function animate(now){if(paused||document.hidden){frame=0;return;}const dt=last?Math.min((now-last)/1000,.05):0;last=now;draw(dt);frame=requestAnimationFrame(animate);}
function sync(){cancelAnimationFrame(frame);frame=0;last=0;if(control){control.textContent=paused?'Play neural animation':'Pause neural animation';control.setAttribute('aria-pressed',String(paused));}if(!paused&&!document.hidden)frame=requestAnimationFrame(animate);else draw(0);}
control?.addEventListener('click',()=>{paused=!paused;stored=true;try{localStorage.setItem('saquib-motion',paused?'paused':'playing');}catch{}sync();});reduced.addEventListener('change',()=>{if(!stored){paused=reduced.matches;sync();}});document.addEventListener('visibilitychange',sync);let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{setup();sync();},120);});window.addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;},{passive:true});window.addEventListener('pointerout',e=>{if(!e.relatedTarget){pointer.x=-1000;pointer.y=-1000;}});setup();sync();})();
document.querySelector('#motion-toggle')?.remove();
