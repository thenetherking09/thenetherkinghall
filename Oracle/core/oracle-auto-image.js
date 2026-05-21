// ============================================================================
// ORACLE DATABASE: CORE - AUTO-IMAGE FETCHER
// Path: Oracle/core/oracle-auto-image.js
// Scale: DYNAMIC STATE-MATCHING ASSET LOADER
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.assets = {
    naked_only: [],
    naked_bound: [],
    naked_bound_gag: [],
    saree: [],
    saree_bound_gag: [],
    dupatta_veil: []
};

// --- 1. BACKGROUND ASSET PROBER ---
// Silently loads images from 1.jpg upwards into memory until it hits a missing file.
window.OracleDB.probeAssets = function() {
    const folders = Object.keys(window.OracleDB.assets);
    
    folders.forEach(folder => {
        let checkId = 1;
        let missCount = 0; // Allows for small gaps in naming (e.g., 1.jpg, 3.jpg)

        const checkNext = () => {
            if (checkId > 500 || missCount > 3) return; // Stop probing if too many misses

            const img = new Image();
            const path = `Oracle/assets/${folder}/${checkId}.jpg`;
            
            img.onload = () => {
                window.OracleDB.assets[folder].push(path);
                checkId++;
                missCount = 0; // Reset miss count on success
                checkNext();
            };
            img.onerror = () => {
                checkId++;
                missCount++;
                checkNext();
            };
            img.src = path;
        };
        checkNext();
    });
};

// Kick off the background probing immediately
window.OracleDB.probeAssets();

// --- 2. STATE-MATCHING LOGIC ---
// Reads the subject's variables and picks the correct image folder.
window.OracleDB.getAutoImage = function(sub) {
    if (!sub) return null;

    let category = "naked_only"; // Default fallback

    // Determine wardrobe state from text
    const attireText = (sub.attire || "").toLowerCase();
    const hasSaree = attireText.includes("saree") || attireText.includes("silk") || attireText.includes("cotton");
    const hasVeil = attireText.includes("drape") || attireText.includes("dupatta") || attireText.includes("pallu");

    // Decision Tree
    if (hasVeil && sub.isBound && sub.isGagged) {
        category = "dupatta_veil";
    } else if (hasSaree && sub.isBound && sub.isGagged) {
        category = "saree_bound_gag";
    } else if (hasSaree && !sub.isBound && !sub.isGagged) {
        category = "saree";
    } else if (!hasSaree && sub.isBound && sub.isGagged) {
        category = "naked_bound_gag";
    } else if (!hasSaree && sub.isBound && !sub.isGagged) {
        category = "naked_bound";
    } else if (!hasSaree && !sub.isBound && !sub.isGagged) {
        category = "naked_only";
    }

    const availableImages = window.OracleDB.assets[category];
    
    // Pick a random image from the matching category, if any have loaded
    if (availableImages && availableImages.length > 0) {
        return availableImages[Math.floor(Math.random() * availableImages.length)];
    }
    
    return null; // Return null if no images are in the folder yet
};

console.log("Oracle DB: oracle-auto-image.js loaded. (Background Prober Active)");
          
