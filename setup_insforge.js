import { insforge } from './src/lib/insforge.js';

async function setupBackend() {
    console.log("Requesting InsForge AI to create the blog_posts table...");
    try {
        // Attempting to use the AI module to define the schema
        const response = await insforge.ai.generate({
            prompt: "Create a table named 'blog_posts' with the following columns: id (uuid, primary key), title (text), category (text), date (text), image (text), excerpt (text). Enable public read access.",
            context: "database_schema"
        });

        console.log("AI Response:", response);

        if (response && response.success) {
             console.log("Schema creation requested successfully.");
        } else {
             console.error("AI response did not indicate success.");
        }
    } catch (e) {
        console.error("Error during InsForge AI setup:", e);
        // Fallback: try to see if there's an 'exec' or 'rpc' on database
        if (insforge.database.rpc) {
             console.log("Trying rpc fallback...");
        }
    }
}

setupBackend();
