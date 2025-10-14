export function initializeChatbot() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotModal = document.getElementById('chatbot-modal');
    const closeChatbotModalBtn = document.getElementById('close-chatbot-modal');
    const chatHistory = document.getElementById('chat-history');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const defaultChatbotIcon = document.getElementById('default-chatbot-icon');
    const thinkingChatbotIcon = document.getElementById('thinking-chatbot-icon');

    chatbotIcon.addEventListener('click', () => {
        chatbotModal.classList.toggle('hidden');
    });

    closeChatbotModalBtn.addEventListener('click', () => {
        chatbotModal.classList.add('hidden');
    });

    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        appendMessage('user', userMessage);
        chatInput.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to bottom

        // Show thinking icon
        defaultChatbotIcon.classList.add('hidden');
        thinkingChatbotIcon.classList.remove('hidden');
        thinkingChatbotIcon.classList.add('block');

        // Placeholder for API call to Gemini
        appendMessage('bot', 'Thinking...', true); // Show a thinking message

        // Simulate API call
        setTimeout(() => {
            // In a real scenario, you'd send userMessage to your backend
            // fetch('/api/chat', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ message: userMessage })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     appendMessage('bot', data.response);
            //     chatHistory.scrollTop = chatHistory.scrollHeight;
            // })
            // .catch(error => {
            //     console.error('Chatbot API error:', error);
            //     appendMessage('bot', 'Oops! Something went wrong. Please try again.');
            //     chatHistory.scrollTop = chatHistory.scrollHeight;
            // });

            // Placeholder response
            const botResponse = `Hello! You asked: "${userMessage}". I am a chatbot powered by Gemini, designed to answer questions about Abdelrahman Mahmoud. Currently, I'm in development, but soon I'll be able to tell you all about his work experience, skills, projects, and more!`;
            
            // Remove "Thinking..." message
            const thinkingMessage = chatHistory.querySelector('.thinking-message');
            if (thinkingMessage) {
                thinkingMessage.remove();
            }

            appendMessage('bot', botResponse);
            chatHistory.scrollTop = chatHistory.scrollHeight;

            // Hide thinking icon, show default icon
            defaultChatbotIcon.classList.remove('hidden');
            defaultChatbotIcon.classList.add('block');
            thinkingChatbotIcon.classList.remove('block');
            thinkingChatbotIcon.classList.add('hidden');
        }, 1500);
    }

    function appendMessage(sender, message, isThinking = false) {
        const messageContainer = document.createElement('div'); // New container for message and icon
        messageContainer.classList.add('flex', 'items-start', 'mb-2'); // Flex to align icon and message

        const messageElement = document.createElement('div');
        messageElement.classList.add('p-2', 'rounded-lg', 'max-w-[80%]');

        if (sender === 'user') {
            messageContainer.classList.add('justify-end'); // Align user messages to the right
            messageElement.classList.add('bg-[#007bff]', 'text-white');
        } else { // bot
            messageContainer.classList.add('justify-start'); // Align bot messages to the left
            messageElement.classList.add('bg-[var(--color-background-light)]', 'text-[var(--color-text-light)]');
            
            // Add AI icon for bot messages
            const iconElement = document.createElement('i');
            iconElement.classList.add('fas', 'fa-robot', 'text-xl', 'mr-2', 'mt-1', 'text-[var(--color-text-medium)]'); // AI icon
            messageContainer.appendChild(iconElement); // Add icon before the message
            
            if (isThinking) {
                messageElement.classList.add('thinking-message');
            }
        }
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement); // Add message to container
        chatHistory.appendChild(messageContainer); // Append container to chat history
    }
}