// ============================================================================
// ORACLE DATABASE: UI - THE GRIMOIRE & PRE-SPAWN ENGINE
// Path: Oracle/ui/oracle-grimoire.js
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.ui = window.OracleDB.ui || {};

window.OracleDB.ui.grimoire = {
    init: function() {
        this.injectHTML();
        this.bindEvents();
    },

    injectHTML: function() {
        const uiHTML = `
            <div id="wada-spawn-modal" class="oracle-modal hidden">
                <div class="oracle-modal-content">
                    <h2 style="color: var(--blood-red); font-family: var(--font-heading); text-align: center; margin-top: 0;">SUMMON SUBJECT</h2>
                    <p style="text-align: center; color: #aaa; font-size: 0.85rem; margin-bottom: 20px;">Define the captive before beginning Roleplay.</p>
                    
                    <div class="form-group">
                        <label>Household Origin:</label>
                        <select id="spawn-house">
                            <option value="random">Random Household</option>
                            <option value="house_1">House 1 (The Wada Matriarchs)</option>
                            <option value="house_2">House 2 (The Sarpanch Haven)</option>
                            <option value="house_3">House 3 (The Weavers' Pit)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Physique & Varna:</label>
                        <select id="spawn-figure">
                            <option value="random">Random Generation</option>
                            <option value="heavy_dusky">Heavy, Voluptuous (Dusky Skin)</option>
                            <option value="athletic_wheat">Athletic, Rural Laborer (Wheatish)</option>
                            <option value="petite_pale">Petite, Sheltered (Pale/Golden)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Initial Attire:</label>
                        <select id="spawn-saree">
                            <option value="random">Random Generation</option>
                            <option value="nauvari_red">Deep Red Nauvari Saree</option>
                            <option value="paithani_green">Green Paithani Silk</option>
                            <option value="naked">Stripped Naked (Wada Reality)</option>
                        </select>
                    </div>

                    <button id="btn-initiate-spawn" class="occult-btn" style="width: 100%; padding: 12px; background: var(--blood-red); color: white; border: none; font-weight: bold; cursor: pointer; border-radius: 4px;">BIND TO REALM</button>
                </div>
            </div>

            <div id="grimoire-sidebar">
                <div class="sidebar-header">
                    <h3 style="margin: 0; color: var(--accent-gold); font-family: var(--font-heading);">THE GRIMOIRE</h3>
                    <button id="close-grimoire" class="close-btn">✕</button>
                </div>
                <div class="sidebar-content" id="grimoire-content">
                    <p style="color: #666; text-align:center;">No subject currently bound.</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', uiHTML);
    },

    bindEvents: function() {
        const sidebar = document.getElementById("grimoire-sidebar");
        const openBtn = document.getElementById("open-grimoire");
        
        if(openBtn) {
            openBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.updateGrimoire();
                sidebar.classList.add("open");
            });
        }
        
        document.getElementById("close-grimoire").addEventListener("click", () => {
            sidebar.classList.remove("open");
        });

        document.getElementById("btn-initiate-spawn").addEventListener("click", () => {
            this.executeSpawn();
        });

        // Click outside to close Grimoire on mobile
        document.body.addEventListener("click", (e) => {
            if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target.id !== "open-grimoire") {
                sidebar.classList.remove("open");
            }
        });
    },

    updateGrimoire: function() {
        const content = document.getElementById("grimoire-content");
        const sub = window.currentSubject;
        const ledger = window.WadaLedger;

        if (!sub) {
            content.innerHTML = `<p style='color:#666; text-align:center;'>Toggle RP mode to bind a subject.</p>`;
            return;
        }

        content.innerHTML = `
            <div class="grimoire-card">
                <h4 style="color: var(--accent-gold); margin: 0 0 5px 0; font-family: var(--font-heading);">${sub.name}</h4>
                <p style="font-size: 0.85rem; color: #aaa; margin: 0 0 15px 0;">${sub.house}</p>
                
                <div class="meter-container" style="margin-bottom: 10px;">
                    <label style="font-size: 0.75rem; color: #ccc;">Stamina (${sub.stamina}%)</label>
                    <div class="meter-bar"><div class="meter-fill" style="width: ${sub.stamina}%; background: #4a90e2;"></div></div>
                </div>
                
                <div class="meter-container">
                    <label style="font-size: 0.75rem; color: #ccc;">Devotion (${sub.devotion}%)</label>
                    <div class="meter-bar"><div class="meter-fill" style="width: ${sub.devotion}%; background: var(--blood-red);"></div></div>
                </div>

                <div class="status-tags">
                    <span class="tag" style="border-color: ${sub.isBound ? 'var(--blood-red)' : '#444'}; color: ${sub.isBound ? 'var(--blood-red)' : '#666'};">BOUND</span>
                    <span class="tag" style="border-color: ${sub.isGagged ? 'var(--blood-red)' : '#444'}; color: ${sub.isGagged ? 'var(--blood-red)' : '#666'};">GAGGED</span>
                </div>
            </div>

            <div class="grimoire-card" style="margin-top: 15px;">
                <h4 style="color: var(--accent-gold); margin: 0 0 10px 0; font-family: var(--font-heading);">WADA LEDGER</h4>
                <ul style="list-style:none; padding:0; margin:0; font-size: 0.85rem; color:#ccc;">
                    <li style="margin-bottom:5px;">Jute Ropes: <span style="float:right; color:white;">${ledger.jute_ropes}</span></li>
                    <li style="margin-bottom:5px;">Silk Cords: <span style="float:right; color:white;">${ledger.silk_ropes}</span></li>
                    <li style="margin-bottom:5px;">Otm Cloths: <span style="float:right; color:white;">${ledger.cloth_gags}</span></li>
                    <li>Neem Bits: <span style="float:right; color:white;">${ledger.neem_bits}</span></li>
                </ul>
            </div>
        `;
    },

    openSpawner: function(callback) {
        this.spawnCallback = callback;
        document.getElementById("wada-spawn-modal").classList.remove("hidden");
    },

    executeSpawn: function() {
        window.OracleDB.spawnPrefs = {
            house: document.getElementById("spawn-house").value === "random" ? null : document.getElementById("spawn-house").value,
            figure: document.getElementById("spawn-figure").value === "random" ? null : document.getElementById("spawn-figure").value,
            attire: document.getElementById("spawn-saree").value === "random" ? null : document.getElementById("spawn-saree").value
        };

        document.getElementById("wada-spawn-modal").classList.add("hidden");
        
        if (this.spawnCallback) {
            this.spawnCallback();
            this.spawnCallback = null;
        } else if (window.OracleDB.core && window.OracleDB.core.generateSubjectProfile) {
            window.OracleDB.core.generateSubjectProfile();
            this.updateGrimoire();
        }
    }
};

window.OracleDB.ui.grimoire.init();
