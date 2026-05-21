// ============================================================================
// ORACLE DATABASE: BUREAUCRATIC RESTRAINT - RED TAPE & AUDITS
// Path: Oracle/bureaucratic_restraint/oracle-red-tape.js
// Scale: MASSIVE EXPANSION (Minigames & Systemic Locks)
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.bureaucratic = window.OracleDB.bureaucratic || {};

window.OracleDB.bureaucratic.red_tape = {
    
    // --- 1. THE AUDIT MINIGAMES (High Stakes Inspections) ---
    audits: {
        broken_bangle: {
            name: "The Broken Bangle Audit (Chooda Pariksha)",
            description: "A sudden, brutal inspection by the Wada Matriarch. She checks the captive's wrists for broken green glass, which proves she has been secretly struggling against the ropes.",
            success_state: "Her bangles are intact. The Matriarch nods coldly, accepting her submission.",
            failure_state: "Glass shards are found pressed into her skin. The punishment is the 'Pev Isolation'—she is thrown into the pitch-black grain cellar.",
            bribe_option: "You can slip the auditing Kaki two gold coins to ignore the shattered glass."
        },
        aarti_breath_test: {
            name: "The Aarti Breath Test",
            description: "During evening prayers, a lit Diya (oil lamp) is held inches from her face. If her gagged breathing is too frantic, the flame flickers, proving her lack of Devotion.",
            success_state: "She controls her panic. The flame burns steady. Her Devotion level increases.",
            failure_state: "Her violent nasal exhalations blow out the holy flame. A massive taboo. She is immediately subjected to the 'Tulsi Sentinel' binding.",
            bribe_option: "Impossible. The gods are watching."
        },
        ghungroo_march: {
            name: "The Ghungroo Audit",
            description: "She is forced to walk across the basalt courtyard. The elders listen blindly to the rhythm of her silver anklet bells.",
            success_state: "A slow, measured *clink-clink*. Her leg-tethers hold her perfectly in check.",
            failure_state: "An uneven, frantic ringing. She stumbled. The 'Invisible Leash' is immediately attached from her Nath to her wrists.",
            bribe_option: "You can intentionally oil the bells to dampen the sound."
        },
        gossip_tithing: {
            name: "Gossip Tithing (The Nosey Padosi)",
            description: "The neighbor spots the captive's heavy bindings through the window. She demands payment in the form of Wada secrets to keep quiet.",
            success_state: "You feed her a fake scandal about House 2. She leaves satisfied.",
            failure_state: "She screams the secret to the village square. The family's 'Izzat' (honor) drops to zero.",
            bribe_option: "A heavy silk Paithani saree buys her absolute silence."
        }
    },

    // --- 2. THE SYSTEMIC LOCKS (Movement Restraints) ---
    systemic_hurdles: [
        {
            trigger: "Lunch Break Trap",
            lore: "Between 1:00 PM and 4:00 PM, the Wada shuts down completely for rest. No locks are opened. No food is served.",
            effect: "If a captive is tied to the Chakki when the clock strikes 1:00, she must remain there, sweating in the afternoon 'Loo' winds, until 4:00 PM."
        },
        {
            trigger: "Signature Paralysis",
            lore: "To move a high-status captive from the Wada to the Temple requires the physical thumbprint of the Karta (Eldest).",
            effect: "You cannot execute the 'Temple Walk' command without first forging a signature or stealing the Matriarch's signet ring."
        },
        {
            trigger: "The Ekadashi Fast",
            lore: "On the 11th lunar day, absolute fasting is mandatory. The physical weakness is profound.",
            effect: "Her Stamina cap is reduced to 20%. She cannot struggle, but her Devotion drops due to sheer misery."
        },
        {
            trigger: "Jurisdiction Deadzone",
            lore: "The inner rooms of the Wada are completely immune to outside law. The Patil (Village Chief) will not cross the threshold.",
            effect: "She realizes calling for help is completely useless. Her internal Marathi monologue turns devastatingly bleak."
        }
    ],

    // --- 3. BRIBES & WADA CURRENCY ---
    bribes_and_currency: [
        "A quiet envelope of 500 Rupee notes slipped to the guard.",
        "A heavy gold 'Kolhapuri Saaj' necklace traded for a blind eye.",
        "The promise of an arranged marriage pipeline for the guard's daughter.",
        "A brass tin of pure, unadulterated saffron."
    ]
};

console.log("Oracle DB: oracle-red-tape.js loaded. (Audit Minigames Active)");
          
