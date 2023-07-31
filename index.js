// Get references to the necessary HTML elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to add a message to the chat window
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
}

// Function to send a user message to the SocketIO server
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage !== '') {
        addMessage('You: ' + userMessage, true);
        socket.emit('user_message', userMessage);
        userInput.value = '';
    }
}

// Event listeners for user input
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Event listener for receiving bot responses from the SocketIO server
socket.on('bot_response', (response) => {
    addMessage('Bot: ' + response);
});
