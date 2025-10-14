# Portfolio Website

This is a personal portfolio website showcasing Abdelrahman Mahmoud's work experience, skills, and projects. It also includes a Gemini-powered AI chatbot to answer questions about Abdelrahman.

## Setup and Usage

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd portfolio
    ```

2.  **Open `index.html` in your browser:**
    Simply open the `index.html` file directly in your web browser to view the website.

## Chatbot Integration (Gemini API)

The chatbot functionality has been integrated with the Gemini API. To enable it, you need to:

1.  **Obtain a Gemini API Key:**
    If you don't have one, you can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

2.  **Update `assets/js/chatbot.js`:**
    Open the file `assets/js/chatbot.js` and replace `'YOUR_GEMINI_API_KEY'` with your actual Gemini API key:

    ```javascript
    const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual Gemini API key
    ```

    **Security Warning:** Directly embedding your API key in frontend code is generally not recommended for production environments as it can be easily exposed. For enhanced security, consider setting up a backend proxy to handle API requests.

### (Optional) Setting up a Backend Proxy for Gemini API

To protect your API key, you can set up a simple backend proxy. Here's an example using Node.js with Express.js:

**1. Create a new directory for your backend (e.g., `backend`) in your project root:**

```
mkdir backend
cd backend
npm init -y
npm install express cors node-fetch dotenv
```

**2. Create an `index.js` file inside the `backend` directory:**

```javascript
// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Loaded from .env file

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: 'Gemini API Key not configured.' });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: userMessage
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        res.json({ response: data.candidates[0].content.parts[0].text });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini API.' });
    }
});

app.listen(port, () => {
    console.log(`Backend proxy listening at http://localhost:${port}`);
});
```

**3. Create a `.env` file in the `backend` directory:**

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```
Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key.

**4. Start the backend server:**

```bash
cd backend
node index.js
```

**5. Update `assets/js/chatbot.js` to use the proxy:**

Change the `sendMessage` function in `assets/js/chatbot.js` to point to your backend proxy:

```javascript
// assets/js/chatbot.js
// ...
    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        appendMessage('user', userMessage);
        chatInput.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        defaultChatbotIcon.classList.add('hidden');
        thinkingChatbotIcon.classList.remove('hidden');
        thinkingChatbotIcon.classList.add('block');

        appendMessage('bot', 'Thinking...', true);

        try {
            // Change this line to point to your backend proxy
            const response = await fetch('http://localhost:3000/chat', { // Assuming your backend runs on port 3000
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botResponse = data.response; // Your backend should return a 'response' field

            const thinkingMessage = chatHistory.querySelector('.thinking-message');
            if (thinkingMessage) {
                thinkingMessage.remove();
            }

            appendMessage('bot', botResponse);
            chatHistory.scrollTop = chatHistory.scrollHeight;

        } catch (error) {
            console.error('Chatbot API error:', error);
            const thinkingMessage = chatHistory.querySelector('.thinking-message');
            if (thinkingMessage) {
                thinkingMessage.remove();
            }
            appendMessage('bot', 'Oops! Something went wrong. Please try again.');
            chatHistory.scrollTop = chatHistory.scrollHeight;
        } finally {
            defaultChatbotIcon.classList.remove('hidden');
            defaultChatbotIcon.classList.add('block');
            thinkingChatbotIcon.classList.remove('block');
            thinkingChatbotIcon.classList.add('hidden');
        }
    }
// ...
```

This completes the integration and provides instructions for secure API key handling.
