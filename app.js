const motion= !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(motion){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
const hero=document.querySelector('.hero'),photo=document.querySelector('.hero-photo');
const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const open=document.querySelector('header').classList.toggle('menu-open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.textContent=open?'×':'☰'});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('header').classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');menu.textContent='☰'}));
const aircraft=[['An-124','OUTSIZE & SUPER-HEAVY','For cargo that challenges conventional dimensions. Project loads, oil & gas equipment and heavy machinery.','Extraordinary dimensions.','Heavy machinery · Project cargo · Oil & gas'],['Il-76','HEAVY & OUTSIZE','Heavy and outsize cargo capacity for regional and medium-haul charter requirements.','Heavy loads. Regional reach.','Outsize cargo · Industrial equipment · Regional charters'],['747-400F','LONG-HAUL & LARGE-VOLUME','Main-deck freighter capacity for long-haul charters and large-volume cargo movements.','Greater volumes. Longer horizons.','Main-deck cargo · Long-haul charters · Large volumes'],['737-800F','REGIONAL & FLEXIBLE','Regional freighter capacity for smaller main-deck loads and focused charter requirements.','Regional routes. Focused capacity.','Regional charters · General cargo · Smaller main-deck loads']];const tabs=[...document.querySelectorAll('[data-aircraft]')];function selectAircraft(i){tabs.forEach((t,j)=>{t.setAttribute('aria-selected',i===j);t.tabIndex=i===j?0:-1});const a=aircraft[i];['aircraft-name','aircraft-category','aircraft-description','aircraft-mission','aircraft-use'].forEach((id,j)=>document.getElementById(id).textContent=a[j]);document.getElementById('aircraft-panel').setAttribute('aria-labelledby',tabs[i].id)}tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectAircraft(i));t.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%4;if(e.key==='ArrowLeft')n=(i+3)%4;if(e.key==='Home')n=0;if(e.key==='End')n=3;if(n!==undefined){e.preventDefault();selectAircraft(n);tabs[n].focus()}})});
const regions=[['GULF COUNTRIES','Cargo charter coordination across the Gulf, supported by our UAE operations.'],['TURKEY','Cargo charter coordination between Turkey and our UAE operations.'],['CHINA','Aircraft capacity and charter coordination for cargo to and from China.'],['AFRICA','Cargo charter coordination across Africa, supported by our UAE operations.'],['CIS COUNTRIES','Cargo charter coordination for the CIS markets we serve.']];const regionBtns=[...document.querySelectorAll('[data-region]')];function selectRegion(i){regionBtns.forEach((b,j)=>{b.classList.toggle('active',j===i);b.setAttribute('aria-pressed',i===j)});document.getElementById('region-label').textContent=regions[i][0];document.getElementById('region-copy').textContent=regions[i][1];document.querySelectorAll('#route-lines path').forEach((p,j)=>p.classList.toggle('active',i===j))}regionBtns.forEach((b,i)=>b.addEventListener('click',()=>selectRegion(i)));selectRegion(0);
const dialog=document.getElementById('request-dialog'),form=document.getElementById('charter-form');let opener;document.querySelectorAll('[data-request]').forEach(b=>b.addEventListener('click',()=>{opener=b;document.getElementById('form-view').hidden=false;document.getElementById('success-view').hidden=true;dialog.showModal();document.body.style.overflow='hidden'}));function close(){if(!motion){dialog.close();return;}const a=dialog.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(14px)'}],{duration:220,easing:'ease-in'});a.onfinish=()=>dialog.close();}dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus()});document.querySelector('.close-dialog').addEventListener('click',close);document.getElementById('finish-demo').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}});const today=new Date();form.elements.date.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);document.getElementById('enquiry-summary').textContent=`${d.get('origin')} → ${d.get('destination')} · ${d.get('cargo')} · ${Number(d.get('weight')).toLocaleString('en-US')} kg · ${d.get('date')}`;document.getElementById('form-view').hidden=true;document.getElementById('success-view').hidden=false;dialog.scrollTop=0;document.getElementById('finish-demo').focus();form.reset()});

const mapPoints=[...document.querySelectorAll('[data-map-region]')];mapPoints.forEach((b,i)=>b.addEventListener('click',()=>{selectRegion(i);updateMap(i)}));regionBtns.forEach((b,i)=>b.addEventListener('click',()=>updateMap(i)));function updateMap(i){document.querySelectorAll("[data-country-region]").forEach(p=>p.classList.toggle("market-active",Number(p.dataset.countryRegion)===i));mapPoints.forEach((b,j)=>{b.classList.toggle('selected',i===j);b.setAttribute('aria-pressed',i===j)});}updateMap(0);
const welcome=document.getElementById('welcome');
let entering=false;
async function enterSite(){
 if(entering)return;entering=true;
 window.scrollTo({top:0,behavior:'instant'});
 if(!motion){welcome.close();document.body.style.overflow='';return;}
 const fadeChildren=[...welcome.children].map(el=>el.animate([{opacity:1},{opacity:0,transform:'translateY(-16px)'}],{duration:360,easing:'ease-in',fill:'forwards'}));
 await Promise.all(fadeChildren.map(a=>a.finished));
 const curtain=welcome.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-100%)',opacity:1}],{duration:1100,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'});
 document.querySelectorAll('.hero-content > *').forEach((el,i)=>el.animate([{opacity:0,transform:'translateY(26px)'},{opacity:1,transform:'translateY(0)'}],{duration:1000,delay:350+i*110,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
 document.querySelector('.hero-plane').animate([{opacity:0,filter:'blur(5px)'},{opacity:1,filter:'blur(0px)'}],{duration:1400,delay:250,easing:'ease-out',fill:'backwards'});
 await curtain.finished;welcome.close();document.body.style.overflow='';document.querySelector('.hero-content button').focus({preventScroll:true});
}
if(!location.hash){welcome.showModal();document.body.style.overflow='hidden';}
document.getElementById('enter-site').addEventListener('click',enterSite);
welcome.addEventListener('cancel',e=>{e.preventDefault();enterSite();});
welcome.addEventListener('close',()=>{document.body.style.overflow='';});
if(motion){
 const seq=document.querySelector('.flight-sequence'),plane=document.querySelector('.hero-plane');let target=0,current=0,raf=0;
 function draw(){current+=(target-current)*.075;const mobile=innerWidth<701;plane.style.transform=`translate3d(${current*(mobile?-35:-100)}px,${current*-95}px,0) rotate(${-current*2}deg)`;hero.style.setProperty('--journey',current);if(Math.abs(target-current)>.0002)raf=requestAnimationFrame(draw);else raf=0;}
 function update(){const r=seq.getBoundingClientRect();target=Math.max(0,Math.min(1,-r.top/Math.max(1,seq.offsetHeight-hero.offsetHeight)));if(!raf)raf=requestAnimationFrame(draw);}
 addEventListener('scroll',update,{passive:true});addEventListener('resize',update,{passive:true});update();
 const sections=document.querySelectorAll('.section');const enter=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('chapter-visible')}),{threshold:.08});sections.forEach(s=>{s.classList.add('chapter');enter.observe(s)});
}

