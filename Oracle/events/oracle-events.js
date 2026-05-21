// ============================================================================
// ORACLE DATABASE: EVENTS - THE 1k BRANCHING PLOT FACTORY
// Path: Oracle/events/oracle-events.js
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.events = window.OracleDB.events || {};

window.OracleDB.events.plots = [
    {
        theme: "The Broken Bangle Audit",
        steps: [
            { text: "Morning in the Wada. {name} is called for the mandatory Chooda Pariksha. The green glass on her wrists catches the light." },
            { text: "The Kaki roughly inspects her wrists. A single shard of green glass falls. Evidence of a struggle discovered." },
            { text: "As punishment, the Jute is tightened ruthlessly. Her Nauvari saree pleats are pinned to her leg-tethers." },
            { text: "The Otm cloth is applied with double-knots. Her authority in the household is silenced." },
            { text: "{name} is left as a 'Sentinel' until sunset, her mind racing with unspoken curses." }
        ]
    },
    {
        theme: "The Pev Isolation Ritual",
        steps: [
            { text: "The Matriarch has ordered a 'Reset.' {name} is stripped of her status." },
            { text: "She is forced down into the dark Pev (cellar). Rough Jute bites into her full-bodied figure." },
            { text: "The heavy gag is locked into place. The dusty air becomes the only thing she can breathe." },
            { text: "The trapdoor slams shut. Hours of absolute, muffled darkness await her. She 'drinks the silence'." }
        ]
    }
    // You can add the rest of your plots back here!
];

window.OracleDB.events.generateStorySlides = function(subject) {
    const db = window.OracleDB;
    const plot = db.events.plots[Math.floor(Math.random() * db.events.plots.length)];
    
    return plot.steps.map((step, index) => {
        // NO MORE LOCAL IMAGE FETCHING. JUST TEXT FOR THE AI BRIDGE!
        return {
            text: `<strong style="color:var(--accent-gold);">${plot.theme}</strong> (Part ${index + 1})<br><br>${step.text.replace("{name}", subject.name)}`
        };
    });
};
