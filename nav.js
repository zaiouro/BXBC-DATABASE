document.title="CHARACTERS";
document.addEventListener("DOMContentLoaded",()=>{
const nav=document.getElementById("global-nav");
if(!nav)return;
const dead=[{name:"HOLLY CALLAHAN",url:"bonabi.html"},{name:"JOSHUA WOODSIDE",url:"joshua.html"},{name:"OSCAR WOODSIDE",url:"oscar.html"},{name:"TRIXIE SHERMAN",url:"mangle.html"},{name:"VICTOR CALLAHAN",url:"victor.html"}];
const alive=[{name:"DOMINIC CANTON",url:"dom.html"},{name:"RYO",url:"ryo.html"},{name:"THEO",url:"theo.html"},{name:"WILLIAM AFTON",url:"afton.html"}];
const path=window.location.pathname;
const page=path.substring(path.lastIndexOf("/")+1)||"bonabi.html";
const isAlive=typeof currentCharacterData!="undefined"&&currentCharacterData.isAliveSubject===true;
const backUrl=isAlive?"alive.html":"dead.html";
const label=isAlive?"[ ALIVE ]":"[ DEAD ]";
const labelClass=isAlive?"alive-label":"dead-label";
const list=isAlive?alive:dead;

let html=`<div class="submenu-row" style="display:flex;gap:8px;width:100%;justify-content:center;margin-bottom:4px"><a onclick="fadeTo('${backUrl}')" class="nav-btn submenu-btn">< SELECTION MENU</a><a onclick="toggleFullScreen()" class="nav-btn submenu-btn" id="fs-btn">FULLSCREEN</a></div>`;
html+=`<div class="nav-status-group"><span class="group-label ${labelClass}">${label}</span>`;
list.forEach(item=>{
const active=page.toLowerCase()===item.url.toLowerCase()?"active":"";
if(active==="active"){
html+=`<a class="nav-btn active" style="pointer-events:none;opacity:0.6">${item.name}</a>`;
}else{
html+=`<a onclick="fadeTo('${item.url}')" class="nav-btn">${item.name}</a>`;
}
});
html+="</div>";
nav.innerHTML=html;

setTimeout(()=>{
document.querySelectorAll(".nav-btn, .submenu-btn").forEach(el=>{
if(el)el.addEventListener("mouseenter",()=>{if(typeof playHoverSound=="function")playHoverSound()});
});
},20);

const style=document.createElement("style");
style.innerHTML=".char-text, .char-notes { white-space: pre-line !important; }";
document.head.appendChild(style);

if(typeof currentCharacterData!="undefined")renderCharacter(currentCharacterData);

// Add alive-page class to body for alive characters
if(isAlive){document.body.classList.add("alive-page");}

if(page.toLowerCase()!=="ryo.html"){
    const mt=document.getElementById("music-toggle")||document.getElementById("music-toggle-text")||document.querySelector(".audio-control-btn");
    if(mt)mt.remove();
    const bg=document.getElementById("bgm")||document.getElementById("audio")||document.querySelector("audio");
    if(bg){bg.pause();bg.src="";bg.remove();}
}

setTimeout(()=>{if(document.body)document.body.classList.add("fade-in")},10);
});

