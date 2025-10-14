// Современный чат "Мой косяк" - JavaScript
class ChatApp {
    constructor() {
        this.ws = null;
        this.messages = [];
        this.isLoadingOlder = false;
        this.hasMoreMessages = true;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.onlineCount = 0;
        
        this.init();
    }
    
    init() {
        this.initElements();
        this.initEventListeners();
        this.initWebSocket();
        this.loadInitialMessages();
        this.loadMessageCount();
        
        // Сохранение ника в localStorage
        const savedNickname = localStorage.getItem('chatNickname');
        if (savedNickname) {
            this.nicknameInput.value = savedNickname;
            this.checkFormValidity();
        }
    }
    
    initElements() {
        this.messagesContainer = document.getElementById('messagesContainer');
        this.messages = document.getElementById('messages');
        this.messageForm = document.getElementById('messageForm');
        this.nicknameInput = document.getElementById('nicknameInput');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.charCount = document.getElementById('charCount');
        this.loadingOlder = document.getElementById('loadingOlder');
        this.onlineCountEl = document.getElementById('onlineCount');
        this.totalMessagesEl = document.getElementById('totalMessages');
        this.notifications = document.getElementById('notifications');
    }
    
    initEventListeners() {
        // Отправка формы
        this.messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });
        
        // Валидация полей
        this.nicknameInput.addEventListener('input', () => {
            this.checkFormValidity();
            // Сохранение ника
            localStorage.setItem('chatNickname', this.nicknameInput.value);
        });
        
        this.messageInput.addEventListener('input', () => {
            this.updateCharCounter();
            this.checkFormValidity();
        });
        
        // Отправка по Ctrl+Enter
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Скролл для подгрузки старых сообщений
        this.messagesContainer.addEventListener('scroll', () => {
            if (this.messagesContainer.scrollTop === 0 && !this.isLoadingOlder && this.hasMoreMessages) {
                this.loadOlderMessages();
            }
        });
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            this.scrollToBottom(false);
        });
    }
    
    initWebSocket() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}`;
        
        this.ws = new WebSocket(wsUrl);
        
        this.ws.onopen = () => {
            console.log('WebSocket соединение установлено');
            this.reconnectAttempts = 0;
            this.showNotification('Подключено к чату! 🚀', 'success');
            this.updateOnlineCount(1); // Примерный счетчик
        };
        
        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.handleWebSocketMessage(data);
            } catch (error) {
                console.error('Ошибка при парсинге сообщения:', error);
            }
        };
        
        this.ws.onclose = () => {
            console.log('WebSocket соединение закрыто');
            this.showNotification('Соединение потеряно. Переподключаюсь...', 'error');
            this.attemptReconnect();
        };
        
        this.ws.onerror = (error) => {
            console.error('WebSocket ошибка:', error);
            this.showNotification('Ошибка соединения', 'error');
        };
    }
    
    handleWebSocketMessage(data) {
        switch (data.type) {
            case 'newMessage':
                this.addMessage(data, true);
                break;
            case 'error':
                this.showNotification(data.message, 'error');
                break;
            default:
                console.log('Неизвестный тип сообщения:', data.type);
        }
    }
    
    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
                console.log(`Попытка переподключения ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
                this.initWebSocket();
            }, 2000 * this.reconnectAttempts);
        } else {
            this.showNotification('Не удалось подключиться к серверу. Обновите страницу.', 'error');
        }
    }
    
    async loadInitialMessages() {
        try {
            const response = await fetch('/api/messages?limit=1000');
            if (!response.ok) throw new Error('Ошибка загрузки сообщений');
            
            const messages = await response.json();
            this.clearWelcomeMessage();
            
            messages.forEach(message => {
                this.addMessage(message, false);
            });
            
            this.scrollToBottom(false);
        } catch (error) {
            console.error('Ошибка загрузки сообщений:', error);
            this.showNotification('Ошибка загрузки истории сообщений', 'error');
        }
    }
    
    async loadOlderMessages() {
        if (this.isLoadingOlder || !this.hasMoreMessages) return;
        
        this.isLoadingOlder = true;
        this.loadingOlder.style.display = 'flex';
        
        try {
            const firstMessage = this.messages.querySelector('.message');
            const beforeTimestamp = firstMessage ? 
                parseInt(firstMessage.dataset.timestamp) : Date.now();
            
            const response = await fetch(`/api/messages?limit=50&before=${beforeTimestamp}`);
            if (!response.ok) throw new Error('Ошибка загрузки старых сообщений');
            
            const olderMessages = await response.json();
            
            if (olderMessages.length === 0) {
                this.hasMoreMessages = false;
                this.loadingOlder.style.display = 'none';
                return;
            }
            
            const scrollHeight = this.messagesContainer.scrollHeight;
            
            // Добавляем старые сообщения в начало
            olderMessages.reverse().forEach(message => {
                this.addMessage(message, false, true);
            });
            
            // Сохраняем позицию скролла
            this.messagesContainer.scrollTop = 
                this.messagesContainer.scrollHeight - scrollHeight;
                
        } catch (error) {
            console.error('Ошибка загрузки старых сообщений:', error);
            this.showNotification('Ошибка загрузки старых сообщений', 'error');
        } finally {
            this.isLoadingOlder = false;
            this.loadingOlder.style.display = 'none';
        }
    }
    
    async loadMessageCount() {
        try {
            const response = await fetch('/api/messages/count');
            if (!response.ok) throw new Error('Ошибка загрузки счетчика');
            
            const data = await response.json();
            this.totalMessagesEl.textContent = data.count.toLocaleString('ru-RU');
        } catch (error) {
            console.error('Ошибка загрузки счетчика сообщений:', error);
        }
    }
    
    sendMessage() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.showNotification('Нет соединения с сервером', 'error');
            return;
        }
        
        const nickname = this.nicknameInput.value.trim();
        const content = this.messageInput.value.trim();
        
        if (!nickname || !content) {
            this.showNotification('Заполните все поля', 'error');
            return;
        }
        
        if (nickname.length > 50) {
            this.showNotification('Ник слишком длинный (максимум 50 символов)', 'error');
            return;
        }
        
        if (content.length > 1000) {
            this.showNotification('Сообщение слишком длинное (максимум 1000 символов)', 'error');
            return;
        }
        
        // Отправляем сообщение
        this.ws.send(JSON.stringify({
            type: 'newMessage',
            nickname: nickname,
            content: content
        }));
        
        // Очищаем поле сообщения
        this.messageInput.value = '';
        this.updateCharCounter();
        this.checkFormValidity();
        this.messageInput.focus();
    }
    
    addMessage(messageData, isNew = false, prepend = false) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message';
        messageEl.dataset.timestamp = messageData.timestamp;
        
        const time = new Date(parseInt(messageData.timestamp));
        const timeString = time.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        messageEl.innerHTML = `
            <div class="message-header">
                <span class="message-nickname">${this.escapeHtml(messageData.nickname)}</span>
                <span class="message-time">${timeString}</span>
            </div>
            <div class="message-content">${this.escapeHtml(messageData.content)}</div>
        `;
        
        if (prepend) {
            // Добавляем в начало (для старых сообщений)
            this.messages.insertBefore(messageEl, this.messages.firstChild);
        } else {
            // Добавляем в конец (для новых сообщений)
            this.messages.appendChild(messageEl);
        }
        
        if (isNew) {
            this.scrollToBottom(true);
            // Обновляем счетчик сообщений
            const currentCount = parseInt(this.totalMessagesEl.textContent.replace(/\s/g, '')) || 0;
            this.totalMessagesEl.textContent = (currentCount + 1).toLocaleString('ru-RU');
        }
    }
    
    clearWelcomeMessage() {
        const welcomeMessage = this.messages.querySelector('.welcome-message');
        if (welcomeMessage && this.messages.children.length > 1) {
            welcomeMessage.remove();
        }
    }
    
    scrollToBottom(smooth = true) {
        const scrollOptions = {
            top: this.messagesContainer.scrollHeight,
            behavior: smooth ? 'smooth' : 'auto'
        };
        this.messagesContainer.scrollTo(scrollOptions);
    }
    
    checkFormValidity() {
        const nickname = this.nicknameInput.value.trim();
        const content = this.messageInput.value.trim();
        const isValid = nickname.length > 0 && content.length > 0 && 
                       nickname.length <= 50 && content.length <= 1000;
        
        this.sendBtn.disabled = !isValid;
    }
    
    updateCharCounter() {
        const length = this.messageInput.value.length;
        this.charCount.textContent = length;
        
        if (length > 900) {
            this.charCount.style.color = '#ef4444';
        } else if (length > 800) {
            this.charCount.style.color = '#f59e0b';
        } else {
            this.charCount.style.color = 'var(--text-muted)';
        }
    }
    
    updateOnlineCount(count) {
        this.onlineCount = Math.max(1, count);
        this.onlineCountEl.textContent = this.onlineCount;
    }
    
    showNotification(message, type = 'info') {
        const notificationEl = document.createElement('div');
        notificationEl.className = `notification ${type}`;
        notificationEl.textContent = message;
        
        this.notifications.appendChild(notificationEl);
        
        // Автоматическое удаление через 5 секунд
        setTimeout(() => {
            if (notificationEl.parentNode) {
                notificationEl.style.animation = 'notificationSlideOut 0.3s ease-in forwards';
                setTimeout(() => {
                    notificationEl.remove();
                }, 300);
            }
        }, 5000);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Дополнительные CSS анимации
const additionalStyles = `
    @keyframes notificationSlideOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0, -8px, 0);
        }
        70% {
            transform: translate3d(0, -4px, 0);
        }
        90% {
            transform: translate3d(0, -2px, 0);
        }
    }
`;

// Добавляем дополнительные стили
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Инициализация приложения когда DOM готов
document.addEventListener('DOMContentLoaded', () => {
    window.chatApp = new ChatApp();
});

// Обработка закрытия страницы
window.addEventListener('beforeunload', () => {
    if (window.chatApp && window.chatApp.ws) {
        window.chatApp.ws.close();
    }
});

// Пасхалка для разработчиков
console.log(`
🚀 Добро пожаловать в "Мой косяк"!
💬 Современный анонимный чат для молодежи
🔒 Приватность и безопасность превыше всего
⚡ Powered by WebSocket + Node.js + SQLite

Нашел баг? Есть идеи? Напиши в чат! 😉
`);
