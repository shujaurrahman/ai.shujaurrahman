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

// Handle form submission and send message to AI
form.onsubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting normally

    let userMessage = inputField.value.trim(); 
    if (userMessage !== '') {
        // Remove the initial text as soon as the user sends the first message
        if (initialText) {
            initialText.remove(); // Remove initial message
        }

        // Show user message in chat box
        appendMessage('You', userMessage, 'user');

        // Send the user message to PHP backend via AJAX
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "chat.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // Assuming your backend returns JSON with a "message" property
                let aiResponse = JSON.parse(xhr.responseText).message;
                appendMessage('AI', aiResponse, 'ai');  // Show formatted AI response in chat box
            }
        };

        // Send the message to the backend
        xhr.send("message=" + encodeURIComponent(userMessage));

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
