document.addEventListener("DOMContentLoaded", () => {
    
    const searchStyle = document.createElement('style');
    searchStyle.innerHTML = `
        #archive-grid.is-searching .archive-item { display: none !important; }
        #archive-grid.is-searching .archive-item.search-match { display: block !important; }
    `;
    document.head.appendChild(searchStyle);

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

    const folderSequence = ['Otm', 'Cleave', 'Tape', 'Other'];
    const previewData = {}; 
    
    const folderContainer = document.getElementById("folder-view-container");
    const archiveContainer = document.getElementById("open-archive-container");
    const archiveGrid = document.getElementById("archive-grid");
    const searchBar = document.getElementById("archive-search");
    
    let currentFolder = '';
    let currentImages = []; 
    let currentTheaterIndex = 0;
    let currentLoadSession = 0; 

    function loadFolderMetadata(folder) {
        const scriptId = `meta-script-${folder}`;
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = `gallery/${folder}/metadata.js`;
            script.id = scriptId;
            document.head.appendChild(script);
        }
    }

    async function initGallery() {
        for (const folder of folderSequence) {
            previewData[folder] = { images: [], currentCycleIndex: 0 };
            
            const card = document.createElement("div");
            card.className = "folder-card interactive";
            card.innerHTML = `
                <h2 class="folder-title">${folder.toUpperCase()}</h2>
                <div class="preview-grid" id="preview-${folder}">
                    <div class="preview-img-container"><img id="prev-${folder}-0" src="bg/index-bg.webp"></div>
                    <div class="preview-img-container"><img id="prev-${folder}-1" src="bg/index-bg.webp"></div>
                    <div class="preview-img-container"><img id="prev-${folder}-2" src="bg/index-bg.webp"></div>
                    <div class="preview-img-container"><img id="prev-${folder}-3" src="bg/index-bg.webp"></div>
                </div>
            `;
            card.addEventListener("click", () => openArchive(folder));
            folderContainer.appendChild(card);

            probeImages(folder);
        }
        
        setInterval(cyclePreviews, 25000);
    }

    function probeImages(folder) {
        let checkId = 1;
        let found = 0;
        
        const checkNext = () => {
            if (found >= 20 || checkId > 100) return; 
            
            const img = new Image();
            const path = `gallery/${folder}/${checkId}.jpg`;
            
            img.onload = () => {
                previewData[folder].images.push(path);
                
                if (found < 4) {
                    const previewImg = document.getElementById(`prev-${folder}-${found}`);
                    if (previewImg) {
                        previewImg.style.opacity = 0; 
                        setTimeout(() => {
                            previewImg.src = path;
                            previewImg.style.opacity = 1;
                        }, 200);
                    }
                }
                found++; checkId++; checkNext();
            };
            img.onerror = () => { checkId++; checkNext(); };
            img.src = path;
        };
        checkNext();
    }

    function cyclePreviews() {
        folderSequence.forEach(folder => {
            const data = previewData[folder];
            if (data.images.length < 4) return; 

            data.currentCycleIndex += 4;
            if (data.currentCycleIndex >= data.images.length) {
                data.currentCycleIndex = 0;
            }

            for (let i = 0; i < 4; i++) {
                const imgEl = document.getElementById(`prev-${folder}-${i}`);
                if (!imgEl) continue;
                
                const nextImgPath = data.images[data.currentCycleIndex + i] || data.images[i]; 
                
                imgEl.style.opacity = 0;
                setTimeout(() => {
                    imgEl.src = nextImgPath;
                    imgEl.style.opacity = 1;
                }, 1000); 
            }
        });
    }

    function openArchive(folder) {
        currentLoadSession++;
        currentFolder = folder;
        
        loadFolderMetadata(folder);
        
        document.getElementById("current-folder-name").innerText = `SEAL: ${folder.toUpperCase()}`;
        folderContainer.classList.add("hidden");
        archiveContainer.classList.remove("hidden");
        document.querySelector(".gallery-header").classList.add("hidden");
        
        searchBar.value = '';
        archiveGrid.classList.remove("is-searching");
        
        loadFullGrid(folder);
    }

    document.getElementById("close-archive").addEventListener("click", () => {
        currentLoadSession++; 
        archiveContainer.classList.add("hidden");
        folderContainer.classList.remove("hidden");
        document.querySelector(".gallery-header").classList.remove("hidden");
        archiveGrid.innerHTML = ''; 
    });

    function loadFullGrid(folder) {
        archiveGrid.innerHTML = '';
        currentImages = [];
        let i = 1;
        const activeSession = currentLoadSession;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('img');
                    img.src = img.getAttribute('data-src');
                    img.onload = () => entry.target.classList.add('loaded');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: "100px" });

        const loadNext = () => {
            if (activeSession !== currentLoadSession) return; 
            if (i > 150) return; 
            
            const currentI = i; 
            const imgPath = `gallery/${folder}/${currentI}.jpg`;
            const probe = new Image();
            
            probe.onload = () => {
                if (activeSession !== currentLoadSession) return;
                
                currentImages.push(imgPath);
                const item = document.createElement("div");
                item.className = "archive-item interactive";
                item.setAttribute("data-id", currentI.toString());
                item.innerHTML = `
                    <img data-src="${imgPath}" alt="${folder} ${currentI}">
                    <div class="item-id-tag">ID: ${currentI}</div>
                `;
                
                const indexToPass = currentImages.length - 1;
                item.addEventListener("click", () => openTheater(indexToPass));
                
                const term = searchBar.value.trim();
                if (term === currentI.toString()) {
                    item.classList.add("search-match");
                }
                
                archiveGrid.appendChild(item);
                observer.observe(item);
                
                i++;
                loadNext();
            };
            probe.onerror = () => { i++; loadNext(); }; 
            probe.src = imgPath;
        };
        loadNext();
    }

    function applySearchFilter() {
        const term = searchBar.value.trim();
        if (term === "") {
            archiveGrid.classList.remove("is-searching");
        } else {
            archiveGrid.classList.add("is-searching");
            document.querySelectorAll(".archive-item").forEach(item => {
                if (item.getAttribute("data-id") === term) {
                    item.classList.add("search-match");
                } else {
                    item.classList.remove("search-match");
                }
            });
        }
    }

    searchBar.addEventListener("input", applySearchFilter);
    searchBar.addEventListener("keyup", applySearchFilter);

    const theaterModal = document.getElementById("theater-modal");
    const theaterImg = document.getElementById("theater-image");
    
    function openTheater(index) {
        currentTheaterIndex = index;
        updateTheaterImage();
        theaterModal.classList.remove("hidden");
    }

    function updateTheaterImage() {
        const path = currentImages[currentTheaterIndex];
        theaterImg.src = path;
        const id = path.split('/').pop().split('.')[0];
        
        document.getElementById("meta-name").innerText = `${currentFolder.toUpperCase()} PLATE // ${id}`;
        
        // Dynamic Metadata Text Loader inside image update block
        const descEl = document.getElementById("meta-desc");
        if (window.ArchiveMetadata && window.ArchiveMetadata[currentFolder] && window.ArchiveMetadata[currentFolder][id]) {
            descEl.innerText = window.ArchiveMetadata[currentFolder][id];
        } else {
            descEl.innerText = "[No additional metadata recorded]";
        }
    }

    document.getElementById("theater-close").addEventListener("click", () => theaterModal.classList.add("hidden"));
    
    function showNext() {
        if (currentTheaterIndex < currentImages.length - 1) {
            currentTheaterIndex++;
            updateTheaterImage();
        }
    }
    function showPrev() {
        if (currentTheaterIndex > 0) {
            currentTheaterIndex--;
            updateTheaterImage();
        }
    }

    document.getElementById("theater-next").addEventListener("click", showNext);
    document.getElementById("theater-prev").addEventListener("click", showPrev);

    document.addEventListener("keydown", (e) => {
        if (theaterModal.classList.contains("hidden")) return;
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") theaterModal.classList.add("hidden");
    });

    let touchstartX = 0;
    let touchendX = 0;

    theaterModal.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, {passive: true});

    theaterModal.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50; 
        if (touchendX < touchstartX - threshold) showNext(); 
        if (touchendX > touchstartX + threshold) showPrev(); 
    }

    document.getElementById("bind-soul-btn").addEventListener("click", () => {
        const path = currentImages[currentTheaterIndex];
        let boundSouls = JSON.parse(localStorage.getItem("grimoire-souls")) || [];
        
        if (boundSouls.length >= 20) {
            alert("GRIMOIRE FULL. UNBIND SOULS FIRST.");
            return;
        }
        if (!boundSouls.includes(path)) {
            boundSouls.push(path);
            localStorage.setItem("grimoire-souls", JSON.stringify(boundSouls));
            
            const btn = document.getElementById("bind-soul-btn");
            btn.innerText = "SOUL BOUND";
            btn.style.background = "#333";
            setTimeout(() => { btn.innerText = "BIND SOUL"; btn.style.background = "var(--blood-red)"; }, 2000);
            
            const pathParts = path.split('/');
            const activeFolder = pathParts.length > 1 ? pathParts[1] : currentFolder;
            const activeId = path.split('/').pop().split('.')[0];

            if (typeof window.trackUserAction === "function") {
                window.trackUserAction('SOUL BOUND', `A user has bound a soul.\nSeal: ${activeFolder.toUpperCase()}\nID: ${activeId}`);
            }
            
            renderGrimoire();
        }
    });

    // --- TELEGRAM TRANSMISSION ---
    const sendTelegramBtn = document.getElementById("send-telegram-btn");
    if (sendTelegramBtn) {
        sendTelegramBtn.addEventListener("click", async () => {
            const btn = document.getElementById("send-telegram-btn");
            btn.innerText = "TRANSMITTING...";
            btn.disabled = true;

            try {
                const path = currentImages[currentTheaterIndex];
                const activeId = path.split('/').pop().split('.')[0];
                
                let metaText = `${currentFolder.toUpperCase()}#${activeId}\n[No metadata provided]`;
                if (window.ArchiveMetadata && window.ArchiveMetadata[currentFolder] && window.ArchiveMetadata[currentFolder][activeId]) {
                    metaText = window.ArchiveMetadata[currentFolder][activeId];
                }

                const signet = localStorage.getItem("user-signet") || "Unknown Soul";
                const caption = `[User: ${signet.toUpperCase()}]\n\n${metaText}`;

                const response = await fetch(path);
                const blob = await response.blob();
                
                const base64Data = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });

                const apiRes = await fetch('/api/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        type: 'gallery_share', 
                        text: caption, 
                        fileData: base64Data, 
                        fileType: blob.type 
                    })
                });

                if (!apiRes.ok) throw new Error("Transmission failed.");
                
                btn.innerText = "SENT TO KING";
                btn.style.background = "#333";
                btn.style.color = "#aaa";

            } catch (err) {
                console.error("Telegram Transmission Error:", err);
                btn.innerText = "TRANSMISSION FAILED";
                btn.style.background = "var(--blood-red)";
                btn.style.color = "#fff";
            }

            setTimeout(() => { 
                btn.innerText = "SEND TO TELEGRAM"; 
                btn.style.background = "transparent"; 
                btn.style.color = "var(--accent-gold)";
                btn.disabled = false;
            }, 3000);
        });
    }

    function renderGrimoire() {
        const grid = document.getElementById("grimoire-grid");
        const countEl = document.getElementById("soul-count");
        if (!grid) return;
        
        let boundSouls = JSON.parse(localStorage.getItem("grimoire-souls")) || [];
        if (countEl) countEl.innerText = boundSouls.length;
        
        grid.innerHTML = "";
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "1fr 1fr";
        grid.style.gap = "15px";

        if (boundSouls.length === 0) {
            grid.innerHTML = "<p style='color:#666; font-size:0.8rem; grid-column: 1 / -1;'>No souls bound yet.</p>";
            return;
        }

        boundSouls.forEach((path, idx) => {
            const img = document.createElement("img");
            img.src = path;
            img.style.width = "100%";
            img.style.border = "1px solid var(--blood-red)";
            img.style.borderRadius = "4px";
            img.style.objectFit = "cover";
            img.style.aspectRatio = "4/5";
            
            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<div style="font-size:0.75rem; color:var(--accent-gold); margin-bottom:5px; font-family: var(--font-heading);">SOUL ${idx+1}</div>`;
            wrapper.appendChild(img);
            
            grid.appendChild(wrapper);
        });
    }

    renderGrimoire();
    initGallery();
});
