// ============================================================================
// ORACLE DATABASE: INTERACTION - DYNAMIC MARATHI LEXICON & MONOLOGUES
// Path: Oracle/interaction/oracle-lexicon.js
// Scale: DYNAMIC GRAMMAR BUILDER (Thousands of Permutations)
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.interaction = window.OracleDB.interaction || {};

window.OracleDB.interaction.lexicon = {

    // --- 1. THE DYNAMIC MARATHI GRAMMAR BUILDER (Pre-Gag Defiance) ---
    // The engine picks one from each array to build a unique sentence.
    // Format: [Curse] + [Threat] + [Plea]
    
    grammar_blocks: {
        curses: [
            "Murkha! (Fool!)",
            "Nalayak! (Worthless wretch!)",
            "Tuzha satyanash hoil! (You will be destroyed!)",
            "Mazi himmat kashi zhali tula hat lavaychi? (How dare you touch me?)",
            "Tu narak jashil! (You will rot in hell!)",
            "Melyaa! (Dead man/wretch!)",
            "Kutrya! (Dog!)"
        ],
        family_threats: [
            "Mazi aai tula sodnar nahi! (My mother won't spare you!)",
            "Wadatiche lok aale ki tula marun taktil! (When the Wada people arrive, they will kill you!)",
            "Majha bhau tula shodhun kadhel! (My brother will hunt you down!)",
            "Sarpanchala samajla tar tu jivant rahanar nahi! (If the Sarpanch finds out, you won't survive!)",
            "Amhi Khandani loka aahot, tuzi layki kay? (We are aristocratic people, what is your worth?)"
        ],
        pleas: [
            "Sod mala! (Let me go!)",
            "Mala jau de, mi konala kahi sangnar nahi! (Let me go, I won't tell anyone!)",
            "Mi tuzhe paya padte... (I fall at your feet...)",
            "He Deva, mala waachav... (Oh God, save me...)",
            "Majhi aabru nako gheu... (Don't take my honor...)",
            "Krupaya, mala tras nako deu... (Please, don't torture me...)"
        ]
    },

    // --- 2. POST-GAG: THE INTERNAL MONOLOGUES ---
    // Triggers the exact second the gag is applied. Shifts based on Devotion state.
    
    internal_monologues: {
        rage_state: [
            "Her mind screams in silent Marathi: 'Maza shwas kondtoy... he loka mala kadhi sodtil?' (My breath is choking... when will they release me?). Every fiber of her full-bodied frame fights the Jute.",
            "'Kasa pan karun mala itun palun jaycha aahe...' (Somehow I have to escape from here...). She violently jerks her bound wrists, ignoring the friction burns.",
            "'Mazi 'Izzat' ata hya rassinmadhe bandish aahe.' (My honor is now bound within these ropes.) The thought fills her with a hot, paralyzing fury."
        ],
        terror_state: [
            "Trapped entirely in her own head, she prays frantically: 'Deva, majhi aabru vachav, mala ya bandhanatun mukt kar...' (God, save my honor, free me from these bindings...).",
            "A wave of helpless realization crashes over her internal thoughts: 'Ata kahihi upyog nahi. Majha aawaj konihi aikanar nahi.' (It's no use now. No one will hear my voice.)",
            "'Aai... mala khup bhiti vat-tey...' (Mother... I am so scared...). She squeezes her eyes shut, the tears soaking into the top edge of the black Otm cloth."
        ],
        devotion_state: [
            "The psychological break settles in. Her thoughts turn submissive: 'Mala ya rassinchi savay karavi lagel... majha astitva ata fakta he kapat aahe.' (I will have to get used to these ropes... my existence is now just this cloth.)",
            "A dark comfort washes over her muffled thoughts: 'Hya rassincha sparsha ata mazhya angacha bhag zhala aahe.' (The touch of these ropes is now a part of my body.)",
            "'Ananya sarakhi mala pan Wada Sentinel banyacha shiksha milali.' (Like Ananya, I too received the punishment of being a Wada Sentinel.) She leans heavily into the crotch-rope, accepting her fate."
        ]
    },

    // --- 3. THE MUFFLED PHONETICS (Based on Gag Material) ---
    muffled_sounds: {
        cloth_otm: [
            "A sharp, high-pitched 'Mmph-mmph!' erupts from her as the crotch-rope is suddenly pulled taut.",
            "Defeated, she lets out a long, trembling 'Mmmmm...' that vibrates pathetically against the black fabric.",
            "A rapid, frantic 'Mm-mm-mm-mm!' escapes her as she shakes her head desperately side to side."
        ],
        wood_bit: [
            "The unyielding wood forces a guttural, choked 'Hrrnngh-ah!' from her throat.",
            "She tries to bite down, resulting in a strained, vibrating 'Nnnnngh!' of pure jaw fatigue.",
            "A wet, heavy 'Mmmm-gah!' escapes as the saliva builds up behind the teak block."
        ],
        duct_tape: [
            "She tries to scream, but the silver tape flattens it into a harsh, buzzing 'Hnnn-nnn-nnn!' through her nose.",
            "A muffled, furious 'Mmm-fph!' accompanies the sound of the tape crinkling as she tries to part her lips.",
            "Exhausted, she emits a slow, wet 'Mmh... mmh...' as her nostrils flare violently for oxygen."
        ]
    },

    // --- 4. THE BANGLE-CLINK CODES (Auditory Translation) ---
    bangle_codes: [
        { rhythm: "Three sharp clinks", meaning: "A desperate plea for water. Her throat is raw." },
        { rhythm: "One slow, heavy slide of glass", meaning: "Submission. She is offering her bound wrists to be tied tighter." },
        { rhythm: "Frantic, chaotic shattering", meaning: "Absolute panic. She is trying to break the glass to cut the ropes." },
        { rhythm: "Two muffled clinks against stone", meaning: "Warning. She hears the footsteps of the Matriarch approaching the cellar." }
    ]
};

console.log("Oracle DB: oracle-lexicon.js loaded. (Dynamic Marathi Grammar Active)");
