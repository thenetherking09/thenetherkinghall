// ============================================================================
// ORACLE DATABASE: WORLD - METEOROLOGY & THE CHRONOS ENGINE
// Path: Oracle/world/oracle-meteorology.js
// Scale: DYNAMIC WEATHER & TIME-SHIFT SIMULATION
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.world = window.OracleDB.world || {};

window.OracleDB.world.meteorology = {

    // --- 1. THE SEASONS (Maharashtrian Climate Physics) ---
    seasons: {
        monsoon: {
            name: "Varsha (The Violent Monsoon)",
            atmosphere: "Heavy, rhythmic rain batters the Wada's stone roof. The air is thick with petrichor and inescapable dampness.",
            rope_physics: "The 95% humidity causes the natural Jute ropes to absorb moisture and swell, tightening the knots automatically by a brutal 15%.",
            sensory: "The dampness causes the 'Mustard Oil' treatment on the ropes to smell pungently, stinging her flared nostrils."
        },
        heatwave: {
            name: "Grishma (The 'Loo' Heatwave)",
            atmosphere: "A suffocating 45°C heat. The dry 'Loo' winds suck every drop of moisture from the air, turning the Wada into a furnace.",
            rope_physics: "Sweat causes her skin to slick, but the drying salt makes the coir ropes highly abrasive. Dehydration drops her stamina rapidly.",
            sensory: "The heavy Otm gag becomes a dry, dusty torture. Her blouse turns translucent, stuck to her skin like a second layer beneath the harness."
        },
        winter: {
            name: "Shishir (The Northern Chill)",
            atmosphere: "A bone-chilling fog (Dhuan) rolls into the courtyards. The basalt stone floors feel like blocks of solid ice.",
            rope_physics: "Metal chains and brass hardware become painfully cold against her bare skin. The drop in temperature numbs her bound fingers entirely.",
            sensory: "She shivers violently, causing her green glass bangles to clink incessantly—a sound that angers the Sentinels."
        }
    },

    // --- 2. TIME OF DAY (The Chronos States) ---
    time_periods: [
        {
            hours: [3, 4, 5], 
            name: "Brahma Muhurat (The Witching Hour)",
            lighting: "Pitch black. The only light comes from the dying embers of a distant Diya.",
            vibe: "Total isolation. The gods are waking, but no one is coming to save her. Her internal monologue turns to pure terror."
        },
        {
            hours: [6, 7, 8, 9, 10, 11], 
            name: "Sakal (Morning Rush)",
            lighting: "Harsh, unyielding morning sunlight piercing through the wooden window slats.",
            vibe: "The Wada is awake. The sounds of grinding spices and sweeping brooms remind her that life goes on while she remains chained."
        },
        {
            hours: [12, 13, 14, 15, 16], 
            name: "Dupar (The Lunch Break Trap)",
            lighting: "Blinding, suffocating mid-day glare. Dust motes dance in the stagnant air.",
            vibe: "The systemic dead-zone. Everyone is sleeping. No locks are opened. She is left to sweat in the absolute, deafening silence."
        },
        {
            hours: [17, 18, 19], 
            name: "Godhuli Bela (Twilight)",
            lighting: "The golden, dusty twilight. Long, monstrous shadows stretch across the basalt floor.",
            vibe: "The Aarti bells begin to ring. The 'Flat-Shelf' outline of her gag becomes terrifyingly visible in the fading light."
        },
        {
            hours: [20, 21, 22, 23, 0, 1, 2], 
            name: "Ratra (The Dead of Night)",
            lighting: "Load-Shedding Blackout. The grid fails. Absolute, suffocating darkness.",
            vibe: "The 'Shared Silence' begins. The Wada sleeps, leaving the bound women alone with their heavily muffled breathing."
        }
    ]
};

// --- 3. THE CHRONOS ENGINE LOGIC ---
window.OracleDB.world.chronos = {
    current_hour: new Date().getHours(), // Reads user's actual real-world local time!
    current_season: "monsoon", // Default

    // Initialize with a random season to keep RP fresh
    init: function() {
        const seasons = ["monsoon", "heatwave", "winter"];
        this.current_season = seasons[Math.floor(Math.random() * seasons.length)];
        console.log(`[Chronos Engine]: Initialized at Hour ${this.current_hour}. Season: ${this.current_season}`);
    },

    // Get the lore for the current hour
    getCurrentTimeLore: function() {
        const period = window.OracleDB.world.meteorology.time_periods.find(p => p.hours.includes(this.current_hour));
        const season = window.OracleDB.world.meteorology.seasons[this.current_season];
        return { period, season };
    },

    // ADVANCE TIME LOGIC (For "Wait X hours" commands)
    advanceTime: function(hoursToAdd) {
        this.current_hour = (this.current_hour + hoursToAdd) % 24;
        
        // 30% chance the weather completely shifts after a long time skip!
        if (hoursToAdd >= 6 && Math.random() < 0.3) {
            const seasons = ["monsoon", "heatwave", "winter"];
            this.current_season = seasons[Math.floor(Math.random() * seasons.length)];
        }

        const lore = this.getCurrentTimeLore();
        
        let report = `*Chronos Engine: Time advances ${hoursToAdd} hours.*<br><br>`;
        report += `It is now **${lore.period.name}**. ${lore.period.lighting} ${lore.period.vibe}<br><br>`;
        report += `**Weather Shift (${lore.season.name}):** ${lore.season.atmosphere} ${lore.season.rope_physics}`;
        
        return report;
    }
};

// Start the engine
window.OracleDB.world.chronos.init();

console.log("Oracle DB: oracle-meteorology.js loaded. (Live Chronos Engine Active)");
          
