import { insforge } from './src/lib/insforge.js';

async function checkInsForge() {
    try {
        console.log("Database keys:", Object.getOwnPropertyNames(insforge.database));
        console.log("AI keys:", Object.getOwnPropertyNames(insforge.ai));
        
        const dbProto = Object.getPrototypeOf(insforge.database);
        console.log("Database Prototype keys:", Object.getOwnPropertyNames(dbProto));
        
        if (insforge.ai.chat) {
            console.log("AI Chat Methods:", Object.keys(insforge.ai.chat));
            console.log("AI Chat Proto:", Object.getOwnPropertyNames(Object.getPrototypeOf(insforge.ai.chat)));
        }
        if (insforge.database) {
            console.log("Database Methods:", Object.keys(insforge.database));
            console.log("Database Proto:", Object.getOwnPropertyNames(Object.getPrototypeOf(insforge.database)));
        }

        const aiProto = Object.getPrototypeOf(insforge.ai);
        console.log("AI Prototype keys:", Object.getOwnPropertyNames(aiProto));

        // check if 'tables' or 'schema' exists
        if (insforge.tables) console.log("Tables keys:", Object.keys(insforge.tables));
        if (insforge.schema) console.log("Schema keys:", Object.keys(insforge.schema));

    } catch (e) {
        console.error("Error checking InsForge:", e);
    }
}

checkInsForge();
