// ============================================================================
// ORACLE DATABASE: CORE - DYNAMIC AUDIO SOUNDSCAPE ENGINE
// Path: Oracle/core/oracle-audio-fx.js
// Scale: TEXT-TO-AUDIO TRIGGERS & PITCH SHIFTING
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.audio = window.OracleDB.audio || {};

window.OracleDB.audio.engine = {
    
    // --- 1. THE AUDIO TRACKS (Map to your /bg/ or /assets/ folder) ---
    tracks: {
        bgm_drone: new Audio("bg/ambient-drone.mp3"),
        sfx_metal: new Audio("bg/metal-shing.mp3"),
        sfx_page: new Audio("bg/page-turn.mp3"),
        // Placeholders for expanded audio files we discussed:
        sfx_clink: new Audio("bg/bangle-clink.mp3"), 
        sfx_ghungroo: new Audio("bg/ghungroo-steps.mp3"),
        loop_breath: new Audio("bg/muffled-breath.mp3"),
        loop_rain: new Audio("bg/monsoon-rain.mp3")
    },

    // --- 2. THE TEXT-TO-AUDIO DICTIONARY ---
    // If these words appear in the generated story, the SFX fires.
    sfx_dictionary: [
        {
            keywords: ["chain", "iron", "metal", "shackle", "copper handa"],
            track: "sfx_metal",
            volume: 0.8
        },
        {
            keywords: ["bangle", "chooda", "glass", "wrist", "clink"],
            track: "sfx_clink",
            volume: 1.0
        },
        {
            keywords: ["step", "walk", "temple", "ghungroo", "anklet", "march"],
            track: "sfx_ghungroo",
            volume: 0.9
        },
        {
            keywords: ["monsoon", "rain", "damp"],
            track: "loop_rain",
            volume: 0.4
        }
    ],

    // --- 3. INITIALIZATION & LOOPING TRACKS ---
    init: function() {
        this.tracks.bgm_drone.loop = true;
        this.tracks.bgm_drone.volume = 0.3;
        this.tracks.loop_breath.loop = true;
        this.tracks.loop_breath.volume = 0.0; // Hidden until gagged
        this.tracks.loop_rain.loop = true;
        
        // Start background ambient noise on first click (Browser policy)
        document.body.addEventListener("click", () => {
            if (this.tracks.bgm_drone.paused) {
                this.tracks.bgm_drone.play().catch(e => console.log("Audio blocked by browser."));
            }
        }, { once: true });
    },

    // --- 4. THE TEXT SCANNER (Triggered every chat message) ---
    scanAndPlay: function(text, devotionLevel, isGagged) {
        const lowerText = text.toLowerCase();
        
        // 1. Calculate Devotion Tempo (Rage = Fast, Devoted = Slow)
        // Devotion 0 -> Playback 1.5x. Devotion 100 -> Playback 0.8x.
        let tempo = 1.5 - ((devotionLevel / 100) * 0.7);
        if (tempo < 0.8) tempo = 0.8; 

        // 2. Scan for SFX keywords
        this.sfx_dictionary.forEach(mapping => {
            const matchFound = mapping.keywords.some(keyword => lowerText.includes(keyword));
            if (matchFound) {
                const sfx = this.tracks[mapping.track];
                if (sfx) {
                    // Reset and play
                    sfx.currentTime = 0;
                    sfx.playbackRate = tempo; 
                    sfx.volume = mapping.volume;
                    sfx.play().catch(e => console.log("SFX Playback failed", e));
                }
            }
        });

        // 3. Gag State / Breath Crossfading
        if (isGagged) {
            // Fade out the drone, fade in the heavy muffled breathing
            this.crossfade(this.tracks.bgm_drone, 0.1);
            this.tracks.loop_breath.playbackRate = tempo; // Fast panting if terrified!
            this.tracks.loop_breath.play().catch(e => {});
            this.crossfade(this.tracks.loop_breath, 0.6);
        } else {
            // Fade out breath, fade in drone
            this.crossfade(this.tracks.loop_breath, 0.0, () => this.tracks.loop_breath.pause());
            this.crossfade(this.tracks.bgm_drone, 0.4);
        }
    },

    // --- 5. SMOOTH CROSSFADING HELPER ---
    crossfade: function(audioObj, targetVolume, callback) {
        if (!audioObj) return;
        const step = targetVolume > audioObj.volume ? 0.05 : -0.05;
        
        const fadeInterval = setInterval(() => {
            let newVol = audioObj.volume + step;
            if ((step > 0 && newVol >= targetVolume) || (step < 0 && newVol <= targetVolume)) {
                audioObj.volume = targetVolume;
                clearInterval(fadeInterval);
                if (callback) callback();
            } else {
                audioObj.volume = newVol;
            }
        }, 100);
    }
};

// Initialize the audio engine when the file loads
window.OracleDB.audio.engine.init();
console.log("Oracle DB: oracle-audio-fx.js loaded. (Dynamic Soundscape Active)");
          
