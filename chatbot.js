let chatHistory = [];

// Handle sending a message
document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Display the user's message
    const chatOutput = document.getElementById('chat-output');
    const userMessage = document.createElement('p');
    userMessage.textContent = userInput;
    userMessage.classList.add('user-message');
    chatOutput.appendChild(userMessage);

    // Store the user's message in the chat history
    chatHistory.push({ role: "user", content: userInput });

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Fetch the bot's response from the server
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();

        // Display the bot's message with rich text formatting
        const botMessage = document.createElement('p');
        botMessage.innerHTML = formatMessage(data.response);
        botMessage.classList.add('bot-message');
        chatOutput.appendChild(botMessage);

        // Store the bot's response in the chat history
        chatHistory.push({ role: "bot", content: data.response });

        // Scroll to the bottom of the chat
        chatOutput.scrollTop = chatOutput.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to format the messages
function formatMessage(message) {
    // Convert numbered lists to HTML ordered lists
    message = message.replace(/(\d+\.\s)/g, "\n$1");
    
    // Split by double newline to create paragraphs
    let paragraphs = message.split("\n\n").map(para => `<p>${para.trim()}</p>`).join("");

    // Basic formatting rules:
    // *bold* -> <strong>bold</strong>
    // _italic_ -> <em>italic</em>
    // `code` -> <code>code</code>

    let formattedMessage = paragraphs
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>')  // Bold
        .replace(/_(.*?)_/g, '<em>$1</em>')           // Italic
        .replace(/`(.*?)`/g, '<code>$1</code>');      // Code

    return formattedMessage;
}

// Handle the Summary Page button click
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

document.getElementById('summary-page-button').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        const userItem = data.find(d => d._id === userId);

        if (userItem) {
            let chatSessions = JSON.parse(localStorage.getItem('chatSessions')) || [];
            chatSessions.push(chatHistory);
            localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
            window.location.href = 'summary.html?userId=' + encodeURIComponent(userItem._id);
            chatHistory = [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});


// Handle the Home Page button click
document.getElementById('back-home-button').addEventListener('click', () => {
    // Go back to the previous page in the browser's history
    window.history.back();
});