// A shared, restrained motion language for controls and content changes.
const animateIn=(el,dy=10)=>{if(!motion||!el)return;el.animate([{opacity:0,transform:`translateY(${dy}px)`},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.22,1,.36,1)'});};
document.querySelectorAll('details').forEach(detail=>{
 const summary=detail.querySelector('summary'),body=detail.querySelector('.detail-body');let animation=null,wantsOpen=detail.open;
 summary.addEventListener('click',e=>{
  if(!motion)return;
  e.preventDefault();wantsOpen=!wantsOpen;
  const start=detail.getBoundingClientRect().height;
  if(animation){animation.onfinish=null;animation.cancel();animation=null;}
  detail.style.height=`${start}px`;detail.style.overflow='hidden';detail.open=true;
  summary.setAttribute('aria-expanded',String(wantsOpen));detail.classList.toggle('is-collapsing',!wantsOpen);
  const end=summary.getBoundingClientRect().height+(wantsOpen?body.getBoundingClientRect().height:0)+2;
  animation=detail.animate([{height:`${start}px`},{height:`${end}px`}],{duration:360,easing:'cubic-bezier(.25,.1,.25,1)',fill:'forwards'});
  animation.onfinish=()=>{
   detail.open=wantsOpen;detail.style.height='';detail.style.overflow='';detail.classList.remove('is-collapsing');
   animation.cancel();animation=null;
  };
 });
});

tabs.forEach(t=>t.addEventListener('click',()=>animateIn(document.getElementById('aircraft-panel'),12)));
[...regionBtns,...mapPoints].forEach(t=>t.addEventListener('click',()=>animateIn(document.querySelector('.region-info'),8)));
document.querySelectorAll('[data-request]').forEach(b=>b.addEventListener('click',()=>animateIn(dialog,18)));
form.addEventListener('submit',()=>{if(form.checkValidity())animateIn(document.getElementById('success-view'),12)});
document.querySelectorAll('button,.text-button,.nav-cta').forEach(b=>{if(b.matches('[data-map-region]'))return;b.addEventListener('pointerdown',()=>{if(motion)b.animate([{transform:'scale(1)'},{transform:'scale(.975)'},{transform:'scale(1)'}],{duration:270,easing:'ease-out'})});});
// Anchor navigation scrolls to the chapter without interrupting wheel or touch input.
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const hash=a.getAttribute('href'),target=hash==='#'?document.body:document.getElementById(hash.slice(1));if(!target)return;e.preventDefault();
 const offset=document.querySelector('header').getBoundingClientRect().height+20;
 window.scrollTo({top:hash==='#'?0:target.getBoundingClientRect().top+scrollY-offset,behavior:motion?'smooth':'instant'});
 if(hash!=='#')history.replaceState(null,'',hash);else history.replaceState(null,'',location.pathname);
}));

