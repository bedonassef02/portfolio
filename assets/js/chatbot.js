export function initializeChatbot() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotModal = document.getElementById('chatbot-modal');
    const closeChatbotModalBtn = document.getElementById('close-chatbot-modal');
    const chatHistory = document.getElementById('chat-history');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const defaultChatbotIcon = document.getElementById('default-chatbot-icon');
    const thinkingChatbotIcon = document.getElementById('thinking-chatbot-icon');

    let sampleQuestionsDisplayed = false; // Flag to track if sample questions have been displayed

    const sampleQuestions = [
        { display: "Experience", send: "Tell me about Abdelrahman's experience." },
        { display: "Skills", send: "What are his key skills?" },
        { display: "Projects", send: "Can you list his projects?" },
        { display: "Contact", send: "How can I contact Abdelrahman?" }
    ];

    function displaySampleQuestions() {
        if (!sampleQuestionsDisplayed) {
            chatHistory.innerHTML = ''; // Clear history only if not displayed before
            appendMessage('bot', 'Hello! I\'m Abdelrahman AI Assistant. Here are some things you can ask me:');

            const suggestionsContainer = document.createElement('div');
            suggestionsContainer.classList.add('flex', 'flex-wrap', 'gap-2', 'mt-2'); // Flex container for horizontal layout

            sampleQuestions.forEach(q => {
                const questionElement = document.createElement('div');
                questionElement.classList.add('px-3', 'py-1', 'rounded-full', 'bg-[var(--color-background-medium)]', 'text-sm', 'text-[var(--color-text-light)]', 'cursor-pointer', 'hover:bg-[#007bff]', 'hover:text-white', 'border', 'border-[var(--color-background-light)]', 'shadow-md', 'ring-1', 'ring-inset', 'ring-[#007bff]', 'sample-question-item', 'whitespace-nowrap', 'overflow-hidden', 'text-ellipsis');
                questionElement.textContent = q.display;
                questionElement.addEventListener('click', () => {
                    chatInput.value = q.send;
                    sendMessage();
                });
                suggestionsContainer.appendChild(questionElement);
            });
            chatHistory.appendChild(suggestionsContainer);
            chatHistory.scrollTop = chatHistory.scrollHeight;
            sampleQuestionsDisplayed = true; // Set flag to true after displaying
        }
    }

    chatbotIcon.addEventListener('click', () => {
        chatbotModal.classList.toggle('hidden');
        if (!chatbotModal.classList.contains('hidden')) {
            displaySampleQuestions();
            chatbotIcon.classList.add('hidden'); // Hide floating icon
            chatbotModal.classList.add('shadow-xl'); // Add shadow when opened
        } else {
            chatbotIcon.classList.remove('hidden'); // Show floating icon
            chatbotModal.classList.remove('shadow-xl'); // Remove shadow when closed
        }
    });

    closeChatbotModalBtn.addEventListener('click', () => {
        chatbotModal.classList.add('hidden');
        chatbotIcon.classList.remove('hidden'); // Show floating icon when closed
        chatbotModal.classList.remove('shadow-xl'); // Remove shadow when closed
    });

    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        appendMessage('user', userMessage);
        chatInput.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to bottom

        // Remove all sample question items
        document.querySelectorAll('.sample-question-item').forEach(item => item.remove());

        // Show thinking icon
        defaultChatbotIcon.classList.add('hidden');
        thinkingChatbotIcon.classList.remove('hidden');
        thinkingChatbotIcon.classList.add('block');

        appendMessage('bot', 'Thinking...', true); // Show a thinking message

        try {
            const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:CfCVZiDW/bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: userMessage })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botResponse = data.candidates[0].content.parts[0].text;

            // Remove "Thinking..." message
            const thinkingMessage = chatHistory.querySelector('.thinking-message');
            if (thinkingMessage) {
                thinkingMessage.remove();
            }

            appendMessage('bot', botResponse);
            chatHistory.scrollTop = chatHistory.scrollHeight;

        } catch (error) {
            console.error('Chatbot API error:', error);
            // Remove "Thinking..." message
            const thinkingMessage = chatHistory.querySelector('.thinking-message');
            if (thinkingMessage) {
                thinkingMessage.remove();
            }
            appendMessage('bot', 'Oops! Something went wrong. Please try again.');
            chatHistory.scrollTop = chatHistory.scrollHeight;
        } finally {
            // Hide thinking icon, show default icon
            defaultChatbotIcon.classList.remove('hidden');
            defaultChatbotIcon.classList.add('block');
            thinkingChatbotIcon.classList.remove('block');
            thinkingChatbotIcon.classList.add('hidden');
        }
    }

    function appendMessage(sender, message, isThinking = false) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('flex', 'items-start', 'mb-2');

        const messageElement = document.createElement('div');
        messageElement.classList.add('p-2', 'rounded-lg', 'max-w-[80%]');

        if (sender === 'user') {
            messageContainer.classList.add('justify-end');
            messageElement.classList.add('bg-[#007bff]', 'text-white');
        } else { // bot
            messageContainer.classList.add('justify-start');
            messageElement.classList.add('bg-[var(--color-background-light)]', 'text-[var(--color-text-light)]');
            
            if (!isThinking) { // Only add icon if not a thinking message
                const iconElement = document.createElement('i');
                iconElement.classList.add('fas', 'fa-robot', 'text-xl', 'mr-2', 'mt-1', 'text-[var(--color-text-medium)]');
                messageContainer.appendChild(iconElement);
            }
            
            if (isThinking) {
                messageElement.classList.add('thinking-message');
            }
        }
        messageElement.innerHTML = marked.parse(message);
        messageContainer.appendChild(messageElement);
        chatHistory.appendChild(messageContainer);
    }
}