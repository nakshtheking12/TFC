window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('loader').classList.add('hide'),700)});

// cursor
const cursor=document.getElementById('cursor');
document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX-12+'px';cursor.style.top=e.clientY-12+'px'});
document.querySelectorAll('a,.btn,.g-item,.p-card').forEach(el=>{
 el.addEventListener('mouseenter',()=>cursor.style.transform='scale(2)'); el.addEventListener('mouseleave',()=>cursor.style.transform='scale(1)');
});

// progress
window.addEventListener('scroll',()=>{
 const sc=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
 document.getElementById('progressBar').style.width=sc+'%';
});

// navbar
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>18));
document.getElementById('hamburger').addEventListener('click',()=>document.getElementById('navLinks').classList.toggle('open'));

// reveal
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.12});
document.querySelectorAll('.reveal,.reveal-delay,.reveal-delay2,.reveal-delay3,.a-card,.p-card,.tl-item').forEach(el=>obs.observe(el));

// count up
function countUp(id,target){let el=document.getElementById(id);let cur=0;let step=Math.ceil(target/50);let int=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(int)}el.textContent=cur+'+'},28)}
const statsObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){countUp('count1',80);countUp('count2',12);countUp('count3',30);countUp('count4',8);statsObs.disconnect()}})},{threshold:0.5});
let sEl=document.querySelector('.hero-stats'); if(sEl) statsObs.observe(sEl);

// magnetic
document.querySelectorAll('.magnetic').forEach(btn=>{
 btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const x=e.clientX-r.left-r.width/2;const y=e.clientY-r.top-r.height/2;btn.style.transform=`translate(${x*0.15}px,${y*0.25}px)`});
 btn.addEventListener('mouseleave',()=>btn.style.transform='translate(0,0)');
});

// BULB SCROLL EFFECT - moves, glows, tilts
const bulbScene=document.getElementById('bulbScene');
const bulbWrap=document.getElementById('bulbWrap');
const bulbGlow=document.getElementById('bulbGlow');
const bulbSvg=document.querySelector('.bulb-svg');
const rays=document.getElementById('rays');
let lastScroll=0;
window.addEventListener('scroll',()=>{
 const sc=window.scrollY;
 const hero=document.getElementById('hero');
 const rect=hero.getBoundingClientRect();
 const progress=Math.min(Math.max(1 - rect.bottom / window.innerHeight,0),1); // 0 to 1 as hero leaves
 // bulb moves up, rotates slightly, glows based on scroll
 if(bulbWrap){
   const moveY = sc * -0.12; // parallax up
   const rotate = sc * 0.03;
   const scale = 1 - progress*0.15;
   bulbWrap.style.transform = `translateY(${moveY}px) rotate(${rotate}deg) scale(${scale})`;
 }
 if(bulbGlow){
   const glowOpacity = Math.min(0.3 + sc/400, 1);
   bulbGlow.classList.toggle('on', sc>80);
   bulbGlow.style.opacity = glowOpacity;
 }
 if(bulbSvg){
   bulbSvg.classList.toggle('on', sc>80);
 }
 // tilt on mouse
});
if(bulbScene){
 bulbScene.addEventListener('mousemove',e=>{
   const r=bulbScene.getBoundingClientRect();
   const x=e.clientX - r.left - r.width/2;
   const y=e.clientY - r.top - r.height/2;
   bulbWrap.style.transform += ` rotateX(${y*-0.05}deg) rotateY(${x*0.05}deg)`;
 });
}

// how we work scroll
const steps=document.querySelectorAll('.step');
const fill=document.getElementById('scrollFill');
window.addEventListener('scroll',()=>{
 const sec=document.getElementById('how'); if(!sec) return;
 const rect=sec.getBoundingClientRect();
 const prog=Math.min(Math.max((-rect.top)/(rect.height - window.innerHeight),0),1);
 if(fill) fill.style.height=(prog*100)+'%';
 steps.forEach((s,i)=>{
   const start=i/steps.length; const end=(i+1)/steps.length;
   if(prog>=start && prog<end) s.classList.add('active'); else s.classList.remove('active');
 });
});

// team filter
document.querySelectorAll('.team-filter button').forEach(b=>{
 b.addEventListener('click',()=>{
   document.querySelectorAll('.team-filter button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
   const f=b.dataset.f; document.querySelectorAll('.t-card').forEach(c=>{c.style.display=(f==='all'||c.dataset.f===f)?'block':'none'});
 });
});

// gallery auto scroll
const gRow=document.getElementById('galleryRow');
let dir=1; let auto=setInterval(()=>{if(!gRow) return; if(gRow.scrollLeft+gRow.clientWidth>=gRow.scrollWidth-2) dir=-1; if(gRow.scrollLeft<=0) dir=1; gRow.scrollLeft+=dir*1.2;},18);
gRow?.addEventListener('mouseenter',()=>clearInterval(auto));
gRow?.addEventListener('mouseleave',()=>{auto=setInterval(()=>{if(gRow.scrollLeft+gRow.clientWidth>=gRow.scrollWidth-2) dir=-1; if(gRow.scrollLeft<=0) dir=1; gRow.scrollLeft+=dir*1.2;},18)});
gRow?.querySelectorAll('.g-item').forEach(item=>{
 item.addEventListener('click',()=>{
   const img=item.querySelector('img').src;
   const m=document.createElement('div'); m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;z-index:9999;padding:30px;cursor:pointer';
   m.innerHTML=`<img src="${img}" style="max-width:90%;max-height:90%;border-radius:20px">`; m.addEventListener('click',()=>m.remove()); document.body.appendChild(m);
 });
});

// form
document.getElementById('joinForm').addEventListener('submit',e=>{
 e.preventDefault(); const btn=e.target.querySelector('button'); btn.textContent='Application Sent! ✓'; btn.style.background='#10B981';
 setTimeout(()=>{btn.textContent='Submit Application →'; btn.style.background=''; e.target.reset();},2600);
});

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const id=a.getAttribute('href'); if(id.length>1){e.preventDefault(); document.querySelector(id)?.scrollIntoView({behavior:'smooth'}); document.getElementById('navLinks').classList.remove('open');}})});
