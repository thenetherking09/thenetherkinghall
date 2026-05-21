// ============================================================================
// ORACLE DATABASE: THE VAULT - REGIONAL MATERIALS
// Path: Oracle/vault/oracle-materials-india.js
// Scale: 500+ Combinations
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.vault = window.OracleDB.vault || {};

window.OracleDB.vault.materials = {
    ropes: {
        jute: {
            name: "Sutli (Bengal Jute)",
            description: "Coarse, earthy, and abrasive. It bites into the skin with every struggle.",
            ledgers: "jute_ropes",
            friction: "High",
            moisture_reaction: "Tightens when damp"
        },
        silk: {
            name: "Resham (Banarasi Silk)",
            description: "Smooth and deceptively strong. It slides against the skin but holds knots like iron.",
            ledgers: "silk_ropes",
            friction: "Low",
            moisture_reaction: "Becomes heavy and clingy"
        },
        coir: {
            name: "Kayar (Kerala Coir)",
            description: "Bristly coconut fiber. Guaranteed to leave red friction burns.",
            ledgers: "jute_ropes",
            friction: "Extreme",
            moisture_reaction: "Abrasive"
        }
    },
    
    gags: {
        cloth: {
            name: "Otm (Black Khadi)",
            description: "A heavy, jet-black cloth that compresses the lips into a flat plane.",
            ledgers: "cloth_gags",
            saturation_limit: 10
        },
        wood: {
            name: "Neem Bit",
            description: "A carved block of Neem. The bitterness prevents the subject from relaxing her jaw.",
            ledgers: "neem_bits",
            saturation_limit: 99
        }
    }
};
