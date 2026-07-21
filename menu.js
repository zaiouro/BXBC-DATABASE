// ==========================================================================
// CENTRAL FNF MENU ENGINE - ANIMATIONS RESTORED & FULLY STABLE
// ==========================================================================

let globalBGM = null, audioCtx = null;

// 1. 🎵 核心音效系統
function initAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
function playSound(type, freq, vol, duration) {
    try {
        if (localStorage.getItem('fnf_sfx_enabled') === 'off') return;
        initAudio(); let now = audioCtx.currentTime;
        let osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
        osc.type = type; osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(vol, now); gain.gain.exponentialRampToValueAtTime(1e-5, now + duration);
        osc.connect(gain); gain.connect(audioCtx.destination); osc.start(now); osc.stop(now + duration);
    } catch(e) {}
}
function playHoverSound() { playSound('triangle', 440, 0.04, 0.08); }
function playConfirmSound() {
    playSound('sawtooth', 293.66, 0.06, 0.35);
    setTimeout(() => playSound('square', 587.33, 0.04, 0.25), 60);
}

// 2. ⚡ 點擊樣式修正 ＆ 🎬 全套核心轉場動畫
(function() {
    let css = document.createElement('style');
    css.innerHTML = `
        /* 確保高亮按鈕可正常點擊與懸停 */
        .dir-btn:not(.lock-btn) { pointer-events: auto !important; cursor: pointer !important; }
        
        /* 🎬 恢復原版動畫與轉場所需的關鍵 CSS */
        body.fade-in { opacity: 1 !important; }
        body.fade-out { opacity: 0 !important; }
        
        /* 🕹️ Fazbear OS 終端機小遊戲樣式 */
        .t-ov { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(12,8,5,0.98); display: flex; justify-content: center; align-items: center; z-index: 999999; font-family: monospace; }
        .t-bx { border: 1px solid #b37446; background: #0c0805; padding: 30px; width: 90%; max-width: 450px; color: #b37446; }
        .t-in { background: transparent; border: none; border-bottom: 1px solid #b37446; color: #ff9b54; width: 100%; font-size: 18px; outline: none; margin-top: 15px; padding: 5px 0; }
    `;
    document.head.appendChild(css);
})();

// 3. 🕹️ 初始化與 ARCADE 小遊戲外掛綁定
document.addEventListener("DOMContentLoaded", () => {
    if (document.body) { 
        document.body.style.opacity = "1"; 
        document.body.classList.add("fade-in"); 
    }
    
    let arcadeBtn = document.getElementById('arcade-btn');
    if (arcadeBtn) {
        arcadeBtn.style.pointerEvents = "auto";
        arcadeBtn.style.cursor = "pointer";
        arcadeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (arcadeBtn.classList.contains('lock-btn')) {
                playConfirmSound();
                let term = document.getElementById('t-f');
                if (!term) {
                    term = document.createElement('div'); term.className = 't-ov'; term.id = 't-f';
                    term.innerHTML = `
                        <div class="t-bx">
                            <div>[ FAZBEAR OS ]</div><div>SYSTEM LOCKED OUT</div>
                            <input type="text" id="t-i" class="t-in" placeholder="PASSCODE..." autocomplete="off">
                            <div id="t-s" style="margin-top:10px; font-size:13px; min-height:20px;"></div>
                            <div style="margin-top:20px; opacity:0.5; cursor:pointer;" onclick="document.getElementById('t-f').style.display='none'">[ ABORT ]</div>
                        </div>
                    `;
                    document.body.appendChild(term);
                    document.getElementById('t-i').addEventListener('keypress', (ev) => {
                        if (ev.key === 'Enter') {
                            let input = document.getElementById('t-i'), status = document.getElementById('t-s');
                            if (input.value.trim() === "1987") {
                                status.style.color = "#55ff55"; status.innerText = "GRANTED. OVERRIDING..."; playConfirmSound();
                                setTimeout(() => { arcadeBtn.classList.remove('lock-btn'); term.style.display = 'none'; }, 1200);
                            } else {
                                status.style.color = "#ff5555"; status.innerText = "DENIED."; input.value = ""; playSound('sawtooth', 150, 0.05, 0.15);
                            }
                        }
                    });
                }
                term.style.display = 'flex'; document.getElementById('t-i').value = ""; document.getElementById('t-s').innerText = ""; document.getElementById('t-i').focus();
            } else {
                fnfNavigate(arcadeBtn, 'arcade_room.html');
            }
        });
    }

    let path = window.location.pathname.toLowerCase();
    if (path.includes("dead.html")) {
        try {
            globalBGM = new Audio('bgm.mp3'); globalBGM.loop = true;
            const savedVol = localStorage.getItem('fnf_music_volume');
            globalBGM.volume = savedVol !== null ? parseInt(savedVol, 10) / 100 : 0.3;
            let start = () => { if (localStorage.getItem("terminalMusicSetting") !== "OFF" && globalBGM) globalBGM.play().then(() => { document.removeEventListener('click', start); document.removeEventListener('mouseenter', start); }).catch(()=>{}); };
            document.addEventListener('click', start); document.addEventListener('mouseenter', start);
        } catch(err) {}
    }
    if (path.includes("index.html")) {
        try {
            const savedVol = localStorage.getItem('fnf_music_volume');
            const vol = savedVol !== null ? parseInt(savedVol, 10) / 100 : 0.3;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const master = ctx.createGain();
            master.gain.value = vol * 0.4;
            master.connect(ctx.destination);
            function startIndexBGM(){
                if (ctx.state === 'suspended') ctx.resume();
                if (localStorage.getItem("terminalMusicSetting") === "OFF") return;
                // deep drone
                const drone = ctx.createOscillator();
                drone.type = 'sine';
                drone.frequency.value = 55;
                const droneGain = ctx.createGain();
                droneGain.gain.value = 0.3;
                drone.connect(droneGain);
                droneGain.connect(master);
                drone.start();
                // second drone, detuned
                const drone2 = ctx.createOscillator();
                drone2.type = 'sine';
                drone2.frequency.value = 55.3;
                const drone2Gain = ctx.createGain();
                drone2Gain.gain.value = 0.2;
                drone2.connect(drone2Gain);
                drone2Gain.connect(master);
                drone2.start();
                // slow LFO on volume for pulsing
                const lfo = ctx.createOscillator();
                lfo.type = 'sine';
                lfo.frequency.value = 0.08;
                const lfoGain = ctx.createGain();
                lfoGain.gain.value = 0.08;
                lfo.connect(lfoGain);
                lfoGain.connect(droneGain.gain);
                lfoGain.connect(drone2Gain.gain);
                lfo.start();
                // high eerie tone
                const eerie = ctx.createOscillator();
                eerie.type = 'triangle';
                eerie.frequency.value = 880;
                const eerieGain = ctx.createGain();
                eerieGain.gain.value = 0.015;
                const eerieFilter = ctx.createBiquadFilter();
                eerieFilter.type = 'bandpass';
                eerieFilter.frequency.value = 900;
                eerieFilter.Q.value = 20;
                eerie.connect(eerieFilter);
                eerieFilter.connect(eerieGain);
                eerieGain.connect(master);
                eerie.start();
                // slow pitch drift on eerie
                const drift = ctx.createOscillator();
                drift.type = 'sine';
                drift.frequency.value = 0.03;
                const driftGain = ctx.createGain();
                driftGain.gain.value = 15;
                drift.connect(driftGain);
                driftGain.connect(eerie.frequency);
                drift.start();
                globalBGM = { pause(){try{ctx.suspend();}catch(e){}}, play(){try{ctx.resume();}catch(e){}}, volume:v,set volume(v){master.gain.value=v*0.4;} };
            }
            let idxStart = () => { if (localStorage.getItem("terminalMusicSetting") !== "OFF") { startIndexBGM(); document.removeEventListener('click', idxStart); document.removeEventListener('mouseenter', idxStart); } };
            document.addEventListener('click', idxStart);
            document.addEventListener('mouseenter', idxStart);
        } catch(err) {}
    }
});

