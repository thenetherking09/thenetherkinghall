// ============================================================================
// ORACLE DATABASE: IDENTITY - HOUSEHOLDS, KINSHIP & DEVOTION BONDS
// Path: Oracle/identity/oracle-kinship.js
// Scale: MASSIVE EXPANSION (Maharashtrian Gothic Core)
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.identity = window.OracleDB.identity || {};

window.OracleDB.identity.kinship = {

    // --- 1. THE DEMOGRAPHICS (The 10 Households) ---
    households: [
        "House 1 (The Wada): Home to Ananya, the strict MIL Saraswati, and the observant sister Neha. A place of deep, old power.",
        "House 2 (The Sarpanch): Governed by Varsha and her daughters-in-law. Political weight means nothing against the ropes.",
        "House 3 (The Weavers): Leela and Kavita's domain, where the very ropes used to bind the village are spun.",
        "House 7 (The Devotees): Bhavna and Tara's household, where submission to the bindings is treated as a divine ritual.",
        "House 10 (The Outsiders): Sneha and Zara, struggling to adapt to the brutal, inescapable traditions of the village."
    ],

    // --- 2. THE EQUALITY OF SILENCE (Power Dynamics) ---
    power_dynamics: [
        "Despite being the Matriarch, she is subjected to the exact same brutal bindings as the youngest daughter-in-law.",
        "There is no ultimate authority here; the ropes are the true masters, and everyone is equally helpless beneath them.",
        "The traditional hierarchy is shattered. A mother and daughter lie bound side-by-side, sharing the exact same muffled humiliation.",
        "Ananya herself is dragged to the courtyard, her high status completely erased by the thick black cloth crushing her lips."
    ],

    // --- 3. THE ORIENTATION SHIFT (Rage -> Submission -> Devotion) ---
    devotion_progression: [
        "RAGE: She fights the ropes with feral, exhausting fury, her eyes blazing with absolute defiance and hatred.",
        "SUBMISSION: The exhaustion sets in. Her struggles cease. She accepts the gag, her eyes lowering to the stone floor in defeat.",
        "DEVOTION: A profound, psychological break. The bindings are no longer a punishment, but a desperate, terrifying comfort.",
        "PAIR-BONDING: Stripped of all other connections, a deep, inescapable devotion forms between the Captor and the Captive."
    ],

    // --- 4. INTIMATE RITUALS OF THE BOUND ---
    intimate_rituals: [
        "The Gag-Kiss: Bound face-to-face, they press their saliva-soaked, cloth-covered mouths together in a suffocating display of affection.",
        "Protective Binding: Before attempting to sleep, one carefully tightens the other's ropes out of a twisted, deep-seated devotion.",
        "The Shared Silence: Lying heavily bound together in the dark, communicating entirely through the rhythm of their breathing and the friction of their ropes.",
        "She refuses to sleep unbound; the sheer absence of the heavy ropes and the crotch-harness gives her terrifying insomnia."
    ],
    
    
    family_structures: [
        "a massive Joint Family, where twenty relatives live under one sprawling roof",
        "a Nuclear Family, suffocated by the constant surveillance of nosy neighbors",
        "a fractured household, deeply divided over an ancestral property dispute"
    ],
    matriarchal_power: [
        "The Dadi (Grandmother) controls the household entirely; her silence is terrifying.",
        "The Mother-in-Law holds the keys to the pantry and the family's gold, rendering the younger women powerless.",
        "The unmarried Bua (Aunt) acts as the family spy, watching every movement with deep suspicion."
    ],
    patriarchal_restraint: [
        "The Karta (Eldest Male) enforces strict curfews and absolute obedience.",
        "Her husband is too terrified of his own mother to ever defend her.",
        "Her older brother dictates who she is allowed to speak to and where she can go."
    ],
    loyalty_conflicts: [
        "She is hopelessly torn between protecting her 'Maika' (birth home) and surviving her 'Sasural' (marital home).",
        "A single misstep will ruin her younger sister's marriage prospects forever."
    ]
};

console.log("Oracle DB: oracle-kinship.js loaded.");
