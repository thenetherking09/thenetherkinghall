document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. RANDOM IMAGE INJECTION ---
    const folders = ['Otm', 'Cleave', 'Tape', 'Other'];
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];
    const randomSoul = `gallery/${randomFolder}/1.jpg`; 
    
    const style = document.createElement('style');
    style.innerHTML = `
        #portal-archive::after { 
            background-image: url('${randomSoul}'); 
        }
    `;
    document.head.appendChild(style);

    // --- 2. RUNIC DECRYPTION ---
    const occult = ["∆", "‡", "Ω", "⚚", "⊗", "ψ"];
    function decrypt(el, targetEl) {
        const finalStr = el.getAttribute("data-text");
        let iter = 0;
        const interval = setInterval(() => {
            targetEl.innerText = finalStr.split("").map((char, idx) => {
                if (idx < iter) return finalStr[idx];
                if (char === " ") return " ";
                return occult[Math.floor(Math.random() * occult.length)];
            }).join("");
            if (iter >= finalStr.length) clearInterval(interval);
            iter += 1/3;
        }, 35);
    }

    // Decode Title
    decrypt(document.getElementById("main-title"), document.getElementById("main-title"));

    // Decode Portals on Hover/Touch
    document.querySelectorAll(".portal-card").forEach(card => {
        card.addEventListener("mouseenter", () => decrypt(card, card.querySelector(".portal-text")));
        card.addEventListener("touchstart", () => decrypt(card, card.querySelector(".portal-text")), {passive: true});
    });

    // --- 3. FLASHLIGHT LAYER MAPPING ---
    document.addEventListener("mousemove", (e) => {
        document.body.style.setProperty('--cursor-x', `${e.clientX}px`);
        document.body.style.setProperty('--cursor-y', `${e.clientY}px`);
    });

    // --- 4. SIGNET & TIME LOGIC & TELEGRAM MONITORING ---
    const signetDisplay = document.getElementById("signet-display");
    const nameModal = document.getElementById("name-modal");
    const nameInput = document.getElementById("name-input");
    const submitNameBtn = document.getElementById("submit-name-btn");

    let storedSignet = localStorage.getItem("user-signet");

    function updateSignetDisplay(name) {
        signetDisplay.innerText = `THE ARCHIVE RECOGNIZES: ${name.toUpperCase()}`;
    }

    // If no name is stored, force the modal to open
    if (!storedSignet) {
        nameModal.style.display = "flex"; 
    } else {
        updateSignetDisplay(storedSignet);
    }

    // Clicking the signet text opens the modal to change it
    signetDisplay.addEventListener("click", () => {
        nameInput.value = storedSignet || "";
        nameModal.style.display = "flex";
        nameInput.focus();
    });

    // Handle Name Submission
    submitNameBtn.addEventListener("click", () => {
        const newName = nameInput.value.trim();
        if (!newName) return;

        localStorage.setItem("user-signet", newName);
        storedSignet = newName;
        updateSignetDisplay(newName);
        nameModal.style.display = "none";

        // FIRE TELEGRAM TRACKER (Requires global.js window.trackUserAction)
        if (typeof window.trackUserAction === "function") {
            window.trackUserAction('NEW VISITOR', `A soul has entered the realm.\n\nSignet: ${newName}`);
        }
    });

    // Allow pressing "Enter" in the input field to submit
    nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            submitNameBtn.click();
        }
    });

    // Time Greeting
    const hour = new Date().getHours();
    const greetingEl = document.getElementById("time-greeting");
    if (hour >= 6 && hour < 18) {
        greetingEl.innerText = "THE ARCHIVES LIE DORMANT.";
    } else {
        greetingEl.innerText = "THE SHADOWS LENGTHEN.";
    }
});
            
