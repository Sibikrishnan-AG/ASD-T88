// Reuse the formatMessage function from script.js
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



document.addEventListener('DOMContentLoaded', async () => {
    const chatSessions = JSON.parse(localStorage.getItem('chatSessions'));
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (!chatSessions || chatSessions.length === 0) {
        document.getElementById('summary-content').innerHTML = '<p>No chat history available.</p>';
        return;
    }

    const summaryContainer = document.getElementById('summary-content');

    for (let i = 0; i < chatSessions.length; i++) {
        const chatHistory = chatSessions[i];

        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ chatHistory, userId })
            });

            const data = await response.json();

            const summaryBlock = document.createElement('div');
            summaryBlock.classList.add('summary-block');

            summaryBlock.innerHTML = `
                <h3>Summary ${i + 1}</h3>
                <h4>Problem</h4>
                <p>${formatMessage(data.problem)}</p>
                <h4>Strategy</h4>
                <p>${formatMessage(data.strategy)}</p>
            `;

            summaryContainer.appendChild(summaryBlock);

        } catch (error) {
            console.error('Error:', error);
            const errorBlock = document.createElement('p');
            errorBlock.textContent = 'An error occurred while summarizing.';
            summaryContainer.appendChild(errorBlock);
        }
    }
});


// Handle the Home Page button click
document.getElementById('back-home-button').addEventListener('click', () => {
    // Go back to the previous page in the browser's history
    window.history.back();
});