dialog.addEventListener('cancel',e=>{if(motion){e.preventDefault();close();}});
if(motion&&matchMedia('(hover:hover) and (pointer:fine)').matches){
 document.querySelectorAll('.hero .button,.nav-cta,.outline,#enter-site,.closing .round-cta').forEach(b=>{
  b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();const dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2;b.style.setProperty('--mx',`${dx*.055}px`);b.style.setProperty('--my',`${dy*.1}px`);b.style.setProperty('--shine-x',`${(e.clientX-r.left)/r.width*100}%`);b.style.setProperty('--shine-y',`${(e.clientY-r.top)/r.height*100}%`);});
  b.addEventListener('pointerleave',()=>{b.style.setProperty('--mx','0px');b.style.setProperty('--my','0px');b.style.setProperty('--shine-x','50%');b.style.setProperty('--shine-y','0%');});
 });
}

// Country outlines and labelled markers share the same market selection.
document.querySelectorAll("[data-country-region]").forEach(p=>p.addEventListener("click",()=>{const i=Number(p.dataset.countryRegion);selectRegion(i);updateMap(i)}));

const aboutSteps=[['Start with the shipment.','Cargo dimensions, weight, route and timing shape the charter requirement. These details provide the starting point for sourcing suitable aircraft capacity and preparing a quote.'],['Connect the requirement with capacity.','We source and sell capacity on heavy, outsize and main-deck freighters. Full and part charter options, operator capacity and charter costing are brought together around the cargo requirement.'],['Bring the flight services together.','For the flights we manage, we arrange fuel, handling and airport support with service providers. Freight Pro coordinates these requirements as a single UAE counterparty.']];
const aboutTabs=[...document.querySelectorAll('[data-about-step]')];
function setAboutStep(i){aboutTabs.forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1});const p=document.getElementById('about-stage');p.setAttribute('aria-labelledby','about-tab-'+i);p.querySelector('.about-stage-number').textContent='0'+(i+1);p.querySelector('h4').textContent=aboutSteps[i][0];p.querySelector('p').textContent=aboutSteps[i][1];if(!matchMedia('(prefers-reduced-motion: reduce)').matches){p.getAnimations().forEach(a=>a.cancel());p.animate([{opacity:.25,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'})}}
aboutTabs.forEach((b,i)=>{b.addEventListener('click',()=>setAboutStep(i));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%3;if(e.key==='ArrowLeft')n=(i+2)%3;if(e.key==='Home')n=0;if(e.key==='End')n=2;if(n!==undefined){e.preventDefault();setAboutStep(n);aboutTabs[n].focus()}})});
