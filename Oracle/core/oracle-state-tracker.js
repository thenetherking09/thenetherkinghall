// ============================================================================
// ORACLE DATABASE: CORE - PROGRESSIVE STATE TRACKER
// Path: Oracle/core/oracle-state-tracker.js
// Scale: DYNAMIC PSYCHOLOGY ENGINE
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.core = window.OracleDB.core || {};

window.OracleDB.core.state_tracker = {
    // --- STAGE 1: RAGE (Devotion 0 - 30) ---
    stage_1_rage: {
        behavior: "She is fiercely defiant, fighting the ropes with everything she has.",
        visuals: [
            "Her eyes blaze with pure, unadulterated venom.",
            "She thrashes violently, uncaring as the jute rips the skin from her wrists.",
            "She glares directly at you, refusing the 'Sanskari' conditioning to look away."
        ],
        muffled_sounds: "Furious, guttural growls of 'Mmph-MM!' that shake her entire body."
    },

    // --- STAGE 2: SUBMISSION & TERROR (Devotion 31 - 70) ---
    stage_2_submission: {
        behavior: "The exhaustion sets in. The reality of the Wada has broken her defiance.",
        visuals: [
            "Her eyes dart frantically, wide with hyper-vigilant terror.",
            "She begins to use the 'Eye-Sync' (double-blink), begging desperately with her gaze.",
            "She trembles uncontrollably, her chin dropping to her chest in defeat as tears ruin her Kajal."
        ],
        muffled_sounds: "High-pitched, pathetic whimpers that die uselessly inside the thick cloth."
    },

    // --- STAGE 3: THE DEVOTION SHIFT (Devotion 71 - 100) ---
    stage_3_devotion: {
        behavior: "A profound psychological break. The ropes are no longer a punishment; they are her entire world.",
        visuals: [
            "She leans *into* the restraints, finding a dark, twisted comfort in their unyielding pressure.",
            "When you adjust the gag, she closes her eyes and hums softly, accepting the 'Identity Transfer'.",
            "She looks at the ropes with a glassy, devoted stare, terrified of what she would do without them."
        ],
        muffled_sounds: "A slow, rhythmic, almost meditative nasal breathing. Total acceptance."
    }
};

console.log("Oracle DB: oracle-state-tracker.js loaded. (Devotion Meter Active)");
      
