// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');

// Auto-resize Textarea
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Format Bot Response for step-by-step/lists
function formatBotResponse(text) {
    if (!text) return "";
    // If text is object, try extracting .text or .candidates[0].text
    if (typeof text === 'object') {
        if (text.text) text = text.text;
        else if (Array.isArray(text.candidates) && text.candidates[0]?.text)
            text = text.candidates[0].text;
        else text = JSON.stringify(text);
    }
    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Numbered lists
    text = text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    // Bullet lists
    text = text.replace(/^[-*+]\s+(.+)$/gm, '<li>$1</li>');
    // Lists together
    text = text.replace(/(<li>[\s\S]*?<\/li>)+/g, match => '<ul class="formatted-list">' + match + '</ul>');
    // Paragraphs
    text = text.replace(/\n\n+/g, '</p><p>');
    // Single line breaks
    text = text.replace(/\n/g, '<br>');
    if (!text.startsWith('<ul') && !text.startsWith('<ol')) text = '<p>' + text + '</p>';
    return text;
}

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

function createMessageElement(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';

    if (isUser) {
        bubbleDiv.textContent = message;
    } else {
        bubbleDiv.innerHTML = formatBotResponse(message);
    }

    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = getCurrentTime();

    contentDiv.appendChild(bubbleDiv);
    contentDiv.appendChild(timeSpan);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);

    return messageDiv;
}

function addMessage(message, isUser = false) {
    const msgElem = createMessageElement(message, isUser);
    chatMessages.appendChild(msgElem);
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

function showTypingIndicator() {
    typingIndicator.classList.add('active');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.classList.remove('active');
}

async function sendMessage(message) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        if (response.ok) {
            return data.response;
        } else {
            throw new Error(data.error || 'No response');
        }
    } catch (error) {
        return `⚠️ Error: ${error.message}`;
    }
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = messageInput.value.trim();
    if (!msg) return;
    addMessage(msg, true);
    messageInput.value = '';
    messageInput.style.height = 'auto';
    sendBtn.disabled = true;
    showTypingIndicator();
    const botReply = await sendMessage(msg);
    hideTypingIndicator();
    addMessage(botReply, false);
    sendBtn.disabled = false;
    messageInput.focus();
});

function clearChat() {
    if (confirm('Clear chat history?')) {
        const messages = chatMessages.querySelectorAll('.message');
        messages.forEach((msg, idx) => { if (idx > 0) msg.remove(); });
    }
}

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    messageInput.focus();
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
