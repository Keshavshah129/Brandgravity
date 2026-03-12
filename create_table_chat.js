import { insforge } from './src/lib/insforge.js';

async function createBlogTable() {
    console.log("Requesting table creation via insforge.ai.chat.create...");
    try {
        const response = await insforge.ai.chat.create({
            messages: [
                {
                    role: "user",
                    content: "Create a table named 'blog_posts' with columns: title (text), category (text), date (text), image (text), excerpt (text). Make it publicly readable."
                }
            ],
            // In agent-native platforms, this kind of 'chat' often translates to backend actions
        });

        console.log("Chat Response:", JSON.stringify(response, null, 2));
    } catch (e) {
        console.error("Error creating table via chat:", e.name, e.message);
        if (e.response) {
            console.error("Error Response:", await e.response.text());
        }
    }
}

createBlogTable();