function renderCharacter(d){
const view=document.getElementById("view-layout");
if(!view)return;

let stats="";
if(!d.isAliveSubject){
const locVal=d.died;
stats+=`<div class="stat">DIED: ${locVal}</div>`;
}
if(d.killedBy)stats+=`<div class="stat">KILLED BY: ${d.killedBy}</div>`;
if(d.gender)stats+=`<div class="stat">GENDER: ${d.gender}</div>`;

let notes="";
if(d.notes&&Array.isArray(d.notes)){
notes=d.notes.map((n,i)=>`<div class="note-line">${i+1}. ${n}</div>`).join("");
}

const section=(title,content)=>{
if(!content)return"";
return`<div class="char-section"><div class="char-section-title" onclick="toggleSection(this)">${title}</div><div class="char-section-body closed"><div class="char-text">${content}</div></div></div>`;
};
const noteSection=(title,content)=>{
if(!content)return"";
return`<div class="char-section"><div class="char-section-title" onclick="toggleSection(this)">${title}</div><div class="char-section-body closed"><div class="char-notes">${content}</div></div></div>`;
};

view.className="char-dossier";
const container=document.querySelector(".wiki-container");

// Flashlight effect: dark page, clip-path circle around cursor
let fxStyle=document.getElementById("char-fx-style");
if(!fxStyle){fxStyle=document.createElement("style");fxStyle.id="char-fx-style";document.head.appendChild(fxStyle);}
const c=d.titleColor;
const isAlive=d.isAliveSubject===true;

if(!isAlive){
fxStyle.innerHTML=`
@keyframes flickerLight{0%,100%{opacity:0.92}5%{opacity:0.65}10%{opacity:0.95}55%{opacity:0.55}57%{opacity:0.93}}
.wiki-container{background:
  repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(139,119,80,0.06) 2px,rgba(139,119,80,0.06) 3px),
  repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(120,100,65,0.05) 3px,rgba(120,100,65,0.05) 4px),
  radial-gradient(circle 1px at 15% 20%,rgba(100,80,50,0.15),transparent 2px),
  radial-gradient(circle 1px at 45% 35%,rgba(110,85,55,0.12),transparent 2px),
  radial-gradient(circle 1px at 75% 15%,rgba(95,75,45,0.1),transparent 2px),
  radial-gradient(circle 1px at 25% 60%,rgba(105,82,52,0.14),transparent 2px),
  radial-gradient(circle 1px at 55% 75%,rgba(100,78,48,0.11),transparent 2px),
  radial-gradient(circle 1px at 85% 55%,rgba(115,90,58,0.13),transparent 2px),
  radial-gradient(circle 1px at 10% 80%,rgba(100,80,50,0.12),transparent 2px),
  radial-gradient(circle 1px at 40% 90%,rgba(108,85,55,0.1),transparent 2px),
  radial-gradient(circle 1px at 70% 45%,rgba(98,78,48,0.14),transparent 2px),
  radial-gradient(circle 1px at 90% 85%,rgba(112,88,56,0.11),transparent 2px),
  linear-gradient(180deg,#c4a870 0%,#bfa062 10%,#b89858 20%,#b08c48 40%,#a88040 60%,#9c7830 80%,#886820 100%)!important;
  background-attachment:fixed!important;box-shadow:inset 0 0 50px rgba(20,0,0,0.4),inset 0 0 100px rgba(30,0,0,0.2);}
.wanted-header{text-align:center;padding:10px 0 14px 0;border-bottom:2px solid rgba(60,25,5,0.25);margin-bottom:14px;}
.wanted-header h2{font-family:"EB Garamond",serif;font-size:28px;color:#3a1a05;letter-spacing:8px;text-transform:uppercase;margin:0 0 4px 0;text-shadow:1px 1px 0 rgba(200,170,100,0.4);}
.wanted-header .wanted-sub{font-size:12px;color:#5a3015;letter-spacing:4px;text-transform:uppercase;}
.wiki-container .char-section{border-bottom:none!important;}
.wiki-container .char-name,.wiki-container .char-alias,.wiki-container .char-quote,.wiki-container .char-credit,.wiki-container .stat,.wiki-container .char-section-title,.wiki-container .char-text,.wiki-container .note-line{color:#2a1a0e!important;}
.wiki-container .char-section-title{text-align:left!important;}
.wiki-container .char-text{text-align:left!important;}
.wiki-container .char-section-body{text-align:left!important;}
.wiki-container .char-section{text-align:left!important;}
.wiki-container .char-body{text-align:left!important;}
.wiki-container{text-align:left!important;}
.wiki-container .char-header{align-items:center!important;}
.wiki-container .char-name-row{justify-content:center!important;}
.wiki-container .char-header-row{align-items:center!important;}
.egg-tip{text-align:center;font-size:11px;color:#5a3015;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;opacity:0.7;}
#flashlight-dark{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.92);z-index:99997;pointer-events:none;-webkit-mask-image:radial-gradient(circle 200px at var(--mx,50%) var(--my,50%),transparent 20%,black 100%);mask-image:radial-gradient(circle 200px at var(--mx,50%) var(--my,50%),transparent 20%,black 100%);transition:opacity .3s ease;}
#flashlight-dark.off{opacity:0!important;}`;
}else{
fxStyle.innerHTML=`
.wiki-container{background:
  radial-gradient(ellipse at 50% 0%,rgba(0,230,118,0.04) 0%,transparent 60%),
  repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,230,118,0.02) 3px,rgba(0,230,118,0.02) 4px),
  rgba(12,8,5,0.97)!important;
  box-shadow:inset 0 0 40px rgba(0,230,118,0.06),0 0 15px rgba(0,230,118,0.1)!important;}
.personnel-header{text-align:center;padding:10px 0 14px 0;border-bottom:2px solid rgba(0,230,118,0.2);margin-bottom:14px;}
.personnel-header h2{font-family:"EB Garamond",serif;font-size:26px;color:#00e676;letter-spacing:8px;text-transform:uppercase;margin:0 0 4px 0;text-shadow:0 0 12px rgba(0,230,118,0.3);}
.personnel-header .personnel-sub{font-size:12px;color:#377a56;letter-spacing:4px;text-transform:uppercase;}
.wiki-container .char-section{border-bottom:none!important;}
.wiki-container .char-name,.wiki-container .char-alias,.wiki-container .char-quote,.wiki-container .char-credit,.wiki-container .stat,.wiki-container .char-section-title,.wiki-container .char-text,.wiki-container .note-line{color:#c8e6d4!important;}
.wiki-container .char-name{color:#00e676!important;}
.wiki-container .char-section-title{color:#00e676!important;text-align:left!important;}
.wiki-container .char-section-title:hover{color:#fff!important;}
.wiki-container .char-text{text-align:left!important;}
.wiki-container .char-section-body{text-align:left!important;}
.wiki-container .char-section{text-align:left!important;}
.wiki-container .char-body{text-align:left!important;}
.wiki-container{text-align:left!important;}
.wiki-container .char-header{align-items:center!important;}
.wiki-container .char-name-row{justify-content:center!important;}
.wiki-container .char-header-row{align-items:center!important;}
.egg-tip{text-align:center;font-size:11px;color:#377a56;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;opacity:0.7;}
#flashlight-dark{display:none!important;}
`;
}

document.addEventListener("mousemove",function(e){
const dark=document.getElementById("flashlight-dark");
if(dark){dark.style.setProperty("--mx",e.clientX+"px");dark.style.setProperty("--my",e.clientY+"px");}
},{passive:true});
document.addEventListener("touchmove",function(e){
const dark=document.getElementById("flashlight-dark");
if(dark&&e.touches[0]){dark.style.setProperty("--mx",e.touches[0].clientX+"px");dark.style.setProperty("--my",e.touches[0].clientY+"px");}
},{passive:true});
document.addEventListener("touchstart",function(e){
const dark=document.getElementById("flashlight-dark");
if(dark&&e.touches[0]){dark.style.setProperty("--mx",e.touches[0].clientX+"px");dark.style.setProperty("--my",e.touches[0].clientY+"px");}
},{passive:true});

let dark=document.getElementById("flashlight-dark");
if(!dark){dark=document.createElement("div");dark.id="flashlight-dark";document.body.appendChild(dark);}
if(localStorage.getItem("flashlightOff")==="1"){dark.classList.add("off");
const flBtn=document.getElementById("fl-btn");if(flBtn)flBtn.textContent="LIGHT: OFF";}

view.innerHTML=`
<div class="${isAlive?"personnel-header":"wanted-header"}">
  <h2>${isAlive?"THE LIVING":"DEAD"}</h2>
  <div class="${isAlive?"personnel-sub":"wanted-sub"}">${isAlive?"Documents already filed with the company":"If found, do not approach"}</div>
</div>
<div class="egg-tip">${isAlive?"click section titles to reveal":"click section titles to reveal"}</div>
<div class="egg-tip">${isAlive?"scroll to see more":"scroll to see more"}</div>
<div class="char-header">
  <div class="char-name-row">
    <div class="char-name" style="color:${d.titleColor}">${d.name}</div>
    <div class="char-alias">"${d.alias}"</div>
  </div>
  <div class="char-header-row">
    <div class="char-portrait-wrap"><img src="${d.pfp}" class="char-portrait" onclick="zoomPortrait(this.src)" onerror="this.style.display='none'"></div>
    <div class="char-stats">${stats}</div>
  </div>
  <div class="char-quote">"${d.quote}"</div>
  ${d.credit?`<div class="char-credit" style="opacity:0.6">Creator: ${d.credit}</div>`:""}
</div>
<div class="char-body">
  ${section("PURPOSE",d.purpose)}
  ${section("BACKGROUND",d.bg)}
  ${section("PERSONALITY",d.pers)}
  ${section("LIKES",d.likes)}
  ${section("DISLIKES",d.dislikes)}
  ${section("RELATIONSHIPS",d.rel)}
  ${noteSection("INTEL NOTES",notes)}
</div>`;
}

