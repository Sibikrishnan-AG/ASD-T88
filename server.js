const express = require('express');
const OpenAI = require('openai'); // Import OpenAI library
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI client
const openai = new OpenAI();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '/')));

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const userInput = req.body.message;
        if (!userInput) {
            return res.status(400).json({ error: 'No input provided' });
        }

        // Use OpenAI API to get a completion
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that is an expert at providing strategies for helping parents with special needs children." },
                { role: "user", content: userInput }
            ],
        });

        // Send the response back to the client
        const chatResponse = completion.choices[0].message.content;
        res.json({ response: chatResponse });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: `An error occurred on the server: ${error.message}` });
    }
});


app.post('/api/summarize', async (req, res) => {
    try {
        const chatHistory = req.body.chatHistory;

        // Combine all the messages into one string
        const chatText = chatHistory.map(entry => `${entry.role === 'user' ? 'User' : 'GPT'}: ${entry.content}`).join('\n');

        // Use OpenAI API to summarize the chat
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that summarizes conversations." },
                { role: "user", content: `Summarize the following chat. Provide the Problem and Strategy: \n\n${chatText}` }
            ],
        });

        const summaryResponse = completion.choices[0].message.content;
        

        // Updated regular expressions to be more robust
        const problemMatch = summaryResponse.match(/Problem:\s*([\s\S]*?)\n\*\*Strategy:/); // Captures everything between "Problem:" and "**Strategy:"
        const strategyMatch = summaryResponse.match(/\*\*Strategy:\s*([\s\S]*)/); // Captures everything after "**Strategy:"

        const problem = problemMatch ? problemMatch[1].trim() : "Problem summary not found.";
        const strategy = strategyMatch ? strategyMatch[1].trim() : "Strategy summary not found.";

        res.json({ problem, strategy });
    } catch (error) {
        console.error('Error summarizing chat:', error);
        res.status(500).json({ error: 'Failed to summarize the chat.' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
