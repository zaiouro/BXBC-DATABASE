// ==========================================================================
// CENTRAL FNF MENU ENGINE - AUDIO RECONSTRUCTED (全站通用轉場與純淨晶片音效引擎)
// ==========================================================================
let globalBGM = null;

document.addEventListener("DOMContentLoaded", () => {
    if (document.body) {
        document.body.style.opacity = "1";
        document.body.classList.add("fade-in");
    }

    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1).toLowerCase();

    if (currentFile === "dead.html") {
        let isMusicEnabled = localStorage.getItem("terminalMusicSetting") !== "OFF";
        updateToggleText(isMusicEnabled);
        try {
            globalBGM = new Audio('bgm.mp3'); globalBGM.loop = true; globalBGM.volume = 0.3;           
            const startBGM = () => {
                if (localStorage.getItem("terminalMusicSetting") !== "OFF" && globalBGM) {
                    globalBGM.play().then(() => {
                        document.removeEventListener('click', startBGM); document.removeEventListener('mouseenter', startBGM);
                    }).catch(() => {});
                }
            };
            document.addEventListener('click', startBGM); document.addEventListener('mouseenter', startBGM);
        } catch(e) {}
    }
});

function toggleMusicState() {
    let isMusicEnabled = localStorage.getItem("terminalMusicSetting") !== "OFF";
    if (isMusicEnabled) { localStorage.setItem("terminalMusicSetting", "OFF"); updateToggleText(false); if (globalBGM) globalBGM.pause(); } 
    else { localStorage.setItem("terminalMusicSetting", "ON"); updateToggleText(true); if (globalBGM) globalBGM.play().catch(() => {}); }
}
function updateToggleText(isEnabled) {
    const toggleTextElement = document.getElementById("music-toggle-text");
    if (toggleTextElement) toggleTextElement.innerText = isEnabled ? "MUSIC: ON" : "MUSIC: OFF";
}

let audioCtx = null;
function initAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }

function playHoverSound() {
    try {
        initAudio(); const osc = audioCtx.createOscillator(), gain = audioCtx.createGain(); osc.type = 'triangle'; osc.frequency.setValueAtTime(440, audioCtx.currentTime); 
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.08); osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.08);
    } catch(e) {}
}

// 💡 終極音效修正：完美隔離並隔離雙層音訊波形，重寫包絡線，消滅 PC 端尖銳或變奇怪的雜音問題
function playConfirmSound() {
    try {
        initAudio(); 
        const now = audioCtx.currentTime;
        
        // 第一層：厚實的低頻基底 (Sawtooth)
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = 'sawtooth'; 
        osc1.frequency.setValueAtTime(293.66, now); // D4 和弦基音
        gain1.gain.setValueAtTime(0.06, now); 
        gain1.gain.exponentialRampToValueAtTime(0.00001, now + 0.35);
        osc1.connect(gain1); 
        gain1.connect(audioCtx.destination);
        osc1.start(now); 
        osc1.stop(now + 0.35);

        // 第二層：清脆的高頻 8-Bit 迴響 (Square) - 加上微延遲避免波形撞擊
        setTimeout(() => {
            if (!audioCtx) return;
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.type = 'square'; 
            osc2.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 高八度和弦響應
            gain2.gain.setValueAtTime(0.04, audioCtx.currentTime); 
            gain2.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.25);
            osc2.connect(gain2); 
            gain2.connect(audioCtx.destination);
            osc2.start(audioCtx.currentTime); 
            osc2.stop(audioCtx.currentTime + 0.25);
        }, 60);
    } catch(e) {}
}

function fnfNavigate(clickedElement, targetUrl) {
    playConfirmSound(); 
    if (globalBGM && localStorage.getItem("terminalMusicSetting") !== "OFF") {
        let fadeInterval = setInterval(() => { if (globalBGM.volume > 0.02) { globalBGM.volume -= 0.03; } else { globalBGM.volume = 0; globalBGM.pause(); clearInterval(fadeInterval); } }, 30); 
    }
    const allButtons = document.querySelectorAll('.dir-btn');
    const headerGroup = document.getElementById('fnf-header');
    const backButton = document.getElementById('fnf-back');
    const box = document.getElementById('fnf-box');

    if(headerGroup) headerGroup.classList.add('fnf-hide');
    if(backButton) backButton.classList.add('fnf-hide');

    allButtons.forEach(btn => { if (btn === clickedElement) { btn.classList.add('fnf-selected'); } else { btn.classList.add('fnf-fade-out'); } });

    // 手機端不執行複雜的垂直平移，防止破壞行動端版面
    if (window.innerWidth > 768) {
        const boxCenter = box.offsetHeight / 2;
        const btnCenter = clickedElement.offsetTop + (clickedElement.offsetHeight / 2);
        const targetOffset = boxCenter - btnCenter;
        clickedElement.style.transform = `translateY(${targetOffset}px) scale(1.05)`;
    } else {
        clickedElement.style.transform = `scale(1.03)`;
    }

    setTimeout(() => {
        if (document.body) { document.body.style.opacity = "0"; document.body.classList.remove("fade-in"); document.body.classList.add("fade-out"); }
        let destination = targetUrl;
        if (targetUrl === "index.html" || targetUrl === "lobby.html") { destination = "lobby.html"; }
        setTimeout(() => { window.location.href = destination; }, 450); 
    }, 550);
}

function fadeTo(url) {
    if (globalBGM && localStorage.getItem("terminalMusicSetting") !== "OFF") {
        let fadeInterval = setInterval(() => { if (globalBGM.volume > 0.02) { globalBGM.volume -= 0.04; } else { globalBGM.volume = 0; globalBGM.pause(); clearInterval(failInterval); } }, 30);
    }
    if (document.body) { document.body.style.opacity = "0"; document.body.classList.remove("fade-in"); document.body.classList.add("fade-out"); }
    let destination = url;
    if (url === "index.html" || url === "lobby.html") { destination = "lobby.html"; }
    setTimeout(() => { window.location.href = destination; }, 450);
}
