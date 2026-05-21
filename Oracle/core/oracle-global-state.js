/window.OracleDB = window.OracleDB || {};
window.OracleDB.core = window.OracleDB.core || {};
window.OracleDB.core.global_state = {
    epochs: [
        { era: "Pre-Independence (1930s)", vibe: "Tense, colonial oppression, secret rebellions hidden in Haveli basements" },
        { era: "Post-Partition (1950s)", vibe: "Trauma, rebuilding, scarcity, intense focus on family survival" },
        { era: "The Emergency (1970s)", vibe: "Paranoia, police raids, forced sterilizations, absolute state control" },
        { era: "Liberalization (1990s)", vibe: "Cultural clash, cable TV arriving, conservative backlash against modernism" },
        { era: "Modern Digital (2020s)", vibe: "Hyper-connected, surveillance state, WhatsApp gossip spreading like wildfire" }
    ],
    national_moods: [
        "Jubilant but chaotic (Approaching a major election)",
        "Tense and polarized (Recent communal riots in the neighboring district)",
        "Apathetic and exhausted (Peak summer, massive inflation)",
        "Suspicious and hyper-conservative (A recent local scandal has elders on high alert)"
    ],
    epochs: [
        { era: "Pre-Independence (1930s)", vibe: "Tense, colonial oppression, secret rebellions hidden in Haveli basements", risk_level: "Lethal" },
        { era: "Post-Partition (1950s)", vibe: "Trauma, rebuilding, scarcity, intense focus on family survival", risk_level: "High" },
        { era: "The Emergency (1970s)", vibe: "Paranoia, police raids, forced sterilizations, absolute state control", risk_level: "Extreme" },
        { era: "Liberalization (1990s)", vibe: "Cultural clash, cable TV arriving, conservative backlash against modernism", risk_level: "Moderate" },
        { era: "Modern Digital (2020s)", vibe: "Hyper-connected, surveillance state, WhatsApp gossip spreading like wildfire", risk_level: "Socially Lethal" }
    ],
    national_moods: [
        "Jubilant but chaotic (Approaching a major election)",
        "Tense and polarized (Recent communal riots in the neighboring district)",
        "Apathetic and exhausted (Peak summer, massive inflation)",
        "Festive and forgiving (Diwali/Eid bonus season)",
        "Suspicious and hyper-conservative (A recent local scandal has elders on high alert)"
    ],
    gdp_economy_states: {
        upper_class: "Generational wealth shielding them from consequences; capable of bribing local police entirely.",
        middle_class: "Hyper-focused on saving face; a single scandal will destroy three generations of reputation.",
        lower_class: "Survival mode; the law is a tool of oppression, and justice is bought."
    },
    ruling_party_vibes: [
        "Orthodox/Right-Wing: Moral policing is active. Unmarried couples are harassed. Traditional attire is mandated.",
        "Bureaucratic/Centrist: Red tape rules everything. Corruption is quiet but absolute.",
        "Feudal/Regional: The local Zamindar or MLA's word is law, superseding any official police presence."
    ]
};

console.log("Oracle DB: oracle-global-state.js loaded.")
