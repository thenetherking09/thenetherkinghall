// ============================================================================
// ORACLE DATABASE: IDENTITY - NAMES & HERITAGE
// Path: Oracle/identity/oracle-names.js
// ============================================================================

window.OracleDB = window.OracleDB || {};
window.OracleDB.identity = window.OracleDB.identity || {};

window.OracleDB.identity.names = {
    
    // --- 1. FIRST NAMES BY MICRO-REGION ---
    first_names: {
        north: {
            punjabi: ["Simran", "Harpreet", "Jasmeet", "Amrit", "Gurpreet", "Navjot", "Manpreet", "Kiran", "Tarn", "Rupinder", "Avneet", "Prabhjot"],
            haryanvi: ["Rajbala", "Sunita", "Kavita", "Sheetal", "Meena", "Geeta", "Bimla", "Santosh", "Suman", "Pooja", "Mukesh", "Sarita"],
            up_bihar: ["Aarohi", "Sneha", "Roshni", "Anjali", "Priyanka", "Nidhi", "Kajal", "Neha", "Ritu", "Swati", "Chanda", "Vandana", "Pallavi", "Shikha"],
            kashmiri: ["Zooni", "Asmat", "Insha", "Mehak", "Ruhi", "Saba", "Fiza", "Iqra", "Nusrat", "Rifat"]
        },
        south: {
            tamil: ["Kavya", "Shruti", "Ananya", "Aishwarya", "Nithya", "Divya", "Sowmya", "Karthika", "Meenakshi", "Priyadarshini", "Kanimozhi"],
            telugu: ["Alekhya", "Bhavana", "Chandana", "Deepthi", "Harika", "Keerthi", "Lahari", "Mounika", "Niharika", "Sruthi", "Tejaswi", "Yamini"],
            kannada: ["Gowri", "Sahana", "Apeksha", "Chaitra", "Meghana", "Rakshitha", "Sindhu", "Spoorthi", "Vidya", "Yashaswini"],
            malayali: ["Anjali", "Gopika", "Lakshmi", "Malavika", "Parvathy", "Reshma", "Sneha", "Swetha", "Athira", "Kavitha", "Devika"]
        },
        east_northeast: {
            bengali: ["Bipasha", "Oindrila", "Nandini", "Debashree", "Anushree", "Moumita", "Poulomi", "Riya", "Sayantani", "Sohini", "Sushmita", "Tanushree"],
            odia: ["Subhashree", "Lopamudra", "Priyadarsini", "Smruti", "Sonalika", "Rupali", "Madhusmita", "Itishree", "Jharana"],
            assamese: ["Pema", "Lana", "Jahnabi", "Monalisa", "Rimpi", "Sangeeta", "Bishnupriya", "Karabi", "Pratyusha", "Trishna"],
            tribal_northeast: ["Zoya", "Ahom", "Nengboi", "Lalhriatpuii", "Kim", "Malsawmi", "Zodin", "Daphi", "Linza"]
        },
        west: {
            marathi: ["Radhika", "Avani", "Dhara", "Rutuja", "Sayali", "Pranali", "Aishwarya", "Mrunal", "Tejashree", "Shraddha", "Prajakta", "Gargi"],
            gujarati: ["Priya", "Jinal", "Hetal", "Kinjal", "Bansi", "Drashti", "Foram", "Gopi", "Krupa", "Mansi", "Nidhi", "Riddhi", "Urvi"],
            goan_konkani: ["Maria", "Fernanda", "Rhea", "Alisha", "Giselle", "Tanya", "Sanika", "Neha", "Aarti", "Natasha"],
            parsi: ["Shiraz", "Frene", "Zenia", "Roxanne", "Delna", "Nazneen", "Tanaaz", "Shanaya", "Pearl", "Yasmin"]
        },
        urdu_islamic: ["Zoya", "Aayat", "Sana", "Zara", "Ayesha", "Fatima", "Mariam", "Zainab", "Iqra", "Hina", "Sadiya", "Nazia", "Farha", "Rukhsar", "Shabana"]
    },

    // --- 2. REGIONAL SURNAMES (For deep lore generation) ---
    surnames: {
        north: ["Sharma", "Verma", "Gupta", "Singh", "Yadav", "Rajput", "Chauhan", "Thakur", "Mishra", "Pandey", "Dixit", "Dubey", "Tiwari", "Kaur", "Gill", "Brar"],
        south: ["Reddy", "Rao", "Naidu", "Menon", "Nair", "Pillai", "Iyer", "Gowda", "Hegde", "Babu", "Krishna", "Murthy", "Raman", "Shetty", "Kamath"],
        east: ["Mukherjee", "Banerjee", "Chatterjee", "Bose", "Ghosh", "Das", "Datta", "Sengupta", "Mohanty", "Patra", "Rout", "Sahoo", "Borgohain", "Saikia"],
        west: ["Patil", "Deshmukh", "Joshi", "Kulkarni", "Pawar", "Kadam", "Shinde", "Patel", "Shah", "Desai", "Mehta", "Parekh", "D'Souza", "Fernandes"],
        urdu_islamic: ["Khan", "Syed", "Shaikh", "Ansari", "Qureshi", "Begum", "Khatoon", "Bano", "Mirza", "Baig", "Ali", "Ahmad"]
    },

    // --- 3. THE DAKNAAM / PET NAME SYSTEM ---
    // (Used by family members, creates a sense of vulnerability when used by a captor)
    nicknames: [
        "Chutki", "Gudiya", "Bebo", "Piku", "Tinku", "Chhoti", 
        "Babli", "Pinky", "Rani", "Mithi", "Golu", "Sonu", 
        "Bulbul", "Kuku", "Rini", "Tuli", "Pappu", "Munni"
    ],

    // --- 4. THE HONORIFIC MATRIX ---
    // (Crucial for power dynamics. Does the subject demand respect, or is she subservient?)
    honorifics: {
        formal_respect: [
            "Ji", "Madam", "Ma'am", "Begum Sahiba", "Devi Ji", "Thakurain"
        ],
        familial_elder: [
            "Didi", "Bhabhi", "Tai", "Akka", "Chechi", "Bua", "Masi", "Chachi", "Mami"
        ],
        familial_younger: [
            "Beti", "Chhoti", "Lado", "Kannu", "Kutty", "Bachhi"
        ],
        subservient_class: [
            "Bai", "Mausi", "Aya", "Dai"
        ]
    }
};

console.log("Oracle DB: oracle-names.js loaded. (Parameters: 250+)");
          
