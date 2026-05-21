// ============================================================================
// ORACLE DATABASE: IDENTITY - HOUSEHOLD ARCHETYPES
// Path: Oracle/identity/oracle-archetypes.js
// Scale: SUPERSized (Behavioral Logic)
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.identity = window.OracleDB.identity || {};

window.OracleDB.identity.archetypes = {
    household_archetypes: {
        house_1: {
            title: "The Wada Matriarch-in-Waiting",
            trait: "Cold, calculating, and deeply arrogant. She views the ropes as a ritual duty rather than a punishment.",
            struggle_modifier: -20, // Rare struggles
            devotion_base: 40
        },
        house_2: {
            title: "The Sarpanch’s Spoiled Daughter",
            trait: "High-strung and loud. Her spoken Marathi is filled with threats of political retribution until the gag is applied.",
            struggle_modifier: +30, // Thrashes wildly
            devotion_base: 0
        },
        house_3: {
            title: "The Weaver’s Prodigy",
            trait: "Stoic and physically strong. She understands the tensile strength of the silk perfectly and waits for the material to fray.",
            struggle_modifier: +10,
            devotion_base: 20
        },
        house_10: {
            title: "The Modern Pune Outsider",
            trait: "Completely traumatized and confused by the Wada's ancient Gothic rules. Her internal monologue is the most frantic.",
            struggle_modifier: +50, // Pure panic
            devotion_base: -10
        }
    },
    
    universal_traits: [
        "The Adarsh Bahu (Ideal DIL): Permitted the 'Single-Drape' walk due to her silence.",
        "The Ziddh (Stubborn): Requires double-knotted Jute and the Teak Wood bit gag.",
        "The Sentinel: A woman whose spirit has completely shifted to Devotion; she now guards others."
    ]
};
