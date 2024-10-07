const chatBox = document.querySelector(".chat-box");
const form = document.querySelector(".typing-area");
const inputField = form.querySelector(".input-field");
let initialText = chatBox.querySelector('.text'); // Select the initial message

// Load chat history from localStorage on page load
window.onload = function() {
    const savedChats = localStorage.getItem('chatHistory');
    if (savedChats && savedChats.trim() !== '') {
        chatBox.innerHTML = savedChats;
        if (chatBox.querySelector('.message')) {
            initialText?.remove(); // Remove initial message if chat history exists
        }
    }
};

form.onsubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting normally

    let userMessage = inputField.value.trim(); 
    if (userMessage !== '') {
        if (initialText) {
            initialText.remove(); // Remove initial message
        }

        appendMessage('You', userMessage, 'user');

        // Create the GET request to Vercel API ai-api running as proxy to bypass infinity free cros
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://ai-api-vert.vercel.app/api/chat?message=${encodeURIComponent(userMessage)}`, true);
        xhr.onload = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let aiResponse = JSON.parse(xhr.responseText).message;
                appendMessage('AI', aiResponse, 'ai');  // Show AI response in chat
            } else {
                appendMessage('AI', 'Error fetching response from AI.', 'ai'); // Handle errors gracefully
            }
        };
        
        // Send GET request
        xhr.send();

        inputField.value = ""; // Clear input field
    }
};


// Append message to chat box and save to localStorage
function appendMessage(sender, message, messageClass) {
    let messageHTML = `<div class="message ${messageClass}"><strong>${sender}:</strong> ${message}</div>`;
    chatBox.innerHTML += messageHTML;

    // Save updated chat history in localStorage
    localStorage.setItem('chatHistory', chatBox.innerHTML);

    // Auto-scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Clear chat and localStorage
function clearChat() {
    localStorage.removeItem('chatHistory'); // Clear local storage
    chatBox.innerHTML = '<div class="text">No messages are available. Once you send a message, they will appear here.</div>'; // Reset chat box

    // Re-select the initial text after clearing chat
    initialText = chatBox.querySelector('.text');
    inputField.value = ""; // Clear input field
    chatBox.scrollTop = 0; // Scroll to top when chat is cleared
}
