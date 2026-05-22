// ============================================================================
// ORACLE CORE ENGINE (Portal, Archive Fetcher, & Tribute Receiver)
// ============================================================================

if (typeof window !== 'undefined' && typeof document !== 'undefined') {

    window.OracleDB = window.OracleDB || {};

    document.addEventListener("DOMContentLoaded", async () => {
        const promptBox = document.getElementById("prompt-box");
        const sendBtn = document.getElementById("send-btn");
        const chatLog = document.getElementById("chat-log");
        const chatContainer = document.getElementById("chat-container");
        
        const attachBtn = document.getElementById("attach-btn");
        const fileUpload = document.getElementById("oracle-file-upload");
        let pendingImageBase64 = null;
        let pendingImageMime = null;

        // --- PERCHANCE PORTAL BUTTONS ---
        const modeButtons = document.querySelectorAll(".mode-btn");
        modeButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const target = e.currentTarget || e.target;
                const mode = target.getAttribute("data-mode");
                
                if (mode === "rp") {
                    window.open('https://perchance.org/netherking-rp-oracle', '_blank');
                    commitToChatLog('system', `⚔️ <strong>ROLEPLAY PORTAL OPENED</strong><br>Return here to paste and save your generated RP.`);
                } else if (mode === "image") {
                    // LINK UPDATED HERE
                    window.open('https://perchance.org/image-generator-professional', '_blank');
                    commitToChatLog('system', `👁️ <strong>IMAGE PORTAL OPENED</strong><br>Download your generated vision, then use the 📎 icon below to upload it here.`);
                } else {
                    window.open('https://perchance.org/netherking-story-oracle', '_blank');
                    commitToChatLog('system', `📖 <strong>STORY PORTAL OPENED</strong><br>Copy your generated story and paste it below to save it as a Relic.`);
                }
            });
        });

        // --- RUNIC DECRYPTION VISUAL FX ---
        const occult = ["∆", "‡", "Ω", "⚚", "⊗", "ψ"];
        function decrypt(el) {
            const finalStr = el.getAttribute("data-text"); 
            if (!finalStr) return;
            let iter = 0;
            const interval = setInterval(() => {
                el.innerText = finalStr.split("").map((char, idx) => {
                    if (idx < iter) return finalStr[idx];
                    if (char === " ") return " "; 
                    return occult[Math.floor(Math.random() * occult.length)];
                }).join("");
                if (iter >= finalStr.length) clearInterval(interval); 
                iter += 1/3;
            }, 35);
        }
        const mainTitle = document.getElementById("main-title"); 
        if (mainTitle) decrypt(mainTitle);

        // --- SESSION & HISTORY MANAGEMENT ---
        let chatHistory = JSON.parse(localStorage.getItem("oracle-chat-history")) || [];

        // --- IMAGE COMPRESSION HELPER (For Uploads) ---
        async function compressImage(file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 800; 
                        if (img.width > MAX_WIDTH) {
                            const scaleSize = MAX_WIDTH / img.width;
                            canvas.width = MAX_WIDTH;
                            canvas.height = img.height * scaleSize;
                        } else {
                            canvas.width = img.width;
                            canvas.height = img.height;
                        }
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        resolve(canvas.toDataURL('image/jpeg', 0.8));
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            });
        }

        // --- ATTACHMENT LOGIC ---
        if (attachBtn && fileUpload) {
            attachBtn.addEventListener("click", () => fileUpload.click());
            fileUpload.addEventListener("change", async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                if (file.size > 4 * 1024 * 1024) {
                    alert("File is too large. Max size is 4MB.");
                    return;
                }

                attachBtn.style.color = "#000";
                attachBtn.style.background = "var(--accent-gold)";
                attachBtn.innerText = "⏳";
                
                pendingImageMime = 'image/jpeg';
                pendingImageBase64 = await compressImage(file);
                
                attachBtn.innerText = "✅";
                setTimeout(() => { 
                    attachBtn.innerText = "📎"; 
                    attachBtn.style.background = "#111";
                    attachBtn.style.color = "var(--accent-gold)";
                }, 2000);
            });
        }

        // --- TELEGRAM TRANSMITTER ---
        async function transmitToNetherking(msgObj, buttonEl) {
            buttonEl.innerText = "⏳";
            buttonEl.disabled = true;
            
            const userSignet = localStorage.getItem("user-signet") || "Unknown Soul";
            const payload = {
                type: 'oracle_submission',
                text: `[FROM ORACLE CHAT - User: ${userSignet}]\n\n${msgObj.rawText || "Attached Vision"}`,
                fileData: msgObj.imageBase64 || null,
                fileType: msgObj.imageBase64 ? 'image/jpeg' : null
            };

            try {
                const response = await fetch('/api/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) throw new Error("Failed");
                
                buttonEl.innerText = "✅ SENT";
                buttonEl.style.color = "#4CAF50";
            } catch (err) {
                buttonEl.innerText = "❌ ERR";
                buttonEl.style.color = "var(--blood-red)";
                console.error("Transmission error:", err);
            }
        }

        // --- RENDER CHAT & RELICS ---
        function renderHistory() {
            if (!chatLog) return;
            chatLog.innerHTML = "";
            chatHistory.forEach((msg, index) => {
                const bubble = document.createElement("div");
                bubble.className = `chat-bubble ${msg.sender}-bubble`;
                bubble.style.position = "relative";
                
                let contentHTML = "";
                if (msg.imageBase64) {
                    contentHTML += `<img src="${msg.imageBase64}" style="width:100%; border:1px solid #ff3333; border-radius:4px; margin-bottom:8px;"><br>`;
                }
                contentHTML += msg.text;
                bubble.innerHTML = contentHTML;

                // Action Buttons (Save to Oracle & Send to Telegram)
                if (msg.sender === 'user' || msg.sender === 'oracle') {
                    const btnContainer = document.createElement("div");
                    btnContainer.style.position = "absolute";
                    btnContainer.style.top = "5px";
                    btnContainer.style.right = "5px";
                    btnContainer.style.display = "flex";
                    btnContainer.style.gap = "5px";

                    // Save Relic Button
                    if (!msg.saved) {
                        const saveBtn = document.createElement("button");
                        saveBtn.innerHTML = "💾";
                        saveBtn.title = "Save as Relic";
                        saveBtn.style.background = "transparent";
                        saveBtn.style.border = "none";
                        saveBtn.style.cursor = "pointer";
                        saveBtn.style.filter = "grayscale(100%)";
                        saveBtn.style.opacity = "0.4";
                        
                        saveBtn.addEventListener("mouseenter", () => { saveBtn.style.opacity = "1"; saveBtn.style.filter = "none"; });
                        saveBtn.addEventListener("mouseleave", () => { saveBtn.style.opacity = "0.4"; saveBtn.style.filter = "grayscale(100%)"; });
                        
                        saveBtn.addEventListener("click", () => {
                            chatHistory[index].saved = true;
                            localStorage.setItem("oracle-chat-history", JSON.stringify(chatHistory));
                            renderHistory();
                            renderRelics();
                        });
                        btnContainer.appendChild(saveBtn);
                    } else {
                        const badge = document.createElement("span");
                        badge.innerHTML = "🌟";
                        badge.title = "Bound to Relics";
                        badge.style.fontSize = "0.8rem";
                        btnContainer.appendChild(badge);
                    }

                    // Transmit Button
                    const transmitBtn = document.createElement("button");
                    transmitBtn.innerHTML = "📤";
                    transmitBtn.title = "Transmit to Netherking";
                    transmitBtn.style.background = "transparent";
                    transmitBtn.style.border = "none";
                    transmitBtn.style.cursor = "pointer";
                    transmitBtn.style.opacity = "0.6";
                    
                    transmitBtn.addEventListener("mouseenter", () => transmitBtn.style.opacity = "1");
                    transmitBtn.addEventListener("mouseleave", () => transmitBtn.style.opacity = "0.6");
                    
                    transmitBtn.addEventListener("click", () => transmitToNetherking(msg, transmitBtn));
                    btnContainer.appendChild(transmitBtn);

                    bubble.appendChild(btnContainer);
                }

                chatLog.appendChild(bubble);
            });
            if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function renderRelics() {
            const relicsList = document.getElementById("relics-list");
            if (!relicsList) return;
            relicsList.innerHTML = "";
            const saved = chatHistory.filter(m => m.saved);
            
            if (saved.length === 0) {
                relicsList.innerHTML = `<p style="color:#555; padding:10px; font-size:0.8rem;">No relics preserved yet.</p>`;
                return;
            }
            
            saved.forEach((msg, i) => {
                const item = document.createElement("div");
                item.className = "relic-item";
                item.style.padding = "10px";
                item.style.marginBottom = "8px";
                item.style.border = "1px solid #333";
                item.style.background = "#0a0a0a";
                item.style.borderRadius = "4px";
                
                let snippet = msg.text.substring(0, 60) + (msg.text.length > 60 ? "..." : "");
                if (msg.imageBase64) {
                    snippet = `<img src="${msg.imageBase64}" style="width:100%; border:1px solid #555; border-radius:4px; margin-bottom:5px;">` + snippet;
                }
                
                item.innerHTML = `<div style="color:#d4af37; font-size:0.75rem; margin-bottom:5px; font-family:var(--font-heading);">[Relic #${i+1}]</div>
                                  <div style="font-size:0.85rem; color:#ddd; word-wrap:break-word;">${snippet}</div>
                                  <button class="remove-relic-btn" style="margin-top:8px; background:#222; color:#ff3333; border:1px solid #444; padding:4px 8px; font-size:0.7rem; cursor:pointer; border-radius:3px;">Unbind Relic</button>`;
                
                item.querySelector(".remove-relic-btn").addEventListener("click", () => {
                    const targetIndex = chatHistory.findIndex(m => m === msg);
                    if (targetIndex > -1) {
                        chatHistory[targetIndex].saved = false;
                        localStorage.setItem("oracle-chat-history", JSON.stringify(chatHistory));
                        renderHistory();
                        renderRelics();
                    }
                });

                relicsList.appendChild(item);
            });
        }

        function commitToChatLog(sender, text, isSaved = false, base64 = null, rawText = "") {
            chatHistory.push({ sender: sender, text: text, saved: isSaved, imageBase64: base64, rawText: rawText });
            if (chatHistory.length > 200) chatHistory.shift(); 
            localStorage.setItem("oracle-chat-history", JSON.stringify(chatHistory));
            renderHistory();
            renderRelics();
        }

        // --- INPUT PROCESSING (Archive Fetching vs Submissions) ---
        function processInput() {
            if (!promptBox) return;
            const rawQuery = promptBox.value.trim();
            
            if (!rawQuery && !pendingImageBase64) return;

            if (rawQuery.toLowerCase() === "clear") { 
                chatHistory = []; 
                localStorage.removeItem("oracle-chat-history"); 
                renderHistory(); 
                renderRelics(); 
                promptBox.value = "";
                return; 
            }
            
            const userSignet = localStorage.getItem("user-signet") || "Unknown Soul";

            // 1. Check if it's an Archive Fetch Command (e.g., "otm 1", "tape 5")
            const archiveMatch = rawQuery.match(/^(otm|cleave|tape|other)\s+(\d+)$/i);
            
            if (archiveMatch && !pendingImageBase64) {
                // It is a fetch command
                const folder = archiveMatch[1].charAt(0).toUpperCase() + archiveMatch[1].slice(1).toLowerCase();
                const num = archiveMatch[2];
                const imgSrc = `gallery/${folder}/${num}.jpg`;
                
                commitToChatLog('user', `<strong>${userSignet}:</strong> ${rawQuery}`);
                
                // Simulate Archive Pull
                setTimeout(() => {
                    const responseHTML = `<img src="${imgSrc}" onerror="this.src='https://via.placeholder.com/400x500/111/ff3333?text=Soul+Not+Found'" style="width:100%; border:1px solid #ff3333; border-radius:4px; margin-bottom:8px;"><br><em>Archive Retrieved: ${folder} - Soul ${num}</em>`;
                    commitToChatLog('oracle', responseHTML, false, null, `Archive Pulled: ${folder} ${num}`);
                }, 500);

            } else {
                // 2. Standard Content Submission (Text or Perchance Image)
                let displayHTML = `<strong>${userSignet}:</strong> ${rawQuery.replace(/\n/g, "<br>")}`;
                commitToChatLog('user', displayHTML, false, pendingImageBase64, rawQuery);
            }
            
            // Reset Input
            promptBox.value = "";
            promptBox.style.height = "auto";
            pendingImageBase64 = null;
            pendingImageMime = null;
            if (fileUpload) fileUpload.value = "";
        }

        if (sendBtn) sendBtn.addEventListener("click", processInput);
        if (promptBox) {
            promptBox.addEventListener("input", function() { 
                this.style.height = "auto"; 
                this.style.height = (this.scrollHeight) + "px"; 
            });
            promptBox.addEventListener("keydown", (e) => { 
                if (e.key === "Enter" && !e.shiftKey) { 
                    e.preventDefault(); 
                    processInput(); 
                }
            });
        }
        
        // Initial setup info bubble
        if (chatHistory.length === 0) {
            commitToChatLog('system', `<strong>THE PORTAL IS OPEN</strong><br><br>• Click the portals above to visit the Perchance Generators.<br>• Bring your results here to save them as Relics (💾).<br>• Transmit them directly to the Netherking (📤).<br>• Or fetch archives directly by typing commands like <code>otm 1</code> or <code>tape 5</code>.`);
        } else {
            renderHistory();
            renderRelics(); 
        }
    });
            }
            