function toggleSection(el){
const body=el.nextElementSibling;
if(!body)return;
body.classList.toggle("closed");
}

function zoomPortrait(src){
const existing=document.querySelector(".portrait-overlay");
if(existing)existing.remove();
const overlay=document.createElement("div");
overlay.className="portrait-overlay";
overlay.innerHTML=`<img src="${src}">`;
overlay.onclick=()=>overlay.remove();
document.body.appendChild(overlay);
}

function toggleFullScreen(){
if(!document.fullscreenElement){
document.documentElement.requestFullscreen().catch(()=>{});
}else{
document.exitFullscreen();
}
}

// Easter egg system
(function(){
const eggs={
"bonabi.html":{type:"portrait",count:5,text:"I SEE YOU IN MY DREAMS",color:"#9400d3"},
"mangle.html":{type:"zone",pos:{top:0,right:0,w:80,h:80},text:"YOU SHOULDN'T HAVE FOUND ME",color:"#e6194b"},
"joshua.html":{type:"code",code:"help",text:"THERE IS NO HELP FOR US",color:"#4a4a4a"},
"oscar.html":{type:"portrait",count:3,text:"I WAS NEVER REALLY HERE",color:"#7a22c2"},
"victor.html":{type:"zone",pos:{bottom:0,left:0,w:80,h:80},text:"YOU CAN'T UNDO WHAT WAS DONE",color:"#e6b800"}
};
const path=window.location.pathname;
const page=path.substring(path.lastIndexOf("/")+1).toLowerCase();
const egg=eggs[page];
if(!egg)return;

let portraitClicks=0;
let clickTimer=null;
let eggTriggered=false;

function triggerJumpscare(){
if(eggTriggered)return;
eggTriggered=true;

// screech sound
try{
const ctx=new(window.AudioContext||window.webkitAudioContext)();
const buf=ctx.createBuffer(1,ctx.sampleRate*0.8,ctx.sampleRate);
const data=buf.getChannelData(0);
for(let i=0;i<data.length;i++){
const t=i/ctx.sampleRate;
data[i]=(Math.random()*2-1)*Math.exp(-t*3)*(0.5+0.5*Math.sin(t*80));
}
const src=ctx.createBufferSource();
src.buffer=buf;
const gain=ctx.createGain();
gain.gain.value=0.6;
src.connect(gain);
gain.connect(ctx.destination);
src.start();
}catch(e){}

// overlay
const ov=document.createElement("div");
ov.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;background:rgba(200,0,0,0.85);display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;animation:eggFlash 0.1s ease 3";
ov.innerHTML=`<div style="font-family:'EB Garamond',serif;font-size:clamp(24px,5vw,42px);color:${egg.color};letter-spacing:6px;text-transform:uppercase;text-shadow:0 0 20px ${egg.color};text-align:center;padding:20px;">${egg.text}</div>`;
ov.onclick=()=>ov.remove();
document.body.appendChild(ov);
setTimeout(()=>{if(ov.parentNode)ov.remove();},2500);
}

// inject flash keyframe
const s=document.createElement("style");
s.textContent="@keyframes eggFlash{0%,100%{opacity:1}50%{opacity:0.3}}";
document.head.appendChild(s);

if(egg.type==="portrait"){
document.addEventListener("click",function(e){
if(eggTriggered)return;
if(e.target.classList.contains("char-portrait")){
portraitClicks++;
if(clickTimer)clearTimeout(clickTimer);
clickTimer=setTimeout(()=>{portraitClicks=0;},1500);
if(portraitClicks>=egg.count){triggerJumpscare();}
}
},{passive:true});
}

if(egg.type==="zone"){
const zone=document.createElement("div");
const p=egg.pos;
zone.style.cssText=`position:fixed;z-index:99998;cursor:pointer;${p.top!==undefined?"top:0;":`bottom:${p.bottom||0}px;`}${p.right!==undefined?"right:0;":`left:${p.left||0}px;`}width:${p.w||60}px;height:${p.h||60}px;`;
zone.addEventListener("click",function(){triggerJumpscare();},{passive:true});
document.body.appendChild(zone);
}

if(egg.type==="code"){
let buffer="";
document.addEventListener("keydown",function(e){
if(eggTriggered)return;
buffer+=e.key.toLowerCase();
if(buffer.length>20)buffer=buffer.slice(-20);
if(buffer.includes(egg.code)){triggerJumpscare();buffer="";}
},{passive:true});
}
})();
