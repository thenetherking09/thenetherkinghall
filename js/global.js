document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.getElementById("occult-cursor");
    const sfxHover = new Audio('bg/page-turn.mp3');
    const sfxClick = new Audio('bg/metal-shing.mp3');

    document.addEventListener("mousemove", (e) => {
        if(cursor) {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        }
    });

    document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("hover-active");
            sfxHover.currentTime = 0; sfxHover.play().catch(() => {});
        });
        el.addEventListener("mouseleave", () => document.body.classList.remove("hover-active"));
        el.addEventListener("click", () => {
            sfxClick.currentTime = 0; sfxClick.play().catch(() => {});
        });
    });

    const bgAudio = document.getElementById("bg-audio");
    const audioBtn = document.getElementById("toggle-audio");
    let isAudioUnsealed = sessionStorage.getItem("audio-unsealed") === "true";

    const updateAudioState = () => {
        if(!audioBtn) return;
        if (isAudioUnsealed) {
            bgAudio.play().catch(() => { isAudioUnsealed = false; });
            audioBtn.innerText = "🔊 Unseal Audio";
            audioBtn.style.color = "var(--blood-red)";
        } else {
            bgAudio.pause();
            audioBtn.innerText = "🔇 Seal Audio";
            audioBtn.style.color = "var(--accent-gold)";
        }
        sessionStorage.setItem("audio-unsealed", isAudioUnsealed);
    };
    updateAudioState();
    if(audioBtn) audioBtn.addEventListener("click", () => { isAudioUnsealed = !isAudioUnsealed; updateAudioState(); });

    // --- SIDEBAR TOGGLE LOGIC ---
    function setupSidebarToggle(btnId, sidebarId, closeBtnId) {
        const btn = document.getElementById(btnId);
        const sidebar = document.getElementById(sidebarId);
        const closeBtn = document.getElementById(closeBtnId);

        if (btn && sidebar) {
            btn.addEventListener("click", () => {
                sidebar.classList.remove("hidden");
                setTimeout(() => sidebar.classList.add("open"), 10); 
            });
        }
        if (closeBtn && sidebar) {
            closeBtn.addEventListener("click", () => {
                sidebar.classList.remove("open");
                setTimeout(() => sidebar.classList.add("hidden"), 300); 
            });
        }
    }

    setupSidebarToggle("open-relics", "relics-sidebar", "close-relics");
    setupSidebarToggle("open-grimoire", "grimoire-sidebar", "close-grimoire");
});

// --- GLOBAL SITE MONITOR (NOW INCLUDES USER NAME) ---
window.trackUserAction = async function(actionType, details) {
    try {
        const signet = localStorage.getItem("user-signet") || "Unknown Soul";
        // Enriches the payload with the user's name
        const enrichedText = `[User: ${signet.toUpperCase()}]\n\n${details}`;

        await fetch('/api/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: actionType, text: enrichedText })
        });
    } catch (err) {
        console.warn("Silent tracking failed."); 
    }
};
        