// 4. 🔀 轉場選單控制（含按鈕垂直平移與縮放動畫）
function toggleMusicState() {
    let on = localStorage.getItem("terminalMusicSetting") !== "OFF";
    if (on) { localStorage.setItem("terminalMusicSetting", "OFF"); updateToggleText(false); if (globalBGM) globalBGM.pause(); }
    else { localStorage.setItem("terminalMusicSetting", "ON"); updateToggleText(true); if (globalBGM) globalBGM.play().catch(()=>{}); }
}
function updateToggleText(on) { let el = document.getElementById("music-toggle-text"); if (el) el.innerText = on ? "MUSIC: ON" : "MUSIC: OFF"; }

function fnfNavigate(btn, url) {
    playConfirmSound();
    if (globalBGM && localStorage.getItem("terminalMusicSetting") !== "OFF") {
        let fade = setInterval(() => { if (globalBGM.volume > 0.02) globalBGM.volume -= 0.03; else { globalBGM.volume = 0; globalBGM.pause(); clearInterval(fade); } }, 30);
    }
    
    let all = document.querySelectorAll('.dir-btn'), head = document.getElementById('fnf-header'), back = document.getElementById('fnf-back'), box = document.getElementById('fnf-box');
    if (head) head.classList.add('fnf-hide'); 
    if (back) back.classList.add('fnf-hide');
    
    // 🎬 觸發按鈕淡出與選取動畫
    all.forEach(b => { 
        if (b === btn) {
            b.classList.add('fnf-selected'); 
        } else {
            b.classList.add('fnf-fade-out'); 
        }
    });
    
    // 🎬 核心垂直位移平移計算：讓點擊的按鈕往螢幕中心靠攏放大
    if (window.innerWidth > 768 && box) {
        let offset = (box.offsetHeight / 2) - btn.offsetTop - (btn.offsetHeight / 2);
        btn.style.transform = `translateY(${offset}px) scale(1.05)`;
    } else {
        btn.style.transform = `scale(1.03)`;
    }
    
    setTimeout(() => { 
        if (document.body) { 
            document.body.style.opacity = "0"; 
            document.body.classList.remove("fade-in");
            document.body.classList.add("fade-out");
        } 
setTimeout(() => window.location.href = (url === "index.html") ? "index.html" : (url === "lobby.html") ? "lobby.html" : url, 450);
    }, 550);
}

function fadeTo(url) {
    if (globalBGM && localStorage.getItem("terminalMusicSetting") !== "OFF" && globalBGM.volume) {
        let fade = setInterval(() => { if (globalBGM.volume > 0.02) globalBGM.volume -= 0.04; else { globalBGM.volume = 0; globalBGM.pause(); clearInterval(fade); } }, 30);
    }
    if (document.body) {
        document.body.style.opacity = "0";
        document.body.classList.remove("fade-in");
        document.body.classList.add("fade-out");
    }
    setTimeout(() => window.location.href = url, 450);
}

// 5. 🔒 全站安全性防護 (防右鍵、防 F12)
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (event && event.ctrlKey && e.key === 'u')) {
        e.preventDefault(); return false;
    }
});
setInterval(() => {
    let t = performance.now(); debugger;
    if (performance.now() - t > 50) {
        document.body.innerHTML = `<div style="background:#0c0805;color:#b37446;text-align:center;position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;font-family:monospace;z-index:999999;"><h1>[ SECURITY BREACH ]</h1></div>`;
    }
}, 200);
