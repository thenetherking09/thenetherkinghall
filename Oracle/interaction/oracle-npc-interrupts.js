// ============================================================================
// ORACLE DATABASE: INTERACTION - NPC INTRUSION ENGINE
// Path: Oracle/interaction/oracle-npc-interrupts.js
// Scale: HOUSEHOLD PARANOIA
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.interaction = window.OracleDB.interaction || {};

window.OracleDB.interaction.npc_interrupts = {
    
    // --- THE ELDERS (High Threat) ---
    the_matriarch: [
        "Suddenly, the heavy teak door creaks open. The Matriarch (Saraswati) steps into the dim light. She doesn't speak. She simply walks over, tests the tension of the crotch-rope with two cold fingers, nods in approval, and walks out.",
        "The Dadi (Grandmother) enters, her walking stick clicking ominously on the stone. She looks at the girl's frantic, tear-stained face, scoffs at her weakness, and tightens the Otm knot at the back of her head."
    ],

    // --- THE PEERS (Psychological Threat) ---
    the_sister_in_law: [
        "Her Sister-in-Law (Meera) peers around the doorframe. Instead of helping, a cruel, vindictive smile spreads across her face. She has waited years to see the 'Ladki Sun' (favorite daughter-in-law) reduced to this.",
        "Another daughter-in-law walks in. She is also heavily bound and gagged. She shuffles over and slumps against the wall next to her, initiating a mandatory 'Shared Silence'."
    ],

    // --- THE OUTSIDERS (Red Tape Threat) ---
    the_nosy_neighbor: [
        "A shadow falls across the barred window. The 'Nosey Padosi' is watching from the adjacent terrace. The captive freezes entirely, knowing that if she struggles and draws attention, the family's 'Izzat' (honor) will be ruined forever.",
        "The distant voice of the Village Patil (Chief) is heard in the courtyard below. The captor immediately covers the girl's gagged mouth with a heavy hand, enforcing absolute, suffocating silence until the footsteps fade."
    ]
};

console.log("Oracle DB: oracle-npc-interrupts.js loaded. (Intrusion Engine Active)");
