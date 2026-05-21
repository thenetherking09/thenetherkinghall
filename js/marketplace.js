document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("submit-btn");
    if(btn) btn.addEventListener("click", () => sendToTelegram('marketplace'));
});

async function compressImage(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1000;
                
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
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

async function sendToTelegram(type) {
    const btn = document.getElementById("submit-btn");
    const status = document.getElementById("status");
    
    // Note: Marketplace uses 'market-text'
    const textElement = document.getElementById("market-text");
    const baseText = textElement ? textElement.value.trim() : "";
    const fileInput = document.getElementById("contact-image"); 
    
    if (!baseText && (!fileInput || !fileInput.files[0])) {
        if (status) {
            status.style.color = "var(--blood-red)";
            status.innerText = "Error: Please provide text or an image/video.";
        }
        return;
    }

    if (btn) {
        btn.innerText = "Transmitting...";
        btn.disabled = true;
    }
    
    if (status) {
        status.style.color = "var(--accent-gold)";
        status.innerText = "Establishing connection...";
    }

    let base64Data = null;
    let mimeType = null;
    const file = fileInput && fileInput.files[0] ? fileInput.files[0] : null;

    if (file) {
        // Enforce 4MB limit
        const maxSize = 4 * 1024 * 1024;
        if (file.size > maxSize) {
            if (status) {
                status.style.color = "var(--blood-red)";
                status.innerText = "Error: File is too large. Maximum size is 4MB.";
            }
            if (btn) {
                btn.innerText = "Submit to Telegram Group";
                btn.disabled = false;
            }
            return;
        }

        mimeType = file.type;
        if (mimeType.startsWith('video/') || mimeType === 'image/gif') {
            base64Data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        } else {
            base64Data = await compressImage(file);
            mimeType = 'image/jpeg';
        }
    }

    try {
        const response = await fetch('/api/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type, text: baseText, fileData: base64Data, fileType: mimeType })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Transmission failed.");
        }
        
        if (status) {
            status.style.color = "#4CAF50";
            status.innerText = "Submitted successfully to the Telegram Group.";
        }
        if (textElement) textElement.value = ""; 
        if (fileInput) fileInput.value = "";
    } catch (err) {
        if (status) {
            status.style.color = "var(--blood-red)";
            status.innerText = "Error: Could not reach the server. (" + err.message + ")";
        }
    } finally {
        if (btn) {
            btn.innerText = "Submit to Telegram Group";
            btn.disabled = false;
        }
    }
                    }
        
